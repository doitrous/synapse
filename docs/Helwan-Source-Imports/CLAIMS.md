# Helwan Year 1 lane claims

Local coordination ledger for `docs/Helwan-Source-Imports/**` only. It does not replace or
edit the global claims ledger.

| Status | Scope | Stage | Owner | Output / boundary | Dependency |
|---|---|---|---|---|---|
| Open | `HU · HU_Y1 · manifest reconciliation` | S0 | `/root` dispatches one fresh intake worker | Reconcile 797 manifest rows, including 7 year-level rows, with the read-only 2026-08-26 root audit; report, do not delete/reclassify | `coverage/HU-Y1-READINESS.md` |
| complete-awaiting-approval | `HU · HU-BMS-101 · all subjects · triage` | S1 | `/root` consolidates module result | 260 retained question records and 260 retained printed keys; source-first duplicate collapse (`aa8 H7/H16`, then `aa8 P18/P24` into the potassium/RMP relation) leaves 179 tested-concept handles / 716 required queries. All 179 are adjudicated: 10 live / 126 scope-proven pending / 43 new; 0 remain unadjudicated. Complete module table is in `coverage/HU-BMS-101-TRIAGE.md`; no ID or content record was created. | Include in consolidated Helwan Year-1 S1 table; S2 remains blocked until `/root` issues fresh literal `TRIAGE APPROVED` |
| checkpointed-incomplete | `HU · HU-BMS-102 · pathology + microbiology · triage` | S1 | Pathology Families 1–4 checkpoint | Tutorial 102, printed pp. 242–255 (`src_88169dc9b6ad00181a0d`), the paired Circulatory 2 assessment copies `src_557920d8b7726db4f14b` / `src_2b465fab7f0bfd7dd687`, and the Neoplasia 4 unsolved/solved pair `src_e1aac4e34bf9379bb178` / `src_83c77a2c46ce746c1981`: 325 observed prompts, 101 printed keys, 237 retained records and 187 distinct tested concepts after source and cross-family collapse. Family 4 has 1 live / 5 scope-proven pending / 48 no-same-scope external results (54 handles), including separate preservation of its Bcl2 printed-key conflict; its six prior-family overlaps yield a +48 concept delta. Tutorial 103 pp. 256–262 remains excluded for LCS-103 review; no ID or content record was created. | Continue other BMS-102 pathology/microbiology S1 source rows; fresh Year-1 `TRIAGE APPROVED` still gates S2 |
| Open | `HU · HU-BMS-102 · pharmacology + biochemistry · triage` | S1 | unassigned | Key recovery and canonical-key search only | S0 source-ID/path resolution |
| checkpointed-incomplete | `HU · HU-LCS-103 · anatomy + histology · triage` | S1 | Families 1–9 checkpoint | Assessment evidence remains 168 observed prompts, 75 printed keys and 82 resolved tested concepts (4 live / 25 pending / 53 new), plus the unresolved cropped phase-4 handle. Five local Anatomy images and first Pathology image are handwritten study-note pages: 37 numbered notes, no prompts or keys. Pathology image `src_4ee3e3e63fa0804576fb` adds ten auxiliary handles (0 live / 3 pending / 7 new); its osteoporosis demographic, vitamin-D rickets/osteomalacia and vitamin-C scurvy scopes are pending. The semimembranosus source conflict and malformed femoral-nerve statement remain preserved auxiliary evidence. No image changes assessment totals and no ID or content record was created. | Continue remaining pathology images, then Tutorial 103; await fresh Year-1 `TRIAGE APPROVED` before S2 |
| Open | `HU · HU-LCS-103 · pathology + physiology + pharmacology + biochemistry · triage` | S1 | unassigned | Assessment-led and exact key provenance | S0 source-ID/path resolution |
| Open | `HU · HU-PSY-104 · psychology · triage` | S1 | unassigned | Triage one local question source; report insufficient evidence without browser escalation | S0 source-ID/path resolution |

## Guardrails

- A claim is not permission for S2. Helwan Year 1 needs a fresh `TRIAGE APPROVED`.
- The seven unscoped Year-1 sources stay S0-owned and are never silently assigned to a module.
- Year 2 and Year 3 have no claim here and remain paused.
