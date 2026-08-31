#!/usr/bin/env node

import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '../..')
const moduleId = 'MUST-FHB-102-2'
const conceptId = 'CON-INF-23265735EECCA1'
const articleId = 'ART-INF-MUST-FHB1022-CYCLOPROPAGATIVE'
const trypConceptId = 'CON-INF-BEDAA24AD0E037'
const trypArticleId = 'ART-INF-MUST-FHB1022-AFRICAN-TRYPANOSOMIASIS-STAGE'
const lymeConceptId = 'CON-INF-D077623ED9EADA'
const lymeArticleId = 'ART-INF-MUST-FHB1022-LYME-IXODES'
const relapsingConceptId = 'CON-INF-0C6E9F7F6C60E2'
const relapsingArticleId = 'ART-INF-MUST-FHB1022-EPIDEMIC-RELAPSING-FEVER'
const plagueConceptId = 'CON-INF-22E2FB9AF9697A'
const plagueArticleId = 'ART-INF-MUST-FHB1022-PLAGUE-HUMAN-FLEA'
const paratransConceptId = 'CON-INF-A0D40E9CB0E211'
const paratransArticleId = 'ART-INF-MUST-FHB1022-PARATRANSGENESIS'
const leishConceptId = 'CON-INF-5EAC54C4EC6F18'
const leishArticleId = 'ART-INF-MUST-FHB1022-CUTANEOUS-LEISHMANIASIS-VECTOR'
const sarcoConceptId = 'CON-INF-7400B05B6501D2'
const sarcoArticleId = 'ART-INF-MUST-FHB1022-SARCOPHAGA-WOUND-MYIASIS'
const assessmentResourceId = 'src_b9989e9ef3c314f6c771'
const teachingResourceId = 'src_5c62279de4964083aecb'
const definitionResourceId = 'src_6fb474b2c5871480abef'
const ticksResourceId = 'src_08be9a1018b73dcd7c3'
const liceResourceId = 'src_62dda2ba1dad2602f5db'
const mosquitoResourceId = 'src_b75f65f2298d0fcbc5f3'
const sandflyResourceId = 'src_a82c32271ee38d0b2cad'
const myiasisResourceId = 'src_2c1e04372fbb8b2607f7'
const tbDrugResourceId = 'src_51157599ec58c9f98c28'
const protein30sResourceId = 'src_e059ca4507cf3177b362'
const proteinInhibitorResourceId = 'src_3a69ab072e403a68f287'
const protein50sResourceId = 'src_57dd6426a8e11335031c'
const nucleoproteinResourceId = 'src_5dfd7701d995629e7c36'
const vancomycinResourceId = 'src_875c205531a585cd5b91'

