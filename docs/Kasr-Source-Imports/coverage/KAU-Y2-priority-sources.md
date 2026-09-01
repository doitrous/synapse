# Kasr Alainy Year 2 — priority source set, tier ≤5 (S1)

Tier follows `manifest/kasr-y2-sources.json`'s `sourceTier`: 1 = Orientation,
2 = EOM/EOY/EOM & EOY, 3 = Baqoon (resit), 4 = Department Book, 5 = Department
Questions / Practical / Written Questions (banks), 6 = Instructor material /
Exam-section revision material, 7 = Important & Summaries, 8 = Catalogue (excluded,
not a source). **Papers = tier 1–3, Department Book = tier 4, Banks = tier 5** —
"papers → dept books → banks" below follows that order. **236 of 631 rows are
tier ≤5.**

**Sitting-year rule** (Year 2, k=2): EOM = batch + 1825 + k = batch + 1827; EOY /
Baqoon = batch + 1826 + k = batch + 1828. A calendar year printed on the file always
wins over the batch-derived year, for any exam type. `manifest/README-y2.md` already
applied this (as `batch + 1826 + 2`, the EOY/Baqoon case) when it computed each row's
`examSittingYear`; an EOM paper with no printed calendar label is left `null` rather
than guessed, because its academic year began the previous December (same straddle
rule as Year 1).

**Filename note:** `fileName` below is what the manifest recorded on 2026-08-22.
Re-verification (this session) found the underlying bytes unchanged but ~218 paths
renamed since then (mostly a `Department Book - ` prefix added inside `Dpt` folders,
plus whitespace/timestamp cleanup on EOM/EOY filenames) — see `manifest/README-y2.md`
"Re-verification" note. Match by content (`sourceId`/`sha256`) if a listed name is not
found verbatim on disk.

## 205 NEU — 11 papers, 3 dept books, 9 banks

**Papers (tier 1–3)**

| File | Type | Sitting year | Solved |
|---|---|--:|---|
| `EOM - NEU 205 EOM 197.pdf` | EOM | — | — |
| `EOM - NEU 205 EOM 197_answers.pdf` | EOM | — | solved |
| `EOY - ‎⁨205 بعد الشرح فاينال⁩.pdf` | EOY | — | solved |
| `EOM NEU 204 (2019)_231120_230158.pdf` | EOM | 2019 | — |
| `EOM - NEU-205 2024 Answered.pdf` | EOM | 2024 | solved |
| `EOY {NEU - 205} (198) Solved.pdf` | EOY | 2026 | solved |
| `EOY {NEU - 205} (198).pdf` | EOY | 2026 | — |
| `EOM - second 2021 204 NEU end of module-1_231128_221131.pdf` | Baqoon | 2021 | — |
| `EOM - second 2021 204 NEU end of module_231128_221120.pdf` | Baqoon | 2021 | — |
| `EOY (NEU-205) {198 2nd} Solved.pdf` | Baqoon | 2026 | solved |
| `EOY (NEU-205) {198 2nd}.pdf` | Baqoon | 2026 | — |

5 of 11 papers keyed (solved). No orientation file recovered for 205.

## 206 DIG — 10 papers, 4 dept books, 31 banks

**Papers (tier 1–3)**

| File | Type | Sitting year | Solved |
|---|---|--:|---|
| `EOM - 206 solved (197).pdf.pdf` | EOM | — | solved |
| `EOM - DIG-206 EOM (solved).pdf` | EOM | — | solved |
| `EOM 206 -197- Unsolved.pdf` | EOM | — | unsolved |
| `EOM DIG – 195.pdf` | EOM | — | — |
| `EOM DIG – 196.pdf` | EOM | — | — |
| `EOM - END -GIT 194- 2022.pdf` | EOM | 2022 | — |
| `EOM - Exam {DIG 195}(206) 2023.pdf` | EOM | 2023 | — |
| `EOM - DIG-206 2024 196.pdf` | EOM | 2024 | — |
| `EOY (DIG - 206) 198 - Solved.pdf` | EOY | 2026 | solved |
| `EOY (DIG - 206) 198.pdf` | EOY | 2026 | — |

By far the largest bank set of the six modules (31 tier-5 files) — mostly Anatomy MCQ
banks under the `Dpt` Anatomy folder. No Baqoon paper recovered for 206; no orientation.

## 207 END — 10 papers, 3 dept books, 6 banks

**Papers (tier 1–3)**

| File | Type | Sitting year | Solved |
|---|---|--:|---|
| `EOM (END - 207) 198 (Solved).pdf.pdf` | EOM | — | solved |
| `EOM (END - 207) 198.pdf.pdf` | EOM | — | — |
| `EOM - DOC-20250422-WA0043_250801_203149 (1).pdf` | EOM | — | — |
| `EOM - END - 207 2023 195.pdf` | EOM | 2023 | — |
| `EOM - End of END - 207 2023 195 With Answers .pdf` | EOM | 2023 | solved |
| `EOM - END-207 2024 ANS.pdf` | EOM | 2024 | solved |
| `EOY - SOLVED EOY 207-END {198}.pdf` | EOY | 2026 | solved |
| `EOY - Unsolved EOY 207-END {198}.pdf` | EOY | 2026 | unsolved |
| `EOY (END-207) {198 2nd} Solved.pdf` | Baqoon | 2026 | solved |
| `EOY (END-207) {198 2nd}.pdf` | Baqoon | 2026 | — |

## 208 INT — 24 papers, 2 dept books, 10 banks — **richest exam set in Year 2**

**Papers (tier 1–3)**

