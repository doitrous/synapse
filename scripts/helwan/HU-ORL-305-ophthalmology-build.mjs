// Builds HU-ORL-305 Ophthalmology lane-1 cluster output:
//   docs/Helwan-Source-Imports/concept/HU-ORL-305-ophthalmology-concepts.md
//   docs/Helwan-Source-Imports/evidence/HU-ORL-305-ophthalmology-claims.md
//   docs/Helwan-Source-Imports/article/HU-ORL-305-ophthalmology-articles.md
//   docs/Helwan-Source-Imports/pending-live/HU-ORL-305-questions.md   (cornea-transparency overlay)
//   coverage/seeds/HU-ORL-305/{ch1,ch2,ch3}.json                     (MCQ seeds for emit-mcq.mjs)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { mintConceptId, renderConcept, renderConceptUpdate, renderClaim, renderArticle } from './HU-ORL-305-render.mjs'
import { CONCEPTS, OVERLAY } from './HU-ORL-305-ophthalmology-data.mjs'
import { QUESTIONS_CH1, QUESTIONS_CH2, QUESTIONS_CH3 } from './HU-ORL-305-ophthalmology-questions.mjs'

const bank = JSON.parse(readFileSync('scripts/helwan/extract/HU-ORL-305/mcq-bank-ophthalmology.json', 'utf8'))
const ch1Items = bank.items.filter((it) => it.chapter === 'Brief anatomy of the eye and its adnexa')
const ch2Items = bank.items.filter((it) => it.chapter === 'Clinical examination of the eye')
const ch3Items = bank.items.filter((it) => it.chapter === 'The protective system of the eye')

// --- mint ids ---
const rootToId = {}
for (const c of CONCEPTS) {
  c.id = mintConceptId('OPH', c.canonicalKey)
  rootToId[c.root] = c.id
}
rootToId.corneaTransparency = OVERLAY.cornea_transparency.id

// --- claims ---
for (const c of CONCEPTS) {
  const slug = c.root.replace(/([a-z])([A-Z])/g, '$1-$2').toUpperCase().replace(/[^A-Z0-9]+/g, '-').slice(0, 24)
  c.claimId = `CLM-OPH-${slug}-01`
}

const ARTICLE_ANAT_EXAM = 'ART-HU-ORL305-OPH-ANAT-EXAM'
const ARTICLE_PROTECTIVE = 'ART-HU-ORL305-OPH-PROTECTIVE'

const ch1ch2Roots = new Set(CONCEPTS.filter((c) => c.subtopic !== 'Eyelid, lacrimal system and orbit').map((c) => c.root))
for (const c of CONCEPTS) {
  c.articleId = ch1ch2Roots.has(c.root) ? ARTICLE_ANAT_EXAM : ARTICLE_PROTECTIVE
}

