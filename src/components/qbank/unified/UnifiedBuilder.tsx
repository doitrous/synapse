import type { ReactNode } from 'react'
import type { Question } from '@/data/qbank'
import { PracticalBank } from './PracticalBank'
import { EssayBank } from './EssayBank'
import { MixedBank } from './MixedBank'
import type { MixedPools, MixedSplit } from '@/data/mixedSession'

/** The four ways to build a sitting. */
export type UnifiedBank = 'mcq' | 'practical' | 'essay' | 'mixed'

export interface UnifiedBuilderProps {
  /** Which bank's composer to show. Chosen above, in the hub. */
  bank: UnifiedBank
  /** Direction 1's MCQ composer, mounted unchanged. */
  mcq: ReactNode
  /** The MCQ pool the mixed bank draws from. */
  questions: Question[]
  /** The MCQs this student flagged, got wrong or left — the mixed bank's narrow pool. */
  collections: Question[]
  /** Start a practical, essay or mixed sitting. The MCQ tab starts its own. */
  onStart: (pools: MixedPools, split: MixedSplit) => void
  /**
   * The "Your progress" panel, mounted in every bank's end column.
   *
   * Passed in rather than mounted here because the MCQ composer already takes
   * it as a prop of its own, and one node handed to both is what keeps the
   * panel in the same place on all four banks.
   */
  stats?: ReactNode
}

/**
 * One builder for the whole bank, not one page per format.
 *
 * A student revising for finals sits an MCQ paper, a practical and a written
 * paper, and the app had them in three unrelated places with three different
 * ways of choosing what to do. Here the controls differ because the formats
 * differ, but the rhythm — numbered steps on the start side, what it adds up to
 * and Start on the end side — is the same one, so learning to build a test is
 * learned once.
 *
 * Which bank is being built from is not decided here any more: it is the first
 * decision on the page, above the action tabs, because it scopes the flagged
 * list and the ledger of previous tests as well as this composer.
 */
export function UnifiedBuilder({ bank, mcq, questions, collections, onStart, stats }: UnifiedBuilderProps) {
  return (
    <>
      {bank === 'mcq' && mcq}
      {bank === 'practical' && <PracticalBank onStart={onStart} stats={stats} />}
      {bank === 'essay' && <EssayBank onStart={onStart} stats={stats} />}
      {bank === 'mixed' && <MixedBank questions={questions} collections={collections} onStart={onStart} stats={stats} />}
    </>
  )
}
