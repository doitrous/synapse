<!--
  MU-MED101 - pending-live sparse CONCEPT overlay. Lane 1 added the first two
  rows below (Turner, axoneme, Klinefelter, all in the histology cluster).
  Lane 2 extends CON-FND-5097CA5BAB2E51's field_notes with two more tested
  items (Turner and Down syndrome, in the embryology cluster) and adds five
  new rows for the biochemphys and embryo clusters' own exact-fact reuses,
  found the same way -- find-existing.mjs plus root-word greps across
  Kasr/Alexandria/Ain-Shams pending concept files (LANE-CARD's
  search-before-mint rule) -- see the two seed headers in
  coverage/seeds/MU-MED101/f1supp43-{biochemphys,embryo}.json.

    docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md --
      CON-FND-0FAE59E00B748E (a cilium's 9+2, 20-microtubule axoneme) and
      CON-FND-5097CA5BAB2E51 (named chromosomal syndromes: Turner monosomy-X,
      Klinefelter 47,XXY, Down syndrome trisomy-21 -- used for four items
      across the histology and embryo clusters).
    docs/Ain-Shams-Source-Imports/concept/ASU-UG-assessment-1-mcq-concepts.md --
      CON-REN-DFF352F789A971 (diarrhoea causes hyperchloremic, normal-anion-
      gap metabolic acidosis through GI bicarbonate loss).
    docs/import-ready/concept/AU-MED-102-biochem-structural-concepts.md --
      CON-FND-AEDF8CA500AD5A (monosaccharide isomerism: D/L, epimers,
      anomers, aldose-ketose -- used for 3 biochemphys items).
    docs/Kasr-Source-Imports/concept/103-BMS-biochemistry-concepts.md --
      CON-FND-F91310521FC982 (the amino-acid glucogenic/ketogenic/essential
      summary table; leucine and lysine are the two purely ketogenic amino
      acids).
    docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md --
      CON-FND-7C8A02831B3243 (peptide-bond condensation mechanism).
    docs/Ain-Shams-Source-Imports/concept/ASU-AE-embryo2-q11-69-new-concepts.md --
      CON-OBS-54773B9FA007C0 (the placenta's fetal part, chorion frondosum,
      and maternal part, decidua basalis -- used for 3 embryo items).

  Per the chief-of-staff ruling (see docs/Menoufia-Source-Imports/coverage/
  MU-MED105-triage.md's own repair note): tag-additions only, no
  module_subject line. None of these six foreign concepts has a locally-
  included teaching article in this lane's own dependency chain; all are
  instead taught by this lane's own article/MU-MED101-articles.md records,
  which name each id in their own ## related_concepts (the pre-existing
  'genetics' article for CON-FND-0FAE59E00B748E/CON-FND-5097CA5BAB2E51,
  extended by lane 2 for Down syndrome; ART-MU101-ACIDBASE-D4BF76CA for
  CON-REN-DFF352F789A971; ART-MU101-CARBCHEM-9E8FDE35 for
  CON-FND-AEDF8CA500AD5A; ART-MU101-PROTEINAA-C5C4756B for
  CON-FND-F91310521FC982 and CON-FND-7C8A02831B3243; ART-MU101-PLACENTA-6CA76541
  for CON-OBS-54773B9FA007C0).

  Simulate together with all six foreign concept files (see
  concept/MU-MED101-concepts-2.md's own header for the full simulate
  command).

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
mu: Tested as f1supp43-histo-q03 (axoneme) and f1supp43-histo-q02/q22 (Turner/Klinefelter) in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Histology sub-block p33/p38, red-text key confirmed by render. Lane 2: also tested as f1supp43-embryo-q02 (Turner, "44+X" in the paper's own autosome+sex-chromosome notation) and f1supp43-embryo-q26 (Down syndrome, 47 chromosomes) in the same paper's Embryology sub-block p3/p9, red text on stem and option.

---

# Item

## id
CON-REN-DFF352F789A971

## label
Diarrhea causes hyperchloremic (normal anion gap) metabolic acidosis through gastrointestinal bicarbonate loss

## universities
+mu

## learner_years
+1

## modules
+MU-MED101

## field_notes
mu: Tested as f1supp43-biochemphys-q06 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Biochemistry/Physiology sub-block p14, red text on stem and option (a 10-year-old with severe diarrhoea, pH 7.25, PaCO2 24, HCO3 10, normal anion gap -> metabolic acidosis).

---

# Item

## id
CON-FND-AEDF8CA500AD5A

## label
Monosaccharides sharing a molecular formula are told apart by four distinct kinds of isomerism: D/L by the configuration at the reference carbon, epimers by one non-anomeric carbon, anomers by the anomeric carbon alone, and aldose-ketose by the functional group itself

## universities
+mu

## learner_years
+1

## modules
+MU-MED101

## field_notes
mu: Tested as f1supp43-biochemphys-q18 (epimer definition), q22 (glucose/galactose as an epimer example) and q29 (anomer definition, alpha/beta-D-glucose) in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Biochemistry/Physiology sub-block p17-20, red text on stem and option.

---

# Item

## id
CON-FND-F91310521FC982

## label
The book closes the amino acid chapter with one table: which amino acids are glucogenic, ketogenic or both, and which are essential

## universities
+mu

## learner_years
+1

## modules
+MU-MED101

## field_notes
mu: Tested as f1supp43-biochemphys-q36 (identifying leucine as purely ketogenic, not glucogenic) in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Biochemistry/Physiology sub-block p21, red text on stem and option.

---

# Item

## id
CON-FND-7C8A02831B3243

## label
A peptide bond forms by condensation of the carboxylic group of one amino acid with the amino group of the next, releasing one molecule of water

## universities
+mu

## learner_years
+1

## modules
+MU-MED101

## field_notes
mu: Tested as f1supp43-biochemphys-q37 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Biochemistry/Physiology sub-block p22, red text on stem and option.

---

# Item

## id
CON-OBS-54773B9FA007C0

## label
The placenta is formed of a fetal part (chorion frondosum) and a maternal part (decidua basalis)

## universities
+mu

## learner_years
+1

## modules
+MU-MED101

## field_notes
mu: Tested as f1supp43-embryo-q04 and q31 (maternal part -> decidua basalis) and q07 (fetal part -> chorion frondosum) in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Embryology sub-block p3-4 and p10, red text on stem and option.
