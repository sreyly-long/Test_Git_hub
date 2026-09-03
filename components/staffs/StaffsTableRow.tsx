"use client";

import { useState } from "react";
import type { Staff } from "@prisma/client";
import { Avatar } from "@/components/dashboard/Avatar";
import { DeleteButton } from "@/components/dashboard/DeleteButton";
import { IconPencil } from "@/components/dashboard/icons";
import { deleteStaffAction } from "@/lib/actions/staffs";
import { EditStaffModal } from "./EditStaffModal";

const statusStyles: Record<string, string> = {
  Active: "bg-[#0ca30c]/10 text-[#006300]",
  "On Leave": "bg-[#eda100]/15 text-[#8a5a00]",
  Inactive: "bg-[#d03b3b]/10 text-[#d03b3b]",
};

export function StaffsTableRow({ staff }: { staff: Staff }) {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <tr className="cursor-pointer text-[#0b0b0b] hover:bg-black/[.015]" onClick={() => setEditOpen(true)}>
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
        <td className="whitespace-nowrap py-3 pr-4" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label="Edit staff"
              onClick={() => setEditOpen(true)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e1e0d9] text-[#52514e] hover:bg-black/[.02]"
            >
              <IconPencil className="h-4 w-4" />
            </button>
            <DeleteButton
              action={deleteStaffAction.bind(null, staff.id)}
              confirmMessage={`Remove ${staff.name} from staff?`}
            />
          </div>
        </td>
      </tr>

      <EditStaffModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        staff={{
          id: staff.id,
          staffCode: staff.staffCode,
          name: staff.name,
          role: staff.role,
          department: staff.department,
          status: staff.status,
          phone: staff.phone,
          email: staff.email,
        }}
      />
    </>
  );
}
