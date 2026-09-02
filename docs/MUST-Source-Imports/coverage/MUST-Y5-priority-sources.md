# MUST Year 5 — priority source set (S2)

Per module, the papers/banks a lane would author from, in tier order (tier 1 = real
dated exam paper or a department-specific "Previous Questions" set; tier 2 = a curated
solved question bank, MUST-specific or department-named; tier 3 = a generic textbook
MCQ compilation, still solvable but not MUST-specific; tier 4/5 = teaching notes,
slides, summaries — evidence for articles, not question sources).

Source-tree convention observed everywhere in Year 5: kind folders are numbered
consistently — `01 University Material` (lectures), `03 Practical and OSPE`,
`04 Summaries and Revision` (notes), `05 MCQs` (bank), `06 EOM Exams`, `08 Midterm
Exams` (papers — but **folder name alone is not reliable**, see the correction note
below). Full row-per-file data with sha256/size/kind-guess: `manifest/y5-sources.json`.

**Correction found during S3 spot-checking (do not trust folder alone):** at least two
files filed under `08 Midterm Exams` / `06 EOM Exams` in `MUST-MED501` turned out to be
department teaching notes (`Rheumatology Midterm M.H.M.pdf`, `EOM - Rheumatology final
MED.pdf`), not exam papers with question-and-answer structure. The manifest's `kindGuess`
column is a folder-based first pass only; a source is not confirmed as a real
question/answer paper until someone actually opens it. Treat every `tierGuess: 1/2` row
as a candidate to check, not a settled fact.

## Semester 501

### MUST-MED501 — Rheumatology & Immunology (see full S3 triage: `MUST-MED501-triage.md`)
- Tier 1: `08 Midterm Exams/1- MED previous Questions mid & fin.pdf` (real past-paper
  recall; only 12 of 42 items have a recoverable stem — most of the "Medicine 501 final"
  section is answer-only fragments, see triage doc)
- Tier 2: `05 MCQs/MCQs - MUST MCQ 501محلول.pdf` (MUST-specific, **solved via yellow
  highlight — highlight is invisible to `pagetext.mjs` text extraction, must be read
  visually**, 26/26 questions keyed) and its unsolved twin `MCQs - MUST MCQ 501 مش
  محلول.pdf`
- Tier 3 (generic textbook banks, not yet opened): `1000_MCQs_for_DAVIDSON+.pdf`,
  `MCQs Kumar High quality.pdf`, `12 kumarMCQ"Rheumatology".pdf`, `MCQs Lange -
  Rheumatology.pdf`, `Rheumatology&Immuno MCQs.pdf`, `3- Rheumatology.pdf`, `4-
  Rheumatology Zatoona.pdf`, `2-Rheumatology Cases R.pdf`, `250+Cases+in+Clinical+
  Medicine.pdf`, `Internal medicine - MCQs - MU (2).pdf`, `rhematology-cases.pdf`,
  `Document.pdf`
- Tier 4 (reclassified from folder-guessed tier 1, actually notes):
  `Rheumatology Midterm M.H.M.pdf`, `Midterm Dr. hala (9 files merged).pdf` (306p),
  `EOM - Rheumatology final MED.pdf`, `EOM - IMED 601 Final MHM.pdf` (64p — likely a
  multi-subject internal-medicine compilation, not Rheumatology-specific; needs a
  scoping check before use)

### MUST-SUR501 — Vascular Surgery (+ Onc/Transplant/Trauma at midterm)
- Tier 1: `08 Midterm Exams/1- SUR1 previous Questions mid & fin.pdf`,
  `onc and transplantation answered.pdf` (43p), `truma question answered.pdf` (95p),
  `أسئلة سابقة trauma.pdf` (36p), `أسئلة سابقة.pdf` (48p)
- Tier 1, needs scoping before use — large, generically-named, may span multiple years/
  modules rather than being SUR501-specific: `601 MIDTerm 2019.pdf` (108p), `402 Exam
  2020 (2).pdf` (139p)
