import type { Prisma } from "@prisma/client";

export type StaffFilterParams = {
  q?: string;
  department?: string;
  role?: string;
  status?: string;
  hiredFrom?: string;
  hiredTo?: string;
};

export function buildStaffWhere(params: StaffFilterParams): Prisma.StaffWhereInput {
  const { q, department, role, status, hiredFrom, hiredTo } = params;
  const andConditions: Prisma.StaffWhereInput[] = [];

  if (q) {
    andConditions.push({
      OR: [{ name: { contains: q } }, { email: { contains: q } }, { role: { contains: q } }],
    });
  }
  if (department) andConditions.push({ department });
  if (role) andConditions.push({ role });
  if (status) andConditions.push({ status });
  if (hiredFrom) andConditions.push({ createdAt: { gte: new Date(hiredFrom) } });
  if (hiredTo) {
    const end = new Date(hiredTo);
    end.setDate(end.getDate() + 1);
    andConditions.push({ createdAt: { lt: end } });
  }

  return andConditions.length ? { AND: andConditions } : {};
}

export function staffFilterQueryString(params: StaffFilterParams): string {
  const search = new URLSearchParams();
  if (params.q) search.set("q", params.q);
  if (params.department) search.set("department", params.department);
  if (params.role) search.set("role", params.role);
  if (params.status) search.set("status", params.status);
  if (params.hiredFrom) search.set("hiredFrom", params.hiredFrom);
  if (params.hiredTo) search.set("hiredTo", params.hiredTo);
  return search.toString();
}
