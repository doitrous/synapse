#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../..')
const importRoot = resolve(root, 'docs/Helwan-Source-Imports')

const paths = {
  concepts: resolve(importRoot, 'concept/HU-LCS-103-family98-bone-physiology-concept-links.md'),
  articles: resolve(importRoot, 'article/HU-LCS-103-family98-bone-physiology-articles.md'),
  questions: resolve(importRoot, 'question/HU-LCS-103-family98-bone-physiology-mcq.md'),
  sources: resolve(importRoot, 'evidence/HU-LCS-103-family98-sources.md'),
  claims: resolve(importRoot, 'evidence/HU-LCS-103-family98-claims.md'),
  citations: resolve(importRoot, 'evidence/HU-LCS-103-family98-citations.md'),
  spans: resolve(importRoot, 'evidence/HU-LCS-103-family98-spans.md'),
}

const divider = '\n\n---\n\n'
const item = (fields) => `# Item\n\n${Object.entries(fields).map(([key, value]) => `## ${key}\n${value ?? ''}`).join('\n\n')}\n`

const source = {
  assessment: 'src_0a0fbd11416063bdc824',
  teaching: 'src_9ea48716e943c7679cc0',
}

const article = {
  bone: 'ART-HU-LCS103-PHY-BONE-FUNCTION-GROWTH-REPAIR',
  calcium: 'ART-HU-LCS103-PHY-BONE-CALCIUM-HOMEOSTASIS',
}

const conceptSpecs = {
  functions: {
    id: 'CON-MSK-E4DACFB968DA4D',
    key: 'teaching.bone.mineral',
    label: 'Bone stores minerals, chiefly calcium',
    article: article.bone,
    objective: 'Distinguish the structural functions of bone from its metabolic role as a mineral and toxic-chemical storehouse.',
    teaching: 'Bone supports locomotion, respiration and protection, while its metabolic role includes storage of calcium, phosphorus, carbonate and toxic chemicals such as lead.',
    discriminator: 'Blood-sugar regulation is not listed as a structural bone function, whereas calcium, phosphorus and toxins match the printed metabolic-storage list.',
  },
  growth: {
    id: 'CON-MSK-C30E73A5353ABB',
    key: 'long-bone-grows-in-length-at-the-epiphyseal-plate',
    label: 'A long bone lengthens at its epiphyseal plates and widens from the periosteum, and the end that ossifies later is the growing end',
    article: article.bone,
    objective: 'Identify the epiphyseal plate as the site of longitudinal growth and recognise the source-listed determinants of bone health.',
    teaching: 'Longitudinal growth occurs at an epiphyseal plate, and the local lecture lists genetics, age, gender, nutrition, hormones, exercise and environmental factors as determinants of growth and health.',
    discriminator: 'The source list includes hormones but not iodine as a separate determinant, and it separates growth in length from growth in width.',
  },
  repair: {
    id: 'CON-MSK-D95C0801FF59F3',
    key: 'bone.fracture-healing.stages-and-timeline',
    label: 'Fracture healing runs haematoma, then a soft (fibrocartilaginous) callus, then a hard (bony) callus, then remodelling to the original shape',
    article: article.bone,
    objective: 'Place haematoma, callus formation, callus ossification and remodelling in the printed fracture-repair order.',
    teaching: 'The local lecture prints the repair sequence as haematoma formation, callus formation, callus ossification and bone remodelling.',
    discriminator: 'The sequence begins with the post-fracture haematoma and ends with remodelling; any option that moves ossification ahead of haematoma or callus formation reverses the biological order.',
  },
  pth: {
    id: 'CON-END-1DE2C490ABBA64',
    key: 'teaching.pth.one-alpha-hydroxylase',
    label: 'PTH and decreased phosphate activate proximal-tubular 1-alpha-hydroxylase to form 1,25-dihydroxyvitamin D3',
    article: article.calcium,
    objective: 'Recognise parathyroid hormone as a calcium-raising hormone that also promotes vitamin-D activation.',
    teaching: 'The local lecture states that PTH increases blood calcium through bone, gut and kidney effects and includes vitamin-D activation.',
    discriminator: 'Calcitonin lowers rather than raises blood calcium, while growth hormone and insulin are not the printed calcium-regulating answer in this item.',
  },
  distribution: {
    id: 'CON-HU-BMS101-CALCIUM-HOMEOSTASIS',
    key: 'hu.bms101.calcium-homeostasis',
    label: 'HU-BMS-101 Calcium Homeostasis',
    article: article.calcium,
    objective: 'Recall that bones and teeth contain 98.9% of body calcium and extracellular fluid contains 0.1%.',
    teaching: 'The local lecture distributes body calcium as 98.9% in bones and teeth, 1% in cells and organelles, and 0.1% in blood or extracellular fluid.',
    discriminator: 'The most abundant compartment is the skeleton, while the extracellular-fluid fraction is the smallest of the three printed compartments.',
  },
  calcitonin: {
    id: 'CON-MSK-092F6F14307DB9',
    key: 'bone.ossification.two-methods-overview',
    label: 'Bone forms by one of two methods, intramembranous or intracartilaginous ossification, and its remodelling is hormonally balanced',
    article: article.calcium,
    objective: 'Recognise calcitonin as the source-keyed calcium-lowering hormone associated with inhibition of osteoclast activity.',
    teaching: 'The local lecture identifies calcitonin as a regulator that lowers blood calcium through effects on bone, gut and kidney.',
    discriminator: 'PTH and vitamin D raise calcium in the source framework, whereas calcitonin is the listed calcium-lowering hormone and the stem identifies osteoclast inhibition.',
  },
  feedback: {
    id: 'CON-END-86BD08DD559197',
    key: 'teaching.pth.low-calcium',
    label: 'A fall in plasma ionized calcium stimulates PTH secretion',
    article: article.calcium,
    objective: 'Recognise calcium homeostasis as a feedback-controlled system in which deviations from the blood-calcium set point trigger corrective responses.',
    teaching: 'The lecture defines homeostasis as maintenance of a constant internal environment and describes sensors, an integrating centre and effectors responding to change from a set point.',
    discriminator: 'The assessment deck prints “both positive and negative feedback” as key C; that exact local key is retained even though the teaching examples emphasise negative feedback.',
  },
}

