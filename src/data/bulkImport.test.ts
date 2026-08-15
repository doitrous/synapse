import test from 'node:test'
import assert from 'node:assert/strict'
import {
  IMPORT_SCHEMAS, importRowToContent, validateImportRow,
  parseAnnotations, parseMediaRequests, parseCalloutEvidence, parseRelatedArticles, parseFieldNotes,
  parseDecisions, parseLabQuestions,
} from './bulkImport.ts'
import { mergeContentItem, materialiseNewItem } from './importMerge.ts'
import { listDirective, applyListDirective, optionalList, isAppend } from './importSemantics.ts'
import type { ManagedContentItem } from './contentControl.ts'

/* ---- list semantics ---------------------------------------------------- */

test('a blank cell leaves an existing list alone', () => {
  assert.equal(listDirective('').mode, 'untouched')
  assert.deepEqual(applyListDirective(listDirective(''), ['a', 'b']), ['a', 'b'])
  assert.equal(optionalList('  '), undefined)
})

test('a value replaces the list', () => {
  assert.deepEqual(applyListDirective(listDirective('x | y'), ['a']), ['x', 'y'])
})

test('a leading + appends and does not duplicate on re-import', () => {
  const once = applyListDirective(listDirective('+c'), ['a', 'b'])
  assert.deepEqual(once, ['a', 'b', 'c'])
  assert.deepEqual(applyListDirective(listDirective('+c'), once), ['a', 'b', 'c'])
})

test('[clear] empties the list explicitly', () => {
  assert.deepEqual(applyListDirective(listDirective('[clear]'), ['a']), [])
  assert.deepEqual(optionalList('[clear]'), [])
})

test('a parsed list carries its append intent forward to the merge', () => {
  // `optionalList` cannot resolve `+` on its own — it never sees the record
  // being updated. It has to hand the intent on, or the merge replaces instead.
  assert.equal(isAppend(optionalList('+c')), true)
  assert.equal(isAppend(optionalList('c')), false)
  assert.equal(isAppend(optionalList('[clear]')), false)
  assert.equal(isAppend(optionalList('')), false)
  // It is still an ordinary list to everything else, including persistence.
  assert.deepEqual(optionalList('+c'), ['c'])
  assert.equal(JSON.stringify({ list: optionalList('+c') }), '{"list":["c"]}')
})

/* ---- annotations ------------------------------------------------------- */

const ANNOTATION_BLOCK = `### definition_of · med.concept.cardiac-output
Quote: the volume of blood ejected by one ventricle in one minute
Block: body
Id: ann-cvs-co-001`

test('an annotation block parses into a complete record', () => {
  const [annotation] = parseAnnotations(ANNOTATION_BLOCK)
  assert.equal(annotation.id, 'ann-cvs-co-001')
  assert.equal(annotation.conceptId, 'med.concept.cardiac-output')
  assert.equal(annotation.relation, 'definition_of')
  assert.equal(annotation.block, 'body')
  assert.equal(annotation.quote, 'the volume of blood ejected by one ventricle in one minute')
})

test('an omitted annotation id is derived so re-import is idempotent', () => {
  const withoutId = ANNOTATION_BLOCK.split('\n').filter((line) => !line.startsWith('Id:')).join('\n')
  const first = parseAnnotations(withoutId)[0]
  const second = parseAnnotations(withoutId)[0]
  assert.equal(first.id, second.id)
  assert.match(first.id, /^ann-/)
})

test('a quote that is not in the stated block is a row error', () => {
  const errors = validateImportRow('article', {
    title: 'T', subject: 'cvs', topic: 'Chapter', summary: 'S',
    sections: '### Definition\nSomething entirely different.',
    annotations: ANNOTATION_BLOCK,
  })
  assert.ok(errors.some((error) => /does not appear in the body block/.test(error)), errors.join(' | '))
})

test('a quote present in the stated block passes', () => {
  const errors = validateImportRow('article', {
    title: 'T', subject: 'cvs', topic: 'Chapter', summary: 'S',
    sections: '### Definition\nCardiac output is the volume of blood ejected by one ventricle in one minute.',
    annotations: ANNOTATION_BLOCK,
  })
  assert.deepEqual(errors, [])
})

