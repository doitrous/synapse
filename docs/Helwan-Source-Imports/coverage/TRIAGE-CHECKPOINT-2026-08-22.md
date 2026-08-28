# Helwan Year 3 — triage checkpoint, 2026-08-22

Six lanes ran structure + question-led triage and stopped here under Omar's pause order.
Nothing minted, nothing authored. Resume-first: chief of staff's TRIAGE APPROVED → lanes run
steps 3–7 against exactly this scope.

## Consolidated table

| Lane | Questions triaged | Keys | Distinct concepts (est.) | Live-hit | Pending-hit | New | Top topics | Notes |
|---|--:|--:|--:|--:|--:|--:|---|---|
|---|--:|--:|--:|--:|--:|--:|---|---|
| HU-FTF-304 | 897 (645 MCQ + 252 T/F) | 843 (94%) | ~120–160 | 2 | 1 | rest | toxidromes 116, medical tox 66, wounds 70, general tox 61, gases/volatiles 61, postmortem 60, head injuries 59 | 21 chapters; 461 items quiz-assessed; dept book has no embedded MCQs; 54 keyless (33 toxidromes) |
| HU-URS-303 (triage-only) | 436 recall items (196 in-scope, 240 off-topic) | 216 (49.5%) — all `recalled-fact`, no official key | top-10 topics checked only | — | — | — | testis/spermatogenesis 16, kidney gross 15, tubular physiology 13, purine/gout pharm 11, cervix/vagina 10, diuretics 9 | NO teaching source and NO real exam paper in corpus; "phase questions" PDF 92% off-module; new channel lead t.me/ii0y_gun (prior final /242, lecture forms /199 /200) |
| HU-ORL-305-ENT | 309 (Ear 102, Nose 80, Larynx 54, Pharynx 73) | 309 (100%; key tables are graphics, read by eye) | 97 topics / 76 canonical searches; ~70 new | 1 exact (laryngeal papilloma CON-RES-7B27CD2545F4A5) + 4 overlapping-scope (RLN/hoarseness CON-END-*, vertigo, meningitis) | 1 (adenoids mention in 104-CPS practical concepts) + glossary word-parts | ~70 | otosclerosis 16, epistaxis 17, stridor 15, adenoid 13, rhinoscleroma 12, mastoiditis 10, tracheostomy 10; papilloma family 34 | 9 sections; 36 examiner-flagged topics, 32 covered by bank, 4 need manual review; dept book + core notes carry no MCQs |
| HU-ORL-305-OPH | 957 MCQ (+107 T/F cases not triaged) | 939 joined to Dr Kamal's key (97.9%); 6/15 chapters perfect, 9 off by 1–5 (merged print numbers) | 19 clusters + 72 unclassified; ~all new | 1 (gonococcal neonatal conjunctivitis CON-INF-36E2A424581F00) | 0 | ~all | cornea 134, glaucoma 104, eyelid 104, retina 78, refraction 71, conjunctiva 66, uvea 57, lens 53, lacrimal 50, optic nerve 47 | 15 chapters from Dr Kamal's own TOC; no dept book; ~400/957 (42%) would land in `mul` by elimination (eyelid, lacrimal, refraction, lens = 278) — ruling needed |
| HU-GIT-301-A | ~660 (anat ~366, histo 92 + 9 problem + 30 matching, physio 152, shared bank 50) | anat 53 (only the final block is keyed — ~313 keyless), histo 92/92, physio 152/152 (key grid read off a render), shared 50/50 | 27 sampled keys: physiology mostly LIVE (Kasr CON-GIT-* gastrin/secretin/CCK/plexuses/vomiting), histology mixed (taste bud, fundic gland PENDING in Kasr 101-ISK; Paneth, islets, Disse, GI goblet NEW), anatomy ~all NEW (inguinal canal, portal vein, rectus sheath, epiploic foramen, coeliac trunk) | many (physio) | 2+ (histo, Kasr 101-ISK pending) | anatomy bulk | GI hormones; salivary; oesophagus; stomach; SI; LI/rectum/anal; liver-biliary-pancreas; abdominal wall/inguinal/hernia (largest single chapter); portal system | Histology notes are handwritten (headings transcribed by eye every ~4th page); no orientation/marks doc for GIT 301; shared bank is ~49/50 physiology → ruling: lane A owns all 50, Q40 omeprazole main=parietal-cell pump, pharm contextual |
| HU-GIT-301-B | 302 (path 79 of 117 items — 38 written; pharm 52; para 146; biochem 24; shared bank 1) | 302/302 (path + pharm + biochem keys read off renders; para native) | 281 distinct keys | 13 | 8 (Kasr 103-BMS / 108-INT) | 191 (+69 generic keys needing per-term search) | Enterobius 15, Strongyloides 15, Fasciola 12; gastritis/PUD/diverticular/gallstones/chronic pancreatitis 3 each; metoclopramide + H. pylori eradication 4 each | 38 pathology + ~19 biochem written items parked for written-question authoring; Q40 omeprazole → lane B (drug labels belong to pharm) |

