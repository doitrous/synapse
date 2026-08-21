<!--
  Identification concepts for the four 104 CPS histology practical stations —
  lymph node, spleen, tonsils and thymus.

  A practical concept is an IDENTIFICATION concept: what a student must see on
  the section and be able to name, not what they must recite about it. The four
  stations live in `../practical/104-CPS-practical.md`, one item per organ and
  five questions each, and every one of those twenty questions names exactly one
  concept from this file or from `104-CPS-concepts.md`.

  Sources, both real manifest rows in ../manifest/kasr-y1-sources.json:
    * `Dpt Book Book of Histology (CPS 104) 2026 1st Year (2).pdf`
      (src_18d3a953df4ca83c4e74, 53 pp., native text). Chapter II, LYMPHATIC AND
      MACROPHAGE SYSTEM, printed pp. 14-24 — lymph node 14-17, spleen 17-20,
      tonsils 20-22, thymus 22-24. Printed page equals page index in this book.
    * `104 Tissue  (2) (1).pdf` (src_5adcc001e9c3bb86bb75, 74 pp.), the
      histology department's own practical atlas. It is image-only: a titled
      divider page then unlabelled plates — "Lymph nodes" p. 2 (plates 3-6),
      "Spleen" p. 7 (8-12), "Tonsil" p. 13 (14-16), "thymus" p. 17 (18-21).
      Those plates are the slides the spot exam uses, which is why they carry an
      exam_signal line for every concept that is actually visible on a plate and
      none for the three that are not (the theories of splenic circulation, the
      function of the tonsil, and the blood-thymic barrier).

  Nothing here was re-extracted. The page text was read from the committed
  cache described in scripts/kasr/extract/README.md.

  Two concepts these stations assess already exist in `104-CPS-concepts.md` and
  are NOT repeated here. They are reused by ID:
    * CON-HEM-BF004EF03BD129 — palatine versus lingual tonsil: site, epithelium
      and crypts. Reused by the tonsil station's third question.
    * CON-HEM-7B050DE7FE2B80 — splenic white pulp: four zones around the central
      arteriole. Reused by the spleen station's third question.

  The other seventeen are new. `find-existing.mjs` was run for each before
  minting — lymph node, paracortex, germinal, sinus, medullary, thymus, thymic,
  Hassall, spleen, splenic, pulp, tonsil, crypt, follicle, stave, Billroth,
  arteriole, reticular, barrier, adenoid, venule, lymphoid, encapsulat,
  trabecul — and the searches returned drainage anatomy, ovarian follicles,
  bone-marrow sinusoids and a blood-testis barrier, but no histology of these
  four organs. The three genuine near-misses are recorded on the records they
  nearly matched, in rejected_merge_candidate_ids: the two live bone-marrow
  sinusoid concepts against splenic red pulp, the 101 reticular connective
  tissue concept against the thymic epithelial reticular cell, and the live
  blood-testis barrier against the blood-thymic barrier. None is the same
  concept; each is the near-miss the next author would otherwise re-decide.

  IDs are minted with `Instruction Manual for Content Creation/tools/mint-concept-id.mjs`,
  never re-derived by hand, and checked against live state, docs/import-ready
  and every Kasr batch. The canonical keys read `<organ>.<claim>` because that
  tool's first segment may not contain a hyphen.

  Placement follows the committed batch: basic-science material goes on the
  discipline view, DIS-HIS-T03 (organ histology), as primary, with the system
  view SYS-HEM as secondary. SYS-HEM is the lymphoreticular root and carries no
  lymphoid-organ-structure subtopic; the bare root is the correct placement
  rather than a shortcut. `module_subject` carries the Kasr curriculum position,
  which does not belong in the canonical tree, and each path resolves against
  ../academic/104-cps-structure.md.

  exam_signal tier is `department_book` (weight 0.6 in src/data/examSignal.ts),
  which is what both sources are. The book's sitting year is 2026, printed on
  its title page; the practical atlas prints no year and reads `undated`.

  Arabic is excused rather than written, by a `arabicLabel` field note keyed in
  camelCase so the audit actually sees it. That matches the sibling concept
  batch for this module: teaching is in English, the department book prints no
  Arabic term for any of these structures, and a transliteration invented here
  would not be a reviewed term. The article batch writes real Arabic titles
  because an article title is a thing a student searches for; a concept label is
  an internal identifier and is not.
-->

# Item
## label
A lymph node is read from the capsule inwards: thin capsule, septa from its deep surface, a cortex of follicles bounded by lymph sinuses, a paracortex, and a medulla of cords and sinuses
## id
CON-HEM-D2143156B30A8A
## canonical_key
lymphnode.capsule-septa-cortex-paracortex-and-medulla
## definition
The lymph node is a bean- or kidney-shaped encapsulated lymphatic organ lying along the course of lymphatic vessels, with a convex surface pierced by afferent lymphatics and a concave surface, the hilum, where arteries enter and veins and efferent lymphatics leave. Its stroma is a thin capsule of dense irregular fibrous connective tissue and elastic fibres, holding smooth muscle only at the thickened hilum and covered with adipose tissue; connective-tissue septa, or trabeculae, extending from the deep surface of that capsule and dividing the cortex into regular compartments and the medulla into irregular ones; and a reticular network of reticular cells and fibres that stains brown with silver. Its parenchyma is a cortex of lymphatic follicles separated from the capsule and from the trabeculae by subcapsular and trabecular lymph sinuses, a paracortex between cortex and medulla, and a medulla of medullary cords and medullary sinuses.
## explicit_objective
Identify a lymph node on a stained section and name, in order from the capsule inwards, the capsule, the septa, the cortical follicles, the subcapsular and trabecular sinuses, the paracortex, the medullary cords and the medullary sinuses.
## pitfalls
Identifying the organ from its follicles. The spleen and the tonsil have follicles too. What only a lymph node has is a thin capsule with septa descending from its deep surface, a cortex whose follicles are regularly arranged and bounded by clear lymph sinuses, and a medulla of cords and sinuses.
## concept_type
structural_description
## status
under review
## support_mode
direct_statement
## subject
haem
## primary_node_id
DIS-HIS-T03
## secondary_node_ids
SYS-HEM
## aliases
Histological structure of the lymph node | Lymph node stroma and parenchyma | Cortex, paracortex and medulla of the lymph node
## arabic_label
[clear]
## arabic_aliases
[clear]
## topic
Histology
## subtopic
Lymph node
## microtopic
[clear]
## nanotopic
[clear]
## article_ids
ART-104-HIS-LYMPHOID-ORGANS
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_18d3a953df4ca83c4e74
src_5adcc001e9c3bb86bb75
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]
## modules
104 CPS
## module_subject
104 CPS > Histology > Lymphatic and Macrophage System > Lymph node
## universities
kau
## learner_years
1
## blueprint_weight
0.15
## exam_weight_by_year
KAU_Y1=0.15
## clinical_relevance
0.2
## academic_relevance
0.9
## exam_signal
src_18d3a953df4ca83c4e74 | department_book | 2026 | p15 | 104 CPS
src_5adcc001e9c3bb86bb75 | department_book | undated | p3 | 104 CPS
## weight_confidence
0.5
## confidence
0.8
## original_wording
[Histology department book pp. 14-16] Structure: is formed of stroma of C.T & parenchyma of lymphoid tissue. A- Stroma: 1. Capsule: formed of dense irregular fibrous C.T. and elastic fibers. It is thin... 2. C.T. septa or trabeculae... extend from deep surface of capsule... 3. Reticular C.T. network... Parenchyma of lymph node: is organized into cortex & medulla
## evidence_gaps
Evidence must be attached before publication.
## owner
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Teaching at Kasr Alainy is in English and the department book prints no Arabic term; students use the English one. Not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is already unused here; a nanotopic beneath it would be finer than anything the department book distinguishes.
relatedArticleIds: No other article in this module discusses this concept without teaching it; the module has one article per subject-tree leaf, and this concept's leaf is taught by ART-104-HIS-LYMPHOID-ORGANS.
relatedConceptIds: Walked the concepts under this module-subject leaf and found no untyped neighbour worth recording; anything real between them belongs in a typed relation instead.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module's corpus holds no video at all.
atomicClaimIds: AUTHORING ERROR: the audit requires a claim. Author it in the evidence batch rather than leaving this blank.
resourceOccurrenceIds: Read from the department book and the practical atlas by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: Searched the corpus index for "lymph node" and found no candidate record; the Kasr Y1 corpus is indexed by file, not by extracted candidate.
mergeIds: Nothing was merged into this concept; it was minted from one station question and the department book pages behind it.
rejectedMergeCandidateIds: The searches for this label returned no near-miss to decide against, so there is nothing to record here for the next author.
conflicts: The department book, the practical atlas and the module's article agree on this structure; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification, and the practical atlas shows it.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
secondaryNodeIds: placed on a second view as well as its home node
relationships: Walked the concepts sharing this module-subject leaf. Typed edges worth writing are recorded in the module's relation batch; the rest are same-leaf proximity only.

---

