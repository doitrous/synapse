# Item

## id
CON-FND-A10D3E6030F49D

## label
Prokaryotic RNA polymerase is one multi-subunit holoenzyme, and its sigma subunit directs initiation by recognising the Pribnow box

## canonical_key
transcription.prokaryotic-initiation.sigma-holoenzyme-pribnow-box

## aliases
Sigma factor
Holoenzyme versus core enzyme
Pribnow box
-10 box
Bacterial RNA polymerase

## arabic_label
الإنزيم الكامل لبوليميريز الرنا البكتيري وعامل سيجما وصندوق بريبنو

## arabic_aliases
عامل سيجما

## definition
Bacteria transcribe every class of RNA — mRNA, rRNA and tRNA alike — with a single RNA polymerase, in contrast to eukaryotes, which use three separate polymerases (I, II and III). That single bacterial enzyme is itself an aggregate of several different subunits, which is why it is called a holoenzyme rather than a simple enzyme. The holoenzyme is the core enzyme (the catalytic subunits alone, sufficient for elongation but not accurate initiation) plus a detachable sigma subunit. Sigma factor is what lets the holoenzyme recognise the correct promoter and start transcription at the right site — specifically the Pribnow box, a consensus sequence (TATAAT) centred about ten base pairs upstream of the transcription start site.

## explicit_objective
Identify sigma factor as the RNA polymerase subunit responsible for promoter recognition and transcription initiation, name TATAAT as the Pribnow box consensus sequence, and state that bacteria transcribe every RNA class with one holoenzyme rather than three separate polymerases.

## pitfalls
Assuming bacteria have separate RNA polymerases for mRNA, rRNA and tRNA the way eukaryotes do — a single bacterial RNA polymerase (the holoenzyme) transcribes all three, with sigma factor as the swappable subunit that changes which class of promoter it recognises.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T01-S01-M03

## topic
Molecular biology

## subtopic
Transcription

## microtopic
Prokaryotic transcription apparatus

## nanotopic

## modules
ASU-MBG

## article_ids
ART-FND-PROKARYOTIC-TRANSCRIPTION-APPARATUS

## related_article_ids
ART-FND-TRANSCRIPTION-CODE-TRANSLATION

## related_concept_ids
CON-FND-E5651C6097AEC7

## resource_ids
src_d83a3017c760e2770c22

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
asu

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y1=0.3

## clinical_relevance
0.2

## academic_relevance
0.8

## weight_confidence
0.3

## confidence
0.85

## atomic_claim_ids
CLM-FND-SIGMA-HOLOENZYME-PRIBNOW-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Sigma factor: a- A subunit of RNA polymerase responsible for the initiation of transcription."
"The initiation site for transcription is recognized by: c- Sigma factor."
"RNA polymerase actually [is an] aggregate of several different subunits, so it is often called: a- Holoenzyme."
"How many RNA polymerases are present in a bacterial system? c- 1."
"What is the consensus sequence of the Pribnow box? b- TATAAT."

## merge_ids

## rejected_merge_candidate_ids

## conflicts

## uncertainty
None beyond the standard undergraduate teaching level for this fact.

