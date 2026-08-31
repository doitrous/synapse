#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../..')
const base = resolve(root, 'docs/Helwan-Source-Imports')
const paths = {
  concepts: resolve(base, 'concept/HU-LCS-103-family102-q12-17-selected-bone-tumour-concepts.md'),
  articles: resolve(base, 'article/HU-LCS-103-family102-q12-17-selected-bone-tumour-articles.md'),
  claims: resolve(base, 'evidence/HU-LCS-103-family102-q12-17-claims.md'),
  citations: resolve(base, 'evidence/HU-LCS-103-family102-q12-17-citations.md'),
  spans: resolve(base, 'evidence/HU-LCS-103-family102-q12-17-spans.md'),
  questions: resolve(base, 'question/HU-LCS-103-family102-q12-17-mcq.md'),
}
const divider = '\n\n---\n\n'
const item = (fields) => `# Item\n\n${Object.entries(fields).map(([key, value]) => `## ${key}\n${value ?? ''}`).join('\n\n')}\n`
const source = { assessment: 'src_ea4daee0a71cf5f3171e', teaching: 'src_3328fde7f743cd67dc9f' }
const articleId = 'ART-HU-LCS103-PAT-F102-SELECTED-BONE-TUMOURS'
const ids = {
  ewing: 'CON-MSK-E92754368B0B07',
  giant: 'CON-MSK-319E7EB6D0E26A',
  myeloma: 'CON-FND-2B59FDDFCEDFA6',
  osteosarcoma: 'CON-MSK-A1148497BD0DB2',
}

