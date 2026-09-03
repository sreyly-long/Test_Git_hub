"use client";

import { useActionState, useState } from "react";
import { Modal } from "@/components/dashboard/Modal";
import { useAutoCloseOnSuccess } from "@/components/dashboard/useAutoCloseOnSuccess";
import { IconPlus } from "@/components/dashboard/icons";
import { createStaffAction } from "@/lib/actions/staffs";
import type { ActionState } from "@/lib/actions/rooms";
import { STAFF_DEPARTMENTS, STAFF_STATUSES } from "@/lib/constants";

const initialState: ActionState = {};

const inputClasses =
  "w-full rounded-xl border border-[#e1e0d9] bg-white px-3.5 py-2.5 text-sm text-[#0b0b0b] focus:outline-none focus:ring-2 focus:ring-[#2a78d6]/30";

export function AddStaffModal() {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(createStaffAction, initialState);
  useAutoCloseOnSuccess(state, setOpen);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-xl bg-[#2a78d6] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#1c5cab]"
      >
        <IconPlus className="h-4 w-4" />
        Add Staff
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title="Add Staff">
        <form action={formAction} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#52514e]">Full Name</label>
              <input name="name" type="text" required placeholder="Jane Smith" className={inputClasses} />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#52514e]">Role</label>
              <input name="role" type="text" required placeholder="Front Desk" className={inputClasses} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#52514e]">Department</label>
              <select name="department" defaultValue={STAFF_DEPARTMENTS[0]} className={inputClasses}>
                {STAFF_DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#52514e]">Status</label>
              <select name="status" defaultValue={STAFF_STATUSES[0]} className={inputClasses}>
                {STAFF_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#52514e]">Phone</label>
              <input name="phone" type="text" required placeholder="+1 234 567 890" className={inputClasses} />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#52514e]">Email</label>
              <input name="email" type="email" required placeholder="jane@hostay.com" className={inputClasses} />
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
            {pending ? "Saving..." : "Save Staff"}
          </button>
        </form>
      </Modal>
    </>
  );
}
