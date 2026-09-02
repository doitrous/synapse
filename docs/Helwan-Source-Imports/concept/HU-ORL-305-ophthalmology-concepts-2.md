<!--
  HU-ORL-305 Ophthalmology lane-2 cluster: Chapter 3 items #21-96 (76 bank
  items; 69 keyed/authored, 7 held: Q32, Q36, Q47, Q50, Q53 unjoined-no-key,
  Q48/Q49 2-option True/False format — see coverage/HU-ORL-305-triage.md and
  HU-ORL-305-LEDGER.md)
  (scripts/helwan/extract/HU-ORL-305/mcq-bank-ophthalmology-ch3b.json). 28
  new concepts, minted OPH-system (CON-OPH-* is the established ophthalmology
  reuse family). No oph/ent subject id exists in the curriculum catalogue
  (LANE-CARD-Y2-3.md §5) — every concept below carries subject 'mul' by the
  pre-ruled elimination. Search performed via find-existing.mjs before every
  mint; no genuine near-duplicate was found this pass (ophthalmology remains
  close to a green field — see HU-ORL-305-ophthalmology-data-2.mjs's header
  note for the full search-result summary). Seven of this cluster's 69
  questions reuse lane-1's already-minted concepts unchanged (see
  concept/HU-ORL-305-ophthalmology-concepts.md) — not re-minted, not
  re-emitted here.
-->

# Item

## id
CON-OPH-ECCA01C1047D1F

## label
Schirmer's test, Rose Bengal staining and tear break-up time diagnose dry eye; the Hirschberg test does not — it estimates strabismus

## canonical_key
dry-eye.diagnostic-tests

## aliases
Schirmer's test
Rose Bengal staining
Tear break-up time
Dry eye tests

## arabic_label


## arabic_aliases


## definition
Dry eye is diagnosed with Schirmer's test (a strip of filter paper measuring tear production over 5 minutes), Rose Bengal or fluorescein staining (revealing devitalised corneal and conjunctival epithelium), and tear break-up time (the interval before the tear film first disrupts after a blink, shortened when the tear film is unstable). The Hirschberg test instead estimates the angle of manifest strabismus from corneal-light-reflex decentration and has no role in dry-eye assessment.

## explicit_objective
List the genuine dry-eye diagnostic tests (Schirmer's, Rose Bengal/fluorescein staining, tear break-up time) and exclude the Hirschberg test (a strabismus test).

## pitfalls
Confusing the Hirschberg test (corneal light reflex, strabismus) with a genuine dry-eye test because both use ocular surface observation.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
mul

## primary_node_id
DIS-OPH-T02

## secondary_node_ids


## topic
Ophthalmology

## subtopic
Eyelid, lacrimal system and orbit

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-PROTECTIVE-2

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
3

## universities
hu

## blueprint_weight
0.4

## exam_weight_by_year
HU_Y3=0.4

## clinical_relevance
0.55

## academic_relevance
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-OPH-DRY-EYE-DIAGNOSTIC-TESTS-02

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).

## owner
Helwan Year-3 authoring lane

## reviewer
Medical team, Helwan Ophthalmology faculty

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
moduleIds: HU-ORL-305 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.
resourceIds: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: This module has no video resource distributed yet.
resourceOccurrenceIds: Hand-authored from the ORL-305 Ophthalmology MCQ bank triage (scripts/helwan/extract/HU-ORL-305); no corpus extraction record exists for this concept.
sourceCandidateIds: find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.
subjectId: No oph/ent subject id exists in the curriculum catalogue (LANE-CARD-Y2-3.md §5) — falls to mul ("Multisystem and emergencies") by the pre-ruled elimination.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
microtopicId: No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.
nanotopicId: No department-level nanotopic subdivision exists below microtopic for this fact.
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for eyelid/lacrimal/orbital-adnexa content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node.
reuse: Covers Ch3 Q22, Q30 and Q95 — three angles on the same set of dry-eye tests.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-B17BF60BD5DFC0

## label
The mucin layer of the pre-corneal tear film is secreted by conjunctival goblet cells, not the meibomian or lacrimal glands

## canonical_key
tear-film.mucin-layer-source

## aliases
Tear film mucin layer
Goblet cell mucin secretion

## arabic_label


## arabic_aliases


## definition
The pre-corneal tear film's innermost mucin layer is secreted by conjunctival goblet cells, and allows the otherwise hydrophobic corneal epithelium to be wetted evenly by the aqueous layer above it. The meibomian glands instead secrete the outer lipid layer (retarding evaporation), and the main and accessory lacrimal glands secrete the middle aqueous layer — neither contributes the mucin layer.

## explicit_objective
Identify conjunctival goblet cells as the source of the tear film mucin layer, distinct from the meibomian (lipid) and lacrimal (aqueous) glands.

## pitfalls
Assigning the mucin layer to the meibomian gland (source of the lipid layer) or the lacrimal gland (source of the aqueous layer) instead of the goblet cells.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
mul

## primary_node_id
DIS-OPH-T02

## secondary_node_ids


## topic
Ophthalmology

## subtopic
Eyelid, lacrimal system and orbit

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-PROTECTIVE-2

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
3

## universities
hu

## blueprint_weight
0.4

## exam_weight_by_year
HU_Y3=0.4

## clinical_relevance
0.55

## academic_relevance
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-OPH-TEAR-FILM-MUCIN-SOURCE-02

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).

## owner
Helwan Year-3 authoring lane

## reviewer
Medical team, Helwan Ophthalmology faculty

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
moduleIds: HU-ORL-305 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.
resourceIds: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: This module has no video resource distributed yet.
resourceOccurrenceIds: Hand-authored from the ORL-305 Ophthalmology MCQ bank triage (scripts/helwan/extract/HU-ORL-305); no corpus extraction record exists for this concept.
sourceCandidateIds: find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.
subjectId: No oph/ent subject id exists in the curriculum catalogue (LANE-CARD-Y2-3.md §5) — falls to mul ("Multisystem and emergencies") by the pre-ruled elimination.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
microtopicId: No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.
nanotopicId: No department-level nanotopic subdivision exists below microtopic for this fact.
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for eyelid/lacrimal/orbital-adnexa content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node.
reuse: Covers Ch3 Q24 and Q41 — the same fact tested twice.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-5519C63D257C36

## label
A chalazion is a chronic, non-infective lipogranuloma of a meibomian gland — away from the lid margin, painless, and not staphylococcal

## canonical_key
chalazion.meibomian-gland-granuloma

## aliases
Chalazion
Meibomian gland granuloma
Stye vs chalazion

## arabic_label


## arabic_aliases


## definition
A chalazion is a chronic inflammatory (lipo)granuloma of a meibomian gland, distinct from a stye (hordeolum externum, an acute infective Zeis-gland abscess). The two are distinguished chiefly by their relation to the lid margin: a stye points at the lash-bearing margin itself, while a chalazion is deeper, within the tarsal plate, away from the margin, and characteristically painless rather than acutely tender. Because a chalazion is a sterile granulomatous reaction to retained meibomian secretion rather than an infection, it is not caused by Staphylococcus and does not itself displace the globe (it is not a recognised cause of proptosis).

## explicit_objective
Identify chalazion as a chronic, non-infective meibomian-gland granuloma, distinguished from a stye by its relation to the lid margin, and exclude it as a staphylococcal or proptosis-causing process.

## pitfalls
Treating chalazion as an infective process (Staphylococcal, like a stye) or as a mass capable of causing proptosis, rather than a sterile granulomatous reaction confined to the tarsal plate.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
mul

## primary_node_id
DIS-OPH-T02

## secondary_node_ids


## topic
Ophthalmology

## subtopic
Eyelid, lacrimal system and orbit

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-PROTECTIVE-2

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
3

## universities
hu

## blueprint_weight
0.4

## exam_weight_by_year
HU_Y3=0.4

## clinical_relevance
0.55

## academic_relevance
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-OPH-CHALAZION-GRANULOMA-02

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).

## owner
Helwan Year-3 authoring lane

## reviewer
Medical team, Helwan Ophthalmology faculty

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
moduleIds: HU-ORL-305 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.
resourceIds: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: This module has no video resource distributed yet.
resourceOccurrenceIds: Hand-authored from the ORL-305 Ophthalmology MCQ bank triage (scripts/helwan/extract/HU-ORL-305); no corpus extraction record exists for this concept.
sourceCandidateIds: find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.
subjectId: No oph/ent subject id exists in the curriculum catalogue (LANE-CARD-Y2-3.md §5) — falls to mul ("Multisystem and emergencies") by the pre-ruled elimination.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
microtopicId: No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.
nanotopicId: No department-level nanotopic subdivision exists below microtopic for this fact.
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for eyelid/lacrimal/orbital-adnexa content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node.
reuse: Covers Ch3 Q26, Q27, Q62, Q63, Q77 and Q85 — definition, gland of origin, two clinical vignettes, and two exclusion facts (not a proptosis cause, not staphylococcal), all the same underlying chalazion concept.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-60CB07A5F75387

## label
Ptosis surgery is chosen by levator function: levator resection when function is present (even if poor-to-good), frontalis sling when levator function is absent

## canonical_key
ptosis.surgical-choice-by-levator-function

## aliases
Ptosis surgery
Levator resection
Frontalis sling

## arabic_label


## arabic_aliases


