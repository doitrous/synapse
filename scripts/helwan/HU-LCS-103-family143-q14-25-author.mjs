#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../..')
const base = resolve(root, 'docs/Helwan-Source-Imports')
const paths = {
  concepts: resolve(base, 'concept/HU-LCS-103-family143-q14-25-joint-concepts.md'),
  articles: resolve(base, 'article/HU-LCS-103-family143-q14-25-joint-articles.md'),
  claims: resolve(base, 'evidence/HU-LCS-103-family143-q14-25-claims.md'),
  citations: resolve(base, 'evidence/HU-LCS-103-family143-q14-25-citations.md'),
  spans: resolve(base, 'evidence/HU-LCS-103-family143-q14-25-spans.md'),
  questions: resolve(base, 'question/HU-LCS-103-family143-q14-25-mcq.md'),
}
const divider = '\n\n---\n\n'
const item = (fields) => `# Item\n\n${Object.entries(fields).map(([key, value]) => `## ${key}\n${value ?? ''}`).join('\n\n')}\n`
const source = { assessment: 'src_d24024cfcd418918201f', teaching: 'src_6995e894c8b7f13c8809' }
const conceptIds = {
  gout: 'CON-MSK-26A34BABA3FA5B', pseudogout: 'CON-MSK-8A2645A63ADA75', ganglion: 'CON-MSK-8EC65B29B306A6',
  bursitis: 'CON-MSK-89542F9EA00E08', chordoma: 'CON-MSK-70A94F3BD14297', chondroblastoma: 'CON-MSK-8A4079D1114BC4',
}
const articleIds = {
  crystal: 'ART-HU-LCS103-PAT-F143-CRYSTAL-ARTHRITIS',
  cysts: 'ART-HU-LCS103-PAT-F143-GANGLION-BURSITIS',
  tumours: 'ART-HU-LCS103-PAT-F143-CHORDOMA-CHONDROBLASTOMA',
}
const claimId = (code) => `CLM-HULCS103-F143-${code}-02`

