#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../..')
const base = resolve(root, 'docs/Helwan-Source-Imports')
const paths = {
  concepts: resolve(base, 'concept/HU-LCS-103-family102-q18-31-closure-concept-updates.md'),
  articles: resolve(base, 'article/HU-LCS-103-family102-q18-31-closure-article.md'),
  claims: resolve(base, 'evidence/HU-LCS-103-family102-q18-31-claims.md'),
  citations: resolve(base, 'evidence/HU-LCS-103-family102-q18-31-citations.md'),
  spans: resolve(base, 'evidence/HU-LCS-103-family102-q18-31-spans.md'),
  questions: resolve(base, 'question/HU-LCS-103-family102-q18-31-mcq.md'),
}
const divider = '\n\n---\n\n'
const item = (fields) => `# Item\n\n${Object.entries(fields).map(([key, value]) => `## ${key}\n${value ?? ''}`).join('\n\n')}\n`
const source = { assessment: 'src_ea4daee0a71cf5f3171e', teaching: 'src_3328fde7f743cd67dc9f' }
const ids = {
  osteosarcoma: 'CON-MSK-A1148497BD0DB2',
  classification: 'CON-MSK-660824CAF79CBF',
  osteoma: 'CON-MSK-4836A383AEA93E',
  chondroma: 'CON-MSK-681A1DB12F3693',
  myeloma: 'CON-FND-2B59FDDFCEDFA6',
  ewing: 'CON-MSK-E92754368B0B07',
  osteoid: 'CON-MSK-3AD186B4605AF2',
  chondrosarcoma: 'CON-MSK-DDF3A03342A247',
}
const articleIds = {
  bone: 'ART-HU-LCS103-PAT-F102-BONE-FORMING-TUMOURS',
  cartilage: 'ART-HU-LCS103-PAT-F102-CARTILAGE-TUMOURS',
  selected: 'ART-HU-LCS103-PAT-F102-SELECTED-BONE-TUMOURS',
  closure: 'ART-HU-LCS103-PAT-F102-CLOSURE-METASTASIS-SUBTYPES',
}
const conceptSpecs = [
  {
    code: 'CLASS',
    id: ids.classification,
    key: 'bonetumor.classification-and-primary-malignant-frequency',
    label: 'Primary bone-tumour classification excludes metastatic tumours while the local closure items distinguish overall metastatic frequency and osteosclerotic prostatic spread',
    aliases: 'Primary and metastatic bone tumour classification\nMost common bone tumour category\nOsteosclerotic prostatic bone metastasis',
    definition: 'The local source excludes metastatic tumours from primary bone-tumour classes while separately keying metastatic tumours as the most common bone tumour category. It keys prostatic carcinoma as the carcinoma producing osteosclerotic bone metastasis in Q27.',
    objective: 'Distinguish primary classification from overall metastatic frequency and recognise the exact osteosclerotic-metastasis source.',
    pitfalls: 'Do not treat metastatic tumours as a primary class. Do not substitute the other printed carcinomas for the source-keyed prostatic carcinoma.',
    micro: 'Primary versus metastatic bone tumours',
    article_ids: `${articleIds.bone}\n${articleIds.closure}`,
    related: articleIds.bone,
    priorClaims: 'CLM-HULCS103-F102-CLASS-01',
    signal: 'Family-102 Q20 key D and Q27 key E; Family-102 Q3/Q5 prior classification occurrences.',
    original: '[Family-102 Q20] The most common bone tumor; printed key D, Metastatic tumors.\n[Family-102 Q27] Osteosclerotic bone metastasis; printed key E, Prostatic carcinoma.',
  },
  {
    code: 'OSTEOSARCOMA',
    id: ids.osteosarcoma,
    key: 'bonetumor.osteosarcoma-clinicoradiologic-and-malignant-osteoid',
    label: 'Osteosarcoma is a metaphyseal malignant osteoid-forming tumour with source-keyed radiology, age and chondroblastic subtype cues',
    aliases: 'Osteosarcoma malignant osteoid\nOsteogenic sarcoma\nChondroblastic osteosarcoma',
    definition: 'The local source set identifies malignant osteoid as the osteosarcoma hallmark and retains metaphyseal, sun-ray, young-age and Paget-associated cues. The closure item keys chondroblastic osteosarcoma when malignant osteoid and wide areas of malignant cartilage occur together.',
    objective: 'Recognise the exact local osteosarcoma site, radiologic, age and subtype cues without changing the source wording.',
    pitfalls: 'Do not select onion-skin radiology for osteosarcoma. Do not call a mixed malignant osteoid and cartilage pattern pure chondrosarcoma in the source frame.',
    micro: 'Osteosarcoma morphology and subtype',
    article_ids: `${articleIds.bone}\n${articleIds.selected}\n${articleIds.closure}`,
    related: `${articleIds.bone}\n${articleIds.selected}`,
    priorClaims: 'CLM-HULCS103-F102-OSTEOSARCOMA-01\nCLM-HULCS103-F102-OSTEOSARCOMA-Q12-17-01',
    signal: 'Family-102 Q18/Q19/Q25/Q31 keys C/C/E/C plus prior Family-102 osteosarcoma occurrences.',
    original: '[Family-102 Q18] Sun-ray, key C.\n[Q19] Metaphysis, key C.\n[Q25] Age 10–25, key E.\n[Q31] Chondroblastic osteosarcoma, key C.',
  },
]

