import type { Metadata } from "next";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { StatCards, type ReservationStat } from "@/components/reservation/StatCards";
import { Toolbar } from "@/components/reservation/Toolbar";
import { ReservationTable } from "@/components/reservation/ReservationTable";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import { parsePage, paginationMeta } from "@/lib/pagination";
import { percentChange, startOfDay, addDays, startOfMonth, addMonths } from "@/lib/stats";
import { buildReservationWhere, reservationFilterQueryString } from "@/lib/reservation-filters";

export const metadata: Metadata = {
  title: "Reservation · coocon",
};

export default async function ReservationPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    q?: string;
    status?: string;
    roomType?: string;
    source?: string;
    checkInFrom?: string;
    checkInTo?: string;
  }>;
}) {
  const session = await requireSession();
  const sp = await searchParams;
  const q = sp.q?.trim();
  const { status, roomType, source, checkInFrom, checkInTo } = sp;

  const now = new Date();
  const today = startOfDay(now);
  const tomorrow = addDays(today, 1);
  const weekAgo = addDays(today, -7);
  const twoWeeksAgo = addDays(today, -14);
  const monthStart = startOfMonth(now);
  const prevMonthStart = addMonths(monthStart, -1);
  const lastWeekSameDay = addDays(today, -7);
  const lastWeekSameDayEnd = addDays(lastWeekSameDay, 1);

  const [
    totalCount,
    confirmedCount,
    cancelledCount,
    checkInTodayCount,
    checkInLastWeekCount,
    thisWeekTotal,
    lastWeekTotal,
    thisWeekConfirmed,
    lastWeekConfirmed,
    thisWeekCancelled,
    lastWeekCancelled,
    revenueThisMonth,
    revenueLastMonth,
    rooms,
  ] = await Promise.all([
    prisma.reservation.count(),
    prisma.reservation.count({ where: { status: "Confirmed" } }),
    prisma.reservation.count({ where: { status: "Cancelled" } }),
    prisma.reservation.count({ where: { status: "Checked In", checkIn: { gte: today, lt: tomorrow } } }),
    prisma.reservation.count({ where: { status: "Checked In", checkIn: { gte: lastWeekSameDay, lt: lastWeekSameDayEnd } } }),
    prisma.reservation.count({ where: { checkIn: { gte: weekAgo, lt: today } } }),
    prisma.reservation.count({ where: { checkIn: { gte: twoWeeksAgo, lt: weekAgo } } }),
    prisma.reservation.count({ where: { status: "Confirmed", checkIn: { gte: weekAgo, lt: today } } }),
    prisma.reservation.count({ where: { status: "Confirmed", checkIn: { gte: twoWeeksAgo, lt: weekAgo } } }),
    prisma.reservation.count({ where: { status: "Cancelled", checkIn: { gte: weekAgo, lt: today } } }),
    prisma.reservation.count({ where: { status: "Cancelled", checkIn: { gte: twoWeeksAgo, lt: weekAgo } } }),
    prisma.reservation.aggregate({ _sum: { totalAmount: true }, where: { checkIn: { gte: monthStart } } }),
    prisma.reservation.aggregate({ _sum: { totalAmount: true }, where: { checkIn: { gte: prevMonthStart, lt: monthStart } } }),
    prisma.room.findMany({ orderBy: { number: "asc" }, select: { id: true, number: true, name: true, pricePerNight: true } }),
  ]);

  const where = buildReservationWhere({ q, status, roomType, source, checkInFrom, checkInTo });
  const filteredTotal = await prisma.reservation.count({ where });

  const totalDelta = percentChange(thisWeekTotal, lastWeekTotal);
  const confirmedDelta = percentChange(thisWeekConfirmed, lastWeekConfirmed);
  const cancelledDelta = percentChange(thisWeekCancelled, lastWeekCancelled);
  const checkInDelta = percentChange(checkInTodayCount, checkInLastWeekCount);
  const revenueDelta = percentChange(revenueThisMonth._sum.totalAmount ?? 0, revenueLastMonth._sum.totalAmount ?? 0);

  function fmtDateInput(date: Date) {
    return date.toISOString().slice(0, 10);
  }

  function hrefsFor(query: string) {
    return {
      viewHref: query ? `/reservation?${query}` : "/reservation",
      exportHref: query ? `/reservation/export?${query}` : "/reservation/export",
    };
  }

  const todayStr = fmtDateInput(today);
  const monthStartStr = fmtDateInput(monthStart);

  const stats: ReservationStat[] = [
    { label: "Total Reservations", value: String(totalCount), deltaPct: totalDelta.pct, direction: totalDelta.direction, fromLabel: "from last week", icon: "calendar", iconTheme: "blue", badgeTheme: "blue", ...hrefsFor("") },
    { label: "Confirmed", value: String(confirmedCount), deltaPct: confirmedDelta.pct, direction: confirmedDelta.direction, fromLabel: "from last week", icon: "check", iconTheme: "green", badgeTheme: "green", ...hrefsFor(reservationFilterQueryString({ status: "Confirmed" })) },
    { label: "Check-in Today", value: String(checkInTodayCount), deltaPct: checkInDelta.pct, direction: checkInDelta.direction, fromLabel: "from last week", icon: "clock", iconTheme: "orange", badgeTheme: "orange", ...hrefsFor(reservationFilterQueryString({ status: "Checked In", checkInFrom: todayStr, checkInTo: todayStr })) },
    { label: "Cancelled", value: String(cancelledCount), deltaPct: cancelledDelta.pct, direction: cancelledDelta.direction, fromLabel: "from last week", icon: "cancel", iconTheme: "red", badgeTheme: "red", ...hrefsFor(reservationFilterQueryString({ status: "Cancelled" })) },
    { label: "Revenue (This Month)", value: `$${(revenueThisMonth._sum.totalAmount ?? 0).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`, deltaPct: revenueDelta.pct, direction: revenueDelta.direction, fromLabel: "from last month", icon: "dollar", iconTheme: "violet", badgeTheme: "blue", ...hrefsFor(reservationFilterQueryString({ checkInFrom: monthStartStr, checkInTo: todayStr })) },
  ];

  const meta = paginationMeta(parsePage(sp), filteredTotal);
  const reservations = await prisma.reservation.findMany({
    where,
    include: { room: true },
    orderBy: { checkIn: "desc" },
    skip: meta.skip,
    take: meta.take,
  });

  const filterQuery = reservationFilterQueryString({ q, status, roomType, source, checkInFrom, checkInTo });
  const basePath = filterQuery ? `/reservation?${filterQuery}` : "/reservation";
  const exportHref = filterQuery ? `/reservation/export?${filterQuery}` : "/reservation/export";

  return (
    <div className="flex min-h-screen w-full bg-[#f9f9f7]">
      <Sidebar active="Reservation" />

      <main className="flex-1 px-5 py-6 lg:px-8">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
          <Header
            title="Reservation"
            searchPlaceholder="Search reservation, guest, room, etc"
            searchAction="/reservation"
            q={q}
            userName={session.user.name}
            userRole={session.user.role}
            userAvatarUrl={session.user.avatarUrl}
          />

          <StatCards stats={stats} />
          <Toolbar rooms={rooms} exportHref={exportHref} />
          <ReservationTable reservations={reservations} meta={meta} rooms={rooms} basePath={basePath} />
        </div>
      </main>
    </div>
  );
}
