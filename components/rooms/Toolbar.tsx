import { IconDownload, IconSearch } from "@/components/dashboard/icons";
import { FilterDropdown } from "@/components/dashboard/FilterDropdown";
import { NumberRangeFilterDropdown } from "@/components/dashboard/NumberRangeFilterDropdown";
import { AddRoomModal } from "./AddRoomModal";
import { ROOM_TYPES, ROOM_STATUSES } from "@/lib/constants";

const roomTypeOptions = ROOM_TYPES.map((t) => ({ value: t, label: t }));
const statusOptions = ROOM_STATUSES.map((s) => ({ value: s, label: s }));

export function Toolbar({ q, floors, exportHref }: { q?: string; floors: number[]; exportHref: string }) {
  const floorOptions = floors.map((f) => ({ value: String(f), label: `Floor ${f}` }));

  return (
    <div className="flex flex-wrap items-center gap-3">
      <FilterDropdown paramName="roomType" allLabel="All Room Types" options={roomTypeOptions} />
      <FilterDropdown paramName="status" allLabel="All Status" options={statusOptions} />
      <FilterDropdown paramName="floor" allLabel="All Floors" options={floorOptions} />

      <form action="/rooms" method="get">
        <label className="relative">
          <IconSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#898781]" />
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Search room number..."
            className="w-52 rounded-xl border border-[#e1e0d9] bg-white py-2.5 pl-9 pr-3 text-sm text-[#0b0b0b] placeholder:text-[#898781] focus:outline-none focus:ring-2 focus:ring-[#2a78d6]/30"
          />
        </label>
      </form>

      <NumberRangeFilterDropdown
        minParam="priceMin"
        maxParam="priceMax"
        label="Filters"
        title="Price per night"
        minLabel="Min ($)"
        maxLabel="Max ($)"
        prefix="$"
      />

      <div className="ml-auto flex items-center gap-3">
        <AddRoomModal />
        <a
          href={exportHref}
          className="flex items-center gap-2 rounded-xl border border-[#e1e0d9] bg-white px-4 py-2.5 text-sm text-[#52514e] hover:bg-black/[.02]"
        >
          <IconDownload className="h-4 w-4" />
          Export
        </a>
      </div>
    </div>
  );
}
