# URS 303 — MCQ triage (exam signal)

Lane `HU-URS-303`, triage-only. This is the exam-signal read of
`scripts/helwan/extract/HU-URS-303/mcq-bank.json` (436 items parsed from the
module's three question PDFs — see `URS-303-coverage.md` for how each source
was read). **No concept, article or question is authored from this file.**
It exists so a future content lane knows, before it writes a single word,
which chapters the module actually examines.

## Read this table with the corpus gap in mind

There is no department book, lecture set or dedicated teaching source for
`HU-URS-303` anywhere in the corpus (see the orchestrator report). Every
number below comes from student-authored recall/crib material, not from an
official paper with a printed or highlighted key. Treat this as a **directional**
signal — which chapters students remembered being tested on — not a verified
blueprint.

## Per-source counts

| Source | Raw items | Distinct after dedup | In-scope (urinary/reproductive) | Out-of-scope (other systems) | Items with a recalled answer |
|---|--:|--:|--:|--:|--:|
| `MCQs - URS 303 GUR questions.pdf` | 99 bullets | 100 (one bullet wraps a sub-header) | 71 | 29 | 78 |
| `MCQs - URS 303 phase questions.pdf` | 100 bullets | 100 | 8 | 92 | 54 |
| `EOM - MCQs - URS 303 final exam Batch 2021 related.pdf` | 510 OCR lines (325 with ≥3 English words) | 236 (near-duplicate clustered across overlapping "Model 1/2" student recollections) | 117 | 119 | 84 |
| **Total** | — | **436** | **196** | **240** | **216 (49.5%)** |

**Key-recovery rate:** 216 of 436 items (49.5%) carry a recalled answer;
220 (50.5%) are a bare stem with no remembered answer at all. Read this
against `URS-303-coverage.md`'s caveat: every one of the 216 is
`keyRecoveryMethod: "recalled-fact"` — a student's memory of the right
answer, never a printed or highlighted key. Restricted to the 196 in-scope
items the split is 109 recalled / 87 none (55.6%).

## The "Phase questions" file is mostly not this module

92 of its 100 items are endocrine, respiratory, cardiovascular, rheumatology
or general infectious-disease content with no urinary/reproductive-system
content at all (DKA, MODY, insulin pharmacology, COPD, bronchial arteries,
hypertension physiology, rheumatic fever, giardia/entamoeba/plasmodium). Only
8 items touch this module (uterus/kidney/ovarian-vein anatomy, minimal-change
nephrotic syndrome, a schistosoma-UTI complication). It reads like a
recall sheet for a broader, multi-module "phase" exam that happens to sit in
this module's folder rather than a URS 303-specific paper. **Flagged, not
silently dropped** — see the BLOCKED note in the orchestrator report; every
item (in- and out-of-scope) is still in `mcq-bank.json` with a `moduleScope`
tag so nothing is lost if the ruling goes the other way.

The EOM file has the same pattern at a smaller scale (119 of 236 distinct
topics are non-urinary/reproductive — cardiovascular, respiratory, GI,
rheumatology, general ID/parasitology recur across its "Anatomy Model 2",
"Urology" and "Family Medicine" sections), consistent with it also being a
comprehensive/cumulative final rather than a URS-303-only paper. The GUR file
is the outlier in the other direction — 71 of 100 items are cleanly on-topic,
and its off-topic 29 are mostly a page of bare CBL case numbers with no
recoverable content at all, not genuine cross-module drift.

## Topic × subject frequency — the module's exam signal (in-scope items only, n=196)

Ranked by how many recalled items touch each topic. This is what should
decide which chapters a future content lane writes first, per the priority
rule in `LANE-BRIEF.md` (concepts/articles the banked questions need, before
the rest of the examinable chapter).

