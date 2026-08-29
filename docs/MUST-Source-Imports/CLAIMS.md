# MUST Year 1 — CLAIMS

| Claim | Owner | Scope / output | Dependencies | State |
|---|---|---|---|---|
| S0 source reconciliation | MUST Year 1 orchestrator | `coverage/00-source-reconciliation.md`, `coverage/00-year1-readiness.md`, read-only counter output | Root audit inventory, recovery manifest, academic intake package, Desktop MUST tree | committed checkpoint |
| S1 proposed first-module triage | FHB 101 triage lane checkpoint | Completed read-only sources: 1508 questions, 1244 printed keys/answers, 338 tested concepts; 66 live / 76 pending / 196 new, all new placement TBD. The newly closed 17-page General Embryology question bank contributes 93 prompts / 94 directly printed answer letters and +1 live concept after source-first and prior-FHB deduplication; the unmatched `G41 B` entry remains an orphan key. Durable metadata-only evidence snapshot: `manifest/fhb101-s1-ledger.tsv` (115 rows / 106 hashes) and `manifest/fhb101-s1-provenance.json`. Remaining: 73 inventory rows / 71 exact SHA-256s (set SHA-256 `03d7ebe49a001d164c09f746ef7b14eb44ce4f2f56ff6940fa87f157197d1446`); extraction debt 30 substantive + 37 empty + 6 sparse. No `concept/`, `article/`, `question/`, or catalogue files. | Read-only root/Desktop evidence access. Literal `TRIAGE APPROVED` remains required before any minting or S1 hand-off. | checkpointed-incomplete; approval blocked |

No claim grants authority to mint a canonical content-module ID, write student-facing content, alter the academic catalogue, import, publish, fetch sources, or edit root evidence.
