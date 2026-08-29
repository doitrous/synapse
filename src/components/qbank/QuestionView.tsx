import { useRef } from 'react'
import { Check, X } from 'lucide-react'
import type { Question } from '@/data/qbank'
import { Icon } from '@/components/ui/Icon'
import { Badge } from '@/components/ui/Badge'
import { SubjectDot } from '@/components/ui/Subject'
import { ZoomableImage, MediaAttachmentView } from '@/components/ui/MediaAttachmentView'
import { PlacedMedia } from '@/components/ui/PlacedMedia'
import { placementsFor } from '@/data/mediaPlacement'
import { useMediaRecords } from '@/lib/useMediaRecords'
import { getSubject } from '@/data/subjects'
import { cn } from '@/lib/cn'
import { HighlightSelectionPopover, HighlightableText, useQuestionHighlights } from '@/components/qbank/QuestionHighlights'
import { answerPercentages, type AnswerDistribution } from '@/data/answerDistribution'

/**
 * A question as it is put to a student — the same one everywhere.
 *
 * Study Together had its own, much thinner version: plain paragraphs with no
 * concept highlighting, options with no letters or attachments, and a different
 * idea of what a chosen or a wrong answer looks like. Two renderings of the same
 * thing is how they drift, and only one of them was ever improved.
 *
 * Deliberately presentational. What happens after an answer differs — the
 * question bank marks locally and explains at once, a room submits to the server
 * and waits for everyone — so that stays with each caller.
 */

export const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']

function diffTone(difficulty: string) {
  if (difficulty === 'Easy') return 'success' as const
  if (difficulty === 'Hard' || difficulty === 'Challenging') return 'danger' as const
  return 'warning' as const
}

