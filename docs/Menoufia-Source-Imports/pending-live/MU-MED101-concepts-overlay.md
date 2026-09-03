<!--
  MU-MED101 - pending-live sparse CONCEPT overlay. Lane 1 added the first two
  rows below (Turner, axoneme, Klinefelter, all in the histology cluster).
  Lane 3 (this round) appends nine more rows at the end of this file for the
  answerlabeled cluster's own exact-fact reuses, found the same way (a tenth
  candidate reuse, the Kasr centriole/mitotic-spindle concept, was dropped in
  favour of this lane's own already-mu-tagged CON-FND-C590C1C094E153, which
  states the identical fact and is already taught in ART-MU101-ORGANELLES2 --
  no foreign overlay needed for that item):
    docs/6October-Source-Imports/concept/O6U-IBS-101-new-concepts.md --
      CON-CVS-9D836D9C58CE6B (pulmonary veins carry oxygenated blood).
    docs/import-ready/concept/101-ISK-mcq-concepts.md --
      CON-MSK-BF3670E27D6F12 (thoracic/right lymphatic duct territories),
      CON-FND-85CC08A33D0A88 (cell membrane phospholipid bilayer),
      CON-FND-60953640114635 (ribosome basophilia, free vs attached),
      CON-FND-9D325B98FC59A0 (secondary lysosome types incl. multivesicular
      body), CON-FND-6C5ABFD844D630 (euchromatin vs heterochromatin),
      CON-FND-69671A492023B8 (Barr body).
    docs/FOMSCU-Source-Imports/concept/SCU-FBS102-s2-mint-concepts.md --
      CON-DEV-874A4B94DBF067 (secondary spermatocyte -> spermatid via
      meiosis II).
    docs/import-ready/concept/AU-MED-102-embryology-concepts.md --
      CON-DEV-642BA9E28AC8B6 (zona reaction blocks polyspermy).
  All nine are taught by this lane's own article/MU-MED101-articles.md --
  either the new ART-MU101-GENTERMS-C37B82A5 article or one of six existing
  articles extended with these ids in their own ## related_concepts. See
  concept/MU-MED101-concepts-3.md's header for the simulate command.
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

  Lane 4 (biochem2019 cluster) extends CON-FND-F91310521FC982's field_notes
  with one more tested item (leucine-is-ketogenic, biochem2019-q02) and adds
  two more rows at the end of this file for the biochem2019 cluster's own
  exact-fact reuses:
    docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md --
      CON-FND-BE919386760579 (primary structure = amino acid sequence held
      by peptide bonds).
    docs/import-ready/concept/AU-MED-102-biochem-structural-concepts.md --
      CON-FND-68CA299502EB27 (lysine has a net positive charge at
      physiological pH).
  Both taught by this lane's existing ART-MU101-PROTEINAA-C5C4756B article,
  extended with these two ids (plus this lane's own new
  CON-FND-42A860647C4490) in its own ## related_concepts. See
  question/MU-MED101-biochem2019-mcq.md's header for the simulate command.

  Lane 5 (varA-biophys cluster) extends CON-FND-85CC08A33D0A88's field_notes
  with one more tested item (cell membrane = lipid bilayer, varA-biophys-q69)
  and adds three more rows at the end of this file for the varA-biophys
  cluster's own exact-fact reuses, found the same way:
    docs/import-ready/concept/102-INT-mcq-concepts.md --
      CON-FND-89C28B312B15FC (quaternary structure = combination of
      subunits).
    docs/import-ready/concept/AU-MED-102-biochem-structural-concepts.md --
      CON-FND-71648230D1D4E2 (an essential amino acid cannot be synthesised
      by the body).
    docs/import-ready/concept/102-INT-concepts.md --
      CON-FND-2414B3639FD4D3 (denaturation spares primary structure but
      disrupts secondary/tertiary/quaternary and biological activity).
  All four taught by this lane's own article/MU-MED101-articles.md: the
  first three extend the existing ART-MU101-PROTEINAA-C5C4756B article's
  ## related_concepts, the fourth extends the new ART-MU101-MEMBRANE
  article. A fifth exact-fact reuse this cluster found, CON-FND-9E4A791CF44E5C
  (metabolic alkalosis compensated by hypoventilation, varA-biophys-q38), is
  already MU-tagged from lane 2 and already taught in ART-MU101-ACIDBASE --
  referenced directly with no overlay row needed. See
  coverage/seeds/MU-MED101/varA-biophys.json's header and
  concept/MU-MED101-concepts-5.md's header for the full simulate command.

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
mu: Tested as f1supp43-biochemphys-q36 (identifying leucine as purely ketogenic, not glucogenic) in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Biochemistry/Physiology sub-block p21, red text on stem and option. Also tested as biochem2019-q02 (same leucine-is-ketogenic fact) in "EOM - Biochemistry - First Module Exam 2019 - Support 43.pdf" (mu_a6b4be6c7c2e5e8e3232), p2, red-text + underline key confirmed by render.

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

