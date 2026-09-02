#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../..')
const base = resolve(root, 'docs/Helwan-Source-Imports')
const paths = {
  concepts: resolve(base, 'concept/HU-LCS-103-family163-q1-14-concepts.md'),
  articles: resolve(base, 'article/HU-LCS-103-family163-q1-14-articles.md'),
  sources: resolve(base, 'evidence/HU-LCS-103-family163-q1-14-sources.md'),
  claims: resolve(base, 'evidence/HU-LCS-103-family163-q1-14-claims.md'),
  citations: resolve(base, 'evidence/HU-LCS-103-family163-q1-14-citations.md'),
  spans: resolve(base, 'evidence/HU-LCS-103-family163-q1-14-spans.md'),
  questions: resolve(base, 'question/HU-LCS-103-family163-q1-14-mcq.md'),
}
const divider = '\n\n---\n\n'
const item = (fields) => `# Item\n\n${Object.entries(fields).map(([key, value]) => `## ${key}\n${value ?? ''}`).join('\n\n')}\n`

const source = {
  assessment: 'src_79b5752c4d6f23e6dafc',
  boneTeaching: 'src_718e08dfb6d19109dabf',
  discTeaching: 'src_252ae116a3911d2020a2',
  boneTumourTeaching: 'src_3328fde7f743cd67dc9f',
  softTissueTeaching: 'src_237f83bb42bf143fefdf',
  osteomyelitisTeaching: 'src_cf37932d10b47ec0a26f',
  anatomyTeaching: 'src_aa8bb730fbccdbf7d6e0',
}
const conceptIds = {
  osteoporosis: 'CON-MSK-89674D65B2316B',
  nonunion: 'CON-MSK-E0806FEAA648F8',
  myeloma: 'CON-FND-2B59FDDFCEDFA6',
  osteoid: 'CON-MSK-3AD186B4605AF2',
  fibrosarcoma: 'CON-DER-78AF0815FE7330',
  cauda: 'CON-MSK-FA490E0113A07D',
  diabeticOsteomyelitis: 'CON-MSK-4ABB70C236E69B',
  carpalRelease: 'CON-MSK-4784E7374A0B6B',
  disc: 'CON-MSK-9C7E37FE296254',
  osteosarcoma: 'CON-MSK-A1148497BD0DB2',
  myelomaPrognosis: 'CON-MSK-D11FA83681C5C6',
}
const articleIds = {
  fragility: 'ART-HU-LCS103-MSK-F163-FRAGILITY-HEALING',
  tumours: 'ART-HU-LCS103-PAT-F163-TUMOUR-PATTERNS',
  disc: 'ART-HU-LCS103-MSK-F163-DISC-COMPRESSION',
  osteomyelitis: 'ART-HU-LCS103-PAT-F101-ACUTE-OSTEOMYELITIS',
  anatomy: 'ART-HU-BMS101-ANATOMY',
}