## definition
The surgical approach to ptosis is graded by how much levator palpebrae superioris function remains. Levator resection — shortening the muscle to increase its lifting power — is the standard choice whenever measurable levator function is present, classically for moderate ptosis with good levator function. When levator function is severely poor or absent altogether, as in severe congenital ptosis, the levator cannot be usefully shortened, and a frontalis sling instead harnesses the frontalis muscle (via the forehead) to lift the lid mechanically.

## explicit_objective
Match levator resection (function present) and frontalis sling (function absent) to the correct ptosis-severity/levator-function combination.

## pitfalls
Choosing frontalis sling when levator function is actually present (resection is preferred whenever the muscle still works), or resection when function is truly absent.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
mul

## primary_node_id
DIS-OPH-T02

## secondary_node_ids


## topic
Ophthalmology

## subtopic
Eyelid, lacrimal system and orbit

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-PROTECTIVE-2

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
3

## universities
hu

## blueprint_weight
0.4

## exam_weight_by_year
HU_Y3=0.4

## clinical_relevance
0.55

## academic_relevance
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-OPH-PTOSIS-SURGICAL-CHOICE-B-02

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).

## owner
Helwan Year-3 authoring lane

## reviewer
Medical team, Helwan Ophthalmology faculty

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
moduleIds: HU-ORL-305 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.
resourceIds: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: This module has no video resource distributed yet.
resourceOccurrenceIds: Hand-authored from the ORL-305 Ophthalmology MCQ bank triage (scripts/helwan/extract/HU-ORL-305); no corpus extraction record exists for this concept.
sourceCandidateIds: find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.
subjectId: No oph/ent subject id exists in the curriculum catalogue (LANE-CARD-Y2-3.md §5) — falls to mul ("Multisystem and emergencies") by the pre-ruled elimination.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
microtopicId: No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.
nanotopicId: No department-level nanotopic subdivision exists below microtopic for this fact.
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for eyelid/lacrimal/orbital-adnexa content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node.
reuse: Covers Ch3 Q28 (no levator function -> frontalis sling) and Q52 (good levator function -> resection) — the same choice-rule from opposite ends.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-1EE94D89D1AB97

## label
The lacrimal drainage system is the puncti, canaliculi and lacrimal sac (continuing into the nasolacrimal duct) — not the goblet cells (secretory) or the lacrimal sac itself when classing secretory structures; its failure causes dacryocystitis, punctal stenosis and mucocele, not trichiasis

## canonical_key
lacrimal-drainage-system.anatomy-and-failure

## aliases
Lacrimal drainage system
Puncti
Canaliculi
Lacrimal sac

## arabic_label


## arabic_aliases


## definition
The lacrimal drainage (excretory) pathway is built from the puncti, the canaliculi and the lacrimal sac, continuing down the nasolacrimal duct into the inferior nasal meatus; goblet cells are secretory (tear-film mucin), not part of this drainage chain. Conversely, when the lacrimal gland, accessory lacrimal glands and goblet cells are grouped as the secretory system, the lacrimal sac itself is excluded — it is drainage, not secretory, tissue. Defective drainage anywhere along the excretory pathway can produce chronic dacryocystitis, punctal stenosis or a lacrimal-sac mucocele, but not trichiasis, which is a misdirected-lash disorder of the lid margin unrelated to tear drainage.

## explicit_objective
Classify the puncti, canaliculi and lacrimal sac as drainage (not secretory) structures, and list defective-drainage consequences (dacryocystitis, punctal stenosis, mucocele) while excluding trichiasis.

## pitfalls
Placing goblet cells in the drainage system (they are secretory) or the lacrimal sac in the secretory system (it is drainage), or attributing trichiasis to defective lacrimal drainage.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
mul

## primary_node_id
DIS-OPH-T02

## secondary_node_ids


## topic
Ophthalmology

## subtopic
Eyelid, lacrimal system and orbit

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-PROTECTIVE-2

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
3

## universities
hu

## blueprint_weight
0.4

## exam_weight_by_year
HU_Y3=0.4

## clinical_relevance
0.55

## academic_relevance
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-OPH-LACRIMAL-DRAINAGE-SYSTEM-02

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).

## owner
Helwan Year-3 authoring lane

## reviewer
Medical team, Helwan Ophthalmology faculty

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
moduleIds: HU-ORL-305 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.
resourceIds: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: This module has no video resource distributed yet.
resourceOccurrenceIds: Hand-authored from the ORL-305 Ophthalmology MCQ bank triage (scripts/helwan/extract/HU-ORL-305); no corpus extraction record exists for this concept.
sourceCandidateIds: find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.
subjectId: No oph/ent subject id exists in the curriculum catalogue (LANE-CARD-Y2-3.md §5) — falls to mul ("Multisystem and emergencies") by the pre-ruled elimination.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
microtopicId: No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.
nanotopicId: No department-level nanotopic subdivision exists below microtopic for this fact.
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for eyelid/lacrimal/orbital-adnexa content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node.
reuse: Covers Ch3 Q31 (drainage-failure consequences, excludes trichiasis), Q38 (secretory-system parts, excludes the sac) and Q89 (drainage-system parts, excludes goblet cells) — one anatomical secretory-vs-drainage distinction tested three ways.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-77FD36865BBD5E

## label
Congenital ptosis (from levator dystrophy, the commonest cause of childhood ptosis) shows an absent lid crease, chin elevation and forehead corrugation, and is graded by the margin-reflex distance (MRD)

## canonical_key
congenital-ptosis.clinical-signs

## aliases
Congenital ptosis signs
Margin-reflex distance
MRD

## arabic_label


## arabic_aliases


## definition
Congenital ptosis, typically from developmental dystrophy of the levator palpebrae superioris (not the orbicularis oculi, a lid-closing muscle), is the commonest cause of ptosis presenting in early childhood. Its clinical signs include an absent upper-lid crease (the crease depends on normal levator aponeurosis attachment), compensatory chin elevation, and forehead corrugation from frontalis overaction as the child tries to raise the lid. The severity of any ptosis, congenital or acquired, is quantified by the margin-reflex distance (MRD) — the distance from the corneal light reflex to the upper lid margin — rather than by the lid's coverage of the cornea alone.

## explicit_objective
List the clinical signs of congenital ptosis (absent crease, chin elevation, forehead corrugation), name it as the commonest cause of childhood ptosis (from levator, not orbicularis, dystrophy), and identify MRD as the grading measure.

## pitfalls
Attributing congenital ptosis to orbicularis oculi dystrophy (a lid-closing muscle) rather than levator palpebrae superioris dystrophy (the lid-opening muscle actually affected).

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
mul

## primary_node_id
DIS-OPH-T02

## secondary_node_ids


## topic
Ophthalmology

## subtopic
Eyelid, lacrimal system and orbit

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-PROTECTIVE-2

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
3

## universities
hu

## blueprint_weight
0.4

## exam_weight_by_year
HU_Y3=0.4

## clinical_relevance
0.55

## academic_relevance
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-OPH-CONGENITAL-PTOSIS-SIGNS-02

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).

## owner
Helwan Year-3 authoring lane

## reviewer
Medical team, Helwan Ophthalmology faculty

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
moduleIds: HU-ORL-305 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.
resourceIds: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: This module has no video resource distributed yet.
resourceOccurrenceIds: Hand-authored from the ORL-305 Ophthalmology MCQ bank triage (scripts/helwan/extract/HU-ORL-305); no corpus extraction record exists for this concept.
sourceCandidateIds: find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.
subjectId: No oph/ent subject id exists in the curriculum catalogue (LANE-CARD-Y2-3.md §5) — falls to mul ("Multisystem and emergencies") by the pre-ruled elimination.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
microtopicId: No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.
nanotopicId: No department-level nanotopic subdivision exists below microtopic for this fact.
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for eyelid/lacrimal/orbital-adnexa content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node.
reuse: Covers Ch3 Q33 (signs list) and Q65 (paediatric vignette applying the same signs, MRD and commonest-cause facts).
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-A27A434D921D27

## label
Hordeolum internum is treated with hot fomentation, antibiotics and evacuation — not lash epilation, a trichiasis treatment; diabetes and lack of sleep, not hypertension, predispose to acute hordeolum; and squamous blepharitis is a non-glandular seborrhoeic pattern, distinct from the true lid-gland infections (hordeolum externum/internum, ulcerative blepharitis)

## canonical_key
hordeolum.management-and-lid-gland-infections

## aliases
Hordeolum internum treatment
Predisposing causes of hordeolum
Lid gland infections

## arabic_label


## arabic_aliases


## definition
Hordeolum internum (a suppurative meibomian-gland infection, deeper than the lash-follicle stye) is managed with hot fomentation, systemic or topical antibiotics, and surgical evacuation if it does not resolve; epilating the associated lash treats trichiasis, not hordeolum, and has no role here. Recognised predisposing factors for acute hordeolum include diabetes mellitus, chronic lack of sleep and asthenopia (eye strain), but not hypertension, which is not an established risk factor. Among lid-margin infections, ulcerative blepharitis, hordeolum externum and hordeolum internum are all infective processes centred on a lash follicle or its associated gland, while squamous (seborrhoeic) blepharitis is a non-infective, non-glandular scaling pattern and is the exception when the group is framed as "lid gland" infections.

## explicit_objective
State hordeolum internum's treatment (fomentation, antibiotics, evacuation, not epilation), its predisposing factors (diabetes, lack of sleep, asthenopia, not hypertension), and distinguish squamous blepharitis (non-glandular) from the true infective lid-gland conditions.

