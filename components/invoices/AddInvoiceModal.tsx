"use client";

import { useActionState, useState } from "react";
import { Modal } from "@/components/dashboard/Modal";
import { useAutoCloseOnSuccess } from "@/components/dashboard/useAutoCloseOnSuccess";
import { IconPlus } from "@/components/dashboard/icons";
import { createInvoiceAction } from "@/lib/actions/invoices";
import type { ActionState } from "@/lib/actions/rooms";
import { PAYMENT_METHODS, INVOICE_STATUSES } from "@/lib/constants";

const initialState: ActionState = {};

const inputClasses =
  "w-full rounded-xl border border-[#e1e0d9] bg-white px-3.5 py-2.5 text-sm text-[#0b0b0b] focus:outline-none focus:ring-2 focus:ring-[#2a78d6]/30";

type ReservationOption = { id: string; bookingCode: string; guestName: string; roomNumber: string };

export function AddInvoiceModal({ reservations }: { reservations: ReservationOption[] }) {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(createInvoiceAction, initialState);
  useAutoCloseOnSuccess(state, setOpen);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-xl bg-[#2a78d6] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#1c5cab]"
      >
        <IconPlus className="h-4 w-4" />
        New Invoice
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title="New Invoice">
        <form action={formAction} className="flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#52514e]">Reservation</label>
            <select name="reservationId" required className={inputClasses}>
              <option value="">Select a reservation</option>
              {reservations.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.bookingCode} — {r.guestName} (Room {r.roomNumber})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#52514e]">Payment Method</label>
              <select name="paymentMethod" defaultValue="cash" className={inputClasses}>
                {PAYMENT_METHODS.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#52514e]">Status</label>
              <select name="status" defaultValue="Pending" className={inputClasses}>
                {INVOICE_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#52514e]">Due Date</label>
            <input name="dueDate" type="date" required className={inputClasses} />
          </div>

          {state.error && (
            <p className="rounded-lg bg-[#d03b3b]/10 px-3 py-2 text-sm text-[#d03b3b]">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="mt-1 w-full rounded-xl bg-[#2a78d6] py-2.5 text-sm font-semibold text-white hover:bg-[#1c5cab] disabled:opacity-70"
          >
            {pending ? "Saving..." : "Save Invoice"}
          </button>
        </form>
      </Modal>
    </>
  );
}
