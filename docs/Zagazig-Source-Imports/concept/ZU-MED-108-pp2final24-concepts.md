<!--
  ZU-MED-108 (Professional Practice II: basic clinical skills 1) — 28 NEW
  concepts minted for the 31-SBA cluster authored from `Fakous P.P2 Final
  2024.pdf` (Zagazig's Fakous campus, Faculty of Medicine — source provenance
  ruled usable by the chief of staff, 2026-09-01; see LANE-CARD.md §7).
  Search-before-mint run against `find-existing.mjs` for every concept below
  AND `grep -ril` across concept/pending-live/import-ready, ids minted with
  `mint-concept-id.mjs`, checked against server/data/medical-library-v1.json
  and every pending batch (0 collisions). No evidence-store `src_…` resource
  exists yet for this Zagazig lane at all (no
  `docs/Zagazig-Source-Imports/evidence/` directory exists) — per
  12-resources.md's weakest-but-honest option 3, `resource_ids`/
  `atomic_claim_ids` are left blank here and the citation lives only in each
  question's `source_citation` and this file's `original_wording`.

  3 pending-partial hits from the same search pass are handled as sparse
  overlays, not here: see
  `pending-live/ZU-MED-108-pp2final24-pending-overlays.md`.

  Key-recovery method: this paper is native-text (not scanned/OCR'd) but the
  correct option on every item is marked by hand in blue ink directly on the
  PDF page before scanning — a circle or rounded box drawn around the correct
  option's full text (occasionally a diagonal stroke through just the option
  letter instead, the corpus-wide alternate convention named in
  LANE-CARD.md §7) — which `pagetext.mjs keys` reports as "0 keyed" every
  time because the mark is drawn ink, not a font/colour/highlight property.
  All 31 answers below were confirmed by rendering all 4 pages as images
  (`pagetext.mjs render --force`) and reading the circled/struck option
  directly, most also cross-confirmed by a second, independent margin-letter
  annotation next to the question number. No double-marks or contradictions
  were found on this paper; nothing is held.

  Import: Admin › Concepts › Import.
-->

# Item

## id
CON-FND-0CDA671CAE0778

## label
The jaw thrust is a basic airway-opening manoeuvre that moves the jaw upward and forward and is contraindicated when cervical spine injury is suspected

## canonical_key
airway.jaw-thrust.technique-and-cspine-contraindication

## aliases
Jaw thrust manoeuvre
Modified jaw thrust
Basic airway opening technique

## arabic_label


## arabic_aliases


## definition
The jaw thrust is one of the basic (non-instrumental) airway-opening manoeuvres, alongside head tilt-chin lift, used to relieve airway obstruction caused by the tongue falling back against the posterior pharyngeal wall in an unconscious patient. The rescuer's fingers lift the angle of the mandible so that the jaw — and with it the tongue base, which is attached to it — is displaced upward and forward, opening the airway without extending the neck. Because it does not require neck extension, the jaw thrust (unlike head tilt-chin lift) is the airway manoeuvre of choice, and head tilt-chin lift is avoided, whenever cervical spine injury is suspected, since extending or rotating an unstable cervical spine risks cord injury.

## explicit_objective
State that jaw thrust opens the airway by moving the jaw upward and forward without neck extension, and explain why this makes it (not head tilt-chin lift) the safe basic airway manoeuvre when cervical spine injury is suspected.

## pitfalls
Treating jaw thrust as contraindicated in suspected cervical spine injury — it is in fact the preferred basic manoeuvre precisely because it avoids neck extension; head tilt-chin lift is the one to avoid.

## concept_type
technique

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Basic life support and airway management

## subtopic
Airway-opening manoeuvres

## microtopic


## nanotopic


## modules
ZU-MED-108

## article_ids
ART-FND-ZU108-AIRWAY-MANOEUVRES

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.5

## exam_weight_by_year
ZU_Y1=0.6

## clinical_relevance
0.8

## academic_relevance
0.6

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"As regard to the manoeuvre in this picture, all the following statements are true except: a) It is a Jaw thrust manoeuver. b) It is considered a basic airway manoeuver. c) It is contraindicated in suspected cervical spine injury. d) During the manoeuvre, the jaw is moved upward and forward." ANSWER: c (hand-drawn ink key, option circled + margin "c", Fakous P.P2 Final 2024.pdf p.1 Q1, render-confirmed)

## merge_ids