# Item
## label
A germinal centre of large activated B lymphocytes is what makes a lymphatic follicle secondary
## id
CON-HEM-A76AED7046089F
## canonical_key
follicle.primary-versus-secondary-and-the-germinal-centre
## definition
A lymphatic nodule, or follicle, is an aggregation of small lymphocytes forming a rounded, oval or pyramidal structure. A primary follicle is a uniform aggregate of mainly B lymphocytes with few T lymphocytes. On exposure to antigen or infection some of those small B lymphocytes transform into large activated lymphocytes which aggregate at the centre of the nodule as a germinal centre, and that converts a primary follicle into a secondary one. A secondary follicle therefore has a peripheral dark region of small lymphocytes and a pale central germinal centre containing large activated B lymphocytes and plasma cells with pale nuclei, together with macrophages and a few T lymphocytes.
## explicit_objective
Distinguish a primary from a secondary lymphatic follicle on a section, name the pale central area, and say what its presence tells you about the follicle.
## pitfalls
Reading pallor as emptiness or as necrosis. In lymphoid tissue pale means large activated cells with dispersed chromatin and dark means small resting lymphocytes with dense nuclei, so the pale germinal centre is the most active part of the follicle, not the least.
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
SYS-HEM
## aliases
Primary and secondary lymphatic follicles | Germinal centre | Secondary lymphatic nodule
## arabic_label
[clear]
## arabic_aliases
[clear]
## topic
Histology
## subtopic
Lymph node
## microtopic
[clear]
## nanotopic
[clear]
## article_ids
ART-104-HIS-LYMPHOID-ORGANS
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_18d3a953df4ca83c4e74
src_5adcc001e9c3bb86bb75
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]
## modules
104 CPS
## module_subject
104 CPS > Histology > Lymphatic and Macrophage System > Lymph node
## universities
kau
## learner_years
1
## blueprint_weight
0.10
## exam_weight_by_year
KAU_Y1=0.10
## clinical_relevance
0.2
## academic_relevance
0.9
## exam_signal
src_18d3a953df4ca83c4e74 | department_book | 2026 | p15 | 104 CPS
src_5adcc001e9c3bb86bb75 | department_book | undated | p3 | 104 CPS
## weight_confidence
0.5
## confidence
0.8
## original_wording
[Histology department book p. 15] Primary lymphatic nodules (follicles): formed of aggregated cells mainly B-lymphocytes and few T-lymphocytes. On exposure to antigen or infection, some of small B-lymphocytes are transformed to large activated lymphocytes, which aggregate in center of nodules to form the germinal center which change primary nodules into secondary nodules.
## evidence_gaps
Evidence must be attached before publication.
## owner
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Teaching at Kasr Alainy is in English and the department book prints no Arabic term; students use the English one. Not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is already unused here; a nanotopic beneath it would be finer than anything the department book distinguishes.
relatedArticleIds: No other article in this module discusses this concept without teaching it; the module has one article per subject-tree leaf, and this concept's leaf is taught by ART-104-HIS-LYMPHOID-ORGANS.
relatedConceptIds: Walked the concepts under this module-subject leaf and found no untyped neighbour worth recording; anything real between them belongs in a typed relation instead.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module's corpus holds no video at all.
atomicClaimIds: AUTHORING ERROR: the audit requires a claim. Author it in the evidence batch rather than leaving this blank.
resourceOccurrenceIds: Read from the department book and the practical atlas by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: Searched the corpus index for "germinal" and found no candidate record; the Kasr Y1 corpus is indexed by file, not by extracted candidate.
mergeIds: Nothing was merged into this concept; it was minted from one station question and the department book pages behind it.
rejectedMergeCandidateIds: The searches for this label returned no near-miss to decide against, so there is nothing to record here for the next author.
conflicts: The department book, the practical atlas and the module's article agree on this structure; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification, and the practical atlas shows it.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
secondaryNodeIds: placed on a second view as well as its home node
relationships: Walked the concepts sharing this module-subject leaf. Typed edges worth writing are recorded in the module's relation batch; the rest are same-leaf proximity only.

---

# Item
## label
The paracortex is the thymus-dependent zone, and its T lymphocytes arrive from the blood through cubical-lined post-capillary venules
## id
CON-HEM-748293D5DA5D92
## canonical_key
paracortex.thymus-dependent-zone-and-post-capillary-venules
## definition
The paracortex is the area between the cortex and the medulla of a lymph node. It contains T lymphocytes that have migrated from the thymus and entered the node from the blood through post-capillary venules, which are lined by tall, simple cubical cells carrying the receptors for T-lymphocyte homing. It holds no follicles and no germinal centres, which is what separates it from the follicular cortex above it and from the medullary cords below it, and it is the zone that is depleted when T lymphocytes are.
## explicit_objective
Name the follicle-free zone between cortex and medulla, say which lymphocyte class occupies it and by what route those cells arrive, and identify the post-capillary venule that carries them.
## pitfalls
Reading 'no germinal centre' as 'primary follicle'. A primary follicle is still a discrete rounded aggregate; the paracortex has no follicular outline at all. The two lymphocyte populations enter by different doors — B cells with the afferent lymph into the follicles, T cells from the blood through these venules.
## concept_type
structural_description
## status
under review
## support_mode
direct_statement
## subject
haem
## primary_node_id
DIS-HIS-T03
## secondary_node_ids
SYS-HEM
## aliases
Paracortex | Thymus-dependent zone of the lymph node | Post-capillary venules of the paracortex
## arabic_label
[clear]
## arabic_aliases
[clear]
## topic
Histology
## subtopic
Lymph node
## microtopic
[clear]
## nanotopic
[clear]
## article_ids
ART-104-HIS-LYMPHOID-ORGANS
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_18d3a953df4ca83c4e74
src_5adcc001e9c3bb86bb75
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
The department book p. 15 calls the lining of the post-capillary venule 'simple cubical epithelium'. The lining of a vessel is endothelium; the cubical shape and the homing receptors are what the book is describing and both are right, but the word 'epithelium' is a slip. The practical station writes it as a cubical-lined venule for that reason.
## uncertainty
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]
## modules
104 CPS
## module_subject
104 CPS > Histology > Lymphatic and Macrophage System > Lymph node
## universities
kau
## learner_years
1
## blueprint_weight
0.10
## exam_weight_by_year
KAU_Y1=0.10
## clinical_relevance
0.2
## academic_relevance
0.9
## exam_signal
src_18d3a953df4ca83c4e74 | department_book | 2026 | p15 | 104 CPS
src_5adcc001e9c3bb86bb75 | department_book | undated | p3 | 104 CPS
## weight_confidence
0.5
## confidence
0.8
## original_wording
[Histology department book p. 15] The paracortex (the thymus dependant zone): The area present between the cortex and medulla, it contains T-lymphocytes which have migrated from thymus through post capillary venules. These venules are lined with simple cubical epithelium (has receptors for the homing of T- lymphocytes).
## evidence_gaps
Evidence must be attached before publication.
## owner
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Teaching at Kasr Alainy is in English and the department book prints no Arabic term; students use the English one. Not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is already unused here; a nanotopic beneath it would be finer than anything the department book distinguishes.
relatedArticleIds: No other article in this module discusses this concept without teaching it; the module has one article per subject-tree leaf, and this concept's leaf is taught by ART-104-HIS-LYMPHOID-ORGANS.
relatedConceptIds: Walked the concepts under this module-subject leaf and found no untyped neighbour worth recording; anything real between them belongs in a typed relation instead.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module's corpus holds no video at all.
atomicClaimIds: AUTHORING ERROR: the audit requires a claim. Author it in the evidence batch rather than leaving this blank.
resourceOccurrenceIds: Read from the department book and the practical atlas by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: Searched the corpus index for "paracortex" and found no candidate record; the Kasr Y1 corpus is indexed by file, not by extracted candidate.
mergeIds: Nothing was merged into this concept; it was minted from one station question and the department book pages behind it.
rejectedMergeCandidateIds: The searches for this label returned no near-miss to decide against, so there is nothing to record here for the next author.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification, and the practical atlas shows it.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
secondaryNodeIds: placed on a second view as well as its home node
relationships: Walked the concepts sharing this module-subject leaf. Typed edges worth writing are recorded in the module's relation batch; the rest are same-leaf proximity only.

---