const specs = [
  {
    code: 'EWING', id: ids.ewing, key: 'bonetumor.ewing-genetics-radiology-neural-differentiation', label: 'Ewing sarcoma is a destructive small-round-cell bone tumour with onion-skin radiology and source-keyed neural differentiation', aliases: 'Ewing sarcoma\nEwing family tumour\nOnion-skin bone tumour', subject: 'msk', primary: 'SYS-MSK', secondary: 'DIS-PAT-T03', topic: 'Musculoskeletal system', subtopic: 'Bone tumours', micro: 'Ewing sarcoma', definition: 'The governed local source set presents Ewing sarcoma as a destructive, aggressive small-round-cell tumour involving long or flat bones. Family-102 retains onion-skin radiology and keys Homer Wright rosettes to neural differentiation.', objective: 'Recognise the exact local radiologic and differentiation cues while preserving the Q12 source-risk key without repair.', pitfalls: 'Do not silently repair Q12 or replace its printed B key. Do not treat dense stroma as the keyed microscopic description in Q13.', claim: 'The local source set presents Ewing sarcoma as a destructive small-round-cell tumour with onion-skin radiology and source-keyed neural differentiation.', citation: source.teaching, page: '39', support: 'The teaching deck presents Ewing sarcoma as a highly malignant small round cell tumour and describes long/flat-bone involvement and onion-skin radiology.', oldArticles: '', modules: 'HU-LCS-103', signal: 'Family-102 Q12 B, Q13 C and Q14 E; Family-64 p39 support.', original: '[Family-102 Q12–Q14] Exact printed Ewing prompts and keys B, C, E.\n[Family-64 p39] Small round cell tumour, long/flat bone sites and onion-skin appearance.', conflict: 'Q12 is retained as a source-risk occurrence: the deck prints B for its negative stem. No independent adjudication is inferred.', newRecord: true,
  },
  {
    code: 'GIANT', id: ids.giant, key: 'bonetumor.giant-cell-site-and-stromal-biology', label: 'Giant-cell tumour is an epiphyseal lytic lesion containing osteoclast-like giant cells and neoplastic stromal cells', aliases: 'Giant cell tumour of bone\nOsteoclastoma\nEpiphyseal giant-cell lesion', subject: 'msk', primary: 'SYS-MSK', secondary: 'DIS-PAT-T03', topic: 'Musculoskeletal system', subtopic: 'Bone tumours', micro: 'Giant-cell tumour', definition: 'The local source places giant-cell tumour at the epiphyseal end of long bone and describes osteoclast-like giant cells scattered through mononuclear stromal cells. Family-102 retains lytic lesions and lung spread while keying the highly aggressive malignant statement as the exception.', objective: 'Identify the exact source-retained site and cellular pattern while preserving the Q15 exception key.', pitfalls: 'Do not equate the osteoclast-like giant cells with the neoplastic stromal population. Preserve the printed Q15 A key without upgrading the local behaviour wording.', claim: 'The local source set presents giant-cell tumour as an epiphyseal lytic lesion with osteoclast-like giant cells dispersed through neoplastic stromal cells.', citation: source.teaching, page: '38', support: 'The teaching deck describes epiphyseal location, osteoclast-like giant cells and mononuclear stromal cells as the real tumour cells.', oldArticles: '', modules: 'HU-LCS-103', signal: 'Family-102 Q15 key A; Family-64 p38 support.', original: '[Family-102 Q15] Exact printed giant-cell-tumour exception prompt and key A.\n[Family-64 p38] Epiphyseal gross site and stromal/giant-cell morphology.', conflict: 'Q15 is retained as a source-risk occurrence: the deck prints A for its exception stem. No independent adjudication is inferred.', newRecord: true,
  },
  {
    code: 'MYELOMA', id: ids.myeloma, key: 'pathology.hematologic.multiple-myeloma-m-spike-plasma-cells', label: 'Bone pain, recurrent infections, an M-spike and marrow plasma cells indicate multiple myeloma', aliases: 'Multiple myeloma diagnostic pattern\nM-protein plasma-cell neoplasm\nLytic plasma-cell bone tumour', subject: 'fnd', primary: 'SYS-FND-T03', secondary: 'DIS-PAT-T05', topic: 'General pathology', subtopic: 'Neoplasia', micro: 'Multiple myeloma', definition: 'Multiple myeloma is represented in the governed Helwan material as a plasma-cell neoplasm associated with marrow proliferation and lytic bone disease. Its prior BMS scope retains bone pain, recurrent infection and an M-spike, while Family-102 keys plasma cells in the bone-lytic question.', objective: 'Recognise multiple myeloma from the exact plasma-cell and lytic-bone assessment cues.', pitfalls: 'Do not substitute lymphocytes, mast cells or neuroectodermal cells for the source-keyed plasma-cell lineage.', claim: 'The Family-102 assessment identifies multiple myeloma as neoplastic plasma-cell proliferation associated with lytic bone lesions.', citation: source.assessment, page: '3', support: 'Q16 prints a plasma-cell proliferation and bone-lytic-lesion stem and keys Multiple myeloma.', oldArticles: 'ART-HU-BMS102-PAT-TUMOUR-MARKERS-HAEMATOLOGIC', modules: 'HU-BMS-102\nHU-LCS-103', signal: 'Family-102 Q16 key B; prior BMS Family5 diagnostic-pattern signal.', original: '[Family-102 Q16] Neoplastic proliferation of plasma cells with appearance of bone lytic lesions; printed key B, Multiple myeloma.\n[Prior BMS Family5] M-spike and marrow plasma-cell diagnostic pattern.', conflict: '[clear]', newRecord: false,
  },
  {
    code: 'OSTEOSARCOMA', id: ids.osteosarcoma, key: 'bonetumor.osteosarcoma-clinicoradiologic-and-malignant-osteoid', label: 'Osteosarcoma is a metaphyseal malignant osteoid-forming tumour that may arise secondarily in Paget disease', aliases: 'Osteosarcoma malignant osteoid\nOsteogenic sarcoma\nSecondary osteosarcoma after Paget disease', subject: 'msk', primary: 'SYS-MSK', secondary: 'DIS-PAT-T03', topic: 'Musculoskeletal system', subtopic: 'Bone tumours', micro: 'Osteosarcoma morphology and secondary setting', definition: 'The local source set identifies malignant osteoid matrix as the osteosarcoma hallmark and retains metaphyseal and radiologic cues. Family-64 also presents secondary osteosarcoma as arising after pre-existing bone disease including Paget disease, which Family-102 keys in Q17.', objective: 'Identify osteosarcoma as the exact source-keyed malignant tumour associated with Paget disease.', pitfalls: 'Do not replace the printed osteosarcoma answer with osteoblastoma, fibrous dysplasia or Ewing sarcoma.', claim: 'The local source set presents osteosarcoma as a possible secondary malignancy following Paget disease of bone.', citation: source.teaching, page: '35', support: 'The teaching deck states that secondary osteosarcoma develops following pre-existing bone disease including Paget disease.', oldArticles: 'ART-HU-LCS103-PAT-F102-BONE-FORMING-TUMOURS', modules: 'HU-LCS-103', signal: 'Family-102 Q17 key D; Family-64 p35 support.', original: '[Family-102 Q17] Paget disease vulnerability prompt; printed key D, Osteosarcoma.\n[Family-64 p35] Secondary osteosarcoma after pre-existing Paget disease.', conflict: '[clear]', newRecord: false,
  },
]

