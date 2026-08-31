# Helwan Year 1 closeout

This closeout records the final Year-1 inventory and the scoped authoring decision at
committed HEAD `caa55c80966d4eea5d5b145d8a6bc8bfd80081b8`. Inventory completion and
authoring release are separate states: a counted source is not automatically an approved
authoring source.

## Inventory state

The retained manifest is complete: **797 `HU_Y1` rows** — BMS-101 **175**, BMS-102
**362**, LCS-103 **231**, PSY-104 **22**, and **7** explicit year-level rows. The seven
year-level rows remain unscoped and are not silently assigned to a module.

| Module | Manifest rows | Inventory status | Authority boundary |
|---|---:|---|---|
| HU-BMS-101 | 175 | COMPLETE | S1 triage evidence |
| HU-BMS-102 | 362 | COMPLETE | S1 triage evidence; primary and auxiliary dimensions kept separate |
| HU-LCS-103 | 231 | COMPLETE | S1 triage evidence; eligible, external and practical dimensions kept separate |
| HU-PSY-104 | 22 | COMPLETE | Inventory complete, but official assessment authority is HOLD |

The read-only root audit previously reported 785 direct Year-1 paths. That reconciliation
is evidence only; it does not replace the 797-row manifest or authorize deleting,
reassigning, or minting a source row.

## Authoritative module closeout counts

Counts below are source-first triage inventory. “Answer” means an observed answer/key
occurrence; it does not imply official authority unless the authority column says so.

| Module / dimension | Counts | Status | Authority |
|---|---|---|---|
| BMS-101 | **260 retained questions / 260 printed keys / 179 handles** | SCOPE-READY | S1 triage evidence |
| BMS-102 primary | **762 observed / 405 printed answers / 552 retained / 372 handles** | SCOPE-READY | Primary assessment evidence |
| BMS-102 auxiliary | **3565 observed / 2541 answer occurrences / 3269 retained / 2936 handles / +1499 concepts** | SCOPE-READY | Eligible auxiliary evidence; not promoted to primary authority |
| BMS-102 all eligible | **4327 observed / 2946 answer occurrences / 3821 retained / 1871 handles** | INVENTORY TOTAL | Aggregate eligible evidence; primary and auxiliary remain labelled |
| LCS-103 eligible | **1080 questions / 710 answers / 337 concepts** | SCOPE-READY | Eligible Helwan evidence |
| LCS-103 external ledger | **7635 questions / 7349 answers / 221 excluded rows** | INVENTORY TOTAL | External/non-Helwan ledger; excluded from authoring |
| LCS-103 practical | **94 prompts / 526 plates / 3039 mappings / 173 residues / 87 keys** | SCOPE-READY | Practical evidence; plates/mappings are not retrofitted into questions |
| PSY-104 | **78 raw / 78 answer blocks / 76 retained / 48 handles** | HOLD / EXCLUDED | No official paper or bank with a matched key; study-bank answers remain source evidence |

## Scoped authoring decision

> **TRIAGE APPROVED — HU-BMS-101, HU-BMS-102, and HU-LCS-103 only. HU-PSY-104 remains
> HOLD and is excluded until an official paper/bank with a matched key is supplied.**

This is a three-module scope-ready authoring release. It is **not** an all-four release;
PSY-104 remains explicitly held and excluded. No question, concept, article, ID, content
record, or import was created by this closeout.

## Deterministic checker

Run from the repository root:

```text
node scripts/helwan/check-y1-readiness.mjs
```

The default output is stable JSON containing manifest counts, module counts, statuses,
authority labels, gate checks, and SHA-256 checksums. Add `--text` for a compact key/value
view. Add `--root-audit <path>` only for a read-only direct-path reconciliation; that input
does not alter readiness or release status.

## Remaining guardrails

- S2/import work still requires authoring validation and human application through the
  relevant Admin import page.
- PSY-104 must not be represented as authoring-ready until an official paper or bank and a
  matched key are supplied.
- Year 2 and Year 3 remain paused and are outside this closeout.
