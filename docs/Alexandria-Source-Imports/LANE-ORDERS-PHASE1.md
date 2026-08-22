# Phase 1 lane orders — Alexandria University

Your dispatch message gives you five values: `MODULE` (e.g. `AU-MED-102`), `DEPARTMENTS`
(the manifest `departmentFolder` values you own, e.g. `Anatomy` or `Anatomy, Anatomy and
Embryology`), `YEAR` (`Y1`), `SLUG` (e.g. `AU-MED-102-anatomy`), and `GUARD` (`paper` or
`bank`). Substitute them wherever this file says `{{…}}`. Working directory is the worktree
`…/.claude/worktrees/alexandria-university-content-000583`; never commit, push or import.

## Read first, in order
1. `docs/Alexandria-Source-Imports/LANE-BRIEF.md` — all of it; §10–16 override earlier text.
2. `Instruction Manual for Content Creation/00-START-HERE.md`, then `02-concepts.md`,
   `04-library-articles.md`, `05-questions.md`.
3. `SHARED-TOOLCHAIN.md` → "Findings every lane needs" and "Recovering an answer key".
4. `docs/Alexandria-Source-Imports/manifest/README.md` (row schema, twins, containers).
5. `docs/Kasr-Source-Imports/concept/104-CPS-concepts.md`, `article/104-CPS-articles.md`,
   `question/104-CPS-mcq.md` — field semantics only, not field coverage.

## Your sources
Manifest `docs/Alexandria-Source-Imports/manifest/au-{{YEAR_LOWER}}-sources.json`, rows where
`moduleId == "{{MODULE}}"` and `departmentFolder` ∈ {{DEPARTMENTS}} — plus the module's
`Exams` and `General` rows (papers and banks), which every department lane of the module reads.
Where a row has `nameTwinOf`, read the `twinPreferred` one and cite the one you read.

**Page text.** The tooling lane (P0-E) pre-extracts every Year 1 `Exams`/`General`/
`Department Questions`/`End of Module`/`End of Year` source into
`scripts/alexandria/pagetext/<sourceId>.json` and provides
`scripts/alexandria/extract/pagetext.py <sourceId>…` for everything else. Do not OCR a paper
yourself — thirteen lanes share them. If a paper's cache file is missing, do your department
files first; if it is still missing when you need it, end your turn `BLOCKED` naming the
sourceId. Never hand-transcribe from a rendered page.

## Step 1 — question-led triage, then STOP
Write `docs/Alexandria-Source-Imports/coverage/{{SLUG}}-triage.md`:
- Every question in the module's papers and banks that **this department teaches**: sourceId,
  page, short stem, key status (separate file / highlight / answer block / none — per the
  decision procedure), cohort and stream signals from the manifest, sitting year only if the
  page states it. Group by the department-book chapter (or lecture) that teaches it.
- The ordered list of distinct ideas the exam tests → these are your concepts. Then the rest
  of the examined chapter(s) per brief §11; nothing beyond.
- `GUARD = bank` (AU-MED-105, AU-MED-106): no paper exists; the banks are the triage source;
  `exam_signal` tier is the *bank* tier, never a paper's; concepts and articles cover what the
  banks test and nothing more until a paper arrives.
- For every distinct idea run the key search NOW (brief §10 + §16: `find-existing.mjs` ≥4
  queries AND `grep -ril "<key>" docs/*-Source-Imports/concept/`) and classify: **HIT-LIVE**
  (id in `server/data/medical-library-v1.json`), **HIT-PENDING** (id only in another
  university's unimported batch), **NEW**.
- Top of the file, one table: questions triaged · keyed · unkeyed · distinct concepts tested ·
  hit-live · hit-pending · new.

**CHECKPOINT.** End your turn with the brief §8 report (COUNTS = that table). Do not mint,
do not write concept/article/question files. The orchestrator resumes you with
`TRIAGE APPROVED` (possibly with corrections — apply them to the triage first).

## Step 2 — concepts and articles (after TRIAGE APPROVED)
HIT-LIVE → sparse update (`## id`, `## label`, `universities` `+au`, `years` `+AU_{{YEAR}}`,
`modules` `+{{MODULE}}`, `university_notes` if Alexandria teaches it differently) in
`concept/{{SLUG}}-concepts.md`. HIT-PENDING → the same sparse update in
`pending-live/{{SLUG}}.md` plus an INDEX line naming the file it waits on. NEW → mint with
`tools/mint-concept-id.mjs`, full concept to the 02 floor (≥50/52), canonical placement on the
existing tree, `subject` from brief §14's twenty, question IDs in `field_notes`; and the
article that teaches it to the 04 floor (≥49/53) in `article/{{SLUG}}-articles.md`, both
directions linked. `npm run medical:concept-ids` after writing.

## Step 3 — questions
Paper and bank questions to 05 (≥46/50; written ceiling 41) in `question/{{SLUG}}-mcq.md`
(essay items in `written/`). `explanation_<correct>` is the whole worked explanation;
`main_concept` only what is really tested; `contextual_concept_ids` for dressing; diagram
questions stay diagram questions (media request). An unrecoverable key → recorded as unkeyed
in the triage, not authored.

## Step 4 — evidence
Resources for every source used (`12-resources.md`), then claims → citations → spans using the
Kasr shapes copied into `scripts/alexandria/` by P0-E (`build-evidence.ts`, `build-spans.ts`).

## Gates and hand-over
`medical:batch` per file → `medical:simulate docs/Alexandria-Source-Imports/<kind>/{{SLUG}}-*.md
--emit /tmp/sim-AU-{{SLUG}}.json` (your own files only) → `medical:audit -- --source …`
filtered to your IDs with a positive control → `npm run medical:concept-ids`. Claim in
`CLAIMS.md` at the bottom of the table, scope `AU · {{MODULE}} · <department> · <kind>`.
Report per brief §8, plus the share of records traceable to a real question and the canonical
keys you minted. `BLOCKED` → stop, brief §7.
