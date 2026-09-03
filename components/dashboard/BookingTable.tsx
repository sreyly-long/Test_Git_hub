import type { Booking } from "./data";
import { IconChevronDown } from "./icons";
import { Card, SeeAllLink } from "./Card";

const statusStyles: Record<string, string> = {
  Confirmed: "bg-[#0ca30c]/10 text-[#006300]",
  "Checked In": "bg-[#2a78d6]/10 text-[#184f95]",
  Pending: "bg-[#eda100]/15 text-[#8a5a00]",
  "Checked Out": "bg-[#4a3aa7]/10 text-[#4a3aa7]",
  Cancelled: "bg-[#d03b3b]/10 text-[#d03b3b]",
};

const columns = [
  "Booking ID",
  "Guest Name",
  "Room Type",
  "Room No",
  "Duration",
  "Check-In",
  "Check-Out",
  "Status",
];

export function BookingTable({ bookings }: { bookings: Booking[] }) {
  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-[#0b0b0b]">Booking List</h2>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex items-center gap-1 rounded-lg border border-[#e1e0d9] px-2.5 py-1 text-xs text-[#52514e]"
          >
            Recent
            <IconChevronDown className="h-3 w-3" />
          </button>
          <SeeAllLink />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
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
            {bookings.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="py-8 text-center text-sm text-[#898781]">
                  No bookings yet.
                </td>
              </tr>
            )}
            {bookings.map((row) => (
              <tr key={row.id} className="text-[#0b0b0b]">
                <td className="whitespace-nowrap py-3 pr-4 font-medium">{row.id}</td>
                <td className="whitespace-nowrap py-3 pr-4">{row.guest}</td>
                <td className="whitespace-nowrap py-3 pr-4 text-[#52514e]">{row.roomType}</td>
                <td className="whitespace-nowrap py-3 pr-4 text-[#52514e]">{row.roomNo}</td>
                <td className="whitespace-nowrap py-3 pr-4 text-[#52514e]">{row.duration}</td>
                <td className="whitespace-nowrap py-3 pr-4 text-[#52514e]">{row.checkIn}</td>
                <td className="whitespace-nowrap py-3 pr-4 text-[#52514e]">{row.checkOut}</td>
                <td className="whitespace-nowrap py-3 pr-4">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[row.status]}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
