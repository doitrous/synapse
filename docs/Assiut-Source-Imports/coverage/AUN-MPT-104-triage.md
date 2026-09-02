# AUN-MPT-104 -- S3 first-module triage

Module: Mechanisms and principles of diseases & therapy (`AUN-MPT-104`), Year 1
Semester 2. Chosen as the first module because its raw source folder
(`Year 1/MPT/_Telegram 64 Newer`, 185 files) is the richest fully-text-native
keyed-exam corpus among the confirmed Year 1 modules -- see
`coverage/AUN-Y1-readability-index.md` (`All Quizzes MPT 2022.pdf`: 212 pages /
26,705 words, 0 garbled; `MCQ pharma Alex.pdf`: 30 pages / 18,913 words, 0
garbled; `MCQ مذكرة سنة أولى باثولوجي.pdf`: 79 pages / 11,808 words, 0
garbled) plus a real, dated final exam paper.

## Source triaged this pass

`Year 1/MPT/_Telegram 64 Newer/MPT mcq questions (final 2022).pdf` -- a printed
Assiut University Faculty of Medicine final exam, block "Mechanisms and
Principles of Diseases and Therapy", dated 17/7/2022, 85 marks, tier 1 (real
exam paper, per the Priority 4 selection rule). Selected over the larger
`All Quizzes MPT 2022.pdf` because it is a single, dated, complete official
paper with printed circled keys, not an unattributed compiled quiz set --
higher confidence for a first triage pass. The remaining tier-1/3 sources
listed above are queued for the next triage pass, not yet read.

**Extraction method:** the native text layer was 0 words on every page
(`pagetext.mjs status`) -- this file is a scan. All 11 pages were OCR'd
(`pagetext.mjs ocr --pages 1-11`, tesseract `--psm 6`/`--psm 4` fallback).
Pages 1-7 OCR'd cleanly (223-501 words/page from page 8 on; pages 1-7 are
denser, image-heavy pharmacology stems). Pages 8-11 show visible OCR noise
(broken words, misplaced line breaks) -- printed circled-letter keys became
inconsistent glyphs (`@)`, `(B)`, `©`) on those pages, so several keys on
pp.8-11 are **not** confidently recovered and are marked below rather than
guessed. Per the manual's rule ("printed keys stand as printed; a conflict is
a hold, never an inference"), no key was inferred from clinical reasoning
where the printed marker was ambiguous or contradicted the expected answer
(see Q47 below).

## Checkpoint table -- revised after render-pass key recovery (see below)

| Module | Questions triaged | Keys recovered | Distinct concepts tested | Live-hit | Pending-hit | New |
|---|--:|--:|--:|--:|--:|--:|
| AUN-MPT-104 | 90 | 44 | 41 | 1 | 5 | 38 (incl. Li-Fraumeni/germline TP53) |

- **Questions triaged (90):** every MCQ printed in the paper (Q1-Q90).
- **Keys recovered (44), method:** the original pass read OCR *text* only,
  which does not reliably carry a hand-drawn circle around an option letter.
  This pass instead force-re-OCR'd pp.8-11 at 400dpi
  (`pagetext.mjs ocr --pages 8-11 --force --dpi 400`), then `mark-garbled` +
  `render`'d **all 11 pages** at 400dpi and read each page's image directly
  (not the OCR text) to see the printed answer markers with certainty. Two
  marker styles are used throughout this copy: a hand-drawn circle around one
  option letter (the majority case), and on several pages a short dash
  prefixed to one option only (`-D. Vitamin C`) where the circle's ink did not
  fully take -- both are treated as the printed key when exactly one option in
  the question carries the mark. Some questions carry a different annotation
  entirely: an "X" through one or two options (elimination marks, not a
  positive key) -- these do **not** yield a confident single letter and stay
  unresolved (Q28, Q29, Q79).
