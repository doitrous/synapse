<!--
  ASU-CNS-3 · Physiology MCQ — pending-live sparse CONCEPT overlay for seven
  facts in the 48-item "EOM MCQs - PHYSIOLOGY CNS PAPER 1 MCQ.pdf" compilation
  that duplicate an existing record rather than needing a new mint:

    1. CON-NEU-8F800A1650C2CA (this lane's own cluster 1, PENDING,
       docs/Ain-Shams-Source-Imports/concept/ASU-CNS-3-anatomy-mcq-concepts.md)
       — area 4 (primary motor cortex) function, physio Q3 ("Convert plan to
       motor orders / area 4 function") tests the identical fact already
       minted from the anatomy paper.
    2. CON-NEU-7EEA79A74188FA (this lane's own cluster 1, PENDING, same file)
       — flocculonodular lobe / equilibrium, physio Q22 ("folliculonodular
       function / equilibrium") duplicates anatomy Q28's fact, already
       flagged in coverage/ASU-CNS-3-triage.md.
    3. CON-NEU-9A281DDFAA6242 (this lane's own cluster 1, PENDING, same file)
       — hemiballismus/subthalamic nucleus lesion, physio Q28 duplicates
       anatomy Q28/Q36's fact, already flagged in the triage doc.
    4. CON-NEU-EA414DEA907F9A (PENDING, docs/Alexandria-Source-Imports/
       concept/AU-MED-203-physiology-concepts.md) — crossed extensor reflex,
       physio Q39 ("left leg extension / Right foot exposed to painful
       stimulus") is the identical fact to Alexandria's own definition.
    5. CON-NEU-77981F7CA5F5D7 (PENDING, docs/Alexandria-Source-Imports/
       concept/AU-MED-203-physiology-concepts.md) — muscle spindle intrafusal
       fibre / periaxial-space structure, whose own definition already states
       gamma-efferent (motor) innervation of intrafusal fibres (physio Q11)
       and the nuclear-bag/nuclear-chain fibre composition (physio Q13).
    6. CON-NEU-36C3E9C97641A7 (LIVE, kau) — "Crude touch travels in ventral
       spinothalamic tract"; physio Q34 tests the complementary fact that
       crude touch is carried peripherally by A-delta fibres, same named
       modality/pathway.

  Every row restates ## label verbatim (discriminating column) and adds only
  overlay fields (## module_subject, ## field_notes) — never a full record,
  per 00-START-HERE.md §3 "the concept-id overlay rule". Rows 1-3 already
  carry asu/ASU_Y3/ASU-CNS-3 tags from cluster 1's own mint, so no
  universities/learner_years/modules append is needed for them; rows 4-6 get
  the usual +asu/+3/+ASU-CNS-3 append. Apply rows 1-3 only after
  ASU-CNS-3-anatomy-mcq-concepts.md is itself live (it is this lane's own
  pending batch, not yet imported); apply rows 4-5 only after
  AU-MED-203-physiology-concepts.md is live; row 6 targets an already-live
  record and may be applied independently.

  Simulate all rows together with their source files, e.g.:
  node scripts/content/gate.mjs simulate \
    docs/Ain-Shams-Source-Imports/pending-live/ASU-CNS-3-physio-mcq-overlay-concepts.md \
    docs/Ain-Shams-Source-Imports/concept/ASU-CNS-3-anatomy-mcq-concepts.md \
    docs/Alexandria-Source-Imports/concept/AU-MED-203-physiology-concepts.md
-->

# Item

## id
CON-NEU-8F800A1650C2CA

## label
The primary motor cortex (Brodmann area 4), in the precentral gyrus, converts motor plans into executed movement

## module_subject
ASU-CNS-3 > Physiology > Motor cortex function

## field_notes
asu: Same fact tested by the ASU-CNS-3 Physiology CNS EOM MCQ compilation (src_db7dce81f0f09a0a630b), Q3 ("Convert plan to motor orders / area 4 function") — identical to this lane's own cluster 1 anatomy mint; no re-mint, question links directly to this concept.


---

# Item

## id
CON-NEU-7EEA79A74188FA

## label
The flocculonodular lobe (vestibulocerebellum) is the cerebellar division principally concerned with equilibrium and balance

## module_subject
ASU-CNS-3 > Physiology > Cerebellar physiology

## field_notes
asu: Same fact tested by the ASU-CNS-3 Physiology CNS EOM MCQ compilation (src_db7dce81f0f09a0a630b), Q22 ("folliculonodular function / equilibrium") — cross-paper duplicate of anatomy Q28, already flagged in coverage/ASU-CNS-3-triage.md; no re-mint, question links directly to this concept.


---

# Item

## id
CON-NEU-9A281DDFAA6242

## label
Hemiballismus results from a lesion of the contralateral subthalamic nucleus

## module_subject
ASU-CNS-3 > Physiology > Movement disorders

## field_notes
asu: Same fact tested by the ASU-CNS-3 Physiology CNS EOM MCQ compilation (src_db7dce81f0f09a0a630b), Q28 ("hemibalasmus is due to / subthalamus nucleus is affected") — cross-paper duplicate of anatomy Q28/Q36, already flagged in coverage/ASU-CNS-3-triage.md; no re-mint, question links directly to this concept.


---

# Item

## id
CON-NEU-EA414DEA907F9A

## label
The crossed extensor reflex pairs ipsilateral withdrawal with contralateral limb extension

## universities
+asu

## learner_years
+3

## modules
+ASU-CNS-3

## module_subject
ASU-CNS-3 > Physiology > Muscle and reflex physiology

## field_notes
asu: Alexandria AU-MED-203 pending concept's own definition already states the crossed extensor reflex mechanism tested at physio Q39 ("left leg extension / Right foot exposed to painful stimulus (crossed extensor reflex)") — same fact, no re-mint. Tested as Q39 of the ASU-CNS-3 Physiology CNS EOM MCQ compilation (src_db7dce81f0f09a0a630b).


---

# Item

## id
CON-NEU-77981F7CA5F5D7

## label
Muscle spindles sit within a gelatinous fluid-filled periaxial space inside their capsule

## universities
+asu

## learner_years
+3

## modules
+ASU-CNS-3

## module_subject
ASU-CNS-3 > Physiology > Muscle and reflex physiology

## field_notes
asu: Alexandria AU-MED-203 pending concept's own definition already states gamma-efferent (motor) innervation of intrafusal fibres — the fact tested at physio Q11 ("gamma motor neuron / Synapse with intrafusal muscle fibers in the muscle spindle") — and the nuclear-bag/nuclear-chain fibre composition tested at physio Q13 ("larger and less numerous / Nuclear bag is"); no re-mint for either. Tested as Q11 and Q13 of the ASU-CNS-3 Physiology CNS EOM MCQ compilation (src_db7dce81f0f09a0a630b).


---

# Item

## id
CON-NEU-36C3E9C97641A7

## label
Crude touch travels in ventral spinothalamic tract

## universities
+asu

## learner_years
+3

## modules
+ASU-CNS-3

## module_subject
ASU-CNS-3 > Physiology > Sensory pathways

## field_notes
asu: Live Kasr (kau) concept already covers crude touch's central pathway (ventral spinothalamic tract); this cluster's item tests the complementary fact that crude touch is carried peripherally by A-delta fibres — same named modality, complementary fact about its transmission, not a separate concept. Tested as Q34 of the ASU-CNS-3 Physiology CNS EOM MCQ compilation (src_db7dce81f0f09a0a630b).