const concepts = specs.map((spec) => {
  const preservedResources = spec.code === 'MYELOMA' ? 'src_eda268c7a75eb1930662\nsrc_771db2e7413e8f717ff1\n' : ''
  const preservedClaims = spec.code === 'MYELOMA' ? 'CLM-HU102-F5P5-B09-01\n' : spec.code === 'OSTEOSARCOMA' ? 'CLM-HULCS103-F102-OSTEOSARCOMA-01\n' : ''
  return {
    label: spec.label,
    id: spec.id,
    canonical_key: spec.key,
    aliases: spec.aliases,
    arabic_label: '',
    arabic_aliases: '',
    status: 'under review',
    support_mode: 'direct_statement',
    subject: spec.subject,
    primary_node_id: spec.primary,
    secondary_node_ids: spec.secondary,
    topic: spec.topic,
    subtopic: spec.subtopic,
    nanotopic: '',
    modules: spec.modules,
    module_subject: 'HU-LCS-103 > Pathology > Bone Diseases > Bone Tumours',
    universities: 'hu',
    learner_years: '1',
    approved_file_resource_ids: '[clear]',
    approved_video_resource_ids: '[clear]',
    blueprint_weight: '0.84',
    exam_weight_by_year: 'HU_Y1=0.84',
    clinical_relevance: '0.78',
    academic_relevance: '0.98',
    weight_confidence: '0.58',
    confidence: '0.85',
    resource_occurrence_ids: '[clear]',
    source_candidate_ids: '[clear]',
    merge_ids: '[clear]',
    rejected_merge_candidate_ids: spec.newRecord ? 'Governed exact and broad searches returned no substantive live or pending owner for this complete objective.' : 'Exact-ID reuse selected; no rival ID is introduced.',
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
    article_ids: `${spec.oldArticles ? `${spec.oldArticles}\n` : ''}${articleId}`,
    related_article_ids: spec.oldArticles || articleId,
    resource_ids: `${preservedResources}${source.assessment}\n${source.teaching}`,
    exam_signal: spec.signal,
    atomic_claim_ids: `${preservedClaims}CLM-HULCS103-F102-${spec.code}-Q12-17-01`,
    original_wording: spec.original,
    conflicts: spec.conflict,
    uncertainty: spec.newRecord ? '[clear]' : 'This is an exact-ID update that appends the Family-102 LCS scope while preserving the prior concept identity.',
    field_notes: [
      'microtopicId: The reviewed taxonomy does not provide a more specific canonical microtopic node for this local overlay.',
      'nanotopicId: No reviewed nanotopic ID exists beneath the assigned canonical node.',
      'approvedFileResourceIds: No source file is rights-cleared for student redistribution.',
      'approvedVideoResourceIds: No video is assigned to this concept.',
      'resourceOccurrenceIds: Hand-authored from governed assessment and teaching evidence; no extraction-occurrence record exists.',
      'sourceCandidateIds: Governed searches completed before minting or exact-ID reuse.',
      'mergeIds: No concept was merged into this record.',
      'lastReviewed: New or updated Draft record; no faculty review has occurred.',
      'reviewDue: Set after the first faculty review.',
      'exclusionReason: Not excluded; held at needs_evidence.',
      'arabicLabel: Blank pending reviewed Arabic terminology.',
      'arabicAliases: Blank pending reviewed Arabic terminology.',
    ].join('\n'),
  }
})

