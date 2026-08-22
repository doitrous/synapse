<!--
  AU-MED-102 (Foundation of Basic Medical Sciences & Medical Terminology), Anatomy
  department, Year 1. Lane W1-102-ANAT.

  Three kinds of record in this file, in this order:
  1. Sparse updates against ids already LIVE in server/data/medical-library-v1.json
     (HIT-LIVE in the triage) -- id + label + only the fields being changed.
  2. Three NEW concepts, minted with tools/mint-concept-id.mjs after a clean
     >=4-query find-existing + canonical-key grep (both run, both clean -- see
     coverage/AU-MED-102-anatomy-triage.md and this lane's Sec8 report). Full
     records to the 50/52 floor.

  Gates:
  npm run medical:batch -- "docs/Alexandria-Source-Imports/concept/AU-MED-102-anatomy-concepts.md"
  npm run medical:simulate -- "docs/Alexandria-Source-Imports/concept/"*.md --emit /tmp/sim-AU-MED-102-anatomy-concepts.json
  npm run medical:audit -- --source /tmp/sim-AU-MED-102-anatomy-concepts.json
  npm run medical:concept-ids
-->

# Item

## id
CON-MSK-12504AAE2403E8

## label
Anatomical bone classification by shape includes long, short, flat, and irregular bones

## universities
+au

## modules
+AU-MED-102

## exam_signal
src_2df3b7f9b3b393dc1d8f | dept_bank | | p3 | MED 102
src_98e8ccbfb3fe73a8c8e3 | dept_bank | | p2 | MED 102

## field_notes
universityNotes: Alexandria's own bank tests the fuller six-class version (adding pneumatic and sesamoid to this record's four) via the parallel pending record CON-MSK-00B4A0D32A6420 in docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md (see pending-live/AU-MED-102-anatomy.md) -- this live record is updated rather than duplicated, per LANE-BRIEF Sec15 ("a hit in live state -> sparse update record").

---

# Item

## id
CON-HEM-F4A6018FB59FDD

## label
Hematopoiesis is blood-cell formation in bone marrow and lymphatic organs such as thymus

## universities
+au

## modules
+AU-MED-102

## exam_signal
src_2df3b7f9b3b393dc1d8f | dept_bank | | p4 | MED 102
src_98e8ccbfb3fe73a8c8e3 | dept_bank | | p4 | MED 102

## field_notes
universityNotes: Tested as "the bone marrow acts as a factory for the formation of WBCs" (keyed) in both Anatomy/Questions twin banks.

---

# Item

## id
CON-MSK-9E9BBA40F75CE3

## label
shoulder circumduction

## universities
+au

## modules
+AU-MED-102

## field_notes
universityNotes: Foundation of Basic Medical Sciences tests circumduction as the general movement term ("the circular movement is called... circumduction"), not through the shoulder specifically the way this record's own worked example does. The Wagih department-bank item that tests it sits in the file whose printed answer key is OCR-garbled and unaligned to question number (see coverage/AU-MED-102-anatomy-triage.md) -- recorded here as an overlay tag only; no exam_signal line is added because the specific question cannot yet be keyed with confidence.

---

# Item

## id
CON-MSK-DBEEE85B8D5613

## label
A typical vertebra has a body and a neural arch with seven processes, and the presacral regions differ by foramen shape, body size and process direction

## canonical_key
vertebra.structure.typical-and-regional-differences

## aliases
Typical vertebra
Parts of a vertebra
Cervical, thoracic and lumbar vertebrae compared
Vertebral column osteology

## arabic_label
بنية الفقرة النموذجية والفروق بين مناطق العمود الفقري

## arabic_aliases
تركيب الفقرة
مقارنة الفقرات العنقية والصدرية والقطنية

