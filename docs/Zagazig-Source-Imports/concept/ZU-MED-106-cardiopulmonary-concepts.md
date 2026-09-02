<!--
  ZU-MED-106 (Cardiopulmonary) — 26 NEW concepts minted for the 36-SBA cluster
  authored from `Fakous CPS Final 2024.pdf` (Zagazig's Fakous campus, Faculty
  of Medicine — source provenance ruled usable by the chief of staff,
  2026-09-01; see LANE-CARD.md §7). Search-before-mint run against
  `find-existing.mjs` for every concept below; ids minted with
  `mint-concept-id.mjs`, checked against server/data/medical-library-v1.json
  (0 collisions). No evidence-store `src_…` resource exists yet for this PDF
  (not in `corpus-source-index.json`, 267 sources checked, 0 "fakous"
  matches) — per 12-resources.md's weakest-but-honest option 3,
  `resource_ids`/`atomic_claim_ids` are left blank here and the citation
  lives only in each question's `source_citation` (see the question batch).

  4 live-partial and 5 pending-partial hits from the same triage are handled
  as sparse overlays, not here: see
  `concept/ZU-MED-106-cardiopulmonary-live-overlays.md` and
  `pending-live/ZU-MED-106-cardiopulmonary-pending-overlays.md`.

  Import: Admin › Concepts › Import.
-->

# Item

## id
CON-RES-955D96B44C894B

## label
The thyrocervical trunk is ligated to control profuse bleeding from the inferior thyroid artery during neck surgery

## canonical_key
thyrocervicaltrunk.ligation-for-inferior-thyroid-bleeding

## aliases
Thyrocervical trunk ligation
Inferior thyroid artery bleeding control
Surgical control of thyroid bleeding

## arabic_label


## arabic_aliases


## definition
The inferior thyroid artery, the vessel most often torn during thyroidectomy or neck dissection near the thyroid gland, arises from the thyrocervical trunk — a short branch of the first part of the subclavian artery. Because the inferior thyroid artery itself is short and retracts into the deep neck once torn, proximal control for profuse bleeding from it is achieved by ligating the thyrocervical trunk rather than chasing the bleeding vessel directly. This is distinct from ligating the transverse cervical or ascending cervical arteries (also thyrocervical-trunk branches, but not the source of thyroid bleeding) or the costocervical trunk (a separate subclavian branch supplying the posterior neck and upper two intercostal spaces, unrelated to the thyroid).

## explicit_objective
State that the thyrocervical trunk, not a distractor branch of the subclavian or costocervical trunk, is ligated to control bleeding from the inferior thyroid artery.

## pitfalls
Confusing the thyrocervical trunk (gives the inferior thyroid, transverse cervical and suprascapular arteries) with the costocervical trunk (gives the superior intercostal and deep cervical arteries) — both are short subclavian branches in the same region, but only the thyrocervical trunk is upstream of the inferior thyroid artery.

## concept_type
clinical_application

## status
Draft

## support_mode
direct_statement

## subject
resp

## primary_node_id


## secondary_node_ids


## topic
Head and neck anatomy

## subtopic
Neck vasculature

## microtopic
Thyrocervical trunk

## nanotopic


## modules
ZU-MED-106

## article_ids
ART-RES-ZU106-UPPER-AIRWAY-ANATOMY

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
0.7

## academic_relevance
0.6

## weight_confidence
0.4

## confidence
0.75

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"During surgery on a 56-year-old man for a squamous cell carcinoma of the neck, a surgeon notices profuse bleeding from the inferior thyroid artery. Which of the following arteries must be ligated immediately to stop bleeding? a) Transverse cervical artery b) Thyrocervical trunk c) Costocervical trunk d) Ascending cervical artery" ANSWER: b (hand-drawn-ink key, Fakous CPS Final 2024.pdf p.2 Q2)

## merge_ids


## rejected_merge_candidate_ids
`find-existing.mjs "thyrocervical"` hit a pending Alexandria concept (AU-MED-106-anatomy, canonical_key `thyrocervical-trunk.and-external-carotid-branches`) about the trunk's own branch list — a different fact/objective (enumeration vs surgical ligation), not merged; noted here per 00-START-HERE §4.

## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper; a standard head-and-neck anatomy textbook citation would strengthen this before publication.

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
resourceIds: No evidence-store src_ id exists for Fakous CPS Final 2024.pdf yet (not in corpus-source-index.json); cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-RES-B7F72DE965803C

## label
Swelling of the sphenoethmoidal recess blocks drainage of the sphenoid sinus

## canonical_key
sphenoethmoidalrecess.drains-sphenoid-sinus

## aliases
Sphenoethmoidal recess
Sphenoid sinus drainage
Paranasal sinus openings

## arabic_label


## arabic_aliases


## definition
The sphenoethmoidal recess is a narrow space in the roof of the nasal cavity, above the superior concha, into which the sphenoid sinus alone drains. This distinguishes it from the middle meatus, which receives the frontal sinus, the anterior and middle ethmoidal cells and the maxillary sinus, and from the superior meatus, which receives only the posterior ethmoidal cells. Mucosal swelling confined to the sphenoethmoidal recess therefore obstructs the sphenoid sinus specifically, producing posterior nasal symptoms rather than the anterior/middle-meatus pattern seen with frontal or maxillary sinus disease.

## explicit_objective
Name the sphenoid sinus as the paranasal sinus that drains through the sphenoethmoidal recess, distinct from the anterior, middle and posterior ethmoidal cells and the frontal/maxillary sinuses.

## pitfalls
Assuming any posterior nasal drainage point empties an ethmoidal air cell — only the posterior ethmoidal cells open into the superior meatus; the sphenoethmoidal recess, further back still, is reserved for the sphenoid sinus alone.

## concept_type
structural_description

## status
Draft

## support_mode
direct_statement

## subject
resp

## primary_node_id


## secondary_node_ids


## topic
Head and neck anatomy

## subtopic
Nose and paranasal sinuses

## microtopic
Sphenoid sinus

## nanotopic


## modules
ZU-MED-106

## article_ids
ART-RES-ZU106-UPPER-AIRWAY-ANATOMY

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
0.6

## academic_relevance
0.65

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"A 53-year-old man has difficulty with breathing through his nose. On examination, his physician finds that he has swelling of the mucous membranes of the sphenoethmoidal recess. Which opening of the paranasal sinuses is most likely plugged? a) Middle ethmoidal sinus b) Sphenoid sinus c) Posterior ethmoidal sinus d) Anterior ethmoidal sinus" ANSWER: b (hand-drawn-ink key, Fakous CPS Final 2024.pdf p.2 Q4)

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
resourceIds: No evidence-store src_ id exists for Fakous CPS Final 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.

---

# Item

## id
CON-RES-6012F0954E7322

## label
An inhaled foreign body in a young child is most likely to lodge in the right main bronchus

## canonical_key
inhaledforeignbody.lodges-in-right-main-bronchus

## aliases
Foreign body aspiration
Right main bronchus anatomy
Bronchial foreign body lodgement

## arabic_label


## arabic_aliases


