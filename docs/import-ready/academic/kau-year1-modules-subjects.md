<!--
  Kasr al-Ainy (KAU) — Year 1 catalogue: 9 modules, their examined departments
  (subjects), credit points, and per-subject marks. Authored from the Faculty
  study guide 2025-2026 (p14-15) + the per-module marks tables (Omar, y1 marks).
  Paste into Admin -> Academic Setup -> Academic Import.

  Format: `# Year`, `## Term`, `- <module> [ID] (credit N)`, and indented
  `- <Department> (written eom N, written eoy N, practical eom N, practical eoy N)`.
  HTML comments are skipped. Marks omitted for a bucket = 0.

  Marks basis: the per-module tables split each department's allocated marks as
  Written End-of-Module (30%) + Written End-of-Year (40%) + Practical End-of-Year
  (30%). Basic-science practicals are held ONLY at end of year, so practical
  end-of-module = 0 throughout Year 1. Each department's three parts sum to its
  allocated total (checked on import: subjectTotal == allocated).

  - Module name kept as CODE (import adds subjects/credit/marks without renaming);
    faculty title + allocated total in the comment above each module.
  - INT-102 detailed marks sum to 200 (Biochem 126 + Physiology 74); the p15
    credit table's 210 is superseded by these per-subject tables.
  - MPC-126 and EPE-130: no per-department marks table was provided (only module
    totals 30 / 40) -> subjects carry no marks yet. Add when the split is supplied.
  - CRT-100 and TER-127 are vertical skills modules with no departments and no marks.
-->

# Year 1
## Term 1

<!-- Normal Structure of the Human Body — allocated 240 -->
- 101 ISK [101 ISK] (credit 12)
  - Anatomy and Embryology (written eom 46, written eoy 60, practical eoy 46)
  - Histology (written eom 26, written eoy 36, practical eoy 26)

<!-- Introduction to Biomedical Sciences — allocated 200 -->
- 102 INT [102 INT] (credit 10.5)
  - Biochemistry and Molecular Biology (written eom 38, written eoy 50, practical eoy 38)
  - Medical Physiology (written eom 22, written eoy 30, practical eoy 22)

<!-- Biomedical Sciences & Musculoskeletal System — allocated 300 -->
- 103 BMS [103 BMS] (credit 15)
  - Biochemistry and Molecular Biology (written eom 37, written eoy 50, practical eoy 37)
  - Histology (written eom 12.5, written eoy 16, practical eoy 12.5)
  - Anatomy and Embryology (written eom 26.5, written eoy 35, practical eoy 26.5)
  - Medical Physiology (written eom 14, written eoy 19, practical eoy 14)

<!-- Cardiopulmonary System — allocated 300 -->
- 104 CPS [104 CPS] (credit 15)
  - Medical Physiology (written eom 47, written eoy 64, practical eoy 47)
  - Histology (written eom 17, written eoy 22, practical eoy 17)
  - Anatomy and Embryology (written eom 26, written eoy 34, practical eoy 26)

<!-- Principles of Disease Mechanism & Pharmacological Basis of Drug Therapy-1 — allocated 40 -->
- 108 INT [108 INT] (credit 2)
  - Pathology (written eom 6, written eoy 8, practical eoy 6)
  - Pharmacology (written eom 6, written eoy 8, practical eoy 6)

<!-- Early Patient Encounter 1 — allocated 40; per-department split not provided -->
- 130 EPE [130 EPE] (credit 2)
  - Family Medicine
  - Incision Academy

<!-- Medical Professionalism & Communication Skills — allocated 30; per-department split not provided -->
- 126 MPC [126 MPC] (credit 1.5)
  - Public Health
  - Incision Academy

<!-- Critical Thinking (vertical) — no departments, no marks -->
- 100 CRT [100 CRT] (credit 1.5)

<!-- Terminology (vertical) — no departments, no marks -->
- 127 TER [127 TER] (credit 0.5)
