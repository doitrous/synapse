import type { ContentKind, ManagedContentItem, QuestionAnswerDraft, AnswerLabel } from './contentControl'

export interface ImportFieldDefinition {
  key: string
  label: string
  required?: boolean
  help: string
}

export interface ImportSchemaDefinition {
  noun: string
  fields: ImportFieldDefinition[]
  markdownExample: string
}

const common: ImportFieldDefinition[] = [
  { key: 'id', label: 'Canonical ID', help: 'Optional. Used to update an existing item when merge mode is enabled.' },
  { key: 'title', label: 'Title', required: true, help: 'The student-facing title or concise question label.' },
  { key: 'subject', label: 'Subject ID', required: true, help: 'Canonical subject ID such as cvs, resp, renal, neuro, or pharm.' },
  { key: 'status', label: 'Status', help: 'Draft, In review, Published, or Archived. Defaults to Draft.' },
  { key: 'owner', label: 'Owner', help: 'Author or team responsible for review.' },
]

export const IMPORT_SCHEMAS: Record<ContentKind, ImportSchemaDefinition> = {
  question: {
    noun: 'questions',
    fields: [
      ...common,
      { key: 'vignette', label: 'Question context / vignette', help: 'Clinical or academic context shown before the main question.' },
      { key: 'question', label: 'Question', required: true, help: 'The main question, kept separate from its context.' },
      { key: 'correct_answer', label: 'Correct answer', required: true, help: 'A, B, C, D, E, or F.' },
      ...(['A', 'B', 'C', 'D', 'E', 'F'] as const).flatMap((letter) => [
        { key: `answer_${letter.toLowerCase()}`, label: `Answer ${letter}`, help: `Answer option ${letter}. Blank optional answers are omitted.` },
        { key: `explanation_${letter.toLowerCase()}`, label: `Explanation ${letter}`, help: `Why answer ${letter} is correct or incorrect.` },
      ]),
      { key: 'topic', label: 'Topic', help: 'Canonical topic or blueprint heading.' },
      { key: 'subtopic', label: 'Subtopic', help: 'More specific curriculum location.' },
      { key: 'difficulty', label: 'Intended difficulty', help: 'Easy, Moderate, or Hard.' },
      { key: 'module', label: 'Related module', help: 'Module ID or title.' },
      { key: 'concept_ids', label: 'Concept IDs', help: 'Canonical concept IDs separated by |, semicolon, or new lines.' },
      { key: 'years', label: 'Relevant years', help: 'Year labels separated by |, semicolon, or new lines.' },
      { key: 'universities', label: 'Relevant universities', help: 'Canonical university IDs separated by |, semicolon, or new lines.' },
      { key: 'cognitive_effort', label: 'Cognitive effort', help: 'Low, Medium, or High.' },
      { key: 'setting', label: 'Academic / clinical', help: 'Academic, Clinical, or Both.' },
      { key: 'reasoning_level', label: 'Clinical reasoning level', help: 'Integer from 0 to 5.' },
      { key: 'inferred_difficulty', label: 'Psychometric difficulty', help: 'Estimated percent correct from 0 to 100.' },
      { key: 'exam_relevance', label: 'Exam relevance', help: 'Blueprint relevance from 0 to 10.' },
      { key: 'contextual_concept_ids', label: 'Contextual concept IDs', help: 'Concepts that do not receive mastery evidence.' },
      { key: 'library_ids', label: 'Related library IDs', help: 'Canonical article IDs.' },
      { key: 'resource_ids', label: 'Related resource IDs', help: 'Canonical resource IDs.' },
      { key: 'learning_objective', label: 'Learning objective', help: 'What a correct response demonstrates.' },
      { key: 'source_citation', label: 'Source citation', help: 'Guideline, book, paper, or source URL.' },
    ],
    markdownExample: `# Item\n\n## title\nPulmonary embolism: first action\n\n## subject\ncvs\n\n## vignette\nA 34-year-old woman is acutely breathless six days after a caesarean section.\n\n## question\nWhat is your first action?\n\n## correct_answer\nA\n\n## answer_a\nGive oxygen and assess immediate threats\n\n## explanation_a\nTreat hypoxia while the diagnosis remains open.\n\n## answer_b\nWait for imaging before treatment\n\n## explanation_b\nThis delays treatment in a high-probability presentation.\n\n## topic\nVenous thromboembolism\n\n## difficulty\nModerate\n\n---\n\n# Item\n...`,
  },
  article: {
    noun: 'library articles',
    fields: [
      ...common,
      { key: 'topic', label: 'Library topic', required: true, help: 'Parent topic shown in the library navigator.' },
      { key: 'summary', label: 'Summary', required: true, help: 'Opening summary for the article.' },
      { key: 'body', label: 'Article body', required: true, help: 'Markdown or plain text body. Multi-line content is preserved.' },
      { key: 'hold_these', label: 'Hold these', help: 'High-yield points separated by new lines, |, or semicolons.' },
      { key: 'lose_the_mark', label: 'Where people lose the mark', help: 'Common traps separated by new lines, |, or semicolons.' },
      { key: 'question_ids', label: 'Question IDs', help: 'Canonical question IDs that test this article.' },
      { key: 'resource_ids', label: 'Resource IDs', help: 'Canonical resources that teach this article.' },
      { key: 'reading_time', label: 'Reading time', help: 'Estimated minutes.' },
    ],
    markdownExample: `# Item\n\n## title\nInitial management of pulmonary embolism\n\n## subject\ncvs\n\n## topic\nVenous thromboembolism\n\n## summary\nTreat immediate threats while confirming the diagnosis.\n\n## body\nGive oxygen for hypoxia and assess haemodynamic stability.\n\n## hold_these\nOxygen and ABC assessment come first.\nAnticoagulation should not wait in a high-probability patient without contraindications.\n\n## lose_the_mark\nOrdering D-dimer when CTPA is already indicated.\nWaiting for imaging before treating a high-probability patient.\n\n---\n\n# Item\n...`,
  },
  practical: {
    noun: 'practical items',
    fields: [
      ...common,
      { key: 'type', label: 'Practical type', required: true, help: 'OSCE station, Clinical case, Skills checklist, Lab interpretation, or Imaging interpretation.' },
      { key: 'duration', label: 'Duration', help: 'Expected minutes.' },
      { key: 'marks', label: 'Marks / decisions', help: 'Total marks or number of decisions.' },
      { key: 'difficulty', label: 'Difficulty', help: 'Easy, Moderate, or Hard.' },
      { key: 'candidate_instructions', label: 'Candidate instructions', help: 'Student-facing station brief.' },
      { key: 'actor_opening', label: 'Actor opening', help: 'Opening statement for the actor.' },
      { key: 'actor_sections', label: 'Actor brief sections', help: 'One “Section: content” entry per line.' },
      { key: 'actor_flags', label: 'Actor flags', help: 'Behavioural flags separated by new lines.' },
      { key: 'mark_scheme', label: 'Mark scheme', help: 'One “Section (marks): item” entry per line.' },
      { key: 'references', label: 'Read around it', help: 'Resource references separated by new lines.' },
    ],
    markdownExample: `# Item\n\n## title\nHistory: chest pain in a 54-year-old\n\n## subject\ncvs\n\n## type\nOSCE station\n\n## duration\n8\n\n## candidate_instructions\nTake a focused history and present your differential.\n\n## actor_opening\nIt came on when I was carrying shopping upstairs.\n\n## actor_sections\nWho you are: Daniel Rossi, 54, self-employed builder.\nRadiation: Down my left arm and into my jaw.\n\n## actor_flags\nIf the candidate lectures without checking understanding, become quieter.\n\n## mark_scheme\nOpening and structure (15): Introduces self and confirms identity\nPain characterisation (25): Establishes site, onset, character and radiation`,
  },
  resource: {
    noun: 'resources',
    fields: [
      ...common,
      { key: 'type', label: 'Resource type', required: true, help: 'Book, Video, Guideline, Deck, or Article.' },
      { key: 'source', label: 'Source', required: true, help: 'Publisher, institution, or author.' },
      { key: 'url', label: 'Resource URL', help: 'Direct link or internal asset URL.' },
      { key: 'year', label: 'Publication year', help: 'Four-digit year.' },
      { key: 'description', label: 'Description', help: 'What the resource teaches and why it is relevant.' },
    ],
    markdownExample: `# Item\n\n## title\nNICE NG158 · Venous thromboembolic diseases\n\n## subject\ncvs\n\n## type\nGuideline\n\n## source\nNICE\n\n## url\nhttps://www.nice.org.uk/guidance/ng158\n\n## year\n2026\n\n## description\nDiagnosis and initial management of suspected pulmonary embolism.`,
  },
}

