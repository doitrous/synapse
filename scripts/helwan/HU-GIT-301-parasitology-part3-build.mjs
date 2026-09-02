// Builds HU-GIT-301 parasitology Part 3 output:
//   docs/Helwan-Source-Imports/concept/HU-GIT-301-parasitology-part3-concepts.md
//   docs/Helwan-Source-Imports/evidence/HU-GIT-301-parasitology-part3-claims.md
//   docs/Helwan-Source-Imports/article/HU-GIT-301-parasitology-articles.md (appended)
//   coverage/seeds/HU-GIT-301/parasitology-part3.json (MCQ seed for emit-mcq.mjs)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { mintConceptId, renderConcept, renderClaim, renderArticle } from './HU-GIT-301-render.mjs'
import { CONCEPTS, TOPIC, SUBTOPIC, PRIMARY_NODE, ARTICLE_ID } from './HU-GIT-301-parasitology-part3-data.mjs'
import { QUESTIONS_PART3 } from './HU-GIT-301-parasitology-part3-questions.mjs'
import { CONCEPTS as PART1_CONCEPTS } from './HU-GIT-301-parasitology-part1-data.mjs'

const bank = JSON.parse(readFileSync('scripts/helwan/extract/HU-GIT-301/mcq-bank-parasitology.json', 'utf8'))
// Items #132, #137 and #140 test keys already authored (Part 2's Graham-swab
// concept and Part 1's Diphyllobothrium fish-stage/diagnostic-stage
// concepts respectively) -- excluded from this chunk.
const items = bank.items.filter((it) => it.num >= 113 && it.num <= 146 && ![132, 137, 140].includes(it.num))
if (items.length !== 31) throw new Error(`expected 31 items in the pp.20-25 slice, got ${items.length}`)

// --- option-count fixups, at build time, not in the extraction bank JSON ---
// (see field_notes.optionCount added to each item below for the rationale)

// #116 "What is the other diagnostic stage that can be detected in stool
// examination?" printed only 3 options (a=Egg, b=Scolex in successful
// treatment, c=All of the above). A 4th option is added -- unlike the
// part2 precedent (#101/#102, which added/removed a DISTRACTOR), this one
// adds a genuinely TRUE additional diagnostic finding (gravid proglottid
// segments), so "all of the above" (c) stays correct without contradiction.
const item116 = items.find((it) => it.num === 116)
if (Object.keys(item116.options).length === 3) {
  item116.options = { ...item116.options, d: 'Gravid proglottid (segment) in stool' }
}

// #119 "What is the infective stage of this parasite?" printed only 3
// options -- add a 4th, wrong, distractor.
const item119 = items.find((it) => it.num === 119)
if (Object.keys(item119.options).length === 3) {
  item119.options = { ...item119.options, d: 'Giardia lamblia trophozoite' }
}

// #121 "What is the diagnosis?" printed only 2 options -- add 2 wrong
// distractors to reach the platform's 4-option floor.
const item121 = items.find((it) => it.num === 121)
if (Object.keys(item121.options).length === 2) {
  item121.options = { ...item121.options, c: 'Pyogenic liver abscess', d: 'Fascioliasis' }
}

// #123 "Name the habitat of the parasite." printed only 3 options -- add a
// 4th, wrong, distractor.
const item123 = items.find((it) => it.num === 123)
if (Object.keys(item123.options).length === 3) {
  item123.options = { ...item123.options, d: 'Ileum' }
}

// #129 "What is the type of anaemia?" printed only 2 options -- add 2
// wrong distractors to reach the platform's 4-option floor.
const item129 = items.find((it) => it.num === 129)
if (Object.keys(item129.options).length === 2) {
  item129.options = { ...item129.options, c: 'Haemolytic anemia', d: 'Aplastic anemia' }
}

// #130 "The infective stage of this parasite is:" printed only 3 options
// -- add a 4th, wrong, distractor.
const item130 = items.find((it) => it.num === 130)
if (Object.keys(item130.options).length === 3) {
  item130.options = { ...item130.options, d: 'Cysticercoid larva' }
}

// #139 "What is the cause of the anaemia in this case?" printed only 3
// options -- add a 4th, wrong, distractor.
const item139 = items.find((it) => it.num === 139)
if (Object.keys(item139.options).length === 3) {
  item139.options = { ...item139.options, d: 'Increased renal excretion of vitamin B12' }
}

