import {
  IconGrid,
  IconCalendarCheck,
  IconBed,
  IconUsers,
  IconBarChart,
  IconFileText,
  IconStar,
  IconReceipt,
  IconSettings,
  IconLifeBuoy,
} from "./icons";

const navItems = [
  { label: "Dashboard", icon: IconGrid, href: "/dashboard" },
  { label: "Reservation", icon: IconCalendarCheck, href: "/reservation" },
  { label: "Rooms", icon: IconBed, href: "/rooms" },
  { label: "Staffs", icon: IconUsers, href: "/staffs" },
  { label: "Analytics", icon: IconBarChart, href: "/analytics" },
  { label: "Reports", icon: IconFileText, href: "/reports" },
  { label: "Reviews", icon: IconStar, href: "/reviews" },
  { label: "Invoices", icon: IconReceipt, href: "/invoices" },
  { label: "Settings", icon: IconSettings, href: "/settings" },
];

export function Sidebar({ active = "Dashboard" }: { active?: string }) {
  return (
    <aside className="hidden w-64 shrink-0 flex-col bg-[#12172b] px-4 py-6 lg:flex">
      <div className="flex items-center gap-2 px-2 pb-8">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2a78d6]">
          <span className="h-3 w-3 rounded-sm bg-white" />
        </span>
        <span className="text-lg font-semibold text-white">Hostay</span>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map(({ label, icon: Icon, href }) => {
          const isActive = label === active;
          return (
            <a
              key={label}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                isActive
                  ? "bg-white text-[#12172b] font-medium"
                  : "text-zinc-400 hover:bg-white/5 hover:text-zinc-100"
              }`}
            >
              <Icon className={`h-[18px] w-[18px] ${isActive ? "text-[#2a78d6]" : ""}`} />
              {label}
            </a>
          );
        })}
      </nav>

      <a
        href="#"
        className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-zinc-300 hover:bg-white/10"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2a78d6]/20 text-[#5598e7]">
          <IconLifeBuoy className="h-4 w-4" />
        </span>
        <span>
          <span className="block font-medium text-white">Need Help?</span>
          <span className="block text-xs text-zinc-400">Visit our help center</span>
        </span>
      </a>
    </aside>
  );
}
