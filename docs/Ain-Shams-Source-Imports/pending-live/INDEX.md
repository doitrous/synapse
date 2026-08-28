# pending-live/ — apply order

Both files here are sparse overlay updates (`+asu`, `+ASU_Y1`, `+ASU-IBM`) onto concept and
article ids that ASU-IBM's biochem-mcq bundle shares with Kasr Year 1 and Alexandria
AU-MED-102. **Neither file is staged in `docs/import-ready/` or anywhere else — by design,
same convention as Alexandria's own `pending-live/`** (see
`docs/Alexandria-Source-Imports/pending-live/INDEX.md`). Omar applies these two files
separately, after confirming the dependency below is live.

## Dependency status (2026-08-28)

Per `docs/chief-of-staff/BOARD.md`, 2026-08-27 ~13:55Z and ~14:16Z entries: **101 ISK, 102 INT
and AU-MED-102 (with its own 16 pending-live overlays) were all applied to production** in the
live-DB import pass that day. All target ids these two files touch are covered by that import.

This checkout's own extraction snapshot (`server/data/medical-library-v1.json`, `generatedAt:
2026-08-11T03:09:06Z`) predates that import and does **not** contain any of these ids — that is
expected staleness (00-START-HERE.md §8: "'Live state' is not automatically today's production
data … unless Omar ran `npm run medical:snapshot-live`"), not evidence the dependency is
missing. `medical:snapshot-staleness` could not be run in this pass (`MEDICAL_API_BASE` /
`MEDICAL_API_TOKEN` not set in this environment) to pull a fresh copy — Omar should re-confirm
against the live DB (or a fresh snapshot) before applying, as a final check, rather than as a
requirement to further stage this content.

## Files

| File | Target ids | Records |
|---|---|---|
| `ASU-IBM-biochem-mcq-overlay-concepts.md` | 28 concept ids: 18 in `docs/Kasr-Source-Imports/concept/102-INT-concepts.md` / `102-INT-mcq-concepts.md` / `101-ISK-mcq-concepts.md`, 10 in `docs/Alexandria-Source-Imports/concept/AU-MED-102-biochem-structural-concepts.md` | 28 sparse updates — `+asu`, `+ASU_Y1`, `+ASU-IBM` on `universities`/`years`/`modules`; `module_subject` and `exam_signal` restate every pre-existing line plus this bank's own addition (both fields are full-replacement, no `+` semantics) |
| `ASU-IBM-biochem-mcq-overlay-articles.md` | 10 article ids: 3 in `docs/Alexandria-Source-Imports/article/AU-MED-102-biochem-structural-articles.md`, 6 in `docs/Kasr-Source-Imports/article/102-INT-biochemistry.md`, 1 in `docs/Kasr-Source-Imports/article/101-ISK-histology-2.md` | 10 sparse updates — same overlay fields as above, plus `university_notes` restating the target's existing university note(s) verbatim and appending this bank's own `asu:` line |

**Apply after**: the six Kasr/Alexandria files named above are live (already true in production
per the BOARD entry; not yet true in this checkout's own stale snapshot).

## Validation (this pass, positional `medical:simulate`, real dependency files first)

```
npm run medical:simulate -- \
  docs/Kasr-Source-Imports/concept/102-INT-concepts.md \
  docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md \
  docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md \
  docs/Alexandria-Source-Imports/concept/AU-MED-102-biochem-structural-concepts.md \
  docs/Ain-Shams-Source-Imports/pending-live/ASU-IBM-biochem-mcq-overlay-concepts.md \
  --emit /tmp/sim-overlay-concepts.json
```
→ `delta: {"concepts":493}`, batches: 102-INT-concepts `created:57`, 102-INT-mcq-concepts
`created:107,updated:32`, 101-ISK-mcq-concepts `created:260`, AU-MED-102-biochem-structural
`created:69`, **this overlay file `created:0, updated:28`, errors: []** — confirms all 28 rows
are genuine updates onto ids that already exist in the four files above, not duplicates.

```
npm run medical:simulate -- \
  docs/Kasr-Source-Imports/article/102-INT-biochemistry.md \
  docs/Kasr-Source-Imports/article/101-ISK-histology-2.md \
  docs/Alexandria-Source-Imports/article/AU-MED-102-biochem-structural-articles.md \
  docs/Ain-Shams-Source-Imports/pending-live/ASU-IBM-biochem-mcq-overlay-articles.md \
  --emit /tmp/sim-overlay-articles.json
```
→ `delta: {"articles":28}`, batches: 102-INT-biochemistry `created:13`, 101-ISK-histology-2
`created:12`, AU-MED-102-biochem-structural-articles `created:3`, **this overlay file
`created:0, updated:10`, errors: []**.

`medical:batch --with` (directory-scoped) on both files reports errors of exactly one
documented, expected shape and no other: `module_subject starts with "<Kasr/AU path>", which
is not a module this record declares (ASU-IBM)` — 28 on the concepts file, 10 on the articles
file. This is `medical:batch`'s catalogue check judging each row as if it declared only
`ASU-IBM` (it does not read live state, so it cannot see the row is a partial update onto a
record that already declares `102 INT`/`101 ISK`/`AU-MED-102`). The `medical:simulate` result
above is what confirms these are real, correct updates and the batch line is the standard
partial-update false positive (00-START-HERE.md §8: "the batch validator judges every record
as though it were new").

## Fixed this pass — an eviction hazard, not a gate failure

Both files were originally written with `module_subject` (concepts and articles) and
`exam_signal` (concepts only) as **only** the new ASU-IBM line — since both fields are
full-replacement with no `+`-append semantics, applying them as originally written would have
silently **dropped** the pre-existing Kasr/Alexandria path and, on concepts, every pre-existing
page-cited exam-evidence line. Restored the missing live lines ahead of each row's own addition
across all 10 article rows and 28 concept rows (verified line-for-line against the four live
source files above — zero lines still missing). Also found and merged a literal duplicate row
(`ART-102-BIO-LIPIDS-OF-BIOLOGICAL-IMPORTANCE` appeared twice in the articles file with
conflicting content; one copy carried a fabricated, non-verbatim `summary` that would have
overwritten the live Kasr summary) and fixed one paraphrased `university_notes` line back to
the live text verbatim — a discriminating/restated field must match the live record exactly,
never be reworded, however faithfully.

**Sparse, not full-record.** Every row restates only: `id`, the discriminating columns
(`label`/`title`/`summary`/`subject`/`topic` — all verbatim matches to the live record, checked
individually), `universities`/`years`/`module` (`+asu`/`+ASU_Y1`/`+ASU-IBM`, safe ID-list
appends), `module_subject`/`exam_signal`/`university_notes` (full restatement including the
pre-existing lines, per the fields' own merge rule), and `field_notes`. No other field is
touched, so applying these two files can only add ASU-IBM's own tag and evidence — it cannot
evict anything Kasr, Alexandria, or any other university already has on these shared records.
