import type { Prisma } from "@prisma/client";

export type InvoiceFilterParams = {
  q?: string;
  status?: string;
  paymentMethod?: string;
  roomType?: string;
  issueDateFrom?: string;
  issueDateTo?: string;
};

export function buildInvoiceWhere(params: InvoiceFilterParams): Prisma.InvoiceWhereInput {
  const { q, status, paymentMethod, roomType, issueDateFrom, issueDateTo } = params;
  const andConditions: Prisma.InvoiceWhereInput[] = [];

  if (q) {
    const orConditions: Prisma.InvoiceWhereInput[] = [
      { guestName: { contains: q } },
      { guestEmail: { contains: q } },
    ];
    // Every code shares a fixed prefix (INV-/BKG-), so on SQLite's case-insensitive
    // `contains` a short query (e.g. a single letter from the prefix) matches every row.
    // Require enough characters that a match reflects the query, not the shared prefix.
    if (q.length >= 3) {
      orConditions.push({ invoiceCode: { contains: q } });
      orConditions.push({ reservation: { bookingCode: { contains: q } } });
    }
    andConditions.push({ OR: orConditions });
  }
  if (status) andConditions.push({ status });
  if (paymentMethod) andConditions.push({ paymentMethod });
  if (roomType) andConditions.push({ room: { roomType } });
  if (issueDateFrom) andConditions.push({ issueDate: { gte: new Date(issueDateFrom) } });
  if (issueDateTo) {
    const end = new Date(issueDateTo);
    end.setDate(end.getDate() + 1);
    andConditions.push({ issueDate: { lt: end } });
  }

  return andConditions.length ? { AND: andConditions } : {};
}

export function invoiceFilterQueryString(params: InvoiceFilterParams): string {
  const search = new URLSearchParams();
  if (params.q) search.set("q", params.q);
  if (params.status) search.set("status", params.status);
  if (params.paymentMethod) search.set("paymentMethod", params.paymentMethod);
  if (params.roomType) search.set("roomType", params.roomType);
  if (params.issueDateFrom) search.set("issueDateFrom", params.issueDateFrom);
  if (params.issueDateTo) search.set("issueDateTo", params.issueDateTo);
  return search.toString();
}
