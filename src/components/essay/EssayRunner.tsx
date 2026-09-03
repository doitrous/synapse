import { useState } from 'react'
import { ArrowLeft, CheckCircle2, ChevronDown, Circle, ClipboardCheck, Eye, FastForward, PenLine } from 'lucide-react'
import { coveredCount, initialStage, type EssayQuestion } from '@/data/essay'
import { useEssayAnswers } from '@/lib/useEssayAnswers'
import { useRecordAttempt } from '@/lib/useAttemptLog'
import { useEssayGrade, type EssayGradeFailure } from '@/lib/useEssayGrade'
import { useT } from '@/lib/i18n'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Checkbox } from '@/components/ui/Checkbox'
import { Textarea } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { SubjectTag } from '@/components/ui/Subject'
import { Collapse } from '@/components/ui/Collapse'
import { SkeletonText } from '@/components/ui/Skeleton'
import { ItemFlagButton } from '@/components/qbank/unified/ItemFlagButton'
import { cn } from '@/lib/cn'

/** The one line explaining why AI analysis stopped, per failure kind. */
function analysisFailureMessage(t: (key: string) => string, failure: EssayGradeFailure): string {
  switch (failure) {
    case 'quota': return t('Daily AI limit reached — try again tomorrow, or mark it yourself.')
    case 'not_on_plan': return t('AI analysis is not included on your plan.')
    case 'unavailable': return t('AI analysis is not available right now.')
    default: return t('Could not analyze this answer — try again, or mark it yourself.')
  }
}

/** Words in a written answer — the same rough count the design shows next to "Your answer". */
function wordCount(text: string): number {
  const trimmed = text.trim()
  return trimmed ? trimmed.split(/\s+/).length : 0
}

function Header({ essay, onExit, backLabel }: { essay: EssayQuestion; onExit: () => void; backLabel?: string }) {
  const t = useT()
  return (
    <div className="mb-5">
      <button
        onClick={onExit}
        className="mb-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-2 transition-colors hover:text-ink"
      >
        <Icon icon={ArrowLeft} size={15} className="rtl:-scale-x-100" />
        {backLabel ?? t('Back to essay questions')}
      </button>
      <div className="flex min-w-0 flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <SubjectTag id={essay.subjectId} />
          </div>
          <h1 className="mt-2 font-serif text-[22px] font-semibold tracking-[-0.02em] text-ink">{essay.title}</h1>
        </div>
        {/* The same flag the MCQ runner carries. A written question is exactly
            as worth coming back to, and until now it could not be marked. */}
        <ItemFlagButton kind="essay" id={essay.id} className="shrink-0" />
      </div>
    </div>
  )
}

/**
 * One written question, taken through write, reveal, and self-mark.
 *
 * The helpers — key points, examiner note, model answer — are only ever
 * rendered once `stage` is `'revealed'`. That branch does not exist below the
 * write stage's return; there is no collapsed or hidden copy sitting in the
 * DOM for a curious student to find before they have written anything.
 */