## definition
The right main bronchus is wider, shorter and more vertically oriented (a straighter continuation of the trachea's long axis) than the left main bronchus, which is narrower, longer and more oblique because it must pass beneath the aortic arch to reach the left lung. An inhaled foreign body therefore follows the path of least resistance and lodges in the right main bronchus far more often than the left, in both children and adults. This same anatomical asymmetry is why a misplaced endotracheal tube most often intubates the right main bronchus selectively.

## explicit_objective
State that an inhaled foreign body most often lodges in the right main bronchus, and give the anatomical reason (wider, shorter, more vertical than the left).

## pitfalls
Assuming symmetry between the two main bronchi — the left is longer and more oblique specifically because it crosses beneath the aortic arch, not because of any difference in the lungs themselves.

## concept_type
clinical_application

## status
Draft

## support_mode
direct_statement

## subject
resp

## primary_node_id


## secondary_node_ids


## topic
Respiratory anatomy

## subtopic
Trachea and main bronchi

## microtopic
Right vs left main bronchus

## nanotopic


## modules
ZU-MED-106

## article_ids
ART-RES-ZU106-UPPER-AIRWAY-ANATOMY

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
0.6

## exam_weight_by_year
ZU_Y1=0.65

## clinical_relevance
0.75

## academic_relevance
0.6

## weight_confidence
0.4

## confidence
0.85

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"A 3-year-old male child with sudden cyanosis and dyspnea, during bronchoscopy, where is an inhaled foreign body expected most likely to be lodged causing this obstruction? a) Right main bronchus b) Left main bronchus c) Left superior lobar bronchus d) Right superior lobar bronchus" ANSWER: a (hand-drawn-ink key, Fakous CPS Final 2024.pdf p.2 Q5)

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
resourceIds: No evidence-store src_ id exists for Fakous CPS Final 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.

---

# Item

## id
CON-RES-2B6FCEB91A0904

## label
Thoracic duct injury causes lymph to accumulate in the pleural cavity as chylothorax

## canonical_key
thoracicduct.injury-causes-chylothorax

## aliases
Chylothorax
Thoracic duct injury
Lymph accumulation in pleural cavity

## arabic_label


## arabic_aliases


## definition
The thoracic duct is the main lymphatic channel draining most of the body below the diaphragm and the left side above it, running through the thorax alongside the oesophagus and aorta before draining into the left venous angle. Trauma that tears the thoracic duct lets chyle (lymph rich in absorbed fat) leak into the pleural cavity, a condition named chylothorax — distinct from pleurisy (inflammation of the pleura, no fluid-type implication), lymphedema (lymph accumulation in tissue, not a cavity) and pyothorax/empyema (pus, from infection, not lymph).

## explicit_objective
Name chylothorax as the term for lymph accumulating in the pleural cavity after thoracic duct injury, distinct from pleurisy, lymphedema and pyothorax.

## pitfalls
Confusing chylothorax with pyothorax (empyema) — both are pleural-cavity collections, but chylothorax is lymph/chyle from duct injury, while pyothorax is pus from infection; the fluid's origin, not just its location, is what the terms distinguish.

## concept_type
clinical_application

## status
Draft

## support_mode
direct_statement

## subject
resp

## primary_node_id


## secondary_node_ids


## topic
Thoracic anatomy

## subtopic
Thoracic duct and lymphatics

## microtopic
Chylothorax

## nanotopic


## modules
ZU-MED-106

## article_ids
ART-RES-ZU106-UPPER-AIRWAY-ANATOMY

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
"A 28-year-old man presented with severe trauma associated with that the thoracic duct was accidentally damaged. The resulting accumulation of lymph in pleural cavity is referred to which of the following? a) Pleurisy b) Chylothorax c) Lymphedema d) Pyothorax" ANSWER: b (hand-drawn-ink key, Fakous CPS Final 2024.pdf p.2 Q6)

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
resourceIds: No evidence-store src_ id exists for Fakous CPS Final 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.

---

# Item

## id
CON-RES-27E08645FB1ED3

## label
The piriform recess is a feature of the laryngopharynx, distinct from the tonsils and adenoid of the oropharynx and nasopharynx

## canonical_key
laryngopharynx.piriform-recess-feature

## aliases
Piriform recess
Laryngopharynx features
Pharyngeal recesses

## arabic_label


## arabic_aliases


## definition
The pharynx is divided into three parts, each with characteristic features: the nasopharynx carries the adenoid (pharyngeal tonsil) and the tubal tonsil around the pharyngotympanic tube opening; the oropharynx carries the palatine tonsils in the tonsillar fossae; and the laryngopharynx (hypopharynx) carries the piriform recess (fossa), a mucosal gutter on each side of the laryngeal inlet where a swallowed foreign body most often lodges. Each of these named lymphoid or mucosal features therefore identifies which part of the pharynx a question is describing.

## explicit_objective
Identify the piriform recess as a feature of the laryngopharynx, and distinguish it from the adenoid/tubal tonsil (nasopharynx) and palatine tonsil (oropharynx).

## pitfalls
Treating all pharyngeal named structures as interchangeable landmarks — each belongs to one specific part of the pharynx, and a question naming one is testing which part, not the structure's function alone.

## concept_type
structural_description

## status
Draft

## support_mode
direct_statement

## subject
resp

## primary_node_id


## secondary_node_ids


## topic
Head and neck anatomy

## subtopic
Pharynx

## microtopic
Laryngopharynx

## nanotopic


## modules
ZU-MED-106

## article_ids
ART-RES-ZU106-UPPER-AIRWAY-ANATOMY

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
0.5

## academic_relevance
0.65

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following is a feature of laryngopharynx? a) Adenoid b) Tubal tonsil c) Palatine tonsil d) Piriform recess" ANSWER: d (hand-drawn-ink key, Fakous CPS Final 2024.pdf p.2 Q7)

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
resourceIds: No evidence-store src_ id exists for Fakous CPS Final 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.

---

# Item

## id
CON-RES-17414C8C9D554C

## label
The sphenopalatine artery is the main source of bleeding from Little's area of the nasal septum

## canonical_key
littlesarea.sphenopalatine-artery-source

## aliases
Little's area
Sphenopalatine artery epistaxis
Anterior epistaxis

## arabic_label


## arabic_aliases


## definition
Little's area is a vascular plexus on the anterior part of the nasal septum where branches of the sphenopalatine, anterior ethmoidal, greater palatine and superior labial arteries anastomose (Kiesselbach's plexus). The sphenopalatine artery, a terminal branch of the maxillary artery, is the dominant contributor and the main source of anterior epistaxis originating here, which is why anterior rhinoscopy revealing bleeding from the anterior septum points to it rather than to the inferior labial, lesser palatine or anterior ethmoidal arteries alone.

## explicit_objective
Name the sphenopalatine artery as the main source of bleeding from Little's area, among its anastomotic partners in Kiesselbach's plexus.

## pitfalls
Naming any one of the plexus's other contributing arteries (anterior ethmoidal, greater/lesser palatine, superior/inferior labial) as the dominant source — the sphenopalatine artery is specifically the largest and most clinically significant contributor.

## concept_type
clinical_application

## status
Draft

## support_mode
direct_statement

## subject
resp

## primary_node_id


## secondary_node_ids


## topic
Head and neck anatomy

## subtopic
Nasal septum vasculature

## microtopic
Little's area

## nanotopic


## modules
ZU-MED-106

## article_ids
ART-RES-ZU106-UPPER-AIRWAY-ANATOMY

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
0.6

## exam_weight_by_year
ZU_Y1=0.65

## clinical_relevance
0.75

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
"20 years old man entered emergency room with bleeding from his right nostril. On examination, he looks well. Anterior rhinoscopy reveals bleeding from the anterior part of the nasal septum corresponding to Little's area. Which of the following arteries is the main source of bleeding? a) Inferior labial b) Sphenopalatine c) Lesser palatine d) Anterior ethmoid" ANSWER: b (hand-drawn-ink key, Fakous CPS Final 2024.pdf p.3 Q9)

## merge_ids


## rejected_merge_candidate_ids
`find-existing.mjs "sphenopalatine"` hit a pending Kasr concept about the sphenopalatine ganglion (102-INT-mcq) — a different structure (autonomic ganglion vs artery), not merged.

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
resourceIds: No evidence-store src_ id exists for Fakous CPS Final 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.

---

# Item

## id
CON-CVS-59209DA1538EF3

## label
Stimulating the carotid buffer (baroreceptor) nerve produces reflex hypotension and bradycardia

## canonical_key
carotidbuffernerve.stimulation-causes-reflex-hypotension-bradycardia

