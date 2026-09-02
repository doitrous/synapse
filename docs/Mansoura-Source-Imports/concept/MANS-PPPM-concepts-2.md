<!--
  MANS-PPPM · new (minted) concepts for cluster pppmbank2, Pharmacology p.7-16
  and Pathology p.17 of PPPM Exam Bank ( 61, 60, 59, 58).pdf
  (src_111bbd078054dc30d3af). 37 concepts minted this pass; 8 further concepts
  are REUSED (not restated here) — see pending-live/MANS-PPPM-pppmbank2-concepts-updates.md
  for their sparse tag-addition overlays. Search-before-mint performed via
  find-existing.mjs and grep across docs/*-Source-Imports/{concept,pending-live}
  and docs/import-ready/concept per lane rule; per-concept results are in each
  record's own field_notes.

  Import: Admin › Bulk import → concept.
-->

# Item
## label
Na-Ca exchange is secondary active transport, borrowing the sodium gradient the Na-K ATPase built; the H-K, H+ and Ca ATPases spend ATP directly and are primary active transport
## id
CON-FND-7AD9652B07E414
## canonical_key
teaching.pharma.transport.secondary-active-vs-primary-active
## aliases
Secondary active transport
Primary active transport
Na-Ca exchanger
## arabic_label

## arabic_aliases
[clear]
## definition
Active transport moves a solute against its concentration gradient and is classed as primary or secondary by where the energy comes from. Primary active transport (the Na-K ATPase, H-K ATPase, H+ ATPase and Ca ATPase) hydrolyses ATP directly to move its ion. Secondary active transport, such as the Na-Ca exchanger, spends no ATP of its own; instead it borrows the electrochemical gradient a primary pump already built (here, the sodium gradient from the Na-K ATPase) to move a second ion (calcium) against its own gradient.
## explicit_objective
Classify a named transporter as primary or secondary active transport from whether it hydrolyses ATP directly or borrows an existing ion gradient.
## pitfalls
Treating every carrier-mediated, energy-dependent transporter as equally 'active' without asking where the energy comes from. A secondary active transporter stops working once the primary pump that built its borrowed gradient is blocked, which is the clearest evidence the two are mechanistically dependent rather than equally direct.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
DIS-PHY-T01
## secondary_node_ids
[clear]
## topic
General pharmacology
## subtopic
Membrane transport mechanisms
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Pharmacology > General Pharmacology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p7 | MANS-PPPM
## article_ids
ART-MANS-PPPM-SECONDARY-ACTIVE-TRANSPORT
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.4
## exam_weight_by_year
MANS_Y1=0.4
## clinical_relevance
0.5
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.7
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
Which of the followings is an example of 2ry active transport? A) Na-Ca exchange. B) H-K ATPase. C) H+ ATPase. D) Na-K ATPase. E) Ca ATPase. [answer: A]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching.
## owner
Claude
## reviewer

## final_publisher

## last_reviewed

## review_due

## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## exclusion_reason

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
secondaryNodeIds: No second reviewed placement identified this pass.
relatedArticleIds: No further-reading article exists yet for this module beyond the one on article_ids.
relatedConceptIds: Left for a relations pass.
resourceOccurrenceIds: Read directly from the source PDF by hand (page render, after pagetext.mjs keys mis-attributed several right-margin key-column answers on this file), not by the extraction pipeline; no corpus occurrence record exists to point at.
sourceCandidateIds: CON-GIT-19FF33B01BB7D8 (Kasr, GIT-specific secondary active transport), a Zagazig renal amino-acid transport concept — both organ-specific applications, not the general classification this concept teaches, so neither is a true duplicate.
mint: find-existing.mjs "secondary active transport" / "Na-Ca exchange" surfaced only organ-specific applications (GIT/renal amino-acid transport, a Kasr Na-Ca exchanger-reversibility alias) — no general classification concept of primary-vs-secondary active transport exists in the corpus. Minted new.
atomicClaimIds: No claim record exists yet; this concept/article batch does not include an evidence pass.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: The searches run before minting returned no near-miss to decide against, beyond what sourceCandidateIds already names.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
reviewer: No faculty reviewer has seen this yet.
finalPublisher: Not published — it has not passed the evidence gate.

---

# Item
## label
Donepezil is a centrally-acting reversible cholinesterase inhibitor used for the cognitive symptoms of Alzheimer disease, unlike the peripherally-restricted neostigmine and pyridostigmine
## id
CON-FND-2B84F9B9613A77
## canonical_key
teaching.pharma.ans.donepezil-alzheimer-reversible-achei
## aliases
Donepezil
Alzheimer disease treatment
Central acetylcholinesterase inhibitor
## arabic_label

## arabic_aliases
[clear]
## definition
Donepezil is a reversible acetylcholinesterase inhibitor whose lipophilicity lets it cross the blood-brain barrier and raise acetylcholine levels within the CNS. Because Alzheimer disease is marked by loss of central cholinergic neurons, this central action is what makes donepezil (along with rivastigmine and galantamine) useful for its cognitive symptoms, unlike quaternary cholinesterase inhibitors such as neostigmine and pyridostigmine, which stay largely outside the CNS and are used instead for peripheral neuromuscular disease.
## explicit_objective
Identify donepezil as the centrally-acting reversible cholinesterase inhibitor used for Alzheimer disease, and explain why its CNS penetration is what separates it from the peripherally-restricted agents.
## pitfalls
Lumping every reversible cholinesterase inhibitor together by mechanism alone. Whether a given agent crosses the blood-brain barrier determines whether it is useful for a CNS disease like Alzheimer or restricted to peripheral uses like myasthenia gravis or neuromuscular block reversal.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S02
## secondary_node_ids
DIS-PHA
## topic
General pharmacology
## subtopic
Autonomic nervous system pharmacology — cholinesterase inhibitors
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Pharmacology > General Pharmacology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p7 | MANS-PPPM
## article_ids
ART-MANS-PPPM-DONEPEZIL-ALZHEIMER
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.4
## exam_weight_by_year
MANS_Y1=0.4
## clinical_relevance
0.5
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.7
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
Which of the following reversible cholinesterase inhibitors is used for Alzheimer disease? A) Physostigmine. B) Neostigmine. C) Edrophonium. D) Pyridostigmine. E) Donepezil. [answer: E]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching.
## owner
Claude
## reviewer

## final_publisher

## last_reviewed

## review_due

## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## exclusion_reason

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
secondaryNodeIds: No second reviewed placement identified this pass.
relatedArticleIds: No further-reading article exists yet for this module beyond the one on article_ids.
relatedConceptIds: Left for a relations pass.
resourceOccurrenceIds: Read directly from the source PDF by hand (page render, after pagetext.mjs keys mis-attributed several right-margin key-column answers on this file), not by the extraction pipeline; no corpus occurrence record exists to point at.
sourceCandidateIds: No candidate found.
mint: find-existing.mjs "donepezil" / "Alzheimer" returned no hit anywhere in the corpus. Minted new.
atomicClaimIds: No claim record exists yet; this concept/article batch does not include an evidence pass.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: The searches run before minting returned no near-miss to decide against, beyond what sourceCandidateIds already names.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
reviewer: No faculty reviewer has seen this yet.
finalPublisher: Not published — it has not passed the evidence gate.

---

# Item
## label
Continuous agonist exposure drives receptor down-regulation, a pharmacodynamic mechanism of tolerance distinct from pharmacokinetic mechanisms such as enzyme induction
## id
CON-FND-F4B10C77459DA8
## canonical_key
teaching.pharma.pd.receptor-downregulation-continuous-agonist
## aliases
Receptor down-regulation
Pharmacodynamic tolerance
## arabic_label

## arabic_aliases
[clear]
## definition
Receptor down-regulation is a cellular adaptation to continuous, unbroken agonist exposure: the cell internalises and degrades surface receptors, reducing the number available to respond to further agonist at the same dose. This is a receptor-level (pharmacodynamic) mechanism of tolerance, distinct from pharmacokinetic mechanisms such as faster drug clearance from enzyme induction, and it specifically follows sustained occupancy rather than merely prolonged, intermittent dosing.
## explicit_objective
State that continuous agonist exposure drives receptor down-regulation, and place it as a pharmacodynamic (not pharmacokinetic) mechanism of tolerance.
## pitfalls
Confusing down-regulation (fewer receptors, a cause of tolerance) with tolerance itself (the resulting decreased response, which can also arise from pharmacokinetic mechanisms). Also assuming any prolonged agonist course, even with breaks, produces the same effect as truly continuous, unbroken exposure.
## concept_type
mechanism
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S02
## secondary_node_ids
DIS-PHA
## topic
General pharmacology
## subtopic
Pharmacodynamics — receptor regulation
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Pharmacology > General Pharmacology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p8 | MANS-PPPM
## article_ids
ART-MANS-PPPM-RECEPTOR-DOWNREGULATION
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.4
## exam_weight_by_year
MANS_Y1=0.4
## clinical_relevance
0.5
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.7
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
Down regulated receptors for the daily dose are due to: A) Continuous agonist. B) Continuous antagonist. C) Prolonged use of agonist. D) Tolerance. E) Repeated use of antagonist. [answer: A]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching.
## owner
Claude
## reviewer

## final_publisher

## last_reviewed

## review_due

## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## exclusion_reason

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
secondaryNodeIds: No second reviewed placement identified this pass.
relatedArticleIds: No further-reading article exists yet for this module beyond the one on article_ids.
relatedConceptIds: Left for a relations pass.
resourceOccurrenceIds: Read directly from the source PDF by hand (page render, after pagetext.mjs keys mis-attributed several right-margin key-column answers on this file), not by the extraction pipeline; no corpus occurrence record exists to point at.
sourceCandidateIds: No candidate found.
mint: find-existing.mjs "receptor downregulation" returned no hit. Minted new.
atomicClaimIds: No claim record exists yet; this concept/article batch does not include an evidence pass.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: The searches run before minting returned no near-miss to decide against, beyond what sourceCandidateIds already names.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
reviewer: No faculty reviewer has seen this yet.
finalPublisher: Not published — it has not passed the evidence gate.

---

# Item
## label
CYP2C19 genotype predicts clopidogrel effectiveness because clopidogrel is a prodrug that CYP2C19 bioactivates into its platelet-blocking metabolite
## id
CON-FND-070E0F77B6D20F
## canonical_key
teaching.pharma.pgx.clopidogrel-cyp2c19-activation
## aliases
Clopidogrel pharmacogenetics
CYP2C19 poor metaboliser
## arabic_label

## arabic_aliases
[clear]
## definition
Clopidogrel is a prodrug that requires hepatic bioactivation, mainly by CYP2C19, into an active thiol metabolite before it can irreversibly block the platelet P2Y12 ADP receptor. Patients carrying loss-of-function CYP2C19 alleles (poor metabolisers) generate less active metabolite and get a smaller antiplatelet effect at a standard dose, which is why CYP2C19 genotype is the gene tested to predict clopidogrel effectiveness.
## explicit_objective
State that CYP2C19 genotype predicts clopidogrel effectiveness because CYP2C19 bioactivates this prodrug into its active antiplatelet metabolite.
## pitfalls
Assuming any major CYP predicts any prodrug's activation. Clopidogrel's bioactivation is disproportionately CYP2C19-dependent even though CYP3A4 metabolises a far broader range of drugs overall.
## concept_type
mechanism
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S01
## secondary_node_ids
DIS-PHA
## topic
General pharmacology
## subtopic
Pharmacogenetics
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Pharmacology > General Pharmacology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p8 | MANS-PPPM
## article_ids
ART-MANS-PPPM-CLOPIDOGREL-CYP2C19
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.4
## exam_weight_by_year
MANS_Y1=0.4
## clinical_relevance
0.5
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.7
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
Which gene is predictive of clopidogrel effectiveness? A) CYP2C19. B) CYP2C9. C) CYP2D6. D) CYP3A4. E) CYP4F2. [answer: A]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching.
## owner
Claude
## reviewer

## final_publisher

## last_reviewed

## review_due

## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## exclusion_reason

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
secondaryNodeIds: No second reviewed placement identified this pass.
relatedArticleIds: No further-reading article exists yet for this module beyond the one on article_ids.
relatedConceptIds: Left for a relations pass.
resourceOccurrenceIds: Read directly from the source PDF by hand (page render, after pagetext.mjs keys mis-attributed several right-margin key-column answers on this file), not by the extraction pipeline; no corpus occurrence record exists to point at.
sourceCandidateIds: No candidate found.
mint: find-existing.mjs "clopidogrel" / "CYP2C19" returned no hit. Minted new.
atomicClaimIds: No claim record exists yet; this concept/article batch does not include an evidence pass.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: The searches run before minting returned no near-miss to decide against, beyond what sourceCandidateIds already names.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
reviewer: No faculty reviewer has seen this yet.
finalPublisher: Not published — it has not passed the evidence gate.

---

# Item
## label
Simple diffusion is passive, carrier-free and not saturable; facilitated diffusion is also passive and downhill but needs a carrier and so is saturable
## id
CON-FND-DB4508FEF3E2C2
## canonical_key
teaching.pharma.pk.simple-vs-facilitated-diffusion
## aliases
Simple diffusion
Facilitated diffusion
Passive transport
## arabic_label

## arabic_aliases
[clear]
## definition
Simple diffusion is the passive movement of a solute directly across the lipid bilayer (or through a channel), down its concentration gradient, without a carrier protein; because it depends on no fixed number of binding sites, its rate keeps rising with concentration and it is not saturable. Facilitated diffusion also moves a solute passively downhill, but it depends on a specific carrier protein, which makes it, unlike simple diffusion, saturable (rate-limited) once all carriers are occupied. Neither requires metabolic energy or moves solute uphill; those properties belong to active transport instead.
## explicit_objective
Contrast simple and facilitated diffusion on carrier-dependence and saturability, while noting both are passive and downhill.
## pitfalls
Assuming that because both are passive, simple and facilitated diffusion behave identically at high concentration. Only the carrier-mediated one (facilitated diffusion) plateaus; simple diffusion has no such ceiling.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
DIS-PHY-T01
## secondary_node_ids
[clear]
## topic
General pharmacology
## subtopic
Membrane transport mechanisms
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Pharmacology > General Pharmacology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p8 | MANS-PPPM
## article_ids
ART-MANS-PPPM-SIMPLE-VS-FACILITATED-DIFFUSION
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.4
## exam_weight_by_year
MANS_Y1=0.4
## clinical_relevance
0.5
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.7
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
Simple diffusion is characterized by which one of the following? [answer: B, not saturable] / Facilitated diffusion is characterized by which one of the following? [answer: C, needs a carrier]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching.
## owner
Claude
## reviewer

## final_publisher

## last_reviewed

## review_due

## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## exclusion_reason

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
secondaryNodeIds: No second reviewed placement identified this pass.
relatedArticleIds: No further-reading article exists yet for this module beyond the one on article_ids.
relatedConceptIds: Left for a relations pass.
resourceOccurrenceIds: Read directly from the source PDF by hand (page render, after pagetext.mjs keys mis-attributed several right-margin key-column answers on this file), not by the extraction pipeline; no corpus occurrence record exists to point at.
sourceCandidateIds: No candidate found.
mint: find-existing.mjs "simple diffusion" / "facilitated diffusion" returned no general transport-classification hit. Minted one concept covering both, since p.8's Q38/Q39 pair directly contrasts them.
atomicClaimIds: No claim record exists yet; this concept/article batch does not include an evidence pass.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: The searches run before minting returned no near-miss to decide against, beyond what sourceCandidateIds already names.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
reviewer: No faculty reviewer has seen this yet.
finalPublisher: Not published — it has not passed the evidence gate.

---

# Item
## label
Naloxone is a competitive opioid antagonist: it shifts morphine's dose-response curve right without lowering the achievable maximum, and produces no effect on its own
## id
CON-FND-A1642B9DC7EEAA
## canonical_key
teaching.pharma.ans.naloxone-competitive-opioid-antagonist
## aliases
Naloxone
Competitive antagonism
Opioid receptor antagonist
## arabic_label

## arabic_aliases
[clear]
## definition
A surmountable rightward shift of an agonist's dose-response curve, one that can still be overcome by giving enough agonist to reach the same maximal effect, combined with the second drug producing no effect alone, is the signature of competitive (surmountable) antagonism. Naloxone shows this pattern with morphine: it competes for the same opioid receptor, has no efficacy of its own, and enough added morphine displaces it and restores full analgesia. A noncompetitive antagonist would instead lower the achievable maximum no matter how much agonist is given.
## explicit_objective
Recognise a surmountable rightward shift with preserved maximal effect and no effect of the second drug alone as the signature of competitive antagonism, using naloxone and morphine as the example.
## pitfalls
Assuming any antagonist that reduces potency (shifts the curve right) is automatically competitive. The distinguishing test is whether the maximum is still reachable with enough agonist (competitive) or is permanently lowered (noncompetitive).
## concept_type
mechanism
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S02
## secondary_node_ids
DIS-PHA
## topic
General pharmacology
## subtopic
Pharmacodynamics — antagonism
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Pharmacology > General Pharmacology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p9 | MANS-PPPM
## article_ids
ART-MANS-PPPM-NALOXONE-COMPETITIVE-ANTAGONIST
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.4
## exam_weight_by_year
MANS_Y1=0.4
## clinical_relevance
0.5
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.7
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
In the presence of naloxone, a higher concentration of morphine is required to elicit full pain relief. Naloxone by itself has no effect. Which of the following is correct regarding these medications? [answer: A, naloxone is a competitive antagonist]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching.
## owner
Claude
## reviewer

## final_publisher

## last_reviewed

## review_due

## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## exclusion_reason

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
secondaryNodeIds: No second reviewed placement identified this pass.
relatedArticleIds: No further-reading article exists yet for this module beyond the one on article_ids.
relatedConceptIds: Left for a relations pass.
resourceOccurrenceIds: Read directly from the source PDF by hand (page render, after pagetext.mjs keys mis-attributed several right-margin key-column answers on this file), not by the extraction pipeline; no corpus occurrence record exists to point at.
sourceCandidateIds: No candidate found.
mint: find-existing.mjs "competitive antagonist" / "naloxone" returned no hit for this vignette-style reasoning concept. Minted new.
atomicClaimIds: No claim record exists yet; this concept/article batch does not include an evidence pass.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: The searches run before minting returned no near-miss to decide against, beyond what sourceCandidateIds already names.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
reviewer: No faculty reviewer has seen this yet.
finalPublisher: Not published — it has not passed the evidence gate.

---

# Item
## label
A bactericidal effect kills bacteria outright; a bacteriostatic effect only inhibits their growth, leaving the host immune system to clear the still-viable organisms
## id
CON-FND-B6E1328A8D39B5
## canonical_key
teaching.pharma.micro.bactericidal-vs-bacteriostatic
## aliases
Bactericidal
Bacteriostatic
## arabic_label

## arabic_aliases
[clear]
## definition
A bactericidal effect is the actual killing (destruction) of bacterial cells. A bacteriostatic effect instead only inhibits bacterial growth and reproduction without killing the organism, relying on the host's immune system to clear the still-viable bacteria. This distinction matters clinically because bactericidal drugs are generally preferred in immunocompromised patients or in infections such as endocarditis, where a fully functioning immune system cannot be relied on to finish the job.
## explicit_objective
Define a bactericidal effect as actual bacterial killing, distinguishing it from bacteriostatic growth inhibition, and state why the distinction matters clinically.
## pitfalls
Treating 'inhibits bacterial growth' and 'kills bacteria' as interchangeable descriptions of any antimicrobial action. Only the killing description is bactericidal; growth inhibition alone is bacteriostatic.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S02
## secondary_node_ids
DIS-PHA
## topic
Antimicrobial pharmacology
## subtopic
Principles of antimicrobial action
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Pharmacology > Antimicrobial Pharmacology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p9 | MANS-PPPM
## article_ids
ART-MANS-PPPM-BACTERICIDAL-EFFECT
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.4
## exam_weight_by_year
MANS_Y1=0.4
## clinical_relevance
0.5
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.7
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
Bactericidal effect is: A) Inhibition of protein synthesis in small dose B) Inhibition of young bacterial cell growth C) Destroying of bacterial cells D) Formation of bacterial L-form E) Inhibition of some bacterial metabolism [answer: C]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching.
## owner
Claude
## reviewer

## final_publisher

## last_reviewed

## review_due

## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## exclusion_reason

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
secondaryNodeIds: No second reviewed placement identified this pass.
relatedArticleIds: No further-reading article exists yet for this module beyond the one on article_ids.
relatedConceptIds: Left for a relations pass.
resourceOccurrenceIds: Read directly from the source PDF by hand (page render, after pagetext.mjs keys mis-attributed several right-margin key-column answers on this file), not by the extraction pipeline; no corpus occurrence record exists to point at.
sourceCandidateIds: No candidate found.
mint: find-existing.mjs "bactericidal" / "bacteriostatic" returned no hit — no general antimicrobial-principles concept exists yet in the corpus. Minted new, the first of this cluster's antimicrobial pharmacology sub-set.
atomicClaimIds: No claim record exists yet; this concept/article batch does not include an evidence pass.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: The searches run before minting returned no near-miss to decide against, beyond what sourceCandidateIds already names.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
reviewer: No faculty reviewer has seen this yet.
finalPublisher: Not published — it has not passed the evidence gate.

---

# Item
## label
Blocking beta-2 receptors removes bronchodilator tone and can precipitate bronchospasm, making asthmatics the group most at risk from beta-2 blockade
## id
CON-FND-96569DB3A5E504
## canonical_key
teaching.pharma.ans.nonselective-beta-blocker-asthma-risk
## aliases
Beta blocker asthma risk
Beta-2 blockade bronchospasm
## arabic_label

## arabic_aliases
[clear]
## definition
Beta-2 receptors on bronchial smooth muscle mediate bronchodilation. Blocking them, whether with a non-selective beta blocker or a beta-2-specific antagonist, removes that relaxing tone and can precipitate severe, potentially life-threatening bronchospasm in a susceptible airway. Because of this receptor-based vulnerability, asthmatic patients are the group most at risk from beta-2 blockade, distinct from the beta-1-mediated risks (such as masked hypoglycaemia symptoms) that non-selective beta blockade poses to other patient groups such as diabetics.
## explicit_objective
State that beta-2 blockade risks precipitating bronchospasm in asthmatic patients by removing bronchodilator tone.
## pitfalls
Treating all beta-blocker risk groups as interchangeable. Asthmatics are specifically at risk from the beta-2 component (bronchospasm); other groups, such as diabetics, are at risk from the beta-1 component (masked hypoglycaemia symptoms) instead.
## concept_type
mechanism
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S02
## secondary_node_ids
DIS-PHA
## topic
General pharmacology
## subtopic
Autonomic nervous system pharmacology — beta blockers
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Pharmacology > General Pharmacology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p9 | MANS-PPPM
## article_ids
ART-MANS-PPPM-NONSELECTIVE-BETABLOCKER-ASTHMA
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.4
## exam_weight_by_year
MANS_Y1=0.4
## clinical_relevance
0.5
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.7
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
Which group of patients is mostly at risk for adverse effect of β2-blockers? A) Asthmatics B) Patients with congestive heart failure C) Traumatic patients D) Diabetics E) Patients with deep vein thrombosis (DVTs) [answer: A]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching.
## owner
Claude
## reviewer

## final_publisher

## last_reviewed

## review_due

## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## exclusion_reason

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
secondaryNodeIds: No second reviewed placement identified this pass.
relatedArticleIds: No further-reading article exists yet for this module beyond the one on article_ids.
relatedConceptIds: Left for a relations pass.
resourceOccurrenceIds: Read directly from the source PDF by hand (page render, after pagetext.mjs keys mis-attributed several right-margin key-column answers on this file), not by the extraction pipeline; no corpus occurrence record exists to point at.
sourceCandidateIds: No true-duplicate candidate found; lane 1's salbutamol concept (CON-FND-A541306EE97575) states the same fact only as a distractor explanation, not as its own teaching grain, so not reused.
mint: find-existing.mjs "beta blocker asthma bronchospasm" returned no hit for a dedicated concept, though the risk is implicit in lane 1's salbutamol distractor text. Minted new.
atomicClaimIds: No claim record exists yet; this concept/article batch does not include an evidence pass.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: The searches run before minting returned no near-miss to decide against, beyond what sourceCandidateIds already names.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
reviewer: No faculty reviewer has seen this yet.
finalPublisher: Not published — it has not passed the evidence gate.

---

# Item
## label
Low-dose aspirin irreversibly inhibits platelet cyclooxygenase-1, blocking thromboxane A2 for the platelet's lifespan, and is used prophylactically against arterial thrombotic disorders
## id
CON-FND-CDF3688554D00A
## canonical_key
teaching.pharma.antiplatelet.aspirin-low-dose-prophylaxis
## aliases
Aspirin antiplatelet effect
Low-dose aspirin prophylaxis
## arabic_label

## arabic_aliases
[clear]
## definition
At low dose, aspirin irreversibly inhibits platelet cyclooxygenase-1, blocking thromboxane A2 synthesis for the entire remaining lifespan of that platelet (platelets cannot resynthesise the enzyme, having no nucleus). This antiplatelet effect reduces platelet aggregation, which is why low-dose aspirin is used prophylactically to reduce the risk of arterial thrombotic events such as myocardial infarction and ischaemic stroke in at-risk patients.
## explicit_objective
State that low-dose aspirin is used prophylactically against arterial thrombotic disorders via irreversible platelet cyclooxygenase inhibition.
## pitfalls
Confusing aspirin's low-dose antiplatelet use with its higher-dose anti-inflammatory/analgesic use, or forgetting that aspirin (an NSAID) is itself a cause, not a treatment, of peptic ulcers.
## concept_type
mechanism
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S02
## secondary_node_ids
DIS-PHA
## topic
General pharmacology
## subtopic
Antiplatelet pharmacology
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Pharmacology > General Pharmacology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p9 | MANS-PPPM
## article_ids
ART-MANS-PPPM-ASPIRIN-ANTIPLATELET-PROPHYLAXIS
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.4
## exam_weight_by_year
MANS_Y1=0.4
## clinical_relevance
0.5
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.7
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
Aspirin could be used prophylactically in: A) Pulmonary edema B) Heart failure C) Peptic ulcers D) Thrombotic disorders E) Metabolic acidosis [answer: D]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching.
## owner
Claude
## reviewer

## final_publisher

## last_reviewed

## review_due

## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## exclusion_reason

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
secondaryNodeIds: No second reviewed placement identified this pass.
relatedArticleIds: No further-reading article exists yet for this module beyond the one on article_ids.
relatedConceptIds: Left for a relations pass.
resourceOccurrenceIds: Read directly from the source PDF by hand (page render, after pagetext.mjs keys mis-attributed several right-margin key-column answers on this file), not by the extraction pipeline; no corpus occurrence record exists to point at.
sourceCandidateIds: No candidate found.
mint: find-existing.mjs "aspirin" / "antiplatelet prophylaxis" returned no hit. Minted new.
atomicClaimIds: No claim record exists yet; this concept/article batch does not include an evidence pass.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: The searches run before minting returned no near-miss to decide against, beyond what sourceCandidateIds already names.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
reviewer: No faculty reviewer has seen this yet.
finalPublisher: Not published — it has not passed the evidence gate.

---

# Item
## label
Biotransformation generally makes a drug more polar, which speeds its urinary excretion rather than slowing it
## id
CON-FND-C26B076414DDB9
## canonical_key
teaching.pharma.pk.biotransformation-increases-excretion
## aliases
Biotransformation
Drug metabolism polarity
## arabic_label

## arabic_aliases
[clear]
## definition
Biotransformation (drug metabolism) generally converts a lipophilic drug into a more polar, water-soluble metabolite, most often through phase I oxidation followed by phase II conjugation. This increased polarity makes the metabolite harder to reabsorb across the lipid renal tubular membrane, so it is excreted in the urine faster than the more lipophilic parent drug would have been.
## explicit_objective
State that biotransformation generally increases a drug's polarity, speeding its urinary excretion.
## pitfalls
Assuming biotransformation always increases lipophilicity or tissue binding. As a general rule it moves the opposite direction, toward greater polarity and faster elimination, even though specific reactions vary.
## concept_type
mechanism
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S01
## secondary_node_ids
DIS-PHA
## topic
General pharmacology
## subtopic
Pharmacokinetics — metabolism and excretion
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Pharmacology > General Pharmacology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p9 | MANS-PPPM
## article_ids
ART-MANS-PPPM-BIOTRANSFORMATION-EXCRETION
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.4
## exam_weight_by_year
MANS_Y1=0.4
## clinical_relevance
0.5
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.7
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
Biotransformation of a medicinal substance results in: A) Faster urinary excretion B) Slower urinary excretion C) Easier distribution in organism D) Higher binding to membranes E) Higher efficacy. [answer: A]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching.
## owner
Claude
## reviewer

## final_publisher

## last_reviewed

## review_due

## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## exclusion_reason

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
secondaryNodeIds: No second reviewed placement identified this pass.
relatedArticleIds: No further-reading article exists yet for this module beyond the one on article_ids.
relatedConceptIds: Left for a relations pass.
resourceOccurrenceIds: Read directly from the source PDF by hand (page render, after pagetext.mjs keys mis-attributed several right-margin key-column answers on this file), not by the extraction pipeline; no corpus occurrence record exists to point at.
sourceCandidateIds: No candidate found.
mint: find-existing.mjs "biotransformation" returned no general-principle hit. Minted new.
atomicClaimIds: No claim record exists yet; this concept/article batch does not include an evidence pass.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: The searches run before minting returned no near-miss to decide against, beyond what sourceCandidateIds already names.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
reviewer: No faculty reviewer has seen this yet.
finalPublisher: Not published — it has not passed the evidence gate.

---

# Item
## label
Hypoalbuminemia raises the free (active) fraction of a highly protein-bound drug at a normal dose, risking a greater-than-normal, possibly toxic response
## id
CON-FND-C588154AB2DBF9
## canonical_key
teaching.pharma.pk.hypoalbuminemia-free-drug-fraction
## aliases
Hypoalbuminemia
Free drug fraction
Plasma protein binding
## arabic_label

## arabic_aliases
[clear]
## definition
Only the free (unbound) fraction of a drug is pharmacologically active. With severe hypoalbuminemia, less albumin is available to bind a highly protein-bound drug, so a larger fraction of the same therapeutic dose stays free and active, producing a greater-than-normal, potentially toxic response even though total (bound plus free) drug concentration may look unchanged on a standard assay. Because free drug is also more available to metabolising enzymes and excretory organs, it is often cleared faster too, so the exaggerated peak effect need not come with a longer overall duration.
## explicit_objective
Explain why hypoalbuminemia raises the free (active) fraction of a highly protein-bound drug and can produce a greater, possibly toxic, response at a normal dose.
## pitfalls
Assuming a change in protein binding changes a drug's mechanism or produces a qualitatively different effect. It changes only the magnitude of the usual effect, via the free fraction, not the kind of effect produced.
## concept_type
mechanism
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S01
## secondary_node_ids
DIS-PHA
## topic
General pharmacology
## subtopic
Pharmacokinetics — plasma protein binding
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Pharmacology > General Pharmacology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p10 | MANS-PPPM
## article_ids
ART-MANS-PPPM-HYPOALBUMINEMIA-FREE-DRUG
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.4
## exam_weight_by_year
MANS_Y1=0.4
## clinical_relevance
0.5
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.7
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
The drug X is extensively bound to plasma protein. If you give the therapeutic dose of it to a person with severe hypoalbuminemia, which one of the following effects would you expect to occur? [answer: A, a greater than normal (possibly toxic) response]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching.
## owner
Claude
## reviewer

## final_publisher

## last_reviewed

## review_due

## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## exclusion_reason

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
secondaryNodeIds: No second reviewed placement identified this pass.
relatedArticleIds: No further-reading article exists yet for this module beyond the one on article_ids.
relatedConceptIds: Left for a relations pass.
resourceOccurrenceIds: Read directly from the source PDF by hand (page render, after pagetext.mjs keys mis-attributed several right-margin key-column answers on this file), not by the extraction pipeline; no corpus occurrence record exists to point at.
sourceCandidateIds: No candidate found.
mint: find-existing.mjs "plasma protein binding" / "hypoalbuminemia" returned no hit. Minted new.
atomicClaimIds: No claim record exists yet; this concept/article batch does not include an evidence pass.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: The searches run before minting returned no near-miss to decide against, beyond what sourceCandidateIds already names.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
reviewer: No faculty reviewer has seen this yet.
finalPublisher: Not published — it has not passed the evidence gate.

---

# Item
## label
Prazosin's characteristic side effect is first-dose hypotension from sudden alpha-1 blockade, blunted by starting at a low bedtime dose
## id
CON-FND-C4E44DC611F1D5
## canonical_key
teaching.pharma.ans.prazosin-first-dose-hypotension
## aliases
Prazosin
First-dose hypotension
Alpha-1 blocker side effect
## arabic_label

## arabic_aliases
[clear]
## definition
Prazosin is a selective, competitive alpha-1 adrenergic blocker. Its characteristic side effect is first-dose hypotension: with the first dose or a dose increase, sudden marked alpha-1 blockade can produce profound orthostatic hypotension and syncope, which is why therapy is classically started at a low bedtime dose. Because prazosin spares presynaptic alpha-2 receptors (which continue providing negative feedback on noradrenaline release), it causes comparatively little reflex tachycardia compared with non-selective alpha blockers such as phenoxybenzamine.
## explicit_objective
State that prazosin's characteristic side effect is first-dose hypotension, and explain why selective alpha-1 blockade causes less reflex tachycardia than non-selective alpha blockade.
## pitfalls
Assuming all alpha blockers share the same reflex-tachycardia risk. Selective alpha-1 blockers like prazosin spare the alpha-2 autoreceptor feedback loop, unlike non-selective agents.
## concept_type
clinical_feature
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S02
## secondary_node_ids
DIS-PHA
## topic
General pharmacology
## subtopic
Autonomic nervous system pharmacology — alpha blockers
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Pharmacology > General Pharmacology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p10 | MANS-PPPM
## article_ids
ART-MANS-PPPM-PRAZOSIN-FIRST-DOSE-HYPOTENSION
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.4
## exam_weight_by_year
MANS_Y1=0.4
## clinical_relevance
0.5
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.7
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
Which of the following is a side effect of prazosin? A) Urine retention B) First-dose hypotension C) Depression D) Reflex tachycardia E) Miosis [answer: B]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching.
## owner
Claude
## reviewer

## final_publisher

## last_reviewed

## review_due

## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## exclusion_reason

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
secondaryNodeIds: No second reviewed placement identified this pass.
relatedArticleIds: No further-reading article exists yet for this module beyond the one on article_ids.
relatedConceptIds: Left for a relations pass.
resourceOccurrenceIds: Read directly from the source PDF by hand (page render, after pagetext.mjs keys mis-attributed several right-margin key-column answers on this file), not by the extraction pipeline; no corpus occurrence record exists to point at.
sourceCandidateIds: No candidate found.
mint: find-existing.mjs "prazosin" returned no dedicated side-effect concept. Minted new.
atomicClaimIds: No claim record exists yet; this concept/article batch does not include an evidence pass.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: The searches run before minting returned no near-miss to decide against, beyond what sourceCandidateIds already names.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
reviewer: No faculty reviewer has seen this yet.
finalPublisher: Not published — it has not passed the evidence gate.

---

# Item
## label
Alpha-methyldopa can trigger drug-induced autoimmune hemolytic anemia by inducing red-cell autoantibodies, a positive-Coombs reaction distinct from oxidative hemolysis
## id
CON-FND-CEC5290062E9FE
## canonical_key
teaching.pharma.adr.methyldopa-autoimmune-hemolytic-anemia
## aliases
Methyldopa
Drug-induced hemolytic anemia
Positive Coombs test
## arabic_label

## arabic_aliases
[clear]
## definition
Alpha-methyldopa is a recognised cause of drug-induced autoimmune hemolytic anemia: with long-term therapy it can trigger production of autoantibodies against the patient's own red cell membrane proteins, giving a positive direct Coombs test in a substantial fraction of patients, with overt hemolysis in a smaller subset. This is a distinct, antibody-mediated mechanism from oxidant drug-induced hemolysis in G6PD deficiency, which instead damages the red cell directly through oxidative stress.
## explicit_objective
Identify alpha-methyldopa as a cause of drug-induced autoimmune hemolytic anemia through red-cell autoantibody formation, distinguishing it from oxidant-mediated hemolysis.
## pitfalls
Lumping every drug-associated hemolysis together as one mechanism. Autoimmune (antibody-mediated, as with methyldopa) and oxidant-mediated (as with G6PD-deficiency triggers) hemolysis are mechanistically distinct.
## concept_type
clinical_feature
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S02
## secondary_node_ids
DIS-PHA
## topic
General pharmacology
## subtopic
Adverse drug reactions
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Pharmacology > General Pharmacology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p10 | MANS-PPPM
## article_ids
ART-MANS-PPPM-METHYLDOPA-HEMOLYTIC-ANEMIA
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.4
## exam_weight_by_year
MANS_Y1=0.4
## clinical_relevance
0.5
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.7
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
Which of the following drugs may cause autoimmune hemolytic anemia? A) Phenoxybenzamine B) Alpha methyl dopa C) Yohimbine D) Tamsulosin E) Propranolol [answer: B]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching.
## owner
Claude
## reviewer

## final_publisher

## last_reviewed

## review_due

## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## exclusion_reason

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
secondaryNodeIds: No second reviewed placement identified this pass.
relatedArticleIds: No further-reading article exists yet for this module beyond the one on article_ids.
relatedConceptIds: Left for a relations pass.
resourceOccurrenceIds: Read directly from the source PDF by hand (page render, after pagetext.mjs keys mis-attributed several right-margin key-column answers on this file), not by the extraction pipeline; no corpus occurrence record exists to point at.
sourceCandidateIds: No candidate found.
mint: find-existing.mjs "methyldopa" / "autoimmune hemolytic anemia" returned no hit. Minted new.
atomicClaimIds: No claim record exists yet; this concept/article batch does not include an evidence pass.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: The searches run before minting returned no near-miss to decide against, beyond what sourceCandidateIds already names.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
reviewer: No faculty reviewer has seen this yet.
finalPublisher: Not published — it has not passed the evidence gate.

---

# Item
## label
Clonidine lowers blood pressure by stimulating central alpha-2 autoreceptors, reducing sympathetic outflow, despite being an adrenergic agonist rather than a blocker
## id
CON-FND-5BE61A48E5448A
## canonical_key
teaching.pharma.ans.clonidine-central-alpha2-agonist-hypertension
## aliases
Clonidine
Central antihypertensive
Alpha-2 agonist
## arabic_label

## arabic_aliases
[clear]
## definition
Clonidine is a centrally-acting alpha-2 adrenergic agonist. By stimulating alpha-2 autoreceptors in the brainstem's vasomotor centre, it reduces sympathetic outflow from the CNS, lowering peripheral vascular resistance, heart rate and blood pressure. This central sympatholytic action is why clonidine is used as an antihypertensive despite being an adrenergic agonist rather than a blocker, the opposite mechanism class from peripherally-acting antihypertensives such as alpha or beta blockers.
## explicit_objective
Identify clonidine as a centrally-acting alpha-2 agonist used to treat hypertension by reducing central sympathetic outflow.
## pitfalls
Assuming an antihypertensive must be a receptor blocker. Clonidine is an agonist whose central site of action (autoreceptor feedback) produces a net sympatholytic, blood-pressure-lowering effect.
## concept_type
mechanism
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S02
## secondary_node_ids
DIS-PHA
## topic
General pharmacology
## subtopic
Autonomic nervous system pharmacology — adrenergic agonists
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Pharmacology > General Pharmacology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p11 | MANS-PPPM
## article_ids
ART-MANS-PPPM-CLONIDINE-HYPERTENSION
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.4
## exam_weight_by_year
MANS_Y1=0.4
## clinical_relevance
0.5
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.7
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
Which of the following adrenergic drugs can be used in treatment of hypertension? A) Clonidine B) Dopamine C) Isoprenaline D) Phenylephrine E) Terbutaline [answer: A]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching.
## owner
Claude
## reviewer

## final_publisher

## last_reviewed

## review_due

## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## exclusion_reason

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
secondaryNodeIds: No second reviewed placement identified this pass.
relatedArticleIds: No further-reading article exists yet for this module beyond the one on article_ids.
relatedConceptIds: Left for a relations pass.
resourceOccurrenceIds: Read directly from the source PDF by hand (page render, after pagetext.mjs keys mis-attributed several right-margin key-column answers on this file), not by the extraction pipeline; no corpus occurrence record exists to point at.
sourceCandidateIds: No candidate found.
mint: find-existing.mjs "clonidine" / "alpha2 agonist hypertension" returned no hit. Minted new.
atomicClaimIds: No claim record exists yet; this concept/article batch does not include an evidence pass.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: The searches run before minting returned no near-miss to decide against, beyond what sourceCandidateIds already names.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
reviewer: No faculty reviewer has seen this yet.
finalPublisher: Not published — it has not passed the evidence gate.

---

# Item
## label
Dobutamine's beta-1 selective inotropic action, with little chronotropic or vasoconstrictive effect, makes it suited to supporting cardiac output in cardiogenic shock
## id
CON-FND-97977A52196BB1
## canonical_key
teaching.pharma.ans.dobutamine-cardiogenic-shock
## aliases
Dobutamine
Cardiogenic shock inotrope
## arabic_label

## arabic_aliases
[clear]
## definition
Dobutamine is a beta-1 selective adrenergic agonist with predominantly inotropic (contractility-increasing) action and relatively little chronotropic or vasoconstrictive effect. This profile suits cardiogenic shock, where the goal is to increase cardiac output and myocardial contractility without adding excessive peripheral vasoconstriction (which would raise afterload on an already-failing heart) or heart rate.
## explicit_objective
Identify dobutamine as the beta-1 selective inotrope used to support cardiac output in cardiogenic shock.
## pitfalls
Confusing dobutamine's inotropic role with a pure vasoconstrictor's blood-pressure-raising role. A pure alpha-1 agonist like phenylephrine raises pressure without helping (and can worsen) a failing heart's own contractility and afterload.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S02
## secondary_node_ids
DIS-PHA
## topic
General pharmacology
## subtopic
Autonomic nervous system pharmacology — adrenergic agonists
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Pharmacology > General Pharmacology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p11 | MANS-PPPM
## article_ids
ART-MANS-PPPM-DOBUTAMINE-CARDIOGENIC-SHOCK
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.4
## exam_weight_by_year
MANS_Y1=0.4
## clinical_relevance
0.5
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.7
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
Which of the following adrenergic drugs can be used in cardiogenic shock? A) Clonidine B) Tizanidine C) Dobutamine D) Salbutamol. E) Phenylephrine [answer: C]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching.
## owner
Claude
## reviewer

## final_publisher

## last_reviewed

## review_due

## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## exclusion_reason

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
secondaryNodeIds: No second reviewed placement identified this pass.
relatedArticleIds: No further-reading article exists yet for this module beyond the one on article_ids.
relatedConceptIds: Left for a relations pass.
resourceOccurrenceIds: Read directly from the source PDF by hand (page render, after pagetext.mjs keys mis-attributed several right-margin key-column answers on this file), not by the extraction pipeline; no corpus occurrence record exists to point at.
sourceCandidateIds: No candidate found.
mint: find-existing.mjs "dobutamine" / "cardiogenic shock" returned no hit. Minted new.
atomicClaimIds: No claim record exists yet; this concept/article batch does not include an evidence pass.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: The searches run before minting returned no near-miss to decide against, beyond what sourceCandidateIds already names.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
reviewer: No faculty reviewer has seen this yet.
finalPublisher: Not published — it has not passed the evidence gate.

---

# Item
## label
G6PD deficiency leaves red cells unable to regenerate enough reduced glutathione to withstand oxidant drugs such as nitrates, precipitating acute hemolysis
## id
CON-HEM-C9BB0764431B36
## canonical_key
teaching.pharma.hem.g6pd-drug-induced-hemolysis-nitrates
## aliases
G6PD deficiency
Oxidant drug hemolysis
Nitrate-induced hemolysis
## arabic_label

## arabic_aliases
[clear]
## definition
Oxidising drugs such as nitrates place oxidative stress on the red blood cell, which normally neutralises reactive oxygen species using NADPH generated by the glucose-6-phosphate dehydrogenase (G6PD) pathway. In G6PD deficiency, red cells cannot regenerate enough reduced glutathione to withstand this oxidative stress, so oxidant drugs, including nitrates as well as certain antimalarials and sulfonamides, can precipitate acute hemolysis.
## explicit_objective
Explain that G6PD deficiency predisposes red cells to oxidant drug-induced hemolysis, using nitrate therapy as an example trigger.
## pitfalls
Treating G6PD-related hemolysis as a general drug-toxicity phenomenon rather than a specific enzyme-deficiency vulnerability to oxidant stress, which is why only oxidising drugs (not drugs in general) trigger it.
## concept_type
mechanism
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S02
## secondary_node_ids
SYS-HEM
## topic
General pharmacology
## subtopic
Pharmacogenetics — oxidant drug-induced hemolysis
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Pharmacology > General Pharmacology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p11 | MANS-PPPM
## article_ids
ART-MANS-PPPM-G6PD-NITRATES-HEMOLYSIS
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.4
## exam_weight_by_year
MANS_Y1=0.4
## clinical_relevance
0.5
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.7
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
Hemolysis that may occur with nitrates therapy may be due which one of these conditions? A) Pseudocholinesterase deficiency B) Thiopurine methyltransferase deficiency C) Glucose 6 Phosphate Dehydrogenase deficiency D) Vitamin K epoxide reductase deficiency E) Monoamine oxidase [answer: C]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching.
## owner
Claude
## reviewer

## final_publisher

## last_reviewed

## review_due

## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## exclusion_reason

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
secondaryNodeIds: No second reviewed placement identified this pass.
relatedArticleIds: No further-reading article exists yet for this module beyond the one on article_ids.
relatedConceptIds: Left for a relations pass.
resourceOccurrenceIds: Read directly from the source PDF by hand (page render, after pagetext.mjs keys mis-attributed several right-margin key-column answers on this file), not by the extraction pipeline; no corpus occurrence record exists to point at.
sourceCandidateIds: docs/Kasr-Source-Imports/question/103-BMS-MCQ-carbohydrate-bioenergetics.md tests G6PD deficiency's effect on the glutathione system generally, a biochemistry-angle question, not this pharmacology drug-trigger angle — not a duplicate.
mint: find-existing.mjs "G6PD deficiency hemolysis drugs" returned no dedicated pharmacology-angle hit (a separate G6PD biochemistry MCQ exists on an unrelated fact). Minted new under a haematology system code since the mechanism is a red-cell enzyme deficiency, though taught here in the pharmacology module context.
atomicClaimIds: No claim record exists yet; this concept/article batch does not include an evidence pass.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: The searches run before minting returned no near-miss to decide against, beyond what sourceCandidateIds already names.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
reviewer: No faculty reviewer has seen this yet.
finalPublisher: Not published — it has not passed the evidence gate.

---

# Item
## label
Carvedilol blocks beta-1, beta-2 and alpha-1 receptors; its added alpha-1 blockade gives it vasodilator action that plain beta blockers such as atenolol or propranolol lack
## id
CON-FND-19C7A359DA4F69
## canonical_key
teaching.pharma.ans.carvedilol-combined-alpha-beta-blocker
## aliases
Carvedilol
Vasodilating beta blocker
## arabic_label

## arabic_aliases
[clear]
## definition
Carvedilol blocks beta-1, beta-2 and alpha-1 adrenergic receptors. The added alpha-1 blockade produces peripheral vasodilation on top of the beta-blocking effect, which is why carvedilol is classed as a beta blocker with additional vasodilator action, distinct from plain beta-1 selective blockers (atenolol, metoprolol) and plain non-selective beta blockers (propranolol), and used in heart failure, where reducing afterload alongside beta blockade is beneficial.
## explicit_objective
Identify carvedilol as a combined alpha-1/beta blocker whose added alpha-1 blockade gives it vasodilator action beyond plain beta blockade.
## pitfalls
Assuming all beta blockers act identically on vascular tone. Only agents with an added alpha-1-blocking (carvedilol, labetalol) or intrinsic sympathomimetic (pindolol) property differ from plain beta blockade.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S02
## secondary_node_ids
DIS-PHA
## topic
General pharmacology
## subtopic
Autonomic nervous system pharmacology — beta blockers
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Pharmacology > General Pharmacology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p11 | MANS-PPPM
## article_ids
ART-MANS-PPPM-CARVEDILOL-VASODILATOR-BETABLOCKER
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.4
## exam_weight_by_year
MANS_Y1=0.4
## clinical_relevance
0.5
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.7
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
Which of the following drugs is a beta blocker with additional vasodilator action? A) Carvedilol B) Atenolol C) Metoprolol D) Propranolol E) Pindolol [answer: A]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching.
## owner
Claude
## reviewer

## final_publisher

## last_reviewed

## review_due

## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## exclusion_reason

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
secondaryNodeIds: No second reviewed placement identified this pass.
relatedArticleIds: No further-reading article exists yet for this module beyond the one on article_ids.
relatedConceptIds: Left for a relations pass.
resourceOccurrenceIds: Read directly from the source PDF by hand (page render, after pagetext.mjs keys mis-attributed several right-margin key-column answers on this file), not by the extraction pipeline; no corpus occurrence record exists to point at.
sourceCandidateIds: No candidate found.
mint: find-existing.mjs "carvedilol" returned no hit. Minted new.
atomicClaimIds: No claim record exists yet; this concept/article batch does not include an evidence pass.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: The searches run before minting returned no near-miss to decide against, beyond what sourceCandidateIds already names.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
reviewer: No faculty reviewer has seen this yet.
finalPublisher: Not published — it has not passed the evidence gate.

---

# Item
## label
Vagal (parasympathetic) stimulation increases gastric and pancreatic secretion and gut motility, while slowing the heart and constricting the bronchi
## id
CON-FND-780A2AF04BC573
## canonical_key
teaching.pharma.ans.vagal-stimulation-gi-secretomotor
## aliases
Vagal stimulation
Parasympathetic secretomotor effects
## arabic_label

## arabic_aliases
[clear]
## definition
The vagus nerve supplies parasympathetic secretomotor fibres to the stomach and pancreas: vagal stimulation increases gastric acid and pepsinogen secretion (partly directly, partly via gastrin release) and stimulates pancreatic exocrine (enzyme and bicarbonate) secretion, part of the cephalic and gastric phases of digestion. The same vagal (parasympathetic) stimulation also increases gastrointestinal smooth muscle motility, while slowing the heart (bradycardia via muscarinic M2 receptors) and constricting the bronchi, the opposite effector pattern from sympathetic stimulation at each site.
## explicit_objective
State that vagal (parasympathetic) stimulation increases gastric and pancreatic secretion and gut motility while slowing the heart and constricting bronchi.
## pitfalls
Assuming parasympathetic effects are uniformly "quiet" at every organ. At the gut the parasympathetic effect is to increase activity (secretion, motility); at the heart and bronchi it slows or constricts — the direction depends on the specific effector organ, not a single blanket rule.
## concept_type
mechanism
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S02
## secondary_node_ids
DIS-PHA
## topic
General pharmacology
## subtopic
Autonomic nervous system pharmacology — parasympathetic effector effects
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Pharmacology > General Pharmacology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p13 | MANS-PPPM
## article_ids
ART-MANS-PPPM-VAGAL-STIMULATION-GI
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.4
## exam_weight_by_year
MANS_Y1=0.4
## clinical_relevance
0.5
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.7
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
Vagal stimulation causes which of the following? A) Dilatation of the bronchi and bronchioles. B) Increase in gastric and pancreatic secretion. C) Inhibition of intestinal secretions. D) Inhibition of smooth muscles in stomach and small intestine. E) Tachycardia. [answer: B]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching.
## owner
Claude
## reviewer

## final_publisher

## last_reviewed

## review_due

## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## exclusion_reason

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
secondaryNodeIds: No second reviewed placement identified this pass.
relatedArticleIds: No further-reading article exists yet for this module beyond the one on article_ids.
relatedConceptIds: Left for a relations pass.
resourceOccurrenceIds: Read directly from the source PDF by hand (page render, after pagetext.mjs keys mis-attributed several right-margin key-column answers on this file), not by the extraction pipeline; no corpus occurrence record exists to point at.
sourceCandidateIds: No candidate found.
mint: find-existing.mjs "vagal stimulation" / "gastric pancreatic secretion" returned no hit. Minted new.
atomicClaimIds: No claim record exists yet; this concept/article batch does not include an evidence pass.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: The searches run before minting returned no near-miss to decide against, beyond what sourceCandidateIds already names.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
reviewer: No faculty reviewer has seen this yet.
finalPublisher: Not published — it has not passed the evidence gate.

---

# Item
## label
Acetylcholine's synaptic action is terminated mainly by rapid enzymatic hydrolysis (acetylcholinesterase), not by reuptake as with noradrenaline or by diffusion
## id
CON-FND-ACA243ACBB5E3A
## canonical_key
teaching.pharma.ans.acetylcholinesterase-terminates-ach
## aliases
Acetylcholinesterase
Termination of acetylcholine action
## arabic_label

## arabic_aliases
[clear]
## definition
Unlike noradrenaline, whose action is mainly terminated by presynaptic reuptake, acetylcholine's action at cholinergic synapses is terminated mainly by rapid enzymatic hydrolysis. Acetylcholinesterase, present in the synaptic cleft, splits acetylcholine into choline and acetate within milliseconds, ending its receptor binding almost as fast as it began. Simple diffusion away from the cleft is far too slow to account for the very brief duration of acetylcholine's action on its own.
## explicit_objective
State that acetylcholinesterase enzymatic hydrolysis, not reuptake or diffusion, mainly terminates acetylcholine's synaptic action.
## pitfalls
Assuming every neurotransmitter is terminated the same way (reuptake). Acetylcholine is the classic exception, terminated by enzymatic breakdown rather than presynaptic reuptake.
## concept_type
mechanism
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S02
## secondary_node_ids
DIS-PHA
## topic
General pharmacology
## subtopic
Autonomic nervous system pharmacology — cholinergic transmission
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Pharmacology > General Pharmacology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p13 | MANS-PPPM
## article_ids
ART-MANS-PPPM-ACETYLCHOLINESTERASE-TERMINATION
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.4
## exam_weight_by_year
MANS_Y1=0.4
## clinical_relevance
0.5
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.7
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
Termination of acetylcholine action is mainly due to: A) Cholinesterase enzyme in cholinergic synapses. B) Diffusion from synaptic cleft. C) Irreversible combination with cholinergic receptors. D) Reuptake by preganglionic neurons. E) Uptake by postsynaptic cell. [answer: A]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching.
## owner
Claude
## reviewer

## final_publisher

## last_reviewed

## review_due

## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## exclusion_reason

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
secondaryNodeIds: No second reviewed placement identified this pass.
relatedArticleIds: No further-reading article exists yet for this module beyond the one on article_ids.
relatedConceptIds: Left for a relations pass.
resourceOccurrenceIds: Read directly from the source PDF by hand (page render, after pagetext.mjs keys mis-attributed several right-margin key-column answers on this file), not by the extraction pipeline; no corpus occurrence record exists to point at.
sourceCandidateIds: No candidate found.
mint: find-existing.mjs "acetylcholinesterase terminates acetylcholine action" returned no dedicated general-mechanism hit (existing records address specific inhibitor drugs, not this base mechanism). Minted new.
atomicClaimIds: No claim record exists yet; this concept/article batch does not include an evidence pass.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: The searches run before minting returned no near-miss to decide against, beyond what sourceCandidateIds already names.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
reviewer: No faculty reviewer has seen this yet.
finalPublisher: Not published — it has not passed the evidence gate.

---

# Item
## label
Neostigmine (prostigmine), largely excluded from the CNS, is used for chronic symptomatic treatment of myasthenia gravis, distinct from edrophonium's brief diagnostic-only use
## id
CON-FND-22B7EC22FF62F0
## canonical_key
teaching.pharma.ans.neostigmine-chronic-myasthenia-treatment
## aliases
Neostigmine
Prostigmine
Myasthenia gravis treatment
## arabic_label

## arabic_aliases
[clear]
## definition
Neostigmine (prostigmine) is a reversible cholinesterase inhibitor whose quaternary structure keeps it largely outside the CNS, acting mainly at the peripheral neuromuscular junction, where it raises acetylcholine levels and improves muscle strength. This makes it, along with pyridostigmine, a mainstay of chronic symptomatic myasthenia gravis treatment, distinct from edrophonium's brief use purely to diagnose the condition and from neostigmine's own separate uses reversing neuromuscular blockade and increasing GIT motility.
## explicit_objective
Identify neostigmine (prostigmine) as used in chronic myasthenia gravis treatment, distinguishing its peripheral neuromuscular use from edrophonium's diagnostic-only role.
## pitfalls
Treating every cholinesterase-inhibitor use of neostigmine as one fact. It has at least three distinct clinical-use grains: chronic myasthenia gravis treatment, reversal of competitive neuromuscular block, and increasing GIT motility in paralytic ileus, each a separate teaching point.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S02
## secondary_node_ids
DIS-PHA
## topic
General pharmacology
## subtopic
Autonomic nervous system pharmacology — cholinesterase inhibitors
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Pharmacology > General Pharmacology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p13 | MANS-PPPM
## article_ids
ART-MANS-PPPM-NEOSTIGMINE-MYASTHENIA-TREATMENT
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.4
## exam_weight_by_year
MANS_Y1=0.4
## clinical_relevance
0.5
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.7
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
Which of the following is used in treatment of myasthenia gravis? A) Adrenaline. B) Atropine. C) Curare. D) Eserine. E) Prostigmine. [answer: E]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching.
## owner
Claude
## reviewer

## final_publisher

## last_reviewed

## review_due

## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## exclusion_reason

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
secondaryNodeIds: No second reviewed placement identified this pass.
relatedArticleIds: No further-reading article exists yet for this module beyond the one on article_ids.
relatedConceptIds: Left for a relations pass.
resourceOccurrenceIds: Read directly from the source PDF by hand (page render, after pagetext.mjs keys mis-attributed several right-margin key-column answers on this file), not by the extraction pipeline; no corpus occurrence record exists to point at.
sourceCandidateIds: CON-FND-ECECFC8B855144 (this lane's own GIT-motility concept) and Kasr 208-INT's NMJ-block-reversal concept are related but distinct clinical-use facts about the same drug, not duplicates of this chronic-treatment grain.
mint: find-existing.mjs "neostigmine" surfaced this lane's own GIT-motility concept and Kasr's NMJ-block-reversal concept, but no concept for neostigmine's chronic myasthenia gravis treatment use. Minted new, a third distinct neostigmine clinical-use grain.
atomicClaimIds: No claim record exists yet; this concept/article batch does not include an evidence pass.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: The searches run before minting returned no near-miss to decide against, beyond what sourceCandidateIds already names.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
reviewer: No faculty reviewer has seen this yet.
finalPublisher: Not published — it has not passed the evidence gate.

---

# Item
## label
Epinephrine's beta-1 receptor action on cardiac myocytes increases the strength of myocardial contraction, a beta- (not alpha-) mediated effect
## id
CON-FND-B829A049074ED0
## canonical_key
teaching.pharma.ans.epinephrine-beta1-myocardial-contractility
## aliases
Epinephrine beta-1 effect
Positive inotropy
## arabic_label

## arabic_aliases
[clear]
## definition
Cardiac beta-1 adrenergic receptors mediate a positive inotropic effect. Epinephrine binding beta-1 receptors on cardiac myocytes raises intracellular cAMP, which increases calcium influx and increases the strength (and rate) of myocardial contraction. This is a classic beta-receptor-mediated action of epinephrine, distinct from its alpha-1-mediated actions such as piloerection, pupillary dilatation and skin/splanchnic vasoconstriction.
## explicit_objective
Identify increased myocardial contractile force as a beta-1-mediated action of epinephrine, distinguishing it from alpha-1-mediated effects.
## pitfalls
Sorting epinephrine's many physiological effects by organ instead of by receptor subtype. The same organ (the eye, say) can show alpha-1 (mydriasis) and beta (ciliary relaxation) effects side by side.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S02
## secondary_node_ids
DIS-PHA
## topic
General pharmacology
## subtopic
Autonomic nervous system pharmacology — adrenergic receptor effects
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Pharmacology > General Pharmacology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p13 | MANS-PPPM
## article_ids
ART-MANS-PPPM-EPINEPHRINE-BETA1-CONTRACTILITY
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.4
## exam_weight_by_year
MANS_Y1=0.4
## clinical_relevance
0.5
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.7
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
Which of the following is a physiological action of epinephrine produced by contact with the beta adrenergic receptors? A) Contraction of the erector pilli muscles. B) Dilatation of the pupil. C) Increased strength of myocardial contraction. D) Intestinal and pupil contraction. E) Vasoconstriction in skeletal muscles. [answer: C]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching.
## owner
Claude
## reviewer

## final_publisher

## last_reviewed

## review_due

## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## exclusion_reason

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
secondaryNodeIds: No second reviewed placement identified this pass.
relatedArticleIds: No further-reading article exists yet for this module beyond the one on article_ids.
relatedConceptIds: Left for a relations pass.
resourceOccurrenceIds: Read directly from the source PDF by hand (page render, after pagetext.mjs keys mis-attributed several right-margin key-column answers on this file), not by the extraction pipeline; no corpus occurrence record exists to point at.
sourceCandidateIds: No candidate found.
mint: find-existing.mjs "epinephrine beta1 myocardial contractility" returned no hit. Minted new.
atomicClaimIds: No claim record exists yet; this concept/article batch does not include an evidence pass.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: The searches run before minting returned no near-miss to decide against, beyond what sourceCandidateIds already names.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
reviewer: No faculty reviewer has seen this yet.
finalPublisher: Not published — it has not passed the evidence gate.

---

# Item
## label
Pseudocholinesterase deficiency slows succinylcholine's normal rapid breakdown, prolonging its neuromuscular block and causing post-operative apnea
## id
CON-FND-68256DB47D2012
## canonical_key
teaching.pharma.ans.pseudocholinesterase-deficiency-succinylcholine-apnea
## aliases
Pseudocholinesterase deficiency
Succinylcholine apnea
Butyrylcholinesterase deficiency
## arabic_label

## arabic_aliases
[clear]
## definition
Succinylcholine, a depolarising neuromuscular blocker used for rapid intubation, is normally broken down quickly by plasma pseudocholinesterase (butyrylcholinesterase). In patients with a genetic pseudocholinesterase deficiency, succinylcholine is metabolised much more slowly, so its neuromuscular blockade, and the resulting inability to breathe, persists for a prolonged period after surgery instead of wearing off within minutes.
## explicit_objective
Explain that pseudocholinesterase deficiency prolongs succinylcholine's neuromuscular block, causing post-operative apnea.
## pitfalls
Confusing pseudocholinesterase deficiency (prolongs succinylcholine's action) with G6PD deficiency (predisposes to oxidant drug-induced hemolysis) — both are enzyme deficiencies that alter a drug response, but by unrelated mechanisms.
## concept_type
mechanism
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S01
## secondary_node_ids
DIS-PHA
## topic
General pharmacology
## subtopic
Pharmacogenetics — drug metabolism deficiencies
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Pharmacology > General Pharmacology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p13 | MANS-PPPM
## article_ids
ART-MANS-PPPM-PSEUDOCHOLINESTERASE-DEFICIENCY-APNEA
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.4
## exam_weight_by_year
MANS_Y1=0.4
## clinical_relevance
0.5
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.7
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
Failure of the patient to breath after surgical operation may be due to: A) Vitamin K epoxide reductase deficiency. B) Methemoglobin reductase deficiency. C) Monoamine oxidase deficiency. D) Pseudocholinesterase deficiency. E) T lymphocyte G 6-PD deficiency. [answer: D]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching.
## owner
Claude
## reviewer

## final_publisher

## last_reviewed

## review_due

## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## exclusion_reason

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
secondaryNodeIds: No second reviewed placement identified this pass.
relatedArticleIds: No further-reading article exists yet for this module beyond the one on article_ids.
relatedConceptIds: Left for a relations pass.
resourceOccurrenceIds: Read directly from the source PDF by hand (page render, after pagetext.mjs keys mis-attributed several right-margin key-column answers on this file), not by the extraction pipeline; no corpus occurrence record exists to point at.
sourceCandidateIds: No candidate found.
mint: find-existing.mjs "pseudocholinesterase deficiency succinylcholine apnea" returned no hit. Minted new.
atomicClaimIds: No claim record exists yet; this concept/article batch does not include an evidence pass.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: The searches run before minting returned no near-miss to decide against, beyond what sourceCandidateIds already names.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
reviewer: No faculty reviewer has seen this yet.
finalPublisher: Not published — it has not passed the evidence gate.

---

# Item
## label
Adrenaline is the most abundant catecholamine secreted by the adrenal medulla, roughly 80% of its output, with noradrenaline the minority fraction
## id
CON-FND-EBD3FD47A867B6
## canonical_key
teaching.pharma.ans.adrenaline-adrenal-medulla-signal
## aliases
Adrenal medulla secretion
Adrenaline vs noradrenaline release
## arabic_label

## arabic_aliases
[clear]
## definition
The adrenal medulla's chromaffin cells synthesise and secrete both adrenaline (epinephrine) and noradrenaline (norepinephrine). In humans, roughly 80% of the secretion is adrenaline, making it the most abundant signalling molecule released from the adrenal medulla, with noradrenaline as the smaller remaining fraction. Dopamine is a biosynthetic precursor within the chromaffin cell but is not the predominant molecule ultimately secreted.
## explicit_objective
State that adrenaline is the most abundant catecholamine secreted by the adrenal medulla, with noradrenaline the minority fraction.
## pitfalls
Confusing the transmitter released ONTO the chromaffin cell (acetylcholine, from the preganglionic sympathetic fibre) with the hormone the chromaffin cell itself secretes into the blood (mainly adrenaline).
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S02
## secondary_node_ids
DIS-PHA
## topic
General pharmacology
## subtopic
Autonomic nervous system pharmacology — catecholamine synthesis and release
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Pharmacology > General Pharmacology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p14 | MANS-PPPM
## article_ids
ART-MANS-PPPM-ADRENALINE-ADRENAL-MEDULLA
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.4
## exam_weight_by_year
MANS_Y1=0.4
## clinical_relevance
0.5
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.7
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
....... is the most abundant signaling molecule released from the adrenal medulla? A) Acetylcholine. B) Adrenaline. C) Dopamine. D) Norepinephrine. E) Serotonin. [answer: B]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching.
## owner
Claude
## reviewer

## final_publisher

## last_reviewed

## review_due

## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## exclusion_reason

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
secondaryNodeIds: No second reviewed placement identified this pass.
relatedArticleIds: No further-reading article exists yet for this module beyond the one on article_ids.
relatedConceptIds: Left for a relations pass.
resourceOccurrenceIds: Read directly from the source PDF by hand (page render, after pagetext.mjs keys mis-attributed several right-margin key-column answers on this file), not by the extraction pipeline; no corpus occurrence record exists to point at.
sourceCandidateIds: No candidate found.
mint: find-existing.mjs "adrenaline adrenal medulla" returned no hit. Minted new.
atomicClaimIds: No claim record exists yet; this concept/article batch does not include an evidence pass.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: The searches run before minting returned no near-miss to decide against, beyond what sourceCandidateIds already names.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
reviewer: No faculty reviewer has seen this yet.
finalPublisher: Not published — it has not passed the evidence gate.

---

# Item
## label
Cervical sympathetic stimulation dilates the pupil and relaxes the ciliary muscle, setting the eye up for distance rather than near vision
## id
CON-FND-DFEDD73B3934E6
## canonical_key
teaching.phys.ans.cervical-sympathetic-mydriasis
## aliases
Cervical sympathetic chain
Mydriasis
Eye sympathetic effects
## arabic_label

## arabic_aliases
[clear]
## definition
Sympathetic stimulation of the eye dilates the pupil (mydriasis, via the alpha-1-mediated iris dilator muscle) and relaxes the ciliary muscle, flattening the lens to focus for distance vision. The combined result of cervical sympathetic chain stimulation is that the eye is optically set up to see far objects, the opposite of the parasympathetic near-vision accommodation reflex (ciliary muscle contraction, pupillary constriction). Interruption, rather than stimulation, of this same pathway instead produces Horner syndrome (ptosis, miosis, enophthalmos).
## explicit_objective
State that cervical sympathetic stimulation dilates the pupil and relaxes the ciliary muscle, setting the eye up for distance vision.
## pitfalls
Confusing the effect of sympathetic STIMULATION (mydriasis, far vision) with the effect of sympathetic LOSS/interruption (Horner syndrome: ptosis, miosis, enophthalmos) — the two are opposite directions of the same pathway.
## concept_type
mechanism
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
DIS-PHY-T01
## secondary_node_ids
[clear]
## topic
General pharmacology
## subtopic
Autonomic nervous system pharmacology — sympathetic effector effects
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Pharmacology > General Pharmacology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p14 | MANS-PPPM
## article_ids
ART-MANS-PPPM-CERVICAL-SYMPATHETIC-MYDRIASIS
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.4
## exam_weight_by_year
MANS_Y1=0.4
## clinical_relevance
0.5
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.7
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
Which of the following results from stimulation of the cervical sympathetic nerves? A) Ciliary muscle contraction. B) Enophthalmos. C) Eyes can see far objects. D) Small-sized pupil. E) Watery saliva poor in enzymes. [answer: C]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching.
## owner
Claude
## reviewer

## final_publisher

## last_reviewed

## review_due

## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## exclusion_reason

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
secondaryNodeIds: No second reviewed placement identified this pass.
relatedArticleIds: No further-reading article exists yet for this module beyond the one on article_ids.
relatedConceptIds: Left for a relations pass.
resourceOccurrenceIds: Read directly from the source PDF by hand (page render, after pagetext.mjs keys mis-attributed several right-margin key-column answers on this file), not by the extraction pipeline; no corpus occurrence record exists to point at.
sourceCandidateIds: No candidate found.
mint: find-existing.mjs "cervical sympathetic chain pupil" returned no hit. Minted new.
atomicClaimIds: No claim record exists yet; this concept/article batch does not include an evidence pass.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: The searches run before minting returned no near-miss to decide against, beyond what sourceCandidateIds already names.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
reviewer: No faculty reviewer has seen this yet.
finalPublisher: Not published — it has not passed the evidence gate.

---

# Item
## label
Thinner nerve fibres conduct action potentials more slowly than thick ones, because higher internal (axoplasmic) resistance slows the passive spread of depolarisation ahead of the active zone
## id
CON-FND-B5A0A621EACB33
## canonical_key
teaching.phys.neuro.action-potential-conduction-fiber-diameter
## aliases
Action potential conduction velocity
Nerve fibre diameter
## arabic_label

## arabic_aliases
[clear]
## definition
Conduction velocity along a nerve fibre depends on axon diameter and myelination: thinner fibres have higher internal (axoplasmic) resistance to current flow, which slows the passive spread of depolarisation ahead of the active zone, so the action potential is conducted more slowly in thin nerve fibres than in thick ones. The action potential itself is all-or-none (not graded), triggered only by a threshold or supra-threshold stimulus, and its upstroke is a rapid inward sodium current rather than repolarisation.
## explicit_objective
State that action potentials conduct more slowly in thinner nerve fibres, and identify the action potential's other basic properties (all-or-none, threshold-triggered, sodium-driven upstroke).
## pitfalls
Assuming the action potential is graded like a local potential, or that it requires no energy at all — restoring the ionic gradients after repolarisation does require ATP from the Na-K ATPase, even though the depolarisation/repolarisation phases themselves are passive ion flow.
## concept_type
mechanism
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
DIS-PHY-T01
## secondary_node_ids
SYS-NEU-T01-S02
## topic
General pharmacology
## subtopic
Neurophysiology basics for pharmacology
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Pharmacology > General Pharmacology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p14 | MANS-PPPM
## article_ids
ART-MANS-PPPM-ACTION-POTENTIAL-FIBER-DIAMETER
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.4
## exam_weight_by_year
MANS_Y1=0.4
## clinical_relevance
0.5
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.7
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
Which of the following is a character of Action potential? A) Is a graded potential. B) Is conducted slower in thin nerve fibers. C) Is produced by sub threshold stimulus. D) Requires no energy. E) Starts with repolarization caused by outward movement of Cl-. [answer: B]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching.
## owner
Claude
## reviewer

## final_publisher

## last_reviewed

## review_due

## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## exclusion_reason

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
secondaryNodeIds: No second reviewed placement identified this pass.
relatedArticleIds: No further-reading article exists yet for this module beyond the one on article_ids.
relatedConceptIds: Left for a relations pass.
resourceOccurrenceIds: Read directly from the source PDF by hand (page render, after pagetext.mjs keys mis-attributed several right-margin key-column answers on this file), not by the extraction pipeline; no corpus occurrence record exists to point at.
sourceCandidateIds: No candidate found.
mint: find-existing.mjs "action potential conducted slower thin nerve fibers" returned no hit. Minted new.
atomicClaimIds: No claim record exists yet; this concept/article batch does not include an evidence pass.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: The searches run before minting returned no near-miss to decide against, beyond what sourceCandidateIds already names.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
reviewer: No faculty reviewer has seen this yet.
finalPublisher: Not published — it has not passed the evidence gate.

---

# Item
## label
Active transport depends on ongoing cellular metabolism (ATP) and stops when the cell dies, unlike the passive transport mechanisms that keep working on an existing gradient alone
## id
CON-FND-3A7615F9A98987
## canonical_key
teaching.phys.cell.active-transport-requires-living-cell-energy
## aliases
Active transport
Living cell energy dependence
## arabic_label

## arabic_aliases
[clear]
## definition
Active transport requires continuous expenditure of metabolic energy (ATP) by the cell's own pumps to move solute against its concentration gradient. Because it depends on the cell's living metabolic machinery, it stops as soon as the cell dies or its ATP supply is blocked, unlike passive mechanisms (simple diffusion, facilitated diffusion, osmosis), which need no living cellular machinery and can, at least transiently, continue to act on an existing gradient even in a dead cell.
## explicit_objective
State that active transport, unlike passive transport mechanisms, requires living cellular metabolism and stops when the cell dies.
## pitfalls
Assuming carrier-mediated transport is automatically active. Facilitated diffusion uses a carrier but is passive (no ATP, downhill); only active transport spends cellular energy to move solute uphill.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
DIS-PHY-T01
## secondary_node_ids
[clear]
## topic
General pharmacology
## subtopic
Membrane transport mechanisms
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Pharmacology > General Pharmacology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p14 | MANS-PPPM
## article_ids
ART-MANS-PPPM-ACTIVE-TRANSPORT-LIVING-CELL
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.4
## exam_weight_by_year
MANS_Y1=0.4
## clinical_relevance
0.5
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.7
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
Which of the following types of transport occurs only in living cell? A) Active transport. B) Facilitated diffusion. C) Osmosis. D) Phagocytosis. E) Simple diffusion. [answer: A]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching.
## owner
Claude
## reviewer

## final_publisher

## last_reviewed

## review_due

## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## exclusion_reason

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
secondaryNodeIds: No second reviewed placement identified this pass.
relatedArticleIds: No further-reading article exists yet for this module beyond the one on article_ids.
relatedConceptIds: Left for a relations pass.
resourceOccurrenceIds: Read directly from the source PDF by hand (page render, after pagetext.mjs keys mis-attributed several right-margin key-column answers on this file), not by the extraction pipeline; no corpus occurrence record exists to point at.
sourceCandidateIds: No candidate found.
mint: find-existing.mjs "active transport requires energy against gradient" returned no hit. Minted new.
atomicClaimIds: No claim record exists yet; this concept/article batch does not include an evidence pass.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: The searches run before minting returned no near-miss to decide against, beyond what sourceCandidateIds already names.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
reviewer: No faculty reviewer has seen this yet.
finalPublisher: Not published — it has not passed the evidence gate.

---

# Item
## label
The flexor withdrawal reflex is a somatic reflex, its efferent limb running through somatic motor neurons to skeletal muscle, unlike autonomic (visceral) reflexes whose efferent limb runs to smooth muscle, cardiac muscle or glands
## id
CON-FND-E161E569EC6167
## canonical_key
teaching.phys.neuro.somatic-vs-autonomic-reflex
## aliases
Somatic reflex
Autonomic reflex
Flexor withdrawal reflex
## arabic_label

## arabic_aliases
[clear]
## definition
The flexor withdrawal reflex, rapidly flexing a limb away from a painful stimulus, is a somatic reflex: its efferent limb runs through somatic motor neurons directly to skeletal (voluntary) muscle. Autonomic (visceral) reflexes such as salivary secretion, gastric juice secretion, and cardiac rate changes instead run their efferent limb through autonomic ganglia to smooth muscle, cardiac muscle, or glands, a structurally distinct reflex arc from the somatic one.
## explicit_objective
Identify the flexor withdrawal reflex as a somatic reflex (skeletal muscle effector), distinguishing it from autonomic (visceral) reflexes.
## pitfalls
Classifying a reflex by its trigger (a painful or visceral stimulus) rather than by its efferent limb and effector organ, which is the actual somatic-versus-autonomic distinction.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
DIS-PHY-T01
## secondary_node_ids
SYS-NEU-T01-S02
## topic
General pharmacology
## subtopic
Neurophysiology basics for pharmacology
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Pharmacology > General Pharmacology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p15 | MANS-PPPM
## article_ids
ART-MANS-PPPM-SOMATIC-VS-AUTONOMIC-REFLEX
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.4
## exam_weight_by_year
MANS_Y1=0.4
## clinical_relevance
0.5
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.7
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
Which of the following reflexes is a somatic reflex? A) Acceleration of the heart. B) Flexion of the arm following a painful stimulus. C) Micturition. D) Salivary secretion. E) Secretion of gastric juice. [answer: B]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching.
## owner
Claude
## reviewer

## final_publisher

## last_reviewed

## review_due

## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## exclusion_reason

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
secondaryNodeIds: No second reviewed placement identified this pass.
relatedArticleIds: No further-reading article exists yet for this module beyond the one on article_ids.
relatedConceptIds: Left for a relations pass.
resourceOccurrenceIds: Read directly from the source PDF by hand (page render, after pagetext.mjs keys mis-attributed several right-margin key-column answers on this file), not by the extraction pipeline; no corpus occurrence record exists to point at.
sourceCandidateIds: No candidate found.
mint: find-existing.mjs "flexor withdrawal reflex somatic" returned no hit. Minted new.
atomicClaimIds: No claim record exists yet; this concept/article batch does not include an evidence pass.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: The searches run before minting returned no near-miss to decide against, beyond what sourceCandidateIds already names.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
reviewer: No faculty reviewer has seen this yet.
finalPublisher: Not published — it has not passed the evidence gate.

---

# Item
## label
Four cranial nerves carry parasympathetic fibres — III, VII, IX and X — with the glossopharyngeal nerve (IX) supplying the parotid gland via the otic ganglion
## id
CON-FND-D0CE9417257EAE
## canonical_key
teaching.anat.neuro.cranial-nerves-carrying-parasympathetic-fibers
## aliases
Cranial nerve parasympathetics
Glossopharyngeal nerve
Otic ganglion
## arabic_label

## arabic_aliases
[clear]
## definition
Four cranial nerves carry parasympathetic fibres: III (oculomotor, to the pupil and ciliary muscle), VII (facial, to the lacrimal, submandibular and sublingual glands), IX (glossopharyngeal, to the parotid gland) and X (vagus, to thoracic and abdominal viscera). The glossopharyngeal nerve's parasympathetic fibres, arising from the inferior salivatory nucleus, synapse in the otic ganglion and supply secretomotor innervation to the parotid gland; the other cranial nerves (I, II, IV, V, VI, VIII, XI, XII) carry no parasympathetic fibres of their own.
## explicit_objective
Name the four cranial nerves (III, VII, IX, X) that carry parasympathetic fibres, using the glossopharyngeal nerve's parotid supply as the example.
## pitfalls
Assuming every cranial nerve with autonomic-adjacent effects (like the trigeminal, which carries other nerves' fibres along its branches) itself originates parasympathetic fibres. Only III, VII, IX and X do.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
DIS-PHY-T01
## secondary_node_ids
SYS-NEU-T01-S02
## topic
General pharmacology
## subtopic
Neuroanatomy basics for pharmacology
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Pharmacology > General Pharmacology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p15 | MANS-PPPM
## article_ids
ART-MANS-PPPM-CRANIAL-NERVES-PARASYMPATHETIC
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.4
## exam_weight_by_year
MANS_Y1=0.4
## clinical_relevance
0.5
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.7
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
Which of the following cranial nerves contains parasympathetic fibers? A) Optic (II). B) Glossopharyngeal (IX). C) Abducent nerve (VI). D) Trochlear (V). E) Olfactory (I) [answer: B]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching.
## owner
Claude
## reviewer

## final_publisher

## last_reviewed

## review_due

## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## exclusion_reason

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
secondaryNodeIds: No second reviewed placement identified this pass.
relatedArticleIds: No further-reading article exists yet for this module beyond the one on article_ids.
relatedConceptIds: Left for a relations pass.
resourceOccurrenceIds: Read directly from the source PDF by hand (page render, after pagetext.mjs keys mis-attributed several right-margin key-column answers on this file), not by the extraction pipeline; no corpus occurrence record exists to point at.
sourceCandidateIds: No candidate found.
mint: find-existing.mjs "cranial nerves carrying parasympathetic fibers" returned no hit. Minted new.
atomicClaimIds: No claim record exists yet; this concept/article batch does not include an evidence pass.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: The searches run before minting returned no near-miss to decide against, beyond what sourceCandidateIds already names.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
reviewer: No faculty reviewer has seen this yet.
finalPublisher: Not published — it has not passed the evidence gate.

---

# Item
## label
A long plasma half-life is a genuinely desired antibiotic property (supporting convenient, adherence-friendly dosing), unlike resistance development or hypersensitivity, which are drawbacks
## id
CON-FND-FFE6C5DA0A271A
## canonical_key
teaching.pharma.micro.ideal-antibiotic-properties
## aliases
Ideal antibiotic properties
Antibiotic selection criteria
## arabic_label

## arabic_aliases
[clear]
## definition
Among the properties a clinician weighs when selecting an antibiotic, a long plasma half-life is a genuinely desirable pharmacokinetic property: it allows less frequent dosing, which improves patient adherence and maintains more stable plasma concentrations between doses. This is distinct from properties that are drawbacks to be minimised, such as a strong tendency to develop bacterial resistance or a propensity to cause hypersensitivity reactions, and distinct from properties (spectrum width) whose desirability is situation-dependent rather than universal.
## explicit_objective
Identify a long plasma half-life as a desired antibiotic property that supports convenient, adherence-friendly dosing.
## pitfalls
Treating every listed antibiotic property as either uniformly desirable or undesirable. Spectrum width is situational (broad for empirical therapy, narrow once the organism is known); only genuinely universal benefits like a long half-life, or genuinely universal drawbacks like resistance, are unconditional.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S02
## secondary_node_ids
DIS-PHA
## topic
Antimicrobial pharmacology
## subtopic
Principles of antimicrobial selection
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Pharmacology > Antimicrobial Pharmacology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p15 | MANS-PPPM
## article_ids
ART-MANS-PPPM-IDEAL-ANTIBIOTIC-PROPERTIES
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.4
## exam_weight_by_year
MANS_Y1=0.4
## clinical_relevance
0.5
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.7
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
Desired properties of antibiotics include only one of the following? A) Selective permeability B) Narrow spectrum C) Long plasma half-life D) Developing strong resistance E) Develop hypersensitivity reaction [answer: C]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching.
## owner
Claude
## reviewer

## final_publisher

## last_reviewed

## review_due

## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## exclusion_reason

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
secondaryNodeIds: No second reviewed placement identified this pass.
relatedArticleIds: No further-reading article exists yet for this module beyond the one on article_ids.
relatedConceptIds: Left for a relations pass.
resourceOccurrenceIds: Read directly from the source PDF by hand (page render, after pagetext.mjs keys mis-attributed several right-margin key-column answers on this file), not by the extraction pipeline; no corpus occurrence record exists to point at.
sourceCandidateIds: No candidate found.
mint: find-existing.mjs "ideal antibiotic properties selective toxicity" returned no hit. Minted new.
atomicClaimIds: No claim record exists yet; this concept/article batch does not include an evidence pass.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: The searches run before minting returned no near-miss to decide against, beyond what sourceCandidateIds already names.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
reviewer: No faculty reviewer has seen this yet.
finalPublisher: Not published — it has not passed the evidence gate.

---

# Item
## label
Cefepime, a fourth-generation cephalosporin, inhibits bacterial cell wall synthesis by binding penicillin-binding proteins and blocking peptidoglycan cross-linking
## id
CON-FND-D309C60CE88CBA
## canonical_key
teaching.pharma.micro.cefepime-cell-wall-synthesis-inhibitor
## aliases
Cefepime
Cephalosporin mechanism
Cell wall synthesis inhibitor
## arabic_label

## arabic_aliases
[clear]
## definition
Cefepime is a fourth-generation cephalosporin, a beta-lactam antibiotic. Like other beta-lactams, it inhibits bacterial cell wall synthesis by binding penicillin-binding proteins and blocking the transpeptidation (cross-linking) step of peptidoglycan synthesis, weakening the cell wall and causing bacterial lysis, a mechanism distinct from the protein-synthesis-inhibiting aminoglycosides, macrolides and tetracyclines, or the folate-synthesis-inhibiting sulfonamides/trimethoprim.
## explicit_objective
Identify cefepime (a cephalosporin, beta-lactam) as an antibiotic that inhibits bacterial cell wall synthesis, distinguishing it from protein- and folate-synthesis inhibitors.
## pitfalls
Sorting antibiotics by generation or spectrum instead of by mechanism class. Cefepime's mechanism (cell wall synthesis inhibition) is what it shares with all beta-lactams, not what it shares with other broad-spectrum agents of unrelated mechanism.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S02
## secondary_node_ids
DIS-PHA
## topic
Antimicrobial pharmacology
## subtopic
Antibacterial mechanisms of action
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Pharmacology > Antimicrobial Pharmacology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p15 | MANS-PPPM
## article_ids
ART-MANS-PPPM-CEFEPIME-CELL-WALL
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.4
## exam_weight_by_year
MANS_Y1=0.4
## clinical_relevance
0.5
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.7
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
Which of the following antibiotics acts by inhibiting cell wall synthesis? A) Tobramycin B) Erythromycin C) Doxycycline D) Cefepime E) Trimethoprim [answer: D]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching.
## owner
Claude
## reviewer

## final_publisher

## last_reviewed

## review_due

## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## exclusion_reason

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
secondaryNodeIds: No second reviewed placement identified this pass.
relatedArticleIds: No further-reading article exists yet for this module beyond the one on article_ids.
relatedConceptIds: Left for a relations pass.
resourceOccurrenceIds: Read directly from the source PDF by hand (page render, after pagetext.mjs keys mis-attributed several right-margin key-column answers on this file), not by the extraction pipeline; no corpus occurrence record exists to point at.
sourceCandidateIds: No candidate found.
mint: find-existing.mjs "cefepime" / "cephalosporin cell wall" returned no hit. Minted new.
atomicClaimIds: No claim record exists yet; this concept/article batch does not include an evidence pass.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: The searches run before minting returned no near-miss to decide against, beyond what sourceCandidateIds already names.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
reviewer: No faculty reviewer has seen this yet.
finalPublisher: Not published — it has not passed the evidence gate.

---

# Item
## label
Vancomycin is the drug of choice for MRSA because its cell-wall-synthesis mechanism does not rely on the penicillin-binding proteins that methicillin resistance alters
## id
CON-FND-687B58A054E68F
## canonical_key
teaching.pharma.micro.vancomycin-mrsa-drug-of-choice
## aliases
Vancomycin
MRSA treatment
Glycopeptide antibiotic
## arabic_label

## arabic_aliases
[clear]
## definition
Vancomycin, a glycopeptide, inhibits bacterial cell wall synthesis by binding the D-Ala-D-Ala terminus of peptidoglycan precursors. This mechanism does not rely on the penicillin-binding proteins altered in methicillin-resistant Staphylococcus aureus (MRSA), so vancomycin remains effective where beta-lactams such as cloxacillin and ampicillin, which MRSA is by definition resistant to, no longer work, making it the classic drug of choice for serious MRSA infection.
## explicit_objective
State that vancomycin is the drug of choice for MRSA because its cell-wall-synthesis-inhibiting mechanism bypasses the altered penicillin-binding protein that confers methicillin resistance.
## pitfalls
Assuming resistance to one cell-wall-synthesis inhibitor (a beta-lactam) implies resistance to all cell-wall-synthesis inhibitors. Vancomycin binds a different target (the peptidoglycan precursor itself) rather than the altered penicillin-binding protein, so it escapes MRSA's resistance mechanism.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S02
## secondary_node_ids
DIS-PHA
## topic
Antimicrobial pharmacology
## subtopic
Antibacterial spectrum and resistance
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Pharmacology > Antimicrobial Pharmacology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p15 | MANS-PPPM
## article_ids
ART-MANS-PPPM-VANCOMYCIN-MRSA
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.4
## exam_weight_by_year
MANS_Y1=0.4
## clinical_relevance
0.5
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.7
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
Drug of choice for treatment of methicillin resistant staphylococcus aureus infection is: A) Cloxacillin. B) Vancomycin. C) Erythromycin. D) Amikacin. E) Ampicillin [answer: B]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching.
## owner
Claude
## reviewer

## final_publisher

## last_reviewed

## review_due

## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## exclusion_reason

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
secondaryNodeIds: No second reviewed placement identified this pass.
relatedArticleIds: No further-reading article exists yet for this module beyond the one on article_ids.
relatedConceptIds: Left for a relations pass.
resourceOccurrenceIds: Read directly from the source PDF by hand (page render, after pagetext.mjs keys mis-attributed several right-margin key-column answers on this file), not by the extraction pipeline; no corpus occurrence record exists to point at.
sourceCandidateIds: No candidate found.
mint: find-existing.mjs "vancomycin MRSA drug of choice" returned no hit. Minted new.
atomicClaimIds: No claim record exists yet; this concept/article batch does not include an evidence pass.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: The searches run before minting returned no near-miss to decide against, beyond what sourceCandidateIds already names.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
reviewer: No faculty reviewer has seen this yet.
finalPublisher: Not published — it has not passed the evidence gate.

---

# Item
## label
Clavulanic acid protects its partner beta-lactam (amoxicillin) from bacterial beta-lactamase, restoring activity against beta-lactamase-producing organisms
## id
CON-FND-13A9CAF09956EE
## canonical_key
teaching.pharma.micro.clavulanic-acid-beta-lactamase-inhibitor-combination
## aliases
Clavulanic acid
Beta-lactamase inhibitor
Amoxicillin-clavulanate
## arabic_label

## arabic_aliases
[clear]
## definition
Clavulanic acid has weak antibacterial activity of its own but binds and irreversibly inactivates many bacterial beta-lactamase enzymes, protecting a co-administered beta-lactam from being hydrolysed. The amoxicillin-clavulanic acid combination is therefore active against many beta-lactamase-producing organisms that amoxicillin alone could not treat, unlike a combination of two plain beta-lactams (with no inhibitor), which offers no such protection against beta-lactamase degradation.
## explicit_objective
State that clavulanic acid combined with amoxicillin protects the beta-lactam from bacterial beta-lactamase, restoring activity against beta-lactamase-producing organisms.
## pitfalls
Assuming combining any two beta-lactams (or a beta-lactam with another beta-lactam-class drug) confers beta-lactamase protection. Only a genuine beta-lactamase inhibitor (clavulanic acid, sulbactam, tazobactam) does this; two beta-lactams together offer no such protection.
## concept_type
mechanism
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S02
## secondary_node_ids
DIS-PHA
## topic
Antimicrobial pharmacology
## subtopic
Antibacterial resistance and beta-lactamase inhibitors
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Pharmacology > Antimicrobial Pharmacology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p16 | MANS-PPPM
## article_ids
ART-MANS-PPPM-CLAVULANIC-ACID-BETA-LACTAMASE
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.4
## exam_weight_by_year
MANS_Y1=0.4
## clinical_relevance
0.5
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.7
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
An active combination against B-lactamase producing bacteria is: A) Clavulaunic acid plus Amoxycillin. B) Pipracillin plus Amoxycillin. C) Pipracillin plus Aztereonam. D) Aztereonam plus Carbencillin. E) Imipenem plus Carbencillin. [answer: A]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching.
## owner
Claude
## reviewer

## final_publisher

## last_reviewed

## review_due

## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## exclusion_reason

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
secondaryNodeIds: No second reviewed placement identified this pass.
relatedArticleIds: No further-reading article exists yet for this module beyond the one on article_ids.
relatedConceptIds: Left for a relations pass.
resourceOccurrenceIds: Read directly from the source PDF by hand (page render, after pagetext.mjs keys mis-attributed several right-margin key-column answers on this file), not by the extraction pipeline; no corpus occurrence record exists to point at.
sourceCandidateIds: No candidate found.
mint: find-existing.mjs "clavulanic acid beta-lactamase inhibitor" returned no hit. Minted new.
atomicClaimIds: No claim record exists yet; this concept/article batch does not include an evidence pass.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: The searches run before minting returned no near-miss to decide against, beyond what sourceCandidateIds already names.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
reviewer: No faculty reviewer has seen this yet.
finalPublisher: Not published — it has not passed the evidence gate.

---

# Item
## label
Linezolid's main clinical niche is serious Gram-positive infections resistant to other agents, most notably vancomycin-resistant Staphylococcus aureus and enterococci
## id
CON-FND-1FD9D1FE8B7DBE
## canonical_key
teaching.pharma.micro.linezolid-vrsa
## aliases
Linezolid
Vancomycin-resistant Staphylococcus aureus
Oxazolidinone
## arabic_label

## arabic_aliases
[clear]
## definition
Linezolid is an oxazolidinone that inhibits bacterial protein synthesis at the 50S ribosomal subunit, at the initiation step. Its clinical niche is serious Gram-positive infections resistant to other agents, most notably vancomycin-resistant Staphylococcus aureus (VRSA) and vancomycin-resistant enterococci, where it is a key remaining oral or IV option; it has no useful activity against the Gram-negative organisms (Pseudomonas, Neisseria, E. coli) that other antimicrobial classes target instead.
## explicit_objective
State that linezolid's main clinical use is against resistant Gram-positive organisms such as vancomycin-resistant Staphylococcus aureus.
## pitfalls
Assuming a drug reserved for 'resistant' infections generally must be broad-spectrum. Linezolid's resistant-organism niche is specifically Gram-positive; it has no useful Gram-negative coverage at all.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S02
## secondary_node_ids
DIS-PHA
## topic
Antimicrobial pharmacology
## subtopic
Antibacterial spectrum and resistance
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Pharmacology > Antimicrobial Pharmacology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p16 | MANS-PPPM
## article_ids
ART-MANS-PPPM-LINEZOLID-VRSA
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.4
## exam_weight_by_year
MANS_Y1=0.4
## clinical_relevance
0.5
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.7
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
Linezolid is used mainly to treat one of the following: A) Pseudomonas aeruginosa. B) Betalactamase producing Neisseria. C) Extended spectrum producing Escherichia coli. D) Vancomycin Resistance Staphylococcus Aureus. E) Anaerobic bacteria. [answer: D]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching.
## owner
Claude
## reviewer

## final_publisher

## last_reviewed

## review_due

## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## exclusion_reason

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
secondaryNodeIds: No second reviewed placement identified this pass.
relatedArticleIds: No further-reading article exists yet for this module beyond the one on article_ids.
relatedConceptIds: Left for a relations pass.
resourceOccurrenceIds: Read directly from the source PDF by hand (page render, after pagetext.mjs keys mis-attributed several right-margin key-column answers on this file), not by the extraction pipeline; no corpus occurrence record exists to point at.
sourceCandidateIds: No candidate found.
mint: find-existing.mjs "linezolid vancomycin resistant" returned no hit. Minted new.
atomicClaimIds: No claim record exists yet; this concept/article batch does not include an evidence pass.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: The searches run before minting returned no near-miss to decide against, beyond what sourceCandidateIds already names.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
reviewer: No faculty reviewer has seen this yet.
finalPublisher: Not published — it has not passed the evidence gate.

---

# Item
## label
Azole antifungals inhibit fungal lanosterol 14-alpha-demethylase, blocking ergosterol synthesis and depleting the fungal cell membrane's principal sterol
## id
CON-FND-A86325E142D089
## canonical_key
teaching.pharma.micro.azoles-ergosterol-synthesis-inhibition
## aliases
Azole antifungals
Ergosterol synthesis inhibition
Lanosterol demethylase
## arabic_label

## arabic_aliases
[clear]
## definition
Azole antifungals, such as fluconazole, itraconazole and ketoconazole, inhibit the fungal cytochrome P450 enzyme lanosterol 14-alpha-demethylase, blocking a key step in the synthesis of ergosterol, the fungal membrane's principal sterol. The resulting ergosterol depletion, and accumulation of toxic sterol intermediates, disrupts fungal cell membrane structure and function, a different target from the cell-wall-glucan-synthesis inhibitors (echinocandins) or the microtubule-disrupting agents (griseofulvin).
## explicit_objective
Identify azoles as the antifungal class that inhibits ergosterol synthesis by blocking fungal lanosterol 14-alpha-demethylase.
## pitfalls
Lumping all antifungal drug classes together as 'attacking the fungal membrane'. Only azoles (and the polyenes, by a different mechanism) target ergosterol; echinocandins target the cell wall, and griseofulvin targets mitotic spindle function.
## concept_type
mechanism
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S02
## secondary_node_ids
DIS-PHA
## topic
Antimicrobial pharmacology
## subtopic
Antifungal mechanisms of action
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Pharmacology > Antimicrobial Pharmacology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p16 | MANS-PPPM
## article_ids
ART-MANS-PPPM-AZOLES-ERGOSTEROL
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.4
## exam_weight_by_year
MANS_Y1=0.4
## clinical_relevance
0.5
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.7
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
Which of the following antifungals inhibits ergoesterol synthesis? A) 5-fluorocytosine. B) Azoles. C) Blasticidin. D) Caspofungin. E) Griseofulvin. [answer: B]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching.
## owner
Claude
## reviewer

## final_publisher

## last_reviewed

## review_due

## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## exclusion_reason

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
secondaryNodeIds: No second reviewed placement identified this pass.
relatedArticleIds: No further-reading article exists yet for this module beyond the one on article_ids.
relatedConceptIds: Left for a relations pass.
resourceOccurrenceIds: Read directly from the source PDF by hand (page render, after pagetext.mjs keys mis-attributed several right-margin key-column answers on this file), not by the extraction pipeline; no corpus occurrence record exists to point at.
sourceCandidateIds: No candidate found.
mint: find-existing.mjs "azoles inhibit ergosterol synthesis" returned no hit. Minted new.
atomicClaimIds: No claim record exists yet; this concept/article batch does not include an evidence pass.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: The searches run before minting returned no near-miss to decide against, beyond what sourceCandidateIds already names.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
reviewer: No faculty reviewer has seen this yet.
finalPublisher: Not published — it has not passed the evidence gate.

---

# Item
## label
During a constant-rate infusion, plasma concentration reaches 50% of steady state after one half-life, letting a concentration measured at one half-life predict the eventual steady-state level
## id
CON-FND-BD68D6F423F2C7
## canonical_key
teaching.pharma.pk.loading-dose-steady-state-fraction-per-half-life
## aliases
Steady-state accumulation
Infusion kinetics
Half-life fraction rule
## arabic_label

## arabic_aliases
[clear]
## definition
During a constant-rate IV infusion, plasma concentration rises toward steady state along a predictable exponential accumulation curve: about 50% of the eventual steady-state concentration is reached after one half-life, about 75% after two half-lives, and effectively 100% (steady state) after four to five half-lives. A concentration measured at a known number of half-lives into the infusion can therefore be used to calculate the eventual steady-state concentration, for example doubling a concentration measured at exactly one half-life.
## explicit_objective
Calculate a steady-state concentration from a known concentration measured at one half-life into a constant-rate infusion, using the 50%-per-half-life accumulation rule.
## pitfalls
Confusing the concentration measured partway through an infusion with the eventual steady-state concentration itself. Only after four to five half-lives does the measured concentration approximate steady state; before that, the accumulation-fraction rule must be applied.
## concept_type
mechanism
## status
under review
## support_mode
direct_statement
## subject
pharm
## primary_node_id
SYS-FND-T04-S01
## secondary_node_ids
DIS-PHA
## topic
General pharmacology
## subtopic
Pharmacokinetics — dosing regimens
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Pharmacology > General Pharmacology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p16 | MANS-PPPM
## article_ids
ART-MANS-PPPM-STEADY-STATE-HALF-LIFE-FRACTION
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.4
## exam_weight_by_year
MANS_Y1=0.4
## clinical_relevance
0.5
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.7
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
A patient requires an infusion of procainamide. Its half-life is 2 hrs. The infusion is begun at 9 to 11 AM on the same day, the blood concentration is found to be 3 mg/L. What is the probable steady state concentration after 2 days of infusion? [answer: D, 6 mg/L]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching.
## owner
Claude
## reviewer

## final_publisher

## last_reviewed

## review_due

## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## exclusion_reason

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
secondaryNodeIds: No second reviewed placement identified this pass.
relatedArticleIds: No further-reading article exists yet for this module beyond the one on article_ids.
relatedConceptIds: Left for a relations pass.
resourceOccurrenceIds: Read directly from the source PDF by hand (page render, after pagetext.mjs keys mis-attributed several right-margin key-column answers on this file), not by the extraction pipeline; no corpus occurrence record exists to point at.
sourceCandidateIds: CON-FND-3CC86CC26BF549 (lane 1's loading-dose concept, reused by lane 1's pppmbank-q05) is the related but distinct fact that a loading dose is given to reach steady state rapidly; it does not itself state the 50%-per-half-life accumulation-fraction arithmetic this concept teaches, so not a duplicate.
mint: find-existing.mjs "loading dose steady state half-life" returned no dedicated accumulation-fraction concept (a related but distinct loading-dose concept exists, reused by lane 1). Minted new; verified the arithmetic independently (3 mg/L at t=1 half-life implies Css=6 mg/L under first-order accumulation) before accepting the printed key.
atomicClaimIds: No claim record exists yet; this concept/article batch does not include an evidence pass.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: The searches run before minting returned no near-miss to decide against, beyond what sourceCandidateIds already names.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
reviewer: No faculty reviewer has seen this yet.
finalPublisher: Not published — it has not passed the evidence gate.

---

# Item
## label
Frozen section rapidly freezes and cuts fresh, unfixed tissue so a pathologist can report within minutes, which is what makes it suited to intraoperative consultation
## id
CON-FND-86DE6AC91FAB94
## canonical_key
path.technique.frozen-section-intraoperative-consultation
## aliases
Frozen section
Intraoperative consultation
Cryostat sectioning
## arabic_label

## arabic_aliases
[clear]
## definition
Frozen section is a rapid tissue-preparation technique in which fresh, unfixed tissue is snap-frozen and cut on a cryostat, allowing a pathologist to examine and report on it within minutes while the patient is still under anaesthesia. This speed is what makes it suited to intraoperative consultation, such as confirming a mass is malignant or checking that resection margins are clear, so the surgeon can decide on further surgery before closing, unlike routine fixed (paraffin) processing, which takes far longer and is used for the definitive, non-time-pressured permanent diagnosis.
## explicit_objective
State that frozen section is a rapid, unfixed tissue technique used for intraoperative consultation, distinguishing it from routine fixed-tissue processing.
## pitfalls
Confusing frozen section's speed advantage with any postoperative or postmortem use, where there is no time pressure and routine fixed processing is used instead.
## concept_type
clinical_feature
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
DIS-PAT-T01
## secondary_node_ids
[clear]
## topic
General pathology
## subtopic
Laboratory and diagnostic techniques
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Pathology > General Pathology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p17 | MANS-PPPM
## article_ids
ART-MANS-PPPM-FROZEN-SECTION-TECHNIQUE
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.4
## exam_weight_by_year
MANS_Y1=0.4
## clinical_relevance
0.5
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.7
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
Frozen section technique is applied for: A) Postoperative diagnosis. B) Postmortem diagnosis. C) Fixation of pathology specimen. D) Electron microscopy. E) Intraoperative consultation. [answer: E]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching.
## owner
Claude
## reviewer

## final_publisher

## last_reviewed

## review_due

## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## exclusion_reason

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
secondaryNodeIds: No second reviewed placement identified this pass.
relatedArticleIds: No further-reading article exists yet for this module beyond the one on article_ids.
relatedConceptIds: Left for a relations pass.
resourceOccurrenceIds: Read directly from the source PDF by hand (page render, after pagetext.mjs keys mis-attributed several right-margin key-column answers on this file), not by the extraction pipeline; no corpus occurrence record exists to point at.
sourceCandidateIds: No candidate found.
mint: find-existing.mjs "frozen section intraoperative consultation" returned no hit anywhere in the corpus. Minted new.
atomicClaimIds: No claim record exists yet; this concept/article batch does not include an evidence pass.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: The searches run before minting returned no near-miss to decide against, beyond what sourceCandidateIds already names.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
reviewer: No faculty reviewer has seen this yet.
finalPublisher: Not published — it has not passed the evidence gate.

---

# Item
## label
An ulcer is a local discontinuity of surface epithelium from sloughing of inflamed, necrotic tissue, distinct from a fistula (a tract between two epithelial surfaces) or a sinus (a blind-ended tract)
## id
CON-FND-4E062E77B53A4E
## canonical_key
path.general.ulcer-discontinuity-of-surface-epithelium
## aliases
Ulcer
Surface epithelium discontinuity
## arabic_label

## arabic_aliases
[clear]
## definition
An ulcer is defined as a local defect, or discontinuity, of the surface epithelium of skin or mucosa, produced by the shedding (sloughing) of inflamed, necrotic tissue and exposing the underlying connective tissue. This break in surface continuity is the defining structural feature, distinguishing an ulcer from a fistula (a tract connecting two epithelial surfaces) and from a sinus (a blind-ended tract from defective healing), both different lesions built around a tract rather than a surface breach.
## explicit_objective
Define an ulcer as a discontinuity of surface epithelium, distinguishing it from a fistula, sinus and inflammatory collection.
## pitfalls
Confusing an ulcer (a surface breach) with a fistula (a tract between two surfaces) or a sinus (a blind tract) — all three are named, related lesions of tissue continuity but structurally distinct.
## concept_type
definition
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
DIS-PAT-T01
## secondary_node_ids
[clear]
## topic
General pathology
## subtopic
Inflammation and Repair
## microtopic

## nanotopic

## modules
MANS-PPPM
## module_subject
MANS-PPPM > Pathology > General Pathology
## universities
mans
## learner_years
1
## exam_signal
src_111bbd078054dc30d3af | question_book | | p17 | MANS-PPPM
## article_ids
ART-MANS-PPPM-ULCER-DEFINITION
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_111bbd078054dc30d3af
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.4
## exam_weight_by_year
MANS_Y1=0.4
## clinical_relevance
0.5
## academic_relevance
0.8
## weight_confidence
0.5
## confidence
0.7
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
Ulcer is defined as a: A) Collection of inflammatory cells. B) Mass of fibrous tissue. C) Tract connecting two epithelial surfaces. D) Discontinuity of surface epithelium. E) Blind ended tract due to defective healing. [answer: D]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent reference not yet cross-checked against this department bank's framing; the fact itself follows standard textbook teaching.
## owner
Claude
## reviewer

## final_publisher

## last_reviewed

## review_due

## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## exclusion_reason

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
secondaryNodeIds: No second reviewed placement identified this pass.
relatedArticleIds: No further-reading article exists yet for this module beyond the one on article_ids.
relatedConceptIds: Left for a relations pass.
resourceOccurrenceIds: Read directly from the source PDF by hand (page render, after pagetext.mjs keys mis-attributed several right-margin key-column answers on this file), not by the extraction pipeline; no corpus occurrence record exists to point at.
sourceCandidateIds: CON-FND-F86C0D49C1829B (Helwan, "The source defines loss of an epithelial surface with inflammation as ulceration") is scope-bounded to its own family's specific prompt per its own pitfalls text ("Answer the printed Family143 Q02 scope without extending the carrier's authority") and is not a general-definition record; flagged as a rejected candidate, not reused.
mint: find-existing.mjs "ulcer discontinuity of surface epithelium" surfaced only a narrowly-scoped Helwan pending record (CON-FND-F86C0D49C1829B) whose own pitfalls text explicitly warns against generalizing beyond its supplied explanation and is bounded to a different family's specific prompt — not a genuine general-definition duplicate. Minted new.
atomicClaimIds: No claim record exists yet; this concept/article batch does not include an evidence pass.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: The searches run before minting returned no near-miss to decide against, beyond what sourceCandidateIds already names.
lastReviewed: New record; no reviewer has seen it.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
reviewer: No faculty reviewer has seen this yet.
finalPublisher: Not published — it has not passed the evidence gate.