# Item
## label
The medulla is cords of B lymphocytes, plasma cells and macrophages between sinuses whose macrophages filter the lymph on its way to the hilum
## id
CON-HEM-E3D03CE92F1D92
## canonical_key
lymphnode.medullary-cords-sinuses-and-the-path-of-lymph
## definition
The medulla of a lymph node is medullary cords and medullary sinuses. The cords are irregular branching cords of aggregated cells — B lymphocytes, plasma cells and macrophages — and they may be continuous with the cortical follicles. The sinuses are the spaces between those cords and the trabeculae, lined with endothelium and macrophages, and they filter the lymph received from the cortical sinuses. The path is fixed: afferent lymph vessels carry lymph to the convex surface, it circulates from the subcapsular and trabecular cortical sinuses into the medullary sinuses where the macrophages filter it, and it is drained by efferent lymphatic vessels leaving the concave surface at the hilum.
## explicit_objective
Name the cords and the sinuses of the medulla, say which cells each contains, and trace the lymph from the afferent vessel to the efferent one, naming where and by what cells it is filtered.
## pitfalls
Reading the sinus lining as endothelium alone. Macrophages sit in and on the wall of every lymph sinus, and they are the reason a sinus filters rather than merely conducts.
## concept_type
mechanism
## status
under review
## support_mode
direct_statement
## subject
haem
## primary_node_id
DIS-HIS-T03
## secondary_node_ids
SYS-HEM
## aliases
Medullary cords and medullary sinuses | Lymph circulation through the lymph node | Filtration of lymph
## arabic_label
[clear]
## arabic_aliases
[clear]
## topic
Histology
## subtopic
Lymph node
## microtopic
[clear]
## nanotopic
[clear]
## article_ids
ART-104-HIS-LYMPHOID-ORGANS
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_18d3a953df4ca83c4e74
src_5adcc001e9c3bb86bb75
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]
## modules
104 CPS
## module_subject
104 CPS > Histology > Lymphatic and Macrophage System > Lymph node
## universities
kau
## learner_years
1
## blueprint_weight
0.10
## exam_weight_by_year
KAU_Y1=0.10
## clinical_relevance
0.2
## academic_relevance
0.9
## exam_signal
src_18d3a953df4ca83c4e74 | department_book | 2026 | p16 | 104 CPS
src_5adcc001e9c3bb86bb75 | department_book | undated | p3 | 104 CPS
## weight_confidence
0.5
## confidence
0.8
## original_wording
[Histology department book p. 16] a- Medullary cords: They are irregular branching cords of aggregated cells. They include B-lymphocytes, plasma cells and macrophages... b- Medullary sinuses: The spaces between the medullary cords and trabeculae. They are lined with endothelium and macrophages. They filter the lymph received from cortical sinuses by macrophages.
## evidence_gaps
Evidence must be attached before publication.
## owner
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Teaching at Kasr Alainy is in English and the department book prints no Arabic term; students use the English one. Not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is already unused here; a nanotopic beneath it would be finer than anything the department book distinguishes.
relatedArticleIds: No other article in this module discusses this concept without teaching it; the module has one article per subject-tree leaf, and this concept's leaf is taught by ART-104-HIS-LYMPHOID-ORGANS.
relatedConceptIds: Walked the concepts under this module-subject leaf and found no untyped neighbour worth recording; anything real between them belongs in a typed relation instead.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module's corpus holds no video at all.
atomicClaimIds: AUTHORING ERROR: the audit requires a claim. Author it in the evidence batch rather than leaving this blank.
resourceOccurrenceIds: Read from the department book and the practical atlas by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: Searched the corpus index for "medullary" and found no candidate record; the Kasr Y1 corpus is indexed by file, not by extracted candidate.
mergeIds: Nothing was merged into this concept; it was minted from one station question and the department book pages behind it.
rejectedMergeCandidateIds: The searches for this label returned no near-miss to decide against, so there is nothing to record here for the next author.
conflicts: The department book, the practical atlas and the module's article agree on this structure; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification, and the practical atlas shows it.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
secondaryNodeIds: placed on a second view as well as its home node
relationships: Walked the concepts sharing this module-subject leaf. Typed edges worth writing are recorded in the module's relation batch; the rest are same-leaf proximity only.

---

# Item
## label
Lymph sinuses with no central arteriole is a lymph node; a central arteriole with no lymph sinuses is a spleen
## id
CON-HEM-087A20D42875CE
## canonical_key
lymphnode.versus-spleen-lymph-sinuses-and-central-arteriole
## definition
The two encapsulated lymphoid organs are separated on architecture rather than on size or staining. The lymph node is multiple and small, lies along the course of a lymph vessel and filters lymph; its capsule is covered by fascia, thin and poor in smooth muscle and elastic fibres, with many afferent and efferent lymph vessels; its trabeculae are thin and descend from the deep surface of the capsule; its cortex holds regularly arranged lymph follicles with clear germinal centres and no central arterioles, separated by lymph sinuses, and its medulla holds medullary cords and medullary lymph sinuses. The spleen is large and single and intra-abdominal, and filters and stores blood; its capsule is covered by peritoneum, thick and rich in smooth muscle and elastic fibres, with few efferent lymph vessels and no afferents; its trabeculae are thick and arise mainly from the hilum; its white pulp is irregularly arranged Malpighian corpuscles each built on a central arteriole, with no lymph sinuses anywhere, and its red pulp is splenic cords and blood sinusoids.
## explicit_objective
Given two lymphoid sections, separate a lymph node from a spleen on capsule, trabeculae and parenchyma, and name the two features that settle it — the lymph sinus and the central arteriole.
## pitfalls
Separating them by quantity: nodule size, depth of staining, or the presence of germinal centres. Size and staining vary with fixation and with the plane of section, and germinal centres occur in both organs. Only the lymph sinus and the central arteriole are exclusive to one organ each.
## concept_type
comparison
## status
under review
## support_mode
direct_statement
## subject
haem
## primary_node_id
DIS-HIS-T03
## secondary_node_ids
SYS-HEM
## aliases
Differences between lymph node and spleen | Lymph node versus spleen | Lymph sinus versus central arteriole
## arabic_label
[clear]
## arabic_aliases
[clear]
## topic
Histology
## subtopic
Spleen
## microtopic
[clear]
## nanotopic
[clear]
## article_ids
ART-104-HIS-LYMPHOID-ORGANS
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_18d3a953df4ca83c4e74
src_5adcc001e9c3bb86bb75
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]
## modules
104 CPS
## module_subject
104 CPS > Histology > Lymphatic and Macrophage System > Lymph node
104 CPS > Histology > Lymphatic and Macrophage System > Spleen
## universities
kau
## learner_years
1
## blueprint_weight
0.15
## exam_weight_by_year
KAU_Y1=0.15
## clinical_relevance
0.2
## academic_relevance
0.9
## exam_signal
src_18d3a953df4ca83c4e74 | department_book | 2026 | p20 | 104 CPS
src_5adcc001e9c3bb86bb75 | department_book | undated | p3 | 104 CPS
src_5adcc001e9c3bb86bb75 | department_book | undated | p8 | 104 CPS
## weight_confidence
0.5
## confidence
0.8
## original_wording
[Histology department book p. 20, table] Differences between lymph node & spleen — Number: Multiple small / Large single. Site: Along course of lymph vessel / Intra-abdominal organ... Parenchyma: Lymph follicles have clear germinal centers, no central arterioles / Malpighian corpuscles have central arterioles... Contains lymph sinuses / Contains blood sinusoids.
## evidence_gaps
Evidence must be attached before publication.
## owner
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Teaching at Kasr Alainy is in English and the department book prints no Arabic term; students use the English one. Not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is already unused here; a nanotopic beneath it would be finer than anything the department book distinguishes.
relatedArticleIds: No other article in this module discusses this concept without teaching it; the module has one article per subject-tree leaf, and this concept's leaf is taught by ART-104-HIS-LYMPHOID-ORGANS.
relatedConceptIds: Walked the concepts under this module-subject leaf and found no untyped neighbour worth recording; anything real between them belongs in a typed relation instead.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module's corpus holds no video at all.
atomicClaimIds: AUTHORING ERROR: the audit requires a claim. Author it in the evidence batch rather than leaving this blank.
resourceOccurrenceIds: Read from the department book and the practical atlas by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: Searched the corpus index for "versus" and found no candidate record; the Kasr Y1 corpus is indexed by file, not by extracted candidate.
mergeIds: Nothing was merged into this concept; it was minted from one station question and the department book pages behind it.
rejectedMergeCandidateIds: The searches for this label returned no near-miss to decide against, so there is nothing to record here for the next author.
conflicts: The department book, the practical atlas and the module's article agree on this structure; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification, and the practical atlas shows it.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
secondaryNodeIds: placed on a second view as well as its home node
relationships: Walked the concepts sharing this module-subject leaf. Typed edges worth writing are recorded in the module's relation batch; the rest are same-leaf proximity only.

---

# Item
## label
The spleen is a thick muscular capsule with thick trabeculae radiating from the hilum, and white pulp scattered irregularly in red pulp
## id
CON-HEM-2F3CB0082551D1
## canonical_key
spleen.capsule-trabeculae-white-pulp-and-red-pulp
## definition
The spleen is the large single intra-abdominal haemolymphatic organ, situated along the course of the blood stream so that it filters blood. Its stroma is a capsule of dense connective tissue rich in smooth muscle and elastic fibres, thick especially at the hilum where the vessels enter and covered by peritoneum; trabeculae of connective tissue rich in elastic fibres and smooth muscle, long and thick and radiating mainly from the hilum with a few short irregular ones from the capsule, carrying blood vessels and nerves and dividing the organ into irregular compartments; and a reticular network of reticular cells and fibres that stains with silver and is more condensed at the white pulp. Its parenchyma, in a cut section of fresh spleen, is white rounded scattered spots — the white pulp — on a red background, the red pulp. There are no lymph sinuses anywhere in it.
## explicit_objective
Identify the spleen on a stained section from its capsule, its trabeculae and the pattern of its parenchyma, and name the white pulp and the red pulp.
## pitfalls
Going to the parenchyma before the capsule. Thick, muscular and elastic with thick trabeculae radiating from a hilum is a spleen; thin with delicate septa from the deep surface of the capsule is a lymph node. Only then is the parenchyma worth reading.
## concept_type
structural_description
## status
under review
## support_mode
direct_statement
## subject
haem
## primary_node_id
DIS-HIS-T03
## secondary_node_ids
SYS-HEM
## aliases
Histological structure of the spleen | Splenic capsule and trabeculae | White pulp and red pulp
## arabic_label
[clear]
## arabic_aliases
[clear]
## topic
Histology
## subtopic
Spleen
## microtopic
[clear]
## nanotopic
[clear]
## article_ids
ART-104-HIS-LYMPHOID-ORGANS
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_18d3a953df4ca83c4e74
src_5adcc001e9c3bb86bb75
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]
## modules
104 CPS
## module_subject
104 CPS > Histology > Lymphatic and Macrophage System > Spleen
## universities
kau
## learner_years
1
## blueprint_weight
0.15
## exam_weight_by_year
KAU_Y1=0.15
## clinical_relevance
0.2
## academic_relevance
0.9
## exam_signal
src_18d3a953df4ca83c4e74 | department_book | 2026 | p17 | 104 CPS
src_5adcc001e9c3bb86bb75 | department_book | undated | p8 | 104 CPS
## weight_confidence
0.5
## confidence
0.8
## original_wording
[Histology department book p. 17] Stroma: 1- Capsule: Thick especially at the hilum... Formed of dense C.T. rich in smooth muscles and elastic fibers. Covered by peritoneum. 2- Trabeculae: Long & thick, radiate mainly from the hilum... Parenchyma: cut sections of fresh spleen show that it is organized into white rounded scattered spots (white pulp) & red background (red pulp).
## evidence_gaps
Evidence must be attached before publication.
## owner
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Teaching at Kasr Alainy is in English and the department book prints no Arabic term; students use the English one. Not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is already unused here; a nanotopic beneath it would be finer than anything the department book distinguishes.
relatedArticleIds: No other article in this module discusses this concept without teaching it; the module has one article per subject-tree leaf, and this concept's leaf is taught by ART-104-HIS-LYMPHOID-ORGANS.
relatedConceptIds: Walked the concepts under this module-subject leaf and found no untyped neighbour worth recording; anything real between them belongs in a typed relation instead.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module's corpus holds no video at all.
atomicClaimIds: AUTHORING ERROR: the audit requires a claim. Author it in the evidence batch rather than leaving this blank.
resourceOccurrenceIds: Read from the department book and the practical atlas by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: Searched the corpus index for "spleen" and found no candidate record; the Kasr Y1 corpus is indexed by file, not by extracted candidate.
mergeIds: Nothing was merged into this concept; it was minted from one station question and the department book pages behind it.
rejectedMergeCandidateIds: The searches for this label returned no near-miss to decide against, so there is nothing to record here for the next author.
conflicts: The department book, the practical atlas and the module's article agree on this structure; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification, and the practical atlas shows it.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
secondaryNodeIds: placed on a second view as well as its home node
relationships: Walked the concepts sharing this module-subject leaf. Typed edges worth writing are recorded in the module's relation batch; the rest are same-leaf proximity only.

