# LANE-CARD — MUST University Year 5 (must, `MUST_Y5`)
Read this card first. Phase-0 (survey/structure/triage) is done; **TRIAGE APPROVED is
still pending from the chief of staff** — nothing below authorizes minting yet.

## 1. Identity and ids
University id `must` (shared with Year 1 — see `LANE-CARD.md` for that lane). Year id
`MUST_Y5`. Module id prefix `MUST-<CODE>`, faculty codes verbatim (`MUST-MED501`,
`MUST-SUR502-1`, …) — full list with hours/marks in `academic/MUST-Y5-modules.md`.
Concept id `CON-<SYSTEM>-<14hex>` (standard mint, university-blind — search every
`docs/*-Source-Imports` and `docs/import-ready` first, Kasr Years 2-5 included, this
year's clinical concepts are likely to overlap). Question id
`QST-MUST-<MODULE-SLUG>-<TOPIC>-Q<N>`. Files:
`docs/MUST-Source-Imports/{concept,article,question,evidence,coverage,academic,manifest}/`.
**MUST is local-only Draft — never import into production, never run the importer.**
Pushing this branch (`must-y5-phase0`) to origin is backup, not upload.

## 2. What Phase-0 produced
- `manifest/y5-sources.json` + `.md` — 772 files, sha256/size/ext/module-kind-tier
  guess per row, 38 exact-duplicate twin groups.
- `academic/MUST-Y5-modules.md` — 20 modules (11 in Semester 501, 9 in 502) with
  faculty codes, hours, and marks, sourced from the 501 plan PDF, the 502 registration
  screenshot, and both semesters' midterm/final syllabi. Two open items: an unrostered
  "Law and Human Rights" elective folder, and a MED501 midterm-marks conflict (15 vs 22
  across two sources) — both need an Omar ruling.
- `coverage/MUST-Y5-readability-index.md` — full-corpus extraction pass (background
  job; check it exists and is committed before trusting it — see §7).
- `coverage/MUST-Y5-priority-sources.md` — tiered source list per module, plus two
  cross-cutting flags: a recurring `601`/`402`/`602` filename pattern that matches no
  Y5 module code (needs a scope check before use), and shared "Zatoona"/"@AUDatabot"-
  branded banks (not MUST-authored, note origin in `field_notes`).
- `coverage/MUST-MED501-triage.md` + `-triage-keys.txt` — first-module deep triage.
  56 questions read / 38 keyed / 29 concepts (0 live, 1 pending, 28 new) / 18 blocked
  (answer-only recall notes, no recoverable stem — needs Omar).

## 3. Read text, don't look at pictures — with one exception
`node scripts/content/pagetext.mjs show "<pdf>" --pages a-b` (≤3 pages/call), `status`
first. **Trap found in MED501 and likely repeated elsewhere:** some "solved" MCQ banks
mark the correct answer with a coloured highlight in the original document — the
highlight does not survive `pdftotext` extraction, so `pagetext.mjs show` returns
clean, ungarbled text with **no visible key at all**. `status` will not catch this
(words > 0, not garbled). If a file is named "solved"/"محلول"/"answered" and the
extracted text shows no marked answer, re-read it with the Read tool directly (works
fine on PDFs ≤ ~20 pages) before assuming the key is unrecoverable — do not jump to
`render`, the text itself is legible, only the colour is lost.

## 4. Author: seed → emit → gate (not started)
No seeds exist yet. When TRIAGE APPROVED lands, follow the general ASU/AU route
(`scripts/content/emit-mcq.mjs`, `scripts/content/seed.schema.md`) — MUST Year 5 has no
module-specific generator the way MUST Year 1 does (`scripts/must/build-fhb102-2-
authoring-slice.mjs`, FHB-102-2 only). Gate every batch: `node scripts/content/gate.mjs
batch <file> --with <its concept + article files>` then `gate.mjs simulate <files>`.

## 5. Progress ledger
No seed directory exists yet — `ledger.mjs` will find nothing until S2 authoring
starts. Progress for now is this card plus the checkpoint table in
`coverage/MUST-MED501-triage.md`.

## 6. Commit rhythm
Small commits, push after every one (backup, not upload — see §1). This phase-0 pass
landed in 3 commits (manifest+academic, priority-set+triage, this card). Report ≤ 20
lines, ends `HANDOFF: <branch>@<sha> · awaiting TRIAGE APPROVED`.

## 7. This lane's known traps
- Highlighted (not printed-glyph) answer keys — see §3.
- Folder name is not a reliable kind signal: files filed under `08 Midterm Exams` /
  `06 EOM Exams` include department teaching notes, not just papers — open before
  trusting `manifest.json`'s `kindGuess`/`tierGuess` columns.
- Several files carry course codes (`601`, `402`, `602`) that match no Y5 module in the
  plan documents — scope each one before treating it as this year's material.
- Some "previous questions" files are a student's own answer-recall list, not a
  transcribed exam — may have answers with no recoverable question stems (see MED501
  Source B). Triage these as read, not as keyed, and flag needs-Omar rather than guess
  a stem.
- Semester 502's own module list exists **only** as a registration-app screenshot (no
  PDF/text source) — read visually, not via `pagetext.mjs` (PDF-only).
- The 20-subject taxonomy list (00-START-HERE.md §3) has no dedicated Rheumatology/
  Immunology or Family-Medicine/Palliative-Care slot — placement for those modules'
  concepts is TBD, not yet ruled on.

## 8. Walls → where the answer lives
Id/search/overlay law → `00-START-HERE.md` §3-4. Gate/tool shape →
`SHARED-TOOLCHAIN.md` §Content CLI. Staged pipeline / triage checkpoint →
`13-orchestration.md` §4-5. Year 1's own conventions (different branch, same
university id) → `LANE-CARD.md` + `codex/must-year1-content`'s `CLAUDE-HANDOVER.md`.