---

# Item

## id
CON-CVS-9D836D9C58CE6B

## label
The pulmonary veins are the only veins that carry oxygenated blood

## universities
+mu

## learner_years
+1

## modules
+MU-MED101

## field_notes
mu: Tested as answerlabeled-q11 in "EOM Practice - Foundation 1 - Anatomy Embryology Histology - Answer-Labeled.pdf" (mu_191aaaeeff88f7bfd219), p4, yellow-highlight key.

---

# Item

## id
CON-MSK-BF3670E27D6F12

## label
The right lymphatic duct drains one quadrant of the body and the thoracic duct drains the other three

## universities
+mu

## learner_years
+1

## modules
+MU-MED101

## field_notes
mu: Tested as answerlabeled-q12 in "EOM Practice - Foundation 1 - Anatomy Embryology Histology - Answer-Labeled.pdf" (mu_191aaaeeff88f7bfd219), p4, yellow-highlight key (right upper limb is part of the right lymphatic duct's one-quadrant territory, so it does not drain to the thoracic duct).

---

# Item

## id
CON-DEV-874A4B94DBF067

## label
A secondary spermatocyte completes the second meiotic division to form a haploid spermatid

## universities
+mu

## learner_years
+1

## modules
+MU-MED101

## field_notes
mu: Tested as answerlabeled-q16 in "EOM Practice - Foundation 1 - Anatomy Embryology Histology - Answer-Labeled.pdf" (mu_191aaaeeff88f7bfd219), p6, yellow-highlight key. The identical stem/options repeat twice more (q17, q18) -- held as exact duplicates of q16, see the seed header.

---

# Item

## id
CON-DEV-642BA9E28AC8B6

## label
The zona pellucida blocks polyspermy and stops the blastomeres sticking to the tubal wall

## universities
+mu

## learner_years
+1

## modules
+MU-MED101

## field_notes
mu: Tested as answerlabeled-q19 in "EOM Practice - Foundation 1 - Anatomy Embryology Histology - Answer-Labeled.pdf" (mu_191aaaeeff88f7bfd219), p7, yellow-highlight key.

---

# Item

## id
CON-FND-85CC08A33D0A88

## label
The cell membrane is a phospholipid bilayer with cholesterol, peripheral and integral proteins, and carbohydrate on its outer face

## universities
+mu

## learner_years
+1

## modules
+MU-MED101

## field_notes
mu: Tested as answerlabeled-q27 in "EOM Practice - Foundation 1 - Anatomy Embryology Histology - Answer-Labeled.pdf" (mu_191aaaeeff88f7bfd219), p10, yellow-highlight key. The source itself mislabels the fifth option "a) Glycocalyx is its protein component" (repeating the first option's letter instead of "e") -- read as option E by position, not by its printed letter; field-noted, not silently corrected without record. Also tested as varA-biophys-q69 ("The cell membrane is formed of: ... Lipid bilayer") in "EOM Practice - Foundation 1 - Biochemistry and Physiology - Variant A.pdf" (mu_f63b294e2eeab7da0ff8), p10, yellow-highlight key.

---

# Item

## id
CON-FND-60953640114635

## label
Free ribosomes make protein the cell keeps; attached ribosomes make protein it exports — and both together are why cytoplasm is basophilic

## universities
+mu

## learner_years
+1

## modules
+MU-MED101

## field_notes
mu: Tested twice as answerlabeled-q28 (localized basophilia -> rough endoplasmic reticulum, p11) and answerlabeled-q30 (ribosomes are the basophilic organelle, p11) in "EOM Practice - Foundation 1 - Anatomy Embryology Histology - Answer-Labeled.pdf" (mu_191aaaeeff88f7bfd219), yellow-highlight key both times.

---

# Item

## id
CON-FND-9D325B98FC59A0

## label
A secondary lysosome is named by what the primary lysosome fused with, and all end as residual bodies

## universities
+mu

## learner_years
+1

## modules
+MU-MED101

## field_notes
mu: Tested as answerlabeled-q29 in "EOM Practice - Foundation 1 - Anatomy Embryology Histology - Answer-Labeled.pdf" (mu_191aaaeeff88f7bfd219), p11, yellow-highlight key (multivesicular bodies = a primary lysosome fused with a pinocytic vesicle, digesting fluid material).

---

# Item

## id
CON-FND-6C5ABFD844D630

## label
Euchromatin is extended and active and makes a nucleus vesicular; heterochromatin is coiled and inactive and makes it condensed

## universities
+mu

## learner_years
+1

## modules
+MU-MED101

## field_notes
mu: Tested as answerlabeled-q31 in "EOM Practice - Foundation 1 - Anatomy Embryology Histology - Answer-Labeled.pdf" (mu_191aaaeeff88f7bfd219), p11, yellow-highlight key.

---

# Item

## id
CON-FND-69671A492023B8

## label
The Barr body is one X chromosome switched off, so a nucleus shows one fewer Barr body than it has X chromosomes

## universities
+mu

## learner_years
+1

## modules
+MU-MED101

## field_notes
mu: Tested as answerlabeled-q35 in "EOM Practice - Foundation 1 - Anatomy Embryology Histology - Answer-Labeled.pdf" (mu_191aaaeeff88f7bfd219), p12, yellow-highlight key.

---

# Item

## id
CON-FND-BE919386760579

## label
Primary structure is the amino acid sequence held together by peptide bonds, running from an N-terminus amino acid on the left to a C-terminus amino acid on the right, synthesized in that same N-to-C direction, and it is the first of the four orders that the higher orders are built from

## universities
+mu

## learner_years
+1

## modules
+MU-MED101

## field_notes
mu: Tested as biochem2019-q03 ("The primary structure of protein represents" -> "Linear sequence of amino acids joined by peptide bond") in "EOM - Biochemistry - First Module Exam 2019 - Support 43.pdf" (mu_a6b4be6c7c2e5e8e3232), p2, red-text + underline key confirmed by render.

---

# Item

## id
CON-FND-68CA299502EB27

## label
Lysine has a net positive charge at physiological pH

## universities
+mu

## learner_years
+1

## modules
+MU-MED101

## field_notes
mu: Tested as biochem2019-q04 ("Which... amino acids carries a net positive charge at the physiological pH?" -> Lysine) in "EOM - Biochemistry - First Module Exam 2019 - Support 43.pdf" (mu_a6b4be6c7c2e5e8e3232), p2, red-text + underline key confirmed by render.

---

# Item

## id
CON-FND-89C28B312B15FC

## label
a protein built of one polypeptide chain has primary, secondary and tertiary structure, and a protein built of two or more chains adds a quaternary structure that certain proteins like hemoglobin need for activity

## universities
+mu

## learner_years
+1

## modules
+MU-MED101

## field_notes
mu: Tested as varA-biophys-q54 ("Which of the following is true regarding the quaternary structure of proteins?" -> Combination of subunits) in "EOM Practice - Foundation 1 - Biochemistry and Physiology - Variant A.pdf" (mu_f63b294e2eeab7da0ff8), p6, yellow-highlight key.

---

# Item

## id
CON-FND-71648230D1D4E2

## label
An essential amino acid cannot be synthesised by the body and must come from the diet

## universities
+mu

## learner_years
+1

## modules
+MU-MED101

## field_notes
mu: Tested as varA-biophys-q55 ("Which of the following is a non-essential amino acid?" -> Glutamine, distinguishing it from the essential amino acids threonine, phenylalanine, valine and lysine listed alongside it) in "EOM Practice - Foundation 1 - Biochemistry and Physiology - Variant A.pdf" (mu_f63b294e2eeab7da0ff8), p6, yellow-highlight key.

---

# Item

## id
CON-FND-2414B3639FD4D3

## label
Denaturation ruptures the bonds holding secondary, tertiary and quaternary structure, leaving the primary sequence intact but the protein insoluble, more viscous, more digestible and biologically dead

## universities
+mu

## learner_years
+1

## modules
+MU-MED101

## field_notes
mu: Tested as varA-biophys-q58 ("Denaturation of protein:" -> None of the above, since the printed distractors each misstate the primary-structure/quaternary-structure/biological-activity facts this concept states correctly) in "EOM Practice - Foundation 1 - Biochemistry and Physiology - Variant A.pdf" (mu_f63b294e2eeab7da0ff8), p7, yellow-highlight key.
