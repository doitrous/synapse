#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../..')
const base = resolve(root, 'docs/Helwan-Source-Imports')
const paths = {
  concepts: resolve(base, 'concept/HU-LCS-103-family144-q17-motor-unit-concept.md'),
  articles: resolve(base, 'article/HU-LCS-103-family144-q17-motor-unit-article.md'),
  sources: resolve(base, 'evidence/HU-LCS-103-family144-q17-sources.md'),
  claims: resolve(base, 'evidence/HU-LCS-103-family144-q17-claims.md'),
  citations: resolve(base, 'evidence/HU-LCS-103-family144-q17-citations.md'),
  spans: resolve(base, 'evidence/HU-LCS-103-family144-q17-spans.md'),
  questions: resolve(base, 'question/HU-LCS-103-family144-q17-mcq.md'),
}
const divider = '\n\n---\n\n'
const item = (fields) => `# Item\n\n${Object.entries(fields).map(([key, value]) => `## ${key}\n${value ?? ''}`).join('\n\n')}\n`

const ids = {
  concept: 'CON-MSK-C14F65CD68F720',
  article: 'ART-HU-LCS103-PHY-F144-MOTOR-UNIT-ARITHMETIC',
  question: 'Q-HU-LCS103-PHY-F144-17',
  assessment: 'src_3cd2b338713b01fb5bf1',
  teaching: 'src_262c1ba3765a9922e9d4',
  claim: 'CLM-HULCS103-F144-MOTOR-UNIT-01',
  span: 'SPN-HULCS103-F144-MOTOR-UNIT-01',
}
const claimText = 'A motor unit links a spinal motor neuron to its supplied muscle fibres, and Family-144 Q17 marks 15 motor units as the minimum for an eye muscle composed of 90 fibres.'

const concepts = [{
  label: "The whole muscle's contraction is graded by recruiting more motor units and by raising stimulation frequency toward tetanus, and Treppe raises twitch tension over the first few stimuli of a rested muscle",
  id: ids.concept,
  canonical_key: 'muscle.grading.motor-unit-recruitment-frequency-treppe',
  aliases: 'Motor unit and recruitment\nEye-muscle motor-unit item\nSource-marked motor-unit arithmetic',
  arabic_label: '', arabic_aliases: '', status: 'under review', support_mode: 'direct_statement', subject: 'msk',
  primary_node_id: 'SYS-MSK', secondary_node_ids: 'DIS-PHY-T01', topic: 'Musculoskeletal system', subtopic: 'Muscle physiology', nanotopic: '',
  modules: 'HU-LCS-103', module_subject: 'HU-LCS-103 > Physiology > Muscle Physiology > Motor units', universities: 'hu', learner_years: '1',
  approved_file_resource_ids: '[clear]', approved_video_resource_ids: '[clear]', blueprint_weight: '0.82', exam_weight_by_year: 'HU_Y1=0.82',
  clinical_relevance: '0.62', academic_relevance: '0.98', weight_confidence: '0.58', confidence: '0.83', resource_occurrence_ids: '[clear]',
  source_candidate_ids: '[clear]', merge_ids: '[clear]', rejected_merge_candidate_ids: 'Exact-ID update selected from governed Family-144 reconciliation; no rival motor-unit concept is introduced.',
  evidence_gaps: 'The Family-144 bank provides only one yellow-highlighted option and no conventional key legend. Independent medical verification and named Helwan Physiology faculty review are required before publication.',
  owner: 'Helwan Year-1 authoring lane', reviewer: 'Medical team, Helwan Physiology faculty', final_publisher: 'Admin team', last_reviewed: '', review_due: '',
  publication_status: 'needs_evidence', editorial_review_status: 'drafted_not_reviewed', exclusion_reason: '',
  definition: 'A motor unit is represented in the governed Helwan teaching source as an anterior horn cell, its nerve fibre and the supplied muscle fibre. Family-144 separately presents a 90-fibre eye-muscle calculation and yellow-highlights 15 motor units, but the available governed Helwan teaching source supplies no numeric innervation ratio from which to derive that answer.',
  explicit_objective: 'Recognise the exact source-marked Family-144 response while keeping its numeric derivation separate from the governed Helwan motor-unit definition.',
  pitfalls: 'Do not invent a 3-to-6-fibre ratio or reverse-engineer it into governed teaching. Do not treat the Family-144 red arrow as an answer mark; only the yellow highlight over option E selects a response.',
  concept_type: 'physiology_mechanism', microtopic: 'Motor-unit definition and source-marked arithmetic',
  article_ids: ids.article,
  related_article_ids: 'ART-MSK-TOP-B54C248DF1',
  resource_ids: `${ids.assessment}\n${ids.teaching}`,
  exam_signal: 'Family-144 Q17 is the only option-level source-marked answer in the 67-occurrence bank; exact highlighted key E.',
  atomic_claim_ids: `CLM-FBC1778A94B1\n${ids.claim}`,
  original_wording: '[Family-144 Q17] Suppose , a eye muscle is composed of 90 muscle fibers . What is the minimum number of motor units……………; yellow-highlighted E/ 15 motor units.',
  conflicts: '[clear]',
  uncertainty: 'The bank has no conventional answer list or legend. Q17 is retained as Draft because its yellow option highlight is the only answer-level annotation in the source, and the numeric 15-unit arithmetic lacks independent governed Helwan teaching support.',
  field_notes: 'microtopicId: The reviewed taxonomy stops above this source-specific arithmetic application.\nnanotopicId: No reviewed nanotopic exists below the assigned canonical node.\napprovedFileResourceIds: Neither local PDF is rights-cleared for student redistribution.\napprovedVideoResourceIds: No video is assigned.\nresourceOccurrenceIds: No extraction occurrence record exists.\nsourceCandidateIds: Governed source-first reconciliation selected an exact existing ID.\nmergeIds: No concepts were merged.\nlastReviewed: No named medical review completed.\nreviewDue: Set after first named review.\nexclusionReason: Not excluded; held at needs_evidence.\narabicLabel: Blank pending reviewed terminology.\narabicAliases: Blank pending reviewed terminology.',
}]

