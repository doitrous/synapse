<!--
  MUST-CVS-201 · pending-live sparse CONCEPT overlay (Pathology tranche 6,
  author6).

  3 concept ids, all pending in the Year-3 SYS-CVS catalogue (import-ready,
  unimported) -- none is in server/data/medical-library-v1.json (checked
  directly, not just via find-existing.mjs):

    A. docs/import-ready/concept/SYS-CVS-CONCEPT-T04.md -- 2 ids:
       CON-CVS-D65416DBAEAA0E (hypertrophic cardiomyopathy definition) and
       CON-CVS-4A41D59159ED61 (restrictive cardiomyopathy definition).
       Neither carries a `module_subject` field in its source file (this
       catalogue's schema has no such column at all, unlike the Kasr 104-CPS
       files this lane usually overlays) -- so, same as tranche 4's
       Eisenmenger row in MUST-CVS-201-anatomy2-concepts-overlay.md, each row
       below writes only MUST-CVS-201's own module_subject line, nothing to
       restate.

    B. docs/import-ready/concept/SYS-CVS-CONCEPT-T06.md -- 1 id:
       CON-CVS-E1FE73100F1688, "Tuberculosis is a leading cause of
       constrictive pericarditis where it is endemic" (aliases: "Constrictive
       pericarditis aetiology"). This tranche's patho-q10/q39/q50 test facts
       beyond that record's own printed definition (naming the condition as
       Pick's disease, its complication of suppurative pericarditis, the
       small-quiet-heart/no-hypertrophy physiology) -- judged an extension of
       the same aetiology concept rather than a new mint, the same call
       tranche 4 made for situs inversus and tranche 5 for the S. epidermidis
       novobiocin-sensitivity fact. find-existing.mjs "constrictive
       pericarditis" returned this record (and the sibling ventricular-
       interdependence concept, CON-CVS-268E5C530580B6, not used this
       tranche) before the extension was chosen over a new mint.

  Sibling docs/MUST-Source-Imports/pending-live/MUST-CVS-201-pathology-
  questions.md carries the 14 MCQs that depend on these 3 ids plus 3 more
  ids already MUST-CVS-201-tagged by tranche 1 (dilated cardiomyopathy,
  cardiac tamponade, hypertension definition/secondary causes -- no new
  overlay row needed for those, see docs/MUST-Source-Imports/pending-live/
  MUST-CVS-201-concepts-overlay.md). See that file's own header and
  pending-live/INDEX.md for the full apply order.

  Per 00-START-HERE.md §3 (module_subject fully replaces on every write --
  no '+' form there). '## universities', '## learner_years' and '## modules'
  are true ID-list columns and take '+must' / '+2' / '+MUST-CVS-201'; all
  three source records already read `universities: kau`, `learner_years:
  3 | 4`, so each row appends '+must' and '+2'.

  Simulate together with the source file each block targets, e.g.:
    node scripts/content/gate.mjs simulate \
      docs/import-ready/concept/SYS-CVS-CONCEPT-T04.md \
      docs/import-ready/concept/SYS-CVS-CONCEPT-T06.md \
      docs/MUST-Source-Imports/pending-live/MUST-CVS-201-pathology-concepts-overlay.md
-->

# Item

## id
CON-CVS-D65416DBAEAA0E

## label
Hypertrophic cardiomyopathy is a sarcomere disease with asymmetric hypertrophy

## modules
+MUST-CVS-201

## module_subject
MUST-CVS-201 > Pathology > Cardiomyopathies > Hypertrophic Cardiomyopathy

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.6

## field_notes
must: Tested as patho-q01, "Which type of cardiomyopathy is characterized by massive asymmetrical hypertrophy of the left ventricle, especially the interventricular septum, without dilatation?" -- printed key C, hypertrophic cardiomyopathy. This record's own definition (asymmetric, septal hypertrophy not explained by loading conditions, sarcomere-gene mutation, myocyte disarray) already covers the fact tested. src_67efbd148b42c6593611 p16.

---

# Item

## id
CON-CVS-4A41D59159ED61

## label
Restrictive cardiomyopathy impairs filling without dilating the ventricle

## modules
+MUST-CVS-201

## module_subject
MUST-CVS-201 > Pathology > Cardiomyopathies > Restrictive Cardiomyopathy

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.5

## field_notes
must: Tested twice this tranche -- patho-q03 ("A patient presents with rigid and stiff myocardium leading to impaired diastolic filling", key C, restrictive cardiomyopathy) and patho-q05 ("Restrictive cardiomyopathy can be caused by all EXCEPT", key C, viral infection -- not a cause). This record's own "Restrictive cardiomyopathy impairs filling without dilating the ventricle" definition covers the first fact directly; the causal list (amyloidosis, haemochromatosis, endomyocardial fibrosis, cancer-treatment fibrosis) sits in the question's own explanation rather than in this concept's definition, since the source paper's own EXCEPT framing is the specific fact tested. src_67efbd148b42c6593611 p16.

---

# Item

## id
CON-CVS-E1FE73100F1688

## label
Tuberculosis is a leading cause of constrictive pericarditis where it is endemic

## modules
+MUST-CVS-201

## module_subject
MUST-CVS-201 > Pathology > Pericardial Disease > Constrictive Pericarditis

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.6

## field_notes
must: Tested three times this tranche -- patho-q10 ("Constrictive pericarditis (Pick's disease) is a complication of:", key B, suppurative pericarditis), patho-q39 (vignette: TB history, distended neck veins, small quiet heart -> constrictive pericarditis), patho-q50 ("A patient with constrictive pericarditis would NOT typically show:", key A, cardiac hypertrophy). This record's own definition names tuberculosis as a leading cause of constrictive pericarditis where endemic and contrasts it with the commoner high-income causes (prior cardiac surgery, radiotherapy, idiopathic disease); the Pick's-disease naming, the suppurative-pericarditis complication route and the small-quiet-heart/no-hypertrophy physiology are extensions of this same aetiology concept applied in each question's own explanation, not separately stated facts, the same "extend rather than duplicate" call tranche 4 made for situs inversus. src_67efbd148b42c6593611 p16.