export function EssayRunner({
  essay,
  onExit,
  backLabel,
}: {
  essay: EssayQuestion
  onExit: () => void
  /** What leaving means where this is mounted. Defaults to the essay page's wording. */
  backLabel?: string
}) {
  const t = useT()
  const { answers, save } = useEssayAnswers()
  const logAttempt = useRecordAttempt()
  const grading = useEssayGrade()
  const saved = answers[essay.id]

  const [text, setText] = useState(saved?.text ?? '')
  // Reopening a question that was already revealed lands back on the mark
  // stage with the previous ticks, rather than making the student write again
  // to see helpers they have already earned this sitting.
  const [stage, setStage] = useState<'write' | 'revealed'>(() => initialStage(saved))
  const [ticked, setTicked] = useState<Set<string>>(() => new Set(saved?.ticked ?? []))

  const [modelOpen, setModelOpen] = useState(false)

  const pointIds = essay.keyPoints.map((point) => point.id)
  const covered = stage === 'revealed' ? coveredCount([...ticked], pointIds) : null

  function reveal() {
    if (stage === 'revealed') return
    setStage('revealed')
    // `ticked` stays null: opening the helpers is not marking, and writing an
    // empty array here would badge an unmarked question "0 of N covered".
    save(essay.id, { text, ticked: null, revealed: true })
    // Only when something was actually written. "Skip and show me" is a
    // student looking up the answer, and logging that as practice would put
    // work in their record that they did not do.
    if (!text.trim()) return
    // Marked by the student, not the app — see AttemptRecord.correct in
    // src/data/attempts.ts. `seconds` is null for the same reason: nothing
    // here times how long the student took.
    logAttempt({
      surface: 'essay',
      itemId: essay.id,
      subjectId: essay.subjectId,
      topic: essay.title,
      difficulty: 'Moderate',
      conceptIds: [],
      correct: null,
      seconds: null,
      sessionId: `essay-${essay.id}-${Date.now().toString(36)}`,
    })
  }

  function changeText(next: string) {
    setText(next)
    save(essay.id, { text: next, ticked: stage === 'revealed' && ticked.size ? [...ticked] : null, revealed: stage === 'revealed' })
  }

  function toggle(pointId: string) {
    setTicked((current) => {
      const next = new Set(current)
      if (next.has(pointId)) next.delete(pointId)
      else next.add(pointId)
      save(essay.id, { text, ticked: [...next], revealed: true })
      return next
    })
  }

  const words = wordCount(text)

  // Either helper is a legitimate way to check an answer, and picking one does
  // not use up the other — a student can analyze with AI and still reveal the
  // key points afterward.
  const analyzeButton = (
    <Button
      variant="ghost"
      iconLeft={PenLine}
      loading={grading.pending}
      disabled={!text.trim() || grading.pending}
      onClick={() => grading.analyze(essay, text)}
    >
      {t('Analyze with AI')}
    </Button>
  )

  return (
    <div className="mx-auto max-w-[1040px] px-4 py-6 sm:px-6">
      <Header essay={essay} onExit={onExit} backLabel={backLabel} />

      <div className={cn('grid gap-4', stage === 'revealed' && 'lg:grid-cols-2')}>
        {/* Question + the student's own answer */}
        <div className="space-y-4">
          <Panel className="p-5">
            <p className="text-[13px] font-semibold text-ink">{t('The question')}</p>
            <p className="mt-1.5 text-[15px] font-medium leading-relaxed text-ink">{essay.prompt}</p>
          </Panel>

          <Panel className="p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[13px] font-semibold text-ink">{t('Your answer')}</p>
              {stage === 'revealed' ? (
                <span className="font-mono text-[11px] tabular-nums text-ink-3">
                  {t('written before reveal · {n} words').replace('{n}', String(words))}
                </span>
              ) : (
                <span className="font-mono text-[11px] tabular-nums text-ink-3">
                  {t('{n} words').replace('{n}', String(words))}
                </span>
              )}
            </div>
            <Textarea
              value={text}
              onChange={(event) => changeText(event.target.value)}
              rows={stage === 'revealed' ? 10 : 8}
              placeholder={t('Write your answer…')}
              aria-label={t('Your answer')}
              className="mt-3"
            />
            {stage === 'write' ? (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Button variant="primary" iconLeft={Eye} disabled={!text.trim()} onClick={reveal}>
                  {t('Reveal')}
                </Button>
                <Button variant="ghost" iconLeft={FastForward} onClick={reveal}>
                  {t('Skip and show me')}
                </Button>
                {analyzeButton}
              </div>
            ) : (
              <>
                <p className="mt-3 text-[11px] leading-relaxed text-ink-3">
                  {t('Reveal was disabled until you wrote — recognising the model answer is not the same as producing one.')}
                </p>
                <div className="mt-3">{analyzeButton}</div>
              </>
            )}
          </Panel>

          {/* AI analysis — advisory only. Rendered wherever a request has been
              made, in either stage, since it is an alternative to self-marking
              rather than something reveal gates. */}
          {(grading.pending || grading.feedback || grading.failure) && (
            <Panel className="p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="flex items-center gap-1.5 text-[13px] font-semibold text-ink">
                  <Icon icon={ClipboardCheck} size={14} className="text-primary" />
                  {t('AI analysis')}
                </p>
                {grading.feedback && (
                  <span className="font-mono text-[13px] font-bold tabular-nums text-ink">
                    {grading.feedback.score}
                    <span className="text-ink-3">/100</span>
                  </span>
                )}
              </div>

              {grading.pending && <SkeletonText lines={4} className="mt-3" />}

              {grading.failure && !grading.pending && (
                <p role="alert" className="mt-2 text-[12.5px] leading-relaxed text-danger">
                  {analysisFailureMessage(t, grading.failure)}
                </p>
              )}

              {grading.feedback && !grading.pending && (
                <div className="mt-3 space-y-3">
                  <ul className="space-y-1.5">
                    {essay.keyPoints.map((point, index) => {
                      const covered = grading.feedback!.coveredKeyPoints.includes(index)
                      const missed = grading.feedback!.missedKeyPoints.includes(index)
                      if (!covered && !missed) return null
                      return (
                        <li key={point.id} className="flex items-start gap-2 text-[12.5px] leading-relaxed">
                          <Icon
                            icon={covered ? CheckCircle2 : Circle}
                            size={14}
                            className={cn('mt-0.5 shrink-0', covered ? 'text-success' : 'text-ink-3')}
                          />
                          <span className={covered ? 'text-ink' : 'text-ink-3'}>{point.text}</span>
                        </li>
                      )
                    })}
                  </ul>
                  {grading.feedback.strengths.length > 0 && (
                    <div>
                      <p className="text-[11.5px] font-semibold text-ink-2">{t('Strengths')}</p>
                      <ul className="mt-1 list-disc space-y-0.5 ps-4 text-[12.5px] leading-relaxed text-ink-2">
                        {grading.feedback.strengths.map((line) => <li key={line}>{line}</li>)}
                      </ul>
                    </div>
                  )}
                  {grading.feedback.improvements.length > 0 && (
                    <div>
                      <p className="text-[11.5px] font-semibold text-ink-2">{t('To improve')}</p>
                      <ul className="mt-1 list-disc space-y-0.5 ps-4 text-[12.5px] leading-relaxed text-ink-2">
                        {grading.feedback.improvements.map((line) => <li key={line}>{line}</li>)}
                      </ul>
                    </div>
                  )}
                  {grading.feedback.summary && (
                    <p className="text-[12.5px] leading-relaxed text-ink-2">{grading.feedback.summary}</p>
                  )}
                  <p className="text-[10.5px] text-ink-3">
                    {t('AI analysis — advisory only, never enters your accuracy stats')}
                  </p>
                </div>
              )}
            </Panel>
          )}
        </div>

        {/* Self-marking */}
        {stage === 'revealed' && (
          <div className="space-y-4">
            <Panel>
              <PanelHeader
                title={t('Key points — tick what you covered')}
                hint={
                  covered
                    ? t('{covered} of {total} covered')
                        .replace('{covered}', String(covered.covered))
                        .replace('{total}', String(covered.total))
                    : undefined
                }
              />
              <ul className="divide-y divide-line px-5">
                {essay.keyPoints.map((point) => (
                  <li key={point.id} className="flex items-start gap-3 py-2.5">
                    <Checkbox checked={ticked.has(point.id)} onChange={() => toggle(point.id)} label={point.text} className="mt-0.5" />
                    <span className={cn('flex-1 text-[13px] leading-relaxed', ticked.has(point.id) ? 'text-ink' : 'text-ink-2')}>
                      {point.text}
                    </span>
                    {point.legible && (
                      <Badge tone="primary">
                        <Icon icon={PenLine} size={11} />
                        {t('Write legibly')}
                      </Badge>
                    )}
                  </li>
                ))}
              </ul>
              {covered && (
                <div className="flex items-center justify-between gap-3 border-t border-line px-5 py-3">
                  <span className="text-[12.5px] text-ink-2">
                    {t('Marks yourself:')}{' '}
                    <span className="font-mono font-bold tabular-nums text-ink">
                      {t('{covered} of {total}').replace('{covered}', String(covered.covered)).replace('{total}', String(covered.total))}
                    </span>
                  </span>
                  <span className="text-[10.5px] text-ink-3">{t('Self-marked — never enters your accuracy stats')}</span>
                </div>
              )}
            </Panel>

            <Panel className="border-warning/30 bg-warning-tint p-4">
              <p className="text-[13px] font-semibold text-ink">{t('What the examiner scans for')}</p>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-2">{essay.examinerNote}</p>
            </Panel>

            <Panel className="overflow-hidden">
              <button
                type="button"
                aria-expanded={modelOpen}
                onClick={() => setModelOpen((current) => !current)}
                className="flex w-full items-center justify-between gap-3 px-5 py-3.5 text-start transition-colors hover:bg-inset/60"
              >
                <span>
                  <span className="block text-[13px] font-semibold text-ink">{t('Model answer')}</span>
                  <span className="mt-0.5 block text-[12px] text-ink-2">{t('Full worked answer, for comparison')}</span>
                </span>
                <span className="flex shrink-0 items-center gap-1.5 rounded-md border border-line-2 bg-surface px-3 py-1.5 text-[12.5px] font-semibold text-ink">
                  {modelOpen ? t('Hide') : t('Open')}
                  <Icon icon={ChevronDown} size={14} className="chevron-turn" open={modelOpen} />
                </span>
              </button>
              <Collapse open={modelOpen}>
                <p className="whitespace-pre-wrap px-5 pb-4 text-[13.5px] leading-relaxed text-ink-2">{essay.modelAnswer}</p>
              </Collapse>
            </Panel>
          </div>
        )}
      </div>
    </div>
  )
}