## rejected_merge_candidate_ids
`find-existing.mjs "jaw thrust"` hit `docs/MUST-Source-Imports/concept/MUST-PED501-emergencies-concepts.md`, a paediatric-resuscitation concept about checking airway-breathing-circulation sequence before bag-mask ventilation that names jaw thrust only as one of two interchangeable airway-opening options — a different objective (sequencing, not the manoeuvre's own technique/contraindication), not merged.

## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper; a standard BLS/first-aid manual citation would strengthen this before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for this Zagazig lane yet (no evidence/ directory). Cited via question source_citation and this file's original_wording only, per 12-resources.md option 3.

---

# Item

## id
CON-FND-5196DA553EC951

## label
Gurgling, stridor, chest wheezes and snoring are all signs of airway obstruction

## canonical_key
airway.obstruction-signs.gurgling-stridor-wheeze-snoring

## aliases
Signs of airway obstruction
Noisy breathing sounds and their meaning

## arabic_label


## arabic_aliases


## definition
Airway obstruction, whether partial or complete, produces abnormal breath sounds that localise the level of the obstruction: gurgling suggests liquid (blood, vomit, secretions) in the upper airway; snoring suggests partial obstruction by the tongue or soft palate in a reduced-conscious-level patient; stridor (a harsh, high-pitched inspiratory sound) suggests laryngeal or upper-tracheal narrowing; and wheeze (an expiratory, musical sound) suggests lower-airway narrowing, as in bronchospasm. All four are therefore recognised together as signs that the airway is obstructed, even though each points to a different level or cause.

## explicit_objective
Recognise gurgling, stridor, wheeze and snoring as signs of airway obstruction, and associate each sound with its likely level or cause.

## pitfalls
Treating only stridor as an "airway" sign and dismissing wheeze, gurgling or snoring as unrelated — each is a recognised marker of obstruction at a different anatomical level.

## concept_type
sign

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Basic life support and airway management

## subtopic
Recognising airway obstruction

## microtopic


## nanotopic


## modules
ZU-MED-108

## article_ids
ART-FND-ZU108-AIRWAY-MANOEUVRES

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.45

## exam_weight_by_year
ZU_Y1=0.55

## clinical_relevance
0.75

## academic_relevance
0.55

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Signs of airway obstruction include: a. Gurgling. b. Stridor. C. Chest wheezes d. Snoring. e. All of the above. F. None of the above." ANSWER: e (hand-drawn ink key, option circled + margin "E", Fakous P.P2 Final 2024.pdf p.1 Q3, render-confirmed)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for this Zagazig lane yet. Cited via question source_citation and original_wording only, per 12-resources.md option 3.

---

# Item

## id
CON-FND-312D57AD95BA95

## label
Patient responsiveness during the BLS sequence is checked by shaking the shoulders and shouting

## canonical_key
bls.responsiveness-check.shake-and-shout

## aliases
Shake and shout
Checking responsiveness in BLS

## arabic_label


## arabic_aliases


## definition
The first assessment step in the basic life support sequence, once the scene is confirmed safe, is to check whether the patient is responsive. This is done by gently shaking the patient's shoulders while shouting loudly, asking "Are you alright?" — a response (movement, speech, groaning) means the patient is not in cardiac arrest and can be managed conservatively, while no response at all triggers the remainder of the BLS sequence (call for help, open the airway, check breathing).

## explicit_objective
State that shaking the shoulders and shouting is the method used to check a collapsed patient's responsiveness at the start of the BLS sequence.

## pitfalls
Confusing "shake and shout" (the responsiveness check) with the separate steps of checking breathing (look/listen/feel) or checking the pulse — each is a distinct, sequential BLS assessment.

## concept_type
technique

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Basic life support and airway management

## subtopic
BLS assessment sequence

## microtopic


## nanotopic


## modules
ZU-MED-108

## article_ids
ART-FND-ZU108-BLS-CARDIAC-ARREST

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.45

## exam_weight_by_year
ZU_Y1=0.55

## clinical_relevance
0.75

## academic_relevance
0.5

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"To check for patient's response during BLS (Basic Life Support) sequence, you can do: a. Head tilt-chin lift. b. Look, listen and feel. c. Shake and shout. d. Jaw thrust." ANSWER: c (hand-drawn ink key, option circled + margin "C", Fakous P.P2 Final 2024.pdf p.1 Q4, render-confirmed)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for this Zagazig lane yet. Cited via question source_citation and original_wording only, per 12-resources.md option 3.

---

# Item

## id
CON-FND-9E4CA47345DE35

## label
The nasopharyngeal airway is contraindicated in suspected fracture of the base of the skull

## canonical_key
airway.nasopharyngeal-airway.contraindication-skull-base-fracture

## aliases
NPA contraindication
Nasal airway and base-of-skull fracture

## arabic_label


## arabic_aliases


## definition
The nasopharyngeal airway (NPA) is a soft tube passed through a nostril into the pharynx to relieve upper-airway obstruction in a semiconscious patient (it is better tolerated than an oropharyngeal airway in a patient with an intact gag reflex). It is contraindicated when a fracture of the base of the skull is suspected — clinically suggested by CSF rhinorrhoea/otorrhoea, panda-eye bruising or Battle's sign — because the tube can pass through a fracture defect in the cribriform plate or skull base and enter the cranial cavity.

## explicit_objective
State that the nasopharyngeal airway is contraindicated when skull base fracture is suspected, and explain the mechanism (risk of intracranial passage through the fracture).

## pitfalls
Confusing the nasopharyngeal airway's contraindication (skull base fracture, because it is inserted through the nose) with the oropharyngeal airway's own limitations (poor tolerance with an intact gag reflex) — the two devices are sized and contraindicated differently.

## concept_type
technique

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Basic life support and airway management

## subtopic
Airway adjuncts

## microtopic


## nanotopic


## modules
ZU-MED-108

## article_ids
ART-FND-ZU108-AIRWAY-MANOEUVRES

## related_article_ids


## related_concept_ids
CON-FND-0975E320373370

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.45

## exam_weight_by_year
ZU_Y1=0.55

## clinical_relevance
0.8

## academic_relevance
0.55

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"The airway in the figure above is contraindicated in: a. Semiconscious patient. b. Fracture base of the skull. c. Trismus. D. Clenched jaw. E. Deeply comatose patient." ANSWER: b (hand-drawn ink key, option circled, margin "B" and handwritten note "Skull base Fracture", Fakous P.P2 Final 2024.pdf p.1-2 Q5, render-confirmed)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for this Zagazig lane yet. Cited via question source_citation and original_wording only, per 12-resources.md option 3.

---

# Item

## id
CON-FND-0975E320373370

## label
The nasopharyngeal airway is sized by the diameter of the patient's little finger

## canonical_key
airway.nasopharyngeal-airway.sizing-little-finger-diameter

## aliases
NPA sizing
Nasopharyngeal airway diameter selection

## arabic_label


## arabic_aliases


## definition
Choosing a nasopharyngeal airway of the correct calibre matters because one too large can cause nasal trauma or fail to pass, while one too narrow will not adequately bypass the obstruction. The bedside rule taught for estimating a suitable tube diameter is to match it to the diameter of the patient's own little finger, which approximates the internal diameter of the nasal passage; length is separately estimated from nostril to the tragus of the ear or the angle of the jaw.

## explicit_objective
State that the nasopharyngeal airway's diameter is estimated using the patient's little finger.

## pitfalls
Applying the oropharyngeal airway's length-sizing rule (ear lobule to angle of mouth) to the nasopharyngeal airway's diameter question, or vice versa — the two devices use different landmarks for different dimensions.

## concept_type
technique

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Basic life support and airway management

## subtopic
Airway adjuncts

## microtopic


## nanotopic


## modules
ZU-MED-108

## article_ids
ART-FND-ZU108-AIRWAY-MANOEUVRES

## related_article_ids


## related_concept_ids
CON-FND-9E4CA47345DE35 | CON-FND-B60751FCB593CB

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.4

## exam_weight_by_year
ZU_Y1=0.5

## clinical_relevance
0.6

## academic_relevance
0.5

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"How to choose suitable size of the airway in the figure above: a) Diameter of the patient's little finger. b) Distance between lobule of the ear and the angle of the mouth. c) Size of the patient's anterior nares. d) Distance between patient's incisor and the angle of the eye." ANSWER: a (hand-drawn ink key, option circled + margin "A", Fakous P.P2 Final 2024.pdf p.2 Q6, render-confirmed)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for this Zagazig lane yet. Cited via question source_citation and original_wording only, per 12-resources.md option 3.

---

# Item

## id
CON-FND-B60751FCB593CB

## label
The oropharyngeal airway is sized by the distance between the lobule of the ear and the angle of the mouth

## canonical_key
airway.oropharyngeal-airway.sizing-ear-lobule-to-mouth-angle

## aliases
OPA sizing
Oropharyngeal airway length selection

## arabic_label


## arabic_aliases


## definition
The oropharyngeal airway (OPA) is a rigid curved device inserted through the mouth to hold the tongue off the posterior pharyngeal wall in an unconscious patient without a gag reflex. Choosing the correct length matters because a device that is too short fails to reach past the tongue base while one too long can push the epiglottis down and worsen obstruction, so its length is estimated by measuring from the corner (angle) of the patient's mouth to the lobule of the ear (an alternative landmark uses the incisors to the angle of the jaw).

## explicit_objective
State that the oropharyngeal airway's length is estimated from the angle of the mouth to the ear lobule.

## pitfalls
Applying the nasopharyngeal airway's diameter-sizing rule (little finger) to the oropharyngeal airway, which is instead sized for length using a facial landmark measurement.

## concept_type
technique

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Basic life support and airway management

## subtopic
Airway adjuncts

## microtopic


## nanotopic


## modules
ZU-MED-108

## article_ids
ART-FND-ZU108-AIRWAY-MANOEUVRES

## related_article_ids


## related_concept_ids
CON-FND-0975E320373370

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.4

## exam_weight_by_year
ZU_Y1=0.5

## clinical_relevance
0.6

## academic_relevance
0.5

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"How to choose suitable size of oropharyngeal airway for any patient? a) Diameter of the patient's middle finger. b) Distance between patient's incisor and the angle of the eye. c) Size of the patient's anterior nares. d) Distance between lobule of the ear and the angle of the mouth." ANSWER: d (hand-drawn ink key, option circled + margin "D", Fakous P.P2 Final 2024.pdf p.2 Q7, render-confirmed)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for this Zagazig lane yet. Cited via question source_citation and original_wording only, per 12-resources.md option 3.

---

# Item

## id
CON-FND-0AA1F928825ABF

## label
Abdominal thrusts (the Heimlich manoeuvre) are indicated in a fully conscious choking patient who cannot cough or speak

## canonical_key
choking.abdominal-thrust.indication-complete-obstruction

## aliases
Heimlich manoeuvre indication
Abdominal thrust for complete choking

## arabic_label


## arabic_aliases


## definition
A choking patient who is still coughing effectively and can speak has a partial obstruction and should simply be encouraged to keep coughing, since forceful expulsion is more effective than any manual manoeuvre. Once the obstruction becomes complete — the patient cannot cough, speak or breathe — the airway must be cleared mechanically: in a conscious adult or child this means abdominal thrusts (the Heimlich manoeuvre), delivered from behind with an inward-and-upward fist thrust below the xiphoid, alternated with back blows.

## explicit_objective
State that abdominal thrusts are indicated once a conscious choking patient can no longer cough or speak effectively, and distinguish this from a still-coughing patient who needs no manual intervention.

## pitfalls
Performing abdominal thrusts on a patient who is still coughing effectively — effective coughing is more effective than any manual manoeuvre and manual intervention is reserved for patients who can no longer cough or speak.

## concept_type
technique

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Choking management

## subtopic
Abdominal thrust technique

## microtopic


## nanotopic


## modules
ZU-MED-108

## article_ids
ART-FND-ZU108-CHOKING

## related_article_ids


## related_concept_ids
CON-FND-5C4297B73F7F48

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.5

## exam_weight_by_year
ZU_Y1=0.6

## clinical_relevance
0.8

## academic_relevance
0.55

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"The above manoeuvre is indicated in: a) Fully conscious, effectively coughing choking patients. b) Fully conscious choking patients who cannot cough or speak. c) Collapsed cyanosed choking patients. d) All of the above. e) None of the above." ANSWER: b (hand-drawn ink key, option circled + margin "B", Fakous P.P2 Final 2024.pdf p.2 Q8, render-confirmed)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for this Zagazig lane yet. Cited via question source_citation and original_wording only, per 12-resources.md option 3.

---

# Item

## id
CON-FND-2CFE5FE0919554

## label
In an unconscious patient with laboured, noisy respirations, the first step is a simple manoeuvre such as head tilt-chin lift to open the airway

## canonical_key
airway.unconscious-noisy-breathing.simple-manoeuvre-first

## aliases
Airway before invasive intervention
First step for noisy breathing in an unconscious patient

## arabic_label


## arabic_aliases


## definition
Laboured, noisy respiration in an unconscious patient is most often caused by the tongue partially obstructing the pharynx, a simple mechanical problem with a simple mechanical fix. The correct first action is therefore a basic airway-opening manoeuvre (head tilt-chin lift, or jaw thrust if cervical spine injury is suspected) rather than jumping to more invasive or aggressive interventions such as immediate bag-mask ventilation, blind endotracheal intubation, or a blind finger sweep of the oropharynx (which can push a foreign body further in and is reserved for a directly visualised object).

## explicit_objective
State that a simple airway-opening manoeuvre is the first action for an unconscious patient with laboured, noisy breathing, before escalating to ventilation, intubation or a finger sweep.

## pitfalls
Escalating straight to bag-mask ventilation or endotracheal intubation, or performing a blind finger sweep, before first trying a simple airway-opening manoeuvre — most noisy breathing in an unconscious patient is solved at this first, simplest step.

## concept_type
management

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Basic life support and airway management

## subtopic
Airway-opening manoeuvres

## microtopic


## nanotopic


## modules
ZU-MED-108

## article_ids
ART-FND-ZU108-AIRWAY-MANOEUVRES

## related_article_ids


## related_concept_ids
CON-FND-0CDA671CAE0778

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.5

## exam_weight_by_year
ZU_Y1=0.6

## clinical_relevance
0.8

## academic_relevance
0.55

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"When managing an unconscious patient who has is making laboured and noisy respirations the physician must first: a) Commence positive pressure ventilation with a bag-mask device immediately. b) Immediately perform endotracheal intubation. c) Perform a 'finger sweep' to clear the oropharynx of foreign material. d) Perform a simple manoeuver such as a head tilt-chin lift to open the airway." ANSWER: d (hand-drawn ink key, option circled, Fakous P.P2 Final 2024.pdf p.2 Q9, render-confirmed)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for this Zagazig lane yet. Cited via question source_citation and original_wording only, per 12-resources.md option 3.

---

# Item

## id
CON-FND-6FC7C6BF76B1AB

## label
Cardiac arrest is defined by loss of consciousness with no pulse and no breathing

## canonical_key
bls.cardiac-arrest.defining-signs

## aliases
Cardiac arrest definition
Signs of cardiac arrest

## arabic_label


## arabic_aliases


## definition
Cardiac arrest is the sudden cessation of effective cardiac output, and it is recognised clinically — not by ECG or imaging in the field — by three findings together: the patient is unconscious, has no palpable central pulse, and is not breathing normally (occasional agonal gasps do not count as normal breathing and should not delay recognition). This clinical triad, rather than any single sign alone, is what triggers immediate CPR and activation of the emergency response.

## explicit_objective
State that cardiac arrest is recognised by the combination of loss of consciousness, absent pulse and absent breathing.

## pitfalls
Waiting to confirm a completely absent pulse or breathing before starting CPR, or being reassured by occasional agonal gasps — in practice, an unresponsive patient who is not breathing normally is managed as cardiac arrest without delay.

## concept_type
sign

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Basic life support and airway management

## subtopic
Cardiac arrest recognition

## microtopic


## nanotopic


## modules
ZU-MED-108

## article_ids
ART-FND-ZU108-BLS-CARDIAC-ARREST

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.5

## exam_weight_by_year
ZU_Y1=0.6

## clinical_relevance
0.85

## academic_relevance
0.55

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"In Cardiac arrest there is: a. Normal breathing pattern. b. Accepted pulse volume. c. Loss of consciousness, no pulse and no breathing. d. Normal heart function." ANSWER: c (hand-drawn ink key, option circled + margin "C", Fakous P.P2 Final 2024.pdf p.2 Q10, render-confirmed)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for this Zagazig lane yet. Cited via question source_citation and original_wording only, per 12-resources.md option 3.

---

# Item

## id
CON-FND-5C4297B73F7F48

## label
Signs and symptoms of choking include difficulty breathing or speaking, coughing, pointing to or grasping the throat, and cyanosis if breathing is not restored

## canonical_key
choking.signs-and-symptoms

## aliases
Choking presentation
Universal choking sign

## arabic_label


## arabic_aliases


## definition
A choking patient typically presents with sudden difficulty breathing and/or speaking, coughing (while the obstruction remains partial), and the classic "universal choking sign" of clutching or pointing to the throat with one or both hands. If the obstruction is not relieved, hypoxia develops and cyanosis appears — a marker that the situation has become an emergency requiring immediate abdominal thrusts rather than continued observation.

## explicit_objective
List the recognised signs and symptoms of choking, including the universal choking sign and cyanosis as a marker of ongoing obstruction.

## pitfalls
Waiting for cyanosis to appear before recognising choking — difficulty breathing/speaking, coughing and the throat-clutching sign should trigger recognition and management before hypoxia develops.

## concept_type
sign

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Choking management

## subtopic
Recognising choking

## microtopic


## nanotopic


## modules
ZU-MED-108

## article_ids
ART-FND-ZU108-CHOKING

## related_article_ids


## related_concept_ids
CON-FND-0AA1F928825ABF

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.45

## exam_weight_by_year
ZU_Y1=0.55

## clinical_relevance
0.75

## academic_relevance
0.5

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Signs and symptoms of choking includes: a. Difficulty in breathing and/ or speaking. b. Coughing. c. Pointing to throat or grasp neck. d. Cyanosis if breathing is not restored. e. All of the above. f. None of the above." ANSWER: e (hand-drawn ink key, option circled, Fakous P.P2 Final 2024.pdf p.2 Q11, render-confirmed)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for this Zagazig lane yet. Cited via question source_citation and original_wording only, per 12-resources.md option 3.

---

# Item

## id
CON-FND-90C70F6D1E42F0

## label
The BLS flow chart runs R (check response), D (check danger/hazards), S (send for help), then C (start CPR) — not a repeated "D" for disability

## canonical_key
bls.flowchart.drsabcd-sequence

## aliases
DRSABCD sequence
BLS algorithm steps

## arabic_label


## arabic_aliases


## definition
The basic life support flow chart is taught as a fixed sequence of checks before compressions begin: R — check the patient's Response; D — check for Danger/risks/hazards to the rescuer and patient; S — Send for help/activate emergency services; then A, B, C — Airway, Breathing, Circulation/CPR. "Disability" (the D of the trauma primary survey's ABCDE) belongs to a different, hospital-based assessment sequence, not the lay/first-responder BLS flow chart, so listing it as a second "D" step in BLS is the item that does not belong.

