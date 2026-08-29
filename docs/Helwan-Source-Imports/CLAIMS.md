# Helwan Year 1 lane claims

Local coordination ledger for `docs/Helwan-Source-Imports/**` only. It does not replace or
edit the global claims ledger.

| Status | Scope | Stage | Owner | Output / boundary | Dependency |
|---|---|---|---|---|---|
| Open | `HU · HU_Y1 · manifest reconciliation` | S0 | `/root` dispatches one fresh intake worker | Reconcile 797 manifest rows, including 7 year-level rows, with the read-only 2026-08-26 root audit; report, do not delete/reclassify | `coverage/HU-Y1-READINESS.md` |
| complete-awaiting-approval | `HU · HU-BMS-101 · all subjects · triage` | S1 | `/root` consolidates module result | 260 retained question records and 260 retained printed keys; source-first duplicate collapse (`aa8 H7/H16`, then `aa8 P18/P24` into the potassium/RMP relation) leaves 179 tested-concept handles / 716 required queries. All 179 are adjudicated: 10 live / 126 scope-proven pending / 43 new; 0 remain unadjudicated. Complete module table is in `coverage/HU-BMS-101-TRIAGE.md`; no ID or content record was created. | Include in consolidated Helwan Year-1 S1 table; S2 remains blocked until `/root` issues fresh literal `TRIAGE APPROVED` |
| checkpointed-incomplete | `HU · HU-BMS-102 · pathology + microbiology · triage` | S1 | Pathology Families 1–6 checkpoint | Tutorial 102, Circulatory 2, Neoplasia 4, general-neoplasia, and Circulatory 1 source pairs now total 542 observed prompts, 191 printed key occurrences, 347 retained records and 267 distinct tested concepts after source and cross-family collapse. Circulatory 1 has 93 observed occurrences, 45 exact repeats, 48 retained wordings, 28 key occurrences supporting 27 scopes, and 39 handles (0 live / 19 pending / 20 new); nine prior-family overlaps yield a +30 concept delta. Its malformed solved copy retains the orphaned answer-only clinical Q10, the lower/upper-limb wording change, and questionable source rationale rather than repairing them. Tutorial 103 pp. 256–262 remains excluded for LCS-103 review; no ID or content record was created. | Continue `src_f4017e73dcc32d5e9934` Infection MCQs, then other BMS-102 pathology/microbiology S1 source rows; fresh Year-1 `TRIAGE APPROVED` still gates S2 |
| Open | `HU · HU-BMS-102 · pharmacology + biochemistry · triage` | S1 | unassigned | Key recovery and canonical-key search only | S0 source-ID/path resolution |
| checkpointed-incomplete | `HU · HU-LCS-103 · anatomy + histology · triage` | S1 | Families 1–13 checkpoint | Eligible assessment evidence remains 201 observed prompts, 75 printed keys and 111 resolved tested concepts (5 live / 28 pending / 78 new), plus the unresolved cropped phase-4 handle. The external-labelled Cartilage & Bone bank `src_5da6cd6d288fb46dba2f` is separately recorded as 141 keyed MCQ occurrences and 49 coverage handles (5 live / 44 pending / 0 new); its explicit source provenance excludes it from eligible Helwan totals. Q122–Q126 are practical-relevant preparation-method MCQs, not practical artifacts. Tutorial 103 remains 33 unkeyed prompts/29 handles; the five Anatomy and three Pathology images remain 50 auxiliary notes. No ID or content record was created. | Review the next explicitly external source `src_7f33f41ffaff192e3bc8` for eligibility, then continue LCS debt; await fresh Year-1 `TRIAGE APPROVED` before S2 |
| Open | `HU · HU-LCS-103 · pathology + physiology + pharmacology + biochemistry · triage` | S1 | unassigned | Assessment-led and exact key provenance | S0 source-ID/path resolution |
| Open | `HU · HU-PSY-104 · psychology · triage` | S1 | unassigned | Triage one local question source; report insufficient evidence without browser escalation | S0 source-ID/path resolution |

## Guardrails

- A claim is not permission for S2. Helwan Year 1 needs a fresh `TRIAGE APPROVED`.
- The seven unscoped Year-1 sources stay S0-owned and are never silently assigned to a module.
- Year 2 and Year 3 have no claim here and remain paused.
