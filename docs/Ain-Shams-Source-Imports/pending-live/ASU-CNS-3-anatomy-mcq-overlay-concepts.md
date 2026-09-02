<!--
  ASU-CNS-3 · Anatomy MCQ — pending-live sparse CONCEPT overlay for four
  facts in the 81-item "EOM MCQs - ANATOMY CNS PAPER 1 MCQ.pdf" compilation
  that duplicate an existing record rather than needing a new mint:

    1. CON-FND-0D9D7A5BD1305F (LIVE, kau) — abducens/cavernous sinus,
       anatomy Q61. Chief-of-staff instruction: overlay reuse, do not re-mint.
    2. CON-FND-30C2D97803C2F4 (LIVE, kau) — retromandibular vein, anatomy
       Q35 tests the vein's formation, the live record covers its
       termination; same named vessel, complementary fact.
    3. CON-NEU-489FA78A649E37 (PENDING, docs/Kasr-Source-Imports/concept/
       102-INT-mcq-concepts.md) — parasympathetic cranial-nerve relay
       ganglia, covers the otic-ganglion/parotid pathway tested at anatomy
       Q13/Q27/Q64.
    4. CON-NEU-67C437462712E4 (PENDING, docs/Alexandria-Source-Imports/
       concept/AU-MED-102-physiology-concepts.md) — sympathetic outflow
       thoracolumbar origin, whose own definition already names the T1-L2
       range tested at anatomy Q29.

  Every row restates ## label verbatim (discriminating column) and adds
  only overlay fields (## universities +asu, ## learner_years +3,
  ## modules +ASU-CNS-3, ## module_subject, ## field_notes) — never a full
  record, per 00-START-HERE.md §3 "the concept-id overlay rule". Apply rows
  3-4 only after their named source file is itself live; rows 1-2 target
  already-live records and may be applied independently.

  Simulate rows 3-4 together with their source file, e.g.:
  node scripts/content/gate.mjs simulate \
    docs/Ain-Shams-Source-Imports/pending-live/ASU-CNS-3-anatomy-mcq-overlay-concepts.md \
    --with docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md \
    --with docs/Alexandria-Source-Imports/concept/AU-MED-102-physiology-concepts.md
-->

# Item

## id
CON-NEU-489FA78A649E37

## label
Cranial nerves III, VII and IX carry the parasympathetic supply to the head and neck, each relaying in its own ganglion to its own effector: pupil/lens (III), lacrimal/nasal/submandibular/sublingual glands (VII), and the parotid gland (IX)

## universities
+asu

## learner_years
+3

## modules
+ASU-CNS-3

## module_subject
ASU-CNS-3 > Anatomy > Cranial nerve parasympathetic pathways

## field_notes
asu: Kasr 102-INT pending concept already states, for IX: preganglionic fibres from the inferior salivatory nucleus relay in the otic ganglion, postganglionic fibres supply the parotid gland — the same fact tested by all three of this cluster's items (inferior salivatory nucleus, lesser petrosal as preganglionic carrier, auriculotemporal as postganglionic carrier). Tested as Q13, Q27, Q64 of the ASU-CNS-3 Anatomy CNS EOM MCQ compilation (src_50e46fe0f115d4513256).


---

# Item

## id
CON-NEU-67C437462712E4

## label
The sympathetic outflow arises from the lateral horn of the thoracolumbar spinal cord

## universities
+asu

## learner_years
+3

## modules
+ASU-CNS-3

## module_subject
ASU-CNS-3 > Anatomy > Autonomic nervous system

## field_notes
asu: Alexandria AU-MED-102 pending concept's own definition already states preganglionic sympathetic cell bodies lie in the lateral horn of segments 'roughly T1-L2' — the same lowest-level fact this cluster's item tests. Tested as Q29 of the ASU-CNS-3 Anatomy CNS EOM MCQ compilation (src_50e46fe0f115d4513256).


---

# Item

## id
CON-FND-30C2D97803C2F4

## label
Termination of retromandibular vein

## universities
+asu

## learner_years
+3

## modules
+ASU-CNS-3

## module_subject
ASU-CNS-3 > Anatomy > Venous drainage of the head and neck

## field_notes
asu: Live FND concept already covers this vein's inferior termination (divides into anterior/posterior divisions leaving the lower parotid); this cluster's item tests the vein's formation instead (union of the maxillary and superficial temporal veins), a complementary fact about the same named vein rather than a separate structure. Tested as Q35 of the ASU-CNS-3 Anatomy CNS EOM MCQ compilation (src_50e46fe0f115d4513256).


---

# Item

## id
CON-FND-0D9D7A5BD1305F

## label
Abducens nerve relation to the cavernous internal carotid artery

## universities
+asu

## learner_years
+3

## modules
+ASU-CNS-3

## module_subject
ASU-CNS-3 > Anatomy > Cavernous sinus and orbital apex

## field_notes
asu: Chief-of-staff instruction: this fact (abducens nerve inside the cavernous sinus, alongside the internal carotid artery) is already live as CON-FND-0D9D7A5BD1305F — overlay reuse required, no re-mint. Tested as Q61 of the ASU-CNS-3 Anatomy CNS EOM MCQ compilation (src_50e46fe0f115d4513256).

