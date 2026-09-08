import { ContentSkeleton } from '@/components/loading/PageSkeleton'
import { useMemo, useState } from 'react'
import { BookOpen, ChevronRight, Crosshair, FileText, ListChecks, PenLine, Shuffle, TextCursorInput } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { WRITTEN_GUIDE } from '@/data/writtenGuide'
import { coveredCount, type EssayQuestion as EssayQuestionData } from '@/data/essay'
import { useLiveEssays } from '@/lib/useLiveEssays'
import { useEssayAnswers } from '@/lib/useEssayAnswers'
import { useCatalogueAvailability } from '@/lib/useCatalogueAvailability'
import { useLocalPreference } from '@/lib/useLocalPreference'
import { useT } from '@/lib/i18n'
import { subjects } from '@/data/subjects'
import { useSubjectName } from '@/lib/useSubjectName'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { CatalogueUnavailable } from '@/components/ui/CatalogueUnavailable'
import { SystemMark } from '@/components/ui/SystemMark'
import { EssayRunner } from '@/components/essay/EssayRunner'
import { WrittenRunner } from '@/components/written/WrittenRunner'
import {
  useLiveCompletionQuestions, useLiveLabelingQuestions, useLiveMatchingQuestions,
  useLiveMultiResponseQuestions, useLiveWrittenQuestions,
} from '@/lib/useLiveWrittenQuestions'
import { CompletionRunner } from '@/components/written/CompletionRunner'
import type { CompletionQuestionView } from '@/data/completionQuestion'
import { MultiResponseRunner } from '@/components/written/MultiResponseRunner'
import { LabelingRunner } from '@/components/written/LabelingRunner'
import type { MultiResponseQuestionView } from '@/data/multiResponseQuestion'
import type { LabelingQuestionView } from '@/data/labelingQuestion'
import { MatchingRunner } from '@/components/written/MatchingRunner'
import type { MatchingQuestionView } from '@/data/matchingQuestion'
import { useWrittenAnswers } from '@/lib/useWrittenAnswers'
import { markWritten, writtenFullyMarked, type WrittenQuestion } from '@/data/writtenQuestion'
import { cn } from '@/lib/cn'