## pitfalls
Prescribing lash epilation for hordeolum (a trichiasis treatment) or naming hypertension as a hordeolum risk factor; grouping squamous blepharitis with the infective lid-gland conditions rather than recognising it as the non-glandular exception.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
mul

## primary_node_id
DIS-OPH-T02

## secondary_node_ids


## topic
Ophthalmology

## subtopic
Eyelid, lacrimal system and orbit

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-PROTECTIVE-2

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
3

## universities
hu

## blueprint_weight
0.4

## exam_weight_by_year
HU_Y3=0.4

## clinical_relevance
0.55

## academic_relevance
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-OPH-HORDEOLUM-MANAGEMENT-AND-02

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).

## owner
Helwan Year-3 authoring lane

## reviewer
Medical team, Helwan Ophthalmology faculty

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
moduleIds: HU-ORL-305 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.
resourceIds: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: This module has no video resource distributed yet.
resourceOccurrenceIds: Hand-authored from the ORL-305 Ophthalmology MCQ bank triage (scripts/helwan/extract/HU-ORL-305); no corpus extraction record exists for this concept.
sourceCandidateIds: find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.
subjectId: No oph/ent subject id exists in the curriculum catalogue (LANE-CARD-Y2-3.md §5) — falls to mul ("Multisystem and emergencies") by the pre-ruled elimination.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
microtopicId: No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.
nanotopicId: No department-level nanotopic subdivision exists below microtopic for this fact.
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for eyelid/lacrimal/orbital-adnexa content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node.
reuse: Covers Ch3 Q34 (hordeolum internum treatment), Q51 (lid-gland infection exception) and Q84 (hordeolum predisposing factors) — three closely related hordeolum/lid-gland-infection facts.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-8A2C45E1E31D18

## label
Trichiasis (misdirected lashes rubbing the cornea) follows ulcerative blepharitis or cicatricial entropion from trachoma; established trachomatous cicatricial disease needs a mucous-membrane graft, not antibiotic drops alone

## canonical_key
trichiasis.causes-and-management

## aliases
Trichiasis
Trachomatous entropion

## arabic_label


## arabic_aliases


## definition
Trichiasis — eyelashes misdirected inward to rub against the cornea — has two principal mechanisms: ulcerative blepharitis, whose chronic lid-margin scarring can redirect lash growth, and trachoma, whose conjunctival cicatrization classically produces entropion and secondary trichiasis. Follicular trachoma itself (the acute follicular conjunctivitis stage) is a distinct, earlier process from the cicatricial entropion that trichiasis follows years later. Once trichiasis is established on a cicatricial-entropion basis, topical antibiotic drops alone do not correct the underlying lid-margin malposition; a mucous-membrane graft (or an equivalent lid-reconstructive procedure) is needed to restore normal lash alignment.

## explicit_objective
Name ulcerative blepharitis and trachomatous cicatricial entropion as trichiasis causes, and state that mucous-membrane grafting, not antibiotic drops alone, corrects established trachomatous trichiasis.

## pitfalls
Treating antibiotic eye drops as sufficient management for trichiasis from established cicatricial entropion, when the underlying lid-margin malposition needs surgical correction.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
mul

## primary_node_id
DIS-OPH-T02

## secondary_node_ids


## topic
Ophthalmology

## subtopic
Eyelid, lacrimal system and orbit

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-PROTECTIVE-2

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
3

## universities
hu

## blueprint_weight
0.4

## exam_weight_by_year
HU_Y3=0.4

## clinical_relevance
0.55

## academic_relevance
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-OPH-TRICHIASIS-CAUSES-02

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).

## owner
Helwan Year-3 authoring lane

## reviewer
Medical team, Helwan Ophthalmology faculty

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
moduleIds: HU-ORL-305 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.
resourceIds: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: This module has no video resource distributed yet.
resourceOccurrenceIds: Hand-authored from the ORL-305 Ophthalmology MCQ bank triage (scripts/helwan/extract/HU-ORL-305); no corpus extraction record exists for this concept.
sourceCandidateIds: find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.
subjectId: No oph/ent subject id exists in the curriculum catalogue (LANE-CARD-Y2-3.md §5) — falls to mul ("Multisystem and emergencies") by the pre-ruled elimination.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
microtopicId: No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.
nanotopicId: No department-level nanotopic subdivision exists below microtopic for this fact.
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for eyelid/lacrimal/orbital-adnexa content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node.
reuse: Covers Ch3 Q35 (causes list) and Q67 (trachomatous-entropion vignette with its surgical management) — two angles on the same trichiasis-causation fact.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-9BA0990552BA22

## label
Dry eye follows collagen-vascular disease (Sjögren-type aqueous deficiency), accessory-lacrimal-gland atrophy, vitamin A deficiency and cicatricial mucin-deficiency (trachoma) — not punctal obstruction, which instead causes epiphora

## canonical_key
dry-eye.causes

## aliases
Dry eye causes
Aqueous tear deficiency
Sjögren's syndrome dry eye
Mucin deficiency dry eye

## arabic_label


## arabic_aliases


## definition
Dry eye has recognised causes on both its aqueous and mucin sides: aqueous-deficiency dry eye follows collagen-vascular disease (rheumatoid arthritis, Sjögren's syndrome, presenting with dry mouth alongside dry eye) and atrophy of the accessory lacrimal glands, while mucin-deficiency dry eye follows conjunctival goblet-cell loss, whether from vitamin A deficiency or from chronic cicatrizing conjunctival disease such as trachoma (with its characteristic conjunctival scarring, papillary-follicular changes and Arlt's line). Obstruction of the lacrimal puncti, by contrast, blocks tear drainage and so causes epiphora (excess tearing), the clinical opposite of dry eye, and is not itself a recognised dry-eye cause.

## explicit_objective
List genuine dry-eye causes on the aqueous side (collagen-vascular disease/Sjögren, accessory gland atrophy) and mucin side (vitamin A deficiency, trachomatous cicatrization), and exclude punctal obstruction (a cause of epiphora, not dryness).

## pitfalls
Naming punctal obstruction as a dry-eye cause when it instead blocks drainage and causes epiphora — the opposite clinical problem.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
mul

## primary_node_id
DIS-OPH-T02

## secondary_node_ids


## topic
Ophthalmology

## subtopic
Eyelid, lacrimal system and orbit

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-PROTECTIVE-2

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
3

## universities
hu

## blueprint_weight
0.4

## exam_weight_by_year
HU_Y3=0.4

## clinical_relevance
0.55

## academic_relevance
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-OPH-DRY-EYE-CAUSES-02

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).

## owner
Helwan Year-3 authoring lane

## reviewer
Medical team, Helwan Ophthalmology faculty

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
moduleIds: HU-ORL-305 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.
resourceIds: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: This module has no video resource distributed yet.
resourceOccurrenceIds: Hand-authored from the ORL-305 Ophthalmology MCQ bank triage (scripts/helwan/extract/HU-ORL-305); no corpus extraction record exists for this concept.
sourceCandidateIds: find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.
subjectId: No oph/ent subject id exists in the curriculum catalogue (LANE-CARD-Y2-3.md §5) — falls to mul ("Multisystem and emergencies") by the pre-ruled elimination.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
microtopicId: No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.
nanotopicId: No department-level nanotopic subdivision exists below microtopic for this fact.
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for eyelid/lacrimal/orbital-adnexa content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node.
reuse: Covers Ch3 Q37 and Q93 (causes-except list, same fact twice) plus Q74 (Sjögren/aqueous-deficiency vignette) and Q75 (trachoma/mucin-deficiency vignette) — the full causes list, tested as a list twice and as two clinical vignettes.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-42CE59614F1F76

## label
The lacrimal gland's larger orbital portion is chiefly responsible for reflex tear secretion

## canonical_key
lacrimal-gland.orbital-part-reflex-secretion

## aliases
Lacrimal gland orbital part
Reflex tear secretion

## arabic_label


## arabic_aliases


## definition
The main lacrimal gland has two continuous parts, separated by the levator aponeurosis: a larger orbital portion and a smaller palpebral portion. The orbital portion is chiefly responsible for reflex tear secretion — the sudden, high-volume tearing triggered by irritation, emotion or corneal stimulation — while basal (resting) tear secretion instead depends mainly on the accessory lacrimal glands (of Krause and Wolfring); neither part of the main lacrimal gland secretes the tear film's mucin layer, which is a goblet-cell product.

## explicit_objective
Identify the lacrimal gland's orbital portion as responsible for reflex tear secretion, distinct from basal secretion (accessory glands) and mucin secretion (goblet cells).

## pitfalls
Assigning basal (resting) tear secretion, rather than reflex secretion, to the orbital portion of the lacrimal gland.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
mul

## primary_node_id
DIS-OPH-T02

## secondary_node_ids


## topic
Ophthalmology

## subtopic
Eyelid, lacrimal system and orbit

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-PROTECTIVE-2

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
3

## universities
hu

## blueprint_weight
0.4

## exam_weight_by_year
HU_Y3=0.4

## clinical_relevance
0.55

## academic_relevance
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-OPH-LACRIMAL-GLAND-ORBITAL-P-02

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).

## owner
Helwan Year-3 authoring lane