const concepts = Object.values(conceptSpecs).map((spec) => ({
  id: spec.id,
  label: spec.label,
  canonical_key: spec.key,
  article_ids: `+${spec.article}`,
}))

const commonArticle = {
  arabic_title: '',
  subject: 'msk',
  topic: 'Musculoskeletal system',
  subtopic: 'Bone physiology',
  primary_node_id: 'SYS-MSK',
  template_id: 'TPL-CONCEPT',
  archetype: 'concept',
  language: 'en',
  learner_stage: 'Years 1–3 foundation',
  high_yield: 'High',
  time_sensitive: 'stable',
  status: 'Draft',
  owner: 'Helwan Year-1 authoring lane',
  reviewer: 'Medical team, Helwan Physiology faculty',
  final_publisher: 'Admin team',
  published_summary: '',
  published_sections: '',
  universities: 'hu',
  years: 'HU_Y1',
  module: 'HU-LCS-103',
  media: '',
  publication_gate: 'needs_evidence',
  conflicts: '[clear]',
  evidence_gaps: 'Independent medical verification and named Helwan Physiology faculty review are required before publication.',
  last_reviewed: '',
  review_due: '',
}

const boneCodes = ['functions', 'growth', 'repair']
const calciumCodes = ['pth', 'distribution', 'calcitonin', 'feedback']
const idsFor = (codes) => codes.map((code) => conceptSpecs[code].id).join('\n')
const claimsFor = (codes) => codes.map((code) => `CLM-MSK-HULCS103-F98-${code.toUpperCase()}-01`).join('\n')
const spansFor = (codes) => codes.map((code) => `SPN-HULCS103-F98-${code.toUpperCase()}-01`).join('\n')
const annotationQuote = {
  functions: 'Bone has structural roles in locomotion, respiration and protection and a metabolic role as a storehouse for calcium, phosphorus, carbonate and toxic chemicals such as lead.',
  growth: 'Longitudinal growth occurs at the epiphyseal plate.',
  repair: 'Bone repair proceeds through haematoma formation, callus formation, callus ossification and bone remodelling.',
  pth: 'Parathyroid hormone increases blood calcium through effects on bone, gut and kidney and promotes vitamin-D activation.',
  distribution: 'Bones and teeth contain 98.9% of body calcium, cells and organelles contain 1%, and extracellular fluid contains 0.1%.',
  calcitonin: 'Calcitonin lowers blood calcium through effects that include the bone compartment.',
  feedback: 'Calcium homeostasis uses a set point, sensors, an integrating centre and effectors to correct deviations in blood calcium.',
}
const calloutLine = {
  functions: 'Bone combines structural functions with mineral storage.',
  growth: 'Long bones lengthen at the epiphyseal plate.',
  repair: 'Repair runs haematoma, callus, ossification and remodelling.',
  pth: 'PTH raises blood calcium and promotes vitamin-D activation.',
  distribution: 'Body calcium is 98.9% skeletal and 0.1% extracellular.',
  calcitonin: 'Calcitonin lowers blood calcium through bone-related effects.',
  feedback: 'Calcium homeostasis corrects deviations from a blood-calcium set point.',
}

