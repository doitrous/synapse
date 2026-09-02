// Builds HU-GIT-301 pathology Chapter 2 output:
//   docs/Helwan-Source-Imports/concept/HU-GIT-301-pathology-ch2-concepts.md  (new concepts)
//   docs/Helwan-Source-Imports/evidence/HU-GIT-301-pathology-ch2-claims.md   (claims, no citations — see field_notes)
//   docs/Helwan-Source-Imports/article/HU-GIT-301-articles.md               (chapter-2 article, appended)
//   docs/Helwan-Source-Imports/pending-live/HU-GIT-301-questions.md         (steatosis/haemochromatosis overlays, appended)
//   coverage/seeds/HU-GIT-301/pathology-ch2.json                           (MCQ seed for emit-mcq.mjs)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { mintConceptId, renderConcept, renderConceptUpdate, renderClaim, renderArticle } from './HU-GIT-301-render.mjs'
import { CONCEPTS, UPDATES, TOPIC, SUBTOPIC, PRIMARY_NODE, ARTICLE_ID } from './HU-GIT-301-pathology-ch2-data.mjs'
import { QUESTIONS_CH2 } from './HU-GIT-301-pathology-ch2-questions.mjs'

const bank = JSON.parse(readFileSync('scripts/helwan/extract/HU-GIT-301/mcq-bank-pathology.json', 'utf8'))
const ch2Items = bank.items.filter((it) => it.chapter === 'Liver, GB and Pancreas')

// --- mint ids, build root -> id map ---
const rootToId = {}
for (const c of CONCEPTS) {
  c.id = mintConceptId('GIT', c.canonicalKey)
  rootToId[c.root] = c.id
}
rootToId['alcoholic-steatosis'] = UPDATES['alcoholic-steatosis'].id
rootToId['haemochromatosis'] = UPDATES.haemochromatosis.id

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
  clinicalRelevance: 0.55,
  academicRelevance: 0.75,
  weightConfidence: 0.3,
  confidence: 0.8,
  claimIds: [c.claimId],
  originalWording: [],
  rejectedMergeCandidateIds: c.rejectedMergeCandidateIds || [],
  extraNotes: c.rejectedMergeNote ? [['rejectedMergeCandidateIds', c.rejectedMergeNote]] : [],
})).join('\n---\n\n')

writeFileSync(
  'docs/Helwan-Source-Imports/concept/HU-GIT-301-pathology-ch2-concepts.md',
  `<!--\n  HU-GIT-301 pathology, Chapter 2: "Liver, GB and Pancreas"\n  (scripts/helwan/extract/HU-GIT-301/mcq-bank-pathology.json). 22 new\n  concepts, minted GIT-system. Two facts (alcoholic hepatic steatosis\n  mechanism, haemochromatosis pigmented cirrhosis) reuse near-exact pending\n  Kasr 108-INT pathology concepts via a sparse pending-live overlay instead\n  of minting twins — see docs/Helwan-Source-Imports/pending-live/HU-GIT-301-questions.md.\n  Search performed via find-existing.mjs before every mint; the one\n  near-miss (live GIT-system "purgatives" concepts, a different\n  classification scheme) is recorded on the pharmacology cluster's purgative\n  concept, not this file.\n-->\n\n${conceptMd}\n`,
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
  'docs/Helwan-Source-Imports/evidence/HU-GIT-301-pathology-ch2-claims.md',
  `<!--\n  Claims only, no citations: the Helwan GIT-301 pathology-cluster sources are\n  not yet registered in docs/medical-library-program/evidence/corpus-source-index.json\n  (ruling 2026-08-22 #2, not yet executed for Year 3) — a citation naming a\n  self-derived src_ id here would trip "is not a source the corpus\n  contains". Each claim lands needs_evidence, which is the honest state; the\n  underlying fact is cited in source_citation on the covering question per\n  12-resources.md's fallback option 3.\n-->\n\n${claimsMd}`,
)

