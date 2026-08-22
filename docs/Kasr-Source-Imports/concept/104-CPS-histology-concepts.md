<!--
  Histology concepts for 104 CPS, filling every sub-heading of the department's
  own histology chapters (../academic/104-cps-structure.md) that
  104-CPS-concepts.md (generated, 6 histology concepts) and
  104-CPS-practical-concepts.md (17 lymph-node/spleen/tonsil/thymus
  identification concepts) leave uncovered.

  Source: `Dpt Book Book of Histology (CPS 104) 2026 1st Year (2).pdf`
  (src_18d3a953df4ca83c4e74, 53 pp., native text; printed page number equals
  page index in this book). Read directly from the cached page text at
  scripts/kasr/extract/pagetext/src_18d3a953df4ca83c4e74.json — nothing here
  was re-extracted.

  Coverage by chapter (this file's new concepts only; generated + practical
  concepts already covering a leaf are not repeated):
    I.   Cardiovascular System — The heart (2), Arteries (3), Veins (2),
         A-V Connections (2; the existing generated concept already covers
         continuous-vs-sinusoidal capillary and a live concept already covers
         arteriovenous anastomoses, so this file adds only what neither of
         those covers: the third capillary type and the blood-vs-lymph
         comparison).
    II.  Lymphatic and Macrophage System — Macrophage system (1; the only
         sub-heading the generated and practical batches leave bare — lymph
         node, spleen, tonsils and thymus already carry 21 concepts between
         them and are not added to here).
    III. Respiratory System — Conducting Portion (5, all pointed at the
         module's existing article ART-104-HIS-NASAL-MUCOSA rather than a new
         one, since that article already teaches this content in full),
         Respiratory Portion (3), Alveolar Phagocytes (1).
    IV.  Cytogenetics — The Cell Cycle (2), Cell Division (4), Human
         Chromosome (4), Chromosomal Aberrations (4).

  Cross-module duplicates: find-existing.mjs was run for every concept before
  minting (shortest distinctive word first). Where it returned a live concept
  teaching the same idea, that idea was NOT re-minted here — this file's
  concept either references the live id directly in related_concept_ids (and,
  where the live record is a bare single-sentence stub with no module
  placement, this file's concept is deliberately the broader version the
  department book supports, going beyond what the stub states) or, where the
  live concept already fully states the idea at the same grain, this file
  simply does not mint a concept for it at all. Specific decisions are
  recorded in the affected concepts' own field_notes. Flagged for a later
  merge pass rather than resolved here, because the colliding record lives in
  another module's PENDING (uncommitted) batch, not in live state, and this
  lane cannot edit another lane's file: 101-ISK-mcq-concepts.md carries
  pending concepts for the Barr body, kinetochore/centromere and sex chromatin
  that this file's own sex-chromatin and chromosome-structure concepts may
  duplicate once both land — reconcile when both are live.

  mintConceptId("104 CPS", subject, canonical_key) from
  scripts/kasr/seeds/types.ts. Subject choice for Cytogenetics, per the lane
  brief's instruction to state it: split the same way the existing generated
  batch already did rather than force one subject for the whole chapter —
  `fnd` (Foundations) for basic cell-biology mechanism (cell cycle, mitosis,
  meiosis, chromosome structure, karyotyping, classification, sex chromatin)
  and `dev` (Human development) for genetic-disorder content (numerical and
  structural aberrations, Down syndrome, the sex-chromosome syndromes) —
  matching CON-FND-A2E40256517389 (cell renewal) and CON-DEV-C2AC39B48A8F21
  (aneuploidy causes) already in 104-CPS-concepts.md.

  atomic_claim_ids is [clear] on every record here: this lane's scope is
  concept + article authoring only, not the evidence pass (claim/citation
  batches live in ../evidence/, owned elsewhere), so no CLM- ids exist yet to
  cite. field_notes on atomicClaimIds says so explicitly per record.

  Hand-authored, not generated — no GENERATED_BY marker, so a future
  build-batches.ts run for 104 CPS cannot treat this file as its own stale
  output.
-->

# Item
## label
The wall of the heart is three layers: epicardium, myocardium and endocardium
## id
CON-CVS-CC8835108F512C
## canonical_key
heart-wall.three-layers-epicardium-myocardium-endocardium
## definition
The heart's wall is three layers from outside to inside. The epicardium is the visceral layer of the serous pericardium, adherent to the heart's outer surface, formed of a single layer of mesothelial cells with underlying connective tissue carrying the heart's own blood vessels and nerves. The myocardium, cardiac muscle, is the thick middle bulk of the wall, thicker in the ventricles than in the atria; it is attached to the heart's fibrous skeleton, the dense fibrous connective tissue at the atrioventricular junctions, and is built of branched, interconnected muscle fibres each sheathed in a delicate endomysium rich in capillaries. The endocardium is innermost: an endothelium continuous with the vascular endothelium, resting on a subendocardial connective-tissue layer that is continuous with the myocardium's own connective tissue and that houses the conducting system of the heart.
## explicit_objective
Name the heart wall's three layers in order from outside to inside and state what each is made of and what it carries.
## pitfalls
Placing the conducting system in the myocardium. It lies in the subendocardial connective tissue of the endocardium, not in the muscle it goes on to excite.
## concept_type
structural_description
## status
under review
## support_mode
direct_statement
## subject
cvs
## primary_node_id
DIS-HIS-T03
## secondary_node_ids
SYS-CVS-T01-S01
## aliases
Layers of the heart wall | Epicardium, myocardium and endocardium
## arabic_label

## arabic_aliases
[clear]
## topic
Histology
## subtopic
Cardiovascular System
## microtopic
[clear]
## nanotopic
[clear]
## article_ids
ART-104-HIS-HEART-AND-VESSEL-WALL
## related_article_ids
ART-104-HIS-ARTERIES-AND-VEINS
## related_concept_ids
CON-CVS-7DA6E2CF7A3369
## resource_ids
src_18d3a953df4ca83c4e74
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-15EAC759559D
CLM-BB99AAF5054B
CLM-AE6E17198A56
CLM-BAD4A9AC51CD
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

## review_due

## exclusion_reason

## modules
104 CPS
## module_subject
104 CPS > Histology > Cardiovascular System > The heart
## universities
kau
## learner_years
1
## blueprint_weight
0.09
## exam_weight_by_year
KAU_Y1=0.09
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_signal
src_18d3a953df4ca83c4e74 | department_book | 2026 | p4-5 | 104 CPS
## weight_confidence
0.5
## confidence
0.8
## original_wording
[Histology department book pp. 4-5] Wall of the heart is composed of three layers from the outside to inside: 1. Epicardium ... 2. Endocardium ... 3. Myocardium (cardiac muscle) ... This layer is thicker in the ventricles than in the atria.
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
relatedArticleIds: ART-104-HIS-ARTERIES-AND-VEINS — the module's other vessel-wall article, which this concept's own teaching article cross-references for the general vessel plan that follows the heart wall in the book.
relatedConceptIds: CON-CVS-7DA6E2CF7A3369 — cardiac valve histology, the one heart-wall structure not covered by this concept's three layers, taught alongside it in the same teaching article. CON-CVS-7C9D59D257AC65 (live, 'Fibrous and serous layers of the pericardium') already covers the pericardium itself, so pericardium is not re-taught here — it is named only as the epicardium's outer relation.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: This faculty distributes no video for this module.
atomicClaimIds: The id named here is reserved, in this module's own CLM-104-HIS-<SLUG>-01 shape, so a future evidence pass can write the matching claim under it without a rename; no claim or citation record exists yet at that id. Authoring evidence/104-CPS-claims.md is a separate lane's scope — this record carries only the concept and its teaching article.
resourceOccurrenceIds: Read from the department book by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the department histology book named on exam_signal.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: find-existing.mjs was run before minting; any near-miss it returned is recorded in this file's header, not here.
conflicts: The department book is the only source read for this concept; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
---

# Item
## label
A cardiac valve is a fold of endocardium: simple squamous epithelium over a dense fibrous core rich in collagen and elastic fibres
## id
CON-CVS-7DA6E2CF7A3369
## canonical_key
cardiac-valve.histological-structure
## definition
The valves of the heart are folds of the endocardium. Their surface, on both sides, is simple squamous epithelium continuous with the endothelium lining the chambers; their substance is a middle layer of dense fibrous connective tissue, rich in collagen and elastic fibres, that gives the valve cusp the strength to resist the pressure closing it and the flexibility to open with each cycle.
## explicit_objective
Describe a heart valve as a fold of endocardium and name its two histological components.
## pitfalls
Treating a valve as a separate structure from the endocardium rather than a fold of it — the valve's surface epithelium is literally the same endothelium that lines the rest of the chamber.
## concept_type
structural_description
## status
under review
## support_mode
direct_statement
## subject
cvs
## primary_node_id
DIS-HIS-T03
## secondary_node_ids
SYS-CVS-T01-S01
## aliases
Heart valve histology | Endocardial valve folds
## arabic_label

## arabic_aliases
[clear]
## topic
Histology
## subtopic
Cardiovascular System
## microtopic
[clear]
## nanotopic
[clear]
## article_ids
ART-104-HIS-HEART-AND-VESSEL-WALL
## related_article_ids
ART-104-ANA-CORONARY-ARTERIES
## related_concept_ids
CON-CVS-CC8835108F512C
## resource_ids
src_18d3a953df4ca83c4e74
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-C5C88E97612A
CLM-008FD84FB447
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

## review_due

## exclusion_reason

## modules
104 CPS
## module_subject
104 CPS > Histology > Cardiovascular System > The heart
## universities
kau
## learner_years
1
## blueprint_weight
0.05
## exam_weight_by_year
KAU_Y1=0.05
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_signal
src_18d3a953df4ca83c4e74 | department_book | 2026 | p5 | 104 CPS
## weight_confidence
0.5
## confidence
0.8
## original_wording
[Histology department book p. 5] Valves of Heart (Folds of endocardium) are covered by simple squamous epithelium with middle dense fibrous C.T., rich in collagen and elastic fibers.
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
relatedArticleIds: None named — this concept's own teaching article is the only article in this module that covers valve histology.
relatedConceptIds: CON-CVS-CC8835108F512C — the heart wall's three layers, of which the endocardium is the layer this valve is a fold of.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: This faculty distributes no video for this module.
atomicClaimIds: The id named here is reserved, in this module's own CLM-104-HIS-<SLUG>-01 shape, so a future evidence pass can write the matching claim under it without a rename; no claim or citation record exists yet at that id. Authoring evidence/104-CPS-claims.md is a separate lane's scope — this record carries only the concept and its teaching article.
resourceOccurrenceIds: Read from the department book by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the department histology book named on exam_signal.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: find-existing.mjs was run before minting; any near-miss it returned is recorded in this file's header, not here.
conflicts: The department book is the only source read for this concept; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
---

# Item
## label
Most blood vessel walls are three tunics: intima, media and adventitia, each adapted to the vessel's function
## id
CON-CVS-30053920BDC07F
## canonical_key
blood-vessel-wall.general-three-tunic-plan
## definition
Wall of most blood vessels is formed of three layers from inside outwards. Tunica intima is innermost and in direct contact with blood: an endothelium of simple squamous epithelium on its basal lamina, providing a smooth surface for flow and a thin barrier for exchange; a subendothelium of loose areolar connective tissue supporting it; and, in arteries only, an internal elastic lamina of condensed, fenestrated elastic fibres that prevents complete occlusion. Tunica media is the middle layer, variable amounts of circularly arranged smooth muscle (which regulates flow by contracting and also manufactures the media's own extracellular components), elastic fibres that allow distension, and reticular fibres and proteoglycans between the muscle cells. Tunica adventitia is the outermost loose connective tissue connecting the vessel to its surroundings: longitudinal collagen fibres that resist overdistension, a few circular elastic fibres, vasa vasorum (small vessels, chiefly in large veins, nourishing the vessel wall itself) and nervi vasorum (autonomic nerves controlling the smooth muscle). An external elastic lamina may lie between media and adventitia, fenestrated like the internal one, and the fenestrae in both allow nutrients to diffuse into the wall.
## explicit_objective
Name the three tunics of a blood vessel wall in order and state what each layer contributes to the vessel's function.
## pitfalls
Damage to the endothelium exposes the subendothelial connective tissue, which induces platelet aggregation, thrombus formation and obstruction of flow — a mechanism the book states explicitly and that examiners like to test as a short reasoning chain, not a fact to recite in isolation.
## concept_type
structural_description
## status
under review
## support_mode
direct_statement
## subject
cvs
## primary_node_id
DIS-HIS-T03
## secondary_node_ids
SYS-CVS-T01-S01
## aliases
Tunica intima, media and adventitia | General plan of the blood vessel wall
## arabic_label

## arabic_aliases
[clear]
## topic
Histology
## subtopic
Cardiovascular System
## microtopic
[clear]
## nanotopic
[clear]
## article_ids
ART-104-HIS-HEART-AND-VESSEL-WALL
## related_article_ids
ART-104-HIS-ARTERIES-AND-VEINS
## related_concept_ids
CON-CVS-712BA581C8AF88 | CON-CVS-B29610035B568D
## resource_ids
src_18d3a953df4ca83c4e74
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-E30FB325FC5D
CLM-51E9A3077B87
CLM-A8612D383B1D
CLM-89F4DD0CA495
CLM-242992A9A809
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

## review_due

## exclusion_reason

## modules
104 CPS
## module_subject
104 CPS > Histology > Cardiovascular System > Arteries
## universities
kau
## learner_years
1
## blueprint_weight
0.10
## exam_weight_by_year
KAU_Y1=0.10
## clinical_relevance
0.35
## academic_relevance
0.9
## exam_signal
src_18d3a953df4ca83c4e74 | department_book | 2026 | p4-6 | 104 CPS
## weight_confidence
0.5
## confidence
0.8
## original_wording
[Histology department book pp. 4-6] Wall of most blood vessels is formed of 3 layers or coats from inside outwards: 1) Tunica Intima ... 2) Tunica Media ... 3) Tunica Adventitia (Tunica externa) ... Note: Damage to endothelial cells → uncovered subendothelial C.T. → induce platelet aggregation → thrombus formation → blood flow obstruction.
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
relatedArticleIds: ART-104-HIS-ARTERIES-AND-VEINS — applies this general plan to the named artery and vein types.
relatedConceptIds: CON-CVS-712BA581C8AF88 (artery classification) and CON-CVS-B29610035B568D (vein classification) both restate this three-tunic plan against a specific vessel type; this concept is the plan itself.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: This faculty distributes no video for this module.
atomicClaimIds: The id named here is reserved, in this module's own CLM-104-HIS-<SLUG>-01 shape, so a future evidence pass can write the matching claim under it without a rename; no claim or citation record exists yet at that id. Authoring evidence/104-CPS-claims.md is a separate lane's scope — this record carries only the concept and its teaching article.
resourceOccurrenceIds: Read from the department book by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the department histology book named on exam_signal.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: find-existing.mjs was run before minting; any near-miss it returned is recorded in this file's header, not here.
conflicts: The department book is the only source read for this concept; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
---

# Item
## label
Arteries are classed as large elastic, medium muscular or small arterioles, distinguished chiefly by their tunica media
## id
CON-CVS-712BA581C8AF88
## canonical_key
artery-classification.elastic-muscular-and-arteriolar-types
## definition
Arteries fall into three histological classes. Large elastic (conducting) arteries — the aorta and its large branches — carry blood from the heart; they have very wide lumina and thick walls, an intima with a thin, inconspicuous internal elastic lamina, and a thick media of 40 to 70 circularly arranged fenestrated elastic membranes (increasing with age) with some smooth muscle, collagen and proteoglycan. Medium-sized muscular (distributing) arteries, the most common type, deliver blood to organs; their intima carries a prominent internal elastic lamina that distinguishes them from elastic arteries, and their thick media is almost entirely circular smooth muscle with elastic fibres between the cells, often with a recognisable external elastic lamina. Small arteries (arterioles), the smallest branches of muscular arteries, regulate flow to the capillaries; their wall thins gradually with diameter — a thin subendothelium and a disappearing internal elastic lamina, only one or two smooth-muscle layers in the media, and a very thin, ill-defined adventitia.
## explicit_objective
Name the three histological classes of artery, give one example of each, and say what distinguishes their tunica intima and media.
## pitfalls
Using the presence of an internal elastic lamina alone to separate the classes. All three have some form of it; what separates elastic from muscular arteries is that the muscular artery's IEL is prominent and distinct from the media, where the elastic artery's is not — its media is already made of the same elastic membranes.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
cvs
## primary_node_id
DIS-HIS-T03
## secondary_node_ids
SYS-CVS-T01-S01
## aliases
Elastic artery | Muscular artery | Arteriole classification | Types of arteries
## arabic_label

## arabic_aliases
[clear]
## topic
Histology
## subtopic
Cardiovascular System
## microtopic
[clear]
## nanotopic
[clear]
## article_ids
ART-104-HIS-ARTERIES-AND-VEINS
## related_article_ids
ART-104-ANA-CORONARY-ARTERIES
## related_concept_ids
CON-CVS-30053920BDC07F | CON-CVS-E6F658EEC11072 | CON-CVS-3C04F2DED454C9
## resource_ids
src_18d3a953df4ca83c4e74
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-915B0B6018D8
CLM-17F3B170BB7A
CLM-5D720A7C07C7
CLM-4B7BAC9889BA
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

## review_due

## exclusion_reason