const concepts = conceptSpecs.map((spec) => ({
  label: spec.label,
  id: spec.id,
  canonical_key: spec.key,
  aliases: spec.aliases,
  arabic_label: '',
  arabic_aliases: '',
  status: 'under review',
  support_mode: 'direct_statement',
  subject: 'msk',
  primary_node_id: 'SYS-MSK',
  secondary_node_ids: 'DIS-PAT-T03',
  topic: 'Musculoskeletal system',
  subtopic: 'Bone tumours',
  nanotopic: '',
  modules: 'HU-LCS-103',
  module_subject: 'HU-LCS-103 > Pathology > Bone Diseases > Bone Tumours',
  universities: 'hu',
  learner_years: '1',
  approved_file_resource_ids: '[clear]',
  approved_video_resource_ids: '[clear]',
  blueprint_weight: '0.86',
  exam_weight_by_year: 'HU_Y1=0.86',
  clinical_relevance: '0.79',
  academic_relevance: '0.98',
  weight_confidence: '0.59',
  confidence: '0.86',
  resource_occurrence_ids: '[clear]',
  source_candidate_ids: '[clear]',
  merge_ids: '[clear]',
  rejected_merge_candidate_ids: 'Exact-ID update selected; no rival concept ID is introduced.',
  evidence_gaps: 'Independent medical verification and named Helwan Pathology faculty review are required before publication.',
  owner: 'Helwan Year-1 authoring lane',
  reviewer: 'Medical team, Helwan Pathology faculty',
  final_publisher: 'Admin team',
  last_reviewed: '',
  review_due: '',
  publication_status: 'needs_evidence',
  editorial_review_status: 'drafted_not_reviewed',
  exclusion_reason: '',
  definition: spec.definition,
  explicit_objective: spec.objective,
  pitfalls: spec.pitfalls,
  concept_type: 'pathology_pattern',
  microtopic: spec.micro,
  article_ids: spec.article_ids,
  related_article_ids: spec.related,
  resource_ids: `${source.assessment}\n${source.teaching}`,
  exam_signal: spec.signal,
  atomic_claim_ids: `${spec.priorClaims}\nCLM-HULCS103-F102-${spec.code}-CLOSURE-01`,
  original_wording: spec.original,
  conflicts: '[clear]',
  uncertainty: 'This exact-ID update appends the Family-102 closure scope while preserving the prior concept identity.',
  field_notes: [
    'microtopicId: The reviewed taxonomy does not provide a more specific canonical microtopic node for this local overlay.',
    'nanotopicId: No reviewed nanotopic ID exists beneath the assigned canonical node.',
    'approvedFileResourceIds: No source file is rights-cleared for student redistribution.',
    'approvedVideoResourceIds: No video is assigned to this concept.',
    'resourceOccurrenceIds: Hand-authored from governed assessment and teaching evidence; no extraction-occurrence record exists.',
    'sourceCandidateIds: Prior governed searches established exact-ID reuse.',
    'mergeIds: No concept was merged into this update.',
    'lastReviewed: Updated Draft record; no faculty review has occurred.',
    'reviewDue: Set after the first faculty review.',
    'exclusionReason: Not excluded; held at needs_evidence.',
    'arabicLabel: Blank pending reviewed Arabic terminology.',
    'arabicAliases: Blank pending reviewed Arabic terminology.',
  ].join('\n'),
}))