// #146 "Why is concentrated stool examination better used for diagnosis of
// this case?" printed only 3 options (a/b/c="all of the above"). As with
// #116, the added 4th option is genuinely TRUE (a further real reason
// concentration improves yield), so "all of the above" (c) stays correct.
const item146 = items.find((it) => it.num === 146)
if (Object.keys(item146.options).length === 3) {
  item146.options = { ...item146.options, d: 'Non-uniform distribution of eggs within the stool sample' }
}

// --- mint ids, build root -> id map ---
const rootToId = {}
for (const c of CONCEPTS) {
  c.id = mintConceptId('GIT', c.canonicalKey)
  rootToId[c.root] = c.id
}

// Five items (#135, #138, #142, #144, #146) test facts already minted in
// Part 1 -- find-existing.mjs and a full canonicalKey cross-check against
// Part 1/Part 2 surfaced exact-scope matches. Reuse those concept ids by
// recomputing mintConceptId over the exact same canonicalKey Part 1 used,
// rather than minting twins -- same precedent as Part 2's reuse of Part 1's
// appendicitis/myocarditis concepts.
for (const root of [
  'intestinal-nematodes-appendicitis', // #135: Ascaris/Enterobius/Trichuris/Taenia saginata appendicitis (this chunk's Entamoeba histolytica addition is noted in field_notes, not merged into the Part 1 record)
  'fasciolopsis-buski', // #138: pig reservoir + printed B12-deficiency-anaemia association
  'trematodes-infective-stage', // #142: encysted metacercaria shared infective stage
  'heterophyes-ectopic-complications', // #144: ectopic egg embolism / myocarditis
  'trematode-stool-concentration', // #146: small egg + concentration technique
]) {
  const c = PART1_CONCEPTS.find((x) => x.root === root)
  if (!c) throw new Error(`expected Part 1 concept root ${root} to reuse`)
  rootToId[root] = mintConceptId('GIT', c.canonicalKey)
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
  clinicalRelevance: 0.6,
  academicRelevance: 0.75,
  weightConfidence: 0.3,
  confidence: 0.8,
  claimIds: [c.claimId],
  originalWording: [],
  rejectedMergeCandidateIds: c.rejectedMergeCandidateIds || [],
  extraNotes: c.extraNotes || [],
})).join('\n---\n\n')

writeFileSync(
  'docs/Helwan-Source-Imports/concept/HU-GIT-301-parasitology-part3-concepts.md',
  `<!--\n  HU-GIT-301 parasitology, Part 3: "Protozoa and mixed-organism clinical\n  vignettes" (scripts/helwan/extract/HU-GIT-301/mcq-bank-parasitology.json,\n  items #113-146, pp.20-25 of "MCQs - Para MCQ [GIT].pdf", minus #132/#137/\n  #140 whose tested_concept_key was already authored by Part 1/Part 2).\n  ${CONCEPTS.length} new concepts, minted GIT-system. find-existing.mjs was\n  run against every distinctive organism/term in this chunk (Fasciola,\n  Taenia saginata, Entamoeba histolytica cyst, Cryptosporidium, amoebic\n  liver abscess, Giardia lamblia, Toxocara, trichuris rectal prolapse,\n  Ancylostoma duodenale, Enterobius vermicularis diagnostic, Ascaris barium,\n  Diphyllobothrium latum, Fasciolopsis buski, Heterophyes, Pirenella\n  conica), cross-checked against every canonical_key already minted in\n  HU-GIT-301-parasitology-part1-data.mjs and -part2-data.mjs. Five real\n  same-scope hits were found, all in this lane's own Part 1 (not a twin --\n  reused directly via the build script's combined root->id map rather than\n  re-minted): the Fasciolopsis buski/B12-anaemia concept (item #138), the\n  shared-metacercaria infective-stage concept (item #142), the Heterophyes\n  ectopic-egg-embolism/myocarditis concept (item #144, already reused once\n  before by Part 2), the Heterophyes stool-concentration concept (item\n  #146), and the multi-species parasitic-appendicitis concept (item #135 --\n  this vignette's printed key additionally names Entamoeba histolytica, a\n  protozoan not in the Part 1 record's helminth list; noted in the\n  covering question's explanations rather than expanding the already-landed\n  Part 1 file). One near-miss was NOT merged, and is recorded in\n  rejected_merge_candidate_ids instead: Part 2's Enterobius\n  plano-convex-egg-morphology concept (CON-GIT-FF0177C35FE48E) is narrower\n  than this chunk's "diagnostic stage(s)" vignette fact, which additionally\n  names the adult female worm as a valid diagnostic finding. All other\n  searches (Fasciola, Taenia saginata, Cryptosporidium, amoebic liver\n  abscess, Giardia lamblia, Toxocara, Ancylostoma duodenale, Ascaris barium\n  sign) returned no same-scope hits. No overlay updates in this chunk.\n  Eight items (#116, #119, #121, #123, #129, #130, #139, #146) were printed\n  with 2-3 lettered options; a 4th option was added at build time for each\n  (see field_notes.optionCount on the corresponding question) -- for #116\n  and #146, whose printed correct answer is "all of the above", the added\n  option is a genuinely TRUE additional fact so the printed answer stays\n  valid; for the other six, the added option is a plausible wrong\n  distractor. Printed correct answers unchanged throughout. This closes the\n  module's parasitology backlog; biochemistry (23 keys) remains for a\n  parallel chunk.\n-->\n\n${conceptMd}\n`,
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
  'docs/Helwan-Source-Imports/evidence/HU-GIT-301-parasitology-part3-claims.md',
  `<!--\n  Claims only, no citations: the Helwan GIT-301 parasitology-cluster sources\n  are not yet registered in\n  docs/medical-library-program/evidence/corpus-source-index.json (ruling\n  2026-08-22 #2, not yet executed for Year 3) -- a citation naming a\n  self-derived src_ id here would trip "is not a source the corpus\n  contains". Each claim lands needs_evidence, which is the honest state; the\n  underlying fact is cited in source_citation on the covering question per\n  12-resources.md's fallback option 3.\n-->\n\n${claimsMd}`,
)