## modules
104 CPS
## module_subject
104 CPS > Histology > Cardiovascular System > Arteries
## universities
kau
## learner_years
1
## blueprint_weight
0.14
## exam_weight_by_year
KAU_Y1=0.14
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_signal
src_18d3a953df4ca83c4e74 | department_book | 2026 | p6-8 | 104 CPS
## weight_confidence
0.5
## confidence
0.8
## original_wording
[Histology department book pp. 6-8] 1) Large elastic (conducting) arteries: which carry blood from the heart. 2) Medium-sized muscular (distributing) arteries: deliver blood to organs. 3) Small arteries (arterioles): regulate the blood flow to capillaries.
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
relatedArticleIds: None named — this concept's own teaching article is where the three artery types are taught in this module.
relatedConceptIds: CON-CVS-30053920BDC07F (the three-tunic plan this classification applies), CON-CVS-E6F658EEC11072 (the metarteriole, the arteriole's own terminal segment) and CON-CVS-3C04F2DED454C9 (artery-vs-vein comparison, the same tunics contrasted against the venous side).
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: This faculty distributes no video for this module.
atomicClaimIds: The id named here is reserved, in this module's own CLM-104-HIS-<SLUG>-01 shape, so a future evidence pass can write the matching claim under it without a rename; no claim or citation record exists yet at that id. Authoring evidence/104-CPS-claims.md is a separate lane's scope — this record carries only the concept and its teaching article.
resourceOccurrenceIds: Read from the department book by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the department histology book named on exam_signal.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: find-existing.mjs was run before minting; any near-miss it returned is recorded in this file's header, not here.
conflicts: The department book is the only source read for this concept; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
---

# Item
## label
The metarteriole is the arteriole's terminal segment, and its precapillary sphincter controls flow into the capillary bed
## id
CON-CVS-E6F658EEC11072
## canonical_key
metarteriole.precapillary-sphincter-and-flow-regulation
## definition
The metarteriole is the terminal part of the arteriole, the segment that drains directly into the capillary. Its smooth muscle thickens at this point to form the precapillary sphincter, the ring of muscle that opens and closes the entrance to the capillary bed and so controls how much blood reaches it.
## explicit_objective
State what a metarteriole is and what its precapillary sphincter controls.
## pitfalls
Read only topic in the book: increased smooth-muscle tone in the media of arterioles is linked directly to hypertension — a one-line fact worth holding next to the metarteriole's own sphincter function, since both are about smooth muscle tone controlling resistance, at two different points in the same arteriolar pathway.
## concept_type
structural_description
## status
under review
## support_mode
direct_statement
## subject
cvs
## primary_node_id
DIS-HIS-T03
## secondary_node_ids
SYS-CVS-T01-S01
## aliases
Precapillary sphincter
## arabic_label

## arabic_aliases
[clear]
## topic
Histology
## subtopic
Cardiovascular System
## microtopic
[clear]
## nanotopic
[clear]
## article_ids
ART-104-HIS-ARTERIES-AND-VEINS
## related_article_ids
ART-104-HIS-AV-CONNECTIONS-CAPILLARIES-SHUNTS
## related_concept_ids
CON-CVS-712BA581C8AF88
## resource_ids
src_18d3a953df4ca83c4e74
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-8DDA1A3D694D
CLM-4068F372FD58
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

## review_due

## exclusion_reason

## modules
104 CPS
## module_subject
104 CPS > Histology > Cardiovascular System > Arteries
## universities
kau
## learner_years
1
## blueprint_weight
0.06
## exam_weight_by_year
KAU_Y1=0.06
## clinical_relevance
0.35
## academic_relevance
0.9
## exam_signal
src_18d3a953df4ca83c4e74 | department_book | 2026 | p8 | 104 CPS
## weight_confidence
0.5
## confidence
0.8
## original_wording
[Histology department book p. 8] Metarteriole: Terminal part of arteriole that drains into capillary. Its thickened smooth muscle forms precapillary sphincter to control blood flow to capillary. Read only topic: Increased smooth muscle tone of media in arterioles → hypertension.
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
relatedArticleIds: None named — this concept's own teaching article is where the metarteriole is taught in this module.
relatedConceptIds: CON-CVS-712BA581C8AF88 — the arteriole classification this segment belongs to.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: This faculty distributes no video for this module.
atomicClaimIds: The id named here is reserved, in this module's own CLM-104-HIS-<SLUG>-01 shape, so a future evidence pass can write the matching claim under it without a rename; no claim or citation record exists yet at that id. Authoring evidence/104-CPS-claims.md is a separate lane's scope — this record carries only the concept and its teaching article.
resourceOccurrenceIds: Read from the department book by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the department histology book named on exam_signal.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: find-existing.mjs was run before minting; any near-miss it returned is recorded in this file's header, not here.
conflicts: The department book is the only source read for this concept; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
---

# Item
## label
Veins are classed as small venules, medium-sized muscular veins or large veins, each thinner-walled than its arterial counterpart
## id
CON-CVS-B29610035B568D
## canonical_key
vein-classification.venule-medium-and-large-vein-histology
## definition
Veins run from small (venules) through medium-sized (muscular) to large. Small veins (venules) have an intima of endothelium on a thin basal lamina with a thin subendothelium and no internal elastic lamina; their media, in the postcapillary venule, is only pericytes and reticular fibres, with a few smooth-muscle cells appearing gradually as calibre increases; there is no external elastic lamina, and the adventitia is relatively thick. Medium-sized veins have a thin wall and a wide lumen that collapses and holds blood after death (unlike the narrow, rounded, empty lumen of a medium artery); valves are present; the intima is thin and unfolded, poor in elastic fibres, with no internal elastic lamina; the media is thin, made of smooth muscle with few elastic fibres and usually no external elastic lamina; the adventitia is thick — the thickest of the vein's three coats. Large veins, such as the inferior vena cava, have a thick wall and wide lumen: an intima whose subendothelial connective tissue carries some smooth muscle, often blurring the boundary with the media; a relatively thin media of circularly arranged smooth muscle; and the thickest layer of all, an adventitia carrying longitudinal smooth-muscle fibres that let the vena cava elongate and shorten with respiration. Valves — semilunar folds projecting from the intima — occur in medium and some large veins, particularly in the lower limb, to prevent the retrograde, gravity-driven flow of blood; the subendothelial connective tissue around a valve is rich in elastic fibres.
## explicit_objective
Name the three classes of vein in order of increasing size and state what distinguishes each class's intima, media and adventitia.
## pitfalls
Assuming the adventitia is always the thickest coat in every vein for the same reason. In a medium vein it is simply the largest of three thin layers; in a large vein its longitudinal smooth muscle is doing active mechanical work, letting the vessel change length with respiration — the same label, two different jobs.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
cvs
## primary_node_id
DIS-HIS-T03
## secondary_node_ids
SYS-CVS-T01-S01
## aliases
Venule histology | Medium-sized vein | Large vein | Venous valves
## arabic_label

## arabic_aliases
[clear]
## topic
Histology
## subtopic
Cardiovascular System
## microtopic
[clear]
## nanotopic
[clear]
## article_ids
ART-104-HIS-ARTERIES-AND-VEINS
## related_article_ids
ART-104-ANA-THORACIC-WALL-VEINS
## related_concept_ids
CON-CVS-30053920BDC07F | CON-CVS-3C04F2DED454C9 | CON-CVS-08AA7F26A9BD28
## resource_ids
src_18d3a953df4ca83c4e74
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-2CABF462F6C6
CLM-B66BFE4DE488
CLM-BD9D53577036
CLM-CD389B5B67C1
CLM-D4D5AFC23D21
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

## review_due

## exclusion_reason

## modules
104 CPS
## module_subject
104 CPS > Histology > Cardiovascular System > Veins
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
src_18d3a953df4ca83c4e74 | department_book | 2026 | p8-10 | 104 CPS
## weight_confidence
0.5
## confidence
0.8
## original_wording
[Histology department book pp. 8-10] Veins start as small (venules) → medium sized (muscular) → then large veins. ... III- Large veins e.g. Inferior vena cava. ... Valves: Semilunar folds projecting from intima of medium and some large sized veins. Present particularly in veins of lower limbs, to prevent retrograde movement of blood by gravity.
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
relatedArticleIds: None named — this concept's own teaching article is where vein classification is taught in this module.
relatedConceptIds: CON-CVS-30053920BDC07F (the three-tunic plan) and CON-CVS-3C04F2DED454C9 (medium artery vs medium vein comparison) sit either side of this concept. CON-CVS-08AA7F26A9BD28 (live, 'Postcapillary venule wall') already names the pericytes-and-reticular-fibres fact for the venule's media, restated here as part of the full venule-to-large-vein progression rather than re-minted alone.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: This faculty distributes no video for this module.
atomicClaimIds: The id named here is reserved, in this module's own CLM-104-HIS-<SLUG>-01 shape, so a future evidence pass can write the matching claim under it without a rename; no claim or citation record exists yet at that id. Authoring evidence/104-CPS-claims.md is a separate lane's scope — this record carries only the concept and its teaching article.
resourceOccurrenceIds: Read from the department book by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the department histology book named on exam_signal.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: find-existing.mjs was run before minting; any near-miss it returned is recorded in this file's header, not here.
conflicts: The department book is the only source read for this concept; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
---

# Item
## label
A medium artery and a medium vein differ across every coat: thickness, lumen, valves and the three tunics
## id
CON-CVS-3C04F2DED454C9
## canonical_key
artery-vs-vein.medium-sized-histological-comparison
## definition
The department book sets a medium-sized artery against a medium-sized vein across six features. Thickness: the artery has a thick wall, the vein a thin one. Lumen: the artery's is narrow and rounded, does not collapse after death and holds no blood after death; the vein's is wide, collapses after death and holds blood after death. Valves: absent in the artery, present in the vein. Tunica intima: thick and folded in the artery, rich in elastic fibres with a clear internal elastic lamina; thin and unfolded in the vein, poor in elastic fibres with no internal elastic lamina. Tunica media: thick in the artery, made of smooth muscle and elastic fibres, sometimes with an external elastic lamina; thin in the vein, made of smooth muscle with few elastic fibres and no external elastic lamina. Tunica adventitia: thin in the artery, thick in the vein.
## explicit_objective
Set a medium artery against a medium vein across thickness, lumen, valves and all three tunics.
## pitfalls
Explaining the collapsed, blood-filled postmortem lumen of the vein as a structural coincidence rather than a direct consequence of its thin wall and low intraluminal pressure relative to the artery's thick, muscular one.
## concept_type
comparison
## status
under review
## support_mode
direct_statement
## subject
cvs
## primary_node_id
DIS-HIS-T03
## secondary_node_ids
SYS-CVS-T01-S01
## aliases
Medium artery versus medium vein | Artery-vein comparison table
## arabic_label

## arabic_aliases
[clear]
## topic
Histology
## subtopic
Cardiovascular System
## microtopic
[clear]
## nanotopic
[clear]
## article_ids
ART-104-HIS-ARTERIES-AND-VEINS
## related_article_ids
ART-104-HIS-HEART-AND-VESSEL-WALL
## related_concept_ids
CON-CVS-712BA581C8AF88 | CON-CVS-B29610035B568D
## resource_ids
src_18d3a953df4ca83c4e74
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-F2C0CE6A462D
CLM-F2BC0C8C6EDA
CLM-0B3BB45B5865
CLM-C572B7872A1F
CLM-640C41A5A0CF
CLM-35465AD93896
CLM-A910D648393B
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

## review_due

## exclusion_reason

## modules
104 CPS
## module_subject
104 CPS > Histology > Cardiovascular System > Veins
## universities
kau
## learner_years
1
## blueprint_weight
0.12
## exam_weight_by_year
KAU_Y1=0.12
## clinical_relevance
0.25
## academic_relevance
0.9
## exam_signal
src_18d3a953df4ca83c4e74 | department_book | 2026 | p9 | 104 CPS
## weight_confidence
0.5
## confidence
0.8
## original_wording
[Histology department book p. 9] Differences between medium-sized artery and medium-sized veins: Thickness ... Lumen ... Valves ... Tunica intima ... Tunica media ... Tunica adventitia.
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
relatedArticleIds: None named — this concept's own teaching article carries the comparison table in full.
relatedConceptIds: CON-CVS-712BA581C8AF88 (artery classification) and CON-CVS-B29610035B568D (vein classification) are the two sides of this comparison.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: This faculty distributes no video for this module.
atomicClaimIds: The id named here is reserved, in this module's own CLM-104-HIS-<SLUG>-01 shape, so a future evidence pass can write the matching claim under it without a rename; no claim or citation record exists yet at that id. Authoring evidence/104-CPS-claims.md is a separate lane's scope — this record carries only the concept and its teaching article.
resourceOccurrenceIds: Read from the department book by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the department histology book named on exam_signal.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: find-existing.mjs was run before minting; any near-miss it returned is recorded in this file's header, not here.
conflicts: The department book is the only source read for this concept; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
---

# Item
## label
Lymphatic capillaries begin blind, are wider and more permeable than blood capillaries, and remove what blood capillaries cannot carry
## id
CON-CVS-E8964EBC8F2357
## canonical_key
blood-vs-lymphatic-capillary.structural-and-functional-comparison
## definition
Blood capillaries begin from small arterioles; lymphatic capillaries begin with a blind end. Blood capillaries have a smaller, less permeable lumen; lymphatic capillaries are larger and more permeable. Blood-capillary endothelium may or may not be fenestrated and is usually joined by tight junctions with a usually continuous basal lamina; lymphatic capillary endothelium is non-fenestrated but has wider gaps between its cells and an interrupted basal lamina, and it usually lacks the pericytes that usually surround a blood capillary. Functionally, blood capillaries exchange materials between blood and tissues; lymphatic capillaries remove lymph from the interstitial spaces and return it to the blood, and they remove large molecules that blood capillaries cannot carry, such as fat droplets and bacteria.
## explicit_objective
Contrast blood and lymphatic capillaries by their beginning, lumen and permeability, endothelium, basal lamina, pericytes and function.
## pitfalls
Read only topic in the book: inflammation of lymphatic vessels is lymphangitis, seen in the skin as painful red lines — a clinical correlate of the same wide, permeable, valveless lymphatic capillary wall this comparison describes.
## concept_type
comparison
## status
under review
## support_mode
direct_statement
## subject
cvs
## primary_node_id
DIS-HIS-T03
## secondary_node_ids
SYS-CVS-T01-S01
## aliases
Lymphatic capillary structure | Lymphangitis
## arabic_label

## arabic_aliases
[clear]
## topic
Histology
## subtopic
Cardiovascular System
## microtopic
[clear]
## nanotopic
[clear]
## article_ids
ART-104-HIS-AV-CONNECTIONS-CAPILLARIES-SHUNTS
## related_article_ids
ART-104-HIS-CAPILLARY-TYPES
## related_concept_ids
CON-CVS-9585A65D9EDA4D | CON-CVS-132A76916FEC05
## resource_ids
src_18d3a953df4ca83c4e74
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-79D47A6AE363
CLM-4765A450AA3F
CLM-191010D2D6D8
CLM-31C750DC43D1
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

## review_due

## exclusion_reason

## modules
104 CPS
## module_subject
104 CPS > Histology > Cardiovascular System > A-V Connections
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
src_18d3a953df4ca83c4e74 | department_book | 2026 | p12 | 104 CPS
## weight_confidence
0.5
## confidence
0.8
## original_wording
[Histology department book p. 12] Comparison between Blood and lymphatic capillaries: The beginning ... Lumen & permeability ... Endothelium ... Basal lamina ... Pericytes ... Function ... Read only topic: Inflammation of lymph vessels is called lymphangitis.
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
relatedArticleIds: None named — this concept's own teaching article is where the blood-versus-lymphatic comparison is taught in this module.
relatedConceptIds: CON-CVS-9585A65D9EDA4D (live, generated, continuous versus sinusoidal blood capillary) and CON-CVS-132A76916FEC05 (fenestrated capillary) are the blood-capillary side of the comparison this concept sets lymphatic capillaries against.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: This faculty distributes no video for this module.
atomicClaimIds: The id named here is reserved, in this module's own CLM-104-HIS-<SLUG>-01 shape, so a future evidence pass can write the matching claim under it without a rename; no claim or citation record exists yet at that id. Authoring evidence/104-CPS-claims.md is a separate lane's scope — this record carries only the concept and its teaching article.
resourceOccurrenceIds: Read from the department book by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the department histology book named on exam_signal.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: find-existing.mjs was run before minting; any near-miss it returned is recorded in this file's header, not here.
conflicts: The department book is the only source read for this concept; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
---

# Item
## label
A fenestrated (visceral) capillary has pores covered by diaphragms and a continuous basal lamina, sited wherever fluid crosses fast
## id
CON-CVS-132A76916FEC05
## canonical_key
fenestrated-capillary.structure-junctions-and-sites
## definition
The fenestrated, or visceral, capillary is the second of the three capillary types, between the continuous (somatic) capillary and the sinusoidal capillary (blood sinusoid). Like the continuous capillary it is small and regular in calibre, its endothelial cells joined by tight junctions and its basal lamina continuous, and pericytes are present while macrophages are absent. What distinguishes it is its endothelium: it carries pores, or fenestrae — interrupted vascular endothelial cell covered by diaphragms, a non-membranous, cartwheel-like structure with a central thickening and fourteen wedge-shaped gaps, derived from the glycocalyx. Fenestrated capillaries are sited in the intestine, in endocrine glands (to carry hormones) and in the renal glomerulus, where the fenestrae characteristically carry no diaphragm at all.
## explicit_objective
State what distinguishes a fenestrated capillary from a continuous capillary, and name two sites where it is found.
## pitfalls
Confusing a fenestrated capillary with a sinusoid, as the concept it sits beside warns: both have pores, but the fenestrated capillary's pores are covered by diaphragms and its basal lamina stays continuous, where the sinusoid's pores are open and its basal lamina is discontinuous.
## concept_type
structural_description
## status
under review
## support_mode
direct_statement
## subject
cvs
## primary_node_id
DIS-HIS-T03
## secondary_node_ids
SYS-CVS-T01-S01
## aliases
Visceral capillary | Capillary fenestrae | Diaphragmed pore
## arabic_label

## arabic_aliases
[clear]
## topic
Histology
## subtopic
Cardiovascular System
## microtopic
[clear]
## nanotopic
[clear]
## article_ids
ART-104-HIS-AV-CONNECTIONS-CAPILLARIES-SHUNTS
## related_article_ids
ART-104-HIS-CAPILLARY-TYPES
## related_concept_ids
CON-CVS-9585A65D9EDA4D | CON-CVS-E8964EBC8F2357
## resource_ids
src_18d3a953df4ca83c4e74
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-DDDE42F826A8
CLM-D94A31F8E172
CLM-BB577D4C3BA8
CLM-AE012CDEE69E
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

## review_due

## exclusion_reason

## modules
104 CPS
## module_subject
104 CPS > Histology > Cardiovascular System > A-V Connections
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
src_18d3a953df4ca83c4e74 | department_book | 2026 | p11 | 104 CPS
## weight_confidence
0.5
## confidence
0.8
## original_wording
[Histology department book p. 11] 2) Fenestrated (visceral) capillary ... Endothelium: Has pores covered by diaphragms ... Sites: Intestine, Endocrine gland, Renal glomerular capillaries (No diaphragms). N.B.: Endothelial Fenestrae (pores) are interrupted vascular endothelial cell that provide channels across the capillary wall. Diaphragm is a non-membranous cartwheel-like shape with a central thickening and 14 wedge shaped gaps, derived from the glycocalyx.
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
relatedArticleIds: ART-104-HIS-CAPILLARY-TYPES — the module's existing article teaching the continuous-versus-sinusoidal comparison this concept completes into a full three-way classification.
relatedConceptIds: CON-CVS-9585A65D9EDA4D (live, generated) already teaches continuous versus sinusoidal capillary and states the fenestrated/sinusoid confusion as its own pitfall; this concept is the third type that record's pitfalls field names but does not itself teach.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: This faculty distributes no video for this module.
atomicClaimIds: The id named here is reserved, in this module's own CLM-104-HIS-<SLUG>-01 shape, so a future evidence pass can write the matching claim under it without a rename; no claim or citation record exists yet at that id. Authoring evidence/104-CPS-claims.md is a separate lane's scope — this record carries only the concept and its teaching article.
resourceOccurrenceIds: Read from the department book by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the department histology book named on exam_signal.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: find-existing.mjs was run before minting; any near-miss it returned is recorded in this file's header, not here.
conflicts: The department book is the only source read for this concept; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
---

