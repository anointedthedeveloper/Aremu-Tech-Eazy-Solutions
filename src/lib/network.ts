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
  return Boolean(c?.saveData) || c?.effectiveType === 'slow-2g' || c?.effectiveType === '2g' || c?.effectiveType === '3g'
}

/** True when the visitor has Data Saver on or is on a slow connection — don't autoplay or preload video. */
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
