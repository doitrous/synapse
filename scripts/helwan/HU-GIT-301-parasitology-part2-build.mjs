// Builds HU-GIT-301 parasitology Part 2 output:
//   docs/Helwan-Source-Imports/concept/HU-GIT-301-parasitology-part2-concepts.md
//   docs/Helwan-Source-Imports/evidence/HU-GIT-301-parasitology-part2-claims.md
//   docs/Helwan-Source-Imports/article/HU-GIT-301-parasitology-articles.md (appended)
//   coverage/seeds/HU-GIT-301/parasitology-part2.json (MCQ seed for emit-mcq.mjs)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { mintConceptId, renderConcept, renderClaim, renderArticle } from './HU-GIT-301-render.mjs'
import { CONCEPTS, TOPIC, SUBTOPIC, PRIMARY_NODE, ARTICLE_ID } from './HU-GIT-301-parasitology-part2-data.mjs'
import { QUESTIONS_PART2 } from './HU-GIT-301-parasitology-part2-questions.mjs'
import { CONCEPTS as PART1_CONCEPTS } from './HU-GIT-301-parasitology-part1-data.mjs'

const bank = JSON.parse(readFileSync('scripts/helwan/extract/HU-GIT-301/mcq-bank-parasitology.json', 'utf8'))
const items = bank.items.filter((it) => it.num >= 60 && it.num <= 111)

// Item #101 ("The eggs that may be found in the urine of a female patient")
// was printed in the source PDF with only 3 lettered options (a-c); this
// platform's question import contract requires 4-5. A 4th option
// (Trichuris trichiura eggs — a real nematode egg, but one with no
// recognised urogenital ectopic route) is added here at build time, not in
// the extraction bank JSON, so the extraction artifact stays a faithful
// record of what the source printed. The printed correct answer (b,
// Enterobius vermicularis eggs) is unchanged.
const item101 = items.find((it) => it.num === 101)
if (!item101) throw new Error('expected item #101 in the pp.14-19 slice')
if (Object.keys(item101.options).length === 3) {
  item101.options = { ...item101.options, d: 'Trichuris trichiura eggs' }
}

// Item #102 ("Autoinfection occurs in:") was printed in the source PDF with
// 6 lettered options (a-f); this platform's question import contract caps
// at 5. One organism option (e — Capillaria philippinensis, also genuinely
// capable of autoinfection, but the least commonly taught example of the
// five) is dropped here at build time, not in the extraction bank JSON, and
// the "All of the above" option is relettered from f to e. The printed
// correct answer ("all of the above" is still true of the remaining four
// organisms) is unchanged in substance.
const item102 = items.find((it) => it.num === 102)
if (!item102) throw new Error('expected item #102 in the pp.14-19 slice')
if (Object.keys(item102.options).length === 6) {
  const { a, b, c, d, f } = item102.options
  item102.options = { a, b, c, d, e: f }
  item102.recovered_key = 'e'
}

// --- mint ids, build root -> id map ---
const rootToId = {}
for (const c of CONCEPTS) {
  c.id = mintConceptId('GIT', c.canonicalKey)
  rootToId[c.root] = c.id
}

// Two items (#75, #100: appendicitis/obstruction triad; #79: Heterophyes
// myocarditis) test facts already minted in Part 1. Reuse those concept ids
// by recomputing mintConceptId over the exact same canonicalKey Part 1
// used, rather than minting twins — same precedent as the pharmacology
// chunk reusing pharm item #6's PPI concept for the shared bank's
// omeprazole item.
for (const root of ['intestinal-nematodes-appendicitis', 'heterophyes-ectopic-complications']) {
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
  clinicalRelevance: 0.5,
  academicRelevance: 0.75,
  weightConfidence: 0.3,
  confidence: 0.8,
  claimIds: [c.claimId],
  originalWording: [],
  rejectedMergeCandidateIds: c.rejectedMergeCandidateIds || [],
  extraNotes: c.extraNotes || [],
})).join('\n---\n\n')

