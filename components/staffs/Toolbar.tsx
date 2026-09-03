import { IconDownload, IconSearch } from "@/components/dashboard/icons";
import { FilterDropdown } from "@/components/dashboard/FilterDropdown";
import { DateRangeFilterDropdown } from "@/components/dashboard/DateRangeFilterDropdown";
import { AddStaffModal } from "./AddStaffModal";
import { STAFF_DEPARTMENTS, STAFF_STATUSES } from "@/lib/constants";

const departmentOptions = STAFF_DEPARTMENTS.map((d) => ({ value: d, label: d }));
const statusOptions = STAFF_STATUSES.map((s) => ({ value: s, label: s }));

export function Toolbar({ q, roles, exportHref }: { q?: string; roles: string[]; exportHref: string }) {
  const roleOptions = roles.map((r) => ({ value: r, label: r }));

  return (
    <div className="flex flex-wrap items-center gap-3">
      <FilterDropdown paramName="department" allLabel="All Departments" options={departmentOptions} />
      <FilterDropdown paramName="role" allLabel="All Roles" options={roleOptions} />
      <FilterDropdown paramName="status" allLabel="All Status" options={statusOptions} />

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

      <DateRangeFilterDropdown
        fromParam="hiredFrom"
        toParam="hiredTo"
        label="Filters"
        title="Hired date range"
        fromLabel="Hired from"
        toLabel="Hired to"
      />

      <div className="ml-auto flex items-center gap-3">
        <AddStaffModal />
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
