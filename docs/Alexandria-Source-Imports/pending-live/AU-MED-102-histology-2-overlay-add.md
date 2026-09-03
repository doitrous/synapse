<!--
Sparse updates only. Every id below exists only in a Kasr Year 1 concept batch that
is not yet live (docs/Kasr-Source-Imports/concept/*.md) -- per LANE-BRIEF.md section 16
rule 1, this file is held outside any import root. Apply only after the named Kasr
file is live; do not run medical:batch on this file alone (an id not live and not in
the same folder is a hard error by design -- validate with:
  npm run medical:batch -- docs/Alexandria-Source-Imports/pending-live/AU-MED-102-histology-2-overlay-add.md \
    --with docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md \
    --with docs/Kasr-Source-Imports/concept/101-ISK-concepts.md \
    --with docs/Kasr-Source-Imports/concept/104-CPS-histology-concepts.md
Companion to pending-live/AU-MED-102-histology.md (an earlier pass, commit 1ac5ffff,
tagged 31 Kasr histology concepts +au/+AU-MED-102 with no matching questions yet).
These 4 rows are additional concepts the Step-2 histology-2 batch
(question/AU-MED-102-histology-2-mcq.md) reuses that the earlier pass did not tag.
-->

# Item

## id
CON-FND-59E3FDA20F54AD

## label
The zonula adherens is a belt anchoring actin; the macula adherens is a spot anchoring intermediate filaments, and it is the strongest junction

## universities
+au

## learner_years
+1

## modules
+AU-MED-102


---

# Item

## id
CON-FND-685D573458A6D7

## label
Meiosis is two successive divisions without an intervening S-phase, producing four haploid germ cells with crossing over

## universities
+au

## learner_years
+1

## modules
+AU-MED-102


---

# Item

## id
CON-FND-6887E3F110A894

## label
Simple cubical epithelium secretes and reabsorbs, simple columnar secretes and absorbs, and adding cilia makes the columnar cell transport fluid in one direction

## universities
+au

## learner_years
+1

## modules
+AU-MED-102


---

# Item

## id
CON-FND-8FEBD5195DCED2

## label
Stratified squamous epithelium is 5–30 layers built from columnar basal cells up to flat surface cells, held by desmosomes, and it is keratinised only in the skin

## universities
+au

## learner_years
+1

## modules
+AU-MED-102
