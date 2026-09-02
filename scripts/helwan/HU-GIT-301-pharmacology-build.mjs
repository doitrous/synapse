// Builds HU-GIT-301 pharmacology output:
//   docs/Helwan-Source-Imports/concept/HU-GIT-301-pharmacology-concepts.md
//   docs/Helwan-Source-Imports/evidence/HU-GIT-301-pharmacology-claims.md
//   docs/Helwan-Source-Imports/article/HU-GIT-301-pharmacology-articles.md
//   coverage/seeds/HU-GIT-301/pharmacology-part1.json  (shared Q40 + pharm items 1-29, 30 questions)
//   coverage/seeds/HU-GIT-301/pharmacology-part2.json  (pharm items 30-52, 23 questions)
// Concepts/claims/article are authored once, covering the whole cluster;
// the question seed is split into two ~30-question commits per the lane
// card's increment instruction.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { mintConceptId, renderConcept, renderClaim, renderArticle } from './HU-GIT-301-render.mjs'
import { CONCEPTS, TOPIC, SUBTOPIC, PRIMARY_NODE, ARTICLE_ID } from './HU-GIT-301-pharmacology-data.mjs'
import { QUESTIONS_PHARM } from './HU-GIT-301-pharmacology-questions.mjs'

const pharmBank = JSON.parse(readFileSync('scripts/helwan/extract/HU-GIT-301/mcq-bank-pharmacology.json', 'utf8'))
const sharedBank = JSON.parse(readFileSync('scripts/helwan/extract/HU-GIT-301/mcq-bank-shared-triage.json', 'utf8'))
const sharedQ40 = sharedBank.claimed_by_this_lane[0]

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
  conceptType: 'mechanism',
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
  academicRelevance: 0.7,
  weightConfidence: 0.3,
  confidence: 0.8,
  claimIds: [c.claimId],
  originalWording: [],
  rejectedMergeCandidateIds: c.rejectedMergeCandidateIds || [],
  extraNotes: [
    ...(c.microtopicNote ? [] : []),
    ['primaryNodeId', 'DIS-PHA-T07 follows the GIT-system topic-node numbering used by this lane\'s pathology clusters (DIS-PAT-T07); no separate pharmacology node catalogue entry was found to verify against, so the number is carried across registers rather than invented fresh.'],
    ...(c.rejectedMergeNote ? [['rejectedMergeCandidateIds', c.rejectedMergeNote]] : []),
  ],
})).join('\n---\n\n')

writeFileSync(
  'docs/Helwan-Source-Imports/concept/HU-GIT-301-pharmacology-concepts.md',
  `<!--\n  HU-GIT-301 pharmacology (scripts/helwan/extract/HU-GIT-301/mcq-bank-pharmacology.json,\n  52 items, plus the one shared-bank item this lane claimed — Q40 of\n  mcq-bank-shared-triage.json, an omeprazole mechanism item reused here\n  rather than minting a second proton-pump-inhibitor concept). 22 new\n  concepts, minted GIT-system. Search performed via find-existing.mjs before\n  every mint; one near-miss (three live GIT-system "purgatives" concepts,\n  canonical_key teaching.pharm23.*, a mild-laxative/potent-cathartic\n  classification) recorded in rejected_merge_candidate_ids on the\n  purgatives-and-laxatives concept below, with reasoning.\n-->\n\n${conceptMd}\n`,
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
  'docs/Helwan-Source-Imports/evidence/HU-GIT-301-pharmacology-claims.md',
  `<!--\n  Claims only, no citations: the Helwan GIT-301 pharmacology-cluster sources\n  are not yet registered in\n  docs/medical-library-program/evidence/corpus-source-index.json (ruling\n  2026-08-22 #2, not yet executed for Year 3) — a citation naming a\n  self-derived src_ id here would trip "is not a source the corpus\n  contains". Each claim lands needs_evidence, which is the honest state; the\n  underlying fact is cited in source_citation on the covering question per\n  12-resources.md's fallback option 3.\n-->\n\n${claimsMd}`,
)