## reviewer
Medical team, Helwan Ophthalmology faculty

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
moduleIds: HU-ORL-305 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.
resourceIds: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: This module has no video resource distributed yet.
resourceOccurrenceIds: Hand-authored from the ORL-305 Ophthalmology MCQ bank triage (scripts/helwan/extract/HU-ORL-305); no corpus extraction record exists for this concept.
sourceCandidateIds: find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.
subjectId: No oph/ent subject id exists in the curriculum catalogue (LANE-CARD-Y2-3.md §5) — falls to mul ("Multisystem and emergencies") by the pre-ruled elimination.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
microtopicId: No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.
nanotopicId: No department-level nanotopic subdivision exists below microtopic for this fact.
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for eyelid/lacrimal/orbital-adnexa content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-AEEA41F9043447

## label
A positive lacrimal regurgitation test is diagnostic of nasolacrimal duct obstruction, not canalicular obstruction, punctal occlusion or ectropion

## canonical_key
regurgitation-test.nasolacrimal-duct-obstruction

## aliases
Regurge test
Lacrimal regurgitation test

## arabic_label


## arabic_aliases


## definition
The lacrimal regurgitation ('regurge') test presses over the lacrimal sac and watches for mucoid or mucopurulent material to reflux back through the puncti — a positive result confirms that the sac is patent to the puncti but obstructed distally, at the nasolacrimal duct, which is precisely the finding in chronic dacryocystitis. A canalicular obstruction (proximal to the sac) or punctal occlusion instead prevents tears from ever reaching the sac to be regurgitated, and ectropion is an eyelid-margin malposition unrelated to the test's mechanism.

## explicit_objective
State that a positive regurge test localises the obstruction to the nasolacrimal duct (sac-to-nose level), not the canaliculi, puncti, or a lid malposition.

## pitfalls
Localising a positive regurge test to the canaliculi or puncti (proximal to the sac) instead of the nasolacrimal duct (distal to the sac).

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
mul

## primary_node_id
DIS-OPH-T02

## secondary_node_ids


## topic
Ophthalmology

## subtopic
Eyelid, lacrimal system and orbit

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-PROTECTIVE-2

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
3

## universities
hu

## blueprint_weight
0.4

## exam_weight_by_year
HU_Y3=0.4

## clinical_relevance
0.55

## academic_relevance
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-OPH-REGURGE-TEST-DIAGNOSTIC-02

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).

## owner
Helwan Year-3 authoring lane

## reviewer
Medical team, Helwan Ophthalmology faculty

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
moduleIds: HU-ORL-305 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.
resourceIds: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: This module has no video resource distributed yet.
resourceOccurrenceIds: Hand-authored from the ORL-305 Ophthalmology MCQ bank triage (scripts/helwan/extract/HU-ORL-305); no corpus extraction record exists for this concept.
sourceCandidateIds: find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.
subjectId: No oph/ent subject id exists in the curriculum catalogue (LANE-CARD-Y2-3.md §5) — falls to mul ("Multisystem and emergencies") by the pre-ruled elimination.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
microtopicId: No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.
nanotopicId: No department-level nanotopic subdivision exists below microtopic for this fact.
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for eyelid/lacrimal/orbital-adnexa content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node.
reuse: Covers Ch3 Q40 and Q94 — the same fact tested twice.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-7A3280BF4567FC

## label
The pre-corneal tear film nourishes, protects (antibacterial) and lubricates the cornea, and is disrupted by goblet-cell (mucin) deficiency, contrary to a claim that it isn't

## canonical_key
pre-corneal-tear-film.functions

## aliases
Pre-corneal tear film functions
Tear film stability

## arabic_label


## arabic_aliases


## definition
The pre-corneal tear film serves three principal functions: it nourishes the avascular cornea (delivering oxygen and nutrients), protects it through antibacterial substances such as lysozyme and lactoferrin, and lubricates the corneal and conjunctival surfaces during blinking. Because the innermost mucin layer, secreted by conjunctival goblet cells, is what allows the aqueous layer to wet the hydrophobic corneal surface evenly, goblet-cell deficiency destabilises the whole tear film rather than leaving it unaffected.

## explicit_objective
List the tear film's three functions (nutrition, antibacterial protection, lubrication) and state that goblet-cell (mucin) deficiency does affect it, contrary to a claim that it does not.

## pitfalls
Accepting a claim that the tear film 'is not affected by' goblet-cell deficiency — the mucin layer they secrete is required for the whole film's stability.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
mul

## primary_node_id
DIS-OPH-T02

## secondary_node_ids


## topic
Ophthalmology

## subtopic
Eyelid, lacrimal system and orbit

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-PROTECTIVE-2

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
3

## universities
hu

## blueprint_weight
0.4

## exam_weight_by_year
HU_Y3=0.4

## clinical_relevance
0.55

## academic_relevance
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-OPH-TEAR-FILM-FUNCTIONS-02

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).

## owner
Helwan Year-3 authoring lane

## reviewer
Medical team, Helwan Ophthalmology faculty

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
moduleIds: HU-ORL-305 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.
resourceIds: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: This module has no video resource distributed yet.
resourceOccurrenceIds: Hand-authored from the ORL-305 Ophthalmology MCQ bank triage (scripts/helwan/extract/HU-ORL-305); no corpus extraction record exists for this concept.
sourceCandidateIds: find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.
subjectId: No oph/ent subject id exists in the curriculum catalogue (LANE-CARD-Y2-3.md §5) — falls to mul ("Multisystem and emergencies") by the pre-ruled elimination.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
microtopicId: No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.
nanotopicId: No department-level nanotopic subdivision exists below microtopic for this fact.
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for eyelid/lacrimal/orbital-adnexa content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-BDABDADD60DFD5

## label
Epiphora work-up includes face/cheek scar examination, lid-margin examination and the Jones dye test — not fluorescein angiography, a retinal-vessel investigation

## canonical_key
epiphora.investigations

## aliases
Epiphora investigations
Jones dye test

## arabic_label


## arabic_aliases


## definition
Investigating epiphora (watering eye) includes examining the cheeks and face for scars that might indicate previous trauma affecting lacrimal drainage, examining the lid margin for malposition (ectropion, punctal eversion), and the Jones dye test, which uses instilled fluorescein to localise a drainage-pathway obstruction functionally. Fluorescein angiography is an entirely different investigation — it images the retinal and choroidal vasculature by intravenous dye injection and has no role in the lacrimal drainage work-up.

## explicit_objective
List the genuine epiphora investigations (facial-scar examination, lid-margin examination, Jones dye test) and exclude fluorescein angiography (a retinal-vessel investigation).

## pitfalls
Confusing the Jones dye test (lacrimal drainage, topical fluorescein) with fluorescein angiography (retinal vasculature, intravenous dye) because both use fluorescein.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
mul

## primary_node_id
DIS-OPH-T02

## secondary_node_ids


## topic
Ophthalmology

## subtopic
Eyelid, lacrimal system and orbit

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-PROTECTIVE-2

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
3

## universities
hu

## blueprint_weight
0.4

## exam_weight_by_year
HU_Y3=0.4

## clinical_relevance
0.55

## academic_relevance
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-OPH-EPIPHORA-INVESTIGATIONS-02

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).

## owner
Helwan Year-3 authoring lane

## reviewer
Medical team, Helwan Ophthalmology faculty

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
moduleIds: HU-ORL-305 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.
resourceIds: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: This module has no video resource distributed yet.
resourceOccurrenceIds: Hand-authored from the ORL-305 Ophthalmology MCQ bank triage (scripts/helwan/extract/HU-ORL-305); no corpus extraction record exists for this concept.
sourceCandidateIds: find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.
subjectId: No oph/ent subject id exists in the curriculum catalogue (LANE-CARD-Y2-3.md §5) — falls to mul ("Multisystem and emergencies") by the pre-ruled elimination.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
microtopicId: No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.
nanotopicId: No department-level nanotopic subdivision exists below microtopic for this fact.
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for eyelid/lacrimal/orbital-adnexa content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-79B3B533D16CC6

## label
Acute dacryocystitis can spread to cause orbital cellulitis, cavernous sinus thrombosis or a lacrimal fistula, not squint; chronic dacryocystitis risks a recurrent-infection cascade including post-cataract endophthalmitis, not glaucoma

## canonical_key
dacryocystitis.complications

## aliases
Dacryocystitis complications
Lacrimal sac fistula

## arabic_label


## arabic_aliases


## definition
Untreated acute dacryocystitis can spread from the infected lacrimal sac to cause orbital cellulitis, ascend via the ophthalmic veins to cause cavernous sinus thrombosis, or discharge chronically through a lacrimal fistula; a squint (misalignment of the visual axes) is not a recognised complication of this infective process. Chronic dacryocystitis instead carries the risk of recurrent acute exacerbations, recurrent conjunctivitis from the chronically infected reservoir, and endophthalmitis if intraocular surgery such as cataract extraction is performed while the sac remains colonised — but it is not a recognised cause of glaucoma.

## explicit_objective
List the complications of acute dacryocystitis (orbital cellulitis, cavernous sinus thrombosis, fistula — not squint) and of chronic dacryocystitis (recurrence, conjunctivitis, post-cataract endophthalmitis — not glaucoma).

## pitfalls
Naming squint as an acute-dacryocystitis complication or glaucoma as a chronic-dacryocystitis complication — neither is recognised.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
mul

## primary_node_id
DIS-OPH-T02

## secondary_node_ids


## topic
Ophthalmology

