"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import type { ActionState } from "./rooms";

const REPORT_NAME_BY_TYPE: Record<string, string> = {
  Reservation: "Reservation Summary",
  Revenue: "Revenue Report",
  Rooms: "Occupancy Report",
  Guests: "Guest Report",
  Staff: "Staff Performance",
  Finance: "Payment Report",
};

export async function generateReportAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  await requireSession();

  const type = String(formData.get("type") ?? "");
  const dateStartRaw = String(formData.get("dateStart") ?? "");
  const dateEndRaw = String(formData.get("dateEnd") ?? "");

  if (!type || !dateStartRaw || !dateEndRaw) {
    return { error: "Please choose a report type and date range." };
  }

  const dateStart = new Date(dateStartRaw);
  const dateEnd = new Date(dateEndRaw);
  if (dateEnd < dateStart) {
    return { error: "End date must be after the start date." };
  }

  await prisma.report.create({
    data: {
      name: REPORT_NAME_BY_TYPE[type] ?? `${type} Report`,
      type,
      description: `${type} report for the selected date range`,
      dateStart,
      dateEnd,
    },
  });

  revalidatePath("/reports");
  return { success: true };
}

export async function deleteReportAction(id: string): Promise<void> {
  await requireSession();
  await prisma.report.delete({ where: { id } }).catch(() => {});
  revalidatePath("/reports");
}

export async function toggleScheduledReportAction(id: string): Promise<void> {
  await requireSession();
  const report = await prisma.scheduledReport.findUnique({ where: { id } });
  if (!report) return;
  await prisma.scheduledReport.update({ where: { id }, data: { enabled: !report.enabled } });
  revalidatePath("/reports");
}