const conceptSpecs = [
  {
    id: conceptIds.osteoporosis, key: 'bone.matrix.organic-inorganic-composition', type: 'update',
    label: 'Bone matrix composition and the linked osteoporosis density-loss and fragility pattern',
    aliases: 'Osteoporosis density and fragility diagnosis\nLow bone mass and fracture risk\nBone resorption exceeding formation',
    definition: 'Bone matrix contains an organic type-I-collagen and ground-substance component and an inorganic calcium-salt component that provides hardness. The governed prior concept also states that osteoporosis involves progressive loss of bone density with increased fracture risk when bone resorption exceeds bone formation. Family-163 Q1 adds an exact densitometry-based assessment occurrence while preserving its threshold wording without converting it into an independently verified diagnostic rule.',
    objective: 'Retain the bone-matrix composition scope and associate its osteoporosis density-loss statement with the source-keyed Family-163 response.',
    pitfalls: 'Do not erase the existing bone-matrix composition scope. Do not silently replace the source phrase “more than 2 standard deviations” with a different threshold.',
    conceptType: 'diagnostic pattern', micro: 'Osteoporosis density and fragility', article: articleIds.fragility,
    articles: `ART-103-HIS-BONE-MATRIX-CLASSIFICATION\n${articleIds.fragility}`,
    resources: `src_2bf25a6864c9f6ce3283\n${source.assessment}\n${source.boneTeaching}`,
    claims: 'CLM-MSK-BONE-MATRIX-COMPOSITION-01\nCLM-MSK-BONE-MATRIX-COMPOSITION-02\nCLM-HULCS103-F163-OSTEOPOROSIS-01',
    subject: 'msk', primary: 'DIS-HIS-T02', secondary: 'DIS-HIS-T01\nDIS-HIS-T04', topic: 'Basic tissues', subtopic: 'Bone',
    modules: 'HU-LCS-103', moduleSubject: 'HU-LCS-103 > Integrated Musculoskeletal Assessment', universities: 'hu',
    signal: 'Family-163 Q1 prints B, Osteoporosis; the formal and red key layers agree.',
    uncertainty: 'The source states more than 2 standard deviations below the adult mean, rather than the conventional 2.5-SD osteoporosis threshold. It remains Draft without repair.',
  },
  {
    id: conceptIds.nonunion, key: 'fracture-nonunion-risk-poor-alignment', type: 'new',
    label: 'Poor alignment is the source-keyed risk for radius-shaft fracture nonunion after one year',
    aliases: 'Fracture nonunion due to poor alignment\nMalalignment and failed union\nMechanical alignment in fracture healing',
    definition: 'Family-163 presents a radius mid-shaft fracture that remains ununited after one year and prints poor alignment as the keyed risk. This concept owns the exact poor-alignment mechanism rather than the separate vascular nonunion mechanism of femoral-neck fractures.',
    objective: 'Identify poor alignment as the exact source-keyed risk in the Family-163 nonunion occurrence.',
    pitfalls: 'Do not merge this mechanical-alignment scope into the femoral-neck vascular nonunion concept. Nonunion is multifactorial, so the source wording remains Draft and bounded to the printed item.',
    conceptType: 'risk factor', micro: 'Fracture nonunion and alignment', article: articleIds.fragility,
    resources: `${source.assessment}\n${source.boneTeaching}`, claims: 'CLM-HULCS103-F163-NONUNION-01',
    signal: 'Family-163 Q2 prints E, Poor alignment; the formal and red key layers agree.', uncertainty: '[clear]',
  },
  {
    id: conceptIds.myeloma, key: 'pathology.hematologic.multiple-myeloma-m-spike-plasma-cells', type: 'update',
    label: 'Multiple myeloma produces a plasma-cell, M-protein, lytic-bone, anaemia, hypercalcaemia and renal-dysfunction pattern',
    aliases: 'Multiple myeloma diagnostic pattern\nM-spike plasma-cell neoplasm\nLytic lesions with CRAB findings',
    definition: 'The governed local source presents multiple myeloma through lytic lesions, pathological fracture, anaemia, hypercalcaemia, renal dysfunction, M protein and marrow plasma cells. Family-163 Q4 and Q5 add exact diagnostic occurrences, while Q14 is linked to a separate prognostic concept.',
    objective: 'Recognise the multiple-myeloma diagnostic cluster from lytic bone disease, monoclonal protein and plasma-cell evidence.',
    pitfalls: 'Do not confuse a polyclonal spike with the source-keyed monoclonal pattern. Prognostic beta 2 macroglobulin is represented by a separate concept.',
    conceptType: 'diagnostic pattern', micro: 'Multiple myeloma diagnostic pattern', article: articleIds.tumours,
    articles: `ART-HU-BMS102-PAT-TUMOUR-MARKERS-HAEMATOLOGIC\nART-HU-LCS103-PAT-F102-SELECTED-BONE-TUMOURS\n${articleIds.tumours}`,
    resources: `src_ea4daee0a71cf5f3171e\n${source.boneTumourTeaching}\n${source.assessment}`,
    claims: 'CLM-HULCS103-F102-MYELOMA-01\nCLM-HULCS103-F102-MYELOMA-Q12-17-01\nCLM-HULCS103-F163-MYELOMA-01',
    subject: 'fnd', primary: 'SYS-FND-T03', secondary: 'DIS-PAT-T05', topic: 'General pathology', subtopic: 'Neoplasia', modules: 'HU-BMS-102\nHU-LCS-103',
    signal: 'Family-163 Q4 prints D, Monoclonal antibody spike (M-spike), and Q5 prints B, Multiple myeloma.', uncertainty: '[clear]',
  },
  {
    id: conceptIds.osteoid, key: 'bonetumor.osteoid-osteoma-vs-osteoblastoma', type: 'update',
    label: 'Osteoid osteoma is a small painful bone-forming lesion with nocturnal NSAID-responsive pain and a radiolucent centre',
    aliases: 'Osteoid osteoma versus osteoblastoma\nSmall painful bone-forming lesion\nNocturnal pain relieved by NSAIDs',
    definition: 'Family-163 Q6 describes intense localised nocturnal pain relieved by NSAIDs with osteoblast-lined trabeculae and surrounding sclerosis. The source keys the less-than-one-centimetre bony mass with a radiolucent core, and that literal wording is retained.',
    objective: 'Recognise the source-keyed osteoid-osteoma clinicoradiologic pattern without repairing its option wording.',
    pitfalls: 'Option A says radiolucent “core,” while option E says nidus. Preserve the exact source wording and printed A key.',
    conceptType: 'clinicoradiologic pattern', micro: 'Osteoid osteoma pattern', article: articleIds.tumours,
    articles: `ART-HU-LCS103-PAT-F102-BONE-FORMING-TUMOURS\n${articleIds.tumours}`,
    resources: `src_ea4daee0a71cf5f3171e\n${source.boneTumourTeaching}\n${source.assessment}`,
    claims: 'CLM-HULCS103-F102-OSTEOMA-01\nCLM-HULCS103-F163-BONE-TUMOURS-01',
    signal: 'Family-163 Q6 prints A; both key layers agree.', uncertainty: 'The keyed option uses the word core rather than nidus; retained as an explicit Draft source risk.',
  },
  {
    id: conceptIds.fibrosarcoma, key: 'teaching.pathopractical.fibrosarcoma.herringbone', type: 'update',
    label: 'Fibrosarcoma shows uniform spindle cells arranged in a herringbone pattern',
    aliases: 'Fibrosarcoma herringbone pattern\nUniform malignant spindle cells\nFibroblastic sarcoma morphology',
    definition: 'Family-163 Q7 describes a destructive thigh lesion composed of uniform spindle cells in a herringbone pattern and prints fibrosarcoma as the answer. This exact morphology already exists in the governed concept and is extended only with the new article and assessment occurrence.',
    objective: 'Recognise fibrosarcoma from the exact herringbone spindle-cell pattern.',
    pitfalls: 'Do not substitute fibromatosis, fibrous dysplasia, liposarcoma or osteosarcoma for the source-keyed herringbone spindle-cell lesion.',
    conceptType: 'histopathology pattern', micro: 'Fibrosarcoma herringbone pattern', article: articleIds.tumours,
    articles: `ART-DER-TOP-070DD897F2\n${articleIds.tumours}`,
    resources: `src_8751ab3eeecf2851237c\n${source.assessment}\n${source.softTissueTeaching}`,
    claims: 'CLM-DER-78AF0815FE7330\nCLM-HULCS103-F163-BONE-TUMOURS-01',
    subject: 'derm', primary: 'DIS-PAT-T07', secondary: 'SYS-DER\nDIS-PAT', topic: 'Soft tissue pathology', subtopic: 'Fibroblastic tumours',
    signal: 'Family-163 Q7 prints B, Fibrosarcoma; both key layers agree.', uncertainty: '[clear]',
  },
  {
    id: conceptIds.cauda, key: 'lumbar-disc-prolapse-cauda-equina-compression', type: 'new',
    label: 'Disc prolapse with sudden low-back pain and urinary retention is source-keyed to cauda equina involvement',
    aliases: 'Cauda equina compression from disc prolapse\nUrinary retention with back pain\nDisc prolapse emergency pattern',
    definition: 'Family-163 Q8 presents sudden lower-back pain with urinary retention and MRI evidence of disc prolapse, then prints cauda equina as the affected structure. The source does not state the disc level, so the attribution is preserved as a Draft assessment pattern rather than independently verified clinical guidance.',
    objective: 'Identify cauda equina as the exact source-keyed structure in the Family-163 disc-prolapse occurrence.',
    pitfalls: 'Do not infer a disc level that the source does not provide. Keep the cauda-equina attribution source-bound and Draft.',
    conceptType: 'clinical pattern', micro: 'Disc prolapse and cauda equina', article: articleIds.disc,
    resources: `${source.assessment}\n${source.discTeaching}`, claims: 'CLM-HULCS103-F163-CAUDA-01',
    signal: 'Family-163 Q8 prints A, Cauda equina; both key layers agree.', uncertainty: 'The source does not identify a disc level; the exact A key remains unadjudicated pending faculty review.',
  },
  {
    id: conceptIds.diabeticOsteomyelitis, key: 'diabetic-foot-ulcer-secondary-osteomyelitis', type: 'new',
    label: 'A diabetic heel ulcer with escalating infection can extend to bone as secondary osteomyelitis',
    aliases: 'Diabetic foot osteomyelitis\nHeel ulcer bone infection\nContiguous osteomyelitis in diabetes',
    definition: 'Family-163 Q10 narrates a diabetic heel blister that ulcerates, becomes black and develops escalating infection, then prints osteomyelitis as the bone complication. The concept is restricted to the source’s ulcer-to-bone complication pathway and does not supply an independent diagnostic protocol.',
    objective: 'Recognise osteomyelitis as the exact source-keyed bone complication of the described diabetic heel ulcer.',
    pitfalls: 'Do not generalise the vignette into a complete diabetic-foot management rule. The causal sequence is retained as local Draft assessment evidence.',
    conceptType: 'complication', micro: 'Diabetic foot and secondary osteomyelitis', article: articleIds.osteomyelitis,
    resources: `${source.assessment}\n${source.osteomyelitisTeaching}`, claims: 'CLM-HULCS103-F101-PATHOGENESIS-01',
    signal: 'Family-163 Q10 prints B, Osteomyelitis; both key layers agree.', uncertainty: 'The source supplies a causal narrative rather than a complete diagnostic work-up; retained as Draft.',
  },
  {
    id: conceptIds.carpalRelease, key: 'carpal-tunnel-syndrome-surgical-treatment', type: 'new',
    label: 'Endoscopic carpal tunnel release is the source-keyed treatment after persistent symptoms and failed medication',
    aliases: 'Carpal tunnel surgical treatment\nEndoscopic median nerve decompression\nRefractory carpal tunnel release',
    definition: 'Family-163 Q11 describes chronic hand and wrist pain, tingling and numbness in an assembly worker who cannot take anti-inflammatory medication and reports no success with other medication. The source prints endoscopic carpal tunnel release as the most effective treatment.',
    objective: 'Identify endoscopic carpal tunnel release as the exact source-keyed treatment in this occurrence.',
    pitfalls: 'The source does not provide a complete diagnostic or conservative-treatment work-up. Do not promote the keyed option into an independent management guideline.',
    conceptType: 'treatment', micro: 'Carpal tunnel surgical release', article: articleIds.anatomy,
    resources: `${source.assessment}\n${source.anatomyTeaching}`, claims: 'CLM-HU-BMS101-MEDIAN-NERVE-CARPAL-TUNNEL',
    signal: 'Family-163 Q11 prints B, Endoscopic carpal tunnel release; both key layers agree.', uncertainty: 'The item asks for “most effective” treatment without a complete diagnostic or conservative-treatment work-up; retained as Draft.',
  },
  {
    id: conceptIds.disc, key: 'cartilage.intervertebral-disc.annulus-nucleus-herniation', type: 'update',
    label: 'The intervertebral disc has an annulus fibrosus around the nucleus pulposus, whose herniation can compress nerve roots',
    aliases: 'Intervertebral disc prolapse\nLumbar prolapsed nucleus pulposus\nDisc herniation and radicular pain',
    definition: 'The intervertebral disc consists of an outer annulus fibrosus of white fibrocartilage around an inner gelatinous nucleus pulposus. Herniation of the nucleus through the annulus can compress nerve roots and cause pain. Family-163 Q12 adds the exact lower-back pain, posterior-leg radiation and straight-leg-raising occurrence with a printed lumbar prolapsed nucleus pulposus key.',
    objective: 'Retain the disc structure and collagen scope and recognise the exact source-keyed lumbar disc-prolapse clinical pattern.',
    pitfalls: 'Do not erase the annulus, nucleus and collagen teaching scope. Do not claim that Q12 supplies confirmatory imaging.',
    conceptType: 'clinical pattern', micro: 'Lumbar disc prolapse', article: articleIds.disc,
    articles: `ART-103-HIS-CARTILAGE-TYPES\n${articleIds.disc}`,
    resources: `src_2bf25a6864c9f6ce3283\n${source.assessment}\n${source.discTeaching}`,
    claims: 'CLM-MSK-IV-DISC-01\nCLM-MSK-IV-DISC-02\nCLM-HULCS103-F163-DISC-01',
    subject: 'msk', primary: 'DIS-HIS-T02', secondary: 'DIS-HIS-T01\nDIS-HIS-T04', topic: 'Basic tissues', subtopic: 'Cartilage',
    modules: 'HU-LCS-103', moduleSubject: 'HU-LCS-103 > Integrated Musculoskeletal Assessment', universities: 'hu',
    signal: 'Family-163 Q12 prints D, Lumbar prolapsed nucleus pulposus; both key layers agree.', uncertainty: 'No imaging confirmation is printed in Q12; the keyed diagnosis remains source-bound and Draft.',
  },
  {
    id: conceptIds.osteosarcoma, key: 'bonetumor.osteosarcoma-clinicoradiologic-and-malignant-osteoid', type: 'update',
    label: 'Osteosarcoma produces malignant osteoid and may show a metaphyseal sunburst mass with periosteal lifting',
    aliases: 'Osteosarcoma malignant osteoid\nSunburst and periosteal lifting\nMetaphyseal osteogenic sarcoma',
    definition: 'Family-163 Q13 describes a painful swollen knee region in a 12-year-old with anaplastic osteoid-producing cells. The source prints a metaphyseal mass with sunburst appearance and periosteal lifting as the characteristic x-ray finding.',
    objective: 'Connect malignant osteoid with the exact source-keyed metaphyseal sunburst and periosteal-lifting pattern.',
    pitfalls: 'Do not substitute a soap-bubble epiphyseal lesion, onion-skin diaphyseal lesion, radiolucent core or growth-plate projection.',
    conceptType: 'clinicoradiologic pattern', micro: 'Osteosarcoma malignant osteoid and radiology', article: articleIds.tumours,
    articles: `ART-HU-LCS103-PAT-F102-BONE-FORMING-TUMOURS\nART-HU-LCS103-PAT-F102-SELECTED-BONE-TUMOURS\nART-HU-LCS103-PAT-F102-CLOSURE-METASTASIS-SUBTYPES\n${articleIds.tumours}`,
    resources: `src_ea4daee0a71cf5f3171e\n${source.boneTumourTeaching}\n${source.assessment}`,
    claims: 'CLM-HULCS103-F102-OSTEOSARCOMA-01\nCLM-HULCS103-F102-OSTEOSARCOMA-Q12-17-01\nCLM-HULCS103-F102-OSTEOSARCOMA-CLOSURE-01\nCLM-HULCS103-F163-BONE-TUMOURS-01',
    signal: 'Family-163 Q13 prints B; both key layers agree.', uncertainty: '[clear]',
  },
  {
    id: conceptIds.myelomaPrognosis, key: 'multiple-myeloma-prognosis-beta2-microglobulin', type: 'new',
    label: 'Elevated beta 2 macroglobulin is the source-keyed adverse prognostic sign in multiple myeloma',
    aliases: 'Multiple myeloma prognosis\nBeta 2 macroglobulin in myeloma\nPlasma-cell neoplasm staging marker',
    definition: 'Family-163 Q14 describes a plasma-cell neoplasm with lytic rib lesions, M protein, anaemia, hypercalcaemia and renal dysfunction, then prints elevated beta 2 macroglobulin as a sign of bad prognosis. The exact source spelling is retained without correction.',
    objective: 'Identify elevated beta 2 macroglobulin as the exact source-keyed adverse prognostic sign in this multiple-myeloma occurrence.',
    pitfalls: 'Do not silently change the printed phrase to beta-2 microglobulin. Do not merge the prognostic scope into the broader diagnostic myeloma concept.',
    conceptType: 'prognostic marker', micro: 'Multiple myeloma prognosis', article: articleIds.tumours,
    resources: `${source.assessment}\n${source.boneTumourTeaching}`, claims: 'CLM-HULCS103-F163-MYELOMA-01',
    signal: 'Family-163 Q14 prints C, Elevated beta 2 macroglobulin; both key layers agree.', uncertainty: 'The literal source spelling “beta 2 macroglobulin” is preserved and requires faculty review.',
  },
]