const outputs = {
  'docs/MUST-Source-Imports/evidence/FHB-102-2-vector-transmission-sources.md': sources(),
  'docs/MUST-Source-Imports/evidence/corpus-source-index.json': corpusSourceIndex(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-vector-transmission-claims.md': claims(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-vector-transmission-citations.md': citations(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-vector-transmission-spans.md': spans(),
  'docs/MUST-Source-Imports/concept/FHB-102-2-parasitology-cyclopropagative-concepts.md': concepts(),
  'docs/MUST-Source-Imports/article/FHB-102-2-parasitology-cyclopropagative-articles.md': articles(),
  'docs/MUST-Source-Imports/question/FHB-102-2-parasitology-cyclopropagative-mcq.md': questions(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-african-trypanosomiasis-claims.md': trypClaims(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-african-trypanosomiasis-citations.md': trypCitations(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-african-trypanosomiasis-spans.md': trypSpans(),
  'docs/MUST-Source-Imports/concept/FHB-102-2-african-trypanosomiasis-concepts.md': trypConcepts(),
  'docs/MUST-Source-Imports/article/FHB-102-2-african-trypanosomiasis-articles.md': trypArticles(),
  'docs/MUST-Source-Imports/question/FHB-102-2-african-trypanosomiasis-mcq.md': trypQuestions(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-lyme-ixodes-claims.md': lymeClaims(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-lyme-ixodes-citations.md': lymeCitations(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-lyme-ixodes-spans.md': lymeSpans(),
  'docs/MUST-Source-Imports/concept/FHB-102-2-lyme-ixodes-concepts.md': lymeConcepts(),
  'docs/MUST-Source-Imports/article/FHB-102-2-lyme-ixodes-articles.md': lymeArticles(),
  'docs/MUST-Source-Imports/question/FHB-102-2-lyme-ixodes-mcq.md': lymeQuestions(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-epidemic-relapsing-fever-claims.md': relapsingClaims(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-epidemic-relapsing-fever-citations.md': relapsingCitations(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-epidemic-relapsing-fever-spans.md': relapsingSpans(),
  'docs/MUST-Source-Imports/concept/FHB-102-2-epidemic-relapsing-fever-concepts.md': relapsingConcepts(),
  'docs/MUST-Source-Imports/article/FHB-102-2-epidemic-relapsing-fever-articles.md': relapsingArticles(),
  'docs/MUST-Source-Imports/question/FHB-102-2-epidemic-relapsing-fever-mcq.md': relapsingQuestions(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-plague-human-flea-claims.md': plagueClaims(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-plague-human-flea-citations.md': plagueCitations(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-plague-human-flea-spans.md': plagueSpans(),
  'docs/MUST-Source-Imports/concept/FHB-102-2-plague-human-flea-concepts.md': plagueConcepts(),
  'docs/MUST-Source-Imports/article/FHB-102-2-plague-human-flea-articles.md': plagueArticles(),
  'docs/MUST-Source-Imports/question/FHB-102-2-plague-human-flea-mcq.md': plagueQuestions(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-paratransgenesis-claims.md': paratransClaims(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-paratransgenesis-citations.md': paratransCitations(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-paratransgenesis-spans.md': paratransSpans(),
  'docs/MUST-Source-Imports/concept/FHB-102-2-paratransgenesis-concepts.md': paratransConcepts(),
  'docs/MUST-Source-Imports/article/FHB-102-2-paratransgenesis-articles.md': paratransArticles(),
  'docs/MUST-Source-Imports/question/FHB-102-2-paratransgenesis-mcq.md': paratransQuestions(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-cutaneous-leishmaniasis-claims.md': leishClaims(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-cutaneous-leishmaniasis-citations.md': leishCitations(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-cutaneous-leishmaniasis-spans.md': leishSpans(),
  'docs/MUST-Source-Imports/concept/FHB-102-2-cutaneous-leishmaniasis-concepts.md': leishConcepts(),
  'docs/MUST-Source-Imports/article/FHB-102-2-cutaneous-leishmaniasis-articles.md': leishArticles(),
  'docs/MUST-Source-Imports/question/FHB-102-2-cutaneous-leishmaniasis-mcq.md': leishQuestions(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-sarcophaga-myiasis-claims.md': sarcoClaims(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-sarcophaga-myiasis-citations.md': sarcoCitations(),
  'docs/MUST-Source-Imports/evidence/FHB-102-2-sarcophaga-myiasis-spans.md': sarcoSpans(),
  'docs/MUST-Source-Imports/concept/FHB-102-2-sarcophaga-myiasis-concepts.md': sarcoConcepts(),
  'docs/MUST-Source-Imports/article/FHB-102-2-sarcophaga-myiasis-articles.md': sarcoArticles(),
  'docs/MUST-Source-Imports/question/FHB-102-2-sarcophaga-myiasis-mcq.md': sarcoQuestions(),
  'docs/MUST-Source-Imports/coverage/FHB-102-2-AUTHORING.md': coverage(),
}

for (const [relativePath, body] of Object.entries(outputs)) {
  const path = resolve(root, relativePath)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, body.trimEnd() + '\n')
}

console.log(`wrote ${Object.keys(outputs).length} deterministic FHB-102-2 authoring files`)

function sources() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
${assessmentResourceId}

## title
FHB102-2 MCQ bank with printed answer list

## institution
Unattributed FHB102-2 revision carrier; MUST scope is printed but no institution or department authentication is visible

## processing_status
visually_read_native_text

## collection_id
${moduleId}

## source_relative_path
Year 1/Semester 102/FHB 102-2/00 Module-wide/05 MCQs/MCQs - FHB102-2.pdf

## source_uri


## media_type
application/pdf

## languages
en

## publication_date
2021-03-25

## accessed_at
2026-08-31

## page_count
6

## sha256
b9989e9ef3c314f6c771c32a4ad2f096c02648a3b1f98281117ce7c4f5208063

## rights
Locally supplied study material; internal curriculum authoring only.

## qualification
Anonymous answer-bearing question bank. Its printed answer list is source evidence, not an authenticated faculty key. Q1, Q5, Q7, Q8, Q9, Q10, Q11 and Q12 are authored with unchanged clean keys. Q2, Q3, Q4, Q6, Q13, Q20 and Q21 are content/key-form holds. Q14 through Q19 and Q22 have clean printed keys but remain un-authored on dependency-contract holds rather than weakening or clobbering live article relationships, inventing artificial companion articles or duplicating a pending exact concept.

## confidence
0.55

## is_assessment
yes

---

# Item

## id
${teachingResourceId}

## title
Vectors of Disease Transmission, FHB102-2

## institution
MUST University Faculty of Medicine, Parasitology Department; Prof. Heba Abdel Aaty

## processing_status
visually_read_image_pdf

## collection_id
${moduleId}

## source_relative_path
Year 1/Semester 102/FHB 102-2/Parasitology/05 MCQs/MCQs - Fhb para (answers & notes).pdf

## source_uri


## media_type
application/pdf

## languages
en

## publication_date


## accessed_at
2026-08-31

## page_count
10

## sha256
5c62279de4964083aecb96a5bd72d47690b0fb569a38779992c2b987d9ce7e8e

## rights
Faculty-distributed teaching material; internal curriculum use.

## qualification
Officially branded MUST Parasitology Department teaching carrier. The departmental attribution supports its teaching statements; later yellow highlights are not independently treated as an authenticated faculty key.

## confidence
0.8

## is_assessment
no

---

# Item

## id
${definitionResourceId}

## title
FHB Para Myiasis Midterm Notes — arthropod transmission definitions

## institution
Student or individual teaching summary with author metadata Ebedo; no authenticated MUST institution, faculty or department attribution is visible

## processing_status
visually_read_native_text

## collection_id
${moduleId}

## source_relative_path
Year 1/Semester 102/FHB 102-2/Parasitology/08 Midterm Exams/FHB Para (Myiasis) Midterm Notes.pdf

## source_uri


## media_type
application/pdf

## languages
en

## publication_date


## accessed_at
2026-08-31

## page_count
6

## sha256
6fb474b2c5871480abefa3a6e738373c226ccb790af54bb01709f3bb833941d5

## rights
Locally supplied study material; internal curriculum authoring only.

## qualification
Non-official teaching summary. Page 2 directly defines the biological transmission categories; it supports Draft explanation language but is not an authenticated faculty authority.

## confidence
0.65

## is_assessment
no

---

# Item

## id
${ticksResourceId}

## title
FHB102-2 Vectors of Disease Transmission — ticks

## institution
Misr University for Science and Technology, Faculty of Medicine, Parasitology Department; presented by Associate Prof. Eman El-Wakil

## processing_status
visually_read_native_text

## collection_id
${moduleId}

## source_relative_path
Year 1/Semester 102/FHB 102-2/Parasitology/01 University Material/6.Ticks.pdf

## source_uri


## media_type
application/pdf

## languages
en

## publication_date


## accessed_at
2026-08-31

## page_count
40

## sha256
08be9a1018b73dcd7c3d97ef1e0502bcfa2c401d81aec2672c3e1a8e226cb955

## rights
Faculty-distributed university teaching material; internal curriculum use.

## qualification
Officially branded MUST Faculty of Medicine Parasitology Department teaching deck for FHB102-2. The cover names Associate Prof. Eman El-Wakil as presenter while the PDF metadata names Heba Abdel Aaty as author; the visible teaching content, rather than an inferred authorship resolution, governs this Draft slice.

## confidence
0.9

## is_assessment
no

---

# Item

## id
${liceResourceId}

## title
FHB102-2 Vectors of Disease Transmission — lice, fleas and bugs

## institution
Misr University for Science and Technology, Faculty of Medicine, Parasitology Department; Eman El-Wakil, MD

## processing_status
visually_read_native_text

## collection_id
${moduleId}

## source_relative_path
Year 1/Semester 102/FHB 102-2/Parasitology/01 University Material/4.Lice, Fleas & Bugs.pdf

## source_uri


## media_type
application/pdf

## languages
en

## publication_date


## accessed_at
2026-08-31

## page_count
79

## sha256
62dda2ba1dad2602f5db3d4401fe589b853357b3a1105d39ce6c6f57356d53df

## rights
Faculty-distributed university teaching material; internal curriculum use.

## qualification
Officially branded MUST Faculty of Medicine FHB102-2 teaching deck. The cover names Eman El-Wakil, MD, while the PDF metadata names Winner; the visible teaching content, rather than an inferred metadata resolution, governs this Draft slice.

## confidence
0.9

## is_assessment
no

---

# Item

## id
${mosquitoResourceId}

## title
FHB102-2 Arthropod Vectors for Disease Transmission — mosquitoes

## institution
Misr University for Science and Technology, Faculty of Medicine, Parasitology Department; PDF metadata author HEBA

## processing_status
visually_read_native_text

## collection_id
${moduleId}

## source_relative_path
Year 1/Semester 102/FHB 102-2/Parasitology/01 University Material/3 - Mosquitoes.pdf

## source_uri


## media_type
application/pdf

## languages
en

## publication_date


## accessed_at
2026-08-31

## page_count
47

## sha256
b75f65f2298d0fcbc5f3a95d74b10caa96b314adada37f04fb78285f12f02247

## rights
Faculty-distributed university teaching material; internal curriculum use.

## qualification
Officially branded MUST Faculty of Medicine Parasitology Department FHB102-2 teaching deck. Page 44 directly defines paratransgenesis using symbiont bacteria; no examiner or authenticated answer-key claim is inferred.

## confidence
0.9

## is_assessment
no

---

# Item

## id
${sandflyResourceId}

## title
FHB102-2 Arthropod Vectors for Disease Transmission — sandflies

## institution
Misr University for Science and Technology, Faculty of Medicine, Parasitology Department; PDF metadata author HEBA

## processing_status
visually_read_native_text

## collection_id
${moduleId}

## source_relative_path
Year 1/Semester 102/FHB 102-2/Parasitology/01 University Material/7.Sandfly.pdf

## source_uri


## media_type
application/pdf

## languages
en

## publication_date


## accessed_at
2026-08-31

## page_count
34

## sha256
a82c32271ee38d0b2cadb2f976a6eff205ab27693fab5f3906ea85798fc99bbd

## rights
Faculty-distributed university teaching material; internal curriculum use.

## qualification
Officially branded MUST Faculty of Medicine Parasitology Department FHB102-2 teaching deck. Pages 13 and 24 directly connect Phlebotomus with Leishmania and the Sinai volcano-like cutaneous lesion pattern.

## confidence
0.9

## is_assessment
no

---

# Item

## id
${myiasisResourceId}

## title
FHB102-2 Flies and Myiasis

## institution
Misr University for Science and Technology, Faculty of Medicine, Parasitology Department; PDF metadata author Heba Abdel Aaty

## processing_status
visually_read_native_text

## collection_id
${moduleId}

## source_relative_path
Year 1/Semester 102/FHB 102-2/Parasitology/01 University Material/2.Flies & Myiasis.pdf

## source_uri


## media_type
application/pdf

## languages
en

## publication_date
2022-04-01

## accessed_at
2026-08-31

## page_count
58

## sha256
2c1e04372fbb8b2607f73de38b26d4667d7f7408bcbd39ffc156aaea253dcd79

## rights
Faculty-distributed university teaching material; internal curriculum use.

## qualification
Officially branded MUST Faculty of Medicine Parasitology Department FHB102-2 teaching deck. Pages 32, 46 and 57 directly support the Sarcophaga incomplete-peritreme and wound-myiasis identification.

## confidence
0.9

## is_assessment
no

---

# Item

## id
${tbDrugResourceId}

## title
FHB102-2 Anti-Tuberculous Drugs

## institution
Misr University for Science and Technology (MUST), visibly identified on the terminal slide; PDF metadata author O6u Moodle

## processing_status
visually_read_native_text

## collection_id
${moduleId}

## source_relative_path
Year 1/Semester 102/FHB 102-2/Pharmacology/01 University Material/6.Anti-Tuberculous Drugs.pdf

## source_uri


## media_type
application/pdf

## languages
en

## publication_date


## accessed_at
2026-09-01

## page_count
25

## sha256
51157599ec58c9f98c28c085904d33e04803556d3154da417376d987d91e811d

## rights
Locally supplied university teaching material; internal curriculum use.

## qualification
All 25 pages were rendered and visually read. The terminal slide visibly identifies MUST and www.must.edu.eg; no named faculty, department, lecturer or examiner attribution is shown. Pages 15–16 directly support isoniazid-associated vitamin B6 depletion and pyridoxine co-administration; page 22 documents the two-option conflict that holds Q13.

## confidence
0.85

## is_assessment
no

---

# Item

## id
${protein30sResourceId}

## title
FHB102-2 Protein Synthesis Inhibitors (30S)

## institution
Locally filed under MUST FHB102-2 University Material; no visible institution, department, lecturer or examiner attribution; PDF metadata author pc

## processing_status
visually_read_native_text

## collection_id
${moduleId}

## source_relative_path
Year 1/Semester 102/FHB 102-2/Pharmacology/01 University Material/3.Protein Synthesis Inhibitors (30S).pdf

## source_uri


## media_type
application/pdf

## languages
en

## publication_date
2026-06-14

## accessed_at
2026-09-01

## page_count
22

## sha256
e059ca4507cf3177b36253ec15d510c14512bda3adcf17fd671f6fe9376b9f6c

## rights
Locally supplied teaching material; internal curriculum authoring only.

## qualification
All 22 pages were rendered and visually read. The deck contains no visible institution, department, lecturer or examiner attribution. Page 17 explicitly includes streptomycin in the aminoglycoside list; pages 18 and 20 teach aminoglycoside inner-ear accumulation and ototoxicity, including eighth-cranial-nerve injury. This supports Q15's unchanged printed C. The deck also teaches tetracycline phototoxicity and hepatotoxicity on page 13, keeping those Q15 distractors attached to a different 30S-inhibitor class rather than to streptomycin.

## confidence
0.75

## is_assessment
no

---

# Item

## id
${proteinInhibitorResourceId}

## title
FHB102-2 Antimicrobial Protein Inhibitors

## institution
Locally filed under MUST FHB102-2; no authenticated faculty, department, lecturer or examiner attribution is visible; PDF metadata author Jost

## processing_status
visually_read_native_text

## collection_id
${moduleId}

## source_relative_path
Year 1/Semester 102/FHB 102-2/Pharmacology/06 EOM Exams/EOM - 3. Antimicrbial Protein inhibitors.pdf

## source_uri


## media_type
application/pdf

## languages
en

## publication_date
2025-04-05

## accessed_at
2026-09-01

## page_count
49

## sha256
3a69ab072e403a68f2876542ad6511dfa2dec9395a5cd0af0141e4bafb4792c5

## rights
Locally supplied teaching material; internal curriculum authoring only.

## qualification
All 49 pages were previously rendered and visually read under the governed FHB102-2 source triage. Pages 26–32 were directly rechecked for Q16 and Q18. Page 31 explicitly lists aplastic anemia and gray baby syndrome under chloramphenicol adverse effects, supporting both anonymous-bank printed keys without inference. The deck is teaching evidence only and contains no authenticated examiner key.

## confidence
0.75

## is_assessment
no

---

# Item

## id
${protein50sResourceId}

## title
FHB102-2 Protein Synthesis Inhibitors (50S)

## institution
Locally filed under MUST FHB102-2 University Material; no visible institution, department, lecturer or examiner attribution; PDF metadata author pc

## processing_status
visually_read_native_text

## collection_id
${moduleId}

## source_relative_path
Year 1/Semester 102/FHB 102-2/Pharmacology/01 University Material/4.Protein Synthesis Inhibitors (50S).pdf

## source_uri


## media_type
application/pdf

## languages
en

## publication_date
2026-06-14

## accessed_at
2026-09-01

## page_count
17

## sha256
57dd6426a8e11335031cbf486af522a93482fc0fc68f55ab98f1553da2adfb87

## rights
Locally supplied teaching material; internal curriculum authoring only.

## qualification
All 17 pages were rendered and visually read. The deck contains no visible institution, department, lecturer or examiner attribution. Page 12 directly lists pseudomembranous colitis and diarrhea under clindamycin adverse effects, supporting Q17's unchanged printed A without inference. Page 15 directly names grey baby syndrome in neonates under chloramphenicol adverse effects, supporting Q18's unchanged printed B; the same slide's broader bone-marrow-depression wording was only corroborative for Q16 and was not rewritten into aplastic anemia.

## confidence
0.75

## is_assessment
no

---

# Item

## id
${nucleoproteinResourceId}

## title
FHB102-2 Antimicrobial Nucleoprotein (DNA and RNA) Inhibitors

## institution
Locally filed under MUST FHB102-2; no authenticated faculty, department, lecturer or examiner attribution is visible; PDF metadata author Jost

## processing_status
visually_read_native_text

## collection_id
${moduleId}

## source_relative_path
Year 1/Semester 102/FHB 102-2/Pharmacology/01 University Material/Antimicrbial Nucleopotein (DNA and RNA) Inhibitors.pdf

## source_uri


## media_type
application/pdf

## languages
en

## publication_date
2025-04-01

## accessed_at
2026-09-01

## page_count
23

## sha256
5dfd7701d995629e7c36c7967736e21927c28a3a5e89272f8c40e20cacbac952

## rights
Locally supplied teaching material; internal curriculum authoring only.

## qualification
All 23 pages were previously rendered and visually read under the governed FHB102-2 source triage. Pages 4–9 were directly rechecked for Q19 and Q22. Page 4 identifies fluoroquinolones as DNA-gyrase inhibitors and visibly includes ciprofloxacin; page 5 diagrams DNA gyrase and topoisomerase IV at the replication fork; pages 7–8 retain ciprofloxacin within the class; page 9 directly states that fluoroquinolones may damage growing cartilage and cause arthropathy. These direct slide statements support Q19's unchanged printed C and Q22's unchanged printed C without importing an external correction. The deck is teaching evidence only and contains no authenticated examiner key.

## confidence
0.75

## is_assessment
no

---

# Item

## id
${vancomycinResourceId}

## title
Beta-Lactam and Vancomycin

## institution
Faculty of Medicine, Ain Shams University; Dr Esraa Mostafa Elnahas; no authenticated MUST institution, department, examiner, sitting or faculty-key declaration

## processing_status
visually_read_native_text

## collection_id
${moduleId}

## source_relative_path
Year 1/Semester 102/FHB 102-2/Pharmacology/08 Midterm Exams/2. B-Lactam & Vancomycin.pdf

## source_uri


## media_type
application/pdf

## languages
en

## publication_date
2025-02-22

## accessed_at
2026-09-01

## page_count
40

## sha256
875c205531a585cd5b91b7bd05257ca4f8a0052c7e6cfa32ddd8156c6a5c91fb

## rights
Locally supplied external-faculty teaching material; internal curriculum authoring only.

## qualification
All 40 pages were previously rendered and visually read under the governed FHB102-2 source triage. Pages 37–39 were directly rechecked for Q20 and Q21. Page 38 explicitly places red man syndrome under vancomycin adverse effects, contradicting Q20's printed B, teicoplanin, because vancomycin is option C. Page 39 identifies metronidazole or oral vancomycin as treatment for drug-induced pseudomembranous colitis, contradicting Q21's printed C, piperacillin, because metronidazole is option B. The source is teaching evidence only and does not authenticate or replace either printed bank key.

## confidence
0.85

## is_assessment
no
`
}

function corpusSourceIndex() {
  return JSON.stringify({
    note: 'Minimal FHB-102-2 corpus source index for this bounded authoring slice; values are copied from governed local-source evidence and direct visual reads.',
    generatedFrom: ['docs/MUST-Source-Imports/manifest/fhb102-2-s1-provenance.json'],
    manifestGeneratedOn: '2026-08-31',
    count: 14,
    sources: {
      [assessmentResourceId]: {
        sourceRelativePath: 'Year 1/Semester 102/FHB 102-2/00 Module-wide/05 MCQs/MCQs - FHB102-2.pdf',
        sourceRelativePaths: ['Year 1/Semester 102/FHB 102-2/00 Module-wide/05 MCQs/MCQs - FHB102-2.pdf'],
        sha256: 'b9989e9ef3c314f6c771c32a4ad2f096c02648a3b1f98281117ce7c4f5208063',
        processingStatus: 'fully_governed',
        pageCount: 6,
        languages: ['en'],
        exclusionReason: null,
        universityId: 'must',
        yearIds: ['MUST_Y1'],
        moduleIds: [moduleId],
        categories: ['MCQs'],
      },
      [teachingResourceId]: {
        sourceRelativePath: 'Year 1/Semester 102/FHB 102-2/Parasitology/05 MCQs/MCQs - Fhb para (answers & notes).pdf',
        sourceRelativePaths: ['Year 1/Semester 102/FHB 102-2/Parasitology/05 MCQs/MCQs - Fhb para (answers & notes).pdf'],
        sha256: '5c62279de4964083aecb96a5bd72d47690b0fb569a38779992c2b987d9ce7e8e',
        processingStatus: 'fully_governed',
        pageCount: 10,
        languages: ['en'],
        exclusionReason: null,
        universityId: 'must',
        yearIds: ['MUST_Y1'],
        moduleIds: [moduleId],
        categories: ['MCQs', 'Teaching notes'],
      },
      [definitionResourceId]: {
        sourceRelativePath: 'Year 1/Semester 102/FHB 102-2/Parasitology/08 Midterm Exams/FHB Para (Myiasis) Midterm Notes.pdf',
        sourceRelativePaths: ['Year 1/Semester 102/FHB 102-2/Parasitology/08 Midterm Exams/FHB Para (Myiasis) Midterm Notes.pdf'],
        sha256: '6fb474b2c5871480abefa3a6e738373c226ccb790af54bb01709f3bb833941d5',
        processingStatus: 'fully_governed',
        pageCount: 6,
        languages: ['en'],
        exclusionReason: null,
        universityId: 'must',
        yearIds: ['MUST_Y1'],
        moduleIds: [moduleId],
        categories: ['Teaching notes'],
      },
      [ticksResourceId]: {
        sourceRelativePath: 'Year 1/Semester 102/FHB 102-2/Parasitology/01 University Material/6.Ticks.pdf',
        sourceRelativePaths: ['Year 1/Semester 102/FHB 102-2/Parasitology/01 University Material/6.Ticks.pdf'],
        sha256: '08be9a1018b73dcd7c3d97ef1e0502bcfa2c401d81aec2672c3e1a8e226cb955',
        processingStatus: 'fully_governed',
        pageCount: 40,
        languages: ['en'],
        exclusionReason: null,
        universityId: 'must',
        yearIds: ['MUST_Y1'],
        moduleIds: [moduleId],
        categories: ['University Material', 'Teaching'],
      },
      [liceResourceId]: {
        sourceRelativePath: 'Year 1/Semester 102/FHB 102-2/Parasitology/01 University Material/4.Lice, Fleas & Bugs.pdf',
        sourceRelativePaths: ['Year 1/Semester 102/FHB 102-2/Parasitology/01 University Material/4.Lice, Fleas & Bugs.pdf'],
        sha256: '62dda2ba1dad2602f5db3d4401fe589b853357b3a1105d39ce6c6f57356d53df',
        processingStatus: 'fully_governed',
        pageCount: 79,
        languages: ['en'],
        exclusionReason: null,
        universityId: 'must',
        yearIds: ['MUST_Y1'],
        moduleIds: [moduleId],
        categories: ['University Material', 'Teaching'],
      },
      [mosquitoResourceId]: {
        sourceRelativePath: 'Year 1/Semester 102/FHB 102-2/Parasitology/01 University Material/3 - Mosquitoes.pdf',
        sourceRelativePaths: ['Year 1/Semester 102/FHB 102-2/Parasitology/01 University Material/3 - Mosquitoes.pdf'],
        sha256: 'b75f65f2298d0fcbc5f3a95d74b10caa96b314adada37f04fb78285f12f02247',
        processingStatus: 'fully_governed',
        pageCount: 47,
        languages: ['en'],
        exclusionReason: null,
        universityId: 'must',
        yearIds: ['MUST_Y1'],
        moduleIds: [moduleId],
        categories: ['University Material', 'Teaching'],
      },
      [sandflyResourceId]: {
        sourceRelativePath: 'Year 1/Semester 102/FHB 102-2/Parasitology/01 University Material/7.Sandfly.pdf',
        sourceRelativePaths: ['Year 1/Semester 102/FHB 102-2/Parasitology/01 University Material/7.Sandfly.pdf'],
        sha256: 'a82c32271ee38d0b2cadb2f976a6eff205ab27693fab5f3906ea85798fc99bbd',
        processingStatus: 'fully_governed',
        pageCount: 34,
        languages: ['en'],
        exclusionReason: null,
        universityId: 'must',
        yearIds: ['MUST_Y1'],
        moduleIds: [moduleId],
        categories: ['University Material', 'Teaching'],
      },
      [myiasisResourceId]: {
        sourceRelativePath: 'Year 1/Semester 102/FHB 102-2/Parasitology/01 University Material/2.Flies & Myiasis.pdf',
        sourceRelativePaths: ['Year 1/Semester 102/FHB 102-2/Parasitology/01 University Material/2.Flies & Myiasis.pdf'],
        sha256: '2c1e04372fbb8b2607f73de38b26d4667d7f7408bcbd39ffc156aaea253dcd79',
        processingStatus: 'fully_governed',
        pageCount: 58,
        languages: ['en'],
        exclusionReason: null,
        universityId: 'must',
        yearIds: ['MUST_Y1'],
        moduleIds: [moduleId],
        categories: ['University Material', 'Teaching'],
      },
      [tbDrugResourceId]: {
        sourceRelativePath: 'Year 1/Semester 102/FHB 102-2/Pharmacology/01 University Material/6.Anti-Tuberculous Drugs.pdf',
        sourceRelativePaths: ['Year 1/Semester 102/FHB 102-2/Pharmacology/01 University Material/6.Anti-Tuberculous Drugs.pdf'],
        sha256: '51157599ec58c9f98c28c085904d33e04803556d3154da417376d987d91e811d',
        processingStatus: 'fully_governed',
        pageCount: 25,
        languages: ['en'],
        exclusionReason: null,
        universityId: 'must',
        yearIds: ['MUST_Y1'],
        moduleIds: [moduleId],
        categories: ['University Material', 'Teaching'],
      },
      [protein30sResourceId]: {
        sourceRelativePath: 'Year 1/Semester 102/FHB 102-2/Pharmacology/01 University Material/3.Protein Synthesis Inhibitors (30S).pdf',
        sourceRelativePaths: ['Year 1/Semester 102/FHB 102-2/Pharmacology/01 University Material/3.Protein Synthesis Inhibitors (30S).pdf'],
        sha256: 'e059ca4507cf3177b36253ec15d510c14512bda3adcf17fd671f6fe9376b9f6c',
        processingStatus: 'fully_governed',
        pageCount: 22,
        languages: ['en'],
        exclusionReason: null,
        universityId: 'must',
        yearIds: ['MUST_Y1'],
        moduleIds: [moduleId],
        categories: ['University Material', 'Teaching'],
      },
      [proteinInhibitorResourceId]: {
        sourceRelativePath: 'Year 1/Semester 102/FHB 102-2/Pharmacology/06 EOM Exams/EOM - 3. Antimicrbial Protein inhibitors.pdf',
        sourceRelativePaths: [
          'Year 1/Semester 102/FHB 102-2/Pharmacology/06 EOM Exams/EOM - 3. Antimicrbial Protein inhibitors.pdf',
          'Year 1/Semester 102/FHB 102-2/Pharmacology/01 University Material/Antimicrbial Protein inhibitors.pdf',
        ],
        sha256: '3a69ab072e403a68f2876542ad6511dfa2dec9395a5cd0af0141e4bafb4792c5',
        processingStatus: 'fully_governed',
        pageCount: 49,
        languages: ['en'],
        exclusionReason: null,
        universityId: 'must',
        yearIds: ['MUST_Y1'],
        moduleIds: [moduleId],
        categories: ['University Material', 'Teaching'],
      },
      [protein50sResourceId]: {
        sourceRelativePath: 'Year 1/Semester 102/FHB 102-2/Pharmacology/01 University Material/4.Protein Synthesis Inhibitors (50S).pdf',
        sourceRelativePaths: ['Year 1/Semester 102/FHB 102-2/Pharmacology/01 University Material/4.Protein Synthesis Inhibitors (50S).pdf'],
        sha256: '57dd6426a8e11335031cbf486af522a93482fc0fc68f55ab98f1553da2adfb87',
        processingStatus: 'fully_governed',
        pageCount: 17,
        languages: ['en'],
        exclusionReason: null,
        universityId: 'must',
        yearIds: ['MUST_Y1'],
        moduleIds: [moduleId],
        categories: ['University Material', 'Teaching'],
      },
      [nucleoproteinResourceId]: {
        sourceRelativePath: 'Year 1/Semester 102/FHB 102-2/Pharmacology/01 University Material/Antimicrbial Nucleopotein (DNA and RNA) Inhibitors.pdf',
        sourceRelativePaths: [
          'Year 1/Semester 102/FHB 102-2/Pharmacology/01 University Material/Antimicrbial Nucleopotein (DNA and RNA) Inhibitors.pdf',
          'Year 1/Semester 102/FHB 102-2/Pharmacology/06 EOM Exams/EOM - 4. Antimicrbial Nucleopotein (DNA and RNA) Inhibitors.pdf',
        ],
        sha256: '5dfd7701d995629e7c36c7967736e21927c28a3a5e89272f8c40e20cacbac952',
        processingStatus: 'fully_governed',
        pageCount: 23,
        languages: ['en'],
        exclusionReason: null,
        universityId: 'must',
        yearIds: ['MUST_Y1'],
        moduleIds: [moduleId],
        categories: ['University Material', 'Teaching'],
      },
      [vancomycinResourceId]: {
        sourceRelativePath: 'Year 1/Semester 102/FHB 102-2/Pharmacology/08 Midterm Exams/2. B-Lactam & Vancomycin.pdf',
        sourceRelativePaths: [
          'Year 1/Semester 102/FHB 102-2/Pharmacology/08 Midterm Exams/2. B-Lactam & Vancomycin.pdf',
          'Year 1/Semester 102/FHB 102-2/Pharmacology/01 University Material/B-Lactam & Vancomycin.pdf',
        ],
        sha256: '875c205531a585cd5b91b7bd05257ca4f8a0052c7e6cfa32ddd8156c6a5c91fb',
        processingStatus: 'fully_governed',
        pageCount: 40,
        languages: ['en'],
        exclusionReason: null,
        universityId: 'must',
        yearIds: ['MUST_Y1'],
        moduleIds: [moduleId],
        categories: ['University Material', 'Teaching'],
      },
    },
  }, null, 1)
}

function claims() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
CLM-INF-MUST-FHB1022-VECTOR-01

## concept_id
${conceptId}

## subject
Cyclopropagative transmission

## predicate
combines

## object
developmental change and multiplication of a parasite inside its vector; Trypanosoma cruzi in Triatoma is the local teaching example

## display_text
Cyclopropagative transmission combines developmental change and multiplication of a parasite inside its vector; Trypanosoma cruzi in Triatoma is the local teaching example.

## risk_class
foundational_stable

## verification_status
verified

## conflict_status
none

## confidence
0.8

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
curriculum: MUST FHB102-2 Parasitology
`
}

function citations() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
CIT-INF-MUST-FHB1022-VECTOR-01

## claim_id
CLM-INF-MUST-FHB1022-VECTOR-01

## resource_id
${teachingResourceId}

## evidence_role
local_curriculum

## support_span
Triatoma (cone-nose bug/kissing bug/winged bug/reduviidae bug) ... Trypanosoma cruzi ... Cyclopropagative.

## locator_type
page

## locator_page
2

## locator_section
Trypanosoma cruzi transmission

## locator_detail
PDF page 2, lower question and yellow teaching-note box.

## context_note
Visually matched against the department-branded carrier. This citation supports the vector, parasite and cyclopropagative category; the companion citation supplies the direct definition.

## confidence
0.8

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-INF-MUST-FHB1022-VECTOR-02

## claim_id
CLM-INF-MUST-FHB1022-VECTOR-01

## resource_id
${definitionResourceId}

## evidence_role
local_curriculum

## support_span
Cyclo-propagative: pathogen multiplies & undergo morphological change.

## locator_type
page

## locator_page
2

## locator_section
Biological transmission types

## locator_detail
PDF page 2, arthropod-borne disease transmission table.

## context_note
The non-official teaching summary directly states the two defining processes. It is used only to support the Draft explanation; publication still requires independent review.

## confidence
0.65

## counts_as_claim_evidence
yes
`
}

function spans() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
SPN-INF-MUST-FHB1022-VECTOR-01

## article_id
${articleId}

## section_id
art-inf-must-fhb1022-cyclopropagative-definition

## text
Cyclopropagative transmission combines two events: developmental change and multiplication inside the vector.

## claim_ids
CLM-INF-MUST-FHB1022-VECTOR-01

## citation_ids
CIT-INF-MUST-FHB1022-VECTOR-01
CIT-INF-MUST-FHB1022-VECTOR-02
`
}

function concepts() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
${conceptId}

## label
Cyclopropagative transmission in arthropod vectors

## canonical_key
parasitology.vector-transmission.cyclopropagative

## aliases
Cyclopropagative transmission
Development and multiplication in a vector
Cyclopropagation in vectors

## arabic_label


## arabic_aliases
[clear]

## definition
Cyclopropagative transmission is biological vector transmission in which an infectious agent both develops and multiplies inside the arthropod vector.

## explicit_objective
Recognise cyclopropagative transmission when a parasite both develops and multiplies inside its arthropod vector.

## pitfalls
Confusing cyclopropagative transmission with propagative transmission, which involves multiplication without developmental change, or cyclodevelopmental transmission, which involves development without multiplication.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAR-T03

## secondary_node_ids
SYS-FND-T05-S02-M02
DIS-PAR

## topic
Parasitology

## subtopic
Arthropods and vectors

## microtopic
Cyclopropagative transmission

## nanotopic


## modules
${moduleId}

## module_subject
${moduleId} > Parasitology > Arthropods and vectors > Cyclopropagative transmission

## article_ids
${articleId}

## related_article_ids
ART-INF-TOP-A50AA5171A

## related_concept_ids
[clear]

## resource_ids
${teachingResourceId}
${assessmentResourceId}
${definitionResourceId}

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
must

## blueprint_weight
0.65

## exam_weight_by_year
MUST_Y1=0.65

## clinical_relevance
0.45

## academic_relevance
0.9

## weight_confidence
0.55

## confidence
0.8

## atomic_claim_ids
CLM-INF-MUST-FHB1022-VECTOR-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## exam_signal
${assessmentResourceId} | tier 3 | undated | p1 Q1; printed answer p5
${teachingResourceId} | tier 2 | undated | p2 departmental teaching and answer annotation

## original_wording
Q1 asks the type of transmission of the Chagas-disease organism inside the vector; printed key D, cyclopropagative.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
No key conflict affects authored Q1. Q3 and Q6 are excluded from this concept and remain explicit authoring holds in the slice ledger because their printed keys conflict with the stem wording or department evidence.

## uncertainty
No uncertainty is recorded for Q1: its printed key and department teaching carrier agree.

## evidence_gaps
The source set is local curriculum evidence. Independent standard-reference review remains required before publication.

## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
arabicLabel: Arabic terminology has not been reviewed; left empty rather than guessed.
arabicAliases: No reviewed Arabic aliases were supplied.
microtopicId: The canonical Parasitology taxonomy stops at the Arthropods and vectors topic for this lane; the narrower curriculum phrase is retained in module_subject rather than inventing a node.
nanotopicId: No verified nanotopic below the selected discipline node exists for this concept.
approvedFileResourceIds: Neither locally supplied PDF has been rights-cleared as a student-downloadable file.
approvedVideoResourceIds: No video source was supplied.
resourceOccurrenceIds: Hand-authored from governed FHB-102-2 evidence; no extraction occurrence record was minted.
sourceCandidateIds: Four current searches for cyclopropagative, transovarian mosquito, Anopheles definitive host and biological vector transmission returned no live or pending concept.
lastReviewed: New under-review record; no medical reviewer has completed review.
reviewDue: Set after the first review is completed.
relationships: The first bounded slice has no necessary evidence-backed typed relationship beyond its covering article; no relation record is minted.
`
}

function articles() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
${articleId}

## title
Cyclopropagative transmission in arthropod vectors

## arabic_title


## aliases
Cyclopropagative vector transmission
Development and multiplication in a vector

## subject
inf

## status
Draft

## owner
Dr. Omar

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## topic
Parasitology

## subtopic
Arthropods and vectors

## microtopic
Cyclopropagative transmission

## nanotopic


## primary_node_id
DIS-PAR-T03

## secondary_node_ids
SYS-FND-T05-S02-M02
DIS-PAR

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1–3 foundation

## reading_time
4

## high_yield
High

## time_sensitive
stable

## universities
must

## years
MUST_Y1

## module
${moduleId}

## module_subject
${moduleId} > Parasitology > Arthropods and vectors > Cyclopropagative transmission

## summary
Cyclopropagative transmission is biological transmission in which an infectious agent both develops and multiplies inside its vector. The Chagas-disease parasite Trypanosoma cruzi in Triatoma is the local curriculum example.

## sections
### Definition
Biological transmission means that an infectious agent undergoes an essential biological event inside its vector. Cyclopropagative transmission combines two events: developmental change and multiplication inside the vector.

### Mechanism
The parasite changes developmentally while also increasing in number inside the arthropod. The combination distinguishes this category from development without multiplication and multiplication without developmental change.

### Key determinants
Trypanosoma cruzi develops and multiplies in Triatoma, so its transmission inside the vector is cyclopropagative. In the local question, unilateral periorbital oedema followed later by cardiomyopathy and cardiomegaly identifies Chagas disease and points to this vector-parasite pair.

### Clinical significance
Correctly classifying the vector phase links the Chagas-disease presentation to its parasite-vector biology and separates cyclopropagative transmission from the two single-process distractors.

### Common misconceptions
Do not choose propagative if the organism also changes developmentally inside the vector, and do not choose cyclodevelopmental if multiplication also occurs. The combined prefix is the clue: cyclo for development plus propagative for multiplication.

## published_summary


## published_sections


## hold_these
Cyclopropagative means both development and multiplication inside the vector.

## lose_the_mark
Choosing propagative or cyclodevelopmental when both development and multiplication occur.

## callout_evidence
### Cyclopropagative means both development and multiplication inside the vector.
Claims: CLM-INF-MUST-FHB1022-VECTOR-01
Citations: CIT-INF-MUST-FHB1022-VECTOR-01
CIT-INF-MUST-FHB1022-VECTOR-02
Reviewed by: pending medical review

## related_concepts
${conceptId}

## related_articles
ART-INF-TOP-A50AA5171A: Medical Parasitology overview

## question_ids
QST-MUST-FHB1022-PARA-VECT-Q01

## resource_ids
${teachingResourceId}
${assessmentResourceId}
${definitionResourceId}

## article_source_ids
${teachingResourceId}
${definitionResourceId}

## claim_ids
CLM-INF-MUST-FHB1022-VECTOR-01

## span_ids
SPN-INF-MUST-FHB1022-VECTOR-01

## university_notes
must: The first clean-key question comes from the governed FHB102-2 module-wide MCQ family and is corroborated by the MUST Parasitology Department Vectors of Disease Transmission carrier.

## annotations
### definition_of · ${conceptId}
Quote: Cyclopropagative transmission combines two events: developmental change and multiplication inside the vector.
Block: body
Id: ann-must-fhb1022-vector-001

## media


## publication_gate
needs_evidence

## evidence_basis
MUST Faculty of Medicine Parasitology Department, Prof. Heba Abdel Aaty, FHB102-2 Vectors of Disease Transmission, visually read p2.
Anonymous FHB102-2 MCQ bank, visually read p1 prompt Q1 and p5 printed answer D.
FHB Para Myiasis Midterm Notes, visually read p2 direct definition; non-official author metadata Ebedo.

## evidence_gaps
Independent standard-reference review is required before publication.
Q3 and Q6 are deliberately outside this article and remain key-conflict holds in the authoring ledger.

## conflicts
No key conflict affects authored Q1. Q3 and Q6 were not authored because their printed keys conflict with the stem wording or department evidence; no correction has been imported.

## last_reviewed


## review_due


## notes
Question-led first slice only. Q1 is the sole authored question; Q3 and Q6 are explicit holds. No record is authorised for upload.

## field_notes
arabicTitle: Arabic terminology has not been medically reviewed; left empty rather than guessed.
nanotopicId: No verified nanotopic below the selected discipline node exists for this article.
media: No image, audio or video is required to answer this text-only classification slice.
lastReviewed: Draft has not completed medical review.
reviewDue: Set after the first review is completed.
publishedSummary: Draft has no student-safe published projection.
publishedSections: Draft has no student-safe published projection.
relatedArticles: The existing Medical Parasitology overview is the only necessary adjacent reading link for this first bounded slice.
`
}

function q({ id, title, correct, answers, explanations, difficulty, effort, effortScore, inferred, objective, sourceKey, override }) {
  const answerBlocks = ['a', 'b', 'c', 'd'].map((letter, index) => `## answer_${letter}\n${answers[index]}\n\n## explanation_${letter}\n${explanations[index]}`).join('\n\n')
  return `# Item

## id
${id}

## title
${title}

## question
${title}

## subject
inf

## status
Draft

## owner
Dr. Omar

## vignette


## format
single best answer

## derived_from
Transcribed from ${assessmentResourceId}, with key governance checked against ${teachingResourceId} and explanation wording supported by ${definitionResourceId}.

## correct_answer
${correct}

${answerBlocks}

## topic
Parasitology

## subtopic
Arthropods and vectors

## main_concept
${conceptId}

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
${difficulty}

## question_type
${id.endsWith('Q06') ? 'Classification' : 'Mechanism'}

## cognitive_effort
${effort}

## cognitive_effort_score
${effortScore}

## setting
Academic

## reasoning_level
2

## inferred_difficulty
${inferred}

## exam_relevance
8

## clinical_relevance
0.45

## academic_relevance
0.9

## exam_weight_by_year
MUST_Y1=0.65

## years
MUST_Y1

## universities
must

## module
${moduleId}

## module_subject
${moduleId} > Parasitology > Arthropods and vectors > Cyclopropagative transmission

## question_only_for
MUST_Y1

## library_ids
${articleId}

## resource_ids
${assessmentResourceId}
${teachingResourceId}
${definitionResourceId}

## learning_objective
${objective}

## source_citation
FHB102-2 anonymous MCQ bank, p1, printed key p5 (${sourceKey}); MUST Faculty of Medicine Parasitology Department, Vectors of Disease Transmission by Prof. Heba Abdel Aaty, p2; FHB Para Myiasis Midterm Notes, p2 direct transmission-category definition.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
55

## randomise_answers
yes

## author_notes
Printed source key: ${sourceKey}. ${override}
`
}

function questions() {
  const records = [
    q({
      id: 'QST-MUST-FHB1022-PARA-VECT-Q01',
      title: 'A South American developed unilateral oedema of the eye after a vector bite that disappeared with time; he later developed a cardiac problem and cardiomegaly. What is the type of transmission of the causative organism inside the vector?',
      correct: 'D',
      answers: ['Cyclodevelopmental', 'Propagative', 'Transovarian', 'Cyclopropagative'],
      explanations: [
        'Incorrect. Cyclodevelopmental transmission means the organism develops inside the vector without multiplying, which does not describe Trypanosoma cruzi in Triatoma.',
        'Incorrect. Propagative transmission is multiplication without developmental change, whereas the parasite in this stem both develops and multiplies inside its vector.',
        'Incorrect. Transovarian transmission is passage from an infected female arthropod to its offspring through eggs, not the process described in this Chagas-disease vignette.',
        'Correct. The unilateral periorbital oedema followed by cardiomyopathy points to Trypanosoma cruzi infection transmitted by Triatoma. The parasite undergoes developmental change and multiplication inside the vector, so the mode is cyclopropagative. Hold the prefix pair: cyclo means development and propagative means multiplication.',
      ],
      difficulty: 'Moderate', effort: 'Medium', effortScore: '0.5', inferred: '55',
      objective: 'Recognise cyclopropagative transmission when a parasite both develops and multiplies inside its arthropod vector.',
      sourceKey: 'Q1 = D',
      override: 'The printed key agrees with the MUST department teaching carrier; no override was made.',
    }),
  ]
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->\n\n${records.join('\n\n---\n\n')}`
}

function trypClaims() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
CLM-INF-MUST-FHB1022-TRYP-01

## concept_id
${trypConceptId}

## subject
West African trypanosomiasis

## predicate
has blood-film diagnostic stage

## object
the polymorphic trypomastigote, seen extracellularly between red blood cells

## display_text
The blood-film diagnostic stage of West African trypanosomiasis is the polymorphic trypomastigote, seen extracellularly between red blood cells.

## risk_class
foundational_stable

## verification_status
verified

## conflict_status
none

## confidence
0.85

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
curriculum: MUST FHB102-2 Parasitology
species_context: Trypanosoma brucei gambiense
`
}

function trypCitations() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
CIT-INF-MUST-FHB1022-TRYP-01

## claim_id
CLM-INF-MUST-FHB1022-TRYP-01

## resource_id
${teachingResourceId}

## evidence_role
local_curriculum

## support_span
After several month of safari in West Africa ... enlarged lymph nodes ... lethargy and drowsiness ... parasitic stages between RBCs ... c. Polymorphic trypomastigote; D.S: polymorphic trypanosomes.

## locator_type
page

## locator_page
5

## locator_section
West African sleeping sickness blood-film stage

## locator_detail
PDF page 5, middle question, highlighted option C and adjacent yellow teaching-note box.

## context_note
The department-branded carrier matches the bank stem and directly identifies the polymorphic trypomastigote as the diagnostic blood stage.

## confidence
0.85

## counts_as_claim_evidence
yes
`
}

function trypSpans() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
SPN-INF-MUST-FHB1022-TRYP-01

## article_id
${trypArticleId}

## section_id
art-inf-must-fhb1022-african-trypanosomiasis-stage-definition

## text
The blood-film diagnostic stage of West African trypanosomiasis is the polymorphic trypomastigote, seen extracellularly between red blood cells.

## claim_ids
CLM-INF-MUST-FHB1022-TRYP-01

## citation_ids
CIT-INF-MUST-FHB1022-TRYP-01
`
}

function trypConcepts() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
${trypConceptId}

## label
Polymorphic trypomastigote in West African trypanosomiasis

## canonical_key
parasitology.african-trypanosomiasis.diagnostic-blood-stage

## aliases
African sleeping sickness blood-film stage
Trypanosoma brucei gambiense diagnostic stage
Polymorphic trypomastigote

## arabic_label


## arabic_aliases
[clear]

## definition
In West African sleeping sickness, the diagnostic parasite form shown in a peripheral blood film is the polymorphic trypomastigote, lying extracellularly between red blood cells.

## explicit_objective
Identify the polymorphic trypomastigote as the diagnostic blood-film stage in a West African trypanosomiasis vignette.

## pitfalls
Choosing amastigote, promastigote or epimastigote despite the West African sleeping-sickness pattern and the stated extracellular blood-film finding.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAR-T01

## secondary_node_ids
DIS-PAR-T03
SYS-FND-T05-S02-M02

## topic
Parasitology

## subtopic
Protozoology

## microtopic
African trypanosomiasis

## nanotopic


## modules
${moduleId}

## module_subject
${moduleId} > Parasitology > Protozoology > African trypanosomiasis

## article_ids
${trypArticleId}

## related_article_ids
${articleId}

## related_concept_ids
[clear]

## resource_ids
${teachingResourceId}
${assessmentResourceId}

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
must

## blueprint_weight
0.65

## exam_weight_by_year
MUST_Y1=0.65

## clinical_relevance
0.65

## academic_relevance
0.9

## weight_confidence
0.6

## confidence
0.85

## atomic_claim_ids
CLM-INF-MUST-FHB1022-TRYP-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## exam_signal
${assessmentResourceId} | tier 3 | undated | p1 Q5; printed answer p5
${teachingResourceId} | tier 2 | undated | p5 department teaching and highlighted answer

## original_wording
Q5 asks the diagnostic stage in a blood film after West African exposure, posterior cervical lymph-node enlargement, lethargy and drowsiness; printed key C, trypomastigote.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
No key conflict affects authored Q5. Its printed C agrees with the department carrier's highlighted polymorphic trypomastigote. Q2, Q3, Q4 and Q6 remain separate authoring holds.

## uncertainty
The anonymous bank labels option C generically as trypomastigote; the department carrier supplies the more specific polymorphic qualifier used in the Draft explanation.

## evidence_gaps
The source set is local curriculum evidence. Independent standard-reference review remains required before publication.

## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
arabicLabel: Arabic terminology has not been reviewed; left empty rather than guessed.
arabicAliases: No reviewed Arabic aliases were supplied.
microtopicId: The canonical Parasitology taxonomy stops at the Protozoology topic for this lane; the narrower curriculum phrase is retained in module_subject rather than inventing a node.
nanotopicId: No verified nanotopic below the selected discipline node exists for this concept.
approvedFileResourceIds: Neither locally supplied PDF has been rights-cleared as a student-downloadable file.
approvedVideoResourceIds: No video source was supplied.
resourceOccurrenceIds: Hand-authored from governed FHB-102-2 evidence; no extraction occurrence record was minted.
sourceCandidateIds: Searches for African trypanosomiasis diagnostic stage, polymorphic trypomastigote, West African sleeping-sickness blood film, Winterbottom sign diagnostic stage and the exact stem phrase returned no live or pending record.
lastReviewed: New under-review record; no medical reviewer has completed review.
reviewDue: Set after the first review is completed.
relationships: The first blood-stage slice has no necessary typed relation record; related reading points to the existing vector-transmission article.
`
}

function trypArticles() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
${trypArticleId}

## title
Diagnostic blood stage in West African trypanosomiasis

## arabic_title


## aliases
African sleeping sickness blood-film stage
Polymorphic trypomastigote in blood

## subject
inf

## status
Draft

## owner
Dr. Omar

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## topic
Parasitology

## subtopic
Protozoology

## microtopic
African trypanosomiasis

## nanotopic


## primary_node_id
DIS-PAR-T01

## secondary_node_ids
DIS-PAR-T03
SYS-FND-T05-S02-M02

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1–3 foundation

## reading_time
4

## high_yield
High

## time_sensitive
stable

## universities
must

## years
MUST_Y1

## module
${moduleId}

## module_subject
${moduleId} > Parasitology > Protozoology > African trypanosomiasis

## summary
A West African exposure history, posterior cervical lymph-node enlargement, lethargy and drowsiness point to African sleeping sickness. In the local curriculum carrier, the diagnostic blood-film stage is the polymorphic trypomastigote.

## sections
### Definition
The blood-film diagnostic stage of West African trypanosomiasis is the polymorphic trypomastigote, seen extracellularly between red blood cells.

### Mechanism
The question places the parasite between red blood cells rather than inside them. The tested task is morphological stage recognition in a blood film, not vector-stage transmission.

### Key determinants
West African travel, enlarged lymph nodes at the back of the neck, and later lethargy and drowsiness form the local sleeping-sickness pattern. The department note associates West Africa with Trypanosoma gambiense and labels the diagnostic blood form as polymorphic trypanosomes.

### Clinical significance
Reading the exposure, posterior cervical nodes and neurological symptoms together narrows the vignette before the blood-film stage is selected.

### Common misconceptions
Do not choose a distractor merely because it is another named kinetoplastid form. In this source pair, option C and the department carrier both identify the trypomastigote, with the department carrier adding the polymorphic qualifier.

## published_summary


## published_sections


## hold_these
The blood-film diagnostic stage of West African trypanosomiasis is the polymorphic trypomastigote.

## lose_the_mark
Ignoring the West African exposure, posterior cervical nodes and drowsiness when selecting the blood-film form.

## callout_evidence
### The blood-film diagnostic stage of West African trypanosomiasis is the polymorphic trypomastigote.
Claims: CLM-INF-MUST-FHB1022-TRYP-01
Citations: CIT-INF-MUST-FHB1022-TRYP-01
Reviewed by: pending medical review

## related_concepts
${trypConceptId}

## related_articles
${articleId}: Cyclopropagative transmission in arthropod vectors

## question_ids
QST-MUST-FHB1022-PARA-VECT-Q05

## resource_ids
${teachingResourceId}
${assessmentResourceId}

## article_source_ids
${teachingResourceId}

## claim_ids
CLM-INF-MUST-FHB1022-TRYP-01

## span_ids
SPN-INF-MUST-FHB1022-TRYP-01

## university_notes
must: Q5 comes from the governed FHB102-2 module-wide MCQ family and is corroborated by the MUST Parasitology Department Vectors of Disease Transmission carrier.

## annotations
### definition_of · ${trypConceptId}
Quote: The blood-film diagnostic stage of West African trypanosomiasis is the polymorphic trypomastigote, seen extracellularly between red blood cells.
Block: body
Id: ann-must-fhb1022-tryp-001

## media


## publication_gate
needs_evidence

## evidence_basis
MUST Faculty of Medicine Parasitology Department, Prof. Heba Abdel Aaty, FHB102-2 Vectors of Disease Transmission, visually read p5.
Anonymous FHB102-2 MCQ bank, visually read p1 prompt Q5 and p5 printed answer C.

## evidence_gaps
Independent standard-reference review is required before publication.
Q2, Q3, Q4 and Q6 remain outside this article as explicit key-conflict holds.

## conflicts
No key conflict affects authored Q5. The anonymous bank's generic trypomastigote answer agrees with the department carrier's more specific polymorphic trypomastigote.

## last_reviewed


## review_due


## notes
Second bounded question-led slice only. Q5 is the sole newly authored question; no held item is represented as a student-facing record, and no record is authorised for upload.

## field_notes
arabicTitle: Arabic terminology has not been medically reviewed; left empty rather than guessed.
nanotopicId: No verified nanotopic below the selected discipline node exists for this article.
media: No image, audio or video is required to answer this text-only diagnostic-stage slice.
lastReviewed: Draft has not completed medical review.
reviewDue: Set after the first review is completed.
publishedSummary: Draft has no student-safe published projection.
publishedSections: Draft has no student-safe published projection.
relatedArticles: The existing cyclopropagative-transmission article is the necessary adjacent vector-biology reading link.
`
}

function trypQuestions() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
QST-MUST-FHB1022-PARA-VECT-Q05

## title
After several months of safari in West Africa, a man developed enlarged lymph nodes at the back of his neck, followed later by lethargy and drowsiness. His blood film revealed parasitic stages between red blood cells. What is the diagnostic stage in the blood film?

## question
After several months of safari in West Africa, a man developed enlarged lymph nodes at the back of his neck, followed later by lethargy and drowsiness. His blood film revealed parasitic stages between red blood cells. What is the diagnostic stage in the blood film?

## subject
inf

## status
Draft

## owner
Dr. Omar

## vignette


## format
single best answer

## derived_from
Transcribed from ${assessmentResourceId}, with the printed key checked against ${teachingResourceId}.

## correct_answer
C

## answer_a
Epimastigote

## explanation_a
Incorrect. The department carrier does not identify epimastigote as the diagnostic blood-film form in this West African sleeping-sickness vignette.

## answer_b
Amastigote

## explanation_b
Incorrect. The local teaching note identifies polymorphic trypomastigotes, not amastigotes, as the diagnostic forms seen in blood.

## answer_c
Trypomastigote

## explanation_c
Correct. West African exposure, posterior cervical lymph-node enlargement, lethargy and drowsiness match the sleeping-sickness pattern in the department carrier. The parasite is described between red blood cells, and the highlighted diagnostic blood-film answer is the polymorphic trypomastigote. The anonymous bank prints C, so no answer override is made.

## answer_d
Promastigote

## explanation_d
Incorrect. The department carrier's highlighted blood-film answer is polymorphic trypomastigote rather than promastigote.

## topic
Parasitology

## subtopic
Protozoology

## main_concept
${trypConceptId}

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Diagnosis

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
8

## clinical_relevance
0.65

## academic_relevance
0.9

## exam_weight_by_year
MUST_Y1=0.65

## years
MUST_Y1

## universities
must

## module
${moduleId}

## module_subject
${moduleId} > Parasitology > Protozoology > African trypanosomiasis

## question_only_for
MUST_Y1

## library_ids
${trypArticleId}

## resource_ids
${assessmentResourceId}
${teachingResourceId}

## learning_objective
Identify the polymorphic trypomastigote as the diagnostic blood-film stage in a West African sleeping-sickness vignette.

## source_citation
FHB102-2 anonymous MCQ bank, p1, printed key p5 (Q5 = C); MUST Faculty of Medicine Parasitology Department, Vectors of Disease Transmission by Prof. Heba Abdel Aaty, p5.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
55

## randomise_answers
yes

## author_notes
Printed source key: Q5 = C. The printed key agrees with the department carrier's highlighted polymorphic trypomastigote; no override was made.
`
}

function lymeClaims() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
CLM-INF-MUST-FHB1022-LYME-01

## concept_id
${lymeConceptId}

## subject
Lyme disease vector

## predicate
is_transmitted_by

## object
the hard tick Ixodes; the associated clinical pattern includes erythema chronicum migrans, large-joint arthritis and facial palsy

## display_text
Lyme disease is transmitted by the hard tick Ixodes; the associated clinical pattern includes erythema chronicum migrans, large-joint arthritis and facial palsy.

## risk_class
foundational_stable

## verification_status
verified

## conflict_status
none

## confidence
0.9

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
curriculum: MUST FHB102-2 Parasitology
organism: Borrelia burgdorferi
`
}

function lymeCitations() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
CIT-INF-MUST-FHB1022-LYME-01

## claim_id
CLM-INF-MUST-FHB1022-LYME-01

## resource_id
${ticksResourceId}

## evidence_role
local_curriculum

## support_span
Lyme disease; Erythema Chronicum Migrans; Arthritis of large joints; Facial paralysis (palsy); Hard tick (Ixodes); Borrelia burgdorferi; Bite of Ticks.

## locator_type
page

## locator_page
29

## locator_section
Spirochaetal infections — Lyme disease

## locator_detail
PDF page 29, Lyme-disease row spanning the infection, clinical-features, tick, causative-organism and mode-of-infection columns.

## context_note
The university-branded FHB102-2 teaching table directly matches the bank vignette's geography and clinical features and names hard tick Ixodes as the vector.

## confidence
0.9

## counts_as_claim_evidence
yes
`
}

function lymeSpans() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
SPN-INF-MUST-FHB1022-LYME-01

## article_id
${lymeArticleId}

## section_id
art-inf-must-fhb1022-lyme-ixodes-definition

## text
Lyme disease is transmitted by the hard tick Ixodes. Erythema migrans followed by large-joint arthritis and facial palsy is a characteristic clinical sequence.

## claim_ids
CLM-INF-MUST-FHB1022-LYME-01

## citation_ids
CIT-INF-MUST-FHB1022-LYME-01
`
}

function lymeConcepts() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
${lymeConceptId}

## label
Ixodes as the vector of Lyme disease

## canonical_key
parasitology.lyme-disease.ixodes-vector

## aliases
Lyme disease tick vector
Hard tick vector of Borrelia burgdorferi
Ixodes transmission of Lyme disease

## arabic_label


## arabic_aliases
[clear]

## definition
Lyme disease is transmitted by hard ticks of the genus Ixodes. The clinical pattern may begin with erythema migrans and later include large-joint arthritis and facial palsy.

## explicit_objective
Identify Ixodes as the vector when a Lyme disease vignette combines erythema migrans with later large-joint arthritis and facial palsy.

## pitfalls
Selecting another arthropod genus despite the characteristic Lyme disease sequence of erythema migrans, large-joint arthritis and facial palsy.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAR-T03

## secondary_node_ids
SYS-FND-T05-S02-M02
DIS-PAR

## topic
Parasitology

## subtopic
Arthropods and vectors

## microtopic
Tick-borne disease

## nanotopic


## modules
${moduleId}

## module_subject
${moduleId} > Parasitology > Arthropods and vectors > Tick-borne disease

## article_ids
${lymeArticleId}

## related_article_ids
${articleId}
${trypArticleId}

## related_concept_ids
[clear]

## resource_ids
${ticksResourceId}
${assessmentResourceId}

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
must

## blueprint_weight
0.65

## exam_weight_by_year
MUST_Y1=0.65

## clinical_relevance
0.75

## academic_relevance
0.9

## weight_confidence
0.65

## confidence
0.9

## atomic_claim_ids
CLM-INF-MUST-FHB1022-LYME-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## exam_signal
${assessmentResourceId} | tier 3 | undated | p2 Q7; printed answer p5
${ticksResourceId} | tier 2 | undated | p29 direct university teaching table

## original_wording
Q7 describes erythema migrans in the USA followed by knee arthritis and facial palsy, then asks for the vector; printed key B, Ixodes.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
No key conflict affects authored Q7. Its printed B agrees with the university teaching table's hard tick Ixodes. Q2, Q3, Q4 and Q6 remain separate authoring holds.

## uncertainty
The question bank misspells erythema migrans and several distractor genera; the Draft student-facing record standardises spelling without changing the tested meaning or answer.

## evidence_gaps
The source set is local curriculum evidence. Independent standard-reference review remains required before publication.

## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
arabicLabel: Arabic terminology has not been reviewed; left empty rather than guessed.
arabicAliases: No reviewed Arabic aliases were supplied.
microtopicId: The canonical Parasitology taxonomy stops at the Arthropods and vectors topic for this lane; the narrower curriculum phrase is retained in module_subject rather than inventing a node.
nanotopicId: No verified nanotopic below the selected discipline node exists for this concept.
approvedFileResourceIds: Neither locally supplied PDF has been rights-cleared as a student-downloadable file.
approvedVideoResourceIds: No video source was supplied.
resourceOccurrenceIds: Hand-authored from governed FHB-102-2 evidence; no extraction occurrence record was minted.
sourceCandidateIds: Searches for Lyme disease Ixodes vector, erythema migrans with arthritis and facial palsy, Borrelia burgdorferi hard-tick vector, Ixodes transmission of Lyme disease and the exact stem phrase returned no live or pending record.
lastReviewed: New under-review record; no medical reviewer has completed review.
reviewDue: Set after the first review is completed.
relationships: This bounded slice has no necessary evidence-backed typed relation record; related reading points to the two previously authored local Parasitology articles.
`
}

function lymeArticles() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
${lymeArticleId}

## title
Ixodes and the clinical pattern of Lyme disease

## arabic_title


## aliases
Lyme disease vector
Hard tick transmission of Lyme disease

## subject
inf

## status
Draft

## owner
Dr. Omar

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## topic
Parasitology

## subtopic
Arthropods and vectors

## microtopic
Tick-borne disease

## nanotopic


## primary_node_id
DIS-PAR-T03

## secondary_node_ids
SYS-FND-T05-S02-M02
DIS-PAR

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1–3 foundation

## reading_time
4

## high_yield
High

## time_sensitive
stable

## universities
must

## years
MUST_Y1

## module
${moduleId}

## module_subject
${moduleId} > Parasitology > Arthropods and vectors > Tick-borne disease

## summary
Lyme disease is transmitted by the hard tick Ixodes. A vignette that starts with erythema migrans and later develops large-joint arthritis and facial palsy is designed to identify that vector.

## sections
### Definition
Lyme disease is transmitted by the hard tick Ixodes. Erythema migrans followed by large-joint arthritis and facial palsy is a characteristic clinical sequence.

### Mechanism
The tick bite transmits Borrelia burgdorferi. The question tests recognition of the vector from a time-linked clinical pattern rather than recognition from an image of the arthropod.

### Key determinants
The decisive features are exposure in the USA, an early erythema migrans lesion, later knee arthritis and facial palsy. Together they indicate Lyme disease, whose vector is Ixodes.

### Clinical significance
The rash-to-neurological-and-joint progression provides a compact way to distinguish Lyme disease from unrelated vector-borne syndromes.

### Common misconceptions
Do not select another named arthropod solely because it can transmit infection. First identify the Lyme disease syndrome, then choose its hard-tick vector, Ixodes.

## published_summary


## published_sections


## hold_these
Lyme disease is transmitted by the hard tick Ixodes.

## lose_the_mark
Failing to connect erythema migrans followed by large-joint arthritis and facial palsy with Lyme disease.

## callout_evidence
### Lyme disease is transmitted by the hard tick Ixodes.
Claims: CLM-INF-MUST-FHB1022-LYME-01
Citations: CIT-INF-MUST-FHB1022-LYME-01
Reviewed by: pending medical review

## related_concepts
${lymeConceptId}

## related_articles
${articleId}: Cyclopropagative transmission in arthropod vectors
${trypArticleId}: Diagnostic blood stage in West African trypanosomiasis

## question_ids
QST-MUST-FHB1022-PARA-VECT-Q07

## resource_ids
${ticksResourceId}
${assessmentResourceId}

## article_source_ids
${ticksResourceId}

## claim_ids
CLM-INF-MUST-FHB1022-LYME-01

## span_ids
SPN-INF-MUST-FHB1022-LYME-01

## university_notes
must: Q7 comes from the governed FHB102-2 module-wide MCQ family and is corroborated by the university Parasitology Department ticks lecture.

## annotations
### definition_of · ${lymeConceptId}
Quote: Lyme disease is transmitted by the hard tick Ixodes. Erythema migrans followed by large-joint arthritis and facial palsy is a characteristic clinical sequence.
Block: body
Id: ann-must-fhb1022-lyme-001

## media


## publication_gate
needs_evidence

## evidence_basis
MUST Faculty of Medicine Parasitology Department, FHB102-2 Vectors of Disease Transmission ticks lecture, visually read pp1 and 29–30.
Anonymous FHB102-2 MCQ bank, visually read p2 prompt Q7 and p5 printed answer B.

## evidence_gaps
Independent standard-reference review is required before publication.
Q2, Q3, Q4 and Q6 remain outside this article as explicit key-conflict holds.

## conflicts
No key conflict affects authored Q7. The anonymous bank's printed B agrees with the university teaching table's hard tick Ixodes.

## last_reviewed


## review_due


## notes
Third bounded question-led slice only. Q7 is the sole newly authored question; no held item is represented as a student-facing record, and no record is authorised for upload.

## field_notes
arabicTitle: Arabic terminology has not been medically reviewed; left empty rather than guessed.
nanotopicId: No verified nanotopic below the selected discipline node exists for this article.
media: The source lecture includes an illustrative erythema-migrans slide, but the question is answerable from its text and no student-facing image is required.
lastReviewed: Draft has not completed medical review.
reviewDue: Set after the first review is completed.
publishedSummary: Draft has no student-safe published projection.
publishedSections: Draft has no student-safe published projection.
relatedArticles: The two prior local Parasitology articles provide adjacent vector-transmission and parasite-stage reading.
`
}

function lymeQuestions() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
QST-MUST-FHB1022-PARA-VECT-Q07

## title
While in the USA, a university student developed erythema migrans on his back. Three months later he developed knee arthritis and facial palsy. Which vector would be expected in the surrounding park bushes?

## question
While in the USA, a university student developed erythema migrans on his back. Three months later he developed knee arthritis and facial palsy. Which vector would be expected in the surrounding park bushes?

## subject
inf

## status
Draft

## owner
Dr. Omar

## vignette


## format
single best answer

## derived_from
Transcribed from ${assessmentResourceId}, with the printed key checked against ${ticksResourceId}.

## correct_answer
B

## answer_a
Ornithodoros

## explanation_a
Incorrect. This vignette combines erythema migrans, large-joint arthritis and facial palsy, so the expected vector is Ixodes rather than Ornithodoros.

## answer_b
Ixodes

## explanation_b
Correct. Erythema migrans followed by large-joint arthritis and facial palsy is the characteristic Lyme disease pattern. Lyme disease is transmitted by the hard tick Ixodes. Therefore, Ixodes is the best answer.

## answer_c
Triatoma

## explanation_c
Incorrect. The clinical sequence identifies Lyme disease, whose hard-tick vector is Ixodes rather than Triatoma.

## answer_d
Trombicula

## explanation_d
Incorrect. The Lyme disease pattern in this vignette points to Ixodes rather than Trombicula.

## topic
Parasitology

## subtopic
Arthropods and vectors

## main_concept
${lymeConceptId}

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Diagnosis

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
8

## clinical_relevance
0.75

## academic_relevance
0.9

## exam_weight_by_year
MUST_Y1=0.65

## years
MUST_Y1

## universities
must

## module
${moduleId}

## module_subject
${moduleId} > Parasitology > Arthropods and vectors > Tick-borne disease

## question_only_for
MUST_Y1

## library_ids
${lymeArticleId}

## resource_ids
${assessmentResourceId}
${ticksResourceId}

## learning_objective
Identify Ixodes as the vector in a Lyme disease vignette combining erythema migrans with later large-joint arthritis and facial palsy.

## source_citation
FHB102-2 anonymous MCQ bank, p2, printed key p5 (Q7 = B); MUST Faculty of Medicine Parasitology Department, FHB102-2 Vectors of Disease Transmission ticks lecture, p29.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
55

## randomise_answers
yes

## author_notes
Printed source key: Q7 = B. The printed key agrees with the university teaching table's hard tick Ixodes; no override was made. Source spelling was standardised without changing the answer.
`
}

function relapsingClaims() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
CLM-INF-MUST-FHB1022-RELAPSING-01

## concept_id
${relapsingConceptId}

## subject
Louse-borne epidemic relapsing fever

## predicate
is_transmitted_by

## object
the body louse Pediculus humanus corporis; Borrelia recurrentis causes recurrent spirochaetemia with a 3–6-day febrile period followed by a 5–10-day afebrile period

## display_text
Epidemic relapsing fever is transmitted by the body louse Pediculus humanus corporis; Borrelia recurrentis causes recurrent spirochaetemia with a 3–6-day febrile period followed by a 5–10-day afebrile period.

## risk_class
foundational_stable

## verification_status
verified

## conflict_status
none

## confidence
0.9

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
curriculum: MUST FHB102-2 Parasitology
organism: Borrelia recurrentis
vector: Pediculus humanus corporis
`
}

function relapsingCitations() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
CIT-INF-MUST-FHB1022-RELAPSING-01

## claim_id
CLM-INF-MUST-FHB1022-RELAPSING-01

## resource_id
${liceResourceId}

## evidence_role
local_curriculum

## support_span
Pediculus humanus corporis (Body louse); Epidemic relapsing fever; Borrelia recurrentis (Spirochaetes); crushing the louse on the skin or mucous membrane.

## locator_type
page

## locator_page
17

## locator_section
Order Anoplura — diseases transmitted by the body louse

## locator_detail
PDF page 17, body-louse disease table, epidemic-relapsing-fever row.

## context_note
The university-branded FHB102-2 teaching table directly names the body louse and Borrelia recurrentis for epidemic relapsing fever.

## confidence
0.9

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-INF-MUST-FHB1022-RELAPSING-02

## claim_id
CLM-INF-MUST-FHB1022-RELAPSING-01

## resource_id
${liceResourceId}

## evidence_role
local_curriculum

## support_span
Recurrent fever corresponding to spirochaetemia; 3–6 days febrile period followed by 5–10 days afebrile period; a single relapse characterizes louse-borne relapsing fever; headache, boneache and rash.

## locator_type
page

## locator_page
26

## locator_section
Louse-borne epidemic relapsing fever — clinical pattern

## locator_detail
PDF page 26, clinical bullets matching the Q8 time course and symptoms.

## context_note
The clinical slide directly matches the stem's spirochaetemia, fever interval, headache, bony aches and rash.

## confidence
0.9

## counts_as_claim_evidence
yes
`
}

function relapsingSpans() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
SPN-INF-MUST-FHB1022-RELAPSING-01

## article_id
${relapsingArticleId}

## section_id
art-inf-must-fhb1022-epidemic-relapsing-fever-definition

## text
Epidemic relapsing fever is transmitted by the body louse Pediculus humanus corporis. Recurrent spirochaetemia produces a 3–6-day febrile period followed by a 5–10-day afebrile period.

## claim_ids
CLM-INF-MUST-FHB1022-RELAPSING-01

## citation_ids
CIT-INF-MUST-FHB1022-RELAPSING-01
CIT-INF-MUST-FHB1022-RELAPSING-02
`
}

function relapsingConcepts() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
${relapsingConceptId}

## label
Body louse vector of epidemic relapsing fever

## canonical_key
parasitology.epidemic-relapsing-fever.body-louse-vector

## aliases
Louse-borne relapsing fever vector
Pediculus humanus corporis and Borrelia recurrentis
Epidemic relapsing fever transmission

## arabic_label


## arabic_aliases
[clear]

## definition
Epidemic relapsing fever is transmitted by the body louse Pediculus humanus corporis. Borrelia recurrentis produces recurrent spirochaetemia with a 3–6-day febrile period followed by a 5–10-day afebrile period.

## explicit_objective
Identify the body louse as the vector when a Sudan epidemic vignette describes spirochaetemia with 3–6 febrile days followed by 5–10 afebrile days.

## pitfalls
Confusing louse-borne epidemic relapsing fever with flea-borne disease or selecting the head louse despite the explicit body-louse association.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAR-T03

## secondary_node_ids
SYS-FND-T05-S02-M02
DIS-PAR

## topic
Parasitology

## subtopic
Arthropods and vectors

## microtopic
Louse-borne disease

## nanotopic


## modules
${moduleId}

## module_subject
${moduleId} > Parasitology > Arthropods and vectors > Louse-borne disease

## article_ids
${relapsingArticleId}

## related_article_ids
${articleId}
${lymeArticleId}

## related_concept_ids
[clear]

## resource_ids
${liceResourceId}
${assessmentResourceId}

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
must

## blueprint_weight
0.65

## exam_weight_by_year
MUST_Y1=0.65

## clinical_relevance
0.7

## academic_relevance
0.9

## weight_confidence
0.65

## confidence
0.9

## atomic_claim_ids
CLM-INF-MUST-FHB1022-RELAPSING-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## exam_signal
${assessmentResourceId} | tier 3 | undated | p2 Q8; printed answer p5
${liceResourceId} | tier 2 | undated | pp17,25–26 direct university teaching

## original_wording
Q8 describes a Sudan epidemic with 3–6 febrile days, 5–10 afebrile days, headache, bony aches, rash and blood-film spirochaetes, then asks for the vector; printed key A, body louse.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
No key conflict affects authored Q8. Its printed A agrees with the university lecture's Pediculus humanus corporis association. Q2, Q3, Q4 and Q6 remain separate authoring holds.

## uncertainty
The source bank contains punctuation and grammar defects; the Draft student-facing record standardises them without changing the tested meaning, option order or answer.

## evidence_gaps
The source set is local curriculum evidence. Independent standard-reference review remains required before publication.

## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
arabicLabel: Arabic terminology has not been reviewed; left empty rather than guessed.
arabicAliases: No reviewed Arabic aliases were supplied.
microtopicId: The canonical Parasitology taxonomy stops at the Arthropods and vectors topic for this lane; the narrower curriculum phrase is retained in module_subject rather than inventing a node.
nanotopicId: No verified nanotopic below the selected discipline node exists for this concept.
approvedFileResourceIds: Neither locally supplied PDF has been rights-cleared as a student-downloadable file.
approvedVideoResourceIds: No video source was supplied.
resourceOccurrenceIds: Hand-authored from governed FHB-102-2 evidence; no extraction occurrence record was minted.
sourceCandidateIds: Searches for epidemic relapsing fever body-louse vector, Pediculus humanus corporis, Borrelia recurrentis, the fever interval and the exact clinical stem returned no live or pending record.
lastReviewed: New under-review record; no medical reviewer has completed review.
reviewDue: Set after the first review is completed.
relationships: This bounded slice has no necessary evidence-backed typed relation record; related reading points to prior local vector-transmission articles.
`
}

function relapsingArticles() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
${relapsingArticleId}

## title
Body-louse transmission of epidemic relapsing fever

## arabic_title


## aliases
Louse-borne epidemic relapsing fever
Pediculus humanus corporis vector

## subject
inf

## status
Draft

## owner
Dr. Omar

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## topic
Parasitology

## subtopic
Arthropods and vectors

## microtopic
Louse-borne disease

## nanotopic


## primary_node_id
DIS-PAR-T03

## secondary_node_ids
SYS-FND-T05-S02-M02
DIS-PAR

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1–3 foundation

## reading_time
4

## high_yield
High

## time_sensitive
stable

## universities
must

## years
MUST_Y1

## module
${moduleId}

## module_subject
${moduleId} > Parasitology > Arthropods and vectors > Louse-borne disease

## summary
Epidemic relapsing fever is transmitted by the body louse Pediculus humanus corporis. A Sudan vignette with recurrent spirochaetemia and a 3–6-day febrile period followed by a 5–10-day afebrile period points to this vector.

## sections
### Definition
Epidemic relapsing fever is transmitted by the body louse Pediculus humanus corporis. Recurrent spirochaetemia produces a 3–6-day febrile period followed by a 5–10-day afebrile period.

### Mechanism
The causative spirochaete is Borrelia recurrentis. Transmission occurs when an infected body louse is crushed on skin or mucous membrane, releasing organisms from its body fluids.

### Key determinants
Sudan exposure, an epidemic warning, recurrent fever, headache, bony aches, rash and spirochaetes seen during the febrile period form the recognition pattern. The interval between fever and afebrile periods identifies louse-borne epidemic relapsing fever.

### Clinical significance
Recognising the syndrome first allows the vector to be selected from morphologically and epidemiologically unrelated arthropod distractors.

### Common misconceptions
Do not choose a flea merely because it is an ectoparasite. The epidemic relapsing-fever pattern in this question is specifically linked to the body louse.

## published_summary


## published_sections


## hold_these
Epidemic relapsing fever is transmitted by the body louse Pediculus humanus corporis.

## lose_the_mark
Missing the characteristic 3–6-day febrile and 5–10-day afebrile sequence in a spirochaetemia vignette.

## callout_evidence
### Epidemic relapsing fever is transmitted by the body louse Pediculus humanus corporis.
Claims: CLM-INF-MUST-FHB1022-RELAPSING-01
Citations: CIT-INF-MUST-FHB1022-RELAPSING-01, CIT-INF-MUST-FHB1022-RELAPSING-02
Reviewed by: pending medical review

## related_concepts
${relapsingConceptId}

## related_articles
${articleId}: Cyclopropagative transmission in arthropod vectors
${lymeArticleId}: Ixodes and the clinical pattern of Lyme disease

## question_ids
QST-MUST-FHB1022-PARA-VECT-Q08

## resource_ids
${liceResourceId}
${assessmentResourceId}

## article_source_ids
${liceResourceId}

## claim_ids
CLM-INF-MUST-FHB1022-RELAPSING-01

## span_ids
SPN-INF-MUST-FHB1022-RELAPSING-01

## university_notes
must: Q8 comes from the governed FHB102-2 module-wide MCQ family and is corroborated by the university Parasitology Department lice, fleas and bugs lecture.

## annotations
### definition_of · ${relapsingConceptId}
Quote: Epidemic relapsing fever is transmitted by the body louse Pediculus humanus corporis. Recurrent spirochaetemia produces a 3–6-day febrile period followed by a 5–10-day afebrile period.
Block: body
Id: ann-must-fhb1022-relapsing-001

## media


## publication_gate
needs_evidence

## evidence_basis
MUST Faculty of Medicine Parasitology Department, FHB102-2 Vectors of Disease Transmission lice, fleas and bugs lecture, visually read pp1,17 and 25–26.
Anonymous FHB102-2 MCQ bank, visually read p2 prompt Q8 and p5 printed answer A.

## evidence_gaps
Independent standard-reference review is required before publication.
Q2, Q3, Q4 and Q6 remain outside this article as explicit key-conflict holds.

## conflicts
No key conflict affects authored Q8. The anonymous bank's printed A agrees with the university teaching table's body louse.

## last_reviewed


## review_due


## notes
Fourth bounded question-led slice only. Q8 is the sole newly authored question; no held item is represented as a student-facing record, and no record is authorised for upload.

## field_notes
arabicTitle: Arabic terminology has not been medically reviewed; left empty rather than guessed.
nanotopicId: No verified nanotopic below the selected discipline node exists for this article.
media: The question is text-only and does not require a student-facing image.
lastReviewed: Draft has not completed medical review.
reviewDue: Set after the first review is completed.
publishedSummary: Draft has no student-safe published projection.
publishedSections: Draft has no student-safe published projection.
relatedArticles: Prior local vector-transmission articles provide adjacent reading without requiring a new typed relation.
`
}

function relapsingQuestions() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
QST-MUST-FHB1022-PARA-VECT-Q08

## title
A worker in Sudan developed 3–6 days of fever followed by a 5–10-day afebrile period, with headache, bony aches and rash. Blood-film examination during the febrile period showed vector-borne spirochaetes, and the Ministry of Health warned of an epidemic. What is the vector?

## question
A worker in Sudan developed 3–6 days of fever followed by a 5–10-day afebrile period, with headache, bony aches and rash. Blood-film examination during the febrile period showed vector-borne spirochaetes, and the Ministry of Health warned of an epidemic. What is the vector?

## subject
inf

## status
Draft

## owner
Dr. Omar

## vignette


## format
single best answer

## derived_from
Transcribed from ${assessmentResourceId}, with the printed key checked against ${liceResourceId}.

## correct_answer
A

## answer_a
Body louse

## explanation_a
Correct. Recurrent spirochaetemia with a 3–6-day febrile period followed by a 5–10-day afebrile period is the louse-borne epidemic relapsing-fever pattern. Its vector is Pediculus humanus corporis, the body louse. Therefore, body louse is the best answer.

## answer_b
Human flea

## explanation_b
Incorrect. The epidemic relapsing-fever pattern is linked to the body louse rather than the human flea.

## answer_c
Rat flea

## explanation_c
Incorrect. The recurrent spirochaetemia and fever interval point to a body-louse vector, not a rat flea.

## answer_d
Head louse

## explanation_d
Incorrect. The vector of louse-borne epidemic relapsing fever is the body louse, not the head louse.

## topic
Parasitology

## subtopic
Arthropods and vectors

## main_concept
${relapsingConceptId}

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Diagnosis

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
8

## clinical_relevance
0.7

## academic_relevance
0.9

## exam_weight_by_year
MUST_Y1=0.65

## years
MUST_Y1

## universities
must

## module
${moduleId}

## module_subject
${moduleId} > Parasitology > Arthropods and vectors > Louse-borne disease

## question_only_for
MUST_Y1

## library_ids
${relapsingArticleId}

## resource_ids
${assessmentResourceId}
${liceResourceId}

## learning_objective
Identify the body louse as the vector in a Sudan epidemic-relapsing-fever vignette with recurrent spirochaetemia and the characteristic fever interval.

## source_citation
FHB102-2 anonymous MCQ bank, p2, printed key p5 (Q8 = A); MUST Faculty of Medicine Parasitology Department, FHB102-2 Vectors of Disease Transmission lice, fleas and bugs lecture, pp17 and 25–26.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
60

## randomise_answers
yes

## author_notes
Printed source key: Q8 = A. The printed key agrees with the university teaching table's body louse; no override was made. Source punctuation and grammar were standardised without changing the answer.
`
}

function plagueClaims() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
CLM-INF-MUST-FHB1022-PLAGUE-01

## concept_id
${plagueConceptId}

## subject
Human-flea transmission of plague

## predicate
is_transmitted_by

## object
the human flea Pulex irritans among humans; bubonic plague affects inguinal and other lymph nodes, while septicaemic plague places bacilli in the blood

## display_text
Among humans, plague is transmitted by the human flea Pulex irritans; bubonic plague affects inguinal and other lymph nodes, while septicaemic plague places bacilli in the blood.

## risk_class
foundational_stable

## verification_status
verified

## conflict_status
none

## confidence
0.9

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
curriculum: MUST FHB102-2 Parasitology
disease: plague
vector: Pulex irritans
`
}

function plagueCitations() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
CIT-INF-MUST-FHB1022-PLAGUE-01

## claim_id
CLM-INF-MUST-FHB1022-PLAGUE-01

## resource_id
${liceResourceId}

## evidence_role
local_curriculum

## support_span
Among humans, the disease is then transmitted by the human flea (Pulex).

## locator_type
page

## locator_page
51

## locator_section
Plague (black death)

## locator_detail
PDF page 51, final bullet naming the human flea Pulex as the vector among humans.

## context_note
The university-branded FHB102-2 lecture directly supports the printed Q9 answer.

## confidence
0.9

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-INF-MUST-FHB1022-PLAGUE-02

## claim_id
CLM-INF-MUST-FHB1022-PLAGUE-01

## resource_id
${liceResourceId}

## evidence_role
local_curriculum

## support_span
Bubonic (in lymph nodes) plague: bacilli in the inguinal lymph nodes and other lymph nodes and lymphatics. Septicaemic plague: bacilli in the blood.

## locator_type
page

## locator_page
54

## locator_section
Types of flea-transmitted plague

## locator_detail
PDF page 54, bullets distinguishing bubonic and septicaemic plague.

## context_note
The slide directly matches the stem's pubic-area lymph-node enlargement and septicaemia clues.

## confidence
0.9

## counts_as_claim_evidence
yes
`
}

function plagueSpans() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
SPN-INF-MUST-FHB1022-PLAGUE-01

## article_id
${plagueArticleId}

## section_id
art-inf-must-fhb1022-plague-human-flea-definition

## text
Among humans, plague is transmitted by the human flea Pulex irritans. Bubonic plague affects inguinal and other lymph nodes, while septicaemic plague places bacilli in the blood.

## claim_ids
CLM-INF-MUST-FHB1022-PLAGUE-01

## citation_ids
CIT-INF-MUST-FHB1022-PLAGUE-01
CIT-INF-MUST-FHB1022-PLAGUE-02
`
}

function plagueConcepts() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
${plagueConceptId}

## label
Human flea vector of plague among humans

## canonical_key
parasitology.plague.human-flea-vector

## aliases
Pulex irritans plague vector
Human-to-human plague flea vector
Human flea transmission of plague

## arabic_label


## arabic_aliases
[clear]

## definition
Among humans, plague is transmitted by the human flea Pulex irritans. Bubonic plague affects inguinal and other lymph nodes, while septicaemic plague places bacilli in the blood.

## explicit_objective
Identify Pulex irritans as the human flea vector when a displacement-camp vignette describes buboes and septicaemia and specifically asks about transmission from human to human.

## pitfalls
Choosing Xenopsylla cheopis because it is the most efficient rat-to-human plague vector even though the question explicitly asks for transmission among humans.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAR-T03

## secondary_node_ids
SYS-FND-T05-S02-M02
DIS-PAR

## topic
Parasitology

## subtopic
Arthropods and vectors

## microtopic
Flea-borne disease

## nanotopic


## modules
${moduleId}

## module_subject
${moduleId} > Parasitology > Arthropods and vectors > Flea-borne disease

## article_ids
${plagueArticleId}

## related_article_ids
${relapsingArticleId}
${articleId}

## related_concept_ids
[clear]

## resource_ids
${liceResourceId}
${assessmentResourceId}

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
must

## blueprint_weight
0.65

## exam_weight_by_year
MUST_Y1=0.65

## clinical_relevance
0.75

## academic_relevance
0.9

## weight_confidence
0.65

## confidence
0.9

## atomic_claim_ids
CLM-INF-MUST-FHB1022-PLAGUE-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## exam_signal
${assessmentResourceId} | tier 3 | undated | p2 Q9; printed answer p5
${liceResourceId} | tier 2 | undated | pp51,54 direct university teaching

## original_wording
Q9 describes refugees near Libya's eastern border with fever, pubic-area lymph-node enlargement and some septicaemia, then asks for the human-to-human vector; printed key C, Pulex irritans.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
No key conflict affects authored Q9. Its printed C agrees with the university lecture's statement that human flea Pulex transmits plague among humans. Q2, Q3, Q4 and Q6 remain separate authoring holds.

## uncertainty
The source bank contains grammar defects; the Draft student-facing record standardises them without changing the tested meaning, option order or answer.

## evidence_gaps
The source set is local curriculum evidence. Independent standard-reference review remains required before publication.

## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
arabicLabel: Arabic terminology has not been reviewed; left empty rather than guessed.
arabicAliases: No reviewed Arabic aliases were supplied.
microtopicId: The canonical Parasitology taxonomy stops at the Arthropods and vectors topic for this lane; the narrower curriculum phrase is retained in module_subject rather than inventing a node.
nanotopicId: No verified nanotopic below the selected discipline node exists for this concept.
approvedFileResourceIds: Neither locally supplied PDF has been rights-cleared as a student-downloadable file.
approvedVideoResourceIds: No video source was supplied.
resourceOccurrenceIds: Hand-authored from governed FHB-102-2 evidence; no extraction occurrence record was minted.
sourceCandidateIds: Searches for human flea plague transmission, Pulex irritans plague vector, human-to-human plague flea, bubonic plague Pulex and septicaemic plague human flea returned no live or pending record.
lastReviewed: New under-review record; no medical reviewer has completed review.
reviewDue: Set after the first review is completed.
relationships: This bounded slice has no necessary evidence-backed typed relation record; related reading points to prior local vector-transmission articles.
`
}

function plagueArticles() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
${plagueArticleId}

## title
Human-flea transmission of plague

## arabic_title


## aliases
Pulex irritans as a plague vector
Human-to-human plague vector

## subject
inf

## status
Draft

## owner
Dr. Omar

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## topic
Parasitology

## subtopic
Arthropods and vectors

## microtopic
Flea-borne disease

## nanotopic


## primary_node_id
DIS-PAR-T03

## secondary_node_ids
SYS-FND-T05-S02-M02
DIS-PAR

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1–3 foundation

## reading_time
4

## high_yield
High

## time_sensitive
stable

## universities
must

## years
MUST_Y1

## module
${moduleId}

## module_subject
${moduleId} > Parasitology > Arthropods and vectors > Flea-borne disease

## summary
Among humans, plague is transmitted by the human flea Pulex irritans. A camp-associated vignette with inguinal buboes and septicaemia points to plague, while the phrase from human to human distinguishes the human flea from the rat flea.

## sections
### Definition
Among humans, plague is transmitted by the human flea Pulex irritans. Bubonic plague affects inguinal and other lymph nodes, while septicaemic plague places bacilli in the blood.

### Mechanism
The university lecture distinguishes two steps: rat flea Xenopsylla transmits plague from rats to humans, while human flea Pulex transmits it among humans. This question asks specifically about the second step.

### Key determinants
Fever with enlarged pubic-area or inguinal lymph nodes indicates the bubonic pattern, and septicaemia indicates blood involvement. The explicit human-to-human wording determines which flea option is being tested.

### Clinical significance
Recognising the transmission direction prevents a learner from choosing Xenopsylla merely because it is the best-known or most efficient plague vector.

### Common misconceptions
Do not treat all plague-vector questions as asking for Xenopsylla cheopis. The rat flea is central to rat-to-human transmission, whereas this item asks for transmission among humans.

## published_summary


## published_sections


## hold_these
Among humans, plague is transmitted by the human flea Pulex irritans.

## lose_the_mark
Ignoring the phrase from human to human and selecting the rat flea Xenopsylla cheopis.

## callout_evidence
### Among humans, plague is transmitted by the human flea Pulex irritans.
Claims: CLM-INF-MUST-FHB1022-PLAGUE-01
Citations: CIT-INF-MUST-FHB1022-PLAGUE-01, CIT-INF-MUST-FHB1022-PLAGUE-02
Reviewed by: pending medical review

## related_concepts
${plagueConceptId}

## related_articles
${relapsingArticleId}: Body-louse transmission of epidemic relapsing fever
${articleId}: Cyclopropagative transmission in arthropod vectors

## question_ids
QST-MUST-FHB1022-PARA-VECT-Q09

## resource_ids
${liceResourceId}
${assessmentResourceId}

## article_source_ids
${liceResourceId}

## claim_ids
CLM-INF-MUST-FHB1022-PLAGUE-01

## span_ids
SPN-INF-MUST-FHB1022-PLAGUE-01

## university_notes
must: Q9 comes from the governed FHB102-2 module-wide MCQ family and is corroborated by the university Parasitology Department lice, fleas and bugs lecture.

## annotations
### definition_of · ${plagueConceptId}
Quote: Among humans, plague is transmitted by the human flea Pulex irritans. Bubonic plague affects inguinal and other lymph nodes, while septicaemic plague places bacilli in the blood.
Block: body
Id: ann-must-fhb1022-plague-001

## media


## publication_gate
needs_evidence

## evidence_basis
MUST Faculty of Medicine Parasitology Department, FHB102-2 Vectors of Disease Transmission lice, fleas and bugs lecture, visually read pp1,51 and 54.
Anonymous FHB102-2 MCQ bank, visually read p2 prompt Q9 and p5 printed answer C.

## evidence_gaps
Independent standard-reference review is required before publication.
Q2, Q3, Q4 and Q6 remain outside this article as explicit key-conflict holds.

## conflicts
No key conflict affects authored Q9. The anonymous bank's printed C agrees with the university teaching statement that human flea Pulex transmits plague among humans.

## last_reviewed


## review_due


## notes
Fifth bounded question-led slice only. Q9 is the sole newly authored question; no held item is represented as a student-facing record, and no record is authorised for upload.

## field_notes
arabicTitle: Arabic terminology has not been medically reviewed; left empty rather than guessed.
nanotopicId: No verified nanotopic below the selected discipline node exists for this article.
media: The question is text-only and does not require a student-facing image.
lastReviewed: Draft has not completed medical review.
reviewDue: Set after the first review is completed.
publishedSummary: Draft has no student-safe published projection.
publishedSections: Draft has no student-safe published projection.
relatedArticles: Prior local vector-transmission articles provide adjacent reading without requiring a new typed relation.
`
}

