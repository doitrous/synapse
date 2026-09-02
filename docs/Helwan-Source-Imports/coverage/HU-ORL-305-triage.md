# HU-ORL-305 — Ophthalmology triage (lane 1 of 2; ENT is lane 2's)

Source: `coverage/HU-Y3-priority-sources.md` §HU-ORL-305 tier 1 — the department
question bank and its dedicated printed answer key. Corpus root
`/Users/doitrous/Desktop/Universities/helwan/Year 3/ORL 305/Ophthalmology/`:

| File | Pages | Words | pagetext status |
|---|--:|--:|---|
| `Questions/MCQs/MCQs - Ophthalmology_question_bank_Dr_Ahmed_Kamal_3r_260612_153055.pdf` | 193 | 47,963 | 100% native text, 0 garbled, 0 renders needed |
| `Questions/Answer Keys/Ophthalmology - Answer Key . Dr. Kamal.pdf` | 9 | 3,552 | 100% native text, 0 garbled, 0 renders needed |

Both files are fully machine-readable `pdftotext -layout` output — no OCR pass
was required for either (`pagetext.mjs status` on every page of both: `garbled=no
ocr=no` throughout).

## Method

The question bank is organised as 15 numbered chapters, each independently
numbered `Q1..Qn` within its own "MCQs" section (plus separate "Written" and
"T/F" sections per chapter, out of MCQ scope). The answer key is a matching
15-chapter table, also independently numbered per chapter, printed as a
compact multi-column grid (`Qn <TAB> letter`).

Both PDFs' cached `pdftotext -layout` text (`pagetext.mjs`'s own cache,
populated by `status`/`show` calls run first) was parsed programmatically: a
regex pass over the key extracts every `Q<n> <letter>` cell per chapter
(validated against each chapter's own printed "(N answers)" header — declared
and parsed counts matched exactly in 15/15 chapters after widening the option
regex to `[A-E]` for the bank's rare 5-option items); a second regex pass over
the bank counts every `<n>.` item under each chapter's "MCQs" heading. The two
per-chapter number sets were then intersected to build the join. Chapters 1,
2 and all of chapter 3's first 20 items (the lane-1 authoring cluster, below)
were additionally read in full via `pagetext.mjs show` (≤3 pages/call) to
verify the regex extraction against the rendered page text — zero
transcription mismatches found.

## Join table (15 chapters, full bank)

| Ch | Title | Bank items | Keyed | Joined | Unjoined (no key) |
|--:|---|--:|--:|--:|---|
| 1 | Brief anatomy of the eye and its adnexa | 26 | 26 | 26 | — |
| 2 | Clinical examination of the eye | 13 | 13 | 13 | — |
| 3 | The protective system of the eye | 96 | 91 | 91 | Q32, Q36, Q47, Q50, Q53 |
| 4 | Normal and abnormal image capture | 91 | 91 | 91 | — |
| 5 | Ocular motility in health and disease | 63 | 63 | 63 | — |
| 6 | The Glaucomas | 71 | 70 | 70 | Q36 |
| 7 | The red eye | 203 | 198 | 198 | Q59, Q63, Q72, Q76, Q172 |
| 8 | The retina: function and diseases | 90 | 88 | 88 | Q14, Q39 |
| 9 | The eye and the brain | 73 | 72 | 72 | Q45 |
| 10 | Eye diseases in infancy and early childhood | 60 | 57 | 57 | Q18, Q41, Q52 |
| 11 | The eye in systemic diseases | 43 | 40 | 40 | Q39, Q42, Q44 |
| 12 | Ocular and orbital injuries | 81 | 80 | 80 | Q74 |
| 13 | Medications and the eye | 43 | 43 | 43 | — |
| 14 | Lasers in ophthalmology | 23 | 23 | 23 | — |
| 15 | Some related topics | 4 | 4 | 4 | — |
| **Total** | | **980** | **959** | **959** | **21** |

**Join rate: 959/980 = 97.9%** — this exactly reproduces the "old triage's
97.9% join rate" figure the chief-of-staff's own priority-sources note cites
for this file (`coverage/HU-Y3-priority-sources.md` §HU-ORL-305), independently
re-derived here from the two source PDFs rather than recovered from a lost
branch (no prior ORL-305 triage survives on `claude/helwan-content-orchestration-8fe5ec`
— unlike GIT-301, this module was never previously triaged in the current
tree; §HU-Y3-priority-sources.md's own citation is the only trace of the old
number).

**Duplicates:** the key has zero orphan entries (`key_only = 0` in every
chapter) — every printed key answer maps to exactly one bank item number, no
key answer names a question the bank doesn't have.

**Unjoined items (21, all in chapters 3/6/7/8/9/10/11/12):** these are MCQ
items present in the bank (a numbered stem with 4-5 lettered options) for
which the printed key simply has no row — a genuine key gap, not a
written/matching item wrongly numbered into the MCQ sequence (spot-checked:
chapter 3's Q32 "The lid sphincter muscle has the following portions" and Q36
"Xanthelasma can occur in" are both fully formed 4-option MCQs, confirmed via
`pagetext.mjs show`). Authoring any of these 21 would need `status: Draft` +
`field_notes` recording the key gap and the answer's source (department book,
if available), per the GIT-A keyless-item ruling this recovery carries
forward — none of the 21 fall inside the lane-1 cluster below, so none needed
resolving this pass.