// --- article (appended to the shared parasitology article file) ---
const relatedConcepts = CONCEPTS.map((c) => c.id).concat([
  rootToId['intestinal-nematodes-appendicitis'],
  rootToId['fasciolopsis-buski'],
  rootToId['trematodes-infective-stage'],
  rootToId['heterophyes-ectopic-complications'],
  rootToId['trematode-stool-concentration'],
])
const sections = [
  '### Definition',
  'The GIT-301 parasitology curriculum closes with the department bank\'s 13-case clinical-vignette block (pp.20-25): short clinical stems for protozoa (Entamoeba histolytica, Giardia lamblia, Cryptosporidium) and a mixed roster of previously-covered flukes, tapeworms and nematodes (Fasciola, Taenia saginata, Diphyllobothrium latum, Heterophyes, Toxocara, Trichuris trichiura, Ancylostoma duodenale, Enterobius vermicularis, Ascaris lumbricoides), each tested by recognition of a compatible history, examination and investigation picture rather than an isolated fact.',
  '',
  '### Mechanism',
  '### Protozoa',
  'Entamoeba histolytica causes amoebic dysentery via its invasive trophozoite, found at the flask-shaped colonic ulcer itself (sigmoidoscopic aspirate), while its resistant cyst is the acid-stable, transmissible stage. Giardia lamblia attaches to the duodenal/jejunal mucosa, producing a malabsorptive, greasy-stool picture without blood or organomegaly, distinguishing it from Entamoeba\'s dysenteric picture. Cryptosporidium\'s acid-fast oocyst causes severe watery diarrhoea, particularly in AIDS patients, where Strongyloides stercoralis is a second organism whose diarrhoea severity is amplified by the same immunosuppression. Amoebic liver abscess follows portal spread of invasive Entamoeba histolytica, presenting with fever, rigors, tender hepatomegaly and neutrophilic leucocytosis, distinguished from the more indolent hydatid cyst.',
  '',
  '### Mixed organisms revisited in vignette form',
  'Fasciola\'s acute hepatic phase can present with an egg-negative stool, confirmed by serology rather than a stool-based method. Taenia saginata is recognised by its actively motile proglottids, diagnosed by egg, proglottid or post-treatment scolex. Diphyllobothrium latum is recognised by a fish-ingestion history with pernicious anaemia from direct B12/folate consumption by the adult worm -- a mechanism distinct from, but paralleled by, Fasciolopsis buski\'s anaemia via mucosal malabsorption. Heterophyes, from undercooked fish, risks ectopic egg embolisation to the heart, spinal cord or brain. Toxocara (visceral larva migrans) follows dog contact with tissue-migratory eosinophilia. Ancylostoma duodenale, Enterobius vermicularis, Ascaris lumbricoides and Trichuris trichiura recur here in their classic occupational, nocturnal, radiological and dysenteric-with-rectal-prolapse presentations respectively, and several of them, plus Entamoeba histolytica, are recognised causes of parasitic appendicitis.',
  '',
  '### Key determinants',
  'This vignette-block tests recognition, not isolated recall: match the exposure history (farmer, fisherman, dog contact, raw fish), the symptom/sign pattern, and any investigation clue (barium shadow, raised hemidiaphragm, acid-fast stool) to the single best-fitting organism, then answer the follow-up question(s) about that same case using the specific fact asked (diagnostic stage, infective stage, mechanism, treatment) rather than a generic fact about the organism.',
  '',
  '### Clinical significance',
  'These vignettes model real diagnostic reasoning: an exposure history plus a compatible clinical/investigation picture, not a single pathognomonic sign, is what narrows a differential in Egyptian clinical parasitology practice. Every linked record remains Draft pending independent review.',
  '',
  '### Exam approach',
  'Read the full vignette (including any "continued" stem) before answering, since later questions in the same case depend on the same diagnosis already established. For an "all of the above" option over a short list, check whether every listed item is independently true before selecting it, rather than assuming the option is a distractor. Two items (#116, #146) had a 4th option added at build time that is deliberately also-true, keeping the printed "all of the above" answer valid; six others (#119, #121, #123, #129, #130, #139) had a plausible wrong 4th option added to meet the platform\'s option-count floor without changing the printed answer.',
].join('\n')