- **Net effect vs. the original 31:** +15 newly recovered from the render
  pass (Q1, Q5, Q19*, Q25*, Q35, Q36, Q54, Q55, Q60, Q63, Q64, Q69, Q75, Q80,
  Q86), **2 corrections** where the original OCR-based read had no supporting
  visual mark at all (Q22, Q29 -- both revert to unresolved, see below), and
  **1 letter correction** (Q44: originally transcribed as key B; the visual
  circle is on C "Mefloquine", which also matches the tested-idea text already
  written for Q44 -- B was a transcription slip, not a second marker).
  *Q19 and Q25 are marked in the source with a positive, unambiguous circle/
  dash, but the marked option contradicts the stem's own clinical logic
  (Q19: "prescribe a bronchodilator" -> marked answer Timolol, which is not a
  bronchodilator and can worsen bronchospasm; Q25: "used safely without
  impairing his ability to drive" -> marked answer Diphenhydramine, a
  first-generation sedating antihistamine). Per the standing rule that a
  conflict between the printed key and the expected answer is a hold, not an
  inference, both are held alongside Q47 rather than authored.*
- **Final recovered-key list (41 usable, Q19/Q25/Q47 held):**
  Q1=B, Q3=C, Q4=A, Q5=B, Q6=B, Q9=A, Q10=B, Q11=A, Q15=B, Q16=A, Q24=B,
  Q32=D, Q34=B, Q35=C, Q36=C, Q37=A, Q38=D, Q40=C, Q44=C, Q45=B, Q46=D,
  Q48=B, Q54=A, Q55=D, Q56=A, Q60=D, Q63=D, Q64=D, Q65=C, Q69=C, Q75=A,
  Q78=A, Q80=B, Q81=B, Q82=A, Q84=A, Q85=D, Q86=B, Q87=D, Q88=C, Q89=D,
  Q90=B.
- **Still unrecovered -- no marker of any kind found even on the rendered
  page image (45 questions), stays untriaged for keys, not held:**
  Q2, Q7, Q8, Q12-14, Q17-18, Q20-21, Q23, Q26-28, Q29, Q30-31, Q33, Q39,
  Q41-43, Q49-53, Q57-59, Q61-62, Q66-68, Q70-74, Q76-77, Q79, Q83. (Q28,
  Q29, Q79 additionally carry elimination "X" marks on 1-2 wrong options,
  documented above, but no single letter is confirmed.)
- **Distinct concepts tested (41):** after collapsing near-duplicates (Q6 and
  Q11 both test "chemical antagonism," counted once) and adding the 15
  newly-keyed questions' tested ideas, minus Q19/Q25 (held, not counted) plus
  the new Li-Fraumeni/germline-TP53 idea split out from Q88's p53 concept
  (related but distinct from the pending "p53 guardian of the genome"
  cell-cycle concept -- see below).
- **Live / pending / new:** via `find-existing.mjs` against live state, every
  `docs/*-Source-Imports` root and `docs/import-ready` (00-START-HERE.md §4),
  re-run this pass for every concept below.

## Per-question triage (recovered keys only)

Corrections from the original pass are marked **(corrected)**; questions new
to this pass (recovered only via the 400dpi render, not the original OCR
text) are marked **(new this pass)**.

