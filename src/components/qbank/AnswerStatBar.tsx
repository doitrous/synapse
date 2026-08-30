import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'

/**
 * The peer share for one option, drawn flush along the bottom edge of its box.
 *
 * A boxy sliver rather than a pill, in a light shade of the option's own tone,
 * that grows from empty to its real width once the answer is revealed — the
 * cohort "arriving" rather than snapping in. The option box carries
 * `relative overflow-hidden`, so this sits on its lower edge and is clipped to
 * its rounded corners. Purely decorative: the figure itself is stated in text
 * beside the option, so this carries `aria-hidden`.
 *
 * Shared by `QuestionView` and the Question Bank's own inline option list, so
 * the peer breakdown looks identical wherever an answer is revealed.
 */
export type AnswerStatTone = 'correct' | 'wrong' | 'neutral'

export function AnswerStatBar({ pct, tone }: { pct: number; tone: AnswerStatTone }) {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const frame = requestAnimationFrame(() => setWidth(pct))
    return () => cancelAnimationFrame(frame)
  }, [pct])
  const fill = tone === 'correct' ? 'bg-success/45' : tone === 'wrong' ? 'bg-danger/45' : 'bg-ink/15'
  return (
    <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1.5 bg-ink/[0.06]">
      <span
        className={cn('block h-full transition-[width] duration-700 ease-[var(--ease-out-quint)]', fill)}
        style={{ width: `${width}%` }}
      />
    </span>
  )
}
