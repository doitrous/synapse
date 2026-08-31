#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../..')
const base = resolve(root, 'docs/Helwan-Source-Imports')
const paths = {
  sources: resolve(base, 'evidence/HU-LCS-103-family101-q13-21-pott-sinus-sources.md'),
  concepts: resolve(base, 'concept/HU-LCS-103-family101-q13-21-pott-sinus-concepts.md'),
  articles: resolve(base, 'article/HU-LCS-103-family101-q13-21-pott-sinus-article.md'),
  claims: resolve(base, 'evidence/HU-LCS-103-family101-q13-21-pott-sinus-claims.md'),
  citations: resolve(base, 'evidence/HU-LCS-103-family101-q13-21-pott-sinus-citations.md'),
  spans: resolve(base, 'evidence/HU-LCS-103-family101-q13-21-pott-sinus-spans.md'),
  questions: resolve(base, 'question/HU-LCS-103-family101-q13-21-closure-mcq.md'),
}
const divider = '\n\n---\n\n'
const item = (fields) => `# Item\n\n${Object.entries(fields).map(([key, value]) => `## ${key}\n${value ?? ''}`).join('\n\n')}\n`

const source = {
  assessment: 'src_cf37932d10b47ec0a26f',
  teaching: 'src_f2e15ef3167cabd93105',
}
const concept = {
  pott: 'CON-MSK-3506288FEBB87F',
  sinus: 'CON-MSK-147B410CE730C2',
  chronic: 'CON-MSK-986759075D3736',
  complications: 'CON-MSK-F10CBA8F31CD29',
}
const article = {
  new: 'ART-HU-LCS103-PAT-F101-POTT-SINUS-COMPLICATIONS',
  chronic: 'ART-HU-LCS103-PAT-F101-CHRONIC-OSTEOMYELITIS',
}

const sources = [{
  id: source.teaching,
  title: 'LCS-103 Approach to Bone Diseases 2 — Infective Bone Disease',
  institution: 'Faculty of Medicine, Helwan University',
  processing_status: 'ocr_required',
  collection_id: 'hu-y1',
  source_relative_path: 'Year 1/LCS 103/All Subjects/Notes and Summaries/103 LCS Approach to Bone diseases 2  _240716_163251.pdf',
  source_uri: '',
  media_type: 'application/pdf',
  languages: 'en',
  publication_date: '2024-07-16',
  accessed_at: '',
  page_count: '18',
  sha256: 'f2e15ef3167cabd93105b49a0eeafba61dea3a8e620f548e1bb5563cc62521bc',
  rights: 'Local Helwan teaching material held for internal authoring only. No page image is redistributed.',
  qualification: 'Tier-6 in-module Helwan teaching deck naming Dr Hebat Allah Amin. Physical page 11 describes acute and chronic pyogenic complications, including chronic disease predisposition to squamous carcinoma; pages 12–15 cover vertebral tuberculosis, Pott disease and kyphotic change. It is teaching support, not independent medical verification or an assessment key.',
  confidence: '0.86',
  is_assessment: 'no',
}]

