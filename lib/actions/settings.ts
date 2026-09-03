"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import type { ActionState } from "./rooms";

const PREFERENCE_KEYS = [
  "maintenanceMode",
  "allowGuestRegistration",
  "housekeepingNotifications",
  "autoLogoutInactiveUsers",
  "showTutorialTips",
] as const;

export type PreferenceKey = (typeof PREFERENCE_KEYS)[number];

async function getSettings() {
  return prisma.settings.upsert({
    where: { id: "singleton" },
    update: {},
    create: { id: "singleton" },
  });
}

export async function updateGeneralSettingsAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  await requireSession();

  const hotelName = String(formData.get("hotelName") ?? "").trim();
  const hotelEmail = String(formData.get("hotelEmail") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const website = String(formData.get("website") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim();
  const currency = String(formData.get("currency") ?? "").trim();
  const timeZone = String(formData.get("timeZone") ?? "").trim();
  const dateFormat = String(formData.get("dateFormat") ?? "").trim();
  const timeFormat = String(formData.get("timeFormat") ?? "").trim();

  if (!hotelName || !hotelEmail) {
    return { error: "Hotel name and email are required." };
  }

  await getSettings();
  await prisma.settings.update({
    where: { id: "singleton" },
    data: { hotelName, hotelEmail, phone, website, address, currency, timeZone, dateFormat, timeFormat },
  });

  revalidatePath("/settings");
  return { success: true };
}

export async function updateSidebarThemeAction(sidebarTheme: string): Promise<void> {
  await requireSession();
  await getSettings();
  await prisma.settings.update({ where: { id: "singleton" }, data: { sidebarTheme } });
  revalidatePath("/settings");
}

export async function updatePrimaryColorAction(primaryColor: string): Promise<void> {
  await requireSession();
  await getSettings();
  await prisma.settings.update({ where: { id: "singleton" }, data: { primaryColor } });
  revalidatePath("/settings");
}

export async function togglePreferenceAction(key: PreferenceKey): Promise<void> {
  await requireSession();
  if (!PREFERENCE_KEYS.includes(key)) return;

  const settings = await getSettings();
  const next = !settings[key];

  switch (key) {
    case "maintenanceMode":
      await prisma.settings.update({ where: { id: "singleton" }, data: { maintenanceMode: next } });
      break;
    case "allowGuestRegistration":
      await prisma.settings.update({ where: { id: "singleton" }, data: { allowGuestRegistration: next } });
      break;
    case "housekeepingNotifications":
      await prisma.settings.update({ where: { id: "singleton" }, data: { housekeepingNotifications: next } });
      break;
    case "autoLogoutInactiveUsers":
      await prisma.settings.update({ where: { id: "singleton" }, data: { autoLogoutInactiveUsers: next } });
      break;
    case "showTutorialTips":
      await prisma.settings.update({ where: { id: "singleton" }, data: { showTutorialTips: next } });
      break;
  }

  revalidatePath("/settings");
}
