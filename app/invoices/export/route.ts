import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import { buildInvoiceWhere } from "@/lib/invoice-filters";
import { createStyledWorkbookBuffer, xlsxResponse, type CellColorMap } from "@/lib/xlsx-export";

function fmtDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

const statusColors: CellColorMap = {
  Paid: { bg: "FFE3F5E3", fg: "FF006300" },
  Pending: { bg: "FFFCEFD1", fg: "FF8A5A00" },
  Overdue: { bg: "FFFBE1E1", fg: "FFD03B3B" },
};

export async function GET(request: Request) {
  await requireSession();

  const { searchParams } = new URL(request.url);
  const where = buildInvoiceWhere({
    q: searchParams.get("q") ?? undefined,
    status: searchParams.get("status") ?? undefined,
    paymentMethod: searchParams.get("paymentMethod") ?? undefined,
    roomType: searchParams.get("roomType") ?? undefined,
    issueDateFrom: searchParams.get("issueDateFrom") ?? undefined,
    issueDateTo: searchParams.get("issueDateTo") ?? undefined,
  });

  const invoices = await prisma.invoice.findMany({
    where,
    include: { room: true, reservation: { select: { bookingCode: true } } },
    orderBy: { issueDate: "desc" },
  });

  const rows = invoices.map((inv) => ({
    invoiceCode: inv.invoiceCode,
    bookingCode: inv.reservation?.bookingCode ?? "—",
    guestName: inv.guestName,
    guestEmail: inv.guestEmail,
    room: `${inv.room.number} / ${inv.room.roomType}`,
    amount: inv.amount,
    paymentMethod: inv.paymentMethod,
    status: inv.status,
    issueDate: fmtDate(inv.issueDate),
    dueDate: fmtDate(inv.dueDate),
  }));

  const buffer = await createStyledWorkbookBuffer({
    sheetName: "Invoices",
    columns: [
      { header: "Invoice ID", key: "invoiceCode", width: 14 },
      { header: "Booking ID", key: "bookingCode", width: 14 },
      { header: "Guest Name", key: "guestName", width: 20, align: "left" },
      { header: "Guest Email", key: "guestEmail", width: 24, align: "left" },
      { header: "Room", key: "room", width: 18, align: "left" },
      { header: "Amount", key: "amount", width: 12 },
      { header: "Payment Method", key: "paymentMethod", width: 16 },
      { header: "Status", key: "status", width: 12 },
      { header: "Issue Date", key: "issueDate", width: 13 },
      { header: "Due Date", key: "dueDate", width: 13 },
    ],
    rows,
    colorByColumnKey: { status: statusColors },
  });

  const filename = `invoices-${fmtDate(new Date())}.xlsx`;
  return xlsxResponse(buffer, filename);
}