function plagueQuestions() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
QST-MUST-FHB1022-PARA-VECT-Q09

## title
While living in a camp by the eastern border of Libya, a group of refugees developed fever and enlarged lymph nodes, especially in the pubic area; some developed septicaemia. Health authorities warned against stopping rodent control. What is the vector for transmission of this disease from human to human?

## question
While living in a camp by the eastern border of Libya, a group of refugees developed fever and enlarged lymph nodes, especially in the pubic area; some developed septicaemia. Health authorities warned against stopping rodent control. What is the vector for transmission of this disease from human to human?

## subject
inf

## status
Draft

## owner
Dr. Omar

## vignette


## format
single best answer

## derived_from
Transcribed from ${assessmentResourceId}, with the printed key checked against ${liceResourceId}.

## correct_answer
C

## answer_a
Ctenocephalus canis

## explanation_a
Incorrect. Ctenocephalus canis is the dog flea; the lecture identifies the human flea Pulex as the plague vector among humans.

## answer_b
Pediculus humanus capitis

## explanation_b
Incorrect. Pediculus humanus capitis is the head louse, not the human flea responsible for plague transmission among humans.

## answer_c
Pulex irritans

## explanation_c
Correct. The inguinal-node enlargement and septicaemia identify bubonic and septicaemic plague patterns. The question asks specifically for transmission from human to human, which the university lecture attributes to the human flea Pulex. Therefore, Pulex irritans is the best answer.

