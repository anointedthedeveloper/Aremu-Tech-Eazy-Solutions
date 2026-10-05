import { useCallback, useEffect, useState } from 'react'
import { api } from './api'

/** Loads JSON from an API path; `reload()` refetches. */
export function useFetch<T>(path: string | null) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(Boolean(path))
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (!path) return
    let alive = true
    api
      .get<T>(path)
      .then((d) => {
        if (!alive) return
        setData(d)
        setError('')
      })
      .catch((e: Error) => alive && setError(e.message))
      .finally(() => alive && setLoading(false))
    return () => {
      alive = false
    }
  }, [path, tick])

  const reload = useCallback(() => setTick((t) => t + 1), [])
  return { data, error, loading, reload }
}
