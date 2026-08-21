<!--
  103 BMS · the 29 atomic claims the module's concepts name.

  One kind, one file: every record here is a claim. The citations that support
  them are the sibling file ./103-BMS-citations.md — do not merge the two, the
  validator reads the first record and judges the whole file against it.

  WHERE THE IDs COME FROM. Not one ID in this file was minted here. Every
  `id` is already named in an `atomic_claim_ids` list in one of the three
  concept batches, and every `concept_id` is the concept that names it:

    ../concept/103-BMS-anatomy-concepts.md     11 claims, CON-MSK-*
    ../concept/103-BMS-histology-concepts.md   10 claims, CON-DER-* and CON-MSK-*
    ../concept/103-BMS-physiology-concepts.md   8 claims, CON-NEU-* and CON-MSK-*

  A claim whose ID does not match breaks the concept pointing at it, so the
  set is closed: 29 in, 29 out, none renamed, none added.

  THE THREE BOOKS. Each subject has exactly one source, already an evidence
  record in ./103-BMS-sources.md:

    Anatomy      src_23c95ac89b6b113bd58e  Dpt book Anatomy Lower Limb 103.pdf              119 pp
    Histology    src_2bf25a6864c9f6ce3283  Dpt book Final Book of Histology (BMS 103) 2026   48 pp
    Physiology   src_59643edb9d371bcefa2c  Dpt Book Physiology 103.pdf                       51 pp

  All 29 are quotable from those books. None is `needs_evidence` for want of a
  span; every one carries a citation with an exact page locator.

  VERIFICATION STATUS. All 29 are `needs_evidence`, matching the
  `publication_status: needs_evidence` on the concepts that name them. A
  citation exists for each, but no human has reviewed the chain, and review is
  what promotes a claim to `verified`. Nothing here should auto-publish.

  RISK CLASS. All 29 are `foundational_stable`. These are anatomy, histology
  and physiology facts — structure, cell, mechanism. Nothing in the set names a
  treatment, a dose or an emergency action, so nothing is
  `treatment_or_action`. The three clinical claims that come closest
  (CLM-MSK-CPN-INJURY-01, CLM-MSK-CPN-MOTOR-01, CLM-MSK-CPN-DEFORMITY-01) state
  what a nerve lesion causes, not what to do about it, and the book states them
  in exactly that register.

  Import order: sources → concepts → claims → citations. This file lands after
  the concept batches and before the citation batch.
-->

# Item

## id
CLM-MSK-ADDUCTOR-CANAL-01

## concept_id
CON-MSK-59755B64721E3D

## subject
The adductor canal

## predicate
has

## object
Three walls — an antero-medial fibrous roof, a posterior wall of adductor longus above and adductor magnus below, and an antero-lateral wall of vastus medialis

## display_text
The adductor canal is triangular in cross section: its antero-medial wall is a fibrous roof between vastus medialis and adductor magnus covered by sartorius, its posterior wall or floor is adductor longus above and adductor magnus below, and its antero-lateral wall is vastus medialis.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
region: medial aspect of the middle third of the thigh
laterality: bilateral, described unilaterally
scope: undergraduate lower-limb anatomy

---

# Item

## id
CLM-MSK-ADDUCTOR-CANAL-02

## concept_id
CON-MSK-59755B64721E3D

## subject
The adductor canal

## predicate
contains

## object
The femoral artery, the femoral vein, the saphenous nerve and the nerve to vastus medialis

## display_text
The adductor canal carries four structures: the femoral artery, the femoral vein, the saphenous nerve and the nerve to vastus medialis.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
count: four contents
laterality: bilateral, described unilaterally
scope: undergraduate lower-limb anatomy

---

# Item

## id
CLM-MSK-PERONEUS-LONGUS-01

## concept_id
CON-MSK-32B5B7A5CD2A27

## subject
Peroneus longus

## predicate
everts and plantar-flexes