test('an unknown relation type is a row error', () => {
  const errors = validateImportRow('article', {
    title: 'T', subject: 'cvs', topic: 'Chapter', summary: 'the quote',
    annotations: '### invented_relation · med.concept.x\nQuote: the quote\nBlock: summary',
  })
  assert.ok(errors.some((error) => /is not a relation type/.test(error)), errors.join(' | '))
})

/* ---- media requests ----------------------------------------------------- */

test('a media request parses with its priority and status', () => {
  const [recommendation] = parseMediaRequests(
    `### anatomy plate · Coronary artery territories mapped to ECG leads
Purpose: A student cannot hold the lead-to-territory mapping from prose.
Priority: required
Status: needed
Section: Structure
Source direction: openly licensed anatomy atlas
Rights: must be CC-BY or public domain`,
    'ART-CVS-CORONARY-CIRCULATION',
  )
  assert.equal(recommendation.kind, 'anatomy plate')
  assert.equal(recommendation.priority, 'required')
  assert.equal(recommendation.status, 'needed')
  assert.equal(recommendation.ownerId, 'ART-CVS-CORONARY-CIRCULATION')
  assert.equal(recommendation.ownerKind, 'article')
  assert.equal(recommendation.medium, 'image')
  assert.match(recommendation.teachingPurpose, /cannot hold/)
})

test('a recommendation with no teaching purpose is a row error', () => {
  const errors = validateImportRow('article', {
    title: 'T', subject: 'cvs', topic: 'Chapter', summary: 'S',
    image_recommendations: '### diagram · Something pretty\nPriority: optional',
  })
  assert.ok(errors.some((error) => /no Purpose:/.test(error)), errors.join(' | '))
})

/* ---- callout evidence -------------------------------------------------- */

test('callout evidence keys on the exact callout text', () => {
  const evidence = parseCalloutEvidence('### Ordering D-dimer when CTPA is already indicated.\nClaims: claim-1\nReviewed by: Dr Omar')
  assert.deepEqual(evidence['Ordering D-dimer when CTPA is already indicated.'], { claimIds: ['claim-1'], reviewedBy: 'Dr Omar' })
})

test('callout evidence naming a line the article does not have is a row error', () => {
  const errors = validateImportRow('article', {
    title: 'T', subject: 'cvs', topic: 'Chapter', summary: 'S',
    lose_the_mark: 'A real trap.',
    callout_evidence: '### A trap that is not in the list.\nClaims: claim-1',
  })
  assert.ok(errors.some((error) => /not one of this article/.test(error)), errors.join(' | '))
})

/* ---- related articles and field notes ---------------------------------- */

test('a related article carries its reason under a pair-specific key', () => {
  const { ids, reasons } = parseRelatedArticles('ART-A: Explains the mechanism you just read.\nART-B')
  assert.deepEqual(ids, ['ART-A', 'ART-B'])
  assert.equal(reasons['relatedArticle:ART-A'], 'Explains the mechanism you just read.')
  assert.equal(reasons['relatedArticle:ART-B'], undefined)
})

test('field notes parse into the intentional-empty map the audit reads', () => {
  assert.deepEqual(parseFieldNotes('arabicTitle: awaiting reviewed terminology\nmedia: no rights-cleared image yet'), {
    arabicTitle: 'awaiting reviewed terminology',
    media: 'no rights-cleared image yet',
  })
})

/* ---- full round trip --------------------------------------------------- */