const claimLines = specs.map((spec) => spec.claim).join('\n\n')
const sections = [
  '### Definition',
  'This bounded Family-102 cluster separates Ewing sarcoma, giant-cell tumour, multiple myeloma and secondary osteosarcoma by source-printed clues. Ewing is represented by destructive small-round-cell and onion-skin cues, giant-cell tumour by epiphyseal lytic morphology, myeloma by plasma-cell lytic disease, and secondary osteosarcoma by the Paget association.',
  '',
  '### Mechanism',
  'The companion Family-64 teaching deck links Ewing sarcoma to small round cells and reactive onion-skin bone, and it places osteoclast-like giant cells within a neoplastic mononuclear stromal population in giant-cell tumour. It also states that secondary osteosarcoma may follow Paget disease. The direct Family-102 item supplies the plasma-cell and lytic-lesion myeloma link.',
  '',
  '### Key determinants',
  'For Ewing sarcoma, retain each exact negative-stem key and treat Homer Wright rosettes as the source-keyed neural-differentiation cue. For giant-cell tumour, separate the epiphyseal lytic pattern from the source-rejected highly aggressive malignant wording. Plasma cells identify myeloma in Q16, and osteosarcoma is the printed Paget-associated answer in Q17.',
  '',
  '### Clinical significance',
  'These are local first-year assessment distinctions rather than a diagnostic or management protocol. Q12 and Q15 remain explicit source-risk occurrences, and all claims require independent verification before publication.',
  '',
  '### Common misconceptions',
  'Do not change Q12 or Q15 to match an external expectation. Do not confuse the osteoclast-like giant cells with the neoplastic stromal cells, and do not substitute a non-plasma-cell lineage for myeloma.',
  '',
  '### Source-bound statements',
  claimLines,
].join('\n')

const article = [{
  id: articleId,
  title: 'Selected bone tumours: Ewing sarcoma, giant-cell tumour, multiple myeloma and secondary osteosarcoma',
  aliases: 'Selected malignant and locally aggressive bone tumours\nEwing, osteoclastoma, myeloma and secondary osteosarcoma',
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
  conflicts: 'Q12 and Q15 are source-risk occurrences whose exact printed exception keys are retained without adjudication.',
  microtopic: 'Selected bone tumours',
  reading_time: '8',
  summary: 'Family-102 Q12–Q17 tests Ewing sarcoma, giant-cell tumour, multiple myeloma and Paget-associated osteosarcoma. Exact printed keys are retained; Q12 and Q15 are explicitly source-risk and the article remains Draft.',
  sections,
  hold_these: specs.map((spec) => spec.claim).join('\n'),
  lose_the_mark: 'Changing the printed Q12 B or Q15 A key.\nConfusing osteoclast-like giant cells with the neoplastic stromal population.\nSubstituting a non-plasma-cell lineage for multiple myeloma.',
  related_concepts: Object.values(ids).join('\n'),
  related_articles: 'ART-HU-LCS103-PAT-F102-BONE-FORMING-TUMOURS\nART-HU-BMS102-PAT-TUMOUR-MARKERS-HAEMATOLOGIC',
  question_ids: [12, 13, 14, 15, 16, 17].map((number) => `Q-HU-LCS103-PAT-F102-${number}`).join('\n'),
  resource_ids: `${source.assessment}\n${source.teaching}`,
  module_subject: 'HU-LCS-103 > Pathology > Bone Diseases > Bone Tumours',
  university_notes: 'hu: Restricted to the direct Family-102 assessment deck and Family-64 local teaching support.',
  annotations: specs.map((spec) => `### definition_of · ${spec.id}\nQuote: ${spec.claim}\nBlock: body`).join('\n\n'),
  article_source_ids: `${source.assessment}\n${source.teaching}`,
  claim_ids: specs.map((spec) => `CLM-HULCS103-F102-${spec.code}-Q12-17-01`).join('\n'),
  span_ids: specs.map((spec) => `SPN-HULCS103-F102-${spec.code}-Q12-17-01`).join('\n'),
  callout_evidence: specs.map((spec) => `### ${spec.claim}\nClaims: CLM-HULCS103-F102-${spec.code}-Q12-17-01\nCitations: CIT-HULCS103-F102-${spec.code}-Q12-17-01\nSpan: SPN-HULCS103-F102-${spec.code}-Q12-17-01`).join('\n\n'),
  evidence_basis: 'Family-102 supplies exact assessment wording and printed keys. Family-64 supplies local teaching support for Ewing, giant-cell tumour and Paget-associated secondary osteosarcoma; neither source independently verifies the claims.',
  notes: 'Q12 and Q15 remain source-risk Draft occurrences. Family-101 Q12/Q20 conflict holds remain unchanged and unimported. The six Family-102 written case prompts are deferred.',
  field_notes: 'arabicTitle: Blank pending reviewed terminology.\nnanotopicId: No reviewed nanotopic exists below SYS-MSK.\nmedia: No media is required.\npublishedSummary: Blank because this remains Draft.\npublishedSections: Blank because this remains Draft.\nlastReviewed: No named medical review completed.\nreviewDue: Set after first named review.',
}]

