import { IconChevronDown, IconFilter, IconSearch } from "@/components/dashboard/icons";
import { AddStaffModal } from "./AddStaffModal";

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

export function Toolbar({ q }: { q?: string }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <DropdownButton label="All Departments" />
      <DropdownButton label="All Roles" />
      <DropdownButton label="All Status" />

      <form action="/staffs" method="get">
        <label className="relative">
          <IconSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#898781]" />
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Search staff..."
            className="w-52 rounded-xl border border-[#e1e0d9] bg-white py-2.5 pl-9 pr-3 text-sm text-[#0b0b0b] placeholder:text-[#898781] focus:outline-none focus:ring-2 focus:ring-[#2a78d6]/30"
          />
        </label>
      </form>

      <button
        type="button"
        className="flex items-center gap-2 rounded-xl border border-[#e1e0d9] bg-white px-3.5 py-2.5 text-sm text-[#52514e] hover:bg-black/[.02]"
      >
        <IconFilter className="h-4 w-4 text-[#898781]" />
        Filters
      </button>

      <div className="ml-auto">
        <AddStaffModal />
      </div>
    </div>
  );
}
