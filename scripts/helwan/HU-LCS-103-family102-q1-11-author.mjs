#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../..')
const base = resolve(root, 'docs/Helwan-Source-Imports')
const paths = {
  sources: resolve(base, 'evidence/HU-LCS-103-family102-q1-11-sources.md'),
  concepts: resolve(base, 'concept/HU-LCS-103-family102-q1-11-bone-tumour-concepts.md'),
  articles: resolve(base, 'article/HU-LCS-103-family102-q1-11-bone-tumour-articles.md'),
  claims: resolve(base, 'evidence/HU-LCS-103-family102-q1-11-claims.md'),
  citations: resolve(base, 'evidence/HU-LCS-103-family102-q1-11-citations.md'),
  spans: resolve(base, 'evidence/HU-LCS-103-family102-q1-11-spans.md'),
  questions: resolve(base, 'question/HU-LCS-103-family102-q1-11-mcq.md'),
}
const divider = '\n\n---\n\n'
const item = (fields) => `# Item\n\n${Object.entries(fields).map(([key, value]) => `## ${key}\n${value ?? ''}`).join('\n\n')}\n`

const source = { assessment: 'src_ea4daee0a71cf5f3171e', teaching: 'src_3328fde7f743cd67dc9f' }
const article = { bone: 'ART-HU-LCS103-PAT-F102-BONE-FORMING-TUMOURS', cartilage: 'ART-HU-LCS103-PAT-F102-CARTILAGE-TUMOURS' }
const concept = {
  osteoid: 'CON-MSK-3AD186B4605AF2', chondrosarcoma: 'CON-MSK-DDF3A03342A247', classification: 'CON-MSK-660824CAF79CBF', osteoma: 'CON-MSK-4836A383AEA93E', osteosarcoma: 'CON-MSK-A1148497BD0DB2', osteochondroma: 'CON-MSK-B26274E881BA5A', chondroma: 'CON-MSK-681A1DB12F3693',
}

const sources = [{
  id: source.assessment,
  title: 'LCS-103 Bone Tumours MCQs — MCQ 5 MSS',
  institution: 'Faculty of Medicine, Helwan University',
  processing_status: 'ocr_required',
  collection_id: 'hu-y1',
  source_relative_path: 'Year 1/LCS 103/All Subjects/Questions/MCQs/MCQs - mcq 5 mss.pdf',
  source_uri: '',
  media_type: 'application/pdf',
  languages: 'en',
  publication_date: '2025-04-26',
  accessed_at: '',
  page_count: '8',
  sha256: 'ea4daee0a71cf5f3171e609de4aa14e28438895e4f6c8559223b248a92b02ade',
  rights: 'Local Helwan assessment material held for internal authoring only. No page image is redistributed.',
  qualification: 'Tier-3 direct named-course Helwan Pathology assessment deck. Physical pages 2–3 contain Q1–Q11 with printed right-column keys; exact wording, option counts and key occurrences were visually rechecked.',
  confidence: '0.98',
  is_assessment: 'yes',
}]

