# Item

## id
CON-NEU-763D2F7A1571C9

## label
Diffusion is the principal determinant of resting membrane potential

## definition
Diffusion is the principal determinant of resting membrane potential.

## explicit_objective
Explain the concept, its stated qualifiers, and its evidence limits: Diffusion is the principal determinant of resting membrane potential.

## arabic_label
الانتشار هو المحدد الرئيسي لجهد الغشاء الساكن

## universities
+au

## learner_years
+1

## modules
+AU-MED-105

## field_notes
moduleIds: Sparse update — sitting the record inside the existing HIT-LIVE record only adds the Alexandria overlay.
definition: Restated verbatim from the live record, unchanged, because the batch validator requires a definition on every row regardless of update status; this is not a content change.
explicitObjective: Restated verbatim from the live record for the same reason; unchanged.
arabicLabel: Live record carries none; researched and supplied here rather than left as a field-note excuse.

---

# Item

## id
CON-NEU-105A7842809DC1

## label
Chronaxie is the duration required for a stimulus at twice rheobase to evoke a response

## definition
Chronaxie is the duration required for a stimulus at twice rheobase to evoke a response.

## explicit_objective
Explain the concept, its stated qualifiers, and its evidence limits: Chronaxie is the duration required for a stimulus at twice rheobase to evoke a response.

## arabic_label
الكرونكسي هو المدة اللازمة لمثير بضعف شدة الريوباز لإحداث استجابة

## universities
+au

## learner_years
+1

## modules
+AU-MED-105

## field_notes
moduleIds: Sparse update — Alexandria's own Physiology bank (Day 1 revision physiology MSK, MCQs lec 1&2) tests both rheobase and chronaxie against this exact record; no content change needed.
definition: Restated verbatim from the live record, unchanged, because the batch validator requires a definition on every row regardless of update status; this is not a content change.
explicitObjective: Restated verbatim from the live record for the same reason; unchanged.
arabicLabel: Live record carries none; researched and supplied here rather than left as a field-note excuse.

---

# Item

## id
CON-MSK-C12FA82141347B

## label
A single skeletal-muscle fiber contracts maximally or not at all

## canonical_key
teaching.all-or-none.fiber

## aliases
+All-or-none rule
+All-or-none rule and its tissue exceptions

## arabic_label
قاعدة الكل أو لا شيء في الألياف العضلية والعصبية

## definition
A single skeletal-muscle fiber contracts maximally or not at all: a threshold stimulus or stronger gives the fibre's full response, and a sub-threshold stimulus gives none. The same all-or-none behaviour holds for a single nerve fibre, a single fibre of a mixed nerve, and cardiac muscle (which behaves as one functional syncytium because gap junctions couple every cell together). It does **not** hold for a whole mixed nerve trunk, a whole skeletal muscle, or multi-unit smooth muscle, because each of those is a population of independently-recruitable units — a stronger stimulus recruits more of the units (or, for a nerve trunk, activates the less-excitable fibres in it too), so the overall response is graded even though every individual unit inside it is still all-or-none.

## explicit_objective
State which excitable tissues obey the all-or-none rule at the single-cell/single-fibre level (nerve fibre, skeletal muscle fibre, cardiac muscle) and explain why a whole nerve trunk or a whole skeletal muscle does not, despite being built from all-or-none units.

## pitfalls
Treating "the whole skeletal muscle obeys the all-or-none rule" as true because its individual fibres do. Grading in a whole muscle or a whole mixed nerve comes from recruiting a variable number of all-or-none units, not from any single unit responding partially.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
msk

## resource_ids
+src_d2bb9baae77f4df56fc7

## atomic_claim_ids
+CLM-MSK-ALL-OR-NONE-TISSUES-01

## universities
+au

## learner_years
+1

## modules
+AU-MED-105

## original_wording
+"All or none rule: Single nerve fiber either responds maximally or not at all according to intensity of the stimulus ... This rule applied to: 1-Single nerve fiber. 2-Single nerve fiber of mixed nerve. 3-Cardiac muscle. This rule can't apply to: 1-The whole mixed nerve trunk 2-The whole skeletal muscle ... 5-visceral smooth muscle (with gap junctions)." (Dr_ Aliaa book.pdf, MED 105 Physiology, p10)

## field_notes
auTeaching: Alexandria's own Physiology bank (Day 1 revision physiology MSK Q13; lec 1&2 physiology MSK Q10) tests this as the general rule plus its full tissue scope (which tissues obey it, which do not, and why) — broader than this record's original single-fibre-only statement, so `definition`/`explicit_objective`/`pitfalls` were expanded using the department book's own tissue list (Dr_ Aliaa book.pdf, MED 105 Physiology, p10) rather than merging into a second record.
arabicLabel: Live record carries none; researched and supplied here rather than left as a field-note excuse.
relationships: Left untouched on this sparse-plus-expansion update — no new relationship pass was run against CON-MSK-C12FA82141347B's siblings; the concept-graph walk under §Step 4 was done for the 11 newly minted concepts only (see the NEW records below in this same file).

---

# Item

## id
CON-NEU-C578CBFD9ED6A9

## label
Conduction in an unmyelinated nerve fibre is continuous, point-to-point local-circuit spread

## canonical_key
nerve.conduction.continuous-unmyelinated

## aliases
Continuous conduction
Point-to-point nerve conduction
Local-circuit conduction in unmyelinated fibres

## arabic_label
التوصيل المستمر في الألياف العصبية العارية من الميالين

## arabic_aliases
التوصيل من نقطة إلى نقطة

## definition
In an unmyelinated fibre every patch of membrane along its length is excitable, so an effective stimulus at one point raises local Na+ permeability and depolarises that point; the depolarised patch sets up a local circuit of current with the immediately adjacent resting membrane, driving that neighbouring patch to threshold in turn, and so the process repeats continuously along the entire length of the fibre in both directions away from the stimulus. Because every successive patch of membrane must itself be brought to threshold and repolarise afterwards, this continuous conduction is comparatively slow (about 0.5–3 m/s) and requires the Na+/K+ pump to restore ionic gradients along the whole excited length, making it more metabolically costly than saltatory conduction over the same distance.

## explicit_objective
Explain why an unmyelinated fibre must conduct by continuous, point-to-point local-circuit spread rather than by jumping between insulated segments, and state why this makes it both slower and less energy-efficient than saltatory conduction in a myelinated fibre of similar diameter.

