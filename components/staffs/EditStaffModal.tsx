"use client";

import { useActionState, useEffect } from "react";
import { Modal } from "@/components/dashboard/Modal";
import { updateStaffAction } from "@/lib/actions/staffs";
import type { ActionState } from "@/lib/actions/rooms";
import { STAFF_DEPARTMENTS, STAFF_STATUSES } from "@/lib/constants";

const initialState: ActionState = {};

const inputClasses =
  "w-full rounded-xl border border-[#e1e0d9] bg-white px-3.5 py-2.5 text-sm text-[#0b0b0b] focus:outline-none focus:ring-2 focus:ring-[#2a78d6]/30";

export type EditableStaff = {
  id: string;
  staffCode: string;
  name: string;
  role: string;
  department: string;
  status: string;
  phone: string;
  email: string;
};

export function EditStaffModal({
  open,
  onClose,
  staff,
}: {
  open: boolean;
  onClose: () => void;
  staff: EditableStaff;
}) {
  const action = updateStaffAction.bind(null, staff.id);
  const [state, formAction, pending] = useActionState(action, initialState);

  // `onClose` belongs to the parent row, not this component, so closing on
  // success has to happen in an effect rather than during render.
  useEffect(() => {
    if (state.success) {
      onClose();
    }
  }, [state.success, onClose]);

  return (
    <Modal open={open} onClose={onClose} title={`Edit Staff — ${staff.staffCode}`}>
      <form action={formAction} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#52514e]">Full Name</label>
            <input name="name" type="text" required defaultValue={staff.name} className={inputClasses} />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#52514e]">Role</label>
            <input name="role" type="text" required defaultValue={staff.role} className={inputClasses} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#52514e]">Department</label>
            <select name="department" defaultValue={staff.department} className={inputClasses}>
              {STAFF_DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#52514e]">Status</label>
            <select name="status" defaultValue={staff.status} className={inputClasses}>
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
            <input name="phone" type="text" required defaultValue={staff.phone} className={inputClasses} />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#52514e]">Email</label>
            <input name="email" type="email" required defaultValue={staff.email} className={inputClasses} />
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
