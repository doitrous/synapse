# Alexandria University — source manifest

Four files, one per corpus top-level folder: [`au-y1-sources.json`](au-y1-sources.json),
[`au-y2-sources.json`](au-y2-sources.json), [`au-y3-sources.json`](au-y3-sources.json),
[`au-general-sources.json`](au-general-sources.json) (for `General Resources/`). Each has the
same shape as `docs/Kasr-Source-Imports/manifest/kasr-y1-sources.json`, adapted where this
corpus is genuinely different (see each decision below). Human-readable renderings:
[`au-index.md`](au-index.md) (roll-up) and one page per file
(`au-y1-index.md`, `au-y2-index.md`, `au-y3-index.md`, `au-general-index.md`).

Produced by `scripts/alexandria/intake/` — copies of `scripts/corpus-intake/`'s five scripts
(`inventory.py`, `probe.py`, `classify.py`, `manifest.py`, `index.py`), parametrised for this
corpus, plus one new script `ocr_worker.py` (see "OCR" below). **`move.py` was not copied and
never run** — this corpus is already organised and must never be moved, renamed or deleted;
every script here is read-only with respect to `/Users/doitrous/Desktop/Alexandria University/`.

## The corpus this was built from

3,642 files under `y1/`, `y2/`, `y3/`, `General Resources/` (3,615 once `.DS_Store` is
excluded). Already organised into `<CODE> - <Name>` module folders, then (for most modules) a
subject folder, then a department folder, then per-instructor/per-source folders. Two
top-level folders per year, and one under `General Resources`, are **not** modules —
`y2/EOY Exams`, `y3/EOY Exams`, `y3/Additional Curriculum`, `General Resources/` — see
"Containers that are not modules" below.

## Row identity

One row per **distinct sha256**, not per file path — see "Deduplication reality" below.

| Field | Meaning |
|---|---|
| `sourceId` | `src_` + first 20 hex chars of the sha256. Content-addressed, like Kasr's. |
| `sha256` | full hash |
| `corpusRelativePath` | one representative path for this hash (the copy without the `[from Alexandria University Updated]` marker, when one exists; alphabetically first otherwise) |
| `sourceRelativePaths` | every corpus path this exact hash is filed under |
| `duplicatePathCount` | `len(sourceRelativePaths)` |
| `absolutePath` | `corpusRelativePath` resolved against the corpus root |

## Module identity — `AU-<CODE>` ids

**Ruling, chief of staff, 2026-08-22 evening** (LANE-BRIEF.md §1): module ids are global bare
strings with no university cross-check in the importer, so a bare `MED 102` would collide with
any other university printing the same code. So:

- `moduleId` is `AU-<CODE>` — uppercase, hyphenated, no spaces: `AU-MED-102`, `AU-UNI-104`,
  `AU-E-304` …
- `rawModuleShorthand` keeps the faculty's own printed code exactly as the folder names it
  (`MED 102`) — this is what classify.py's header-text check compares against, and what a
  human should expect to see in a citation back to the source folder. It is never the id.
- `moduleName` is the text after the dash in the folder name, verbatim (`Foundation of Basic
  Medical Sciences & Medical Terminology`). Never expanded, translated or shortened.

The mapping table lives in `scripts/alexandria/intake/manifest.py`'s `MODULE_ID_MAP` constant
and is reproduced here:

| rawModuleShorthand | moduleId | rawModuleShorthand | moduleId |
|---|---|---|---|
| `MED 101` | `AU-MED-101` | `MED 205` | `AU-MED-205` |
| `MED 102` | `AU-MED-102` | `MED 301` | `AU-MED-301` |
| `MED 103` | `AU-MED-103` | `MED 302` | `AU-MED-302` |
| `MED 105` | `AU-MED-105` | `MED 303` | `AU-MED-303` |
| `MED 106` | `AU-MED-106` | `MED 305` | `AU-MED-305` |
| `UNI 104` | `AU-UNI-104` | `MED 307` | `AU-MED-307` |
| `UNI 107` | `AU-UNI-107` | `MED 308` | `AU-MED-308` |
| `MED 201` | `AU-MED-201` | `MED 309` | `AU-MED-309` |
| `MED 202` | `AU-MED-202` | `UNI 310` | `AU-UNI-310` |
| `MED 203` | `AU-MED-203` | `UNI 311` | `AU-UNI-311` |
| `MED 204` | `AU-MED-204` | `E 304`   | `AU-E-304`   |
| |  | `E 306`   | `AU-E-306`   |

A folder code outside this table would get a generic `AU-<CODE>` id and a printed warning from
`manifest.py` — none occurred in this run (every module folder matched the table exactly).