writeFileSync(
  'docs/Helwan-Source-Imports/concept/HU-GIT-301-parasitology-part2-concepts.md',
  `<!--\n  HU-GIT-301 parasitology, Part 2: "Intestinal nematodes"\n  (scripts/helwan/extract/HU-GIT-301/mcq-bank-parasitology.json, items\n  #60-111, pp.14-19 of "MCQs - Para MCQ [GIT].pdf"). ${CONCEPTS.length} new\n  concepts, minted GIT-system. find-existing.mjs was run against every\n  distinctive organism/term in this chunk (Ascaris lumbricoides, Enterobius\n  vermicularis, Strongyloides stercoralis, Trichuris trichiura, Ancylostoma\n  duodenale, Capillaria philippinensis, larva currens, ground itch, hookworm,\n  Necator americanus, zoonotic dog, Trichinella spiralis, rhabditiform larva,\n  double bulbed, Graham, perianal swab, pruritus ani, retroinfection,\n  Loeffler, pulmonary migration, egg maturation in soil, ivermectin, duodenal\n  aspiration, portal of entry skin, smallest intestinal nematode, airborne\n  egg, under the finger nail, ectopic egg deposition, bipolar plugs, rectal\n  prolapse, mucosal attachment, large intestine habitat, sanitation control,\n  liver biopsy, adult worm diagnostic stage, helminth-scope, oxyuriasis,\n  plano-convex, cutaneous larva migrans, nocturnal enuresis) before minting.\n  Two hits were real near-misses, resolved without a twin: a live KAU\n  hematology concept (CON-HEM-F1B029CB7BD806, canonical_key\n  teaching.iron-deficiency.chronic-loss, \"Hookworm, peptic-ulcer/pile\n  bleeding, and menorrhagia can cause iron-deficiency anemia\") groups\n  hookworm with unrelated non-parasitic causes of anemia at a different\n  scope than this cluster's hookworm-vs-Ancylostoma-caninum fact — recorded\n  in rejected_merge_candidate_ids on the nematode-anemia concept, not\n  merged; and an Ain Shams pending Trichinella spiralis morphology concept\n  and a pending Ain Shams cutaneous larva migrans concept are distinct facts\n  from anything minted here, so no merge. Two other hits\n  (docs/Helwan-Source-Imports/concept/HU-GIT-301-parasitology-concepts.md's\n  own appendicitis and Heterophyes-myocarditis concepts, and its Fasciola\n  duodenal-aspiration concept) are this lane's own Part 1 records: the\n  appendicitis/myocarditis facts are reused directly via the build script's\n  combined root->id map (see HU-GIT-301-parasitology-part2-build.mjs), not\n  re-minted, and the duodenal-aspiration hit is a different organism\n  (Fasciola vs. this chunk's Strongyloides), so it was minted separately. No\n  overlay updates in this chunk. Biochemistry (23 keys) remains untouched\n  for a follow-on lane.\n-->\n\n${conceptMd}\n`,
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
  'docs/Helwan-Source-Imports/evidence/HU-GIT-301-parasitology-part2-claims.md',
  `<!--\n  Claims only, no citations: the Helwan GIT-301 parasitology-cluster sources\n  are not yet registered in\n  docs/medical-library-program/evidence/corpus-source-index.json (ruling\n  2026-08-22 #2, not yet executed for Year 3) — a citation naming a\n  self-derived src_ id here would trip "is not a source the corpus\n  contains". Each claim lands needs_evidence, which is the honest state; the\n  underlying fact is cited in source_citation on the covering question per\n  12-resources.md's fallback option 3.\n-->\n\n${claimsMd}`,
)

