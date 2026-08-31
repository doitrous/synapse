import { createHash } from 'node:crypto'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const root = join(repo, 'docs', 'Helwan-Source-Imports')

const source = {
  assessment: 'src_a2b7d25d987469febab8',
  circulation1: 'src_50d9ef5f2db5dc46e3e3',
  circulation2: 'src_11e4f2b9f8bdbdb51806',
  cellInjury1: 'src_7c79d90e00f17c534be6',
  cellInjury2: 'src_f777eedff88b6dca2166',
  inflammation2: 'src_949c1820aea58bded856',
  infection: 'src_618d482aa23f51f29cf0',
}

const article = {
  vascular: 'ART-HU-BMS102-PAT-F10TF2-HAEMORRHAGE-THROMBOSIS-OEDEMA',
  deposits: 'ART-HU-BMS102-PAT-F10TF2-STEATOSIS-CALCIFICATION-AMYLOID',
  tuberculosis: 'ART-HU-BMS102-PAT-F10TF2-TUBERCULOSIS-SPREAD-RISK',
  chronic: 'ART-HU-BMS102-PAT-F10TF2-CHRONIC-INFLAMMATION-MORPHOLOGY',
}

const idFor = (key) => `CON-FND-${createHash('sha256').update(key).digest('hex').slice(0, 14).toUpperCase()}`

