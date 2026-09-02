// Builds HU-GIT-301 parasitology Part 1 output:
//   docs/Helwan-Source-Imports/concept/HU-GIT-301-parasitology-concepts.md
//   docs/Helwan-Source-Imports/evidence/HU-GIT-301-parasitology-claims.md
//   docs/Helwan-Source-Imports/article/HU-GIT-301-parasitology-articles.md
//   coverage/seeds/HU-GIT-301/parasitology-part1.json (MCQ seed for emit-mcq.mjs)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { mintConceptId, renderConcept, renderClaim, renderArticle } from './HU-GIT-301-render.mjs'
import { CONCEPTS, TOPIC, SUBTOPIC, PRIMARY_NODE, ARTICLE_ID } from './HU-GIT-301-parasitology-part1-data.mjs'
import { QUESTIONS_PART1 } from './HU-GIT-301-parasitology-part1-questions.mjs'

const bank = JSON.parse(readFileSync('scripts/helwan/extract/HU-GIT-301/mcq-bank-parasitology.json', 'utf8'))
const items = bank.items.filter((it) => it.num <= 59)

// Item #41 ("The drug of choice for treatment of Taenia solium infection") was
// printed in the source PDF with only 3 lettered options (a-c); this
// platform's question import contract requires 4-5. A 4th option
// (Albendazole — a real anthelmintic, but the one used for the larval
// cysticercosis form, not the intestinal adult-worm stage this item tests)
// is added here at build time, not in the extracted bank JSON, so the
// extraction artifact stays a faithful record of what the source printed.
// The printed correct answer (c, praziquantel) is unchanged.
const item41 = items.find((it) => it.num === 41)
if (!item41) throw new Error('expected item #41 in the pages 7-13 slice')
if (Object.keys(item41.options).length === 3) {
  item41.options = { ...item41.options, d: 'Albendazole' }
}

// --- mint ids, build root -> id map ---
const rootToId = {}
for (const c of CONCEPTS) {
  c.id = mintConceptId('GIT', c.canonicalKey)
  rootToId[c.root] = c.id
}

// --- claims ---
for (const c of CONCEPTS) {
  const slug = c.root.toUpperCase().replace(/[^A-Z0-9]+/g, '-').slice(0, 24)
  c.claimId = `CLM-GIT-${slug}-01`
}

const conceptMd = CONCEPTS.map((c) => renderConcept({
  id: c.id,
  label: c.label,
  canonicalKey: c.canonicalKey,
  aliases: c.aliases,
  arabicLabel: c.arabicLabel,
  definition: c.definition,
  objective: c.objective,
  pitfalls: c.pitfalls,
  conceptType: 'clinical_feature',
  subject: 'gi',
  primaryNodeId: PRIMARY_NODE,
  topic: TOPIC,
  subtopic: SUBTOPIC,
  modules: ['HU-GIT-301'],
  articleIds: [ARTICLE_ID],
  relatedConceptIds: [],
  learnerYears: '3',
  universities: ['hu'],
  blueprintWeight: 0.4,
  examWeightByYear: ['HU_Y3=0.4'],
  clinicalRelevance: 0.5,
  academicRelevance: 0.75,
  weightConfidence: 0.3,
  confidence: 0.8,
  claimIds: [c.claimId],
  originalWording: [],
  rejectedMergeCandidateIds: [],
  extraNotes: c.extraNotes || [],
})).join('\n---\n\n')

writeFileSync(
  'docs/Helwan-Source-Imports/concept/HU-GIT-301-parasitology-concepts.md',
  `<!--\n  HU-GIT-301 parasitology, Part 1: "Trematoda and Cestoda"\n  (scripts/helwan/extract/HU-GIT-301/mcq-bank-parasitology.json, items\n  #1-59, pp.7-13 of "MCQs - Para MCQ [GIT].pdf"). ${CONCEPTS.length} new\n  concepts, minted GIT-system. find-existing.mjs was run against every\n  distinctive organism/drug term in this chunk (fasciola, praziquantel,\n  pirenella conica, leptocercous/lophocercous cercaria, halzoon, spurious\n  infection, fasciolopsis buski, trematode eggs, hymenolepis nana/diminuta,\n  taenia solium/saginata, diphyllobothrium latum, dipylidium caninum, cestoda,\n  echinococcus granulosus, hydatid cyst, alveolar hydatid, cysticercosis,\n  fish-borne helminths, hepatic parasites, immunodiagnosis, triclabendazole,\n  encysted metacercaria, concentration stool technique) before minting: 0\n  hits across the board, matching the coverage triage's own finding that\n  parasitology terms sit in the "new" bucket. No overlay updates in this\n  chunk. Nematodes (pp.14-19) and the protozoa/mixed-vignette section\n  (pp.20-25) remain for a follow-on parasitology chunk; biochemistry (23\n  keys) is untouched.\n-->\n\n${conceptMd}\n`,
)

