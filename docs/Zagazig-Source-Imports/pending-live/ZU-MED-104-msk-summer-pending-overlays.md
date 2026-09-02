<!--
  ZU-MED-104 (Musculoskeletal & Integumentary) — 10 sparse PENDING-LIVE
  concept overlays for the msk-summer-sba cluster (`Fakous MSK Summer
  2024.pdf`, Zagazig's Fakous campus resit paper — provenance ruled usable,
  LANE-CARD.md §7).

  Every ## id below targets a concept that exists ONLY in another lane's
  unimported batch (all under `docs/import-ready/concept/…` or a sibling
  lane's own `-Source-Imports/concept/…` path, or the Ain-Shams lane's own
  tree) — none is in server/data/medical-library-v1.json today (checked
  directly against the live JSON, 0 hits for every id below). Apply this
  file ONLY after the named source file is live.

  `## label` restates the target's own current label verbatim (required
  discriminator). `## universities`/`## modules` are true ID-list columns —
  `+zu`/`+ZU-MED-104`, safe appends. `## module_subject` is a
  full-replacement path list (00-START-HERE.md §3) — every row restates the
  target's existing path plus ZU's own new line, **ZU's own line listed
  first** (same reasoning the sibling Final cluster's own pending-overlays
  file documents). This lane's own `## universities` stays sparse (`zu`
  only) on every row, never restating the source lane's own university code.
-->

# Item

## id
CON-MSK-ASU-AE-TOE-ADDUCTION-AXIS

## label
Toe abduction and adduction are measured from the second toe, the long axis of the foot -- not the middle toe, as in the hand

## universities
+zu

## modules
+ZU-MED-104

## module_subject
ZU-MED-104 > Musculoskeletal & Integumentary > Foot terms of movement
ASU-AE > Anatomy > Terminology

## field_notes
zu: Fakous MSK Summer 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q2, "The axis of foot is a line passes through which of the following toes?" (answer: 2nd, circled, confirmed by render --force). Direct match — the target concept's own definition states exactly that toe abduction/adduction (and, by the same reference line, the axis of the foot) is measured from the second toe, contrasted explicitly with the hand's own middle-finger axis. Found by `find-existing.mjs "second toe"` after "axis of foot" (a shorter but still non-literal phrase) returned no hit — a further instance of this lane's own confirmed find-existing.mjs quirk that a differently-worded short query can succeed where another short query misses. (docs/Ain-Shams-Source-Imports/concept/ASU-AE-youssef-terminology-new-concepts.md)

---

# Item

## id
CON-MSK-0415214C935D2D

## label
The anterior tibial artery becomes the dorsalis pedis artery in front of the ankle midway between the malleoli and ends by diving into the sole to complete the deep plantar arch, while the posterior tibial artery — the tibial nerve's arterial companion — gives the peroneal artery (the leg's main supply and the fibula's nutrient artery) and terminates behind the medial malleolus by dividing into the medial and lateral plantar arteries

## universities
+zu

## modules
+ZU-MED-104

## module_subject
ZU-MED-104 > Musculoskeletal & Integumentary > Leg arteries
AU-MED-105 > Anatomy > Leg > Arteries

## field_notes
zu: Fakous MSK Summer 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q3, "An elder suffers from vaso-occlusive disorder that affects blood supply of posterior compartment of his leg. Would you expect the doctor must test which of the following arteries?" (answer: peroneal, circled, confirmed by render --force). Direct match — the target concept's own definition names the peroneal artery as the leg's main arterial supply, arising from the posterior tibial artery which serves the posterior compartment, exactly the vessel this question tests. Found by `find-existing.mjs "peroneal artery"`. (docs/Alexandria-Source-Imports/concept/AU-MED-105-anatomy-concepts.md)

---

# Item

## id
CON-MSK-231FAF0D3F1A84

## label
Popliteus unlocks the fully extended, screw-home-locked knee by laterally rotating the femur on the fixed tibia (or medially rotating the tibia on the fixed femur), which must happen before the hamstrings can flex the knee at all

## universities
+zu

## modules
+ZU-MED-104

## module_subject
ZU-MED-104 > Musculoskeletal & Integumentary > Knee joint
AU-MED-105 > Anatomy > Lower Limb > Knee

## field_notes
zu: Fakous MSK Summer 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q4, "A 22-year-old patient is unable to unlock the knee joint to allow flexion of the leg which of the following muscle is most likely to be damaged?" (answer: popliteus, circled, confirmed by render --force). Direct match — the target concept's own definition states popliteus unlocks the extended knee and that this must happen before the hamstrings can flex it at all, exactly the mechanism this question tests. Found by `find-existing.mjs "popliteus"`. (docs/Alexandria-Source-Imports/concept/AU-MED-105-anatomy-concepts.md)

---

# Item

## id
CON-MSK-3EE23956EE2DDB

## label
The three hamstring muscles all arise from the ischial tuberosity, except the short head of biceps, and all flex the knee and extend the hip

## universities
+zu

## modules
+ZU-MED-104

## module_subject
ZU-MED-104 > Musculoskeletal & Integumentary > Thigh
103 BMS > Anatomy > Lower Limb > Thigh

## field_notes
zu: Fakous MSK Summer 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q5, "A fracture to ischial tuberosity would affect which of the following movements of lower limb?" (answer: flexion of knee, circled, confirmed by render --force). Direct match — the target concept's own definition states the hamstrings, which flex the knee and extend the hip, arise from the ischial tuberosity, exactly the origin-to-action fact this question tests. Found by `find-existing.mjs "ischial tuberosity"`. (docs/Kasr-Source-Imports/concept/103-BMS-anatomy-concepts.md)

---

# Item