## aliases
Carotid buffer nerve
Baroreceptor reflex
Carotid sinus nerve

## arabic_label


## arabic_aliases


## definition
The carotid buffer (baroreceptor) nerve carries afferent signals from stretch receptors in the carotid sinus wall to the vasomotor and cardio-inhibitory centres in the medulla. Rising arterial pressure stretches the carotid sinus, increasing afferent firing along this nerve; the medulla responds by inhibiting sympathetic (vasomotor and cardio-stimulatory) outflow and increasing vagal tone, producing reflex hypotension and bradycardia that buffers the pressure rise back down. Stimulating the nerve directly (experimentally or clinically) reproduces this inhibitory reflex — it does not send excitatory impulses to the vasomotor or cardio-stimulatory centres, which is the opposite of what the nerve does.

## explicit_objective
State that carotid buffer nerve stimulation produces reflex hypotension and bradycardia via central inhibition of sympathetic outflow, not excitatory signalling.

## pitfalls
Reversing the reflex's direction — the nerve's signal inhibits the vasomotor/cardio-stimulatory centres and raises vagal tone, it does not excite them; a rise in its firing rate always corresponds to a fall in pressure and heart rate, never a rise.

## concept_type
mechanism

## status
Draft

## support_mode
direct_statement

## subject
cvs

## primary_node_id


## secondary_node_ids


## topic
Cardiovascular regulation

## subtopic
Baroreceptor reflex

## microtopic
Carotid buffer nerve

## nanotopic


## modules
ZU-MED-106

## article_ids
ART-CVS-ZU106-SHOCK-AND-CARDIAC-CYCLE

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
0.6

## exam_weight_by_year
ZU_Y1=0.65

## clinical_relevance
0.5

## academic_relevance
0.75

## weight_confidence
0.4

## confidence
0.85

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Regarding buffer nerves of the carotid baroreceptors, which one of the following occurs by their stimulation? a) Excitatory impulses to vasomotor center b) Reflex hypotension and bradycardia c) Reflex hypertension and tachycardia d) Excitatory impulses to cardio-stimulatory center" ANSWER: b (hand-drawn-ink key, Fakous CPS Final 2024.pdf p.3 Q10)

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
resourceIds: No evidence-store src_ id exists for Fakous CPS Final 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.

---

# Item

## id
CON-CVS-95D22A5CE0786A

## label
Neurogenic shock is best described as vasodilation of skeletal muscle blood vessels from loss of sympathetic vascular tone

## canonical_key
neurogenicshock.skeletal-muscle-vasodilation-mechanism

## aliases
Neurogenic shock
Loss of sympathetic vascular tone
Distributive shock mechanism

## arabic_label


## arabic_aliases


## definition
Neurogenic shock follows sudden loss of sympathetic outflow to blood vessels — typically from high spinal cord injury or deep general/spinal anaesthesia — which removes the tonic vasoconstrictor drive that normally maintains resistance in skeletal-muscle and other peripheral vascular beds. The result is widespread vasodilation, most significantly of skeletal muscle blood vessels (the largest vascular bed under sympathetic tone), pooling blood in the periphery and dropping venous return and cardiac output. This mechanism — loss of vasoconstrictor tone — is distinct from septic shock (vasomotor centre stimulated by bacterial endotoxins, a different trigger for a similar vasodilated end state) and from hypovolaemic/cardiogenic shock (increased sympathetic activity and vasoconstriction, the opposite response).

## explicit_objective
Describe neurogenic shock as vasodilation of skeletal muscle blood vessels caused by loss of sympathetic vascular tone, distinct from the vasomotor-centre stimulation mechanism of septic shock.

## pitfalls
Selecting "increased sympathetic activity" or "vasoconstriction of arterioles" for neurogenic shock — these describe the body's compensatory response in hypovolaemic shock, the opposite of neurogenic shock's underlying loss-of-tone mechanism.

## concept_type
mechanism

## status
Draft

## support_mode
direct_statement

## subject
cvs

## primary_node_id


## secondary_node_ids


## topic
Shock

## subtopic
Distributive shock

## microtopic
Neurogenic shock

## nanotopic


## modules
ZU-MED-106

## article_ids
ART-CVS-ZU106-SHOCK-AND-CARDIAC-CYCLE

## related_article_ids
ART-CVS-ZU106-SHOCK-AND-CARDIAC-CYCLE

## related_concept_ids
CON-CVS-1AD44A19DA47AD

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.6

## exam_weight_by_year
ZU_Y1=0.65

## clinical_relevance
0.65

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following best describes neurogenic shock? a) Vasoconstriction of arterioles b) Increased sympathetic activity c) Vasodilation of skeletal muscle blood vessels d) Stimulation of vasomotor center by bacterial endotoxins" ANSWER: c (hand-drawn-ink key, Fakous CPS Final 2024.pdf p.3 Q11)

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
resourceIds: No evidence-store src_ id exists for Fakous CPS Final 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.
relatedConceptIds: CON-CVS-1AD44A19DA47AD (live, "microvascular change in late refractory shock") shares this cluster's shock-mechanism theme without testing the same fact — linked, not merged; see the live-overlays file for the sparse ZU overlay written against it directly.

---

# Item

## id
CON-CVS-A2C83B11C157D7

## label
The second heart sound is heard during isometric relaxation of the cardiac cycle

## canonical_key
isometricrelaxation.second-heart-sound-timing

## aliases
Isometric relaxation
Second heart sound timing
Cardiac cycle phases

## arabic_label


## arabic_aliases


## definition
Isometric (isovolumetric) relaxation is the phase immediately after ventricular ejection ends, when the semilunar (aortic and pulmonary) valves close while the atrioventricular valves are still shut, so ventricular volume stays constant while pressure falls sharply. The second heart sound (S2) is generated by the closure of the semilunar valves and is therefore heard at the very start of this phase — distinct from the first heart sound (S1, mitral/tricuspid closure at the start of isovolumetric contraction), the third heart sound (S3, rapid ventricular filling) and the fourth heart sound (S4, atrial contraction).

## explicit_objective
State that the second heart sound marks the onset of isometric (isovolumetric) relaxation, produced by semilunar valve closure.

## pitfalls
Confusing isometric relaxation with isometric contraction — both are isovolumetric phases, but contraction (start of systole, S1) closes the AV valves, while relaxation (start of diastole, S2) closes the semilunar valves; the two heart sounds mark opposite ends of systole.

## concept_type
mechanism

## status
Draft

## support_mode
direct_statement

## subject
cvs

## primary_node_id


## secondary_node_ids


## topic
Cardiac physiology

## subtopic
Cardiac cycle

## microtopic
Heart sounds

## nanotopic


## modules
ZU-MED-106

## article_ids
ART-CVS-ZU106-SHOCK-AND-CARDIAC-CYCLE

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
0.6

## exam_weight_by_year
ZU_Y1=0.65

## clinical_relevance
0.5

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.85

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"During isometric relaxation phase of cardiac cycle, which one of the following is heard? a) Second heart sound b) First heart sound c) Third heart sound d) Fourth heart sound" ANSWER: a (hand-drawn-ink key, Fakous CPS Final 2024.pdf p.3 Q12)

## merge_ids


## rejected_merge_candidate_ids
`find-existing.mjs "second heart sound"` hit a pending SYS-CVS concept about fixed splitting of S2 in ASD — a different fact (pathological splitting vs normal cardiac-cycle timing), not merged.

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
resourceIds: No evidence-store src_ id exists for Fakous CPS Final 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.

---

# Item

## id
CON-CVS-1EECD34B9D29C7

## label
Capillary shift restores plasma volume in the 24 hours after haemorrhage

## canonical_key
posthemorrhage.capillary-shift-restores-plasma-volume

## aliases
Capillary shift mechanism
Post-haemorrhage plasma volume restoration
Fluid shift after bleeding

