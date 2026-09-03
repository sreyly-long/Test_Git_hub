import { IconDownload } from "@/components/dashboard/icons";
import { FilterDropdown } from "@/components/dashboard/FilterDropdown";
import { DateRangeFilterDropdown } from "@/components/dashboard/DateRangeFilterDropdown";
import { AddInvoiceModal } from "./AddInvoiceModal";
import { INVOICE_STATUSES, PAYMENT_METHODS, ROOM_TYPES } from "@/lib/constants";

type ReservationOption = { id: string; bookingCode: string; guestName: string; roomNumber: string };

const statusOptions = INVOICE_STATUSES.map((s) => ({ value: s, label: s }));

const paymentMethodLabels: Record<string, string> = {
  visa: "Visa",
  mastercard: "Mastercard",
  bank: "Bank Transfer",
  paypal: "PayPal",
  cash: "Cash",
};
const paymentMethodOptions = PAYMENT_METHODS.map((m) => ({ value: m, label: paymentMethodLabels[m] }));

const roomTypeOptions = ROOM_TYPES.map((t) => ({ value: t, label: t }));

export function Toolbar({
  reservations,
  exportHref,
}: {
  reservations: ReservationOption[];
  exportHref: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <FilterDropdown paramName="status" allLabel="All Status" options={statusOptions} />
      <FilterDropdown paramName="paymentMethod" allLabel="All Payment Methods" options={paymentMethodOptions} />
      <FilterDropdown paramName="roomType" allLabel="All Room Types" options={roomTypeOptions} />

      <DateRangeFilterDropdown
        fromParam="issueDateFrom"
        toParam="issueDateTo"
        label="Filters"
        title="Issue date range"
        fromLabel="From"
        toLabel="To"
      />

      <div className="ml-auto flex items-center gap-3">
        <a
          href={exportHref}
          className="flex items-center gap-2 rounded-xl border border-[#e1e0d9] bg-white px-4 py-2.5 text-sm text-[#52514e] hover:bg-black/[.02]"
        >
          <IconDownload className="h-4 w-4" />
          Export
        </a>
        <AddInvoiceModal reservations={reservations} />
      </div>
    </div>
  );
}
