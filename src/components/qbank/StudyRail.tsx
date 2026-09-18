import { useEffect, useState } from 'react'
import { Link, type Location } from 'react-router-dom'
import { BookOpen, CheckCircle2, ChevronDown, FileText, Flag, GitFork, Loader, Lock, LogOut, MessageSquareWarning, NotebookPen, Target } from 'lucide-react'
import { backState } from '@/components/ui/BackBar'
import { Textarea } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { ConceptChip } from '@/components/concepts/ConceptChip'
import { cn } from '@/lib/cn'
import type { Question } from '@/data/qbank'
import { useConceptIndex } from '@/lib/content'
import { migrateLegacyLocalKey, usePersistentState } from '@/lib/usePersistentState'
import { useT } from '@/lib/i18n'

/**
 * Dotted so `isUserOwnedState` matches `nishany.qbank.*` and these notes land in
 * the student's own record. The hyphenated key it replaces matched no pattern,
 * so every student's private notes were routed to one shared admin document.
 */
export const QBANK_NOTES_STORAGE_KEY = 'nishany.qbank.questionNotes.v1'
const LEGACY_QBANK_NOTES_STORAGE_KEY = 'nishany-qbank-question-notes-v1'

migrateLegacyLocalKey(LEGACY_QBANK_NOTES_STORAGE_KEY, QBANK_NOTES_STORAGE_KEY)

function Section({
  title,
  icon,
  children,
  action,
  open,
  onToggle,
}: {
  title: string
  icon: typeof Target
  children: React.ReactNode
  /** Sits opposite the title — used for the notes "Saved" cue. */
  action?: React.ReactNode
  /** When provided, the header collapses the body. Undefined = always open. */
  open?: boolean
  onToggle?: () => void
}) {
  const collapsible = onToggle != null
  const shown = !collapsible || open
  const heading = (
    <h3 className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink">
      <Icon icon={icon} size={13} />
      {title}
    </h3>
  )
  return (
    <section className="border-t border-line px-4 py-3.5 first:border-t-0">
      <div className={cn('flex items-center gap-2', shown && 'mb-2')}>
        {collapsible ? (
          <button type="button" onClick={onToggle} aria-expanded={open} className="inline-flex min-h-8 items-center gap-1.5 text-start">
            {heading}
            <Icon icon={ChevronDown} size={13} className={cn('text-ink-3 transition-transform', !open && '-rotate-90 rtl:rotate-90')} />
          </button>
        ) : heading}
        {action && <span className="ms-auto">{action}</span>}
      </div>
      {shown && children}
    </section>
  )
}

/**
 * Quiet reassurance that a note is not going to be lost.
 *
 * Writes are debounced now, so there is a real moment between typing and the
 * change being stored. Saying so beats leaving someone to wonder — and the cue
 * reports the actual state rather than being decorative.
 */
function SavedCue({ pending }: { pending: boolean }) {
  const t = useT()
  return (
    <span className={cn(
      'inline-flex items-center gap-1 text-[11px] font-medium transition-colors',
      pending ? 'text-ink-3' : 'text-ink-2',
    )}>
      <Icon icon={pending ? Loader : CheckCircle2} size={12} />
      {pending ? t('Saving…') : t('Saved')}
    </span>
  )
}

/**
 * One held notice for all three gated sections.
 *
 * Repeating the same sentence under three headings reads as three separate
 * refusals rather than one rule, so the gate is stated once.
 */
function Held() {
  const t = useT()
  return (
    <section className="border-t border-line px-4 py-3.5">
      <h3 className="mb-2 inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink">
        <Icon icon={Lock} size={13} />
        {t('After you answer')}
      </h3>
      <p className="text-[12.5px] leading-relaxed text-ink-2">
        {t('The concepts this question tests, what a correct answer proves, and the article that teaches it all open once you commit to an option.')}
      </p>
    </section>
  )
}

/**
 * The companion column beside a question.
 *
 * Everything except the notepad is withheld until the answer is revealed. A
 * concept name or an article title is often the answer in different words, so
 * showing them early would quietly turn a reasoning item into a recall one.
 */
