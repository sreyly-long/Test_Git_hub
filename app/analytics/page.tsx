import type { Metadata } from "next";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { StatCards } from "@/components/analytics/StatCards";
import { Toolbar } from "@/components/analytics/Toolbar";
import { RangePicker } from "@/components/analytics/RangePicker";
import {
  RevenueOverviewCard,
  BookingsByPlatformCard,
  OccupancyRateCard,
  RoomTypePerformanceCard,
  RevenueByRoomTypeCard,
} from "@/components/analytics/ChartCards";
import type { AnalyticsStat } from "@/components/analytics/data";
import { parseRange } from "@/components/analytics/ranges";
import { getAnalyticsData } from "@/lib/analytics-data";
import { requireSession } from "@/lib/session";
import { startOfDay, startOfMonth } from "@/lib/stats";

export const metadata: Metadata = {
  title: "Analytics · coocon",
};

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>;
}) {
  const session = await requireSession();
  const sp = await searchParams;
  const range = parseRange(sp.range);

  const data = await getAnalyticsData(range);

  const today = startOfDay(new Date());
  const monthStart = startOfMonth(new Date());
  const todayStr = today.toISOString().slice(0, 10);
  const monthStartStr = monthStart.toISOString().slice(0, 10);
  const monthQuery = `checkInFrom=${monthStartStr}&checkInTo=${todayStr}`;

  const stats: AnalyticsStat[] = [
    {
      label: "Total Revenue",
      value: `$${data.revenueThisMonth.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
      deltaPct: data.revenueDelta.pct,
      direction: data.revenueDelta.direction,
      fromLabel: "from last month",
      icon: "dollar",
      iconTheme: "blue",
      viewHref: `/reservation?${monthQuery}`,
      exportHref: `/reservation/export?${monthQuery}`,
    },
    {
      label: "Total Bookings",
      value: String(data.bookingsThisMonth),
      deltaPct: data.bookingsDelta.pct,
      direction: data.bookingsDelta.direction,
      fromLabel: "from last month",
      icon: "calendar",
      iconTheme: "blue",
      viewHref: `/reservation?${monthQuery}`,
      exportHref: `/reservation/export?${monthQuery}`,
    },
    {
      label: "Average Daily Rate",
      value: `$${data.adrThisMonth.toFixed(0)}`,
      deltaPct: data.adrDelta.pct,
      direction: data.adrDelta.direction,
      fromLabel: "from last month",
      icon: "trending",
      iconTheme: "blue",
      viewHref: `/reservation?${monthQuery}`,
      exportHref: `/reservation/export?${monthQuery}`,
    },
    {
      label: "Occupancy Rate",
      value: `${data.occupancyThisMonthPct.toFixed(1)}%`,
      deltaPct: data.occupancyDelta.pct,
      direction: data.occupancyDelta.direction,
      fromLabel: "from last month",
      icon: "pie",
      iconTheme: "violet",
      viewHref: "/rooms",
      exportHref: "/rooms/export",
    },
  ];

  const exportHref = `/analytics/export?range=${range}`;

  return (
    <div className="flex min-h-screen w-full bg-[#f9f9f7]">
      <Sidebar active="Analytics" />

      <main className="flex-1 px-5 py-6 lg:px-8">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
          <Header
            title="Analytics"
            rightControl={<RangePicker />}
            userName={session.user.name}
            userRole={session.user.role}
          />

          <StatCards stats={stats} />
          <Toolbar exportHref={exportHref} />

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.6fr_1fr]">
            <RevenueOverviewCard data={data.revenueOverview} />
            <BookingsByPlatformCard slices={data.bookingsByPlatform} />
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <OccupancyRateCard data={data.occupancyRate} />
            <RoomTypePerformanceCard items={data.roomTypePerformance} />
            <RevenueByRoomTypeCard items={data.revenueByRoomType} />
          </div>
        </div>
      </main>
    </div>
  );
}