| File | Type | Sitting year | Solved |
|---|---|--:|---|
| `EOM - 2nd_Grade_ILOs_and_study_guide_for_the_EOM_exam_study_copy_2026.pdf` | Orientation | — | — |
| `EOY - 2nd Grade ILOs and study guide for the EOY exam.pdf` | Orientation | — | — |
| `EOY - BLOOD ORIENTATION EOY .pdf` | Orientation | — | — |
| `EOY - CVS 1 Orientation EOY .pdf` | Orientation | — | — |
| `EOY - CVS-2 Orientation EOY .pdf` | Orientation | — | — |
| `EOY - PAT210_ and 208-Drug_Index_Final.pdf` | Orientation | — | — |
| `EOY - autacoid Orientation EOY .pdf` | Orientation | — | — |
| `EOM - 208 EOM MCQ ( 198) (ANSWERED )-1-27.pdf` | EOM | — | solved |
| `EOM - Merged_ Moussa 208 (198).pdf` | EOM | — | — |
| `EOM {INT - 208} 198 (Solved).pdf` | EOM | — | solved |
| `EOM {INT - 208} 198.pdf` | EOM | — | — |
| `EOM - End of INT - 208 2023 195 With Answers .pdf` | EOM | 2023 | solved |
| `EOM - INT - 208 2023 195.pdf` | EOM | 2023 | — |
| `EOY - INT - 208 2023.pdf` | EOY | 2023 | — |
| `EOM - 208-2024.pdf` | EOM | 2024 | — |
| `EOM - End of Module INT-208 2024 ANS .pdf` | EOM | 2024 | solved |
| `EOM - End of Module INT-208 2024.pdf` | EOM | 2024 | — |
| `EOY - Written INT-208 2024 196.pdf` | EOY | 2024 | — |
| `EOY - Written INT-208 2024-196.pdf` | EOY | 2024 | — |
| `EOY - 208 197 written 1st.pdf` | EOY | 2025 | — |
| `EOY {INT-208} 198 [Solved].pdf` | EOY | 2026 | solved |
| `EOY {INT-208} 198.pdf` | EOY | 2026 | — |
| `EOY (INT-208) {198 2nd} (Solved).pdf` | Baqoon | 2026 | solved |
| `EOY (INT-208) {198 2nd}.pdf` | Baqoon | 2026 | — |

24 papers (7 orientation + 15 EOM/EOY + 2 Baqoon) spanning sitting years 2023–2026,
6 already keyed/solved, plus 24 exam-section revision files (tier 6, not counted
above) — no other Year-2 module comes close on exam-paper density. **Selected as the
first-module triage target (S1) below.**

## 210 PAT — 6 papers, 3 dept books, 9 banks

**Papers (tier 1–3)**

| File | Type | Sitting year | Solved |
|---|---|--:|---|
| `EOY - Drug index Final (INT-208 & PAT-210) Modifed.pdf` | Orientation | — | — |
| `GIT- Orientation .pdf` | Orientation | — | — |
| `Resp Orientation .pdf` | Orientation | — | — |
| `EOY - 210 with answer.pdf` | EOY | — | solved |
| `EOM & EOY {PAT - 210} 198 (Solved).pdf` | EOM & EOY | 2026 | solved |
| `EOM & EOY {PAT - 210} 198.pdf` | EOM & EOY | 2026 | — |

Two of `210 PAT`'s three orientation files are shared with `208 INT` (drug index,
GIT/Resp orientation) — same cross-module orientation pattern
`SHARED-TOOLCHAIN.md` documents for Year 1; each module reads only its own page,
nothing double-minted from it.

## 213 PSY — 0 papers, 3 dept books, 4 banks — gap

No EOM, EOY or Baqoon paper recovered for `213 PSY` in this corpus — 24 files total,
all instructor material / department book / bank, no keyed exam paper. **Needs Omar**
if a 213 paper exists outside this tree; otherwise 213's own concept coverage will
have to lean entirely on department-book + bank material with no paper-side exam
signal.

## Secondary modules (not in `KAU_MODULES`, tier ≤5 counts only)

| Module | Papers (t1-3) | Dept book (t4) | Banks (t5) |
|---|--:|--:|--:|
| `EPE-230` | present | present | present (10 tier≤5 total) |
| `MPE-227` | present | — | present (9 tier≤5 total) |
| `RES-234 Research` | present | — | present (10 tier≤5 total) |
| `Entrepreneurship` | present | — | (3 tier≤5 total) |
| `Health Economics` | — | — | (3 tier≤5 total) |
| `Computer` | — | — | (2 tier≤5 total) |

Not triaged in this pass — Phase 0 scope is the six catalogue modules; these six carry
no `KAU_Y2` id (see `academic/KAU-Y2-modules.md`).

## Practical 2nd Year — 51 tier≤5 rows, no module owner

`Practical 2nd Year/` (82 files total; 51 at tier ≤5) is cross-module by construction —
Anatomy/Histology/Pathology/Pharmacology/Physiology practical material with no single
module id, same shape as Year 1's unowned `PRACTICAL FIRST YEAR/`
(`SHARED-TOOLCHAIN.md` §"What no lane owns"). Not absorbed into any one module's
triage below; awaiting the same ruling as Year 1's.

## Summary

| Module | Papers (t1-3) | Dept book (t4) | Banks (t5) | Solved papers |
|---|--:|--:|--:|--:|
| `205 NEU` | 11 | 3 | 9 | 5 |
| `206 DIG` | 10 | 4 | 31 | 3 |
| `207 END` | 10 | 3 | 6 | 5 |
| `208 INT` | 24 | 2 | 10 | 6 |
| `210 PAT` | 6 | 3 | 9 | 2 |
| `213 PSY` | 0 | 3 | 4 | 0 |

`208 INT` has both the most papers and the most solved/keyed papers — selected as the
S1 first-module triage target.
