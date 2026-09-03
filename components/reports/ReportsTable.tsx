import type { Report } from "@prisma/client";
import { Card } from "@/components/dashboard/Card";
import { PaginationFooter } from "@/components/dashboard/PaginationFooter";
import { DeleteButton } from "@/components/dashboard/DeleteButton";
import { deleteReportAction } from "@/lib/actions/reports";
import type { PaginationMeta } from "@/lib/pagination";

const typeStyles: Record<string, string> = {
  Reservation: "bg-[#2a78d6]/10 text-[#184f95]",
  Revenue: "bg-[#0ca30c]/10 text-[#006300]",
  Rooms: "bg-[#eda100]/15 text-[#8a5a00]",
  Guests: "bg-[#4a3aa7]/10 text-[#4a3aa7]",
  Staff: "bg-[#1baf7a]/10 text-[#0f6b4a]",
  Finance: "bg-[#d03b3b]/10 text-[#d03b3b]",
};

const columns = ["Report Name", "Type", "Description", "Date Range", "Generated On", "Actions"];

function fmtDate(date: Date) {
  return date.toLocaleString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function fmtDateTime(date: Date) {
  return date.toLocaleString(undefined, { year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

export function ReportsTable({ reports, meta, basePath }: { reports: Report[]; meta: PaginationMeta; basePath: string }) {
  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[#e1e0d9] text-xs uppercase tracking-wide text-[#898781]">
              {columns.map((col) => (
                <th key={col} className="whitespace-nowrap py-2.5 pr-4 font-medium">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e1e0d9]">
            {reports.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="py-8 text-center text-sm text-[#898781]">
                  No reports found.
                </td>
              </tr>
            )}
            {reports.map((report) => (
              <tr key={report.id} className="text-[#0b0b0b]">
                <td className="whitespace-nowrap py-3 pr-4 font-medium">{report.name}</td>
                <td className="whitespace-nowrap py-3 pr-4">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${typeStyles[report.type]}`}>
                    {report.type}
                  </span>
                </td>
                <td className="py-3 pr-4 text-[#52514e]">{report.description}</td>
                <td className="whitespace-nowrap py-3 pr-4 text-[#52514e]">
                  {fmtDate(report.dateStart)} - {fmtDate(report.dateEnd)}
                </td>
                <td className="whitespace-nowrap py-3 pr-4 text-[#52514e]">{fmtDateTime(report.generatedOn)}</td>
                <td className="whitespace-nowrap py-3 pr-4">
                  <div className="flex items-center gap-1.5">
                    <DeleteButton
                      action={deleteReportAction.bind(null, report.id)}
                      confirmMessage={`Delete "${report.name}"?`}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PaginationFooter {...meta} basePath={basePath} />
    </Card>
  );
}
