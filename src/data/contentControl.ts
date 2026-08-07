import type { Status } from './admin'
import { libraryTopicMeta, questionMeta } from './admin'
import { libraryTopics } from './library'
import { osceStations, clinicalCases, skills, labImaging } from './practical'
import { questions } from './qbank'
import { resources } from './resources'
import type { ConceptAnnotation } from './conceptGraph'
import type { ArticleSection } from './userLibrary'

export type ContentKind = 'question' | 'article' | 'practical' | 'resource'

export const CONTENT_LEDGER_STORAGE_KEY = 'synapse-admin-content-ledger-v4'

export type AnswerLabel = 'A' | 'B' | 'C' | 'D' | 'E' | 'F'

export interface QuestionAnswerDraft {
  label: AnswerLabel
  text: string
  explanation: string
}

export interface MediaAttachment {
  id: string
  type: 'image' | 'audio' | 'video'
  name: string
  url: string
  mimeType?: string
  size?: number
}

export interface QuestionTags {
  module: string
  topic: string
  subtopic: string
  conceptIds: string[]
  years: string[]
  universityIds: string[]
  cognitiveEffort: 'Low' | 'Medium' | 'High'
  setting: 'Academic' | 'Clinical' | 'Both'
  intendedDifficulty: 'Easy' | 'Moderate' | 'Hard'
  clinicalReasoningLevel: number
  inferredDifficulty: number
  examRelevance: number
  contextualConceptIds: string[]
  // ---- Extended blueprint tagging ----
  questionType?: string
  /** The concept ID(s) this question primarily assesses. */
  mainConceptIds?: string[]
  /** Every module ID this question applies to. */
  moduleIds?: string[]
  clinicalRelevance?: number
  academicRelevance?: number
  /** Cognitive effort on a 0–1 scale (finer than the Low/Medium/High band). */
  cognitiveEffortScore?: number
  /** Per-year exam-blueprint weight, keyed by year_ID, each 0–1. */
  examWeightByYear?: Record<string, number>
  /** If set, the question applies ONLY to these year/university IDs. */
  questionOnlyFor?: string[]
}

export interface QuestionAuthoringData {
  attachments: MediaAttachment[]
  correctAnswer: AnswerLabel
  answers: QuestionAnswerDraft[]
  attachedImage: string
  libraryIds: string[]
  resourceIds: string[]
  tags: QuestionTags
  learningObjective: string
  authorNotes: string
  sourceCitation: string
  estimatedSeconds: number
  randomiseAnswers: boolean
}

export interface ArticleAuthoringData {
  summary: string
  /** Legacy single-body text; superseded by named `sections` but kept for imports. */
  body: string
  /** Named clinical sections (Definition, Incidence, Pathophysiology, …). */
  sections: ArticleSection[]
  holdThese: string[]
  loseTheMark: string[]
  questionIds: string[]
  resourceIds: string[]
  annotations: ConceptAnnotation[]
  // ---- Scoping & concept tags ----
  /** University IDs this article applies to. */
  universityIds?: string[]
  /** Year IDs this article applies to. */
  yearIds?: string[]
  moduleIds?: string[]
  subtopicId?: string
  microtopicId?: string
  /** Concept IDs related to this article (from here, or auto-caught from a concept). */
  relatedConceptIds?: string[]
  /** University-specific notes (e.g. "Ain Shams only"), rendered as distinct callouts. */
  universityNotes?: Array<{ id: string; universityId: string; text: string }>
}

export interface PracticalAnswerDraft {
  id: string
  text: string
  explanation: string
  correct: boolean
}

export interface ActorBriefSectionDraft {
  id: string
  label: string
  content: string
  group?: string
}

export interface PracticalMarkSectionDraft {
  id: string
  title: string
  marks: number
  items: Array<{ id: string; text: string }>
}

export interface OsceAuthoringData {
  format: 'osce'
  candidateInstructions: string
  actorOpening: string
  actorSections: ActorBriefSectionDraft[]
  actorFlags: string[]
  markSections: PracticalMarkSectionDraft[]
  references: string[]
}

export interface ClinicalDecisionDraft {
  id: string
  title: string
  context: string
  question: string
  answers: PracticalAnswerDraft[]
  rationale: string
}

export interface CaseAuthoringData {
  format: 'case'
  decisions: ClinicalDecisionDraft[]
  debrief: string
  references: string[]
}

export interface LabQuestionDraft {
  id: string
  context: string
  question: string
  mediaUrl: string
  answers: PracticalAnswerDraft[]
  explanation: string
}

