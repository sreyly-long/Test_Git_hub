import type { ReactNode } from "react";
import { IconMoreVertical } from "./icons";

export function Card({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`rounded-2xl border border-black/[.06] bg-white p-5 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  action,
}: {
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-sm font-semibold text-[#0b0b0b]">{title}</h2>
      {action ?? (
        <button
          type="button"
          aria-label="More options"
          className="text-[#898781] hover:text-[#52514e]"
        >
          <IconMoreVertical className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

export function SeeAllLink() {
  return (
    <a href="#" className="text-xs font-medium text-[#2a78d6] hover:underline">
      See All
    </a>
  );
}