- Tier 2: `05 MCQs/MCQs - Bailey & Love answered pdf.pdf`, `MCQs - Lange MCQ
  answered.pdf`, `MCQs - MCQ SURG Matary.pdf`, `MCQs - Surgery revision answered.pdf`,
  `MCQs - Vascular mcq notes_230112_050604 (2).pdf`
- Tier 2/3, unsolved twins present (`MCQs - Lange MCQ.pdf - PDF Expert.pdf`, `MCQs -
  Surgery revision.pdf`) — prefer the "answered" twin
- `06 EOM Exams/EOM MCQs - AA Clinical Surgery - Past Exams - (VIP) draft FINAL
  UPDATE.pdf`, `EOM MCQs - Revision 1.pdf`, `EOM MCQs - Revision 2.pdf` not yet opened

### MUST-PED501 — Pediatrics (largest 501 question set by file count)
- Tier 1: `08 Midterm Exams/1- PED previous Questions mid & fin.pdf`, `dr.ismel 501
  mid.pdf`, `zakria501 mid.pdf`, `DR. Zakaria mid.pdf`, `Ped Mid-Merged.pdf`,
  `06 EOM Exams/EOM - Dr Zakareia Clinical Final @AUDatabot.pdf`, `EOM - Dr zakaria
  Theotitical Final @AUDatabot.pdf`, `EOM MCQs - 3- Dr Zakreia Questions Final
  @AUDatabot.pdf`, `EOM MCQs - Lissauer mcq final.pdf`
- Tier 2: `05 MCQs/MCQs - MCQ د عرفة متقسم.pdf`, `MCQs - PED IMP MCQs.pdf`, `MCQs -
  arafa cases.pdf`, `MCQs - Pedia Cases.pdf`, `MCQs - revision MCQ-1.pdf`
- Tier 3 textbook: `2- Self_Assessment_in_Paediatrics_McQs_and_Emqs_by_Tom_
  Lissauer...pdf`, `5- MCQs in Pediatrics Review of Nelson Textbook...pdf`, `4- Dr. Mo
  Ismail pediatrics MCQ.pdf`
- Note: several files (`ZS Ped Heme/Nephrology/Neuro/Respiratory.pdf`, `Cerebral palsy
  - feb 2023.pdf`, `Hydrocephalus 22 feb 2023.pdf`) are topic-specific and match the
  501 Midterm syllabus topic list almost line-for-line — high-value cross-reference
  even where they turn out to be notes rather than MCQs.

### MUST-GYN501 — Gynecology & Obstetrics
- Tier 1: `08 Midterm Exams/GYN 501 midterm fall 2023 -1.pdf` (dated real paper),
  `1- GYN previous Questions mid & fin.pdf`
- Tier 2 (department-named, likely solved): `05 MCQs/MCQs - SOLTAN _ Cascade GYN.pdf`,
  `MCQs - SOLTAN _ Cascade OBS.pdf`, `MCQs - Gynecology MCQ Dr.Mahmoud salem.pdf`,
  `MCQs - Obstetrics MCQs Dr.Mahmoud salem.pdf`, `MCQs - dr nadin 2022 question.pdf`,
  `MCQs - Dr.Nadine MCQs.pdf`, `MCQs - Mcq dr Khaled malek.pdf`, `06 EOM Exams/EOM MCQs
  - GYN Contraception/Cerv&Endo/Ovarian NOTES&MCQs.pdf`, `EOM MCQs - OBS Maternal
  disorders/Rh,CS,MG,3rd,induction,Epis NOTES&MCQs.pdf`
- Tier 3 textbook: `MCQs - 100 Cases in OBS and GYNA.pdf`, `MCQs - Medad Gynecology _
  Obstetrics MCQ Revision.pdf`, `MCQs - CASES OBSTETRICAL.pdf`

### MUST-ORTH501 — Orthopedic & Traumatology
- Tier 1: `05 MCQs/MCQs - 1- ORTH previous Questions.pdf`, `06 EOM Exams/EOM MCQs -
  ORTHO 601 Final MCQ Collection.pdf` (name suggests possibly multi-year, check scope),
  `EOM MCQs - MED FINAL VVV IMP (1).pdf`