## pitfalls
Calling continuous conduction "saltatory" once a diagram shows the impulse "moving along" the fibre. Continuous conduction is defined by the absence of any myelinated internode: there is no low-resistance insulated segment for the local current to leap across, so every adjacent patch of bare membrane must be depolarised in sequence rather than skipped.

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
AU-MED-105

## module_subject
AU-MED-105 > Physiology > Nerve physiology > Properties of the nerve > Conduction of the nerve impulse

## article_ids
ART-NEU-CONTINUOUS-CONDUCTION

## related_article_ids

## related_concept_ids
CON-NEU-A0C8307D2825A6

## related_article_ids
ART-103-PHY-NERVE-FIBRE-AND-CONDUCTION

## resource_ids
src_7b3e43ce7d0febdb4856

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
au

## blueprint_weight
0.4

## exam_weight_by_year
AU_Y1=0.4

## clinical_relevance
0.2

## academic_relevance
0.85

## weight_confidence
0.3

## confidence
0.85

## exam_signal
src_2a6d84d64deab5570e57 | bank | | p2-p7 | AU-MED-105

## atomic_claim_ids
CLM-NEU-CONTINUOUS-CONDUCTION-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"1) Conduction in unmyelinated nerve fibres (continues conduction): a) depolarization: ... A local circuit of current flows between the depolarized areas of the membrane and the adjacent resting membrane areas, causing more depolarization in both directions away from the stimulus, until the entire membrane depolarized ... The velocity of conduction is 0.5-3 ms/sec." (Dr_ Gawad book.pdf, MED 105 Physiology, p21)

## merge_ids

## rejected_merge_candidate_ids
CON-NEU-5664D7AB68AD8D

## conflicts

## uncertainty

## evidence_gaps
Evidence must be attached before publication.

## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed

## review_due

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason

## field_notes
microtopicId: No finer canonical microtopic exists under this concept's placement for this specific fact.
nanotopicId: Same reason as microtopicId.
arabicLabel: Researched and supplied.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-105 physiology bank triage; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "continuous conduction" and "unmyelinated conduction" — no candidate record exists.
lastReviewed: New record; not yet reviewed.
reviewDue: Set when the first review completes.
rejectedMergeCandidateIds: CON-NEU-5664D7AB68AD8D defines myelinated-vs-unmyelinated fibre structure (Schwann cell relationship), not the conduction mechanism itself — a near-miss, deliberately not merged (AU-MED-105-physiology-triage.md, idea 11).
relationships: Walked the concepts already placed under DIS-PHY-T07/SYS-NEU-T01-S02-M03 (nerve physiology). related_concept_ids records the loose neighbour (saltatory conduction); the two are also linked by a typed contrasts_with edge in AU-MED-105-physiology-relations.md.

---

# Item

## id
CON-CVS-4ECCADC8992792

## label
The sinoatrial node is the heart's normal pacemaker because it discharges fastest

## canonical_key
heart.pacemaker.sinoatrial-dominance

## aliases
SA node as normal cardiac pacemaker
Fastest intrinsic discharge sets the pacemaker
SAN dominance over AVN

## arabic_label
العقدة الجيبية الأذينية هي الناظمة الطبيعية لضربات القلب

## arabic_aliases
سيادة العقدة الجيبية الأذينية

## definition
The heart is myogenic: every part of its specialised conducting tissue (SA node, AV node, Purkinje system) can generate its own rhythmic action potentials without any nerve stimulus. The SA node's cells discharge spontaneously and rapidly, at about 60–100 times a minute, faster than the AV node or the Purkinje system can discharge on their own; because the SA node's impulse always reaches and resets the slower latent pacemakers before they reach their own threshold, its rate of discharge is what determines the heart rate under normal conditions. If the SA node is damaged, a slower latent pacemaker (usually the AV node) takes over at its own, lower intrinsic rate.

## explicit_objective
State why the sinoatrial node, rather than the atrioventricular node or the Purkinje system, normally sets the heart rate, and predict what happens to the rhythm if the SA node fails.

## pitfalls
Attributing the SA node's role as pacemaker to its anatomical position (junction of the superior vena cava and right atrium) or to a special nerve supply. It is the pacemaker because its own spontaneous discharge rate is the fastest of the heart's several automatic tissues, not because of where it sits or how it is innervated.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
SYS-CVS-T01-S01-M04

## secondary_node_ids
DIS-ANA-T04 | DIS-PHY-T02

## topic
cvs-cardiac-electrophysiology

## subtopic
SUB_CVS_CARDIAC_ELECTROPHYSIOLOGY_CONDUCTION_SYSTEM

## microtopic

## nanotopic

## modules
AU-MED-105

## module_subject
AU-MED-105 > Physiology > Cardiac electrophysiology > Cardiac automaticity

## article_ids
ART-CVS-CARDIAC-PACEMAKER-AP

## related_article_ids

## related_concept_ids
CON-CVS-81E96340AE844D | CON-CVS-694550FD793D4A | CON-CVS-C9E53B5A691D19

## related_article_ids
ART-CVS-CONDUCTION-CONTRACTILITY

## resource_ids
src_7cde132d457b51ef9203

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
au

## blueprint_weight
0.5

## exam_weight_by_year
AU_Y1=0.5

## clinical_relevance
0.5

## academic_relevance
0.85

## weight_confidence
0.3

## confidence
0.85

## exam_signal
src_56eb2eda1bb51e4c2fdc | bank | | p3 | AU-MED-105

## atomic_claim_ids
CLM-CVS-SAN-PACEMAKER-DOMINANCE-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The heart is a myogenic organ; it does not need nerve stimulation to initiate its contraction ... It contains specialized cells, which discharge spontaneously and rapidly at a frequency of 60-100 per minute (automaticity or rhythmicity) ... Therefore it is the normal cardiac pacemaker: Its rate of discharge determines the heart rate (HR)." (Physiology - Dr. Gawad.pdf, MED 106 Physiology, p3)

## merge_ids

## rejected_merge_candidate_ids
CON-CVS-C9E53B5A691D19

## conflicts

## uncertainty

## evidence_gaps
Evidence must be attached before publication.

## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed

## review_due

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason

## field_notes
microtopicId: No finer canonical microtopic exists under this concept's placement for this specific fact.
nanotopicId: Same reason as microtopicId.
arabicLabel: Researched and supplied.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-105 physiology bank triage; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "sa node pacemaker" and "sinoatrial dominance" — no candidate record exists.
lastReviewed: New record; not yet reviewed.
reviewDue: Set when the first review completes.
rejectedMergeCandidateIds: CON-CVS-C9E53B5A691D19 states that pacemaker cells are automatic and rhythmic in general, not why the SAN specifically outpaces the AVN — a near-miss, deliberately not merged (AU-MED-105-physiology-triage.md, idea 14).
relationships: Walked the concepts under SYS-CVS-T01-S01-M04 (cvs-cardiac-electrophysiology): CON-CVS-C9E53B5A691D19 (automaticity/rhythmicity), CON-CVS-A87E8F7EE8DC58 (vagal funny-current modulation), CON-CVS-7763A99040CEB7 (working-myocyte activation) are same-topic siblings, recorded loosely in related_concept_ids; SAN-dominance is prerequisite to reading any of the pacemaker-cluster records below (CON-CVS-81E96340AE844D, CON-CVS-694550FD793D4A), so a prerequisite_of edge is written in AU-MED-105-physiology-relations.md.

---

# Item

## id
CON-CVS-81E96340AE844D

## label
The pacemaker potential is unstable because hyperpolarisation itself switches on the next depolarising current

## canonical_key
heart.pacemaker.potential-mechanism

## aliases
Pacemaker potential instability
Prepotential (diastolic depolarisation) mechanism
Funny current drives diastolic depolarisation

## arabic_label
عدم استقرار جهد الناظمة (كمون ما قبل الفعل)

## arabic_aliases
التيار الغريب

## definition
A pacemaker cell never rests at a fixed membrane potential. At the end of repolarisation the membrane hyperpolarises to about −60 mV, and that hyperpolarisation is exactly what activates the "funny current" (I_f), a slow inward Na+ current that starts driving the membrane to depolarise again — this spontaneous drift is the prepotential, or diastolic depolarisation, and it is the reason the pacemaker potential is inherently unstable rather than a flat resting level. As the potential drifts to about −50 mV, transient (T-type) Ca2+ channels open and add a further slow inward current, carrying the membrane the rest of the way to the firing level of about −40 mV, where L-type Ca2+ channels open and produce the upstroke of the next action potential.

## explicit_objective
Explain why the pacemaker potential is unstable rather than resting at a fixed value, naming the specific current that hyperpolarisation itself switches on and the sequence of currents that carries the membrane from hyperpolarisation to the firing level.

## pitfalls
Attributing the pacemaker potential's drift to the same fast voltage-gated Na+ channels that depolarise nerve and working cardiac muscle. Those fast Na+ channels are inactivated at the pacemaker cell's less negative operating range; the slow diastolic drift is carried first by the funny current, then by T-type and L-type Ca2+ channels, never by fast Na+ channels.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
SYS-CVS-T01-S01-M04

## secondary_node_ids
DIS-ANA-T04 | DIS-PHY-T02

## topic
cvs-cardiac-electrophysiology

## subtopic
SUB_CVS_CARDIAC_ELECTROPHYSIOLOGY_CONDUCTION_SYSTEM

## microtopic

## nanotopic

## modules
AU-MED-105

## module_subject
AU-MED-105 > Physiology > Cardiac electrophysiology > Pacemaker action potential

## article_ids
ART-CVS-CARDIAC-PACEMAKER-AP

## related_article_ids

## related_concept_ids
CON-CVS-4ECCADC8992792 | CON-CVS-A4657614AE6923 | CON-CVS-A87E8F7EE8DC58

## related_article_ids
ART-CVS-CONDUCTION-CONTRACTILITY

## resource_ids
src_7cde132d457b51ef9203

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
au

## blueprint_weight
0.5

## exam_weight_by_year
AU_Y1=0.5

## clinical_relevance
0.4

## academic_relevance
0.85

## weight_confidence
0.3

## confidence
0.85

## exam_signal
src_56eb2eda1bb51e4c2fdc | bank | | p4 | AU-MED-105

## atomic_claim_ids
CLM-CVS-PACEMAKER-POTENTIAL-MECHANISM-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Phase 4 – The prepotential (diastolic depolarization): Initiation of slow action potential: The hyperpolarization (-60 mv) at the end of repolarization phase (phase 3) triggers Na channel to be activated and depolarization starts Na. This current is called funny current 'If' and it causes the membrane to depolarize spontaneously ... at -50mv T-type Ca channels ... open → cause slow depolarizing baseline ... → drive the membrane potential to the firing (-40mV)." (Physiology - Dr. Gawad.pdf, MED 106 Physiology, p5)

## merge_ids

## rejected_merge_candidate_ids
CON-CVS-A87E8F7EE8DC58

## conflicts

## uncertainty

## evidence_gaps
Evidence must be attached before publication.

## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed

## review_due

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason

## field_notes
microtopicId: No finer canonical microtopic exists under this concept's placement for this specific fact.
nanotopicId: Same reason as microtopicId.
arabicLabel: Researched and supplied.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-105 physiology bank triage; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "pacemaker potential" and "funny current" — no candidate record exists (the funny-current hit found, CON-CVS-A87E8F7EE8DC58, tests parasympathetic modulation of it, a different objective).
lastReviewed: New record; not yet reviewed.
reviewDue: Set when the first review completes.
rejectedMergeCandidateIds: CON-CVS-A87E8F7EE8DC58 tests how acetylcholine lowers cAMP and the funny current (parasympathetic modulation), not the base depolarisation mechanism this bank tests — a near-miss, deliberately not merged (AU-MED-105-physiology-triage.md, idea 15).
relationships: Same-topic sibling walk as CON-CVS-4ECCADC8992792 (see its field_notes). Cross-linked to CON-CVS-A4657614AE6923 (pacemaker-vs-working-myocyte AP) since this record is the mechanistic detail that record's comparison depends on.

---

# Item

## id
CON-CVS-694550FD793D4A

## label
The intrinsic heart rate is the sinoatrial node's own discharge rate, before any autonomic influence

## canonical_key
heart.rate.intrinsic-definition

## aliases
Intrinsic heart rate
SAN's own discharge rate

## arabic_label
معدل ضربات القلب الجوهري

## arabic_aliases

## definition
The sinoatrial node's cells discharge spontaneously, and the frequency of that spontaneous discharge — set by how quickly the node's own funny current and T-/L-type Ca2+ currents carry the pacemaker potential to the firing level, i.e. by the node's own permeability to Na+ and Ca2+ — is the intrinsic heart rate. It is a property of the SA node itself and is distinct from the rate actually observed at rest, which is the intrinsic rate as modified by the autonomic nervous system; at rest, parasympathetic (vagal) tone predominates over sympathetic tone on the SA node, so the observed resting heart rate sits toward the lower part of the node's own spontaneous discharge range rather than at an unmodulated, purely intrinsic value.

