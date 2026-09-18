import { useState, type ReactNode } from 'react'
import { BookOpen, ChevronDown, GraduationCap, ListChecks, MoreHorizontal } from 'lucide-react'
import type { Question } from '@/data/qbank'
import type { Scope } from '@/data/qbankScope'
import type { SourceBucket } from '@/data/questionSource'
import { Panel } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { Segmented } from '@/components/ui/Tabs'
import { TextInput } from '@/components/ui/Field'
import { Collapse } from '@/components/ui/Collapse'
import { TopicChooser } from '@/components/qbank/TopicChooser'
import { DrawFromChips } from '@/components/qbank/unified/BankControls'
import { BuilderSummary } from './BuilderSummary'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'

/** The pool a test is drawn from before any topic scope is applied. */
export type DrawFrom = 'all' | 'unsolved' | 'flagged' | 'incorrect' | 'omitted'
export type SessionMode = 'tutor' | 'timed'

/** One question-source card, as the page counts them. */
export interface SourceCard {
  bucket: SourceBucket
  label: string
  count: number
}

/** The most questions one sitting can hold. */
export const MAX_TEST_QUESTIONS = 40

const PRESET_LENGTHS = [5, 10, 20, 40]

/**
 * Everything the composer needs, owned by the page above it.
 *
 * The builder is presentational on purpose: `QuestionBank.tsx` still holds the
 * session state and this component reads and sets it through these props, so
 * the runner below the hub is untouched by the redesign. Two directions of the
 * redesign compose the same controls differently, which is why the contract
 * lives here rather than inside either page.
 */
export interface TestBuilderProps {
  /** Step 1 — which of the student's lists the questions come from. */
  source: DrawFrom
  setSource: (next: DrawFrom) => void
  /** How many questions each of those lists holds, for the chips. */
  sourceCounts: Record<DrawFrom, number>
  /** Step 2 — the chosen source buckets. Empty means "all sources". */
  sourceSel: Set<SourceBucket>
  /** Toggles one bucket in or out of `sourceSel`. */
  onToggleSource: (bucket: SourceBucket) => void
  /** Every canonical source with its count under the current scope. */
  sourceCards: SourceCard[]
  /** Step 3 — the topic scope, and the pools the chooser draws its tree and counts from. */
  scope: Scope
  setScope: (next: Scope) => void
  scopePool: Question[]
  scopeCountPool: Question[]
  /** Step 4 — the sitting itself. */
  count: number
  setCount: (next: number) => void
  mode: SessionMode
  setMode: (next: SessionMode) => void
  sessionName: string
  setSessionName: (next: string) => void
  /** What the test is named when `sessionName` is left blank. */
  autoSessionName: string
  /** How many questions the current selection actually yields. */
  matching: number
  /** The whole pool it is being drawn out of, for the summary ring. */
  pool: number
  onStart: () => void
  /** The "Your Qbank" panel, rendered under the summary in the end column. */
  stats?: ReactNode
}

/**
 * One numbered step of the composer: a numbered circle, a label, a body.
 *
 * Exported because direction 2's practical, essay and mixed banks are the same
 * composer with different controls, and a second numbered-step component would
 * be the thing that drifts from this one.
 */
export function Step({
  number,
  label,
  badge,
  note,
  children,
}: {
  number: number
  label: string
  badge?: ReactNode
  note?: string
  children: ReactNode
}) {
  return (
    <Panel className="p-5">
      <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <h2 className="flex items-center gap-2 text-[14px] font-semibold text-ink">
          <span className="tnum inline-flex size-5 items-center justify-center rounded-full border border-line text-[11px] font-medium text-ink-3" aria-hidden>
            {number}
          </span>
          {label}
        </h2>
        {badge}
      </div>
      {children}
      {note && <p className="mt-2 text-[11.5px] leading-relaxed text-ink-3">{note}</p>}
    </Panel>
  )
}

