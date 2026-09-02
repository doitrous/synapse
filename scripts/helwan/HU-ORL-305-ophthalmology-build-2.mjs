// Builds HU-ORL-305 Ophthalmology lane-2 cluster output (Chapter 3 items
// #21-96, 69 questions; 7 held (5 unjoined-no-key: Q32, Q36, Q47, Q50, Q53;
// 2 held as 2-option True/False format: Q48, Q49):
//   docs/Helwan-Source-Imports/concept/HU-ORL-305-ophthalmology-concepts-2.md
//   docs/Helwan-Source-Imports/evidence/HU-ORL-305-ophthalmology-claims-2.md
//   docs/Helwan-Source-Imports/article/HU-ORL-305-ophthalmology-articles-2.md
//   coverage/seeds/HU-ORL-305/ch3b.json               (MCQ seed for emit-mcq.mjs)
// Seven facts reuse lane-1's already-minted concept ids (recomputed
// deterministically via the same mintConceptId(canonicalKey), never
// re-minted, never re-emitted — they already exist in
// concept/HU-ORL-305-ophthalmology-concepts.md).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { mintConceptId, renderConcept, renderClaim, renderArticle } from './HU-ORL-305-render.mjs'
import { CONCEPTS as NEW_CONCEPTS } from './HU-ORL-305-ophthalmology-data-2.mjs'
import { CONCEPTS as LANE1_CONCEPTS } from './HU-ORL-305-ophthalmology-data.mjs'
import { QUESTIONS_CH3B } from './HU-ORL-305-ophthalmology-questions-2.mjs'

const bank = JSON.parse(readFileSync('scripts/helwan/extract/HU-ORL-305/mcq-bank-ophthalmology-ch3b.json', 'utf8'))

// --- mint new ids; recompute lane-1 ids for reused roots (deterministic hash, not a re-mint) ---
const rootToId = {}
for (const c of NEW_CONCEPTS) {
  c.id = mintConceptId('OPH', c.canonicalKey)
  rootToId[c.root] = c.id
}
// Only the roots this cluster's 69 authored questions actually reference
// (eyelidMalposition and hordeolumExternum were mapped to Q48/Q49, both
// held as 2-option True/False items — see the extraction JSON's `held` list).
const REUSED_ROOTS = [
  'ptosisMechanisms', 'lagophthalmos', 'nasolacrimalDuct',
  'thyroidEyeDisease', 'proptosisDifferential', 'blepharitisTypes',
  'dacryocystitisMgmt',
]
for (const root of REUSED_ROOTS) {
  const c = LANE1_CONCEPTS.find((x) => x.root === root)
  if (!c) throw new Error(`lane-1 root not found: ${root}`)
  rootToId[root] = mintConceptId('OPH', c.canonicalKey)
}

// --- claims (new concepts only; reused concepts already have claims from lane-1) ---
for (const c of NEW_CONCEPTS) {
  const slug = c.root.replace(/([a-z])([A-Z])/g, '$1-$2').toUpperCase().replace(/[^A-Z0-9]+/g, '-').slice(0, 24)
  c.claimId = `CLM-OPH-${slug}-02`
}
const REUSED_CLAIM_ID = {}
for (const root of REUSED_ROOTS) {
  const c = LANE1_CONCEPTS.find((x) => x.root === root)
  const slug = c.root.replace(/([a-z])([A-Z])/g, '$1-$2').toUpperCase().replace(/[^A-Z0-9]+/g, '-').slice(0, 24)
  REUSED_CLAIM_ID[root] = `CLM-OPH-${slug}-01`
}

const ARTICLE_ID = 'ART-HU-ORL305-OPH-PROTECTIVE-2'

const conceptMd = NEW_CONCEPTS.map((c) => renderConcept({
  id: c.id,
  label: c.label,
  canonicalKey: c.canonicalKey,
  aliases: c.aliases,
  definition: c.definition,
  objective: c.objective,
  pitfalls: c.pitfalls,
  conceptType: 'clinical_feature',
  subject: 'mul',
  primaryNodeId: c.primaryNodeId,
  topic: c.topic,
  subtopic: c.subtopic,
  modules: ['HU-ORL-305'],
  articleIds: [ARTICLE_ID],
  relatedConceptIds: [],
  learnerYears: '3',
  universities: ['hu'],
  blueprintWeight: 0.4,
  examWeightByYear: ['HU_Y3=0.4'],
  clinicalRelevance: 0.55,
  academicRelevance: 0.7,
  weightConfidence: 0.3,
  confidence: 0.8,
  claimIds: [c.claimId],
  originalWording: [],
  extraNotes: c.extraNotes || [],
})).join('\n---\n\n')

