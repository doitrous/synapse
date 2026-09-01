#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../..')
const base = resolve(root, 'docs/Helwan-Source-Imports')
const paths = {
  concepts: resolve(base, 'concept/HU-LCS-103-family176-popliteal-fossa-concept.md'),
  articles: resolve(base, 'article/HU-LCS-103-family176-popliteal-fossa-article.md'),
  sources: resolve(base, 'evidence/HU-LCS-103-family176-sources.md'),
  claims: resolve(base, 'evidence/HU-LCS-103-family176-claims.md'),
  citations: resolve(base, 'evidence/HU-LCS-103-family176-citations.md'),
  spans: resolve(base, 'evidence/HU-LCS-103-family176-spans.md'),
  questions: resolve(base, 'question/HU-LCS-103-family176-mcq.md'),
}
const divider = '\n\n---\n\n'
const item = (fields) => `# Item\n\n${Object.entries(fields).map(([key, value]) => `## ${key}\n${value ?? ''}`).join('\n\n')}\n`

const ids = {
  concept: 'CON-MSK-C30EB62DB34996',
  article: 'ART-HU-LCS103-ANA-F176-POPLITEAL-FOSSA',
  assessment: 'src_00ec490d3c55b87835f5',
  teaching: 'src_0e30d32f2bc49e81e838',
}
const questions = [
  {
    id: 'Q-HU-LCS103-ANA-F176-01',
    stem: 'The popliteal fossa is located at which part of the body?',
    key: 'B',
    options: ['Anterior thigh', 'Posterior knee', 'Medial ankle', 'Lateral hip'],
    objective: 'Identify the exact regional location selected by the Family-176 self-test.',
    page: '7',
    risk: 'The source teaching describes a broader site around the lower thigh, knee and upper leg, while the literal keyed option compresses the answer to `Posterior knee`; the item is preserved without expansion or repair.',
  },
  {
    id: 'Q-HU-LCS103-ANA-F176-02',
    stem: 'Which of the following structures forms the superolateral boundary of the popliteal fossa?',
    key: 'B',
    options: ['Semitendinosus', 'Biceps femoris', 'Gastrocnemius (lateral head)', 'Plantaris'],
    objective: 'Identify the muscle forming the superolateral boundary of the popliteal fossa.',
    page: '7',
    risk: 'The exact stem, parenthesised option wording and highlighted response are retained as printed; the yellow highlight is source answer evidence rather than an official marking guide.',
  },
  {
    id: 'Q-HU-LCS103-ANA-F176-03',
    stem: 'Which structure is the deepest within the popliteal fossa?',
    key: 'A',
    options: ['Popliteal artery', 'Popliteal vein', 'Tibial nerve', 'Common fibular nerve'],
    objective: 'Recognise the source-taught neurovascular depth order within the popliteal fossa.',
    page: '7',
    risk: 'The direct source uses the literal teaching phrase `the most deep`; the MCQ wording and highlighted A are preserved without converting this regional depth item into a broader popliteal-artery concept.',
  },
]
const qids = questions.map((q) => q.id).join('\n')
const claimIds = {
  location: 'CLM-HULCS103-F176-POPLITEAL-LOCATION-01',
  boundary: 'CLM-HULCS103-F176-POPLITEAL-BOUNDARY-01',
  depth: 'CLM-HULCS103-F176-POPLITEAL-DEPTH-01',
}
const spanIds = {
  location: 'SPN-HULCS103-F176-POPLITEAL-LOCATION-01',
  boundary: 'SPN-HULCS103-F176-POPLITEAL-BOUNDARY-01',
  depth: 'SPN-HULCS103-F176-POPLITEAL-DEPTH-01',
}
const claimText = {
  location: 'The popliteal fossa is a diamond-shaped region on the posterior aspect of the knee, and Family-176 Q1 marks “Posterior knee.”',
  boundary: 'Biceps femoris forms the superolateral boundary of the popliteal fossa, and Family-176 Q2 marks that option.',
  depth: 'The popliteal artery is the deepest of the principal neurovascular structures in the popliteal fossa, and Family-176 Q3 marks it.',
}

