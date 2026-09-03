"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSession, requireSession } from "@/lib/session";

export type NotificationKind = "user" | "booking" | "payment";

/** Internal helper used by other server actions to raise a notification for the given user. */
export async function notifyUser(userId: string, kind: NotificationKind, title: string, detail: string) {
  await prisma.notification.create({ data: { userId, kind, title, detail } });
}

export type NotificationDto = {
  id: string;
  kind: string;
  title: string;
  detail: string;
  read: boolean;
  createdAt: string;
};

export async function getNotificationsAction(): Promise<{ notifications: NotificationDto[]; unreadCount: number }> {
  const session = await getSession();
  if (!session) return { notifications: [], unreadCount: 0 };

  const [notifications, unreadCount] = await Promise.all([
    prisma.notification.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
    prisma.notification.count({ where: { userId: session.user.id, read: false } }),
  ]);

  return {
    notifications: notifications.map((n) => ({
      id: n.id,
      kind: n.kind,
      title: n.title,
      detail: n.detail,
      read: n.read,
      createdAt: n.createdAt.toISOString(),
    })),
    unreadCount,
  };
}

export async function markNotificationReadAction(id: string): Promise<void> {
  const session = await requireSession();
  await prisma.notification
    .updateMany({ where: { id, userId: session.user.id }, data: { read: true } })
    .catch(() => {});
  revalidatePath("/", "layout");
}

export async function markAllNotificationsReadAction(): Promise<void> {
  const session = await requireSession();
  await prisma.notification.updateMany({ where: { userId: session.user.id, read: false }, data: { read: true } });
  revalidatePath("/", "layout");
}