const articleSections = [
  '### Definition',
  'A motor unit is one spinal motor neuron together with every skeletal-muscle fibre supplied by its branching axon. The number of fibres per unit varies with the precision required. Small motor units permit finer increments of force than large motor units.',
  '', '### Mechanism',
  'Family-144 supplies a 90-fibre eye-muscle stem and yellow-highlights option E, 15 motor units. Dividing 90 by the marked 15 would reverse-derive six fibres per unit, but that ratio is not printed in the assessment stem and is not supplied by the governed Helwan Family-75 teaching source. The marked answer is therefore preserved as source evidence without turning the reverse-derived ratio into governed teaching.',
  '', '### Key determinants',
  'The direction word is minimum, and the source retains both 30 and 15 among its options. However, the governed Helwan sources do not print the numerical range needed to adjudicate those distractors from first principles. The item remains usable only as a Draft source-key occurrence pending independent teaching support and faculty review.',
  '', '### Clinical significance',
  'The Family-75 slide establishes the components of a motor unit but does not supply a fine-versus-gross numerical ratio. Family-144 makes the eye-muscle arithmetic examinable by highlighting one response without printing its derivation. This article is therefore an evidence-boundary note for first-year physiology, not a clinical decision rule or an independently verified teaching rule.',
  '', '### Common misconceptions',
  'Do not invent a 3-to-6-fibre range to make the marked option derivable. Do not present six fibres per unit as a governed Helwan teaching fact merely because 90 divided by the marked 15 equals six. Do not promote the red arrow beside the stem into a second answer annotation.',
  '', '### Source-bound statement',
  claimText,
].join('\n')

