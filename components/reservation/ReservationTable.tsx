import type { Reservation, Room } from "@prisma/client";
import { Card } from "@/components/dashboard/Card";
import { PaginationFooter } from "@/components/dashboard/PaginationFooter";
import type { PaginationMeta } from "@/lib/pagination";
import { ReservationTableRow } from "./ReservationTableRow";

const columns = [
  "Booking ID",
  "Guest Name",
  "Room",
  "Room Type",
  "Check-in",
  "Check-out",
  "Guests",
  "Total Amount",
  "Status",
  "Actions",
];

export type ReservationRow = Reservation & { room: Room };
type RoomOption = { id: string; number: string; name: string; pricePerNight: number };

export function ReservationTable({
  reservations,
  meta,
  rooms,
  basePath = "/reservation",
}: {
  reservations: ReservationRow[];
  meta: PaginationMeta;
  rooms: RoomOption[];
  basePath?: string;
}) {
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
            {reservations.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="py-8 text-center text-sm text-[#898781]">
                  No reservations found.
                </td>
              </tr>
            )}
            {reservations.map((row) => (
              <ReservationTableRow key={row.id} row={row} rooms={rooms} />
            ))}
          </tbody>
        </table>
      </div>

      <PaginationFooter {...meta} basePath={basePath} />
    </Card>
  );
}
