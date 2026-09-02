// Builds HU-GIT-301 pathology Chapter 1 output:
//   docs/Helwan-Source-Imports/concept/HU-GIT-301-pathology-concepts.md   (new concepts + fap live update)
//   docs/Helwan-Source-Imports/evidence/HU-GIT-301-pathology-claims.md   (claims, no citations — see field_notes)
//   docs/Helwan-Source-Imports/article/HU-GIT-301-articles.md            (chapter-1 article, created here)
//   docs/Helwan-Source-Imports/pending-live/HU-GIT-301-questions.md      (carcinoid pending overlay, created here)
//   coverage/seeds/HU-GIT-301/pathology-ch1.json                        (MCQ seed for emit-mcq.mjs)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { mintConceptId, renderConcept, renderConceptUpdate, renderClaim, renderArticle } from './HU-GIT-301-render.mjs'
import { CONCEPTS, UPDATES, TOPIC, SUBTOPIC, PRIMARY_NODE, ARTICLE_ID } from './HU-GIT-301-pathology-ch1-data.mjs'
import { QUESTIONS_CH1 } from './HU-GIT-301-pathology-ch1-questions.mjs'

const bank = JSON.parse(readFileSync('scripts/helwan/extract/HU-GIT-301/mcq-bank-pathology.json', 'utf8'))
const ch1Items = bank.items.filter((it) => it.chapter.startsWith('Diseases'))

// --- mint ids, build root -> id map ---
const rootToId = {}
for (const c of CONCEPTS) {
  c.id = mintConceptId('GIT', c.canonicalKey)
  rootToId[c.root] = c.id
}
rootToId['fap'] = UPDATES.fap.id
rootToId['carcinoid'] = UPDATES.carcinoid.id

// --- claims ---
let claimSeq = 0
for (const c of CONCEPTS) {
  claimSeq += 1
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
  clinicalRelevance: 0.55,
  academicRelevance: 0.75,
  weightConfidence: 0.3,
  confidence: 0.8,
  claimIds: [c.claimId],
  originalWording: [],
  rejectedMergeCandidateIds: c.rejectedMergeCandidateIds || [],
  extraNotes: c.rejectedMergeNote ? [['rejectedMergeCandidateIds', c.rejectedMergeNote]] : [],
})).join('\n---\n\n')

const fapUpdateMd = renderConceptUpdate({
  id: UPDATES.fap.id,
  label: UPDATES.fap.label,
  definition: UPDATES.fap.definition,
  objective: UPDATES.fap.objective,
  aliases: UPDATES.fap.aliases,
  universities: ['+hu'],
  learnerYears: '+3',
  modules: ['+HU-GIT-301'],
  moduleSubject: UPDATES.fap.moduleSubject,
  examWeightByYear: ['HU_Y3=0.4'],
  fieldNotes: UPDATES.fap.fieldNotes,
})

writeFileSync(
  'docs/Helwan-Source-Imports/concept/HU-GIT-301-pathology-concepts.md',
  `<!--\n  HU-GIT-301 pathology, Chapter 1: "Diseases of the Oral Cavity and the\n  Gastrointestinal Tract" (scripts/helwan/extract/HU-GIT-301/mcq-bank-pathology.json).\n  32 new concepts, minted GIT-system, plus one sparse update (FAP, live id\n  CON-GIT-BA1483A0234CCD) restating the full universities/years/modules union\n  per 00-START-HERE §4. Chapter 2 (Liver, GB and Pancreas) lands in a sibling\n  file. Search performed via find-existing.mjs before every mint; near-miss\n  reasoning recorded per-concept in rejected_merge_candidate_ids / field_notes.\n-->\n\n${conceptMd}\n---\n\n${fapUpdateMd}`,
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
  'docs/Helwan-Source-Imports/evidence/HU-GIT-301-pathology-claims.md',
  `<!--\n  Claims only, no citations: the Helwan GIT-301 pathology-cluster sources are\n  not yet registered in docs/medical-library-program/evidence/corpus-source-index.json\n  (ruling 2026-08-22 #2, "build scripts/helwan/build-source-index.ts", not yet\n  executed for Year 3) — a citation naming a self-derived src_ id here would\n  trip "is not a source the corpus contains". Each claim lands needs_evidence,\n  which is the honest state; the underlying fact is cited in source_citation\n  on the covering question per 12-resources.md's fallback option 3. See the\n  lane report BLOCKED line.\n-->\n\n${claimsMd}`,
)