const articleMd = renderArticle({
  id: ARTICLE_ID,
  title: 'GIT 301 parasitology: Protozoa and mixed-organism clinical vignettes',
  arabicTitle: 'الطفيليات في الجهاز الهضمي: حالات سريرية مختلطة للأوليات والديدان',
  subject: 'gi',
  topic: TOPIC,
  subtopic: SUBTOPIC,
  primaryNodeId: PRIMARY_NODE,
  templateId: 'TPL-CONCEPT',
  archetype: 'concept',
  readingTime: 22,
  highYield: 'High',
  summary: 'The department parasitology MCQ bank\'s 13-case clinical-vignette block (pp.20-25): protozoa (Entamoeba histolytica, Giardia lamblia, Cryptosporidium, amoebic liver abscess) and a mixed roster of flukes, tapeworms and nematodes revisited in applied clinical-recognition form.',
  sections,
  relatedConcepts,
  moduleSubject: ['HU-GIT-301 > Parasitology > Protozoa and mixed-organism clinical vignettes'],
  universityNotes: 'hu: Restricted to HU-GIT-301 Year 3. Sourced from the department parasitology MCQ bank (scripts/helwan/extract/HU-GIT-301/mcq-bank-parasitology.json, items #113-146); no official past-paper key is involved.',
  claimIds: CONCEPTS.map((c) => c.claimId),
})

mkdirSync('docs/Helwan-Source-Imports/article', { recursive: true })
writeFileSync('docs/Helwan-Source-Imports/article/HU-GIT-301-parasitology-articles.md', `${readFileSync('docs/Helwan-Source-Imports/article/HU-GIT-301-parasitology-articles.md', 'utf8')}\n---\n\n${articleMd}`)