const articles = [
  {
    id: article.bone,
    title: 'Bone functions, longitudinal growth and fracture repair',
    aliases: 'Bone structural and metabolic functions\nBone growth and health determinants\nFracture-repair sequence',
    ...commonArticle,
    microtopic: 'Bone functions, growth and repair',
    nanotopic: '',
    secondary_node_ids: 'DIS-PHY-T06',
    reading_time: '6',
    summary: 'Bone is living, vascular tissue that supplies structural functions and serves as a metabolic mineral store. Longitudinal growth occurs at epiphyseal plates and is modified by biological, nutritional, hormonal and environmental factors. When bone fractures, repair follows a defined sequence from haematoma through callus formation and ossification to remodelling.',
    sections: `### Definition
Bone has structural roles in locomotion, respiration and protection and a metabolic role as a storehouse for calcium, phosphorus, carbonate and toxic chemicals such as lead. Blood-sugar regulation is not included in the source's structural-function list.

### Key determinants
Longitudinal growth occurs at the epiphyseal plate. The lecture separates growth in length from growth in width and lists genetics, age, gender, nutrition, hormones, exercise and environmental factors as determinants of bone growth and health.

### Mechanism
Bone repair proceeds through haematoma formation, callus formation, callus ossification and bone remodelling. Haematoma is the immediate post-fracture stage, the callus stabilises the site, ossification replaces the callus with bone, and remodelling reshapes the repaired region.

### Clinical significance
The same living tissue that remodels during growth also repairs damage and responds to mechanical stress. Failure at different points can contribute to growth disorders, metabolic bone disease or delayed fracture union, but this assessment slice tests only the printed foundational sequence.

### Common misconceptions
Do not place ossification before the initial haematoma or callus. Do not call the periosteum the primary site of growth in length; the epiphyseal plate is the source-keyed answer. Do not replace the source's listed bone-health factors with iodine, which is not separately listed.`,
    hold_these: 'Bone combines structural functions with mineral storage.\nLong bones lengthen at the epiphyseal plate.\nRepair runs haematoma, callus, ossification and remodelling.',
    lose_the_mark: 'Calling blood-sugar regulation a structural bone function.\nChoosing periosteum for longitudinal growth.\nPutting ossification before haematoma or callus formation.',
    related_concepts: idsFor(boneCodes),
    related_articles: `${article.calcium}: reviews body-calcium distribution, PTH, calcitonin and feedback control`,
    question_ids: [1, 2, 3, 4, 5].map((number) => `Q-HU-LCS103-PHY-F98-${String(number).padStart(2, '0')}`).join('\n'),
    resource_ids: `${source.teaching}\n${source.assessment}`,
    module_subject: 'HU-LCS-103 > Physiology > Bone Physiology > Function, Growth and Repair',
    university_notes: 'hu: Restricted to the HU-LCS-103 Year-1 Physiology bone block and the exact Family-98 local assessment boundary.',
    annotations: boneCodes.map((code) => `### definition_of · ${conceptSpecs[code].id}\nQuote: ${annotationQuote[code]}\nBlock: body`).join('\n\n'),
    article_source_ids: `${source.teaching}\n${source.assessment}`,
    claim_ids: claimsFor(boneCodes),
    span_ids: spansFor(boneCodes),
    media_recommendations: '',
    callout_evidence: boneCodes.map((code) => `### ${calloutLine[code]}\nClaims: CLM-MSK-HULCS103-F98-${code.toUpperCase()}-01\nCitations: CIT-HULCS103-F98-${code.toUpperCase()}-01\nSpan: SPN-HULCS103-F98-${code.toUpperCase()}-01`).join('\n\n'),
    evidence_basis: 'Direct local LCS-103 Physiology teaching lecture, physical pages 5–10.\nDirect named-course LCS-103 Physiology question deck, physical pages 1–2, supplies exact assessment wording and printed keys but is not independent medical verification.',
    notes: 'No source image is redistributed. All linked questions retain exact source wording, option order and printed answer letters.',
    field_notes: `arabicTitle: Blank because no reviewed Arabic title was present.
nanotopicId: No reviewed nanotopic exists below the assigned node.
media: No media is required by these text-only questions.
publishedSummary: Blank because this remains Draft.
publishedSections: Blank because this remains Draft.
lastReviewed: New record; no named medical reviewer has completed review.
reviewDue: Set after first named medical review.`,
  },
  {
    id: article.calcium,
    title: 'Calcium distribution and hormonal feedback in bone physiology',
    aliases: 'Body-calcium distribution\nPTH, calcitonin and vitamin D\nCalcium-homeostasis feedback',
    ...commonArticle,
    microtopic: 'Calcium distribution and homeostasis',
    nanotopic: '',
    secondary_node_ids: 'DIS-PHY-T06\nDIS-PHY-T05',
    reading_time: '7',
    summary: 'Nearly all body calcium is stored in bones and teeth, with much smaller cellular and extracellular fractions. Blood-calcium stability depends on buffering and endocrine control: PTH raises calcium and promotes vitamin-D activation, whereas calcitonin lowers calcium through actions that include bone. Feedback components detect deviations from the regulated set point and recruit corrective effectors.',
    sections: `### Definition
Bones and teeth contain 98.9% of body calcium, cells and organelles contain 1%, and extracellular fluid contains 0.1%. Thus the skeletal compartment is the dominant reservoir while the extracellular fraction is small but tightly regulated.

### Mechanism
Parathyroid hormone increases blood calcium through effects on bone, gut and kidney and promotes vitamin-D activation. In the lecture's integrated scheme, these coordinated organ effects restore calcium when the regulated blood level falls.

### Key determinants
Calcitonin lowers blood calcium through effects that include the bone compartment. The Family-98 stem states osteoclast inhibition, and its right-hand key identifies calcitonin; this assessment wording is retained exactly and remains Draft pending faculty review.

### Clinical significance
Calcium homeostasis uses a set point, sensors, an integrating centre and effectors to correct deviations in blood calcium. The teaching lecture describes feedback as positive or negative but emphasises negative-feedback homeostatic examples. Family-98 Q9 nevertheless prints key C for “Both positive and negative feedback”, so the exact source key is preserved with a source-risk warning rather than silently corrected.

### Common misconceptions
Do not confuse the 0.1% extracellular fraction with the 1% cellular fraction or the 98.9% skeletal fraction. Do not assign PTH's calcium-raising and vitamin-D-activating actions to calcitonin. Do not medically repair the printed Q9 key inside a source-faithful assessment record.`,
    hold_these: 'Body calcium is 98.9% skeletal and 0.1% extracellular.\nPTH raises blood calcium and promotes vitamin-D activation.\nCalcitonin lowers blood calcium through bone-related effects.\nCalcium homeostasis corrects deviations from a blood-calcium set point.',
    lose_the_mark: 'Swapping the 1% cellular and 0.1% extracellular fractions.\nCalling calcitonin the vitamin-D-activating calcium-raising hormone.\nSilently changing the printed Family-98 Q9 key.',
    related_concepts: idsFor(calciumCodes),
    related_articles: `${article.bone}: reviews bone functions, longitudinal growth and fracture repair`,
    question_ids: [6, 7, 8, 9, 10].map((number) => `Q-HU-LCS103-PHY-F98-${String(number).padStart(2, '0')}`).join('\n'),
    resource_ids: `${source.teaching}\n${source.assessment}`,
    module_subject: 'HU-LCS-103 > Physiology > Bone Physiology > Calcium Homeostasis',
    university_notes: 'hu: Restricted to the HU-LCS-103 Year-1 Physiology bone block and the exact Family-98 local assessment boundary.',
    annotations: calciumCodes.map((code) => `### definition_of · ${conceptSpecs[code].id}\nQuote: ${annotationQuote[code]}\nBlock: body`).join('\n\n'),
    article_source_ids: `${source.teaching}\n${source.assessment}`,
    claim_ids: claimsFor(calciumCodes),
    span_ids: spansFor(calciumCodes),
    media_recommendations: '',
    callout_evidence: calciumCodes.map((code) => `### ${calloutLine[code]}\nClaims: CLM-MSK-HULCS103-F98-${code.toUpperCase()}-01\nCitations: CIT-HULCS103-F98-${code.toUpperCase()}-01\nSpan: SPN-HULCS103-F98-${code.toUpperCase()}-01`).join('\n\n'),
    evidence_basis: 'Direct local LCS-103 Physiology teaching lecture, physical pages 13–28.\nDirect named-course LCS-103 Physiology question deck, physical pages 2–3, supplies exact assessment wording and printed keys but is not independent medical verification.',
    notes: 'The Q9 printed key is source-sensitive and remains Draft. No source image is redistributed and no answer is inferred.',
    field_notes: `arabicTitle: Blank because no reviewed Arabic title was present.
nanotopicId: No reviewed nanotopic exists below the assigned node.
media: No media is required by these text-only questions.
publishedSummary: Blank because this remains Draft.
publishedSections: Blank because this remains Draft.
lastReviewed: New record; no named medical reviewer has completed review.
reviewDue: Set after first named medical review.`,
  },
]

