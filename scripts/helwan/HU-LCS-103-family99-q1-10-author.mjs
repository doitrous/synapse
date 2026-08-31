#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../..')
const importRoot = resolve(root, 'docs/Helwan-Source-Imports')
const paths = {
  concepts: resolve(importRoot, 'concept/HU-LCS-103-family99-q1-10-length-tension-concept-link.md'),
  articles: resolve(importRoot, 'article/HU-LCS-103-family99-q1-10-length-tension-article.md'),
  questions: resolve(importRoot, 'question/HU-LCS-103-family99-q1-10-muscle-mcq.md'),
  claims: resolve(importRoot, 'evidence/HU-LCS-103-family99-q1-10-length-tension-claims.md'),
  citations: resolve(importRoot, 'evidence/HU-LCS-103-family99-q1-10-length-tension-citations.md'),
  spans: resolve(importRoot, 'evidence/HU-LCS-103-family99-q1-10-length-tension-spans.md'),
}
const divider = '\n\n---\n\n'
const item = (fields) => `# Item\n\n${Object.entries(fields).map(([key, value]) => `## ${key}\n${value ?? ''}`).join('\n\n')}\n`

const source = {
  assessment: 'src_fad2f5ab18e1efa59eb1',
  helwan: 'src_262c1ba3765a9922e9d4',
  kasr: 'src_59643edb9d371bcefa2c',
}
const lengthArticle = 'ART-HU-LCS103-PHY-F99-Q1-10-LENGTH-TENSION'

const specs = {
  isometric: {
    concept: 'CON-MSK-87D5C5A48AB5D9',
    article: 'ART-HU-LCS103-PHY-MUSCLE-STRUCTURE-COUPLING',
    objective: 'Identify postural isometric contraction as tension development without whole-muscle shortening.',
    teaching: 'In an isometric contraction, tension develops while the whole-muscle length remains fixed. Postural muscles can sustain this mode while standing because they generate force without producing visible joint movement. This differs from isotonic shortening, in which muscle length changes while it works against a load.',
  },
  sarcomere: {
    concept: 'CON-MSK-0824FE988ADA00',
    article: 'ART-HU-LCS103-PHY-MUSCLE-STRUCTURE-COUPLING',
    objective: 'Predict the A-band and I-band changes produced by sliding-filament shortening.',
    teaching: 'During sliding-filament contraction, the thick and thin filaments slide past each other rather than shortening themselves. The A band represents thick-filament length and therefore remains constant, while the I band and H zone narrow and the Z discs approach. The decisive distinction is between an unchanged filament length and the changing degree of filament overlap.',
  },
  coupling: {
    concept: 'CON-MSK-3013AA61E917B7',
    article: 'ART-HU-LCS103-PHY-MUSCLE-STRUCTURE-COUPLING',
    objective: 'Sequence T-tubule conduction, sarcoplasmic-reticulum calcium handling and thin-filament activation or relaxation.',
    teaching: 'T-tubules carry the sarcolemmal action potential rapidly into the depth of a skeletal-muscle fibre. The sarcoplasmic reticulum releases calcium, calcium binds troponin and tropomyosin moves so actin sites become available; calcium removal from the sarcoplasm terminates contraction. T-tubules conduct excitation but are not the principal calcium store and do not use muscarinic receptors at the skeletal neuromuscular junction.',
  },
  types: {
    concept: 'CON-MSK-B080975D6171CF',
    article: 'ART-HU-LCS103-PHY-MUSCLE-TYPES-PROPERTIES',
    objective: 'Differentiate skeletal, cardiac and smooth muscle by voluntary control, striation and fatigue resistance.',
    teaching: 'Cardiac and smooth muscle are involuntary, whereas skeletal muscle is normally under voluntary somatic control. Smooth muscle is non-striated and is adapted for sustained economical activity, making resistance to fatigue a useful contrast with skeletal muscle in this source item. The three muscle types must therefore be separated by control, microscopic appearance and functional behaviour rather than by one feature alone.',
  },
  lengthTension: {
    concept: 'CON-MSK-01E9132FDDF9F2',
    article: lengthArticle,
    objective: 'Recognise initial fibre length as a determinant of skeletal-muscle contraction strength.',
    teaching: 'Skeletal-muscle force depends on the initial fibre and sarcomere length because that length determines thick–thin filament overlap. Force rises toward an optimal overlap and falls when the sarcomere is either too short or stretched beyond the optimum. Contraction therefore changes overlap and band widths, but the actin and myosin filaments themselves do not become shorter.',
  },
}

