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
      { key: 'difficulty', label: 'Intended difficulty', help: 'Easy, Moderate, Hard, or Challenging.' },
      { key: 'question_type', label: 'Question type', help: 'What it tests — e.g. Pathophysiology, Diagnosis, Investigation, Treatment, Mechanism.' },
      { key: 'main_concept', label: 'Main concept(s)', help: 'The concept ID(s) this question primarily tests. At least one is expected.' },
      { key: 'module', label: 'Module ID(s)', help: 'Every module this question is applicable to, separated by |, ; or new lines.' },
      { key: 'clinical_relevance', label: 'Clinical relevance (0–1)', help: 'How clinically relevant the question is.' },
      { key: 'academic_relevance', label: 'Academic relevance (0–1)', help: 'How academically relevant the question is.' },
      { key: 'cognitive_effort', label: 'Cognitive effort (0–1)', help: 'How much thinking the question demands.' },
      { key: 'exam_weight_by_year', label: 'Exam weight by year', help: 'Per-year blueprint weight as "YEAR_ID=weight" entries, e.g. OMS_Y2=0.7 | OMS_Y3=0.5.' },
      { key: 'question_only_for', label: 'Restrict to years/universities', help: 'If set, the question ONLY applies to these year/university IDs, regardless of subject scope.' },
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
      { key: 'sections', label: 'Sections', help: 'Named clinical sections. Start each with "### Heading" on its own line, then the section text. Common headings: Definition, Incidence, Pathophysiology, Pathology, Clinical Picture, Investigation, Treatment.' },
      { key: 'body', label: 'Article body (legacy)', help: 'Optional plain-text body used only if no sections are given.' },
      { key: 'hold_these', label: 'Hold these', help: 'High-yield points separated by new lines, |, or semicolons.' },
      { key: 'lose_the_mark', label: 'Where people lose the mark', help: 'Common traps separated by new lines, |, or semicolons.' },
      { key: 'universities', label: 'University IDs', help: 'All universities this article applies to, separated by |, ; or new lines (e.g. OMS | MMS).' },
      { key: 'university_notes', label: 'University-only notes', help: 'University-specific callouts, one per line as "OMS: note text". Rendered as a distinct in-article aside.' },
      { key: 'years', label: 'Year IDs', help: 'All years this article is applicable on (e.g. OMS_Y2).' },
      { key: 'module', label: 'Module ID(s)', help: 'Module(s) this article sits under.' },
      { key: 'subtopic', label: 'Subtopic ID', help: 'Subtopic ID (SUB_*).' },
      { key: 'microtopic', label: 'Microtopic ID', help: 'Microtopic ID (MIC_*).' },
      { key: 'related_concepts', label: 'Related concepts', help: 'Concept IDs discussed by this article.' },
      { key: 'question_ids', label: 'Question IDs', help: 'Canonical question IDs that test this article.' },
      { key: 'resource_ids', label: 'Resource IDs', help: 'Canonical resources that teach this article.' },
      { key: 'reading_time', label: 'Reading time', help: 'Estimated minutes.' },
    ],
    markdownExample: `# Item\n\n## title\nPulmonary embolism\n\n## subject\ncvs\n\n## topic\nVenous thromboembolism\n\n## summary\nA common, treatable cause of acute breathlessness that must be confirmed and treated in parallel.\n\n## sections\n### Definition\nOcclusion of the pulmonary arterial tree, usually by thrombus embolising from a deep vein.\n### Incidence\nCommon; risk rises with immobility, surgery, malignancy, and pregnancy.\n### Pathophysiology\nMechanical obstruction and vasoactive mediators raise pulmonary vascular resistance and strain the right ventricle.\n### Clinical Picture\nPleuritic chest pain, breathlessness, tachycardia; massive PE causes haemodynamic collapse.\n### Investigation\nWells score guides D-dimer vs CTPA; ECG and ABG are supportive.\n### Treatment\nOxygen for hypoxia, anticoagulation, and thrombolysis for haemodynamic instability.\n\n## hold_these\nOxygen and ABC assessment come first.\nAnticoagulation should not wait in a high-probability patient without contraindications.\n\n## lose_the_mark\nOrdering D-dimer when CTPA is already indicated.\n\n---\n\n# Item\n...`,
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
      { key: 'actor_flags', label: 'Actor flags', help: 'Behavioural flags separated by new lines. (OSCE station)' },
      { key: 'mark_scheme', label: 'Mark scheme', help: 'One “Section (marks): item” entry per line. (OSCE station)' },
      { key: 'decisions', label: 'Case decisions', help: 'Clinical-case decision points. Start each with "### Decision title", then "Q: question", options as "* option" (mark the right one "*= option"), and "Rationale: …". (Clinical case)' },
      { key: 'debrief', label: 'Case debrief', help: 'Summary shown after a clinical case. (Clinical case)' },
      { key: 'lab_subtype', label: 'Lab / Imaging', help: 'Lab or Imaging — for interpretation sets.' },
      { key: 'lab_questions', label: 'Interpretation questions', help: 'Start each with "### Stem", then "Q: question", options as "* option" ("*= option" is correct), and "Explanation: …". (Lab/Imaging interpretation)' },
      { key: 'references', label: 'Read around it', help: 'Resource references separated by new lines.' },
    ],
    markdownExample: `# One file can mix every practical type — separate items with ---\n\n# Item\n\n## title\nHistory: chest pain in a 54-year-old\n\n## subject\ncvs\n\n## type\nOSCE station\n\n## duration\n8\n\n## candidate_instructions\nTake a focused history and present your differential.\n\n## actor_opening\nIt came on when I was carrying shopping upstairs.\n\n## actor_sections\nWho you are: Daniel Rossi, 54, self-employed builder.\nRadiation: Down my left arm and into my jaw.\n\n## mark_scheme\nOpening and structure (15): Introduces self and confirms identity\nPain characterisation (25): Establishes site, onset, character and radiation\n\n---\n\n# Item\n\n## title\nAcute central chest pain\n\n## subject\ncvs\n\n## type\nClinical case\n\n## decisions\n### Immediate action\nQ: What is your first step?\n*= Give aspirin and arrange an ECG\n* Send home with analgesia\nRationale: Early ECG and aspirin are time-critical in suspected ACS.\n\n## debrief\nThe case rewards early recognition and treatment of immediate threats.\n\n---\n\n# Item\n\n## title\nChest X-ray basics\n\n## subject\nresp\n\n## type\nImaging interpretation\n\n## lab_subtype\nImaging\n\n## lab_questions\n### Consolidation vs effusion\nQ: What does the blunted costophrenic angle indicate?\n*= A pleural effusion\n* Lobar consolidation\nExplanation: A meniscus and blunted angle indicate fluid, not consolidation.\n\n---\n\n# Item\n\n## title\nCardiovascular examination\n\n## subject\ncvs\n\n## type\nSkills checklist\n\n## duration\n8\n\n## marks\n20`,
  },
  resource: {
    noun: 'resources',
    fields: [
      ...common,
      { key: 'type', label: 'Resource type', required: true, help: 'Book, Video, Guideline, Deck, or Article.' },
      { key: 'source', label: 'Source', required: true, help: 'Publisher, institution, or author.' },
      { key: 'url', label: 'Resource URL', help: 'Direct link or internal asset URL.' },
      { key: 'year', label: 'Publication year', help: 'Four-digit year.' },
      { key: 'topics', label: 'Tagged topics', help: 'Topic/subtopic IDs or titles this resource covers, separated by |, ; or new lines. Solving questions on this resource pulls in these topics.' },
      { key: 'chapter', label: 'Chapters', help: 'One or more chapters this resource covers, separated by |, ; or new lines (Files live in the Files tab, Videos in the Videos tab).' },
      { key: 'module_ids', label: 'Module IDs', help: 'Module IDs this resource serves (e.g. CVS 01), separated by |, ; or new lines.' },
      { key: 'included_concepts', label: 'Included concepts', help: 'Concept IDs this resource covers. Each concept is auto-updated to approve this resource. Add precise page/timestamp deep-links in the resource editor.' },
      { key: 'included_articles', label: 'Included library articles', help: 'Library article IDs this resource supports.' },
      { key: 'description', label: 'Description', help: 'What the resource teaches and why it is relevant.' },
    ],
    markdownExample: `# Item\n\n## title\nNICE NG158 · Venous thromboembolic diseases\n\n## subject\ncvs\n\n## type\nGuideline\n\n## source\nNICE\n\n## url\nhttps://www.nice.org.uk/guidance/ng158\n\n## year\n2026\n\n## topics\nTPC_HF\nSUB_HF_MGMT\n\n## chapter\nVenous thromboembolism\nHeart failure\n\n## module_ids\nCVS 01\n\n## included_concepts\nmed.concept.loop-diuretics\nmed.concept.heart-failure\n\n## included_articles\nhf-mgmt\n\n## description\nDiagnosis and initial management of suspected pulmonary embolism.`,
  },
}

