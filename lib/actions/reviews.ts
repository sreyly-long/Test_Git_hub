"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import type { ActionState } from "./rooms";

export async function updateReviewAction(id: string, _prevState: ActionState, formData: FormData): Promise<ActionState> {
  await requireSession();

  const guestName = String(formData.get("guestName") ?? "").trim();
  const guestEmail = String(formData.get("guestEmail") ?? "").trim();
  const roomId = String(formData.get("roomId") ?? "");
  const rating = Number(formData.get("rating") ?? 5);
  const source = String(formData.get("source") ?? "");
  const reviewText = String(formData.get("reviewText") ?? "").trim();

  if (!guestName || !guestEmail || !roomId || !source || !reviewText) {
    return { error: "Please fill in all required fields." };
  }
  if (rating < 1 || rating > 5) {
    return { error: "Rating must be between 1 and 5." };
  }

  const room = await prisma.room.findUnique({ where: { id: roomId } });
  if (!room) {
    return { error: "Please select a valid room." };
  }

  await prisma.review.update({
    where: { id },
    data: { guestName, guestEmail, roomId, rating, source, reviewText },
  });

  revalidatePath("/reviews");
  revalidatePath("/dashboard");
  return { success: true };
}

export async function deleteReviewAction(id: string): Promise<void> {
  await requireSession();
  await prisma.review.delete({ where: { id } }).catch(() => {});
  revalidatePath("/reviews");
  revalidatePath("/dashboard");
}