const conceptSpecs = [
  {
    code: 'GOUT', id: conceptIds.gout, key: 'pathology.joint.gout-urate-podagra', type: 'update',
    label: 'Gout is recurrent monosodium-urate crystal arthritis that characteristically attacks the great toe as podagra',
    aliases: 'Gouty arthritis\nMonosodium urate arthritis\nPodagra',
    definition: 'Gout is a disorder of purine metabolism associated with hyperuricaemia and deposition of monosodium urate crystals. The governed Family-143 source keys recurrent severe great-toe attacks as gout, monosodium urate as the deposited crystal, and gout of the great toe as podagra.',
    objective: 'Recognise the exact source cues linking recurrent great-toe attacks, monosodium urate and podagra.',
    pitfalls: 'Do not substitute calcium pyrophosphate, which the same source assigns to pseudogout. Do not move podagra away from gout of the great toe.',
    micro: 'Gout, urate crystals and podagra',
    articles: `ART-HU-LCS103-PAT-ARTHRITIS-PATTERNS\n${articleIds.crystal}`,
    relatedArticles: 'ART-HU-LCS103-PAT-PERIARTICULAR-LESIONS\nART-HU-LCS103-PAT-ARTHRITIS-PATTERNS',
    resources: `${source.teaching}\nsrc_d5d701558ddff491b455\n${source.assessment}`,
    claims: `CLM-MSK-HULCS103-F96-GOUT-01\n${claimId('GOUT')}`,
    signal: 'Family-143 Q14–Q16 printed keys C/C/B; prior Family-96 exact-ID occurrences remain preserved.',
    original: '[Family-143 Q14] recurrent severe great-toe pain; printed key C, Gout.\n[Q15] crystal deposited in gout; printed key C, Monosodium urate.\n[Q16] Podagra; printed key B, Gout affecting the great toe.',
  },
  {
    code: 'PSEUDOGOUT', id: conceptIds.pseudogout, key: 'pathology.joint.pseudogout-calcium-pyrophosphate', type: 'materialised_reuse',
    label: 'Pseudogout is calcium-pyrophosphate crystal arthritis and differs from monosodium-urate gout',
    aliases: 'Pseudogout\nCalcium pyrophosphate deposition disease\nPyrophosphate arthropathy',
    definition: 'Pseudogout is inflammatory joint disease caused by calcium pyrophosphate deposition. The Family-143 source keys pseudogout for a 70-year-old with calcium pyrophosphate crystals and keys calcium pyrophosphate deposition as the feature favouring pseudogout over gout.',
    objective: 'Distinguish pseudogout from gout using the exact deposited-crystal cue.',
    pitfalls: 'Do not use monosodium urate, hyperuricaemia, tophi or great-toe involvement as the defining response when the source gives calcium pyrophosphate.',
    micro: 'Pseudogout and calcium pyrophosphate', articles: articleIds.crystal, relatedArticles: 'ART-HU-LCS103-PAT-ARTHRITIS-PATTERNS',
    resources: `${source.assessment}\n${source.teaching}`, claims: claimId('PSEUDOGOUT'),
    signal: 'Family-143 Q17–Q18 printed keys D/D; this first row materialises the previously reconciled accepted pseudogout handle without a rival ID.',
    original: '[Family-143 Q17] inflammatory arthritis caused by calcium pyrophosphate crystals; printed key D, Pseudogout.\n[Q18] feature favouring pseudogout; printed key D, Calcium pyrophosphate deposition.',
  },
  {
    code: 'GANGLION', id: conceptIds.ganglion, key: 'pathology.joint.ganglion-synovial-cyst-benign-lesions', type: 'update',
    label: 'A ganglion is a movable dorsal-wrist cyst containing clear mucinous fluid with a dense connective-tissue wall',
    aliases: 'Ganglion cyst\nDorsal wrist ganglion\nMucinous periarticular cyst',
    definition: 'A ganglion is a small movable periarticular cystic swelling, most often on the dorsum of the wrist. The local sources describe clear mucinous fluid and a wall composed of dense or oedematous connective tissue, with a synovial lining that may be indistinct or absent.',
    objective: 'Recognise the dorsal-wrist mucinous cyst and identify its source-keyed wall composition.',
    pitfalls: 'Do not confuse the clear-fluid cyst with bursitis, tophus or a solid neoplasm. Do not call its wall malignant cartilage, osteoid or skeletal muscle.',
    micro: 'Ganglion clinic, gross appearance and wall',
    articles: `ART-HU-LCS103-PAT-PERIARTICULAR-LESIONS\nART-HU-LCS103-PAT-ARTHRITIS-PATTERNS\n${articleIds.cysts}`,
    relatedArticles: 'ART-HU-LCS103-PAT-ARTHRITIS-PATTERNS\nART-HU-LCS103-PAT-PERIARTICULAR-LESIONS',
    resources: `${source.teaching}\nsrc_d5d701558ddff491b455\n${source.assessment}`,
    claims: `CLM-MSK-HULCS103-F96-GANGLION-01\n${claimId('GANGLION')}`,
    signal: 'Family-143 Q19–Q20 printed keys B/B; prior Family-96 exact-ID assessment occurrences remain preserved.',
    original: '[Family-143 Q19] movable dorsal-wrist cyst with clear mucinous fluid; printed key B, Ganglion cyst.\n[Q20] ganglion wall; printed key B, Dense connective tissue.',
  },
  {
    code: 'BURSITIS', id: conceptIds.bursitis, key: 'pathology.joint.bursitis-causes-gross-histology', type: 'new',
    label: 'Bursitis follows mechanical irritation of a bursa and may show a fibrous wall with chronic inflammatory cells',
    aliases: "Bursitis\nHousemaid's knee\nPrepatellar bursitis",
    definition: 'Bursitis is inflammation of a synovial-lined bursa over a bony prominence. The local lecture links repeated pressure to housemaid’s knee and describes a dense fibrous bursal wall lined by inflammatory granulation tissue with lymphocytes, plasma cells and macrophages.',
    objective: 'Recognise prepatellar bursitis after repeated kneeling and preserve the source-keyed inflammatory-cell pattern.',
    pitfalls: 'Family-143 Q22 says histology “typically” without specifying chronic bursitis. Preserve its printed B answer, but keep the unqualified generalisation Draft pending independent and named faculty review.',
    micro: 'Bursitis cause and histology', articles: articleIds.cysts, relatedArticles: 'ART-HU-LCS103-PAT-PERIARTICULAR-LESIONS',
    resources: `${source.assessment}\n${source.teaching}`, claims: claimId('BURSITIS'),
    signal: 'Family-143 Q21–Q22 printed keys C/B; Q22 is an explicit Draft source-risk occurrence.',
    original: '[Family-143 Q21] housemaid with prepatellar swelling after repeated kneeling; printed key C, Bursitis.\n[Q22] histology of bursitis; printed key B, Plasma cells, lymphocytes, and macrophages.',
  },
  {
    code: 'CHORDOMA', id: conceptIds.chordoma, key: 'pathology.joint.chordoma-notochord-physaliphorous', type: 'materialised_reuse',
    label: 'Chordoma is a slow-growing malignant tumour from notochordal remnants with vacuolated physaliphorous cells',
    aliases: 'Chordoma\nNotochordal tumour\nPhysaliphorous cells',
    definition: 'Chordoma is a slow-growing malignant tumour arising from remnants of the notochord, especially in the sacral and spheno-occipital axial skeleton. The source describes highly vacuolated physaliphorous cells in abundant mucoid material.',
    objective: 'Recognise the sacral notochordal tumour and retain its exact source-printed microscopic term.',
    pitfalls: 'Do not replace the exact printed “Physaliphorous cells” wording. The teaching slide also prints “Physaliferous” in a figure label, so the orthographic variation remains a Draft review note rather than an answer repair.',
    micro: 'Chordoma origin, site and microscopy', articles: articleIds.tumours, relatedArticles: 'ART-HU-LCS103-PAT-PERIARTICULAR-LESIONS',
    resources: `${source.assessment}\n${source.teaching}`, claims: claimId('CHORDOMA'),
    signal: 'Family-143 Q23–Q24 printed keys D/B; this first row materialises the previously reconciled accepted chordoma handle without a rival ID. Q24 is source-risk.',
    original: '[Family-143 Q23] slow-growing malignant sacral tumour from notochord remnants; printed key D, Chordoma.\n[Q24] chordoma microscopy; printed key B, Physaliphorous cells.',
  },
  {
    code: 'CHONDROBLASTOMA', id: conceptIds.chondroblastoma, key: 'bonetumor.chondroblastoma-epiphysis-calcified-giant-cells', type: 'new',
    label: 'Chondroblastoma is an epiphyseal tumour of young patients with a calcified lytic lesion, chondroblasts and osteoclast-like giant cells',
    aliases: 'Chondroblastoma\nEpiphyseal chondroblastoma\nCalcified lytic epiphyseal tumour',
    definition: 'Chondroblastoma is a relatively rare benign tumour arising in the epiphysis of long bones near the growth plate, usually in patients younger than 20 years. The local source describes a calcified lytic lesion containing chondroblasts and osteoclast-like giant cells.',
    objective: 'Recognise the exact age, epiphyseal location, radiologic and histologic pattern keyed as chondroblastoma.',
    pitfalls: 'Do not substitute chondrosarcoma, chordoma, osteosarcoma or enchondroma. Treat the tumour-histology combination as a local Draft source claim pending independent and faculty review.',
    micro: 'Chondroblastoma clinicoradiologic histology', articles: articleIds.tumours, relatedArticles: 'ART-HU-LCS103-PAT-PERIARTICULAR-LESIONS',
    resources: `${source.assessment}\n${source.teaching}`, claims: claimId('CHONDROBLASTOMA'),
    signal: 'Family-143 Q25 printed key B; the local tumour-histology diagnosis remains an explicit Draft review claim.',
    original: '[Family-143 Q25] 17-year-old, calcified lytic proximal-tibial epiphyseal lesion with chondroblasts and osteoclast-like giant cells; printed key B, Chondroblastoma.',
  },
]