const claims = specs.map((spec) => ({
  id: `CLM-HULCS103-F102-${spec.code}-Q12-17-01`,
  concept_id: spec.id,
  subject: spec.micro,
  predicate: 'is presented in the local LCS source set as',
  object: spec.definition,
  display_text: spec.claim,
  risk_class: 'foundational_stable',
  verification_status: 'needs_evidence',
  conflict_status: spec.code === 'EWING' || spec.code === 'GIANT' ? 'source_risk_not_adjudicated' : 'none',
  confidence: '0.84',
  freshness: 'stable_local_curriculum_fact',
  time_sensitive: 'no',
  qualifiers: 'polarity: affirmative\nauthority: local Helwan curriculum evidence, not independent verification\nassessment boundary: Family-102 Q12–Q17',
}))

const citations = specs.map((spec) => ({
  id: `CIT-HULCS103-F102-${spec.code}-Q12-17-01`,
  claim_id: `CLM-HULCS103-F102-${spec.code}-Q12-17-01`,
  resource_id: spec.citation,
  evidence_role: spec.citation === source.assessment ? 'direct_assessment_support' : 'local_curriculum_support',
  locator_type: 'page',
  locator_page: spec.page,
  locator_section: spec.code === 'MYELOMA' ? 'Family-102 Q16' : 'Bone diseases and tumours',
  locator_detail: spec.citation === source.assessment ? 'Governed Family-102 physical p3, exact printed occurrence and key.' : `Governed Family-64 physical p${spec.page} teaching composition.`,
  support_span: spec.support,
  context_note: 'Local source support for a Draft record; not independent medical verification.',
  confidence: '0.84',
  counts_as_claim_evidence: 'no',
}))

const spans = specs.map((spec) => ({
  id: `SPN-HULCS103-F102-${spec.code}-Q12-17-01`,
  article_id: articleId,
  section_id: 'art-hu-lcs103-pat-f102-selected-bone-tumours-source-bound-statements',
  text: spec.claim,
  claim_ids: `CLM-HULCS103-F102-${spec.code}-Q12-17-01`,
  citation_ids: `CIT-HULCS103-F102-${spec.code}-Q12-17-01`,
}))

const rowSpecs = [
  [12, 'EWING', 'B', 'Ewing sarcoma is not characterized by:', ['Highly aggressive tumor', 'The most common sarcoma of bone in children', 'Has genetic aetiology', 'May arise from long or flat bones', 'May spread outside bone']],
  [13, 'EWING', 'C', 'Regarding Ewing sarcoma, Which is NOT true:', ['Destructive infiltrative tumor', 'Onion skin appearance in x ray', 'Dense stroma by microscopic examination', 'Common to arise from femur', 'May have neural differentiation']],
  [14, 'EWING', 'E', 'The presence of Homer Wright rosettes in Ewing sarcoma indicates :', ['Tumor is benign', 'Tumor is locally malignant', 'Tumor spread to lung', 'Tumor arises from metaphysis', 'Tumor has neural differentiation']],
  [15, 'GIANT', 'A', 'Giant cell tumor of bone is characterized by all of the following except:', ['Highly aggressive malignant tumor', 'Arises from epiphysis of long bones', 'May spread to lung', 'Presence of giant cells with osteoclastic activity', 'Leads to formation of lytic lesions of bones']],
  [16, 'MYELOMA', 'B', 'Neoplastic proliferation of plasma cells with appearance of bone lytic lesions is present in:', ['Ewing sarcoma', 'Multiple myeloma', 'Osteoclastoma', 'All of the above', 'None of the above']],
  [17, 'OSTEOSARCOMA', 'D', "Patient with Paget's disease of bone is vulnerable to the development of:", ['Osteomyelitis', 'Osteoblastoma', 'Fibrous dysplasia', 'Osteosarcoma', 'Ewing sarcoma']],
]
const byCode = Object.fromEntries(specs.map((spec) => [spec.code, spec]))
const commonQuestion = {
  subject: 'msk', status: 'Draft', owner: 'Helwan Year-1 authoring lane', vignette: '', format: 'single best answer', written_parts: '', matching_options: '', matching_prompts: '', correct_answers: '', labeling_image: '', labeling_alt: '', labeling_points: '', completion_text: '', derived_from: '', topic: 'Musculoskeletal system', subtopic: 'Bone tumours', difficulty: 'Easy', question_type: 'Pathology', module: 'HU-LCS-103', module_subject: 'HU-LCS-103 > Pathology > Bone Diseases > Bone Tumours', clinical_relevance: '0.78', academic_relevance: '0.98', cognitive_effort_score: '0.38', exam_weight_by_year: 'HU_Y1=0.86', question_only_for: 'HU_Y1', concept_ids: '', years: 'HU_Y1', universities: 'hu', cognitive_effort: 'Low', setting: 'Academic', reasoning_level: '1', inferred_difficulty: '68', exam_relevance: '9', contextual_concept_ids: '', media_recommendations: '', attachments: '', attached_image: '', estimated_seconds: '60', randomise_answers: 'yes',
}

