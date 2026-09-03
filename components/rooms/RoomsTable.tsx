import type { Room } from "@prisma/client";
import { Card } from "@/components/dashboard/Card";
import { PaginationFooter } from "@/components/dashboard/PaginationFooter";
import { DeleteButton } from "@/components/dashboard/DeleteButton";
import {
  IconBed,
  IconUsersDuo,
  IconWifi,
  IconMonitor,
  IconSnowflake,
  IconCoffeeCup,
  IconBath,
} from "@/components/dashboard/icons";
import { deleteRoomAction } from "@/lib/actions/rooms";
import type { RoomFeature } from "@/lib/constants";
import { thumbThemeForRoomType, parseFeatures, type RoomStatTheme } from "./data";
import type { PaginationMeta } from "@/lib/pagination";

const statusStyles: Record<string, string> = {
  Available: "bg-[#0ca30c]/10 text-[#006300]",
  Occupied: "bg-[#2a78d6]/10 text-[#184f95]",
  Reserved: "bg-[#eda100]/15 text-[#8a5a00]",
  Maintenance: "bg-[#d03b3b]/10 text-[#d03b3b]",
};

const thumbTheme: Record<RoomStatTheme, string> = {
  blue: "bg-gradient-to-br from-[#cde2fb] to-[#86b6ef] text-[#184f95]",
  green: "bg-gradient-to-br from-[#cdeed6] to-[#8fdba9] text-[#006300]",
  orange: "bg-gradient-to-br from-[#fbe4b8] to-[#f3c56e] text-[#8a5a00]",
  red: "bg-gradient-to-br from-[#fbd8d7] to-[#f0a6a4] text-[#8f1f1e]",
};

const featureIcons: Record<RoomFeature, typeof IconWifi> = {
  wifi: IconWifi,
  tv: IconMonitor,
  ac: IconSnowflake,
  coffee: IconCoffeeCup,
  bath: IconBath,
};

const columns = ["Room No.", "Room Type", "Floor", "Status", "Price / Night", "Capacity", "Features", "Actions"];

export function RoomsTable({ rooms, meta }: { rooms: Room[]; meta: PaginationMeta }) {
  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[960px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[#e1e0d9] text-xs uppercase tracking-wide text-[#898781]">
              {columns.map((col) => (
                <th key={col} className="whitespace-nowrap py-2.5 pr-4 font-medium">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e1e0d9]">
            {rooms.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="py-8 text-center text-sm text-[#898781]">
                  No rooms found.
                </td>
              </tr>
            )}
            {rooms.map((room) => (
              <tr key={room.id} className="text-[#0b0b0b]">
                <td className="whitespace-nowrap py-3 pr-4">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${thumbTheme[thumbThemeForRoomType(room.roomType)]}`}
                    >
                      <IconBed className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-medium text-[#0b0b0b]">{room.number}</p>
                      <p className="text-xs text-[#898781]">{room.name}</p>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap py-3 pr-4 text-[#52514e]">{room.roomType}</td>
                <td className="whitespace-nowrap py-3 pr-4 text-[#52514e]">{room.floor}</td>
                <td className="whitespace-nowrap py-3 pr-4">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[room.status]}`}>
                    {room.status}
                  </span>
                </td>
                <td className="whitespace-nowrap py-3 pr-4 font-medium">${room.pricePerNight.toFixed(2)}</td>
                <td className="whitespace-nowrap py-3 pr-4 text-[#52514e]">
                  <span className="flex items-center gap-1.5">
                    <IconUsersDuo className="h-4 w-4 text-[#898781]" />
                    {room.capacity}
                  </span>
                </td>
                <td className="whitespace-nowrap py-3 pr-4">
                  <div className="flex items-center gap-2 text-[#898781]">
                    {parseFeatures(room.features).map((feature) => {
                      const FeatureIcon = featureIcons[feature];
                      return FeatureIcon ? <FeatureIcon key={feature} className="h-4 w-4" /> : null;
                    })}
                  </div>
                </td>
                <td className="whitespace-nowrap py-3 pr-4">
                  <DeleteButton
                    action={deleteRoomAction.bind(null, room.id)}
                    confirmMessage={`Delete room ${room.number}? This cannot be undone.`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PaginationFooter {...meta} basePath="/rooms" />
    </Card>
  );
}
