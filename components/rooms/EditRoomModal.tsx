"use client";

import { useActionState, useEffect } from "react";
import { Modal } from "@/components/dashboard/Modal";
import { updateRoomAction, type ActionState } from "@/lib/actions/rooms";
import { ROOM_TYPES, ROOM_STATUSES, ROOM_FEATURES, type RoomFeature } from "@/lib/constants";

const initialState: ActionState = {};

const inputClasses =
  "w-full rounded-xl border border-[#e1e0d9] bg-white px-3.5 py-2.5 text-sm text-[#0b0b0b] focus:outline-none focus:ring-2 focus:ring-[#2a78d6]/30";

export type EditableRoom = {
  id: string;
  number: string;
  roomType: string;
  floor: number;
  status: string;
  pricePerNight: number;
  capacity: number;
  features: RoomFeature[];
};

export function EditRoomModal({
  open,
  onClose,
  room,
}: {
  open: boolean;
  onClose: () => void;
  room: EditableRoom;
}) {
  const action = updateRoomAction.bind(null, room.id);
  const [state, formAction, pending] = useActionState(action, initialState);

  // `onClose` belongs to the parent row, not this component, so closing on
  // success has to happen in an effect rather than during render.
  useEffect(() => {
    if (state.success) {
      onClose();
    }
  }, [state.success, onClose]);

  return (
    <Modal open={open} onClose={onClose} title={`Edit Room — ${room.number}`}>
      <form action={formAction} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#52514e]">Room Number</label>
            <input name="number" type="text" required defaultValue={room.number} className={inputClasses} />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#52514e]">Floor</label>
            <input name="floor" type="number" min={1} required defaultValue={room.floor} className={inputClasses} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#52514e]">Room Type</label>
            <select name="roomType" defaultValue={room.roomType} className={inputClasses}>
              {ROOM_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#52514e]">Status</label>
            <select name="status" defaultValue={room.status} className={inputClasses}>
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
            <input
              name="pricePerNight"
              type="number"
              min={0}
              step={0.01}
              required
              defaultValue={room.pricePerNight}
              className={inputClasses}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#52514e]">Capacity</label>
            <input name="capacity" type="number" min={1} required defaultValue={room.capacity} className={inputClasses} />
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
                  defaultChecked={room.features.includes(feature)}
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
          {pending ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </Modal>
  );
}
