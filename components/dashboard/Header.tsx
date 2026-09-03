import type { ReactNode } from "react";
import { IconSearch, IconChevronDown, IconChevronRight, IconLogout } from "./icons";
import { Avatar } from "./Avatar";
import { NotificationsBell } from "./NotificationsBell";
import { MessagesDropdown } from "./MessagesDropdown";
import { logoutAction } from "@/lib/actions/auth";

type Breadcrumb = {
  label: string;
  href?: string;
};

type HeaderProps = {
  title: string;
  searchPlaceholder?: string;
  searchAction?: string;
  q?: string;
  breadcrumbs?: Breadcrumb[];
  subtitle?: string;
  /** Replaces the search box with a custom control, e.g. a date-range picker. */
  rightControl?: ReactNode;
  userName: string;
  userRole: string;
};

export function Header({
  title,
  searchPlaceholder = "Search booking, room, etc",
  searchAction,
  q,
  breadcrumbs,
  subtitle,
  rightControl,
  userName,
  userRole,
}: HeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold text-[#0b0b0b]">{title}</h1>
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <nav className="mt-1 flex items-center gap-1.5 text-xs text-[#898781]">
            {breadcrumbs.map((crumb, i) => {
              const isLast = i === breadcrumbs.length - 1;
              return (
                <span key={crumb.label} className="flex items-center gap-1.5">
                  {i > 0 && <IconChevronRight className="h-3 w-3 text-[#c3c2b7]" />}
                  {crumb.href && !isLast ? (
                    <a href={crumb.href} className="hover:text-[#52514e]">
                      {crumb.label}
                    </a>
                  ) : (
                    <span className={isLast ? "text-[#52514e]" : ""}>{crumb.label}</span>
                  )}
                </span>
              );
            })}
          </nav>
        ) : subtitle ? (
          <p className="mt-1 text-sm text-[#898781]">{subtitle}</p>
        ) : null}
      </div>

      <div className="flex flex-1 items-center justify-end gap-4">
        {rightControl ? (
          rightControl
        ) : searchAction ? (
          <form action={searchAction} method="get" className="relative hidden max-w-sm flex-1 sm:block">
            <IconSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#898781]" />
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder={searchPlaceholder}
              className="w-full rounded-full border border-[#e1e0d9] bg-white py-2.5 pl-9 pr-4 text-sm text-[#0b0b0b] placeholder:text-[#898781] focus:outline-none focus:ring-2 focus:ring-[#2a78d6]/30"
            />
          </form>
        ) : (
          <label className="relative hidden max-w-sm flex-1 sm:block">
            <IconSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#898781]" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="w-full rounded-full border border-[#e1e0d9] bg-white py-2.5 pl-9 pr-4 text-sm text-[#0b0b0b] placeholder:text-[#898781] focus:outline-none focus:ring-2 focus:ring-[#2a78d6]/30"
            />
          </label>
        )}

        <MessagesDropdown />
        <NotificationsBell />

        <div className="flex items-center gap-2 border-l border-[#e1e0d9] pl-4">
          <Avatar name={userName} className="h-9 w-9" />
          <div className="hidden text-left leading-tight sm:block">
            <p className="text-sm font-medium text-[#0b0b0b]">{userName}</p>
            <p className="text-xs text-[#898781]">{userRole}</p>
          </div>
          <IconChevronDown className="hidden h-4 w-4 text-[#898781] sm:block" />
          <form action={logoutAction}>
            <button
              type="submit"
              aria-label="Log out"
              title="Log out"
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#898781] hover:bg-black/5 hover:text-[#d03b3b]"
            >
              <IconLogout className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
