# MUST Year 1 coverage readiness — S0/S1 checkpoint

## Decision

**S0 is reconciled; FHB 101 S1 read-only triage may now be dispatched; S1 is not approved.** Under the priority law, FHB 101 has the strongest available Year 1 paper/key signal: 67 assessment-category sources, 10 answer/key-labelled assessment paths, and 115 candidate question-source files. It exceeds the next candidate, MSK 101-1 (62 / 6 / 103), and the volume-only candidate FHB 102-2 (51 / 0 / 96).

This is a source-file priority decision, not a claim that 10 keys have been read or recovered. A fresh FHB 101 triage lane must read all selected printed questions, recover keys, collapse concepts, search live/pending/new, and receive the literal **`TRIAGE APPROVED`** before any content is minted.

## Evidence and blocker

The counter reads root evidence only; it does not copy, fetch, transform, import, or alter it. At this run the academic package SHA-256 was `a7dedb2b818688464671abf546b6c374ced44901876457a413c544cfc612d78c`. The package/audit inputs are untracked WIP outside this worktree, so this branch records only the deterministic result. This does not block the authorised read-only FHB 101 triage dispatch; it blocks a portable S1 hand-off and issuing `TRIAGE APPROVED` until Omar accepts or lands a reviewed evidence snapshot.

## Exact counter output

```text
MUST Year 1 intake readiness — deterministic read-only count
Identity: must | MUST | MUST University | MUST_Y1
Evidence paths: inventory=/Users/doitrous/Documents/CodexGPT/Codex-Synapse continue on Claude/ClaudeSynapse/.codex/library_audit/must/inventory.tsv
Evidence paths: recovery=/Users/doitrous/Documents/CodexGPT/Codex-Synapse continue on Claude/ClaudeSynapse/.codex/library_audit/must_recovery/recovery-manifest.tsv
Evidence paths: package=/Users/doitrous/Documents/CodexGPT/Codex-Synapse continue on Claude/ClaudeSynapse/docs/import-ready/academic/generated-2026/academic-intake-package.json
Evidence paths: desktop=/Users/doitrous/Desktop/MUST
Snapshot counts: audit-inventory-records=6147; package-fileCount=6148; source-manifest-rows=6149
Manifest status rows: downloaded=412; existing=5687; failed=50
Current desktop files excluding .DS_Store/AppleDouble=6148 (current tree; not substituted for either snapshot)
Year 1 failed rows: failed=5; covered-equivalent=2; unresolved=3
Counting rule: exam=06 EOM Exams + 07 EOY Exams + 08 Midterm Exams; keyed-exam=exam pathname matches answer/answered/answer key/model answer/solution(s)/اجاب/إجاب/حل; question-source=exam + 05 MCQs. These are source-file counts, not extracted question or recovered-key counts.
term	academic_label	package_files	inventory_files	eom	eoy	midterm	exam	keyed_exam	mcq	question_sources
Semester 101	Biochemistry 101	52	52	1	0	12	13	1	12	25
Semester 101	FHB 101	198	203	21	0	46	67	10	48	115
Semester 101	MSK 101-1	220	226	13	0	49	62	6	41	103
Semester 101	MSK 101-2	178	182	6	0	36	42	2	37	79
Semester 101	Psychology 101	33	33	0	0	0	0	0	11	11
Semester 101	Statistics 101	15	15	0	0	0	0	0	5	5
Semester 101	University Requirements and Activities	41	40	0	0	0	0	0	0	0
Semester 102	Biochemistry 102	44	51	2	0	1	3	0	15	18
Semester 102	English 102	35	36	3	0	0	3	0	12	15
Semester 102	FHB 102-1	115	123	18	0	21	39	0	18	57
Semester 102	FHB 102-2	272	295	26	0	25	51	0	45	96
Semester 102	Medical Ethics 102	34	34	1	0	0	1	0	10	11
Semester 102	MSK 102-1	178	185	25	0	12	37	5	24	61
Semester 102	MSK 102-2	205	216	14	0	21	35	1	29	64
Semester 102	PCD 100-1	23	27	2	1	0	3	0	9	12
```