const conceptSpecs = [
  {
    id: concept.pott,
    key: 'osteomyelitis.tuberculous.pott-disease-vertebral-kyphosis',
    label: "Pott's disease is tuberculous osteomyelitis of the spine and may produce vertebral destruction with kyphotic deformity",
    aliases: "Pott disease\nTuberculous spondylitis\nVertebral tuberculosis",
    definition: "Within the governed local LCS source set, Pott's disease is tuberculous infection of the vertebral column. The direct question deck keys tuberculosis as its cause and keys a statement linking vertebral-body necrosis to kyphosis and scoliosis.",
    objective: "Identify tuberculosis as the source-keyed cause of Pott's disease and recognise the exact keyed vertebral-deformity statement without broadening it into an independently verified clinical rule.",
    pitfalls: 'Do not substitute pyogenic organisms, syphilis or Paget disease for the printed tuberculosis key. Preserve the source spelling Liquifaction in Q15 rather than silently editing the option.',
    type: 'disease_entity',
    micro: 'Vertebral tuberculosis and Pott disease',
    signal: 'Family-101 Q14 key D and Q15 key E; Family-150 pages 12–15 teaching support.',
    claim: 'CLM-HULCS103-F101-POTT-01',
    original: "[Family-101 Q14] Pott's disease of the spine is caused by; printed key D, Tuberculosis.\n[Family-101 Q15] The printed key E selects the vertebral-body liquifaction statement leading to kyphosis and scoliosis.",
  },
  {
    id: concept.sinus,
    key: 'osteomyelitis.chronic.sinus-tract-squamous-transformation',
    label: 'A chronic osteomyelitis sinus tract carries a source-keyed risk of squamous cell carcinoma',
    aliases: 'Chronic osteomyelitis sinus malignancy\nSinus tract squamous carcinoma\nMarjolin-type transformation in osteomyelitis',
    definition: 'The direct Family-101 deck identifies squamous cell carcinoma as the keyed malignant risk of a chronic osteomyelitis sinus tract. The local Family-150 teaching deck independently repeats chronic-disease predisposition to squamous carcinoma within its complications section.',
    objective: 'Select the exact source-keyed epithelial malignancy associated with a chronic osteomyelitis sinus tract while keeping the record Draft pending independent verification.',
    pitfalls: 'Do not replace the printed option with adenocarcinoma, melanoma or basal cell carcinoma. Fibrinoid necrosis is not a carcinoma and remains an exact distractor.',
    type: 'complication_pattern',
    micro: 'Chronic sinus-tract malignant transformation',
    signal: 'Family-101 Q16 key D; Family-150 page 11 teaching support.',
    claim: 'CLM-HULCS103-F101-SINUS-SCC-01',
    original: '[Family-101 Q16] Sinus tract of Chronic osteomyelitis is liable for; printed key D, Squamous cell carcinoma.',
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
  subtopic: 'Osteomyelitis',
  nanotopic: '',
  modules: 'HU-LCS-103',
  module_subject: 'HU-LCS-103 > Pathology > Bone Diseases > Osteomyelitis',
  universities: 'hu',
  learner_years: '1',
  approved_file_resource_ids: '[clear]',
  approved_video_resource_ids: '[clear]',
  blueprint_weight: '0.82',
  exam_weight_by_year: 'HU_Y1=0.82',
  clinical_relevance: '0.78',
  academic_relevance: '0.97',
  weight_confidence: '0.57',
  confidence: '0.84',
  resource_occurrence_ids: '[clear]',
  source_candidate_ids: '[clear]',
  merge_ids: '[clear]',
  rejected_merge_candidate_ids: 'The governed Family-101 search found no substantive live or pending record covering this complete assessment objective.',
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
  concept_type: spec.type,
  microtopic: spec.micro,
  article_ids: article.new,
  related_article_ids: article.chronic,
  resource_ids: `${source.assessment}\n${source.teaching}`,
  exam_signal: spec.signal,
  atomic_claim_ids: spec.claim,
  original_wording: spec.original,
  conflicts: '[clear]',
  uncertainty: '[clear]',
  field_notes: `microtopicId: The reviewed taxonomy stops at SYS-MSK for this local Pathology overlay; the named microtopic is retained as prose.
nanotopicId: No reviewed nanotopic ID exists beneath the assigned canonical node.
approvedFileResourceIds: No source file is rights-cleared for student redistribution.
approvedVideoResourceIds: No video is assigned to this concept.
resourceOccurrenceIds: Hand-authored from governed Family-101 assessment and Family-150 teaching evidence; no extraction-occurrence record exists.
sourceCandidateIds: Eight governed exact searches completed before minting and returned no substantive live or pending owner.
mergeIds: No concept was merged into this new record.
lastReviewed: New record; no faculty review has occurred.
reviewDue: Set after the first faculty review.
exclusionReason: Not excluded; held at needs_evidence.
arabicLabel: Blank pending independently verified Arabic terminology review.
arabicAliases: Blank pending independently verified Arabic terminology review.`,
}))

