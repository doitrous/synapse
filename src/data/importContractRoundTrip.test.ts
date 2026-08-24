import test from 'node:test'
import assert from 'node:assert/strict'
import {
  IMPORT_CONTRACTS, importFieldKeys, type ImportContractKind,
} from './importContract.ts'
import { importRowToContent, validateImportRow } from './bulkImport.ts'
import { materialiseNewItem, mergeContentItem, upsertRecords } from './importMerge.ts'
import { conceptFromRow, materialiseNewConcept, mergeConcept, relationErrors, relationFromRow } from './conceptImport.ts'
import { applyRow } from './subjectsImport.ts'
import {
  citationFromRow, claimFromRow, evidenceErrors, reconcileClaimEvidence,
  resourceFromRow, spanFromRow,
} from './evidenceImport.ts'
import { validateMiniGamePack, validMiniGamePacks } from './minigamePacks.ts'
import { miniGamePackFromRow, miniGamePackToRow, validateMiniGameRow } from './minigameImport.ts'

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T
const covers = (kind: ImportContractKind, rows: Array<Record<string, string>>) => {
  const seen = new Set(rows.flatMap((row) => Object.keys(row)))
  const missing = [...importFieldKeys(kind)].filter((key) => !seen.has(key))
  assert.deepEqual(missing, [], `${kind} fixture does not cover: ${missing.join(', ')}`)
}

const COMMON = { id: 'ID', title: 'Fixture title', subject: 'cvs', status: 'Published', owner: 'Import test' }

const ARTICLE = {
  ...COMMON,
  id: 'ART-ROUNDTRIP',
  topic: 'Venous thromboembolism',
  summary: 'A concise reviewed summary.',
  sections: '### Definition\nOcclusion of the pulmonary arterial tree.',
  body: 'Legacy body retained for parity.',
  hold_these: 'Oxygen and ABC assessment come first.',
  lose_the_mark: 'Ordering D-dimer when CTPA is already indicated.',
  universities: 'HU | ASU',
  university_notes: 'HU: Kasr Alainy expects the two-level Wells score.',
  years: 'HU_Y3',
  module: 'CVS 01',
  module_subject: 'CVS 01 > Medicine > Venous thromboembolism',
  subtopic: 'SUB_PE',
  microtopic: 'MIC_WELLS',
  template_id: 'TPL-CONDITION',
  archetype: 'condition',
  learner_stage: 'Years 3–4 clinical',
  high_yield: 'High',
  primary_node_id: 'SYS-CVS-T01',
  secondary_node_ids: 'SYS-RES-T02',
  media: '### image · https://example.test/ctpa.png\nCaption: CTPA\nAlt: Axial CT pulmonary angiogram\nRights: CC-BY\nNecessity: Shows the filling defect\nAnchor: Occlusion of the pulmonary arterial tree\nAnchor block: body',
  annotations: '### definition_of · med.concept.pe\nQuote: Occlusion of the pulmonary arterial tree\nBlock: body',
  image_recommendations: '### diagram · Legacy image request\nPurpose: Branching pathway.\nPriority: optional\nStatus: needed',
  media_recommendations: '### algorithm · Wells pathway\nPurpose: Branching pathway.\nPriority: required\nStatus: needed\nAnchor: Wells',
  callout_evidence: '### Ordering D-dimer when CTPA is already indicated.\nClaims: CLM-PE-1\nCitations: CIT-PE-1\nSpan: SPN-PE-1\nReviewed by: Import test\nReviewed at: 2026-08-24',
  related_concepts: 'med.concept.pe',
  related_articles: 'ART-OTHER: Same differential.',
  question_ids: 'Q-PE-1',
  resource_ids: 'RES-PE-1',
  nanotopic: 'NAN_DDIMER',
  arabic_title: 'الانصمام الرئوي',
  aliases: 'PE | Pulmonary thromboembolism',
  language: 'en',
  time_sensitive: 'time_sensitive',
  publication_gate: 'faculty_review',
  evidence_basis: 'Guideline plus reviewed local teaching.',
  article_source_ids: 'RES-PE-1',
  claim_ids: 'CLM-PE-1',
  span_ids: 'SPN-PE-1',
  conflicts: 'Two-level versus three-level Wells score.',
  evidence_gaps: 'Local incidence data pending.',
  reviewer: 'Import reviewer',
  final_publisher: 'Import publisher',
  last_reviewed: '2026-08-24',
  review_due: '2027-08-24',
  published_summary: 'Student-facing reviewed summary.',
  published_sections: '### Definition\nOcclusion of the pulmonary arterial tree.',
  field_notes: 'evidenceGaps: deliberately tracked.',
  notes: 'Internal author note.',
  reading_time: '7',
}

