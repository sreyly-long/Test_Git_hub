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
import type { settingsNavItems } from "./data";

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

export function SectionPlaceholder({ item }: { item: (typeof settingsNavItems)[number] }) {
  const Icon = iconByKey[item.icon];
  return (
    <Card className="flex flex-col items-center justify-center gap-3 py-16 text-center lg:col-span-2">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2a78d6]/10 text-[#2a78d6]">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <h2 className="text-base font-semibold text-[#0b0b0b]">{item.label}</h2>
        <p className="mt-1 max-w-sm text-sm text-[#898781]">
          This section isn&rsquo;t set up yet. Only General settings are configurable right now.
        </p>
      </div>
    </Card>
  );
}