const specs = [
  { code: 'OSTEOID', id: concept.osteoid, key: 'bonetumor.osteoid-osteoma-vs-osteoblastoma', article: article.bone, label: 'Osteoid osteoma and osteoblastoma are separated by lesion size and the aspirin-responsive small-lesion pattern', aliases: 'Osteoid osteoma versus osteoblastoma\nSmall painful bone-forming lesion\nOsteoblastoma size distinction', definition: 'The governed assessment keys osteoid osteoma for a painful one-centimetre radiolucent femoral lesion relieved by aspirin. It separately keys a diameter greater than two centimetres as a difference favouring osteoblastoma.', objective: 'Distinguish the two benign bone-forming lesions using the exact local size and aspirin-response cues.', pitfalls: 'Do not collapse the two named lesions or silently broaden the local size statement into a complete diagnostic rule.', micro: 'Osteoid osteoma and osteoblastoma', signal: 'Family-102 Q1 key C and Q11 key C; Family-64 pp3–4 support.', claimText: 'The local LCS source set contrasts a small aspirin-responsive osteoid osteoma pattern with an osteoblastoma larger than two centimetres.', support: 'The teaching deck contrasts osteoid osteoma with osteoblastoma by characteristic size and presentation.', questions: 'Q-HU-LCS103-PAT-F102-01\nQ-HU-LCS103-PAT-F102-11' },
  { code: 'CHONDROSARCOMA', id: concept.chondrosarcoma, key: 'bonetumor.chondrosarcoma.site-and-morphology', article: article.cartilage, label: 'Chondrosarcoma is keyed to a scapular site choice and a pelvic predilection statement in the local question set', aliases: 'Chondrosarcoma site\nMalignant cartilage-forming tumour\nPelvic chondrosarcoma', definition: 'Family-102 keys scapula among the sites offered in Q2. It also keys the statement that chondrosarcoma occurs more frequently in the pelvis in Q10.', objective: 'Identify the exact source-keyed site choices without treating the distractor list as a complete epidemiologic account.', pitfalls: 'Preserve the source spellings chodrosarcoma, Aroud and exteremities in their assessment occurrences.', micro: 'Chondrosarcoma site pattern', signal: 'Family-102 Q2 key D and Q10 key A; Family-64 support.', claimText: 'The local source set presents scapula and pelvis as the keyed chondrosarcoma site statements in their respective question frames.', support: 'The teaching deck places chondrosarcoma among malignant cartilage-forming tumours and discusses its distribution.', questions: 'Q-HU-LCS103-PAT-F102-02\nQ-HU-LCS103-PAT-F102-10' },
  { code: 'CLASS', id: concept.classification, key: 'bonetumor.classification-and-primary-malignant-frequency', article: article.bone, label: 'Primary bone-tumour classification excludes metastatic tumours, and osteosarcoma is the locally keyed most common primary malignant option', aliases: 'Primary bone tumour classification\nMost common primary malignant bone tumour\nOsteosarcoma frequency', definition: 'The direct deck keys metastatic tumours as the exception to its primary bone-tumour categories. It keys osteosarcoma as the most common primary malignant bone tumour among the printed options.', objective: 'Apply the exact local classification boundary and frequency key used in Family-102.', pitfalls: 'Do not confuse overall metastatic involvement of bone with a primary bone-tumour category.', micro: 'Bone tumour classification and frequency', signal: 'Family-102 Q3 key A and Q5 key D; Family-64 support.', claimText: 'The local source set excludes metastatic tumours from primary bone-tumour classes and keys osteosarcoma as the most common primary malignant option.', support: 'The teaching deck separates metastatic from primary tumours and introduces primary osteosarcoma.', questions: 'Q-HU-LCS103-PAT-F102-03\nQ-HU-LCS103-PAT-F102-05' },
  { code: 'OSTEOMA', id: concept.osteoma, key: 'bonetumor.osteoma-gardner-and-morphology', article: article.bone, label: 'Osteoma is presented as a benign bone tumour linked to Gardner syndrome rather than a tumour usually occurring around the knee', aliases: 'Osteoma\nGardner syndrome osteoma\nBenign osteogenic tumour', definition: 'The assessment exception item retains benignity, solitary or multiple occurrence, Gardner association and mixed lamellar and woven bone. It keys usual occurrence around the knee as the exception.', objective: 'Recognise the exact retained and rejected osteoma statements in the local item.', pitfalls: 'Do not transfer a knee-region pattern from another bone tumour into the osteoma item.', micro: 'Osteoma and Gardner syndrome', signal: 'Family-102 Q4 key B; Family-64 support.', claimText: 'The local source set retains the Gardner association and benign bone morphology for osteoma while rejecting usual occurrence around the knee.', support: 'The teaching deck describes osteoma as a benign bone-forming lesion with syndromic association and characteristic sites.', questions: 'Q-HU-LCS103-PAT-F102-04' },
  { code: 'OSTEOSARCOMA', id: concept.osteosarcoma, key: 'bonetumor.osteosarcoma-clinicoradiologic-and-malignant-osteoid', article: article.bone, label: 'Osteosarcoma is keyed to younger age, metaphyseal long-bone location, knee-region and radiologic patterns, with malignant osteoid as its hallmark', aliases: 'Osteosarcoma malignant osteoid\nOsteogenic sarcoma\nSunray and Codman triangle', definition: 'The exception item keys common occurrence in old age as false while retaining metaphyseal, knee-region, haemorrhagic-necrotic and radiologic statements. The hallmark item keys malignant osteoid matrix formation.', objective: 'Identify malignant osteoid as the exact microscopic hallmark and the source-retained clinicoradiologic pattern.', pitfalls: 'Do not select malignant cartilage as the defining matrix, and preserve the source spelling arund in Q6.', micro: 'Osteosarcoma morphology and presentation', signal: 'Family-102 Q6 key A and Q7 key B; Family-64 support.', claimText: 'The local source set identifies malignant osteoid matrix as the osteosarcoma hallmark and rejects common occurrence in old age.', support: 'The teaching deck describes malignant osteoid, metaphyseal distribution and characteristic radiologic appearances.', questions: 'Q-HU-LCS103-PAT-F102-06\nQ-HU-LCS103-PAT-F102-07' },
  { code: 'OSTEOCHONDROMA', id: concept.osteochondroma, key: 'bonetumor.osteochondroma-exostosis-cartilage-cap', article: article.cartilage, label: 'Osteochondroma is a common benign exostotic growth whose local exception item rejects a cartilaginous outgrowth covered by a bony cap', aliases: 'Osteochondroma\nExostosis\nCartilage-capped bony outgrowth', definition: 'The four-option item retains common benign growth, possible multiplicity and metaphyseal long-bone origin. Its printed key selects the reversed cap-composition statement as the exception.', objective: 'Preserve the exact four-option assessment form and distinguish the keyed reversed cap statement.', pitfalls: 'Do not invent a fifth option. Do not rewrite the printed key by medically repairing the option.', micro: 'Osteochondroma and exostosis', signal: 'Family-102 Q8 key C; Family-64 support.', claimText: 'The local source set presents osteochondroma as a common benign metaphyseal exostosis and keys the reversed cartilage-outgrowth/bony-cap statement as the exception.', support: 'The teaching deck characterises osteochondroma as an exostotic lesion with a cartilage cap arising near the metaphysis.', questions: 'Q-HU-LCS103-PAT-F102-08' },
  { code: 'CHONDROMA', id: concept.chondroma, key: 'bonetumor.chondroma-ollier-maffucci', article: article.cartilage, label: 'Chondroma is linked in the local source to hands and feet, Ollier syndrome and Maffucci syndrome', aliases: 'Chondroma\nOllier syndrome\nMaffucci syndrome', definition: 'The all-of-the-above item retains benign cartilage formation, common occurrence in hands and feet, Ollier naming for multiple lesions and Maffucci naming with benign angiomas.', objective: 'Recognise the local cluster of chondroma distribution and syndrome associations.', pitfalls: 'Keep the printed wording benign angiomas and avoid expanding this item into a full syndrome definition.', micro: 'Chondroma syndrome associations', signal: 'Family-102 Q9 key E; Family-64 support.', claimText: 'The local source set associates multiple chondromas with Ollier syndrome and chondromas plus benign angiomas with Maffucci syndrome.', support: 'The teaching deck links enchondromatous lesions with Ollier disease and the vascular-lesion association of Maffucci syndrome.', questions: 'Q-HU-LCS103-PAT-F102-09' },
]

