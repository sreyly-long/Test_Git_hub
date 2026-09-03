"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import type { ActionState } from "./rooms";

async function nextBookingCode() {
  const count = await prisma.reservation.count();
  return `BKG-${100 + count + 1}`;
}

export async function createReservationAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  await requireSession();

  const guestName = String(formData.get("guestName") ?? "").trim();
  const guestEmail = String(formData.get("guestEmail") ?? "").trim();
  const roomId = String(formData.get("roomId") ?? "");
  const checkInRaw = String(formData.get("checkIn") ?? "");
  const checkOutRaw = String(formData.get("checkOut") ?? "");
  const guests = Number(formData.get("guests") ?? 1);
  const source = String(formData.get("source") ?? "Direct");
  const status = String(formData.get("status") ?? "Confirmed");

  if (!guestName || !guestEmail || !roomId || !checkInRaw || !checkOutRaw) {
    return { error: "Please fill in all required fields." };
  }

  const checkIn = new Date(checkInRaw);
  const checkOut = new Date(checkOutRaw);
  if (checkOut <= checkIn) {
    return { error: "Check-out date must be after check-in date." };
  }

  const room = await prisma.room.findUnique({ where: { id: roomId } });
  if (!room) {
    return { error: "Please select a valid room." };
  }

  const nights = Math.max(1, Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)));
  const totalAmount = room.pricePerNight * nights;

  await prisma.reservation.create({
    data: {
      bookingCode: await nextBookingCode(),
      guestName,
      guestEmail,
      roomId,
      checkIn,
      checkOut,
      guests,
      totalAmount,
      status,
      source,
    },
  });

  revalidatePath("/reservation");
  revalidatePath("/dashboard");
  revalidatePath("/analytics");
  return { success: true };
}

export async function updateReservationAction(
  id: string,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireSession();

  const guestName = String(formData.get("guestName") ?? "").trim();
  const guestEmail = String(formData.get("guestEmail") ?? "").trim();
  const roomId = String(formData.get("roomId") ?? "");
  const checkInRaw = String(formData.get("checkIn") ?? "");
  const checkOutRaw = String(formData.get("checkOut") ?? "");
  const guests = Number(formData.get("guests") ?? 1);
  const source = String(formData.get("source") ?? "Direct");
  const status = String(formData.get("status") ?? "Confirmed");

  if (!guestName || !guestEmail || !roomId || !checkInRaw || !checkOutRaw) {
    return { error: "Please fill in all required fields." };
  }

  const checkIn = new Date(checkInRaw);
  const checkOut = new Date(checkOutRaw);
  if (checkOut <= checkIn) {
    return { error: "Check-out date must be after check-in date." };
  }

  const room = await prisma.room.findUnique({ where: { id: roomId } });
  if (!room) {
    return { error: "Please select a valid room." };
  }

  const nights = Math.max(1, Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)));
  const totalAmount = room.pricePerNight * nights;

  await prisma.reservation.update({
    where: { id },
    data: { guestName, guestEmail, roomId, checkIn, checkOut, guests, totalAmount, status, source },
  });

  revalidatePath("/reservation");
  revalidatePath("/dashboard");
  revalidatePath("/analytics");
  return { success: true };
}

export async function deleteReservationAction(id: string): Promise<void> {
  await requireSession();
  await prisma.reservation.delete({ where: { id } }).catch(() => {});
  revalidatePath("/reservation");
  revalidatePath("/dashboard");
  revalidatePath("/analytics");
}

export async function updateReservationStatusAction(id: string, status: string): Promise<void> {
  await requireSession();
  await prisma.reservation.update({ where: { id }, data: { status } }).catch(() => {});
  revalidatePath("/reservation");
  revalidatePath("/dashboard");
}