const articleSections = `### Definition
Within this source set, Pott's disease names tuberculous osteomyelitis of the spine. The direct assessment deck prints tuberculosis as the answer to its causal item, while the companion teaching deck places Pott disease within vertebral mycobacterial osteomyelitis.

The direct Family-101 deck prints squamous cell carcinoma as the liable malignancy of a chronic osteomyelitis sinus tract. Family-150 repeats chronic-disease predisposition to squamous carcinoma in its complications teaching.

### Mechanism
The local teaching sequence describes vertebral tuberculosis as a destructive infection involving the spine. Family-101 then prints a statement in which liquifaction of necrotic vertebral bodies leads to kyphosis and scoliosis; that wording is preserved as a local keyed occurrence rather than silently modernised.

A chronic draining sinus represents persistent disease at a skin-connected tract. Long duration and repeated injury form the context for the source-keyed squamous transformation, but this Draft article does not provide a diagnostic or management protocol.

### Key determinants
For Pott disease, the assessment decision is organism class: tuberculosis is printed, whereas Staph, Strept, syphilis and unknown cause are distractors. The next item retains the source's exact spelling and keys the vertebral deformity statement.

For the sinus-tract item, distinguish epithelial malignancies from unrelated options. Squamous cell carcinoma is the printed key; adenocarcinoma, malignant melanoma, basal cell carcinoma and fibrinoid necrosis remain exact distractors.

### Clinical significance
Both objectives describe complications of persistent bone infection. They remain useful for the local first-year assessment frame, but independent clinical references and named medical review are required before student publication.

### Common misconceptions
Pott disease is not Paget disease in this source set. A chronic sinus tract is not itself a sequestrum or involucrum, and the printed carcinoma answer must not be extended to every short-lived draining lesion.`

const articles = [{
  id: article.new,
  title: 'Pott disease and chronic osteomyelitis sinus-tract transformation',
  aliases: 'Vertebral tuberculosis and Pott disease\nChronic osteomyelitis sinus carcinoma\nPersistent bone infection complications',
  arabic_title: '',
  subject: 'msk',
  topic: 'Musculoskeletal system',
  subtopic: 'Bone diseases',
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
  conflicts: '[clear]',
  microtopic: 'Persistent and tuberculous osteomyelitis complications',
  reading_time: '7',
  summary: "The remaining Family-101 assessment items connect Pott's disease with vertebral tuberculosis and identify squamous cell carcinoma as the keyed malignancy associated with a chronic osteomyelitis sinus tract. The exact printed answers are supported by the local Family-150 teaching deck but remain Draft pending independent verification.",
  sections: articleSections,
  hold_these: "Pott's disease is tuberculous osteomyelitis of the spine.\nThe exact Q15 vertebral-deformity wording and spelling are preserved.\nA chronic osteomyelitis sinus tract carries a source-keyed squamous carcinoma risk.\nQ12 and Q20 remain held because their chronic-cell keys conflict.",
  lose_the_mark: 'Replacing Tuberculosis with a pyogenic organism in Q14.\nSilently correcting the printed Q15 option wording.\nSelecting a non-squamous tumour for Q16.\nGuessing a resolution for the Q12/Q20 source conflict.',
  related_concepts: `${concept.pott}\n${concept.sinus}`,
  related_articles: `${article.chronic}: reviews sequestrum, involucrum, cloaca and the source-keyed acute complication set`,
  question_ids: 'Q-HU-LCS103-PAT-F101-14\nQ-HU-LCS103-PAT-F101-15\nQ-HU-LCS103-PAT-F101-16',
  resource_ids: `${source.assessment}\n${source.teaching}`,
  module_subject: 'HU-LCS-103 > Pathology > Bone Diseases > Osteomyelitis > Persistent and Tuberculous Complications',
  university_notes: 'hu: Restricted to the direct Family-101 assessment deck and the Family-150 in-module teaching deck.',
  annotations: `### definition_of · ${concept.pott}
Quote: Within this source set, Pott's disease names tuberculous osteomyelitis of the spine.
Block: body

### definition_of · ${concept.sinus}
Quote: The direct Family-101 deck prints squamous cell carcinoma as the liable malignancy of a chronic osteomyelitis sinus tract.
Block: body`,
  article_source_ids: `${source.assessment}\n${source.teaching}`,
  claim_ids: 'CLM-HULCS103-F101-POTT-01\nCLM-HULCS103-F101-SINUS-SCC-01',
  span_ids: 'SPN-HULCS103-F101-POTT-01\nSPN-HULCS103-F101-SINUS-SCC-01',
  callout_evidence: `### Pott's disease is tuberculous osteomyelitis of the spine.
Claims: CLM-HULCS103-F101-POTT-01
Citations: CIT-HULCS103-F101-POTT-01
Span: SPN-HULCS103-F101-POTT-01

### A chronic osteomyelitis sinus tract carries a source-keyed squamous carcinoma risk.
Claims: CLM-HULCS103-F101-SINUS-SCC-01
Citations: CIT-HULCS103-F101-SINUS-SCC-01
Span: SPN-HULCS103-F101-SINUS-SCC-01`,
  evidence_basis: 'Family-101 supplies exact Q14–Q16 wording and printed keys. Family-150 pages 11–15 supply local teaching support; neither source is independent medical verification.',
  notes: 'Q12 and Q20 remain deliberately unimported because their near-verbatim chronic-inflammatory-cell prompts print conflicting keys B and C. No medical adjudication is inferred.',
  field_notes: `arabicTitle: Blank because no reviewed Arabic title was present.
nanotopicId: No reviewed nanotopic exists below the assigned node.
media: No media is required by this text-only slice.
publishedSummary: Blank because this remains Draft.
publishedSections: Blank because this remains Draft.
lastReviewed: New record; no named medical reviewer has completed review.
reviewDue: Set after first named medical review.`,
}]