| Q | Tested idea | Printed key | find-existing result |
|--:|---|:-:|---|
| 1 | IV route is the appropriate route for an emergency antidote in drug overdose | B | new **(new this pass)** |
| 3 | Cimetidine does not reduce oral-contraceptive effectiveness (CYP inhibitor, not inducer) | C | new |
| 4 | First-pass/absorption step limits topical-corticosteroid plasma concentration | A | new |
| 5 | Hemodialysis works for drugs with a low volume of distribution (Vd = 15 L/70kg, the lowest of the four options) | B | new **(new this pass)** |
| 6 | Protamine sulfate reverses heparin -- chemical antagonism | B | new |
| 9 | Steroid/thyroid intracellular receptors chaperoned by hsp90 | A | new |
| 10 | Irreversible antagonist -- Emax reduced, EC50 unchanged at low dose, no rescue at high agonist dose | B | **pending** -- `docs/import-ready/concept/108-INT-concepts-pharmacology.md`, `docs/Kasr-Source-Imports/concept/108-INT-concepts-pharmacology.md` ("An irreversible antagonist binds covalently...") |
| 11 | Sugammadex -- chemical antagonism (binds drug directly, not receptor) | A | new (same tested idea as Q6, collapsed) |
| 15 | Bethanechol stimulates bowel motility post-op | B | new |
| 16 | Tiotropium -- parasympatholytic bronchodilator for asthma | A | new |
| 22 | Carvedilol -- nonselective beta-blocker with antioxidant/alpha-blocking activity in heart failure | *unresolved* **(corrected)** -- 400dpi render shows **no circle, dash or any mark** on any of the four options; the original "A" was an OCR-text misread. Reverts to untriaged-for-keys, not a hold (no conflicting mark exists, there is simply no mark). | new |
| 24 | Ondansetron for chemotherapy-induced nausea (cisplatin) | B | new |
| 29 | Aztreonam -- safe in penicillin anaphylaxis (no cross-reactivity) | *unresolved* **(corrected)** -- render shows an "X" through option C (Cefuroxime) only, an elimination mark, not a positive circle on A. Three options remain unmarked; not resolvable to a single letter. Reverts to untriaged-for-keys. | new |
| 32 | Ampicillin -- safest antibiotic class in pregnancy among the options | D | new |
| 34 | Paclitaxel -- microtubule-stabilizing cellular target | B | new |
| 35 | Tacrolimus inhibits calcineurin | C | new **(new this pass)** |
| 36 | Neomycin is the antibiotic of choice for hepatic coma (reduces gut ammonia-producing flora) | C | new **(new this pass)** |
| 37 | Aspirin -- most effective thromboxane A2 inhibitor among the options | A | new |
| 38 | Metronidazole + diloxanide furoate for mild intestinal amebiasis | D | new |
| 40 | Ciprofloxacin (fluoroquinolone) inhibits bacterial DNA gyrase | C | **pending, exact match (upgraded from near-match)** -- `docs/import-ready/concept/AU-MED-102-biochem-molecular-concepts.md` / `docs/Alexandria-Source-Imports/concept/AU-MED-102-biochem-molecular-concepts.md`, canonical_key `pharmacology.ciprofloxacin.dna-gyrase-inhibition`, label "Ciprofloxacin inhibits bacterial DNA gyrase, a topoisomerase, blocking DNA replication" -- this is the same drug and same mechanism as Q40's stem, not just an adjacent concept; reuse this id with an Assiut overlay tag rather than minting |
| 44 | Mefloquine prophylaxis can still fail against P. vivax (hypnozoite relapse) | C **(letter corrected)** | new -- the tested-idea text was already right in the original pass, but the transcribed letter (B) did not match any option reading "Mefloquine"; the render shows the circle on option C |
| 45 | Valacyclovir for genital herpes simplex | B | new |
| 46 | 5-Fluorouracil inhibits thymidylate synthase | D | **live** -- `CON-REN-E6070C296322CB` / `CLM-REN-E6070C296322CB` ("5-Fluorouracil is converted to 5-FdUMP, which inhibits thymidylate synthase") |
| 47 | Fat vs. amniotic-fluid embolism after long-bone trauma | *hold -- printed marker (circled B, "Amniotic fluid embolism") conflicts with the expected clinical answer (fat embolism), confirmed on the 400dpi render, still not resolved* | not searched (hold) |
| 48 | Asbestos exposure and lung cancer risk (shipyard worker) | B | new |
| 54 | Duct papilloma -- benign tumor of columnar/ductal epithelium arising in breast and pancreas | A | new **(new this pass, dash marker)** |
| 55 | Stomach adenocarcinoma is the most likely primary for multiple metastatic liver nodules among the options given | D | new **(new this pass, dash marker)** |
| 56 | Keloid formation after wound healing | A | **pending** -- `docs/import-ready/concept/101-ISK-mcq-concepts.md`, `docs/import-ready/glossary/101-ISK-glossary.md` |
| 60 | Melena describes black, tarry stools in upper-GI bleeding from peptic ulcer disease | D | new **(new this pass)** |
| 63 | Vitamin C is required for proper collagen assembly in healing scar tissue | D | new **(new this pass, dash marker)** |
| 64 | Phagocytosis is the principal macrophage function 24-48h after a wound | D | new **(new this pass, dash marker)** |
| 65 | Brain atrophy in Alzheimer disease as chronic-injury response | C | new |
| 69 | Type IV collagenase degrades extracellular matrix, secreted by tumour cells | C | new **(new this pass)** |
| 75 | Autopsy is examination of a specimen removed from a dead body in the postmortem room | A | new **(new this pass)** |
| 78 | Renal agenesis (unilateral, incidental) | A | new |
| 80 | Uterine enlargement in pregnancy is hypertrophy of the myometrium | B | new **(new this pass)** |
| 81 | Vasodilatation is the arteriolar response in acute inflammation | B | new |
| 82 | Lobar pneumonia -- acute suppurative inflammation | A | new -- a `find-existing` hit on "lobar pneumonia" returns a pending Ain-Shams concept about *Streptococcus pneumoniae as the causative organism* (`docs/Ain-Shams-Source-Imports/concept/ASU-INF-microbiology-concepts.md`), a different fact (etiology, not inflammation-pattern classification) from what Q82 tests -- not a merge candidate, flagged for context only |
| 84 | Active hyperemia (blushing) | A | **pending** -- `docs/Kasr-Source-Imports/glossary/104-CPS-glossary.md` ("Reactive hyperemia" -- near-match term, confirm before treating as the same concept) |
| 85 | Moist gangrene -- no clear line of demarcation | D | new |
| 86 | Fibroadenoma -- discrete, firm, rubbery, mobile breast mass in a young woman, no axillary nodes | B | new **(new this pass)** |
| 87 | Tumor stage is the strongest prognostic factor among the options | D | new |
| 88 | p53 germline mutation -- multi-cancer family syndrome (Li-Fraumeni) | C | new -- related but distinct from the pending p53/Mdm2/G1-S-checkpoint concept already in `docs/import-ready/concept/ASU-MBG-molecular-biology-of-cancer-concepts.md` (that record covers p53's normal cell-cycle function, not a germline mutation's cancer-predisposition-syndrome consequence); author as its own concept, link via `related_concept_ids` |
| 89 | Bilharzial granuloma -- Type IV hypersensitivity | D | new |
| 90 | Immunohistochemistry -- enzyme-linked antibody tissue staining | B | new |

