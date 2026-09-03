import { IconSearch, IconBell, IconChat, IconChevronDown, IconChevronRight, IconCalendarCheck, IconLogout } from "./icons";
import { Avatar } from "./Avatar";
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
  notificationCount?: number;
  breadcrumbs?: Breadcrumb[];
  subtitle?: string;
  dateRangeLabel?: string;
  userName: string;
  userRole: string;
};

export function Header({
  title,
  searchPlaceholder = "Search booking, room, etc",
  searchAction,
  q,
  notificationCount,
  breadcrumbs,
  subtitle,
  dateRangeLabel,
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
        {dateRangeLabel ? (
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl border border-[#e1e0d9] bg-white px-3.5 py-2.5 text-sm text-[#52514e] hover:bg-black/[.02]"
          >
            <IconCalendarCheck className="h-4 w-4 text-[#898781]" />
            {dateRangeLabel}
            <IconChevronDown className="h-3.5 w-3.5 text-[#898781]" />
          </button>
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

        <button
          type="button"
          aria-label="Messages"
          className="flex h-10 w-10 items-center justify-center rounded-full text-[#52514e] hover:bg-black/5"
        >
          <IconChat className="h-5 w-5" />
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#52514e] hover:bg-black/5"
        >
          <IconBell className="h-5 w-5" />
          {notificationCount ? (
            <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#e34948] px-1 text-[10px] font-semibold text-white ring-2 ring-[#f9f9f7]">
              {notificationCount}
            </span>
          ) : (
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[#e34948] ring-2 ring-[#f9f9f7]" />
          )}
        </button>

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
