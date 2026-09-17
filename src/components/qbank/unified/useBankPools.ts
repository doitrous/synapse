import { useMemo } from 'react'
import type { EssayQuestion } from '@/data/essay'
import { usePracticalCatalogue, type PracticalEntry } from './practicalCatalogue'
import { useLiveEssays } from '@/lib/useLiveEssays'
import { useItemFlags } from '@/lib/useItemFlags'
import { usePracticalProgress } from '@/lib/usePracticalProgress'
import { useEssayAnswers } from '@/lib/useEssayAnswers'
import { useAttemptHistory } from '@/lib/useAttemptLog'
import { missedPracticalIds } from '@/data/practicalCollections'
import { missedEssayIds } from '@/data/essayCollections'

/**
 * The three pools a bank can be drawn from: everything, what was flagged, what
 * was missed.
 *
 * "Flagged & missed" used to be a tab of its own, which meant a student could
 * see the list but could not narrow it — no "flagged cardiology stations", no
 * "five of the ones I missed". Making it the first step of the composer instead
 * puts those lists on the same footing as the whole bank: pick the pool, then
 * apply the same systems and length controls on top of it.
 *
 * Both banks are read the same way, from one place, so the practical composer
 * and the mixed composer can never disagree about what is flagged.
 */
export interface BankPools<T> {
  all: T[]
  flagged: T[]
  missed: T[]
}

export function usePracticalPools(): BankPools<PracticalEntry> {
  const catalogue = usePracticalCatalogue()
  const { flags } = useItemFlags()
  const { progress } = usePracticalProgress()
  const history = useAttemptHistory()

  return useMemo(() => {
    const flagged = Object.keys(flags.practical ?? {})
      .map((id) => catalogue.byId.get(id))
      .filter((entry): entry is PracticalEntry => Boolean(entry))
    const missed = missedPracticalIds(progress, catalogue.entries, history.records)
      .map((id) => catalogue.byId.get(id))
      .filter((entry): entry is PracticalEntry => Boolean(entry))
    return { all: catalogue.entries, flagged, missed }
  }, [catalogue, flags, progress, history.records])
}

export function useEssayPools(): BankPools<EssayQuestion> {
  const { items: essays } = useLiveEssays()
  const { flags } = useItemFlags()
  const { answers } = useEssayAnswers()

  return useMemo(() => {
    const byId = new Map(essays.map((essay) => [essay.id, essay]))
    const flagged = Object.keys(flags.essay ?? {})
      .map((id) => byId.get(id))
      .filter((essay): essay is EssayQuestion => Boolean(essay))
    const missed = missedEssayIds(answers, essays)
      .map((id) => byId.get(id))
      .filter((essay): essay is EssayQuestion => Boolean(essay))
    return { all: essays, flagged, missed }
  }, [essays, flags, answers])
}

/** Flagged and missed as one list, each item once — the "come back to this" pool. */
export function unionPool<T extends { id: string }>(pools: BankPools<T>): T[] {
  const seen = new Set<string>()
  const out: T[] = []
  for (const item of [...pools.flagged, ...pools.missed]) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    out.push(item)
  }
  return out
}
