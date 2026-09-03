import { IconChevronDown, IconCalendarCheck, IconFilter, IconDownload } from "@/components/dashboard/icons";

function DropdownButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="flex items-center gap-2 rounded-xl border border-[#e1e0d9] bg-white px-3.5 py-2.5 text-sm text-[#52514e] hover:bg-black/[.02]"
    >
      {label}
      <IconChevronDown className="h-3.5 w-3.5 text-[#898781]" />
    </button>
  );
}

export function Toolbar() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <DropdownButton label="All Sources" />
      <DropdownButton label="All Ratings" />
      <DropdownButton label="All Room Types" />

      <button
        type="button"
        className="flex items-center gap-2 rounded-xl border border-[#e1e0d9] bg-white px-3.5 py-2.5 text-sm text-[#52514e] hover:bg-black/[.02]"
      >
        <IconCalendarCheck className="h-4 w-4 text-[#898781]" />
        May 12, 2024 - Jun 12, 2024
      </button>

      <button
        type="button"
        className="flex items-center gap-2 rounded-xl border border-[#e1e0d9] bg-white px-3.5 py-2.5 text-sm text-[#52514e] hover:bg-black/[.02]"
      >
        <IconFilter className="h-4 w-4 text-[#898781]" />
        Filters
      </button>

      <button
        type="button"
        className="ml-auto flex items-center gap-2 rounded-xl border border-[#e1e0d9] bg-white px-4 py-2.5 text-sm text-[#52514e] hover:bg-black/[.02]"
      >
        <IconDownload className="h-4 w-4" />
        Export
      </button>
    </div>
  );
}