## subtopic
Eyelid, lacrimal system and orbit

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-PROTECTIVE-2

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
3

## universities
hu

## blueprint_weight
0.4

## exam_weight_by_year
HU_Y3=0.4

## clinical_relevance
0.55

## academic_relevance
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-OPH-DACRYOCYSTITIS-COMPLICAT-02

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).

## owner
Helwan Year-3 authoring lane

## reviewer
Medical team, Helwan Ophthalmology faculty

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
moduleIds: HU-ORL-305 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.
resourceIds: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: This module has no video resource distributed yet.
resourceOccurrenceIds: Hand-authored from the ORL-305 Ophthalmology MCQ bank triage (scripts/helwan/extract/HU-ORL-305); no corpus extraction record exists for this concept.
sourceCandidateIds: find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.
subjectId: No oph/ent subject id exists in the curriculum catalogue (LANE-CARD-Y2-3.md §5) — falls to mul ("Multisystem and emergencies") by the pre-ruled elimination.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
microtopicId: No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.
nanotopicId: No department-level nanotopic subdivision exists below microtopic for this fact.
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for eyelid/lacrimal/orbital-adnexa content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node.
reuse: Covers Ch3 Q44 (acute-complications-except) and Q90 (chronic-complications-except) — the two complication lists for the same underlying disease.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-7D83D9FA8FE6AC

## label
Chronic dacryocystitis presents with epiphora, a swelling/fullness below the medial canthus, recurrent mucoid discharge and a POSITIVE regurge test — a negative regurge test is not part of its picture

## canonical_key
chronic-dacryocystitis.clinical-picture

## aliases
Chronic dacryocystitis clinical picture
Medial canthal swelling

## arabic_label


## arabic_aliases


## definition
Chronic dacryocystitis, from nasolacrimal duct obstruction causing a chronically infected, distended lacrimal sac, presents with epiphora, a fullness or swelling below the medial palpebral ligament/medial canthus, and recurrent mucoid or mucopurulent discharge; pressing the sac in this condition characteristically produces a positive regurge test, confirming the sac is patent to the puncti but obstructed at the duct. A negative regurge test is therefore not part of the expected clinical picture — it would instead suggest canalicular or punctal obstruction proximal to the sac.

## explicit_objective
List chronic dacryocystitis's clinical picture (epiphora, medial canthal swelling, mucoid discharge, positive regurge test) and identify a negative regurge test as inconsistent with it.

## pitfalls
Accepting a negative regurge test as part of chronic dacryocystitis's clinical picture, when the test is characteristically positive in this condition.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
mul

## primary_node_id
DIS-OPH-T02

## secondary_node_ids


## topic
Ophthalmology

## subtopic
Eyelid, lacrimal system and orbit

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-PROTECTIVE-2

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
3

## universities
hu

## blueprint_weight
0.4

## exam_weight_by_year
HU_Y3=0.4

## clinical_relevance
0.55

## academic_relevance
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-OPH-CHRONIC-DACRYOCYSTITIS-C-02

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).

## owner
Helwan Year-3 authoring lane

## reviewer
Medical team, Helwan Ophthalmology faculty

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
moduleIds: HU-ORL-305 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.
resourceIds: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: This module has no video resource distributed yet.
resourceOccurrenceIds: Hand-authored from the ORL-305 Ophthalmology MCQ bank triage (scripts/helwan/extract/HU-ORL-305); no corpus extraction record exists for this concept.
sourceCandidateIds: find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.
subjectId: No oph/ent subject id exists in the curriculum catalogue (LANE-CARD-Y2-3.md §5) — falls to mul ("Multisystem and emergencies") by the pre-ruled elimination.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
microtopicId: No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.
nanotopicId: No department-level nanotopic subdivision exists below microtopic for this fact.
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for eyelid/lacrimal/orbital-adnexa content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node.
reuse: Covers Ch3 Q45 and Q91 (clinical-picture-except list, same fact twice) plus Q73 (clinical vignette applying the same positive-regurge/NLD-obstruction and recurrent-conjunctivitis facts).
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-6E25E65711C7EC

## label
Contrast dacryocystography localises the obstruction site before lacrimal surgery, and diagnoses diverticula, fistulae and filling defects from tumours or stones

## canonical_key
dacryocystography.indications

## aliases
Dacryocystography
DCG

## arabic_label


## arabic_aliases


## definition
Contrast dacryocystography (DCG) images the lacrimal drainage pathway after injecting radio-opaque contrast into the canaliculi, and is indicated to confirm the exact site of an obstruction before planned lacrimal surgery, to identify a diverticulum or fistula of the sac, and to characterise filling defects caused by a tumour or a lacrimal stone (dacryolith). All three indications reflect the same underlying strength: DCG directly visualises the drainage pathway's anatomy and any structural lesion within it, which functional tests such as the regurge or Jones dye test cannot do.

## explicit_objective
List dacryocystography's indications: pre-surgical obstruction localisation, diverticulum/fistula diagnosis, and characterising tumour or stone filling defects.

## pitfalls
Treating dacryocystography as interchangeable with a purely functional test (regurge, Jones dye) rather than recognising its distinct anatomical/structural role.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
mul

## primary_node_id
DIS-OPH-T02

## secondary_node_ids


## topic
Ophthalmology

## subtopic
Eyelid, lacrimal system and orbit

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-PROTECTIVE-2

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
3

## universities
hu

## blueprint_weight
0.4

## exam_weight_by_year
HU_Y3=0.4

## clinical_relevance
0.55

## academic_relevance
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-OPH-DACRYOCYSTOGRAPHY-INDICA-02

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).

## owner
Helwan Year-3 authoring lane

## reviewer
Medical team, Helwan Ophthalmology faculty

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
moduleIds: HU-ORL-305 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.
resourceIds: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: This module has no video resource distributed yet.
resourceOccurrenceIds: Hand-authored from the ORL-305 Ophthalmology MCQ bank triage (scripts/helwan/extract/HU-ORL-305); no corpus extraction record exists for this concept.
sourceCandidateIds: find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.
subjectId: No oph/ent subject id exists in the curriculum catalogue (LANE-CARD-Y2-3.md §5) — falls to mul ("Multisystem and emergencies") by the pre-ruled elimination.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
microtopicId: No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.
nanotopicId: No department-level nanotopic subdivision exists below microtopic for this fact.
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for eyelid/lacrimal/orbital-adnexa content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-2E899320D0E411

## label
Thyroid eye disease can occur with hyper-, hypo- or euthyroid states, is managed with antithyroid drugs, radioactive iodine, thyroidectomy or glucocorticoids for the orbital disease — thyroxine (replacement, not treatment) is not itself a TED management line

## canonical_key
thyroid-eye-disease.management-and-thyroid-state

## aliases
Thyroid eye disease management
Euthyroid Graves disease
Glucocorticoids in TED

## arabic_label


## arabic_aliases


## definition
Thyroid eye disease is an autoimmune orbital process that can accompany hyperthyroidism (the commonest association), hypothyroidism, or a euthyroid (normal) thyroid state — its orbital autoimmunity does not require active hyperthyroidism to occur. Management addresses the systemic thyroid disease (antithyroid drugs, radioactive iodine, or thyroidectomy, chosen by the specific hyperthyroid aetiology) and, when the orbital disease itself is active and inflamed, systemic glucocorticoids to control the orbital inflammation directly. Thyroxine (given to correct hypothyroidism) is a replacement therapy for an underactive thyroid, not itself a recognised treatment for the orbital eye disease.

## explicit_objective
State that TED can occur in any thyroid functional state, list its systemic (antithyroid drugs, radioactive iodine, thyroidectomy) and orbital (glucocorticoids) management options, and exclude thyroxine as a TED treatment.

## pitfalls
Assuming TED only occurs with active hyperthyroidism, or listing thyroxine (a replacement therapy) as a treatment for the orbital disease itself.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
mul

## primary_node_id
DIS-OPH-T02

## secondary_node_ids


## topic
Ophthalmology

## subtopic
Eyelid, lacrimal system and orbit

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-PROTECTIVE-2

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
3

## universities
hu

## blueprint_weight
0.4

## exam_weight_by_year
HU_Y3=0.4

## clinical_relevance
0.55

## academic_relevance
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-OPH-TED-MANAGEMENT-AND-THYRO-02

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).

## owner
Helwan Year-3 authoring lane

## reviewer
Medical team, Helwan Ophthalmology faculty

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
moduleIds: HU-ORL-305 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.
resourceIds: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: This module has no video resource distributed yet.
resourceOccurrenceIds: Hand-authored from the ORL-305 Ophthalmology MCQ bank triage (scripts/helwan/extract/HU-ORL-305); no corpus extraction record exists for this concept.
sourceCandidateIds: find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.
subjectId: No oph/ent subject id exists in the curriculum catalogue (LANE-CARD-Y2-3.md §5) — falls to mul ("Multisystem and emergencies") by the pre-ruled elimination.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
microtopicId: No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.
nanotopicId: No department-level nanotopic subdivision exists below microtopic for this fact.
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for eyelid/lacrimal/orbital-adnexa content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node.
reuse: Covers Ch3 Q54 (occurs in any thyroid state), Q59 (glucocorticoid vignette) and Q81 (management-except list) — three angles on TED's relationship to thyroid state and its management.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-DCC627F5A63D7E

