export type AnalyticsStat = {
  label: string;
  value: string;
  deltaPct: number;
  direction: "up" | "down";
  fromLabel: string;
  icon: "dollar" | "calendar" | "trending" | "pie";
  iconTheme: "blue" | "violet";
};
