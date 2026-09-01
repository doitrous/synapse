# MUST Year 1 — Claude handover

Updated: 2026-09-01
Status: **STOPPED at Omar's request. Do not continue automatically.**

## Workspace

- Worktree: `/Users/doitrous/Documents/CodexGPT/Codex-Synapse continue on Claude/ClaudeSynapse/.claude/worktrees/must-year1-codex`
- Branch: `codex/must-year1-content`
- HEAD: `c0413ddc` (`hold MUST Mucize advanced question 16`)
- MUST is **local-only Draft**. It has never been uploaded in this lane and must not be uploaded unless Omar explicitly changes that rule.
- Before doing anything, read the chief-of-staff onboarding path and this file.

## Current verified local totals

- Resources: **29**
- Draft articles: **44**
- Draft questions: **224**
- Needs-evidence concepts: **158**
- Claims: **224**
- Citations: **229**
- Spans: **224**
- Explicit holds: **269**
- Source-absent occurrences: **2**
- Remaining raw backlog: **5,220 prompt observations / 4,987 answer observations**

## Completed source work

- FHB-101 and MSK-101-1 were previously fully reconciled.
- FHB-102-2 triage is approved and all 94 hashes / 96 paths are processed.
- Completed downstream sets include:
  - Absalam source
  - Mosquitoes Part 2 Q1–Q30
  - Sandfly Q1–Q30
  - Mycology Q1–Q30
  - Virology Q1–Q30
  - Microbiology Chapter10 Q1–Q30
  - Pharmacology Part 2 Q1–Q30
  - Mucize Parasitology Q1–Q95
  - Mucize Cases1–8
  - Mucize Advanced Q1–Q16
- Advanced Q1–Q16 disposition: **2 authored / 14 held / 0 source-absent**.

## Recent commits

- `c0413ddc` — hold Advanced Q16
- `488064eb` — hold Advanced Q15
- `b35a642d` — hold Advanced Q14
- `5ae9467e` — author Advanced Q13
- `990cb502` — hold Advanced Q12
- `0d51e673` — author Advanced Q11
- Earlier case/advanced commits are immediately below these in git history.

## Exact next safe batch

A read-only source audit established a natural boundary **Advanced Q17–Q33**. It was not implemented before the stop.

- Printed keys: Q17 B, Q18 C, Q19 C, and Q20–Q33 all B.
- Preliminary safe-author candidates: **Q19, Q21, Q23, Q26, Q29**.
- Preliminary holds: **Q17, Q18, Q20, Q22, Q24, Q25, Q27, Q28, Q30, Q31, Q32, Q33**.
- Source-absent: 0.
- Expected batch: 5 questions, four new exact concepts, one safe existing-concept completion, and updates only to existing clinical-myiasis, mosquito-biology, and mosquito-control articles.
- If verified and committed, Advanced Q1–Q33 should close at **7 authored / 26 held / 0 absent / 0 unassessed**.
- The preliminary audit is guidance, not authority. Recheck every item against the PDFs before writing.

After Q33, the next source boundary is **Mucize Pharmacology — Antibacterial (1), Q1, physical page 29**. A second read-only audit was started but interrupted; do not assume it completed.

## Source paths

- Organized root: `/Users/doitrous/Desktop/Universities/MUST/Year 1/`
- Main assessment:
  `Semester 102/FHB 102-2/00 Module-wide/08 Midterm Exams/FHB102-2 MCQs till mid_MUCIZE DOCTORS PUPLISH.pdf`
- Governed teaching is under:
  `Semester 102/FHB 102-2/Parasitology/01 University Material/`
- Use existing Desktop sources only. Do not download replacements or move sources out of the organized tree.

## Safety and quality rules

- Preserve every printed key exactly. Conflicts become explicit holds; never repair a key by medical inference.
- Do not duplicate an already-authored same-source occurrence.
- A held dependency chain must not receive a sparse exact-ID update.
- All content remains Draft/needs_evidence.
- Run focused tests, per-file validation, full simulation, medical audit, taxonomy, concept-ID, duplicate-key, determinism, and exact diff checks before each atomic commit.
- Never upload MUST content.

## Worktree caution

- Current intended clean state is only untracked `tmp/`. Do not delete or stage it.
- The Q17–Q33 implementation had not begun when execution was stopped.

## Exact resume instruction

Start by checking `git status` and HEAD `c0413ddc`. Re-verify the Q17–Q33 source table visually, implement it as one atomic natural-boundary batch, run every gate, and commit locally. Stop before any upload.