const FULL_ARTICLE: Record<string, string> = {
  id: 'ART-TEST-FULL',
  title: 'Pulmonary embolism',
  subject: 'cvs',
  status: 'In review',
  owner: 'Dr Omar',
  topic: 'Venous thromboembolism',
  summary: 'A common, treatable cause of acute breathlessness.',
  sections: '### Definition\nOcclusion of the pulmonary arterial tree.\n### Investigation\nWells score guides D-dimer versus CTPA.',
  published_sections: '### Definition\nOcclusion of the pulmonary arterial tree.',
  published_summary: 'A common, treatable cause of acute breathlessness.',
  body: 'Legacy body text.',
  hold_these: 'Oxygen and ABC assessment come first.',
  lose_the_mark: 'Ordering D-dimer when CTPA is already indicated.',
  callout_evidence: '### Ordering D-dimer when CTPA is already indicated.\nClaims: claim-1\nReviewed by: Dr Omar',
  universities: 'HU | ASU',
  university_notes: 'HU: Kasr Alainy expects the two-level Wells score.',
  years: 'HU_Y3',
  module: 'CVS 01',
  subtopic: 'SUB_PE',
  microtopic: 'MIC_WELLS',
  nanotopic: 'NAN_DDIMER',
  template_id: 'TPL-CONDITION',
  archetype: 'condition',
  learner_stage: 'Years 3–4 clinical',
  high_yield: 'High',
  language: 'en',
  arabic_title: 'الانصمام الرئوي',
  aliases: 'PE | Pulmonary thromboembolism',
  time_sensitive: 'time_sensitive',
  publication_gate: 'faculty_review',
  primary_node_id: 'SYS-RES-T06',
  secondary_node_ids: 'SYS-CVS-T07 | KNW-EMG',
  evidence_basis: 'Guideline plus textbook corroboration',
  article_source_ids: 'r-ng158',
  claim_ids: 'claim-1',
  span_ids: 'span-1',
  conflicts: 'Two-level versus three-level Wells score by faculty',
  evidence_gaps: 'Egyptian incidence data not yet sourced',
  reviewer: 'Dr Omar',
  final_publisher: 'Dr Omar',
  last_reviewed: '2026-08-11',
  review_due: '2027-08-11',
  media: '### image · https://example.org/ctpa.png\nCaption: CTPA showing a filling defect\nAlt: Axial CT with a filling defect\nRights: CC-BY\nNecessity: The filling defect is the diagnosis',
  media_recommendations: '### algorithm · Wells score decision pathway\nPurpose: The branching cannot be read reliably as prose.\nPriority: required\nStatus: needed',
  // The legacy key stays accepted so the authored SYS-FND batches keep importing.
  image_recommendations: '### diagram · Superseded by media_recommendations above\nPurpose: Present only to prove the legacy key is still read.\nPriority: optional\nStatus: needed',
  annotations: '### definition_of · med.concept.pe\nQuote: Occlusion of the pulmonary arterial tree\nBlock: body',
  related_concepts: 'med.concept.pe',
  related_articles: 'ART-A: Explains the mechanism.',
  question_ids: 'q-pe-1',
  resource_ids: 'r-ng158',
  field_notes: 'moduleIds: awaiting a verified live module ID',
  notes: 'Draft pending faculty sign-off.',
  reading_time: '9',
}

test('a fully populated article row imports with every field present', () => {
  assert.deepEqual(validateImportRow('article', FULL_ARTICLE), [])
  const item = materialiseNewItem(importRowToContent('article', FULL_ARTICLE, 'row-1'))
  const data = item.articleData!

  assert.equal(item.id, 'ART-TEST-FULL')
  assert.equal(item.title, 'Pulmonary embolism')
  assert.equal(item.subjectId, 'cvs')
  assert.equal(item.owner, 'Dr Omar')
  assert.equal(data.arabicTitle, 'الانصمام الرئوي')
  assert.deepEqual(data.aliases, ['PE', 'Pulmonary thromboembolism'])
  assert.equal(data.language, 'en')
  assert.equal(data.timeSensitive, 'time_sensitive')
  assert.equal(data.publicationGate, 'faculty_review')
  assert.equal(data.highYield, 'High')
  assert.equal(data.nanotopicId, 'NAN_DDIMER')
  assert.equal(data.sections.length, 2)
  assert.equal(data.publishedSections?.length, 1)
  assert.equal(data.publishedSummary, 'A common, treatable cause of acute breathlessness.')
  assert.deepEqual(data.secondaryNodeIds, ['SYS-CVS-T07', 'KNW-EMG'])
  assert.deepEqual(data.claimIds, ['claim-1'])
  assert.deepEqual(data.spanIds, ['span-1'])
  assert.deepEqual(data.conflicts, ['Two-level versus three-level Wells score by faculty'])
  assert.deepEqual(data.evidenceGaps, ['Egyptian incidence data not yet sourced'])
  assert.equal(data.reviewer, 'Dr Omar')
  assert.equal(data.lastReviewed, '2026-08-11')
  assert.equal(data.reviewDue, '2027-08-11')
  assert.equal(data.media?.length, 1)
  assert.equal(data.mediaRequests?.length, 1)
  assert.equal(data.mediaRequests?.[0].priority, 'required')
  assert.equal(data.annotations.length, 1)
  assert.equal(data.annotations[0].conceptId, 'med.concept.pe')
  assert.deepEqual(data.relatedArticleIds, ['ART-A'])
  assert.equal(data.fieldNotes?.['relatedArticle:ART-A'], 'Explains the mechanism.')
  assert.equal(data.fieldNotes?.moduleIds, 'awaiting a verified live module ID')
  assert.equal(data.calloutEvidence?.['Ordering D-dimer when CTPA is already indicated.']?.reviewedBy, 'Dr Omar')
  assert.equal(data.universityNotes?.length, 1)
  assert.equal(data.notes, 'Draft pending faculty sign-off.')
})