const claimSpecs = [
  {
    code: 'CLASS',
    concept: ids.classification,
    text: 'The Family-102 closure keys metastatic tumours as the most common bone tumour category and prostatic carcinoma as the source of osteosclerotic bone metastasis.',
    object: 'metastatic tumours are keyed as the most common bone tumour category, while prostatic carcinoma is keyed as a source of osteosclerotic bone metastasis',
    page: '5-6',
    section: 'Family-102 Q20 and Q27',
    support: 'Q20 prints Metastatic tumors as option D and the right-column key is D. Q27 prints Prostatic carcinoma as option E and the right-column key is E.',
  },
  {
    code: 'OSTEOSARCOMA',
    concept: ids.osteosarcoma,
    text: 'The Family-102 closure identifies chondroblastic osteosarcoma when malignant osteoid and wide areas of malignant cartilage occur together.',
    object: 'chondroblastic osteosarcoma is keyed for a tumour containing malignant osteoid and wide areas of malignant cartilage',
    page: '7',
    section: 'Family-102 Q31',
    support: 'Q31 describes malignant osteoid formation with wide areas of malignant cartilage and prints Chondroblastic osteosarcoma as option C with right-column key C.',
  },
]

const sections = [
  '### Definition',
  'This closure article keeps the remaining Family-102 bone-tumour assessment distinctions in their exact local frame. It separates overall metastatic frequency from primary bone-tumour classification and retains the mixed malignant osteoid-and-cartilage cue for chondroblastic osteosarcoma.',
  '',
  '### Mechanism',
  'Metastatic deposits are not a primary bone-tumour class, yet the direct assessment keys metastatic tumours as the most common overall bone-tumour category. It also keys prostatic carcinoma for osteosclerotic bone metastasis. Within osteosarcoma, malignant osteoid remains the defining matrix, while abundant malignant cartilage supplies the source-keyed chondroblastic subtype cue.',
  '',
  '### Key determinants',
  'Read the scope of the stem before choosing between a primary tumour class and metastatic disease. Preserve the exact keyed prostatic answer for the osteosclerotic-metastasis item. For the final morphology stem, the simultaneous malignant osteoid and broad malignant cartilage areas point to the source-keyed chondroblastic osteosarcoma response.',
  '',
  '### Clinical significance',
  'These are local first-year assessment distinctions and not a diagnostic or management protocol. The source wording and printed keys are retained exactly, but each record remains Draft pending independent medical verification and named Helwan Pathology faculty review.',
  '',
  '### Common misconceptions',
  'Do not move metastatic tumours into the primary classification. Do not substitute a different printed carcinoma for the keyed prostatic response. Do not call the mixed malignant osteoid-and-cartilage pattern pure chondrosarcoma in this source-bound item.',
  '',
  '### Source-bound statements',
  ...claimSpecs.map((spec) => spec.text),
].join('\n')

