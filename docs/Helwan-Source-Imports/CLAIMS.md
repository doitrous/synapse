# Helwan Year 1 lane claims

Local coordination ledger for `docs/Helwan-Source-Imports/**` only. It does not replace or
edit the global claims ledger.

| Status | Scope | Stage | Owner | Output / boundary | Dependency |
|---|---|---|---|---|---|
| Open | `HU · HU_Y1 · manifest reconciliation` | S0 | `/root` dispatches one fresh intake worker | Reconcile 797 manifest rows, including 7 year-level rows, with the read-only 2026-08-26 root audit; report, do not delete/reclassify | `coverage/HU-Y1-READINESS.md` |
| complete-awaiting-approval | `HU · HU-BMS-101 · all subjects · triage` | S1 | `/root` consolidates module result | 260 retained question records and 260 retained printed keys; source-first duplicate collapse (`aa8 H7/H16`, then `aa8 P18/P24` into the potassium/RMP relation) leaves 179 tested-concept handles / 716 required queries. All 179 are adjudicated: 10 live / 126 scope-proven pending / 43 new; 0 remain unadjudicated. Complete module table is in `coverage/HU-BMS-101-TRIAGE.md`; no ID or content record was created. | Include in consolidated Helwan Year-1 S1 table; S2 remains blocked until `/root` issues fresh literal `TRIAGE APPROVED` |
| checkpointed-incomplete | `HU · HU-BMS-102 · pathology + microbiology · triage` | S1 | Pathology Tutorial 102 Families 1–2 checkpoint | Tutorial 102, printed pp. 242–255 (`src_88169dc9b6ad00181a0d`): 157 observed prompts, one printed key, 137 retained records and 118 distinct tested concepts after source and cross-family collapse. Family 2 has 2 live / 18 scope-proven pending / 54 no-same-scope external results (74 handles); cumulative concept delta is +67 beyond Family 1. Tutorial 103 pp. 256–262 remains excluded for LCS-103 review; no ID or content record was created. | Continue other BMS-102 pathology/microbiology S1 source rows; fresh Year-1 `TRIAGE APPROVED` still gates S2 |
| Open | `HU · HU-BMS-102 · pharmacology + biochemistry · triage` | S1 | unassigned | Key recovery and canonical-key search only | S0 source-ID/path resolution |
| checkpointed-incomplete | `HU · HU-LCS-103 · anatomy + histology · triage` | S1 | Anatomy Families 1–2 checkpoint | Anatomy written EOM `src_c690a159f01583eedac8`, printed pp. 1–5, plus locomotor quiz exams `src_5423328a4798dba3c3be`, pp. 1–11: 152 observed prompts, 75 printed keys and 73 tested concepts after the two exact repeat forms and Family-1 reuse. Cumulative dispositions: 4 live / 16 scope-proven pending / 53 new. No ID or content record was created. | Continue `src_414df0f15610aa4232f0` (physio previous exams), then the remaining assessment images and Tutorial 103; await fresh Year-1 `TRIAGE APPROVED` before S2 |
| Open | `HU · HU-LCS-103 · pathology + physiology + pharmacology + biochemistry · triage` | S1 | unassigned | Assessment-led and exact key provenance | S0 source-ID/path resolution |
| Open | `HU · HU-PSY-104 · psychology · triage` | S1 | unassigned | Triage one local question source; report insufficient evidence without browser escalation | S0 source-ID/path resolution |

## Guardrails

- A claim is not permission for S2. Helwan Year 1 needs a fresh `TRIAGE APPROVED`.
- The seven unscoped Year-1 sources stay S0-owned and are never silently assigned to a module.
- Year 2 and Year 3 have no claim here and remain paused.