# Item
## label
The mononuclear phagocyte system is monocyte-derived phagocytes distributed under different names across almost every organ
## id
CON-HEM-D1628423BE0844
## canonical_key
mononuclear-phagocyte-system.definition-origin-and-distribution
## definition
The macrophage system, or mononuclear phagocytic system, is a group of highly phagocytic cells widely distributed in the body, constituting an important defence mechanism. All of its cells differentiate from blood monocytes. They take up a vital stain, such as trypan blue or Indian ink, injected into an animal, accumulating the dye in their cytoplasm. Histologically they have irregular surfaces with many pseudopodia, a well-developed Golgi complex, many lysosomes and residual bodies, prominent rough endoplasmic reticulum, and an eccentric oval or kidney-shaped nucleus. Their functions are phagocytosis and destruction of cell debris, dead cells and bacteria; antigen processing and presentation; destruction of aged erythrocytes with bile production and iron metabolism; and, after injury or inflammation, helping tissue healing by removing debris. The system is distributed by site under separate names: monocytes in blood; macrophages (histiocytes) in loose connective tissue and in the reticular stroma of bone marrow, spleen and lymph node; littoral cells in the walls of blood sinusoids of spleen and bone marrow; von Kupffer cells in the blood sinusoids of the liver; Langerhans cells in the skin; microglia in the central nervous system; dust cells and heart-failure cells in the lung alveoli; and osteoclasts in the Howship's lacunae of bone.
## explicit_objective
Define the mononuclear phagocyte system by its origin, its histological features and its vital-stain behaviour, and name its cell type at each of the eight listed sites.
## pitfalls
Treating the eight named cell types as eight different cell lines rather than one system under local names. Kupffer cells, dust cells, microglia and osteoclasts are all the same monocyte-derived phagocyte, sited differently.
## concept_type
classification
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
Mononuclear phagocytic system | Macrophage system | Reticuloendothelial system
## arabic_label

## arabic_aliases
[clear]
## topic
Histology
## subtopic
Lymphatic and Macrophage System
## microtopic
[clear]
## nanotopic
[clear]
## article_ids
ART-104-HIS-MACROPHAGE-SYSTEM
## related_article_ids
ART-104-HIS-RESPIRATORY-PORTION
## related_concept_ids
CON-RES-D8B1BE3C6CFABD
## resource_ids
src_18d3a953df4ca83c4e74
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-71BFF3E49324
CLM-09AE8639DFC2
CLM-5E2D45CC24AC
CLM-50619E017F92
CLM-169FEBB53360
CLM-5E03AB65976D
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

## review_due

## exclusion_reason

## modules
104 CPS
## module_subject
104 CPS > Histology > Lymphatic and Macrophage System > Macrophage system
## universities
kau
## learner_years
1
## blueprint_weight
0.05
## exam_weight_by_year
KAU_Y1=0.05
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_signal
src_18d3a953df4ca83c4e74 | department_book | 2026 | p25 | 104 CPS
## weight_confidence
0.5
## confidence
0.8
## original_wording
[Histology department book p. 25] Macrophage System (Mononuclear Phagocytic System). Definition: a group of highly phagocytic cells widely distributed in the body constituting an important defense mechanism. Origin: differentiates from blood monocytes. ... Distribution of cells of the mononuclear phagocytic system: 1. Monocytes — Blood ... 8. Osteoclasts — Howship's lacunae of bone.
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
relatedArticleIds: ART-104-HIS-RESPIRATORY-PORTION — teaches dust cells and heart-failure cells, the lung's own named member of this system.
relatedConceptIds: CON-RES-D8B1BE3C6CFABD (alveolar phagocytes) is this system's lung-specific instance, taught in the respiratory chapter rather than repeated here.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: This faculty distributes no video for this module.
atomicClaimIds: The id named here is reserved, in this module's own CLM-104-HIS-<SLUG>-01 shape, so a future evidence pass can write the matching claim under it without a rename; no claim or citation record exists yet at that id. Authoring evidence/104-CPS-claims.md is a separate lane's scope — this record carries only the concept and its teaching article.
resourceOccurrenceIds: Read from the department book by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the department histology book named on exam_signal.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: find-existing.mjs was run before minting; any near-miss it returned is recorded in this file's header, not here.
conflicts: The department book is the only source read for this concept; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
---

# Item
## label
The nasal cavity is a keratinized, hair-lined vestibule opening into two conchae-bearing fossae that condition inspired air
## id
CON-RES-1FF74892D5B943
## canonical_key
nasal-cavity.vestibule-and-fossae-regions
## definition
The nasal cavity is the external vestibule and the internal nasal fossae. The vestibule is the anterior dilated portion, lined with hairy keratinized stratified squamous epithelium that changes, deeper in, to non-keratinized stratified squamous epithelium; its epithelium carries thick short hairs, the vibrissae, that filter large particles out of the air. The nasal fossae are two chambers separated by the bony nasal septum, each bearing three bony shelf-like projections from its lateral wall — the superior, middle and inferior conchae. The lamina propria of the conchae is loose connective tissue containing large venous plexuses (swell bodies) and mucous and serous glands, and its function is to improve the conditioning of inspired air by increasing the surface area of the respiratory mucosa.
## explicit_objective
Describe the vestibule and the nasal fossae as the two regions of the nasal cavity, and state the function of the conchae.
## pitfalls
Allergic congestion of the swell bodies in the conchae's lamina propria, and epistaxis from the same vascular lamina propria after trauma, are both read-only clinical notes the book ties directly to this structure — not separate facts to learn apart from it.
## concept_type
structural_description
## status
under review
## support_mode
direct_statement
## subject
resp
## primary_node_id
DIS-HIS-T03
## secondary_node_ids
SYS-RES-T01-S01-M01
## aliases
Vestibule of the nose | Nasal fossae | Swell bodies
## arabic_label

## arabic_aliases
[clear]
## topic
Histology
## subtopic
Respiratory System
## microtopic
[clear]
## nanotopic
[clear]
## article_ids
ART-104-HIS-NASAL-MUCOSA
## related_article_ids
ART-104-HIS-LARYNX-TRACHEA-BRONCHI
## related_concept_ids
CON-RES-F818BF7BB20E31 | CON-RES-B7F9FACECA4AFF
## resource_ids
src_18d3a953df4ca83c4e74
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-71947D809041
CLM-D92A3DD582E5
CLM-291AA9BC8191
CLM-B7BAA3A65B67
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

## review_due

## exclusion_reason

## modules
104 CPS
## module_subject
104 CPS > Histology > Respiratory System > Conducting Portion
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
src_18d3a953df4ca83c4e74 | department_book | 2026 | p27 | 104 CPS
## weight_confidence
0.5
## confidence
0.8
## original_wording
[Histology department book p. 27] The nasal cavity consists of the external vestibule and the internal nasal fossae. ... Vestibule ... it is lined with hairy keratinized stratified squamous epithelium ... Nasal Fossae ... Each nasal fossa has 3 bony shelf-like projections (superior, middle and inferior conchae) ... Function: improve the conditioning of the inspired air by increasing the surface area of respiratory mucosa.
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
relatedArticleIds: This concept's teaching article, ART-104-HIS-NASAL-MUCOSA, already exists in this module (written for the live concept CON-RES-B7F9FACECA4AFF) and covers vestibule and fossae structure in full under its own 'Definition' section; no new article prose was written for this concept to avoid duplicating that coverage.
relatedConceptIds: CON-RES-F818BF7BB20E31 (live, epithelium of the nasal conchae) already teaches which concha carries which epithelium type, so that specific fact is not restated as this concept's core; this concept covers the vestibule and the fossae's general anatomy instead. CON-RES-B7F9FACECA4AFF (respiratory versus olfactory mucosa) is the comparison built on top of the regions this concept names.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: This faculty distributes no video for this module.
atomicClaimIds: The id named here is reserved, in this module's own CLM-104-HIS-<SLUG>-01 shape, so a future evidence pass can write the matching claim under it without a rename; no claim or citation record exists yet at that id. Authoring evidence/104-CPS-claims.md is a separate lane's scope — this record carries only the concept and its teaching article.
resourceOccurrenceIds: Read from the department book by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the department histology book named on exam_signal.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: find-existing.mjs was run before minting; any near-miss it returned is recorded in this file's header, not here.
conflicts: The department book is the only source read for this concept; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
---

# Item
## label
The conducting portion's epithelium has five cell types: ciliated, goblet, brush, basal and small granule cells
## id
CON-RES-38BA83C42FBE02
## canonical_key
conducting-portion-epithelium.five-cell-types
## definition
The epithelium lining most of the conducting portion is pseudostratified columnar ciliated with goblet cells, and five cell types are recognised within it. Ciliated columnar cells are the most abundant, each carrying about 300 motile cilia, their apical cytoplasm packed with the cilia's basal bodies and with mitochondria supplying energy for ciliary beating; they push mucus, with its trapped bacteria and dust, outward in one direction. Mucous goblet cells are next most numerous, their apical portions filled with mucin granules, secreting the mucus that covers the epithelium and traps particles. Brush cells are columnar cells with abundant apical microvilli and basal afferent nerve endings, acting as sensory receptors. Basal cells are small, rounded cells sitting on the basal lamina without reaching the lumen — the stem cells that replace the other types. Small granule cells are neuroendocrine cells of the APUD group, with numerous basal dense granules, secreting hormones such as serotonin and catecholamines that control airway and blood-vessel diameter and regulate mucous and serous secretion.
## explicit_objective
Name the conducting portion's five epithelial cell types and state the distinguishing feature and function of each.
## pitfalls
In smokers, mucus accumulates in the small airways because the normal ratio of ciliated to goblet cells reverses, or because the cilia are paralysed — a read-only clinical note that turns this cell-type list into a mechanism question rather than a naming one.
## concept_type
structural_description
## status
under review
## support_mode
direct_statement
## subject
resp
## primary_node_id
DIS-HIS-T03
## secondary_node_ids
SYS-RES-T01-S01-M01
## aliases
Respiratory epithelium cell types | Ciliated, goblet, brush, basal and small granule cells | Pseudostratified ciliated columnar epithelium
## arabic_label

## arabic_aliases
[clear]
## topic
Histology
## subtopic
Respiratory System
## microtopic
[clear]
## nanotopic
[clear]
## article_ids
ART-104-HIS-NASAL-MUCOSA
## related_article_ids
ART-104-HIS-LARYNX-TRACHEA-BRONCHI
## related_concept_ids
CON-RES-B7F9FACECA4AFF | CON-RES-B0D786E9E0644D
## resource_ids
src_18d3a953df4ca83c4e74
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-FCA8EC690A3E
CLM-3C1993BDC8B9
CLM-98AE69D7FB4E
CLM-74E83CC39518
CLM-E7BE7EF93C6A
CLM-141ED1132323
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

## review_due

## exclusion_reason

## modules
104 CPS
## module_subject
104 CPS > Histology > Respiratory System > Conducting Portion
## universities
kau
## learner_years
1
## blueprint_weight
0.13
## exam_weight_by_year
KAU_Y1=0.13
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_signal
src_18d3a953df4ca83c4e74 | department_book | 2026 | p27-28 | 104 CPS
## weight_confidence
0.5
## confidence
0.8
## original_wording
[Histology department book pp. 27-28] Epithelium that lines most of the conducting portion is pseudostratified columnar ciliated with goblet cells. Epithelial cell types: Five cell types are recognized. 1- Ciliated columnar cells ... 2- Mucous goblet cells ... 3- Brush cells ... 4- Basal cells ... 5- Small granule cells.
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
relatedArticleIds: This concept's teaching article, ART-104-HIS-NASAL-MUCOSA, already exists in this module and covers the five cell types in full under its own 'Mechanism' section; no new article prose was written for this concept to avoid duplicating that coverage.
relatedConceptIds: CON-RES-B7F9FACECA4AFF (respiratory versus olfactory mucosa) contrasts this epithelium with the olfactory one. CON-RES-B0D786E9E0644D (live, distal loss of goblet cells and cilia) is the structural-change fact this cell-type list sets up.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: This faculty distributes no video for this module.
atomicClaimIds: The id named here is reserved, in this module's own CLM-104-HIS-<SLUG>-01 shape, so a future evidence pass can write the matching claim under it without a rename; no claim or citation record exists yet at that id. Authoring evidence/104-CPS-claims.md is a separate lane's scope — this record carries only the concept and its teaching article.
resourceOccurrenceIds: Read from the department book by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the department histology book named on exam_signal.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: find-existing.mjs was run before minting; any near-miss it returned is recorded in this file's header, not here.
conflicts: The department book is the only source read for this concept; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
---

# Item
## label
Olfactory epithelium has three cell types — olfactory neurons, sustentacular cells and basal cells — over a lamina propria of Bowman's glands
## id
CON-RES-58840F56FB3A36
## canonical_key
olfactory-mucosa.cell-types-and-lamina-propria
## definition
Olfactory mucosa covers the roof and superior conchae of the nasal cavity and is formed of olfactory epithelium with its connective-tissue lamina propria. The epithelium is the neuro-epithelium responsible for smell, much thicker than respiratory epithelium, a modified pseudostratified columnar ciliated epithelium with no goblet cells, built of three cell types. Olfactory neurons are bipolar nerve cells whose dendrites extend to the surface and end in an olfactory vesicle bearing multiple basal bodies, from which arise cilia that are few, very long and non-motile, increasing the surface exposed to odorous substances; their axons pass into the lamina propria as olfactory nerve fibres. Sustentacular (supporting) cells are tall columnar cells with wide apices and narrow bases, apical microvilli in a fluid layer, and apical yellow lipofuscin granules that give olfactory mucosa its yellow colour; junctional complexes bind them to the olfactory cells. Basal cells are small pyramidal cells with basophilic cytoplasm and round nuclei, acting as stem cells for both the sensory and the supporting cells. The lamina propria beneath is dense connective tissue carrying olfactory nerve bundles and Bowman's glands, whose serous secretion reaches the surface through ducts and forms the fluid medium in which odorous substances dissolve around the olfactory cilia.
## explicit_objective
Name olfactory epithelium's three cell types and state what each contributes, and say what Bowman's glands secrete and why.
## pitfalls
Olfactory neurons are the only neurons considered capable of substantial regeneration, owing to the high regenerative capacity of the basal stem cells beneath them — a read-only fact worth holding against the cytogenetics chapter's statement that nerve cells are non-renewing.
## concept_type
structural_description
## status
under review
## support_mode
direct_statement
## subject
resp
## primary_node_id
DIS-HIS-T03
## secondary_node_ids
SYS-RES-T01-S01-M01
## aliases
Olfactory neurons | Sustentacular cells | Bowman's glands | Olfactory epithelium structure
## arabic_label

