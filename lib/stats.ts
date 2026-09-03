export type Delta = {
  pct: number;
  direction: "up" | "down";
};

export function percentChange(current: number, previous: number): Delta {
  if (previous === 0) {
    return { pct: current === 0 ? 0 : 100, direction: current >= 0 ? "up" : "down" };
  }
  const change = ((current - previous) / previous) * 100;
  return { pct: Math.abs(Math.round(change * 10) / 10), direction: change >= 0 ? "up" : "down" };
}

export function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function addDays(date: Date, n: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function addMonths(date: Date, n: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + n, date.getDate());
}
