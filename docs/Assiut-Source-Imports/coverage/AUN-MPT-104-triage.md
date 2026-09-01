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

## Checkpoint table

| Module | Questions triaged | Keys recovered | Distinct concepts tested | Live-hit | Pending-hit | New |
|---|--:|--:|--:|--:|--:|--:|
| AUN-MPT-104 | 90 | 31 | 30 | 1 | 4 | 25 |

- **Questions triaged (90):** every MCQ printed in the paper (Q1-Q90), read via
  OCR text, pp.1-11.
- **Keys recovered (31):** questions where the printed circled/bolded answer
  marker survived OCR legibly enough to read a single letter with confidence.
  Q1, Q2, Q5, Q7, Q8, Q12-14, Q17-21, Q23, Q25-28, Q30-31, Q33, Q35-36, Q39,
  Q41-43, Q49-55, Q57-64, Q66-77, Q79-80, Q83, Q86 (59 questions) are triaged
  but **not** keyed this pass -- OCR text is readable enough to identify the
  tested idea but the circled-answer marker did not survive cleanly. Q47 was
  read and a marker is present, but it points at "Amniotic fluid embolism" for
  a stem describing a long-bone fracture (classically fat embolism) --
  flagged as a hold (possible OCR/print conflict), not resolved either way.
- **Distinct concepts tested (30):** after collapsing near-duplicates (Q6 and
  Q11 both test "chemical antagonism," counted once).
- **Live / pending / new:** via `find-existing.mjs` against live state, every
  `docs/*-Source-Imports` root and `docs/import-ready` (00-START-HERE.md §4).

## Per-question triage (recovered keys only)

| Q | Tested idea | Printed key | find-existing result |
|--:|---|:-:|---|
| 3 | Cimetidine does not reduce oral-contraceptive effectiveness (CYP inhibitor, not inducer) | C | new |
| 4 | First-pass/absorption step limits topical-corticosteroid plasma concentration | A | new |
| 6 | Protamine sulfate reverses heparin -- chemical antagonism | B | new |
| 9 | Steroid/thyroid intracellular receptors chaperoned by hsp90 | A | new |
| 10 | Irreversible antagonist -- Emax reduced, EC50 unchanged at low dose, no rescue at high agonist dose | B | **pending** -- `docs/import-ready/concept/108-INT-concepts-pharmacology.md`, `docs/Kasr-Source-Imports/concept/108-INT-concepts-pharmacology.md` ("An irreversible antagonist binds covalently...") |
| 11 | Sugammadex -- chemical antagonism (binds drug directly, not receptor) | A | new (same tested idea as Q6, collapsed) |
| 15 | Bethanechol stimulates bowel motility post-op | B | new |
| 16 | Tiotropium -- parasympatholytic bronchodilator for asthma | A | new |
| 22 | Carvedilol -- nonselective beta-blocker with antioxidant/alpha-blocking activity in heart failure | A | new |
| 24 | Ondansetron for chemotherapy-induced nausea (cisplatin) | B | new |
| 29 | Aztreonam -- safe in penicillin anaphylaxis (no cross-reactivity) | A | new |
| 32 | Ampicillin -- safest antibiotic class in pregnancy among the options | D | new |
| 34 | Paclitaxel -- microtubule-stabilizing cellular target | B | new |
| 37 | Aspirin -- most effective thromboxane A2 inhibitor among the options | A | new |
| 38 | Metronidazole + diloxanide furoate for mild intestinal amebiasis | D | new |
| 40 | Fluoroquinolones inhibit bacterial DNA gyrase | C | **pending** -- `docs/import-ready/concept/ASU-INF-microbiology-concepts.md`, `docs/import-ready/concept/AU-MED-102-biochem-molecular-concepts.md` (adjacent DNA-gyrase concepts, not an exact match -- worth a second look before minting) |
| 44 | Mefloquine prophylaxis can still fail against P. vivax | B | new |
| 45 | Valacyclovir for genital herpes simplex | B | new |
| 46 | 5-Fluorouracil inhibits thymidylate synthase | D | **live** -- `CON-REN-E6070C296322CB` / `CLM-REN-E6070C296322CB` ("5-Fluorouracil is converted to 5-FdUMP, which inhibits thymidylate synthase") |
| 47 | Fat vs. amniotic-fluid embolism after long-bone trauma | *hold -- printed marker conflicts with expected answer, not resolved* | not searched (hold) |
| 48 | Asbestos exposure and lung cancer risk (shipyard worker) | B | new |
| 56 | Keloid formation after wound healing | A | **pending** -- `docs/import-ready/concept/101-ISK-mcq-concepts.md`, `docs/import-ready/glossary/101-ISK-glossary.md` |
| 65 | Brain atrophy in Alzheimer disease as chronic-injury response | C | new |
| 78 | Renal agenesis (unilateral, incidental) | A | new |
| 81 | Vasodilatation is the arteriolar response in acute inflammation | B | new |
| 82 | Lobar pneumonia -- acute suppurative inflammation | A | new |
| 84 | Active hyperemia (blushing) | A | **pending** -- `docs/Kasr-Source-Imports/glossary/104-CPS-glossary.md` ("Reactive hyperemia" -- near-match term, confirm before treating as the same concept) |
| 85 | Moist gangrene -- no clear line of demarcation | D | new |
| 87 | Tumor stage is the strongest prognostic factor among the options | D | new |
| 88 | p53 germline mutation -- multi-cancer family syndrome (Li-Fraumeni) | C | new |
| 89 | Bilharzial granuloma -- Type IV hypersensitivity | D | new |
| 90 | Immunohistochemistry -- enzyme-linked antibody tissue staining | B | new |

## Placement for new (all pharmacology/pathology, subject `pharm` or `mul`/system-specific per 00-START-HERE.md §3)

Not assigned yet -- placement is named at mint time, after TRIAGE APPROVED, following
00-START-HERE.md's rule that `pharm` concepts take an explicit body-system `CON-`
prefix (`FND` general, or the organ system the drug targets) rather than a subject
of their own; the pathology items (Q47, Q48, Q56, Q65, Q78, Q81, Q82, Q84, Q85, Q87,
Q88, Q89, Q90) place by mechanism/organ per the same section's placement rules.

## Needs Omar / open items

- Q47's printed key conflicts with the expected clinical answer -- needs a rendered
  look at the actual page image before it is keyed either way (hold, not resolved
  here).
- 59 of 90 questions are triaged (topic identified) but not keyed -- pp.8-11's OCR
  quality needs a targeted `render` pass on the ambiguous circled-answer glyphs
  before those keys can be trusted, or the page should be re-sourced from a cleaner
  scan if Omar has one.
- `All Quizzes MPT 2022.pdf` (212p, fully text-native, 0 garbled), `MCQ pharma
  Alex.pdf` (30p, 0 garbled) and `MCQ مذكرة سنة أولى باثولوجي.pdf` (79p, 0 garbled,
  Arabic-titled pathology MCQ bank) are queued as the next MPT triage sources --
  none of these needed OCR, so they are cheaper to triage than this final exam was.