const concepts = specs.map((spec) => ({
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
  blueprint_weight: '0.84',
  exam_weight_by_year: 'HU_Y1=0.84',
  clinical_relevance: '0.76',
  academic_relevance: '0.98',
  weight_confidence: '0.58',
  confidence: '0.85',
  resource_occurrence_ids: '[clear]',
  source_candidate_ids: '[clear]',
  merge_ids: '[clear]',
  rejected_merge_candidate_ids: 'Twenty-eight governed exact searches across seven assessment handles returned no substantive live or pending owner for the complete objective.',
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
  article_ids: spec.article,
  related_article_ids: spec.article === article.bone ? article.cartilage : article.bone,
  resource_ids: `${source.assessment}\n${source.teaching}`,
  exam_signal: spec.signal,
  atomic_claim_ids: `CLM-HULCS103-F102-${spec.code}-01`,
  original_wording: spec.claimText,
  conflicts: '[clear]',
  uncertainty: '[clear]',
  field_notes: [
    'microtopicId: The reviewed taxonomy stops at SYS-MSK for this local Pathology overlay; the named microtopic is retained as prose.',
    'nanotopicId: No reviewed nanotopic ID exists beneath the assigned canonical node.',
    'approvedFileResourceIds: No source file is rights-cleared for student redistribution.',
    'approvedVideoResourceIds: No video is assigned to this concept.',
    'resourceOccurrenceIds: Hand-authored from governed Family-102 assessment and Family-64 teaching evidence; no extraction-occurrence record exists.',
    'sourceCandidateIds: Four governed searches per assessment handle completed before minting.',
    'mergeIds: No concept was merged into this record.',
    'lastReviewed: New record; no faculty review has occurred.',
    'reviewDue: Set after the first faculty review.',
    'exclusionReason: Not excluded; held at needs_evidence.',
    'arabicLabel: Blank pending reviewed Arabic terminology.',
    'arabicAliases: Blank pending reviewed Arabic terminology.',
  ].join('\n'),
}))