- Tier 2: `MCQs - AA Written ortho IMP question.pdf`, `MCQs - Ortho Q MHM.pdf`, `MCQs -
  M.V ortho questions.pdf`, `MCQs - question.med.answered (1).pdf`, `MCQs - questions.
  answered...pdf`, `MCQs - The Olive REVISED(Shawerma) not official.pdf`

### MUST-GEN501 — Genetics (small, tractable)
- Tier 1: `05 MCQs/MCQs - 1- GEN previous Questions.pdf`
- Tier 2: `MCQs - Lissauer genetics MCQ answered.pdf`, `MCQs - Dr Zakreia Questions.pdf`,
  `MCQs - gentic new kaser.pdf` (cross-reference: named "kaser" — likely shares source
  lineage with Kasr Al-Ainy catalogues, check `docs/Kasr-Source-Imports` and
  `docs/import-ready` for genetics concept overlap before minting)

### MUST-REH501 — Physical Medicine & Rehabilitation (smallest module, 3 MCQ files)
- Tier 1: `05 MCQs/MCQs - 1- REH previous Questions.pdf`
- Tier 2: `MCQs - Collections لأغلب الاسئلة.pdf`, `MCQs - Rehabilitation.pdf`

### Electives (MUST-HECE / MUST-QMHCE / MUST-SPIE / MUST-SPNE)
Lowest priority per the marks table (1h / 25 marks each) — not surveyed file-by-file
this pass; `y5-sources.json` has the row-level listing when a lane picks these up.

## Semester 502

### MUST-MED502 — Nephrology Medicine
- Tier 1: `05 MCQs/MCQs - MED Previous Questions.pdf`, `06 EOM Exams/EOM - MED Final
  nephro.pdf`, `EOM - Nephrology Final.pdf`, `08 Midterm Exams/Zatona renal solved
  _230407_034542.pdf` (name states "solved")
- Tier 2: `06 EOM Exams/EOM MCQs - Zatoona MED Nephro.pdf`, `EOM MCQs - MCQ nephro and
  infection final.pdf`
- Tier 4 (topic notes matching the EOM syllabus's Nephrology + Infection topic list,
  numbered 1-9): `EOM - 1. GN.pdf` through `EOM - 9. Viral infections.pdf`

### MUST-SUR502-1 — General Surgery
- Tier 1: `05 MCQs/MCQs - SUR1 Previous Questions.pdf`, `08 Midterm Exams/SURG Mid
  Motaaz 502 MCQS.pdf`, `General SURG MCQs.pdf`, `06 EOM Exams/EOM - General SURG
  summary - Final.pdf`, `EOM - GSURG zatoona.pdf`
- Tier 1, needs scoping: `EOM MCQs - AA Clinical Surgery - Past Exams - (VIP) draft
  FINAL UPDATE.pdf` (same filename as a MUST-SUR501 file — likely a cross-module
  general-surgery compilation shared between the two surgery modules; check for exact
  sha256 duplication in the manifest before double-counting)
- Tier 2: `06 EOM Exams/EOM MCQs - General surgery mcqs.pdf`, `EOM MCQs - SUR
  Zatoona.pdf`, `EOM - Bailey+lange+pretest.pdf`

### MUST-SUR502-2 — Urosurgery (small)
- Tier 1: `05 MCQs/MCQs - SUR2 Previous Questions.pdf`, `06 EOM Exams/EOM MCQs - Last
  term exam.pdf`
- Tier 2: `EOM MCQs - Very IMP+.pdf`, `EOM MCQs - Urology 602 Ultra MCQ.pdf` (code "602"
  — check whether this is Year-6/graduate material mislabeled into Year 5)

