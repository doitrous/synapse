# LANE-CARD — Kasr Al Ainy Year 2 (kau, KAU_Y2)

Read `LANE-CARD.md` (Year 1) first — same university, same rules. This card only states
what Year 2 does differently. `LANE-CARD.md` itself stayed under the 6,000-byte budget,
so this is a separate file rather than a subsection.

## 1. Identity

Year id `KAU_Y2`. Six modules, bare ids (no university prefix, same as Year 1):
`205 NEU`, `206 DIG`, `207 END`, `208 INT`, `210 PAT`, `213 PSY` — confirmed 6/6 against
`KAU_MODULES['Year 2']` in `src/data/universities.ts` and `docs/import-ready/academic/
kau-modules.md` (`docs/Kasr-Source-Imports/academic/KAU-Y2-modules.md`). Secondary/elective
folders (`EPE-230`, `MPE-227`, `RES-234 Research`, `Entrepreneurship`, `Health Economics`,
`Computer`) and the cross-module `Practical 2nd Year/` folder carry no `KAU_Y2` id — not
this lane's scope unless Omar rules otherwise.

Concept ids mint exactly like Year 1: `mintConceptId(module, subject, canonical_key)` →
`sha256("kau:<module>:<key>")`, module-salted per Year-2 module id.

## 2. Sources

Desktop tree `Kasr Alainy/y2/` (canonical — the manifest's own `corpusRoot` field still
says `/Users/doitrous/Desktop/Kasr Alainy/y2`, one directory level stale; use the Desktop
tree, not the manifest's recorded path). Manifest: `manifest/kasr-y2-sources.json` (631
rows), re-verified 2026-09-02 — **zero content loss**: every one of 429 distinct source
hashes from the 2026-08-22 manifest is still present on disk, byte-identical (verified by
sha256, not just filename). ~218 paths were renamed since (mostly a `Department Book - `
prefix added inside `Dpt` priority folders, ~147 of those; the rest are whitespace/
timestamp cleanup on EOM/EOY filenames) plus 8 duplicate-path rows removed — match a
manifest row to disk by `sourceId`/`sha256` if its `fileName` isn't found verbatim.

## 3. Sitting-year formula (Year 2, generalises the Year-1 one)

EOM = batch + 1825 + k; EOY / Baqoon = batch + 1826 + k, where k = year number. Year 2:
EOM = batch + 1827, EOY/Baqoon = batch + 1828 (`manifest/README-y2.md` computed this as
`batch + 1826 + 2`, the EOY/Baqoon case — same formula). A calendar year printed on the
file always wins over the batch-derived year, for any exam type; an EOM paper with no
printed year is left `examSittingYear: null` rather than guessed (academic year straddles
the calendar year — see `manifest/README-y2.md` "Which year a paper was sat").

## 4. Priority set and first module

`coverage/KAU-Y2-priority-sources.md` — tier ≤5 rows (236 of 631) per module, papers →
dept books → banks. `208 INT` is the exam-richest module (24 tier 1-3 papers, 6 already
keyed, spanning 2023-2026) and is the S1 first-module target — see
`coverage/208-INT-triage.md` + `-triage-keys.txt`.

## 5. Traps specific to Year 2 (beyond Year 1's — `LANE-CARD.md` §7 still applies)

- **Reuse Year-1 ids for overlapping physiology/pathology/pharmacology.** `102 INT` and
  `108 INT` (Year 1) already cover general pharmacokinetics, ANS pharmacology, coagulation
  and basic cardiovascular pharmacology — `208 INT`'s own triage found 15 of 56 tested
  concepts already pending in those modules' unimported batches (0 live yet). Search
  `102-INT-*` and `108-INT-*` concept/written files before minting a Year-2 pharmacology
  or general-pathology concept as new.
- **`pagetext.mjs` has no `keys` subcommand yet** (checked against `origin/main`
  `5fd5555a`, 2026-09-02) — a brief that assumes one exists is stale; fall back to reading
  the printed key text and rendering at 200 dpi only to confirm an ambiguous marking
  (`Content CLI` §`pagetext.mjs`).
- **A capitalised option letter inside a question stem is not a key marking.** Confirmed
  by render on `208 INT`'s 2023 EOM paper — the real key lives in a separate printed
  key page/section; capitalisation inside the question body is incidental formatting.
  Read to the end of the file (or grep for "ANSWER"/a per-question key block) before
  concluding a paper has no recoverable key.
- **Cross-module orientation files are shared, not duplicated content.** `210 PAT` and
  `208 INT` share a drug-index and GIT/Resp orientation file (each carries a module-page
  split) — same pattern Year 1's `SHARED-TOOLCHAIN.md` documents; read your own module's
  page only, nothing is double-minted from it.
- **The Year-2 marks-distribution document was not found.** Only Year 1's five modules
  have a photographed marks sheet (`Kasr Alainy/Marks/Term 1/Marks/*.jpeg`); no Year-2
  equivalent exists in the tree (`academic/KAU-Y2-modules.md` "Gaps").
- **A whole-tree `pagetext.mjs index` run over all of `y2/` fails silently** (exit 1,
  empty log); per-top-level-folder runs (six modules + `2ry Modules` + `Practical 2nd
  Year`) are clean — see `coverage/KAU-Y2-readability-index.md` "On this run".

## 6. Open items for Omar / chief of staff

- No Year-2 marks/allocation document in the corpus — confirm whether it exists
  elsewhere or was never captured.
- Whether the six secondary/elective folders (EPE-230, MPE-227, RES-234, Entrepreneurship,
  Health Economics, Computer) should get `KAU_Y2` catalogue ids.
- Ruling on `Practical 2nd Year/` ownership (cross-module, no lane) — same open question
  as Year 1's `PRACTICAL FIRST YEAR/`.
- `213 PSY` has zero exam papers in this corpus (tier 1-3) — confirm whether one exists
  outside this tree before treating 213 as bank/department-book-only.
