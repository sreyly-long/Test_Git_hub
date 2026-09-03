import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import { buildReservationWhere } from "@/lib/reservation-filters";
import { createStyledWorkbookBuffer, xlsxResponse, type CellColorMap } from "@/lib/xlsx-export";

function fmtDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

const statusColors: CellColorMap = {
  Confirmed: { bg: "FFE3F5E3", fg: "FF006300" },
  "Checked In": { bg: "FFE3EEFB", fg: "FF184F95" },
  Pending: { bg: "FFFCEFD1", fg: "FF8A5A00" },
  "Checked Out": { bg: "FFEAE6F7", fg: "FF4A3AA7" },
  Cancelled: { bg: "FFFBE1E1", fg: "FFD03B3B" },
};

export async function GET(request: Request) {
  await requireSession();

  const { searchParams } = new URL(request.url);
  const where = buildReservationWhere({
    q: searchParams.get("q") ?? undefined,
    status: searchParams.get("status") ?? undefined,
    roomType: searchParams.get("roomType") ?? undefined,
    source: searchParams.get("source") ?? undefined,
    checkInFrom: searchParams.get("checkInFrom") ?? undefined,
    checkInTo: searchParams.get("checkInTo") ?? undefined,
  });

  const reservations = await prisma.reservation.findMany({
    where,
    include: { room: true },
    orderBy: { checkIn: "desc" },
  });

  const rows = reservations.map((r) => ({
    bookingId: r.bookingCode,
    guestName: r.guestName,
    guestEmail: r.guestEmail,
    room: r.room.number,
    roomType: r.room.roomType,
    checkIn: fmtDate(r.checkIn),
    checkOut: fmtDate(r.checkOut),
    guests: r.guests,
    totalAmount: r.totalAmount,
    status: r.status,
    source: r.source,
  }));

  const buffer = await createStyledWorkbookBuffer({
    sheetName: "Reservations",
    columns: [
      { header: "Booking ID", key: "bookingId", width: 14 },
      { header: "Guest Name", key: "guestName", width: 20, align: "left" },
      { header: "Guest Email", key: "guestEmail", width: 26, align: "left" },
      { header: "Room", key: "room", width: 10 },
      { header: "Room Type", key: "roomType", width: 14, align: "left" },
      { header: "Check-In", key: "checkIn", width: 13 },
      { header: "Check-Out", key: "checkOut", width: 13 },
      { header: "Guests", key: "guests", width: 9 },
      { header: "Total Amount", key: "totalAmount", width: 14 },
      { header: "Status", key: "status", width: 14 },
      { header: "Source", key: "source", width: 14, align: "left" },
    ],
    rows,
    colorByColumnKey: { status: statusColors },
  });

  const filename = `reservations-${fmtDate(new Date())}.xlsx`;
  return xlsxResponse(buffer, filename);
}