// --- article (chapter 1) ---
const relatedConcepts = CONCEPTS.map((c) => c.id).concat([UPDATES.fap.id, UPDATES.carcinoid.id])
const sections = [
  '### Definition',
  'The gastrointestinal pathology curriculum for GIT 301 opens with the oral cavity, oesophagus, stomach and intestine: the epithelial and mesenchymal lesions of the mouth and salivary glands, the motor and inflammatory disease of the oesophagus, the injury and neoplastic patterns of the stomach, and the congenital, inflammatory, infective and neoplastic disease of the small and large bowel.',
  '',
  '### Mechanism',
  '### Oral cavity and salivary glands',
  'Chronic irritation produces leukoplakia, a premalignant white patch that transforms into squamous cell carcinoma. Tongue squamous cell carcinoma is predisposed to by tobacco, oncogenic HPV and tertiary syphilitic gumma. Sialadenitis follows an autoimmune mechanism in Sjögren syndrome or viral infection, chiefly mumps. Most salivary tumours arise in the parotid, and mucoepidermoid carcinoma is the commonest salivary malignancy.',
  '',
  '### Oesophagus',
  'Achalasia is loss of peristalsis with failure of lower oesophageal sphincter relaxation from myenteric plexus degeneration. Hiatus hernia is protrusion of the stomach through a lax oesophageal hiatus, driven by raised intra-abdominal pressure. Acute infective oesophagitis, in immunocompromised patients, is caused by Candida, HSV or CMV; the squamous papilloma is a benign HPV-associated growth.',
  '',
  '### Stomach',
  'Acute gastritis follows direct mucosal injury from alcohol, NSAIDs and cytotoxic drugs; H. pylori gastritis instead follows chronic complement- and neutrophil-mediated mucosal injury. Acute stress ulcers follow burns, sepsis or raised intracranial pressure. Peptic ulcer disease favours the duodenal cap and gastric antrum/lesser curve, with gastric ulcer pathogenesis weighted toward defence breakdown and duodenal ulcer toward acid excess. Gastric tumours split into epithelial (adenoma, carcinoma) and mesenchymal (leiomyoma, GIST, schwannoma) groups; GIST is the commonest abdominal mesenchymal tumour and carries a c-KIT mutation. Gastric carcinoma risk rises with autoimmune gastritis, H. pylori and a nitrate-rich diet, and gastric MALT lymphoma is H. pylori-driven.',
  '',
  '### Small and large intestine',
  "Meckel's diverticulum is a true, antimesenteric vitelline remnant. Hirschsprung disease is congenital distal aganglionosis presenting with failure to pass meconium. Intestinal obstruction is mechanical (a blocking lesion) or functional (paralytic ileus); chronic obstruction develops gradually from strictures, tumours or Hirschsprung disease, never from a strangulated hernia. Bacillary dysentery (Shigella) produces pseudomembranous colitis, distinct from amoebic dysentery's flask-shaped ulcers. Crohn's disease classically favours the terminal ileum, unlike ulcerative colitis's rectosigmoid pattern. Colonic diverticular disease is a false, pulsion diverticulum of the sigmoid colon in older adults. Colonic polyps are non-neoplastic (hyperplastic, hamartomatous, bilharzial) or the neoplastic adenomatous type, the precursor of most colorectal cancer though only a minority of individual adenomas progress. FAP is an autosomal dominant APC tumour-suppressor-gene disease requiring at least 100 polyps for classic diagnosis. GI lymphoma favours the small intestine over the colon; carcinoid tumour favours the appendix. Acute appendicitis follows luminal obstruction, chiefly in the young. Colorectal carcinoma is staged by the modified Dukes (Astler-Coller) system, combining depth of invasion with nodal status. Duodenal ulcer may signal an underlying gastrinoma, and upper GI bleeding (duodenal ulcer, varices, gastric carcinoma) presents as melena, unlike the haematochezia of piles.",
  '',
  '### Key determinants',
  'Separate an exception ("except") stem\'s three true statements from its one false statement before selecting an answer. Track which mechanism (autoimmune vs drug/toxin, acid-excess vs defence-breakdown, mechanical vs functional) each disease belongs to, since the bank tests these distinctions directly rather than isolated facts.',
  '',
  '### Clinical significance',
  'These patterns underlie the commonest oral, oesophageal, gastric and intestinal presentations a Year-3 student will be examined on and will later encounter on the ward: dysphagia, dyspepsia, GI bleeding, bowel obstruction and the work-up of a colonic mass. Every linked record remains Draft pending independent review.',
  '',
  '### Exam approach',
  "For an 'except' stem, first identify which three options share the same true claim, then select the one option that breaks the pattern. The printed bank key stands as printed throughout this cluster; no key was overridden.",
].join('\n')

const articleMd = renderArticle({
  id: ARTICLE_ID,
  title: 'GIT 301 pathology: oral cavity, oesophagus, stomach and intestine',
  arabicTitle: 'باثولوجيا الجهاز الهضمي: الفم والمريء والمعدة والأمعاء',
  subject: 'gi',
  topic: TOPIC,
  subtopic: SUBTOPIC,
  primaryNodeId: PRIMARY_NODE,
  templateId: 'TPL-CONCEPT',
  archetype: 'concept',
  readingTime: 18,
  highYield: 'High',
  summary: 'A survey of the oral cavity, oesophageal, gastric and intestinal pathology tested by the HU-GIT-301 department pathology MCQ bank’s first chapter, from leukoplakia and achalasia through peptic ulcer disease, GIST, inflammatory bowel disease, colonic polyps and FAP to colorectal carcinoma staging.',
  sections,
  relatedConcepts,
  moduleSubject: ['HU-GIT-301 > Pathology > Diseases of the Oral Cavity and the Gastrointestinal Tract'],
  claimIds: CONCEPTS.map((c) => c.claimId),
})

