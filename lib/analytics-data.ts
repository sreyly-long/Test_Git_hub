import { prisma } from "./prisma";
import { percentChange, startOfDay, addDays, startOfMonth, addMonths, type Delta } from "./stats";
import { colorForPlatform } from "./platform-colors";
import { ROOM_TYPES } from "./constants";
import { bucketsForRange, type RangeKey } from "@/components/analytics/ranges";

export type AnalyticsData = {
  revenueThisMonth: number;
  revenueDelta: Delta;
  bookingsThisMonth: number;
  bookingsDelta: Delta;
  adrThisMonth: number;
  adrDelta: Delta;
  occupancyThisMonthPct: number;
  occupancyDelta: Delta;
  revenueOverview: { label: string; value: number }[];
  occupancyRate: { label: string; value: number }[];
  bookingsByPlatform: { name: string; value: number; pct: number; color: string }[];
  roomTypePerformance: { label: string; value: string; percent: number }[];
  revenueByRoomType: { label: string; value: string; percent: number }[];
};

export async function getAnalyticsData(range: RangeKey): Promise<AnalyticsData> {
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

  const [
    revenueThisMonthAgg,
    revenueLastMonthAgg,
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
  const revenueThisMonth = revenueThisMonthAgg._sum.totalAmount ?? 0;
  const adrThisMonth = nightsThisMonth ? revenueThisMonth / nightsThisMonth : 0;
  const adrLastMonth = nightsLastMonth ? (revenueLastMonthAgg._sum.totalAmount ?? 0) / nightsLastMonth : 0;

  const revenueDelta = percentChange(revenueThisMonth, revenueLastMonthAgg._sum.totalAmount ?? 0);
  const bookingsDelta = percentChange(bookingsThisMonth, bookingsLastMonth);
  const adrDelta = percentChange(adrThisMonth, adrLastMonth);
  const occupancyDelta = percentChange(occupancyThisMonth * 100, occupancyLastMonth * 100);

  // --- Revenue overview & occupancy rate: bucketed by the selected range ---
  const buckets = bucketsForRange(range, today);
  const [revenueOverview, occupancyRate] = await Promise.all([
    Promise.all(
      buckets.map(async (b) => {
        const agg = await prisma.reservation.aggregate({ _sum: { totalAmount: true }, where: { checkIn: { gte: b.start, lt: b.end } } });
        return { label: b.label, value: Math.round(agg._sum.totalAmount ?? 0) };
      }),
    ),
    Promise.all(
      buckets.map(async (b) => {
        const share = await occupiedRoomShare(b.start, b.end);
        return { label: b.label, value: Math.round(share * 100) };
      }),
    ),
  ]);

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

  return {
    revenueThisMonth,
    revenueDelta,
    bookingsThisMonth,
    bookingsDelta,
    adrThisMonth,
    adrDelta,
    occupancyThisMonthPct: occupancyThisMonth * 100,
    occupancyDelta,
    revenueOverview,
    occupancyRate,
    bookingsByPlatform,
    roomTypePerformance,
    revenueByRoomType,
  };
}
