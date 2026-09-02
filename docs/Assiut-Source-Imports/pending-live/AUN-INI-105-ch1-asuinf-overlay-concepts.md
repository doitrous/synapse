<!--
  Sparse overlays on twelve pending Ain-Shams ASU-INF microbiology concepts,
  which are live only in the Ain-Shams Year-1 lane's unimported batch
  (docs/import-ready/concept/ASU-INF-microbiology-concepts.md /
  docs/Ain-Shams-Source-Imports/concept/ASU-INF-microbiology-concepts.md).
  Omar applies this file only after that ASU-INF batch is live -- id +
  canonical_key + only the overlay fields being appended (`+aun` / `+1` /
  `+AUN-INI-105`), never a full record. Chosen over re-minting because
  AUN-INI-105's Chapter 1 ("Bacterial cell structure") tests the same
  cell-wall, toxin, capsule, pili, flagellin and mesosome facts Ain Shams's
  own infection module already covers (coverage/AUN-INI-105-triage.md).

  The first eight items were overlaid by lane 1 (Q1-Q50). Lane 2 (Q51-Q100)
  appends four more rows below, found by this pass's own find-existing.mjs
  searches: CON-INF-7CCB09F434AF06 (Mycoplasma membrane sterol),
  CON-INF-271E9930B4B73A (Mycoplasma vs L-forms), CON-INF-29351FD540E214
  (70S ribosome / protein synthesis) and CON-INF-0B4BAFFD525FDF
  (host-microbe relationships: parasitism/commensalism/mutualism). Lane 14
  (Q101-Q161, chapter close) appends one more row: CON-INF-BF26D7E563FB78
  (outer-membrane porins/Lipid A), found by this pass's own find-existing.mjs
  search for "porin" -- it already shares this file's own backing article
  (ART-INF-CELL-WALL-OUTER-MEMBRANE), so only a canonical_key/overlay row is
  added here, no new article dependency.

  Apply after: the ASU-INF-microbiology-concepts.md batch. Import: Admin >
  Concepts import. Then apply this file. Then apply
  AUN-INI-105-ch1-asuinf-questions.md,
  AUN-INI-105-ch1-part2-asuinf-questions.md and
  AUN-INI-105-ch1b-asuinf-questions.md.
-->

# Item

## id
CON-INF-25846A77987558

## canonical_key
bacteria.capsule.function-virulence-identification-vaccine

## universities
+aun

## learner_years
+1

## modules
+AUN-INI-105

---

# Item

## id
CON-INF-83707B09F53803

## canonical_key
bacteria.flagellum.flagellin-motility

## universities
+aun

## learner_years
+1

## modules
+AUN-INI-105

---

# Item

## id
CON-INF-3FBC905C4F778F

## canonical_key
bacteria.cell-wall.peptidoglycan-rigidity

## universities
+aun

## learner_years
+1

## modules
+AUN-INI-105

---

# Item

## id
CON-INF-7E3B831D71A008

## canonical_key
bacteria.cell-wall.gram-positive-vs-negative-components

## universities
+aun

## learner_years
+1

## modules
+AUN-INI-105

---

# Item

## id
CON-INF-0DD46C0FD80938

## canonical_key
bacteria.gram-negative-cell-wall.composition

## universities
+aun

## learner_years
+1

## modules
+AUN-INI-105

---

# Item

## id
CON-INF-E4012E20B5A13D

## canonical_key
bacteria.mesosome.structure-and-role

## universities
+aun

## learner_years
+1

## modules
+AUN-INI-105

---

# Item

## id
CON-INF-BC446C9816D9CE

## canonical_key
bacteria.pili.ordinary-vs-sex-pili-function

## universities
+aun

## learner_years
+1

## modules
+AUN-INI-105

---

# Item

## id
CON-INF-C87DF729E2ADDF

## canonical_key
bacteria.toxins.exotoxin-vs-endotoxin

## universities
+aun

## learner_years
+1

## modules
+AUN-INI-105

---

# Item

## id
CON-INF-7CCB09F434AF06

## canonical_key
mycoplasma.cell-membrane.contains-sterol

## universities
+aun

## learner_years
+1

## modules
+AUN-INI-105

---

# Item

## id
CON-INF-271E9930B4B73A

## canonical_key
mycoplasma.vs-l-forms.genetic-vs-induced-wall-loss

## universities
+aun

## learner_years
+1

## modules
+AUN-INI-105

---

# Item

## id
CON-INF-29351FD540E214

## canonical_key
bacteria.ribosome.70s-protein-synthesis

## universities
+aun

## learner_years
+1

## modules
+AUN-INI-105

---

# Item

## id
CON-INF-0B4BAFFD525FDF

## canonical_key
bacteria.host-relationships.parasitism-commensalism-mutualism

## universities
+aun

## learner_years
+1

## modules
+AUN-INI-105

---

# Item

## id
CON-INF-BF26D7E563FB78

## canonical_key
bacteria.outer-membrane.lps-porins-function

## universities
+aun

## learner_years
+1

## modules
+AUN-INI-105
