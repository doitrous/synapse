// Builds HU-GIT-301 biochemistry output:
//   docs/Helwan-Source-Imports/concept/HU-GIT-301-biochemistry-concepts.md
//   docs/Helwan-Source-Imports/evidence/HU-GIT-301-biochemistry-claims.md
//   docs/Helwan-Source-Imports/article/HU-GIT-301-biochemistry-articles.md (new file)
//   coverage/seeds/HU-GIT-301/biochemistry.json (MCQ seed for emit-mcq.mjs)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { mintConceptId, renderConcept, renderClaim, renderArticle } from './HU-GIT-301-render.mjs'
import { CONCEPTS, TOPIC, SUBTOPIC, PRIMARY_NODE, ARTICLE_ID } from './HU-GIT-301-biochemistry-data.mjs'
import { QUESTIONS_BIOCHEM } from './HU-GIT-301-biochemistry-questions.mjs'

const bank = JSON.parse(readFileSync('scripts/helwan/extract/HU-GIT-301/mcq-bank-biochemistry.json', 'utf8'))
const items = bank.items
if (items.length !== 24) throw new Error(`expected 24 biochemistry items, got ${items.length}`)

// --- mint ids, build root -> id map ---
const rootToId = {}
for (const c of CONCEPTS) {
  c.id = mintConceptId('GIT', c.canonicalKey)
  rootToId[c.root] = c.id
}

// Two items reuse concept ids from outside this chunk's own CONCEPTS array,
// rather than being minted here -- find-existing.mjs surfaced exact-scope
// hits:
//
// Item 9 (dietary-lipid-transport.chylomicrons): reuses a live... actually
// PENDING Kasr 103-BMS concept (CON-GIT-33EAF87333AAD5, canonical_key
// lipoprotein.chylomicron-vldl.transport-function -- "Chylomicrons carry
// dietary triacylglycerol out of the gut; VLDL carries hepatic
// triacylglycerol out of the liver"). Not yet live, so this reuse is
// written as a sparse pending-live overlay row (module tags only) at
// docs/Helwan-Source-Imports/pending-live/HU-GIT-301-biochemistry-questions.md,
// applied only after docs/Kasr-Source-Imports/concept/103-BMS-biochemistry-concepts.md
// lands live, per 00-START-HERE §4's stub-create guard -- same pattern as
// the ch1 carcinoid/haemochromatosis overlay rows.
rootToId['dietary-lipid-transport-chylomicrons'] = 'CON-GIT-33EAF87333AAD5'

// Item 22 (liver-function-tests.afp-in-liver-cancer): reuses this lane's
// OWN already-landed HU-GIT-301-pathology-ch2-concepts.md concept
// (CON-GIT-A71F14D56CE891, canonical_key hepatocellular-carcinoma.afp-marker
// -- "Alpha-fetoprotein (AFP) is the characteristic serum marker elevated
// in hepatocellular carcinoma"). Same module already (HU-GIT-301), so no
// overlay is needed -- direct id reuse, same precedent as parasitology
// part2/part3's own within-lane concept reuse.
rootToId['liver-function-tests-afp-in-liver-cancer'] = 'CON-GIT-A71F14D56CE891'

// --- claims (only for concepts minted in this chunk) ---
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
  academicRelevance: 0.8,
  weightConfidence: 0.3,
  confidence: 0.8,
  claimIds: [c.claimId],
  originalWording: [],
  rejectedMergeCandidateIds: c.rejectedMergeCandidateIds || [],
  extraNotes: c.extraNotes || [],
})).join('\n---\n\n')

