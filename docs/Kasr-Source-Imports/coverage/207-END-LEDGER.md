# 207 END — coverage ledger

| cluster | authored | held | excluded | remaining | total |
|---|---:|---:|---:|---:|---:|
| 2024-eom-histology-tranche-1 (Q1-26, `EOM - END-207 2024 ANS.pdf`) | 25 | 0 | 1 | 82 | 108 |
| 2024-eom-anatomy-tranche-2 (Q27-58, `EOM - END-207 2024 ANS.pdf`) | 32 | 0 | 0 | 50 | 108 |
| 2024-eom-physiology-tranche-3 (Q59-108, `EOM - END-207 2024 ANS.pdf`) | 49 | 1 | 0 | 0 | 108 |
| **2024 EOM paper total** (`EOM - END-207 2024 ANS.pdf`) | **106** | **1** | **1** | **0** | **108** |
| 207 END module (10 tier 1-3 papers + 3 dept books + 6 banks, `coverage/KAU-Y2-priority-sources.md`) | 106 | 1 | 1 | untriaged | — |

## Module opened

This is the first tranche of the 207 END module (Kasr Al Ainy Year 2, "Endocrine &
Reproductive Systems"). Best solved tier-2 paper picked from the 207 END section of
`coverage/KAU-Y2-priority-sources.md`: `EOM - END-207 2024 ANS.pdf` (manifest sourceId
`src_2d00db5decd243a861ea`, sha256 2d00db5decd243a861ea82701e8208db547c5ed5a3b841fced9128792b189832;
EOM, printed exam date 16/4/2024, solved, 108 MCQs, 11 pages, 54 marks). **Sitting year
2024** (calendar label on the file; manifest `examSittingYear`=2024). Field contract mirrors
the completed 206 DIG module.

## Answer-key method

No native text layer (scanned PDF) — OCR'd at default settings via
`scripts/content/pagetext.mjs ocr --force`. The correct answer is a **solid red/orange
circle drawn over the option letter**; the OCR transcribes the circled letter as `@`.
Confirmed genuine by rendering pp.1, 2 and 3 (the whole Q1-26 range of this tranche) at
170 dpi and checking every circled option against the OCR `@` markers by eye — **all three
pages matched exactly, 0 disagreements**, with one genuine double-mark caught (Q10, below).
Recovered keys (26/26 read; 25 clean, 1 ambiguous): see `coverage/207-END-triage-keys.txt`.

## Section map of the paper

Q1-26 **Histology** (endocrine glands Q1-8, male reproductive Q9-16, female reproductive
Q17-26); **Anatomy** begins at Q27 (p.4). This tranche authored the Histology section only.

## Tranche 1 — Histology (Q1-26)

25/26 questions authored (Q1-9, Q11-26), **1 excluded**: **Q10** is a genuine double-mark —
two options are circled in red on the paper (c. Tubuli recti AND d. Ejaculatory ducts; OCR
reads "@ Tubuli recti @ Ejaculatory ducts"). The single-best-answer key is therefore
ambiguous, so per protocol Q10 is excluded rather than guessed. 0 held.

25 new concepts minted university-blind via `mint-concept-id.mjs` (8 `CON-END-*` endocrine-
gland, 7 `CON-AND-*` male reproductive, 10 `CON-GYN-*` female reproductive), checked against
15618 live/import-ready IDs — no collisions, no duplicates in-batch. Filed under
`DIS-HIS-T03` (Organ histology) with `SYS-END` / `SYS-AND` / `SYS-GYN` (and `SYS-OBS-T01`
for the placenta concept) system cross-nav. Grouped into three library articles by system.
No Histology department book PDF was located/read this pass; concepts and articles are
written from standard teaching (Junqueira/di Fiore level) corroborated by this exam paper's
own keyed stems and options (render-verified against the OCR `@` reading).

Authored in `question/207-END-2024eom-histology-mcq.md`,
`concept/207-END-histology-concepts.md`, `article/207-END-histology-articles.md`. Source
registered in `evidence/207-END-resources.md`. Gate-clean (batch 0 errors; simulate
created=25/rejected=0; audit neutral vs the module baseline — no new error category).

## Tranche 2 — Anatomy (Q27-58)

32/32 questions authored (Q27-58), **0 excluded, 0 held** — every Q27-58 red-circle key was
render-verified against 170 dpi renders of pp.4-6 (all matched the OCR `@` reading exactly, no
double-marks; see `coverage/207-END-triage-keys.txt`). The Anatomy section runs Q27-58 (pelvis,
perineum, endocrine-gland surgical anatomy, genital-duct embryology); Physiology begins at Q59.

32 new concepts minted university-blind (CON-`<SYS>`- + first 14 hex of SHA-256 of the canonical
key, uppercased): 12 `CON-GYN-*`, 6 `CON-REN-*`, 5 `CON-GIT-*`, 3 `CON-END-*`, 6 `CON-FND-*` (+
1 `CON-AND-*` prostate) — collision-checked against the corpus concept IDs, no collisions, no
in-batch duplicates. None of the tranche-1 histology concepts were reusable (histology atomic
claims vs gross/regional anatomy). Filed under `DIS-ANA-T05` (Abdomen and pelvis), with
`DIS-ANA-T06` (Head and neck) for the thyroid/pituitary/parathyroid, and `SYS-*` system
cross-nav. Grouped into five library articles by region/system (female reproductive, lower
urinary/prostate, anorectal, endocrine-gland, perineum/pelvic-wall). No Anatomy department book
PDF was located/read this pass; concepts and articles are written from standard regional-anatomy
teaching (Snell / Last's / Moore level) corroborated by this exam paper's own keyed stems and
options (render-verified). Subject tags by body system (endo/gyn/androl/renal/gi/fnd — all exist
programme-wide); pure pelvic-wall/perineum items tagged `fnd`.

Authored in `question/207-END-2024eom-anatomy-mcq.md`,
`concept/207-END-anatomy-concepts.md`, `article/207-END-anatomy-articles.md`. Gate-clean (batch
0 errors on all three; simulate created=69/rejected=0/errors=0; audit neutral vs the tranche-1
histology baseline — same categories, no new error category, counts scale with item count).

## Tranche 3 — Physiology (Q59-108)

49/50 questions authored (Q59-102, Q104-108), **1 held (Q103), 0 excluded** — every Q59-108
red-circle key was render-verified against 170 dpi renders of pp.7-11 (all 50 matched the OCR
`@` reading exactly, no double-marks; see `coverage/207-END-triage-keys.txt`). The Physiology
section runs Q59-108 and is the last section of the paper (Q108 ends it): hypothalamic-pituitary
control & GH, posterior pituitary/prolactin/water balance, thyroid, calcium/phosphate/bone,
adrenal cortex & volume, pancreatic islets/incretins, male reproductive, and female reproductive/
pregnancy/labor. **Q103 held** — image-dependent item (four progesterone-secretion curves A-D are
printed; the student must pick the normal pattern, keyed to Curve D, verified): the figure is
essential and the source page image is not redistributable, so it is held pending a redrawn/
licensed figure rather than authored without it (correct answer d recorded in the triage-keys).

49 new concepts minted university-blind (CON-`<SYS>`- + first 14 hex of SHA-256 of the canonical
key, uppercased): 34 `CON-END-*`, 2 `CON-REN-*` (ADH-resistant DI, ECF-volume response), 5
`CON-AND-*` (Sertoli/sperm/testosterone), 5 `CON-GYN-*` (menarche, puberty, LH surge, estrogen,
antepartum lactation) and 3 `CON-OBS-*` (hCG, labor, feto-maternal tolerance). Collision-checked
against 16373 live/import-ready/Kasr concept IDs — no collisions, no in-batch duplicates. None of
the histology/anatomy concepts were reusable (physiology tests distinct atomic claims). Filed
under `DIS-PHY-T06` (Endocrine and reproductive physiology) with `SYS-END/REN/AND/GYN/OBS-*`
system cross-nav. Grouped into eight library articles by endocrine block. Subject tags by body
system (endo/renal/androl/gyn/obs — all exist programme-wide). No department book PDF was located/
read this pass; concepts and articles are written from standard physiology teaching (Guyton &
Hall / Ganong level) corroborated by this exam paper's own keyed stems and options
(render-verified). Committed in two slices (Q59-83, then Q84-108) so a mid-lane failure loses
nothing.

Authored in `question/207-END-2024eom-physiology-mcq.md`,
`concept/207-END-physiology-concepts.md`, `article/207-END-physiology-articles.md`. Gate-clean
(concept/article batch 0 errors; MCQ 49/49 the shared not-yet-imported resource baseline;
simulate created=106/rejected=0/errors=0; audit neutral vs the anatomy baseline — same five
`article.articleData.*` needs_evidence categories, no new error category, counts scale ~4.30 vs
4.33 errors/item).

## Paper complete

**The EOM - END-207 2024 ANS.pdf 108-MCQ paper is now fully triaged: 106 authored, 1 held (Q103,
image), 1 excluded (Q10, double-mark), 0 remaining.** 9 more tier 1-3 papers, 3 department books
and 6 banks for this module remain entirely untriaged.
