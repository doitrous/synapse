<!--
  Sparse overlay on the total-body-water/ICF/ECF concept (CON-HEM-428F8B432AF540),
  which is live only in the Kasr Year-1 lane's unimported batch
  (docs/Kasr-Source-Imports/concept/102-INT-physiology-concepts.md /
  docs/import-ready/concept/102-INT-physiology-concepts.md, canonical_key
  body-fluid-compartments-distribution). Omar applies this file only after
  that Kasr batch is live -- id + canonical_key + only the overlay fields
  being appended (`+aun` / `+1` / `+AUN-CBF-103`), never a full record.

  Apply after: the Kasr 102-INT concept batch above. Import: Admin >
  Concepts import. Then apply AUN-CBF-103-cbf-bank-pending-102int-concept.md,
  then AUN-CBF-103-cbf-bank-pending-102int-questions.md.
-->

# Item

## id
CON-HEM-428F8B432AF540

## canonical_key
body-fluid-compartments-distribution

## universities
+aun

## learner_years
+1

## modules
+AUN-CBF-103