## arabic_aliases
[clear]
## topic
Histology
## subtopic
Respiratory System
## microtopic
[clear]
## nanotopic
[clear]
## article_ids
ART-104-HIS-NASAL-MUCOSA
## related_article_ids
ART-104-HIS-CELL-CYCLE-RENEWAL-DEATH
## related_concept_ids
CON-RES-B7F9FACECA4AFF | CON-RES-CCE62F7217A235
## resource_ids
src_18d3a953df4ca83c4e74
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-F641FC6315DF
CLM-EED8D0EA7B08
CLM-4E6041F460F2
CLM-828D9DD2D9B4
CLM-BCE51E1F371D
CLM-6CCDC307D44E
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

## review_due

## exclusion_reason

## modules
104 CPS
## module_subject
104 CPS > Histology > Respiratory System > Conducting Portion
## universities
kau
## learner_years
1
## blueprint_weight
0.12
## exam_weight_by_year
KAU_Y1=0.12
## clinical_relevance
0.25
## academic_relevance
0.9
## exam_signal
src_18d3a953df4ca83c4e74 | department_book | 2026 | p28-29 | 104 CPS
## weight_confidence
0.5
## confidence
0.8
## original_wording
[Histology department book pp. 28-29] A- Olfactory epithelium ... It is formed of three cells: 1- Olfactory neurons ... 2- Sustentacular (Supporting) cells ... 3- Basal cells ... B- Lamina propria: Dense C.T. that contains olfactory nerve bundles & Bowman's glands. N.B.: Bowman's glands secrete serous fluid that reaches surface through ducts.
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
relatedArticleIds: This concept's teaching article, ART-104-HIS-NASAL-MUCOSA, already exists in this module and covers all three olfactory cell types and Bowman's glands in full under its own 'Mechanism' section; no new article prose was written for this concept to avoid duplicating that coverage.
relatedConceptIds: CON-RES-B7F9FACECA4AFF (respiratory versus olfactory mucosa) is the comparison this structural detail sits behind. CON-RES-CCE62F7217A235 (live, regeneration of olfactory neurons) already covers the regeneration fact named in this concept's pitfalls.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: This faculty distributes no video for this module.
atomicClaimIds: The id named here is reserved, in this module's own CLM-104-HIS-<SLUG>-01 shape, so a future evidence pass can write the matching claim under it without a rename; no claim or citation record exists yet at that id. Authoring evidence/104-CPS-claims.md is a separate lane's scope — this record carries only the concept and its teaching article.
resourceOccurrenceIds: Read from the department book by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the department histology book named on exam_signal.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: find-existing.mjs was run before minting; any near-miss it returned is recorded in this file's header, not here.
conflicts: The department book is the only source read for this concept; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
---

# Item
## label
The larynx is mostly respiratory epithelium over hyaline and elastic cartilages, except at the true vocal cords
## id
CON-RES-099718106C38CD
## canonical_key
larynx.vocal-cords-and-cartilages
## definition
The larynx connects the pharynx with the trachea. It is lined with respiratory epithelium, except over the true vocal cords and the lingual surface of the epiglottis, which are covered by stratified squamous epithelium; its connective-tissue lamina propria contains the laryngeal cartilages. The large cartilages — thyroid, cricoid and most of the arytenoids — are hyaline and may calcify with age; the small cartilages — epiglottis, cuneiform, corniculate and the tip of the arytenoids — are elastic and do not calcify. Two pairs of folds extend into the laryngeal lumen. The upper pair, the false vocal cords (vestibular folds), are lined by respiratory epithelium and prevent food and fluid from entering the larynx. The lower pair, the true vocal cords, are lined by non-keratinized stratified squamous epithelium and produce voice. Overall the larynx produces voice through the true vocal cords, maintains an open airway through its cartilages, and, through the epiglottis and false vocal cords, prevents food and fluid from entering the respiratory passages.
## explicit_objective
State which parts of the larynx are lined by stratified squamous rather than respiratory epithelium, and contrast the false and true vocal cords by lining and function.
## pitfalls
Assuming the whole larynx is lined the same way because 'respiratory epithelium' is stated first. The true vocal cords and the lingual epiglottis are the two named exceptions, and it is exactly those two mechanically abraded surfaces that switch to a tougher, non-keratinized stratified squamous lining.
## concept_type
structural_description
## status
under review
## support_mode
direct_statement
## subject
resp
## primary_node_id
DIS-HIS-T03
## secondary_node_ids
SYS-RES-T01-S01-M01
## aliases
True and false vocal cords | Laryngeal cartilages | Vestibular folds
## arabic_label

## arabic_aliases
[clear]
## topic
Histology
## subtopic
Respiratory System
## microtopic
[clear]
## nanotopic
[clear]
## article_ids
ART-104-HIS-LARYNX-TRACHEA-BRONCHI
## related_article_ids
ART-104-HIS-NASAL-MUCOSA
## related_concept_ids
CON-RES-38BA83C42FBE02
## resource_ids
src_18d3a953df4ca83c4e74
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-C79D7FDD6F6F
CLM-573DCB1C27B2
CLM-D829BFEC13F4
CLM-9F5C97104491
CLM-0DA00580A532
CLM-39223C024747
CLM-F36BDF7098DC
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

## review_due

## exclusion_reason

## modules
104 CPS
## module_subject
104 CPS > Histology > Respiratory System > Conducting Portion
## universities
kau
## learner_years
1
## blueprint_weight
0.09
## exam_weight_by_year
KAU_Y1=0.09
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_signal
src_18d3a953df4ca83c4e74 | department_book | 2026 | p30-31 | 104 CPS
## weight_confidence
0.5
## confidence
0.8
## original_wording
[Histology department book pp. 30-31] LARYNX ... It is lined with: 1. Respiratory epithelium except true vocal cords and lingual surface of epiglottis ... 2. C.T. lamina propria that contains the laryngeal cartilages ... Vocal Cords: They are two pairs of folds ... Upper pair (False vocal cords) ... Lower pair (True vocal cords).
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
relatedArticleIds: ART-104-HIS-NASAL-MUCOSA — the module's article for the epithelium types this concept's lining exceptions are stated against.
relatedConceptIds: CON-RES-38BA83C42FBE02 — the five-cell-type respiratory epithelium that lines most of the larynx, against which its two squamous exceptions are contrasted.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: This faculty distributes no video for this module.
atomicClaimIds: The id named here is reserved, in this module's own CLM-104-HIS-<SLUG>-01 shape, so a future evidence pass can write the matching claim under it without a rename; no claim or citation record exists yet at that id. Authoring evidence/104-CPS-claims.md is a separate lane's scope — this record carries only the concept and its teaching article.
resourceOccurrenceIds: Read from the department book by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the department histology book named on exam_signal.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: find-existing.mjs was run before minting; any near-miss it returned is recorded in this file's header, not here.
conflicts: The department book is the only source read for this concept; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
---

# Item
## label
Cartilage, glands and goblet cells fall away from extrapulmonary bronchus to bronchiole, while smooth muscle becomes more developed and Clara cells appear
## id
CON-RES-7C79F2D68F1003
## canonical_key
bronchi-and-bronchioles.structural-progression-and-clara-cells
## definition
The trachea divides into two primary (extrapulmonary) bronchi, structurally identical to the trachea; each penetrates a lung's hilum as intrapulmonary (secondary) bronchi, which divide repeatedly into bronchioles. Extrapulmonary bronchi have a wider, less-folded lumen, pseudostratified ciliated epithelium with many goblet cells, an elastic membrane separating mucosa from submucosa, a true submucosa, incomplete C-shaped hyaline cartilage rings, smooth muscle lying posteriorly at the ends of the cartilage, and mucoserous glands and lymphatic nodules in the submucosa. Intrapulmonary bronchi keep the same epithelium but with fewer goblet cells, lose the elastic membrane and submucosa as distinct layers (though the lamina propria is rich in elastic fibres and lymphatic follicles), replace the C-shaped rings with multiple plates of hyaline cartilage in the adventitia, arrange their smooth muscle spirally around the whole lumen, and carry their glands and nodules in the adventitia between the cartilage plates. Bronchioles go further: simple columnar or cuboidal ciliated epithelium with Clara cells and no goblet cells, cilia disappearing as the bronchiole narrows; more developed, circularly arranged smooth muscle whose contraction now controls airflow to the gas-exchange sites rather than merely shortening the airway; and no cartilage plate, mucoserous gland or lymphatic nodule at all. Clara cells — dome-shaped, non-ciliated, rich in basal rough endoplasmic reticulum, apical smooth endoplasmic reticulum, mitochondria, Golgi apparatus and glycoprotein-containing secretory granules — protect the bronchiolar epithelium, degrade inhaled toxins, secrete a surfactant-like material that keeps the bronchiole patent, protect against emphysema by inhibiting macrophage-secreted protease and elastase, and may act as stem cells for the bronchiolar lining.
## explicit_objective
Trace, from extrapulmonary bronchus to bronchiole, how the epithelium, cartilage, smooth muscle and glands change, and state four functions of the Clara cell.
## pitfalls
Bronchial asthma is an allergic condition in which spasm of bronchiolar smooth muscle constricts the airway and causes difficulty during expiration — a read-only clinical note the book ties to exactly the circularly arranged, well-developed bronchiolar muscle this progression ends on.
## concept_type
comparison
## status
under review
## support_mode
direct_statement
## subject
resp
## primary_node_id
DIS-HIS-T03
## secondary_node_ids
SYS-RES-T01-S01-M01
## aliases
Extrapulmonary versus intrapulmonary bronchus | Bronchus versus bronchiole | Clara cells
## arabic_label

## arabic_aliases
[clear]
## topic
Histology
## subtopic
Respiratory System
## microtopic
[clear]
## nanotopic
[clear]
## article_ids
ART-104-HIS-LARYNX-TRACHEA-BRONCHI
## related_article_ids
ART-104-HIS-RESPIRATORY-PORTION
## related_concept_ids
CON-RES-A570461528F6E3 | CON-RES-52A974515C690A
## resource_ids
src_18d3a953df4ca83c4e74
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-D48796CB012A
CLM-8E29F26B3253
CLM-6D28B187A324
CLM-25DE71D693A7
CLM-CEBD01983F12
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

## review_due

## exclusion_reason

## modules
104 CPS
## module_subject
104 CPS > Histology > Respiratory System > Conducting Portion
## universities
kau
## learner_years
1
## blueprint_weight
0.14
## exam_weight_by_year
KAU_Y1=0.14
## clinical_relevance
0.35
## academic_relevance
0.9
## exam_signal
src_18d3a953df4ca83c4e74 | department_book | 2026 | p31-33 | 104 CPS
## weight_confidence
0.5
## confidence
0.8
## original_wording
[Histology department book pp. 31-33] BRONCHI AND BRONCHIOLES ... Differences between Extrapulmonary and Intrapulmonary Bronchi ... Differences between Intrapulmonary Bronchi and Bronchioles ... Clara Cells ... Functions: 1. Protection ... 2. Degradation of toxins ... 3. Secretion of a surfactant like material ... 4. Protection against emphysema ... 5. They may act as stem cells.
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
relatedArticleIds: None named — this concept's own teaching article carries the full bronchus-to-bronchiole progression.
relatedConceptIds: CON-RES-A570461528F6E3 (live, tracheal wall layers) already teaches the trachea's own four-layer wall, which the extrapulmonary bronchus repeats structurally and this concept starts from. CON-RES-52A974515C690A (respiratory portion) is the transition this progression leads into.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: This faculty distributes no video for this module.
atomicClaimIds: The id named here is reserved, in this module's own CLM-104-HIS-<SLUG>-01 shape, so a future evidence pass can write the matching claim under it without a rename; no claim or citation record exists yet at that id. Authoring evidence/104-CPS-claims.md is a separate lane's scope — this record carries only the concept and its teaching article.
resourceOccurrenceIds: Read from the department book by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the department histology book named on exam_signal.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: find-existing.mjs was run before minting; any near-miss it returned is recorded in this file's header, not here.
conflicts: The department book is the only source read for this concept; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
---

# Item
## label
The respiratory portion — respiratory bronchioles, alveolar ducts, sacs and alveoli — is where gas exchange occurs
## id
CON-RES-52A974515C690A
## canonical_key
respiratory-portion.components-and-transition-from-conducting-portion
## definition
The respiratory portion's function is gas exchange between blood and inspired air; it comprises respiratory bronchioles, alveolar ducts, alveolar sacs and alveoli. Respiratory bronchioles are the transition between the conducting and respiratory portions: a mucosa of simple cuboidal ciliated epithelium with Clara cells (cilia absent distally) on a corium of elastic-fibre-rich connective tissue, a thin musculosa of smooth muscle, and a loose adventitia; their wall is interrupted by the openings of some alveoli, where gas exchange begins. Alveolar ducts are the free terminations of the respiratory bronchioles, lined completely by openings of alveoli, with smooth muscle only at those openings. Alveolar sacs are groups of adjacent alveoli opening into a common central space; both ducts and sacs are lined by alveolar epithelium. Lung alveoli are the structural and functional units of gas exchange, opening into alveolar sacs, ducts and respiratory bronchioles, lined by pneumocytes types I and II; alveolar pores (of Kohn) between adjoining alveolar walls equalise pressure between alveoli and provide collateral air circulation when a bronchiole is obstructed.
## explicit_objective
Name the four components of the respiratory portion in the order air passes through them, and state the function of the pores of Kohn.
## pitfalls
Placing the transition from conducting to respiratory portion at the alveolar duct rather than the respiratory bronchiole. The respiratory bronchiole is already gas-exchanging tissue — its wall is interrupted by the first alveolar openings — even though it keeps a cuboidal, Clara-cell epithelium that still looks like conducting-portion lining.
## concept_type
structural_description
## status
under review
## support_mode
direct_statement
## subject
resp
## primary_node_id
DIS-HIS-T03
## secondary_node_ids
SYS-RES-T01-S01-M01
## aliases
Respiratory bronchiole | Alveolar duct | Alveolar sac | Pores of Kohn
## arabic_label

## arabic_aliases
[clear]
## topic
Histology
## subtopic
Respiratory System
## microtopic
[clear]
## nanotopic
[clear]
## article_ids
ART-104-HIS-RESPIRATORY-PORTION
## related_article_ids
ART-104-HIS-LARYNX-TRACHEA-BRONCHI
## related_concept_ids
CON-RES-7C79F2D68F1003 | CON-RES-94F66D51DB5B4D | CON-RES-BECD91B06EA39D
## resource_ids
src_18d3a953df4ca83c4e74
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-4E1D08498C2D
CLM-7EA41B4F9DE7
CLM-45160AC7C066
CLM-22D4E7335DA5
CLM-62CC5F4A5E39
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

## review_due

## exclusion_reason

## modules
104 CPS
## module_subject
104 CPS > Histology > Respiratory System > Respiratory Portion
## universities
kau
## learner_years
1
## blueprint_weight
0.11
## exam_weight_by_year
KAU_Y1=0.11
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_signal
src_18d3a953df4ca83c4e74 | department_book | 2026 | p34 | 104 CPS
## weight_confidence
0.5
## confidence
0.8
## original_wording
[Histology department book p. 34] II- Respiratory Portion: Function: Gas exchange between blood and inspired air. It includes respiratory bronchioles, alveolar sacs, alveolar ducts & alveoli. RESPIRATORY BRONCHIOLES ... ALVEOLAR DUCTS ... ALVEOLAR SACS ... LUNG ALVEOLI ... Alveolar pores (of Kohn) are present between their walls.
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
relatedArticleIds: None named — this concept's own teaching article covers the full respiratory portion.
relatedConceptIds: CON-RES-7C79F2D68F1003 (bronchi and bronchioles) is the conducting-portion tissue this transitions from. CON-RES-94F66D51DB5B4D (pneumocyte types) describes the alveolar lining named here. CON-RES-BECD91B06EA39D (live, terminal bronchiole immediately proximal to respiratory bronchiole) is the conducting-portion structure immediately upstream of this concept's first component.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: This faculty distributes no video for this module.
atomicClaimIds: The id named here is reserved, in this module's own CLM-104-HIS-<SLUG>-01 shape, so a future evidence pass can write the matching claim under it without a rename; no claim or citation record exists yet at that id. Authoring evidence/104-CPS-claims.md is a separate lane's scope — this record carries only the concept and its teaching article.
resourceOccurrenceIds: Read from the department book by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the department histology book named on exam_signal.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: find-existing.mjs was run before minting; any near-miss it returned is recorded in this file's header, not here.
conflicts: The department book is the only source read for this concept; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
---

