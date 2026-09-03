import type { Prisma } from "@prisma/client";

export type ReportFilterParams = {
  q?: string;
  type?: string;
};

export function buildReportWhere(params: ReportFilterParams): Prisma.ReportWhereInput {
  const { q, type } = params;
  const andConditions: Prisma.ReportWhereInput[] = [];

  if (q) {
    andConditions.push({
      OR: [{ name: { contains: q } }, { description: { contains: q } }, { type: { contains: q } }],
    });
  }
  if (type) andConditions.push({ type });

  return andConditions.length ? { AND: andConditions } : {};
}

export function reportFilterQueryString(params: ReportFilterParams): string {
  const search = new URLSearchParams();
  if (params.q) search.set("q", params.q);
  if (params.type) search.set("type", params.type);
  return search.toString();
}
