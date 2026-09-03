import { requireSession } from "@/lib/session";
import { getAnalyticsData } from "@/lib/analytics-data";
import { parseRange, RANGE_OPTIONS } from "@/components/analytics/ranges";
import { createStyledMultiSheetWorkbookBuffer, xlsxResponse } from "@/lib/xlsx-export";

function fmtDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function fmtDelta(pct: number, direction: "up" | "down") {
  return `${direction === "up" ? "+" : "-"}${pct}%`;
}

export async function GET(request: Request) {
  await requireSession();

  const { searchParams } = new URL(request.url);
  const range = parseRange(searchParams.get("range") ?? undefined);
  const rangeLabel = RANGE_OPTIONS.find((o) => o.value === range)?.label ?? "Last 5 Weeks";

  const data = await getAnalyticsData(range);

  const buffer = await createStyledMultiSheetWorkbookBuffer([
    {
      sheetName: "Summary",
      columns: [
        { header: "Metric", key: "metric", width: 22, align: "left" },
        { header: "Value", key: "value", width: 16 },
        { header: "Change", key: "change", width: 16 },
        { header: "Period", key: "period", width: 18, align: "left" },
      ],
      rows: [
        { metric: "Total Revenue", value: `$${data.revenueThisMonth.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, change: fmtDelta(data.revenueDelta.pct, data.revenueDelta.direction), period: "This month vs last" },
        { metric: "Total Bookings", value: data.bookingsThisMonth, change: fmtDelta(data.bookingsDelta.pct, data.bookingsDelta.direction), period: "This month vs last" },
        { metric: "Average Daily Rate", value: `$${data.adrThisMonth.toFixed(0)}`, change: fmtDelta(data.adrDelta.pct, data.adrDelta.direction), period: "This month vs last" },
        { metric: "Occupancy Rate", value: `${data.occupancyThisMonthPct.toFixed(1)}%`, change: fmtDelta(data.occupancyDelta.pct, data.occupancyDelta.direction), period: "This month vs last" },
      ],
    },
    {
      sheetName: "Revenue Overview",
      columns: [
        { header: "Period", key: "period", width: 16, align: "left" },
        { header: "Revenue", key: "revenue", width: 14 },
      ],
      rows: data.revenueOverview.map((b) => ({ period: b.label, revenue: b.value })),
    },
    {
      sheetName: "Occupancy Rate",
      columns: [
        { header: "Period", key: "period", width: 16, align: "left" },
        { header: "Occupancy %", key: "occupancy", width: 14 },
      ],
      rows: data.occupancyRate.map((b) => ({ period: b.label, occupancy: b.value })),
    },
    {
      sheetName: "Bookings by Platform",
      columns: [
        { header: "Platform", key: "platform", width: 18, align: "left" },
        { header: "Bookings", key: "bookings", width: 12 },
        { header: "Share", key: "share", width: 10 },
      ],
      rows: data.bookingsByPlatform.map((p) => ({ platform: p.name, bookings: p.value, share: `${p.pct}%` })),
    },
    {
      sheetName: "Room Types",
      columns: [
        { header: "Room Type", key: "roomType", width: 16, align: "left" },
        { header: "Occupancy %", key: "occupancy", width: 14 },
        { header: "Revenue (30 days)", key: "revenue", width: 18 },
      ],
      rows: data.roomTypePerformance.map((perf) => {
        const revenue = data.revenueByRoomType.find((r) => r.label === perf.label);
        return { roomType: perf.label, occupancy: perf.value, revenue: revenue?.value ?? "$0" };
      }),
    },
  ]);

  const filename = `analytics-${rangeLabel.toLowerCase().replace(/\s+/g, "-")}-${fmtDate(new Date())}.xlsx`;
  return xlsxResponse(buffer, filename);
}