const concepts = [
  {
    ref: 'T17', key: 'pathology.hemorrhage.petechiae-size-classification', expectedId: 'CON-FND-171FEB336CE9D3',
    label: 'Petechiae are minute haemorrhages rather than haematomas larger than 3 ml', aliases: ['Petechiae size classification', 'Petechiae versus haematoma'],
    definition: 'Petechiae are minute haemorrhages, classically about 1–2 mm in the governed Helwan circulation lecture. A lesion described as a larger haematoma is not a petechia; the source stem’s literal unit “ml” is preserved only in the assessment occurrence.',
    objective: 'Distinguish petechiae from larger haemorrhagic collections by size and terminology.', pitfalls: 'Calling a large haematoma a petechia, or silently changing the assessment stem unit from ml to mm.',
    type: 'classification', micro: 'Haemorrhage', nano: 'Petechiae size', article: article.vascular,
    primary: 'DIS-PAT-T03', secondary: 'SYS-CVS', subjectText: 'Petechiae', predicate: 'are', object: 'minute 1–2 mm haemorrhages rather than larger haematomas',
    teaching: { source: source.circulation1, pages: '32', text: 'The Helwan circulation lecture classifies petechiae as minute haemorrhages of about 1–2 mm and distinguishes larger purpura.' },
  },
  {
    ref: 'T21', key: 'pathology.thrombosis.definition-risk', expectedId: 'CON-FND-477CA701E8BAE9', gap: true,
    label: 'Pregnancy and oral-contraceptive use are thrombosis risk contexts in the governed lecture', aliases: ['Pregnancy and thrombosis risk', 'Oral contraceptives and thrombosis'],
    definition: 'The Family-10 bank visibly marks True for a combined statement linking pregnancy, obstetric conditions, prolonged oral-contraceptive use and steroid therapy to thrombosis risk. The governed lecture explicitly lists pregnancy and oral contraceptives; it does not independently establish every component of the combined proposition.',
    objective: 'Preserve the printed True occurrence while distinguishing directly taught thrombosis risks from the unsupported steroid component.', pitfalls: 'Claiming that the local lecture explicitly supports the whole compound statement, or promoting the study-bank answer to an official key.',
    type: 'source_assertion', micro: 'Thrombosis', nano: 'Risk contexts', article: article.vascular,
    primary: 'DIS-PAT-T03', secondary: 'SYS-CVS', subjectText: 'The Family-10 thrombosis-risk statement', predicate: 'is visibly answered', object: 'True, with only partial local teaching support',
    teaching: { source: source.circulation2, pages: '14', text: 'The Helwan thrombosis-risk slide lists pregnancy and oral contraceptives; it does not explicitly support every component of the combined bank statement.' },
  },
  {
    ref: 'T22', key: 'pathology.steatosis.fatty-liver-predisposition', expectedId: 'CON-FND-4CAD16D517ABF4', gap: true,
    label: 'The Family-10 bank links obesity, starvation and cortisone therapy to fatty liver', aliases: ['Fatty liver predisposition statement', 'Obesity starvation cortisone and steatosis'],
    definition: 'The Family-10 bank visibly marks True for the combined obesity, starvation and cortisone-therapy statement. Local cell-injury teaching identifies obesity and starvation as nutritional causes of injury and fatty change in liver as reversible injury, but it does not directly state the entire three-factor proposition.',
    objective: 'Preserve the printed True occurrence while recognizing the limited local support for the full fatty-liver risk set.', pitfalls: 'Presenting the full compound claim as directly stated by the lecture, especially the cortisone component.',
    type: 'source_assertion', micro: 'Cellular accumulations', nano: 'Fatty liver predisposition', article: article.deposits,
    primary: 'SYS-FND-T03-S01', secondary: 'DIS-PAT-T01', subjectText: 'The Family-10 fatty-liver statement', predicate: 'is visibly answered', object: 'True, with partial local teaching support',
    teaching: { source: source.cellInjury1, pages: '5', text: 'The Helwan cell-injury lecture lists starvation and obesity among nutritional causes of cell injury but does not explicitly state the complete obesity-starvation-cortisone fatty-liver proposition.' },
  },
  {
    ref: 'T23', key: 'pathology.tuberculosis.secondary-bronchial-spread', idPrefix: 'CON-INF', expectedId: 'CON-INF-A3D742DA9F7121', gap: true,
    label: 'The Family-10 bank prints bronchial spread as the most important secondary-tuberculosis complication', aliases: ['Secondary tuberculosis bronchial spread', 'Secondary TB complication statement'],
    definition: 'The Family-10 bank visibly marks True for the statement that bronchial spread is the most important complication of secondary tuberculosis. The governed infection lecture supports bronchogenic spread in secondary disease context but does not state the superlative “most important.”',
    objective: 'Preserve the printed True occurrence and its exact superlative while marking the narrower local teaching support.', pitfalls: 'Inventing faculty adjudication of the superlative or describing the auxiliary bank as an official key.',
    type: 'source_assertion', micro: 'Tuberculosis', nano: 'Secondary spread', article: article.tuberculosis,
    primary: 'SYS-INF', secondary: 'DIS-PAT-T03', subjectText: 'The Family-10 secondary-tuberculosis statement', predicate: 'is visibly answered', object: 'True for bronchial spread as the most important complication',
    teaching: { source: source.infection, pages: '39, 43', text: 'The Helwan infection lecture distinguishes primary from secondary tuberculosis and provides spread context, but it does not explicitly state the bank’s “most important complication” superlative.' },
  },
  {
    ref: 'T26', key: 'pathology.edema.pitting-patterns-inflammatory-lymphatic-obstruction', expectedId: 'CON-FND-8F319543574AE8',
    label: 'Inflammatory and lymphatic-obstruction oedema are non-pitting', aliases: ['Non-pitting inflammatory edema', 'Lymphatic obstruction edema pattern'],
    definition: 'In the governed Helwan circulation teaching, inflammatory oedema and oedema caused by lymphatic obstruction are non-pitting. Pitting requires freely mobile interstitial fluid and therefore does not describe these two tested patterns.',
    objective: 'Classify inflammatory and lymphatic-obstruction oedema as non-pitting.', pitfalls: 'Calling every oedema pitting, or overlooking the protein-rich and structurally constrained nature of these patterns.',
    type: 'classification', micro: 'Oedema', nano: 'Pitting patterns', article: article.vascular,
    primary: 'DIS-PAT-T03', secondary: 'SYS-CVS', subjectText: 'Inflammatory and lymphatic-obstruction oedema', predicate: 'are', object: 'non-pitting patterns',
    teaching: { source: source.circulation1, pages: '15', text: 'The Helwan circulation lecture classifies inflammatory oedema and oedema due to lymphatic obstruction as non-pitting.' },
  },
  {
    ref: 'T28', reuseId: 'CON-FND-718662116D90C4', reuseKey: 'calcification.dystrophic-versus-metastatic.serum-calcium',
    label: 'Metastatic calcification occurs in viable tissue with hypercalcaemia', aliases: ['Metastatic versus dystrophic calcification', 'Calcification and serum calcium'],
    definition: 'Metastatic calcification deposits calcium in otherwise viable tissues in the setting of raised serum calcium. Calcification in nonviable tissue with normal serum calcium instead describes dystrophic calcification.',
    objective: 'Differentiate metastatic from dystrophic calcification by tissue viability and serum calcium.', pitfalls: 'Reversing the two patterns or assuming that every calcification occurs in necrotic tissue.',
    type: 'comparison', micro: 'Pathologic calcification', nano: 'Metastatic versus dystrophic', article: article.deposits,
    primary: 'SYS-FND-T03-S01', secondary: 'DIS-PAT-T01', subjectText: 'Metastatic calcification', predicate: 'occurs in', object: 'viable tissue with raised serum calcium rather than nonviable tissue with normal calcium',
    teaching: { source: source.cellInjury2, pages: '31', text: 'The Helwan cell-injury lecture contrasts metastatic calcification in viable tissue with hypercalcaemia against dystrophic calcification in dead tissue with normal calcium.' },
  },
  {
    ref: 'T29', key: 'pathology.tuberculosis.risk-context-poverty-crowding-age-debilitation', idPrefix: 'CON-INF', expectedId: 'CON-INF-F190C52EA1E764', gap: true,
    label: 'The Family-10 bank links tuberculosis with poverty, crowding, old age and debilitating disease', aliases: ['Tuberculosis risk-context statement', 'Poverty crowding age and TB'],
    definition: 'The Family-10 bank visibly marks True for the complete risk-context statement. The local infection lecture directly supports poor nutrition or housing, low socioeconomic standard, overcrowding and debilitating disease, while the exact old-age component is not explicitly stated in the same teaching.',
    objective: 'Preserve the printed True occurrence while distinguishing directly taught tuberculosis risk contexts from the unsupported age component.', pitfalls: 'Claiming that every element is explicitly taught locally or treating the bank answer as an authenticated official key.',
    type: 'source_assertion', micro: 'Tuberculosis', nano: 'Risk contexts', article: article.tuberculosis,
    primary: 'SYS-INF', secondary: 'DIS-PAT-T03', subjectText: 'The Family-10 tuberculosis risk-context statement', predicate: 'is visibly answered', object: 'True, with partial local teaching support',
    teaching: { source: source.infection, pages: '17', text: 'The Helwan infection lecture lists low socioeconomic status, poor nutrition or housing, overcrowding and debilitating disease, but does not explicitly state every word of the bank proposition, including old age.' },
  },
  {
    ref: 'T30', reuseId: 'CON-INF-DA87C1C8215CB6', reuseKey: 'pathology.inflammation.chronic-features-mild-congestion-fibrosis',
    label: 'Chronic inflammation combines mononuclear infiltration with fibrosis', aliases: ['Chronic inflammation morphology', 'Mononuclear cells and fibrosis'],
    definition: 'Chronic inflammation is characterized by infiltration with mononuclear inflammatory cells together with tissue destruction and repair. Angiogenesis and fibroblast activity lead to fibrous-tissue proliferation.',
    objective: 'Recognize mononuclear-cell infiltration and fibrosis as defining morphologic features of chronic inflammation.', pitfalls: 'Reducing chronic inflammation to neutrophils alone or omitting the simultaneous reparative fibrotic response.',
    type: 'morphology', micro: 'Chronic inflammation', nano: 'Mononuclear cells and fibrosis', article: article.chronic,
    primary: 'SYS-INF', secondary: 'DIS-PAT-T02', subjectText: 'Chronic inflammation', predicate: 'is characterized by', object: 'mononuclear-cell infiltration with fibrous-tissue proliferation',
    teaching: { source: source.inflammation2, pages: '34', text: 'The Helwan inflammation lecture characterizes chronic inflammation by mononuclear-cell infiltration together with angiogenesis and fibrosis.' },
  },
  {
    ref: 'T31', reuseId: 'CON-FND-4867DD3814D088', reuseKey: 'amyloid.staining.congo-red-apple-green-birefringence',
    label: 'Amyloid is identified with Congo red rather than Oil Red staining', aliases: ['Amyloid Congo red stain', 'Amyloid versus Oil Red'],
    definition: 'Amyloid is stained by Congo red and shows apple-green birefringence under polarized light. Oil Red is a lipid stain and is not the defining stain for amyloid.',
    objective: 'Identify Congo red as the defining amyloid stain and reject Oil Red.', pitfalls: 'Confusing amyloid with intracellular lipid accumulation or omitting the apple-green birefringence confirmation.',
    type: 'diagnostic_feature', micro: 'Amyloidosis', nano: 'Staining', article: article.deposits,
    primary: 'SYS-FND-T03-S01', secondary: 'DIS-PAT-T01', subjectText: 'Amyloid', predicate: 'is identified by', object: 'Congo red staining with apple-green birefringence rather than Oil Red',
    teaching: { source: source.cellInjury2, pages: '22', text: 'The Helwan cell-injury lecture identifies Congo red staining and apple-green birefringence as the characteristic amyloid reaction.' },
  },
  {
    ref: 'T32', reuseId: 'CON-INF-B099D9DC13E9C4', reuseKey: 'pathology.tuberculosis.primary-blood-lymphatic-dissemination', gap: true,
    label: 'The Family-10 bank prints blood spread as the most important primary-tuberculosis complication', aliases: ['Primary tuberculosis blood spread', 'Primary TB complication statement'],
    definition: 'The Family-10 bank visibly marks True for the statement that blood spread is the most important complication of primary tuberculosis. The governed infection lecture supports bacteraemic dissemination and notes that spread is more common in primary disease, but it does not state the exact “most important” superlative.',
    objective: 'Preserve the printed True occurrence while making the missing superlative support explicit.', pitfalls: 'Turning the source assertion into an official-key claim or asserting that the local lecture independently ranks complications.',
    type: 'source_assertion', micro: 'Tuberculosis', nano: 'Primary dissemination', article: article.tuberculosis,
    primary: 'SYS-INF', secondary: 'DIS-PAT-T03', subjectText: 'The Family-10 primary-tuberculosis statement', predicate: 'is visibly answered', object: 'True for blood spread as the most important complication',
    teaching: { source: source.infection, pages: '23, 39', text: 'The Helwan infection lecture supports bacteraemic seeding and indicates spread is more common in primary tuberculosis, but it does not explicitly rank blood spread as the most important complication.' },
  },
]

