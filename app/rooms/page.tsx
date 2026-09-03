import type { Metadata } from "next";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { StatCards } from "@/components/rooms/StatCards";
import { Toolbar } from "@/components/rooms/Toolbar";
import { RoomsTable } from "@/components/rooms/RoomsTable";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import { parsePage, paginationMeta } from "@/lib/pagination";

export const metadata: Metadata = {
  title: "Rooms · coocon",
};

export default async function RoomsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const session = await requireSession();
  const sp = await searchParams;
  const q = sp.q?.trim();

  const where = q
    ? { OR: [{ number: { contains: q } }, { name: { contains: q } }] }
    : {};

  const [total, occupied, available, reserved, maintenance] = await Promise.all([
    prisma.room.count(),
    prisma.room.count({ where: { status: "Occupied" } }),
    prisma.room.count({ where: { status: "Available" } }),
    prisma.room.count({ where: { status: "Reserved" } }),
    prisma.room.count({ where: { status: "Maintenance" } }),
  ]);

  const filteredTotal = await prisma.room.count({ where });
  const meta = paginationMeta(parsePage(sp), filteredTotal);

  const rooms = await prisma.room.findMany({
    where,
    orderBy: [{ floor: "asc" }, { number: "asc" }],
    skip: meta.skip,
    take: meta.take,
  });

  return (
    <div className="flex min-h-screen w-full bg-[#f9f9f7]">
      <Sidebar active="Rooms" />

      <main className="flex-1 px-5 py-6 lg:px-8">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
          <Header
            title="Rooms"
            searchPlaceholder="Search room, type, status..."
            notificationCount={3}
            breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Rooms" }]}
            userName={session.user.name}
            userRole={session.user.role}
          />

          <StatCards total={total} occupied={occupied} available={available} reserved={reserved} maintenance={maintenance} />
          <Toolbar q={q} />
          <RoomsTable rooms={rooms} meta={meta} />
        </div>
      </main>
    </div>
  );
}