## definition
A typical vertebra is built of an anterior body and a posterior neural arch, the two enclosing the vertebral foramen between them; the arch is formed of a pedicle and a lamina on each side and carries a spinous process, two transverse processes, and superior and inferior articular processes. The column has thirty-three vertebrae in five regions — seven cervical, twelve thoracic, five lumbar, five fused sacral and three or four fused coccygeal — and each region's vertebrae are told apart by the same three features: the shape and size of the vertebral foramen, the presence or absence of costal facets, and the direction the articular processes face. A cervical vertebra has a small body, a wide triangular foramen and a foramen transversarium for the vertebral vessels; a thoracic vertebra has a circular foramen and costal facets for the ribs; a lumbar vertebra has the largest, kidney-shaped body and no costal facets. Adjacent vertebrae are separated by an intervertebral disc and their pedicles' notches together form the intervertebral foramen, through which the spinal nerve leaves — a different opening from the vertebral foramen, which runs the length of the column and holds the spinal cord.

## explicit_objective
Name the parts of a typical vertebra, state how many vertebrae are in each of the five regions, and identify a vertebra as cervical, thoracic or lumbar from its foramen shape, costal facets and body size.

## pitfalls
Treating the vertebral foramen and the intervertebral foramen as the same opening. The vertebral foramen sits between the body and the arch of one vertebra and is stacked, vertebra on vertebra, into the vertebral canal that holds the spinal cord; the intervertebral foramen sits between two adjacent vertebrae's pedicles and transmits one spinal nerve. A student who confuses them will misplace both a cord injury and a nerve-root lesion.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-ANA-T01

## secondary_node_ids

## topic
Anatomy

## subtopic
Basis of Anatomy

## microtopic

## nanotopic

## modules

## article_ids
ART-MSK-VERTEBRA-STRUCTURE

## related_article_ids
ART-MSK-BONE-STRENGTH-SEX-OSTEOPOROSIS

## related_concept_ids

## resource_ids
src_bfb1aee3422c7577592c

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
0.4

## academic_relevance
0.7

## weight_confidence
0.3

## confidence
0.7

## atomic_claim_ids
CLM-MSK-VERTEBRA-STRUCTURE-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Parts of typical vertebrae (33 vertebrae): Body — anterior, weight-bearing component. Neural arch — formed of pedicle and lamina. Vertebral foramen — between body and neural arch. Vertebral canal — collections of vertebral foramen." / "Vertebral column (33 vertebrae): a. Cervical vertebrae = 7 b. Thoracic vertebrae = 12 c. Lumbar vertebrae = 5 d. Sacral vertebrae = 5 (fused) e. Coccygeal vertebrae = 3 or 4 (fused)"

## merge_ids

## rejected_merge_candidate_ids

## conflicts

## uncertainty

## evidence_gaps
Evidence must be attached before publication. Only the general vertebra-parts and regional-count claims are span-linked so far; the per-region distinguishing-feature table (foramen shape, costal facets, body size) still needs its own claim and citation.

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
microtopicId: The canonical placement (DIS-ANA-T01) is already more precise than a further microtopic overlay would add; the curriculum overlay is carried by module_subject on the article instead.
nanotopicId: The microtopic placement is already more precise than any nanotopic would be.
secondaryNodeIds: Searched the taxonomy for a second valid placement (e.g. under a discipline-anatomy locomotor node) and found none that adds information beyond DIS-ANA-T01 — left empty rather than guessed.
moduleIds: No verified live module ID was supplied; curriculum mapping is carried by `modules` on the article and question records instead, per the manual's own module-attachment guidance.
relatedConceptIds: Walked the 17 live concepts under DIS-ANA-T01 (branchial-arch embryology and dermatome territories) — none shares a nameable typed relation with vertebral osteology, so this field is left empty rather than forcing a loose link. The genuine neighbours (bone classification, long-bone structure, joints) are this same lane's own pending-live sparse updates against 101-ISK-mcq-concepts.md, which are not yet live and so are not safe to reference here until that batch is applied.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-102 Anatomy department's own summary sheet (src_bfb1aee3422c7577592c); no pipeline extraction record exists for this corpus.
sourceCandidateIds: This is a NEW concept authored directly from the exam-tested question set (find-existing.mjs run with >=4 queries -- "typical vertebra", "vertebra structure", "vertebral column structure", "vertebral foramen" -- plus `grep -ril vertebra docs/*-Source-Imports/concept/`, both clean; no corpus candidate record exists).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: See relatedConceptIds above.


---

# Item

## id
CON-MSK-D0E73C5156D3AD

## label
Male bones are stronger than female bones, and moderate exercise and dietary calcium slow the osteoporosis that most often fractures the neck of the femur