| Rank | Topic | Count | Subjects it draws from |
|--:|---|--:|---|
| 1 | Testis and spermatogenesis | 16 | Histology (11), Anatomy (3), Physiology (1), Pathology (1) |
| 2 | Kidney — gross anatomy and relations | 15 | Anatomy (8), Urology/clinical (4), Physiology (1), Histology (1), Pharmacology (1) |
| 3 | Renal tubular physiology (PCT/loop/DCT/collecting duct) | 13 | Physiology (10), Pharmacology (3) |
| 4 | Purine metabolism and gout pharmacology | 11 | Biochemistry (6), Pharmacology (4), Urology/clinical (1) |
| 5 | Cervix and vagina — histology/pathology | 10 | Histology (7), Microbiology (3) |
| 6 | Diuretics — pharmacology | 9 | Pharmacology (9) |
| 7 | Uterus — relations and histology | 8 | Anatomy (4), Histology (2), Physiology (1), Urology/clinical (1) |
| 7 | Pelvic nerves/vessels — plexus and branches | 8 | Anatomy (8) |
| 7 | Prostate — anatomy/histology/pathology | 8 | Anatomy (6), Histology (1), Pathology (1) |
| 7 | Glomerular filtration physiology | 8 | Physiology (7), Histology (1) |
| 11 | Urinary tract infection — diagnosis/management | 7 | Urology/clinical (4), Family Medicine/clinical (3) |
| 12 | Perineum and perineal pouches | 6 | Anatomy (6) |
| 12 | Urinary bladder — anatomy and physiology | 6 | Anatomy (5), Physiology (1) |

11 further in-scope items (Uncategorised — needs manual review) resisted the
keyword tagger and want a human pass rather than a forced label; they are
still in `mcq-bank.json` with `topic: "Uncategorised — needs manual review"`.

**Subject split (in-scope, n=196):** Anatomy 55 · Histology 42 · Physiology 28
· Pharmacology 19 · Microbiology 18 · Pathology 12 · Urology/clinical 10 ·
Biochemistry 6 · Family Medicine/clinical 4 · Microbiology (Parasitology) 2.
Anatomy and Histology together are 49% of everything recalled about this
module — consistent with the EOM file's own study-advice pages, which twice
tell students anatomy and histology are "the heaviest parts of this module."

Note: `Urology (clinical)` and `Family Medicine (clinical)` are not among the
seven subjects the brief names for this module (Anatomy/Physiology/
Histology/Pathology/Pharmacology/Biochemistry/Microbiology). They are kept as
their own labels rather than force-fitted, because the recalled items are
genuinely clinical-management questions (IVP contraindications, priapism risk
factors, uncomplicated-cystitis treatment plans) that do not read as any of
the seven basic-science disciplines.

## Proposed concept keys — existence check

Ten keys, one per top-ranked topic, checked with
`node "Instruction Manual for Content Creation/tools/find-existing.mjs"` and
`grep -ril <term> docs/*-Source-Imports/concept/`. This is a sample at the
topic grain, not a per-item check — see the caveat below the table.

