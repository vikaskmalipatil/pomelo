"use client";

import { useCallback, useSyncExternalStore } from "react";
import { readViolationCount } from "@/lib/attempt-integrity";

// persistViolationCount fires the custom event in this tab; `storage` covers other tabs.
const subscribe = (onChange: () => void) => {
  window.addEventListener("pomelo-violation-update", onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener("pomelo-violation-update", onChange);
    window.removeEventListener("storage", onChange);
  };
};
const serverSnapshot = () => 0;

/** The stored violation count for a test; 0 when testId is null or on the server. */
export function useViolationCount(testId: string | null) {
  const read = useCallback(() => (testId ? readViolationCount(testId) : 0), [testId]);
  return useSyncExternalStore(subscribe, read, serverSnapshot);
}
