<!--
  Module 104 CPS — the subject tree, taken from the department's own books.

  Sources, all three "Department Book" PDFs for the module, all native text:
    * `Dpt book anatomy 2026 104.pdf` (157 pages) — Anatomy.
      Manifest source ID src_4bd55e9eaf092282818c.
    * `Dpt Book Book of Histology (CPS 104) 2026 1st Year (2).pdf` (53 pages) —
      Histology, printed as "Part II" of a book whose title page names the
      Physiology, Histology and Anatomy departments together.
      Manifest source ID src_18d3a953df4ca83c4e74.
    * `Dpt book CPS 104 physio 2025-2026 104.pdf` (160 pages) — Physiology.
      Manifest source ID src_a11a7faed67c95e2d636.
  See ../manifest/kasr-y1-sources.json.

  The three subjects are not a guess. The manifest's moduleSubjectDeclarations
  carry three `empty subject folder` notes for this module — `y1/104 CPS/Anatomy`,
  `y1/104 CPS/Histology`, `y1/104 CPS/Physiology` — and there is one department
  book per subject under exactly those names.

  The module name is "Cardiopulmonary System", and it is sourced rather than
  guessed: the orientation heads its syllabus "Topics of Cardiopulmonary Module
  CPS (104)", which is the department's own expansion of CPS. The bracketed
  `[104 CPS]` is the catalogue ID and is what actually resolves; the name is the
  label a student reads beside it, and a bare repetition of the code would be a
  worse label than the words the department itself used. This follows what
  101 ISK's outline does with "Introduction to Structure & Function [101]".

  Beneath each subject the structure reproduces each book's own chapters.
  Nothing here is invented — where a book names a chapter, that is a node; where
  it does not, there is none.

    * Anatomy has no contents page. Its fourteen chapters are its own printed
      `Chapter N` headings, in order, at pp. 1, 3, 21, 27, 48, 55, 61, 93, 100,
      103, 109, 119, 124 and 133. It names no sub-chapters, so there are none
      here. Two notes. Chapter 6's heading is printed "Pericardium (Fig. 42)";
      the figure reference is a slip in the heading and is dropped. And "The
      Diaphragm" (pp. 43-47) opens its own page in chapter style between chapter
      4 and chapter 5 but carries no chapter number — it is recorded in its book
      position, because the orientation examines it by name and dropping it
      would lose five pages of the syllabus.

    * Histology has an explicit LIST OF CONTENTS on p. 2, and its four chapters
      and sixteen sub-chapters are taken from it and confirmed against the
      chapter headings in the body. The contents page spells chapter I
      "Cardivascular System"; the body spells it CARDIOVASCULAR SYSTEM, and that
      is the spelling used here.

    * Physiology has no contents page either. It is in two parts, titled
      CARDIOVASCULAR SYSTEM (pp. 0-95) and RESPIRATORY SYSTEM (pp. 96-150) on
      their opening pages and carried in the running heads as "Cardiopulmonary
      (Cardiovascular)" and "Cardiopulmonary (Respiration)". Each part numbers
      its own chapters in the running head — six and five — and each of those
      is a sub-chapter here, named by the heading on the page where the number
      turns over: pp. 15, 21, 42, 61 and 91 for the cardiovascular part, pp.
      110, 118, 124 and 135 for the respiratory one. Chapter 1 of each part
      prints no title of its own — its opening page carries the part title and
      the learning objectives — so it takes the first substantive heading that
      follows, "Electrical Activity of the Heart" (p. 2) and "Organization of
      the Respiratory System" (p. 97). That is the one judgement call in this
      file. The unnumbered INTRODUCTION on p. 1 introduces the part rather than
      a chapter and is not a node.

  Marks are recorded only where a source states them. The orientation
  (`ORIENTATION 104 EOM AND EOY Orientation of Final Written Anatomy Exam (First
  Year-2026) (3).pdf`, manifest source ID src_1af5e66e7436d968ccfe) says
  "Anatomy marks of module 104 — Module 104: Marks 34", for the end-of-year
  written paper, set as five SAQs of six marks and one case of four. So Anatomy
  carries 34 at end of year. Histology and Physiology carry none: it is the only
  orientation in the module's corpus and it states no number for either, and a
  plausible guess in a marks field is worse than a blank one.

  Import: Academic Setup › Import. `[104 CPS]` resolves onto the catalogue's
  existing `104 CPS`; it does not create a second module.
-->

# Year 1
## Term 1
- Cardiopulmonary System [104 CPS]
  - Anatomy (written EOY 34)
    - Thoracic Cage
    - Intercostal Spaces
    - Thoracic Cavity
    - Lungs
    - The Diaphragm
    - Mediastinum
    - Pericardium
    - Heart
    - Large Arteries of the Thorax
    - Large Veins of the Thorax
    - Large Nerves of the Thorax
    - Large Tubes of the Thorax
    - Lymphatics of the Thorax
    - Development of the Respiratory System
    - Development of the Heart
  - Histology
    - Cardiovascular System
      - The heart
      - Arteries
      - Veins
      - A-V Connections
    - Lymphatic and Macrophage System
      - Lymph node
      - Spleen
      - Tonsils
      - Thymus
      - Macrophage system
    - Respiratory System
      - Conducting Portion
      - Respiratory Portion
      - Alveolar Phagocytes
    - Cytogenetics
      - The Cell Cycle
      - Cell Division
      - Human Chromosome
      - Chromosomal Aberrations (Abnormalities)
  - Physiology
    - Cardiovascular System
      - Electrical Activity of the Heart
      - Mechanical Properties of Cardiac Muscle
      - Cardiac Function
      - Vascular Function
      - Basic Mechanisms of Circulatory Control
      - Special Circulation
    - Respiratory System
      - Organization of the Respiratory System
      - Pulmonary Compliance
      - Gas exchange in the lung
      - Gas Transport by the Blood
      - Control of Respiration
