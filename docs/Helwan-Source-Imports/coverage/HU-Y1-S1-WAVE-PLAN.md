# Helwan Year 1 — evidence-ranked S1 wave plan

Status: S1 planning only. No record creation is authorised.

Rank actual Helwan assessments and printed keys first, then department material, then notes.
Another university's bank is context only; it cannot establish a Helwan question claim.
Every worker searches live and pending concepts before assigning `live`, `pending`, or
`new`.

| Rank | Dispatch scope | Evidence to start with | Why this is first | Required S1 return |
|---:|---|---|---|---|
| 1 | `HU-BMS-101 · all subjects` | Four EOM files: `src_03cc8b051c09473d48be`, `src_aa8bb730fbccdbf7d6e0`, `src_b7c0eb8f1cafb9f6c9d7`, solved `src_f5f3ba808a5eb4afa3a0`; formative-answer `src_86786ce382d463dc3036` | Only Year-1 module with explicit official EOM packet plus solved answer file | De-duplicated question/key ledger, page evidence, concept assignment, live/pending/new |
| 2 | `HU-BMS-102 · pathology + microbiology` | Tier-1 department pathology bank `src_88169dc9b6ad00181a0d`; 84 question-source rows including solved pathology companions | Highest direct department-bank evidence | Per-subject counts, key status, canonical-key candidates, external-bank exclusions |
| 3 | `HU-BMS-102 · pharmacology + biochemistry` | Three assessment files, 84 question rows, solved biochemistry banks `src_1c60f50ead8f40b9ec44`, `src_7ce9691056d728be0f13`, `src_9e03b5ed652b866cf88d` | Separate ownership avoids collisions and preserves pathology priority | Subject-led table with exact provenance/exclusions |
| 4 | `HU-LCS-103 · anatomy + histology` | Three assessment files, eight quizzes, 85 question rows, solved histology `src_5da6cd6d288fb46dba2f` and `src_7f33f41ffaff192e3bc8` | High volume but many explicitly external labels | Eligible-Helwan-only count, rejected rows, key source, concept disposition |
| 5 | `HU-LCS-103 · pathology + physiology + pharmacology + biochemistry` | Three assessment files; solved physiology/tutorial `src_103bc8809c3045ada51d`, `src_5328082a807132f5cb29` | Separate from anatomy/histology prevents key/output collisions | Same S1 fields split across the four subjects |
| 6 | `HU-PSY-104 · psychology` | One question row; 10 lectures and eight cases are teaching context only | Insufficient assessment signal for question-led build | Prove usability, then `needs Omar sources` blocker if insufficient |

## S0 gate

Retain the 797-row manifest as source-of-record. The read-only audit has 785 direct Year-1
paths after excluding `_Exact Duplicates`: 13 manifest paths are absent and it has one
additional unscoped schedule. This is reconciliation only, never authority to drop a source.

After ranks 1–6, send one consolidated Year-1 table to `/root` and wait for fresh
`TRIAGE APPROVED` before S2.