export function StudyRail({
  question,
  revealed,
  location,
  flagged,
  onFlag,
  onReport,
  onEnd,
  endLabel,
  className,
}: {
  question: Question
  revealed: boolean
  location: Location
  flagged: boolean
  onFlag: () => void
  onReport: () => void
  onEnd: () => void
  endLabel: string
  className?: string
}) {
  const t = useT()
  const [graph] = useConceptIndex()
  const [notes, setNotes, notesStatus] = usePersistentState<Record<string, string>>(QBANK_NOTES_STORAGE_KEY, {})
  // The cue appears once this student has actually typed something. Showing
  // "Saved" against a note nobody has written is noise, not reassurance.
  // Scoped to the question on screen: this component is reused across a
  // sitting's questions without remounting, so without resetting here a note
  // typed on one question left the "Saved" cue showing on the very next one,
  // even though its own note box was empty.
  const [touched, setTouched] = useState(false)
  useEffect(() => setTouched(false), [question.id])
  // Collapsed by default: the notepad is optional, and leaving it open pushed
  // the concepts and reading links down out of sight on most screens.
  const [notesOpen, setNotesOpen] = useState(false)

  const labelled = (question.conceptIds ?? [])
    .map((id) => graph.concepts.find((concept) => concept.id === id))
    .filter((concept): concept is NonNullable<typeof concept> => Boolean(concept))
  const note = notes[question.id] ?? ''
  const hasReading = question.libraryRefs.length > 0 || question.resourceRefs.length > 0

  return (
    <aside className={className} aria-label={t('Study tools')}>
      <div className="rounded-xl border border-line bg-surface shadow-panel">
        <section className="grid grid-cols-3 gap-1.5 px-3 py-3" aria-label={t('Test actions')}>
          <button
            type="button"
            aria-pressed={flagged}
            onClick={onFlag}
            className={cn(
              'inline-flex min-h-11 items-center justify-center gap-1.5 rounded-md border px-2 text-[11.5px] font-semibold transition-colors sm:min-h-9',
              flagged ? 'border-primary-line bg-primary-tint text-primary-strong' : 'border-line bg-surface text-ink-2 hover:bg-inset hover:text-ink',
            )}
          >
            <Icon icon={Flag} size={13} className={cn(flagged && 'fill-current')} />
            {flagged ? t('Flagged') : t('Flag')}
          </button>
          <button
            type="button"
            onClick={onReport}
            className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-md border border-line bg-surface px-2 text-[11.5px] font-semibold text-ink-2 transition-colors hover:border-danger/30 hover:bg-danger-tint hover:text-danger sm:min-h-9"
          >
            <Icon icon={MessageSquareWarning} size={13} />
            {t('Report')}
          </button>
          <button
            type="button"
            onClick={onEnd}
            className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-md border border-line-2 bg-surface px-2 text-[11.5px] font-semibold text-ink transition-colors hover:bg-inset sm:min-h-9"
          >
            <Icon icon={LogOut} size={13} />
            {endLabel}
          </button>
        </section>
        <Section
          title={t('Your notes')}
          icon={NotebookPen}
          open={notesOpen}
          onToggle={() => setNotesOpen((value) => !value)}
          action={notesOpen && touched ? <SavedCue pending={notesStatus.pending} /> : null}
        >
          <Textarea
            value={note}
            onChange={(event) => {
              setTouched(true)
              setNotes((current) => ({ ...current, [question.id]: event.target.value }))
            }}
            placeholder={t('What did you think, and what caught you out?')}
            className="min-h-[6rem] text-[13px]"
            aria-label={t('Notes for this question')}
          />
          <p className="mt-1.5 text-[11px] text-ink-3">{t('Only you can see this.')}</p>
        </Section>

        {!revealed && <Held />}

        {revealed && (
          <>
        <Section title={t('Concepts tested')} icon={GitFork}>
          {labelled.length ? (
            <ul className="flex flex-wrap gap-1.5">
              {labelled.map((concept) => (
                <li key={concept.id}>
                  <ConceptChip conceptId={concept.id} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[12.5px] leading-snug text-ink-3">{t('No concept is tagged on this question yet.')}</p>
          )}
        </Section>

        <Section title={t('What this proves')} icon={Target}>
          {question.learningObjective ? (
            <p className="text-[13px] leading-relaxed text-ink-2">{question.learningObjective}</p>
          ) : (
            <p className="text-[12.5px] leading-snug text-ink-3">{t('No learning objective was recorded.')}</p>
          )}
        </Section>

        <Section title={t('Where this is taught')} icon={BookOpen}>
          {hasReading ? (
            <div className="flex flex-col gap-1.5">
              {question.libraryRefs.map((ref) => (
                <Link
                  key={ref.id}
                  to={`/app/library?s=${ref.id}`}
                  state={backState(location, t('Back to question'))}
                  className="inline-flex min-h-11 items-start gap-1.5 rounded-md border border-primary-line bg-primary-tint/60 px-2.5 py-2 text-[12.5px] font-medium leading-snug text-primary-strong transition-colors hover:bg-primary-tint sm:min-h-0"
                >
                  <Icon icon={BookOpen} size={14} className="mt-px shrink-0" />
                  {ref.title}
                </Link>
              ))}
              {question.resourceRefs.map((ref) => (
                <Link
                  key={ref}
                  to={`/app/resources?q=${encodeURIComponent(ref.split(' · ')[0])}`}
                  state={backState(location, t('Back to question'))}
                  className="inline-flex min-h-11 items-start gap-1.5 rounded-md border border-line bg-surface px-2.5 py-2 text-[12.5px] leading-snug text-ink-2 transition-colors hover:text-ink sm:min-h-0"
                >
                  <Icon icon={FileText} size={14} className="mt-px shrink-0 text-ink-3" />
                  {ref}
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-[12.5px] leading-snug text-ink-3">{t('No article is linked to this question yet.')}</p>
          )}
        </Section>
          </>
        )}
      </div>
    </aside>
  )
}