## arabic_label


## arabic_aliases


## definition
After acute haemorrhage, the fall in capillary hydrostatic pressure (from reduced blood volume and arteriolar vasoconstriction) tips the Starling balance in the capillaries so that interstitial fluid shifts back into the vascular space — the capillary shift mechanism — restoring plasma volume within roughly 24 to 48 hours, well before red cell mass is replaced. This is the dominant mechanism of early plasma volume restoration, distinct from increased angiotensin II secretion (raises pressure and promotes renal sodium/water retention, a slower renal contribution), venous dilation (would reduce, not restore, effective circulating volume) and decreased thirst (thirst is stimulated, not decreased, after haemorrhage, to promote water intake).

## explicit_objective
Name the capillary shift mechanism as the process restoring plasma volume in the first 24 hours after haemorrhage, and explain the Starling-pressure basis for it.

## pitfalls
Selecting a renal or endocrine mechanism (angiotensin II, ADH) as the fastest post-haemorrhage volume restorer — these act over hours to days via sodium and water retention, while the capillary shift is the earliest and largest contributor within the first day.

## concept_type
mechanism

## status
Draft

## support_mode
direct_statement

## subject
cvs

## primary_node_id


## secondary_node_ids


## topic
Cardiovascular regulation

## subtopic
Response to haemorrhage

## microtopic
Capillary shift mechanism

## nanotopic


## modules
ZU-MED-106

## article_ids
ART-CVS-ZU106-SHOCK-AND-CARDIAC-CYCLE

## related_article_ids


## related_concept_ids
CON-CVS-754E928F0B1027

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.6

## exam_weight_by_year
ZU_Y1=0.65

## clinical_relevance
0.7

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"24 hours after hemorrhage, which of the following mechanism causes restoration of plasma volume? a) Decreased angiotensin II secretion b) Dilations of the veins c) Capillary shift mechanism d) Decreased thirst sensation" ANSWER: c (hand-drawn-ink key, Fakous CPS Final 2024.pdf p.3 Q13)

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
resourceIds: No evidence-store src_ id exists for Fakous CPS Final 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.

---

# Item

## id
CON-CVS-754E928F0B1027

## label
Angiotensin II stimulates thirst sensation, increasing water intake as part of blood pressure regulation

## canonical_key
angiotensinii.stimulates-thirst-sensation

## aliases
Angiotensin II effects
Thirst regulation
Renin-angiotensin system

## arabic_label


## arabic_aliases


## definition
Angiotensin II, generated by the renin-angiotensin system in response to falling blood pressure or renal perfusion, raises arterial pressure through several coordinated actions — one of which is stimulating the thirst centre in the hypothalamus, increasing water intake to help restore circulating volume. This is separate from, not a substitute for, its direct arteriolar vasoconstrictor effect (the opposite of a vasodilator effect), its facilitation (not inhibition) of noradrenaline release from postganglionic sympathetic neurons, and its stimulation (not inhibition) of antidiuretic hormone secretion from the posterior pituitary — angiotensin II's actions are uniformly pressure-raising and volume-conserving, never the reverse.

## explicit_objective
State that angiotensin II stimulates thirst sensation as one of its several pressure-raising, volume-conserving actions, distinct from a vasodilator or inhibitory effect.

## pitfalls
Reversing any single angiotensin II action to its opposite (vasodilator instead of vasoconstrictor, inhibits instead of facilitates noradrenaline release, inhibits instead of stimulates ADH) — every action of angiotensin II raises pressure or conserves volume, none does the opposite.

## concept_type
mechanism

## status
Draft

## support_mode
direct_statement

## subject
cvs

## primary_node_id


## secondary_node_ids


## topic
Cardiovascular regulation

## subtopic
Renin-angiotensin system

## microtopic
Angiotensin II actions

## nanotopic


## modules
ZU-MED-106

## article_ids
ART-CVS-ZU106-SHOCK-AND-CARDIAC-CYCLE

## related_article_ids


## related_concept_ids
CON-CVS-1EECD34B9D29C7

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.6

## exam_weight_by_year
ZU_Y1=0.65

## clinical_relevance
0.65

## academic_relevance
0.75

## weight_confidence
0.4

## confidence
0.85

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Renin-angiotensin system has a vital role in regulating arterial blood pressure, what is the effect of angiotensin II? a) Has a strong direct arteriolar vasodilator effect b) Inhibits noradrenaline release from postganglionic sympathetic c) Stimulates thirst sensation which increases water intake d) Inhibits antidiuretic hormone secretion from the posterior pituitary" ANSWER: c (hand-drawn-ink key, Fakous CPS Final 2024.pdf p.3-4 Q14/Q17 — identical question printed twice, same key both times)

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
resourceIds: No evidence-store src_ id exists for Fakous CPS Final 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.
duplicateQuestion: Q14 and Q17 in the source are the identical question with the identical hand-drawn key — authored as two separate question records (both against this one concept) per the seed, not collapsed, since both are real distinct rows in the printed paper.

---

# Item

## id
CON-CVS-DA13298B79C518

## label
The hydrostatic indifferent point is normally 5-7 cm below the diaphragm

## canonical_key
hydrostaticindifferentpoint.definition-and-location

## aliases
Hydrostatic indifferent point
Venous pressure reference point

## arabic_label


## arabic_aliases


## definition
The hydrostatic indifferent point is the level in the venous system at which pressure does not change with posture (standing versus lying), because it is the point about which the venous system's hydrostatic column effectively pivots. In a person of average height it sits normally about 5-7 cm below the level of the diaphragm — not at zero pressure, and not fixed in one absolute anatomical plane regardless of body position. Its position can shift: it moves downward, for instance, when the capacity of the leg veins is reduced (compression stockings, muscle pump activity), and its behaviour during swimming (immersion redistributing the pressure column) is a distinct, commonly tested application of the same concept.

## explicit_objective
State that the hydrostatic indifferent point sits normally 5-7 cm below the diaphragm, and distinguish this from a fixed zero-pressure point.

## pitfalls
Assuming the hydrostatic indifferent point is where venous pressure is zero — pressure there is simply posture-independent, not zero; and assuming its level never moves — leg-vein capacity and immersion both shift it.

## concept_type
definition

## status
Draft

## support_mode
direct_statement

## subject
cvs

## primary_node_id


## secondary_node_ids


## topic
Cardiovascular physiology

## subtopic
Venous system

## microtopic
Hydrostatic indifferent point

## nanotopic


## modules
ZU-MED-106

## article_ids
ART-CVS-ZU106-SHOCK-AND-CARDIAC-CYCLE

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
0.45

## academic_relevance
0.75

## weight_confidence
0.4

## confidence
0.75

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Regarding hydrostatic indifferent point. Which one of the following is best described it? a) The pressure at its level is zero b) Shifted downward during swimming c) Moves downwards if the capacity of the leg veins decreased d) Is normally 5-7 cm below the diaphragm" ANSWER: d (hand-drawn-ink key, Fakous CPS Final 2024.pdf p.3 Q16)

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
resourceIds: No evidence-store src_ id exists for Fakous CPS Final 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.

---

# Item

## id
CON-RES-AD9290375D32B1

## label
The conducting zone of the respiratory system is called the anatomical dead space

## canonical_key
conductingzone.equals-anatomical-dead-space

## aliases
Conducting zone
Anatomical dead space
Respiratory zone vs conducting zone

## arabic_label


## arabic_aliases


## definition
The conducting zone of the airway — trachea, bronchi, bronchioles and terminal bronchioles — carries no alveoli and does no gas exchange, so air occupying it at the end of inspiration takes no part in gas exchange; this volume, normally about 150 ml, is the anatomical dead space. It does not include alveoli (which belong to the respiratory zone), its volume is not the ~500 ml of a typical tidal breath (that is total tidal volume, of which the conducting zone occupies only a fraction), and it contains no surfactant-secreting cells (those, type II pneumocytes, line the alveoli of the respiratory zone, not the conducting airways).