const concepts = [{
  id: 'CON-MSK-01E9132FDDF9F2',
  label: 'Skeletal muscle develops maximal isometric tension at a sarcomere length of about 2.2 micrometres, where thick and thin filament overlap is optimal',
  canonical_key: 'muscle.length-tension.sarcomere-optimum',
  article_ids: `+${lengthArticle}`,
}]

const articles = [{
  id: lengthArticle,
  title: 'Initial muscle length and active skeletal-muscle tension',
  aliases: 'Skeletal-muscle length–tension relationship\nInitial fibre length and force\nOptimal sarcomere overlap',
  arabic_title: '',
  subject: 'msk',
  topic: 'Musculoskeletal system',
  subtopic: 'Muscle physiology',
  microtopic: 'Length–tension relationship',
  nanotopic: '',
  primary_node_id: 'SYS-MSK',
  secondary_node_ids: 'DIS-PHY-T01',
  template_id: 'TPL-CONCEPT',
  archetype: 'concept',
  language: 'en',
  learner_stage: 'Years 1–3 foundation',
  high_yield: 'High',
  reading_time: '5',
  time_sensitive: 'stable',
  status: 'Draft',
  owner: 'Helwan Year-1 authoring lane',
  reviewer: 'Medical team, Helwan Physiology faculty',
  final_publisher: 'Admin team',
  summary: 'Active skeletal-muscle tension depends on initial fibre length because sarcomere length determines how many myosin heads can interact with actin. Force rises toward an optimal thick–thin filament overlap and then falls when excessive shortening or stretch reduces productive cross-bridge formation. The relationship explains why initial length affects contraction strength without implying that the filaments themselves shorten.',
  published_summary: '',
  sections: `### Definition
The length–tension relationship links a skeletal-muscle fibre's initial length to the active tension it can develop. Initial length sets the starting sarcomere geometry before contraction begins.

### Mechanism
Active force depends on the number of myosin heads that can form productive cross-bridges with actin. At an optimal sarcomere length, thick and thin filament overlap permits the greatest number of useful interactions. Stretch beyond that range reduces overlap, while excessive shortening creates interference between thin filaments and also lowers active force.

### Key determinants
Skeletal-muscle contraction strength is related to initial length because initial sarcomere length determines thick–thin filament overlap. The relation is not indefinitely proportional: active tension rises toward an optimum and decreases on either side of that useful range.

### Clinical significance
Length–tension reasoning helps distinguish a change in force from a change in filament length. It also provides a structural explanation for why muscles work most effectively over a limited range of joint positions rather than at every possible degree of stretch or shortening.

### Common misconceptions
Actin and myosin filaments slide but do not themselves become shorter during contraction. More initial stretch does not always mean more force, because excessive stretch reduces overlap. Calcium reuptake into the sarcoplasmic reticulum promotes relaxation rather than initiating contraction.`,
  published_sections: '',
  hold_these: 'Initial sarcomere length determines thick–thin filament overlap.\nActive force rises toward an optimum and falls outside that range.\nThe filaments slide rather than shorten.',
  lose_the_mark: 'Saying more stretch always produces more force.\nSaying actin and myosin filaments shorten.\nConfusing calcium reuptake with contraction initiation.',
  related_concepts: 'CON-MSK-01E9132FDDF9F2',
  related_articles: 'ART-HU-LCS103-PHY-MUSCLE-STRUCTURE-COUPLING: reviews sarcomere bands, isometric contraction and excitation–contraction coupling',
  question_ids: 'Q-HU-LCS103-PHY-F99-8',
  resource_ids: `${source.assessment}\n${source.helwan}\n${source.kasr}`,
  universities: 'hu',
  years: 'HU_Y1',
  module: 'HU-LCS-103',
  module_subject: 'HU-LCS-103 > Physiology > Muscle Physiology > Length–Tension Relationship',
  university_notes: 'hu: Restricted to the exact Family-99 Q8 initial-length assessment objective.',
  media: '',
  annotations: `### definition_of · CON-MSK-01E9132FDDF9F2
Quote: Skeletal-muscle contraction strength is related to initial length because initial sarcomere length determines thick–thin filament overlap.
Block: body`,
  article_source_ids: `${source.assessment}\n${source.helwan}\n${source.kasr}`,
  claim_ids: 'CLM-HULCS103-F99-Q110-LENGTH-TENSION-01',
  span_ids: 'SPN-HULCS103-F99-Q110-LENGTH-TENSION-01',
  media_recommendations: '',
  callout_evidence: `### Initial sarcomere length determines thick–thin filament overlap.
Claims: CLM-HULCS103-F99-Q110-LENGTH-TENSION-01
Citations: CIT-HULCS103-F99-Q110-LENGTH-TENSION-01
Span: SPN-HULCS103-F99-Q110-LENGTH-TENSION-01`,
  evidence_basis: 'Direct named-instructor Family-99 quiz bank, physical page 2, supplies exact Q8 wording and printed key B. The local Helwan muscle lecture and the Kasr 103 physiology source support the Draft mechanism but are not independent medical verification.',
  publication_gate: 'needs_evidence',
  conflicts: '[clear]',
  evidence_gaps: 'Independent medical verification and named Helwan Physiology faculty review are required before publication.',
  notes: 'This bounded article exists because the governed Kasr length–tension article still has unfilled evidence-link fields and cannot pass the production audit without a shared-file change.',
  last_reviewed: '',
  review_due: '',
  field_notes: `arabicTitle: Blank because no reviewed Arabic title was present.
nanotopicId: No reviewed nanotopic exists below the assigned node.
media: No media is required by this text-only question.
publishedSummary: Blank because this remains Draft.
publishedSections: Blank because this remains Draft.
lastReviewed: New record; no named medical reviewer has completed review.
reviewDue: Set after first named medical review.`,
}]

