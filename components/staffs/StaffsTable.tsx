import type { Staff } from "@prisma/client";
import { Card } from "@/components/dashboard/Card";
import { Avatar } from "@/components/dashboard/Avatar";
import { PaginationFooter } from "@/components/dashboard/PaginationFooter";
import { DeleteButton } from "@/components/dashboard/DeleteButton";
import { deleteStaffAction } from "@/lib/actions/staffs";
import type { PaginationMeta } from "@/lib/pagination";

const statusStyles: Record<string, string> = {
  Active: "bg-[#0ca30c]/10 text-[#006300]",
  "On Leave": "bg-[#eda100]/15 text-[#8a5a00]",
  Inactive: "bg-[#d03b3b]/10 text-[#d03b3b]",
};

const columns = ["Staff ID", "Name", "Role", "Department", "Status", "Phone", "Email", "Actions"];

export function StaffsTable({ staffs, meta }: { staffs: Staff[]; meta: PaginationMeta }) {
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
              <tr key={staff.id} className="text-[#0b0b0b]">
                <td className="whitespace-nowrap py-3 pr-4 font-medium">{staff.staffCode}</td>
                <td className="whitespace-nowrap py-3 pr-4">
                  <div className="flex items-center gap-2.5">
                    <Avatar name={staff.name} className="h-8 w-8" />
                    <span className="font-medium">{staff.name}</span>
                  </div>
                </td>
                <td className="whitespace-nowrap py-3 pr-4 text-[#52514e]">{staff.role}</td>
                <td className="whitespace-nowrap py-3 pr-4 text-[#52514e]">{staff.department}</td>
                <td className="whitespace-nowrap py-3 pr-4">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[staff.status]}`}>
                    {staff.status}
                  </span>
                </td>
                <td className="whitespace-nowrap py-3 pr-4 text-[#52514e]">{staff.phone}</td>
                <td className="whitespace-nowrap py-3 pr-4 text-[#52514e]">{staff.email}</td>
                <td className="whitespace-nowrap py-3 pr-4">
                  <DeleteButton
                    action={deleteStaffAction.bind(null, staff.id)}
                    confirmMessage={`Remove ${staff.name} from staff?`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PaginationFooter {...meta} basePath="/staffs" />
    </Card>
  );
}
