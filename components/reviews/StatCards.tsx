import { Card } from "@/components/dashboard/Card";
import { StatCardMenu } from "@/components/dashboard/StatCardMenu";
import { IconArrowUp, IconArrowDown, IconStarFilled, IconChat } from "@/components/dashboard/icons";
import { Stars } from "./Stars";
import type { ReviewStat, ReviewStatTheme } from "./data";

function DeltaBadge({ pct, direction, suffix = "" }: { pct: number; direction: "up" | "down"; suffix?: string }) {
  return (
    <span
      className={`flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs font-medium ${
        direction === "up" ? "bg-[#0ca30c]/10 text-[#006300]" : "bg-[#d03b3b]/10 text-[#d03b3b]"
      }`}
    >
      {direction === "up" ? <IconArrowUp className="h-3 w-3" /> : <IconArrowDown className="h-3 w-3" />}
      {pct}
      {suffix}
    </span>
  );
}

const iconTheme: Record<ReviewStatTheme, string> = {
  amber: "bg-[#eda100]/15 text-[#c98500]",
  blue: "bg-[#2a78d6]/10 text-[#2a78d6]",
  green: "bg-[#0ca30c]/10 text-[#0ca30c]",
  red: "bg-[#e34948]/10 text-[#d03b3b]",
};

const subtitleTheme: Record<ReviewStatTheme, string> = {
  amber: "text-[#8a5a00]",
  blue: "text-[#184f95]",
  green: "text-[#006300]",
  red: "text-[#d03b3b]",
};

export function StatCards({ stats }: { stats: ReviewStat[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {stats.map((stat) => {
        if (stat.kind === "rating") {
          return (
            <Card key={stat.label}>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${iconTheme.amber}`}>
                    <IconStarFilled className="h-5 w-5" />
                  </span>
                  <span className="text-sm text-[#52514e]">{stat.label}</span>
                </div>
                <StatCardMenu viewHref={stat.viewHref} exportHref={stat.exportHref} />
              </div>
              <p className="text-2xl font-bold text-[#0b0b0b]">{stat.value}</p>
              <div className="mt-2">
                <Stars rating={Math.round(stat.value)} />
              </div>
              <div className="mt-2 flex items-center gap-2">
                <DeltaBadge pct={stat.deltaPct} direction={stat.direction} />
                <span className="text-xs text-[#898781]">{stat.fromLabel}</span>
              </div>
            </Card>
          );
        }

        if (stat.kind === "delta") {
          return (
            <Card key={stat.label}>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${iconTheme[stat.iconTheme]}`}>
                    <IconChat className="h-5 w-5" />
                  </span>
                  <span className="text-sm text-[#52514e]">{stat.label}</span>
                </div>
                <StatCardMenu viewHref={stat.viewHref} exportHref={stat.exportHref} />
              </div>
              <p className="text-2xl font-bold text-[#0b0b0b]">{stat.value}</p>
              <div className="mt-3 flex items-center gap-2">
                <DeltaBadge pct={stat.deltaPct} direction={stat.direction} suffix="%" />
                <span className="text-xs text-[#898781]">{stat.fromLabel}</span>
              </div>
            </Card>
          );
        }

        return (
          <Card key={stat.label}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${iconTheme[stat.iconTheme]}`}>
                  <IconStarFilled className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm text-[#52514e]">{stat.label}</p>
                  <p className="text-2xl font-bold text-[#0b0b0b]">{stat.value}</p>
                </div>
              </div>
              <StatCardMenu viewHref={stat.viewHref} exportHref={stat.exportHref} />
            </div>
            <p className={`mt-3 text-xs font-medium ${subtitleTheme[stat.iconTheme]}`}>{stat.subtitle}</p>
          </Card>
        );
      })}
    </div>
  );
}