export interface LabAuthoringData {
  format: 'lab'
  subtype: 'Lab' | 'Imaging'
  questions: LabQuestionDraft[]
  references: string[]
}

export type PracticalAuthoringData = OsceAuthoringData | CaseAuthoringData | LabAuthoringData

export interface ManagedContentItem {
  id: string
  kind: ContentKind
  title: string
  subjectId: string
  status: Status
  owner: string
  updatedAt: string
  fields: Record<string, string>
  questionData?: QuestionAuthoringData
  articleData?: ArticleAuthoringData
  practicalData?: PracticalAuthoringData
}

const nowMinus = (hours: number) => new Date(Date.now() - hours * 3_600_000).toISOString()
const practicalStatus = (index: number): Status => ['Published', 'Published', 'Draft', 'In review'][index % 4] as Status

/** Seed the writable admin ledger from the same content the student app ships with. */
export function initialManagedContent(): ManagedContentItem[] {
  const answerLabels: AnswerLabel[] = ['A', 'B', 'C', 'D', 'E', 'F']
  const questionItems: ManagedContentItem[] = questions.map((question, index) => ({
    id: question.id,
    kind: 'question',
    title: question.stem,
    subjectId: question.subjectId,
    status: questionMeta[question.id]?.status ?? 'Draft',
    owner: questionMeta[question.id]?.author ?? 'Curriculum team',
    updatedAt: nowMinus(12 + index * 7),
    fields: {
      Topic: question.topic,
      Difficulty: question.difficulty,
      Vignette: question.vignette,
      Explanation: question.explanation,
    },
    questionData: {
      attachments: [],
      correctAnswer: (answerLabels[question.options.findIndex((option) => option.correct)] ?? 'A'),
      answers: answerLabels.map((label, answerIndex) => ({
        label,
        text: question.options[answerIndex]?.text ?? '',
        explanation: question.options[answerIndex]?.rationale ?? '',
      })),
      attachedImage: '',
      libraryIds: question.libraryRefs.map((reference) => reference.id),
      resourceIds: resources.filter((resource) => question.resourceRefs.some((reference) => reference.includes(resource.title) || resource.title.includes(reference.split(' · ')[0]))).map((resource) => resource.id),
      tags: {
        module: question.subjectId,
        topic: question.topic,
        subtopic: question.libraryRefs[0]?.title ?? '',
        conceptIds: [],
        years: ['Year 3'],
        universityIds: ['oms'],
        cognitiveEffort: question.difficulty === 'Easy' ? 'Low' : question.difficulty === 'Hard' ? 'High' : 'Medium',
        setting: 'Both',
        intendedDifficulty: question.difficulty,
        clinicalReasoningLevel: question.difficulty === 'Easy' ? 1 : question.difficulty === 'Hard' ? 4 : 3,
        inferredDifficulty: question.difficulty === 'Easy' ? 72 : question.difficulty === 'Hard' ? 38 : 56,
        examRelevance: question.difficulty === 'Hard' ? 8 : 7,
        contextualConceptIds: [],
      },
      learningObjective: question.explanation.split('. ')[0],
      authorNotes: '',
      sourceCitation: question.resourceRefs[0] ?? '',
      estimatedSeconds: question.difficulty === 'Hard' ? 120 : 90,
      randomiseAnswers: true,
    },
  }))

  const articleItems: ManagedContentItem[] = libraryTopics.flatMap((topic, topicIndex) =>
    topic.subtopics.map((article, articleIndex) => ({
      id: article.id,
      kind: 'article' as const,
      title: article.title,
      subjectId: topic.subjectId,
      status: libraryTopicMeta[topic.id]?.status ?? 'Draft',
      owner: libraryTopicMeta[topic.id]?.author ?? 'Curriculum team',
      updatedAt: nowMinus(8 + topicIndex * 18 + articleIndex * 3),
      fields: {
        Topic: topic.title,
        Summary: article.summary,
        'Reading time': String(article.readingMin),
        'Key point': article.keyPoints[0] ?? '',
      },
      articleData: {
        summary: article.summary,
        body: article.blocks.map((block) => block.text ?? block.items?.join('\n') ?? '').filter(Boolean).join('\n\n'),
        sections: article.blocks
          .filter((block) => block.type === 'h')
          .map((block, i) => ({ id: `sec-${article.id}-${i}`, heading: block.text ?? '', body: '' })),
        holdThese: article.keyPoints,
        loseTheMark: article.blocks.filter((block) => block.type === 'callout' && block.tone === 'warning').map((block) => block.text ?? '').filter(Boolean),
        questionIds: article.questions.map((question) => question.id),
        resourceIds: resources.filter((resource) => article.resources.some((reference) => reference.includes(resource.title) || resource.title.includes(reference.split(' · ')[0]))).map((resource) => resource.id),
        annotations: [],
      },
    })),
  )

  const practicalItems: ManagedContentItem[] = [
    ...osceStations.map((station, index) => ({
      id: station.id,
      kind: 'practical' as const,
      title: station.title,
      subjectId: station.subjectId,
      status: practicalStatus(index),
      owner: 'Clinical skills team',
      updatedAt: nowMinus(20 + index * 5),
      fields: {
        Type: 'OSCE station',
        Duration: String(station.minutes),
        Marks: String(station.marks),
        Difficulty: station.difficulty,
      },
    })),
    ...clinicalCases.map((item, index) => ({
      id: item.id,
      kind: 'practical' as const,
      title: item.title,
      subjectId: item.subjectId,
      status: practicalStatus(index + 1),
      owner: 'Clinical cases team',
      updatedAt: nowMinus(36 + index * 6),
      fields: {
        Type: 'Clinical case',
        Duration: String(item.minutes),
        Marks: String(item.steps),
        Difficulty: 'Moderate',
      },
    })),
    ...skills.map((skill, index) => ({
      id: skill.id,
      kind: 'practical' as const,
      title: skill.name,
      subjectId: 'cvs',
      status: practicalStatus(index + 2),
      owner: 'Clinical skills team',
      updatedAt: nowMinus(54 + index * 3),
      fields: {
        Type: 'Skills checklist',
        Duration: '8',
        Marks: '20',
        Difficulty: 'Moderate',
      },
    })),
    ...labImaging.map((set, index) => ({
      id: set.id,
      kind: 'practical' as const,
      title: set.title,
      subjectId: set.subjectId,
      status: practicalStatus(index + 3),
      owner: 'Investigations team',
      updatedAt: nowMinus(68 + index * 4),
      fields: {
        Type: set.type === 'Lab' ? 'Lab interpretation' : 'Imaging interpretation',
        Duration: '10',
        Marks: String(set.items),
        Difficulty: 'Moderate',
      },
    })),
  ]

  const resourceItems: ManagedContentItem[] = resources.map((resource, index) => ({
    id: resource.id,
    kind: 'resource',
    title: resource.title,
    subjectId: resource.subjectId,
    status: index === 4 ? 'Archived' : index % 7 === 0 ? 'In review' : 'Published',
    owner: resource.source,
    updatedAt: nowMinus(16 + index * 9),
    fields: {
      Type: resource.type,
      Source: resource.source,
      Location: resource.meta,
      Year: String(resource.year),
    },
  }))

  return [...questionItems, ...articleItems, ...practicalItems, ...resourceItems]
}

