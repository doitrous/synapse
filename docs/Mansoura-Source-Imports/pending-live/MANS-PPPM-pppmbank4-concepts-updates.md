<!--
  Sparse updates only. Every ## id below targets a concept that already exists in another university's pending batch -- none of these ids are in server/data/medical-library-v1.json yet. Apply each record ONLY after its target file (named per record) is live.
  
  Per this lane's own precedent (MANS-PPPM-pppmbank2/3-concepts-updates.md) and the Alexandria AU-MED-103-histology.md one before it: `## label` is restated verbatim (a blank label on an update row would blank the live concept's real label on merge). `## canonical_key` is written too, as the discriminator. `## module_subject` is deliberately NOT written here -- it is not an append-safe column (a bare value replaces wholesale), and every target record below already carries its own real module_subject naming its home module; writing one here would silently erase that placement on merge. The Mansoura module attachment survives on `## modules` (append-safe) instead, and the Mansoura exam appearance (source, page, cluster) is recorded in `field_notes` `universityNotes:` prose, where it cannot collide with anything.
  
  `## universities`, `## modules` and `## learner_years` are append-safe list columns: `+mans`, `+MANS-PPPM`, `+1` add without disturbing the target record's existing asu/aun tags.
  
  Lane mans-pppm-author4 (cluster pppmbank4, Microbiology p.28-36 of PPPM Exam Bank ( 61, 60, 59, 58).pdf, src_111bbd078054dc30d3af). Three further reused ids (CON-INF-3E6590C8AC2166, CON-INF-7789C0F6154E35, CON-IMM-50269E374FCFE9) are already LIVE and are updated directly in concept/MANS-PPPM-concepts-4.md instead of here, per 00-START-HERE.md's rule that pending-live is only for ids not yet live. Gate is `medical:batch` with every target file named via --with -- run once without --with (expect the "does not exist" refusal) and once with (expect a clean pass); these `## id`s are not live, so `medical:simulate` cannot resolve them yet and is not the gate here:
  
    node scripts/content/gate.mjs batch "docs/Mansoura-Source-Imports/pending-live/MANS-PPPM-pppmbank4-concepts-updates.md" \
      --with docs/import-ready/concept/ASU-MBG-gene-therapy-concepts.md \
      --with docs/Ain-Shams-Source-Imports/concept/ASU-INF-microbiology-concepts.md \
      --with docs/Ain-Shams-Source-Imports/concept/ASU-IMM-immunology-concepts.md \
      --with docs/Ain-Shams-Source-Imports/concept/ASU-IMM-foundations-concepts.md \
      --with docs/Assiut-Source-Imports/concept/AUN-INI-105-concepts.md \
      --with docs/Assiut-Source-Imports/concept/AUN-INI-105-ch6-concepts.md
-->

# Item

## id
CON-FND-C444D428BE3E1D

## canonical_key
restrictionendonuclease.origin-and-recognition.bacterial-source-palindromic-sites

## label
Restriction endonucleases are bacterial enzymes that recognise and cut DNA at specific palindromic sequences, and it is this specific recognition — not indiscriminate cutting — that makes them the basic tool of recombinant DNA technology

## universities
+mans

## modules
+MANS-PPPM

## learner_years
+1

## field_notes
universityNotes: mans: PPPM Exam Bank ( 61, 60, 59, 58).pdf (src_111bbd078054dc30d3af), Microbiology p., cluster pppmbank4 tests this record -- Enzyme used to cut recipient DNA (pppmbank4-q04, p.28) -- exact functional match, no new fact added. (target file: docs/import-ready/concept/ASU-MBG-gene-therapy-concepts.md)

---

# Item

## id
CON-INF-BF26D7E563FB78

## canonical_key
bacteria.outer-membrane.lps-porins-function

## label
The Gram-negative outer membrane carries toxic lipid A and porins that admit only small solutes, not amino acids

## universities
+mans

## modules
+MANS-PPPM

## learner_years
+1