for (const concept of concepts) {
  concept.id = concept.reuseId ?? idFor(concept.key).replace('CON-FND', concept.idPrefix ?? 'CON-FND')
  concept.key = concept.reuseKey ?? concept.key
  if (concept.expectedId && concept.id !== concept.expectedId) throw new Error(`${concept.ref}: deterministic ID mismatch ${concept.id}`)
  concept.claim = `CLM-HU102-F10TF2-${concept.ref}-01`
  concept.currCit = `CIT-HU102-F10TF2-${concept.ref}-CURR`
  concept.asmCit = `CIT-HU102-F10TF2-${concept.ref}-ASM`
  concept.span = `SPN-HU102-F10TF2-${concept.ref}-01`
  concept.display = `${concept.subjectText} ${concept.predicate} ${concept.object}.`
}
const byRef = Object.fromEntries(concepts.map((concept) => [concept.ref, concept]))

const questions = [
  { ref: 'T17', stem: 'Petechiae are larger hematoma more than 3 ml', printed: 'False', falseReason: 'petechiae are minute haemorrhages, approximately 1–2 mm, rather than larger haematomas; the literal ml unit remains unchanged in the source stem' },
  { ref: 'T21', stem: 'Pregnancy & obstetric conditions, prolonged use of oral contraceptives & steroid therapy are associated with increased risk of thrombosis', printed: 'True', gap: true },
  { ref: 'T22', stem: 'Obesity, starvation and cortisone therapy predispose to fatty liver', printed: 'True', gap: true },
  { ref: 'T23', stem: 'Most important complication of 2ry TB is bronchial spread.', printed: 'True', gap: true },
  { ref: 'T26', stem: 'Inflammatory edema and edema due to lymphatic obstruction are pitting', printed: 'False', falseReason: 'the governed circulation lecture classifies both inflammatory oedema and oedema due to lymphatic obstruction as non-pitting' },
  { ref: 'T28', stem: 'Metastatic calcification occurs in nonviable tissue with normal blood calcium', printed: 'False', falseReason: 'metastatic calcification occurs in viable tissue with raised serum calcium; nonviable tissue with normal serum calcium describes dystrophic calcification' },
  { ref: 'T29', stem: 'TB is the disease of poverty, crowding, old age, and debilitating diseases', printed: 'True', gap: true },
  { ref: 'T30', stem: 'Chronic inflammation characterized by diffuse infiltration of mononuclear cells with proliferation of fibrous tissue', printed: 'True', trueReason: 'mononuclear-cell infiltration together with repair and fibrosis is characteristic chronic-inflammatory morphology' },
  { ref: 'T31', stem: 'Amyloid is stained red by oil red stain.', printed: 'False', falseReason: 'amyloid is identified by Congo red staining with apple-green birefringence, whereas Oil Red is a lipid stain' },
  { ref: 'T32', stem: 'Most important complication of 1ry TB is blood spread.', printed: 'True', gap: true },
]
for (const question of questions) {
  question.id = `Q-HU102-PAT-F10-${question.ref}`
  question.key = question.printed === 'True' ? 'A' : 'B'
}
const questionFor = (concept) => questions.find((question) => question.ref === concept.ref)