const questionRows = [
  [1, 1, 'functions', 'D', 'Which is not a structural function of bones?', ['Locomotion', 'Respiration', 'Protection', 'Blood sugar regulation']],
  [2, 1, 'functions', 'C', 'The metabolic function of bone includes storage of:', ['Sodium and water', 'Lead and chloride', 'Calcium, phosphorus, and toxins', 'Oxygen and carbon dioxide']],
  [3, 1, 'growth', 'A', 'Bone growth in length primarily occurs at:', ['Epiphyseal plate', 'Periosteum', 'Marrow cavity', 'Diaphysis center']],
  [4, 1, 'growth', 'C', 'Which of the following does not affect bone health?', ['Genetics', 'Gender', 'iodine', 'Hormones']],
  [5, 2, 'repair', 'B', 'What is the correct order of bone repair?', ['Callus formation → Hematoma → Ossification → Remodeling', 'Hematoma → Callus formation → Callus Ossification → Remodeling', 'Ossification → Hematoma → Remodeling → Callus', 'Hematoma → Ossification → Callus → Remodeling']],
  [6, 2, 'pth', 'C', 'Which hormone increases blood calcium and activates Vitamin D?', ['Calcitonin', 'Growth hormone', 'Parathyroid hormone (PTH)', 'Insulin']],
  [7, 2, 'distribution', 'C', 'The most abundant location of calcium in the body is:', ['Blood plasma', 'Muscles', 'Bones and teeth', 'Mitochondria']],
  [8, 2, 'calcitonin', 'A', 'Which hormone lowers blood calcium levels by inhibiting osteoclasts?', ['Calcitonin', 'PTH', 'Vitamin D', 'Aldosterone']],
  [9, 2, 'feedback', 'C', 'What feedback mechanism regulates calcium homeostasis?', ['Positive feedback only', 'Negative feedback only', 'Both positive and negative feedback', 'None of the above']],
  [10, 3, 'distribution', 'A', 'What percentage of calcium is found in the extracellular fluid (ECF)?', ['0.1%', '1%', '14%', '98.9%']],
]

