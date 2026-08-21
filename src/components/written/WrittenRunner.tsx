import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, Eye, FastForward } from 'lucide-react'
import {
  markWritten, writtenFullyMarked, writtenPartsInOrder, type WrittenQuestion,
} from '@/data/writtenQuestion'
import { useWrittenAnswers } from '@/lib/useWrittenAnswers'
import { useRecordAttempt } from '@/lib/useAttemptLog'
import { useT } from '@/lib/i18n'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Checkbox } from '@/components/ui/Checkbox'
import { Textarea } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { SubjectTag } from '@/components/ui/Subject'

/** Marks read as the paper prints them: 2.5, not 2.50, and 5 rather than 5.0. */
function marks(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(2).replace(/\.?0+$/, '')
}

function Header({ question, onExit }: { question: WrittenQuestion; onExit: () => void }) {
  const t = useT()
  return (
    <div className="mb-5">
      <button
        onClick={onExit}
        className="mb-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-2 transition-colors hover:text-ink"
      >
        <Icon icon={ArrowLeft} size={15} className="rtl:-scale-x-100" />
        {t('Back to written questions')}
      </button>
      <div className="flex min-w-0 flex-wrap items-center gap-2">
        <SubjectTag id={question.subjectId} />
      </div>
      <h1 className="mt-2 font-serif text-[22px] font-semibold tracking-[-0.02em] text-ink">{question.title}</h1>
      <p className="mt-1 text-[12.5px] text-ink-3">
        {t('{n} marks').replace('{n}', marks(question.totalMarks))}
      </p>
    </div>
  )
}

/**
 * One written exam question, taken through write, reveal, and self-mark.
 *
 * The shape follows `EssayRunner`, and for the same reason: nothing here reads
 * prose and decides whether it was right. The mark scheme is shown once the
 * student has written something, and they tick what they actually covered —
 * which is what anyone does with a past paper and a mark scheme.
 *
 * The difference from an essay is that a faculty written question is several
 * parts, each with its own marks, so marking is per part and the score is
 * apportioned across each part's expected points. That per-part structure is
 * the question; flattening it would lose the mark scheme, which is the only
 * thing making the question markable.
 *
 * The mark scheme is rendered only inside the `revealed` branch. There is no
 * collapsed copy in the DOM for a curious student to find before writing.
 */
