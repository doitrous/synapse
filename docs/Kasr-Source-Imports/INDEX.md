# Kasr Alainy source imports

Batches extracted from Cairo University's Kasr Al Ainy corpus, on their way into
the canonical library. University `kau`; Year 1 is `KAU_Y1`.

Extraction has started. Each module has a coverage ledger saying exactly which
of its source files have been read and which have not — rerun
`scripts/kasr/build-coverage.ts --module "<id>"` and the numbers are today's.

| Module | Sources | Ledger |
|---|--:|---|
| `101 ISK` | 76 | [101-ISK-coverage.md](coverage/101-ISK-coverage.md) |
| `103 BMS` | 51 | [103-BMS-coverage.md](coverage/103-BMS-coverage.md) |

`101 ISK` has two subjects and one department book; `103 BMS` has **four** of
each, so its batches are split per subject — one file per `(subject, kind)`
rather than one per kind. A module with four departments cannot have one
concept file without four agents writing to it at once.

> **`build-coverage.ts` defaults to `101 ISK`**, so the bare command still
> produces exactly what it always did. Two things it will not do any more: read
> another module's extraction results through the unprefixed fallback paths,
> which are 101's; or count another module's batch files as this module's work.

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
| [`coverage/`](coverage/) | Per-source coverage ledgers, one per module: what each file yielded, what text was extracted, and which files nobody has read |
| `academic/` | Year, term, module and module-subject structure |
| `subjects/` | Module-subject trees mirroring each department book's chapters |
| `taxonomy/` | Canonical taxonomy placements |
| `resource/` | Resource records |
| `evidence/` | Claims, citations, sources, article spans — and [`corpus-source-index.json`](evidence/corpus-source-index.json), which is what lets a citation name a Kasr `src_…` at all. See below. |
| `concept/` | Canonical concepts |
| `relations/` | Typed concept relations |
| `article/` | Library articles |
| `question/` | Non-written assessment items — multiple choice, matching, labelling |
| `written/` | Written and essay questions. The import *kind* is `question`; the split is by content type, not by contract |
| `practical/` | Practical and OSCE items |
| `glossary/` | Glossary terms |
| [`media-requests/`](media-requests/) | Admin-only media requests, and the [audit](media-requests/media-audit.md) of how media is modelled. The repository holds **zero** medical images |

## Why there is a second corpus source index here

`scripts/build-corpus-source-index.mjs` walks `corpus/01-explicitly-taught/` and
indexes 267 sources. The Kasr Al Ainy Year 1 corpus came in through
`scripts/corpus-intake/` instead and lives in [`manifest/`](manifest/), so **none
of its 401 sources are in that index** — and `validate-content-batch.mjs` refuses
any citation naming one with *"is not a source the corpus contains"*, for files
that are real, checksummed and on disk.

That refusal blocks `resource → claim → citation → concept` outright, because a
concept's `atomic_claim_ids` must carry a value and no `field_notes` reason can
excuse it. It is why the first concept batches here carry no evidence at all.

[`evidence/corpus-source-index.json`](evidence/corpus-source-index.json) is the
index the validator actually looks for — it reads the one in the `evidence/`
folder beside the batch being validated, so a Kasr batch resolves against this
Kasr-rooted index while `docs/import-ready/` keeps resolving against the old one.
Two indexes, no merge, nothing to normalise.

Regenerate it with:

```
node --experimental-strip-types scripts/kasr/build-source-index.ts
```

It mints nothing: every ID, path and hash is copied from the manifest, and an ID
absent from the manifest is refused exactly as before. It carries
`exclusionReason` through, so a citation to a deliberately excluded file fails on
the exclusion rather than on a false claim that the file does not exist.

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
