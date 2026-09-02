# University tree relocation — chief-of-staff review (2026-09-02)

Reviewed: `outputs/01a05dfd-2d04-7a11-9f92-98aae6a3e318/university-registry-move-ledger.csv`
(221 moves under `~/Desktop/Universities/`), plus the move plan, the medium-confidence review sheet,
and the pre-/post-relocation registries.

## Verdict

The relocation is sound. Every one of the 221 moves is applied on disk (target present, source
gone, plan and ledger agree row for row), the post-relocation registry carries the new paths, and
the pagetext cache is unaffected because it is keyed by content hash. Content-level checks turned
up one real misfile, one exact-duplicate created by the collision rule, and one systematic
filing choice worth a rule change. Nothing needs to be moved back.

## What the ledger holds

| Slice | Count |
|---|---:|
| Kasr Alainy | 199 |
| Alexandria | 8 |
| Ain Shams | 5 |
| MUST | 5 |
| Menoufia | 4 |
| Decided from the medium-confidence sheet | 182 |
| Verified overrides (no review columns) | 39 |
| Decided from registry evidence only (no page looked at) | 102 |
| Collisions | 1 |

Dominant pattern: Kasr Years 3–5 "Other Useful … /Files" dumps split into `Questions & MCQs` vs
`Notes & Books` (about 150 moves). Second pattern: department books filed under the wrong
department in Kasr Year 2 (Anatomy ↔ Histology ↔ Physiology ↔ Biochemistry, 12 overrides).
Third: autonomic-pharmacology crash notes sitting in Year-3 Parasitology / Pathology /
Ophthalmology folders sent to Year-2 `208 INT` Pharmacology (8 moves, consistent with the
`Sympathetic MCQ by Dr.Amr Elabd` file already living there).

## Checks performed

- Disk: all 221 targets exist, all 221 sources gone. Plan ↔ ledger: no planned move missing, no
  unplanned move applied.
- Registry: post-relocation rows carry the target path (spot-checked); document ids are
  path-derived, so every moved file got a NEW `document_id` (old id → new id only via
  `content_sha256`). Anything downstream keyed on `document_id` must re-key by hash.
- 54 cross-year / cross-term / cross-department moves read individually. All defensible; the
  16 "Internal Medicine → Paediatrics" moves are Abdelrahman Emad's *PEDIATRICS* MCQ series that
  had been dumped in Internal Medicine (cover page says PEDIATRICS; questions are 1-month-old /
  6-year-old vignettes). Thyroid → Surgery, Child Health → Family Medicine, MCH → Community all
  match their cover pages.
- 100 of the 102 registry-evidence moves have names that carry no question token
  ("Demography.pdf", "Mood Disorders.pdf"). First three pages auto-checked for question structure:
  65 clearly question banks, 31 low-signal read by hand (all consistent with their target —
  the Community/Psychiatry files are the same MCQ series; "in brief" / "Study smarter" /
  "summery" went to Notes & Books), 4 scans rendered.

## Findings

1. **Misfile — official exam paper filed as a department bank.**
   `Kasr Alainy/y4/Palliative Medicine & Oncology/Palliative Medicine/Questions & MCQs/Palliative all unsolved.pdf`
   is the Kasr end-of-module paper PLL-421 dated 23/06/2022 (CamScanner, 12 marks, bubble sheet).
   Ledger says origin=unknown, scope=none, category 03 DPT MCQ. It belongs in the module's `EOM`
   folder with origin=past_exam, scope=eom, year 2022. This matters for our sitting-year and
   exam-type fields.
2. **Exact duplicate created by the collision rule.**
   `y2/206 DIG/Biochemistry Dpt Biochemistry [1st priority]/MCQs/Bio EXAMS DIG [relocated 26b46dbc].pdf`
   has the same sha256 as the `Bio EXAMS DIG.pdf` already there (and a third copy sits in
   `_Catalog/Exact Duplicates`). The suffix rule should check the hash before suffixing; this copy
   can go to `_Catalog/Exact Duplicates`. Registry-wide, 988 hashes have more than one path.
3. **Rule gap — exam scope ignored when choosing the folder.** 26 moves the reviewer itself
   tagged midterm / resit / formative / unspecified_exam all landed in `Questions & MCQs`
   (e.g. `Paediatrics Diagnostic 196-1.pdf` tagged 07 Midterm; `Tropical 195 R2 [3rd].pdf` tagged
   09 Resit). The folder was chosen from learning_function alone. Eight Community files whose
   cover reads "MCQ COMMUNITY OSPE" carry scope=none and went to `Questions & MCQs` rather than
   `Practical & OSCE`. None of these are wrong enough to move back; the category axis is right,
   only the folder is generic.
4. **Kasr manifests were already on the old root.** `docs/Kasr-Source-Imports/manifest/*.json`
   and `evidence/corpus-source-index.json` point at `/Users/doitrous/Desktop/Kasr Alainy/…`
   (pre-`Universities/` root), so they were stale before this relocation; the two Year-1 files moved
   to `y2/210 PAT/EOY` (`EOY - 210 with answer (1).pdf`, `PHARMA PAT - 210 2023 (1).pdf`) and the
   two pharma tables cited in `docs/import-ready/academic/generated-2026/academic-intake-package.json`
   are the only repo references that changed path. The Ain Shams manifests / coverage docs cite the
   5 moved ASU files by old path (Y1 MBG genetics ×3, Y3 Communication Skills, Y3 Research
   Methodology) — none are in an active lane. Regenerate manifests before the next Phase-0 pass;
   no authoring lane is blocked.

## Actions

- Omar: move the Palliative PLL-421 paper to `…/Palliative Medicine/EOM/` (or say so and I will
  file it in the registry as past_exam/eom/2022).
- Omar: drop or catalogue the `[relocated 26b46dbc]` duplicate.
- Registry tooling: hash-check before suffixing on collision; route by assessment_scope when it
  is not `none` (midterm → Midterm, resit → Resit & Baqoon, ospe/osce → Practical & OSCE).
- CoS: manifests re-rooted to `~/Desktop/Universities/` on the next Phase-0 or manifest rebuild
  per university; ids re-keyed by sha256.