const article = [{
  id: articleIds.closure,
  title: 'Bone-tumour closure: metastatic frequency, osteosclerotic spread and chondroblastic osteosarcoma',
  aliases: 'Family-102 bone-tumour closure\nMetastatic bone tumours and osteosarcoma subtype cues',
  arabic_title: '',
  subject: 'msk',
  topic: 'Musculoskeletal system',
  subtopic: 'Bone tumours',
  primary_node_id: 'SYS-MSK',
  template_id: 'TPL-CONCEPT',
  archetype: 'concept',
  language: 'en',
  learner_stage: 'Years 1–3 foundation',
  high_yield: 'High',
  time_sensitive: 'stable',
  status: 'Draft',
  owner: 'Helwan Year-1 authoring lane',
  reviewer: 'Medical team, Helwan Pathology faculty',
  final_publisher: 'Admin team',
  published_summary: '',
  published_sections: '',
  universities: 'hu',
  years: 'HU_Y1',
  module: 'HU-LCS-103',
  media: '',
  publication_gate: 'needs_evidence',
  evidence_gaps: 'Independent medical verification and named Helwan Pathology faculty review are required before publication.',
  last_reviewed: '',
  review_due: '',
  nanotopic: '',
  secondary_node_ids: 'DIS-PAT-T03',
  media_recommendations: '',
  conflicts: 'Family-102 Q24 retains literal t-(11,21) wording and printed key A as an unadjudicated source-risk occurrence.',
  microtopic: 'Metastatic frequency and osteosarcoma subtype',
  reading_time: '5',
  summary: 'Family-102 Q20, Q27 and Q31 distinguish overall metastatic frequency, osteosclerotic prostatic spread and the chondroblastic osteosarcoma morphology cue. The article is source-bound and remains Draft.',
  sections,
  hold_these: claimSpecs.map((spec) => spec.text).join('\n'),
  lose_the_mark: 'Treating metastatic disease as a primary bone-tumour class.\nReplacing the printed prostatic carcinoma response.\nCalling a malignant osteoid-and-cartilage tumour pure chondrosarcoma in Q31.',
  related_concepts: `${ids.classification}\n${ids.osteosarcoma}`,
  related_articles: `${articleIds.bone}\n${articleIds.selected}`,
  question_ids: 'Q-HU-LCS103-PAT-F102-20\nQ-HU-LCS103-PAT-F102-27\nQ-HU-LCS103-PAT-F102-31',
  resource_ids: `${source.assessment}\n${source.teaching}`,
  module_subject: 'HU-LCS-103 > Pathology > Bone Diseases > Bone Tumours',
  university_notes: 'hu: Restricted to the direct Family-102 assessment and governed local Family-64/65/66 teaching support.',
  annotations: claimSpecs.map((spec) => `### definition_of · ${spec.concept}\nQuote: ${spec.text}\nBlock: body`).join('\n\n'),
  article_source_ids: `${source.assessment}\n${source.teaching}`,
  claim_ids: claimSpecs.map((spec) => `CLM-HULCS103-F102-${spec.code}-CLOSURE-01`).join('\n'),
  span_ids: claimSpecs.map((spec) => `SPN-HULCS103-F102-${spec.code}-CLOSURE-01`).join('\n'),
  callout_evidence: claimSpecs.map((spec) => `### ${spec.text}\nClaims: CLM-HULCS103-F102-${spec.code}-CLOSURE-01\nCitations: CIT-HULCS103-F102-${spec.code}-CLOSURE-01\nSpan: SPN-HULCS103-F102-${spec.code}-CLOSURE-01`).join('\n\n'),
  evidence_basis: 'Family-102 supplies the exact assessment wording and printed keys. Governed local teaching material supports explanation context, but neither local source independently verifies the claims.',
  notes: 'Q24 remains an unadjudicated Draft source-risk occurrence. Q28 and Q29 remain separate repeated source occurrences. The six written case prompts remain deferred.',
  field_notes: 'arabicTitle: Blank pending reviewed terminology.\nnanotopicId: No reviewed nanotopic exists below SYS-MSK.\nmedia: No media is required.\npublishedSummary: Blank because this remains Draft.\npublishedSections: Blank because this remains Draft.\nlastReviewed: No named medical review completed.\nreviewDue: Set after first named review.',
}]

const claims = claimSpecs.map((spec) => ({
  id: `CLM-HULCS103-F102-${spec.code}-CLOSURE-01`,
  concept_id: spec.concept,
  subject: spec.code === 'CLASS' ? 'Bone-tumour classification and metastatic patterns' : 'Chondroblastic osteosarcoma',
  predicate: 'is presented in the local LCS source set as',
  object: spec.object,
  display_text: spec.text,
  risk_class: 'foundational_stable',
  verification_status: 'needs_evidence',
  conflict_status: 'none',
  confidence: '0.84',
  freshness: 'stable_local_curriculum_fact',
  time_sensitive: 'no',
  qualifiers: 'polarity: affirmative\nauthority: local Helwan assessment evidence, not independent verification\nassessment boundary: Family-102 Q18–Q31',
}))