mkdirSync('docs/Helwan-Source-Imports/article', { recursive: true })
writeFileSync('docs/Helwan-Source-Imports/article/HU-GIT-301-articles.md', `${articleMd}`)

// --- pending-live overlay (carcinoid, id not yet live) ---
const carcinoidMd = renderConceptUpdate({
  id: UPDATES.carcinoid.id,
  label: UPDATES.carcinoid.label,
  definition: UPDATES.carcinoid.definition,
  objective: UPDATES.carcinoid.objective,
  aliases: UPDATES.carcinoid.aliases,
  universities: ['+hu'],
  learnerYears: '+3',
  modules: ['+HU-GIT-301'],
  moduleSubject: UPDATES.carcinoid.moduleSubject,
  examWeightByYear: ['HU_Y3=0.4'],
  fieldNotes: UPDATES.carcinoid.fieldNotes,
})
mkdirSync('docs/Helwan-Source-Imports/pending-live', { recursive: true })
writeFileSync(
  'docs/Helwan-Source-Imports/pending-live/HU-GIT-301-questions.md',
  `<!--\n  INDEX: apply this file's rows only after their named dependency is live.\n\n  CON-GIT-4952149F99782D (carcinoid tumour) — dependency:\n  docs/Kasr-Source-Imports/concept/103-BMS-mcq-aromatic-concepts.md. That\n  concept is authored but not yet imported; this sparse update (+hu, +HU_Y3,\n  +HU-GIT-301, plus the appendix-site fact) must be applied after the Kasr\n  file lands live, never before, or the importer creates a near-empty stub\n  under this id per 00-START-HERE §2's stub-create guard.\n-->\n\n${carcinoidMd}`,
)

// --- MCQ seed ---
const questions = ch1Items.map((it) => {
  const q = QUESTIONS_CH1[it.num]
  if (!q) throw new Error(`no explanations authored for item #${it.num}`)
  const conceptId = rootToId[q.root]
  if (!conceptId) throw new Error(`no concept id for root ${q.root} (item #${it.num})`)
  const explanations = {}
  for (const [letter, text] of Object.entries(q.explanations)) explanations[letter.toUpperCase()] = text
  const options = {}
  for (const [letter, text] of Object.entries(it.options)) options[letter.toUpperCase()] = text
  return {
    key: it.tested_concept_key,
    id: `QST-HUGIT301-PATHOLOGYCH1-Q${String(it.num).padStart(2, '0')}`,
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
    question_type: 'Pathophysiology',
    source_citation: `HU-GIT-301 Pathology MCQ bank, "${it.chapter}" chapter, item #${it.num}, p.${it.page}; answer key rendered from the bank's own pp.21-22 (chapter 1 key table), not OCR text.`,
    field_notes: { keySource: "printed key table pp.21-22, rendered (not OCR'd, which garbles the table)" },
  }
})

mkdirSync('coverage/seeds/HU-GIT-301', { recursive: true })
const seed = {
  lane: 'HU-GIT-301',
  cluster: 'pathology-ch1',
  header: 'HU-GIT-301 · Pathology — Chapter 1 (Diseases of the Oral Cavity and the Gastrointestinal Tract), authored from the department pathology MCQ bank, keys rendered from the bank’s own printed pp.21-22.',
  defaults: {
    subject: 'gi',
    status: 'Draft',
    owner: 'Helwan Year-3 authoring lane',
    universities: ['hu'],
    years: ['HU_Y3'],
    module: 'HU-GIT-301',
    module_subject: 'HU-GIT-301 > Pathology > Diseases of the Oral Cavity and the Gastrointestinal Tract',
    exam_weight_by_year: { HU_Y3: 0.4 },
    question_only_for: '',
    library_ids: [ARTICLE_ID],
    resource_ids: [],
    setting: 'Academic',
    estimated_seconds: 75,
    randomise_answers: true,
    cognitive_effort: 'Medium',
    reasoning_level: 2,
    learning_objective: 'Apply the correct pathology fact to select the accepted (or, in an "except" stem, the excepted) statement.',
  },
  questions,
}
writeFileSync('coverage/seeds/HU-GIT-301/pathology-ch1.json', JSON.stringify(seed, null, 2))

console.log(`concepts: ${CONCEPTS.length} new + 1 live update (fap) + 1 pending update (carcinoid)`)
console.log(`questions: ${questions.length}`)
