# Helwan Year 1 triage gates

This is the closeout gate for committed HEAD `caa55c80966d4eea5d5b145d8a6bc8bfd80081b8`.
It separates the fact that the source inventory is complete from the narrower set of
modules released for authoring.

## Gate decision

> **TRIAGE APPROVED — HU-BMS-101, HU-BMS-102, and HU-LCS-103 only. HU-PSY-104 remains
> HOLD and is excluded until an official paper/bank with a matched key is supplied.**

This is a scoped three-module approval. It is not an all-four approval. No PSY-104
authority is inferred from its local study-bank answers.

| Gate | State | Meaning |
|---|---|---|
| Source inventory | COMPLETE | 797 Year-1 manifest rows are retained: 175 BMS-101, 362 BMS-102, 231 LCS-103, 22 PSY-104 and 7 year-level rows |
| BMS-101 authoring scope | TRIAGE APPROVED / SCOPE-READY | 260 retained / 260 keys / 179 handles |
| BMS-102 authoring scope | TRIAGE APPROVED / SCOPE-READY | Primary 762/405/552/372; auxiliary 3565/2541/3269/2936/+1499; all eligible 4327/2946/3821/1871 |
| LCS-103 authoring scope | TRIAGE APPROVED / SCOPE-READY | Eligible 1080Q/710A/337 concepts; practical 94 prompts/526 plates/3039 mappings/173 residues/87 keys |
| LCS-103 external ledger | EXCLUDED | 7635 questions / 7349 answers / 221 excluded rows are retained as ledger evidence only |
| PSY-104 authoring scope | HOLD / EXCLUDED | 78 raw / 78 answer blocks / 76 retained / 48 handles; official assessment authority is missing |
| All-four authoring release | NOT GRANTED | `allFourRelease=false`; PSY-104 is outside the approved scope |
| Year 2 / Year 3 | PAUSED | Outside this Year-1 closeout |

## Authority rules

- S1 triage evidence supports scope readiness; it does not silently turn every observed
  answer into an official key.
- BMS-102 primary, auxiliary, and all-eligible dimensions are reported separately. The
  auxiliary and aggregate numbers must not be substituted for the primary assessment
  authority.
- LCS practical plates and mappings are evidence dimensions, not retrofitted question
  records. External-ledger rows remain excluded from authoring.
- PSY-104's answer blocks remain source evidence. Conflicting study-bank answers do not
  establish official authority.
- S2 authoring/import still follows the authoring contract and requires human application
  through the Admin import page.

## Deterministic report

Run from repository root:

```text
node scripts/helwan/check-y1-readiness.mjs
```

The default JSON report includes:

- aggregate inventory counts and completion status;
- authoring-release module statuses and the literal scoped decision;
- authority labels and guardrail checks;
- manifest and Year-1 source-ID SHA-256 checksums;
- a snapshot checksum over the closeout counts and statuses.

Use `--text` for a compact key/value report. Use `--root-audit <path>` only to append a
read-only direct-path reconciliation; the audit cannot change a gate.