// --- article ---
const relatedConcepts = CONCEPTS.map((c) => c.id)
const sections = [
  '### Definition',
  'The GIT 301 pharmacology chapter covers the drugs used for gastrointestinal motility, secretory and biliary disorders: antiemetics and prokinetics, purgatives and antidiarrhoeals, acid-suppressing drugs and H. pylori eradication regimens, mucosal protective and other anti-ulcer drugs, antacids, antispasmodics, gallstone-dissolution therapy, and the drugs used for inflammatory bowel disease and hepatic encephalopathy.',
  '',
  '### Mechanism',
  '### Antiemetics and prokinetics',
  'Dimenhydrinate, an antihistamine, is the drug of choice for motion sickness, acting on the vestibular pathway. Metoclopramide is a dopamine D2 antagonist with dual antiemetic and prokinetic action, useful in diabetic gastroparesis. Ondansetron and granisetron are 5-HT3 receptor antagonists for chemotherapy-induced nausea and vomiting, often paired with a corticosteroid adjunct such as dexamethasone; ondansetron is not the standard choice for motion sickness or pregnancy-related vomiting. Apomorphine is a dopamine agonist that induces, rather than controls, vomiting.',
  '',
  '### Purgatives and antidiarrhoeals',
  'Purgatives are physical (liquid paraffin, which risks fat-soluble vitamin malabsorption with chronic use), osmotic, or irritant (castor oil, acting by increasing peristalsis); they are contraindicated in gastroenteritis. Antidiarrhoeal treatment uses antimicrobials, fluid replacement, adsorbents (kaolin) and opioid-derived antimotility drugs (loperamide, diphenoxylate); a cholinergic/muscarinic stimulant such as neostigmine would worsen, not treat, diarrhoea, and indapamide is simply a diuretic. Loperamide, related to meperidine but with poor CNS penetration, is available over the counter and is the standard choice for travellers’ diarrhoea. Codeine causes constipation, not diarrhoea. In children, diarrhoea is managed chiefly by fluid and electrolyte correction, not by antimotility drugs.',
  '',
  '### Acid-suppressing drugs and H. pylori eradication',
  'Omeprazole, a proton pump inhibitor, irreversibly blocks the parietal cell H+/K+-ATPase, giving the most complete acid suppression, used for full acid suppression in severe GERD and for Zollinger-Ellison syndrome. H2-receptor blockers (famotidine, ranitidine) block histamine H2 receptors; famotidine promotes duodenal ulcer healing and ranitidine is used for relapse-prevention maintenance therapy. Cimetidine, an H2 (not H1) blocker, can cause mental confusion, hepatic dysfunction and gynaecomastia, and its cytochrome P450 inhibition raises serum levels of theophylline, warfarin, quinidine and phenytoin. H. pylori eradication uses triple therapy — a PPI plus clarithromycin and amoxicillin — not rifampicin.',
  '',
  '### Other anti-ulcer drugs, antacids and antispasmodics',
  'Sucralfate, pirenzepine and bismuth salts treat peptic ulcer; corticosteroids do not, and instead predispose to ulcers. Colloidal bismuth, a mucosal protective agent, causes harmless black staining of the mouth and stool. Magnesium antacids cause diarrhoea and aluminium antacids cause constipation, so combination products pair them; sodium bicarbonate, a systemic antacid, risks acid rebound and bleeding with repeated use; aluminium hydroxide binds dietary phosphate, useful in renal failure; antacids act fastest but briefest among anti-ulcer drug classes. Direct (musculotropic) spasmolytics — mebeverine, papaverine, aminophylline — act on smooth muscle directly, unlike the anticholinergic atropine. Helicobacter pylori infection is the strongest risk factor for peptic ulcer complications.',
  '',
  '### Biliary, bowel and hepatic drugs',
  'Chenodeoxycholic acid can dissolve cholesterol gallstones by lowering biliary cholesterol saturation. Sulfasalazine, combining sulfapyridine and 5-ASA, treats inflammatory bowel disease. Misoprostol, a prostaglandin E1 analogue, prevents GI ulcers during long-term NSAID therapy. Lactulose, at relatively high dose, relieves hepatic (portosystemic) encephalopathy by trapping ammonia in the colon.',
  '',
  '### Key determinants',
  'As in the pathology chapters, separate an "except"/"not" stem\'s true statements from its one false one, and track which specific mechanism, receptor, or indication each item swaps — H1 vs H2, direct vs anticholinergic, osmotic vs irritant vs physical, or one drug\'s established indication against a superficially similar one.',
  '',
  '### Clinical significance',
  'These drug classes underlie the routine management of nausea and vomiting, diarrhoea and constipation, peptic ulcer disease and GERD, gallstones, inflammatory bowel disease and hepatic encephalopathy that a Year-3 student will prescribe for on the ward. Every linked record remains Draft pending independent review.',
  '',
  '### Exam approach',
  'For a vignette-style item (patient scenario rather than a bare drug-fact stem), first identify the clinical indication being described, then match it to the one drug among the options whose established mechanism and use fits that indication precisely. The printed bank key stands as printed throughout this cluster; no key was overridden.',
].join('\n')

const articleMd = renderArticle({
  id: ARTICLE_ID,
  title: 'GIT 301 pharmacology: drugs for GI motility, secretory and biliary disorders',
  arabicTitle: 'أدوية اضطرابات حركة الجهاز الهضمي والإفراز والقنوات الصفراوية',
  subject: 'gi',
  topic: TOPIC,
  subtopic: SUBTOPIC,
  primaryNodeId: PRIMARY_NODE,
  templateId: 'TPL-CONCEPT',
  archetype: 'concept',
  readingTime: 18,
  highYield: 'High',
  summary: 'A survey of the GI pharmacology tested by the HU-GIT-301 department pharmacology MCQ bank, plus one shared-bank item, from antiemetics and prokinetics through purgatives, antidiarrhoeals, acid-suppressing drugs and H. pylori eradication to antacids, gallstone dissolution therapy, inflammatory bowel disease drugs and hepatic encephalopathy treatment.',
  sections,
  relatedConcepts,
  moduleSubject: ['HU-GIT-301 > Pharmacology > Drugs for GI motility, secretory and biliary disorders'],
  claimIds: CONCEPTS.map((c) => c.claimId),
  universityNotes: 'hu: Restricted to HU-GIT-301 Year 3. Sourced from the department pharmacology MCQ bank triage (scripts/helwan/extract/HU-GIT-301/mcq-bank-pharmacology.json) plus the one item this lane claimed from the shared 3rd-year GIT bank (mcq-bank-shared-triage.json, Q40); no official past-paper key is involved.',
})

