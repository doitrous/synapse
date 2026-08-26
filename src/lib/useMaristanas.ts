import { useCallback, useEffect, useState } from 'react'
import { API_MODE, apiGet, apiSend } from './api'
import { DEMO_MARISTANA_OVERVIEW, type MaristanaOverview } from '@/data/maristanas'

export const MARISTANA_PROGRESS_EVENT = 'synapse:maristana-progress'

export function useMaristanas() {
  const [data, setData] = useState<MaristanaOverview | null>(API_MODE ? null : DEMO_MARISTANA_OVERVIEW)
  const [loading, setLoading] = useState(API_MODE)
  const [error, setError] = useState(false)

  const refresh = useCallback(() => {
    if (!API_MODE) {
      setData(DEMO_MARISTANA_OVERVIEW)
      setLoading(false)
      return Promise.resolve()
    }
    setLoading(true)
    setError(false)
    return apiGet<MaristanaOverview>('/maristanas')
      .then(setData)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { void refresh() }, [refresh])

  useEffect(() => {
    const update = () => { void refresh() }
    window.addEventListener(MARISTANA_PROGRESS_EVENT, update)
    return () => window.removeEventListener(MARISTANA_PROGRESS_EVENT, update)
  }, [refresh])

  const rename = useCallback(async (slot: number, name: string) => {
    if (!API_MODE) {
      setData((current) => current ? {
        ...current,
        hospitals: current.hospitals.map((hospital) => hospital.slot === slot ? { ...hospital, name } : hospital),
      } : current)
      return
    }
    await apiSend(`/maristanas/${slot}`, 'PATCH', { name })
    await refresh()
  }, [refresh])

  return { data, loading, error, refresh, rename }
}