## explicit_objective
State the correct BLS flow-chart sequence (response, danger, send for help, airway, breathing, CPR) and distinguish it from the trauma ABCDE primary survey, which is where "disability" belongs instead.

## pitfalls
Importing "D for disability" from the trauma ABCDE primary survey into the BLS flow chart — BLS uses D for danger/hazards, and disability is not a BLS flow-chart step at all.

## concept_type
management

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Basic life support and airway management

## subtopic
BLS assessment sequence

## microtopic


## nanotopic


## modules
ZU-MED-108

## article_ids
ART-FND-ZU108-BLS-CARDIAC-ARREST

## related_article_ids


## related_concept_ids
CON-FND-312D57AD95BA95

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.45

## exam_weight_by_year
ZU_Y1=0.55

## clinical_relevance
0.7

## academic_relevance
0.55

## weight_confidence
0.4

## confidence
0.75

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"BLS (Basic Life Support) flow chart includes all the following except: a) R: check for response. b) D: check for danger/risks/hazards. c) C: start CPR (Cardio-Pulmonary Resuscitation). d) D: check for patient's disability." ANSWER: d (hand-drawn ink key, option boxed + margin "D", Fakous P.P2 Final 2024.pdf p.2 Q12, render-confirmed)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for this Zagazig lane yet. Cited via question source_citation and original_wording only, per 12-resources.md option 3.