**Subject split:** the whole file is Ophthalmology (all 15 chapters). No
`oph` subject id exists in the catalogue (`LANE-CARD-Y2-3.md` §5) — every
concept/question in this module falls to `mul` ("Multisystem and
emergencies") by the pre-ruled elimination, noted per-record in
`field_notes`. ENT (`ENT/Questions/MCQs/MCQs - ENT MCQ Question Bank.pdf`,
10,366 words, key tables are graphics per the priority-sources note) is
lane 2's file — catalogue-only here, not triaged.

## TRIAGE APPROVED condition

97.9% ≥ 60% — comfortably met. Proceeding to STEP 2 per the chief of staff's
advance grant.

## Concept search sample

`find-existing.mjs` run against 16 short, literal terms drawn from the
chapter 1-3 cluster below (search-before-mint per `00-START-HERE.md` §3-4):

| Term | Result |
|---|---|
| aqueous humour | no hit |
| cornea | 11 hits, all noise (GAG/glycosaminoglycan biochemistry, unrelated "cornea" substring in `101-ISK-mcq.md`'s epithelium-type question) except **one real match**: `docs/Alexandria-Source-Imports/concept/AU-MED-203-histology-concepts.md`, pending id `CON-NEU-3FF95D30CD5825`, canonical_key `neuro.cornea.transparency-factors` — "Corneal transparency depends on few epithelial layers, regular collagen spacing in the stroma, and avascularity" |
| corneal transparency | same `CON-NEU-3FF95D30CD5825` hit, confirmed |
| uveal tract | no hit |
| ptosis | 1 page of hits, all "apoptosis" substring noise — no real hit |
| lagophthalmos | no hit |
| ectropion | no hit |
| entropion | no hit |
| dacryocystitis | no hit |
| blepharitis | no hit |
| proptosis | no hit |
| gonioscopy | no hit |
| hordeolum | no hit |
| nasolacrimal duct | no hit |
| retinoscopy | no hit |
| thyroid ophthalmopathy | no hit |
| diabetic retinopathy | no hit |
| visual field | 1 hit: `AU-MED-203-anatomy-concepts.md` alias "Visual field defects" on an optic-tract/homonymous-hemianopia concept — a different fact (pathway lesion localisation, not the confrontation-testing technique this bank's Ch1 Q22 tests); noted as related, not merged |
| orbital fissure | 1 hit: `SCU-FBS102-s2-mint-concepts.md` — "The superior orbital fissure passes between the greater and lesser wings of the sphenoid" (a bony-boundary fact) vs. this bank's Ch1 Q26 (what the fissure transmits) — different fact, not merged |

**Reading:** Ophthalmology is close to a green field in the current
live+pending corpus — the catalogue-gap note in `LANE-CARD-Y2-3.md` §5 (no
`oph` subject) matches an almost-total absence of ophthalmology-specific
concepts anywhere in live state or any university's pending batches. The one
genuine near-duplicate found (`CON-NEU-3FF95D30CD5825`, corneal transparency
factors) is a **pending, not live** Alexandria histology concept — any
overlay onto it is itself pending-on-a-pending and must land in
`pending-live/` with an explicit apply-after-AU-MED-203-lands dependency note,
same pattern as GIT-301's carcinoid overlay.

## Lane-1 authoring cluster (STEP 2 scope)

Bank order, ~50-60 questions: **Chapter 1 (26) + Chapter 2 (13) + Chapter 3
items #1-20 of 96 (20) = 59 questions**, all joined, all read and verified in
full via `pagetext.mjs show`. Full stem/option/key extraction for this
cluster: `scripts/helwan/extract/HU-ORL-305/mcq-bank-ophthalmology.json`.
Chapter 3's remaining items (#21-96) and chapters 4-15 remain
structurally-joined only (`HU-ORL-305-triage-keys.txt`, `ophth-qNNNN`
sequential keys, `joined`/`unjoined-no-key` status by chapter+item-number —
no per-item concept-level triage was attempted beyond the cluster, since that
would need the same full-text read-and-transcribe pass this cluster got, out
of scope for one lane-1 pass) for a future cluster/lane to pick up.
