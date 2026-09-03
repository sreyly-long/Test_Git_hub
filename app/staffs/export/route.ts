import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import { buildStaffWhere } from "@/lib/staff-filters";
import { createStyledWorkbookBuffer, xlsxResponse, type CellColorMap } from "@/lib/xlsx-export";

function fmtDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

const statusColors: CellColorMap = {
  Active: { bg: "FFE3F5E3", fg: "FF006300" },
  "On Leave": { bg: "FFFCEFD1", fg: "FF8A5A00" },
  Inactive: { bg: "FFFBE1E1", fg: "FFD03B3B" },
};

export async function GET(request: Request) {
  await requireSession();

  const { searchParams } = new URL(request.url);
  const where = buildStaffWhere({
    q: searchParams.get("q") ?? undefined,
    department: searchParams.get("department") ?? undefined,
    role: searchParams.get("role") ?? undefined,
    status: searchParams.get("status") ?? undefined,
    hiredFrom: searchParams.get("hiredFrom") ?? undefined,
    hiredTo: searchParams.get("hiredTo") ?? undefined,
  });

  const staffs = await prisma.staff.findMany({ where, orderBy: { staffCode: "asc" } });

  const rows = staffs.map((s) => ({
    staffCode: s.staffCode,
    name: s.name,
    role: s.role,
    department: s.department,
    status: s.status,
    phone: s.phone,
    email: s.email,
    hiredOn: fmtDate(s.createdAt),
  }));

  const buffer = await createStyledWorkbookBuffer({
    sheetName: "Staffs",
    columns: [
      { header: "Staff ID", key: "staffCode", width: 12 },
      { header: "Name", key: "name", width: 20, align: "left" },
      { header: "Role", key: "role", width: 16, align: "left" },
      { header: "Department", key: "department", width: 16, align: "left" },
      { header: "Status", key: "status", width: 12 },
      { header: "Phone", key: "phone", width: 16 },
      { header: "Email", key: "email", width: 26, align: "left" },
      { header: "Hired On", key: "hiredOn", width: 13 },
    ],
    rows,
    colorByColumnKey: { status: statusColors },
  });

  const filename = `staffs-${fmtDate(new Date())}.xlsx`;
  return xlsxResponse(buffer, filename);
}