writeFileSync(
  'docs/Helwan-Source-Imports/concept/HU-GIT-301-biochemistry-concepts.md',
  `<!--\n  HU-GIT-301 biochemistry (scripts/helwan/extract/HU-GIT-301/mcq-bank-biochemistry.json,\n  24 items across two department-book chapters: "Biochemistry of Digestion\n  and Absorption" and "Liver Metabolism and Fatty Liver"). This is the\n  module's only biochemistry chunk and closes HU-GIT-301's entire authoring\n  backlog. ${CONCEPTS.length} new concepts, minted GIT-system (23 keys\n  covered: 21 net-new + 2 reused, since chapter-1 items #14/#15 share one\n  key/concept). find-existing.mjs was run against every distinctive term in\n  this chunk (trypsin, pepsin, chylomicron, lactase, GLUT-2, GLUT-5,\n  SGLT-1, gluten, AFP, prothrombin time, fatty liver, lipotropic, coeliac\n  disease, pancreatic lipase, gastric lipase, steatorrhoea, nucleoprotein,\n  hormone-sensitive lipase, apo C-II) -- the flagged Kasr 206-DIG/GIT\n  biochemistry reuse family surfaced 8 real live/pending hits. Two are\n  exact-scope reuses, not twins (see the build script's reuse map): item 9\n  (chylomicrons) reuses a pending Kasr 103-BMS concept via a sparse\n  pending-live overlay row; item 22 (AFP in liver cancer) reuses this\n  lane's own pathology-ch2 concept directly. The other six real hits (three\n  pepsin concepts, two trypsin concepts, one nucleoprotein concept, two\n  fatty-liver-cause concepts, two lipotropic-factor concepts, one\n  apo-C-II/lipoprotein-lipase concept, one hormone-sensitive-lipase\n  concept) are near-misses at a different scope or altitude from this\n  chunk's specific tested facts (mostly "except"/exception framings not\n  covered by the narrower live/pending records) -- documented in each\n  concept's rejected_merge_candidate_ids rather than merged; see each\n  concept's field_notes for the specific reasoning. This closes HU-GIT-301's\n  parasitology+biochemistry backlog entirely -- the module has no remaining\n  authored-content gap in the 281-key triage.\n-->\n\n${conceptMd}\n`,
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
  'docs/Helwan-Source-Imports/evidence/HU-GIT-301-biochemistry-claims.md',
  `<!--\n  Claims only, no citations: the Helwan GIT-301 biochemistry-cluster sources\n  are not yet registered in\n  docs/medical-library-program/evidence/corpus-source-index.json (ruling\n  2026-08-22 #2, not yet executed for Year 3) -- a citation naming a\n  self-derived src_ id here would trip "is not a source the corpus\n  contains". Each claim lands needs_evidence, which is the honest state; the\n  underlying fact is cited in source_citation on the covering question per\n  12-resources.md's fallback option 3.\n-->\n\n${claimsMd}`,
)

// --- pending-live overlay for the chylomicron reuse (item 9) ---
mkdirSync('docs/Helwan-Source-Imports/pending-live', { recursive: true })
writeFileSync(
  'docs/Helwan-Source-Imports/pending-live/HU-GIT-301-biochemistry-questions.md',
  `<!--\n  INDEX: apply this file's row only after its named dependency is live.\n\n  CON-GIT-33EAF87333AAD5 (chylomicron/VLDL transport function) --\n  dependency: docs/Kasr-Source-Imports/concept/103-BMS-biochemistry-concepts.md.\n  That concept is authored but not yet imported; this sparse update (+hu,\n  +HU_Y3, +HU-GIT-301) must be applied after the Kasr file lands live,\n  never before, or the importer creates a near-empty stub under this id per\n  00-START-HERE §2's stub-create guard.\n-->\n\n# Item\n\n## id\nCON-GIT-33EAF87333AAD5\n\n## label\nChylomicrons carry dietary triacylglycerol out of the gut; VLDL carries hepatic triacylglycerol out of the liver\n\n## universities\n+hu\n\n## learner_years\n+3\n\n## modules\n+HU-GIT-301\n\n## module_subject\nHU-GIT-301 > Biochemistry > Digestion and Absorption\n\n## exam_weight_by_year\nHU_Y3=0.4\n\n## field_notes\nuniversities: Adding hu/HU_Y3/HU-GIT-301 as an overlay; this id is not yet live -- written to pending-live with an apply-after header naming its dependency file, per 00-START-HERE §4. The existing definition already fully covers this item's tested fact (dietary fat is transported in blood as chylomicrons); no content change needed, tags only.\n`,
)

