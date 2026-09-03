import { IconCalendarCheck, IconChevronDown, IconFilter, IconDownload } from "@/components/dashboard/icons";
import { AddInvoiceModal } from "./AddInvoiceModal";

type ReservationOption = { id: string; bookingCode: string; guestName: string; roomNumber: string };

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

export function Toolbar({ reservations }: { reservations: ReservationOption[] }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        className="flex items-center gap-2 rounded-xl border border-[#e1e0d9] bg-white px-3.5 py-2.5 text-sm text-[#52514e] hover:bg-black/[.02]"
      >
        <IconCalendarCheck className="h-4 w-4 text-[#898781]" />
        May 12, 2024 - Jun 12, 2024
      </button>

      <DropdownButton label="All Status" />
      <DropdownButton label="All Payment Methods" />
      <DropdownButton label="All Room Types" />

      <button
        type="button"
        className="flex items-center gap-2 rounded-xl border border-[#e1e0d9] bg-white px-3.5 py-2.5 text-sm text-[#52514e] hover:bg-black/[.02]"
      >
        <IconFilter className="h-4 w-4 text-[#898781]" />
        Filters
      </button>

      <div className="ml-auto flex items-center gap-3">
        <button
          type="button"
          className="flex items-center gap-2 rounded-xl border border-[#e1e0d9] bg-white px-4 py-2.5 text-sm text-[#52514e] hover:bg-black/[.02]"
        >
          <IconDownload className="h-4 w-4" />
          Export
        </button>
        <AddInvoiceModal reservations={reservations} />
      </div>
    </div>
  );
}