const conceptBase = (spec) => ({
  label: spec.label, id: spec.id, canonical_key: spec.key, aliases: spec.aliases, arabic_label: '', arabic_aliases: '',
  status: 'under review', support_mode: 'direct_statement', subject: spec.subject ?? 'msk', primary_node_id: spec.primary ?? 'SYS-MSK', secondary_node_ids: spec.secondary ?? 'DIS-PAT-T03',
  topic: spec.topic ?? 'Musculoskeletal system', subtopic: spec.subtopic ?? 'Bone, joint and nerve-root disorders', nanotopic: '', modules: spec.modules ?? 'HU-LCS-103',
  module_subject: spec.moduleSubject ?? 'HU-LCS-103 > Integrated Musculoskeletal Assessment', universities: spec.universities ?? 'hu', learner_years: '1',
  approved_file_resource_ids: '[clear]', approved_video_resource_ids: '[clear]', blueprint_weight: '0.84', exam_weight_by_year: 'HU_Y1=0.84',
  clinical_relevance: '0.82', academic_relevance: '0.98', weight_confidence: '0.58', confidence: '0.84', resource_occurrence_ids: '[clear]',
  source_candidate_ids: '[clear]', merge_ids: '[clear]', rejected_merge_candidate_ids: spec.type === 'new'
    ? 'Four-query search across live, pending, prior-import and accepted-LCS surfaces found no substantive same-scope materialized rival; exact partial matches remain separate.'
    : 'Exact-ID update selected; no rival concept ID is introduced.',
  evidence_gaps: 'Independent medical verification and named Helwan faculty review are required before publication.',
  owner: 'Helwan Year-1 authoring lane', reviewer: 'Medical team, Helwan faculty', final_publisher: 'Admin team', last_reviewed: '', review_due: '',
  publication_status: 'needs_evidence', editorial_review_status: 'drafted_not_reviewed', exclusion_reason: '', definition: spec.definition,
  explicit_objective: spec.objective, pitfalls: spec.pitfalls, concept_type: spec.conceptType, microtopic: spec.micro,
  article_ids: spec.articles ?? spec.article, related_article_ids: spec.articles ?? spec.article, resource_ids: spec.resources, exam_signal: spec.signal,
  atomic_claim_ids: spec.claims, original_wording: spec.signal, conflicts: '[clear]', uncertainty: spec.uncertainty,
  field_notes: [
    'microtopicId: The reviewed taxonomy stops at the assigned canonical node; the source-specific microtopic is retained as prose.',
    'nanotopicId: No reviewed nanotopic ID is assigned.',
    'approvedFileResourceIds: No source file is rights-cleared for redistribution.',
    'approvedVideoResourceIds: No video is assigned.',
    'resourceOccurrenceIds: Hand-authored from the governed Family-163 source and local teaching support; no extraction occurrence is asserted.',
    `sourceCandidateIds: Governed reconciliation established ${spec.type === 'new' ? 'an accepted but previously unmaterialized exact scope' : 'same-ID reuse'} before authoring.`,
    'mergeIds: No concept was merged in this slice.',
    'lastReviewed: Draft record; no named faculty review has occurred.',
    'reviewDue: Set after the first named review.',
    'exclusionReason: Not excluded; held at needs_evidence.',
    'arabicLabel: Blank pending independently verified Arabic terminology review.',
    'arabicAliases: Blank pending independently verified Arabic terminology review.',
  ].join('\n'),
})
const concepts = conceptSpecs.map(conceptBase)