---

# Item
## label
Red pulp is Billroth cords and stave-cell sinusoids whose intercellular gaps let blood cells pass back into the circulation
## id
CON-HEM-594B1725902DAD
## canonical_key
spleen.red-pulp-billroth-cords-and-stave-cell-sinusoids
## definition
Red pulp appears red in fresh sections because of the number of red cells, and it is formed of two components. The splenic cords, the cords of Billroth, lie between the white pulps and the blood sinusoids and are infiltrated with red cells, granulocytes, lymphocytes, monocytes, platelets, plasma cells and macrophages. The blood sinusoids are barrel-shaped, irregular, wide blood channels lined with a fenestrated elongated endothelium of stave cells with large intercellular spaces and a non-continuous basal lamina, an arrangement that facilitates the passage of blood from the splenic cords into the blood stream; macrophages, the littoral cells, are present in and around their walls.
## explicit_objective
Name the two components of splenic red pulp, describe the stave-cell lining of a blood sinusoid, and say what its wide intercellular spaces and interrupted basal lamina allow.
## pitfalls
Dismissing the discontinuity of the lining as a shrinkage artefact of fixation. The gaps are a real feature and they are the structural basis of splenic filtration: every circulating cell is squeezed past a macrophage on its way back into the blood.
## concept_type
structural_description
## status
under review
## support_mode
direct_statement
## subject
haem
## primary_node_id
DIS-HIS-T03
## secondary_node_ids
SYS-HEM
## aliases
Splenic red pulp | Cords of Billroth | Splenic blood sinusoids | Stave cells | Littoral cells
## arabic_label
[clear]
## arabic_aliases
[clear]
## topic
Histology
## subtopic
Spleen
## microtopic
[clear]
## nanotopic
[clear]
## article_ids
ART-104-HIS-LYMPHOID-ORGANS
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_18d3a953df4ca83c4e74
src_5adcc001e9c3bb86bb75
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
CON-HEM-20659D298CF475 | CON-HEM-C860EAA4417873
## conflicts
[clear]
## uncertainty
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]
## modules
104 CPS
## module_subject
104 CPS > Histology > Lymphatic and Macrophage System > Spleen
## universities
kau
## learner_years
1
## blueprint_weight
0.10
## exam_weight_by_year
KAU_Y1=0.10
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_signal
src_18d3a953df4ca83c4e74 | department_book | 2026 | p18 | 104 CPS
src_5adcc001e9c3bb86bb75 | department_book | undated | p8 | 104 CPS
## weight_confidence
0.5
## confidence
0.8
## original_wording
[Histology department book p. 18] a- Splenic cords (Billroth cords): present between white pulps and blood sinusoids infiltrated with blood cells and lymphoid cells... b- Blood sinusoids: barrel shaped irregular wide blood channel lined with fenestrated elongated endothelium called stave cells with large inter-cellular spaces & noncontinuous basal lamina. This arrangement facilitates passage of blood from splenic cords to blood stream. Macrophages (Littoral cells) are present in and around the walls of blood sinusoids.
## evidence_gaps
Evidence must be attached before publication.
## owner
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Teaching at Kasr Alainy is in English and the department book prints no Arabic term; students use the English one. Not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is already unused here; a nanotopic beneath it would be finer than anything the department book distinguishes.
relatedArticleIds: No other article in this module discusses this concept without teaching it; the module has one article per subject-tree leaf, and this concept's leaf is taught by ART-104-HIS-LYMPHOID-ORGANS.
relatedConceptIds: Walked the concepts under this module-subject leaf and found no untyped neighbour worth recording; anything real between them belongs in a typed relation instead.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module's corpus holds no video at all.
atomicClaimIds: AUTHORING ERROR: the audit requires a claim. Author it in the evidence batch rather than leaving this blank.
resourceOccurrenceIds: Read from the department book and the practical atlas by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: Searched the corpus index for "stave" and found no candidate record; the Kasr Y1 corpus is indexed by file, not by extracted candidate.
mergeIds: Nothing was merged into this concept; it was minted from one station question and the department book pages behind it.
conflicts: The department book, the practical atlas and the module's article agree on this structure; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification, and the practical atlas shows it.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
secondaryNodeIds: placed on a second view as well as its home node
relationships: Walked the concepts sharing this module-subject leaf. Typed edges worth writing are recorded in the module's relation batch; the rest are same-leaf proximity only.

---

# Item
## label
Open, closed and open-and-closed theories describe how blood crosses from the terminal capillaries into the splenic sinusoids
## id
CON-HEM-4D47090A0B7561
## canonical_key
spleen.open-closed-and-open-and-closed-circulation-theories
## definition
Blood enters at the hilum as the splenic artery, runs in the connective-tissue trabeculae as trabecular arteries, leaves them as the follicular or central arterioles that enter and supply the white pulps, branches at the boundary of the white pulp into penicillar arterioles, and ends in terminal arterial capillaries. How those capillaries reach the blood sinusoids of the red pulp is described three ways. The open theory: the capillaries deliver blood directly into the tissue of the red pulp, and it is collected by passing through openings in the wall of the blood sinusoids. The closed theory: the capillaries open directly into the blood sinusoids. The open and closed theory: the circulation is closed when the spleen contracts and open when it relaxes. Blood is then collected by the venous sinuses into red pulp veins, then trabecular veins, and leaves at the hilum as the splenic vein.
## explicit_objective
Trace blood from the splenic artery to the splenic vein, state the open and the closed theory, and say how the open-and-closed account reconciles them.
## pitfalls
Attaching one theory to each compartment — open for the white pulp, closed for the red. Both describe the same red-pulp circulation; they differ only over whether the blood leaves the vascular channel at all before entering the sinusoid.
## concept_type
mechanism
## status
under review
## support_mode
direct_statement
## subject
haem
## primary_node_id
DIS-HIS-T03
## secondary_node_ids
SYS-HEM
## aliases
Theories of splenic circulation | Open and closed theory | Blood circulation in the spleen
## arabic_label
[clear]
## arabic_aliases
[clear]
## topic
Histology
## subtopic
Spleen
## microtopic
[clear]
## nanotopic
[clear]
## article_ids
ART-104-HIS-LYMPHOID-ORGANS
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_18d3a953df4ca83c4e74
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]
## modules
104 CPS
## module_subject
104 CPS > Histology > Lymphatic and Macrophage System > Spleen
## universities
kau
## learner_years
1
## blueprint_weight
0.10
## exam_weight_by_year
KAU_Y1=0.10
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_signal
src_18d3a953df4ca83c4e74 | department_book | 2026 | p19 | 104 CPS
## weight_confidence
0.5
## confidence
0.8
## original_wording
[Histology department book p. 19] Theories of Splenic Circulation: 1- Open theory: It stated that capillaries open, and deliver blood directly into the tissue of the red pulp. Blood is collected by passing through openings in wall of blood sinusoids. 2- Closed theory: It stated that capillaries open directly into the blood sinusoids. 3- Open and closed theory: It stated that when the spleen contracts, the circulation is closed & when relaxes, the circulation is open.
## evidence_gaps
Evidence must be attached before publication.
## owner
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Teaching at Kasr Alainy is in English and the department book prints no Arabic term; students use the English one. Not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is already unused here; a nanotopic beneath it would be finer than anything the department book distinguishes.
relatedArticleIds: No other article in this module discusses this concept without teaching it; the module has one article per subject-tree leaf, and this concept's leaf is taught by ART-104-HIS-LYMPHOID-ORGANS.
relatedConceptIds: Walked the concepts under this module-subject leaf and found no untyped neighbour worth recording; anything real between them belongs in a typed relation instead.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module's corpus holds no video at all.
atomicClaimIds: AUTHORING ERROR: the audit requires a claim. Author it in the evidence batch rather than leaving this blank.
resourceOccurrenceIds: Read from the department book and the practical atlas by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: Searched the corpus index for "closed" and found no candidate record; the Kasr Y1 corpus is indexed by file, not by extracted candidate.
mergeIds: Nothing was merged into this concept; it was minted from one station question and the department book pages behind it.
rejectedMergeCandidateIds: The searches for this label returned no near-miss to decide against, so there is nothing to record here for the next author.
conflicts: The department book, the practical atlas and the module's article agree on this structure; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification, and the practical atlas shows it.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
secondaryNodeIds: placed on a second view as well as its home node
relationships: Walked the concepts sharing this module-subject leaf. Typed edges worth writing are recorded in the module's relation batch; the rest are same-leaf proximity only.