const concepts = conceptSpecs.map((spec) => ({
  label: spec.label, id: spec.id, canonical_key: spec.key, aliases: spec.aliases, arabic_label: '', arabic_aliases: '', status: 'under review',
  support_mode: 'direct_statement', subject: 'msk', primary_node_id: 'SYS-MSK', secondary_node_ids: 'DIS-PAT-T03', topic: 'Musculoskeletal system',
  subtopic: 'Joint diseases and tumours', nanotopic: '', modules: 'HU-LCS-103', module_subject: 'HU-LCS-103 > Pathology > Joint Diseases and Tumours',
  universities: 'hu', learner_years: '1', approved_file_resource_ids: '[clear]', approved_video_resource_ids: '[clear]', blueprint_weight: '0.84',
  exam_weight_by_year: 'HU_Y1=0.84', clinical_relevance: '0.76', academic_relevance: '0.98', weight_confidence: '0.58', confidence: spec.code === 'BURSITIS' || spec.code === 'CHORDOMA' || spec.code === 'CHONDROBLASTOMA' ? '0.82' : '0.87',
  resource_occurrence_ids: '[clear]', source_candidate_ids: '[clear]', merge_ids: '[clear]',
  rejected_merge_candidate_ids: spec.type === 'update' ? 'Exact-ID update selected; no rival concept ID is introduced.' : spec.type === 'materialised_reuse' ? 'This is the deterministic first materialisation of a governed accepted handle; no live, pending or HU-LCS-103 rival ID exists.' : 'Governed Family-143 reconciliation found no complete eligible prior handle; the narrower comparators are not rivals.',
  evidence_gaps: 'Independent medical verification and named Helwan Pathology faculty review are required before publication.', owner: 'Helwan Year-1 authoring lane',
  reviewer: 'Medical team, Helwan Pathology faculty', final_publisher: 'Admin team', last_reviewed: '', review_due: '', publication_status: 'needs_evidence',
  editorial_review_status: 'drafted_not_reviewed', exclusion_reason: '', definition: spec.definition, explicit_objective: spec.objective, pitfalls: spec.pitfalls,
  concept_type: 'pathology_pattern', microtopic: spec.micro, article_ids: spec.articles, related_article_ids: spec.relatedArticles, resource_ids: spec.resources,
  exam_signal: spec.signal, atomic_claim_ids: spec.claims, original_wording: spec.original, conflicts: '[clear]',
  uncertainty: ['BURSITIS', 'CHORDOMA', 'CHONDROBLASTOMA'].includes(spec.code) ? 'The exact source wording and printed answer are retained, but this local claim remains Draft pending independent medical and named faculty review.' : '[clear]',
  field_notes: [
    'microtopicId: The reviewed taxonomy stops at SYS-MSK for this local Pathology overlay; the named microtopic is retained as prose.',
    'nanotopicId: No reviewed nanotopic ID exists beneath the assigned canonical node.',
    'approvedFileResourceIds: No source file is rights-cleared for student redistribution.',
    'approvedVideoResourceIds: No video is assigned to this concept.',
    'resourceOccurrenceIds: Hand-authored from governed Family-143 assessment and Family-65 teaching evidence; no extraction-occurrence record exists.',
    `sourceCandidateIds: Governed triage established ${spec.type === 'update' ? 'exact-ID reuse' : spec.type === 'materialised_reuse' ? 'an accepted handle requiring first materialisation' : 'a new non-rival handle'} before authoring.`,
    'mergeIds: No concept was merged in this slice.', 'lastReviewed: Draft record; no named faculty review has occurred.',
    'reviewDue: Set after first named faculty review.', 'exclusionReason: Not excluded; held at needs_evidence.',
    'arabicLabel: Blank pending independently verified Arabic terminology review.', 'arabicAliases: Blank pending independently verified Arabic terminology review.',
  ].join('\n'),
}))

