"use client";

import { Card } from "./Card";
import { IconChevronDown } from "./icons";
import { TrendChart } from "./TrendChart";
import { BookingsChart, type BookingsDatum } from "./BookingsChart";
import { PlatformDonut } from "./PlatformDonut";
import type { DonutSlice } from "./Donut";
import { formatCurrencyCompact } from "./chart-utils";

function RangeSelect({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="flex items-center gap-1 rounded-lg border border-[#e1e0d9] px-2.5 py-1 text-xs text-[#52514e]"
    >
      {label}
      <IconChevronDown className="h-3 w-3" />
    </button>
  );
}

type TrendPoint = { label: string; value: number };

export function GuestsCard({ data }: { data: TrendPoint[] }) {
  const maxVal = Math.max(...data.map((d) => d.value), 4);
  const niceTop = Math.max(Math.ceil(maxVal / 100) * 100, 100);
  const ticks = [0, niceTop / 4, niceTop / 2, (niceTop * 3) / 4, niceTop];

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-[#0b0b0b]">Guests</h2>
        <RangeSelect label="This Week" />
      </div>
      <TrendChart
        data={data}
        color="#2a78d6"
        yAxisTicks={ticks}
        formatValue={(v) => `${v.toLocaleString()} Guests`}
        formatTooltipTitle={(label) => `${label}`}
      />
    </Card>
  );
}

export function RevenueCard({ data }: { data: TrendPoint[] }) {
  const maxVal = Math.max(...data.map((d) => d.value), 4);
  const niceTop = Math.max(Math.ceil(maxVal / 5000) * 5000, 5000);
  const ticks = [0, niceTop / 4, niceTop / 2, (niceTop * 3) / 4, niceTop];

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-[#0b0b0b]">Revenue</h2>
        <RangeSelect label="Last 8 Months" />
      </div>
      <TrendChart
        data={data}
        color="#eb6834"
        yAxisTicks={ticks}
        formatValue={(v) => formatCurrencyCompact(v)}
        formatTooltipTitle={(label) => label}
      />
    </Card>
  );
}

export function BookingsCard({ data }: { data: BookingsDatum[] }) {
  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-[#0b0b0b]">Bookings</h2>
        <RangeSelect label="This Year" />
      </div>
      <div className="mb-3 flex items-center gap-4 text-xs text-[#52514e]">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#5598e7]" /> Booked
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#12172b]" /> Canceled
        </span>
      </div>
      <BookingsChart data={data} />
    </Card>
  );
}

export function BookingsByPlatformCard({ slices, totalSubLabel }: { slices: DonutSlice[]; totalSubLabel: string }) {
  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-[#0b0b0b]">Bookings by Platform</h2>
        <RangeSelect label="This Week" />
      </div>
      <PlatformDonut slices={slices} totalSubLabel={totalSubLabel} />
    </Card>
  );
}