const concepts = [{
  label: 'The popliteal fossa is the diamond-shaped posterior-knee region bounded by hamstrings above and gastrocnemius below, containing the popliteal neurovascular structures with the artery deepest',
  id: ids.concept,
  canonical_key: 'knee.popliteal-fossa-location-boundaries-contents',
  aliases: 'Popliteal fossa\nPosterior knee space\nPopliteal fossa boundaries and contents',
  arabic_label: '', arabic_aliases: '', status: 'under review', support_mode: 'direct_statement', subject: 'msk',
  primary_node_id: 'SYS-MSK', secondary_node_ids: 'DIS-ANA-T03', topic: 'Musculoskeletal system', subtopic: 'Lower limb anatomy', nanotopic: '',
  modules: 'HU-LCS-103', module_subject: 'HU-LCS-103 > Anatomy > Lower Limb > Popliteal Fossa', universities: 'hu', learner_years: '1',
  approved_file_resource_ids: '[clear]', approved_video_resource_ids: '[clear]', blueprint_weight: '0.84', exam_weight_by_year: 'HU_Y1=0.84',
  clinical_relevance: '0.78', academic_relevance: '0.99', weight_confidence: '0.62', confidence: '0.84', resource_occurrence_ids: '[clear]',
  source_candidate_ids: '[clear]', merge_ids: '[clear]',
  rejected_merge_candidate_ids: 'Four exact-scope searches found no record owning the complete popliteal-fossa location, boundaries, roof, floor and contents objective. Pending popliteal-artery records are narrower vessel concepts and are not rivals.',
  evidence_gaps: 'The three answers are yellow-highlighted self-test selections rather than an official marking guide. Independent medical verification and named Helwan Anatomy faculty review are required before publication.',
  owner: 'Helwan Year-1 authoring lane', reviewer: 'Medical team, Helwan Anatomy faculty', final_publisher: 'Admin team', last_reviewed: '', review_due: '',
  publication_status: 'needs_evidence', editorial_review_status: 'drafted_not_reviewed', exclusion_reason: '',
  definition: 'The popliteal fossa is a diamond-shaped space on the posterior aspect of the knee. Its superomedial boundary is formed by semimembranosus and semitendinosus, its superolateral boundary by biceps femoris, and its inferior boundaries by the heads of gastrocnemius, with plantaris contributing inferolaterally. Its principal contents include the popliteal artery and vein, tibial nerve and common fibular nerve; among the main neurovascular structures, the popliteal artery is deepest.',
  explicit_objective: 'Locate the popliteal fossa, identify its superolateral boundary, and order its principal neurovascular contents by depth.',
  pitfalls: 'Do not expand the literal Q1 option `Posterior knee` into a rewritten response. Do not reverse the depth order: the artery is deepest, with the vein and tibial nerve progressively more superficial. Do not infer labels for the five unresolved a–e callouts on Family-176 p3.',
  concept_type: 'anatomy_region', microtopic: 'Popliteal fossa location, boundaries and contents', article_ids: ids.article, related_article_ids: ids.article,
  resource_ids: `${ids.assessment}\n${ids.teaching}`, exam_signal: 'Family-176 p7 self-test prints three four-option occurrences and yellow-highlights B, B and A.',
  atomic_claim_ids: Object.values(claimIds).join('\n'),
  original_wording: questions.map((q, index) => `[Family-176 Q${index + 1}] ${q.stem} ${q.key}) ${q.options['ABCD'.indexOf(q.key)]}`).join('\n'),
  conflicts: '[clear]',
  uncertainty: 'Visible attribution `Dr/ M. Ali` and metadata author `Mohamed Mamdouh AbdAziz` are distinct provenance layers. Family-42 teaching support has an isolated `LCS - 105` footer discrepancy on p3. Neither caution changes the preserved source-marked keys.',
  field_notes: 'microtopicId: The reviewed taxonomy stops at the lower-limb anatomy node; the named regional microtopic is retained as prose.\nnanotopicId: No reviewed nanotopic ID exists beneath the assigned node.\napprovedFileResourceIds: Neither local PDF is rights-cleared for student redistribution.\napprovedVideoResourceIds: No video is assigned.\nresourceOccurrenceIds: Hand-authored from governed local PDF pages; no extraction-occurrence record exists.\nsourceCandidateIds: Four governed exact-scope searches completed before minting.\nmergeIds: No concepts were merged.\nlastReviewed: New record; no faculty review has occurred.\nreviewDue: Set after first faculty review.\nexclusionReason: Not excluded; held at needs_evidence.\narabicLabel: Blank pending reviewed Arabic terminology.\narabicAliases: Blank pending reviewed Arabic terminology.',
}]