export function splitImportList(value = '') {
  return value.split(/\r?\n|\||;/).map((item) => item.trim()).filter(Boolean)
}

/** Parse a "### Heading" delimited block into named article sections. */
export function parseSections(value = ''): Array<{ id: string; heading: string; body: string }> {
  if (!value.trim()) return []
  const out: Array<{ id: string; heading: string; body: string }> = []
  for (const raw of value.split(/\r?\n/)) {
    const heading = raw.match(/^###\s+(.*)/)
    if (heading) out.push({ id: `sec-${out.length}`, heading: heading[1].trim(), body: '' })
    else if (out.length) out[out.length - 1].body += (out[out.length - 1].body ? '\n' : '') + raw
    else if (raw.trim()) out.push({ id: `sec-${out.length}`, heading: '', body: raw })
  }
  return out.map((s) => ({ ...s, body: s.body.trim() })).filter((s) => s.heading || s.body)
}

/** Parse "YEAR_ID=weight | OTHER=weight" into a { yearId: number } map (0–1). */
export function parseWeightMap(value = ''): Record<string, number> {
  const out: Record<string, number> = {}
  value.split(/\r?\n|\||;/).forEach((pair) => {
    const [k, v] = pair.split('=').map((p) => p.trim())
    if (k && v !== undefined) {
      const n = Number(v)
      if (Number.isFinite(n)) out[k] = Math.min(1, Math.max(0, n))
    }
  })
  return out
}

const clamp01 = (value?: string) => {
  const n = Number(value)
  return Number.isFinite(n) ? Math.min(1, Math.max(0, n)) : undefined
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
    return { ...base, title: values.question?.trim() || base.title, fields: { Topic: values.topic ?? '', Difficulty: difficulty, Vignette: values.vignette ?? '', Explanation: answers.find((answer) => answer.label === values.correct_answer?.toUpperCase())?.explanation ?? '' }, questionData: { attachments: [], correctAnswer: (/^[A-F]$/.test(values.correct_answer?.toUpperCase()) ? values.correct_answer.toUpperCase() : 'A') as AnswerLabel, answers, attachedImage: '', libraryIds: splitImportList(values.library_ids), resourceIds: splitImportList(values.resource_ids), tags: { module: values.module || base.subjectId, topic: values.topic || '', subtopic: values.subtopic || '', conceptIds: splitImportList(values.concept_ids), years: splitImportList(values.years), universityIds: splitImportList(values.universities), cognitiveEffort: ['Low', 'Medium', 'High'].includes(values.cognitive_effort) ? values.cognitive_effort as 'Low' | 'Medium' | 'High' : 'Medium', setting: ['Academic', 'Clinical', 'Both'].includes(values.setting) ? values.setting as 'Academic' | 'Clinical' | 'Both' : 'Both', intendedDifficulty: difficulty, clinicalReasoningLevel: numberInRange(values.reasoning_level, 2, 0, 5), inferredDifficulty: numberInRange(values.inferred_difficulty, 50, 0, 100), examRelevance: numberInRange(values.exam_relevance, 5, 0, 10), contextualConceptIds: splitImportList(values.contextual_concept_ids), questionType: values.question_type || undefined, mainConceptIds: splitImportList(values.main_concept), moduleIds: splitImportList(values.module), clinicalRelevance: clamp01(values.clinical_relevance), academicRelevance: clamp01(values.academic_relevance), cognitiveEffortScore: clamp01(values.cognitive_effort), examWeightByYear: parseWeightMap(values.exam_weight_by_year), questionOnlyFor: splitImportList(values.question_only_for) }, learningObjective: values.learning_objective || '', authorNotes: '', sourceCitation: values.source_citation || '', estimatedSeconds: 90, randomiseAnswers: true } }
  }
  if (kind === 'article') {
    const sections = parseSections(values.sections)
    const body = values.body || sections.map((s) => `${s.heading}\n${s.body}`).join('\n\n')
    const universityNotes = splitImportList(values.university_notes).map((line, i) => {
      const [uni, ...rest] = line.split(':')
      return { id: `unote-import-${i}`, universityId: uni.trim(), text: rest.join(':').trim() }
    }).filter((n) => n.universityId && n.text)
    return { ...base, fields: { Topic: values.topic || '', Summary: values.summary || '', 'Reading time': values.reading_time || '5', 'Key point': splitImportList(values.hold_these)[0] || '' }, articleData: { summary: values.summary || '', body, sections, holdThese: splitImportList(values.hold_these), loseTheMark: splitImportList(values.lose_the_mark), questionIds: splitImportList(values.question_ids), resourceIds: splitImportList(values.resource_ids), annotations: [], universityIds: splitImportList(values.universities), yearIds: splitImportList(values.years), moduleIds: splitImportList(values.module), subtopicId: values.subtopic || undefined, microtopicId: values.microtopic || undefined, relatedConceptIds: splitImportList(values.related_concepts), universityNotes } }
  }
  if (kind === 'practical') return { ...base, fields: { Type: values.type || 'OSCE station', Duration: values.duration || '8', Marks: values.marks || '20', Difficulty: values.difficulty || 'Moderate', 'Candidate instructions': values.candidate_instructions || '', 'Actor opening': values.actor_opening || '', 'Actor sections': values.actor_sections || '', 'Actor flags': values.actor_flags || '', 'Mark scheme': values.mark_scheme || '', Decisions: values.decisions || '', Debrief: values.debrief || '', 'Lab subtype': values.lab_subtype || '', 'Lab questions': values.lab_questions || '', References: values.references || '' } }
  return {
    ...base,
    fields: { Type: values.type || 'Article', Source: values.source || '', URL: values.url || '', Year: values.year || '', Topics: values.topics || '', Chapter: values.chapter || '', 'Included concepts': values.included_concepts || '', 'Included articles': values.included_articles || '', Description: values.description || '' },
    resourceData: {
      chapters: splitImportList(values.chapter),
      moduleIds: splitImportList(values.module_ids),
      includedConceptIds: splitImportList(values.included_concepts),
      includedArticleIds: splitImportList(values.included_articles),
      conceptLocations: [],
    },
  }
}
