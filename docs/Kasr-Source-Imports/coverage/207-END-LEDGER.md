# 207 END — coverage ledger

| cluster | authored | held | excluded | remaining | total |
|---|---:|---:|---:|---:|---:|
| 2024-eom-histology-tranche-1 (Q1-26, `EOM - END-207 2024 ANS.pdf`) | 25 | 0 | 1 | 82 | 108 |
| 2024-eom-anatomy-tranche-2 (Q27-58, `EOM - END-207 2024 ANS.pdf`) | 32 | 0 | 0 | 50 | 108 |
| 2024-eom-physiology-tranche-3 (Q59-108, `EOM - END-207 2024 ANS.pdf`) | 49 | 1 | 0 | 0 | 108 |
| **2024 EOM paper total** (`EOM - END-207 2024 ANS.pdf`) | **106** | **1** | **1** | **0** | **108** |
| 2023-eom-mixed-slices-1+2+3 (`EOM - End of END - 207 2023 195 With Answers.pdf`) | 51 | 0 | 0 | 57 | 108 |
| 2026-eom-198-fresh-slice (`EOM - (END - 207) 198 (Solved).pdf`) | 16 | 1 | 0 | 91 | 108 |
| medhat-endo-anatomy (Q1-25, `207 Dr Medhat mcq (endo).pdf`, NON-EOM bank) | 21 | 0 | 0 | 0 fresh + 4 dupe | 25 |
| galal-repro (`207 Mcq Galal (repro).pdf`, NON-EOM bank, ~47 Qs) | 27 | 0 | 0 | dupes skipped; bank exhausted | ~47 |
| **207 END module authored (3 EOM + 2 banks)** | **221** | **2** | **1** | — | — |
| 207 END module (10 tier 1-3 papers + 3 dept books + 6 banks, `coverage/KAU-Y2-priority-sources.md`) | 221 | 2 | 1 | untriaged | — |

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

## Second paper — 2023 EOM "195" (frontier slice 3 — FINAL fresh slice)

**15 authored** this slice (Q14, Q19, Q35, Q39, Q42, Q47, Q54, Q62, Q68, Q73, Q83, Q101, Q105,
Q106, Q108) — every one a claim NOT covered by the 2024 tranche or by slices 1-2. 0 held, 0
excluded, 0 dedup drops. Sections: 2 Histology (vas-deferens stereocilia disappearance,
lactating-mammary alveolar cells), 5 Anatomy (external-anal-sphincter three parts, posterior
vaginal fornix, pudendal nerve = sacral plexus, ischiocavernosus not on perineal body, rectum
length), 8 Physiology (receptor up-regulation, cretinism-not-GH short stature, TSH does not
convert T4→T3, PTH regulated by plasma calcium, ovulation 14 days before menses, progesterone
thermogenic, estrogen grows follicles, menopausal osteoclast osteoporosis). Systems: 4 endo, 6
gyn, 4 fnd, 1 androl. Keys all read from the printed p.19 table and cross-checked against each
stem for a clean single-best answer (Q14 has two identical distractors, vasa efferentia = efferent
ductules, which reinforces the keyed answer d).

15 new concepts minted university-blind (CON-`<SYS>`- + first 14 hex of SHA-256 of the canonical
key, uppercased): 4 `CON-END-*`, 6 `CON-GYN-*`, 4 `CON-FND-*`, 1 `CON-AND-*` (collision-checked
against the whole corpus — 0 collisions, 0 in-batch duplicates; none of the 2024 or slice-1/2
concepts were reusable — distinct atomic claims; related cross-university concepts test different
claims, e.g. stereocilia *function* not disappearance, pudendal *root values* not plexus
membership). Filed under DIS-HIS-T03 / DIS-ANA-T05 / DIS-PHY-T06 with SYS-END/GYN/FND/AND
cross-nav. Eleven concepts REUSE seven existing slice-1/2 articles (endocrine-gland histology,
male reproduction, female reproduction, pelvis/perineum, female pelvic anatomy, general endocrine
physiology, pituitary-thyroid physiology, calcium-adrenal-pancreas physiology); the four female
reproductive physiology concepts (ovulation, progesterone, estrogen, menopause) are grouped into
**1 new library article** (`ART-GYN-207END-2023EOM-FEMALE-REPRODUCTIVE-PHYSIOLOGY`). Subject tags
endo/gyn/fnd/androl.