const citations = claimSpecs.map((spec) => ({
  id: `CIT-HULCS103-F102-${spec.code}-CLOSURE-01`,
  claim_id: `CLM-HULCS103-F102-${spec.code}-CLOSURE-01`,
  resource_id: source.assessment,
  evidence_role: 'direct_assessment_support',
  locator_type: 'page',
  locator_page: spec.page,
  locator_section: spec.section,
  locator_detail: `Governed Family-102 physical PDF p${spec.page}, exact printed occurrence and right-column key.`,
  support_span: spec.support,
  context_note: 'Direct local assessment support for a Draft record; not independent medical verification.',
  confidence: '0.84',
  counts_as_claim_evidence: 'no',
}))

const spans = claimSpecs.map((spec) => ({
  id: `SPN-HULCS103-F102-${spec.code}-CLOSURE-01`,
  article_id: articleIds.closure,
  section_id: 'art-hu-lcs103-pat-f102-closure-metastasis-subtypes-source-bound-statements',
  text: spec.text,
  claim_ids: `CLM-HULCS103-F102-${spec.code}-CLOSURE-01`,
  citation_ids: `CIT-HULCS103-F102-${spec.code}-CLOSURE-01`,
}))

const rowSpecs = [
  [18, 'C', 'Sun-ray appearance is characteristic feature of:', ['Osteoma', 'Osteoblastoma', 'Osteosarcoma', 'Chondroma', 'Chondrosarcoma'], ids.osteosarcoma, articleIds.bone],
  [19, 'C', 'Osteosarcoma tends to occur in:', ['Epiphysis', 'Diaphysis', 'Metaphysis', 'Articular cartilage', 'Tendons'], ids.osteosarcoma, articleIds.bone],
  [20, 'D', 'The most common bone tumor is:', ['Osteosarcoma', 'Osteochondroma', 'Giant cell tumor', 'Metastatic tumors', 'Chondrosarcoma'], ids.classification, articleIds.closure],
  [21, 'A', 'A patient with multiple osteomas. This is a part of:-', ['Gardner syndrome', 'Ollier disease', 'Maffucci syndrome', 'Li-Fraumeni syndrome', 'McCune Albright syndrome'], ids.osteoma, articleIds.bone],
  [22, 'C', 'Ollier disease is characterized by multiple:-', ['Exostosis', 'Fibrous dysplasia', 'Chondromas', 'Bone secondaries'], ids.chondroma, articleIds.cartilage],
  [23, 'B', 'Multiple Myeloma is a tumor of:-', ['Lymphocytes', 'Plasma cells', 'Mast cells', 'Neuroectodermal cells of bone marrow', 'Promyelocytes'], ids.myeloma, articleIds.selected],
  [24, 'A', 'Translocation t-(11,21) is characteristic for:', ['Ewing sarcoma', 'Osteosarcoma', 'Multiple myeloma', 'McCune Albright syndrome', 'Cortical fibrous defect'], ids.ewing, articleIds.selected],
  [25, 'E', 'Osteosarcoma is characterized by:-', ['Is rare in the metaphysis of long bones', 'Spreads mostly by lymphatic pathway', 'Gives onion skin appearance on radiograph', 'Has a good prognosis', 'Occurs most commonly between the ages of 10 and 25 years'], ids.osteosarcoma, articleIds.bone],
  [26, 'B', 'Multiple Chondromas + Benign angiomas is called:-', ['Ollier syndrome', 'Maffucci syndrome', 'Gardener syndrome', 'Multiple hereditary exostosis'], ids.chondroma, articleIds.cartilage],
  [27, 'E', 'The following carcinoma may produce osteosclerotic bone metastasis:-', ['Bronchogenic carcinoma', 'Thyroid carcinoma', 'Renal cell carcinoma', 'Breast carcinoma', 'Prostatic carcinoma'], ids.classification, articleIds.closure],
  [28, 'C', 'Painful radiolucent lesion in distal femur (1 cm) which is relieved by aspirin:', ['Osteosarcoma', 'Chondroma', 'Osteoid osteoma', 'Osteoblastoma', 'Osteoma'], ids.osteoid, articleIds.bone],
  [29, 'D', 'The most common site for chondrosarcoma among those is:', ['Proximal femur', 'Around the knee joint', 'Metatarsal bones', 'Scapula', 'Mandible'], ids.chondrosarcoma, articleIds.cartilage],
  [30, 'C', 'Onion skin appearance on X-ray is characteristic of:-', ['Osteosarcoma', 'Bone metastasis', 'Ewing’s sarcoma', 'McCune Albright syndrome', 'Osteoid osteoma'], ids.ewing, articleIds.selected],
  [31, 'C', 'Microscopic examination of bone tumor revealed atypical spindle cells related to malignant osteoid formation and wide areas with malignant cartilage formations.The diagnosis is:-', ['Osteochondroma', 'Chondrosarcoma', 'Chondroblastic osteosarcoma', 'Osteoblastic osteosarcoma', 'Metaphyseal fibrous defect'], ids.osteosarcoma, articleIds.closure],
]

