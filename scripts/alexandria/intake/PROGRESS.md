# Alexandria intake — progress log

Lane P0-A (corpus intake), Years 1-3 + General Resources.

- 2026-08-22: read LANE-BRIEF.md, corpus-intake README + 5 scripts, Kasr manifest
  README/json head, build-source-index.ts. Surveyed corpus root: 3642 files, folder
  structure confirmed (module folders "<CODE> - <Name>", subject folders under
  some modules, department subfolders below that). Confirmed misnamed files by
  magic bytes: `.pdf_` = real PDF, numbered `.1`..`.15` suffixes = real standalone
  PDFs (not archive chunks, not split parts of one file — each is independently
  valid with its own page count), extensionless "CNS Anki" = zip/apkg
  (collection.anki2 inside). Installed python-pptx and python-docx (pip, both
  succeeded). No `soffice`/LibreOffice on the machine; kicked off a background
  `brew install --cask libreoffice` to cover the 23 legacy `.ppt` files if it
  finishes in time — otherwise those are recorded `textLayer: "unprobed"` per
  the brief's explicit fallback.

- 2026-08-22 (later): inventory.py run to completion — 3615 files (3642 minus
  27 .DS_Store). probe.py run — 2310 pdfs had a native text layer, 1076 did
  not (queued for OCR), 190 pptx extracted via python-pptx (including 4
  .ppsx rescued by patching their slideshow content-type), 4 docx via
  python-docx, 1 xlsx via openpyxl, 1 doc via textutil, 7 apkg read for
  deck/note metadata; 3 pptx and 22 ppt genuinely unprobed (2 pptx have a
  corrupted embedded image breaking the zip CRC, 1 pptx is a truncated/corrupt
  zip container with no valid end-of-central-directory record — confirmed by
  hand; the 22 ppt are legacy binary format waiting on the `soffice` install).
  classify.py and manifest.py both run; 0 genuine moduleMismatch rows once the
  detector was restricted to the corpus's own 23 valid module codes (an
  earlier version flagged 1 false positive from OCR noise matching "E 200",
  which isn't even a real Alexandria module code).

  IMPORTANT FINDING — contradicts a LANE-BRIEF hazard: "X.pdf and X [from
  Alexandria University Updated].pdf are usually byte-identical" is checked
  directly against all 1,334 such pairs found side by side in this corpus —
  **zero** share a sha256. The Updated copy is consistently a little smaller
  (same page count, in the one pair diffed by hand) and at least one sampled
  pair lost its native pdftotext-extractable text in the process (looks like a
  re-save/re-flatten, not a duplicate upload). Sha256 dedup therefore only
  collapses 113 of 3615 paths (3502 distinct hashes) — nothing like "roughly
  half". The manifest still dedupes strictly by hash (per the brief's other,
  correct instruction), and separately records a `likelyVariantOf` soft link
  (filename-pattern based, hash differs) on 576/685 Year 1 rows so a later
  stage knows the relationship without the two ever being merged. Documented
  in manifest/README.md "Deduplication reality".

  OCR worker running in background (pid logged in ocr.log): ETA ~2.3h for
  1076 queued pdfs at observed rate. `brew install --cask libreoffice` also
  running in background for the 22 legacy .ppt files (large download, still
  fetching as of this note). Both will be re-merged into the manifest via a
  final probe.py + manifest.py re-run before this lane's report, however far
  they've gotten by then — per the brief, OCR must not block the manifest.

- 2026-08-22 (later still): applied three orchestrator rulings without
  re-litigating them:
  1. Gap-ledger lane's finding folded in — replaced the marker-substring-only
     `likelyVariantOf` with a fuzzy-normalised `nameTwinOf` (strips bracket
     suffixes + punctuation, not just the literal "[from Alexandria
     University Updated]" string) plus `twinPreferred` (larger extracted-text
     word count wins; ties go to the Updated copy). Verified this resolves
     all 92 pairs the literal-substring match missed (checked: 1,426/1,426
     Updated files now find a same-folder normalised-name sibling, up from
     1,334). 2,770 rows now carry a `nameTwinOf` link across 2,163 distinct
     pairs; 1,424 of those pairs (66%) disagree on `textLayer` outright.
  2. Chief-of-staff ruling — `moduleId` is now `AU-<CODE>` (`AU-MED-102`, not
     `MED 102`); `rawModuleShorthand` keeps the folder's own code. Mapping
     table lives in manifest.py's `MODULE_ID_MAP` and is reproduced in
     README.md. Manifests fully regenerated (not hand-patched).
  3. Orchestrator ruling — `y2/EOY Exams`, `y3/EOY Exams`, `y3/Additional
     Curriculum`, `General Resources/` now get `moduleId: null` +
     `containerKind` (`year-eoy` / `additional-curriculum` /
     `general-resources`) instead of being folded into a module.
  4. Standing rule — no more system-level installs. Left the already-running
     `brew install --cask libreoffice` alone (did not kill it, did not wait
     on it); the 22 `.ppt` files are recorded `textLayer: "unprobed"`,
     reason stated on each row.

  Also improved classify.py's category fallback: a folder-name signal
  (`Boards`, `Portal`, `Mind maps <name>`, `Lectures`, `PPTs`, `Tutorial(s)`,
  `Handout`, `AFM`, `Round ppt` -> Lecture Slides; bare `Questions` folder ->
  Department Questions) cut `Unknown` from 2,277 to 1,068 rows — the
  remainder is genuinely unclassifiable from filename/folder/content alone
  (bare instructor-name or topic folders), left as `Unknown` rather than
  guessed at.

  Verification done: re-hashed all 3,615 corpus files against inventory.json
  — 0 mismatches, proving the corpus was read-only throughout. Manifest row
  count (685+2279+537+1=3502) equals distinct-hash count (3502) exactly.
  `scripts/alexandria/build-source-index.ts` written (own copy of
  scripts/kasr/build-source-index.ts, not edited) and run —
  docs/Alexandria-Source-Imports/evidence/corpus-source-index.json has 3502
  entries, 0 excluded, 108 with ambiguous (>1) paths.

  OCR worker still running in background throughout all of the above
  (untouched) — status at time of this lane's final report is whatever
  ocr.log shows then; manifest.py was re-run to merge its latest progress
  before finalizing.

