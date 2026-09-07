"use server";

import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import type { ActionState } from "./rooms";

const MAX_AVATAR_BYTES = 4 * 1024 * 1024; // 4MB
const EXTENSION_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

const PAGES_WITH_HEADER = [
  "/dashboard",
  "/reservation",
  "/rooms",
  "/staffs",
  "/analytics",
  "/reports",
  "/reviews",
  "/invoices",
  "/settings",
];

function revalidatePagesWithHeader() {
  for (const page of PAGES_WITH_HEADER) revalidatePath(page);
}

async function deleteUploadedAvatar(avatarUrl: string | null) {
  if (!avatarUrl?.startsWith("/uploads/avatars/")) return;
  await unlink(path.join(process.cwd(), "public", avatarUrl)).catch(() => {});
}

export async function updateAvatarAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const session = await requireSession();

  const file = formData.get("avatar");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Please choose an image to upload." };
  }

  const ext = EXTENSION_BY_MIME[file.type];
  if (!ext) {
    return { error: "Please upload a JPG, PNG, WEBP, or GIF image." };
  }
  if (file.size > MAX_AVATAR_BYTES) {
    return { error: "Image must be smaller than 4MB." };
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads", "avatars");
  await mkdir(uploadDir, { recursive: true });

  const filename = `${session.user.id}-${Date.now()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadDir, filename), buffer);

  const avatarUrl = `/uploads/avatars/${filename}`;
  await prisma.user.update({ where: { id: session.user.id }, data: { avatarUrl } });
  await deleteUploadedAvatar(session.user.avatarUrl);

  revalidatePagesWithHeader();
  return { success: true };
}

export async function removeAvatarAction(): Promise<void> {
  const session = await requireSession();

  await prisma.user.update({ where: { id: session.user.id }, data: { avatarUrl: null } });
  await deleteUploadedAvatar(session.user.avatarUrl);

  revalidatePagesWithHeader();
}
