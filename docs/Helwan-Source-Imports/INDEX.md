# Helwan University source imports

Batches extracted from Helwan University's undergraduate corpus (the faculty has since
been renamed Capital University; the catalogue and every batch still say `hu`) on their
way into the canonical library. University `hu`; years are `HU_Y1`, `HU_Y2`, `HU_Y3`.

Year-1 inventory is complete. The three-module authoring decision is recorded in
[`coverage/HU-Y1-READINESS.md`](coverage/HU-Y1-READINESS.md) and the machine-readable
checker at [`scripts/helwan/check-y1-readiness.mjs`](../../scripts/helwan/check-y1-readiness.mjs).
PSY-104 remains held/excluded; this index does not claim an all-four release.

## Modules

| Year | Module ID |
|---|---|
| `HU_Y1` | `BMS 101` |
| `HU_Y1` | `BMS 102` |
| `HU_Y1` | `LCS 103` |
| `HU_Y1` | `PSY 104` |
| `HU_Y2` | `INH 201` |
| `HU_Y2` | `Community 202` |
| `HU_Y2` | `NSS 203` |
| `HU_Y2` | `CRS 204` |
| `HU_Y3` | `GIT 301` |
| `HU_Y3` | `URS 303` |
| `HU_Y3` | `FTF 304` |
| `HU_Y3` | `ORL 305` |

Module IDs are exact, the faculty's own labels as the corpus folders name them. A folder
or filename shorthand resolves to the exact catalogue ID; it never mints a competing
module.

## Import order

The batches depend on each other. Apply them in this order:

1. `academic/` — module-subject structure.
2. `concept/` — required before dependent records.
3. `article/` — article evidence and concept links.
4. `written/`, `question/`, `practical/` — assessment records that name concepts and articles.
5. `media-requests/` — admin-only requests; no student-facing change occurs until a human supplies media.

To check a batch before importing it, name its dependencies with `--with`:

```text
npm run medical:batch -- docs/Helwan-Source-Imports/written/GIT-301-anatomy-written.md \
  --with docs/Helwan-Source-Imports/concept/GIT-301-anatomy-concepts.md \
  --with docs/Helwan-Source-Imports/article/GIT-301-anatomy.md
```

## What is here

| Folder | Holds |
|---|---|
| [`manifest/`](manifest/) | Source-of-record inventory: source file, module, exam type, priority and year signals |
| [`coverage/`](coverage/) | Per-source coverage ledgers and Year-1 closeout gates |
| [`academic/`](academic/) | Year, term, module and module-subject structure |
| [`subjects/`](subjects/) | Module-subject trees mirroring department-book chapters |
| [`taxonomy/`](taxonomy/) | Canonical taxonomy placements |
| [`evidence/`](evidence/) | Claims, citations, sources, article spans and source index |
| [`concept/`](concept/) | Canonical concepts |
| [`relations/`](relations/) | Typed concept relations |
| [`article/`](article/) | Library articles |
| [`question/`](question/) | Non-written assessment items — multiple choice, matching, labelling |
| [`written/`](written/) | Written and essay questions |
| [`practical/`](practical/) | Practical and OSCE items |
| [`glossary/`](glossary/) | Glossary terms |
| [`media-requests/`](media-requests/) | Admin-only media requests; the repository holds zero medical images |

## Module / Sources / Ledger

| Module | Sources | Ledger / status |
|---|---:|---|
| `BMS 101` | 175 Year-1 manifest rows | [`coverage/HU-Y1-READINESS.md`](coverage/HU-Y1-READINESS.md) — TRIAGE APPROVED / SCOPE-READY |
| `BMS 102` | 362 Year-1 manifest rows | [`coverage/HU-Y1-READINESS.md`](coverage/HU-Y1-READINESS.md) — TRIAGE APPROVED / SCOPE-READY |
| `LCS 103` | 231 Year-1 manifest rows | [`coverage/HU-Y1-READINESS.md`](coverage/HU-Y1-READINESS.md) — TRIAGE APPROVED / SCOPE-READY |
| `PSY 104` | 22 Year-1 manifest rows | [`coverage/HU-Y1-READINESS.md`](coverage/HU-Y1-READINESS.md) — inventory COMPLETE; authoring HOLD / EXCLUDED |
| `INH 201` | — | Year 2 paused |
| `Community 202` | — | Year 2 paused |
| `NSS 203` | — | Year 2 paused |
| `CRS 204` | — | Year 2 paused |
| `GIT 301` | — | Year 3 paused |
| `URS 303` | 5 | [`coverage/URS-303-coverage.md`](coverage/URS-303-coverage.md), [`coverage/URS-303-triage.md`](coverage/URS-303-triage.md) — Year 3 paused |
| `FTF 304` | — | Year 3 paused |
| `ORL 305` | — | Year 3 paused |

Seven explicit Year-1 year-level rows remain unscoped and are not counted under a module.

## Nothing is imported automatically

Every file in this tree is a proposed batch. It has no effect on the live platform until
Omar reviews and applies it by hand through the relevant Admin import page. No worker in
this tree runs an import or push.
