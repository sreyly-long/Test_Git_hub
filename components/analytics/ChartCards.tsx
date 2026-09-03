"use client";

import { Card, CardHeader } from "@/components/dashboard/Card";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { Donut, type DonutSlice } from "@/components/dashboard/Donut";
import { BarList, type BarListItem } from "@/components/dashboard/BarList";
import { formatCurrencyCompact } from "@/components/dashboard/chart-utils";
import { OccupancyBarChart, type OccupancyPoint } from "./OccupancyBarChart";

type TrendPoint = { label: string; value: number };

export function RevenueOverviewCard({ data }: { data: TrendPoint[] }) {
  const maxVal = Math.max(...data.map((d) => d.value), 4);
  const niceTop = Math.max(Math.ceil(maxVal / 5000) * 5000, 5000);
  const ticks = [0, niceTop / 4, niceTop / 2, (niceTop * 3) / 4, niceTop];

  return (
    <Card>
      <CardHeader title="Revenue Overview" />
      <TrendChart
        data={data}
        color="#2a78d6"
        yAxisTicks={ticks}
        formatValue={(v) => formatCurrencyCompact(v)}
        formatTooltipTitle={(label) => label}
      />
    </Card>
  );
}

export function BookingsByPlatformCard({ slices }: { slices: DonutSlice[] }) {
  return (
    <Card>
      <CardHeader title="Bookings by Platform" />
      <Donut slices={slices} totalLabel="Total" totalSubLabel="Bookings" />
    </Card>
  );
}

export function OccupancyRateCard({ data }: { data: OccupancyPoint[] }) {
  return (
    <Card>
      <CardHeader title="Occupancy Rate" />
      <OccupancyBarChart data={data} />
    </Card>
  );
}

export function RoomTypePerformanceCard({ items }: { items: BarListItem[] }) {
  return (
    <Card>
      <CardHeader title="Room Type Performance" />
      <BarList items={items} />
    </Card>
  );
}

export function RevenueByRoomTypeCard({ items }: { items: BarListItem[] }) {
  return (
    <Card>
      <CardHeader title="Revenue by Room Type" />
      <BarList items={items} />
    </Card>
  );
}