export const CONTENT_KIND_LABEL: Record<ContentKind, { singular: string; plural: string }> = {
  question: { singular: 'question', plural: 'Questions' },
  article: { singular: 'article', plural: 'Library articles' },
  practical: { singular: 'practical item', plural: 'Practical items' },
  resource: { singular: 'resource', plural: 'Resources' },
}

export const CONTENT_FIELDS: Record<ContentKind, Array<{ key: string; label: string; multiline?: boolean }>> = {
  question: [
    { key: 'Topic', label: 'Topic' },
    { key: 'Difficulty', label: 'Difficulty' },
    { key: 'Vignette', label: 'Clinical vignette', multiline: true },
    { key: 'Explanation', label: 'Worked explanation', multiline: true },
  ],
  article: [
    { key: 'Topic', label: 'Chapter' },
    { key: 'Summary', label: 'Article summary', multiline: true },
    { key: 'Reading time', label: 'Reading time (minutes)' },
    { key: 'Key point', label: 'Essential key point', multiline: true },
  ],
  practical: [
    { key: 'Type', label: 'Practical format' },
    { key: 'Duration', label: 'Duration (minutes)' },
    { key: 'Marks', label: 'Available marks' },
    { key: 'Difficulty', label: 'Difficulty' },
  ],
  resource: [
    { key: 'Type', label: 'Resource type' },
    { key: 'Source', label: 'Source or publisher' },
    { key: 'Location', label: 'Exact page, slide, chapter, or timestamp' },
    { key: 'Year', label: 'Publication year' },
    { key: 'Topics', label: 'Tagged topics (IDs/titles)', multiline: true },
    { key: 'Chapter', label: 'Chapter / module' },
    { key: 'Included concepts', label: 'Included concept IDs (one per line)', multiline: true },
    { key: 'Included articles', label: 'Included library article IDs', multiline: true },
  ],
}