**Totals:** ≈ 3,560 questions triaged (FTF 897 · OPH 957 · GIT-A ~660 · URS 436 · ENT 309 · GIT-B 302); keys recovered for ≈ 2,850 (all but GIT-A's ~313 keyless anatomy items and URS's recall sheets). Live hits are concentrated in GI physiology (Kasr) and a handful of ENT/ophthalmology conditions; forensic medicine, toxicology, ENT, ophthalmology and GI anatomy are essentially new to the graph.

## Rulings needed before authoring resumes

- ENT: live CON-RES-7B27CD2545F4A5 (laryngeal papilloma) is ALSO in pending docs/import-ready/concept/SYS-RES-CONCEPT-REPAIR-001.md — sparse update must not collide with that repair; route to CoS/validator lane.
- ALL LANES (before evidence step): docs/medical-library-program/evidence/corpus-source-index.json does not contain Helwan src_ IDs (built from corpus/01-explicitly-taught/ + Kasr manifests via scripts/kasr/build-source-index.ts). Helwan needs a scripts/helwan/build-source-index.ts copy that merges helwan-y1-3-sources.json into that shared index — shared-file change, needs CoS routing (Kasr 103-bms owns the Kasr version).
- URS 303: 240 off-module recall items ("phase" exam) — ruling: keep tagged in the bank, author nothing from them under URS; they belong to whichever Year 3 module claims the topic.
- URS 303: unlisted channel t.me/ii0y_gun needs CoS approval before a fetch agent opens it.
- OPH: ~42% of ophthalmology questions (eyelid 104, lacrimal 50, refraction 71, lens/cataract 53, orbit, trauma, lasers) fall to `mul` by elimination under the placement law. Options: (a) accept `mul` with field_notes reason per record; (b) `derm` for eyelid/lacrimal (skin appendage) and `neuro` for refraction/lens as part of the visual apparatus; (c) a new `ophth` subject id (catalogue change — not a lane's call). Recommend (a) for now with a consistent note, and flag to CoS for a cross-university decision since Kasr Y3 Clinical has the same subject.
- GIT-A: ~313 anatomy MCQs have no recoverable key. Options: author only the 53 keyed + those whose answer is unambiguous from Dr Jalal's notes with `answer_source: notes-derived` and status Draft; or hold keyless ones. Recommend: author keyed ones first; notes-derived answers only where the notes state the fact verbatim (citation required), flagged Draft.

## Orchestrator rulings already made
- Shared `MCQs - 3rd Year - GIT MCQ.pdf`: 49 physiology items → lane A; Q40 (omeprazole) → lane B, per "drug labels belong to pharm".
- URS 303 off-module recall items stay tagged in the bank and are authored by nobody under URS.
- GIT-301-structure-A.md + GIT-301-structure-B.md and the two ORL-305 structure files are merged by the orchestrator into one outline per module before import (the importer wants one `- Module [ID]` block).

## Chief-of-staff rulings (pre-issued 2026-08-22; TRIAGE APPROVED takes effect on "RESUME")

1. **OPH `mul` bucket** — accepted for now: `subject: mul`, `field_notes` "ophthalmology; no
   subject in catalogue", `module_subject` starting `ORL 305 > Ophthalmology > …` so the set
   stays findable by module. Omar is being asked whether to add `oph`/`ent` subject ids
   (affects Kasr 315/316 too); if added, one sparse update re-homes the set.
2. **Helwan `src_` ids absent from `docs/medical-library-program/evidence/corpus-source-index.json`**
   — on resume the orchestrator has a lane build `scripts/helwan/build-source-index.ts`
   (copied from `scripts/kasr/build-source-index.ts` with a header) that merges
   `helwan-y1-3-sources.json` **additively** into the shared index, never rewriting Kasr rows.
3. **ENT `CON-RES-7B27CD2545F4A5`** (live, also in pending `SYS-RES-CONCEPT-REPAIR-001.md`) —
   write the sparse update against the live id with `+hu`/`+HU_Y3`/`+HU-ORL-305` only; INDEX
   line "apply after `docs/import-ready/concept/SYS-RES-CONCEPT-REPAIR-001.md`".
4. **`t.me/ii0y_gun`** — approved as a listed link for the URS 303 fetch: open and identify
   first, download only orientation / papers / forms, never Join.
5. **GIT-A keyless anatomy (~313)** — author keyed items fully; a keyless item may take its
   answer from the department book with a page citation → `status: Draft`, `field_notes`
   "answer_source: book"; never from student notes; no key and no book answer → leave
   unanswered and list under OPEN.

Orchestrator rulings: shared GIT bank Q40 (omeprazole) → lane B (drug labels belong to
`pharm`); lane A owns the other 49.

## Resume checklist (chief of staff, 2026-08-22, still paused)

The Instruction Manual was revised on main at `0e08ac1`: 00-START-HERE gains §0 law of
priority, roles, S0–S8 stages and gates; new `13-orchestration.md` (triage checkpoint,
pause/resume, hazards register); `05-questions.md` three-sentence explanation floor;
practicals scoped by `universities` / `years` / `module`; update rows must restate `## label`.
On RESUME, in this order: merge `origin/main` → re-read 00 and 13 → revise LANE-BRIEF where
the manual now says it better → re-brief the six lanes → TRIAGE APPROVED applies.