const articleSections = [
  '### Definition',
  'The popliteal fossa is a diamond-shaped region on the posterior aspect of the knee. Its position makes it the transition space between the distal thigh and proximal leg. Family-176 Q1 retains the concise option “Posterior knee” as the highlighted response.',
  '', '### Mechanism',
  'The four muscular borders create the diamond-shaped passage behind the knee: semimembranosus and semitendinosus form the superomedial boundary, biceps femoris forms the superolateral boundary, and the heads of gastrocnemius form the inferior boundaries, with plantaris also listed inferolaterally. The roof comprises skin, superficial fascia and popliteal fascia. The floor is formed successively by the popliteal surface of the femur, the back of the knee-joint capsule and fascia over popliteus.',
  '', '### Key determinants',
  'The supplied teaching lists the popliteal artery, popliteal vein, tibial nerve and common fibular nerve among the contents. In the central neurovascular depth order, the artery lies deepest, the vein is superficial to it and the tibial nerve is more superficial. Family-176 Q3 therefore retains the yellow-highlighted A without widening the item into the artery’s complete origin, course and branch anatomy.',
  '', '### Clinical significance',
  'The fossa carries major nerves and vessels across the posterior knee, so recognising its borders and the artery’s deep position provides the regional framework for interpreting posterior-knee lesions. Family-176 is an attributed local teaching summary with an embedded self-test, not a recoverable examination or official marking guide. Its yellow highlights consistently mark one option in each question, while the visible lecturer name, metadata author and Family-42 footer discrepancy remain explicit provenance cautions.',
  '', '### Common misconceptions',
  'Five a–e callouts appear on a Family-176 page-three teaching diagram without a local legend or learner instruction. They are not converted into a practical plate, mapping task or answer key. No label is inferred from neighbouring diagrams or from external anatomy knowledge.',
  '', '### Source-bound statements',
  claimText.location, claimText.boundary, claimText.depth,
].join('\n')

const articles = [{
  id: ids.article, title: 'Popliteal fossa: location, boundaries and neurovascular depth', aliases: 'Posterior knee space\nPopliteal fossa boundaries\nPopliteal fossa contents and depth',
  arabic_title: '', subject: 'msk', topic: 'Musculoskeletal system', subtopic: 'Lower limb anatomy', primary_node_id: 'SYS-MSK', template_id: 'TPL-CONCEPT',
  archetype: 'concept', language: 'en', learner_stage: 'Years 1–3 foundation', high_yield: 'High', time_sensitive: 'stable', status: 'Draft',
  owner: 'Helwan Year-1 authoring lane', reviewer: 'Medical team, Helwan Anatomy faculty', final_publisher: 'Admin team', published_summary: '', published_sections: '',
  universities: 'hu', years: 'HU_Y1', module: 'HU-LCS-103', media: '', publication_gate: 'needs_evidence', conflicts: '[clear]',
  evidence_gaps: 'The BBA selections are yellow-highlighted answers in a local self-test, not an official key. Independent medical verification and named Helwan Anatomy faculty review are required.',
  last_reviewed: '', review_due: '', microtopic: 'Popliteal fossa location, boundaries and contents', nanotopic: '', secondary_node_ids: 'DIS-ANA-T03', reading_time: '5',
  summary: 'The popliteal fossa is the posterior-knee region bounded by hamstrings and gastrocnemius, with the popliteal artery deepest among its principal neurovascular contents.',
  sections: articleSections,
  hold_these: `${claimText.location}\n${claimText.boundary}\n${claimText.depth}\nFive unlabeled a–e teaching callouts on Family-176 p3 remain held without inference.`,
  lose_the_mark: 'Placing semitendinosus on the superolateral boundary.\nPutting the tibial nerve deeper than the popliteal artery.\nTreating the five unlegended callouts as a practical answer map.',
  related_concepts: ids.concept, related_articles: ids.article, question_ids: qids, resource_ids: `${ids.assessment}\n${ids.teaching}`,
  article_source_ids: `${ids.assessment}\n${ids.teaching}`, claim_ids: Object.values(claimIds).join('\n'), span_ids: Object.values(spanIds).join('\n'),
  module_subject: 'HU-LCS-103 > Anatomy > Lower Limb > Popliteal Fossa',
  university_notes: 'hu: Family-176 supplies the exact BBA self-test occurrences and its own teaching pages. Family-42 supplies corroborating local lecture statements, while its isolated p3 LCS-105 footer discrepancy remains an authority caution.',
  annotations: `### definition_of · ${ids.concept}\nQuote: ${claimText.location}\nBlock: body`, media_recommendations: '',
  evidence_basis: 'Family-176 p7 supplies exact stems, options and yellow-highlighted answers; pp1–3 supply same-source teaching. Governed Helwan Family-42 pp10–15 corroborate location, boundaries and depth without changing the direct keys.',
  notes: 'Visible Family-176 attribution and PDF metadata author are retained separately. All five unlegended p3 callouts remain held; no written, practical or media record is created.',
  field_notes: 'arabicTitle: Blank pending reviewed terminology.\nnanotopicId: No reviewed nanotopic exists.\nmedia: No media is required.\npublishedSummary: Blank because this remains Draft.\npublishedSections: Blank because this remains Draft.\nlastReviewed: No named medical review completed.\nreviewDue: Set after first named review.',
  callout_evidence: Object.entries(claimText).map(([key, text]) => `### ${text}\nClaims: ${claimIds[key]}\nCitations: CIT-HULCS103-F176-${key.toUpperCase()}-ASSESS-01, CIT-HULCS103-F176-${key.toUpperCase()}-TEACH-01\nSpan: ${spanIds[key]}`).join('\n'),
}]