const questionCommon = {
  subject: 'msk', status: 'Draft', owner: 'Helwan Year-1 authoring lane', vignette: '', format: 'single best answer', written_parts: '', matching_options: '', matching_prompts: '', correct_answers: '', labeling_image: '', labeling_alt: '', labeling_points: '', completion_text: '', derived_from: '', topic: 'Musculoskeletal system', subtopic: 'Bone physiology', difficulty: 'Easy', question_type: 'Physiology', module: 'HU-LCS-103', module_subject: 'HU-LCS-103 > Physiology > Bone Physiology', clinical_relevance: '0.55', academic_relevance: '0.95', cognitive_effort_score: '0.3', exam_weight_by_year: 'HU_Y1=0.8', question_only_for: 'HU_Y1', concept_ids: '', years: 'HU_Y1', universities: 'hu', cognitive_effort: 'Low', setting: 'Academic', reasoning_level: '1', inferred_difficulty: '74', exam_relevance: '8', contextual_concept_ids: '', media_recommendations: '', attachments: '', attached_image: '', estimated_seconds: '55', randomise_answers: 'yes',
}

const questions = questionRows.map(([number, page, code, key, stem, options]) => {
  const spec = conceptSpecs[code]
  const fields = { id: `Q-HU-LCS103-PHY-F98-${String(number).padStart(2, '0')}`, title: stem, ...questionCommon, question: stem, correct_answer: key }
  options.forEach((text, index) => {
    const letter = String.fromCharCode(65 + index)
    fields[`answer_${letter.toLowerCase()}`] = text
    fields[`explanation_${letter.toLowerCase()}`] = letter === key
      ? `The direct Family-98 assessment deck prints ${key} as the answer, so this is the exact source-keyed response. ${spec.teaching} ${spec.discriminator} This record preserves the local key without treating the question bank as independent medical verification.`
      : `This option is retained exactly from the Family-98 assessment deck, but the right-hand key column does not select it; the printed answer is ${key}. ${spec.teaching} ${spec.discriminator} The distinction follows the local teaching scope while the item remains Draft for named faculty review.`
  })
  for (const letter of ['a', 'b', 'c', 'd', 'e', 'f']) {
    if (!fields[`answer_${letter}`]) {
      fields[`answer_${letter}`] = ''
      fields[`explanation_${letter}`] = ''
    }
  }
  const risk = number === 9 ? ' The printed C key is source-sensitive because the teaching lecture emphasises negative feedback in homeostatic correction; the source key is preserved without repair.' : ''
  return {
    ...fields,
    main_concept: spec.id,
    library_ids: spec.article,
    resource_ids: `${source.assessment}\n${source.teaching}`,
    learning_objective: spec.objective,
    source_citation: `${source.assessment}, physical PDF p${page}, printed Q${number}: exact source stem/options with right-column printed key ${key}. Teaching support: ${source.teaching}, physical PDF pp5-28.`,
    author_notes: `Transcribed as exact source wording from Family 98 physical p${page}; capitalisation, punctuation, option order and printed key are preserved.${risk} No mark, media dependency or corrected answer is inferred.`,
  }
})

