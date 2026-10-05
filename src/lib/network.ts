import { useSyncExternalStore } from 'react'

interface NetworkInformation extends EventTarget {
  saveData?: boolean
  effectiveType?: 'slow-2g' | '2g' | '3g' | '4g'
}

const connection = (): NetworkInformation | undefined =>
  typeof navigator === 'undefined' ? undefined : (navigator as Navigator & { connection?: NetworkInformation }).connection

function subscribeConnection(cb: () => void) {
  const c = connection()
  c?.addEventListener('change', cb)
  return () => c?.removeEventListener('change', cb)
}

function isLite() {
  const c = connection()
  // Only an explicit Data Saver request or a very slow (2G) link — ordinary 3G/4G connections autoplay.
  return Boolean(c?.saveData) || c?.effectiveType === 'slow-2g' || c?.effectiveType === '2g'
}

/** True when the visitor has Data Saver on or is on a 2G link — don't autoplay video. */
export function useLiteMode() {
  return useSyncExternalStore(subscribeConnection, isLite, () => false)
}

/** Reactive CSS media query. */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(query)
      m.addEventListener('change', cb)
      return () => m.removeEventListener('change', cb)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}
