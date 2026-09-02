#!/usr/bin/env node

import { readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../..')
const base = resolve(root, 'docs/Helwan-Source-Imports')
const paths = {
  concepts: resolve(base, 'concept/HU-LCS-103-family163-q74-77-concepts.md'),
  articles: resolve(base, 'article/HU-LCS-103-family163-q74-77-articles.md'),
  claims: resolve(base, 'evidence/HU-LCS-103-family163-q74-77-claims.md'),
  citations: resolve(base, 'evidence/HU-LCS-103-family163-q74-77-citations.md'),
  spans: resolve(base, 'evidence/HU-LCS-103-family163-q74-77-spans.md'),
  questions: resolve(base, 'question/HU-LCS-103-family163-q74-77-mcq.md'),
}
const divider = '\n\n---\n\n'
const item = (fields) => `# Item\n\n${Object.entries(fields).map(([key, value]) => `## ${key}\n${value ?? ''}`).join('\n\n')}\n`
const parseItems = (text) => text.split(/\n\n---\n\n/).filter(Boolean).map((block) => Object.fromEntries(
  [...block.matchAll(/^## ([^\n]+)\n([\s\S]*?)(?=\n(?:\n)?## |(?![\s\S]))/gm)].map((match) => [match[1], match[2].trim()]),
))
const appendText = (baseText, addition) => `${baseText}\n\n${addition}`
const uniqueLines = (...values) => [...new Set(values.flat(Infinity).flatMap((value) => String(value ?? '').split('\n')).filter(Boolean))].join('\n')

const source = { assessment: 'src_79b5752c4d6f23e6dafc', teaching: 'src_3328fde7f743cd67dc9f' }
const articleId = 'ART-HU-LCS103-PAT-F163-TUMOUR-PATTERNS'
const conceptIds = { osteochondroma: 'CON-MSK-B26274E881BA5A', giant: 'CON-MSK-319E7EB6D0E26A' }

const conceptFiles = [
  'concept/HU-LCS-103-family102-q1-11-bone-tumour-concepts.md',
  'concept/HU-LCS-103-family102-q12-17-selected-bone-tumour-concepts.md',
]
const currentConcepts = new Map()
for (const file of conceptFiles) for (const row of parseItems(await readFile(resolve(base, file), 'utf8'))) currentConcepts.set(row.id, row)
const currentArticles = new Map(parseItems(await readFile(resolve(base, 'article/HU-LCS-103-family163-q59-73-articles.md'), 'utf8')).map((row) => [row.id, row]))
const requireCurrent = (map, id) => {
  const row = map.get(id)
  if (!row) throw new Error(`Missing governed row ${id}`)
  return structuredClone(row)
}

const claimSpecs = [
  {
    code: 'OSTEOCHONDROMA-Q74', concept: conceptIds.osteochondroma, questions: [74], page: '33', teachingPage: '3-8', teachingSection: 'Osteochondroma and exostosis',
    direct: 'Q74 carries a red handwritten C beside the occurrence and the formal key prints C, Osteochondroma.',
    teaching: 'The governed Helwan bone-tumour material supports bounded metaphyseal exostosis and cartilage-capped bony-outgrowth context; it does not independently reproduce every literal relation in Q74.',
    text: 'Family-163 Q74 preserves Osteochondroma as the source-keyed diagnosis for a painless stalked lateral bony projection from the lower femoral metaphysis.',
    object: 'Osteochondroma as the printed diagnosis for the exact stalked metaphyseal projection occurrence',
  },
  {
    code: 'GIANT-CELL-Q76-77', concept: conceptIds.giant, questions: [76, 77], page: '34', teachingPage: '38', teachingSection: 'Giant-cell tumour of bone',
    direct: 'Q76 carries a red handwritten B and the formal key prints B, Giant cell tumor; Q77 carries a red handwritten E and the formal key prints E, Multinucleated cells admixed with stromal cells.',
    teaching: 'The governed Helwan bone-tumour material supplies bounded epiphyseal, giant-cell and stromal-cell context for giant-cell tumour of bone.',
    text: 'Family-163 Q76 and Q77 preserve two separate giant-cell-tumour occurrences: Q76 asks for the diagnosis and Q77 asks for the characteristic histology.',
    object: 'two separate source-keyed giant-cell-tumour diagnosis and histology occurrences',
  },
]

const updateConcept = ({ id, claimId, definition, objective, pitfalls, signal, uncertainty }) => {
  const row = requireCurrent(currentConcepts, id)
  row.definition = appendText(row.definition, definition)
  row.explicit_objective = appendText(row.explicit_objective, objective)
  row.pitfalls = appendText(row.pitfalls, pitfalls)
  row.article_ids = uniqueLines(row.article_ids, articleId)
  row.related_article_ids = uniqueLines(row.related_article_ids, articleId)
  row.resource_ids = uniqueLines(row.resource_ids, source.assessment, source.teaching)
  row.atomic_claim_ids = uniqueLines(row.atomic_claim_ids, claimId)
  row.exam_signal = appendText(row.exam_signal, signal)
  row.original_wording = appendText(row.original_wording, signal)
  row.uncertainty = uniqueLines(row.uncertainty === '[clear]' ? '' : row.uncertainty, uncertainty)
  return row
}

const concepts = [
  updateConcept({
    id: conceptIds.osteochondroma, claimId: 'CLM-HULCS103-F163-OSTEOCHONDROMA-Q74-01',
    definition: 'Family-163 Q74 adds a painless stalked lateral bony projection from the lower femoral metaphysis and prints Osteochondroma.',
    objective: 'Identify Osteochondroma as the exact printed diagnosis for the Q74 metaphyseal projection occurrence.',
    pitfalls: 'Preserve “he claims” and “projection with stalk, from the lower femoral metaphysis”; do not normalise the wording or expand it into a clinical rule.',
    signal: 'Family-163 Q74 prints C in its formal key and red handwritten answer layer.',
    uncertainty: 'The assessment relation is locally keyed; the teaching source supports only bounded osteochondroma context and named faculty review remains required.',
  }),
  updateConcept({
    id: conceptIds.giant, claimId: 'CLM-HULCS103-F163-GIANT-CELL-Q76-77-01',
    definition: 'Family-163 Q76 adds Giant cell tumor as the diagnosis for the epiphyseal soap-bubble lesion with multinucleated cells and stromal cells. Q77 separately keys Multinucleated cells admixed with stromal cells as the characteristic histology.',
    objective: 'Keep Q76 and Q77 as separate diagnosis-versus-histology occurrences while preserving their exact keys.',
    pitfalls: 'Do not collapse the two occurrences, repair “soap bubble”, or substitute one occurrence’s lead-in and option set for the other.',
    signal: 'Family-163 Q76 prints B and Q77 prints E in both answer layers.',
    uncertainty: 'The two answer layers are locators within one course-bank source and are not independent official-key evidence.',
  }),
]

const article = requireCurrent(currentArticles, articleId)
const extension = `### Family-163 Q74-Q77 closure\n${claimSpecs.map((spec) => spec.text).join('\n\n')}\n\n### Source boundary\nQ74, Q76 and Q77 have agreeing red and formal key layers, but both layers belong to the same course-bank source. Family-163 ends at Q77. Q75 remains held because its formal key prints B while its red handwritten layer prints D; its right-elbow history and left-olecranon examination wording are also preserved without repair.\n\n### Clinical significance\nThese Draft additions distinguish an osteochondroma diagnosis from giant-cell-tumour diagnosis and histology objectives. They are assessment explanations, not clinical protocols, and named Helwan faculty review remains required.`
article.sections = appendText(article.sections, extension)
article.hold_these = appendText(article.hold_these, claimSpecs.map((spec) => spec.text).join('\n'))
article.related_concepts = uniqueLines(article.related_concepts, Object.values(conceptIds))
article.question_ids = uniqueLines(article.question_ids, 'Q-HU-LCS103-MSK-F163-74', 'Q-HU-LCS103-MSK-F163-76', 'Q-HU-LCS103-MSK-F163-77')
article.resource_ids = uniqueLines(article.resource_ids, source.assessment, source.teaching)
article.article_source_ids = uniqueLines(article.article_source_ids, source.assessment, source.teaching)
article.claim_ids = uniqueLines(article.claim_ids, claimSpecs.map((spec) => `CLM-HULCS103-F163-${spec.code}-01`))
article.span_ids = uniqueLines(article.span_ids, claimSpecs.map((spec) => `SPN-HULCS103-F163-${spec.code}-01`))
article.annotations = appendText(article.annotations, claimSpecs.map((spec) => `### definition_of · ${spec.concept}\nQuote: ${spec.text}\nBlock: Family-163 Q74-Q77 closure`).join('\n\n'))
article.callout_evidence = appendText(article.callout_evidence, claimSpecs.map((spec) => `### ${spec.text}\nClaims: CLM-HULCS103-F163-${spec.code}-01\nCitations: CIT-HULCS103-F163-${spec.code}-ASSESS-01, CIT-HULCS103-F163-${spec.code}-TEACH-01\nSpan: SPN-HULCS103-F163-${spec.code}-01`).join('\n\n'))
article.conflicts = uniqueLines(article.conflicts === '[clear]' ? '' : article.conflicts, 'Q75 is excluded: formal key B conflicts with red handwritten D; right-elbow history also conflicts with left-olecranon examination wording.')
article.notes = appendText(article.notes, 'This metadata-preserving same-ID update retains every prior link and university field. Family-163 ends at Q77; Q75 adds no student-facing record.')
const articles = [article]

const claims = claimSpecs.map((spec) => ({
  id: `CLM-HULCS103-F163-${spec.code}-01`, concept_id: spec.concept, subject: spec.code.replaceAll('-', ' '), predicate: 'is presented in the governed local sources as', object: spec.object,
  display_text: spec.text, risk_class: 'foundational_stable', verification_status: 'needs_evidence', conflict_status: 'none', confidence: '0.82', freshness: 'stable_local_curriculum_fact', time_sensitive: 'no',
  qualifiers: 'polarity: affirmative\nauthority: local Helwan course-bank assessment plus bounded same-university teaching context, not independent verification\nassessment boundary: Family-163 Q74-Q77 excluding held Q75',
}))
const citations = claimSpecs.flatMap((spec) => [
  { id: `CIT-HULCS103-F163-${spec.code}-ASSESS-01`, claim_id: `CLM-HULCS103-F163-${spec.code}-01`, resource_id: source.assessment, evidence_role: 'direct_assessment_support', locator_type: 'page', locator_page: spec.page, locator_section: `Family-163 Q${spec.questions.join('/Q')} prompt and red answer; formal key p37`, locator_detail: `Family-163 physical PDF p${spec.page}, exact occurrence and red answer; formal KEY ANSWERS p37.`, support_span: spec.direct, context_note: 'Direct local assessment support for Draft content; the red and formal layers belong to the same source.', confidence: '0.84', counts_as_claim_evidence: 'no' },
  { id: `CIT-HULCS103-F163-${spec.code}-TEACH-01`, claim_id: `CLM-HULCS103-F163-${spec.code}-01`, resource_id: source.teaching, evidence_role: 'local_curriculum_support', locator_type: 'page', locator_page: spec.teachingPage, locator_section: spec.teachingSection, locator_detail: 'Governed Helwan bone-tumour teaching support used only within the stated boundary.', support_span: spec.teaching, context_note: 'Bounded explanation support; the direct Family-163 source remains the owner of the exact keyed occurrence.', confidence: '0.80', counts_as_claim_evidence: 'no' },
])
const spans = claimSpecs.map((spec) => ({ id: `SPN-HULCS103-F163-${spec.code}-01`, article_id: articleId, section_id: `${articleId.toLowerCase()}-family-163-q74-q77-closure`, text: spec.text, claim_ids: `CLM-HULCS103-F163-${spec.code}-01`, citation_ids: `CIT-HULCS103-F163-${spec.code}-ASSESS-01\nCIT-HULCS103-F163-${spec.code}-TEACH-01` }))

const questionRows = [
  [74, 'C', 'A 25-year-old man has noticed a lateral deformity in his left knee that has developed over the course of several months. He claims that it is painless and has only caused him slight discomfort. Radiology of the knee reveals a lateral bony projection with stalk, from the lower femoral metaphysis. What is the most likely diagnosis?', ['Enchondroma', 'Osteoblastoma', 'Osteochondroma', 'Osteoid osteoma', 'Osteoma'], conceptIds.osteochondroma, '33', 'The phrases “he claims” and “projection with stalk, from the lower femoral metaphysis” are preserved without repair.'],
  [76, 'B', 'A 30-year-old man presents with painful swelling in his right knee for the past 3 weeks. On radiological examination, there is a proximal tibial epiphyseal lytic lesion surrounded by a thin rim of bone with a "soap bubble" appearance. Curettage is performed. Microscopic examination reveals osteoclastic multinucleated cells admixed with stromal cells. Which of the following is the most likely diagnosis?', ['Chondrosarcoma', 'Giant cell tumor', 'Osteoid osteoma', 'Osteosarcoma', 'Tuberculosis'], conceptIds.giant, '34', 'Q76 is retained as the diagnosis occurrence and is not collapsed into Q77.'],
  [77, 'E', 'A 28-year-old man presents with pain in his left knee for the past 3 weeks. Physical examination reveals tender swelling of the left knee. On radiological examination, there is a proximal tibial epiphyseal lytic lesion surrounded by a thin rim of bone with a "soap bubble" appearance. Curettage is performed. What are the characteristic findings of such lesions upon histological examination?', ['Anaplastic cells producing osteoid', 'Atypical chondrocytes in a cartilaginous matrix', 'Blood filled cystic spaces', 'Numerous histiocyte-like cells', 'Multinucleated cells admixed with stromal cells'], conceptIds.giant, '34', 'Q77 is retained as the histology occurrence and is not collapsed into Q76.'],
]
const objectiveByConcept = Object.fromEntries(concepts.map((row) => [row.id, row.explicit_objective.split('\n').at(-1)]))
const common = { subject: 'msk', status: 'Draft', owner: 'Helwan Year-1 authoring lane', vignette: '', format: 'single best answer', written_parts: '', matching_options: '', matching_prompts: '', correct_answers: '', labeling_image: '', labeling_alt: '', labeling_points: '', completion_text: '', derived_from: '', topic: 'Musculoskeletal system', subtopic: 'Bone tumours', difficulty: 'Moderate', question_type: 'Integrated LCS', module: 'HU-LCS-103', module_subject: 'HU-LCS-103 > Integrated Musculoskeletal Assessment', clinical_relevance: '0.82', academic_relevance: '0.98', cognitive_effort_score: '0.42', exam_weight_by_year: 'HU_Y1=0.84', question_only_for: 'HU_Y1', concept_ids: '', years: 'HU_Y1', universities: 'hu', cognitive_effort: 'Medium', setting: 'Academic', reasoning_level: '1', inferred_difficulty: '68', exam_relevance: '9', contextual_concept_ids: '', media_recommendations: '', attachments: '', attached_image: '', estimated_seconds: '75', randomise_answers: 'yes' }
const questions = questionRows.map(([number, key, stem, options, concept, page, risk]) => {
  const fields = { id: `Q-HU-LCS103-MSK-F163-${number}`, title: stem, ...common, question: stem, correct_answer: key }
  for (let index = 0; index < 5; index += 1) {
    const letter = String.fromCharCode(97 + index)
    fields[`answer_${letter}`] = options[index]
    fields[`explanation_${letter}`] = index === key.charCodeAt(0) - 65
      ? `Family-163 prints ${key} in both its formal key and red handwritten answer layer for this exact occurrence, so “${options[index]}” remains the source-keyed response. The linked Draft article preserves the complete wording and evidence boundary. ${risk} Both answer layers belong to one course-bank source and are not independent verification.`
      : `The option “${options[index]}” is preserved exactly from Family-163, but both source answer layers select ${key} instead. The linked Draft article explains only the bounded local distinction without rewriting the occurrence or inferring another answer. ${risk} This record remains Draft pending independent medical verification and named Helwan faculty review.`
  }
  return { ...fields, main_concept: concept, library_ids: articleId, resource_ids: `${source.assessment}\n${source.teaching}`, learning_objective: objectiveByConcept[concept], source_citation: `${source.assessment}, physical PDF p${page}, printed Q${number}: exact stem/options and red answer; formal KEY ANSWERS p37 prints ${key}.`, author_notes: `Transcribed from governed Family-163 physical p${page}; wording, option order, punctuation and key are preserved without repair. ${risk} Q75 remains held because formal key B conflicts with red handwritten D; its right-elbow history and left-olecranon examination contradiction are also preserved. Family-163 ends at Q77. The bank names an author and collectors but no official exam sitting, cohort, date or marks. No practical, written or media record is inferred.` }
})

if (questions.length !== 3 || questions.map((row) => row.correct_answer).join('') !== 'CBE') throw new Error('Question count/key mismatch')
if (concepts.length !== 2 || articles.length !== 1 || claims.length !== 2 || citations.length !== 4 || spans.length !== 2) throw new Error('Approved delta mismatch')
if (questions.some((row) => Object.hasOwn(row, 'explanation'))) throw new Error('Generic explanation header forbidden')

await Promise.all([
  writeFile(paths.concepts, concepts.map(item).join(divider), 'utf8'),
  writeFile(paths.articles, articles.map(item).join(divider), 'utf8'),
  writeFile(paths.claims, claims.map(item).join(divider), 'utf8'),
  writeFile(paths.citations, citations.map(item).join(divider), 'utf8'),
  writeFile(paths.spans, spans.map(item).join(divider), 'utf8'),
  writeFile(paths.questions, questions.map(item).join(divider), 'utf8'),
])

console.log(JSON.stringify({ counts: { questions: 3, concepts: 2, newConcepts: 0, conceptUpdates: 2, articles: 1, newArticles: 0, articleUpdates: 1, claims: 2, citations: 4, spans: 2, resources: 0, written: 0, practical: 0, media: 0 }, keys: 'CBE', held: ['Q75 formal B / red D plus right/left contradiction'], boundary: 'Family-163 ends at Q77' }, null, 2))
