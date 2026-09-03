"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IconCalendarCheck, IconChevronDown } from "@/components/dashboard/icons";
import { RANGE_OPTIONS, DEFAULT_RANGE, type RangeKey } from "./ranges";

export function RangePicker() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const current = (searchParams.get("range") as RangeKey) ?? DEFAULT_RANGE;
  const currentLabel = RANGE_OPTIONS.find((o) => o.value === current)?.label ?? RANGE_OPTIONS[0].label;

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

  function select(value: RangeKey) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === DEFAULT_RANGE) params.delete("range");
    else params.set("range", value);
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
    setOpen(false);
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-xl border border-[#e1e0d9] bg-white px-3.5 py-2.5 text-sm text-[#52514e] hover:bg-black/[.02]"
      >
        <IconCalendarCheck className="h-4 w-4 text-[#898781]" />
        {currentLabel}
        <IconChevronDown className="h-3.5 w-3.5 text-[#898781]" />
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-48 rounded-xl border border-[#e1e0d9] bg-white p-1.5 shadow-lg">
          {RANGE_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => select(option.value)}
              className={`block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-black/[.03] ${
                current === option.value ? "font-medium text-[#2a78d6]" : "text-[#52514e]"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