// --- article (chapter 2) ---
const relatedConcepts = CONCEPTS.map((c) => c.id).concat([UPDATES['alcoholic-steatosis'].id, UPDATES.haemochromatosis.id])
const sections = [
  '### Definition',
  'The second GIT 301 pathology chapter covers the liver, gall bladder and pancreas: hepatic zonation and its ischaemic and toxic vulnerability, viral hepatitis, chronic hepatitis, liver abscess, granulomatous liver disease, alcoholic and metabolic liver disease, cirrhosis and its complications, hepatic and biliary neoplasms, gallstone disease, and chronic pancreatitis and pancreatic carcinoma.',
  '',
  '### Mechanism',
  '### Liver zonation and viral hepatitis',
  'Hepatic zone 3, farthest from the portal blood supply, is the zone most vulnerable to ischaemic injury. Among the hepatitis viruses, HDV is defective and requires HBV coinfection to replicate; HEV spreads enterically and carries a distinctive fulminant hepatitis risk in pregnancy; and HDV, unlike HAV, is capable of causing chronic disease, particularly through HBV superinfection. Viral infection is the commonest cause of chronic hepatitis overall, ahead of the named metabolic causes (alpha-1 antitrypsin deficiency, haemochromatosis, Wilson disease) — "cryptogenic" is a diagnosis of exclusion, not a metabolic cause in its own right.',
  '',
  '### Liver abscess and granulomatous disease',
  'Pyaemic (haematogenous) seeding produces multiple liver abscesses; acute cholangitic abscesses are themselves multiple small portal-tract abscesses. Tuberculosis, primary biliary cirrhosis and sarcoidosis are granulomatous liver diseases; NASH is not.',
  '',
  '### Alcoholic and metabolic liver disease',
  'Alcohol drives hepatic steatosis by decreasing fatty acid oxidation, increasing triglyceride synthesis, and impairing lipoprotein secretion (never by increasing oxidation). Haemochromatosis produces pigmented cirrhosis from progressive iron deposition. Budd-Chiari syndrome is hepatic vein thrombosis progressing through congestion and fibrosis to cirrhosis, a postsinusoidal cause of portal hypertension, distinct from the presinusoidal mechanism of schistosomal portal fibrosis and the sinusoidal mechanism of cirrhosis itself.',
  '',
  '### Cirrhosis, portal hypertension and hepatobiliary neoplasms',
  "A cirrhotic regeneration nodule shows disordered architecture, not the normal liver's regular, one-cell-thick radiating plate; alcoholic cirrhosis spans micronodular through mixed patterns. Primary biliary cirrhosis predominantly affects middle-aged women. Liver cell adenoma is a benign hepatocyte tumour linked to oral contraceptive use. Hepatocellular carcinoma is marked by AFP; cholangiocarcinoma, arising from the biliary tree and linked to primary sclerosing cholangitis, HCV and thorotrast, is not, and carries CA19-9 instead. Hepatoblastoma is an embryonic hepatocyte tumour that can secrete AFP; vinyl chloride and arsenic are linked to angiosarcoma, not hepatoblastoma. Chronic biliary obstruction, liver tumours and liver granulomas cause chronic liver failure; Reye's syndrome is an acute, unrelated process.",
  '',
  '### Gall bladder and pancreas',
  'Cholesterol gallstones follow obesity, diabetes and pregnancy; pigment stones follow haemolytic anaemia; either can be complicated by secondary biliary cirrhosis. Alcohol is the commonest cause of chronic pancreatitis, acting by increasing (not decreasing) ductal protein secretion to form calcifying plugs, and its complications are malabsorption, diabetes mellitus and pseudocyst formation. Most pancreatic carcinomas arise in the head of the gland, presenting with jaundice, weight loss and back pain. A pancreatic pseudocyst, unlike a true cystic neoplasm, has no true epithelial lining. Peritoneal carcinomatosis is commonly derived from ovarian and pancreatic adenocarcinoma.',
  '',
  '### Key determinants',
  'As in Chapter 1, separate an "except"/"not true" stem\'s true statements from its one false one before answering. Track which specific classification or mechanism each item tests — cirrhosis type, portal hypertension level, tumour marker, or complication category — since the bank often pairs a genuinely true fact with one deliberately swapped detail (a wrong marker, a wrong sex predominance, a wrong direction of a mechanism).',
  '',
  '### Clinical significance',
  'These liver, biliary and pancreatic patterns underlie jaundice, chronic liver disease, portal hypertension, gallstone disease and the pancreatic causes of abdominal pain and malabsorption that a Year-3 student will meet on the ward. Every linked record remains Draft pending independent review.',
  '',
  '### Exam approach',
  "For a 'not true'/'incorrect' stem, identify the three genuinely true statements first, then confirm the remaining option by checking it against the specific fact (marker, sex, mechanism direction, classification level) it swaps. The printed bank key stands as printed throughout this cluster; no key was overridden.",
].join('\n')