## Held (printed key conflicts with expected clinical answer -- not authored)

| Q | Tested idea | Marked option | Conflict |
|--:|---|:-:|---|
| 19 | Bronchodilator with minimal cardiac side effects for a patient with cardiac history and asthma/COPD symptoms | D "Timolol" | Timolol is a nonselective beta-blocker, not a bronchodilator, and can precipitate bronchospasm; the stem's own logic points to Albuterol (A), the only actual bronchodilator among the four options. |
| 25 | Allergy medication safe for a truck driver's ability to drive | A "Diphenhydramine" | Diphenhydramine is a first-generation, strongly sedating antihistamine; the stem asks for a drug that will not impair driving, which points to a second-generation option (Fexofenadine, D) instead. |
| 47 | Fat vs. amniotic-fluid embolism after long-bone trauma | B "Amniotic fluid embolism" | Long-bone fracture classically causes fat embolism, not amniotic fluid embolism (which requires an obstetric trigger absent from this stem). Already flagged in the original pass; confirmed again on the render. |

## Placement for new (all pharmacology/pathology, subject `pharm` or `mul`/system-specific per 00-START-HERE.md §3)

Not assigned yet -- placement is named at mint time, after TRIAGE APPROVED, following
00-START-HERE.md's rule that `pharm` concepts take an explicit body-system `CON-`
prefix (`FND` general, or the organ system the drug targets) rather than a subject
of their own; the pathology items (Q47, Q48, Q56, Q65, Q78, Q81, Q82, Q84, Q85, Q87,
Q88, Q89, Q90) place by mechanism/organ per the same section's placement rules.