---

# Item

## id
CON-FND-A422370E6710B7

## label
During chest compressions the rescuer kneels beside the patient's chest with straight arms and the compression movement comes from the hip joint, not the shoulder

## canonical_key
cpr.compression-technique.hip-joint-movement

## aliases
CPR body mechanics
Chest compression technique

## arabic_label


## arabic_aliases


## definition
Effective chest compressions require the rescuer to kneel beside the patient's chest (not the legs), lock the elbows straight, and position the shoulders directly over the hands so that body weight — delivered by rocking from the hips, not by flexing the shoulders or elbows — drives each compression. This hip-driven technique lets the rescuer sustain the required compression depth and rate without rapid fatigue, which repeated shoulder or elbow flexion cannot do for more than a minute or two.

## explicit_objective
Describe correct CPR compressor positioning and mechanics: kneeling beside the chest, straight arms, and movement driven from the hip joint.

## pitfalls
Powering compressions from the shoulder or elbow, or kneeling beside the patient's legs rather than the chest — both lead to rapid rescuer fatigue and inconsistent compression depth.

## concept_type
technique

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Basic life support and airway management

## subtopic
CPR technique

## microtopic


## nanotopic


## modules
ZU-MED-108

## article_ids
ART-FND-ZU108-BLS-CARDIAC-ARREST

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.5

## exam_weight_by_year
ZU_Y1=0.6

## clinical_relevance
0.75

## academic_relevance
0.55

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"When Operator performing CPR (Cardio-Pulmonary Resuscitation): a) Movement comes from shoulder joint. b) Kneels beside patient's legs. c) Operator body is not perpendicular to patient's chest. d) Movement comes from hip joint." ANSWER: d (hand-drawn ink key, diagonal stroke through option letter "d", Fakous P.P2 Final 2024.pdf p.2 Q13, render-confirmed)

## merge_ids


## rejected_merge_candidate_ids
`find-existing.mjs "chest compression"` hit `docs/import-ready/concept/SYS-CVS-CONCEPT-T09.md` ("Compressions maintain circulation; defibrillation restores rhythm") — a physiological-principle concept about why compressions and defibrillation are both needed, not this concept's operator body-mechanics/technique objective; not merged.

## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for this Zagazig lane yet. Cited via question source_citation and original_wording only, per 12-resources.md option 3.

---

# Item

## id
CON-FND-B2C795580499C8

## label
AED pads are attached to the patient's bare, dry chest

## canonical_key
aed.pad-placement.bare-dry-chest

## aliases
AED pad application
Automated external defibrillator use

## arabic_label


## arabic_aliases


## definition
For an automated external defibrillator to deliver an effective, safely conducted shock, its adhesive pads must be applied directly to bare skin on a dry chest — clothing blocks proper adhesion and moisture (sweat, water, rain) can conduct current across the skin surface rather than through the heart, and poses a shock hazard to rescuers. Wet skin should be quickly wiped dry and any transdermal medication patches or jewellery removed from the pad sites before attaching the pads; nobody should be touching the patient when the shock is delivered.

## explicit_objective
State that AED pads are applied to bare, dry skin, and explain why clothing or moisture at the pad site compromises the shock.

## pitfalls
Applying AED pads over clothing or wet skin, or allowing pads to be placed on the abdomen — pads are placed on the bare, dry chest in the standard anterolateral (or anteroposterior) positions.

## concept_type
technique

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## modules
ZU-MED-108

## topic
Basic life support and airway management

## subtopic
Automated external defibrillation

## microtopic


## nanotopic


## article_ids
ART-FND-ZU108-BLS-CARDIAC-ARREST

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.5

## exam_weight_by_year
ZU_Y1=0.6

## clinical_relevance
0.8

## academic_relevance
0.5

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Regarding AED device (Automated External Defibrillator), it can be used as follow: a) Over wet skin and over patient's clothes. b) Pads are attached to bare and dry patient's chest. c) Pads are attached to patient's abdomen. d) Anyone can touch the patient during shock delivery." ANSWER: b (hand-drawn ink key, option boxed + diagonal stroke through "b", margin "B", Fakous P.P2 Final 2024.pdf p.3 Q14, render-confirmed)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for this Zagazig lane yet. Cited via question source_citation and original_wording only, per 12-resources.md option 3.

---

# Item

## id
CON-FND-F4D9CB6A4A3FF0

## label
The recovery position maintains a patent airway in an unconscious victim who is breathing normally

## canonical_key
bls.recovery-position.purpose

## aliases
Recovery position purpose
Lateral safety position

## arabic_label


## arabic_aliases


