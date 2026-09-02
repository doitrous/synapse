<!--
  MU-MED101 - pending-live sparse CONCEPT overlay for 3 questions (Turner,
  axoneme, Klinefelter) in question/MU-MED101-f1supp43-histo-mcq.md.
  Both ## id rows below target a concept that already exists in an unimported
  Kasr batch, checked via find-existing.mjs plus a 540-record bulk grep index
  of docs/Kasr-Source-Imports/concept/101-ISK*.md + 103-BMS-*-concepts.md
  (LANE-CARD's search-before-mint rule) -- see coverage/MU-MED101-triage.md's
  concept-search sample.

    docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md --
      CON-FND-0FAE59E00B748E (a cilium's 9+2, 20-microtubule axoneme) and
      CON-FND-5097CA5BAB2E51 (named chromosomal syndromes, including Turner
      monosomy-X and Klinefelter 47,XXY -- used for BOTH the Turner and the
      Klinefelter item in this lane's cluster).

  Per the chief-of-staff ruling (see docs/Menoufia-Source-Imports/coverage/
  MU-MED105-triage.md's own repair note): tag-additions only, no
  module_subject line. Neither Kasr concept has a locally-included teaching
  article in this lane's own dependency chain (the axoneme concept has no
  article_ids at all in the Kasr file; the chromosomal-syndromes concept's
  own article was not pulled in, to keep this lane's simulate chain to one
  extra file) -- both facts are instead taught by this lane's own
  article/MU-MED101-articles.md 'genetics' record, which names both ids in
  its ## related_concepts.

  Simulate together with docs/Kasr-Source-Imports/concept/101-ISK-mcq-
  concepts.md (see concept/MU-MED101-concepts.md's own header for the full
  simulate command).

  Import: Admin > Concepts > Import.
-->

# Item

## id
CON-FND-0FAE59E00B748E

## label
A cilium arises from a basal body and is built on a 9+2 axoneme

## universities
+mu

## learner_years
+1

## modules
+MU-MED101

## field_notes
mu: Tested as f1supp43-histo-q03 (axoneme) and f1supp43-histo-q02/q22 (Turner/Klinefelter) in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Histology sub-block p33/p38, red-text key confirmed by render.

---

# Item

## id
CON-FND-5097CA5BAB2E51

## label
Named syndromes follow from a specific extra chromosome, missing sex chromosome or deleted arm

## universities
+mu

## learner_years
+1

## modules
+MU-MED101

## field_notes
mu: Tested as f1supp43-histo-q03 (axoneme) and f1supp43-histo-q02/q22 (Turner/Klinefelter) in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Histology sub-block p33/p38, red-text key confirmed by render.