test('every article import field is reachable from the schema', () => {
  // The round-trip fixture must exercise the whole schema, or parity is a claim
  // rather than a fact.
  const schemaKeys = IMPORT_SCHEMAS.article.fields.map((field) => field.key)
  const missing = schemaKeys.filter((key) => !(key in FULL_ARTICLE))
  assert.deepEqual(missing, [], `fixture does not cover: ${missing.join(', ')}`)
})

/* ---- partial update must not erase nested data ------------------------- */

test('a partial update leaves untouched nested fields alone', () => {
  const existing = materialiseNewItem(importRowToContent('article', FULL_ARTICLE, 'row-1'))
  const patch = importRowToContent('article', { id: 'ART-TEST-FULL', title: 'Pulmonary embolism (revised)', subject: 'cvs', topic: 'Venous thromboembolism', summary: 'A revised summary.' }, 'row-2')
  const merged = mergeContentItem(existing, patch, false)
  const data = merged.articleData!

  assert.equal(merged.title, 'Pulmonary embolism (revised)')
  assert.equal(data.summary, 'A revised summary.')
  // Everything the patch did not mention survives — this is the whole point.
  assert.equal(data.annotations.length, 1)
  assert.deepEqual(data.claimIds, ['claim-1'])
  assert.deepEqual(data.aliases, ['PE', 'Pulmonary thromboembolism'])
  assert.equal(data.mediaRequests?.length, 1)
  assert.equal(data.calloutEvidence?.['Ordering D-dimer when CTPA is already indicated.']?.reviewedBy, 'Dr Omar')
  assert.equal(data.reviewer, 'Dr Omar')
  assert.equal(data.media?.length, 1)
})

test('an explicit [clear] does empty a list on update', () => {
  const existing = materialiseNewItem(importRowToContent('article', FULL_ARTICLE, 'row-1'))
  const patch = importRowToContent('article', { id: 'ART-TEST-FULL', title: 'T', subject: 'cvs', topic: 'C', summary: 'S', conflicts: '[clear]' }, 'row-2')
  const merged = mergeContentItem(existing, patch, false)
  assert.deepEqual(merged.articleData!.conflicts, [])
  // and nothing else moved
  assert.deepEqual(merged.articleData!.claimIds, ['claim-1'])
})

test('a leading + adds to a list an article already has', () => {
  const existing = materialiseNewItem(importRowToContent('article', FULL_ARTICLE, 'row-1'))
  const patch = importRowToContent('article', { id: 'ART-TEST-FULL', title: 'T', subject: 'cvs', topic: 'C', summary: 'S', aliases: '+Venous thromboembolism' }, 'row-2')
  const merged = mergeContentItem(existing, patch, false)
  assert.deepEqual(merged.articleData!.aliases, ['PE', 'Pulmonary thromboembolism', 'Venous thromboembolism'])
  // and nothing else moved
  assert.deepEqual(merged.articleData!.claimIds, ['claim-1'])
})

test('re-importing the same + article row does not duplicate the entry', () => {
  const existing = materialiseNewItem(importRowToContent('article', FULL_ARTICLE, 'row-1'))
  const row = { id: 'ART-TEST-FULL', title: 'T', subject: 'cvs', topic: 'C', summary: 'S', resource_ids: '+r-bts' }
  const once = mergeContentItem(existing, importRowToContent('article', row, 'row-2'), false)
  const twice = mergeContentItem(once, importRowToContent('article', row, 'row-3'), false)
  assert.deepEqual(once.articleData!.resourceIds, ['r-ng158', 'r-bts'])
  assert.deepEqual(twice.articleData!.resourceIds, ['r-ng158', 'r-bts'])
})

