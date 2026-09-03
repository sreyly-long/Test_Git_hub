"use client";

import { useActionState, useState } from "react";
import { Modal } from "@/components/dashboard/Modal";
import { useAutoCloseOnSuccess } from "@/components/dashboard/useAutoCloseOnSuccess";
import { IconPlus } from "@/components/dashboard/icons";
import { createRoomAction, type ActionState } from "@/lib/actions/rooms";
import { ROOM_TYPES, ROOM_STATUSES, ROOM_FEATURES } from "@/lib/constants";

const initialState: ActionState = {};

const inputClasses =
  "w-full rounded-xl border border-[#e1e0d9] bg-white px-3.5 py-2.5 text-sm text-[#0b0b0b] focus:outline-none focus:ring-2 focus:ring-[#2a78d6]/30";

export function AddRoomModal() {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(createRoomAction, initialState);
  useAutoCloseOnSuccess(state, setOpen);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-xl bg-[#2a78d6] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#1c5cab]"
      >
        <IconPlus className="h-4 w-4" />
        Add Room
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title="Add Room">
        <form action={formAction} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#52514e]">Room Number</label>
              <input name="number" type="text" placeholder="e.g. 401" required className={inputClasses} />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#52514e]">Floor</label>
              <input name="floor" type="number" min={1} defaultValue={1} required className={inputClasses} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#52514e]">Room Type</label>
              <select name="roomType" defaultValue={ROOM_TYPES[0]} className={inputClasses}>
                {ROOM_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#52514e]">Status</label>
              <select name="status" defaultValue={ROOM_STATUSES[0]} className={inputClasses}>
                {ROOM_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#52514e]">Price / Night ($)</label>
              <input name="pricePerNight" type="number" min={0} step={0.01} defaultValue={120} required className={inputClasses} />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#52514e]">Capacity</label>
              <input name="capacity" type="number" min={1} defaultValue={2} required className={inputClasses} />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#52514e]">Features</label>
            <div className="flex flex-wrap gap-3">
              {ROOM_FEATURES.map((feature) => (
                <label key={feature} className="flex items-center gap-1.5 text-sm text-[#52514e]">
                  <input
                    type="checkbox"
                    name="features"
                    value={feature}
                    defaultChecked={feature === "wifi" || feature === "tv"}
                    className="h-4 w-4 rounded border-[#c3c2b7] accent-[#2a78d6]"
                  />
                  {feature}
                </label>
              ))}
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
            {pending ? "Saving..." : "Save Room"}
          </button>
        </form>
      </Modal>
    </>
  );
}