const claimSpecs = [
  {
    code: 'OSTEOPOROSIS', concept: conceptIds.osteoporosis, article: articleIds.fragility,
    text: 'The local Family-163 source keys osteoporosis for a low-bone-density lumbar presentation, while the Helwan bone-disease summary describes osteoporosis as loss of bone mass associated with fracture risk.',
    object: 'a low-bone-density and fragility-fracture pattern keyed to osteoporosis', assessPage: '2', assessSection: 'Family-163 Q1',
    assessSpan: 'Q1 prints B, Osteoporosis, in both the formal key and red handwritten answer layer.',
    teaching: source.boneTeaching, teachPage: '15-20', teachSection: 'Osteoporosis',
    teachSpan: 'The lecture summary presents osteoporosis through loss of bone mass, fragility and fracture complications.',
  },
  {
    code: 'NONUNION', concept: conceptIds.nonunion, article: articleIds.fragility,
    text: 'Family-163 keys poor alignment as the risk in a one-year radius-shaft nonunion occurrence; the local bone-disease summary supplies only general fracture context and does not independently establish the alignment answer.',
    object: 'poor alignment as the printed risk in the exact radius-shaft nonunion occurrence', assessPage: '2', assessSection: 'Family-163 Q2',
    assessSpan: 'Q2 prints E, Poor alignment, in both the formal key and red handwritten answer layer.',
    teaching: source.boneTeaching, teachPage: '33', teachSection: 'Fractures',
    teachSpan: 'The lecture summary reviews fracture definitions and classification but does not independently state the Q2 poor-alignment answer.',
  },
  {
    code: 'MYELOMA', concept: conceptIds.myeloma, article: articleIds.tumours,
    text: 'Family-163 keys the monoclonal M-spike and multiple-myeloma diagnosis in lytic-bone presentations and keys elevated beta 2 macroglobulin as a bad prognostic sign.',
    object: 'a lytic plasma-cell neoplasm with monoclonal protein and the source-keyed adverse prognostic marker', assessPage: '3-7', assessSection: 'Family-163 Q4, Q5 and Q14',
    assessSpan: 'Q4 prints D, Monoclonal antibody spike (M-spike); Q5 prints B, Multiple myeloma; Q14 prints C, Elevated beta 2 macroglobulin.',
    teaching: source.boneTumourTeaching, teachPage: '2-8', teachSection: 'Bone diseases and tumours',
    teachSpan: 'The governed local bone-disease lecture provides plasma-cell, lytic-lesion and bone-tumour context but does not independently repair the Family-163 wording.',
  },
  {
    code: 'BONE-TUMOURS', concept: conceptIds.osteosarcoma, article: articleIds.tumours,
    text: 'Family-163 keys the small NSAID-responsive osteoid-osteoma pattern, fibrosarcoma herringbone spindle cells, and osteosarcoma malignant-osteoid sunburst pattern as three separate tumour occurrences.',
    object: 'three separate source-keyed tumour patterns: osteoid osteoma, fibrosarcoma and osteosarcoma', assessPage: '4-6', assessSection: 'Family-163 Q6, Q7 and Q13',
    assessSpan: 'Q6 prints A, a less-than-one-centimetre mass with a radiolucent core; Q7 prints B, Fibrosarcoma; Q13 prints B, metaphyseal sunburst mass with periosteal lifting.',
    teaching: source.softTissueTeaching, teachPage: '1-18', teachSection: 'Soft-tissue tumours',
    teachSpan: 'The governed local tumour lecture supports fibrosarcoma spindle-cell morphology; separate existing Helwan bone-tumour teaching supports osteoid and osteosarcoma context.',
  },
  {
    code: 'CAUDA', concept: conceptIds.cauda, article: articleIds.disc,
    text: 'Family-163 keys cauda equina for sudden lower-back pain with urinary retention and MRI-demonstrated disc prolapse, while the local cartilage lecture independently supports only general disc herniation and root compression.',
    object: 'the source-keyed cauda-equina structure in a disc-prolapse and urinary-retention occurrence', assessPage: '5', assessSection: 'Family-163 Q8',
    assessSpan: 'Q8 prints A, Cauda equina, in both key layers; the stem supplies no disc level.',
    teaching: source.discTeaching, teachPage: '30', teachSection: 'Intervertebral disc',
    teachSpan: 'The lecture describes annulus fibrosus, nucleus pulposus and nerve-root compression from disc prolapse but does not name cauda equina or a level.',
  },
  {
    code: 'DISC', concept: conceptIds.disc, article: articleIds.disc,
    text: 'Family-163 keys lumbar prolapsed nucleus pulposus for lower-back pain radiating down the leg with pain reproduced by straight-leg raising, and the local cartilage lecture describes disc herniation with nerve-root compression.',
    object: 'a lumbar disc-prolapse pattern with radiating root pain and positive straight-leg raising', assessPage: '6-7', assessSection: 'Family-163 Q12',
    assessSpan: 'Q12 prints D, Lumbar prolapsed nucleus pulposus, in both key layers; no confirmatory imaging is printed.',
    teaching: source.discTeaching, teachPage: '30', teachSection: 'Intervertebral disc',
    teachSpan: 'The lecture describes nucleus-pulposus herniation through the annulus and resulting nerve-root compression with severe pain.',
  },
]