const claimsMd = CONCEPTS.map((c) => renderClaim({
  id: c.claimId,
  conceptId: c.id,
  subject: c.claim.subject,
  predicate: c.claim.predicate,
  object: c.claim.object,
  displayText: `${c.claim.subject} ${c.claim.predicate} ${c.claim.object}.`,
  riskClass: 'foundational_stable',
  confidence: 0.75,
})).join('\n---\n\n')

writeFileSync(
  'docs/Helwan-Source-Imports/evidence/HU-GIT-301-parasitology-claims.md',
  `<!--\n  Claims only, no citations: the Helwan GIT-301 parasitology-cluster sources\n  are not yet registered in\n  docs/medical-library-program/evidence/corpus-source-index.json (ruling\n  2026-08-22 #2, not yet executed for Year 3) — a citation naming a\n  self-derived src_ id here would trip "is not a source the corpus\n  contains". Each claim lands needs_evidence, which is the honest state; the\n  underlying fact is cited in source_citation on the covering question per\n  12-resources.md's fallback option 3.\n-->\n\n${claimsMd}`,
)

// --- article ---
const relatedConcepts = CONCEPTS.map((c) => c.id)
const sections = [
  '### Definition',
  'The GIT-301 parasitology curriculum opens with the department bank\'s Trematoda and Cestoda chapter: the liver and intestinal flukes (Fasciola hepatica, Fasciola gigantica, Fasciolopsis buski, Heterophyes heterophyes) and the intestinal and tissue cestodes (Taenia solium, Taenia saginata, Diphyllobothrium latum, Dipylidium caninum, Hymenolepis nana, Hymenolepis diminuta, Echinococcus granulosus and Echinococcus multilocularis).',
  '',
  '### Mechanism',
  '### Trematoda (flukes)',
  'Fasciola hepatica and Fasciola gigantica are acquired from encysted metacercariae on aquatic vegetation, migrate through the liver parenchyma, and settle in the bile ducts; triclabendazole, not praziquantel, is their drug of choice. Fasciola causes halzoon when raw infected liver harbouring live adult worms is eaten, and false (spurious) infection when dead worms or eggs from a liver meal merely transit the gut. Heterophyes heterophyes, acquired from fish via the lophocercous cercaria shed by the brackish-water snail Pirenella conica, is usually a mild intestinal fluke, but its small eggs can embolize ectopically to the heart, causing myocarditis. Fasciolopsis buski, the giant intestinal fluke with the pig as reservoir host, shares the leptocercous cercaria and encysted-metacercaria infective stage of the Fasciola species.',
  '',
  '### Cestoda (tapeworms)',
  'Taenia solium and Taenia saginata are diagnosed by eggs, gravid segments and the post-treatment scolex, and differentiated chiefly by lateral uterine branch count; T. solium\'s unique danger is autoinfection-driven cysticercosis, and it is the only one of these tapeworms not zoonotic, since man is its sole definitive host. Diphyllobothrium latum lays the only operculated cestode egg, is acquired from the plerocercoid larva in fresh-water fish, and competes with its host for vitamin B12. Dipylidium caninum and Hymenolepis diminuta both depend on arthropod (flea) intermediate hosts, unlike Hymenolepis nana, whose direct, no-intermediate-host cycle and capacity for autoinfection make it the commonest cestode of childhood. Echinococcus granulosus forms the cystic hydatid cyst, most often via a sheep intermediate host, with man an accidental intermediate (never definitive) host; Echinococcus multilocularis instead produces alveolar hydatid disease, chiefly hepatic and behaving with malignant-like tissue infiltration.',
  '',
  '### Cross-cutting facts',
  'Several facts span organisms: the encysted metacercaria is the shared infective stage of the GIT-301 flukes; Hymenolepis nana, Taenia solium and Echinococcus granulosus eggs are all directly infective without an intermediate host, unlike Taenia saginata\'s egg; several intestinal helminths and Taenia saginata can cause appendicitis; Heterophyes heterophyes, Metagonimus yokogawi, Diphyllobothrium latum and Capillaria philippinensis are all fish-borne; and immunodiagnosis (serology) serves tissue-invasive, pre-patent infections such as acute fascioliasis, acute clonorchiasis and visceral larva migrans, not a readily stool-diagnosed nematode like Trichostrongylus.',
  '',
  '### Key determinants',
  'Separate an exception ("except") stem\'s three true statements from its one false statement before selecting an answer, and track which organism a fact actually belongs to — this bank frequently tests species-specific exceptions (Fasciola\'s praziquantel resistance, Heterophyes\'s embryonated non-hatching egg, Taenia solium\'s non-zoonotic status) against a background of otherwise shared genus- or family-level facts.',
  '',
  '### Clinical significance',
  'These parasites remain endemic causes of hepatobiliary, intestinal and, in a minority of cases, cardiac or neurological disease in Egypt and similar settings, and their diagnosis and drug selection (triclabendazole for Fasciola, praziquantel for most cestodes and other trematodes, albendazole for larval cysticercosis) are directly examinable clinical decisions. Every linked record remains Draft pending independent review.',
  '',
  '### Exam approach',
  'For an \'except\' stem, first identify which three options share the same true claim, then select the one option that breaks the pattern. The printed bank key stands as printed throughout this cluster, including item #19\'s Fasciolopsis buski/B12 pairing, which departs from the more commonly taught Diphyllobothrium latum association; no key was overridden. Item #41\'s source PDF printed only three lettered options; a fourth (Albendazole) was added at build time to meet the platform\'s option-count floor, without changing the printed answer.',
].join('\n')