const sourceRow = ({ id, title, path, pages, sha, qualification, assessment }) => `# Item
## id
${id}
## title
${title}
## institution
Faculty of Medicine, Helwan University
## collection_id
hu-y1
## source_relative_path
${path}
## media_type
application/pdf
## languages
en
## page_count
${pages}
## sha256
${sha}
## processing_status
pending
## rights
Local university material held for internal authoring only; no page image is redistributed.
## qualification
${qualification}
## is_assessment
${assessment ? 'yes' : 'no'}`

const sources = [
  sourceRow({ id: source.assessment, title: 'General pathology MCQ and true/false bank with printed answers', path: 'Year 1/BMS 102/Pathology/Questions/MCQs/MCQs - MCQ Pathology.pdf', pages: 6, sha: 'a2b7d25d987469febab87a5a80fd52db5c8d74a1ade0dfabd6482fec9da63475', qualification: 'Tier-3 local pathology study bank visibly attributed to Dr Ahmed Hassan. Pages 5–6 contain Family-10 true/false statements with visibly printed answers. This slice preserves only T17, T21–T23, T26 and T28–T32; it is not an authenticated sitting, official departmental key or mark scheme.', assessment: true }),
  sourceRow({ id: source.circulation1, title: 'Circulation 1 — Helwan BMS-102 pathology lecture', path: 'Year 1/BMS 102/Pathology/Theoretical/Lec 4 - Circulation 1/Main-stream-circulatory-1-new.pdf', pages: 50, sha: '50d9ef5f2db5dc46e3e3b10da4844e90c8c4cee5d94b7a0fc800960d83e939da', qualification: 'Tier-4 Helwan theoretical lecture supplying local haemorrhage and oedema teaching; it is not an assessment instrument.', assessment: false }),
  sourceRow({ id: source.circulation2, title: 'Circulation 2 — Helwan BMS-102 pathology lecture', path: 'Year 1/BMS 102/Pathology/Theoretical/Lec 6 - Circulation 2/main-stream-circulatory-2-2026.pdf', pages: 82, sha: '11e4f2b9f8bdbdb518061fd414e2d0fd6f3be1166694721c57daa4802bcb100f', qualification: 'Tier-4 Helwan theoretical lecture supplying local thrombosis-risk teaching; it is not an assessment instrument.', assessment: false }),
  sourceRow({ id: source.cellInjury1, title: 'Cell injury 1 — Helwan BMS-102 pathology lecture', path: 'Year 1/BMS 102/Pathology/Theoretical/Lec 2 - Cell Injury 1/Cell injury lecture 1.pdf', pages: 51, sha: '7c79d90e00f17c534be66ba3cfa964bf2972c7a4767985e9c1a20d05469350f0', qualification: 'Tier-4 Helwan theoretical lecture supplying local nutritional cell-injury context; it is not an assessment instrument.', assessment: false }),
  sourceRow({ id: source.cellInjury2, title: 'Cell injury 2 — Helwan BMS-102 pathology lecture', path: 'Year 1/BMS 102/Pathology/Theoretical/Lec 3 - Cell Injury 2/Cell-injury-lecture-2.pdf', pages: 34, sha: 'f777eedff88b6dca216656eb373fb0612128fff63276683e7299bd8c97ae77a4', qualification: 'Tier-4 Helwan theoretical lecture supplying local calcification and amyloid teaching; it is not an assessment instrument.', assessment: false }),
  sourceRow({ id: source.inflammation2, title: 'Inflammation 2 — Helwan BMS-102 pathology lecture', path: 'Year 1/BMS 102/Pathology/Theoretical/Lec 7 - Inflammation 2/Inflammation lecture 2.pdf', pages: 53, sha: '949c1820aea58bded856011cc31bd8ce958941ce7f17e4c390cb1343b8d1677d', qualification: 'Tier-4 Helwan theoretical lecture supplying local chronic-inflammation morphology; it is not an assessment instrument.', assessment: false }),
  sourceRow({ id: source.infection, title: 'Infection — Helwan BMS-102 pathology lecture', path: 'Year 1/BMS 102/Pathology/Theoretical/Lec 9 - Infection/Infection-Lecture.pdf', pages: 48, sha: '618d482aa23f51f29cf0990e8c2882785354c662167ee12f793d05191b3f1e90', qualification: 'Tier-4 Helwan theoretical lecture supplying local tuberculosis risk and spread context; it is not an assessment instrument.', assessment: false }),
].join('\n---\n\n')

