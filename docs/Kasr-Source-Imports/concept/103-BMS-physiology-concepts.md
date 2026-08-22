<!--
  Concepts for 103 BMS · Physiology, from Section 3 of the 2025 end-of-year paper.

    EOY (BMS - 103) 199 (2).pdf — src_37f6c0daf3436096af19, Section 3: Physiology,
    pages 15–18, four written questions, 19 marks as printed.

  Eight concepts from four questions. Two questions genuinely assess two ideas
  each — Q2 compares the absolute and the relative refractory period, and Q3's
  four marks cover both the cross-bridge cycle and the ATP step inside it — so
  those are written as pairs rather than as one record stapled together.

  Every medical statement here comes from `Dpt Book Physiology 103.pdf`
  (src_59643edb9d371bcefa2c), cited by page in
  ../evidence/103-BMS-physiology-citations.md. The exam paper says what was
  asked; the book says what is true, and only the book is cited as evidence.

  THE EXCLUSION CHECK. The Physiology department's announcement for the
  1st-year final theoretical exam ("Theoretical topics not included in final
  theoretical exam: 103") excludes seven topics. None of these four questions
  falls inside it. Q3 in particular asks about "generation of tension", which
  the book prints as step 3 of *Mechanical Changes Following Skeletal Muscle
  Stimulation / Excitation-Contraction Coupling* on p33 — two pages before
  "Types of Skeletal Muscle Contraction" begins on p35, which is the excluded
  heading. They are different sections of the book and are not the same topic.
  Recorded per concept in `field_notes` under `exclusionReason`.

  Weights are inferred from a single sitting, so `weight_confidence` is 0.25–0.3
  throughout. One paper is weak evidence and the numbers say so.

  Import: Admin › Concepts › Import.
-->

# Item

## label
The depolarisation phase of the nerve action potential is a regenerative sodium influx

## id
CON-NEU-7A30FECF042995

## canonical_key
nerve.action-potential.depolarization-ionic-basis

## aliases
Ionic basis of depolarization phase of action potential
Ionic basis of the depolarisation phase
Rising phase of the nerve action potential
Regenerative sodium influx
Positive feedback depolarization

## arabic_label
الأساس الأيوني لطور إزالة الاستقطاب في جهد الفعل

## arabic_aliases
الطور الصاعد لجهد الفعل العصبي
التدفق الذاتي التعزيز لأيونات الصوديوم

## definition
Depolarisation happens in two steps. A stimulus first drives the membrane slowly from −90 mV to the firing level of −65 mV, opening some sodium activation gates; the sodium that enters depolarises the membrane further and opens more gates, so the process feeds itself. At the firing level all voltage-gated sodium channels open and rapid depolarisation carries the potential through zero to an overshoot of +35 mV, giving a spike amplitude of 125 mV, after which the sodium channels rapidly inactivate.

## explicit_objective
Describe the ionic basis of the depolarisation phase of the nerve action potential, separating the slow phase from the rapid phase and naming the voltage values that bound each.

## pitfalls
Describing depolarisation as sodium being pumped in. Nothing is pumped during the spike — sodium moves passively down its electro-concentration gradient through channels that the falling potential itself opens. The Na⁺–K⁺ pump only restores the gradients afterwards, and it is electrogenic rather than the cause of the upstroke.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
neuro

## primary_node_id
DIS-PHY-T07

## secondary_node_ids
DIS-PHY-T01 | SYS-NEU-T01-S02-M03

## topic
Neurophysiology

## subtopic
Physiology of the Nerve

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Ionic basis of action potential

## article_ids
ART-103-PHY-NERVE-ACTION-POTENTIAL

## related_article_ids
ART-NEU-TOP-5A8339CA4A

## related_concept_ids
CON-NEU-157E05FAF3B100 | CON-NEU-2235199E9F4373 | CON-NEU-F119674A8DFD8D | CON-NEU-763D2F7A1571C9 | CON-NEU-D8701340C2EAA0

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.6

## exam_weight_by_year
KAU_Y1=0.6

## clinical_relevance
0.4

## academic_relevance
0.95

## weight_confidence
0.3

## confidence
0.9

## exam_signal
src_37f6c0daf3436096af19 | end_of_year | 2025 | p15 | 103 BMS

## atomic_claim_ids
CLM-NEU-AP-DEPOLARIZATION-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Physiology Q1, 5 marks] Describe ionic bases of depolarization phase of action potential.

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-CVS-77AA16A0BD5F70

## conflicts
[clear]

## uncertainty
The department book gives the firing level as −65 mV and the overshoot as +35 mV without stating the spread around either figure, and other undergraduate texts quote a firing level anywhere between −70 and −50 mV. Which figure a marker expects is a local convention, not a settled number.

## evidence_gaps
Supported by the department book only. No independent verification against an international physiology reference has been attached.

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

## exclusion_reason

## field_notes
microtopicId: The book's own section, "Ionic basis of action potential", is already carried by module_subject; the canonical tree has no node finer than DIS-PHY-T07 to hold it.
nanotopicId: No nanotopic exists below the microtopic level for neurophysiology, and inventing one would place this concept somewhere nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the exam paper and the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "depolarization", "action potential" and "ionic basis" — no concept candidate record exists for this idea.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Checked against the department's "Theoretical topics not included in final theoretical exam: 103". Ionic basis of action potential is not on that list; the two action-potential entries that are on it are "Monophasic and Biphasic Action Potential" and "Compound Action Potential", which are different sections of the book (pp25–26).
rejectedMergeCandidateIds: CON-CVS-77AA16A0BD5F70 states the same −90 mV to −65 mV transition for a working cardiac myocyte. Not merged — 00-START-HERE §4 requires the label to be disambiguated where two subjects mean different things by the same words, and cardiac and nerve action potentials differ in their calcium phase and their refractory behaviour.
relationships: Walked the 66 concepts under DIS-PHY-T07 and the 8 under DIS-PHY-T01. Nothing there states the depolarisation mechanism; the live set covers resting potential, stimulus properties and special senses. Four loose neighbours are in related_concept_ids. No typed edges are written — this batch authors no relations file, and the prerequisite_of edges from resting membrane potential to this concept are owed.

---

# Item

## label
The voltage-gated sodium channel has two gates, which give it three states

## id
CON-NEU-157E05FAF3B100

## canonical_key
nerve.sodium-channel.activation-inactivation-gates

## aliases
Activation and inactivation gates
Voltage-gated Na+ channel gating
Three conformational states of the sodium channel
Na channel activation gate
Na channel inactivation gate

## arabic_label
بوابتا قناة الصوديوم ذات البوابة الجهدية

## arabic_aliases
بوابة التنشيط وبوابة التعطيل
الحالات الثلاث لقناة الصوديوم

## definition
The voltage-gated sodium channel carries an activation gate near the outer surface and an inactivation gate on the inner surface. At the resting membrane potential the activation gate is closed and the inactivation gate is open, so the channel is resting; opening the outer gate makes it activated; closing the inner gate makes it inactivated. The voltage-gated potassium channel has only one gate, on its inner surface, and no inactivation gate at all.

## explicit_objective
Name the two gates of the voltage-gated sodium channel, state the position of each at rest, and explain why an inactivated channel is not the same thing as a closed one.

## pitfalls
Treating "closed" and "inactivated" as one state. A resting channel is closed at the activation gate and can open at once; an inactivated channel is shut at the inactivation gate and must return to the resting state before it can open again. That difference is the whole cause of the absolute refractory period.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
neuro

## primary_node_id
DIS-PHY-T07

## secondary_node_ids
DIS-PHY-T01 | SYS-NEU-T01-S02-M03

## topic
Neurophysiology

## subtopic
Physiology of the Nerve

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Ionic basis of action potential

## article_ids
ART-103-PHY-NERVE-ACTION-POTENTIAL

## related_article_ids
ART-NEU-TOP-5A8339CA4A

## related_concept_ids
CON-NEU-7A30FECF042995 | CON-NEU-2235199E9F4373 | CON-NEU-F119674A8DFD8D | CON-FND-2EDA697071E588 | CON-FND-CB479ED34E555F

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.45

## exam_weight_by_year
KAU_Y1=0.45

## clinical_relevance
0.5

## academic_relevance
0.85

## weight_confidence
0.25

## confidence
0.9

## exam_signal
src_37f6c0daf3436096af19 | end_of_year | 2025 | p15 | 103 BMS

## atomic_claim_ids
CLM-NEU-NA-CHANNEL-GATES-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Physiology Q1, 5 marks] Describe ionic bases of depolarization phase of action potential.

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-FND-CB479ED34E555F | CON-FND-2EDA697071E588

## conflicts
[clear]

## uncertainty
The book names the three states in a figure legend ("The three conformation states of the Na+ voltage-gated channel") but never lists them in prose, so the exact wording a marker expects for the third state — resting, closed, or recovered — is not fixed by the source.

## evidence_gaps
Supported by the department book only. No independent verification against an international physiology reference has been attached.

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

## exclusion_reason

## field_notes
microtopicId: The book's own section, "Ionic basis of action potential", is carried by module_subject; the canonical tree has no finer node than DIS-PHY-T07.
nanotopicId: No nanotopic below the microtopic level exists for neurophysiology.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "sodium channel", "activation gate", "inactivation" and "voltage-gated" — no concept candidate record exists.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Checked against the department's exclusion list for 103. Channel gating sits inside "Ionic basis of action potential", which is not excluded.
rejectedMergeCandidateIds: Two live records read and dismissed. CON-FND-CB479ED34E555F says ligand-gated channels open when a ligand binds a receptor; CON-FND-2EDA697071E588 says ungated or leak channels remain open continuously. Neither is merged — those are the other two gating classes in the book's own scheme, opened by a chemical or not gated at all, and the two-gate arrangement described here belongs only to the voltage-gated channel. Both are filed under subjectId "medical", so a search by subject would have missed them; they were found by searching the label text for "channel" and "gated".
relationships: Walked the concepts under DIS-PHY-T07 and DIS-PHY-T01, and searched the CON-FND-* block by text rather than by subject, because 85 of those records carry the legacy subjectId "medical" and a subject filter hides them. The live set holds ligand-gated, leak and carrier-mediated transport but nothing on voltage gating. Five neighbours are in related_concept_ids; the prerequisite_of edge into the depolarisation concept is owed to a relations batch nobody has claimed.

---

# Item

## label
The absolute refractory period is when no stimulus of any strength can fire a second action potential

## id
CON-NEU-2235199E9F4373

## canonical_key
nerve.refractory.absolute

## aliases
Absolute refractory period
ARP
A.R.P.
Zero excitability period

## arabic_label
فترة الجموح المطلقة

## arabic_aliases
الفترة اللاإستجابية المطلقة
فترة عدم الاستجابة المطلقة

## definition
The absolute refractory period is the time during which another action potential cannot be produced whatever the strength of the stimulus. It runs from the firing level to the early part of repolarisation, and it exists because all the voltage-gated sodium channels have opened and then been rapidly inactivated by their inner gate, leaving none available to carry a second upstroke.

## explicit_objective
Define the absolute refractory period, state the part of the action potential it occupies, and explain it from the state of the sodium channels.

## pitfalls
Saying the membrane is "too depolarised" to fire again. The bar is not the voltage but the channels: an inactivated sodium channel cannot open at any stimulus strength until it has returned to the resting state, and no amount of extra current substitutes for that.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
neuro

## primary_node_id
DIS-PHY-T07

## secondary_node_ids
DIS-PHY-T01 | SYS-NEU-T01-S02-M03

## topic
Neurophysiology

## subtopic
Physiology of the Nerve

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > There are two refractory periods

## article_ids
ART-103-PHY-NERVE-ACTION-POTENTIAL

## related_article_ids
ART-NEU-TOP-5A8339CA4A

## related_concept_ids
CON-NEU-F119674A8DFD8D | CON-NEU-7A30FECF042995 | CON-NEU-157E05FAF3B100

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.6

## exam_weight_by_year
KAU_Y1=0.6

## clinical_relevance
0.5

## academic_relevance
0.95

## weight_confidence
0.3

## confidence
0.9

## exam_signal
src_37f6c0daf3436096af19 | end_of_year | 2025 | p16 | 103 BMS

## atomic_claim_ids
CLM-NEU-REFRACTORY-ABSOLUTE-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Physiology Q2, 6 marks] Compare between absolute and relative refractory periods.

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-CVS-1AD44A19DA47AD

## conflicts
[clear]

## uncertainty
The book ends the absolute refractory period at "the early part of repolarization" without giving a millivolt value or a duration, so where exactly it hands over to the relative period is left unstated.

## evidence_gaps
Supported by the department book only. No independent verification against an international physiology reference has been attached.

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

## exclusion_reason

## field_notes
microtopicId: The book's section "There are two refractory periods" is carried by module_subject; the canonical tree stops at DIS-PHY-T07.
nanotopicId: No nanotopic exists below the microtopic level for neurophysiology.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "refractory", "refractory period", "absolute refractory" and "ARP" — no concept candidate record exists.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Checked against the department's exclusion list for 103. "There are two refractory periods" is not on it.
rejectedMergeCandidateIds: CON-CVS-1AD44A19DA47AD is the only live record the word "refractory" returns, and it is refractory *shock* — a circulatory concept with no relation to membrane excitability. Recorded so the next author does not re-run the search and hesitate over the same word collision.
relationships: Walked the 66 concepts under DIS-PHY-T07. No live concept covers either refractory period. The pair this and CON-NEU-F119674A8DFD8D form is exactly an often_confused_with edge and is owed to a relations batch; nothing in this batch authors relations.

---

# Item

## label
The relative refractory period is when only a stronger-than-threshold stimulus can fire a second action potential

## id
CON-NEU-F119674A8DFD8D

## canonical_key
nerve.refractory.relative

## aliases
Relative refractory period
RRP
R.R.P
Period of reduced excitability

## arabic_label
فترة الجموح النسبية

## arabic_aliases
الفترة اللاإستجابية النسبية
فترة عدم الاستجابة النسبية

## definition
The relative refractory period is the time during which another action potential can still be produced, but only by a stimulus stronger than threshold. It begins at the end of the absolute refractory period and ends when the membrane potential returns to its resting level. Two things make it costly: only some sodium channels have returned to the resting state and are available, and the potassium channels opened during repolarisation are carrying potassium outwards, which opposes the inward sodium current.

## explicit_objective
Define the relative refractory period, state where it begins and ends on the action potential, and give both ionic reasons why a larger stimulus is needed.

## pitfalls
Giving only the sodium half of the explanation. Reduced sodium availability is one reason; the outward potassium current that is still flowing is the other, and an answer that omits it loses the second mark in a paper that asks for the cause.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
neuro

## primary_node_id
DIS-PHY-T07

## secondary_node_ids
DIS-PHY-T01 | SYS-NEU-T01-S02-M03

## topic
Neurophysiology

## subtopic
Physiology of the Nerve

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > There are two refractory periods

## article_ids
ART-103-PHY-NERVE-ACTION-POTENTIAL

## related_article_ids
ART-NEU-TOP-5A8339CA4A

## related_concept_ids
CON-NEU-2235199E9F4373 | CON-NEU-7A30FECF042995 | CON-NEU-157E05FAF3B100

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.6

## exam_weight_by_year
KAU_Y1=0.6

## clinical_relevance
0.5

## academic_relevance
0.95

## weight_confidence
0.3

## confidence
0.9

## exam_signal
src_37f6c0daf3436096af19 | end_of_year | 2025 | p16 | 103 BMS

## atomic_claim_ids
CLM-NEU-REFRACTORY-RELATIVE-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Physiology Q2, 6 marks] Compare between absolute and relative refractory periods.

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-NEU-372B07D041D0AD

## conflicts
[clear]

## uncertainty
The book ends the relative refractory period when the membrane potential "returns to its resting level", which by its own account of hyperpolarisation happens twice — once at the end of repolarisation and again after the 35–40 ms hyperpolarising phase. Which return it means is not stated.

## evidence_gaps
Supported by the department book only. No independent verification against an international physiology reference has been attached.

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

## exclusion_reason

## field_notes
microtopicId: The book's section "There are two refractory periods" is carried by module_subject; the canonical tree stops at DIS-PHY-T07.
nanotopicId: No nanotopic exists below the microtopic level for neurophysiology.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "relative refractory", "RRP" and "refractory period" — no concept candidate record exists.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Checked against the department's exclusion list for 103. "There are two refractory periods" is not on it.
rejectedMergeCandidateIds: CON-NEU-372B07D041D0AD defines excitability itself. Not merged — "define excitability" and "define the relative refractory period" are separate objectives, and a question can test either without the other.
relationships: Walked the 66 concepts under DIS-PHY-T07. No live concept covers either refractory period. This and CON-NEU-2235199E9F4373 are an often_confused_with pair and a contrasts_with pair; both edges are owed to a relations batch this task does not author.

---

# Item

## label
Tension in skeletal muscle is generated by the four-step cycling of the cross-bridges

## id
CON-MSK-B2B106C1D81C30

## canonical_key
muscle.skeletal-tension.cross-bridge-cycle

## aliases
Generation of tension
Cross-bridge cycle
Cross bridge cycling
Steps of generation of tension during skeletal muscle contraction
Sliding filament cross-bridge cycle

## arabic_label
توليد التوتر بدورة الجسور المتصالبة

## arabic_aliases
دورة الجسور المتصالبة
خطوات توليد الشد في العضلة الهيكلية

## definition
Tension is the force a muscle develops when it contracts, and it is produced by cross-bridges cycling through four steps: actin and myosin bind spontaneously once calcium has bound troponin C and tropomyosin has moved off the active site; the cross-bridge bends and slides the actin filament across the myosin, using energy from ATP hydrolysis; the cross-bridge detaches when ADP and inorganic phosphate leave and a new ATP takes their place; and it returns to its upright position to cycle again. Cycling continues while calcium remains on troponin C and ATP is available, and the force passes through actin to the Z disc, the sarcolemma and the tendon.

## explicit_objective
Explain the four steps by which cross-bridge cycling generates tension in a skeletal muscle fibre, and state what keeps the cycle running.

## pitfalls
Saying the filaments themselves shorten. They do not — the thick and thin filaments keep their length and slide past one another, and the sarcomere shortens because of the sliding. A student who writes "the actin filament shortens" has described something that does not happen.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-PHY-T01

## secondary_node_ids
DIS-HIS-T02 | SYS-MSK-T01

## topic
Cell and membrane physiology

## subtopic
Physiology of the Muscle

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > Changes Following Skeletal Muscle Stimulation

## article_ids
ART-103-PHY-SKELETAL-MUSCLE-TENSION

## related_article_ids
ART-MSK-TOP-B54C248DF1

## related_concept_ids
CON-MSK-AC42FE7AB41DF2 | CON-MSK-762A229FC8FE5F | CON-MSK-70448A9B07D24A | CON-MSK-1AA4B301236114 | CON-MSK-887E6865C712BA

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.55

## exam_weight_by_year
KAU_Y1=0.55

## clinical_relevance
0.4

## academic_relevance
0.9

## weight_confidence
0.3

## confidence
0.9

## exam_signal
src_37f6c0daf3436096af19 | end_of_year | 2025 | p17 | 103 BMS

## atomic_claim_ids
CLM-MSK-TENSION-CROSS-BRIDGE-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Physiology Q3, 4 marks] Explain steps of generation of tension during skeletal muscle contraction.

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-MSK-762A229FC8FE5F | CON-MSK-70448A9B07D24A | CON-MSK-CABCD15AA2B0F2

## conflicts
[clear]

## uncertainty
The book says binding of actin and myosin "occurs spontaneously" once the active site is uncovered, without saying what supplies the energy for the bend that follows the binding rather than the binding itself. Standard accounts place the ATP hydrolysis before the power stroke; the book places it at the bend. The order is not resolvable from this source.

## evidence_gaps
Supported by the department book only. No independent verification against an international physiology reference has been attached.

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

## exclusion_reason

## field_notes
microtopicId: The book's own section, step 3 of "Changes Following Skeletal Muscle Stimulation", is carried by module_subject; the canonical tree has no node finer than DIS-PHY-T01 for muscle mechanics.
nanotopicId: No nanotopic exists below the microtopic level for muscle physiology.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "cross-bridge", "generation of tension", "sliding filament" and "cycling" — no concept candidate record exists for the cycle as a whole.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Checked against the department's exclusion list for 103. "Generation of tension" is step 3 of the Mechanical Changes section on p33. The excluded muscle headings are "Types of Skeletal Muscle Contraction" (p35 onward), "Metabolic Changes Following Skeletal Muscle Stimulation" (pp43–45) and "Electromyography, Muscular hypertrophy, Reaction of muscle to denervation" (pp45–46). This concept is in none of them.
rejectedMergeCandidateIds: Three live records were read and dismissed. CON-MSK-762A229FC8FE5F states that calcium permits actin to slide over myosin toward the A-band centre — the trigger, not the cycle that produces force. CON-MSK-70448A9B07D24A and CON-MSK-CABCD15AA2B0F2 are the band-change account of contraction (I band shortens, H zone disappears, A band preserved, no filament shortening); all three are histology-view records on DIS-HIS-T03 taken from a histology source. Separate objectives: "say which bands change" versus "explain the four steps that generate tension". A paper can ask either without the other, and this paper asked only the second. Kept separate and cross-linked; the band-change record is what this concept's pitfall points at.
relationships: Walked the 15 concepts under DIS-PHY-T08, the muscle concepts on DIS-HIS-T03 where the live muscle set actually sits rather than under any SYS-MSK node, and the sibling histology batch in this directory. Nothing anywhere covers the cross-bridge cycle. Five loose neighbours are in related_concept_ids; a mechanism_step_before edge from calcium release to this concept, and an often_confused_with edge to the band-change record, are both owed to a relations batch nobody has claimed.

---

# Item

## label
A cross-bridge cannot detach without a fresh ATP, and without ATP the muscle goes into contracture

## id
CON-MSK-AC42FE7AB41DF2

## canonical_key
muscle.skeletal-cross-bridge.atp-detachment

## aliases
ATP and cross-bridge detachment
Muscle contracture
Role of ATP in muscle relaxation
Rigor
Detachment of the cross-bridge

## arabic_label
دور الـ ATP في فك ارتباط الجسور المتصالبة

## arabic_aliases
تقفع العضلة عند نقص الطاقة
الحاجة إلى ATP لفصل الأكتين عن الميوسين

## definition
Detaching a cross-bridge from actin requires that ADP and inorganic phosphate leave the head and a new ATP molecule take their place; the new ATP is what lowers the head's affinity for the active site. If no ATP is available the thick and thin filaments cannot be separated, and the muscle is held in contracture — the same loss of ATP that puts every muscle of the body into the rigidity of rigor mortis after death.

## explicit_objective
Explain why ATP is needed to end a cross-bridge cycle rather than to start it, and predict what happens to a muscle when ATP runs out.

## pitfalls
Assuming ATP is needed only for contraction, so that a dead or exhausted muscle should go limp. It is the opposite: ATP is consumed to *break* the actin–myosin bond, so its absence leaves the filaments locked together and the muscle stiff.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-PHY-T01