const claimSpecs = [
  { code: 'GOUT', concept: conceptIds.gout, article: articleIds.crystal, text: 'The local joint sources present recurrent severe great-toe attacks, monosodium urate deposition and the term podagra as linked gout cues.', object: 'recurrent severe great-toe attacks with monosodium urate deposition and the term podagra', ap: '4', aq: 'Family-143 Q14–Q16', as: 'Q14 prints Gout as C; Q15 prints Monosodium urate as C; Q16 prints Gout affecting the great toe as B.', tp: '14-15', ts: 'Gout and gouty arthritis', tsp: 'Acute gouty arthritis affects most commonly great toe. This is called “Podagra”. Crystals of monosodium urate monohydrate may be demonstrable in synovial-fluid leucocytes.' },
  { code: 'PSEUDOGOUT', concept: conceptIds.pseudogout, article: articleIds.crystal, text: 'The local joint sources present pseudogout as calcium-pyrophosphate crystal arthritis rather than monosodium-urate gout.', object: 'calcium-pyrophosphate crystal arthritis rather than monosodium-urate gout', ap: '4-5', aq: 'Family-143 Q17–Q18', as: 'Q17 prints Pseudogout as D. Q18 prints Calcium pyrophosphate deposition as D.', tp: '16', ts: 'Pseudogout (pyrophosphate arthropathy)', tsp: 'Pseudogout refers to an inflammatory joint involvement due to deposition of calcium pyrophosphate in the joint space.' },
  { code: 'GANGLION', concept: conceptIds.ganglion, article: articleIds.cysts, text: 'The local joint sources present ganglion as a movable dorsal-wrist cyst with clear mucinous fluid and a dense connective-tissue wall.', object: 'a movable dorsal-wrist cyst with clear mucinous fluid and a dense connective-tissue wall', ap: '5', aq: 'Family-143 Q19–Q20', as: 'Q19 prints Ganglion cyst as B. Q20 prints Dense connective tissue as B.', tp: '17', ts: 'Cyst of ganglion', tsp: 'The most common location is dorsum of wrist. Grossly, a ganglion is a small cyst filled with clear mucinous fluid. The cyst has a wall composed of dense or edematous connective tissue.' },
  { code: 'BURSITIS', concept: conceptIds.bursitis, article: articleIds.cysts, text: 'The local joint sources present repeated kneeling as a setting for prepatellar bursitis and print plasma cells, lymphocytes and macrophages as its histologic infiltrate.', object: 'prepatellar bursitis after repeated kneeling with the printed plasma-cell, lymphocyte and macrophage infiltrate', ap: '5-6', aq: 'Family-143 Q21–Q22', as: 'Q21 prints Bursitis as C. Q22 prints Plasma cells, lymphocytes, and macrophages as B.', tp: '19', ts: 'Bursitis', tsp: 'Bursitis is more often due to repeated injuries from excessive pressure such as in housemaid’s knee. The wall is infiltrated by lymphocytes, plasma cells and macrophages.' },
  { code: 'CHORDOMA', concept: conceptIds.chordoma, article: articleIds.tumours, text: 'The local joint sources present chordoma as a slow-growing malignant sacral tumour from notochordal remnants with physaliphorous cells.', object: 'a slow-growing malignant sacral tumour from notochordal remnants with physaliphorous cells', ap: '6', aq: 'Family-143 Q23–Q24', as: 'Q23 prints Chordoma as D. Q24 prints Physaliphorous cells as B.', tp: '20-21', ts: 'Chordoma', tsp: 'Chordoma is a slow-growing malignant tumour arising from remnants of notochord. Microscopically, chordoma is composed of highly vacuolated physaliphorous cells.' },
  { code: 'CHONDROBLASTOMA', concept: conceptIds.chondroblastoma, article: articleIds.tumours, text: 'The local joint sources present a calcified lytic epiphyseal lesion in a young patient with chondroblasts and osteoclast-like giant cells as chondroblastoma.', object: 'a calcified lytic epiphyseal lesion in a young patient containing chondroblasts and osteoclast-like giant cells', ap: '6', aq: 'Family-143 Q25', as: 'Q25 prints Chondroblastoma as B.', tp: '22', ts: 'Chondroblastoma', tsp: 'Chondroblastoma is a relatively rare benign tumor arising from the epiphysis of long bones. The tumor usually occurs in patients under 20 years. Histologically, the tumor contains cells resembling chondroblasts and osteoclast-like giant cells.' },
]

