<!--
  Sparse updates only, lane 5 (mans-aep-author5, Lymphatic System + Great
  Vessels of the Neck + Scalp & Face clusters, AEP Full Exams (VIP).pdf
  p.56-77). Every ## id below targets a concept that exists ONLY in an
  unimported Kasr or Alexandria batch -- none of these ids are in
  server/data/medical-library-v1.json yet (checked directly, zero hits).
  Apply each record ONLY after its target file (named per record) is live.

  Same conventions as lane 3's MANS-AEP-cns-concepts.md and lane 4's
  MANS-AEP-uri-reuse-concepts.md precedent: `## label` and `## canonical_key`
  restated in full on every row (a filled label makes the batch validator's
  stub-create check treat the row as a full update rather than a silent
  stub-create); `## module_subject` DELIBERATELY OMITTED (append-unsafe --
  would either fail validation against this row's own `## modules` or
  silently erase the source university's placement on merge); `## universities`
  / `## modules` / `## learner_years` are append-safe list columns
  (+mans / +MANS-AEP / +1).

  Gate is `medical:batch` with every target file (and this module's own new
  concept/article/question files) named via --with:

  node scripts/validate-content-batch.mjs "docs/Mansoura-Source-Imports/pending-live/MANS-AEP-lymph-scalp-reuse-concepts.md" \
    --with docs/Kasr-Source-Imports/concept/104-CPS-anatomy-concepts.md \
    --with docs/Kasr-Source-Imports/article/104-CPS-anatomy.md \
    --with docs/Alexandria-Source-Imports/concept/AU-MED-203-anatomy-concepts.md \
    --with docs/Alexandria-Source-Imports/article/AU-MED-203-anatomy-articles.md
-->

# Item

## id
CON-CVS-9C60987F3CB5A1

## canonical_key
arch-of-aorta.relations-and-branches

## label
The arch of the aorta continues the ascending aorta from the second right sternocostal junction, passing upwards, backwards and to the left in front of the trachea, then backwards and downwards on its left side, to end on the left of the T4/T5 disc as the descending thoracic aorta. Its upper convex aspect gives its three branches — brachiocephalic, left common carotid and left subclavian, in that order — and is crossed by the left brachiocephalic vein; its lower concave aspect overlies the pulmonary trunk's bifurcation, the left principal bronchus, the ligamentum arteriosum, the superficial cardiac plexus and the left recurrent laryngeal nerve; its left anterior aspect is crossed by the left phrenic and vagus nerves, cardiac branches and the left superior intercostal vein, separating it from the left pleura and lung; and its right posterior aspect is related to the trachea, the deep cardiac plexus at the tracheal bifurcation, the oesophagus, the left recurrent laryngeal nerve and the thoracic duct.

## universities
+mans

## modules
+MANS-AEP

## learner_years
+1

## field_notes
universityNotes: mans: AEP Full Exams (VIP).pdf's Lecture (12) "Great vessels of the neck" (p.62, p.65) tests two of this concept's own three named aortic-arch branches directly, in the same "which artery arises directly from the aortic arch" framing this Kasr 104-CPS concept's own definition already states: the brachiocephalic artery (p.62, keyed B) and, from a separate sitting with a different option set, the left common carotid artery (p.65, keyed C). Both are reused against this same concept rather than minting two new ones, since the fact tested is identical to this record's own definition.

---

# Item

## id
CON-NEU-A897156CACCE08

## canonical_key
neuroanatomy.cranial-nerve.vagus-carotid-sheath-course

## label
The vagus nerve runs in the carotid sheath between the internal jugular vein and the common carotid artery

## universities
+mans

## modules
+MANS-AEP

## learner_years
+1

## field_notes
universityNotes: mans: AEP Full Exams (VIP).pdf p.65 tests a complementary fact from this same carotid-sheath framing this Kasr Alexandria concept's own definition already states — "which structure runs inside the carotid sheath?" (keyed B, internal jugular vein) — a more basic identification of one of the sheath's contents (the internal jugular vein itself, named explicitly in this concept's own definition as running in the sheath's posterior groove alongside the vagus and the common carotid artery), rather than the vagus nerve's own course tested by the original AU-MED-203 item. Reused as the main concept since the internal jugular vein's sheath membership is already stated in this record's definition.

---

# Item

## id
CON-NEU-02BEAF5AB68C54

## canonical_key
anatomy.retromandibular-vein.branches-to-facial-external-jugular

## label
The retromandibular vein's anterior division joins the facial vein, posterior joins to form the external jugular

## universities
+mans

## modules
+MANS-AEP

## learner_years
+1

## field_notes
universityNotes: mans: AEP Full Exams (VIP).pdf p.65 tests the downstream half of this same retromandibular-vein anatomy this concept's own definition already states — "which of the following share in the formation of the external jugular vein?" (keyed C, retromandibular vein), naming the retromandibular vein's own posterior division as the vein sharing in the external jugular vein's formation, exactly the fact this record's own label and definition already cover. A separate, upstream fact (that the retromandibular vein is itself formed by the union of the superficial temporal and maxillary veins, p.65's other item on this vein) is minted as a new concept instead, since this record's definition covers only the vein's downstream divisions, not its own formation.

---

# Item

## id
CON-NEU-16964870332712

## canonical_key
anatomy.emissary-vein.scalp-to-dural-sinus-connection

## label
Emissary veins directly connect scalp veins to the dural venous sinuses

## universities
+mans

## modules
+MANS-AEP

## learner_years
+1

## field_notes
universityNotes: mans: AEP Full Exams (VIP).pdf p.68 tests this exact fact — "choose one correct statement regarding the scalp" (keyed E, "its infections can spread through emissary veins to cranial cavity") — the same emissary-vein, scalp-to-dural-sinus mechanism this Alexandria AU-MED-203 concept's own definition already states, applied here to explain intracranial spread of scalp infection specifically.

---

# Item

## id
CON-NEU-78EF99889CE564

## canonical_key
anatomy.facial-nerve.injury-food-pocketing-vestibule

## label
Facial nerve injury causes drooling and food pocketing in the cheek vestibule

## universities
+mans

## modules
+MANS-AEP

## learner_years
+1

## field_notes
universityNotes: mans: AEP Full Exams (VIP).pdf p.69 tests the muscular mechanism behind this exact clinical sign — "paralysis of which muscle lead to accumulation of food in the vestibule of the mouth?" (keyed B, buccinator) — buccinator being the specific facial-nerve-supplied muscle whose paralysis produces the food-pocketing sign this Alexandria AU-MED-203 concept's own label and definition already describe.

---

# Item

## id
CON-NEU-BBDC83EF719120

## canonical_key
anatomy.pharyngeal-arch.second-arch-facial-expression-muscles

## label
The muscles of facial expression are second pharyngeal arch derivatives

## universities
+mans

## modules
+MANS-AEP

## learner_years
+1

## field_notes
universityNotes: mans: AEP Full Exams (VIP).pdf p.69 tests this exact fact — "the muscles of the facial expression………" (keyed D, "are derived from the mesoderm of the pharyngeal arches") — matching this Alexandria AU-MED-203 concept's own second-pharyngeal-arch framing, and consistent with this same AEP source's own p.72 enumerate note ("They develop from the 2nd pharyngeal arch"). A differently-sourced concept elsewhere in the corpus (CON-FND-7B75BAB3A4E6C6, outside this lane's scope, in a non-Alexandria file) instead states "first" arch for a similarly-worded fact; that appears to be an error in the other record, flagged here rather than corrected since editing another university's own concept is out of this lane's scope.

---

# Item

## id
CON-NEU-BA080161837F03

## canonical_key
anatomy.buccal-branch.mandibular-sensory-facial-motor

## label
Buccal branch: mandibular nerve's is sensory, facial nerve's is motor

## universities
+mans

## modules
+MANS-AEP

## learner_years
+1

## field_notes
universityNotes: mans: AEP Full Exams (VIP).pdf p.71 tests this exact distinction — "the buccal branch of the mandibular nerve supplies……" (keyed B, "skin over buccinator") — the sensory half of the same same-named-but-different-nerve pairing this Alexandria AU-MED-203 concept's own label already states (trigeminal's buccal branch is sensory to skin over buccinator; the facial nerve's separate buccal branch is motor to buccinator itself).

---

# Item

## id
CON-NEU-088E2369B06007

## canonical_key
neuroanatomy.cervical-plexus.great-auricular-nerve-angle-of-mandible

## label
The great auricular nerve supplies the skin over the angle of the mandible

## universities
+mans

## modules
+MANS-AEP

## learner_years
+1

## field_notes
universityNotes: mans: AEP Full Exams (VIP).pdf p.71 tests this exact fact — "the skin over the angle of the mandible sends its sensations to the…." (keyed A, "great auricular nerve") — matching this Alexandria AU-MED-203 concept's own label verbatim.

---

# Item

## id
CON-NEU-818A4F14FD6378

## canonical_key
anatomy.cavernous-sinus.communicates-facial-vein-superior-ophthalmic-vein

## label
The superior ophthalmic vein links the facial vein to the cavernous sinus

## universities
+mans

## modules
+MANS-AEP

## learner_years
+1

## field_notes
universityNotes: mans: AEP Full Exams (VIP).pdf p.72 tests this exact fact — "the anterior facial vein is connected to the cavernous sinus through….." (keyed A, "ophthalmic vein") — matching this Alexandria AU-MED-203 concept's own facial-vein-to-cavernous-sinus route verbatim. p.74's near-identical restatement ("the facial veins connect with the cavernous sinus through", keyed B, "superior ophthalmic veins") is held as a literal duplicate of this same fact.