Authored in `question/207-END-2023eom-mcq.md` (from seed `seed/207-END-2023eom.json`, re-emitted;
never hand-edit the .md), `concept/207-END-2023eom-concepts.md`, `article/207-END-2023eom-articles.md`.
Gate-clean vs the module baseline (concept batch 51 items 0 errors; article batch 9 items 0 errors;
MCQ batch 51 items = the shared not-yet-imported resource baseline, one error/item, the single
`resource_ids not-yet-imported` category the 2024/slice files also carry; simulate created=111/
updated=0/rejected=0/errors=0; audit NEUTRAL — 5 article + 3 concept blank-field/needs_evidence
categories, every one spanning old and new items, 0 NEW-ONLY categories, error count scales with
item count).

**The 2023 EOM "195" paper is now FRESH-EXHAUSTED: 51/108 authored (18 slice 1 + 18 slice 2 + 15
slice 3), 0 held, 0 excluded, 57 stems remaining — and the remaining 57 are all near-duplicates of
the fully-triaged 2024 EOM tranche (sperm maturation, Sertoli, follicle stages, bladder/rectum
relations, GH/prolactin/oxytocin/ADH, Graves, aldosterone, ACTH rhythm, insulin C-peptide,
blood-testis barrier, LH surge, hCG, etc.). Do NOT mine this paper further; do not re-author Q49
(ambiguous single-best) or Q52 (2024 duplicate).**

Next 207-END cluster: move to a fresh untriaged tier-1-3 paper. The best next MCQ candidate is
`EOM (END - 207) 198 (Solved).pdf.pdf` (EOM, solved, paper "198" — a different paper from the 195
and 2024 sets, entirely untriaged; keying method not yet known — being "solved" it has an answer
key, but whether that is a printed table or a highlight is unconfirmed until triaged). If it proves
unkeyed/unsolvable, the fallbacks are the 2023 EOM 195 *unsolved* twin (`EOM - END - 207 2023
195.pdf`) or `EOM (END - 207) 198.pdf.pdf` only if a key can be recovered; the `{198}` EOY/Baqoon
family is WRITTEN/essay (no MCQs — written lane). 3 department books and 6 banks also remain
entirely untriaged.


## Third paper — 2026 EOM "198" (dupe-saturated, FINAL EOM slice)

Paper: `EOM - (END - 207) 198 (Solved).pdf` (manifest sourceId `src_4420b0c55e4310128225`,
sha256 4420b0c55e431012822509198428fa8ebb5b27a88a9517bdc2c5dbf24b80d9bc; EOM, printed exam
date **29/4/2026**, solved, 108 MCQs, 13 pages, **NO native text layer** — scanned). Registered
in `evidence/207-END-resources.md`. NOT a dup-of-existing sha (differs from the 2024 EOM
2d00db5d and the 2023 EOM "195" bb589c39).

**Key marker: a light-BLUE highlight OVAL around the correct option letter**, legible only on
render. OCR surfaced only ~10/108 circles as `@` and mis-attributed at least one (Q25: OCR `@`
on "9 week" but the blue oval is on a = 7th week), so the OCR proxy is NOT reliable here; all 108
keys were read by eye from 150-dpi page renders (pp.1-13). 0 double-marks, 0 unmarked. Section
map differs from the earlier papers: Q1-24 gross anatomy (pelvis/perineum/genital), Q25-34
embryology + pituitary/bladder anatomy, Q35-78 physiology, Q79-108 histology. All keys in
`coverage/207-END-triage-keys.txt`.

