# Item
## source
CON-FND-863C95CB583B82
## type
mechanism_step_before
## target
CON-FND-FE75489195378C
## evidence_claim_ids
CLM-FND-DRUG-DISTRIBUTION-01 | CLM-FND-DRUG-METABOLISM-01
## citation_ids
CIT-FND-DRUG-DISTRIBUTION-01-VERIFY | CIT-FND-DRUG-METABOLISM-01-VERIFY
## verification_status
needs_evidence
## confidence
0.85
## qualifiers
why: Distribution delivers drug to the liver, where metabolism acts. Both endpoints are cited; neither source states the sequence.
## reviewer
Dr Omar
## reviewed_at
2026-08-12

---

# Item
## source
CON-FND-FE75489195378C
## type
mechanism_step_before
## target
CON-FND-0B77B5B8B45578
## evidence_claim_ids
CLM-FND-DRUG-METABOLISM-01 | CLM-FND-ELIMINATION-ROUTES-01
## citation_ids
CIT-FND-DRUG-METABOLISM-01-VERIFY | CIT-FND-ELIMINATION-ROUTES-01-VERIFY
## verification_status
verified
## confidence
0.9
## qualifiers
why: The cited elimination claim states that one of the two routes is metabolic biotransformation followed by excretion, which places metabolism before excretion.
## reviewer
Dr Omar
## reviewed_at
2026-08-12

---

# Item
## source
CON-FND-63AB77D08CEA93
## type
part_of
## target
CON-FND-863C95CB583B82
## evidence_claim_ids
CLM-FND-VOLUME-DISTRIBUTION-01 | CLM-FND-DRUG-DISTRIBUTION-01
## citation_ids
CIT-FND-VOLUME-DISTRIBUTION-01-VERIFY | CIT-FND-DRUG-DISTRIBUTION-01-VERIFY
## verification_status
verified
## confidence
0.9
## qualifiers
why: The cited claim defines the volume of distribution as the parameter describing the tendency the distribution claim names.
## reviewer
Dr Omar
## reviewed_at
2026-08-12

---

# Item
## source
CON-FND-C89BD22BC20E25
## type
part_of
## target
CON-FND-FE75489195378C
## evidence_claim_ids
CLM-FND-CYP450-01 | CLM-FND-PHASE-I-II-01
## citation_ids
CIT-FND-CYP450-01-VERIFY | CIT-FND-PHASE-I-II-01-VERIFY
## verification_status
verified
## confidence
0.9
## qualifiers
why: The cited claims place cytochrome P450 as the catalyst of phase I, and phase I as one half of metabolism.
## reviewer
Dr Omar
## reviewed_at
2026-08-12

---

# Item
## source
CON-FND-AE16E8E450D8A1
## type
part_of
## target
CON-FND-FE75489195378C
## evidence_claim_ids
CLM-FND-FIRST-PASS-01 | CLM-FND-DRUG-METABOLISM-01
## citation_ids
CIT-FND-FIRST-PASS-01-VERIFY | CIT-FND-DRUG-METABOLISM-01-VERIFY
## verification_status
verified
## confidence
0.85
## qualifiers
why: The cited first-pass claim defines it as metabolism at a specific location, which makes it an instance of the metabolism the other claim defines.
## reviewer
Dr Omar
## reviewed_at
2026-08-12

---

# Item
## source
CON-FND-213F6776858526
## type
part_of
## target
CON-FND-0B77B5B8B45578
## evidence_claim_ids
CLM-FND-CLEARANCE-01 | CLM-FND-DRUG-ELIMINATION-01
## citation_ids
CIT-FND-CLEARANCE-01-VERIFY | CIT-FND-DRUG-ELIMINATION-01-VERIFY
## verification_status
verified
## confidence
0.9
## qualifiers
why: The cited clearance claim is defined in terms of the elimination rate the other claim describes.
## reviewer
Dr Omar
## reviewed_at
2026-08-12

---

# Item
## source
CON-FND-02C545DB43902B
## type
part_of
## target
CON-FND-0B77B5B8B45578
## evidence_claim_ids
CLM-FND-HALF-LIFE-01 | CLM-FND-DRUG-ELIMINATION-01
## citation_ids
CIT-FND-HALF-LIFE-01-VERIFY | CIT-FND-DRUG-ELIMINATION-01-VERIFY
## verification_status
verified
## confidence
0.85
## qualifiers
why: Half-life measures the fall in concentration produced by the elimination the other claim defines. Both are cited.
## reviewer
Dr Omar
## reviewed_at
2026-08-12

---

# Item
## source
CON-FND-213F6776858526
## type
often_confused_with
## target
CON-FND-02C545DB43902B
## evidence_claim_ids
CLM-FND-CLEARANCE-01 | CLM-FND-HALF-LIFE-01
## citation_ids
CIT-FND-CLEARANCE-01-VERIFY | CIT-FND-HALF-LIFE-01-VERIFY
## verification_status
verified
## confidence
0.9
## qualifiers
why: Both cited definitions describe elimination, and students use them interchangeably; one is a rate relative to concentration, the other a time.
## reviewer
Dr Omar
## reviewed_at
2026-08-12

