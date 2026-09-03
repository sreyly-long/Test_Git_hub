"use client";

import { useTransition } from "react";
import { IconTrash } from "./icons";

export function DeleteButton({
  action,
  confirmMessage = "Are you sure you want to delete this? This cannot be undone.",
  label = "Delete",
}: {
  action: () => Promise<void>;
  confirmMessage?: string;
  label?: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      aria-label={label}
      disabled={pending}
      onClick={() => {
        if (window.confirm(confirmMessage)) {
          startTransition(() => {
            action();
          });
        }
      }}
      className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e1e0d9] text-[#52514e] hover:border-[#d03b3b]/40 hover:bg-[#d03b3b]/5 hover:text-[#d03b3b] disabled:opacity-50"
    >
      <IconTrash className="h-4 w-4" />
    </button>
  );
}
