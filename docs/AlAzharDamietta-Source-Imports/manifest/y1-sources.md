# Al-Azhar University Damietta Year 1 -- source manifest (S0 inventory)

Generated: 2026-09-02 | corpus root: `/Users/doitrous/Desktop/Universities/Al-Azhar
University Damietta`

Total non-`.DS_Store` files in the whole corpus: **66** (46 `.DS_Store` files excluded
as OS metadata). Itemised in this manifest (Year 1 scope + the two university-wide
shared admin PDFs + top-level catalog notes): **38**. Year 2: 14 files, Year 3: 14
files -- both out of scope for this lane, counted but not itemised (see
`outOfScopeYears` in `manifest/y1-sources.json`). Exact-duplicate twins found: **0**
(sha256 checked across all 66 files).

## The corpus has two, unrelated trees

This is the load-bearing finding of this manifest. `README - Library Guide.md`
documents one navigation structure -- `Year 1/`, `Year 2/`, `Year 3/`, each split into
semesters, modules and the eight `05 Questions and Past Exams`-style resource folders
-- and that whole tree is **almost entirely empty scaffolding**. Walking every leaf
folder under `Year 1/Semester 1` and `Year 1/Semester 2` finds nothing but the folder
structure itself; the only files anywhere in the documented tree are eight
schedule/administration PDFs, the Year 1 Student Guide, two symlinked university-wide
PDFs, and the `_Catalog` provenance notes.

The only real academic content in the entire 66-file corpus is **12 PDFs** sitting
under a second, separate top-level folder the README never mentions:
`Faculty of Medicine/Year 1/<Blood|Musculoskeletal|Respiratory>/_Telegram Year 1
Archive/`. These were pulled from Telegram (`@damietta_bot` + the surviving "1st grade
Damietta medical students" channel) by a prior local pass, per `Faculty of
Medicine/Year 1/_Catalog/Year 1 Priority 4.md` (dated 2026-08-31, four days after the
main `_Catalog`'s `Final Build Verification.json`, which is why that older
verification file's `physical_files_total: 53` does not include these 12 files: 53 +
12 (PDFs) + 1 (its own catalog note) = 66). Telegram fetching is retired
(`telegram-fetch-via-chrome`); no new fetch was performed in this pass -- these 12
files were already resident on Desktop before this lane started.

`Blood`, `Musculoskeletal`, and `Respiratory` are informal nicknames, not official
module names or ids -- they map to the official Year 1 Semester 2 modules
`Haemopoietic system and Basic Immunology`, `Musculoskeletal and skin`, and
`Respiratory system` respectively (see `academic/AZD-Y1-modules.md`).

## Counts by module x kind (twins collapsed)

| Module | paper | dept-book | bank | lecture | practical | other | Total |
|---|--:|--:|--:|--:|--:|--:|--:|
| AZD-MSK | 1 | 0 | 1 | 0 | 1 | 1 | 4 |
| AZD-HBI | 1 | 0 | 1 | 0 | 0 | 2 | 4 |
| AZD-RESP | 0 | 0 | 0 | 0 | 0 | 4 | 4 |
| AZD-ADMIN | 0 | 0 | 0 | 0 | 0 | 3 | 3 |
| AZD-NHB | 0 | 0 | 0 | 0 | 0 | 1 | 1 |
| AZD-BMS+AZD-PDDT | 0 | 0 | 0 | 0 | 0 | 1 | 1 |
| AZD-SEM1-ADMIN | 0 | 0 | 0 | 0 | 0 | 3 | 3 |
| AZD-SEM2-ADMIN | 0 | 0 | 0 | 0 | 0 | 3 | 3 |
| AZD-CATALOG | 0 | 0 | 0 | 0 | 0 | 15 | 15 |

`kind=other` dominates because most of this manifest is administrative reference
material (schedules, catalog notes) or notes/study-guide PDFs, not exam papers or
banks -- only two files across the whole Year 1 corpus classify as `paper` (both
formative-exam PDFs, one genuinely keyed, one image-only -- see
`coverage/AZD-Y1-priority-sources.md`).

## No misfiled years found in the official tree

Every folder walked under `Year 1/Semester 1` and `Year 1/Semester 2` names a Year 1
module or an ancillary/pass-fail course consistent with the official program map (p.21
of the Student Guide) -- with one discrepancy, not a misfiling across years but a
scaffolding-vs-bylaw mismatch: **Semester 1's `99 Ancillary Courses` folder has four
subfolders (`Clinical Nutrition`, `Hospital Administration`, `Quality in Health
Facilities`, `Quran`) that do not appear on the Student Guide's Semester 1 marks table
at all** (which lists only English, Professionalism 2/Soft Skills, Fekh, Computer
Science & IT, and Elective 1 as Semester 1 ancillary components -- `Quran` belongs to
*Semester 2* on the same table, alongside Aqeedah, Medical Ethics/Professionalism 1,
and Elective 2, which the Semester 2 folder tree correctly reflects). These four
Semester-1 folders read as unverified scaffolding for pass-fail components from other
semesters/years, not confirmed Year 1 material -- flagged, not authored from, in
`academic/AZD-Y1-modules.md`.

The one genuinely misfiled-year file in the whole corpus is in **Year 3**, already
caught and quarantined by the prior curator: `Year 3/_Needs Review/Mislabelled or
Wrong-Year Source/Source Label Says Year 3 Semester 1 Official Materials - Document
Shows Year 2 CVS.pdf`. No Year 1 relevance.

## Notes

- `AZD-MSK`, `AZD-HBI`, `AZD-RESP` are this lane's own module-id assignments (no
  university id or module ids are registered yet for Al-Azhar Damietta) -- see
  `academic/AZD-Y1-modules.md` for the full Year 1 module table with official names,
  credit hours and marks, cited to Student Guide p.21.
- `AZD-CATALOG` = pre-existing `_Catalog`/`_Needs Review` notes across the whole
  corpus (top-level + all three years) -- prior local survey notes and provenance
  records, not import content, but load-bearing evidence for this manifest.
- `AZD-ADMIN` = the two university-wide PDFs under `00 University Administration`
  (symlinked into each year's `Program Guides` folder) plus the Year 1 Student Guide.
  Reference material only; the Student Guide is the one exception worth reading in
  full -- it carries the official marks table this lane's academic doc cites.
- Two raster schedule images (`.jpeg`/`.jpg`, Semester 1 and Semester 2 exam
  schedules) are not covered by `pagetext.mjs` (PDF-only) and were not OCR'd in this
  pass -- they are exam-*schedule* images (dates/rooms), not exam-content, so low
  priority.
- Tiering follows the same rubric as the 6 October University lane: 1 = real exam
  papers, 2 = practical/oral exam material, 3 = comprehensive/core MCQ or question
  banks, 4 = narrower notes/topic-specific sets, 5 = admin/reference (not authored
  from).
