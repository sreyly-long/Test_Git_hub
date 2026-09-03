"use client";

import { useActionState, useState } from "react";
import { Modal } from "@/components/dashboard/Modal";
import { useAutoCloseOnSuccess } from "@/components/dashboard/useAutoCloseOnSuccess";
import { IconPlus } from "@/components/dashboard/icons";
import { createReservationAction } from "@/lib/actions/reservations";
import type { ActionState } from "@/lib/actions/rooms";
import { RESERVATION_STATUSES, BOOKING_SOURCES } from "@/lib/constants";

const initialState: ActionState = {};

const inputClasses =
  "w-full rounded-xl border border-[#e1e0d9] bg-white px-3.5 py-2.5 text-sm text-[#0b0b0b] focus:outline-none focus:ring-2 focus:ring-[#2a78d6]/30";

type RoomOption = { id: string; number: string; name: string; pricePerNight: number };

export function AddReservationModal({ rooms }: { rooms: RoomOption[] }) {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(createReservationAction, initialState);
  useAutoCloseOnSuccess(state, setOpen);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-xl bg-[#2a78d6] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#1c5cab]"
      >
        <IconPlus className="h-4 w-4" />
        New Reservation
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title="New Reservation">
        <form action={formAction} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#52514e]">Guest Name</label>
              <input name="guestName" type="text" required placeholder="Jane Smith" className={inputClasses} />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#52514e]">Guest Email</label>
              <input name="guestEmail" type="email" required placeholder="jane@email.com" className={inputClasses} />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#52514e]">Room</label>
            <select name="roomId" required className={inputClasses}>
              <option value="">Select a room</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.number} — {room.name} (${room.pricePerNight.toFixed(0)}/night)
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#52514e]">Check-In</label>
              <input name="checkIn" type="date" required className={inputClasses} />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#52514e]">Check-Out</label>
              <input name="checkOut" type="date" required className={inputClasses} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#52514e]">Guests</label>
              <input name="guests" type="number" min={1} defaultValue={2} className={inputClasses} />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#52514e]">Source</label>
              <select name="source" defaultValue="Direct" className={inputClasses}>
                {BOOKING_SOURCES.map((source) => (
                  <option key={source} value={source}>
                    {source}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#52514e]">Status</label>
              <select name="status" defaultValue="Confirmed" className={inputClasses}>
                {RESERVATION_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
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
            {pending ? "Saving..." : "Save Reservation"}
          </button>
        </form>
      </Modal>
    </>
  );
}
