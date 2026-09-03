import { Card } from "@/components/dashboard/Card";
import { StatCardMenu } from "@/components/dashboard/StatCardMenu";
import { IconArrowUp, IconArrowDown, IconInvoice, IconAlertCircle, IconDollarCircle } from "@/components/dashboard/icons";
import type { InvoiceStat, InvoiceStatTheme } from "./data";

const iconByKey = {
  invoice: IconInvoice,
  alert: IconAlertCircle,
  dollar: IconDollarCircle,
} as const;

const iconTheme: Record<InvoiceStatTheme, string> = {
  blue: "bg-[#2a78d6]/10 text-[#2a78d6]",
  green: "bg-[#0ca30c]/10 text-[#0ca30c]",
  orange: "bg-[#eda100]/15 text-[#c98500]",
  red: "bg-[#e34948]/10 text-[#d03b3b]",
  violet: "bg-[#4a3aa7]/10 text-[#4a3aa7]",
};

const subtitleTheme: Record<InvoiceStatTheme, string> = {
  blue: "text-[#184f95]",
  green: "text-[#006300]",
  orange: "text-[#8a5a00]",
  red: "text-[#d03b3b]",
  violet: "text-[#4a3aa7]",
};

export function StatCards({ stats }: { stats: InvoiceStat[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {stats.map((stat) => {
        const Icon = iconByKey[stat.icon];

        if (stat.kind === "delta") {
          return (
            <Card key={stat.label}>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${iconTheme[stat.iconTheme]}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm text-[#52514e]">{stat.label}</span>
                </div>
                <StatCardMenu viewHref={stat.viewHref} exportHref={stat.exportHref} />
              </div>
              <p className="text-2xl font-bold text-[#0b0b0b]">{stat.value}</p>
              <div className="mt-3 flex items-center gap-2">
                <span
                  className={`flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs font-medium ${
                    stat.direction === "up" ? "bg-[#0ca30c]/10 text-[#006300]" : "bg-[#d03b3b]/10 text-[#d03b3b]"
                  }`}
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
        }

        return (
          <Card key={stat.label}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${iconTheme[stat.iconTheme]}`}>
                  <Icon className="h-5 w-5" />
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