## explicit_objective
State that the conducting zone is called the anatomical dead space, distinguishing it from the alveoli-bearing respiratory zone and from tidal volume.

## pitfalls
Confusing the conducting zone's ~150 ml anatomical dead space with the ~500 ml tidal volume of a normal breath — dead space is the portion of tidal volume that never reaches gas-exchanging surface, not the whole breath.

## concept_type
definition

## status
Draft

## support_mode
direct_statement

## subject
resp

## primary_node_id


## secondary_node_ids


## topic
Respiratory physiology

## subtopic
Lung volumes and dead space

## microtopic
Conducting zone

## nanotopic


## modules
ZU-MED-106

## article_ids
ART-RES-ZU106-VENTILATION-AND-GAS-EXCHANGE

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
0.6

## exam_weight_by_year
ZU_Y1=0.65

## clinical_relevance
0.5

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.85

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Regarding the conducting zone of the respiratory system, which of the following statements is appropriate? a) It includes alveoli b) Its volume is 500 ml c) It is called dead space d) It contains the cells secreting surfactant" ANSWER: c (hand-drawn-ink key, Fakous CPS Final 2024.pdf p.4 Q18)

## merge_ids


## rejected_merge_candidate_ids
`find-existing.mjs "dead space"` hit pending Alexandria concepts on the Bohr/Fowler measurement methods and the determinants of anatomical dead space — a different specific fact (measurement method / what changes dead space vs the naming/definition fact tested here), not merged.

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
resourceIds: No evidence-store src_ id exists for Fakous CPS Final 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.

---

# Item

## id
CON-RES-330055DC3680D9

## label
The diaphragm is the chief muscle producing the increase in thoracic volume during quiet inspiration

## canonical_key
quietinspiration.diaphragm-is-chief-muscle

## aliases
Diaphragm in quiet inspiration
Muscles of quiet breathing

## arabic_label


## arabic_aliases


## definition
During quiet (normal, resting) inspiration, the diaphragm contracts and descends, increasing thoracic volume mainly in its vertical dimension, and does the great majority of the work of breathing — it is the single most important muscle for this increase in thoracic volume. The external intercostal muscles make a smaller, accessory contribution by raising the ribs (increasing the transverse and antero-posterior dimensions), while the sternomastoid, scalene and abdominal muscles are accessory or expiratory muscles recruited only during forced breathing, not quiet inspiration.

## explicit_objective
Name the diaphragm as the chief muscle of quiet inspiration, distinguishing it from the accessory muscles recruited only in forced breathing.

## pitfalls
Attributing quiet inspiration's thoracic volume increase to the sternomastoid or abdominal muscles — these are accessory/expiratory muscles used only during forced breathing, not the muscle doing the work at rest.

## concept_type
mechanism

## status
Draft

## support_mode
direct_statement

## subject
resp

## primary_node_id


## secondary_node_ids


## topic
Respiratory physiology

## subtopic
Muscles of respiration

## microtopic
Quiet inspiration

## nanotopic


## modules
ZU-MED-106

## article_ids
ART-RES-ZU106-VENTILATION-AND-GAS-EXCHANGE

## related_article_ids


## related_concept_ids
CON-RES-3941F8C7E00CE1

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.6

## exam_weight_by_year
ZU_Y1=0.65

## clinical_relevance
0.55

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.85

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following is the most important muscle in producing increase in thoracic volume during quiet normal inspiration? a) Diaphragm b) Abdominal muscle c) Sternomastoid muscles d) Internal intercostal muscles" ANSWER: a (hand-drawn-ink key, Fakous CPS Final 2024.pdf p.4 Q19)

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
resourceIds: No evidence-store src_ id exists for Fakous CPS Final 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.

---

# Item

## id
CON-RES-3941F8C7E00CE1

## label
Forced expiration contracts the internal intercostal and abdominal muscles

## canonical_key
forcedexpiration.internal-intercostal-and-abdominal-muscles

## aliases
Forced expiration muscles
Active expiration

## arabic_label


## arabic_aliases


## definition
Quiet expiration is passive, relying on elastic recoil of the lungs and chest wall with no muscular contraction. Forced (active) expiration recruits the internal intercostal muscles, which pull the ribs down and in, and the abdominal muscles, which contract to push the diaphragm upward and further compress the thoracic cavity — together, not the external intercostals (inspiratory) or the diaphragm (an inspiratory muscle, relaxing rather than contracting during expiration).

## explicit_objective
Name the internal intercostal and abdominal muscles as the ones contracted during forced expiration, distinguishing them from the inspiratory external intercostals and diaphragm.

## pitfalls
Pairing the external (rather than internal) intercostals with forced expiration, or including the diaphragm as an expiratory muscle — the diaphragm is exclusively inspiratory and relaxes, rather than contracts, during any expiration.

## concept_type
mechanism

## status
Draft

## support_mode
direct_statement

## subject
resp

## primary_node_id


## secondary_node_ids


## topic
Respiratory physiology

## subtopic
Muscles of respiration

## microtopic
Forced expiration

## nanotopic


## modules
ZU-MED-106

## article_ids
ART-RES-ZU106-VENTILATION-AND-GAS-EXCHANGE

## related_article_ids


## related_concept_ids
CON-RES-330055DC3680D9

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.6

## exam_weight_by_year
ZU_Y1=0.65

## clinical_relevance
0.5

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.85

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"During forced expiration which of the following respiratory muscles become contracted? a) Internal intercostal and sternomastoid b) External intercostal and abdominal c) Diaphragm and external intercostal d) Internal intercostal and abdominal muscles" ANSWER: d (hand-drawn-ink key, Fakous CPS Final 2024.pdf p.4 Q20)

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
resourceIds: No evidence-store src_ id exists for Fakous CPS Final 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.

---

# Item

## id
CON-RES-F01C6C08BC4DB9

## label
Pulmonary edema is prevented by keeping the surface tension of the fluid lining the alveoli low

## canonical_key
pulmonaryedemaprevention.alveolar-surface-tension-role

## aliases
Pulmonary edema prevention
Alveolar surface tension
Surfactant role in edema prevention

## arabic_label


## arabic_aliases


## definition
The thin fluid film lining each alveolus generates surface tension that, by Laplace's law, tends to collapse the alveolus and draw fluid from the capillaries into the alveolar space. Surfactant, secreted by type II pneumocytes, reduces this surface tension, and it is specifically that reduction in surface tension — not a change in bronchial mucous secretion, alveolar macrophage activity, or ciliary escalator activity, all of which serve other functions (mucus clearance, defence, particle clearance) — that keeps pulmonary edema from developing under normal conditions. Loss of surfactant (as in neonatal respiratory distress syndrome) raises alveolar surface tension and predisposes to alveolar fluid accumulation, the reverse demonstration of the same principle.

## explicit_objective
State that decreasing alveolar surface tension (via surfactant) is what prevents pulmonary edema, not mucous secretion, macrophage activity or ciliary clearance.

## pitfalls
Attributing pulmonary edema prevention to airway clearance mechanisms (mucous secretion, cilia, macrophages) — those manage particles and pathogens, not the Starling-type fluid balance across the alveolar wall that surface tension governs.

## concept_type
mechanism

## status
Draft

## support_mode
direct_statement

## subject
resp

## primary_node_id


## secondary_node_ids


## topic
Respiratory physiology

## subtopic
Alveolar surfactant

## microtopic
Pulmonary edema prevention

## nanotopic


## modules
ZU-MED-106

## article_ids
ART-RES-ZU106-VENTILATION-AND-GAS-EXCHANGE

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
0.6

## exam_weight_by_year
ZU_Y1=0.65