const articleSpecs = [
  {
    id: articleIds.fragility, title: 'Bone fragility and fracture nonunion in the Family-163 assessment',
    aliases: 'Family-163 osteoporosis and nonunion\nBone density, fracture risk and alignment', micro: 'Osteoporosis and fracture healing', reading: '7',
    concepts: `${conceptIds.osteoporosis}\n${conceptIds.nonunion}`, questions: 'Q-HU-LCS103-MSK-F163-01\nQ-HU-LCS103-MSK-F163-02',
    sources: `${source.assessment}\n${source.boneTeaching}`, claimCodes: ['OSTEOPOROSIS', 'NONUNION'],
    summary: 'This Draft article keeps the two opening Family-163 occurrences separate: osteoporosis is keyed for the densitometry pattern, while poor alignment is keyed for radius-shaft nonunion.',
    sections: [
      '### Definition',
      'Osteoporosis is a disorder of reduced bone mass and increased fragility. Fracture nonunion means that a fracture has failed to unite over the expected interval. Family-163 tests these as separate assessment patterns and does not establish a complete diagnostic or management pathway.',
      '', '### Mechanism',
      'The local bone-disease summary describes osteoporosis as loss of bone mass with increased fracture risk and relates the balance of bone formation and resorption to skeletal density. Family-163 Q1 uses densitometry in the lumbar region and prints osteoporosis, but its phrase “more than 2 standard deviations” is preserved as source wording rather than silently normalised.',
      '',
      'For Q2, the radius remains ununited one year after a forearm fracture and the source keys poor alignment. Mechanical alignment can affect fracture stability, but the Helwan teaching source cited here provides only general fracture context; it does not independently prove the printed option. The item therefore remains Draft and source-bound.',
      '', '### Key determinants',
      'Low bone density with fracture susceptibility directs the Family-163 occurrence to osteoporosis. Persistent motion and radiographic nonunion after a shaft fracture direct attention to healing failure, while the exact source answer selects poor alignment among the supplied risks.',
      '', '### Clinical significance',
      'These records preserve what the local question bank tests. They are not clinical diagnostic thresholds or treatment recommendations. Independent medical verification and named Helwan faculty review are required before publication.',
      '', '### Common misconceptions',
      'Do not change the Q1 threshold to a different number. Do not merge Q2 into the vascular nonunion mechanism of a fractured femoral neck. Do not claim that the teaching deck independently validates poor alignment when it supplies only fracture context.',
      '', '### Source-bound statements',
      claimSpecs[0].text, claimSpecs[1].text,
    ].join('\n'),
    hold: `${claimSpecs[0].text}\n${claimSpecs[1].text}`,
    lose: 'Changing the literal Q1 densitometry threshold.\nTreating all nonunion as the vascular femoral-neck mechanism.\nPromoting Q2 beyond its source-bound answer evidence.',
    conflicts: 'Q1 uses “more than 2 standard deviations” and Q2 asks for the “most likely risk”; both are retained literally and require review.',
    notes: 'No answer repair is performed. Q3 remains held because its formal and red key layers conflict.',
    relatedArticles: articleIds.tumours,
  },
  {
    id: articleIds.tumours, title: 'Family-163 tumour patterns: myeloma, osteoid osteoma, fibrosarcoma and osteosarcoma',
    aliases: 'Family-163 bone and soft-tissue tumour patterns\nMyeloma and primary tumour discriminators', micro: 'Tumour clinicopathologic patterns', reading: '10',
    concepts: `${conceptIds.myeloma}\n${conceptIds.osteoid}\n${conceptIds.fibrosarcoma}\n${conceptIds.osteosarcoma}\n${conceptIds.myelomaPrognosis}`,
    questions: 'Q-HU-LCS103-MSK-F163-04\nQ-HU-LCS103-MSK-F163-05\nQ-HU-LCS103-MSK-F163-06\nQ-HU-LCS103-MSK-F163-07\nQ-HU-LCS103-MSK-F163-13\nQ-HU-LCS103-MSK-F163-14',
    sources: `${source.assessment}\n${source.boneTumourTeaching}\n${source.softTissueTeaching}`, claimCodes: ['MYELOMA', 'BONE-TUMOURS'],
    summary: 'This Draft article organises six Family-163 tumour occurrences by the exact diagnostic, morphologic, radiologic and prognostic cues printed in the source.',
    sections: [
      '### Definition',
      'Multiple myeloma is a plasma-cell neoplasm associated in these items with lytic skeletal lesions, monoclonal protein, anaemia, hypercalcaemia, renal dysfunction and marrow plasma cells. Osteoid osteoma is a small painful bone-forming lesion. Fibrosarcoma is represented by uniform spindle cells in a herringbone pattern, while osteosarcoma is represented by malignant osteoid and an aggressive metaphyseal radiologic pattern.',
      '', '### Mechanism',
      'Q4 and Q5 use lytic fractures and systemic laboratory abnormalities to build a myeloma cluster. The source then tests the monoclonal M-spike and the disease name separately. Q14 revisits the plasma-cell pattern but asks for a poor prognostic sign, so its beta 2 macroglobulin scope remains distinct from diagnosis.',
      '',
      'Q6 combines nocturnal NSAID-responsive pain with osteoblast-lined trabeculae and sclerosis, then keys the smaller radiolucent-centred lesion. Q7 uses herringbone spindle-cell morphology for fibrosarcoma. Q13 combines malignant osteoid with a metaphyseal sunburst mass and periosteal lifting for osteosarcoma.',
      '', '### Key determinants',
      'An M-spike plus lytic lesions and plasma cells supports the source’s multiple-myeloma pattern. Nocturnal NSAID-responsive pain supports osteoid osteoma. Uniform herringbone spindle cells support fibrosarcoma, and malignant osteoid with sunburst periosteal reaction supports osteosarcoma.',
      '', '### Clinical significance',
      'The records preserve a local question-bank structure rather than establishing clinical diagnostic or staging rules. Q14’s exact “beta 2 macroglobulin” wording is retained, and every item remains Draft pending independent verification and faculty review.',
      '', '### Common misconceptions',
      'Do not change Q6 “core” to “nidus” in the option text. Do not confuse fibrosarcoma with fibromatosis or fibrous dysplasia. Do not merge a myeloma prognostic marker into the broader diagnostic concept.',
      '', '### Source-bound statements',
      claimSpecs[2].text, claimSpecs[3].text,
    ].join('\n'),
    hold: `${claimSpecs[2].text}\n${claimSpecs[3].text}`,
    lose: 'Replacing Q6’s literal “core” wording.\nMissing the herringbone fibrosarcoma cue.\nChanging the Q14 phrase beta 2 macroglobulin.',
    conflicts: 'No key-layer conflict occurs in these six records. Q6 and Q14 retain explicit wording risks without repair.',
    notes: 'The prognostic concept remains separate from the multiple-myeloma diagnostic concept. Q3 is not imported.',
    relatedArticles: articleIds.fragility,
  },
  {
    id: articleIds.disc, title: 'Lumbar disc prolapse, nerve-root pain and the source-keyed cauda-equina pattern',
    aliases: 'Family-163 disc compression\nLumbar disc prolapse and cauda equina\nRadicular pain from nucleus pulposus herniation', micro: 'Disc prolapse and neural compression', reading: '7',
    concepts: `${conceptIds.cauda}\n${conceptIds.disc}`, questions: 'Q-HU-LCS103-MSK-F163-08\nQ-HU-LCS103-MSK-F163-12',
    sources: `${source.assessment}\n${source.discTeaching}`, claimCodes: ['CAUDA', 'DISC'],
    summary: 'This Draft article distinguishes the general disc-herniation and radicular-pain mechanism from the narrower source-keyed cauda-equina and urinary-retention occurrence.',
    sections: [
      '### Definition',
      'An intervertebral disc contains an outer annulus fibrosus and an inner nucleus pulposus. Herniation of the nucleus through the annulus can compress neural structures and produce radiating pain. Family-163 tests one ordinary lumbar-prolapse pattern and one urinary-retention occurrence keyed to cauda equina.',
      '', '### Mechanism',
      'The Helwan cartilage lecture states that nucleus-pulposus herniation can compress nerve roots and cause severe pain. Q12 supplies lower-back pain that radiates to the posterior leg and is reproduced by raising either leg, then prints lumbar prolapsed nucleus pulposus. It does not supply confirmatory imaging.',
      '',
      'Q8 supplies sudden lower-back pain, urinary retention and MRI-demonstrated disc prolapse, then prints cauda equina. Because the source does not state a disc level, the narrower structural attribution remains a source-keyed Draft claim rather than a fully verified clinical rule.',
      '', '### Key determinants',
      'Radiating leg pain with straight-leg-raising reproduction supports the source’s lumbar-prolapse pattern. Urinary retention is a red-flag feature in the separate Q8 occurrence, but only the question bank—not the local teaching lecture—names cauda equina in this exact scenario.',
      '', '### Clinical significance',
      'The article is an assessment explanation, not a clinical triage protocol. It preserves the source’s two printed answers and states what the teaching lecture independently covers. Publication requires independent medical verification and named faculty review.',
      '', '### Common misconceptions',
      'Do not invent a disc level for Q8. Do not claim imaging confirmation in Q12. Do not collapse the general nerve-root concept into the more specific cauda-equina syndrome concept.',
      '', '### Source-bound statements',
      claimSpecs[4].text, claimSpecs[5].text,
    ].join('\n'),
    hold: `${claimSpecs[4].text}\n${claimSpecs[5].text}`,
    lose: 'Inventing a disc level.\nClaiming Q12 includes imaging.\nTreating the cauda-equina attribution as independently verified.',
    conflicts: 'No key-layer conflict occurs, but Q8 is underspecified because no disc level is printed.',
    notes: 'Q9 remains held because its formal and red key layers conflict.',
    relatedArticles: articleIds.fragility,
  },
]

