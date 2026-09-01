# LANE-CARD — Assiut University Year 1 (aun)
**No separate LANE-BRIEF.md exists for this lane — this card is the brief.** Read this card first; open the full manual only at a wall named in your report.

## 1. Identity and ids
University id `aun` (registered in `src/data/universities.ts` — confirm live on `origin/main` before minting anything; do not add the entry yourself). Year `AUN_Y1`. Module ids `AUN-<CODE>` — the four **confirmed** Year 1 modules are `AUN-PSM-101`, `AUN-PMS-102`, `AUN-CBF-103`, `AUN-PPS-132` (Semester 1) and `AUN-INI-105`, `AUN-MPT-104`, `AUN-IPC-133` (Semester 2), per Internal Bylaw 2023 pp.19-20. Only `AUN-PMS-102`, `AUN-CBF-103`, `AUN-INI-105`, `AUN-MPT-104` have Desktop source material; `PSM-101`, `PPS-132`, `IPC-133` have **no folder at all** — needs Omar sources. Files: `docs/Assiut-Source-Imports/{concept,article,question,evidence,coverage,pending-live,manifest,academic}/`.

## 2. The ten rules that cannot bend
Same ten as every lane (13-orchestration.md §11's DISPATCH/LANE-BRIEF skeleton). Corpus root `/Users/doitrous/Desktop/Universities/Assiut University/Faculty of Medicine`. Concept ids mint university-blind — search live + every `docs/*-Source-Imports` + `docs/import-ready` before minting (00-START-HERE.md §4); Kasr/Alexandria/Ain Shams pharmacology and pathology concepts already overlap heavily with what Assiut Year 1 tests (§7).

## 3. Read text, don't look at pictures
`node scripts/content/pagetext.mjs show "<pdf>" --pages a-b` (≤ 3 pages/call), `status` first. **This corpus is scan-heavy for its exam papers specifically**: both `MPT mcq questions (final 2022).pdf` and `Final exam 2022 assiut University.pdf` (MPT's two priority final exams) are 0-word-native scans needing full OCR; `Microbiology Questions Bank.pdf` reads as "3 words/page" natively (a CamScanner watermark, not real text) and needs manual `mark-garbled` before OCR (auto-flag only catches literal 0-word pages). By contrast the bulk quiz/MCQ compilations (`All Quizzes MPT 2022.pdf`, `MCQ pharma Alex.pdf`, `INI MCQ .pdf`, `CBF question bank.pdf`) are fully text-native, 0 garbled — triage those first. Readability index: `coverage/AUN-Y1-readability-index.md`. Visually-marked keys (red/underline/highlight) → `pagetext.mjs keys` first; render only when it reports no text layer or ambiguous.

## 4. Author: seed → emit → gate
seed dir: `docs/Assiut-Source-Imports/coverage/seeds/<module>/` (create when authoring starts — not created yet, this lane is still pre-TRIAGE-APPROVED) · `node scripts/content/emit-mcq.mjs <seed.json> --out <batch.md>` · `node scripts/content/gate.mjs batch <batch.md> --with <the module's concept + article files, plus any pending-lane files a search hit names>` · `node scripts/content/gate.mjs simulate <files, apply order>` (positional only, no `--with`). No authoring has happened yet — nothing to gate this pass.

## 5. Progress ledger
`node scripts/content/ledger.mjs <seed dir> --triage coverage/<module>-triage-keys.txt --out coverage/<module>-LEDGER.md` once authoring starts. `coverage/AUN-MPT-104-triage.md` is this lane's worked triage example: source selection reasoning, OCR method + quality notes per page range, the checkpoint table, and a per-question concept table with find-existing results.

## 6. Commit rhythm
First commit landed within minutes of worktree setup; commit+push after each deliverable (S0, S1, S1b+S2+S3 as one commit). Report ≤ 20 lines to chief-of-staff, ends `HANDOFF: <branch>@<sha> · awaiting TRIAGE APPROVED`.

## 7. This lane's known traps
- **The Desktop `Year 1` folder is not all Year 1.** `CVS`, `GIT`, `RRS` (611 files, ~3.7 GB) sit physically inside it, but their bylaw codes (`CVS-206`, `GIT-207`, `RRS-209`) place them in **Second year** (Internal Bylaw 2023, pp.21-22) — the pre-existing `_Catalog/Year 1 Priority 4.md` note gets this wrong ("Seven Year 1 modules are covered: PMS, CBF, INI, MPT, CVS, RRS, and GIT"). Trust the bylaw's curriculum map (pp.19-22), not that note. Inventoried as `AUN-CVS-MISFILED-Y2` / etc., excluded from S1-S3 here.
- **Three folders have no bylaw block code**: `Terminology`, `Psychology`, `Ethics` (11 files). Plausibly sub-components of `AUN-PSM-101` or `AUN-PPS-132`, but the bylaw never says so — do not mint a module id for them without an Omar ruling.
- **Scanned finals need real OCR budget, not the bulk compilations.** `MPT mcq questions (final 2022).pdf` OCR'd cleanly on pp.1-7 (223-501 words/page) but degraded on pp.8-11 — 59/90 questions triaged but not keyed since the circled-answer glyph didn't survive OCR there; `render` just those ambiguous pages next, not a full re-OCR.
- **A printed key can conflict with the expected clinical answer.** Q47 of the MPT final (long-bone-fracture embolism question) shows a marker on "Amniotic fluid embolism" where "Fat embolism" is the textbook answer — held, not resolved by inference, per the rule that a conflict is a hold.
- **`Microbiology Questions Bank.pdf`'s native "3 words/page" is a false-negative for auto-garbled** — a CamScanner watermark, not content; `mark-garbled` was run by hand on all 44 pages before OCR.
- Live/pending overlap so far (30 concepts checked): 1 live hit (`CON-REN-E6070C296322CB`, 5-FU/thymidylate synthase), 4 pending hits (irreversible antagonist, DNA gyrase, keloid, active/reactive hyperemia — the last two are near-matches, confirm before treating as the same concept, not an automatic merge).

## 8. Walls → where the answer lives
Id/search/overlay law → `00-START-HERE.md` §3-4. Gate/tool shape → `SHARED-TOOLCHAIN.md` §Content CLI. Explanation/coverage bar → `05-questions.md`. Triage checkpoint mechanics → `13-orchestration.md` §5. Reviewer/publisher and answer-key rulings → `docs/chief-of-staff/HANDOFF.md` "Standing orders". No AUN-specific LANE-BRIEF.md exists yet — if this card stops being enough, start one rather than letting the extra detail live only in a report.
