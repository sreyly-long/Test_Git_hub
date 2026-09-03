import { Card } from "@/components/dashboard/Card";
import {
  IconMoreVertical,
  IconBuilding,
  IconUsersDuo,
  IconBed,
  IconCalendarCheck,
  IconWrench,
} from "@/components/dashboard/icons";
import type { RoomStatTheme } from "./data";

type RoomCounts = {
  total: number;
  occupied: number;
  available: number;
  reserved: number;
  maintenance: number;
};

const iconTheme: Record<RoomStatTheme, string> = {
  blue: "bg-[#2a78d6]/10 text-[#2a78d6]",
  green: "bg-[#0ca30c]/10 text-[#0ca30c]",
  orange: "bg-[#eda100]/15 text-[#c98500]",
  red: "bg-[#e34948]/10 text-[#d03b3b]",
};

const subtitleTheme: Record<RoomStatTheme | "muted", string> = {
  blue: "text-[#184f95]",
  green: "text-[#006300]",
  orange: "text-[#8a5a00]",
  red: "text-[#d03b3b]",
  muted: "text-[#898781]",
};

function pctOfTotal(value: number, total: number) {
  if (total === 0) return "0% of total";
  return `${((value / total) * 100).toFixed(1)}% of total`;
}

export function StatCards({ total, occupied, available, reserved, maintenance }: RoomCounts) {
  const stats: {
    label: string;
    value: number;
    subtitle: string;
    subtitleTheme: RoomStatTheme | "muted";
    Icon: typeof IconBuilding;
    iconTheme: RoomStatTheme;
  }[] = [
    { label: "Total Rooms", value: total, subtitle: "All rooms", subtitleTheme: "muted", Icon: IconBuilding, iconTheme: "blue" },
    { label: "Occupied", value: occupied, subtitle: pctOfTotal(occupied, total), subtitleTheme: "green", Icon: IconUsersDuo, iconTheme: "green" },
    { label: "Available", value: available, subtitle: pctOfTotal(available, total), subtitleTheme: "blue", Icon: IconBed, iconTheme: "blue" },
    { label: "Reserved", value: reserved, subtitle: pctOfTotal(reserved, total), subtitleTheme: "orange", Icon: IconCalendarCheck, iconTheme: "orange" },
    { label: "Maintenance", value: maintenance, subtitle: pctOfTotal(maintenance, total), subtitleTheme: "red", Icon: IconWrench, iconTheme: "red" },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
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
            <button type="button" aria-label="More options" className="text-[#898781] hover:text-[#52514e]">
              <IconMoreVertical className="h-4 w-4" />
            </button>
          </div>

          <p className={`mt-3 text-xs font-medium ${subtitleTheme[stat.subtitleTheme]}`}>{stat.subtitle}</p>
        </Card>
      ))}
    </div>
  );
}