const articles = [{
  id: ids.article, title: 'Motor-unit definition and the Family-144 Q17 evidence boundary', arabic_title: '',
  aliases: 'Family-144 Q17 motor-unit calculation\nEye-muscle source-marked answer\nMotor-unit arithmetic evidence boundary', subject: 'msk', topic: 'Musculoskeletal system',
  subtopic: 'Muscle physiology', microtopic: 'Motor-unit definition and source-marked arithmetic', nanotopic: '', primary_node_id: 'SYS-MSK', secondary_node_ids: 'DIS-PHY-T01',
  template_id: 'TPL-CONCEPT', archetype: 'concept', language: 'en', learner_stage: 'Years 1–3 foundation', reading_time: '4', high_yield: 'High',
  time_sensitive: 'stable', status: 'Draft', owner: 'Helwan Year-1 authoring lane', reviewer: 'Medical team, Helwan Physiology faculty', final_publisher: 'Admin team',
  summary: 'Family-144 Q17 yellow-highlights 15 motor units for a 90-fibre eye-muscle stem, while the governed Helwan teaching source defines a motor unit but supplies no numeric ratio from which to derive that response.',
  sections: articleSections, published_summary: '', published_sections: '',
  hold_these: `${claimText}\nFamily-144 Q17 remains Draft because the source has no conventional key legend and its numeric arithmetic lacks independent governed Helwan teaching support.`,
  lose_the_mark: 'Inventing a 3-to-6-fibre range as governed Helwan teaching.\nTreating the red stem arrow as an answer selection.\nChanging the literal source wording `a eye`.',
  related_concepts: ids.concept, related_articles: 'ART-MSK-TOP-B54C248DF1', question_ids: ids.question,
  resource_ids: `${ids.assessment}\n${ids.teaching}`, article_source_ids: `${ids.assessment}\n${ids.teaching}`,
  claim_ids: ids.claim, span_ids: ids.span, universities: 'hu', years: 'HU_Y1', module: 'HU-LCS-103',
  module_subject: 'HU-LCS-103 > Physiology > Muscle Physiology > Motor units',
  university_notes: 'hu: Family-144 contributes the sole source-marked occurrence. Family-75 supplies only the governed Helwan motor-unit definition; it does not independently support the numeric 15-unit arithmetic.',
  annotations: `### definition_of · ${ids.concept}\nQuote: ${claimText}\nBlock: body`, media: '', media_recommendations: '',
  publication_gate: 'needs_evidence',
  evidence_basis: 'Family-144 physical p10 supplies the exact stem, five options and yellow-highlighted E response. Family-75 physical p37 supplies the governed Helwan motor-unit definition. Neither source supplies independent numeric teaching support for the 15-unit arithmetic.',
  evidence_gaps: 'No conventional Family-144 answer legend exists, and no independent governed Helwan teaching source states the numeric innervation ratio needed to derive 15 units. Named Helwan Physiology faculty review is required.',
  conflicts: '[clear]', last_reviewed: '', review_due: '',
  notes: 'All other 66 Family-144 occurrences remain held because they have no option-level printed answer. The duplicated Q26 remains two physical unkeyed occurrences and is not authored here.',
  field_notes: 'arabicTitle: Blank pending reviewed terminology.\nnanotopicId: No reviewed nanotopic exists.\nmedia: No media is required.\npublishedSummary: Blank because this remains Draft.\npublishedSections: Blank because this remains Draft.\nlastReviewed: No named medical review completed.\nreviewDue: Set after first named review.',
  callout_evidence: `### ${claimText}\nClaims: ${ids.claim}\nCitations: CIT-HULCS103-F144-MOTOR-UNIT-ASSESS-01, CIT-HULCS103-F144-MOTOR-UNIT-TEACH-01\nSpan: ${ids.span}`,
}]

const sources = [{
  id: ids.assessment, title: 'Physiology MCQs Lecture — College MCQs Document (3)', institution: 'Local LCS-103 Physiology question-bank corpus',
  processing_status: 'native_text', collection_id: 'hu-y1',
  source_relative_path: 'Year 1/LCS 103/Physiology/Questions/MCQs/MCQs - College MCQs Document (3) Physiology MCQs.pdf', source_uri: '',
  media_type: 'application/pdf', languages: 'en', publication_date: '', accessed_at: '', page_count: '39',
  sha256: '3cd2b338713b01fb5bf1f95e2dc396daaf5ca4e66ec9be2d03e8d151111b9176',
  rights: 'Local Helwan teaching and assessment material held for internal authoring only. No page image is redistributed.',
  qualification: 'Tier-3 manifest/path-placed local LCS-103 Physiology lecture-question bank. It contains 67 physical MCQ occurrences and no conventional answer list or key legend. Q17 option E is the only option-level answer annotation, shown by a yellow highlight; all other 66 occurrences remain unkeyed and held.',
  confidence: '0.78', is_assessment: 'yes',
}]

