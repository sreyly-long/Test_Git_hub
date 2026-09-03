"use client";

import { useEffect, useRef, useState } from "react";
import { IconChat } from "./icons";

export function MessagesDropdown() {
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
        aria-label="Messages"
        onClick={() => setOpen((o) => !o)}
        className="flex h-10 w-10 items-center justify-center rounded-full text-[#52514e] hover:bg-black/5"
      >
        <IconChat className="h-5 w-5" />
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-72 rounded-2xl border border-[#e1e0d9] bg-white shadow-lg">
          <div className="border-b border-[#e1e0d9] px-4 py-3">
            <h3 className="text-sm font-semibold text-[#0b0b0b]">Messages</h3>
          </div>
          <div className="flex flex-col items-center gap-2 px-4 py-8 text-center">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2a78d6]/10 text-[#2a78d6]">
              <IconChat className="h-5 w-5" />
            </span>
            <p className="text-sm text-[#898781]">No messages yet.</p>
          </div>
        </div>
      )}
    </div>
  );
}
