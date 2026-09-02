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

---

<!--
  BATCH 4 (second author lane, scu-fbs103-author2) — appended below the
  batch-3 divider above. Covers 7 of the 14 reuse questions in the sibling
  pending-live/SCU-FBS103-s2-author2-reuse-questions.md (the other 7 reuse
  CON-FND-4388E0D8A75FD4, already overlaid above in BATCH 1 — full/partial
  agonist — and CON-FND-14D80DE53DE835, this batch's own new row, covers 5
  of the 7 questions here). This lane's other 27 questions mint fresh
  concepts instead, in
  docs/FOMSCU-Source-Imports/concept/SCU-FBS103-s2-author2-mint-concepts.md.

  ONE (1) — live (docs/../server/data/medical-library-v1.json, checked
  directly, not just via find-existing.mjs's own label): CON-DEV-65C2AEF8C5DB47
  (kau, universityIds does not currently include scu — first scu tag).

  SIX (6) — pending (exist only in other lanes' or this same lane's own
  unimported batches; checked directly against the live JSON: none of the
  6 ids below are in it):

    A. docs/Assiut-Source-Imports/concept/AUN-PMS-102-concepts.md                (cloacal membrane)
    B. docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md                  (unipolar/bipolar/multipolar neuron classification)
    C. docs/Alexandria-Source-Imports/concept/AU-MED-105-histology-concepts.md   (neuroglia cell functions incl. microglia phagocytosis)
    D. docs/Helwan-Source-Imports/concept/HU-GIT-301-parasitology-concepts.md    (fish-borne helminth transmission)
    E. docs/Helwan-Source-Imports/concept/HU-GIT-301-parasitology-concepts.md    (Hymenolepis nana direct cycle, same file as D)
    F. docs/FOMSCU-Source-Imports/concept/SCU-FBS102-s2-author5-mint-concepts.md (spermatogenesis 1:4 yield; this lane's own FBS102 pass, already scu-tagged — only the SCU-FBS103 module tag is added)

  Gate together with:
  node scripts/content/gate.mjs batch docs/FOMSCU-Source-Imports/pending-live/SCU-FBS103-s2-author2-reuse-questions.md \
    --with docs/FOMSCU-Source-Imports/pending-live/SCU-FBS103-overlay-concepts.md \
    --with docs/Assiut-Source-Imports/concept/AUN-PMS-102-concepts.md \
    --with docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md \
    --with docs/Alexandria-Source-Imports/concept/AU-MED-105-histology-concepts.md \
    --with docs/Helwan-Source-Imports/concept/HU-GIT-301-parasitology-concepts.md \
    --with docs/FOMSCU-Source-Imports/concept/SCU-FBS102-s2-author5-mint-concepts.md
-->

# Item

## id
CON-DEV-65C2AEF8C5DB47

## label
Coelom splits lateral-plate mesoderm

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS103

## field_notes
scu: FOMSCU Foundation 2 QBank, EOY 2025 Q14 — tests that the lateral plate mesoderm splits to enclose the intraembryonic coelom. Target: live, no apply-after.

---

# Item

## id
CON-DEV-1AAC12ECDA6AE2

## label
The cloacal membrane is derived from both ectoderm and endoderm, at the site where these two layers meet without intervening mesoderm

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS103
+SCU-FBS102

## field_notes
scu: FOMSCU Foundation 2 QBank, EOM MID 2026 Q31 — tests the cloacal membrane as the bilaminar (ectoderm+endoderm, no mesoderm) area at the caudal end of the embryonic disc. Target — apply after docs/Assiut-Source-Imports/concept/AUN-PMS-102-concepts.md.
scu2: (lane 3, scu-fbs103-author3, FBS102 leftovers pass) FOMSCU Foundation 1 QBank, Formative and Past Exams 2021 Q62 (also 2022 Q42) — same concept, different question: tests the cloacal membrane as the structure that closes the distal end of the developing hindgut during folding, rather than its bilaminar ectoderm+endoderm composition. Same apply-after target as above.

---

# Item

## id
CON-FND-14D80DE53DE835

## label
Nerve cells are classed by how many processes leave the cell body: one, two, or more than two

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS103

## field_notes
scu: FOMSCU Foundation 2 QBank, Formative 2025 Q11 / EOM MID 2026 Q21 / EOY 2025 Q21 / EOY 2025 Q15 / EOM MID 2026 Q52 — reused for 5 questions in this batch: pseudounipolar neurons' dorsal-root-ganglion location (2 phrasings), multipolar neurons' autonomic-sympathetic-ganglia location (extends the concept's own worked-example set beyond the ventral-horn/Purkinje examples it names directly — recorded as a lower-confidence extension), and the multipolar neuron's single-axon count. Target — apply after docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md.

---

# Item

## id
CON-NEU-93CD087BDE3F7B

## label
Astrocytes form the blood-brain barrier, microglia phagocytose as the CNS's resident monocyte-derived cell, oligodendrocytes myelinate CNS axons, and ependymal cells line the CSF-filled cavities

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS103

## field_notes
scu: FOMSCU Foundation 2 QBank, EOM MID 2026 Q22 / EOY 2025 Q13 — tests microglia's phagocytic role removing cellular debris (2 phrasings). Target — apply after docs/Alexandria-Source-Imports/concept/AU-MED-105-histology-concepts.md (also mirrored, unimported, in docs/import-ready/concept/AU-MED-105-histology-concepts.md).

---

# Item

## id
CON-GIT-E20B95815074E4

## label
Heterophyes heterophyes, Metagonimus yokogawi, Diphyllobothrium latum and Capillaria philippinensis are all acquired by eating fish

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS103

## field_notes
scu: FOMSCU Foundation 2 QBank, EOM MID 2026 Q36 — tests Heterophyes heterophyes's transmission by eating undercooked infected fish. Target — apply after docs/Helwan-Source-Imports/concept/HU-GIT-301-parasitology-concepts.md.

---

# Item

## id
CON-GIT-2FCF45AE17574F

## label
Hymenolepis nana can complete its life cycle directly in one host, without an obligate intermediate host, and is capable of autoinfection through its cysticercoid larval stage

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS103

## field_notes
scu: FOMSCU Foundation 2 QBank, EOM MID 2026 Q3 — tests that skin penetration by larva is NOT a valid infection route in Hymenolepis nana's direct cycle (ingestion and autoinfection are). Target — apply after docs/Helwan-Source-Imports/concept/HU-GIT-301-parasitology-concepts.md (same file as the row above).

---

# Item

## id
CON-DEV-B8D22B244F1E15

## label
A single primary spermatocyte gives rise to four spermatids (and ultimately four sperm) after completing meiosis

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS103

## field_notes
scu: FOMSCU Foundation 2 QBank, Formative 2025 Q8 — tests the 1-primary-spermatocyte-to-4-sperm yield ratio (10 primary spermatocytes -> 40 sperm). Already universities:scu / learner_years:1 from this lane's own SCU-FBS102 pass (docs/FOMSCU-Source-Imports/concept/SCU-FBS102-s2-author5-mint-concepts.md, module SCU-FBS102 only) — the +scu/+1 additions here are idempotent no-ops on those two fields; only the SCU-FBS103 module tag is a genuine addition. Target — apply after docs/FOMSCU-Source-Imports/concept/SCU-FBS102-s2-author5-mint-concepts.md.

---

<!--
  BATCH 5 (third author lane, scu-fbs103-author3) — cluster 'fbs103c', the
  19 remaining FBS103 (Foundation 2) triage keys minus the medical-ethics
  item. Covers 6 of the 8 reuse questions in the sibling
  pending-live/SCU-FBS103-s2-author3-reuse-questions.md (the other 2 reuse
  CON-FND-405BB5EA3C359E and CON-FND-9EA7F8E2898EB7, both already overlaid
  +scu in docs/FOMSCU-Source-Imports/pending-live/SCU-FBS102-overlay-concepts.md
  by an earlier FBS102 pass — extended there with a new field_note and the
  +SCU-FBS103 module tag rather than duplicated here). This lane's other 11
  questions mint fresh concepts instead, in
  docs/FOMSCU-Source-Imports/concept/SCU-FBS103-concepts-3.md.

  SIX (6) — pending (exist only in other lanes' own unimported batches;
  checked directly against the live JSON: none of the 6 ids below are in it):

    A. docs/Kasr-Source-Imports/concept/208-INT-concepts.md                       (aflatoxin/Aspergillus)
    B. docs/Ain-Shams-Source-Imports/concept/ASU-INF-microbiology-concepts.md     (exoenzymes/invasion factors)
    C. docs/Ain-Shams-Source-Imports/concept/ASU-INF-microbiology-concepts.md     (heterotrophs, same file as B)
    D. docs/Ain-Shams-Source-Imports/concept/ASU-INF-microbiology-concepts.md     (Gram-negative outer membrane, same file as B)
    E. docs/Kasr-Source-Imports/concept/108-INT-concepts-pharmacology.md          (plasma half-life / first-order kinetics)
    F. docs/Kasr-Source-Imports/concept/108-INT-concepts-pharmacology.md          (pharmacokinetics vs pharmacodynamics scope, same file as E)

  Gate together with:
  node scripts/content/gate.mjs batch docs/FOMSCU-Source-Imports/pending-live/SCU-FBS103-s2-author3-reuse-questions.md \
    --with docs/FOMSCU-Source-Imports/pending-live/SCU-FBS103-overlay-concepts.md \
    --with docs/FOMSCU-Source-Imports/pending-live/SCU-FBS102-overlay-concepts.md \
    --with docs/Kasr-Source-Imports/concept/208-INT-concepts.md \
    --with docs/Ain-Shams-Source-Imports/concept/ASU-INF-microbiology-concepts.md \
    --with docs/Kasr-Source-Imports/concept/108-INT-concepts-pharmacology.md
-->

# Item

## id
CON-FND-D1D48A5564E978

## label
Aflatoxin, a chemical carcinogen from Aspergillus flavus, causes hepatocellular carcinoma

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS103

## field_notes
scu: FOMSCU Foundation 2 QBank, EOM MID 2026 Q20 (also EOY Final 2026 Q20) — tests that aflatoxin is primarily produced by Aspergillus species (fungal source ID among Cryptococcus/Candida/dermatophyte distractors), the same aflatoxin-from-Aspergillus-flavus fact this concept's own label states, from a different angle (source-fungus naming rather than the cancer it causes). Target — apply after docs/Kasr-Source-Imports/concept/208-INT-concepts.md.

---

# Item

## id
CON-INF-1EAFF70A6FC769

## label
Collagenase, hyaluronidase and invasins promote invasion; ordinary pili and flagella do not

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS103

## field_notes
scu: FOMSCU Foundation 2 QBank, EOM MID 2026 Q49 — tests that the tissue-degrading enzymes bacteria produce to spread deeper into host tissue are called exoenzymes (invasion factors), the same invasion-promoting-enzyme fact this concept's own definition names (collagenase, hyaluronidase, invasins), against simpler distractors (capsules, endotoxins, siderophores) rather than the concept's own pili/flagella contrast. Target — apply after docs/Ain-Shams-Source-Imports/concept/ASU-INF-microbiology-concepts.md.

---

# Item

## id
CON-INF-841FAB7F11BA18

## label
Autotrophic bacteria use CO2 as their carbon source, while heterotrophic bacteria — including all pathogens — use organic carbon

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS103

## field_notes
scu: FOMSCU Foundation 2 QBank, EOY Final 2025 Q28 — tests that bacteria requiring preformed organic carbon compounds are called heterotrophs, an exact match for this concept's own definition. Target — apply after docs/Ain-Shams-Source-Imports/concept/ASU-INF-microbiology-concepts.md (same file as the row above).

---

# Item

## id
CON-INF-BF26D7E563FB78

## label
The Gram-negative outer membrane carries toxic lipid A and porins that admit only small solutes, not amino acids

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS103

## field_notes
scu: FOMSCU Foundation 2 QBank, EOY Final 2025 Q2 — tests that the outer membrane is the structure characteristically present in Gram-negative but absent in Gram-positive cell walls, the same fact this concept's own definition states explicitly ("the outer membrane occurs only in Gram-negative bacteria, not in Gram-positive ones"). Found via find-existing.mjs "gram-negative outer membrane" — a direct hit. Target — apply after docs/Ain-Shams-Source-Imports/concept/ASU-INF-microbiology-concepts.md (same file as the two rows above).

---

# Item

## id
CON-FND-955AD7B6FE6F03

## label
Plasma half-life is the time taken for the plasma concentration to fall by half, and it is fixed only in first-order elimination

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS103

## field_notes
scu: FOMSCU Foundation 2 QBank, EOY Final 2025 Q11 — tests that ampicillin's first-order elimination kinetics means its elimination half-life is constant, the same fixed-half-life-in-first-order fact this concept's own definition states. Target — apply after docs/Kasr-Source-Imports/concept/108-INT-concepts-pharmacology.md.

---

# Item

## id
CON-FND-6BB35F11EBD54B

## label
Pharmacokinetics is what the body does to the drug; pharmacodynamics is what the drug does to the body

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS103

## field_notes
scu: FOMSCU Foundation 2 QBank, EOY Final 2025 Q22 — tests that pharmacokinetics is correctly represented as the study of absorption, distribution, metabolism and excretion of drugs, the same ADME-scope fact this concept's own definition states, against pharmacodynamics-flavoured distractors (biological/therapeutic effects, mechanisms of action) and an unrelated one (methods of new drug development). Target — apply after docs/Kasr-Source-Imports/concept/108-INT-concepts-pharmacology.md (same file as the row above).
