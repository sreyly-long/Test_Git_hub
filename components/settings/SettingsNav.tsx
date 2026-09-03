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

export function SettingsNav() {
  return (
    <Card className="p-2">
      <nav className="flex flex-col gap-0.5">
        {settingsNavItems.map(({ label, icon, active }) => {
          const Icon = iconByKey[icon];
          return (
            <a
              key={label}
              href="#"
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                active
                  ? "bg-[#2a78d6]/10 font-medium text-[#2a78d6]"
                  : "text-[#52514e] hover:bg-black/[.03]"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </a>
          );
        })}
      </nav>
    </Card>
  );
}