// --- article (new standalone file) ---
const relatedConcepts = CONCEPTS.map((c) => c.id).concat([rootToId['dietary-lipid-transport-chylomicrons'], rootToId['liver-function-tests-afp-in-liver-cancer']])
const sections = [
  '### Definition',
  'The GIT-301 biochemistry curriculum covers two department-book chapters: digestion and absorption biochemistry (carbohydrate, fat and protein digestion, and the specific transporters/enzymes/cofactors involved) and liver metabolism/fatty liver biochemistry (the mechanisms of hepatic steatosis, lipotropic factors, and the biochemical tests used to assess liver function).',
  '',
  '### Mechanism',
  '### Digestion and absorption',
  'Carbohydrate digestion proceeds from salivary/pancreatic amylase (starch to oligosaccharides/disaccharides) to brush-border disaccharidases (lactase, sucrase, maltase), with absorption via SGLT-1 (apical glucose/galactose, sodium-coupled), GLUT-5 (apical fructose) and GLUT-2 (basolateral exit of all three sugars) -- GLUT-4 is notably absent from the intestinal epithelium, being restricted to muscle and adipose tissue instead. Fat digestion depends on bile-salt emulsification, pancreatic lipase (needing colipase, bile salts and phospholipids, but not apo C-II, which is lipoprotein lipase\'s cofactor instead), and gastric lipase, which is of particular significance in infants. Absorbed dietary fat is packaged into chylomicrons for blood transport. Protein digestion proceeds through pepsin (an endopeptidase activated from pepsinogen by HCl) and the pancreatic endopeptidases trypsin (activated by enteropeptidase, specific for arginine/lysine) and its downstream-activated partners, each with distinct, non-overlapping substrate specificities. Dietary nucleoproteins are digested by pancreatic/intestinal (not gastric) enzymes, and the resulting purines/pyrimidines are poorly absorbed.',
  '',
  '### Liver metabolism and fatty liver',
  'Fatty liver results from an imbalance favouring hepatic triacylglycerol accumulation: over-mobilisation of adipose fat, decreased apolipoprotein synthesis, or decreased phospholipids for lipoprotein synthesis, but not increased fatty acid oxidation, which would instead reduce accumulation. Lipotropic factors (essential fatty acids, methionine, folic acid) protect against this by supporting lipoprotein export; chloroform is not lipotropic, being directly hepatotoxic instead. Alcoholic fatty liver follows ethanol oxidation raising the hepatic NADH/NAD+ ratio, which decreases fatty acid oxidation and promotes fat accumulation. Liver function is assessed by complementary marker types: prothrombin time and concentration for synthetic function, transaminases (ALT/AST) for hepatocellular damage, and AFP as a hepatocellular carcinoma tumour marker -- each reflecting a different aspect of liver biology, not interchangeable evidence of the same process. Gamma-globulins are a specific exception to the liver\'s otherwise broad plasma-protein-synthesis role, being produced by plasma cells instead.',
  '',
  '### Key determinants',
  'Many items in this chunk are "except"/"which is incorrect" stems: separate the options that are genuinely true from the one false statement before selecting an answer, and track which specific enzyme, transporter or marker a fact belongs to -- this chunk frequently tests near-miss confusions (SGLT-1 vs GLUT-4 tissue distribution, pancreatic lipase vs lipoprotein lipase cofactors, endopeptidase vs exopeptidase classification, transaminases vs AFP vs prothrombin time as different liver-test categories).',
  '',
  '### Clinical significance',
  'These digestion, absorption and liver-function biochemistry facts underpin the clinical interpretation of malabsorption syndromes (lactose intolerance, coeliac disease, steatorrhoea) and liver function test panels, both directly examinable and clinically applied decisions. Every linked record remains Draft pending independent review.',
  '',
  '### Exam approach',
  'For an "except"/"which is incorrect" stem, first identify which options share a true, well-established fact, then select the one option that breaks the pattern -- watch particularly for direction-of-effect reversals (increased vs decreased fatty acid oxidation, increased vs decreased NADH/NAD ratio), which are this chunk\'s most common trap. When two enzymes or transporters share a superficially similar role (pancreatic lipase vs lipoprotein lipase, SGLT-1 vs GLUT-4, pepsin vs trypsin), confirm which specific compartment or tissue the question is asking about before selecting an answer.',
].join('\n')

const articleMd = renderArticle({
  id: ARTICLE_ID,
  title: 'GIT 301 biochemistry: Digestion, absorption and liver metabolism',
  arabicTitle: 'كيمياء حيوية الجهاز الهضمي: الهضم والامتصاص وأيض الكبد',
  subject: 'gi',
  topic: TOPIC,
  subtopic: SUBTOPIC,
  primaryNodeId: PRIMARY_NODE,
  templateId: 'TPL-CONCEPT',
  archetype: 'concept',
  readingTime: 18,
  highYield: 'High',
  summary: 'The department biochemistry MCQ bank\'s two chapters: digestion/absorption biochemistry (carbohydrate, fat and protein digestion enzymes/transporters/cofactors) and liver metabolism/fatty liver biochemistry (hepatic steatosis mechanisms, lipotropic factors, liver function test interpretation).',
  sections,
  relatedConcepts,
  moduleSubject: ['HU-GIT-301 > Biochemistry > Digestion and Absorption', 'HU-GIT-301 > Biochemistry > Liver Metabolism and Fatty Liver'],
  universityNotes: 'hu: Restricted to HU-GIT-301 Year 3. Sourced from the department biochemistry MCQ bank (scripts/helwan/extract/HU-GIT-301/mcq-bank-biochemistry.json); no official past-paper key is involved.',
  claimIds: CONCEPTS.map((c) => c.claimId),
})

