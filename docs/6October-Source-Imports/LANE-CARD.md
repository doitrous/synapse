# LANE-CARD -- 6 October Univ. Year 1 (o6u)
**No separate LANE-BRIEF.md exists -- this card is the brief.** Read this card first; open the full manual only at a wall named in your report.

## 1. Identity and ids
University id `o6u` (registered in `src/data/universities.ts` as an empty shell -- confirm live on `origin/main` before minting; do not add the entry yourself). Year `O6U_Y1`. Module ids `O6U-<CODE>` -- eight bylaw-confirmed Year 1 modules: `O6U-IBS-101`, `O6U-IBF-102`, `O6U-IHI-103`, `O6U-IMB-104` (Sem 1), `O6U-IMN-105`, `O6U-IMP-106`, `O6U-IPA-107`, `O6U-IPH-108` (Sem 2), per Internal Bylaw 2023 p.17. All eight have Desktop material via 7 combined folders (`IBS-101`+`IBF-102` share one, `IBS-IBF`, not separable file-by-file). `SKL-1/2`/`PRF`/`ELE-1/2` (pass-fail) have **no folder at all** -- needs Omar sources. Files: `docs/6October-Source-Imports/{concept,article,question,evidence,coverage,pending-live,manifest,academic}/`.

## 2. The ten rules that cannot bend
Same ten as every lane (13-orchestration.md §11's DISPATCH/LANE-BRIEF skeleton). Corpus root `/Users/doitrous/Desktop/Universities/6 October University/Faculty of Medicine`. Concept ids mint university-blind -- search live + every `docs/*-Source-Imports` + `docs/import-ready` before minting (00-START-HERE.md §4); O6U Y1 body-structure/function content overlaps heavily with Kasr `101-ISK` and Alexandria `AU-MED-102/103/105` (§7) -- 67% of searched concepts already exist.

## 3. Read text, don't look at pictures
`node scripts/content/pagetext.mjs show "<pdf>" --pages a-b` (<=3 pages/call), `status` first. **Small, pre-curated corpus**: a prior local pass (`Year 1/_Catalog/Year 1 Priority 4.md`) cut Year 1 to 28 files across 7 folders (4 each) from Telegram bot `@O6Umed_Diaa_bot` -- no larger pool behind them. Most exam papers are 0-word-native scans needing OCR; the two `mid module BOS 101` papers are the exception -- fully native, fully keyed. Readability index: `coverage/O6U-Y1-readability-index.md`. Visually-marked keys (red/underline/highlight) -> `pagetext.mjs keys` first; render only when it reports no text layer or ambiguous.

## 4. Author: seed -> emit -> gate
seed dir: `docs/6October-Source-Imports/coverage/seeds/<module>/` (not created yet, pre-TRIAGE-APPROVED) * `node scripts/content/emit-mcq.mjs <seed.json> --out <batch.md>` * `node scripts/content/gate.mjs batch <batch.md> --with <module's concept+article files, plus any pending-lane files a search hit names>` * `node scripts/content/gate.mjs simulate <files, apply order>` (positional, no `--with`). Nothing authored yet.

## 5. Progress ledger
`node scripts/content/ledger.mjs <seed dir> --triage coverage/<module>-triage-keys.txt --out coverage/<module>-LEDGER.md` once authoring starts. `coverage/O6U-IBS-IBF-triage.md` is the worked example: source selection (why the Moodle-export mid-modules beat two larger banks), key-recovery method, checkpoint table, per-question concept table with find-existing hits.

## 6. Commit rhythm
First commit within minutes of worktree setup; commit+push after each deliverable (S0, S1+S1b, S2+S3, LANE-CARD). Report <=20 lines to chief-of-staff, ends `HANDOFF: <branch>@<sha> · awaiting TRIAGE APPROVED`.

## 7. This lane's known traps
- **Desktop folder names use the old (2018/2020) block codes, not the current 2023 bylaw codes.** `GMD`=pathology (`O6U-IPA-107`), `DRG`=pharmacology (`O6U-IPH-108`), `MEN`=metabolism (`O6U-IMN-105`), `MBI`=molecular biology (`O6U-IMB-104`), `HID`=hemato/histology (`O6U-IHI-103`). The bylaw's course table (p.17) is the only one in that 25-page document, covering exactly Semester 1+2 -- no Year-2 misfiling risk here, unlike Assiut.
- **`IBS-IBF` folder cannot be split file-by-file** between `IBS-101`/`IBF-102` -- all 4 files are branded "BOS 101", the old combined course. Manifest records it as `O6U-IBS-101+IBF-102`; splitting at S2 is an open call.
- **A Moodle quiz-export format hides a printed key in plain sight.** `mid module BOS 101 module 1/2.pdf` state `"<pct>% of respondents (<n> of <total>) answered this question correctly"` per question, then list every option's vote count -- the option whose count equals `<n>` is correct. 49/50 questions resolved this way; watch for ties (M2-Q6, IVC vs portal vein both 81/197) -- a tie is a hold, not resolved by clinical inference even when the "obvious" answer is clear.
- **`Pathology Q Bank.pdf` (401p, `O6U-IPA-107`) only prints keys in its 6 chapter-ending "True or False" sections** (9 of 401 pages: 246-248, 279-280, 299, 399-401). Its much larger MCQ portion has no visible key in plain-text extraction -- do not assume the whole bank is keyed from its 0-garbled readability score.
- **Low-word-count-but-not-garbled files may be image-heavy, not clean.** `Bio questions.pdf`, `MBI final exam.pdf` (`IMB-104`), `Metabolism mid exam (2).pdf` (`IMN-105`) read 0 garbled pages but 18-122 words over 6-15 pages -- verify before trusting the readability index.
- **Several keys resolve to a plurality under 50%**: M1-3 monocyte origin (44%), M1-21 membrane proteins (36-45%), M1-23 atropine (32-37%), M2-10 reticular-fiber stain (47%). Still the printed-correct answer, flag for a second look.
- Live/pending overlap (37 checked): 6 live (monocyte origin, glycocalyx/cell coat, glutathione, celiac disease, reticular fibers, gap junctions -- last two different context, confirm scope), 18 pending (mostly Kasr `101-ISK`/`103-BMS`, Alexandria `AU-MED-102/103/105`), 12 new.
- `CTX`/`CSC` (older codes) unaccounted for -- `CTX` confirmed not Y1 by the Priority 4 note; `CSC` needs Omar.

## 8. Walls -> where the answer lives
Id/search/overlay law -> `00-START-HERE.md` §3-4. Gate/tool shape -> `SHARED-TOOLCHAIN.md` §Content CLI. Explanation bar -> `05-questions.md`. Triage checkpoint -> `13-orchestration.md` §5. Reviewer/publisher, answer-key rulings -> `docs/chief-of-staff/HANDOFF.md` "Standing orders". No O6U LANE-BRIEF.md yet -- start one if this card isn't enough.