const articleSpecs = [
  {
    id: article.bone,
    title: 'Bone-forming tumours: classification, osteoma, osteoid lesions and osteosarcoma',
    concepts: specs.filter((spec) => spec.article === article.bone),
    summary: 'Family-102 tests classification of primary bone tumours, osteoma, osteoid osteoma versus osteoblastoma, and osteosarcoma. Exact printed keys are retained while Family-64 supplies local teaching support; all content remains Draft pending independent verification.',
    sections: [
      '### Definition',
      'The local source separates primary bone tumours from metastatic tumours and groups its bone-forming examples by behaviour and matrix. Osteoma and the osteoid lesions are presented as benign, while osteosarcoma supplies the primary malignant bone-forming frame.',
      '',
      '### Mechanism',
      'Osteoid osteoma is represented by a small painful radiolucent lesion relieved by aspirin, whereas the comparison item assigns size greater than two centimetres to osteoblastoma. Osteosarcoma is represented by malignant osteoid production, which the direct item treats as its microscopic hallmark.',
      '',
      '### Key determinants',
      'Keep the assessment cues separate: osteoma carries a Gardner association and is not keyed as usually around the knee; osteosarcoma retains metaphyseal, knee-region and radiologic statements but rejects common occurrence in old age. The classification item excludes metastatic tumours from the primary list.',
      '',
      '### Clinical significance',
      'These are local first-year recognition cues, not a complete diagnostic algorithm. Imaging, histology and clinical context require independent sources and specialist review before publication.',
      '',
      '### Common misconceptions',
      'Do not treat every osteoid-producing lesion as osteosarcoma. Do not transfer the knee-region clue to osteoma, and do not collapse metastatic disease into a primary tumour category.',
    ].join('\n'),
  },
  {
    id: article.cartilage,
    title: 'Cartilage-forming tumours: osteochondroma, chondroma and chondrosarcoma',
    concepts: specs.filter((spec) => spec.article === article.cartilage),
    summary: 'Family-102 links osteochondroma to an exact four-option exception item, chondroma to Ollier and Maffucci associations, and chondrosarcoma to site choices. Family-64 supports the teaching frame, but every record remains Draft.',
    sections: [
      '### Definition',
      'The local source set distinguishes osteochondroma as an exostotic benign growth, chondroma as a benign cartilage-forming tumour, and chondrosarcoma as the malignant cartilage-forming category. Each item is preserved within its own printed option frame.',
      '',
      '### Mechanism',
      'The companion teaching deck describes osteochondroma as a bony outgrowth with a cartilage cap. Multiple chondromatous lesions form the context for Ollier disease, while the vascular-lesion association forms the Maffucci frame.',
      '',
      '### Key determinants',
      'Q8 has four printed options and must stay four-option: its key selects the reversed statement describing a cartilaginous outgrowth covered by a bony cap. Q9 keys all of the above, and the chondrosarcoma items retain scapula and pelvis in their respective question frames.',
      '',
      '### Clinical significance',
      'These source-bound cues help discriminate named entities in the Helwan first-year assessment context. They do not replace current classification, radiologic assessment or specialist pathology review.',
      '',
      '### Common misconceptions',
      'Do not invent a fifth option for Q8 or medically repair its reversed cap wording. Do not merge chondroma with chondrosarcoma, and preserve the assessment typos where they occur.',
    ].join('\n'),
  },
]