## field_notes
universityNotes: mans: PPPM Exam Bank ( 61, 60, 59, 58).pdf (src_111bbd078054dc30d3af), Microbiology p., cluster pppmbank4 tests this record -- Structure present in Gram-negative but not Gram-positive bacteria: Lipid A (pppmbank4-q05, p.28), no new fact added. (target file: docs/Ain-Shams-Source-Imports/concept/ASU-INF-microbiology-concepts.md)

---

# Item

## id
CON-INF-E4E8831D2BE517

## canonical_key
teaching.microbiology.flagella.arrangement-nomenclature

## label
Bacterial flagellar arrangement is named by position: one flagellum at one pole (monotrichous), one at each pole (amphitrichous), a tuft at one pole (lophotrichous), or flagella all around the cell (peritrichous)

## universities
+mans

## modules
+MANS-PPPM

## learner_years
+1

## field_notes
universityNotes: mans: PPPM Exam Bank ( 61, 60, 59, 58).pdf (src_111bbd078054dc30d3af), Microbiology p., cluster pppmbank4 tests this record -- Peritrichous flagellar arrangement (pppmbank4-q06, p.29), no new fact added. (target file: docs/Assiut-Source-Imports/concept/AUN-INI-105-concepts.md)

---

# Item

## id
CON-INF-E3C75AA9B1F5E5

## canonical_key
teaching.microbiology.cell-biology.acellular-vs-prokaryote-vs-eukaryote

## label
A virus is acellular; fungi and human cells are eukaryotic, bacteria are prokaryotic

## universities
+mans

## modules
+MANS-PPPM

## learner_years
+1

## field_notes
universityNotes: mans: PPPM Exam Bank ( 61, 60, 59, 58).pdf (src_111bbd078054dc30d3af), Microbiology p., cluster pppmbank4 tests this record -- Character of viruses: not cells/acellular (pppmbank4-q09, p.29), no new fact added. (target file: docs/Assiut-Source-Imports/concept/AUN-INI-105-concepts.md)

---

# Item

## id
CON-INF-29B8D844843328

## canonical_key
teaching.microbiology.bacterial-genetics.conjugative-plasmid-properties

## label
Conjugative plasmids characteristically show a high frequency of transfer, a wide range of hosts, and multiple genetic determinants

## universities
+mans

## modules
+MANS-PPPM

## learner_years
+1

## field_notes
universityNotes: mans: PPPM Exam Bank ( 61, 60, 59, 58).pdf (src_111bbd078054dc30d3af), Microbiology p., cluster pppmbank4 tests this record -- Plasmid mobilizing itself and another cell-to-cell: conjugative plasmid (pppmbank4-q12, p.30), no new fact added. (target file: docs/Assiut-Source-Imports/concept/AUN-INI-105-concepts.md)

---

# Item

## id
CON-INF-110935663CD77A

## canonical_key
pseudomonas-aeruginosa.identification.oxidase-pigment

## label
Pseudomonas aeruginosa is oxidase-positive and produces a green pigment on culture

## universities
+mans

## modules
+MANS-PPPM

## learner_years
+1

## field_notes
universityNotes: mans: PPPM Exam Bank ( 61, 60, 59, 58).pdf (src_111bbd078054dc30d3af), Microbiology p., cluster pppmbank4 tests this record -- Exopigment-forming bacterium: Pseudomonas (pppmbank4-q17, p.31, repeated at q29 held), no new fact added. (target file: docs/Ain-Shams-Source-Imports/concept/ASU-INF-microbiology-concepts.md)

---

# Item

## id
CON-INF-42D77BF4AB3ADD

## canonical_key
bacteria.genetics.transformation-mechanism

## label
Transformation requires recipient competence and DNA homology to take up soluble DNA

## universities
+mans

## modules
+MANS-PPPM

## learner_years
+1

## field_notes
universityNotes: mans: PPPM Exam Bank ( 61, 60, 59, 58).pdf (src_111bbd078054dc30d3af), Microbiology p., cluster pppmbank4 tests this record -- Gene transfer by direct DNA uptake: transformation (pppmbank4-q18, p.31), no new fact added. (target file: docs/Ain-Shams-Source-Imports/concept/ASU-INF-microbiology-concepts.md)

---

# Item

## id
CON-INF-2C32D6BA60368C

## canonical_key
virus.replication-cycle.sequence