const articleSpecs = [
  { id: articleIds.crystal, title: 'Gout and pseudogout: crystal and great-toe discriminators', aliases: 'Family-143 crystal arthritis\nGout versus pseudogout', micro: 'Gout and pseudogout', read: '6', concepts: `${conceptIds.gout}\n${conceptIds.pseudogout}`, qs: [14,15,16,17,18], claims: claimSpecs.slice(0,2), summary: 'Family-143 Q14–Q18 distinguish monosodium-urate gout and podagra from calcium-pyrophosphate pseudogout.', sections: '### Definition\nGout is monosodium-urate crystal arthritis, while pseudogout is calcium-pyrophosphate crystal arthritis. Family-143 tests the crystal identity and the great-toe term podagra.\n\n### Mechanism\nGout follows hyperuricaemia with monosodium-urate deposition in and around joints. Pseudogout follows calcium-pyrophosphate deposition in the joint space and is presented in an older-patient inflammatory-arthritis vignette.\n\n### Key determinants\nRecurrent severe great-toe pain, monosodium urate and podagra point to gout. Calcium pyrophosphate points to pseudogout, not tophi, hyperuricaemia, great-toe involvement or monosodium urate.\n\n### Clinical significance\nThese are local first-year pathology distinctions rather than a diagnostic or treatment protocol. All records remain Draft pending independent medical and named faculty review.\n\n### Common misconceptions\nDo not interchange the crystal types. Do not call calcium-pyrophosphate deposition gout or call podagra a wrist, knee, spine or hip disorder.\n\n### Source-bound statements\n' + claimSpecs.slice(0,2).map((x)=>x.text).join('\n'), hold: claimSpecs.slice(0,2).map((x)=>x.text).join('\n'), lose: 'Interchanging monosodium urate and calcium pyrophosphate.\nMissing the source meaning of podagra.', related: 'ART-HU-LCS103-PAT-ARTHRITIS-PATTERNS', conflicts: '[clear]', notes: 'Q17 crosses physical pages 4–5, but its immediate printed D answer remains attached.' },
  { id: articleIds.cysts, title: 'Ganglion and bursitis: clinicopathologic distinctions', aliases: 'Family-143 ganglion and bursitis\nDorsal wrist cyst versus inflamed bursa', micro: 'Ganglion and bursitis', read: '6', concepts: `${conceptIds.ganglion}\n${conceptIds.bursitis}`, qs: [19,20,21,22], claims: claimSpecs.slice(2,4), summary: 'Family-143 Q19–Q22 distinguish a clear-fluid dorsal-wrist ganglion from mechanically provoked prepatellar bursitis and its source-keyed histology.', sections: '### Definition\nA ganglion is a small movable periarticular cyst, commonly on the dorsal wrist, containing clear mucinous fluid. Bursitis is inflammation of a synovial-lined bursa over a bony prominence.\n\n### Mechanism\nGanglion formation may follow synovial herniation, displaced synovial tissue or connective-tissue degeneration; its wall is dense or oedematous connective tissue. Repeated mechanical pressure can inflame the prepatellar bursa in housemaid’s knee, with fibrous wall and inflammatory granulation tissue.\n\n### Key determinants\nA movable dorsal-wrist cyst with clear mucinous fluid and a dense connective-tissue wall points to ganglion. Painful prepatellar swelling after repeated kneeling points to bursitis.\n\n### Clinical significance\nThese are local first-year pathology distinctions and not management guidance. Q22 retains an unqualified source stem and remains Draft pending independent medical and named faculty review.\n\n### Common misconceptions\nDo not call clear mucinous ganglion fluid a solid tumour. Do not generalise the Q22 chronic inflammatory-cell pattern to every acute bursal process.\n\n### Source-bound statements\n' + claimSpecs.slice(2,4).map((x)=>x.text).join('\n'), hold: claimSpecs.slice(2,4).map((x)=>x.text).join('\n'), lose: 'Confusing ganglion with bursitis.\nGeneralising Q22 beyond its exact local source frame.', related: 'ART-HU-LCS103-PAT-PERIARTICULAR-LESIONS', conflicts: 'Q22 says bursitis histology “typically” without specifying chronicity; printed B is retained as an explicit source-risk answer.', notes: 'Q21 crosses physical pages 5–6, but its immediate printed C answer remains attached.' },
  { id: articleIds.tumours, title: 'Chordoma and chondroblastoma: origin, site and microscopy', aliases: 'Family-143 selected joint-area tumours\nChordoma versus chondroblastoma', micro: 'Chordoma and chondroblastoma', read: '7', concepts: `${conceptIds.chordoma}\n${conceptIds.chondroblastoma}`, qs: [23,24,25], claims: claimSpecs.slice(4,6), summary: 'Family-143 Q23–Q25 contrast a sacral notochordal chordoma with a calcified epiphyseal chondroblastoma in a young patient.', sections: '### Definition\nChordoma is a slow-growing malignant tumour arising from notochordal remnants in the axial skeleton. Chondroblastoma is a relatively rare benign epiphyseal tumour of young patients.\n\n### Mechanism\nChordoma contains highly vacuolated cells in abundant mucoid matrix and is especially associated with sacral and spheno-occipital sites. Chondroblastoma arises near the epiphyseal cartilage plate and may show calcification, chondroblast-like cells and osteoclast-like giant cells.\n\n### Key determinants\nA slow-growing malignant sacral tumour from notochordal remnants points to chordoma; Q24 prints Physaliphorous cells. A calcified lytic proximal-tibial epiphyseal lesion in a 17-year-old with chondroblasts and osteoclast-like giant cells points to chondroblastoma.\n\n### Clinical significance\nThese tumour descriptions are local curriculum claims, not diagnostic protocols. Q24 and Q25 remain explicit Draft review items pending independent medical and named faculty review.\n\n### Common misconceptions\nDo not silently respell Q24 or substitute cartilage, plasma or giant-cell distractors. Do not confuse a young epiphyseal chondroblastoma with a sacral notochordal chordoma.\n\n### Source-bound statements\n' + claimSpecs.slice(4,6).map((x)=>x.text).join('\n'), hold: claimSpecs.slice(4,6).map((x)=>x.text).join('\n'), lose: 'Replacing exact Physaliphorous source wording.\nConfusing chordoma with chondroblastoma.', related: 'ART-HU-LCS103-PAT-PERIARTICULAR-LESIONS', conflicts: 'Q24 preserves exact Physaliphorous wording despite the teaching deck’s internal physaliphorous/physaliferous spelling variation. Q25 remains a local tumour-histology review claim.', notes: 'No source image is redistributed, and no practical or media record is inferred from these prose MCQs.' },
]

