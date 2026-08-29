# Helwan Year 1 lane claims

Local coordination ledger for `docs/Helwan-Source-Imports/**` only. It does not replace or
edit the global claims ledger.

| Status | Scope | Stage | Owner | Output / boundary | Dependency |
|---|---|---|---|---|---|
| Open | `HU · HU_Y1 · manifest reconciliation` | S0 | `/root` dispatches one fresh intake worker | Reconcile 797 manifest rows, including 7 year-level rows, with the read-only 2026-08-26 root audit; report, do not delete/reclassify | `coverage/HU-Y1-READINESS.md` |
| checkpointed-incomplete | `HU · HU-BMS-101 · all subjects · triage` | S1 | fresh bounded continuation worker | 260 retained question records and 260 retained printed keys checkpointed in `coverage/HU-BMS-101-TRIAGE.md`; source-first duplicate collapse (`aa8 H7/H16`, then `aa8 P18/P24` into the potassium/RMP relation) leaves 179 tested-concept handles / 716 required queries; batches 1–8 adjudicated 160 handles / 640 queries (batch 8: +1 live, +12 pending, +7 new); including four prior proven handles, 164/179 are adjudicated: 8 live / 118 scope-proven pending / 38 new; 15 handles remain `UNADJUDICATED` / 60 queries | Continue in deterministic 15-handle / 60-query remainder (or bounded sub-batches); semantic same-idea/same-scope review is separate, then consolidate final distinct/live/pending/new totals for `/root` |
| Open | `HU · HU-BMS-102 · pathology + microbiology · triage` | S1 | unassigned | Key recovery and canonical-key search only | S0 source-ID/path resolution |
| Open | `HU · HU-BMS-102 · pharmacology + biochemistry · triage` | S1 | unassigned | Key recovery and canonical-key search only | S0 source-ID/path resolution |
| Open | `HU · HU-LCS-103 · anatomy + histology · triage` | S1 | unassigned | Assessment-led; exclude external-bank-only signal | S0 source-ID/path resolution |
| Open | `HU · HU-LCS-103 · pathology + physiology + pharmacology + biochemistry · triage` | S1 | unassigned | Assessment-led and exact key provenance | S0 source-ID/path resolution |
| Open | `HU · HU-PSY-104 · psychology · triage` | S1 | unassigned | Triage one local question source; report insufficient evidence without browser escalation | S0 source-ID/path resolution |

## Guardrails

- A claim is not permission for S2. Helwan Year 1 needs a fresh `TRIAGE APPROVED`.
- The seven unscoped Year-1 sources stay S0-owned and are never silently assigned to a module.
- Year 2 and Year 3 have no claim here and remain paused.
