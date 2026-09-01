# Mansoura Year 1 — source manifest summary

Generated from [`y1-sources.json`](y1-sources.json) by `scripts/mans/intake/manifest.py`
(no OCR, no page-count probe — that is S1b). 1,350 files inventoried, sha256-keyed;
**0 exact-duplicate (same-sha256) twins found**, and **0 filename collisions** within the
staging corpus either — consistent with `_Catalog/Year 1 Completion Audit.md`'s claim that
"collision-safe Telegram suffixes" were applied during acquisition, before the files
reached this Desktop tree.

## The 1,344-vs-1,343 drift — resolved: **1,344 is correct**

`_Catalog/Year 1 Priority 4.md` and the prior handover cite 1,344 academic candidates
(AEP 315, HBG 231, PPPM 422, MSS 263, HIS 113); one file in the tree cited 1,343. This
manifest recomputes the count directly from the filesystem, hash-verified:

| Archive group | pdf | apkg | docx | academic total | non-academic (apk/exe, excluded) |
|---|--:|--:|--:|--:|--:|
| AEP | 313 | 2 | 0 | 315 | 0 |
| HBG | 229 | 1 | 1 | 231 | 0 |
| PPPM | 422 | 0 | 0 | 422 | 0 |
| MSS | 263 | 0 | 0 | 263 | 1 exe (anatomy-atlas installer) |
| HIS | 113 | 0 | 0 | 113 | 0 |
| **Total** | **1,340** | **3** | **1** | **1,344** | 1 apk + 1 exe (software, not documents) |

**1,344** is the correct academic-candidate count — it matches exactly when "academic"
means document-bearing files (pdf + apkg flashcard packages + 1 docx) and excludes the
one Android `.apk` and one Windows `.exe` anatomy-atlas installer under `MSS Module -
64th/` (software, not source documents) and the one stray `.DS_Store`. The 1,343 figure
appears to be off by one from a count that dropped one of the two `.apkg` files or the
`.docx`; this manifest's per-extension breakdown (above) is the traceable source of truth
going forward.

## Corpus scope

| Corpus | Rows | What it is |
|---|---:|---|
| `year1` | 2 | The organized `Year 1/` tree — **almost entirely empty placeholder folders today**: every module folder (both the 2021-2022 baseline and the 2023-2024 schedule sets) contains only a `00 Module-wide/.DS_Store`, no real files. The 2 rows are the Semester 2 official group schedules (2023-2024). No Semester 1 schedule was found locally (`_Catalog/Missing High-Priority Downloads.md` confirms it "was not exposed by the current faculty timetable page" — a needs-Omar gap, not a scan miss). |
| `faculty-admin` | 2 | The two Official Student Guides (2020-2021, 2021-2022) at the faculty root — not Year-1-scoped as a folder, but the only local source for Year 1 module codes, credit hours and marks (2021-2022 guide, Semester 1 table, p.25). Cited directly in [`../academic/MANS-Y1-modules.md`](../academic/MANS-Y1-modules.md). |
| `staging` | 1,346 (1,344 academic + 1 apk + 1 exe) | `_Staging/Telegram Year 1/<Group> Module - 64th/` — the raw, already-organized-by-Telegram-channel document dump for the current (64th) cohort. **`unsorted: true`** in the JSON because these labels (AEP/HBG/PPPM/MSS/HIS) are Telegram cohort-channel names, **not canonical module ids** — see below. |

## Archive-group labels are not module ids

Per `_Catalog/Curriculum Map.md` ("Telegram label crosswalk"), the five Telegram channel
labels used as this tree's staging folder names do not map 1:1 onto the current-cohort
curriculum:

| Archive group | Files (academic) | Spans (per Curriculum Map) | `moduleId` in this manifest |
|---|--:|---|---|
| `AEP` | 315 | `PAEHC` + `PPP` (Semester 1, 2021-2022 baseline) | `null` — ambiguous, needs per-file evidence |
| `HBG` | 231 | `PAEHC` + `PBBG` (Semester 1, 2021-2022 baseline) | `null` — ambiguous, needs per-file evidence |
| `PPPM` | 422 | `PPP` + `PPMIP` (Semester 1, 2021-2022 baseline) | `null` — **NOT** the same as the S2 module also coded `PPPM-201`; a same-acronym false friend, see warning below |
| `MSS` | 263 | `MSS-202` (Semester 2, 2023-2024 schedule) directly | `MANS-MSS-202` |
| `HIS` | 113 | `HIS-203` (Semester 2, 2023-2024 schedule) directly | `MANS-HIS-203` |

