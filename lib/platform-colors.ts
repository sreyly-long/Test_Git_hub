export const PLATFORM_COLORS: Record<string, string> = {
  "Booking.com": "#184f95",
  Agoda: "#2a78d6",
  Airbnb: "#5598e7",
  "Hotels.com": "#9ec5f4",
  TripAdvisor: "#cde2fb",
  Traveloka: "#eda100",
  Direct: "#12172b",
};

export function colorForPlatform(name: string): string {
  return PLATFORM_COLORS[name] ?? "#898781";
}

export const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
