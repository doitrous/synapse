# LANE-CARD — Alexandria University Year 2 (au)

Companion to `LANE-CARD.md` (Year 1) — that card's §§1-8 (identity, ten rules, read-text
discipline, author pipeline, ledger, commit rhythm, known traps, walls) apply unchanged to
Year 2. This card covers only what's Year-2-specific.

## 1. Status — RESUMED 2026-09-02

LANE-BRIEF §17 froze Years 2-3 "no lanes, no authoring, until the orchestrator says
RESUME" (Omar, 2026-08-22). Omar resumed Year 2 via the chief of staff, 2026-09-02. This
lane is **Phase 0 only**: survey, structure, triage. **Mint nothing, author nothing until
the chief of staff replies "TRIAGE APPROVED"** (13-orchestration.md §5).

## 2. Identity

Year id `AU_Y2`. Five modules, all bylaws-2023 (`academic/au-modules.md` lines 175-229):
`AU-MED-201` (Endocrine and Genitourinary Systems & Clinical Skills 3), `AU-MED-202` (GIT
and Nutrition & Clinical Skills 4), `AU-MED-203` (Nervous System & Professionalism,
Medical Law and Ethics), `AU-MED-204` (Concept of Health and Disease 1 & Professionalism),
`AU-MED-205` (Concept of Health and Disease 2 & Professionalism). Sources:
`~/Desktop/Universities/Alexandria University/y2/` (moved under a new `Universities/`
folder since the 2026-08-22 manifest generation — see re-verification note below).

## 3. Manifest — re-verified 2026-09-02, zero content drift

`manifest/au-y2-sources.json` / `au-y2-index.md`: 2279 distinct sources by sha256. A full
hash pass against the current Desktop tree (2319 physical files, 13GB) confirmed **zero
new files, zero removed files, zero content changes** since generation. What moved is
cosmetic only, and is already fixed in the manifest's path fields: `corpusRoot` (now
nested under `Universities/`), 395 renamed paths (mostly Finder double-space cleanup, 114
of them a genuinely-good extension added where none existed), 18 sources that lost a
duplicate-name physical copy with zero content loss. See `au-y2-index.md`'s "S0
re-verification" section for the full breakdown before trusting any path in the JSON.

## 4. Categorizer gap — read every module's real EOM papers off the filename, not `category`

The manifest's automatic categorizer only recognizes a literal `EOM -` prefix as
`category: "End of Module paper"`. Files prefixed `EOM MCQs -` instead — which is most of
them, in every one of the five modules — are filed under `category: "Department
Questions"`. Same bug independently found in Year 1's AU-MED-105/106 triage. Grep
filenames for `EOM`/`Mock`/`Final`/`مصريين`/`وافدين` inside `Department Questions` rows;
do not trust `category` alone to find "the exam papers." See
`coverage/AU-Y2-priority-sources.md`'s "Categorizer gap" section for the full per-module
list this produced.

## 5. Module ranking by keyed exam material (S2/S3)

| Rank | Module | Real EOM/Mock papers found | Bank files | Notes |
|---|---|--:|--:|---|
| 1 | `AU-MED-203` | 13 | 138 | Only module with an 87pg "Previous Years…with answers" compilation; largest total corpus (634 files); **first-module triage target** |
| 2 | `AU-MED-202` | 10 | 109 | 3 explicitly "with answers" |
| 3 | `AU-MED-201` | 6 | 133 | Richest single department (Physiology, 2158 pages) |
| 4 | `AU-MED-204` | 6 | 40 | Smallest module (323 files) |
| 5 | `AU-MED-205` | 4 | 26 | Smallest bank footprint |

Full per-module tier-1/tier-2 tables: `coverage/AU-Y2-priority-sources.md`.

## 6. First-module triage — AU-MED-203, Workshop Quizzes 1-4

`coverage/AU-MED-203-triage.md` (+ `-triage-keys.txt`, 134 keys). 134 questions read in
full, all keyed via native-text answer tables (no OCR needed, 40 pages total). 4 confirmed
HIT-LIVE, 2 confirmed HIT-PENDING, 49 confirmed NEW via `find-existing.mjs`; ~66 remaining
concepts not yet individually searched (bucketed NEW, flagged, not final). 20 of 134
questions are image-labeled (`labeling_image` blank, `media_recommendations` required per
LANE-CARD §4). A fifth candidate source in the same module (`MCQ CNS with answers.pdf`)
turned out to carry unreliable bullet-glyph pseudo-keys that disagree with ground truth —
a visual-key trap, documented and excluded, not counted as triaged.

Everything else in `AU-MED-203` (2 stream-specific finals, the Mock 2027 q+a pair, 4
weekly EOM finals, the 87pg compilation, two 180-280pg banks, 5 workshop weekly banks, the
Professionalism/Anatomy/Physiology/Histology/Biochemistry department material) is
identified and page-counted in the priority-sources doc, not yet triaged.

## 7. Readability index — S1b, background, in progress

`coverage/AU-Y2-readability-index.md` via `pagetext.mjs index` over the full 2319-file
tree — launched, running in the background alongside five other lanes' own `index` runs
against the same shared page-text cache (`~/.cache/nishany-pagetext`, sha256-keyed, safe to
share). Did not finish inside this session's turn; **the next session should check for the
process/output before re-launching** rather than re-running the whole tree from empty
cache.

## 8. Needs Omar / open questions

- The visual-key trap (§6) needs the visually-marked-key extractor tool. It was dispatched
  after Menoufia's 2026-08-27 finding but is not on `main` yet (`refit/pagetext-keys`
  branch has an in-progress, uncommitted `pdf_visual_keys.py` as of this pass) — this
  lane's S1 continuation on the trap file and any other bullet/highlight-keyed source is
  blocked until it lands.
- 114 sources across the module (see §3) had an extension added on disk since the manifest
  was generated; their `claimedExtension`/`extensionNote` fields are stale (not reprobed
  this pass — `fileType`, which is magic-byte based, is unaffected and still accurate).
