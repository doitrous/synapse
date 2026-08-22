<!--
  Lane W1-103-HIST. AU-MED-103 (Blood and Immune System & Medical Terminology),
  Histology department.

  Five sparse updates against LIVE concept ids. `## label` IS restated here,
  verbatim from live state. This lane found, independently, that
  `conceptFromRow` (src/data/conceptImport.ts:148) defaults `label` to '' rather
  than undefined when a row is silent on it -- unlike `definition`, one field
  below, which the code deliberately keeps undefined for exactly this reason --
  and `mergeAuthoringData` only skips `undefined`, so an update row that omits
  `## label` silently blanks a LIVE concept's real label on merge (confirmed by
  simulating a no-label version of this file: every one of these five came back
  with `label: ""`). The merged validator fix (d82dd36) now requires `## label`
  on every concept row regardless, which closes this from the batch-validator
  side; restating the real label here closes it from the merge side too.

  `## module_subject` and `## exam_signal` are dropped from these five, not
  merely left un-+ed: `d82dd36` (Refuse a + on a column that cannot take one)
  confirms neither column supports append, so a bare value would be a full
  replacement. Checked directly: all five currently carry
  `moduleSubject: undefined` and `examSignal: undefined` live, so nothing is
  destroyed by omitting them here -- but writing a bare value would only be
  safe by accident, and the pending-live sibling file hits the destructive case
  for real. The AU exam appearance for each is recorded in `field_notes`
  `universityNotes:` prose instead. Concepts carry no `years` import column
  (checked against CONCEPT_IMPORT_FIELDS in src/data/conceptImport.ts) -- only
  `learner_years` (numeric) and `universities`/`modules` exist, so the year overlay
  lives on the article and question records instead. Five NEW concepts, minted with tools/mint-concept-id.mjs
  after a >=4-query find-existing.mjs search plus
  grep -ril "<canonical_key-ish term>" docs/*-Source-Imports/concept/ turned up
  nothing (see coverage/AU-MED-103-histology-triage.md's ordered-idea table,
  rows 2, 5, 6, 18, 23), full concept records to the 02-concepts.md floor.

  Gates:
    npm run medical:simulate -- "docs/Alexandria-Source-Imports/concept/AU-MED-103-histology-concepts.md" --emit /tmp/sim-AU-MED-103-histology-concepts.json
    npm run medical:audit -- --source /tmp/sim-AU-MED-103-histology-concepts.json
-->

# Item

## id
CON-HEM-23E454BD997B29

## canonical_key
teaching.biconcave.flexibility

## label
Biconcavity increases flexibility through small capillaries

## universities
+au

## modules
+AU-MED-103

## field_notes
universityNotes: MED 103's EOM paper (EOM - Blood End Egyptian 1, Q30) asks what is responsible for the flexibility of the RBC membrane, against distractors naming the glycocalyx and the absent nucleus/organelles; this record's biconcave-shape mechanism is the keyed answer.

---

# Item

## id
CON-HEM-9D43F05669BB37

## canonical_key
teaching.rbc.glycocalyx

## label
Erythrocyte glycocalyx carries ABO and Rh blood-group antigenic sites

## universities
+au

## modules
+AU-MED-103

## field_notes
universityNotes: Tested only as a distractor on MED 103's EOM - Blood End Egyptian 1, Q30 ("well developed glycocalyx", rejected in favour of the biconcave-shape mechanism above) — recorded because the question's explanation needs it, not because it is the main concept there.

---

# Item

## id
CON-HEM-D86697439C5923

## canonical_key
teaching.reticulocyte.stain

## label
Brilliant cresyl blue supravital stain demonstrates reticulocytes

## universities
+au

## modules
+AU-MED-103

## field_notes
universityNotes: Tested on two MED 103 EOM papers — EOM - Blood end wafdeen final Q23 asks which organelle gives the reticulate pattern on cresyl blue (ribosomes), and EOM - Blood Final Egyptian final Q62 asks which cell rises with accelerated erythropoiesis (reticulocyte); both are this record's own stain mechanism.

---

# Item

## id
CON-HEM-3DC3EAA5D4D84B

## canonical_key
teaching.platelet.megakaryocyte

## label
Bone-marrow megakaryocytes produce platelets

## universities
+au

## modules
+AU-MED-103

## field_notes
universityNotes: The Practical Blood Questions bank's Histology Spot 7c asks for the megakaryocyte on a bone-marrow (myeloid tissue) diagram; this record's platelet-production fact is what the identification rests on.

---

# Item

## id
CON-HEM-CCD8EB004C7E24

## canonical_key
teaching.platelet.ocs

## label
Open canalicular system supports extracellular calcium uptake and intracellular secretion

## universities
+au

## modules
+AU-MED-103

## field_notes
universityNotes: MED 103's EOM paper (EOM - Blood Final Egyptian final, Q49) asks which statement about the open canalicular system is true against distractors naming the dense tubular system and the granulomere; this record's own description is the keyed answer.

---

# Item

## id
CON-HEM-786A979CC7B733

## label
Haemoglobin in the red cell is concentrated at the periphery, not spread evenly through the cytoplasm

## canonical_key
rbc.hemoglobin.peripheral-distribution

## definition
On electron microscopy the red cell's haemoglobin is not distributed evenly through the cytoplasm: it is more concentrated at the periphery, immediately under the membrane, than in the centre of the biconcave disc. The cell has no nucleus and no other organelles, so nothing but haemoglobin occupies that cytoplasm.

## explicit_objective
State where haemoglobin is most concentrated within the red cell's cytoplasm on electron microscopy, and distinguish this distribution fact from the separate question of why the cell is flexible.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
haem

## primary_node_id
DIS-HIS-T03

## secondary_node_ids
SYS-HEM-T01-S01

## topic
Organ histology

## subtopic
Blood cell ultrastructure

## microtopic
Red blood cell

## nanotopic

## modules
+AU-MED-103

## article_ids
ART-HEM-AU103-RBC-BONE-MARROW

## related_article_ids
ART-HEM-TOP-D3C13B01E3

## related_concept_ids
CON-HEM-23E454BD997B29

## resource_ids
src_31fc3d2567adf6ff8074

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
au

## blueprint_weight
0.3

## exam_weight_by_year
AU_Y1=0.3

## clinical_relevance
0.2

## academic_relevance
0.85

## exam_signal
src_c9c9ca53cfa1321d0508 | end_of_module | | p1

## weight_confidence
0.3

## confidence
0.7

## atomic_claim_ids
CLM-3817DFB7BAB3
CLM-D38B2A6CA678

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Cytoplasm: hemoglobin occupies about 33% of the corpuscular volume & is more concentrated at the periphery."

## merge_ids

## rejected_merge_candidate_ids
CON-HEM-23E454BD997B29

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
arabicLabel: No standard Arabic term for this specific ultrastructural fact is in undergraduate use in Egypt; students use the English description.
aliases: No abbreviation or alternate name for this distribution fact is in undergraduate use.
pitfalls: No department-book or examiner pitfall statement was found for this specific distribution fact; the module's actual student pitfall is on the sibling flexibility concept (CON-HEM-23E454BD997B29) instead.
microtopicId: The canonical placement (DIS-HIS-T03, Organ histology) is already more precise than a separate microtopic string would add.
nanotopicId: The microtopic placement is already more precise than any nanotopic would be.
moduleIds: No verified live module ID field exists on this record type beyond the modules column above; the module attachment is carried there.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the department book (src_31fc3d2567adf6ff8074) via the question-led triage, not a pipeline extraction; no corpus extraction record exists for this concept.
sourceCandidateIds: This concept was authored directly from a catalogued department source (src_31fc3d2567adf6ff8074), not discovered via corpus candidate search — there is no separate candidate to record.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
rejectedMergeCandidateIds: CON-HEM-23E454BD997B29 (biconcavity increases flexibility) is the mechanism question ("why is the cell flexible"); this record answers a different question ("where does the haemoglobin sit"). A single MED 103 question (Q4 on the wafdeen paper) tests this record alone, and a different one (Q30, Egyptian paper) tests the flexibility mechanism — two questions, two objectives, kept separate rather than stapled into one concept.
relationships: Walked the concepts under DIS-HIS-T03 and SYS-HEM-T01-S01 (their labels are the only handle available without a working canonical-node browser in this pass); the closest neighbour is CON-HEM-23E454BD997B29, recorded above as related_concept_ids and as a considered-and-rejected merge. No typed edge written — the two facts sit side by side in the same paragraph of the department book without one causing the other, so an untyped neighbour link is the honest relationship, not a typed one.

---

# Item

## id
CON-HEM-2D18E46BA15483

## label
Haemoglobin synthesis in the erythroid series completes at the normoblast stage, one stage after the cell loses the capacity to divide

## canonical_key
erythropoiesis.series.stage-landmarks

## definition
Erythropoiesis runs proerythroblast, basophilic erythroblast, polychromatophilic erythroblast, normoblast (orthochromatic erythroblast), reticulocyte, mature erythrocyte. Two landmarks sit on that series: the polychromatophilic erythroblast is the last stage capable of mitosis, and hemoglobin synthesis is not complete until the following stage, the normoblast, whose acidophilic, condensed nucleus is then extruded.

## explicit_objective
Place the erythroid series in order and name which stage loses the capacity to divide and which stage first carries a complete haemoglobin content.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
haem

## primary_node_id
SYS-HEM-T01-S01-M01

## secondary_node_ids
DIS-HIS-T03

## topic
Hematopoiesis and blood science

## subtopic
Blood cell development

## microtopic
Erythropoiesis

## nanotopic

## modules
+AU-MED-103

## article_ids
ART-HEM-AU103-RBC-BONE-MARROW

## related_article_ids
ART-HEM-TOP-672DDE9D3A

## related_concept_ids
CON-HEM-D86697439C5923

## resource_ids
src_31fc3d2567adf6ff8074

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
au

## blueprint_weight
0.35

## exam_weight_by_year
AU_Y1=0.35

## clinical_relevance
0.25

## academic_relevance
0.9

## exam_signal
src_56bc398ce32f0140fc29 | end_of_module | | p11

## weight_confidence
0.3

## confidence
0.7

## atomic_claim_ids
CLM-28028B8512F4
CLM-5FE9685AC3FD

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"4- Proerythroblasts: They are the first recognizable erythrocyte precursor."

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
arabicLabel: No standard Arabic term for this staged-landmark fact is in undergraduate use in Egypt; students use the English stage names.
aliases: No abbreviation or alternate name for this staged sequence is in undergraduate use beyond the stage names already in the definition.
pitfalls: The department book states the two landmarks as plain fact with no worked "students get this wrong" example; the exam-derived pitfall (placing the landmark one stage early or late) is carried in the article's lose_the_mark instead.
microtopicId: The canonical placement (SYS-HEM-T01-S01-M01, Erythropoiesis) is already more precise than a separate microtopic string would add.
nanotopicId: The microtopic placement is already more precise than any nanotopic would be.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the department book (src_31fc3d2567adf6ff8074) via the question-led triage, not a pipeline extraction; no corpus extraction record exists for this concept.
sourceCandidateIds: Authored directly from a catalogued department source (src_31fc3d2567adf6ff8074); no separate candidate search applies.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
rejectedMergeCandidateIds: No near-miss surfaced in the >=4-query search (erythropoiesis, normoblast, proerythroblast, polychromatophilic all returned nothing in any *-Source-Imports concept batch).
relationships: Walked the concepts under SYS-HEM-T01-S01 (this batch's own siblings — CON-HEM-D86697439C5923 above, the reticulocyte, is the terminal step of this same series) and the pending granulopoiesis-series record in pending-live territory (CON-HEM-A4B2A60B89E976, below), which is the parallel myeloid-series landmark. Wrote related_concept_ids to the reticulocyte concept; the granulopoiesis parallel is same-topic proximity only, not a typed edge, because nothing in the department book states a causal or sequential relation between the two series.

---

# Item

## id
CON-HEM-A4B2A60B89E976

## label
The specific (secondary) granules of a granulocyte first appear at the myelocyte stage of granulopoiesis

## canonical_key
granulopoiesis.series.specific-granule-stage

## definition
Granulopoiesis runs myeloblast, promyelocyte, myelocyte, metamyelocyte, band form, segmented granulocyte. The promyelocyte carries only azurophilic (primary) granules, still producing them; at the myelocyte stage the specific granules that distinguish neutrophils, eosinophils and basophils from one another first appear, alongside a fall in basophilia and a rise in eosinophilia as the specific granules accumulate.

## explicit_objective
Name the granulopoiesis stage at which a granulocyte's specific (secondary) granules first appear, and distinguish that stage from the promyelocyte stage that precedes it.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
haem

## primary_node_id
SYS-HEM-T01-S01-M02

## secondary_node_ids
DIS-HIS-T03

## topic
Hematopoiesis and blood science

## subtopic
Blood cell development

## microtopic
Leukopoiesis

## nanotopic

## modules
+AU-MED-103

## article_ids
ART-HEM-AU103-RBC-BONE-MARROW

## related_article_ids
ART-HEM-TOP-672DDE9D3A

## related_concept_ids
CON-HEM-2D18E46BA15483

## resource_ids
src_31fc3d2567adf6ff8074

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
au

## blueprint_weight
0.3

## exam_weight_by_year
AU_Y1=0.3

## clinical_relevance
0.2

## academic_relevance
0.85

## exam_signal
src_56bc398ce32f0140fc29 | end_of_module | | p10

## weight_confidence
0.3

## confidence
0.7

## atomic_claim_ids
CLM-E744661125F3
CLM-043812B52539

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Myelocytes: The specific granules for each type of the granulocytes start to appear in addition to the azurophilic granules."

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
arabicLabel: No standard Arabic term for this staged-landmark fact is in undergraduate use in Egypt; students use the English stage names.
aliases: No abbreviation or alternate name for this staged sequence is in undergraduate use beyond the stage names already in the definition.
pitfalls: The department book states the landmark as plain fact with no worked "students get this wrong" example; the exam-derived pitfall (placing the landmark one stage early) is carried in the article's lose_the_mark instead.
microtopicId: The canonical placement (SYS-HEM-T01-S01-M02, Leukopoiesis) is already more precise than a separate microtopic string would add.
nanotopicId: The microtopic placement is already more precise than any nanotopic would be.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the department book (src_31fc3d2567adf6ff8074) via the question-led triage, not a pipeline extraction; no corpus extraction record exists for this concept.
sourceCandidateIds: Authored directly from a catalogued department source (src_31fc3d2567adf6ff8074); no separate candidate search applies.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
rejectedMergeCandidateIds: No near-miss surfaced in the >=4-query search (granulopoiesis, myelocyte, promyelocyte, metamyelocyte, band neutrophil all returned nothing in any *-Source-Imports concept batch).
relationships: Same-topic proximity to CON-HEM-2D18E46BA15483 (erythropoiesis series) recorded as related_concept_ids — the two are parallel bone-marrow maturation series, not one causing the other, so no typed edge.

---

# Item

## id
CON-HEM-2C5153657AD1AE

## label
Lymphopoiesis happens in the primary lymphoid organs; immune responses are mounted in the secondary ones

## canonical_key
lymphoidorgans.classification.primary-secondary

## definition
Lymphoid organs split into two functional classes. Primary (central) lymphoid organs — the thymus and bone marrow — are where lymphocytes develop and mature; this is where lymphopoiesis itself takes place. Secondary (peripheral) lymphoid organs — lymph nodes, the spleen and lymphoid nodules such as the tonsils — are where mature lymphocytes meet antigen and mount an immune response, not where they are made.

## explicit_objective
State which class of lymphoid organ is the site of lymphopoiesis, name the organs in each class, and distinguish "where lymphocytes are made" from "where they respond to antigen".

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
haem

## primary_node_id
SYS-HEM-T01-S01-M02

## secondary_node_ids
SYS-IMM-T01

## topic
Hematopoiesis and blood science

## subtopic
Blood cell development

## microtopic
Leukopoiesis

## nanotopic

## modules
+AU-MED-103

## article_ids
ART-HEM-AU103-LYMPHOID-ORGANS

## related_article_ids
ART-IMM-TOP-B42C277725

## related_concept_ids
CON-HEM-3E38A04641F73C

## resource_ids
src_31fc3d2567adf6ff8074

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
au

## blueprint_weight
0.3

## exam_weight_by_year
AU_Y1=0.3

## clinical_relevance
0.2

## academic_relevance
0.85

## exam_signal
src_c9c9ca53cfa1321d0508 | end_of_module | | p2

## weight_confidence
0.3

## confidence
0.75

## atomic_claim_ids
CLM-6B26CE70062A
CLM-9225D5FA5051
CLM-8931AA6C4CBD

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"1- Primary (central) lymphoid organs: These are the sites for development & maturation of lymphocytes. They include: Thymus. Bone marrow. 2- Secondary (peripheral) lymphoid tissues: These are the sites where lymphoid cells react with foreign antigens to elicit an immunological response."

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
arabicLabel: No standard Arabic term for this classification is in undergraduate use in Egypt; students use the English "primary/secondary lymphoid organ" terms.
aliases: No established synonym beyond the department book's own "central"/"peripheral" alternate naming, already carried in the definition.
pitfalls: No department-book or examiner pitfall statement was found beyond the definition's own contrast; the closest exam pitfall (confusing the two classes) is folded into the article's lose_the_mark instead.
microtopicId: The canonical placement (SYS-HEM-T01-S01-M02, Leukopoiesis) is already more precise than a separate microtopic string would add.
nanotopicId: The microtopic placement is already more precise than any nanotopic would be.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the department book (src_31fc3d2567adf6ff8074) via the question-led triage, not a pipeline extraction; no corpus extraction record exists for this concept.
sourceCandidateIds: Authored directly from a catalogued department source (src_31fc3d2567adf6ff8074); no separate candidate search applies.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
rejectedMergeCandidateIds: A pending Kasr concept (CON-HEM-BA8773E5D84286 / CON-HEM-3E38A04641F73C, thymus-specific "primary lymphoid organ" facts) names the thymus as a primary lymphoid organ but never states the general two-class split or names lymphopoiesis as the primary organs' defining activity — recorded as related_concept_ids rather than merged, because the general classification and the thymus-specific special-features fact answer different questions.
relationships: Walked the pending-live thymus records this same lane authored (CON-HEM-BA8773E5D84286, CON-HEM-3E38A04641F73C); the thymus's own "primary lymphoid organ" fact is the clearest neighbour and is recorded above as related_concept_ids. No typed edge written pending a relations pass across the whole module.

---

# Item

## id
CON-HEM-157B01DD5EAEB6

## label
The reticulo-endothelial system is the body's tissue-macrophage network, and its defence is phagocytosis

## canonical_key
reticuloendothelialsystem.function.defence

## definition
The reticulo-endothelial (mononuclear phagocyte) system is the diffuse network of phagocytic cells fixed in connective tissue and the walls of blood sinusoids throughout the body — the macrophages of the spleen, liver, lymph nodes, lungs and elsewhere. Its role in the body's defences is phagocytosis: it clears particulate matter, spent cells and micro-organisms from the blood and tissues.

## explicit_objective
State what the reticulo-endothelial system is made of and name phagocytosis as the mechanism by which it contributes to the body's defences.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
imm

## primary_node_id
SYS-IMM-T01-S01-M03

## secondary_node_ids
SYS-HEM-T01-S01-M02

## topic
Normal immune function

## subtopic
Innate immunity

## microtopic
Phagocytes

## nanotopic

## modules
+AU-MED-103

## article_ids
ART-HEM-AU103-LYMPHOID-ORGANS

## related_article_ids
ART-IMM-TOP-35CFB732FE

## related_concept_ids
CON-HEM-719FA556594454

## resource_ids
src_31fc3d2567adf6ff8074

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
au

## blueprint_weight
0.25

## exam_weight_by_year
AU_Y1=0.25

## clinical_relevance
0.35

## academic_relevance
0.8

## exam_signal
src_49f438279b68a489aa42 | end_of_module | | p5

## weight_confidence
0.3

## confidence
0.65

## atomic_claim_ids
CLM-D8782E0B2E51
CLM-EEFAE0E3C148

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"What is the role of reticulo-endothelial system? ... defenses" [EOM keyed answer, MED 103 EOM - Blood End Egyptian 1, Q25]

## merge_ids

## rejected_merge_candidate_ids
CON-HEM-719FA556594454

## conflicts

## uncertainty
The MED 103 paper's own answer key gives only the single word "defenses" for this question, with no fuller printed rationale; the definition above is reconstructed from the standard reticulo-endothelial/mononuclear-phagocyte-system teaching, not transcribed from a department-book paragraph naming it directly, because this corpus's Histology notes (src_31fc3d2567adf6ff8074) do not carry a dedicated "reticulo-endothelial system" section of their own — recorded rather than left unstated.

## evidence_gaps
Evidence must be attached before publication. In particular, the definition's macrophage-network description is standard teaching rather than a department-book quotation — see uncertainty above.

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
arabicLabel: No standard Arabic term for this system is in undergraduate use in Egypt; students use the English term.
aliases: No established synonym beyond "mononuclear phagocyte system", already carried in the definition.
pitfalls: No department-book or examiner pitfall statement was found for this system specifically; the exam's own distractors (vascular spasm, platelet adhesion) are named instead in this record's rejected_merge_candidate_ids/relationships notes below.
microtopicId: The canonical placement (SYS-IMM-T01-S01-M03, Phagocytes) is already more precise than a separate microtopic string would add.
nanotopicId: The microtopic placement is already more precise than any nanotopic would be.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the question-led triage against the EOM paper; no corpus extraction record exists for this concept.
sourceCandidateIds: The source is the EOM paper itself (src_49f438279b68a489aa42), not a corpus candidate search.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
rejectedMergeCandidateIds: CON-HEM-719FA556594454 (the monocyte/macrophage concept) is the cell-level fact; this record is the tissue-network-level fact the same question's distractors ("defenses" vs "vascular spasm" vs "platelet adhesion") turn on. Related rather than merged because a question could test either without the other.
relationships: Related to CON-HEM-719FA556594454 (monocyte becomes the tissue macrophage) as the cell that populates this system. No typed edge written; a relations pass across the module would likely write a part_of or is_a edge (macrophage is_a member-cell-of reticulo-endothelial system) once the module's relation batch is authored.
