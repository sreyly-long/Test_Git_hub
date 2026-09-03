import type { Invoice, Room } from "@prisma/client";
import { Card } from "@/components/dashboard/Card";
import { PaginationFooter } from "@/components/dashboard/PaginationFooter";
import type { PaginationMeta } from "@/lib/pagination";
import { InvoicesTableRow } from "./InvoicesTableRow";

const columns = [
  "Invoice ID",
  "Booking ID",
  "Guest",
  "Room / Type",
  "Check-in / Check-out",
  "Amount",
  "Payment Method",
  "Status",
  "Issue Date",
  "Due Date",
  "Actions",
];

export type InvoiceRow = Invoice & { room: Room; reservation: { bookingCode: string } | null };

export function InvoicesTable({
  invoices,
  meta,
  basePath = "/invoices",
}: {
  invoices: InvoiceRow[];
  meta: PaginationMeta;
  basePath?: string;
}) {
  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1180px] border-collapse text-left text-sm">
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
            {invoices.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="py-8 text-center text-sm text-[#898781]">
                  No invoices found.
                </td>
              </tr>
            )}
            {invoices.map((invoice) => (
              <InvoicesTableRow key={invoice.id} invoice={invoice} />
            ))}
          </tbody>
        </table>
      </div>

      <PaginationFooter {...meta} basePath={basePath} />
    </Card>
  );
}
