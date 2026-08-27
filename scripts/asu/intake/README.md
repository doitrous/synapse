# Ain Shams intake

Five steps that turn the Ain Shams corpus (`/Users/doitrous/Desktop/Ain Shams`, Years 1-3)
into a manifest every later stage can trust — the same job `scripts/corpus-intake/` does for
Kasr Alainy, adapted for a corpus that is already organised (no `move.py` step) and carries no
`NOTE … NOTE` convention and no batch-code system.

```sh
python3 scripts/asu/intake/inventory.py --year y1   # identity: sha256, pages, path decomposition, text layer
python3 scripts/asu/intake/probe.py     --year y1   # page-1 OCR for files with no text layer (30s cap each)
python3 scripts/asu/intake/classify.py  --year y1   # exam type, instructor, calendar year, solved status
python3 scripts/asu/intake/manifest.py  --year y1   # the manifest itself (reads all three years for duplicates)
python3 scripts/asu/intake/index.py                 # one combined README for all three years (run after all --year manifests exist)
```

Repeat `inventory.py` / `probe.py` / `classify.py` / `manifest.py` for `--year y2` and `--year y3`.
Intermediates (`inventory-y1.json`, `probe-y1.json`, `plan-y1.json`, …) live beside these scripts
and are gitignored (`scripts/asu/intake/*.json` in the repo root `.gitignore`) — regenerate them,
never hand-edit them. The two committed outputs land in `docs/Ain-Shams-Source-Imports/manifest/`.

## What differs from Kasr's `scripts/corpus-intake/`

- **No `move.py`.** The corpus is already organised on one grammar (see
  `docs/Ain-Shams-Source-Imports/LANE-BRIEF.md`); nothing is moved or renamed.