## secondary_node_ids
DIS-HIS-T02 | SYS-MSK-T01

## topic
Cell and membrane physiology

## subtopic
Physiology of the Muscle

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > Changes Following Skeletal Muscle Stimulation

## article_ids
ART-103-PHY-SKELETAL-MUSCLE-TENSION

## related_article_ids
ART-MSK-TOP-B54C248DF1

## related_concept_ids
CON-MSK-B2B106C1D81C30 | CON-MSK-762A229FC8FE5F | CON-MSK-1AA4B301236114

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.4

## exam_weight_by_year
KAU_Y1=0.4

## clinical_relevance
0.5

## academic_relevance
0.8

## weight_confidence
0.25

## confidence
0.9

## exam_signal
src_37f6c0daf3436096af19 | end_of_year | 2025 | p17 | 103 BMS

## atomic_claim_ids
CLM-MSK-CROSS-BRIDGE-ATP-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Physiology Q3, 4 marks] Explain steps of generation of tension during skeletal muscle contraction.

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-MSK-1AA4B301236114

## conflicts
[clear]

## uncertainty
The book uses "contracture" for the ATP-depleted state in the muscle chapter and "contracture" again for rigor mortis, without saying whether it treats them as the same phenomenon at different time scales. It states the mechanism identically in both places, which suggests it does, but does not say so.

## evidence_gaps
Supported by the department book only. No independent verification against an international physiology reference has been attached.

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

## exclusion_reason

## field_notes
microtopicId: The book's own subsection, step 3c of "Changes Following Skeletal Muscle Stimulation", is carried by module_subject; the canonical tree stops at DIS-PHY-T01.
nanotopicId: No nanotopic exists below the microtopic level for muscle physiology.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "contracture", "rigor", "ATP" and "detachment" — no concept candidate record exists.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Checked against the department's exclusion list for 103. This is part of the Mechanical Changes section on p33; the excluded muscle topics are Types of Skeletal Muscle Contraction, Metabolic Changes Following Skeletal Muscle Stimulation, and Electromyography / Muscular hypertrophy / Reaction of muscle to denervation. Rigor Mortis (p46) is named in the book but is not on the exclusion list either.
rejectedMergeCandidateIds: CON-MSK-1AA4B301236114 states that active calcium reuptake into the sarcoplasmic reticulum ends contraction. Not merged — that is how the *signal* is withdrawn, this is why the *bond* cannot be broken without ATP, and a muscle with calcium removed but no ATP still cannot relax.
relationships: Walked the 15 concepts under DIS-PHY-T08 and the muscle set on DIS-HIS-T03. Nothing states the ATP-detachment requirement. Three loose neighbours are in related_concept_ids; a causes edge from ATP depletion to contracture is owed to a relations batch this task does not author.

---

# Item

## label
Five groups of factors modify smooth muscle contraction

## id
CON-MSK-A22F7D478A747E

## canonical_key
muscle.smooth-contraction.controlling-factors

## aliases
Factors affecting smooth muscle contraction
Control of contractions of smooth muscle
Factors controlling smooth muscle
Stimulatory factors acting on smooth muscle

## arabic_label
العوامل المؤثرة على تقلص العضلات الملساء

## arabic_aliases
التحكم في تقلص العضلة الملساء
العوامل المنظمة لانقباض العضلات الملساء

## definition
Smooth muscle contraction is modified by five groups of factors. Stretch makes visceral smooth muscle contract, so a distended hollow organ empties itself. Local factors act in both directions — acids, excess carbon dioxide and lack of oxygen relax it; alkalis and excess potassium contract it. Cold increases contraction. Humoral factors act through membrane receptors, excitatory ones raising cytoplasmic calcium and inhibitory ones lowering it. The autonomic nerve supply is the fifth, and it modifies activity rather than starting it.

## explicit_objective
Summarise the five groups of factors that affect smooth muscle contraction, and give the direction of effect for each.

## pitfalls
Answering with the excitation–contraction coupling steps instead. The question asks what *modifies* contraction, not how a contraction is produced; listing calcium, calmodulin and myosin light-chain kinase answers a different question and earns none of the marks for this one.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-PHY-T01

## secondary_node_ids
DIS-PHY-T05 | DIS-HIS-T02

## topic
Cell and membrane physiology

## subtopic
Smooth Muscles

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Smooth Muscles > Control of Contractions of Smooth Muscle

## article_ids
ART-103-PHY-SMOOTH-MUSCLE-CONTROL

## related_article_ids
ART-103-PHY-SKELETAL-MUSCLE-TENSION

## related_concept_ids
CON-MSK-D97EA196E6719C | CON-MSK-B2B106C1D81C30

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.55

## exam_weight_by_year
KAU_Y1=0.55

## clinical_relevance
0.6

## academic_relevance
0.9

## weight_confidence
0.3

## confidence
0.85

## exam_signal
src_37f6c0daf3436096af19 | end_of_year | 2025 | p18 | 103 BMS

## atomic_claim_ids
CLM-MSK-SMOOTH-FACTORS-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Physiology Q4, 4 marks] Summarize factors affecting smooth muscle contraction.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
Cold: the department book states plainly that "Cold: increases the contraction of smooth muscles". Several standard physiology texts describe cooling as reducing visceral smooth muscle contractility while producing cutaneous vasoconstriction, which is a different mechanism. The book's position is what this module examines and is recorded here without being silently corrected.

## uncertainty
The book gives no magnitudes and no receptor names for the humoral factors — only "excitatory receptors" and "inhibitory receptors" — so which transmitters belong to which class is not recoverable from this source.

## evidence_gaps
Supported by the department book only. No independent verification against an international physiology reference has been attached, and the conflict recorded above is unresolved.

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

## exclusion_reason

## field_notes
microtopicId: The book's own section, "Control of Contractions of Smooth Muscle", is carried by module_subject; the canonical tree has no node finer than DIS-PHY-T01 for smooth muscle.
nanotopicId: No nanotopic exists below the microtopic level for smooth muscle physiology.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "smooth muscle", "muscle tone", "stretch" and "spontaneous" — no concept candidate record exists for the control of smooth muscle.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Checked against the department's exclusion list for 103. No smooth-muscle topic appears on that list at all.
rejectedMergeCandidateIds: Left empty deliberately. Five searches — "smooth muscle", "muscle tone", "spontaneous", "stretch", "latch" — returned no live concept about smooth muscle contraction; the five smooth-muscle hits are respiratory and haematology records about where smooth muscle is arranged, not about what makes it contract. There was nothing to reject.
relationships: Walked the concepts under DIS-PHY-T01, DIS-PHY-T05 and DIS-HIS-T02. No live concept covers smooth muscle control. The contrasts_with edge to the skeletal-muscle tension concept is the one worth writing and is owed to a relations batch this task does not author.

---

# Item

## label
Smooth muscle contracts spontaneously without any nerve supply, and the autonomic nerves only modify it

## id
CON-MSK-D97EA196E6719C

## canonical_key
muscle.smooth-contraction.spontaneous-activity-and-nerve-supply

## aliases
Spontaneous activity of smooth muscle
Smooth muscle tone
Rhythmic contractions of smooth muscle
Role of nerve supply in smooth muscle
Dual autonomic supply to smooth muscle

## arabic_label
النشاط التلقائي للعضلات الملساء ودور الإمداد العصبي

## arabic_aliases
التقلصات التلقائية للعضلة الملساء
التوتر العضلي الملساء

## definition
Smooth muscle tends to contract on its own, either rhythmically or as a maintained partial contraction called muscle tone, and it does this even when isolated with no nerve supply at all. Its dual supply from the two divisions of the autonomic nervous system does not initiate that activity; it modifies it, by altering the spontaneous activity itself and by altering the muscle's sensitivity to chemical agents.

## explicit_objective
State that smooth muscle activity is intrinsic, and explain what the autonomic supply does to it instead of starting it.

## pitfalls
Reasoning from skeletal muscle, where cutting the nerve abolishes contraction, and concluding that a denervated gut or bladder is silent. Smooth muscle keeps contracting; denervation changes the pattern and the sensitivity, not the existence of the activity.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-PHY-T01

## secondary_node_ids
DIS-PHY-T05 | DIS-HIS-T02

## topic
Cell and membrane physiology

## subtopic
Smooth Muscles

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Smooth Muscles > Control of Contractions of Smooth Muscle

## article_ids
ART-103-PHY-SMOOTH-MUSCLE-CONTROL

## related_article_ids
ART-103-PHY-SKELETAL-MUSCLE-TENSION

## related_concept_ids
CON-MSK-A22F7D478A747E | CON-CVS-C9E53B5A691D19

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.4

## exam_weight_by_year
KAU_Y1=0.4

## clinical_relevance
0.6

## academic_relevance
0.8

## weight_confidence
0.25

## confidence
0.85

## exam_signal
src_37f6c0daf3436096af19 | end_of_year | 2025 | p18 | 103 BMS

## atomic_claim_ids
CLM-MSK-SMOOTH-SPONTANEOUS-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Physiology Q4, 4 marks] Summarize factors affecting smooth muscle contraction.

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-CVS-C9E53B5A691D19

## conflicts
[clear]

## uncertainty
The book says stimulatory factors "can initiate contractions via eliciting action potentials or even without action potential" but does not say which factors act by which route, so the mechanism behind the second case is not recoverable from this source.

## evidence_gaps
Supported by the department book only. No independent verification against an international physiology reference has been attached.

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

## exclusion_reason

## field_notes
microtopicId: The book's own section, "Control of Contractions of Smooth Muscle", is carried by module_subject; the canonical tree stops at DIS-PHY-T01.
nanotopicId: No nanotopic exists below the microtopic level for smooth muscle physiology.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "spontaneous", "muscle tone", "single-unit" and "visceral" — no concept candidate record exists.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Checked against the department's exclusion list for 103. No smooth-muscle topic appears on that list.
rejectedMergeCandidateIds: CON-CVS-C9E53B5A691D19 says automaticity and rhythmicity arise from spontaneous regular pacemaker action potentials. Not merged — that is cardiac pacemaker tissue, where the spontaneous activity is a specialised conducting function; here it is a property of ordinary visceral muscle. Cross-linked so the parallel is findable.
relationships: Walked the concepts under DIS-PHY-T01, DIS-PHY-T05 and DIS-HIS-T02, and the cardiac automaticity records under SYS-CVS. An often_confused_with edge to CON-CVS-C9E53B5A691D19 is the one worth writing and is owed to a relations batch this task does not author.

---

# Item

## label
Diffusion across the cell membrane happens simply, in facilitated form through a carrier, or as the osmosis of water

## id
CON-NEU-1D5DC2D67A5291

## canonical_key
membrane.diffusion-osmosis.simple-facilitated-osmosis

## aliases
Simple diffusion
Facilitated diffusion
Carrier-mediated diffusion
Osmosis
Osmotic pressure
Tonicity

## arabic_label
الانتشار البسيط والميسر والتناضح عبر غشاء الخلية

## arabic_aliases
الانتشار الميسر
الضغط الأسموزي
التوتر الأسموزي

## definition
Diffusion is the continual movement of molecules from a region of higher concentration to a region of lower concentration. Simple diffusion moves a substance passively, down its concentration gradient and without binding a carrier protein, either through the lipid bilayer itself (lipid-soluble molecules such as oxygen and nitrogen, water, and small uncharged lipid-insoluble molecules such as urea) or through protein channels, which may be non-gated (always open) or gated by a voltage change (e.g. Na+ channels) or by a ligand (e.g. acetylcholine). Facilitated diffusion is also passive and follows the concentration gradient, but it depends on a specific carrier protein that binds a large molecule such as glucose or an amino acid on one side and releases it, after a conformational change, on the other; it is specific, competitive between similar substrates, saturable at a maximum rate, and more temperature-sensitive than simple diffusion. Osmosis is the diffusion of water, from a region of high water concentration to a region of low water concentration, across a membrane permeable to water but not to the solute. Osmotic pressure is the pressure needed to stop osmosis; it is set by the number of particles per unit volume, not their mass, and in the body the osmolarity of intracellular and extracellular fluid is each about 300 mOsm/L. Tonicity describes a solution's osmolality relative to plasma: isotonic solutions match plasma (300 mOsm/L, e.g. 0.9% NaCl or 5% glucose), hypertonic solutions exceed it, and hypotonic solutions fall short of it.

## explicit_objective
Define simple diffusion, facilitated diffusion and osmosis, list the features that distinguish facilitated diffusion from simple diffusion, and classify a solution as isotonic, hypertonic or hypotonic relative to plasma.

## pitfalls
Treating facilitated diffusion as if it needed ATP. It does not — it is passive and follows the concentration gradient exactly like simple diffusion; the carrier only lets a molecule too large or too polar to cross the bilayer alone make the crossing. What makes a transport process active is moving a substance against its gradient, not the presence of a carrier protein.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
neuro

## primary_node_id
DIS-PHY-T01

## secondary_node_ids
SYS-FND-T01-S01-M01

## topic
Cell and membrane physiology

## subtopic
Transport through the cell membrane

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Transport through the cell membrane > Diffusion

## article_ids
ART-103-PHY-TRANSPORT-MEMBRANE

## related_article_ids
ART-103-PHY-NEURON-EXCITABILITY

## related_concept_ids
CON-NEU-75498C01CA1857 | CON-NEU-42BB9566BBF6CF

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.1

## exam_weight_by_year
KAU_Y1=0.1

## clinical_relevance
0.35

## academic_relevance
0.7

## weight_confidence
0.5

## confidence
0.9

## exam_signal


## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Diffusion: continual movement of molecules, in liquids or in gases, from regions of higher concentration to regions of lower concentration.
Osmosis: Diffusion of water from high concentration of water to low concentration of water across a semi-permeable membrane that is permeable to water but not to the solute.
Tonicity is the osmolality of a solution relative to the osmolality of plasma.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book states the osmolarity of ICF and ECF as a fixed 300 mOsm/L without describing how far this can drift in disease before cells swell or shrink, so no numeric range for tolerable deviation is available from this source.

## evidence_gaps
Supported by the department book only, pages 1 and 4. No independent verification against an international physiology reference has been attached. No exam-paper occurrence exists for this concept; the weight above is a qualitative estimate, not one derived from a sitting.

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

## exclusion_reason
The Physiology department's "Announcement for 1st year physiology final theoretical exam (102, 103 modules)" lists "Theoretical topics not included in final theoretical exam: 103" with seven bullets. "Transport through the cell membrane" is the first bullet and "Intercellular communications" is separately the second, so this heading is excluded from the 2025-2026 final theoretical exam by name. It stays in the tree and is authored here because the department still teaches it in the book and it can appear in other assessments; only the final theory paper drops it.

## field_notes
microtopicId: The book's own section, "I- Diffusion", is carried by module_subject; the canonical tree has no node finer than DIS-PHY-T01 for cell and membrane physiology.
nanotopicId: No nanotopic exists below the microtopic level for cell and membrane physiology.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "diffusion", "osmosis", "facilitated diffusion" and "tonicity" — no concept candidate record exists for this idea.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the concepts under DIS-PHY-T01 and the SYS-FND-T01-S01 membrane cluster. No live concept states simple diffusion, facilitated diffusion or osmosis for this module. The other two transport concepts minted alongside this one are in related_concept_ids; a contrasts_with edge between facilitated diffusion and active transport is owed to a relations batch nobody has claimed.

---

# Item

## label
Active transport moves a substance against its gradient using ATP, primary through the Na+-K+ pump and secondary through a coupled carrier

## id
CON-NEU-75498C01CA1857

## canonical_key
membrane.active-transport.primary-secondary-na-k-pump

## aliases
Primary active transport
Secondary active transport
Na+-K+ pump structure
Uniport, symport and antiport
Sodium-potassium pump

## arabic_label
النقل النشط الأولي والثانوي ومضخة الصوديوم والبوتاسيوم

## arabic_aliases
النقل النشط الأولي
النقل النشط الثانوي
مضخة الصوديوم-البوتاسيوم

## definition
Active transport moves a substance across the cell membrane against its electrochemical gradient. It depends on a specific carrier protein and on energy derived from ATP, which the carrier hydrolyses through its own ATPase activity. By direction, a uniport carries one substance one way (e.g. the Ca++ pump); a symport (cotransport) carries two substances the same way at once (e.g. glucose and Na+ from the intestinal lumen); an antiport (counter-transport) carries one substance one way and another the opposite way (e.g. the Na+-K+ pump). Primary active transport uses ATP directly: the Na+-K+ pump is built of an alpha subunit, which carries the Na+ and K+ binding sites (three Na+ sites on the inner surface, two K+ sites on the outer surface) and an ATP binding site, and a beta subunit, which supplies the ATPase activity that splits ATP into ADP, phosphate and energy; it pumps three Na+ out for every two K+ it pumps in, is electrogenic, maintains the high extracellular Na+ and high intracellular K+ that excitable cells depend on, and helps prevent the cell rupturing by controlling cell volume. Secondary active transport spends no ATP of its own; it rides the gradient a primary pump has already built, as when Na+ pumped out of the cell creates the gradient that then carries glucose in alongside it on the same carrier.

## explicit_objective
Define active transport, distinguish primary from secondary active transport with the Na+-K+ pump and secondary glucose transport as the book's own examples, and state the pump's stoichiometry and its three stated functions.

## pitfalls
Calling the Na+-K+ pump the cause of the resting membrane potential. It is electrogenic and contributes about −4 mV, but the book states plainly that diffusion — chiefly the outward leak of K+ — is the main factor that determines RMP; the pump's job is to maintain the concentration gradients diffusion runs down, not to generate the potential itself.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
neuro

## primary_node_id
DIS-PHY-T01

## secondary_node_ids
SYS-FND-T01-S01-M01

## topic
Cell and membrane physiology

## subtopic
Transport through the cell membrane

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Transport through the cell membrane > Active transport

## article_ids
ART-103-PHY-TRANSPORT-MEMBRANE

## related_article_ids
ART-103-PHY-NEURON-EXCITABILITY

## related_concept_ids
CON-NEU-1D5DC2D67A5291 | CON-NEU-42BB9566BBF6CF | CON-NEU-1E66BE533E894C

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.15

## exam_weight_by_year
KAU_Y1=0.15

## clinical_relevance
0.4

## academic_relevance
0.75

## weight_confidence
0.5

## confidence
0.9

## exam_signal


## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Active transport: it is the transport of substance across the cell membrane against an electrochemical gradient.
The Na+-K+ pump as an example for active transport. The activity of the pump is energy dependent derived from ATP. 3 Na+ are pumped out of the cell and 2 K+ into the cell.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book gives the pump's stoichiometry and subunit roles but does not state how many pump cycles per second a resting nerve or muscle cell runs, so the pump's absolute turnover rate is not recoverable from this source.

## evidence_gaps
Supported by the department book only, pages 4 to 6. No independent verification against an international physiology reference has been attached. No exam-paper occurrence exists for this concept; the weight above is a qualitative estimate.

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

## exclusion_reason
The Physiology department's "Announcement for 1st year physiology final theoretical exam (102, 103 modules)" lists "Theoretical topics not included in final theoretical exam: 103" with seven bullets. "Transport through the cell membrane" is the first bullet and "Intercellular communications" is separately the second, so this heading is excluded from the 2025-2026 final theoretical exam by name. It stays in the tree and is authored here because the department still teaches it in the book and it can appear in other assessments; only the final theory paper drops it.

## field_notes
microtopicId: The book's own section, "II. Active transport", is carried by module_subject; the canonical tree has no node finer than DIS-PHY-T01.
nanotopicId: No nanotopic exists below the microtopic level for cell and membrane physiology.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "active transport", "sodium-potassium pump", "uniport" and "antiport" — no concept candidate record for the general topic exists.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: CON-NEU-1E66BE533E894C, a live record from the sibling MCQ batch, states only the single atomic fact that the pump is electrogenic at a 3:2 stoichiometry; it is cross-linked in related_concept_ids rather than treated as a duplicate, because this record additionally carries the pump's structure, the primary/secondary distinction and the uniport/symport/antiport classification that the atomic record does not. Walked the concepts under DIS-PHY-T01; no other live concept states general active transport for this module.

---

# Item

## label
Cells signal each other directly through gap junctions, or at a distance through neural and hormonal communication

## id
CON-NEU-42BB9566BBF6CF

## canonical_key
membrane.intercellular-communication.gap-neural-hormonal

## aliases
Gap junction communication
Neural communication
Hormonal communication
Endocrine, paracrine and autocrine signalling
Connexon

## arabic_label
التواصل بين الخلايا عبر الوصلات الفجوية والاتصال العصبي والهرموني

## arabic_aliases
الاتصال الصماوي والباراكريني والذاتي
الوصلة الفجوية

## definition
Cells communicate with each other through chemical messengers by three main routes. Gap junctions let a chemical substance pass directly from one cell to the next: hexagonal arrangements of protein units form a connexon on each membrane, and two connexons in line across the intercellular space form a channel that allows rapid passage of ions and substances up to about 1000 molecular weight without ever entering the extracellular fluid, which lets electrical activity propagate rapidly from one cell to another; the channel's diameter is regulated by intracellular Ca++, pH, hormones and drugs. Neural communication releases a neurotransmitter from one neuron across the synaptic cleft to a contiguous cell. Hormonal communication has three forms: endocrine, where a cell secretes a hormone that reaches distant cells by the bloodstream; paracrine, where the hormone reaches neighbouring cells by diffusion through the interstitial fluid; and autocrine, where the hormone acts back on the cell that produced it. Whichever route is used, the chemical messenger binds a specific receptor on the cell membrane, in the cytoplasm or in the nucleus, and exerts its intracellular effect by opening a channel, raising cyclic AMP, or raising free cytoplasmic Ca++.

## explicit_objective
Name the three routes of intercellular communication, state what a gap junction channel allows through and up to what size, and distinguish endocrine, paracrine and autocrine hormonal signalling.

## pitfalls
Treating paracrine and autocrine as the same thing because both act locally. Paracrine signalling reaches a neighbouring cell; autocrine signalling loops back onto the very cell that released the messenger — the distinguishing question is whose receptor the hormone finds, not how far it travels.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
neuro

## primary_node_id
DIS-PHY-T01

## secondary_node_ids
SYS-FND-T01-S01-M01

## topic
Cell and membrane physiology

## subtopic
Transport through the cell membrane

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Transport through the cell membrane > Intercellular communications

## article_ids
ART-103-PHY-TRANSPORT-MEMBRANE

## related_article_ids
ART-103-PHY-NEURON-EXCITABILITY

## related_concept_ids
CON-NEU-1D5DC2D67A5291 | CON-NEU-75498C01CA1857

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.1

## exam_weight_by_year
KAU_Y1=0.1

## clinical_relevance
0.3

## academic_relevance
0.65

## weight_confidence
0.5

## confidence
0.9

## exam_signal


## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Cells communicate with each other via chemical messengers through three main types of communication: Gap Junctions ... Neural ... Hormonal communication include: Endocrine ... Paracrine ... Autocrine.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book names the three intracellular mechanisms — channel opening, raised cAMP, raised cytoplasmic Ca++ — without linking any one of them to a particular receptor family, so which mechanism a given hormone uses cannot be recovered from this source alone.

## evidence_gaps
Supported by the department book only, page 7. No independent verification against an international physiology reference has been attached. No exam-paper occurrence exists for this concept; the weight above is a qualitative estimate.

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

## exclusion_reason
The Physiology department's "Announcement for 1st year physiology final theoretical exam (102, 103 modules)" lists "Theoretical topics not included in final theoretical exam: 103" with seven bullets. "Transport through the cell membrane" is the first bullet and "Intercellular communications" is separately the second, so this heading is excluded from the 2025-2026 final theoretical exam by name. It stays in the tree and is authored here because the department still teaches it in the book and it can appear in other assessments; only the final theory paper drops it. "Intercellular communications" is also independently the second bullet of the same announcement, so it is named twice over.

## field_notes
microtopicId: The book's own section, "Intercellular communications", is carried by module_subject; the canonical tree has no node finer than DIS-PHY-T01.
nanotopicId: No nanotopic exists below the microtopic level for cell and membrane physiology.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "gap junction", "paracrine", "autocrine" and "intercellular communication" — no concept candidate record exists.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the concepts under DIS-PHY-T01. No live concept states the three routes of intercellular communication for this module. The other two transport concepts minted alongside this one are in related_concept_ids.

---

# Item

## label
A neuron is built of a soma, dendrites and an axon, and it signals across a synapse to the next cell

## id
CON-NEU-72BF46A68C48A6

## canonical_key
nerve.neuron.morphology-soma-dendrite-axon

## aliases
Neuron morphology
Soma, dendrites and axon
Presynaptic and postsynaptic neuron
Synaptic knob

## arabic_label
بنية الخلية العصبية: الجسم والزوائد الشجرية والمحور

## arabic_aliases
الخلية العصبية قبل المشبكية وبعد المشبكية
النهاية المشبكية

## definition
The nervous system is a network of neurons specialised for the rapid transfer and integration of information; an activated neuron generates and conducts electrical signals that affect other neurons, muscles or glands. The typical spinal motor neuron has three major parts. The soma is the cell body and acts as the processing centre. Dendrites project out from the soma and receive signals from other neurons. The axon, or nerve fibre, originates from the axon hillock and ends in a number of synaptic knobs that contact other cells — muscle, gland or another neuron — at a site called the synapse; the knobs store synaptic transmitter in granules or vesicles. The neuron whose axon synapses onto another is the presynaptic neuron, and the one it contacts is the postsynaptic neuron. An axon may be only a few millimetres long if it ends on a nearby cell, as it often does within the central nervous system, or many centimetres long if it ends on a distant cell, as it does on a skeletal muscle fibre.

## explicit_objective
Name the three major parts of a typical spinal motor neuron, state what each does, and define presynaptic and postsynaptic in terms of which neuron's axon forms the synapse.

## pitfalls
Assuming every axon is long simply because the textbook diagram draws one running to a distant muscle. The book is explicit that axon length tracks the distance to the target cell — a few millimetres for a nearby central synapse, many centimetres for a skeletal muscle — so length is a consequence of where the axon terminates, not a fixed property of neurons.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
neuro

## primary_node_id
DIS-PHY-T07

## secondary_node_ids
SYS-NEU-T01-S02-M03

## topic
Neurophysiology

## subtopic
Physiology of the Nerve

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > The Neuron

## article_ids
ART-103-PHY-NEURON-EXCITABILITY

## related_article_ids
ART-103-PHY-RMP-EQUATIONS

## related_concept_ids
CON-NEU-1857961B72D49A | CON-NEU-5664D7AB68AD8D

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.3

## exam_weight_by_year
KAU_Y1=0.3

## clinical_relevance
0.4

## academic_relevance
0.85

## weight_confidence
0.2

## confidence
0.9

## exam_signal


## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
The typical spinal motor Neuron is composed of three major parts: 1. Soma: is the cell body of the neuron and acts as a processing center. 2. Dendrites: project out from the soma; they receive signals from other neurons. 3. Axon (Nerve Fiber): it originates from the axon hillock.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book describes the spinal motor neuron as the typical example without stating how far other neuron shapes in the body — sensory or interneuron — depart from this three-part plan, so the generality of this description across all neuron types is not established by this source.

## evidence_gaps
Supported by the department book only, page 8. No independent verification against an international physiology reference has been attached. No exam-paper occurrence exists for this concept; the weight above is a qualitative estimate, not one derived from a sitting.

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

## exclusion_reason


## field_notes
microtopicId: The book's own section, "The Neuron", is carried by module_subject; the canonical tree has no node finer than DIS-PHY-T07.
nanotopicId: No nanotopic exists below the microtopic level for neurophysiology.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "neuron", "soma", "dendrite" and "synaptic knob" — no concept candidate record exists for neuron morphology in this module.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 66 concepts under DIS-PHY-T07. No live concept states basic neuron morphology for this module. CON-NEU-5664D7AB68AD8D (myelination, sibling MCQ batch) is the natural next step from the axon description here and is in related_concept_ids; a prerequisite_of edge is owed to a relations batch nobody has claimed.

---

# Item

## label
Excitability is a living cell's ability to respond to a stimulus, and an effective electrical stimulus needs enough strength, duration and rate of rise

## id
CON-NEU-1857961B72D49A

## canonical_key
nerve.excitability.stimulus-factors

## aliases
Membrane potential and excitability
Stimulus definition
Electrical stimulus factors
Rate of rise of stimulus

## arabic_label
الاستثارة والعوامل المؤثرة على فعالية المنبه الكهربائي

## arabic_aliases
جهد الغشاء كأساس للاستثارة
معدل ارتفاع شدة المنبه

## definition
Membrane potential is the electrical potential difference between the inner and outer surfaces of the cell membrane of every cell in the body, and it underlies excitability, the ability of a living cell to respond to a change in its environment. A stimulus is the change or event that excites the cell and produces a response; stimuli can be electrical, mechanical, chemical or thermal, but the electrical stimulus is preferred experimentally because it resembles the body's own natural stimuli, can be controlled, can be measured accurately, and leaves the tissue undamaged. Nerve and muscle cells are the most excitable cells in the body. Three factors determine whether an electrical stimulus is effective: its strength (intensity) must reach a certain value to produce a response; its duration must be maintained long enough; and its rate of rise matters independently of strength and duration — a rapidly rising stimulus that reaches threshold gives an active response, while a slowly rising stimulus to the same threshold value gives no response at all, a phenomenon called nerve accommodation.

## explicit_objective
Define membrane potential and excitability, list the four kinds of stimulus, explain why the electrical stimulus is preferred experimentally, and name the three factors that make an electrical stimulus effective.

## pitfalls
Assuming that reaching threshold intensity is enough on its own. The book states a third, independent requirement — rate of rise — and a slowly rising stimulus that eventually reaches the same threshold value produces no response, because the nerve accommodates as it rises; strength and duration alone do not predict whether a stimulus will fire the cell.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
neuro

## primary_node_id
DIS-PHY-T07

## secondary_node_ids
SYS-NEU-T01-S02-M03

## topic
Neurophysiology

## subtopic
Physiology of the Nerve

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Membrane Potential (the Basis of Excitability)

## article_ids
ART-103-PHY-NEURON-EXCITABILITY

## related_article_ids
ART-103-PHY-RMP-EQUATIONS

## related_concept_ids
CON-NEU-72BF46A68C48A6 | CON-NEU-BC5C6F99B13676 | CON-NEU-FEC3C15273EB2F

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.35

## exam_weight_by_year
KAU_Y1=0.35

## clinical_relevance
0.4

## academic_relevance
0.85

## weight_confidence
0.2

## confidence
0.9

## exam_signal


## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Excitability: It is the ability of living cells to respond to changes in their environment (stimulus). Factors affecting effectiveness of electric stimulus: 1. Strength (intensity) of the stimulus ... 2. Duration of the stimulus ... 3. Rate of rise of stimulus intensity: Rapidly increased stimulus intensity to threshold value will give active response. But, a slowly increased intensity will not give response (nerve accommodation).

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book names accommodation as the reason a slowly rising stimulus fails but defers its mechanism to a later section ("NB: Accommodation of Nerve Fiber"), so this record states the phenomenon without the mechanism, which belongs to the accommodation concept instead.

## evidence_gaps
Supported by the department book only, page 9. No independent verification against an international physiology reference has been attached. No exam-paper occurrence exists for this concept; the weight above is a qualitative estimate.

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

## exclusion_reason


## field_notes
microtopicId: The book's own section, "Membrane Potential (the Basis of Excitability)", is carried by module_subject; the canonical tree has no node finer than DIS-PHY-T07.
nanotopicId: No nanotopic exists below the microtopic level for neurophysiology.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "excitability", "stimulus" and "membrane potential" — no concept candidate record exists for this general definition in this module.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 66 concepts under DIS-PHY-T07. No live concept states the general definitions of membrane potential, excitability and stimulus for this module. The strength-duration curve and accommodation concepts minted alongside this one are its direct continuations and are in related_concept_ids.

---

# Item

## label
The strength-duration curve is the inverse relationship between a stimulus's intensity and the duration needed to excite the nerve, with rheobase and chronaxie as its two landmarks

## id
CON-NEU-BC5C6F99B13676

## canonical_key
nerve.strength-duration-curve.rheobase-utilization-time

## aliases
Strength-duration curve
Rheobase
Utilization time
Subthreshold stimulus

## arabic_label
منحنى الشدة والزمن ونقطتا الريوباز وزمن الاستخدام

## arabic_aliases
الحد الأدنى لشدة المنبه
زمن استخدام الريوباز

## definition
The strength-duration curve shows the inverse relationship between a stimulus's intensity and the duration it must be applied to an excitable membrane to produce an active response. Within limits, a stronger stimulus needs a shorter duration to excite the nerve, but an extremely short-duration stimulus will not excite the nerve no matter how intense it is. Rheobase is the threshold stimulus: the minimum intensity that can excite the nerve, however long it is applied. A stimulus below rheobase (subthreshold) produces only a local response or local excitatory state, not a propagated impulse. Utilization time is the duration needed for a stimulus at exactly rheobase intensity to produce a response. Chronaxie is the duration needed for a stimulus at twice rheobase intensity to produce a response, and it is used as an index of excitability.

## explicit_objective
Describe the shape of the strength-duration curve, define rheobase and utilization time in relation to it, and state what chronaxie measures and why it is used as an excitability index.

## pitfalls
Confusing rheobase with chronaxie. Rheobase is an intensity — the minimum current that can ever excite the nerve, regardless of how long it runs. Chronaxie is a duration — the time a current at twice that intensity needs to excite the nerve. Mixing the units up is the commonest error on this curve.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
neuro

## primary_node_id
DIS-PHY-T07

## secondary_node_ids
SYS-NEU-T01-S02-M03

## topic
Neurophysiology

## subtopic
Physiology of the Nerve

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > The Strength-Duration Curve

## article_ids
ART-103-PHY-NEURON-EXCITABILITY

## related_article_ids
ART-103-PHY-RMP-EQUATIONS

## related_concept_ids
CON-NEU-1857961B72D49A | CON-NEU-105A7842809DC1 | CON-NEU-7E784A50D2BBAF

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.35

## exam_weight_by_year
KAU_Y1=0.35

## clinical_relevance
0.4

## academic_relevance
0.85

## weight_confidence
0.2

## confidence
0.9

## exam_signal


## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
The strength-duration curve shows the inverse relationship between stimulus intensity and the duration of its application to an excitable membrane to produce an active response ... Rheobase (threshold stimulus): minimum intensity needed to excite the nerve ... Chronaxie: is the time needed by a double rheobase to produce a response. It is used as an index of excitability.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book gives no worked numeric example of rheobase or chronaxie for a named nerve fibre, so the concept is defined here without a reference value a student could sanity-check a calculation against.

## evidence_gaps
Supported by the department book only, page 10. No independent verification against an international physiology reference has been attached. No exam-paper occurrence exists for this concept; the weight above is a qualitative estimate.

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

## exclusion_reason


## field_notes
microtopicId: The book's own section, "The Strength-Duration Curve", is carried by module_subject; the canonical tree has no node finer than DIS-PHY-T07.
nanotopicId: No nanotopic exists below the microtopic level for neurophysiology.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "strength-duration", "rheobase" and "utilization time" — no concept candidate record for the curve as a whole exists.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: CON-NEU-105A7842809DC1, a live record, already states the chronaxie definition alone ("the duration required for a stimulus at twice rheobase to evoke a response"); it is not duplicated here and is instead named as the specific landmark this broader curve-shape concept contains, in related_concept_ids. Walked the 66 concepts under DIS-PHY-T07; no other live concept states the curve's shape, rheobase or utilization time.

---

# Item

## label
The resting membrane potential is the polarised, un-stimulated potential difference across the membrane, largest in big nerve and skeletal muscle fibres

## id
CON-NEU-8319D639D05322

## canonical_key
nerve.resting-potential.definition-and-magnitude

## aliases
Resting membrane potential definition
Polarized state
RMP magnitude by cell type

## arabic_label
جهد الغشاء الساكن وحالة الاستقطاب ومقداره حسب نوع الخلية

## arabic_aliases
حالة الاستقطاب
مقدار جهد الراحة

## definition
The resting membrane potential (RMP) is the difference in electrical potential, measured in millivolts, between the inner and outer surfaces of the cell membrane under resting, un-stimulated conditions — the polarised state. Its magnitude varies by cell type: about −90 mV in large nerve fibres and in large skeletal muscle fibres, about −70 mV in medium-sized neurons, and only −20 to −40 mV in less excitable cells such as red blood cells and epithelial cells. The negative sign means the inside of the membrane is negative relative to the outside. Membrane potential in a nerve fibre can take several forms depending on conditions: at rest it is the resting membrane potential; on stimulation by an adequate stimulus it is an action potential; on stimulation by an inadequate, subthreshold stimulus, only a localized potential is recorded.

## explicit_objective
Define the resting membrane potential, state its typical magnitude in large nerve/muscle fibres, medium neurons and less-excitable cells, and explain what the negative sign means.

## pitfalls
Quoting a single RMP value, such as −90 mV, as if it applied to every cell. The book gives three different magnitudes for three different classes of cell — large nerve and skeletal muscle fibres, medium neurons, and low-excitability cells such as red cells and epithelium — and a question naming the cell type expects the matching figure, not a single memorised number.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
neuro

## primary_node_id
DIS-PHY-T07

## secondary_node_ids
SYS-NEU-T01-S02-M03

## topic
Neurophysiology

## subtopic
Physiology of the Nerve

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Resting Membrane Potential (RMP): Polarized State

## article_ids
ART-103-PHY-RMP-EQUATIONS

## related_article_ids
ART-103-PHY-NERVE-ACTION-POTENTIAL

## related_concept_ids
CON-NEU-A6D30CFB5F997B | CON-NEU-763D2F7A1571C9 | CON-NEU-8CC845C16CE133

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.45

## exam_weight_by_year
KAU_Y1=0.45

## clinical_relevance
0.5

## academic_relevance
0.9

## weight_confidence
0.2

## confidence
0.9

## exam_signal


## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Definition: It is the difference in electrical potential (measured in mV) between the inner and outer surfaces of the membrane under resting (un-stimulated) conditions. Magnitude: -90 mV in large nerve fibers and in large skeletal muscle fibers; -70 mV in medium-sized neurons; -20 to - 40 mV in less excitable cells (e.g. red blood cells and epithelial cells).

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book does not state where the boundary lies between a "large" and a "medium-sized" fibre in fibre-diameter terms, so which of the two RMP figures applies to a fibre of intermediate size is not fixed by this source.

## evidence_gaps
Supported by the department book only, page 11. No independent verification against an international physiology reference has been attached. No exam-paper occurrence exists for this concept; the weight above is a qualitative estimate.

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

## exclusion_reason


## field_notes
microtopicId: The book's own section, "Resting Membrane Potential: (RMP): Polarized State", is carried by module_subject; the canonical tree has no node finer than DIS-PHY-T07.
nanotopicId: No nanotopic exists below the microtopic level for neurophysiology.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "resting membrane potential", "RMP" and "polarized state" — the two live RMP records found (sign convention and leak directions) are cross-linked, not duplicated.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: CON-NEU-A6D30CFB5F997B (sign convention) and CON-NEU-763D2F7A1571C9 (diffusion as the principal determinant), both live, already cover the ionic-basis heading one level down from this one; this record supplies the definition and the magnitude table the two atomic facts assume, and is cross-linked to both rather than restating them. Walked the 66 concepts under DIS-PHY-T07.

---

# Item

## label
Selective ion permeability accounts for about 95 percent of the resting membrane potential, and the Na+-K+ pump contributes the remaining −4 mV

## id
CON-NEU-8CC845C16CE133

## canonical_key
nerve.rmp.nernst-goldman-relative-contributions

## aliases
Nernst equation
Goldman equation
Equilibrium potential for K+ and Na+
Relative contributions to RMP

## arabic_label
معادلتا نيرنست وغولدمان والمساهمات النسبية في جهد الغشاء الساكن

## arabic_aliases
جهد التوازن للبوتاسيوم والصوديوم
معادلة غولدمان

## definition
The Nernst equation gives the equilibrium potential of a single ion at 37°C. If K+ alone could cross the membrane, its equilibrium potential would be −61 mV × log([K+]in/[K+]out) = −61 × log(35) ≈ −94 mV — close to the real resting potential. If Na+ alone could cross, its equilibrium potential would be −61 mV × log([Na+]in/[Na+]out) = −61 × log(0.1) ≈ +61 mV — far from it. The Goldman equation gives a more accurate prediction by weighing Na+, K+ and Cl− together according to both their concentrations and their relative membrane permeabilities; applied to nerve, it predicts about −86 mV, roughly 95 percent of the resting membrane potential, because the membrane's permeability to K+ is so much higher than to Na+ at rest that the resting potential sits close to the K+ equilibrium potential. The Na+-K+ pump supplies the rest: it is electrogenic and contributes about −4 mV on its own, over and above the potential set by selective permeability.

## explicit_objective
State what the Nernst equation calculates and give the equilibrium potentials it predicts for K+ alone and Na+ alone, then state what the Goldman equation adds and how the selective-permeability and pump contributions to RMP divide numerically.

## pitfalls
Treating the Goldman-predicted −86 mV and the pump's −4 mV as two competing explanations for the resting potential rather than two additive contributions to the same number. The book keeps them separate on purpose — about 95 percent from ion permeability, the small remainder from the pump's own electrogenicity — and a question that asks for "the cause of RMP" wants both parts, not one instead of the other.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
neuro

## primary_node_id
DIS-PHY-T07

## secondary_node_ids
SYS-NEU-T01-S02-M03

## topic
Neurophysiology

## subtopic
Physiology of the Nerve

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Relative Contributions of Ion Fluxes & Na+-K+ Pump to RMP

## article_ids
ART-103-PHY-RMP-EQUATIONS

## related_article_ids
ART-103-PHY-NERVE-ACTION-POTENTIAL

## related_concept_ids
CON-NEU-8319D639D05322 | CON-NEU-763D2F7A1571C9 | CON-NEU-FE158971E5522D | CON-NEU-75498C01CA1857

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.4

## exam_weight_by_year
KAU_Y1=0.4

## clinical_relevance
0.35

## academic_relevance
0.85

## weight_confidence
0.2

## confidence
0.85

## exam_signal


## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
EK+ = - 61 mV. X log [K+]in/[K+]out = -61 mV. X 1.54 = -94 mV. ENa+ = -61 mV. x Log [Na+]in/[Na+]out = -61 x -1 = +61 mV. According to this equation the predicted RMP due to selective permeability of ions is - 86 mV. [about 95% of RMP]. [B] Contribution of sodium-potassium pump to RMP: The pump is electrogenic and contributes to about - 4 mV of the resting membrane potential.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book gives the Goldman equation's formula and its −86 mV output but does not show the intermediate substitution with the relative permeability values for Na+, K+ and Cl−, so a student cannot reconstruct the −86 mV figure step by step from what is printed.

## evidence_gaps
Supported by the department book only, pages 13 and 14. No independent verification against an international physiology reference has been attached. No exam-paper occurrence exists for this concept; the weight above is a qualitative estimate.

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

## exclusion_reason


## field_notes
microtopicId: The book's own section, "Relative Contributions of Ion Fluxes & Na+-K+ Pump to RMP", is carried by module_subject; the canonical tree has no node finer than DIS-PHY-T07.
nanotopicId: No nanotopic exists below the microtopic level for neurophysiology.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "Nernst", "Goldman equation" and "equilibrium potential" — no concept candidate record exists for either equation in this module.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 66 concepts under DIS-PHY-T07; the live leak-direction and RMP-sign records (CON-NEU-FE158971E5522D, CON-NEU-763D2F7A1571C9) state the qualitative story this concept quantifies and are cross-linked rather than restated. No live concept states either equation or the 95%/−4 mV split.

---

# Item

## label
The nerve action potential is a three-phase wave recorded after a latent period, and excitability rises then falls across it

## id
CON-NEU-751C4921A154CC

## canonical_key
nerve.action-potential.phases-and-excitability-changes

## aliases
Action potential definition
Latent period
Three phases of the action potential
Spike duration and hyperpolarisation duration
Excitability changes during the action potential

## arabic_label
تعريف جهد الفعل العصبي وأطواره الثلاثة وتغيرات الاستثارة أثناءه

## arabic_aliases
الفترة الكامنة
طور فرط الاستقطاب

## definition
An action potential is a series of rapid changes in membrane potential that follow stimulation of a nerve fibre by an adequate stimulus, recorded with two microelectrodes. It is preceded by a latent period — the interval between applying the stimulus and the start of the response, corresponding to the time the impulse takes to travel from the stimulating electrode to the recording electrode; if the distance between the electrodes is known, the latent period gives the conduction velocity directly (a 2 msec latent period over 4 cm gives a conduction velocity of 20 m/sec). The wave has three phases: depolarisation, which carries the potential from −90 mV through the −65 mV firing level to an overshoot of +35 mV; repolarisation, rapid for its first 70 percent and slow for the remaining 30 percent, which returns the potential to the resting level; and hyperpolarisation, which carries the potential slightly past the resting level before it settles back. The spike — the sharp rise and rapid fall together — lasts about 2 msec, while the hyperpolarisation lasts 35 to 40 msec. Excitability itself changes across this sequence: during the initial depolarisation up to the firing level it is increased, and through the rest of the action potential the fibre is refractory, which protects the nerve from extremely rapid repetitive stimulation and ensures the impulse propagates one way only, since the segment it has just left cannot be re-excited by it.

## explicit_objective
Define the action potential and the latent period, use the latent period to calculate conduction velocity, name the three phases of the wave with their approximate durations, and state how excitability changes across the wave and why that matters functionally.