const articles = articleSpecs.map((spec) => {
  const related = spec.concepts.map((entry) => entry.id).join('\n')
  const claimIds = spec.concepts.map((entry) => `CLM-HULCS103-F102-${entry.code}-01`).join('\n')
  const spanIds = spec.concepts.map((entry) => `SPN-HULCS103-F102-${entry.code}-01`).join('\n')
  const annotations = spec.concepts.map((entry) => `### definition_of · ${entry.id}\nQuote: ${entry.claimText}\nBlock: body`).join('\n\n')
  const callouts = spec.concepts.map((entry) => `### ${entry.claimText}\nClaims: CLM-HULCS103-F102-${entry.code}-01\nCitations: CIT-HULCS103-F102-${entry.code}-01\nSpan: SPN-HULCS103-F102-${entry.code}-01`).join('\n\n')
  return {
    id: spec.id,
    title: spec.title,
    aliases: spec.title,
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
    conflicts: '[clear]',
    microtopic: 'Bone tumour classification and morphology',
    reading_time: '8',
    summary: spec.summary,
    sections: `${spec.sections}\n\n### Source-bound statements\n${spec.concepts.map((entry) => entry.claimText).join("\\n\\n")}`,
    hold_these: spec.concepts.map((entry) => entry.claimText).join('\n'),
    lose_the_mark: 'Changing exact source wording or punctuation.\nTreating local printed keys as independent medical verification.\nPublishing before named Helwan Pathology review.',
    related_concepts: related,
    related_articles: spec.id === article.bone ? article.cartilage : article.bone,
    question_ids: spec.concepts.map((entry) => entry.questions).join('\n'),
    resource_ids: `${source.assessment}\n${source.teaching}`,
    module_subject: 'HU-LCS-103 > Pathology > Bone Diseases > Bone Tumours',
    university_notes: 'hu: Restricted to the direct Family-102 assessment deck and Family-64 local teaching support.',
    annotations,
    article_source_ids: `${source.assessment}\n${source.teaching}`,
    claim_ids: claimIds,
    span_ids: spanIds,
    callout_evidence: callouts,
    evidence_basis: 'Family-102 supplies exact assessment wording and printed keys. Family-64 supplies local teaching support; neither source independently verifies medical claims.',
    notes: 'Family-101 Q12 and Q20 remain held and unimported because their printed keys conflict. No medical adjudication is inferred.',
    field_notes: [
      'arabicTitle: Blank pending reviewed terminology.',
      'nanotopicId: No reviewed nanotopic exists below SYS-MSK.',
      'media: No media is required by this text-only slice.',
      'publishedSummary: Blank because this remains Draft.',
      'publishedSections: Blank because this remains Draft.',
      'lastReviewed: No named medical review completed.',
      'reviewDue: Set after first named review.',
    ].join('\n'),
  }
})

const claims = specs.map((spec) => ({
  id: `CLM-HULCS103-F102-${spec.code}-01`,
  concept_id: spec.id,
  subject: spec.micro,
  predicate: 'is presented in the local LCS source set as',
  object: spec.definition,
  display_text: spec.claimText,
  risk_class: 'foundational_stable',
  verification_status: 'needs_evidence',
  conflict_status: 'none',
  confidence: '0.84',
  freshness: 'stable_local_curriculum_fact',
  time_sensitive: 'no',
  qualifiers: 'polarity: affirmative\nauthority: local Helwan curriculum teaching support, not independent verification\nassessment boundary: Family-102 Q1–Q11',
}))

