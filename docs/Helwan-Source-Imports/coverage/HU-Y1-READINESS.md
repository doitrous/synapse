# Helwan Year 1 — readiness checkpoint

This is a Year-1-only S0/S1 planning checkpoint, not content completion and not Year-2/Year-3
approval.

## Source-of-record reconciliation

- Retained manifest: **797** `HU_Y1` rows — BMS-101 175, BMS-102 362, LCS-103 231,
  PSY-104 22, and seven explicit year-level rows.
- Newer root audit: **785** direct `/helwan/Year 1/` paths after excluding
  `_Exact Duplicates`; BMS-101 173, BMS-102 357, LCS-103 225, PSY-104 22, Administration
  five, Reference Library three.
- It is read-only reconciliation input. It has 13 manifest-source paths absent from the
  direct scan and one additional year-level schedule; whitespace and duplicate holding paths
  make raw path comparison unsafe. No source row was removed, reassigned, or used to mint
  content.

## Deterministic readiness output

```text
node scripts/helwan/check-y1-readiness.mjs --root-audit "/Users/doitrous/Documents/CodexGPT/Codex-Synapse continue on Claude/ClaudeSynapse/library_audit/inventory.tsv"
Helwan Y1 readiness check
manifest_hu_y1_rows=797
HU-BMS-101=175
HU-BMS-102=362
HU-LCS-103=231
HU-PSY-104=22
unscoped_year_level=7
scoped_rows=790
manifest_invariant_errors=0
wave_evidence_refs=13
wave_evidence_ref_errors=0
s0_readiness=READY
s1_readiness=PLANNED_FRESH_TRIAGE_REQUIRED
year2_year3=PAUSED
root_audit_direct_hu_y1_rows=785
root_audit_minus_manifest=-12
root_audit_status=READ_ONLY_RECONCILIATION_ONLY
```

S0 may dispatch its reconciliation owner. S1 is planned but not approved: every ranked
dispatch in `HU-Y1-S1-WAVE-PLAN.md` remains triage-only until a fresh consolidated Helwan
Year-1 table receives literal `TRIAGE APPROVED`.
