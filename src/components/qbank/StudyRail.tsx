import { Link, type Location } from 'react-router-dom'
import { BookOpen, FileText, GitFork, Lock, NotebookPen, Target } from 'lucide-react'
import { backState } from '@/components/ui/BackBar'
import { Textarea } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { CONCEPT_STORAGE_KEY, initialConceptGraph, type ConceptGraph } from '@/data/conceptGraph'
import type { Question } from '@/data/qbank'
import { migrateLegacyLocalKey, usePersistentState } from '@/lib/usePersistentState'
import { useT } from '@/lib/i18n'

/**
 * Dotted so `isUserOwnedState` matches `synapse.qbank.*` and these notes land in
 * the student's own record. The hyphenated key it replaces matched no pattern,
 * so every student's private notes were routed to one shared admin document.
 */
export const QBANK_NOTES_STORAGE_KEY = 'synapse.qbank.questionNotes.v1'
const LEGACY_QBANK_NOTES_STORAGE_KEY = 'synapse-qbank-question-notes-v1'

migrateLegacyLocalKey(LEGACY_QBANK_NOTES_STORAGE_KEY, QBANK_NOTES_STORAGE_KEY)

function Section({
  title,
  icon,
  children,
}: {
  title: string
  icon: typeof Target
  children: React.ReactNode
}) {
  return (
    <section className="border-t border-line px-4 py-3.5 first:border-t-0">
      <h3 className="mb-2 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">
        <Icon icon={icon} size={13} />
        {title}
      </h3>
      {children}
    </section>
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
      <h3 className="mb-2 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">
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
  className,
}: {
  question: Question
  revealed: boolean
  location: Location
  className?: string
}) {
  const t = useT()
  const [graph] = usePersistentState<ConceptGraph>(CONCEPT_STORAGE_KEY, initialConceptGraph)
  const [notes, setNotes] = usePersistentState<Record<string, string>>(QBANK_NOTES_STORAGE_KEY, {})

  const labelled = (question.conceptIds ?? [])
    .map((id) => graph.concepts.find((concept) => concept.id === id))
    .filter((concept): concept is NonNullable<typeof concept> => Boolean(concept))
  const note = notes[question.id] ?? ''
  const hasReading = question.libraryRefs.length > 0 || question.resourceRefs.length > 0

  return (
    <aside className={className} aria-label={t('Study tools')}>
      <div className="rounded-xl border border-line bg-surface shadow-panel">
        <Section title={t('Your notes')} icon={NotebookPen}>
          <Textarea
            value={note}
            onChange={(event) => setNotes((current) => ({ ...current, [question.id]: event.target.value }))}
            placeholder={t('Jot what you reasoned, or what tripped you up.')}
            className="min-h-[7rem] text-[13px]"
            aria-label={t('Notes for this question')}
          />
          <p className="mt-1.5 text-[11px] text-ink-3">{t('Saved to your account, and kept when you review.')}</p>
        </Section>

        {!revealed && <Held />}

        {revealed && (
          <>
        <Section title={t('Concepts tested')} icon={GitFork}>
          {labelled.length ? (
            <ul className="flex flex-wrap gap-1.5">
              {labelled.map((concept) => (
                <li
                  key={concept.id}
                  title={concept.definition}
                  className="rounded-md border border-line bg-surface-2 px-2 py-1 text-[12px] text-ink-2"
                >
                  {concept.label}
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
                  className="inline-flex items-start gap-1.5 rounded-md border border-accent-line bg-accent-tint/60 px-2.5 py-2 text-[12.5px] font-medium leading-snug text-accent-strong transition-colors hover:bg-accent-tint"
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
                  className="inline-flex items-start gap-1.5 rounded-md border border-line bg-surface px-2.5 py-2 text-[12.5px] leading-snug text-ink-2 transition-colors hover:text-ink"
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