**16 authored** this pass (Q16, Q25, Q35, Q41, Q47, Q48, Q51, Q57, Q59, Q66, Q69, Q76, Q91, Q95,
Q107, Q108) — every one a claim NOT already covered by the 2024 or 2023 tranches, verified against
the 157-concept corpus canonical keys. 0 held-for-image; **1 held-bad-item (Q44 Sheehan's** —
printed key a "accompanied by progeria" is medically wrong; not authored). **Dupe-SATURATED: this
is the THIRD EOM of the module** — the large majority of stems duplicate authored 207-END claims.
Representative dupes skipped: Q17 uterus AVAF, Q20 uterine-artery-over-ureter, Q27 vesicourethral
-> upper prostatic urethra, Q28 urachal cyst, Q31 sphenoid sinus below pituitary, Q32 trigone
mesodermal, Q36 hypophyseal portal, Q40 GH metabolic, Q43 prolactin lactation, Q46 oxytocin, Q49
Graves, Q52/Q56 calcitriol calbindin intestinal Ca, Q65 insulin muscle uptake, Q72 Sertoli BTB,
Q73 spermatogenesis temp (32C), Q87 seminal-vesicle mucosa, Q88 secretory glycogen, Q90 vaginal
lactic-acid pH, Q92 pinealocyte, Q94 endocervix, Q97 pars-nervosa Herring, Q99 cytotrophoblast,
Q101/Q103 spongiocyte, Q102 resting mammary, Q105 prostatic-Ca zone (plus most Q1-24 pelvic-anatomy
and most Q35-70 endocrine-physiology stems). Fresh yield 16/108 (~15%); of the stems whose claim
was checked closely, well over 60% duplicated authored concepts.

16 new concepts minted university-blind (CON-`<SYS>`- + first 14 hex of SHA-256 of the canonical
key, uppercased): 9 `CON-END-*`, 5 `CON-GYN-*`, 2 `CON-AND-*`, 1 `CON-REN-*` (collision-checked
corpus-wide — 0 collisions, 0 in-batch duplicates; none of the 2024/2023 concepts reusable —
distinct atomic claims). Filed under DIS-ANA-T05 / DIS-PHY-T06 / DIS-HIS-T03 with SYS-END/GYN/AND/REN
cross-nav. Grouped into 3 new library articles (`ART-END-207END-198EOM-ENDOCRINE-PHYSIOLOGY`,
`ART-GYN-207END-198EOM-REPRODUCTIVE-ANATOMY-EMBRYOLOGY`, `ART-GYN-207END-198EOM-GENITAL-SYSTEM-HISTOLOGY`).
Subject tags endo/gyn/androl/renal.

Authored in `question/207-END-198eom-mcq.md` (from seed `seed/207-END-198eom.json` — never hand-edit
the emitted .md; fix the seed and re-emit), `concept/207-END-198eom-concepts.md`,
`article/207-END-198eom-articles.md`. Gate-clean vs the module baseline (concept batch 16 items 0
errors; article batch 3 items 0 errors; MCQ batch 16 = the shared not-yet-imported resource baseline,
one `resource_ids` error/item; simulate created=35/updated=0/rejected=0/errors=0; audit NEUTRAL — 23
blank-field / needs_evidence / not-yet-imported categories, an identical set to the 2023 baseline
audit, 0 NEW-ONLY categories).

**The 207 END EOM line is now EXHAUSTED — three EOMs mined (2024 EOM 106, 2023 EOM 51, 2026 EOM 16
= 173 authored, 2 held, 1 excluded).** Next 207 END cluster MUST be a NON-EOM source: the tier-1
department books (Anatomy / Histology / Physiology dept books) or the 6 MCQ banks in the manifest
(e.g. `ANATOMY MCQ [RPR].pdf`, `Anatomy MCQ by Dr.Jalal[END].pdf`, `207 Dr Medhat mcq (endo).pdf`,
`207 Mcq Galal (repro).pdf`) — all entirely untriaged. Do NOT mine any 207 END EOM paper further.


## Fourth source — Dr Medhat endocrine ANATOMY MCQ bank (FIRST non-EOM source)

Paper: `207 Dr Medhat mcq (endo).pdf` (Anatomy Other [2nd priority]/MCQs; manifest sourceId
`src_79493b8d5c510e8ca580`, sha256
79493b8d5c510e8ca580b64e862c3a5567446f7b9a501ccdb9497c95e8a4424c; examType null — a TOPIC bank,
so manifest examSittingYear=null; already in kasr-y2-sources.json, no new manifest row needed).
Scanned CamScanner, 5 pages, 25 four-option single-best MCQs on gross anatomy of the endocrine
glands (Q1-4 pituitary, Q5-9 thyroid, Q10-11 parathyroid, Q12-18 suprarenal, Q19-24 pancreas,
Q25 thyroid fascia). NOT a dup sha of the three mined EOM papers. Registered in
`evidence/207-END-resources.md`.