const QUESTION_MCQ = {
  ...COMMON,
  id: 'Q-ROUNDTRIP-MCQ',
  title: 'First action in suspected PE',
  vignette: 'A postoperative patient is acutely breathless.',
  question: 'What is the first action?',
  format: 'single best answer',
  correct_answer: 'A',
  answer_a: 'Give oxygen and assess ABCs',
  explanation_a: 'Immediate threats are treated first.',
  answer_b: 'Wait for CTPA',
  explanation_b: 'This delays stabilization.',
  answer_c: 'Discharge',
  explanation_c: 'Unsafe.',
  answer_d: 'Ignore symptoms',
  explanation_d: 'Unsafe.',
  answer_e: 'No treatment',
  explanation_e: 'Unsafe.',
  answer_f: 'Repeat in a week',
  explanation_f: 'Unsafe.',
  topic: 'Venous thromboembolism',
  subtopic: 'Pulmonary embolism',
  difficulty: 'Moderate',
  question_type: 'Diagnosis',
  main_concept: 'med.concept.pe',
  module: 'CVS 01',
  module_subject: 'CVS 01 > Medicine > Venous thromboembolism',
  clinical_relevance: '0.9',
  academic_relevance: '0.8',
  cognitive_effort_score: '0.7',
  exam_weight_by_year: 'HU_Y3=0.8',
  question_only_for: 'HU_Y3',
  concept_ids: 'med.concept.pe',
  years: 'HU_Y3',
  universities: 'HU',
  cognitive_effort: 'High',
  setting: 'Clinical',
  reasoning_level: '4',
  inferred_difficulty: '60',
  exam_relevance: '8',
  contextual_concept_ids: 'med.concept.oxygen',
  library_ids: 'ART-ROUNDTRIP',
  resource_ids: 'RES-PE-1',
  learning_objective: 'Stabilise immediate threats.',
  media_recommendations: '### image · stem\nPurpose: Show the ECG.\nPriority: optional\nStatus: needed',
  source_citation: 'Reviewed guideline.',
  attachments: '### image · https://example.test/ecg.png\nName: ECG\nMime: image/png',
  attached_image: 'https://example.test/ecg.png',
  author_notes: 'Internal note.',
  estimated_seconds: '120',
  randomise_answers: 'no',
}

const QUESTION_MULTI = {
  ...COMMON,
  id: 'Q-ROUNDTRIP-MULTI',
  title: 'Septal supply',
  question: 'Which arteries supply the interventricular septum?',
  format: 'multiple response',
  answer_a: 'LAD',
  answer_b: 'Circumflex',
  answer_c: 'Posterior interventricular',
  correct_answers: 'A | C',
}

const QUESTION_MATCHING = {
  ...COMMON,
  id: 'Q-ROUNDTRIP-MATCH',
  title: 'Match consultation skills',
  question: 'Match each prompt.',
  format: 'matching',
  correct_answer: 'A',
  matching_options: 'A | Open question\nB | Empathy\nC | Closed question',
  matching_prompts: '"Tell me more" = A\nNaming emotion = B',
}

