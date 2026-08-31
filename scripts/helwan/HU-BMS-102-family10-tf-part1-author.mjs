import { createHash } from 'node:crypto'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const root = join(repo, 'docs', 'Helwan-Source-Imports')

const source = {
  assessment: 'src_a2b7d25d987469febab8',
  inflammation1: 'src_eaea111707b57559a904',
  inflammation2: 'src_949c1820aea58bded856',
}

const article = {
  vascular: 'ART-HU-BMS102-PAT-F10TF1-DEFINITION-CARDINAL-VASCULAR',
  exudate: 'ART-HU-BMS102-PAT-F10TF1-EXUDATE-MORPHOLOGIC-PATTERNS',
  cells: 'ART-HU-BMS102-PAT-F10TF1-INFLAMMATORY-CELLS',
}

const idFor = (key) => `CON-INF-${createHash('sha256').update(key).digest('hex').slice(0, 14).toUpperCase()}`

const concepts = [
  {
    ref: 'T01', key: 'pathology.inflammation.local-tissue-response-injurious-agent-definition',
    label: 'Inflammation is a local response of living tissue to an injurious agent', aliases: ['Inflammation definition', 'Local tissue response to injury'],
    definition: 'Inflammation is the local vascular, lymphatic and cellular response of living tissue to an injurious agent. It is a protective reaction that removes or contains the cause of injury and initiates clearance and repair.',
    objective: 'Define inflammation as a local response of living tissue to an injurious agent.', pitfalls: 'Calling inflammation a systemic reaction only, or applying the term to dead tissue that cannot mount a vascular and cellular response.',
    type: 'definition', micro: 'Inflammation foundations', nano: 'Definition', article: article.vascular,
    subject: 'Inflammation', predicate: 'is', object: 'a local response of living tissue to an injurious agent',
    teaching: [{ source: source.inflammation1, pages: '4', text: 'Inflammation is a response of living tissue to an injurious agent and consists of vascular, lymphatic and local tissue changes.' }],
  },
  {
    ref: 'T02', key: 'pathology.inflammation.radiation-physical-cause',
    label: 'Radiation is a physical cause of inflammation', aliases: ['Radiation-induced inflammation', 'Physical inflammatory cause'],
    definition: 'Radiation can injure living tissue and initiate inflammation. In the governed cause classification, radiation appears among physical injurious agents together with trauma, heat and cold.',
    objective: 'Recognize radiation as a physical injurious agent capable of causing inflammation.', pitfalls: 'Restricting inflammatory causes to infection or chemicals and overlooking physical injury.',
    type: 'classification', micro: 'Inflammation foundations', nano: 'Physical causes', article: article.vascular,
    subject: 'Radiation', predicate: 'can cause', object: 'inflammation',
    teaching: [{ source: source.inflammation1, pages: '8', text: 'The Helwan causes-of-inflammation map lists radiation among physical causes.' }],
  },
  {
    ref: 'T03', reuseId: 'CON-FND-F958798DE30178', reuseKey: 'acute-inflammation',
    label: 'Acute inflammation produces the cardinal signs of redness, heat, swelling, pain and loss of function', aliases: ['Acute inflammatory response', 'Cardinal signs of inflammation'],
    definition: 'Acute inflammation is an immediate non-specific vascular and cellular response to injury. Its cardinal manifestations include redness and heat from increased local blood flow, swelling from exudate, pain, and impaired function.',
    objective: 'Identify redness and hotness as cardinal signs of acute inflammation and connect them to increased local blood flow.', pitfalls: 'Memorising the signs without their mechanisms, or assigning redness and heat to vascular permeability rather than hyperaemia.',
    type: 'mechanism', micro: 'Cardinal signs', nano: 'Redness and hotness', article: article.vascular,
    subject: 'Acute inflammation', predicate: 'produces', object: 'redness and hotness among its cardinal signs',
    teaching: [{ source: source.inflammation1, pages: '7', text: 'The Helwan cardinal-signs slide links redness and hotness to increased blood flow.' }],
  },
  {
    ref: 'T04', key: 'pathology.inflammation.redness-increased-blood-flow',
    label: 'Increased local blood flow causes inflammatory redness', aliases: ['Rubor mechanism', 'Inflammatory hyperaemia and redness'],
    definition: 'Vasodilatation increases blood flow through the inflamed microcirculation. The resulting local hyperaemia produces the cardinal sign of redness, or rubor.',
    objective: 'Explain inflammatory redness by vasodilatation and increased local blood flow.', pitfalls: 'Attributing redness directly to permeability, exudate accumulation or leukocyte migration.',
    type: 'pathophysiological_mechanism', micro: 'Cardinal signs', nano: 'Redness mechanism', article: article.vascular,
    subject: 'Increased local blood flow', predicate: 'causes', object: 'redness in acute inflammation',
    teaching: [{ source: source.inflammation1, pages: '7', text: 'The Helwan cardinal-signs slide attributes redness to increased blood flow.' }],
  },
  {
    ref: 'T05', key: 'pathology.inflammation.hotness-increased-blood-flow-not-permeability',
    label: 'Inflammatory hotness reflects increased blood flow rather than increased capillary permeability', aliases: ['Calor mechanism', 'Hotness versus permeability'],
    definition: 'The warmth or hotness of acute inflammation reflects vasodilatation and increased local blood flow. Increased capillary permeability instead permits inflammatory exudate to leave the microcirculation and contributes primarily to swelling.',
    objective: 'Distinguish the increased-blood-flow mechanism of inflammatory hotness from the permeability mechanism of exudate and swelling.', pitfalls: 'Assigning every inflammatory sign to permeability; permeability explains exudation, while hyperaemia explains redness and heat.',
    type: 'comparison', micro: 'Cardinal signs', nano: 'Hotness mechanism', article: article.vascular,
    subject: 'Inflammatory hotness', predicate: 'results from', object: 'increased local blood flow rather than capillary permeability',
    teaching: [{ source: source.inflammation1, pages: '7, 19', text: 'The cardinal-signs slide links hotness to increased blood flow, while the exudate mechanism slide links vascular permeability to exudate formation.' }],
  },
  {
    ref: 'T06', reuseId: 'CON-INF-30F5A69E1BDA0D', reuseKey: 'pathology.inflammation.exudate-transudate-blood-derived-cell-content',
    label: 'Inflammatory exudate is plasma filtrate mixed with inflammatory cells and debris, not whole blood', aliases: ['Exudate definition', 'Exudate versus haemorrhage'],
    definition: 'An inflammatory exudate is protein-rich plasma filtrate mixed with inflammatory cells and cellular debris because vascular permeability has increased. It is not leakage of whole blood outside vessels, which describes haemorrhage.',
    objective: 'Differentiate inflammatory exudate from whole-blood extravasation.', pitfalls: 'Calling exudate whole blood, or confusing protein-rich inflammatory fluid with a low-protein transudate.',
    type: 'comparison', micro: 'Inflammatory exudate', nano: 'Definition', article: article.exudate,
    subject: 'Inflammatory exudate', predicate: 'is', object: 'plasma filtrate mixed with inflammatory cells and debris rather than whole blood',
    teaching: [{ source: source.inflammation1, pages: '22', text: 'The lecture defines exudate as blood-plasma filtrate mixed with inflammatory cells and cellular debris.' }],
  },
  {
    ref: 'T07', key: 'pathology.inflammation.transudate-noninflammatory-not-late',
    label: 'A transudate is a non-inflammatory ultrafiltrate rather than a late inflammatory exudate', aliases: ['Transudate timing statement', 'Transudate versus inflammatory exudate'],
    definition: 'A transudate is a relatively protein-poor, cell-poor ultrafiltrate of plasma formed with normal vascular permeability, usually through hydrostatic or oncotic imbalance. It is therefore not classified as a late phase of inflammation.',
    objective: 'Reject the claim that transudates occur late in inflammation by distinguishing transudate from inflammatory exudate.', pitfalls: 'Treating transudate and exudate as early and late stages of one process rather than fluids generated by different mechanisms.',
    type: 'comparison', micro: 'Inflammatory exudate', nano: 'Transudate distinction', article: article.exudate,
    subject: 'A transudate', predicate: 'is', object: 'a non-inflammatory ultrafiltrate rather than a late inflammatory phase',
    teaching: [{ source: source.inflammation1, pages: '22', text: 'The lecture contrasts transudate, an ultrafiltrate formed with normal capillary permeability, with inflammatory exudate formed with increased permeability.' }],
  },
  {
    ref: 'T08', key: 'pathology.inflammation.exudate-coagulates-on-standing', gap: true,
    label: 'The Family-10 bank prints that exudate coagulates on standing', aliases: ['Exudate coagulability', 'Standing exudate clotting'],
    definition: 'The Family-10 source visibly marks True for the statement that exudates coagulate on standing. The local lecture documents a protein-rich, viscous inflammatory exudate but does not explicitly state the on-standing coagulation proposition; the keyed occurrence is preserved as Draft with that teaching limitation.',
    objective: 'Preserve the printed True occurrence while recognizing that direct local teaching support for the on-standing clause remains incomplete.', pitfalls: 'Upgrading an auxiliary printed answer to an official key, or claiming that the governed lecture explicitly states coagulation on standing when it does not.',
    type: 'source_assertion', micro: 'Inflammatory exudate', nano: 'Coagulability', article: article.exudate,
    subject: 'The Family-10 exudate statement', predicate: 'is visibly answered', object: 'True for coagulation on standing',
    teaching: [{ source: source.inflammation1, pages: '22', text: 'The lecture describes exudate as protein rich, turbid and viscous, but does not explicitly state that it coagulates on standing.' }],
  },
  {
    ref: 'T09', key: 'pathology.inflammation.serofibrinous-not-purulent',
    label: 'Serofibrinous inflammation is fibrin-rich and serosal, not a pus-forming pattern', aliases: ['Serofibrinous versus suppurative inflammation', 'Fibrin-rich serosal exudate'],
    definition: 'Serofibrinous inflammation produces excess fluid exudate rich in fibrin on serous membranes. Pus formation instead defines suppurative inflammation, so association with pus does not describe the serofibrinous pattern.',
    objective: 'Distinguish serofibrinous inflammation from suppurative pus formation.', pitfalls: 'Equating fibrin-rich exudate with pus, or confusing a serosal pattern with an abscess.',
    type: 'comparison', micro: 'Morphologic patterns', nano: 'Serofibrinous versus suppurative', article: article.exudate,
    subject: 'Serofibrinous inflammation', predicate: 'is characterized by', object: 'fibrin-rich serosal exudate rather than pus',
    teaching: [{ source: source.inflammation2, pages: '6, 24', text: 'The lecture defines an abscess by pus formation and defines serofibrinous inflammation by fibrin-rich fluid exudate on a serous membrane.' }],
  },
  {
    ref: 'T10', reuseId: 'CON-INF-60B6A56331F9AA', reuseKey: 'pathology.inflammation.serous-inflammation-burn-skin',
    label: 'A skin burn produces serous inflammation', aliases: ['Burn blister inflammatory pattern', 'Serous inflammation in burns'],
    definition: 'Serous inflammation is characterized by excess thin, relatively cell-poor serous exudate. In skin burns it produces a fluid-filled blister beneath or within the injured epithelium.',
    objective: 'Classify the inflammatory pattern in burned skin as serous inflammation.', pitfalls: 'Choosing purulent inflammation without pus, fibrinous inflammation without a fibrin-rich serosal exudate, or granulomatous inflammation without macrophage aggregates.',
    type: 'classification', micro: 'Morphologic patterns', nano: 'Burn serous inflammation', article: article.exudate,
    subject: 'A skin burn', predicate: 'produces', object: 'serous inflammation',
    teaching: [{ source: source.inflammation2, pages: '25', text: 'The lecture defines serous inflammation as excess effusion of serous exudate and lists burn as an example.' }],
  },
  {
    ref: 'T11', reuseId: 'CON-INF-34547E1D72B1EF', reuseKey: 'pathology.inflammation.acute-neutrophil-first-48-hours',
    label: 'Neutrophils are the prominent cells of early acute inflammation', aliases: ['Acute inflammation neutrophils', 'Prominent acute inflammatory cell'],
    definition: 'Neutrophils are the predominant inflammatory cells during the early phase of acute inflammation, especially the first 24 to 48 hours. Macrophages and lymphocytes become more prominent later or in chronic inflammation.',
    objective: 'Identify neutrophils as the prominent cells in acute inflammation.', pitfalls: 'Selecting lymphocytes or macrophages because they are prominent later, or eosinophils without an allergic or parasitic context.',
    type: 'time_course', micro: 'Inflammatory cells', nano: 'Acute neutrophil predominance', article: article.cells,
    subject: 'Neutrophils', predicate: 'are', object: 'the prominent cells of early acute inflammation',
    teaching: [{ source: source.inflammation1, pages: '23', text: 'The governed inflammatory-cell teaching identifies neutrophils as the prominent early acute inflammatory cells.' }],
  },
  {
    ref: 'T12', key: 'pathology.inflammation.parasitic-eosinophil-not-lymphocyte-predominance',
    label: 'Eosinophils rather than lymphocytes are prominent in parasitic inflammation', aliases: ['Parasitic inflammatory cell', 'Eosinophils in parasitic disease'],
    definition: 'Eosinophils are characteristically prominent in parasitic inflammation and participate in antiparasitic effector responses. Lymphocytes may be present, but they are not the characteristic prominent cell selected by this statement.',
    objective: 'Reject lymphocyte predominance and identify eosinophils as the characteristic cell in parasitic inflammation.', pitfalls: 'Choosing lymphocytes merely because parasitic disease can be chronic, without recognizing the characteristic eosinophilic response.',
    type: 'comparison', micro: 'Inflammatory cells', nano: 'Parasitic inflammation', article: article.cells,
    subject: 'Parasitic inflammation', predicate: 'characteristically features', object: 'eosinophils rather than lymphocytes',
    teaching: [{ source: source.inflammation2, pages: '37', text: 'The chronic-inflammation cell slide lists eosinophils in allergic and parasitic types.' }],
  },
  {
    ref: 'T13', key: 'pathology.inflammation.eosinophils-acute-and-chronic', gap: true,
    label: 'The Family-10 bank prints that eosinophils occur in acute and chronic inflammation', aliases: ['Eosinophils across inflammatory patterns', 'Acute and chronic eosinophils'],
    definition: 'The Family-10 source visibly marks True for the statement that eosinophils are present in acute and chronic inflammation. The governed local lecture explicitly places eosinophils in allergic and parasitic inflammatory patterns but does not itself state the complete acute-plus-chronic proposition; that limitation remains explicit while the record is Draft.',
    objective: 'Preserve the printed True occurrence while separating the bank assertion from the narrower local lecture support.', pitfalls: 'Claiming that the local lecture explicitly proves the full acute-plus-chronic scope, or converting the auxiliary printed answer into an official key.',
    type: 'source_assertion', micro: 'Inflammatory cells', nano: 'Acute and chronic occurrence', article: article.cells,
    subject: 'The Family-10 eosinophil statement', predicate: 'is visibly answered', object: 'True for occurrence in acute and chronic inflammation',
    teaching: [{ source: source.inflammation2, pages: '37', text: 'The lecture explicitly lists eosinophils in allergic and parasitic inflammation but does not state the full acute-and-chronic proposition.' }],
  },
]

