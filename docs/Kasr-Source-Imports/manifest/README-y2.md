# Kasr Alainy — Year 2 source manifest

Generated 2026-08-22 from `/Users/doitrous/Desktop/Kasr Alainy/y2`. **631 files.** Machine-readable copy: [`kasr-y2-sources.json`](kasr-y2-sources.json).

Every file has a row: module, subject (folder vs. filename, and which won), instructor,
priority, exam-type evidence and year signals — see
`docs/Kasr-Source-Imports/manifest/kasr-y2-sources.json`. The corpus arrived already
organised by the owner (see the corpus's own README.md and `_Catalog/`); this manifest
records what that organisation says and where a filename overrides it, rather than
re-deriving placement from content the way Year 1 had to.

## By module

| Module | Files | Orientation | EOM | EOY | EOM & EOY | Baqoon | Department Book | Department Questions | Instructor material | Important & Summaries | Exam-section revision material | Excluded |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `205 NEU` | 39 | 0 | 4 | 3 | 0 | 4 | 3 | 9 | 13 | 0 | 3 | 0 |
| `206 DIG` | 62 | 0 | 8 | 2 | 0 | 0 | 4 | 31 | 15 | 2 | 0 | 0 |
| `207 END` | 32 | 0 | 6 | 2 | 0 | 2 | 3 | 6 | 13 | 0 | 0 | 0 |
| `208 INT` | 93 | 7 | 9 | 6 | 0 | 2 | 2 | 4 | 24 | 4 | 29 | 0 |
| `210 PAT` | 46 | 3 | 0 | 1 | 2 | 0 | 3 | 0 | 23 | 4 | 1 | 0 |
| `213 PSY` | 24 | 0 | 0 | 0 | 0 | 0 | 3 | 2 | 16 | 1 | 0 | 0 |

Secondary modules: 56 files across `Computer` (2), `EPE-230` (17), `Entrepreneurship` (4), `Health Economics` (3), `MPE-227` (9), `RES-234 Research` (21).

Cross-module practical folder (`Practical 2nd Year`): 82 files.

Catalogue rows (`_Catalog` — the owner's own extraction notes, not corpus sources): 197.

## Processing state

- **264** files have no usable text layer (below the character-count floor, or the word-forming-ratio guard) and were read by OCR.
- **367** files have a usable native text layer.
- **389** files share their bytes with another path (190 of these are the archived `Exact Duplicates`).
- **16245** total pages across non-excluded sources.

## Excluded

| Reason | Files |
|---|--:|
| `catalogue_not_source` | 7 |
| `exact_duplicate_archived` | 190 |

## Department-authored vs. instructor material

40 files sit inside a `Dpt` priority folder but were **not** counted as department-authored, because their filename names a doctor, team, textbook or commercial product — a doctor's bank inside a Dpt folder is still a doctor's bank. Full list in the engineering report.

## Which year a paper was sat

The academic year straddles the calendar year (EOM in December, EOY in June/July, a resit
in September), so a batch code only implies a single calendar year for the sittings anchored
to the *end* of the academic year — EOY, Baqoon and combined EOM & EOY compilations. An EOM
paper with no calendar label printed on it is left with `examSittingYear: null` rather than
guessed, because its academic year began the previous December. A calendar label actually
printed on the file always wins, for any exam type. The batch-to-year formula for Year 2 is `batch + 1826 + 2` — see `year_config.batch_year`'s docstring for the filename evidence this was read off.

**Note for the Year 1 lanes:** the same evidence puts Year 1's own hardcoded `BATCH_YEAR` table one year early for every entry versus this formula (`batch + 1826 + 1`). Year 1's committed manifest is untouched by this — that table is not read by anything this deliverable changes — but the Year 1 audit lane may want to replace it with the validated formula.

0 filenames carry both a batch code and a calendar year and disagree.

| Sitting year | Exam papers | How the year was known |
|--:|--:|---|
| 2026 | 19 | 18 derived from batch code (EOY rule), 1 calendar label on the file |
| 2025 | 6 | 4 derived from batch code (EOY rule), 2 calendar label on the file |
| 2024 | 11 | 11 calendar label on the file |
| 2023 | 6 | 6 calendar label on the file |
| 2022 | 4 | 2 calendar label on the file, 2 derived from batch code (EOY rule) |
| 2021 | 8 | 2 calendar label on the file, 6 derived from batch code (EOY rule) |
| 2019 | 1 | 1 calendar label on the file |
| — | 32 | no calendar label, and either no batch code or an EOM paper withheld by the straddle rule above |

## Text-only sources

`_Catalog/Past Exams and Text-Only Questions.md` holds Telegram posts with no attached
file — the content is the message text itself. No file is manufactured for these; they
are named here so a reader looking for (say) the histology slide scheme for 207 knows it
exists and where the words live.

- **Practical — Pharmacology** — https://t.me/FUTUREDOCTORS_198/4456
- **208 INT — Pathology** — https://t.me/FUTUREDOCTORS_198/2254
- **208 INT — Pathology** — https://t.me/FUTUREDOCTORS_198/2961
- **205 NEU — Physiology** — https://t.me/FUTUREDOCTORS_Siraj/3390
- **Practical — Histology** — https://t.me/FUTUREDOCTORS_194/14671
- **208 INT — Pathology** — https://t.me/FUTUREDOCTORS_198/4008
