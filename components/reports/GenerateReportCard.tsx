"use client";

import { useActionState } from "react";
import { Card } from "@/components/dashboard/Card";
import { generateReportAction } from "@/lib/actions/reports";
import type { ActionState } from "@/lib/actions/rooms";
import { REPORT_TYPES } from "@/lib/constants";

const initialState: ActionState = {};

const inputClasses =
  "w-full rounded-xl border border-[#e1e0d9] bg-white px-3.5 py-2.5 text-sm text-[#0b0b0b] focus:outline-none focus:ring-2 focus:ring-[#2a78d6]/30";

function toInputDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function GenerateReportCard() {
  const [state, formAction, pending] = useActionState(generateReportAction, initialState);

  const today = new Date();
  const monthAgo = new Date();
  monthAgo.setDate(monthAgo.getDate() - 30);

  return (
    <Card>
      <h2 className="mb-4 text-sm font-semibold text-[#0b0b0b]">Generate New Report</h2>

      <form action={formAction} className="flex flex-col gap-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-[#52514e]">Report Type</label>
          <select name="type" required defaultValue="" className={inputClasses}>
            <option value="" disabled>
              Select report type
            </option>
            {REPORT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#52514e]">Start Date</label>
            <input name="dateStart" type="date" required defaultValue={toInputDate(monthAgo)} className={inputClasses} />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#52514e]">End Date</label>
            <input name="dateEnd" type="date" required defaultValue={toInputDate(today)} className={inputClasses} />
          </div>
        </div>

        {state.error && (
          <p className="rounded-lg bg-[#d03b3b]/10 px-3 py-2 text-sm text-[#d03b3b]">{state.error}</p>
        )}
        {state.success && (
          <p className="rounded-lg bg-[#0ca30c]/10 px-3 py-2 text-sm text-[#006300]">Report generated.</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="mt-1 w-full rounded-xl bg-[#2a78d6] py-2.5 text-sm font-semibold text-white hover:bg-[#1c5cab] disabled:opacity-70"
        >
          {pending ? "Generating..." : "Generate Report"}
        </button>
      </form>
    </Card>
  );
}