mkdirSync('docs/Helwan-Source-Imports/article', { recursive: true })
writeFileSync('docs/Helwan-Source-Imports/article/HU-GIT-301-biochemistry-articles.md', `${articleMd}\n`)

// --- MCQ seed ---
const chapterLabel = (chapter) => (chapter === 'Biochemistry of Digestion and Absorption' ? 'Digestion and Absorption' : 'Liver Metabolism and Fatty Liver')

const questions = items.map((it, idx) => {
  const seqNum = idx + 1
  const q = QUESTIONS_BIOCHEM[seqNum]
  if (!q) throw new Error(`no explanations authored for biochemistry item #${seqNum}`)
  const conceptId = rootToId[q.root]
  if (!conceptId) throw new Error(`no concept id for root ${q.root} (item #${seqNum})`)
  const explanations = {}
  for (const [letter, text] of Object.entries(q.explanations)) explanations[letter.toUpperCase()] = text
  const options = {}
  for (const [letter, text] of Object.entries(it.options)) options[letter.toUpperCase()] = text
  const fieldNotes = { keySource: "printed key rendered from pp.3 and 5's answer-key tables (not OCR'd, which mis-transcribes both tables)" }
  if (seqNum === 9) fieldNotes.conceptReuse = 'main_concept reused from a pending Kasr 103-BMS concept (CON-GIT-33EAF87333AAD5) via a sparse pending-live overlay row (docs/Helwan-Source-Imports/pending-live/HU-GIT-301-biochemistry-questions.md), applied only after that concept lands live.'
  if (seqNum === 22) fieldNotes.conceptReuse = "main_concept reused directly from this lane's own HU-GIT-301-pathology-ch2-concepts.md (CON-GIT-A71F14D56CE891, hepatocellular-carcinoma.afp-marker) -- same module already, no overlay needed."
  return {
    key: it.tested_concept_key,
    id: `QST-HUGIT301-BIOCHEM-Q${String(seqNum).padStart(2, '0')}`,
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
    source_citation: `HU-GIT-301 Biochemistry MCQ bank ("${it.chapter}" chapter, ${chapterLabel(it.chapter)}), lettered item #${it.num}, p.${it.page}; answer key rendered from the bank's own pp.3/5 key tables, not OCR text.`,
    field_notes: fieldNotes,
  }
})

mkdirSync('coverage/seeds/HU-GIT-301', { recursive: true })
const seed = {
  lane: 'HU-GIT-301',
  cluster: 'biochemistry',
  header: 'HU-GIT-301 · Biochemistry (Digestion/Absorption + Liver Metabolism and Fatty Liver), authored from the department biochemistry MCQ bank, keys rendered from the bank’s own printed pp.3/5 answer-key tables.',
  defaults: {
    subject: 'gi',
    status: 'Draft',
    owner: 'Helwan Year-3 authoring lane',
    universities: ['hu'],
    years: ['HU_Y3'],
    module: 'HU-GIT-301',
    module_subject: 'HU-GIT-301 > Biochemistry > Digestion and Absorption',
    exam_weight_by_year: { HU_Y3: 0.4 },
    question_only_for: '',
    library_ids: [ARTICLE_ID],
    resource_ids: [],
    setting: 'Academic',
    estimated_seconds: 60,
    randomise_answers: true,
    cognitive_effort: 'Medium',
    reasoning_level: 2,
    learning_objective: 'Apply the correct digestion/absorption or liver-metabolism biochemistry fact to select the accepted (or, in an "except" stem, the excepted) statement.',
  },
  questions,
}
writeFileSync('coverage/seeds/HU-GIT-301/biochemistry.json', JSON.stringify(seed, null, 2))

console.log(`concepts: ${CONCEPTS.length} new (+2 reused: 1 pending-live overlay, 1 same-lane direct)`)
console.log(`questions: ${questions.length}`)