## evidence_gaps
Evidence must be attached before publication. This concept's own claim currently cites only the module's tier-3 tutoring compilation as the local exam-signal source; the mechanism itself (sigma factor, holoenzyme, Pribnow box) is universal, non-controversial molecular biology taught in every standard textbook (e.g. Lehninger Principles of Biochemistry, Molecular Biology of the Gene), but no specific textbook page has been verified and cited for it this pass — a genuine department-book or standard-textbook citation with a page number would still strengthen this before publication.

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
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored per the chief-of-staff's tested-but-untaught ruling on this session's dispatch; this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for "sigma factor", "Pribnow box" and "holoenzyme" before minting (find-existing.mjs) — the one "holoenzyme" hit is a glossary term (Kasr's 102-INT-glossary.md), a different content type, not a concept duplicate.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Related to CON-FND-E5651C6097AEC7 (prokaryotic termination) as the initiation half of the same apparatus. Related-article link to ART-FND-TRANSCRIPTION-CODE-TRANSLATION (Alexandria's eukaryotic transcription article) since the two are the natural prokaryote/eukaryote contrast pair a student needs; not merged since that article is eukaryote-only per this lane's own triage note. No typed-edge relations batch written this pass; deferred to a follow-up relations pass.
scopeRuling: Authored per chief-of-staff ruling on this session's dispatch (2026-08-28) — 5 of this module's 8 banked-but-uncovered prokaryotic-apparatus questions (Q49, Q58, Q76, Q80, Q81, "RNA Structure & Transcription" chapter, keys from that chapter's own answer table on PDF p.15) test exactly this fact set (sigma factor, holoenzyme, Pribnow box, one bacterial RNA polymerase) and no wider — tested-but-untaught, not invented demand.

---

# Item

## id
CON-FND-E5651C6097AEC7

## label
Prokaryotic transcription terminates either through rho factor or through an intrinsic G-C-rich hairpin, with no dedicated helicase needed to unwind the DNA

## canonical_key
transcription.prokaryotic-termination.rho-dependent-and-intrinsic

## aliases
Rho factor
Rho-dependent termination
Intrinsic termination
Rho-independent termination

## arabic_label
إنهاء النسخ البكتيري المعتمد على عامل رو والإنهاء الجوهري

## arabic_aliases
عامل رو

## definition
Bacterial transcription ends in one of two ways. Rho-dependent termination needs the rho protein, which follows behind RNA polymerase along the growing transcript and eventually catches up to it, unwinding the RNA-DNA hybrid and releasing both the polymerase and the finished RNA. Intrinsic (rho-independent) termination needs no separate protein factor at all: a G-C-rich, self-complementary sequence near the 3' end of the new RNA folds back on itself into a hairpin, and that hairpin combined with a following run of U residues destabilises the RNA-DNA hybrid enough to release the transcript on its own. Neither mechanism, nor initiation, needs a dedicated helicase enzyme to unwind the DNA ahead of the polymerase — RNA polymerase itself locally opens the double helix it is transcribing, unlike DNA replication, which does depend on a dedicated helicase.

## explicit_objective
Distinguish rho-dependent from intrinsic (rho-independent) bacterial transcription termination, and state that transcription needs no dedicated helicase enzyme the way DNA replication does.

## pitfalls
Assuming every bacterial transcript needs the rho protein to terminate — a G-C-rich hairpin followed by a run of U residues terminates transcription on its own, with no protein factor required.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T06

## secondary_node_ids
SYS-FND-T01-S01-M03

## topic
Molecular biology

## subtopic
Transcription

## microtopic
Prokaryotic transcription apparatus

## nanotopic

## modules
ASU-MBG

## article_ids
ART-FND-PROKARYOTIC-TRANSCRIPTION-APPARATUS

## related_article_ids
ART-FND-TRANSCRIPTION-CODE-TRANSLATION

## related_concept_ids
CON-FND-A10D3E6030F49D

## resource_ids
src_d83a3017c760e2770c22

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
asu

## blueprint_weight
0.25

## exam_weight_by_year
ASU_Y1=0.25

## clinical_relevance
0.2

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.85

## atomic_claim_ids
CLM-FND-RHO-INTRINSIC-TERMINATION-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The function of Rho factor is to: c- Required for termination of transcription."
"Intrinsic factor termination: c- Sequence rich in G-C inverted repeated in 3' end of mRNA."
"This enzyme is NOT present in transcription? b- Helicase activity."

## merge_ids

## rejected_merge_candidate_ids

## conflicts

## uncertainty
None beyond the standard undergraduate teaching level for this fact.

## evidence_gaps
Evidence must be attached before publication. As with the paired initiation concept, this rests on the module's tier-3 tutoring compilation only; the mechanism is standard undergraduate molecular biology, but no specific textbook page has been verified and cited this pass.

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
microtopicId: Free-text title given (see microtopic); not guaranteed to resolve against the curriculum-overlay MIC_ catalog, so recorded as a possible blank with this reason rather than left unexplained.
nanotopicId: No nanotopic-level overlay node is more precise than the microtopic already given.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored per the chief-of-staff's tested-but-untaught ruling on this session's dispatch; this concept has no corpus pipeline-extraction record.
sourceCandidateIds: Searched live state, docs/import-ready and every docs/*-Source-Imports concept batch for "rho factor" before minting (find-existing.mjs) — zero hits anywhere.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Related to CON-FND-A10D3E6030F49D (prokaryotic initiation apparatus) as the termination half of the same apparatus. Same related-article reasoning as that concept. No typed-edge relations batch written this pass; deferred to a follow-up relations pass.
scopeRuling: Authored per chief-of-staff ruling on this session's dispatch (2026-08-28) — the remaining 3 of this module's 8 banked-but-uncovered prokaryotic-apparatus questions (Q35, Q37, Q48, same chapter and answer table as the paired concept) test exactly this fact set (rho-dependent vs intrinsic termination, no dedicated transcription helicase) and no wider.
