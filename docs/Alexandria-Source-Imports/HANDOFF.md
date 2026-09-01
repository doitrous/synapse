# HANDOFF — Alexandria University Year 1 (orchestrator)

Rewritten 2026-08-27 after the weekly usage limit (reset Aug 27 01:00 Cairo) killed the six
lanes that were still running, and Omar merged everything to **main**.

## Where the work lives now
- **All Alexandria Year 1 content is on `main`** (Omar landed the last batch himself:
  `1ac5ffff ops(content): land AU-MED-105/106 physiology build and pending-live batches`,
  2026-08-27 01:28). 181 files under `docs/Alexandria-Source-Imports/`. Nothing is owed a
  commit-and-land pass — it is committed.
- The original worktree `alexandria-university-content-000583` was removed; branch
  `claude/alexandria-university-content-000583` still exists and is fully contained in main.
- This handover worktree is `claude/alexandria-y1-continue` off main. A successor can work here
  or make its own worktree off main.
- Read order for a successor: this file → `LANE-BRIEF.md` (§1–§24, the standing law) →
  `LANE-ORDERS-PHASE1.md` (the per-lane Steps 1–4 recipe) →
  `Instruction Manual for Content Creation/00-START-HERE.md` and `13-orchestration.md`.

## Standing orders (unchanged, all in LANE-BRIEF.md)
- **Year 1 only** until it is publishable; Years 2–3 frozen until "RESUME" (§17).
- Report only to the **chief-of-staff** session ("Chief of staff — content lanes"), deltas only.
- Question-led scope (§10–§11); overlay minting — one concept id across universities, sparse
  updates into Kasr ids, never a full-record overwrite (§12/§16).
- Every record carries the **six per-university tags** (§24 + amendments): `+au`; the AU year
  (concepts use `learner_years`); `+AU-MED-xxx`; an Alexandria `module_subject` **path as the
  full union** (module_subject REPLACES — restate Kasr's paths + ours); `exam_weight_by_year`
  with the exact `AU_Y1` key (a wrong id hides the record from the blueprint); a
  `university_notes` line (article kind only today — concepts put `au: <src, page>` in
  `field_notes`; questions/practicals in `coverage/00-university-notes-ledger.md`).
- Two-sided coverage (§22): a tested concept is covered only when an article NAMES it in
  `related_concepts` AND teaches it. Verify against the Kasr article's own `related_concepts`.
- Explanation bar (§18): `explanation_<correct>` ≥3 sentences, one per distractor.
- Gates per file: `medical:batch` → `medical:simulate` (own dir; for pending-live pass the Kasr
  concept+article files as plain args FIRST) → `medical:audit` filtered to your ids →
  `medical:concept-ids`. Resource records use the 17-col evidence-source shape, not the
  catalogue shape (the detector only recognises the former).

## Lanes — DONE (landed on main, gates were re-run before commit)
102: Histology+Physiology, Terminology (+ Foundations terminology shelf), Embryology,
Biochem-B (bioenergetics/CHO/lipid metabolism), Biochem-C (nitrogen/blood), Biochem-D
(molecular). 103: Biochemistry, Histology, Physiology. 105: Histology. 105-Physiology landed
via Omar's commit (concepts 44, articles 3, 19 own + 20 pending questions) — spot-check its
audit before calling it green.

## Lanes — INCOMPLETE (killed by the weekly limit; groundwork committed, authoring owed)
1. **105 Anatomy questions** — biggest gap. 27 concepts, 7 articles, 36 overlays are DONE;
   only **44 of ~460 questions** authored (`question/AU-MED-105-anatomy-mcq.md` 15,
   `-practical-mcq.md` 29). The 428 bank keys are ALL render-recovered and recorded in
   `coverage/AU-MED-105-anatomy-triage.md` with page + method. Author the rest: mock exams'
   labelling items (media_recommendations Priority required, never prose), then the 5 banks;
   questions on the 36 Kasr overlay ids go in `pending-live/AU-MED-105-anatomy-questions.md`.
2. **106 Anatomy** — concepts=1, no article, no questions. Groundwork DONE and committed
   (`033e435`): all 46 ink keys confirmed at 200 dpi, 13 "unreadable" pages recovered, Telegram
   "ASM Minds" bank triaged — all in `coverage/AU-MED-106-anatomy-triage.md`. Owed: 28 NEW
   concepts + region article(s) + evidence + ~89 questions. Bank guard (no paper); every item
   image-dependent → media requests. Note the printed key's IVC/brachiocephalic mixup (record
   as printed).