- 2026-08-22 (final for this session): manifest, index and evidence files
  regenerated one last time with OCR progress at ~270/1076 (~25%) merged in.
  Lane's report follows. OCR worker (pid logged in ocr.log) left running;
  re-running `manifest.py` (then `index.py` and
  `build-source-index.ts`) at any later point will merge whatever
  `ocr_results.json` has gained by then — no re-probing needed. The already
  running `brew install --cask libreoffice` was left alone per the
  no-system-installs standing rule; if it ever finishes, a future probe.py
  run will pick up `soffice` automatically and the 22 `.ppt` rows can be
  re-probed, but nothing here depends on that happening.

- 2026-08-22 (orchestrator follow-ups, addressed before this lane's final
  report): two follow-up asks from the orchestrator, both applied additively
  to manifest.py only (no classify.py/probe.py rerun required by either):
  1. streamSignal/cohortSignal fix — added English + both Arabic spellings
     (Egyptian/مصريين/مصرين -> egyptian; wafdeen/wafdin/وافدين ->
     international), case-insensitive, matched across every filename a hash
     is known under plus already-extracted text; records the matched token
     (`examSignals.streamSignalToken`). Also added two-digit academic-year
     cohort detection (23-24, 24-25, ...). Result: +16 rows gained a
     streamSignal (5 y1, 11 y2), +6 gained a cohortSignal (all y2). Purely
     additive — union with classify.py's existing findings, never narrows.
  2. contentTwinOf fix — two lanes found AU-MED-102's Exams folder held the
     same paper twice under unrelated names (a 2030-cohort label vs a stream
     label, different sha256). Added `contentTwinOf`/`contentTwinPreferred`,
     restricted to End of Module paper/answers, End of Year paper, Department
     Questions, compared within the same module via 8-word-shingle Jaccard
     (>=95%) on normalised, watermark/page-number-stripped text. Materialised
     the pagetext cache as real files for the first time
     (scripts/alexandria/pagetext/<sourceId>.json, from data already in
     probe.json/ocr_results.json — not a re-probe) since none existed before.
     Caught and fixed one false positive during development: two unrelated
     scans (histology questions vs a physiology MCQ doc) whose entire "native"
     text layer was just a CamScanner watermark matched at 100% before a
     minimum-content-word gate (25 words) was added. **Discovered while doing
     this: a second, concurrent process is also writing into
     scripts/alexandria/pagetext/, as `<sourceId>.layout.json` — different
     schema (per-page readability), different filename suffix, no collision,
     but flagging for whichever lane owns that so it's not a surprise.**
     Result: 51 content-twin pairs across 10 modules, 622 rows in scope, 22
     with no usable cache text (recorded, not guessed).
  Verified additive-only: row counts unchanged (685/2279/537/1 = 3502) before
  and after both fixes; sourceId/row-order logic untouched.

- 2026-08-22 (session close): OCR worker reached 1,076/1,076 (100%) and the
  earlier `brew install --cask libreoffice` finished on its own (not waited
  on) partway through the follow-up work — `probe.py` was re-run once
  afterward purely to use the now-present `soffice` for the 22 `.ppt` files
  (not a new install). Final regeneration: manifest.py -> index.py ->
  build-source-index.ts, all clean. Only 4 files remain genuinely unprobed
  corpus-wide (2 corrupted-zip pptx, 1 truncated pptx, 1 truncated
  zip-unknown — confirmed by hand). moduleMismatch: 0. Row count (3502) ==
  distinct-hash count (3502). Re-hash verification (3615/3615, 0 mismatches)
  still holds — nothing on disk was touched after that check.
