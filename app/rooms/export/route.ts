import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import { buildRoomWhere } from "@/lib/room-filters";
import { parseFeatures } from "@/components/rooms/data";
import { createStyledWorkbookBuffer, xlsxResponse, type CellColorMap } from "@/lib/xlsx-export";

function fmtDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

const statusColors: CellColorMap = {
  Available: { bg: "FFE3F5E3", fg: "FF006300" },
  Occupied: { bg: "FFE3EEFB", fg: "FF184F95" },
  Reserved: { bg: "FFFCEFD1", fg: "FF8A5A00" },
  Maintenance: { bg: "FFFBE1E1", fg: "FFD03B3B" },
};

export async function GET(request: Request) {
  await requireSession();

  const { searchParams } = new URL(request.url);
  const where = buildRoomWhere({
    q: searchParams.get("q") ?? undefined,
    roomType: searchParams.get("roomType") ?? undefined,
    status: searchParams.get("status") ?? undefined,
    floor: searchParams.get("floor") ?? undefined,
    priceMin: searchParams.get("priceMin") ?? undefined,
    priceMax: searchParams.get("priceMax") ?? undefined,
  });

  const rooms = await prisma.room.findMany({
    where,
    orderBy: [{ floor: "asc" }, { number: "asc" }],
  });

  const rows = rooms.map((r) => ({
    number: r.number,
    name: r.name,
    roomType: r.roomType,
    floor: r.floor,
    status: r.status,
    pricePerNight: r.pricePerNight,
    capacity: r.capacity,
    features: parseFeatures(r.features).join(", "),
  }));

  const buffer = await createStyledWorkbookBuffer({
    sheetName: "Rooms",
    columns: [
      { header: "Room No.", key: "number", width: 12 },
      { header: "Room Name", key: "name", width: 18, align: "left" },
      { header: "Room Type", key: "roomType", width: 14, align: "left" },
      { header: "Floor", key: "floor", width: 9 },
      { header: "Status", key: "status", width: 14 },
      { header: "Price / Night", key: "pricePerNight", width: 14 },
      { header: "Capacity", key: "capacity", width: 10 },
      { header: "Features", key: "features", width: 26, align: "left" },
    ],
    rows,
    colorByColumnKey: { status: statusColors },
  });

  const filename = `rooms-${fmtDate(new Date())}.xlsx`;
  return xlsxResponse(buffer, filename);
}
