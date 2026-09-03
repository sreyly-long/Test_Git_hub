import type { Prisma } from "@prisma/client";
import { addDays } from "./stats";

export type ReservationFilterParams = {
  q?: string;
  status?: string;
  roomType?: string;
  source?: string;
  checkInFrom?: string;
  checkInTo?: string;
};

export function buildReservationWhere(params: ReservationFilterParams): Prisma.ReservationWhereInput {
  const { q, status, roomType, source, checkInFrom, checkInTo } = params;
  const andConditions: Prisma.ReservationWhereInput[] = [];

  if (q) {
    const orConditions: Prisma.ReservationWhereInput[] = [
      { guestName: { contains: q } },
      { guestEmail: { contains: q } },
      { room: { number: { contains: q } } },
    ];
    // Every booking code shares the fixed prefix "BKG-", so on SQLite's case-insensitive
    // `contains` a short query (e.g. a single letter from the prefix) matches every row.
    // Require enough characters that a match reflects the query, not the shared prefix.
    if (q.length >= 3) {
      orConditions.push({ bookingCode: { contains: q } });
    }
    andConditions.push({ OR: orConditions });
  }
  if (status) andConditions.push({ status });
  if (roomType) andConditions.push({ room: { roomType } });
  if (source) andConditions.push({ source });
  if (checkInFrom) andConditions.push({ checkIn: { gte: new Date(checkInFrom) } });
  if (checkInTo) andConditions.push({ checkIn: { lt: addDays(new Date(checkInTo), 1) } });

  return andConditions.length ? { AND: andConditions } : {};
}

export function reservationFilterQueryString(params: ReservationFilterParams): string {
  const search = new URLSearchParams();
  if (params.q) search.set("q", params.q);
  if (params.status) search.set("status", params.status);
  if (params.roomType) search.set("roomType", params.roomType);
  if (params.source) search.set("source", params.source);
  if (params.checkInFrom) search.set("checkInFrom", params.checkInFrom);
  if (params.checkInTo) search.set("checkInTo", params.checkInTo);
  return search.toString();
}
