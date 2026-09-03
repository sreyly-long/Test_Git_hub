import type { Staff } from "@prisma/client";
import { Card } from "@/components/dashboard/Card";
import { PaginationFooter } from "@/components/dashboard/PaginationFooter";
import type { PaginationMeta } from "@/lib/pagination";
import { StaffsTableRow } from "./StaffsTableRow";

const columns = ["Staff ID", "Name", "Role", "Department", "Status", "Phone", "Email", "Actions"];

export function StaffsTable({
  staffs,
  meta,
  basePath = "/staffs",
}: {
  staffs: Staff[];
  meta: PaginationMeta;
  basePath?: string;
}) {
  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[960px] border-collapse text-left text-sm">
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
            {staffs.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="py-8 text-center text-sm text-[#898781]">
                  No staff found.
                </td>
              </tr>
            )}
            {staffs.map((staff) => (
              <StaffsTableRow key={staff.id} staff={staff} />
            ))}
          </tbody>
        </table>
      </div>

      <PaginationFooter {...meta} basePath={basePath} />
    </Card>
  );
}