const articles = articleSpecs.map((spec) => ({
  id: spec.id, title: spec.title, aliases: spec.aliases, arabic_title: '', subject: 'msk', topic: 'Musculoskeletal system', subtopic: 'Joint diseases and tumours',
  primary_node_id: 'SYS-MSK', template_id: 'TPL-CONCEPT', archetype: 'concept', language: 'en', learner_stage: 'Years 1–3 foundation', high_yield: 'High',
  time_sensitive: 'stable', status: 'Draft', owner: 'Helwan Year-1 authoring lane', reviewer: 'Medical team, Helwan Pathology faculty', final_publisher: 'Admin team',
  published_summary: '', published_sections: '', universities: 'hu', years: 'HU_Y1', module: 'HU-LCS-103', media: '', publication_gate: 'needs_evidence',
  conflicts: spec.conflicts, evidence_gaps: 'Independent medical verification and named Helwan Pathology faculty review are required before publication.', last_reviewed: '',
  review_due: '', microtopic: spec.micro, nanotopic: '', secondary_node_ids: 'DIS-PAT-T03', reading_time: spec.read, summary: spec.summary, sections: spec.sections,
  hold_these: spec.hold, lose_the_mark: spec.lose, related_concepts: spec.concepts, related_articles: spec.related,
  question_ids: spec.qs.map((q)=>`Q-HU-LCS103-PAT-F143-${q}`).join('\n'), resource_ids: `${source.assessment}\n${source.teaching}`,
  module_subject: 'HU-LCS-103 > Pathology > Joint Diseases and Tumours', university_notes: 'hu: Restricted to the path-placed Family-143 solved question bank and governed Family-65 teaching lecture.',
  annotations: spec.claims.map((x)=>`### definition_of · ${x.concept}\nQuote: ${x.text}\nBlock: body`).join('\n\n'), article_source_ids: `${source.assessment}\n${source.teaching}`,
  claim_ids: spec.claims.map((x)=>claimId(x.code)).join('\n'), span_ids: spec.claims.map((x)=>`SPN-HULCS103-F143-${x.code}-02`).join('\n'), media_recommendations: '',
  callout_evidence: spec.claims.map((x)=>`### ${x.text}\nClaims: ${claimId(x.code)}\nCitations: CIT-HULCS103-F143-${x.code}-ASSESS-02, CIT-HULCS103-F143-${x.code}-TEACH-02\nSpan: SPN-HULCS103-F143-${x.code}-02`).join('\n\n'),
  evidence_basis: 'Family-143 supplies exact source wording and inline printed answers. Family-65 supplies local teaching support. Neither source counts as independent medical verification.', notes: spec.notes,
  field_notes: 'arabicTitle: Blank pending reviewed terminology.\nnanotopicId: No reviewed nanotopic exists below SYS-MSK.\nmedia: No media is required.\npublishedSummary: Blank because this remains Draft.\npublishedSections: Blank because this remains Draft.\nlastReviewed: No named medical review completed.\nreviewDue: Set after first named review.',
}))