## explicit_objective
Define the intrinsic heart rate as the sinoatrial node's own spontaneous discharge rate, and distinguish it from the resting heart rate that is actually observed once autonomic tone is included.

## pitfalls
Treating "intrinsic heart rate" and "resting heart rate" as the same number. The intrinsic rate is what the SA node's own ionic currents would produce with no autonomic input at all; the resting rate is lower because vagal tone predominates over sympathetic tone on the node at rest.

## concept_type
definition

## status
under review

## support_mode
inferred

## subject
cvs

## primary_node_id
SYS-CVS-T01-S01-M04

## secondary_node_ids
DIS-ANA-T04 | DIS-PHY-T02

## topic
cvs-cardiac-electrophysiology

## subtopic
SUB_CVS_CARDIAC_ELECTROPHYSIOLOGY_CONDUCTION_SYSTEM

## microtopic

## nanotopic

## modules
AU-MED-105

## module_subject
AU-MED-105 > Physiology > Cardiac electrophysiology > Cardiac automaticity

## article_ids
ART-CVS-CARDIAC-PACEMAKER-AP

## related_article_ids

## related_concept_ids
CON-CVS-4ECCADC8992792 | CON-CVS-81E96340AE844D | CON-CVS-A87E8F7EE8DC58

## related_article_ids
ART-CVS-CONDUCTION-CONTRACTILITY

## resource_ids
src_7cde132d457b51ef9203

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
au

## blueprint_weight
0.4

## exam_weight_by_year
AU_Y1=0.4

## clinical_relevance
0.4

## academic_relevance
0.8

## weight_confidence
0.3

## confidence
0.6

## exam_signal
src_56eb2eda1bb51e4c2fdc | bank | | p5 | AU-MED-105

## atomic_claim_ids
CLM-CVS-INTRINSIC-HEART-RATE-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"It contains specialized cells, which discharge spontaneously and rapidly at a frequency of 60-100 per minute (automaticity or rhythmicity)." / "Vagal tone: ... Parasympathetic influence exceeds (i.e. predominates) the sympathetic effect on the SAN at rest." (Physiology - Dr. Gawad.pdf, MED 106 Physiology, p3 and p31)

## merge_ids

## rejected_merge_candidate_ids

## conflicts

## uncertainty
The department's own physiology text states the SA node's spontaneous discharge range as 60–100/min and, separately, that vagal tone predominates over sympathetic tone at rest — it never states a single explicit sentence defining "intrinsic heart rate" or separating it numerically from the observed resting rate. This record's definition combines those two statements rather than quoting one; a cleaner source defining the term directly has not been found in this corpus.

## evidence_gaps
Evidence must be attached before publication. The specific numeric distinction between intrinsic rate and resting rate (commonly taught elsewhere as roughly 100–110/min intrinsic versus about 70–75/min resting) is not stated in the cited source and is deliberately not asserted here.

## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed

## review_due

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason

## field_notes
microtopicId: No finer canonical microtopic exists under this concept's placement for this specific fact.
nanotopicId: Same reason as microtopicId.
arabicAliases: No distinct reviewed Arabic alternate was found beyond the label itself.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-105 physiology bank triage; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "intrinsic heart rate" — no candidate record exists.
lastReviewed: New record; not yet reviewed.
reviewDue: Set when the first review completes.
relationships: Same-topic sibling walk as CON-CVS-4ECCADC8992792 (see its field_notes).

---

# Item

## id
CON-CVS-2E009F84C99B77

## label
The plateau of the fast cardiac action potential is a balance between calcium influx and potassium efflux

## canonical_key
heart.action-potential.plateau-mechanism

## aliases
Cardiac action potential plateau
Phase 2 of the fast cardiac action potential
Calcium-potassium balance in the cardiac plateau

## arabic_label
هضبة جهد الفعل في عضلة القلب

## arabic_aliases

## definition
In atrial myocytes, ventricular myocytes and Purkinje fibres, phase 2 (the plateau) holds the membrane depolarised for about 0.1–0.2 seconds. The depolarisation that opened voltage-gated L-type Ca2+ channels during the upstroke lets Ca2+ continue entering the cell throughout this phase, and that inward Ca2+ current is balanced by an outward efflux of K+ through voltage-gated K+ channels; because the two opposite currents are nearly equal, the net current — and so the membrane potential — barely changes, which is what flattens the trace into a plateau instead of letting it repolarise immediately after the upstroke. The Ca2+ that enters during the plateau also triggers further Ca2+ release from the sarcoplasmic reticulum (calcium-induced calcium release), which is what couples this action potential to contraction.

## explicit_objective
Explain the plateau of the fast cardiac action potential as a near-balance between inward Ca2+ current and outward K+ current, and state why that same Ca2+ entry is what links the plateau to excitation–contraction coupling.

## pitfalls
Describing the plateau as a period when "nothing is happening" electrically. Two large, opposite ionic currents are both active throughout the plateau; it only looks flat because they are closely matched, and shifting that balance (more Ca2+ entry, or less K+ efflux) prolongs the plateau and the QT interval.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
SYS-CVS-T01-S01-M04

## secondary_node_ids
DIS-ANA-T04 | DIS-PHY-T02

## topic
cvs-cardiac-electrophysiology

## subtopic
SUB_CVS_CARDIAC_ELECTROPHYSIOLOGY_CONDUCTION_SYSTEM

## microtopic

## nanotopic

## modules
AU-MED-105

## module_subject
AU-MED-105 > Physiology > Cardiac electrophysiology > Cardiac muscle action potential

## article_ids
ART-CVS-CARDIAC-PACEMAKER-AP

## related_article_ids

## related_concept_ids
CON-CVS-A4657614AE6923 | CON-CVS-859114E6FE6C90

## related_article_ids
ART-CVS-CONDUCTION-CONTRACTILITY

## resource_ids
src_7cde132d457b51ef9203

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
au

## blueprint_weight
0.5

## exam_weight_by_year
AU_Y1=0.5

## clinical_relevance
0.5

## academic_relevance
0.85

## weight_confidence
0.35

## confidence
0.85

## exam_signal
src_56eb2eda1bb51e4c2fdc | bank | | p7-p8, p11-p12 | AU-MED-105

## atomic_claim_ids
CLM-CVS-AP-PLATEAU-MECHANISM-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Phase 2: The plateau: the flat portion of the curve persists for about 0.1 to 0.2 seconds. caused by: depolarization opens voltage gated L-type Ca++ channels causing Ca++ influx, that is balanced by the efflux of an equal amount of positive charge carried by K+." (Physiology - Dr. Gawad.pdf, MED 106 Physiology, p4)

