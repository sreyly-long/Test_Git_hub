import { IconCalendarCheck, IconSwapHorizontal, IconDownload } from "@/components/dashboard/icons";
import { FilterDropdown } from "@/components/dashboard/FilterDropdown";
import { DateRangeFilterDropdown } from "@/components/dashboard/DateRangeFilterDropdown";
import { AddReservationModal } from "./AddReservationModal";
import { RESERVATION_STATUSES, ROOM_TYPES, BOOKING_SOURCES } from "@/lib/constants";

type RoomOption = { id: string; number: string; name: string; pricePerNight: number };

const statusOptions = RESERVATION_STATUSES.map((s) => ({ value: s, label: s }));
const roomTypeOptions = ROOM_TYPES.map((t) => ({ value: t, label: t }));
const platformOptions = BOOKING_SOURCES.map((s) => ({ value: s, label: s }));

export function Toolbar({ rooms, exportHref }: { rooms: RoomOption[]; exportHref: string }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        className="flex items-center gap-2 rounded-xl border border-[#e1e0d9] bg-white px-3.5 py-2.5 text-sm text-[#52514e] hover:bg-black/[.02]"
      >
        <IconCalendarCheck className="h-4 w-4 text-[#898781]" />
        May 12, 2024 - Jun 12, 2024
        <IconSwapHorizontal className="h-4 w-4 text-[#898781]" />
      </button>

      <FilterDropdown paramName="status" allLabel="All Status" options={statusOptions} />
      <FilterDropdown paramName="roomType" allLabel="All Room Types" options={roomTypeOptions} />
      <FilterDropdown paramName="source" allLabel="All Platforms" options={platformOptions} />

      <DateRangeFilterDropdown
        fromParam="checkInFrom"
        toParam="checkInTo"
        label="Filters"
        title="Check-in date range"
        fromLabel="Check-in from"
        toLabel="Check-in to"
      />

      <div className="ml-auto flex items-center gap-3">
        <AddReservationModal rooms={rooms} />
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