const learningByConcept = {
  [ids.osteosarcoma]: 'Recognise the exact source-keyed osteosarcoma site, radiologic, age and subtype cues.',
  [ids.classification]: 'Distinguish primary bone-tumour classification from overall metastatic frequency and osteosclerotic spread.',
  [ids.osteoma]: 'Recognise the source-keyed syndrome association of multiple osteomas.',
  [ids.chondroma]: 'Distinguish the source-keyed multiple-chondroma syndromes and their vascular-lesion association.',
  [ids.myeloma]: 'Recognise the source-keyed plasma-cell lineage of multiple myeloma.',
  [ids.ewing]: 'Recognise the exact local genetic and radiologic cues assigned to Ewing sarcoma.',
  [ids.osteoid]: 'Recognise the small painful aspirin-responsive radiolucent lesion keyed as osteoid osteoma.',
  [ids.chondrosarcoma]: 'Recognise the source-keyed site distinction for chondrosarcoma.',
}
const commonQuestion = {
  subject: 'msk', status: 'Draft', owner: 'Helwan Year-1 authoring lane', vignette: '', format: 'single best answer', written_parts: '', matching_options: '', matching_prompts: '', correct_answers: '', labeling_image: '', labeling_alt: '', labeling_points: '', completion_text: '', derived_from: '', topic: 'Musculoskeletal system', subtopic: 'Bone tumours', difficulty: 'Easy', question_type: 'Pathology', module: 'HU-LCS-103', module_subject: 'HU-LCS-103 > Pathology > Bone Diseases > Bone Tumours', clinical_relevance: '0.78', academic_relevance: '0.98', cognitive_effort_score: '0.38', exam_weight_by_year: 'HU_Y1=0.86', question_only_for: 'HU_Y1', concept_ids: '', years: 'HU_Y1', universities: 'hu', cognitive_effort: 'Low', setting: 'Academic', reasoning_level: '1', inferred_difficulty: '68', exam_relevance: '9', contextual_concept_ids: '', media_recommendations: '', attachments: '', attached_image: '', estimated_seconds: '60', randomise_answers: 'yes',
}