# Item
## label
Type I pneumocytes are flat cells covering 97% of the alveolar surface for gas exchange; type II are cuboidal surfactant-secreting stem cells
## id
CON-RES-94F66D51DB5B4D
## canonical_key
pneumocyte-type-i-vs-type-ii.structure-and-function
## definition
Type I pneumocytes (squamous alveolar cells) cover about 97% of the alveolar surface. By light microscopy they are flat squamous cells with flat nuclei and little cytoplasm; by electron microscopy they show few organelles in the perinuclear region and small pinocytic vesicles that turn over pulmonary surfactant, and they hold tight junctions with both other type I and type II cells. Their function is to provide a very thin wall for gas exchange and, through those tight junctions, to prevent leakage of tissue fluid into the alveolar cavity. Type II pneumocytes (great alveolar cells) cover only about 3% of the surface. They are cuboidal cells bulging into the air space, with central rounded nuclei and foamy cytoplasm; by electron microscopy they are rich in mitochondria, ribosomes, rough endoplasmic reticulum and a well-developed Golgi body, with membrane-bound multilamellar bodies (cytosomes) and a free surface bearing short microvilli. Their function is to secrete pulmonary surfactant and to act as the stem cell for both pneumocyte types.
## explicit_objective
Contrast type I and type II pneumocytes by the fraction of alveolar surface each covers, their light- and electron-microscopic appearance, and their function.
## pitfalls
Assuming the cell covering most of the alveolar surface must be the more metabolically active one. It is the reverse: the type I cell is a thin, organelle-poor wall built purely for diffusion, while the much rarer type II cell carries the secretory machinery and is also the stem cell for both types.
## concept_type
comparison
## status
under review
## support_mode
direct_statement
## subject
resp
## primary_node_id
DIS-HIS-T03
## secondary_node_ids
SYS-RES-T01-S01-M01
## aliases
Type I pneumocyte | Type II pneumocyte | Squamous alveolar cell | Great alveolar cell
## arabic_label

## arabic_aliases
[clear]
## topic
Histology
## subtopic
Respiratory System
## microtopic
[clear]
## nanotopic
[clear]
## article_ids
ART-104-HIS-RESPIRATORY-PORTION
## related_article_ids
ART-104-PHY-LUNG-RECOIL-AND-SURFACTANT
## related_concept_ids
CON-RES-AE642FB46D38E2 | CON-RES-0A1B54247E50C8 | CON-RES-E08739F0C0C229 | CON-RES-52A974515C690A
## resource_ids
src_18d3a953df4ca83c4e74
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-5D34E9C7D86A
CLM-875F35140519
CLM-C0DA59CEE7E0
CLM-1D693C5DA4C4
CLM-1FC96B5026BC
CLM-932B6009CB4B
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

## review_due

## exclusion_reason

## modules
104 CPS
## module_subject
104 CPS > Histology > Respiratory System > Respiratory Portion
## universities
kau
## learner_years
1
## blueprint_weight
0.11
## exam_weight_by_year
KAU_Y1=0.11
## clinical_relevance
0.35
## academic_relevance
0.9
## exam_signal
src_18d3a953df4ca83c4e74 | department_book | 2026 | p35 | 104 CPS
## weight_confidence
0.5
## confidence
0.8
## original_wording
[Histology department book p. 35] Differences Between Type I And Type II Pneumocyte: Alveolar surface 97% / 3% ... L.M. ... E.M. ... Function.
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
relatedArticleIds: None named — this concept's own teaching article carries the full comparison.
relatedConceptIds: CON-RES-AE642FB46D38E2, CON-RES-0A1B54247E50C8 and CON-RES-E08739F0C0C229 (all live) already name type I and type II pneumocytes as bare identification facts; this concept is the full LM/EM/function comparison the department book teaches, referencing rather than repeating those thinner records. CON-RES-52A974515C690A (respiratory portion) is where these cells sit.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: This faculty distributes no video for this module.
atomicClaimIds: The id named here is reserved, in this module's own CLM-104-HIS-<SLUG>-01 shape, so a future evidence pass can write the matching claim under it without a rename; no claim or citation record exists yet at that id. Authoring evidence/104-CPS-claims.md is a separate lane's scope — this record carries only the concept and its teaching article.
resourceOccurrenceIds: Read from the department book by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the department histology book named on exam_signal.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: find-existing.mjs was run before minting; any near-miss it returned is recorded in this file's header, not here.
conflicts: The department book is the only source read for this concept; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
---

# Item
## label
The blood-air barrier is four layers: surfactant film, pneumocyte type I, fused basal lamina, and capillary endothelium
## id
CON-RES-ED5ADFB428C5BF
## canonical_key
blood-air-barrier.four-layers
## definition
The blood-air barrier is the structure through which gas exchange occurs, comprising four layers: a pulmonary surfactant film on the alveolar surface; pneumocyte type I; the fused basal lamina of the type I pneumocyte and the capillary endothelial cell; and the endothelial cell of the blood capillary itself. The interalveolar septa in which this barrier sits are delicate partitions of loose connective tissue between adjacent alveoli, containing the richest capillary network in the body, elastic fibres allowing lung expansion on inspiration, reticular fibres supporting the tissue and preventing overexpansion that would injure the capillaries, and extravasated leucocytes, especially monocytes, that become alveolar phagocytes.
## explicit_objective
Name the blood-air barrier's four layers in the order a gas molecule crosses them, and state what the interalveolar septum contains besides the barrier itself.
## pitfalls
Respiratory distress syndrome — surfactant deficiency associated with premature labour — and emphysema — permanent alveolar enlargement from destruction of the interalveolar septa by dust-cell proteases and elastases, mainly from smoking — are both read-only clinical notes the book attaches directly to this barrier and the septum around it, not separate facts.
## concept_type
structural_description
## status
under review
## support_mode
direct_statement
## subject
resp
## primary_node_id
DIS-HIS-T03
## secondary_node_ids
SYS-RES-T01-S01-M01
## aliases
Alveolar-capillary membrane | Interalveolar septum
## arabic_label

## arabic_aliases
[clear]
## topic
Histology
## subtopic
Respiratory System
## microtopic
[clear]
## nanotopic
[clear]
## article_ids
ART-104-HIS-RESPIRATORY-PORTION
## related_article_ids
ART-104-PHY-LUNG-RECOIL-AND-SURFACTANT
## related_concept_ids
CON-RES-94F66D51DB5B4D | CON-RES-4D4CBF3BB8AF1E
## resource_ids
src_18d3a953df4ca83c4e74
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-52160192B0FE
CLM-FBD409DFC981
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

## review_due

## exclusion_reason

## modules
104 CPS
## module_subject
104 CPS > Histology > Respiratory System > Respiratory Portion
## universities
kau
## learner_years
1
## blueprint_weight
0.12
## exam_weight_by_year
KAU_Y1=0.12
## clinical_relevance
0.4
## academic_relevance
0.9
## exam_signal
src_18d3a953df4ca83c4e74 | department_book | 2026 | p35 | 104 CPS
## weight_confidence
0.5
## confidence
0.8
## original_wording
[Histology department book p. 35] Blood - Air Barrier: It represents the structures through which gas exchange occurs. It comprises four layers: 1. Pulmonary surfactant film on alveolar surface 2. Pneumocyte type I. 3. Fused basal lamina of pneumocyte type I and capillary endothelial cells. 4. Endothelial cells of blood capillaries.
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
relatedArticleIds: None named — this concept's own teaching article carries the barrier and the septum it sits in.
relatedConceptIds: CON-RES-94F66D51DB5B4D (pneumocyte types) names the type I cell that forms this barrier's second layer. CON-RES-4D4CBF3BB8AF1E (live, generated, pulmonary surfactant functions) is the physiology counterpart of this barrier's first layer.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: This faculty distributes no video for this module.
atomicClaimIds: The id named here is reserved, in this module's own CLM-104-HIS-<SLUG>-01 shape, so a future evidence pass can write the matching claim under it without a rename; no claim or citation record exists yet at that id. Authoring evidence/104-CPS-claims.md is a separate lane's scope — this record carries only the concept and its teaching article.
resourceOccurrenceIds: Read from the department book by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the department histology book named on exam_signal.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: find-existing.mjs was run before minting; any near-miss it returned is recorded in this file's header, not here.
conflicts: The department book is the only source read for this concept; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
---

# Item
## label
Alveolar phagocytes are blood-monocyte-derived dust cells engulfing dust and heart-failure cells engulfing red cells, cleared by three routes
## id
CON-RES-D8B1BE3C6CFABD
## canonical_key
alveolar-phagocytes.dust-cells-and-heart-failure-cells
## definition
Alveolar phagocytes are of two functional kinds, both originating from blood monocytes and both bulging from the interalveolar wall or lying free inside the alveoli, and both stained by a vital stain such as trypan blue. Dust cells engulf inhaled dust particles, which are then visible in their cytoplasm. Heart-failure cells engulf red blood cells in states of pulmonary congestion, such as congestive heart failure, and their cytoplasm turns brick-red from haemosiderin granules — the iron pigment left after the engulfed erythrocytes break down. Once loaded, alveolar phagocytes are cleared by one of three routes: migration into the bronchioles to be coughed up in the sputum; exit from the lung through the lymphatic drainage; or remaining in the interalveolar septa.
## explicit_objective
Distinguish dust cells from heart-failure cells by what each engulfs and by cytoplasmic appearance, and name their three possible fates.
## pitfalls
Reading the brick-red cytoplasm of a heart-failure cell as a stain artefact rather than haemosiderin from digested erythrocytes — the colour is diagnostic of pulmonary congestion, not of the trypan-blue vital stain the cell also takes up.
## concept_type
comparison
## status
under review
## support_mode
direct_statement
## subject
resp
## primary_node_id
DIS-HIS-T03
## secondary_node_ids
SYS-RES-T01-S01-M01
## aliases
Dust cells | Heart-failure cells | Alveolar macrophages
## arabic_label

## arabic_aliases
[clear]
## topic
Histology
## subtopic
Respiratory System
## microtopic
[clear]
## nanotopic
[clear]
## article_ids
ART-104-HIS-RESPIRATORY-PORTION
## related_article_ids
ART-104-HIS-MACROPHAGE-SYSTEM
## related_concept_ids
CON-RES-9B9526985BB441 | CON-HEM-D1628423BE0844
## resource_ids
src_18d3a953df4ca83c4e74
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-9D6C8373BC00
CLM-A3DC9475D37A
CLM-0750943C8026
CLM-59121C9BDB2F
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

## review_due

## exclusion_reason

## modules
104 CPS
## module_subject
104 CPS > Histology > Respiratory System > Alveolar Phagocytes
## universities
kau
## learner_years
1
## blueprint_weight
0.06
## exam_weight_by_year
KAU_Y1=0.06
## clinical_relevance
0.4
## academic_relevance
0.9
## exam_signal
src_18d3a953df4ca83c4e74 | department_book | 2026 | p36 | 104 CPS
## weight_confidence
0.5
## confidence
0.8
## original_wording
[Histology department book p. 36] Alveolar Phagocytes: 1- dust cells / 2- Heart failure cells. Origin: Blood monocytes. Site: Bulging from the interalveolar wall or free inside the alveoli. Function: Engulf dust. / Engulf RBCs in congestive heart failure. Cytoplasm: Dust particles / brick red in color by hemosiderin granule. Fate: a) Migrate into bronchioles ... b) Exit the lung through lymphatic drainage. c) Remain in the interalveolar septa.
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
relatedArticleIds: ART-104-HIS-MACROPHAGE-SYSTEM — the module's article for the mononuclear phagocyte system this cell type belongs to.
relatedConceptIds: CON-RES-9B9526985BB441 (live, 'Origin of alveolar macrophages') already names the blood-monocyte origin of dust and heart-failure cells; this concept is the fuller site/function/cytoplasm/fate comparison the department book teaches, referencing rather than repeating that narrower record. CON-HEM-D1628423BE0844 (mononuclear phagocyte system) is the body-wide system this is the lung's instance of.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: This faculty distributes no video for this module.
atomicClaimIds: The id named here is reserved, in this module's own CLM-104-HIS-<SLUG>-01 shape, so a future evidence pass can write the matching claim under it without a rename; no claim or citation record exists yet at that id. Authoring evidence/104-CPS-claims.md is a separate lane's scope — this record carries only the concept and its teaching article.
resourceOccurrenceIds: Read from the department book by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the department histology book named on exam_signal.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: find-existing.mjs was run before minting; any near-miss it returned is recorded in this file's header, not here.
conflicts: The department book is the only source read for this concept; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
---

# Item
## label
The cell cycle is mitosis plus a three-phase interphase, with a G0 stable phase for cells that have left the cycle
## id
CON-FND-9C205E44C3404D
## canonical_key
cell-cycle.phases-g1-s-g2-m-and-g0
## definition
The cell cycle is a series of events within the cell that prepare it for division into two daughter cells, recognised in two phases. Mitosis is the period of division itself, changes visible by microscope, lasting about one hour. Interphase is the period between two successive divisions, changes not detectable by microscope, lasting about 20 hours in rapidly dividing cells, and subdivided into three phases. Gap 1 (G1), about 8 hours: the daughter cell's nucleus holds 46 single chromosomes (s-chromosomes, or chromatids); the cell grows and acquires energy as ATP; RNA and protein synthesis needed for DNA duplication occurs; and the cell becomes a specialised working cell — the more specialised, the longer G1 and the lower the rate of division. Synthesis (S), about 8 hours: DNA duplicates, so each cell now holds 46 double (d-) chromosomes, and the centrioles duplicate. Gap 2 (G2), about 4 hours: RNA and proteins essential for division are synthesised, energy for mitosis is stored, tubulin is made to build the mitotic microtubules, and any DNA replication error is corrected. Cells that have left the cycle are said to be in the stable, or G0, phase — a resting stage outside the cycle in which most specialised working cells spend a prolonged G1.
## explicit_objective
Name the cell cycle's phases in order, state the chromosome number and type at G1 versus S, and define G0.
## pitfalls
Confusing the s-chromosome (single-stranded chromatid, present through G1) with the d-chromosome (double-stranded, present from S phase onward) — the '46 chromosomes' fact is true in both G1 and after S, but what a chromosome is made of has changed.
## concept_type
mechanism
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
DIS-HIS-T01
## secondary_node_ids
[clear]
## aliases
Interphase | G0 phase | G1, S and G2 phases
## arabic_label

## arabic_aliases
[clear]
## topic
Histology
## subtopic
Cytogenetics
## microtopic
[clear]
## nanotopic
[clear]
## article_ids
ART-104-HIS-CELL-CYCLE-RENEWAL-DEATH
## related_article_ids
ART-104-HIS-CELL-RENEWAL-AND-ANEUPLOIDY
## related_concept_ids
CON-FND-A2E40256517389 | CON-FND-4699C7DBCE159A
## resource_ids
src_18d3a953df4ca83c4e74
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-0C0E8A10CDF0
CLM-5D726723382B
CLM-1125E3A886CE
CLM-486247DEFAFA
CLM-74C799FCEA2F
CLM-DE9D0FDEFB52
CLM-4F15E15B7B26
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

## review_due

## exclusion_reason

## modules
104 CPS
## module_subject
104 CPS > Histology > Cytogenetics > The Cell Cycle
## universities
kau
## learner_years
1
## blueprint_weight
0.06
## exam_weight_by_year
KAU_Y1=0.06
## clinical_relevance
0.2
## academic_relevance
0.9
## exam_signal
src_18d3a953df4ca83c4e74 | department_book | 2026 | p38-39 | 104 CPS
## weight_confidence
0.5
## confidence
0.8
## original_wording
[Histology department book pp. 38-39] The Cell Cycle - The cell cycle is a series of events within the cell that prepare the cell for dividing into two daughter cells. Two phases of the cell cycle can be recognized: Mitosis ... Interphase ... The interphase is subdivided into three phases: Gap 1 phase (Gl phase) ... Synthesis phase (S phase) ... Gap 2 phase (G2 phase) ... Stable phase (G0 phase).
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
relatedArticleIds: ART-104-HIS-CELL-RENEWAL-AND-ANEUPLOIDY — the module's existing article for the concept this one sits directly beside.
relatedConceptIds: CON-FND-A2E40256517389 (live, generated, cell renewal classification) already teaches how specialised cells behave with respect to G0; this concept is the cycle's phase structure that classification is built on. CON-FND-4699C7DBCE159A (stem cells) is taught from the same book pages.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: This faculty distributes no video for this module.
atomicClaimIds: The id named here is reserved, in this module's own CLM-104-HIS-<SLUG>-01 shape, so a future evidence pass can write the matching claim under it without a rename; no claim or citation record exists yet at that id. Authoring evidence/104-CPS-claims.md is a separate lane's scope — this record carries only the concept and its teaching article.
resourceOccurrenceIds: Read from the department book by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the department histology book named on exam_signal.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: find-existing.mjs was run before minting; any near-miss it returned is recorded in this file's header, not here.
conflicts: The department book is the only source read for this concept; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
---

# Item
## label
Stem cells self-renew and are pluripotential, giving rise to more than one specialised cell type, or unipotential, giving rise to only one
## id
CON-FND-4699C7DBCE159A
## canonical_key
stem-cells.pluripotential-and-unipotential-types
## definition
Stem cells are undifferentiated cells capable of self-renewal, of two types. Pluripotential (multipotential) stem cells have the potential to give rise to more than one type of specialised cell — for example, blood cells, and the cells lining the gastrointestinal tract. Unipotential stem cells are able to produce only one type of specialised cell — for example, male germ cells.
## explicit_objective
Define a stem cell and distinguish a pluripotential from a unipotential stem cell, with the book's own example of each.
## pitfalls
Assuming 'pluripotential' means unlimited potential. The book's own bar is comparative — more than one specialised type — not a claim that a pluripotential stem cell can become anything; a unipotential stem cell such as the male germ cell is still a true stem cell, simply restricted to one fate.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
DIS-HIS-T01
## secondary_node_ids
[clear]
## aliases
Pluripotential stem cells | Multipotential stem cells | Unipotential stem cells
## arabic_label