const claims = [{
  id: 'CLM-HULCS103-F99-Q110-LENGTH-TENSION-01',
  concept_id: 'CON-MSK-01E9132FDDF9F2',
  subject: 'Skeletal-muscle contraction strength',
  predicate: 'is related to',
  object: 'the initial muscle length through its effect on sarcomere filament overlap',
  display_text: 'Skeletal-muscle contraction strength is related to initial length through its effect on sarcomere filament overlap.',
  risk_class: 'foundational_stable',
  verification_status: 'needs_evidence',
  conflict_status: 'none',
  confidence: '0.8',
  freshness: 'stable_local_assessment_fact',
  time_sensitive: 'no',
  qualifiers: 'polarity: affirmative\nauthority: direct local assessment plus local curriculum support, not independent verification\nassessment boundary: Family-99 Q8 only',
}]

const citations = [{
  id: 'CIT-HULCS103-F99-Q110-LENGTH-TENSION-01',
  claim_id: 'CLM-HULCS103-F99-Q110-LENGTH-TENSION-01',
  resource_id: source.assessment,
  evidence_role: 'local_assessment',
  locator_type: 'page',
  locator_page: '2',
  locator_section: 'Printed Q8',
  locator_detail: 'Physical Family-99 page 2, printed Q8 and right-column key B.',
  support_span: 'Contraction strength is related to initial length.',
  context_note: 'Exact source wording is preserved; the overlap mechanism remains Draft pending independent verification.',
  confidence: '0.8',
  counts_as_claim_evidence: 'no',
}]

const spans = [{
  id: 'SPN-HULCS103-F99-Q110-LENGTH-TENSION-01',
  article_id: lengthArticle,
  section_id: 'art-hu-lcs103-phy-f99-q1-10-length-tension-key-determinants',
  text: 'Skeletal-muscle contraction strength is related to initial length because initial sarcomere length determines thick–thin filament overlap.',
  claim_ids: 'CLM-HULCS103-F99-Q110-LENGTH-TENSION-01',
  citation_ids: 'CIT-HULCS103-F99-Q110-LENGTH-TENSION-01',
}]

const rows = [
  [1, 1, 'isometric', 'D', 'In isometric contraction:', ['There is change in muscle length.', 'Mechanical efficiency is about 25%.', 'Can occur for long duration.', 'Usually occurs during standing to maintain body posture']],
  [2, 1, 'sarcomere', 'B', 'A healthy 22-year-old person lifts weights as a part of his regular his biceps muscle contracts isotonically. Which one of the following does not change its length in this process when compared to when the muscle is at rest?', ['I band.', 'A band.', 'H zone.', 'Sarcomere.']],
  [4, 1, 'types', 'B', 'Muscles that are involuntary in action are:', ['Smooth and skeletal muscles.', 'Cardiac and smooth muscles.', 'Skeletal and cardiac muscles.', 'Skeletal muscles.']],
  [8, 2, 'lengthTension', 'B', 'Skeletal muscle:', ['Contracts when Ca2+ is taken up by Sarcoplasmic reticulum.', 'Contraction strength is related to initial length.', 'Contract spontaneously.', 'Actin and myosin filaments shorten when it contracts.']],
  [10, 2, 'coupling', 'C', 'The function of T-tubules is to:', ['Move extracellular fluid into the sarcolemma.', 'Dampen the spread of the action potential.', 'Allow for rapid spread of the action potential', 'Increase extracellular Ca2+ concentrations.']],
]

