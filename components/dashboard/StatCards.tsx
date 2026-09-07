import type { StatCard, StatCardTheme } from "./data";
import { IconArrowUp, IconArrowDown, IconDollarCircle, IconCalendarPlus, IconCheckCircle, IconLogout } from "./icons";
import { Card } from "./Card";

const iconByKey = {
  dollar: IconDollarCircle,
  calendar: IconCalendarPlus,
  checkIn: IconCheckCircle,
  checkOut: IconLogout,
} as const;

const iconTheme: Record<StatCardTheme, string> = {
  blue: "bg-[#2a78d6]/10 text-[#2a78d6]",
  green: "bg-[#0ca30c]/10 text-[#0ca30c]",
  pink: "bg-[#e87ba4]/15 text-[#d55181]",
  violet: "bg-[#4a3aa7]/10 text-[#4a3aa7]",
};

export function StatCards({ stats }: { stats: StatCard[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = iconByKey[stat.icon];
        return (
          <Card key={stat.label}>
            <div className="mb-3 flex items-center gap-3">
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${iconTheme[stat.iconTheme]}`}>
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-sm text-[#52514e]">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold text-[#0b0b0b]">{stat.value}</p>
            <div className="mt-3 flex items-center gap-2">
              <span
                className={`flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs font-medium ${
                  stat.direction === "up"
                    ? "bg-[#0ca30c]/10 text-[#006300]"
                    : "bg-[#d03b3b]/10 text-[#d03b3b]"
                }`}
              >
                {stat.direction === "up" ? (
                  <IconArrowUp className="h-3 w-3" />
                ) : (
                  <IconArrowDown className="h-3 w-3" />
                )}
                {stat.deltaPct}%
              </span>
              <span className="text-xs text-[#898781]">from last week</span>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
