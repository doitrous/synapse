<!--
  ZU-MED-108 (Professional Practice II: basic clinical skills 1) — 15 NEW
  concepts (plus one REUSE of lane1's own CON-FND-5C4297B73F7F48) for the
  16-SBA cluster authored from `OSPE "Answers" Yousef Amr.pdf` pp.8-10
  (Zagazig's Fakous campus, Faculty of Medicine — source provenance ruled
  usable by the chief of staff, 2026-09-01; see LANE-CARD.md §7). This is
  the module's second author pass (author2); the first 31-question pass
  (`Fakous P.P2 Final 2024.pdf`) landed at commit 281ae591 and is not
  edited here.

  Search-before-mint run against `find-existing.mjs` for every concept
  below AND `grep -ril` across concept/pending-live/import-ready (all
  universities), plus explicit checks of the other Zagazig lane
  (ZU-MED-105 lane 3 — professionalism/ethics content only, no overlap)
  and the corpus's other BLS/AED/GCS/trauma-shaped hits (Ain Shams
  "ASU-BLS" = Basic Learning Skills/history-taking, not clinical BLS; Kasr
  101-ISK = anatomy/histology, no trauma content; MUST-PED501-emergencies
  has a paediatric GCS SCORING concept, a different atomic fact from this
  batch's GCS-purpose concept, logged as a rejected merge candidate below).
  Ids minted with `mint-concept-id.mjs`, checked against 13578 existing
  IDs (0 collisions). No evidence-store `src_…` resource exists yet for
  this Zagazig lane (no `docs/Zagazig-Source-Imports/evidence/` directory)
  — per 12-resources.md's weakest-but-honest option 3, `resource_ids`/
  `atomic_claim_ids` are left blank and the citation lives only in each
  question's `source_citation` and this file's `original_wording`.

  Key-recovery method: this paper's correct option on every item is marked
  by a clean PDF highlight annotation (not hand-drawn ink, unlike the
  Final-exam paper lane1 authored) — `pagetext.mjs keys` correctly
  detected 11/17 items outright; the remaining 6 flagged "ambiguous" (a
  second, phantom highlight annotation the automatic detector
  over-resolved) or "0 marked" (Q17's key sits on page 10, split across
  the tool's per-page scan from Q17's stem on page 9) were all resolved
  to a single, unambiguous highlight by rendering pages 8-10 as images
  (`pagetext.mjs render --force --pages 8-10`, 3 renders total) and
  reading the marked option directly, confirmed at 2x crop zoom for Q1,
  Q10, Q13-Q14, Q16-Q17. One item (Q16) was found malformed on render
  (options B and C's printed text is corrupted/scrambled in the source
  PDF itself, not an extraction artifact) and is held; see the ledger.

  Import: Admin › Concepts › Import.
-->

# Item

## id
CON-FND-0C01C8FEE8C9E0

## label
"Push hard and fast" is the key phrase for effective chest compressions in CPR

## canonical_key
cpr.compression-quality.push-hard-push-fast

## aliases
Push hard push fast
CPR compression quality mnemonic

## arabic_label

## arabic_aliases

## definition
The mnemonic "push hard and fast" summarises the two compression-quality targets that matter most for effective CPR: adequate depth (compressing the chest fully, to roughly two inches/5cm in an adult) and adequate rate (at least 100 compressions per minute), delivered with full chest recoil between compressions. It is taught as the single phrase to remember under pressure, because compressions that are either too shallow or too slow fail to generate enough forward blood flow to perfuse the brain and heart during cardiac arrest. It does not refer to checking the pulse after each compression, which is not part of standard CPR technique and would only interrupt the compressions that generate circulation.

## explicit_objective
State that "push hard and fast" is the key phrase summarising CPR's adequate-depth and adequate-rate compression targets.

## pitfalls
Selecting "check the pulse after each compression" as the key phrase — pulse checks are not performed between compressions during CPR, since stopping to check the pulse interrupts blood flow and delays restarting compressions.

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
ART-FND-ZU108-CPR-COMPRESSION-QUALITY

## related_article_ids

## related_concept_ids
CON-FND-A422370E6710B7 | CON-FND-C43B860E0A86DB

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
ZU_Y1=0.5

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
"The “key phrase” for chest compression in CPR is: A. Push at a rate of 30 compressions per minute B. Check the pulse after each compression. C. Push hard and fast. D. Push for at least 5 inches" ANSWER: C (clean PDF highlight annotation, OSPE "Answers" Yousef Amr.pdf p.8 Q1, render-confirmed)

## merge_ids

## rejected_merge_candidate_ids
`find-existing.mjs "chest compression"` hit CON-FND-A422370E6710B7 (kneeling posture, hip-driven compression movement) — a body-mechanics fact, not this concept's depth/rate mnemonic; not merged.

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
sourceCandidateIds: `find-existing.mjs "push hard and fast"` and "chest compression rate" — no hit.

---

# Item

## id
CON-FND-15859A73612D7F

## label
This paper's key teaches checking an unconscious child's pulse at the brachial artery using two fingers

## canonical_key
bls.pulse-check.child-brachial-artery

## aliases
Paediatric pulse check landmark
Child pulse check site

## arabic_label

## arabic_aliases

## definition
When assessing an unconscious child for signs of circulation, the pulse is checked with two fingers rather than the whole hand, at a large, easily accessible artery. This paper's own answer key names the brachial artery, felt at the medial side of the antecubital fossa, as the site taught in this course for an unconscious "child", distinguishing it from the femoral artery in the groin, the carotid artery in the neck, and simply attempting to feel the heartbeat directly against the chest wall.

## explicit_objective
State the pulse-check landmark this paper's key teaches for an unconscious child: the brachial artery, checked with two fingers.

## pitfalls
Selecting the carotid artery by analogy with adult BLS teaching, or the femoral artery, when this paper's own key marks the brachial artery for a "child".

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
Pulse check technique

## microtopic

## nanotopic

## modules
ZU-MED-108

## article_ids
ART-FND-ZU108-BLS-ASSESSMENT-2

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
0.45

## exam_weight_by_year
ZU_Y1=0.5

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
"In an unconscious CHILD check the pulse by using two fingers to feel: A. The brachial artery B. The femoral artery C. The carotid artery D. The heart" ANSWER: A (clean PDF highlight annotation, OSPE "Answers" Yousef Amr.pdf p.8 Q2, render-confirmed)

## merge_ids

## rejected_merge_candidate_ids

## conflicts

## uncertainty
Many resuscitation curricula (e.g. Resuscitation Council UK paediatric BLS) direct the brachial or femoral pulse check specifically to an INFANT under one year, reserving the carotid or femoral pulse for an older child, so "child" and "brachial artery" is an unusual pairing by that convention. This paper's own key marks brachial for a "child" without further age qualification, which this course may use loosely to include infants under the label "child"; the marked key stands per this lane's standing rule that marked keys are followed with doubt logged here rather than overridden.

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
sourceCandidateIds: `find-existing.mjs "pulse check child"` and "brachial pulse infant" — no hit.

---

# Item

## id
CON-FND-92683760FD2E1D

## label
Management of severe upper airway obstruction (choking) in an adult begins with five back blows, not abdominal thrusts

## canonical_key
choking.adult-management.back-blows-before-abdominal-thrusts

## aliases
Choking management sequence
Back blows before abdominal thrusts

## arabic_label

## arabic_aliases

## definition
When an adult develops severe, near-complete or complete choking, the first step is five sharp back blows between the shoulder blades, delivered before abdominal thrusts (the Heimlich manoeuvre) are attempted; if back blows fail to clear the obstruction, the rescuer moves on to five abdominal thrusts, alternating the two techniques in cycles of five if the obstruction persists. This sequence, back blows first, is the order this paper's own course teaches, rather than beginning directly with abdominal thrusts or escalating straight to CPR or an AED, neither of which is the first step for a still-conscious choking patient.

## explicit_objective
Sequence adult choking management, stating that five back blows are attempted before abdominal thrusts.

## pitfalls
Beginning choking management with abdominal thrusts rather than back blows, or escalating directly to CPR or AED use in a conscious choking adult before back blows or abdominal thrusts have been tried.

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
Choking management sequence

## microtopic

## nanotopic

## modules
ZU-MED-108

## article_ids
ART-FND-ZU108-CHOKING-MANAGEMENT-2

## related_article_ids

## related_concept_ids
CON-FND-0AA1F928825ABF | CON-FND-361D0FAB988CE1

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
"In management of severe upper airway obstruction (choking) in adult patient begin with: A. Five abdominal thrusts B. Five sharp back thrusts C. CPR D. AED" ANSWER: B (clean PDF highlight annotation, OSPE "Answers" Yousef Amr.pdf p.8 Q4, render-confirmed)

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
sourceCandidateIds: `find-existing.mjs "back blows choking"` — no hit.

---

# Item

## id
CON-FND-0C22832C404DC2

## label
Checking breathing in an unconscious patient is done by looking, listening and feeling, not by imaging

## canonical_key
bls.breathing-check.look-listen-feel

## aliases
Look listen feel
Bedside breathing check

## arabic_label

## arabic_aliases

## definition
Breathing is assessed in an unconscious patient at the bedside using the rescuer's own senses: observing chest-wall movement (look), listening for breath sounds at the mouth and nose (listen), and feeling for exhaled air against the cheek (feel), all performed within about ten seconds. Imaging such as a chest X-ray plays no role in this immediate, first-response assessment, since it is neither available nor fast enough during the initial check that decides whether to start CPR.

## explicit_objective
State that breathing is assessed by looking, listening and feeling, not by imaging.

## pitfalls
Treating any option involving equipment or investigations, such as an X-ray, as part of the bedside look/listen/feel breathing check.

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
Breathing check technique

## microtopic

## nanotopic

## modules
ZU-MED-108

## article_ids
ART-FND-ZU108-BLS-ASSESSMENT-2

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
ZU_Y1=0.5

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
"To check breathing in an unconscious patient, all of the followings are right EXCEPT: A. Observe movement of the chest B. Hearing sounds comes out from airway. C. Feeling air coming out from the nose or mouth D. Do X-ray for the chest." ANSWER: D (clean PDF highlight annotation, OSPE "Answers" Yousef Amr.pdf p.8 Q5, render-confirmed)

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
sourceCandidateIds: `find-existing.mjs "look listen feel breathing"` and "checking breathing look listen feel" — no hit.

---

# Item

## id
CON-FND-C43B860E0A86DB

## label
Chest compressions are delivered with the heel of the hand on the lower half of the sternum, not the upper abdomen

## canonical_key
cpr.compression-technique.hand-position-lower-sternum

## aliases
Chest compression hand placement
CPR hand position

## arabic_label

## arabic_aliases

## definition
Correct hand placement for chest compressions is the heel of one hand on the centre of the chest, over the lower half of the sternum, with the second hand on top; compressing here, over the strongest part of the bony thorax, transmits force to the heart between the sternum and the spine. Placing the hands on the upper abdomen instead is incorrect and risks injury to abdominal organs such as the liver, without generating effective circulation, since the compression would not be delivered over the heart at all.

## explicit_objective
State that chest-compression hand placement is the lower half of the sternum, not the upper abdomen.

## pitfalls
Confusing chest-compression hand placement (lower sternum) with the different hand placement used for abdominal thrusts in choking (upper abdomen) — the two techniques use different landmarks for different emergencies.

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
ART-FND-ZU108-CPR-COMPRESSION-QUALITY

## related_article_ids

## related_concept_ids
CON-FND-A422370E6710B7 | CON-FND-0C01C8FEE8C9E0 | CON-FND-361D0FAB988CE1

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
"Regarding chest compression on doing CPR, all of the followings are correct EXCEPT: A. Compression should be for two inches. B. Put the heel of hands on the upper abdomen. C. Allow the chest to recoil completely. D. The compression rate should be at least 100/min." ANSWER: B (clean PDF highlight annotation plus a handwritten margin arrow and note "→ choking" clarifying that upper-abdomen hand placement belongs to the abdominal-thrust technique for choking, not chest compressions, OSPE "Answers" Yousef Amr.pdf p.8 Q6, render-confirmed)

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
sourceCandidateIds: `find-existing.mjs "chest compression hand position"` — no hit.

---

# Item

## id
CON-FND-361D0FAB988CE1

## label
The abdominal thrust (Heimlich manoeuvre) is delivered with the fist placed on the upper abdomen, not the sternum or lower abdomen

## canonical_key
choking.abdominal-thrust.hand-position-upper-abdomen

## aliases
Heimlich hand position
Abdominal thrust technique

## arabic_label

## arabic_aliases

## definition
To perform an abdominal thrust, the rescuer stands behind the choking patient and places a fist on the upper abdomen, in the midline between the umbilicus and the tip of the sternum, then delivers sharp inward-and-upward thrusts. This location generates a sudden rise in intra-abdominal and intrathoracic pressure that can expel the obstructing object; placing the fist over the sternum, which describes chest compressions rather than abdominal thrusts, on the back, or on the lower abdomen, would not produce this effect and risks injury without relieving the obstruction.

## explicit_objective
State the correct fist placement for an abdominal thrust: the upper abdomen, between the umbilicus and the tip of the sternum.

## pitfalls
Confusing abdominal-thrust hand placement (upper abdomen) with chest-compression hand placement (lower sternum), or placing the fist too low on the lower abdomen or on the back instead.

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
Abdominal thrust technique

## microtopic

## nanotopic

## modules
ZU-MED-108

## article_ids
ART-FND-ZU108-CHOKING-MANAGEMENT-2

## related_article_ids

## related_concept_ids
CON-FND-0AA1F928825ABF | CON-FND-92683760FD2E1D | CON-FND-C43B860E0A86DB

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
ZU_Y1=0.5

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
"When performing a choking abdominal thrust, which is the correct area to place your hand fist? A. Over the sternum B. On the back of the chest C. On the lower abdomen D. On the upper abdomen" ANSWER: D (clean PDF highlight annotation, OSPE "Answers" Yousef Amr.pdf p.8 Q7, render-confirmed)

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
sourceCandidateIds: `find-existing.mjs "abdominal thrust hand position"` — no hit.

---

# Item

## id
CON-FND-C71AE24E519C80

## label
Choking in an infant is managed with back blows and chest thrusts, not abdominal thrusts, CPR, or holding the infant upside down

## canonical_key
choking.infant-management.back-blows-and-chest-thrusts

## aliases
Infant choking technique
Paediatric choking management

## arabic_label

## arabic_aliases

## definition
An infant under one year who is choking is managed with alternating back blows and chest thrusts, never abdominal thrusts (the Heimlich manoeuvre), because an infant's abdominal organs, particularly the liver, are relatively large and poorly protected, so abdominal thrusts risk serious internal injury. CPR is reserved for a choking infant who becomes unresponsive rather than being the first-line technique, and holding the infant upside down by the ankles and striking the back is an outdated, unsafe practice, not the recommended technique.

## explicit_objective
State that infant choking is managed with back blows and chest thrusts, not abdominal thrusts, CPR, or holding the infant upside down.

## pitfalls
Applying the adult/child abdominal-thrust (Heimlich) technique to an infant — abdominal thrusts are contraindicated in infants because of the risk of internal organ injury.

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
Infant choking management

## microtopic

## nanotopic

## modules
ZU-MED-108

## article_ids
ART-FND-ZU108-CHOKING-MANAGEMENT-2

## related_article_ids

## related_concept_ids
CON-FND-0AA1F928825ABF | CON-FND-FDD4C457F4D96B

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
"For an INFANT who is choking, you would perform…. A. The Hiemlick maneuver. B. CPR C. Back blows and chest thrusts. D. Hold the infant upside down and strike between the shoulder blades." ANSWER: C (clean PDF highlight annotation, OSPE "Answers" Yousef Amr.pdf p.8 Q8, render-confirmed)

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
sourceCandidateIds: `find-existing.mjs "infant choking chest thrusts"` — no hit.

---

# Item

## id
CON-FND-903310EE98ED06

## label
Everyone must stand clear and not touch the patient while an AED delivers a shock, and rescue breathing is never given during the shock

## canonical_key
aed.shock-delivery.stand-clear-no-rescue-breathing

## aliases
AED shock safety
Stand clear during defibrillation

## arabic_label

## arabic_aliases

## definition
When an AED advises a shock, the rescuer must ensure nobody, including themselves, is touching the patient before pressing the shock button, because the electrical current can pass through anyone in contact with the patient and cause injury or interfere with the shock. Rescue breathing is never given during the shock itself, both because it requires contact with the patient's airway and because CPR should resume immediately after the shock is delivered rather than be attempted at the same moment as it. CPR is continued while the AED is being attached and is analysing the rhythm, right up until the moment a shock is advised and about to be delivered.

## explicit_objective
State that rescuers must stand clear of the patient during an AED shock and that rescue breathing is not given during the shock, while CPR continues up to the point the shock is delivered.

## pitfalls
Believing rescue breathing is given at any point during shock delivery, or continuing to touch the patient for compressions, breathing, or any other reason once a shock is advised and about to be delivered.

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
AED shock safety

## microtopic

## nanotopic

## modules
ZU-MED-108

## article_ids
ART-FND-ZU108-BLS-ASSESSMENT-2

## related_article_ids

## related_concept_ids
CON-FND-B2C795580499C8

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
"Regarding Automated External Defibrillator (AED), all of the followings are correct EXCEPT: A. Do rescue breathing during the electric shock. B. AED restore the heart into a normal perfusing rhythm. C. Continue CPR while AED is being attached. D. Stand away and do not touch the patient before starting the shock." ANSWER: A (clean PDF highlight annotation, OSPE "Answers" Yousef Amr.pdf p.9 Q9, render-confirmed)

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
sourceCandidateIds: `find-existing.mjs "AED electric shock rescue breathing"` — no hit.

---

# Item

## id
CON-FND-9DD2BE7B2001B4

## label
Management of a polytraumatized patient follows primary survey with simultaneous resuscitation, secondary survey and investigations, then definitive treatment — early oral feeding is not part of this sequence

## canonical_key
trauma.polytrauma-management.survey-resuscitation-definitive-treatment

## aliases
Polytrauma management sequence
Trauma management stages

## arabic_label

## arabic_aliases

## definition
The structured approach to a polytraumatized patient runs through a primary survey performed simultaneously with resuscitation, identifying and treating immediately life-threatening problems as they are found, followed by a more detailed secondary survey and targeted investigations once the patient is stabilised, and finally definitive treatment of the injuries identified. Early oral feeding is not a recognised part of this acute sequence, since a trauma patient's airway, level of consciousness and gastrointestinal function cannot be assumed safe for oral intake in the acute phase, and unnecessary oral intake before injuries are fully assessed and treated risks aspiration and can complicate any surgery that follows.

## explicit_objective
State the correct sequence for polytrauma management (primary survey with resuscitation, secondary survey and investigations, definitive treatment) and that early oral feeding is not part of it.

## pitfalls
Assuming early oral feeding is a routine part of initial trauma management — nutrition is addressed later, once the patient is stabilised and safe to feed, not during the acute primary/secondary survey phase.

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
Trauma and polytrauma management

## subtopic
Polytrauma management sequence

## microtopic

## nanotopic

## modules
ZU-MED-108

## article_ids
ART-FND-ZU108-TRAUMA-PRIMARY-SURVEY

## related_article_ids

## related_concept_ids
CON-FND-8672586FE14D1D | CON-FND-936EB800D73BA8

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
"Management of polytraumatized patient includes all the following EXCEPT: A. Primary survey and simultaneous resuscitation B. Secondary survey and investigations C. Definitive treatment D. Early oral feeding" ANSWER: D (clean PDF highlight annotation plus a handwritten margin arrow pointing at option D, OSPE "Answers" Yousef Amr.pdf p.9 Q10, render-confirmed)

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
sourceCandidateIds: `find-existing.mjs "polytrauma primary survey"` and "early oral feeding trauma" — no hit.

---

# Item

## id
CON-FND-FA785D59339403

## label
A trauma patient with suspected cervical spine injury is transported with the cervical spine fixed by a collar, not sitting, with the neck extended, or after empirical strong analgesic injection

## canonical_key
trauma.cervical-spine-injury.transport-with-collar-fixation

## aliases
Cervical spine immobilisation
Spinal precautions in transport

## arabic_label

## arabic_aliases

## definition
When cervical spine injury is suspected after trauma, the neck is immobilised with a properly fitted cervical collar, often combined with head blocks and a spinal board, before and during transport, to prevent movement of an unstable spine that could cause or worsen spinal cord injury. Transporting the patient sitting in a wheelchair, with the neck deliberately extended, or after giving a strong analgesic injection first, which does not stabilise the spine and could mask pain that would otherwise signal worsening injury, are all unsafe substitutes for proper mechanical immobilisation.

## explicit_objective
State that suspected cervical spine injury is managed by transporting the patient with the neck immobilised in a cervical collar, not sitting, with the neck extended, or after analgesic injection alone.

## pitfalls
Treating analgesia, wheelchair positioning, or neck extension as substitutes for mechanical cervical spine immobilisation — none of these stabilises an unstable spine.

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
Trauma and polytrauma management

## subtopic
Cervical spine precautions

## microtopic

## nanotopic

## modules
ZU-MED-108

## article_ids
ART-FND-ZU108-TRAUMA-PRIMARY-SURVEY

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
"Trauma patient with suspected cervical spine injury should transported. A. On sitting position by wheelchair B. After injection of strong analgesic C. With the neck fully extended D. With fixation of cervical collar" ANSWER: D (clean PDF highlight annotation and underline, OSPE "Answers" Yousef Amr.pdf p.9 Q11, render-confirmed)

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
sourceCandidateIds: `find-existing.mjs "cervical spine collar transport"` — no hit; grep -ril "cervical spine|c-spine|spinal injury|cervical collar" across concept/pending-live/import-ready surfaced only anatomical lymph-node and unrelated pathology records (Alexandria AU-MED-203, Helwan pathology), not this trauma-precautions fact — not merged.

---

# Item

## id
CON-FND-7ADBD43FFCFC45

## label
The Glasgow Coma Scale is used to measure level of consciousness

## canonical_key
gcs.purpose.measures-level-of-consciousness

## aliases
GCS purpose
What GCS measures

## arabic_label

## arabic_aliases

## definition
The Glasgow Coma Scale (GCS) is a standardised scoring tool used to measure and communicate a patient's level of consciousness, combining eye-opening, verbal and motor responses into a single reproducible score. It is not a tool for grading haemorrhagic shock, airway obstruction, or bone fracture, each of which is assessed by its own distinct clinical signs and separate grading systems.

## explicit_objective
State that the Glasgow Coma Scale is used to measure level of consciousness, not haemorrhagic shock, airway obstruction, or fracture severity.

## pitfalls
Confusing GCS's purpose, grading level of consciousness, with grading systems for other trauma domains such as haemorrhagic shock classification or fracture grading, which use entirely different criteria.

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
Trauma and polytrauma management

## subtopic
Glasgow Coma Scale

## microtopic

## nanotopic

## modules
ZU-MED-108

## article_ids
ART-FND-ZU108-TRAUMA-PRIMARY-SURVEY

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
ZU_Y1=0.5

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
"Glasgow coma scale (GCS) is used to measure. A. Level of consciousness B. Hemorrhagic shock C. Airway obstruction D. Bone fracture" ANSWER: A (clean PDF highlight annotation, OSPE "Answers" Yousef Amr.pdf p.9 Q12, render-confirmed)

## merge_ids

## rejected_merge_candidate_ids
A manual `grep -ril "Glasgow Coma Scale"` hit CON-MUL-A5E883D77633A0 (docs/MUST-Source-Imports/concept/MUST-PED501-emergencies-concepts.md), which states the paediatric GCS/Children's Coma Scale SCORING method (summing eye/verbal/motor component scores, 3-15) — a different atomic fact from this concept's simple statement of GCS's purpose (measuring level of consciousness, as opposed to shock/airway/fracture); not merged.

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
sourceCandidateIds: `find-existing.mjs "Glasgow coma scale level of consciousness"` — no hit.

---

# Item

## id
CON-FND-7D4EDADC3889CB

## label
The definitive airway is an orotracheal (orolaryngeal) tube passed through the vocal cords with the cuff inflated

## canonical_key
airway.definitive-airway.orotracheal-intubation-definition

## aliases
Definitive airway definition
Orotracheal intubation

## arabic_label

## arabic_aliases

## definition
A "definitive airway" is defined as a cuffed tube placed within the trachea, most often by orotracheal (orolaryngeal) intubation, which secures the airway against aspiration and allows controlled or assisted ventilation. Basic adjuncts such as an oropharyngeal tube, or non-invasive measures such as face-mask breathing or rescue mouth breathing, are not definitive airways: they help maintain airway patency or deliver breaths but do not seal and secure the trachea itself.

## explicit_objective
State that the definitive airway is orotracheal/orolaryngeal intubation, distinguishing it from basic adjuncts (oropharyngeal tube) and non-invasive ventilation methods (face mask or mouth breathing).

## pitfalls
Treating any airway adjunct or non-invasive breathing method as a "definitive airway" — the definitive airway is specifically a cuffed tube within the trachea.

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
Trauma and polytrauma management

## subtopic
Definitive airway

## microtopic

## nanotopic

## modules
ZU-MED-108

## article_ids
ART-FND-ZU108-TRAUMA-PRIMARY-SURVEY

## related_article_ids

## related_concept_ids
CON-FND-B60751FCB593CB | CON-FND-9E4CA47345DE35

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
ZU_Y1=0.5

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
"The definitive airway is: A. Oropharyngeal tube B. Orolaryngeal intubation C. Face mask breathing D. Rescue mouth breathing" ANSWER: B (clean PDF highlight annotation, OSPE "Answers" Yousef Amr.pdf p.9 Q13, render-confirmed)

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
sourceCandidateIds: `find-existing.mjs "definitive airway intubation"` — no hit.

---

# Item

## id
CON-FND-8672586FE14D1D

## label
The primary survey for a traumatized patient follows the ABCDE guidelines

## canonical_key
trauma.primary-survey.abcde-guidelines

## aliases
ABCDE primary survey
Trauma primary survey sequence

## arabic_label

## arabic_aliases

## definition
The primary survey for a traumatized patient is structured around the ABCDE sequence, airway with cervical spine control, breathing, circulation with haemorrhage control, disability/neurological status, exposure, assessing and treating immediately life-threatening problems in that fixed order before moving on to less urgent findings. Ordering imaging such as X-rays for fracture, blood tests such as anaemia screening, or prophylactic IV antibiotics are not primary-survey steps: they belong to the secondary survey and later management, once the ABCDE assessment has confirmed the patient is not in immediate danger.

## explicit_objective
State that a trauma patient's primary survey follows the ABCDE guidelines, distinguishing this from secondary-survey investigations such as X-rays, blood tests, or antibiotics.

## pitfalls
Treating imaging, blood tests, or antibiotic administration as primary-survey steps — these belong to the secondary survey and subsequent management, after the ABCDE assessment.

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
Trauma and polytrauma management

## subtopic
Primary survey (ABCDE)

## microtopic

## nanotopic

## modules
ZU-MED-108

## article_ids
ART-FND-ZU108-TRAUMA-PRIMARY-SURVEY

## related_article_ids

## related_concept_ids
CON-FND-9DD2BE7B2001B4 | CON-FND-90C70F6D1E42F0

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
"Primary survey for management of traumatized patient includes: A. X-ray for fracture of bones B. ABCDE guidelines C. Blood test to exclude anemia. D. IV antibiotics to prevent infection." ANSWER: B (clean PDF highlight annotation, OSPE "Answers" Yousef Amr.pdf p.9 Q14, render-confirmed)

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
sourceCandidateIds: `find-existing.mjs "ABCDE primary survey"` — no hit.

---

# Item

## id
CON-FND-936EB800D73BA8

## label
Transfer of a polytraumatized patient should include a secured airway, one or two appropriately sized IV lines, and cardiac/pulse oximetry monitoring

## canonical_key
trauma.polytrauma-transfer.airway-iv-monitoring

## aliases
Polytrauma transfer requirements
Safe transfer of the traumatized patient

## arabic_label

## arabic_aliases

## definition
Before and during transfer of a polytraumatized patient, the airway must already be secured, one or two appropriately sized intravenous lines should be in place for fluid or drug administration, and continuous cardiac monitoring with pulse oximetry should be running, so that the patient's status can be tracked and any deterioration acted on throughout the transfer. All three measures, secure airway, IV access, and monitoring, are required together rather than as alternatives to each other, since each protects against a different way the patient could deteriorate in transit.

## explicit_objective
State that safe transfer of a polytraumatized patient requires a secured airway, IV access, and cardiac/pulse-oximetry monitoring together, not any one alone.

## pitfalls
Treating airway security, IV access, and monitoring as alternative or optional measures rather than as a combined requirement for safe transfer.

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
Trauma and polytrauma management

## subtopic
Polytrauma transfer

## microtopic

## nanotopic

## modules
ZU-MED-108

## article_ids
ART-FND-ZU108-TRAUMA-PRIMARY-SURVEY

## related_article_ids

## related_concept_ids
CON-FND-9DD2BE7B2001B4 | CON-FND-7FF29A40E6491E

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
ZU_Y1=0.5

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
"Transfer of polytraumatized patients should include: A. Secure airway B. One or two appropriately sized IV lines. C. Cardiac monitor and pulse oximetry is initiated. D. All the above." ANSWER: D (clean PDF highlight annotation, OSPE "Answers" Yousef Amr.pdf p.9 Q15, render-confirmed)

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
sourceCandidateIds: `find-existing.mjs "transfer polytraumatized patient IV lines"` — no hit.

---

# Item

## id
CON-FND-FDD4C457F4D96B

## label
Management of choking in an infant under one year starts with five back blows delivered while the infant is prone with the head lower than the chest

## canonical_key
choking.infant-technique.prone-head-down-back-blows

## aliases
Infant choking positioning
Prone head-down back blows

## arabic_label

## arabic_aliases

## definition
For an infant under one year with upper airway obstruction (choking), management starts with five back blows, delivered with the infant held prone along the rescuer's forearm, head lower than the trunk, using the heel of the hand between the shoulder blades; this head-down, prone positioning uses gravity to help dislodge the obstructing object. It does not start with abdominal thrusts, which are contraindicated in infants, or with CPR, which is reserved for a choking infant who becomes unresponsive rather than being the first step.

## explicit_objective
State that infant choking management starts with five back blows delivered with the infant prone and head-down, not with abdominal thrusts or CPR as a first step.

## pitfalls
Starting infant choking management with abdominal thrusts, contraindicated in infants, or with CPR, rather than positioned back blows.

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
Infant choking technique

## microtopic

## nanotopic

## modules
ZU-MED-108

## article_ids
ART-FND-ZU108-CHOKING-MANAGEMENT-2

## related_article_ids

## related_concept_ids
CON-FND-C71AE24E519C80

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
"In management of upper airway obstruction (choking) in an infant less than one year: A. Keep the head up to open the airway. B. Starts with 5 abdominal thrusts. C. Starts with 5 back thrust while the baby is prone with head downwards D. Starts with CPR" ANSWER: C (clean PDF highlight annotation, OSPE "Answers" Yousef Amr.pdf p.9-10 Q17, render-confirmed; option C's own text spans the page break between p.9 and p.10)

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
sourceCandidateIds: `find-existing.mjs "infant prone head down back blows"` — no hit.
