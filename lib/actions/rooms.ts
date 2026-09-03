"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import { ROOM_FEATURES, type RoomFeature } from "@/lib/constants";

export type ActionState = {
  error?: string;
  success?: boolean;
};

export async function createRoomAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  await requireSession();

  const number = String(formData.get("number") ?? "").trim();
  const roomType = String(formData.get("roomType") ?? "").trim();
  const floor = Number(formData.get("floor") ?? 1);
  const status = String(formData.get("status") ?? "Available");
  const pricePerNight = Number(formData.get("pricePerNight") ?? 0);
  const capacity = Number(formData.get("capacity") ?? 1);
  const features = ROOM_FEATURES.filter((f) => formData.getAll("features").includes(f)) as RoomFeature[];

  if (!number || !roomType || !floor || !pricePerNight || !capacity) {
    return { error: "Please fill in all required fields." };
  }

  const existing = await prisma.room.findUnique({ where: { number } });
  if (existing) {
    return { error: `Room ${number} already exists.` };
  }

  await prisma.room.create({
    data: {
      number,
      name: `${roomType} Room`,
      roomType,
      floor,
      status,
      pricePerNight,
      capacity,
      features: features.join(","),
    },
  });

  revalidatePath("/rooms");
  revalidatePath("/dashboard");
  return { success: true };
}

export async function deleteRoomAction(id: string): Promise<void> {
  await requireSession();
  await prisma.room.delete({ where: { id } }).catch(() => {});
  revalidatePath("/rooms");
  revalidatePath("/dashboard");
}

export async function updateRoomStatusAction(id: string, status: string): Promise<void> {
  await requireSession();
  await prisma.room.update({ where: { id }, data: { status } }).catch(() => {});
  revalidatePath("/rooms");
  revalidatePath("/dashboard");
}
