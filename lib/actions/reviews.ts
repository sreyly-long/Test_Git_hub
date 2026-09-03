"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";

export async function deleteReviewAction(id: string): Promise<void> {
  await requireSession();
  await prisma.review.delete({ where: { id } }).catch(() => {});
  revalidatePath("/reviews");
  revalidatePath("/dashboard");
}
