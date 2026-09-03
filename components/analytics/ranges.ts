import { addDays, addMonths, startOfMonth } from "@/lib/stats";
import { MONTH_LABELS } from "@/lib/platform-colors";

export type RangeKey = "5w" | "3m" | "6m" | "1y";

export const DEFAULT_RANGE: RangeKey = "5w";

export const RANGE_OPTIONS: { value: RangeKey; label: string }[] = [
  { value: "5w", label: "Last 5 Weeks" },
  { value: "3m", label: "Last 3 Months" },
  { value: "6m", label: "Last 6 Months" },
  { value: "1y", label: "This Year" },
];

export function parseRange(value: string | undefined): RangeKey {
  return RANGE_OPTIONS.some((o) => o.value === value) ? (value as RangeKey) : DEFAULT_RANGE;
}

export type Bucket = { start: Date; end: Date; label: string };

/** Buckets for the trend charts: weekly for "5w", monthly otherwise. */
export function bucketsForRange(range: RangeKey, today: Date): Bucket[] {
  if (range === "5w") {
    return Array.from({ length: 5 }, (_, i) => {
      const start = addDays(today, -35 + i * 7);
      const end = addDays(start, 7);
      return { start, end, label: start.toLocaleDateString(undefined, { month: "short", day: "numeric" }) };
    });
  }

  if (range === "1y") {
    const yearStart = new Date(today.getFullYear(), 0, 1);
    return Array.from({ length: 12 }, (_, i) => {
      const start = addMonths(yearStart, i);
      const end = addMonths(start, 1);
      return { start, end, label: MONTH_LABELS[start.getMonth()] };
    });
  }

  const n = range === "3m" ? 3 : 6;
  const base = startOfMonth(today);
  return Array.from({ length: n }, (_, i) => {
    const start = addMonths(base, -(n - 1) + i);
    const end = addMonths(start, 1);
    return { start, end, label: MONTH_LABELS[start.getMonth()] };
  });
}
