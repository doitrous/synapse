# Helwan Year 1 lane claims

Local coordination ledger for `docs/Helwan-Source-Imports/**` only. It does not replace or
edit the global claims ledger.

| Status | Scope | Stage | Owner | Output / boundary | Dependency |
|---|---|---|---|---|---|
| Open | `HU · HU_Y1 · manifest reconciliation` | S0 | `/root` dispatches one fresh intake worker | Reconcile 797 manifest rows, including 7 year-level rows, with the read-only 2026-08-26 root audit; report, do not delete/reclassify | `coverage/HU-Y1-READINESS.md` |
| complete-awaiting-approval | `HU · HU-BMS-101 · all subjects · triage` | S1 | `/root` consolidates module result | 260 retained question records and 260 retained printed keys; source-first duplicate collapse (`aa8 H7/H16`, then `aa8 P18/P24` into the potassium/RMP relation) leaves 179 tested-concept handles / 716 required queries. All 179 are adjudicated: 10 live / 126 scope-proven pending / 43 new; 0 remain unadjudicated. Complete module table is in `coverage/HU-BMS-101-TRIAGE.md`; no ID or content record was created. | Include in consolidated Helwan Year-1 S1 table; S2 remains blocked until `/root` issues fresh literal `TRIAGE APPROVED` |
| checkpointed-incomplete | `HU · HU-BMS-102 · pathology + microbiology · triage` | S1 | Pathology Families 1–8 checkpoint | Tutorial 102, Circulatory 2, Neoplasia 4, general-neoplasia, Circulatory 1, Infection, and Inflammation now total 644 observed prompts, 293 printed key occurrences, 443 retained records and 322 distinct tested concepts after source and cross-family collapse. Inflammation has 68 visibly keyed MCQs; six exact repeats leave 62 records and 43 handles (2 live / 5 pending / 36 new), 11 of which reuse prior-family scope for a +32 delta. Its questionable Q17, Q49, Q56, Q60 and Q68 keys remain preserved, not repaired. Tutorial 103 pp. 256–262 remains excluded for LCS-103 review; no ID or content record was created. | Continue nonduplicate `src_9a70f046e6b0b21ba4ee` L4 MCQs (the intervening `src_932f5302a132003041e5` is a manifest duplicate), then other BMS-102 pathology/microbiology S1 source rows; fresh Year-1 `TRIAGE APPROVED` still gates S2 |
| Open | `HU · HU-BMS-102 · pharmacology + biochemistry · triage` | S1 | unassigned | Key recovery and canonical-key search only | S0 source-ID/path resolution |
| checkpointed-incomplete | `HU · HU-LCS-103 · anatomy + histology · triage` | S1 | Families 1–14 checkpoint | Eligible assessment evidence remains 201 observed prompts, 75 printed keys and 111 resolved tested concepts (5 live / 28 pending / 78 new), plus the unresolved cropped phase-4 handle. The explicit-external Cartilage & Bone and Muscle banks `src_5da6cd6d288fb46dba2f` + `src_7f33f41ffaff192e3bc8` are separately recorded as 241 keyed MCQ occurrences and 75 coverage handles (9 live / 66 pending / 0 new); their source provenance excludes both from eligible Helwan totals. Q122–Q126 and Family-14 Q26 are practical-relevant MCQs, not practical artifacts. Tutorial 103 remains 33 unkeyed prompts/29 handles; the five Anatomy and three Pathology images remain 50 auxiliary notes. No ID or content record was created. | Continue rank-5 `src_103bc8809c3045ada51d`, then `src_5328082a807132f5cb29`; await fresh Year-1 `TRIAGE APPROVED` before S2 |
| Open | `HU · HU-LCS-103 · pathology + physiology + pharmacology + biochemistry · triage` | S1 | unassigned | Assessment-led and exact key provenance | S0 source-ID/path resolution |
| Open | `HU · HU-PSY-104 · psychology · triage` | S1 | unassigned | Triage one local question source; report insufficient evidence without browser escalation | S0 source-ID/path resolution |

## Guardrails

- A claim is not permission for S2. Helwan Year 1 needs a fresh `TRIAGE APPROVED`.
- The seven unscoped Year-1 sources stay S0-owned and are never silently assigned to a module.
- Year 2 and Year 3 have no claim here and remain paused.
