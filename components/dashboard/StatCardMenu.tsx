"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { IconMoreVertical, IconEye, IconDownload } from "./icons";

export function StatCardMenu({ viewHref, exportHref }: { viewHref: string; exportHref: string }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        aria-label="More options"
        onClick={() => setOpen((o) => !o)}
        className="text-[#898781] hover:text-[#52514e]"
      >
        <IconMoreVertical className="h-4 w-4" />
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-44 rounded-xl border border-[#e1e0d9] bg-white p-1.5 shadow-lg">
          <Link
            href={viewHref}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#52514e] hover:bg-black/[.03]"
          >
            <IconEye className="h-4 w-4 text-[#898781]" />
            View in table
          </Link>
          <a
            href={exportHref}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#52514e] hover:bg-black/[.03]"
          >
            <IconDownload className="h-4 w-4 text-[#898781]" />
            Export as Excel
          </a>
        </div>
      )}
    </div>
  );
}
