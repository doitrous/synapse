<!--
  Module 108 INT — the subject tree, taken from the department's own books.

  Sources, both from ../manifest/kasr-y1-sources.json:

    `Dpt book intro patho 108-2026.pdf` (22 pages), "Introduction to Pathology",
    manifest source ID src_e294bafc730fe7111b06.

    `Dpt book general pharma 108-2026.pdf` (34 pages), "General Pharmacology:
    Introduction to Basic Principles of Drug Therapy", manifest source ID
    src_af30e4191cb4087f8d3f.

  Each book reaches the manifest twice, under two filenames, with the same
  checksum and the same source ID. One file in two places, counted once.

  The two subjects are not a guess. `108 INT/Pathology/` and
  `108 INT/Pharmacology/` exist in the corpus as empty directories, which is how
  this faculty declares a module's subjects — assumption A-04 in
  ../../medical-library-program/KASR-SOURCE-EXTRACTION-PLAN.md. There is no third
  subject and no book that suggests one.

  Beneath each subject the structure reproduces the book's own chapters and
  sections, as the programme requires. Nothing here is invented: where a book
  names a heading, that is a node; where it does not, there is none. Headings are
  reproduced as the books print them, including `Morphologic Alternations in Cell
  Injury`, which is the pathology book's own spelling, and `INTRACELLULAR
  ACCUMULATION AND EXTRACELLULAR DEPOSITIONS.`, which is its own punctuation.

  Two kinds of heading are deliberately left out: `Formative Assessment`, which
  appears at the end of each pathology chapter, and `References`. They are the
  books' apparatus rather than things a student is taught, and a subject tree is
  for filing teaching content. Every other heading in both books is here.

  The module has no faculty-written title. `101 ISK`'s came off its department
  book's cover — "Normal Structure of the Human Body (ISK – 101)" — but 108 INT
  has two books and neither names the module. So the module carries the
  catalogue's own label rather than an expansion of `INT` that nobody at the
  school wrote.

  Marks are recorded only where a source states them, which is why Pathology
  carries none. The one source that states any is the pharmacology orientation
  sheet, `ORIENTATION PHARMA ILOs_General_Pharmacology_2026-June.pdf`
  (src_b4f736e3bd809dbee187), whose header line reads in full:

    EOM: 6 marks, 12 MCQs; EOY: 8 marks, 2 SAQs, 4 marks each, OSPE: 6 marks

  Two cautions on those numbers, both for a reviewer to settle rather than for
  this file to decide:

    - The sheet is titled "ILOs of general pharmacology". Its marks are
      pharmacology's, not the module's, and they are recorded on that subject
      only.
    - The line gives OSPE 6 marks without naming a sitting. It is recorded as an
      end-of-year practical because the clause sits inside the EOY segment, after
      the semicolon that closes EOM. That is punctuation, not a statement, and if
      the OSPE is in fact an end-of-module practical this is the line to change.

  Pathology's marks can be inferred but are not recorded. The 2025 module paper
  (`EOY 108 exam 199`) opens with `Section 1: EOM (0.5 marks each)` and 24
  questions — 12 marks — of which the orientation sheet claims 12 questions and 6
  marks for pharmacology. That leaves 12 questions and 6 marks for pathology, and
  the arithmetic is clean. It is still arithmetic rather than a source, so it is
  written here and not in the outline.

  Import: Academic Setup › Import, with KAU as the target university. `[108 INT]`
  resolves onto the catalogue's existing `108 INT` (src/data/universities.ts:113);
  it does not create a second module.
-->

# Year 1
## Term 1
- 108 INT [108 INT]
  - Pathology
    - Introduction to Pathology
      - General classification of diseases
    - Cellular Response to Injury
      - Effects of cell injury stimuli
      - Causes of cell injury
      - Mechanisms of cell injury
      - Morphologic Alternations in Cell Injury
        - Reversible Injury (degeneration)
        - Irreversible Injury
      - Necrosis
        - Types of necrosis
          - Coagulative necrosis (ischemic necrosis)
          - Liquefactive or colliquative necrosis
          - Caseation necrosis
          - Fat necrosis
          - Fibrinoid necrosis
      - Apoptosis
        - Causes of apoptosis
        - Morphological changes
        - Control of apoptosis
    - Intracellular Accumulation and Extracellular Depositions
      - Intracellular Accumulations
        - Lipids intracellular accumulations
          - Steatosis (Fatty Change)
          - Cholesterol & Cholesterol Esters
        - Hyaline Change
        - Glycogen
        - Pigments
          - Exogenous Pigments
          - Endogenous Pigments
      - Pathological Calcification
        - Dystrophic calcification
        - Metastatic calcification
      - Amyloidosis
        - Pathogenesis of amyloidosis
        - Types of amyloid protein
        - Systemic amyloidosis
        - Localized amyloidosis
        - Staining characteristics of amyloid
        - Pathological changes in different organs in amyloidosis
          - Liver amyloidosis
          - Kidney amyloidosis
          - Spleen amyloidosis
          - Amyloidosis of gastrointestinal tract
          - Amyloidosis of the heart
        - Diagnosis of amyloidosis
  - Pharmacology (written EOM 6, written EOY 8, practical EOY 6)
    - Introduction
    - Passage of drugs across cell membranes
      - Simple diffusion
      - Carrier mediated transport
    - Pharmacokinetics
      - Absorption
        - Factors affecting drug absorption
        - Factors affecting oral absorption
        - Bioavailability
      - Distribution
        - Patterns of distribution
        - Factors affecting distribution of drugs
        - Apparent volume of distribution
      - Metabolism (Biotransformation)
        - Site of Metabolism
        - Types of Metabolic reactions
        - Enzymes responsible for drug metabolism
        - Factors affecting metabolizing enzyme activity
      - Excretion
        - Renal
        - The Lungs
        - The Alimentary Tract
        - Skin Glands
    - Fundamental Principles of Pharmacokinetics
      - Plasma Half Life
      - Loading dose
      - Maintenance dose
    - Pharmacodynamics
      - Possible Mechanisms of Action of Drugs
      - Definition of a receptor
      - Relation between Drug concentration and Response
      - Concentration-Response Curve of Drugs
      - Types of Ligands
      - Types of Antagonists
        - Competitive antagonists
        - Non-competitive antagonists
      - Types of receptors and signal transduction mechanism
    - Adverse Drug Reactions
      - Type A (Augmented or predictable undesirable adverse effects)
      - Type B (Bizarre or unpredictable adverse effects)
      - Type C (Chronic effects)
      - Type D (Delayed effects)
      - Type E (End of Use Effect)
    - Drug Interactions
      - Pharmaceutical drug interactions
      - Pharmacokinetic drug interactions
      - Pharmacodynamic drug interactions
    - Dosage of Drugs (Posology)
      - Uses of LD50
      - Therapeutic Index
    - Routes of Drug Administration and Dosage Forms
      - Oral route
      - Sublingual / Buccal route
      - Rectal route
      - Parenteral routes
        - Subcutaneous Implantation
        - Types of intravenous administration
      - Intra-arterial
      - Intra-cardiac
      - Intra-thecal
      - Intra-articular joint injection
      - Topical route