## Containers that are not modules

**Orchestrator decision, 2026-08-22**: `y2/EOY Exams`, `y3/EOY Exams`, `y3/Additional
Curriculum` and `General Resources/` are not module folders and never get a `moduleId` — an
end-of-year paper spans every module examined that year, and whatever a later stage extracts
from it carries the module *that item* teaches, not the container it was filed in. These rows
instead carry:

- `moduleId: null`, `rawModuleShorthand: null`, `moduleName: null`
- `containerKind`: `"year-eoy"` (the two `EOY Exams` folders), `"additional-curriculum"`
  (`y3/Additional Curriculum` — currently one `Community Medicine` DPT book, a subject taught
  outside the numbered module sequence), or `"general-resources"` (everything under
  `General Resources/`, currently the university's internal bylaw document)
- `yearId` is still set from the top folder (`AU_Y1`/`AU_Y2`/`AU_Y3`), except
  `General Resources`, which carries `yearId: null` and `generalResources: true`

Every other row has `containerKind: null` and a real `moduleId`.

## Department

`departmentFolder` is the first path component, walking outward from the module folder, that
case-insensitively names one of: `Anatomy`, `Anatomy and Embryology`, `Histology`,
`Physiology`, `Biochemistry`, `Embryology`, `Pathology`, `Pathology (Genetics)`, `Pharmacology`,
`Microbiology`, `Parasitology`, `Forensics and Toxicology` / `Forensic and Toxicology`,
`Genetics`, `Community Medicine`, `Communication`, `Clinical Skills`, `Radiology`, `Surgery`,
`Professionalism`, `Internal Medicine`, `English`, `Clinical Pathology`, `Tropical Medicine`,
`Terminology`, `Research`, `Exams`. Falls back to `General` (many of the corpus's own
catch-all folders are literally named that) or `Unknown` if nothing matches.
`departmentFolderRaw` keeps the exact folder text that matched, when one did.

This corpus's departments are *reliable* — the brief notes this is unlike Kasr, where the
module itself had to be inferred. `classify.py` still reads the header text and sets
`moduleMismatch: true` + `moduleMismatchEvidence` when the document's own text names a
*different* module than the folder it's filed under (checked against the corpus's own 23 valid
codes only — an early version of this check flagged a false positive from OCR noise matching
the bare shape `E \d{3}`, which isn't even a real Alexandria module code; the check now only
trusts a hit that names one of the table above). **Result on this run: 0 genuine
moduleMismatch rows.**

## Category

One of: `Department Book`, `Lecture Slides`, `Department Questions`, `End of Module paper`,
`End of Module answers`, `End of Year paper`, `Practical`, `Orientation/Schedule`,
`Administrative`, `Atlas/Reference`, `Unknown`. The organiser's own filename prefixes (`EOM -`,
`EOM MCQs -`, `EOY -`, `MCQs -`, `DPT BOOK -`) are trusted as strong evidence first, per the
brief; everything else falls through content/filename heuristics in `classify.py`, and every
row keeps its `categoryEvidence` (the reason the category was picked). A last fallback checks
the file's own *folder* name when nothing else settled it: a bare `Questions` folder →
`Department Questions`; `Boards`, `Portal`, `Mind maps <name>`, `Lectures`, `PPTs`,
`Tutorial(s)`, `Handout`, `AFM`, `Round ppt` → `Lecture Slides` (this corpus's own teaching
folders, not filename tokens — checked directly: 1,205 of the 2,277 files that would otherwise
be `Unknown` carry exactly one of these). **1,068 rows are still genuinely `Unknown`** — mostly
files sitting directly under an instructor-name or bare-topic folder (`Dr_ Iman Nabil`,
`Neuroanatomy`, `Osteology`, `Head & Neck`) with no organiser prefix, content signal, or
type-naming folder above them. Left as `Unknown` rather than guessed at.

## File type — magic bytes, not extensions

`fileType` is read from the file's own magic bytes (and, for zip containers, its internal
member list), never from the extension, because roughly 120 files in this corpus have a
misleading one:

- **`.pdf_`** (23 files) and files with a **bare numeric "extension" (`.1` .. `.15`, 78
  files)** are complete, independently-valid PDFs — confirmed both by magic bytes (`%PDF-`
  header) and by `pdfinfo` reporting a sane, self-consistent page count on each. They are
  **not** fragments of one split archive: e.g. `Board Aliaa lec [from Alexandria University
  Updated].1` through `.8` are eight separate, differently-sized standalone lectures, not eight
  pieces of one file.
