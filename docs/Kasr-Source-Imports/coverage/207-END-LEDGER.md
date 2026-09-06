# 207 END — coverage ledger

| cluster | authored | held | excluded | remaining | total |
|---|---:|---:|---:|---:|---:|
| 2024-eom-histology-tranche-1 (Q1-26, `EOM - END-207 2024 ANS.pdf`) | 25 | 0 | 1 | 82 | 108 |
| 2024-eom-anatomy-tranche-2 (Q27-58, `EOM - END-207 2024 ANS.pdf`) | 32 | 0 | 0 | 50 | 108 |
| 2024-eom-physiology-tranche-3 (Q59-108, `EOM - END-207 2024 ANS.pdf`) | 49 | 1 | 0 | 0 | 108 |
| **2024 EOM paper total** (`EOM - END-207 2024 ANS.pdf`) | **106** | **1** | **1** | **0** | **108** |
| 2023-eom-mixed-slices-1+2 (`EOM - End of END - 207 2023 195 With Answers.pdf`) | 36 | 0 | 0 | 72 | 108 |
| **207 END module authored (2 papers)** | **142** | **1** | **1** | — | — |
| 207 END module (10 tier 1-3 papers + 3 dept books + 6 banks, `coverage/KAU-Y2-priority-sources.md`) | 142 | 1 | 1 | untriaged | — |

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

## Second paper — 2023 EOM "195" (frontier slice 1)

Paper: `EOM - End of END - 207 2023 195 With Answers.pdf` (manifest sourceId
`src_bb589c39762100585461`, sha256
bb589c397621005854617e35a4007a8a6333d18871c18607d1fb19a6b9a9a202; EOM, **2023** — a
different year from the mined 2024 EOM, so not EOM-vs-EOM same-year saturation; solved, 108
MCQs, 19 pages, **native text layer**). Registered in `evidence/207-END-resources.md`.

**Key marker: a PRINTED answer-key table on the last page (p.19), not a highlight** — native
text, so no OCR/render needed. All 108 keys recovered into `coverage/207-END-triage-keys.txt`;
0 double-marks; spot-validated on Q1/Q92/Q97/Q102/Q104/Q108. Section map matches the 2024
paper: Q1-26 Histology, Q27-58 Anatomy, Q59-108 Physiology.

**18 authored** this slice (Q3, Q7, Q8, Q15, Q20, Q23, Q28, Q33, Q36, Q38, Q40, Q57, Q61,
Q63, Q84, Q85, Q96, Q98) — every one a claim NOT already covered by the 2024 tranche. 0 held,
0 excluded. ~22 stems were skipped as near-duplicates of already-authored 2024 items (e.g.
Q11 sperm maturation=epididymis, Q13 Sertoli, Q26 secondary follicle, Q29 bladder-base
posterior relation, Q31 perineal-membrane piercing, Q34 internal-iliac branch, Q43 rectum
posterior relation, Q65 somatomedin C, Q69 prolactin, Q70 oxytocin, Q71 ADH, Q75 Graves,
Q78 hormone-not-from-pituitary, Q80 pyrophosphate, Q86 Ca-organs-EXCEPT, Q88 hyperaldosteronism-
EXCEPT, Q91 ACTH-highest, Q93 insulin-C-peptide, Q95 insulin-EXCEPT, Q97 blood-testis barrier,
Q104 LH surge, Q107 hCG). Dup rate ~20% — well under the 60% stop threshold; the paper still
holds many un-mined fresh stems (90 remaining) for a next slice.

18 new concepts minted university-blind (CON-`<SYS>`- + first 14 hex of SHA-256 of the canonical
key, uppercased): 11 `CON-END-*`, 2 `CON-AND-*`, 4 `CON-GYN-*`, 1 `CON-OBS-*`, 2 `CON-FND-*`
(collision-checked against the corpus — 0 collisions, 0 in-batch duplicates; none of the 2024
concepts were reusable — distinct atomic claims). Filed under DIS-HIS-T03 / DIS-ANA-T05 /
DIS-ANA-T06 / DIS-PHY-T06 with SYS-END/AND/GYN/OBS/FND cross-nav. Grouped into 6 library
articles (endocrine-gland histology, male reproduction, female reproductive/placental histology,
pelvis/perineum anatomy, female pelvic anatomy, general endocrine physiology). Subject tags
endo/androl/gyn/obs/fnd.

Authored in `question/207-END-2023eom-mcq.md` (from seed `seed/207-END-2023eom.json` — never
hand-edit the emitted .md, fix the seed and re-emit), `concept/207-END-2023eom-concepts.md`,
`article/207-END-2023eom-articles.md`. Gate-clean vs the module baseline (concept batch 0
errors; article batch 0 errors; MCQ batch = the shared not-yet-imported resource baseline, one
error/item, same single category the 2024 file carries; simulate created=42/rejected=0/errors=0;
audit NEUTRAL — the same five `article.articleData.*` needs_evidence categories, no NEW-ONLY
category).

**Non-MCQ finding:** `EOY - SOLVED EOY 207-END {198}.pdf` (src_4e3adb975001d4704555, EOY 2026
solved) was surveyed and is a **WRITTEN/essay exam** (Anatomy tables, Physiology and Histology
short-answer) — it contains **no MCQs** and is not an MCQ source; skip it for MCQ authoring
(belongs to the written lane). `EOY (END-207) {198 2nd}` and the `{198}` family share this
written format.

