import Link from "next/link";
import { Card } from "@/components/dashboard/Card";
import {
  IconSettings,
  IconBuilding,
  IconGlobe,
  IconBed,
  IconTag,
  IconCreditCard,
  IconBell,
  IconUsers,
  IconShieldLock,
  IconPlug,
  IconArchive,
} from "@/components/dashboard/icons";
import { settingsNavItems } from "./data";

const iconByKey = {
  settings: IconSettings,
  building: IconBuilding,
  globe: IconGlobe,
  bed: IconBed,
  tag: IconTag,
  creditCard: IconCreditCard,
  bell: IconBell,
  users: IconUsers,
  shield: IconShieldLock,
  plug: IconPlug,
  archive: IconArchive,
} as const;

export function SettingsNav({ activeSlug, q }: { activeSlug: string; q?: string }) {
  const items = q
    ? settingsNavItems.filter((item) => item.label.toLowerCase().includes(q.toLowerCase()))
    : settingsNavItems;

  return (
    <Card className="p-2">
      <nav className="flex flex-col gap-0.5">
        {items.length === 0 ? (
          <p className="px-3 py-2.5 text-sm text-[#898781]">No settings match &ldquo;{q}&rdquo;.</p>
        ) : (
          items.map(({ slug, label, icon }) => {
            const Icon = iconByKey[icon];
            const isActive = slug === activeSlug;
            return (
              <Link
                key={slug}
                href={`/settings?section=${slug}`}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  isActive
                    ? "bg-[#2a78d6]/10 font-medium text-[#2a78d6]"
                    : "text-[#52514e] hover:bg-black/[.03]"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })
        )}
      </nav>
    </Card>
  );
}