for (const concept of concepts) {
  concept.id = concept.reuseId ?? idFor(concept.key)
  concept.key = concept.reuseKey ?? concept.key
  concept.claim = `CLM-HU102-F10TF1-${concept.ref}-01`
  concept.currCit = `CIT-HU102-F10TF1-${concept.ref}-CURR`
  concept.asmCit = `CIT-HU102-F10TF1-${concept.ref}-ASM`
  concept.span = `SPN-HU102-F10TF1-${concept.ref}-01`
  concept.display = `${concept.subject} ${concept.predicate} ${concept.object}.`
}

const byRef = Object.fromEntries(concepts.map((concept) => [concept.ref, concept]))

const questions = [
  { ref: 'T01', stem: 'Inflammation is a local reaction of any tissue to injurious agent', printed: 'True', trueReason: 'inflammation is a local response mounted by living tissue against an injurious agent' },
  { ref: 'T02', stem: 'Radiation can cause inflammation', printed: 'True', trueReason: 'radiation is listed among the physical injurious agents that can initiate inflammation' },
  { ref: 'T03', stem: 'Redness and hotness are signs of acute inflammation', printed: 'True', trueReason: 'redness and hotness are cardinal manifestations of the vascular response in acute inflammation' },
  { ref: 'T04', stem: 'Increased blood flow is the cause of redness in acute inflammation', printed: 'True', trueReason: 'vasodilatation and the resulting local hyperaemia produce inflammatory redness' },
  { ref: 'T05', stem: ' capillary permeability is the cause of hotness in acute inflammation', printed: 'False', falseReason: 'hotness reflects increased local blood flow; increased permeability instead produces exudation and contributes to swelling' },
  { ref: 'T06', stem: 'exudate is leakage of blood outside the vessels', printed: 'False', falseReason: 'exudate is plasma filtrate mixed with inflammatory cells and debris, whereas whole-blood extravasation is haemorrhage' },
  { ref: 'T07', stem: 'transudates occur late in inflammation', printed: 'False', falseReason: 'a transudate is a non-inflammatory ultrafiltrate generated with normal permeability, not a late inflammatory phase' },
  { ref: 'T08', stem: 'exudates coagulate in standing', printed: 'True', trueReason: 'the source visibly prints True for this exact statement', gap: true },
  { ref: 'T09', stem: 'serofibrinous inflammation is associated with pus', printed: 'False', falseReason: 'serofibrinous inflammation is fibrin-rich on serous membranes, while pus defines suppurative inflammation' },
  { ref: 'T10', stem: 'Serous inflammation occurs in burns', printed: 'True', trueReason: 'a burn blister is a standard example of serous inflammation' },
  { ref: 'T11', stem: 'Prominent cell in acute inflammation is neutrophil', printed: 'True', trueReason: 'neutrophils predominate in the early acute inflammatory response' },
  { ref: 'T12', stem: 'The lymphocyte is the prominent inflammatory cell in parasitic infection', printed: 'False', falseReason: 'eosinophils, rather than lymphocytes, are the characteristic prominent cells in parasitic inflammation' },
  { ref: 'T13', stem: 'Eosinophils present in acute and chronic inflammation', printed: 'True', trueReason: 'the source visibly prints True for this exact statement', gap: true },
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
  sourceRow({ id: source.assessment, title: 'General pathology MCQ and true/false bank with printed answers', path: 'Year 1/BMS 102/Pathology/Questions/MCQs/MCQs - MCQ Pathology.pdf', pages: 6, sha: 'a2b7d25d987469febab87a5a80fd52db5c8d74a1ade0dfabd6482fec9da63475', qualification: 'Tier-3 local pathology study bank visibly attributed to Dr Ahmed Hassan. Page 5 contains Family-10 T01–T25 and page 6 contains T26–T32, each with a visibly printed answer. This slice uses only T01–T13; it is not an authenticated sitting, official departmental key or mark scheme.', assessment: true }),
  sourceRow({ id: source.inflammation1, title: 'Inflammation 1 — Helwan BMS-102 pathology lecture', path: 'Year 1/BMS 102/Pathology/Theoretical/Lec 5 - Inflammation 1/Inflammation-lecture-1.pdf', pages: 37, sha: 'eaea111707b57559a9042fc7c7fcd737cfbf326a5bf28fba026252566575fdc7', qualification: 'Tier-4 Helwan theoretical lecture visibly attributed to Dr Enas Megahed Elhosary. It supplies local definition, causes, cardinal-sign, exudate and early inflammatory-cell teaching; it is not an assessment instrument.', assessment: false }),
  sourceRow({ id: source.inflammation2, title: 'Inflammation 2 — Helwan BMS-102 pathology lecture', path: 'Year 1/BMS 102/Pathology/Theoretical/Lec 7 - Inflammation 2/Inflammation lecture 2.pdf', pages: 53, sha: '949c1820aea58bded856011cc31bd8ce958941ce7f17e4c390cb1343b8d1677d', qualification: 'Tier-4 Helwan theoretical lecture visibly attributed to Dr Enas Megahed Elhosary. It supplies local suppurative, serofibrinous, serous and eosinophil teaching; it is not an assessment instrument.', assessment: false }),
].join('\n---\n\n')