mkdirSync('docs/Helwan-Source-Imports/concept', { recursive: true })
writeFileSync(
  'docs/Helwan-Source-Imports/concept/HU-ORL-305-ophthalmology-concepts-2.md',
  `<!--\n  HU-ORL-305 Ophthalmology lane-2 cluster: Chapter 3 items #21-96 (76 bank\n  items; 69 keyed/authored, 7 held: Q32, Q36, Q47, Q50, Q53 unjoined-no-key,\n  Q48/Q49 2-option True/False format — see coverage/HU-ORL-305-triage.md and\n  HU-ORL-305-LEDGER.md)\n  (scripts/helwan/extract/HU-ORL-305/mcq-bank-ophthalmology-ch3b.json). ${NEW_CONCEPTS.length}\n  new concepts, minted OPH-system (CON-OPH-* is the established ophthalmology\n  reuse family). No oph/ent subject id exists in the curriculum catalogue\n  (LANE-CARD-Y2-3.md §5) — every concept below carries subject 'mul' by the\n  pre-ruled elimination. Search performed via find-existing.mjs before every\n  mint; no genuine near-duplicate was found this pass (ophthalmology remains\n  close to a green field — see HU-ORL-305-ophthalmology-data-2.mjs's header\n  note for the full search-result summary). Seven of this cluster's 69\n  questions reuse lane-1's already-minted concepts unchanged (see\n  concept/HU-ORL-305-ophthalmology-concepts.md) — not re-minted, not\n  re-emitted here.\n-->\n\n${conceptMd}\n`,
)

const claimsMd = NEW_CONCEPTS.map((c) => renderClaim({
  id: c.claimId,
  conceptId: c.id,
  subject: c.claim.subject,
  predicate: c.claim.predicate,
  object: c.claim.object,
  displayText: `${c.claim.subject} ${c.claim.predicate}${c.claim.object ? ' ' + c.claim.object : ''}.`,
  riskClass: 'foundational_stable',
  confidence: 0.75,
})).join('\n---\n\n')

mkdirSync('docs/Helwan-Source-Imports/evidence', { recursive: true })
writeFileSync(
  'docs/Helwan-Source-Imports/evidence/HU-ORL-305-ophthalmology-claims-2.md',
  `<!--\n  Claims only, no citations: Helwan ORL-305 Ophthalmology-cluster sources are\n  not yet registered in docs/medical-library-program/evidence/corpus-source-index.json\n  (ruling 2026-08-22 #2, not yet executed for Year 3) — a citation naming a\n  self-derived src_ id here would trip "is not a source the corpus contains".\n  Each claim lands needs_evidence, which is the honest state; the underlying\n  fact is cited in source_citation on the covering question per 12-resources.md's\n  fallback option 3.\n-->\n\n${claimsMd}`,
)

