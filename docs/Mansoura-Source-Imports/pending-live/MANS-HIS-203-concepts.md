<!--
  Sparse updates only. Every ## id below targets a concept that exists ONLY in an
  unimported Kasr Year 1 or Alexandria Year 1 batch -- none of these ids are in
  server/data/medical-library-v1.json yet (checked directly, 2026-09-02). Apply each
  record ONLY after its target file (named per record) is live.

  Per the Alexandria lane's precedent (pending-live/AU-MED-103-histology.md) and the
  chief-of-staff ruling it documents: `## label` is written on every row (a filled
  label makes the batch validator's stub-create check treat the row as a full
  authoring attempt rather than an update, and an update row silent on `## label`
  blanks the live concept's real label on merge -- conceptFromRow defaults label to
  '' rather than undefined). `## canonical_key` is written too, as the discriminator.

  Unlike the Alexandria precedent, this lane's own brief (2026-09-02) instructs
  `module_subject` to be RESTATED IN FULL rather than dropped, because Mansoura's
  overlay should not erase the Kasr/AU placement any more than it should erase the
  label -- so every row below that had a readable module_subject on its target file
  restates that value verbatim on its own line, with MANS-HIS-203's own path added
  as a second line (module_subject is not an append-safe column: parseModuleSubjectPaths
  replaces wholesale when the row states it at all). Two target rows (the two AU-
  authored ids, CON-HEM-2D18E46BA15483 and CON-HEM-A4B2A60B89E976) carry no
  module_subject on their own target file, so nothing existing needs restating and
  `## module_subject` is written fresh with only MANS-HIS-203's own path.

  `## universities`, `## modules` and `## learner_years` are genuine append-safe
  list columns (optionalList/importList): `+mans`, `+MANS-HIS-203`, `+1` add without
  disturbing kau/au, 101 ISK/104 CPS/102 INT/AU-MED-103, or existing learner years.

  Lane MANS-HIS-203-author1. Gate is `medical:batch` with every target file named
  via --with -- run once without --with (expect the "does not exist" refusal) and
  once with (expect a clean pass); these `## id`s are not live, so `medical:simulate`
  cannot resolve them yet and is not the gate here:

  npm run medical:batch -- "docs/Mansoura-Source-Imports/pending-live/MANS-HIS-203-concepts.md" \
    --with docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md \
    --with docs/Kasr-Source-Imports/concept/102-INT-physiology-concepts.md \
    --with docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md \
    --with docs/Kasr-Source-Imports/concept/104-CPS-mcq-concepts.md \
    --with docs/Kasr-Source-Imports/concept/104-CPS-practical-concepts.md \
    --with docs/Alexandria-Source-Imports/concept/AU-MED-103-histology-concepts.md
-->

# Item

## id
CON-HEM-2D18E46BA15483

## canonical_key
erythropoiesis.series.stage-landmarks

## label
Haemoglobin synthesis in the erythroid series completes at the normoblast stage, one stage after the cell loses the capacity to divide

## universities
+mans

## modules
+MANS-HIS-203

## module_subject
MANS-HIS-203 > Histology > Blood > Erythropoiesis

## learner_years
+1