## pitfalls
Treating the latent period as part of the action potential's own duration. It is not — it is the conduction time before the wave even begins at the recording electrode, and it is the tool used to calculate speed of conduction, not one of the three phases (depolarisation, repolarisation, hyperpolarisation) that make up the wave itself.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
neuro

## primary_node_id
DIS-PHY-T07

## secondary_node_ids
SYS-NEU-T01-S02-M03

## topic
Neurophysiology

## subtopic
Physiology of the Nerve

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Action Potential
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Nerve fiber response to adequate stimulus
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Excitability Changes during Action Potential

## article_ids
ART-103-PHY-AP-SHAPE-CONDUCTION

## related_article_ids
ART-103-PHY-NERVE-ACTION-POTENTIAL

## related_concept_ids
CON-NEU-7A30FECF042995 | CON-NEU-DD9033DCA3AAF1 | CON-NEU-2DFEA8FD9919EA | CON-NEU-2235199E9F4373

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.45

## exam_weight_by_year
KAU_Y1=0.45

## clinical_relevance
0.45

## academic_relevance
0.9

## weight_confidence
0.2

## confidence
0.9

## exam_signal


## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Definition: series of rapid changes in the membrane potential following stimulation of the nerve fiber by adequate stimulus ... Latent period: Interval between application of a stimulus and the start of the action potential ... The sharp rise and rapid fall of the membrane potential is called "Spike" and it lasts about 2 msec, while the hyper-polarization lasts 35 - 40 msec ... During the initial depolarization up to the firing level→ excitability is increased. During the remaining part of AP; the neuron is refractory to restimulation.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book's worked example converts a 2 msec latent period over 4 cm into 20 m/sec but does not state whether that figure represents a myelinated or unmyelinated fibre, so the example cannot be checked against the book's own conduction-velocity ranges for the two fibre types.

## evidence_gaps
Supported by the department book only, pages 14, 15 and 18. No independent verification against an international physiology reference has been attached. No exam-paper occurrence exists for this concept beyond the ionic-basis and refractory-period questions already covered by the sibling batch; the weight above is a qualitative estimate.

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

## exclusion_reason


## field_notes
microtopicId: The book's own sections, "Action Potential" and "Nerve fiber response to adequate stimulus", are carried by module_subject; the canonical tree has no node finer than DIS-PHY-T07.
nanotopicId: No nanotopic exists below the microtopic level for neurophysiology.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "latent period", "spike duration", "hyperpolarization" and "three phases" — no concept candidate record covering the whole wave shape exists.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: This concept supplies the definition, latent period and phase-timing that the sibling batch's depolarisation-ionic-basis and refractory-period concepts (CON-NEU-7A30FECF042995, CON-NEU-2235199E9F4373, CON-NEU-F119674A8DFD8D) already mechanise in detail, and the live repolarisation record (CON-NEU-DD9033DCA3AAF1); all four are cross-linked in related_concept_ids rather than restated. Walked the 66 concepts under DIS-PHY-T07; no live concept states the wave's three-phase timing or the latent-period-to-velocity calculation.

---

# Item

## label
The nerve action potential obeys the all-or-none law: once triggered it propagates with the same amplitude, duration and shape regardless of stimulus strength

## id
CON-NEU-2DFEA8FD9919EA

## canonical_key
nerve.action-potential.all-or-none-law

## aliases
All or none law (nerve)
Threshold and supra-threshold stimulus response

## arabic_label
قانون كل أو لا شيء لجهد الفعل العصبي

## arabic_aliases
استجابة كل أو لا شيء
المنبه العتبي وفوق العتبي

## definition
The nerve action potential obeys the all-or-none law: once an action potential is generated, it propagates with the same amplitude, duration and shape regardless of whether the triggering stimulus was exactly threshold or far above threshold, as long as the experimental conditions stay constant. A stimulus below threshold produces no propagated action potential at all, only a local, non-propagated response; a stimulus at or above threshold produces the full, fixed-size wave.

## explicit_objective
State the all-or-none law for the nerve action potential and explain what changing a supra-threshold stimulus's strength does and does not change about the resulting wave.

## pitfalls
Assuming a stronger stimulus produces a bigger action potential. It does not — above threshold, the wave's amplitude, duration and shape are fixed by the fibre's own channels, not by the stimulus; a stronger stimulus in a whole nerve trunk instead recruits more fibres, which is a different phenomenon (the compound action potential), not a bigger single-fibre spike.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
neuro

## primary_node_id
DIS-PHY-T07

## secondary_node_ids
SYS-NEU-T01-S02-M03

## topic
Neurophysiology

## subtopic
Physiology of the Nerve

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > All or None law

## article_ids
ART-103-PHY-AP-SHAPE-CONDUCTION

## related_article_ids
ART-103-PHY-NERVE-PROPERTIES

## related_concept_ids
CON-NEU-751C4921A154CC | CON-NEU-18D07BA4202CDA | CON-NEU-7E784A50D2BBAF | CON-MSK-AF4E727C85510D

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.3

## exam_weight_by_year
KAU_Y1=0.3

## clinical_relevance
0.3

## academic_relevance
0.85

## weight_confidence
0.2

## confidence
0.9

## exam_signal


## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
The action potential obeys the all or none law. Once the action potential is generated, it will be propagated with same amplitude, duration and shape; regardless of the intensity of the stimulus (threshold or supra-threshold); as long as the experimental conditions remain constant.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book states the law as holding "as long as the experimental conditions remain constant" without listing which conditions it means, so the exceptions that would break the law are not enumerated by this source.

## evidence_gaps
Supported by the department book only, page 18. No independent verification against an international physiology reference has been attached. No exam-paper occurrence exists for this concept; the weight above is a qualitative estimate.

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

## exclusion_reason


## field_notes
microtopicId: The book's own section, "All or None law", is carried by module_subject; the canonical tree has no node finer than DIS-PHY-T07.
nanotopicId: No nanotopic exists below the microtopic level for neurophysiology.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "all or none" and "all-or-none law" — the live compound-action-potential and local-response records were found and are cross-linked as the two exceptions the law explains (a graded population signal, and a graded non-propagated signal), not duplicated.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 66 concepts under DIS-PHY-T07 and the muscle set; no live concept states the nerve all-or-none law itself, though CON-NEU-18D07BA4202CDA (compound AP is graded) and CON-NEU-7E784A50D2BBAF (local response does not obey it) are its natural contrasts and are in related_concept_ids, alongside the skeletal-muscle version of the law minted in this same batch. A contrasts_with edge to each is owed to a relations batch nobody has claimed.

---

# Item

## label
An unmyelinated axon conducts an action potential by a local circuit of current flowing to the next resting patch of membrane

## id
CON-NEU-76D490DA0BA0E6

## canonical_key
nerve.conduction.unmyelinated-local-circuit

## aliases
Local circuit conduction
Propagation in unmyelinated axons
Speed of conduction and fibre diameter

## arabic_label
التوصيل في المحاور غير المُغمَّدة عبر الدائرة الموضعية

## arabic_aliases
الانتشار المستمر لجهد الفعل
سرعة التوصيل والجذر التربيعي لقطر المحور

## definition
In an unmyelinated axon, the action potential generated at one location acts as the stimulus for an action potential at the adjacent region. During the reversal of polarity, an electrical potential difference forms between the depolarised area and the adjacent resting area, and a local circuit of current flows between them — positive charges move passively toward the area of negativity on both the outer and inner surfaces of the membrane. The adjacent area depolarises, and once it reaches threshold, a new action potential is generated there, while the first, active segment returns to its resting level; the depolarisation from the new action potential then spreads passively and the whole process repeats down the length of the axon. If the fibre is stimulated in the middle, the impulse travels in both directions from that point, and its amplitude does not change as it is conducted along the axon. The speed of this propagation is proportional to the square root of the fibre's diameter.

## explicit_objective
Describe the local-circuit mechanism by which an action potential propagates along an unmyelinated axon, and state how conduction speed relates to fibre diameter in this mode.

## pitfalls
Picturing the action potential as one wave physically travelling down the axon like a wave on a rope. It is not one continuously moving disturbance — it is a chain of freshly regenerated, full-sized action potentials, each one triggered by the local circuit current from its immediate neighbour, and each identical in amplitude to the last because the process obeys the all-or-none law at every step.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
neuro

## primary_node_id
DIS-PHY-T07

## secondary_node_ids
SYS-NEU-T01-S02-M03

## topic
Neurophysiology

## subtopic
Physiology of the Nerve

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Conduction [Propagation] of the Action Potential

## article_ids
ART-103-PHY-AP-SHAPE-CONDUCTION

## related_article_ids
ART-103-PHY-NERVE-PROPERTIES

## related_concept_ids
CON-NEU-A0C8307D2825A6 | CON-NEU-788EA161C3F6FD | CON-NEU-3F92C1DEAFFF01

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.35

## exam_weight_by_year
KAU_Y1=0.35

## clinical_relevance
0.3

## academic_relevance
0.85

## weight_confidence
0.2

## confidence
0.9

## exam_signal


## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
The AP generated at one location on the axon acts as a stimulus for production of an AP on the adjacent regions ... A "local circuit" of current flow occurs between the depolarized area of the membrane and the adjacent resting areas ... The speed of propagation is proportional to the square root of the fiber diameter.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book states that conduction speed is proportional to the square root of fibre diameter for the unmyelinated case, but does not give a numeric conduction-velocity range for unmyelinated axons the way it does for the A/B/C fibre classification table, so no bracketing figure is available here.

## evidence_gaps
Supported by the department book only, pages 20 and 21. No independent verification against an international physiology reference has been attached. No exam-paper occurrence exists for this concept; the weight above is a qualitative estimate.

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

## exclusion_reason


## field_notes
microtopicId: The book's own section, "A. Propagation in Unmyelinated Axons", is carried by module_subject; the canonical tree has no node finer than DIS-PHY-T07.
nanotopicId: No nanotopic exists below the microtopic level for neurophysiology.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "local circuit", "unmyelinated conduction" and "propagation" — the live saltatory-conduction record was found and is cross-linked as the myelinated counterpart, not duplicated.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: CON-NEU-A0C8307D2825A6 (saltatory conduction, live) states the myelinated case; this record states the unmyelinated case the book presents first and contrasts against it, and both are cross-linked. Walked the 66 concepts under DIS-PHY-T07; no live concept states the local-circuit mechanism itself. A contrasts_with edge to the saltatory-conduction record is owed to a relations batch nobody has claimed.

---

# Item

## label
An axon conducts in either direction from its point of stimulation, but only orthodromic conduction — forward, from receptor to termination — normally survives past the first synapse

## id
CON-NEU-788EA161C3F6FD

## canonical_key
nerve.conduction.orthodromic-and-antidromic

## aliases
Orthodromic conduction
Antidromic conduction
Bidirectional axonal conduction

## arabic_label
التوصيل الأورثودرومي والأنتيدرومي في المحور العصبي

## arabic_aliases
التوصيل الأمامي الطبيعي
التوصيل الخلفي العكسي

## definition
An axon can conduct an impulse in either direction: if an action potential is initiated in the middle of an axon, two impulses set off travelling in opposite directions. In living animals, impulses normally travel in one direction only — from synaptic junctions or receptors along the axon to its termination — and this is called orthodromic conduction. Conduction in the opposite direction is antidromic. Because synapses, unlike axons, permit conduction in one direction only, any antidromic impulse that is produced fails to pass the first synapse it meets and dies out there.

## explicit_objective
Define orthodromic and antidromic conduction, and explain why an antidromic impulse dies out at the first synapse it reaches instead of continuing to propagate.

## pitfalls
Assuming antidromic conduction cannot happen because it sounds unnatural. The axon itself conducts perfectly well in either direction — an antidromic impulse travels exactly like an orthodromic one along the fibre. What stops it is the synapse, which is a one-way valve the axon itself is not; the impulse dies at that junction, not along the axon.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
neuro

## primary_node_id
DIS-PHY-T07

## secondary_node_ids
SYS-NEU-T01-S02-M03

## topic
Neurophysiology

## subtopic
Physiology of the Nerve

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Orthodromic and Antidromic Conduction

## article_ids
ART-103-PHY-AP-SHAPE-CONDUCTION

## related_article_ids
ART-103-PHY-NERVE-PROPERTIES

## related_concept_ids
CON-NEU-76D490DA0BA0E6 | CON-NEU-72BF46A68C48A6

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.25

## exam_weight_by_year
KAU_Y1=0.25

## clinical_relevance
0.3

## academic_relevance
0.75

## weight_confidence
0.2

## confidence
0.9

## exam_signal


## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
In living animals, impulses normally pass in one direction i.e. from synaptic junctions or receptors along axons to their termination. Such conduction is called Orthodromic. Conduction in the opposite direction is called antidromic. Since synapses, unlike axons, permit conduction in one direction only, any antidromic impulses that are produced fail to pass the first synapse they meet and die out at that point.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book does not give a clinical example of antidromic conduction being deliberately used or observed (such as an antidromic reflex or a nerve-conduction study technique), so this record states only the physiological definition the book gives.

## evidence_gaps
Supported by the department book only, page 22. No independent verification against an international physiology reference has been attached. No exam-paper occurrence exists for this concept; the weight above is a qualitative estimate.

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

## exclusion_reason


## field_notes
microtopicId: The book's own section, "Orthodromic and Antidromic Conduction", is carried by module_subject; the canonical tree has no node finer than DIS-PHY-T07.
nanotopicId: No nanotopic exists below the microtopic level for neurophysiology.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "orthodromic" and "antidromic" — no concept candidate record exists.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 66 concepts under DIS-PHY-T07; no live concept states orthodromic or antidromic conduction. Cross-linked to the local-circuit conduction concept minted alongside it and to neuron morphology, since the synapse that stops antidromic conduction is defined there.

---

# Item

## label
Accommodation is the failure of a slowly rising subthreshold stimulus to excite the nerve, because slow sodium activation is matched by inactivation and potassium opening

## id
CON-NEU-FEC3C15273EB2F

## canonical_key
nerve.accommodation.slow-rising-stimulus

## aliases
Nerve accommodation
Slow-rising stimulus failure to excite

## arabic_label
تأقلم العصب مع المنبه بطيء الارتفاع

## arabic_aliases
عدم استثارة العصب بالمنبه البطيء التصاعد

## definition
Accommodation of the nerve fibre is what happens when a subthreshold stimulus's intensity is increased gradually, slowly, up to what would otherwise be threshold level: no response is produced, and the nerve is said to be accommodated. The mechanism is a race between two slow processes started by the same slow rise in current: the slow activation (opening) of Na+ channels, which lets Na+ enter slowly, is balanced by the inactivation (closure) of those same Na+ channels together with the opening of K+ channels, so the depolarising drive never gets ahead of the processes that oppose it, and the firing level is never reached.

## explicit_objective
Define accommodation and explain, from the balance of Na+ activation, Na+ inactivation and K+ channel opening, why a slowly rising stimulus fails to excite the nerve even when it eventually reaches what would be threshold intensity.

## pitfalls
Confusing accommodation with a simple failure to reach threshold. The stimulus in accommodation does reach the intensity that would excite the nerve if applied quickly; what defeats it is the slow rate of rise, which gives the very channels the depolarisation is trying to open time to inactivate and gives K+ channels time to open and oppose it, so the membrane never actually gets there.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
neuro

## primary_node_id
DIS-PHY-T07

## secondary_node_ids
SYS-NEU-T01-S02-M03

## topic
Neurophysiology

## subtopic
Physiology of the Nerve

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Accommodation of Nerve Fiber

## article_ids
ART-103-PHY-NERVE-PROPERTIES

## related_article_ids
ART-103-PHY-AP-SHAPE-CONDUCTION

## related_concept_ids
CON-NEU-1857961B72D49A | CON-NEU-157E05FAF3B100

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.3

## exam_weight_by_year
KAU_Y1=0.3

## clinical_relevance
0.3

## academic_relevance
0.8

## weight_confidence
0.2

## confidence
0.85

## exam_signal


## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Gradual "slow" increase in intensity of a subthreshold stimulus to threshold level will give no response. The nerve is said to be accommodated. Mechanism: The slow activation "opening" of Na+ channels with slow entry of Na+ is balanced by inactivation closure of Na+ channels and opening of K+ channels.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book does not give a rate of rise below which accommodation reliably occurs, so no numeric boundary between an "effective" rapidly rising stimulus and an "accommodated" slowly rising one is available from this source.

## evidence_gaps
Supported by the department book only, page 23. No independent verification against an international physiology reference has been attached. No exam-paper occurrence exists for this concept; the weight above is a qualitative estimate.

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

## exclusion_reason


## field_notes
microtopicId: The book's own section, "NB: Accommodation of Nerve Fiber", is carried by module_subject; the canonical tree has no node finer than DIS-PHY-T07.
nanotopicId: No nanotopic exists below the microtopic level for neurophysiology.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "accommodation" and "nerve accommodation" — no concept candidate record exists.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 66 concepts under DIS-PHY-T07; no live concept states accommodation. Cross-linked to the excitability/stimulus concept, whose "rate of rise" factor this mechanism explains, and to the live sodium-channel-gating record, whose inactivation gate is the mechanism's second half.

---

# Item

## label
Nerve fibres are classified into A, B and C types by diameter and conduction velocity, and each class differs in its sensitivity to anaesthesia, pressure and hypoxia

## id
CON-NEU-3F92C1DEAFFF01

## canonical_key
nerve.fibre-classification.a-b-c-types

## aliases
A, B and C nerve fibres
Fibre classification by diameter and velocity
Differential nerve fibre sensitivity

## arabic_label
تصنيف الألياف العصبية إلى أنواع A وB وC

## arabic_aliases
الألياف من نوع A
الألياف من نوع B
الألياف من نوع C

## definition
Nerve fibres are classified into three types by thickness and conduction velocity. A-fibres are 2 to 20 micrometres in diameter, conduct at 20 to 120 m/sec, have a 0.5 msec spike duration, and are exemplified by somatic motor fibres, which further subdivide into alpha, beta, gamma and delta fibres. B-fibres are 1 to 5 micrometres, conduct at 5 to 15 m/sec, have a 1.0 msec spike, and are exemplified by preganglionic autonomic fibres. C-fibres are under 1 micrometre, conduct at 0.5 to 2 m/sec, have a 2.0 msec spike, and are exemplified by postganglionic autonomic fibres. Beyond conduction speed, the classes differ in their sensitivity to environmental factors: local anaesthetics depress transmission in C fibres before they affect A fibres; pressure on a nerve can abolish conduction in A fibres while C fibres stay relatively intact; and B fibres are the most susceptible to hypoxia, while C fibres are the least affected.

## explicit_objective
Reproduce the diameter, conduction velocity and spike-duration values for A, B and C fibres with their tissue examples, and state which fibre class is most and least affected by local anaesthesia, pressure and hypoxia respectively.

## pitfalls
Assuming that whichever property makes a fibre fastest also makes it most resistant to injury or drugs. The book's differential-sensitivity list runs the other way for more than one factor — local anaesthetics hit the thinnest, slowest C fibres first, and B fibres, not the thin C fibres, are the most hypoxia-sensitive class — so fibre size predicts conduction speed but not which insult a fibre resists best.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
neuro

## primary_node_id
DIS-PHY-T07

## secondary_node_ids
SYS-NEU-T01-S02-M03

## topic
Neurophysiology

## subtopic
Physiology of the Nerve

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Nerve fiber types are classified into 3 types according to their thickness and velocity of conduction

## article_ids
ART-103-PHY-NERVE-PROPERTIES

## related_article_ids
ART-103-PHY-AP-SHAPE-CONDUCTION

## related_concept_ids
CON-NEU-5664D7AB68AD8D | CON-NEU-76D490DA0BA0E6 | CON-NEU-A0C8307D2825A6

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.4

## exam_weight_by_year
KAU_Y1=0.4

## clinical_relevance
0.55

## academic_relevance
0.85

## weight_confidence
0.2

## confidence
0.9

## exam_signal


## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Nerve fiber types are classified into 3 types according to their thickness and velocity of conduction: 1. A-fibers 2. B-fibers 3. C-fibers ... Local anesthetics depress transmission in the group C fibers before they affect A group fibers. Pressure on a nerve can cause loss of conduction in A fibers while C fibers remain relatively intact. B fibers are most susceptible to hypoxia while the C fibers are least affected.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book's table gives one diameter and velocity range per class without stating whether alpha, beta, gamma and delta subtypes of A fibres each occupy a distinct sub-range within it, so those four subtypes cannot be individually placed on the table from this source.

## evidence_gaps
Supported by the department book only, page 24. No independent verification against an international physiology reference has been attached. No exam-paper occurrence exists for this concept; the weight above is a qualitative estimate.

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

## exclusion_reason


## field_notes
microtopicId: The book's own table, "Nerve fiber types are classified into 3 types...", is carried by module_subject; the canonical tree has no node finer than DIS-PHY-T07.
nanotopicId: No nanotopic exists below the microtopic level for neurophysiology.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "A fibers", "B fibers", "C fibers" and "fibre classification" — no concept candidate record covering the classification table exists.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: CON-NEU-5664D7AB68AD8D (live, myelination) states the structural distinction this table's speed differences depend on and is cross-linked. Walked the 66 concepts under DIS-PHY-T07; no live concept states the A/B/C classification table or the differential-sensitivity list.

---

# Item

## label
Neurotrophins are proteins, secreted by glia, muscle or other innervated targets, that are retrogradely transported to support neuronal development, growth and survival

## id
CON-NEU-47AD27F1B2D234

## canonical_key
nerve.neurotrophins.definition

## aliases
Neurotrophin definition
Retrograde axonal transport of trophic factors

## arabic_label
العوامل الغذائية العصبية ونقلها الرجعي

## arabic_aliases
النقل المحوري الرجعي للعوامل العصبية

## definition
Neurotrophins are certain proteins necessary for neuronal development, growth and survival. They are secreted by glial cells, by muscles, or by other structures that the neuron innervates. Once released near the axon terminal, they are internalized and then carried by retrograde transport back along the axon to the neuronal cell body.

## explicit_objective
Define a neurotrophin, name the cell types the book gives as its sources, and state the direction it travels along the axon to reach the cell body.

## pitfalls
Assuming neurotrophins travel from the cell body outward, the direction most other axonal cargo takes. The book specifies retrograde transport — from the terminal, where the target cell released the neurotrophin, back to the soma — which is the opposite direction from the anterograde transport of most vesicle contents made in the cell body.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
neuro

## primary_node_id
DIS-PHY-T07

## secondary_node_ids
SYS-NEU-T01-S02-M03

## topic
Neurophysiology

## subtopic
Physiology of the Nerve

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Neurotrophins

## article_ids
ART-103-PHY-NERVE-PROPERTIES

## related_article_ids
ART-103-PHY-AP-SHAPE-CONDUCTION

## related_concept_ids
CON-NEU-72BF46A68C48A6

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.2

## exam_weight_by_year
KAU_Y1=0.2

## clinical_relevance
0.3

## academic_relevance
0.6

## weight_confidence
0.2

## confidence
0.85

## exam_signal


## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Neurotrophins: These are certain proteins necessary for neuronal development, growth, and survival. They are secreted by glial cells, muscles, or other structures that the neurons innervate. They are internalized and then transported by retrograde transport to the neuronal cell body.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book names neurotrophins as a class without naming a single specific example (such as nerve growth factor), so no named molecule can be cited from this source.

## evidence_gaps
Supported by the department book only, page 26. No independent verification against an international physiology reference has been attached. No exam-paper occurrence exists for this concept; the weight above is a qualitative estimate.

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

## exclusion_reason


## field_notes
microtopicId: The book's own section, "Neurotrophins", is carried by module_subject; the canonical tree has no node finer than DIS-PHY-T07.
nanotopicId: No nanotopic exists below the microtopic level for neurophysiology.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "neurotrophin" and "retrograde transport" — no concept candidate record exists.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 66 concepts under DIS-PHY-T07; no live concept states neurotrophins or retrograde axonal transport. Cross-linked to neuron morphology, whose axon and target-cell contact this mechanism depends on.

---

# Item

## label
Each skeletal muscle fibre receives one axon terminal at a motor end plate, separated from it by a synaptic cleft rich in acetylcholinesterase

## id
CON-NEU-273E2C22C11A97

## canonical_key
nmt.junction.physiologic-anatomy

## aliases
Neuromuscular junction anatomy
Motor end plate
Synaptic cleft of the neuromuscular junction
Junctional folds

## arabic_label
التشريح الوظيفي للوصلة العصبية العضلية

## arabic_aliases
الصفيحة الطرفية الحركية
الشق التشابكي

## definition
Neuromuscular transmission is the transmission of nerve impulses from an alpha motor neuron to skeletal muscle fibres. The alpha motor neuron's axon divides into terminals, or end feet, each supplying several muscle fibres, but each individual muscle fibre receives only one axon terminal, which is packed with acetylcholine-containing vesicles. The nerve ending fits into a depression in the muscle membrane, and the extracellular space between them is the synaptic cleft, where acetylcholinesterase is bound to the basal lamina. The muscle membrane at this site is thickened and folded into junctional folds, forming the motor end plate, which is rich in acetylcholine receptors.

## explicit_objective
Describe the physiologic anatomy of the neuromuscular junction from the axon terminal to the motor end plate, naming the synaptic cleft's enzyme and the motor end plate's receptor.

## pitfalls
Assuming one axon terminal supplies many end plates the way one motor neuron supplies many muscle fibres. The book is specific that the axon divides to reach several fibres, but each single muscle fibre still receives only one axon terminal — the one-to-many relationship is at the level of the motor neuron's whole axon, not at the level of an individual fibre's own junction.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
neuro

## primary_node_id
DIS-PHY-T07

## secondary_node_ids
SYS-NEU-T01-S02-M03

## topic
Neurophysiology

## subtopic
Neuromuscular Transmission

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Neuromuscular Transmission > Physiologic Anatomy of Neuromuscular Junction

## article_ids
ART-103-PHY-NMT

## related_article_ids
ART-103-PHY-SKELETAL-STRUCTURE-RESPONSE

## related_concept_ids
CON-MSK-77D955AAB4D0FA | CON-NEU-64B329335E9489 | CON-NEU-B1F2748F1E9357

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.4

## exam_weight_by_year
KAU_Y1=0.4

## clinical_relevance
0.55

## academic_relevance
0.85

## weight_confidence
0.2

## confidence
0.9

## exam_signal


## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
The alpha motor neuron → axon terminals (end feet) → several muscle fibers. Each muscle fiber receives only 1 axon terminal → acetylcholine vesicles. Nerve ending fits into depression in muscle membrane. The space in between (ECF) = Synaptic cleft → acetylcholine-esterase (ACHEase) bound to basal lamina. The muscle membrane is thickened & contain junctional folds → motor end plate (MEP) → rich in Ach receptors.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book does not give the width of the synaptic cleft or the surface area of the motor end plate, so this record states the structural sequence without those dimensions.

## evidence_gaps
Supported by the department book only, page 27. No independent verification against an international physiology reference has been attached. No exam-paper occurrence exists for this concept; the weight above is a qualitative estimate.

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

## exclusion_reason


## field_notes
microtopicId: The book's own section, "Physiologic Anatomy of Neuromuscular Junction", is carried by module_subject; the canonical tree has no node finer than DIS-PHY-T07.
nanotopicId: No nanotopic exists below the microtopic level for neurophysiology.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "neuromuscular junction", "motor end plate" and "junctional folds" — the live sequence-of-events record (CON-MSK-77D955AAB4D0FA) was found and is cross-linked as the process this structure carries out, not duplicated.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: CON-MSK-77D955AAB4D0FA (live, sibling MCQ batch) already states the step-by-step sequence of neuromuscular transmission; this record supplies the structure that sequence runs through and is cross-linked to it rather than restating the steps. Walked the concepts under DIS-PHY-T07; no live concept states the junction's physiologic anatomy.

---

# Item

## label
Neuromuscular transmission is one-directional, carries a fixed synaptic delay, fatigues with repeated use, and is shaped by Ca2+/Mg2+ and by three classes of drug

## id
CON-NEU-64B329335E9489

## canonical_key
nmt.properties.delay-fatigue-ions-drugs

## aliases
Properties of neuromuscular transmission
Synaptic delay
Curare, neostigmine and acetylcholine-like drugs
Magnesium competition with calcium at the NMJ

## arabic_label
خصائص الانتقال العصبي العضلي وتأثير الأيونات والأدوية عليه

## arabic_aliases
التأخير التشابكي
عقاقير حاصرة للانتقال العصبي العضلي

## definition
Neuromuscular transmission has four defining properties. It is unidirectional, occurring only from nerve to muscle. It carries a delay of about 0.5 msec, the time needed for acetylcholine release, the change in muscle membrane permeability, Na+ inflow and depolarisation to the firing level. It fatigues easily with repeated stimulation, as acetylcholine vesicles are exhausted. And it is sensitive to ions: Ca++ entry into the nerve terminal causes vesicle rupture and acetylcholine release, while excess Mg++ competes with Ca++ and greatly decreases that release. Three classes of drug act on it. Drugs with an acetylcholine-like action, such as methacholine, carbachol and nicotine in small doses, are not destroyed by cholinesterase and so their effect persists for minutes to hours. Drugs that inactivate cholinesterase, such as neostigmine, physostigmine and di-isopropyl fluorophosphate, let acetylcholine accumulate to the point of repetitively stimulating the muscle fibre. And curariform drugs, such as curare, block transmission by competing with acetylcholine for the receptor sites on the end plate.

## explicit_objective
List the four properties of neuromuscular transmission, and classify a named drug into one of the three drug-action groups the book gives, stating what each group does to transmission.

## pitfalls
Grouping neostigmine with curare because both are described in relation to the acetylcholine receptor. They act oppositely: an anticholinesterase like neostigmine increases the acetylcholine available at the receptor by stopping its breakdown, which is why it treats myasthenia gravis, while curare blocks the receptor itself and prevents acetylcholine from acting there at all.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
neuro

## primary_node_id
DIS-PHY-T07

## secondary_node_ids
SYS-NEU-T01-S02-M03

## topic
Neurophysiology

## subtopic
Neuromuscular Transmission

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Neuromuscular Transmission > Properties of Neuromuscular Transmission

## article_ids
ART-103-PHY-NMT

## related_article_ids
ART-103-PHY-SKELETAL-STRUCTURE-RESPONSE

## related_concept_ids
CON-NEU-273E2C22C11A97 | CON-MSK-5C2B5DD83C1805 | CON-NEU-B1F2748F1E9357

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.5

## exam_weight_by_year
KAU_Y1=0.5

## clinical_relevance
0.65

## academic_relevance
0.9

## weight_confidence
0.2

## confidence
0.9

## exam_signal


## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
1. Unidirectional ... 2. Delay of about 0.5 msec ... 3. Fatigued easily due to repeated stimulation and exhaustion of acetylcholine vesicles. 4. Effect of Ions: a. Ca++ entry into the end feet causes rupture of the vesicles ... b. Excess Mg++ competes with Ca++ and the release of acetylcholine is greatly decreased. 5. Effect of drugs: a- Drugs that stimulate neuromuscular transmission by acetylcholine-like action ... b- Drugs which stimulate neuromuscular transmission by inactivating cholinesterase ... c- Drugs that block neuromuscular transmission (curariform drugs).

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book gives methacholine, carbachol and low-dose nicotine as examples of acetylcholine-like drugs without stating why a higher dose of nicotine would behave differently, so the dose-dependence implied by "nicotine in small dose" is not explained further by this source.

## evidence_gaps
Supported by the department book only, pages 27 and 28. No independent verification against an international physiology reference has been attached. No exam-paper occurrence exists for this concept beyond the myasthenia gravis question already covered by the sibling batch; the weight above is a qualitative estimate.

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

## exclusion_reason


## field_notes
microtopicId: The book's own section, "Properties of Neuromuscular Transmission", is carried by module_subject; the canonical tree has no node finer than DIS-PHY-T07.
nanotopicId: No nanotopic exists below the microtopic level for neurophysiology.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "synaptic delay", "curare", "neostigmine" and "cholinesterase" — the live myasthenia gravis record was found and is cross-linked, not duplicated, since it states the disease and this record states the drug pharmacology and general transmission properties.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: CON-MSK-5C2B5DD83C1805 (live, myasthenia gravis) is the clinical case this record's anticholinesterase mechanism explains, and is cross-linked. Walked the concepts under DIS-PHY-T07; no live concept states the four transmission properties or the three drug classes as a set.

---

# Item

## label
A miniature end-plate potential is the small, spontaneous depolarisation produced when a single acetylcholine vesicle ruptures at rest

## id
CON-NEU-B1F2748F1E9357

## canonical_key
nmt.miniature-end-plate-potential.spontaneous

## aliases
MEPP
Spontaneous acetylcholine vesicle release
Quantal release at rest

## arabic_label
الجهد الطرفي المصغّر التلقائي

## arabic_aliases
الإفراز التلقائي لحويصلات الأستيل كولين

## definition
At rest, a few acetylcholine-containing vesicles rupture spontaneously and release their contents even without a nerve impulse. This produces a minute depolarisation at the motor end plate, called a miniature end-plate potential.

## explicit_objective
Define the miniature end-plate potential and state what triggers it in the absence of a nerve impulse.

## pitfalls
Assuming a miniature end-plate potential requires some weak or subthreshold nerve signal. The book states it happens at rest, with no nerve impulse at all — it is the electrical footprint of a single vesicle's spontaneous rupture, the same quantal event that, multiplied many times over by an arriving action potential, produces the full end-plate potential.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
neuro

## primary_node_id
DIS-PHY-T07

## secondary_node_ids
SYS-NEU-T01-S02-M03

## topic
Neurophysiology

## subtopic
Neuromuscular Transmission

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Neuromuscular Transmission > Miniature End-Plate Potential

## article_ids
ART-103-PHY-NMT

## related_article_ids
ART-103-PHY-SKELETAL-STRUCTURE-RESPONSE

## related_concept_ids
CON-MSK-77D955AAB4D0FA | CON-NEU-273E2C22C11A97

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.25

## exam_weight_by_year
KAU_Y1=0.25

## clinical_relevance
0.3

## academic_relevance
0.75

## weight_confidence
0.2

## confidence
0.85

## exam_signal


## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
At rest, a few vesicles containing acetylcholine rupture spontaneously and release their content. This produces a minute depolarization at the motor end plate.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book does not give a voltage size for the miniature end-plate potential or a frequency of occurrence at rest, so no numeric value for it is available from this source.

## evidence_gaps
Supported by the department book only, page 29. No independent verification against an international physiology reference has been attached. No exam-paper occurrence exists for this concept; the weight above is a qualitative estimate.

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

## exclusion_reason


## field_notes
microtopicId: The book's own section, "Miniature End-Plate Potential", is carried by module_subject; the canonical tree has no node finer than DIS-PHY-T07.
nanotopicId: No nanotopic exists below the microtopic level for neurophysiology.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "miniature end-plate potential" and "MEPP" — no concept candidate record exists.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the concepts under DIS-PHY-T07; no live concept states the miniature end-plate potential. Cross-linked to the live sequence-of-events record, whose step 2 (vesicle rupture and exocytosis) is the same event this concept describes happening spontaneously rather than after an impulse.

---

# Item

## label
Skeletal muscle is over four hundred voluntary muscles attached to bone, and contraction that depends on nerve supply serves four functions

## id
CON-MSK-43CD79301071ED

## canonical_key
muscle.skeletal.overview-and-functions

## aliases
Skeletal muscle overview
Four functions of skeletal muscle
Voluntary muscle and nerve dependence

## arabic_label
نظرة عامة على العضلات الهيكلية ووظائفها الأربع

## arabic_aliases
الوظائف الأربع للعضلة الهيكلية

## definition
Skeletal muscles are attached to the bones, and the human body contains over four hundred voluntary skeletal muscles whose contraction depends on their nerve supply. Skeletal muscle performs four major functions: force production for locomotion and breathing; force production for maintaining posture and stabilising joints; heat production; and helping venous drainage.

## explicit_objective
State how many voluntary skeletal muscles the body contains, that their contraction depends on nerve supply, and list the four major functions the book gives for skeletal muscle.

## pitfalls
Listing only the locomotor function and forgetting the other three the book names — posture/joint stabilisation, heat production, and assisting venous drainage — all four are stated together as skeletal muscle's major functions, and a summary question expects the set, not just the most obvious one.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-PHY-T01

## secondary_node_ids
DIS-HIS-T02 | SYS-MSK-T01

## topic
Cell and membrane physiology

## subtopic
Physiology of the Muscle

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > Skeletal Muscles

## article_ids
ART-103-PHY-SKELETAL-STRUCTURE-RESPONSE

## related_article_ids
ART-103-PHY-SKELETAL-MUSCLE-TENSION

## related_concept_ids
CON-MSK-287D88DF2F6B8C | CON-MSK-3B9143FBE075E4

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.2

## exam_weight_by_year
KAU_Y1=0.2

## clinical_relevance
0.3

## academic_relevance
0.65

## weight_confidence
0.2

## confidence
0.9

## exam_signal


## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
The skeletal muscles are attached to the bones in which the human body contains over four hundred voluntary skeletal muscles, their contraction depends on their nerve supply. Skeletal muscle performs four major functions: 1. Force production for locomotion and breathing. 2. Force production for maintaining posture and stabilizing joints. 3. Heat production. 4. Help venous drainage.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book states "over four hundred" without a precise count, so no exact number of skeletal muscles can be cited from this source.

## evidence_gaps
Supported by the department book only, page 30. No independent verification against an international physiology reference has been attached. No exam-paper occurrence exists for this concept; the weight above is a qualitative estimate.

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

## exclusion_reason


## field_notes
microtopicId: The book's own section, "Skeletal Muscles", is carried by module_subject; the canonical tree has no node finer than DIS-PHY-T01 for muscle physiology.
nanotopicId: No nanotopic exists below the microtopic level for muscle physiology.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "skeletal muscle functions" and "voluntary muscle" — no concept candidate record exists for this overview.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 15 concepts under DIS-PHY-T08 and the muscle set on DIS-HIS-T03; no live concept states the four functions of skeletal muscle as a set. Cross-linked to the muscle-proteins and electrical-changes concepts minted alongside it, since the book presents this overview immediately before them.
microtopicId: Morphology and the sarcomere, the two headings immediately below "Skeletal Muscles" in the tree, print only "(refer to histology)" with no independent content in this book, so no concept is minted for either; they are covered by the histology department's own concept batch instead.

---

# Item

## label
Myosin has two heavy chains forming flexible cross-bridge heads, and actin's active site is covered at rest by tropomyosin held in place by the three troponin subunits

## id
CON-MSK-287D88DF2F6B8C

## canonical_key
muscle.proteins.myosin-actin-troponin-structure

## aliases
Myosin structure
Actin structure
Troponin I, T and C
Cross-bridge heads

## arabic_label
بنية بروتينات العضلة: الميوسين والأكتين والتروبونين

## arabic_aliases
السلاسل الثقيلة والخفيفة للميوسين
تروبونين C وI وT

## definition
The myosin molecule is built of two heavy chains and four light chains. The two heavy chains form a helix; their terminal portions, together with the four light chains, form two arms ending in globular heads, the cross-bridges. Each head carries an actin-binding site, an ATP-binding site and an ATPase site, and the cross-bridge is flexible at two hinges, one between arm and body and one between arm and head. The actin molecule is two chains coiled as a helix, and it carries a specific site for myosin, the active site. At rest, tropomyosin molecules cover this active site. Troponin, a small globular protein, attaches tropomyosin to actin and is built of three subunits: troponin I, which has a strong affinity for actin and binds it; troponin T, which has a strong affinity for tropomyosin and binds it; and troponin C, which has a strong affinity for Ca2+, and whose binding to Ca2+ initiates the contraction process.

## explicit_objective
Describe the structure of the myosin cross-bridge and the actin filament, and name the three troponin subunits with the one binding partner each is defined by.

## pitfalls
Assuming any one troponin subunit alone covers or uncovers the active site. It is tropomyosin that physically covers the site; troponin's job is regulatory — I anchors the complex to actin, T anchors it to tropomyosin, and C is the calcium sensor whose binding moves tropomyosin off the site. Naming troponin C as if it directly blocked the active site skips the intermediate step.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-PHY-T01

## secondary_node_ids
DIS-HIS-T02 | SYS-MSK-T01

## topic
Cell and membrane physiology

## subtopic
Physiology of the Muscle

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > The Muscle Proteins

## article_ids
ART-103-PHY-SKELETAL-STRUCTURE-RESPONSE

## related_article_ids
ART-103-PHY-SKELETAL-MUSCLE-TENSION

## related_concept_ids
CON-MSK-B2B106C1D81C30 | CON-MSK-3013AA61E917B7 | CON-MSK-43CD79301071ED

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.45

## exam_weight_by_year
KAU_Y1=0.45

## clinical_relevance
0.4

## academic_relevance
0.9

## weight_confidence
0.2

## confidence
0.9

## exam_signal


## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Myosin molecule → 2 heavy chains and 4 light chains ... Heads contain an actin-binding site, ATP binding site & ATPase site ... Each actin molecule is formed of two chains coiled as a helix ... 1. Troponin I: has a strong affinity for actin and binds with it. 2. Troponin T: has a strong affinity for tropomyosin and binds with it. 3. Troponin C: has a strong affinity to Ca2+. When Ca2+ combines with troponin C, this will initiate the contraction process.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book does not state the molecular weight or exact chain lengths of myosin or actin, so this record is limited to the structural relationships the book actually gives.

## evidence_gaps
Supported by the department book only, pages 31 and 32. No independent verification against an international physiology reference has been attached. No exam-paper occurrence exists for this concept; the weight above is a qualitative estimate.

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

## exclusion_reason


## field_notes
microtopicId: The book's own section, "The Muscle Proteins", is carried by module_subject; the canonical tree has no node finer than DIS-PHY-T01.
nanotopicId: No nanotopic exists below the microtopic level for muscle physiology.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "myosin structure", "troponin I", "troponin T", "troponin C" and "cross-bridge" — the live cross-bridge-cycle and EC-coupling records were found and are cross-linked, not duplicated, since neither states the proteins' own composition.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: CON-MSK-B2B106C1D81C30 (sibling batch) and CON-MSK-3013AA61E917B7 (live) both use these proteins in a mechanism without describing their structure; this record supplies that structure and is cross-linked to both. Walked the muscle set on DIS-HIS-T03; no live concept states myosin or troponin subunit structure for this module.

---

# Item

## label
Skeletal muscle's own action potential resembles the nerve's but finishes before contraction starts, which is why the fibre can be tetanised

## id
CON-MSK-3B9143FBE075E4

## canonical_key
muscle.skeletal.electrical-and-excitability-changes

## aliases
Electrical changes in skeletal muscle
Muscle action potential timing
Why skeletal muscle can be tetanised

## arabic_label
التغيرات الكهربائية والاستثارية بعد تنبيه العضلة الهيكلية

## arabic_aliases
توقيت جهد الفعل العضلي
سبب إمكانية تكزز العضلة الهيكلية

## definition
The electrical events in skeletal muscle and the ionic fluxes behind them resemble those in nerve, with some differences: the resting membrane potential of skeletal muscle is about −90 mV, its action potential lasts 2 to 4 msec, it is conducted along the muscle fibre at about 5 m/sec, and it precedes the contraction by about 2 msec. During its own action potential, a skeletal muscle fibre is refractory to restimulation, exactly as a nerve fibre is. But because the action potential precedes the mechanical contraction, by the time the fibre actually begins to contract it has already regained its excitability and can respond to a second stimulus — which is why skeletal muscle can be tetanised, unlike cardiac muscle, whose action potential and contraction overlap.

## explicit_objective
State the resting potential, action-potential duration and conduction velocity of skeletal muscle, and explain from the timing of the action potential relative to contraction why skeletal muscle, but not cardiac muscle, can be tetanised.

## pitfalls
Assuming skeletal muscle cannot be re-stimulated during a contraction because it is still refractory. The refractory period belongs to the action potential, which is over within a few milliseconds; the contraction that follows it lasts much longer, so the fibre is fully excitable again well before the mechanical response has finished, and a second stimulus arriving during that mechanical phase produces a second, summating action potential.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-PHY-T01

## secondary_node_ids
DIS-HIS-T02 | SYS-MSK-T01

## topic
Cell and membrane physiology

## subtopic
Physiology of the Muscle

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > Changes Following Skeletal Muscle Stimulation

## article_ids
ART-103-PHY-SKELETAL-STRUCTURE-RESPONSE

## related_article_ids
ART-103-PHY-SKELETAL-MUSCLE-TENSION

## related_concept_ids
CON-MSK-AF4E727C85510D | CON-MSK-242998842BE25C | CON-MSK-B2B106C1D81C30

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.4

## exam_weight_by_year
KAU_Y1=0.4

## clinical_relevance
0.45

## academic_relevance
0.85

## weight_confidence
0.2

## confidence
0.9

## exam_signal


## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
The resting membrane potential of skeletal muscle is about - 90m V. The action potential lasts 2- 4 ms. Is conducted along the muscle fiber at about 5 m/sec. The action potential precedes the contraction by about 2 msec ... once the muscle begins to contract, it has regained its excitability and can respond to re-stimulation (can be tetanized).

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book states the 2 msec offset between action potential and contraction as a fixed figure without saying whether it varies with fibre type (fast versus slow), so no type-specific timing can be given from this source.

## evidence_gaps
Supported by the department book only, pages 32 and 33. No independent verification against an international physiology reference has been attached. No exam-paper occurrence exists for this concept beyond the cross-bridge and ATP questions already covered by the sibling batch; the weight above is a qualitative estimate.

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

## exclusion_reason


