<!--
  O6U-IPH-108 -- eighteen new concepts, minted after a real search-before-mint
  pass (00-START-HERE.md §4: shortest distinctive word first, then synonym;
  find-existing.mjs against live state + every docs/*-Source-Imports pending
  folder, plus direct grep of Kasr 108-INT/208-INT/102-INT, Assiut AUN-MPT-104,
  Mansoura MANS-PPPM, MUST CVS-201 and Alexandria 106 concept files -- the
  dispatch's own named likely-overlap general-pharmacology modules).

  This cluster continues "pharma MCQs bank .pdf" from pp.101-160, moving from
  lane 2's autonomic (cholinergic/anticholinergic) pharmacology into the
  atropine/antimuscarinic tail (pp.101-120) and a new adrenergic/sympathomimetic
  section (pp.121-223, "4. Adrenergic physiology" / "5. sympathomimetics") that
  begins at p121. The search found four genuine, fact-level hits -- reused as
  pending-live overlays on Kasr 208-INT (two) and Assiut AUN-MPT-104 (one), plus
  one direct reuse of lane 2's own O6U-IPH-108 concept for benztropine/
  Parkinsonism (see pending-live/O6U-IPH-108-overlay-concepts.md and
  concept/O6U-IPH-108-pharmabank-concepts.md) -- but none of those source
  files' own concepts state the specific facts below, so these eighteen are
  genuinely new content, not duplicates of any reused record's own definition.

  atomic_claim_ids is left blank with a field_notes reason on every record:
  this PDF is not in the shared corpus extraction index, so no citable src_
  claim exists yet. An S5 evidence pass is flagged as follow-up work.
-->

# Item

## id
CON-FND-BC1987AB0E5BA4

## label
Atropine, and its longer-acting substitutes, act as the pharmacologic antidote for muscarinic-excess poisoning, while chronic COPD/asthma bronchodilation instead relies on an inhaled antimuscarinic substitute rather than atropine itself

## canonical_key
teaching.pharma.ans.atropine-antidote-muscarinic-poisoning

## definition
Atropine, by competitively blocking muscarinic receptors, is the antidote for any state of muscarinic-receptor overstimulation, whether from a genuine muscarinic agonist overdose such as pilocarpine or a choline ester, or from mushroom (muscarine-containing species) poisoning, where atropine reverses the muscarinic-excess picture. Atropine and its substitutes are likewise the mainstay for organophosphate anticholinesterase poisoning, which lets endogenous acetylcholine accumulate at the muscarinic receptor in the same way. Atropine itself, rather than an inhaled antimuscarinic substitute such as ipratropium, is the drug used for traveler's diarrhea, organophosphate poisoning, mushroom toxicity, and bradycardia from a hyperactive carotid sinus or heart block. Chronic bronchodilation in asthma or COPD instead relies on an inhaled antimuscarinic substitute rather than systemic atropine, since the systemic antimuscarinic side-effect burden atropine itself would carry is unacceptable for long-term respiratory maintenance therapy.

## explicit_objective
State that atropine (or a substitute) is the antidote for muscarinic-excess poisoning from mushroom toxicity, cholinomimetic overdose, and organophosphate poisoning, and distinguish atropine's own systemic antidotal uses from the inhaled antimuscarinic substitutes used for chronic COPD/asthma bronchodilation.

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
ART-O6U-IPH-PHARMABANK2-ANTIMUSCARINIC

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
O6U-IPH-108 > Autonomic Pharmacology > Atropine as Antidote > Muscarinic-excess poisoning and substitute-drug uses

## exam_signal
src_412e8bcfca222fa1abf8 | quiz_export | | Q1,Q8,Q10 | O6U-IPH-108

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
p101: "Indicate a drug, which is effective in the treatment of mushroom poising: ... Atropine." p108: "The excessive stimulation of muscarinic receptors by pilocarpine and choline esters is blocked competitively by: ... Atropine." p110: "The following are therapeutic uses of atropine rather than atropine substitutes except ... Asthma & COPD."

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
Atropine as Antidote

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
Atropine antidote for muscarinic poisoning
Mushroom poisoning treatment

## arabic_label
[clear]

## arabic_aliases
[clear]

## pitfalls
Assuming atropine itself (rather than an inhaled substitute like ipratropium) is the go-to drug for chronic COPD/asthma bronchodilation -- systemic antimuscarinic side effects make atropine unsuitable for that specific chronic indication even though it remains the drug for acute antidotal uses.

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
[clear]

---

# Item

## id
CON-FND-2A257283EA1ED7

## label
Acute atropine overdose produces its own distinct anticholinergic toxidrome -- flushing, hyperthermia, delirium and mydriasis with tachycardia, not bradycardia -- treated with CNS-penetrant physostigmine rather than neostigmine

## canonical_key
teaching.pharma.ans.atropine-overdose-toxidrome

## definition
Acute atropine (or antimuscarinic) overdose produces a florid but internally-consistent anticholinergic toxidrome: cutaneous flushing, hyperthermia from inhibited sweating together with hot dry skin, CNS excitation with agitation and delirium, and the ocular mydriasis/cycloplegia pair. Tachycardia, not bradycardia, is the genuine cardiovascular feature of this toxidrome, since blocking vagal M2 tone on the SA node removes the parasympathetic brake on heart rate rather than slowing it. Because CNS-penetrant physostigmine can cross into the brain and reverse both the peripheral and central components of this toxidrome, it is the correct treatment for atropine poisoning. Neostigmine, a charged quaternary cholinesterase inhibitor excluded from the CNS, cannot reach the central component of the toxidrome and so is not used to treat atropine poisoning.

## explicit_objective
List the features of the atropine-overdose anticholinergic toxidrome (flushing, hyperthermia, delirium, mydriasis/cycloplegia, tachycardia), and state that CNS-penetrant physostigmine, not the CNS-excluded neostigmine, is used to treat it.

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
ART-O6U-IPH-PHARMABANK2-ANTIMUSCARINIC

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
O6U-IPH-108 > Autonomic Pharmacology > Atropine Overdose Toxidrome > Manifestations and treatment

## exam_signal
src_412e8bcfca222fa1abf8 | quiz_export | | Q6,Q14 | O6U-IPH-108

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
p106: "Manifestations of atropine poisoning includes all of the following symptoms EXCEPT: ... Bradicardia, orthostatic hypotension." p114: "Treatment of atropine poisoning does not include ... Neostigmine."

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
Atropine Overdose Toxidrome

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
Atropine poisoning toxidrome
Atropine overdose treatment

## arabic_label
[clear]

## arabic_aliases
[clear]

## pitfalls
Assuming atropine overdose causes bradycardia because atropine is a parasympathetic-blocking drug -- removing vagal tone from the SA node produces tachycardia, the opposite direction.

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
[clear]

---

# Item

## id
CON-FND-22EF4414E8AEFD

## label
Atropine's single mechanism, competitive muscarinic blockade, gives it a bronchodilator niche in COPD, asthma, reflex bronchospasm and pre-anesthetic secretion control, but not in acute pulmonary edema

## canonical_key
teaching.pharma.ans.atropine-mechanism-bronchodilator-niche

## definition
Atropine's single unifying mechanism across every tissue is competitive, reversible blockade of the muscarinic acetylcholine receptor, rather than any nicotinic or non-competitive action. Applied to the airway, this bronchodilator and antisecretory action is useful in COPD, bronchial asthma, reflex bronchospasm, and as pre-anesthetic medication to dry secretions. It is not a useful treatment for acute pulmonary edema, however, whose management instead centers on diuretics, nitrates and positive-pressure ventilation rather than antimuscarinic bronchodilation.

## explicit_objective
State that atropine acts by competitive muscarinic receptor blockade, and identify acute pulmonary edema as the one setting where its bronchodilator effect is not clinically useful, unlike COPD, asthma, reflex bronchospasm and pre-anesthetic secretion control.

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
ART-O6U-IPH-PHARMABANK2-ANTIMUSCARINIC

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
O6U-IPH-108 > Autonomic Pharmacology > Atropine Mechanism and Bronchodilator Use > Competitive blockade and respiratory indications

## exam_signal
src_412e8bcfca222fa1abf8 | quiz_export | | Q5,Q12 | O6U-IPH-108

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
p107: "The bronchodilator effect of atropine or its substitutes is NOT useful in ... Acute pulmonary edema." p112: "The mechanism of atropine action Is: ... Competitive muscarinic receptors blockade."

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
Atropine Mechanism and Bronchodilator Use

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
Atropine mechanism of action
Atropine bronchodilator indications

## arabic_label
[clear]

## arabic_aliases
[clear]

## pitfalls
Assuming any antimuscarinic bronchodilator effect is useful in acute pulmonary edema simply because it relieves bronchospasm -- pulmonary edema is a fluid-overload/cardiac problem, not a bronchospastic one.

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
[clear]

---

# Item

## id
CON-FND-A66A12DA206DDD

## label
Topical ocular antimuscarinics (tropicamide, cyclopentolate, homatropine) are mydriatics absorbed systemically from the conjunctival sac, while the quaternary drug glycopyrrolate is largely excluded from the eye

## canonical_key
teaching.pharma.ans.ocular-antimuscarinics-vs-glycopyrrolate

## definition
Tropicamide, cyclopentolate and homatropine are all antimuscarinic mydriatics used in ophthalmic practice, each blocking the iris sphincter's muscarinic receptors to dilate the pupil. Because the conjunctival sac is a genuine absorptive surface, cyclopentolate -- like other topical antimuscarinics -- is well absorbed from it into the systemic circulation rather than staying confined to the eye. Glycopyrrolate, by contrast, is a charged quaternary ammonium antimuscarinic, and this charge excludes it from the eye and CNS alike. This is exactly why glycopyrrolate is chosen as a pre-anesthetic antisialagogue when the prescriber wants to dry secretions with the least possible effect on pupil size, unlike the lipid-soluble tertiary amines atropine and homatropine, which do produce mydriasis at systemic doses.

## explicit_objective
Identify tropicamide, cyclopentolate and homatropine as topical antimuscarinic mydriatics absorbed systemically from the conjunctival sac, and state that quaternary glycopyrrolate has the least pupil effect among pre-anesthetic antimuscarinics because it is excluded from the eye.

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
ART-O6U-IPH-PHARMABANK2-ANTIMUSCARINIC

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
O6U-IPH-108 > Autonomic Pharmacology > Ocular Antimuscarinics > Mydriatics and quaternary exclusion

## exam_signal
src_412e8bcfca222fa1abf8 | quiz_export | | Q2,Q4,Q20 | O6U-IPH-108

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
p102: "Indicate the antimuscarinic drug, which is used as a mydriatic: ... All of the above." p104: "It is an anticholinergic drugs used in pre-anesthetic medication and has the LEAST effect on the pupil size ... Glycopyrrolate." p120: "Which of the following is/are correct? ... Cyclopentolate is well absorbed from conjunctival sac into the eye."

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
Ocular Antimuscarinics

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
Mydriatic antimuscarinics
Glycopyrrolate pupil-sparing effect

## arabic_label
[clear]

## arabic_aliases
[clear]

## pitfalls
Assuming every antimuscarinic used near the eye behaves the same way pharmacokinetically -- a lipid-soluble tertiary amine (atropine, homatropine, cyclopentolate, tropicamide) produces mydriasis and is systemically absorbed, while a charged quaternary compound (glycopyrrolate) is largely excluded from the eye.

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
[clear]

---

# Item

## id
CON-FND-3D3B2FE9617FD8

## label
Scopolamine's pharmacologic actions resemble atropine's, but its greater CNS penetration produces marked sedation and vivid dreams; like other antimuscarinics it decreases, not increases, sweating

## canonical_key
teaching.pharma.ans.scopolamine-profile

## definition
Scopolamine's pharmacologic actions closely resemble atropine's, since both are naturally-occurring tropane belladonna alkaloids sharing the same muscarinic-blocking mechanism. Scopolamine's greater CNS penetration gives it a more prominent central signature than atropine, however, producing marked sedation and, characteristically, vivid dreams as a hallmark side effect. Like every antimuscarinic, scopolamine blocks the muscarinic receptors on eccrine sweat glands, so it decreases rather than increases sweating. Diaphoresis is therefore not an expected antimuscarinic adverse effect of scopolamine, in contrast to genuine scopolamine effects such as blurred vision, constipation, confusion and dry mouth (xerostomia).

## explicit_objective
State that scopolamine resembles atropine pharmacologically but produces more prominent CNS sedation and vivid dreams, and that diaphoresis (unlike blurred vision, constipation, confusion and xerostomia) is not an expected scopolamine adverse effect.

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
ART-O6U-IPH-PHARMABANK2-ANTIMUSCARINIC

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
O6U-IPH-108 > Autonomic Pharmacology > Scopolamine Profile > CNS effects and adverse-effect exceptions

## exam_signal
src_412e8bcfca222fa1abf8 | quiz_export | | Q9,Q13,Q15 | O6U-IPH-108

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
p109: "The following adverse effects would NOT be expected with scopolamine ... Diaphoresis." p113: "The pharmacologic actions of scopolamine most closely resemble those of: ... Atropine." p115: "Vivid dreams are famous side effect of ... Scopolamine."

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
Scopolamine Profile

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
Scopolamine adverse effects
Scopolamine vivid dreams

## arabic_label
[clear]

## arabic_aliases
[clear]

## pitfalls
Assuming any antimuscarinic increases sweating because it feels like a stimulant-type drug -- every antimuscarinic, scopolamine included, blocks the muscarinic receptors that drive eccrine sweat gland secretion and so decreases sweating instead.

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
[clear]

---

# Item

## id
CON-FND-F66E0EB81B403C

## label
Pirenzepine is the prototype M1-selective muscarinic antagonist, distinct from the non-selective blockade most antimuscarinics (and, per this source, dicyclomine and trihexyphenidyl) produce across M1, M2 and M3 receptors

## canonical_key
teaching.pharma.ans.pirenzepine-m1-selective

## definition
Pirenzepine is the prototype M1-selective muscarinic receptor antagonist, distinguishing it from atropine and most other antimuscarinics, which block M1, M2 and M3 receptors non-selectively. Because gastric parietal-cell acid secretion and enteric ganglionic transmission are predominantly M1-mediated, pirenzepine's selectivity historically made it useful for peptic ulcer disease with comparatively less of the cardiac (M2) and glandular/smooth-muscle (M3) side-effect burden a non-selective antimuscarinic would carry. This source groups dicyclomine and trihexyphenidyl together with pirenzepine as M1-selective agents; standard pharmacology teaching, however, more commonly classifies dicyclomine (an antispasmodic) and trihexyphenidyl (an antiparkinsonian) as non-selective antimuscarinics, with pirenzepine (and telenzepine) as the specific M1-selective examples, a discrepancy noted here rather than silently resolved.

## explicit_objective
State that pirenzepine is the prototype M1-selective muscarinic antagonist, used historically for peptic ulcer disease because gastric acid secretion is predominantly M1-mediated.

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
ART-O6U-IPH-PHARMABANK2-ANTIMUSCARINIC

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
O6U-IPH-108 > Autonomic Pharmacology > M1-Selective Antagonism > Pirenzepine

## exam_signal
src_412e8bcfca222fa1abf8 | quiz_export | | Q17 | O6U-IPH-108

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
p117: "Which of the following antimuscarinic drugs is a selective M1 blocker? ... All of the above [Dicyclomine, Trihexaphenidyl, Pirenzepine]."

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
M1-Selective Antagonism

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
Pirenzepine M1 selectivity
Selective M1 antagonist

## arabic_label
[clear]

## arabic_aliases
[clear]

## pitfalls
Assuming all antimuscarinics are equally selective for muscarinic receptor subtypes -- pirenzepine is the specific exception taught as M1-selective, and this source's own broader classification (extending that selectivity to dicyclomine and trihexyphenidyl) departs from the more common single-drug teaching.

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## conflicts
[clear]

## uncertainty
This source's printed key groups dicyclomine and trihexyphenidyl with pirenzepine as M1-selective; standard references more commonly teach pirenzepine (and telenzepine) alone as the M1-selective examples, with dicyclomine and trihexyphenidyl taught as non-selective antimuscarinics. The printed key is followed per the standing rule (printed keys stand), and this discrepancy is flagged rather than silently resolved.

## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

---

# Item

## id
CON-FND-4D62F4DD51AA55

## label
Beta-1 receptors are absent from smooth muscle generally, and bronchial, ciliary and pupillary-constrictor smooth muscle specifically carry no alpha receptors, while vascular endothelium's M3 receptors mediate atropine-blockable vasodilation from a direct muscarinic agonist despite the absence of direct innervation

## canonical_key
teaching.pharma.ans.autonomic-receptor-distribution-quirks

## definition
Several autonomic receptor-distribution facts run counter to a naive assumption. Beta-1 adrenoceptors, unlike alpha-1, alpha-2 and beta-2, are essentially absent from smooth muscle, being instead concentrated in cardiac tissue and the kidney's juxtaglomerular apparatus. Bronchial smooth muscle, the ciliary muscle, and the pupillary constrictor (sphincter pupillae) muscle likewise carry no alpha adrenoceptors at all, so their tone is governed by other receptor systems (beta-2 and muscarinic receptors, respectively) rather than by any alpha-mediated adrenergic input. Separately, vascular endothelium carries M3 muscarinic receptors that, when stimulated by a direct-acting agonist such as bethanechol, trigger nitric-oxide-mediated vasodilation blockable by atropine, even though blood vessels themselves receive no direct parasympathetic innervation; the endothelial M3 receptor is instead activated by circulating or locally-applied agonist rather than by a genuine cholinergic nerve.

## explicit_objective
State that beta-1 receptors are absent from smooth muscle generally, that bronchial/ciliary/pupillary-constrictor smooth muscle specifically lack alpha receptors, and that vascular endothelial M3 receptors mediate atropine-blockable, nitric-oxide-dependent vasodilation from a direct muscarinic agonist despite the absence of direct parasympathetic innervation to blood vessels.

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
ART-O6U-IPH-PHARMABANK2-ADRENERGIC-RECEPTORS

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
O6U-IPH-108 > Adrenergic and Muscarinic Pharmacology > Receptor Distribution Quirks > Smooth muscle and vascular endothelium

## exam_signal
src_412e8bcfca222fa1abf8 | quiz_export | | Q18,Q22,Q31 | O6U-IPH-108

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
p118: "Which of the following drugs causes vasodilation that can be blocked by atropine? ... Bethanecol." p124: "All of the following adrenergic receptors are found in smooth muscles EXCEPT ... Beta-1 receptors." p133: "The following smooth muscle(s) do not contain alpha receptors ... All of the above [Bronchial, Ciliary, Constrictor pupillae]."

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
Adrenergic and Muscarinic Pharmacology

## subtopic
Receptor Distribution Quirks

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
Beta-1 absent from smooth muscle
Endothelial M3 vasodilation

## arabic_label
[clear]

## arabic_aliases
[clear]

## pitfalls
Assuming every adrenoceptor subtype is present in every smooth-muscle bed, or that vascular endothelium must be directly innervated to respond to a cholinergic agonist -- the endothelial M3 receptor responds to circulating or locally-applied agonist rather than requiring a genuine cholinergic nerve terminal.

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
[clear]

---

# Item

## id
CON-FND-BF8383BCB20AB4

## label
Peripheral alpha-2 receptors inhibit lipolysis, sympathetic outflow and insulin release and contract arterial smooth muscle -- but do not raise vagal tone -- while presynaptic alpha-2 autoreceptors inhibit further norepinephrine release, and beta-2 receptors instead raise blood glucose via glycogenolysis and facilitate lipolysis

## canonical_key
teaching.pharma.ans.alpha2-beta2-peripheral-effects

## definition
Peripheral alpha-2 and beta-2 adrenoceptors exert broadly opposite metabolic and vascular effects, consistent with their opposite Gi versus Gs coupling. Alpha-2 receptor activation inhibits lipolysis, decreases sympathetic outflow, decreases insulin release from the pancreatic beta cell, and contracts arterial smooth muscle, but it does not increase vagal (parasympathetic) tone, which is not part of the sympathetic alpha-2 receptor's own effect profile. The presynaptic alpha-2 autoreceptor specifically mediates negative feedback: norepinephrine released into the synapse binds back onto its own presynaptic alpha-2 receptor, inhibiting further release. Beta-2 receptor activation, by contrast, raises blood glucose by stimulating hepatic and skeletal-muscle glycogenolysis and facilitates lipolysis, together producing the classic catecholamine metabolic signature of hyperglycemia and elevated free fatty acids.

## explicit_objective
List alpha-2 receptor activation's peripheral effects (inhibited lipolysis, decreased sympathetic outflow and insulin release, arterial smooth-muscle contraction) and its presynaptic autoinhibitory role, and contrast these with beta-2 receptor activation's glycogenolysis- and lipolysis-driven metabolic effects.

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
ART-O6U-IPH-PHARMABANK2-ADRENERGIC-RECEPTORS

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
O6U-IPH-108 > Adrenergic and Muscarinic Pharmacology > Alpha-2 and Beta-2 Peripheral Effects > Metabolic and autoreceptor function

## exam_signal
src_412e8bcfca222fa1abf8 | quiz_export | | Q23,Q25,Q34 | O6U-IPH-108

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
p125: "Alpha 2 receptor activation can lead to all of the following effects EXCEPT ... increased vagal tone." p127: "Choose the correct statement about epinephrine metabolic effects ... B-2 receptors facilitate lipolysis and glycogenolysis." p136: "The presynaptic receptors that are stimulated by norepinephrine Is ... Alpha-2 receptors."

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
Adrenergic and Muscarinic Pharmacology

## subtopic
Alpha-2 and Beta-2 Peripheral Effects

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
Alpha-2 receptor peripheral effects
Beta-2 metabolic effects

## arabic_label
[clear]

## arabic_aliases
[clear]

## pitfalls
Assuming alpha-2 receptor activation raises vagal tone because both are broadly 'parasympathetic-favoring' in a loose sense -- vagal tone is a separate, cholinergic system, not a direct effect of the sympathetic alpha-2 receptor.

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
[clear]

---

# Item

## id
CON-FND-9CB076E696BA1C

## label
Amphetamine, imipramine, maprotyline and cocaine all block presynaptic norepinephrine reuptake, unlike dobutamine, a direct-acting beta-1 agonist that does not act through the norepinephrine transporter

## canonical_key
teaching.pharma.ans.norepinephrine-uptake-blockers

## definition
A structurally diverse group of drugs -- amphetamine, the tricyclic antidepressant imipramine, the tetracyclic antidepressant maprotyline, and the local anesthetic/stimulant cocaine -- all share the ability to block presynaptic norepinephrine reuptake, prolonging and potentiating noradrenergic transmission at the synapse. Dobutamine, in contrast, is a direct-acting synthetic catecholamine that stimulates beta-1 adrenoceptors directly rather than acting through the norepinephrine transporter. Its inotropic effect comes from direct receptor agonism, not from potentiating endogenous norepinephrine, so it does not block norepinephrine uptake the way amphetamine, imipramine, maprotyline and cocaine do.

## explicit_objective
Identify amphetamine, imipramine, maprotyline and cocaine as drugs that block presynaptic norepinephrine reuptake, and state that dobutamine, a direct-acting beta-1 agonist, does not share this mechanism.

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
ART-O6U-IPH-PHARMABANK2-ADRENERGIC-RECEPTORS

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
O6U-IPH-108 > Adrenergic and Muscarinic Pharmacology > Norepinephrine Uptake Blockers > Uptake blockade versus direct agonism

## exam_signal
src_412e8bcfca222fa1abf8 | quiz_export | | Q26 | O6U-IPH-108

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
p128: "Drugs that block uptake I of norepinephrine include all of the following drugs EXCEPT ... Dobutamine."

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
Adrenergic and Muscarinic Pharmacology

## subtopic
Norepinephrine Uptake Blockers

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
Norepinephrine reuptake inhibitors
Dobutamine direct agonism

## arabic_label
[clear]

## arabic_aliases
[clear]

## pitfalls
Assuming any drug that potentiates adrenergic effects must do so by blocking norepinephrine uptake -- a direct-acting agonist such as dobutamine achieves a similar functional outcome (more adrenergic receptor activation) through an entirely different mechanism.

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
[clear]

---

# Item

## id
CON-FND-2A607A49485401

## label
Tyrosine hydroxylase is rate-limiting for catecholamine synthesis; norepinephrine is the main sympathetic-nerve transmitter and epinephrine the main adrenal-medullary hormone; norepinephrine's action ends mainly via presynaptic reuptake; and VMA is the key urinary marker for pheochromocytoma

## canonical_key
teaching.pharma.ans.catecholamine-synthesis-fate-diagnosis

## definition
Tyrosine hydroxylase, which converts tyrosine to L-DOPA, catalyzes the rate-limiting step of catecholamine biosynthesis, upstream of dopamine, norepinephrine and epinephrine formation. Norepinephrine is the principal transmitter released by postganglionic sympathetic nerve terminals, while epinephrine is instead the main catecholamine secreted by the adrenal medulla's chromaffin cells, which express the extra enzyme (phenylethanolamine N-methyltransferase) needed for the final N-methylation step from norepinephrine to epinephrine. Once released, norepinephrine's synaptic action is terminated mainly by active reuptake into the presynaptic nerve terminal, not primarily by enzymatic metabolism; catechol-O-methyltransferase and monoamine oxidase act as secondary clearance mechanisms rather than the main termination pathway. Clinically, this same biosynthetic-metabolic pathway is exploited for diagnosis: vanillylmandelic acid, the principal urinary metabolite of catecholamine breakdown, is the most useful marker for diagnosing pheochromocytoma.

## explicit_objective
State that tyrosine hydroxylase is rate-limiting for catecholamine synthesis, that norepinephrine (sympathetic nerves) and epinephrine (adrenal medulla) are each the principal catecholamine of a different source, that norepinephrine's action ends mainly by presynaptic reuptake, and that urinary VMA is the key pheochromocytoma diagnostic marker.

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
ART-O6U-IPH-PHARMABANK2-ADRENERGIC-RECEPTORS

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
O6U-IPH-108 > Adrenergic and Muscarinic Pharmacology > Catecholamine Synthesis, Fate and Diagnosis > Biosynthesis, termination and pheochromocytoma

## exam_signal
src_412e8bcfca222fa1abf8 | quiz_export | | Q30,Q32,Q33,Q35 | O6U-IPH-108

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
p132: "Termination of norepinephrine effect is MAINLY due to ... Reuptake into presynaptic nerve terminals." p134: "The most important catecholamine secreted by sympathetic nerves Is ... while that secreted by the adrenal medulla is ... Norepinephrine, epinephrine." p135: "The most important marker for diagnosis of phaeochromocytoma ... Vanilyl mandelic acid." p137: "The rate-limiting step in catecholamine biosynthesis is catalyzed by ... Tyrosine hydroxylase."

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
Adrenergic and Muscarinic Pharmacology

## subtopic
Catecholamine Synthesis, Fate and Diagnosis

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
Catecholamine biosynthesis
Norepinephrine reuptake termination
VMA pheochromocytoma marker

## arabic_label
[clear]

## arabic_aliases
[clear]

## pitfalls
Assuming norepinephrine's action ends mainly through enzymatic breakdown (COMT/MAO) because those enzymes are the ones usually named first -- presynaptic reuptake is the dominant termination mechanism, with enzymatic metabolism as a secondary pathway.

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
[clear]

---

# Item

## id
CON-FND-468781ED59332C

## label
Selective MAO-A inhibitors treat depression while selective MAO-B inhibitors treat Parkinsonism, reflecting each isoform's different substrate preference

## canonical_key
teaching.pharma.ans.mao-a-vs-mao-b-selectivity

## definition
Monoamine oxidase exists as two isoforms with different substrate preferences and different therapeutic roles. Selective MAO-A inhibitors preferentially block the isoform that metabolizes serotonin and norepinephrine, and are therefore used to treat depression. Selective MAO-B inhibitors, by contrast, preferentially block the isoform that metabolizes dopamine, sparing peripheral MAO-A activity, and are instead used to treat Parkinsonism by prolonging striatal dopamine's action. Confusing the two selective classes, or assuming either is interchangeably used for both indications, is the classic exam trap this distinction tests.

## explicit_objective
State that selective MAO-A inhibitors are used to treat depression while selective MAO-B inhibitors are used to treat Parkinsonism, reflecting each isoform's preferential substrate.

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
ART-O6U-IPH-PHARMABANK2-ADRENERGIC-RECEPTORS

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
O6U-IPH-108 > Adrenergic and Muscarinic Pharmacology > MAO Isoform Selectivity > MAO-A versus MAO-B indications

## exam_signal
src_412e8bcfca222fa1abf8 | quiz_export | | Q36 | O6U-IPH-108

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
p138: "Which of the following statements Is true about MAOIs ... Selective MAO-A inhibitor is used for treatment of depression while Selective MAO-B inhibitor is used for treatment of Parkinsonism."

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
Adrenergic and Muscarinic Pharmacology

## subtopic
MAO Isoform Selectivity

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
MAO-A inhibitor depression
MAO-B inhibitor Parkinsonism

## arabic_label
[clear]

## arabic_aliases
[clear]

## pitfalls
Swapping the two isoform-selectivity/indication pairs -- MAO-A pairs with depression and MAO-B with Parkinsonism, not the reverse.

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
[clear]

---

# Item

## id
CON-FND-674EB2314FC300

## label
Amphetamine acts indirectly (releasing norepinephrine, inhibiting its reuptake, and stimulating the CNS) without direct receptor agonism; the related noncatecholamine ephedrine shares most of these actions but does not significantly inhibit norepinephrine reuptake

## canonical_key
teaching.pharma.ans.amphetamine-vs-ephedrine-moa

## definition
Amphetamine is an indirect-acting sympathomimetic: it stimulates norepinephrine release from presynaptic vesicles, inhibits norepinephrine reuptake, and produces marked CNS stimulation and anorexigenic (appetite-suppressing) effects, all without itself directly activating an adrenoceptor. Ephedrine, a related but chemically distinct noncatecholamine sympathomimetic, shares several of these actions -- it too stimulates norepinephrine release and has weak direct adrenoceptor agonist activity, and it produces moderate anorexigenic and CNS-stimulant effects. Ephedrine does not significantly inhibit norepinephrine reuptake, however, unlike amphetamine, so the two drugs' indirect components differ even though their overall sympathomimetic pictures overlap.

## explicit_objective
State that amphetamine acts indirectly by releasing norepinephrine and inhibiting its reuptake (without direct receptor agonism), and that ephedrine shares most of amphetamine's actions except norepinephrine reuptake inhibition.

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
ART-O6U-IPH-PHARMABANK2-SYMPATHOMIMETICS

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
O6U-IPH-108 > Sympathomimetic Pharmacology > Indirect and Mixed-Acting Sympathomimetics > Amphetamine versus ephedrine mechanism

## exam_signal
src_412e8bcfca222fa1abf8 | quiz_export | | Q46,Q52 | O6U-IPH-108

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
p150: "Amphetamine induces all the following effects EXCEPT ... Direct Adrenoceptor agonist." p156: "Ephedrine induces all the following effects EXCEPT ... Inhibits NE uptake."

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
Sympathomimetic Pharmacology

## subtopic
Indirect and Mixed-Acting Sympathomimetics

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
Amphetamine mechanism of action
Ephedrine mechanism of action

## arabic_label
[clear]

## arabic_aliases
[clear]

## pitfalls
Assuming amphetamine and ephedrine share an identical mechanism because both are indirect/mixed-acting sympathomimetics -- amphetamine, unlike ephedrine, significantly inhibits norepinephrine reuptake as part of its own mechanism.

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
[clear]

---

# Item

## id
CON-FND-6CA52D9B5DA490

## label
Amphetamine congeners are matched to distinct indications (methylphenidate for ADHD, modafinil for narcolepsy, dextroamphetamine/phentermine for short-term obesity treatment), and atomoxetine, a norepinephrine reuptake inhibitor, lacks the abuse potential of the true amphetamine congeners

## canonical_key
teaching.pharma.ans.amphetamine-congeners-indications

## definition
Several amphetamine congeners are matched to distinct clinical indications: modafinil for narcolepsy, methylphenidate for attention deficit hyperkinetic disorder (ADHD) of childhood, and dextroamphetamine or phentermine for short-term obesity treatment, each reflecting a different balance of CNS-stimulant, anorexigenic and wakefulness-promoting effects. Among amphetamine-related CNS stimulants used for ADHD, atomoxetine stands apart: as a selective norepinephrine reuptake inhibitor rather than a releaser of dopamine and norepinephrine, it lacks the abuse and dependence potential that limits chronic use of the true amphetamine congeners such as dextroamphetamine, methamphetamine and methylphenidate.

## explicit_objective
Match methylphenidate, modafinil, dextroamphetamine and phentermine to their respective indications (ADHD, narcolepsy, short-term obesity), and state that atomoxetine, unlike the true amphetamine congeners, lacks abuse potential.

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
ART-O6U-IPH-PHARMABANK2-SYMPATHOMIMETICS

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
O6U-IPH-108 > Sympathomimetic Pharmacology > Amphetamine Congener Classification > Indications and abuse potential

## exam_signal
src_412e8bcfca222fa1abf8 | quiz_export | | Q40,Q47 | O6U-IPH-108

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
p144: (garbled stem, amphetamine congener/indication matching) "... Methylphenidate, Attention Deficit Hyperkinetic Disorders of Childhood." p151: "Amphetamine related CNS stimulants that lack abuse potential ... Atomoxetine."

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
Sympathomimetic Pharmacology

## subtopic
Amphetamine Congener Classification

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
Amphetamine congener indications
Atomoxetine abuse potential

## arabic_label
[clear]

## arabic_aliases
[clear]

## pitfalls
Assuming every amphetamine-related CNS stimulant carries the same abuse potential -- atomoxetine's different mechanism (reuptake inhibition rather than release) is exactly what spares it that liability.

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
[clear]

---

# Item

## id
CON-FND-AC98BAAAAC26B8

## label
Epinephrine is first-line for anaphylactic shock and its absolute contraindications exclude diabetes mellitus, while pretreatment with an alpha blocker such as phentolamine produces the classic epinephrine-reversal phenomenon

## canonical_key
teaching.pharma.ans.epinephrine-clinical-pharmacology

## definition
Epinephrine is the life-saving, first-line drug for anaphylactic shock, acting through combined alpha-1 (vasoconstriction, reducing mucosal edema and hypotension), beta-1 (cardiac support) and beta-2 (bronchodilation) effects that together reverse the anaphylactic picture. Its short list of absolute contraindications -- uncontrolled hypertension, concurrent nonselective beta-blocker use, and local anesthesia of end-arterial sites such as the fingers -- does not include diabetes mellitus, since epinephrine's hyperglycemic tendency is a manageable adverse effect rather than a contraindication. Pretreating with an alpha-adrenergic blocker such as phentolamine produces the classic epinephrine-reversal phenomenon: with alpha-1 vasoconstriction blocked, epinephrine's unopposed beta-2 vasodilation dominates, so blood pressure falls instead of rising, unlike the response after a pure beta-blocker such as propranolol.

## explicit_objective
State that epinephrine is first-line for anaphylactic shock, that diabetes mellitus is not among its absolute contraindications, and that alpha-blocker (phentolamine) pretreatment produces epinephrine reversal by unmasking unopposed beta-2 vasodilation.

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
ART-O6U-IPH-PHARMABANK2-SYMPATHOMIMETICS

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
O6U-IPH-108 > Sympathomimetic Pharmacology > Epinephrine Clinical Pharmacology > First-line use, contraindications and reversal

## exam_signal
src_412e8bcfca222fa1abf8 | quiz_export | | Q41,Q42,Q53 | O6U-IPH-108

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
p145: "'Epinephrine reversal' could occur if epinephrine is administered in the presence of ... Phentolamine." p146: "Absolute contraindications of epinephrine do not include: ... Diabetes Mellitus." p157: "Epinephrine is life saving first line treatment in ... Anaphylactic shock."

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
Sympathomimetic Pharmacology

## subtopic
Epinephrine Clinical Pharmacology

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
Epinephrine reversal
Epinephrine contraindications
Epinephrine anaphylaxis

## arabic_label
[clear]

## arabic_aliases
[clear]

## pitfalls
Assuming diabetes mellitus is an absolute contraindication to epinephrine because epinephrine raises blood glucose -- the hyperglycemic tendency is a manageable adverse effect, not a listed absolute contraindication.

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
[clear]

---

# Item

## id
CON-FND-BCFA20165C46E9

## label
Clonidine, unlike other topical alpha-2 agonists used for local vasoconstriction, is primarily used systemically to lower blood pressure, and alpha-methyldopa is a prodrug that must be converted to alpha-methylnorepinephrine before it can bind alpha-2 receptors

## canonical_key
teaching.pharma.ans.alpha2-agonist-topical-vs-systemic

## definition
Oxymetazoline, apraclonidine and brimonidine are topical alpha-2 agonists used for local vasoconstriction -- nasal decongestion, and in apraclonidine/brimonidine's case, lowering intraocular pressure -- sharing a receptor mechanism but not clonidine's dominant clinical use. Clonidine, though it too can be applied topically, is primarily used systemically to lower arterial blood pressure through central alpha-2 agonism rather than for a local vasoconstrictor effect. Separately, alpha-methyldopa does not itself bind alpha-2 receptors directly: unlike yohimbine, clonidine, mianserin and alpha-methylnorepinephrine, which all bind alpha-2 receptors directly, alpha-methyldopa is a prodrug that must first be metabolized to alpha-methylnorepinephrine before that active metabolite can act at the alpha-2 receptor.

## explicit_objective
State that clonidine, unlike other topical alpha-2 agonists, is used primarily to lower blood pressure systemically, and that alpha-methyldopa must be converted to alpha-methylnorepinephrine before it can bind alpha-2 receptors directly.

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
ART-O6U-IPH-PHARMABANK2-SYMPATHOMIMETICS

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
O6U-IPH-108 > Sympathomimetic Pharmacology > Alpha-2 Agonist Classification > Topical versus systemic use and prodrug binding

## exam_signal
src_412e8bcfca222fa1abf8 | quiz_export | | Q44,Q45 | O6U-IPH-108

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
p148: "All of the following drugs are used topically to induce local vasoconstriction, however, systemically they lower ABP by selective alpha 2 agonistic effect with the exception of ... Clonidine." p149: "All the following bind selectively to the Alpha-2 receptors EXCEPT ... Alpha Methyldopa."

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
Sympathomimetic Pharmacology

## subtopic
Alpha-2 Agonist Classification

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
Clonidine systemic use
Alpha-methyldopa prodrug

## arabic_label
[clear]

## arabic_aliases
[clear]

## pitfalls
Assuming alpha-methyldopa binds alpha-2 receptors directly because it is taught alongside clonidine as an alpha-2 agonist antihypertensive -- alpha-methyldopa itself is inactive at the receptor until converted to alpha-methylnorepinephrine.

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
[clear]

---

# Item

## id
CON-FND-C4976C568427E9

## label
Anorexigenic drugs cause myocardial infarction, stroke, pulmonary hypertension and valvular heart disease, but not heart block

## canonical_key
teaching.pharma.ans.anorexigen-cardiotoxicity

## definition
Anorexigenic (appetite-suppressant) drugs, particularly the older fenfluramine-class agents, carry a well-documented cardiotoxicity profile: myocardial infarction, stroke, pulmonary arterial hypertension, and valvular heart disease -- classically a restrictive, carcinoid-like valvulopathy from serotonergic stimulation of valve fibroblasts -- are all recognized adverse effects. Heart block, however, is not a recognized anorexigen adverse effect. These drugs' cardiotoxicity centers on ischemic, hypertensive and valvular/structural pathways rather than on cardiac conduction.

## explicit_objective
List myocardial infarction, stroke, pulmonary hypertension and valvular heart disease as recognized anorexigen adverse effects, and state that heart block is not among them.

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
ART-O6U-IPH-PHARMABANK2-SYMPATHOMIMETICS

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
O6U-IPH-108 > Sympathomimetic Pharmacology > Anorexigen Cardiotoxicity > Recognized adverse effects

## exam_signal
src_412e8bcfca222fa1abf8 | quiz_export | | Q48 | O6U-IPH-108

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
p152: "Anorexigens are reported to induce all the following adverse effects EXCEPT ... Heart block."

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
Sympathomimetic Pharmacology

## subtopic
Anorexigen Cardiotoxicity

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
Anorexigen adverse effects
Fenfluramine valvulopathy

## arabic_label
[clear]

## arabic_aliases
[clear]

## pitfalls
Assuming any serious cardiac adverse effect list must include a conduction abnormality -- anorexigen cardiotoxicity is specifically ischemic, hypertensive and valvular/structural, not conduction-related.

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
[clear]

---

# Item

## id
CON-FND-8A51C20EF93A32

## label
Dobutamine's catecholamine structure makes it short-acting, orally ineffective and CNS-excluded, requiring IV infusion, while dopamine is preferred over dobutamine in renal impairment and over isoprenaline in heart block

## canonical_key
teaching.pharma.ans.catecholamine-inotrope-selection

## definition
As a synthetic catecholamine, dobutamine shares the pharmacokinetic limitations common to the whole catecholamine class: it is short-acting from rapid metabolism, not useful given orally because it is destroyed by first-pass gut and liver metabolism, and does not cross the blood-brain barrier. It must therefore be given by continuous intravenous infusion for its inotropic effect. Dopamine, a second-line inotrope and vasopressor, is preferred over dobutamine specifically in the presence of renal impairment through dopaminergic D1-receptor-mediated renal vasodilation at low doses, and preferred over isoprenaline specifically in the presence of heart block through its added alpha/beta-mediated pressor support, which isoprenaline's pure beta-agonism lacks. Dopamine is not preferred over norepinephrine for severe hypotension, however, where norepinephrine's more potent, reliable alpha-1 vasopressor effect is favored instead.

## explicit_objective
State that dobutamine's catecholamine structure makes it short-acting, orally ineffective and CNS-excluded (requiring IV infusion), and that dopamine is preferred over dobutamine in renal impairment and over isoprenaline in heart block, though not over norepinephrine in severe hypotension.

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
ART-O6U-IPH-PHARMABANK2-SYMPATHOMIMETICS

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
O6U-IPH-108 > Sympathomimetic Pharmacology > Catecholamine Inotrope Selection > Dobutamine and dopamine comparison

## exam_signal
src_412e8bcfca222fa1abf8 | quiz_export | | Q50,Q51 | O6U-IPH-108

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
p154: "Dobutamine is a caetchoilamine, so It Is ... All of the above [Short acting, Not useful orally, Does not cross the blood brain barrier]." p155: "Dopamine is a second line inotrope & vasopressor; however it is preferred in presence of ... Two of the above [renal impairment vs dobutamine, heart block vs isoprenaline]."

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
Sympathomimetic Pharmacology

## subtopic
Catecholamine Inotrope Selection

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
Dobutamine pharmacokinetics
Dopamine versus dobutamine and isoprenaline

## arabic_label
[clear]

## arabic_aliases
[clear]

## pitfalls
Assuming dopamine is preferred over every alternative pressor in every setting because it is a flexible, dose-dependent agent -- it is specifically preferred over dobutamine in renal impairment and over isoprenaline in heart block, not over norepinephrine in severe hypotension.

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
[clear]

---

# Item

## id
CON-FND-99640E0725FF3E

## label
Sympathomimetics' gynecological uses include premature labor and threatened abortion (but not an established contraction ring), and their ophthalmic uses include fundus examination, spring catarrh and simple glaucoma

## canonical_key
teaching.pharma.ans.sympathomimetic-gyn-ophtho-uses

## definition
Beta-2 agonist sympathomimetics such as ritodrine and terbutaline are used in obstetric practice as tocolytics, relaxing uterine smooth muscle to manage both premature (preterm) labor and threatened abortion, though not for an established contraction ring, a mechanical labor complication these drugs do not address. In ophthalmology, sympathomimetics serve several distinct roles: mydriasis for fundus examination using an agent such as phenylephrine, decongestant and anti-allergic action in spring catarrh (vernal conjunctivitis), and lowering intraocular pressure in simple (open-angle) glaucoma.

## explicit_objective
List premature labor and threatened abortion as sympathomimetic gynecological uses, and fundus examination, spring catarrh and simple glaucoma as sympathomimetic ophthalmic uses.

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
ART-O6U-IPH-PHARMABANK2-SYMPATHOMIMETICS

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
O6U-IPH-108 > Sympathomimetic Pharmacology > Sympathomimetic Clinical Uses > Gynecological and ophthalmic indications

## exam_signal
src_412e8bcfca222fa1abf8 | quiz_export | | Q54,Q55 | O6U-IPH-108

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
p158: "Gynecological uses of sympathomimetic drugs include ... Two of the above [Premature labor, Threatened abortion]." p159: "In ophthalmic clinics, sympathomimetic drugs may be used in ... All of the above [Fundus examination, Spring catarrh, Simple glaucoma]."

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
Sympathomimetic Pharmacology

## subtopic
Sympathomimetic Clinical Uses

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
Sympathomimetic tocolytic use
Sympathomimetic ophthalmic uses

## arabic_label
[clear]

## arabic_aliases
[clear]

## pitfalls
Assuming sympathomimetic tocolytics also correct a mechanical labor problem such as an established contraction ring -- their action is uterine smooth-muscle relaxation, not correction of an abnormal contraction pattern.

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
[clear]