const sources = [
  {
    id: ids.assessment, title: 'Anatomy of Popliteal fossa — attributed teaching summary with keyed self-test', institution: 'Local LCS-103 teaching-summary corpus',
    processing_status: 'native_text', collection_id: 'hu-y1', source_relative_path: 'Year 1/LCS 103/All Subjects/Notes and Summaries/Popliteal fossa.pdf', source_uri: '',
    media_type: 'application/pdf', languages: 'en', publication_date: '', accessed_at: '', page_count: '7', sha256: '00ec490d3c55b87835f52ee61b8e046c467ee141e8a96f9d95b9afd8fed11959',
    rights: 'Local Helwan teaching and assessment material held for internal authoring only. No page image is redistributed.',
    qualification: 'Tier-6 manifest/path-placed local LCS-103 teaching summary. Every page visibly prints `Anatomy of Popliteal fossa` and `Dr/ M. Ali`, while metadata separately names author `Mohamed Mamdouh AbdAziz`; those layers are not conflated. Page 7 contains three self-test MCQs with yellow-highlighted B, B and A, but no sitting, cohort, marks or official key label.',
    confidence: '0.80', is_assessment: 'yes',
  },
  {
    id: ids.teaching, title: 'Posterior Compartment of the thigh And Popliteal Fossa — Dr. Sarah Arakib', institution: 'Local LCS-103 Anatomy theoretical corpus',
    processing_status: 'native_text', collection_id: 'hu-y1', source_relative_path: 'Year 1/LCS 103/Anatomy/Theoretical/Lower Limb/Lec 3 - Posterior Compartment of Thigh & Popliteal Fossa/posterior compartment of thigh and POP. fossa Dr Sarah .pdf', source_uri: '',
    media_type: 'application/pdf', languages: 'en', publication_date: '', accessed_at: '', page_count: '18', sha256: '0e30d32f2bc49e81e838d8eaae5e461b648951e17f3bc8f52ee4ecbf45a67d2a',
    rights: 'Local Helwan teaching material held for internal authoring only. No page image is redistributed.',
    qualification: 'Tier-4 manifest/path-placed local Anatomy lecture. Page 1 visibly names `Dr. Sarah Arakib` and the popliteal-fossa lecture title; metadata names `Shaimaa Helmy`. An isolated p3 footer prints `LCS - 105`, so the module placement is retained with an explicit authority caution. The hash-matched local filename omits the manifest filename’s space before `.pdf`.',
    confidence: '0.82', is_assessment: 'no',
  },
]

