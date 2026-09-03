import type { Invoice, Room } from "@prisma/client";
import { Card } from "@/components/dashboard/Card";
import { Avatar } from "@/components/dashboard/Avatar";
import { PaginationFooter } from "@/components/dashboard/PaginationFooter";
import { DeleteButton } from "@/components/dashboard/DeleteButton";
import { IconCheckCircle } from "@/components/dashboard/icons";
import { PaymentBadge } from "./PaymentBadge";
import { deleteInvoiceAction, markInvoicePaidAction } from "@/lib/actions/invoices";
import type { PaymentMethod } from "./data";
import type { PaginationMeta } from "@/lib/pagination";

const statusStyles: Record<string, string> = {
  Paid: "bg-[#0ca30c]/10 text-[#006300]",
  Pending: "bg-[#eda100]/15 text-[#8a5a00]",
  Overdue: "bg-[#d03b3b]/10 text-[#d03b3b]",
};

const dueDateStyles: Record<string, string> = {
  Paid: "text-[#52514e]",
  Pending: "text-[#8a5a00] font-medium",
  Overdue: "text-[#d03b3b] font-medium",
};

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

function fmtDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

export type InvoiceRow = Invoice & { room: Room; reservation: { bookingCode: string } | null };

export function InvoicesTable({ invoices, meta }: { invoices: InvoiceRow[]; meta: PaginationMeta }) {
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
              <tr key={invoice.id} className="text-[#0b0b0b]">
                <td className="whitespace-nowrap py-3 pr-4 font-medium">{invoice.invoiceCode}</td>
                <td className="whitespace-nowrap py-3 pr-4 text-[#52514e]">{invoice.reservation?.bookingCode ?? "—"}</td>
                <td className="whitespace-nowrap py-3 pr-4">
                  <div className="flex items-center gap-2.5">
                    <Avatar name={invoice.guestName} className="h-8 w-8" />
                    <div>
                      <p className="font-medium">{invoice.guestName}</p>
                      <p className="text-xs text-[#898781]">{invoice.guestEmail}</p>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap py-3 pr-4 text-[#52514e]">
                  {invoice.room.number} / {invoice.room.roomType}
                </td>
                <td className="whitespace-nowrap py-3 pr-4 text-[#52514e]">
                  <p>{fmtDate(invoice.checkIn)}</p>
                  <p>{fmtDate(invoice.checkOut)}</p>
                </td>
                <td className="whitespace-nowrap py-3 pr-4 font-medium">${invoice.amount.toFixed(2)}</td>
                <td className="whitespace-nowrap py-3 pr-4">
                  <PaymentBadge method={invoice.paymentMethod as PaymentMethod} detail={invoice.paymentDetail} />
                </td>
                <td className="whitespace-nowrap py-3 pr-4">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[invoice.status]}`}>
                    {invoice.status}
                  </span>
                </td>
                <td className="whitespace-nowrap py-3 pr-4 text-[#52514e]">{fmtDate(invoice.issueDate)}</td>
                <td className={`whitespace-nowrap py-3 pr-4 ${dueDateStyles[invoice.status]}`}>
                  {fmtDate(invoice.dueDate)}
                </td>
                <td className="whitespace-nowrap py-3 pr-4">
                  <div className="flex items-center gap-1.5">
                    {invoice.status !== "Paid" && (
                      <form action={markInvoicePaidAction.bind(null, invoice.id)}>
                        <button
                          type="submit"
                          aria-label="Mark as paid"
                          title="Mark as paid"
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e1e0d9] text-[#52514e] hover:border-[#0ca30c]/40 hover:bg-[#0ca30c]/5 hover:text-[#006300]"
                        >
                          <IconCheckCircle className="h-4 w-4" />
                        </button>
                      </form>
                    )}
                    <DeleteButton
                      action={deleteInvoiceAction.bind(null, invoice.id)}
                      confirmMessage={`Delete invoice ${invoice.invoiceCode}? This cannot be undone.`}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PaginationFooter {...meta} basePath="/invoices" />
    </Card>
  );
}