test('nested objects accumulate rather than replace on update', () => {
  const existing = materialiseNewItem(importRowToContent('article', FULL_ARTICLE, 'row-1'))
  const patch = importRowToContent('article', { id: 'ART-TEST-FULL', title: 'T', subject: 'cvs', topic: 'C', summary: 'S', field_notes: 'questionIds: no validated questions yet' }, 'row-2')
  const merged = mergeContentItem(existing, patch, false)
  assert.equal(merged.articleData!.fieldNotes?.questionIds, 'no validated questions yet')
  assert.equal(merged.articleData!.fieldNotes?.moduleIds, 'awaiting a verified live module ID')
})

test('override-with-blanks is still available and does replace wholesale', () => {
  const existing = materialiseNewItem(importRowToContent('article', FULL_ARTICLE, 'row-1'))
  const patch = materialiseNewItem(importRowToContent('article', { id: 'ART-TEST-FULL', title: 'T', subject: 'cvs', topic: 'C', summary: 'S' }, 'row-2'))
  const merged = mergeContentItem(existing, patch, true)
  assert.deepEqual(merged.articleData!.claimIds, [])
})

/* ---- questions --------------------------------------------------------- */

test('question attachments and authoring fields round-trip', () => {
  const item: ManagedContentItem = importRowToContent('question', {
    title: 'Q', subject: 'cvs', question: 'What is the first action?', correct_answer: 'A',
    answer_a: 'Give oxygen', explanation_a: 'Treat hypoxia first.',
    attachments: '### image · https://example.org/ecg.png\nName: 12-lead ECG\nMime: image/png',
    attached_image: 'https://example.org/ecg.png',
    author_notes: 'Checked against NG185.',
    estimated_seconds: '120',
    randomise_answers: 'no',
  }, 'row-q')
  const data = item.questionData!
  assert.equal(data.attachments.length, 1)
  assert.equal(data.attachments[0].name, '12-lead ECG')
  assert.equal(data.attachments[0].mimeType, 'image/png')
  assert.equal(data.attachedImage, 'https://example.org/ecg.png')
  assert.equal(data.authorNotes, 'Checked against NG185.')
  assert.equal(data.estimatedSeconds, 120)
  assert.equal(data.randomiseAnswers, false)
})

/* ---- practicals -------------------------------------------------------- */

const DECISION = [
  '### Immediate action',
  'A 54-year-old man has 20 minutes of central chest pain.',
  'Concept: CON-CVS-AAA',
  'Also: CON-CVS-BBB | CON-CVS-CCC',
  'Difficulty: Challenging',
  'Q: What is your first step?',
  '*= Give aspirin and arrange an immediate ECG',
  'Why: Both are time-critical, and neither waits',
  'on a confirmed diagnosis.',
  '* Wait for troponin',
  'Why: The misconception that a diagnosis must be confirmed first.',
  'Rationale: An ECG within 10 minutes is time-critical.',
].join('\n')

test('a decision block carries its concept, difficulty and a reason per option', () => {
  const [decision] = parseDecisions(DECISION)
  assert.equal(decision.conceptId, 'CON-CVS-AAA')
  assert.deepEqual(decision.secondaryConceptIds, ['CON-CVS-BBB', 'CON-CVS-CCC'])
  assert.equal(decision.difficulty, 'Challenging')
  assert.equal(decision.context, 'A 54-year-old man has 20 minutes of central chest pain.')
  assert.equal(decision.answers[0].explanation, 'Both are time-critical, and neither waits on a confirmed diagnosis.')
  assert.equal(decision.answers[1].explanation, 'The misconception that a diagnosis must be confirmed first.')
  assert.equal(decision.rationale, 'An ECG within 10 minutes is time-critical.')
})

