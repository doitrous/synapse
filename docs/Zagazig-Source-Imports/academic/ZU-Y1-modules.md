# Zagazig University Year 1 — curriculum

Faculty of Medicine, Zagazig University (main campus — not Fakous, a different faculty;
see "Provenance flag" below). Official program page: `http://www.medicine.zu.edu.eg/`.

Source: `00 Administration/Plans and Mark Distribution/Internal Bylaw 2023 - 5+2
Credit-Point Program.pdf` (48 pages, scanned — no text layer on any page per
`pagetext.mjs status`). OCR'd this session in full (`pagetext.mjs ocr --pages 1-48`,
English model — the codes and numerals in this Arabic-language bylaw print in Latin
script/Western numerals, so English OCR recovers them even though it cannot read the
surrounding Arabic prose). Curriculum table confirmed via
`node scripts/content/pagetext.mjs grep "<bylaw.pdf>" "MED-1|UNI-1|E-109"` → page 26,
9 hits, all 8 Year 1 codes plus the elective present.

## Program structure (page 25-26)

"Phase I (pre-clerkship), First year / 1st and 2nd semesters (S1+S2): 60 points / 34
weeks" — a 5+2 credit-point program, 318 points total across the whole program (per the
Desktop-side prior read of this same bylaw, not independently re-derived this session).
Split: written 40% / practical 30% / year-work 30% (same prior-read note; not yet
re-confirmed against a clean page render — see "OCR confidence" below).

## Year 1 modules

| Code | Module id | Title (as printed) | Points | Weeks | Marks | Notes |
|---|---|---|---:|---:|---:|---|
| UNI-101 | `ZU-UNI-101` | Human rights | — | — | — | Row present p26 but OCR-garbled past the code; title from Desktop catalog note, not independently re-read clean this session |
| MED-102 | `ZU-MED-102` | Principles of Study of Medicine and Medical Terminology | — | — | — | Title confirmed directly from primary source, not the bylaw: `Year 1/Medical Terminology/01 University Material/Handout - Principles of Study of Medicine and Medical Terminology MED-102 2023.pdf` p1 (`pagetext.mjs grep`, clean native text, no OCR needed). Marks row on bylaw p26 OCR-garbled ("2 are") |
| MED-103 | `ZU-MED-103` | Basic Structure and Function | 12 | 8 | 180 | Bylaw p26, clean OCR read: `MED-103 Basic Structure and Function | 12 | 8 | 180` |
| MED-104 | `ZU-MED-104` | Musculoskeletal & Integumentary systems | 12 | 8 | 180 | Bylaw p26; the "12" printed as a garbled "2" in this OCR pass, weeks/marks clean. Points value taken from the Desktop catalog's own re-read as 12, consistent with every other module's 12/8/180 pattern |
| MED-105 | `ZU-MED-105` | Professional practice I: professionalism | 3 | 45 (marks) | — | Bylaw p26 title clean; points/marks cell OCR-garbled ("Peo os /week"). Desktop catalog states 3 pts / 45 marks — not independently re-confirmed this session, flag below |
| MED-106 | `ZU-MED-106` | Cardiopulmonary systems | 12 | 8 | 180 | Bylaw p26, clean OCR read |
| MED-107 | `ZU-MED-107` | Digestive system & Nutrition | 12 | 8 | 180 | Bylaw p26, clean OCR read. Corpus folder is named "GIT and Nutrition" (GIT = gastrointestinal tract = digestive system) |
| MED-108 | `ZU-MED-108` | Professional practice II: basic clinical skills 1 | 3 | 45 (marks) | — | Bylaw p26 title clean; points/marks cell OCR-garbled, same pattern as MED-105. Desktop catalog states 3 pts / 45 marks, not independently re-confirmed |
| E-109 | not minted | Elective | — | — | — | Row present p26, title/marks fully OCR-garbled ("ont"). No elective folder exists in either the organized `Year 1/` tree or `_Staging` — **no source material recovered for this row at all** |