## definition
The recovery position (a stable, semi-prone lateral position with the head tilted to allow drainage) is used for an unconscious patient who is breathing normally and does not need CPR. Its purpose is to keep the airway open by letting the tongue fall forward instead of back into the pharynx and by letting vomit or secretions drain out of the mouth rather than pool in the airway, reducing the risk of aspiration while help arrives.

## explicit_objective
State that the recovery position maintains a patent airway and reduces aspiration risk in an unconscious, normally breathing patient.

## pitfalls
Using the recovery position for a patient who is not breathing normally, has no pulse, or has a suspected spinal injury — it is reserved for the unconscious-but-breathing patient and is not a substitute for CPR.

## concept_type
technique

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Basic life support and airway management

## subtopic
Recovery position

## microtopic


## nanotopic


## modules
ZU-MED-108

## article_ids
ART-FND-ZU108-RECOVERY-TRANSFER

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.45

## exam_weight_by_year
ZU_Y1=0.55

## clinical_relevance
0.75

## academic_relevance
0.5

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Regarding the position in the above image, which statement is true: a) It can maintain patent airway in unconscious normally breathing victim. b) It can be used for victim with loss of consciousness, no pulse and no breathing c) It can be used safely for victim with spine or limb fracture. d) It can't prevent airway obstruction by the tongue." ANSWER: a (hand-drawn ink key, option circled + diagonal stroke through "a", margin "A", Fakous P.P2 Final 2024.pdf p.3 Q15, render-confirmed)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for this Zagazig lane yet. Cited via question source_citation and original_wording only, per 12-resources.md option 3.

---

# Item

## id
CON-FND-7FF29A40E6491E

## label
An ambulance is the appropriate vehicle to transfer a patient safely

## canonical_key
transfer.safe-methods.ambulance

## aliases
Safe patient transfer
Ambulance transfer

## arabic_label


## arabic_aliases


## definition
Safe transfer of a sick or injured patient between locations requires a vehicle equipped and staffed to monitor the patient, maintain the airway, continue treatment (oxygen, IV fluids, monitoring) and manage deterioration en route — an ambulance is purpose-built and staffed for exactly this, unlike ordinary road, rail or air transport (truck, electric train, commercial airplane) which offer none of these and are inappropriate for transferring an unwell patient.

## explicit_objective
State that an ambulance, not ordinary transport, is the appropriate means of safely transferring a patient.

## pitfalls
Treating any available vehicle as adequate for patient transfer — the point tested is that an ambulance's equipment and trained staff, not merely a moving vehicle, are what make transfer safe.

## concept_type
management

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Patient safety and transfer

## subtopic
Safe transfer methods

## microtopic


## nanotopic


## modules
ZU-MED-108

## article_ids
ART-FND-ZU108-RECOVERY-TRANSFER

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.35

## exam_weight_by_year
ZU_Y1=0.45

## clinical_relevance
0.55

## academic_relevance
0.4

## weight_confidence
0.4

## confidence
0.75

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"We can use the following to transfer patient safely: a. Truck. b. Electric train. c. Ambulance. d. Airplane." ANSWER: c (hand-drawn ink key, option boxed, margin "C", Fakous P.P2 Final 2024.pdf p.3 Q16, render-confirmed)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for this Zagazig lane yet. Cited via question source_citation and original_wording only, per 12-resources.md option 3.

---

# Item

## id
CON-FND-0074397AC5A742

## label
Personal history in a general medical history covers name, age and sex, among other patient identifiers

## canonical_key
history.personal-history.components

## aliases
Personal history components
Patient identifying data in history taking

## arabic_label


## arabic_aliases


## definition
The general medical history is structured into named sections, one of which — personal history — records the patient's identifying and demographic data: name, age, sex, occupation, marital status, residence and similar identifiers. This is distinct from the presenting complaint (why the patient has come), the history of present illness (the story of the current problem), and past/family/social history (background not specific to identifying who the patient is), so a question about where "name, age, sex" belongs is a question about the personal-history section specifically.

## explicit_objective
State that name, age and sex are recorded under the personal-history section of a general medical history, distinct from the presenting complaint or past/family/social history.

## pitfalls
Filing basic identifying data (name, age, sex) under past history or the presenting complaint — these belong specifically to the personal-history section of a structured medical history.

## concept_type
definition

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
General medical history

## subtopic
Personal history

## microtopic


## nanotopic


## modules
ZU-MED-108

## article_ids
ART-FND-ZU108-HISTORY-CONSCIOUSNESS

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.4

## exam_weight_by_year
ZU_Y1=0.5

## clinical_relevance
0.6

## academic_relevance
0.55

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Name, age and sex of the patient are considered: a. Family history. b. Past history. c. Personal history. d. History of present illness." ANSWER: c (hand-drawn ink key, option boxed + diagonal stroke through "c", margin "C", Fakous P.P2 Final 2024.pdf p.3 Q17, render-confirmed)

## merge_ids


## rejected_merge_candidate_ids
`find-existing.mjs "personal history"` returned no hit. `docs/Ain-Shams-Source-Imports/concept/ASU-BLS-history-taking-concepts.md` (checked directly, read in full) covers presenting complaint, history of present illness, past history and social history from the same ASU lecture, but has no concept for the personal-history/identifying-data section this ZU question tests — not a duplicate, and this new concept's `related_article_ids`/family is left open for a future author to link if ASU's file is later extended.

## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for this Zagazig lane yet. Cited via question source_citation and original_wording only, per 12-resources.md option 3.

---

# Item

## id
CON-FND-85DEA78ECC1776

## label
Medications for dehydration, malnutrition, cancer and autoimmune disorders are best given by the intravenous route

## canonical_key
injection.iv-route.chronic-disease-medications

## aliases
IV route for fluids and chemotherapy
Intravenous administration indications

## arabic_label


## arabic_aliases


## definition
Conditions such as dehydration, malnutrition, cancer and autoimmune disease often require large fluid volumes, precise dosing, or agents (chemotherapy, biologic immunosuppressants) that are poorly or unpredictably absorbed by other routes, or that need to act rapidly and reliably. The intravenous route delivers medication or fluid directly into the circulation, giving complete bioavailability and rapid, controllable effect, which is why it is preferred for rehydration, nutritional support and these disease-modifying therapies over the intramuscular, subcutaneous or intradermal routes.

## explicit_objective
State that the intravenous route is preferred for the fluids and medications used in dehydration, malnutrition, cancer and autoimmune disease.

## pitfalls
Choosing a slower-absorption route (intramuscular, subcutaneous) for conditions that specifically need rapid, complete and precisely controllable delivery, such as rehydration fluids or chemotherapy.

## concept_type
management

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Injection techniques and routes

## subtopic
Intravenous route

## microtopic


## nanotopic


## modules
ZU-MED-108

## article_ids
ART-FND-ZU108-INJECTIONS

## related_article_ids


## related_concept_ids
CON-FND-EAFA22EE99DD34

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.4

## exam_weight_by_year
ZU_Y1=0.5

## clinical_relevance
0.6

## academic_relevance
0.5

## weight_confidence
0.4

## confidence
0.75

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Medications for dehydration, malnutrition, cancer, autoimmune disorders are best given through the following route of injection: a. Intramuscular b. Intravenous c.Subcutaneous d.Intradermal" ANSWER: b (hand-drawn ink key, option boxed + diagonal stroke through "b", Fakous P.P2 Final 2024.pdf p.3 Q18, render-confirmed)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for this Zagazig lane yet. Cited via question source_citation and original_wording only, per 12-resources.md option 3.

---