## label
Vitamin A deficiency causes night blindness, Bitot spots and keratomalacia — not ophthalmoplegia, which is not a recognised feature

## canonical_key
vitamin-a-deficiency.ocular-features

## aliases
Vitamin A deficiency
Bitot spots
Keratomalacia
Night blindness

## arabic_label


## arabic_aliases


## definition
Vitamin A deficiency's ocular features progress from night blindness (impaired rod-photoreceptor dark adaptation, an early sign) through Bitot spots (foamy, keratinised conjunctival patches from xerosis) to keratomalacia (corneal softening and liquefactive necrosis, a late, sight-threatening stage of xerophthalmia). Ophthalmoplegia (extraocular muscle paralysis) is not a recognised feature of vitamin A deficiency — it instead points to a cranial-nerve, neuromuscular-junction, or orbital-mechanical cause unrelated to vitamin A status.

## explicit_objective
List vitamin A deficiency's ocular features (night blindness, Bitot spots, keratomalacia) in their progressive order, and exclude ophthalmoplegia.

## pitfalls
Including ophthalmoplegia among vitamin A deficiency's ocular features, when it is not a recognised association.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
mul

## primary_node_id
DIS-OPH-T02

## secondary_node_ids


## topic
Ophthalmology

## subtopic
Eyelid, lacrimal system and orbit

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-PROTECTIVE-2

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
3

## universities
hu

## blueprint_weight
0.4

## exam_weight_by_year
HU_Y3=0.4

## clinical_relevance
0.55

## academic_relevance
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-OPH-VITAMIN-ADEFICIENCY-OCUL-02

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).

## owner
Helwan Year-3 authoring lane

## reviewer
Medical team, Helwan Ophthalmology faculty

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
moduleIds: HU-ORL-305 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.
resourceIds: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: This module has no video resource distributed yet.
resourceOccurrenceIds: Hand-authored from the ORL-305 Ophthalmology MCQ bank triage (scripts/helwan/extract/HU-ORL-305); no corpus extraction record exists for this concept.
sourceCandidateIds: find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.
subjectId: No oph/ent subject id exists in the curriculum catalogue (LANE-CARD-Y2-3.md §5) — falls to mul ("Multisystem and emergencies") by the pre-ruled elimination.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
microtopicId: No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.
nanotopicId: No department-level nanotopic subdivision exists below microtopic for this fact.
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for eyelid/lacrimal/orbital-adnexa content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-D9A9147032B556

## label
New colour-vision loss in thyroid eye disease signals compressive optic neuropathy and needs urgent ophthalmology referral; enlarged extraocular muscles (not fat alone) drive the orbital crowding, and dry eye is a recognised feature

## canonical_key
thyroid-eye-disease.optic-neuropathy-urgency

## aliases
TED optic neuropathy
Dysthyroid optic neuropathy
Colour vision in TED

## arabic_label


## arabic_aliases


## definition
Impaired colour vision (particularly red-green desaturation) alongside a relative afferent pupillary defect and reduced acuity in thyroid eye disease signals compressive dysthyroid optic neuropathy, from crowding of the swollen extraocular muscles at the orbital apex compressing the optic nerve — an urgent finding requiring rapid ophthalmology referral, since it can progress to permanent vision loss without timely treatment. The orbital crowding driving both proptosis and this compression is primarily muscle enlargement (inflammatory infiltration and glycosaminoglycan deposition within the extraocular muscles), not fat expansion alone, and CT scanning of the orbit is the principal imaging tool for confirming muscle enlargement and apical crowding. Dry eye is also a recognised feature of thyroid eye disease, from lid retraction and exposure combined with tear-film instability, so it is incorrect to say it never occurs.

## explicit_objective
Recognise colour-vision loss in TED as an urgent sign of compressive optic neuropathy, attribute orbital crowding chiefly to extraocular muscle enlargement (confirmed by CT), and accept dry eye as a genuine TED feature.

## pitfalls
Treating colour-vision change in TED as a minor finding rather than an urgent optic-neuropathy red flag, or claiming dry eye never occurs in TED.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
mul

## primary_node_id
DIS-OPH-T02

## secondary_node_ids


## topic
Ophthalmology

## subtopic
Eyelid, lacrimal system and orbit

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-PROTECTIVE-2

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
3

## universities
hu

## blueprint_weight
0.4

## exam_weight_by_year
HU_Y3=0.4

## clinical_relevance
0.55

## academic_relevance
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-OPH-TED-OPTIC-NEUROPATHY-URG-02

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).

## owner
Helwan Year-3 authoring lane

## reviewer
Medical team, Helwan Ophthalmology faculty

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
moduleIds: HU-ORL-305 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.
resourceIds: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: This module has no video resource distributed yet.
resourceOccurrenceIds: Hand-authored from the ORL-305 Ophthalmology MCQ bank triage (scripts/helwan/extract/HU-ORL-305); no corpus extraction record exists for this concept.
sourceCandidateIds: find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.
subjectId: No oph/ent subject id exists in the curriculum catalogue (LANE-CARD-Y2-3.md §5) — falls to mul ("Multisystem and emergencies") by the pre-ruled elimination.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
microtopicId: No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.
nanotopicId: No department-level nanotopic subdivision exists below microtopic for this fact.
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for eyelid/lacrimal/orbital-adnexa content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-FEEFC9177E46BB

## label
Ptosis with a dilated pupil and a paralytic divergent squint points to third-nerve palsy, needing extraocular-muscle examination, not Horner's syndrome (which spares pupil dilation and causes miosis instead)

## canonical_key
third-nerve-palsy.ptosis-with-diplopia

## aliases
Third nerve palsy
Paralytic divergent squint

## arabic_label


## arabic_aliases


## definition
A patient with ptosis, a dilated (not constricted) pupil, and a paralytic divergent squint (the eye deviated outward and down, from unopposed lateral rectus and superior oblique action) has the classic triad of a complete third-nerve palsy, since the oculomotor nerve supplies the levator, the pupillary constrictor, and all extraocular muscles except lateral rectus and superior oblique. This differs from Horner's syndrome, whose ptosis is mild (Müller's muscle only) and is accompanied by miosis (pupillary constriction), not dilation. A full examination of extraocular-muscle function is essential in any suspected third-nerve palsy, both to confirm the pattern and to help localise the lesion.

## explicit_objective
Recognise ptosis with a dilated pupil and paralytic divergent squint as third-nerve palsy, distinguish it from Horner's syndrome (miosis, not mydriasis), and state that extraocular-muscle examination is essential.

## pitfalls
Diagnosing Horner's syndrome in a patient with pupillary dilation — Horner's causes miosis, the opposite pupillary sign.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
mul

## primary_node_id
DIS-OPH-T02

## secondary_node_ids


## topic
Ophthalmology

## subtopic
Eyelid, lacrimal system and orbit

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-PROTECTIVE-2

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
3

## universities
hu

## blueprint_weight
0.4

## exam_weight_by_year
HU_Y3=0.4

## clinical_relevance
0.55

## academic_relevance
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-OPH-THIRD-NERVE-PALSY-PTOSIS-02

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).

## owner
Helwan Year-3 authoring lane

## reviewer
Medical team, Helwan Ophthalmology faculty

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
moduleIds: HU-ORL-305 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.
resourceIds: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: This module has no video resource distributed yet.
resourceOccurrenceIds: Hand-authored from the ORL-305 Ophthalmology MCQ bank triage (scripts/helwan/extract/HU-ORL-305); no corpus extraction record exists for this concept.
sourceCandidateIds: find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.
subjectId: No oph/ent subject id exists in the curriculum catalogue (LANE-CARD-Y2-3.md §5) — falls to mul ("Multisystem and emergencies") by the pre-ruled elimination.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
microtopicId: No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.
nanotopicId: No department-level nanotopic subdivision exists below microtopic for this fact.
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for eyelid/lacrimal/orbital-adnexa content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-7BD40196681820

## label
Cicatricial ectropion follows skin shortening (from a burn, trauma or scarring) that pulls the lid margin outward, and is treated by skin grafting to release the scar, not horizontal lid-shortening or tarsorrhaphy

## canonical_key
ectropion.cicatricial-subtype-and-treatment

## aliases
Cicatricial ectropion
Skin grafting for ectropion

## arabic_label


## arabic_aliases