const articleConfig = [
  { id: article.vascular, refs: ['T17', 'T21', 'T26'], title: 'Haemorrhage size, thrombosis risks and oedema patterns', aliases: ['Circulatory pathology distinctions', 'Petechiae thrombosis and oedema'], topic: 'Circulatory pathology', summary: 'Petechiae are minute haemorrhages, thrombosis has defined clinical risk contexts, and inflammatory or lymphatic-obstruction oedema is non-pitting.', mechanism: 'Haemorrhage terminology follows the size and form of extravasated blood. Thrombosis risk reflects hypercoagulability, stasis and endothelial injury. Oedema pits only when interstitial fluid is freely displaced; protein-rich inflammatory fluid and lymphatic obstruction produce non-pitting patterns.', determinants: 'Keep lesion size, thrombosis risk and pitting behaviour separate. Preserve the compound T21 bank statement while flagging that the local lecture explicitly supports only part of it.', loses: ['Calling a large haematoma a petechia.', 'Silently changing ml to mm in the exact source stem.', 'Calling inflammatory or lymphatic-obstruction oedema pitting.', 'Claiming local teaching directly proves every component of T21.'], gaps: 'T21 has partial local teaching: pregnancy and oral contraceptives are explicit, but the complete obstetric-and-steroid proposition is not. Independent medical verification and Helwan faculty review remain required.' },
  { id: article.deposits, refs: ['T22', 'T28', 'T31'], title: 'Steatosis, pathologic calcification and amyloid staining', aliases: ['Cellular deposits and staining', 'Fatty liver calcification amyloid'], topic: 'Cell injury', summary: 'Fatty-liver predisposition, metastatic-versus-dystrophic calcification and amyloid staining require distinct mechanisms and evidence. Congo red, not Oil Red, identifies amyloid.', mechanism: 'Steatosis reflects disturbed lipid handling in hepatocytes. Metastatic calcification occurs in viable tissue during hypercalcaemia, whereas dystrophic calcification occurs in damaged or dead tissue with normal serum calcium. Amyloid is confirmed with Congo red and apple-green birefringence.', determinants: 'Do not reverse metastatic and dystrophic calcification or confuse amyloid with lipid. The complete obesity-starvation-cortisone statement remains a source assertion because the local lecture support is partial.', loses: ['Treating nonviable tissue with normal calcium as metastatic calcification.', 'Selecting Oil Red as the defining amyloid stain.', 'Claiming all three T22 risk factors are explicitly joined by the local lecture.'], gaps: 'T22 remains a partial-teaching occurrence: local material supports nutritional injury context but not the complete three-factor fatty-liver proposition. Independent medical verification and faculty review remain required.' },
  { id: article.tuberculosis, refs: ['T23', 'T29', 'T32'], title: 'Tuberculosis spread patterns and risk context', aliases: ['Primary and secondary tuberculosis spread', 'Tuberculosis risk and dissemination'], topic: 'Infection', summary: 'The Family-10 bank tests bronchial spread in secondary tuberculosis, blood spread in primary tuberculosis and a compound risk-context statement. Local teaching supports the broad contexts but not every superlative or component.', mechanism: 'Primary tuberculosis may disseminate through blood and lymph, whereas secondary pulmonary disease commonly spreads through bronchi. Poverty, crowding, poor nutrition and debilitating disease increase susceptibility and transmission risk.', determinants: 'Separate primary dissemination from secondary bronchogenic spread. Preserve “most important” exactly as printed but do not claim the local lecture independently establishes those rankings.', loses: ['Swapping primary blood spread and secondary bronchial spread.', 'Removing the printed superlative from the exact occurrence.', 'Claiming explicit support for old age when the governed page does not state it.', 'Promoting the study-bank answers to official keys.'], gaps: 'T23, T29 and T32 all have explicit partial-teaching warnings: local material supplies context but not both superlatives or every risk-list component. Faculty review is required.' },
  { id: article.chronic, refs: ['T30'], title: 'Chronic inflammation: mononuclear cells and fibrosis', aliases: ['Chronic inflammatory morphology', 'Mononuclear inflammation and fibrous repair'], topic: 'Inflammation', summary: 'Chronic inflammation combines diffuse mononuclear-cell infiltration with ongoing tissue injury and repair, including fibrous-tissue proliferation.', mechanism: 'Persistent injury recruits macrophages, lymphocytes and plasma cells. Their mediators sustain tissue destruction while angiogenesis and fibroblast activation produce fibrosis.', determinants: 'Recognize that chronic inflammation simultaneously contains inflammatory-cell infiltration and a reparative fibrotic response.', loses: ['Reducing chronic inflammation to neutrophilic exudation.', 'Ignoring fibrosis and repair.', 'Treating chronicity as duration alone without morphology.'], gaps: 'Independent medical verification and Helwan faculty review remain required before publication.' },
]

const otherArticles = (id) => Object.values(article).filter((candidate) => candidate !== id)
const articleSources = (id) => [...new Set([source.assessment, ...concepts.filter((concept) => concept.article === id).map((concept) => concept.teaching.source)])]

