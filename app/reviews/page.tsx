import type { Metadata } from "next";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { StatCards } from "@/components/reviews/StatCards";
import { Toolbar } from "@/components/reviews/Toolbar";
import { ReviewsTable } from "@/components/reviews/ReviewsTable";
import type { ReviewStat } from "@/components/reviews/data";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import { parsePage, paginationMeta } from "@/lib/pagination";
import { percentChange, startOfMonth, addMonths } from "@/lib/stats";
import { buildReviewWhere, reviewFilterQueryString } from "@/lib/review-filters";

export const metadata: Metadata = {
  title: "Reviews · coocon",
};

export default async function ReviewsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    q?: string;
    source?: string;
    rating?: string;
    roomType?: string;
    dateFrom?: string;
    dateTo?: string;
  }>;
}) {
  const session = await requireSession();
  const sp = await searchParams;
  const q = sp.q?.trim();
  const { source, rating, roomType, dateFrom, dateTo } = sp;

  const now = new Date();
  const monthStart = startOfMonth(now);
  const prevMonthStart = addMonths(monthStart, -1);

  const [
    total,
    fiveStar,
    fourStar,
    threeAndBelow,
    avgThisMonth,
    avgLastMonth,
    countThisMonth,
    countLastMonth,
    rooms,
  ] = await Promise.all([
    prisma.review.count(),
    prisma.review.count({ where: { rating: 5 } }),
    prisma.review.count({ where: { rating: 4 } }),
    prisma.review.count({ where: { rating: { lte: 3 } } }),
    prisma.review.aggregate({ _avg: { rating: true }, where: { date: { gte: monthStart } } }),
    prisma.review.aggregate({ _avg: { rating: true }, where: { date: { gte: prevMonthStart, lt: monthStart } } }),
    prisma.review.count({ where: { date: { gte: monthStart } } }),
    prisma.review.count({ where: { date: { gte: prevMonthStart, lt: monthStart } } }),
    prisma.room.findMany({ orderBy: { number: "asc" }, select: { id: true, number: true, name: true } }),
  ]);

  const currentAvg = avgThisMonth._avg.rating ?? avgLastMonth._avg.rating ?? 0;
  const previousAvg = avgLastMonth._avg.rating ?? currentAvg;
  const ratingDiff = Math.round((currentAvg - previousAvg) * 10) / 10;
  const totalDelta = percentChange(countThisMonth, countLastMonth);
  const pct = (n: number) => (total === 0 ? "0.0% of total" : `${((n / total) * 100).toFixed(1)}% of total`);

  const where = buildReviewWhere({ q, source, rating, roomType, dateFrom, dateTo });
  const filteredTotal = await prisma.review.count({ where });

  function hrefsFor(query: string) {
    return {
      viewHref: query ? `/reviews?${query}` : "/reviews",
      exportHref: query ? `/reviews/export?${query}` : "/reviews/export",
    };
  }

  const stats: ReviewStat[] = [
    { kind: "rating", label: "Average Rating", value: Math.round(currentAvg * 10) / 10, deltaPct: Math.abs(ratingDiff), direction: ratingDiff >= 0 ? "up" : "down", fromLabel: "from last month", ...hrefsFor("") },
    { kind: "delta", label: "Total Reviews", value: String(total), deltaPct: totalDelta.pct, direction: totalDelta.direction, fromLabel: "from last month", iconTheme: "blue", ...hrefsFor("") },
    { kind: "ratio", label: "5 Star Reviews", value: String(fiveStar), subtitle: pct(fiveStar), iconTheme: "green", ...hrefsFor("rating=5") },
    { kind: "ratio", label: "4 Star Reviews", value: String(fourStar), subtitle: pct(fourStar), iconTheme: "blue", ...hrefsFor("rating=4") },
    { kind: "ratio", label: "3 Star & Below", value: String(threeAndBelow), subtitle: pct(threeAndBelow), iconTheme: "red", ...hrefsFor("") },
  ];

  const meta = paginationMeta(parsePage(sp), filteredTotal);
  const reviews = await prisma.review.findMany({
    where,
    include: { room: true },
    orderBy: { date: "desc" },
    skip: meta.skip,
    take: meta.take,
  });

  const filterQuery = reviewFilterQueryString({ q, source, rating, roomType, dateFrom, dateTo });
  const basePath = filterQuery ? `/reviews?${filterQuery}` : "/reviews";
  const exportHref = filterQuery ? `/reviews/export?${filterQuery}` : "/reviews/export";

  return (
    <div className="flex min-h-screen w-full bg-[#f9f9f7]">
      <Sidebar active="Reviews" />

      <main className="flex-1 px-5 py-6 lg:px-8">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
          <Header
            title="Reviews"
            searchPlaceholder="Search guest name or review..."
            searchAction="/reviews"
            q={q}
            userName={session.user.name}
            userRole={session.user.role}
          />

          <StatCards stats={stats} />
          <Toolbar exportHref={exportHref} />
          <ReviewsTable reviews={reviews} meta={meta} rooms={rooms} basePath={basePath} />
        </div>
      </main>
    </div>
  );
}