- One **`.pptx_`** file is a real, complete `.pptx` (zip member check: has a `ppt/` tree).
- One file named **`CNS Anki`** (no extension at all) is a zip archive containing
  `collection.anki2` — a real Anki package, just saved without the `.apkg` extension.
- A `.doc`, several `.docx`, one `.xlsx`, and files ending `.pd` / `.df` / other truncated
  extensions were all also checked by magic bytes; every one recorded here as `pdf` really is a
  PDF, and no file's `fileType` was ever assumed from its name.

`claimedExtension` keeps the filename's own extension; `extensionNote` explains the mismatch
when `fileType` disagrees with it. Nothing was renamed on disk — the corpus was never touched.

## textLayer and probeStatus

`textLayer` describes the **document's own structure**: `native` (an extractable text layer
was found), `none` (a pdf with no extractable text layer, or a pptx/docx/xlsx that opened but
had literally no text in it), `unprobed` (see below), or `n/a` (an `.apkg` — a zip of Anki
notes, not a document with a "text layer" concept). It never changes based on whether OCR later
managed to read a scanned page — OCR is a derived read, not a text layer, and conflating the
two would make "does this file have a text layer" an unanswerable question for a later stage
that needs the honest answer.

`probeStatus` says what the probe actually *did* and found: `native-text-extracted`,
`pptx-extracted`, `docx-extracted`, `xlsx-extracted`, `doc-textutil-extracted`,
`apkg-deck-metadata-read`, `ocr-ran: N chars read from first 2 pages`,
`ocr-queued-not-yet-run`, or an explicit `…-unprobed: <reason>` when nothing could be read.

### Tooling actually available on this machine

- **`python-pptx`, `python-docx`, `openpyxl`** — none were pre-installed; all three were
  `pip install`ed for this run (pure-Python packages, no system-level install) and used for
  every `.pptx`/`.ppsx`/`.docx`/`.xlsx` in the corpus. Four `.ppsx` files initially failed —
  python-pptx refuses a slideshow's content-type declaration outright — and are rescued by
  patching that one declaration in memory before opening (see `probe.py`'s
  `_ppsx_as_presentation`).
- **`.doc`** (1 file) — macOS's built-in `textutil`, no install needed.
- **`.ppt`** (22 files, legacy binary PowerPoint) — needs `soffice`
  (`--headless --convert-to pdf`), which was **not** on this machine when this lane started. A
  `brew install --cask libreoffice` kicked off early in the run turned out **not to be an
  authorized system-level install** (standing rule added to LANE-BRIEF.md §4 mid-run: no
  system-level installs); it was left running rather than killed mid-download, and the manifest
  was regenerated several times without waiting on or relying on it. It finished on its own
  partway through this lane's work, at which point `soffice` was already installed (not a new
  install performed by this lane) — `probe.py` was re-run once, purely to use an already-present
  tool, and all 22 `.ppt` rows now read `probeStatus: "ppt-soffice-extracted"`,
  `textLayer: native` or `none` depending on what each file actually contained. **4 files remain
  genuinely `unprobed`** (3 `.pptx` + 1 `zip-unknown`) — 2 `.pptx` have a corrupted embedded
  image that breaks the zip's CRC check, 2 more (1 `.pptx`, 1 `zip-unknown`) are truncated zip
  containers missing their end-of-central-directory record — all four confirmed by hand, not a
  tool gap.
- **OCR (tesseract, `eng+ara`, first 2 pages only)** — used only for pdfs with no native text
  layer (1,076 of 3,275 pdfs). Run by a separate background worker,
  `scripts/alexandria/intake/ocr_worker.py`, logging to `ocr.log` and writing
  `ocr_results.json` incrementally, specifically so a slow OCR pass never blocked the manifest
  while it ran (the brief's instruction) — this lane kept working (streamSignal/cohortSignal
  and contentTwinOf fixes, README, verification) while it ground through the queue in the
  background, and only re-ran `manifest.py` to merge progress, never waited idle on it.
  **It reached 1,076/1,076 (100%) before this manifest's final generation** — every pdf in the
  corpus has been read, natively or by OCR. Re-running `manifest.py` after any future OCR run
  merges `ocr_results.json` automatically; nothing needs to be re-probed.

## Exam signals

