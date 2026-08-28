# Helwan University source imports

Batches extracted from Helwan University's undergraduate corpus (the faculty has
since been renamed Capital University; the catalogue and every batch still say
`hu`), on their way into the canonical library. University `hu`; years are
`HU_Y1`, `HU_Y2`, `HU_Y3`.

Extraction has not started. See `LANE-BRIEF.md` for standing orders and hazards
before writing anything here.

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

Module IDs are exact, the faculty's own label as the corpus folders name it —
`Community 202` is how the faculty's own Telegram index writes it, not an
expansion anyone here invented. A folder or filename shorthand resolves to the
exact catalogue ID; it never mints a competing module.

## Import order

The batches depend on each other, and applying them out of order half-imports
them. Concepts first, then articles, then everything that points at both:

1. `academic/` — the module-subject tree. Everything else's `module_subject`
   resolves against it.
2. `concept/` — nothing else can be imported without these.
3. `article/` — an article names its concepts, which is what puts its ID on the
   concept record.
4. `written/`, `question/`, `practical/` — each names a concept and an article,
   and the importer will not accept one that names something absent.
5. `media-requests/` — admin-only, applied by pasting a block into the item's
   own media column. Nothing student-facing changes until a human supplies the
   file.

To check a batch before importing it, name its dependencies with `--with`:

```
npm run medical:batch -- docs/Helwan-Source-Imports/written/GIT-301-anatomy-written.md \
  --with docs/Helwan-Source-Imports/concept/GIT-301-anatomy-concepts.md \
  --with docs/Helwan-Source-Imports/article/GIT-301-anatomy.md
```

## What is here

| Folder | Holds |
|---|---|
| [`manifest/`](manifest/) | The helwan-intake lane's — every source file, its module, exam type, priority and year signals. Not this lane's to touch. |
| [`coverage/`](coverage/) | Per-source coverage ledgers, one per module: what each file yielded, what text was extracted, and which files nobody has read |
| [`academic/`](academic/) | Year, term, module and module-subject structure |
| [`subjects/`](subjects/) | Module-subject trees mirroring each department book's chapters |
| [`taxonomy/`](taxonomy/) | Canonical taxonomy placements |
| [`evidence/`](evidence/) | Claims, citations, sources, article spans — and a `corpus-source-index.json` the validator needs beside the batch |
| [`concept/`](concept/) | Canonical concepts |
| [`relations/`](relations/) | Typed concept relations |
| [`article/`](article/) | Library articles |
| [`question/`](question/) | Non-written assessment items — multiple choice, matching, labelling |
| [`written/`](written/) | Written and essay questions. The import *kind* is `question`; the split is by content type, not by contract |
| [`practical/`](practical/) | Practical and OSCE items |
| [`glossary/`](glossary/) | Glossary terms |
| [`media-requests/`](media-requests/) | Admin-only media requests. The repository holds **zero** medical images |

## Module / Sources / Ledger

Filled in as each module lane finishes its coverage ledger.

| Module | Sources | Ledger |
|---|--:|---|
| `BMS 101` | | |
| `BMS 102` | | |
| `LCS 103` | | |
| `PSY 104` | | |
| `INH 201` | | |
| `Community 202` | | |
| `NSS 203` | | |
| `CRS 204` | | |
| `GIT 301` | | |
| `URS 303` | 5 (2 md notes + 3 recall/crib PDFs; 0 department book, 0 lecture set) | [`coverage/URS-303-coverage.md`](coverage/URS-303-coverage.md), [`coverage/URS-303-triage.md`](coverage/URS-303-triage.md) |
| `FTF 304` | | |
| `ORL 305` | | |

## Nothing here is imported

Every file in this tree is a proposed batch. It has no effect on the live
platform until Omar reviews it and applies it by hand through the relevant
Admin import page. No subagent working in this tree runs `git commit`,
`git push`, or an import.