## field_notes
microtopicId: The book's own subsections A and B of "Changes Following Skeletal Muscle Stimulation" are carried by module_subject; the canonical tree has no node finer than DIS-PHY-T01, and lists the parent heading as a single subheading rather than splitting electrical from excitability changes.
nanotopicId: No nanotopic exists below the microtopic level for muscle physiology.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "muscle action potential", "tetanized" and "muscle refractory" — no concept candidate record covering this timing exists; the sibling batch's cross-bridge and ATP-detachment concepts cover subsection C (mechanical changes) of the same parent heading only.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 15 concepts under DIS-PHY-T08 and the muscle set on DIS-HIS-T03; no live concept states the muscle action potential's own timing or why skeletal muscle tetanises. Cross-linked to the skeletal all-or-none and twitch concepts minted alongside it, and to the sibling batch's cross-bridge concept, since this record supplies the electrical prelude the mechanical story assumes.

---

# Item

## label
A single skeletal muscle fibre obeys the all-or-none law: it contracts maximally or not at all, and a threshold stimulus already produces the maximal single-fibre contraction

## id
CON-MSK-AF4E727C85510D

## canonical_key
muscle.skeletal.all-or-none-law

## aliases
All or none law (skeletal muscle fibre)
Threshold stimulus and maximal single-fibre contraction

## arabic_label
قانون كل أو لا شيء لليفة العضلية الهيكلية المفردة

## arabic_aliases
الاستجابة القصوى لليفة العضلية عند العتبة

## definition
A single skeletal muscle fibre obeys the all-or-none law: it contracts maximally, or it does not contract at all. A threshold stimulus already produces a maximal contraction in that fibre, provided the experimental conditions stay the same — a supra-threshold stimulus to one fibre produces no bigger a contraction than a threshold one.

## explicit_objective
State the all-or-none law as it applies to a single skeletal muscle fibre, and explain why increasing stimulus strength above threshold does not increase that one fibre's contraction.

## pitfalls
Extending the single-fibre all-or-none law to the whole muscle without qualification. A whole skeletal muscle's contraction does grade with stimulus strength, but only because a stronger stimulus recruits more fibres (motor units), not because any individual fibre contracts by degrees — each fibre recruited is still firing all-or-none on its own.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-PHY-T01

## secondary_node_ids
DIS-HIS-T02 | SYS-MSK-T01

## topic
Cell and membrane physiology

## subtopic
Physiology of the Muscle

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > The All or None Law

## article_ids
ART-103-PHY-SKELETAL-STRUCTURE-RESPONSE

## related_article_ids
ART-103-PHY-SKELETAL-MUSCLE-TENSION

## related_concept_ids
CON-NEU-2DFEA8FD9919EA | CON-MSK-242998842BE25C | CON-MSK-C14F65CD68F720

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.35

## exam_weight_by_year
KAU_Y1=0.35

## clinical_relevance
0.35

## academic_relevance
0.85

## weight_confidence
0.2

## confidence
0.9

## exam_signal


## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
A single skeletal muscle fiber obeys all or none law in which the skeletal muscle fiber contracts maximally or does not contract at all. A threshold stimulus produces maximal contraction provided that the experimental conditions remain the same.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book states the law for a single fibre without stating whether the same fibre's maximal contraction magnitude itself can vary with its own length or metabolic state, so whether "maximal" is a fixed absolute value or a value relative to conditions is not settled by this source.

## evidence_gaps
Supported by the department book only, page 35. No independent verification against an international physiology reference has been attached. No exam-paper occurrence exists for this concept; the weight above is a qualitative estimate.

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

## exclusion_reason


## field_notes
microtopicId: The book's own section, "The All or None Law", is carried by module_subject; the canonical tree has no node finer than DIS-PHY-T01.
nanotopicId: No nanotopic exists below the microtopic level for muscle physiology.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "all or none" restricted to skeletal muscle — the nerve all-or-none record minted alongside this one and the recruitment concept were found and are cross-linked, not duplicated, since each states a different level of organisation (single fibre versus whole-muscle grading).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 15 concepts under DIS-PHY-T08 and the muscle set on DIS-HIS-T03; no live concept states the skeletal single-fibre all-or-none law. Cross-linked to the nerve version of the law minted alongside it (a contrasts_with pair on what triggers versus what obeys the law) and to the motor-unit/recruitment concept, which is how the whole muscle grades its response despite this law.

---

# Item

## label
A muscle twitch is a single, brief contraction and relaxation cycle produced by one action potential, starting about 2 msec after depolarisation

## id
CON-MSK-242998842BE25C

## canonical_key
muscle.skeletal.twitch

## aliases
Muscle twitch definition
Single twitch timing

## arabic_label
الرجفة العضلية المفردة وتوقيتها

## arabic_aliases
استجابة العضلة لجهد فعل واحد

## definition
The muscle twitch is a brief contraction followed by relaxation, produced by a single action potential. The twitch begins about 2 msec after the membrane depolarises — the same delay by which the book states the action potential precedes contraction.

## explicit_objective
Define the muscle twitch and state how long after membrane depolarisation it begins.

## pitfalls
Treating "the twitch" and "the action potential" as two names for one event. The twitch is the mechanical response; the action potential is the electrical trigger that precedes it by about 2 msec and is already finished by the time the mechanical twitch is well under way, which is exactly why the fibre can be re-stimulated during a twitch and its twitches can summate into tetanus.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-PHY-T01

## secondary_node_ids
DIS-HIS-T02 | SYS-MSK-T01

## topic
Cell and membrane physiology

## subtopic
Physiology of the Muscle

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > The Muscle Twitch

## article_ids
ART-103-PHY-SKELETAL-STRUCTURE-RESPONSE

## related_article_ids
ART-103-PHY-SKELETAL-MUSCLE-TENSION

## related_concept_ids
CON-MSK-3B9143FBE075E4 | CON-MSK-AF4E727C85510D | CON-MSK-C14F65CD68F720

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.3

## exam_weight_by_year
KAU_Y1=0.3

## clinical_relevance
0.3

## academic_relevance
0.75

## weight_confidence
0.2

## confidence
0.85

## exam_signal


## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
It is a brief contraction followed by relaxation due to a single action potential. The twitch starts about 2msec after the depolarization of the membrane.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book gives the twitch's start time but not its total duration or the relative lengths of its contraction and relaxation phases, so no full time-course is available from this source.

## evidence_gaps
Supported by the department book only, page 35. No independent verification against an international physiology reference has been attached. No exam-paper occurrence exists for this concept; the weight above is a qualitative estimate.

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

## exclusion_reason


## field_notes
microtopicId: The book's own section, "The Muscle Twitch", is carried by module_subject; the canonical tree has no node finer than DIS-PHY-T01.
nanotopicId: No nanotopic exists below the microtopic level for muscle physiology.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "muscle twitch" — no concept candidate record exists.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 15 concepts under DIS-PHY-T08 and the muscle set on DIS-HIS-T03; no live concept states the muscle twitch definition. Cross-linked to the electrical-changes and all-or-none concepts minted alongside it, and to the motor-unit/Treppe concept, since a twitch is the unit event that tetanus and Treppe are built from.

---

# Item

## label
In isometric contraction the muscle's length is held fixed while tension rises; in isotonic contraction tension is held fixed once threshold is reached and the muscle shortens

## id
CON-MSK-87D5C5A48AB5D9

## canonical_key
muscle.contraction-types.isometric-isotonic-definitions

## aliases
Isometric contraction definition
Isotonic contraction definition
Series elastic component

## arabic_label
تعريف الانقباض متساوي الطول ومتساوي التوتر والعنصر المرن المتسلسل

## arabic_aliases
الانقباض متساوي الطول
الانقباض متساوي التوتر

## definition
Skeletal muscle contains, besides its contractile element, elastic and viscous elements arranged in series with it, mainly in the tendons — the series elastic component. In an isometric contraction, an isolated muscle is fixed at one end, a heavy load stretches it at the other end to a set degree, and a support is placed to prevent further stretch. When stimulated, the muscle cannot shorten because the load is too heavy, but the sarcomeres inside the myocytes do shorten, stretching the series elastic elements; tension inside the muscle rises to a maximum while the whole muscle's length stays constant. In an isotonic contraction, a smaller load is used and stretched the same degree before being supported. On stimulation, contraction begins isometrically and tension rises until it reaches a level that can lift the load; from that point, the muscle shortens while tension stays constant. With a heavier load, the isometric phase before shortening starts lasts longer, and the rate and extent of the subsequent isotonic shortening are both less; if the load is too large, the maximum tension the muscle can develop in the isometric phase is never enough to lift it at all.

## explicit_objective
Describe the experimental setup that defines isometric and isotonic contraction, explain the role of the series elastic component in each, and state the two effects of a heavier load on the isotonic sequence.

## pitfalls
Believing an isometric contraction involves no shortening anywhere in the muscle. The whole muscle's length is fixed, but the sarcomeres inside it do shorten, and that shortening is taken up by stretching the series elastic component rather than by moving the load — the muscle is not static internally even though it looks static from outside.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-PHY-T01

## secondary_node_ids
DIS-HIS-T02 | SYS-MSK-T01

## topic
Cell and membrane physiology

## subtopic
Physiology of the Muscle

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > Types of Skeletal Muscle Contraction

## article_ids
ART-103-PHY-CONTRACTION-TYPES

## related_article_ids
ART-103-PHY-GRADING-LENGTH-LOAD

## related_concept_ids
CON-MSK-8CD0C1C03D5333 | CON-MSK-9EA962E7584693 | CON-MSK-D5976D2FF54887

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.15

## exam_weight_by_year
KAU_Y1=0.15

## clinical_relevance
0.35

## academic_relevance
0.75

## weight_confidence
0.4

## confidence
0.9

## exam_signal


## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Now, if the muscle is stimulated to contract against the heavy load, it will not be able to shorten because the load is too heavy for the muscle. However, sarcomeres within the myocytes do shorten leading to stretching of the series elastic elements within the muscle ... Muscle contraction starts isometric till it generates enough tension to overcome the load, then contraction continues as isotonic, and the muscle shortens. NB: With heavier loads: a) The duration of isometric contraction phase is longer. b) The rate and extent of muscle shortening during isotonic contraction is less.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book does not give a numeric value for how much of a fibre's total contraction the series elastic component can absorb before the load itself must move, so the amount of purely internal, non-visible shortening in a heavy-load isometric contraction is not quantified by this source.

## evidence_gaps
Supported by the department book only, pages 35 and 36. No independent verification against an international physiology reference has been attached. No exam-paper occurrence exists for this concept; the weight above is a qualitative estimate.

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

## exclusion_reason
The Physiology department's "Announcement for 1st year physiology final theoretical exam (102, 103 modules)" lists "Types of Skeletal Muscle Contraction" by name among the seven headings excluded from the 2025-2026 final theoretical exam for module 103. It stays in the tree and is authored here because the book still teaches it and it can appear in other assessments; only the final theory paper drops it.

## field_notes
microtopicId: The book's own section, "Types of Skeletal Muscle Contraction", is carried by module_subject; the canonical tree has no node finer than DIS-PHY-T01.
nanotopicId: No nanotopic exists below the microtopic level for muscle physiology.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "isometric contraction", "isotonic contraction" and "series elastic" — the two live load-dependent records (isometric no-whole-shortening, heavier-load isotonic shortening) were found and are cross-linked, not duplicated, since neither states the basic definitions or the series elastic component this record does.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: CON-MSK-9EA962E7584693 and CON-MSK-D5976D2FF54887 (both live) already state two load-dependent consequences of these definitions; this record supplies the definitions themselves and is cross-linked to both. Walked the 15 concepts under DIS-PHY-T08 and the muscle set on DIS-HIS-T03; no live concept states the isometric/isotonic definitions or the series elastic component.

---

# Item

## label
Isometric and isotonic contraction differ in tension, length, sliding, duration, energy use, external work and mechanical efficiency

## id
CON-MSK-8CD0C1C03D5333

## canonical_key
muscle.contraction-types.isometric-vs-isotonic-comparison

## aliases
Isometric vs isotonic comparison table
Mechanical efficiency of isotonic contraction

## arabic_label
الفروق الأساسية بين الانقباض متساوي الطول ومتساوي التوتر

## arabic_aliases
الكفاءة الميكانيكية للانقباض متساوي التوتر

## definition
The book compares isometric and isotonic contraction across seven properties. Tension increases in isometric contraction but stays constant in isotonic. Length stays constant in isometric but shortens in isotonic. Sliding of the myofibrils along each other is less in isometric and more in isotonic. Duration is shorter for isometric and longer for isotonic. Energy need is less for isometric, since the load is not moved, and greater for isotonic, since the load is moved a distance. Work done is zero in isometric, since no load moves, and positive in isotonic, since the load moves a distance. Mechanical efficiency — the percentage of energy input converted into work — is zero for isometric contraction and 20 to 25 percent for isotonic. The book's own examples: isometric contraction is tensing the quadriceps to keep the knee stiff while standing; isotonic contraction, starting isometric and finishing isotonic, is lifting a heavy weight with the biceps; and running mixes both, isometric when a leg hits the ground and isotonic to move the limbs.

## explicit_objective
Reproduce the seven-row comparison the book gives between isometric and isotonic contraction, including the numeric mechanical efficiency figure, and match each contraction type to the book's own worked example.

## pitfalls
Assuming isometric contraction does no work because it feels effortful. "No external work" in the book's specific sense means the load is not moved through a distance, which is the physics definition of work; standing with tensed quadriceps costs real metabolic energy and produces real fatigue, but by the book's own efficiency row it converts none of that energy into mechanical work on an external load.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-PHY-T01

## secondary_node_ids
DIS-HIS-T02 | SYS-MSK-T01

## topic
Cell and membrane physiology

## subtopic
Physiology of the Muscle

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > Basic differences between isometric and isotonic contractions

## article_ids
ART-103-PHY-CONTRACTION-TYPES

## related_article_ids
ART-103-PHY-GRADING-LENGTH-LOAD

## related_concept_ids
CON-MSK-87D5C5A48AB5D9 | CON-MSK-B7A8FEB348BC9E

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.2

## exam_weight_by_year
KAU_Y1=0.2

## clinical_relevance
0.3

## academic_relevance
0.75

## weight_confidence
0.4

## confidence
0.9

## exam_signal


## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Mechanical efficiency = % of energy input converted into work: zero (isometric) / 20-25%. (isotonic). Examples: Tension of a part of the body and maintenance of posture against gravity ... / Movement of part of the body or the body as a whole.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book gives 20 to 25 percent as a single range for isotonic mechanical efficiency without stating whether that range depends on the size of the load being lifted, so no load-dependence within that range is established by this source.

## evidence_gaps
Supported by the department book only, page 37. No independent verification against an international physiology reference has been attached. No exam-paper occurrence exists for this concept; the weight above is a qualitative estimate.

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

## exclusion_reason
The Physiology department's "Announcement for 1st year physiology final theoretical exam (102, 103 modules)" lists "Types of Skeletal Muscle Contraction" by name among the seven headings excluded from the 2025-2026 final theoretical exam for module 103. It stays in the tree and is authored here because the book still teaches it and it can appear in other assessments; only the final theory paper drops it.

## field_notes
microtopicId: The book's own table, "Basic differences between isometric and isotonic contractions", is carried by module_subject; the canonical tree has no node finer than DIS-PHY-T01.
nanotopicId: No nanotopic exists below the microtopic level for muscle physiology.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "mechanical efficiency" and "isometric isotonic differences" — no concept candidate record covering this comparison table exists.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 15 concepts under DIS-PHY-T08 and the muscle set on DIS-HIS-T03; no live concept states this comparison table. Cross-linked to the isometric/isotonic definitions concept minted alongside it, of which this table is the direct continuation, and to the load-velocity relationship, which the work-and-efficiency rows anticipate.

---

# Item

## label
The whole muscle's contraction is graded by recruiting more motor units and by raising stimulation frequency toward tetanus, and Treppe raises twitch tension over the first few stimuli of a rested muscle

## id
CON-MSK-C14F65CD68F720

## canonical_key
muscle.grading.motor-unit-recruitment-frequency-treppe

## aliases
Motor unit
Recruitment of motor units
Incomplete and complete tetanus
Treppe (staircase phenomenon)
Clonus

## arabic_label
تدرج تقلص العضلة عبر تجنيد الوحدات الحركية وزيادة التردد وظاهرة الدرج

## arabic_aliases
التكزز التام والناقص
ظاهرة الدرج (تريبيه)

## definition
A motor unit is one spinal motor neuron together with all the muscle fibres its branching axon supplies; small units of 3 to 6 fibres serve fine, precise movements such as the hand and eye muscles, while large units of 100 to 200 fibres serve gross movements such as the leg and back muscles. The whole muscle's contraction is graded by two independent mechanisms. First, the strength of the stimulus sets recruitment: increasing stimulus strength activates more motor units, so the whole-muscle response rises gradually until a maximal stimulus activates every motor unit, after which a supramaximal stimulus adds nothing further, since each fibre already responds maximally under the all-or-none law. Second, the frequency of stimulation sets summation: raising it releases more Ca2+ from the sarcoplasmic reticulum with each stimulus, so contractions with incomplete relaxation between them (incomplete tetanus, or clonus) fuse at a high enough rate into complete tetanus, with no relaxation at all, and complete tetanus develops about four times the tension of an individual twitch because free Ca2+ accumulates in the myofibrils and the cross-bridges cycle continuously. Treppe, the staircase phenomenon, is the progressive rise in the size of separate twitch contractions to a plateau during repetitive stimulation of a previously rested muscle, explained by the same persistent rise in free cytoplasmic Ca2+.

## explicit_objective
Define a motor unit and give its typical fibre count in fine versus gross muscles, distinguish recruitment from frequency summation as the two mechanisms of grading, and define Treppe and its cause.

## pitfalls
Confusing Treppe with incomplete tetanus because both involve rising tension over repeated stimuli. Treppe is a rise in the peak tension of separate twitches, each one allowed to relax fully before the next arrives; incomplete tetanus is a fusion of contractions because relaxation is not allowed to finish between stimuli. The two happen at different stimulation frequencies and for different reasons even though both are explained by rising free Ca2+.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-PHY-T01

## secondary_node_ids
DIS-HIS-T02 | SYS-MSK-T01

## topic
Cell and membrane physiology

## subtopic
Physiology of the Muscle

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > Factors Affecting Skeletal Muscle Contraction

## article_ids
ART-103-PHY-GRADING-LENGTH-LOAD

## related_article_ids
ART-103-PHY-CONTRACTION-TYPES

## related_concept_ids
CON-MSK-AF4E727C85510D | CON-MSK-242998842BE25C | CON-MSK-3E5F54D8D58E9C

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.5

## exam_weight_by_year
KAU_Y1=0.5

## clinical_relevance
0.5

## academic_relevance
0.9

## weight_confidence
0.2

## confidence
0.9

## exam_signal


## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
The motor neuron and the muscle fibers it innervates form a motor unit ... Increasing the strength of stimulus will increase the number of activated motor units [recruitment] ... During a complete tetanus, the tension developed is about 4 times that developed by the individual twitch contractions ... Treppe (Staircase Phenomenon): is the progressive increase in the magnitude of separate twitch contraction of skeletal muscle to a plateau value during repetitive stimulation after a period of rest.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book states the four-fold tetanic-to-twitch tension ratio without saying whether that ratio is stable across fibre types (fast versus slow), so no type-specific ratio is available from this source.

## evidence_gaps
Supported by the department book only, pages 38 to 40. No independent verification against an international physiology reference has been attached. No exam-paper occurrence exists for this concept; the weight above is a qualitative estimate.

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

## exclusion_reason


## field_notes
microtopicId: The book's own subsection "II- Stimulus Factors (Grading of muscle contraction)" under "Factors Affecting Skeletal Muscle Contraction" is carried by module_subject; the canonical tree lists only the parent heading, with no finer node than DIS-PHY-T01.
nanotopicId: No nanotopic exists below the microtopic level for muscle physiology.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "motor unit", "recruitment", "tetanus", "clonus" and "Treppe" — no concept candidate record exists for any of these terms in this module; the live fibre-type record (subsection I of the same parent heading) is cross-linked, not duplicated.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: CON-MSK-3E5F54D8D58E9C (live, red slow/pale fast fibres) covers subsection I of this same parent heading; this record covers subsection II and is cross-linked to it. Walked the 15 concepts under DIS-PHY-T08; no live concept states motor units, recruitment, tetanus or Treppe.

---

# Item

## label
Skeletal muscle develops maximal isometric tension at a sarcomere length of about 2.2 micrometres, where thick and thin filament overlap is optimal

## id
CON-MSK-01E9132FDDF9F2

## canonical_key
muscle.length-tension.sarcomere-optimum

## aliases
Length-tension relationship
Sarcomere length and active tension
Optimal filament overlap

## arabic_label
علاقة الطول بالتوتر وطول الساركومير الأمثل

## arabic_aliases
التداخل الأمثل للخيوط السميكة والرقيقة

## definition
The length-tension relationship plots the increasing initial (preload) muscle fibre length on the x-axis against the maximal active tension developed by isometric contraction on the y-axis. At minimal fibre length, with no passive stretch, isometric tension is zero. As initial length increases (more stretch), isometric tension rises up to a limit, beyond which further stretch decreases it. The mechanism is the overlap between thick and thin filaments: maximal force is developed at a sarcomere length of about 2.2 micrometres, the muscle's own resting length inside the body, where every cross-bridge on the thick filament has an actin filament opposite it. Stretching the sarcomere beyond 2.2 micrometres reduces the overlap, so some cross-bridges have no actin to bind, and force falls. Shortening the sarcomere below 2.2 micrometres also reduces force, because the two actin filaments now overlap each other as well as the myosin filament, which makes it harder for the muscle to develop tension.

## explicit_objective
Describe the shape of the length-tension curve, state the sarcomere length at which tension is maximal, and explain from filament overlap why tension falls on either side of that optimum.

## pitfalls
Assuming more stretch always means more force, since stretch and force rise together over the ascending part of the curve. The book is explicit that this only holds up to 2.2 micrometres; past that point, the same variable that helped — more separation between the filaments — starts costing overlap instead of adding it, and tension falls on both sides of the optimum for opposite structural reasons.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-PHY-T01

## secondary_node_ids
DIS-HIS-T02 | SYS-MSK-T01

## topic
Cell and membrane physiology

## subtopic
Physiology of the Muscle

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > Factors Affecting Skeletal Muscle Contraction

## article_ids
ART-103-PHY-GRADING-LENGTH-LOAD

## related_article_ids
ART-103-PHY-CONTRACTION-TYPES

## related_concept_ids
CON-MSK-B7A8FEB348BC9E | CON-MSK-B2B106C1D81C30

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.5

## exam_weight_by_year
KAU_Y1=0.5

## clinical_relevance
0.45

## academic_relevance
0.9

## weight_confidence
0.2

## confidence
0.9

## exam_signal


## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Maximal force is obtained when the muscle fiber length is set at a sarcomere length of 2.2 µ. This is the resting length of the muscle inside the body. At this length, the overlap between thick and thin filaments is optimal, since every cross-bridge from the thick filament is opposite an actin molecule.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book plots the curve for the human biceps specifically without stating whether the 2.2-micrometre optimum is the same for other named muscles, so generalising the exact figure beyond the biceps example is not supported by this source.