`examSignals.cohortSignal`: a list of graduating-cohort labels found in the filename — a
four-digit year in `{2027, 2028, 2029, 2030}` (per the brief), or a two-digit academic-year
shorthand the corpus also uses (`23-24`, `24-25`, …: two consecutive two-digit numbers joined by
a dash). Always a **graduating cohort label**, never a sitting year.
`examSignals.streamSignal`: `"egyptian"` or `"international"` when the filename or already-
extracted text names a stream — the two streams' papers for the same sitting, not two different
years. `examSignals.streamSignalToken` records which literal string matched (`Egyptian`,
`wafdeen`, مصريين, مصرين, وافدين …), so a later reader doesn't have to re-derive why a row got
its label. `examSignals.sittingYear` / `sittingYearEvidence`: set **only** when the document's
own printed text carries a dated header (`dd/mon/yyyy`-shaped); never derived from a filename
number. No resit/"باقون" markers were found anywhere in this corpus (checked directly), unlike
Kasr.

**2026-08-22 orchestrator fix**: the first version of `streamSignal` (classify.py's
`stream_signal()`) only matched the Arabic tokens (مصريين / وافدين), so English-labelled files
— `EOM - Blood End Egyptian 1.pdf`, `EOM - GIT FINAL 23-24 (wafdeen).pdf` — got
`streamSignal: null`. Two lanes reading `AU-MED-102`/`AU-MED-103` rows caught this. Fixed by
adding a second, case-insensitive detector directly in `manifest.py` (`STREAM_PATTERNS`,
`COHORT_4DIGIT_RX`/`COHORT_2DIGIT_RX`) that runs across every filename a hash is known under
(`sourceRelativePaths`) plus whatever text was already extracted — no classify.py or probe.py
rerun needed, so the fix is mergeable from `manifest.py` alone. It only **widens** what counts
as a signal (union with whatever classify.py already found); it never narrows or removes an
existing value, and it does not touch `sourceId` or row order. This run: **+16 rows gained a
streamSignal** (5 in Year 1, 11 in Year 2) and **+6 rows gained a cohortSignal** (all in Year 2,
from the two-digit academic-year pattern) that had neither before.

## Deduplication reality

The brief's hazard note reads: "files named `X` and `X [from Alexandria University Updated]`
are usually byte-identical. Dedupe by sha256." **The first half of that is false for this
corpus.** Checked directly — all 1,334 `X`/`X [from Alexandria University Updated]` pairs found
side by side in the same folder, by literal substring match, share **zero** sha256 hashes
between them. A second, fuzzier pass (bracket-suffix stripped, punctuation/case collapsed —
needed because ~92 pairs differ by more than the bracket text, e.g. underscores vs. spaces)
resolves all of them into slot-groups; across the whole corpus this produces 2,770 rows
carrying a twin link out of 3,502 distinct hashes.

One sampled pair, diffed by hand: `Anatomy Summaries.pdf` (192,429 bytes, `pdftotext` reads
"Ibrahim Obeidat" on page 1) vs. `Anatomy Summaries [from Alexandria University
Updated].pdf` (161,052 bytes, no extractable text on page 1) — same 15-page count, smaller
file, and the "Updated" copy lost its native text layer. This looks like a re-save/re-flatten
of the same document, not a duplicate upload, and **1,424 of the 2,163 distinct twin pairs in
this run disagree on `textLayer` outright** (one twin has a native layer, the other does not).

So:

- **Sha256 is the only thing this manifest dedupes by.** `sourceId` is content-addressed; two
  files that merely look like copies of each other, by name, but differ by even one byte, get
  two rows. This run: 3,615 corpus paths → **3,502 distinct hashes** (113 duplicate paths,
  not "roughly half").
- **`nameTwinOf`** (list of `sourceId`s) is a soft, informational link between rows that share
  a normalised name in the same folder but a different hash. It never merges anything.
- **`twinPreferred: true`** marks whichever twin in a group has the larger extracted-text word
  count (native text if present, else whatever OCR found); ties go to the copy carrying the
  "Updated" marker. This exists so a later content-authoring lane reads and cites *one* twin
  instead of rediscovering the relationship, or worse, double-extracting the same lecture from
  both copies as if they were independent sources.

## Content twins

**2026-08-22 orchestrator follow-up.** `nameTwinOf` (above) catches near-duplicates that at
least *look* related. Two lanes found `AU-MED-102`'s five `Exams` files were really three
distinct papers: two pairs are word-for-word identical question sets filed under names that
share nothing — `EOM - Final foundation 2030.pdf` (a 2030-cohort label) and
`EOM - Foundation Final Egyptian.pdf` (a stream label), different sha256, invisible to
`nameTwinOf`'s name-similarity check.

`contentTwinOf` (list of `sourceId`s) and `contentTwinPreferred` (bool) catch this instead, by
comparing extracted **text**, not filenames:

- **Scope**: only rows whose `category` is `End of Module paper`, `End of Module answers`,
  `End of Year paper`, or `Department Questions` — this is where a genuinely duplicate paper
  under an unrelated name actually matters (a lecture slide re-titled twice is not the same
  problem). Compared only within the same `moduleId` (or `containerKind` for the
  cross-module containers) — a match across modules would be a classification error, not a
  content twin.
- **Source of text**: a per-`sourceId` cache, `scripts/alexandria/intake/textcache/<sourceId>.json`
  (`{sourceId, sha256, text}`), written by this same run of `manifest.py` from whatever
  `probe.json`/`ocr_results.json` already held — not a re-probe; every byte in it was already
  sitting in the existing intermediates.
  **2026-08-22 incident**: this cache was first written to
  `scripts/alexandria/pagetext/<sourceId>.json` — the same directory and filename pattern
  `pagetext.py` uses for its own per-page cache (`{pages, mode, ...}`) — and overwrote 3,397 of
  its files in a 4-second window before anyone noticed. Fixed by moving every file whose schema
  was exactly `{sourceId, sha256, text}` (3,443 of them; checked key-by-key, nothing carrying a
  `pages` key was touched) into `scripts/alexandria/intake/textcache/`, and repointing
  `manifest.py` there. **Rule now in the brief: nothing writes into
  `scripts/alexandria/pagetext/` except `pagetext.py`.** Both directories are gitignored.
- **Matching**: text is normalised (lowercase, page-number-only lines dropped, a scanner-app
  watermark — `Scanned by CamScanner`, found stamped on 9 files corpus-wide with otherwise no
  extractable text at all — stripped like a page number, whitespace collapsed) and compared two
  ways: an exact hash of the normalised text (fast path for a true duplicate), or 8-word-shingle
  Jaccard similarity at a **≥95%** threshold. Rows whose normalised text is under 25 words are
  excluded from comparison entirely (too little content to trust a shingle match on — this is
  what caught and removed a false-positive 100% "match" between two unrelated CamScanner-only
  scans before this threshold was added) and are counted separately, `contentTwinOf: null`.
- **`contentTwinPreferred: true`**: within a linked cluster, the row categorised
  `End of Module answers` wins if one exists (it's the one with the key); otherwise the larger
  extracted-text word count; ties go to the "Updated"-marked copy, same as `twinPreferred`.
- **Limitation, stated plainly**: comparison text for pptx/docx/xlsx/OCR rows was already
  space-joined at extraction time (no line breaks left), so the page-number-line strip only
  really does anything for native pdf text. And all cached text is a **truncated prefix**
  (~4,000-6,000 chars) of the document, not the full text — two papers that diverge only past
  that prefix would not be caught. Neither limitation was fixed here; both are named so a later
  lane doesn't rediscover them as a mystery.

This run: **622 rows in scope**, **26 with no usable cache text** (`contentTwinOf: null`,
counted rather than guessed at), **51 content-twin pairs found across 10 modules**. Selected
pairs that `nameTwinOf` could not have caught (unrelated filenames):

| Module | File A | File B |
|---|---|---|
| `AU-MED-102` | `EOM - Final foundation 2030.pdf` | `EOM - Foundation Final Egyptian.pdf` |
| `AU-MED-201` | `MCQs - ()Embryology EGU MCQ.pdf` | `MCQs - Embryology Endocrine.pdf` |
| `AU-MED-202` | `MCQs - GIT Question bank by MCQs.pdf` | `MCQs - GIT question bank by MCQs [variant 2].pdf` |
| `AU-MED-204` | `EOM - Concept 1 final 2023 Answers وافدين.pdf` | `EOM - Concept 1 final 2023 questions وافدين.pdf` |
| `AU-MED-301` | `EOM MCQs - Parasitology infectious 1 Exam answers.pdf` | `EOM MCQs - Parasitology infectious 1 Exam without answer.pdf` |
| `AU-MED-301` | `MCQs - Para MCQs with answers.pdf` | `MCQs - Para MCQs without answers.pdf` |

Full list (all 51 pairs, all 10 modules — `AU-MED-102/103/201/202/203/204/205/301/303/308`) is
in `manifest.py`'s own run output; re-run `python3 scripts/alexandria/intake/manifest.py` to see
it again (deterministic — same input, same pairs, same order).

## Everything this manifest does **not** do

- It never moves, renames or deletes a corpus file. `move.py` was not copied from
  `scripts/corpus-intake/` and was never run.
- It never invents a sitting year, a module, a department, or a fact not printed on the source.
- It never drops a file for being hard to classify — `category: "Unknown"` and
  `textLayer: "unprobed"` are both first-class, explicit, searchable states, not silence.
