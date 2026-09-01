# LANE-CARD — Helwan University Years 2–3 (hu)

Phase-0 only. Branch `helwan-y2-y3-phase0`, off `origin/main`. Nothing minted, nothing
authored — this lane surveys, structures and triages. It stops and waits for the
chief of staff's "TRIAGE APPROVED" (see `HANDOFF.md` on `claude/helwan-content-orchestration-8fe5ec`,
local-only, not pushed — GitHub rejected the branch, it touches a workflow file the token
can't push).

## 1. Identity and ids

University id `hu`. Years `HU_Y2`, `HU_Y3`. Module ids `HU-<CODE>`: `HU-INH-201`,
`HU-Community-202`, `HU-NSS-203`, `HU-CRS-204` (Year 2); `HU-GIT-301`, `HU-URS-303`,
`HU-FTF-304`, `HU-ORL-305` (Year 3). All 8 confirmed present and unchanged against the old
board's 12-module catalogue (4 Year 1 + these 8) — see `academic/HU-Y2-modules.md` and
`academic/HU-Y3-modules.md`.

## 2. Year 2 has files, not sources

75 files on disk (`manifest/y2-sources.json`, re-hashed from
`/Users/doitrous/Desktop/Universities/helwan/Year 2/`), matching `00 Organization Summary.md` —
not the old board's 68. But **every one of the 63 PDFs is administrative**: schedules, mark/
result rosters, student-distribution lists, portfolios, absence lists, assessment checklists
(`coverage/HU-Y2-readability-index.md`). No department book, lecture set, MCQ compilation, or
past-paper PDF exists anywhere in Year 2. Under the question-led scope rule, **there is nothing
to author in Year 2 yet** — it is a Telegram-fetch gap for all four modules, not a triage
backlog. Community 202 additionally has no subject-level material at all, only Administration.

## 3. Year 3 is the opposite: rich, but OCR-heavy

71 files (`manifest/y3-sources.json`, matches Organization Summary, not the old board's 70).
GIT 301, FTF 304 and ORL 305 all carry real department books, core notes and MCQ banks; URS 303
has no marks/schedule and only 3 past-question PDFs (confirmed by its own
`Administration/00 Source availability note.md`, an authenticated Telegram search that came back
empty). ~26 of 63 Year 3 PDFs are fully or mostly garbled (0 extracted words) — mostly
handwritten or scanned-image notes — see the ordered OCR-priority list in
`coverage/HU-Y3-priority-sources.md`. FTF 304's own 60-mark quiz allocation names Family
Medicine (15) and Community Medicine (15) sub-syllabi with **no matching source folder** — only
its Forensic+Toxicology 30 marks are backed by offline content.

## 4. GIT 301 is the richest Year-3 module — triage recovered

Two prior lanes (A: Anatomy/Histology/Physiology, ~660 questions, narrative-only; B: Pathology/
Pharmacology/Parasitology/Biochemistry, 302/302 keyed, 281 concept keys, machine-triaged)
covering all 7 GIT 301 subjects — the widest spread of any Year 3 module. Recovered from
`claude/helwan-content-orchestration-8fe5ec` and re-verified against current live/pending state
via a 31-key stratified sample (all live-hit, all pending-hit, 10 sampled new): **zero drift**
since the 2026-08-22 freeze. Full detail: `coverage/HU-GIT-301-triage.md` +
`HU-GIT-301-triage-keys.txt`. Lane A's machine-readable triage does not survive — a resume needs
to re-triage Anatomy/Histology/Physiology from source or work from the checkpoint's numbers only.

## 5. Catalogue gap (open, not this lane's to fix)

No `oph`/`ent` subject ids exist. ORL 305's Ophthalmology and ENT both fall to `mul` by
elimination — same gap the old board flagged (pre-ruled: accept `mul` with a `field_notes`
reason). Noted here again for Years 2–3, not fixed.

## 6. Needs Omar / walls

- Year 2: every module needs a real Telegram-sourced teaching/question pull before anything is
  authorable. Telegram fetching itself stays retired — log, do not act.
- Year 3 OCR debt (`coverage/HU-Y3-priority-sources.md` § OCR priority) blocks GIT-301-A anatomy
  key recovery and most of ORL-305 Ophthalmology's per-topic notes.
- GIT-301 structure files A and B (recovered, unmerged) need one orchestrator merge pass before
  any import — the importer wants a single `- Module [ID]` outline block.

## 7. Walls → where the answer lives

Same as Year 1's card (`LANE-CARD.md` §8): id/search/overlay law → `00-START-HERE.md` §3–4;
gate/tool shape → `SHARED-TOOLCHAIN.md` §Content CLI; explanation/coverage bar →
`05-questions.md`; standing orders and hazards → `claude/helwan-content-orchestration-8fe5ec`'s
`LANE-BRIEF.md` (recovered rules on subject-id placement, mint law, answer-key hiding spots).