const claims = claimSpecs.map((x) => ({ id: claimId(x.code), concept_id: x.concept, subject: x.code, predicate: 'is presented in the governed local joint sources as', object: x.object, display_text: x.text, risk_class: 'foundational_stable', verification_status: 'needs_evidence', conflict_status: ['BURSITIS','CHORDOMA','CHONDROBLASTOMA'].includes(x.code) ? 'source_claim_requires_review' : 'none', confidence: ['BURSITIS','CHORDOMA','CHONDROBLASTOMA'].includes(x.code) ? '0.8' : '0.86', freshness: 'stable_local_curriculum_fact', time_sensitive: 'no', qualifiers: `polarity: affirmative\nauthority: local Helwan assessment and teaching support, not independent verification\nassessment boundary: Family-143 Q14–Q25${['BURSITIS','CHORDOMA','CHONDROBLASTOMA'].includes(x.code) ? '\nsource risk: exact printed claim retained without repair' : ''}` }))
const citations = claimSpecs.flatMap((x) => [
  { id: `CIT-HULCS103-F143-${x.code}-ASSESS-02`, claim_id: claimId(x.code), resource_id: source.assessment, evidence_role: 'direct_assessment_support', locator_type: 'page', locator_page: x.ap, locator_section: x.aq, locator_detail: `Family-143 physical PDF p${x.ap}, exact occurrence(s) and immediate inline Answer letters.`, support_span: x.as, context_note: 'Direct local assessment support for a Draft record; not independent medical verification.', confidence: '0.82', counts_as_claim_evidence: 'no' },
  { id: `CIT-HULCS103-F143-${x.code}-TEACH-02`, claim_id: claimId(x.code), resource_id: source.teaching, evidence_role: 'local_curriculum', locator_type: 'page', locator_page: x.tp, locator_section: x.ts, locator_detail: `Family-65 Joint Diseases and Tumours lecture physical PDF p${x.tp}.`, support_span: x.tsp, context_note: 'Direct local teaching support for explanation context; not independent medical verification.', confidence: '0.86', counts_as_claim_evidence: 'no' },
])
const spans = claimSpecs.map((x) => ({ id: `SPN-HULCS103-F143-${x.code}-02`, article_id: x.article, section_id: `${x.article.toLowerCase()}-source-bound-statements`, text: x.text, claim_ids: claimId(x.code), citation_ids: `CIT-HULCS103-F143-${x.code}-ASSESS-02\nCIT-HULCS103-F143-${x.code}-TEACH-02` }))