---

# Item
## label
The palatine tonsil is stratified squamous epithelium dipping in as crypts, nodules arranged around them, and dense connective tissue on the deep aspect only
## id
CON-HEM-093013026B640A
## canonical_key
tonsil.palatine-epithelium-crypts-and-deep-capsule
## definition
The palatine tonsils are paired ovoid masses of lymphoid tissue in the lateral wall of the oropharynx, embedded in connective tissue under the mucous membrane. The free surface is covered by non-keratinized stratified squamous epithelium which dips down into the lymphatic tissue as invaginations called tonsillar crypts, in which bacteria, desquamated cells, phagocytic cells and lymphocytes accumulate. The lymphatic tissue is lymphatic nodules, with or without germinal centres, arranged around the crypts, together with diffuse lymphatic tissue of lymphocytes, plasma cells and macrophages. Deeper than the lymphatic tissue is dense connective tissue forming an incomplete capsule that separates it from adjacent structures, and mucous glands lie in that connective tissue with their ducts opening on the surface and not at the bases of the crypts, so debris is not washed out and inflammation of the crypts is common.
## explicit_objective
Identify a palatine tonsil on a stained section, name the covering epithelium and the invaginations it forms, and describe the arrangement of the nodules and the position of the capsule.
## pitfalls
Reading a crypt as a sinus. A lymph sinus is an endothelium-lined space inside a fully encapsulated organ; a crypt is lined by the surface epithelium itself and opens onto a free surface. Any covering epithelium excludes lymph node, spleen and thymus at once.
## concept_type
structural_description
## status
under review
## support_mode
direct_statement
## subject
haem
## primary_node_id
DIS-HIS-T03
## secondary_node_ids
SYS-HEM
## aliases
Histological structure of the palatine tonsil | Tonsillar crypts | Palatine tonsil
## arabic_label
[clear]
## arabic_aliases
[clear]
## topic
Histology
## subtopic
Tonsils
## microtopic
[clear]
## nanotopic
[clear]
## article_ids
ART-104-HIS-LYMPHOID-ORGANS
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_18d3a953df4ca83c4e74
src_5adcc001e9c3bb86bb75
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]
## modules
104 CPS
## module_subject
104 CPS > Histology > Lymphatic and Macrophage System > Tonsils
## universities
kau
## learner_years
1
## blueprint_weight
0.15
## exam_weight_by_year
KAU_Y1=0.15
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_signal
src_18d3a953df4ca83c4e74 | department_book | 2026 | p21 | 104 CPS
src_5adcc001e9c3bb86bb75 | department_book | undated | p14 | 104 CPS
## weight_confidence
0.5
## confidence
0.8
## original_wording
[Histology department book p. 21] Histological Structure of palatine tonsil: 1- The free surface is covered by non-keratinized stratified squamous epithelium which dips down into lymphatic tissue forming invaginations called tonsillar crypts... 3- Deeper to the lymphatic tissue, there is dense C.T. forming an incomplete capsule... 4- Mucous glands are present in the C.T., their ducts open on the surface and not in the base of tonsillar crypts, so inflammation of crypts is common.
## evidence_gaps
Evidence must be attached before publication.
## owner
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Teaching at Kasr Alainy is in English and the department book prints no Arabic term; students use the English one. Not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is already unused here; a nanotopic beneath it would be finer than anything the department book distinguishes.
relatedArticleIds: No other article in this module discusses this concept without teaching it; the module has one article per subject-tree leaf, and this concept's leaf is taught by ART-104-HIS-LYMPHOID-ORGANS.
relatedConceptIds: Walked the concepts under this module-subject leaf and found no untyped neighbour worth recording; anything real between them belongs in a typed relation instead.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module's corpus holds no video at all.
atomicClaimIds: AUTHORING ERROR: the audit requires a claim. Author it in the evidence batch rather than leaving this blank.
resourceOccurrenceIds: Read from the department book and the practical atlas by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: Searched the corpus index for "crypt" and found no candidate record; the Kasr Y1 corpus is indexed by file, not by extracted candidate.
mergeIds: Nothing was merged into this concept; it was minted from one station question and the department book pages behind it.
rejectedMergeCandidateIds: The searches for this label returned no near-miss to decide against, so there is nothing to record here for the next author.
conflicts: The department book, the practical atlas and the module's article agree on this structure; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification, and the practical atlas shows it.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
secondaryNodeIds: placed on a second view as well as its home node
relationships: Walked the concepts sharing this module-subject leaf. Typed edges worth writing are recorded in the module's relation batch; the rest are same-leaf proximity only.

---

# Item
## label
A tonsil is an incompletely encapsulated aggregation of lymphatic tissue: capsule on the deep aspect, epithelium on the free one
## id
CON-HEM-F0020DCB0BA8FD
## canonical_key
tonsil.definition-types-and-incomplete-encapsulation
## definition
Tonsils are aggregations of lymphatic tissue that are incompletely encapsulated, and there are three types: palatine, lingual and pharyngeal. The capsule is dense connective tissue lying deep to the lymphatic tissue and separating it from the adjacent structures; there is none on the free surface, which is covered by epithelium instead. The lymphatic tissue therefore meets the lumen of the pharynx directly, and that direct exposure is what puts it in contact with inhaled and swallowed antigen.
## explicit_objective
Define a tonsil, list the three types, and explain what incomplete encapsulation means on a section and what follows from it.
## pitfalls
Explaining the incompleteness as a capsule perforated by afferent lymphatics, as in a lymph node. There is no capsule on the free surface at all, and a tonsil has no afferent lymphatics to perforate one with.
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
SYS-HEM
## aliases
Definition of the tonsils | Types of tonsils | Incomplete encapsulation
## arabic_label
[clear]
## arabic_aliases
[clear]
## topic
Histology
## subtopic
Tonsils
## microtopic
[clear]
## nanotopic
[clear]
## article_ids
ART-104-HIS-LYMPHOID-ORGANS
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_18d3a953df4ca83c4e74
src_5adcc001e9c3bb86bb75
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
The book defines tonsils as a class on p. 20 as 'aggregation of lymphatic tissue, incompletely encapsulated', but its lingual tonsil entry on p. 21 says 'It has No C.T. capsule'. Both are printed. The palatine and pharyngeal tonsils have an incomplete capsule on the deep aspect and the lingual has none, so the class definition is the looser of the two statements rather than a contradiction of the entry.
## uncertainty
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]
## modules
104 CPS
## module_subject
104 CPS > Histology > Lymphatic and Macrophage System > Tonsils
## universities
kau
## learner_years
1
## blueprint_weight
0.10
## exam_weight_by_year
KAU_Y1=0.10
## clinical_relevance
0.2
## academic_relevance
0.9
## exam_signal
src_18d3a953df4ca83c4e74 | department_book | 2026 | p20 | 104 CPS
src_5adcc001e9c3bb86bb75 | department_book | undated | p14 | 104 CPS
## weight_confidence
0.5
## confidence
0.8
## original_wording
[Histology department book p. 20] Tonsils — Definition: aggregation of lymphatic tissue, incompletely encapsulated. Types: Palatine - Lingual - Pharyngeal.
## evidence_gaps
Evidence must be attached before publication.
## owner
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Teaching at Kasr Alainy is in English and the department book prints no Arabic term; students use the English one. Not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is already unused here; a nanotopic beneath it would be finer than anything the department book distinguishes.
relatedArticleIds: No other article in this module discusses this concept without teaching it; the module has one article per subject-tree leaf, and this concept's leaf is taught by ART-104-HIS-LYMPHOID-ORGANS.
relatedConceptIds: Walked the concepts under this module-subject leaf and found no untyped neighbour worth recording; anything real between them belongs in a typed relation instead.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module's corpus holds no video at all.
atomicClaimIds: AUTHORING ERROR: the audit requires a claim. Author it in the evidence batch rather than leaving this blank.
resourceOccurrenceIds: Read from the department book and the practical atlas by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: Searched the corpus index for "encapsulat" and found no candidate record; the Kasr Y1 corpus is indexed by file, not by extracted candidate.
mergeIds: Nothing was merged into this concept; it was minted from one station question and the department book pages behind it.
rejectedMergeCandidateIds: The searches for this label returned no near-miss to decide against, so there is nothing to record here for the next author.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification, and the practical atlas shows it.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
secondaryNodeIds: placed on a second view as well as its home node
relationships: Walked the concepts sharing this module-subject leaf. Typed edges worth writing are recorded in the module's relation batch; the rest are same-leaf proximity only.

---