// --- article (appended to the shared parasitology article file) ---
const relatedConcepts = CONCEPTS.map((c) => c.id).concat([rootToId['intestinal-nematodes-appendicitis'], rootToId['heterophyes-ectopic-complications']])
const sections = [
  '### Definition',
  'The GIT-301 parasitology curriculum continues with the department bank\'s intestinal nematode chapter: the soil-transmitted helminths (Ascaris lumbricoides, Trichuris trichiura, Ancylostoma duodenale, Necator americanus), the autoinfective nematodes (Strongyloides stercoralis, Enterobius vermicularis), and less common intestinal nematodes (Capillaria philippinensis) and zoonotic dog-transmitted parasites.',
  '',
  '### Mechanism',
  '### Soil-transmitted nematodes',
  'Ascaris lumbricoides has a direct life cycle: its single-cell egg matures in favourable soil conditions, and after ingestion its larvae migrate through the liver and lungs (producing Loeffler\'s syndrome, shared with hookworm and Strongyloides) before maturing in the small intestine; heavy infection can obstruct the appendix, gut or bile duct. Trichuris trichiura anchors, without any migratory phase, into the caecal mucosa by its attenuated anterior end, lays a bipolar-plugged barrel-shaped egg, and can cause rectal prolapse in heavy infection. Ancylostoma duodenale and Necator americanus penetrate skin (causing ground itch) as filariform larvae, migrate through the lungs, and cause iron-deficiency anemia by chronic intestinal blood loss — a pathogenicity the dog-only Ancylostoma caninum, which cannot mature in man, does not share.',
  '',
  '### Autoinfective nematodes',
  'Strongyloides stercoralis, the smallest intestinal nematode infecting man, uniquely supports direct, indirect (free-living) and autoinfective life-cycle routes; its autoinfective filariform larvae cause larva currens on re-penetrating perianal skin, and corticosteroid-driven immunosuppression can convert autoinfection into life-threatening hyperinfection, requiring pre-treatment screening. Enterobius vermicularis infects by egg ingestion (not larva, unlike Capillaria philippinensis and Trichostrongylus), inhabits the large intestine, and spreads by direct contact, airborne eggs and retroinfection (perianally hatched larvae migrating back through the anus); its perianal egg deposition causes nocturnal pruritus, enuresis, fingernail contamination and, uncommonly, ectopic urogenital migration, and it is reliably diagnosed only by a perianal (Graham) swab, not stool examination, since stool disposal sanitation — effective for the soil-transmitted nematodes — does not control its spread.',
  '',
  '### Cross-cutting facts',
  'Several facts span organisms: autoinfection is shared by Hymenolepis nana, Enterobius vermicularis, Strongyloides stercoralis and Capillaria philippinensis, but not Ancylostoma duodenale, which needs external soil development; the adult worm is a diagnostic finding in ascariasis, strongyloidiasis and enterobiasis but not ancylostomiasis, which relies on stool eggs; and Trichuris trichiura and Enterobius vermicularis share a large-intestine habitat, unlike the small-intestinal Strongyloides stercoralis. Toxocariasis and hydatid disease are both acquired through contact with dogs, distinct from Ancylostoma caninum\'s purely cutaneous disease.',
  '',
  '### Key determinants',
  'As in Part 1, separate an exception ("except"/"not true") stem\'s true statements from its one false statement before selecting an answer, and track which specific organism or species a fact belongs to — this section frequently tests species-specific exceptions (Ancylostoma caninum\'s inability to mature in man, Trichuris\'s absent migratory phase, Enterobius\'s egg-not-larva infectivity) against a background of otherwise shared genus- or family-level nematode facts.',
  '',
  '### Clinical significance',
  'These soil-transmitted and autoinfective nematodes remain leading causes of anemia, growth impairment, and, for Strongyloides specifically, a potentially fatal corticosteroid-triggered hyperinfection syndrome in Egypt and similar settings, making their diagnosis and life-cycle-specific transmission control directly examinable clinical decisions. Every linked record remains Draft pending independent review.',
  '',
  '### Exam approach',
  'For an \'except\' stem, first identify which options share the same true claim, then select the one option that breaks the pattern — Ancylostoma caninum is the recurring "false hookworm" answer across this section\'s anemia, autoinfection and stool-diagnosis items. Item #69\'s printed key names Enterobius vermicularis, not the more commonly taught Strongyloides stercoralis, for a double-bulbed oesophagus; it stands as printed, with the doubt recorded on that concept. Item #101\'s source PDF printed only three lettered options; a fourth (Trichuris trichiura eggs) was added at build time to meet the platform\'s option-count floor, without changing the printed answer.',
].join('\n')