const sources = [
  {
    id: source.assessment, title: 'LCS-103 Physiology Questions — MCQ Bone', institution: 'Helwan LCS-103 local question-bank corpus', processing_status: 'native_text', collection_id: 'hu-y1', source_relative_path: 'Year 1/LCS 103/All Subjects/Questions/MCQs/MCQs - MCQ bone.pdf', source_uri: '', media_type: 'application/pdf', languages: 'en', publication_date: '', accessed_at: '', page_count: '3', sha256: '0a0fbd11416063bdc82421118c26579a518eca4b0ae9676bfc78ecabb79156ab', rights: 'Local Helwan teaching and assessment material held for internal authoring only. No page image is redistributed.', qualification: 'Tier-3 direct named-course LCS Physiology question deck. All pages print Physiology, Questions and Dr El-Sawy, and all ten items carry a right-column printed key. It is not a formal sitting paper or separately issued official key.', confidence: '0.9', is_assessment: 'yes',
  },
  {
    id: source.teaching, title: 'LCS-103 Physiology Lecture 2 — Bone Physiology', institution: 'Helwan University local LCS-103 Physiology teaching corpus', processing_status: 'native_text', collection_id: 'hu-y1', source_relative_path: 'Year 1/LCS 103/Physiology/Theoretical/Lec 2 - Bone Physiology & Age-related changes/Bone physiology.pdf', source_uri: '', media_type: 'application/pdf', languages: 'en', publication_date: '', accessed_at: '', page_count: '29', sha256: '9ea48716e943c7679cc0d8876a36236ac439cc4b7afc4d91f086a31a36e22c5a', rights: 'Local Helwan teaching material held for internal authoring only. No page image is redistributed.', qualification: 'Tier-4 direct local LCS-103 Physiology teaching deck titled Bone Physiology and attributed to Nermien Waly with a Helwan University email address. It supports explanations but is not a sitting paper or independent medical verification.', confidence: '0.9', is_assessment: 'no',
  },
]

