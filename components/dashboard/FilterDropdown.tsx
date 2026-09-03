"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IconChevronDown } from "./icons";

export type FilterOption = { value: string; label: string };

export function FilterDropdown({
  paramName,
  allLabel,
  options,
  icon: Icon,
}: {
  paramName: string;
  allLabel: string;
  options: FilterOption[];
  icon?: (props: { className?: string }) => React.ReactElement;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const current = searchParams.get(paramName) ?? "";
  const currentLabel = options.find((o) => o.value === current)?.label ?? allLabel;

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

  function select(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(paramName, value);
    } else {
      params.delete(paramName);
    }
    params.delete("page");
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
    setOpen(false);
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-sm hover:bg-black/[.02] ${
          current ? "border-[#2a78d6]/40 bg-[#2a78d6]/5 text-[#184f95]" : "border-[#e1e0d9] bg-white text-[#52514e]"
        }`}
      >
        {Icon && <Icon className="h-4 w-4 text-[#898781]" />}
        {currentLabel}
        <IconChevronDown className="h-3.5 w-3.5 text-[#898781]" />
      </button>

      {open && (
        <div className="absolute left-0 z-20 mt-2 w-52 rounded-xl border border-[#e1e0d9] bg-white p-1.5 shadow-lg">
          <button
            type="button"
            onClick={() => select("")}
            className={`block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-black/[.03] ${
              !current ? "font-medium text-[#2a78d6]" : "text-[#52514e]"
            }`}
          >
            {allLabel}
          </button>
          {options.map((option) => (
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