"Community Issues" (a `_Staging` folder name, combined with Human Rights as "Human
Rights and Community Issues") does not appear as its own bylaw code on page 26 — it may
be a component of UNI-101 or an uncoded add-on. **Unknown — needs Omar.** Not minting a
separate module id for it.

## OCR confidence

Every points/weeks/marks cell above came from **one** OCR pass (English model, scanned
Arabic-embedded-Latin table) unless marked "clean OCR read", in which case the code,
title and all three numeric columns printed legibly. The garbled cells (UNI-101, MED-102,
MED-105, MED-108 marks) match a prior Desktop-side transcription
(`_Catalog/Official Curriculum Completeness Check.md`, dated 2026-08-30) closely enough
that both passes likely recovered the same underlying scan artifacts — this is **not**
two independent confirmations, since both are OCR of the same low-quality scan. Treat the
garbled cells as **provisional** until either a cleaner-DPI render or an official
non-scanned copy of the bylaw is available. 40/30/30 written/practical/year-work split
is a program-wide rule (article-level, not per-module) and was not re-verified against a
specific bylaw page this session.

## Semester split

Bylaw p26 does not itself state which modules sit in S1 vs S2. `00 Administration/
Schedules/` gives partial, indirect evidence:

- `Timetable - S1 21 Oct to 7 Dec 2023 - S&F and Professionalism.pdf` → MED-103
  (Structure & Function) and a "Professionalism" module (MED-105) sit in **S1**.
- `Timetable - Musculoskeletal 5 Dec 2023.pdf` and `Timetable - Musculoskeletal 5 Dec
  2023.pdf` overlapping the same window as S&F suggests MED-104 also sits in **S1** (same
  academic-year timetable window, early Oct–Dec).
- `Timetable - Semester 2 Cardiopulmonary.pdf` → MED-106 (Cardiopulmonary) sits in **S2**,
  named explicitly.
- No local schedule file names Medical Terminology (MED-102), GIT/Nutrition (MED-107),
  Professional Practice II (MED-108), Human Rights (UNI-101), or the elective (E-109) —
  **semester placement for these five: unknown — needs Omar** (or a cleaner bylaw render;
  the Telegram message index groups PP II, Cardiopulmonary and GIT/Nutrition together
  under "Semester 2" — see `_Catalog/Telegram Message Index.md` on Desktop — consistent
  with, but not primary confirmation of, MED-106's schedule-file evidence above).

## Provenance flag — Fakous vs Zagazig (needs Omar, blocks nothing at S0/S1 but must
be resolved before S2 authoring)

617 of 640 inventoried files (`manifest/y1-sources.md`, `staging` corpus) come from a
Telegram source explicitly named **"Fakous Medical Data"** — and the Desktop-side audit
that produced this dump states outright: *"Fakous is a different faculty"*
(`_Catalog/Official Curriculum Completeness Check.md`) — yet also: *"the supplied source
is named `Fakous Medical Data`, but its Year 1 index explicitly mixes/labels Zagazig and
Fakous variants. Both were retained because the user supplied this index for Zagazig
University"* (`_Catalog/Year 1 Completion Audit.md`). This is the same pattern flagged
in FOMSCU's lane (`docs/FOMSCU-Source-Imports/LANE-CARD.md` §7: a FOMNINU file "is a
different faculty — excluded from S3 triage though content overlaps heavily").

**This session did not fetch anything from Telegram** — the standing rule retiring
Telegram fetching (2026-08-27) is respected; this material was already staged on Desktop
by an earlier pass (dated 2026-08-30, after that retirement — provenance of that earlier
pass itself is outside this lane's visibility). It is inventoried here only because it
already sits under the Desktop source tree this lane was pointed at.

**Needs Omar**: a ruling on whether Fakous-labeled material may be treated as Zagazig
Year 1 source material for authoring (module codes/curriculum structure/module folder
names line up exactly with the confirmed Zagazig bylaw, which is reassuring but not
proof of institutional identity), or whether it must be excluded/relabeled the way
FOMSCU excluded its FOMNINU file. **No concept or question authoring should draw on the
`staging` corpus until this is resolved** — separate from and in addition to the general
"TRIAGE APPROVED" gate this lane is already waiting on.