## merge_ids

## rejected_merge_candidate_ids

## conflicts

## uncertainty

## evidence_gaps
Evidence must be attached before publication.

## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed

## review_due

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason

## field_notes
microtopicId: No finer canonical microtopic exists under this concept's placement for this specific fact.
nanotopicId: Same reason as microtopicId.
arabicAliases: No distinct reviewed Arabic alternate was found beyond the label itself.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-105 physiology bank triage; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "cardiac action potential plateau" and "plateau phase" — no candidate record exists.
lastReviewed: New record; not yet reviewed.
reviewDue: Set when the first review completes.
relationships: Walked the pacemaker/AP cluster under SYS-CVS-T01-S01-M04; linked to CON-CVS-A4657614AE6923 (the two-AP-type comparison this record's mechanism feeds) and CON-CVS-859114E6FE6C90 (contractility, since the plateau's Ca2+ entry is what makes contraction possible).

---

# Item

## id
CON-CVS-A4657614AE6923

## label
A pacemaker action potential is unstable at rest; a working cardiac myocyte's action potential is not

## canonical_key
heart.action-potential.pacemaker-vs-working-myocardium

## aliases
Pacemaker versus working myocardial action potential
Slow response versus fast response cardiac action potential

## arabic_label
الفرق بين جهد فعل الناظمة وجهد فعل عضلة القلب العاملة

## arabic_aliases

## definition
The two types of cardiac action potential share the same basic ionic toolkit but differ in their starting behaviour. A pacemaker (slow-response) cell never settles at a fixed potential: the pacemaker current continuously drifts the membrane from about −60 mV toward the firing level, its upstroke is carried by L-type Ca2+ channels rather than fast Na+ channels (which are inactivated at its less negative range), and its upstroke is correspondingly slow and low in magnitude. A working atrial or ventricular myocyte (fast-response cell), in contrast, sits at a stable resting potential of about −90 mV until an external stimulus arrives, then fires a rapid, high-magnitude upstroke driven by fast voltage-gated Na+ channels, passes through a plateau, and returns to that same stable resting level — it does not spontaneously depolarise on its own.

## explicit_objective
Compare the pacemaker and working-myocardial action potentials on stability at rest, the channel responsible for the upstroke, and the speed/magnitude of that upstroke.

## pitfalls
Assuming both cardiac action potentials depolarise through the same channels. The pacemaker's slow upstroke depends on L-type Ca2+ channels because fast Na+ channels are inactivated at its resting range; the working myocyte's fast upstroke depends on fast voltage-gated Na+ channels, exactly as in nerve and skeletal muscle.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
SYS-CVS-T01-S01-M04

## secondary_node_ids
DIS-ANA-T04 | DIS-PHY-T02

## topic
cvs-cardiac-electrophysiology

## subtopic
SUB_CVS_CARDIAC_ELECTROPHYSIOLOGY_CONDUCTION_SYSTEM

## microtopic

## nanotopic

## modules
AU-MED-105

## module_subject
AU-MED-105 > Physiology > Cardiac electrophysiology > Pacemaker versus working myocardial action potential

## article_ids
ART-CVS-CARDIAC-PACEMAKER-AP

## related_article_ids

## related_concept_ids
CON-CVS-81E96340AE844D | CON-CVS-2E009F84C99B77 | CON-CVS-7763A99040CEB7

## related_article_ids
ART-CVS-CONDUCTION-CONTRACTILITY

## resource_ids
src_7cde132d457b51ef9203

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
au

## blueprint_weight
0.45

## exam_weight_by_year
AU_Y1=0.45

## clinical_relevance
0.4

## academic_relevance
0.85

## weight_confidence
0.3

## confidence
0.85

## exam_signal
src_56eb2eda1bb51e4c2fdc | bank | | p9-p10 | AU-MED-105

## atomic_claim_ids
CLM-CVS-PACEMAKER-VS-WORKING-AP-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The principal types of cardiac action potentials are the slow and fast types: 1- The slow type occurs in nodal system ... 2- The fast type occurs in: Atrial myocytes. Ventricular myocytes. Purkinje cells." (Physiology - Dr. Gawad.pdf, MED 106 Physiology, p4)

## merge_ids

## rejected_merge_candidate_ids
CON-CVS-7763A99040CEB7

## conflicts

## uncertainty

## evidence_gaps
Evidence must be attached before publication.

## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed

## review_due

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason

## field_notes
microtopicId: No finer canonical microtopic exists under this concept's placement for this specific fact.
nanotopicId: Same reason as microtopicId.
arabicAliases: No distinct reviewed Arabic alternate was found beyond the label itself.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-105 physiology bank triage; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "pacemaker action potential" — the only hits (CON-CVS-7763A99040CEB7, CON-CVS-C9E53B5A691D19) test cell-to-cell activation and general automaticity, not this comparison; no candidate record exists for the comparison itself.
lastReviewed: New record; not yet reviewed.
reviewDue: Set when the first review completes.
rejectedMergeCandidateIds: CON-CVS-7763A99040CEB7 tests how adjacent working myocytes trigger each other's action potentials by cell-to-cell current, not the pacemaker-vs-working comparison this bank tests — a near-miss, deliberately not merged (AU-MED-105-physiology-triage.md, idea 18).
relationships: Walked the pacemaker/AP cluster under SYS-CVS-T01-S01-M04. A typed contrasts_with edge against CON-CVS-2E009F84C99B77 (plateau) is not written — the two are complementary, not confusable — but an often_confused_with edge against CON-CVS-859114E6FE6C90 (contractility vs Frank-Starling pairing) was judged more valuable and is written in AU-MED-105-physiology-relations.md instead.

---

# Item

## id
CON-CVS-57B2E1283C80AF

## label
Conduction is fastest through the Purkinje system of any cardiac tissue

## canonical_key
heart.conduction.purkinje-velocity

## aliases
Purkinje fibre conduction velocity
Fastest cardiac conduction tissue

## arabic_label
أسرع أنسجة التوصيل في القلب هي ألياف بركنجي

## arabic_aliases

## definition
Conduction velocity through the heart's conducting tissue depends on fibre diameter, gap-junction density and the rate of depolarisation. Purkinje fibres are large-diameter cells with a high density of gap junctions and conduct at up to about 4 m/s, far faster than the AV node's roughly 0.05 m/s; ranked from slowest to fastest, cardiac conduction runs AV node, then atrial/ventricular myocardium, then the Purkinje system.