export function splitImportList(value = '') {
  return value.split(/\r?\n|\||;/).map((item) => item.trim()).filter(Boolean)
}

export function validateImportRow(kind: ContentKind, values: Record<string, string>) {
  const errors = IMPORT_SCHEMAS[kind].fields.filter((field) => field.required && !values[field.key]?.trim()).map((field) => `${field.label} is required`)
  if (kind === 'question') {
    const answer = values.correct_answer?.trim().toUpperCase()
    if (answer && !/^[A-F]$/.test(answer)) errors.push('Correct answer must be A–F')
    if (answer && !values[`answer_${answer.toLowerCase()}`]?.trim()) errors.push(`Answer ${answer} is marked correct but has no text`)
  }
  return errors
}

function normalizeStatus(value: string): ManagedContentItem['status'] {
  return ['Draft', 'In review', 'Published', 'Archived'].includes(value) ? value as ManagedContentItem['status'] : 'Draft'
}

function numberInRange(value: string, fallback: number, min: number, max: number) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? Math.min(max, Math.max(min, parsed)) : fallback
}

function stableHash(value: string) {
  let hash = 2166136261
  for (let index = 0; index < value.length; index++) hash = Math.imul(hash ^ value.charCodeAt(index), 16777619)
  return (hash >>> 0).toString(36)
}