## label
The viral replication cycle proceeds: attachment, penetration, uncoating, replication, assembly, release

## universities
+mans

## modules
+MANS-PPPM

## learner_years
+1

## field_notes
universityNotes: mans: PPPM Exam Bank ( 61, 60, 59, 58).pdf (src_111bbd078054dc30d3af), Microbiology p., cluster pppmbank4 tests this record -- Correct sequence of the viral replication cycle (pppmbank4-q19, p.31); this stem's own options separate an explicit 'gene expression' step between uncoating and replication that the existing label folds together, same underlying ordering, no new fact added. (target file: docs/Ain-Shams-Source-Imports/concept/ASU-INF-microbiology-concepts.md)

---

# Item

## id
CON-INF-7952070C4BD8AF

## canonical_key
virus.envelope.origin-and-composition

## label
The viral envelope is a lipoprotein derived from the host cell membrane during budding

## universities
+mans

## modules
+MANS-PPPM

## learner_years
+1

## field_notes
universityNotes: mans: PPPM Exam Bank ( 61, 60, 59, 58).pdf (src_111bbd078054dc30d3af), Microbiology p., cluster pppmbank4 tests this record -- Viral envelope characterized by being lipoprotein in nature (pppmbank4-q23, p.32), no new fact added. (target file: docs/Ain-Shams-Source-Imports/concept/ASU-INF-microbiology-concepts.md)

---

# Item

## id
CON-INF-44400FF4328CA8

## canonical_key
fungi.dimorphism.mold-vs-yeast-form

## label
Dimorphic fungi grow as a mold in nature/room temperature and as a yeast in vivo/body temperature

## universities
+mans

## modules
+MANS-PPPM

## learner_years
+1

## field_notes
universityNotes: mans: PPPM Exam Bank ( 61, 60, 59, 58).pdf (src_111bbd078054dc30d3af), Microbiology p., cluster pppmbank4 tests this record -- Thermally dimorphic fungi (pppmbank4-q24, p.32), no new fact added. (target file: docs/Ain-Shams-Source-Imports/concept/ASU-INF-microbiology-concepts.md)

---

# Item

## id
CON-IMM-73557EF9FDCC99

## canonical_key
immunology.lymphoid-organs.primary-development-maturation

## label
Bone marrow and thymus are primary lymphoid organs for B- and T-cell development and maturation

## universities
+mans

## modules
+MANS-PPPM

## learner_years
+1

## field_notes
universityNotes: mans: PPPM Exam Bank ( 61, 60, 59, 58).pdf (src_111bbd078054dc30d3af), Microbiology p., cluster pppmbank4 tests this record -- Primary lymphoid organ: bone marrow (pppmbank4-q34, p.34, repeated at q47 held), no new fact added. (target file: docs/Ain-Shams-Source-Imports/concept/ASU-IMM-foundations-concepts.md)

---

# Item

## id
CON-IMM-4430476C1F477F

## canonical_key
dendriticcell.function.naive-t-cell-activation

## label
Dendritic cells are the antigen-presenting cell best suited to activate naive T lymphocytes

## universities
+mans

## modules
+MANS-PPPM

## learner_years
+1

## field_notes
universityNotes: mans: PPPM Exam Bank ( 61, 60, 59, 58).pdf (src_111bbd078054dc30d3af), Microbiology p., cluster pppmbank4 tests this record -- Professional antigen-presenting cell: dendritic cells (pppmbank4-q36, p.34, repeated at q45 held), no new fact added. (target file: docs/Ain-Shams-Source-Imports/concept/ASU-IMM-immunology-concepts.md)

---

# Item

## id
CON-IMM-1868D017B7E3B8

## canonical_key
innateimmunity.characteristics.rapid-nonspecific-repeatable-response

## label
Innate immunity responds rapidly, non-specifically and equally on every exposure

## universities
+mans

## modules
+MANS-PPPM

## learner_years
+1

## field_notes
universityNotes: mans: PPPM Exam Bank ( 61, 60, 59, 58).pdf (src_111bbd078054dc30d3af), Microbiology p., cluster pppmbank4 tests this record -- Rapid non-specific immune response: innate immune system (pppmbank4-q37, p.35), no new fact added. (target file: docs/Ain-Shams-Source-Imports/concept/ASU-IMM-immunology-concepts.md)

