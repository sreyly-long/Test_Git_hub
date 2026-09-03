import type { Metadata } from "next";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { StatCards } from "@/components/rooms/StatCards";
import { Toolbar } from "@/components/rooms/Toolbar";
import { RoomsTable } from "@/components/rooms/RoomsTable";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import { parsePage, paginationMeta } from "@/lib/pagination";
import { buildRoomWhere, roomFilterQueryString } from "@/lib/room-filters";

export const metadata: Metadata = {
  title: "Rooms · coocon",
};

export default async function RoomsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    q?: string;
    roomType?: string;
    status?: string;
    floor?: string;
    priceMin?: string;
    priceMax?: string;
  }>;
}) {
  const session = await requireSession();
  const sp = await searchParams;
  const q = sp.q?.trim();
  const { roomType, status, floor, priceMin, priceMax } = sp;

  const where = buildRoomWhere({ q, roomType, status, floor, priceMin, priceMax });

  const [total, occupied, available, reserved, maintenance, floorRows] = await Promise.all([
    prisma.room.count(),
    prisma.room.count({ where: { status: "Occupied" } }),
    prisma.room.count({ where: { status: "Available" } }),
    prisma.room.count({ where: { status: "Reserved" } }),
    prisma.room.count({ where: { status: "Maintenance" } }),
    prisma.room.findMany({ distinct: ["floor"], select: { floor: true }, orderBy: { floor: "asc" } }),
  ]);

  const filteredTotal = await prisma.room.count({ where });
  const meta = paginationMeta(parsePage(sp), filteredTotal);

  const rooms = await prisma.room.findMany({
    where,
    orderBy: [{ floor: "asc" }, { number: "asc" }],
    skip: meta.skip,
    take: meta.take,
  });

  const filterQuery = roomFilterQueryString({ q, roomType, status, floor, priceMin, priceMax });
  const basePath = filterQuery ? `/rooms?${filterQuery}` : "/rooms";
  const exportHref = filterQuery ? `/rooms/export?${filterQuery}` : "/rooms/export";

  return (
    <div className="flex min-h-screen w-full bg-[#f9f9f7]">
      <Sidebar active="Rooms" />

      <main className="flex-1 px-5 py-6 lg:px-8">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
          <Header
            title="Rooms"
            searchPlaceholder="Search room, type, status..."
            searchAction="/rooms"
            q={q}
            breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Rooms" }]}
            userName={session.user.name}
            userRole={session.user.role}
          />

          <StatCards total={total} occupied={occupied} available={available} reserved={reserved} maintenance={maintenance} />
          <Toolbar q={q} floors={floorRows.map((r) => r.floor)} exportHref={exportHref} />
          <RoomsTable rooms={rooms} meta={meta} basePath={basePath} />
        </div>
      </main>
    </div>
  );
}