## object
The foot — eversion at the subtalar joint and plantar-flexion at the ankle joint — under the supply of the musculo-cutaneous (superficial peroneal) nerve

## display_text
Peroneus longus everts the foot at the subtalar joint and plantar-flexes it at the ankle joint, and it is supplied by the musculo-cutaneous (superficial peroneal) nerve.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
compartment: lateral (peroneal) compartment of the leg
joints: subtalar for eversion, ankle for plantar-flexion
scope: undergraduate lower-limb anatomy

---

# Item

## id
CLM-MSK-HIP-MOVEMENTS-01

## concept_id
CON-MSK-D30F43945FC3C2

## subject
Lateral rotation of the thigh at the hip joint

## predicate
is produced by

## object
The six small lateral rotators — obturator internus and externus, the two gemelli, quadratus femoris and piriformis — assisted by gluteus maximus and sartorius

## display_text
Lateral rotation at the hip is the work of the small lateral rotators of the thigh — obturator internus and externus, the two gemelli, quadratus femoris and piriformis — assisted by gluteus maximus and sartorius.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
count: six prime movers, two assistants
movement: lateral rotation only; the other six hip movements have their own prime movers
scope: undergraduate lower-limb anatomy

---

# Item

## id
CLM-MSK-POST-TIBIAL-BRANCHES-01

## concept_id
CON-MSK-0696B3F764DABC

## subject
The peroneal artery

## predicate
is

## object
The largest branch of the posterior tibial artery and the main supply of the leg

## display_text
Of the branches of the posterior tibial artery, the peroneal artery is the largest and is the main supply of the leg.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
parent: posterior tibial artery
position_in_list: second of the seven branches as the book enumerates them
scope: undergraduate lower-limb anatomy

---

# Item

## id
CLM-MSK-SCIATIC-COURSE-01

## concept_id
CON-MSK-D622CBF981F879

## subject
The sciatic nerve

## predicate
leaves the pelvis and ends

## object
Through the greater sciatic foramen below piriformis, and a little below the middle of the thigh by dividing into the common peroneal and tibial nerves

## display_text
The sciatic nerve leaves the pelvis through the greater sciatic foramen below piriformis to enter the gluteal region, and ends a little below the middle of the thigh by dividing into its two terminal branches, the common peroneal and the tibial nerve.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
roots: L4, L5, S1, S2, S3
landmark: enters the back of the thigh midway between the greater trochanter and the ischial tuberosity
scope: undergraduate lower-limb anatomy

---

# Item

## id
CLM-MSK-SCIATIC-BRANCHES-01

## concept_id
CON-MSK-51EC648BDAF36B

## subject
The sciatic nerve

## predicate
gives

## object
Two terminal divisions (tibial, the larger, and common peroneal, the smaller), muscular branches split between its tibial and common peroneal parts, and articular branches to the hip joint

## display_text
The sciatic nerve gives the tibial nerve as the larger of its two terminal divisions and the common peroneal nerve as the smaller, muscular branches divided between its tibial and common peroneal parts, and articular branches to the hip joint.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
muscular_split: tibial part to long head of biceps femoris, semitendinosus, semimembranosus and ischial part of adductor magnus; common peroneal part to short head of biceps femoris alone
joint: hip, not knee — the knee's articular branches come from the terminal divisions
scope: undergraduate lower-limb anatomy

---

# Item

## id
CLM-MSK-CPN-INJURY-01

## concept_id
CON-MSK-AB5318A9255811

## subject
Fracture of the head or neck of the fibula, or pressure from a cast or splint at that point

## predicate
causes

## object
Injury of the common peroneal nerve, which lies against the lateral aspect of the neck of the fibula