---

# Item
## source
CON-FND-0B77B5B8B45578
## type
prerequisite_of
## target
CON-FND-95DE7C48E637EB
## evidence_claim_ids
CLM-FND-RENAL-EXCRETION-01 | CLM-FND-AGEING-RENAL-01
## citation_ids
CIT-FND-RENAL-EXCRETION-01-VERIFY | CIT-FND-AGEING-RENAL-01-VERIFY
## verification_status
verified
## confidence
0.9
## qualifiers
why: The cited claims show that the change in older adults is in renal elimination, so excretion has to be understood before the population differences are.
## reviewer
Dr Omar
## reviewed_at
2026-08-12

---

# Item
## source
CON-FND-95DE7C48E637EB
## type
decreases
## target
CON-FND-213F6776858526
## evidence_claim_ids
CLM-FND-AGEING-RENAL-01 | CLM-FND-CLEARANCE-01
## citation_ids
CIT-FND-AGEING-RENAL-01-VERIFY | CIT-FND-CLEARANCE-01-VERIFY
## verification_status
needs_evidence
## confidence
0.8
## qualifiers
why: Reduced renal elimination lowers clearance. Both endpoints are cited; the ageing claim names elimination rather than the clearance parameter.
## reviewer
Dr Omar
## reviewed_at
2026-08-12

---

# Item
## source
CON-FND-863C95CB583B82
## type
prerequisite_of
## target
CON-FND-63AB77D08CEA93
## evidence_claim_ids
CLM-FND-DRUG-DISTRIBUTION-01 | CLM-FND-VOLUME-DISTRIBUTION-01
## citation_ids
CIT-FND-DRUG-DISTRIBUTION-01-VERIFY | CIT-FND-VOLUME-DISTRIBUTION-01-VERIFY
## verification_status
verified
## confidence
0.9
## qualifiers
why: The parameter cannot be read without the process it measures, and both cited definitions are in the same terms.
## reviewer
Dr Omar
## reviewed_at
2026-08-12

---

# Item
## source
CON-FND-C89BD22BC20E25
## type
causes
## target
CON-FND-A393D68726FD84
## evidence_claim_ids
CLM-FND-CYP450-01 | CLM-FND-DRUG-INTERACTION-01
## citation_ids
CIT-FND-CYP450-01-VERIFY | CIT-FND-INTERACTION-01-VERIFY
## verification_status
needs_evidence
## confidence
0.8
## qualifiers
why: Two drugs competing for the same P450 enzyme is the commonest metabolic interaction. Both endpoints are cited and neither source connects them.
## reviewer
Dr Omar
## reviewed_at
2026-08-12

---

# Item
## source
CON-FND-AE16E8E450D8A1
## type
decreases
## target
CON-FND-863C95CB583B82
## evidence_claim_ids
CLM-FND-FIRST-PASS-EFFECT-01 | CLM-FND-DRUG-DISTRIBUTION-01
## citation_ids
CIT-FND-FIRST-PASS-EFFECT-01-VERIFY | CIT-FND-DRUG-DISTRIBUTION-01-VERIFY
## verification_status
needs_evidence
## confidence
0.75
## qualifiers
why: Less drug reaching the systemic circulation means less available to distribute. The cited claim states the fall in concentration and does not name distribution.
## reviewer
Dr Omar
## reviewed_at
2026-08-12

---

# Item
## source
CON-FND-FE75489195378C
## type
prerequisite_of
## target
CON-FND-95DE7C48E637EB
## evidence_claim_ids
CLM-FND-DRUG-METABOLISM-01 | CLM-FND-AGEING-PK-01
## citation_ids
CIT-FND-DRUG-METABOLISM-01-VERIFY | CIT-FND-AGEING-PK-01-VERIFY
## verification_status
verified
## confidence
0.85
## qualifiers
why: The cited ageing claim names metabolism as one of the two processes that decline, so metabolism must be understood first.
## reviewer
Dr Omar
## reviewed_at
2026-08-12

---

# Item
## source
CON-FND-02C545DB43902B
## type
prerequisite_of
## target
CON-FND-95DE7C48E637EB
## evidence_claim_ids
CLM-FND-HALF-LIFE-01 | CLM-FND-RENAL-IMPAIRMENT-PK-01
## citation_ids
CIT-FND-HALF-LIFE-01-VERIFY | CIT-FND-RENAL-IMPAIRMENT-PK-01-VERIFY
## verification_status
needs_evidence
## confidence
0.7
## qualifiers
why: Impaired excretion lengthens half-life, which is how the change is seen in practice. Both endpoints are cited and neither states the link.
## reviewer
Dr Omar
## reviewed_at
2026-08-12
