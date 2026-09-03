import type { RoomOccupancySegment } from "./data";
import { IconHome } from "./icons";
import { Card, CardHeader } from "./Card";

export function RoomOccupancy({
  totalRooms,
  segments,
}: {
  totalRooms: number;
  segments: RoomOccupancySegment[];
}) {
  return (
    <Card>
      <CardHeader title="Room Occupancy" />

      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2a78d6]/10 text-[#2a78d6]">
          <IconHome className="h-5 w-5" />
        </span>
        <div>
          <p className="text-xl font-bold text-[#0b0b0b]">{totalRooms}</p>
          <p className="text-xs text-[#898781]">Total Rooms</p>
        </div>
      </div>

      <div className="mt-5 flex h-2.5 w-full gap-0.5 overflow-hidden rounded-full bg-[#e1e0d9]">
        {segments.map((seg) => (
          <span
            key={seg.label}
            style={{ width: totalRooms ? `${(seg.value / totalRooms) * 100}%` : 0, backgroundColor: seg.color }}
          />
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-3 text-xs">
        {segments.map((seg) => (
          <div key={seg.label} className="flex items-center gap-2">
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: seg.color }} />
            <span className="text-[#52514e]">
              <span className="font-semibold text-[#0b0b0b]">{seg.value}</span> {seg.label}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
