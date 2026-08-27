import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useT } from '@/lib/i18n'
import { backState } from '@/components/ui/BackBar'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  X,
  Trophy,
  RotateCcw,
  Clock,
  Play,
  Pause,
  BookOpen,
  Flag,
  ExternalLink,
} from 'lucide-react'
import { getOsceDetail, getCaseDetail, getLabDetail } from '@/data/practicalContent'
import { getSubject } from '@/data/subjects'
import { Panel } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Meter } from '@/components/ui/Meter'
import { Icon } from '@/components/ui/Icon'
import { SubjectDot } from '@/components/ui/Subject'
import { cn } from '@/lib/cn'
import { useMastery } from '@/lib/useMastery'
import { CONTENT_LEDGER_STORAGE_KEY, initialManagedContent, type ManagedContentItem, type PracticalAuthoringData } from '@/data/contentControl'
import { usePersistentState } from '@/lib/usePersistentState'
import { usePracticalProgress } from '@/lib/usePracticalProgress'
import { useLivePracticals } from '@/lib/useLivePracticals'
import { useRecordAttempt } from '@/lib/useAttemptLog'
import { DIFFICULTIES } from '@/data/qbank'
import { ReportContentDialog, type ReportTarget } from '@/components/reports/ReportContentDialog'
import { MediaAttachmentView } from '@/components/ui/MediaAttachmentView'
import { PlacedAsset } from '@/components/ui/PlacedMedia'
import { ExaminerWarning } from '@/components/practical/ExaminerWarning'
import { useMediaRecords } from '@/lib/useMediaRecords'
import type { MediaRecord } from '@/data/mediaLibrary'

export type RunnerKind = 'osce' | 'case' | 'lab'

export interface RunnerTarget {
  kind: RunnerKind
  id: string
  title: string
  subjectId: string
  minutes?: number
}

