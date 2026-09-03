import type { Metadata } from "next";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Tabs } from "@/components/reports/Tabs";
import { ReportsTable } from "@/components/reports/ReportsTable";
import { GenerateReportCard } from "@/components/reports/GenerateReportCard";
import { ScheduledReportsCard } from "@/components/reports/ScheduledReportsCard";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import { parsePage, paginationMeta } from "@/lib/pagination";
import { buildReportWhere, reportFilterQueryString } from "@/lib/report-filters";

export const metadata: Metadata = {
  title: "Reports · coocon",
};

export default async function ReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; type?: string; q?: string }>;
}) {
  const session = await requireSession();
  const sp = await searchParams;
  const type = sp.type;
  const q = sp.q?.trim();

  const where = buildReportWhere({ q, type });
  const total = await prisma.report.count({ where });
  const meta = paginationMeta(parsePage(sp), total);

  const [reports, scheduledReports] = await Promise.all([
    prisma.report.findMany({
      where,
      orderBy: { generatedOn: "desc" },
      skip: meta.skip,
      take: meta.take,
    }),
    prisma.scheduledReport.findMany({ orderBy: { name: "asc" } }),
  ]);

  const filterQuery = reportFilterQueryString({ q, type });
  const basePath = filterQuery ? `/reports?${filterQuery}` : "/reports";

  return (
    <div className="flex min-h-screen w-full bg-[#f9f9f7]">
      <Sidebar active="Reports" />

      <main className="flex-1 px-5 py-6 lg:px-8">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
          <Header
            title="Reports"
            subtitle="Generate and download detailed reports"
            searchPlaceholder="Search reports..."
            searchAction="/reports"
            q={q}
            userName={session.user.name}
            userRole={session.user.role}
          />

          <Tabs activeType={type} q={q} />

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
            <ReportsTable reports={reports} meta={meta} basePath={basePath} />

            <div className="flex flex-col gap-5">
              <GenerateReportCard />
              <ScheduledReportsCard reports={scheduledReports} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