const QUESTION_LABELING = {
  ...COMMON,
  id: 'Q-ROUNDTRIP-LABEL',
  title: 'Anterior arm',
  question: 'Name each structure.',
  format: 'labelling',
  labeling_image: 'https://example.test/arm.png',
  labeling_alt: 'Anterior arm diagram.',
  labeling_points: '1 @ 34,58 = Biceps brachii | Biceps\n2 @ 61,42 = Brachialis',
}

const QUESTION_COMPLETION = {
  ...COMMON,
  id: 'Q-ROUNDTRIP-COMPLETE',
  title: 'Completion',
  question: 'Complete the statement.',
  format: 'completion',
  completion_text: 'Cardiac output equals [[stroke volume]] times [[heart rate]].',
}

const QUESTION_WRITTEN = {
  ...COMMON,
  id: 'Q-ROUNDTRIP-WRITTEN',
  title: 'Femoral triangle',
  question: 'Answer both parts.',
  format: 'structured written',
  written_parts: '### (a) 5 marks\nEnumerate contents.\nExpects: Femoral artery\nConcept: med.concept.femoral-triangle',
  derived_from: 'structured_written · Q-SOURCE',
}

const OSCE = {
  ...COMMON,
  id: 'P-ROUNDTRIP-OSCE',
  type: 'OSCE station',
  universities: 'HU',
  years: 'HU_Y3',
  module: 'CVS 01',
  duration: '8',
  marks: '20',
  difficulty: 'Moderate',
  candidate_instructions: 'Take a focused history.',
  actor_opening: 'The pain started upstairs.',
  actor_sections: 'Identity: Daniel, 54',
  station_image: 'https://example.test/station.png',
  actor_flags: 'Admits smoking if asked.',
  mark_scheme: 'Opening (2): Introduces self',
  module_subject: 'CVS 01 > Skills > History',
  main_concept: 'med.concept.history',
  concept_ids: 'med.concept.chest-pain',
  contextual_concept_ids: 'med.concept.smoking',
  learning_objective: 'Take a focused chest-pain history.',
  media_needed: '### image · station\nBrief: Patient card\nPurpose: Required for station.\nPriority: required\nStatus: needed',
  media_recommendations: '### image · station\nBrief: Alternate patient card\nPurpose: Required for station.\nPriority: optional\nStatus: needed',
  references: 'Local OSCE sheet.',
}

const CASE = {
  ...COMMON,
  id: 'P-ROUNDTRIP-CASE',
  type: 'Clinical case',
  decisions: '### Immediate action\nConcept: med.concept.pe\nQ: First step?\n*= Oxygen\nWhy: Treat hypoxia.\n* Wait\nWhy: Delays care.\nRationale: ABCs first.',
  debrief: 'ABCs come first.',
}

const LAB = {
  ...COMMON,
  id: 'P-ROUNDTRIP-LAB',
  type: 'Imaging interpretation',
  lab_subtype: 'Imaging',
  lab_questions: '### CXR\nConcept: med.concept.effusion\nQ: Finding?\n*= Effusion\nWhy: Blunted angle.\n* Consolidation\nWhy: Different pattern.\nExplanation: Meniscus suggests fluid.',
}

const RESOURCE = {
  ...COMMON,
  id: 'CAT-RES-ROUNDTRIP',
  type: 'Guideline',
  source: 'NICE',
  url: 'https://example.test/ng158',
  year: '2026',
  topics: 'Pulmonary embolism',
  chapter: 'VTE',
  module_ids: 'CVS 01',
  module_subject: 'CVS 01 > Medicine > VTE',
  included_concepts: 'med.concept.pe',
  included_articles: 'ART-ROUNDTRIP',
  concept_locations: 'med.concept.pe | page | 142',
  universities: 'HU',
  years: 'HU_Y3',
  description: 'Reviewed source.',
}

const DECK = {
  ...COMMON,
  id: 'DECK-ROUNDTRIP',
  description: 'Recall deck.',
  cards: 'LAD | Anterior wall\nRCA | SA node in most people',
}