## answer_d
Xenopsylla cheopis

## explanation_d
Incorrect. Xenopsylla cheopis is the rat flea associated with transmission from rats to humans; the item asks for the vector among humans.

## topic
Parasitology

## subtopic
Arthropods and vectors

## main_concept
${plagueConceptId}

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Diagnosis

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
58

## exam_relevance
8

## clinical_relevance
0.75

## academic_relevance
0.9

## exam_weight_by_year
MUST_Y1=0.65

## years
MUST_Y1

## universities
must

## module
${moduleId}

## module_subject
${moduleId} > Parasitology > Arthropods and vectors > Flea-borne disease

## question_only_for
MUST_Y1

## library_ids
${plagueArticleId}

## resource_ids
${assessmentResourceId}
${liceResourceId}

## learning_objective
Identify Pulex irritans as the human-to-human plague vector when a vignette describes inguinal buboes and septicaemia.

## source_citation
FHB102-2 anonymous MCQ bank, p2, printed key p5 (Q9 = C); MUST Faculty of Medicine Parasitology Department, FHB102-2 Vectors of Disease Transmission lice, fleas and bugs lecture, pp51 and 54.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
60

## randomise_answers
yes

## author_notes
Printed source key: Q9 = C. The printed key agrees with the university teaching statement that human flea Pulex transmits plague among humans; no override was made. Source grammar was standardised without changing the answer or option order.
`
}

function paratransClaims() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
CLM-INF-MUST-FHB1022-PARATRANS-01

## concept_id
${paratransConceptId}

## subject
Paratransgenesis in vector control

## predicate
uses

## object
symbiont bacteria fed to the larval vector stage to prevent adult infection by viruses and parasites and thereby prevent disease transmission

## display_text
Paratransgenesis uses symbiont bacteria fed to the larval vector stage to prevent adult infection by viruses and parasites and thereby prevent disease transmission.

## risk_class
foundational_stable

## verification_status
verified

## conflict_status
none

## confidence
0.9

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
curriculum: MUST FHB102-2 Parasitology
method: biological vector control
`
}