# Item

## id
CON-FND-4832D8CFE5BB0C

## label
A patient with no response at all to pain or any external or internal stimulus is comatose

## canonical_key
consciousness.levels.comatose-definition

## aliases
Comatose
Levels of consciousness ladder

## arabic_label


## arabic_aliases


## definition
Level of consciousness is described along a graded ladder from alert (fully aware, responds appropriately) through lethargic/somnolent (drowsy but arousable to voice), obtunded (arousable only by loud stimulation) and stupor/semi-coma (responds only to vigorous, persistent painful stimulation, with an appropriate withdrawal response), down to coma: complete unresponsiveness, with no reaction to pain or to any external or internal stimulus. A patient described as "completely unconscious, no response to pain or any external or internal stimuli" therefore sits at the bottom of this ladder and is called comatose.

## explicit_objective
Place "no response to pain or any stimulus" correctly at the comatose end of the levels-of-consciousness ladder, distinguishing it from lethargic, obtunded and stupor/semi-coma.

## pitfalls
Labelling a patient who still withdraws from pain (stupor/semi-coma) as comatose — true coma requires the complete absence of any response, including to pain.

## concept_type
definition

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Consciousness assessment

## subtopic
Levels of consciousness

## microtopic


## nanotopic


## modules
ZU-MED-108

## article_ids
ART-FND-ZU108-HISTORY-CONSCIOUSNESS

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.45

## exam_weight_by_year
ZU_Y1=0.55

## clinical_relevance
0.7

## academic_relevance
0.55

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"In general examination, if the patient is completely unconscious; no response to pain or any external or internal stimuli, we can say that the patient is: a. Lethargic b. Obtunded c. Comatosed d. Alert" ANSWER: c (hand-drawn ink key, option boxed + diagonal stroke through "c", Fakous P.P2 Final 2024.pdf p.3 Q19, render-confirmed)

## merge_ids


## rejected_merge_candidate_ids
`find-existing.mjs "conscious level"` hit a live CNS concept about meningitis presentation and a MUST paediatric-resuscitation concept mentioning "conscious level" only as one item to check in a resuscitated child — neither defines the alert/lethargic/obtunded/stupor/coma ladder itself; not merged.

## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for this Zagazig lane yet. Cited via question source_citation and original_wording only, per 12-resources.md option 3.

---

# Item

## id
CON-FND-4F08B75975DA41

## label
Intradermal injection is used for TB screening, allergy testing and local anaesthesia, but not for insulin administration

## canonical_key
injection.intradermal.indications-and-insulin-exception

## aliases
Intradermal injection uses
Intradermal versus subcutaneous route for insulin

## arabic_label


## arabic_aliases


## definition
The intradermal route deposits a small volume just under the epidermis, raising a visible wheal, which is exploited whenever the reaction itself needs to be observed at the injection site — the Mantoux tuberculin test, allergy skin testing, and local anaesthesia for minor procedures all rely on this. Insulin, by contrast, needs steady, predictable systemic absorption rather than a visible local reaction, so it is given subcutaneously (not intradermally), making insulin administration the exception among this list of intradermal uses.

## explicit_objective
List TB screening, allergy testing and local anaesthesia as intradermal-route uses, and state that insulin is given subcutaneously, not intradermally.

## pitfalls
Assuming insulin belongs on the intradermal-use list because it is a small-volume subcutaneous-region injection — insulin specifically requires the subcutaneous route for reliable systemic absorption.

## concept_type
management

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Injection techniques and routes

## subtopic
Intradermal route

## microtopic


## nanotopic


## modules
ZU-MED-108

## article_ids
ART-FND-ZU108-INJECTIONS

## related_article_ids


## related_concept_ids
CON-FND-B471BB5E784E3D | CON-FND-5363BC64153A27

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.45

## exam_weight_by_year
ZU_Y1=0.55

## clinical_relevance
0.65

## academic_relevance
0.55

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"The uses of intradermal injection route include all of the following EXCEPT: a. TB screening b. Allergy testing c. Local anesthesia d. Insulin administration." ANSWER: d (hand-drawn ink key, option boxed + diagonal stroke through "d", Fakous P.P2 Final 2024.pdf p.3 Q20, render-confirmed)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for this Zagazig lane yet. Cited via question source_citation and original_wording only, per 12-resources.md option 3.

---

# Item

## id
CON-FND-B25D06E896B012

## label
Vital signs are pulse, temperature, respiratory rate and blood pressure — abdominal examination is not one of them

## canonical_key
vitals.components

## aliases
Vital signs list
Components of vital signs

## arabic_label


## arabic_aliases


## definition
Vital signs are the small set of basic physiological measurements taken to gauge a patient's essential bodily functions at the bedside: pulse (heart rate), blood pressure, temperature and respiratory rate. Abdominal examination is a component of physical examination, not a vital sign — it is a focused clinical assessment, not a basic physiological measurement recorded routinely on every patient encounter.

## explicit_objective
List pulse, blood pressure, temperature and respiratory rate as the vital signs, and distinguish them from physical-examination components such as abdominal examination.

## pitfalls
Treating any routinely performed bedside assessment as a "vital sign" — the term is reserved for the four basic physiological measurements (pulse, BP, temperature, respiratory rate), not for examination manoeuvres like abdominal palpation.

## concept_type
definition

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Vital signs measurement

## subtopic
Vital signs overview

## microtopic


## nanotopic


## modules
ZU-MED-108

## article_ids
ART-FND-ZU108-VITAL-SIGNS

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.4

## exam_weight_by_year
ZU_Y1=0.5

## clinical_relevance
0.6

## academic_relevance
0.5

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Vital signs include all of the following EXCEPT: a. Pulse b. Abdominal examination c. Temperature d. Blood pressure" ANSWER: b (hand-drawn ink key, option boxed + diagonal stroke through "b", Fakous P.P2 Final 2024.pdf p.4 Q21, render-confirmed)

## merge_ids


## rejected_merge_candidate_ids
`find-existing.mjs "vital signs"` hit only a glossary term and unrelated question stems that mention normal vital signs in passing; no existing concept defines the four-component list. Not a duplicate.

## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for this Zagazig lane yet. Cited via question source_citation and original_wording only, per 12-resources.md option 3.

---

# Item

## id
CON-FND-8F82032ECCCA21

## label
Pulse deficit is the difference between the rate of the peripheral (radial) pulse and the apical pulse

## canonical_key
pulse.pulse-deficit.definition

## aliases
Pulse deficit
Peripheral versus apical pulse rate difference

## arabic_label


## arabic_aliases


## definition
In some arrhythmias (classically atrial fibrillation), not every ventricular contraction generates enough stroke volume to produce a palpable peripheral pulse wave, even though it is audible as a heartbeat at the apex. Counting the apical heart rate (by auscultation) and the peripheral (radial) pulse rate simultaneously and subtracting the smaller from the larger gives the pulse deficit — the number of beats per minute that reach the heart but fail to reach the periphery — which is distinct from pulse volume, pulsus bigeminy (an every-other-beat pattern) or pulsus alternans (alternating strong/weak beats).

## explicit_objective
Define pulse deficit as the difference between apical and peripheral pulse rates, and distinguish it from pulse volume, pulsus bigeminy and pulsus alternans.

## pitfalls
Confusing pulse deficit (a rate difference between two simultaneously counted sites) with pulse volume (the strength/amplitude of a single pulse) or with named rhythm patterns like bigeminy and alternans.

## concept_type
definition

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Vital signs measurement