/** The guide is data so the same list cannot drift between surfaces; every line still goes through `t()` here. */
function Guide() {
  const t = useT()
  const [open, setOpen] = useLocalPreference('nishany.essay.guideOpen', true)
  return (
    <Panel className="mb-5 overflow-hidden">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="flex min-h-11 w-full items-center gap-2.5 px-4 py-3 text-start transition-colors hover:bg-inset/60 sm:min-h-0"
      >
        <Icon icon={ChevronRight} size={15} className="text-ink-3 chevron-turn" open={open} />
        <Icon icon={BookOpen} size={16} className="text-ink-3" />
        <h2 className="font-serif text-[15px] font-semibold text-ink">{t('How to answer a written question')}</h2>
      </button>
      {open && (
        <ul className="grid gap-3 border-t border-line p-4 sm:grid-cols-2">
          {WRITTEN_GUIDE.map((item) => (
            <li key={item.title}>
              <p className="text-[13px] font-semibold text-ink">{t(item.title)}</p>
              <p className="mt-0.5 text-[12.5px] leading-relaxed text-ink-2">{t(item.body)}</p>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  )
}

/** Where a student is with one question: never started, drafted, or self-marked. */
function EssayRow({ essay, onOpen }: { essay: EssayQuestionData; onOpen: () => void }) {
  const t = useT()
  const { answers } = useEssayAnswers()
  const answer = answers[essay.id]
  const covered = coveredCount(answer?.ticked ?? null, essay.keyPoints.map((point) => point.id))

  const status = covered
    ? { tone: 'success' as const, label: t('Marked'), cta: t('Review') }
    : answer?.text.trim()
      ? { tone: 'primary' as const, label: t('Draft saved'), cta: t('Continue') }
      : { tone: 'neutral' as const, label: t('Not started'), cta: t('Start') }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen() } }}
      className="flex cursor-pointer flex-wrap items-center gap-x-4 gap-y-3 px-4 py-3.5 transition-colors hover:bg-inset/60 focus-visible:bg-inset focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--color-primary)]"
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-md border border-line bg-surface-2 text-ink-2">
        <Icon icon={PenLine} size={18} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[14px] font-medium text-ink">{essay.title}</p>
        {covered && (
          <p className="mt-0.5 text-[12px] text-ink-3 tnum">
            {t('{covered} of {total} points covered')
              .replace('{covered}', String(covered.covered))
              .replace('{total}', String(covered.total))}
          </p>
        )}
      </div>
      <Badge tone={status.tone}>{status.label}</Badge>
      <Button
        variant={status.tone === 'neutral' ? 'primary' : 'secondary'}
        size="sm"
        onClick={(e) => { e.stopPropagation(); onOpen() }}
      >
        {status.cta}
      </Button>
    </div>
  )
}


/**
 * One written exam question — the written half of a faculty paper.
 *
 * Listed beside essays because a student looking for written practice looks in
 * one place, and told apart by its marks: an essay is an exercise authored
 * here, while this carries the parts and the marks the paper itself printed.
 */
function WrittenRow({ question, onOpen }: { question: WrittenQuestion; onOpen: () => void }) {
  const t = useT()
  const { answers } = useWrittenAnswers()
  const answer = answers[question.id]
  const score = markWritten(answer?.ticks ?? null, question.parts)
  const marked = score && writtenFullyMarked(answer?.ticks ?? null, question.parts)
  const wrote = Object.values(answer?.text ?? {}).some((value) => value.trim())

  const status = marked
    ? { tone: 'success' as const, label: t('Marked'), cta: t('Review') }
    : wrote
      ? { tone: 'primary' as const, label: t('Draft saved'), cta: t('Continue') }
      : { tone: 'neutral' as const, label: t('Not started'), cta: t('Start') }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen() } }}
      className="flex cursor-pointer flex-wrap items-center gap-x-4 gap-y-3 px-4 py-3.5 transition-colors hover:bg-inset/60 focus-visible:bg-inset focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--color-primary)]"
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-md border border-line bg-surface-2 text-ink-2">
        <Icon icon={FileText} size={18} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[14px] font-medium text-ink">{question.title}</p>
        <p className="mt-0.5 tnum text-[12px] text-ink-3">
          {marked && score
            ? t('{marks} of {outOf} marks')
                .replace('{marks}', String(Math.round(score.marks * 100) / 100))
                .replace('{outOf}', String(score.outOf))
            : t('{parts} parts · {marks} marks')
                .replace('{parts}', String(question.parts.length))
                .replace('{marks}', String(question.totalMarks))}
        </p>
      </div>
      <Badge tone={status.tone}>{status.label}</Badge>
      <Button
        variant={status.tone === 'neutral' ? 'primary' : 'secondary'}
        size="sm"
        onClick={(e) => { e.stopPropagation(); onOpen() }}
      >
        {status.cta}
      </Button>
    </div>
  )
}


/**
 * One format's list of questions.
 *
 * Written out five times over as five formats arrived, which is four times too
 * many for markup that only differs by an icon and a subtitle.
 */
