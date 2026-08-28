# MUST source-count reconciliation

The reported `6,147`, `6,148`, and `6,149` are not competing counts of one immutable set.

| Count | Evidence | Meaning |
|---:|---|---|
| 6,147 | `.codex/library_audit/must/inventory.tsv` | Audit inventory **data records** (the TSV has one additional header line). |
| 6,148 | `academic-intake-package.json` → MUST `sourceSnapshots[].fileCount` | Academic package's local-file snapshot at its own build time. |
| 6,149 | Ten `00 Source Manifest - <semester>.tsv` files | Logical source-manifest data rows: 412 `downloaded` + 5,687 `existing` + 50 `failed`. Failed remote rows are source obligations, not local files. |

The one-record `6,147` → `6,148` difference is a snapshot-time difference; the package retains only the aggregate/hash, not the pre/post file path needed to identify it safely. The current Desktop file count is intentionally reported separately by the counter and is not substituted for either snapshot.

For Year 1, the recovery manifest has five failed rows: two have a likely existing equivalent and three remain unresolved. They are source-access/recovery debt, not permission to recreate material from another university or to author around a missing source.

Raw evidence is untracked root WIP. This checkpoint preserves the reconciliation result and reproduction command, but not a wholesale copy of the evidence; that is the durable-evidence blocker for S1.
