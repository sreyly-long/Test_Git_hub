import type { Review, Room } from "@prisma/client";
import { Card } from "@/components/dashboard/Card";
import { Avatar } from "@/components/dashboard/Avatar";
import { PaginationFooter } from "@/components/dashboard/PaginationFooter";
import { DeleteButton } from "@/components/dashboard/DeleteButton";
import { IconEye } from "@/components/dashboard/icons";
import { Stars } from "./Stars";
import { deleteReviewAction } from "@/lib/actions/reviews";
import type { PaginationMeta } from "@/lib/pagination";

const sourceStyles: Record<string, string> = {
  "Booking.com": "bg-[#2a78d6]/10 text-[#184f95]",
  Agoda: "bg-[#eda100]/15 text-[#8a5a00]",
  "Hotels.com": "bg-[#4a3aa7]/10 text-[#4a3aa7]",
  TripAdvisor: "bg-[#1baf7a]/10 text-[#0f6b4a]",
};

const columns = ["Guest", "Room", "Rating", "Review", "Source", "Date", "Actions"];

function fmtDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

export type ReviewRow = Review & { room: Room };

export function ReviewsTable({ reviews, meta }: { reviews: ReviewRow[]; meta: PaginationMeta }) {
  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[960px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[#e1e0d9] text-xs uppercase tracking-wide text-[#898781]">
              {columns.map((col) => (
                <th key={col} className="whitespace-nowrap py-2.5 pr-4 font-medium">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e1e0d9]">
            {reviews.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="py-8 text-center text-sm text-[#898781]">
                  No reviews found.
                </td>
              </tr>
            )}
            {reviews.map((review) => (
              <tr key={review.id} className="text-[#0b0b0b]">
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
                <td className="whitespace-nowrap py-3 pr-4">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      aria-label="View review"
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e1e0d9] text-[#52514e] hover:bg-black/[.02]"
                    >
                      <IconEye className="h-4 w-4" />
                    </button>
                    <DeleteButton
                      action={deleteReviewAction.bind(null, review.id)}
                      confirmMessage={`Delete this review from ${review.guestName}?`}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PaginationFooter {...meta} basePath="/reviews" />
    </Card>
  );
}
