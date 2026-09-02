<!--
  ASU-AE · Embryo 3 MCQ cluster (src_3448fabd352cb8018ed3, "MCQs - Embryo 3.pdf")
  — pending-live sparse CONCEPT overlay.

  The six ## id rows below target concepts that exist ONLY in Kasr's
  unimported 101-ISK batch — not yet in server/data/medical-library-v1.json.
  find-existing.mjs runs plus a direct grep of that file for
  gastrulation/somite/notochord/neural-crest/neural-plate labels surfaced
  these exact facts already minted there (gastrulation's own definition
  already states intraembryonic mesoderm's three sources and its two
  absence sites verbatim, so Q5 and Q51 overlay onto it too rather than a
  fresh mint). One canonical key, one id, university-blind — these rows
  overlay ASU's own tags onto them rather than re-minting.

  Apply this file ONLY after the named source file is live:
    A. docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md —
       university `kasr`, module `101-ISK` (Anatomy, General Embryology).

  Per LANE-BRIEF §6 rule 1/2 and the concepts manual: `## module_subject`
  fully replaces on every write (no `+` form) — the rows below restate the
  source's existing line plus ASU's own. `## universities`, `## learner_years`
  and `## modules` are true ID-list columns and take `+asu` / `+1` / `+ASU-AE`.

  Simulate together with the source file this block targets:
  node scripts/content/gate.mjs simulate \
    docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md \
    docs/Ain-Shams-Source-Imports/pending-live/ASU-AE-embryo3-kasr101isk-overlay-concepts.md \
    docs/Ain-Shams-Source-Imports/question/ASU-AE-embryo3-mcq.md
-->

# Item

## id
CON-DEV-215BD7E9E58872

## label
Gastrulation makes the trilaminar disc in the third week, and all three of its layers come from the epiblast

## universities
+asu

## learner_years
+1

## modules
+ASU-AE

## module_subject
101 ISK > Anatomy > General Embryology > Third Week of Development
ASU-AE > Embryology > Questions > MCQ

## field_notes
asu: Reused as `main_concept` for four ASU-AE Embryo 3 items: Q1 ("The primitive streak develops in which layer of embryonic disc?" -- Epiblast), Q44 ("On what week of intrauterine life does gastrulation occur?" -- 3rd), and Q5/Q51 (the major source of intraembryonic mesoderm is the primitive streak; connecting stalk is the one thing NOT part of intraembryonic mesoderm) -- this record's own definition already states both the primitive-streak/node/notochord sources and the two absence sites (oropharyngeal and cloacal membranes) verbatim, so no separate mint was needed for those two questions. "MCQs - Embryo 3.pdf" pp.1-2,4,7, printed answer table p.17 rows 1,5,44 and p.18 row 51.

---

# Item

## id
CON-DEV-5E63C211DEEE00

## label
Each somite splits into a sclerotome and a dermomyotome, and those become bone, dermis and muscle

## universities
+asu

## learner_years
+1

## modules
+ASU-AE

## module_subject
101 ISK > Anatomy > General Embryology > Third Week of Development
ASU-AE > Embryology > Questions > MCQ

## field_notes
asu: Reused as `main_concept` for five ASU-AE Embryo 3 items: Q2 ("Which of the following is derived from Somites" -- Dermis), Q16 ("Derived from the paraxial mesoderm" -- Dermis of skin), Q20/Q24 (the axial skeleton develops from paraxial mesoderm/somites, via this record's own sclerotome-forms-vertebrae fact), and Q47 ("Somites may differentiate into all of the following except" -- Epidermis of skin, which this record's own dermatome/myotome/sclerotome list excludes). "MCQs - Embryo 3.pdf" pp.1,2,4,8, printed answer table p.17 rows 2,16,20,24 and p.18 row 47.

---

# Item

## id
CON-DEV-3AB7E19B99F387

## label
The first somite pair appears on day 20 and three pairs are added each day, so the number of somites gives the embryo's age

## universities
+asu

## learner_years
+1

## modules
+ASU-AE

## module_subject
101 ISK > Anatomy > General Embryology > Embryonic Period
ASU-AE > Embryology > Questions > MCQ

## field_notes
asu: Reused as `main_concept` for four ASU-AE Embryo 3 items testing the same somite-count-by-day arithmetic this record's own formula (age = (somites-1)/3 + 20) directly answers: Q17 ("The number of somites during the 22nd day" -- Seven, matching the printed key's own day20->1/day21->4/day22->7 working), Q29 ("At which day the embryo shows 10 pairs of somites?" -- day 23), Q34 ("The earliest somites begin to appear on day" -- 20), and Q53 ("At which day in development does the somites start to appear?" -- 20th). "MCQs - Embryo 3.pdf" pp.2,5,6,9, printed answer table p.17 rows 17,29,34 and p.19 row 53.

---

# Item

## id
CON-DEV-1BCF37C48AF307

## label
The notochord forms in four steps, guides the embryo, and ends as the nucleus pulposus

## universities
+asu

## learner_years
+1

## modules
+ASU-AE

## module_subject
101 ISK > Anatomy > General Embryology > Third Week of Development
ASU-AE > Embryology > Questions > MCQ

## field_notes
asu: Reused as `main_concept` for two ASU-AE Embryo 3 items: Q38 ("Nucleus pulposus of intervertebral disc develops from the:" -- Notochord, matching this record's own stated fate) and Q45 ("The notochord is derived from:" -- Epiblast, matching this record's own prenotochordal-process-from-epiblast-cells account). "MCQs - Embryo 3.pdf" pp.6,7, printed answer table p.17 rows 38,45.

---

# Item

## id
CON-DEV-785CE84F7C03DB

## label
The neural tube becomes the central nervous system; the neural crest beside it becomes almost everything peripheral

## universities
+asu

## learner_years
+1

## modules
+ASU-AE

## module_subject
101 ISK > Anatomy > General Embryology > Third Week of Development
ASU-AE > Embryology > Questions > MCQ

## field_notes
asu: Reused as `main_concept` for four ASU-AE Embryo 3 items: Q35 ("The neural crest cells give rise to the following EXCEPT" -- Retina of the eye, which this record's own derivative list excludes), Q40 ("Pigment cells of the skin (melanocytes) are derived from the:" -- Neural crest, matching this record's own list directly), and Q42 ("The following structures are of neural crest origin EXCEPT" -- Dura matter, likewise excluded by this record's list). Also reused (with heavy doubt logged in the question's own `author_notes`) for Q10 ("Derived from ectoderm" -- printed key marks "e"/"Heart", which conflicts with both this concept's melanocyte fact and standard teaching; the letter is retained per house rule). "MCQs - Embryo 3.pdf" pp.2,6,7, printed answer table p.17 row 10 and p.18 rows 35,40,42.

---

# Item

## id
CON-DEV-4BC4233153C3DC

## label
The neural plate is thickened median ectoderm induced by the notochord beneath it, and it folds into the neural tube

## universities
+asu

## learner_years
+1

## modules
+ASU-AE

## module_subject
101 ISK > Anatomy > General Embryology > Third Week of Development
ASU-AE > Embryology > Questions > MCQ

## field_notes
asu: Reused as `main_concept` for two ASU-AE Embryo 3 items: Q30 ("Which of the following is ectodermal in origin: ... Brain", matching this record's own central-nervous-system-from-ectoderm fact) and Q41 ("Induces embryonic development of the nervous system:" -- Notochord, matching this record's own "induced by [the notochord]" wording exactly).