## canonical_key
bone.strength.sex-difference-and-osteoporosis

## aliases
Sex differences in bone
Osteoporosis risk factors
Bone density and ageing

## arabic_label
قوة العظام: الفروق بين الجنسين وهشاشة العظام

## arabic_aliases
هشاشة العظام
كسر عنق عظمة الفخذ

## definition
Adult male bones are generally longer, heavier and stronger than female bones, because male sex hormones stimulate greater bone deposition throughout growth. Osteoporosis is a common disease in which bone loses calcium and other minerals and becomes lighter and more fragile; it occurs more often in women, particularly after the menopause. Moderate weight-bearing exercise and an adequate dietary calcium intake both slow its progress, while immobility accelerates bone loss instead. The fracture osteoporosis most often causes is fracture of the neck of the femur.

## explicit_objective
State how male and female bones differ in strength, name the factors that slow osteoporosis, and identify fracture of the neck of the femur as its characteristic complication.

## pitfalls
Assuming that any exercise protects against osteoporosis. Only moderate, weight-bearing activity helps; a sedentary or immobilised patient loses bone faster, not more slowly, so "exercise is good for bones" needs the qualifier "moderate and weight-bearing" to be a safe exam answer.

## concept_type
epidemiology

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-ANA-T01

## secondary_node_ids

## topic
Anatomy

## subtopic
Basis of Anatomy

## microtopic

## nanotopic

## modules

## article_ids
ART-MSK-BONE-STRENGTH-SEX-OSTEOPOROSIS

## related_article_ids
ART-MSK-VERTEBRA-STRUCTURE

## related_concept_ids

## resource_ids
src_bfb1aee3422c7577592c

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
0.5

## academic_relevance
0.5

## weight_confidence
0.3

## confidence
0.65

## atomic_claim_ids
CLM-MSK-BONE-STRENGTH-OSTEOPOROSIS-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Usually the male bones are: stronger" / "osteoporosis: Common disease, decrease of calcium and other minerals (bone become lighter), more in women" / "Bane fracture: From the osteoporosis, Common fracture in neck femur (thigh)"

## merge_ids

## rejected_merge_candidate_ids

## conflicts

## uncertainty
The department bank's own worded distractor list for "what slows osteoporosis" includes both "moderate exercise" and "milk and other calcium sources" as separately keyed-correct options across two twin banks — recorded as one combined concept rather than two, since both are the same "modifiable risk factor" idea the exam tests interchangeably.

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
microtopicId: The canonical placement (DIS-ANA-T01) is already more precise than a further microtopic overlay would add.
nanotopicId: The microtopic placement is already more precise than any nanotopic would be.
secondaryNodeIds: This idea sits closer to general/musculoskeletal pathology than to gross anatomy, but no DIS-PAT-* or SYS-MSK-* node names bone density specifically without over-reaching; left empty rather than guessed.
moduleIds: No verified live module ID was supplied; curriculum mapping is carried by `modules` on the article and question records instead.
relatedConceptIds: Walked the 17 live concepts under DIS-ANA-T01 — none addresses bone density or osteoporosis. No typed edge found; left empty rather than forced.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-102 Anatomy department's own summary sheet (src_bfb1aee3422c7577592c); no pipeline extraction record exists for this corpus.
sourceCandidateIds: NEW concept; find-existing.mjs run with >=4 queries ("osteoporosis", "sex difference bone", "bone strength", "bone density") plus `grep -ril osteoporosis docs/*-Source-Imports/concept/`, both clean except one unrelated glossary-term hit (docs/import-ready/glossary/GLOSSARY-WORD-PARTS-001.md, a different content type).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: See relatedConceptIds above.

---

# Item

## id
CON-MSK-816EE3A5FAFECF

## label
The spleen lies against ribs nine to eleven on the left, and its visceral surface carries the gastric, colic, renal and pancreatic impressions around a hilum fed by vessels in the lienorenal ligament

## canonical_key
spleen.gross-anatomy.borders-relations-ligaments

## aliases
Spleen gross anatomy
Splenic borders and impressions
Gastrosplenic and lienorenal ligaments
Spleen rib relations