function FormatSection<T extends { id: string; title: string }>({
  title, blurb, icon, items, subtitle, onOpen,
}: {
  title: string
  blurb: string
  icon: LucideIcon
  items: T[]
  subtitle: (item: T) => string
  onOpen: (item: T) => void
}) {
  const t = useT()
  if (!items.length) return null
  return (
    <section>
      <h2 className="mb-2 font-serif text-[16px] font-semibold text-ink">{title}</h2>
      <p className="mb-3 text-[12.5px] leading-relaxed text-ink-2">{blurb}</p>
      <Panel className="overflow-hidden">
        <ul className="divide-y divide-line">
          {items.map((item) => (
            <li key={item.id}>
              <div
                role="button"
                tabIndex={0}
                onClick={() => onOpen(item)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(item) } }}
                className="flex cursor-pointer flex-wrap items-center gap-x-4 gap-y-3 px-4 py-3.5 transition-colors hover:bg-inset/60 focus-visible:bg-inset focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--color-primary)]"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-md border border-line bg-surface-2 text-ink-2">
                  <Icon icon={icon} size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-medium text-ink">{item.title}</p>
                  <p className="mt-0.5 tnum text-[12px] text-ink-3">{subtitle(item)}</p>
                </div>
                <Button variant="primary" size="sm" onClick={(e) => { e.stopPropagation(); onOpen(item) }}>
                  {t('Start')}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Panel>
    </section>
  )
}

/** Published essays, divided by system — the same shape every practical tab groups by. */
function EssayList({ essays, onOpen }: { essays: EssayQuestionData[]; onOpen: (essay: EssayQuestionData) => void }) {
  const subjectName = useSubjectName()
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set())
  const groups = useMemo(() => {
    const buckets = new Map<string, EssayQuestionData[]>()
    for (const essay of essays) {
      const key = essay.subjectId || 'unfiled'
      const bucket = buckets.get(key)
      if (bucket) bucket.push(essay)
      else buckets.set(key, [essay])
    }
    const known = subjects.map((subject) => subject.id).filter((id) => buckets.has(id))
    const rest = [...buckets.keys()].filter((key) => !known.includes(key)).sort()
    return [...known, ...rest].map((key) => ({ key, items: buckets.get(key)! }))
  }, [essays])

  return (
    <div className="space-y-3">
      {groups.map((group) => {
        const isCollapsed = collapsed.has(group.key)
        return (
          <Panel key={group.key} className="overflow-hidden">
            <button
              type="button"
              aria-expanded={!isCollapsed}
              onClick={() => setCollapsed((current) => {
                const next = new Set(current)
                if (!next.delete(group.key)) next.add(group.key)
                return next
              })}
              className="flex w-full items-center gap-2.5 border-b border-line bg-surface-2/50 px-4 py-2.5 text-start transition-colors hover:bg-inset/60"
            >
              <Icon icon={ChevronRight} size={15} className={cn('text-ink-3 chevron-turn')} open={!isCollapsed} />
              <SystemMark subjectId={group.key} />
              <h2 className="font-serif text-[15.5px] font-semibold text-ink">{subjectName(group.key)}</h2>
              <span className="tnum ms-auto font-mono text-[11px] text-ink-3">{group.items.length}</span>
            </button>
            {!isCollapsed && (
              <ul className="divide-y divide-line">
                {group.items.map((essay) => <li key={essay.id}><EssayRow essay={essay} onOpen={() => onOpen(essay)} /></li>)}
              </ul>
            )}
          </Panel>
        )
      })}
    </div>
  )
}

