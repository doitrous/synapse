import { useMemo, useState } from 'react'
import { BookOpen, ChevronRight, FileText, PenLine } from 'lucide-react'
import { WRITTEN_GUIDE } from '@/data/writtenGuide'
import { coveredCount, type EssayQuestion as EssayQuestionData } from '@/data/essay'
import { useLiveEssays } from '@/lib/useLiveEssays'
import { useEssayAnswers } from '@/lib/useEssayAnswers'
import { useCatalogueAvailability } from '@/lib/useCatalogueAvailability'
import { useLocalPreference } from '@/lib/useLocalPreference'
import { useT } from '@/lib/i18n'
import { subjects, getSubject } from '@/data/subjects'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { CatalogueUnavailable } from '@/components/ui/CatalogueUnavailable'
import { SystemMark } from '@/components/ui/SystemMark'
import { EssayRunner } from '@/components/essay/EssayRunner'
import { WrittenRunner } from '@/components/written/WrittenRunner'
import { useLiveWrittenQuestions } from '@/lib/useLiveWrittenQuestions'
import { useWrittenAnswers } from '@/lib/useWrittenAnswers'
import { markWritten, writtenFullyMarked, type WrittenQuestion } from '@/data/writtenQuestion'
import { cn } from '@/lib/cn'

/** The guide is data so the same list cannot drift between surfaces; every line still goes through `t()` here. */
function Guide() {
  const t = useT()
  const [open, setOpen] = useLocalPreference('synapse.essay.guideOpen', true)
  return (
    <Panel className="mb-5 overflow-hidden">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center gap-2.5 px-4 py-3 text-start transition-colors hover:bg-inset/60"
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
      className="flex cursor-pointer flex-wrap items-center gap-x-4 gap-y-3 px-4 py-3.5 transition-colors hover:bg-inset/60 focus-visible:bg-inset focus-visible:outline-none"
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
      className="flex cursor-pointer flex-wrap items-center gap-x-4 gap-y-3 px-4 py-3.5 transition-colors hover:bg-inset/60 focus-visible:bg-inset focus-visible:outline-none"
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

/** Published essays, divided by system — the same shape every practical tab groups by. */
function EssayList({ essays, onOpen }: { essays: EssayQuestionData[]; onOpen: (essay: EssayQuestionData) => void }) {
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
              <h2 className="font-serif text-[15.5px] font-semibold text-ink">{getSubject(group.key).name}</h2>
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
  const availability = useCatalogueAvailability(essays.length + written.length)
  const [active, setActive] = useState<EssayQuestionData | null>(null)
  const [activeWritten, setActiveWritten] = useState<WrittenQuestion | null>(null)

  if (active) {
    // Keyed by question: without it, a future "next question" control would
    // reconcile in place and carry the revealed stage — and so the next
    // question's model answer — straight over an unattempted one.
    return <EssayRunner key={active.id} essay={active} onExit={() => setActive(null)} />
  }

  if (activeWritten) {
    return <WrittenRunner key={activeWritten.id} question={activeWritten} onExit={() => setActiveWritten(null)} />
  }

  return (
    <PageContainer>
      <PageHeader
        title={t('Essay questions')}
        description={t('Read a written question, write your answer, then reveal the key points and mark yourself against them.')}
      />

      <Guide />

      {availability.kind !== 'ready' ? (
        <Panel className="p-8">
          <CatalogueUnavailable
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

          {essays.length > 0 && (
            <section>
              {written.length > 0 && (
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