## definition
Cicatricial ectropion is outward lid-margin rolling caused specifically by vertical shortening of the anterior lamella (skin), most often from a burn, chronic dermatitis, or a poorly healed laceration near the lid, which pulls the margin away from the globe as the scar contracts. Because the underlying problem is a skin deficit rather than lid laxity, its definitive treatment is a skin graft to release the scar and replace the missing tissue — horizontal lid-shortening (used for involutional ectropion's excess laxity) and lateral tarsorrhaphy (used for lagophthalmos/exposure) treat different mechanisms and do not correct a cicatricial skin deficit.

## explicit_objective
Identify skin shortening (burn, scarring) as the mechanism of cicatricial ectropion and skin grafting as its definitive treatment, distinct from involutional-ectropion or lagophthalmos management.

## pitfalls
Treating cicatricial ectropion with horizontal lid-shortening (correct for involutional ectropion's laxity, not a skin deficit) instead of a skin graft.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
mul

## primary_node_id
DIS-OPH-T02

## secondary_node_ids


## topic
Ophthalmology

## subtopic
Eyelid, lacrimal system and orbit

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-PROTECTIVE-2

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
3

## universities
hu

## blueprint_weight
0.4

## exam_weight_by_year
HU_Y3=0.4

## clinical_relevance
0.55

## academic_relevance
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-OPH-CICATRICIAL-ECTROPION-02

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).

## owner
Helwan Year-3 authoring lane

## reviewer
Medical team, Helwan Ophthalmology faculty

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
moduleIds: HU-ORL-305 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.
resourceIds: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: This module has no video resource distributed yet.
resourceOccurrenceIds: Hand-authored from the ORL-305 Ophthalmology MCQ bank triage (scripts/helwan/extract/HU-ORL-305); no corpus extraction record exists for this concept.
sourceCandidateIds: find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.
subjectId: No oph/ent subject id exists in the curriculum catalogue (LANE-CARD-Y2-3.md §5) — falls to mul ("Multisystem and emergencies") by the pre-ruled elimination.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
microtopicId: No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.
nanotopicId: No department-level nanotopic subdivision exists below microtopic for this fact.
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for eyelid/lacrimal/orbital-adnexa content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node.
reuse: Covers Ch3 Q68 (chemical-burn vignette) and Q86 (treatment fact) — the same cicatricial-ectropion mechanism and its treatment.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-3720BF32BFB032

## label
Lid oedema can be local (insect bite, cosmetic allergy, acute hordeolum) or a sign of systemic (renal or cardiac) disease when bilateral, and can spread from adjacent scalp or facial infection — none of which are exceptions

## canonical_key
eyelid-oedema.differential-diagnosis

## aliases
Lid oedema
Eyelid swelling differential

## arabic_label


## arabic_aliases


## definition
Eyelid oedema has both local and systemic causes: locally, an insect bite, an allergic reaction to a new cosmetic, or an acute hordeolum can all produce lid swelling, and infection or fluid can track into the loose lid tissue from the adjacent scalp or face because the eyelid skin has no deep fascial barrier to stop it. When the oedema is bilateral and otherwise unexplained, an underlying renal or cardiac cause (fluid overload, hypoalbuminaemia) should be considered, since the lid's loose connective tissue is a classic site for early systemic fluid accumulation to become visible.

## explicit_objective
List local (insect bite, cosmetic allergy, hordeolum, adjacent spread) and systemic (renal, cardiac) causes of lid oedema, none of which are true exceptions to a general cause list.

## pitfalls
Claiming that acute hordeolum never causes lid oedema, or that lid oedema cannot spread from adjacent scalp/facial tissue — both are recognised mechanisms.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
mul

## primary_node_id
DIS-OPH-T02

## secondary_node_ids


## topic
Ophthalmology

## subtopic
Eyelid, lacrimal system and orbit

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-PROTECTIVE-2

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
3

## universities
hu

## blueprint_weight
0.4

## exam_weight_by_year
HU_Y3=0.4

## clinical_relevance
0.55

## academic_relevance
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-OPH-LID-EDEMA-DIFFERENTIAL-02

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).

## owner
Helwan Year-3 authoring lane

## reviewer
Medical team, Helwan Ophthalmology faculty

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
moduleIds: HU-ORL-305 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.
resourceIds: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: This module has no video resource distributed yet.
resourceOccurrenceIds: Hand-authored from the ORL-305 Ophthalmology MCQ bank triage (scripts/helwan/extract/HU-ORL-305); no corpus extraction record exists for this concept.
sourceCandidateIds: find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.
subjectId: No oph/ent subject id exists in the curriculum catalogue (LANE-CARD-Y2-3.md §5) — falls to mul ("Multisystem and emergencies") by the pre-ruled elimination.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
microtopicId: No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.
nanotopicId: No department-level nanotopic subdivision exists below microtopic for this fact.
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for eyelid/lacrimal/orbital-adnexa content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-092427B76E883E

## label
Epiphora after a lid laceration and repair near the medial canthus points to punctal or canalicular obstruction/injury from the original trauma, not congenital nasolacrimal duct obstruction

## canonical_key
epiphora.post-traumatic-canalicular-cause

## aliases
Post-traumatic epiphora
Canalicular injury

## arabic_label


## arabic_aliases


## definition
Persistent epiphora developing after a lid wound was repaired at the medial canthus — where the canaliculi and puncti run close to the skin surface — most plausibly reflects direct injury or resulting obstruction of the punctum or canaliculus at the time of the original trauma, rather than a congenital nasolacrimal duct anomaly, which would not newly appear after an adult lid injury. The fluorescein dye disappearance test, watching how quickly instilled dye clears from the tear lake, is a useful adjunct for localising exactly where along the drainage pathway the obstruction lies.

## explicit_objective
Attribute post-traumatic epiphora near the medial canthus to punctal/canalicular injury from the original trauma, not congenital nasolacrimal duct obstruction, and note the fluorescein dye disappearance test's diagnostic role.

## pitfalls
Diagnosing congenital nasolacrimal duct obstruction in a patient whose epiphora only began after an adult lid injury near the medial canthus.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
mul

## primary_node_id
DIS-OPH-T02

## secondary_node_ids


## topic
Ophthalmology

## subtopic
Eyelid, lacrimal system and orbit

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-PROTECTIVE-2

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
3

## universities
hu

## blueprint_weight
0.4

## exam_weight_by_year
HU_Y3=0.4

## clinical_relevance
0.55

## academic_relevance
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-OPH-EPIPHORA-POSTTRAUMATIC-C-02

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).

## owner
Helwan Year-3 authoring lane

## reviewer
Medical team, Helwan Ophthalmology faculty

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
moduleIds: HU-ORL-305 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.
resourceIds: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: This module has no video resource distributed yet.
resourceOccurrenceIds: Hand-authored from the ORL-305 Ophthalmology MCQ bank triage (scripts/helwan/extract/HU-ORL-305); no corpus extraction record exists for this concept.
sourceCandidateIds: find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.
subjectId: No oph/ent subject id exists in the curriculum catalogue (LANE-CARD-Y2-3.md §5) — falls to mul ("Multisystem and emergencies") by the pre-ruled elimination.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
microtopicId: No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.
nanotopicId: No department-level nanotopic subdivision exists below microtopic for this fact.
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for eyelid/lacrimal/orbital-adnexa content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-C21E575B0F35B8

## label
Proptosis is measured with an exophthalmometer; its direction is clinically important and it is broadly classified into inflammatory and neoplastic causes

## canonical_key
proptosis.exophthalmometer-measurement

## aliases
Exophthalmometer
Proptosis measurement
Hertel exophthalmometry

## arabic_label


## arabic_aliases


## definition
Proptosis (forward globe displacement) is quantified with an exophthalmometer (classically the Hertel instrument), which measures the distance from the lateral orbital margin to the corneal apex; normal values are lower than 12-15mm, typically around 12-21mm depending on ethnicity, with degrees above this range or a marked side-to-side asymmetry considered abnormal. The direction of displacement (straight-forward versus displaced to one side) is clinically important, since it narrows the differential — axial proptosis suggests an intraconal lesion (such as thyroid eye disease) while a non-axial displacement suggests an extraconal mass — and causes are broadly grouped into inflammatory (thyroid eye disease, orbital cellulitis, idiopathic orbital inflammation) and neoplastic processes.

## explicit_objective
State that an exophthalmometer measures proptosis, that its direction is clinically informative, and that causes are broadly grouped as inflammatory or neoplastic.

## pitfalls
Dismissing the direction of proptosis as unimportant, when axial versus non-axial displacement helps localise the lesion to within or outside the muscle cone.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
mul

## primary_node_id
DIS-OPH-T02

## secondary_node_ids


## topic
Ophthalmology

## subtopic
Eyelid, lacrimal system and orbit

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-PROTECTIVE-2

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
3

## universities
hu

## blueprint_weight
0.4

## exam_weight_by_year
HU_Y3=0.4

## clinical_relevance
0.55

## academic_relevance
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-OPH-EXOPHTHALMOMETER-PROPTOS-02

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).

## owner
Helwan Year-3 authoring lane

## reviewer
Medical team, Helwan Ophthalmology faculty

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
moduleIds: HU-ORL-305 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.
resourceIds: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: This module has no video resource distributed yet.
resourceOccurrenceIds: Hand-authored from the ORL-305 Ophthalmology MCQ bank triage (scripts/helwan/extract/HU-ORL-305); no corpus extraction record exists for this concept.
sourceCandidateIds: find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.
subjectId: No oph/ent subject id exists in the curriculum catalogue (LANE-CARD-Y2-3.md §5) — falls to mul ("Multisystem and emergencies") by the pre-ruled elimination.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
microtopicId: No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.
nanotopicId: No department-level nanotopic subdivision exists below microtopic for this fact.
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for eyelid/lacrimal/orbital-adnexa content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-01DCB59E3426E8

## label
Proptosis work-up includes orbital CT/MRI, thyroid function tests and biopsy of a suspected tumour — a chest x-ray is not a routine part of the standard orbital work-up

## canonical_key
proptosis.investigations

## aliases
Proptosis investigations
Orbital imaging work-up

## arabic_label


## arabic_aliases


## definition
Investigating proptosis routinely includes orbital CT or MRI to characterise any orbital mass or muscle enlargement, thyroid function tests given how common thyroid eye disease is as a cause, and surgical biopsy when a tumour is suspected and histological diagnosis is needed to guide treatment. A chest x-ray is not part of this standard work-up; it might be added only in a specific clinical context (for example if a primary lung malignancy or systemic granulomatous disease is separately suspected), not as a routine proptosis investigation.

