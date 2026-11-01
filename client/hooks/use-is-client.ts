"use client";

import { useSyncExternalStore } from "react";

/** For useSyncExternalStore values that never change after mount. */
export const noopSubscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export function useIsClient() {
  return useSyncExternalStore(noopSubscribe, clientSnapshot, serverSnapshot);
}