## evidence_gaps
Supported by the department book only, pages 41 and 42. No independent verification against an international physiology reference has been attached. No exam-paper occurrence exists for this concept; the weight above is a qualitative estimate.

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

## exclusion_reason


## field_notes
microtopicId: The book's own subsection "III- Length-tension relationship" under "Factors Affecting Skeletal Muscle Contraction" is carried by module_subject; the canonical tree lists only the parent heading, with no finer node than DIS-PHY-T01.
nanotopicId: No nanotopic exists below the microtopic level for muscle physiology.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "length-tension", "sarcomere length" and "preload" — no concept candidate record exists.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 15 concepts under DIS-PHY-T08; no live concept states the length-tension relationship. Cross-linked to the load-velocity relationship minted alongside it (the book's own next subsection) and to the cross-bridge cycle concept, whose per-bridge force this relationship aggregates over the whole fibre.

---

# Item

## label
As afterload increases, an isotonic muscle shortens more slowly and less, and the theoretical maximal shortening velocity occurs only at zero load

## id
CON-MSK-B7A8FEB348BC9E

## canonical_key
muscle.load-velocity.afterload-vmax

## aliases
Load-velocity relationship
Afterload
Maximal velocity of shortening (Vmax)

## arabic_label
علاقة الحمل بسرعة التقصر والحمل اللاحق والسرعة القصوى

## arabic_aliases
الحمل اللاحق
السرعة القصوى للتقصر

## definition
For a muscle to shorten during isotonic contraction, it must lift a weight called the afterload — the load the muscle encounters only after it has already started to contract. Increasing the afterload has two effects: the velocity of shortening decreases, because each cross-bridge cycle takes longer under a heavier load, and the amount of shortening decreases as well. The maximal velocity of shortening, V-max, occurs when there is no external load at all, but the book notes this is theoretical only, since a real load can never actually be zero.

## explicit_objective
Define afterload, state the two effects of increasing afterload on isotonic shortening, and explain why V-max is described as theoretical.

## pitfalls
Confusing afterload with the load used to define isometric versus isotonic contraction earlier. The isometric/isotonic setup uses a load applied before stimulation to stretch the muscle to a set degree; afterload specifically names the load encountered only once contraction has already begun, which is the variable this load-velocity relationship is built around.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-PHY-T01

## secondary_node_ids
DIS-HIS-T02 | SYS-MSK-T01

## topic
Cell and membrane physiology

## subtopic
Physiology of the Muscle

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > Factors Affecting Skeletal Muscle Contraction

## article_ids
ART-103-PHY-GRADING-LENGTH-LOAD

## related_article_ids
ART-103-PHY-CONTRACTION-TYPES

## related_concept_ids
CON-MSK-01E9132FDDF9F2 | CON-MSK-D5976D2FF54887 | CON-MSK-2E4061334D52EA

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.4

## exam_weight_by_year
KAU_Y1=0.4

## clinical_relevance
0.35

## academic_relevance
0.85

## weight_confidence
0.2

## confidence
0.9

## exam_signal


## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Afterload is the load encountered by the muscle only after it starts to contract ... a. The velocity of shortening decreases as the afterload increases because each cross-bridge cycle takes longer time. b. The amount of shortening decreases as the afterload increases. c. The maximal velocity of shortening (V-max) occurs when there is no external load (zero load). NB: V-max is theoretical because load cannot be zero.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book does not give a numeric shape for the load-velocity curve (such as a specific equation), so only the qualitative direction of the relationship, not its precise mathematical form, is stated here.

## evidence_gaps
Supported by the department book only, page 42. No independent verification against an international physiology reference has been attached. No exam-paper occurrence exists for this concept; the weight above is a qualitative estimate.

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

## exclusion_reason


## field_notes
microtopicId: The book's own subsection "IV- Load-Velocity Relationship" under "Factors Affecting Skeletal Muscle Contraction" is carried by module_subject; the canonical tree lists only the parent heading, with no finer node than DIS-PHY-T01.
nanotopicId: No nanotopic exists below the microtopic level for muscle physiology.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "afterload", "load-velocity" and "V-max" — the live heavier-load isotonic-shortening record was found and is cross-linked, not duplicated, since it states one qualitative consequence of load without naming afterload or V-max.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: CON-MSK-D5976D2FF54887 (live) already states that heavier loads reduce isotonic shortening rate and extent; this record supplies the afterload/V-max vocabulary that fact is stated in and is cross-linked to it. Walked the 15 concepts under DIS-PHY-T08; no live concept names afterload or V-max.

---

# Item

## label
Muscle fatigue weakens and prolongs contraction and leaves relaxation incomplete, from lactic acid, ATP/glycogen/creatine phosphate depletion, impaired neuromuscular transmission and interrupted blood flow

## id
CON-MSK-2E4061334D52EA

## canonical_key
muscle.fatigue.causes

## aliases
Muscle fatigue definition
Causes of muscle fatigue
Contracture from fatigue

## arabic_label
إجهاد العضلة وأسبابه

## arabic_aliases
التقفع الناتج عن الإجهاد

## definition
Prolonged, strong contraction of a muscle leads to muscle fatigue, which decreases the strength of contraction, prolongs its duration, and leaves relaxation incomplete — a contracture. Four things cause it: accumulation of metabolites such as lactic acid, which raises intracellular acidity; depletion of muscle ATP, glycogen and creatine phosphate; diminished transmission at the neuromuscular junction; and interruption of blood flow through the contracting muscle, with loss of nutrient and especially oxygen supply.

## explicit_objective
Define muscle fatigue by its three functional effects on contraction, and list the four causes the book gives.

## pitfalls
Reducing fatigue to "running out of ATP" alone. The book lists four separate contributing causes — metabolite build-up, substrate depletion, junctional transmission failure and interrupted blood flow — and a complete answer names the set, since any one of them can contribute even before the others become limiting.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-PHY-T01

## secondary_node_ids
DIS-HIS-T02 | SYS-MSK-T01

## topic
Cell and membrane physiology

## subtopic
Physiology of the Muscle

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > Factors Affecting Skeletal Muscle Contraction

## article_ids
ART-103-PHY-FATIGUE-METABOLISM

## related_article_ids
ART-103-PHY-INJURY-DEATH

## related_concept_ids
CON-MSK-9A2D57D133DB52 | CON-NEU-64B329335E9489

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.4

## exam_weight_by_year
KAU_Y1=0.4

## clinical_relevance
0.55

## academic_relevance
0.85

## weight_confidence
0.2

## confidence
0.9

## exam_signal


## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Prolonged and strong contraction of a muscle leads to a state of muscle fatigue, which decreases the strength of contraction, prolongs its duration, and relaxation becomes incomplete [contracture]. This effect is due to: a- Accumulation of metabolites, such as lactic acid which increases intracellular acidity. b- Depletion of muscle ATP, glycogen, and creatine phosphate. c- Diminished transmission at neuromuscular junction. d- Interruption of blood flow through a contracting muscle and loss of nutrient supply, especially loss of oxygen.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book does not rank the four causes by how much each contributes to fatigue in a given bout of exercise, so no relative weighting between metabolite accumulation, substrate depletion, junctional failure and blood-flow interruption is available from this source.

## evidence_gaps
Supported by the department book only, pages 42 and 43. No independent verification against an international physiology reference has been attached. No exam-paper occurrence exists for this concept; the weight above is a qualitative estimate.

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

## exclusion_reason


## field_notes
microtopicId: The book's own subsection "V- Muscle Fatigue" under "Factors Affecting Skeletal Muscle Contraction" is carried by module_subject; the canonical tree lists only the parent heading, with no finer node than DIS-PHY-T01.
nanotopicId: No nanotopic exists below the microtopic level for muscle physiology.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "muscle fatigue" — no concept candidate record exists for this list of causes.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 15 concepts under DIS-PHY-T08; no live concept states the causes of muscle fatigue. Cross-linked to the energy-systems concept minted alongside it, since ATP/glycogen/creatine phosphate depletion is the shared subject, and to the live neuromuscular-transmission properties record, whose own fatigue property this concept's junctional cause restates from the muscle side.

---

# Item

## label
Muscle ATP is regenerated by three systems in sequence — phosphagen, glycogen-lactic acid, and aerobic — and the extra oxygen consumed afterward to restore them is the oxygen debt

## id
CON-MSK-9A2D57D133DB52

## canonical_key
muscle.metabolism.three-energy-systems-oxygen-debt

## aliases
Phosphagen system
Glycogen-lactic acid system
Aerobic system
Oxygen debt

## arabic_label
الأنظمة الثلاثة لتجديد الطاقة العضلية ودَين الأكسجين

## arabic_aliases
نظام الفوسفاجين
نظام الجلايكوجين واللاكتيك أسيد
النظام الهوائي
دَين الأكسجين

## definition
At rest, skeletal muscle spends energy maintaining the resting membrane potential, synthesising substances such as glycogen, and producing muscle tone. During contraction, energy consumption rises sharply; ATP is the only immediate energy source, hydrolysed anaerobically by the myosin ATPase into ADP and inorganic phosphate, and the ATP already inside the muscle can support maximal contraction for only 5 to 6 seconds. Three systems reform it. The phosphagen system transfers energy from phosphocreatine to ADP almost instantly; muscle cells hold two to three times as much phosphocreatine as ATP, and together the phosphagen system can power maximal activity for 10 to 15 seconds, enough for a 100-metre run; phosphocreatine is restored later, during relaxation, by the reverse reaction. The glycogen-lactic acid system adds a further 30 to 40 seconds of activity by anaerobic glycolysis, producing lactic acid, which itself limits the system by causing extreme fatigue; the lactic acid is later partly oxidised to pyruvic acid, partly reconverted by the liver into glucose to replenish muscle glycogen, and partly used as fuel by the heart. The aerobic system oxidises glucose, fatty acids and amino acids in the mitochondria and can, in principle, sustain activity indefinitely as long as nutrients and oxygen are available; free fatty acids are the main substrate for resting muscle and for recovery. During recovery, ventilation and oxygen consumption stay elevated above resting levels to remove excess lactate and replenish ATP, creatine phosphate and myoglobin-bound oxygen — this extra post-exercise oxygen consumption is the oxygen debt, measured by subtracting the basal oxygen consumption from the total consumed until a constant basal level is reached again.

## explicit_objective
Name the three ATP-regeneration systems in the order the muscle draws on them, state each one's endurance time and its immediate fuel, and define oxygen debt and how it is measured.

## pitfalls
Treating the three energy systems as alternatives a muscle chooses between, rather than a sequence it moves through as each one's own endurance runs out. The phosphagen system covers the first 10 to 15 seconds, the glycogen-lactic acid system the next 30 to 40, and the aerobic system everything beyond that — a sustained effort draws on all three in turn, not on whichever one the muscle "prefers."

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-PHY-T01

## secondary_node_ids
DIS-HIS-T02 | SYS-MSK-T01

## topic
Cell and membrane physiology

## subtopic
Physiology of the Muscle

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > Metabolic Changes Following Skeletal Muscle Stimulation

## article_ids
ART-103-PHY-FATIGUE-METABOLISM

## related_article_ids
ART-103-PHY-INJURY-DEATH

## related_concept_ids
CON-MSK-2E4061334D52EA | CON-MSK-6087C9C091ED85

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.2

## exam_weight_by_year
KAU_Y1=0.15

## clinical_relevance
0.5

## academic_relevance
0.8

## weight_confidence
0.35

## confidence
0.9

## exam_signal


## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
ATP inside the muscle can provide energy for maximal contraction for 5-6 seconds ... Together they can provide maximal muscle power for a period of 10-15 seconds, enough for 100 m run ... The glycogen - lactic acid system can provide 30 to 40 seconds of excess muscle activity in addition to the 10 to 15 second provided by the phosphagen system ... The aerobic system ... Unlimited time "as long as nutrients and O2 are available." ... This extra post-exercise O2 consumption is called [oxygen debt].

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book's comparison table gives endurance times for each system in isolation but does not state how the boundaries shift when two systems run simultaneously during a real, mixed-intensity effort, so this record keeps the three durations as the book gives them, one system at a time.

## evidence_gaps
Supported by the department book only, pages 43 to 45. No independent verification against an international physiology reference has been attached. No exam-paper occurrence exists for this concept; the weight above is a qualitative estimate and reflects that this whole heading is excluded from the final theoretical exam.

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

## exclusion_reason
The Physiology department's "Announcement for 1st year physiology final theoretical exam (102, 103 modules)" lists "Metabolic Changes Following Skeletal Muscle Stimulation" by name among the seven headings excluded from the 2025-2026 final theoretical exam for module 103. It stays in the tree and is authored here because the book still teaches it and it can appear in other assessments; only the final theory paper drops it.

## field_notes
microtopicId: The book's own section, "D- Metabolic Changes Following Skeletal Muscle Stimulation", is carried by module_subject; the canonical tree has no node finer than DIS-PHY-T01.
nanotopicId: No nanotopic exists below the microtopic level for muscle physiology.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "phosphagen", "glycogen-lactic acid system", "oxygen debt" and "creatine phosphate" — no concept candidate record covering the three systems as a set exists in this module; individual biochemistry-side records on glycolysis and creatine phosphate belong to a different subject and are not treated as duplicates of this muscle-physiology framing.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 15 concepts under DIS-PHY-T08; no live concept states the three energy systems or oxygen debt from the muscle-physiology side. Cross-linked to the fatigue concept minted alongside it, whose ATP/glycogen/creatine phosphate depletion cause this concept explains mechanistically, and to rigor mortis, the limiting case of ATP loss.

---

# Item

## label
Electromyography records a muscle's electrical activity through surface or needle electrodes on an oscilloscope

## id
CON-MSK-2A62AFCCE09E9F

## canonical_key
muscle.electromyography.definition

## aliases
EMG definition
Surface and needle EMG electrodes

## arabic_label
تخطيط كهربية العضل وأسلوب تسجيله

## arabic_aliases
أقطاب سطحية وأقطاب إبرية لتخطيط العضل

## definition
Electromyography is a record of a muscle's electrical activity using a cathode ray oscilloscope. The electrical activity is picked up either by a metal disc electrode placed on the skin overlying the muscle, or by a hypodermic needle electrode inserted into the muscle itself.

## explicit_objective
Define electromyography and name its two electrode techniques.

## pitfalls
Treating surface and needle electrodes as interchangeable. The choice matters elsewhere in the book: fasciculation, visible under the skin, can be picked up by surface disc electrodes, while fibrillation, not visible under the skin, can only be picked up by needle electrodes inserted into the muscle — the same EMG technique, but the electrode choice determines what it can detect.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-PHY-T01

## secondary_node_ids
DIS-HIS-T02 | SYS-MSK-T01

## topic
Cell and membrane physiology

## subtopic
Physiology of the Muscle

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > Electromyography

## article_ids
ART-103-PHY-INJURY-DEATH

## related_article_ids
ART-103-PHY-FATIGUE-METABOLISM

## related_concept_ids
CON-MSK-1030B9F3A5996A | CON-MSK-7253D390093A21

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.15

## exam_weight_by_year
KAU_Y1=0.1

## clinical_relevance
0.45

## academic_relevance
0.65

## weight_confidence
0.4

## confidence
0.9

## exam_signal


## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Electromyography is a record of the electrical activity of the muscle using a cathode ray oscilloscope. Electrical activity is picked up by metal disc electrode placed on the skin overlying the muscle or by hypodermic needle electrodes inserted in the muscle.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book does not describe the normal EMG pattern of a resting, voluntarily contracting, or diseased muscle beyond the denervation examples given elsewhere, so this record is limited to the technique's definition.

## evidence_gaps
Supported by the department book only, page 45. No independent verification against an international physiology reference has been attached. No exam-paper occurrence exists for this concept; the weight above is a qualitative estimate and reflects that this heading is excluded from the final theoretical exam.

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

## exclusion_reason
The Physiology department's "Announcement for 1st year physiology final theoretical exam (102, 103 modules)" bundles "Electromyography, Muscular hypertrophy, Reaction of muscle to denervation" into one bullet among the seven headings excluded from the 2025-2026 final theoretical exam for module 103. It stays in the tree and is authored here because the book still teaches it and it can appear in other assessments; only the final theory paper drops it.

## field_notes
microtopicId: The book's own section, "Electromyography", is carried by module_subject; the canonical tree has no node finer than DIS-PHY-T01.
nanotopicId: No nanotopic exists below the microtopic level for muscle physiology.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "electromyography" and "EMG" — no concept candidate record exists.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 15 concepts under DIS-PHY-T08; no live concept states EMG technique. Cross-linked to the denervation concept minted alongside it, whose fasciculation/fibrillation distinction depends on which EMG electrode is used, and to hypertrophy, the book's next heading in the same bundled exclusion.

---

# Item

## label
Muscular hypertrophy is an increase in muscle-fibre size from forceful activity, with no change in fibre number

## id
CON-MSK-7253D390093A21

## canonical_key
muscle.hypertrophy.definition

## aliases
Muscular hypertrophy definition
Fibre thickening without fibre number change

## arabic_label
تضخم العضلة وزيادة سُمك الألياف دون زيادة عددها

## arabic_aliases
زيادة عدد الميوفيبريلات

## definition
Muscular hypertrophy is an increase in the size of a muscle as a result of forceful muscular activity. The number of muscle fibres in the muscle does not change; instead, the existing fibres increase in thickness, in their total number of myofibrils, and in their content of ATP, creatine phosphate and glycogen.

## explicit_objective
Define muscular hypertrophy and state which structural feature of a muscle fibre changes and which does not.

## pitfalls
Assuming hypertrophy means the muscle grows new fibres. The book states the opposite mechanism: fibre number is unchanged, and the growth is entirely inside the existing fibres — thicker fibres, more myofibrils per fibre, and larger stores of ATP, creatine phosphate and glycogen.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-PHY-T01

## secondary_node_ids
DIS-HIS-T02 | SYS-MSK-T01

## topic
Cell and membrane physiology

## subtopic
Physiology of the Muscle

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > Muscular hypertrophy

## article_ids
ART-103-PHY-INJURY-DEATH

## related_article_ids
ART-103-PHY-FATIGUE-METABOLISM

## related_concept_ids
CON-MSK-2A62AFCCE09E9F | CON-MSK-1030B9F3A5996A

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.15

## exam_weight_by_year
KAU_Y1=0.1

## clinical_relevance
0.4

## academic_relevance
0.65

## weight_confidence
0.4

## confidence
0.9

## exam_signal


## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
It is the increase in size of muscle as a result of forceful muscular activity. The number of muscle fibers in the muscle does not change while the muscle fibers increase in thickness, in total number of myofibrils, and in their content of ATP, creatine phosphate and glycogen.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book does not state a stimulus threshold (a training intensity or duration) needed to produce hypertrophy, so no dose-response relationship for this process is given by this source.

## evidence_gaps
Supported by the department book only, page 45. No independent verification against an international physiology reference has been attached. No exam-paper occurrence exists for this concept; the weight above is a qualitative estimate and reflects that this heading is excluded from the final theoretical exam.

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

## exclusion_reason
The Physiology department's "Announcement for 1st year physiology final theoretical exam (102, 103 modules)" bundles "Electromyography, Muscular hypertrophy, Reaction of muscle to denervation" into one bullet among the seven headings excluded from the 2025-2026 final theoretical exam for module 103. It stays in the tree and is authored here because the book still teaches it and it can appear in other assessments; only the final theory paper drops it.

## field_notes
microtopicId: The book's own section, "Muscular hypertrophy", is carried by module_subject; the canonical tree has no node finer than DIS-PHY-T01.
nanotopicId: No nanotopic exists below the microtopic level for muscle physiology.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "muscular hypertrophy" and "fibre thickening" — no concept candidate record exists.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 15 concepts under DIS-PHY-T08; no live concept states muscular hypertrophy. Cross-linked to EMG and denervation, its two bundled-exclusion neighbours, since the book presents all three consecutively.

---

# Item

## label
Denervated muscle passes through atrophy, then visible fasciculation from the dying nerve, then fibrillation from the muscle's own denervation hypersensitivity to acetylcholine

## id
CON-MSK-1030B9F3A5996A

## canonical_key
muscle.denervation.atrophy-fasciculation-fibrillation

## aliases
Lower motor neuron lesion
Muscle atrophy from denervation
Fasciculation
Fibrillation
Denervation hypersensitivity

## arabic_label
استجابة العضلة لفقد التعصيب: الضمور والرجفان الحُزمي والرجفان الليفي

## arabic_aliases
فرط الحساسية بعد فقد التعصيب
إصابة العصبون الحركي السفلي

## definition
If the nerve supply to a muscle is injured, the muscle is paralysed — a lower motor neuron lesion — and passes through three changes. Muscle atrophy is a decrease in muscle size as the fibres are gradually replaced by fibrous tissue. Muscle fasciculation is spontaneous contraction of whole motor units, strong enough to be seen under the skin, occurring in the first few days after nerve damage as the degenerating nerve fibres discharge spontaneous impulses; it can be picked up on EMG by metal disc electrodes on the skin. Muscle fibrillation is spontaneous contraction of separate individual muscle fibres, occurring after the motor nerve fibres have completely degenerated; it is caused by denervation hypersensitivity — the denervated muscle becomes more sensitive to circulating acetylcholine and discharges spontaneously — and, because it cannot be seen under the skin, it can only be picked up on EMG by needle electrodes inserted into the muscle.

## explicit_objective
Sequence the three consequences of denervation, distinguish fasciculation from fibrillation by their cause, visibility and required EMG electrode, and name the mechanism behind fibrillation.

## pitfalls
Treating fasciculation and fibrillation as two names for the same phenomenon. They differ in every respect the book gives: fasciculation is whole motor units firing from the dying nerve itself and is visible under the skin; fibrillation is single fibres firing from the muscle's own denervation hypersensitivity to acetylcholine, after the nerve has fully degenerated, and it is invisible under the skin, detectable only by a needle electrode.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-PHY-T01

## secondary_node_ids
DIS-HIS-T02 | SYS-MSK-T01

## topic
Cell and membrane physiology

## subtopic
Physiology of the Muscle

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > Reaction of muscle to denervation

## article_ids
ART-103-PHY-INJURY-DEATH

## related_article_ids
ART-103-PHY-FATIGUE-METABOLISM

## related_concept_ids
CON-MSK-2A62AFCCE09E9F | CON-MSK-7253D390093A21 | CON-NEU-64B329335E9489

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.3

## exam_weight_by_year
KAU_Y1=0.2

## clinical_relevance
0.6

## academic_relevance
0.75

## weight_confidence
0.35

## confidence
0.9

## exam_signal


## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
a) Muscle atrophy is decrease in muscle size and the muscle fibers are replaced gradually by fibrous tissue. b) Muscle fasciculation: It is spontaneous contractions of motor units sufficient to be seen under the skin ... c) Muscle fibrillation: Spontaneous contractions of separate muscle fibers occur after complete degeneration of the motor nerve fibers. It is due to denervation hypersensitivity.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book gives no time course for how long atrophy takes to become clinically evident once fasciculation has stopped and fibrillation has started, so the transition timing between the three stages is not fixed by this source.

