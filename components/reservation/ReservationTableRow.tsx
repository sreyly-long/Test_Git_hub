"use client";

import { useState } from "react";
import { DeleteButton } from "@/components/dashboard/DeleteButton";
import { IconPencil } from "@/components/dashboard/icons";
import { deleteReservationAction } from "@/lib/actions/reservations";
import { EditReservationModal } from "./EditReservationModal";
import type { ReservationRow } from "./ReservationTable";

const statusStyles: Record<string, string> = {
  Confirmed: "bg-[#0ca30c]/10 text-[#006300]",
  "Checked In": "bg-[#2a78d6]/10 text-[#184f95]",
  Pending: "bg-[#eda100]/15 text-[#8a5a00]",
  "Checked Out": "bg-[#4a3aa7]/10 text-[#4a3aa7]",
  Cancelled: "bg-[#d03b3b]/10 text-[#d03b3b]",
};

function fmtDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

type RoomOption = { id: string; number: string; name: string; pricePerNight: number };

export function ReservationTableRow({ row, rooms }: { row: ReservationRow; rooms: RoomOption[] }) {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <tr
        className="cursor-pointer text-[#0b0b0b] hover:bg-black/[.015]"
        onClick={() => setEditOpen(true)}
      >
        <td className="whitespace-nowrap py-3 pr-4 font-medium">{row.bookingCode}</td>
        <td className="whitespace-nowrap py-3 pr-4">
          <p className="font-medium text-[#0b0b0b]">{row.guestName}</p>
          <p className="text-xs text-[#898781]">{row.guestEmail}</p>
        </td>
        <td className="whitespace-nowrap py-3 pr-4 text-[#52514e]">{row.room.number}</td>
        <td className="whitespace-nowrap py-3 pr-4 text-[#52514e]">{row.room.roomType}</td>
        <td className="whitespace-nowrap py-3 pr-4 text-[#52514e]">{fmtDate(row.checkIn)}</td>
        <td className="whitespace-nowrap py-3 pr-4 text-[#52514e]">{fmtDate(row.checkOut)}</td>
        <td className="whitespace-nowrap py-3 pr-4 text-[#52514e]">{row.guests}</td>
        <td className="whitespace-nowrap py-3 pr-4 font-medium">${row.totalAmount.toFixed(2)}</td>
        <td className="whitespace-nowrap py-3 pr-4">
          <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[row.status]}`}>
            {row.status}
          </span>
        </td>
        <td className="whitespace-nowrap py-3 pr-4" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label="Edit reservation"
              onClick={() => setEditOpen(true)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e1e0d9] text-[#52514e] hover:bg-black/[.02]"
            >
              <IconPencil className="h-4 w-4" />
            </button>
            <DeleteButton
              action={deleteReservationAction.bind(null, row.id)}
              confirmMessage={`Delete reservation ${row.bookingCode}? This cannot be undone.`}
            />
          </div>
        </td>
      </tr>

      <EditReservationModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        rooms={rooms}
        reservation={{
          id: row.id,
          bookingCode: row.bookingCode,
          guestName: row.guestName,
          guestEmail: row.guestEmail,
          roomId: row.roomId,
          checkIn: fmtDate(row.checkIn),
          checkOut: fmtDate(row.checkOut),
          guests: row.guests,
          source: row.source,
          status: row.status,
        }}
      />
    </>
  );
}
