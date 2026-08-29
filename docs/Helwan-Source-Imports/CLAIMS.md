# Helwan Year 1 lane claims

Local coordination ledger for `docs/Helwan-Source-Imports/**` only. It does not replace or
edit the global claims ledger.

| Status | Scope | Stage | Owner | Output / boundary | Dependency |
|---|---|---|---|---|---|
| Open | `HU · HU_Y1 · manifest reconciliation` | S0 | `/root` dispatches one fresh intake worker | Reconcile 797 manifest rows, including 7 year-level rows, with the read-only 2026-08-26 root audit; report, do not delete/reclassify | `coverage/HU-Y1-READINESS.md` |
| checkpointed-incomplete | `HU · HU-BMS-101 · all subjects · triage` | S1 | fresh bounded continuation worker | 260 retained question records and 260 retained printed keys checkpointed in `coverage/HU-BMS-101-TRIAGE.md`; deterministic register is 180 tested-concept handles / 720 required queries; batches 1–4 adjudicated 80 handles / 320 queries (batch 4: +0 live, +13 pending, +7 new); 84/180 handles adjudicated cumulatively: 4 live / 64 scope-proven pending / 16 new; 96 handles remain `UNADJUDICATED` / 384 queries | Continue in deterministic 20-handle / 80-query batches; semantic same-idea/same-scope review is separate, then consolidate final distinct/live/pending/new totals for `/root` |
| Open | `HU · HU-BMS-102 · pathology + microbiology · triage` | S1 | unassigned | Key recovery and canonical-key search only | S0 source-ID/path resolution |
| Open | `HU · HU-BMS-102 · pharmacology + biochemistry · triage` | S1 | unassigned | Key recovery and canonical-key search only | S0 source-ID/path resolution |
| Open | `HU · HU-LCS-103 · anatomy + histology · triage` | S1 | unassigned | Assessment-led; exclude external-bank-only signal | S0 source-ID/path resolution |
| Open | `HU · HU-LCS-103 · pathology + physiology + pharmacology + biochemistry · triage` | S1 | unassigned | Assessment-led and exact key provenance | S0 source-ID/path resolution |
| Open | `HU · HU-PSY-104 · psychology · triage` | S1 | unassigned | Triage one local question source; report insufficient evidence without browser escalation | S0 source-ID/path resolution |

## Guardrails

- A claim is not permission for S2. Helwan Year 1 needs a fresh `TRIAGE APPROVED`.
- The seven unscoped Year-1 sources stay S0-owned and are never silently assigned to a module.
- Year 2 and Year 3 have no claim here and remain paused.