## clinical_relevance
0.65

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.85

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Pulmonary edema is prevented by decreasing which of the following? a) Surface tension of fluid lining alveoli b) Bronchial mucous secretion c) Alveolar macrophage activity d) Ciliary escalator activity" ANSWER: a (hand-drawn-ink key, Fakous CPS Final 2024.pdf p.4 Q21)

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
resourceIds: No evidence-store src_ id exists for Fakous CPS Final 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.

---

# Item

## id
CON-RES-AC70D14BAD8E0A

## label
Hypoxia is defined as diminished oxygen supply at the tissue level

## canonical_key
hypoxia.definition-diminished-tissue-o2

## aliases
Hypoxia definition
Tissue oxygen deficiency

## arabic_label


## arabic_aliases


## definition
Hypoxia is defined as a diminished oxygen supply at the tissue level, regardless of the mechanism that produces it (hypoxic, anaemic, stagnant or histotoxic hypoxia are all subtypes of this one definition). This is distinct from dyspnea (the subjective sensation of laboured or uncomfortable breathing), awareness of breathing generally, and cyanosis (bluish discoloration of skin/mucous membranes from excess deoxygenated haemoglobin) — cyanosis is a possible sign that can accompany hypoxia but is not itself the definition, since hypoxia can exist without visible cyanosis and vice versa in some states (e.g. severe anaemia can cause hypoxia with no cyanosis, because there is too little haemoglobin overall to show the bluish colour).

## explicit_objective
Define hypoxia as diminished oxygen supply at the tissue level, distinguishing it from dyspnea, awareness of breathing and cyanosis.

## pitfalls
Equating hypoxia with cyanosis — cyanosis is a possible physical sign of hypoxia in some but not all cases (e.g. absent in severe anaemic hypoxia), never the definition itself.

## concept_type
definition

## status
Draft

## support_mode
direct_statement

## subject
resp

## primary_node_id


## secondary_node_ids


## topic
Respiratory physiology

## subtopic
Hypoxia

## microtopic
Hypoxia definition

## nanotopic


## modules
ZU-MED-106

## article_ids
ART-RES-ZU106-VENTILATION-AND-GAS-EXCHANGE

## related_article_ids


## related_concept_ids
CON-RES-654A12F4B21CC0

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.6

## exam_weight_by_year
ZU_Y1=0.65

## clinical_relevance
0.65

## academic_relevance
0.75

## weight_confidence
0.4

## confidence
0.85

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following statements defines hypoxia? a) Dyspnea on lying down b) Awareness of breathing c) Diminished O2 supply at tissue level d) Bluish discoloration of skin and mucous membrane" ANSWER: c (hand-drawn-ink key, Fakous CPS Final 2024.pdf p.4 Q22)

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
resourceIds: No evidence-store src_ id exists for Fakous CPS Final 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.
relatedConceptIds: CON-RES-654A12F4B21CC0 (live, "stagnant hypoxia from thrombosis/embolism") is the specific subtype this general definition concept sits beside — linked, not merged; see the live-overlays file for the sparse ZU overlay written against it directly.

---

# Item

## id
CON-RES-EE354719967A90

## label
Vasoactive intestinal peptide (V.I.P.) relaxes bronchial smooth muscle and reduces bronchial tone

## canonical_key
bronchialsmoothmuscle.vip-mediated-relaxation

## aliases
VIP bronchodilation
Bronchial tone regulation
Vasoactive intestinal peptide

## arabic_label


## arabic_aliases


## definition
Bronchial smooth muscle tone is set by a balance of relaxing and constricting influences. Vasoactive intestinal peptide (V.I.P.), released from non-adrenergic non-cholinergic nerve fibres in the airway, is a relaxant of bronchial smooth muscle, reducing bronchial tone — the opposite effect to histamine, leukotrienes and irritant odours/particles, all of which constrict bronchial smooth muscle and raise airway resistance (histamine and leukotrienes as inflammatory mediators, irritants via reflex bronchoconstriction).

## explicit_objective
Name V.I.P. as a relaxant of bronchial smooth muscle, distinguishing it from the constrictor actions of histamine, leukotrienes and irritants.

## pitfalls
Grouping V.I.P. with the bronchoconstrictor mediators (histamine, leukotrienes, irritant stimuli) — V.I.P. is the relaxant among this set of options, acting through the opposite mechanism.

## concept_type
mechanism

## status
Draft

## support_mode
direct_statement

## subject
resp

## primary_node_id


## secondary_node_ids


## topic
Respiratory physiology

## subtopic
Bronchial smooth muscle tone

## microtopic
VIP-mediated bronchodilation

## nanotopic


## modules
ZU-MED-106

## article_ids
ART-RES-ZU106-VENTILATION-AND-GAS-EXCHANGE

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
0.55

## academic_relevance
0.75

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"As regards bronchial tone, which factor can relax the bronchial smooth muscle? a) V.I.P. b) Histamine c) Leukotrienes d) Irritant odor" ANSWER: a (hand-drawn-ink key, Fakous CPS Final 2024.pdf p.4 Q23)

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
resourceIds: No evidence-store src_ id exists for Fakous CPS Final 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.

---

# Item

## id
CON-FND-364731CA35A229

## label
The LDL receptor is specific for apolipoprotein B100 and apolipoprotein E

## canonical_key
ldlreceptor.apo-b100-and-apo-e-specificity

## aliases
LDL receptor specificity
Apo B100 and Apo E recognition

## arabic_label


## arabic_aliases


## definition
The LDL receptor recognises and binds lipoproteins that carry apolipoprotein B100 or apolipoprotein E on their surface — LDL particles (apo B100) and remnant/IDL particles and some chylomicron remnants (apo E) — mediating their receptor-mediated endocytosis into cells. It does not recognise apo A (the major HDL apolipoprotein), apo D, or apo B48 alone (the intestinal form of apo B, found on chylomicrons, which the LDL receptor does not bind directly; apo B48-containing particles are cleared instead via apo E on their remnants).

## explicit_objective
State that the LDL receptor is specific for apo B100 and apo E, distinguishing it from apo A, apo D and apo B48 alone.

## pitfalls
Assuming the LDL receptor binds any apolipoprotein B form — it recognises apo B100 (on LDL) specifically, not apo B48 (the intestinal, chylomicron form), which lacks the LDL receptor-binding domain.

## concept_type
mechanism

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Lipid metabolism

## subtopic
Lipoprotein receptors

## microtopic
LDL receptor

## nanotopic


## modules
ZU-MED-106

## article_ids
ART-FND-ZU106-LIPID-METABOLISM

## related_article_ids


## related_concept_ids
CON-FND-316FE8CED7F007

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.6

## exam_weight_by_year
ZU_Y1=0.65

## clinical_relevance
0.6

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.85

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"LDL receptor is specific for which of the following? a) Apo A b) Apo D c) Apo B48 and apo E d) Apo B100 and apo E" ANSWER: d (hand-drawn-ink key, Fakous CPS Final 2024.pdf p.4 Q26)

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
resourceIds: No evidence-store src_ id exists for Fakous CPS Final 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.

---

# Item

## id
CON-FND-253AEF836C2FE1

## label
Formation of mevalonate from HMG CoA is the committed step of cholesterol biosynthesis

## canonical_key
cholesterolsynthesis.committed-step-mevalonate

## aliases
Cholesterol biosynthesis committed step
HMG CoA reductase
Mevalonate pathway

## arabic_label


## arabic_aliases


## definition
Cholesterol biosynthesis from acetyl CoA proceeds through acetoacetyl CoA, then HMG CoA, and the reaction that commits the pathway irreversibly to cholesterol synthesis is the conversion of HMG CoA to mevalonate, catalysed by HMG CoA reductase — the rate-limiting, regulated enzyme of the pathway and the target of statin drugs. The earlier steps (acetyl CoA to acetoacetyl CoA, acetoacetyl CoA plus acetyl CoA to HMG CoA) are reversible and shared with ketone body metabolism, and the later step (squalene formation by squalene synthetase) occurs well after the pathway is already committed.