3. **106 Physiology** — concepts=44, articles=3 landed; **no questions authored**. Author the
   CV cluster's questions and the rest; VSD→absent-Q-wave and oximetry→race stay as printed
   with a one-sentence sourced note; QT disagreement recorded.
4. **Biochem-A enzymology** — the last vertical of sub-lane A is entirely undone (0 enzymology
   concepts in `concept/AU-MED-102-biochem-structural-concepts.md`, which holds 69 CHO/lipid/
   protein concepts + 69 MCQs already). Author enzymology (kinetics, classification,
   regulation, inhibition, isoenzymes, clinical enzymes): concepts, one `ART-FND-AU-MED-102-
   ENZYMOLOGY`, evidence, questions — append to the existing structural files.
5. **T1 per-university tag audit** — `scripts/alexandria/check-tags.mjs` is committed but the
   audit was not run to completion and gaps not fixed. Run it, report counts per module (which
   of the six tags each record carries), fix gaps as sparse updates (module_subject only where
   proven additive/union; university_notes per the kind rules above).
6. **102 Anatomy** — 3 own + 14 pending questions done, but 17 of its 23 Kasr overlay concepts
   have **no teaching article in the Kasr batch**, so their questions cannot validate. This is a
   Kasr Y1 gap (Kasr Y1 is running a coverage-verification pass). Hold those questions; do not
   work around it.

## Closing tasks once the six above are complete (orchestrator only)
- Rebuild `INDEX.md` in every import folder with Omar's order: academic → the Kasr Y1 files
  named in `pending-live/INDEX.md` → resources → articles → concepts → evidence → questions →
  pending-live last.
- Module-wide `medical:simulate` per module to 0 errors; publishable check per §17 (every
  triaged question's main concept has an article; pending-live separated with its apply-after
  line). Report per module to the chief of staff.
- AU-MED-101 stays unpublishable — empty corpus, Telegram yielded no file. Needs a source
  from Omar.

## Open asks of Omar
- The list of Kasr Y1 batches already applied in production (decides pending-live import order).
- A production snapshot / `medical:snapshot-live` so HIT-PENDING ids become HIT-LIVE.
- Join the Alexandria student channels found by the fetch lane (ASM Minds cohort channels) for
  MED 101 material and future papers — logged in `coverage/00-telegram-fetch-log.md`.
- Whether image-dependent items (105/106 labelling, histology diagrams — ~250 media requests)
  publish as Draft pending media or wait.

## Toolchain facts a successor will otherwise rediscover (all proven, in LANE-BRIEF)
- pagetext cache is `scripts/alexandria/pagetext/` — only `pagetext.py` writes there; intake's
  text cache is `scripts/alexandria/intake/textcache/`.
- "[from … Updated]" twins are NOT byte-identical; the manifest carries `nameTwinOf` /
  `twinPreferred` / `contentTwinOf`. Read the preferred, cite what you read.
- `find-existing.mjs` searches every `docs/*-Source-Imports/`; before minting also
  `grep -ril <canonical_key> docs/*-Source-Imports/concept/`.
- Garbled bank answer keys on 105 Anatomy / 102 Terminology are a corrupted CamScanner text
  layer — `-layout` does not fix them; recover by 200–300 dpi render read by eye or leave
  unkeyed. Never reorder letters by pattern.

## Exact resume message for the successor session
"You are the Alexandria University orchestrator, continuing after a handover. Work from a
worktree off `main` (all Year 1 content is already on main). Read
docs/Alexandria-Source-Imports/HANDOFF.md, LANE-BRIEF.md, LANE-ORDERS-PHASE1.md, and
Instruction Manual for Content Creation/00-START-HERE.md + 13-orchestration.md. Dispatch Sonnet
lanes for the six INCOMPLETE items in HANDOFF.md (105-anatomy questions, 106-anatomy authoring,
106-physiology questions, biochem-A enzymology, the T1 tag audit, and the 102-anatomy Kasr-gap
hold), one lane per (module, task), each resuming from its committed triage file — never redo
finished work. Re-run every lane's gates before committing; report deltas (hash, numbers,
blockers) to the chief-of-staff session; keep this HANDOFF.md current."
