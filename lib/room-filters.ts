import type { Prisma } from "@prisma/client";

export type RoomFilterParams = {
  q?: string;
  roomType?: string;
  status?: string;
  floor?: string;
  priceMin?: string;
  priceMax?: string;
};

export function buildRoomWhere(params: RoomFilterParams): Prisma.RoomWhereInput {
  const { q, roomType, status, floor, priceMin, priceMax } = params;
  const andConditions: Prisma.RoomWhereInput[] = [];

  if (q) {
    andConditions.push({ OR: [{ number: { contains: q } }, { name: { contains: q } }] });
  }
  if (roomType) andConditions.push({ roomType });
  if (status) andConditions.push({ status });
  if (floor) andConditions.push({ floor: Number(floor) });
  if (priceMin) andConditions.push({ pricePerNight: { gte: Number(priceMin) } });
  if (priceMax) andConditions.push({ pricePerNight: { lte: Number(priceMax) } });

  return andConditions.length ? { AND: andConditions } : {};
}

export function roomFilterQueryString(params: RoomFilterParams): string {
  const search = new URLSearchParams();
  if (params.q) search.set("q", params.q);
  if (params.roomType) search.set("roomType", params.roomType);
  if (params.status) search.set("status", params.status);
  if (params.floor) search.set("floor", params.floor);
  if (params.priceMin) search.set("priceMin", params.priceMin);
  if (params.priceMax) search.set("priceMax", params.priceMax);
  return search.toString();
}
