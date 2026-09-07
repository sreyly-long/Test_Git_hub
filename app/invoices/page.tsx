import type { Metadata } from "next";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { StatCards } from "@/components/invoices/StatCards";
import { Toolbar } from "@/components/invoices/Toolbar";
import { InvoicesTable } from "@/components/invoices/InvoicesTable";
import type { InvoiceStat } from "@/components/invoices/data";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import { parsePage, paginationMeta } from "@/lib/pagination";
import { percentChange, startOfMonth, addMonths, startOfDay } from "@/lib/stats";
import { buildInvoiceWhere, invoiceFilterQueryString } from "@/lib/invoice-filters";

export const metadata: Metadata = {
  title: "Invoices · coocon",
};

export default async function InvoicesPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    q?: string;
    status?: string;
    paymentMethod?: string;
    roomType?: string;
    issueDateFrom?: string;
    issueDateTo?: string;
  }>;
}) {
  const session = await requireSession();
  const sp = await searchParams;
  const q = sp.q?.trim();
  const { status, paymentMethod, roomType, issueDateFrom, issueDateTo } = sp;

  const now = new Date();
  const monthStart = startOfMonth(now);
  const prevMonthStart = addMonths(monthStart, -1);
  const today = startOfDay(now);

  const [
    total,
    paid,
    pending,
    overdue,
    thisMonthCount,
    lastMonthCount,
    revenueThisMonth,
    revenueLastMonth,
    reservations,
  ] = await Promise.all([
    prisma.invoice.count(),
    prisma.invoice.count({ where: { status: "Paid" } }),
    prisma.invoice.count({ where: { status: "Pending" } }),
    prisma.invoice.count({ where: { status: "Overdue" } }),
    prisma.invoice.count({ where: { issueDate: { gte: monthStart } } }),
    prisma.invoice.count({ where: { issueDate: { gte: prevMonthStart, lt: monthStart } } }),
    prisma.invoice.aggregate({ _sum: { amount: true }, where: { status: "Paid", issueDate: { gte: monthStart } } }),
    prisma.invoice.aggregate({ _sum: { amount: true }, where: { status: "Paid", issueDate: { gte: prevMonthStart, lt: monthStart } } }),
    prisma.reservation.findMany({
      orderBy: { checkIn: "desc" },
      take: 50,
      select: { id: true, bookingCode: true, guestName: true, room: { select: { number: true } } },
    }),
  ]);

  const totalDelta = percentChange(thisMonthCount, lastMonthCount);
  const revenueDelta = percentChange(revenueThisMonth._sum.amount ?? 0, revenueLastMonth._sum.amount ?? 0);
  const pct = (n: number) => (total === 0 ? "0.0% of total" : `${((n / total) * 100).toFixed(1)}% of total`);

  function hrefsFor(query: string) {
    return {
      viewHref: query ? `/invoices?${query}` : "/invoices",
      exportHref: query ? `/invoices/export?${query}` : "/invoices/export",
    };
  }

  const monthStartStr = monthStart.toISOString().slice(0, 10);
  const todayStr = today.toISOString().slice(0, 10);

  const stats: InvoiceStat[] = [
    { kind: "delta", label: "Total Invoices", value: String(total), deltaPct: totalDelta.pct, direction: totalDelta.direction, fromLabel: "from last month", icon: "invoice", iconTheme: "blue", ...hrefsFor("") },
    { kind: "ratio", label: "Paid Invoices", value: String(paid), subtitle: pct(paid), icon: "invoice", iconTheme: "green", ...hrefsFor("status=Paid") },
    { kind: "ratio", label: "Pending Invoices", value: String(pending), subtitle: pct(pending), icon: "invoice", iconTheme: "orange", ...hrefsFor("status=Pending") },
    { kind: "ratio", label: "Overdue Invoices", value: String(overdue), subtitle: pct(overdue), icon: "alert", iconTheme: "red", ...hrefsFor("status=Overdue") },
    { kind: "delta", label: "Total Revenue", value: `$${(revenueThisMonth._sum.amount ?? 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}`, deltaPct: revenueDelta.pct, direction: revenueDelta.direction, fromLabel: "from last month", icon: "dollar", iconTheme: "violet", ...hrefsFor(`status=Paid&issueDateFrom=${monthStartStr}&issueDateTo=${todayStr}`) },
  ];

  const where = buildInvoiceWhere({ q, status, paymentMethod, roomType, issueDateFrom, issueDateTo });
  const filteredTotal = await prisma.invoice.count({ where });
  const meta = paginationMeta(parsePage(sp), filteredTotal);

  const invoices = await prisma.invoice.findMany({
    where,
    include: { room: true, reservation: { select: { bookingCode: true } } },
    orderBy: { issueDate: "desc" },
    skip: meta.skip,
    take: meta.take,
  });

  const reservationOptions = reservations.map((r) => ({
    id: r.id,
    bookingCode: r.bookingCode,
    guestName: r.guestName,
    roomNumber: r.room.number,
  }));

  const filterQuery = invoiceFilterQueryString({ q, status, paymentMethod, roomType, issueDateFrom, issueDateTo });
  const basePath = filterQuery ? `/invoices?${filterQuery}` : "/invoices";
  const exportHref = filterQuery ? `/invoices/export?${filterQuery}` : "/invoices/export";

  return (
    <div className="flex min-h-screen w-full bg-[#f9f9f7]">
      <Sidebar active="Invoices" />

      <main className="flex-1 px-5 py-6 lg:px-8">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
          <Header
            title="Invoices"
            searchPlaceholder="Search invoice, guest, booking ID..."
            searchAction="/invoices"
            q={q}
            userName={session.user.name}
            userRole={session.user.role}
            userAvatarUrl={session.user.avatarUrl}
          />

          <StatCards stats={stats} />
          <Toolbar reservations={reservationOptions} exportHref={exportHref} />
          <InvoicesTable invoices={invoices} meta={meta} basePath={basePath} />
        </div>
      </main>
    </div>
  );
}
