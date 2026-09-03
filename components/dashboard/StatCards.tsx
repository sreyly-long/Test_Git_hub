import type { StatCard } from "./data";
import { IconArrowUp, IconArrowDown } from "./icons";
import { Card, CardHeader } from "./Card";

export function StatCards({ stats }: { stats: StatCard[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardHeader title={stat.label} />
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
      ))}
    </div>
  );
}