## explicit_objective
Rank the heart's conducting tissues by conduction velocity and name the two structural properties (fibre diameter, gap-junction density) that explain why the Purkinje system is fastest.

## pitfalls
Assuming the SA node — the fastest *pacemaker* — is also the fastest *conductor*. Pacemaking speed (rate of spontaneous discharge) and conduction speed (how fast an impulse travels once generated) are different properties; the SA node sets the rate, the Purkinje system carries the impulse fastest.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
SYS-CVS-T01-S01-M04

## secondary_node_ids
DIS-ANA-T04 | DIS-PHY-T02

## topic
cvs-cardiac-electrophysiology

## subtopic
SUB_CVS_CARDIAC_ELECTROPHYSIOLOGY_CONDUCTION_SYSTEM

## microtopic

## nanotopic

## modules
AU-MED-105

## module_subject
AU-MED-105 > Physiology > Cardiac electrophysiology > Conduction system

## article_ids
ART-CVS-CONDUCTION-CONTRACTILITY

## related_article_ids

## related_concept_ids
CON-CVS-100ED24FFCB92D | CON-CVS-EB114E0205680C

## related_article_ids
ART-CVS-CARDIAC-PACEMAKER-AP

## resource_ids
src_7cde132d457b51ef9203

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
au

## blueprint_weight
0.45

## exam_weight_by_year
AU_Y1=0.45

## clinical_relevance
0.4

## academic_relevance
0.8

## weight_confidence
0.3

## confidence
0.85

## exam_signal
src_56eb2eda1bb51e4c2fdc | bank | | p13-p14 | AU-MED-105

## atomic_claim_ids
CLM-CVS-PURKINJE-CONDUCTION-VELOCITY-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"AVN Conduction / Purkinje fibers Conduction: Conduction velocity: Slow (0.05 m/s) / Fast (4 m/s) ... diameter of fibers: Small / Large ... Gap junction density (amount): Low (few) / High (many)." (Physiology - Dr. Gawad.pdf, MED 106 Physiology, p9)

## merge_ids

## rejected_merge_candidate_ids

## conflicts

## uncertainty

## evidence_gaps
Evidence must be attached before publication.

## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed

## review_due

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason

## field_notes
microtopicId: No finer canonical microtopic exists under this concept's placement for this specific fact.
nanotopicId: Same reason as microtopicId.
arabicAliases: No distinct reviewed Arabic alternate was found beyond the label itself.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-105 physiology bank triage; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "purkinje fibre" and "purkinje fiber" — both homonym-trapped to cerebellar Purkinje cells (CON-NEU-*); no cardiac candidate record exists.
lastReviewed: New record; not yet reviewed.
reviewDue: Set when the first review completes.
relationships: Walked the conduction cluster (this record, CON-CVS-100ED24FFCB92D, CON-CVS-EB114E0205680C) under SYS-CVS-T01-S01-M04; a mechanism_step_before edge (Purkinje velocity enables ventricular synchronisation) is written in AU-MED-105-physiology-relations.md against CON-CVS-EB114E0205680C.

---

# Item

## id
CON-CVS-100ED24FFCB92D

## label
Conduction is slowest through the AV node, and vagal stimulation slows it further

## canonical_key
heart.conduction.tissue-comparison-vagal-effect

## aliases
AV nodal delay
Vagal effect on AV conduction
Negative dromotropic effect

## arabic_label
تباطؤ التوصيل في العقدة الأذينية البطينية وأثر العصب المبهم عليه

## arabic_aliases

## definition
Of all cardiac tissue, the atrioventricular (AV) node conducts most slowly (about 0.05 m/s), because its fibres are small in diameter with few gap junctions. This deliberate delay lets the atria finish contracting and empty into the ventricles before ventricular depolarisation begins, and it also protects the ventricles from an abnormally fast atrial rhythm being conducted straight through. Parasympathetic (vagal) stimulation decreases AV nodal conduction velocity further — a negative dromotropic effect, mediated by acetylcholine acting on the node — which is why strong vagal activity can produce first-degree or higher AV block.

## explicit_objective
State which cardiac tissue conducts most slowly and why, explain the physiological purpose of that delay, and describe how vagal stimulation affects it.

## pitfalls
Assuming the ventricular myocardium is the slowest-conducting tissue because it is the last part of the heart to be activated. Ordinary ventricular muscle conducts faster than the AV node; the deliberate delay is built into the node itself so that the atria empty first, not into the ventricular wall.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
SYS-CVS-T01-S01-M04

## secondary_node_ids
DIS-ANA-T04 | DIS-PHY-T02

## topic
cvs-cardiac-electrophysiology

## subtopic
SUB_CVS_CARDIAC_ELECTROPHYSIOLOGY_CONDUCTION_SYSTEM

## microtopic

## nanotopic

## modules
AU-MED-105

## module_subject
AU-MED-105 > Physiology > Cardiac electrophysiology > Conduction system

## article_ids
ART-CVS-CONDUCTION-CONTRACTILITY

## related_article_ids

## related_concept_ids
CON-CVS-57B2E1283C80AF | CON-CVS-A87E8F7EE8DC58

## related_article_ids
ART-CVS-CARDIAC-PACEMAKER-AP

## resource_ids
src_7cde132d457b51ef9203

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
au

## blueprint_weight
0.45

## exam_weight_by_year
AU_Y1=0.45

## clinical_relevance
0.5

## academic_relevance
0.8

## weight_confidence
0.3

## confidence
0.85

## exam_signal
src_56eb2eda1bb51e4c2fdc | bank | | p15-p16 | AU-MED-105

## atomic_claim_ids
CLM-CVS-AV-CONDUCTION-VAGAL-EFFECT-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Conduction velocity: Slow (0.05 m/s)" [AVN] ... "Importance of delayed conduction: It allows the atria to contract before the ventricles are stimulated ... It also protects ventricles from abnormal atrial rhythm." (p9); "Vagal stimulation to the heart decreases all cardiac properties (overriding sympathetic activity)." (Physiology - Dr. Gawad.pdf, MED 106 Physiology, p31)

## merge_ids

## rejected_merge_candidate_ids

## conflicts

## uncertainty

## evidence_gaps
Evidence must be attached before publication.

## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed

## review_due

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason

