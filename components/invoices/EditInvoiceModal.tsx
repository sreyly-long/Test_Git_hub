"use client";

import { useActionState, useEffect } from "react";
import { Modal } from "@/components/dashboard/Modal";
import { updateInvoiceAction } from "@/lib/actions/invoices";
import type { ActionState } from "@/lib/actions/rooms";
import { PAYMENT_METHODS, INVOICE_STATUSES } from "@/lib/constants";

const initialState: ActionState = {};

const inputClasses =
  "w-full rounded-xl border border-[#e1e0d9] bg-white px-3.5 py-2.5 text-sm text-[#0b0b0b] focus:outline-none focus:ring-2 focus:ring-[#2a78d6]/30";

export type EditableInvoice = {
  id: string;
  invoiceCode: string;
  guestName: string;
  paymentMethod: string;
  paymentDetail: string;
  status: string;
  dueDate: string;
  amount: number;
};

export function EditInvoiceModal({
  open,
  onClose,
  invoice,
}: {
  open: boolean;
  onClose: () => void;
  invoice: EditableInvoice;
}) {
  const action = updateInvoiceAction.bind(null, invoice.id);
  const [state, formAction, pending] = useActionState(action, initialState);

  // `onClose` belongs to the parent row, not this component, so closing on
  // success has to happen in an effect rather than during render.
  useEffect(() => {
    if (state.success) {
      onClose();
    }
  }, [state.success, onClose]);

  return (
    <Modal open={open} onClose={onClose} title={`Edit Invoice — ${invoice.invoiceCode}`}>
      <p className="mb-4 text-sm text-[#898781]">
        Guest: <span className="font-medium text-[#0b0b0b]">{invoice.guestName}</span>
      </p>
      <form action={formAction} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#52514e]">Payment Method</label>
            <select name="paymentMethod" defaultValue={invoice.paymentMethod} className={inputClasses}>
              {PAYMENT_METHODS.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#52514e]">Status</label>
            <select name="status" defaultValue={invoice.status} className={inputClasses}>
              {INVOICE_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-[#52514e]">Payment Detail (optional)</label>
          <input
            name="paymentDetail"
            type="text"
            placeholder="e.g. •••• 4242 or PayPal email"
            defaultValue={invoice.paymentDetail}
            className={inputClasses}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#52514e]">Amount ($)</label>
            <input
              name="amount"
              type="number"
              min={0}
              step={0.01}
              required
              defaultValue={invoice.amount}
              className={inputClasses}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#52514e]">Due Date</label>
            <input name="dueDate" type="date" required defaultValue={invoice.dueDate} className={inputClasses} />
          </div>
        </div>

        {state.error && (
          <p className="rounded-lg bg-[#d03b3b]/10 px-3 py-2 text-sm text-[#d03b3b]">{state.error}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="mt-1 w-full rounded-xl bg-[#2a78d6] py-2.5 text-sm font-semibold text-white hover:bg-[#1c5cab] disabled:opacity-70"
        >
          {pending ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </Modal>
  );
}
