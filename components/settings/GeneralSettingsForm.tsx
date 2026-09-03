"use client";

import { useActionState } from "react";
import type { Settings } from "@prisma/client";
import { Card } from "@/components/dashboard/Card";
import { IconChevronDown } from "@/components/dashboard/icons";
import { updateGeneralSettingsAction } from "@/lib/actions/settings";
import type { ActionState } from "@/lib/actions/rooms";

const initialState: ActionState = {};

const inputClasses =
  "w-full rounded-xl border border-[#e1e0d9] bg-white px-3.5 py-2.5 text-sm text-[#0b0b0b] placeholder:text-[#898781] focus:outline-none focus:ring-2 focus:ring-[#2a78d6]/30";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-[#52514e]">{label}</label>
      {children}
    </div>
  );
}

function Select({ name, defaultValue, options }: { name: string; defaultValue: string; options: string[] }) {
  return (
    <div className="relative">
      <select name={name} defaultValue={defaultValue} className={`${inputClasses} appearance-none pr-9`}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <IconChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#898781]" />
    </div>
  );
}

const CURRENCIES = ["USD - US Dollar", "EUR - Euro", "GBP - British Pound", "KRW - Korean Won", "KHR - Cambodian Riel"];
const TIME_ZONES = [
  "(UTC-08:00) Pacific Time (US & Canada)",
  "(UTC-05:00) Eastern Time (US & Canada)",
  "(UTC+00:00) London",
  "(UTC+07:00) Bangkok, Phnom Penh",
  "(UTC+09:00) Seoul, Tokyo",
];
const DATE_FORMATS = ["MMM DD, YYYY", "DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"];
const TIME_FORMATS = ["12 Hours (hh:mm A)", "24 Hours (HH:mm)"];

export function GeneralSettingsForm({ settings }: { settings: Settings }) {
  const [state, formAction, pending] = useActionState(updateGeneralSettingsAction, initialState);

  return (
    <Card>
      <h2 className="mb-5 text-base font-semibold text-[#0b0b0b]">General Settings</h2>

      <form action={formAction}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Hotel Name">
            <input name="hotelName" type="text" required defaultValue={settings.hotelName} className={inputClasses} />
          </Field>
          <Field label="Hotel Email">
            <input name="hotelEmail" type="email" required defaultValue={settings.hotelEmail} className={inputClasses} />
          </Field>
          <Field label="Phone Number">
            <input name="phone" type="text" defaultValue={settings.phone} className={inputClasses} />
          </Field>
          <Field label="Website">
            <input name="website" type="text" defaultValue={settings.website} className={inputClasses} />
          </Field>

          <div className="sm:col-span-2">
            <Field label="Address">
              <textarea name="address" rows={2} defaultValue={settings.address} className={`${inputClasses} resize-none`} />
            </Field>
          </div>

          <Field label="Currency">
            <Select name="currency" defaultValue={settings.currency} options={CURRENCIES} />
          </Field>
          <Field label="Time Zone">
            <Select name="timeZone" defaultValue={settings.timeZone} options={TIME_ZONES} />
          </Field>
          <Field label="Date Format">
            <Select name="dateFormat" defaultValue={settings.dateFormat} options={DATE_FORMATS} />
          </Field>
          <Field label="Time Format">
            <Select name="timeFormat" defaultValue={settings.timeFormat} options={TIME_FORMATS} />
          </Field>
        </div>

        {state.error && (
          <p className="mt-4 rounded-lg bg-[#d03b3b]/10 px-3 py-2 text-sm text-[#d03b3b]">{state.error}</p>
        )}
        {state.success && (
          <p className="mt-4 rounded-lg bg-[#0ca30c]/10 px-3 py-2 text-sm text-[#006300]">Settings saved.</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="mt-6 rounded-xl bg-[#2a78d6] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1c5cab] disabled:opacity-70"
        >
          {pending ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </Card>
  );
}
