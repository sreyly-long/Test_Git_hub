import type { Metadata } from "next";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { StatCards } from "@/components/staffs/StatCards";
import { Toolbar } from "@/components/staffs/Toolbar";
import { StaffsTable } from "@/components/staffs/StaffsTable";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import { parsePage, paginationMeta } from "@/lib/pagination";

export const metadata: Metadata = {
  title: "Staffs · coocon",
};

export default async function StaffsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const session = await requireSession();
  const sp = await searchParams;
  const q = sp.q?.trim();

  const where = q
    ? { OR: [{ name: { contains: q } }, { email: { contains: q } }, { role: { contains: q } }] }
    : {};

  const [total, active, onLeave, inactive, filteredTotal] = await Promise.all([
    prisma.staff.count(),
    prisma.staff.count({ where: { status: "Active" } }),
    prisma.staff.count({ where: { status: "On Leave" } }),
    prisma.staff.count({ where: { status: "Inactive" } }),
    prisma.staff.count({ where }),
  ]);

  const meta = paginationMeta(parsePage(sp), filteredTotal);
  const staffs = await prisma.staff.findMany({
    where,
    orderBy: { staffCode: "asc" },
    skip: meta.skip,
    take: meta.take,
  });

  return (
    <div className="flex min-h-screen w-full bg-[#f9f9f7]">
      <Sidebar active="Staffs" />

      <main className="flex-1 px-5 py-6 lg:px-8">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
          <Header
            title="Staffs"
            searchPlaceholder="Search staff name, email, role..."
            notificationCount={4}
            userName={session.user.name}
            userRole={session.user.role}
          />

          <StatCards total={total} active={active} onLeave={onLeave} inactive={inactive} />
          <Toolbar q={q} />
          <StaffsTable staffs={staffs} meta={meta} />
        </div>
      </main>
    </div>
  );
}
