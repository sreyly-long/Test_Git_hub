import { Card } from "@/components/dashboard/Card";
import { StatCardMenu } from "@/components/dashboard/StatCardMenu";
import { IconBuilding, IconCheckCircle, IconLogout, IconUserX } from "@/components/dashboard/icons";
import type { StaffStatTheme } from "./data";

const iconTheme: Record<StaffStatTheme, string> = {
  blue: "bg-[#2a78d6]/10 text-[#2a78d6]",
  green: "bg-[#0ca30c]/10 text-[#0ca30c]",
  orange: "bg-[#eda100]/15 text-[#c98500]",
  red: "bg-[#e34948]/10 text-[#d03b3b]",
};

const subtitleTheme: Record<StaffStatTheme | "muted", string> = {
  blue: "text-[#184f95]",
  green: "text-[#006300]",
  orange: "text-[#8a5a00]",
  red: "text-[#d03b3b]",
  muted: "text-[#898781]",
};

function pct(value: number, total: number) {
  return total === 0 ? "0.0% of total" : `${((value / total) * 100).toFixed(1)}% of total`;
}

function hrefsFor(query: string) {
  return {
    viewHref: query ? `/staffs?${query}` : "/staffs",
    exportHref: query ? `/staffs/export?${query}` : "/staffs/export",
  };
}

type Counts = { total: number; active: number; onLeave: number; inactive: number };

export function StatCards({ total, active, onLeave, inactive }: Counts) {
  const stats = [
    { label: "Total Staffs", value: total, subtitle: "All employees", subtitleTheme: "muted" as const, Icon: IconBuilding, iconTheme: "blue" as const, ...hrefsFor("") },
    { label: "Active", value: active, subtitle: pct(active, total), subtitleTheme: "green" as const, Icon: IconCheckCircle, iconTheme: "green" as const, ...hrefsFor("status=Active") },
    { label: "On Leave", value: onLeave, subtitle: pct(onLeave, total), subtitleTheme: "orange" as const, Icon: IconLogout, iconTheme: "orange" as const, ...hrefsFor(`status=${encodeURIComponent("On Leave")}`) },
    { label: "Inactive", value: inactive, subtitle: pct(inactive, total), subtitleTheme: "red" as const, Icon: IconUserX, iconTheme: "red" as const, ...hrefsFor("status=Inactive") },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${iconTheme[stat.iconTheme]}`}>
                <stat.Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm text-[#52514e]">{stat.label}</p>
                <p className="text-2xl font-bold text-[#0b0b0b]">{stat.value}</p>
              </div>
            </div>
            <StatCardMenu viewHref={stat.viewHref} exportHref={stat.exportHref} />
          </div>

          <p className={`mt-3 text-xs font-medium ${subtitleTheme[stat.subtitleTheme]}`}>{stat.subtitle}</p>
        </Card>
      ))}
    </div>
  );
}