- **`classify.py` reads filenames and folder names only, never document content.** Kasr's
  classifier reads page text because filenames there are unreliable and folders can be wrong.
  Neither is true here — the corpus is already organised by module/subject, and every signal
  LANE-BRIEF.md names (`EOM`, `MCQs -`, `Formative`, `essay`, `final`, `assessment`,
  `Checklist`, `[old]`, a doctor's name, a year) is a filename or folder token. `probe.py`'s
  OCR therefore exists only to confirm a `textLayer: none` verdict is real and leave a
  spot-check sample — its output is never read by `classify.py`.
- **No batch-code system.** `rawYearCode`, `batchImpliesCalendarYear` and `yearConflict` are
  always `null` here. `calendarYearLabel` is filled from a year printed in the *filename*, but
  per SHARED-TOOLCHAIN.md's "A year sourced from the filename is not the examiner's date",
  that is never promoted to `examSittingYear` — both `examSittingYear` and
  `examSittingYearSource` stay `null` until someone reads a page and records a
  `correction`-style field. LANE-BRIEF.md: "say null rather than derive."
- **No `NOTE … NOTE` convention.** `fileNameWithoutInstructions` is always equal to
  `fileName`, and `appliedNoteInstructions` is always `[]`. `moduleSubjectDeclarations` is
  filled instead from what is actually observed on disk (module folder x subject folder pairs
  with a file count), since there is no owner-authored NOTE to read.
- **Per-year manifest, cross-year duplicate detection.** Kasr has one year (`y1`) so far.
  Ain Shams has three, and per LANE-BRIEF.md §3, four modules — CNS, Endocrine, Special
  Senses, Research Methodology — recur between Year 2 Term 2 and Year 3 with byte-identical
  files. `manifest.py --year yN` loads **all three** `inventory-*.json` files (whichever
  exist) to compute duplicates, so a Year 3 file's Year 2 twin is found even though only one
  year's manifest is being written in that run. Every row keeps `duplicateOf` (any year, any
  path sharing the sha256 — general purpose, matches Kasr's field) and a new `twinOf` field
  (the subset in a *different* year, each entry carrying that year's `sourceId`/`yearId`/
  `moduleId`) so an extraction lane can find and read a cross-year paper once.
- **Module IDs come from a table, not from a rule.** `asu_config.py:MODULE_FOLDERS` is a
  `{yearId: {folderName: moduleId}}` map sent by the orchestrator once the catalogue lane
  minted IDs in `src/data/universities.ts` (`ASU_MODULES`). It is keyed per year because the
  same folder name (e.g. "Central Nervous System") gets a **different** ID in Year 2
  (`ASU-CNS-2`) than in Year 3 (`ASU-CNS-3`) — the same pattern as Kasr's `SURG 4` / `SURG 5`.
  **To regenerate the manifest with an updated map: edit `MODULE_FOLDERS`, then re-run
  `manifest.py --year yN` for the affected year(s) — inventory.py and probe.py do not need to
  run again**, since moduleId resolution happens entirely in manifest.py at emit time.
- **Extensionless PDFs.** 15 files in this corpus are genuine PDFs with no extension at all
  (names ending in a doctor's surname, e.g. `.../Biochemistry/Practical/bio.Dr.Omar`).
  `inventory.py` sniffs the first 5 bytes (`%PDF-`) for any file whose extension is not one of
  the known set, rather than trusting the name; `extensionSniffed: true` on the manifest row
  marks every file this caught.
- **`.pdf_` and `.PDF`.** Both normalise to `fileType: "pdf"`; `extRaw` on the intermediate
  inventory row keeps the original token if it is ever needed.

## Row schema

Every key Kasr's manifest emits is present here with the same name and the same meaning
(`schemaVersion` is unchanged — `"kasr-source-manifest/1.0.0"` — specifically so the two
universities' manifests are diffable field-for-field). Fields Ain Shams has no equivalent
convention for are always `null`/`[]` rather than repurposed (see above).

New fields, appended rather than substituted for anything Kasr has:

| Field | What it is |
|---|---|
| `moduleFolder` | The module-level folder name, verbatim from disk |
| `term` | `"Term 1"` / `"Term 2"` / `null` (Year 1's `Administration` folder has no term) |
| `subjectFolder` | The subject-level folder name, verbatim (`"All Subjects"` for the cross-subject buckets) |
| `kindFolder` | The kind-level folder name, verbatim (`Lectures`, `Practical`, `Questions`, `Assessments`, …) |
| `subFolder` | Everything below `kindFolder`, joined with `" / "` (doctor name, `Slides`, `MCQs/Extra`, `Archive/2023`, …) |
| `extensionSniffed` | `true` if `fileType` was decided by magic bytes, not the filename |
| `textLayerWordRatio` | The word-forming-character ratio `inventory.py` computed (see below); lets a reviewer re-check the `textLayer` verdict without re-extracting |
| `controlCharDetected` | `true` if the extracted text contained a U+0001 run — the known false-`native` case |
| `probeStatus` | `"ok"` / `"skipped_timeout"` / `"error"` / `null` (not probed) from `probe.py` |
| `probeOcrChars` | Characters of OCR text recovered from page 1, when probed |
| `twinOf` | Cross-year duplicates, see above |
| `nearDuplicateOf` | Same normalised title + page count, DIFFERENT sha256 — a re-scan, CamScanner copy, or "Copy of ..." re-export `duplicateOf` cannot see (see below) |

`crossModulePractical` is repurposed: it is `true` when `subjectFolder == "All Subjects"`
(a cross-*subject*, not cross-module, bucket — this corpus has no cross-module practical
folder the way Kasr's `PRACTICAL FIRST YEAR` does). `secondaryModule` is always `null` for
the same reason: there is no `2ry Modules`-style cross-cutting stream here.

## Two kinds of duplicate

`manifest.py` runs two independent passes, kept as separate fields because they need
different handling:

- **Exact** (`duplicateOf`, and `twinOf` for the cross-year subset): same sha256. Cheap,
  exact, no false positives.
- **Near** (`nearDuplicateOf`): same normalised title + `pageCount`, but a **different**
  sha256 — added 2026-08-22 on the orchestrator's instruction after the Alexandria lane found
  that "[from ... Updated]"-style re-exports are *not* byte-identical (0/20 sampled). The
  filename is normalised by stripping emoji, "Copy of", `(1)`-style counters, bracketed tags,
  a trailing `_<hash>` suffix (e.g. `..._03e5bc05b2035b0280e80dd53dae18b2.pdf`), then
  collapsing case and whitespace (`normalize_title()` in `manifest.py`). Rows are grouped by
  `(normalisedTitle, pageCount)`; a group of 2+ different-sha256 PDFs gets `nearDuplicateOf`
  on every member. **Flagged only — nothing is dropped or excluded on this basis**; the
  extraction lane decides which copy to read. Non-PDF files and PDFs with no known page count
  are never grouped (too little signal to trust a title match alone).

## `textLayer` verdict: word-forming ratio, not character count

Per LANE-BRIEF.md and SHARED-TOOLCHAIN.md's "Probing readability: count words, not
characters" — a *character* ratio scores a dotted answer sheet or a run of U+0001 control
characters as "full of text" just as readily as real prose. `inventory.py` extracts the first
4 pages with `pdftotext`, then computes

```
wordRatio = (count of characters matching [^\W\d_], i.e. actual letters) / (total non-whitespace characters)
```

`textLayer` is `"native"` only if `wordRatio >= 0.15` **and** the extracted text is at least
20 characters; otherwise `"none"` (which sets `processingStatus: "ocr_required"`, never
"empty" — a scanned exam paper that extracts to nothing is not an empty paper). Non-PDF files
are always `"n/a"`. No row in the produced manifests has `textLayer: "native"` with a ratio
under 0.15 — checked directly against the emitted JSON, not assumed.

## `probe.py`: what the OCR pass is and is not for

Only the **first page** of a `textLayer: "none"` PDF (or a standalone `.jpg`/`.jpeg`/`.png`)
is rendered at 150 dpi and OCR'd (`eng+ara`), capped at 30 seconds end-to-end. A file that
blows the cap is recorded `probeStatus: "skipped_timeout"` and left for a later full
extraction pass — never silently treated as empty or skipped without a record. This is a
confirmation-and-sample step, not a classification input: `classify.py` never reads
`probe.py`'s output. A full OCR pass (all pages, every scanned file) is out of scope for
intake and belongs to the extraction lane for each module.

## Regenerating after a `MODULE_FOLDERS` update

`inventory.py` and `probe.py` never look at `MODULE_FOLDERS` — they only decompose paths.
`classify.py` doesn't either. Only `manifest.py` resolves `moduleId`, at emit time, via
`module_id_for(yearId, moduleFolder)`. So once `asu_config.py:MODULE_FOLDERS` changes, the
correct rebuild is:

```sh
python3 scripts/asu/intake/manifest.py --year y1
python3 scripts/asu/intake/manifest.py --year y2
python3 scripts/asu/intake/manifest.py --year y3
python3 scripts/asu/intake/index.py
```

No re-inventory, no re-probe, no re-classify.

## Known limitations, for whoever reads this next

- **`instructor` is conservative.** It is only filled when a folder or filename carries an
  explicit `Dr.`/`Prof.` token. Several doctors' names appear as bare sub-folder names with no
  title (`khalifa`, `tarek`, `omar`, `alaa`, `Zahra`, `Hegazy`, `M.ashraf`, `Youssef Shoukry`,
  `Abdel-hamid`) — `subFolder` still carries these verbatim, so a later pass can promote them
  deliberately rather than this script guessing which bare word is a name.
  `instructor` non-null: 35/238 (Y1), 137/501 (Y2), 38/1403 (Y3).
- **`examType` is filename/folder-token derived**, per LANE-BRIEF.md, and is `null` for most
  lecture/note/practical material — that is expected, not a gap.
- **`sourceTier`** is a fresh ranking (exam-shaped material tiers 1-2, department books 4,
  generic questions/practical 5, compilations/summaries/revision 6, notes/general 7, lectures
  8, schedules 9) matching the order-of-work in LANE-BRIEF.md §4, not a byte-copy of Kasr's
  `TIER` (which names Kasr-specific categories like `Baqoon`).