export function EssayQuestions() {
  const t = useT()
  const essays = useLiveEssays()
  const written = useLiveWrittenQuestions()
  const matching = useLiveMatchingQuestions()
  const multi = useLiveMultiResponseQuestions()
  const labeling = useLiveLabelingQuestions()
  const completion = useLiveCompletionQuestions()
  const availability = useCatalogueAvailability(
    essays.length + written.length + matching.length + multi.length
    + labeling.length + completion.length,
  )
  const [active, setActive] = useState<EssayQuestionData | null>(null)
  const [activeWritten, setActiveWritten] = useState<WrittenQuestion | null>(null)
  const [activeMatching, setActiveMatching] = useState<MatchingQuestionView | null>(null)
  const [activeMulti, setActiveMulti] = useState<MultiResponseQuestionView | null>(null)
  const [activeLabeling, setActiveLabeling] = useState<LabelingQuestionView | null>(null)
  const [activeCompletion, setActiveCompletion] = useState<CompletionQuestionView | null>(null)

  if (active) {
    // Keyed by question: without it, a future "next question" control would
    // reconcile in place and carry the revealed stage — and so the next
    // question's model answer — straight over an unattempted one.
    return <EssayRunner key={active.id} essay={active} onExit={() => setActive(null)} />
  }

  if (activeWritten) {
    return <WrittenRunner key={activeWritten.id} question={activeWritten} onExit={() => setActiveWritten(null)} />
  }

  if (activeMatching) {
    return <MatchingRunner key={activeMatching.id} question={activeMatching} onExit={() => setActiveMatching(null)} />
  }

  if (activeMulti) {
    return <MultiResponseRunner key={activeMulti.id} question={activeMulti} onExit={() => setActiveMulti(null)} />
  }

  if (activeLabeling) {
    return <LabelingRunner key={activeLabeling.id} question={activeLabeling} onExit={() => setActiveLabeling(null)} />
  }

  if (activeCompletion) {
    return <CompletionRunner key={activeCompletion.id} question={activeCompletion} onExit={() => setActiveCompletion(null)} />
  }

  return (
    <PageContainer>
      <PageHeader
        title={t('Essay questions')}
      />

      <Guide />

      {availability.kind !== 'ready' ? (
        <Panel className="p-8">
          <CatalogueUnavailable skeleton={<ContentSkeleton shape="essays" />}
            availability={availability}
            empty={{
              title: t('No written questions published yet'),
              description: t('Written questions appear here once they are published in Written Setup.'),
            }}
          />
        </Panel>
      ) : (
        <div className="space-y-6">
          {written.length > 0 && (
            <section>
              <h2 className="mb-2 font-serif text-[16px] font-semibold text-ink">{t('Exam questions')}</h2>
              <p className="mb-3 text-[12.5px] leading-relaxed text-ink-2">
                {t('Written questions from past papers, with the parts and marks the paper carried.')}
              </p>
              <Panel className="overflow-hidden">
                <ul className="divide-y divide-line">
                  {written.map((question) => (
                    <li key={question.id}>
                      <WrittenRow question={question} onOpen={() => setActiveWritten(question)} />
                    </li>
                  ))}
                </ul>
              </Panel>
            </section>
          )}

          <FormatSection
            title={t('Matching questions')}
            blurb={t('Match every prompt to an option, then check the block as a whole.')}
            icon={Shuffle}
            items={matching}
            subtitle={(question) => t('{prompts} prompts · {options} options')
              .replace('{prompts}', String(question.matching.prompts.length))
              .replace('{options}', String(question.matching.options.length))}
            onOpen={setActiveMatching}
          />

          <FormatSection
            title={t('Select all that apply')}
            blurb={t('More than one option is correct. Choosing wrongly and leaving something out are reported apart.')}
            icon={ListChecks}
            items={multi}
            subtitle={(question) => t('{n} of {total} options are correct')
              .replace('{n}', String(question.correctAnswers.length))
              .replace('{total}', String(question.options.length))}
            onOpen={setActiveMulti}
          />

          <FormatSection
            title={t('Labelling')}
            blurb={t('Name the structure at each pointer, as a practical paper asks.')}
            icon={Crosshair}
            items={labeling}
            subtitle={(question) => t('{n} structures to name')
              .replace('{n}', String(question.labeling.points.length))}
            onOpen={setActiveLabeling}
          />

          <FormatSection
            title={t('Completion')}
            blurb={t('Fill the words back into the sentence, as the department books ask.')}
            icon={TextCursorInput}
            items={completion}
            subtitle={(question) => t('{n} blanks to fill')
              .replace('{n}', String(question.completion.blanks.length))}
            onOpen={setActiveCompletion}
          />

          {essays.length > 0 && (
            <section>
              {(written.length + matching.length + multi.length + labeling.length + completion.length > 0) && (
                <h2 className="mb-2 font-serif text-[16px] font-semibold text-ink">{t('Practice essays')}</h2>
              )}
              <EssayList essays={essays} onOpen={setActive} />
            </section>
          )}
        </div>
      )}
    </PageContainer>
  )
}
