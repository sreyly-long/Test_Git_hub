"use client";

import { useState } from "react";
import type { Invoice, Room } from "@prisma/client";
import { Avatar } from "@/components/dashboard/Avatar";
import { DeleteButton } from "@/components/dashboard/DeleteButton";
import { IconCheckCircle, IconPencil } from "@/components/dashboard/icons";
import { deleteInvoiceAction, markInvoicePaidAction } from "@/lib/actions/invoices";
import { PaymentBadge } from "./PaymentBadge";
import { EditInvoiceModal } from "./EditInvoiceModal";
import type { PaymentMethod } from "./data";

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

function fmtDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

type InvoiceRow = Invoice & { room: Room; reservation: { bookingCode: string } | null };

export function InvoicesTableRow({ invoice }: { invoice: InvoiceRow }) {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <tr className="cursor-pointer text-[#0b0b0b] hover:bg-black/[.015]" onClick={() => setEditOpen(true)}>
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
        <td className={`whitespace-nowrap py-3 pr-4 ${dueDateStyles[invoice.status]}`}>{fmtDate(invoice.dueDate)}</td>
        <td className="whitespace-nowrap py-3 pr-4" onClick={(e) => e.stopPropagation()}>
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
            <button
              type="button"
              aria-label="Edit invoice"
              onClick={() => setEditOpen(true)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e1e0d9] text-[#52514e] hover:bg-black/[.02]"
            >
              <IconPencil className="h-4 w-4" />
            </button>
            <DeleteButton
              action={deleteInvoiceAction.bind(null, invoice.id)}
              confirmMessage={`Delete invoice ${invoice.invoiceCode}? This cannot be undone.`}
            />
          </div>
        </td>
      </tr>

      <EditInvoiceModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        invoice={{
          id: invoice.id,
          invoiceCode: invoice.invoiceCode,
          guestName: invoice.guestName,
          paymentMethod: invoice.paymentMethod,
          paymentDetail: invoice.paymentDetail,
          status: invoice.status,
          dueDate: fmtDate(invoice.dueDate),
          amount: invoice.amount,
        }}
      />
    </>
  );
}