const articleMd = renderArticle({
  id: ARTICLE_ID,
  title: 'GIT 301 pathology: liver, gall bladder and pancreas',
  arabicTitle: 'باثولوجيا الجهاز الهضمي: الكبد والمرارة والبنكرياس',
  subject: 'gi',
  topic: TOPIC,
  subtopic: SUBTOPIC,
  primaryNodeId: PRIMARY_NODE,
  templateId: 'TPL-CONCEPT',
  archetype: 'concept',
  readingTime: 16,
  highYield: 'High',
  summary: 'A survey of the liver, gall bladder and pancreatic pathology tested by the HU-GIT-301 department pathology MCQ bank’s second chapter, from hepatic zonation and viral hepatitis through cirrhosis, hepatobiliary neoplasms and gallstone disease to chronic pancreatitis and pancreatic carcinoma.',
  sections,
  relatedConcepts,
  moduleSubject: ['HU-GIT-301 > Pathology > Liver, GB and Pancreas'],
  claimIds: CONCEPTS.map((c) => c.claimId),
})

mkdirSync('docs/Helwan-Source-Imports/article', { recursive: true })
writeFileSync('docs/Helwan-Source-Imports/article/HU-GIT-301-articles.md', `${readFileSync('docs/Helwan-Source-Imports/article/HU-GIT-301-articles.md', 'utf8')}\n---\n\n${articleMd}`)

// --- pending-live overlays (alcoholic steatosis + haemochromatosis, ids not yet live) ---
const steatosisMd = renderConceptUpdate({
  id: UPDATES['alcoholic-steatosis'].id,
  label: UPDATES['alcoholic-steatosis'].label,
  definition: UPDATES['alcoholic-steatosis'].definition,
  objective: UPDATES['alcoholic-steatosis'].objective,
  aliases: UPDATES['alcoholic-steatosis'].aliases,
  universities: ['+hu'],
  learnerYears: '+3',
  modules: ['+HU-GIT-301'],
  moduleSubject: UPDATES['alcoholic-steatosis'].moduleSubject,
  examWeightByYear: ['HU_Y3=0.4'],
  fieldNotes: UPDATES['alcoholic-steatosis'].fieldNotes,
})
const haemochromatosisMd = renderConceptUpdate({
  id: UPDATES.haemochromatosis.id,
  label: UPDATES.haemochromatosis.label,
  definition: UPDATES.haemochromatosis.definition,
  objective: UPDATES.haemochromatosis.objective,
  aliases: UPDATES.haemochromatosis.aliases,
  universities: ['+hu'],
  learnerYears: '+3',
  modules: ['+HU-GIT-301'],
  moduleSubject: UPDATES.haemochromatosis.moduleSubject,
  examWeightByYear: ['HU_Y3=0.4'],
  fieldNotes: UPDATES.haemochromatosis.fieldNotes,
})
mkdirSync('docs/Helwan-Source-Imports/pending-live', { recursive: true })
const existingPending = readFileSync('docs/Helwan-Source-Imports/pending-live/HU-GIT-301-questions.md', 'utf8')
const appendedNote = `\n\n  CON-FND-A0BC07E35554B1 (alcoholic hepatic steatosis pathogenesis) and\n  CON-FND-B9A3C8B28B1443 (primary haemochromatosis) — dependency:\n  docs/Kasr-Source-Imports/concept/108-INT-concepts-pathology.md. Both\n  concepts are authored but not yet imported; these sparse updates (+hu,\n  +HU_Y3, +HU-GIT-301, plus a fact addition each) must be applied after the\n  Kasr file lands live, never before, or the importer creates near-empty\n  stubs under these ids per 00-START-HERE §2's stub-create guard.\n-->`
const updatedPending = existingPending.replace(/\n-->/, appendedNote).trimEnd()
writeFileSync(
  'docs/Helwan-Source-Imports/pending-live/HU-GIT-301-questions.md',
  `${updatedPending}\n\n---\n\n${steatosisMd}\n---\n\n${haemochromatosisMd}`,
)