const claimSpecs = [
  {
    code: 'POTT', conceptId: concept.pott,
    display: "Within this source set, Pott's disease names tuberculous osteomyelitis of the spine.",
    subject: "Pott's disease", predicate: 'is presented as', object: 'tuberculous osteomyelitis of the spine in the local LCS source set',
    page: '12-15', section: 'Vertebral tuberculosis, Pott disease and deformity',
    support: 'Pott disease is presented with vertebral tuberculosis, disc involvement and kyphotic deformity.',
    sectionId: 'art-hu-lcs103-pat-f101-pott-sinus-complications-definition',
  },
  {
    code: 'SINUS-SCC', conceptId: concept.sinus,
    display: 'The direct Family-101 deck prints squamous cell carcinoma as the liable malignancy of a chronic osteomyelitis sinus tract.',
    subject: 'A chronic osteomyelitis sinus tract', predicate: 'is presented as carrying a risk of', object: 'squamous cell carcinoma in the local LCS source set',
    page: '11', section: 'Acute and chronic complications',
    support: 'The teaching slide states that chronic osteomyelitis predisposes to squamous carcinoma.',
    sectionId: 'art-hu-lcs103-pat-f101-pott-sinus-complications-definition',
  },
]

const claims = claimSpecs.map((spec) => ({
  id: `CLM-HULCS103-F101-${spec.code}-01`,
  concept_id: spec.conceptId,
  subject: spec.subject,
  predicate: spec.predicate,
  object: spec.object,
  display_text: spec.display,
  risk_class: 'foundational_stable',
  verification_status: 'needs_evidence',
  conflict_status: 'none',
  confidence: '0.83',
  freshness: 'stable_local_curriculum_fact',
  time_sensitive: 'no',
  qualifiers: 'polarity: affirmative\nauthority: local Helwan curriculum teaching support, not independent verification\nassessment boundary: Family-101 Q13–Q19 and Q21 closure slice',
}))

const citations = claimSpecs.map((spec) => ({
  id: `CIT-HULCS103-F101-${spec.code}-01`,
  claim_id: `CLM-HULCS103-F101-${spec.code}-01`,
  resource_id: source.teaching,
  evidence_role: 'local_curriculum_support',
  locator_type: 'page',
  locator_page: spec.page,
  locator_section: spec.section,
  locator_detail: 'Governed Family-150 triage and visually reviewed teaching slide sequence.',
  support_span: spec.support,
  context_note: 'This is local teaching support for a Draft record and does not independently verify the medical claim.',
  confidence: '0.83',
  counts_as_claim_evidence: 'no',
}))

const spans = claimSpecs.map((spec) => ({
  id: `SPN-HULCS103-F101-${spec.code}-01`,
  article_id: article.new,
  section_id: spec.sectionId,
  text: spec.display,
  claim_ids: `CLM-HULCS103-F101-${spec.code}-01`,
  citation_ids: `CIT-HULCS103-F101-${spec.code}-01`,
}))

