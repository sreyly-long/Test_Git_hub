"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import { notifyUser } from "./notifications";
import type { ActionState } from "./rooms";

async function nextInvoiceCode() {
  const count = await prisma.invoice.count();
  return `INV-${200 + count + 1}`;
}

export async function createInvoiceAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  await requireSession();

  const reservationId = String(formData.get("reservationId") ?? "");
  const paymentMethod = String(formData.get("paymentMethod") ?? "cash");
  const status = String(formData.get("status") ?? "Pending");
  const dueDateRaw = String(formData.get("dueDate") ?? "");

  if (!reservationId || !dueDateRaw) {
    return { error: "Please select a reservation and due date." };
  }

  const reservation = await prisma.reservation.findUnique({ where: { id: reservationId } });
  if (!reservation) {
    return { error: "Please select a valid reservation." };
  }

  await prisma.invoice.create({
    data: {
      invoiceCode: await nextInvoiceCode(),
      reservationId: reservation.id,
      roomId: reservation.roomId,
      guestName: reservation.guestName,
      guestEmail: reservation.guestEmail,
      checkIn: reservation.checkIn,
      checkOut: reservation.checkOut,
      amount: reservation.totalAmount,
      paymentMethod,
      paymentDetail: paymentMethod === "paypal" ? reservation.guestEmail : "",
      status,
      dueDate: new Date(dueDateRaw),
    },
  });

  revalidatePath("/invoices");
  revalidatePath("/dashboard");
  return { success: true };
}

export async function updateInvoiceAction(id: string, _prevState: ActionState, formData: FormData): Promise<ActionState> {
  await requireSession();

  const paymentMethod = String(formData.get("paymentMethod") ?? "cash");
  const paymentDetail = String(formData.get("paymentDetail") ?? "").trim();
  const status = String(formData.get("status") ?? "Pending");
  const dueDateRaw = String(formData.get("dueDate") ?? "");
  const amount = Number(formData.get("amount") ?? 0);

  if (!dueDateRaw || amount <= 0) {
    return { error: "Please provide a valid due date and amount." };
  }

  await prisma.invoice.update({
    where: { id },
    data: { paymentMethod, paymentDetail, status, dueDate: new Date(dueDateRaw), amount },
  });

  revalidatePath("/invoices");
  revalidatePath("/dashboard");
  return { success: true };
}

export async function deleteInvoiceAction(id: string): Promise<void> {
  await requireSession();
  await prisma.invoice.delete({ where: { id } }).catch(() => {});
  revalidatePath("/invoices");
  revalidatePath("/dashboard");
}

export async function markInvoicePaidAction(id: string): Promise<void> {
  const session = await requireSession();
  const invoice = await prisma.invoice
    .update({ where: { id }, data: { status: "Paid" } })
    .catch(() => null);

  if (invoice) {
    await notifyUser(
      session.user.id,
      "payment",
      "Payment Received",
      `Payment for Invoice ${invoice.invoiceCode} was received.`,
    );
  }

  revalidatePath("/invoices");
  revalidatePath("/dashboard");
}