**False-friend warning:** the Telegram-cohort label `PPPM` (422 files, Semester-1
Pharmacology+Physiology+Pathology+Microbiology+Immunology+Parasitology material under
the old 2021-2022 baseline split) is **not** the current-cohort Semester-2 module
`PPPM-201` ("Principles of Pathology, Microbiology, Parasitology & Pharmacology",
confirmed on the official 2023-2024 Semester 2 schedule, page 1). The two share an
acronym by coincidence of overlapping component subjects, not identity. Do not import
Telegram-`PPPM` files against `MANS-PPPM-201` without per-file confirmation.

## By kind × archive group (1,344 academic staging rows; filename heuristic, see below)

| Group | paper | bank | dept-book | lecture | practical | other | Total |
|---|--:|--:|--:|--:|--:|--:|--:|
| AEP | 7 | 61 | 20 | 62 | 29 | 136 | 315 |
| HBG | 4 | 34 | 13 | 87 | 11 | 82 | 231 |
| PPPM | 11 | 60 | 18 | 260 | 1 | 72 | 422 |
| MSS | 10 | 45 | 3 | 161 | 1 | 43 | 263 |
| HIS | 0 | 12 | 11 | 75 | 1 | 14 | 113 |
| **Total** | **32** | **212** | **65** | **645** | **43** | **347** | **1,344** |

**Kind is a filename heuristic, not a content read** — 1,344 files is too many to open
individually at Phase-0. The regex rules live in `scripts/mans/intake/manifest.py`
(`classify_kind_tier`): `exam`/`written`/`model answer`/`past years`/`تجميعات` → `paper`;
`mcq`/`qbank`/`questions`/`أسئلة` → `bank`; `practical`/`ospe`/`osce`/`dissection` →
`practical`; `lec`/`handout`/`seminar`/`cbl`/`L<n>` → `lecture`; `book`/`summary`/
`atlas`/`continuous`/`notes` → `dept-book`; else `other`. Precedence is paper > bank >
practical > lecture > dept-book > other, checked in that order. The large `other` bucket
(347 files, 26%) is mostly bare-topic filenames (`Osteomyelitis.pdf`, `Horner
syndrome.pdf`) and Arabic-only names without an English keyword match (`تفريغ بايو ١
بارت ٢ الحسيني.pdf`) — genuinely unclassified by filename, not miscoded; S1 triage per
module will re-read these against the cached page text instead of the filename.
`HIS` shows `paper: 0` because its four exam-shaped files (`His Final Book.pdf`, `HIS 1-
MCQ-scan.pdf`, `Histo HIS Important MCQ.pdf`, `His Continuous Berlin Book 2026.pdf` — the
Priority-4 set, see `coverage/MANS-Y1-priority-sources.md`) are all named as banks/books,
not as "exam" — worth a manual look during S3 triage since a "Berlin Book" is typically
compiled from a run of past written exams.

## Needs Omar

- No official Semester 1 schedule (2023-2024 or any dated year) was found locally for
  the current cohort — the S1 module set used throughout this lane's Phase-0 output is
  the 2021-2022 guide baseline (`HR`, `MT`, `PAEHC`, `PBBG`, `PPMIP`, `PPP`), unconfirmed
  against a dated timetable. See `academic/MANS-Y1-modules.md`.
- No marks/credit-hour distribution was found locally for the four current-cohort S2
  modules (`PPPM-201`, `MSS-202`, `HIS-203`, `ECE-204`, `UNI-204`) — the `00
  Administration/Plans and Mark Distribution/` folders under both semesters exist but are
  empty. Only module codes and component subjects are locally confirmed (from the
  2023-2024 schedule's title page and color-coded legend).