function paratransCitations() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
CIT-INF-MUST-FHB1022-PARATRANS-01

## claim_id
CLM-INF-MUST-FHB1022-PARATRANS-01

## resource_id
${mosquitoResourceId}

## evidence_role
local_curriculum

## support_span
Paratransgenesis: feeding the larval stage with symbiont bacteria that are capable of preventing adult mosquitoes from being infected by viruses and parasites and consequently no disease transmission.

## locator_type
page

## locator_page
44

## locator_section
Mosquito control — updated control measures

## locator_detail
PDF page 44, final bullet defining paratransgenesis.

## context_note
The university-branded FHB102-2 slide directly supports printed Q10 answer A.

## confidence
0.9

## counts_as_claim_evidence
yes
`
}

function paratransSpans() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
SPN-INF-MUST-FHB1022-PARATRANS-01

## article_id
${paratransArticleId}

## section_id
art-inf-must-fhb1022-paratransgenesis-definition

## text
Paratransgenesis is a biological vector-control approach that uses symbiont bacteria fed to the larval vector stage to prevent later pathogen infection and disease transmission.

## claim_ids
CLM-INF-MUST-FHB1022-PARATRANS-01

## citation_ids
CIT-INF-MUST-FHB1022-PARATRANS-01
`
}

function paratransConcepts() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
${paratransConceptId}