## explicit_objective
Name the formation of mevalonate from HMG CoA (via HMG CoA reductase) as the committed step of cholesterol biosynthesis.

## pitfalls
Naming an earlier, reversible step (acetoacetyl CoA or HMG CoA formation) as the committed step — commitment specifically means the first irreversible, pathway-dedicated reaction, which is the reductase step, not any step before it.

## concept_type
mechanism

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Lipid metabolism

## subtopic
Cholesterol biosynthesis

## microtopic
HMG CoA reductase

## nanotopic


## modules
ZU-MED-106

## article_ids
ART-FND-ZU106-LIPID-METABOLISM

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
0.6

## exam_weight_by_year
ZU_Y1=0.65

## clinical_relevance
0.65

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.85

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"What is the 'Committed step' in the biosynthesis of cholesterol from acetyl CoA? a) Formation of acetoacetyl CoA from acetyl CoA b) Formation of mevalonate from HMG CoA c) Formation of HMG CoA from acetyl CoA and acetoacetyl CoA d) Formation of squalene by squalene synthetase" ANSWER: b (hand-drawn-ink key, Fakous CPS Final 2024.pdf p.4 Q27)

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
resourceIds: No evidence-store src_ id exists for Fakous CPS Final 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.

---

# Item

## id
CON-FND-316FE8CED7F007

## label
Apolipoprotein CII acts as an activator of lipoprotein lipase

## canonical_key
apocii.activates-lipoprotein-lipase

## aliases
Apo CII function
Lipoprotein lipase activation

## arabic_label


## arabic_aliases


## definition
Apolipoprotein CII, carried on chylomicrons and VLDL, is the obligatory activator of lipoprotein lipase, the endothelial enzyme that hydrolyses the triglyceride core of these particles to release free fatty acids for tissue uptake — without apo CII, lipoprotein lipase remains inactive regardless of substrate availability. This is distinct from lecithin-cholesterol acyltransferase (LCAT, activated by apo A-I, esterifies cholesterol in HDL), phospholipase C (a signalling enzyme unrelated to lipoprotein metabolism) and acyl-cholesterol acyltransferase (ACAT, esterifies cholesterol intracellularly, not activated by apo CII).

## explicit_objective
Name lipoprotein lipase as the enzyme apolipoprotein CII activates, distinguishing it from LCAT, phospholipase C and ACAT.

## pitfalls
Confusing apo CII's target (lipoprotein lipase, triglyceride hydrolysis) with apo A-I's target (LCAT, cholesterol esterification) — both are apolipoprotein-activated enzymes, but on different substrates and different lipoproteins.

## concept_type
mechanism

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Lipid metabolism

## subtopic
Apolipoproteins

## microtopic
Apolipoprotein CII

## nanotopic


## modules
ZU-MED-106

## article_ids
ART-FND-ZU106-LIPID-METABOLISM

## related_article_ids


## related_concept_ids
CON-FND-364731CA35A229

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.55

## exam_weight_by_year
ZU_Y1=0.6

## clinical_relevance
0.55

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.85

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Apolipoprotein CII acts as an activator of which of the following? a) Lipoprotein lipase b) Lecithin-cholesterol acyl transferase (LCAT) c) Phospholipase C d) Acyl-Cholesterol Acyltransferase enzyme (ACAT)" ANSWER: a (hand-drawn-ink key, Fakous CPS Final 2024.pdf p.4-5 Q28)

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
resourceIds: No evidence-store src_ id exists for Fakous CPS Final 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.

---

# Item

## id
CON-FND-CE2DD8FE93BB7E

## label
The hexose monophosphate (HMP) pathway supplies the majority of NADPH used in fatty acid synthesis

## canonical_key
fattyacidsynthesis.hmp-pathway-nadph-source

## aliases
HMP pathway NADPH
Pentose phosphate pathway and lipogenesis
NADPH source for fatty acid synthesis

## arabic_label


## arabic_aliases


## definition
Fatty acid synthesis needs a large supply of NADPH as the reducing agent for each two-carbon extension of the growing chain. The hexose monophosphate (pentose phosphate) pathway is the major source of this NADPH in lipogenic tissues, generating it through the oxidative reactions catalysed by glucose-6-phosphate dehydrogenase and 6-phosphogluconate dehydrogenase. Glycolysis itself does not directly generate NADPH (it produces NADH), and while the citrate-lyase/malic enzyme shuttle and mitochondrial reactions contribute some NADPH, the HMP pathway remains the majority contributor for cytoplasmic fatty acid synthesis.

## explicit_objective
Name the hexose monophosphate pathway as the majority source of NADPH for fatty acid synthesis, distinguishing it from glycolysis and minor contributing routes.

## pitfalls
Naming glycolysis as an NADPH source — glycolysis generates NADH, not NADPH; the two reduced cofactors serve different metabolic roles and are not interchangeable in this question's logic.

## concept_type
mechanism

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Lipid metabolism

## subtopic
Fatty acid synthesis

## microtopic
NADPH sources

## nanotopic


## modules
ZU-MED-106

## article_ids
ART-FND-ZU106-LIPID-METABOLISM

## related_article_ids


## related_concept_ids
CON-FND-C27E8DBD202F8A

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.6

## exam_weight_by_year
ZU_Y1=0.65

## clinical_relevance
0.5

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.85

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"The majority of NADPH used during the synthesis of fatty acids are derived from which of the following? a) The glycolysis cycle b) The hexose monophosphate (HMP) pathway c) Citrate lyase enzyme reaction d) The mitochondrial malate dehydrogenase enzyme reaction" ANSWER: b (hand-drawn-ink key, Fakous CPS Final 2024.pdf p.5 Q29)

## merge_ids