const articleConfig = [
  {
    id: article.vascular, refs: ['T01', 'T02', 'T03', 'T04', 'T05'], title: 'Inflammation definition, causes and vascular cardinal signs', aliases: ['Inflammatory response and cardinal signs', 'Redness and hotness mechanisms'],
    summary: 'Inflammation is a local response of living tissue to injury. Radiation is a physical cause. In acute inflammation, vasodilatation and increased local blood flow produce redness and heat, while permeability has a different role in exudate formation and swelling.',
    mechanism: 'An injurious agent activates local vascular and cellular responses. Vasodilatation increases flow through the inflamed tissue, producing redness and warmth. Endothelial permeability then allows protein-rich fluid to leave the circulation; that event explains exudation and swelling rather than the heat itself.',
    determinants: 'Separate the trigger from the vascular consequence. Radiation belongs to the physical cause category. Redness and hotness track increased blood flow, whereas permeability tracks exudation.',
    loses: ['Calling inflammation a response of dead tissue.', 'Restricting inflammatory causes to microorganisms.', 'Assigning hotness to permeability instead of increased blood flow.', 'Using increased permeability and increased blood flow as interchangeable mechanisms.'],
    gaps: 'Independent medical verification and Helwan faculty review remain required before publication.',
  },
  {
    id: article.exudate, refs: ['T06', 'T07', 'T08', 'T09', 'T10'], title: 'Exudate, transudate and acute inflammatory patterns', aliases: ['Inflammatory fluid distinctions', 'Serous, serofibrinous and suppurative patterns'],
    summary: 'Exudate is protein-rich plasma filtrate mixed with inflammatory cells and debris, not whole blood. Transudate is a non-inflammatory ultrafiltrate. Serofibrinous inflammation is fibrin-rich rather than purulent, while burns produce serous inflammation.',
    mechanism: 'Increased permeability creates inflammatory exudate; normal permeability with hydrostatic or oncotic imbalance creates transudate. Morphology then depends on composition and site: serofibrinous exudate is fibrin rich on a serous membrane, pus defines suppuration, and thin serous exudate forms a burn blister.',
    determinants: 'Do not turn exudate and transudate into early and late stages. Distinguish plasma-derived inflammatory fluid from whole-blood haemorrhage and distinguish fibrin-rich, serous and purulent patterns.',
    loses: ['Calling exudate whole blood outside a vessel.', 'Calling transudate a late inflammatory phase.', 'Equating serofibrinous exudate with pus.', 'Missing burn as a serous pattern.', 'Claiming that the lecture explicitly states the T08 on-standing clause.'],
    gaps: 'Independent medical verification and faculty review are required. For T08, the local lecture documents exudate composition but does not explicitly state coagulation on standing; the auxiliary printed True remains Draft and is not described as an official key.',
  },
  {
    id: article.cells, refs: ['T11', 'T12', 'T13'], title: 'Inflammatory-cell predominance in acute and parasitic patterns', aliases: ['Neutrophils and eosinophils in inflammation', 'Inflammatory cell patterns'],
    summary: 'Neutrophils predominate early in acute inflammation. Eosinophils are characteristic of allergic and parasitic inflammation, so lymphocyte predominance does not describe the tested parasitic pattern.',
    mechanism: 'The dominant recruited leukocyte varies with stimulus and time. Neutrophils dominate the early acute response, while eosinophils are recruited in allergic and parasitic settings. A cell can occur in more than one pattern without being the dominant cell in every pattern.',
    determinants: 'Use both the inflammatory context and the time course. Acute early inflammation points to neutrophils; parasitic inflammation points to eosinophils rather than lymphocytes.',
    loses: ['Selecting lymphocytes for parasitic inflammation merely because some infections are chronic.', 'Calling eosinophils the universal dominant acute inflammatory cell.', 'Claiming that the local lecture explicitly states the full T13 acute-plus-chronic proposition.'],
    gaps: 'Independent medical verification and faculty review are required. For T13, the local lecture explicitly supports eosinophils in allergic and parasitic patterns but not the complete acute-plus-chronic statement; the auxiliary printed True remains Draft and is not described as an official key.',
  },
]

