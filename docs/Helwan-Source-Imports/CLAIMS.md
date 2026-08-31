# Helwan Year 1 lane claims

Local coordination ledger for `docs/Helwan-Source-Imports/**`. This records inventory and
the scoped authoring gate; it does not replace the global claims ledger and does not itself
perform an import.

## Closeout claims

| Status | Scope | Evidence / boundary | Dependency |
|---|---|---|---|
| COMPLETE | `HU · HU_Y1 · manifest` | 797 retained rows: BMS-101 175, BMS-102 362, LCS-103 231, PSY-104 22, plus 7 explicit year-level rows. Year-level rows remain unscoped. | [`coverage/HU-Y1-READINESS.md`](coverage/HU-Y1-READINESS.md) |
| TRIAGE APPROVED / SCOPE-READY | `HU · HU-BMS-101` | 260 retained questions / 260 printed keys / 179 tested-concept handles. S1 evidence only; no IDs or content records created. | Authoring validation and human import |
| TRIAGE APPROVED / SCOPE-READY | `HU · HU-BMS-102` | Primary 762/405/552/372; auxiliary 3565/2541/3269/2936 with +1499 concepts; all eligible 4327/2946/3821/1871. Dimensions remain separately labelled; auxiliary answers are not silently promoted to official keys. | Authoring validation and human import |
| TRIAGE APPROVED / SCOPE-READY | `HU · HU-LCS-103` | Eligible 1080 questions / 710 answers / 337 concepts; external ledger 7635 questions / 7349 answers / 221 excluded rows; practical 94 prompts / 526 plates / 3039 mappings / 173 residues / 87 keys. | Authoring validation and human import |
| HOLD / EXCLUDED | `HU · HU-PSY-104` | Inventory is complete at 78 raw / 78 answer blocks / 76 retained / 48 handles, but authority is insufficient. No official paper/bank with a matched key is present; conflicting study-bank answers remain source evidence. | Supply official paper or bank with matched key |

## Decision boundary

> **TRIAGE APPROVED — HU-BMS-101, HU-BMS-102, and HU-LCS-103 only. HU-PSY-104 remains
> HOLD and is excluded until an official paper/bank with a matched key is supplied.**

The decision is deliberately scoped to three modules. It is not an all-four release. S2
authoring/import remains subject to the repository authoring contract and human Admin
application. Year 2 and Year 3 have no claim in this ledger and remain paused.

## Deterministic evidence

`node scripts/helwan/check-y1-readiness.mjs` is the machine-readable source of the manifest
invariants, aggregate inventory, authoring-release statuses, authority labels, and SHA-256
checksums. Its JSON report keeps aggregate inventory distinct from authoring release and
sets `allFourRelease` to `false`.