const claims = [{
  id: ids.claim, concept_id: ids.concept, subject: 'Fine-movement motor-unit size', predicate: 'supports the calculation that',
  object: 'a spinal motor neuron is linked to its supplied fibres and the source-marked minimum for the 90-fibre eye-muscle item is 15 units', display_text: claimText,
  risk_class: 'foundational_stable', verification_status: 'needs_evidence', conflict_status: 'source_annotation_requires_review', confidence: '0.78',
  freshness: 'stable_local_curriculum_fact', time_sensitive: 'no',
  qualifiers: 'polarity: affirmative\nauthority: one local highlighted assessment response plus one local department-book explanation source\nassessment boundary: Family-144 Q17 only\nsource risk: no conventional Family-144 key legend',
}]

const citations = [
  {
    id: 'CIT-HULCS103-F144-MOTOR-UNIT-ASSESS-01', claim_id: ids.claim, resource_id: ids.assessment, evidence_role: 'direct_assessment_support',
    locator_type: 'page', locator_page: '10', locator_section: 'Lecture 1 Q17',
    locator_detail: 'Family-144 physical PDF p10, exact Q17 occurrence; the red arrow points to the stem and the yellow highlight is over option E.',
    support_span: '17/ Suppose , a eye muscle is composed of 90 muscle fibers . What is the minimum number of motor units…………… E/ 15 motor units',
    context_note: 'The yellow highlight is the only option-level source-marked answer in the entire bank. There is no conventional answer legend.', confidence: '0.78', counts_as_claim_evidence: 'no',
  },
  {
    id: 'CIT-HULCS103-F144-MOTOR-UNIT-TEACH-01', claim_id: ids.claim, resource_id: ids.teaching, evidence_role: 'local_curriculum',
    locator_type: 'page', locator_page: '37', locator_section: 'Motor unit — Define?',
    locator_detail: 'Family-75 Muscle Physiology lecture physical p37, printed definition beneath the motor-unit figure.',
    support_span: 'MOTOR UNIT = Anterior Horn Cell + Nerve Fibre + Muscle Fibre',
    context_note: 'Direct governed Helwan teaching support for the motor-unit definition only. It supplies no numeric ratio from which the marked 15-unit answer can be independently derived.', confidence: '0.84', counts_as_claim_evidence: 'no',
  },
]

const spans = [{
  id: ids.span, article_id: ids.article, section_id: 'art-hu-lcs103-phy-f144-motor-unit-arithmetic-source-bound-statement', text: claimText,
  claim_ids: ids.claim, citation_ids: 'CIT-HULCS103-F144-MOTOR-UNIT-ASSESS-01\nCIT-HULCS103-F144-MOTOR-UNIT-TEACH-01',
}]