function clock(seconds: number): string {
  const m = Math.floor(Math.max(0, seconds) / 60)
  const s = Math.max(0, seconds) % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

const KIND_LABEL: Record<RunnerKind, string> = {
  osce: 'OSCE station',
  case: 'Clinical case',
  lab: 'Interpretation',
}

/** Render authored practical media with the native control for its format. */
function PracticalMedia({ url, type = 'image', mimeType, name, record }: {
  url: string
  type?: 'image' | 'audio' | 'video'
  mimeType?: string
  name: string
  record?: MediaRecord
}) {
  if (record) return <PlacedAsset record={record} caption={name} />
  return <MediaAttachmentView attachment={{ id: url, type, name, url, mimeType }} />
}

function recordAt(records: Map<string, MediaRecord>, url: string): MediaRecord | undefined {
  const match = /^\/media\/([^/?#]+)$/.exec(url)
  if (!match) return undefined
  try { return records.get(decodeURIComponent(match[1])) } catch { return undefined }
}

/**
 * The intended difficulty of the question on screen.
 *
 * Shown per question rather than per item because a case runs from an easy
 * opening decision to a challenging one, and a student who misses the last step
 * should be able to see that it was the hard one.
 */
function DifficultyMark({ value }: { value?: unknown }) {
  // Seeded practicals predate per-question difficulty and carry none, so an
  // unrecognised value shows nothing rather than a wrong band.
  const tier = DIFFICULTIES.find((candidate) => candidate === value)
  if (!tier) return null
  return <Badge tone={tier === 'Easy' ? 'success' : tier === 'Moderate' ? 'warning' : 'danger'}>{tier}</Badge>
}

/**
 * The concepts one decision or interpretation question actually assesses.
 *
 * The item's own concept and anything it also assesses, and nothing else. An
 * item's `contextualConceptIds` are deliberately absent: the scenario mentions
 * them, no answer measures them, and recording them would send a student to
 * revise something this item never tested.
 */
function assessedConcepts(item: { conceptId?: string; secondaryConceptIds?: string[] }): string[] {
  return [item.conceptId ?? '', ...(item.secondaryConceptIds ?? [])].filter(Boolean)
}

/**
 * The concept tags on a stage or question, if it has any.
 *
 * The seeded demo details carry no tags at all, so a runner sees a union of a
 * tagged and an untagged shape. Reading defensively keeps an untagged item
 * silently contributing nothing rather than throwing.
 */
function taggedConcepts(item: object): string[] {
  const value = (item as { conceptIds?: unknown }).conceptIds
  return Array.isArray(value) ? value.filter((id): id is string => typeof id === 'string' && Boolean(id)) : []
}

/**
 * The authored content for a practical item.
 *
 * Reads through `usePersistentState`, not `localStorage` directly. The direct
 * read worked only in demo mode: with a backend configured the ledger lives in
 * MariaDB and localStorage is never written, so every authored station, case
 * and lab set was invisible to this runner and silently fell through to the
 * generic filler that has now been removed.
 */
function useAuthoredPractical(id: string): PracticalAuthoringData | undefined {
  const [ledger] = usePersistentState<ManagedContentItem[]>(CONTENT_LEDGER_STORAGE_KEY, initialManagedContent)
  return useMemo(() => ledger.find((item) => item.id === id)?.practicalData, [id, ledger])
}

/** What a runner shows when an item exists but has no content authored yet. */
function NothingAuthored({ target, onExit, note }: { target: RunnerTarget; onExit: () => void; note: string }) {
  return (
    <div className="mx-auto max-w-[560px]">
      <Header target={target} onExit={onExit} />
      <Panel className="p-8 text-center">
        <h2 className="font-serif text-[19px] font-semibold text-ink">Nothing to run yet</h2>
        <p className="mx-auto mt-2 max-w-sm text-[13.5px] leading-relaxed text-ink-2">{note}</p>
        <Button className="mt-5" variant="secondary" onClick={onExit}>Back to practical</Button>
      </Panel>
    </div>
  )
}

function Header({
  target,
  right,
  onExit,
}: {
  target: RunnerTarget
  right?: React.ReactNode
  onExit: () => void
}) {
  return (
    <div className="mb-5">
      <button
        onClick={onExit}
        className="mb-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-2 transition-colors hover:text-ink"
      >
        <Icon icon={ArrowLeft} size={15} />
        Back to practical
      </button>
      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="primary">{KIND_LABEL[target.kind]}</Badge>
            <span className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-ink-2">
              <SubjectDot id={target.subjectId} />
              {getSubject(target.subjectId).name}
            </span>
          </div>
          <h1 className="mt-2 font-serif text-[24px] font-semibold tracking-[-0.02em] text-ink">
            {target.title}
          </h1>
        </div>
        {right}
      </div>
    </div>
  )
}

/* ---- OSCE runner ------------------------------------------------------- */

function OsceRunner({ target, onExit }: { target: RunnerTarget; onExit: () => void }) {
  const t = useT()
  const location = useLocation()
  const authored = useAuthoredPractical(target.id)
  const staticDetail = getOsceDetail(target.id)
  const mediaRecords = useMediaRecords()
  const detail = authored?.format === 'osce' ? {
    scenario: authored.candidateInstructions,
    mediaUrl: authored.mediaUrl,
    mediaType: authored.mediaType,
    mediaMimeType: authored.mediaMimeType,
    markScheme: authored.markSections.flatMap((section) => section.items),
    markSections: authored.markSections,
    actorBrief: { opening: authored.actorOpening, identity: '', prompts: [], sections: authored.actorSections, flags: authored.actorFlags, examinerNote: undefined },
    references: authored.references,
  } : staticDetail
  const sections = detail?.markSections ?? (detail ? [{ id: 'core', title: 'Core station skills', marks: 100, items: detail.markScheme }] : [])
  const allItems = sections.flatMap((section) => section.items)
  const total = allItems.length
  const totalMarks = sections.reduce((sum, section) => sum + section.marks, 0)
  const { progress, finishStation: recordStation } = usePracticalProgress()
  const logAttempt = useRecordAttempt()
  // Resume the ticks from the last run, so leaving a station mid-way and
  // coming back does not start the mark scheme from blank.
  const [checked, setChecked] = useState<Set<string>>(() => new Set(progress.stations[target.id]?.checkedItems ?? []))
  const [seconds, setSeconds] = useState((target.minutes ?? 8) * 60)
  const [finished, setFinished] = useState(false)
  const { record } = useMastery()

  /**
   * Bank the station as an encounter with the concepts it rehearses.
   *
   * Deliberately not an accuracy claim: the student ticked their own mark
   * scheme, so the score is self-assessment. `recordEvidence` keeps this apart
   * from marked answers for exactly that reason, and the attempt log stores
   * `correct: null` for the same reason.
   */
  function finishStation() {
    if (finished) return
    setFinished(true)
    const tags = authored?.format === 'osce' ? authored.conceptTags : undefined
    const conceptIds = [...(tags?.mainConceptIds ?? []), ...(tags?.conceptIds ?? [])]
    if (conceptIds.length) record({ conceptIds, source: 'station' })
    recordStation(target.id, { marks: Math.round(earnedMarks), outOf: totalMarks, checkedItems: [...checked] })
    logAttempt({
      surface: 'station',
      itemId: target.id,
      subjectId: target.subjectId,
      topic: target.title,
      difficulty: 'Moderate',
      conceptIds,
      correct: null,
      seconds: (target.minutes ?? 8) * 60 - seconds,
      sessionId: `station-${target.id}-${Date.now().toString(36)}`,
    })
  }
  const [running, setRunning] = useState(false)
  const [tab, setTab] = useState<'candidate' | 'examiner'>('candidate')

  useEffect(() => {
    if (!running || finished || seconds <= 0) return
    const tick = setInterval(() => setSeconds((s) => s - 1), 1000)
    return () => clearInterval(tick)
  }, [finished, running, seconds])

  const earnedMarks = sections.reduce((sum, section) => sum + (section.items.length ? section.marks * (section.items.filter((item) => checked.has(item.id)).length / section.items.length) : 0), 0)
  const pct = totalMarks ? Math.round((earnedMarks / totalMarks) * 100) : 0

  if (!detail || !total) {
    return <NothingAuthored target={target} onExit={onExit} note="This station has no mark scheme authored yet. Once one is published in Practical Setup, you can run it here." />
  }

  if (finished) {
    return (
      <div className="mx-auto max-w-[560px]">
        <Header target={target} onExit={onExit} />
        <Panel className="p-6 text-center">
          <div className="mx-auto mb-3 grid size-12 place-items-center rounded-xl bg-primary-tint text-primary">
            <Icon icon={Trophy} size={24} />
          </div>
          <h2 className="font-serif text-[22px] font-semibold text-ink">Station complete</h2>
          <p className="mt-1 text-[14px] text-ink-2">
            You completed{' '}
            <span className="font-medium text-ink">
              {checked.size} of {total}
            </span>{' '}
            mark-scheme steps ({pct}%) in {clock((target.minutes ?? 8) * 60 - seconds)}.
          </p>
          <Meter value={pct} tone="primary" className="mx-auto mt-4 max-w-xs" />
          <div className="mt-6 flex justify-center gap-2">
            <Button
              variant="secondary"
              size="md"
              iconLeft={RotateCcw}
              onClick={() => {
                setChecked(new Set())
                setSeconds((target.minutes ?? 8) * 60)
                setFinished(false)
                setRunning(false)
              }}
            >
              Redo station
            </Button>
            <Button variant="primary" size="md" onClick={onExit}>
              Back to practical
            </Button>
          </div>
        </Panel>
      </div>
    )
  }

  const stationProgress = progress.stations[target.id]
  const totalSeconds = (target.minutes ?? 8) * 60
  const remainingPct = totalSeconds ? (seconds / totalSeconds) * 100 : 0

  return (
    <div>
      <Header target={target} onExit={onExit} />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
        {/* Sidebar: the clock is a fixed reference point, not tied to whichever
            tab the candidate/examiner happen to be looking at, so it lives
            outside the tabbed content instead of floating in the header. */}
        <div className="flex flex-col gap-3 lg:w-[240px] lg:shrink-0">
          <Panel className="flex flex-col items-center gap-2.5 p-4 text-center">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-ink-3">{t('Station clock')}</p>
            <p className={cn('tnum font-mono text-[40px] font-semibold leading-none tracking-[-0.02em]', seconds <= 30 ? 'text-danger' : 'text-ink')}>
              {clock(seconds)}
            </p>
            <Meter value={remainingPct} tone={seconds <= 30 ? 'danger' : 'primary'} className="w-full" />
            <div className="flex gap-1.5">
              <Button variant={running ? 'secondary' : 'primary'} size="sm" iconLeft={running ? Pause : Play} onClick={() => setRunning((value) => !value)}>{running ? 'Stop' : 'Start'}</Button>
              <Button variant="ghost" size="sm" iconLeft={RotateCcw} onClick={() => { setSeconds(totalSeconds); setRunning(false) }}>Reset</Button>
            </div>
            <div className="flex items-center gap-1 text-[10.5px] text-ink-3"><Icon icon={Clock} size={11} />{t('Turns red under 30 seconds')}</div>
          </Panel>

          {stationProgress && (
            <Panel className="px-4 py-3 text-[12px] text-ink-2">
              Best so far{' '}
              <span className="tnum font-mono font-semibold text-ink">
                {stationProgress.outOf ? Math.round((stationProgress.bestMarks / stationProgress.outOf) * 100) : 0}%
              </span>
              <span className="text-ink-3"> · {stationProgress.attempts} {stationProgress.attempts === 1 ? 'try' : 'tries'}</span>
            </Panel>
          )}

          {(detail.references?.length ?? 0) > 0 && (
            <Panel className="p-4">
              <h3 className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-ink-3">Read around it</h3>
              <ul className="mt-2.5 space-y-1.5">
                {detail.references!.map((reference) => (
                  <li key={reference}>
                    <Link
                      to={`/app/resources?q=${encodeURIComponent(reference)}`}
                      state={backState(location, 'Back to station')}
                      className="group flex min-w-0 items-center gap-2 rounded-lg border border-line bg-surface px-2.5 py-1.5 text-[12px] text-ink-2 transition-colors hover:border-primary-line hover:bg-primary-tint/30 hover:text-ink"
                    >
                      <Icon icon={BookOpen} size={13} className="shrink-0 text-ink-3" />
                      <span className="min-w-0 flex-1 truncate">{reference}</span>
                      <Icon icon={ExternalLink} size={12} className="shrink-0 text-ink-3" />
                    </Link>
                  </li>
                ))}
              </ul>
            </Panel>
          )}
        </div>

        {/* Main column */}
        <div className="min-w-0 flex-1">
          <div className="mb-3 flex border-b border-line">
            <button onClick={() => setTab('candidate')} className={cn('relative min-h-11 px-3 py-2 text-[13px] font-medium', tab === 'candidate' ? 'text-ink' : 'text-ink-3')}>Candidate{tab === 'candidate' && <span className="absolute inset-x-2 -bottom-px h-0.5 bg-primary" />}</button>
            <button onClick={() => setTab('examiner')} className={cn('relative min-h-11 px-3 py-2 text-[13px] font-medium', tab === 'examiner' ? 'text-ink' : 'text-ink-3')}>Examiner &amp; Actor{tab === 'examiner' && <span className="absolute inset-x-2 -bottom-px h-0.5 bg-primary" />}</button>
          </div>

          {tab === 'candidate' ? (
            <div className="space-y-3">
              <ExaminerWarning />
              <Panel className="p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">Candidate instructions</p>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink">{detail.scenario}</p>
                {'mediaUrl' in detail && typeof detail.mediaUrl === 'string' && detail.mediaUrl && (
                  <div className="mt-4">
                    <PracticalMedia
                      url={detail.mediaUrl}
                      type={'mediaType' in detail ? detail.mediaType : undefined}
                      mimeType={'mediaMimeType' in detail ? detail.mediaMimeType : undefined}
                      name={`${target.title} station media`}
                      record={recordAt(mediaRecords, detail.mediaUrl)}
                    />
                  </div>
                )}
              </Panel>
            </div>
          ) : (
            <div className="space-y-3">
              <Panel className="overflow-hidden">
                <div className="border-b border-line px-4 py-3"><p className="text-[12px] font-semibold uppercase tracking-[0.07em] text-ink">Actor brief</p><p className="mt-0.5 font-mono text-[10.5px] text-ink-3">For whoever is playing the patient</p></div>
                <div className="space-y-5 p-4">
                  <div><p className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-ink-3">Open with this, then stop</p><p className="mt-1 font-serif text-[17px] text-ink">{detail.actorBrief?.opening ?? 'Wait for the candidate to begin.'}</p></div>
                  {detail.actorBrief?.sections ? <div className="divide-y divide-line">{detail.actorBrief.sections.map((section) => <div key={section.id} className="py-2.5"><p className="text-[10px] font-bold uppercase tracking-[0.08em] text-ink-3">{section.label}</p><p className="mt-1 max-w-3xl text-[12.5px] leading-relaxed text-ink-2">{section.content}</p></div>)}</div> : <><div><p className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-ink-3">Who you are</p><p className="mt-1 max-w-3xl text-[13px] leading-relaxed text-ink-2">{detail.actorBrief?.identity ?? 'Answer in role and offer only information that is asked for.'}</p></div><div className="divide-y divide-line">{detail.actorBrief?.prompts.map((prompt) => <div key={prompt.label} className="py-2.5"><p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-ink-3">{prompt.label}</p><p className="mt-1 text-[12.5px] text-ink-2">“{prompt.response}”</p></div>)}</div></>}
                  {(detail.actorBrief?.flags ?? (detail.actorBrief?.examinerNote ? [detail.actorBrief.examinerNote] : [])).map((flag) => <div key={flag} className="flex gap-3 rounded-lg border border-primary/40 bg-primary-tint/50 p-3 text-[12px] leading-relaxed text-ink-2"><Icon icon={Flag} size={15} className="mt-0.5 text-primary" /><span>{flag}</span></div>)}
                </div>
              </Panel>

              <Panel className="overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
                  <h3 className="font-sans text-[13px] font-semibold text-ink">Mark scheme</h3>
                  <div className="flex items-baseline gap-2.5">
                    <span className="tnum font-mono text-[24px] font-semibold leading-none text-primary-strong">{pct}%</span>
                    <span className="text-[11px] text-ink-3">{checked.size} of {total} scoring points · pass mark 65%</span>
                  </div>
                </div>
                <div className="px-4 pt-3"><Meter value={pct} tone="primary" /></div>
                {/* Ticking updates the live score above — weighted by section,
                    not by raw item count, so a light section can't outweigh a
                    heavy one. */}
                <div className="columns-1 gap-x-6 px-2 py-2 sm:columns-2">
                  {sections.map((section) => <section key={section.id} className="break-inside-avoid px-2 py-2"><div className="mb-1 flex items-center justify-between gap-3"><h4 className="text-[13px] font-bold text-ink">{section.title}</h4><span className="font-mono text-[11px] font-semibold text-warning">{section.marks} marks</span></div><ul>{section.items.map((m) => {
                    const done = checked.has(m.id)
                    return (
                      <li key={m.id}>
                        <button
                          onClick={() =>
                            setChecked((prev) => {
                              const next = new Set(prev)
                              if (next.has(m.id)) next.delete(m.id)
                              else next.add(m.id)
                              return next
                            })
                          }
                          className="group flex w-full items-start gap-3 rounded-md px-2 py-2 text-start transition-colors hover:bg-inset"
                        >
                          <span
                            className={cn(
                              'mt-px grid size-[18px] shrink-0 place-items-center rounded-[5px] border transition-colors',
                              done ? 'border-primary bg-primary' : 'border-line-2 bg-surface group-hover:border-ink-3',
                            )}
                          >
                            {done && <Icon icon={Check} size={12} strokeWidth={2.5} className="text-on-primary" />}
                          </span>
                          <span className={cn('text-[13.5px] leading-snug', done ? 'text-ink-2' : 'text-ink')}>
                            {m.text}
                          </span>
                        </button>
                      </li>
                    )
                  })}</ul></section>)}
                </div>
                <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-3">
                  <Button variant="ghost" size="sm" iconLeft={RotateCcw} onClick={() => setChecked(new Set())}>Reset ticks</Button>
                  <Button variant="primary" size="sm" iconRight={Trophy} onClick={finishStation}>
                    Finish station
                  </Button>
                </div>
              </Panel>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ---- Case runner ------------------------------------------------------- */

function CaseRunner({ target, onExit }: { target: RunnerTarget; onExit: () => void }) {
  const location = useLocation()
  const authored = useAuthoredPractical(target.id)
  const staticDetail = getCaseDetail(target.id)
  const mediaRecords = useMediaRecords()
  const detail = authored?.format === 'case' ? {
    stages: authored.decisions.map((decision) => ({ title: decision.title, context: decision.context, question: decision.question, prompt: decision.question, mediaUrl: decision.mediaUrl, mediaType: decision.mediaType, mediaMimeType: decision.mediaMimeType, options: decision.answers.filter((answer) => answer.text.trim()).map((answer) => answer.text), optionExplanations: decision.answers.filter((answer) => answer.text.trim()).map((answer) => answer.explanation), correctIndex: decision.answers.filter((answer) => answer.text.trim()).findIndex((answer) => answer.correct), answer: decision.rationale, difficulty: decision.difficulty, conceptIds: assessedConcepts(decision) })),
    debrief: authored.debrief,
    references: authored.references,
  } : staticDetail
  // A stage with no options is not a question. The runner used to invent three
  // — "Take a structured <title> approach now" and two obviously wrong ones —
  // and mark the invented first option correct.
  const stages = (detail?.stages ?? []).filter((item) => (item.options?.length ?? 0) > 0)
  const { record, } = useMastery()
  const { advanceCase } = usePracticalProgress()
  const logAttempt = useRecordAttempt()
  const [sessionId] = useState(() => `case-${target.id}-${Date.now().toString(36)}`)
  const [idx, setIdx] = useState(0)
  const [choices, setChoices] = useState<Record<number, number>>({})
  const [debrief, setDebrief] = useState(false)
  const stage = stages[idx]
  const last = idx === stages.length - 1
  const options = stage?.options ?? []
  const correctIndex = stage?.correctIndex ?? -1
  const selected = choices[idx]
  const revealed = selected != null

  /**
   * Record what this decision demonstrated, once, at the moment it is answered.
   *
   * Guarded on the decision not already having been answered, so returning to a
   * decision with Previous cannot bank a second attempt for the same work. A
   * stage whose author marked no option correct records the encounter without
   * claiming an accuracy, rather than treating the first option as right.
   */
  function recordDecision(optionIndex: number) {
    if (choices[idx] != null || !stage) return
    const conceptIds = taggedConcepts(stage)
    const correct = correctIndex >= 0 ? optionIndex === correctIndex : null
    if (conceptIds.length && correct !== null) record({ conceptIds, source: 'case', correct })
    logAttempt({
      surface: 'case',
      itemId: `${target.id}:${idx}`,
      subjectId: target.subjectId,
      topic: target.title,
      difficulty: 'Moderate',
      conceptIds,
      correct,
      seconds: null,
      sessionId,
    })
    advanceCase(target.id, { lastStep: idx + 1, steps: stages.length, completed: idx + 1 >= stages.length })
  }

  if (!stages.length) {
    return <NothingAuthored target={target} onExit={onExit} note="This case has no decision points authored yet. Once they are published in Practical Setup, you can work through it here." />
  }

  if (debrief) {
    return (
      <div>
        <Header target={target} onExit={onExit} />
        <Panel className="overflow-hidden">
          <div className="border-b border-line px-5 py-4"><p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-primary">Case debrief</p><h2 className="mt-1 font-serif text-[22px] font-semibold text-ink">See the debrief</h2>{detail?.debrief && <p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-ink-2">{detail.debrief}</p>}</div>
          <div className="divide-y divide-line px-5">{stages.map((decision, decisionIndex) => <div key={decision.title} className="grid gap-2 py-4 sm:grid-cols-[9rem_1fr]"><p className="font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3">Decision {decisionIndex + 1}</p><div><p className="text-[13px] font-medium text-ink">{decision.prompt}</p><p className="mt-1 text-[12.5px] leading-relaxed text-ink-2">{decision.answer}</p></div></div>)}</div>
        </Panel>
        {/* Only real, authored references. A placeholder "Relevant clinical
            guideline" rendered as a link to a search for that phrase. */}
        {(detail?.references?.length ?? 0) > 0 && <Panel className="mt-4 p-4"><h3 className="text-[13px] font-semibold text-ink">Read around it</h3><ul className="mt-2 divide-y divide-line">{(detail!.references ?? []).map((reference) => <li key={reference}><Link to={`/app/resources?q=${encodeURIComponent(reference)}`} state={backState(location, 'Back to case')} className="group flex items-start gap-2.5 py-2.5 text-[12.5px] leading-snug text-ink-2 hover:text-ink"><span className="grid size-7 shrink-0 place-items-center rounded-md bg-inset"><Icon icon={BookOpen} size={14} className="text-ink-3" /></span><span className="min-w-0 flex-1">{reference}<span className="mt-0.5 block text-[10.5px] text-ink-3">Open at the relevant page</span></span><Icon icon={ExternalLink} size={14} className="mt-1 text-ink-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link></li>)}</ul></Panel>}
        <Button className="mt-4" variant="primary" onClick={onExit}>Finish case</Button>
      </div>
    )
  }

  return (
    <div>
      <Header target={target} onExit={onExit} />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
        <div className="min-w-0 flex-1">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-[13px] font-medium text-ink-2">
              Decision <span className="tnum font-mono text-ink">{idx + 1}</span> of {stages.length}
            </span>
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-inset">
              <div
                className="h-full rounded-full bg-primary transition-[width] duration-300"
                style={{ width: `${((idx + 1) / stages.length) * 100}%` }}
              />
            </div>
          </div>

          <Panel className="p-5 sm:p-6">
            <div className="flex items-center gap-2"><p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-primary">{stage.title}</p><DifficultyMark value={'difficulty' in stage ? stage.difficulty : undefined} /></div>
            {stage.context && <p className="mt-3 max-w-3xl text-[15px] leading-[1.7] text-ink-2">{stage.context}</p>}
            {'mediaUrl' in stage && typeof stage.mediaUrl === 'string' && stage.mediaUrl && (
              <div className="mt-4">
                <PracticalMedia
                  url={stage.mediaUrl}
                  type={'mediaType' in stage && (stage.mediaType === 'image' || stage.mediaType === 'audio' || stage.mediaType === 'video') ? stage.mediaType : undefined}
                  mimeType={'mediaMimeType' in stage && typeof stage.mediaMimeType === 'string' ? stage.mediaMimeType : undefined}
                  name={stage.title ?? 'Case media'}
                  record={recordAt(mediaRecords, stage.mediaUrl)}
                />
              </div>
            )}
            <h2 className="mt-4 font-sans text-[18px] font-semibold tracking-[-0.01em] text-ink">{stage.question ?? stage.prompt}</h2>

            <div className="mt-5 space-y-2">{options.map((option, optionIndex) => {
              const correct = optionIndex === correctIndex
              return <div key={option} className={cn('overflow-hidden rounded-lg border transition-colors', !revealed && 'border-line bg-surface hover:border-primary-line', revealed && correct && 'border-success bg-success-tint', revealed && selected === optionIndex && !correct && 'border-danger bg-danger-tint', revealed && !correct && selected !== optionIndex && 'border-line opacity-65')}><button disabled={revealed} onClick={() => { setChoices((current) => ({ ...current, [idx]: optionIndex })); recordDecision(optionIndex) }} className="flex w-full items-start gap-3 p-3 text-start text-[13.5px]"><span className="grid size-6 shrink-0 place-items-center rounded-full border border-line-2 font-mono text-[11px]">{String.fromCharCode(65 + optionIndex)}</span><span>{option}</span></button>{revealed && stage.optionExplanations?.[optionIndex] && <p className="border-t border-current/10 px-12 py-2.5 text-[12px] leading-relaxed text-ink-2">{stage.optionExplanations[optionIndex]}</p>}</div>
            })}</div>
            {revealed && <div className="mt-4 rounded-lg border border-primary-line bg-primary-tint/50 p-4"><p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-primary-strong">Decision rationale</p><p className="mt-1.5 text-[14px] leading-relaxed text-ink">{stage.answer}</p></div>}

            <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
              <Button
                variant="ghost"
                size="md"
                iconLeft={ArrowLeft}
                disabled={idx === 0}
                onClick={() => setIdx((i) => Math.max(0, i - 1))}
              >
                Previous
              </Button>
              {last ? (
                <Button variant="primary" size="md" onClick={() => setDebrief(true)} disabled={!revealed}>
                  See the debrief
                </Button>
              ) : (
                <Button variant="primary" size="md" iconRight={ArrowRight} onClick={() => setIdx((i) => i + 1)} disabled={!revealed}>
                  Next decision
                </Button>
              )}
            </div>
          </Panel>
        </div>

        {/* Case path: built from the real stages/choices state, not a
            standalone list — a stage reads as answered only once its own
            option has actually been picked, and "correct" only when the
            author marked one. */}
        <div className="flex flex-col gap-3 lg:w-[240px] lg:shrink-0">
          <Panel className="p-4">
            <h3 className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-ink-3">Case path</h3>
            <ol className="mt-3">
              {stages.map((s, i) => {
                const done = choices[i] != null
                const current = i === idx
                const stageCorrect = done && (s.correctIndex ?? -1) >= 0 ? choices[i] === s.correctIndex : null
                return (
                  <li key={s.title} className="flex gap-2.5">
                    <div className="flex flex-col items-center">
                      <span
                        className={cn(
                          'grid size-[20px] shrink-0 place-items-center rounded-full',
                          done ? (stageCorrect === false ? 'bg-danger' : 'bg-success') : current ? 'border-2 border-primary bg-primary-tint' : 'border border-line-2',
                        )}
                      >
                        {done ? (
                          <Icon icon={stageCorrect === false ? X : Check} size={11} strokeWidth={3} className={stageCorrect === false ? 'text-on-danger' : 'text-on-success'} />
                        ) : current ? (
                          <span className="size-1.5 rounded-full bg-primary" />
                        ) : null}
                      </span>
                      {i < stages.length - 1 && <span className="my-0.5 w-px flex-1 bg-line" />}
                    </div>
                    <div className={cn('min-w-0', i < stages.length - 1 ? 'pb-4' : 'pb-0.5')}>
                      <p className={cn('text-[12.5px] font-medium', current ? 'text-primary-strong' : done ? 'text-ink' : 'text-ink-3')}>{s.title}</p>
                      <p className="mt-0.5 text-[10.5px] text-ink-3">
                        {current ? 'You are here' : done ? (stageCorrect === false ? 'Answered' : stageCorrect ? 'Answered correctly' : 'Answered') : 'Locked'}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ol>
          </Panel>

          {detail?.debrief && (
            <Panel className="p-4">
              <h3 className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-ink-3">What the debrief will cover</h3>
              <p className="mt-2 text-[12px] leading-relaxed text-ink-2">Every decision with its rationale, and the references below.</p>
            </Panel>
          )}
        </div>
      </div>
    </div>
  )
}

/* ---- Lab runner -------------------------------------------------------- */

/**
 * Where the current set sits among the student's other lab/imaging sets.
 *
 * The runner otherwise shows progress on this one set in isolation; a student
 * partway through several sets has no way to see that from inside one of them.
 * Both the sibling list and the done counts come straight from the same hooks
 * the "Lab & imaging" tab itself reads, so there is nothing here that could
 * disagree with that tab.
 */
function LabSetsStrip({ currentId }: { currentId: string }) {
  const { labImaging } = useLivePracticals()
  const { progress } = usePracticalProgress()
  if (labImaging.length <= 1) return null
  return (
    <div className="mb-4 flex flex-wrap items-center gap-1.5">
      <span className="me-1 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-ink-3">Your sets</span>
      {labImaging.map((l) => {
        const done = progress.labs[l.id]?.done ?? 0
        const isCurrent = l.id === currentId
        return (
          <span
            key={l.id}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11.5px] font-medium',
              isCurrent ? 'border-primary-line bg-primary-tint text-primary-strong' : 'border-line-2 bg-surface text-ink-2',
            )}
          >
            {l.title}
            <span className="tnum font-mono text-[10.5px] opacity-80">{done}/{l.items}</span>
          </span>
        )
      })}
    </div>
  )
}

function LabRunner({ target, onExit }: { target: RunnerTarget; onExit: () => void }) {
  const authored = useAuthoredPractical(target.id)
  const staticDetail = getLabDetail(target.id)
  const mediaRecords = useMediaRecords()
  const detail = authored?.format === 'lab' ? {
    questions: authored.questions.map((question) => ({ stem: question.question, context: question.context, question: question.question, mediaUrl: question.mediaUrl, mediaType: question.mediaType, mediaMimeType: question.mediaMimeType, options: question.answers.filter((answer) => answer.text.trim()).map((answer) => ({ text: answer.text, correct: answer.correct, explanation: answer.explanation })), explanation: question.explanation, difficulty: question.difficulty, conceptIds: assessedConcepts(question) })),
  } : staticDetail
  // A question with no options cannot be answered; showing it would be a dead end.
  const qs = (detail?.questions ?? []).filter((question) => question.options.length > 0)
  const { record } = useMastery()
  const { advanceLab } = usePracticalProgress()
  const logAttempt = useRecordAttempt()
  const [sessionId] = useState(() => `lab-${target.id}-${Date.now().toString(36)}`)
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [checked, setChecked] = useState<Set<number>>(new Set())
  const [finished, setFinished] = useState(false)
  const [reportTarget, setReportTarget] = useState<ReportTarget | null>(null)

  const q = qs[idx]
  const mediaUrl = q && 'mediaUrl' in q && typeof q.mediaUrl === 'string' ? q.mediaUrl : ''
  const mediaType = q && 'mediaType' in q && (q.mediaType === 'image' || q.mediaType === 'audio' || q.mediaType === 'video') ? q.mediaType : undefined
  const mediaMimeType = q && 'mediaMimeType' in q && typeof q.mediaMimeType === 'string' ? q.mediaMimeType : undefined
  const revealed = checked.has(idx)
  const chosen = answers[idx]
  const last = idx === qs.length - 1

  /** Record what this question demonstrated, once, when its answer is checked. */
  function checkAnswer() {
    setChecked((prev) => new Set(prev).add(idx))
    if (revealed || chosen == null || !q) return
    const conceptIds = taggedConcepts(q)
    const correct = Boolean(q.options[chosen]?.correct)
    if (conceptIds.length) record({ conceptIds, source: 'interpretation', correct })
    logAttempt({
      surface: 'lab',
      itemId: `${target.id}:${idx}`,
      subjectId: target.subjectId,
      topic: target.title,
      difficulty: 'Moderate',
      conceptIds,
      correct,
      seconds: null,
      sessionId,
    })
    advanceLab(target.id, { done: checked.size + 1, items: qs.length })
  }

  if (!qs.length) {
    return <NothingAuthored target={target} onExit={onExit} note="This set has no questions authored yet. Once they are published in Practical Setup, you can work through it here." />
  }

  if (finished) {
    const correct = qs.filter((qq, i) => qq.options[answers[i]]?.correct).length
    const pct = Math.round((correct / qs.length) * 100)
    return (
      <div className="mx-auto max-w-[560px]">
        <Header target={target} onExit={onExit} />
        <Panel className="p-6 text-center">
          <div className="mx-auto mb-3 grid size-12 place-items-center rounded-xl bg-primary-tint text-primary">
            <Icon icon={Trophy} size={24} />
          </div>
          <h2 className="font-serif text-[22px] font-semibold text-ink">Set complete</h2>
          <p className="mt-1 text-[14px] text-ink-2">
            You scored{' '}
            <span className="font-medium text-ink">
              {correct} of {qs.length}
            </span>{' '}
            ({pct}%).
          </p>
          <Meter value={pct} tone="primary" className="mx-auto mt-4 max-w-xs" />
          <div className="mt-6 flex justify-center">
            <Button variant="primary" size="md" onClick={onExit}>
              Back to practical
            </Button>
          </div>
        </Panel>
      </div>
    )
  }

  function optionClasses(i: number) {
    if (!revealed)
      return chosen === i ? 'border-primary bg-primary-tint/50' : 'border-line bg-surface hover:border-line-2'
    if (q.options[i].correct) return 'border-success bg-success-tint'
    if (chosen === i) return 'border-danger bg-danger-tint'
    return 'border-line bg-surface opacity-70'
  }

  const hasMedia = Boolean(mediaUrl)

  return (
    <div>
      <Header target={target} onExit={onExit} />
      <LabSetsStrip currentId={target.id} />

      <div className="mb-4 flex items-center gap-3">
        <span className="text-[13px] font-medium text-ink-2">
          Question <span className="tnum font-mono text-ink">{idx + 1}</span> of {qs.length}
        </span>
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-inset">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-300"
            style={{ width: `${((idx + 1) / qs.length) * 100}%` }}
          />
        </div>
      </div>

      {/* With media the viewer and the question sit side by side, matching how
          much room each needs. With none — most interpretation questions are
          text-only vitals/labs/ABGs — the media column simply doesn't exist,
          so the question card is not left stranded next to empty space. */}
      <div className={cn('flex flex-col gap-4', hasMedia && 'lg:flex-row lg:items-start')}>
        {hasMedia && (
          <div className="min-w-0 lg:flex-1">
            <Panel className="overflow-hidden">
              <div className="flex items-center justify-between gap-2 border-b border-line px-4 py-2.5">
                <span className="text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">Media</span>
                <Button variant="ghost" size="sm" iconLeft={Flag} onClick={() => setReportTarget({ kind: 'image', id: `${target.id}-${idx}`, title: `${target.title} · media ${idx + 1}` })}>Report media</Button>
              </div>
              <div className="p-3">
                <PracticalMedia url={mediaUrl} type={mediaType} mimeType={mediaMimeType} name={`${target.title} · media ${idx + 1}`} record={recordAt(mediaRecords, mediaUrl)} />
              </div>
            </Panel>
          </div>
        )}

        <div className={cn('min-w-0', hasMedia ? 'lg:w-[400px] lg:shrink-0' : 'flex-1 lg:mx-auto lg:max-w-[640px]')}>
          <Panel className="p-5 sm:p-6">
            {q.context && <p className="mb-3 text-[14.5px] leading-relaxed text-ink-2">{q.context}</p>}
            <div className="flex items-start gap-2"><p className="flex-1 text-[16px] font-semibold leading-snug text-ink">{q.question ?? q.stem}</p><DifficultyMark value={'difficulty' in q ? q.difficulty : undefined} /></div>
            <div className="mt-4 space-y-2.5">
              {q.options.map((opt, i) => (
                <div key={i}>
                  <button
                    disabled={revealed}
                    onClick={() => setAnswers((a) => ({ ...a, [idx]: i }))}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-lg border p-3 text-start transition-colors',
                      optionClasses(i),
                    )}
                  >
                    <span
                      className={cn(
                        'grid size-6 shrink-0 place-items-center rounded-full border text-[12px] font-semibold',
                        revealed && opt.correct
                          ? 'border-success bg-success text-on-success'
                          : revealed && chosen === i
                            ? 'border-danger bg-danger text-on-danger'
                            : chosen === i
                              ? 'border-primary bg-primary text-on-primary'
                              : 'border-line-2 text-ink-2',
                      )}
                    >
                      {revealed && opt.correct ? (
                        <Icon icon={Check} size={14} strokeWidth={2.6} />
                      ) : revealed && chosen === i ? (
                        <Icon icon={X} size={14} strokeWidth={2.6} />
                      ) : (
                        ['A', 'B', 'C', 'D'][i]
                      )}
                    </span>
                    <span className="flex-1 text-[14px] text-ink">{opt.text}</span>
                  </button>
                  {revealed && opt.explanation && <p className="border-x border-b border-line px-12 py-2.5 text-[12px] leading-relaxed text-ink-2">{opt.explanation}</p>}
                </div>
              ))}
            </div>

            {revealed && (
              <div className="mt-4 rounded-lg border border-line bg-surface-2 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">Explanation</p>
                <p className="mt-1.5 text-[14px] leading-relaxed text-ink">{q.explanation}</p>
              </div>
            )}

            <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
              <Button
                variant="ghost"
                size="md"
                iconLeft={ArrowLeft}
                disabled={idx === 0}
                onClick={() => setIdx((i) => Math.max(0, i - 1))}
              >
                Previous
              </Button>
              {!revealed ? (
                <Button
                  variant="primary"
                  size="md"
                  disabled={chosen == null}
                  onClick={checkAnswer}
                >
                  Check answer
                </Button>
              ) : last ? (
                <Button variant="primary" size="md" iconRight={Trophy} onClick={() => setFinished(true)}>
                  See results
                </Button>
              ) : (
                <Button variant="primary" size="md" iconRight={ArrowRight} onClick={() => setIdx((i) => i + 1)}>
                  Next
                </Button>
              )}
            </div>
          </Panel>
        </div>
      </div>
      <ReportContentDialog open={Boolean(reportTarget)} target={reportTarget} onClose={() => setReportTarget(null)} />
    </div>
  )
}

export function PracticalRunner({ target, onExit }: { target: RunnerTarget; onExit: () => void }) {
  return (
    <div className="mx-auto max-w-[1040px] px-4 py-6 sm:px-6">
      {target.kind === 'osce' && <OsceRunner target={target} onExit={onExit} />}
      {target.kind === 'case' && <CaseRunner target={target} onExit={onExit} />}
      {target.kind === 'lab' && <LabRunner target={target} onExit={onExit} />}
    </div>
  )
}
