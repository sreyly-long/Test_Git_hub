"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import type { ActionState } from "./rooms";

async function nextStaffCode() {
  const count = await prisma.staff.count();
  return `STF${String(count + 1).padStart(3, "0")}`;
}

export async function createStaffAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  await requireSession();

  const name = String(formData.get("name") ?? "").trim();
  const role = String(formData.get("role") ?? "").trim();
  const department = String(formData.get("department") ?? "").trim();
  const status = String(formData.get("status") ?? "Active");
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();

  if (!name || !role || !department || !phone || !email) {
    return { error: "Please fill in all required fields." };
  }

  await prisma.staff.create({
    data: { staffCode: await nextStaffCode(), name, role, department, status, phone, email },
  });

  revalidatePath("/staffs");
  return { success: true };
}

export async function deleteStaffAction(id: string): Promise<void> {
  await requireSession();
  await prisma.staff.delete({ where: { id } }).catch(() => {});
  revalidatePath("/staffs");
}
