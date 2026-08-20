# Kasr Alainy source imports

Batches extracted from Cairo University's Kasr Al Ainy corpus, on their way into
the canonical library. University `kau`; Year 1 is `KAU_Y1`.

**Nothing here is medical content yet.** The manifest is complete; extraction has
not started.

## What is here

| Folder | Holds |
|---|---|
| [`manifest/`](manifest/) | **Done** — every source file, its module, exam type, priority and year signals. [Readable index](manifest/README.md). |
| `coverage/` | Per-source coverage ledgers: which pages were covered, excluded, or deferred |
| `academic/` | Year, term, module and module-subject structure |
| `subjects/` | Module-subject trees mirroring each department book's chapters |
| `taxonomy/` | Canonical taxonomy placements |
| `resource/` | Resource records |
| `evidence/` | Claims, citations, sources, article spans |
| `concept/` | Canonical concepts |
| `relations/` | Typed concept relations |
| `article/` | Library articles |
| `question/` | Non-written assessment items |
| `written/` | Written and essay questions |
| `practical/` | Practical and OSCE items |
| `glossary/` | Glossary terms |
| `media-requests/` | Admin-only media requests |

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
