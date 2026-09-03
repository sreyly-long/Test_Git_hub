import type { Metadata } from "next";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { StatCards } from "@/components/analytics/StatCards";
import {
  RevenueOverviewCard,
  BookingsByPlatformCard,
  OccupancyRateCard,
  RoomTypePerformanceCard,
  RevenueByRoomTypeCard,
} from "@/components/analytics/ChartCards";
import type { AnalyticsStat } from "@/components/analytics/data";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import { percentChange, startOfDay, addDays, startOfMonth, addMonths } from "@/lib/stats";
import { colorForPlatform } from "@/lib/platform-colors";
import { ROOM_TYPES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Analytics · coocon",
};

export default async function AnalyticsPage() {
  const session = await requireSession();

  const now = new Date();
  const today = startOfDay(now);
  const monthStart = startOfMonth(now);
  const prevMonthStart = addMonths(monthStart, -1);
  const thirtyDaysAgo = addDays(today, -30);

  const totalRooms = await prisma.room.count();

  async function occupiedRoomShare(start: Date, end: Date) {
    if (totalRooms === 0) return 0;
    const rows = await prisma.reservation.findMany({
      where: { status: { not: "Cancelled" }, checkIn: { lt: end }, checkOut: { gt: start } },
      select: { roomId: true },
      distinct: ["roomId"],
    });
    return rows.length / totalRooms;
  }

  // --- Stat cards: this month vs last month ---
  const [
    revenueThisMonth,
    revenueLastMonth,
    bookingsThisMonth,
    bookingsLastMonth,
    reservationsThisMonth,
    reservationsLastMonth,
    occupancyThisMonth,
    occupancyLastMonth,
  ] = await Promise.all([
    prisma.reservation.aggregate({ _sum: { totalAmount: true }, where: { checkIn: { gte: monthStart } } }),
    prisma.reservation.aggregate({ _sum: { totalAmount: true }, where: { checkIn: { gte: prevMonthStart, lt: monthStart } } }),
    prisma.reservation.count({ where: { checkIn: { gte: monthStart } } }),
    prisma.reservation.count({ where: { checkIn: { gte: prevMonthStart, lt: monthStart } } }),
    prisma.reservation.findMany({ where: { checkIn: { gte: monthStart } }, select: { totalAmount: true, checkIn: true, checkOut: true } }),
    prisma.reservation.findMany({ where: { checkIn: { gte: prevMonthStart, lt: monthStart } }, select: { totalAmount: true, checkIn: true, checkOut: true } }),
    occupiedRoomShare(monthStart, addMonths(monthStart, 1)),
    occupiedRoomShare(prevMonthStart, monthStart),
  ]);

  function nights(r: { checkIn: Date; checkOut: Date }) {
    return Math.max(1, Math.round((r.checkOut.getTime() - r.checkIn.getTime()) / 86400000));
  }
  const nightsThisMonth = reservationsThisMonth.reduce((sum, r) => sum + nights(r), 0);
  const nightsLastMonth = reservationsLastMonth.reduce((sum, r) => sum + nights(r), 0);
  const adrThisMonth = nightsThisMonth ? (revenueThisMonth._sum.totalAmount ?? 0) / nightsThisMonth : 0;
  const adrLastMonth = nightsLastMonth ? (revenueLastMonth._sum.totalAmount ?? 0) / nightsLastMonth : 0;

  const revenueDelta = percentChange(revenueThisMonth._sum.totalAmount ?? 0, revenueLastMonth._sum.totalAmount ?? 0);
  const bookingsDelta = percentChange(bookingsThisMonth, bookingsLastMonth);
  const adrDelta = percentChange(adrThisMonth, adrLastMonth);
  const occupancyDelta = percentChange(occupancyThisMonth * 100, occupancyLastMonth * 100);

  const stats: AnalyticsStat[] = [
    { label: "Total Revenue", value: `$${(revenueThisMonth._sum.totalAmount ?? 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}`, deltaPct: revenueDelta.pct, direction: revenueDelta.direction, fromLabel: "from last month", icon: "dollar", iconTheme: "blue" },
    { label: "Total Bookings", value: String(bookingsThisMonth), deltaPct: bookingsDelta.pct, direction: bookingsDelta.direction, fromLabel: "from last month", icon: "calendar", iconTheme: "blue" },
    { label: "Average Daily Rate", value: `$${adrThisMonth.toFixed(0)}`, deltaPct: adrDelta.pct, direction: adrDelta.direction, fromLabel: "from last month", icon: "trending", iconTheme: "blue" },
    { label: "Occupancy Rate", value: `${(occupancyThisMonth * 100).toFixed(1)}%`, deltaPct: occupancyDelta.pct, direction: occupancyDelta.direction, fromLabel: "from last month", icon: "pie", iconTheme: "violet" },
  ];

  // --- Revenue overview: last 5 weekly buckets ---
  const weeklyBuckets = await Promise.all(
    Array.from({ length: 5 }, async (_, i) => {
      const start = addDays(today, -35 + i * 7);
      const end = addDays(start, 7);
      const agg = await prisma.reservation.aggregate({ _sum: { totalAmount: true }, where: { checkIn: { gte: start, lt: end } } });
      return {
        label: start.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
        value: Math.round(agg._sum.totalAmount ?? 0),
      };
    }),
  );

  // --- Occupancy rate: last 5 weekly buckets ---
  const occupancyBuckets = await Promise.all(
    Array.from({ length: 5 }, async (_, i) => {
      const start = addDays(today, -35 + i * 7);
      const end = addDays(start, 7);
      const share = await occupiedRoomShare(start, end);
      return { label: start.toLocaleDateString(undefined, { month: "short", day: "numeric" }), value: Math.round(share * 100) };
    }),
  );

  // --- Bookings by platform (all-time) ---
  const platformGroups = await prisma.reservation.groupBy({ by: ["source"], _count: { _all: true } });
  const platformTotal = platformGroups.reduce((sum, g) => sum + g._count._all, 0);
  const bookingsByPlatform = platformGroups
    .sort((a, b) => b._count._all - a._count._all)
    .map((g) => ({
      name: g.source,
      value: g._count._all,
      pct: platformTotal ? Math.round((g._count._all / platformTotal) * 1000) / 10 : 0,
      color: colorForPlatform(g.source),
    }));

  // --- Room type performance & revenue by room type (last 30 days) ---
  const [roomsByType, recentReservations] = await Promise.all([
    prisma.room.groupBy({ by: ["roomType"], _count: { _all: true } }),
    prisma.reservation.findMany({
      where: { status: { not: "Cancelled" }, checkIn: { lt: now }, checkOut: { gt: thirtyDaysAgo } },
      select: { roomId: true, totalAmount: true, room: { select: { roomType: true } } },
    }),
  ]);
  const roomCountByType = new Map(roomsByType.map((r) => [r.roomType, r._count._all]));
  const roomsBookedByType = new Map<string, Set<string>>();
  const revenueByTypeMap = new Map<string, number>();
  for (const r of recentReservations) {
    const type = r.room.roomType;
    if (!roomsBookedByType.has(type)) roomsBookedByType.set(type, new Set());
    roomsBookedByType.get(type)!.add(r.roomId);
    revenueByTypeMap.set(type, (revenueByTypeMap.get(type) ?? 0) + r.totalAmount);
  }
  const roomTypePerformance = ROOM_TYPES.filter((type) => (roomCountByType.get(type) ?? 0) > 0).map((type) => {
    const roomCount = roomCountByType.get(type) ?? 0;
    const bookedCount = roomsBookedByType.get(type)?.size ?? 0;
    const percent = roomCount ? Math.round((bookedCount / roomCount) * 100) : 0;
    return { label: type, value: `${percent}%`, percent };
  });
  const maxRevenue = Math.max(...ROOM_TYPES.map((t) => revenueByTypeMap.get(t) ?? 0), 1);
  const revenueByRoomType = ROOM_TYPES.filter((type) => (roomCountByType.get(type) ?? 0) > 0).map((type) => {
    const revenue = revenueByTypeMap.get(type) ?? 0;
    return { label: type, value: `$${revenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, percent: Math.round((revenue / maxRevenue) * 100) };
  });

  return (
    <div className="flex min-h-screen w-full bg-[#f9f9f7]">
      <Sidebar active="Analytics" />

      <main className="flex-1 px-5 py-6 lg:px-8">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
          <Header
            title="Analytics"
            dateRangeLabel="Last 5 Weeks"
            notificationCount={1}
            userName={session.user.name}
            userRole={session.user.role}
          />

          <StatCards stats={stats} />

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.6fr_1fr]">
            <RevenueOverviewCard data={weeklyBuckets} />
            <BookingsByPlatformCard slices={bookingsByPlatform} />
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <OccupancyRateCard data={occupancyBuckets} />
            <RoomTypePerformanceCard items={roomTypePerformance} />
            <RevenueByRoomTypeCard items={revenueByRoomType} />
          </div>
        </div>
      </main>
    </div>
  );
}
