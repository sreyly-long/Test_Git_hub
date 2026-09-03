import type { Settings } from "@prisma/client";
import { Card } from "@/components/dashboard/Card";
import { IconToggleOn, IconToggleOff } from "@/components/dashboard/icons";
import { togglePreferenceAction, type PreferenceKey } from "@/lib/actions/settings";

const preferenceLabels: { key: PreferenceKey; label: string }[] = [
  { key: "maintenanceMode", label: "Enable maintenance mode" },
  { key: "allowGuestRegistration", label: "Allow guest registration" },
  { key: "housekeepingNotifications", label: "Enable housekeeping notifications" },
  { key: "autoLogoutInactiveUsers", label: "Automatically log out inactive users" },
  { key: "showTutorialTips", label: "Show tutorial tips" },
];

export function SystemPreferencesCard({ settings }: { settings: Settings }) {
  return (
    <Card>
      <h2 className="mb-4 text-base font-semibold text-[#0b0b0b]">System Preferences</h2>

      <ul className="flex flex-col gap-4">
        {preferenceLabels.map(({ key, label }) => {
          const enabled = settings[key];
          return (
            <li key={key} className="flex items-center justify-between gap-3">
              <p className="text-sm text-[#52514e]">{label}</p>
              <form action={togglePreferenceAction.bind(null, key)}>
                <button
                  type="submit"
                  aria-label={enabled ? "Disable" : "Enable"}
                  className={enabled ? "text-[#2a78d6]" : "text-[#c3c2b7]"}
                >
                  {enabled ? <IconToggleOn className="h-5 w-9" /> : <IconToggleOff className="h-5 w-9" />}
                </button>
              </form>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
