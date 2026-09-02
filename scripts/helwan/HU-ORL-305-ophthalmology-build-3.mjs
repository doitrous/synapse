// Builds HU-ORL-305 Ophthalmology lane-3 cluster output (Chapter 4, "Normal
// and abnormal image capture", all 91 items, 0 held):
//   docs/Helwan-Source-Imports/concept/HU-ORL-305-ophthalmology-concepts-3.md
//   docs/Helwan-Source-Imports/evidence/HU-ORL-305-ophthalmology-claims-3.md
//   docs/Helwan-Source-Imports/article/HU-ORL-305-ophthalmology-articles-3.md
//   coverage/seeds/HU-ORL-305/ch4.json               (MCQ seed for emit-mcq.mjs)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { mintConceptId, renderConcept, renderClaim, renderArticle } from './HU-ORL-305-render.mjs'
import { CONCEPTS } from './HU-ORL-305-ophthalmology-data-3.mjs'
import { QUESTIONS_CH4 } from './HU-ORL-305-ophthalmology-questions-3.mjs'

const bank = JSON.parse(readFileSync('scripts/helwan/extract/HU-ORL-305/mcq-bank-ophthalmology-ch4.json', 'utf8'))

// --- mint ids ---
const rootToId = {}
for (const c of CONCEPTS) {
  c.id = mintConceptId('OPH', c.canonicalKey)
  rootToId[c.root] = c.id
}

// --- claims ---
for (const c of CONCEPTS) {
  const slug = c.root.replace(/([a-z])([A-Z])/g, '$1-$2').toUpperCase().replace(/[^A-Z0-9]+/g, '-').slice(0, 24)
  c.claimId = `CLM-OPH-${slug}-01`
}

// --- two articles: refraction/optics/keratoconus vs cataract/lens/cornea/vitreous ---
const ARTICLE_REFRACTION = 'ART-HU-ORL305-OPH-IMGCAP-REFRACTION'
const ARTICLE_CATARACT_LENS = 'ART-HU-ORL305-OPH-IMGCAP-CATARACT-LENS'

const REFRACTION_ROOTS = new Set([
  'astigmatismClassificationTypes', 'astigmatismDiagnosisAndCorrection', 'basicRefractionAndMyopiaPresentation',
  'myopiaCorrectionPrinciple', 'highMyopiaRetinalComplications', 'keratoconusSignsAndExceptions',
  'keratoconusRefractionAndProgression', 'keratoconusDiagnosisAndManagement', 'hypermetropiaDefinitionAndCorrection',
  'hypermetropiaComplicationsAndAngleClosureRisk', 'accommodationPhysiologyAndLossCauses', 'presbyopiaMechanismAndTreatment',
  'hypermetropicChildSquintAndAsthenopia', 'aphakiaOpticsAndCorrection', 'refractiveErrorCorrectionMethodsExcludingTelescopes',
  'contactLensDisadvantages',
])

