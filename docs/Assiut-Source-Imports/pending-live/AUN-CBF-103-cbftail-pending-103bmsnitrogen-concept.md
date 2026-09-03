<!--
  Sparse overlay on one pending Kasr 103-BMS nitrogen/urea-cycle concept,
  live only in that lane's unimported batch (docs/Kasr-Source-Imports/
  concept/103-BMS-mcq-nitrogen-concepts.md, not yet mirrored to
  docs/import-ready/). Omar applies this file only after that Kasr batch is
  live -- id + canonical_key + only the overlay fields being appended
  (`+aun` / `+1` / `+AUN-CBF-103`), never a full record. Lane 4 (branch
  aun-cbf103-author4) reused CON-FND-3806EF570B0A1C (urea's overall
  equation: ammonia and aspartate as the two nitrogen donors, and the
  protein-intake-driven rate of urea synthesis) for the two-nitrogen-donors
  and diet-and-urinary-urea questions.

  Apply after: the Kasr 103-BMS-mcq-nitrogen-concepts.md batch above.
  Import: Admin > Concepts import. Then apply
  AUN-CBF-103-cbftail-pending-103bmsnitrogen-concept.md, then
  AUN-CBF-103-cbftail-pending-103bmsnitrogen-questions.md.
-->

# Item

## id
CON-FND-3806EF570B0A1C

## canonical_key
urea.overall-equation.nitrogen-donors-cost-and-activation

## universities
+aun

## learner_years
+1

## modules
+AUN-CBF-103