const citations = specs.map((spec, index) => ({
  id: `CIT-HULCS103-F102-${spec.code}-01`,
  claim_id: `CLM-HULCS103-F102-${spec.code}-01`,
  resource_id: source.teaching,
  evidence_role: 'local_curriculum_support',
  locator_type: 'page',
  locator_page: index < 4 ? '2-4' : '3-8',
  locator_section: 'Bone diseases and tumours',
  locator_detail: 'Governed Family-64 teaching deck reviewed in the accepted LCS triage.',
  support_span: spec.support,
  context_note: 'Local teaching support for a Draft record; not independent verification.',
  confidence: '0.83',
  counts_as_claim_evidence: 'no',
}))

const spans = specs.map((spec) => ({
  id: `SPN-HULCS103-F102-${spec.code}-01`,
  article_id: spec.article,
  section_id: `${spec.article.toLowerCase()}-definition`,
  text: spec.claimText,
  claim_ids: `CLM-HULCS103-F102-${spec.code}-01`,
  citation_ids: `CIT-HULCS103-F102-${spec.code}-01`,
}))

const rowSpecs = [
  [1, 2, 'OSTEOID', 'C', 'Painful radiolucent lesion in distal femur (1 cm), which is relieved by Aspirin:', ['Osteosarcoma.', 'Chondroma.', 'Osteoid osteoma.', 'Osteoblastoma.', 'Osteoma.']],
  [2, 2, 'CHONDROSARCOMA', 'D', 'The most common site for chodrosarcoma among those is:', ['Proximal femur.', 'Aroud the knee joint.', 'Metatarsal bones.', 'Scapula', 'Mandible']],
  [3, 2, 'CLASS', 'A', 'The Following are primary bone tumors except:', ['Metastatic tumors', 'Osteogenic tumors', 'Chondrogenic tumors', 'Fibrous tumors', 'Fibro-osseus tumors']],
  [4, 2, 'OSTEOMA', 'B', 'All of the following is true regarding osteoma except:', ['Benign tumor of bone', 'Usually occurs around knee', 'May be solitary or multiple', 'May be part of Gardner syndrome', 'Composed of mixture of lamellar and woven bone']],
  [5, 2, 'CLASS', 'D', 'The most common primary malignant bone tumor is :', ['Osteoblastoma', 'Ewing sarcoma', 'Chondrosarcoma', 'Osteosarcoma', 'None of the above']],
  [6, 2, 'OSTEOSARCOMA', 'A', 'Osteosarcoma is characterized by all of the following except :', ['Common in old age', 'Arises from metaphysis of long bones', 'Common arund knee', 'Shows hemorrhage and necrosis', 'May lead to sunray pattern or Codman’s triangle']],
  [7, 2, 'OSTEOSARCOMA', 'B', 'The hallmark microscopic sign to diagnose osteosarcoma is :', ['Variable size and shape of cells', 'Presence of malignant osteoid matrix formation', 'Abundant malignant cartilage formation', 'All of the above', 'None of the above']],
  [8, 3, 'OSTEOCHONDROMA', 'C', 'Osteochondroma ( exostosis ) is characterized by all except :', ['Common benign growth', 'May be single or multiple', 'Cartilaginous outgrowth covered by bony cap', 'Usually arises from metaphysis of long bones']],
  [9, 3, 'CHONDROMA', 'E', 'The following is a characteristic feature of chondroma:', ['Benign cartilage forming tumor', 'Common in hands and feet', 'If multiple are called Ollier syndrome', 'If associated with benign angiomas are called Maffucci syndrome', 'All of the above']],
  [10, 3, 'CHONDROSARCOMA', 'A', 'The following are not true about chondrosarcoma except :', ['Occurs more frequent in pelvis', 'Commonly involves distal exteremities', 'Forms small lobulated mass', 'Early blood spread', 'Most patients are younger than 40 years']],
  [11, 3, 'OSTEOID', 'C', 'One of the following is a difference between osteoid osteoma & osteoblastoma:', ['Osteoblastoma is well circumscribed lesion', 'Osteoblastoma usually involves the cortex', 'Osteoblastoma is larger than 2 cm in diameter', 'Osteoblastoma is benign', 'Osteoblastoma is surrounded by rim of sclerotic bone']],
]
const byCode = Object.fromEntries(specs.map((spec) => [spec.code, spec]))
const commonQuestion = {
  subject: 'msk', status: 'Draft', owner: 'Helwan Year-1 authoring lane', vignette: '', format: 'single best answer', written_parts: '', matching_options: '', matching_prompts: '', correct_answers: '', labeling_image: '', labeling_alt: '', labeling_points: '', completion_text: '', derived_from: '', topic: 'Musculoskeletal system', subtopic: 'Bone tumours', difficulty: 'Easy', question_type: 'Pathology', module: 'HU-LCS-103', module_subject: 'HU-LCS-103 > Pathology > Bone Diseases > Bone Tumours', clinical_relevance: '0.76', academic_relevance: '0.98', cognitive_effort_score: '0.36', exam_weight_by_year: 'HU_Y1=0.86', question_only_for: 'HU_Y1', concept_ids: '', years: 'HU_Y1', universities: 'hu', cognitive_effort: 'Low', setting: 'Academic', reasoning_level: '1', inferred_difficulty: '70', exam_relevance: '9', contextual_concept_ids: '', media_recommendations: '', attachments: '', attached_image: '', estimated_seconds: '60', randomise_answers: 'yes',
}