**Key marker: a printed/handwritten ANSWER-KEY LIST on the last page (p.5), Q1-25**, read by eye
from a 220-dpi render (p.5 OCR was too garbled to trust). All 25 keys recovered, 0 double-marks,
0 ambiguous; every key cross-checked against its stem for a clean single-best answer (see
`coverage/207-END-triage-keys.txt`). The blue left-margin ovals are TOPIC references (27=Pituitary
… 32=Gonads per the p.1 legend), NOT answer marks.

**17 authored** (Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9, Q10, Q12, Q13, Q14, Q17, Q19, Q20, Q21, Q24) —
every one a gross-anatomy claim NOT covered by the three EOM tranches (verified against the corpus
concept canonical keys). 0 held, 0 excluded. **4 dupes skipped** (Q1 pituitary-lateral-cavernous-
sinus = existing `pituitary-gland.lateral-relation.cavernous-sinus`; Q11 parathyroid-regulates-
calcium = existing PTH-calcium physiology concept; Q18 medulla-secretes-adrenaline = existing
`adrenal-medulla.chromaffin-cell.chromaffin-reaction`; Q25 thyroid-pretracheal-fascia = existing
`thyroid-gland.anterolateral-surface.pretracheal-fascia`). Dedup/skip rate 4/21 checked ≈ 19% —
well under the 60% stop threshold; this NON-EOM bank is low-dupe as expected (the EOM anatomy
sections tested pelvis/perineum/genital + a little endocrine-gland surgical anatomy, so most of
this gland-anatomy bank is fresh). **4 fresh stems held for a next slice:** Q15, Q16 (suprarenal
covering/hilum), Q22 (cancer head of pancreas), Q23 (portal vein behind neck).

17 new concepts minted university-blind (CON-END- + first 14 hex of SHA-256 of the canonical key,
uppercased): all 17 `CON-END-*` — collision-checked corpus-wide, 0 collisions, 0 in-batch
duplicates; none of the three EOM-tranche concepts reusable (those are histology/physiology/pelvic-
anatomy claims, not endocrine-gland gross anatomy). Filed under DIS-ANA-T06 (head/neck: pituitary,
thyroid, parathyroid) or DIS-ANA-T05 (abdomen: suprarenal, pancreas) with SYS-END-T03 cross-nav.
Grouped into 4 new library articles (`ART-END-207END-MEDHAT-PITUITARY-ANATOMY`,
`ART-END-207END-MEDHAT-THYROID-ANATOMY`, `ART-END-207END-MEDHAT-SUPRARENAL-ANATOMY`,
`ART-END-207END-MEDHAT-PANCREAS-ANATOMY`). Subject tag `endo` throughout (the bank is "MCQ OF
ENDOCRINE" gland anatomy). Written from standard regional-anatomy teaching (Snell / Last's / Moore
level) corroborated by the bank's own keyed stems/options; no department book read this pass.

Authored in `question/207-END-medhat-endo-anatomy-mcq.md` (from seed
`seed/207-END-medhat-endo-anatomy.json` — never hand-edit the emitted .md; fix the seed and
re-emit), `concept/207-END-medhat-endo-anatomy-concepts.md`,
`article/207-END-medhat-endo-anatomy-articles.md`. Gate-clean vs the module baseline (concept batch
17 items 0 errors; article batch 4 items 0 errors; MCQ batch 17 items = the shared not-yet-imported
resource baseline, one `resource_ids` error/item, the single category every 207-END MCQ file
carries). This bank is RICH (a clean, fully-keyed gland-anatomy set); 4 fresh stems remain for a
short next slice, after which the next 207 END cluster is a department book (Anatomy / Histology /
Physiology dept book) or another non-EOM bank (e.g. `ANATOMY MCQ [RPR].pdf`,
`Anatomy MCQ by Dr.Jalal[END].pdf`, `207 Mcq Galal (repro).pdf`).

### Medhat tail slice — the 4 held stems (Q15, Q16, Q22, Q23)

