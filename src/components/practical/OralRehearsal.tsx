import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowRight,
  CircleAlert,
  CircleCheck,
  CircleDashed,
  CircleX,
  Eye,
  EyeOff,
  MessagesSquare,
  Mic,
} from 'lucide-react'
import { oralQuestions } from '@/data/practical'
import { subjects } from '@/data/subjects'
import type { OralMark } from '@/data/practicalProgress'
import { usePracticalProgress } from '@/lib/usePracticalProgress'
import { useSubjectName } from '@/lib/useSubjectName'
import { ConceptText } from '@/components/concepts/ConceptText'
import { EmptyState } from '@/components/ui/EmptyState'
import { Panel } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'

const ORAL_MARK_META: Record<OralMark, { icon: typeof CircleCheck; cls: string; label: string }> = {
  got: { icon: CircleCheck, cls: 'text-success', label: 'Got it' },
  partly: { icon: CircleAlert, cls: 'text-warning', label: 'Partly' },
  missed: { icon: CircleX, cls: 'text-danger', label: 'Missed it' },
}

function formatTimer(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

/**
 * One question rehearsed at a time — attempt it aloud, reveal the model
 * answer, then mark yourself before moving on. The self-mark persists via
 * `usePracticalProgress` (`oral`), so it survives a reload; only the reveal
 * state and the "answer aloud" timer stay session-local, since replaying
 * whether the model answer was on screen a moment ago has no lasting value.
 *
 * Lifted out of the Practical tab strip when oral questions became their own
 * destination: a viva rehearsal is a thing a student sits down to do, not a
 * tab they land on beside five others. The store is unchanged, so a mark made
 * before the move is still there after it.
 */
export function OralRehearsal() {
  const t = useT()
  const systemName = useSubjectName()
  const flat = useMemo(() => {
    const known = subjects.filter((s) => oralQuestions.some((q) => q.subjectId === s.id))
    return known.flatMap((subj) => oralQuestions.filter((q) => q.subjectId === subj.id))
  }, [])
  const groups = useMemo(
    () =>
      subjects
        .map((subj) => ({ subj, questions: oralQuestions.filter((q) => q.subjectId === subj.id) }))
        .filter((g) => g.questions.length > 0),
    [],
  )

  const { progress, markOral } = usePracticalProgress()
  const marks = progress.oral ?? {}

  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [running, setRunning] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const tick = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (running) {
      tick.current = setInterval(() => setElapsed((e) => e + 1), 1000)
      return () => { if (tick.current) clearInterval(tick.current) }
    }
  }, [running])

  const goTo = (i: number) => {
    setIndex(Math.min(Math.max(i, 0), flat.length - 1))
    setRevealed(false)
    setRunning(false)
    setElapsed(0)
  }

  if (!flat.length) {
    return <Panel className="p-8"><EmptyState icon={MessagesSquare} title={t('No oral questions yet')} description={t('Viva questions appear here once they are published in Practical Setup.')} /></Panel>
  }

  const current = flat[index]
  const doneCount = flat.filter((q) => marks[q.id]?.mark === 'got').length
  const partlyCount = flat.filter((q) => marks[q.id]?.mark === 'partly').length
  const answeredCount = flat.filter((q) => marks[q.id]).length
  const isLast = index === flat.length - 1

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="primary">{t('Viva rehearsal')}</Badge>
        <span className="tnum font-mono text-[11.5px] text-ink-3">
          {t('Question {n} of {total}').replace('{n}', String(index + 1)).replace('{total}', String(flat.length))} · {systemName(current.subjectId)}
        </span>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
        {/* Rehearsal column */}
        <div className="flex flex-col gap-3">
          <Panel className="flex flex-col items-center gap-3 p-6 text-center">
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.07em] text-ink-3">{t('The examiner asks')}</span>
            {/* h2: the page's own PageHeader owns the h1, so the question is the
                section heading beneath it rather than a second page title. */}
            <h2 className="font-serif text-[19px] font-semibold leading-snug text-ink sm:text-[21px]">
              &ldquo;{current.question}&rdquo;
            </h2>
            <Badge tone="outline">{current.topic}</Badge>
            <div className="mt-1 flex flex-wrap items-center justify-center gap-2.5">
              <Button
                variant="secondary"
                size="sm"
                iconLeft={Mic}
                onClick={() => setRunning((r) => !r)}
                aria-pressed={running}
              >
                {running
                  ? `${t('Answering aloud')} · ${formatTimer(elapsed)}`
                  : elapsed > 0
                    ? `${t('Paused')} · ${formatTimer(elapsed)}`
                    : t('Answer aloud')}
              </Button>
              {!revealed && (
                <Button
                  variant="primary"
                  size="sm"
                  iconLeft={Eye}
                  onClick={() => { setRevealed(true); setRunning(false) }}
                >
                  {t('Reveal the model answer')}
                </Button>
              )}
            </div>
            <p className="flex items-center gap-1.5 text-[11px] text-ink-3">
              <MessagesSquare size={12} /> {t('Say it out loud before revealing — recognising an answer isn’t the same as producing one.')}
            </p>
          </Panel>

          {revealed && (
            <Panel className="p-4">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-primary-strong">
                  <CircleCheck size={13} /> {t('Model answer')}
                </span>
                <Button variant="ghost" size="sm" iconLeft={EyeOff} onClick={() => setRevealed(false)}>{t('Hide')}</Button>
              </div>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink"><ConceptText text={current.modelAnswer} /></p>

              <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-line pt-3">
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.07em] text-ink-3">{t('How did you do?')}</span>
                {(Object.keys(ORAL_MARK_META) as OralMark[]).map((m) => {
                  const meta = ORAL_MARK_META[m]
                  const active = marks[current.id]?.mark === m
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => markOral(current.id, m)}
                      className={cn(
                        'inline-flex min-h-11 items-center gap-1.5 rounded-md border px-3 py-1 text-[12px] font-medium transition-colors sm:min-h-0',
                        active
                          ? m === 'got'
                            ? 'border-success/40 bg-success-tint text-success'
                            : m === 'partly'
                              ? 'border-warning/40 bg-warning-tint text-warning'
                              : 'border-danger/40 bg-danger-tint text-danger'
                          : 'border-line-2 bg-surface text-ink-2 hover:bg-inset',
                      )}
                    >
                      <Icon icon={meta.icon} size={13} className={active ? '' : 'text-ink-3'} />
                      {t(meta.label)}
                    </button>
                  )
                })}
                <span className="ms-auto text-[10.5px] text-ink-3">{t('Self-marked · never counts toward accuracy')}</span>
                <Button variant="primary" size="sm" iconRight={ArrowRight} disabled={isLast} onClick={() => goTo(index + 1)}>
                  {isLast ? t('Last question') : t('Next')}
                </Button>
              </div>
            </Panel>
          )}
        </div>

        {/* Queue rail */}
        <Panel className="flex max-h-[560px] flex-col overflow-hidden p-2">
          <p className="px-2 pb-1.5 pt-1 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-ink-3">
            {t('Tonight’s queue · by module')}
          </p>
          <div className="flex-1 space-y-0.5 overflow-y-auto">
            {groups.map(({ subj, questions }) => (
              <div key={subj.id}>
                <p className="px-2 pb-1 pt-2 text-[11px] font-semibold text-ink-2">{systemName(subj.id)}</p>
                {questions.map((q) => {
                  const i = flat.findIndex((f) => f.id === q.id)
                  const mark = marks[q.id]?.mark
                  const isCurrent = i === index
                  const meta = mark ? ORAL_MARK_META[mark] : { icon: CircleDashed, cls: 'text-ink-3', label: t('Not answered') }
                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => goTo(i)}
                      className={cn(
                        'flex min-h-11 w-full items-center gap-2 rounded-md px-2 py-1.5 text-start text-[12px] transition-colors sm:min-h-0',
                        isCurrent ? 'bg-primary-tint text-primary-strong font-medium' : 'text-ink-2 hover:bg-inset',
                      )}
                    >
                      <Icon icon={meta.icon} size={13} className={isCurrent ? '' : meta.cls} />
                      <span className="min-w-0 flex-1 truncate">{q.question}</span>
                      {isCurrent && <span className="shrink-0 font-mono text-[10px]">{t('now')}</span>}
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-line px-2 pt-2 text-[11px] text-ink-3">
            <span>
              {t('{n} done').replace('{n}', String(doneCount))} · {t('{n} partly').replace('{n}', String(partlyCount))}
            </span>
            <span className="tnum font-mono">
              {t('{n} of {total} answered').replace('{n}', String(answeredCount)).replace('{total}', String(flat.length))}
            </span>
          </div>
        </Panel>
      </div>
    </div>
  )
}