mkdirSync('docs/Helwan-Source-Imports/article', { recursive: true })
writeFileSync('docs/Helwan-Source-Imports/article/HU-GIT-301-pharmacology-articles.md', `${articleMd}`)

// --- MCQ seeds (full list, then sliced into two commits) ---
function buildQuestion(it, q, idSuffix, citationChapterLabel, keySourceNote) {
  const conceptId = rootToId[q.root]
  if (!conceptId) throw new Error(`no concept id for root ${q.root} (item ${idSuffix})`)
  const explanations = {}
  for (const [letter, text] of Object.entries(q.explanations)) explanations[letter.toUpperCase()] = text
  const options = {}
  for (const [letter, text] of Object.entries(it.options)) options[letter.toUpperCase()] = text
  return {
    key: it.tested_concept_key,
    id: `QST-HUGIT301-PHARMACOLOGY-Q${idSuffix}`,
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
    question_type: 'Pharmacology',
    source_citation: `${citationChapterLabel}, item #${it.num}, p.${it.page}; ${keySourceNote}`,
    field_notes: { keySource: keySourceNote },
  }
}

const sharedQuestion = buildQuestion(
  sharedQ40,
  QUESTIONS_PHARM.SHARED40,
  '40S',
  'HU-GIT-301 shared 3rd-year GIT MCQ bank ("MCQs - 3rd Year - GIT MCQ .pdf"), claimed by this lane as a pharmacology item (drug mechanism/site of action)',
  "printed key transcribed cleanly from the bank's own p.11 (native text, no rendering needed)",
)

const pharmQuestions = pharmBank.items.map((it) => {
  const q = QUESTIONS_PHARM[it.num]
  if (!q) throw new Error(`no explanations authored for pharmacology item #${it.num}`)
  return buildQuestion(
    it,
    q,
    String(it.num).padStart(2, '0'),
    'HU-GIT-301 Pharmacology MCQ bank ("MCQs - Pharma MCQ [GIT].pdf")',
    "printed key table rendered from the bank's own p.8 ('G.I.T. KEY ANSWERS'), not OCR text, which is unreadable noise",
  )
})

const allQuestions = [sharedQuestion, ...pharmQuestions]
const part1 = allQuestions.slice(0, 30) // shared Q40 + pharm items #1-29
const part2 = allQuestions.slice(30) // pharm items #30-52

function writeSeed(cluster, header, questions, path) {
  mkdirSync('coverage/seeds/HU-GIT-301', { recursive: true })
  const seed = {
    lane: 'HU-GIT-301',
    cluster,
    header,
    defaults: {
      subject: 'gi',
      status: 'Draft',
      owner: 'Helwan Year-3 authoring lane',
      universities: ['hu'],
      years: ['HU_Y3'],
      module: 'HU-GIT-301',
      module_subject: 'HU-GIT-301 > Pharmacology > Drugs for GI motility, secretory and biliary disorders',
      exam_weight_by_year: { HU_Y3: 0.4 },
      question_only_for: '',
      library_ids: [ARTICLE_ID],
      resource_ids: [],
      setting: 'Clinical',
      estimated_seconds: 75,
      randomise_answers: true,
      cognitive_effort: 'Medium',
      reasoning_level: 2,
      learning_objective: 'Apply the correct GI pharmacology fact — mechanism, indication, adverse effect or classification — to select the accepted (or, in an "except"/"not" stem, the excepted) statement.',
    },
    questions,
  }
  writeFileSync(path, JSON.stringify(seed, null, 2))
}

writeSeed(
  'pharmacology-part1',
  'HU-GIT-301 · Pharmacology — Part 1 (shared-bank item #40 plus items #1-29), authored from the department pharmacology MCQ bank and the shared 3rd-year GIT bank.',
  part1,
  'coverage/seeds/HU-GIT-301/pharmacology-part1.json',
)
writeSeed(
  'pharmacology-part2',
  'HU-GIT-301 · Pharmacology — Part 2 (items #30-52), authored from the department pharmacology MCQ bank.',
  part2,
  'coverage/seeds/HU-GIT-301/pharmacology-part2.json',
)

console.log(`concepts: ${CONCEPTS.length} new`)
console.log(`questions: part1=${part1.length} part2=${part2.length} total=${allQuestions.length}`)