**4/4 authored, 0 held, 0 excluded.** All four had clean single-best keys read from the printed
p.5 list (Q15=d, Q16=a, Q22=b, Q23=a) and verified against their stems (stems/options pulled from
the OCR of pp.3-4). Q15 = hilum of the left suprarenal gland directed downward; Q16 = left
suprarenal covered anteriorly by pancreas + stomach; Q22 = carcinoma of the pancreatic head does
NOT obstruct the aorta (which-is-WRONG stem); Q23 = portal vein formed behind the neck of the
pancreas. None duplicate an authored 207-END concept (Q23's portal-vein claim was only a distractor
in the already-authored Q21; Q15/Q16 test distinct left-gland claims). 4 new concepts minted
university-blind (all `CON-END-*`: 069D50B97BB67C, A0337CD475EF82, 3FA98F77495FD1, 932FA58748A54F),
collision-checked corpus-wide — 0 collisions, 0 in-batch duplicates. All 4 REUSE existing Medhat
articles (2 SUPRARENAL, 2 PANCREAS) — no new article. Subject tag `endo`. Seed re-emitted; the
Medhat bank is now **21 authored / 25** (4 dupes skipped: Q1, Q11, Q18, Q25). Gate-clean vs the
module baseline (concept batch 21 items 0 errors; MCQ batch 21 items = the single not-yet-imported
`resource_ids` category, one/item). **The Dr Medhat endocrine-anatomy bank is now fresh-exhausted.**

## Fifth source — Dr Galal reproductive/pelvis ANATOMY MCQ bank (SECOND non-EOM source)

