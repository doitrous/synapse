<!--
  O6U-IPH-108 -- nine new concepts, minted after a real search-before-mint pass
  (00-START-HERE.md §4: shortest distinctive word first, then synonym;
  find-existing.mjs against live state + every docs/*-Source-Imports pending
  folder, plus direct grep of Kasr 108-INT/208-INT/102-INT, Assiut AUN-MPT-104,
  Mansoura MANS-PPPM, MUST CVS-201 and Alexandria 106 concept files -- the
  dispatch's own named likely-overlap modules for general pharmacology).

  General autonomic (cholinergic/anticholinergic) pharmacology is taught in
  bulk at every one of those universities, and that search found real,
  fact-level overlap for ten of this cluster's forty-two questions -- reused
  as pending-live overlays on Kasr 208-INT, Assiut AUN-MPT-104 and Mansoura
  MANS-PPPM (see pending-live/O6U-IPH-108-overlay-concepts.md, rows appended
  this pass) -- but none of those source files' own concepts state the
  specific facts below (cholinesterase-inhibitor BBB/absorption
  classification and its printed exceptions, this source's own atropine
  cardiovascular/peripheral/mechanism/special-considerations item set, its
  atropine-like-drug-class list, or its neostigmine/pilocarpine
  indication-matching trivia), so these nine are genuinely new content, not
  duplicates of any reused record's own definition.

  atomic_claim_ids is left blank with a field_notes reason on every record:
  this PDF is not in the shared corpus extraction index, so no citable src_
  claim exists yet. An S5 evidence pass is flagged as follow-up work.
-->

# Item

## id
CON-FND-2F2B6A0A55F802

## label
Reversible versus irreversible cholinesterase inhibitors differ in blood-brain-barrier penetration and oral absorption according to whether they are lipid-soluble tertiary amines or charged quaternary compounds

## canonical_key
teaching.pharma.ans.cholinesterase-inhibitor-classification

## definition
Cholinesterase inhibitors split along two independent axes that predict their clinical use. Reversibility: neostigmine, physostigmine, pyridostigmine and edrophonium bind acetylcholinesterase reversibly, while echothiophate, isoflurophate and other organophosphates bind it essentially irreversibly. Structure: physostigmine is a lipid-soluble tertiary amine that crosses the blood-brain barrier and is well absorbed, giving it central as well as peripheral action; neostigmine, pyridostigmine and edrophonium are charged quaternary ammonium compounds that are poorly and unreliably absorbed orally, do not penetrate the cornea readily, and are excluded from the CNS, restricting their action to the periphery. Echothiophate is likewise charged and CNS-excluded despite being irreversible, which is exactly why it can be used as a topical glaucoma eye drop without central toxicity, whereas isoflurophate, though also an irreversible organophosphate, is lipid-soluble and does cross the blood-brain barrier. The underlying mechanism of every indirect-acting cholinomimetic, reversible or irreversible, is the same: inhibiting acetylcholinesterase lets endogenously-released acetylcholine accumulate and act longer, rather than the drug itself binding and activating the receptor the way a direct-acting agonist such as pilocarpine or carbachol does.

## explicit_objective
Classify individual cholinesterase inhibitors by reversibility and by whether their structure (lipid-soluble tertiary amine versus charged quaternary compound) lets them cross the blood-brain barrier, penetrate the cornea, and be absorbed orally, and state that the shared indirect mechanism is inhibiting acetylcholinesterase rather than directly activating the receptor.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PHA

## article_ids
ART-O6U-IPH-ANS-CHOLINESTERASE-CLASSIFICATION

## learner_years
1

## universities
o6u

## blueprint_weight
0.5

## exam_weight_by_year
O6U_Y1=0.6

## clinical_relevance
0.5

## academic_relevance
0.7

## module_subject
O6U-IPH-108 > Autonomic Pharmacology > Cholinesterase Inhibitors > Blood-brain barrier penetration

## exam_signal
src_412e8bcfca222fa1abf8 | quiz_export | | Q3,Q4,Q7,Q10,Q12 | O6U-IPH-108

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids
[clear]

## resource_ids
src_412e8bcfca222fa1abf8

## related_article_ids
[clear]

## original_wording
p41: "Indicate an irreversible cholinesterase inhibitor that cannot cross the blood brain barrier ... The correct answer is printed by a checkmark on: Ecothiophate." p42: "Indicate the reversible cholinesterase inhibitor, which penetrates the blood-brain barrier ... Physostigmine." p49: "Physostigmine ... Is an indirectly acting cholinomimetic." p52: "Quaternary ammonium anticholinesterases ... None of the above [can penetrate the cornea readily / are easily absorbed orally / enter the CNS freely]." p54: "The mechanism of action of indirect-acting cholinomimetic agents is ... Inhibition of the hydrolysis of endogenous acetylcholine."

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: pharma MCQs bank .pdf is not in the shared corpus extraction index; no citable claim exists yet. S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: No verified live O6U-IPH-108 module id supplied yet; left blank pending Academic Setup import.

## topic
Autonomic Pharmacology
## subtopic
Cholinesterase Inhibitors
## microtopic
[clear]
## nanotopic
[clear]
## secondary_node_ids
[clear]
## related_concept_ids
[clear]
## modules
[clear]
## aliases
Cholinesterase inhibitor blood-brain barrier penetration
Reversible versus irreversible cholinesterase inhibitors
## arabic_label
[clear]
## arabic_aliases
[clear]
## pitfalls
Assuming reversibility and CNS penetration always travel together -- echothiophate is irreversible yet CNS-excluded, and isoflurophate is irreversible yet CNS-penetrant, so the two properties must be checked separately for each drug.
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
CON-FND-C95C991F4315CC (Assiut AUN-MPT-104, echothiophate specifically -- reused directly for Q13, see pending-live overlay) -- narrower single-drug grain than this classification concept, not merged. CON-FND-7044CBD216CDEC (Assiut AUN-MPT-104, direct-vs-indirect NMJ overdose profile -- reused directly for Q5) -- different grain (NMJ/skeletal-muscle potency, not BBB/absorption classification), not merged.

---

# Item

## id
CON-FND-81D2C54917F04D

## label
Glaucoma, hyperglycemia and skeletal-muscle weakness are commonly-confused non-effects of cholinomimetic drugs, each belonging to a different mechanism than the one the distractor implies

## canonical_key
teaching.pharma.ans.cholinomimetic-effect-exceptions

## definition
Three facts are commonly tested as the "exception" among a cholinomimetic's genuine effects. First, glaucoma is not an ocular adverse effect of a cholinomimetic eye drop such as pilocarpine -- it is the condition the drop is used to treat, by increasing aqueous outflow; genuine ocular adverse effects instead include frontal headache, brow ache, lacrimation and eyelid twitching from ciliary spasm. Second, hyperglycemia is not a recognised adverse effect of cholinomimetics, which characteristically slow the heart rather than raise blood glucose; genuine adverse effects instead include tachycardia (via reflex/ganglionic mechanisms), bronchospasm, aggravation of peptic ulcer and diarrhea. Third, skeletal muscle weakness is a nicotinic, not muscarinic, effect of cholinergic excess, arising from depolarising block at the neuromuscular junction rather than from muscarinic receptor overstimulation; genuine muscarinic-excess symptoms instead include abdominal cramps and diarrhea, increased salivation and bronchial secretion, and miosis with bradycardia.

## explicit_objective
State that glaucoma, hyperglycemia and skeletal-muscle weakness are each commonly-tested non-effects of cholinomimetic drugs, and identify the genuine effects (ocular local effects, cardiac/GI/respiratory effects, and muscarinic-excess symptoms respectively) that are correctly attributed to them instead.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PHA

## article_ids
ART-O6U-IPH-ANS-CHOLINESTERASE-CLASSIFICATION

## learner_years
1

## universities
o6u

## blueprint_weight
0.5

## exam_weight_by_year
O6U_Y1=0.6

## clinical_relevance
0.5

## academic_relevance
0.7

## module_subject
O6U-IPH-108 > Autonomic Pharmacology > Cholinomimetic Effect Exceptions > Systemic and ocular adverse effects

## exam_signal
src_412e8bcfca222fa1abf8 | quiz_export | | Q6,Q11,Q14 | O6U-IPH-108

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids
[clear]

## resource_ids
src_412e8bcfca222fa1abf8

## related_article_ids
[clear]

## original_wording
p47: "Ocular adverse effects of cholinomimetic eye drops include all of the following effects EXCEPT ... Glaucoma." p53: "The following Is not an adverse effect of cholinomimetics: ... Hyperglycemia." p56: "The symptoms of excessive stimulation of muscarinic receptors include all of the following EXCEPT: ... Weakness of all skeletal muscles."

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: pharma MCQs bank .pdf is not in the shared corpus extraction index; no citable claim exists yet. S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: No verified live O6U-IPH-108 module id supplied yet; left blank pending Academic Setup import.

## topic
Autonomic Pharmacology
## subtopic
Cholinomimetic Effect Exceptions
## microtopic
[clear]
## nanotopic
[clear]
## secondary_node_ids
[clear]
## related_concept_ids
CON-FND-26A28E75EA8E52
## modules
[clear]
## aliases
Cholinomimetic non-effects
Muscarinic-excess symptom exceptions
## arabic_label
[clear]
## arabic_aliases
[clear]
## pitfalls
Confusing skeletal-muscle weakness (nicotinic, NMJ-mediated) with a muscarinic-excess symptom -- the two receptor systems produce different clinical pictures even though both follow from the same underlying acetylcholinesterase inhibition.
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
CON-FND-26A28E75EA8E52 (Assiut AUN-MPT-104, organophosphate poisoning's own muscarinic-excess symptom picture) -- related contrast (muscarinic-excess symptoms as a POSITIVE finding in poisoning) but a different grain from this concept's three specific "what is NOT an effect" exceptions; cross-linked via related_concept_ids, not merged.

---

# Item

## id
CON-FND-20B978371208CC

## label
Atropine produces tachycardia with comparatively little direct effect on blood pressure, cannot block a beta-adrenergic response such as epinephrine-induced cardiac stimulation, and is mismatched to a tachyarrhythmia such as paroxysmal SVT

## canonical_key
teaching.pharma.ans.atropine-cardiovascular-limits

## definition
By blocking the vagal M2 receptor's restraint on the sinoatrial and atrioventricular nodes, atropine produces tachycardia and increases AV conduction velocity, while having comparatively little direct effect on blood pressure, since resistance vessels carry little direct parasympathetic innervation; it is not given pre-anesthetically, and does not act, to decrease blood pressure. It also relaxes bronchial smooth muscle (mild bronchodilation). Because epinephrine stimulates the heart through beta-adrenergic receptors, an entirely separate receptor system from the muscarinic receptors atropine blocks, atropine cannot block epinephrine-induced cardiac stimulation. And because atropine speeds rather than slows the heart, it is the wrong drug for a tachyarrhythmia such as paroxysmal supraventricular tachycardia -- atropine's genuine cardiac indications are bradyarrhythmias and AV block, the opposite clinical direction.

## explicit_objective
State that atropine produces tachycardia with little direct effect on blood pressure, that it cannot block a beta-adrenergic (epinephrine-mediated) cardiac response, and that it is mismatched to a tachyarrhythmia such as paroxysmal SVT since it would speed the heart further.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PHA

## article_ids
ART-O6U-IPH-ATROPINE-ANTIMUSCARINIC-PHARMACOLOGY

## learner_years
1

## universities
o6u

## blueprint_weight
0.6

## exam_weight_by_year
O6U_Y1=0.7

## clinical_relevance
0.7

## academic_relevance
0.7

## module_subject
O6U-IPH-108 > Autonomic Pharmacology > Atropine Cardiovascular and Autonomic Effects > Cardiorespiratory profile

## exam_signal
src_412e8bcfca222fa1abf8 | quiz_export | | Q18,Q25,Q29,Q30 | O6U-IPH-108

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids
[clear]

## resource_ids
src_412e8bcfca222fa1abf8

## related_article_ids
[clear]

## original_wording
p60: "Which of the following drugs is not correctly matched to its clinical use? ... Atropine/ paroxysmal supraventricular tachycardia." p76: "Atropine causes: ... Tachycardia, little effect on blood pressure and bronchodilation." p80: "Atropine is NOT effective in blocking which of the following responses ... Cardiac stimulation induced by epinephrine." p82: "Atropine is used as pre-anesthetic medication due to all the following EXCEPT: ... It decreases blood pressure."

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: pharma MCQs bank .pdf is not in the shared corpus extraction index; no citable claim exists yet. S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: No verified live O6U-IPH-108 module id supplied yet; left blank pending Academic Setup import.

## topic
Autonomic Pharmacology
## subtopic
Atropine Cardiovascular and Autonomic Effects
## microtopic
[clear]
## nanotopic
[clear]
## secondary_node_ids
[clear]
## related_concept_ids
[clear]
## modules
[clear]
## aliases
Atropine cardiovascular profile
Atropine and epinephrine-induced stimulation
## arabic_label
[clear]
## arabic_aliases
[clear]
## pitfalls
Assuming atropine could be used for any tachyarrhythmia because it is a common cardiac drug -- atropine speeds the heart, so it treats bradyarrhythmias and AV block, never a tachyarrhythmia such as paroxysmal SVT.
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear] -- no near-miss found for this specific cardiovascular-limits fact set.

---

# Item

## id
CON-FND-8A97CF9DA868B9

## label
Atropine relaxes visceral smooth muscle (spasmolytic) but not skeletal (laryngeal) muscle, and is given before inhalant anesthesia to dry secretions, not for its mydriatic side effect or to lower blood pressure

## canonical_key
teaching.pharma.ans.atropine-peripheral-preanesthetic-effects

## definition
Atropine's muscarinic blockade relaxes visceral smooth muscle throughout the gut, ureter and bronchial tree, giving it a genuine spasmolytic (antispasmodic) clinical use; it does not, however, relax laryngeal muscle, since that is skeletal muscle under nicotinic, not muscarinic, control. Its ocular effects follow the same receptor logic: blocking the sphincter pupillae and ciliary muscle produces mydriasis, a rise in intraocular pressure, and cycloplegia -- the opposite of a muscarinic agonist's miosis and lowered pressure. Before inhalant anesthesia, atropine is deliberately given to reduce exocrine (salivary/bronchial) secretions that could otherwise be aspirated, but its concurrent mydriasis is not itself a reason for the drug's pre-anesthetic use -- an anesthetist actually relies on watching pupil size as a depth-of-anesthesia guide, so atropine's mydriasis can interfere with, rather than help, that monitoring.

## explicit_objective
State that atropine relaxes visceral smooth muscle but not laryngeal (skeletal) muscle, describe its ocular triad (mydriasis, raised IOP, cycloplegia), and state that it is given pre-anesthetically to reduce secretions -- not because of its mydriatic side effect, which can interfere with anesthetic-depth monitoring.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PHA

## article_ids
ART-O6U-IPH-ATROPINE-ANTIMUSCARINIC-PHARMACOLOGY

## learner_years
1

## universities
o6u

## blueprint_weight
0.6

## exam_weight_by_year
O6U_Y1=0.7

## clinical_relevance
0.7

## academic_relevance
0.7

## module_subject
O6U-IPH-108 > Autonomic Pharmacology > Atropine Peripheral and Pre-anesthetic Effects > Spasmolytic and ocular effects

## exam_signal
src_412e8bcfca222fa1abf8 | quiz_export | | Q24,Q26,Q27,Q28,Q31 | O6U-IPH-108

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids
[clear]

## resource_ids
src_412e8bcfca222fa1abf8

## related_article_ids
[clear]

## original_wording
p75: "Atropine causes: ... Mydriasis, a rise in intraocular pressure and cycloplegia." p77: "Atropine causes: ... Spasmolytic activity." p78: "Atropine does not induce a relaxant effect on the following muscle ... Laryngeal." p79: "Atropine is frequently used prior to administration of inhalant anesthetics to reduce: ... Exocrine gland Secretions." p83: "Atropine is used in pre-anesthetic medication for all of the following reasons except ... to induce mydriasis."

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: pharma MCQs bank .pdf is not in the shared corpus extraction index; no citable claim exists yet. S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: No verified live O6U-IPH-108 module id supplied yet; left blank pending Academic Setup import.

## topic
Autonomic Pharmacology
## subtopic
Atropine Peripheral and Pre-anesthetic Effects
## microtopic
[clear]
## nanotopic
[clear]
## secondary_node_ids
[clear]
## related_concept_ids
[clear]
## modules
[clear]
## aliases
Atropine spasmolytic action
Atropine ocular triad
Atropine pre-anesthetic use
## arabic_label
[clear]
## arabic_aliases
[clear]
## pitfalls
Assuming atropine relaxes every muscle type -- laryngeal muscle is skeletal, not smooth, and is unaffected. Assuming mydriasis is itself a reason for pre-anesthetic atropine, when it is an incidental side effect that can hinder anesthetic-depth monitoring.
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear] -- no near-miss found for this specific peripheral/pre-anesthetic fact set.

---

# Item

## id
CON-FND-F42F4FCB77237D

## label
Atropine relaxes smooth muscle and sphincters rather than contracting them, is well absorbed orally and centrally penetrant rather than injection-only and CNS-excluded, and its smooth-muscle relaxation is mediated mainly by M3, not M2, receptor blockade

## canonical_key
teaching.pharma.ans.atropine-mechanism-and-features

## definition
Atropine, by blocking muscarinic receptors, relaxes smooth muscle and sphincters throughout the body rather than contracting them, which underlies its spasmolytic use and its tendency to slow rather than speed gastrointestinal transit. As a lipid-soluble tertiary amine, atropine is well absorbed orally (injection is not required), does cross the blood-brain barrier, and is absorbed systemically even after topical ocular instillation via the conjunctiva and nasolacrimal drainage -- which is why atropine eye drops can produce systemic anticholinergic effects, especially in children. Mechanistically, atropine's smooth-muscle relaxation is mediated mainly by blockade of the Gq-coupled M3 receptor on smooth muscle, not the Gi-coupled M2 receptor also present in the heart and at some presynaptic sites; M2 blockade instead accounts for atropine's CNS penetration, its tachycardia (removing the M2-mediated brake on the SA node), and, by blocking presynaptic M2 autoreceptors that normally inhibit further release, an increase in acetylcholine release.

## explicit_objective
State that atropine relaxes, rather than contracts, smooth muscle and sphincters; that it is orally absorbed, CNS-penetrant and systemically absorbed after ocular instillation; and that its smooth-muscle relaxation is mediated by M3, not M2, receptor blockade.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PHA

## article_ids
ART-O6U-IPH-ATROPINE-ANTIMUSCARINIC-PHARMACOLOGY

## learner_years
1

## universities
o6u

## blueprint_weight
0.6

## exam_weight_by_year
O6U_Y1=0.7

## clinical_relevance
0.6

## academic_relevance
0.75

## module_subject
O6U-IPH-108 > Autonomic Pharmacology > Atropine Mechanism and Features > Smooth muscle relaxation and pharmacokinetics

## exam_signal
src_412e8bcfca222fa1abf8 | quiz_export | | Q23,Q32,Q36 | O6U-IPH-108

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids
[clear]

## resource_ids
src_412e8bcfca222fa1abf8

## related_article_ids
[clear]

## original_wording
p74: "All of the following statements about atropine are true EXCEPT: ... it induces smooth muscles and sphincters contractions" (marked false; printed correction: "Atropine relaxes the wall but contracts the sphincters"). p84: "Atropine features: ... None of the above" [blocks all cholinergic activity on the eye / must be injected / does not cross BBB / cannot be absorbed after ocular instillation -- all false]. p92: "The atropine blocking action on the M2 receptors can induce all of the following effects except: ... Smooth muscle relaxation" (printed correction: "The smooth muscle relaxation results mainly from M3-receptors blockade").

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: pharma MCQs bank .pdf is not in the shared corpus extraction index; no citable claim exists yet. S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: No verified live O6U-IPH-108 module id supplied yet; left blank pending Academic Setup import.
q74Note: p74's own printed correction reads "Atropine relaxes the wall but contracts the sphincters" -- kept as printed even though it slightly overstates the case (atropine in fact relaxes most sphincters too, e.g. lower esophageal sphincter, contributing to reflux); the concept's own ## definition states the more general, standard teaching (relaxes smooth muscle AND sphincters) rather than repeating the source's narrower phrasing verbatim, since the question's own correct answer (identifying option e as false) does not depend on the sphincter nuance.

## topic
Autonomic Pharmacology
## subtopic
Atropine Mechanism and Features
## microtopic
[clear]
## nanotopic
[clear]
## secondary_node_ids
[clear]
## related_concept_ids
[clear]
## modules
[clear]
## aliases
Atropine mechanism of smooth muscle relaxation
Atropine pharmacokinetic features
M2 versus M3 blockade
## arabic_label
[clear]
## arabic_aliases
[clear]
## pitfalls
Assuming atropine must be injected because it is often given parenterally in acute settings -- it is in fact well absorbed orally. Attributing atropine's smooth-muscle relaxation to M2 rather than M3 receptor blockade.
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear] -- no near-miss found for this specific mechanism/features fact set.

---

# Item

## id
CON-FND-F1B2D20FAB6B8F

## label
Chlorpheniramine, meperidine, imipramine and quinidine each carry atropine-like anticholinergic side effects, and a purpose-built antimuscarinic such as benztropine, not atropine itself, is preferred for Parkinsonism

## canonical_key
teaching.pharma.ans.atropine-like-drugs-and-parkinsonism-substitutes

## definition
Several drug classes taught outside the antimuscarinic family carry meaningful antimuscarinic activity as part of their own pharmacology, producing atropine-like side effects (dry mouth, blurred vision, tachycardia, urinary retention) alongside their primary action: the antihistamine chlorpheniramine, the opioid meperidine, the tricyclic antidepressant imipramine, and the antiarrhythmic quinidine are the four classically tested examples, and this shared anticholinergic burden is a clinically important reason for caution when combining these classes. Scopolamine and benzhexol are themselves antimuscarinic drugs and so share atropine's adverse-effect profile directly, resembling atropine in adverse effects along with the tricyclic and antihistamine classes above. Separately, for Parkinsonism specifically, atropine itself is not the preferred drug -- purpose-built antimuscarinics such as benztropine, trihexyphenidyl and benzhexol are used instead, since they were developed with a CNS penetration and side-effect profile better suited to chronic dosing for tremor/rigidity; atropine itself remains the standard choice for its other classic indications (hyperhidrosis, partial heart block, organophosphorus poisoning, fundus examination).

## explicit_objective
Name chlorpheniramine, meperidine, imipramine and quinidine as drug classes carrying atropine-like anticholinergic side effects, and state that a purpose-built antimuscarinic (benztropine/trihexyphenidyl/benzhexol), not atropine itself, is preferred for Parkinsonism.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PHA

## article_ids
ART-O6U-IPH-ATROPINE-ANTIMUSCARINIC-PHARMACOLOGY

## learner_years
1

## universities
o6u

## blueprint_weight
0.5

## exam_weight_by_year
O6U_Y1=0.6

## clinical_relevance
0.6

## academic_relevance
0.7

## module_subject
O6U-IPH-108 > Autonomic Pharmacology > Atropine-like Drug Effects > Other drug classes and Parkinsonism substitutes

## exam_signal
src_412e8bcfca222fa1abf8 | quiz_export | | Q33,Q34,Q35 | O6U-IPH-108

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids
[clear]

## resource_ids
src_412e8bcfca222fa1abf8

## related_article_ids
[clear]

## original_wording
p89: "Atropine ITSELF can be used in all the following conditions except ... Parkinsonism" (printed correction: "Benztropine, trihexaphenidyl and benzhexol are preferred"). p90: "Drugs which possess atropine-like actions include: ... All of the above" [Chlorphineramine, Meperidine, Imipramine, Quinidine]. p91: "Which one of the following drugs may resemble atropine in adverse effects? ... All of the above" [Scopolamine, Tricyclic antidepressants, Chlorpheniramine, Benzhexol].

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: pharma MCQs bank .pdf is not in the shared corpus extraction index; no citable claim exists yet. S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: No verified live O6U-IPH-108 module id supplied yet; left blank pending Academic Setup import.

## topic
Autonomic Pharmacology
## subtopic
Atropine-like Drug Effects
## microtopic
[clear]
## nanotopic
[clear]
## secondary_node_ids
[clear]
## related_concept_ids
[clear]
## modules
[clear]
## aliases
Atropine-like anticholinergic drug classes
Parkinsonism antimuscarinic substitutes
## arabic_label
[clear]
## arabic_aliases
[clear]
## pitfalls
Assuming only dedicated antimuscarinic drugs can produce atropine-like side effects -- antihistamines, opioids, tricyclics and antiarrhythmics all carry this activity as an incidental part of their own pharmacology. Assuming atropine itself is the standard Parkinsonism drug because it is the prototypical antimuscarinic.
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear] -- no near-miss found for this specific atropine-like-drug-class fact set.

---

# Item

## id
CON-FND-6A3EF2D52DB133

## label
Antimuscarinic drugs are not contraindicated in bronchial asthma (an inhaled antimuscarinic is a genuine bronchodilator option) or disadvantaged by short duration of action for urinary incontinence, hyoscine is more, not less, potent than atropine as an antisecretory, and the most dangerous anticholinergic effect in children is hyperthermia from impaired sweating

## canonical_key
teaching.pharma.ans.antimuscarinic-special-considerations

## definition
Several antimuscarinic facts run counter to a naive first guess. Bronchial asthma is not a contraindication to antimuscarinic drugs -- an inhaled antimuscarinic bronchodilator (such as ipratropium) is a standard option for reversible airway obstruction -- unlike the genuine contraindications of GERD, prostatic hypertrophy, glaucoma and paralytic ileus, where antimuscarinic action would worsen each condition. For urinary incontinence, anticholinergic drugs have a long enough duration of action for once- or few-times-daily dosing, so short duration of action is not one of their recognised disadvantages; delayed onset, an unsuitable dosage form, precipitating urine retention, and dry mouth are the genuine drawbacks. Compared with atropine, hyoscine (scopolamine) is actually a more, not less, potent antisecretory agent, alongside its more potent antiemetic action, more marked central depressant effect, lack of atropine's brief initial-bradycardia, and shorter mydriasis/cycloplegia. Finally, in children the most dangerous anticholinergic effect is hyperthermia: blocking eccrine sweat gland muscarinic receptors impairs evaporative heat loss, and children's larger surface-area-to-mass ratio makes this especially dangerous -- more so than the cycloplegia, tachycardia or dry-mucous-membrane sensation of dehydration these drugs also cause.

## explicit_objective
State that bronchial asthma is not a contraindication to antimuscarinics, that short duration of action is not a disadvantage of anticholinergics for incontinence, that hyoscine is more potent than atropine as an antisecretory, and that hyperthermia from impaired sweating is the most dangerous anticholinergic effect in children.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PHA

## article_ids
ART-O6U-IPH-ATROPINE-ANTIMUSCARINIC-PHARMACOLOGY

## learner_years
1

## universities
o6u

## blueprint_weight
0.5

## exam_weight_by_year
O6U_Y1=0.6

## clinical_relevance
0.65

## academic_relevance
0.7

## module_subject
O6U-IPH-108 > Autonomic Pharmacology > Antimuscarinic Contraindications and Disadvantages > Special considerations

## exam_signal
src_412e8bcfca222fa1abf8 | quiz_export | | Q37,Q38,Q39,Q40 | O6U-IPH-108

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids
[clear]

## resource_ids
src_412e8bcfca222fa1abf8

## related_article_ids
[clear]

## original_wording
p93: "Compared with atropine, hyoscine (scopolamine) has all of the following properties EXCEPT: ... Less potent anti-secretory effects." p94: "Contraindications to the use of antimuscarinic drugs are all of the following except: ... Bronchial asthma." p95: "Disadvantages of anticholinergic drugs used for urinary incontinence include all of the following EXCEPT ... Short duration of action." p98: "In children, the most dangerous effects of anticholinergic drugs Is ... Hyperthermia."

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: pharma MCQs bank .pdf is not in the shared corpus extraction index; no citable claim exists yet. S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: No verified live O6U-IPH-108 module id supplied yet; left blank pending Academic Setup import.

## topic
Autonomic Pharmacology
## subtopic
Antimuscarinic Contraindications and Disadvantages
## microtopic
[clear]
## nanotopic
[clear]
## secondary_node_ids
[clear]
## related_concept_ids
CON-FND-7F6FE263FBC1C0
## modules
[clear]
## aliases
Antimuscarinic contraindication exceptions
Hyoscine versus atropine potency
Pediatric anticholinergic hyperthermia
## arabic_label
[clear]
## arabic_aliases
[clear]
## pitfalls
Assuming every respiratory disease is an antimuscarinic contraindication -- asthma/COPD is instead a genuine antimuscarinic indication. Assuming hyoscine is a weaker version of atropine across the board, when it is actually more potent for antisecretory and antiemetic effects specifically.
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
CON-FND-7F6FE263FBC1C0 (Assiut AUN-MPT-104, antimuscarinic uses/contraindications incl. narrow-angle glaucoma -- reused directly for Q22, see pending-live overlay) -- shares the same general "antimuscarinic contraindications" territory but covers a different specific list (glaucoma, not asthma/incontinence/hyoscine potency/pediatric hyperthermia); cross-linked via related_concept_ids, not merged.

---

# Item

## id
CON-FND-EDFA6BF936D5D8

## label
Neostigmine is commonly mismatched to hair tonic (a pilocarpine use) and to urinary incontinence (it instead treats the opposite problem, atonic urinary retention)

## canonical_key
teaching.pharma.ans.neostigmine-indication-matching-errors

## definition
Two indication-matching errors are commonly tested against neostigmine's genuine uses (restoring GI/bladder motility after surgery, reversing neuromuscular blockade, treating myasthenia gravis). First, neostigmine is not used as a hair tonic; that minor topical use belongs to pilocarpine, a direct-acting muscarinic agonist, not an anticholinesterase. Second, neostigmine is not used for urinary incontinence; as an indirect-acting cholinesterase inhibitor it increases, rather than decreases, detrusor tone, so it treats the opposite bladder problem -- atonic (non-obstructive) urinary retention, where the bladder fails to empty -- while genuine incontinence drugs include estrogen, the anticholinergic oxybutynin (which relaxes an overactive detrusor), and imipramine (whose combined anticholinergic and alpha-adrenergic effects increase sphincter tone).

## explicit_objective
State that neostigmine is not used as a hair tonic (that use belongs to pilocarpine) and is not used for urinary incontinence (it instead treats atonic urinary retention, the opposite bladder problem).

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PHA

## article_ids
ART-O6U-IPH-CHOLINOMIMETIC-INDICATION-TRIVIA

## learner_years
1

## universities
o6u

## blueprint_weight
0.4

## exam_weight_by_year
O6U_Y1=0.5

## clinical_relevance
0.4

## academic_relevance
0.6

## module_subject
O6U-IPH-108 > Autonomic Pharmacology > Cholinomimetic Indication-Matching Errors > Neostigmine

## exam_signal
src_412e8bcfca222fa1abf8 | quiz_export | | Q20,Q41 | O6U-IPH-108

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
[clear]

## resource_ids
src_412e8bcfca222fa1abf8

## related_article_ids
[clear]

## original_wording
p62: "Which of the following is WRONGLY matched to its indication? ... Neostigmine / Hair tonic." p99: "All the following drugs can be used in urinary incontinence EXCEPT: ... Neostigmine" (printed correction: "Yes: it is used for atonic urine retention").

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: pharma MCQs bank .pdf is not in the shared corpus extraction index; no citable claim exists yet. S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: No verified live O6U-IPH-108 module id supplied yet; left blank pending Academic Setup import.

## topic
Autonomic Pharmacology
## subtopic
Cholinomimetic Indication-Matching Errors
## microtopic
[clear]
## nanotopic
[clear]
## secondary_node_ids
[clear]
## related_concept_ids
CON-FND-ECECFC8B855144
## modules
[clear]
## aliases
Neostigmine indication mismatches
Neostigmine versus incontinence drugs
## arabic_label
[clear]
## arabic_aliases
[clear]
## pitfalls
Assuming any drug that raises bladder tone helps every bladder-emptying problem -- neostigmine's detrusor-stimulating action treats retention (a hypoactive bladder), the opposite of incontinence (an overactive or weak-sphincter bladder).
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
CON-FND-ECECFC8B855144 (Mansoura MANS-PPPM, neostigmine's genuine GIT-motility mechanism -- reused directly for Q17, see pending-live overlay) -- that concept documents neostigmine's real indication; this one documents the two mismatch/exception facts tested against it. Cross-linked via related_concept_ids, not merged.

---

# Item

## id
CON-FND-EF0B0596688120

## label
Pilocarpine, a direct-acting muscarinic agonist, lowers intraocular pressure in glaucoma, is used topically as a hair tonic, and is the one drug among common atropine-adjacent teaching examples that lacks any muscarinic-blocking activity

## canonical_key
teaching.pharma.ans.pilocarpine-uses-and-receptor-selectivity

## definition
Pilocarpine is a direct-acting muscarinic agonist, resistant to hydrolysis by acetylcholinesterase, that produces miosis by contracting the ciliary muscle, opening the trabecular meshwork and increasing aqueous humour outflow, lowering intraocular pressure -- its main clinical use in both acute angle-closure and chronic open-angle glaucoma. It also has a minor, non-ophthalmic topical use as a scalp hair tonic, where local cholinergic stimulation is thought to increase blood flow and stimulate follicle activity, unlike any of the anticholinesterases (echothiophate, neostigmine, edrophonium, physostigmine). Because it is a pure agonist rather than an antagonist, pilocarpine is also the answer when asked which of a set of atropine-adjacent drugs (chlorpromazine, scopolamine, pancuronium, meperidine -- each of which carries some genuine muscarinic-blocking or atropine-like activity) lacks muscarinic receptor-blocking activity altogether.

## explicit_objective
State that pilocarpine lowers intraocular pressure in glaucoma by increasing aqueous outflow, is used topically as a hair tonic, and, as a pure muscarinic agonist, lacks any muscarinic-blocking activity unlike atropine-adjacent drugs such as chlorpromazine, scopolamine, pancuronium or meperidine.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PHA

## article_ids
ART-O6U-IPH-CHOLINOMIMETIC-INDICATION-TRIVIA

## learner_years
1

## universities
o6u

## blueprint_weight
0.4

## exam_weight_by_year
O6U_Y1=0.5

## clinical_relevance
0.5

## academic_relevance
0.6

## module_subject
O6U-IPH-108 > Autonomic Pharmacology > Direct-acting Cholinomimetics > Pilocarpine

## exam_signal
src_412e8bcfca222fa1abf8 | quiz_export | | Q9,Q15,Q42 | O6U-IPH-108

## weight_confidence
0.4

## confidence
0.85

## atomic_claim_ids
[clear]

## resource_ids
src_412e8bcfca222fa1abf8

## related_article_ids
[clear]

## original_wording
p51: "Pilocarpine: ... is used to lower intraocular pressure in glaucoma." p57: "Which of the following cholinomimetics is most commonly used as hair tonic? ... Pilocarpine." p100: "Indicate a drug which lacks muscarinic receptor-blocking activity: ... Pilocarpine."

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: pharma MCQs bank .pdf is not in the shared corpus extraction index; no citable claim exists yet. S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: No verified live O6U-IPH-108 module id supplied yet; left blank pending Academic Setup import.

## topic
Autonomic Pharmacology
## subtopic
Direct-acting Cholinomimetics
## microtopic
[clear]
## nanotopic
[clear]
## secondary_node_ids
[clear]
## related_concept_ids
[clear]
## modules
[clear]
## aliases
Pilocarpine glaucoma use
Pilocarpine hair tonic
Pure muscarinic agonist versus blockers
## arabic_label
[clear]
## arabic_aliases
[clear]
## pitfalls
Assuming pilocarpine, because it is grouped with atropine-adjacent teaching examples, has some receptor-blocking activity of its own -- it is a pure agonist with none.
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear] -- no near-miss found for this specific pilocarpine-uses/receptor-selectivity fact set.

---
