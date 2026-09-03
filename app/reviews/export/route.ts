import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import { buildReviewWhere } from "@/lib/review-filters";
import { createStyledWorkbookBuffer, xlsxResponse, type CellColorMap } from "@/lib/xlsx-export";

function fmtDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

const ratingColors: CellColorMap = {
  "5": { bg: "FFE3F5E3", fg: "FF006300" },
  "4": { bg: "FFE3EEFB", fg: "FF184F95" },
  "3": { bg: "FFFCEFD1", fg: "FF8A5A00" },
  "2": { bg: "FFFBE1E1", fg: "FFD03B3B" },
  "1": { bg: "FFFBE1E1", fg: "FFD03B3B" },
};

export async function GET(request: Request) {
  await requireSession();

  const { searchParams } = new URL(request.url);
  const where = buildReviewWhere({
    q: searchParams.get("q") ?? undefined,
    source: searchParams.get("source") ?? undefined,
    rating: searchParams.get("rating") ?? undefined,
    roomType: searchParams.get("roomType") ?? undefined,
    dateFrom: searchParams.get("dateFrom") ?? undefined,
    dateTo: searchParams.get("dateTo") ?? undefined,
  });

  const reviews = await prisma.review.findMany({
    where,
    include: { room: true },
    orderBy: { date: "desc" },
  });

  const rows = reviews.map((r) => ({
    guestName: r.guestName,
    guestEmail: r.guestEmail,
    room: r.room.number,
    roomType: r.room.roomType,
    rating: r.rating,
    reviewText: r.reviewText,
    source: r.source,
    date: fmtDate(r.date),
  }));

  const buffer = await createStyledWorkbookBuffer({
    sheetName: "Reviews",
    columns: [
      { header: "Guest Name", key: "guestName", width: 20, align: "left" },
      { header: "Guest Email", key: "guestEmail", width: 24, align: "left" },
      { header: "Room", key: "room", width: 10 },
      { header: "Room Type", key: "roomType", width: 14, align: "left" },
      { header: "Rating", key: "rating", width: 10 },
      { header: "Review", key: "reviewText", width: 40, align: "left" },
      { header: "Source", key: "source", width: 14, align: "left" },
      { header: "Date", key: "date", width: 13 },
    ],
    rows,
    colorByColumnKey: { rating: ratingColors },
  });

  const filename = `reviews-${fmtDate(new Date())}.xlsx`;
  return xlsxResponse(buffer, filename);
}
