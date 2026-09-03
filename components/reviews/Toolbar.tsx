import { IconDownload } from "@/components/dashboard/icons";
import { FilterDropdown } from "@/components/dashboard/FilterDropdown";
import { DateRangeFilterDropdown } from "@/components/dashboard/DateRangeFilterDropdown";
import { REVIEW_SOURCES, ROOM_TYPES } from "@/lib/constants";

const sourceOptions = REVIEW_SOURCES.map((s) => ({ value: s, label: s }));
const ratingOptions = [5, 4, 3, 2, 1].map((n) => ({ value: String(n), label: `${n} Star${n === 1 ? "" : "s"}` }));
const roomTypeOptions = ROOM_TYPES.map((t) => ({ value: t, label: t }));

export function Toolbar({ exportHref }: { exportHref: string }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <FilterDropdown paramName="source" allLabel="All Sources" options={sourceOptions} />
      <FilterDropdown paramName="rating" allLabel="All Ratings" options={ratingOptions} />
      <FilterDropdown paramName="roomType" allLabel="All Room Types" options={roomTypeOptions} />

      <DateRangeFilterDropdown
        fromParam="dateFrom"
        toParam="dateTo"
        label="Filters"
        title="Review date range"
        fromLabel="From"
        toLabel="To"
      />

      <a
        href={exportHref}
        className="ml-auto flex items-center gap-2 rounded-xl border border-[#e1e0d9] bg-white px-4 py-2.5 text-sm text-[#52514e] hover:bg-black/[.02]"
      >
        <IconDownload className="h-4 w-4" />
        Export
      </a>
    </div>
  );
}
