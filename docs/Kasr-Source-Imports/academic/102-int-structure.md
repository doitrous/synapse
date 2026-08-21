<!--
  Module 102 INT — the subject tree, taken from the department's own book.

  Source: `Department Book Module 102.pdf` (167 pages), "Introduction to Biomedical
  Sciences (INT – 102)", by staff of the Medical Biochemistry Department and the
  Physiology Department, Faculty of Medicine, Cairo University. Manifest source
  src_a488633802ec053c6325 — see ../manifest/kasr-y1-sources.json.

  The two subjects are not a guess. `102 INT/NOTE 2 SUBJECTS ARE BIOCHEMISTRY AND
  PHYSIOLOGY NOTE/` states them, and the book is in two parts under exactly those
  names: Part I "Medical Biochemistry and Molecular Biology" (physical p2), Part II
  "Physiology" (physical p112).

  Beneath each subject the structure reproduces the book's own chapters. Part I's
  Contents (physical p3) is a flat list of fourteen Roman-numbered chapters with no
  grouping level, so there is none here. Part II's Contents (physical p113) groups
  its nineteen chapters under Blood and Autonomic Nervous System, so those two
  nodes exist. The depths differ because the book's do.

  Two page offsets, because Part II restarts its numbering:
  Part I  printed = physical - 4    (printed 1 is physical 5)
  Part II printed = physical - 113  (printed 1 is physical 114)

  A second book was read and deliberately not used as the tree. `Dpt book PHYSIO
  First Year.pdf` is the physiology department's whole-year book, covering 102 and
  103, and it names 27 chapters where the module book names 19. The module book
  wins on evidence, not on assumption: the exam orientation's exclusion list opens
  with INTRODUCTION, BODY FLUIDS and HOMEOSTASIS, none of which exists in the year
  book's 102 half and all three of which are printed headings inside the module
  book's — so the orientation was written against this book. The year book's finer
  chapters are carried on each record in
  ../../../scripts/kasr/extract/102-INT/physio-chapters.json as `yearBookChapters`,
  and the seven places the two books genuinely disagree are recorded there as
  `conflict` rather than resolved silently.

  Marks are recorded only where a source states them. Neither of module 102's two
  orientations states a mark total, so neither subject carries one — unlike 101
  ISK, where Anatomy's 60 came from its orientation. The 2025 end-of-year paper
  divides 80 marks as Biochemistry 50 and Physiology 30, but that is one sitting's
  paper rather than a stated allocation, and it is recorded on the paper's own
  batch instead of here.

  33 leaf chapters, 6 of them cancelled for the written exam by the
  department's own announcements. A cancelled chapter stays in the tree: it is
  still taught and still examined practically, and a student revising for the
  practical needs the node.

  Import: Academic Setup › Import. `[102]` resolves onto the catalogue's existing
  `102 INT`; it does not create a second module.
-->

# Year 1
## Term 1
- Introduction to Biomedical Sciences [102]
  - Biochemistry
    - Amino Acids of Biological Importance
    - Proteins of Biological Importance
    - Carbohydrates of Biological Importance
    - Lipids of Biological Importance
    - Chemistry of Hemoproteins
    - Proteins of Extracellular Matrix
    - Enzymes
    - Chemistry of Free Nucleotides
    - Chemistry of Nucleic Acids
    - DNA Synthesis (Replication) and Repair
    - RNA Synthesis (Transcription)
    - Protein Synthesis (Translation)
    - Regulation of Gene Expression
    - Cell Cycle, Apoptosis, and Tumor Suppressor Genes
  - Physiology
    - Blood
      - Introduction
      - General functions and blood components
      - Plasma proteins
      - RBCs and haemoglobin
      - Erythropoiesis
      - Iron
      - Vitamin B12 and folic acid
      - Anaemia
      - Platelets and haemostasis
      - Physiological limitations of blood coagulation
      - Anticoagulants
      - Abnormalities of haemostasis
      - Blood groups and blood transfusion
    - Autonomic nervous system
      - The nervous system
      - Organisation of autonomic nervous system
      - Autonomic ganglia
      - Sympathetic nervous system
      - Parasympathetic nervous system
      - Chemical transmission at autonomic junctions and autonomic receptors

<!--
  Cancelled for the written paper, with the announcement that cancels each:

  102 INT > Biochemistry > Proteins of Extracellular Matrix
    BIO ORIENTATION 102 (2025/2026), under "A-Cancelled Items for Final Exam -Module 102/2026": "Proteins Of Extracellular Matrix From page 44 to page 49". Printed 44-49 is exactly this chapter, so the whole chapter is cancelled.

  102 INT > Biochemistry > Regulation of Gene Expression
    BIO ORIENTATION 102 (2025/2026), under "A-Cancelled Items for Final Exam -Module 102/2026": "Regulation Of Gene Expression From page 98 to page 102". Printed 98-102 is exactly this chapter, so the whole chapter is cancelled.

  102 INT > Physiology > Blood > Introduction
    Orientation src_701b6db49a7c01d79428 p1, 'Theoretical topics not included in final theoretical exam: 102' names '- INTRODUCTION', '- BODY FLUIDS' and '- HOMEOSTASIS'. Cancelled for the written paper only; still taught and still examined practically.

  102 INT > Physiology > Blood > Anticoagulants
    Orientation src_701b6db49a7c01d79428 p1, 'Theoretical topics not included in final theoretical exam: 102' names '- ANTICOAGULANTS'. Cancelled for the written paper only; still taught and still examined practically.

  102 INT > Physiology > Blood > Abnormalities of haemostasis
    Orientation src_701b6db49a7c01d79428 p1, 'Theoretical topics not included in final theoretical exam: 102' names '- ABNORMALITIES OF HEMOSTASIS'. Cancelled for the written paper only; still taught and still examined practically.

  102 INT > Physiology > Blood > Blood groups and blood transfusion
    Orientation src_701b6db49a7c01d79428 p1, 'Theoretical topics not included in final theoretical exam: 102' names both '- BLOOD GROUPS' and '- BLOOD TRANSFUSION'. Cancelled for the written paper only; still taught and still examined practically.

  Four further chapters are cancelled only in PART — a heading inside them is
  named by an orientation while the rest of the chapter is examinable. Those
  carry `false` with an `exclusionNote` beginning "PARTIAL." in
  physio-chapters.json, because a chapter-level flag cannot say "printed page 20
  of this chapter is off the paper" and flagging the whole chapter would tell a
  student to skip examinable material.
-->