export function importRowToContent(kind: ContentKind, values: Record<string, string>, rowKey: string): ManagedContentItem {
  const id = values.id?.trim() || `import-${kind}-${stableHash(`${values.title}-${rowKey}`)}`
  const base: ManagedContentItem = {
    id,
    kind,
    title: values.title.trim(),
    subjectId: values.subject.trim().toLowerCase(),
    status: normalizeStatus(values.status),
    owner: values.owner?.trim() || 'Import queue',
    updatedAt: new Date().toISOString(),
    fields: {},
  }

  if (kind === 'question') {
    const labels: AnswerLabel[] = ['A', 'B', 'C', 'D', 'E', 'F']
    const answers: QuestionAnswerDraft[] = labels.map((label) => ({ label, text: values[`answer_${label.toLowerCase()}`]?.trim() ?? '', explanation: values[`explanation_${label.toLowerCase()}`]?.trim() ?? '' }))
    const difficulty = ['Easy', 'Moderate', 'Hard'].includes(values.difficulty) ? values.difficulty as 'Easy' | 'Moderate' | 'Hard' : 'Moderate'
    return { ...base, title: values.question?.trim() || base.title, fields: { Topic: values.topic ?? '', Difficulty: difficulty, Vignette: values.vignette ?? '', Explanation: answers.find((answer) => answer.label === values.correct_answer?.toUpperCase())?.explanation ?? '' }, questionData: { attachments: [], correctAnswer: (/^[A-F]$/.test(values.correct_answer?.toUpperCase()) ? values.correct_answer.toUpperCase() : 'A') as AnswerLabel, answers, attachedImage: '', libraryIds: splitImportList(values.library_ids), resourceIds: splitImportList(values.resource_ids), tags: { module: values.module || base.subjectId, topic: values.topic || '', subtopic: values.subtopic || '', conceptIds: splitImportList(values.concept_ids), years: splitImportList(values.years), universityIds: splitImportList(values.universities), cognitiveEffort: ['Low', 'Medium', 'High'].includes(values.cognitive_effort) ? values.cognitive_effort as 'Low' | 'Medium' | 'High' : 'Medium', setting: ['Academic', 'Clinical', 'Both'].includes(values.setting) ? values.setting as 'Academic' | 'Clinical' | 'Both' : 'Both', intendedDifficulty: difficulty, clinicalReasoningLevel: numberInRange(values.reasoning_level, 2, 0, 5), inferredDifficulty: numberInRange(values.inferred_difficulty, 50, 0, 100), examRelevance: numberInRange(values.exam_relevance, 5, 0, 10), contextualConceptIds: splitImportList(values.contextual_concept_ids) }, learningObjective: values.learning_objective || '', authorNotes: '', sourceCitation: values.source_citation || '', estimatedSeconds: 90, randomiseAnswers: true } }
  }
  if (kind === 'article') return { ...base, fields: { Topic: values.topic || '', Summary: values.summary || '', 'Reading time': values.reading_time || '5', 'Key point': splitImportList(values.hold_these)[0] || '' }, articleData: { summary: values.summary || '', body: values.body || '', holdThese: splitImportList(values.hold_these), loseTheMark: splitImportList(values.lose_the_mark), questionIds: splitImportList(values.question_ids), resourceIds: splitImportList(values.resource_ids), annotations: [] } }
  if (kind === 'practical') return { ...base, fields: { Type: values.type || 'OSCE station', Duration: values.duration || '8', Marks: values.marks || '20', Difficulty: values.difficulty || 'Moderate', 'Candidate instructions': values.candidate_instructions || '', 'Actor opening': values.actor_opening || '', 'Actor sections': values.actor_sections || '', 'Actor flags': values.actor_flags || '', 'Mark scheme': values.mark_scheme || '', References: values.references || '' } }
  return { ...base, fields: { Type: values.type || 'Article', Source: values.source || '', URL: values.url || '', Year: values.year || '', Description: values.description || '' } }
}