const articleSources = (id) => [...new Set([source.assessment, ...concepts.filter((concept) => concept.article === id).flatMap((concept) => concept.teaching.map((item) => item.source))])]
const otherArticles = (id) => Object.values(article).filter((candidate) => candidate !== id)

const conceptRow = (concept) => {
  const question = questionFor(concept)
  const warning = concept.gap ? `Partial-teaching warning: the auxiliary bank visibly prints ${question.printed}, while the governed local lecture provides narrower or indirect teaching and does not explicitly state the complete proposition. No official-key or faculty-adjudication claim is inferred.` : '[clear]'
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
SYS-INF
## secondary_node_ids
DIS-PAT-T02
## learner_years
1
## universities
hu
## modules
HU-BMS-102
## module_subject
HU-BMS-102 > Pathology > Inflammation > ${concept.micro} > ${concept.nano}
## article_ids
${concept.article}
## related_article_ids
${otherArticles(concept.article).join('\n')}
## related_concept_ids
${concepts.filter((other) => other.article === concept.article && other.id !== concept.id).map((other) => other.id).join('\n')}
## resource_ids
${[...new Set([source.assessment, ...concept.teaching.map((item) => item.source)])].join('\n')}
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
${source.assessment} | tier-3 local keyed study bank | undated | PDF p5 | Family-10 ${concept.ref} | visibly printed ${question.printed}
## atomic_claim_ids
${concept.claim}
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
${concept.teaching.map((item) => `[Teaching p${item.pages}] ${item.text}`).join('\n')}
[Assessment p5 ${concept.ref}] ${question.stem} Answer: ${question.printed}.
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
microtopicId: No reviewed microtopic ID exists beneath the canonical inflammation placement.
nanotopicId: No reviewed nanotopic ID exists beneath the assigned node.
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
Inflammation
## microtopic
Family-10 true/false distinctions
## nanotopic
T01–T13
## primary_node_id
SYS-INF
## secondary_node_ids
DIS-PAT-T02
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
These distinctions connect a literal true/false statement to the underlying pathology mechanism. Every linked question preserves the source answer while remaining Draft pending independent review.
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
HU-BMS-102 > Pathology > Inflammation
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
Governed Helwan inflammation lectures provide local teaching. Family-10 p5 provides exact visibly printed true/false answers but is an auxiliary study bank, not an authenticated official key.
## evidence_gaps
${config.gaps}
## conflicts
[clear]
## last_reviewed

## review_due

## notes
Exact source wording remains in linked questions. T14–T16 are excluded wording-copy occurrences and T17 onward is outside this slice.
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
${concept.subject}
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
${concept.teaching[0].source}
## evidence_role
local_curriculum
## support_span
${concept.teaching.map((item) => item.text).join(' ')}
## locator_type
page
## locator_page
${concept.teaching[0].pages.split(',')[0].trim()}
## locator_section
${concept.micro}
## locator_detail
PDF p${concept.teaching[0].pages}, governed Helwan teaching source
## context_note
Local curriculum support only; independent medical verification remains required.${concept.gap ? ' The lecture support is explicitly partial and does not state the complete bank proposition.' : ''}
## confidence
${concept.gap ? '0.76' : '0.92'}
## counts_as_claim_evidence
no`

const assessmentCitation = (concept) => {
  const question = questionFor(concept)
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
5
## locator_section
Family 10 ${question.ref}
## locator_detail
PDF p5, exact statement and visibly printed ${question.printed}
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
  { source: byRef.T01.id, type: 'associated_with', target: byRef.T02.id, refs: ['T01', 'T02'], scope: 'radiation is one physical injurious agent capable of initiating the local inflammatory response' },
  { source: byRef.T01.id, type: 'associated_with', target: byRef.T03.id, refs: ['T01', 'T03'], scope: 'acute inflammation is one time-course form of the local response to injury' },
  { source: byRef.T03.id, type: 'associated_with', target: byRef.T04.id, refs: ['T03', 'T04'], scope: 'redness is a cardinal sign explained by increased local blood flow' },
  { source: byRef.T03.id, type: 'associated_with', target: byRef.T05.id, refs: ['T03', 'T05'], scope: 'hotness is a cardinal sign explained by increased local blood flow rather than permeability' },
  { source: byRef.T05.id, type: 'contrasts_with', target: 'CON-FND-19B0A2A6DDA3D5', refs: ['T05'], scope: 'increased blood flow explains hotness, whereas increased permeability explains exudation and swelling' },
  { source: byRef.T06.id, type: 'contrasts_with', target: byRef.T07.id, refs: ['T06', 'T07'], scope: 'protein-rich inflammatory exudate differs from non-inflammatory transudate' },
  { source: byRef.T06.id, type: 'associated_with', target: byRef.T08.id, refs: ['T06', 'T08'], scope: 'the source-keyed coagulability statement is a tested property of inflammatory exudate' },
  { source: byRef.T09.id, type: 'contrasts_with', target: 'CON-INF-4FFD1532040A64', refs: ['T09'], scope: 'serofibrinous inflammation is fibrin-rich, whereas an abscess is localized pus-forming suppurative inflammation' },
  { source: byRef.T09.id, type: 'contrasts_with', target: byRef.T10.id, refs: ['T09', 'T10'], scope: 'serofibrinous inflammation contains fibrin-rich exudate, whereas burn-associated serous inflammation is thin and cell poor' },
  { source: byRef.T11.id, type: 'contrasts_with', target: byRef.T12.id, refs: ['T11', 'T12'], scope: 'neutrophils predominate early in acute inflammation, whereas eosinophils characterize parasitic inflammation' },
  { source: byRef.T12.id, type: 'associated_with', target: byRef.T13.id, refs: ['T12', 'T13'], scope: 'parasitic inflammation is one context in which eosinophils are present' },
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
    if (option === 'A') return `True is the visibly printed answer for this exact Family-10 statement. The governed local lecture supplies only narrower or indirect context, so this Draft explanation preserves the source answer without claiming that the lecture independently proves the complete proposition. Faculty review and independent medical verification remain required before publication.`
    return `False is not the visibly printed answer for this occurrence; the source prints True. Because the governed local lecture does not explicitly state the complete proposition, this record does not invent a stronger medical adjudication. It records the evidence limitation and keeps the item Draft rather than presenting the printed answer as an official key.`
  }
  if (question.printed === 'True') {
    if (option === 'A') return `True is correct because ${question.trueReason}. The statement matches both the visibly printed Family-10 answer and the governed Helwan teaching. The explanation preserves the literal statement and does not promote the auxiliary bank to an official examination or authenticated faculty key.`
    return `False does not fit because ${question.trueReason}. Denying the statement would reverse the source-supported relationship. The Family-10 carrier visibly prints True, while the linked lecture supplies the teaching context; the item remains Draft pending independent review.`
  }
  if (option === 'A') return `True does not fit because ${question.falseReason}. The statement confuses two mechanisms, definitions or inflammatory patterns. The Family-10 carrier visibly prints False, and the linked Helwan teaching explains the correction without changing the literal source wording.`
  return `False is correct because ${question.falseReason}. The decisive distinction corrects the proposition while preserving the source's visibly printed False answer. This is auxiliary study-bank evidence rather than an official key, and the record remains Draft pending independent review.`
}