## display_text
The common peroneal nerve curves behind the head of the fibula and then lies close to the lateral aspect of its neck, which is why a fracture of the head or neck of the fibula, or pressure from a cast or splint there, is the classic cause of its injury.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
mechanism: the nerve is superficial against bone at the fibular neck
polarity: positive — this is a cause, not an exclusion
scope: undergraduate lower-limb anatomy, clinical point as the department book states it

---

# Item

## id
CLM-MSK-CPN-MOTOR-01

## concept_id
CON-MSK-C7BC26EBAF066B

## subject
Injury of the common peroneal nerve

## predicate
abolishes

## object
Dorsiflexion, giving foot drop through paralysis of the extensors of the front of the leg, and eversion, through paralysis of the three peroneal muscles

## display_text
A common peroneal nerve lesion denervates both the anterior and the lateral compartment of the leg at once: dorsiflexion is lost, giving foot drop, and eversion is lost with it.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
compartments: anterior (deep peroneal) and lateral (superficial peroneal)
count: three peroneal muscles lost for eversion
scope: undergraduate lower-limb anatomy, clinical point as the department book states it

---

# Item

## id
CLM-MSK-CPN-CUTANEOUS-01

## concept_id
CON-MSK-0351AAD4CAB1EE

## subject
The common peroneal nerve in the popliteal fossa

## predicate
gives

## object
Two cutaneous branches — the sural communicating nerve and the lateral cutaneous nerve of the calf

## display_text
While still in the popliteal fossa the common peroneal nerve gives two cutaneous branches: the sural communicating nerve, which joins the sural nerve, and the lateral cutaneous nerve of the calf, which supplies the upper third of the anterolateral side of the leg.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
site: popliteal fossa only — the front of the lower leg and dorsum of foot are reached later, through the terminal branches
count: two cutaneous branches
scope: undergraduate lower-limb anatomy

---

# Item

## id
CLM-MSK-CPN-DEFORMITY-01

## concept_id
CON-MSK-016DE81C5919CE

## subject
The deformity of common peroneal nerve injury

## predicate
is

## object
Talipes equinovarus — foot drop with loss of eversion — against talipes calcaneo-valgus, which follows tibial nerve injury

## display_text
Common peroneal nerve injury produces foot drop with loss of eversion, a deformity called talipes equinovarus; tibial nerve injury produces the mirror image, dorsiflexion and eversion of the foot, called talipes calcaneo-valgus.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.9

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
contrast: the tibial-nerve half of this claim is on the facing page of the same book
polarity: positive for common peroneal, mirrored for tibial
scope: undergraduate lower-limb anatomy, clinical point as the department book states it

---

# Item

## id
CLM-DER-DERMIS-LAYERS-01

## concept_id
CON-DER-56784AB396C13E

## subject
The papillary layer of the dermis

## predicate
is

## object
The thinner superficial layer, of loose connective tissue, more cellular, carrying fine type III collagen and elastic fibres, more vascular, and containing Meissner's corpuscles

## display_text
The papillary layer is the thinner superficial layer of the dermis: it forms the dermal papillae, is loose connective tissue, is more cellular, carries fine type III collagen and elastic fibres, is more vascular because it nourishes the epidermis, and contains Meissner's corpuscles.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
contrast: stated against the reticular layer in the same two-column table
vascularity: more vascular, and the book gives the reason — the epidermis is avascular
scope: undergraduate histology of skin

---

# Item

## id
CLM-DER-DERMIS-LAYERS-02

## concept_id
CON-DER-56784AB396C13E

## subject
The reticular layer of the dermis

## predicate
is

## object
The thicker deep layer, of dense connective tissue, less cellular, carrying type I collagen in bundles with elastic fibres, less vascular, and containing Pacinian corpuscles, Ruffini's end organs and Krause's end bulbs

## display_text
The reticular layer is the thicker deep layer of the dermis: it is dense connective tissue, is less cellular, carries type I collagen in bundles with elastic fibres, is less vascular, and contains Pacinian corpuscles, Ruffini's end organ and Krause's end bulb.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
contrast: stated against the papillary layer in the same two-column table
receptors: Pacinian, Ruffini and Krause — Meissner's belongs to the papillary layer
scope: undergraduate histology of skin

