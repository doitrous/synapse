# LANE-CARD — Fayoum University Year 1 (fu)
Read this card first. Open the full manual only when you hit a wall; name the wall in your
report. Phase-0 status: S0–S3 done, awaiting **"TRIAGE APPROVED"** from the chief of staff.
Mint nothing and author nothing until then.

## 1. Identity and ids
University id `fu`. Year id `FU_Y1`. Module ids `FU-<CODE>` — only `FU-NS101` is a
faculty-printed code (cover of `uni book 2024 -2025.pdf`: *"Normal Structure I / NS 101"*);
the rest (`FU-NS2`, `FU-DM1`, `FU-DM2`, `FU-MSK1`, `FU-MSK2`, `FU-NEURO1`) are this lane's own
derivation from printed titles/filenames, plus two unresolved placeholders
(`FU-DM-unconfirmed`, `FU-NS-unconfirmed`) — see `academic/FU-Y1-modules.md`. Concept id
`CON-<SYSTEM>-<14hex>` (standard mint, university-blind). Question id not yet minted (Phase-0).
Files: `docs/Fayoum-Source-Imports/{manifest,academic,coverage}/` today; `{concept,article,
question,evidence,pending-live}/` once authoring starts.

## 2. The ten rules that cannot bend
Same ten as every lane (00-START-HERE.md, SHARED-TOOLCHAIN.md). This lane's own addition:
**`10 Anatomy MCQs Head & neck.pdf` is a third-party commercial bank** (Biotest Inc., 1999
copyright notice on its own p49) reused via a Telegram bot, not Fayoum-authored — do not
author from it without an explicit Omar ruling on the copyright question, on top of the
usual search-before-mint rule.

## 3. Read text, don't look at pictures
Organized source root: `/Users/doitrous/Desktop/Universities/Fayoum University/Faculty of
Medicine/Year 1/` (4 folders: Disease Mechanism, Musculoskeletal, Neuroscience, Normal
Structure, each holding a `_Telegram FYM Bots/` subfolder — 16 files total, already on
Desktop, nothing to fetch). `node scripts/content/pagetext.mjs show "<pdf>" --pages a-b`
(≤ 3 pages/call), `status` first. Readability index:
`coverage/FU-Y1-readability-index.md`. Two sources are scanned and blocked:
`_physiology of normal structure module 2023.pdf` (0 words, not OCR'd — not a priority
exam/bank) and `امتحانات فارما عملي.pdf` (OCR attempted, failed — non-language garbage on
every page). **Use existing Desktop sources only — do not download or move anything.**
Telegram fetching is retired; a gap needing a new source is "needs Omar sources", not a
fetch task.

## 4. Author: seed → emit → gate
Not started. Once TRIAGE APPROVED: seed dir `docs/Fayoum-Source-Imports/seed/<module>/` ·
`node scripts/content/emit-mcq.mjs <seed.json> --out <batch.md>` ·
`node scripts/content/gate.mjs batch <batch.md> --with <the module's concept + article
files>` · `node scripts/content/gate.mjs simulate <files in apply order>` (positional only,
simulate has no `--with`) · never read the `.gates/` log unless the summary shows errors.

## 5. Progress ledger
Not started. Once authoring begins: `node scripts/content/ledger.mjs <seed dir> --triage
coverage/FU-<CODE>-triage-keys.txt --out coverage/FU-<CODE>-LEDGER.md` after every commit.

## 6. Commit rhythm
S0–S3: one commit per deliverable, pushed immediately (this lane's actual rhythm this pass —
5 commits: manifest, academic, readability index, priority set, triage). Once authoring
starts: commit + push every 5–10 questions. Report ≤ 20 lines, ends
`HANDOFF: <branch>@<sha> · resume-first: <next>`.

## 7. This lane's known traps
- **Module codes are mostly unofficial.** Only `NS 101` is faculty-printed; the rest are this
  lane's derivation from cover titles/filenames — get Omar's sign-off before they're treated
  as final, and definitely before any importer sees them.
- **No marks/credit-hour figure exists anywhere in this 16-file corpus** (grepped, 231 hits
  on `credit|marks|semester|module|bylaw`, zero named a mark or credit value). Don't invent
  one; it's a standing "needs Omar" gap, not something a wider grep will fix.
- **Two Disease Mechanism sources and one Normal Structure source can't be placed I vs II**
  from their own text (`Para department book .pdf`, `Important Q.pdf`,
  `_physiology of normal structure module 2023.pdf`) — logged `FU-DM-unconfirmed` /
  `FU-NS-unconfirmed`, not guessed into a real module id.
- **`10 Anatomy MCQs Head & neck.pdf` mixes chapters.** Sampled pp1–4 are Abdomen/GI-autonomic
  plus a Thorax chapter header (out of scope); sampled pp20, 30 are genuine Head & Neck (in
  scope). Full in-scope range across all 50 pages not yet mapped.
- **`7- Physiology MCQ of Autonomic Nervous System.pdf` has zero printed keys** across all 34
  questions, read in full — every one needs editorial keying (rule 10) before authoring.
- **Anatomy MCQ bank text is garbled** (broken word-spacing) but each question's single-letter
  key survives inline — read carefully, don't assume garbled = unkeyed.
- **Physiology-of-Normal-Structure and the pharma practical exam are both scanned and
  currently unreadable** (0-word text; OCR on the pharma file returns non-language garbage at
  300dpi psm 6/4). Don't retry OCR without reason to expect a different result — "needs Omar".
- Autonomic-physiology and cranial-nerve concepts here heavily overlap Kasr's 102-INT module
  and Alexandria's AU-MED-102 (11 of 27 sampled concepts are pending-hits there) — expect the
  same pattern in the other six Fayoum Year 1 modules.

## 8. Walls → where the answer lives
Id/search/overlay law → `00-START-HERE.md` §3–4. Staged pipeline / triage checkpoint shape →
`13-orchestration.md` §4–5. Gate/tool shape → `SHARED-TOOLCHAIN.md` §Content CLI. This lane's
own state: `manifest/y1-sources.{json,md}` (S0), `academic/FU-Y1-modules.md` (S1),
`coverage/FU-Y1-readability-index.md` (S1b), `coverage/FU-Y1-priority-sources.md` (S2),
`coverage/FU-NEURO1-triage.md` + `-triage-keys.txt` (S3) — read these before re-deriving
anything this lane already found.