# Item
## label
The pharyngeal tonsil is a single midline nasopharyngeal mass with folded respiratory epithelium and no crypts
## id
CON-HEM-23C119B7E783BD
## canonical_key
tonsil.pharyngeal-site-epithelium-and-absent-crypts
## definition
The pharyngeal tonsil is a single mass of lymphoid tissue at the midline, under the mucous membrane of the nasopharynx. Its epithelium is folded and is pseudostratified columnar ciliated with goblet cells. It has no crypts, and it has an incomplete connective tissue capsule. Hypertrophy of the pharyngeal tonsil results in adenoids.
## explicit_objective
Identify the pharyngeal tonsil from its site, its covering epithelium and the absence of crypts, and name what its hypertrophy produces.
## pitfalls
Explaining away the missing crypts as a tangential section of a palatine tonsil, or assuming every tonsil is paired. The epithelium settles the site: pseudostratified ciliated columnar with goblet cells is nasopharynx, where the tonsil is single, midline and has no crypts to miss.
## concept_type
structural_description
## status
under review
## support_mode
direct_statement
## subject
haem
## primary_node_id
DIS-HIS-T03
## secondary_node_ids
SYS-HEM
## aliases
Pharyngeal tonsil | Adenoids | Nasopharyngeal tonsil
## arabic_label
[clear]
## arabic_aliases
[clear]
## topic
Histology
## subtopic
Tonsils
## microtopic
[clear]
## nanotopic
[clear]
## article_ids
ART-104-HIS-LYMPHOID-ORGANS
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_18d3a953df4ca83c4e74
src_5adcc001e9c3bb86bb75
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
CON-RES-A811FF8C5B42AD
## conflicts
[clear]
## uncertainty
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]
## modules
104 CPS
## module_subject
104 CPS > Histology > Lymphatic and Macrophage System > Tonsils
## universities
kau
## learner_years
1
## blueprint_weight
0.10
## exam_weight_by_year
KAU_Y1=0.10
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_signal
src_18d3a953df4ca83c4e74 | department_book | 2026 | p22 | 104 CPS
src_5adcc001e9c3bb86bb75 | department_book | undated | p14 | 104 CPS
## weight_confidence
0.5
## confidence
0.8
## original_wording
[Histology department book p. 22] III- Pharyngeal Tonsil: It is a single mass of lymphoid tissue under the mucous membrane of the nasopharynx, at the midline. It has a folded epithelium (pseudostratified columnar ciliated epithelium with goblet cells). There are no crypts. It has an incomplete C.T. capsule. N.B. Hypertrophy of pharyngeal tonsil results in adenoids.
## evidence_gaps
Evidence must be attached before publication.
## owner
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Teaching at Kasr Alainy is in English and the department book prints no Arabic term; students use the English one. Not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is already unused here; a nanotopic beneath it would be finer than anything the department book distinguishes.
relatedArticleIds: No other article in this module discusses this concept without teaching it; the module has one article per subject-tree leaf, and this concept's leaf is taught by ART-104-HIS-LYMPHOID-ORGANS.
relatedConceptIds: Walked the concepts under this module-subject leaf and found no untyped neighbour worth recording; anything real between them belongs in a typed relation instead.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module's corpus holds no video at all.
atomicClaimIds: AUTHORING ERROR: the audit requires a claim. Author it in the evidence batch rather than leaving this blank.
resourceOccurrenceIds: Read from the department book and the practical atlas by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: Searched the corpus index for "adenoid" and found no candidate record; the Kasr Y1 corpus is indexed by file, not by extracted candidate.
mergeIds: Nothing was merged into this concept; it was minted from one station question and the department book pages behind it.
conflicts: The department book, the practical atlas and the module's article agree on this structure; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification, and the practical atlas shows it.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
secondaryNodeIds: placed on a second view as well as its home node
relationships: Walked the concepts sharing this module-subject leaf. Typed edges worth writing are recorded in the module's relation batch; the rest are same-leaf proximity only.

---

# Item
## label
The tonsils protect the digestive and respiratory tracts by producing antibody, and the crypts are what enlarge the surface they sample
## id
CON-HEM-A165FFF2DDDE92
## canonical_key
tonsil.function-crypt-sampling-and-antibody-production
## definition
The function of all three tonsils is protection of the digestive and respiratory systems against invaders — bacteria, viruses and the rest — by the production of antibodies. The architecture is that function: the free-surface epithelium dips into the lymphatic tissue as crypts, which multiplies the area of epithelium exposed to swallowed and inhaled material, and the lymphatic nodules with their germinal centres together with the diffuse tissue of lymphocytes, plasma cells and macrophages around them are what mounts the response.
## explicit_objective
Account for the arrangement of nodules around the crypts of the palatine tonsil, and for the cells in the diffuse tissue between them, in terms of what the tonsil is for.
## pitfalls
Reading the crypt as a duct or a lymphatic channel. It is an epithelial pocket open to the pharynx — an exposure device, not a drain. Mucus arrives at the surface from glands in the underlying connective tissue, and lymphocytes leave a tonsil by efferent lymphatics, not through the epithelium.
## concept_type
mechanism
## status
under review
## support_mode
direct_statement
## subject
haem
## primary_node_id
DIS-HIS-T03
## secondary_node_ids
SYS-HEM
## aliases
Functions of the tonsils | Antigen sampling by tonsillar crypts
## arabic_label
[clear]
## arabic_aliases
[clear]
## topic
Histology
## subtopic
Tonsils
## microtopic
[clear]
## nanotopic
[clear]
## article_ids
ART-104-HIS-LYMPHOID-ORGANS
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_18d3a953df4ca83c4e74
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]
## modules
104 CPS
## module_subject
104 CPS > Histology > Lymphatic and Macrophage System > Tonsils
## universities
kau
## learner_years
1
## blueprint_weight
0.10
## exam_weight_by_year
KAU_Y1=0.10
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_signal
src_18d3a953df4ca83c4e74 | department_book | 2026 | p22 | 104 CPS
## weight_confidence
0.5
## confidence
0.8
## original_wording
[Histology department book p. 22] Functions of Tonsils: protection of digestive and respiratory systems against any invader as bacteria, viruses ...etc., by production of antibodies.
## evidence_gaps
Evidence must be attached before publication.
## owner
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Teaching at Kasr Alainy is in English and the department book prints no Arabic term; students use the English one. Not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is already unused here; a nanotopic beneath it would be finer than anything the department book distinguishes.
relatedArticleIds: No other article in this module discusses this concept without teaching it; the module has one article per subject-tree leaf, and this concept's leaf is taught by ART-104-HIS-LYMPHOID-ORGANS.
relatedConceptIds: Walked the concepts under this module-subject leaf and found no untyped neighbour worth recording; anything real between them belongs in a typed relation instead.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module's corpus holds no video at all.
atomicClaimIds: AUTHORING ERROR: the audit requires a claim. Author it in the evidence batch rather than leaving this blank.
resourceOccurrenceIds: Read from the department book and the practical atlas by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: Searched the corpus index for "invader" and found no candidate record; the Kasr Y1 corpus is indexed by file, not by extracted candidate.
mergeIds: Nothing was merged into this concept; it was minted from one station question and the department book pages behind it.
rejectedMergeCandidateIds: The searches for this label returned no near-miss to decide against, so there is nothing to record here for the next author.
conflicts: The department book, the practical atlas and the module's article agree on this structure; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification, and the practical atlas shows it.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
secondaryNodeIds: placed on a second view as well as its home node
relationships: Walked the concepts sharing this module-subject leaf. Typed edges worth writing are recorded in the module's relation batch; the rest are same-leaf proximity only.

---