---

# Item

## id
CLM-MSK-OSTEOBLAST-01

## concept_id
CON-MSK-D137ADEEC56243

## subject
The osteoblast

## predicate
arises from and lines

## object
Osteogenic cells, and lies immediately under the periosteum as a continuous single layer covering the bone surface, and under the endosteum

## display_text
The osteoblast arises from osteogenic cells and lies immediately under the periosteum as a continuous single layer covering the bone surface, and under the endosteum.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
arrangement: a continuous single layer, not scattered cells
sites: sub-periosteal and sub-endosteal
scope: undergraduate histology of bone

---

# Item

## id
CLM-MSK-OSTEOBLAST-02

## concept_id
CON-MSK-D137ADEEC56243

## subject
The osteoblast on electron microscopy

## predicate
shows

## object
The characters of a protein-forming cell — rich in rough endoplasmic reticulum, mitochondria and a well-developed Golgi apparatus

## display_text
On electron microscopy the osteoblast shows the characters of a protein-forming cell: it is rich in rough endoplasmic reticulum and mitochondria and has a well-developed Golgi apparatus.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
modality: electron microscopy — the light-microscopic characters are a separate row of the same table
function: it secretes the organic part of the matrix, which is why the ultrastructure looks like this
scope: undergraduate histology of bone

---

# Item

## id
CLM-MSK-OSTEOCLAST-01

## concept_id
CON-MSK-76CE11C6DCDC37

## subject
The osteoclast

## predicate
is formed by

## object
Fusion of mononuclear haemopoietic progenitor cells, and lies on the bone surface near the bone marrow within a cavity called Howship's lacuna

## display_text
The osteoclast is formed by fusion of mononuclear haemopoietic progenitor cells and lies on the bone surface near the bone marrow, within an excavation called Howship's lacuna.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
lineage: haemopoietic, not osteogenic — this is what separates it from the other three bone cells
site: Howship's lacuna, on the bone surface near the marrow
scope: undergraduate histology of bone

---

# Item

## id
CLM-MSK-OSTEOCLAST-02

## concept_id
CON-MSK-76CE11C6DCDC37

## subject
The osteoclast on light microscopy

## predicate
is

## object
A large irregular cell with a brush border facing the nearby bony surface, 6 to 12 nuclei and foamy acidophilic cytoplasm

## display_text
By light microscopy the osteoclast is a large irregular cell with a brush border facing the nearby bony surface, 6 to 12 nuclei and foamy acidophilic cytoplasm.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
nuclei: 6 to 12
modality: light microscopy — on electron microscopy the brush border is a ruffled surface bearing microvilli
scope: undergraduate histology of bone

---

# Item

## id
CLM-MSK-INTERCALATED-DISC-01

## concept_id
CON-MSK-0DEAF126DF8F2E

## subject
The transverse component of the intercalated disc

## predicate
carries

## object
Desmosomes and adherent junctions (fascia adherens), which bind cardiac muscle cells firmly together and prevent their separation during repetitive contractions

## display_text
The transverse component of the intercalated disc crosses the cardiac muscle fibre and carries the desmosomes and adherent junctions (fascia adherens) that bind the cells firmly together so they do not separate during repetitive contraction.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
modality: electron microscopy — by light microscopy the disc is only a clear transverse line
orientation: transverse to the fibre
scope: undergraduate histology of cardiac muscle

---

# Item

## id
CLM-MSK-INTERCALATED-DISC-02

## concept_id
CON-MSK-0DEAF126DF8F2E

## subject
The lateral component of the intercalated disc

## predicate
carries

## object
Gap junctions, which let contraction signals pass from cell to cell, and whose lateral position shelters them from the contraction forces

