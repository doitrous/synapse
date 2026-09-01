# LANE-CARD — MUST University Year 2 (must), addendum to LANE-CARD.md
Read `LANE-CARD.md` first — identity, the ten rules, and MUST's never-upload
standing order all apply unchanged. This file is the Year 2-specific
addendum (kept separate, not folded into the Year 1 card, per
13-orchestration.md's 6,000-byte guidance). **Status: Phase-0 triage only —
no concept minted yet.** Work happens on branch `must-y2-phase0`, on `main`
(not `codex/must-year1-content` — that branch is Year 1's own worktree; do
not touch Year-5 paths, a parallel Phase-0 lane owns those).

## 1. Identity and ids (Year 2 specifics)
Year id `MUST_Y2`. Module ids `MUST-<CODE>` from the faculty's own printed
module folder name, spaces to hyphens: `MUST-CVS-201`, `MUST-HIM-201`,
`MUST-RES-201`, `MUST-METABOLISM-I`, `MUST-DHB-202-1`, `MUST-DHB-202-2`,
`MUST-END-202`, `MUST-METABOLISM-II`, `MUST-RESEARCH-METHODOLOGY`,
`MUST-PCD-200`. `MUST-INCISION-201` exists as a source-tree folder but is
**not** a confirmed gradable module (needs Omar, see academic doc). Files:
`docs/MUST-Source-Imports/{manifest,academic,coverage}/` for Phase-0;
`{concept,article,question,evidence}/` once TRIAGE APPROVED reaches S2.

## 2. Source root and corpus shape
`/Users/doitrous/Desktop/Universities/MUST/Year 2/` — `Semester 201/` (CVS
201, HIM 201, RES 201, Metabolism I, Incision 201) and `Semester 202/` (DHB
202-1, DHB 202-2, END 202, Metabolism II, Research Methodology, PCD 200),
plus a `Semester-wide Resources/` pool (not a module) in both semesters.
1,583 files. Kind folders follow Year 1's convention exactly: `01 University
Material` (lecture), `02 DPT BOOK` (book), `03 Practical and OSPE`,
`04 Summaries and Revision`, `05 MCQs` (bank), `06 EOM Exams` (paper, tier
1), `08 Midterm Exams` (paper, tier 2). Both semesters' official
Plan-and-Marks PDFs are scanned/garbled — cite
`/Users/doitrous/Desktop/Universities/MUST/00 Modules and Marks
Reference.md`'s existing transcription instead of re-OCRing.

## 3. First module and why
`MUST-CVS-201` — exam-richest by tier-1+2 combined (110 sources: 87 MCQ-bank
+ 23 exam papers), across 6 subjects. `MUST-DHB-202-2` is close behind (102)
and is the recommended second module. See `coverage/MUST-Y2-priority-
sources.md` for the full ranking and `coverage/MUST-CVS-201-triage.md` for
the first-tranche triage (19 questions / 17 concepts triaged to completion;
~650 tier-1-3 sources remain for later passes).

## 4. Deliverables map
`manifest/y2-sources.{json,md}` (S0) · `academic/MUST-Y2-modules.md` (marks
citation) · `coverage/MUST-Y2-readability-index.md` (S1b, `pagetext.mjs
index`) · `coverage/MUST-Y2-priority-sources.md` · `coverage/MUST-CVS-201-
triage.md` + `-triage-keys.txt` (S1, first tranche only — **STOPPED, awaiting
"TRIAGE APPROVED" before any concept mint**, per 13-orchestration.md §5).

## 5. This addendum's known traps
- CVS-201's "05 MCQs" folders are **not necessarily MCQs** — the two sources
  triaged so far are both written/short-answer papers despite the folder
  label; verify format per-file, don't assume from the folder name.
- The same MCQ file is frequently re-filed under two or more subject
  subfolders within one module, or shared verbatim between `CVS 201` and
  `RES 201` (overlapping Anatomy syllabus) — 37 exact-duplicate groups / 80
  files already collapsed via `duplicateOf` in the manifest; check it before
  triaging a file twice.
- `Incision 201` and the Research-Methodology/Medical-Ethics split are both
  needs-Omar (see `academic/MUST-Y2-modules.md`) — do not guess marks or
  module status for either.

## 6. Walls → where the answer lives
Same as `LANE-CARD.md` §8, plus: Year 2 triage method and checkpoint-table
shape → `13-orchestration.md` §5. This addendum's own priority order for
modules 2+ → `coverage/MUST-Y2-priority-sources.md`.