const articleBase = (spec) => ({
  id: spec.id, title: spec.title, aliases: spec.aliases, arabic_title: '', subject: 'msk', topic: 'Musculoskeletal system',
  subtopic: 'Bone, joint and nerve-root disorders', primary_node_id: 'SYS-MSK', template_id: 'TPL-CONCEPT', archetype: 'concept', language: 'en',
  learner_stage: 'Years 1–3 foundation', high_yield: 'High', time_sensitive: 'stable', status: 'Draft', owner: 'Helwan Year-1 authoring lane',
  reviewer: 'Medical team, Helwan faculty', final_publisher: 'Admin team', published_summary: '', published_sections: '', universities: 'hu',
  years: 'HU_Y1', module: 'HU-LCS-103', media: '', publication_gate: 'needs_evidence', conflicts: spec.conflicts,
  evidence_gaps: 'Independent medical verification and named Helwan faculty review are required before publication.', last_reviewed: '', review_due: '',
  microtopic: spec.micro, nanotopic: '', secondary_node_ids: 'DIS-PAT-T03', reading_time: spec.reading, summary: spec.summary, sections: spec.sections,
  hold_these: spec.hold, lose_the_mark: spec.lose, related_concepts: spec.concepts, related_articles: spec.relatedArticles, question_ids: spec.questions,
  resource_ids: spec.sources, module_subject: 'HU-LCS-103 > Integrated Musculoskeletal Assessment',
  university_notes: 'hu: Restricted to governed Family-163 assessment evidence and the listed local Helwan teaching sources.',
  annotations: spec.claimCodes.map((code) => { const claim = claimSpecs.find((row) => row.code === code); return `### definition_of · ${claim.concept}\nQuote: ${claim.text}\nBlock: body` }).join('\n\n'),
  article_source_ids: spec.sources, claim_ids: spec.claimCodes.map((code) => `CLM-HULCS103-F163-${code}-01`).join('\n'),
  span_ids: spec.claimCodes.map((code) => `SPN-HULCS103-F163-${code}-01`).join('\n'), media_recommendations: '',
  callout_evidence: spec.claimCodes.map((code) => `### ${claimSpecs.find((row) => row.code === code).text}\nClaims: CLM-HULCS103-F163-${code}-01\nCitations: CIT-HULCS103-F163-${code}-ASSESS-01, CIT-HULCS103-F163-${code}-TEACH-01\nSpan: SPN-HULCS103-F163-${code}-01`).join('\n\n'),
  evidence_basis: 'Family-163 supplies exact stems, options and two agreeing source-key layers. Local Helwan teaching supplies explanation context. None counts as independent medical verification.',
  notes: spec.notes,
  field_notes: 'arabicTitle: Blank pending reviewed terminology.\nnanotopicId: No reviewed nanotopic exists below SYS-MSK.\nmedia: No media is required.\npublishedSummary: Blank because this remains Draft.\npublishedSections: Blank because this remains Draft.\nlastReviewed: No named medical review completed.\nreviewDue: Set after first named review.',
})
const articles = articleSpecs.map(articleBase)

const sources = [
  {
    id: source.assessment, title: 'LCS Questions Bank — Dr. Hebatallah Amin', institution: 'Helwan LCS-103 local question-bank corpus',
    processing_status: 'native_text', collection_id: 'hu-y1', source_relative_path: 'Year 1/LCS 103/All Subjects/Notes and Summaries/4_5960941546265122352.pdf',
    source_uri: '', media_type: 'application/pdf', languages: 'en', publication_date: '', accessed_at: '', page_count: '37',
    sha256: '79b5752c4d6f23e6dafc8c360427669b1f654797c1a7bd0eb7ed9b084825cc1a',
    rights: 'Local Helwan teaching and assessment material held for internal authoring only. No page image is redistributed.',
    qualification: 'Tier-6 direct LCS question bank visibly titled LCS QUESTIONS BANK and naming Dr. Hebatallah Amin. Pages 2-34 contain 77 five-option MCQs with red handwritten answers; pages 35-37 print a complete formal key. It is course-bank evidence, not an official sitting paper.',
    confidence: '0.84', is_assessment: 'yes',
  },
  {
    id: source.boneTeaching, title: 'Approach to Bone Diseases, Part 1 — Dr. Hebat Allah Amin', institution: 'Helwan University local LCS-103 teaching corpus',
    processing_status: 'ocr_required', collection_id: 'hu-y1', source_relative_path: 'Year 1/LCS 103/All Subjects/Notes and Summaries/103 LCS Approach to Bone diseases 1_240716_164443.pdf',
    source_uri: '', media_type: 'application/pdf', languages: 'en', publication_date: '', accessed_at: '', page_count: '37',
    sha256: '718e08dfb6d19109dabfbcbe4ba9392092defe7f322e661d0e0aecee7763f53d',
    rights: 'Local Helwan teaching material held for internal authoring only. No page image is redistributed.',
    qualification: 'Tier-6 Helwan annotated teaching summary titled APPROACH TO BONE DISEASES and naming Dr Hebat Allah Amin. It is teaching support, not an assessment key; source annotation risks remain uncorrected.',
    confidence: '0.82', is_assessment: 'no',
  },
  {
    id: source.discTeaching, title: 'Cartilage Lecture — Dr. Heba Abd Alrazak', institution: 'Helwan University local Histology teaching corpus',
    processing_status: 'ocr_required', collection_id: 'hu-y1', source_relative_path: 'Year 1/LCS 103/Histology/Theoretical/Lec 1 - Cartilage/cartilage2  medical - record - Copy - Copy.pdf',
    source_uri: '', media_type: 'application/pdf', languages: 'en', publication_date: '', accessed_at: '', page_count: '33',
    sha256: '252ae116a3911d2020a2d814ccf5ec639b698ca9ba0e05320c245f793f7982e6',
    rights: 'Local Helwan teaching material held for internal authoring only. No page image is redistributed.',
    qualification: 'Tier-4 Helwan Histology lecture naming Dr Heba Abd Alrazak. Page 30 directly teaches annulus fibrosus, nucleus pulposus and nerve-root compression from disc prolapse. It is teaching support, not answer-key evidence.',
    confidence: '0.86', is_assessment: 'no',
  },
]

const claims = claimSpecs.map((spec) => ({
  id: `CLM-HULCS103-F163-${spec.code}-01`, concept_id: spec.concept, subject: spec.code.replaceAll('-', ' '),
  predicate: 'is presented in the governed local sources as', object: spec.object, display_text: spec.text,
  risk_class: 'foundational_stable', verification_status: 'needs_evidence', conflict_status: 'none', confidence: '0.82',
  freshness: 'stable_local_curriculum_fact', time_sensitive: 'no',
  qualifiers: `polarity: affirmative\nauthority: local Helwan assessment and teaching support, not independent verification\nassessment boundary: Family-163 Q1-Q14 excluding held Q3 and Q9`,
}))
const citations = claimSpecs.flatMap((spec) => [
  {
    id: `CIT-HULCS103-F163-${spec.code}-ASSESS-01`, claim_id: `CLM-HULCS103-F163-${spec.code}-01`, resource_id: source.assessment,
    evidence_role: 'direct_assessment_support', locator_type: 'page', locator_page: spec.assessPage, locator_section: spec.assessSection,
    locator_detail: `Family-163 physical PDF p${spec.assessPage}, exact printed occurrence and formal/red key evidence.`, support_span: spec.assessSpan,
    context_note: 'Direct local assessment support for Draft records; not independent medical verification.', confidence: '0.84', counts_as_claim_evidence: 'no',
  },
  {
    id: `CIT-HULCS103-F163-${spec.code}-TEACH-01`, claim_id: `CLM-HULCS103-F163-${spec.code}-01`, resource_id: spec.teaching,
    evidence_role: 'local_curriculum_support', locator_type: 'page', locator_page: spec.teachPage, locator_section: spec.teachSection,
    locator_detail: `Governed local Helwan teaching source, physical PDF p${spec.teachPage}.`, support_span: spec.teachSpan,
    context_note: 'Local teaching support for explanation context; not independent medical verification and not answer-key authority.', confidence: '0.84', counts_as_claim_evidence: 'no',
  },
])
const spans = claimSpecs.map((spec) => ({
  id: `SPN-HULCS103-F163-${spec.code}-01`, article_id: spec.article,
  section_id: `${spec.article.toLowerCase()}-source-bound-statements`, text: spec.text, claim_ids: `CLM-HULCS103-F163-${spec.code}-01`,
  citation_ids: `CIT-HULCS103-F163-${spec.code}-ASSESS-01\nCIT-HULCS103-F163-${spec.code}-TEACH-01`,
}))