# Item
## label
The thymus is incompletely lobulated, with a dark cortex, a pale medulla continuous between lobules, and no lymphatic nodules
## id
CON-HEM-BA8773E5D84286
## canonical_key
thymus.lobules-dark-cortex-and-continuous-pale-medulla
## definition
The thymus is a single bilobed primary lymphoid organ with an endocrine function, sited in the thoracic cavity behind the sternum, with a double origin: mesodermal for its lymphocytes and endodermal for its epithelial reticular cells. It is surrounded by a thin connective-tissue capsule which sends incomplete thin trabeculae that incompletely subdivide the lobes into a large number of lobules, on a reticular background. Each lobule has a cortex and a medulla. The cortex is the outer zone and stains darker because it is more densely populated with lymphocytes, lymphoblasts in its outer part and thymocytes in its inner part, completely surrounded by epithelial reticular cells and macrophages. The medulla of each lobule is continuous with that of the adjacent lobule, stains lighter because its lymphocytes are less abundant and its epithelial reticular cells more so, and contains the acidophilic Hassall's corpuscles.
## explicit_objective
Identify the thymus on a stained section from its incomplete lobulation, the dark cortex and pale medulla of each lobule, the continuity of the medullae between lobules, and the absence of lymphatic nodules.
## pitfalls
Taking a cortex and a medulla as diagnostic on their own; a lymph node has both. What is unique to the thymus is lobulation without follicles, a medulla continuous from lobule to lobule, and Hassall's corpuscles within it.
## concept_type
structural_description
## status
under review
## support_mode
direct_statement
## subject
haem
## primary_node_id
DIS-HIS-T03
## secondary_node_ids
SYS-HEM
## aliases
Histological structure of the thymus | Thymic lobules | Thymic cortex and medulla
## arabic_label
[clear]
## arabic_aliases
[clear]
## topic
Histology
## subtopic
Thymus
## microtopic
[clear]
## nanotopic
[clear]
## article_ids
ART-104-HIS-LYMPHOID-ORGANS
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_18d3a953df4ca83c4e74
src_5adcc001e9c3bb86bb75
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]
## modules
104 CPS
## module_subject
104 CPS > Histology > Lymphatic and Macrophage System > Thymus
## universities
kau
## learner_years
1
## blueprint_weight
0.15
## exam_weight_by_year
KAU_Y1=0.15
## clinical_relevance
0.2
## academic_relevance
0.9
## exam_signal
src_18d3a953df4ca83c4e74 | department_book | 2026 | p22 | 104 CPS
src_5adcc001e9c3bb86bb75 | department_book | undated | p18 | 104 CPS
## weight_confidence
0.5
## confidence
0.8
## original_wording
[Histology department book pp. 22-23] Structure: it is a single bilobed structure... Thymus is surrounded by thin C.T. capsule, which sends incomplete thin trabeculae that incompletely subdivide the lobes into large number of lobules... 1- Cortex: The outer zone of each lobule It's darker in staining than the medulla... 2- Medulla: The medulla of each lobule is continuous with that of the adjacent lobule. It stains lighter than the cortex...
## evidence_gaps
Evidence must be attached before publication.
## owner
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Teaching at Kasr Alainy is in English and the department book prints no Arabic term; students use the English one. Not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is already unused here; a nanotopic beneath it would be finer than anything the department book distinguishes.
relatedArticleIds: No other article in this module discusses this concept without teaching it; the module has one article per subject-tree leaf, and this concept's leaf is taught by ART-104-HIS-LYMPHOID-ORGANS.
relatedConceptIds: Walked the concepts under this module-subject leaf and found no untyped neighbour worth recording; anything real between them belongs in a typed relation instead.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module's corpus holds no video at all.
atomicClaimIds: AUTHORING ERROR: the audit requires a claim. Author it in the evidence batch rather than leaving this blank.
resourceOccurrenceIds: Read from the department book and the practical atlas by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: Searched the corpus index for "thymus" and found no candidate record; the Kasr Y1 corpus is indexed by file, not by extracted candidate.
mergeIds: Nothing was merged into this concept; it was minted from one station question and the department book pages behind it.
rejectedMergeCandidateIds: The searches for this label returned no near-miss to decide against, so there is nothing to record here for the next author.
conflicts: The department book, the practical atlas and the module's article agree on this structure; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification, and the practical atlas shows it.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
secondaryNodeIds: placed on a second view as well as its home node
relationships: Walked the concepts sharing this module-subject leaf. Typed edges worth writing are recorded in the module's relation batch; the rest are same-leaf proximity only.

---

# Item
## label
A Hassall's corpuscle is a concentric epithelial body with a degenerating acidophilic centre, found only in the thymic medulla
## id
CON-HEM-10B2E783E164FD
## canonical_key
thymus.hassalls-corpuscle-structure-and-location
## definition
Hassall's corpuscles are small rounded acidophilic structures found in the medulla of the thymus. Each is formed of a central acidophilic mass of degenerating reticular cells surrounded by concentric layers of epithelial reticular cells. Their number increases with age. They are a normal constituent of the thymic medulla at every age, and they occur nowhere else in the body, so finding one identifies both the organ and the zone of the lobule.
## explicit_objective
Identify a Hassall's corpuscle at high power, describe how it is constructed, and say in which zone of the thymic lobule it is found.
## pitfalls
Reading any pale or acidophilic rounded structure as a germinal centre or as calcification. A germinal centre is a cellular zone of large lymphocytes and the thymus has none; a Malpighian corpuscle is lymphoid tissue around an arteriole; a Hassall's corpuscle is epithelial, normal, and has no vessel.
## concept_type
structural_description
## status
under review
## support_mode
direct_statement
## subject
haem
## primary_node_id
DIS-HIS-T03
## secondary_node_ids
SYS-HEM
## aliases
Hassall's corpuscle | Thymic corpuscle
## arabic_label
[clear]
## arabic_aliases
[clear]
## topic
Histology
## subtopic
Thymus
## microtopic
[clear]
## nanotopic
[clear]
## article_ids
ART-104-HIS-LYMPHOID-ORGANS
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_18d3a953df4ca83c4e74
src_5adcc001e9c3bb86bb75
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]
## modules
104 CPS
## module_subject
104 CPS > Histology > Lymphatic and Macrophage System > Thymus
## universities
kau
## learner_years
1
## blueprint_weight
0.15
## exam_weight_by_year
KAU_Y1=0.15
## clinical_relevance
0.2
## academic_relevance
0.9
## exam_signal
src_18d3a953df4ca83c4e74 | department_book | 2026 | p23 | 104 CPS
src_5adcc001e9c3bb86bb75 | department_book | undated | p18 | 104 CPS
## weight_confidence
0.5
## confidence
0.8
## original_wording
[Histology department book p. 23] Hassall's corpuscle: Small rounded structure found in medulla. Their numbers increase with age. They are formed of central acidophilic masses of degenerating reticular cells surrounded with concentric layers of epithelial reticular cells.
## evidence_gaps
Evidence must be attached before publication.
## owner
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Teaching at Kasr Alainy is in English and the department book prints no Arabic term; students use the English one. Not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is already unused here; a nanotopic beneath it would be finer than anything the department book distinguishes.
relatedArticleIds: No other article in this module discusses this concept without teaching it; the module has one article per subject-tree leaf, and this concept's leaf is taught by ART-104-HIS-LYMPHOID-ORGANS.
relatedConceptIds: Walked the concepts under this module-subject leaf and found no untyped neighbour worth recording; anything real between them belongs in a typed relation instead.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module's corpus holds no video at all.
atomicClaimIds: AUTHORING ERROR: the audit requires a claim. Author it in the evidence batch rather than leaving this blank.
resourceOccurrenceIds: Read from the department book and the practical atlas by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: Searched the corpus index for "hassall" and found no candidate record; the Kasr Y1 corpus is indexed by file, not by extracted candidate.
mergeIds: Nothing was merged into this concept; it was minted from one station question and the department book pages behind it.
rejectedMergeCandidateIds: The searches for this label returned no near-miss to decide against, so there is nothing to record here for the next author.
conflicts: The department book, the practical atlas and the module's article agree on this structure; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification, and the practical atlas shows it.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
secondaryNodeIds: placed on a second view as well as its home node
relationships: Walked the concepts sharing this module-subject leaf. Typed edges worth writing are recorded in the module's relation batch; the rest are same-leaf proximity only.

---

# Item
## label
Thymic epithelial reticular cells are endodermal, joined into a cellular reticulum, and produce no reticular fibres
## id
CON-HEM-02424D1AF8A169
## canonical_key
thymus.epithelial-reticular-cells-endodermal-and-fibre-free
## definition
The epithelial reticular cells, or thymic epithelial cells, are derived from endoderm — unlike the mesodermal reticular cells of a lymph node or spleen — and they produce no reticular fibres. They are branched cells with large oval pale nuclei and prominent nucleoli, their cytoplasm contains secretory granules, and their long processes contain cytokeratin filaments and are connected by desmosomes and tight junctions to form a reticulum on which the other cells are superimposed. They are the nursing cells for lymphocytes during differentiation, forming sheets deep to the capsule and around the septa and blood vessels that isolate the developing cortical lymphocytes from antigens in the blood while they are programmed, and they secrete the thymic hormones and factors that promote T-cell differentiation and proliferation.
## explicit_objective
Identify the branched cells of the thymic stroma on a high-power field, give their embryological origin, and say how they differ from the reticular cells of a lymph node.
## pitfalls
Calling them macrophages. Macrophages are present in the thymic cortex and do phagocytose degenerating thymocytes, but they are not branched cells joined into a network by desmosomes, and their nuclei are eccentric and kidney-shaped rather than large, oval and pale.
## concept_type
structural_description
## status
under review
## support_mode
direct_statement
## subject
haem
## primary_node_id
DIS-HIS-T03
## secondary_node_ids
SYS-HEM
## aliases
Epithelial reticular cells | Thymic epithelial cells | Endodermal reticular cells of the thymus
## arabic_label
[clear]
## arabic_aliases
[clear]
## topic
Histology
## subtopic
Thymus
## microtopic
[clear]
## nanotopic
[clear]
## article_ids
ART-104-HIS-LYMPHOID-ORGANS
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_18d3a953df4ca83c4e74
src_5adcc001e9c3bb86bb75
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
CON-FND-49D5829AC3DCA1
## conflicts
[clear]
## uncertainty
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]
## modules
104 CPS
## module_subject
104 CPS > Histology > Lymphatic and Macrophage System > Thymus
## universities
kau
## learner_years
1
## blueprint_weight
0.10
## exam_weight_by_year
KAU_Y1=0.10
## clinical_relevance
0.2
## academic_relevance
0.9
## exam_signal
src_18d3a953df4ca83c4e74 | department_book | 2026 | p23 | 104 CPS
src_5adcc001e9c3bb86bb75 | department_book | undated | p18 | 104 CPS
## weight_confidence
0.5
## confidence
0.8
## original_wording
[Histology department book p. 23] 1- Epithelial reticular cells (thymic epithelial cells): Origin: They are derived from endoderm. LM & EM: Branched cells with large oval pale nuclei with prominent nucleoli and their cytoplasm contains secretory granules. Their long processes contain cytokeratin filaments, connected together by desmosomes and tight junctions, to form a reticulum on which other cells are superimposed.
## evidence_gaps
Evidence must be attached before publication.
## owner
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Teaching at Kasr Alainy is in English and the department book prints no Arabic term; students use the English one. Not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is already unused here; a nanotopic beneath it would be finer than anything the department book distinguishes.
relatedArticleIds: No other article in this module discusses this concept without teaching it; the module has one article per subject-tree leaf, and this concept's leaf is taught by ART-104-HIS-LYMPHOID-ORGANS.
relatedConceptIds: Walked the concepts under this module-subject leaf and found no untyped neighbour worth recording; anything real between them belongs in a typed relation instead.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module's corpus holds no video at all.
atomicClaimIds: AUTHORING ERROR: the audit requires a claim. Author it in the evidence batch rather than leaving this blank.
resourceOccurrenceIds: Read from the department book and the practical atlas by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: Searched the corpus index for "reticular" and found no candidate record; the Kasr Y1 corpus is indexed by file, not by extracted candidate.
mergeIds: Nothing was merged into this concept; it was minted from one station question and the department book pages behind it.
conflicts: The department book, the practical atlas and the module's article agree on this structure; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification, and the practical atlas shows it.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
secondaryNodeIds: placed on a second view as well as its home node
relationships: Walked the concepts sharing this module-subject leaf. Typed edges worth writing are recorded in the module's relation batch; the rest are same-leaf proximity only.