## arabic_aliases
[clear]
## topic
Histology
## subtopic
Cytogenetics
## microtopic
[clear]
## nanotopic
[clear]
## article_ids
ART-104-HIS-CELL-CYCLE-RENEWAL-DEATH
## related_article_ids
ART-104-HIS-CELL-RENEWAL-AND-ANEUPLOIDY
## related_concept_ids
CON-FND-A2E40256517389 | CON-FND-9C205E44C3404D
## resource_ids
src_18d3a953df4ca83c4e74
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-254976608DE5
CLM-B507B9788C27
CLM-8C61F2239B1D
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

## review_due

## exclusion_reason

## modules
104 CPS
## module_subject
104 CPS > Histology > Cytogenetics > The Cell Cycle
## universities
kau
## learner_years
1
## blueprint_weight
0.05
## exam_weight_by_year
KAU_Y1=0.05
## clinical_relevance
0.2
## academic_relevance
0.9
## exam_signal
src_18d3a953df4ca83c4e74 | department_book | 2026 | p39 | 104 CPS
## weight_confidence
0.5
## confidence
0.8
## original_wording
[Histology department book p. 39] Stem Cells: Undifferentiated cells that are capable of self renewal. They are of two types: 1- Pluripotential or multipotential stem cells ... 2- Unipotential stem cells.
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
relatedArticleIds: None named — this concept's own teaching article carries stem-cell classification alongside the cell cycle and cell death.
relatedConceptIds: CON-FND-A2E40256517389 (live, generated, cell renewal classification) is the closest sibling — that concept classifies specialised cells by renewal ability; this one classifies the stem cells that do the renewing. CON-FND-9C205E44C3404D (cell cycle phases) is taught from the same book pages.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: This faculty distributes no video for this module.
atomicClaimIds: The id named here is reserved, in this module's own CLM-104-HIS-<SLUG>-01 shape, so a future evidence pass can write the matching claim under it without a rename; no claim or citation record exists yet at that id. Authoring evidence/104-CPS-claims.md is a separate lane's scope — this record carries only the concept and its teaching article.
resourceOccurrenceIds: Read from the department book by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the department histology book named on exam_signal.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: find-existing.mjs was run before minting; any near-miss it returned is recorded in this file's header, not here.
conflicts: The department book is the only source read for this concept; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
---

# Item
## label
Necrosis is pathological cell swelling and rupture; apoptosis is a programmed, active shrinkage, both ending in phagocytosis by macrophages
## id
CON-FND-E44369E755E9F7
## canonical_key
necrosis-vs-apoptosis.comparison
## definition
Two forms of cell death are recognised. Necrosis is a pathological condition resulting from anoxia, mechanical injury or exposure to toxins: necrotic cells and their organelles swell and burst, releasing their contents into the extracellular space. Apoptosis is an active, programmed cell death, occurring normally at the end of a cell's lifespan, and may also be pathological or physiological; apoptotic cells do not swell but instead decrease in size. By light microscopy, necrotic nuclei show pyknosis (small, darkly stained, condensed chromatin), karyorrhexis (nuclear and chromatin fragmentation by endonuclease) and karyolysis (dissolution and disappearance of the nucleus). In fate, necrotic cells degenerate and are eventually phagocytosed by macrophages; apoptotic cells break into large vesicles that are themselves phagocytosed by macrophages.
## explicit_objective
Contrast necrosis and apoptosis by cause, cell-volume change, nuclear changes and fate.
## pitfalls
Assuming both forms of death end differently. Both necrotic and apoptotic material is ultimately cleared by macrophage phagocytosis — what differs is the route (swelling and rupture versus programmed vesiculation), not whether a macrophage is involved at the end.
## concept_type
comparison
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
DIS-HIS-T01
## secondary_node_ids
[clear]
## aliases
Pyknosis | Karyorrhexis | Karyolysis | Programmed cell death
## arabic_label

## arabic_aliases
[clear]
## topic
Histology
## subtopic
Cytogenetics
## microtopic
[clear]
## nanotopic
[clear]
## article_ids
ART-104-HIS-CELL-CYCLE-RENEWAL-DEATH
## related_article_ids
ART-104-HIS-MITOSIS-AND-MEIOSIS
## related_concept_ids
CON-FND-6DEB5A4F0F1675
## resource_ids
src_18d3a953df4ca83c4e74
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-5B0A296D58E3
CLM-CA40E3E893F2
CLM-8A8AF4A98B4D
CLM-B6FD64E4B8E3
CLM-0BCB2C83BF14
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

## review_due

## exclusion_reason

## modules
104 CPS
## module_subject
104 CPS > Histology > Cytogenetics > Cell Division
## universities
kau
## learner_years
1
## blueprint_weight
0.08
## exam_weight_by_year
KAU_Y1=0.08
## clinical_relevance
0.4
## academic_relevance
0.9
## exam_signal
src_18d3a953df4ca83c4e74 | department_book | 2026 | p40 | 104 CPS
## weight_confidence
0.5
## confidence
0.8
## original_wording
[Histology department book p. 40] Cell Death: Two forms of cell death are known: necrosis and apoptosis: 1- Necrosis ... 2- Apoptosis ... LM: Their nuclei show the following changes: Pyknosis ... Karyorrhexis ... Karyolysis ... Fate: Cells degenerate and are finally phagocytosed by macrophage. / Cells break into large vesicles that are phagocytosed by macrophage.
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
relatedArticleIds: None named — this concept's own teaching article carries cell death alongside the cell cycle and stem cells.
relatedConceptIds: CON-FND-6DEB5A4F0F1675 (mitosis) is the process this concept's cell death sits directly beside on the book's own page.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: This faculty distributes no video for this module.
atomicClaimIds: The id named here is reserved, in this module's own CLM-104-HIS-<SLUG>-01 shape, so a future evidence pass can write the matching claim under it without a rename; no claim or citation record exists yet at that id. Authoring evidence/104-CPS-claims.md is a separate lane's scope — this record carries only the concept and its teaching article.
resourceOccurrenceIds: Read from the department book by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the department histology book named on exam_signal.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: find-existing.mjs was run before minting; any near-miss it returned is recorded in this file's header, not here.
conflicts: The department book is the only source read for this concept; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
---

# Item
## label
Mitosis is prophase, metaphase, anaphase and telophase, producing two genetically identical daughter cells
## id
CON-FND-6DEB5A4F0F1675
## canonical_key
mitosis.four-stages-prophase-to-telophase
## definition
Mitosis divides the nucleus to produce two daughter cells genetically identical to the parent, in four stages. Prophase: the 46 d-chromosomes shorten, thicken and stain more darkly, becoming visible as fine threads; the nucleoli and nuclear envelope disappear; centrioles move to opposite poles as cytoplasmic microtubules radiate from the microtubule-organising centre around them; and these microtubules organise into a spindle. Metaphase: chromosomes migrate to the equatorial metaphase plate, and a dense plaque, the kinetochore, develops at each chromosome's centromere as the attachment site for chromosomal microtubules. The mitotic spindle's microtubules are of three kinds: cytoplasmic microtubules, which elongate the cell; chromosomal microtubules, attached to kinetochores, which arrange the chromosomes at the equator; and astral microtubules, star-like around the centrioles, which establish the spindle's axis. Anaphase: each d-chromosome splits longitudinally at the centromere, its two sister chromatids pulled to opposite poles by the chromosomal microtubules as the cytoplasmic microtubules elongate. Telophase: a cleavage furrow forms at the equator by contraction of actin filaments, dividing the cytoplasm in two; the 46 chromatids (s-chromosomes) of each new cell lengthen, uncoil and lose visibility; nuclear envelopes re-form; and nucleoli reappear.
## explicit_objective
Name mitosis's four stages in order and state, for each, what happens to the chromosomes, the nuclear envelope/nucleoli and the spindle.
## pitfalls
Describing the kinetochore as the centromere itself. The kinetochore is a protein plaque that develops at the centromere in metaphase specifically to serve as the microtubule attachment site — the centromere is the chromosomal constriction it sits on.
## concept_type
mechanism
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
DIS-HIS-T01
## secondary_node_ids
[clear]
## aliases
Prophase, metaphase, anaphase, telophase | Mitotic spindle | Kinetochore
## arabic_label

## arabic_aliases
[clear]
## topic
Histology
## subtopic
Cytogenetics
## microtopic
[clear]
## nanotopic
[clear]
## article_ids
ART-104-HIS-MITOSIS-AND-MEIOSIS
## related_article_ids
ART-104-HIS-CHROMOSOME-STRUCTURE-KARYOTYPE
## related_concept_ids
CON-FND-685D573458A6D7 | CON-FND-AB1858FD6C0F61 | CON-FND-918BBB81C26937
## resource_ids
src_18d3a953df4ca83c4e74
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-77CB83973CD5
CLM-4240549216CF
CLM-AF69657B7193
CLM-9F121F580C25
CLM-F7CE0030ECEB
CLM-4E0FB05B18E2
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

## review_due

## exclusion_reason

## modules
104 CPS
## module_subject
104 CPS > Histology > Cytogenetics > Cell Division
## universities
kau
## learner_years
1
## blueprint_weight
0.14
## exam_weight_by_year
KAU_Y1=0.14
## clinical_relevance
0.2
## academic_relevance
0.9
## exam_signal
src_18d3a953df4ca83c4e74 | department_book | 2026 | p40-41 | 104 CPS
## weight_confidence
0.5
## confidence
0.8
## original_wording
[Histology department book pp. 40-41] CELL DIVISION 1- MITOSIS. Definition: Division of the nucleus to produce 2 daughter cells genetically identical to parent cell. Stages: Mitosis is formed of the following four stages: 1) Prophase ... 2) Metaphase ... Microtubules of mitotic spindle ... 3) Anaphase ... 4) Telophase.
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
relatedArticleIds: None named — this concept's own teaching article covers mitosis and meiosis together.
relatedConceptIds: CON-FND-685D573458A6D7 (meiosis) and CON-FND-AB1858FD6C0F61 (mitosis versus meiosis) are this concept's direct counterparts. CON-FND-918BBB81C26937 (chromosome structure) names the centromere and kinetochore this concept uses without redefining them.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: This faculty distributes no video for this module.
atomicClaimIds: The id named here is reserved, in this module's own CLM-104-HIS-<SLUG>-01 shape, so a future evidence pass can write the matching claim under it without a rename; no claim or citation record exists yet at that id. Authoring evidence/104-CPS-claims.md is a separate lane's scope — this record carries only the concept and its teaching article.
resourceOccurrenceIds: Read from the department book by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the department histology book named on exam_signal.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: find-existing.mjs was run before minting; any near-miss it returned is recorded in this file's header, not here.
conflicts: The department book is the only source read for this concept; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
---

# Item
## label
Meiosis is two successive divisions without an intervening S-phase, producing four haploid germ cells with crossing over
## id
CON-FND-685D573458A6D7
## canonical_key
meiosis.two-successive-divisions-and-crossing-over
## definition
Meiosis is a special cell division in which a diploid cell undergoes two successive divisions without an S-phase between them, occurring in the testis and ovary and producing haploid germ cells — sperm or ova. The first meiotic division (reduction division) has a prophase I that is long — 22 days in spermatogenesis, 12 to 45 years in oogenesis — passing through stages in which the 46 d-chromosomes appear as long threads, then pair as 23 bivalents of one maternal and one paternal homologue each, then condense into tetrads of four chromatids in which crossing over exchanges segments between non-sister chromatids at the chiasmata (with the help of recombinase), before the nucleolus and nuclear envelope disappear; metaphase I aligns the 23 bivalent d-chromosomes on the spindle; anaphase I separates the bivalents, one homologous d-chromosome to each pole; and telophase I yields two daughter cells, each with 23 d-chromosomes. The second meiotic division (equatorial division) is mitosis-like, follows rapidly with a very short interphase and no S-phase: prophase II shortens the chromosomes and forms a new spindle; metaphase II aligns the 23 d-chromosomes at the equator; anaphase II splits each d-chromosome at its centromere into two chromatids (s-chromosomes) moving to opposite poles; and telophase II separates the two daughter cells, each now with 23 s-chromosomes — the haploid number.
## explicit_objective
State why meiosis has no S-phase between its two divisions, name where crossing over occurs, and give the chromosome number and type at the end of each division.
## pitfalls
Treating prophase I's duration as a minor detail. The book states it explicitly — 22 days in the male, 12 to 45 years in the female — and that decades-long arrest in oogenesis is exactly why maternal age is linked to non-disjunction: the bivalent sits arrested in prophase I for as long as the oocyte does.
## concept_type
mechanism
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
DIS-HIS-T01
## secondary_node_ids
[clear]
## aliases
First meiotic division | Second meiotic division | Crossing over | Chiasmata | Bivalent chromosomes
## arabic_label

## arabic_aliases
[clear]
## topic
Histology
## subtopic
Cytogenetics
## microtopic
[clear]
## nanotopic
[clear]
## article_ids
ART-104-HIS-MITOSIS-AND-MEIOSIS
## related_article_ids
ART-104-HIS-NUMERICAL-ABERRATIONS
## related_concept_ids
CON-FND-6DEB5A4F0F1675 | CON-FND-AB1858FD6C0F61 | CON-DEV-451A64C9445CAB
## resource_ids
src_18d3a953df4ca83c4e74
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-639D181A553C
CLM-83E55C63C54F
CLM-A0DE251EB8D8
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

## review_due

## exclusion_reason

## modules
104 CPS
## module_subject
104 CPS > Histology > Cytogenetics > Cell Division
## universities
kau
## learner_years
1
## blueprint_weight
0.13
## exam_weight_by_year
KAU_Y1=0.13
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_signal
src_18d3a953df4ca83c4e74 | department_book | 2026 | p41-43 | 104 CPS
## weight_confidence
0.5
## confidence
0.8
## original_wording
[Histology department book pp. 41-43] 2- MEIOSIS. Definition: It is a special type of cell division in which the diploid cells undergo two successive cell divisions without S-phase in between. Site: in the testis & ovary. Fate: produce the haploid germ cells ... I) First Meiotic Division (Reduction Division) ... II) Second Meiotic Division (Equatorial Division).
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
relatedArticleIds: None named — this concept's own teaching article covers mitosis and meiosis together.
relatedConceptIds: CON-FND-6DEB5A4F0F1675 (mitosis) and CON-FND-AB1858FD6C0F61 (mitosis versus meiosis) are this concept's direct counterparts. CON-DEV-451A64C9445CAB (numerical chromosomal aberration) is the failure mode of the division this concept describes when it succeeds.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: This faculty distributes no video for this module.
atomicClaimIds: The id named here is reserved, in this module's own CLM-104-HIS-<SLUG>-01 shape, so a future evidence pass can write the matching claim under it without a rename; no claim or citation record exists yet at that id. Authoring evidence/104-CPS-claims.md is a separate lane's scope — this record carries only the concept and its teaching article.
resourceOccurrenceIds: Read from the department book by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the department histology book named on exam_signal.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: find-existing.mjs was run before minting; any near-miss it returned is recorded in this file's header, not here.
conflicts: The department book is the only source read for this concept; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
---

# Item
## label
Mitosis is one division producing two identical diploid daughter cells; meiosis is two divisions with crossing over, producing four genetically varied haploid ones
## id
CON-FND-AB1858FD6C0F61
## canonical_key
mitosis-vs-meiosis.comparison
## definition
The department book contrasts mitosis and meiosis across five features. Site: mitosis occurs in somatic cells; meiosis occurs in the germ cells of testis and ovary. Number of divisions: mitosis is a single division; meiosis is two successive divisions without an intervening S-phase. Crossing over: absent in mitosis, with no exchange of genes; present in meiosis, where pairing allows crossing over and gene exchange. Separation: in mitosis each chromosome divides longitudinally at the centromere into two chromatids; in meiosis, in the first division, each chromosome of a bivalent moves toward one pole instead. Daughter cells: mitosis gives two somatic daughter cells with the diploid chromosome number, genetically identical to each other; meiosis gives four germ cells with the haploid number, genetically varied.
## explicit_objective
Set mitosis against meiosis by site, number of divisions, crossing over, chromosome separation, and the number and genetic identity of the daughter cells.
## pitfalls
Reducing the comparison to 'mitosis makes two cells, meiosis makes four.' The department book's own table roots that difference in mechanism — one division versus two, and whether the bivalent's homologues separate as whole chromosomes or split at the centromere — which is what a mechanism question actually tests.
## concept_type
comparison
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
DIS-HIS-T01
## secondary_node_ids
[clear]
## aliases
Mitosis versus meiosis table
## arabic_label

## arabic_aliases
[clear]
## topic
Histology
## subtopic
Cytogenetics
## microtopic
[clear]
## nanotopic
[clear]
## article_ids
ART-104-HIS-MITOSIS-AND-MEIOSIS
## related_article_ids
ART-104-HIS-CHROMOSOME-STRUCTURE-KARYOTYPE
## related_concept_ids
CON-FND-6DEB5A4F0F1675 | CON-FND-685D573458A6D7
## resource_ids
src_18d3a953df4ca83c4e74
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-A4E9EC9526A3
CLM-E92E4563622F
CLM-8C7BD80586AA
CLM-B8D8C665B6CC
CLM-277987EDB066
CLM-7427A01EE97C
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

## review_due

## exclusion_reason