## field_notes
microtopicId: No finer canonical microtopic exists under this concept's placement for this specific fact.
nanotopicId: Same reason as microtopicId.
arabicAliases: No distinct reviewed Arabic alternate was found beyond the label itself.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-105 physiology bank triage; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "vagal stimulation conduction" and "atrioventricular node conduction" — no candidate record exists.
lastReviewed: New record; not yet reviewed.
reviewDue: Set when the first review completes.
relationships: Walked the conduction cluster under SYS-CVS-T01-S01-M04; linked to CON-CVS-A87E8F7EE8DC58 (existing live concept on vagal/funny-current modulation of the SAN) as the parallel vagal effect on the AVN.

---

# Item

## id
CON-CVS-EB114E0205680C

## label
The Purkinje system's rapid conduction lets the whole ventricular mass contract almost simultaneously

## canonical_key
heart.purkinje.ventricular-synchronisation

## aliases
Purkinje system function
Ventricular synchronisation by the Purkinje system

## arabic_label
تزامن انقباض البطينين بفعل جهاز بركنجي

## arabic_aliases

## definition
Because Purkinje fibres conduct roughly eighty times faster than the AV node and considerably faster than ordinary ventricular myocardium, the wave of depolarisation they carry reaches essentially every part of both ventricles within a few tens of milliseconds of each other. This near-simultaneous activation — rather than a slow wave spreading from apex to base through the myocardium alone — is what allows the ventricles to contract as one coordinated pump, generating pressure efficiently, instead of contracting as an uncoordinated, spreading squeeze that would waste much of the contraction against still-relaxed muscle.

## explicit_objective
State the main function of the cardiac Purkinje system and explain why rapid, near-simultaneous ventricular activation matters for effective pumping.

## pitfalls
Confusing the Purkinje system's role (enabling simultaneous contraction) with delaying or coordinating valve closure. Valve closure is a passive consequence of the pressure gradients that simultaneous ventricular contraction itself creates; the Purkinje system's job is the electrical synchronisation, not the mechanical valve action.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
SYS-CVS-T01-S01-M04

## secondary_node_ids
DIS-ANA-T04 | DIS-PHY-T02

## topic
cvs-cardiac-electrophysiology

## subtopic
SUB_CVS_CARDIAC_ELECTROPHYSIOLOGY_CONDUCTION_SYSTEM

## microtopic

## nanotopic

## modules
AU-MED-105

## module_subject
AU-MED-105 > Physiology > Cardiac electrophysiology > Conduction system

## article_ids
ART-CVS-CONDUCTION-CONTRACTILITY

## related_article_ids

## related_concept_ids
CON-CVS-57B2E1283C80AF | CON-CVS-100ED24FFCB92D

## related_article_ids
ART-CVS-CARDIAC-PACEMAKER-AP

## resource_ids
src_7cde132d457b51ef9203

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
au

## blueprint_weight
0.4

## exam_weight_by_year
AU_Y1=0.4

## clinical_relevance
0.4

## academic_relevance
0.8

## weight_confidence
0.3

## confidence
0.8

## exam_signal
src_56eb2eda1bb51e4c2fdc | bank | | p17-p18 | AU-MED-105

## atomic_claim_ids
CLM-CVS-PURKINJE-SYNCHRONISATION-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Importance of rapid conduction: To ensure that all ventricular cells contract at the same time." (Physiology - Dr. Gawad.pdf, MED 106 Physiology, p9)

## merge_ids

## rejected_merge_candidate_ids

## conflicts

## uncertainty

## evidence_gaps
Evidence must be attached before publication.

## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed

## review_due

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason

## field_notes
microtopicId: No finer canonical microtopic exists under this concept's placement for this specific fact.
nanotopicId: Same reason as microtopicId.
arabicAliases: No distinct reviewed Arabic alternate was found beyond the label itself.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-105 physiology bank triage; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "purkinje system" and "conduction velocity purkinje" — both homonym-trapped to cerebellar Purkinje cells; no cardiac candidate record exists.
lastReviewed: New record; not yet reviewed.
reviewDue: Set when the first review completes.
relationships: Walked the conduction cluster under SYS-CVS-T01-S01-M04; a mechanism_step_before edge (CON-CVS-57B2E1283C80AF's velocity enables this record's synchronisation) is written in AU-MED-105-physiology-relations.md.

---

# Item

## id
CON-CVS-859114E6FE6C90

## label
Cardiac contractility is set by how much calcium reaches the myofilaments, independent of fibre length

## canonical_key
heart.contractility.calcium-atpase-mechanism

## aliases
Cardiac inotropic state
Calcium-dependent cardiac contractility

## arabic_label
انقباضية عضلة القلب

## arabic_aliases

## definition
Contractility (the inotropic state) is a change in the force of cardiac contraction at any given sarcomere length — distinct from the length-dependent Frank–Starling effect. It depends on the interaction between actin and myosin, is lost if the bathing medium is calcium-free, and needs ATPase activity during both systole (cross-bridge cycling) and diastole (calcium re-uptake by the sarcoplasmic reticulum). Acute changes in contractility are driven mainly by how much calcium becomes available to the troponin–tropomyosin complex: more intracellular Ca2+ increases the number of actin–myosin cross-bridges that can form, increasing the force generated at the same preload; sympathetic stimulation raises contractility chiefly by increasing Ca2+ entry into the cell.

## explicit_objective
Define cardiac contractility as a calcium-dependent, length-independent property of the myocardium, and identify what does and does not increase it.

## pitfalls
Assuming any rise in serum K+ increases contractility because it is a cation, "like calcium". Hyperkalaemia in fact depresses myocardial excitability and contractility — a partial depolarisation of the resting membrane reduces the Na+ and Ca2+ currents available on excitation — the opposite of what a naive "more ions, more contraction" reading suggests, and exactly the distractor the bank tests.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
SYS-CVS-T01-S02-M02

## secondary_node_ids
DIS-PHY-T02

## topic
cvs-cardiac-mechanics-and-haemodynamics

## subtopic
SUB_CVS_CARDIAC_MECHANICS_AND_HAEMODYNAMICS_CARDIAC_OUTPUT_PRELOAD_AND_AFTERLOAD

## microtopic

## nanotopic

## modules
AU-MED-105

## module_subject
AU-MED-105 > Physiology > Cardiac mechanics > Contractility

## article_ids
ART-CVS-CONDUCTION-CONTRACTILITY

## related_article_ids

## related_concept_ids
CON-CVS-3142C436848ABD | CON-CVS-BD9C1C359D7284

## related_article_ids
ART-CVS-CARDIAC-PACEMAKER-AP

## resource_ids
src_7cde132d457b51ef9203

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
au

## blueprint_weight
0.5

## exam_weight_by_year
AU_Y1=0.5

## clinical_relevance
0.55

