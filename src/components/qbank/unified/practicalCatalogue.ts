import { useMemo } from 'react'
import { useLivePracticals } from '@/lib/useLivePracticals'
import type { RunnerTarget } from '@/components/practical/PracticalRunner'

/**
 * The practical bank as one flat list.
 *
 * `useLivePracticals` returns three lists shaped for three different pages.
 * A builder that draws across them, and a runner that has to turn an id back
 * into a `RunnerTarget`, both need them as one — and both need to agree on
 * which list an id came from, which is what the map below is for.
 */
export interface PracticalEntry extends RunnerTarget {
  /** Minutes the item is authored to take, where the format has a clock. */
  minutes?: number
}

export interface PracticalCatalogue {
  entries: PracticalEntry[]
  /** id → the target its runner is mounted with. */
  byId: Map<string, PracticalEntry>
}

export function usePracticalCatalogue(): PracticalCatalogue {
  const { osceStations, clinicalCases, labImaging } = useLivePracticals()

  return useMemo(() => {
    const entries: PracticalEntry[] = [
      ...osceStations.map((station) => ({
        kind: 'osce' as const, id: station.id, title: station.title, subjectId: station.subjectId, minutes: station.minutes,
      })),
      ...clinicalCases.map((item) => ({
        kind: 'case' as const, id: item.id, title: item.title, subjectId: item.subjectId, minutes: item.minutes,
      })),
      ...labImaging.map((set) => ({
        kind: 'lab' as const, id: set.id, title: set.title, subjectId: set.subjectId,
      })),
    ]
    return { entries, byId: new Map(entries.map((entry) => [entry.id, entry])) }
  }, [osceStations, clinicalCases, labImaging])
}