## modules
104 CPS
## module_subject
104 CPS > Histology > Cytogenetics > Cell Division
## universities
kau
## learner_years
1
## blueprint_weight
0.11
## exam_weight_by_year
KAU_Y1=0.11
## clinical_relevance
0.2
## academic_relevance
0.9
## exam_signal
src_18d3a953df4ca83c4e74 | department_book | 2026 | p43 | 104 CPS
## weight_confidence
0.5
## confidence
0.8
## original_wording
[Histology department book p. 43] Differences between Mitosis and Meiosis: Site ... Number of divisions ... Crossing over ... Separation ... Daughter cells.
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
relatedArticleIds: None named — this concept's own teaching article covers mitosis and meiosis together.
relatedConceptIds: CON-FND-6DEB5A4F0F1675 (mitosis) and CON-FND-685D573458A6D7 (meiosis) are the two processes this concept sets side by side.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: This faculty distributes no video for this module.
atomicClaimIds: The id named here is reserved, in this module's own CLM-104-HIS-<SLUG>-01 shape, so a future evidence pass can write the matching claim under it without a rename; no claim or citation record exists yet at that id. Authoring evidence/104-CPS-claims.md is a separate lane's scope — this record carries only the concept and its teaching article.
resourceOccurrenceIds: Read from the department book by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the department histology book named on exam_signal.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: find-existing.mjs was run before minting; any near-miss it returned is recorded in this file's header, not here.
conflicts: The department book is the only source read for this concept; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
---

# Item
## label
A chromosome is DNA coiled on histones, its two chromatids joined at a centromere bearing kinetochores, capped by telomeres
## id
CON-FND-918BBB81C26937
## canonical_key
chromosome-structure.chromatid-centromere-kinetochore-and-telomere
## definition
Chromosomes are chromatin fibres that become so condensed and tightly coiled during mitosis and meiosis that they are visible with the light microscope. At the G1 stage of interphase the chromosome is a single thread of DNA, the s-chromosome or chromatid; at the S stage it becomes double-threaded, the d-chromosome. During late prophase and metaphase each chromosome is formed of two chromatids connected at the centromere, which divides the d-chromosome into a short arm (p) and a long arm (q). Kinetochores are two discs of protein at the centromere to which the spindle fibres attach during cell division. Each chromatid is a DNA molecule coiled around histone and non-histone proteins. A gene is a segment of DNA coding for a specific protein, with a precise position, its locus, on the chromosome. Telomeres are repeated-sequence regions at the chromosomal ends, protecting the end from destruction and preventing end-to-end fusion of chromosomes.
## explicit_objective
Name a chromosome's parts — chromatid, centromere, kinetochore, p and q arms, gene locus and telomere — and state when a chromosome is single- versus double-stranded.
## pitfalls
Confusing 'chromosome' with a single, fixed structure rather than a state that changes across the cycle — the same 46 chromosomes are single-stranded s-chromosomes through G1 and double-stranded d-chromosomes from S phase through metaphase, before splitting back into single chromatids at anaphase.
## concept_type
structural_description
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
DIS-HIS-T01
## secondary_node_ids
[clear]
## aliases
Centromere | Kinetochore | Telomere | p and q arms | s-chromosome and d-chromosome
## arabic_label

## arabic_aliases
[clear]
## topic
Histology
## subtopic
Cytogenetics
## microtopic
[clear]
## nanotopic
[clear]
## article_ids
ART-104-HIS-CHROMOSOME-STRUCTURE-KARYOTYPE
## related_article_ids
ART-104-HIS-MITOSIS-AND-MEIOSIS
## related_concept_ids
CON-FND-6DEB5A4F0F1675 | CON-FND-C7C2723BD3BC8D | CON-FND-29D305EDFC022D
## resource_ids
src_18d3a953df4ca83c4e74
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-504BE8134A0D
CLM-84B923346982
CLM-BFA6E6F28617
CLM-3F5648BA76A4
CLM-5CA960B0A8ED
CLM-7396B3A45B89
CLM-535052451CED
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

## review_due

## exclusion_reason

## modules
104 CPS
## module_subject
104 CPS > Histology > Cytogenetics > Human Chromosome
## universities
kau
## learner_years
1
## blueprint_weight
0.13
## exam_weight_by_year
KAU_Y1=0.13
## clinical_relevance
0.2
## academic_relevance
0.9
## exam_signal
src_18d3a953df4ca83c4e74 | department_book | 2026 | p44 | 104 CPS
## weight_confidence
0.5
## confidence
0.8
## original_wording
[Histology department book p. 44] Human chromosome: Chromosomes are chromatin fibers that become so condensed and tightly coiled during mitosis and meiosis ... Kinetochores: 2 discs of protein located at the centromere ... Genes: segments of DNA molecules that code for the formation of specific proteins ... Telomeres: regions of repeated sequence at chromosomal ends.
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
relatedArticleIds: None named — this concept's own teaching article covers chromosome structure, karyotyping and classification together.
relatedConceptIds: CON-FND-6DEB5A4F0F1675 (mitosis) is where the kinetochore and centromere this concept defines are first put to use. CON-FND-C7C2723BD3BC8D (karyotyping) and CON-FND-29D305EDFC022D (chromosome classification) both build on the p/q arm and centromere-position vocabulary this concept sets out.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: This faculty distributes no video for this module.
atomicClaimIds: The id named here is reserved, in this module's own CLM-104-HIS-<SLUG>-01 shape, so a future evidence pass can write the matching claim under it without a rename; no claim or citation record exists yet at that id. Authoring evidence/104-CPS-claims.md is a separate lane's scope — this record carries only the concept and its teaching article.
resourceOccurrenceIds: Read from the department book by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the department histology book named on exam_signal.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: find-existing.mjs was run before minting; any near-miss it returned is recorded in this file's header, not here.
conflicts: The department book is the only source read for this concept; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
---

# Item
## label
Karyotyping studies chromosome number and type from a metaphase spread of leucocytes, refined by banding to stain individual genes
## id
CON-FND-C7C2723BD3BC8D
## canonical_key
karyotyping.definition-technique-and-banding
## definition
Karyotyping is the study of the number and type of chromosomes according to their length and the position of the centromere. Technique: leucocytes are the best cells to study; cells are allowed to divide by mitosis and then stopped at metaphase; the metaphase spread is photographed, matched into pairs and arranged in descending order of length; and chromosomes are studied with specialised computer software. Banding technique differentiates chromosomes further by staining different segments (genes) in different colours.
## explicit_objective
State what karyotyping studies, which cell type is used, at which stage of division the cells are stopped, and what banding adds.
## pitfalls
Assuming karyotyping needs a dividing tissue like bone marrow. The book specifies leucocytes — ordinary blood cells stimulated to divide in culture — as the cell of choice, which is what makes the test practical from a simple blood draw.
## concept_type
definition
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
DIS-HIS-T01
## secondary_node_ids
[clear]
## aliases
Karyotype | Chromosome banding
## arabic_label

## arabic_aliases
[clear]
## topic
Histology
## subtopic
Cytogenetics
## microtopic
[clear]
## nanotopic
[clear]
## article_ids
ART-104-HIS-CHROMOSOME-STRUCTURE-KARYOTYPE
## related_article_ids
ART-104-HIS-NUMERICAL-ABERRATIONS
## related_concept_ids
CON-FND-918BBB81C26937 | CON-FND-29D305EDFC022D
## resource_ids
src_18d3a953df4ca83c4e74
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-7AA73A72F47B
CLM-11F118D5889A
CLM-6909E3EC11E4
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

## review_due

## exclusion_reason

## modules
104 CPS
## module_subject
104 CPS > Histology > Cytogenetics > Human Chromosome
## universities
kau
## learner_years
1
## blueprint_weight
0.10
## exam_weight_by_year
KAU_Y1=0.10
## clinical_relevance
0.4
## academic_relevance
0.9
## exam_signal
src_18d3a953df4ca83c4e74 | department_book | 2026 | p44 | 104 CPS
## weight_confidence
0.5
## confidence
0.8
## original_wording
[Histology department book p. 44] Karyotyping: Definition: It is the study of number and type of chromosomes according to their length and position of centromere. Technique: Leucocytes are the best cells to study chromosomes ... Banding technique: This method can better differentiate chromosomes by staining different segments (genes) with different colors.
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
relatedArticleIds: None named — this concept's own teaching article covers chromosome structure, karyotyping and classification together.
relatedConceptIds: CON-FND-918BBB81C26937 (chromosome structure) supplies the p/q arm and centromere vocabulary karyotyping is built on. CON-FND-29D305EDFC022D (chromosome classification) is the result a karyotype is read into.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: This faculty distributes no video for this module.
atomicClaimIds: The id named here is reserved, in this module's own CLM-104-HIS-<SLUG>-01 shape, so a future evidence pass can write the matching claim under it without a rename; no claim or citation record exists yet at that id. Authoring evidence/104-CPS-claims.md is a separate lane's scope — this record carries only the concept and its teaching article.
resourceOccurrenceIds: Read from the department book by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the department histology book named on exam_signal.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: find-existing.mjs was run before minting; any near-miss it returned is recorded in this file's header, not here.
conflicts: The department book is the only source read for this concept; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
---

# Item
## label
Chromosomes are classed by gene content into autosomes and sex chromosomes, by centromere position into four shapes, and by length into seven groups
## id
CON-FND-29D305EDFC022D
## canonical_key
chromosome-classification.by-gene-content-centromere-position-and-length
## definition
Chromosomes are classified three ways. By gene content: 22 homologous autosome pairs control somatic characters, and one pair of sex chromosomes controls sex — homologous (XX) in females, heterologous (XY) in males. By centromere position: metacentric, centromere central so the arms are equal; submetacentric, centromere midway between centre and end so the short arm is shorter than the long; acrocentric, centromere close to the upper end so the short arm is very short, and — except on the Y — some acrocentric chromosomes carry satellites, small chromatin masses on the short arm attached by a narrow secondary constriction containing rRNA genes; and telocentric, centromere terminal with no short arm, a type not present in humans. By length: the 22 homologous pairs are numbered 1 to 22 in descending order of length and grouped into seven groups, A through G; the sex chromosomes are placed either alone or with X in group C and Y in group G.
## explicit_objective
Name the three ways chromosomes are classified, and state the four centromere-position categories with which one does not occur in humans.
## pitfalls
Forgetting that satellites occur on acrocentric chromosomes 'except the Y' — the book states this exception explicitly, and it is the kind of single-word qualifier a classification question is built to test.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
DIS-HIS-T01
## secondary_node_ids
[clear]
## aliases
Metacentric | Submetacentric | Acrocentric | Telocentric | Autosomes and sex chromosomes
## arabic_label

## arabic_aliases
[clear]
## topic
Histology
## subtopic
Cytogenetics
## microtopic
[clear]
## nanotopic
[clear]
## article_ids
ART-104-HIS-CHROMOSOME-STRUCTURE-KARYOTYPE
## related_article_ids
ART-104-HIS-STRUCTURAL-ABERRATIONS
## related_concept_ids
CON-FND-918BBB81C26937 | CON-FND-C7C2723BD3BC8D
## resource_ids
src_18d3a953df4ca83c4e74
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-CAC25DF4D63B
CLM-C85FDBB34EAC
CLM-E3BD09E16A05
CLM-9B8D6719C3C5
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

## review_due

## exclusion_reason

## modules
104 CPS
## module_subject
104 CPS > Histology > Cytogenetics > Human Chromosome
## universities
kau
## learner_years
1
## blueprint_weight
0.12
## exam_weight_by_year
KAU_Y1=0.12
## clinical_relevance
0.2
## academic_relevance
0.9
## exam_signal
src_18d3a953df4ca83c4e74 | department_book | 2026 | p45 | 104 CPS
## weight_confidence
0.5
## confidence
0.8
## original_wording
[Histology department book p. 45] Classification of Chromosomes: a) According to gene content ... b) According to the position of centromere: 1. Metacentric ... 2. Submetacentric ... 3. Acrocentric ... 4. Telocentric: ... This type is not present in humans. c) According to chromosomal length.
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
relatedArticleIds: None named — this concept's own teaching article covers chromosome structure, karyotyping and classification together.
relatedConceptIds: CON-FND-918BBB81C26937 (chromosome structure) is where the p/q arm and centromere vocabulary this classification uses was defined. CON-FND-C7C2723BD3BC8D (karyotyping) is the technique that produces the classified spread.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: This faculty distributes no video for this module.
atomicClaimIds: The id named here is reserved, in this module's own CLM-104-HIS-<SLUG>-01 shape, so a future evidence pass can write the matching claim under it without a rename; no claim or citation record exists yet at that id. Authoring evidence/104-CPS-claims.md is a separate lane's scope — this record carries only the concept and its teaching article.
resourceOccurrenceIds: Read from the department book by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the department histology book named on exam_signal.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: find-existing.mjs was run before minting; any near-miss it returned is recorded in this file's header, not here.
conflicts: The department book is the only source read for this concept; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
---

# Item
## label
The Barr body is the inactive, coiled X chromosome, present in normal females and X-excess males but absent in normal males and Turner syndrome
## id
CON-FND-7FE32E35CA4C7F
## canonical_key
sex-chromatin.barr-body-structure-and-clinical-significance
## definition
Sex chromatin, the Barr body, first described by Murray Barr, is a darkly stained mass of chromatin representing the inactive, coiled, dark-staining X chromosome in the nucleus of a female cell, while the other X chromosome stays active, extended and inapparent. It is seen on the inner aspect of the nuclear envelope in about 60% of female buccal epithelial cell nuclei, and as a drumstick-like mass attached to the nucleus in 3 to 5% of female blood neutrophils. Every somatic cell must keep at least one active X chromosome, which carries genes other than the sex-determining ones. A Barr body appears in normal female cells and in male cells with an extra X chromosome (47, XXY, Klinefelter syndrome); it is not apparent in normal male cells, nor in female cells with only one X chromosome (45, XO, Turner syndrome). Chromosomal examination, including Barr body assessment, has clinical importance: diagnosing genetic sex in doubtful hermaphroditism; identifying fetal sex from amniotic-fluid cells; diagnosing sex-chromosome abnormalities such as Turner and Klinefelter syndromes; diagnosing structural abnormalities such as the deletion behind some mental retardation or the translocation behind chronic myeloid leukaemia; diagnosing numerical abnormalities such as mongolism; and forensic, medico-legal use.
## explicit_objective
State what the Barr body represents, where it is seen in the female buccal cell and neutrophil, and predict its presence in Klinefelter and Turner syndrome.
## pitfalls
Predicting Barr-body number from X-chromosome number by simple subtraction without the rule behind it — the number of Barr bodies is always one fewer than the number of X chromosomes present, because exactly one X per cell stays active and every other X is inactivated as a Barr body.
## concept_type
definition
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
DIS-HIS-T01
## secondary_node_ids
[clear]
## aliases
Barr body | Sex chromatin | X-inactivation
## arabic_label

## arabic_aliases
[clear]
## topic
Histology
## subtopic
Cytogenetics
## microtopic
[clear]
## nanotopic
[clear]
## article_ids
ART-104-HIS-CHROMOSOME-STRUCTURE-KARYOTYPE
## related_article_ids
ART-104-HIS-NUMERICAL-ABERRATIONS
## related_concept_ids
CON-DEV-C5F7B1973F8049
## resource_ids
src_18d3a953df4ca83c4e74
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-2973DF47E659
CLM-6C23BB700AE4
CLM-F561A7A0DE38
CLM-A5F3AA60A735
CLM-C6D27C9A9A36
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

## review_due

## exclusion_reason

## modules
104 CPS
## module_subject
104 CPS > Histology > Cytogenetics > Human Chromosome
## universities
kau
## learner_years
1
## blueprint_weight
0.11
## exam_weight_by_year
KAU_Y1=0.11
## clinical_relevance
0.5
## academic_relevance
0.9
## exam_signal
src_18d3a953df4ca83c4e74 | department_book | 2026 | p46 | 104 CPS
## weight_confidence
0.5
## confidence
0.8
## original_wording
[Histology department book p. 46] Sex Chromatin (Barr Body): A darkly stained mass of chromatin, first seen by Murray Barr. Barr body represents the inactive coiled dark stained (X) chromosome in nuclei of female cells ... Clinical Importance of Chromosomal Examination: 1. Diagnosis of genetic sex ... 6. Medico-legal importance in forensic medicine.
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
relatedArticleIds: None named — this concept's own teaching article covers chromosome structure, karyotyping and classification together.
relatedConceptIds: CON-DEV-C5F7B1973F8049 (sex-chromosome aberration) is where the Klinefelter and Turner syndromes this concept predicts Barr-body status for are taught in full.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: This faculty distributes no video for this module.
atomicClaimIds: The id named here is reserved, in this module's own CLM-104-HIS-<SLUG>-01 shape, so a future evidence pass can write the matching claim under it without a rename; no claim or citation record exists yet at that id. Authoring evidence/104-CPS-claims.md is a separate lane's scope — this record carries only the concept and its teaching article.
resourceOccurrenceIds: Read from the department book by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the department histology book named on exam_signal.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: find-existing.mjs was run before minting; any near-miss it returned is recorded in this file's header, not here.
conflicts: The department book is the only source read for this concept; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
---

