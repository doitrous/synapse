import { isStudentPublishable, type ManagedContentItem } from './contentControl.ts'
import { DIFFICULTIES, type Difficulty, type Question } from './qbank.ts'
import { questionInAudience } from '../lib/questionAudience.ts'

// Content cache snapshots are immutable; all readers of one snapshot share its
// reference lookup. Weak keys release the old lookup when content is refreshed.
const titleIndexes = new WeakMap<ManagedContentItem[], Map<string, string>>()
function catalogueTitles(catalogue: ManagedContentItem[]): Map<string, string> {
  let titles = titleIndexes.get(catalogue)
  if (!titles) {
    titles = new Map(catalogue.map((entry) => [entry.id, entry.title]))
    titleIndexes.set(catalogue, titles)
  }
  return titles
}

function difficultyFor(item: ManagedContentItem): Difficulty {
  const value = item.questionData?.tags.intendedDifficulty ?? item.fields.Difficulty
  return DIFFICULTIES.includes(value as Difficulty) ? value as Difficulty : 'Moderate'
}

/**
 * The module ids a question is tagged for: its own `moduleIds`, plus the module
 * named at the head of each `module > subject > topic` path. Same union the
 * server's `itemModules` takes, so the chooser groups by the authored module.
 */
function questionModuleIds(tags: { moduleIds?: string[]; moduleSubjectPaths?: string[] }): string[] {
  const fromPaths = (tags.moduleSubjectPaths ?? [])
    .map((path) => path.split('>')[0]?.trim())
    .filter((module): module is string => Boolean(module))
  return [...new Set([...(tags.moduleIds ?? []), ...fromPaths])]
}

/** Convert the admin authoring shape into the exact question shape used by students. */
export function managedQuestionToStudentQuestion(
  item: ManagedContentItem,
  catalogue: ManagedContentItem[],
): Question | null {
  if (item.kind !== 'question' || !isStudentPublishable(item) || !item.questionData) return null

  const data = item.questionData
  const answers = data.answers.filter((answer) => answer.text.trim())
  if (answers.length < 2 || !answers.some((answer) => answer.label === data.correctAnswer)) return null

  const titlesById = catalogueTitles(catalogue)
  const correctExplanation = answers.find((answer) => answer.label === data.correctAnswer)?.explanation ?? ''

  return {
    id: item.id,
    subjectId: item.subjectId,
    topic: data.tags.topic.trim() || item.fields.Topic?.trim() || 'General',
    difficulty: difficultyFor(item),
    vignette: item.fields.Vignette?.trim() ?? '',
    stem: item.title,
    options: answers.map((answer) => ({
      text: answer.text,
      correct: answer.label === data.correctAnswer,
      rationale: answer.explanation,
    })),
    explanation: item.fields.Explanation?.trim() || correctExplanation,
    libraryRefs: data.libraryIds.map((id) => ({ id, title: titlesById.get(id) ?? id })),
    resourceRefs: data.resourceIds.map((id) => titlesById.get(id) ?? id),
    attachedImage: data.attachedImage.trim() || undefined,
    attachments: (data.attachments ?? []).map((attachment) => ({ ...attachment })),
    learningObjective: data.learningObjective.trim() || undefined,
    // `contextualConceptIds` is deliberately absent: those are mentioned by the
    // vignette but never assessed, so surfacing them would send a student to
    // revise something this question did not measure.
    conceptIds: [...new Set([...(data.tags.mainConceptIds ?? []), ...data.tags.conceptIds])],
    source: data.tags.sourceCategory,
    moduleIds: questionModuleIds(data.tags),
  }
}

/**
 * The same inclusion rule as `managedQuestionToStudentQuestion` (question kind,
 * publishable, has real data, at least two answers, a correct one among them),
 * but stops there: no options/rationale array, no explanation, no cross-catalogue
 * title lookups for library/resource refs, no attachments. Everything a hub
 * needs to count and group questions — id, subject, topic, difficulty,
 * vignette/stem text, source, concept and library *ids* — is cheap to read
 * straight off the authoring record, so this is O(1) per item instead of
 * `managedQuestionToStudentQuestion`'s per-item catalogue-wide title map.
 *
 * ponytail: `libraryRefs[].title` is set to the raw id, not the real title —
 * fine for scope/count matching (which only reads `.id`), wrong to render.
 * Anything that needs the real title (starting a test) is rebuilt from
 * `publishedQuestionsForAudience` first — see `useScopedPublishedQuestions`'s
 * `enabled` gate.
 */
function managedQuestionToSummary(item: ManagedContentItem): Question | null {
  if (item.kind !== 'question' || !isStudentPublishable(item) || !item.questionData) return null

  const data = item.questionData
  // A record with no `answers` at all came from `/content/questions?view=summary`,
  // where the server strips them *after* applying this exact rule
  // (`isAnswerableQuestion`). A record that has them is re-checked here, which
  // is every record in the demo build and every one that still carries a key.
  const answers = (data.answers ?? []).filter((answer) => answer.text.trim())
  if (data.answers && (answers.length < 2 || !answers.some((answer) => answer.label === data.correctAnswer))) return null

  return {
    id: item.id,
    subjectId: item.subjectId,
    topic: data.tags.topic.trim() || item.fields.Topic?.trim() || 'General',
    difficulty: difficultyFor(item),
    vignette: item.fields.Vignette?.trim() ?? '',
    stem: item.title,
    options: [],
    explanation: '',
    libraryRefs: data.libraryIds.map((id) => ({ id, title: id })),
    resourceRefs: [],
    attachedImage: data.attachedImage.trim() || undefined,
    attachments: [],
    learningObjective: undefined,
    conceptIds: [...new Set([...(data.tags.mainConceptIds ?? []), ...data.tags.conceptIds])],
    source: data.tags.sourceCategory,
    moduleIds: questionModuleIds(data.tags),
  }
}

/** The server has already scoped these rows; room setup adds no client audience gate. */
export function publishedQuestionSummariesFromCatalogue(catalogue: ManagedContentItem[]): Question[] {
  return catalogue.map(managedQuestionToSummary).filter((question): question is Question => question !== null)
}

/** Project the catalogue to lightweight, audience-scoped question descriptors — see `managedQuestionToSummary`. */
export function publishedQuestionSummariesForAudience(
  catalogue: ManagedContentItem[],
  audience: { universityId?: string; yearId?: string },
): Question[] {
  const { universityId, yearId } = audience
  return catalogue
    .map((item) => (questionInAudience(item, universityId, yearId) ? managedQuestionToSummary(item) : null))
    .filter((question): question is Question => question !== null)
}

const projections = new WeakMap<ManagedContentItem[], Question[]>()
export function publishedQuestionsFromCatalogue(catalogue: ManagedContentItem[]): Question[] {
  const cached = projections.get(catalogue)
  if (cached) return cached
  const questions = catalogue
    .map((item) => managedQuestionToStudentQuestion(item, catalogue))
    .filter((question): question is Question => question !== null)
  projections.set(catalogue, questions)
  return questions
}

/** Project the catalogue to the questions a student in this audience may sit. */
export function publishedQuestionsForAudience(
  catalogue: ManagedContentItem[],
  audience: { universityId?: string; yearId?: string },
): Question[] {
  const { universityId, yearId } = audience
  return catalogue
    .map((item) =>
      questionInAudience(item, universityId, yearId) ? managedQuestionToStudentQuestion(item, catalogue) : null,
    )
    .filter((question): question is Question => question !== null)
}