const conceptRow = (concept) => {
  const question = questionFor(concept)
  const warning = concept.gap ? `Partial-teaching warning: the auxiliary bank visibly prints ${question.printed}, while the governed local lecture provides narrower teaching and does not explicitly state the complete proposition. No official-key or faculty-adjudication claim is inferred.` : '[clear]'
  return `# Item
## label
${concept.label}
## id
${concept.id}
## canonical_key
${concept.key}
## aliases
${concept.aliases.join('\n')}
## arabic_label

## arabic_aliases
[clear]
## definition
${concept.definition}
## explicit_objective
${concept.objective}
## pitfalls
${concept.pitfalls}
## concept_type
${concept.type}
## status
Draft
## subject
fnd
## primary_node_id
${concept.primary}
## secondary_node_ids
${concept.secondary}
## learner_years
1
## universities
hu
## modules
HU-BMS-102
## module_subject
HU-BMS-102 > Pathology > ${concept.micro} > ${concept.nano}
## article_ids
${concept.article}
## related_article_ids
${otherArticles(concept.article).join('\n')}
## related_concept_ids
${concepts.filter((other) => other.article === concept.article && other.id !== concept.id).map((other) => other.id).join('\n')}
## resource_ids
${source.assessment}
${concept.teaching.source}
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.84
## exam_weight_by_year
HU_Y1=0.84
## clinical_relevance
0.8
## academic_relevance
0.98
## weight_confidence
0.64
## support_mode
direct_statement
## confidence
${concept.gap ? '0.78' : '0.92'}
## exam_signal
${source.assessment} | tier-3 local keyed study bank | undated | PDF p${Number(concept.ref.slice(1)) <= 23 ? '5' : '6'} | Family-10 ${concept.ref} | visibly printed ${question.printed}
## atomic_claim_ids
${concept.claim}
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
[Teaching p${concept.teaching.pages}] ${concept.teaching.text}
[Assessment p${Number(concept.ref.slice(1)) <= 23 ? '5' : '6'} ${concept.ref}] ${question.stem} Answer: ${question.printed}.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
${warning}
## evidence_gaps
Independent medical verification and Helwan faculty review remain required before publication.${concept.gap ? ' Direct local teaching does not state the complete bank proposition; the printed answer is preserved only as auxiliary assessment evidence.' : ''}
## owner
Helwan Year-1 authoring lane
## reviewer
Medical team, Helwan Pathology faculty
## final_publisher
Admin team
## last_reviewed

## review_due

## publication_status
needs_evidence
## editorial_review_status
drafted_not_reviewed
## exclusion_reason

## field_notes
arabicLabel: Blank pending independently verified Arabic terminology review.
arabicAliases: No distinct source-supported Arabic alias has been reviewed.
microtopicId: No reviewed microtopic ID exists beneath the assigned canonical placement.
nanotopicId: No reviewed nanotopic ID exists beneath the assigned canonical placement.
approvedFileResourceIds: Local source files are not rights-cleared for redistribution.
approvedVideoResourceIds: No video is assigned.
resourceOccurrenceIds: Hand-authored from exact governed pages.
sourceCandidateIds: Family 10 completed the four-query search-before-mint gate in the governing triage.
mergeIds: No merge occurred; the exact canonical scope is represented once.
rejectedMergeCandidateIds: No rival same-scope concept survived triage.
lastReviewed: New HU overlay; no faculty review has occurred.
reviewDue: Set after first faculty review.
exclusionReason: Not excluded; held at needs_evidence.
reuseGovernance: ${concept.reuseId ? 'Standalone-complete HU overlay preserving the exact governed concept ID, canonical key and meaning.' : 'New question-led concept using the governed Family-10 no-same-scope decision and deterministic key-derived ID.'}`
}