const common = {
  subject: 'msk',
  status: 'Draft',
  owner: 'Helwan Year-1 authoring lane',
  vignette: '',
  format: 'single best answer',
  written_parts: '',
  matching_options: '',
  matching_prompts: '',
  correct_answers: '',
  labeling_image: '',
  labeling_alt: '',
  labeling_points: '',
  completion_text: '',
  derived_from: '',
  topic: 'Musculoskeletal system',
  subtopic: 'Muscle physiology',
  difficulty: 'Easy',
  question_type: 'Physiology',
  module: 'HU-LCS-103',
  module_subject: 'HU-LCS-103 > Physiology > Muscle Physiology',
  clinical_relevance: '0.55',
  academic_relevance: '0.95',
  cognitive_effort_score: '0.3',
  exam_weight_by_year: 'HU_Y1=0.8',
  question_only_for: 'HU_Y1',
  concept_ids: '',
  years: 'HU_Y1',
  universities: 'hu',
  cognitive_effort: 'Low',
  setting: 'Academic',
  reasoning_level: '1',
  inferred_difficulty: '74',
  exam_relevance: '8',
  contextual_concept_ids: '',
  media_recommendations: '',
  attachments: '',
  attached_image: '',
  estimated_seconds: '55',
  randomise_answers: 'yes',
}

const questions = rows.map(([number, page, code, key, stem, options]) => {
  const spec = specs[code]
  const fields = { id: `Q-HU-LCS103-PHY-F99-${number}`, title: stem, ...common, question: stem, correct_answer: key }
  options.forEach((text, index) => {
    const letter = String.fromCharCode(65 + index)
    fields[`answer_${letter.toLowerCase()}`] = text
    fields[`explanation_${letter.toLowerCase()}`] = letter === key
      ? `The direct Family-99 quiz bank prints ${key} as the answer, so this is the exact source-keyed response. ${spec.teaching} The record remains Draft because the local printed key is assessment evidence and has not received independent medical verification.`
      : `This option is retained exactly from the Family-99 quiz bank, but the printed right-column key selects ${key} instead. ${spec.teaching} The record remains Draft pending named Helwan Physiology faculty review and independent medical verification.`
  })
  for (const letter of ['a', 'b', 'c', 'd', 'e', 'f']) {
    if (!Object.hasOwn(fields, `answer_${letter}`)) {
      fields[`answer_${letter}`] = ''
      fields[`explanation_${letter}`] = ''
    }
  }
  return {
    ...fields,
    main_concept: spec.concept,
    library_ids: spec.article,
    resource_ids: `${source.assessment}\n${source.helwan}\n${source.kasr}`,
    learning_objective: spec.objective,
    source_citation: `${source.assessment}, physical PDF p${page}, printed Q${number}: exact source stem/options with right-column printed key ${key}. Draft explanation support: ${source.helwan} and ${source.kasr}.`,
    author_notes: `Transcribed as exact source wording from Family 99 physical p${page}; spelling, capitalisation, punctuation, option order and printed key are preserved. No exact wording/option-set repeat occurs inside Q1–Q10. Q3, Q5, Q6, Q7 and Q9 each print only three options and are held rather than imported under the current four-to-five-option contract. No mark, media dependency, placeholder option or corrected answer is inferred.`,
  }
})

if (questions.length !== 5 || questions.map((row) => row.correct_answer).join('') !== 'DBBBC') throw new Error('Family-99 Q1–Q10 importer-valid count or key mismatch')
await Promise.all(Object.values(paths).map((path) => mkdir(dirname(path), { recursive: true })))
await writeFile(paths.concepts, concepts.map(item).join(divider), 'utf8')
await writeFile(paths.articles, articles.map(item).join(divider), 'utf8')
await writeFile(paths.questions, questions.map(item).join(divider), 'utf8')
await writeFile(paths.claims, claims.map(item).join(divider), 'utf8')
await writeFile(paths.citations, citations.map(item).join(divider), 'utf8')
await writeFile(paths.spans, spans.map(item).join(divider), 'utf8')
console.log(JSON.stringify({ files: paths, counts: { concepts: concepts.length, articles: articles.length, questions: questions.length, claims: claims.length, citations: citations.length, spans: spans.length }, keys: questions.map((row) => row.correct_answer).join(''), heldThreeOptionRecords: ['Q3', 'Q5', 'Q6', 'Q7', 'Q9'], practical: 0, written: 0, media: 0 }, null, 2))
