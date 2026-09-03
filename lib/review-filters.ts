import type { Prisma } from "@prisma/client";

export type ReviewFilterParams = {
  q?: string;
  source?: string;
  rating?: string;
  roomType?: string;
  dateFrom?: string;
  dateTo?: string;
};

export function buildReviewWhere(params: ReviewFilterParams): Prisma.ReviewWhereInput {
  const { q, source, rating, roomType, dateFrom, dateTo } = params;
  const andConditions: Prisma.ReviewWhereInput[] = [];

  if (q) {
    andConditions.push({
      OR: [{ guestName: { contains: q } }, { guestEmail: { contains: q } }, { reviewText: { contains: q } }],
    });
  }
  if (source) andConditions.push({ source });
  if (rating) andConditions.push({ rating: Number(rating) });
  if (roomType) andConditions.push({ room: { roomType } });
  if (dateFrom) andConditions.push({ date: { gte: new Date(dateFrom) } });
  if (dateTo) {
    const end = new Date(dateTo);
    end.setDate(end.getDate() + 1);
    andConditions.push({ date: { lt: end } });
  }

  return andConditions.length ? { AND: andConditions } : {};
}

export function reviewFilterQueryString(params: ReviewFilterParams): string {
  const search = new URLSearchParams();
  if (params.q) search.set("q", params.q);
  if (params.source) search.set("source", params.source);
  if (params.rating) search.set("rating", params.rating);
  if (params.roomType) search.set("roomType", params.roomType);
  if (params.dateFrom) search.set("dateFrom", params.dateFrom);
  if (params.dateTo) search.set("dateTo", params.dateTo);
  return search.toString();
}