## display_text
The lateral component of the intercalated disc lies parallel to the muscle fibres and carries the gap junctions that let contraction signals pass from cell to cell; their lateral position protects them from the contraction forces.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
orientation: parallel to the fibre
function: electrical coupling, against the mechanical coupling of the transverse component
scope: undergraduate histology of cardiac muscle

---

# Item

## id
CLM-MSK-SMOOTH-MUSCLE-EM-01

## concept_id
CON-MSK-888DFA3AA4E974

## subject
The sarcolemma of the smooth muscle cell

## predicate
has

## object
No T-tubules and no tubular system, but invaginations called caveolae, which can control calcium release and muscle contraction

## display_text
The smooth muscle cell has a thin sarcolemma surrounded by a basal lamina with no T-tubules and no tubular system; instead its surface is invaginated into caveolae, which can control calcium release and contraction.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
polarity: negative — the absence of T-tubules is the point
contrast: striated muscle, which has the T-tubule and its tubular system
scope: undergraduate histology of smooth muscle

---

# Item

## id
CLM-MSK-SMOOTH-MUSCLE-EM-02

## concept_id
CON-MSK-888DFA3AA4E974

## subject
The myofilaments of the smooth muscle cell

## predicate
are

## object
Irregularly arranged, so no striations appear, with actin inserting into dense bodies that correspond to the Z line of striated muscle

## display_text
Thick myosin and thin actin filaments are irregularly arranged in smooth muscle, so no striations appear, and the actin inserts into sarcoplasmic and sarcolemma-associated dense bodies, which correspond to the Z line of striated muscle.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
consequence: the absence of striations follows from the irregular arrangement, not from a missing filament
equivalence: dense body ↔ Z line
scope: undergraduate histology of smooth muscle

---

# Item

## id
CLM-NEU-AP-DEPOLARIZATION-01

## concept_id
CON-NEU-7A30FECF042995

## subject
The depolarisation phase of the nerve action potential

## predicate
is

## object
A positive-feedback, regenerative process in which sodium inflow opens more sodium channels until the firing level of −65 mV is reached and all voltage-gated sodium channels open

## display_text
Depolarisation is a regenerative process: sodium entering through the first channels to open depolarises the membrane further and opens more of them, until the firing level of −65 mV is reached, all voltage-gated sodium channels open, and rapid depolarisation follows.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
resting_potential: −90 mV
firing_level: −65 mV
overshoot: +35 mV, giving a spike amplitude of 125 mV
scope: undergraduate nerve physiology

---

# Item

## id
CLM-NEU-NA-CHANNEL-GATES-01

## concept_id
CON-NEU-157E05FAF3B100

## subject
The voltage-gated sodium channel

## predicate
has

## object
Two gates — an activation gate near the outer surface and an inactivation gate on the inner surface — giving three conformational states: resting, activated and inactivated

## display_text
The voltage-gated sodium channel has an activation gate near its outer surface and an inactivation gate on its inner surface; at rest the outer gate is closed and the inner open, opening the outer gate activates the channel and closing the inner gate inactivates it, giving three conformational states.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
count: two gates, three states
contrast: the voltage-gated potassium channel has only one gate, on its inner surface, and no inactivation gate
scope: undergraduate nerve physiology

---

# Item

## id
CLM-NEU-REFRACTORY-ABSOLUTE-01

## concept_id
CON-NEU-2235199E9F4373

## subject
The absolute refractory period

## predicate
is

## object
The period during which another action potential cannot be produced whatever the strength of the stimulus, running from the firing level to the early part of repolarisation

## display_text
The absolute refractory period is the time during which another action potential cannot be produced whatever the strength of the stimulus; it runs from the firing level to the early part of repolarisation, because all the voltage-gated sodium channels have opened and then been rapidly inactivated by their inner gate.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
polarity: absolute — no stimulus of any strength succeeds
boundaries: firing level to early repolarisation
scope: undergraduate nerve physiology