const claims = [
  { id: claimIds.location, concept_id: ids.concept, subject: 'Popliteal fossa', predicate: 'is located at', object: 'the posterior aspect of the knee', display_text: claimText.location },
  { id: claimIds.boundary, concept_id: ids.concept, subject: 'Biceps femoris', predicate: 'forms', object: 'the superolateral boundary of the popliteal fossa', display_text: claimText.boundary },
  { id: claimIds.depth, concept_id: ids.concept, subject: 'Popliteal artery', predicate: 'is', object: 'the deepest principal neurovascular structure in the popliteal fossa', display_text: claimText.depth },
].map((claim) => ({ ...claim, risk_class: 'foundational_stable', verification_status: 'needs_evidence', conflict_status: 'none_known', confidence: '0.82', freshness: 'stable_local_curriculum_fact', time_sensitive: 'no', qualifiers: 'polarity: affirmative\nauthority: one local highlighted self-test response plus one local Helwan teaching lecture\npublication: Draft pending named faculty review' }))

const citations = [
  ['LOCATION', claimIds.location, ids.assessment, 'direct_assessment_support', '7', 'Test your self — Q1', 'The popliteal fossa is located at which part of the body? b) Posterior knee', 'Yellow-highlighted B is direct source answer evidence, not an official marking guide.', '0.80'],
  ['LOCATION', claimIds.location, ids.teaching, 'local_curriculum', '10', 'popliteal fossa', 'The is a diamond shaped area located on the posterior aspect of the knee', 'Governed local teaching corroboration; the printed grammar is preserved in the citation span.', '0.84'],
  ['BOUNDARY', claimIds.boundary, ids.assessment, 'direct_assessment_support', '7', 'Test your self — Q2', 'Which of the following structures forms the superolateral boundary of the popliteal fossa? b) Biceps femoris', 'Yellow-highlighted B is direct source answer evidence, not an official marking guide.', '0.80'],
  ['BOUNDARY', claimIds.boundary, ids.teaching, 'local_curriculum', '13', 'Borders', 'Superolateral : biceps femoris.', 'Governed local teaching corroboration; Family-42’s isolated p3 footer discrepancy remains documented at resource level.', '0.84'],
  ['DEPTH', claimIds.depth, ids.assessment, 'direct_assessment_support', '7', 'Test your self — Q3', 'Which structure is the deepest within the popliteal fossa? a) Popliteal artery', 'Yellow-highlighted A is direct source answer evidence, not an official marking guide.', '0.80'],
  ['DEPTH', claimIds.depth, ids.teaching, 'local_curriculum', '14-15', 'Contents / Popliteal artery', 'Contents: Popliteal artery, Popliteal vein, Tibial nerve, Common fibular nerve. Course and relation: the most deep (anterior structure in popliteal fossa.', 'Governed local teaching corroboration; the literal `the most deep` phrase is not silently repaired.', '0.82'],
].map(([tag, claim_id, resource_id, evidence_role, locator_page, locator_section, support_span, context_note, confidence], index) => ({
  id: `CIT-HULCS103-F176-${tag}-${index % 2 === 0 ? 'ASSESS' : 'TEACH'}-01`, claim_id, resource_id, evidence_role, locator_type: 'page', locator_page, locator_section,
  locator_detail: `${resource_id === ids.assessment ? 'Family-176' : 'Family-42'} physical PDF p${locator_page}, exact printed source passage.`, support_span, context_note, confidence, counts_as_claim_evidence: 'no',
}))

const spans = Object.keys(claimText).map((key) => ({
  id: spanIds[key], article_id: ids.article, section_id: `art-hu-lcs103-ana-f176-popliteal-fossa-source-bound-statements`, text: claimText[key],
  claim_ids: claimIds[key], citation_ids: `CIT-HULCS103-F176-${key.toUpperCase()}-ASSESS-01\nCIT-HULCS103-F176-${key.toUpperCase()}-TEACH-01`,
}))

