<!--
  AU-MED-201 (Endocrine and Genitourinary Systems & Clinical Skills 3) — same
  first-authoring pass and source as the sibling anatomy file (see that
  file's header for the source/keying discipline). 3 histology items from
  this paper: pancreatic islet alpha-cell location, zona glomerulosa vs zona
  reticularis differentiation, and the ovarian germinal epithelium. Each
  searched via find-existing.mjs before minting — the "pancreatic islet"
  search returned live CON-GIT-* concepts on alpha/beta/delta cell
  PROPORTION (percentage composition), a different fact from this item's
  LOCATION (peripheral vs central) angle, so a new concept is minted and
  cross-linked via related_concept_ids rather than reused.

  Import: Admin › Bulk import → concept.
-->

# Item

## id
CON-END-B451C6EAC6B3E0

## label
Alpha cells of the pancreatic islets are peripherally located

## canonical_key
endo.pancreatic-islet.alpha-cells-peripheral-location

## definition
Within a pancreatic islet of Langerhans, alpha (A) cells — which secrete glucagon — are characteristically located at the periphery of the islet, forming an outer rim around the more centrally-placed beta (B) cells, which are both the most numerous islet cell type and secrete insulin. This peripheral position is the histological feature that distinguishes alpha cells on a stained section; alpha cells are neither the least numerous islet cell type (that is the delta/D cell, which secretes somatostatin) nor characteristically small, and islet capillaries are fenestrated sinusoidal vessels shared by all islet cell types rather than a feature specific to alpha cells.

## explicit_objective
Identify peripheral location within the islet as the histological feature of pancreatic alpha cells, distinguishing it from cell-proportion facts (numerousness) that instead describe beta and delta cells.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
endo

## primary_node_id
DIS-HIS-T03

## secondary_node_ids


## topic
Histology

## subtopic
Pancreatic islets (endocrine pancreas)

## microtopic


## nanotopic


## modules


## aliases
Alpha (A) cell location|Glucagon-secreting islet cells|Peripheral islet cells

## arabic_label


## arabic_aliases


## pitfalls
Confusing alpha cells' peripheral LOCATION with a proportion (numerousness) claim — alpha cells are not the least numerous islet cell type (that is the delta cell) and are not distinguished by small size; the distinguishing histological feature tested here is their position at the islet periphery.

## article_ids
ART-END-AU-MED-201-MOCK-HISTOLOGY

## related_article_ids
ART-END-AU-MED-201-MOCK-HISTOLOGY

## related_concept_ids
CON-END-00363BC550B34E

## approved_file_resource_ids


## approved_video_resource_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## merge_ids


## rejected_merge_candidate_ids


## last_reviewed


## review_due


## exclusion_reason


## learner_years
2

## universities
au

## blueprint_weight
0.3

## exam_weight_by_year
AU_Y2=0.3

## clinical_relevance
0.3

## academic_relevance
0.75

## module_subject
AU-MED-201 > Histology > Endocrine Pancreas

## exam_signal
src_a6e9adda1ad630d28a55 | department_question_bank | undated | p3 q5 | AU-MED-201

## weight_confidence
0.3

## confidence
0.75

## atomic_claim_ids


## resource_ids
src_a6e9adda1ad630d28a55

## original_wording
Which of the following is a histological feature of a cells of pancreatic islets? A- Peripherally located B- The least numerous C- Small in size D- Surrounded by sinusoidal capillaries. Key: A.

## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
microtopicId: No MIC_ identifier exists for this cluster in the curriculum overlay; module_subject already carries the position.
nanotopicId: The microtopic level is unused here, so a nanotopic beneath it would be finer than the source material distinguishes.
moduleIds: No verified live AU-MED-201 module id has been confirmed in server data yet; module_subject carries curriculum mapping instead.
arabicLabel: No standard Arabic term for this specific fact is in undergraduate use separate from the English technical vocabulary; Alexandria students are taught this in English.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
sourceCandidateIds: Searched via "Instruction Manual for Content Creation/tools/find-existing.mjs" for "pancreatic islet" — returned live CON-GIT-A491ADB29EF8CF/CC592625E35F85/7D6106C71D9068 on alpha/beta/delta cell PROPORTION (percentage composition), a different fact (composition, not location) from this item's peripheral-location angle. No closer match found; new concept minted.
relationships: Walked the AU-MED-201 concepts minted alongside this one in the same batch; loose same-topic (adrenal/endocrine histology) proximity to the zona glomerulosa/reticularis concept recorded in related_concept_ids.
au: Mock exam EGU 2023-2024 answers, p3 q5

---

# Item

## id
CON-END-00363BC550B34E

## label
Zona glomerulosa cells are arranged in closely-packed arched clusters, unlike the lipofuscin-rich zona reticularis

## canonical_key
endo.adrenal-cortex.zona-glomerulosa-arched-clusters-vs-reticularis

## definition
The adrenal cortex has three histologically distinct zones. The outermost zona glomerulosa, which secretes mineralocorticoids (aldosterone), is arranged in closely-packed, rounded/arched clusters of cells immediately beneath the capsule — a distinctive architectural pattern not shared by the zona fasciculata (parallel cords, two cells thick) or the innermost zona reticularis (an anastomosing network of cords). The zona reticularis, not the zona glomerulosa, is the zone whose cells accumulate more lipofuscin pigment in their cytoplasm with age; neither zone shows a positive chromaffin reaction (that is a feature of the adrenal medulla's chromaffin cells) or classic protein-secreting-cell ultrastructure (steroid-secreting cells of all three cortical zones instead show abundant smooth endoplasmic reticulum and lipid droplets, the hallmark of steroidogenic rather than protein-secreting cells).

## explicit_objective
Identify the zona glomerulosa's arched-cluster arrangement as the feature that differentiates it from the zona reticularis, whose own distinguishing feature is instead greater cytoplasmic lipofuscin content.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
endo

## primary_node_id
DIS-HIS-T03

## secondary_node_ids


## topic
Histology

## subtopic
Adrenal cortex zonation

## microtopic


## nanotopic


## modules


## aliases
Adrenal cortex zones|Zona glomerulosa architecture|Zona reticularis lipofuscin

## arabic_label


## arabic_aliases


## pitfalls
Attributing lipofuscin accumulation, a chromaffin reaction, or protein-secreting-cell features to the zona glomerulosa — lipofuscin is a zona reticularis feature, a positive chromaffin reaction belongs to the adrenal medulla, and all three cortical zones are steroid- (not protein-) secreting cells.

## article_ids
ART-END-AU-MED-201-MOCK-HISTOLOGY

## related_article_ids
ART-END-AU-MED-201-MOCK-HISTOLOGY

## related_concept_ids
CON-END-B451C6EAC6B3E0
CON-END-C6ABBC98D00760

## approved_file_resource_ids


## approved_video_resource_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## merge_ids


## rejected_merge_candidate_ids


## last_reviewed


## review_due


## exclusion_reason


## learner_years
2

## universities
au

## blueprint_weight
0.3

## exam_weight_by_year
AU_Y2=0.3

## clinical_relevance
0.3

## academic_relevance
0.75

## module_subject
AU-MED-201 > Histology > Adrenal Cortex

## exam_signal
src_a6e9adda1ad630d28a55 | department_question_bank | undated | p8 q14 | AU-MED-201

## weight_confidence
0.3

## confidence
0.75

## atomic_claim_ids


## resource_ids
src_a6e9adda1ad630d28a55

## original_wording
Which of the following differentiates the cells of zona glomerulosa from that of zona reticularis? A- Show features of protein-secreting cells B- Arranged in closely-packed arched clusters C- Give positive chromaffin reaction D- Contain more lipofuscin pigments in their cytoplasm. Key: B.

## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
microtopicId: No MIC_ identifier exists for this cluster in the curriculum overlay; module_subject already carries the position.
nanotopicId: The microtopic level is unused here, so a nanotopic beneath it would be finer than the source material distinguishes.
moduleIds: No verified live AU-MED-201 module id has been confirmed in server data yet; module_subject carries curriculum mapping instead.
arabicLabel: No standard Arabic term for this specific fact is in undergraduate use separate from the English technical vocabulary; Alexandria students are taught this in English.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
sourceCandidateIds: Searched via "Instruction Manual for Content Creation/tools/find-existing.mjs" for "zona glomerulosa", "adrenal cortex" and "chromaffin" across docs/*-Source-Imports/concept/*.md; no genuine match found.
relationships: Cross-linked to the anatomy-file's right-suprarenal-gland concept (same organ) and to the alpha-cell location concept (same batch, endocrine histology cluster) via related_concept_ids.
au: Mock exam EGU 2023-2024 answers, p8 q14

---

# Item

## id
CON-AND-AEA8131AE609D6

## label
The ovarian germinal epithelium lies outer to the tunica albuginea

## canonical_key
androl.ovary.germinal-epithelium-outer-to-tunica-albuginea

## definition
The ovary's surface is covered by a single layer of simple cuboidal (to low columnar) epithelium historically named the "germinal epithelium," which is continuous with the peritoneal mesothelium at the mesovarium and lies external (superficial) to the tunica albuginea — the dense irregular connective-tissue capsule that itself lies just deep to the surface epithelium and external to the ovarian cortex proper. Despite its name, the germinal epithelium does not give rise to the primordial germ cells: those originate instead from the yolk sac endoderm and migrate into the developing gonad during embryogenesis, a fact this item's own distractor tests directly. The germinal epithelium is also not the ciliated ductal epithelium of the uterine tube, nor mesothelium of the tunica vaginalis (a testicular, not ovarian, structure).

## explicit_objective
State that the ovarian germinal epithelium lies outer to (superficial to) the tunica albuginea, and that — despite its historical name — it does not give rise to the primordial germ cells.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
androl

## primary_node_id
DIS-HIS-T03

## secondary_node_ids


## topic
Histology

## subtopic
Ovary — surface layers

## microtopic


## nanotopic


## modules


## aliases
Germinal epithelium (ovary)|Tunica albuginea (ovary)|Ovarian surface epithelium misnomer

## arabic_label


## arabic_aliases


## pitfalls
Taking the name "germinal epithelium" literally, as a source of primordial germ cells — the primordial germ cells actually originate from yolk sac endoderm and migrate into the gonad; the germinal epithelium is simply the ovary's outer mesothelium-derived surface layer, external to the tunica albuginea.

## article_ids
ART-END-AU-MED-201-MOCK-HISTOLOGY

## related_article_ids
ART-END-AU-MED-201-MOCK-HISTOLOGY

## related_concept_ids


## approved_file_resource_ids


## approved_video_resource_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## merge_ids


## rejected_merge_candidate_ids


## last_reviewed


## review_due


## exclusion_reason


## learner_years
2

## universities
au

## blueprint_weight
0.3

## exam_weight_by_year
AU_Y2=0.3

## clinical_relevance
0.25

## academic_relevance
0.75

## module_subject
AU-MED-201 > Histology > Ovary

## exam_signal
src_a6e9adda1ad630d28a55 | department_question_bank | undated | p8 q15 | AU-MED-201

## weight_confidence
0.3

## confidence
0.75

## atomic_claim_ids


## resource_ids
src_a6e9adda1ad630d28a55

## original_wording
Which of the following describes the germinal epithelium? A- Continuous with the mesothelium of the tunica vaginalis B- Sheet of ciliated columnar epithelium C- lies outer to the tunica albuginea D- Gives origin to the primordial germ cells. Key: C.

## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
microtopicId: No MIC_ identifier exists for this cluster in the curriculum overlay; module_subject already carries the position.
nanotopicId: The microtopic level is unused here, so a nanotopic beneath it would be finer than the source material distinguishes.
moduleIds: No verified live AU-MED-201 module id has been confirmed in server data yet; module_subject carries curriculum mapping instead.
arabicLabel: No standard Arabic term for this specific fact is in undergraduate use separate from the English technical vocabulary; Alexandria students are taught this in English.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
sourceCandidateIds: Searched via "Instruction Manual for Content Creation/tools/find-existing.mjs" for "germinal epithelium" and "tunica albuginea" across docs/*-Source-Imports/concept/*.md; no genuine match found.
relationships: No typed edge beyond plain topic adjacency found among this batch's other concepts; none written to a relations batch this pass.
au: Mock exam EGU 2023-2024 answers, p8 q15