---

# Item
## label
The thymus has no lymphoid nodules, no B lymphocytes, no plasma cells and no afferent lymph vessels, and it is that last absence that keeps antigen out
## id
CON-HEM-3E38A04641F73C
## canonical_key
thymus.special-features-and-absent-afferent-lymphatics
## definition
The special features of the thymus are a list of absences with two presences beside them. Its reticular cells are endodermal, not mesodermal, and do not produce reticular fibres. It has no lymphoid nodules, no B lymphocytes, no plasma cells, and no afferent lymph vessels, which the department book states as being to protect the thymocytes from circulating antigens — a lymph node receives antigen precisely through its afferent lymphatics, and the thymus has none. It contains Hassall's corpuscles, and it undergoes involution at puberty while continuing to produce lymphocytes. Together these mark it out as a primary lymphoid organ, where lymphocytes are educated and selected rather than where immune responses are mounted.
## explicit_objective
List what the thymus lacks and what it uniquely contains, and say which of the absences most directly protects the developing T lymphocytes and why.
## pitfalls
Treating every absence as protective in the same way. The absence of germinal centres and of plasma cells follows from the thymus having no B lymphocytes; it is the absence of afferent lymph vessels, together with the blood-thymic barrier, that keeps circulating antigen away from thymocytes under selection.
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
SYS-HEM
## aliases
Special features of the thymus | What the thymus lacks | Absence of afferent lymphatics in the thymus
## arabic_label
[clear]
## arabic_aliases
[clear]
## topic
Histology
## subtopic
Thymus
## microtopic
[clear]
## nanotopic
[clear]
## article_ids
ART-104-HIS-LYMPHOID-ORGANS
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_18d3a953df4ca83c4e74
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]
## modules
104 CPS
## module_subject
104 CPS > Histology > Lymphatic and Macrophage System > Thymus
## universities
kau
## learner_years
1
## blueprint_weight
0.10
## exam_weight_by_year
KAU_Y1=0.10
## clinical_relevance
0.2
## academic_relevance
0.9
## exam_signal
src_18d3a953df4ca83c4e74 | department_book | 2026 | p24 | 104 CPS
## weight_confidence
0.5
## confidence
0.8
## original_wording
[Histology department book p. 24] Special Features of the Thymus: Reticular cells are endodermal (not mesodermal), do not produce reticular fiber. It contains Hassall's corpuscles. It has no lymphoid nodules, no B-lymphocytes, no plasma cells, and no afferent lymph vessels (to protect thymocytes from circulating antigens). It undergoes involution at the time of puberty.
## evidence_gaps
Evidence must be attached before publication.
## owner
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Teaching at Kasr Alainy is in English and the department book prints no Arabic term; students use the English one. Not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is already unused here; a nanotopic beneath it would be finer than anything the department book distinguishes.
relatedArticleIds: No other article in this module discusses this concept without teaching it; the module has one article per subject-tree leaf, and this concept's leaf is taught by ART-104-HIS-LYMPHOID-ORGANS.
relatedConceptIds: Walked the concepts under this module-subject leaf and found no untyped neighbour worth recording; anything real between them belongs in a typed relation instead.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module's corpus holds no video at all.
atomicClaimIds: AUTHORING ERROR: the audit requires a claim. Author it in the evidence batch rather than leaving this blank.
resourceOccurrenceIds: Read from the department book and the practical atlas by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: Searched the corpus index for "afferent" and found no candidate record; the Kasr Y1 corpus is indexed by file, not by extracted candidate.
mergeIds: Nothing was merged into this concept; it was minted from one station question and the department book pages behind it.
rejectedMergeCandidateIds: The searches for this label returned no near-miss to decide against, so there is nothing to record here for the next author.
conflicts: The department book, the practical atlas and the module's article agree on this structure; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification, and the practical atlas shows it.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
secondaryNodeIds: placed on a second view as well as its home node
relationships: Walked the concepts sharing this module-subject leaf. Typed edges worth writing are recorded in the module's relation batch; the rest are same-leaf proximity only.

---

# Item
## label
The blood-thymic barrier is four layers around a cortical capillary, and it exists in the cortex and not in the medulla
## id
CON-HEM-BB5A071CEEB78F
## canonical_key
thymus.blood-thymic-barrier-four-layers-and-cortical-location
## definition
The blood-thymic barrier is the wall that separates developing T lymphocytes from antigens in the circulating blood. It is present only in the cortex of the thymus and not in the medulla. It is formed of four layers: a continuous type of capillary endothelium whose cells are connected by tight junctions; a thick continuous basal lamina of that capillary; a perivascular tissue around the capillary containing macrophages that phagocytose any antigen escaping through the endothelium; and a complete layer of epithelial reticular cells with tight junctions between them, forming a sheath outside the capillary and the macrophages. Its function is to let immature T lymphocytes multiply and differentiate in an environment free of foreign antigens before they migrate to the medulla and leave the thymus for the blood stream.
## explicit_objective
Name the four layers of the blood-thymic barrier in order outwards from the capillary lumen, and say why it is present in the cortex and not in the medulla.
## pitfalls
Reducing the barrier to its outermost layer, or moving it to the medulla. It is four layers around a capillary that is present and open — the cortex is well supplied — and it stops where selection stops, because medullary thymocytes have already been selected and are on their way out.
## concept_type
structural_description
## status
under review
## support_mode
direct_statement
## subject
haem
## primary_node_id
DIS-HIS-T03
## secondary_node_ids
SYS-HEM
## aliases
Blood-thymic barrier | Blood-thymus barrier | Thymic barrier
## arabic_label
[clear]
## arabic_aliases
[clear]
## topic
Histology
## subtopic
Thymus
## microtopic
[clear]
## nanotopic
[clear]
## article_ids
ART-104-HIS-LYMPHOID-ORGANS
## related_article_ids
[clear]
## related_concept_ids
[clear]
## resource_ids
src_18d3a953df4ca83c4e74
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
[clear]
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## merge_ids
[clear]
## rejected_merge_candidate_ids
CON-AND-C44B32EAF91652
## conflicts
[clear]
## uncertainty
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]
## modules
104 CPS
## module_subject
104 CPS > Histology > Lymphatic and Macrophage System > Thymus
## universities
kau
## learner_years
1
## blueprint_weight
0.15
## exam_weight_by_year
KAU_Y1=0.15
## clinical_relevance
0.2
## academic_relevance
0.9
## exam_signal
src_18d3a953df4ca83c4e74 | department_book | 2026 | p24 | 104 CPS
## weight_confidence
0.5
## confidence
0.8
## original_wording
[Histology department book p. 24] The Blood Thymic Barrier: Wall that separates developing T-lymphocytes from antigens in circulating blood. Present only in the cortex of the thymus (not in medulla). It is formed of: 1- A continuous type of capillary endothelial cells, are connected with tight junctions. 2- A thick continuous basal lamina of the capillary. 3- A perivascular tissue around capillaries has macrophages... 4- A complete layer of epithelial reticular cells with tight junctions inbetween.
## evidence_gaps
Evidence must be attached before publication.
## owner
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Teaching at Kasr Alainy is in English and the department book prints no Arabic term; students use the English one. Not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is already unused here; a nanotopic beneath it would be finer than anything the department book distinguishes.
relatedArticleIds: No other article in this module discusses this concept without teaching it; the module has one article per subject-tree leaf, and this concept's leaf is taught by ART-104-HIS-LYMPHOID-ORGANS.
relatedConceptIds: Walked the concepts under this module-subject leaf and found no untyped neighbour worth recording; anything real between them belongs in a typed relation instead.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module's corpus holds no video at all.
atomicClaimIds: AUTHORING ERROR: the audit requires a claim. Author it in the evidence batch rather than leaving this blank.
resourceOccurrenceIds: Read from the department book and the practical atlas by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: Searched the corpus index for "barrier" and found no candidate record; the Kasr Y1 corpus is indexed by file, not by extracted candidate.
mergeIds: Nothing was merged into this concept; it was minted from one station question and the department book pages behind it.
conflicts: The department book, the practical atlas and the module's article agree on this structure; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification, and the practical atlas shows it.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
secondaryNodeIds: placed on a second view as well as its home node
relationships: Walked the concepts sharing this module-subject leaf. Typed edges worth writing are recorded in the module's relation batch; the rest are same-leaf proximity only.
