"use client";

import { useState } from "react";

/**
 * Closes a modal once a useActionState result transitions to success.
 * Uses the "adjust state during render" pattern instead of an effect,
 * since state identity changes exactly once per form submission.
 */
export function useAutoCloseOnSuccess<T extends { success?: boolean }>(
  state: T,
  setOpen: (open: boolean) => void,
) {
  const [handledState, setHandledState] = useState(state);
  if (state !== handledState) {
    setHandledState(state);
    if (state.success) setOpen(false);
  }
}
