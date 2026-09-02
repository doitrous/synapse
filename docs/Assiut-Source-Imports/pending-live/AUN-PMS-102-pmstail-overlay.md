<!--
Sparse updates only. Both ids below exist only in the Kasr Year 1
101-ISK-mcq-concepts.md batch, not yet live -- per LANE-CARD.md's
search-before-mint rule and this pp.170-217 pass's own search notes
(coverage/AUN-PMS-102-triage.md). The heterochromatin record carries no
article_ids in its own 101-ISK batch; this overlay adds ART-101-HIS-NUCLEUS
(the same article the Barr body record already names) so the coverage gate
has something to check the reused concept against -- article_ids merges
additively at import (conceptImport.ts), it does not overwrite. This file
is held outside any import root per 00-START-HERE.md section 3 rule 2.
Apply only after the source batch is live; do not run medical:batch on
this file alone -- validate with:
  node scripts/content/gate.mjs simulate \
    docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md \
    docs/Assiut-Source-Imports/pending-live/AUN-PMS-102-pmstail-overlay.md \
    docs/Assiut-Source-Imports/concept/AUN-PMS-102-pmstail-concepts.md \
    docs/Assiut-Source-Imports/article/AUN-PMS-102-pmstail-articles.md \
    docs/Assiut-Source-Imports/question/AUN-PMS-102-pmstail-mcq.md
-->

# Item

## id
CON-FND-6C5ABFD844D630

## label
heterochromatin is coiled and inactive and makes it condensed

## article_ids
ART-101-HIS-NUCLEUS

## universities
+aun

## learner_years
+1

## modules
+AUN-PMS-102


---

# Item

## id
CON-FND-69671A492023B8

## label
The Barr body is one X chromosome switched off, so a nucleus shows one fewer Barr body than it has X chromosomes

## universities
+aun

## learner_years
+1

## modules
+AUN-PMS-102
