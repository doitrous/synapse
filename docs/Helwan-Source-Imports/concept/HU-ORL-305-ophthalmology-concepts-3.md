<!--
  HU-ORL-305 Ophthalmology lane-3 cluster: Chapter 4 ("Normal and abnormal
  image capture"), all 91 bank items — fully joined per
  coverage/HU-ORL-305-triage.md's join table (91 keyed, 0 unjoined).
  34 new concepts, minted OPH-system (CON-OPH-* is the
  established ophthalmology reuse family, continuing lanes 1-2). No oph/ent
  subject id exists in the curriculum catalogue (LANE-CARD-Y2-3.md §5) —
  every concept below carries subject 'mul' by the pre-ruled elimination.
  Search performed via find-existing.mjs (plus a docs/*/concept|pending-live
  grep) before every mint — see HU-ORL-305-ophthalmology-data-3.mjs's header
  note for the full search-result summary, including the one real
  near-duplicate found (CON-NEU-3FF95D30CD5825, Alexandria's pending
  corneal-transparency concept, already overlaid by lane-1) and why it is
  NOT reused a second time this pass (reusing it would reproduce a
  confirmed, live validate-content-batch.mjs "not covered by any article in
  library_ids" error already present in lane-1's committed Ch1 Q8/Q9/Q12 —
  flagged separately, out of this lane's Chapter-4 scope).
-->

# Item

## id
CON-OPH-2667731A438328

## label
Astigmatism is classified by the refractive state of its two principal meridians as simple, compound or mixed, and "regular" astigmatism means those meridians are perpendicular

## canonical_key
astigmatism.classification-types

## aliases
Simple astigmatism
Compound astigmatism
Mixed astigmatism
Regular astigmatism

## arabic_label


## arabic_aliases


## definition
Astigmatism is graded by comparing the refractive state of its two principal meridians. Simple astigmatism has one meridian emmetropic and the other myopic (simple myopic) or hyperopic (simple hypermetropic); compound astigmatism has both meridians ametropic in the same direction (both myopic or both hyperopic) to different degrees; mixed astigmatism has one meridian myopic and the other hyperopic. Regular astigmatism additionally requires the two principal meridians to be perpendicular to one another (90 degrees apart), which is what allows a single cylindrical lens to correct it; irregular astigmatism lacks this perpendicular relationship and is not correctable by spectacle cylinders alone.

## explicit_objective
Classify astigmatism as simple, compound or mixed from the refractive state of its two principal meridians, and define regular astigmatism by their perpendicularity.

## pitfalls
Confusing compound astigmatism (both meridians ametropic, same direction) with mixed astigmatism (one myopic, one hyperopic), or assuming any astigmatism is "regular" without checking that its axes are perpendicular.

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
Refractive errors and optics

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-IMGCAP-REFRACTION

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
CLM-OPH-ASTIGMATISM-CLASSIFICATI-01

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
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for refraction/optics, cataract, keratoconus, corneal disease or lens-subluxation content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node, since cornea and lens are anterior-segment structures.
reuse: Covers Ch4 Q1 (minus-cylinder prescription -> simple myopic astigmatism), Q22 (regular astigmatism definition) and Q47 (mixed astigmatism from cycloplegic refraction) — three angles on the same classification scheme.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-0CC5883B241488

## label
Astigmatism is diagnosed by retinoscopy, keratometry, corneal topography or the astigmatic fan, and corrected with cylindrical lenses

## canonical_key
astigmatism.diagnosis-and-correction

## aliases
Astigmatism diagnosis
Astigmatic fan
Cylindrical lens correction
Keratometry

## arabic_label


## arabic_aliases


## definition
Astigmatism can be diagnosed by several complementary methods: retinoscopy and keratometry both detect the difference in refractive power between meridians, corneal topography maps the whole corneal surface for finer irregular-astigmatism detail, and the astigmatic fan (a subjective dial chart) asks the patient which spoke appears sharpest. Whichever tool confirms it, regular astigmatism's standard correction is a cylindrical lens (alone, for pure astigmatism, or combined with a spherical lens as a sphero-cylindrical prescription when a spherical error coexists) — the simplest and most direct correction available. Cylindrical lenses correct astigmatism specifically; they are not the standard correction for pure myopia, hypermetropia or presbyopia, which use spherical (or, for presbyopia, reading-addition) lenses instead.

## explicit_objective
List the diagnostic tools for astigmatism (retinoscopy, keratometry, corneal topography, astigmatic fan) and identify cylindrical lenses as its standard correction.

## pitfalls
Prescribing a purely spherical lens for astigmatism, or naming a diagnostic tool (like the astigmatic fan) as if it were also a treatment.

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
Refractive errors and optics

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-IMGCAP-REFRACTION

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
CLM-OPH-ASTIGMATISM-DIAGNOSIS-AN-01

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
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for refraction/optics, cataract, keratoconus, corneal disease or lens-subluxation content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node, since cornea and lens are anterior-segment structures.
reuse: Covers Ch4 Q7 (simplest treatment), Q37 (diagnostic tools, "all of the above"), Q49 (cylindrical lenses prescribed for astigmatism, among distractor conditions), and Q54 and Q74 (a clinical vignette and a direct-recall item both applying diagnosis-then-cylindrical-correction) — one diagnosis-and-correction fact tested five ways.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-9942C6749BD281

## label
Emmetropia focuses parallel rays on the retina and myopia focuses them in front of it; myopia is often familial and presents with squeezing the eyes for a pinhole effect; anisometropia is a between-eye refractive difference, distinct from ametropia and anisokonia

## canonical_key
refraction.basic-terminology-and-myopia-presentation

## aliases
Emmetropia
Myopia image formation
Anisometropia
Ametropia
Anisokonia

## arabic_label


## arabic_aliases


## definition
With accommodation fully relaxed, an emmetropic eye focuses parallel light rays exactly on the retina, while a myopic eye's excessive refractive power (or long axial length) focuses those same parallel rays in front of the retina, producing blur that squeezing the eyelids can partly correct through a pinhole effect. Childhood myopia commonly runs in families and often first presents as difficulty seeing the board at school. Precise refractive terminology also matters: ametropia is any refractive error in general, anisometropia is specifically a significant difference in refractive error between the two eyes, and anisokonia is the resulting difference in retinal image size between the two eyes that anisometropia (or unequal correction, such as unilateral aphakia) can cause — asthenopia, by contrast, is eye strain, not a refractive-error term at all.

## explicit_objective
State where emmetropia and myopia focus parallel rays, recognise myopia's familial, pinhole-seeking childhood presentation, and distinguish ametropia (any refractive error), anisometropia (between-eye difference) and anisokonia (resulting image-size difference).

## pitfalls
Mixing up anisometropia (the refractive difference) with anisokonia (the image-size consequence), or calling asthenopia (eye strain) a refractive-error term.

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
Refractive errors and optics

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-IMGCAP-REFRACTION

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
CLM-OPH-BASIC-REFRACTION-AND-MYO-01

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
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for refraction/optics, cataract, keratoconus, corneal disease or lens-subluxation content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node, since cornea and lens are anterior-segment structures.
reuse: Covers Ch4 Q13 (myopic focus point), Q52 (familial, pinhole-seeking childhood myopia vignette), Q73 (ametropia/anisometropia/anisokonia/asthenopia terminology) and Q78 (emmetropic focus point) — basic image-formation vocabulary tested four ways.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-F36B214CB77A03

## label
Myopia is corrected with concave (minus/diverging) lenses, which diverge light before it enters the eye so it focuses further back, onto the retina

## canonical_key
myopia.correction-with-concave-lenses

## aliases
Myopia correction
Concave lens
Minus lens

## arabic_label


## arabic_aliases


## definition
Because a myopic eye focuses parallel rays in front of the retina, correction needs a lens that diverges incoming light before it reaches the eye, pushing the focal point back onto the retina — a concave (minus-powered) lens does exactly this. A convex (plus-powered) lens would converge light further, worsening a myopic eye's already-excessive convergence, and is instead the correction for hypermetropia. Myopia is not corrected with cylindrical lenses (those correct astigmatism) unless astigmatism happens to coexist with it.

## explicit_objective
State that myopia is corrected with concave (minus) lenses, which diverge light so it focuses further back on the retina, and exclude convex/cylindrical lenses as the correction for pure myopia.

## pitfalls
Confusing concave (myopia, diverging) with convex (hypermetropia, converging) lens correction.

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
Refractive errors and optics

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-IMGCAP-REFRACTION

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
CLM-OPH-MYOPIA-CORRECTION-PRINCI-01

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
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for refraction/optics, cataract, keratoconus, corneal disease or lens-subluxation content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node, since cornea and lens are anterior-segment structures.
reuse: Covers Ch4 Q30 (myopia definition and correction) and Q42 (correction method, among distractor lens types) — the same correction fact tested twice.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-D91817A95C4827

## label
High/pathological myopia predisposes to retinal detachment, macular hole, lacquer cracks, chorioretinal degeneration and choroidal neovascular membrane, but not to choroidal folds or optic-disc cupping, and its retinal complications are not easy to detect clinically

## canonical_key
high-myopia.retinal-complications

## aliases
Pathological myopia
High myopia complications
Lacquer cracks
Myopic chorioretinal degeneration

## arabic_label


## arabic_aliases


## definition
The elongated globe of high (pathological) myopia stretches and thins the posterior retina and choroid, predisposing to retinal breaks and detachment, macular hole, lacquer cracks (breaks in Bruch's membrane), tigroid fundus and chorioretinal degeneration, and — through Bruch's-membrane breaks — choroidal neovascular membrane formation with its own bleeding risk. Choroidal folds and optic-disc cupping are not features of pathological myopia: folds are instead linked to hypotony, orbital or choroidal masses and thyroid eye disease, and disc cupping is the sign of glaucomatous, not myopic, optic-nerve damage. Retinal complications of high myopia are also not easy to diagnose clinically in every case — some, such as early neovascular membrane or peripheral lattice degeneration, need dilated fundus examination or imaging to detect, and open-angle glaucoma coexisting with high myopia is notoriously difficult to diagnose because a myopic disc can itself look unusual.

## explicit_objective
List the genuine retinal complications of high/pathological myopia (retinal detachment, macular hole, lacquer cracks, chorioretinal degeneration, choroidal neovascular membrane) and exclude choroidal folds and optic-disc cupping.

## pitfalls
Attributing choroidal folds or optic-disc cupping to high myopia, or assuming its retinal and glaucomatous complications are always straightforward to detect on routine examination.

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
Refractive errors and optics

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-IMGCAP-REFRACTION

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
CLM-OPH-HIGH-MYOPIA-RETINAL-COMP-01

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
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for refraction/optics, cataract, keratoconus, corneal disease or lens-subluxation content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node, since cornea and lens are anterior-segment structures.
reuse: Covers Ch4 Q21, Q41, Q69 and Q70 (four EXCEPT-format lists of high-myopia retinal complications) and Q53 (a high-myopia vignette applying the same complication list and excluding the "easy to diagnose" glaucoma distractor) — one complication list tested five ways.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-706B638E1403BA

## label
Keratoconus's clinical signs are Vogt striae, Munson sign (on downgaze) and, in acute hydrops, corneal oedema and acute hydrops itself; Kayser-Fleischer and Haab's striae belong to other diseases, not keratoconus

## canonical_key
keratoconus.clinical-signs

## aliases
Vogt striae
Munson sign
Acute hydrops
Kayser-Fleischer ring

## arabic_label


## arabic_aliases


## definition
Keratoconus shows several characteristic signs: Vogt striae (fine vertical stress lines deep in the stroma, disappearing with globe pressure), Munson sign (a V-shaped indentation of the lower lid margin on downgaze, from the cone-shaped cornea), and, when the disease is advanced, acute hydrops (sudden stromal oedema from a break in Descemet's membrane). Two similarly-named signs from other diseases are frequently confused with these: the Kayser-Fleischer ring is a copper-deposition sign of Wilson's disease, not keratoconus, and Haab's striae are horizontal breaks in Descemet's membrane from congenital glaucoma's stretched cornea, not keratoconus's vertical Vogt striae. Keratoconus is a progressive disease of young age, not old age, which further separates it from age-related corneal and lenticular conditions that share some overlapping signs.

## explicit_objective
Identify Vogt striae, Munson sign and acute hydrops as genuine keratoconus signs, and exclude the Kayser-Fleischer ring (Wilson's disease) and Haab's striae (congenital glaucoma).

## pitfalls
Attributing the Kayser-Fleischer ring or Haab's striae to keratoconus because their names or corneal location sound similar to genuine keratoconus signs.

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
Keratoconus

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-IMGCAP-REFRACTION

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
CLM-OPH-KERATOCONUS-SIGNS-AND-EX-01

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
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for refraction/optics, cataract, keratoconus, corneal disease or lens-subluxation content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node, since cornea and lens are anterior-segment structures.
reuse: Covers Ch4 Q2 and Q45 (both EXCEPT-format lists excluding the Kayser-Fleischer ring), Q81 (Munson sign present, Haab's striae excluded), Q82 (acute hydrops may occur) and Q83 (Vogt striae as the characteristic sign, among Haab's-striae-style distractors) — the same sign list tested five ways.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-83F480D1C358B9

## label
Keratoconus is a progressive, usually bilateral, conical corneal thinning and protrusion of childhood/young-adult onset, causing progressively increasing myopia and irregular (not hyperopic) myopic astigmatism, diagnosable by corneal topography

## canonical_key
keratoconus.refraction-and-progression

## aliases
Keratoconus progression
Keratoconus refraction
Myopic astigmatism in keratoconus

## arabic_label


## arabic_aliases


## definition
Keratoconus is conical thinning and forward protrusion of the central/paracentral cornea, a progressive disease that characteristically begins in childhood or young adulthood (not old age) and is confirmed by corneal topography's asymmetric, inferiorly-steep pattern. As the cornea steepens and thins irregularly, refraction shifts toward progressively increasing myopia with irregular (high, myopic) astigmatism — not hypermetropia, which keratoconus does not cause. Visual impairment in keratoconus therefore comes from myopia, corneal opacity (in advanced scarring) and irregular astigmatism, but not from hyperopia.

## explicit_objective
State keratoconus's typical onset (young age, not old age), its progressive myopic-astigmatism refractive shift (not hyperopia), and corneal topography's diagnostic role.

## pitfalls
Believing keratoconus presents in old age or shifts refraction toward hyperopia, when it is a young-onset, progressively myopic-astigmatic disease.

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
Keratoconus

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-IMGCAP-REFRACTION

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
CLM-OPH-KERATOCONUS-REFRACTION-A-01

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
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for refraction/optics, cataract, keratoconus, corneal disease or lens-subluxation content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node, since cornea and lens are anterior-segment structures.
reuse: Covers Ch4 Q4 (irregular astigmatism as the characteristic error), Q24 (WRONG-answer format on old-age onset), Q34 (visual-impairment causes excluding hyperopia) and Q84 (myopic astigmatism as the most expected refraction) — one progression/refraction fact tested four ways.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-E4472272008EB2

## label
Keratoconus is diagnosed by Placido disc, corneal topography, retinoscopy (scissoring reflex), auto-refractometry and slit lamp — not indirect ophthalmoscopy or ultrasonography — and is managed with contact lenses, corneal collagen cross-linking, and keratoplasty for advanced disease

## canonical_key
keratoconus.diagnosis-and-management

## aliases
Placido disc
Corneal collagen cross-linking
Scissoring reflex
Keratoconus contact lenses

## arabic_label


## arabic_aliases


## definition
Keratoconus is diagnosed with anterior-segment tools that image or reflect off the corneal surface and its refractive effect: the Placido disc (projecting concentric rings distorted by the irregular cornea), corneal topography, auto-refractometry, slit-lamp biomicroscopy, and retinoscopy, which in keratoconus classically shows a scissoring reflex from the cornea's irregular astigmatism. Indirect ophthalmoscopy (a posterior-segment/retinal examination technique) and ultrasonography play no diagnostic role here. Management is staged by severity: rigid or soft contact lenses correct vision in early-to-moderate disease, corneal collagen cross-linking halts progression by stiffening the stroma, and keratoplasty (lamellar or penetrating) is reserved for advanced disease or acute hydrops with corneal decompensation — keratoplasty is used in keratoconus management, not never, contrary to a common distractor claim.

## explicit_objective
List keratoconus's genuine diagnostic tools (Placido disc, topography, retinoscopy's scissoring reflex, slit lamp, auto-refractometry), exclude indirect ophthalmoscopy and ultrasonography, and state its staged management (contact lenses, cross-linking, keratoplasty for advanced disease).

## pitfalls
Naming indirect ophthalmoscopy as a keratoconus diagnostic tool (it examines the retina, not the cornea), or claiming keratoplasty is never used in keratoconus management.

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
Keratoconus

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-IMGCAP-REFRACTION

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
CLM-OPH-KERATOCONUS-DIAGNOSIS-AN-01

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
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for refraction/optics, cataract, keratoconus, corneal disease or lens-subluxation content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node, since cornea and lens are anterior-segment structures.
reuse: Covers Ch4 Q8 (astigmatism-causing, not drop-treated, not ultrasound-diagnosed), Q43 (5-option diagnostic-tool list), Q61 and Q62 (two acute-presentation vignettes covering scissoring reflex, cross-linking and keratoplasty) and Q79 (EXCEPT-format diagnostic-tool list excluding indirect ophthalmoscopy) — diagnosis and management tested five ways.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-9F5B9FE500FFA6

## label
Hypermetropia is a refractive system weaker than the emmetrope's, corrected with convex (plus/converging) lenses

## canonical_key
hypermetropia.definition-and-correction

## aliases
Hypermetropia definition
Convex lens correction
Hyperopia

## arabic_label


## arabic_aliases


## definition
Hypermetropia (hyperopia) means the eye's refractive system is weaker than an emmetropic eye's — from a shorter axial length, a flatter cornea, or a weaker crystalline lens — so parallel light rays would focus behind the retina without extra convergence. Correction adds convergent power with a convex (plus-powered) lens, which brings the focal point forward onto the retina; a reading addition (a further plus lens for near work) is used for presbyopic near correction on top of any distance hypermetropic correction.

## explicit_objective
State that hypermetropia is a weaker-than-emmetropic refractive system, corrected with convex (plus) lenses.

## pitfalls
Confusing hypermetropia (weaker system, convex/plus correction) with myopia (stronger system, concave/minus correction).

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
Refractive errors and optics

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-IMGCAP-REFRACTION

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
CLM-OPH-HYPERMETROPIA-DEFINITION-01

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
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for refraction/optics, cataract, keratoconus, corneal disease or lens-subluxation content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node, since cornea and lens are anterior-segment structures.
reuse: Covers Ch4 Q5 (definition) and Q14 (correction method, among distractor lens types) — the same fact tested twice.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-415440DA250F17

## label
Hypermetropia's hallmark complication is angle closure glaucoma, from a shallow anterior chamber and narrow angle; iridocyclitis and exotropia are not hypermetropia associations, and choroidal neovascular membrane and posterior staphyloma instead belong to high myopia, not hypermetropia

## canonical_key
hypermetropia.complications-and-angle-closure-risk

## aliases
Hypermetropia and angle closure glaucoma
Hypermetropia complications
Shallow anterior chamber

## arabic_label


## arabic_aliases


## definition
The short axial length typical of hypermetropia crowds the anterior segment, producing a shallow anterior chamber and narrow angle that predispose to angle closure glaucoma — a hypermetropic patient presenting with headache, blurred near vision and eye strain during close work, with a shallow chamber and narrow angle on examination, is at risk for this even before any acute attack; this is hypermetropia's hallmark recognised complication. Iridocyclitis is not an established hypermetropia association, and exotropia is the wrong-direction squint: uncorrected childhood hypermetropia instead predisposes to convergent squint (accommodative esotropia) from excess accommodative convergence, not exotropia. Choroidal neovascular membrane and posterior staphyloma are complications of high (pathological) myopia's stretched, elongated globe, not of hypermetropia's short, crowded one; correction throughout is with convex, not concave, lenses.

## explicit_objective
State that hypermetropia's hallmark complication is angle closure glaucoma (shallow chamber, narrow angle), and exclude iridocyclitis, exotropia, choroidal neovascular membrane, posterior staphyloma and concave-lens correction, none of which are hypermetropia features.

## pitfalls
Naming exotropia as a hypermetropia association (esotropia is correct), attributing choroidal neovascular membrane or posterior staphyloma to hypermetropia (they are high-myopia complications), or missing the shallow-chamber angle closure glaucoma link.

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
Refractive errors and optics

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-IMGCAP-REFRACTION

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
CLM-OPH-HYPERMETROPIA-COMPLICATI-01

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
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for refraction/optics, cataract, keratoconus, corneal disease or lens-subluxation content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node, since cornea and lens are anterior-segment structures.
reuse: Covers Ch4 Q48 (5-option complications list, only angle closure glaucoma keyed true), Q50 (a shallow-chamber/narrow-angle vignette applying the angle closure glaucoma link) and Q75 (direct-recall item repeating the angle closure predisposition and excluding concave-lens correction and exophoria) — one complications fact tested three ways.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-F54381DF4D4BD2

## label
Accommodation increases the eye's refractive power via ciliary-muscle contraction (parasympathetic, not sympathetic), declines with age, and is lost in third nerve palsy, presbyopia and after parasympatholytic (cycloplegic) eye drops — not in hypermetropia itself

## canonical_key
accommodation.physiology-and-loss-causes

## aliases
Accommodation physiology
Ciliary muscle contraction
Cycloplegic drops
Parasympathetic accommodation

## arabic_label


## arabic_aliases


## definition
Accommodation increases the eye's refractive power for near vision through contraction (not relaxation) of the ciliary muscle, which slackens the zonules and lets the elastic lens round up; this contraction is driven by parasympathetic, not sympathetic, innervation, and accommodative amplitude declines physiologically with age. Recognised causes of lost accommodation include third nerve palsy (which carries the parasympathetic supply to the ciliary muscle), presbyopia (age-related lens stiffening and reduced ciliary efficiency), and pharmacological cycloplegia from parasympatholytic drops such as tropicamide, which paralyse the ciliary muscle. Hypermetropia itself is a refractive-power deficit, not a cause of lost accommodation — a hypermetropic eye still accommodates normally (indeed, it may accommodate even for distance to compensate).

## explicit_objective
State that accommodation is a parasympathetically-driven ciliary-muscle contraction that increases refractive power and declines with age, and list its genuine loss causes (third nerve palsy, presbyopia, cycloplegic drops) while excluding hypermetropia.

## pitfalls
Believing the ciliary muscle relaxes during accommodation (it contracts) or that sympathetic tone drives it (parasympathetic does), or naming hypermetropia as a cause of lost accommodation.

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
Refractive errors and optics

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-IMGCAP-REFRACTION

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
CLM-OPH-ACCOMMODATION-PHYSIOLOGY-01

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
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for refraction/optics, cataract, keratoconus, corneal disease or lens-subluxation content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node, since cornea and lens are anterior-segment structures.
reuse: Covers Ch4 Q40 ("loss found in", inclusive list), Q71 (EXCEPT-format list excluding hypermetropia) and Q77 (direct-recall item on the mechanism: contraction, parasympathetic, decreases with age) — one accommodation-physiology fact tested three ways.
relatedNotMerged: find-existing.mjs surfaced several Kasr/Assiut pharmacology-angle "accommodation" concepts (muscarinic stimulation causing spasm of accommodation, antimuscarinic cycloplegia) — a different subject (autonomic pharmacology) and module from this chapter's physiological-mechanism-of-loss facts; related, not merged.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-34DA0EA759A275

## label
Presbyopia is the age-related recession of the near point from weakened accommodation, causing difficulty with near work (not distance vision), corrected with convex reading lenses, not concave lenses

## canonical_key
presbyopia.mechanism-and-treatment

## aliases
Presbyopia
Near point recession
Reading addition

## arabic_label


## arabic_aliases


## definition
Presbyopia is the physiological, age-related weakening of the eye's ability to accommodate, which recedes the near point (the closest distance at which clear focus is still possible) until near tasks such as reading or sewing become uncomfortable, typically from the mid-40s onward even in a previously emmetropic person with normal distance vision. It causes difficulty specifically with near/reading vision, not with distance vision, and is corrected with a convex (plus-powered) reading addition, never a concave lens, which would only worsen near focus. An emmetropic patient who never needed glasses before, now struggling only with small print and close work while distance vision remains 6/6, is a textbook presbyopia presentation, not hypermetropia (which would also blur some distance vision, at least once accommodative reserve is exhausted).

## explicit_objective
State that presbyopia is age-related near-point recession from weakened accommodation, causing near-vision difficulty corrected with convex reading lenses, and exclude concave-lens correction.

## pitfalls
Prescribing concave lenses for presbyopia (convex is correct), or mistaking a presbyopic near-vision complaint for hypermetropia when distance vision is preserved.

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
Refractive errors and optics

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-IMGCAP-REFRACTION

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
CLM-OPH-PRESBYOPIA-MECHANISM-AND-01

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
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for refraction/optics, cataract, keratoconus, corneal disease or lens-subluxation content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node, since cornea and lens are anterior-segment structures.
reuse: Covers Ch4 Q6 (difficulty reading), Q38 (near-point-recession definition) and Q55 (a 45-year-old emmetropic-patient vignette distinguishing presbyopia from hypermetropia) — one presbyopia fact tested three ways.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-3270270FBEE32C

## label
Uncorrected childhood hypermetropia drives excess accommodative convergence, causing convergent (not divergent) squint and accommodative asthenopia, treated with convex-lens correction

## canonical_key
hypermetropia.childhood-esotropia-and-accommodative-asthenopia

## aliases
Accommodative esotropia
Accommodative asthenopia
Childhood hypermetropia

## arabic_label


## arabic_aliases


## definition
A hypermetropic child must accommodate even for distance to keep images clear, and because accommodation and convergence are neurologically linked, this excess accommodative effort drives excess convergence — producing convergent squint (accommodative esotropia), not divergent squint, and eye strain (accommodative asthenopia) from the sustained ciliary effort, especially during near work such as reading or using a phone. Correcting the underlying hypermetropia with convex lenses relieves the need for excess accommodation, treating both the esotropia and the asthenopia at their source.

## explicit_objective
Explain why uncorrected childhood hypermetropia causes convergent squint and accommodative asthenopia via excess accommodative convergence, and state that convex-lens correction treats both.

## pitfalls
Expecting divergent squint from hypermetropia (excess accommodative convergence causes convergent squint, not divergent).

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
Refractive errors and optics

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-IMGCAP-REFRACTION

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
CLM-OPH-HYPERMETROPIC-CHILD-SQUI-01

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
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for refraction/optics, cataract, keratoconus, corneal disease or lens-subluxation content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node, since cornea and lens are anterior-segment structures.
reuse: Covers Ch4 Q51 (a convergent-squint, accommodative-asthenopia child vignette).
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-03019DA9E6517B

## label
Aphakia (absence of the crystalline lens) leaves the eye markedly hypermetropic with parallel rays focused behind the retina; unilateral aphakia is best corrected with secondary intraocular lens implantation, since spectacle correction causes anisokonia

## canonical_key
aphakia.optics-and-correction

## aliases
Aphakia
Unilateral aphakia correction
Aphakic anisokonia

## arabic_label


## arabic_aliases


## definition
Aphakia — the absence of the crystalline lens, whether after cataract extraction without an intraocular lens or from trauma — removes a major converging element of the eye's optical system, so accommodation is entirely lost (not in excess) and parallel rays focus well behind the retina, producing marked hypermetropia; patients see poorly for both distance and near without optical correction. When aphakia is unilateral, correcting it with spectacles alone magnifies the aphakic eye's retinal image by roughly 25-30%, producing anisokonia (unequal image size between the eyes) that the brain often cannot fuse; secondary intraocular lens implantation is the best management option, restoring optical power from within the eye and avoiding this magnification difference, while a contact lens (sitting close to the cornea, so producing far less image-size disparity than spectacles) is a reasonable non-surgical alternative when surgery is not immediately possible.

## explicit_objective
State that aphakia causes marked hypermetropia with rays focused behind the retina and lost (not excess) accommodation, and that unilateral aphakia is best corrected with intraocular lens implantation rather than spectacles, to avoid anisokonia.

## pitfalls
Believing aphakia causes myopia rather than hypermetropia, or that spectacle correction is an acceptable first choice for unilateral aphakia despite its anisokonia risk.

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
Refractive errors and optics

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-IMGCAP-REFRACTION

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
CLM-OPH-APHAKIA-OPTICS-AND-CORRE-01

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
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for refraction/optics, cataract, keratoconus, corneal disease or lens-subluxation content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node, since cornea and lens are anterior-segment structures.
reuse: Covers Ch4 Q32 (best correction of unilateral aphakic anisometropia -> IOL implantation), Q36 (spectacle correction of unilateral aphakia causing anisokonia) and Q76 (aphakia's optical consequences: focus point, accommodation, near vision) — one aphakia-optics fact tested three ways.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-0595E4130F5E5C

## label
Early senile nuclear cataract causes a myopic shift of refraction ("second sight") that can transiently improve near vision, transient diminution of vision, and sometimes monocular diplopia, before progressing

## canonical_key
cataract.early-senile-nuclear-features

## aliases
Second sight
Nuclear sclerosis myopic shift
Early senile cataract symptoms
Monocular diplopia in cataract

## arabic_label


## arabic_aliases


## definition
Early senile nuclear cataract increases the refractive index of the lens nucleus as it sclerosis, producing a myopic shift of refraction — the well-known "second sight" phenomenon in which a previously presbyopic patient temporarily reads better without glasses as the lens's added minus power compensates for their presbyopic addition. Alongside this myopic shift, early nuclear cataract characteristically causes transient (fluctuating, not fixed) diminution of vision as the lens opacity progresses unevenly, rather than pain, headache or the sudden floaters of a posterior vitreous event. It can also cause monocular diplopia or polyopia: light passing through different, unevenly opaque regions of the early lens refracts along more than one path, forming more than one image on the retina of that same eye, a symptom that resolves as the cataract progresses to more uniform opacification. This myopic-shift/second-sight phenomenon is specific to nuclear (not cortical or subcapsular) cataract and is a hyperopic, not myopic, shift only if it were the reverse process, which it is not.

## explicit_objective
State that early senile nuclear cataract produces a myopic refractive shift ("second sight," transiently improving near vision), transient diminution of vision, and sometimes monocular diplopia, not pain or a fixed visual loss.

## pitfalls
Reversing the direction of the refractive shift (nuclear cataract causes myopic, not hyperopic, shift), expecting pain and headache rather than the classic painless, transient visual change, or mistaking early-cataract monocular diplopia for a binocular alignment problem.

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
Cataract

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-IMGCAP-CATARACT-LENS

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
CLM-OPH-CATARACT-EARLY-SENILE-NU-01

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
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for refraction/optics, cataract, keratoconus, corneal disease or lens-subluxation content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node, since cornea and lens are anterior-segment structures.
reuse: Covers Ch4 Q3 (myopic shift, direct recall), Q27 ("second sight" symptom among distractors) and Q44 (monocular diplopia, keyed correct among distractors including transient diminution of vision) — one early-nuclear-cataract fact tested three ways.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-37E08DBF06E72A

## label
Cataract is opacity of the crystalline lens, typically presenting as slow, progressive, painless diminution of vision, not a visual field defect or motility limitation

## canonical_key
cataract.general-definition-and-presentation

## aliases
Cataract definition
Cataract presentation
Leucoma vs cataract

## arabic_label


## arabic_aliases


## definition
Cataract is defined as opacity of the crystalline lens itself, distinct from leucoma (a dense corneal scar), ciliary staphyloma (a bulging ectatic ciliary-region sclera) and iris bombe (forward iris bowing from posterior synechiae), all of which affect different structures. Typical cataract presents as slow, progressive, painless diminution of vision as the opacity gradually scatters and blocks light, rather than a sudden loss, a visual field defect (a retinal or neuro-ophthalmic sign) or limitation of ocular motility (an extraocular-muscle or orbital sign) — none of which cataract itself produces.

## explicit_objective
Define cataract as crystalline lens opacity (not corneal, scleral or iris pathology) and state its typical slow, progressive, painless presentation.

## pitfalls
Confusing cataract with leucoma, ciliary staphyloma or iris bombe, or expecting it to cause a visual field defect or limited motility.

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
Cataract

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-IMGCAP-CATARACT-LENS

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
CLM-OPH-CATARACT-GENERAL-DEFINIT-01

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
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for refraction/optics, cataract, keratoconus, corneal disease or lens-subluxation content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node, since cornea and lens are anterior-segment structures.
reuse: Covers Ch4 Q17 (typical presentation) and Q19 (definition, among corneal/scleral/iris distractor terms) — the same definitional fact tested twice.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-E36F8C86B079D5

## label
The commonest cause of cataract is old age; other recognised causes include chronic iritis/uveitis (as in Behcet's disease), prolonged topical steroid use and blunt trauma, but not hypermetropia

## canonical_key
cataract.causes-and-associations

## aliases
Senile cataract
Complicated cataract
Traumatic cataract
Steroid-induced cataract

## arabic_label


## arabic_aliases


## definition
Old age (senile cataract) is by far the commonest cause of cataract, ahead of trauma, endocrine causes (such as diabetes) and hypo-parathyroidism-related metabolic causes. "Complicated cataract" specifically follows chronic intraocular inflammation, such as the recurrent iritis of Behcet's disease, in which iris pigment deposits on the anterior lens capsule and posterior synechiae (with a festooned pupil) accompany the lens opacity; prolonged topical corticosteroid use is a separate, well-recognised cataractogenic exposure, not a protective one. Blunt trauma, such as a squash-ball injury, can also directly cause cataract even with an intact globe, and needs full systemic and fundus/ultrasound assessment, not medical treatment, as its main management. Hypermetropia itself is not a recognised cataract cause; unilateral total cataract in an otherwise normal eye is instead attributed to longstanding retinal detachment, chronic iridocyclitis, or old trauma.

## explicit_objective
Name old age as the commonest cataract cause, list complicated cataract (chronic iritis, e.g. Behcet's), steroid use and blunt trauma as further causes, and exclude hypermetropia.

## pitfalls
Naming hypermetropia as a cataract cause, or believing topical steroids never cause cataract, or that trauma always spares the lens if the globe is intact.

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
Cataract

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-IMGCAP-CATARACT-LENS

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
CLM-OPH-CATARACT-CAUSES-AND-ASSO-01

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
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for refraction/optics, cataract, keratoconus, corneal disease or lens-subluxation content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node, since cornea and lens are anterior-segment structures.
reuse: Covers Ch4 Q28 (unilateral total cataract causes, EXCEPT hypermetropia), Q29 (commonest cause, direct recall), Q65 (a Behcet's/complicated-cataract vignette) and Q66 (a blunt-trauma vignette) — one causes-and-associations fact tested four ways.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-C3379D8E268879

## label
Intumescent (swollen) cataract, with its glistening white capsule and shallow anterior chamber, can precipitate secondary (phacomorphic) angle closure glaucoma with acutely raised intraocular pressure

## canonical_key
cataract.intumescent-swelling-angle-closure-risk

## aliases
Intumescent cataract
Phacomorphic glaucoma
Secondary angle closure glaucoma

## arabic_label


## arabic_aliases


## definition
An intumescent cataract is one in which the lens has swollen with fluid, becoming larger and pushing the iris-lens diaphragm forward; on examination this shows as a white, glistening anterior capsule with a shallow anterior chamber (unlike a simple mature cataract's flat, non-glistening white reflex). This forward crowding can precipitate secondary (phacomorphic) angle closure glaucoma, in which intraocular pressure rises acutely as the swollen lens obstructs aqueous outflow at the angle — a recognised complication that distinguishes intumescent cataract from an otherwise uncomplicated mature cataract, and one that needs prompt surgical removal rather than watchful waiting or delay.

## explicit_objective
Recognise intumescent cataract's glistening capsule and shallow chamber, and its risk of precipitating acute secondary (phacomorphic) angle closure glaucoma.

## pitfalls
Treating an intumescent cataract's shallow chamber and glaucoma risk as a reason to postpone surgery, when prompt removal is the correct response.

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
Cataract

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-IMGCAP-CATARACT-LENS

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
CLM-OPH-INTUMESCENT-CATARACT-ANG-01

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
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for refraction/optics, cataract, keratoconus, corneal disease or lens-subluxation content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node, since cornea and lens are anterior-segment structures.
reuse: Covers Ch4 Q10 (association with secondary angle closure glaucoma), Q26 (the same fact among general cataract-fact distractors) and Q64 (a glistening-capsule, shallow-chamber vignette applying the acute IOP-rise risk) — one intumescent-cataract fact tested three ways.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-180949FD33A71F

## label
Immature senile cataract shows a partial red reflex with black sectors and some residual vision; mature cataract shows an absent (white) red reflex — congenital cataract, not old age, is the rarer cause the two are distinguished from

## canonical_key
cataract.maturity-grading-by-red-reflex

## aliases
Immature cataract
Mature cataract
Red reflex grading

## arabic_label


## arabic_aliases


## definition
Cataract maturity is graded partly by the red reflex: an immature senile cataract still transmits some light, so the red reflex shows black sectors against a partially preserved orange-red glow, with vision reduced but not absent (for instance 5/60), whereas a fully mature cataract blocks the reflex almost entirely, appearing uniformly white or absent. Age-related (senile) cataract, not congenital cataract, is overwhelmingly the commonest cause of cataract encountered in adult practice — congenital cataract is a distinct, much rarer paediatric entity. Painless, gradual glare and visual decline with a partially preserved but sector-black red reflex in an elderly patient is the classic immature-cataract presentation, not uveitis, which would show inflammatory signs the vignette lacks.

## explicit_objective
Distinguish immature cataract (partial, black-sectored red reflex, residual vision) from mature cataract (absent red reflex), and confirm old age, not congenital cataract, as the common adult cause.

## pitfalls
Calling congenital cataract the commonest cause of cataract in an elderly patient, or missing that a partially preserved red reflex with black sectors signals immature, not mature, cataract.

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
Cataract

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-IMGCAP-CATARACT-LENS

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
CLM-OPH-CATARACT-MATURITY-GRADIN-01

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
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for refraction/optics, cataract, keratoconus, corneal disease or lens-subluxation content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node, since cornea and lens are anterior-segment structures.
reuse: Covers Ch4 Q63 (an elderly-patient vignette applying the immature-cataract red-reflex sign and excluding congenital cataract as the commonest cause).
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-672746F222A180

## label
The current standard cataract surgery is phacoemulsification with posterior-chamber foldable intraocular lens implantation, superseding intracapsular surgery, extracapsular extraction with a rigid PMMA lens, and laser-only lens removal

## canonical_key
cataract.current-surgical-technique

## aliases
Phacoemulsification
Foldable IOL
Extracapsular cataract extraction

## arabic_label


## arabic_aliases


## definition
The current standard technique for adult cataract surgery is phacoemulsification (ultrasonic emulsification and aspiration of the lens through a small incision) combined with implantation of a posterior-chamber foldable intraocular lens, which can be inserted through the same small incision without sutures. This supersedes older techniques: intracapsular cataract extraction (removing the whole lens with its capsule) is essentially obsolete, extracapsular cataract extraction with a rigid PMMA intraocular lens needs a much larger incision and is now reserved for select advanced or resource-limited settings, and excimer laser corneal ablation (LASIK) treats refractive error on the cornea, not cataract, and has no role in lens removal.

## explicit_objective
Identify phacoemulsification with foldable posterior-chamber IOL implantation as the current standard cataract surgery, superseding intracapsular surgery, rigid-IOL extracapsular extraction and laser corneal ablation.

## pitfalls
Naming intracapsular surgery, extracapsular extraction with a rigid PMMA lens, or LASIK (a corneal refractive procedure) as the current cataract-surgery standard instead of phacoemulsification with a foldable IOL.

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
Cataract

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-IMGCAP-CATARACT-LENS

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
CLM-OPH-CATARACT-SURGERY-TECHNIQ-01

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
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for refraction/optics, cataract, keratoconus, corneal disease or lens-subluxation content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node, since cornea and lens are anterior-segment structures.
reuse: Covers Ch4 Q11 and Q15 (both direct-recall items naming the current technique, among obsolete-technique distractors) — the same fact tested twice.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-C12B23714FC50B

## label
Keratoplasty (corneal transplantation) is chosen by opacity depth: lamellar keratoplasty for superficial opacity, penetrating (full-thickness) keratoplasty for deep opacity, alongside deep lamellar keratoplasty and Descemet's membrane endothelial keratoplasty as recognised types; intrastromal ring application is a keratoconus-shape procedure, not a keratoplasty type

## canonical_key
keratoplasty.types-and-depth-indications

## aliases
Penetrating keratoplasty
Lamellar keratoplasty
Descemet membrane endothelial keratoplasty
Corneal transplantation

## arabic_label


## arabic_aliases


## definition
Keratoplasty means transplanting corneal tissue from an eye bank donor, and the depth of the recipient's opacity dictates which type is used: a superficial opacity, confined to the epithelium or anterior stroma, is best treated by lamellar keratoplasty (replacing only the affected anterior layers and leaving healthy deeper stroma and endothelium intact), while a deep opacity extending through the full stroma needs penetrating keratoplasty (a full-thickness graft). Deep anterior lamellar keratoplasty (removing stroma down to Descemet's membrane) and Descemet's membrane endothelial keratoplasty (replacing only the diseased endothelium) are further recognised, more selective keratoplasty types. Application of intrastromal corneal ring segments is a separate procedure that reshapes the keratoconic cornea to improve its optics without transplanting any donor tissue, and so is not itself classed as a type of keratoplasty.

## explicit_objective
Match lamellar keratoplasty to superficial opacity and penetrating keratoplasty to deep opacity, list deep lamellar and Descemet's membrane endothelial keratoplasty as further types, and exclude intrastromal ring application as a keratoplasty type.

## pitfalls
Choosing penetrating keratoplasty for a superficial opacity (lamellar is sufficient and preserves healthy tissue) or classing intrastromal ring application as a keratoplasty type.

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
Corneal disease and keratoplasty

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-IMGCAP-CATARACT-LENS

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
CLM-OPH-KERATOPLASTY-TYPES-AND-D-01

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
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for refraction/optics, cataract, keratoconus, corneal disease or lens-subluxation content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node, since cornea and lens are anterior-segment structures.
reuse: Covers Ch4 Q9 (definition of keratoplasty), Q16 (superficial opacity -> lamellar), Q18 (EXCEPT-format list of keratoplasty types excluding intrastromal rings) and Q20 (deep opacity -> penetrating) — one depth-matching fact tested four ways.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-DD21DD08436112

## label
Refractive errors are corrected by spectacles, contact lenses and refractive surgery (including LASIK); telescopes are a low-vision magnification aid, not a refractive-error correction method

## canonical_key
refractive-error.correction-methods

## aliases
Refractive error correction
LASIK
Low-vision telescopes

## arabic_label


## arabic_aliases


## definition
The standard methods for correcting refractive error are spectacles, contact lenses and refractive surgery — laser in situ keratomileusis (LASIK) reshapes the cornea itself to correct the error permanently, unlike trabeculectomy (a glaucoma drainage procedure), posterior capsulotomy (clearing a cloudy lens capsule after cataract surgery) or vitrectomy (removing vitreous), none of which correct refractive error. Telescopes are instead a low-vision magnification aid, used to enlarge images for patients with reduced vision from irreversible pathology (such as advanced macular degeneration); they do not correct the underlying refractive error itself and so are excluded from this group of refractive-error correction methods.

## explicit_objective
List spectacles, contact lenses and refractive surgery (LASIK) as refractive-error correction methods, and exclude telescopes (a low-vision magnification aid) and unrelated intraocular procedures.

## pitfalls
Classing telescopes as a refractive-error correction method (they magnify for low vision, not correct refraction) or confusing LASIK with unrelated intraocular procedures like trabeculectomy or vitrectomy.

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
Refractive errors and optics

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-IMGCAP-REFRACTION

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
CLM-OPH-REFRACTIVE-ERROR-CORRECT-01

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
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for refraction/optics, cataract, keratoconus, corneal disease or lens-subluxation content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node, since cornea and lens are anterior-segment structures.
reuse: Covers Ch4 Q23 (LASIK as refractive surgery, among unrelated intraocular-procedure distractors) and Q72 (EXCEPT-format list excluding telescopes) — one correction-methods fact tested twice.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-A1BA0DEFB89E28

## label
Lens subluxation/dislocation, whether traumatic or spontaneous, can be associated with ocular or systemic disease (including Marfan syndrome and homocystinuria), but not Behcet's disease

## canonical_key
lens-subluxation.causes-and-syndromic-associations

## aliases
Marfan syndrome lens
Homocystinuria lens
Traumatic lens dislocation

## arabic_label


## arabic_aliases


## definition
Lens subluxation (partial zonular rupture, displacing but not fully dislocating the lens) or complete dislocation can follow blunt ocular trauma — such as a tennis-ball injury producing monocular diplopia and an irregular anterior-chamber depth with the lens edge visible across the pupil — or arise spontaneously from weak or absent zonular support, which is recognised in Marfan syndrome (typically superotemporal subluxation), homocystinuria (typically inferonasal subluxation) and other connective-tissue or metabolic disorders. Because subluxation and dislocation are not confined to one eye by mechanism, they can also be associated with other ocular or non-ocular manifestations of their underlying cause. Behcet's disease, a systemic vasculitis causing recurrent uveitis, is not a recognised cause of lens subluxation, distinguishing it from the genuine syndromic associations above.

## explicit_objective
List Marfan syndrome, homocystinuria and trauma as genuine causes of lens subluxation/dislocation, and exclude Behcet's disease.

## pitfalls
Naming Behcet's disease as a lens-subluxation association, when its recognised ocular association is recurrent uveitis, not zonular weakness.

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
Lens subluxation and dislocation

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-IMGCAP-CATARACT-LENS

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
CLM-OPH-LENS-SUBLUXATION-DISLOCA-01

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
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for refraction/optics, cataract, keratoconus, corneal disease or lens-subluxation content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node, since cornea and lens are anterior-segment structures.
reuse: Covers Ch4 Q12 (association with other manifestations, direct recall), Q67 (a traumatic-subluxation vignette naming Marfan syndrome as a further association) and Q90 (EXCEPT-format list excluding Behcet's disease) — one causes-and-associations fact tested three ways.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-A774AB4FF38CE3

## label
Posterior lens dislocation deepens the anterior chamber (not shallows it) and shows loss of the paired Purkinje-Sanson images and a festooned (not jet-black) pupil, and typically causes monocular (not binocular) diplopia

## canonical_key
lens-subluxation.clinical-signs

## aliases
Purkinje-Sanson images
Festooned pupil
Monocular diplopia

## arabic_label


## arabic_aliases


## definition
When the lens dislocates posteriorly into the vitreous, the loss of its normal iris support deepens (not shallows) the anterior chamber, and because the lens is a key source of the paired Purkinje-Sanson reflected light images (from its anterior and posterior surfaces), those images are lost along with it. A posteriorly or anteriorly dislocated or subluxated lens also disturbs pupil shape, characteristically producing a festooned (irregularly scalloped, adherent-to-lens-edge) pupil rather than a jet-black or simply peaked one. Because part of the visual field still passes around the displaced lens edge through the aphakic portion of the pupil while the rest passes through the crystalline lens, the eye effectively has two optical images from one eye — monocular, not binocular, diplopia — which resolves once the fellow eye is covered.

## explicit_objective
State that posterior lens dislocation deepens the anterior chamber, loses the Purkinje-Sanson images, produces a festooned pupil, and causes monocular (not binocular) diplopia.

## pitfalls
Believing posterior lens dislocation shallows the anterior chamber (it deepens it) or that lens-related diplopia is binocular (it is monocular, from one eye alone).

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
Lens subluxation and dislocation

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-IMGCAP-CATARACT-LENS

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
CLM-OPH-LENS-SUBLUXATION-DISLOCA-01

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
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for refraction/optics, cataract, keratoconus, corneal disease or lens-subluxation content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node, since cornea and lens are anterior-segment structures.
reuse: Covers Ch4 Q33 (loss of Purkinje-Sanson images, direct recall), Q68 (EXCEPT-format item on anterior-chamber depth), Q85 (festooned pupil), Q86 (monocular diplopia from severe subluxation) and Q89 (a repeat of the Purkinje-Sanson/diplopia/treatment/astigmatism-always-present facts) — one clinical-signs fact tested five ways.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-5AE94F1034F553

## label
Diminution of vision in lens subluxation follows from induced myopia or astigmatism and from its complications (uveitis, glaucoma, cataract), but corneal perforation is not a recognised complication of anterior lens dislocation

## canonical_key
lens-subluxation.visual-impact-and-complications

## aliases
Lens subluxation vision loss
Anterior lens dislocation complications

## arabic_label


## arabic_aliases


## definition
Lens subluxation blurs vision through several mechanisms at once: the tilted or displaced lens induces irregular astigmatism and a myopic shift, and the subluxation's own complications, chiefly secondary glaucoma (from pupillary block or direct angle obstruction), uveitis and cataract formation, further reduce vision. When a lens dislocates fully anteriorly into the anterior chamber, it can obstruct the angle (glaucoma), incite iridocyclitis, and opacify (cataract) — but it does not cause corneal perforation, a full-thickness corneal breach that lens dislocation, without an accompanying penetrating injury, does not itself produce.

## explicit_objective
List the mechanisms of vision loss in lens subluxation (myopia/astigmatism, complications) and anterior dislocation's genuine complications (glaucoma, iridocyclitis, cataract), excluding corneal perforation.

## pitfalls
Naming corneal perforation as a complication of anterior lens dislocation, when the lens itself does not breach the cornea.

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
Lens subluxation and dislocation

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-IMGCAP-CATARACT-LENS

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
CLM-OPH-LENS-SUBLUXATION-VISUAL--01

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
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for refraction/optics, cataract, keratoconus, corneal disease or lens-subluxation content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node, since cornea and lens are anterior-segment structures.
reuse: Covers Ch4 Q46 ("all of the above" mechanisms of vision loss) and Q88 (EXCEPT-format list of anterior-dislocation complications excluding corneal perforation) — one visual-impact/complications fact tested twice.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-A0052869CC1577

## label
Vitreous haemorrhage most commonly follows proliferative diabetic retinopathy neovascularisation, trauma, or posterior vitreous detachment causing a retinal tear, but not uveitis or extracapsular cataract extraction

## canonical_key
vitreous-haemorrhage.causes

## aliases
Vitreous haemorrhage
Proliferative diabetic retinopathy bleeding
Retinal tear bleeding

## arabic_label


## arabic_aliases


## definition
Vitreous haemorrhage — bleeding into the vitreous cavity, typically causing sudden painless vision loss or floaters — most commonly follows three mechanisms: rupture of fragile new vessels in proliferative diabetic retinopathy (the commonest cause overall), direct ocular trauma tearing a retinal or choroidal vessel, and posterior vitreous detachment that tears a retinal blood vessel along with the retina as the vitreous separates. Uveitis (intraocular inflammation) and an uncomplicated extracapsular cataract extraction are not established common causes of vitreous haemorrhage; while any intraocular surgery carries some bleeding risk, the vitreous cavity is not typically entered or bled into during routine, uncomplicated cataract extraction.

## explicit_objective
List proliferative diabetic retinopathy, trauma and posterior vitreous detachment with retinal tear as the common causes of vitreous haemorrhage, and exclude uveitis and extracapsular cataract extraction.

## pitfalls
Naming uveitis or routine extracapsular cataract extraction as common vitreous-haemorrhage causes, when neovascularisation, trauma and PVD-related retinal tear are the recognised ones.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
mul

## primary_node_id
DIS-OPH-T04

## secondary_node_ids


## topic
Ophthalmology

## subtopic
Vitreous haemorrhage

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-IMGCAP-CATARACT-LENS

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
CLM-OPH-VITREOUS-HEMORRHAGE-CAUS-01

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
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for vitreous-haemorrhage content; DIS-OPH-T04 (Retina) is used as the closest available Ophthalmology discipline node for this posterior-segment fact, since vitreous haemorrhage is most often a retinal-disease complication.
reuse: Covers Ch4 Q25 (EXCEPT-format list excluding extracapsular cataract extraction) and Q87 (EXCEPT-format list excluding uveitis) — one causes fact tested twice from two different excluded distractors.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-43FF8C90DEA439

## label
Band keratopathy is calcium-salt deposition in the anterior cornea, while arcus senilis is a lipid-deposit ring at the corneal periphery — distinguishing the two most common corneal degenerative deposits by their material

## canonical_key
corneal-deposits.band-keratopathy-vs-arcus-senilis

## aliases
Band keratopathy
Arcus senilis
Corneal calcium deposition
Corneal lipid ring

## arabic_label


## arabic_aliases


## definition
Band keratopathy is a horizontal band of calcium salt deposited in Bowman's layer and the anterior stroma across the exposed interpalpebral cornea, classically seen in chronic uveitis, hypercalcaemia or chronically irritated eyes. Arcus senilis, by contrast, is an age-related ring of lipid (cholesterol and phospholipid) deposits at the corneal periphery, typically beginning superiorly and inferiorly before becoming circumferential, and is a benign, extremely common finding in older adults that (unlike band keratopathy) does not by itself threaten vision. Distinguishing the two by their deposited material, calcium in band keratopathy versus lipid in arcus senilis, is the key discriminator when either is described on a corneal examination.

## explicit_objective
Identify band keratopathy as calcium-salt deposition and arcus senilis as lipid-deposit deposition, and distinguish the two corneal degenerative findings by their material.

## pitfalls
Swapping the deposited material between the two conditions (attributing calcium to arcus senilis or lipid to band keratopathy).

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
Corneal disease and keratoplasty

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-IMGCAP-CATARACT-LENS

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
CLM-OPH-BAND-KERATOPATHY-VS-ARCU-01

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
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for refraction/optics, cataract, keratoconus, corneal disease or lens-subluxation content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node, since cornea and lens are anterior-segment structures.
reuse: Covers Ch4 Q31 (band keratopathy material) and Q35 (arcus senilis material, among distractors about its onset location and material) — one corneal-deposits fact tested twice.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-43A39370F41B2C

## label
Corneal dehydration (relative stromal deturgescence, essential for transparency) is maintained by the endothelium's active ion pump, and damage to endothelial cells, such as after intraocular surgery, causes corneal oedema

## canonical_key
cornea.endothelial-pump-and-dehydration

## aliases
Corneal endothelial pump
Corneal deturgescence
Pseudophakic corneal oedema

## arabic_label


## arabic_aliases


## definition
The cornea's relative dehydration (deturgescence), essential for its transparency, is actively maintained by the endothelium's Na+/K+-ATPase ion pumps, which continuously pump fluid and ions out of the stroma against its natural tendency to imbibe water; the epithelium contributes only a minor barrier role, not the primary pumping responsibility. When endothelial cells are damaged, for instance mechanically during cataract surgery and intraocular lens implantation, this pump function fails locally and the stroma swells with fluid, producing corneal oedema (increased corneal thickness and haziness) — the mechanism behind postoperative corneal oedema seen in the days after cataract surgery, distinct from herpetic disease or Fuch's dystrophy, which the vignette's history does not support.

## explicit_objective
State that the corneal endothelium's active ion pump maintains corneal dehydration/transparency, and that endothelial cell damage (e.g. after intraocular surgery) causes corneal oedema.

## pitfalls
Attributing corneal dehydration to the epithelium rather than the endothelium, or missing that endothelial cell damage, not the epithelium's pumping, explains postoperative corneal oedema.

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
Corneal disease and keratoplasty

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-IMGCAP-CATARACT-LENS

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
CLM-OPH-CORNEAL-ENDOTHELIAL-PUMP-01

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
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for refraction/optics, cataract, keratoconus, corneal disease or lens-subluxation content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node, since cornea and lens are anterior-segment structures.
reuse: Covers Ch4 Q56 (a post-cataract-surgery corneal oedema vignette naming endothelial damage as the mechanism) and Q80 (direct recall: corneal dehydration is the endothelium's responsibility) — one endothelial-pump fact tested twice.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-CA437F4916F9B8

## label
Trachoma leads to corneal opacity mainly through repeated mechanical trauma (from trichiasis and cicatricial entropion), a clinical mechanism distinct from — though ultimately expressed through — disturbance of the stroma's normally regular collagen-fibre spacing

## canonical_key
trachoma.corneal-opacity-mechanism

## aliases
Trachomatous corneal opacity
Trichiasis corneal trauma
Regular collagen spacing

## arabic_label


## arabic_aliases


## definition
Trachoma scars the tarsal conjunctiva over repeated infective/inflammatory episodes, and this cicatrization progressively distorts the lid margin into entropion with trichiasis (misdirected lashes); it is this repeated mechanical trauma from lash-corneal contact, cycle after cycle, that is trachoma's principal clinical route to corneal opacity, rather than a single direct chemical or inflammatory insult to the stroma. At the tissue level, this repeated trauma and secondary scarring do disturb the corneal stroma's normally regular, evenly-spaced collagen-fibril arrangement — the near-crystalline regularity that lets destructive interference cancel the light each fibril would otherwise scatter — and it is this loss of regularity that ultimately scatters light and produces visible opacity; regularly spaced collagen fibres do not themselves scatter light. Both descriptions are therefore true of the same disease process, but the repeated-trauma mechanism is the specific clinical answer this cluster's trachoma vignette keys.

## explicit_objective
State that trachoma causes corneal opacity mainly through repeated mechanical trauma from trichiasis/entropion, and that this trauma disturbs the stroma's regular collagen spacing, which is what ultimately scatters the light.

## pitfalls
Attributing trachomatous corneal opacity to a single penetrating injury rather than repeated lash-corneal trauma, or believing regular collagen fibre arrangement itself scatters light (it is the loss of that regularity that does).

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
Corneal disease and keratoplasty

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-IMGCAP-CATARACT-LENS

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
CLM-OPH-TRACHOMA-CORNEAL-OPACITY-01

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
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for refraction/optics, cataract, keratoconus, corneal disease or lens-subluxation content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node, since cornea and lens are anterior-segment structures.
reuse: Covers Ch4 Q57 (a trachomatous-entropion vignette keying repeated mechanical trauma as the cause of corneal opacity, among distractors including the deeper collagen-regularity mechanism).
relatedNotMerged: find-existing.mjs and a docs/*/concept|pending-live grep for "corneal transparency" reconfirmed CON-NEU-3FF95D30CD5825 (Alexandria's pending AU-MED-203 histology concept, canonical_key neuro.cornea.transparency-factors, already overlaid by lane-1 in pending-live/HU-ORL-305-questions.md) as the closest existing record — a related but different fact (its definitional "what keeps the cornea clear" framing, vs. this concept's clinical trachoma-trauma mechanism). This concept is minted rather than reused because reusing the id here would reproduce a live, confirmed validate-content-batch.mjs error already present in the committed lane-1 batch (CON-NEU-3FF95D30CD5825's main_concept use on lane-1's Ch1 Q8/Q9/Q12 is not covered by any article in those questions' library_ids, since the pending-live overlay adds no article_ids and lane-1's own article never lists this concept as covered) — see this file's header note. Not listed as a rejected_merge_candidate_id since it was a real reuse candidate, not a rejected one; flagged instead as a separate out-of-scope defect.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-56D67C05B81602

## label
Diabetes predisposes to altering the corneal epithelium and Bowman's membrane (diabetic keratopathy), delaying healing of epithelial defects that limbal stem cells normally regenerate; chemical injury, contrary to a common false claim, does affect those stem cells

## canonical_key
cornea.diabetic-epitheliopathy-and-stem-cell-regeneration

## aliases
Diabetic keratopathy
Limbal stem cells
Corneal epithelial regeneration

## arabic_label


## arabic_aliases


## definition
Diabetes is a recognised predisposing factor for corneal epithelial vulnerability (diabetic keratopathy), altering the epithelium's basement-membrane adhesion and Bowman's membrane and impairing normal healing, which is why a diabetic patient with dry eye and a corneal epithelial defect (positive fluorescein staining) is at particular risk of a slow-healing or recurrent defect. The corneal epithelium normally renews itself from limbal stem cells at the corneoscleral junction, which is why epithelial defects usually heal quickly in a non-diabetic eye; when these stem cells, or the epithelium and Bowman's membrane they support, are compromised (by diabetes or otherwise), healing slows. Chemical injury is a separate, well-established cause of limbal stem cell damage — it does affect stem cells, contrary to a common false distractor — and severe chemical burns can produce limbal stem cell deficiency severe enough to prevent normal epithelial healing altogether; the vision loss in a corneal epithelial-defect presentation like this one is an epithelial/basement-membrane, not an endothelial, problem.

## explicit_objective
State that diabetes predisposes to epithelial/Bowman's-membrane vulnerability (diabetic keratopathy), that limbal stem cells drive normal epithelial regeneration, and that chemical injury does affect those stem cells.

## pitfalls
Believing chemical injuries never affect limbal stem cells (severe burns are a well-recognised cause of stem cell damage), or attributing an epithelial-defect vignette's vision loss to endothelial cell loss instead.

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
Corneal disease and keratoplasty

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-IMGCAP-CATARACT-LENS

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
CLM-OPH-DIABETIC-CORNEAL-EPITHEL-01

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
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for refraction/optics, cataract, keratoconus, corneal disease or lens-subluxation content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node, since cornea and lens are anterior-segment structures.
reuse: Covers Ch4 Q58 (a diabetic corneal epithelial defect vignette keying diabetes' predisposing effect on epithelium/Bowman's membrane, among distractors about stem cells' general role, chemical-injury exception, and endothelial cell loss).
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-A9AAED8FFE3837

## label
Ocular cicatricial pemphigoid, like trachoma, is a cicatrising conjunctival disease that can keratinise the corneal surface through progressive mucin-layer loss, since a normal tear film (needing an intact mucin layer) is essential for corneal transparency

## canonical_key
cicatricial-conjunctivitis.corneal-keratinisation-and-mucin-loss

## aliases
Ocular cicatricial pemphigoid
Corneal keratinisation
Mucin layer loss

## arabic_label


## arabic_aliases


## definition
Ocular cicatricial pemphigoid is a chronic autoimmune blistering and scarring disease of the conjunctiva that, like trachoma, progressively destroys conjunctival goblet cells and scars the fornices; the resulting loss of the tear film's mucin layer leaves the ocular surface unable to wet normally, and over time the corneal epithelium can undergo surface keratinisation (taking on a skin-like, non-transparent surface) as a consequence. A normal tear film, which depends on an intact mucin layer to let the aqueous layer wet the epithelium evenly, is essential for corneal transparency; prolonged, severe dry eye, contrary to a common false claim, absolutely can cause corneal opacity through exactly this kind of surface change, and does not "never" cause it. Sjögren's syndrome, by contrast, chiefly reduces the aqueous (not mucin) layer via lacrimal gland destruction, distinguishing its mechanism from pemphigoid's cicatricial mucin-layer loss even though both cause severe dry eye.

## explicit_objective
State that ocular cicatricial pemphigoid causes progressive mucin-layer loss that can keratinise the cornea, and that severe prolonged dry eye can cause corneal opacity (it does not 'never' do so).

## pitfalls
Believing prolonged severe dry eye never causes corneal opacity, or conflating pemphigoid's mucin-layer (cicatricial) mechanism with Sjögren's syndrome's aqueous-layer (glandular) mechanism.

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
Corneal disease and keratoplasty

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-IMGCAP-CATARACT-LENS

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
CLM-OPH-CICATRICIAL-CONJUNCTIVIT-01

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
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for refraction/optics, cataract, keratoconus, corneal disease or lens-subluxation content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node, since cornea and lens are anterior-segment structures.
reuse: Covers Ch4 Q59 (a pemphigoid dry-eye vignette naming corneal keratinisation and excluding "prolonged severe dry eye never causes corneal opacity").
relatedNotMerged: Lane-2's dryEyeCauses concept (docs/Helwan-Source-Imports/concept/HU-ORL-305-ophthalmology-concepts-2.md, canonical_key dry-eye.causes) lists trachoma's cicatricial mucin loss as a dry-eye cause, close to this concept's pemphigoid mechanism, but tests a different specific fact (a causes-list for dry eye itself, vs. this concept's keratinisation consequence and Sjögren's-vs-pemphigoid mechanism contrast) — related, not merged.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-7731CFD31F6DDF

## label
Corneal dystrophies are inherited, typically bilateral and symmetrical corneal opacities whose visual impact depends on which corneal layer is involved, usually needing surgical treatment

## canonical_key
corneal-dystrophy.familial-presentation-and-treatment

## aliases
Corneal dystrophy
Bilateral symmetrical corneal opacity
Familial corneal disease

## arabic_label


## arabic_aliases


## definition
Corneal dystrophies are a group of inherited corneal diseases producing characteristically bilateral, symmetrical corneal opacities, often with a family history (as when a patient's father also had poor vision), and are classified by the corneal layer primarily affected (epithelial, stromal or endothelial). The visual impact of a given dystrophy depends heavily on which layer is involved: epithelial and superficial stromal dystrophies can behave relatively mildly or respond to surface treatment, while deep stromal or endothelial dystrophies more often impair vision severely, so "how much vision is lost" cannot be predicted from the diagnosis of "corneal dystrophy" alone, only from its layer. Because dystrophic opacity does not resolve with medical treatment, keratoplasty (matched to the affected layer, as in lamellar or endothelial techniques) is the mainstay of treatment for vision-limiting corneal dystrophy, not deposition of red blood cells or calcium, which are unrelated mechanisms belonging to other corneal conditions (hyphaema staining, band keratopathy).

## explicit_objective
Recognise bilateral, symmetrical, familial corneal opacity as a corneal dystrophy presentation, note that its visual impact depends on the corneal layer involved, and state that treatment is mainly surgical.

## pitfalls
Attributing corneal dystrophy's opacity to red blood cell or calcium deposition (these are separate, unrelated corneal conditions) rather than to an inherited structural defect of a specific corneal layer.

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
Corneal disease and keratoplasty

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-IMGCAP-CATARACT-LENS

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
CLM-OPH-CORNEAL-DYSTROPHY-FAMILI-01

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
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for refraction/optics, cataract, keratoconus, corneal disease or lens-subluxation content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node, since cornea and lens are anterior-segment structures.
reuse: Covers Ch4 Q60 (a bilateral, familial corneal-opacity vignette naming layer-dependent visual impact and surgical treatment).
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-F0BCAD31BEFE8D

## label
Contact lens wear carries recognised disadvantages including infection risk, giant papillary conjunctivitis and traumatic corneal abrasions

## canonical_key
contact-lens.disadvantages

## aliases
Contact lens complications
Giant papillary conjunctivitis
Contact lens infection risk

## arabic_label


## arabic_aliases


## definition
Contact lens wear, while an effective optical correction, carries recognised disadvantages: an increased risk of microbial keratitis and other ocular surface infection from reduced corneal oxygenation and lens-surface biofilm, giant papillary conjunctivitis (a hypersensitivity reaction to lens deposits or the lens edge, producing large papillae under the upper lid), and traumatic corneal abrasions from lens insertion, removal or a poor fit. These disadvantages are why contact lens wearers need proper hygiene counselling, regular follow-up and prompt attention to any red or painful eye, rather than reassurance that lens wear is complication-free.

## explicit_objective
List infection risk, giant papillary conjunctivitis and traumatic corneal abrasions as recognised disadvantages of contact lens wear.

## pitfalls
Underestimating contact lens wear as free of infection or mechanical risk, when all three (infection, GPC, abrasion) are well-established disadvantages.

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
Refractive errors and optics

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-IMGCAP-REFRACTION

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
CLM-OPH-CONTACT-LENS-DISADVANTAG-01

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
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for refraction/optics, cataract, keratoconus, corneal disease or lens-subluxation content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node, since cornea and lens are anterior-segment structures.
reuse: Covers Ch4 Q39 ("all of the above" list of contact lens disadvantages).
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

---

# Item

## id
CON-OPH-7F4490AB241FDB

## label
Projection of light (light-projection testing) is used to estimate visual prognosis before surgery in an eye with a dense media opacity, by assessing whether the retina and optic nerve behind it still function directionally

## canonical_key
visual-prognosis.pre-surgical-light-projection-testing

## aliases
Light projection test
Pre-operative visual prognosis
Projection of light

## arabic_label


## arabic_aliases


## definition
When a dense cataract or other media opacity prevents formal visual acuity or fundus examination, projection of light — shining a light from different directions and asking the patient to identify where it came from — estimates whether the retina and optic nerve behind the opacity are still functioning well enough to justify surgery, since accurate directional projection implies grossly intact posterior visual pathway function. This is distinct from fluorescein angiography (which images retinal and choroidal vasculature, not global visual prognosis), formal visual field testing (which needs a clear enough media and reliable fixation) and corneal topography (a corneal-shape test unrelated to retinal function) — none of which serve this specific pre-operative prognostic purpose in a media-opacity eye.

## explicit_objective
Identify projection of light as the test used to estimate visual prognosis before surgery when a dense media opacity blocks formal examination.

## pitfalls
Selecting fluorescein angiography, visual field testing or corneal topography instead of projection of light for pre-operative prognosis through a dense opacity, when none of those tests can be performed reliably through it.

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
Cataract

## microtopic


## nanotopic


## modules
HU-ORL-305

## article_ids
ART-HU-ORL305-OPH-IMGCAP-CATARACT-LENS

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
CLM-OPH-VISUAL-PROGNOSIS-TESTING-01

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
taxonomyPlacement: No DIS-OPH taxonomy leaf exists for refraction/optics, cataract, keratoconus, corneal disease or lens-subluxation content specifically (the 7 DIS-OPH topics are Eye examination, Anterior segment, Glaucoma, Retina, Neuro-ophthalmology, Trauma, Ophthalmic procedures); DIS-OPH-T02 (Anterior segment) is used as the closest available Ophthalmology discipline node, since cornea and lens are anterior-segment structures.
reuse: Covers Ch4 Q91 (direct recall, among unrelated-test distractors).
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.