## rejected_merge_candidate_ids
`find-existing.mjs "HMP pathway"` hit a pending Kasr article ("The HMP pathway, G6PD and favism") — a different specific fact (this article's focus is G6PD deficiency/favism, not fatty-acid-synthesis NADPH supply), not merged.

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
resourceIds: No evidence-store src_ id exists for Fakous CPS Final 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.

---

# Item

## id
CON-FND-C27E8DBD202F8A

## label
De novo fatty acid synthesis requires NADPH+H+

## canonical_key
denovofattyacidsynthesis.nadph-requirement

## aliases
De novo fatty acid synthesis
Fatty acid synthase cofactor requirement

## arabic_label


## arabic_aliases


## definition
De novo fatty acid synthesis takes place in the cytoplasm (not mitochondria, which is where beta-oxidation, the reverse process, occurs), uses malonyl CoA as the two-carbon donor for chain elongation (not as the source of all carbon atoms — the primer acetyl CoA and each malonyl CoA both contribute carbons), and is catalysed by the multi-enzyme fatty acid synthase complex. Every two-carbon addition cycle consumes NADPH+H+ as the reducing power for the two reduction steps in the cycle (beta-ketoacyl reduction and enoyl reduction) — an absolute stoichiometric requirement of the pathway, true regardless of which other single statement about the pathway a question also offers as a distractor.

## explicit_objective
State that NADPH+H+ is required for de novo fatty acid synthesis, and place this correctly against the pathway's cytoplasmic location and malonyl CoA's role as chain elongator.

## pitfalls
Placing de novo fatty acid synthesis in mitochondria — that is where beta-oxidation (the reverse, catabolic process) occurs; synthesis is a cytoplasmic pathway.

## concept_type
mechanism

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Lipid metabolism

## subtopic
Fatty acid synthesis

## microtopic
Fatty acid synthase pathway

## nanotopic


## modules
ZU-MED-106

## article_ids
ART-FND-ZU106-LIPID-METABOLISM

## related_article_ids


## related_concept_ids
CON-FND-CE2DD8FE93BB7E

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.55

## exam_weight_by_year
ZU_Y1=0.6

## clinical_relevance
0.5

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"De novo synthesis of fatty acids is one of the sources of fatty acid. Which of the following is true about the de novo synthesis of fatty acids? a) Occurs in mitochondria b) Malonyl CoA is the direct source of all carbon atoms needed c) Fatty acid synthase is the key enzyme d) NADPH+H+ is required" ANSWER: d (hand-drawn-ink key, Fakous CPS Final 2024.pdf p.5 Q30)

## merge_ids


## rejected_merge_candidate_ids


## conflicts
Option c ("Fatty acid synthase is the key enzyme") is also a broadly true statement about the pathway; the printed key names d as the single best answer, and the explanation on the question record addresses why d, not c, is the intended answer, per the answer-key ruling in 00-START-HERE.md (a printed key on a real exam paper stands as printed).

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
resourceIds: No evidence-store src_ id exists for Fakous CPS Final 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.

---

# Item

## id
CON-FND-AC75093D20D558

## label
Tay-Sachs disease is due to a defect of hexosaminidase A

## canonical_key
taysachsdisease.hexosaminidase-a-deficiency

## aliases
Tay-Sachs disease
Hexosaminidase A deficiency
GM2 gangliosidosis

## arabic_label


## arabic_aliases


## definition
Tay-Sachs disease is a lysosomal storage disorder caused by a deficiency of hexosaminidase A, the enzyme that normally degrades GM2 ganglioside; without it, GM2 ganglioside accumulates progressively in neurons, causing severe neurodegeneration. This is distinct from Niemann-Pick disease (sphingomyelinase deficiency), Krabbe disease (galactocerebrosidase deficiency) and Gaucher disease (glucocerebrosidase deficiency) — each of the four is a different sphingolipidosis, defined by a different missing enzyme acting on a different substrate.

## explicit_objective
Name hexosaminidase A deficiency as the cause of Tay-Sachs disease, distinguishing it from the enzyme deficiencies of Niemann-Pick, Krabbe and Gaucher disease.

## pitfalls
Matching Tay-Sachs to the wrong enzyme among the sphingolipidoses (sphingomyelinase, galactocerebrosidase or glucocerebrosidase) — each name belongs to a specific, non-interchangeable disease-enzyme pair.

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
Lipid metabolism

## subtopic
Sphingolipidoses

## microtopic
Tay-Sachs disease

## nanotopic


## modules
ZU-MED-106

## article_ids
ART-FND-ZU106-LIPID-METABOLISM

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
0.6

## exam_weight_by_year
ZU_Y1=0.65

## clinical_relevance
0.7

## academic_relevance
0.75

## weight_confidence
0.4

## confidence
0.85

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Tay-Sachs disease is due to a defect of which of the following enzyme? a) Sphingomyelinase b) Galactocerebrosidase c) Hexosaminidase A d) Glucocerebrosidase" ANSWER: c (hand-drawn-ink key, Fakous CPS Final 2024.pdf p.5 Q31)

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
resourceIds: No evidence-store src_ id exists for Fakous CPS Final 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.

---

# Item

## id
CON-HEM-E2CC25BA588EC2

## label
The basilar artery is characterized by a wide lumen and a thin wall

## canonical_key
basilarartery.wide-lumen-thin-wall-histology

## aliases
Basilar artery histology
Cerebral artery wall structure

## arabic_label


## arabic_aliases


## definition
The basilar artery, formed by the union of the two vertebral arteries and supplying the brainstem and posterior brain, is histologically characterised — like other large cerebral arteries — by a comparatively wide lumen and a thin wall, with a thin adventitia (not thick) and no unusual excess of valves (cerebral veins, not arteries, and not the basilar artery specifically, are the vessels tested for having relatively few valves); it does possess an internal elastic lamina, like other muscular arteries, rather than lacking one.

## explicit_objective
State that the basilar artery is characterised by a wide lumen and thin wall, correcting the distractors about its elastic lamina, adventitia thickness and valves.

## pitfalls
Assuming a large artery must have a thick wall — the basilar artery's histological signature is specifically the opposite pairing, a wide lumen with a comparatively thin wall.

## concept_type
structural_description

## status
Draft

## support_mode
direct_statement

## subject
haem

## primary_node_id


## secondary_node_ids


## topic
Vascular histology

## subtopic
Cerebral arteries

## microtopic
Basilar artery

## nanotopic


## modules
ZU-MED-106

## article_ids
ART-HEM-ZU106-VASCULAR-AND-NEURAL-HISTOLOGY

## related_article_ids


## related_concept_ids
CON-HEM-27FB0852185FA4

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
ZU_Y1=0.55

## clinical_relevance
0.4

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.75

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following characterize the basilar artery? a) Has no internal elastic lamina b) Has thick adventitia c) Has wide lumen and thin wall d) Has many valves within its wall" ANSWER: c (hand-drawn-ink key, Fakous CPS Final 2024.pdf p.5 Q34)

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
resourceIds: No evidence-store src_ id exists for Fakous CPS Final 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.
subjectPlacement: Filed under haem (general vessel histology), matching how the same triage's splenic-sinusoid and thymic-reticular-cell histology facts are classified in Kasr's pending 104-CPS-practical-concepts.md — not asserted as final, an S3 orchestrator call per LANE-CARD.md §8.

---

# Item

## id
CON-HEM-27FB0852185FA4

## label
Blood capillaries within nervous tissue contain pinocytic vesicles that permit transport across the endothelium

## canonical_key
nervoustissuecapillaries.pinocytic-vesicle-transport

## aliases
Nervous tissue capillaries
Blood-brain barrier capillary structure
Continuous capillary endothelium

## arabic_label


## arabic_aliases


## definition
Capillaries within nervous tissue are continuous capillaries with a complete, unfenestrated endothelium joined by tight junctions — the structural basis of the blood-brain barrier — and a complete (not incomplete) basal lamina. Transport across this tight, continuous endothelium relies on pinocytic (transcytotic) vesicles rather than large pores, distinguishing nervous-tissue capillaries from fenestrated capillaries (which have pores permitting bulk transport) and from any description invoking a simple cuboidal epithelial lining, which capillary endothelium never has — endothelium is simple squamous, in every vascular bed.

## explicit_objective
State that nervous-tissue capillaries transport material via pinocytic vesicles, and correct the distractors about basal lamina, pore size and lining epithelium type.

## pitfalls
Describing nervous-tissue capillaries as fenestrated with large pores — the defining feature of the blood-brain barrier is a continuous, tightly-joined endothelium with no large pores; transport instead relies on pinocytic vesicles.

## concept_type
structural_description

## status
Draft

## support_mode
direct_statement

## subject
haem

## primary_node_id


## secondary_node_ids


## topic
Vascular histology

## subtopic
Capillary types

## microtopic
Nervous tissue capillaries

## nanotopic


## modules
ZU-MED-106

## article_ids
ART-HEM-ZU106-VASCULAR-AND-NEURAL-HISTOLOGY

## related_article_ids


## related_concept_ids
CON-HEM-E2CC25BA588EC2

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
ZU_Y1=0.55

## clinical_relevance
0.55

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following characterize blood capillaries within the nervous tissue? a) Contain pinocytic vesicles that permit transport b) Have incomplete basal lamina c) Have large pores within the endothelial cells d) Lined by simple cuboidal epithelium" ANSWER: a (hand-drawn-ink key, Fakous CPS Final 2024.pdf p.5 Q35)

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
resourceIds: No evidence-store src_ id exists for Fakous CPS Final 2024.pdf yet; cited via question source_citation only, per 12-resources.md option 3.
subjectPlacement: Filed under haem (general vessel histology), matching how the same triage's splenic-sinusoid and thymic-reticular-cell histology facts are classified in Kasr's pending 104-CPS-practical-concepts.md — not asserted as final, an S3 orchestrator call per LANE-CARD.md §8.