## evidence_gaps
Supported by the department book only, pages 45 and 46. No independent verification against an international physiology reference has been attached. No exam-paper occurrence exists for this concept; the weight above is a qualitative estimate and reflects that this heading is excluded from the final theoretical exam.

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

## exclusion_reason
The Physiology department's "Announcement for 1st year physiology final theoretical exam (102, 103 modules)" bundles "Electromyography, Muscular hypertrophy, Reaction of muscle to denervation" into one bullet among the seven headings excluded from the 2025-2026 final theoretical exam for module 103. It stays in the tree and is authored here because the book still teaches it and it can appear in other assessments; only the final theory paper drops it.

## field_notes
microtopicId: The book's own section, "Reaction of muscle to denervation", is carried by module_subject; the canonical tree has no node finer than DIS-PHY-T01.
nanotopicId: No nanotopic exists below the microtopic level for muscle physiology.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "fasciculation", "fibrillation", "denervation" and "lower motor neuron" — no concept candidate record exists.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 15 concepts under DIS-PHY-T08; no live concept states denervation atrophy, fasciculation or fibrillation. Cross-linked to EMG, the technique that distinguishes fasciculation from fibrillation, and to the live neuromuscular-transmission properties record, whose acetylcholine sensitivity is inverted here into hypersensitivity.

---

# Item

## label
Rigor mortis is the total, permanent contracture of every muscle after death from loss of the ATP needed to separate actin and myosin, and it is used to help estimate time of death

## id
CON-MSK-6087C9C091ED85

## canonical_key
muscle.rigor-mortis.mechanism-and-medicolegal

## aliases
Rigor mortis mechanism
Medicolegal use of rigor mortis
Bacterial putrefaction and rigor resolution

## arabic_label
التيبس الرمي وآليته وأهميته الطبية الشرعية

## arabic_aliases
تحلل بروتينات العضلة بالبكتيريا

## definition
Several hours after death, all the muscles of the body go into a state of contracture and become rigid even without any action potentials — rigor mortis. It is caused by the loss of ATP, which is needed to separate the actin and myosin filaments during relaxation; without it, the cross-bridges cannot detach and the filaments stay locked together. The muscles remain in rigor until the muscle proteins themselves are destroyed by bacterial putrefaction, 15 to 25 hours later. Rigor mortis has medicolegal importance because it helps in estimating the time of death.

## explicit_objective
State the mechanism of rigor mortis in terms of the ATP-dependent cross-bridge detachment step, give the time window before it resolves by putrefaction, and state its medicolegal use.

## pitfalls
Treating rigor mortis as a mysterious, separate phenomenon rather than the same ATP-detachment mechanism already seen in a living, fatigued muscle. The book gives it identically: no ATP means the cross-bridges cannot let go of actin, so the muscle locks in contracture; death simply makes the loss of ATP permanent instead of temporary, which is why rigor does not reverse on its own and instead waits for the proteins themselves to be destroyed by putrefaction.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-PHY-T01

## secondary_node_ids
DIS-HIS-T02 | SYS-MSK-T01

## topic
Cell and membrane physiology

## subtopic
Physiology of the Muscle

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > Rigor Mortis

## article_ids
ART-103-PHY-INJURY-DEATH

## related_article_ids
ART-103-PHY-SKELETAL-MUSCLE-TENSION

## related_concept_ids
CON-MSK-AC42FE7AB41DF2 | CON-MSK-2E4061334D52EA

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.35

## exam_weight_by_year
KAU_Y1=0.3

## clinical_relevance
0.7

## academic_relevance
0.8

## weight_confidence
0.3

## confidence
0.9

## exam_signal


## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Several hours after death all the muscles of the body go into a state of contracture and become rigid even without action potentials. It is caused by loss of ATP, which is needed to produce separation of actin and myosin filaments during the relaxation process. The muscles remain in rigor until the muscle proteins are destroyed as a result of bacterial putrefaction 15-25 hours later. Rigor mortis is of medicolegal importance as it helps in the determination of time of death.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book gives a single 15-to-25-hour window for putrefaction to resolve rigor without noting that ambient temperature and other forensic variables are known to shift this window, so no environmental dependence is stated by this source.

## evidence_gaps
Supported by the department book only, page 46. No independent verification against an international physiology or forensic reference has been attached. No exam-paper occurrence exists for this concept beyond the ATP-detachment question already covered by the sibling batch; the weight above is a qualitative estimate.

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

## exclusion_reason


## field_notes
microtopicId: The book's own section, "Rigor Mortis", is carried by module_subject; the canonical tree has no node finer than DIS-PHY-T01.
nanotopicId: No nanotopic exists below the microtopic level for muscle physiology.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "rigor mortis" and "putrefaction" — no concept candidate record exists as its own item; the sibling batch's ATP-detachment concept mentions rigor mortis only in passing within a different concept's pitfalls.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: CON-MSK-AC42FE7AB41DF2 (sibling batch) already covers the general ATP-detachment/contracture mechanism and mentions rigor mortis as one instance of it; this record is the dedicated concept for rigor mortis's own heading, with the putrefaction time window and medicolegal use the sibling record does not carry, and is cross-linked to it rather than duplicating it. Walked the 15 concepts under DIS-PHY-T08; confirmed via field_notes of the sibling record that rigor mortis is not on the department's exclusion list, unlike its three immediate neighbours in the book.

---

# Item

## label
Smooth muscle's membrane potential is unstable and rides on slow waves; single-unit smooth muscle fires action potentials as a syncytium once a wave reaches about −35 mV

## id
CON-MSK-62FCA91F4981B2

## canonical_key
smooth-muscle.electrical-activity.slow-waves-pacemaker-syncytium

## aliases
Smooth muscle membrane potential instability
Slow waves of the gut
Pacemaker potential
Single-unit versus multi-unit smooth muscle

## arabic_label
النشاط الكهربائي للعضلة الملساء والموجات البطيئة ونوعا العضلة الملساء

## arabic_aliases
العضلة الملساء أحادية الوحدة ومتعددة الوحدات
جهد الناظم

## definition
Smooth muscle divides into two types. Visceral (single-unit) smooth muscle occurs in large sheets joined by gap junctions, so an action potential spreads easily from one fibre to the next and the whole sheet behaves as one unit obeying the all-or-none law; it is only superficially innervated, is spontaneously active, and is controlled by hormones, chemicals and neurotransmitters, and it is found mainly in hollow viscera such as the gut, ureters and many blood vessels. Multi-unit smooth muscle is made of individual fibres without interconnecting bridges, so an action potential cannot spread from one fibre to the next; the muscle behaves as separate motor units, each single fibre obeying the all-or-none law on its own, and it is densely innervated with contraction under neural control, found in the ciliary muscle, the iris, the vas deferens and the erector pili muscles of the skin. In relative rest, smooth muscle's membrane potential is unstable, averaging about −50 to −60 mV, with slow waves — such as the slow waves of the gut — superimposed on it; these waves are not themselves action potentials and cannot cause contraction on their own, but once a wave reaches about −35 mV, an action potential is triggered and spreads over the muscle.

## explicit_objective
Distinguish single-unit from multi-unit smooth muscle by their gap junctions, innervation and all-or-none behaviour, and describe the relationship between the resting membrane potential, slow waves and the threshold at which they trigger an action potential.

## pitfalls
Assuming slow waves are themselves action potentials because they are described alongside them on the same trace. The book is explicit that they are not — a slow wave is a fluctuation in resting potential that cannot cause contraction by itself, and only becomes a trigger once it happens to reach about −35 mV, at which point a true, spreading action potential is generated on top of it.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-PHY-T01

## secondary_node_ids
DIS-PHY-T05 | DIS-HIS-T02

## topic
Cell and membrane physiology

## subtopic
Smooth Muscles

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Smooth Muscles > Electrical Activity of Smooth Muscle

## article_ids
ART-103-PHY-SMOOTH-ELECTRICAL

## related_article_ids
ART-103-PHY-SMOOTH-MUSCLE-CONTROL

## related_concept_ids
CON-MSK-A10AC6BAF27F00 | CON-MSK-D97EA196E6719C

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.35

## exam_weight_by_year
KAU_Y1=0.35

## clinical_relevance
0.4

## academic_relevance
0.85

## weight_confidence
0.2

## confidence
0.9

## exam_signal


## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
The membrane potential in smooth muscle is unstable and in relative resting states it averages about -50 to 60 mV. Superimposed on the membrane potential are waves of various types ... These waves are not action potentials and cannot cause muscle contraction, but when the potential of the wave reaches the level of about -35 mV, an action potential is elicited and spreads over the muscle.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book names slow waves as "an example" of the waves superimposed on smooth muscle's membrane potential without listing what the other types are beyond the pacemaker potential shown in the same figure, so a complete taxonomy of these superimposed waves is not given by this source.

## evidence_gaps
Supported by the department book only, pages 46 and 47. No independent verification against an international physiology reference has been attached. No exam-paper occurrence exists for this concept beyond the spontaneous-activity and control-factors questions already covered by the sibling batch; the weight above is a qualitative estimate.

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

## exclusion_reason


## field_notes
microtopicId: The book's own section, "Electrical Activity of Smooth Muscle", and its introductory types table are carried by module_subject; the canonical tree has no node finer than DIS-PHY-T01, and lists no separate subheading for the single-unit/multi-unit table, which precedes "Electrical Activity" in the book without its own tree entry.
nanotopicId: No nanotopic exists below the microtopic level for smooth muscle physiology.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "visceral smooth muscle", "multi-unit smooth muscle", "slow wave" and "membrane potential" restricted to smooth muscle — no concept candidate record exists.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the concepts under DIS-PHY-T01, DIS-PHY-T05 and DIS-HIS-T02; no live concept states the single-unit/multi-unit distinction or the −35 mV slow-wave threshold. Cross-linked to the sibling batch's spontaneous-activity concept, which this record's syncytial-spread mechanism explains structurally, and to the two-forms-of-action-potential concept minted alongside it.

---

# Item

## label
Smooth muscle action potentials occur as brief spikes or as plateaus, and their slow rise reflects voltage-gated calcium rather than sodium channels

## id
CON-MSK-A10AC6BAF27F00

## canonical_key
smooth-muscle.action-potential.spike-and-plateau-calcium-channels

## aliases
Smooth muscle spike potential
Action potential with plateau
Calcium channel basis of smooth muscle action potential

## arabic_label
الشكلان الحادّ والهضبي لجهد الفعل في العضلة الملساء وأساسه من قنوات الكالسيوم

## arabic_aliases
جهد الفعل الشوكي
جهد الفعل ذو الهضبة

## definition
Smooth muscle action potentials take two forms. Spike potentials resemble the skeletal-muscle spike, or ride on top of slow waves, or recur rhythmically as pacemaker potentials, and last about 50 msec. Action potentials with a plateau depolarise similarly to the spike but their repolarisation is delayed for several hundred to several thousand milliseconds; the plateau underlies prolonged contraction in some smooth muscle types. The cell membrane of smooth muscle carries many voltage-gated calcium channels but very few voltage-gated sodium channels, so it is the inward flow of Ca2+, not Na+, that is mainly responsible for the action potential; Ca2+ channels also open many times more slowly than Na+ channels do, which is why smooth muscle action potentials are slow compared with nerve or skeletal muscle.

## explicit_objective
Distinguish the spike and plateau forms of the smooth muscle action potential, and explain from the channel types present why smooth muscle action potentials are slower than nerve or skeletal muscle ones.

## pitfalls
Assuming smooth muscle's action potential runs on the same sodium-channel mechanism as nerve and skeletal muscle simply because it is also called an action potential. The book is specific that voltage-gated Ca2+ channels, not Na+ channels, carry the depolarising current here, and that Ca2+ channels open far more slowly — the whole reason smooth muscle's electrical response is slower is a difference in which ion channel does the job, not merely a difference in speed of the same channel.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-PHY-T01

## secondary_node_ids
DIS-PHY-T05 | DIS-HIS-T02

## topic
Cell and membrane physiology

## subtopic
Smooth Muscles

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Smooth Muscles > Action potentials of smooth muscle occur in 2 different forms

## article_ids
ART-103-PHY-SMOOTH-ELECTRICAL

## related_article_ids
ART-103-PHY-SMOOTH-COUPLING-PLASTICITY

## related_concept_ids
CON-MSK-62FCA91F4981B2 | CON-MSK-CF9EFE4EA3C90B

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.4

## exam_weight_by_year
KAU_Y1=0.4

## clinical_relevance
0.45

## academic_relevance
0.85

## weight_confidence
0.2

## confidence
0.9

## exam_signal


## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
1- Spike potentials: ... The duration of the spike is about 50ms. 2- Action Potential with Plateau: Depolarization is similar to that of the typical spike potential. Repolarization is delayed for several hundred to several thousand milliseconds ... The cell membrane of smooth muscle has more voltage-gated calcium channels, but very few voltage-gated sodium channels ... Ca2+ channels open many times more slowly than do Na+ channels.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book names the plateau form as important "for the prolonged contraction in some types of smooth muscles" without naming which types specifically show it, so no example organ is given for the plateau form by this source.

## evidence_gaps
Supported by the department book only, page 48. No independent verification against an international physiology reference has been attached. No exam-paper occurrence exists for this concept; the weight above is a qualitative estimate.

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

## exclusion_reason


## field_notes
microtopicId: The book's own section, "Action potentials of smooth muscle occur in 2 different forms", is carried by module_subject; the canonical tree has no node finer than DIS-PHY-T01.
nanotopicId: No nanotopic exists below the microtopic level for smooth muscle physiology.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "spike potential", "plateau action potential" and "calcium channels smooth muscle" — no concept candidate record exists.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the concepts under DIS-PHY-T01, DIS-PHY-T05 and DIS-HIS-T02; no live concept states the spike/plateau distinction or the calcium-channel basis of the smooth muscle action potential. Cross-linked to the electrical-activity concept minted alongside it and to the excitation-contraction coupling concept, whose Ca2+ entry step this record's channel mechanism feeds directly.

---

# Item

## label
Smooth muscle contraction is triggered by calcium binding calmodulin to activate myosin light-chain kinase, and cross-bridges that stay attached without cycling — latch bridges — hold tone cheaply

## id
CON-MSK-CF9EFE4EA3C90B

## canonical_key
smooth-muscle.excitation-contraction-coupling.calmodulin-mlck

## aliases
Excitation-contraction coupling of smooth muscle
Calcium-calmodulin-MLCK mechanism
Myosin light-chain phosphatase
Latch bridges

## arabic_label
الاقتران بين الاستثارة والانقباض في العضلة الملساء عبر الكالمودولين وكيناز السلسلة الخفيفة

## arabic_aliases
جسور الالتحام الثابتة (لاتش)
فوسفاتيز السلسلة الخفيفة للميوسين

## definition
Depolarisation of the smooth muscle membrane opens voltage-gated Ca2+ channels, and Ca2+ flows into the cell down its electrochemical gradient; that entering Ca2+ may itself trigger further Ca2+ release from the sarcoplasmic reticulum through Ca2+-gated Ca2+ channels. Hormones and neurotransmitters can also open a ligand-gated Ca2+ channel on the membrane, or release Ca2+ from the sarcoplasmic reticulum through IP3-gated channels, so a contraction can begin without any action potential at all. Once intracellular Ca2+ rises, it binds calmodulin, and the calcium-calmodulin complex activates myosin light-chain kinase (MLCK), which phosphorylates the regulatory light chain on the myosin head; this triggers ATP hydrolysis and cross-bridge cycling. The phosphorylated cross-bridges keep cycling until myosin light-chain phosphatase dephosphorylates them, so the amount of active myosin at any moment depends on the relative activity of the kinase and the phosphatase. Relaxation follows a fall in intracellular Ca2+, driven by a pump moving Ca2+ into the extracellular fluid and a pump moving it into the sarcoplasmic reticulum, both slower than skeletal muscle's fast sarcoplasmic reticulum pump, which is why a smooth muscle contraction lasts longer than a skeletal one. Dephosphorylated cross-bridges do not all detach: those that remain attached to actin are latch bridges, which cycle not at all or very slowly and so use very little ATP, letting smooth muscle hold tone for a long time cheaply and making it fatigue-resistant compared with skeletal muscle.

## explicit_objective
Trace excitation-contraction coupling in smooth muscle from Ca2+ entry through calmodulin and myosin light-chain kinase to cross-bridge cycling, and explain what a latch bridge is and why it makes smooth muscle fatigue-resistant.

## pitfalls
Importing troponin from the skeletal muscle mechanism. Smooth muscle has no troponin regulating the actin side at all; the regulation sits on the myosin side instead, through calmodulin activating a kinase that phosphorylates the myosin head — a genuinely different molecular switch from the skeletal mechanism, not just a renamed version of it.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-PHY-T01

## secondary_node_ids
DIS-PHY-T05 | DIS-HIS-T02

## topic
Cell and membrane physiology

## subtopic
Smooth Muscles

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Smooth Muscles > Excitation-Contraction Coupling of smooth muscle

## article_ids
ART-103-PHY-SMOOTH-COUPLING-PLASTICITY

## related_article_ids
ART-103-PHY-SKELETAL-MUSCLE-TENSION

## related_concept_ids
CON-MSK-A10AC6BAF27F00 | CON-MSK-B2B106C1D81C30 | CON-MSK-18743CBD569602

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.5

## exam_weight_by_year
KAU_Y1=0.5

## clinical_relevance
0.5

## academic_relevance
0.9

## weight_confidence
0.2

## confidence
0.9

## exam_signal


## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Ca++ binds to calmodulin "Ca++ binding regulating protein". The calcium/calmodulin complex activates myosin light-chain kinase (MLCK), which phosphorylates the regulatory light chain on the head of the myosin molecule ... the dephosphorylated cross-bridges remain attached to actin. These are called latch-bridges ... Latch-bridges provide smooth muscle with the ability to maintain tone for long time with little energy consumption.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book does not state what proportion of cross-bridges typically remain as latch bridges during a sustained smooth-muscle contraction, so no numeric estimate of the latch state's contribution to total tone is available from this source.

## evidence_gaps
Supported by the department book only, pages 48 and 49. No independent verification against an international physiology reference has been attached. No exam-paper occurrence exists for this concept; the weight above is a qualitative estimate.

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

## exclusion_reason


## field_notes
microtopicId: The book's own section, "Excitation-Contraction Coupling of smooth muscle", is carried by module_subject; the canonical tree has no node finer than DIS-PHY-T01.
nanotopicId: No nanotopic exists below the microtopic level for smooth muscle physiology.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "calmodulin", "myosin light-chain kinase", "latch bridge" and "excitation-contraction coupling smooth muscle" — no concept candidate record exists; the sibling batch's article for this material narrates the same mechanism in prose but no concept record was minted for it there.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the concepts under DIS-PHY-T01, DIS-PHY-T05 and DIS-HIS-T02; no live concept states smooth muscle excitation-contraction coupling or latch bridges. Cross-linked to the sibling batch's skeletal cross-bridge-cycle concept, the direct point of contrast the book itself draws, and to the length-tension/plasticity concept minted alongside it, since plasticity depends on cross-bridges readjusting position, a latch-bridge-adjacent idea.

---

# Item

## label
Smooth muscle is plastic: stretched quickly it first develops more tension, but held stretched its tension falls again as the cross-bridges readjust position

## id
CON-MSK-18743CBD569602

## canonical_key
smooth-muscle.length-tension.plasticity

## aliases
Plasticity of smooth muscle
Stress relaxation
Bladder filling and intravesical pressure

## arabic_label
مرونة العضلة الملساء والعلاقة بين الطول والتوتر

## arabic_aliases
استرخاء الإجهاد في المثانة

## definition
Smooth muscle is plastic: if it is stretched, it first exerts increased tension, but if it is held stretched, the tension gradually decreases again. This results from the myosin cross-bridges readjusting their position on the thin filaments. Because of this property, urine can accumulate in the urinary bladder without much rise in intravesical pressure — the same organ both contracts when stretched quickly and accommodates when stretched slowly and held.

## explicit_objective
Define plasticity in smooth muscle, explain its cross-bridge basis, and state the clinical example the book gives.

## pitfalls
Confusing plasticity with the stretch-triggered contraction described under the control-of-contraction factors. They are opposite time-courses of the same tissue's response to stretch: an immediate, brief stretch raises tension (the stretch response used for evacuating a distended hollow organ), while a stretch that is held raises tension only transiently before it falls again (plasticity, which is what lets the bladder fill without a large pressure rise) — the difference is whether the stretch is brief or sustained.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-PHY-T01

## secondary_node_ids
DIS-PHY-T05 | DIS-HIS-T02

## topic
Cell and membrane physiology

## subtopic
Smooth Muscles

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Smooth Muscles > Relation of Length to Tension: Plasticity

## article_ids
ART-103-PHY-SMOOTH-COUPLING-PLASTICITY

## related_article_ids
ART-103-PHY-SMOOTH-MUSCLE-CONTROL

## related_concept_ids
CON-MSK-A22F7D478A747E | CON-MSK-CF9EFE4EA3C90B | CON-MSK-01E9132FDDF9F2

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.35

## exam_weight_by_year
KAU_Y1=0.35

## clinical_relevance
0.55

## academic_relevance
0.8

## weight_confidence
0.2

## confidence
0.9

## exam_signal


## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
The smooth muscle is plastic. If it is stretched, it first exerts increased tension. However, if the muscle is maintained stretched, the tension gradually decreases. This property results from readjustment of the position of the myosin cross-bridges on the thin filaments. Due to such a property, urine can accumulate in the urinary bladder without much rise of intravesical pressure.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book does not give a time course for how quickly tension falls once a stretch is held, so no rate for this stress-relaxation process is available from this source.

## evidence_gaps
Supported by the department book only, page 51. No independent verification against an international physiology reference has been attached. No exam-paper occurrence exists for this concept; the weight above is a qualitative estimate.

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

## exclusion_reason


## field_notes
microtopicId: The book's own section, "Relation of Length to Tension: Plasticity", is carried by module_subject; the canonical tree has no node finer than DIS-PHY-T01.
nanotopicId: No nanotopic exists below the microtopic level for smooth muscle physiology.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; no corpus extraction record exists.
sourceCandidateIds: Searched the corpus for "plasticity", "stress relaxation" and "intravesical pressure" restricted to smooth muscle — no concept candidate record exists; the sibling batch's article for this material narrates plasticity in its clinical-significance section but no concept record was minted there.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: CON-MSK-A22F7D478A747E (sibling batch) already lists stretch as one of five factors controlling smooth muscle contraction; this record is the dedicated concept for the book's own separate "plasticity" heading, which qualifies that stretch response over time, and is cross-linked to it. Walked the concepts under DIS-PHY-T01, DIS-PHY-T05 and DIS-HIS-T02; no live concept states smooth muscle plasticity.