const articleMd = renderArticle({
  id: ARTICLE_ID,
  title: 'GIT 301 parasitology: Trematoda and Cestoda',
  arabicTitle: 'الطفيليات في الجهاز الهضمي: الديدان المثقوبة والشريطية',
  subject: 'gi',
  topic: TOPIC,
  subtopic: SUBTOPIC,
  primaryNodeId: PRIMARY_NODE,
  templateId: 'TPL-CONCEPT',
  archetype: 'concept',
  readingTime: 20,
  highYield: 'High',
  summary: 'A survey of the liver and intestinal flukes (Fasciola, Fasciolopsis buski, Heterophyes heterophyes) and the intestinal and tissue tapeworms (Taenia, Diphyllobothrium latum, Dipylidium caninum, Hymenolepis nana/diminuta, Echinococcus granulosus/multilocularis) tested by the HU-GIT-301 department parasitology MCQ bank\'s Trematoda and Cestoda chapter (pp.7-13).',
  sections,
  relatedConcepts,
  moduleSubject: ['HU-GIT-301 > Parasitology > Trematoda and Cestoda'],
  universityNotes: 'hu: Restricted to HU-GIT-301 Year 3. Sourced from the department parasitology MCQ bank (scripts/helwan/extract/HU-GIT-301/mcq-bank-parasitology.json, items #1-59); no official past-paper key is involved.',
  claimIds: CONCEPTS.map((c) => c.claimId),
})

mkdirSync('docs/Helwan-Source-Imports/article', { recursive: true })
writeFileSync('docs/Helwan-Source-Imports/article/HU-GIT-301-parasitology-articles.md', `${articleMd}`)

// --- MCQ seed ---
const questions = items.map((it) => {
  const q = QUESTIONS_PART1[it.num]
  if (!q) throw new Error(`no explanations authored for item #${it.num}`)
  const conceptId = rootToId[q.root]
  if (!conceptId) throw new Error(`no concept id for root ${q.root} (item #${it.num})`)
  const explanations = {}
  for (const [letter, text] of Object.entries(q.explanations)) explanations[letter.toUpperCase()] = text
  const options = {}
  for (const [letter, text] of Object.entries(it.options)) options[letter.toUpperCase()] = text
  const fieldNotes = { keySource: "printed key p.26, rendered (not OCR'd, which garbles the table)" }
  if (it.num === 41) {
    fieldNotes.optionCount = 'Source printed only 3 lettered options (a-c); a 4th (Albendazole) added at build time to meet the 4-5 option contract — see HU-GIT-301-parasitology-part1-build.mjs. Printed correct answer (c, praziquantel) unchanged.'
  }
  return {
    key: it.tested_concept_key,
    id: `QST-HUGIT301-PARASITOLOGYPART1-Q${String(it.num).padStart(2, '0')}`,
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
    question_type: 'Recall',
    source_citation: `HU-GIT-301 Parasitology MCQ bank ("MCQs - Para MCQ [GIT].pdf"), lettered item #${it.num}, p.${it.page}; answer key rendered from the bank's own p.26 key grid, not OCR text.`,
    field_notes: fieldNotes,
  }
})

mkdirSync('coverage/seeds/HU-GIT-301', { recursive: true })
const seed = {
  lane: 'HU-GIT-301',
  cluster: 'parasitology-part1',
  header: 'HU-GIT-301 · Parasitology — Part 1 (Trematoda and Cestoda, pp.7-13), authored from the department parasitology MCQ bank, keys rendered from the bank’s own printed p.26 answer grid.',
  defaults: {
    subject: 'gi',
    status: 'Draft',
    owner: 'Helwan Year-3 authoring lane',
    universities: ['hu'],
    years: ['HU_Y3'],
    module: 'HU-GIT-301',
    module_subject: 'HU-GIT-301 > Parasitology > Trematoda and Cestoda',
    exam_weight_by_year: { HU_Y3: 0.4 },
    question_only_for: '',
    library_ids: [ARTICLE_ID],
    resource_ids: [],
    setting: 'Academic',
    estimated_seconds: 70,
    randomise_answers: true,
    cognitive_effort: 'Medium',
    reasoning_level: 2,
    learning_objective: 'Apply the correct parasitology fact to select the accepted (or, in an "except" stem, the excepted) statement.',
  },
  questions,
}
writeFileSync('coverage/seeds/HU-GIT-301/parasitology-part1.json', JSON.stringify(seed, null, 2))

console.log(`concepts: ${CONCEPTS.length} new`)
console.log(`questions: ${questions.length}`)