const teaching = {
  chronic: 'A sequestrum is separated necrotic bone, whereas involucrum is the source term for periosteal new-bone formation. These later occurrences repeat the same morphology from altered prompt directions and are retained separately. The local key is assessment evidence and remains Draft pending faculty review.',
  pott: "The direct deck keys tuberculosis for Pott's disease and keys its vertebral-body liquifaction statement in the next item. The companion Helwan teaching deck treats Pott disease as vertebral tuberculosis and retains a disc-based differential. These statements remain local curriculum evidence rather than an independent clinical guideline.",
  sinus: 'The direct deck keys squamous cell carcinoma for the chronic osteomyelitis sinus tract. The companion teaching deck independently repeats chronic-disease predisposition to squamous carcinoma in its complications section. This source-bound statement remains Draft pending medical review.',
  complications: 'The deck retains toxaemia, septicemia, thrombophlebitis and pathological fracture as source-accepted acute complications and keys primary amyloidosis as the exception. Its repeated exception form also retains septicemia and sequestrum formation while rejecting the older-female demographic statement. These local keys remain Draft and are not treated as a complete epidemiology or complications guideline.',
}

const rowSpecs = [
  [13, 4, 'chronic', 'B', 'A necrotic dead piece of bone in osteomyelitis is called:', ['Involucrum', 'Sequestrum', 'Woven bone', 'Lamellar bone', 'Cancellous bone'], 'Q13 is a near-repeat of Q9 and remains a separate printed occurrence.'],
  [14, 4, 'pott', 'D', "Pott's disease of the spine is caused by:", ['Staph', 'Strept', 'Syphilis', 'Tuberculosis', 'Unknown cause'], 'No within-source repeat is collapsed.'],
  [15, 4, 'pott', 'E', 'In Tuberculous osteomyelitis which is true:', ['Type of acute osteomyelitis', 'Still very common in developed countries.', 'Never follow pulmonary tuberculosis', 'Called paget’s disease of bone', 'Liquifaction of necrotic bones of the vertebral bodies leads to kyphosis and scoliosis'], 'The spelling Liquifaction and the lowercase paget’s form are preserved exactly.'],
  [16, 4, 'sinus', 'D', 'Sinus tract of Chronic osteomyelitis is liable for:', ['Adenocarcinoma', 'Malignant melanoma', 'Basal cell carcinoma', 'Squamous cell carcinoma', 'Fibrinoid necrosis'], 'No within-source repeat is collapsed.'],
  [17, 5, 'complications', 'D', 'All the following are complications of Acute hematogenous osteomyelitis except:', ['Toxaemia', 'Septicemia.', 'Thrombophlebitis', 'Primary amyloidosis.', 'Pathological fractures.'], 'The punctuation attached to options B, D and E is preserved.'],
  [18, 5, 'chronic', 'B', 'Sequestrum in osteomyelitis consists of:-', ['Osseous metaplasia of skeletal muscles', 'Necrotic bone', 'Malignant bone', 'Sinuses from the infection to skin surface', 'Sub-periosteal new bone formation'], 'Q18 repeats Q11 and remains a separate printed occurrence.'],
  [19, 5, 'chronic', 'E', 'Involcurum in osteomyelitis consists of:-', ['Osseous metaplasia of skeletal muscles', 'Necrotic bone', 'Malignant bone', 'Sinuses from the infection to skin surface', 'Sub-periosteal new bone formation'], 'The source spelling Involcurum is preserved exactly.'],
  [21, 5, 'complications', 'D', 'All ofthe followings are true about acute osteomyelitis except:-', ['Is most commonly caused by staphylococcus aureus', 'May be complicated by septicemia', 'May result in the formation of sequestrum', 'More commonly affects females above 6o years old', 'Acute hematogenous osteomyelitis usually affects the knee region'], 'Q21 repeats the Q7 prompt form and remains a separate printed occurrence; ofthe and 6o are preserved exactly.'],
]

const questionMap = {
  chronic: [concept.chronic, article.chronic, 'Distinguish sequestrum from involucrum using the exact source-keyed tissue description.'],
  pott: [concept.pott, article.new, "Identify the source-keyed cause and vertebral-deformity statement for Pott's disease."],
  sinus: [concept.sinus, article.new, 'Identify the source-keyed malignant risk of a chronic osteomyelitis sinus tract.'],
  complications: [concept.complications, article.chronic, 'Identify the printed exception among acute hematogenous osteomyelitis complications or features.'],
}

