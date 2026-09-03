import { Card } from "@/components/dashboard/Card";
import { StatCardMenu } from "@/components/dashboard/StatCardMenu";
import {
  IconArrowUp,
  IconArrowDown,
  IconCalendarCheck,
  IconCheckCircle,
  IconClock,
  IconXCircle,
  IconDollarCircle,
} from "@/components/dashboard/icons";
import type { StatTheme } from "./data";

const iconByKey = {
  calendar: IconCalendarCheck,
  check: IconCheckCircle,
  clock: IconClock,
  cancel: IconXCircle,
  dollar: IconDollarCircle,
} as const;

export type ReservationStat = {
  label: string;
  value: string;
  deltaPct: number;
  direction: "up" | "down";
  fromLabel: string;
  icon: keyof typeof iconByKey;
  iconTheme: StatTheme;
  badgeTheme: StatTheme;
  viewHref: string;
  exportHref: string;
};

const iconTheme: Record<StatTheme, string> = {
  blue: "bg-[#2a78d6]/10 text-[#2a78d6]",
  green: "bg-[#0ca30c]/10 text-[#0ca30c]",
  orange: "bg-[#eda100]/15 text-[#c98500]",
  red: "bg-[#e34948]/10 text-[#d03b3b]",
  violet: "bg-[#4a3aa7]/10 text-[#4a3aa7]",
};

const badgeTheme: Record<StatTheme, string> = {
  blue: "bg-[#2a78d6]/10 text-[#184f95]",
  green: "bg-[#0ca30c]/10 text-[#006300]",
  orange: "bg-[#eda100]/15 text-[#8a5a00]",
  red: "bg-[#d03b3b]/10 text-[#d03b3b]",
  violet: "bg-[#4a3aa7]/10 text-[#4a3aa7]",
};

export function StatCards({ stats }: { stats: ReservationStat[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {stats.map((stat) => {
        const Icon = iconByKey[stat.icon];
        return (
          <Card key={stat.label}>
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${iconTheme[stat.iconTheme]}`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-sm text-[#52514e]">{stat.label}</span>
              </div>
              <StatCardMenu viewHref={stat.viewHref} exportHref={stat.exportHref} />
            </div>

            <p className="text-2xl font-bold text-[#0b0b0b]">{stat.value}</p>

            <div className="mt-3 flex items-center gap-2">
              <span
                className={`flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs font-medium ${badgeTheme[stat.badgeTheme]}`}
              >
                {stat.direction === "up" ? (
                  <IconArrowUp className="h-3 w-3" />
                ) : (
                  <IconArrowDown className="h-3 w-3" />
                )}
                {stat.deltaPct}%
              </span>
              <span className="text-xs text-[#898781]">{stat.fromLabel}</span>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