## subtopic
Pulse assessment

## microtopic


## nanotopic


## modules
ZU-MED-108

## article_ids
ART-FND-ZU108-VITAL-SIGNS

## related_article_ids


## related_concept_ids
CON-FND-4F410EC4B72356

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.4

## exam_weight_by_year
ZU_Y1=0.5

## clinical_relevance
0.6

## academic_relevance
0.55

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"The difference between the rate of peripheral and apical pulse is called: A- Pulse deficit B- Pulse volume C- Pulsus bigeminy D- Pulsus alternans" ANSWER: A (hand-drawn ink key, option boxed + diagonal stroke through "A", Fakous P.P2 Final 2024.pdf p.4 Q22, render-confirmed)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for this Zagazig lane yet. Cited via question source_citation and original_wording only, per 12-resources.md option 3.

---

# Item

## id
CON-FND-B471BB5E784E3D

## label
The intradermal injection angle is about 5 to 15 degrees to the skin

## canonical_key
injection.intradermal.angle

## aliases
Intradermal injection angle
Near-parallel injection angle

## arabic_label


## arabic_aliases


## definition
An intradermal injection must deposit its volume in the dermis itself, just beneath the epidermis, rather than in the deeper subcutaneous fat. This is achieved by inserting the needle, bevel up, almost parallel to the skin surface — an angle of about 5 to 15 degrees — which is markedly shallower than the roughly 45-degree angle used for subcutaneous injection or the 70-90 degrees used for intramuscular injection.

## explicit_objective
State that the intradermal injection angle is about 5-15 degrees, the shallowest of the standard injection angles.

## pitfalls
Confusing the intradermal angle (5-15 degrees, nearly parallel) with the steeper subcutaneous (about 45 degrees) or intramuscular (70-90 degrees) angles — a too-steep angle for an intradermal injection deposits the drug in the wrong tissue plane and no wheal forms.

## concept_type
technique

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Injection techniques and routes

## subtopic
Intradermal route

## microtopic


## nanotopic


## modules
ZU-MED-108

## article_ids
ART-FND-ZU108-INJECTIONS

## related_article_ids


## related_concept_ids
CON-FND-4F08B75975DA41

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.4

## exam_weight_by_year
ZU_Y1=0.5

## clinical_relevance
0.55

## academic_relevance
0.55

## weight_confidence
0.4

## confidence
0.75

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"The angle of administration for an intradermal injection is: A- 5 to 15 degrees B- 70 to 90 degrees C- 45 degree D- 90 degree" ANSWER: A (hand-drawn ink key, option boxed, question number circled, Fakous P.P2 Final 2024.pdf p.4 Q23, render-confirmed)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for this Zagazig lane yet. Cited via question source_citation and original_wording only, per 12-resources.md option 3.

---

# Item

## id
CON-FND-E440819B4C4F8B

## label
The Z-track technique is used for intramuscular injection

## canonical_key
injection.im.z-track-technique

## aliases
Z-track injection method
Z-track intramuscular technique

## arabic_label


## arabic_aliases


## definition
The Z-track technique displaces the skin and subcutaneous tissue sideways before needle insertion, injects into the muscle, and only then releases the tissue — so the needle track seals into a "Z" shape as the layers slide back into their normal position, sealing the drug inside the muscle. It is used for intramuscular injections, particularly for drugs that are irritant or that stain the skin if they leak back along a straight needle track (such as iron dextran), to prevent leakage into the subcutaneous tissue.

## explicit_objective
State that the Z-track technique is an intramuscular injection method, used to prevent an irritant drug leaking back along the needle track.

## pitfalls
Associating the Z-track technique with subcutaneous or intravenous injection — it is specifically an intramuscular technique for sealing irritant medication inside the muscle.

## concept_type
technique

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Injection techniques and routes

## subtopic
Intramuscular route

## microtopic


## nanotopic


## modules
ZU-MED-108

## article_ids
ART-FND-ZU108-INJECTIONS

## related_article_ids


## related_concept_ids
CON-FND-17252465B54E65

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.4

## exam_weight_by_year
ZU_Y1=0.5

## clinical_relevance
0.55

## academic_relevance
0.55

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"The Z track technique is used in which route of injection: a.Intravenous b. Intramuscular. c.Subcutaneous d.Intradermal" ANSWER: b (hand-drawn ink key, option boxed + diagonal stroke through "b", question number circled, Fakous P.P2 Final 2024.pdf p.4 Q25, render-confirmed)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for this Zagazig lane yet. Cited via question source_citation and original_wording only, per 12-resources.md option 3.

---

# Item

## id
CON-FND-046F32E1F778EF

## label
Postural hypotension is diagnosed when systolic blood pressure falls by 20 mmHg or more within 2 minutes of standing

## canonical_key
bp.postural-hypotension.diagnostic-threshold

## aliases
Orthostatic hypotension threshold
Postural BP drop criterion

## arabic_label


## arabic_aliases


## definition
When a healthy person stands, reflex vasoconstriction and a modest heart-rate rise normally compensate for the gravitational pooling of blood in the legs, so blood pressure changes only slightly and stabilises within one to two minutes. Postural (orthostatic) hypotension is diagnosed when this compensation fails and systolic blood pressure falls by 20 mmHg or more (or diastolic by 10 mmHg or more, by some conventions) within 2 minutes of standing, distinguishing a pathological drop from the small, physiological fluctuation seen in everyone.

## explicit_objective
State the diagnostic threshold for postural hypotension (systolic BP fall of ≥20 mmHg within 2 minutes of standing).

## pitfalls
Treating any BP fall on standing as postural hypotension — a small physiological drop is normal; the diagnostic threshold specifically requires a fall of 20 mmHg or more (systolic) within 2 minutes.

## concept_type
definition

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Vital signs measurement

## subtopic
Blood pressure measurement pitfalls

## microtopic


## nanotopic


## modules
ZU-MED-108

## article_ids
ART-FND-ZU108-VITAL-SIGNS

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.45

## exam_weight_by_year
ZU_Y1=0.55

## clinical_relevance
0.7

## academic_relevance
0.55

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"In Postural hypotension, systolic blood pressure decreases after a patient has been standing for 2 minutes by: a. ≥20 mmHg. b.≥3 mmHg c. ≥5 mmHg d.≥7 mmHg" ANSWER: a (hand-drawn ink key, option boxed + diagonal stroke through "a", Fakous P.P2 Final 2024.pdf p.4 Q26, render-confirmed)

## merge_ids


## rejected_merge_candidate_ids
`find-existing.mjs "postural hypotension"` hit `docs/Kasr-Source-Imports/concept/208-INT-concepts.md`, a pharmacology concept about first-dose postural hypotension as an alpha1-blocker adverse effect — a different atomic claim (drug side effect, not the diagnostic BP-fall threshold); not merged.

## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for this Zagazig lane yet. Cited via question source_citation and original_wording only, per 12-resources.md option 3.

---

# Item

## id
CON-FND-5363BC64153A27

## label
Subcutaneous injection deposits medication into the fatty layer that lies beneath the dermis

## canonical_key
injection.subcutaneous.definition

## aliases
Subcutaneous injection definition
Fatty-layer injection route

## arabic_label


## arabic_aliases


## definition
The skin is layered as epidermis, then dermis, then a fatty subcutaneous layer above muscle. A subcutaneous injection is defined by which of these layers it targets: the fat layer immediately beneath the dermis, reached at roughly a 45-degree needle angle — shallower than intramuscular injection (which passes through fat into muscle) and deeper than intradermal injection (which stays within the dermis itself).