## explicit_objective
List the standard proptosis work-up (orbital CT/MRI, thyroid function tests, biopsy for suspected tumour) and exclude chest x-ray as a routine component.

## pitfalls
Including chest x-ray among the routine proptosis investigations rather than recognising it as a selective addition for a specific separate indication.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
mul

## primary_node_id
DIS-OPH-T02

## secondary_node_ids


## topic
Ophthalmology

## subtopic
Eyelid, lacrimal system and orbit

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-PROTECTIVE-2

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
3

## universities
hu

## blueprint_weight
0.4

## exam_weight_by_year
HU_Y3=0.4

## clinical_relevance
0.55

## academic_relevance
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-OPH-PROPTOSIS-WORKUP-02

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).

## owner
Helwan Year-3 authoring lane

## reviewer
Medical team, Helwan Ophthalmology faculty

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
moduleIds: HU-ORL-305 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.
resourceIds: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: This module has no video resource distributed yet.
resourceOccurrenceIds: Hand-authored from the ORL-305 Ophthalmology MCQ bank triage (scripts/helwan/extract/HU-ORL-305); no corpus extraction record exists for this concept.
sourceCandidateIds: find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.
subjectId: No oph/ent subject id exists in the curriculum catalogue (LANE-CARD-Y2-3.md §5) — falls to mul ("Multisystem and emergencies") by the pre-ruled elimination.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
microtopicId: No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.
nanotopicId: No department-level nanotopic subdivision exists below microtopic for this fact.
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for eyelid/lacrimal/orbital-adnexa content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-8C434E8F58F4E9

## label
Cavernous haemangioma is the commonest benign orbital tumour causing proptosis in adults

## canonical_key
cavernous-haemangioma.commonest-benign-orbital-tumour

## aliases
Cavernous haemangioma
Benign orbital tumour

## arabic_label


## arabic_aliases


## definition
Cavernous haemangioma, a slow-growing, well-encapsulated vascular malformation typically situated within the muscle cone, is the commonest benign orbital tumour causing proptosis in adults, usually presenting in mid-adult life with slowly progressive, painless, axial proptosis. This distinguishes it from meningioma (arising from the optic nerve sheath or sphenoid wing), rhabdomyosarcoma (the commonest primary malignant orbital tumour, but in children, not adults) and lymphoma (a malignant process), none of which share cavernous haemangioma's benign, adult-predominant profile.

## explicit_objective
Identify cavernous haemangioma as the commonest benign orbital tumour causing proptosis in adults, distinct from meningioma, rhabdomyosarcoma (childhood malignancy) and lymphoma.

## pitfalls
Confusing cavernous haemangioma (commonest benign orbital tumour, adults) with rhabdomyosarcoma (commonest primary malignant orbital tumour, children).

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
mul

## primary_node_id
DIS-OPH-T02

## secondary_node_ids


## topic
Ophthalmology

## subtopic
Eyelid, lacrimal system and orbit

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-PROTECTIVE-2

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
3

## universities
hu

## blueprint_weight
0.4

## exam_weight_by_year
HU_Y3=0.4

## clinical_relevance
0.55

## academic_relevance
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-OPH-CAVERNOUS-HEMANGIOMA-ORB-02

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).

## owner
Helwan Year-3 authoring lane

## reviewer
Medical team, Helwan Ophthalmology faculty

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
moduleIds: HU-ORL-305 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.
resourceIds: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: This module has no video resource distributed yet.
resourceOccurrenceIds: Hand-authored from the ORL-305 Ophthalmology MCQ bank triage (scripts/helwan/extract/HU-ORL-305); no corpus extraction record exists for this concept.
sourceCandidateIds: find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.
subjectId: No oph/ent subject id exists in the curriculum catalogue (LANE-CARD-Y2-3.md §5) — falls to mul ("Multisystem and emergencies") by the pre-ruled elimination.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
microtopicId: No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.
nanotopicId: No department-level nanotopic subdivision exists below microtopic for this fact.
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for eyelid/lacrimal/orbital-adnexa content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node.
relatedNotMerged: docs/Kasr-Source-Imports/concept CON-DER-857E1742C81C3F (cavernous hemangioma) covers its histology (irregular wide flat-endothelial-lined vascular spaces) — a different fact (histological structure vs orbital-tumour epidemiology) from what this cluster's Ch3 Q82 tests; not a merge candidate.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-C5ADCFA4A5648B

## label
The facial nerve, supplying orbicularis oculi, closes the lid; the oculomotor nerve, supplying the levator, opens it — the two are not interchangeable

## canonical_key
eyelid-closure.orbicularis-facial-nerve-innervation

## aliases
Orbicularis oculi innervation
Levator palpebrae innervation
Eyelid closure/opening muscles

## arabic_label


## arabic_aliases


## definition
Eyelid closure is performed by orbicularis oculi, innervated by the facial (7th cranial) nerve; eyelid opening (elevation) is instead performed by levator palpebrae superioris, innervated by the oculomotor (3rd cranial) nerve — the two muscles and their nerve supplies are opposite and non-interchangeable. This is why facial nerve palsy causes lagophthalmos (closure failure), while oculomotor nerve palsy causes ptosis (opening failure), and why the oculomotor nerve does not supply orbicularis oculi despite both muscles acting on the same eyelid.

## explicit_objective
State that the facial nerve (via orbicularis oculi) closes the lid and the oculomotor nerve (via the levator) opens it, and that neither nerve substitutes for the other's muscle.

## pitfalls
Assigning orbicularis oculi's lid-closing action to the oculomotor nerve, or the levator's lid-opening action to the facial nerve.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
mul

## primary_node_id
DIS-OPH-T02

## secondary_node_ids


## topic
Ophthalmology

## subtopic
Eyelid, lacrimal system and orbit

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-PROTECTIVE-2

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
3

## universities
hu

## blueprint_weight
0.4

## exam_weight_by_year
HU_Y3=0.4

## clinical_relevance
0.55

## academic_relevance
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-OPH-LID-CLOSURE-MUSCLE-INNER-02

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).

## owner
Helwan Year-3 authoring lane

## reviewer
Medical team, Helwan Ophthalmology faculty

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
moduleIds: HU-ORL-305 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.
resourceIds: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: This module has no video resource distributed yet.
resourceOccurrenceIds: Hand-authored from the ORL-305 Ophthalmology MCQ bank triage (scripts/helwan/extract/HU-ORL-305); no corpus extraction record exists for this concept.
sourceCandidateIds: find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.
subjectId: No oph/ent subject id exists in the curriculum catalogue (LANE-CARD-Y2-3.md §5) — falls to mul ("Multisystem and emergencies") by the pre-ruled elimination.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
microtopicId: No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.
nanotopicId: No department-level nanotopic subdivision exists below microtopic for this fact.
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for eyelid/lacrimal/orbital-adnexa content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-F538A2F20525FE

## label
Congenital ptosis is not treated as early as possible in every case; severe unilateral ptosis risks amblyopia, resection needs poor levator action, and frontalis suspension is reserved for severe (not mild) cases

## canonical_key
congenital-ptosis.management-timing-and-amblyopia-risk

## aliases
Congenital ptosis management timing
Ptosis and amblyopia

## arabic_label


## arabic_aliases


## definition
Congenital ptosis surgery is timed by severity rather than performed as early as possible in every case: mild-to-moderate ptosis is typically deferred until a child is old enough for a stable, cooperative procedure, while severe unilateral ptosis that occludes the visual axis needs earlier intervention because it risks deprivation amblyopia in the affected eye. Frontalis suspension, harnessing the frontalis muscle when levator function is absent, is reserved for severe cases, not mild ones (where simple levator surgery, if any is needed yet, suffices); levator resection remains the choice specifically when levator action is poor but present, not when it is good.

## explicit_objective
State that congenital ptosis timing depends on severity (not "as early as possible" universally), that severe unilateral cases risk amblyopia, and that frontalis suspension is for severe, not mild, cases.

## pitfalls
Assuming every congenital ptosis case is treated at the earliest possible age, or that frontalis suspension is a mild-case procedure.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
mul

## primary_node_id
DIS-OPH-T02

## secondary_node_ids


## topic
Ophthalmology

## subtopic
Eyelid, lacrimal system and orbit

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-PROTECTIVE-2

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
3

## universities
hu

## blueprint_weight
0.4

## exam_weight_by_year
HU_Y3=0.4

## clinical_relevance
0.55

## academic_relevance
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-OPH-CONGENITAL-PTOSIS-MANAGE-02

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).

## owner
Helwan Year-3 authoring lane

## reviewer
Medical team, Helwan Ophthalmology faculty

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
moduleIds: HU-ORL-305 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.
resourceIds: Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: This module has no video resource distributed yet.
resourceOccurrenceIds: Hand-authored from the ORL-305 Ophthalmology MCQ bank triage (scripts/helwan/extract/HU-ORL-305); no corpus extraction record exists for this concept.
sourceCandidateIds: find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.
subjectId: No oph/ent subject id exists in the curriculum catalogue (LANE-CARD-Y2-3.md §5) — falls to mul ("Multisystem and emergencies") by the pre-ruled elimination.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
microtopicId: No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.
nanotopicId: No department-level nanotopic subdivision exists below microtopic for this fact.
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for eyelid/lacrimal/orbital-adnexa content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