## academic_relevance
0.8

## weight_confidence
0.3

## confidence
0.85

## exam_signal
src_56eb2eda1bb51e4c2fdc | bank | | p19-p20 | AU-MED-105

## atomic_claim_ids
CLM-CVS-CONTRACTILITY-CALCIUM-MECHANISM-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"3- Contractility (Inotropic State): ... An acceptable definition of contractility would be a change in performance at a given preload and afterload ... Acute changes in contractility are due to changes in the intracellular dynamics of calcium: more calcium increases the availability of cross-link sites on the actin, increasing cross-linking and the force of contraction ... Sympathetic stimulation to the heart increases myocardial contractility." (Physiology - Dr. Gawad.pdf, MED 106 Physiology, p12)

## merge_ids

## rejected_merge_candidate_ids
CON-CVS-BD9C1C359D7284

## conflicts

## uncertainty

## evidence_gaps
Evidence must be attached before publication.

## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed

## review_due

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason

## field_notes
microtopicId: No finer canonical microtopic exists under this concept's placement for this specific fact.
nanotopicId: Same reason as microtopicId.
arabicAliases: No distinct reviewed Arabic alternate was found beyond the label itself.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-105 physiology bank triage; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "cardiac contractility" — the only hit (CON-CVS-BD9C1C359D7284) tests adenosine's modulating effect, not the base mechanism; no candidate record exists for the base mechanism itself.
lastReviewed: New record; not yet reviewed.
reviewDue: Set when the first review completes.
rejectedMergeCandidateIds: CON-CVS-BD9C1C359D7284 tests that adenosine inhibits cAMP and reduces contractility — a modulator's effect, not the base actin-myosin/calcium mechanism this bank tests — a near-miss, deliberately not merged (AU-MED-105-physiology-triage.md, idea 22).
relationships: Walked the cardiac-mechanics cluster under SYS-CVS-T01-S02-M02; an often_confused_with edge against CON-CVS-3142C436848ABD (Frank-Starling) is written in AU-MED-105-physiology-relations.md, since students routinely conflate a preload-driven rise in force with a true rise in contractility.

---

# Item

## id
CON-CVS-3142C436848ABD

## label
Within physiological limits, a rise in end-diastolic volume raises the force of cardiac contraction (Frank–Starling law)

## canonical_key
heart.frank-starling.edv-force-relationship

## aliases
Frank-Starling law of the heart
Autoregulation of cardiac pumping
EDV-force relationship

## arabic_label
قانون فرانك-ستارلينغ للقلب

## arabic_aliases

## definition
The Frank–Starling law states that, within physiological limits, the tension developed by a cardiac muscle fibre is directly proportional to its initial length, which is set by end-diastolic volume (preload). Put another way, the heart pumps out whatever extra blood returns to it, without letting blood stagnate in the veins — this intrinsic, autoregulatory matching of cardiac output to venous return needs no nerves or hormones. It works through a different pathway from sympathetic stimulation: sympathetic drive raises contractility mainly by increasing calcium entry into the cell, while the Starling mechanism raises force by increasing the myofilaments' sensitivity to whatever calcium is already there, for a fibre of a given length. So, within physiological limits, a rise in end-diastolic volume raises both the force of contraction and cardiac output, and Starling's law is what explains why.

## explicit_objective
State the Frank–Starling law, explain the length-dependent mechanism (myofilament calcium sensitivity, not extra calcium entry) that distinguishes it from a true change in contractility, and predict how force, cardiac output and applicability of the law all move together when EDV rises within physiological limits.

## pitfalls
Confusing the Frank–Starling mechanism with a change in contractility. Preload (Starling) moves the heart along a single length–tension curve by increasing myofilament calcium sensitivity; contractility (e.g. sympathetic stimulation) shifts the heart onto a different curve altogether by increasing calcium entry. The bank tests this directly by pairing "increased EDV" with "force of contraction increased", "cardiac output increased" and "Starling's law is applicable" as all true together.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
SYS-CVS-T01-S02-M02

## secondary_node_ids
DIS-PHY-T02

## topic
cvs-cardiac-mechanics-and-haemodynamics

## subtopic
SUB_CVS_CARDIAC_MECHANICS_AND_HAEMODYNAMICS_CARDIAC_OUTPUT_PRELOAD_AND_AFTERLOAD

## microtopic

## nanotopic

## modules
AU-MED-105

## module_subject
AU-MED-105 > Physiology > Cardiac mechanics > Preload and the Frank-Starling law

## article_ids
ART-CVS-CONDUCTION-CONTRACTILITY

## related_article_ids

## related_concept_ids
CON-CVS-859114E6FE6C90

## related_article_ids
ART-CVS-CARDIAC-PACEMAKER-AP

## resource_ids
src_7cde132d457b51ef9203

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
au

## blueprint_weight
0.55

## exam_weight_by_year
AU_Y1=0.55

## clinical_relevance
0.55

## academic_relevance
0.85

## weight_confidence
0.3

## confidence
0.85

## exam_signal
src_56eb2eda1bb51e4c2fdc | bank | | p21-p22 | AU-MED-105

## atomic_claim_ids
CLM-CVS-FRANK-STARLING-EDV-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"1. Preload: Frank-Starling law of the heart 'autoregulation of cardiac pumping' The law states that: Within physiological limits, the tension develops in cardiac muscle fiber is in directly proportion with the initial length of its fibers which depends on end-diastolic volume (i.e. preload) ... this intrinsic ability of the heart to adapt itself to changing blood volume returned to it is the basis of autoregulation of cardiac pumping." (Physiology - Dr. Gawad.pdf, MED 106 Physiology, p11)

## merge_ids

## rejected_merge_candidate_ids

## conflicts

## uncertainty

## evidence_gaps
Evidence must be attached before publication.

## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed

## review_due

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason

## field_notes
microtopicId: No finer canonical microtopic exists under this concept's placement for this specific fact.
nanotopicId: Same reason as microtopicId.
arabicAliases: No distinct reviewed Arabic alternate was found beyond the label itself.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-105 physiology bank triage; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "frank starling", "starling law heart" and "starling" alone — the last is homonym-trapped to capillary Starling forces (oedema); no cardiac candidate record exists.
lastReviewed: New record; not yet reviewed.
reviewDue: Set when the first review completes.
relationships: Walked the cardiac-mechanics cluster under SYS-CVS-T01-S02-M02; the often_confused_with edge against CON-CVS-859114E6FE6C90 is the one written in AU-MED-105-physiology-relations.md (see that record's field_notes).