## Second paper — 2023 EOM "195" (frontier slice 2)

**18 authored** this slice (Q1, Q12, Q16, Q22, Q27, Q37, Q41, Q45, Q51, Q59, Q66, Q72, Q76,
Q79, Q82, Q90, Q94, Q99) — every one a claim NOT already covered by the 2024 tranche or by
slice 1. 0 held, 0 excluded. Sections: 4 Histology (pinealocyte, prostatic-carcinoma zone,
seminal-vesicle mucosa, secretory-phase glycogen), 5 Anatomy (deep-perineal-pouch content,
pituitary inferior relation, broad-ligament false, pubovesical ligament, prostatic urethra),
9 Physiology (cytokine signalling, GH long-loop feedback, thyroid-synthesis order, hypothyroid
myxoedema, calcium distribution, PTH phosphaturia, cortisol gluconeogenesis, insulin-dependent
muscle uptake, spermatogenesis temperature). Systems: 10 endo, 4 androl, 2 gyn, 2 fnd. Keys
all read from the printed p.19 table; every key verified against its stem for a clean
single-best answer.

**2 dedup drops this slice (both from the enumerated candidate list, confirmed against the 2024
tranche concepts, not authored):** Q52 (uterine anteverted/anteflexed position) is a hard
duplicate of the 2024 concept CON-GYN-6303FF3D713E0F (same canonical key
`uterus.normal-position.anteverted-anteflexed`); Q81 (PTH raises calcium by intestinal
absorption) overlaps the 2024 concept "Calcitriol increases intestinal calcium absorption" and
was replaced by the cleaner Q79 (calcium distribution) + Q82 (PTH phosphaturia). Q49 (prostate
relations) was swapped out for Q51 (prostatic urethra) because Q49 had two defensible-true
options (base↔bladder-neck and apex↔perineal-muscles); its printed key b is fine but the item
is not a clean single-best, so it was set aside rather than authored. Effective dedupe/quality
drop rate this slice ~3/21 selected (~14%), well under the 60% stop threshold.

18 new concepts minted university-blind (CON-`<SYS>`- + first 14 hex of SHA-256 of the canonical
key, uppercased): 10 `CON-END-*`, 4 `CON-AND-*`, 2 `CON-GYN-*`, 2 `CON-FND-*` (collision-checked
against the whole corpus — 0 collisions, 0 in-batch duplicates; none of the 2024 or slice-1
concepts were reusable — distinct atomic claims). Filed under DIS-HIS-T03 / DIS-ANA-T05 /
DIS-ANA-T06 / DIS-PHY-T06 with SYS-END/AND/GYN/FND cross-nav. Twelve concepts REUSE the six
slice-1 articles (endocrine-gland histology, male reproduction, female reproduction, pelvis/
perineum, female pelvic anatomy, general endocrine physiology); the six pituitary-thyroid and
calcium/adrenal/pancreas physiology concepts are grouped into **2 new library articles**
(`ART-END-207END-2023EOM-PITUITARY-THYROID-PHYSIOLOGY`,
`ART-END-207END-2023EOM-CALCIUM-ADRENAL-PANCREAS-PHYSIOLOGY`). Subject tags endo/androl/gyn/fnd.

Authored in `question/207-END-2023eom-mcq.md` (from seed `seed/207-END-2023eom.json`, re-emitted;
never hand-edit the .md), `concept/207-END-2023eom-concepts.md`, `article/207-END-2023eom-articles.md`.
Committed in two slices (batch A histology+anatomy Q1-51, then batch B physiology Q59-99) so a
mid-lane failure loses nothing. Gate-clean vs the module baseline (concept batch 0 errors; article
batch 0 errors; MCQ batch = the shared not-yet-imported resource baseline, one error/item, same
single category the 2024 file carries; simulate created=80/updated=0/rejected=0/errors=0; audit
NEUTRAL — 23 needs_evidence / not-yet-imported / blank-field categories, every one spanning all
36 concepts and all 8 articles, no NEW-ONLY category, counts scale with item count).

The 2023 EOM "195" paper now has 36/108 authored (18 slice 1 + 18 slice 2), 72 stems remaining
(many are duplicates of the 2024 tranche). Fresh, still-unmined single-best stems for a next
slice include Q14 (stereocilia disappearance), Q19 (lactating mammary gland), Q35 (external anal
sphincter parts), Q39 (posterior fornix), Q42 (sacral plexus branch), Q47 (perineal-body muscle),
Q54 (rectum length), Q62 (receptor up-regulation), Q68 (GH short-stature causes), Q73 (TSH
functions), Q83 (PTH regulated by plasma calcium), Q101 (ovulation timing), Q105 (progesterone
effect), Q106 (estrogen effect), Q108 (menopause) — about 15 clean fresh stems left on this paper.

Next 207-END cluster: continue the 2023 EOM "195" paper with a third ~15-item non-duplicate
slice drawn from the fresh single-best stems listed just above (Q14, Q19, Q35, Q39, Q42, Q47,
Q54, Q62, Q68, Q73, Q83, Q101, Q105, Q106, Q108 — all keyed, all non-dup of the 2024 tranche and
of slices 1-2), then move to a fresh non-EOM keyed source or the 2023 EOM 195 unsolved twin only
if a key can be recovered. (Q49 prostate relations and Q52 uterine position were dropped this
slice as an ambiguous single-best and a 2024 duplicate respectively; do not re-author them.)