// --- article (one new article covering the lane-2 cluster's topics) ---
const sections = [
  '### Definition',
  'This article continues HU-ORL-305 Ophthalmology\'s "protective system" chapter (eyelids, lacrimal apparatus and orbit) from item #21 of 96, covering lid-gland disease (chalazion, hordeolum), ptosis surgery, trichiasis, ectropion, dry eye, the lacrimal secretory and drainage systems, dacryocystitis, thyroid eye disease and proptosis, and vitamin A deficiency\'s ocular features.',
  '',
  '### Mechanism',
  '### Lid-gland and lash disorders',
  'A chalazion is a chronic, sterile meibomian-gland lipogranuloma, away from the lid margin, painless and non-staphylococcal, distinct from a stye (hordeolum externum, an acute infective Zeis-gland abscess pointing at the margin) and from hordeolum internum (a suppurative meibomian-gland infection treated with fomentation, antibiotics and evacuation, never lash epilation). Trichiasis follows ulcerative blepharitis or trachomatous cicatricial entropion, and established trachomatous trichiasis needs a mucous-membrane graft, not antibiotic drops alone. Diabetes, lack of sleep and asthenopia predispose to acute hordeolum; hypertension does not.',
  '',
  '### Ptosis surgery and cicatricial ectropion',
  'Ptosis surgery is chosen by levator function: resection when function is present, a frontalis sling when it is absent, as in severe congenital ptosis, which itself shows an absent lid crease, chin elevation and forehead corrugation and is graded by the margin-reflex distance. Severe unilateral congenital ptosis risks amblyopia and needs earlier attention despite ptosis timing generally following severity, not a blanket "as early as possible" rule. Cicatricial ectropion, from skin shortening after a burn or scar, is treated by skin grafting, not the horizontal lid-shortening used for involutional ectropion\'s laxity.',
  '',
  '### Tear film, dry eye and the lacrimal system',
  'Goblet cells secrete the tear film\'s mucin layer, essential for the aqueous layer to wet the cornea; its loss, from vitamin A deficiency or trachomatous cicatrization, destabilises the film. Dry eye follows collagen-vascular disease (Sjögren\'s), accessory-gland atrophy, vitamin A deficiency or cicatricial mucin loss, diagnosed by Schirmer\'s test, staining or tear break-up time, never the Hirschberg test (a strabismus test) — punctal obstruction causes epiphora, not dryness. The lacrimal secretory system (gland, accessory glands, goblet cells) and drainage system (puncti, canaliculi, sac, duct) are anatomically distinct; a positive regurge test localises an obstruction to the nasolacrimal duct.',
  '',
  '### Dacryocystitis, proptosis and thyroid eye disease',
  'Chronic dacryocystitis presents with epiphora, medial canthal swelling, mucoid discharge and a positive regurge test, and can complicate into recurrent infection or post-cataract endophthalmitis; acute dacryocystitis is treated with antibiotics first, DCR once inflammation settles. Thyroid eye disease, the commonest cause of adult proptosis (uni- or bilateral), can occur in any thyroid functional state and causes lid retraction and diplopia, never ptosis or ectropion; new colour-vision loss signals urgent compressive optic neuropathy. Cavernous haemangioma is the commonest benign orbital tumour causing proptosis in adults; a chalazion never does.',
  '',
  '### Key determinants',
  'Separate an exception ("except") stem\'s true statements from its one false one before selecting an answer, and keep paired opposite or similar-sounding facts (stye vs chalazion, ectropion vs entropion, hordeolum externum vs internum, lacrimal secretory vs drainage structures) distinct by mechanism.',
  '',
  '### Clinical significance',
  'Eyelid, lacrimal and orbital disease are common everyday ophthalmic presentations; recognising thyroid eye disease\'s optic-neuropathy red flag and chronic dacryocystitis\'s surgical-timing principle in particular guides urgent and elective treatment decisions. Every linked record remains Draft pending independent review.',
  '',
  '### Exam approach',
  'For an \'except\' stem, first identify which options share a true claim, then select the one that breaks the pattern. The printed bank key stands as printed throughout this cluster.',
].join('\n')

const articleMd = renderArticle({
  id: ARTICLE_ID,
  title: 'ORL 305 Ophthalmology: the eyelids, lacrimal system and orbit (continued)',
  arabicTitle: 'طب العيون: الجفون والجهاز الدمعي والمحجر (تابع)',
  subject: 'mul',
  topic: 'Ophthalmology',
  subtopic: 'Eyelid, lacrimal system and orbit',
  primaryNodeId: 'DIS-OPH-T02',
  templateId: 'TPL-CONCEPT',
  archetype: 'concept',
  readingTime: 18,
  highYield: 'High',
  summary: 'A survey of eyelid-gland disease (chalazion, hordeolum), ptosis surgery, trichiasis, cicatricial ectropion, dry eye, the lacrimal secretory/drainage systems, dacryocystitis, thyroid eye disease/proptosis and vitamin A deficiency, tested by items #21-96 of HU-ORL-305\'s Ophthalmology question bank Chapter 3 ("The protective system of the eye").',
  sections,
  relatedConcepts: NEW_CONCEPTS.map((c) => c.id),
  moduleSubject: ['HU-ORL-305 > Ophthalmology > The protective system of the eye'],
  fieldNotes: [
    ['taxonomyPlacement', 'No DIS-OPH taxonomy leaf exists for eyelid/lacrimal/orbital-adnexa content; DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node — see per-concept field_notes.'],
    ['relationships', 'Covers every new concept minted in this chapter-3 lane-2 cluster, and continues (but does not duplicate) lane-1\'s ART-HU-ORL305-OPH-PROTECTIVE article covering items #1-20 of the same chapter.'],
  ],
  claimIds: NEW_CONCEPTS.map((c) => c.claimId),
})

mkdirSync('docs/Helwan-Source-Imports/article', { recursive: true })
writeFileSync('docs/Helwan-Source-Imports/article/HU-ORL-305-ophthalmology-articles-2.md', articleMd)