const stem = 'Suppose , a eye muscle is composed of 90 muscle fibers . What is the minimum number of motor units……………'
const options = ['90 motor units', '50 motor units', '45 motor units', '30 motor units', '15 motor units']
const common = {
  subject: 'msk', status: 'Draft', owner: 'Helwan Year-1 authoring lane', vignette: '', format: 'single best answer', written_parts: '', matching_options: '',
  matching_prompts: '', correct_answers: '', labeling_image: '', labeling_alt: '', labeling_points: '', completion_text: '', derived_from: '',
  topic: 'Musculoskeletal system', subtopic: 'Muscle physiology', difficulty: 'Moderate', question_type: 'Physiology', module: 'HU-LCS-103',
  module_subject: 'HU-LCS-103 > Physiology > Muscle Physiology > Motor units', clinical_relevance: '0.62', academic_relevance: '0.98',
  cognitive_effort_score: '0.42', exam_weight_by_year: 'HU_Y1=0.82', question_only_for: 'HU_Y1', concept_ids: '', years: 'HU_Y1', universities: 'hu',
  cognitive_effort: 'Moderate', setting: 'Academic', reasoning_level: '2', inferred_difficulty: '58', exam_relevance: '8', contextual_concept_ids: '',
  media_recommendations: '', attachments: '', attached_image: '', estimated_seconds: '75', randomise_answers: 'yes',
}
const question = { id: ids.question, title: stem, ...common, question: stem, correct_answer: 'E' }
for (let index = 0; index < options.length; index += 1) {
  const letter = String.fromCharCode(65 + index)
  const option = options[index]
  question[`answer_${letter.toLowerCase()}`] = option
  question[`explanation_${letter.toLowerCase()}`] = letter === 'E'
    ? `The Family-144 page places its sole yellow answer highlight over E, “15 motor units,” so E is retained as the exact source-marked response. The governed Family-75 teaching source defines a motor unit but supplies no numeric innervation ratio from which 15 can be independently derived. The record therefore remains Draft, and no 3-to-6-fibre rule is inferred into governed Helwan teaching.`
    : `The option “${option}” is preserved exactly from Family-144, but the page’s sole yellow answer highlight selects E, “15 motor units,” instead. The governed Family-75 teaching source defines a motor unit but does not supply the numeric ratio needed to adjudicate this distractor from first principles. This option is not repaired or removed, and the item remains Draft without inventing a 3-to-6-fibre teaching rule.`
}
question.answer_f = ''
question.explanation_f = ''
Object.assign(question, {
  main_concept: ids.concept, library_ids: ids.article, resource_ids: `${ids.assessment}\n${ids.teaching}`,
  learning_objective: 'Identify the exact source-marked response to Family-144 Q17 and distinguish it from the numeric teaching support that the governed Helwan sources do not supply.',
  source_citation: `${ids.assessment}, physical PDF p10, printed Q17: exact stem, five options and yellow-highlighted E/ 15 motor units. Governed Helwan motor-unit definition: ${ids.teaching}, physical p37.`,
  author_notes: 'Literal source wording, including `a eye`, punctuation, option order and highlighted E, is preserved without answer repair. The red arrow points to the stem and is not treated as a key. This is the only option-level source-marked answer in Family 144; all other 66 physical occurrences, including both unkeyed Q26 occurrences, remain explicitly held. No practical, written or media record is inferred.',
})
const questions = [question]

if (questions.length !== 1 || question.correct_answer !== 'E' || options.length !== 5) throw new Error('Family-144 Q17 source contract mismatch')
if (concepts.length !== 1 || articles.length !== 1 || sources.length !== 1 || claims.length !== 1 || citations.length !== 2 || spans.length !== 1) throw new Error('Family-144 Q17 dependency count mismatch')
await Promise.all(Object.values(paths).map((path) => mkdir(dirname(path), { recursive: true })))
await Promise.all([
  writeFile(paths.concepts, concepts.map(item).join(divider), 'utf8'), writeFile(paths.articles, articles.map(item).join(divider), 'utf8'),
  writeFile(paths.sources, sources.map(item).join(divider), 'utf8'), writeFile(paths.claims, claims.map(item).join(divider), 'utf8'),
  writeFile(paths.citations, citations.map(item).join(divider), 'utf8'), writeFile(paths.spans, spans.map(item).join(divider), 'utf8'),
  writeFile(paths.questions, questions.map(item).join(divider), 'utf8'),
])
console.log(JSON.stringify({ files: paths, counts: { conceptUpdates: 1, articles: 1, sources: 1, questions: 1, claims: 1, citations: 2, spans: 1 }, keys: 'E', optionCounts: [5], sourceRisks: ['sole yellow option highlight; no conventional answer legend'], heldOccurrences: 66, practical: 0, written: 0, media: 0 }, null, 2))
