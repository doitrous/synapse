<!--
  Sparse overlays on twelve pending concepts, reused instead of re-minted for
  AUN-INI-105 Chapter 3 "Bacteriophage" and Chapter 4 "Bacterial Genetics"
  (coverage/AUN-INI-105-triage.md). Each concept is live only in its own
  authoring lane's unimported batch -- id + canonical_key + only the overlay
  fields being appended (`+aun` / `+1` / `+AUN-INI-105`), never a full
  record. Four different source families are covered here; apply each
  concept's own source batch first, in whatever order Omar's import queue
  reaches them, then this overlay file, then the two question files that
  reference these ids (AUN-INI-105-ch3-4-pending-questions.md).

  Source batches, one per concept below:
  - CON-INF-BFFA74CFBB0B25, CON-INF-D6A264E108B348, CON-INF-B7F47EC7A8F7FA,
    CON-INF-42D77BF4AB3ADD, CON-INF-EB5758CBC71F57, CON-INF-134BE2C9B827D5,
    CON-INF-E9C14F5981ACE5 -- docs/import-ready/concept/ASU-INF-microbiology-concepts.md
    (also docs/Ain-Shams-Source-Imports/concept/ASU-INF-microbiology-concepts.md)
  - CON-INF-E463F81B9370AE, CON-INF-C4B589DE952DCF --
    docs/Helwan-Source-Imports/concept/HU-BMS-102-microbiology-family27-part1-concepts.md
  - CON-FND-81A17C5BF7ED85, CON-FND-FB99DCB7F61A0E --
    docs/import-ready/concept/102-INT-mcq-concepts.md (also
    docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md)
  - CON-FND-C444D428BE3E1D --
    docs/import-ready/concept/ASU-MBG-gene-therapy-concepts.md (also
    docs/Ain-Shams-Source-Imports/concept/ASU-MBG-gene-therapy-concepts.md)

  Note: the ASU-INF/Helwan/102-INT/ASU-MBG concept records above do not (yet)
  point at an already-authored article in their own source trees, so this
  overlay's coverage for AUN's own gate/simulate checks instead comes from
  AUN-INI-105-articles.md's two new articles listing these ids under their own
  `related_concepts` (the importer treats an article's related_concepts as a
  second, equally valid way of linking article <-> concept, alongside the
  concept's own article_ids column).

  Questions that reuse these twelve concepts are split by chapter:
  AUN-INI-105-ch3-pending-questions.md (Chapter 3, 15 questions) and
  AUN-INI-105-ch4-pending-questions.md (Chapter 4, 21 questions), both in this
  same directory.

  Import: Admin > Concepts import, after each concept's own source batch above.
-->

# Item

## id
CON-INF-BFFA74CFBB0B25

## canonical_key
bacteria.genetics.lysogenic-conversion

## universities
+aun

## learner_years
+1

## modules
+AUN-INI-105

---

# Item

## id
CON-INF-D6A264E108B348

## canonical_key
bacteria.genetics.transposons

## universities
+aun

## learner_years
+1

## modules
+AUN-INI-105

---

# Item

## id
CON-INF-B7F47EC7A8F7FA

## canonical_key
bacteria.genetics.conjugation-mechanism

## universities
+aun

## learner_years
+1

## modules
+AUN-INI-105

---

# Item

## id
CON-INF-42D77BF4AB3ADD

## canonical_key
bacteria.genetics.transformation-mechanism

## universities
+aun

## learner_years
+1

## modules
+AUN-INI-105

---

# Item

## id
CON-INF-EB5758CBC71F57

## canonical_key
bacteria.genetics.plasmid-vs-chromosome-encoded-traits

## universities
+aun

## learner_years
+1

## modules
+AUN-INI-105

---

# Item

## id
CON-INF-134BE2C9B827D5

## canonical_key
antibiotic-resistance.mobile-genetic-elements.r-plasmid

## universities
+aun

## learner_years
+1

## modules
+AUN-INI-105

---

# Item

## id
CON-INF-E9C14F5981ACE5

## canonical_key
bacteria.genetics.transduction-generalized-vs-specialized

## universities
+aun

## learner_years
+1

## modules
+AUN-INI-105

---

# Item

## id
CON-INF-E463F81B9370AE

## canonical_key
bacteriophage-host-transfer-toxin-typing-properties

## universities
+aun

## learner_years
+1

## modules
+AUN-INI-105

---

# Item

## id
CON-INF-C4B589DE952DCF

## canonical_key
lysogenic-bacterial-cell-contains-prophage

## universities
+aun

## learner_years
+1

## modules
+AUN-INI-105

---

# Item

## id
CON-FND-81A17C5BF7ED85

## canonical_key
replication-fork-strand-separation

## universities
+aun

## learner_years
+1

## modules
+AUN-INI-105

---

# Item

## id
CON-FND-FB99DCB7F61A0E

## canonical_key
codon-definition-location-and-start-stop-codons

## universities
+aun

## learner_years
+1

## modules
+AUN-INI-105

---

# Item

## id
CON-FND-C444D428BE3E1D

## canonical_key
restrictionendonuclease.origin-and-recognition.bacterial-source-palindromic-sites

## universities
+aun

## learner_years
+1

## modules
+AUN-INI-105
