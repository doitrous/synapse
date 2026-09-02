<!--
  ASU-AE · Embryo 3 MCQ cluster (src_3448fabd352cb8018ed3, "MCQs - Embryo 3.pdf")
  — pending-live sparse CONCEPT overlay.

  The two ## id rows below target concepts that exist ONLY in Kasr's
  unimported 104-CPS batch — not yet in server/data/medical-library-v1.json.
  find-existing.mjs "Klinefelter" / "Turner syndrome" / "Down syndrome"
  surfaced these exact facts already minted there (in 47,XXY/45,XO/trisomy-21
  notation, the same karyotypes this bank states as "44+XXY"/"44+XO"/
  "45+XY"). One canonical key, one id, university-blind — these rows overlay
  ASU's own tags onto them rather than re-minting.

  Apply this file ONLY after the named source file is live:
    A. docs/Kasr-Source-Imports/concept/104-CPS-histology-concepts.md —
       university `kau`, module `104 CPS` (Histology, Cytogenetics).

  Per LANE-BRIEF §6 rule 1/2 and the concepts manual: `## module_subject`
  fully replaces on every write (no `+` form) — the rows below restate the
  source's existing line plus ASU's own. `## universities`, `## learner_years`
  and `## modules` are true ID-list columns and take `+asu` / `+1` / `+ASU-AE`.

  Simulate together with the source file this block targets:
  node scripts/content/gate.mjs simulate \
    docs/Kasr-Source-Imports/concept/104-CPS-histology-concepts.md \
    docs/Ain-Shams-Source-Imports/pending-live/ASU-AE-embryo3-kasr104cps-overlay-concepts.md \
    docs/Ain-Shams-Source-Imports/question/ASU-AE-embryo3-mcq.md
-->

# Item

## id
CON-DEV-C5F7B1973F8049

## label
Klinefelter (47,XXY), triple X (47,XXX) and Turner (45,XO) syndromes are sex-chromosome aneuploidies from non-disjunction in oogenesis

## universities
+asu

## learner_years
+1

## modules
+ASU-AE

## module_subject
104 CPS > Histology > Cytogenetics > Chromosomal Aberrations (Abnormalities)
ASU-AE > Embryology > Questions > MCQ

## field_notes
asu: Reused as `main_concept` for seven ASU-AE Embryo 3 items, all restating this record's own karyotypes in "44+" notation rather than "47,"/"45,": Q3/Q8 ("Which syndrome has 44+XXY chromosomes?" -- Kleinfelter's/Klinefelter, two distinct distractor sets), Q7 ("A syndrome caused by chromosomal monosomy" -- Turner's), Q15 ("Which syndrome has the genotype 44+XO?" -- Turner), Q19 ("Klinefelter's syndrome has a genotype of:" -- 44+XXY; Q21 and Q27 are held as reordered duplicates of this same item, see the question file's own `author_notes`), Q43 ("Turner's syndrome has the following genotype:" -- 44+X), and Q55 (the first item of the Q55-59 syndrome-to-formula matching block, authored as a standalone MCQ reusing the block's own five-option pool -- Klinefelter's -> 44+XXY). "MCQs - Embryo 3.pdf" pp.1-2,4-5,7,9, printed answer table p.17 rows 3,7,8,15,19,43 and p.18 row 55.

---

# Item

## id
CON-DEV-294FB8DDA40429

## label
Down syndrome is trisomy 21, from non-disjunction or a 14;21 translocation, with mental retardation and characteristic dysmorphic features

## universities
+asu

## learner_years
+1

## modules
+ASU-AE

## module_subject
104 CPS > Histology > Cytogenetics > Chromosomal Aberrations (Abnormalities)
ASU-AE > Embryology > Questions > MCQ

## field_notes
asu: Reused as `main_concept` for one ASU-AE Embryo 3 item: Q31 ("A boy having Down's syndrome is characterized by a chromosomal formula:" -- 45+XY, i.e. trisomy 21 with a male sex-chromosome pair, matching this record's own trisomy-21 fact). "MCQs - Embryo 3.pdf" p.5, printed answer table p.17 row 31.