## explicit_objective
Define subcutaneous injection as delivery into the fatty layer beneath the dermis, and place it between the intradermal and intramuscular routes by depth.

## pitfalls
Describing subcutaneous injection by its needle angle or use case rather than the tissue layer it targets — the defining fact is the fatty layer beneath the dermis, above muscle.

## concept_type
definition

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Injection techniques and routes

## subtopic
Subcutaneous route

## microtopic


## nanotopic


## modules
ZU-MED-108

## article_ids
ART-FND-ZU108-INJECTIONS

## related_article_ids


## related_concept_ids
CON-FND-4F08B75975DA41

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.4

## exam_weight_by_year
ZU_Y1=0.5

## clinical_relevance
0.55

## academic_relevance
0.55

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"An injection into the fatty layer which lies beneath the dermis is called: A- Intravenous B- Intramuscular C-Subcutaneous D-Intradermal" ANSWER: C (hand-drawn ink key, option boxed + diagonal stroke through "C", Fakous P.P2 Final 2024.pdf p.4 Q27, render-confirmed)

## merge_ids


## rejected_merge_candidate_ids
`find-existing.mjs "subcutaneous injection"` hit `docs/Ain-Shams-Source-Imports/question/ASU-IMM-hegazy-ch3-mcq.md`, an immunology question about lymphocyte activation site after a subcutaneous injection — a different topic (immune trafficking, not injection-technique anatomy); not merged.

## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for this Zagazig lane yet. Cited via question source_citation and original_wording only, per 12-resources.md option 3.

---

# Item

## id
CON-FND-17252465B54E65

## label
Complications of intramuscular injection include muscle fibrosis and contracture, abscess at the injection site, and nerve injury

## canonical_key
injection.im.complications

## aliases
IM injection complications
Intramuscular injection risks

## arabic_label


## arabic_aliases


## definition
Intramuscular injection carries recognised local complications: muscle fibrosis and contracture from repeated injection into the same site, abscess formation from local infection or an irritant drug, and nerve injury (classically the sciatic nerve if a gluteal injection is placed too medially/inferiorly, or the femoral nerve with a misplaced vastus lateralis injection). All of these are accepted complications of the route, which is why correct site selection (ventrogluteal or vastus lateralis, avoiding the danger zones) and site rotation are taught alongside the technique.

## explicit_objective
List muscle fibrosis/contracture, abscess and nerve injury as recognised complications of intramuscular injection.

## pitfalls
Assuming intramuscular injection is complication-free because it is routine — incorrect site selection or repeated use of one site carries real risks of fibrosis, abscess and nerve injury.

## concept_type
management

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Injection techniques and routes

## subtopic
Intramuscular route

## microtopic


## nanotopic


## modules
ZU-MED-108

## article_ids
ART-FND-ZU108-INJECTIONS

## related_article_ids


## related_concept_ids
CON-FND-E440819B4C4F8B

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.4

## exam_weight_by_year
ZU_Y1=0.5

## clinical_relevance
0.6

## academic_relevance
0.55

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Complications of intramuscular injection include: A-Muscle fibrosis and contracture B-Abscess at the injection site. C-Nerve injury. D-All of the above" ANSWER: D (hand-drawn ink key, option boxed + diagonal stroke through "D", margin "D", Fakous P.P2 Final 2024.pdf p.4 Q29, render-confirmed)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for this Zagazig lane yet. Cited via question source_citation and original_wording only, per 12-resources.md option 3.

---

# Item

## id
CON-FND-4F410EC4B72356

## label
The brachial pulse is felt at the medial side of the antecubital fossa, just medial to the biceps tendon insertion

## canonical_key
pulse.brachial.location

## aliases
Brachial pulse location
Antecubital fossa pulse landmark

## arabic_label


## arabic_aliases


## definition
The brachial artery runs down the medial arm and crosses the antecubital fossa before dividing into the radial and ulnar arteries; at the fossa it lies just medial to the biceps brachii tendon, which is why the tendon is used as the landmark to find the pulse (and why it is auscultated there for blood pressure measurement). This distinguishes the brachial pulse's location from the radial pulse (lateral wrist), carotid pulse (neck, lateral to the larynx) and femoral pulse (groin, midpoint of the inguinal ligament).

## explicit_objective
State that the brachial pulse is palpated medial to the biceps tendon in the antecubital fossa, and distinguish this from the radial, carotid and femoral pulse sites.

## pitfalls
Confusing the antecubital-fossa pulse with the radial pulse — the antecubital fossa (medial to the biceps tendon) is specifically the brachial pulse's location, used for blood pressure auscultation.

## concept_type
anatomy

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Vital signs measurement

## subtopic
Pulse assessment

## microtopic


## nanotopic


## modules
ZU-MED-108

## article_ids
ART-FND-ZU108-VITAL-SIGNS

## related_article_ids


## related_concept_ids
CON-FND-8F82032ECCCA21

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.4

## exam_weight_by_year
ZU_Y1=0.5

## clinical_relevance
0.6

## academic_relevance
0.6

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which pulsation is felt at the medial side of the antecubital fossa, just medial to the tendinous insertion of the biceps: A- Radial pulse B- Carotid pulse C-Brachial pulse D- Femoral pulse" ANSWER: C (hand-drawn ink key, option boxed + diagonal stroke through "C", Fakous P.P2 Final 2024.pdf p.4 Q30, render-confirmed)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for this Zagazig lane yet. Cited via question source_citation and original_wording only, per 12-resources.md option 3.

---

# Item

## id
CON-FND-EAFA22EE99DD34

## label
The intravenous route is the fastest way to inject a medication

## canonical_key
injection.route.fastest-onset-iv

## aliases
Fastest injection route
IV route onset speed

## arabic_label


## arabic_aliases


## definition
Because an intravenous injection delivers medication directly into the bloodstream, it bypasses absorption entirely and achieves 100% bioavailability with the fastest possible onset of action — faster than intramuscular, subcutaneous or intradermal injection, all of which must first be absorbed from the tissue into local capillaries before reaching the systemic circulation. This is why the IV route is chosen whenever the fastest possible drug effect is required, such as in emergencies.

## explicit_objective
State that the intravenous route has the fastest onset of action among the standard injection routes because it bypasses tissue absorption.

## pitfalls
Assuming intramuscular injection is equally fast because it is often used in emergencies — IM still requires absorption from muscle tissue into the bloodstream, which is inherently slower than direct IV delivery.

## concept_type
definition

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Injection techniques and routes

## subtopic
Comparing injection routes

## microtopic


## nanotopic


## modules
ZU-MED-108

## article_ids
ART-FND-ZU108-INJECTIONS

## related_article_ids


## related_concept_ids
CON-FND-85DEA78ECC1776

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.4

## exam_weight_by_year
ZU_Y1=0.5

## clinical_relevance
0.55

## academic_relevance
0.5

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"The fastest way to inject a medication is: A- Intravenous B- Intramuscular C-Subcutaneous D-Intradermal" ANSWER: A (hand-drawn ink key, option boxed + diagonal stroke through "A", Fakous P.P2 Final 2024.pdf p.4 Q31, render-confirmed)

## merge_ids


## rejected_merge_candidate_ids
`find-existing.mjs "fastest route"` returned no hit; checked separately for a route-comparison concept and found none scoped to injection-route onset speed specifically.

## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for this Zagazig lane yet. Cited via question source_citation and original_wording only, per 12-resources.md option 3.
