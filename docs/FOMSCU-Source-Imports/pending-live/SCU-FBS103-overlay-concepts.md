<!--
  SCU-FBS103 · Foundation 2 — sparse CONCEPT overlay for 14 of the 15
  questions in the sibling SCU-FBS103-questions.md (the 15th, gastrulation,
  extends an existing +scu overlay row in
  docs/FOMSCU-Source-Imports/pending-live/SCU-FBS102-overlay-concepts.md
  instead of appearing here — see that file's own field_notes). Every
  question below reuses an existing concept rather than minting a new one,
  found by running `find-existing.mjs` on each candidate's printed answer
  text and then reading the actual hit body against the FOMSCU source
  question — not just trusting the tool's live/pending label. LANE-CARD.md
  §7 names the trap this repeats from Foundation 1: several of this
  module's automated "live" hits (histology-mesenchymal-cell,
  anatomy-sartorius-muscle, anatomy-trigeminal-nerve, pathology-necrosis,
  pathology-pathogenesis, histology-one, parasitology-parasite,
  biochemistry-20, biochemistry-vitamin-k) were homonym collisions on a
  generic answer word and are NOT reused here — see
  `coverage/SCU-FBS103-triage.md`'s manual-QA section for the full
  judgement table. This file only adds SCU's own tags — it never retypes a
  full record, so it can never evict another university's data. Per
  LANE-CARD.md §7, an overlay row here carries tag additions only
  (`universities`/`learner_years`/`modules`, all `+`-prefixed and additive)
  and no `module_subject` line — that field belongs to whichever lane
  authored the concept's own record.

  Two groups:

  LIVE (4) — already in server/data/medical-library-v1.json (checked
  directly against the live JSON, not just find-existing.mjs's own label).
  No apply-after needed. None of the four already carries `scu` in its
  universityIds, so every one of these overlay rows is a first tag onto
  another university's live record, never an append onto SCU's own data:

    CON-FND-10446D757EB8E7  (kau, learnerYears [1,2,3]) — facial vein
    CON-OBS-CE9AE0A25B4C0B  (kau, learnerYears [2])     — trophoblast layers
    CON-MSK-0BE756765378A6  (kau, learnerYears [1,2])   — exercise hypertrophy
    CON-INF-ABF1EA01540430  (kau, learnerYears [1,2,3]) — antibiotics from microorganisms

  PENDING (10) — exist only in other lanes' own unimported batches (checked
  directly against the live JSON: none of the 10 ids below are in it).
  Apply each pending row only after its own named source file is itself
  live, per 02-concepts.md Step 1 ("A hit only in another lane's unimported
  batch ... is still a hit. Write your update as a sparse record ... with
  an INDEX line reading 'apply after <the other lane's file>'"):

    A. docs/Kasr-Source-Imports/concept/103-BMS-mcq-vitamins-nerve-concepts.md      (troponin C)
    B. docs/Assiut-Source-Imports/concept/AUN-INI-105-ch2-concepts.md               (binary fission)
    C. docs/Ain-Shams-Source-Imports/concept/ASU-MBG-translation-protein-synthesis-concepts.md  (aminoacyl-tRNA synthetase)
    D. docs/Helwan-Source-Imports/concept/HU-GIT-301-parasitology-part2-concepts.md (rhabditiform larvae)
    E. docs/Alexandria-Source-Imports/concept/AU-MED-102-biochem-molecular-concepts.md (DNA ligase)
    F. docs/Assiut-Source-Imports/concept/AUN-INI-105-ch6-concepts.md               (viral genome)
    G. docs/Ain-Shams-Source-Imports/concept/ASU-INF-microbiology-concepts.md       (obligate anaerobes)
    H. docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md                     (primary yolk sac)
    I. docs/Kasr-Source-Imports/concept/108-INT-concepts-pharmacology.md            (full agonist)
    J. docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md              (resting membrane potential)

  Gate together with the sibling question file and every source file named
  above, e.g.:
  node scripts/content/gate.mjs batch docs/FOMSCU-Source-Imports/pending-live/SCU-FBS103-questions.md \
    --with docs/FOMSCU-Source-Imports/pending-live/SCU-FBS103-overlay-concepts.md \
    --with docs/FOMSCU-Source-Imports/pending-live/SCU-FBS102-overlay-concepts.md \
    --with docs/Kasr-Source-Imports/concept/103-BMS-mcq-vitamins-nerve-concepts.md \
    --with docs/Assiut-Source-Imports/concept/AUN-INI-105-ch2-concepts.md \
    --with docs/Ain-Shams-Source-Imports/concept/ASU-MBG-translation-protein-synthesis-concepts.md \
    --with docs/Helwan-Source-Imports/concept/HU-GIT-301-parasitology-part2-concepts.md \
    --with docs/Alexandria-Source-Imports/concept/AU-MED-102-biochem-molecular-concepts.md \
    --with docs/Assiut-Source-Imports/concept/AUN-INI-105-ch6-concepts.md \
    --with docs/Ain-Shams-Source-Imports/concept/ASU-INF-microbiology-concepts.md \
    --with docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md \
    --with docs/Kasr-Source-Imports/concept/108-INT-concepts-pharmacology.md \
    --with docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md
-->

# Item

## id
CON-FND-10446D757EB8E7

## label
Main veins draining the face

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS103

## field_notes
scu: FOMSCU Foundation 2 QBank, EOM MID 2026 Q25 — tests the facial vein as the primary superficial venous drainage of the face. Target: live, no apply-after.

---

# Item

## id
CON-OBS-CE9AE0A25B4C0B

## label
During the first four months, placental barrier trophoblast includes cytotrophoblast and syncytiotrophoblast

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS103

## field_notes
scu: FOMSCU Foundation 2 QBank, EOM MID 2026 Q28 — tests the day-8 trophoblast split into cytotrophoblast and syncytiotrophoblast. Target: live, no apply-after.

---

# Item

## id
CON-MSK-0BE756765378A6

## label
Exercise enlarges existing skeletal muscle fibers

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS103

## field_notes
scu: FOMSCU Foundation 2 QBank, EOM MID 2026 Q45 — tests exercise-induced skeletal muscle hypertrophy as increased fibre size, not fibre number. Target: live, no apply-after.

---

# Item

## id
CON-INF-ABF1EA01540430

## label
Antibiotics are low-molecular-weight antimicrobial secondary metabolites originally produced by microorganisms

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS103

## field_notes
scu: FOMSCU Foundation 2 QBank, EOM MID 2026 Q15 — tests natural penicillin's microbial (Penicillium) origin. Target: live, no apply-after.

---

# Item

## id
CON-MSK-3013AA61E917B7

## label
Excitation–contraction coupling relays a T-tubule depolarisation into calcium release, calcium onto troponin C, and tropomyosin off the actin site

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS103

## field_notes
scu: FOMSCU Foundation 2 QBank, EOM MID 2026 Q24 — tests that calcium released from the sarcoplasmic reticulum binds troponin C during excitation-contraction coupling. Target — apply after docs/Kasr-Source-Imports/concept/103-BMS-mcq-vitamins-nerve-concepts.md.

---

# Item

## id
CON-INF-25DA8EFD9E1DA5

## label
Bacteria reproduce by simple binary fission, made possible by carrying a single (usually circular) chromosome rather than the diploid, spindle-based apparatus that eukaryotic mitosis or meiosis requires

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS103

## field_notes
scu: FOMSCU Foundation 2 QBank, EOM MID 2026 Q18 — tests binary fission as bacteria's primary replication method. Target — apply after docs/Assiut-Source-Imports/concept/AUN-INI-105-ch2-concepts.md.

---

# Item

## id
CON-FND-02E8733D78D5DC

## label
Aminoacyl-tRNA synthetases, not the ribosome itself, are the primary guarantee of translational fidelity

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS103

## field_notes
scu: FOMSCU Foundation 2 QBank, EOM MID 2026 Q9 — tests aminoacyl-tRNA synthetase as the enzyme that charges tRNA. Target — apply after docs/Ain-Shams-Source-Imports/concept/ASU-MBG-translation-protein-synthesis-concepts.md.

---

# Item

## id
CON-GIT-9041A06C9B074B

## label
The rhabditiform larva, not egg or filariform larva, is the diagnostic stage of Strongyloides stercoralis found in stool

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS103

## field_notes
scu: FOMSCU Foundation 2 QBank, EOM MID 2026 Q1 — tests rhabditiform larvae as the diagnostic stool stage of Strongyloides stercoralis. Target — apply after docs/Helwan-Source-Imports/concept/HU-GIT-301-parasitology-part2-concepts.md.

---

# Item

## id
CON-FND-252B3C77D181DA

## label
DNA ligase joins Okazaki fragments together, sealing the nicks left on the lagging strand

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS103

## field_notes
scu: FOMSCU Foundation 2 QBank, EOM MID 2026 Q40 — tests DNA ligase as the enzyme sealing phosphodiester-bond nicks between DNA fragments. Target — apply after docs/Alexandria-Source-Imports/concept/AU-MED-102-biochem-molecular-concepts.md.

---

# Item

## id
CON-INF-A732F8E1F4CA86

## label
A virus's genetic material is either DNA or RNA, never both

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS103

## field_notes
scu: FOMSCU Foundation 2 QBank, EOM MID 2026 Q50 — tests that a virus's genome is exclusively DNA or RNA, never both. Target — apply after docs/Assiut-Source-Imports/concept/AUN-INI-105-ch6-concepts.md.

---

# Item

## id
CON-INF-2E9D6F833A7D5E

## label
Aerobic bacterial respiration requires catalase or superoxide dismutase to detoxify reactive oxygen species, and obligate anaerobes lack them

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS103

## field_notes
scu: FOMSCU Foundation 2 QBank, EOM MID 2026 Q51 — tests obligate anaerobes dying in the presence of oxygen (they lack catalase/SOD). Target — apply after docs/Ain-Shams-Source-Imports/concept/ASU-INF-microbiology-concepts.md.

---

# Item

## id
CON-DEV-1D10DF3B716A70

## label
Heuser's membrane lines the primary yolk sac, the allantois buds from the secondary one, and the vitelline duct is what connects the definitive sac to the midgut

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS103

## field_notes
scu: FOMSCU Foundation 2 QBank, EOM MID 2026 Q59 — tests that Heuser's membrane lines the blastocele to form the primary yolk sac. Target — apply after docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md.

---

# Item

## id
CON-FND-4388E0D8A75FD4

## label
A ligand may be a full agonist, a partial agonist, an inverse agonist or an antagonist, according to what its binding does to the receptor

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS103

## field_notes
scu: FOMSCU Foundation 2 QBank, EOM MID 2026 Q47 — tests the full agonist as the ligand with maximum activation and high efficacy. Target — apply after docs/Kasr-Source-Imports/concept/108-INT-concepts-pharmacology.md.

---

# Item

## id
CON-NEU-8319D639D05322

## label
The resting membrane potential is the polarised, un-stimulated potential difference across the membrane, largest in big nerve and skeletal muscle fibres

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS103

## field_notes
scu: FOMSCU Foundation 2 QBank, EOM MID 2026 Q38 — tests the typical (medium-sized) neuron's resting membrane potential as about -70 mV. Target — apply after docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md.

---

<!--
  BATCH 2 (same author lane, scu-fbs103-author1) — appended below the batch-1
  divider above. Covers the 1 reuse question in the sibling
  SCU-FBS103-s2-anatomy-questions.md (the batch's other 12 questions mint
  fresh concepts instead, in docs/FOMSCU-Source-Imports/concept/
  SCU-FBS103-s2-mint-concepts.md). PENDING (1) — exists only in Kasr's own
  unimported batch (checked directly against the live JSON: not in it).

  Gate together with:
  node scripts/content/gate.mjs batch docs/FOMSCU-Source-Imports/pending-live/SCU-FBS103-s2-anatomy-questions.md \
    --with docs/FOMSCU-Source-Imports/pending-live/SCU-FBS103-overlay-concepts.md \
    --with docs/FOMSCU-Source-Imports/concept/SCU-FBS103-s2-mint-concepts.md \
    --with docs/FOMSCU-Source-Imports/article/SCU-FBS103-s2-mint-articles.md \
    --with docs/Kasr-Source-Imports/concept/101-ISK-concepts.md \
    --with docs/Kasr-Source-Imports/article/101-ISK-anatomy.md
-->

# Item

## id
CON-MSK-8863ACD7E8D790

## label
Primary cartilaginous joints are hyaline and temporary; secondary ones are fibrocartilaginous and midline

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS103

## field_notes
scu: FOMSCU Foundation 2 QBank, Formative 2025 Q7 — tests the epiphyseal growth plate as the textbook example of a primary (hyaline, temporary) cartilaginous joint. Target — apply after docs/Kasr-Source-Imports/concept/101-ISK-concepts.md.

---

<!--
  BATCH 3 (same author lane, scu-fbs103-author1) — appended below the
  batch-2 divider above. Covers the 2 reuse questions in the sibling
  SCU-FBS103-s2-physiology-pathology-parasitology-questions.md (the
  batch's other 14 questions mint fresh concepts instead, in
  docs/FOMSCU-Source-Imports/concept/SCU-FBS103-s2-author1-batch2-mint-concepts.md).
  PENDING (2) — exist only in Ain Shams's/6October's own unimported
  batches (checked directly against the live JSON: neither id is in it).

  Gate together with:
  node scripts/content/gate.mjs batch docs/FOMSCU-Source-Imports/pending-live/SCU-FBS103-s2-physiology-pathology-parasitology-questions.md \
    --with docs/FOMSCU-Source-Imports/pending-live/SCU-FBS103-overlay-concepts.md \
    --with docs/FOMSCU-Source-Imports/concept/SCU-FBS103-s2-author1-batch2-mint-concepts.md \
    --with docs/FOMSCU-Source-Imports/article/SCU-FBS103-s2-author1-batch2-mint-articles.md \
    --with docs/Ain-Shams-Source-Imports/concept/ASU-INF-microbiology-concepts.md \
    --with docs/Ain-Shams-Source-Imports/article/ASU-INF-microbiology-articles.md \
    --with docs/6October-Source-Imports/concept/O6U-IMP-106-new-concepts.md \
    --with docs/6October-Source-Imports/article/O6U-IMP-106-new-articles.md
-->

# Item

## id
CON-INF-7213E96DAD38D1

## label
The macroscopic aggregation of fungal hyphae is known as the mycelium

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS103

## field_notes
scu: FOMSCU Foundation 2 QBank, EOY 2025 Q23 — tests the mycelium as the macroscopic mass of fungal hyphae. Target — apply after docs/Ain-Shams-Source-Imports/concept/ASU-INF-microbiology-concepts.md.

---

# Item

## id
CON-INF-5B65FB27C77C1C

## label
Continuous cell culture used for viral isolation consists of immortalized cell lines, such as tumour cell lines

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS103

## field_notes
scu: FOMSCU Foundation 2 QBank, EOY 2025 Q24 — tests the continuous cell line as the immortalized culture type used for extended viral replication. Target — apply after docs/6October-Source-Imports/concept/O6U-IMP-106-new-concepts.md.