## Needs Omar / open items

- Q19, Q25, Q47 -- printed key visually confirmed (circle/dash, unambiguous) but
  contradicts the stem's own clinical logic. Held per standing rule, not resolved
  by inference. Worth a look at Omar's own copy of the exam / the official answer
  sheet if one exists, since all three read as genuine key errors rather than
  OCR noise.
- 45 of 90 questions still carry no printed marker of any kind, even on the
  400dpi render (full list in the checkpoint section above) -- these are not a
  hold, just genuinely unkeyed; a cleaner-scan copy of this same final, if Omar
  has one, is the only way to recover them (a second render pass at higher DPI
  on the same scan is unlikely to add information, since the ink itself, not
  image quality, is the limiting factor for these).
- Q28, Q29, Q79 carry elimination "X" marks on 1-2 wrong options rather than a
  positive circle on the right one -- 2-3 options remain live, not resolvable to
  a single letter without the answer sheet.
- `All Quizzes MPT 2022.pdf` (212p, fully text-native, 0 garbled), `MCQ pharma
  Alex.pdf` (30p, 0 garbled) and `MCQ مذكرة سنة أولى باثولوجي.pdf` (79p, 0 garbled,
  Arabic-titled pathology MCQ bank) are queued as the next MPT triage sources --
  none of these needed OCR, so they are cheaper to triage than this final exam was.
  Not started this pass (budget went to key recovery + first authoring batch).

## S3b -- `All Quizzes MPT 2022.pdf` triage (second author lane)

Second AUN-MPT-104 author lane's scope, per its dispatch: do not spend more
budget on the final's 45 still-unmarked rows above; instead triage and author
from the fully text-native quiz bank. Source: `Year 1/MPT/_Telegram 64
Newer/All Quizzes MPT 2022.pdf`, confirmed 0 garbled / 212p / 26,705 words
(`pagetext.mjs status`) and 0 visually-marked keys (`pagetext.mjs keys`,
correctly reports 0 -- this file needs no circle/highlight reading at all).

**What this file actually is:** a Moodle "quiz attempt review" export, one
printed page range per quiz, each ending every option block with a literal
`The correct answer is: <option text>` line -- the review copy prints the
right answer as plain text on every single question, no visual key-reading
needed. `pagetext.mjs grep "<pdf>" "The correct answer is"` returns exactly
441 hits across all 212 pages; `pagetext.mjs grep "<pdf>" "^ *Question \d+"`
also returns 441, one-to-one. **441/441 questions carry a printed, unambiguous
key (100%).**

**Structure:** 52 separate quizzes, one per lecture, `Lecture N: <topic>
Quiz N` as the page-1 header of each section (`pagetext.mjs grep "<pdf>"
"^Lecture \d+|^Home" --ignore-case` recovers all 52 -- 19 headers keep the
lecture name on the grep-matched physical line, the other 33 wrap the name
onto the next physical line, caught separately by the `^Lecture \d+` pattern).
Question numbering restarts at 1 within each quiz (not global) -- quiz
boundaries were segmented programmatically off that reset, then cross-checked
against the 52 header pages; both methods agree exactly (52 quizzes, 441
questions, page starts identical). The lecture list alternates Pathology and
Pharmacology one-for-one for all 52 lectures (odd lecture number = Pathology,
even = Pharmacology) -- this is the MPT-104 "Mechanisms and Principles of
Disease and Therapy" combined-track curriculum, not a triage artefact. Full
52-row lecture/quiz/page/key-range map: `coverage/AUN-MPT-104-triage-keys.txt`
(machine-readable, one key per line) plus the summary table below.

