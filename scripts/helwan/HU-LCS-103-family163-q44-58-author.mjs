#!/usr/bin/env node

import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../..')
const base = resolve(root, 'docs/Helwan-Source-Imports')
const paths = {
  concepts: resolve(base, 'concept/HU-LCS-103-family163-q44-58-concepts.md'),
  articles: resolve(base, 'article/HU-LCS-103-family163-q44-58-articles.md'),
  claims: resolve(base, 'evidence/HU-LCS-103-family163-q44-58-claims.md'),
  citations: resolve(base, 'evidence/HU-LCS-103-family163-q44-58-citations.md'),
  spans: resolve(base, 'evidence/HU-LCS-103-family163-q44-58-spans.md'),
  questions: resolve(base, 'question/HU-LCS-103-family163-q44-58-mcq.md'),
}
const priorFiles = {
  articles: resolve(base, 'article/HU-LCS-103-family163-q29-43-articles.md'),
  concepts: [
    resolve(base, 'concept/HU-LCS-103-family163-q29-43-concepts.md'),
    resolve(base, 'concept/HU-LCS-103-family163-q15-28-concepts.md'),
    resolve(base, 'concept/HU-LCS-103-family143-q1-13-joint-concepts.md'),
    resolve(root, 'docs/import-ready/concept/101-ISK-mcq-concepts.md'),
  ],
}
const divider = '\n\n---\n\n'
const item = (fields) => `# Item\n\n${Object.entries(fields).map(([key, value]) => `## ${key}\n${value ?? ''}`).join('\n\n')}\n`
const parseItems = (text) => text.split(/\n\n---\n\n/).filter(Boolean).map((block) => Object.fromEntries(
  [...block.matchAll(/^## ([^\n]+)\n([\s\S]*?)(?=\n(?:\n)?## |(?![\s\S]))/gm)].map((match) => [match[1], match[2].trim()]),
))
const uniqueLines = (...values) => [...new Set(values.flat(Infinity).flatMap((value) => String(value ?? '').split('\n')).filter(Boolean))].join('\n')
const appendText = (baseText, addition) => `${baseText}\n\n${addition}`
const source = {
  assessment: 'src_79b5752c4d6f23e6dafc',
  boneTumour: 'src_3328fde7f743cd67dc9f',
  softTissue: 'src_237f83bb42bf143fefdf',
  joint: 'src_6995e894c8b7f13c8809',
  anatomy: 'src_aa8bb730fbccdbf7d6e0',
  bone: 'src_718e08dfb6d19109dabf',
}
const conceptIds = {
  myeloma: 'CON-FND-2B59FDDFCEDFA6',
  gout: 'CON-REN-B9E0531973510E',
  hypercalcemia: 'CON-MSK-CCA1BD5332E366',
  chondrosarcoma: 'CON-MSK-DDF3A03342A247',
  carpal: 'CON-MSK-9B52018C4649BD',
  rheumatoid: 'CON-MSK-CFE4B805DB79CC',
  osteoarthritis: 'CON-MSK-5AD256E28E4183',
  hemangioma: 'CON-MSK-5968997CD38FBA',
  cushing: 'CON-MSK-E2CD193CEF4060',
}
const articleIds = {
  tumour: 'ART-HU-LCS103-PAT-F163-TUMOUR-PATTERNS',
  joint: 'ART-HU-LCS103-MSK-F163-GOUT-OA-CARPAL-ASSOCIATIONS',
  systemic: 'ART-HU-LCS103-MSK-F163-SYSTEMIC-BONE-DISEASES',
}

const currentArticles = new Map(parseItems(await readFile(priorFiles.articles, 'utf8')).map((row) => [row.id, row]))
const currentConcepts = new Map()
for (const path of priorFiles.concepts.toReversed()) {
  for (const row of parseItems(await readFile(path, 'utf8'))) currentConcepts.set(row.id, row)
}
const requireCurrent = (map, id) => {
  const row = map.get(id)
  if (!row) throw new Error(`Missing governed current row ${id}`)
  return structuredClone(row)
}

const claimSpecs = [
  { code: 'MYELOMA-Q44-47-49', concept: conceptIds.myeloma, article: articleIds.tumour, page: '20-22', section: 'Family-163 Q44, Q47 and Q49', direct: 'Q44, Q47 and Q49 each print A, A and B respectively in both answer layers.', teaching: source.boneTumour, teachingPage: '27-43', teachingSection: 'Bone tumours', teachingSpan: 'The Helwan bone-tumour lecture supplies bounded plasma-cell-neoplasm and lytic-lesion context, but it does not independently reproduce all three vignettes.', text: 'Family-163 preserves three distinct myeloma occurrences: Q44 keys Bence-Jones proteins, Q47 keys Multiple myeloma, and Q49 keys Lytic bone lesions.', object: 'three distinct source-keyed myeloma diagnostic, urine-protein and radiology objectives' },
  { code: 'GOUT-Q48', concept: conceptIds.gout, article: articleIds.joint, page: '21', section: 'Family-163 Q48', direct: 'Q48 prints C, Hyperuricemia, in both answer layers.', teaching: source.joint, teachingPage: '15', teachingSection: 'Gout', teachingSpan: 'The Helwan joint lecture supports podagra, needle-shaped crystal and hyperuricaemia context.', text: 'Family-163 Q48 keys Hyperuricemia for the first-metatarsophalangeal mass containing long slender needle-shaped crystals.', object: 'Hyperuricemia as the source-keyed laboratory finding for the printed gouty mass' },
  { code: 'HYPERCALCEMIA-Q50', concept: conceptIds.hypercalcemia, article: articleIds.systemic, page: '22', section: 'Family-163 Q50', direct: 'Q50 prints A, Bisphosphonates, in both answer layers.', teaching: source.boneTumour, teachingPage: '27-43', teachingSection: 'Bone tumours', teachingSpan: 'The Helwan bone-tumour lecture supplies bounded myeloma, lytic-lesion and hypercalcaemia context but does not independently support the keyed post-hydration bisphosphonate sequence.', text: 'Family-163 Q50 keys Bisphosphonates after proper hydration for the printed multiple-myeloma hypercalcaemia occurrence; the direct assessment source alone owns that exact treatment relation.', object: 'Bisphosphonates after hydration as the source-keyed response for the printed hypercalcaemia occurrence' },
  { code: 'CHONDROSARCOMA-Q52', concept: conceptIds.chondrosarcoma, article: articleIds.tumour, page: '23', section: 'Family-163 Q52', direct: 'Q52 prints D, Pelvic bones, in both answer layers.', teaching: source.boneTumour, teachingPage: '27-43', teachingSection: 'Bone tumours', teachingSpan: 'The Helwan bone-tumour lecture supports the chondrosarcoma pattern and axial-pelvic distribution context.', text: 'Family-163 Q52 keys Pelvic bones as the most common site for the printed chondrosarcoma pattern.', object: 'Pelvic bones as the source-keyed common site for the printed chondrosarcoma pattern' },
  { code: 'CARPAL-Q53', concept: conceptIds.carpal, article: articleIds.joint, page: '23-24', section: 'Family-163 Q53', direct: 'Q53 prints C, Median nerve compression, in both answer layers.', teaching: source.anatomy, teachingPage: '1-50', teachingSection: 'Governed Helwan anatomy assessment context', teachingSpan: 'The governed Helwan anatomy assessment source supports median-nerve and carpal-tunnel anatomy context; it does not repair the printed radial-aspect Tinel wording.', text: 'Family-163 Q53 keys Median nerve compression for the nocturnal thumb-and-index paresthesia occurrence while preserving the source phrase tapping over the radial aspect of the wrist.', object: 'Median nerve compression as the printed etiology despite the literal radial-aspect Tinel wording' },
  { code: 'RA-Q54', concept: conceptIds.rheumatoid, article: articleIds.joint, page: '24', section: 'Family-163 Q54', direct: 'Q54 prints D, Rheumatoid arthritis, in both answer layers.', teaching: source.joint, teachingPage: '1-15', teachingSection: 'Rheumatoid arthritis', teachingSpan: 'The Helwan joint lecture supports inflammatory polyarthritis, deformity and disease-modifying therapy context.', text: 'Family-163 Q54 keys Rheumatoid arthritis for remitting and relapsing hand-and-foot pain with swan-neck deformities and ulnar deviation.', object: 'Rheumatoid arthritis as the source-keyed diagnosis for the printed deformity and treatment pattern' },
  { code: 'OA-Q56', concept: conceptIds.osteoarthritis, article: articleIds.joint, page: '25', section: 'Family-163 Q56', direct: 'Q56 prints D, Osteoarthritis, in both answer layers.', teaching: source.joint, teachingPage: '7', teachingSection: 'Osteoarthritis', teachingSpan: 'The Helwan joint lecture supports use-related pain, Heberden nodes and osteophyte context.', text: 'Family-163 Q56 keys Osteoarthritis for use-related knee pain, Heberden’s nodes and prominent knee osteophytes.', object: 'Osteoarthritis as the source-keyed diagnosis for the printed use-related pain pattern' },
  { code: 'HEMANGIOMA-Q57', concept: conceptIds.hemangioma, article: articleIds.tumour, page: '25', section: 'Family-163 Q57', direct: 'Q57 prints B, Hemangioma, in both answer layers.', teaching: source.softTissue, teachingPage: '1-20', teachingSection: 'Vascular tumours', teachingSpan: 'The Helwan soft-tissue lecture supplies bounded vascular-tumour morphology; the exact postnatal growth-and-regression course remains assessment-source-bound.', text: 'Family-163 Q57 keys Hemangioma for a postnatal purple upper-lip swelling that grows, bleeds easily and later regresses; that exact clinical course remains assessment-source-bound.', object: 'Hemangioma as the source-keyed diagnosis for the exact postnatal growth-and-regression course' },
  { code: 'CUSHING-Q58', concept: conceptIds.cushing, article: articleIds.systemic, page: '26', section: 'Family-163 Q58', direct: 'Q58 prints B, Cortisol of 75 microgm/dL, in both answer layers.', teaching: source.bone, teachingPage: '15-20', teachingSection: 'Osteoporosis', teachingSpan: 'The Helwan bone-disease summary supplies bounded loss-of-bone-mass and fracture-susceptibility context but does not independently support the keyed cortisol value or endogenous association.', text: 'Family-163 Q58 keys Cortisol of 75 microgm/dL for progressive lumbar bone loss with truncal fat distribution and hypertension; the direct assessment source alone owns that exact value association.', object: 'the printed cortisol value in the progressive osteoporosis and Cushing-pattern occurrence' },
]
const claimsByArticle = (id) => claimSpecs.filter((claim) => claim.article === id)
const extensionText = (id) => claimsByArticle(id).map((claim) => claim.text).join('\n')

const newConceptCommon = {
  arabic_label: '', arabic_aliases: '', status: 'under review', support_mode: 'direct_statement', subject: 'msk', primary_node_id: 'SYS-MSK', secondary_node_ids: 'DIS-PAT-T03', topic: 'Musculoskeletal system', subtopic: 'Bone and joint disorders', nanotopic: '', modules: 'HU-LCS-103', module_subject: 'HU-LCS-103 > Integrated Musculoskeletal Assessment', universities: 'hu', learner_years: '1', approved_file_resource_ids: '[clear]', approved_video_resource_ids: '[clear]', blueprint_weight: '0.84', exam_weight_by_year: 'HU_Y1=0.84', clinical_relevance: '0.82', academic_relevance: '0.98', weight_confidence: '0.82', confidence: '0.82', resource_occurrence_ids: '[clear]', source_candidate_ids: '[clear]', merge_ids: '[clear]', rejected_merge_candidate_ids: '[clear]', evidence_gaps: 'Independent medical verification and named Helwan faculty review are required before publication.', owner: 'Helwan Year-1 authoring lane', reviewer: 'Medical team, Helwan faculty', final_publisher: 'Admin team', last_reviewed: '', review_due: '', publication_status: 'needs_evidence', editorial_review_status: 'drafted_not_reviewed', exclusion_reason: '', conflicts: '[clear]', field_notes: 'arabicLabel: Blank pending named Arabic review.\nmicrotopicId: No governed microtopic ID exists for this exact assessment scope.\nnanotopicId: No reviewed nanotopic.\napprovedFileResourceIds: No source file is rights-cleared for redistribution.\napprovedVideoResourceIds: No video is required.\nresourceOccurrenceIds: This author-written concept has no pipeline-extracted resource occurrence.\nsourceCandidateIds: Four-query rival search found no exact governed source candidate for this assessment scope.\nlastReviewed: Draft record; no named review has occurred.\nreviewDue: Set after the first named review.',
}
const newSpecs = [
  { id: conceptIds.hypercalcemia, canonical_key: 'severe-hypercalcemia-sequential-saline-bisphosphonate-management', label: 'Severe hypercalcaemia is managed sequentially with saline hydration and bisphosphonate therapy', aliases: 'Hypercalcaemia management sequence\nSaline then bisphosphonate\nMyeloma hypercalcaemia', definition: 'Family-163 Q50 prints Bisphosphonates after proper hydration for the hypercalcaemia occurrence. The source also prints an internal tension between “asymptomatic” and severe fatigue, appetite loss and weight loss. The Helwan bone-tumour source supplies only bounded myeloma and hypercalcaemia context; the direct assessment alone owns the keyed treatment sequence.', explicit_objective: 'Identify the printed post-hydration bisphosphonate response without repairing the vignette.', pitfalls: 'Do not erase the asymptomatic/symptomatic contradiction or change the later pronoun she. Do not treat this Draft assessment record as clinical management guidance.', concept_type: 'management sequence', microtopic: 'Hypercalcaemia management', article: articleIds.systemic, resources: [source.assessment, source.boneTumour], claim: 'HYPERCALCEMIA-Q50', exam: 'Family-163 Q50 prints A in both answer layers.', uncertainty: 'The exact “immediate” sequencing is assessment-bound pending independent verification; local teaching does not independently support it.' },
  { id: conceptIds.hemangioma, canonical_key: 'infantile-hemangioma-clinical-course', label: 'Infantile hemangioma may appear after birth, enlarge, bleed and later regress', aliases: 'Infantile hemangioma clinical course\nPostnatal vascular swelling\nRegressing hemangioma', definition: 'Family-163 Q57 prints Hemangioma for the purple upper-lip swelling that was absent at birth, progressively enlarged, bled easily and then regressed. Local soft-tissue teaching supports only bounded vascular-tumour morphology, so the exact course remains assessment-source-bound.', explicit_objective: 'Identify Hemangioma as the exact source-keyed response for the printed clinical course.', pitfalls: 'Do not rewrite the postnatal onset or infer another vascular lesion. Do not promote the exact course beyond the Draft assessment occurrence.', concept_type: 'clinical course', microtopic: 'Infantile hemangioma', article: articleIds.tumour, resources: [source.assessment, source.softTissue], claim: 'HEMANGIOMA-Q57', exam: 'Family-163 Q57 prints B in both answer layers.', uncertainty: 'The exact postnatal growth-and-regression relation lacks independent Helwan teaching confirmation.' },
  { id: conceptIds.cushing, canonical_key: 'cushing-syndrome-secondary-osteoporosis', label: 'Cushing-pattern cortisol excess is source-linked to progressive secondary osteoporosis', aliases: 'Cushing syndrome and osteoporosis\nCortisol excess bone loss\nSecondary osteoporosis', definition: 'Family-163 Q58 prints Cortisol of 75 microgm/dL for progressive lumbar bone loss with truncal fat distribution and hypertension. The local bone-disease summary supports only osteoporosis context; the direct assessment alone owns the exact endogenous cortisol value association.', explicit_objective: 'Identify the printed cortisol result while preserving the assessment-only numerical association.', pitfalls: 'Do not normalise microgm/dL, change 75, or convert the record into clinical diagnostic guidance. Do not overstate the teaching source.', concept_type: 'secondary disease association', microtopic: 'Cushing syndrome and bone loss', article: articleIds.systemic, resources: [source.assessment, source.bone], claim: 'CUSHING-Q58', exam: 'Family-163 Q58 prints B in both answer layers.', uncertainty: 'The exact serum value and endogenous osteoporosis relation remain assessment-source-bound; local teaching does not independently support them.' },
]
const newConcepts = newSpecs.map((spec) => ({
  label: spec.label, id: spec.id, canonical_key: spec.canonical_key, aliases: spec.aliases, ...newConceptCommon,
  definition: spec.definition, explicit_objective: spec.explicit_objective, pitfalls: spec.pitfalls, concept_type: spec.concept_type, microtopic: spec.microtopic,
  article_ids: spec.article, related_article_ids: spec.article, resource_ids: spec.resources.join('\n'), exam_signal: spec.exam,
  atomic_claim_ids: `CLM-HULCS103-F163-${spec.claim}-01`, original_wording: spec.exam, uncertainty: spec.uncertainty,
}))

const updateSpecs = [
  { id: conceptIds.myeloma, article: articleIds.tumour, resources: [source.assessment, source.boneTumour], claim: 'MYELOMA-Q44-47-49', objective: 'Distinguish the urine-protein, diagnosis and radiology objectives across the three exact source occurrences.', note: 'Family-163 Q44, Q47 and Q49 add Bence-Jones proteins, diagnostic myeloma and lytic-lesion objectives without collapsing their distinct stems.' },
  { id: conceptIds.gout, article: articleIds.joint, resources: [source.assessment, source.joint], claim: 'GOUT-Q48', objective: 'Identify Hyperuricemia for the printed first-metatarsophalangeal mass and needle-crystal occurrence.', note: 'Family-163 Q48 adds a distinct gouty-mass occurrence with exact 1st metatarsophalangeal wording.' },
  { id: conceptIds.chondrosarcoma, article: articleIds.tumour, resources: [source.assessment, source.boneTumour], claim: 'CHONDROSARCOMA-Q52', objective: 'Identify Pelvic bones as the printed common site for the exact chondrosarcoma pattern.', note: 'Family-163 Q52 adds the common-site objective and preserves “Hand bone” singular.' },
  { id: conceptIds.carpal, article: articleIds.joint, resources: [source.assessment, source.anatomy], claim: 'CARPAL-Q53', objective: 'Identify Median nerve compression without repairing the source phrase tapping over the radial aspect.', note: 'Family-163 Q53 adds a nocturnal paresthesia occurrence while preserving the radial-aspect Tinel wording as a visible source risk.' },
  { id: conceptIds.rheumatoid, article: articleIds.joint, resources: [source.assessment, source.joint], claim: 'RA-Q54', objective: 'Identify Rheumatoid arthritis from the exact deformity and treatment pattern.', note: 'Family-163 Q54 adds a remitting/relapsing deforming polyarthritis occurrence.' },
  { id: conceptIds.osteoarthritis, article: articleIds.joint, resources: [source.assessment, source.joint], claim: 'OA-Q56', objective: 'Identify Osteoarthritis from use-related pain, Heberden’s nodes and osteophytes.', note: 'Family-163 Q56 remains a separate occurrence with its own stem and options.' },
]
const updatedConcepts = updateSpecs.map((spec) => {
  const row = requireCurrent(currentConcepts, spec.id)
  row.definition = appendText(row.definition, spec.note)
  row.explicit_objective = uniqueLines(row.explicit_objective, spec.objective)
  row.pitfalls = appendText(row.pitfalls, 'Preserve the exact Family-163 wording, option order and agreeing key; do not infer held answers or clinical guidance.')
  if (spec.id !== conceptIds.carpal) {
    row.modules = uniqueLines(row.modules, 'HU-LCS-103')
    row.universities = uniqueLines(row.universities, 'hu')
  }
  if (spec.id === conceptIds.carpal) {
    row.article_ids = `+${spec.article}`
    row.related_article_ids = `+${spec.article}`
    row.resource_ids = `+${spec.resources.join('\n')}`
    row.atomic_claim_ids = `+CLM-HULCS103-F163-${spec.claim}-01`
  } else {
    row.article_ids = uniqueLines(row.article_ids, spec.article)
    row.related_article_ids = uniqueLines(row.related_article_ids, spec.article)
    row.resource_ids = uniqueLines(row.resource_ids, spec.resources)
    row.atomic_claim_ids = uniqueLines(row.atomic_claim_ids, `CLM-HULCS103-F163-${spec.claim}-01`)
  }
  row.exam_signal = appendText(row.exam_signal, spec.note)
  row.original_wording = appendText(row.original_wording, spec.note)
  row.uncertainty = appendText(row.uncertainty, 'The formal and red answers agree for the included occurrence, but both layers belong to the same local course-bank source and are not independent verification.')
  return row
})
const concepts = [...updatedConcepts, ...newConcepts]

const articleConcepts = {
  [articleIds.tumour]: [conceptIds.myeloma, conceptIds.chondrosarcoma, conceptIds.hemangioma],
  [articleIds.joint]: [conceptIds.gout, conceptIds.carpal, conceptIds.rheumatoid, conceptIds.osteoarthritis],
  [articleIds.systemic]: [conceptIds.hypercalcemia, conceptIds.cushing],
}
const articleQuestions = {
  [articleIds.tumour]: [44, 47, 49, 52, 57],
  [articleIds.joint]: [48, 53, 54, 56],
  [articleIds.systemic]: [50, 58],
}
const articleResources = {
  [articleIds.tumour]: [source.assessment, source.boneTumour, source.softTissue],
  [articleIds.joint]: [source.assessment, source.joint, source.anatomy],
  [articleIds.systemic]: [source.assessment, source.boneTumour, source.bone],
}
const articles = Object.values(articleIds).map((id) => {
  const row = requireCurrent(currentArticles, id)
  const claims = claimsByArticle(id)
  const extension = `### Family-163 Q44-Q58 extension\n${extensionText(id)}\n\nAll included records preserve literal stems, option order, units, values, grammar, contradictions and agreeing formal/red keys. Q45, Q46, Q51 and Q55 remain excluded because the two source answer layers conflict; no answer is inferred or repaired. These Draft additions represent local assessment evidence, not clinical guidance.\n\n### Extension limitations\nThe course bank identifies an author and collectors but does not identify an official examination sitting, cohort or date. The formal and red answer layers are two evidence layers in the same source rather than independent verification. Teaching sources support only the bounded statements described in the citations.`
  row.summary = appendText(row.summary, `Family-163 Q44-Q58 adds ${articleQuestions[id].length} safe source occurrences while preserving the four answer-layer conflicts as holds.`)
  row.sections = appendText(row.sections, extension)
  row.hold_these = appendText(row.hold_these, extensionText(id))
  row.related_concepts = uniqueLines(row.related_concepts, articleConcepts[id])
  row.question_ids = uniqueLines(row.question_ids, articleQuestions[id].map((number) => `Q-HU-LCS103-MSK-F163-${String(number).padStart(2, '0')}`))
  row.resource_ids = uniqueLines(row.resource_ids, articleResources[id])
  row.article_source_ids = uniqueLines(row.article_source_ids, articleResources[id])
  row.claim_ids = uniqueLines(row.claim_ids, claims.map((claim) => `CLM-HULCS103-F163-${claim.code}-01`))
  row.span_ids = uniqueLines(row.span_ids, claims.map((claim) => `SPN-HULCS103-F163-${claim.code}-01`))
  row.annotations = appendText(row.annotations, claims.map((claim) => `### definition_of · ${claim.concept}\nQuote: ${claim.text}\nBlock: Family-163 Q44-Q58 extension`).join('\n\n'))
  row.callout_evidence = appendText(row.callout_evidence, claims.map((claim) => `### ${claim.text}\nClaims: CLM-HULCS103-F163-${claim.code}-01\nCitations: CIT-HULCS103-F163-${claim.code}-ASSESS-01, CIT-HULCS103-F163-${claim.code}-TEACH-01\nSpan: SPN-HULCS103-F163-${claim.code}-01`).join('\n\n'))
  row.conflicts = uniqueLines(row.conflicts === '[clear]' ? '' : row.conflicts, 'Family-163 Q45, Q46, Q51 and Q55 have conflicting formal/red answer layers and remain held without adjudication.')
  row.notes = appendText(row.notes, 'This same-ID update preserves prior university metadata and links before appending the approved Q44-Q58 subset.')
  return row
})

const claims = claimSpecs.map((claim) => ({ id: `CLM-HULCS103-F163-${claim.code}-01`, concept_id: claim.concept, subject: claim.code.replaceAll('-', ' '), predicate: 'is presented in the governed local sources as', object: claim.object, display_text: claim.text, risk_class: 'foundational_stable', verification_status: 'needs_evidence', conflict_status: 'none', confidence: '0.82', freshness: 'stable_local_curriculum_fact', time_sensitive: 'no', qualifiers: 'polarity: affirmative\nauthority: local Helwan course-bank assessment and bounded teaching support, not independent verification\nassessment boundary: Family-163 Q44-Q58 excluding held Q45/Q46/Q51/Q55' }))
const citations = claimSpecs.flatMap((claim) => [
  { id: `CIT-HULCS103-F163-${claim.code}-ASSESS-01`, claim_id: `CLM-HULCS103-F163-${claim.code}-01`, resource_id: source.assessment, evidence_role: 'direct_assessment_support', locator_type: 'page', locator_page: claim.page, locator_section: claim.section, locator_detail: `Family-163 physical PDF p${claim.page}, exact occurrence and agreeing formal/red answer evidence.`, support_span: claim.direct, context_note: 'Direct local course-bank assessment support for Draft content; not an identified official exam and not independent medical verification.', confidence: '0.84', counts_as_claim_evidence: 'no' },
  { id: `CIT-HULCS103-F163-${claim.code}-TEACH-01`, claim_id: `CLM-HULCS103-F163-${claim.code}-01`, resource_id: claim.teaching, evidence_role: 'local_curriculum_support', locator_type: 'page', locator_page: claim.teachingPage, locator_section: claim.teachingSection, locator_detail: 'Governed Helwan teaching or assessment support used only inside the stated boundary.', support_span: claim.teachingSpan, context_note: 'Bounded local explanation support; any unsupported relation or exact value remains assessment-source-bound.', confidence: '0.80', counts_as_claim_evidence: 'no' },
])
const spans = claimSpecs.map((claim) => ({ id: `SPN-HULCS103-F163-${claim.code}-01`, article_id: claim.article, section_id: `${claim.article.toLowerCase()}-family-163-q44-q58-extension`, text: claim.text, claim_ids: `CLM-HULCS103-F163-${claim.code}-01`, citation_ids: `CIT-HULCS103-F163-${claim.code}-ASSESS-01\nCIT-HULCS103-F163-${claim.code}-TEACH-01` }))

const questionRows = [
  [44, 'A', 'A 59-year-old male presents to the medical outpatient department with a one-month history of progressively increasing fatigue and backache. For the last month, the patient has been feeling exhausted for no apparent reason and finding it difficult to work and look after himself. He has also found that for the last 6 months there has been a decline in his ability to speak clearly. His tongue has enlarged and become firm which makes moving it for speech formation and eating solid foods difficult and at times painful. He has lost over 15 kg in the past 6 months. On physical examination, he is afebrile, his blood pressure is 100/68, heart rate is 84, and the respiratory rate is 18. His hemoglobin level is 5.4 g/L, creatinine level is 3 mg/dL, and the calcium level is high. Protein electrophoresis is done and shows M-band. A urine sample is taken. What is most likely to be found and is diagnostic?', ['Bence-Jones proteins', 'Elevated calcium', 'Decreased calcium', 'Elevated creatinine', 'Elevated ammonia'], conceptIds.myeloma, articleIds.tumour, '20', 'The exact 5.4 g/L value, M-band wording and urine diagnostic objective are preserved; the vignette repeats the earlier myeloma presentation but asks a distinct question.'],
  [47, 'A', 'A 55-year-old male presents with new symptoms of fatigue on exertion. He is otherwise well with no significant past medical history. His hemoglobin is 10.6g/dl, with an MCV of 92. He has normal serum ferritin, vitamin B12, and folic acid levels. The absolute neutrophil count is 1.300/mm3 and platelets 117,000/mm3. He has a creatinine of 0.9 mg/dL, calcium of 9.2 mg/dL, and albumin of 3.8 g/dL. A serum protein electrophoresis is performed that demonstrates a monoclonal IgA protein of 1.5 g/dL. A skeletal survey shows occult lytic lesions in the skull and bilateral humeri, and a bone marrow biopsy shows 30 % involvement by abnormal appearing plasma cells. What is the most likely diagnosis?', ['Multiple myeloma', 'Osteoporosis', 'Rheumatoid arthritis', 'Sickle cell anemia', 'Systemic lupus erythematosus'], conceptIds.myeloma, articleIds.tumour, '21', 'The exact 10.6g/dl, 1.300/mm3, 30 % and “abnormal appearing” wording is retained.'],
  [48, 'C', 'A 58-year-old obese man has been drinking alcohol for more than 20 years. He complains of a bump in his left great toe. On physical examination, there is a 3 cm firm mass over the left 1st metatarsophalangeal joint. An aspirate from this mass is performed and on microscopic examination reveals numerous neutrophils and long slender needle-shaped crystals. Which of the following laboratory test findings is most characteristic of his underlying disease process?', ['Hyperglycemia', 'Positive antinuclear antibody', 'Hyperuricemia', 'Hypercalcemia', 'High rheumatoid factor titer'], conceptIds.gout, articleIds.joint, '21', 'The exact “1st metatarsophalangeal” wording is preserved.'],
  [49, 'B', 'A 64-year-old woman presents with fatigue and has been found to have anemia and renal dysfunction. Her lab studies have shown hemoglobin of 9.1 g/dL and hematocrit of 28 %, serum creatinine of 2.8 mg/dL, albumin 3.5 g/dL, and a β-2 microglobulin of 4.5 mg/dL. Bone marrow has demonstrated 25% plasma cells. What are the most expected radiology results?', ['Heberden’s nodes', 'Lytic bone lesions', 'Osteomalacia', 'Osteoporosis', 'Sunburst sign'], conceptIds.myeloma, articleIds.tumour, '22', 'The exact β-2 microglobulin value, 25% plasma cells and plural “radiology results” wording are preserved.'],
  [50, 'A', 'A 62-year-old asymptomatic man is noted to have multiple myeloma and hypercalcemia, he presents with severe fatigue, loss of appetite and weight loss. Radiology confirms osteolytic lesion in the right mid-ulna. Following proper hydration, which of the following therapies is useful for the immediate treatment of hypercalcemia?', ['Bisphosphonates', 'Dexamethasone plus thalidomide', 'Erythropoietin', 'Interferon-alpha', 'Observe without treatment since she is asymptomatic'], conceptIds.hypercalcemia, articleIds.systemic, '22', 'The source says “asymptomatic” before severe symptoms, later says “she”, and keys Bisphosphonates as immediate therapy after hydration; all are preserved without clinical repair.'],
  [52, 'D', 'A 53-year-old man is found to have a bone mass. Radiologically, it shows extensive bony destruction and popcorn calcification. The lesion is resected, and grossly the mass has a bluish-white cut surface. Microscopic examination shows atypical chondrocytes within a chondroid matrix. What is the most common site affected by such lesions?', ['Feet bones', 'Hand bone', 'Epiphysis of long bones', 'Pelvic bones', 'Facial bones'], conceptIds.chondrosarcoma, articleIds.tumour, '23', 'The option “Hand bone” remains singular exactly as printed.'],
  [53, 'C', 'A 52-year-old male presents with a 4-week history of intermittent aching in his right wrist and forearm along with numbness and tingling in the thumb and index finger of his right hand. He states that after prolonged use, his hand feels weak. It also feels swollen although no visible swelling is present. He states that his symptoms are most noticeable at night and are usually relieved by vigorously shaking his hand. The patient denies injury. His vital signs are normal and he has no medical history aside from obesity. On exam, the patient has a positive Tinel’s sign, pain shooting from the wrist to the hand when tapping over the radial aspect of the wrist. What is the most likely etiology?', ['Lateral cutaneous nerve compression', 'Long thoracic nerve compression', 'Median nerve compression', 'Radial nerve compression', 'Ulnar nerve compression'], conceptIds.carpal, articleIds.joint, '23-24', 'The source prints tapping over the “radial aspect” while keying Median nerve compression; that wording risk is preserved and not repaired.'],
  [54, 'D', 'A 52-year-old woman has complained of episodes of joint pain involving her hands and feet for over 5 years. The pain has occurred mostly in a remitting and a relapsing pattern. On physical examination, she has deformities of her hands involving the fingers, with swan-neck deformities and ulnar deviation. Her condition improves following methotrexate and hydroxychloroquine therapy. Which of the following diseases is she most likely to have?', ['Ankylosing spondylitis', 'Gummatous necrosis', 'Osteoarthritis', 'Rheumatoid arthritis', 'Systemic lupus erythematosus'], conceptIds.rheumatoid, articleIds.joint, '24', 'The remitting-and-relapsing treatment wording is preserved exactly.'],
  [56, 'D', 'A 55-year-old woman presents with worsening knee pain for the past 3 years. The pain is increased by the end of the day and worsens with use of joints. On physical examination, she has Heberden’s nodes. A radiograph of the lower limb reveals prominent osteophytes in the knee joint. Which of the following diseases is she most likely to have?', ['Rheumatoid arthritis', 'Pseudogout', 'Osteomyelitis', 'Osteoarthritis', 'Gouty arthritis'], conceptIds.osteoarthritis, articleIds.joint, '25', 'The exact “radiograph of the lower limb” and Heberden’s nodes wording is preserved.'],
  [57, 'B', 'A 7-year-old girl presents with a purple swelling on the left side of her upper lip. Her mother states that there was no birthmark at the time of her birth but later on, swelling in upper lip appeared which progressively increased in size, with a tendency to easily bleed, followed by regression. What is the most likely diagnosis?', ['Angiosarcoma', 'Hemangioma', 'Arteriovenous malformations', 'Angiolipoma', 'Hemangioendothelioma'], conceptIds.hemangioma, articleIds.tumour, '25', 'The postnatal onset, growth, bleeding and regression sequence remains assessment-only because the local teaching source does not independently state that complete course.'],
  [58, 'B', 'A 43-year-old woman presents with low back pain. On physical examination, her BMI is 29 with truncal distribution of fat and her blood pressure measures 150/100 mm Hg. Bone densitometry shows her bone mass decreased more than 2 standard deviations below the adult mean in her lumbar vertebral region. On follow-up six months later, densitometry is performed and the condition is found to be progressive. Which of the following serum laboratory test abnormalities is expected to be found in this patient?', ['Alkaline phosphatase of 220 U/L', 'Cortisol of 75 microgm/dL', 'Parathormone of 5 pg/mL', 'Total cholesterol of 500 mg/dL', 'Uric acid of 15.2 mg/dL'], conceptIds.cushing, articleIds.systemic, '26', 'The exact “more than 2 standard deviations”, 75 value and microgm/dL unit are preserved; the endogenous cortisol association remains assessment-bound.'],
]
const objectives = Object.fromEntries(concepts.map((row) => [row.id, row.explicit_objective.split('\n').at(-1)]))
const resourcesFor = (concept) => {
  if ([conceptIds.myeloma, conceptIds.chondrosarcoma].includes(concept)) return `${source.assessment}\n${source.boneTumour}`
  if (concept === conceptIds.hemangioma) return `${source.assessment}\n${source.softTissue}`
  if ([conceptIds.gout, conceptIds.rheumatoid, conceptIds.osteoarthritis].includes(concept)) return `${source.assessment}\n${source.joint}`
  if (concept === conceptIds.carpal) return `${source.assessment}\n${source.anatomy}`
  if (concept === conceptIds.hypercalcemia) return `${source.assessment}\n${source.boneTumour}`
  return `${source.assessment}\n${source.bone}`
}
const common = { subject: 'msk', status: 'Draft', owner: 'Helwan Year-1 authoring lane', vignette: '', format: 'single best answer', written_parts: '', matching_options: '', matching_prompts: '', correct_answers: '', labeling_image: '', labeling_alt: '', labeling_points: '', completion_text: '', derived_from: '', topic: 'Musculoskeletal system', subtopic: 'Bone and joint disorders', difficulty: 'Moderate', question_type: 'Integrated LCS', module: 'HU-LCS-103', module_subject: 'HU-LCS-103 > Integrated Musculoskeletal Assessment', clinical_relevance: '0.82', academic_relevance: '0.98', cognitive_effort_score: '0.42', exam_weight_by_year: 'HU_Y1=0.84', question_only_for: 'HU_Y1', concept_ids: '', years: 'HU_Y1', universities: 'hu', cognitive_effort: 'Medium', setting: 'Academic', reasoning_level: '1', inferred_difficulty: '68', exam_relevance: '9', contextual_concept_ids: '', media_recommendations: '', attachments: '', attached_image: '', estimated_seconds: '75', randomise_answers: 'yes' }
const holdText = 'Q45 remains held (formal C/red A), Q46 remains held (formal A/red C), Q51 remains held (formal B/red A), and Q55 remains held (formal A/red C); none is adjudicated or imported.'
const questions = questionRows.map(([number, key, stem, options, concept, article, page, risk]) => {
  const row = { id: `Q-HU-LCS103-MSK-F163-${String(number).padStart(2, '0')}`, title: stem, ...common, question: stem, correct_answer: key }
  for (let index = 0; index < options.length; index += 1) {
    const letter = String.fromCharCode(65 + index)
    const option = options[index]
    row[`answer_${letter.toLowerCase()}`] = option
    row[`explanation_${letter.toLowerCase()}`] = letter === key
      ? `Family-163 prints ${key} in both its formal key and red handwritten answer layer for this exact occurrence, so “${option}” remains the source-keyed response. The linked Draft article explains only the bounded local distinction and preserves the complete source wording and option order. ${risk} Both answer layers belong to the same local course-bank source and do not constitute independent verification.`
      : `The option “${option}” is preserved exactly from Family-163, but both source answer layers select ${key} instead. The linked Draft article explains the local distinction without rewriting this distractor, repairing the source, or inferring another answer. ${risk} This record remains Draft pending independent medical verification and named Helwan faculty review.`
  }
  row.answer_f = ''
  row.explanation_f = ''
  return { ...row, main_concept: concept, library_ids: article, resource_ids: resourcesFor(concept), learning_objective: objectives[concept], source_citation: `${source.assessment}, physical PDF p${page}, printed Q${number}: exact stem/options; formal and red answer layers both print ${key}.`, author_notes: `Transcribed from governed Family-163 physical p${page}; wording, option order, spelling, punctuation, units, values and key are preserved without repair. ${risk} ${holdText} The bank names an author and collectors but does not identify an official exam sitting, cohort or date. No practical, written or media record is inferred.` }
})

if (questions.length !== 11 || questions.map((row) => row.correct_answer).join('') !== 'AACBADCDDBB') throw new Error('Family-163 Q44-Q58 count or key mismatch')
if (concepts.length !== 9 || newConcepts.length !== 3 || updatedConcepts.length !== 6) throw new Error('Concept delta mismatch')
if (articles.length !== 3 || claims.length !== 9 || citations.length !== 18 || spans.length !== 9) throw new Error('Dependency delta mismatch')
await Promise.all(Object.values(paths).map((path) => mkdir(dirname(path), { recursive: true })))
await Promise.all([
  writeFile(paths.concepts, concepts.map(item).join(divider), 'utf8'),
  writeFile(paths.articles, articles.map(item).join(divider), 'utf8'),
  writeFile(paths.claims, claims.map(item).join(divider), 'utf8'),
  writeFile(paths.citations, citations.map(item).join(divider), 'utf8'),
  writeFile(paths.spans, spans.map(item).join(divider), 'utf8'),
  writeFile(paths.questions, questions.map(item).join(divider), 'utf8'),
])
console.log(JSON.stringify({ counts: { questions: 11, concepts: 9, newConcepts: 3, conceptUpdates: 6, articles: 3, articleUpdates: 3, claims: 9, citations: 18, spans: 9, resources: 0, practical: 0, written: 0, media: 0 }, keys: 'AACBADCDDBB', held: ['Q45 C/A', 'Q46 A/C', 'Q51 B/A', 'Q55 A/C'] }, null, 2))