const commonQuestion = {
  subject: 'msk', status: 'Draft', owner: 'Helwan Year-1 authoring lane', vignette: '', format: 'single best answer', written_parts: '',
  matching_options: '', matching_prompts: '', correct_answers: '', labeling_image: '', labeling_alt: '', labeling_points: '', completion_text: '', derived_from: '',
  topic: 'Musculoskeletal system', subtopic: 'Osteomyelitis', difficulty: 'Easy', question_type: 'Pathology', module: 'HU-LCS-103',
  module_subject: 'HU-LCS-103 > Pathology > Bone Diseases > Osteomyelitis', clinical_relevance: '0.75', academic_relevance: '0.98', cognitive_effort_score: '0.35',
  exam_weight_by_year: 'HU_Y1=0.85', question_only_for: 'HU_Y1', concept_ids: '', years: 'HU_Y1', universities: 'hu', cognitive_effort: 'Low',
  setting: 'Academic', reasoning_level: '1', inferred_difficulty: '72', exam_relevance: '9', contextual_concept_ids: '', media_recommendations: '',
  attachments: '', attached_image: '', estimated_seconds: '60', randomise_answers: 'yes',
}

const questions = rowSpecs.map(([number, page, code, key, stem, options, repeatNote]) => {
  const [conceptId, articleId, objective] = questionMap[code]
  const fields = { id: `Q-HU-LCS103-PAT-F101-${number}`, title: stem, ...commonQuestion, question: stem, correct_answer: key }
  options.forEach((option, index) => {
    const letter = String.fromCharCode(65 + index)
    fields[`answer_${letter.toLowerCase()}`] = option
    fields[`explanation_${letter.toLowerCase()}`] = letter === key
      ? `The direct Family-101 question deck prints ${key} as the answer, so this is the exact source-keyed response. ${teaching[code]} The item remains Draft because neither a local printed key nor its companion teaching deck is independent medical verification.`
      : `This option is retained exactly from the Family-101 deck, but its printed right-column key selects ${key} instead. ${teaching[code]} The option is not rewritten or medically repaired, and the item remains Draft pending named Helwan Pathology faculty review.`
  })
  for (const letter of ['a', 'b', 'c', 'd', 'e', 'f']) {
    if (!Object.hasOwn(fields, `answer_${letter}`)) {
      fields[`answer_${letter}`] = ''
      fields[`explanation_${letter}`] = ''
    }
  }
  return {
    ...fields,
    main_concept: conceptId,
    library_ids: articleId,
    resource_ids: `${source.assessment}\n${source.teaching}`,
    learning_objective: objective,
    source_citation: `${source.assessment}, physical PDF p${page}, printed Q${number}: exact source stem/options with right-column printed key ${key}. Teaching support: ${source.teaching}.`,
    author_notes: `Transcribed exactly from governed Family 101 physical p${page}; spelling, capitalisation, punctuation, option order and printed key are preserved. ${repeatNote} Q12 prints B for Lymphocyte while Q20 prints C for Plasma cell. Both Q12 and Q20 remain held and unimported. No medical adjudication is inferred, and neither conflicting occurrence is used to teach the chronic inflammatory-cell identity. No practical, written, media or mark record is inferred.`,
  }
})

if (questions.length !== 8 || questions.map((row) => row.correct_answer).join('') !== 'BDEDDBED') throw new Error('Family-101 Q13–Q19/Q21 count or key mismatch')
if (concepts.length !== 2 || articles.length !== 1 || claims.length !== 2 || citations.length !== 2 || spans.length !== 2 || sources.length !== 1) throw new Error('Family-101 closure dependency count mismatch')

await Promise.all(Object.values(paths).map((path) => mkdir(dirname(path), { recursive: true })))
await Promise.all([
  writeFile(paths.sources, sources.map(item).join(divider), 'utf8'),
  writeFile(paths.concepts, concepts.map(item).join(divider), 'utf8'),
  writeFile(paths.articles, articles.map(item).join(divider), 'utf8'),
  writeFile(paths.claims, claims.map(item).join(divider), 'utf8'),
  writeFile(paths.citations, citations.map(item).join(divider), 'utf8'),
  writeFile(paths.spans, spans.map(item).join(divider), 'utf8'),
  writeFile(paths.questions, questions.map(item).join(divider), 'utf8'),
])

console.log(JSON.stringify({ files: paths, counts: { sources: 1, concepts: 2, articles: 1, questions: 8, claims: 2, citations: 2, spans: 2 }, keys: questions.map((row) => row.correct_answer).join(''), holds: ['Q12=B', 'Q20=C'], preservedRepeats: ['Q13≈Q9', 'Q18=Q11', 'Q21=Q7'], practical: 0, written: 0, media: 0 }, null, 2))