| quiz | track | lecture topic | start page | Qs | global keys |
|--:|---|---|--:|--:|---|
| 1 | Pathology | Introduction of pathology | 1 | 7 | q001-q007 |
| 2 | Pharmacology | Introduction to Pharmacology | 5 | 9 | q008-q016 |
| 3 | Pathology | Cell injury its mechanism | 10 | 5 | q017-q021 |
| 4 | Pharmacology | Drug receptors, signaling mechanisms and drug action | 13 | 15 | q022-q036 |
| 5 | Pathology | Necrosis and apoptosis | 20 | 10 | q037-q046 |
| 6 | Pharmacology | Receptor Regulation and Variation in Drug Responsiveness | 25 | 9 | q047-q055 |
| 7 | Pathology | Cellular accumulations: cloudy swelling, hydropic degeneration and fatty changes | 30 | 5 | q056-q060 |
| 8 | Pharmacology | Adverse drug reaction | 33 | 12 | q061-q072 |
| 9 | Pathology | Cellular accumulations: Amyloidosis, hyalinosis and pathological calcification | 39 | 5 | q073-q077 |
| 10 | Pharmacology | Pharmacokinetics 1 (Absorption & distribution) | 41 | 14 | q078-q091 |
| 11 | Pathology | Cellular adaptation 1 | 46 | 3 | q092-q094 |
| 12 | Pharmacology | Pharmacokinetics 2 (Metabolism & excretion) | 48 | 12 | q095-q106 |
| 13 | Pathology | Cellular adaptation 2 | 53 | 2 | q107-q108 |
| 14 | Pharmacology | Pharmacokinetics variables 1 | 54 | 10 | q109-q118 |
| 15 | Pathology | Inflammation: definition and causes | 58 | 5 | q119-q123 |
| 16 | Pharmacology | Pharmacokinetics variables 2 | 60 | 11 | q124-q134 |
| 17 | Pathology | Acute inflammation: mechanisms and formation of fluid exudate | 64 | 3 | q135-q137 |
| 18 | Pharmacology | Introduction to Autonomic Nervous System | 66 | 13 | q138-q150 |
| 19 | Pathology | Acute suppurative inflammation | 71 | 6 | q151-q156 |
| 20 | Pharmacology | Parasympathetic nervous system (Agonists) 1 | 74 | 12 | q157-q168 |
| 21 | Pathology | Acute non suppurative inflammation | 79 | 2 | q169-q170 |
| 22 | Pharmacology | Parasympathetic nervous system (Agonists) 2 | 80 | 12 | q171-q182 |
| 23 | Pathology | Chronic inflammation definition and types | 85 | 3 | q183-q185 |
| 24 | Pharmacology | Parasympathetic nervous system (Antagonists) | 87 | 12 | q186-q197 |
| 25 | Pathology | Granuloma: types and mechanisms | 92 | 9 | q198-q206 |
| 26 | Pharmacology | Sympathetic nervous system (agonists) 1 | 97 | 7 | q207-q213 |
| 27 | Pathology | Tissue repair: types and mechanisms | 101 | 8 | q214-q221 |
| 28 | Pharmacology | Sympathetic nervous system (agonists) 2 | 106 | 7 | q222-q228 |
| 29 | Pathology | Tissue repair: Factors affecting and complications | 110 | 5 | q229-q233 |
| 30 | Pharmacology | Sympathetic nervous system (antagonists) 1 | 114 | 11 | q234-q244 |
| 31 | Pathology | Heamodynamic disorders: Hyperemia, congestion and thrombosis | 119 | 8 | q245-q252 |
| 32 | Pharmacology | Sympathetic nervous system (antagonists) 2 | 124 | 5 | q253-q257 |
| 33 | Pathology | Heamodynamic disorders: Embolism, ischemia and infarction | 128 | 20 | q258-q277 |
| 34 | Pharmacology | Autacoids 1 | 136 | 6 | q278-q283 |
| 35 | Pathology | Heamodynamic disorders: Gangrene, heamorhage and edema | 140 | 21 | q284-q304 |
| 36 | Pharmacology | Autacoids 2 | 149 | 6 | q305-q310 |
| 37 | Pathology | Neoplasia: definition and classification | 153 | 6 | q311-q316 |
| 38 | Pharmacology | Autacoids 3 | 157 | 6 | q317-q322 |
| 39 | Pathology | Neoplasia: characters of benign and malignant | 161 | 6 | q323-q328 |
| 40 | Pharmacology | Introduction to Antimicrobial therapy | 165 | 7 | q329-q335 |
| 41 | Pathology | Neoplasia: Mechanisms of spread of malignant tumors | 169 | 9 | q336-q344 |
| 42 | Pharmacology | Antimicrobial therapy 1 | 172 | 8 | q345-q352 |
| 43 | Pathology | Neoplasia: Routes of spread of malignant tumors | 175 | 6 | q353-q358 |
| 44 | Pharmacology | Antimicrobial therapy 2 | 178 | 5 | q359-q363 |
| 45 | Pathology | Etiology of cancers and laboratory diagnosis | 180 | 19 | q364-q382 |
| 46 | Pharmacology | Commonly used Antiviral / antihelmintics / antiprotozoal 1 | 186 | 7 | q383-q389 |
| 47 | Pathology | Benign epithelial tumors classification and examples | 189 | 9 | q390-q398 |
| 48 | Pharmacology | Commonly used Antiviral / antihelmintics / antiprotozoal 2 | 192 | 7 | q399-q405 |
| 49 | Pathology | Malignant epithelial tumors classification and examples | 195 | 9 | q406-q414 |
| 50 | Pharmacology | Anticancer & Immunomodulator 1 | 199 | 5 | q415-q419 |
| 51 | Pathology | Mesenchymal tumors: benign, malignant and developmental tumors | 202 | 17 | q420-q436 |
| 52 | Pharmacology | Anticancer & Immunomodulator 2 | 210 | 5 | q437-q441 |