| Proposed key (topic-level) | exists live? | exists pending? | Recommendation for a future Helwan lane |
|---|---|---|---|
| `testis.spermatogenesis-and-spermiogenesis` | some related live concepts under `CON-AND-*` (e.g. testicular artery course) | yes — `101-ISK-mcq-concepts.md` carries "Spermatogenesis" as an alias | **Sparse-update.** Kasr Year 1 (`101 ISK`) already covers this; attach `+hu`, `+HU_Y3`, `+HU-URS-303`, `module_subject`. |
| `kidney.gross-anatomy-and-relations` | yes — `CON-REN-F984B62BDFA777` (ureter), `CON-AND-853C682A67BA2C` (testicular artery vs ureter) and others under `CON-REN-*` | yes | **Sparse-update.** Renal gross anatomy is well seeded under `renal`/`CON-REN-*`; this module needs attachment, not new concepts, for the well-known landmarks (kidney relations, testicular vein drainage). |
| `renal.tubular-physiology` | not checked per-segment; `glomerular filtration` search hit `108-INT-concepts-pharmacology.md` (pending) | yes (pending, 108 INT) | **Mixed.** Broad tubule physiology (PCT/DCT/loop) likely already exists under `renal`/Kasr Year 1 physiology — search each fact before minting. `renal threshold` (the numeric 180 mg/dL fact) returned **no hit** — a genuine mint candidate if a content lane confirms it is not phrased differently elsewhere. |
| `pharmacology.purine-metabolism-and-gout` | yes — 24 existing records hit on "gout" (`103-BMS-MCQ-protein-heme.md` etc.) | yes | **Sparse-update.** Kasr `103 BMS` biochemistry/pharmacology already carries allopurinol/gout mechanism concepts in depth. |
| `histology.cervix-and-vagina` | `cervix transformation zone` as a compound phrase: **no hit** | — | **Likely mint**, but re-check narrower ("cervix", "transformation zone", "vaginal pH glycogen") separately before minting — a broader "cervix" search was not run here. |
| `pharmacology.diuretics` | yes — glossary term "Diuretic" pending | yes | **Sparse-update** for the drug-class concept; the specific facts (`amiloride + K+ supplement`, `trimeterene works in absence of aldosterone`) are narrow enough they may still be genuine mint candidates — check each. |
| `anatomy.uterus-relations` | yes — 12+ existing hits under "vas deferens"/pelvic anatomy searches suggest heavy Kasr Year 1/2 reproductive-anatomy coverage | yes | **Sparse-update**, expect duplication with Kasr's own reproductive-system concepts. |
| `anatomy.pelvic-nerves-and-vessels` | yes — `psoas major`, `quadratus lumborum` each returned **no hit** as compound searches, but `internal iliac artery` branches are a classic anatomy topic likely covered elsewhere under a different phrasing | — | **Check per-branch.** `psoas major origin`, `quadratus lumborum` (as standalone concepts) returned **no existing record** — real mint candidates if a broader search (just "psoas", just "quadratus lumborum") also comes back empty. |
| `pathology.prostate-anatomy-histology-pathology` | yes — 30 existing hits on "prostate" | yes | **Sparse-update.** Prostate anatomy/BPH/carcinoma concepts already exist somewhere in the 1,718-concept Kasr corpus; find the specific one before minting. |
| `physiology.glomerular-filtration` | yes — pending Kasr pharmacology concept references GFR | yes | **Sparse-update.** |

**Caveat on this table:** these are topic-level spot checks, not a clearance
for any specific concept. `find-existing.mjs` does not read `## canonical_key`
in pending files (per the brief's hazard note), so a content lane must still
`grep -ril` every candidate key across `docs/*-Source-Imports/` before
minting, and must search **per fact**, not per topic-bundle — a topic like
"kidney gross anatomy" bundles a dozen distinct facts (nerve supply,
posterior relation, venous drainage, testicular vein termination …) and each
one needs its own existence check. What this table shows is the overall
shape: **the module's most heavily examined topics are already substantially
seeded by Kasr Year 1/2** (`101 ISK`, `103 BMS`, `108 INT`), so a future
Helwan `HU-URS-303` content lane should expect **update-plus-mint**, weighted
toward update for the anatomy/physiology/biochemistry staples and toward
mint for the narrower clinical-urology and cervix/vagina facts that have no
obvious Kasr Year 1/2 analogue.

## What this means for a content lane (once a teaching source exists)

Priority order, following the module's own recall signal:

1. **Testis/spermatogenesis, kidney gross anatomy, renal tubular physiology,
   gout/purine pharmacology, diuretics** — the five heaviest topics, 64 of
   196 in-scope items (33%) between them. Sparse-update-heavy.
2. **Cervix/vagina histology, uterus relations, pelvic nerves/vessels,
   prostate, glomerular filtration** — the next five, another 42 items (21%).
   Mixed update/mint.
3. Everything ranked below that in the frequency table, in order.
4. The 11 "Uncategorised" items and the two files' out-of-scope halves are
   parked, not discarded — re-triage once the BLOCKED question about the
   Phase-questions file is answered.

No article exists for any of these topics in `docs/Helwan-Source-Imports/`
(this lane wrote none), so a content lane cannot write a single question
until it also writes the concept and article — per the standing order in
`LANE-BRIEF.md`, concepts + articles come before questions, always against a
real teaching source, which this module does not yet have (see TELEGRAM).