test('a Why: binds to the option above it, not to the block', () => {
  const [question] = parseLabQuestions([
    '### Reading the trace',
    'Q: Which territory?',
    '*= Inferior',
    'Why: II, III and aVF face the inferior surface.',
    '* Anterior',
    'Why: The student who maps every ST elevation to the LAD.',
    'Explanation: Territory follows the leads that face the surface.',
  ].join('\n'))
  assert.deepEqual(question.answers.map((answer) => answer.explanation), [
    'II, III and aVF face the inferior surface.',
    'The student who maps every ST elevation to the LAD.',
  ])
  // The block-level explanation must not have swallowed either of them.
  assert.equal(question.explanation, 'Territory follows the leads that face the surface.')
})

test('an unexplained option is a row error rather than a silently worse question', () => {
  const errors = validateImportRow('practical', {
    title: 'Case', subject: 'cvs', type: 'Clinical case',
    decisions: '### Step\nQ: What next?\n*= Do the right thing\nWhy: Because.\n* Do the wrong thing\nRationale: Because.',
  })
  assert.deepEqual(errors.filter((error) => error.includes('Why:')), [
    'Decision 1 (Step) has 1 option(s) with no "Why:" line explaining the choice',
  ])
})

test('two correct options are rejected, not silently resolved to the first', () => {
  const errors = validateImportRow('practical', {
    title: 'Set', subject: 'cvs', type: 'Lab interpretation',
    lab_questions: '### Stem\nQ: Which?\n*= One\nWhy: a\n*= Two\nWhy: b\nExplanation: c',
  })
  assert.ok(errors.some((error) => error.includes('marks 2 options with "*="')))
})

test('a media request parses, and one naming no question is rejected', () => {
  const media = [
    '### image · Immediate action',
    'Brief: 12-lead ECG showing inferior ST elevation',
    'Purpose: The territory cannot be read from text.',
    'Priority: required',
    'Status: needed',
  ].join('\n')
  const [request] = parseMediaRequests(media, 'PRA-CVS-1', 'practical')
  // Medium and genre are separate axes: a medium-led heading names the block the
  // asset belongs to, and leaves the genre unstated rather than guessing one.
  assert.equal(request.medium, 'image')
  assert.equal(request.kind, 'other')
  assert.equal(request.section, 'Immediate action')
  assert.equal(request.ownerId, 'PRA-CVS-1')
  assert.equal(request.ownerKind, 'practical')
  assert.equal(request.priority, 'required')
  assert.equal(request.status, 'needed')

  const values = { title: 'Case', subject: 'cvs', type: 'Clinical case', decisions: DECISION, media_needed: media }
  assert.deepEqual(validateImportRow('practical', values), [])
  const orphaned = { ...values, media_needed: media.replace('· Immediate action', '· A step nobody wrote') }
  assert.ok(validateImportRow('practical', orphaned).some((error) => error.includes('is not a question in this item')))
})

test('a practical carries its concept tags and media requests through the importer', () => {
  const item = importRowToContent('practical', {
    title: 'Acute central chest pain', subject: 'cvs', type: 'Clinical case',
    difficulty: 'Challenging',
    decisions: DECISION,
    main_concept: 'CON-CVS-AAA',
    contextual_concept_ids: 'CON-CVS-ZZZ',
    learning_objective: 'Act before the diagnosis is confirmed.',
    media_needed: '### audio · station\nBrief: Heart sounds\nKind: clinical photograph\nPurpose: Cannot be described in prose.\nPriority: optional\nStatus: needed',
  }, 'row-p')
  const data = item.practicalData!
  assert.deepEqual(data.conceptTags.mainConceptIds, ['CON-CVS-AAA'])
  assert.deepEqual(data.conceptTags.contextualConceptIds, ['CON-CVS-ZZZ'])
  assert.equal(data.learningObjective, 'Act before the diagnosis is confirmed.')
  assert.equal(data.mediaRequests[0].medium, 'audio')
  assert.equal(data.mediaRequests[0].kind, 'clinical photograph')
  assert.equal(data.mediaRequests[0].section, 'station')
  // The fourth band must survive; the student list reads this string.
  assert.equal(item.fields.Difficulty, 'Challenging')
})

test('an unknown difficulty band is rejected rather than quietly becoming Moderate', () => {
  const errors = validateImportRow('practical', {
    title: 'Station', subject: 'cvs', type: 'Skills checklist', difficulty: 'Fiendish',
  })
  assert.ok(errors.some((error) => error.includes('Difficulty must be one of')))
})