const questions = rowSpecs.map(([number, code, key, stem, options]) => {
  const spec = byCode[code]
  const fields = { id: `Q-HU-LCS103-PAT-F102-${number}`, title: stem, ...commonQuestion, question: stem, correct_answer: key }
  options.forEach((option, index) => {
    const letter = String.fromCharCode(65 + index)
    fields[`answer_${letter.toLowerCase()}`] = option
    fields[`explanation_${letter.toLowerCase()}`] = letter === key
      ? `The Family-102 deck prints ${key} as the right-column key for this exact occurrence, so “${option}” is retained as the source-keyed response. ${spec.claim} The record remains Draft because local assessment and teaching support do not replace independent verification or named Helwan Pathology faculty review.`
      : `The option “${option}” is preserved exactly from Family-102, but the printed right-column key selects ${key} instead. ${spec.claim} No wording or medical repair is introduced, and the record remains Draft pending independent verification and named Helwan Pathology faculty review.`
  })
  fields.answer_f = ''
  fields.explanation_f = ''
  const risk = number === 12
    ? 'Q12 retains printed key B as an explicit source-risk occurrence without medical repair.'
    : number === 15
      ? 'Q15 retains printed key A as an explicit source-risk occurrence without medical repair.'
      : 'No new source-risk flag is introduced for this occurrence.'
  return {
    ...fields,
    main_concept: spec.id,
    library_ids: articleId,
    resource_ids: `${source.assessment}\n${source.teaching}`,
    learning_objective: spec.objective,
    source_citation: `${source.assessment}, physical PDF p3, printed Q${number}: exact source stem/options with right-column printed key ${key}. Teaching support: ${source.teaching}.`,
    author_notes: `Transcribed exactly from governed Family 102 physical p3; wording, capitalisation, punctuation, option order and printed key are preserved. ${risk} The six keyed written case prompts remain deferred to a separate marks/schema-aware slice. Family-101 Q12 and Q20 remain held and unimported. No medical adjudication is inferred. No practical or media record is inferred.`,
  }
})

if (questions.length !== 6 || questions.map((row) => row.correct_answer).join('') !== 'BCEABD') throw new Error('Family-102 Q12–Q17 count or key mismatch')
if (concepts.length !== 4 || article.length !== 1 || claims.length !== 4 || citations.length !== 4 || spans.length !== 4) throw new Error('Family-102 Q12–Q17 dependency count mismatch')
await Promise.all(Object.values(paths).map((path) => mkdir(dirname(path), { recursive: true })))
await Promise.all([
  writeFile(paths.concepts, concepts.map(item).join(divider), 'utf8'),
  writeFile(paths.articles, article.map(item).join(divider), 'utf8'),
  writeFile(paths.claims, claims.map(item).join(divider), 'utf8'),
  writeFile(paths.citations, citations.map(item).join(divider), 'utf8'),
  writeFile(paths.spans, spans.map(item).join(divider), 'utf8'),
  writeFile(paths.questions, questions.map(item).join(divider), 'utf8'),
])
console.log(JSON.stringify({ files: paths, counts: { concepts: 4, newConcepts: 2, conceptUpdates: 2, articles: 1, questions: 6, claims: 4, citations: 4, spans: 4 }, keys: questions.map((row) => row.correct_answer).join(''), sourceRisks: ['Q12=B', 'Q15=A'], priorHoldsUntouched: ['Family101-Q12=B', 'Family101-Q20=C'], newHolds: [], deferredWrittenCases: 6, practical: 0, media: 0 }, null, 2))
