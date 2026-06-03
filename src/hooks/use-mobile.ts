import * as React from "react"

const MOBILE_BREAKPOINT = 768

function getSnapshot() {
  if (typeof window === "undefined") {
    return false
  }

  return window.innerWidth < MOBILE_BREAKPOINT
}

export function useIsMobile() {
  const subscribe = React.useCallback((onStoreChange: () => void) => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

    mql.addEventListener("change", onStoreChange)
    return () => mql.removeEventListener("change", onStoreChange)
  }, [])

  return React.useSyncExternalStore(subscribe, getSnapshot, () => false)
}