const evidenceSpecs = {
  functions: ['Bone', 'serves', 'structural functions and stores calcium, phosphorus, carbonate and toxic chemicals', '5', 'Skeletal system physiology', 'Physical PDF page 5, complete function list', annotationQuote.functions, 'art-hu-lcs103-phy-bone-function-growth-repair-definition'],
  growth: ['Long bone growth', 'occurs at', 'the epiphyseal plate and is influenced by biological, nutritional, hormonal and environmental factors', '7-8', 'Bone growth; Factors affecting bone growth/health', 'Physical PDF pages 7–8', annotationQuote.growth, 'art-hu-lcs103-phy-bone-function-growth-repair-key-determinants'],
  repair: ['Bone repair', 'follows', 'haematoma formation, callus formation, callus ossification and remodelling', '10', 'Bone repair', 'Physical PDF page 10, numbered repair sequence', annotationQuote.repair, 'art-hu-lcs103-phy-bone-function-growth-repair-mechanism'],
  pth: ['Parathyroid hormone', 'increases', 'blood calcium through bone, gut and kidney effects and promotes vitamin-D activation', '22', 'PTH', 'Physical PDF page 22', annotationQuote.pth, 'art-hu-lcs103-phy-bone-calcium-homeostasis-mechanism'],
  distribution: ['Body calcium', 'is distributed as', '98.9% in bones and teeth, 1% in cells and organelles and 0.1% in extracellular fluid', '16-17', 'Calcium physiological distribution', 'Physical PDF pages 16–17', annotationQuote.distribution, 'art-hu-lcs103-phy-bone-calcium-homeostasis-definition'],
  calcitonin: ['Calcitonin', 'lowers', 'blood calcium through effects that include the bone compartment', '23', 'Calcitonin', 'Physical PDF page 23', annotationQuote.calcitonin, 'art-hu-lcs103-phy-bone-calcium-homeostasis-key-determinants'],
  feedback: ['Calcium homeostasis', 'uses', 'a set point, sensors, an integrating centre and effectors to correct deviation', '13-14', 'Homeostasis; Feed back mechanism', 'Physical PDF pages 13–14', annotationQuote.feedback, 'art-hu-lcs103-phy-bone-calcium-homeostasis-clinical-significance'],
}