const ESSAY = {
  ...COMMON,
  id: 'ESSAY-ROUNDTRIP',
  prompt: 'Discuss right heart failure.',
  key_points: '!Cor pulmonale\nRaised JVP',
  examiner_note: 'Link causes to signs.',
  model_answer: 'Right heart failure follows...',
}

const HISTOLOGY = {
  ...COMMON,
  id: 'HIST-ROUNDTRIP',
  tissue: 'Small bowel',
  stain: 'H&E',
  description: 'Villi and Peyer patches.',
  image_4x: 'https://example.test/ileum-4x.jpg',
  image_10x: 'https://example.test/ileum-10x.jpg',
  image_40x: 'https://example.test/ileum-40x.jpg',
}

test('canonical registry names every first-class import contract', () => {
  assert.deepEqual(Object.keys(IMPORT_CONTRACTS).sort(), [
    'article', 'catalogue-resource', 'citation', 'claim', 'concept', 'deck',
    'essay', 'glossary', 'histology', 'minigame', 'practical', 'question', 'relation', 'resource', 'span', 'subjects',
  ].sort())
})

test('content fixtures cover every schema field and survive validate -> import -> merge -> serialize', () => {
  covers('article', [ARTICLE])
  covers('question', [QUESTION_MCQ, QUESTION_MULTI, QUESTION_MATCHING, QUESTION_LABELING, QUESTION_COMPLETION, QUESTION_WRITTEN])
  covers('practical', [OSCE, CASE, LAB])
  covers('catalogue-resource', [RESOURCE])
  covers('deck', [DECK])
  covers('essay', [ESSAY])
  covers('histology', [HISTOLOGY])

  const rows = [
    ['article', ARTICLE],
    ['question', QUESTION_MCQ],
    ['question', QUESTION_MULTI],
    ['question', QUESTION_MATCHING],
    ['question', QUESTION_LABELING],
    ['question', QUESTION_COMPLETION],
    ['question', QUESTION_WRITTEN],
    ['practical', OSCE],
    ['practical', CASE],
    ['practical', LAB],
    ['resource', RESOURCE],
    ['deck', DECK],
    ['essay', ESSAY],
    ['histology', HISTOLOGY],
  ] as const

  const imported = rows.map(([kind, row], index) => {
    assert.deepEqual(validateImportRow(kind, row), [], `${kind}:${row.id}`)
    return materialiseNewItem(importRowToContent(kind, row, `row-${index}`))
  })
  const { records, created, updated } = upsertRecords([], imported, {
    merge: (current, next) => mergeContentItem(current, next, false),
    materialise: materialiseNewItem,
  })
  assert.equal(created, imported.length)
  assert.equal(updated, 0)
  const serialised = clone(records)
  assert.equal(serialised.find((item) => item.id === 'ART-ROUNDTRIP')?.articleData.mediaRequests[0].priority, 'required')
  assert.equal(serialised.find((item) => item.id === 'Q-ROUNDTRIP-MATCH')?.questionData.matching.options.length, 3)
  assert.equal(serialised.find((item) => item.id === 'P-ROUNDTRIP-LAB')?.practicalData.questions[0].answers.length, 2)
  assert.equal(serialised.find((item) => item.id === 'DECK-ROUNDTRIP')?.deckData.cards.length, 2)
  assert.equal(serialised.find((item) => item.id === 'HIST-ROUNDTRIP')?.histologyData.views.length, 3)
})