// --- MCQ seed ---
const questions = ch2Items.map((it) => {
  const q = QUESTIONS_CH2[it.num]
  if (!q) throw new Error(`no explanations authored for item #${it.num}`)
  const conceptId = rootToId[q.root]
  if (!conceptId) throw new Error(`no concept id for root ${q.root} (item #${it.num})`)
  const explanations = {}
  for (const [letter, text] of Object.entries(q.explanations)) explanations[letter.toUpperCase()] = text
  const options = {}
  for (const [letter, text] of Object.entries(it.options)) options[letter.toUpperCase()] = text
  return {
    key: it.tested_concept_key,
    id: `QST-HUGIT301-PATHOLOGYCH2-Q${String(it.num).padStart(2, '0')}`,
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
    source_citation: `HU-GIT-301 Pathology MCQ bank, "${it.chapter}" chapter, item #${it.num}, p.${it.page}; answer key rendered from the bank's own pp.25-26 (chapter 2 key table), not OCR text.`,
    field_notes: { keySource: "printed key table pp.25-26, rendered (not OCR'd, which garbles the table)" },
  }
})

mkdirSync('coverage/seeds/HU-GIT-301', { recursive: true })
const seed = {
  lane: 'HU-GIT-301',
  cluster: 'pathology-ch2',
  header: 'HU-GIT-301 · Pathology — Chapter 2 (Liver, GB and Pancreas), authored from the department pathology MCQ bank, keys rendered from the bank’s own printed pp.25-26.',
  defaults: {
    subject: 'gi',
    status: 'Draft',
    owner: 'Helwan Year-3 authoring lane',
    universities: ['hu'],
    years: ['HU_Y3'],
    module: 'HU-GIT-301',
    module_subject: 'HU-GIT-301 > Pathology > Liver, GB and Pancreas',
    exam_weight_by_year: { HU_Y3: 0.4 },
    question_only_for: '',
    library_ids: [ARTICLE_ID],
    resource_ids: [],
    setting: 'Academic',
    estimated_seconds: 75,
    randomise_answers: true,
    cognitive_effort: 'Medium',
    reasoning_level: 2,
    learning_objective: 'Apply the correct hepatobiliary or pancreatic pathology fact to select the accepted (or, in an "except"/"not true" stem, the excepted) statement.',
  },
  questions,
}
writeFileSync('coverage/seeds/HU-GIT-301/pathology-ch2.json', JSON.stringify(seed, null, 2))

console.log(`concepts: ${CONCEPTS.length} new + 2 pending updates (alcoholic-steatosis, haemochromatosis)`)
console.log(`questions: ${questions.length}`)
