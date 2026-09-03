"use client";

import { useState } from "react";
import type { Review, Room } from "@prisma/client";
import { Avatar } from "@/components/dashboard/Avatar";
import { DeleteButton } from "@/components/dashboard/DeleteButton";
import { IconPencil } from "@/components/dashboard/icons";
import { deleteReviewAction } from "@/lib/actions/reviews";
import { Stars } from "./Stars";
import { EditReviewModal } from "./EditReviewModal";

const sourceStyles: Record<string, string> = {
  "Booking.com": "bg-[#2a78d6]/10 text-[#184f95]",
  Agoda: "bg-[#eda100]/15 text-[#8a5a00]",
  "Hotels.com": "bg-[#4a3aa7]/10 text-[#4a3aa7]",
  TripAdvisor: "bg-[#1baf7a]/10 text-[#0f6b4a]",
};

function fmtDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

type RoomOption = { id: string; number: string; name: string };
type ReviewRow = Review & { room: Room };

export function ReviewsTableRow({ review, rooms }: { review: ReviewRow; rooms: RoomOption[] }) {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <tr className="cursor-pointer text-[#0b0b0b] hover:bg-black/[.015]" onClick={() => setEditOpen(true)}>
        <td className="whitespace-nowrap py-3 pr-4">
          <div className="flex items-center gap-2.5">
            <Avatar name={review.guestName} className="h-8 w-8" />
            <div>
              <p className="font-medium">{review.guestName}</p>
              <p className="text-xs text-[#898781]">{review.guestEmail}</p>
            </div>
          </div>
        </td>
        <td className="whitespace-nowrap py-3 pr-4">
          <p className="font-medium text-[#0b0b0b]">{review.room.number}</p>
          <p className="text-xs text-[#898781]">{review.room.name}</p>
        </td>
        <td className="whitespace-nowrap py-3 pr-4">
          <Stars rating={review.rating} />
        </td>
        <td className="max-w-xs truncate py-3 pr-4 text-[#52514e]">{review.reviewText}</td>
        <td className="whitespace-nowrap py-3 pr-4">
          <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${sourceStyles[review.source]}`}>
            {review.source}
          </span>
        </td>
        <td className="whitespace-nowrap py-3 pr-4 text-[#52514e]">{fmtDate(review.date)}</td>
        <td className="whitespace-nowrap py-3 pr-4" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label="Edit review"
              onClick={() => setEditOpen(true)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e1e0d9] text-[#52514e] hover:bg-black/[.02]"
            >
              <IconPencil className="h-4 w-4" />
            </button>
            <DeleteButton
              action={deleteReviewAction.bind(null, review.id)}
              confirmMessage={`Delete this review from ${review.guestName}?`}
            />
          </div>
        </td>
      </tr>

      <EditReviewModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        rooms={rooms}
        review={{
          id: review.id,
          guestName: review.guestName,
          guestEmail: review.guestEmail,
          roomId: review.roomId,
          rating: review.rating,
          source: review.source,
          reviewText: review.reviewText,
        }}
      />
    </>
  );
}