---

# Item

## id
CLM-NEU-REFRACTORY-RELATIVE-01

## concept_id
CON-NEU-F119674A8DFD8D

## subject
The relative refractory period

## predicate
is

## object
The period during which another action potential can be produced, but only by a stimulus stronger than threshold, running from the end of the absolute refractory period until the membrane potential returns to its resting level

## display_text
The relative refractory period is the time during which another action potential can still be produced, but only by a stimulus stronger than threshold; it begins at the end of the absolute refractory period and ends when the membrane potential returns to its resting level.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
polarity: relative — a stronger-than-threshold stimulus does succeed
cause: only some sodium channels have returned to the resting state, and outward potassium current opposes the inward sodium current
scope: undergraduate nerve physiology

---

# Item

## id
CLM-MSK-TENSION-CROSS-BRIDGE-01

## concept_id
CON-MSK-B2B106C1D81C30

## subject
Tension in skeletal muscle

## predicate
is generated by

## object
Cycling of the cross-bridges through four steps — binding, bending with sliding, detachment, and return to the upright position

## display_text
Tension is the force a muscle develops when it contracts, and it is generated by the cross-bridges cycling through four steps: binding of actin and myosin, bending of the cross-bridge with sliding of the actin filament, detachment, and return to the upright position to cycle again.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
count: four steps
condition: cycling continues only while calcium is attached to troponin C and ATP is available
scope: undergraduate skeletal muscle physiology

---

# Item

## id
CLM-MSK-CROSS-BRIDGE-ATP-01

## concept_id
CON-MSK-AC42FE7AB41DF2

## subject
Detachment of a cross-bridge from actin

## predicate
requires

## object
That ADP and inorganic phosphate be removed and a new molecule of ATP put in their place; without ATP the thick and thin filaments cannot be separated and the muscle is in contracture

## display_text
A cross-bridge can only detach when ADP and inorganic phosphate leave and a new ATP takes their place, because that new ATP lowers the head's affinity for the active site; if no ATP is available the thick and thin filaments cannot be separated and the muscle is held in contracture.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
polarity: negative case stated — no ATP, no detachment
consequence: the same loss of ATP is what the book gives as the cause of rigor mortis
scope: undergraduate skeletal muscle physiology

---

# Item

## id
CLM-MSK-SMOOTH-FACTORS-01

## concept_id
CON-MSK-A22F7D478A747E

## subject
Contraction of smooth muscle

## predicate
is modified by

## object
Five groups of factors — stretch, local factors, cold, humoral factors and the autonomic nerve supply

## display_text
Five groups of factors modify smooth muscle contraction: stretch, which makes visceral smooth muscle contract; local factors, with acids, excess carbon dioxide and oxygen lack relaxing it and alkalis and excess potassium contracting it; cold, which increases contraction; humoral factors acting through membrane receptors; and the autonomic nerve supply.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
count: five groups
polarity: bidirectional — local factors are listed in both a relaxing and a contracting set
scope: undergraduate smooth muscle physiology

---

# Item

## id
CLM-MSK-SMOOTH-SPONTANEOUS-01

## concept_id
CON-MSK-D97EA196E6719C

## subject
Smooth muscle

## predicate
contracts spontaneously

## object
Rhythmically or as a maintained partial contraction (muscle tone), even in isolated muscle with no nerve supply, the autonomic supply modifying that activity rather than initiating it

## display_text
Smooth muscle tends to contract on its own, rhythmically or as a maintained partial contraction called muscle tone, and does so even when isolated with no nerve supply; its dual autonomic supply does not initiate that activity but modifies it, altering the spontaneous activity and the muscle's sensitivity to chemical agents.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
polarity: negative on the nerve — the supply modifies, it does not initiate
condition: holds in isolated smooth muscle with no nerve supply at all
scope: undergraduate smooth muscle physiology