// --- MCQ seed ---
const questions = items.map((it) => {
  const q = QUESTIONS_PART3[it.num]
  if (!q) throw new Error(`no explanations authored for item #${it.num}`)
  const conceptId = rootToId[q.root]
  if (!conceptId) throw new Error(`no concept id for root ${q.root} (item #${it.num})`)
  const explanations = {}
  for (const [letter, text] of Object.entries(q.explanations)) explanations[letter.toUpperCase()] = text
  const options = {}
  for (const [letter, text] of Object.entries(it.options)) options[letter.toUpperCase()] = text
  const fieldNotes = { keySource: "printed key p.26, rendered (not OCR'd, which garbles the table)" }
  const trueAddition = 'A genuinely TRUE additional fact (not a distractor), so the printed "all of the above" answer stays fully correct after the addition.'
  const wrongAddition = 'A plausible wrong distractor, so the platform\'s 4-option floor is met without changing the printed correct answer.'
  if (it.num === 116) fieldNotes.optionCount = `Source printed only 3 lettered options (a-c); a 4th ("Gravid proglottid (segment) in stool") added at build time -- see HU-GIT-301-parasitology-part3-build.mjs. ${trueAddition}`
  if (it.num === 119) fieldNotes.optionCount = `Source printed only 3 lettered options (a-c); a 4th ("Giardia lamblia trophozoite") added at build time -- see HU-GIT-301-parasitology-part3-build.mjs. ${wrongAddition}`
  if (it.num === 121) fieldNotes.optionCount = `Source printed only 2 lettered options (a-b); a 3rd and 4th ("Pyogenic liver abscess", "Fascioliasis") added at build time -- see HU-GIT-301-parasitology-part3-build.mjs. ${wrongAddition}`
  if (it.num === 123) fieldNotes.optionCount = `Source printed only 3 lettered options (a-c); a 4th ("Ileum") added at build time -- see HU-GIT-301-parasitology-part3-build.mjs. ${wrongAddition}`
  if (it.num === 129) fieldNotes.optionCount = `Source printed only 2 lettered options (a-b); a 3rd and 4th ("Haemolytic anemia", "Aplastic anemia") added at build time -- see HU-GIT-301-parasitology-part3-build.mjs. ${wrongAddition}`
  if (it.num === 130) fieldNotes.optionCount = `Source printed only 3 lettered options (a-c); a 4th ("Cysticercoid larva") added at build time -- see HU-GIT-301-parasitology-part3-build.mjs. ${wrongAddition}`
  if (it.num === 139) fieldNotes.optionCount = `Source printed only 3 lettered options (a-c); a 4th ("Increased renal excretion of vitamin B12") added at build time -- see HU-GIT-301-parasitology-part3-build.mjs. ${wrongAddition}`
  if (it.num === 146) fieldNotes.optionCount = `Source printed only 3 lettered options (a-c); a 4th ("Non-uniform distribution of eggs within the stool sample") added at build time -- see HU-GIT-301-parasitology-part3-build.mjs. ${trueAddition}`
  if (it.num === 135) fieldNotes.conceptReuse = 'main_concept reused from Part 1 (CON-GIT-5AF3E7C4293A73, intestinal-helminths.complication.appendicitis-multiple-species: Ascaris/Enterobius/Trichuris/Taenia saginata). This vignette\'s printed key additionally names Entamoeba histolytica (a protozoan) as a further recognised cause of parasitic appendicitis, a fact the reused concept does not itself state -- noted here rather than expanding the already-landed Part 1 record.'
  const question = it.vignette ? `${it.vignette} ${it.stem}` : it.stem
  return {
    key: it.tested_concept_key,
    id: `QST-HUGIT301-PARASITOLOGYPART3-Q${String(it.num).padStart(2, '0')}`,
    page: it.page,
    title: question,
    question,
    options,
    correct: it.recovered_key.toUpperCase(),
    explanations,
    main_concept: conceptId,
    topic: q.topic,
    subtopic: q.subtopic,
    difficulty: q.difficulty || 'Moderate',
    question_type: 'Application',
    source_citation: `HU-GIT-301 Parasitology MCQ bank ("MCQs - Para MCQ [GIT].pdf"), clinical-vignette lettered item #${it.num}, p.${it.page}; answer key rendered from the bank's own p.26 key grid, not OCR text.`,
    field_notes: fieldNotes,
  }
})

mkdirSync('coverage/seeds/HU-GIT-301', { recursive: true })
const seed = {
  lane: 'HU-GIT-301',
  cluster: 'parasitology-part3',
  header: 'HU-GIT-301 · Parasitology — Part 3 (Protozoa and mixed-organism clinical vignettes, pp.20-25), authored from the department parasitology MCQ bank, keys rendered from the bank’s own printed p.26 answer grid.',
  defaults: {
    subject: 'gi',
    status: 'Draft',
    owner: 'Helwan Year-3 authoring lane',
    universities: ['hu'],
    years: ['HU_Y3'],
    module: 'HU-GIT-301',
    module_subject: 'HU-GIT-301 > Parasitology > Protozoa and mixed-organism clinical vignettes',
    exam_weight_by_year: { HU_Y3: 0.4 },
    question_only_for: '',
    library_ids: [ARTICLE_ID],
    resource_ids: [],
    setting: 'Academic',
    estimated_seconds: 90,
    randomise_answers: true,
    cognitive_effort: 'Medium',
    reasoning_level: 3,
    learning_objective: 'Given a clinical vignette, identify the parasitological cause and apply the correct diagnostic/infective-stage/mechanism/treatment fact for that case.',
  },
  questions,
}
writeFileSync('coverage/seeds/HU-GIT-301/parasitology-part3.json', JSON.stringify(seed, null, 2))

console.log(`concepts: ${CONCEPTS.length} new (+5 reused from Part 1)`)
console.log(`questions: ${questions.length}`)