export function WrittenRunner({ question, onExit }: { question: WrittenQuestion; onExit: () => void }) {
  const t = useT()
  const { answers, save } = useWrittenAnswers()
  const logAttempt = useRecordAttempt()
  const saved = answers[question.id]

  const parts = useMemo(() => writtenPartsInOrder(question.parts), [question.parts])

  const [text, setText] = useState<Record<string, string>>(saved?.text ?? {})
  const [stage, setStage] = useState<'write' | 'revealed'>(saved?.revealed ? 'revealed' : 'write')
  const [ticks, setTicks] = useState<Record<string, string[]>>(saved?.ticks ?? {})
  // Whether the student has ticked anything at all this sitting, which is what
  // separates "revealed but unmarked" from "marked and scored nothing".
  const [marked, setMarked] = useState(saved?.ticks != null)

  const score = stage === 'revealed' ? markWritten(ticks, parts) : null
  const written = parts.some((part) => text[part.id]?.trim())

  /**
   * Persist whatever the student has done, whenever it changes.
   *
   * Writing inside the event handlers instead looks simpler and is wrong in two
   * different ways, both of which this had. Saving from inside a `setState`
   * updater is a write during render, which React warns about; saving from
   * outside one means reading `ticks` out of the current render's closure, and
   * four checkbox clicks in the same tick then each compute their next value
   * from the same stale object — the first three ticks are silently dropped and
   * the student's marks are wrong.
   *
   * An effect sees state after React has settled it, so neither happens.
   */
  const settled = useRef(false)
  useEffect(() => {
    // Nothing to write on the first render; doing so would overwrite a stored
    // answer with the empty state that was just read out of it.
    if (!settled.current) { settled.current = true; return }
    save(question.id, {
      text,
      // Revealing is not marking. Until something is ticked this stays null, or
      // an answer that was only peeked at would be badged "0 of N".
      ticks: marked ? ticks : null,
      revealed: stage === 'revealed',
    })
  }, [question.id, text, ticks, marked, stage, save])

  function reveal() {
    if (stage === 'revealed') return
    setStage('revealed')
    // Only when something was actually written. "Skip and show me" is a
    // student looking up the answer, and logging that as practice would put
    // work in their record they did not do.
    if (!written) return
    logAttempt({
      surface: 'essay',
      itemId: question.id,
      subjectId: question.subjectId,
      topic: question.topic,
      difficulty: 'Moderate',
      // Every concept the question assesses. A written question is routinely
      // co-primary on several, and crediting only the first would leave the
      // rest of what it tested unmeasured.
      conceptIds: question.conceptIds ?? [],
      // Marked by the student, not the app — as for essays and practicals.
      correct: null,
      seconds: null,
      sessionId: `written-${question.id}-${Date.now().toString(36)}`,
    })
  }

  function changeText(partId: string, value: string) {
    setText((current) => ({ ...current, [partId]: value }))
  }

  function toggle(partId: string, point: string) {
    setMarked(true)
    setTicks((current) => {
      const already = current[partId] ?? []
      return {
        ...current,
        [partId]: already.includes(point)
          ? already.filter((entry) => entry !== point)
          : [...already, point],
      }
    })
  }

  return (
    <div className="mx-auto max-w-[720px] px-4 py-6 sm:px-6">
      <Header question={question} onExit={onExit} />

      <div className="space-y-4">
        {parts.map((part) => (
          <Panel key={part.id} className="p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-[15px] font-medium leading-relaxed text-ink">
                <span className="me-2 font-mono text-[13px] text-ink-3">({part.label})</span>
                {part.prompt}
              </p>
              {part.marks > 0 && (
                <span className="tnum shrink-0 font-mono text-[12.5px] text-ink-3">
                  {t('{n} marks').replace('{n}', marks(part.marks))}
                </span>
              )}
            </div>
            <Textarea
              value={text[part.id] ?? ''}
              onChange={(event) => changeText(part.id, event.target.value)}
              rows={6}
              placeholder={t('Write your answer…')}
              aria-label={t('Your answer to part {label}').replace('{label}', part.label)}
              className="mt-3"
            />
          </Panel>
        ))}
      </div>

      {stage === 'write' && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Button variant="primary" iconLeft={Eye} disabled={!written} onClick={reveal}>
            {t('Reveal the mark scheme')}
          </Button>
          <Button variant="ghost" iconLeft={FastForward} onClick={reveal}>
            {t('Skip and show me')}
          </Button>
        </div>
      )}

      {stage === 'revealed' && (
        <div className="mt-4 space-y-4">
          <Panel>
            <PanelHeader
              title={t('Mark scheme')}
              hint={
                score && writtenFullyMarked(ticks, parts)
                  ? t('{marks} of {outOf} marks')
                      .replace('{marks}', marks(score.marks))
                      .replace('{outOf}', marks(score.outOf))
                  : t('Tick what you actually wrote')
              }
            />
            <div className="divide-y divide-line">
              {parts.map((part) => {
                const partScore = score?.parts.find((entry) => entry.partId === part.id)
                return (
                  <div key={part.id} className="px-5 py-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="text-[13px] font-semibold text-ink-2">
                        <span className="me-1.5 font-mono text-ink-3">({part.label})</span>
                        {part.prompt}
                      </p>
                      {partScore && partScore.total > 0 && (
                        <span className="tnum shrink-0 font-mono text-[12px] text-ink-3">
                          {marks(partScore.marks)} / {marks(partScore.outOf)}
                        </span>
                      )}
                    </div>
                    {part.expectedPoints.length === 0 ? (
                      // The paper printed the question and not its answer. Say
                      // so, rather than showing an empty list that reads as a
                      // question worth nothing.
                      <p className="mt-2 text-[12.5px] leading-relaxed text-ink-3">
                        {t('No mark scheme was published for this part.')}
                      </p>
                    ) : (
                      <ul className="mt-2 space-y-2">
                        {part.expectedPoints.map((point) => (
                          <li key={point} className="flex items-start gap-3">
                            <Checkbox
                              checked={(ticks[part.id] ?? []).includes(point)}
                              onChange={() => toggle(part.id, point)}
                              label={point}
                              className="mt-0.5"
                            />
                            <span className="flex-1 text-[13.5px] leading-relaxed text-ink">{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )
              })}
            </div>
          </Panel>

          {question.learningObjective && (
            <Panel className="p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">
                {t('What a good answer demonstrates')}
              </p>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-2">{question.learningObjective}</p>
            </Panel>
          )}
        </div>
      )}
    </div>
  )
}