## label
Paratransgenesis using vector symbiont bacteria

## canonical_key
parasitology.vector-control.paratransgenesis-symbiont-bacteria

## aliases
Paratransgenesis vector control
Symbiont-bacteria vector control
Larval symbiont biological control

## arabic_label


## arabic_aliases
[clear]

## definition
Paratransgenesis uses symbiont bacteria fed to the larval vector stage to prevent adult infection by viruses and parasites and thereby prevent disease transmission.

## explicit_objective
Identify use of symbiont bacteria as the defining method in a paratransgenesis vector-control question.

## pitfalls
Confusing paratransgenesis with sterile-male genetic control, physical control, or the use of biological enemies such as Gambusia.

## concept_type
intervention

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAR-T03

## secondary_node_ids
SYS-FND-T05-S02-M02
DIS-PAR

## topic
Parasitology

## subtopic
Arthropods and vectors

## microtopic
Vector control

## nanotopic


## modules
${moduleId}

## module_subject
${moduleId} > Parasitology > Arthropods and vectors > Vector control

## article_ids
${paratransArticleId}

## related_article_ids
${articleId}

## related_concept_ids
[clear]

## resource_ids
${mosquitoResourceId}
${assessmentResourceId}

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
must

## blueprint_weight
0.55

## exam_weight_by_year
MUST_Y1=0.55

## clinical_relevance
0.55

## academic_relevance
0.9

## weight_confidence
0.65

## confidence
0.9

## atomic_claim_ids
CLM-INF-MUST-FHB1022-PARATRANS-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## exam_signal
${assessmentResourceId} | tier 3 | undated | p2 Q10; printed answer p5
${mosquitoResourceId} | tier 2 | undated | p44 direct university teaching

## original_wording
Q10 asks which vector-control method is paratransgenesis; printed key A, biological using symbiont bacteria.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
No key conflict affects authored Q10. Its printed A agrees with the university slide's direct symbiont-bacteria definition. Q2, Q3, Q4 and Q6 remain separate authoring holds.

## uncertainty
The source uses a concise teaching definition; the Draft explanation does not extend beyond its stated mechanism.

## evidence_gaps
The source set is local curriculum evidence. Independent standard-reference review remains required before publication.

## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
arabicLabel: Arabic terminology has not been reviewed; left empty rather than guessed.
arabicAliases: No reviewed Arabic aliases were supplied.
microtopicId: The canonical Parasitology taxonomy stops at the Arthropods and vectors topic for this lane; the narrower curriculum phrase is retained in module_subject rather than inventing a node.
nanotopicId: No verified nanotopic below the selected discipline node exists for this concept.
approvedFileResourceIds: Neither locally supplied PDF has been rights-cleared as a student-downloadable file.
approvedVideoResourceIds: No video source was supplied.
resourceOccurrenceIds: Hand-authored from governed FHB-102-2 evidence; no extraction occurrence record was minted.
sourceCandidateIds: Searches for paratransgenesis symbiont bacteria, vector control paratransgenesis, genetically modified symbiont vector, paratransgenesis biological control and larval-stage symbiont bacteria returned no live or pending concept record.
lastReviewed: New under-review record; no medical reviewer has completed review.
reviewDue: Set after the first review is completed.
relationships: This bounded slice has no necessary evidence-backed typed relation record; related reading points to the prior vector-transmission article.
`
}

function paratransArticles() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
${paratransArticleId}

## title
Paratransgenesis in vector control

## arabic_title


## aliases
Symbiont-bacteria vector control
Paratransgenesis in mosquitoes

## subject
inf

## status
Draft

## owner
Dr. Omar

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## topic
Parasitology

## subtopic
Arthropods and vectors

## microtopic
Vector control

## nanotopic


## primary_node_id
DIS-PAR-T03

## secondary_node_ids
SYS-FND-T05-S02-M02
DIS-PAR

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1–3 foundation

## reading_time
3

## high_yield
High

## time_sensitive
stable

## universities
must

## years
MUST_Y1

## module
${moduleId}

## module_subject
${moduleId} > Parasitology > Arthropods and vectors > Vector control

## summary
Paratransgenesis is a biological vector-control approach using symbiont bacteria in the larval stage to prevent later infection of adult vectors and interrupt disease transmission.

## sections
### Definition
Paratransgenesis uses symbiont bacteria fed to the larval vector stage to prevent adult infection by viruses and parasites and thereby prevent disease transmission.

### Mechanism
The lecture describes feeding larvae symbiont bacteria capable of preventing adult mosquitoes from becoming infected. Preventing vector infection blocks the subsequent transmission step.

### Key determinants
The defining phrase is symbiont bacteria. Sterilising male vectors is presented separately as genetic control, while physical control and use of biological enemies are distinct methods.

### Clinical significance
The method targets vector competence rather than directly killing the adult vector, providing a recognition point for vector-control classification questions.

### Common misconceptions
Do not equate paratransgenesis with sterile-male techniques or with stocking larvivorous fish. The tested method specifically uses symbiont bacteria.

## published_summary


## published_sections


## hold_these
Paratransgenesis uses symbiont bacteria to prevent later vector infection and disease transmission.

## lose_the_mark
Selecting sterile-male genetic control instead of the symbiont-bacteria method.

## callout_evidence
### Paratransgenesis uses symbiont bacteria to prevent later vector infection and disease transmission.
Claims: CLM-INF-MUST-FHB1022-PARATRANS-01
Citations: CIT-INF-MUST-FHB1022-PARATRANS-01
Reviewed by: pending medical review

## related_concepts
${paratransConceptId}

## related_articles
${articleId}: Cyclopropagative transmission in arthropod vectors

## question_ids
QST-MUST-FHB1022-PARA-VECT-Q10

## resource_ids
${mosquitoResourceId}
${assessmentResourceId}

## article_source_ids
${mosquitoResourceId}

## claim_ids
CLM-INF-MUST-FHB1022-PARATRANS-01

## span_ids
SPN-INF-MUST-FHB1022-PARATRANS-01

## university_notes
must: Q10 comes from the governed FHB102-2 module-wide MCQ family and is directly corroborated by the university Parasitology Department mosquito-control lecture.

## annotations
### definition_of · ${paratransConceptId}
Quote: Paratransgenesis uses symbiont bacteria fed to the larval vector stage to prevent adult infection by viruses and parasites and thereby prevent disease transmission.
Block: body
Id: ann-must-fhb1022-paratrans-001

## media


## publication_gate
needs_evidence

## evidence_basis
MUST Faculty of Medicine Parasitology Department, FHB102-2 Arthropod Vectors for Disease Transmission mosquito lecture, visually read pp1 and 44.
Anonymous FHB102-2 MCQ bank, visually read p2 prompt Q10 and p5 printed answer A.

## evidence_gaps
Independent standard-reference review is required before publication.
Q2, Q3, Q4 and Q6 remain outside this article as explicit key-conflict holds.

## conflicts
No key conflict affects authored Q10. The anonymous bank's printed A agrees with the university slide's symbiont-bacteria definition.

## last_reviewed


## review_due


## notes
Sixth bounded question-led slice only. Q10 is the sole newly authored question; no held item is represented as a student-facing record, and no record is authorised for upload.

## field_notes
arabicTitle: Arabic terminology has not been medically reviewed; left empty rather than guessed.
nanotopicId: No verified nanotopic below the selected discipline node exists for this article.
media: The question is text-only and does not require a student-facing image.
lastReviewed: Draft has not completed medical review.
reviewDue: Set after the first review is completed.
publishedSummary: Draft has no student-safe published projection.
publishedSections: Draft has no student-safe published projection.
relatedArticles: Prior local vector-transmission reading is linked without requiring a new typed relation.
`
}

function paratransQuestions() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
QST-MUST-FHB1022-PARA-VECT-Q10

## title
Which method of vector control is paratransgenesis?

## question
Which method of vector control is paratransgenesis?

## subject
inf

## status
Draft

## owner
Dr. Omar

## vignette


## format
single best answer

## derived_from
Transcribed from ${assessmentResourceId}, with the printed key checked against ${mosquitoResourceId}.

## correct_answer
A

## answer_a
Biological control using symbiont bacteria

## explanation_a
Correct. The university lecture defines paratransgenesis as feeding the larval vector stage symbiont bacteria that prevent later infection of the adult vector by viruses and parasites. This interrupts disease transmission. Therefore, biological control using symbiont bacteria is the best answer.

## answer_b
Genetic sterilisation of male vectors

## explanation_b
Incorrect. Sterilisation of male vectors is a separate genetic-control method, not paratransgenesis.

## answer_c
A physical method of vector control

## explanation_c
Incorrect. Paratransgenesis is defined by use of symbiont bacteria rather than a physical control measure.

## answer_d
Use of biological enemies such as Gambusia

## explanation_d
Incorrect. Gambusia is a biological enemy used against larvae, but paratransgenesis specifically uses symbiont bacteria within the vector-control strategy.

## topic
Parasitology

## subtopic
Arthropods and vectors

## main_concept
${paratransConceptId}

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Easy

## question_type
Recall

## cognitive_effort
Low

## cognitive_effort_score
0.3

## setting
Academic

## reasoning_level
1

## inferred_difficulty
35

## exam_relevance
7

## clinical_relevance
0.55

## academic_relevance
0.9

## exam_weight_by_year
MUST_Y1=0.55

## years
MUST_Y1

## universities
must

## module
${moduleId}

## module_subject
${moduleId} > Parasitology > Arthropods and vectors > Vector control

## question_only_for
MUST_Y1

## library_ids
${paratransArticleId}

## resource_ids
${assessmentResourceId}
${mosquitoResourceId}

## learning_objective
Recognise use of symbiont bacteria as the defining feature of paratransgenesis in vector control.

## source_citation
FHB102-2 anonymous MCQ bank, p2, printed key p5 (Q10 = A); MUST Faculty of Medicine Parasitology Department, FHB102-2 mosquito-control lecture, p44.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Printed source key: Q10 = A. The printed key agrees with the university teaching definition of paratransgenesis; no override was made.
`
}

function leishClaims() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
CLM-INF-MUST-FHB1022-LEISH-01

## concept_id
${leishConceptId}

## subject
Phlebotomus vector of cutaneous leishmaniasis

## predicate
is_transmitted_by

## object
Phlebotomus sandflies; Leishmania tropica causes a volcano-like cutaneous oriental sore in Sinai that may heal with an atrophic depigmented scar

## display_text
Cutaneous leishmaniasis in the Old World is transmitted by Phlebotomus sandflies; Leishmania tropica can produce a volcano-like oriental sore in Sinai that heals with an atrophic depigmented scar.

## risk_class
foundational_stable

## verification_status
verified

## conflict_status
none

## confidence
0.9

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
curriculum: MUST FHB102-2 Parasitology
organism: Leishmania tropica
vector: Phlebotomus
`
}

function leishCitations() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
CIT-INF-MUST-FHB1022-LEISH-01

## claim_id
CLM-INF-MUST-FHB1022-LEISH-01

## resource_id
${sandflyResourceId}

## evidence_role
local_curriculum

## support_span
Phlebotomus acts as an intermediate host of Leishmania species by cyclopropagative transmission; the infective promastigote is passed in the saliva of the infected sandfly.

## locator_type
page

## locator_page
13

## locator_section
Medical importance — disease transmission

## locator_detail
PDF page 13, direct Phlebotomus–Leishmania transmission statement.

## context_note
The university-branded FHB102-2 slide directly supports the vector in printed Q11.

## confidence
0.9

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-INF-MUST-FHB1022-LEISH-02

## claim_id
CLM-INF-MUST-FHB1022-LEISH-01

## resource_id
${sandflyResourceId}

## evidence_role
local_curriculum

## support_span
Cutaneous leishmaniasis oriental sore due to Leishmania tropica: volcano-like ulcer, found in Sinai and the Middle East; untreated lesion leaves an atrophic and depigmented scar.

## locator_type
page

## locator_page
24

## locator_section
Cutaneous leishmaniasis — oriental sore

## locator_detail
PDF page 24, clinical and geographical pattern matching Q11.

## context_note
The slide directly matches the Sinai, volcano-like facial ulcer and residual-scar clues.

## confidence
0.9

## counts_as_claim_evidence
yes
`
}

function leishSpans() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
SPN-INF-MUST-FHB1022-LEISH-01

## article_id
${leishArticleId}

## section_id
art-inf-must-fhb1022-cutaneous-leishmaniasis-vector-definition

## text
Phlebotomus sandflies transmit Old World cutaneous leishmaniasis. In Sinai, Leishmania tropica can produce a volcano-like oriental sore that heals with an atrophic depigmented scar.

## claim_ids
CLM-INF-MUST-FHB1022-LEISH-01

## citation_ids
CIT-INF-MUST-FHB1022-LEISH-01
CIT-INF-MUST-FHB1022-LEISH-02
`
}

function leishConcepts() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
${leishConceptId}

## label
Phlebotomus vector of cutaneous leishmaniasis

## canonical_key
parasitology.cutaneous-leishmaniasis.phlebotomus-vector

## aliases
Sandfly vector of oriental sore
Leishmania tropica vector
Phlebotomus and cutaneous leishmaniasis

## arabic_label


## arabic_aliases
[clear]

## definition
Phlebotomus sandflies transmit Old World cutaneous leishmaniasis. Leishmania tropica can produce a volcano-like oriental sore in Sinai that heals with an atrophic depigmented scar.

## explicit_objective
Identify Phlebotomus as the vector when a Sinai vignette describes a volcano-like facial ulcer that heals with a scar.

## pitfalls
Selecting a mosquito genus despite the characteristic cutaneous-leishmaniasis geography, ulcer morphology and scar pattern.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAR-T03

## secondary_node_ids
SYS-FND-T05-S02-M02
DIS-PAR

## topic
Parasitology

## subtopic
Arthropods and vectors

## microtopic
Sandfly-borne disease

## nanotopic


## modules
${moduleId}

## module_subject
${moduleId} > Parasitology > Arthropods and vectors > Sandfly-borne disease

## article_ids
${leishArticleId}

## related_article_ids
${articleId}
${paratransArticleId}

## related_concept_ids
[clear]

## resource_ids
${sandflyResourceId}
${assessmentResourceId}

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
must

## blueprint_weight
0.7

## exam_weight_by_year
MUST_Y1=0.7

## clinical_relevance
0.8

## academic_relevance
0.9

## weight_confidence
0.7

## confidence
0.9

## atomic_claim_ids
CLM-INF-MUST-FHB1022-LEISH-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## exam_signal
${assessmentResourceId} | tier 3 | undated | p2 Q11; printed answer p5
${sandflyResourceId} | tier 2 | undated | pp13,24 direct university teaching

## original_wording
Q11 describes a 20-year-old woman from Sinai with a volcano-like facial ulcer that heals with a disfiguring scar, then asks for the vector; printed key D, Phlebotomus.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
No key conflict affects authored Q11. Its printed D agrees with the university lecture's Phlebotomus–Leishmania teaching. Q2, Q3, Q4 and Q6 remain separate authoring holds.

## uncertainty
Source grammar is standardised in the Draft question without changing the clinical clues, option order or answer.

## evidence_gaps
The source set is local curriculum evidence. Independent standard-reference review remains required before publication.

## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
arabicLabel: Arabic terminology has not been reviewed; left empty rather than guessed.
arabicAliases: No reviewed Arabic aliases were supplied.
microtopicId: The canonical Parasitology taxonomy stops at the Arthropods and vectors topic for this lane; the narrower curriculum phrase is retained in module_subject rather than inventing a node.
nanotopicId: No verified nanotopic below the selected discipline node exists for this concept.
approvedFileResourceIds: Neither locally supplied PDF has been rights-cleared as a student-downloadable file.
approvedVideoResourceIds: No video source was supplied.
resourceOccurrenceIds: Hand-authored from governed FHB-102-2 evidence; no extraction occurrence record was minted.
sourceCandidateIds: Searches for cutaneous leishmaniasis Phlebotomus, volcano ulcer sandfly, Leishmania tropica vector, Sinai oriental sore Phlebotomus and phlebotomine sand fly leishmaniasis returned no live or pending concept record.
lastReviewed: New under-review record; no medical reviewer has completed review.
reviewDue: Set after the first review is completed.
relationships: This bounded slice has no necessary evidence-backed typed relation record; related reading points to prior local vector articles.
`
}

function leishArticles() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
${leishArticleId}

## title
Phlebotomus transmission of cutaneous leishmaniasis

## arabic_title


## aliases
Sandfly vector of oriental sore
Leishmania tropica and Phlebotomus

## subject
inf

## status
Draft

## owner
Dr. Omar

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## topic
Parasitology

## subtopic
Arthropods and vectors

## microtopic
Sandfly-borne disease

## nanotopic


## primary_node_id
DIS-PAR-T03

## secondary_node_ids
SYS-FND-T05-S02-M02
DIS-PAR

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1–3 foundation

## reading_time
4

## high_yield
High

## time_sensitive
stable

## universities
must

## years
MUST_Y1

## module
${moduleId}

## module_subject
${moduleId} > Parasitology > Arthropods and vectors > Sandfly-borne disease

## summary
Phlebotomus sandflies transmit Old World cutaneous leishmaniasis. A Sinai facial ulcer with a raised volcano-like border followed by a residual scar points to Leishmania tropica and its sandfly vector.

## sections
### Definition
Phlebotomus sandflies transmit Old World cutaneous leishmaniasis. Leishmania tropica can produce a volcano-like oriental sore in Sinai that heals with an atrophic depigmented scar.

### Mechanism
Phlebotomus serves as the intermediate host of Leishmania species. The infective promastigote is passed in the saliva of an infected sandfly.

### Key determinants
Sinai exposure, a facial ulcer with raised border and undermined volcano-like base, and later scarring form the recognition pattern for the oriental sore in this source.

### Clinical significance
Recognising cutaneous leishmaniasis from lesion morphology and geography allows the sandfly vector to be selected from mosquito distractors.

### Common misconceptions
Do not select Aedes, Anopheles or Culex simply because they are familiar disease vectors. The source directly associates Leishmania with Phlebotomus.

## published_summary


## published_sections


## hold_these
Phlebotomus sandflies transmit Old World cutaneous leishmaniasis.

## lose_the_mark
Missing the Sinai volcano-like oriental-sore pattern and selecting a mosquito vector.

## callout_evidence
### Phlebotomus sandflies transmit Old World cutaneous leishmaniasis.
Claims: CLM-INF-MUST-FHB1022-LEISH-01
Citations: CIT-INF-MUST-FHB1022-LEISH-01, CIT-INF-MUST-FHB1022-LEISH-02
Reviewed by: pending medical review

## related_concepts
${leishConceptId}

## related_articles
${articleId}: Cyclopropagative transmission in arthropod vectors
${paratransArticleId}: Paratransgenesis in vector control

## question_ids
QST-MUST-FHB1022-PARA-VECT-Q11

## resource_ids
${sandflyResourceId}
${assessmentResourceId}

## article_source_ids
${sandflyResourceId}

## claim_ids
CLM-INF-MUST-FHB1022-LEISH-01

## span_ids
SPN-INF-MUST-FHB1022-LEISH-01

## university_notes
must: Q11 comes from the governed FHB102-2 module-wide MCQ family and is directly corroborated by the university Parasitology Department sandfly lecture.

## annotations
### definition_of · ${leishConceptId}
Quote: Phlebotomus sandflies transmit Old World cutaneous leishmaniasis. Leishmania tropica can produce a volcano-like oriental sore in Sinai that heals with an atrophic depigmented scar.
Block: body
Id: ann-must-fhb1022-leish-001

## media


## publication_gate
needs_evidence

## evidence_basis
MUST Faculty of Medicine Parasitology Department, FHB102-2 sandfly lecture, visually read pp1,13 and 24.
Anonymous FHB102-2 MCQ bank, visually read p2 prompt Q11 and p5 printed answer D.

## evidence_gaps
Independent standard-reference review is required before publication.
Q2, Q3, Q4 and Q6 remain outside this article as explicit key-conflict holds.

## conflicts
No key conflict affects authored Q11. The anonymous bank's printed D agrees with the university Phlebotomus teaching.

## last_reviewed


## review_due


## notes
Seventh bounded question-led slice only. Q11 is the sole newly authored question; no held item is represented as a student-facing record, and no record is authorised for upload.

## field_notes
arabicTitle: Arabic terminology has not been medically reviewed; left empty rather than guessed.
nanotopicId: No verified nanotopic below the selected discipline node exists for this article.
media: The bank question is text-only; source images remain evidence and are not imported as student media.
lastReviewed: Draft has not completed medical review.
reviewDue: Set after the first review is completed.
publishedSummary: Draft has no student-safe published projection.
publishedSections: Draft has no student-safe published projection.
relatedArticles: Prior local vector reading is linked without requiring a new typed relation.
`
}

function leishQuestions() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
QST-MUST-FHB1022-PARA-VECT-Q11

## title
A 20-year-old woman from Sinai presented with a volcano-like facial ulcer. The ulcer was self-limiting but left a disfiguring scar. Which vector should be combated?

## question
A 20-year-old woman from Sinai presented with a volcano-like facial ulcer. The ulcer was self-limiting but left a disfiguring scar. Which vector should be combated?

## subject
inf

## status
Draft

## owner
Dr. Omar

## vignette


## format
single best answer

## derived_from
Transcribed from ${assessmentResourceId}, with the printed key checked against ${sandflyResourceId}.

## correct_answer
D

## answer_a
Aedes

## explanation_a
Incorrect. Aedes is a mosquito genus; the Sinai volcano-like cutaneous-leishmaniasis pattern is transmitted by Phlebotomus sandflies.

## answer_b
Anopheles

## explanation_b
Incorrect. Anopheles is not the vector identified for the oriental-sore pattern in this university teaching source.

## answer_c
Culex

## explanation_c
Incorrect. Culex is a mosquito genus, whereas the lecture links Leishmania transmission to Phlebotomus.

## answer_d
Phlebotomus

## explanation_d
Correct. The Sinai exposure, volcano-like facial ulcer and residual scar match the lecture's cutaneous leishmaniasis oriental-sore pattern. The same lecture states that Phlebotomus transmits Leishmania. Therefore, Phlebotomus is the best answer.

## topic
Parasitology

## subtopic
Arthropods and vectors

## main_concept
${leishConceptId}

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Diagnosis

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
8

## clinical_relevance
0.8

## academic_relevance
0.9

## exam_weight_by_year
MUST_Y1=0.7

## years
MUST_Y1

## universities
must

## module
${moduleId}

## module_subject
${moduleId} > Parasitology > Arthropods and vectors > Sandfly-borne disease

## question_only_for
MUST_Y1

## library_ids
${leishArticleId}

## resource_ids
${assessmentResourceId}
${sandflyResourceId}

## learning_objective
Identify Phlebotomus as the vector in a Sinai volcano-like cutaneous-leishmaniasis vignette.

## source_citation
FHB102-2 anonymous MCQ bank, p2, printed key p5 (Q11 = D); MUST Faculty of Medicine Parasitology Department, FHB102-2 sandfly lecture, pp13 and 24.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
60

## randomise_answers
yes

## author_notes
Printed source key: Q11 = D. The printed key agrees with the university teaching statement linking Phlebotomus to Leishmania; no override was made. Source grammar was standardised without changing the answer or option order.
`
}

function sarcoClaims() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
CLM-INF-MUST-FHB1022-SARCO-01

## concept_id
${sarcoConceptId}

## subject
Sarcophaga larva in wound myiasis

## predicate
is_identified_by

## object
a rounded posterior spiracle with incomplete or open peritreme and association with traumatic dermal wound myiasis

## display_text
Sarcophaga larvae have rounded posterior spiracles with an incomplete or open peritreme and may cause traumatic dermal wound myiasis.

## risk_class
foundational_stable

## verification_status
verified

## conflict_status
none

## confidence
0.9

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
curriculum: MUST FHB102-2 Parasitology
organism: Sarcophaga
condition: traumatic dermal myiasis
`
}

function sarcoCitations() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
CIT-INF-MUST-FHB1022-SARCO-01

## claim_id
CLM-INF-MUST-FHB1022-SARCO-01

## resource_id
${myiasisResourceId}

## evidence_role
local_curriculum

## support_span
Sarcophagidae larvae have rounded posterior spiracles with incomplete peritreme and three longitudinal slits; Sarcophaga is listed under Sarcophagidae.

## locator_type
page

## locator_page
32

## locator_section
Family Calliphoridae and Sarcophagidae comparison

## locator_detail
PDF page 32, posterior-spiracle comparison table.

## context_note
The university slide directly supports the open or incomplete peritreme clue.

## confidence
0.9

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-INF-MUST-FHB1022-SARCO-02

## claim_id
CLM-INF-MUST-FHB1022-SARCO-01

## resource_id
${myiasisResourceId}

## evidence_role
local_curriculum

## support_span
Traumatic dermal myiasis, where wounds or ulcers are invaded by larvae, includes Sarcophaga; a parallel rural open-peritreme question highlights Sarcophaga.

## locator_type
page

## locator_page
46

## locator_section
Cutaneous myiasis — traumatic dermal myiasis

## locator_detail
PDF page 46, wound-myiasis list; corroborated by the highlighted parallel item on p57.

## context_note
The slide directly matches the bed-sore wound setting and confirms Sarcophaga in the same identification pattern.

## confidence
0.9

## counts_as_claim_evidence
yes
`
}

function sarcoSpans() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
SPN-INF-MUST-FHB1022-SARCO-01

## article_id
${sarcoArticleId}

## section_id
art-inf-must-fhb1022-sarcophaga-wound-myiasis-definition

## text
Sarcophaga larvae have rounded posterior spiracles with an incomplete or open peritreme and may invade wounds or ulcers in traumatic dermal myiasis.

## claim_ids
CLM-INF-MUST-FHB1022-SARCO-01

## citation_ids
CIT-INF-MUST-FHB1022-SARCO-01
CIT-INF-MUST-FHB1022-SARCO-02
`
}

function sarcoConcepts() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
${sarcoConceptId}

## label
Sarcophaga larva in traumatic wound myiasis

## canonical_key
parasitology.myiasis.sarcophaga-incomplete-peritreme-wound

## aliases
Sarcophaga open-peritreme larva
Flesh-fly wound myiasis
Sarcophaga incomplete peritreme

## arabic_label


## arabic_aliases
[clear]

## definition
Sarcophaga larvae have rounded posterior spiracles with an incomplete or open peritreme and may invade wounds or ulcers in traumatic dermal myiasis.

## explicit_objective
Identify Sarcophaga larva when an open-peritreme larva is isolated from a bed sore or comparable wound in a rural patient.

## pitfalls
Confusing Sarcophaga's rounded incomplete peritreme with Calliphora's triangular complete peritreme or selecting a furuncular-myiasis larva.

## concept_type
diagnostic_feature

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAR-T03

## secondary_node_ids
SYS-FND-T05-S02-M02
DIS-PAR

## topic
Parasitology

## subtopic
Arthropods and vectors

## microtopic
Myiasis

## nanotopic


## modules
${moduleId}

## module_subject
${moduleId} > Parasitology > Arthropods and vectors > Myiasis

## article_ids
${sarcoArticleId}

## related_article_ids
${articleId}

## related_concept_ids
[clear]

## resource_ids
${myiasisResourceId}
${assessmentResourceId}

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
must

## blueprint_weight
0.65

## exam_weight_by_year
MUST_Y1=0.65

## clinical_relevance
0.75

## academic_relevance
0.9

## weight_confidence
0.7

## confidence
0.9

## atomic_claim_ids
CLM-INF-MUST-FHB1022-SARCO-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## exam_signal
${assessmentResourceId} | tier 3 | undated | p2 Q12; printed answer p5
${myiasisResourceId} | tier 2 | 2022-04-01 | pp32,46,57 direct university teaching

## original_wording
Q12 asks for identification of an open-peritreme larva isolated from a bed sore in a rural patient; printed key D, Sarcophaga larva.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
No key conflict affects authored Q12. Its printed D agrees with the university posterior-spiracle table, wound-myiasis list and parallel highlighted item. Q2, Q3, Q4 and Q6 remain separate authoring holds.

## uncertainty
The bank says open peritreme while the comparison table says incomplete peritreme; the university deck itself uses open peritreme in a parallel highlighted Sarcophaga item, so the source vocabulary is preserved as equivalent within this local curriculum.

## evidence_gaps
The source set is local curriculum evidence. Independent standard-reference review remains required before publication.

## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
arabicLabel: Arabic terminology has not been reviewed; left empty rather than guessed.
arabicAliases: No reviewed Arabic aliases were supplied.
microtopicId: The canonical Parasitology taxonomy stops at the Arthropods and vectors topic for this lane; the narrower curriculum phrase is retained in module_subject rather than inventing a node.
nanotopicId: No verified nanotopic below the selected discipline node exists for this concept.
approvedFileResourceIds: Neither locally supplied PDF has been rights-cleared as a student-downloadable file.
approvedVideoResourceIds: No video source was supplied.
resourceOccurrenceIds: Hand-authored from governed FHB-102-2 evidence; no extraction occurrence record was minted.
sourceCandidateIds: Searches for Sarcophaga open peritreme, wound myiasis Sarcophaga, bed-sore fly larvae myiasis, Sarcophaga incomplete peritreme and traumatic dermal myiasis Sarcophaga returned no live or pending concept record.
lastReviewed: New under-review record; no medical reviewer has completed review.
reviewDue: Set after the first review is completed.
relationships: This bounded slice has no necessary evidence-backed typed relation record; related reading points to prior local vector material.
`
}

function sarcoArticles() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
${sarcoArticleId}

## title
Sarcophaga identification in traumatic wound myiasis

## arabic_title


## aliases
Sarcophaga open-peritreme larva
Flesh-fly wound myiasis

## subject
inf

## status
Draft

## owner
Dr. Omar

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## topic
Parasitology

## subtopic
Arthropods and vectors

## microtopic
Myiasis

## nanotopic


## primary_node_id
DIS-PAR-T03

## secondary_node_ids
SYS-FND-T05-S02-M02
DIS-PAR

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1–3 foundation

## reading_time
4

## high_yield
High

## time_sensitive
stable

## universities
must

## years
MUST_Y1

## module
${moduleId}

## module_subject
${moduleId} > Parasitology > Arthropods and vectors > Myiasis

## summary
Sarcophaga larvae have rounded posterior spiracles with an incomplete or open peritreme and may cause traumatic dermal myiasis by invading wounds or ulcers.

## sections
### Definition
Sarcophaga larvae have rounded posterior spiracles with an incomplete or open peritreme and may invade wounds or ulcers in traumatic dermal myiasis.

### Mechanism
Sarcophaga is a flesh fly in Sarcophagidae. Its larvae can act as facultative sarcobiots, invading living wounded tissue after association with decaying matter.

### Key determinants
The open or incomplete peritreme distinguishes the Sarcophagidae pattern from Calliphora's complete peritreme. A bed sore is a wound setting compatible with traumatic dermal myiasis.

### Clinical significance
Posterior spiracle morphology and the wound context together support larval identification in a myiasis specimen.

### Common misconceptions
Do not select Calliphora solely because it can invade wounds; its posterior spiracle has a complete rather than incomplete peritreme in the source table.

## published_summary


## published_sections


## hold_these
Sarcophaga larvae have a rounded incomplete or open posterior peritreme and may invade wounds.

## lose_the_mark
Ignoring posterior-spiracle morphology and selecting Calliphora despite its complete peritreme.

## callout_evidence
### Sarcophaga larvae have a rounded incomplete or open posterior peritreme and may invade wounds.
Claims: CLM-INF-MUST-FHB1022-SARCO-01
Citations: CIT-INF-MUST-FHB1022-SARCO-01, CIT-INF-MUST-FHB1022-SARCO-02
Reviewed by: pending medical review

## related_concepts
${sarcoConceptId}

## related_articles
${articleId}: Cyclopropagative transmission in arthropod vectors

## question_ids
QST-MUST-FHB1022-PARA-VECT-Q12

## resource_ids
${myiasisResourceId}
${assessmentResourceId}

## article_source_ids
${myiasisResourceId}

## claim_ids
CLM-INF-MUST-FHB1022-SARCO-01

## span_ids
SPN-INF-MUST-FHB1022-SARCO-01

## university_notes
must: Q12 comes from the governed FHB102-2 module-wide MCQ family and is directly corroborated by the university Parasitology Department flies and myiasis lecture.

## annotations
### definition_of · ${sarcoConceptId}
Quote: Sarcophaga larvae have rounded posterior spiracles with an incomplete or open peritreme and may invade wounds or ulcers in traumatic dermal myiasis.
Block: body
Id: ann-must-fhb1022-sarco-001

## media


## publication_gate
needs_evidence

## evidence_basis
MUST Faculty of Medicine Parasitology Department, FHB102-2 Flies and Myiasis lecture, visually read pp1,32,46 and 57.
Anonymous FHB102-2 MCQ bank, visually read p2 prompt Q12 and p5 printed answer D.

## evidence_gaps
Independent standard-reference review is required before publication.
Q2, Q3, Q4 and Q6 remain outside this article as explicit key-conflict holds.

## conflicts
No key conflict affects authored Q12. The anonymous bank's printed D agrees with the university Sarcophaga teaching.

## last_reviewed


## review_due


## notes
Eighth bounded question-led slice only. Q12 is the sole newly authored question; no held item is represented as a student-facing record, and no record is authorised for upload.

## field_notes
arabicTitle: Arabic terminology has not been medically reviewed; left empty rather than guessed.
nanotopicId: No verified nanotopic below the selected discipline node exists for this article.
media: The bank question is text-only; source images remain evidence and are not imported as student media.
lastReviewed: Draft has not completed medical review.
reviewDue: Set after the first review is completed.
publishedSummary: Draft has no student-safe published projection.
publishedSections: Draft has no student-safe published projection.
relatedArticles: Prior local vector reading is linked without requiring a new typed relation.
`
}

function sarcoQuestions() {
  return `<!-- Generated by scripts/must/build-fhb102-2-authoring-slice.mjs. -->

# Item

## id
QST-MUST-FHB1022-PARA-VECT-Q12

## title
Which larva is most likely if larvae with an open peritreme are isolated from a bed sore in a patient with Alzheimer disease living in a rural area?

## question
Which larva is most likely if larvae with an open peritreme are isolated from a bed sore in a patient with Alzheimer disease living in a rural area?

## subject
inf

## status
Draft

## owner
Dr. Omar

## vignette


## format
single best answer

## derived_from
Transcribed from ${assessmentResourceId}, with the printed key checked against ${myiasisResourceId}.

## correct_answer
D

## answer_a
Calliphora larva

## explanation_a
Incorrect. Calliphora may invade wounds, but the source table gives it a triangular complete peritreme rather than the open or incomplete Sarcophagidae pattern.

## answer_b
Musca larva

## explanation_b
Incorrect. The university source links the open-peritreme rural wound pattern to Sarcophaga, not Musca.

## answer_c
Cordylobia larva

## explanation_c
Incorrect. Cordylobia is associated with furuncular or nodular myiasis rather than this wound-associated open-peritreme pattern.

## answer_d
Sarcophaga larva

## explanation_d
Correct. Sarcophagidae larvae have rounded posterior spiracles with an incomplete or open peritreme, and Sarcophaga is listed among causes of traumatic dermal wound myiasis. The lecture also highlights Sarcophaga in a parallel rural open-peritreme item. Therefore, Sarcophaga larva is the best answer.

## topic
Parasitology

## subtopic
Arthropods and vectors

## main_concept
${sarcoConceptId}

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Diagnosis

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
8

## clinical_relevance
0.75

## academic_relevance
0.9

## exam_weight_by_year
MUST_Y1=0.65

## years
MUST_Y1

## universities
must

## module
${moduleId}

## module_subject
${moduleId} > Parasitology > Arthropods and vectors > Myiasis

## question_only_for
MUST_Y1

## library_ids
${sarcoArticleId}

## resource_ids
${assessmentResourceId}
${myiasisResourceId}

## learning_objective
Identify Sarcophaga from an open-peritreme larva in a traumatic wound-myiasis setting.

## source_citation
FHB102-2 anonymous MCQ bank, p2, printed key p5 (Q12 = D); MUST Faculty of Medicine Parasitology Department, FHB102-2 Flies and Myiasis lecture, pp32,46 and 57.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
60

## randomise_answers
yes

## author_notes
Printed source key: Q12 = D. The printed key agrees with the university Sarcophaga posterior-spiracle and wound-myiasis teaching; no override was made. Source grammar was standardised without changing the answer or option order.
`
}

