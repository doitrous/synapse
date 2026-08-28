import { useMemo, type ReactNode } from 'react'
import { Check, Database, Target as TargetIcon, TriangleAlert, Flag, ImageOff } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { Badge } from '@/components/ui/Badge'
import { SubjectDot } from '@/components/ui/Subject'
import { EmptyState } from '@/components/ui/EmptyState'
import { ZoomableImage, MediaAttachmentView } from '@/components/ui/MediaAttachmentView'
import { PlacedAsset, PlacedMedia } from '@/components/ui/PlacedMedia'
import { placementsFor } from '@/data/mediaPlacement'
import { useMediaRecords } from '@/lib/useMediaRecords'
import { usePersistentState } from '@/lib/usePersistentState'
import { getSubject } from '@/data/subjects'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'
import { formatLongDate } from '@/lib/format'
import { ConceptText } from '@/components/concepts/ConceptText'
import { LETTERS } from '@/components/qbank/QuestionView'
import { DIFFICULTIES, type Difficulty, type Question } from '@/data/qbank'
import { managedQuestionToStudentQuestion } from '@/lib/usePublishedQuestions'
import { articleToSubtopic } from '@/data/articleProjection'
import { managedEssayToStudentEssay } from '@/data/essay'
import { managedWrittenToStudentWritten } from '@/data/writtenQuestion'
import { CONCEPT_STORAGE_KEY, initialConceptGraph } from '@/data/conceptGraph'
import { MEDICAL_PUBLISHED_EVIDENCE_STORAGE_KEY, emptyMedicalEvidenceStore } from '@/data/medicalEvidence'
import type { LibBlock } from '@/data/library'
import {
  CONTENT_KIND_LABEL,
  type ManagedContentItem,
  type ArticleMediaRecord,
  type PracticalAuthoringData,
  type ClinicalDecisionDraft,
  type LabQuestionDraft,
} from '@/data/contentControl'
import type { MediaRecord, MediaSlot, AnswerLetter } from '@/data/mediaLibrary'
import {
  QUESTION_FORMAT_LABELS,
  isWrittenFormat,
  isChoiceFormat,
  type QuestionFormat,
} from '@/data/questionFormat'

/**
 * The one place that renders a content-ledger item the way a student actually
 * sees it — for reviewers.
 *
 * Media Requests and Content Reports each used to grow their own hand-rolled
 * preview. A hand-rolled preview reads whatever the draft happens to hold —
 * raw section prose instead of the evidence-gated projection, no answer
 * marking, no concept highlighting — so a reviewer could approve a request
 * against text a student would never be shown. This component instead
 * projects the ledger item through the *same* functions the live student
 * surfaces use (`managedQuestionToStudentQuestion`, `articleToSubtopic`,
 * `managedEssayToStudentEssay`, `managedWrittenToStudentWritten`) and renders
 * with the same primitives those surfaces render with (`ConceptText`,
 * `PlacedMedia`/`PlacedAsset`, the same letter/answer styling `QuestionView`
 * uses).
 *
 * It deliberately does NOT render `QuestionView` or the library `Reader`
 * directly. Both are real, but both are wired for a *student's own* session —
 * `QuestionView` bakes in `HighlightSelectionPopover`, which persists a
 * highlight the instant the viewer selects text, and the `Reader` is built on
 * `useLiveLibrary` (which gates on `isStudentPublishable`, hiding exactly the
 * draft a reviewer opened this for) plus marks/notes/router state that has no
 * meaning for a reviewer. So this reuses their lower-level primitives and
 * matches their visual output instead, per the brief. See the per-kind
 * preview components below for exactly what is reused vs re-composed.
 */

export interface PreviewAnchor {
  /** An article section heading, or a practical decision/question id or title. */
  section?: string
  /** Which part of a question this belongs to. */
  slot?: MediaSlot
  /** Only meaningful alongside `slot`. */
  answerLabel?: AnswerLetter
  /** Verbatim text the anchor belongs to — matched against block/segment text. */
  quote?: string
}

function normalize(value: string | undefined): string {
  return (value ?? '').trim().toLowerCase()
}

/* ---------------------------------------------------------------------------
 * Anchor highlight — the calm amber frame that marks where a requested asset,
 * or a reported problem, belongs. Mirrors the treatment Media Requests already
 * used (`Target`), kept as one shared primitive so Content Reports gets the
 * same affordance for free.
 * ------------------------------------------------------------------------- */
function AnchorFrame({ active, label, className, children }: { active: boolean; label: string; className?: string; children: ReactNode }) {
  if (!active) return <div className={className}>{children}</div>
  return (
    <div className={cn('rounded-lg border border-warning bg-warning-tint/60 p-3 ring-2 ring-warning/25', className)}>
      <p className="mb-1.5 flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-[0.08em] text-warning-strong">
        <Icon icon={TargetIcon} size={12} />
        {label}
      </p>
      {children}
    </div>
  )
}

/** Same tone bands `QuestionView` uses, so a reviewer reads difficulty identically. */
function diffTone(difficulty: Difficulty) {
  if (difficulty === 'Easy') return 'success' as const
  if (difficulty === 'Hard' || difficulty === 'Challenging') return 'danger' as const
  return 'warning' as const
}

function UnavailablePreview({ item, reason, t }: { item: ManagedContentItem; reason: string; t: (value: string) => string }) {
  const label = CONTENT_KIND_LABEL[item.kind]?.singular ?? item.kind
  return (
    <EmptyState
      icon={ImageOff}
      title={t('Nothing to preview yet')}
      description={`${item.title || label} — ${reason}`}
    />
  )
}

/* ---------------------------------------------------------------------------
 * Question preview — the choice formats (single-best, multi-response,
 * true/false, image-based) share one shape: a stem, lettered options, one or
 * more correct.
 * ------------------------------------------------------------------------- */

/** Mirrors `difficultyFor` in `usePublishedQuestions.ts` — that function is not exported. */
function difficultyFor(item: ManagedContentItem): Difficulty {
  const value = item.questionData?.tags.intendedDifficulty ?? item.fields.Difficulty
  return DIFFICULTIES.includes(value as Difficulty) ? (value as Difficulty) : 'Moderate'
}