## field_notes
universityNotes: mans: The His Continuous Berlin Book 2026 (HIS 203) tests both landmarks this concept states as separate questions — Q4 ("mitosis is lost in...", keyed E, normoblast, i.e. one stage after the polychromatophilic erythroblast this concept names as the last dividing stage) and Q16 ("hemoglobin starts to appear in...", keyed E, polychromatophilic erythroblast — the stage before haemoglobin synthesis completes at the normoblast, per this concept's own definition) — plus the general "erythropoiesis = development of red blood cells" vocabulary question (Q13) and the "first precursor cell for RBCs" question (Q20, keyed C, proerythroblast), all against this concept's own stage series.

---

# Item

## id
CON-HEM-A3B0CEA5DFA83E

## canonical_key
erythropoiesis-site-by-age

## label
The site of erythropoiesis shifts with age - liver and spleen in the fetus, all bone cavities in childhood, and only the membranous bones after 20

## universities
+mans

## modules
+MANS-HIS-203

## module_subject
102 INT > Physiology > Blood > Erythropoiesis
MANS-HIS-203 > Physiology > Blood > Erythropoiesis

## learner_years
+1

## field_notes
universityNotes: mans: The His Continuous Berlin Book 2026 (HIS 203) tests this age-by-site shift three times — Q14 ("main site of erythropoiesis in middle age", keyed A, red bone marrow, against a yolk-sac distractor), Q19 ("site of erythropoiesis in early embryo", keyed B, yolk sac mesoderm), and the دفعة 63 past-exam block's "hematopoiesis in yolk sac continues for...", keyed A, few weeks.

---

# Item

## id
CON-HEM-3FDA659AB5822B

## canonical_key
polycythemia-primary-and-secondary

## label
Polycythemia is an increased RBC count up to 6-8 million/mm3, either primary (polycythemia vera) from the marrow itself or secondary to tissue hypoxia

## universities
+mans

## modules
+MANS-HIS-203

## module_subject
102 INT > Physiology > Blood > Anaemia
MANS-HIS-203 > Physiology > Blood > Anaemia and polycythemia terminology

## learner_years
+1

## field_notes
universityNotes: mans: The His Continuous Berlin Book 2026 (HIS 203) tests the paired vocabulary directly — "decreased RBCs count is called...", keyed C, anemia, and "increased RBCs count is called...", keyed E, polycythemia — as two separate questions (Q5, Q18) rather than one worked numeric example.

---

# Item

## id
CON-HEM-3899015C5024C0

## canonical_key
neutrophil-granules-and-first-line-defence

## label
The neutrophil carries two granule populations and is the first line of non-specific defence

## universities
+mans

## modules
+MANS-HIS-203

## module_subject
101 ISK > Histology > Blood > Granular leukocytes
MANS-HIS-203 > Histology > Blood > Granular leukocytes

## learner_years
+1

## field_notes
universityNotes: mans: The His Continuous Berlin Book 2026 (HIS 203) tests the neutrophil's primary (azurophilic) granule directly (Q59, "which of the following is true about primary neutrophilic granules", keyed B, azurophilic) and its multilobed nucleus on the دفعة 62 past-exam block ("what is the shape of neutrophil nucleus", keyed C, multilobed) — both facts this concept's own definition already states.

---

# Item

## id
CON-HEM-AEB2E6C6E8A423

## canonical_key
bone-marrow-red-and-yellow

## label
Red bone marrow is active haemopoietic tissue; yellow bone marrow is its inactive fatty replacement

## universities
+mans

## modules
+MANS-HIS-203

## module_subject
101 ISK > Histology > Blood > Haemopoiesis
MANS-HIS-203 > Histology > Blood > Haemopoiesis

## learner_years
+1

## field_notes
universityNotes: mans: The His Continuous Berlin Book 2026 (HIS 203) tests red marrow's site directly (Q11, "red bone marrow is present in...", keyed A, most of the bones of the fetus) and yellow marrow's site directly (Q12, "site of yellow (inactive) bone marrow", keyed E, shafts of long bones), plus the general "where does hemopoiesis take place in adults" question repeated across both past-exam blocks (keyed C, bone marrow).

---

# Item

## id
CON-HEM-A4B2A60B89E976

## canonical_key
granulopoiesis.series.specific-granule-stage

## label
The specific (secondary) granules of a granulocyte first appear at the myelocyte stage of granulopoiesis

## universities
+mans

## modules
+MANS-HIS-203

## module_subject
MANS-HIS-203 > Histology > Blood > Granulopoiesis

## learner_years
+1

## field_notes
universityNotes: mans: The His Continuous Berlin Book 2026 (HIS 203) tests this series directly and repeatedly — Q53 ("largest cell in granulopoiesis", keyed B, promyelocyte), Q54 ("specific granules start to appear in which stage", keyed C, myelocyte — the concept's own stated landmark), Q55 ("promyelocytes... contain fine nonspecific granules", keyed B), Q57 ("what is meant by granulopoiesis", keyed B, "development of eosinophils" — the department book's own literal wording, narrower than the textbook definition of granulopoiesis as all granulocytes; printed key stands, flagged rather than silently corrected), and Q60 ("fine non-specific granules appear in stage of...", keyed C, promyelocyte).

---

# Item

## id
CON-HEM-60C0AFCC9A1F88

## canonical_key
lymph-node.cortex-medulla-zones-and-cell-distribution

## label
The lymph node's cortex holds B-cell-dominant follicles and macrophage-lined sinuses around a T-cell-only paracortex, and its medulla holds B-lymphocyte cords and macrophage-lined medullary sinuses

## universities
+mans

## modules
+MANS-HIS-203

## module_subject
104 CPS > Histology > Lymphatic and Macrophage System > Lymph node
MANS-HIS-203 > Histology > Lymphoid organs > Lymph node

## learner_years
+1

## field_notes
universityNotes: mans: The His Continuous Berlin Book 2026 (HIS 203) tests the cortical lymphoid follicle directly (Lecture 3&4 Q2, "the lymphoid follicles are found in...", keyed A, the cortex — asked twice more, identically, once on each past-exam block) and the lymph node's encapsulated status (Lecture 3&4 Q4, "an encapsulated lymphatic organ", keyed C, lymph node).

---

# Item

## id
CON-HEM-E3D03CE92F1D92

## canonical_key
lymphnode.medullary-cords-sinuses-and-the-path-of-lymph

## label
The medulla is cords of B lymphocytes, plasma cells and macrophages between sinuses whose macrophages filter the lymph on its way to the hilum

## universities
+mans

## modules
+MANS-HIS-203

## module_subject
104 CPS > Histology > Lymphatic and Macrophage System > Lymph node
MANS-HIS-203 > Histology > Lymphoid organs > Lymph node

## learner_years
+1

## field_notes
universityNotes: mans: The His Continuous Berlin Book 2026 (HIS 203) tests the medullary cord's plasma-cell population directly (Lecture 3&4 Q1, "which part of lymph node contains numerous plasma cells", keyed D, medullary cords — asked again, identically, on the دفعة 62 past-exam block).

---

# Item

## id
CON-HEM-594B1725902DAD

## canonical_key
spleen.red-pulp-billroth-cords-and-stave-cell-sinusoids

## label
Red pulp is Billroth cords and stave-cell sinusoids whose intercellular gaps let blood cells pass back into the circulation

## universities
+mans

## modules
+MANS-HIS-203

## module_subject
104 CPS > Histology > Lymphatic and Macrophage System > Spleen
MANS-HIS-203 > Histology > Lymphoid organs > Spleen

## learner_years
+1

## field_notes
universityNotes: mans: The His Continuous Berlin Book 2026 (HIS 203) tests the spleen's white-pulp lymphatic collections against this concept's red-pulp description (Lecture 3&4 Q5, "lymph follicles (lymphatic tissue collections) of the spleen are called...", keyed B, white pulp) — this lane's triage collapsed the white-pulp/red-pulp/Billroth-cord spleen questions onto this one canonical spleen-structure concept, per MANS-HIS-203-triage.md concept #15.

---

# Item

## id
CON-HEM-10B2E783E164FD

## canonical_key
thymus.hassalls-corpuscle-structure-and-location

## label
A Hassall's corpuscle is a concentric epithelial body with a degenerating acidophilic centre, found only in the thymic medulla

## universities
+mans

## modules
+MANS-HIS-203

## module_subject
104 CPS > Histology > Lymphatic and Macrophage System > Thymus
MANS-HIS-203 > Histology > Lymphoid organs > Thymus

## learner_years
+1

## field_notes
universityNotes: mans: The دفعة 63 past-exam block in the His Continuous Berlin Book 2026 (HIS 203) tests this directly: "Hassall's corpuscles are found in which of the following", keyed C, medulla of the thymus lobule, against distractors naming the thymic cortex and the spleen.

---

# Item

## id
CON-HEM-6C81E4B3EB30DE

## canonical_key
erythroblastosis-fetalis-and-anti-d-prophylaxis

## label
Erythroblastosis fetalis follows maternal anti-D sensitisation by a first Rh-positive fetus and haemolyses a subsequent Rh-positive fetus's cells, and anti-D immunoglobulin given after delivery prevents that sensitisation

## universities
+mans

## modules
+MANS-HIS-203

## module_subject
102 INT > Physiology > Blood > Blood groups and blood transfusion
MANS-HIS-203 > Microbiology > Immunology > Hypersensitivity reactions

## learner_years
+1

## field_notes
universityNotes: mans: The His Continuous Berlin Book 2026 (HIS 203) Microbiology L1 revision set uses this exact scenario (an Rh-negative mother's second Rh-positive child born jaundiced and anaemic) as its worked type-II-hypersensitivity example, keyed B; this concept's own erythroblastosis-fetalis mechanism is the answer the question turns on.
conflicts: This concept is filed under 102 INT Physiology (blood groups and transfusion); Mansoura's own module_subject files the same fact under Microbiology/Immunology (hypersensitivity classification) because that is where HIS 203's department book teaches it. Both placements are correct for their own curriculum; recorded rather than silently reconciled.

---

# Item

## id
CON-HEM-FDAC2D5F64032E

## canonical_key
lymphocyte-types-t-b-and-nk-and-the-immunity-each-mediates

## label
The three lymphocytes look identical and differ only in their surface receptors: T mediates cell-mediated immunity, B mediates humoral immunity, NK acts without either

## universities
+mans

## modules
+MANS-HIS-203

## module_subject
MANS-HIS-203 > Histology > Blood > Lymphocytes

## learner_years
+1

## field_notes
universityNotes: mans: The His Continuous Berlin Book 2026 (HIS 203) tests B- and T-lymphocyte function as two separate questions (Q51, "B-lymphocytes...", keyed C, important in humoral immunity; Q52, "T-lymphocytes...", keyed D, important in cellular immunity) — the same functional-classification concept this record already carries. No module_subject existed on this concept's own target file (docs/Alexandria-Source-Imports/concept/AU-MED-103-histology.md notes it has no Kasr article naming it yet), so nothing existing is restated here; MANS-HIS-203's own path is written fresh.
