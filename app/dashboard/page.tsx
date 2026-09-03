import type { Metadata } from "next";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { StatCards } from "@/components/dashboard/StatCards";
import { RoomOccupancy } from "@/components/dashboard/RoomOccupancy";
import { OverallRatings } from "@/components/dashboard/OverallRatings";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { BookingTable } from "@/components/dashboard/BookingTable";
import {
  GuestsCard,
  RevenueCard,
  BookingsCard,
  BookingsByPlatformCard,
} from "@/components/dashboard/ChartCards";
import type { StatCard, Activity, Booking } from "@/components/dashboard/data";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import { percentChange, startOfDay, addDays, startOfMonth, addMonths } from "@/lib/stats";
import { colorForPlatform, MONTH_LABELS, WEEKDAY_LABELS } from "@/lib/platform-colors";
import { timeAgo } from "@/lib/time-ago";

export const metadata: Metadata = {
  title: "Dashboard · coocon",
};

export default async function DashboardPage() {
  const session = await requireSession();

  const now = new Date();
  const today = startOfDay(now);
  const tomorrow = addDays(today, 1);
  const weekAgo = addDays(today, -7);
  const twoWeeksAgo = addDays(today, -14);
  const lastWeekToday = addDays(today, -7);
  const lastWeekTomorrow = addDays(tomorrow, -7);

  // --- Stat cards (weekly deltas) ---
  const [
    revenueThisWeek,
    revenueLastWeek,
    newBookingsThisWeek,
    newBookingsLastWeek,
    checkInToday,
    checkInLastWeek,
    checkOutToday,
    checkOutLastWeek,
  ] = await Promise.all([
    prisma.reservation.aggregate({ _sum: { totalAmount: true }, where: { checkIn: { gte: weekAgo, lt: today } } }),
    prisma.reservation.aggregate({ _sum: { totalAmount: true }, where: { checkIn: { gte: twoWeeksAgo, lt: weekAgo } } }),
    prisma.reservation.count({ where: { checkIn: { gte: weekAgo, lt: today } } }),
    prisma.reservation.count({ where: { checkIn: { gte: twoWeeksAgo, lt: weekAgo } } }),
    prisma.reservation.count({ where: { status: "Checked In", checkIn: { gte: today, lt: tomorrow } } }),
    prisma.reservation.count({ where: { status: "Checked In", checkIn: { gte: lastWeekToday, lt: lastWeekTomorrow } } }),
    prisma.reservation.count({ where: { status: "Checked Out", checkOut: { gte: today, lt: tomorrow } } }),
    prisma.reservation.count({ where: { status: "Checked Out", checkOut: { gte: lastWeekToday, lt: lastWeekTomorrow } } }),
  ]);

  const revenueDelta = percentChange(revenueThisWeek._sum.totalAmount ?? 0, revenueLastWeek._sum.totalAmount ?? 0);
  const bookingsDelta = percentChange(newBookingsThisWeek, newBookingsLastWeek);
  const checkInDelta = percentChange(checkInToday, checkInLastWeek);
  const checkOutDelta = percentChange(checkOutToday, checkOutLastWeek);

  const stats: StatCard[] = [
    { label: "Total Revenue", value: `$${(revenueThisWeek._sum.totalAmount ?? 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}`, deltaPct: revenueDelta.pct, direction: revenueDelta.direction },
    { label: "New Bookings", value: String(newBookingsThisWeek), deltaPct: bookingsDelta.pct, direction: bookingsDelta.direction },
    { label: "Check In", value: String(checkInToday), deltaPct: checkInDelta.pct, direction: checkInDelta.direction },
    { label: "Check-Out", value: String(checkOutToday), deltaPct: checkOutDelta.pct, direction: checkOutDelta.direction },
  ];

  // --- Guests: last 7 days ---
  const guestReservations = await prisma.reservation.findMany({
    where: { checkIn: { gte: weekAgo, lt: tomorrow } },
    select: { checkIn: true, guests: true },
  });
  const guestsByDay = new Map<string, number>();
  for (let i = 0; i < 7; i++) {
    const day = addDays(weekAgo, i);
    guestsByDay.set(day.toDateString(), 0);
  }
  for (const r of guestReservations) {
    const key = startOfDay(r.checkIn).toDateString();
    if (guestsByDay.has(key)) {
      guestsByDay.set(key, (guestsByDay.get(key) ?? 0) + r.guests);
    }
  }
  const guestsWeekly = Array.from({ length: 7 }, (_, i) => {
    const day = addDays(weekAgo, i);
    return { label: WEEKDAY_LABELS[day.getDay()], value: guestsByDay.get(day.toDateString()) ?? 0 };
  });

  // --- Revenue: last 8 months ---
  const eightMonthsAgo = addMonths(startOfMonth(now), -7);
  const revenueReservations = await prisma.reservation.findMany({
    where: { checkIn: { gte: eightMonthsAgo } },
    select: { checkIn: true, totalAmount: true },
  });
  const revenueByMonth = new Map<string, number>();
  for (const r of revenueReservations) {
    const key = `${r.checkIn.getFullYear()}-${r.checkIn.getMonth()}`;
    revenueByMonth.set(key, (revenueByMonth.get(key) ?? 0) + r.totalAmount);
  }
  const revenueMonthly = Array.from({ length: 8 }, (_, i) => {
    const monthDate = addMonths(eightMonthsAgo, i);
    const key = `${monthDate.getFullYear()}-${monthDate.getMonth()}`;
    return { label: MONTH_LABELS[monthDate.getMonth()], value: Math.round(revenueByMonth.get(key) ?? 0) };
  });

  // --- Bookings: this calendar year, booked vs canceled ---
  const yearStart = new Date(now.getFullYear(), 0, 1);
  const yearEnd = new Date(now.getFullYear() + 1, 0, 1);
  const yearReservations = await prisma.reservation.findMany({
    where: { checkIn: { gte: yearStart, lt: yearEnd } },
    select: { checkIn: true, status: true },
  });
  const bookingsByMonth = Array.from({ length: 12 }, () => ({ booked: 0, canceled: 0 }));
  for (const r of yearReservations) {
    const m = r.checkIn.getMonth();
    if (r.status === "Cancelled") bookingsByMonth[m].canceled += 1;
    else bookingsByMonth[m].booked += 1;
  }
  const bookingsYearly = bookingsByMonth.map((b, i) => ({ label: MONTH_LABELS[i], ...b }));

  // --- Bookings by platform ---
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
  const bookingsThisWeek = await prisma.reservation.count({ where: { checkIn: { gte: weekAgo, lt: today } } });

  // --- Room occupancy ---
  const [totalRooms, occupiedRooms, availableRooms, reservedRooms, maintenanceRooms] = await Promise.all([
    prisma.room.count(),
    prisma.room.count({ where: { status: "Occupied" } }),
    prisma.room.count({ where: { status: "Available" } }),
    prisma.room.count({ where: { status: "Reserved" } }),
    prisma.room.count({ where: { status: "Maintenance" } }),
  ]);
  const occupancySegments = [
    { label: "Occupied", value: occupiedRooms, color: "#2a78d6" },
    { label: "Available", value: availableRooms, color: "#cde2fb" },
    { label: "Reserved", value: reservedRooms, color: "#12172b" },
    { label: "Not Ready", value: maintenanceRooms, color: "#c3c2b7" },
  ];

  // --- Overall ratings ---
  const [ratingAgg, starCountsRaw] = await Promise.all([
    prisma.review.aggregate({ _avg: { rating: true }, _count: { _all: true } }),
    prisma.review.groupBy({ by: ["rating"], _count: { _all: true } }),
  ]);
  const starCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } as Record<1 | 2 | 3 | 4 | 5, number>;
  for (const g of starCountsRaw) {
    if (g.rating >= 1 && g.rating <= 5) {
      starCounts[g.rating as 1 | 2 | 3 | 4 | 5] = g._count._all;
    }
  }

  // --- Recent activity: merge latest reservations, paid invoices, reviews ---
  const [latestReservations, latestPaidInvoices, latestReviews] = await Promise.all([
    prisma.reservation.findMany({ orderBy: { createdAt: "desc" }, take: 3, include: { room: true } }),
    prisma.invoice.findMany({ where: { status: "Paid" }, orderBy: { issueDate: "desc" }, take: 3 }),
    prisma.review.findMany({ orderBy: { date: "desc" }, take: 3 }),
  ]);

  const activityEvents: (Activity & { at: Date })[] = [
    ...latestReservations.map((r) => ({
      kind: "booking" as const,
      title: "Booking Confirmation",
      detail: `Booking ${r.bookingCode} for ${r.guestName}, ${r.room.roomType} Room ${r.room.number}.`,
      time: timeAgo(r.createdAt),
      at: r.createdAt,
    })),
    ...latestPaidInvoices.map((inv) => ({
      kind: "payment" as const,
      title: "Payment Received",
      detail: `Payment for Invoice ${inv.invoiceCode} was received.`,
      time: timeAgo(inv.issueDate),
      at: inv.issueDate,
    })),
    ...latestReviews.map((rev) => ({
      kind: "user" as const,
      title: "New review submitted",
      detail: `${rev.guestName} left a ${rev.rating}-star review.`,
      time: timeAgo(rev.date),
      at: rev.date,
    })),
  ];
  const activity: Activity[] = activityEvents
    .sort((a, b) => b.at.getTime() - a.at.getTime())
    .slice(0, 5)
    .map((event) => ({ kind: event.kind, title: event.title, detail: event.detail, time: event.time }));

  // --- Booking list (latest reservations) ---
  const latestBookingRows = await prisma.reservation.findMany({
    orderBy: { checkIn: "desc" },
    take: 6,
    include: { room: true },
  });
  const bookings: Booking[] = latestBookingRows.map((r) => ({
    id: r.bookingCode,
    guest: r.guestName,
    roomType: r.room.roomType,
    roomNo: r.room.number,
    duration: `${Math.max(1, Math.round((r.checkOut.getTime() - r.checkIn.getTime()) / 86400000))} Night(s)`,
    checkIn: r.checkIn.toISOString().slice(0, 10),
    checkOut: r.checkOut.toISOString().slice(0, 10),
    status: r.status,
  }));

  return (
    <div className="flex min-h-screen w-full bg-[#f9f9f7]">
      <Sidebar active="Dashboard" />

      <main className="flex-1 px-5 py-6 lg:px-8">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
          <Header
            title="Dashboard"
            searchPlaceholder="Search booking, room, etc"
            userName={session.user.name}
            userRole={session.user.role}
          />

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_320px]">
            <div className="flex flex-col gap-5">
              <StatCards stats={stats} />

              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <GuestsCard data={guestsWeekly} />
                <RevenueCard data={revenueMonthly} />
              </div>

              <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.4fr_1fr]">
                <BookingsCard data={bookingsYearly} />
                <BookingsByPlatformCard
                  slices={bookingsByPlatform}
                  totalSubLabel={`This Week ${bookingsThisWeek.toLocaleString()}`}
                />
              </div>

              <BookingTable bookings={bookings} />
            </div>

            <div className="flex flex-col gap-5">
              <RoomOccupancy totalRooms={totalRooms} segments={occupancySegments} />
              <OverallRatings
                score={ratingAgg._avg.rating ?? 0}
                totalReviews={ratingAgg._count._all}
                starCounts={starCounts}
              />
              <RecentActivity activity={activity} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
