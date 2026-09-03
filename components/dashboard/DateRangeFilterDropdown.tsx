"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IconChevronDown, IconFilter } from "./icons";

export function DateRangeFilterDropdown({
  fromParam,
  toParam,
  label,
  fromLabel,
  toLabel,
}: {
  fromParam: string;
  toParam: string;
  label: string;
  fromLabel: string;
  toLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentFrom = searchParams.get(fromParam) ?? "";
  const currentTo = searchParams.get(toParam) ?? "";
  const active = Boolean(currentFrom || currentTo);

  const [draftFrom, setDraftFrom] = useState(currentFrom);
  const [draftTo, setDraftTo] = useState(currentTo);

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  function toggleOpen() {
    setOpen((wasOpen) => {
      if (!wasOpen) {
        setDraftFrom(currentFrom);
        setDraftTo(currentTo);
      }
      return !wasOpen;
    });
  }

  function apply() {
    const params = new URLSearchParams(searchParams.toString());
    if (draftFrom) params.set(fromParam, draftFrom);
    else params.delete(fromParam);
    if (draftTo) params.set(toParam, draftTo);
    else params.delete(toParam);
    params.delete("page");
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
    setOpen(false);
  }

  function clear() {
    setDraftFrom("");
    setDraftTo("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete(fromParam);
    params.delete(toParam);
    params.delete("page");
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
    setOpen(false);
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={toggleOpen}
        className={`flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-sm hover:bg-black/[.02] ${
          active ? "border-[#2a78d6]/40 bg-[#2a78d6]/5 text-[#184f95]" : "border-[#e1e0d9] bg-white text-[#52514e]"
        }`}
      >
        <IconFilter className="h-4 w-4 text-[#898781]" />
        {active ? "Filters (1)" : label}
        <IconChevronDown className="h-3.5 w-3.5 text-[#898781]" />
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-64 rounded-xl border border-[#e1e0d9] bg-white p-4 shadow-lg">
          <p className="mb-3 text-xs font-medium text-[#52514e]">Check-in date range</p>
          <div className="flex flex-col gap-3">
            <div>
              <label className="mb-1 block text-[11px] text-[#898781]">{fromLabel}</label>
              <input
                type="date"
                value={draftFrom}
                onChange={(e) => setDraftFrom(e.target.value)}
                className="w-full rounded-lg border border-[#e1e0d9] px-2.5 py-1.5 text-sm text-[#0b0b0b] focus:outline-none focus:ring-2 focus:ring-[#2a78d6]/30"
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] text-[#898781]">{toLabel}</label>
              <input
                type="date"
                value={draftTo}
                onChange={(e) => setDraftTo(e.target.value)}
                className="w-full rounded-lg border border-[#e1e0d9] px-2.5 py-1.5 text-sm text-[#0b0b0b] focus:outline-none focus:ring-2 focus:ring-[#2a78d6]/30"
              />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={clear}
              className="text-xs font-medium text-[#898781] hover:text-[#52514e]"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={apply}
              className="rounded-lg bg-[#2a78d6] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#1c5cab]"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