const rows = [
  [14,'C','A 42-year-old man experiences recurrent attacks of severe pain affecting the great toe. What is the most likely diagnosis?',['Rheumatoid arthritis','Osteoarthritis','Gout','Pseudogout','Septic arthritis'],conceptIds.gout,articleIds.crystal,'4'],
  [15,'C','The crystal deposited in gout is:',['Calcium oxalate','Calcium pyrophosphate','Monosodium urate','Cholesterol','Hydroxyapatite'],conceptIds.gout,articleIds.crystal,'4'],
  [16,'B','The term “Podagra” refers to:',['Rheumatoid arthritis of the wrist','Gout affecting the great toe','Septic arthritis of the knee','Tuberculosis of the spine','Osteoarthritis of the hip'],conceptIds.gout,articleIds.crystal,'4'],
  [17,'D','A 70-year-old patient develops inflammatory arthritis caused by deposition of calcium pyrophosphate crystals. The diagnosis is:',['Gout','Rheumatoid arthritis','Osteoarthritis','Pseudogout','Septic arthritis'],conceptIds.pseudogout,articleIds.crystal,'4-5'],
  [18,'D','Which feature favors pseudogout rather than gout?',['Hyperuricemia','Tophi formation','Great toe involvement','Calcium pyrophosphate deposition','Monosodium urate crystals'],conceptIds.pseudogout,articleIds.crystal,'5'],
  [19,'B','A young woman presents with a movable cystic swelling on the dorsum of her wrist. The lesion contains clear mucinous fluid. The diagnosis is:',['Bursitis','Ganglion cyst','Tophus','Chondroma','Lipoma'],conceptIds.ganglion,articleIds.cysts,'5'],
  [20,'B','Microscopically, a ganglion cyst wall is most commonly composed of:',['Malignant cartilage cells','Dense connective tissue','Caseating granulomas','Osteoid tissue','Skeletal muscle'],conceptIds.ganglion,articleIds.cysts,'5'],
  [21,'C','A housemaid develops painful swelling over the patella after repeated kneeling. The diagnosis is:',['Ganglion','Gout','Bursitis','Rheumatoid arthritis','Chondrosarcoma'],conceptIds.bursitis,articleIds.cysts,'5-6'],
  [22,'B','Histology of bursitis typically reveals infiltration by:',['Neutrophils only','Plasma cells, lymphocytes, and macrophages','Eosinophils only','Chondroblasts','Osteoclasts only'],conceptIds.bursitis,articleIds.cysts,'6'],
  [23,'D','A 55-year-old patient develops a slow-growing malignant tumor arising from remnants of the notochord in the sacrum. The diagnosis is:',['Chondroblastoma','Osteochondroma','Chondrosarcoma','Chordoma','Fibrosarcoma'],conceptIds.chordoma,articleIds.tumours,'6'],
  [24,'B','Microscopically, chordoma is characterized by:',['Reed-Sternberg cells','Physaliphorous cells','Osteoclast-like giant cells','Plasma cells','Touton giant cells'],conceptIds.chordoma,articleIds.tumours,'6'],
  [25,'B','A 17-year-old boy presents with a lytic lesion containing calcifications in the epiphysis of the proximal tibia. Histology shows chondroblasts and osteoclast-like giant cells. The diagnosis is:',['Chondrosarcoma','Chondroblastoma','Chordoma','Osteosarcoma','Enchondroma'],conceptIds.chondroblastoma,articleIds.tumours,'6'],
]
const objective = { [conceptIds.gout]:'Recognise gout, monosodium urate and podagra from exact source cues.', [conceptIds.pseudogout]:'Identify calcium-pyrophosphate pseudogout and distinguish it from gout.', [conceptIds.ganglion]:'Recognise the dorsal-wrist mucinous ganglion and its connective-tissue wall.', [conceptIds.bursitis]:'Recognise prepatellar bursitis and preserve its source-keyed histologic wording.', [conceptIds.chordoma]:'Recognise chordoma from its notochordal origin, sacral site and exact microscopic term.', [conceptIds.chondroblastoma]:'Recognise the source-keyed young epiphyseal chondroblastoma pattern.' }
const common = { subject:'msk',status:'Draft',owner:'Helwan Year-1 authoring lane',vignette:'',format:'single best answer',written_parts:'',matching_options:'',matching_prompts:'',correct_answers:'',labeling_image:'',labeling_alt:'',labeling_points:'',completion_text:'',derived_from:'',topic:'Musculoskeletal system',subtopic:'Joint diseases and tumours',difficulty:'Easy',question_type:'Pathology',module:'HU-LCS-103',module_subject:'HU-LCS-103 > Pathology > Joint Diseases and Tumours',clinical_relevance:'0.76',academic_relevance:'0.98',cognitive_effort_score:'0.36',exam_weight_by_year:'HU_Y1=0.84',question_only_for:'HU_Y1',concept_ids:'',years:'HU_Y1',universities:'hu',cognitive_effort:'Low',setting:'Academic',reasoning_level:'1',inferred_difficulty:'70',exam_relevance:'9',contextual_concept_ids:'',media_recommendations:'',attachments:'',attached_image:'',estimated_seconds:'60',randomise_answers:'yes' }
const questions = rows.map(([number,key,stem,options,concept,article,page]) => {
  const fields = { id:`Q-HU-LCS103-PAT-F143-${number}`,title:stem,...common,question:stem,correct_answer:key }
  for(let i=0;i<options.length;i+=1){ const letter=String.fromCharCode(65+i), option=options[i]; const risk=number===22?' Q22’s unqualified “typically” wording and chronic inflammatory-cell answer remain an explicit Draft source risk.':number===24?' The exact Physaliphorous spelling is preserved despite the teaching deck’s internal spelling variation.':number===25?' The tumour-histology diagnosis remains an explicit local-source review claim.':''; fields[`answer_${letter.toLowerCase()}`]=option; fields[`explanation_${letter.toLowerCase()}`]=letter===key?`Family-143 prints ${key} as the immediate Answer for this exact occurrence, so “${option}” is retained as the source-keyed response. The linked Draft article explains the local distinction without converting it into an independently verified diagnostic rule.${risk} This item remains Draft pending independent medical verification and named Helwan Pathology faculty review.`:`The option “${option}” is preserved exactly from Family-143, but the immediate printed Answer selects ${key} instead. The linked Draft article explains the local source distinction without rewriting this distractor or inferring another answer.${risk} This item remains Draft pending independent medical verification and named Helwan Pathology faculty review.` }
  fields.answer_f=''; fields.explanation_f=''
  const boundary=[17,21].includes(number)?' The item crosses a physical page boundary, but its immediate printed answer remains attached to this occurrence.':''
  const risk=number===22?' Q22’s unqualified histology wording and printed B answer are preserved as an explicit source-risk occurrence.':number===24?' Q24 preserves exact Physaliphorous spelling and printed B despite the lecture’s internal spelling variation.':number===25?' Q25 remains an explicit local tumour-histology review claim with printed B preserved.':''
  return { ...fields,main_concept:concept,library_ids:article,resource_ids:`${source.assessment}\n${source.teaching}`,learning_objective:objective[concept],source_citation:`${source.assessment}, physical PDF p${page}, printed Q${number}: exact stem/options with immediate printed Answer ${key}. Teaching support: ${source.teaching}.`,author_notes:`Transcribed from governed Family-143 physical p${page}; wording, option order, spelling and printed answer are preserved without repair.${boundary}${risk} The source contains no practical, written or media task. Earlier holds remain untouched.` }
})

if(questions.length!==12||questions.map((q)=>q.correct_answer).join('')!=='CCBDDBBCBDBB') throw new Error('Family143 Q14-Q25 key mismatch')
if(concepts.length!==6||articles.length!==3||claims.length!==6||citations.length!==12||spans.length!==6) throw new Error('Family143 closure dependency mismatch')
await Promise.all(Object.values(paths).map((path)=>mkdir(dirname(path),{recursive:true})))
await Promise.all([writeFile(paths.concepts,concepts.map(item).join(divider),'utf8'),writeFile(paths.articles,articles.map(item).join(divider),'utf8'),writeFile(paths.claims,claims.map(item).join(divider),'utf8'),writeFile(paths.citations,citations.map(item).join(divider),'utf8'),writeFile(paths.spans,spans.map(item).join(divider),'utf8'),writeFile(paths.questions,questions.map(item).join(divider),'utf8')])
console.log(JSON.stringify({files:paths,counts:{concepts:6,conceptUpdates:2,materialisedReuses:2,newConcepts:2,articles:3,questions:12,claims:6,citations:12,spans:6},keys:'CCBDDBBCBDBB',optionCounts:questions.map(()=>5),sourceRisks:['Q22 chronicity','Q24 spelling','Q25 tumour histology'],newHolds:[],practical:0,written:0,media:0},null,2))