// Lane-1's own article assignment for the reused roots (verified against the
// committed concept/HU-ORL-305-ophthalmology-concepts.md's own article_ids
// column) — a question whose main_concept is a reused lane-1 id must also
// carry that concept's lane-1 article in library_ids, or validate-content-batch
// rejects it as "not covered by any article in library_ids".
const LANE1_ARTICLE_FOR_ROOT = {
  nasolacrimalDuct: 'ART-HU-ORL305-OPH-ANAT-EXAM',
  ptosisMechanisms: 'ART-HU-ORL305-OPH-PROTECTIVE',
  lagophthalmos: 'ART-HU-ORL305-OPH-PROTECTIVE',
  thyroidEyeDisease: 'ART-HU-ORL305-OPH-PROTECTIVE',
  proptosisDifferential: 'ART-HU-ORL305-OPH-PROTECTIVE',
  blepharitisTypes: 'ART-HU-ORL305-OPH-PROTECTIVE',
  dacryocystitisMgmt: 'ART-HU-ORL305-OPH-PROTECTIVE',
}

// --- MCQ seed (single cluster: Chapter 3 items #21-96) ---
const questions = bank.items.map((it) => {
  const q = QUESTIONS_CH3B[it.num]
  if (!q) throw new Error(`no explanations authored for Ch3 item #${it.num}`)
  const conceptId = rootToId[q.root]
  if (!conceptId) throw new Error(`no concept id for root ${q.root} (Ch3 item #${it.num})`)
  const explanations = {}
  for (const [letter, text] of Object.entries(q.explanations)) explanations[letter.toUpperCase()] = text
  const options = {}
  for (const [letter, text] of Object.entries(it.options)) options[letter.toUpperCase()] = text
  const fieldNotes = { keySource: "printed key table, native text, not OCR'd (neither source PDF needed OCR)" }
  if (q.authorNotes) fieldNotes.doubt = q.authorNotes
  const lane1Article = LANE1_ARTICLE_FOR_ROOT[q.root]
  const libraryIds = lane1Article ? [ARTICLE_ID, lane1Article] : [ARTICLE_ID]
  return {
    key: `ophth-ch3b-q${String(it.num).padStart(2, '0')}`,
    id: `QST-HUORL305-CH3B-Q${String(it.num).padStart(2, '0')}`,
    page: it.page,
    title: it.stem,
    question: it.stem,
    options,
    correct: it.recovered_key.toUpperCase(),
    explanations,
    main_concept: conceptId,
    topic: q.topic,
    subtopic: q.subtopic,
    difficulty: q.difficulty || 'Moderate',
    question_type: 'Applied Knowledge',
    library_ids: libraryIds,
    source_citation: `HU-ORL-305 Ophthalmology MCQ bank, "The protective system of the eye" chapter, item #${it.num}, p.${it.page}; answer key read from the bank's own dedicated printed answer key (native text, no OCR needed for either PDF).`,
    field_notes: fieldNotes,
  }
})

const seed = {
  lane: 'HU-ORL-305',
  cluster: 'ophth-ch3b',
  header: 'HU-ORL-305 · Ophthalmology — Chapter 3: The protective system of the eye, items #21-96 (lane-2 cluster, continuing lane-1\'s items #1-20), authored from the department Ophthalmology MCQ bank (Dr Ahmed Kamal), keys read from the bank\'s own dedicated printed answer key. 7 items held: Q32, Q36, Q47, Q50, Q53 unjoined-no-key (see coverage/HU-ORL-305-triage.md), Q48/Q49 2-option True/False format (below the 3-option build-time-4th-option precedent).',
  defaults: {
    subject: 'mul',
    status: 'Draft',
    owner: 'Helwan Year-3 authoring lane',
    universities: ['hu'],
    years: ['HU_Y3'],
    module: 'HU-ORL-305',
    module_subject: 'HU-ORL-305 > Ophthalmology > The protective system of the eye',
    exam_weight_by_year: { HU_Y3: 0.4 },
    question_only_for: '',
    library_ids: [ARTICLE_ID],
    resource_ids: [],
    setting: 'Both',
    estimated_seconds: 75,
    randomise_answers: true,
    cognitive_effort: 'Medium',
    reasoning_level: 2,
    learning_objective: "Apply the correct ophthalmology fact to select the accepted (or, in an 'except' stem, the excepted) statement.",
  },
  questions,
}

mkdirSync('coverage/seeds/HU-ORL-305', { recursive: true })
writeFileSync('coverage/seeds/HU-ORL-305/ch3b.json', JSON.stringify(seed, null, 2))

console.log(`concepts: ${NEW_CONCEPTS.length} new (CON-OPH-*) + ${REUSED_ROOTS.length} reused lane-1 concepts (unchanged)`)
console.log(`questions: ch3b=${questions.length} (of 76 bank items; 7 held: Q32, Q36, Q47, Q48, Q49, Q50, Q53)`)
