# FOMSCU Year 1 — source manifest summary

Generated from [`y1-sources.json`](y1-sources.json) by `scripts/fomscu/intake/manifest.py`
(no OCR, no page-count probe — that is S1b). 520 files inventoried, sha256-keyed;
**0 exact-duplicate (same-sha256) twins found** across the whole set, including between
the organized `Year 1/` tree and the raw `_Staging/Telegram Year 1` dump — the files
placed into `Year 1/` were moved, not copied, from the Telegram archive, so nothing
collapses on hash. (No cross-year-copy / re-export "name-twin" pass has been run yet —
sha256-identity only. See "Staging" below for why 395 of the 520 rows are not module-
classified.)

## Corpus scope

| Corpus | Rows | What it is |
|---|---:|---|
| `year1` | 122 | The organized `Faculty of Medicine/Year 1/` tree — modules, subjects, exam/QBank folders |
| `faculty-admin` | 3 | Whole-program bylaws + handbook at the faculty root (`00 Administration/Plans and Mark Distribution/`) — not year-scoped, but the only source for Year 1 module codes/marks |
| `staging` | 395 | `_Staging/Telegram Year 1/FOMSCU Lectures 2025-2030/` — the raw Telegram channel document dump, not yet triaged into module/subject folders |

## By extension (520 rows, all corpora)

| ext | count |
|---|---:|
| pdf | 428 |
| pptx | 61 |
| md | 13 |
| json | 12 |
| docx | 4 |
| ppsx | 1 |
| jpg | 1 |

## `year1` corpus — by module × kind (122 rows; Year-1-level and administration rows excluded from this table, see below)

| Module | paper | bank | lecture | practical | other | Total |
|---|--:|--:|--:|--:|--:|--:|
| `SCU-FBS102` (Foundation 1) | 4 | 9 | 30 | 0 | 10 | 53 |
| `SCU-FBS103` (Foundation 2) | 8 | 5 | 32 | 0 | 5 | 50 |
| `SCU-FBS104` (Foundation 3) | 1 | 1 | 0 | 0 | 3 | 5 |
| `SCU-MS105` (Musculoskeletal) | 3 | 4 | 0 | 0 | 2 | 9 |
| *(Year-1-level, no module)* | 0 | 1 | 0 | 0 | 4 | 5 |

Notes on the counts:

- **`SCU-FBS104` and `SCU-MS105` carry no `lecture` rows** — their `01 University Material`
  subject folders exist in the tree (`Year 1/Semester 2/.../Anatomy/01 University Material`,
  etc.) but are **empty**; the only Foundation 3 / MSK content recovered so far is
  module-wide (portfolio, objectives, lecture-list PDFs), the EOM/EOY compiled exam, and one
  MEQ book / a handful of per-lecture MCQ PDFs under Anatomy's `03 Questions and QBank`.
  This is a real gap, not a classification miss — confirmed by directory listing.
- **`practical` = 0 everywhere** — no `04 Practical and OSCE` folder in this corpus has a
  file in it yet (the folders exist under Foundation 2 and are empty).
- The 5 "Year-1-level, no module" rows are `Year 1/03 Questions and QBank/` (1 file) and
  `Year 1/00 Administration/` + `Year 1/_Catalog/` (4 files) — none of these carry a
  Semester/Foundation path so they cannot be assigned a module id.
- **`SCU-FBS102` and `SCU-FBS103` each hold a small, already-keyed MCQ bank**: 5 JSON+MD
  pairs under Foundation 1 (`03 Questions and QBank/`, `06 EOM Exams/`, `07 EOY Exams/`,
  plus one FOMNINU cross-university pair under `_Needs Review - Related FOMNINU/`) and a
  matching set under Foundation 2. Each JSON carries `question`, `options`, `answer` and a
  worked `explanation` per item, extracted from a public Firestore-backed quiz app
  (`m-site.github.io/rafik-altib`) — see S1b/S3 below. This is why Foundation 1 was chosen
  as the first-module triage (S3).

## `faculty-admin` corpus (3 rows, tier 9, module null)

`Internal Bylaw 2018 - Credit-Point Program.pdf`, `Internal Bylaw 2023 - 5+2 Credit-Point
Program.pdf`, `Student Handbook 2024-2025.pdf` — cited directly in
[`../academic/SCU-Y1-modules.md`](../academic/SCU-Y1-modules.md) for module codes/marks.

## `staging` corpus (395 rows, all `unsorted: true`, module/kind left `other`/tier 9)

The raw Telegram document dump, not yet sorted into the organized tree. Per
`_Catalog/Missing High-Priority Downloads.md` (Desktop source, not part of this manifest):
"All named high-priority document downloads visible in the Telegram Files tab have been
recovered. The 496-document archive is preserved in `_Staging/Telegram Year 1/...` pending
message-context placement" — so this bucket is a known, intentional backlog, not a
scanning gap on this lane's part. It is inventoried (sha256'd) so nothing here is lost, but
it is **out of scope for S1–S3 below**: none of it has been placed into a module/subject
folder or read, and re-triaging 395 unsorted files is a separate pass, not part of this
Phase-0 survey. Flagged **needs Omar** — a ruling on whether to fold the Staging pass into
this lane or keep it as its own backlog task.
