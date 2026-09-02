<!--
  MUST-PED501 (Pediatrics) — new concepts from chapters 6 (Paediatric
  emergencies) and 15 (Infection and immunity) of the Lissauer EOM MCQs
  source (src_6b517a8a10e860f24cbe), S2 authoring after TRIAGE APPROVED
  (coverage/MUST-PED501-triage.md). find-existing.mjs run per concept
  (shortest distinctive term first) against live state and every
  docs/*-Source-Imports + docs/import-ready batch — no live or pending hit
  for any of these 28 ideas; all genuine new mints.

  Ids minted with "Instruction Manual for Content Creation/tools/mint-concept-id.mjs"
  (deterministic, unsalted, checked against the full live+pending corpus at
  mint time). Placement follows the 20-subject list in curriculumCatalog.ts;
  this module has no taxonomy gap the way MED501's rheumatology/immunology
  split did — each concept sits under its own target-system subject (mul for
  resuscitation-sequence concepts, imm for allergy/Kawasaki, inf for
  infectious-disease diagnosis/investigation, resp/gi for organ-specific
  infection management, pop for the immunisation-policy question).
-->

# Item

## id
CON-MUL-E65D1D31D849CB

## article_ids
ART-INF-MUST-PED501-CHILDHOOD-INFECTIONS

## label
A febrile child with a purpuric, non-blanching rash is meningococcal septicaemia until proven otherwise

## canonical_key
meningococcalsepticaemia.presentation.purpuric-rash-fever

## aliases
Meningococcaemia
Non-blanching rash in a febrile child

## definition
A febrile, unwell child with a purpuric or petechial rash of variable lesion size that does not blanch under pressure is meningococcal septicaemia until proven otherwise, even before any neck stiffness or other meningitic sign appears. The rash reflects disseminated intravascular spread of Neisseria meningitidis causing vasculitis and microvascular thrombosis, and it is not invariably accompanied by meningitis — septicaemia can dominate the picture alone. Differentials with a similar-looking rash (Henoch-Schönlein purpura, immune thrombocytopenic purpura) are distinguished by the child being systemically well rather than septic-looking.

## explicit_objective
Recognise a purpuric, non-blanching rash with fever and systemic illness as meningococcal septicaemia rather than a benign vasculitic or platelet-mediated rash.

## pitfalls
Waiting for meningism (neck stiffness, photophobia) before suspecting meningococcal disease — septicaemia without meningitis is common and the rash alone, in a febrile unwell child, is the trigger to treat. Mistaking the rash for Henoch-Schönlein purpura because both are purpuric: HSP's child is well, not septicaemic.

## concept_type
clinical_feature

## status
Draft

## subject
mul

## topic
Multisystem and emergencies

## subtopic
Paediatric sepsis recognition

## universities
must

## learner_years
5

## modules
MUST-PED501

## module_subject
MUST-PED501 > 06 EOM Exams > EOM MCQs - Lissauer mcq final > Ch.6/15

## exam_weight_by_year
MUST_Y5=0.6

## clinical_relevance
0.9

## academic_relevance
0.6

## confidence
0.85

## support_mode
direct_statement

## exam_signal
src_6b517a8a10e860f24cbe | mcq_bank | | 6.2, 15.1

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD-Y5.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs "meningococcal septicaemia" — no hit.
keySource: printed "Correct." answer + rationale, both 6.2 and 15.1 (Lissauer). 15.1's own question stem deferred to Fig 15.1 for the rash appearance; the printed answer rationale for both 6.2 and 15.1 independently restates the rash as "purpuric, with lesions of variable size" / "spreading across the abdomen" — used as the textual source for both questions' stems rather than the unseen figure.
dupeNote: same concept tested twice (6.2, 15.1) with different vignette detail — collapsed to one record per LANE-CARD-Y5.md's duplicate-collapsing convention.

---

# Item

## id
CON-MUL-A5E883D77633A0

## article_ids
ART-MUL-MUST-PED501-RESUSCITATION-ALGORITHMS

## label
The paediatric Glasgow Coma Scale score is the sum of best eye-opening, verbal and motor responses, each scored separately

## canonical_key
glasgowcomascale.scoring.paediatric-components

## aliases
GCS in children
Children's Coma Scale

## definition
The Glasgow Coma Scale score is the sum of three independently scored components — best eye opening (1-4), best verbal response (1-5) and best motor response (1-6) — giving a total of 3-15; a score below 8 out of 15 means the airway is at risk and needs active protection. In children under 4 years the verbal and motor scales are age-adjusted (the Children's Coma Scale): verbal response is scored by vocalisation/interaction rather than orientation, and motor response by localising versus withdrawing from pain. The lowest possible score in any one domain is 1, never 0, which matters when adding the three parts together.

## explicit_objective
Calculate a total GCS/Children's Coma Scale score from a described eye/verbal/motor response, using the correct age-adjusted scale and remembering the minimum of 1 per domain.

## pitfalls
Scoring a domain as 0 when the child shows no response — the floor for every domain is 1, not 0, so "no response" still contributes 1 to the total. Using the adult verbal/motor descriptors (orientation, obeying commands) for a pre-verbal or pre-mobile infant instead of the Children's Coma Scale equivalents.

## concept_type
investigation

## status
Draft

## subject
mul

## topic
Multisystem and emergencies

## subtopic
Paediatric resuscitation assessment

## universities
must

## learner_years
5

## modules
MUST-PED501

## module_subject
MUST-PED501 > 06 EOM Exams > EOM MCQs - Lissauer mcq final > Ch.6/15

## exam_weight_by_year
MUST_Y5=0.5

## clinical_relevance
0.8

## academic_relevance
0.6

## confidence
0.85

## support_mode
direct_statement

## exam_signal
src_6b517a8a10e860f24cbe | mcq_bank | | 6.4

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD-Y5.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs "glasgow coma scale" — no hit.
keySource: printed "Correct." answer + Table 6.1 (Lissauer, source text captured in full).

---

# Item

## id
CON-MUL-061EB77F6742F6

## article_ids
ART-MUL-MUST-PED501-RESUSCITATION-ALGORITHMS

## label
In paediatric resuscitation, stimulate and shout for help before moving to airway/breathing/circulation steps

## canonical_key
drowning.resuscitation.stimulate-shout-before-compressions

## aliases
Paediatric basic life support sequence
Submersion injury first response

## definition
The paediatric life support algorithm starts with checking safety, then stimulating the child and shouting for help, before proceeding through airway, breathing and circulation in sequence — calling for help early matters because resuscitation needs multiple people. Chest compressions and bag-mask ventilation are later steps in the same sequence, appropriate once the earlier steps (stimulate/shout, then airway) have been completed and found inadequate, not the first action taken on finding an unresponsive child. This sequence applies to a submersion/drowning presentation exactly as it does to any other paediatric collapse.

## explicit_objective
Order the correct first step of paediatric resuscitation for a collapsed or submerged child, distinguishing "stimulate and shout for help" as the opening step from the airway/breathing/circulation actions that follow it.

## pitfalls
Jumping straight to chest compressions or bag-mask ventilation as the very first action — both are correct steps, but later in the sequence, after stimulation and calling for help have been done. Assuming a drowning case needs a different algorithm from any other paediatric collapse; it does not.

## concept_type
management

## status
Draft

## subject
mul

## topic
Multisystem and emergencies

## subtopic
Paediatric resuscitation algorithm

## universities
must

## learner_years
5

## modules
MUST-PED501

## module_subject
MUST-PED501 > 06 EOM Exams > EOM MCQs - Lissauer mcq final > Ch.6/15

## exam_weight_by_year
MUST_Y5=0.5

## clinical_relevance
0.8

## academic_relevance
0.5

## confidence
0.8

## support_mode
direct_statement

## exam_signal
src_6b517a8a10e860f24cbe | mcq_bank | | 6.5

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD-Y5.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs "drowning submersion" and "paediatric resuscitation sequence" — no hit.
keySource: printed "Correct." answer + rationale (Lissauer 6.5).

---

# Item

## id
CON-GIT-508038E58DEA73

## article_ids
ART-GIT-MUST-PED501-ABDOMINAL-EMERGENCIES

## label
Episodic crying with drawing the legs up in an infant with vomiting and shock suggests intussusception

## canonical_key
intussusception.presentation.colicky-pain-drawing-legs-shock

## aliases
Infant colicky abdominal pain with shock
Bowel telescoping in infancy

## definition
Intussusception — one segment of bowel telescoping into an adjacent segment — classically presents in infancy with episodes of inconsolable crying and drawing the legs up to the abdomen as if in pain, progressing to lethargy and shock if the vomiting continues and the child is not resuscitated. It is the most likely cause of this picture over strangulated hernia (should be evident on examination), malrotation and volvulus (more classically bile-stained vomiting), and Meckel diverticulum (presents with rectal bleeding, rarely enough blood loss to cause shock). Management follows an airway-breathing-circulation approach with early senior and radiology involvement; ultrasound can make the diagnosis obvious.

## explicit_objective
Recognise episodic crying with leg-drawing, vomiting and shock in an infant as intussusception rather than the other listed causes of infantile abdominal pain with shock.

## pitfalls
Defaulting to strangulated hernia without checking for one on examination — it is a real differential but should be visible, unlike intussusception. Expecting bile-stained vomiting as the clue, which points toward malrotation/volvulus instead.

## concept_type
clinical_feature

## status
Draft

## subject
gi

## topic
Gastrointestinal system

## subtopic
Paediatric abdominal emergencies

## universities
must

## learner_years
5

## modules
MUST-PED501

## module_subject
MUST-PED501 > 06 EOM Exams > EOM MCQs - Lissauer mcq final > Ch.6/15

## exam_weight_by_year
MUST_Y5=0.6

## clinical_relevance
0.8

## academic_relevance
0.6

## confidence
0.85

## support_mode
direct_statement

## exam_signal
src_6b517a8a10e860f24cbe | mcq_bank | | 6.6

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD-Y5.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs "intussusception" — no hit.
keySource: printed "Correct." answer + rationale (Lissauer 6.6).

---

# Item

## id
CON-MUL-031EEDAD65045F

## article_ids
ART-MUL-MUST-PED501-RESUSCITATION-ALGORITHMS

## label
An initial fluid bolus for a child in shock is 20 mL/kg of crystalloid, repeated as necessary

## canonical_key
shockfluidbolus.calculation.20mlperkg-crystalloid

## aliases
Paediatric fluid resuscitation bolus
20 mL/kg bolus

## definition
The initial fluid bolus for a shocked child is 20 mL/kg of an isotonic crystalloid (e.g. 0.9% saline), repeated as necessary if shock persists — smaller aliquots are used instead in trauma or diabetic ketoacidosis, where a full 20 mL/kg bolus risks cerebral oedema or over-resuscitation. For an 8 kg infant this is 160 mL per bolus. This is distinct from the ongoing maintenance and deficit fluid calculation used once the child is stabilised.

## explicit_objective
Calculate a correct initial resuscitation fluid bolus (20 mL/kg crystalloid) for a shocked child's weight, and distinguish it from the smaller aliquots used in trauma/DKA.

## pitfalls
Confusing the acute shock bolus (20 mL/kg) with the smaller aliquots used in trauma or DKA resuscitation, or with the ongoing maintenance-fluid rate, which is a much smaller hourly figure.

## concept_type
management

## status
Draft

## subject
mul

## topic
Multisystem and emergencies

## subtopic
Paediatric fluid resuscitation

## universities
must

## learner_years
5

## modules
MUST-PED501

## module_subject
MUST-PED501 > 06 EOM Exams > EOM MCQs - Lissauer mcq final > Ch.6/15

## exam_weight_by_year
MUST_Y5=0.6

## clinical_relevance
0.8

## academic_relevance
0.6

## confidence
0.85

## support_mode
direct_statement

## exam_signal
src_6b517a8a10e860f24cbe | mcq_bank | | 6.7

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD-Y5.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs "fluid bolus shock" — no hit.
keySource: printed "Correct." answer + rationale (Lissauer 6.7).

---

# Item

## id
CON-MUL-8F6160EF94CC4B

## article_ids
ART-MUL-MUST-PED501-RESUSCITATION-ALGORITHMS

## label
Total 24-hour fluid requirement after dehydration is calculated as fluid deficit plus maintenance plus ongoing losses

## canonical_key
maintenancefluid.calculation.deficit-plus-hollidaysegar

## aliases
Holliday-Segar maintenance fluid
24-hour fluid deficit calculation

## definition
Total fluid requirement over 24 hours is the sum of three components: the fluid deficit (percentage dehydration x weight in kg x 10, in mL), maintenance fluid (approximately 100 mL/kg/24h, by the Holliday-Segar formula), and any continuing losses (e.g. ongoing vomiting or diarrhoea). For an 8 kg infant estimated at 10% dehydrated with negligible continuing losses, this is 800 mL deficit + 800 mL maintenance + 0 mL continuing losses = 1600 mL over 24 hours. This calculation is distinct from — and follows — the acute 20 mL/kg shock bolus used first to restore circulation.

## explicit_objective
Calculate total 24-hour fluid requirement by summing deficit, maintenance and continuing losses for a given weight and percentage dehydration.

## pitfalls
Forgetting one of the three components (most often continuing losses, or conflating the deficit calculation with maintenance). Confusing this 24-hour total with the acute resuscitation bolus, which is a separate, much smaller, immediate volume.

## concept_type
management

## status
Draft

## subject
mul

## topic
Multisystem and emergencies

## subtopic
Paediatric fluid resuscitation

## universities
must

## learner_years
5

## modules
MUST-PED501

## module_subject
MUST-PED501 > 06 EOM Exams > EOM MCQs - Lissauer mcq final > Ch.6/15

## exam_weight_by_year
MUST_Y5=0.6

## clinical_relevance
0.8

## academic_relevance
0.6

## confidence
0.85

## support_mode
direct_statement

## exam_signal
src_6b517a8a10e860f24cbe | mcq_bank | | 6.8

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD-Y5.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs "maintenance fluid requirement" — no hit.
keySource: printed "Correct." answer + rationale (Lissauer 6.8).

---

# Item

## id
CON-MUL-67FFED5AA4A54E

## article_ids
ART-MUL-MUST-PED501-RESUSCITATION-ALGORITHMS

## label
After a seizure is treated, check blood glucose before any other next step, since hypoglycaemia is a reversible cause needing immediate treatment

## canonical_key
seizureresuscitation.abcdefg.glucose-check-step

## aliases
Glucose check after seizure treatment
ABCDEFG (don't ever forget glucose)

## definition
After the airway is secured, oxygen given and a first-dose anticonvulsant administered for a seizure, checking blood glucose is the next most appropriate step, because hypoglycaemia is a rapidly reversible cause of ongoing or recurrent seizure and the only definitive treatment is glucose. This is formalised in resuscitation teaching as "ABCDEFG" — airway, breathing, circulation, disability... don't ever forget glucose — a reminder to check it as part of every primary survey, not only when a specific cause is suspected. Gaining intravenous access and requesting senior review are also needed but come after, or alongside, the glucose check rather than before it.
## explicit_objective
Identify checking blood glucose as the next step after initial airway/oxygen/anticonvulsant management of a seizure, recognising hypoglycaemia as a reversible and treatable cause.

## pitfalls
Prioritising IV access or senior review ahead of the glucose check — both matter, but glucose is checked (and treated if low) without waiting for either. Assuming glucose only needs checking when there is a specific reason to suspect it, rather than as a routine part of every resuscitation primary survey.

## concept_type
management

## status
Draft

## subject
mul

## topic
Multisystem and emergencies

## subtopic
Paediatric resuscitation algorithm

## universities
must

## learner_years
5

## modules
MUST-PED501

## module_subject
MUST-PED501 > 06 EOM Exams > EOM MCQs - Lissauer mcq final > Ch.6/15

## exam_weight_by_year
MUST_Y5=0.5

## clinical_relevance
0.8

## academic_relevance
0.5

## confidence
0.85

## support_mode
direct_statement

## exam_signal
src_6b517a8a10e860f24cbe | mcq_bank | | 6.9, 6.13.4

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD-Y5.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs "status epilepticus buccal midazolam" — no hit.
keySource: printed "Correct." answer + rationale (Lissauer 6.9).
relatedConceptIds: CON-MUL-4F0073A365D82F (6.13.4, recognising hypoglycaemia in a known exercising diabetic) tests the same "always check glucose" principle from a different angle — cause-recognition in a diabetic rather than a resuscitation-sequence step after a seizure — kept as a separate, cross-linked concept rather than merged, per the MED501 allopurinol precedent for related-but-distinct objectives.

---

# Item

## id
CON-IMM-57F1B18CD7F7BC

## article_ids
ART-IMM-MUST-PED501-ALLERGY-AND-KAWASAKI

## label
A mild allergic reaction (urticaria and flushing, no respiratory compromise) is treated with an oral antihistamine

## canonical_key
foodallergy.management.mild-reaction-oral-antihistamine

## aliases
Mild food allergy management
Urticaria without anaphylaxis

## definition
A child with a widespread urticarial rash and facial flushing but normal vital signs and no respiratory compromise has a mild allergic reaction, most often triggered by nuts, egg, milk or seafood, and is managed with an oral antihistamine (e.g. chlorphenamine) plus a period of observation for possible progression. This is distinguished from anaphylaxis, where upper airway obstruction or wheeze (or shock) is present and intramuscular adrenaline is required instead. Intravenous hydrocortisone and intramuscular antihistamine are not first steps here — the former is unnecessarily aggressive and slow to act, the latter is painful and unnecessary when the child can take oral medicine.

## explicit_objective
Distinguish a mild allergic reaction (manage with oral antihistamine) from anaphylaxis (manage with intramuscular adrenaline) using the presence or absence of airway/breathing compromise.

## pitfalls
Reaching for intramuscular adrenaline or intravenous steroids for a reaction that has no airway, breathing or circulatory compromise — these are anaphylaxis treatments, not mild-reaction treatments. Assuming any facial swelling automatically means anaphylaxis; the presence of respiratory or circulatory compromise is what defines it, not the rash alone.

## concept_type
management

## status
Draft

## subject
imm

## topic
Immune system

## subtopic
Paediatric allergy

## universities
must

## learner_years
5

## modules
MUST-PED501

## module_subject
MUST-PED501 > 06 EOM Exams > EOM MCQs - Lissauer mcq final > Ch.6/15

## exam_weight_by_year
MUST_Y5=0.5

## clinical_relevance
0.7

## academic_relevance
0.5

## confidence
0.85

## support_mode
direct_statement

## exam_signal
src_6b517a8a10e860f24cbe | mcq_bank | | 6.10

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD-Y5.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs "food allergy anaphylaxis adrenaline" — no hit.
keySource: printed "Correct." answer + rationale (Lissauer 6.10).
relatedConceptIds: CON-IMM-0AABB67DC963B2 (6.11, anaphylaxis management) is the same clinical spectrum's severe end — cross-linked, not merged, since the objective (recognise-and-treat mild vs severe) differs.

---

# Item

## id
CON-IMM-0AABB67DC963B2

## article_ids
ART-IMM-MUST-PED501-ALLERGY-AND-KAWASAKI

## label
Anaphylaxis (upper airway obstruction and/or wheeze, with distress) is treated first with intramuscular adrenaline

## canonical_key
anaphylaxis.management.first-line-im-adrenaline

## aliases
Anaphylaxis first-line treatment
IM adrenaline for anaphylaxis

## definition
Anaphylaxis is a life-threatening reaction defined by upper airway obstruction (noisy breathing, swelling) and/or bronchoconstriction (wheeze), or signs of shock — any one of these alone is sufficient for the diagnosis. The priority is airway management with high-flow oxygen via a non-rebreathe mask, and the first medication given is intramuscular adrenaline, not intramuscular antihistamine (painful, does not treat the airway obstruction) or intravenous hydrocortisone (too slow, and IV access may worsen distress). Oral antihistamine and oral corticosteroid are inadequate for a reaction of this severity and speed.

## explicit_objective
Identify intramuscular adrenaline as the first drug for anaphylaxis (defined by airway obstruction and/or wheeze and/or shock), ahead of antihistamines or steroids in any route.

## pitfalls
Reaching for an antihistamine or steroid first because they are "standard allergy treatments" — in true anaphylaxis (airway/breathing/circulatory compromise) they are too slow and adrenaline must come first. Requiring both airway obstruction and wheeze to diagnose anaphylaxis, when either alone (or shock alone) is sufficient.

## concept_type
management

## status
Draft

## subject
imm

## topic
Immune system

## subtopic
Paediatric allergy

## universities
must

## learner_years
5

## modules
MUST-PED501

## module_subject
MUST-PED501 > 06 EOM Exams > EOM MCQs - Lissauer mcq final > Ch.6/15

## exam_weight_by_year
MUST_Y5=0.6

## clinical_relevance
0.9

## academic_relevance
0.6

## confidence
0.9

## support_mode
direct_statement

## exam_signal
src_6b517a8a10e860f24cbe | mcq_bank | | 6.11

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD-Y5.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs "food allergy anaphylaxis adrenaline" — no hit.
keySource: printed "Correct." answer + rationale (Lissauer 6.11).

---

# Item

## id
CON-MUL-1C74BB2200852F

## article_ids
ART-MUL-MUST-PED501-RESUSCITATION-ALGORITHMS

## label
Supine sleeping position is the single most important factor behind the decline in sudden infant death syndrome

## canonical_key
suddeninfantdeathsyndrome.prevention.supine-sleeping-position

## aliases
SIDS prevention
Back to sleep campaign

## definition
Several factors reduce sudden infant death syndrome risk — keeping the baby in the parents' room for the first 6 months, room temperature control, parental non-smoking, feet-to-foot cot positioning — but placing the baby supine (on the back) to sleep is the single most important factor behind the dramatic decline in SIDS incidence, more than any of the others individually. This reflects the "Back to Sleep" public health campaigns that shifted infant sleep positioning practice. Every listed factor genuinely reduces risk; the exam point is ranking supine sleeping as the dominant one.

## explicit_objective
Identify supine sleeping position as the single most important SIDS-risk-reducing factor among several genuine contributors.

## pitfalls
Treating all the listed SIDS-prevention factors as equally weighted, rather than recognising supine sleeping as the dominant single factor the question is asking for.

## concept_type
epidemiology

## status
Draft

## subject
mul

## topic
Multisystem and emergencies

## subtopic
Sudden infant death syndrome

## universities
must

## learner_years
5

## modules
MUST-PED501

## module_subject
MUST-PED501 > 06 EOM Exams > EOM MCQs - Lissauer mcq final > Ch.6/15

## exam_weight_by_year
MUST_Y5=0.5

## clinical_relevance
0.6

## academic_relevance
0.5

## confidence
0.8

## support_mode
direct_statement

## exam_signal
src_6b517a8a10e860f24cbe | mcq_bank | | 6.12

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD-Y5.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs "sudden infant death syndrome" — no hit.
keySource: printed "Correct." answer + rationale (Lissauer 6.12).

---

# Item

## id
CON-RES-ECC7B2E34AD145

## article_ids
ART-RES-MUST-PED501-RESPIRATORY-CARE

## label
A talking child with low oxygen saturation and normal capillary refill needs high-flow oxygen therapy before further assessment

## canonical_key
hypoxia.management.high-flow-oxygen-talking-child

## aliases
High-flow oxygen for hypoxia
Paediatric oxygen therapy priority

## definition
A child who is able to talk (patent airway) but has a low oxygen saturation needs high-flow oxygen therapy given promptly — this both corrects the hypoxia and reduces the child's anxiety and work of breathing, which in turn improves co-operation with further assessment and treatment. This step precedes more detailed diagnostic work-up; a patent airway does not mean oxygenation can wait. Normal capillary refill in this context indicates circulation is not yet critically compromised, but does not lower the priority of correcting hypoxia itself.

## explicit_objective
Identify high-flow oxygen as the immediate next step for a hypoxic but talking (airway-patent) child, ahead of further diagnostic assessment.

## pitfalls
Assuming that because the child can talk (patent airway), oxygen correction can be deferred until a more detailed assessment is done — hypoxia is treated as soon as it is identified, regardless of airway status.

## concept_type
management

## status
Draft

## subject
resp

## topic
Respiratory system

## subtopic
Paediatric respiratory distress

## universities
must

## learner_years
5

## modules
MUST-PED501

## module_subject
MUST-PED501 > 06 EOM Exams > EOM MCQs - Lissauer mcq final > Ch.6/15

## exam_weight_by_year
MUST_Y5=0.5

## clinical_relevance
0.7

## academic_relevance
0.5

## confidence
0.8

## support_mode
direct_statement

## exam_signal
src_6b517a8a10e860f24cbe | mcq_bank | | 6.13.1

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD-Y5.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs "hypoxia oxygen therapy children" — no hit.
keySource: printed EMQ answer + rationale (Lissauer 6.13.1).

---

# Item

## id
CON-MUL-C5E081989B6E87

## article_ids
ART-MUL-MUST-PED501-RESUSCITATION-ALGORITHMS

## label
For an unconscious child who is gasping or moaning, open and reposition the airway before starting bag-mask ventilation

## canonical_key
unconsciouschild.resuscitation.airway-opening-before-ventilation

## aliases
Airway opening manoeuvre priority
Paediatric airway positioning before ventilation

## definition
An unconscious child found gasping or moaning needs airway-opening manoeuvres (head tilt/chin lift or jaw thrust, repositioning) before bag-mask ventilation is started, since ineffective ventilation attempted through an unopened or obstructed airway will fail regardless of technique. This is the airway step of the standard "airway before breathing" resuscitation sequence, applied to a child whose breathing sounds are abnormal (gasping, moaning) rather than absent.

## explicit_objective
Identify airway-opening manoeuvres as the step that precedes bag-mask ventilation for an unconscious child with abnormal (gasping/moaning) breathing sounds.

## pitfalls
Starting bag-mask ventilation immediately without first repositioning the airway — an unopened airway makes ventilation ineffective no matter how well it is otherwise performed.

## concept_type
management

## status
Draft

## subject
mul

## topic
Multisystem and emergencies

## subtopic
Paediatric resuscitation algorithm

## universities
must

## learner_years
5

## modules
MUST-PED501

## module_subject
MUST-PED501 > 06 EOM Exams > EOM MCQs - Lissauer mcq final > Ch.6/15

## exam_weight_by_year
MUST_Y5=0.5

## clinical_relevance
0.8

## academic_relevance
0.5

## confidence
0.8

## support_mode
direct_statement

## exam_signal
src_6b517a8a10e860f24cbe | mcq_bank | | 6.13.2

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD-Y5.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs "airway opening manoeuvre" — no hit.
keySource: printed EMQ answer + rationale (Lissauer 6.13.2).

---

# Item

## id
CON-MUL-B511CB866F0EB7

## article_ids
ART-MUL-MUST-PED501-RESUSCITATION-ALGORITHMS

## label
For an infant with heart rate under 40/min and airway/breathing already managed, use the two-thumb/hand-encircling technique for chest compressions

## canonical_key
infantbradycardia.resuscitation.hand-encircling-compression-technique

## aliases
Infant CPR compression technique
Hand-encircling chest compressions

## definition
An infant with a heart rate below 40-60/min whose airway and breathing are already being managed needs chest compressions started, and the most effective technique in this age group is the hands-encircling method (two thumbs on the sternum, fingers encircling the chest) rather than the two-finger technique — its main disadvantage is that it requires at least two rescuers to also manage ventilation. This is distinct from the one-hand or two-hand techniques used in older children, and from the decision of whether to compress at all, which depends on the heart rate threshold being met.

## explicit_objective
Identify the hands-encircling technique as the most effective infant chest-compression method once compressions are indicated (heart rate under the threshold, airway/breathing already managed).

## pitfalls
Applying an older child's one- or two-hand compression technique to an infant, or forgetting that the hands-encircling method needs a second rescuer to manage ventilation simultaneously.

## concept_type
management

## status
Draft

## subject
mul

## topic
Multisystem and emergencies

## subtopic
Paediatric resuscitation algorithm

## universities
must

## learner_years
5

## modules
MUST-PED501

## module_subject
MUST-PED501 > 06 EOM Exams > EOM MCQs - Lissauer mcq final > Ch.6/15

## exam_weight_by_year
MUST_Y5=0.5

## clinical_relevance
0.7

## academic_relevance
0.5

## confidence
0.8

## support_mode
direct_statement

## exam_signal
src_6b517a8a10e860f24cbe | mcq_bank | | 6.13.3

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD-Y5.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs "infant chest compression technique" — no hit.
keySource: printed EMQ answer + rationale (Lissauer 6.13.3).

---

# Item

## id
CON-MUL-4F0073A365D82F

## article_ids
ART-MUL-MUST-PED501-RESUSCITATION-ALGORITHMS

## label
Confusion and sweating in a known diabetic child during exercise is hypoglycaemia until proven otherwise, and the next step is to check blood glucose

## canonical_key
hypoglycaemia.recognition.exercising-diabetic-child

## aliases
Hypoglycaemia during exercise
Diabetic child confusion recognition

## definition
A known diabetic child who becomes confused and sweaty during or after exercise is hypoglycaemic until proven otherwise — exercise increases insulin sensitivity and glucose uptake, and confusion plus sweating are classic adrenergic and neuroglycopenic hypoglycaemia symptoms. The next step is to check blood glucose (point-of-care testing), which both confirms the diagnosis and guides immediate treatment with oral or intravenous glucose depending on the child's conscious level and ability to swallow safely.

## explicit_objective
Recognise confusion and sweating in a known diabetic during/after exercise as hypoglycaemia, with blood glucose check as the immediate next step.

## pitfalls
Attributing confusion in a diabetic child to another cause (e.g. hyperglycaemia/DKA) without first checking glucose — the clinical picture described (confusion, sweating, exertional trigger) is the classic hypoglycaemic pattern, not the hyperglycaemic one.

## concept_type
clinical_feature

## status
Draft

## subject
mul

## topic
Multisystem and emergencies

## subtopic
Paediatric resuscitation algorithm

## universities
must

## learner_years
5

## modules
MUST-PED501

## module_subject
MUST-PED501 > 06 EOM Exams > EOM MCQs - Lissauer mcq final > Ch.6/15

## exam_weight_by_year
MUST_Y5=0.5

## clinical_relevance
0.7

## academic_relevance
0.5

## confidence
0.8

## support_mode
direct_statement

## exam_signal
src_6b517a8a10e860f24cbe | mcq_bank | | 6.13.4

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD-Y5.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs "diabetic child confusion sweating" — no hit.
keySource: printed EMQ answer + rationale (Lissauer 6.13.4).
relatedConceptIds: CON-MUL-67FFED5AA4A54E (6.9, glucose check after seizure treatment) tests the same "check glucose" principle from a different clinical trigger (post-ictal resuscitation sequence rather than exertional hypoglycaemia recognition) — kept separate, cross-linked, per the MED501 allopurinol precedent.

---

# Item

## id
CON-MUL-8237470762809D

## article_ids
ART-MUL-MUST-PED501-RESUSCITATION-ALGORITHMS

## label
Once airway, breathing, circulation and conscious level are checked in a resuscitated child, check the pupils next

## canonical_key
postresuscitation.assessment.pupil-check-sequence

## aliases
Post-resuscitation pupil check
Structural/toxidrome screen after ABCD

## definition
Once airway, breathing, circulation and conscious level (AVPU) have all been assessed in a resuscitated or post-ictal child, checking the pupils is the next step in the sequence — pupillary findings screen for a structural intracranial cause or a toxidrome (e.g. opioid-pattern pinpoint pupils, or a unilaterally dilated pupil suggesting raised intracranial pressure or a third-nerve lesion). This follows glucose correction and comes before a full secondary survey.

## explicit_objective
Place "check pupils" correctly in the post-resuscitation assessment sequence, after airway/breathing/circulation/conscious-level checks are complete.

## pitfalls
Checking pupils before completing the airway/breathing/circulation/conscious-level primary survey, or skipping the pupil check altogether once those are done — it is a distinct, ordered step, not an optional extra.

## concept_type
investigation

## status
Draft

## subject
mul

## topic
Multisystem and emergencies

## subtopic
Paediatric resuscitation algorithm

## universities
must

## learner_years
5

## modules
MUST-PED501

## module_subject
MUST-PED501 > 06 EOM Exams > EOM MCQs - Lissauer mcq final > Ch.6/15

## exam_weight_by_year
MUST_Y5=0.4

## clinical_relevance
0.6

## academic_relevance
0.5

## confidence
0.75

## support_mode
direct_statement

## exam_signal
src_6b517a8a10e860f24cbe | mcq_bank | | 6.13.5

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD-Y5.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs "post resuscitation pupil check" — no hit.
keySource: printed EMQ answer + rationale (Lissauer 6.13.5).

---

# Item

## id
CON-INF-5A260B8487951E

## article_ids
ART-INF-MUST-PED501-CHILDHOOD-INFECTIONS

## label
Meningococcal PCR is the investigation most likely to give a definitive diagnosis once antibiotics have already been started

## canonical_key
meningococcalpcr.investigation.definitive-diagnosis-choice

## aliases
Meningococcal PCR diagnosis
Confirming meningococcal disease after antibiotics

## definition
Once a child with suspected meningococcal septicaemia has already received oral antibiotics, blood culture and throat swab both become unreliable (antibiotics reduce organism yield and throat carriage does not confirm systemic disease), and lumbar puncture should be deferred until the child is cardiovascularly stable. Meningococcal PCR on blood is the investigation most likely to give a definitive diagnosis in this situation, and treatment should never be delayed while awaiting its result, since results can take 2-3 days.

## explicit_objective
Identify meningococcal PCR as the definitive-diagnosis investigation of choice once antibiotics have already been given, and recognise that treatment is never delayed for it.

## pitfalls
Choosing blood culture as the definitive test once antibiotics have already been given — culture yield drops sharply after antibiotic exposure, which is exactly why PCR is preferred in this scenario. Waiting for any investigation result before starting or continuing treatment.

## concept_type
investigation

## status
Draft

## subject
inf

## topic
Infection and tropical medicine

## subtopic
Meningococcal disease

## universities
must

## learner_years
5

## modules
MUST-PED501

## module_subject
MUST-PED501 > 06 EOM Exams > EOM MCQs - Lissauer mcq final > Ch.6/15

## exam_weight_by_year
MUST_Y5=0.5

## clinical_relevance
0.7

## academic_relevance
0.5

## confidence
0.8

## support_mode
direct_statement

## exam_signal
src_6b517a8a10e860f24cbe | mcq_bank | | 15.2

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD-Y5.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs "meningococcal PCR investigation" — no hit.
keySource: printed "Correct." answer + rationale (Lissauer 15.2).

---

# Item

## id
CON-INF-B6E3EF443A693A

## article_ids
ART-INF-MUST-PED501-CHILDHOOD-INFECTIONS

## label
Bacterial meningitis CSF shows a markedly raised, mostly neutrophil white cell count, raised protein and a reduced CSF:blood glucose ratio

## canonical_key
bacterialmeningitis.csf.neutrophil-predominant-pattern

## aliases
CSF pattern in bacterial meningitis
Neutrophil-predominant CSF pleocytosis

## definition
Bacterial meningitis produces a CSF picture of a markedly raised white cell count that is predominantly neutrophils, a raised CSF protein, and a reduced ratio of CSF to blood glucose (CSF glucose disproportionately low relative to blood glucose). This contrasts with viral meningitis (lymphocyte-predominant, protein normal or mildly raised, glucose usually preserved) and tuberculous meningitis (lymphocyte-predominant but with markedly raised protein and very low glucose). Normal paediatric CSF reference values are approximately 0-5 white cells/mm3, 0 red cells/mm3, protein 0.15-0.4 g/L, and glucose at least 50% of blood glucose.

## explicit_objective
Interpret a CSF result (cell type, protein, glucose ratio) as bacterial meningitis versus viral or tuberculous meningitis using the neutrophil-predominant, high-protein, low-glucose-ratio pattern.

## pitfalls
Focusing on cell count alone rather than cell type — a raised white count is common to bacterial, viral and TB meningitis; it is the neutrophil-versus-lymphocyte split, the protein level and the glucose ratio together that distinguish them.

## concept_type
investigation

## status
Draft

## subject
inf

## topic
Infection and tropical medicine

## subtopic
CSF interpretation

## universities
must

## learner_years
5

## modules
MUST-PED501

## module_subject
MUST-PED501 > 06 EOM Exams > EOM MCQs - Lissauer mcq final > Ch.6/15

## exam_weight_by_year
MUST_Y5=0.6

## clinical_relevance
0.7

## academic_relevance
0.7

## confidence
0.85

## support_mode
direct_statement

## exam_signal
src_6b517a8a10e860f24cbe | mcq_bank | | 15.3

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD-Y5.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs "csf analysis bacterial viral" — no hit.
keySource: printed "Correct." answer + rationale (Lissauer 15.3), includes normal CSF reference values quoted in the answer text.

---

# Item

## id
CON-INF-745DD827286BCC

## article_ids
ART-INF-MUST-PED501-CHILDHOOD-INFECTIONS

## label
Tuberculous meningitis CSF shows lymphocyte predominance with markedly raised protein and very low glucose, over a subacute (weeks-long) course

## canonical_key
tuberculousmeningitis.csf.lymphocyte-high-protein-low-glucose

## aliases
TB meningitis CSF pattern
Subacute lymphocytic meningitis with low glucose

## definition
Tuberculous meningitis presents subacutely, over weeks rather than days, and its CSF pattern is lymphocyte-predominant with a markedly raised protein and a very low glucose — the combination of lymphocytes with a very low glucose (rather than the near-normal glucose typical of viral meningitis) and the markedly raised protein, together with the subacute clinical course, points to TB over a straightforward viral cause. It is rare and can be difficult to diagnose, but the specific CSF signature and time course are the distinguishing clues.

## explicit_objective
Distinguish tuberculous meningitis from viral meningitis on CSF findings (both lymphocyte-predominant) using the markedly raised protein, very low glucose, and a subacute multi-week clinical course.

## pitfalls
Calling a lymphocyte-predominant CSF "viral" by cell type alone — viral meningitis usually preserves glucose and has a more acute course; a very low glucose and weeks-long history should raise TB instead.

## concept_type
investigation

## status
Draft

## subject
inf

## topic
Infection and tropical medicine

## subtopic
CSF interpretation

## universities
must

## learner_years
5

## modules
MUST-PED501

## module_subject
MUST-PED501 > 06 EOM Exams > EOM MCQs - Lissauer mcq final > Ch.6/15

## exam_weight_by_year
MUST_Y5=0.5

## clinical_relevance
0.6

## academic_relevance
0.6

## confidence
0.8

## support_mode
direct_statement

## exam_signal
src_6b517a8a10e860f24cbe | mcq_bank | | 15.4

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD-Y5.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs "tuberculosis meningitis csf" — no hit.
keySource: printed "Correct." answer + rationale (Lissauer 15.4).

---

# Item

## id
CON-IMM-08ACDC7241C468

## article_ids
ART-IMM-MUST-PED501-ALLERGY-AND-KAWASAKI

## label
Kawasaki disease is diagnosed on fever over 5 days plus cervical lymphadenopathy, injected pharynx/eyes, and peeling of the fingers/toes

## canonical_key
kawasakidisease.diagnosis.fever-conjunctivitis-peeling-criteria

## aliases
Kawasaki disease diagnostic criteria
Mucocutaneous lymph node syndrome

## definition
Kawasaki disease is diagnosed clinically on fever lasting more than 5 days together with a set of major diagnostic features that can include cervical lymphadenopathy, conjunctival injection, an injected/red pharynx or lips, and peeling of the skin of the fingers and toes — it is an important diagnosis peculiar to childhood because untreated disease risks coronary artery aneurysm formation. Enlarged tonsils with a "slimy" appearance can be seen in infectious mononucleosis, but the fever duration, lymphadenopathy pattern and peeling together are more specific to Kawasaki. Staphylococcal scalded skin syndrome also causes denuded skin but with a different overall pattern (areas of denuded skin, prominent malaise) rather than the lymphadenopathy/conjunctivitis/peeling triad.

## explicit_objective
Recognise fever over 5 days with cervical lymphadenopathy, conjunctival injection and finger/toe peeling as Kawasaki disease, distinguishing it from infectious mononucleosis, staphylococcal scalded skin syndrome, scarlet fever and TB.

## pitfalls
Attributing prolonged fever with lymphadenopathy to infectious mononucleosis without weighing the peeling-skin and conjunctivitis features, which point specifically to Kawasaki. Missing the diagnosis because the fever has not "failed antibiotics" dramatically enough — Kawasaki is not an antibiotic-responsive infection, so failure to respond is itself a clue, not a reason to keep treating as bacterial.

## concept_type
classification

## status
Draft

## subject
imm

## topic
Immune system

## subtopic
Kawasaki disease

## universities
must

## learner_years
5

## modules
MUST-PED501

## module_subject
MUST-PED501 > 06 EOM Exams > EOM MCQs - Lissauer mcq final > Ch.6/15

## exam_weight_by_year
MUST_Y5=0.7

## clinical_relevance
0.8

## academic_relevance
0.7

## confidence
0.85

## support_mode
direct_statement

## exam_signal
src_6b517a8a10e860f24cbe | mcq_bank | | 15.6

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD-Y5.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs "kawasaki disease" — no hit.
keySource: printed "Correct." answer + rationale (Lissauer 15.6).
relatedConceptIds: CON-IMM-1B1049A78C0C81 (15.11.5, Kawasaki treatment/IVIG) is the same disease's treatment objective — cross-linked, not merged, per the diagnosis-vs-treatment split used throughout this batch.

---

# Item

## id
CON-POP-A526BAE4C38D7A

## article_ids
ART-POP-MUST-PED501-IMMUNISATION

## label
Immunisation benefits both the individual child and the wider community by reducing disease transmission

## canonical_key
immunisation.rationale.individual-and-herd-benefit

## aliases
Herd immunity rationale
Individual vs community immunisation benefit

## definition
The strongest counselling answer to a parent questioning immunisation is that it protects both the individual child from serious infection and the wider community, because a high enough proportion of immunised children is needed to interrupt transmission and protect those who cannot be vaccinated (herd immunity). Framing immunisation only as a community obligation, without naming the direct benefit to the child, is a weaker and less convincing answer; herd immunity is also not guaranteed and can fail, as shown by measles outbreaks when immunisation rates fall following adverse (and false) publicity.

## explicit_objective
Identify the individual-plus-community framing as the most complete rationale for immunisation, over answers that emphasise only one side or defer the decision without explanation.

## pitfalls
Choosing an answer that stresses only the community benefit ("herd immunity needs high uptake") without naming the direct benefit to the child — it is true but less complete, and less persuasive to a parent weighing their own child's risk. Assuming that because most other children are immunised, an individual unimmunized child is protected — herd immunity is not guaranteed and outbreaks occur when uptake drops.

## concept_type
epidemiology

## status
Draft

## subject
pop

## topic
Population health

## subtopic
Immunisation counselling

## universities
must

## learner_years
5

## modules
MUST-PED501

## module_subject
MUST-PED501 > 06 EOM Exams > EOM MCQs - Lissauer mcq final > Ch.6/15

## exam_weight_by_year
MUST_Y5=0.4

## clinical_relevance
0.5

## academic_relevance
0.5

## confidence
0.8

## support_mode
direct_statement

## exam_signal
src_6b517a8a10e860f24cbe | mcq_bank | | 15.9

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD-Y5.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs "immunisation herd immunity" — no hit.
keySource: printed "Correct." answer + rationale (Lissauer 15.9).

---

# Item

## id
CON-RES-297F6B801C36CD

## article_ids
ART-RES-MUST-PED501-RESPIRATORY-CARE

## label
Rhinovirus is the most common cause of upper respiratory tract infection and of asthma exacerbations in children

## canonical_key
rhinovirus.epidemiology.commonest-urti-asthma-trigger

## aliases
Commonest URTI virus
Rhinovirus as an asthma trigger

## definition
Rhinovirus is the most common causative agent of upper respiratory tract infection — one of the most frequent problems seen in general paediatric practice — and it is also the most common trigger for asthma exacerbations in children, accounting for more than 80% of exacerbations. A mild macular rash, runny nose and low-grade intermittent fever in an otherwise well infant is a typical presentation, distinguishable from more serious exanthem-causing infections by the child's overall wellness and lack of specific rash pattern.

## explicit_objective
Identify rhinovirus as both the commonest cause of paediatric URTI and the commonest trigger of asthma exacerbations.

## pitfalls
Assuming a more "dramatic" virus (RSV, influenza) is the leading cause of URTI or asthma triggering by default — epidemiologically, rhinovirus outnumbers them for both.

## concept_type
epidemiology

## status
Draft

## subject
resp

## topic
Respiratory system

## subtopic
Upper respiratory tract infection

## universities
must

## learner_years
5

## modules
MUST-PED501

## module_subject
MUST-PED501 > 06 EOM Exams > EOM MCQs - Lissauer mcq final > Ch.6/15

## exam_weight_by_year
MUST_Y5=0.4

## clinical_relevance
0.5

## academic_relevance
0.6

## confidence
0.8

## support_mode
direct_statement

## exam_signal
src_6b517a8a10e860f24cbe | mcq_bank | | 15.10.2

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD-Y5.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs "rhinovirus" — 4 pending hits (glossary word-parts, practical slides, question distractor) but none names rhinovirus as the leading URTI/asthma-trigger cause; true new mint for this specific epidemiology fact.
keySource: printed EMQ answer + rationale (Lissauer 15.10.2).

---

# Item

## id
CON-INF-9FCE11C263C379

## article_ids
ART-INF-MUST-PED501-CHILDHOOD-INFECTIONS

## label
Fever, hypotension, a diffuse erythematous rash and mucositis after an infected wound suggests staphylococcal toxic shock syndrome

## canonical_key
toxicshocksyndrome.presentation.staphylococcus-infected-wound

## aliases
Staphylococcal toxic shock syndrome
Toxin-mediated shock after skin infection

## definition
Toxic shock syndrome is usually caused by toxin-producing Staphylococcus aureus (group A streptococci can also cause it), and is characterised by fever of 39C or above, hypotension, a diffuse erythematous macular rash, and can also involve mucositis of the conjunctivae, oral or genital mucosa with multiorgan dysfunction. A infected wound (such as a burn with yellow crusting) that then progresses to collapse, red lips and circulatory/respiratory failure is a classic trigger picture, since the crusting itself is a clue to the causative organism.

## explicit_objective
Recognise fever, hypotension, diffuse rash and mucositis following an infected skin lesion as staphylococcal (or streptococcal) toxic shock syndrome.

## pitfalls
Treating the infected wound and the subsequent shock as two separate problems rather than one toxin-mediated syndrome — the local infection is the trigger, and systemic toxin effects (not spreading bacteraemia alone) drive the shock, rash and mucositis.

## concept_type
clinical_feature

## status
Draft

## subject
inf

## topic
Infection and tropical medicine

## subtopic
Toxin-mediated syndromes

## universities
must

## learner_years
5

## modules
MUST-PED501

## module_subject
MUST-PED501 > 06 EOM Exams > EOM MCQs - Lissauer mcq final > Ch.6/15

## exam_weight_by_year
MUST_Y5=0.5

## clinical_relevance
0.7

## academic_relevance
0.5

## confidence
0.8

## support_mode
direct_statement

## exam_signal
src_6b517a8a10e860f24cbe | mcq_bank | | 15.10.6

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD-Y5.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs "staphylococcus toxic shock" — no hit.
keySource: printed EMQ answer + rationale (Lissauer 15.10.6).

---

# Item

## id
CON-INF-60E00615170D20

## article_ids
ART-INF-MUST-PED501-CHILDHOOD-INFECTIONS

## label
Fever and lethargy with an erythematous "slapped cheek" facial rash is parvovirus B19 (erythema infectiosum, fifth disease)

## canonical_key
parvovirusb19.presentation.slapped-cheek-erythema-infectiosum

## aliases
Fifth disease
Slapped cheek syndrome

## definition
Parvovirus B19 causes erythema infectiosum, also known as fifth disease or "slapped-cheek syndrome" for its characteristic bright erythematous facial rash, usually following a mild febrile prodrome with lethargy. The infection also temporarily suppresses red cell production, which is usually inconsequential in a healthy child but can cause serious anaemia in children with a shortened red cell lifespan (hereditary spherocytosis, sickle cell disease) or in a fetus if the mother is infected during pregnancy.

## explicit_objective
Recognise fever, lethargy and a slapped-cheek facial rash as parvovirus B19 infection, and identify who is at risk of serious anaemia from it.

## pitfalls
Treating parvovirus B19 as a trivial childhood exanthem in every patient — it is usually mild, but a child with an underlying haemolytic condition (spherocytosis, sickle cell disease) or an infected pregnant mother is at real risk of significant anaemia/fetal complications from the same infection.

## concept_type
clinical_feature

## status
Draft

## subject
inf

## topic
Infection and tropical medicine

## subtopic
Childhood exanthems

## universities
must

## learner_years
5

## modules
MUST-PED501

## module_subject
MUST-PED501 > 06 EOM Exams > EOM MCQs - Lissauer mcq final > Ch.6/15

## exam_weight_by_year
MUST_Y5=0.5

## clinical_relevance
0.6

## academic_relevance
0.6

## confidence
0.85

## support_mode
direct_statement

## exam_signal
src_6b517a8a10e860f24cbe | mcq_bank | | 15.10.7

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD-Y5.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs "parvovirus fifth disease" — no hit.
keySource: printed EMQ answer + rationale (Lissauer 15.10.7).

---

# Item

## id
CON-RES-4BE710F758BD54

## article_ids
ART-RES-MUST-PED501-RESPIRATORY-CARE

## label
A child with pneumonia, mild respiratory distress and no oxygen requirement or effusion signs can be managed at home with oral antibiotics

## canonical_key
pneumonia.management.mild-oral-antibiotics-home

## aliases
Outpatient pneumonia management
Mild paediatric pneumonia treatment

## definition
A child with fever, cough and focal chest signs (pneumonia) who has only mild respiratory distress, no oxygen requirement, and no signs of a pleural effusion can be managed at home with oral antibiotics, with safety-netting advice to seek medical review promptly if breathing worsens or the child deteriorates. This contrasts with a child who has borderline oxygen saturation, marked respiratory distress, or an effusion, who instead needs intravenous antibiotics, closer monitoring and possibly admission.

## explicit_objective
Select oral antibiotics with safety-netting as appropriate management for pneumonia with only mild distress and no oxygen requirement or effusion, versus IV antibiotics/admission for more severe disease.

## pitfalls
Admitting and starting IV antibiotics for every case of paediatric pneumonia regardless of severity — mild disease with preserved oxygenation and no effusion is appropriately managed with oral antibiotics at home, reserving IV treatment and admission for more severe presentations.

## concept_type
management

## status
Draft

## subject
resp

## topic
Respiratory system

## subtopic
Community-acquired pneumonia

## universities
must

## learner_years
5

## modules
MUST-PED501

## module_subject
MUST-PED501 > 06 EOM Exams > EOM MCQs - Lissauer mcq final > Ch.6/15

## exam_weight_by_year
MUST_Y5=0.5

## clinical_relevance
0.7

## academic_relevance
0.5

## confidence
0.8

## support_mode
direct_statement

## exam_signal
src_6b517a8a10e860f24cbe | mcq_bank | | 15.11.1

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD-Y5.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs "community acquired pneumonia children" — no hit.
keySource: printed EMQ answer + rationale (Lissauer 15.11.1).
relatedConceptIds: CON-RES-67B27C2422B19D (15.11.4, pneumonia with effusion needing IV antibiotics) is the more-severe counterpart on the same management spectrum — cross-linked, not merged.

---

# Item

## id
CON-RES-62D4C6D3220B7D

## article_ids
ART-RES-MUST-PED501-RESPIRATORY-CARE

## label
A child with an uncomplicated viral upper respiratory tract infection is managed with antipyretic/analgesic medication, not antibiotics

## canonical_key
uppertractinfection.management.antipyretic-analgesia

## aliases
Viral URTI symptomatic management
Paracetamol for URTI

## definition
A child with coryza, cough and low-grade fever from a viral upper respiratory tract infection is managed symptomatically with an antipyretic/analgesic such as paracetamol, which eases discomfort and makes the child more comfortable; current guidance is that fever itself does not need treating with an antipyretic unless the child is distressed by it, rather than treating a specific temperature threshold. Antibiotics have no role in a straightforward viral URTI.

## explicit_objective
Select antipyretic/analgesic symptomatic management (not antibiotics) as appropriate care for an uncomplicated viral URTI.

## pitfalls
Prescribing antibiotics for a straightforward viral URTI. Treating fever as something that must always be brought down with medication, rather than only when the child is distressed by it.

## concept_type
management

## status
Draft

## subject
resp

## topic
Respiratory system

## subtopic
Upper respiratory tract infection

## universities
must

## learner_years
5

## modules
MUST-PED501

## module_subject
MUST-PED501 > 06 EOM Exams > EOM MCQs - Lissauer mcq final > Ch.6/15

## exam_weight_by_year
MUST_Y5=0.4

## clinical_relevance
0.5

## academic_relevance
0.5

## confidence
0.8

## support_mode
direct_statement

## exam_signal
src_6b517a8a10e860f24cbe | mcq_bank | | 15.11.2

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD-Y5.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs "immunisation herd immunity" and "gastroenteritis oral rehydration" also searched adjacent terms — no hit for this concept specifically.
keySource: printed EMQ answer + rationale (Lissauer 15.11.2).

---

# Item

## id
CON-GIT-BAE5C196436597

## article_ids
ART-GIT-MUST-PED501-ABDOMINAL-EMERGENCIES

## label
A dehydrated but not shocked child with gastroenteritis is managed with oral rehydration solution first, under observation

## canonical_key
gastroenteritis.management.oral-rehydration-not-shocked

## aliases
Oral rehydration for paediatric gastroenteritis
Gastroenteritis dehydration without shock

## definition
A child with gastroenteritis who is clinically dehydrated (dry mucous membranes, sunken eyes, reduced skin turgor) but not shocked (normal capillary refill, warm extremities) is managed with oral rehydration solution first, with observation for around 4 hours to confirm the fluid is tolerated; a nasogastric tube can be used if oral intake fails, and intravenous fluids are avoided where possible. This distinguishes dehydration (oral/NG route appropriate) from shock (which needs an IV fluid bolus).

## explicit_objective
Distinguish clinical dehydration without shock (manage with oral rehydration solution, observed) from shock (manage with IV fluid bolus) in a child with gastroenteritis.

## pitfalls
Starting intravenous fluids as the default for any dehydrated child with gastroenteritis — IV fluids are reserved for shock or failed oral/NG rehydration, not used first-line for dehydration alone.

## concept_type
management

## status
Draft

## subject
gi

## topic
Gastrointestinal system

## subtopic
Paediatric gastroenteritis

## universities
must

## learner_years
5

## modules
MUST-PED501

## module_subject
MUST-PED501 > 06 EOM Exams > EOM MCQs - Lissauer mcq final > Ch.6/15

## exam_weight_by_year
MUST_Y5=0.5

## clinical_relevance
0.7

## academic_relevance
0.5

## confidence
0.85

## support_mode
direct_statement

## exam_signal
src_6b517a8a10e860f24cbe | mcq_bank | | 15.11.3

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD-Y5.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs "gastroenteritis oral rehydration" — no hit.
keySource: printed EMQ answer + rationale (Lissauer 15.11.3).

---

# Item

## id
CON-RES-67B27C2422B19D

## article_ids
ART-RES-MUST-PED501-RESPIRATORY-CARE

## label
Pneumonia with a pleural effusion and borderline oxygen saturation is managed with intravenous, not oral, antibiotics

## canonical_key
pneumonia.management.effusion-intravenous-antibiotics

## aliases
Complicated pneumonia management
Pneumonia with parapneumonic effusion

## definition
A child with pneumonia complicated by a pleural effusion, marked respiratory distress and borderline oxygen saturation needs intravenous antibiotics initially, since oral treatment is inadequate for disease of this severity; oxygen may also be required, especially during sleep if saturation drops further. Once the child has been afebrile for 48 hours, treatment can be stepped down to oral antibiotics to complete the course.

## explicit_objective
Select intravenous antibiotics (with a step-down to oral once afebrile 48h) for pneumonia complicated by effusion and marked respiratory distress, versus oral antibiotics alone for milder disease.

## pitfalls
Using oral antibiotics for pneumonia complicated by effusion and marked distress — this severity threshold needs IV treatment initially, with oral step-down reserved until the child has been afebrile for 48 hours.

## concept_type
management

## status
Draft

## subject
resp

## topic
Respiratory system

## subtopic
Community-acquired pneumonia

## universities
must

## learner_years
5

## modules
MUST-PED501

## module_subject
MUST-PED501 > 06 EOM Exams > EOM MCQs - Lissauer mcq final > Ch.6/15

## exam_weight_by_year
MUST_Y5=0.5

## clinical_relevance
0.7

## academic_relevance
0.5

## confidence
0.8

## support_mode
direct_statement

## exam_signal
src_6b517a8a10e860f24cbe | mcq_bank | | 15.11.4

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD-Y5.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs "empyema pleural effusion" — no hit.
keySource: printed EMQ answer + rationale (Lissauer 15.11.4).
relatedConceptIds: CON-RES-4BE710F758BD54 (15.11.1, mild pneumonia managed orally at home) is the milder counterpart on the same management spectrum — cross-linked, not merged.

---

# Item

## id
CON-IMM-1B1049A78C0C81

## article_ids
ART-IMM-MUST-PED501-ALLERGY-AND-KAWASAKI

## label
Kawasaki disease is treated with intravenous immunoglobulin to reduce the risk of coronary artery aneurysm

## canonical_key
kawasakidisease.treatment.ivig-coronary-aneurysm-prevention

## aliases
Kawasaki IVIG treatment
Coronary aneurysm prevention in Kawasaki disease

## definition
A child diagnosed with Kawasaki disease is at risk of developing coronary artery aneurysm, and the treatment that reduces this risk is intravenous immunoglobulin (IVIG). This is the specific reason IVIG is given rather than supportive care alone — the coronary complication, not the acute febrile illness itself, is what drives the urgency of treatment once the diagnosis is made.

## explicit_objective
Identify intravenous immunoglobulin as the treatment of Kawasaki disease, given specifically to reduce coronary artery aneurysm risk.

## pitfalls
Managing Kawasaki disease as a self-limiting febrile illness needing only supportive care — IVIG is disease-modifying for the coronary complication and is not optional once the diagnosis is confirmed.

## concept_type
management

## status
Draft

## subject
imm

## topic
Immune system

## subtopic
Kawasaki disease

## universities
must

## learner_years
5

## modules
MUST-PED501

## module_subject
MUST-PED501 > 06 EOM Exams > EOM MCQs - Lissauer mcq final > Ch.6/15

## exam_weight_by_year
MUST_Y5=0.6

## clinical_relevance
0.8

## academic_relevance
0.6

## confidence
0.85

## support_mode
direct_statement

## exam_signal
src_6b517a8a10e860f24cbe | mcq_bank | | 15.11.5

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD-Y5.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs "kawasaki disease intravenous immunoglobulin" — no hit.
keySource: printed EMQ answer + rationale (Lissauer 15.11.5).
relatedConceptIds: CON-IMM-08ACDC7241C468 (15.6, Kawasaki diagnosis) is the same disease's diagnostic objective — cross-linked, not merged.