### MUST-DER502 — Dermatology
- Tier 1: `05 MCQs/MCQs - DER Previous Questions.pdf`, `08 Midterm Exams/Dermatology
  MCQs midterm.pdf`, `06 EOM Exams/EOM - 1- Final Clinicl Derma.pdf`
- Tier 2: `(MCQs) Crash derma.pdf` / `MCQs - Crash Derma MCQs.pdf` (twins, check
  sha256), `MCQs - Dermatology MCQs unsolved.pdf` (explicitly unsolved — low priority
  unless a solved twin is confirmed absent), two WhatsApp screenshot images under EOM
  (image, needs visual read like the 502 plan)

### MUST-FAM502 — Family Medicine (small)
- Tier 1: `05 MCQs/MCQs - FAM Previous Questions.pdf`
- Tier 2: `MCQs - Fam medicine MCQs_copy.pdf`, `MCQs - Family medicine MCQs.pdf`, `MCQs
  - FMED mcqs.pdf`

### MUST-PAL502 — Palliative Care & Pain Management (small)
- Tier 1: `05 MCQs/MCQs - 4- PAL Previous Questions.pdf`
- Tier 2: `MCQs - 1- Palliative important MCQs.pdf`, `MCQs - 2- VIP palliative
  questions.pdf`, `MCQs - 3- TBL 1.pdf`

### MUST-RAD502 — Radiology (small, image-heavy subject — expect media requests)
- Tier 1: `05 MCQs/MCQs - RAD Previous Questions.pdf`
- Tier 2: `MCQs - RAD imaging Quizzz.pdf`, `MCQs - RAD MCQs.pdf`

### MUST-CLC502 — Clinical Longitudinal Cases (largest 502 module by file count; cases
span Medicine + Surgery, cross-module by design)
- Tier 1: `05 MCQs/MCQs - CLC Previous Questions.pdf`, `06 EOM Exams/EOM - CLC med
  final.pdf`, `EOM - RAYAN CSMED Final Zatoona.pdf`, `EOM - CS MED 601 FINAL MHM.pdf`
  (name pattern "601" — same scoping caution as MUST-SUR501's 601/402 files)
- Tier 2: `MCQs - CLC (SURG) Cases MCQs - Final.pdf`, `EOM MCQs - CLC (MED) Cases MCQs
  - Final.pdf`, `EOM MCQs - Medicine questions solved.pdf`, several `Zatoona`-named
  MED/SUR files
- 8 WhatsApp screenshot images under EOM (`IMG-20230605-WA00xx.jpg`) — needs visual
  read, not yet opened
- Tier 3 textbook: `MCQs - Davidson's cropped.pdf`, `MCQs - Davidson's Self
  assessment.pdf`, `MCQs - Copy of Medvision - CSMED 601.pdf`

### MUST-GRP502 — Graduation Research Project
No exam/MCQ folder present (4 files total, all `01 University Material` — a written
project, not a testable module in the usual sense). Not a triage target.

## Cross-cutting notes for S3+

- **The 601/402/602 filename pattern** (`601 MIDTerm 2019`, `402 Exam 2020`, `CS MED
  601 FINAL MHM`, `Urology 602 Ultra MCQ`) recurs across several modules and does not
  match any MUST Year-5 module code in the plan documents (`MED501` etc.) — these look
  like a different, older or parallel course-numbering scheme (possibly a different
  academic track or an earlier curriculum version). Every file carrying one of these
  codes needs a scope check (open it, confirm which topics/module it actually covers)
  before being treated as MUST-Y5-specific.
- **"Zatoona" and "@AUDatabot"-branded files** recur across many modules — a shared
  student-run question-bank distribution, not MUST-specific; still solvable if the
  format matches the highlighted-key pattern seen in `MUST MCQ 501محلول.pdf`, but
  origin should be noted in `field_notes` rather than presented as a MUST-authored
  source.
- **Rheumatology/clinical concepts here likely overlap Kasr Year 2-5 catalogues** — per
  standing instruction, search `docs/Kasr-Source-Imports` and `docs/import-ready` in
  addition to live state before minting (see S3 triage doc for worked examples).