const rows = [
  [1, 'B', 'A 58-year-old woman presents with low back pain. On physical examination, her BMI is 29. Bone densitometry shows her bone mass decreased more than 2 standard deviations below the adult mean in her lumbar vertebral region. These findings are most likely to be associated with which of the following disorders?', ['Hypoparathyroidism', 'Osteoporosis', 'Hyperuricemia', 'Hypercholesterolemia', 'Hepatic cirrhosis'], conceptIds.osteoporosis, articleIds.fragility, '2', 'The source says more than 2 standard deviations rather than the conventional 2.5-SD threshold; the wording and B key are retained without repair.'],
  [2, 'E', 'A 22-year-old man is involved in a car crash. He incurs a fracture to both bones in his right forearm. A year later there is pain with movement. A radiograph of his forearm shows nonunion of the radius mid-shaft. Which of the following is the most likely risk for this complication?', ['Diabetes mellitus', 'Hyperparathyroidism', 'Osteomyelitis', 'Osteoporosis', 'Poor alignment'], conceptIds.nonunion, articleIds.fragility, '2', 'The phrase most likely risk is preserved; nonunion is multifactorial and the local teaching source does not independently establish poor alignment.'],
  [4, 'D', 'A 67-year-old male is brought to the emergency center for leg pain. The family has noted that for approximately the past 4 months, the patient is fatigued with loss of appetite. He is thin and afebrile, and his blood pressure is 100/85 mm Hg and heart rate is 75 bpm. His thyroid gland is normal to palpation. Radiology reveals a lytic bony lesion associated with fracture of the femur. The serum creatinine level is 3.0 mg/dL and the hemoglobin level is 8.9 g/dL. Which of the following is a likely associated laboratory finding?', ['Hypocalcemia', 'Hypogammaglobulinemia', 'Increased levels of T4', 'Monoclonal antibody spike (M-spike)', 'Polyclonal antibody spike'], conceptIds.myeloma, articleIds.tumours, '3', 'No key conflict is present; the exact laboratory units, punctuation and M-spike wording are retained.'],
  [5, 'B', 'A 63-year-old woman is brought to the emergency center for upper arm pain and swelling following a fall at home. The family has noted that for approximately the past 2 months, the patient has become progressively fatigued and absentminded, and she has developed loss of appetite and weight loss. This morning, she has lost her balance because she felt “light-headed” and fell, landing on her left arm. On physical examination, she is an elderly, thin woman in mild distress as a result of pain. She is afebrile, and her blood pressure is 110/70 mm Hg and heart rate is 80 bpm. Her thyroid gland is normal to palpation. Her mucous membranes are somewhat dry and sticky. Radiology reveals a fracture of the mid-left humerus with an associated lytic lesion. The serum creatinine level is 2.1 mg/dL, with normal electrolyte and glucose concentrations, but the serum calcium level is 13 mg/dL and the hemoglobin level is 9.2 g/dL. What is the underlying Etiology?', ['Erythema chronicum migrans', 'Multiple myeloma', 'Rheumatoid arthritis', 'Sickle cell anemia', 'Systemic lupus erythematosus'], conceptIds.myeloma, articleIds.tumours, '3-4', 'The source capitalises Etiology; the long narrative, punctuation and B key are preserved exactly.'],
  [6, 'A', 'A 15-year-old boy presents with intense localized pain in his left thigh, worse at night, relieved by NSAIDs. Microscopically, osteoblasts are shown lining randomly connected trabeculae with surrounding sclerotic bone. What is the characteristic radiological finding of this lesion?', ['A bony mass (<1cm) with a radiolucent core', 'Lateral projection of the growth plate', 'Laminated periosteum', 'Osteolytic bone destruction with calcifications', 'A bony mass (>2cm) with a radiolucent nidus'], conceptIds.osteoid, articleIds.tumours, '4', 'Option A literally says radiolucent core rather than nidus; the exact option and A key are retained without repair.'],
  [7, 'B', 'A 40-year-old man presents with pain and a palpable mass in the right thigh. Radiological examination reveals a highly destructive lesion. A biopsy is performed and uniform spindle cells with a herringbone pattern are shown on histological examination. What is the most likely diagnosis?', ['Differentiated liposarcoma', 'Fibrosarcoma', 'Osteosarcoma', 'Fibromatosis', 'Fibrous dysplasia'], conceptIds.fibrosarcoma, articleIds.tumours, '4', 'No key-layer conflict or wording anomaly is present.'],
  [8, 'A', 'A 72-year-old man presents with a sudden onset of lower back pain along with urine retention. He denies any history of trauma and extensive work. On physical examination, he is afebrile, his blood pressure is 118/79 and his pulse rate is 75 beats/min. The physician orders an MRI which reveals disc prolapse. What is the affected structure?', ['Cauda equina', 'Cervical segment of spinal cord', 'Lumbar segment of spinal cord', 'Sacral segment of spinal cord', 'Thoracic segment of spinal cord'], conceptIds.cauda, articleIds.disc, '4-5', 'The source gives no disc level, so the cauda-equina attribution is preserved as an underspecified Draft source-keyed occurrence.'],
  [10, 'B', 'A 40-year-old woman newly diagnosed with type 1 diabetes wanted to keep wearing fashion shoes as she had a corporate-type job. Her first blister saw her heel go black; a pharmacist gave her an antimicrobial cream but the infection escalated until she needed a skin graft and was hospitalized for a long time. The woman had been fit, healthy and had her diabetes well under control until the ulcers developed. Which of the following complications involving bone is she most likely to develop?', ['Chondrocalcinosis', 'Osteomyelitis', 'Osteopetrosis', 'Osteosarcoma', 'Squamous cell carcinoma'], conceptIds.diabeticOsteomyelitis, articleIds.osteomyelitis, '5-6', 'The narrative’s causal diabetic-foot inference is preserved as source evidence and not promoted into a complete clinical diagnostic rule.'],
  [11, 'B', "A 54-year-old woman has been employed for 17 years in the manufacturing industry. She has missed little work and continues to perform her regular duties, which include spending many hours each day at an assembly station. She also spends time each day at her home computer. The patient presents to her physician's office with chronic pain, tingling, and numbness in her right hand and wrist. The patient also indicates that she is unable to take anti-inflammatory medication due to a peptic ulcer and that she has had no success alleviating symptoms with other medications. She also reports a history of hypertension and recent-onset arthritis. What is the most effective treatment?", ['Calcium tablets', 'Endoscopic carpal tunnel release', 'Methotrexate', 'NSAIDs', 'Vitamin D therapy'], conceptIds.carpalRelease, articleIds.anatomy, '6', 'The item asks for most effective treatment without a complete diagnostic or conservative-work-up; B remains source-keyed and Draft.'],
  [12, 'D', 'A 59-year-old woman complains of a 3-month history of lower back pain that is worsened by walking and relieved by lying down. She states that at times the pain radiates to the back of her right leg. She denies back trauma or heavy lifting. On physical examination, her blood pressure is 125/79 mm Hg and pulse rate 78 beats/min; she is afebrile. She is slightly overweight. The heart and lung examinations show no abnormalities. The back is without scoliosis. Raising either leg reproduces the pain, which radiates to the right leg. The results from the neurologic examination are normal. What is the most likely diagnosis?', ['Bone tumor', 'Degenerative disc disease', 'Joint subluxation', 'Lumbar prolapsed nucleus pulposus', 'Rheumatoid arthritis'], conceptIds.disc, articleIds.disc, '6-7', 'No imaging confirmation is printed in Q12; the exact D key remains source-bound and Draft.'],
  [13, 'B', 'A 12-year-old boy complains of pain in his right knee for the past 3 weeks. On physical examination, his right knee is found to be swollen and tender to palpation. Biopsy shows anaplastic osteoid-producing cells. Which of the following is the characteristic x-ray finding of this lesion?', ['Epiphyseal lytic lesion with soap bubble appearance', 'Metaphyseal mass with sunburst appearance and periosteal lifting', 'Diaphyseal mass with onion skin appearance', 'Diaphyseal bony mass with radiolucent core', 'Lateral projection of the growth plate'], conceptIds.osteosarcoma, articleIds.tumours, '7', 'No key-layer conflict or wording anomaly is present.'],
  [14, 'C', 'A 63-year-old woman has had severe upper back pain. Tests show elevated creatinine level and hypercalcemia, hemoglobin is 9.7 g/dL, albumin 2.9 g/dL. Chest radiograph shows lytic bone lesions in the ribs. Urine analysis shows M protein. Aspirates from thoracic vertebrae show soft, gelatinous hemorrhagic material. Microscopic examination reveals interstitial clusters of plasma cells. Which of these is a sign of a bad prognosis?', ['Absence of M protein', 'Decreased plasma cell proliferation', 'Elevated beta 2 macroglobulin', 'High serum albumin', 'Low CRP level'], conceptIds.myelomaPrognosis, articleIds.tumours, '7', 'The exact source spelling beta 2 macroglobulin is retained without correction; C remains Draft pending faculty review.'],
]