**Keys file:** `coverage/AUN-MPT-104-triage-keys.txt` lists all 441 rows as
`quizzes-2022-q<NNN>  # Lec<i>.Q<n> p<page> [<track>] <lecture topic> --
<stem excerpt>`. The `quizzes-2022-q<NNN>` token (before the `#` comment) is
the literal seed `key` used in `coverage/seeds/AUN-MPT-104/quizzes-2022.json`
-- `ledger.mjs` strips everything from `#` onward before comparing, so
authored/held/remaining reconciles exactly against this file (unlike the
final-2022 triage keys above, which are free text and never string-match a
seed's short `key`, so that ledger table's "remaining" column is not a
reliable count -- noted here so a future lane does not repeat it).

**Renders: 0.** No page in this file needed `render` or `ocr` -- fully
native text throughout, no visually-marked keys, only literal "correct
answer is" text.

**First authoring batch (this lane, S3b):** quizzes 1-4 (q001-q036, Lectures
1-4: Introduction of pathology / Introduction to Pharmacology / Cell injury
its mechanism / Drug receptors & drug action) -- see
`coverage/seeds/AUN-MPT-104/quizzes-2022.json`. Remaining 405 questions
(quizzes 5-52) are triaged (keyed, page-mapped, concept-searchable) but not
yet authored -- queued for the next batch/lane, in `quizzes-2022-q037`
onward per the keys file.

## `INI MCQ .pdf` -- out of scope for this module

`Year 1/INI/INI MCQ .pdf` (132p, 25,488 words, 0 garbled) is listed under
`AUN-INI-105`, not `AUN-MPT-104`, in `coverage/AUN-Y1-priority-sources.md`'s
per-module source tables ("second-largest clean INI source"). Confirmed not
triaged or authored here; left for an `AUN-INI-105` lane.