const articleMd = renderArticle({
  id: ARTICLE_ID,
  title: 'GIT 301 parasitology: Intestinal nematodes',
  arabicTitle: 'الطفيليات في الجهاز الهضمي: الديدان الخيطية المعوية',
  subject: 'gi',
  topic: TOPIC,
  subtopic: SUBTOPIC,
  primaryNodeId: PRIMARY_NODE,
  templateId: 'TPL-CONCEPT',
  archetype: 'concept',
  readingTime: 20,
  highYield: 'High',
  summary: 'A survey of the soil-transmitted (Ascaris, Trichuris, hookworms) and autoinfective (Strongyloides, Enterobius) intestinal nematodes, plus Capillaria philippinensis and dog-transmitted zoonoses, tested by the HU-GIT-301 department parasitology MCQ bank\'s intestinal nematode chapter (pp.14-19).',
  sections,
  relatedConcepts,
  moduleSubject: ['HU-GIT-301 > Parasitology > Intestinal nematodes'],
  universityNotes: 'hu: Restricted to HU-GIT-301 Year 3. Sourced from the department parasitology MCQ bank (scripts/helwan/extract/HU-GIT-301/mcq-bank-parasitology.json, items #60-111); no official past-paper key is involved.',
  claimIds: CONCEPTS.map((c) => c.claimId),
})

mkdirSync('docs/Helwan-Source-Imports/article', { recursive: true })
writeFileSync('docs/Helwan-Source-Imports/article/HU-GIT-301-parasitology-articles.md', `${readFileSync('docs/Helwan-Source-Imports/article/HU-GIT-301-parasitology-articles.md', 'utf8')}\n---\n\n${articleMd}`)

// --- MCQ seed ---
const questions = items.map((it) => {
  const q = QUESTIONS_PART2[it.num]
  if (!q) throw new Error(`no explanations authored for item #${it.num}`)
  const conceptId = rootToId[q.root]
  if (!conceptId) throw new Error(`no concept id for root ${q.root} (item #${it.num})`)
  const explanations = {}
  for (const [letter, text] of Object.entries(q.explanations)) explanations[letter.toUpperCase()] = text
  const options = {}
  for (const [letter, text] of Object.entries(it.options)) options[letter.toUpperCase()] = text
  const fieldNotes = { keySource: "printed key p.26, rendered (not OCR'd, which garbles the table)" }
  if (it.num === 69) {
    fieldNotes.doubtfulKey = 'Printed key names Enterobius vermicularis (b) for "double bulbed oesophagus"; standard teaching more commonly attributes this to Strongyloides stercoralis rhabditiform larvae. Kept as printed; doubt recorded on the covering concept (enterobius-vermicularis.oesophagus.double-bulbed-per-printed-key).'
  }
  if (it.num === 101) {
    fieldNotes.optionCount = 'Source printed only 3 lettered options (a-c); a 4th (Trichuris trichiura eggs) added at build time to meet the 4-5 option contract — see HU-GIT-301-parasitology-part2-build.mjs. Printed correct answer (b, Enterobius vermicularis eggs) unchanged.'
  }
  if (it.num === 102) {
    fieldNotes.optionCount = 'Source printed 6 lettered options (a-f); one organism option (Capillaria philippinensis, letter e) was dropped at build time to meet the platform\'s 5-option ceiling, and "All of the above" was relettered from f to e — see HU-GIT-301-parasitology-part2-build.mjs. Capillaria philippinensis is genuinely also capable of autoinfection (see the autoinfection-scope concept); dropping it does not change the substance of the "all of the above" answer for the four remaining organisms.'
  }
  return {
    key: it.tested_concept_key,
    id: `QST-HUGIT301-PARASITOLOGYPART2-Q${String(it.num).padStart(2, '0')}`,
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
  cluster: 'parasitology-part2',
  header: 'HU-GIT-301 · Parasitology — Part 2 (Intestinal nematodes, pp.14-19), authored from the department parasitology MCQ bank, keys rendered from the bank’s own printed p.26 answer grid.',
  defaults: {
    subject: 'gi',
    status: 'Draft',
    owner: 'Helwan Year-3 authoring lane',
    universities: ['hu'],
    years: ['HU_Y3'],
    module: 'HU-GIT-301',
    module_subject: 'HU-GIT-301 > Parasitology > Intestinal nematodes',
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
writeFileSync('coverage/seeds/HU-GIT-301/parasitology-part2.json', JSON.stringify(seed, null, 2))

console.log(`concepts: ${CONCEPTS.length} new (+2 reused from Part 1)`)
console.log(`questions: ${questions.length}`)
