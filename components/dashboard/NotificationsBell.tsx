"use client";

import { useEffect, useRef, useState } from "react";
import {
  getNotificationsAction,
  markAllNotificationsReadAction,
  markNotificationReadAction,
  type NotificationDto,
} from "@/lib/actions/notifications";
import { timeAgo } from "@/lib/time-ago";
import { IconBell, IconUserPlus, IconCalendarPlus, IconDollar } from "./icons";

const iconByKind = {
  user: { Icon: IconUserPlus, bg: "bg-[#2a78d6]/10", fg: "text-[#2a78d6]" },
  booking: { Icon: IconCalendarPlus, bg: "bg-[#eda100]/10", fg: "text-[#eda100]" },
  payment: { Icon: IconDollar, bg: "bg-[#0ca30c]/10", fg: "text-[#0ca30c]" },
} as const;

export function NotificationsBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationDto[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    getNotificationsAction().then((data) => {
      if (!cancelled) {
        setNotifications(data.notifications);
        setUnreadCount(data.unreadCount);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    getNotificationsAction().then((data) => {
      if (!cancelled) {
        setNotifications(data.notifications);
        setUnreadCount(data.unreadCount);
        setLoading(false);
      }
    });
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      cancelled = true;
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [open]);

  function toggleOpen() {
    setOpen((wasOpen) => {
      if (!wasOpen) setLoading(true);
      return !wasOpen;
    });
  }

  async function handleItemClick(notification: NotificationDto) {
    if (notification.read) return;
    setNotifications((prev) => prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n)));
    setUnreadCount((prev) => Math.max(0, prev - 1));
    await markNotificationReadAction(notification.id);
  }

  async function handleMarkAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
    await markAllNotificationsReadAction();
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        aria-label="Notifications"
        onClick={toggleOpen}
        className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#52514e] hover:bg-black/5"
      >
        <IconBell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#e34948] px-1 text-[10px] font-semibold text-white ring-2 ring-[#f9f9f7]">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-80 rounded-2xl border border-[#e1e0d9] bg-white shadow-lg">
          <div className="flex items-center justify-between border-b border-[#e1e0d9] px-4 py-3">
            <h3 className="text-sm font-semibold text-[#0b0b0b]">Notifications</h3>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="text-xs font-medium text-[#2a78d6] hover:underline"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {loading && notifications.length === 0 && (
              <p className="px-4 py-6 text-center text-sm text-[#898781]">Loading...</p>
            )}
            {!loading && notifications.length === 0 && (
              <p className="px-4 py-6 text-center text-sm text-[#898781]">No notifications yet.</p>
            )}
            {notifications.map((notification) => {
              const { Icon, bg, fg } = iconByKind[notification.kind as keyof typeof iconByKind] ?? iconByKind.user;
              return (
                <button
                  key={notification.id}
                  type="button"
                  onClick={() => handleItemClick(notification)}
                  className={`flex w-full items-start gap-3 border-b border-[#e1e0d9] px-4 py-3 text-left last:border-b-0 hover:bg-black/[.02] ${
                    notification.read ? "" : "bg-[#2a78d6]/5"
                  }`}
                >
                  <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${bg} ${fg}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-[#0b0b0b]">{notification.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-[#898781]">{notification.detail}</p>
                    <p className="mt-1 text-[11px] text-[#c3c2b7]">{timeAgo(notification.createdAt)}</p>
                  </div>
                  {!notification.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#2a78d6]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
