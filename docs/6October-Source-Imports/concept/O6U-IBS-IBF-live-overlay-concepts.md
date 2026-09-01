<!--
  O6U-IBS-101 + O6U-IBF-102 — sparse overlay updates on FOUR already-LIVE concepts
  (server/data/medical-library-v1.json, nishany-concept-graph-v2), per 00-START-HERE.md §3/§4
  "a hit in live state -> a sparse update". Each restates ## label verbatim (required even
  on an update) and adds only the O6U overlay: +o6u, +1 (learner_years is numeric on
  concepts, not the O6U_Y1 id form questions/articles use), +O6U-<CODE>, and a
  module_subject cell restating the existing path(s) plus O6U's own (this field fully
  replaces on every write, no + form — 00-START-HERE §3).

  Two of these four were flagged by the source triage (coverage/O6U-IBS-IBF-triage.md) as
  live hits worth "confirm scope" before reuse and, on inspection, do NOT match:
    - CON-RES-9DA5B3FB92BC7A (triage's glutathione candidate) is about acetylcysteine
      rescuing paracetamol overdose, not glutathione's tripeptide composition -- wrong
      concept, not reused here. The real match is pending, not live -- see
      pending-live/O6U-IBS-IBF-overlay-concepts.md.
    - CON-MSK-0E3AE8E79060E1 (triage's reticular-fibre candidate) is about endomysial
      reticular fibres in muscle, not the silver/PAS staining fact M2-10 tests -- also not
      reused; its real match is pending too, under a different id (CON-FND-471B49C03F8BF8).
    - CON-GYN-AFE8962308CA70 (triage's gap-junction candidate) is a corona-radiata/oocyte
      fact, not the general "gap junctions pass molecules between adjacent cells" fact
      M2-12 tests -- not reused; per triage-keys.txt's own note the pending Kasr 101-ISK
      hit is the closer match, used instead (CON-FND-ACB35745EC9A5D).
  A fourth genuinely live match was found this pass, searched but not resolved by the
  original S1 triage (M1-7, flagged "NOT SEARCHED"): CON-FND-0E928D053BCD48, "a basic
  solution has pH above 7 and hydrogen-ion concentration below hydroxyl-ion concentration"
  -- an exact match for M1-7/M2-15 ("a solution with more OH- than H+ ions").

  Simulate together with live state (no --with needed -- these ids are already live):
  npm run medical:simulate -- docs/6October-Source-Imports/concept/O6U-IBS-IBF-live-overlay-concepts.md --emit /tmp/sim-O6U-IBS-IBF-live-concepts.json
-->

# Item

## id
CON-HEM-BD15B63AB982A9

## label
Myeloid stem cells can form monocytes/macrophages, granulocytes, erythrocytes, and megakaryocytes

## universities
+o6u

## learner_years
+1

## modules
+O6U-IBS-101

## module_subject
O6U-IBS-101 > BOS 101 mid-module exam > Cytology and connective tissue

## exam_weight_by_year
O6U_Y1=0.44

## field_notes
o6u: Tested as M1 Q3 ("which cell is the origin of macrophages?", answer: blood monocytes), mid module BOS 101 module 1 october.pdf p1 -- 44% of respondents (96/220), a plurality only. src_488991ba0ec25addc3c8.

---

# Item

## id
CON-INF-8E477AF19762BE

## label
A glycocalyx is a loose meshwork of polysaccharide fibrils extending from the cell

## universities
+o6u

## learner_years
+1

## modules
+O6U-IBS-101

## module_subject
O6U-IBS-101 > BOS 101 mid-module exam > Cytology and connective tissue

## exam_weight_by_year
O6U_Y1=0.53

## field_notes
o6u: Tested as M1 Q6 ("immunity is one of the functions of which of the following?", answer: cell coat/glycocalyx), mid module BOS 101 module 1 october.pdf p2 -- 53% of respondents (117/220). src_488991ba0ec25addc3c8.

---

# Item

## id
CON-GIT-9D697B22B63080

## label
Celiac disease is an autoimmune response to dietary gluten that damages small-intestinal lining and villi

## universities
+o6u

## learner_years
+1

## modules
+O6U-IBS-101

## module_subject
O6U-IBS-101 > BOS 101 mid-module exam > Gastrointestinal histology

## exam_weight_by_year
O6U_Y1=0.76

## field_notes
o6u: Tested as M2 Q9 ("in celiac disease... which part of the lining epithelium is damaged?", answer: microvilli, the specific lining structure named in this record's villi/lining damage), mid module BOS 101 module 2.pdf p3 -- 76% of respondents (147/194). src_79aa36cff3c93cfd5dcb.

---

# Item

## id
CON-FND-0E928D053BCD48

## label
A basic solution has pH above 7 and hydrogen-ion concentration below hydroxyl-ion concentration

## universities
+o6u

## learner_years
+1

## modules
+O6U-IBF-102

## module_subject
O6U-IBF-102 > BOS 101 mid-module exam > General chemistry (acid-base)

## exam_weight_by_year
O6U_Y1=0.92

## field_notes
o6u: Tested as M1 Q7 / M2 Q15 ("a solution that contains hydroxyl ions more than hydrogen ions", answer: basic solution), mid module BOS 101 module 1 october.pdf p2 -- 92% of respondents (204/221); recurs at M2 Q15, 88% (174/197). Not searched by the original S1 triage pass (flagged "NOT SEARCHED, general chemistry"); searched and matched this pass. src_488991ba0ec25addc3c8, src_79aa36cff3c93cfd5dcb.

---
