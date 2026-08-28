# Kasr Al Ainy Year 1 — completing modules 102, 103, 104 (and the cross-cutting gaps)

Date: 2026-08-22. Branch: `claude/kasr-alainy-content-report-e0ee59`.
Inputs: the 22 Aug content ledger, plus three diagnostic reports (101 pipeline trace; 102/103/104 blockers; gates & hazards manual).

## 1. The diagnosis — why 101 ISK dwarfs the other modules

101 ISK's volume (1,661 MCQs, 1,153 claims) is **earned, not inflated**. A 25-item
spot-check of MCQs and of claims found every item substantive and correct; the only
defects were cosmetic OCR noise. The volume came from:

1. Thirty department MCQ books, deduplicated by the `extract/mcq.py` → `bank.py`
   pipeline (2,947 distinct questions), then **hand-triaged leaf by leaf** in
   `scripts/kasr/seeds/mcq/*.ts` (43 leaf files, 737 answer-key overrides with
   written reasons). 729 bank rows were never triaged — a gap the header hides.
2. Claims **generated mechanically**, one per sentence of each concept's definition
   (`build-evidence.ts`), with citations found by term-overlap against the
   department book's pages (28.8% verified).

The other modules are small for four reasons, none of which is "done badly":

| Cause | Where | Effect |
|---|---|---|
| The MCQ leaf-triage pass and `build-evidence.ts` are **101-only** (`seeds/mcq/` has only 101 leaves; `build-evidence.ts` takes no module argument, hard-codes `101-ISK-*` paths) | `scripts/kasr/` | No other module got the mechanised evidence layer or the leaf-triage pass |
| **The validator's coverage rule**: a question is rejected unless an article covers its main concept (`validate-content-batch.mjs:392-399`) | all modules | 504 keyed MCQs (102) and 287 keyed MCQs (104) sit banked because concepts/articles were never written for them. Extraction ran far ahead of authoring |
| 103 BMS's lane only authored from **6 of 51** files | 103 | zero MCQs from exam papers, thin anatomy/histology/physiology |
| OCR destroyed 915 answer keys in 104's bank | 104 | those MCQs cannot be authored without pen-mark recovery |

**The defect, in one sentence:** concept + article authoring is the bottleneck and
was never scaled past 101, while the evidence generator was never generalised.

## 2. Approaches considered

- **A. Port the 101 pipeline wholesale** (move `seeds/mcq/` per module, generalise
  `build-evidence.ts`, register every paper). Highest ceiling, but the generator
  + `removeOrphans` sweep has destroyed hand-written batches three times, and the
  registry is 101/102-only. Too much shared-toolchain risk for parallel lanes.
- **B. Hand-author in the existing per-module style, plus generalise only
  `build-evidence.ts`** (read-only inputs, writes only `<module>-claims/citations`).
  Lanes own disjoint files; the only new tooling is a module parameter on a script
  that never deletes anything. **Chosen.**
- **C. Author questions only from what is already covered.** Cheap, but it is
  exactly what capped 102 at 22 and 104 at 40.

## 3. Design (approach B)

### Lanes and file ownership
One lane per `(module, department)`. A lane writes only files named
`<MODULE>-<department>-…` in `concept/`, `article/`, `question/`, `written/`,
`practical/`, `evidence/`, `relations/`, `glossary/`. Nobody touches `101-ISK-*`
except the two 101 fix lanes named below, and nobody runs `build-batches.ts`,
`--sweep`, or `build-coverage.ts` without `--module`.

### Waves
1. **Wave A — concepts + articles** (the bottleneck): 102 Physiology; 103 Anatomy,
   Histology, Physiology, Biochemistry-gaps; 104 Anatomy, Histology, Physiology.
   In parallel: a tooling lane gives `build-evidence.ts` a `--module` parameter.
2. **Wave B — questions**: 102 banked MCQs (504) and unseeded sittings; 103 exam
   papers (13 EOY + 3 Baqoon + 3 written-question files, from the page cache);
   104 answered MCQs (287) and written pool (1,070); 103 practical batch.
3. **Wave C — evidence & graph**: run the generalised evidence build for 102/103/104;
   relations for all five modules; glossary; spans for 101 and 108; resolve the 101
   duplicate articles; finish the 8 blocked 103 concept rows.
4. **Wave D — gates**: `medical:simulate` + `medical:audit` per module, `[clear]`
   sentinel grep, coverage ledgers regenerated with `--module`, CLAIMS.md and
   INDEX.md updated, final report.

### Rules every lane follows
Source of truth is the department book page text in
`scripts/kasr/extract/pagetext/<sourceId>.json`; a definition, article section or
answer that the book does not support is left blank with a `field_notes` reason —
never filled from model knowledge. IDs: `mintConceptId` from `seeds/types.ts`;
`find-existing.mjs` before minting. Validate with `medical:batch` during work and
`medical:simulate --emit /tmp/sim-<lane>.json` + `medical:audit` before finishing.
No commits from lanes; the orchestrator commits per wave.

### Out of scope (cannot be done by agents)
Sourcing rights-cleared images for the 114+ media requests; importing into the live
library; faculty rulings recorded as open (diabetes chapter placement, the
inhalation-route node, the two contradictory mark schemes).