const objective = {
  [conceptIds.osteoporosis]: 'Recognise the source-keyed osteoporosis pattern while preserving the exact densitometry wording.',
  [conceptIds.nonunion]: 'Identify poor alignment as the exact source-keyed risk in the radius-shaft nonunion occurrence.',
  [conceptIds.myeloma]: 'Recognise multiple myeloma from lytic lesions, monoclonal protein, anaemia, hypercalcaemia and renal dysfunction.',
  [conceptIds.osteoid]: 'Recognise the source-keyed osteoid-osteoma pain, size and radiolucent-centre pattern.',
  [conceptIds.fibrosarcoma]: 'Recognise fibrosarcoma from uniform spindle cells in a herringbone pattern.',
  [conceptIds.cauda]: 'Identify cauda equina as the exact source-keyed structure in the urinary-retention disc-prolapse occurrence.',
  [conceptIds.diabeticOsteomyelitis]: 'Recognise osteomyelitis as the exact source-keyed bone complication of the diabetic heel ulcer.',
  [conceptIds.carpalRelease]: 'Identify endoscopic carpal tunnel release as the exact source-keyed treatment.',
  [conceptIds.disc]: 'Recognise the exact source-keyed lumbar prolapsed nucleus pulposus pattern.',
  [conceptIds.osteosarcoma]: 'Recognise osteosarcoma from malignant osteoid and the source-keyed metaphyseal sunburst pattern.',
  [conceptIds.myelomaPrognosis]: 'Identify elevated beta 2 macroglobulin as the exact source-keyed bad prognostic sign.',
}
const common = {
  subject: 'msk', status: 'Draft', owner: 'Helwan Year-1 authoring lane', vignette: '', format: 'single best answer', written_parts: '',
  matching_options: '', matching_prompts: '', correct_answers: '', labeling_image: '', labeling_alt: '', labeling_points: '', completion_text: '', derived_from: '',
  topic: 'Musculoskeletal system', subtopic: 'Bone, joint and nerve-root disorders', difficulty: 'Moderate', question_type: 'Integrated LCS', module: 'HU-LCS-103',
  module_subject: 'HU-LCS-103 > Integrated Musculoskeletal Assessment', clinical_relevance: '0.82', academic_relevance: '0.98', cognitive_effort_score: '0.42',
  exam_weight_by_year: 'HU_Y1=0.84', question_only_for: 'HU_Y1', concept_ids: '', years: 'HU_Y1', universities: 'hu', cognitive_effort: 'Medium',
  setting: 'Academic', reasoning_level: '1', inferred_difficulty: '68', exam_relevance: '9', contextual_concept_ids: '', media_recommendations: '', attachments: '',
  attached_image: '', estimated_seconds: '75', randomise_answers: 'yes',
}
const questionResources = (concept) => {
  if ([conceptIds.osteoporosis, conceptIds.nonunion].includes(concept)) return `${source.assessment}\n${source.boneTeaching}`
  if ([conceptIds.myeloma, conceptIds.osteoid, conceptIds.fibrosarcoma, conceptIds.osteosarcoma, conceptIds.myelomaPrognosis].includes(concept)) return `${source.assessment}\n${source.boneTumourTeaching}\n${source.softTissueTeaching}`
  if ([conceptIds.cauda, conceptIds.disc].includes(concept)) return `${source.assessment}\n${source.discTeaching}`
  if (concept === conceptIds.diabeticOsteomyelitis) return `${source.assessment}\n${source.osteomyelitisTeaching}`
  return `${source.assessment}\n${source.anatomyTeaching}`
}
const questions = rows.map(([number, key, stem, options, concept, article, page, risk]) => {
  const fields = { id: `Q-HU-LCS103-MSK-F163-${String(number).padStart(2, '0')}`, title: stem, ...common, question: stem, correct_answer: key }
  for (let index = 0; index < options.length; index += 1) {
    const letter = String.fromCharCode(65 + index)
    const option = options[index]
    fields[`answer_${letter.toLowerCase()}`] = option
    fields[`explanation_${letter.toLowerCase()}`] = letter === key
      ? `Family-163 prints ${key} in both its formal key and red handwritten answer layer for this exact occurrence, so “${option}” is retained as the source-keyed response. The linked Draft article explains the local distinction while preserving the source wording and option order. ${risk} This item remains Draft because local assessment and teaching evidence do not replace independent medical verification.`
      : `The option “${option}” is preserved exactly from Family-163, but both source key layers select ${key} instead. The linked Draft article explains the local assessment distinction without rewriting this distractor or inferring a different answer. ${risk} This item remains Draft pending independent medical verification and named Helwan faculty review.`
  }
  fields.answer_f = ''
  fields.explanation_f = ''
  return {
    ...fields, main_concept: concept, library_ids: article, resource_ids: questionResources(concept), learning_objective: objective[concept],
    source_citation: `${source.assessment}, physical PDF p${page}, printed Q${number}: exact stem/options; formal and red key layers both print ${key}.`,
    author_notes: `Transcribed from governed Family-163 physical p${page}; wording, option order, spelling, punctuation and key are preserved without repair. ${risk} Q3 remains held at formal A/red E and Q9 remains held at formal B/red D; neither is adjudicated or imported. The source contains no practical, written or media task.`,
  }
})

if (questions.length !== 12 || questions.map((row) => row.correct_answer).join('') !== 'BEDBABABBDBC') throw new Error('Family-163 count or key mismatch')
if (concepts.length !== 11 || articles.length !== 3 || sources.length !== 3 || claims.length !== 6 || citations.length !== 12 || spans.length !== 6) throw new Error('Family-163 dependency count mismatch')
await Promise.all(Object.values(paths).map((path) => mkdir(dirname(path), { recursive: true })))
await Promise.all([
  writeFile(paths.concepts, concepts.map(item).join(divider), 'utf8'),
  writeFile(paths.articles, articles.map(item).join(divider), 'utf8'),
  writeFile(paths.sources, sources.map(item).join(divider), 'utf8'),
  writeFile(paths.claims, claims.map(item).join(divider), 'utf8'),
  writeFile(paths.citations, citations.map(item).join(divider), 'utf8'),
  writeFile(paths.spans, spans.map(item).join(divider), 'utf8'),
  writeFile(paths.questions, questions.map(item).join(divider), 'utf8'),
])
console.log(JSON.stringify({ files: paths, counts: { concepts: 11, newConcepts: 5, conceptUpdates: 6, articles: 3, sources: 3, questions: 12, claims: 6, citations: 12, spans: 6 }, keys: 'BEDBABABBDBC', held: ['Q3 formal A/red E', 'Q9 formal B/red D'], practical: 0, written: 0, media: 0 }, null, 2))