export function QuestionView({
  question,
  chosen,
  revealed,
  correctIndex,
  onChoose,
  distribution,
}: {
  question: Question
  /** The option this student picked, or null before they have. */
  chosen: number | null
  /** True once the answer may be shown — which also unlocks concept highlighting. */
  revealed: boolean
  /**
   * Which option is right. Taken as a prop rather than read off the question,
   * because a room is told by the server and never holds the answer key.
   */
  correctIndex?: number
  onChoose: (index: number) => void
  /**
   * The peer answer breakdown for this question, once revealed. Fetched by the
   * caller (via `useAnswerDistribution`) and passed in — this component stays
   * presentational and never fetches for itself. Absent, null, or ineligible
   * all render exactly as if the feature did not exist.
   */
  distribution?: AnswerDistribution | null
}) {
  const mediaRecords = useMediaRecords()
  const answer = correctIndex ?? question.options.findIndex((option) => option.correct)
  const highlights = useQuestionHighlights(question.id)
  const containerRef = useRef<HTMLDivElement>(null)
  const showStats = revealed && Boolean(distribution?.eligible) && Boolean(distribution?.counts)
  const percentages = showStats ? answerPercentages(distribution!.counts!, distribution!.total) : null

  function optionClasses(index: number): string {
    if (!revealed) {
      return chosen === index
        ? 'border-primary bg-primary-tint/50'
        : 'border-line bg-surface hover:border-line-2'
    }
    if (index === answer) return 'border-success bg-success-tint'
    if (chosen === index) return 'border-danger bg-danger-tint'
    return 'border-line bg-surface opacity-70'
  }

  return (
    // `contents`: a DOM node to scope selection capture to, without taking part
    // in this component's own box — every caller lays out its children as if
    // this were still the bare fragment it used to be.
    <div ref={containerRef} className="contents">
      <HighlightSelectionPopover container={containerRef} highlights={highlights} />
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-ink">
          <SubjectDot id={question.subjectId} />
          {getSubject(question.subjectId).name}
        </span>
        <span className="text-ink-3">·</span>
        <span className="text-[12.5px] text-ink-3">{question.topic}</span>
        {question.difficulty && (
          <Badge tone={diffTone(question.difficulty)} className="ml-auto">{question.difficulty}</Badge>
        )}
      </div>

      {question.vignette && (
        <p className="mt-4 text-[15px] leading-[1.65] text-ink/90"><HighlightableText text={question.vignette} enabled={revealed} blockId="vignette" highlights={highlights} /></p>
      )}
      <p className="mt-3 text-[15.5px] font-semibold leading-snug text-ink"><HighlightableText text={question.stem} enabled={revealed} blockId="stem" highlights={highlights} /></p>

      {question.attachedImage && (
        <div className="mt-4 overflow-hidden rounded-xl border border-line bg-inset p-2">
          <ZoomableImage src={question.attachedImage} alt="Question attachment" className="max-h-80 w-full rounded-lg object-contain" />
        </div>
      )}
      {question.attachments && question.attachments.length > 0 && (
        <div className="mt-4 space-y-2">
          {question.attachments.map((attachment) => <MediaAttachmentView key={attachment.id} attachment={attachment} />)}
        </div>
      )}
      <PlacedMedia placements={placementsFor(question.media, 'stem')} records={mediaRecords} className="mt-4" />

      {/* A revealed option is prose, not a control: a `<button disabled>` blocks
          pointer events for its whole subtree, so the concept links inside the
          answers could never be pressed at the one moment they are enabled. */}
      <div className="mt-5 space-y-2.5">
        {question.options.map((option, index) => {
          const body = (
            <>
              <span
                className={cn(
                  'grid size-7 shrink-0 place-items-center rounded-full border font-mono text-[12.5px] font-bold',
                  revealed && index === answer ? 'border-success bg-success text-on-success'
                    : revealed && chosen === index ? 'border-danger bg-danger text-on-danger'
                      : chosen === index ? 'border-primary bg-primary text-on-primary'
                        : 'border-line-2 bg-surface text-ink-2',
                )}
              >
                {revealed && index === answer ? <Icon icon={Check} size={14} strokeWidth={2.6} />
                  : revealed && chosen === index ? <Icon icon={X} size={14} strokeWidth={2.6} />
                    : LETTERS[index]}
              </span>
              <span className="flex-1 pt-0.5 text-[14px] text-ink">
                <HighlightableText text={option.text} enabled={revealed} blockId={`option-${index}`} highlights={highlights} />
                {/* Inside the option, so "which of these four radiographs" reads
                    as four options rather than four pictures and four labels. */}
                <PlacedMedia placements={placementsFor(question.media, 'answer', LETTERS[index])} records={mediaRecords} />
                {revealed && (
                  <PlacedMedia placements={placementsFor(question.media, 'explanation', LETTERS[index])} records={mediaRecords} />
                )}
                {percentages && (
                  <span className="mt-2 flex items-center gap-2">
                    <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-inset">
                      <span
                        className={cn(
                          'block h-full rounded-full',
                          index === answer ? 'bg-success' : chosen === index ? 'bg-danger' : 'bg-line-2',
                        )}
                        style={{ width: `${percentages[index] ?? 0}%` }}
                      />
                    </span>
                    <span className="tnum w-9 shrink-0 text-end font-mono text-[11px] text-ink-3">{percentages[index] ?? 0}%</span>
                  </span>
                )}
              </span>
            </>
          )
          const shape = cn('flex w-full items-start gap-3 rounded-xl border p-3.5 text-start transition-colors', optionClasses(index))
          return revealed ? (
            <div key={index} className={shape}>{body}</div>
          ) : (
            <button
              key={index}
              type="button"
              onClick={() => {
                // A drag that ends inside this button still fires a click. Without
                // this guard, dragging across an option's text to highlight it
                // would also select that option as the answer.
                if (window.getSelection()?.isCollapsed === false) return
                onChoose(index)
              }}
              className={shape}
            >
              {body}
            </button>
          )
        })}
      </div>
      {showStats && (
        <p className="mt-2 text-[11px] text-ink-3">Based on {distribution!.total} students in your year</p>
      )}

      {/* Explanation media lives here rather than beside each caller's own
          explanation text, because six surfaces render QuestionView and only
          one of them renders an explanation. Held until revealed: a diagram
          that explains the answer gives it away before it is asked for. */}
      {revealed && (
        <PlacedMedia placements={placementsFor(question.media, 'explanation')} records={mediaRecords} className="mt-5" />
      )}
    </div>
  )
}