Paper: `207 Mcq Galal (repro).pdf` (Anatomy Other [2nd priority]/MCQs; manifest sourceId
`src_3c7b49ee6f8407106c2a`, sha256
3c7b49ee6f8407106c2a478abeedeabd3194af6c8aad8cfb42f32bb8bc75dff1; examType null — a TOPIC
bank, so examSittingYear=null; already in kasr-y2-sources.json, no new manifest row). Scanned
(CamScanner), 8 pages, no text layer (OCR'd), ~47 four/five-option single-best MCQs on female
pelvis/perineum/breast/genital-development gross anatomy, organised into topic sections. NOT a
dup sha of any mined 207 END source. Registered in `evidence/207-END-resources.md`.

**Key marker: a hand-drawn CIRCLE around the correct OPTION LETTER.** Read from the OCR (each
circled letter surfaces as a stray glyph) and render-verified on pp.4 and 6 at 150 dpi — the
circled letters matched the OCR reading exactly on both pages, 0 disagreements. 38/47 keys
recovered with high confidence into `coverage/207-END-triage-keys.txt`; 9 stems (Q2, Q3, Q6,
Q11, Q13, Q15, Q26, Q38, Q43) are HELD as unread (garbled OCR / cut option text) pending a
render. Every authored key was also cross-checked against its stem for a clean single-best answer.

**15 authored** (Q5, Q7, Q12, Q14, Q16, Q18, Q22, Q28, Q34, Q35, Q36, Q37, Q40, Q42, Q44) — every
one a claim NOT already covered by the authored 207-END corpus (194), verified against the corpus
canonical keys. 0 held-for-image, 0 excluded. The EOM anatomy tranches already covered much
pelvis/perineum, so ~9 near-duplicate stems were skipped: Q1 (levator-ani vaginal sphincter =
`levator-ani.anterior-fibres.vaginal-sphincter`), Q4 (pelvic-diaphragm-separates-pelvis-from-
perineum), Q9 (mesosalpinx), Q10 (uterine-artery/ureter = `uterine-artery.course.crosses-above-
ureter`), Q31/Q32 (ischiorectal lateral wall / pudendal Alcock canal), Q47 (paramesonephric
excludes-lower-vagina), Q20/Q23 (internal-iliac branches family, already `internal-iliac-artery.
branches.excludes-inferior-epigastric`). Effective dedupe rate ~9/24 checked (~37%), well under
the 60% stop threshold — this bank is RICH and lower-dupe than a third EOM would be.

15 new concepts minted university-blind (CON-`<SYS>`- + first 14 hex of SHA-256 of the canonical
key, uppercased): 9 `CON-GYN-*`, 3 `CON-FND-*`, 1 `CON-AND-*`, plus 2 embryology `CON-GYN-*` —
collision-checked corpus-wide (0 collisions, 0 in-batch duplicates; none of the EOM/Medhat concepts
reusable — distinct atomic claims). Filed under DIS-ANA-T05 (pelvis/perineum), DIS-ANA-T04 (thorax:
breast) or DIS-EMB-T03 (system development) with SYS-GYN/FND/AND cross-nav. Grouped into 4 new
library articles (`ART-GYN-207END-GALAL-FEMALE-PELVIC-VISCERA`, `ART-FND-207END-GALAL-PELVIS-
PERINEUM`, `ART-GYN-207END-GALAL-BREAST-ANATOMY`, `ART-GYN-207END-GALAL-GENITAL-DEVELOPMENT`).
Subject tags gyn/fnd/androl. Written from standard regional-anatomy/embryology teaching (Snell /
Last's / Moore / Langman level) corroborated by this bank's own keyed stems and options (keys
render-verified pp.4/6); no department book read this pass.

Authored in `question/207-END-galal-repro-mcq.md` (from seed `seed/207-END-galal-repro.json` —
never hand-edit the emitted .md; fix the seed and re-emit), `concept/207-END-galal-repro-concepts.md`,
`article/207-END-galal-repro-articles.md`. Gate-clean vs the module baseline (concept batch 15 items
0 errors; article batch 4 items 0 errors; MCQ batch 15 items = the shared not-yet-imported
`resource_ids` category, one/item — the single category every 207-END MCQ file carries).

**This bank is RICH** (a large, cleanly-circled repro/pelvis set) and still holds ~23 keyed but
un-authored stems for a next slice (many are dupes; fresh remainders include Q19 scrotum↔labia,
Q27 perineum boundary, Q29 Bartholin glands, Q30 male deep-pouch contents, Q33 ischiocavernosus,
Q42-family embryology Q45/Q46) plus the 9 held unread stems (Q2/Q3/Q6/Q11/Q13/Q15/Q26/Q38/Q43,
which need a render to recover the key/option text). Next 207 END cluster: continue this Galal
repro bank, or move to another non-EOM bank (`207 mcq Dr Galal (endo).pdf`, `Anatomy MCQ by
Dr.Jalal[END].pdf`, `ANATOMY MCQ [RPR].pdf`) or a department book (Anatomy/Histology/Physiology).

### Galal repro bank — completion pass (2026-09-06): bank EXHAUSTED

Rendered pp.1-8 (marked garbled, 220-230 dpi) and recovered **ALL 9 held keys — 0 remain
unreadable**: Q2.a, Q3.a, Q6.c, Q11.d, Q13.a, Q15.a, Q26.a, Q38.c, Q43.d (Q31 re-confirmed a
single circle on c, no double-mark). Authored **12 fresh MCQs** in two pushed slices:
slice A = Q2/Q3/Q6/Q11/Q15/Q19/Q25 (`9933a74c`), slice B = Q26/Q27/Q30/Q38/Q45 (`3e0e73d0`).
12 concepts minted university-blind — 7 `CON-FND-*`, 4 `CON-GYN-*`, 1 `CON-REN-*` — collision-
checked corpus-wide (0 collisions, 0 in-batch dupes), added to the four existing galal articles
(no new article). Subject tags fnd/gyn/renal.

**Dedup this pass:** of ~20 unauthored keyed candidates, 12 authored (~40% dedup rate). SKIPPED as
dupes of already-authored concepts: Q29 & Q33 (both named in `superficial-perineal-pouch.contents`),
Q46 (`uterine-duct-anomaly.double-uterus`), Q43 (`paramesonephric-duct.derivatives`, Q42/Q47),
Q13 (`uterine-artery.course.crosses-above-ureter`, Q10), and the near-dups Q8/Q17/Q20/Q21/Q24/Q41,
plus the 8 first-pass skips (Q1/Q4/Q9/Q10/Q23/Q31/Q32/Q47). Bank now **27 authored / 0 held**;
fresh keyed stems EXHAUSTED. Gate-clean each slice: concept 22/0->27/0, article 4/0, mcq 22/0->27/0
(with `--with` concept+article+resource siblings).

**Next 207 END cluster:** open `207 mcq Dr Galal (endo).pdf` (next non-EOM bank in priority order;
register a manifest row only if not already listed), recover keys (same circle-around-letter
marker), dedup vs the 221-item corpus, author push-per-slice.