---

# Item

## id
CON-IMM-A89092F59B7397

## canonical_key
innateimmunity.receptors.prr-pamp-recognition-mechanism

## label
Innate immune cells recognise pathogens through pattern-recognition receptors binding PAMPs

## universities
+mans

## modules
+MANS-PPPM

## learner_years
+1

## field_notes
universityNotes: mans: PPPM Exam Bank ( 61, 60, 59, 58).pdf (src_111bbd078054dc30d3af), Microbiology p., cluster pppmbank4 tests this record -- Receptor phagocytes use to recognize microbes: Toll-like receptors, a PRR family (pppmbank4-q38, p.35), no new fact added -- the existing label names PRRs generically and TLRs as the classic PRR example are treated as the same fact. (target file: docs/Ain-Shams-Source-Imports/concept/ASU-IMM-immunology-concepts.md)

---

# Item

## id
CON-IMM-D1046CFB182DFF

## canonical_key
marrow.functions.hematopoiesis-and-b-not-t-maturation

## label
Bone marrow performs haematopoiesis and B-cell maturation, but not T-cell maturation

## universities
+mans

## modules
+MANS-PPPM

## learner_years
+1

## field_notes
universityNotes: mans: PPPM Exam Bank ( 61, 60, 59, 58).pdf (src_111bbd078054dc30d3af), Microbiology p., cluster pppmbank4 tests this record -- Cells maturing in the thymus: T cells, the complementary fact to 'bone marrow does not mature T cells' (pppmbank4-q40, p.35, repeated at q46 held), no new fact added. (target file: docs/Ain-Shams-Source-Imports/concept/ASU-IMM-immunology-concepts.md)

---

# Item

## id
CON-IMM-54F0D8B6C8EA26

## canonical_key
nkcell.function.viral-tumor-extracellular-killing

## label
Natural killer cells play a role in extracellular killing of virally infected cells and tumor cells

## universities
+mans

## modules
+MANS-PPPM

## learner_years
+1

## field_notes
universityNotes: mans: PPPM Exam Bank ( 61, 60, 59, 58).pdf (src_111bbd078054dc30d3af), Microbiology p., cluster pppmbank4 tests this record -- NK cell function: kill tumour and virus-infected cells (pppmbank4-q41, p.35), no new fact added. (target file: docs/Ain-Shams-Source-Imports/concept/ASU-IMM-immunology-concepts.md)

---

# Item

## id
CON-INF-A71C7719CB367D

## canonical_key
virus.replication.uses-host-not-viral-trna-ribosomes

## label
Viruses multiply inside living cells using the HOST cell's mRNA translation machinery -- its tRNA and ribosomes -- not viral tRNA or viral ribosomes

## universities
+mans

## modules
+MANS-PPPM

## learner_years
+1

## field_notes
universityNotes: mans: PPPM Exam Bank ( 61, 60, 59, 58).pdf (src_111bbd078054dc30d3af), Microbiology p., cluster pppmbank4 tests this record -- Cause of viruses being obligate intracellular: inability to synthesize own proteins, i.e. dependence on host translation machinery (pppmbank4-q43, p.36), no new fact added. (target file: docs/Assiut-Source-Imports/concept/AUN-INI-105-ch6-concepts.md)

---

# Item

## id
CON-IMM-BE9E2F7DBC5DCD

## canonical_key
macrophage.functions.phagocytosis-presentation-cytokines

## label
Macrophage functions include phagocytosis, antigen presentation and cytokine production

## universities
+mans

## modules
+MANS-PPPM

## learner_years
+1

## field_notes
universityNotes: mans: PPPM Exam Bank ( 61, 60, 59, 58).pdf (src_111bbd078054dc30d3af), Microbiology p., cluster pppmbank4 tests this record -- Macrophage role in the natural immune response: ingest and destroy the antigen, i.e. phagocytosis (pppmbank4-q44, p.36), no new fact added. (target file: docs/Ain-Shams-Source-Imports/concept/ASU-IMM-immunology-concepts.md)