## id
CON-MSK-F125616F7ED37A

## label
The musculocutaneous nerve leaves the lateral cord, pierces coracobrachialis, and ends as a skin nerve

## universities
+zu

## modules
+ZU-MED-104

## module_subject
ZU-MED-104 > Musculoskeletal & Integumentary > Brachial plexus
101 ISK > Anatomy > Upper Limb > Brachial Plexus

## field_notes
zu: Fakous MSK Summer 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q7, "Which part of brachial plexus supplies the skin of lateral side of the forearm?" (answer: lateral cord, circled, confirmed by render --force). Direct match — the target concept's own definition states the musculocutaneous nerve leaves the lateral cord and ends as a skin nerve (the lateral cutaneous nerve of the forearm), exactly the cord-to-skin-territory fact this question tests. Found by `find-existing.mjs "lateral cord"`. (docs/import-ready/concept/101-ISK-concepts.md)

---

# Item

## id
CON-MSK-66A2E56C00F3A7

## label
The cephalic vein starts laterally and ends in the axillary vein; the basilic starts medially and helps form it

## universities
+zu

## modules
+ZU-MED-104

## module_subject
ZU-MED-104 > Musculoskeletal & Integumentary > Upper limb veins
101 ISK > Anatomy > Upper Limb > Veins

## field_notes
zu: Fakous MSK Summer 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q15, "Which of the following veins is draining into the axillary vein?" (answer: cephalic, margin "b" note, confirmed by render --force). Direct match — the target concept's own definition states the cephalic vein ends in (drains into) the axillary vein, while the basilic vein instead continues as it, exactly the drains-into distinction this question tests. Found by `find-existing.mjs "cephalic vein"`. (docs/import-ready/concept/101-ISK-mcq-concepts.md)

---

# Item

## id
CON-MSK-AB5318A9255811

## label
A fracture of the neck of the fibula injures the common peroneal nerve, because the nerve is wrapped around that neck

## universities
+zu

## modules
+ZU-MED-104

## module_subject
ZU-MED-104 > Musculoskeletal & Integumentary > Common peroneal nerve
103 BMS > Anatomy > Lower Limb > Popliteal Fossa

## field_notes
zu: Fakous MSK Summer 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q16, "A 16-year-old boy comes to local hospital after motorcycle accident which injures the neck of fibula with the nerve around the neck. Which of the following conditions may occur secondary to this injury?" (answer: loss of sensation on medial side of big toe, circled, confirmed by render --force). Partial match — the target concept's own definition states the injury mechanism (fibular neck fracture injures the common peroneal nerve wrapped around it) that this question's stem restates directly; the specific sensory-loss detail (medial side of big toe, deep peroneal/first-web-space territory) is this question's own explanation content, not written into the shared concept body. Found by `find-existing.mjs "common peroneal nerve"`. (docs/import-ready/concept/103-BMS-anatomy-concepts.md)

---

# Item

## id
CON-MSK-6614EA58CFAF9C

## label
The obturator nerve arises from the lumbar plexus (L2-4), passes through the obturator canal, and divides into anterior and posterior divisions supplying the medial compartment of the thigh

## universities
+zu

## modules
+ZU-MED-104

## module_subject
ZU-MED-104 > Musculoskeletal & Integumentary > Thigh nerve supply
103 BMS > Anatomy > Lower Limb > Nerve Supply

## field_notes
zu: Fakous MSK Summer 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q17, "A 35-year-old patient with large schwannoma that compresses the anterior division of ventral rami of L2,3,4. Which of the following group of lower limb muscles is severely affected?" (answer: medial, margin "a" note, confirmed by render --force and cross-checked against anatomy — anterior division of L2-4 ventral rami is the obturator nerve, supplying the medial thigh compartment). Direct match — the target concept's own definition states exactly this origin/division/territory fact. Found by `find-existing.mjs "obturator nerve"`. (docs/import-ready/concept/103-BMS-anatomy-concepts.md)

---

# Item

## id
CON-MSK-EBA37D8401180C

## label
The secondary ossification centre in the epiphysis leaves an epiphyseal plate of six zones and articular cartilage as the only cartilage not replaced by bone

## universities
+zu

## modules
+ZU-MED-104

## module_subject
ZU-MED-104 > Musculoskeletal & Integumentary > Bone histology
103 BMS > Histology > Bone > Ossification

## field_notes
zu: Fakous MSK Summer 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q25, "What type of cartilage is present in the epiphyseal plates?" (answer: hyaline cartilage, circled, confirmed by render --force). Direct match — the target concept's own definition names the epiphyseal plate's first zone as "a zone of resting hyaline cartilage", exactly the cartilage-type fact this question tests. Found by `find-existing.mjs "epiphyseal plate"`. (docs/import-ready/concept/103-BMS-histology-concepts.md)

---

# Item

## id
CON-MSK-3013AA61E917B7

## label
Excitation–contraction coupling relays a T-tubule depolarisation into calcium release, calcium onto troponin C, and tropomyosin off the actin site

## universities
+zu

## modules
+ZU-MED-104

## module_subject
ZU-MED-104 > Musculoskeletal & Integumentary > Skeletal muscle contraction
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > Excitation-Contraction Coupling

## field_notes
zu: Fakous MSK Summer 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q30, "Regarding the skeletal muscle, which of the following is an appropriate feature of muscle contraction?" (answer: it occurs when calcium is released from the sarcotubular system, circled, confirmed by render --force). Direct match — the target concept's own definition states exactly this calcium-release-triggers-contraction mechanism. Found by `find-existing.mjs "excitation-contraction coupling"`. (docs/import-ready/concept/103-BMS-mcq-vitamins-nerve-concepts.md)
