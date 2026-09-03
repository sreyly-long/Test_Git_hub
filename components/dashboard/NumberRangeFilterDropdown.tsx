"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IconChevronDown, IconFilter } from "./icons";

export function NumberRangeFilterDropdown({
  minParam,
  maxParam,
  label,
  title,
  minLabel,
  maxLabel,
  prefix = "",
}: {
  minParam: string;
  maxParam: string;
  label: string;
  title: string;
  minLabel: string;
  maxLabel: string;
  prefix?: string;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentMin = searchParams.get(minParam) ?? "";
  const currentMax = searchParams.get(maxParam) ?? "";
  const active = Boolean(currentMin || currentMax);

  const [draftMin, setDraftMin] = useState(currentMin);
  const [draftMax, setDraftMax] = useState(currentMax);

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
        setDraftMin(currentMin);
        setDraftMax(currentMax);
      }
      return !wasOpen;
    });
  }

  function apply() {
    const params = new URLSearchParams(searchParams.toString());
    if (draftMin) params.set(minParam, draftMin);
    else params.delete(minParam);
    if (draftMax) params.set(maxParam, draftMax);
    else params.delete(maxParam);
    params.delete("page");
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
    setOpen(false);
  }

  function clear() {
    setDraftMin("");
    setDraftMax("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete(minParam);
    params.delete(maxParam);
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
        {active ? `${label} (1)` : label}
        <IconChevronDown className="h-3.5 w-3.5 text-[#898781]" />
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-64 rounded-xl border border-[#e1e0d9] bg-white p-4 shadow-lg">
          <p className="mb-3 text-xs font-medium text-[#52514e]">{title}</p>
          <div className="flex flex-col gap-3">
            <div>
              <label className="mb-1 block text-[11px] text-[#898781]">{minLabel}</label>
              <div className="relative">
                {prefix && (
                  <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-[#898781]">
                    {prefix}
                  </span>
                )}
                <input
                  type="number"
                  min={0}
                  value={draftMin}
                  onChange={(e) => setDraftMin(e.target.value)}
                  className={`w-full rounded-lg border border-[#e1e0d9] py-1.5 text-sm text-[#0b0b0b] focus:outline-none focus:ring-2 focus:ring-[#2a78d6]/30 ${prefix ? "pl-6 pr-2.5" : "px-2.5"}`}
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-[11px] text-[#898781]">{maxLabel}</label>
              <div className="relative">
                {prefix && (
                  <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-[#898781]">
                    {prefix}
                  </span>
                )}
                <input
                  type="number"
                  min={0}
                  value={draftMax}
                  onChange={(e) => setDraftMax(e.target.value)}
                  className={`w-full rounded-lg border border-[#e1e0d9] py-1.5 text-sm text-[#0b0b0b] focus:outline-none focus:ring-2 focus:ring-[#2a78d6]/30 ${prefix ? "pl-6 pr-2.5" : "px-2.5"}`}
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-2">
            <button type="button" onClick={clear} className="text-xs font-medium text-[#898781] hover:text-[#52514e]">
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