const evidenceRows = Object.entries(evidenceSpecs).map(([code, values]) => {
  const [subject, predicate, object, page, section, detail, text, sectionId] = values
  return { code, spec: conceptSpecs[code], subject, predicate, object, page, section, detail, text, sectionId }
})

const claims = evidenceRows.map((row) => ({
  id: `CLM-MSK-HULCS103-F98-${row.code.toUpperCase()}-01`, concept_id: row.spec.id, subject: row.subject, predicate: row.predicate, object: row.object, display_text: `${row.subject} ${row.predicate} ${row.object}.`, risk_class: 'foundational_stable', verification_status: 'needs_evidence', conflict_status: row.code === 'feedback' ? 'source_key_requires_faculty_review' : 'none', confidence: '0.9', freshness: 'stable_local_curriculum_fact', time_sensitive: 'no', qualifiers: `polarity: affirmative\nauthority: direct local Helwan curriculum, not independent verification\nassessment caveat: ${row.code === 'feedback' ? 'Family-98 Q9 printed key remains Draft and source-sensitive' : 'none'}`,
}))

const citations = evidenceRows.map((row) => ({
  id: `CIT-HULCS103-F98-${row.code.toUpperCase()}-01`, claim_id: `CLM-MSK-HULCS103-F98-${row.code.toUpperCase()}-01`, resource_id: source.teaching, evidence_role: 'local_curriculum', locator_type: 'page', locator_page: row.page, locator_section: row.section, locator_detail: row.detail, support_span: row.text, context_note: 'Teaching wording is preserved where quoted; article prose remains Draft pending independent verification.', confidence: '0.9', counts_as_claim_evidence: 'no',
}))

const spans = evidenceRows.map((row) => ({
  id: `SPN-HULCS103-F98-${row.code.toUpperCase()}-01`, article_id: row.spec.article, section_id: row.sectionId, text: row.text, claim_ids: `CLM-MSK-HULCS103-F98-${row.code.toUpperCase()}-01`, citation_ids: `CIT-HULCS103-F98-${row.code.toUpperCase()}-01`,
}))

if (concepts.length !== 7 || articles.length !== 2 || questions.length !== 10 || sources.length !== 2 || claims.length !== 7 || citations.length !== 7 || spans.length !== 7) throw new Error('Family-98 governed count mismatch')

await Promise.all(Object.values(paths).map((path) => mkdir(dirname(path), { recursive: true })))
await writeFile(paths.concepts, concepts.map(item).join(divider), 'utf8')
await writeFile(paths.articles, articles.map(item).join(divider), 'utf8')
await writeFile(paths.questions, questions.map(item).join(divider), 'utf8')
await writeFile(paths.sources, sources.map(item).join(divider), 'utf8')
await writeFile(paths.claims, claims.map(item).join(divider), 'utf8')
await writeFile(paths.citations, citations.map(item).join(divider), 'utf8')
await writeFile(paths.spans, spans.map(item).join(divider), 'utf8')

console.log(JSON.stringify({ files: paths, counts: { concepts: concepts.length, articles: articles.length, questions: questions.length, sources: sources.length, claims: claims.length, citations: citations.length, spans: spans.length }, keys: questions.map((row) => row.correct_answer).join(''), sourceRisks: ['Q9 printed C'], media: 0, practical: 0, written: 0 }, null, 2))