const commonQuestion = {
  subject: 'msk', status: 'Draft', owner: 'Helwan Year-1 authoring lane', vignette: '', format: 'single best answer', written_parts: '', matching_options: '', matching_prompts: '',
  correct_answers: '', labeling_image: '', labeling_alt: '', labeling_points: '', completion_text: '', derived_from: '', topic: 'Musculoskeletal system', subtopic: 'Lower limb anatomy',
  difficulty: 'Moderate', question_type: 'Anatomy', module: 'HU-LCS-103', module_subject: 'HU-LCS-103 > Anatomy > Lower Limb > Popliteal Fossa',
  clinical_relevance: '0.72', academic_relevance: '0.99', cognitive_effort_score: '0.36', exam_weight_by_year: 'HU_Y1=0.84', question_only_for: 'HU_Y1', concept_ids: '',
  years: 'HU_Y1', universities: 'hu', cognitive_effort: 'Moderate', setting: 'Academic', reasoning_level: '1', inferred_difficulty: '56', exam_relevance: '9',
  contextual_concept_ids: '', media_recommendations: '', attachments: '', attached_image: '', estimated_seconds: '60', randomise_answers: 'yes',
}
const questionRows = questions.map((sourceQ, qIndex) => {
  const row = { id: sourceQ.id, title: sourceQ.stem, ...commonQuestion, question: sourceQ.stem, correct_answer: sourceQ.key }
  for (let index = 0; index < sourceQ.options.length; index += 1) {
    const letter = String.fromCharCode(65 + index)
    const option = sourceQ.options[index]
    row[`answer_${letter.toLowerCase()}`] = option
    row[`explanation_${letter.toLowerCase()}`] = letter === sourceQ.key
      ? `Family-176 Q${qIndex + 1} places its yellow answer highlight over ${letter}, “${option},” so that exact response is retained. The linked Draft article limits its explanation to the local popliteal-fossa teaching supported by Family-176 and Family-42. The highlight is source answer evidence rather than an official marking guide, and the item remains Draft pending named Helwan Anatomy faculty review.`
      : `The option “${option}” is preserved exactly from Family-176, but the page’s yellow highlight selects ${sourceQ.key}, “${sourceQ.options['ABCD'.indexOf(sourceQ.key)]},” instead. The linked Draft article explains the bounded location, boundary or depth relation without rewriting this distractor. The highlight is source answer evidence rather than an official marking guide, and the item remains Draft pending named Helwan Anatomy faculty review.`
  }
  row.answer_e = ''
  row.explanation_e = ''
  row.answer_f = ''
  row.explanation_f = ''
  Object.assign(row, {
    main_concept: ids.concept, library_ids: ids.article, resource_ids: `${ids.assessment}\n${ids.teaching}`, learning_objective: sourceQ.objective,
    source_citation: `${ids.assessment}, physical PDF p${sourceQ.page}, Test your self Q${qIndex + 1}: exact four options and yellow-highlighted ${sourceQ.key}. Local teaching corroboration: ${ids.teaching}, physical p${qIndex === 0 ? '10' : qIndex === 1 ? '13' : '14-15'}.`,
    author_notes: `Literal source wording, option order and yellow-highlighted ${sourceQ.key} are preserved without answer repair. ${sourceQ.risk} Visible Family-176 attribution and metadata authorship remain separate, and Family-42’s isolated p3 LCS-105 footer discrepancy remains explicit. Five unlabeled a–e callouts on Family-176 p3 remain held without inference; no practical, written or media record is created.`,
  })
  return row
})

if (questionRows.length !== 3 || questionRows.map((q) => q.correct_answer).join('') !== 'BBA' || questionRows.some((q) => ['a', 'b', 'c', 'd'].filter((l) => q[`answer_${l}`]).length !== 4)) throw new Error('Family-176 source contract mismatch')
if (concepts.length !== 1 || articles.length !== 1 || sources.length !== 2 || claims.length !== 3 || citations.length !== 6 || spans.length !== 3) throw new Error('Family-176 dependency count mismatch')
await Promise.all(Object.values(paths).map((path) => mkdir(dirname(path), { recursive: true })))
await Promise.all([
  writeFile(paths.concepts, concepts.map(item).join(divider), 'utf8'), writeFile(paths.articles, articles.map(item).join(divider), 'utf8'),
  writeFile(paths.sources, sources.map(item).join(divider), 'utf8'), writeFile(paths.claims, claims.map(item).join(divider), 'utf8'),
  writeFile(paths.citations, citations.map(item).join(divider), 'utf8'), writeFile(paths.spans, spans.map(item).join(divider), 'utf8'),
  writeFile(paths.questions, questionRows.map(item).join(divider), 'utf8'),
])
console.log(JSON.stringify({ files: paths, counts: { concepts: 1, articles: 1, sources: 2, questions: 3, claims: 3, citations: 6, spans: 3 }, keys: 'BBA', optionCounts: [4, 4, 4], genericExplanationHeaders: 0, heldDiagramCallouts: 5, written: 0, practical: 0, media: 0 }, null, 2))