function coverage() {
  return `# MUST FHB 102-2 — authoring progress

Generated by \`scripts/must/build-fhb102-2-authoring-slice.mjs\`. This file is an authoring ledger, not an upload instruction.

## Cumulative bounded question-led authoring

| Kind | Created | Status |
|---|---:|---|
| Evidence resources | 14 | local-only source records |
| Claims | 8 | verified against local curriculum citations; independent review still owed |
| Citations | 13 | local curriculum |
| Article spans | 8 | linked to the clean-key claims |
| Concepts | 8 | under review / needs evidence |
| Articles | 8 | Draft |
| Questions | 8 | Draft |
| Question authoring holds | 14 | no student-facing record authored |

The first eight slices authored Q1, Q5, Q7, Q8, Q9, Q10, Q11 and Q12 with printed keys unchanged. The ninth slice assesses Q13 and Q14 but authors neither: Q13 is ambiguous because two offered answers are supported, while Q14's printed A is clean but its required reciprocal article update cannot pass the focused dependency contract without replacing older live links or introducing unrelated article updates. The tenth through fourteenth slices confirm the printed keys for Q15 through Q19 against governed local teaching but apply dependency-contract holds because no honest, standalone-complete related-article dependency exists inside each bounded slice. The fifteenth and sixteenth slices hold Q20 and Q21 because the governed teaching deck directly contradicts their printed keys. The seventeenth slice confirms Q22 but holds it because its exact pending concept cannot be resolved locally without pulling a broad cross-university article/evidence dependency chain into this bounded slice. No key was changed and no Q13–Q22 student-facing record was created.

### Second-slice delta

- 0 new resources: the two exact source records were reused.
- +1 claim, +1 citation and +1 article span.
- +1 under-review concept, +1 Draft article and +1 Draft question.
- +2 explicit key-conflict holds from the intervening source order: Q2 and Q4.

### Third-slice delta

- +1 evidence resource: the official university FHB102-2 ticks lecture used to check Q7.
- +1 claim, +1 citation and +1 article span.
- +1 under-review concept, +1 Draft article and +1 Draft question.
- 0 new holds: Q7's printed B agrees with the direct university teaching statement; Q2, Q3, Q4 and Q6 remain held.

### Fourth-slice delta

- +1 evidence resource: the official university FHB102-2 lice, fleas and bugs lecture used to check Q8.
- +1 claim, +2 citations and +1 article span.
- +1 under-review concept, +1 Draft article and +1 Draft question.
- 0 new holds: Q8's printed A agrees with the university body-louse teaching; Q2, Q3, Q4 and Q6 remain held.

### Fifth-slice delta

- 0 new resources: the governed assessment bank and university lice, fleas and bugs lecture were reused.
- +1 claim, +2 citations and +1 article span.
- +1 under-review concept, +1 Draft article and +1 Draft question.
- 0 new holds: Q9's printed C agrees with the university human-flea teaching; Q2, Q3, Q4 and Q6 remain held.

### Sixth-slice delta

- +1 evidence resource: the official university FHB102-2 mosquito-control lecture used to check Q10.
- +1 claim, +1 citation and +1 article span.
- +1 under-review concept, +1 Draft article and +1 Draft question.
- 0 new holds: Q10's printed A agrees with the university symbiont-bacteria definition; Q2, Q3, Q4 and Q6 remain held.

### Seventh-slice delta

- +1 evidence resource: the official university FHB102-2 sandfly lecture used to check Q11.
- +1 claim, +2 citations and +1 article span.
- +1 under-review concept, +1 Draft article and +1 Draft question.
- 0 new holds: Q11's printed D agrees with the university Phlebotomus teaching; Q2, Q3, Q4 and Q6 remain held.

### Eighth-slice delta

- +1 evidence resource: the official university FHB102-2 flies and myiasis lecture used to check Q12.
- +1 claim, +2 citations and +1 article span.
- +1 under-review concept, +1 Draft article and +1 Draft question.
- 0 new holds: Q12's printed D agrees with the university Sarcophaga posterior-spiracle and wound-myiasis teaching; Q2, Q3, Q4 and Q6 remain held.

### Ninth-slice delta

- +1 evidence resource: the locally supplied FHB102-2 anti-tuberculous pharmacology deck used to assess Q13 and check Q14.
- 0 claims, citations, article spans, concepts, articles or questions: no student-facing Q13/Q14 content was emitted.
- +2 explicit holds: Q13 is not a valid clean single-best-answer import because the ethambutol slide supports both optic neuritis and peripheral neuritis; Q14 is held on the authoring dependency contract even though its printed A agrees with the governed teaching.

### Tenth-slice delta

- +1 evidence resource: the locally supplied 22-page FHB102-2 30S protein-synthesis-inhibitor deck, fully rendered and visually read to assess Q15.
- 0 claims, citations, article spans, concepts, articles or questions: no student-facing Q15 content was emitted.
- +1 explicit dependency hold: Q15's unchanged printed **C, ototoxicity**, agrees with pages 17–20 of the governed teaching deck, but a complete Draft article cannot satisfy the focused sibling-dependency contract without an artificial companion article or an unsafe update to a separately governed live article.
- Search gate: four exact searches — \`streptomycin ototoxicity\`, \`aminoglycoside ototoxicity\`, \`eighth cranial nerve ototoxicity\`, and \`streptomycin nerve deafness\` — returned no existing live or pending record, so no rival concept ID was reused or minted for this held item.

### Eleventh-slice delta

- +1 evidence resource: the locally supplied 49-page FHB102-2 antimicrobial-protein-inhibitor deck, already fully governed and directly rechecked on pages 26–32 for Q16.
- 0 claims, citations, article spans, concepts, articles or questions: no student-facing Q16 content was emitted.
- +1 explicit dependency hold: Q16's unchanged printed **A, chloramphenicol**, is stated directly on page 31, but a complete Draft article cannot satisfy the focused sibling-dependency contract without an artificial companion article or an unsafe update to a separately governed live article.
- Search gate: \`chloramphenicol aplastic anemia\`, \`chloramphenicol adverse effect aplastic anemia\`, \`idiosyncratic chloramphenicol aplastic anemia\`, and \`chloramphenicol bone marrow toxicity\`, followed by the exact stem search, returned no existing live or pending record. No rival concept ID was reused or minted for this held item.

### Twelfth-slice delta

- +1 evidence resource: the locally supplied 17-page FHB102-2 50S protein-synthesis-inhibitor deck, fully rendered and visually read for Q17.
- 0 claims, citations, article spans, concepts, articles or questions: no student-facing Q17 content was emitted.
- +1 explicit dependency hold: Q17's unchanged printed **A, clindamycin**, is stated directly on page 12, but a complete Draft article cannot satisfy the focused sibling-dependency contract without an artificial companion article or an unsafe update to a separately governed live article.
- Search gate: \`clindamycin pseudomembranous colitis\`, \`clindamycin adverse effect pseudomembranous colitis\`, \`antibiotic causing pseudomembranous colitis\`, \`lincosamide pseudomembranous colitis\`, and the exact stem search returned no reusable live or pending record. A pending C. difficile disease-causation concept has a different atomic scope and was not substituted for this clindamycin adverse-effect item.

### Thirteenth-slice delta

- 0 new evidence resources: the governed 17-page 50S-inhibitor deck and 49-page antimicrobial-protein-inhibitor deck were reused.
- 0 claims, citations, article spans, concepts, articles or questions: no student-facing Q18 content was emitted.
- +1 explicit dependency hold: Q18's unchanged printed **B, chloramphenicol**, is stated directly on page 15 of the 50S deck and page 31 of the antimicrobial-protein-inhibitor deck, but a complete Draft article cannot satisfy the focused sibling-dependency contract without an artificial companion article or an unsafe update to a separately governed live article.
- Search gate: \`chloramphenicol grey baby syndrome\`, \`chloramphenicol gray baby syndrome\`, \`grey baby syndrome neonates\`, \`chloramphenicol neonatal toxicity\`, and the exact stem search returned no reusable live or pending record.

### Fourteenth-slice delta

- +1 evidence resource: the locally supplied 23-page FHB102-2 antimicrobial-nucleoprotein-inhibitor deck, previously fully governed and directly rechecked on pages 4–9 for Q19.
- 0 claims, citations, article spans, concepts, articles or questions: no student-facing Q19 content was emitted.
- +1 explicit dependency hold: Q19's unchanged printed **C, ciprofloxacin**, is supported by the deck's direct ciprofloxacin/fluoroquinolone identification and its statement that fluoroquinolones may damage growing cartilage and cause arthropathy, but a complete Draft article cannot satisfy the focused sibling-dependency contract without an artificial companion article or an unsafe update to a separately governed live article.
- Search gate: \`fluoroquinolone cartilage damage children\`, \`ciprofloxacin pediatric cartilage\`, \`ciprofloxacin cartilage damage children\`, \`fluoroquinolone growing cartilage arthropathy\`, and the exact stem search returned no reusable live or pending record.

### Fifteenth-slice delta

- +1 evidence resource: the locally supplied 40-page beta-lactam and vancomycin deck, previously fully governed and directly rechecked on pages 37–39 for Q20.
- 0 claims, citations, article spans, concepts, articles or questions: no student-facing Q20 content was emitted.
- +1 explicit key-conflict hold: Q20's anonymous printed key is **B, teicoplanin**, while the governed teaching deck places red man syndrome under **vancomycin**, which the bank offers as option C. The printed key was preserved as source evidence and was neither corrected nor taught.
- Search gate: \`vancomycin red man syndrome\`, \`red man syndrome glycopeptide\`, \`vancomycin infusion reaction\`, \`vancomycin histamine flushing\`, and the exact printed-key stem search returned no reusable live or pending record.

### Sixteenth-slice delta

- 0 new evidence resources: the governed 40-page beta-lactam and vancomycin deck was reused and pages 37–39 were visually rechecked.
- 0 claims, citations, article spans, concepts, articles or questions: no student-facing Q21 content was emitted.
- +1 explicit key-conflict hold: Q21's anonymous printed key is **C, piperacillin**, while the governed teaching deck identifies **metronidazole or oral vancomycin** for drug-induced pseudomembranous colitis; the bank offers metronidazole as option B. The printed key was preserved as source evidence and was neither corrected nor taught.
- Search gate: \`Clostridium difficile associated diarrhea treatment metronidazole\`, \`pseudomembranous colitis metronidazole treatment\`, \`antibiotic associated diarrhea oral vancomycin metronidazole\`, \`C difficile diarrhea antibiotic treatment\`, and the exact printed-key stem search returned no reusable live or pending record.

### Seventeenth-slice delta

- 0 new evidence resources: the governed 23-page antimicrobial-nucleoprotein-inhibitor deck was reused, and the bank's page-break option field plus teaching pages 4–5 were visually rechecked.
- 0 claims, citations, article spans, concepts, articles or questions: no student-facing Q22 content was emitted.
- +1 explicit dependency hold: Q22's unchanged printed **C, inhibits DNA gyrase**, agrees with the governed teaching deck. Manual collision review found the exact pending concept \`CON-FND-014D200ED96498\`; it was reused as the identity decision and no duplicate ID was minted, but it is not live and depends on a broad pending Alexandria article/evidence chain that cannot be safely imported or overlaid inside this one-question MUST slice.
- Search gate: \`fluoroquinolone DNA gyrase\`, \`ciprofloxacin mechanism of action\`, \`fluoroquinolone topoisomerase inhibition\`, \`DNA gyrase inhibitor fluoroquinolone\`, and the exact stem search returned no live match. The manual all-pending-doc collision check found the exact pending concept above and its pending broad article \`ART-FND-DNA-REPLICATION-REPAIR-PCR\`; neither was silently duplicated or imported.

## Explicit authoring holds

- **Q2 is held.** The anonymous bank prints **B, filariform**, while the malaria-pattern stem asks the stage inoculated by the vector and the department carrier states **I.S. → sporozoite** on p6. No Q2 student-facing record was authored, and no replacement answer was imported.
- **Q3 is held.** The anonymous bank prints **C, propagative**, while the stem asks transmission "to offspring mosquitoes," which indicates a cross-generation/transovarian mechanism. The department carrier separately records a transovarian vector example on p6. No Q3 student-facing record was authored, and no replacement answer was imported.
- **Q4 is held.** The anonymous bank prints **C, leishmaniasis**, while its Texas, severe haemolysis, dark urine and cross-shaped tetrad description is identified as **babesiosis** by the department carrier on p6. No Q4 student-facing record was authored, and no replacement answer was imported.
- **Q6 is held.** The anonymous bank prints **A, intermediate host**, while the MUST Parasitology Department carrier identifies female Anopheles as **D.H.** on p4 and states "Female anopheles (D.H), Soldier (I.H)" on p6. No Q6 student-facing record was authored, and no replacement answer was imported.
- **Q13 is held.** The anonymous bank prints **A, retrobulbar neuritis**, while its single-best-answer options also include **D, peripheral neuritis**. The local ethambutol adverse-effects slide on p22 explicitly lists optic neuritis and peripheral neuritis, so two offered answers are supported by the governed teaching evidence. No Q13 student-facing record was authored, and the printed key was not corrected or replaced.
- **Q14 is held on the dependency contract, not on its printed key.** The anonymous bank prints **A, pyridoxine**, and the local isoniazid slides on pp15–16 support vitamin B6 depletion and pyridoxine co-administration. The necessary reciprocal link to live article \`ART-INF-TOP-65C8E5125F\` could not be added as a standalone-complete update while keeping that article's four older governed related-article links and satisfying the focused sibling-dependency validator. No unrelated article was substituted, no existing university overlay was replaced, and no Q14 question, concept, claim, span or article record was authored.
- **Q15 is held on the dependency contract, not on its printed key.** The anonymous bank prints **C, ototoxicity**. The local teaching deck explicitly lists streptomycin among aminoglycosides on p17, describes aminoglycoside concentration in inner-ear peri- and endolymph leading to ototoxicity on p18, and names eighth-cranial-nerve damage under aminoglycoside adverse effects on p20. The key therefore remains unchanged. Four required searches found no reusable record. A new article would need either an artificial companion article created only to satisfy the focused sibling rule or a separately governed live-article update outside this bounded slice; neither was substituted. No Q15 question, concept, claim, citation, span or article record was authored.
- **Q16 is held on the dependency contract, not on its printed key.** The anonymous bank prints **A, chloramphenicol**. The governed antimicrobial-protein-inhibitor deck explicitly lists aplastic anemia under chloramphenicol adverse effects on p31. A separate 17-page local 50S-inhibitor deck uses broader bone-marrow-depression wording; that wording was treated only as corroboration and was not rewritten into the stem's exact term. Five required searches found no reusable record. A new article would need either an artificial companion article created only to satisfy the focused sibling rule or a separately governed live-article update outside this bounded slice; neither was substituted. No Q16 question, concept, claim, citation, span or article record was authored.
- **Q17 is held on the dependency contract, not on its printed key.** The anonymous bank prints **A, clindamycin**. The governed local 50S-inhibitor deck directly lists pseudomembranous colitis and diarrhea under clindamycin adverse effects on p12. Five required searches found no reusable record; an existing pending C. difficile disease-causation concept does not represent this narrower drug-adverse-effect scope. A new article would need either an artificial companion article created only to satisfy the focused sibling rule or a separately governed live-article update outside this bounded slice; neither was substituted. No Q17 question, concept, claim, citation, span or article record was authored.
- **Q18 is held on the dependency contract, not on its printed key.** The anonymous bank prints **B, chloramphenicol**. The governed local 50S-inhibitor deck explicitly lists grey baby syndrome in neonates under chloramphenicol adverse effects on p15 and explains reduced neonatal drug clearance; the independently governed antimicrobial-protein-inhibitor deck also lists gray baby syndrome under chloramphenicol adverse effects on p31. Five required searches found no reusable record. A new article would need either an artificial companion article created only to satisfy the focused sibling rule or a separately governed live-article update outside this bounded slice; neither was substituted. No Q18 question, concept, claim, citation, span or article record was authored.
- **Q19 is held on the dependency contract, not on its printed key.** The anonymous bank prints **C, ciprofloxacin**. The governed antimicrobial-nucleoprotein-inhibitor deck identifies ciprofloxacin as a fluoroquinolone on pp4 and 7, then states on p9 that fluoroquinolones may damage growing cartilage and cause arthropathy. Five required searches found no reusable record. A new article would need either an artificial companion article created only to satisfy the focused sibling rule or a separately governed live-article update outside this bounded slice; neither was substituted. No Q19 question, concept, claim, citation, span or article record was authored.
- **Q20 is held.** The anonymous bank prints **B, teicoplanin**, while its options also include **C, vancomycin**. The governed beta-lactam and vancomycin teaching deck explicitly places red man syndrome under vancomycin adverse effects on p38, attributes it to histamine release with rapid infusion, and describes prevention by slow infusion and antihistamine pretreatment. No Q20 student-facing record was authored, and the printed key was not corrected, replaced or silently taught as vancomycin.
- **Q21 is held.** The anonymous bank prints **C, piperacillin**, while its options also include **B, metronidazole**. The governed beta-lactam and vancomycin teaching deck identifies metronidazole or oral vancomycin as treatment for drug-induced pseudomembranous colitis on p39. No Q21 student-facing record was authored, and the printed key was not corrected, replaced or silently taught as metronidazole.
- **Q22 is held on the dependency contract, not on its printed key.** The anonymous bank prints **C, inhibits DNA gyrase**. Its stem ends on p3 and the four-option field continues on p4; both pages were visually read as one item. The governed antimicrobial-nucleoprotein-inhibitor deck labels fluoroquinolones as DNA-gyrase inhibitors on p4 and diagrams DNA gyrase/topoisomerase IV at the replication fork on p5. The exact concept already exists pending as \`CON-FND-014D200ED96498\`, but that record points to the broad pending Alexandria article \`ART-FND-DNA-REPLICATION-REPAIR-PCR\` and unresolved Alexandria evidence. Importing or updating that chain here would exceed this bounded MUST slice and risk clobbering another university's complete record. No duplicate concept was minted and no Q22 question, concept, claim, citation, span or article record was authored.

Q2, Q3, Q4, Q6, Q13, Q20 and Q21 require an authorised medical reviewer to resolve the item disposition before authoring: retain verbatim with a formal source-key correction, rewrite and retire the source wording, or exclude the item. Q14 through Q19 may proceed only when their article dependencies can be represented honestly without clobbering governed live links, inventing unrelated content or weakening the focused validator.

Q22 may proceed only after its exact pending concept and broad article/evidence dependencies are made live or can be represented as standalone-complete cross-university updates without overwriting Alexandria provenance.

## Exact backlog after seventeen slices

- Governed prompt observations: 5,444 total; 8 authored; **5,436 raw prompt observations remain**, including the 14 explicit holds.
- Governed answer observations: 5,211 total; 8 clean source-keyed prompts authored; **5,203 raw answer observations remain**, including the 14 held printed-key observations.
- Opening 32-prompt normalized family: 8 authored, 14 held, and **10 not yet assessed for authoring**; therefore **24 prompts remain in the authoring backlog**, of which Q32 is source-absent.
- Record-level backlog is not asserted as 5,436 unique records: repeated and near-repeated prompts must still be deduplicated during authoring, per the one-question-one-record rule.

## Upload state

No MUST content has been uploaded or imported. All eight student-facing articles and questions remain Draft; all eight concepts use the concept schema's non-published \`under review\` state and \`publication_status: needs_evidence\`. Q2, Q3, Q4, Q6, Q13 through Q22 exist only as authoring-ledger holds.
`
}