test('concept, relation, evidence, and subject fixtures round-trip through their registries', () => {
  const conceptRow = {
    label: 'Pulmonary embolism',
    id: 'med.concept.pe',
    canonical_key: 'pulmonary-embolism',
    aliases: 'PE',
    arabic_label: 'الانصمام الرئوي',
    arabic_aliases: 'جلطة الرئة',
    definition: 'Occlusion of the pulmonary arterial tree.',
    explicit_objective: 'Recognise immediate threats.',
    pitfalls: 'Waiting for imaging.',
    concept_type: 'condition',
    status: 'active',
    subject: 'cvs',
    topic: 'Venous thromboembolism',
    subtopic: 'Pulmonary embolism',
    microtopic: 'Wells score',
    nanotopic: 'D-dimer',
    primary_node_id: 'SYS-CVS-T01',
    secondary_node_ids: 'SYS-RES-T02',
    learner_years: '3 | 4',
    universities: 'HU',
    modules: 'CVS 01',
    article_ids: 'ART-ROUNDTRIP',
    related_article_ids: 'ART-OTHER',
    related_concept_ids: 'med.concept.oxygen',
    resource_ids: 'RES-PE-1',
    approved_file_resource_ids: 'RES-FILE-1',
    approved_video_resource_ids: 'RES-VID-1',
    blueprint_weight: '0.8',
    exam_weight_by_year: 'HU_Y3=0.8',
    clinical_relevance: '0.9',
    academic_relevance: '0.8',
    weight_confidence: '0.7',
    module_subject: 'CVS 01 > Medicine > VTE',
    exam_signal: 'src-pe | high | 2025 | p14',
    confidence: '0.95',
    support_mode: 'direct_statement',
    atomic_claim_ids: 'CLM-PE-1',
    resource_occurrence_ids: 'OCC-1',
    source_candidate_ids: 'SRC-CAND-1',
    original_wording: 'pulmonary embolism',
    merge_ids: 'MERGE-1',
    rejected_merge_candidate_ids: 'REJ-1',
    conflicts: 'Wells scoring differs.',
    uncertainty: 'Local incidence unknown.',
    evidence_gaps: 'Local incidence.',
    owner: 'Import owner',
    reviewer: 'Import reviewer',
    final_publisher: 'Import publisher',
    last_reviewed: '2026-08-24',
    review_due: '2027-08-24',
    publication_status: 'published',
    editorial_review_status: 'reviewed',
    exclusion_reason: 'none',
    field_notes: 'mediaIds: media attached after import',
  }
  covers('concept', [conceptRow])
  const concept = materialiseNewConcept(conceptFromRow(conceptRow))
  assert.equal(clone(concept).id, 'med.concept.pe')
  assert.equal(mergeConcept(concept, conceptFromRow({ id: 'med.concept.pe', label: 'Pulmonary embolism revised' })).label, 'Pulmonary embolism revised')

  const resourceRow = {
    id: 'RES-PE-1', title: 'VTE guideline', institution: 'NICE', collection_id: 'guidelines',
    source_relative_path: 'guidelines/vte.pdf', source_uri: 'https://example.test/vte',
    media_type: 'application/pdf', languages: 'en', publication_date: '2026-01-01',
    accessed_at: '2026-08-24', page_count: '42', sha256: 'abc123',
    processing_status: 'authoritative_article_level_reference', rights: 'Open licence',
    qualification: 'Guideline', confidence: '0.95', is_assessment: 'no',
  }
  const claimRow = {
    id: 'CLM-PE-1', concept_id: 'med.concept.pe', subject: 'cvs',
    predicate: 'is defined as', object: 'occlusion of pulmonary arteries',
    qualifiers: 'scope: adult', display_text: 'PE is arterial occlusion.',
    risk_class: 'foundational_stable', verification_status: 'needs_evidence',
    conflict_status: 'none', confidence: '0.9', freshness: 'current',
    time_sensitive: 'yes', review_due: '2027-08-24', citation_ids: 'CIT-PE-1',
  }
  const citationRow = {
    id: 'CIT-PE-1', claim_id: 'CLM-PE-1', resource_id: 'RES-PE-1',
    evidence_role: 'independent_verification', support_span: 'Pulmonary embolism is occlusion...',
    locator_type: 'page', locator_page: '12', locator_section: 'Definition',
    locator_detail: 'paragraph 1', context_note: 'definition section',
    confidence: '0.9', counts_as_claim_evidence: 'yes',
  }
  const spanRow = {
    id: 'SPN-PE-1', article_id: 'ART-ROUNDTRIP', section_id: 'ART-ROUNDTRIP-definition',
    text: 'Occlusion of the pulmonary arterial tree.', text_hash: 'hash-pe',
    claim_ids: 'CLM-PE-1', citation_ids: 'CIT-PE-1',
  }
  covers('resource', [resourceRow])
  covers('claim', [claimRow])
  covers('citation', [citationRow])
  covers('span', [spanRow])
  const evidenceContext = {
    store: { claims: [], citations: [], resources: [], articleSpans: [] },
    conceptIds: new Set(['med.concept.pe']),
    articleIds: new Set(['ART-ROUNDTRIP']),
    incoming: {
      claims: new Set(['CLM-PE-1']),
      resources: new Set(['RES-PE-1']),
      citations: new Set(['CIT-PE-1']),
    },
  }
  assert.deepEqual(evidenceErrors('resource', resourceRow, evidenceContext), [])
  assert.deepEqual(evidenceErrors('claim', claimRow, evidenceContext), [])
  assert.deepEqual(evidenceErrors('citation', citationRow, evidenceContext), [])
  assert.deepEqual(evidenceErrors('span', spanRow, evidenceContext), [])
  const evidence = clone({
    resource: resourceFromRow(resourceRow),
    claims: reconcileClaimEvidence([claimFromRow(claimRow)], [citationFromRow(citationRow)]),
    citation: citationFromRow(citationRow),
    span: spanFromRow(spanRow),
  })
  assert.equal(evidence.claims[0].verificationStatus, 'verified')

  const relationRow = {
    id: 'REL-PE-OXYGEN', source: 'med.concept.pe', type: 'associated_with',
    target: 'med.concept.oxygen', evidence_claim_ids: 'CLM-PE-1',
    citation_ids: 'CIT-PE-1', confidence: '0.8', verification_status: 'verified',
    qualifiers: 'why: immediate care', reviewer: 'Import reviewer', reviewed_at: '2026-08-24',
  }
  covers('relation', [relationRow])
  const relation = relationFromRow(relationRow)
  assert.deepEqual(relationErrors(
    relation,
    { concepts: [{ id: 'med.concept.pe' }, { id: 'med.concept.oxygen' }], relations: [] },
    { claims: [{ id: 'CLM-PE-1' }], citations: [{ id: 'CIT-PE-1' }] },
  ), [])

  const subjectRow = {
    system_id: 'cvs', system: 'Cardiovascular', system_short: 'CVS', system_color: '#b4442f',
    system_cross_refs: 'resp', topic_id: 'cvs-topic', topic: 'Venous thromboembolism',
    topic_cross_refs: 'resp-sub', subtopic_id: 'cvs-sub', subtopic: 'Pulmonary embolism',
    microtopic_id: 'cvs-micro', microtopic: 'Wells score',
    nanotopic_id: 'cvs-nano', nanotopic: 'D-dimer',
  }
  covers('subjects', [subjectRow])
  const tree = [{
    id: 'cvs', name: 'Cardiovascular', short: 'CVS', color: '#000000', sysId: 'SYS-CVS',
    topics: [{
      id: 'cvs-topic', title: 'Old VTE', tpcId: 'TPC-CVS-OLD',
      subs: [{ id: 'cvs-sub', title: 'Old PE', subId: 'SUB-CVS-OLD', micros: [{ id: 'cvs-micro', title: 'Old Wells', micId: 'MIC-CVS-OLD', nanos: [{ id: 'cvs-nano', title: 'Old D-dimer', nanId: 'NAN-CVS-OLD' }] }] }],
    }],
  }]
  const context = { tree, taken: new Set(['cvs', 'cvs-topic', 'cvs-sub', 'cvs-micro', 'cvs-nano']), changes: [], errors: [] }
  applyRow(subjectRow, context, {
    systemId: (slug) => `SYS-${slug}`,
    topicId: (slug) => `TPC-${slug}`,
    subtopicId: (slug) => `SUB-${slug}`,
    microtopicId: (slug) => `MIC-${slug}`,
    nanotopicId: (slug) => `NAN-${slug}`,
  }, 1)
  assert.deepEqual(context.errors, [])
  assert.equal(clone(context.tree)[0].topics[0].title, 'Venous thromboembolism')
})