const questions = rowSpecs.map(([number, key, stem, options, concept, library]) => {
  const fields = { id: `Q-HU-LCS103-PAT-F102-${number}`, title: stem, ...commonQuestion, question: stem, correct_answer: key }
  options.forEach((option, index) => {
    const letter = String.fromCharCode(65 + index)
    fields[`answer_${letter.toLowerCase()}`] = option
    fields[`explanation_${letter.toLowerCase()}`] = letter === key
      ? `The Family-102 deck prints ${key} as the right-column key for this exact occurrence, so “${option}” is retained as the source-keyed response. The linked concept and article preserve the local distinction tested by the stem and do not extend it into a clinical protocol. This record remains Draft because local assessment and teaching support do not replace independent verification or named Helwan Pathology faculty review.`
      : `The option “${option}” is preserved exactly from Family-102, but the printed right-column key selects ${key} instead. The linked concept and article explain the local assessment distinction without rewriting this distractor or inferring a different answer. This record remains Draft pending independent verification and named Helwan Pathology faculty review.`
  })
  for (const letter of ['a', 'b', 'c', 'd', 'e', 'f']) {
    if (!Object.hasOwn(fields, `answer_${letter}`)) fields[`answer_${letter}`] = ''
    if (!Object.hasOwn(fields, `explanation_${letter}`)) fields[`explanation_${letter}`] = ''
  }
  const page = number <= 23 ? '5' : number <= 29 ? '6' : '7'
  let occurrenceNote = 'No new source-risk flag or repeat annotation is introduced for this occurrence.'
  if (number === 24) occurrenceNote = 'Q24 preserves the literal source wording t-(11,21) and printed key A as an unadjudicated source-risk occurrence without medical repair.'
  if (number === 28) occurrenceNote = 'Q28 is a repeat of Q1 and is preserved as a separate source occurrence with its own identifier.'
  if (number === 29) occurrenceNote = 'Q29 is a repeat of Q2 and is preserved as a separate source occurrence with its own identifier.'
  if (number === 30) occurrenceNote = 'The printed lowercase c is transparently normalized to importer value C; the source answer is not adjudicated or repaired.'
  return {
    ...fields,
    main_concept: concept,
    library_ids: library,
    resource_ids: `${source.assessment}\n${source.teaching}`,
    learning_objective: learningByConcept[concept],
    source_citation: `${source.assessment}, physical PDF p${page}, printed Q${number}: exact source stem/options with right-column printed key ${number === 30 ? 'c' : key}. Teaching support: ${source.teaching}.`,
    author_notes: `Transcribed exactly from governed Family 102 physical p${page}; wording, capitalisation, punctuation, option order and printed key are preserved. ${occurrenceNote} The six keyed written case prompts remain deferred to a separate marks/schema-aware slice. Family-101 Q12 and Q20 remain held and unimported. Family-102 Q12 and Q15 remain Draft source-risk occurrences. No practical or media record is inferred.`,
  }
})

if (questions.length !== 14 || questions.map((row) => row.correct_answer).join('') !== 'CCDACBAEBECDCC') throw new Error('Family-102 Q18–Q31 count or key mismatch')
if (concepts.length !== 2 || article.length !== 1 || claims.length !== 2 || citations.length !== 2 || spans.length !== 2) throw new Error('Family-102 closure dependency count mismatch')
await Promise.all(Object.values(paths).map((path) => mkdir(dirname(path), { recursive: true })))
await Promise.all([
  writeFile(paths.concepts, concepts.map(item).join(divider), 'utf8'),
  writeFile(paths.articles, article.map(item).join(divider), 'utf8'),
  writeFile(paths.claims, claims.map(item).join(divider), 'utf8'),
  writeFile(paths.citations, citations.map(item).join(divider), 'utf8'),
  writeFile(paths.spans, spans.map(item).join(divider), 'utf8'),
  writeFile(paths.questions, questions.map(item).join(divider), 'utf8'),
])
console.log(JSON.stringify({ files: paths, counts: { concepts: 2, newConcepts: 0, conceptUpdates: 2, articles: 1, questions: 14, claims: 2, citations: 2, spans: 2 }, keys: questions.map((row) => row.correct_answer).join(''), optionCounts: questions.map((row) => ['a', 'b', 'c', 'd', 'e', 'f'].filter((letter) => row[`answer_${letter}`]).length), preservedRepeats: ['Q28=Q1', 'Q29=Q2'], sourceRisks: ['Q24=t-(11,21), key A'], priorHoldsUntouched: ['Family101-Q12=B', 'Family101-Q20=C'], newHolds: [], deferredWrittenCases: 6, practical: 0, media: 0 }, null, 2))
