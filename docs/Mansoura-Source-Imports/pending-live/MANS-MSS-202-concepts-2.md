<!--
  Sparse updates only, sibling to MANS-MSS-202-concepts.md (lane 1's overlay file,
  left untouched). Every `## id` below targets a concept that exists ONLY in an
  unimported Kasr Year 1 or Alexandria Year 1 batch -- confirmed directly against
  server/data/medical-library-v1.json (grepped 2026-09-02, zero hits for any id
  below). Apply each record ONLY after its target file (named per row) is live.

  `## label` and `## canonical_key` are written on every row (a filled label makes
  the batch validator's stub-create check treat the row as a full authoring attempt
  rather than an update, and an update row silent on `## label` blanks the live
  concept's real label on merge).

  `## module_subject` is DELIBERATELY OMITTED from every row here, per lane 1's own
  verified finding (MANS-MSS-202-concepts.md's pending-live header): module_subject
  validates against the fields THIS ROW declares, not the merge target's, so both
  restating the original line and restating only the new line either fail or erase
  the live record's placement on merge. Omitting it leaves the live record's
  existing module_subject untouched -- the field_notes below say which pages test
  each concept in its place.

  `## universities`, `## modules` and `## learner_years` are append-safe list
  columns (optionalList/importList): `+mans`, `+MANS-MSS-202`, `+1` add without
  disturbing the existing kau/au tags, modules or learner years.

  One live concept (CON-MSK-BD54A250111D42, the skeletal triad -- T-tubule between
  two terminal SR cisternae, confirmed live in server/data/medical-library-v1.json)
  is reused directly in the question overlay with NO row here, same precedent as
  lane 1's glenoid-labrum reuse: a live target needs no overlay.

  Lane MANS-MSS-202-author2. Gate is `medical:batch` with every target file named
  via --with -- run once without --with (expect the "does not exist" refusal) and
  once with (expect a clean pass); these `## id`s are not live, so `medical:simulate`
  cannot resolve them yet and is not the gate here:

  node scripts/validate-content-batch.mjs "docs/Mansoura-Source-Imports/pending-live/MANS-MSS-202-concepts-2.md" \
    --with docs/Alexandria-Source-Imports/concept/AU-MED-105-anatomy-concepts.md \
    --with docs/Kasr-Source-Imports/concept/103-BMS-anatomy-concepts.md \
    --with docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md \
    --with docs/Kasr-Source-Imports/concept/101-ISK-concepts.md \
    --with docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md \
    --with docs/Kasr-Source-Imports/concept/103-BMS-mcq-vitamins-nerve-concepts.md \
    --with docs/Kasr-Source-Imports/concept/104-CPS-physiology-concepts.md
-->

# Item

## id
CON-MSK-C5E778D9F8E701

## canonical_key
thigh.hamstring-muscles-nerve-supply-sciatic-sparing

## label
The hamstrings — semitendinosus, semimembranosus and biceps femoris — extend the hip and flex the knee, and are supplied by the tibial division of the sciatic nerve except the short head of biceps femoris, which is supplied by the common peroneal division and so survives a tibial-division-only injury

## universities
+mans

## modules
+MANS-MSS-202

## learner_years
+1

## field_notes
universityNotes: mans: MSS Past Years.pdf p.7 tests "which muscle on the medial thigh can extend the hip joint" (keyed D, adductor magnus) — the hamstring (ischial) part of adductor magnus is what this concept's own definition credits with hip extension, authored against that clause.
sourceFile: docs/Alexandria-Source-Imports/concept/AU-MED-105-anatomy-concepts.md

---

# Item

## id
CON-MSK-AB5318A9255811

## canonical_key
fibula.neck-fracture.common-peroneal-injury

## label
A fracture of the neck of the fibula injures the common peroneal nerve, because the nerve is wrapped around that neck

## universities
+mans

## modules
+MANS-MSS-202

## learner_years
+1

## field_notes
universityNotes: mans: MSS Past Years.pdf p.7 tests "which nerve can be injured if neck of fibula was fractured" (keyed E, common peroneal), authored directly against this concept.
sourceFile: docs/Kasr-Source-Imports/concept/103-BMS-anatomy-concepts.md

---

# Item

## id
CON-MSK-66A2E56C00F3A7

## canonical_key
upper-limb-superficial-veins-origin-course-termination

## label
The cephalic vein starts laterally and ends in the axillary vein; the basilic starts medially and helps form it

## universities
+mans

## modules
+MANS-MSS-202

## learner_years
+1

## field_notes
universityNotes: mans: MSS Past Years.pdf p.8 tests "the cephalic vein drains its venous blood into..." (keyed D, the axillary vein), authored directly against this concept.
universityNotes: mans: lane 3 also authors p.29's "the cephalic vein: arises in the region of the anatomical snuffbox" (keyed A), against the same concept.
sourceFile: docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md

---

# Item

## id
CON-MSK-712EBE5936F7E4

## canonical_key
radial-nerve-injury-spiral-groove-wrist-drop

## label
A fracture of the humeral shaft catches the radial nerve in the spiral groove and drops the wrist

## universities
+mans

## modules
+MANS-MSS-202

## learner_years
+1

## field_notes
universityNotes: mans: MSS Past Years.pdf p.9 tests "fracture of the mid shaft of the humerus usually causes the following deformity" (keyed C, wrist drop), authored directly against this concept.
universityNotes: mans: lane 3 also authors p.39's horse-riding vignette (elbow drop, wrist drop, finger drop, keyed B, radial nerve), against the same concept.
sourceFile: docs/Kasr-Source-Imports/concept/101-ISK-concepts.md

---

# Item

## id
CON-MSK-BC95DAE3531583

## canonical_key
palmar-arterial-arches-site-formation-branches

## label
The deep palmar arch is the radial artery’s termination, lying a finger’s breadth proximal to the superficial arch

## universities
+mans

## modules
+MANS-MSS-202

## learner_years
+1

## field_notes
universityNotes: mans: MSS Past Years.pdf p.9 tests "the superficial palmar arch is made mainly by" (keyed A, the ulnar artery), authored against this concept's superficial-arch clause.
sourceFile: docs/Kasr-Source-Imports/concept/101-ISK-concepts.md

---

# Item

## id
CON-MSK-1424177E093253

## canonical_key
anatomical-snuff-box-site-boundaries-contents

## label
The anatomical snuff box is bounded by three tendons, floored by the scaphoid, and crossed by the radial artery

## universities
+mans

## modules
+MANS-MSS-202

## learner_years
+1

## field_notes
universityNotes: mans: MSS Past Years.pdf tests this concept twice — p.9's distal-radius-plus-scaphoid-fracture vignette (keyed B, radial artery, the neurovascular structure to worry about) and p.16's "destructive injury of the structures related to the anatomic snuffbox" (keyed E, radial artery) — both authored against this concept's radial-artery-contents clause.
sourceFile: docs/Kasr-Source-Imports/concept/101-ISK-concepts.md

---

# Item

## id
CON-MSK-B88F413E4536F9

## canonical_key
upper-limb-joint-movements-follow-from-type

## label
The movements possible at an upper limb joint follow from its type and the number of its axes

## universities
+mans

## modules
+MANS-MSS-202

## learner_years
+1

## field_notes
universityNotes: mans: MSS Past Years.pdf p.10 tests "the type of elbow joint is" (keyed D, synovial hinge), authored against this concept's hinge-joint clause.
sourceFile: docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md

---

# Item

## id
CON-NEU-273E2C22C11A97

## canonical_key
nmt.junction.physiologic-anatomy

## label
Each skeletal muscle fibre receives one axon terminal at a motor end plate, separated from it by a synaptic cleft rich in acetylcholinesterase

## universities
+mans

## modules
+MANS-MSS-202

## learner_years
+1

## field_notes
universityNotes: mans: Most important MCQ (continuous).pdf p.7 tests "junctional folds of NMJ" (keyed B, present at the motor end plate) — junctional folds is this concept's own alias — authored directly against it.
sourceFile: docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md

---

# Item

## id
CON-MSK-C14F65CD68F720

## canonical_key
muscle.grading.motor-unit-recruitment-frequency-treppe

## label
The whole muscle's contraction is graded by recruiting more motor units and by raising stimulation frequency toward tetanus, and Treppe raises twitch tension over the first few stimuli of a rested muscle

## universities
+mans

## modules
+MANS-MSS-202

## learner_years
+1

## field_notes
universityNotes: mans: Most important MCQ (continuous).pdf p.7 tests "the motor unit consists of" (keyed C, single nerve fiber and muscle fibers supplied by it) — this concept's own definition opens with that exact definition — authored directly against it.
sourceFile: docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md

---

# Item

## id
CON-NEU-64B329335E9489

## canonical_key
nmt.properties.delay-fatigue-ions-drugs

## label
Neuromuscular transmission is one-directional, carries a fixed synaptic delay, fatigues with repeated use, and is shaped by Ca2+/Mg2+ and by three classes of drug

## universities
+mans

## modules
+MANS-MSS-202

## learner_years
+1

## field_notes
universityNotes: mans: Most important MCQ (continuous).pdf tests this concept three times — p.8's "synaptic delay is caused by" (keyed D, ACh diffusion across the cleft), p.9's "causes synaptic fatigue of neuromuscular transmission" (keyed A, depletion of acetylcholine), and p.13's "synaptic delay at the NMJ is approximately" (keyed B, 0.5 msec) — all three are stated properties of this one concept, authored against it rather than minted separately.
sourceFile: docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md

---

# Item

## id
CON-MSK-77D955AAB4D0FA

## canonical_key
muscle.neuromuscular-transmission.sequence

## label
Neuromuscular transmission runs presynaptic calcium, acetylcholine exocytosis, a cation channel on the end plate, the end-plate potential, then hydrolysis by acetylcholinesterase

## universities
+mans

## modules
+MANS-MSS-202

## learner_years
+1

## field_notes
universityNotes: mans: Most important MCQ (continuous).pdf tests this concept twice — p.9's "at the nerve terminal which channel mediates Ca influx" (keyed D, voltage gated ion channel) and p.9's "present in the motor end plate" (keyed C, cholinesterase enzyme that breaks down acetylcholine) — both are steps of this concept's own stated sequence, authored against it.
sourceFile: docs/Kasr-Source-Imports/concept/103-BMS-mcq-vitamins-nerve-concepts.md

---

# Item

## id
CON-NEU-B1F2748F1E9357

## canonical_key
nmt.miniature-end-plate-potential.spontaneous

## label
A miniature end-plate potential is the small, spontaneous depolarisation produced when a single acetylcholine vesicle ruptures at rest

## universities
+mans

## modules
+MANS-MSS-202

## learner_years
+1

## field_notes
universityNotes: mans: Most important MCQ (continuous).pdf p.14 tests "miniature end plate potentials (MEPPs) are caused by" (keyed B, release of a single quantum of acetylcholine), authored directly against this concept.
sourceFile: docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md

---

# Item

## id
CON-MSK-3013AA61E917B7

## canonical_key
muscle.excitation-contraction-coupling.calcium-troponin

## label
Excitation–contraction coupling relays a T-tubule depolarisation into calcium release, calcium onto troponin C, and tropomyosin off the actin site

## universities
+mans

## modules
+MANS-MSS-202

## learner_years
+1

## field_notes
universityNotes: mans: Most important MCQ (continuous).pdf tests this concept three times — p.15's "role of Ca++ ions in excitation contraction coupling" (keyed A, binding to troponin moves tropomyosin off actin), p.19's EXCEPT item on which event is NOT part of skeletal EC coupling (keyed B, binding Ca2+ to calmodulin — the smooth-muscle mechanism, not this one), and p.19's "a single contraction is most likely terminated by" (keyed D, removal of sarcoplasmic Ca2+, this concept's own relaxation clause) — all three authored against this one concept.
sourceFile: docs/Kasr-Source-Imports/concept/103-BMS-mcq-vitamins-nerve-concepts.md

---

# Item

## id
CON-MSK-CF9EFE4EA3C90B

## canonical_key
smooth-muscle.excitation-contraction-coupling.calmodulin-mlck

## label
Smooth muscle contraction is triggered by calcium binding calmodulin to activate myosin light-chain kinase, and cross-bridges that stay attached without cycling — latch bridges — hold tone cheaply

## universities
+mans

## modules
+MANS-MSS-202

## learner_years
+1

## field_notes
universityNotes: mans: Most important MCQ (continuous).pdf p.20 tests "depolarization in smooth muscles is mainly due to" (keyed C, Ca++ inflow) — this concept's own definition opens with depolarisation opening voltage-gated Ca2+ channels in smooth muscle — authored directly against it.
sourceFile: docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md

---

# Item

## id
CON-MSK-6087C9C091ED85

## canonical_key
muscle.rigor-mortis.mechanism-and-medicolegal

## label
Rigor mortis is the total, permanent contracture of every muscle after death from loss of the ATP needed to separate actin and myosin, and it is used to help estimate time of death

## universities
+mans

## modules
+MANS-MSS-202

## learner_years
+1

## field_notes
universityNotes: mans: Most important MCQ (continuous).pdf p.22 tests "rigor mortis is due to" (keyed A, failure of detachment between actin and myosin), authored directly against this concept.
sourceFile: docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md

---

# Item

## id
CON-CVS-5288011D93888B

## canonical_key
cardiac-myocyte-action-potential.refractory-periods.arp-rrp-supernormal

## label
The absolute and relative refractory periods of the cardiac myocyte action potential span almost the whole of contraction, which prevents the sustained tetanic contractions seen in skeletal muscle

## universities
+mans

## modules
+MANS-MSS-202

## learner_years
+1

## field_notes
universityNotes: mans: Most important MCQ (continuous).pdf p.23 tests "which of the following statements about the refractory period is correct" (keyed B, cardiac muscle has a long refractory period that prevents tetanus), authored directly against this concept's own functional-significance clause.
sourceFile: docs/Kasr-Source-Imports/concept/104-CPS-physiology-concepts.md