test('authored medicine game packs are first-class bulk-import contracts', () => {
  assert.equal(validMiniGamePacks().length, 3)
  assert.deepEqual(validMiniGamePacks().flatMap(validateMiniGamePack), [])

  const clinicalSequence = {
    id: 'CS-ROUNDTRIP-PRIMARY-SURVEY',
    kind: 'clinical_sequence',
    title: 'Primary survey sequence',
    subject: 'fnd',
    topic: 'Emergencies & red flags',
    summary: 'Order the reviewed primary-survey response.',
    prompt: 'Place the actions in the correct order.',
    source_label: 'Reviewed emergency-skills source pack',
    source_url: 'internal://source-packs/emergency-skills',
    reviewed_by: 'Content operations',
    reviewed_at: '2026-08-24',
    steps: [
      'danger | Check the scene for danger before approaching.',
      'response | Check responsiveness and call for help.',
      'airway | Open the airway.',
      'breathing | Check breathing.',
    ].join('\n'),
    explanation: 'The game uses this authored order exactly.',
  }
  const mechanismChain = {
    ...clinicalSequence,
    id: 'MC-ROUNDTRIP-HF-COMPENSATION',
    kind: 'mechanism_chain',
    title: 'Heart failure compensation chain',
    subject: 'cvs',
    topic: 'Heart failure',
    summary: 'Order the reviewed cause-to-effect chain.',
    prompt: 'Arrange the mechanism from trigger to consequence.',
    steps: [
      'low-output | Reduced effective cardiac output is sensed.',
      'sympathetic | Sympathetic and renin–angiotensin activation increase.',
      'retention | Salt and water retention raises filling pressures.',
      'wall-stress | Higher wall stress increases myocardial workload.',
    ].join('\n'),
    explanation: 'Every link is authored and reviewed before import.',
  }
  const redFlagSort = {
    ...clinicalSequence,
    id: 'RF-ROUNDTRIP-RESP-ESCALATION',
    kind: 'red_flag_sort',
    title: 'Respiratory escalation signals',
    subject: 'resp',
    topic: 'Respiratory safety',
    summary: 'Sort reviewed findings into escalation lanes.',
    prompt: 'Classify each authored finding.',
    urgent_lane: 'Urgent escalation',
    routine_lane: 'Routine review',
    findings: [
      'silent-chest | urgent | Silent chest with marked breathlessness | Emergency-pattern finding in this pack.',
      'cyanosis | urgent | Cyanosis or exhaustion | Urgent deterioration signal in this pack.',
      'mild-cough | routine | Mild cough with normal activity and no distress | Appropriate for routine review here.',
      'inhaler-technique | routine | Poor inhaler technique without acute distress | Routine education/review issue in this pack.',
    ].join('\n'),
  }

  covers('minigame', [clinicalSequence, mechanismChain, redFlagSort])
  for (const row of [clinicalSequence, mechanismChain, redFlagSort]) {
    assert.deepEqual(validateMiniGameRow(row), [])
    const pack = miniGamePackFromRow(row)
    assert.deepEqual(validateMiniGamePack(pack), [])
    const reparsed = miniGamePackFromRow(miniGamePackToRow(pack))
    assert.deepEqual(reparsed, pack)
  }
  assert.equal(IMPORT_CONTRACTS.minigame.parserOwner, 'src/data/minigameImport.ts#miniGamePackFromRow')
})