const questions = rowSpecs.map(([number, page, code, key, stem, options]) => {
  const spec = byCode[code]
  const fields = { id: `Q-HU-LCS103-PAT-F102-${String(number).padStart(2, '0')}`, title: stem, ...commonQuestion, question: stem, correct_answer: key }
  options.forEach((option, index) => {
    const letter = String.fromCharCode(65 + index)
    fields[`answer_${letter.toLowerCase()}`] = option
    fields[`explanation_${letter.toLowerCase()}`] = letter === key
      ? `The Family-102 deck prints ${key} as the right-column key for this exact occurrence, so “${option}” is retained as the source-keyed response. ${spec.claimText} Family-64 supplies local teaching support, but this explanation remains Draft pending independent verification and named Helwan Pathology faculty review.`
      : `The option “${option}” is preserved exactly from Family-102, but the printed right-column key selects ${key} instead. ${spec.claimText} No wording or medical repair is introduced, and the explanation remains Draft pending independent verification and named Helwan Pathology faculty review.`
  })
  for (const letter of ['a', 'b', 'c', 'd', 'e', 'f']) {
    if (!Object.hasOwn(fields, `answer_${letter}`)) {
      fields[`answer_${letter}`] = ''
      fields[`explanation_${letter}`] = ''
    }
  }
  return {
    ...fields,
    main_concept: spec.id,
    library_ids: spec.article,
    resource_ids: `${source.assessment}\n${source.teaching}`,
    learning_objective: spec.objective,
    source_citation: `${source.assessment}, physical PDF p${page}, printed Q${number}: exact source stem/options with right-column printed key ${key}. Teaching support: ${source.teaching}.`,
    author_notes: `Transcribed exactly from governed Family 102 physical p${page}; spelling, capitalisation, punctuation, option order, option count and printed key are preserved. ${number === 8 ? 'Q8 contains exactly four printed options; no fifth option is invented. ' : ''}Family-101 Q12 and Q20 remain held and unimported because their source keys conflict. No medical adjudication is inferred. No practical, written, media or mark record is inferred in this slice.`,
  }
})

if (questions.length !== 11 || questions.map((row) => row.correct_answer).join('') !== 'CDABDABCEAC') throw new Error('Family-102 Q1–Q11 count or key mismatch')
if (concepts.length !== 7 || articles.length !== 2 || claims.length !== 7 || citations.length !== 7 || spans.length !== 7 || sources.length !== 1) throw new Error('Family-102 dependency count mismatch')

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

console.log(JSON.stringify({ files: paths, counts: { sources: 1, concepts: 7, articles: 2, questions: 11, claims: 7, citations: 7, spans: 7 }, keys: questions.map((row) => row.correct_answer).join(''), optionCounts: questions.map((row) => ['a', 'b', 'c', 'd', 'e', 'f'].filter((letter) => row[`answer_${letter}`]).length), priorHoldsUntouched: ['Family101-Q12=B', 'Family101-Q20=C'], newHolds: [], practical: 0, written: 0, media: 0 }, null, 2))
