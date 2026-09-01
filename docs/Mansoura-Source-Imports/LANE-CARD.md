# LANE-CARD — Mansoura University Year 1 (mans)

No separate LANE-BRIEF.md exists — this card is the brief. Read first; open the full manual only at a wall named in your report.

## 1. Identity and ids
University id `mans` — **not yet on `main`'s `src/data/universities.ts`** (brief said "empty shell"; a direct grep found no `mans` entry — see §7). Year `MANS_Y1`. Module ids `MANS-<CODE>`, from the faculty's own codes: S1 baseline (2021-2022 guide, no dated timetable) `MANS-HR`, `MANS-MT`, `MANS-PAEHC`, `MANS-PBBG`, `MANS-PPMIP`, `MANS-PPP`; S2 current (dated 2023-2024 schedule) `MANS-PPPM-201`, `MANS-MSS-202`, `MANS-HIS-203`, `MANS-ECE-204`, `MANS-UNI-204`. Concept ids mint university-blind — Mansoura's basic-science content overlaps heavily with existing Kasr/Alexandria concepts (§7 hit-rate). Files: `docs/Mansoura-Source-Imports/{manifest,academic,coverage}/` so far — no `concept/`/`article/`/`question/` yet, this lane is still S0–S3, **TRIAGE APPROVED not yet given**.

## 2. The ten rules that cannot bend
Same ten as every lane. Corpus root `/Users/doitrous/Desktop/Universities/Mansoura University`. The organized `Year 1/` tree is almost entirely **empty placeholder folders** — all real content (1,344 academic files) sits in `_Staging/Telegram Year 1/`, organized by Telegram cohort-channel label (`AEP`/`HBG`/`PPPM`/`MSS`/`HIS`), which are **not module ids** (§7).

## 3. Read text, don't look at pictures
`node scripts/content/pagetext.mjs show "<pdf>" --pages a-b` (≤ 3 pages/call), `status` first. Readability indexes: `coverage/MANS-Y1-readability-index.md` (organized tree, 2 files, 0 garbled) and `coverage/MANS-Y1-staging-readability-index.md` (1,340 PDFs, 25,913 pages, **5,611 garbled — 41.9% of files have ≥1 scanned page**, worst in `HIS` at 51.3%). Two of `HIS`'s four Priority-4 files are garbled scans, OCR'd for S3 triage — the correct-answer highlight did **not** survive OCR for most items (13/16, one bank), a fresh instance of the "keys hide in highlights" trap. Where a scan content-twins a readable source (§7), prefer the readable source's key over re-OCRing.

## 4. Author: seed → emit → gate
Not reached — **TRIAGE APPROVED required first**. When it lands: seed dir `docs/Mansoura-Source-Imports/coverage/seeds/<module>/` (create). `node scripts/content/emit-mcq.mjs <seed.json> --out <batch.md>` · `node scripts/content/gate.mjs batch <batch.md> --with <sibling concept/article files>` · `node scripts/content/gate.mjs simulate <files, apply order>` (positional, no `--with`). `MANS-HIS-203`'s spot-checked `pending` hits land in Kasr's `101-ISK`/`102-INT`/`104-CPS` concept batches and Alexandria's `AU-MED-103` histology batch — gate future overlays `--with` those files, same overlay-not-full-record pattern as other lanes' sparse updates.

## 5. Progress ledger
`node scripts/content/ledger.mjs <seed dir> --triage coverage/<module>-triage-keys.txt --out coverage/<module>-LEDGER.md` after every commit, once authoring starts. `coverage/MANS-HIS-203-triage.md` is this lane's worked triage example (a Phase-0 representative sample, not exhaustive — see its own scope note): 66 distinct questions, 52 keys solidly recovered, 19 concepts (17 searched: 6 live, 10 pending, 1 new), 94% hit rate on searched concepts.

## 6. Commit rhythm
First commit landed within minutes of worktree setup; committed + pushed after each of S0/S1/S1b/S2/S3/fix. Report ≤ 20 lines to the chief-of-staff session, ends `HANDOFF: <branch>@<sha> · awaiting TRIAGE APPROVED`.

## 7. This lane's known traps
- **Archive-group labels are not module ids, and one is a false friend.** Telegram `PPPM` (422 files) spans the *old-baseline S1* `PPP`+`PPMIP`, **not** the current-cohort S2 module also coded `PPPM-201` — same acronym, different modules/semester. `AEP`/`HBG` are similarly ambiguous (span 2 S1 modules each); only `MSS`→`MANS-MSS-202` and `HIS`→`MANS-HIS-203` resolve 1:1. Per-file resolution of `AEP`/`HBG`/Telegram-`PPPM` is unstarted.
- **A same-question content-twin across two files, confirmed in `HIS`**: `Histo HIS Important MCQ.pdf` and the Continuous Book's Lecture 1&2 print the identical 10 questions. The scan's OCR recovered only 2/10 keys; the readable twin had all 10. sha256 found **zero** exact-duplicate files — these are twins by content, not hash. Check for more before authoring.
- **No dated Semester 1 timetable exists locally** for the current cohort — the S1 set (`HR`/`MT`/`PAEHC`/`PBBG`/`PPMIP`/`PPP`) is the 2021-2022 guide baseline, unconfirmed. `_Catalog/Missing High-Priority Downloads.md` already flags this as unresolved by the faculty's own timetable page.
- **No marks/credit-hour distribution exists locally** for any current-cohort S2 module — `00 Administration/Plans and Mark Distribution/` is empty under both semesters.
- **`mans` is not yet in `src/data/universities.ts`** — the brief expected an empty shell; direct grep of `main` found no `mans` entry at all (confirmed, not edited, per instructions). Flag before import.
- **RTL table extraction is unreliable** for the 2021-2022 guide's marks table — S1's printed total (18wk/17cr/400 marks) doesn't cleanly reconcile against the 4 core modules' legible 4wk/4cr each; `MT`/`HR` credit cells extracted as dashes. Needs a visual check (`academic/MANS-Y1-modules.md`).
- **`kind` in the manifest is a filename heuristic only** (1,344 files, too many to open at Phase-0) — 26% land in `other`. Directional, not content-read; re-classify per file at S1 triage.

## 8. Walls → where the answer lives
Id/search/overlay law → `00-START-HERE.md` §3–4. Gate/tool shape → `SHARED-TOOLCHAIN.md` §Content CLI. Explanation/coverage bar → `05-questions.md`. Staged pipeline + triage checkpoint → `13-orchestration.md` §4–5. Reviewer/publisher and answer-key rulings → the chief-of-staff session's standing orders (not yet consulted — check before any ruling that may already be settled).