/**
 * A choice question exactly as a student would be shown it, without gating on
 * publish-readiness.
 *
 * `managedQuestionToStudentQuestion` is the real, live projection — reused
 * first so a fully-publishable item renders through the exact function
 * students draw from. It refuses anything not `isStudentPublishable` (status
 * and blocking-media checks) and anything missing a matched correct answer —
 * both of which are the routine state of the very item a reviewer opened this
 * for. This fallback mirrors that function's field mapping exactly (see that
 * file if the two ever need to change together) so a draft still renders
 * faithfully rather than showing nothing.
 */
function projectDraftChoiceQuestion(item: ManagedContentItem): Question | null {
  const data = item.questionData
  if (!data) return null
  const answers = data.answers.filter((answer) => answer.text.trim())
  if (!answers.length) return null
  const correctExplanation = answers.find((answer) => answer.label === data.correctAnswer)?.explanation ?? ''
  return {
    id: item.id,
    subjectId: item.subjectId,
    topic: data.tags.topic.trim() || item.fields.Topic?.trim() || 'General',
    difficulty: difficultyFor(item),
    vignette: item.fields.Vignette?.trim() ?? '',
    stem: item.title,
    options: answers.map((answer) => ({ text: answer.text, correct: answer.label === data.correctAnswer, rationale: answer.explanation })),
    explanation: item.fields.Explanation?.trim() || correctExplanation,
    libraryRefs: data.libraryIds.map((id) => ({ id, title: id })),
    resourceRefs: data.resourceIds,
    attachedImage: data.attachedImage.trim() || undefined,
    attachments: (data.attachments ?? []).map((attachment) => ({ ...attachment })),
    learningObjective: data.learningObjective.trim() || undefined,
    conceptIds: [...new Set([...(data.tags.mainConceptIds ?? []), ...data.tags.conceptIds])],
  }
}

interface ProjectedChoiceQuestion {
  question: Question
  incomplete: boolean
}

function projectChoiceQuestion(item: ManagedContentItem): ProjectedChoiceQuestion | null {
  const data = item.questionData
  if (item.kind !== 'question' || !data) return null
  const format: QuestionFormat = data.format ?? 'mcq_single_best'
  if (!isChoiceFormat(format)) return null

  const real = managedQuestionToStudentQuestion(item, [item])
  const base = real ?? projectDraftChoiceQuestion(item)
  if (!base) return null

  // `mcq_multi` carries its correct set on `multiResponse.correctAnswers`,
  // because `correctAnswer` alone can only ever hold one letter (see
  // `multiResponseQuestion.ts`). Neither `managedQuestionToStudentQuestion`
  // nor the draft fallback above know about that field — both mark only the
  // first correct option — so it is applied here on top of either base,
  // rather than duplicated into both projections.
  const answers = data.answers.filter((answer) => answer.text.trim())
  const correctLabels = new Set<string>(
    format === 'mcq_multi' && data.multiResponse?.correctAnswers?.length
      ? data.multiResponse.correctAnswers
      : [data.correctAnswer],
  )
  const question: Question = {
    ...base,
    // Media placements never reach `managedQuestionToStudentQuestion`'s return
    // value today, so a reviewer previewing a live-shaped question would never
    // see the very media a request concerns. Carried through explicitly here.
    media: data.media,
    options: base.options.map((option, index) => ({ ...option, correct: correctLabels.has(answers[index]?.label ?? '') })),
  }
  return { question, incomplete: !real }
}

function questionAnchorActive(anchor: PreviewAnchor | undefined, slot: MediaSlot, answerLabel?: string): boolean {
  if (!anchor || anchor.slot !== slot) return false
  if (slot === 'stem') return true
  if (slot === 'explanation' && !answerLabel) return !anchor.answerLabel
  return anchor.answerLabel === answerLabel
}

function ChoiceQuestionPreview({
  item, projected, anchor, revealAnswer, t,
}: {
  item: ManagedContentItem
  projected: ProjectedChoiceQuestion
  anchor: PreviewAnchor | undefined
  revealAnswer: boolean
  t: (value: string) => string
}) {
  const mediaRecords = useMediaRecords()
  const { question, incomplete } = projected
  const format: QuestionFormat = item.questionData?.format ?? 'mcq_single_best'

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-ink">
          <SubjectDot id={question.subjectId} />
          {getSubject(question.subjectId).name}
        </span>
        <span className="text-ink-3">·</span>
        <span className="text-[12.5px] text-ink-3">{question.topic}</span>
        {format !== 'mcq_single_best' && <Badge tone="accent">{QUESTION_FORMAT_LABELS[format]}</Badge>}
        <Badge tone={diffTone(question.difficulty)} className="ms-auto">{question.difficulty}</Badge>
      </div>

      {incomplete && (
        <p className="flex items-start gap-2 rounded-lg border border-warning/30 bg-warning-tint/50 px-3 py-2 text-[12px] leading-relaxed text-warning-strong">
          <Icon icon={TriangleAlert} size={14} className="mt-0.5 shrink-0" />
          {t('This question is not fully publishable yet — showing the authored draft.')}
        </p>
      )}

      <AnchorFrame active={questionAnchorActive(anchor, 'stem')} label={t('Requested media goes here')}>
        {question.vignette && (
          <p className="text-[15px] leading-[1.65] text-ink/90"><ConceptText text={question.vignette} enabled={revealAnswer} /></p>
        )}
        <p className={cn('text-[15.5px] font-semibold leading-snug text-ink', question.vignette && 'mt-3')}>
          <ConceptText text={question.stem} enabled={revealAnswer} />
        </p>
        {question.attachedImage && (
          <div className="mt-4 overflow-hidden rounded-xl border border-line bg-inset p-2">
            <ZoomableImage src={question.attachedImage} alt={t('Question attachment')} className="max-h-80 w-full rounded-lg object-contain" />
          </div>
        )}
        {question.attachments && question.attachments.length > 0 && (
          <div className="mt-4 space-y-2">
            {question.attachments.map((attachment) => <MediaAttachmentView key={attachment.id} attachment={attachment} />)}
          </div>
        )}
        <PlacedMedia placements={placementsFor(question.media, 'stem')} records={mediaRecords} className="mt-4" />
      </AnchorFrame>

      <ol className="space-y-2.5" aria-label={t('Answer choices')}>
        {question.options.map((option, index) => {
          const letter = LETTERS[index]
          const showCorrect = revealAnswer && option.correct
          return (
            <li key={letter}>
              <AnchorFrame active={questionAnchorActive(anchor, 'answer', letter)} label={t('Requested media goes here')}>
                <div className={cn('flex items-start gap-3 rounded-xl border p-3.5', showCorrect ? 'border-success bg-success-tint' : 'border-line bg-surface')}>
                  <span
                    className={cn(
                      'grid size-7 shrink-0 place-items-center rounded-full border font-mono text-[12.5px] font-bold',
                      showCorrect ? 'border-success bg-success text-on-success' : 'border-line-2 bg-surface text-ink-2',
                    )}
                  >
                    {showCorrect ? <Icon icon={Check} size={14} strokeWidth={2.6} /> : letter}
                  </span>
                  <span className="flex-1 pt-0.5 text-[14px] text-ink">
                    <ConceptText text={option.text} enabled={revealAnswer} />
                    <PlacedMedia placements={placementsFor(question.media, 'answer', letter)} records={mediaRecords} />
                  </span>
                </div>
              </AnchorFrame>
              {revealAnswer && option.rationale && (
                <AnchorFrame active={questionAnchorActive(anchor, 'explanation', letter)} label={t('Requested media goes here')} className="mt-1.5">
                  <p className="text-[11.5px] leading-relaxed text-ink-2"><span className="font-semibold text-ink">{t('Explanation')}:</span> <ConceptText text={option.rationale} enabled /></p>
                  <PlacedMedia placements={placementsFor(question.media, 'explanation', letter)} records={mediaRecords} />
                </AnchorFrame>
              )}
            </li>
          )
        })}
      </ol>

      {revealAnswer && (question.explanation || placementsFor(question.media, 'explanation').length > 0) && (
        <AnchorFrame active={questionAnchorActive(anchor, 'explanation')} label={t('Requested media goes here')}>
          {question.explanation && <p className="text-[13px] leading-relaxed text-ink-2"><ConceptText text={question.explanation} enabled /></p>}
          <PlacedMedia placements={placementsFor(question.media, 'explanation')} records={mediaRecords} className="mt-2" />
        </AnchorFrame>
      )}
    </div>
  )
}

