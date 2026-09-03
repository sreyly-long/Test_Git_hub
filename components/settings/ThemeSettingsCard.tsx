import type { Settings } from "@prisma/client";
import { Card } from "@/components/dashboard/Card";
import { IconSun, IconMoon, IconMonitor } from "@/components/dashboard/icons";
import { updateSidebarThemeAction, updatePrimaryColorAction } from "@/lib/actions/settings";
import { primaryColors } from "./data";

const themeOptions = [
  { label: "Light", icon: IconSun },
  { label: "Dark", icon: IconMoon },
  { label: "System", icon: IconMonitor },
];

export function ThemeSettingsCard({ settings }: { settings: Settings }) {
  return (
    <Card>
      <h2 className="mb-5 text-base font-semibold text-[#0b0b0b]">Theme Settings</h2>

      <p className="mb-2 text-xs font-medium text-[#52514e]">Sidebar Theme</p>
      <div className="grid grid-cols-3 gap-2">
        {themeOptions.map(({ label, icon: Icon }) => {
          const isActive = label === settings.sidebarTheme;
          return (
            <form key={label} action={updateSidebarThemeAction.bind(null, label)}>
              <button
                type="submit"
                className={`flex w-full flex-col items-center gap-1.5 rounded-xl border px-3 py-3 text-xs font-medium transition-colors ${
                  isActive
                    ? "border-[#12172b] bg-[#12172b] text-white"
                    : "border-[#e1e0d9] bg-white text-[#52514e] hover:bg-black/[.02]"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            </form>
          );
        })}
      </div>

      <p className="mb-2 mt-6 text-xs font-medium text-[#52514e]">Primary Color</p>
      <div className="flex flex-wrap items-center gap-3">
        {primaryColors.map((color) => {
          const isActive = color.name === settings.primaryColor;
          return (
            <form key={color.name} action={updatePrimaryColorAction.bind(null, color.name)}>
              <button
                type="submit"
                aria-label={color.name}
                className={`h-8 w-8 rounded-full ${isActive ? "ring-2 ring-offset-2 ring-[#0b0b0b]/70" : ""}`}
                style={{ backgroundColor: color.hex }}
              />
            </form>
          );
        })}
      </div>
    </Card>
  );
}
