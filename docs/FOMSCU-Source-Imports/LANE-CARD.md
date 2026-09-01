# LANE-CARD — Suez Canal University Year 1 (scu / FOMSCU)
No separate LANE-BRIEF.md exists — this card is the brief. Read first; open the full manual only at a wall named in your report.

## 1. Identity and ids
University id `scu` (live on `main`'s `src/data/universities.ts`: `{ id: 'scu', name: 'Suez Canal University (FOMSCU)', short: 'SCU', region: 'Ismailia' }`). Year `SCU_Y1`. Module ids `SCU-<CODE>` — from the 2023 Internal Bylaw: `SCU-FBS102` (Foundation 1), `SCU-FBS103` (Foundation 2), `SCU-FBS104` (Foundation 3), `SCU-MS105` (Musculoskeletal). Concept ids mint university-blind — FOMSCU's Year 1 basic science overlaps heavily with existing Kasr/Alexandria concepts (§7). Files: `docs/FOMSCU-Source-Imports/{manifest,academic,coverage}/` so far — no `concept/`/`article/`/`question/` yet, this lane is still S0–S3.

## 2. The ten rules that cannot bend
Same ten as every lane. Corpus root `/Users/doitrous/Desktop/Universities/FOMSCU/Faculty of Medicine`. FOMSCU runs a credit-point curriculum, semester/module-named not department-named (`academic/SCU-Y1-modules.md` §"Curriculum note") — the department split inside each module folder (Anatomy, Histology, ...) is this lane's own corpus organization, not an FOMSCU-published list.

## 3. Read text, don't look at pictures
`node scripts/content/pagetext.mjs show "<pdf>" --pages a-b` (≤ 3 pages/call), `status` first. Readability index: `coverage/SCU-Y1-readability-index.md` (87 PDFs, 3140 pages, 655 garbled — mostly image-heavy anatomy lecture slides, e.g. `Anatomy/01 University Material/Lecture - Skull 1 2023 - College PDF.pdf` is 48/48 pages garbled). **Nearly every tier-1/2 exam paper/bank is native text already** — the only scans in the priority set were `Musculoskeletal/Anatomy/03 Questions and QBank/MCQ - Lecture 1 & 2 - Dr Khanfour.pdf` (5 pages each, mostly garbled), already OCR'd and cached. Five of Foundation 1's and four of Foundation 2's question banks are **pre-extracted JSON** (`06 EOM Exams/*.json`, `07 EOY Exams/*.json`, `03 Questions and QBank/*.json`) — `question`/`options`/`answer`/`explanation` per item, sourced from a public Firestore-backed quiz app (`m-site.github.io/rafik-altib`), no PDF reading needed. A parallel `.md` sits next to each `.json` — same content, human-rendered. Visually-marked keys (red/underline/highlight) → `pagetext.mjs keys` first; render only when it reports no text layer or ambiguous.

## 4. Author: seed → emit → gate
Not reached yet — **TRIAGE APPROVED required first**. When it lands: seed dir `docs/FOMSCU-Source-Imports/coverage/seeds/<module>/` (create). `node scripts/content/emit-mcq.mjs <seed.json> --out <batch.md>` · `node scripts/content/gate.mjs batch <batch.md> --with <sibling concept/article files>` · `node scripts/content/gate.mjs simulate <files, apply order>` (positional, no `--with`). Foundation 1's spot-checked `pending` hits land in Kasr's `101-ISK`/`102-INT`/`103-BMS` MCQ-concept batches and `AU-MED-105`'s histology articles — gate future overlays `--with` those files, same overlay-not-full-record pattern as Ain Shams's `pending-live/ASU-IBM-biochem-mcq-overlay-concepts.md`.

## 5. Progress ledger
`node scripts/content/ledger.mjs <seed dir> --triage coverage/<module>-triage-keys.txt --out coverage/<module>-LEDGER.md` after every commit, once authoring starts. `coverage/SCU-FBS102-triage.md` is this lane's worked triage example: source table, dedup method, concept-candidate method, and a manual QA pass that overturned most of the automated tool's "live" hits (§7).

## 6. Commit rhythm
First commit within minutes; commit + push every 5–10 questions once authoring starts. Report ≤ 20 lines to chief-of-staff, ends `HANDOFF: <branch>@<sha> · resume-first: <next>`.

## 7. This lane's known traps
- **A single-word answer as a `find-existing.mjs` query is unreliable, even for "live" hits.** SCU-FBS102: automated pass said 35 live of 160 candidates; a manual read against each source question found only **9 held up** — 26 were homonym/substring collisions (`cristae` hit vestibular-canal cristae, not mitochondrial; `conduction` hit AV-nodal, not heat loss). A 10-question spot-check of the 45 "pending" hits came back 10/10 genuine — multi-word queries are far more trustworthy than single generic words. **Re-query with fuller context at authoring time.**
- **Two conflicting official Year 1 pictures** (2018 vs 2023 bylaw vs live Moodle) over whether Respiratory/Cardiovascular sit in Year 1 — see `academic/SCU-Y1-modules.md`. No such folder exists locally. **Needs Omar** before minting under those subjects.
- **Foundation 3 and Musculoskeletal have zero recovered lecture-folder content** — `01 University Material` folders exist but are empty; only module-wide + exam-paper files recovered. Confirmed gap, not a scan miss (`coverage/SCU-Y1-priority-sources.md`).
- **395 files sit unsorted in `_Staging/Telegram Year 1/`**, sha256'd but not module-classified or read — a known backlog per the Desktop catalog notes. Needs Omar ruling on folding that pass into this lane.
- **Ethics (6 q) / Community Medicine (1 q) have no obvious FOMSCU placement** — `pop` is a plausible default for Community; Ethics may need its own discussion. Needs Omar.
- **`Related Alternate - FOMNINU ... MCQ.json`** (`_Needs Review - Related FOMNINU/`) is a **different faculty** (not Suez Canal) — excluded from S3 triage though content overlaps heavily.
- Desktop `_Catalog/Library Manifest.csv` cites stale paths (missing `Universities/`) — match by sha256, not path.

## 8. Walls → where the answer lives
Id/search/overlay law → `00-START-HERE.md` §3–4. Gate/tool shape → `SHARED-TOOLCHAIN.md` §Content CLI. Explanation/coverage bar → `05-questions.md`. Staged pipeline + triage checkpoint → `13-orchestration.md` §4–5. Reviewer/publisher and answer-key rulings → `docs/chief-of-staff/HANDOFF.md` "Standing orders" (not yet read by this lane — check first).
