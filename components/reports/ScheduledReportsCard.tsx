import type { ScheduledReport } from "@prisma/client";
import { Card } from "@/components/dashboard/Card";
import { IconToggleOn, IconToggleOff } from "@/components/dashboard/icons";
import { toggleScheduledReportAction } from "@/lib/actions/reports";

export function ScheduledReportsCard({ reports }: { reports: ScheduledReport[] }) {
  return (
    <Card>
      <h2 className="mb-4 text-sm font-semibold text-[#0b0b0b]">Scheduled Reports</h2>

      <ul className="flex flex-col gap-4">
        {reports.map((report) => (
          <li key={report.id} className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-[#0b0b0b]">{report.name}</p>
              <p className="text-xs text-[#898781]">{report.cadence}</p>
            </div>
            <form action={toggleScheduledReportAction.bind(null, report.id)}>
              <button
                type="submit"
                aria-label={report.enabled ? "Disable" : "Enable"}
                className={report.enabled ? "text-[#2a78d6]" : "text-[#c3c2b7]"}
              >
                {report.enabled ? (
                  <IconToggleOn className="h-5 w-9" />
                ) : (
                  <IconToggleOff className="h-5 w-9" />
                )}
              </button>
            </form>
          </li>
        ))}
      </ul>
    </Card>
  );
}
