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

## approved_video_resource_ids

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

## source_candidate_ids

## original_wording
[Physiology Q1, 5 marks] Describe ionic bases of depolarization phase of action potential.

## merge_ids

## rejected_merge_candidate_ids
CON-CVS-77AA16A0BD5F70

## conflicts

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

## approved_video_resource_ids

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

## source_candidate_ids

## original_wording
[Physiology Q1, 5 marks] Describe ionic bases of depolarization phase of action potential.

## merge_ids

## rejected_merge_candidate_ids
CON-FND-CB479ED34E555F | CON-FND-2EDA697071E588

## conflicts

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

## approved_video_resource_ids

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

## source_candidate_ids

## original_wording
[Physiology Q2, 6 marks] Compare between absolute and relative refractory periods.

## merge_ids

## rejected_merge_candidate_ids
CON-CVS-1AD44A19DA47AD

## conflicts

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

## approved_video_resource_ids

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

## source_candidate_ids

## original_wording
[Physiology Q2, 6 marks] Compare between absolute and relative refractory periods.

## merge_ids

## rejected_merge_candidate_ids
CON-NEU-372B07D041D0AD

## conflicts

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

## approved_video_resource_ids

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

## source_candidate_ids

## original_wording
[Physiology Q3, 4 marks] Explain steps of generation of tension during skeletal muscle contraction.

## merge_ids

## rejected_merge_candidate_ids
CON-MSK-762A229FC8FE5F | CON-MSK-70448A9B07D24A | CON-MSK-CABCD15AA2B0F2

## conflicts

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

## approved_video_resource_ids

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

## source_candidate_ids

## original_wording
[Physiology Q3, 4 marks] Explain steps of generation of tension during skeletal muscle contraction.

## merge_ids

## rejected_merge_candidate_ids
CON-MSK-1AA4B301236114

## conflicts

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

## approved_video_resource_ids

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

## source_candidate_ids

## original_wording
[Physiology Q4, 4 marks] Summarize factors affecting smooth muscle contraction.

## merge_ids

## rejected_merge_candidate_ids

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

## approved_video_resource_ids

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

## source_candidate_ids

## original_wording
[Physiology Q4, 4 marks] Summarize factors affecting smooth muscle contraction.

## merge_ids

## rejected_merge_candidate_ids
CON-CVS-C9E53B5A691D19

## conflicts

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