for (const c of CONCEPTS) {
  c.articleId = REFRACTION_ROOTS.has(c.root) ? ARTICLE_REFRACTION : ARTICLE_CATARACT_LENS
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

mkdirSync('docs/Helwan-Source-Imports/concept', { recursive: true })
writeFileSync(
  'docs/Helwan-Source-Imports/concept/HU-ORL-305-ophthalmology-concepts-3.md',
  `<!--\n  HU-ORL-305 Ophthalmology lane-3 cluster: Chapter 4 ("Normal and abnormal\n  image capture"), all 91 bank items — fully joined per\n  coverage/HU-ORL-305-triage.md's join table (91 keyed, 0 unjoined).\n  ${CONCEPTS.length} new concepts, minted OPH-system (CON-OPH-* is the\n  established ophthalmology reuse family, continuing lanes 1-2). No oph/ent\n  subject id exists in the curriculum catalogue (LANE-CARD-Y2-3.md §5) —\n  every concept below carries subject 'mul' by the pre-ruled elimination.\n  Search performed via find-existing.mjs (plus a docs/*/concept|pending-live\n  grep) before every mint — see HU-ORL-305-ophthalmology-data-3.mjs's header\n  note for the full search-result summary, including the one real\n  near-duplicate found (CON-NEU-3FF95D30CD5825, Alexandria's pending\n  corneal-transparency concept, already overlaid by lane-1) and why it is\n  NOT reused a second time this pass (reusing it would reproduce a\n  confirmed, live validate-content-batch.mjs \"not covered by any article in\n  library_ids\" error already present in lane-1's committed Ch1 Q8/Q9/Q12 —\n  flagged separately, out of this lane's Chapter-4 scope).\n-->\n\n${conceptMd}\n`,
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

mkdirSync('docs/Helwan-Source-Imports/evidence', { recursive: true })
writeFileSync(
  'docs/Helwan-Source-Imports/evidence/HU-ORL-305-ophthalmology-claims-3.md',
  `<!--\n  Claims only, no citations: Helwan ORL-305 Ophthalmology-cluster sources are\n  not yet registered in docs/medical-library-program/evidence/corpus-source-index.json\n  (ruling 2026-08-22 #2, not yet executed for Year 3) — a citation naming a\n  self-derived src_ id here would trip "is not a source the corpus contains".\n  Each claim lands needs_evidence, which is the honest state; the underlying\n  fact is cited in source_citation on the covering question per 12-resources.md's\n  fallback option 3.\n-->\n\n${claimsMd}`,
)

// --- articles ---
function conceptsFor(articleId) {
  return CONCEPTS.filter((c) => c.articleId === articleId)
}

const refractionConcepts = conceptsFor(ARTICLE_REFRACTION)
const refractionSections = [
  '### Definition',
  'HU-ORL-305 Ophthalmology\'s Chapter 4, "Normal and abnormal image capture," opens with refraction, accommodation and presbyopia, astigmatism, myopia and hypermetropia (definitions, correction, complications), keratoconus, aphakia and contact lens wear — the optics of how the eye focuses an image and what goes wrong with that focus.',
  '',
  '### Mechanism',
  '### Emmetropia, myopia and hypermetropia',
  'With accommodation relaxed, an emmetropic eye focuses parallel rays on the retina; a myopic eye focuses them in front of it (corrected with a concave/minus lens) and a hypermetropic eye focuses them behind it (corrected with a convex/plus lens, since its refractive system is weaker than the emmetrope\'s). High/pathological myopia predisposes to retinal detachment, macular hole, lacquer cracks, chorioretinal degeneration and choroidal neovascular membrane, but not choroidal folds or optic-disc cupping (glaucoma\'s sign, not myopia\'s). Hypermetropia\'s short axial length instead crowds the anterior segment, predisposing specifically to angle closure glaucoma from its shallow chamber and narrow angle, and to childhood convergent squint (accommodative esotropia) from excess accommodative convergence — not to exotropia, iridocyclitis, choroidal neovascular membrane or posterior staphyloma, the last two of which belong to high myopia instead.',
  '',
  '### Astigmatism',
  'Astigmatism is classified by comparing its two principal meridians: simple (one meridian emmetropic), compound (both ametropic, same direction) or mixed (one hyperopic, one myopic); "regular" astigmatism specifically means the two meridians are perpendicular. It is diagnosed by retinoscopy, keratometry, corneal topography or the astigmatic fan, and corrected with cylindrical lenses (or a sphero-cylindrical lens when a spherical error coexists).',
  '',
  '### Accommodation, presbyopia and aphakia',
  'Accommodation increases refractive power via parasympathetically-driven ciliary-muscle contraction (not relaxation), and its amplitude declines with age; it is lost in third nerve palsy, presbyopia and after cycloplegic drops, but hypermetropia itself does not cause lost accommodation. Presbyopia is this age-related near-point recession, corrected with convex reading lenses, not concave ones. Aphakia (lens absence) leaves the eye markedly hypermetropic with lost accommodation; unilateral aphakia is best corrected with secondary intraocular lens implantation, since spectacle correction causes anisokonia (image-size mismatch between the eyes) that a contact lens reduces but does not eliminate as fully as an IOL.',
  '',
  '### Keratoconus',
  'Keratoconus is progressive, usually bilateral, conical corneal thinning of childhood/young-adult onset (not old age), causing progressively increasing myopia with irregular myopic astigmatism (not hyperopia). Its signs are Vogt striae, Munson sign (on downgaze) and, in advanced disease, acute hydrops from a Descemet\'s membrane break — not the Kayser-Fleischer ring (Wilson\'s disease) or Haab\'s striae (congenital glaucoma). It is diagnosed by the Placido disc, corneal topography, retinoscopy\'s scissoring reflex and slit lamp (not indirect ophthalmoscopy or ultrasonography), and managed with contact lenses, corneal collagen cross-linking, and keratoplasty for advanced disease.',
  '',
  '### Key determinants',
  'Separate an exception ("except") or "all of the above" stem\'s true statements from its one false one (or confirm all are true) before selecting an answer, and keep paired opposite facts (myopia vs hypermetropia\'s focus point and lens sign, concave vs convex correction, simple vs compound vs mixed astigmatism) distinct by mechanism.',
  '',
  '### Clinical significance',
  'Refractive error, presbyopia and keratoconus are among the commonest reasons patients seek ophthalmic care at any age; recognising hypermetropia\'s angle closure glaucoma risk and keratoconus\'s progressive, young-onset course in particular guides timely referral and treatment. Every linked record remains Draft pending independent review.',
  '',
  '### Exam approach',
  "For an 'except' stem, first identify which options share a true claim, then select the one that breaks the pattern; for an 'all of the above' stem, confirm each option is independently true before selecting it. The printed bank key stands as printed throughout this cluster.",
].join('\n')

const refractionArticleMd = renderArticle({
  id: ARTICLE_REFRACTION,
  title: 'ORL 305 Ophthalmology: refraction, accommodation and keratoconus',
  arabicTitle: 'طب العيون: الانكسار والتكيف وقرنية مخروطية',
  subject: 'mul',
  topic: 'Ophthalmology',
  subtopic: 'Refractive errors and optics / Keratoconus',
  primaryNodeId: 'DIS-OPH-T02',
  templateId: 'TPL-CONCEPT',
  archetype: 'concept',
  readingTime: 20,
  highYield: 'High',
  summary: "A survey of refraction (emmetropia, myopia, hypermetropia, astigmatism classification and correction), accommodation and presbyopia, aphakia and contact lens wear, and keratoconus (signs, refraction, diagnosis and management), tested by the refractive-optics half of HU-ORL-305's Ophthalmology question bank Chapter 4 (\"Normal and abnormal image capture\").",
  sections: refractionSections,
  relatedConcepts: refractionConcepts.map((c) => c.id),
  moduleSubject: ['HU-ORL-305 > Ophthalmology > Normal and abnormal image capture'],
  fieldNotes: [
    ['taxonomyPlacement', 'No DIS-OPH taxonomy leaf exists for refraction/optics or keratoconus content specifically; DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node — see per-concept field_notes.'],
    ['relationships', 'Covers every refraction/optics/keratoconus concept minted in this chapter-4 cluster; cross-article links to lanes 1-2\'s Ch1-3 articles and to the sibling cataract/lens/cornea article below deferred — see WANTED in the lane report.'],
  ],
  claimIds: refractionConcepts.map((c) => c.claimId),
})

const cataractLensConcepts = conceptsFor(ARTICLE_CATARACT_LENS)
const cataractLensSections = [
  '### Definition',
  'HU-ORL-305 Ophthalmology\'s Chapter 4 continues with cataract (definition, presentation, early nuclear features, causes, intumescent-cataract glaucoma risk, maturity grading, surgical technique), keratoplasty, lens subluxation and dislocation, vitreous haemorrhage, and further corneal disease (band keratopathy vs arcus senilis, the endothelial pump, trachoma\'s trauma mechanism, diabetic keratopathy, cicatricial pemphigoid and corneal dystrophy).',
  '',
  '### Mechanism',
  '### Cataract: presentation, causes and surgery',
  'Cataract (lens opacity) typically presents as slow, progressive, painless diminution of vision; early senile nuclear cataract additionally causes a myopic "second sight" refractive shift and can cause monocular diplopia from refraction through unevenly opaque lens zones. Old age is by far its commonest cause, alongside chronic iritis/uveitis (complicated cataract), prolonged topical steroid use and blunt trauma — not hypermetropia. An intumescent (swollen) cataract\'s glistening capsule and shallow chamber can precipitate secondary (phacomorphic) angle closure glaucoma; immature cataract shows a partial, black-sectored red reflex with residual vision, distinct from mature cataract\'s absent reflex. The current standard surgery is phacoemulsification with a foldable posterior-chamber intraocular lens.',
  '',
  '### Keratoplasty',
  'Keratoplasty type is chosen by opacity depth: lamellar for superficial opacity, penetrating for deep opacity, with deep lamellar and Descemet\'s membrane endothelial keratoplasty as further selective types; intrastromal ring application reshapes a keratoconic cornea without transplanting tissue, so it is not itself a keratoplasty type.',
  '',
  '### Lens subluxation and dislocation, and vitreous haemorrhage',
  'Lens subluxation/dislocation follows trauma, Marfan syndrome or homocystinuria (not Behcet\'s disease, whose ocular association is uveitis). Posterior dislocation deepens (not shallows) the anterior chamber, loses the paired Purkinje-Sanson images, and produces a jet-black pupil and monocular (not binocular) diplopia; subluxation reduces vision through induced myopia/astigmatism and its own complications (glaucoma, uveitis, cataract), while corneal perforation is not a recognised complication of anterior dislocation. Vitreous haemorrhage most commonly follows proliferative diabetic retinopathy neovascularisation, trauma, or posterior vitreous detachment with retinal tear — not uveitis or routine cataract extraction.',
  '',
  '### Further corneal disease',
  'Band keratopathy is calcium-salt deposition; arcus senilis is a lipid-deposit ring — different materials, not to be confused. The corneal endothelium\'s active ion pump maintains corneal dehydration, and its damage (for example after intraocular surgery) causes corneal oedema. Trachoma causes corneal opacity mainly through repeated mechanical trauma from trichiasis/entropion, which in turn disturbs the stroma\'s normally regular collagen spacing. Diabetes predisposes to epithelial/Bowman\'s-membrane vulnerability, delaying healing that limbal stem cells (also vulnerable to chemical injury) normally drive. Ocular cicatricial pemphigoid, like trachoma, can keratinise the cornea through progressive mucin-layer loss — severe dry eye does cause corneal opacity, contrary to a common false claim. Corneal dystrophies are inherited, bilateral, symmetrical opacities whose visual impact depends on the corneal layer involved.',
  '',
  '### Key determinants',
  'Separate an exception ("except") or "all of the above" stem\'s true statements from its one false one (or confirm all are true) before selecting an answer, and keep paired opposite facts (posterior lens dislocation\'s deepened, not shallow, chamber; band keratopathy\'s calcium vs arcus senilis\'s lipid) distinct by mechanism.',
  '',
  '### Clinical significance',
  'Cataract and lens/corneal disease are among the leading causes of treatable visual impairment worldwide; recognising intumescent cataract\'s glaucoma risk and lens dislocation\'s syndromic associations in particular guides urgent and elective treatment decisions. Every linked record remains Draft pending independent review.',
  '',
  '### Exam approach',
  "For an 'except' stem, first identify which options share a true claim, then select the one that breaks the pattern; for an 'all of the above' stem, confirm each option is independently true before selecting it. The printed bank key stands as printed throughout this cluster.",
].join('\n')

const cataractLensArticleMd = renderArticle({
  id: ARTICLE_CATARACT_LENS,
  title: 'ORL 305 Ophthalmology: cataract, lens and corneal disease',
  arabicTitle: 'طب العيون: الساد والعدسة وأمراض القرنية',
  subject: 'mul',
  topic: 'Ophthalmology',
  subtopic: 'Cataract / Lens subluxation and dislocation / Corneal disease and keratoplasty',
  primaryNodeId: 'DIS-OPH-T02',
  templateId: 'TPL-CONCEPT',
  archetype: 'concept',
  readingTime: 22,
  highYield: 'High',
  summary: "A survey of cataract (presentation, causes, intumescent-cataract glaucoma risk, maturity grading, surgical technique), keratoplasty type selection, lens subluxation/dislocation, vitreous haemorrhage, and further corneal disease (band keratopathy vs arcus senilis, endothelial pump function, trachoma, diabetic keratopathy, cicatricial pemphigoid, corneal dystrophy), tested by the cataract/lens/cornea half of HU-ORL-305's Ophthalmology question bank Chapter 4 (\"Normal and abnormal image capture\").",
  sections: cataractLensSections,
  relatedConcepts: cataractLensConcepts.map((c) => c.id),
  moduleSubject: ['HU-ORL-305 > Ophthalmology > Normal and abnormal image capture'],
  fieldNotes: [
    ['taxonomyPlacement', 'No DIS-OPH taxonomy leaf exists for cataract, lens-subluxation or most corneal-disease content specifically; DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node for all but vitreousHemorrhageCauses (DIS-OPH-T04, Retina, the closest node for that one posterior-segment fact) — see per-concept field_notes.'],
    ['relationships', 'Covers every cataract/lens/cornea/vitreous concept minted in this chapter-4 cluster; cross-article links to lanes 1-2\'s Ch1-3 articles and to the sibling refraction/keratoconus article above deferred — see WANTED in the lane report.'],
  ],
  claimIds: cataractLensConcepts.map((c) => c.claimId),
})

mkdirSync('docs/Helwan-Source-Imports/article', { recursive: true })
writeFileSync('docs/Helwan-Source-Imports/article/HU-ORL-305-ophthalmology-articles-3.md', `${refractionArticleMd}\n---\n\n${cataractLensArticleMd}`)

// --- MCQ seed (single cluster: Chapter 4, all 91 items) ---
const questions = bank.items.map((it) => {
  const q = QUESTIONS_CH4[it.num]
  if (!q) throw new Error(`no explanations authored for Ch4 item #${it.num}`)
  const conceptId = rootToId[q.root]
  if (!conceptId) throw new Error(`no concept id for root ${q.root} (Ch4 item #${it.num})`)
  const concept = CONCEPTS.find((c) => c.root === q.root)
  const explanations = {}
  for (const [letter, text] of Object.entries(q.explanations)) explanations[letter.toUpperCase()] = text
  const options = {}
  for (const [letter, text] of Object.entries(it.options)) options[letter.toUpperCase()] = text
  const fieldNotes = { keySource: "printed key table, native text, not OCR'd (neither source PDF needed OCR)" }
  if (q.authorNotes) fieldNotes.doubt = q.authorNotes
  return {
    key: `ophth-ch4-q${String(it.num).padStart(2, '0')}`,
    id: `QST-HUORL305-CH4-Q${String(it.num).padStart(2, '0')}`,
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
    library_ids: [concept.articleId],
    source_citation: `HU-ORL-305 Ophthalmology MCQ bank, "Normal and abnormal image capture" chapter, item #${it.num}, p.${it.page}; answer key read from the bank's own dedicated printed answer key (native text, no OCR needed for either PDF).`,
    field_notes: fieldNotes,
  }
})

const seed = {
  lane: 'HU-ORL-305',
  cluster: 'ophth-ch4',
  header: 'HU-ORL-305 · Ophthalmology — Chapter 4: Normal and abnormal image capture, all 91 items, authored from the department Ophthalmology MCQ bank (Dr Ahmed Kamal), keys read from the bank\'s own dedicated printed answer key (91/91 joined, no unjoined items).',
  defaults: {
    subject: 'mul',
    status: 'Draft',
    owner: 'Helwan Year-3 authoring lane',
    universities: ['hu'],
    years: ['HU_Y3'],
    module: 'HU-ORL-305',
    module_subject: 'HU-ORL-305 > Ophthalmology > Normal and abnormal image capture',
    exam_weight_by_year: { HU_Y3: 0.4 },
    question_only_for: '',
    library_ids: [ARTICLE_REFRACTION],
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
writeFileSync('coverage/seeds/HU-ORL-305/ch4.json', JSON.stringify(seed, null, 2))

console.log(`concepts: ${CONCEPTS.length} new (CON-OPH-*): ${refractionConcepts.length} refraction/keratoconus + ${cataractLensConcepts.length} cataract/lens/cornea`)
console.log(`questions: ch4=${questions.length} (of 91 bank items; 0 held)`)