## arabic_label
التشريح السطحي للطحال

## arabic_aliases
الرباط المعدي الطحالي
الرباط الكلوي الطحالي

## definition
The spleen lies obliquely along the long axis of the ninth, tenth and eleventh ribs on the left side, its medial end directed upwards and backwards and its broad lateral end directed downwards and forwards, behind the mid-axillary line. It has a sharp, notched upper border and a broad lower border, with a middle border running from the medial end to the hilum. Its convex diaphragmatic surface is separated from the left diaphragmatic pleura, the base of the left lung, and the posterior parts of the ninth, tenth and eleventh ribs by the diaphragm; its concave visceral surface carries four impressions around the hilum — the gastric impression above the hilum for the fundus of the stomach, the colic impression near the lateral end for the splenic flexure, the renal impression below the hilum for the left kidney, and the pancreatic impression below the lateral end for the tail of the pancreas. The spleen is attached by the gastrosplenic ligament to the greater curvature of the stomach and by the lienorenal ligament to the anterior surface of the left kidney; the splenic artery and vein both run to and from the hilum within the lienorenal ligament.

## explicit_objective
Locate the spleen by its rib relations and borders, name its four visceral impressions and say what organ each faces, and explain why the splenic vessels are found in the lienorenal ligament.

## pitfalls
Naming the impression immediately above the hilum as the renal impression. The renal impression lies below the hilum, against the left kidney; the impression above the hilum is the gastric impression, for the fundus of the stomach. Getting the two swapped also inverts which viscus is put at risk in a splenic injury approached from above versus below.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-ANA-T01

## secondary_node_ids

## topic
Anatomy

## subtopic
Basis of Anatomy

## microtopic

## nanotopic

## modules

## article_ids
ART-MSK-SPLEEN-GROSS-ANATOMY

## related_article_ids
ART-MSK-VERTEBRA-STRUCTURE

## related_concept_ids

## resource_ids
src_bfb1aee3422c7577592c

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
0.6

## academic_relevance
0.6

## weight_confidence
0.35

## confidence
0.7

## atomic_claim_ids
CLM-MSK-SPLEEN-GROSS-ANATOMY-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Spleen= parallel to ribs 9,10 and 11 of left side" / "Upper border: Sharp(has splenic notches). Lower border: Broad." / "Gastric impression: Above hilum, below upper border. Renal impression (kidney): Small, shallow, below hilum, above lower border." / "Attached to the following: Gastrosplenic ligament — Between fundus and greater curvature of stomach to hilum of spleen. Lienorenal ligament — Between lower border of hilum of spleen to anterior surface of kidney."

## merge_ids

## rejected_merge_candidate_ids

## conflicts

## uncertainty

## evidence_gaps
Evidence must be attached before publication. The four visceral impressions are described in the definition but only the borders/ribs/ligament claims are span-linked so far.

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
microtopicId: The canonical placement (DIS-ANA-T01) is already more precise than a further microtopic overlay would add.
nanotopicId: The microtopic placement is already more precise than any nanotopic would be.
secondaryNodeIds: The live graph's existing spleen concepts (104-CPS-practical-concepts, histology-grained) sit on a different node than gross anatomy would; no secondary placement was found that adds information without over-reaching, left empty rather than guessed.
moduleIds: No verified live module ID was supplied; curriculum mapping is carried by `modules` on the article and question records instead.
relatedConceptIds: Walked the 17 live concepts under DIS-ANA-T01 — none addresses the spleen or abdominal viscera. The live histology-grained spleen concepts (CON-FND-* under 104-CPS-practical-concepts) describe white/red pulp and circulation, a different grain from gross topography, so no typed edge was written between them; noted rather than forced.
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept yet.
resourceOccurrenceIds: Hand-authored from the AU-MED-102 Anatomy department's own summary sheet (src_bfb1aee3422c7577592c); no pipeline extraction record exists for this corpus.
sourceCandidateIds: NEW concept; find-existing.mjs run with >=4 queries ("spleen borders", "spleen ligament", "gastrosplenic", "lienorenal") plus `grep -ril gastrosplenic\|lienorenal docs/*-Source-Imports/concept/`, both clean.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: See relatedConceptIds above.