/* ---------------------------------------------------------------------------
 * Written questions (short answer, structured written, essay, comparison
 * table, multipart written) — marked by the student against a scheme, not
 * auto-graded, so the "student view" is the parts and their mark scheme.
 * ------------------------------------------------------------------------- */
function WrittenQuestionPreview({ item, anchor, revealAnswer, t }: { item: ManagedContentItem; anchor: PreviewAnchor | undefined; revealAnswer: boolean; t: (value: string) => string }) {
  const data = item.questionData
  const format = data?.format
  const real = managedWrittenToStudentWritten(item)
  const parts = real?.parts ?? data?.writtenParts ?? []
  if (!format || !parts.length) return <UnavailablePreview item={item} reason={t('no written parts authored yet')} t={t} />

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <SubjectDot id={item.subjectId} />
        <span className="text-[12.5px] font-bold text-ink">{getSubject(item.subjectId).name}</span>
        <Badge tone="accent">{QUESTION_FORMAT_LABELS[format]}</Badge>
        {!real && (
          <span className="ms-auto flex items-center gap-1.5 text-[11px] font-medium text-warning">
            <Icon icon={TriangleAlert} size={13} />{t('Draft')}
          </span>
        )}
      </div>
      <AnchorFrame active={questionAnchorActive(anchor, 'stem')} label={t('Requested media goes here')}>
        <p className="text-[15.5px] font-semibold leading-snug text-ink"><ConceptText text={item.title} enabled={revealAnswer} /></p>
        {item.fields.Vignette?.trim() && <p className="mt-2 text-[14px] leading-relaxed text-ink/90"><ConceptText text={item.fields.Vignette.trim()} enabled={revealAnswer} /></p>}
      </AnchorFrame>
      <div className="space-y-3">
        {parts.map((part) => (
          <div key={part.id} className="rounded-xl border border-line bg-surface p-3.5">
            <div className="flex items-start justify-between gap-3">
              <p className="text-[13.5px] font-semibold text-ink"><span className="font-mono text-ink-3">({part.label})</span> <ConceptText text={part.prompt} enabled={revealAnswer} /></p>
              <Badge tone="neutral" className="shrink-0">{part.marks} {part.marks === 1 ? t('mark') : t('marks')}</Badge>
            </div>
            {revealAnswer && part.expectedPoints.length > 0 && (
              <ul className="mt-2.5 space-y-1.5 border-t border-line pt-2.5">
                {part.expectedPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2 text-[12.5px] leading-relaxed text-ink-2">
                    <Icon icon={Check} size={13} className="mt-0.5 shrink-0 text-success" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------------------
 * Matching, labeling and completion — each has its own real interactive
 * runner (`MatchingRunner`, `LabelingRunner`, `CompletionRunner`), but every
 * one of those manages a live attempt (state, scoring, `useRecordAttempt`) and
 * assumes it owns full-page navigation. Reusing one here would either fabricate
 * an attempt record for a reviewer's read, or need surgery this component
 * should not perform on files it does not own. These instead render the same
 * authored payload those runners read, completely and statically.
 * ------------------------------------------------------------------------- */
function MatchingPreview({ item, anchor, revealAnswer, t }: { item: ManagedContentItem; anchor: PreviewAnchor | undefined; revealAnswer: boolean; t: (value: string) => string }) {
  const matching = item.questionData?.matching
  if (!matching || matching.options.length < 2 || !matching.prompts.length) return <UnavailablePreview item={item} reason={t('no matching options authored yet')} t={t} />
  const optionText = (id: string) => matching.options.find((option) => option.id === id)?.text ?? id

  return (
    <div className="space-y-4">
      <AnchorFrame active={questionAnchorActive(anchor, 'stem')} label={t('Requested media goes here')}>
        <p className="text-[15.5px] font-semibold leading-snug text-ink"><ConceptText text={item.title} enabled={revealAnswer} /></p>
      </AnchorFrame>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.07em] text-ink-3">{t('Options')}</p>
        <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
          {matching.options.map((option) => (
            <li key={option.id} className="flex items-start gap-2 rounded-lg border border-line bg-surface px-3 py-2 text-[13px] text-ink">
              <span className="font-mono font-bold text-ink-3">{option.id}.</span>
              <ConceptText text={option.text} enabled={revealAnswer} />
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.07em] text-ink-3">{t('Prompts')}</p>
        <ul className="mt-2 space-y-1.5">
          {matching.prompts.map((prompt) => (
            <li key={prompt.id} className="flex items-start justify-between gap-3 rounded-lg border border-line bg-surface px-3 py-2 text-[13px]">
              <span className="text-ink"><ConceptText text={prompt.text} enabled={revealAnswer} /></span>
              {revealAnswer && (
                <Badge tone="success" className="shrink-0">{prompt.answerId} — {optionText(prompt.answerId)}</Badge>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function LabelingPreview({ item, anchor, revealAnswer, t }: { item: ManagedContentItem; anchor: PreviewAnchor | undefined; revealAnswer: boolean; t: (value: string) => string }) {
  const mediaRecords = useMediaRecords()
  const labeling = item.questionData?.labeling
  if (!labeling || !labeling.imageUrl.trim()) return <UnavailablePreview item={item} reason={t('no labelled image authored yet')} t={t} />
  const managed = /^\/media\/([^/?#]+)$/.exec(labeling.imageUrl)
  let record: MediaRecord | undefined
  if (managed) { try { record = mediaRecords.get(decodeURIComponent(managed[1])) } catch { record = undefined } }

  return (
    <div className="space-y-4">
      <AnchorFrame active={questionAnchorActive(anchor, 'stem')} label={t('Requested media goes here')}>
        <p className="text-[15.5px] font-semibold leading-snug text-ink"><ConceptText text={item.title} enabled={revealAnswer} /></p>
      </AnchorFrame>
      <div className="relative overflow-hidden rounded-xl border border-line bg-inset">
        {record ? <PlacedAsset record={record} caption={labeling.altText} /> : (
          <MediaAttachmentView attachment={{ id: labeling.imageUrl, type: 'image', name: labeling.altText || t('Labelling image'), url: labeling.imageUrl }} />
        )}
        <div className="pointer-events-none absolute inset-0">
          {labeling.points.map((point) => (
            <span
              key={point.id}
              className="absolute grid size-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-primary bg-paper font-mono text-[11px] font-bold text-primary shadow-panel"
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
            >
              {point.marker}
            </span>
          ))}
        </div>
      </div>
      <ul className="space-y-1.5">
        {labeling.points.map((point) => (
          <li key={point.id} className="flex items-center justify-between gap-3 rounded-lg border border-line bg-surface px-3 py-2 text-[13px]">
            <span className="font-mono font-bold text-ink-3">{point.marker}</span>
            {revealAnswer ? (
              <span className="text-end text-ink">{point.answer}{point.accepts.length > 0 && <span className="ms-1.5 text-[11px] text-ink-3">({t('also accepts')} {point.accepts.join(', ')})</span>}</span>
            ) : <span className="text-ink-3">{t('Hidden until revealed')}</span>}
          </li>
        ))}
      </ul>
    </div>
  )
}

function CompletionPreview({ item, anchor, revealAnswer, t }: { item: ManagedContentItem; anchor: PreviewAnchor | undefined; revealAnswer: boolean; t: (value: string) => string }) {
  const completion = item.questionData?.completion
  if (!completion || !completion.segments.length) return <UnavailablePreview item={item} reason={t('no completion sentence authored yet')} t={t} />

  return (
    <div className="space-y-4">
      <AnchorFrame active={questionAnchorActive(anchor, 'stem')} label={t('Requested media goes here')}>
        <p className="text-[15.5px] font-semibold leading-snug text-ink">{item.title}</p>
        <p className="mt-3 text-[15px] leading-[1.8] text-ink/90">
          {completion.segments.map((segment, index) => segment.kind === 'text'
            ? <span key={index}>{segment.text}</span>
            : (
              <span key={index} className={cn('mx-1 inline-block rounded-md border px-2 py-0.5 font-mono text-[13px]', revealAnswer ? 'border-success bg-success-tint text-success' : 'border-line-2 bg-inset text-ink-3')}>
                {revealAnswer ? segment.blank.answer : '_____'}
              </span>
            ))}
        </p>
      </AnchorFrame>
      {revealAnswer && completion.blanks.some((blank) => blank.accepts.length > 0) && (
        <ul className="space-y-1 text-[11.5px] text-ink-3">
          {completion.blanks.filter((blank) => blank.accepts.length > 0).map((blank) => (
            <li key={blank.id}>{t('Also accepts for')} “{blank.answer}”: {blank.accepts.join(', ')}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

/* ---------------------------------------------------------------------------
 * Question dispatch — routes to the right shape by format.
 * ------------------------------------------------------------------------- */
function QuestionPreview({ item, anchor, revealAnswer, t }: { item: ManagedContentItem; anchor: PreviewAnchor | undefined; revealAnswer: boolean; t: (value: string) => string }) {
  if (!item.questionData) return <UnavailablePreview item={item} reason={t('no question data authored yet')} t={t} />
  const format: QuestionFormat = item.questionData.format ?? 'mcq_single_best'

  if (format === 'matching') return <MatchingPreview item={item} anchor={anchor} revealAnswer={revealAnswer} t={t} />
  if (format === 'labeling') return <LabelingPreview item={item} anchor={anchor} revealAnswer={revealAnswer} t={t} />
  if (format === 'completion') return <CompletionPreview item={item} anchor={anchor} revealAnswer={revealAnswer} t={t} />
  if (isWrittenFormat(format)) return <WrittenQuestionPreview item={item} anchor={anchor} revealAnswer={revealAnswer} t={t} />

  const projected = projectChoiceQuestion(item)
  if (!projected) return <UnavailablePreview item={item} reason={t('not enough answer data authored yet')} t={t} />
  return <ChoiceQuestionPreview item={item} projected={projected} anchor={anchor} revealAnswer={revealAnswer} t={t} />
}

/* ---------------------------------------------------------------------------
 * Article preview — the real evidence-gated projection (`articleToSubtopic`),
 * rendered with the library reader's block vocabulary (heading / paragraph /
 * list / callout / verified fact / sources) reproduced here rather than
 * imported: `Blocks`, `Callout` and `MediaFrame` in `Library.tsx` are private
 * to that file's own marks/notes/router-state reading experience, which has
 * no equivalent for a reviewer. Concept highlighting (`ConceptText`) is the
 * same component either way.
 * ------------------------------------------------------------------------- */
interface BlockGroup { heading: string | null; blocks: LibBlock[] }

function groupArticleBlocks(blocks: LibBlock[]): BlockGroup[] {
  const groups: BlockGroup[] = []
  let current: BlockGroup = { heading: null, blocks: [] }
  for (const block of blocks) {
    if (block.type === 'h') {
      if (current.heading !== null || current.blocks.length) groups.push(current)
      current = { heading: block.text ?? '', blocks: [] }
    } else {
      current.blocks.push(block)
    }
  }
  if (current.heading !== null || current.blocks.length) groups.push(current)
  return groups
}

function groupContainsQuote(group: BlockGroup, quote: string): boolean {
  const needle = normalize(quote)
  if (!needle) return false
  return group.blocks.some((block) => normalize(block.text).includes(needle) || (block.items ?? []).some((item) => normalize(item).includes(needle)))
}

function ArticleCallout({ tone, title, text, revealAnswer, t }: { tone: 'primary' | 'warning'; title: string; text: string; revealAnswer: boolean; t: (value: string) => string }) {
  const accent = tone === 'primary'
  return (
    <div className={cn('my-4 rounded-xl border p-4', accent ? 'border-primary/45 bg-primary-tint/55' : 'border-warning/35 bg-warning-tint/65')}>
      <div className="flex items-center gap-2">
        <Icon icon={accent ? Flag : TriangleAlert} size={16} className={accent ? 'text-primary' : 'text-warning'} />
        <span className={cn('text-[12.5px] font-semibold', accent ? 'text-primary-strong' : 'text-warning')}>{title}</span>
      </div>
      <p className="mt-1.5 text-[14px] leading-relaxed text-ink"><ConceptText text={text} enabled={revealAnswer} /></p>
      <span className="sr-only">{t('University-specific note')}</span>
    </div>
  )
}

function ArticleBlockList({ blocks, revealAnswer, t }: { blocks: LibBlock[]; revealAnswer: boolean; t: (value: string) => string }) {
  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === 'p') {
          return <p key={index} className="mt-3 text-[15px] leading-[1.7] text-ink/90"><ConceptText text={block.text ?? ''} enabled={revealAnswer} /></p>
        }
        if (block.type === 'list') {
          return (
            <ul key={index} className="mt-3 space-y-2">
              {(block.items ?? []).map((line, itemIndex) => (
                <li key={itemIndex} className="flex gap-2.5 text-[15px] leading-[1.6] text-ink/90">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary-soft" />
                  <span><ConceptText text={line} enabled={revealAnswer} /></span>
                </li>
              ))}
            </ul>
          )
        }
        if (block.type === 'sources') {
          return (
            <div key={index} className="mt-8 border-t border-line pt-4">
              <div className="flex items-center gap-2"><Icon icon={Database} size={15} className="text-primary" /><h3 className="font-serif text-[16px] font-semibold text-ink">{t('Sources')}</h3></div>
              <p className="mt-1 text-[11.5px] text-ink-3">{block.count ?? 0} {t('verified facts behind this article')}</p>
            </div>
          )
        }
        if (block.type === 'fact') {
          return (
            <div key={block.spanId ?? index} className="mt-3 flex items-start gap-3 rounded-lg border border-accent-line/70 bg-accent-tint/40 px-4 py-3">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
              <span className="min-w-0 flex-1 text-[15px] leading-[1.65] text-ink/90">{block.text}</span>
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-accent-line bg-surface px-2 py-0.5 font-mono text-[10px] font-semibold text-accent-strong">
                <Icon icon={Database} size={11} />{block.citationIds?.length ?? 0}
              </span>
            </div>
          )
        }
        return <ArticleCallout key={index} tone={block.tone ?? 'primary'} title={block.title ?? ''} text={block.text ?? ''} revealAnswer={revealAnswer} t={t} />
      })}
    </>
  )
}

/** Managed media (via `sourceId`) or a direct URL — mirrors `MediaFrame` in `Library.tsx`. */
function ArticleMediaFrame({ media, t }: { media: ArticleMediaRecord; t: (value: string) => string }) {
  const mediaRecords = useMediaRecords()
  const label = media.altText?.trim() || media.caption?.trim() || media.type
  if (media.sourceId) {
    const record = mediaRecords.get(media.sourceId)
    return record ? <PlacedAsset record={record} caption={media.caption} /> : <p role="alert" className="p-3 text-[11.5px] text-danger">{t('This managed media record is unavailable.')}</p>
  }
  if (!media.url) return null
  if (media.type === 'image') return <img src={media.url} alt={label} className="w-full rounded-lg object-contain" />
  if (media.type === 'video') return <video src={media.url} controls aria-label={label} className="w-full rounded-lg" />
  return <audio src={media.url} controls aria-label={label} className="w-full" />
}

function ArticlePreview({ item, anchor, revealAnswer, t }: { item: ManagedContentItem; anchor: PreviewAnchor | undefined; revealAnswer: boolean; t: (value: string) => string }) {
  const [evidence] = usePersistentState(MEDICAL_PUBLISHED_EVIDENCE_STORAGE_KEY, emptyMedicalEvidenceStore)
  const [graph] = usePersistentState(CONCEPT_STORAGE_KEY, initialConceptGraph)
  // A reviewer previews one item at a time; `related article` links only
  // resolve titles from this map, so a real cross-catalogue title will fall
  // back to its own id here rather than crash. See the report to Opus.
  const readable = useMemo(() => new Map([[item.id, item]]), [item])
  const sub = useMemo(() => articleToSubtopic(item, evidence, graph, readable), [item, evidence, graph, readable])
  const groups = useMemo(() => groupArticleBlocks(sub.blocks), [sub.blocks])
  const summaryActive = Boolean(anchor && (normalize(anchor.section) === 'article summary' || normalize(anchor.section) === 'summary' || (anchor.quote && normalize(sub.summary).includes(normalize(anchor.quote)))))

  return (
    <article className="space-y-4">
      <div>
        <h2 className="font-serif text-[21px] font-semibold tracking-[-0.01em] text-ink">{item.title}</h2>
        <p className="mt-1 text-[11.5px] text-ink-3">
          {sub.readingMin} {t('min read')}
          {sub.updatedAt && <> · {t('Updated')} {formatLongDate(new Date(sub.updatedAt))}</>}
        </p>
      </div>

      {sub.summary && (
        <AnchorFrame active={summaryActive} label={t('Requested media goes here')}>
          <p className="text-[15px] leading-[1.7] text-ink/90"><ConceptText text={sub.summary} enabled={revealAnswer} /></p>
        </AnchorFrame>
      )}

      {groups.map((group, index) => {
        const active = Boolean(anchor && ((group.heading && normalize(anchor.section) === normalize(group.heading)) || (anchor.quote && groupContainsQuote(group, anchor.quote))))
        return (
          <AnchorFrame key={index} active={active} label={t('Requested media goes here')}>
            {group.heading !== null && group.heading !== '' && (
              <h2 className="mb-1 font-serif text-[19px] font-semibold tracking-[-0.01em] text-ink">{group.heading}</h2>
            )}
            <ArticleBlockList blocks={group.blocks} revealAnswer={revealAnswer} t={t} />
          </AnchorFrame>
        )
      })}

      {revealAnswer && sub.keyPoints.length > 0 && (
        <section className="rounded-xl border border-line bg-surface p-4">
          <h3 className="text-[13px] font-semibold text-ink">{t('Hold these')}</h3>
          <ul className="mt-2.5 space-y-2">
            {sub.keyPoints.map((point, index) => (
              <li key={index} className="flex gap-2 text-[12.5px] leading-snug text-ink-2">
                <span className="mt-1.5 size-1 shrink-0 rounded-full bg-primary" />
                <ConceptText text={point} enabled={revealAnswer} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {revealAnswer && (sub.traps?.length ?? 0) > 0 && (
        <section className="overflow-hidden rounded-xl border border-line bg-surface">
          <div className="border-b border-line px-4 py-3"><h3 className="text-[13px] font-bold text-ink">{t('Where people lose the mark')}</h3></div>
          <ul className="divide-y divide-line px-4 py-1">
            {sub.traps!.map((trap, index) => (
              <li key={index} className="flex gap-2.5 py-3 text-[12.5px] leading-relaxed text-ink-2">
                <Icon icon={TriangleAlert} size={16} className="mt-0.5 shrink-0 text-danger" />
                <ConceptText text={trap} enabled={revealAnswer} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {(sub.media?.length ?? 0) > 0 && (
        <section className="mt-2 border-t border-line pt-4">
          <h3 className="text-[13px] font-semibold text-ink">{t('Media in this article')}</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {sub.media!.map((media) => {
              const active = Boolean(anchor?.quote && normalize(media.anchor?.quote) === normalize(anchor.quote))
              return (
                <AnchorFrame key={media.id} active={active} label={t('Requested media goes here')}>
                  <figure className="overflow-hidden rounded-xl border border-line bg-surface">
                    <ArticleMediaFrame media={media} t={t} />
                    {(media.caption || media.altText) && <figcaption className="border-t border-line px-3 py-2 text-[11.5px] leading-relaxed text-ink-2">{media.caption || media.altText}</figcaption>}
                  </figure>
                </AnchorFrame>
              )
            })}
          </div>
        </section>
      )}

      {(sub.relatedArticles?.length ?? 0) > 0 && (
        <section className="border-t border-line pt-4">
          <h3 className="text-[13px] font-semibold text-ink">{t('Related reading')}</h3>
          <ul className="mt-2 space-y-1.5">
            {sub.relatedArticles!.map((related) => (
              <li key={related.id} className="text-[12.5px] text-ink-2">{related.title}{related.reason && <span className="text-ink-3"> — {related.reason}</span>}</li>
            ))}
          </ul>
        </section>
      )}
    </article>
  )
}

/* ---------------------------------------------------------------------------
 * Essay preview (`item.kind === 'essay'`) — distinct from a `question` whose
 * `format` is `'essay'`; this is the standalone essay content type with its
 * own key-point mark scheme.
 * ------------------------------------------------------------------------- */
function EssayPreview({ item, anchor, revealAnswer, t }: { item: ManagedContentItem; anchor: PreviewAnchor | undefined; revealAnswer: boolean; t: (value: string) => string }) {
  const data = item.essayData
  if (!data || !data.prompt.trim()) return <UnavailablePreview item={item} reason={t('no prompt authored yet')} t={t} />
  const real = managedEssayToStudentEssay(item)
  const keyPoints = real?.keyPoints ?? data.keyPoints

  return (
    <div className="space-y-4">
      <AnchorFrame active={questionAnchorActive(anchor, 'stem')} label={t('Requested media goes here')}>
        <p className="text-[15.5px] font-semibold leading-snug text-ink"><ConceptText text={data.prompt} enabled={revealAnswer} /></p>
      </AnchorFrame>
      {revealAnswer && keyPoints.length > 0 && (
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.07em] text-ink-3">{t('Mark scheme')}</p>
          <ul className="mt-2 space-y-1.5">
            {keyPoints.map((point) => (
              <li key={point.id} className="flex items-start gap-2 text-[13px] leading-relaxed text-ink-2">
                <Icon icon={Check} size={14} className="mt-0.5 shrink-0 text-success" />
                <span>{point.text}{point.legible && <span className="ms-1 text-[10.5px] text-ink-3">({t('write legibly')})</span>}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {revealAnswer && data.examinerNote?.trim() && (
        <p className="rounded-lg border border-line bg-surface p-3 text-[12px] italic leading-relaxed text-ink-2">{t('Examiner note')}: {data.examinerNote}</p>
      )}
      {revealAnswer && data.modelAnswer?.trim() && (
        <div className="rounded-lg border border-primary-line bg-primary-tint/40 p-3.5">
          <p className="text-[11px] font-bold uppercase tracking-[0.07em] text-primary-strong">{t('Model answer')}</p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-ink">{data.modelAnswer}</p>
        </div>
      )}
    </div>
  )
}

/* ---------------------------------------------------------------------------
 * Practical preview — OSCE stations, clinical cases, and lab/imaging
 * interpretation sets each render their authored payload directly. The real
 * `PracticalRunner` is a stateful attempt (timer, running mark-scheme ticks,
 * `useRecordAttempt`) built for a student's own session; reusing it here would
 * either fabricate an attempt or need it restructured, which is out of scope
 * for this component. This instead shows the complete authored content, in
 * the runner's own visual language, statically.
 * ------------------------------------------------------------------------- */
function practicalAnchorActive(anchor: PreviewAnchor | undefined, candidates: string[], text?: string): boolean {
  if (!anchor) return false
  if (anchor.section && candidates.some((candidate) => normalize(candidate) === normalize(anchor.section))) return true
  if (anchor.quote && text && normalize(text).includes(normalize(anchor.quote))) return true
  return false
}

function PreviewMedia({ url, type, mimeType, name, mediaRecords }: { url: string; type?: 'image' | 'audio' | 'video'; mimeType?: string; name: string; mediaRecords: Map<string, MediaRecord> }) {
  const match = /^\/media\/([^/?#]+)$/.exec(url)
  let record: MediaRecord | undefined
  if (match) { try { record = mediaRecords.get(decodeURIComponent(match[1])) } catch { record = undefined } }
  if (record) return <PlacedAsset record={record} caption={name} />
  return <MediaAttachmentView attachment={{ id: url, type: type ?? 'image', name, url, mimeType }} />
}

function OscePreview({ item, data, anchor, revealAnswer, t }: { item: ManagedContentItem; data: Extract<PracticalAuthoringData, { format: 'osce' }>; anchor: PreviewAnchor | undefined; revealAnswer: boolean; t: (value: string) => string }) {
  const mediaRecords = useMediaRecords()
  return (
    <div className="space-y-4">
      <h2 className="font-serif text-[19px] font-semibold text-ink">{item.title}</h2>
      <AnchorFrame active={practicalAnchorActive(anchor, ['Candidate instructions', 'station'], data.candidateInstructions)} label={t('Requested media goes here')}>
        <p className="whitespace-pre-wrap text-[14px] leading-relaxed text-ink"><ConceptText text={data.candidateInstructions || t('No candidate instructions authored yet.')} enabled={revealAnswer} /></p>
      </AnchorFrame>
      {data.mediaUrl && (
        <AnchorFrame active={practicalAnchorActive(anchor, ['Station media'])} label={t('Requested media goes here')}>
          <PreviewMedia url={data.mediaUrl} type={data.mediaType} mimeType={data.mediaMimeType} name={`${item.title} — ${t('station media')}`} mediaRecords={mediaRecords} />
        </AnchorFrame>
      )}
      {revealAnswer && data.markSections.length > 0 && (
        <AnchorFrame active={practicalAnchorActive(anchor, ['Mark scheme'])} label={t('Requested media goes here')}>
          <p className="text-[11px] font-bold uppercase tracking-[0.07em] text-ink-3">{t('Mark scheme')}</p>
          <div className="mt-2 space-y-3">
            {data.markSections.map((section) => (
              <div key={section.id}>
                <p className="text-[12.5px] font-semibold text-ink">{section.title} <span className="font-normal text-ink-3">— {section.marks} {section.marks === 1 ? t('mark') : t('marks')}</span></p>
                <ul className="mt-1.5 space-y-1">
                  {section.items.map((mark) => (
                    <li key={mark.id} className="flex items-start gap-2 text-[12.5px] leading-relaxed text-ink-2">
                      <Icon icon={Check} size={13} className="mt-0.5 shrink-0 text-success" />
                      <span>{mark.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </AnchorFrame>
      )}
      {revealAnswer && data.actorOpening?.trim() && (
        <div className="rounded-lg border border-accent-line bg-accent-tint/40 p-3.5">
          <p className="text-[11px] font-bold uppercase tracking-[0.07em] text-accent-strong">{t('Actor opening line')}</p>
          <p className="mt-1.5 text-[13px] italic leading-relaxed text-ink">“{data.actorOpening}”</p>
        </div>
      )}
    </div>
  )
}

function CasePreview({ item, data, anchor, revealAnswer, t }: { item: ManagedContentItem; data: Extract<PracticalAuthoringData, { format: 'case' }>; anchor: PreviewAnchor | undefined; revealAnswer: boolean; t: (value: string) => string }) {
  const mediaRecords = useMediaRecords()
  if (!data.decisions.length) return <UnavailablePreview item={item} reason={t('no decision points authored yet')} t={t} />
  return (
    <div className="space-y-4">
      <h2 className="font-serif text-[19px] font-semibold text-ink">{item.title}</h2>
      <div className="divide-y divide-line rounded-xl border border-line bg-surface">
        {data.decisions.map((decision: ClinicalDecisionDraft, index) => {
          const answers = decision.answers.filter((option) => option.text.trim())
          const active = practicalAnchorActive(anchor, [decision.id, decision.title], `${decision.title} ${decision.context} ${decision.question}`)
          return (
            <AnchorFrame key={decision.id} active={active} className="p-4" label={t('Requested media goes here')}>
              <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.06em] text-ink-3">{t('Decision')} {index + 1}</p>
              <p className="mt-1.5 text-[14.5px] font-semibold text-ink">{decision.title}</p>
              {decision.context && <p className="mt-1 text-[13px] leading-relaxed text-ink-2"><ConceptText text={decision.context} enabled={revealAnswer} /></p>}
              {decision.mediaUrl && <div className="mt-3"><PreviewMedia url={decision.mediaUrl} type={decision.mediaType} mimeType={decision.mediaMimeType} name={decision.title || item.title} mediaRecords={mediaRecords} /></div>}
              {decision.question && <p className="mt-3 text-[13.5px] font-medium text-ink"><ConceptText text={decision.question} enabled={revealAnswer} /></p>}
              <div className="mt-3 space-y-2">
                {answers.map((answer, answerIndex) => {
                  const correct = revealAnswer && answer.correct
                  return (
                    <div key={answerIndex} className={cn('overflow-hidden rounded-lg border', correct ? 'border-success bg-success-tint' : 'border-line bg-surface')}>
                      <div className="flex items-start gap-3 p-3 text-[13.5px]">
                        <span className={cn('grid size-6 shrink-0 place-items-center rounded-full border font-mono text-[11px]', correct ? 'border-success bg-success text-on-success' : 'border-line-2 text-ink-2')}>
                          {correct ? <Icon icon={Check} size={12} strokeWidth={2.6} /> : LETTERS[answerIndex]}
                        </span>
                        <span className="text-ink"><ConceptText text={answer.text} enabled={revealAnswer} /></span>
                      </div>
                      {revealAnswer && answer.explanation && <p className="border-t border-current/10 px-12 py-2.5 text-[12px] leading-relaxed text-ink-2">{answer.explanation}</p>}
                    </div>
                  )
                })}
              </div>
              {revealAnswer && decision.rationale && (
                <div className="mt-3 rounded-lg border border-primary-line bg-primary-tint/50 p-3">
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.07em] text-primary-strong">{t('Decision rationale')}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-ink">{decision.rationale}</p>
                </div>
              )}
            </AnchorFrame>
          )
        })}
      </div>
      {revealAnswer && data.debrief?.trim() && (
        <div className="rounded-xl border border-line bg-surface p-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.07em] text-ink-3">{t('Case debrief')}</p>
          <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-2">{data.debrief}</p>
        </div>
      )}
    </div>
  )
}

function LabPreview({ item, data, anchor, revealAnswer, t }: { item: ManagedContentItem; data: Extract<PracticalAuthoringData, { format: 'lab' }>; anchor: PreviewAnchor | undefined; revealAnswer: boolean; t: (value: string) => string }) {
  const mediaRecords = useMediaRecords()
  if (!data.questions.length) return <UnavailablePreview item={item} reason={t('no interpretation questions authored yet')} t={t} />
  return (
    <div className="space-y-4">
      <h2 className="font-serif text-[19px] font-semibold text-ink">{item.title}</h2>
      <div className="divide-y divide-line rounded-xl border border-line bg-surface">
        {data.questions.map((question: LabQuestionDraft, index) => {
          const answers = question.answers.filter((option) => option.text.trim())
          const active = practicalAnchorActive(anchor, [question.id], `${question.context} ${question.question}`)
          return (
            <AnchorFrame key={question.id} active={active} className="p-4" label={t('Requested media goes here')}>
              <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.06em] text-ink-3">{t('Item')} {index + 1}</p>
              {question.context && <p className="mt-1.5 text-[13px] leading-relaxed text-ink-2"><ConceptText text={question.context} enabled={revealAnswer} /></p>}
              {question.mediaUrl && <div className="mt-3"><PreviewMedia url={question.mediaUrl} type={question.mediaType} mimeType={question.mediaMimeType} name={`${item.title} — ${t('interpretation')}`} mediaRecords={mediaRecords} /></div>}
              <p className="mt-3 text-[13.5px] font-medium text-ink"><ConceptText text={question.question} enabled={revealAnswer} /></p>
              <div className="mt-3 space-y-2">
                {answers.map((answer, answerIndex) => {
                  const correct = revealAnswer && answer.correct
                  return (
                    <div key={answerIndex} className={cn('flex items-start gap-3 rounded-lg border p-3 text-[13.5px]', correct ? 'border-success bg-success-tint' : 'border-line bg-surface')}>
                      <span className={cn('grid size-6 shrink-0 place-items-center rounded-full border font-mono text-[11px]', correct ? 'border-success bg-success text-on-success' : 'border-line-2 text-ink-2')}>
                        {correct ? <Icon icon={Check} size={12} strokeWidth={2.6} /> : LETTERS[answerIndex]}
                      </span>
                      <span className="text-ink"><ConceptText text={answer.text} enabled={revealAnswer} /></span>
                    </div>
                  )
                })}
              </div>
              {revealAnswer && question.explanation && (
                <p className="mt-3 rounded-lg border border-primary-line bg-primary-tint/50 p-3 text-[12.5px] leading-relaxed text-ink">{question.explanation}</p>
              )}
            </AnchorFrame>
          )
        })}
      </div>
    </div>
  )
}

function PracticalPreview({ item, anchor, revealAnswer, t }: { item: ManagedContentItem; anchor: PreviewAnchor | undefined; revealAnswer: boolean; t: (value: string) => string }) {
  const data = item.practicalData
  if (!data) return <UnavailablePreview item={item} reason={t('no practical content authored yet')} t={t} />
  if (data.format === 'osce') return <OscePreview item={item} data={data} anchor={anchor} revealAnswer={revealAnswer} t={t} />
  if (data.format === 'case') return <CasePreview item={item} data={data} anchor={anchor} revealAnswer={revealAnswer} t={t} />
  return <LabPreview item={item} data={data} anchor={anchor} revealAnswer={revealAnswer} t={t} />
}

/* ---------------------------------------------------------------------------
 * Public component
 * ------------------------------------------------------------------------- */
export function StudentFaithfulPreview({
  item,
  anchor,
  revealAnswer = true,
  className,
}: {
  item: ManagedContentItem
  /** Highlights the requested location, e.g. from `MediaRequest.section` / `slot` / `answerLabel` / `anchorQuote`. */
  anchor?: PreviewAnchor
  /** Default true — reviewers need the correct-answer context, not a blank quiz. */
  revealAnswer?: boolean
  className?: string
}) {
  const t = useT()

  const body = (() => {
    if (item.kind === 'question') return <QuestionPreview item={item} anchor={anchor} revealAnswer={revealAnswer} t={t} />
    if (item.kind === 'article') return <ArticlePreview item={item} anchor={anchor} revealAnswer={revealAnswer} t={t} />
    if (item.kind === 'practical') return <PracticalPreview item={item} anchor={anchor} revealAnswer={revealAnswer} t={t} />
    if (item.kind === 'essay') return <EssayPreview item={item} anchor={anchor} revealAnswer={revealAnswer} t={t} />
    return (
      <EmptyState
        icon={ImageOff}
        title={t('No student-facing preview for this content type yet')}
        description={`${item.title || item.id} — ${CONTENT_KIND_LABEL[item.kind]?.singular ?? item.kind}`}
      />
    )
  })()

  return (
    <div className={cn('min-w-0', className)} aria-label={t('Exactly as authored for students')}>
      {body}
    </div>
  )
}