export function TestBuilder({
  source,
  setSource,
  sourceCounts,
  sourceSel,
  onToggleSource,
  sourceCards,
  scope,
  setScope,
  scopePool,
  scopeCountPool,
  count,
  setCount,
  mode,
  setMode,
  sessionName,
  setSessionName,
  autoSessionName,
  matching,
  pool,
  onStart,
  stats,
}: TestBuilderProps) {
  const t = useT()
  // Whether the length control is showing its free-entry field. Purely a
  // display choice, so it lives here rather than in the page's session state.
  const [custom, setCustom] = useState(() => !PRESET_LENGTHS.includes(count))
  // Folded away until asked for: nothing inside it can be selected yet.
  const [sourceOpen, setSourceOpen] = useState(false)
  const lenChoice = custom ? 'custom' : String(count)

  const drawLabel = source === 'all' ? t('the whole bank')
    : source === 'unsolved' ? t('questions you have not solved')
      : source === 'flagged' ? t('your flagged questions')
        : source === 'incorrect' ? t('questions you got wrong')
          : t('questions you left unanswered')
  const scopeLabel = scope.size === 0
    ? t('every topic')
    : scope.size === 1 ? t('1 topic selected') : `${scope.size} ${t('topics selected')}`
  const modeLabel = mode === 'tutor' ? t('Tutor mode') : t('Timed mode')
  const sourceLabel = sourceSel.size > 0 ? ` · ${sourceSel.size} ${t('sources')}` : ''
  const summary = `${drawLabel} · ${scopeLabel} · ${modeLabel}${sourceLabel}`

  return (
    // The bottom bar is fixed over the page on a phone, so the composer keeps
    // a bar's worth of room under itself rather than hiding its own last row.
    <div className="pb-24 lg:pb-0">
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="min-w-0 space-y-4">
          <Step number={1} label={t('Draw from')}>
            <DrawFromChips
              label={t('Draw from')}
              value={source}
              onChange={(value) => setSource(value as DrawFrom)}
              items={[
                { value: 'all', label: t('All questions'), count: sourceCounts.all },
                { value: 'unsolved', label: t('Unsolved'), count: sourceCounts.unsolved },
                { value: 'flagged', label: t('Flagged'), count: sourceCounts.flagged },
                { value: 'incorrect', label: t('Got wrong'), count: sourceCounts.incorrect },
                { value: 'omitted', label: t('Omitted'), count: sourceCounts.omitted },
              ]}
            />
          </Step>

          {/* Folded away by default rather than always open: the option stays
              discoverable for anyone who goes looking, without a whole panel
              of cards standing between the two steps most students use. */}
          <Panel className="p-0">
            <button
              type="button"
              onClick={() => setSourceOpen((open) => !open)}
              aria-expanded={sourceOpen}
              aria-controls="question-source-body"
              className="flex w-full min-h-11 items-center gap-x-3 gap-y-1.5 p-5 text-start"
            >
              <h2 className="flex items-center gap-2 text-[14px] font-semibold text-ink">
                <span className="tnum inline-flex size-5 items-center justify-center rounded-full border border-line text-[11px] font-medium text-ink-3" aria-hidden>
                  2
                </span>
                {t('Question source')}
              </h2>
              {sourceSel.size > 0 && (
                <Badge tone="primary">{sourceSel.size} {t('selected')}</Badge>
              )}
              <Icon
                icon={ChevronDown}
                size={16}
                className={cn('ms-auto shrink-0 text-ink-3 transition-transform duration-150', !sourceOpen && '-rotate-90 rtl:rotate-90')}
              />
            </button>
            <Collapse open={sourceOpen} id="question-source-body">
              <div className="px-5 pb-5">
                <div role="group" aria-label={t('Question source')} className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {sourceCards.map((opt) => {
                    const SourceIcon = opt.bucket === 'dept-book' ? BookOpen
                      : opt.bucket === 'dept-mcq' ? ListChecks
                        : opt.bucket === 'past-paper' ? GraduationCap
                          : MoreHorizontal
                    const on = sourceSel.has(opt.bucket)
                    return (
                      <button
                        key={opt.bucket}
                        type="button"
                        aria-pressed={on}
                        onClick={() => onToggleSource(opt.bucket)}
                        className={cn(
                          'flex min-h-[44px] flex-col items-start gap-1 rounded-lg border px-3 py-2.5 text-start transition-colors',
                          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]',
                          on ? 'border-primary-line bg-primary-tint' : 'border-line-2 bg-surface hover:bg-inset/50',
                        )}
                      >
                        <Icon icon={SourceIcon} size={16} className={on ? 'text-primary-strong' : 'text-ink-3'} />
                        <span className={cn('text-[12.5px] font-semibold leading-tight', on ? 'text-primary-strong' : 'text-ink')}>
                          {t(opt.label)}
                        </span>
                        <span className={cn('tnum font-mono text-[11px]', on ? 'text-primary-strong' : 'text-ink-3')}>
                          {opt.count === 0 ? t('none yet') : `${opt.count} ${t('questions')}`}
                        </span>
                      </button>
                    )
                  })}
                </div>
                <p className="mt-2 text-[11.5px] leading-relaxed text-ink-3">
                  {sourceSel.size === 0
                    ? t('Nothing selected — questions are drawn from every source.')
                    : t('Pick more than one to draw from any of them.')}
                </p>
              </div>
            </Collapse>
          </Panel>

          <Step
            number={3}
            label={t('Scope')}
            badge={scope.size > 0 ? (
              <button
                type="button"
                onClick={() => setScope(new Set())}
                className="ms-auto text-[12px] font-medium text-primary hover:text-primary-strong"
              >
                {t('Clear')}
              </button>
            ) : undefined}
            note={scope.size === 0
              ? t('Nothing selected — questions are drawn from the whole bank.')
              : t('Pick a whole chapter, or expand it to choose individual subtopics.')}
          >
            <TopicChooser value={scope} onChange={setScope} pool={scopePool} countPool={scopeCountPool} />
          </Step>

        </div>

        <div className="min-w-0 space-y-4">
          <Step number={4} label={t('Session')}>
            <div className="space-y-5">
              <div>
                <label htmlFor="session-name" className="mb-2 block text-[12.5px] font-medium text-ink-2">{t('Name this test')}</label>
                <TextInput
                  id="session-name"
                  value={sessionName}
                  onChange={(event) => setSessionName(event.target.value)}
                  placeholder={autoSessionName}
                  maxLength={60}
                />
                <p className="mt-1.5 text-[11.5px] text-ink-3">{t('Optional. Left blank, it is named for what it covers.')}</p>
              </div>

              <div className="flex flex-wrap gap-x-10 gap-y-5">
                <div>
                  <p className="mb-2 text-[12.5px] font-medium text-ink-2">{t('Mode')}</p>
                  <Segmented
                    value={mode}
                    onChange={(value) => setMode(value as SessionMode)}
                    items={[
                      { value: 'tutor', label: t('Tutor') },
                      { value: 'timed', label: t('Timed') },
                    ]}
                  />
                  <p className="mt-2 max-w-xs text-[12px] text-ink-3">
                    {mode === 'tutor'
                      ? t('Explanations shown after each question.')
                      : t('Explanations shown at the end, with a timer.')}
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-[12.5px] font-medium text-ink-2">{t('Number of questions')}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <Segmented
                      value={lenChoice}
                      onChange={(value) => {
                        if (value === 'custom') { setCustom(true); return }
                        setCustom(false)
                        setCount(Number(value))
                      }}
                      items={[
                        { value: '5', label: '5' },
                        { value: '10', label: '10' },
                        { value: '20', label: '20' },
                        { value: '40', label: '40' },
                        { value: 'custom', label: t('Custom') },
                      ]}
                    />
                    {custom && (
                      <input
                        type="number"
                        min={1}
                        max={MAX_TEST_QUESTIONS}
                        value={count}
                        onChange={(event) => setCount(Math.min(MAX_TEST_QUESTIONS, Math.max(1, Number(event.target.value) || 1)))}
                        className="h-9 w-20 rounded-md border border-line bg-surface px-2.5 text-[13.5px] text-ink focus:border-primary focus:outline-none"
                        aria-label={t('Number of questions')}
                      />
                    )}
                  </div>
                  <p className="mt-2 text-[12px] text-ink-3">{t('Up to 40 questions per block.')}</p>
                </div>
              </div>
            </div>
            {/* The count and Start live inside this same step, under a rule, so
                the student reads one "Session" section and starts from its
                foot — not a second card that looks like another decision. */}
            <BuilderSummary embedded matching={matching} pool={pool} count={count} summary={summary} onStart={onStart} />
          </Step>
          {stats}
        </div>
      </div>
    </div>
  )
}