const articleRow = (config) => {
  const subset = config.refs.map((ref) => byRef[ref])
  return `# Item
## id
${config.id}
## title
${config.title}
## arabic_title

## aliases
${config.aliases.join('\n')}
## subject
fnd
## topic
General pathology
## subtopic
${config.topic}
## microtopic
Family-10 true/false distinctions
## nanotopic
T17–T32 safe unique occurrences
## primary_node_id
${subset[0].primary}
## secondary_node_ids
${[...new Set(subset.map((concept) => concept.secondary))].join('\n')}
## template_id
TPL-CONCEPT
## archetype
concept
## language
en
## learner_stage
Years 1–3 foundation
## reading_time
8
## high_yield
High
## time_sensitive
stable
## status
Draft
## owner
Helwan Year-1 authoring lane
## reviewer
Medical team, Helwan Pathology faculty
## final_publisher
Admin team
## summary
${config.summary}
## sections
### Definition
${subset.map((concept) => concept.display).join(' ')}

### Mechanism
${config.mechanism}

### Key determinants
${config.determinants}

### Clinical significance
These distinctions connect literal source statements to their pathology mechanisms. Every linked question preserves its printed answer while remaining Draft pending independent review.
## published_summary

## published_sections

## hold_these
${subset.map((concept) => concept.display).join('\n')}
## lose_the_mark
${config.loses.join('\n')}
## related_concepts
${subset.map((concept) => concept.id).join('\n')}
## related_articles
${otherArticles(config.id).join('\n')}
## question_ids
${config.refs.map((ref) => questionFor(byRef[ref]).id).join('\n')}
## resource_ids
${articleSources(config.id).join('\n')}
## universities
hu
## years
HU_Y1
## module
HU-BMS-102
## module_subject
HU-BMS-102 > Pathology > ${config.topic}
## university_notes
hu: Restricted to HU-BMS-102 Year-1. Governed Helwan lectures supply local teaching and Family-10 supplies exact auxiliary printed-answer occurrences without official-exam authority.
## annotations
${subset.map((concept) => `### definition_of · ${concept.id}\nQuote: ${concept.display}\nBlock: body`).join('\n\n')}
## media

## media_recommendations

## callout_evidence
${subset.map((concept) => `### ${concept.display}\nClaims: ${concept.claim}\nCitations: ${concept.currCit}, ${concept.asmCit}\nSpan: ${concept.span}`).join('\n\n')}
## article_source_ids
${articleSources(config.id).join('\n')}
## claim_ids
${subset.map((concept) => concept.claim).join('\n')}
## span_ids
${subset.map((concept) => concept.span).join('\n')}
## publication_gate
needs_evidence
## evidence_basis
Governed Helwan pathology lectures provide local teaching. Family-10 pp5–6 provide exact visibly printed true/false answers but are an auxiliary study bank, not an authenticated official key.
## evidence_gaps
${config.gaps}
## conflicts
[clear]
## last_reviewed

## review_due

## notes
Exact source wording remains in linked questions. T27 is held for a printed-answer/teaching conflict. T18–T20 and T24–T25 are excluded repeat occurrences; the literal “Ture” typo in T18 and T25 is documented but not converted into a released answer.
## field_notes
arabicTitle: Blank pending independently verified Arabic terminology review.
publishedSummary: Blank because status is Draft.
publishedSections: Blank because status is Draft.
media: No rights-cleared asset is attached; this article is text-runnable.
mediaRecommendations: No visual is required for these tested distinctions.
lastReviewed: New draft; no faculty review has occurred.
reviewDue: Set only after first faculty review.`
}

const claimRow = (concept) => `# Item
## id
${concept.claim}
## concept_id
${concept.id}
## subject
${concept.subjectText}
## predicate
${concept.predicate}
## object
${concept.object}
## display_text
${concept.display}
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
${concept.gap ? '0.78' : '0.92'}
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
authority: governed Helwan teaching plus an auxiliary exact printed answer; no official-key authority inferred${concept.gap ? '; local teaching does not state the complete bank proposition' : ''}`

const curriculumCitation = (concept) => `# Item
## id
${concept.currCit}
## claim_id
${concept.claim}
## resource_id
${concept.teaching.source}
## evidence_role
local_curriculum
## support_span
${concept.teaching.text}
## locator_type
page
## locator_page
${concept.teaching.pages.split(',')[0].trim()}
## locator_section
${concept.micro}
## locator_detail
PDF p${concept.teaching.pages}, governed Helwan teaching source
## context_note
Local curriculum support only; independent medical verification remains required.${concept.gap ? ' The lecture support is explicitly partial and does not state the complete bank proposition.' : ''}
## confidence
${concept.gap ? '0.76' : '0.92'}
## counts_as_claim_evidence
no`

const assessmentCitation = (concept) => {
  const question = questionFor(concept)
  const page = Number(question.ref.slice(1)) <= 23 ? '5' : '6'
  return `# Item
## id
${concept.asmCit}
## claim_id
${concept.claim}
## resource_id
${source.assessment}
## evidence_role
auxiliary_assessment
## support_span
${question.stem} Answer: ${question.printed}.
## locator_type
page
## locator_page
${page}
## locator_section
Family 10 ${question.ref}
## locator_detail
PDF p${page}, exact statement and visibly printed ${question.printed}
## context_note
Tier-3 local keyed study-bank evidence only; not an official exam or authenticated official key.${question.gap ? ' The printed answer is preserved despite incomplete direct local teaching of the full proposition.' : ''}
## confidence
0.94
## counts_as_claim_evidence
no`
}

const spanRow = (concept) => `# Item
## id
${concept.span}
## article_id
${concept.article}
## section_id
${concept.article.toLowerCase()}-${concept.ref.toLowerCase()}
## text
${concept.display}
## claim_ids
${concept.claim}
## citation_ids
${concept.currCit}
${concept.asmCit}`

const relations = [
  { source: byRef.T21.id, type: 'associated_with', target: 'CON-FND-3AD32A7C1D365E', refs: ['T21'], scope: 'pregnancy and oral-contraceptive exposure are thrombosis-risk contexts related to the governed postoperative-DVT concept' },
  { source: byRef.T22.id, type: 'associated_with', target: 'CON-FND-A0BC07E35554B1', refs: ['T22'], scope: 'the source-keyed fatty-liver predisposition statement is related to the governed hepatic-steatosis mechanism concept' },
  { source: byRef.T23.id, type: 'contrasts_with', target: byRef.T32.id, refs: ['T23', 'T32'], scope: 'secondary tuberculosis is linked to bronchial spread in the bank while primary tuberculosis is linked to blood spread' },
  { source: byRef.T26.id, type: 'associated_with', target: 'CON-FND-E48123187F65F3', refs: ['T26'], scope: 'lymphatic-obstruction oedema is non-pitting and relates to the governed filarial-obstruction example' },
  { source: byRef.T28.id, type: 'contrasts_with', target: 'CON-FND-33466CEBFC4EBA', refs: ['T28'], scope: 'metastatic calcification in viable tissue with hypercalcaemia contrasts with dystrophic calcification in dead tissue with normal calcium' },
  { source: byRef.T29.id, type: 'associated_with', target: byRef.T23.id, refs: ['T29', 'T23'], scope: 'tuberculosis risk contexts are associated with the secondary-disease spread concept tested in the same source family' },
  { source: byRef.T30.id, type: 'associated_with', target: 'CON-INF-65FB4A491E31E5', refs: ['T30'], scope: 'fibrous-tissue proliferation in chronic inflammation is related to the governed fibroblast-and-fibrosis chronicity concept' },
  { source: byRef.T31.id, type: 'associated_with', target: 'CON-FND-D955408D228002', refs: ['T31'], scope: 'the Congo-red staining feature is associated with the governed amyloid-definition concept' },
]

const relationRow = (relation) => `# Item
## source
${relation.source}
## type
${relation.type}
## target
${relation.target}
## evidence_claim_ids
${relation.refs.map((ref) => byRef[ref].claim).join('\n')}
## citation_ids
${relation.refs.map((ref) => byRef[ref].currCit).join('\n')}
## verification_status
needs_evidence
## confidence
${relation.refs.some((ref) => byRef[ref].gap) ? '0.76' : '0.86'}
## qualifiers
scope: ${relation.scope}
## reviewer
Medical team, Helwan Pathology faculty`

const explanation = (question, option) => {
  if (question.gap) {
    if (option === 'A') return `True is the visibly printed answer for this exact Family-10 statement. The governed local lecture supplies only narrower or partial context, so this Draft explanation preserves the source answer without claiming that the lecture independently proves the complete proposition. Faculty review and independent medical verification remain required before publication.`
    return `False is not the visibly printed answer for this occurrence; the source prints True. Because the governed local lecture does not explicitly state the complete proposition, this record does not invent a stronger medical adjudication. It records the evidence limitation and keeps the item Draft rather than presenting the printed answer as an official key.`
  }
  if (question.printed === 'True') {
    if (option === 'A') return `True is correct because ${question.trueReason}. The statement matches both the visibly printed Family-10 answer and the governed Helwan teaching. The explanation preserves the literal statement and does not promote the auxiliary bank to an official examination or authenticated faculty key.`
    return `False does not fit because ${question.trueReason}. Denying the statement would reverse the source-supported relationship. The Family-10 carrier visibly prints True, while the linked lecture supplies the teaching context; the item remains Draft pending independent review.`
  }
  if (option === 'A') return `True does not fit because ${question.falseReason}. The statement confuses two mechanisms, definitions or pathologic patterns. The Family-10 carrier visibly prints False, and the linked Helwan teaching explains the correction without changing the literal source wording.`
  return `False is correct because ${question.falseReason}. The decisive distinction corrects the proposition while preserving the source's visibly printed False answer. This is auxiliary study-bank evidence rather than an official key, and the record remains Draft pending independent review.`
}

