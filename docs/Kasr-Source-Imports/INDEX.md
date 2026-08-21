# Kasr Alainy source imports

Batches extracted from Cairo University's Kasr Al Ainy corpus, on their way into
the canonical library. University `kau`; Year 1 is `KAU_Y1`.

Extraction has started, on module **101 ISK** first. The
[coverage ledger](coverage/101-ISK-coverage.md) says exactly which of its source
files have been read and which have not; rerun
`scripts/kasr/build-coverage.ts` and its numbers are today's.

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
npm run medical:batch -- docs/Kasr-Source-Imports/written/101-ISK-EOY-2025-written.md \
  --with docs/Kasr-Source-Imports/concept/101-ISK-concepts.md \
  --with docs/Kasr-Source-Imports/article/101-ISK-histology.md
```

`npm run medical:citations` checks that every manifest ID cited anywhere here
names a real file. Both run on every pull request that touches this folder.

## What is here

| Folder | Holds |
|---|---|
| [`manifest/`](manifest/) | **Done** — every source file, its module, exam type, priority and year signals. [Readable index](manifest/README.md). |
| [`coverage/`](coverage/101-ISK-coverage.md) | Per-source coverage ledgers: what each file yielded, and which have not been read |
| `academic/` | Year, term, module and module-subject structure |
| `subjects/` | Module-subject trees mirroring each department book's chapters |
| `taxonomy/` | Canonical taxonomy placements |
| `resource/` | Resource records |
| `evidence/` | Claims, citations, sources, article spans |
| `concept/` | Canonical concepts |
| `relations/` | Typed concept relations |
| `article/` | Library articles |
| `question/` | Non-written assessment items — multiple choice, matching, labelling |
| `written/` | Written and essay questions. The import *kind* is `question`; the split is by content type, not by contract |
| `practical/` | Practical and OSCE items |
| `glossary/` | Glossary terms |
| [`media-requests/`](media-requests/) | Admin-only media requests, and the [audit](media-requests/media-audit.md) of how media is modelled. The repository holds **zero** medical images |

## Module IDs are exact

The catalogue's ID for module 101 is **`101 ISK`**, not `101`
(`src/data/universities.ts:109`). A folder or filename shorthand resolves to the
exact catalogue ID; it never mints a competing module. The shorthand is kept on
the manifest as `rawModuleShorthand`.

Every item extracted from a module's sources carries `kau`, `KAU_Y1`, the exact
module ID, and the module-subject path.

## The corpus itself is not in this repository

It lives at `/Users/doitrous/Desktop/Kasr Alainy` — 415 files, 1.4 GB. The
manifest records each file's absolute path and its checksum, so a row can be
resolved back to a file, and a file whose bytes changed can be spotted.

Rebuild the manifest with [`scripts/corpus-intake/`](../../scripts/corpus-intake/README.md).

## Open question that affects every priority decision

Twelve filenames carry both a batch code and a calendar year, and ten of the
twelve disagree by exactly one year. Both values are recorded and neither is
overwritten. Until it is settled which is authoritative, "the latest three
years" cannot be computed reliably. See §8 of
[the plan](../medical-library-program/KASR-SOURCE-EXTRACTION-PLAN.md).