const questionRow = (question) => {
  const concept = byRef[question.ref]
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
Inflammation
## difficulty
Easy
## question_type
True/False
## main_concept
${concept.id}
## module
HU-BMS-102
## module_subject
HU-BMS-102 > Pathology > Inflammation > ${concept.micro} > ${concept.nano}
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
${[...new Set([source.assessment, ...concept.teaching.map((item) => item.source)])].join('\n')}
## learning_objective
${concept.objective}
## media_recommendations

## source_citation
${source.assessment}, PDF p5, Family-10 ${question.ref}: literal statement and visibly printed answer ${question.printed} preserved. Authority: tier-3 local keyed study bank, not an official exam or authenticated official key. Teaching context: ${concept.teaching.map((item) => `${item.source}, PDF p${item.pages}`).join('; ')}.
## attachments

## attached_image

## author_notes
Literal source wording, capitalization, punctuation and visibly printed ${question.printed} answer are preserved. The fixed true/false contract uses only A=True and B=False; no additional options are emitted. No official sitting, marks, recurrence, candidate response or corrected answer is inferred. T14 is excluded as a punctuation-only copy of T01, T15 as a capitalization-only copy of T06, and T16 as an exact copy of T11. T17 onward remains outside this slice.${warning}${concept.reuseId ? ' This question reuses a governed exact-scope concept by exact ID.' : ''}
## estimated_seconds
45
## randomise_answers
no`
}

const files = new Map([
  ['evidence/HU-BMS-102-pathology-family10-tf-part1-sources.md', sources],
  ['article/HU-BMS-102-pathology-family10-tf-part1-articles.md', articleConfig.map(articleRow).join('\n---\n\n')],
  ['concept/HU-BMS-102-pathology-family10-tf-part1-concepts.md', concepts.map(conceptRow).join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family10-tf-part1-claims.md', concepts.map(claimRow).join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family10-tf-part1-citations.md', [...concepts.map(curriculumCitation), ...concepts.map(assessmentCitation)].join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family10-tf-part1-spans.md', concepts.map(spanRow).join('\n---\n\n')],
  ['relations/HU-BMS-102-pathology-family10-tf-part1-relations.md', relations.map(relationRow).join('\n---\n\n')],
  ['question/HU-BMS-102-pathology-family10-tf-part1-questions.md', questions.map(questionRow).join('\n---\n\n')],
])

for (const [relative, body] of files) {
  const output = join(root, relative)
  mkdirSync(dirname(output), { recursive: true })
  writeFileSync(output, `${body.trim()}\n`)
}

console.log(JSON.stringify({
  family: '10-tf-part1',
  refs: questions.map((question) => `F10-${question.ref}`),
  printedAnswers: questions.map((question) => question.printed),
  importerKeys: questions.map((question) => question.key),
  released: { sources: 3, articles: 3, concepts: 13, newConcepts: 9, standaloneCompleteConceptReuses: 4, questions: 13, claims: 13, citations: 26, spans: 13, relations: 11 },
  explicitEvidenceLimitations: ['F10-T08', 'F10-T13'],
  exclusions: ['F10-T14→T01 punctuation-only copy', 'F10-T15→T06 capitalization-only copy', 'F10-T16→T11 exact copy'],
  remaining: 'F10-T17–T32 outside this slice',
}, null, 2))