const questionRow = (question) => {
  const concept = byRef[question.ref]
  const page = Number(question.ref.slice(1)) <= 23 ? '5' : '6'
  const warning = question.gap ? ' Partial-teaching warning: the governed local lecture does not explicitly state the complete proposition; the visibly printed answer is preserved as auxiliary evidence without an official-key or faculty-adjudication claim.' : ''
  return `# Item
## id
${question.id}
## title
${question.stem}
## subject
fnd
## status
Draft
## owner
Helwan Year-1 authoring lane
## vignette

## question
${question.stem}
## format
true or false
## derived_from

## correct_answer
${question.key}
## answer_a
True
## explanation_a
${explanation(question, 'A')}
## answer_b
False
## explanation_b
${explanation(question, 'B')}
## topic
General pathology
## subtopic
${concept.micro}
## difficulty
Easy
## question_type
True/False
## main_concept
${concept.id}
## module
HU-BMS-102
## module_subject
HU-BMS-102 > Pathology > ${concept.micro} > ${concept.nano}
## clinical_relevance
0.78
## academic_relevance
0.98
## cognitive_effort_score
0.42
## exam_weight_by_year
HU_Y1=0.84
## question_only_for
HU_Y1
## concept_ids
${concept.id}
## years
HU_Y1
## universities
hu
## cognitive_effort
Low
## setting
Both
## reasoning_level
1
## inferred_difficulty
40
## exam_relevance
8
## contextual_concept_ids

## library_ids
${concept.article}
## resource_ids
${source.assessment}
${concept.teaching.source}
## learning_objective
${concept.objective}
## media_recommendations

## source_citation
${source.assessment}, PDF p${page}, Family-10 ${question.ref}: literal statement and visibly printed answer ${question.printed} preserved. Authority: tier-3 local keyed study bank, not an official exam or authenticated official key. Teaching context: ${concept.teaching.source}, PDF p${concept.teaching.pages}.
## attachments

## attached_image

## author_notes
Literal source wording, capitalization, punctuation and visibly printed ${question.printed} answer are preserved. The fixed true/false contract uses only A=True and B=False; no additional options are emitted. No official sitting, marks, recurrence, candidate response or corrected answer is inferred. T27 is held for a printed-answer/teaching conflict. T18–T20 and T24–T25 are excluded repeat occurrences; source spellings “Ture” in T18 and T25 are documented but not coerced into released answers.${warning}${concept.reuseId ? ' This question reuses a governed exact-scope concept by exact ID.' : ''}
## estimated_seconds
45
## randomise_answers
no`
}

const files = new Map([
  ['evidence/HU-BMS-102-pathology-family10-tf-part2-sources.md', sources],
  ['article/HU-BMS-102-pathology-family10-tf-part2-articles.md', articleConfig.map(articleRow).join('\n---\n\n')],
  ['concept/HU-BMS-102-pathology-family10-tf-part2-concepts.md', concepts.map(conceptRow).join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family10-tf-part2-claims.md', concepts.map(claimRow).join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family10-tf-part2-citations.md', [...concepts.map(curriculumCitation), ...concepts.map(assessmentCitation)].join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family10-tf-part2-spans.md', concepts.map(spanRow).join('\n---\n\n')],
  ['relations/HU-BMS-102-pathology-family10-tf-part2-relations.md', relations.map(relationRow).join('\n---\n\n')],
  ['question/HU-BMS-102-pathology-family10-tf-part2-questions.md', questions.map(questionRow).join('\n---\n\n')],
])

for (const [relative, body] of files) {
  const output = join(root, relative)
  mkdirSync(dirname(output), { recursive: true })
  writeFileSync(output, `${body.trim()}\n`)
}

console.log(JSON.stringify({
  family: '10-tf-part2',
  refs: questions.map((question) => `F10-${question.ref}`),
  printedAnswers: questions.map((question) => question.printed),
  importerKeys: questions.map((question) => question.key),
  released: { sources: 7, articles: 4, concepts: 10, newConcepts: 6, standaloneCompleteConceptReuses: 4, questions: 10, claims: 10, citations: 20, spans: 10, relations: 8 },
  explicitEvidenceLimitations: ['F10-T21', 'F10-T22', 'F10-T23', 'F10-T29', 'F10-T32'],
  hold: ['F10-T27 printed-answer/teaching conflict'],
  exclusions: ['F10-T18→T02 wording copy with literal Ture typo', 'F10-T19→T03 wording copy', 'F10-T20→T04 wording copy', 'F10-T24→T10 wording copy', 'F10-T25→T13 wording copy with literal Ture typo'],
  remaining: 'Family-10 routine T01–T32 closed apart from explicit T27 conflict hold and governed duplicate exclusions.',
}, null, 2))