# Item
## label
A numerical chromosomal aberration is euploidy — an exact multiple of the haploid number beyond diploid — or aneuploidy — an addition or loss of one chromosome
## id
CON-DEV-451A64C9445CAB
## canonical_key
numerical-chromosomal-aberration.euploidy-and-aneuploidy-types
## definition
Numerical aberrations are anomalies of chromosome number, occurring in germ or somatic cells, and are of two kinds. Euploidy is a karyotype that is an exact multiple of the haploid number and exceeds the diploid number — triploid (3n, 69 chromosomes), tetraploid (4n, 92 chromosomes), or polyploidy (5n, 6n or more, meaning one or both gametes were not haploid). Aneuploidy is not an exact multiple of the haploid number: the karyotype shows the addition or loss of one chromosome. Trisomy adds an extra chromosome, giving a karyotype of 2n+1 — three copies of one chromosome instead of two, as in Down syndrome (trisomy 21). Monosomy loses one chromosome, giving 2n−1 — one copy instead of two, as in Turner syndrome (45 chromosomes). Aneuploidy can also be mosaic: secondary non-disjunction occurring in mitosis after many normal divisions leaves the body with more than one karyotype (for example 46, 47, 45 cells coexisting).
## explicit_objective
Distinguish euploidy from aneuploidy, and trisomy from monosomy, each with the book's own example.
## pitfalls
Treating 'aneuploid' and 'not diploid' as synonyms. A triploid or tetraploid cell is also not diploid, but it is euploid, because 3n and 4n are still exact multiples of the haploid number — aneuploidy specifically means the count is off by one chromosome, not a whole haploid set.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
dev
## primary_node_id
DIS-HIS-T01
## secondary_node_ids
[clear]
## aliases
Euploidy | Aneuploidy | Trisomy | Monosomy | Mosaicism
## arabic_label

## arabic_aliases
[clear]
## topic
Histology
## subtopic
Cytogenetics
## microtopic
[clear]
## nanotopic
[clear]
## article_ids
ART-104-HIS-NUMERICAL-ABERRATIONS
## related_article_ids
ART-104-HIS-CELL-RENEWAL-AND-ANEUPLOIDY
## related_concept_ids
CON-DEV-C2AC39B48A8F21 | CON-DEV-294FB8DDA40429
## resource_ids
src_18d3a953df4ca83c4e74
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-526671E6C8DA
CLM-899CC7AE8D3A
CLM-736B199D6681
CLM-FE1BE34C8C82
CLM-002EA94B016C
CLM-F61E58A826E7
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

## review_due

## exclusion_reason

## modules
104 CPS
## module_subject
104 CPS > Histology > Cytogenetics > Chromosomal Aberrations (Abnormalities)
## universities
kau
## learner_years
1
## blueprint_weight
0.12
## exam_weight_by_year
KAU_Y1=0.12
## clinical_relevance
0.5
## academic_relevance
0.9
## exam_signal
src_18d3a953df4ca83c4e74 | department_book | 2026 | p47-48 | 104 CPS
## weight_confidence
0.5
## confidence
0.8
## original_wording
[Histology department book pp. 47-48] I. Numerical Aberrations ... a) Euploidy: Karyotyping shows exact multiple of the basic haploid number ... b) Aneuploidy (abnormal ploidy) ... Types of aneuploidy: Trisomy ... Monosomy ... Mosaic: Secondary non disjunction occurs in mitosis after many normal divisions so cells of the body have more than one karyotype.
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
relatedArticleIds: None named — this concept's own teaching article covers numerical aberrations in full.
relatedConceptIds: CON-DEV-C2AC39B48A8F21 (live, generated, 'Aneuploidy arises from non-disjunction...') already teaches aneuploidy's three causes; this concept is the taxonomy of numerical aberration types that record's causes explain, referenced rather than repeated. CON-DEV-294FB8DDA40429 (Down syndrome) is this concept's named worked example of trisomy.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: This faculty distributes no video for this module.
atomicClaimIds: The id named here is reserved, in this module's own CLM-104-HIS-<SLUG>-01 shape, so a future evidence pass can write the matching claim under it without a rename; no claim or citation record exists yet at that id. Authoring evidence/104-CPS-claims.md is a separate lane's scope — this record carries only the concept and its teaching article.
resourceOccurrenceIds: Read from the department book by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the department histology book named on exam_signal.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: find-existing.mjs was run before minting; any near-miss it returned is recorded in this file's header, not here.
conflicts: The department book is the only source read for this concept; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
---

# Item
## label
Down syndrome is trisomy 21, from non-disjunction or a 14;21 translocation, with mental retardation and characteristic dysmorphic features
## id
CON-DEV-294FB8DDA40429
## canonical_key
down-syndrome.causes-and-features
## definition
Down syndrome (mongolism) results from either non-disjunction of chromosome 21, giving trisomy 21, or a translocation between chromosomes 21 and 14, which accounts for 3 to 4% of cases. The mongol child's cells contain 47 chromosomes, the extra one similar to chromosome 21. Characteristic features are mental retardation, small genital organs, cardiac abnormalities, a lateral upward slope of the eyes, small ears, and a short, broad nose and neck.
## explicit_objective
State Down syndrome's two chromosomal causes and the proportion due to translocation, and list its characteristic features.
## pitfalls
Treating Down syndrome as caused by non-disjunction alone. The book states a second route explicitly — centric-fusion translocation between chromosomes 21 and 14 — accounting for 3 to 4% of cases, and that minority route is exactly what an exam question on 'other causes of Down syndrome' is testing.
## concept_type
genetic_basis
## status
under review
## support_mode
direct_statement
## subject
dev
## primary_node_id
DIS-HIS-T01
## secondary_node_ids
[clear]
## aliases
Mongolism | Trisomy 21
## arabic_label

## arabic_aliases
[clear]
## topic
Histology
## subtopic
Cytogenetics
## microtopic
[clear]
## nanotopic
[clear]
## article_ids
ART-104-HIS-NUMERICAL-ABERRATIONS
## related_article_ids
ART-104-HIS-STRUCTURAL-ABERRATIONS
## related_concept_ids
CON-DEV-243DD717D2FDA3 | CON-DEV-D9B5F70461CAD4 | CON-DEV-D2BA4082190B3F
## resource_ids
src_18d3a953df4ca83c4e74
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-0C6BD3AC29CB
CLM-24534BB9FE0C
CLM-61A447DE39E6
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

## review_due

## exclusion_reason

## modules
104 CPS
## module_subject
104 CPS > Histology > Cytogenetics > Chromosomal Aberrations (Abnormalities)
## universities
kau
## learner_years
1
## blueprint_weight
0.11
## exam_weight_by_year
KAU_Y1=0.11
## clinical_relevance
0.55
## academic_relevance
0.9
## exam_signal
src_18d3a953df4ca83c4e74 | department_book | 2026 | p48 | 104 CPS
## weight_confidence
0.5
## confidence
0.8
## original_wording
[Histology department book p. 48] Down Syndrom (Mongolism): It occurs as a result of: 1) Non disjunction of chromosome 21 (Trisomy 21) 2) Translocation (21 and 14) ... Characteristic features: Mental retardation, small genital organs, cardiac abnormalities. Lateral upward slope of eyes, small ears, short broad nose & neck.
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
relatedArticleIds: None named — this concept's own teaching article covers numerical aberrations in full.
relatedConceptIds: CON-DEV-243DD717D2FDA3 and CON-DEV-D9B5F70461CAD4 (both live) already name the extra-chromosome-21 fact and the maternal-age risk factor; this concept adds the department book's translocation cause and its named clinical features, referencing rather than repeating those narrower records. CON-DEV-D2BA4082190B3F (structural chromosomal aberration) is where the 21;14 translocation itself is taught as a mechanism.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: This faculty distributes no video for this module.
atomicClaimIds: The id named here is reserved, in this module's own CLM-104-HIS-<SLUG>-01 shape, so a future evidence pass can write the matching claim under it without a rename; no claim or citation record exists yet at that id. Authoring evidence/104-CPS-claims.md is a separate lane's scope — this record carries only the concept and its teaching article.
resourceOccurrenceIds: Read from the department book by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the department histology book named on exam_signal.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: find-existing.mjs was run before minting; any near-miss it returned is recorded in this file's header, not here.
conflicts: The department book is the only source read for this concept; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
---

# Item
## label
Klinefelter (47,XXY), triple X (47,XXX) and Turner (45,XO) syndromes are sex-chromosome aneuploidies from non-disjunction in oogenesis
## id
CON-DEV-C5F7B1973F8049
## canonical_key
sex-chromosome-aberration.klinefelter-turner-and-triple-x-syndromes
## definition
Numerical aberrations of the sex chromosomes are caused by non-disjunction in the first meiotic division of the primary oocyte, which can produce an ovum with two X chromosomes or none. Klinefelter's syndrome (47, XXY), a trisomy of the sex chromosomes, arises when a two-X ovum is fertilised by a Y-bearing sperm; the affected male has a positive Barr body, and is characteristically mentally retarded, tall, with small testes and large breasts with widely separated nipples. Multiple X syndrome (47, XXX), also a trisomy, arises by the same non-disjunction but with fertilisation by an X-bearing sperm; the affected female carries two Barr bodies, and characteristically shows delayed language development, motor coordination problems and auditory disorders. Turner's syndrome (45, XO), a monosomy of the sex chromosomes, arises when an ovum with no X is fertilised by an X-bearing sperm; the affected female has no Barr body, from the missing X, and is characteristically short, mentally retarded, with limb oedema, underdeveloped ovaries and external genitalia, and primary amenorrhoea.
## explicit_objective
For Klinefelter, triple X and Turner syndrome, state the karyotype, the fertilising sperm that produces it, the Barr-body count, and two characteristic features.
## pitfalls
Assuming the karyotype alone predicts the Barr-body count without tracking which parent's gamete carried the error. All three syndromes trace to the same event — non-disjunction in the first meiotic division of the oocyte — and the karyotype, not the mechanism, is what differs; get the karyotype right and the Barr-body count (one fewer than the X count) follows directly.
## concept_type
genetic_basis
## status
under review
## support_mode
direct_statement
## subject
dev
## primary_node_id
DIS-HIS-T01
## secondary_node_ids
[clear]
## aliases
Klinefelter syndrome | Turner syndrome | Triple X syndrome | 47 XXY | 45 XO
## arabic_label

## arabic_aliases
[clear]
## topic
Histology
## subtopic
Cytogenetics
## microtopic
[clear]
## nanotopic
[clear]
## article_ids
ART-104-HIS-NUMERICAL-ABERRATIONS
## related_article_ids
ART-104-HIS-CHROMOSOME-STRUCTURE-KARYOTYPE
## related_concept_ids
CON-FND-7FE32E35CA4C7F | CON-DEV-451A64C9445CAB
## resource_ids
src_18d3a953df4ca83c4e74
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-2E54F6E4C9DB
CLM-D606F34401F5
CLM-AD206B74F419
CLM-5D20621702AC
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

## review_due

## exclusion_reason

## modules
104 CPS
## module_subject
104 CPS > Histology > Cytogenetics > Chromosomal Aberrations (Abnormalities)
## universities
kau
## learner_years
1
## blueprint_weight
0.13
## exam_weight_by_year
KAU_Y1=0.13
## clinical_relevance
0.55
## academic_relevance
0.9
## exam_signal
src_18d3a953df4ca83c4e74 | department_book | 2026 | p48-49 | 104 CPS
## weight_confidence
0.5
## confidence
0.8
## original_wording
[Histology department book pp. 48-49] Numerical Aberrations in Sex chromosomes. Causes: non disjunction in first meiotic division of the primary oocyte ... 1- Klinefelter's syndrome (47, XXY) ... 2- Multiple X Syndrome (47, XXX) ... 3- Turner's Syndrome (45, XO).
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
relatedArticleIds: None named — this concept's own teaching article covers numerical aberrations in full.
relatedConceptIds: CON-FND-7FE32E35CA4C7F (sex chromatin) supplies the Barr-body rule this concept applies to each syndrome. CON-DEV-451A64C9445CAB (numerical aberration types) is the trisomy/monosomy taxonomy these three syndromes are worked examples of.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: This faculty distributes no video for this module.
atomicClaimIds: The id named here is reserved, in this module's own CLM-104-HIS-<SLUG>-01 shape, so a future evidence pass can write the matching claim under it without a rename; no claim or citation record exists yet at that id. Authoring evidence/104-CPS-claims.md is a separate lane's scope — this record carries only the concept and its teaching article.
resourceOccurrenceIds: Read from the department book by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the department histology book named on exam_signal.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: find-existing.mjs was run before minting; any near-miss it returned is recorded in this file's header, not here.
conflicts: The department book is the only source read for this concept; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
---

# Item
## label
Structural chromosomal aberrations are breaks, deletions, inversions, translocations, duplications and isochromosomes, balanced or unbalanced by gene content
## id
CON-DEV-D2BA4082190B3F
## canonical_key
structural-chromosomal-aberration.deletion-inversion-translocation-duplication-isochromosome
## definition
Structural aberrations are abnormalities in chromosome structure. If the chromosome keeps its normal complement of genetic information the aberration is balanced; if information is added or missing, it is unbalanced, with an affected phenotype. Breaks heal rapidly by reunion of the two sticky ends. Deletion is loss of a chromosome fragment, in three forms: terminal deletion, loss from one end by a single break; interstitial deletion, loss between two breaks in the same arm with fusion at the break sites; and ring chromosome, two breaks, loss of the fragment between them, and reunion into a ring. Inversion is two breaks followed by rejoining in reversed orientation, either pericentric (the breaks flank the centromere) or paracentric (both breaks on one side of it). Translocation transfers a chromosomal segment to a non-homologous chromosome, in two forms: centric fusion, in which the long arms of two acrocentric chromosomes — classically 21 and 14 — fuse into one chromosome with loss of the (insignificant) short arms, seen in 3 to 4% of Down syndrome; and reciprocal translocation, an exchange of material between two chromosomes that is usually balanced because no material is lost or gained overall. Duplication adds an extra copy of a chromosome segment to its homologue, usually from unequal crossing over, giving a double dose of the duplicated genes. Isochromosomes arise mostly in submetacentric chromosomes when the centromere divides transversely rather than longitudinally at mitotic anaphase, producing one short and one long chromatid that become, in the daughter cells, two unequal chromosomes each with matching (both-long or both-short) p and q arms.
## explicit_objective
Name the six types of structural chromosomal aberration, state which two are subtypes of translocation, and distinguish a balanced from an unbalanced aberration.
## pitfalls
The Philadelphia chromosome — a reciprocal translocation between chromosomes 22 and 9, used to diagnose chronic myeloid leukaemia — is a read-only note the book attaches directly after isochromosomes, and is easy to mis-file under Down syndrome's centric-fusion translocation instead of under reciprocal translocation, where it actually belongs.
## concept_type
classification
## status
under review
## support_mode
direct_statement
## subject
dev
## primary_node_id
DIS-HIS-T01
## secondary_node_ids
[clear]
## aliases
Deletion | Inversion | Translocation | Duplication | Isochromosome | Philadelphia chromosome | Reciprocal translocation
## arabic_label

## arabic_aliases
[clear]
## topic
Histology
## subtopic
Cytogenetics
## microtopic
[clear]
## nanotopic
[clear]
## article_ids
ART-104-HIS-STRUCTURAL-ABERRATIONS
## related_article_ids
ART-104-HIS-NUMERICAL-ABERRATIONS
## related_concept_ids
CON-DEV-294FB8DDA40429 | CON-DEV-451A64C9445CAB
## resource_ids
src_18d3a953df4ca83c4e74
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## atomic_claim_ids
CLM-6008DF5BAE4A
CLM-3F6BC3DE1572
CLM-7E4256D9A9DE
CLM-B0BE3DB717C5
CLM-39568E28AEC4
CLM-D15CEB81DD4E
CLM-AC792B96DD9F
CLM-340E09BA8B8F
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

## review_due

## exclusion_reason

## modules
104 CPS
## module_subject
104 CPS > Histology > Cytogenetics > Chromosomal Aberrations (Abnormalities)
## universities
kau
## learner_years
1
## blueprint_weight
0.13
## exam_weight_by_year
KAU_Y1=0.13
## clinical_relevance
0.5
## academic_relevance
0.9
## exam_signal
src_18d3a953df4ca83c4e74 | department_book | 2026 | p49-51 | 104 CPS
## weight_confidence
0.5
## confidence
0.8
## original_wording
[Histology department book pp. 49-51] Structural Aberrations of chromosomes (Mutation of Chromosomes) ... Types of structural aberrations: 1- Breaks ... 2- Deletion ... 3- Inversion ... 4- Translocation ... 5- Duplication (Addition) ... 6- Isochromosomes ... Read only topic: Philadelphia chromosome arises by reciprocal translocation between chromosomes 22 & 9.
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
relatedArticleIds: None named — this concept's own teaching article covers structural aberrations in full.
relatedConceptIds: CON-DEV-294FB8DDA40429 (Down syndrome) is the worked example of this concept's centric-fusion translocation. CON-DEV-451A64C9445CAB (numerical aberration types) is the other of the two aberration categories the department book divides this chapter into.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: This faculty distributes no video for this module.
atomicClaimIds: The id named here is reserved, in this module's own CLM-104-HIS-<SLUG>-01 shape, so a future evidence pass can write the matching claim under it without a rename; no claim or citation record exists yet at that id. Authoring evidence/104-CPS-claims.md is a separate lane's scope — this record carries only the concept and its teaching article.
resourceOccurrenceIds: Read from the department book by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the department histology book named on exam_signal.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: find-existing.mjs was run before minting; any near-miss it returned is recorded in this file's header, not here.
conflicts: The department book is the only source read for this concept; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
---