const conceptMd = CONCEPTS.map((c) => renderConcept({
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
  articleIds: [c.articleId],
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

writeFileSync(
  'docs/Helwan-Source-Imports/concept/HU-ORL-305-ophthalmology-concepts.md',
  `<!--\n  HU-ORL-305 Ophthalmology lane-1 cluster: Chapter 1 (Brief anatomy of the\n  eye and its adnexa, 26 MCQs), Chapter 2 (Clinical examination of the eye,\n  13 MCQs) and Chapter 3 items #1-20 of 96 (The protective system of the eye,\n  20 MCQs) — 59 questions total\n  (scripts/helwan/extract/HU-ORL-305/mcq-bank-ophthalmology.json). 35 new\n  concepts, minted OPH-system (CON-OPH-* is the reuse family for future\n  ophthalmology concepts across universities, per\n  coverage/HU-ORL-305-triage.md). No oph/ent subject id exists in the\n  curriculum catalogue (LANE-CARD-Y2-3.md §5) — every concept below carries\n  subject 'mul' by the pre-ruled elimination. Search performed via\n  find-existing.mjs before every mint; the one real near-duplicate found\n  (CON-NEU-3FF95D30CD5825, pending, corneal transparency factors) is handled\n  as a pending-live overlay, not re-minted — see\n  pending-live/HU-ORL-305-questions.md.\n-->\n\n${conceptMd}\n`,
)

const claimsMd = CONCEPTS.map((c) => renderClaim({
  id: c.claimId,
  conceptId: c.id,
  subject: c.claim.subject,
  predicate: c.claim.predicate,
  object: c.claim.object,
  displayText: `${c.claim.subject} ${c.claim.predicate}${c.claim.object ? ' ' + c.claim.object : ''}.`,
  riskClass: 'foundational_stable',
  confidence: 0.75,
})).join('\n---\n\n')

writeFileSync(
  'docs/Helwan-Source-Imports/evidence/HU-ORL-305-ophthalmology-claims.md',
  `<!--\n  Claims only, no citations: Helwan ORL-305 Ophthalmology-cluster sources are\n  not yet registered in docs/medical-library-program/evidence/corpus-source-index.json\n  (ruling 2026-08-22 #2, not yet executed for Year 3) — a citation naming a\n  self-derived src_ id here would trip "is not a source the corpus contains".\n  Each claim lands needs_evidence, which is the honest state; the underlying\n  fact is cited in source_citation on the covering question per 12-resources.md's\n  fallback option 3.\n-->\n\n${claimsMd}`,
)

// --- articles ---
function conceptsFor(articleId) {
  return CONCEPTS.filter((c) => c.articleId === articleId)
}

const anatExamConcepts = conceptsFor(ARTICLE_ANAT_EXAM)
const anatExamSections = [
  '### Definition',
  'HU-ORL-305 Ophthalmology opens with the eye\'s basic anatomy — the chambers and their aqueous humour, the outer, middle and inner coats, the cornea, lens, conjunctiva and orbit — and the clinical examination techniques (slit lamp, gonioscopy, ophthalmoscopy, retinoscopy, visual acuity, perimetry, ultrasound) used to assess them.',
  '',
  '### Mechanism',
  '### Aqueous humour and the chambers',
  'The ciliary body secretes aqueous humour into the posterior chamber; it flows through the pupil into the anterior chamber and drains at the angle through the trabecular meshwork. The angle itself is defined by the trabecular meshwork, Schwalbe\'s line and the scleral spur. The posterior chamber lies between the iris and the crystalline lens.',
  '',
  '### The three coats and the cornea',
  'The eye has three coats: an outer fibrous coat (cornea and sclera, protective and, via the cornea, refractive), a middle vascular uveal coat (iris, ciliary body, choroid) and an inner neurosensory coat (the retina). The cornea is a five-layered, non-keratinised, avascular structure whose transparency depends on regular stromal collagen spacing, an active endothelial ion pump, and unmyelinated nerve fibres; it measures about 12mm horizontally and 11mm vertically and contributes the eye\'s larger share of refractive power, with the lens (suspended by the zonule of Zinn) contributing roughly 20 dioptres more.',
  '',
  '### Conjunctiva, orbit and adnexal structures',
  'The conjunctiva has palpebral, bulbar and fornical parts, distinct from the tarsus. The bony orbit borders the frontal, ethmoid and maxillary sinuses on three of its four walls (not the sphenoid sinus, which relates to the apex), and the superior orbital fissure carries the ophthalmic division of the trigeminal nerve alongside cranial nerves III, IV and VI, distinct from the optic canal\'s own contents.',
  '',
  '### Clinical examination',
  'A routine examination covers visual acuity, pupillary reflexes, slit-lamp anterior-segment assessment and ophthalmoscopy; OCT and automated perimetry are selective add-ons. The slit lamp needs an accessory lens for the fundus and a gonioscopy lens for the angle. Retinoscopy objectively measures refractive error, not fundus anatomy. Confrontation testing screens for a hemianopia but not small localised defects; the Hirschberg test estimates strabismus from corneal-reflex decentration (~15D/mm); B-scan ultrasound assesses the posterior segment, including tumours, when media opacity blocks the view; and characteristic red-reflex colours (white, black, yellow, grey) point to cataract, vitreous haemorrhage, endophthalmitis and retinal detachment respectively.',
  '',
  '### Key determinants',
  'Separate an exception ("except") stem\'s true statements from its one false one before selecting an answer, and keep each instrument\'s primary purpose distinct from a superficially similar one (slit lamp vs gonioscopy vs ophthalmoscopy vs retinoscopy).',
  '',
  '### Clinical significance',
  'This anatomy and examination foundation underlies every later chapter of the bank — glaucoma, the red eye, retinal disease and orbital trauma all build on the chamber, coat, corneal and examination facts covered here. Every linked record remains Draft pending independent review.',
  '',
  '### Exam approach',
  'For an \'except\' stem, first identify which options share a true claim, then select the one that breaks the pattern. The printed bank key stands as printed throughout this cluster, with one flagged doubt (posterior chamber boundaries, Ch1 Q14) noted in that question\'s author_notes rather than overridden.',
].join('\n')

const anatExamArticleMd = renderArticle({
  id: ARTICLE_ANAT_EXAM,
  title: 'ORL 305 Ophthalmology: basic ocular anatomy and clinical examination',
  arabicTitle: 'طب العيون: تشريح العين الأساسي والفحص الإكلينيكي',
  subject: 'mul',
  topic: 'Ophthalmology',
  subtopic: 'Ocular anatomy and physiology / Clinical ophthalmic examination',
  primaryNodeId: 'DIS-OPH-T02',
  secondaryNodeIds: ['DIS-OPH-T01'],
  templateId: 'TPL-CONCEPT',
  archetype: 'concept',
  readingTime: 16,
  highYield: 'High',
  summary: 'A survey of the ocular anatomy (chambers, coats, cornea, lens, conjunctiva, orbit) and clinical examination techniques (slit lamp, gonioscopy, ophthalmoscopy, retinoscopy, perimetry, ultrasound) tested by HU-ORL-305\'s Ophthalmology question bank, Chapters 1-2.',
  sections: anatExamSections,
  relatedConcepts: anatExamConcepts.map((c) => c.id),
  moduleSubject: [
    'HU-ORL-305 > Ophthalmology > Brief anatomy of the eye and its adnexa',
    'HU-ORL-305 > Ophthalmology > Clinical examination of the eye',
  ],
  claimIds: anatExamConcepts.map((c) => c.claimId),
})

const protectiveConcepts = conceptsFor(ARTICLE_PROTECTIVE)
const protectiveSections = [
  '### Definition',
  'HU-ORL-305 Ophthalmology\'s "protective system" chapter covers the eyelids, lacrimal apparatus and orbit — the structures that shield and drain the eye — from the first 20 of the chapter\'s 96 question-bank items.',
  '',
  '### Mechanism',
  '### Eyelid position and closure',
  'Ectropion (outward lid-margin rolling) and entropion (inward rolling) are opposite malpositions with opposite consequences: exposure/epiphora versus lash-corneal contact. Lagophthalmos is incomplete lid closure, most often from facial (7th) nerve palsy, risking corneal exposure and, if untreated, ulceration. Ptosis is upper-lid drooping from levator palpebrae superioris weakness — third-nerve palsy, myasthenia gravis, congenital levator dystrophy or trauma — or, more mildly, from loss of sympathetic tone to Müller\'s muscle in Horner\'s syndrome; hypertension is not a recognised cause.',
  '',
  '### Lid-margin and gland disease',
  'Blepharitis has a squamous (seborrhoeic, scaly, non-ulcerated) and an ulcerative (staphylococcal, crusted, truly ulcerated) pattern; neither is fungal. Hordeolum externum (a stye) is acute inflammation of a lash follicle\'s Zeis gland, distinct from the deeper meibomian-gland hordeolum internum. Dry eye has aqueous-deficient, mucin-deficient and eyelid-disease-related forms; lid oedema is not one of them.',
  '',
  '### Lacrimal and orbital disease',
  'Chronic dacryocystitis is treated definitively by elective dacryocystorhinostomy, but an acute painful exacerbation is managed with systemic antibiotics first. Thyroid eye disease is the commonest cause of bilateral proptosis, presenting with lid retraction, lid lag, proptosis and exposure keratopathy — not ptosis or uveitis. Proptosis more broadly follows orbital cellulitis, cavernous sinus thrombosis or thyroid eye disease; acute angle-closure glaucoma raises intraocular, not orbital, pressure and does not cause it.',
  '',
  '### Key determinants',
  'Keep paired opposite conditions (ectropion/entropion, squamous/ulcerative blepharitis) and paired similar-severity conditions (Horner\'s ptosis via Müller\'s muscle vs third-nerve ptosis via the levator) distinct by mechanism, not just by name.',
  '',
  '### Clinical significance',
  'Eyelid and lacrimal disease are common everyday ophthalmic and general-practice presentations; recognising thyroid eye disease and lagophthalmos\'s exposure risk in particular guides urgent protective treatment. Every linked record remains Draft pending independent review.',
  '',
  '### Exam approach',
  'For an \'except\' stem, first identify which options share a true claim, then select the one that breaks the pattern. The printed bank key stands as printed throughout this cluster.',
].join('\n')

const protectiveArticleMd = renderArticle({
  id: ARTICLE_PROTECTIVE,
  title: 'ORL 305 Ophthalmology: the eyelids, lacrimal system and orbit',
  arabicTitle: 'طب العيون: الجفون والجهاز الدمعي والمحجر',
  subject: 'mul',
  topic: 'Ophthalmology',
  subtopic: 'Eyelid, lacrimal system and orbit',
  primaryNodeId: 'DIS-OPH-T02',
  templateId: 'TPL-CONCEPT',
  archetype: 'concept',
  readingTime: 14,
  highYield: 'High',
  summary: 'A survey of the eyelid, lacrimal-system and orbital disease tested by the first 20 items of HU-ORL-305\'s Ophthalmology question bank Chapter 3 ("The protective system of the eye"): lid malposition, ptosis, blepharitis, dry eye, dacryocystitis, thyroid eye disease and the differential diagnosis of proptosis.',
  sections: protectiveSections,
  relatedConcepts: protectiveConcepts.map((c) => c.id),
  moduleSubject: ['HU-ORL-305 > Ophthalmology > The protective system of the eye'],
  fieldNotes: [
    ['taxonomyPlacement', 'No DIS-OPH taxonomy leaf exists for eyelid/lacrimal/orbital-adnexa content; DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node — see per-concept field_notes.'],
    ['relationships', 'Covers every concept minted in this chapter-3 sub-cluster; cross-article links to the Ch1-2 article and to ENT (lane 2, not yet authored) deferred — see WANTED.'],
  ],
  claimIds: protectiveConcepts.map((c) => c.claimId),
})

mkdirSync('docs/Helwan-Source-Imports/article', { recursive: true })
writeFileSync('docs/Helwan-Source-Imports/article/HU-ORL-305-ophthalmology-articles.md', `${anatExamArticleMd}\n---\n\n${protectiveArticleMd}`)

// --- pending-live overlay (corneal transparency, id not yet live) ---
const overlayMd = renderConceptUpdate({
  id: OVERLAY.cornea_transparency.id,
  label: OVERLAY.cornea_transparency.label,
  universities: ['+hu'],
  learnerYears: '+3',
  modules: ['+HU-ORL-305'],
  moduleSubject: OVERLAY.cornea_transparency.moduleSubject,
  examWeightByYear: ['HU_Y3=0.4'],
  fieldNotes: OVERLAY.cornea_transparency.fieldNotes,
})
mkdirSync('docs/Helwan-Source-Imports/pending-live', { recursive: true })
writeFileSync(
  'docs/Helwan-Source-Imports/pending-live/HU-ORL-305-questions.md',
  `<!--\n  INDEX: apply this file's rows only after their named dependency is live.\n\n  CON-NEU-3FF95D30CD5825 (corneal transparency factors) — dependency:\n  docs/Alexandria-Source-Imports/concept/AU-MED-203-histology-concepts.md.\n  That concept is authored but not yet imported; this sparse update (+hu,\n  +HU_Y3, +HU-ORL-305) must be applied after the AU-MED-203 batch lands\n  live, never before, or the importer creates a near-empty stub under this\n  id per 00-START-HERE §2's stub-create guard.\n-->\n\n${overlayMd}`,
)

// --- MCQ seeds (one per chapter) ---
function buildSeed(chapterLabel, cluster, items, QUESTIONS, moduleSubjectSuffix) {
  const questions = items.map((it) => {
    const q = QUESTIONS[it.num]
    if (!q) throw new Error(`no explanations authored for ${chapterLabel} item #${it.num}`)
    const conceptId = rootToId[q.root]
    if (!conceptId) throw new Error(`no concept id for root ${q.root} (${chapterLabel} item #${it.num})`)
    const explanations = {}
    for (const [letter, text] of Object.entries(q.explanations)) explanations[letter.toUpperCase()] = text
    const options = {}
    for (const [letter, text] of Object.entries(it.options)) options[letter.toUpperCase()] = text
    const fieldNotes = { keySource: "printed key table, native text, not OCR'd (neither source PDF needed OCR)" }
    if (q.authorNotes) fieldNotes.doubt = q.authorNotes
    return {
      key: `${cluster}-q${String(it.num).padStart(2, '0')}`,
      id: `QST-HUORL305-${cluster.toUpperCase()}-Q${String(it.num).padStart(2, '0')}`,
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
      source_citation: `HU-ORL-305 Ophthalmology MCQ bank, "${it.chapter}" chapter, item #${it.num}, p.${it.page}; answer key read from the bank's own dedicated printed answer key (native text, no OCR needed for either PDF).`,
      field_notes: fieldNotes,
    }
  })

  return {
    lane: 'HU-ORL-305',
    cluster,
    header: `HU-ORL-305 · Ophthalmology — ${chapterLabel}, authored from the department Ophthalmology MCQ bank (Dr Ahmed Kamal), keys read from the bank's own dedicated printed answer key.`,
    defaults: {
      subject: 'mul',
      status: 'Draft',
      owner: 'Helwan Year-3 authoring lane',
      universities: ['hu'],
      years: ['HU_Y3'],
      module: 'HU-ORL-305',
      module_subject: `HU-ORL-305 > Ophthalmology > ${moduleSubjectSuffix}`,
      exam_weight_by_year: { HU_Y3: 0.4 },
      question_only_for: '',
      library_ids: [ch1ch2Roots.has(QUESTIONS[items[0].num].root) ? ARTICLE_ANAT_EXAM : ARTICLE_PROTECTIVE],
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
}

mkdirSync('coverage/seeds/HU-ORL-305', { recursive: true })

const seedCh1 = buildSeed('Chapter 1: Brief anatomy of the eye and its adnexa', 'ophth-ch1', ch1Items, QUESTIONS_CH1, 'Brief anatomy of the eye and its adnexa')
const seedCh2 = buildSeed('Chapter 2: Clinical examination of the eye', 'ophth-ch2', ch2Items, QUESTIONS_CH2, 'Clinical examination of the eye')
const seedCh3 = buildSeed('Chapter 3: The protective system of the eye (items #1-20 of 96)', 'ophth-ch3', ch3Items, QUESTIONS_CH3, 'The protective system of the eye')

writeFileSync('coverage/seeds/HU-ORL-305/ch1.json', JSON.stringify(seedCh1, null, 2))
writeFileSync('coverage/seeds/HU-ORL-305/ch2.json', JSON.stringify(seedCh2, null, 2))
writeFileSync('coverage/seeds/HU-ORL-305/ch3.json', JSON.stringify(seedCh3, null, 2))

console.log(`concepts: ${CONCEPTS.length} new (CON-OPH-*) + 1 pending-live overlay (CON-NEU-3FF95D30CD5825)`)
console.log(`questions: ch1=${seedCh1.questions.length} ch2=${seedCh2.questions.length} ch3=${seedCh3.questions.length} total=${seedCh1.questions.length + seedCh2.questions.length + seedCh3.questions.length}`)
