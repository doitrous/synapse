<!--
  103 BMS · Histology · concepts

  Five concepts, covering the four written questions printed as Section 4 of
  `EOY (BMS - 103) 199 (2).pdf` (manifest src_37f6c0daf3436096af19), pages 19-21.

  How the two "compare" questions resolved into concepts, under
  00-START-HERE.md §4's tiebreaker — "could one record answer both questions
  without becoming two paragraphs stapled together?":

  Q1, "Compare between Reticular layer and Papillary layer" → ONE concept.
  The department book never describes either layer on its own. It prints them
  only as a single paired table (p42 of the file, printed page 41), row by row:
  thickness, connective-tissue density, cellularity, fibre type, vascularity,
  receptors. The idea being examined is the discrimination itself, and one
  record states it without stapling.

  Q2, "Compare between Osteoblast and Osteoclast" → TWO concepts.
  The same book gives each cell a full column of its own — origin, site, L.M.,
  E.M., functions — on pages 11 and 12, and the two sit in different columns of
  different tables. A question could test the osteoblast's protein-secreting
  ultrastructure without mentioning the osteoclast, and does: the objectives are
  separate. The two are cross-linked in related_concept_ids, and the written
  question names both in main_concept so both earn mastery.

  What the paper asked and this batch does NOT contain: the paper prints
  "+5 MCQ about cartilage chapter" at the foot of page 21. Those five MCQs are
  not reproduced anywhere in the document. Five cartilage MCQs were sat and are
  missing from the corpus — a real gap in coverage, not an empty set. No
  cartilage concept is authored here, because nothing states what was asked.

  TWO KINDS OF RECORD IN THIS FILE.

  Records 1-5 are NEW concepts, written to the full column contract.

  Records 6-8 are UPDATES to live concepts — `id`, `label` so the validator can
  still classify the record, and only the fields being changed. Everything else
  is omitted deliberately, so the live value survives. `medical:batch` judges
  every record as though it were new and will therefore report missing
  objectives, definitions and placements for records 6-8; those are the tool,
  not the work. `medical:simulate` is what proves them, with created: 0.

  Every one of the 2,353 live concepts carries moduleIds: []. The three updates
  exist because these records teach material from this department book and this
  module, and nothing in live state says so. They gain `modules`,
  `module_subject`, and the aliases, pitfalls and Arabic label that the
  extraction pipeline left blank with a note.

  DUPLICATE SEARCH. Every hit below was read in full — label, definition,
  aliases, canonical key, placement — before being kept or dismissed. The
  searches were run twice: through find-existing.mjs, and again directly over
  label + definition + aliases + canonicalKey of all 1,718 live concepts,
  because a subject-filtered count is misleading here. 736 live concepts still
  carry the legacy subjectId "medical", and every one of the 57 CON-DER-*
  records is among them, so "derm has no concepts" would have been a false
  clear.

  papillary — 10 live concepts. Three are cardiac papillary muscle
  (CON-CVS-4ABA568F6D69F1, -334F674BA1244E, -25C53C42DCA293). Three are
  papillary thyroid carcinoma (CON-END-EDC1E817A58E63, -BE56B2E7C03234,
  -0DA0FD2E94A77D). Two are papillary bladder tumours (CON-REN-95F19D57F25A2B,
  -A6AEEA7A18934B). One is the renal collecting system
  (CON-REN-BBA1BFAE641DB8). One is the arrector pili reaching the papillary
  dermis (CON-DER-A4BD56E5027310) — a genuine near-miss, kept, cross-linked and
  updated as record 8. None is the dermal papillary layer.

  reticular — 5 live concepts, all reticular fibres, the reticular activating
  system, or the adrenal zona reticularis. None is the reticular layer.

  dermis — 6 live concepts: four dermatopathology records on DIS-PAT-T07
  (nevus, basal-cell carcinoma, squamous-cell carcinoma, melanoma), plus
  apocrine ducts and the arrector pili. epiderm — 2: follicular stem cells after
  epidermal injury (CON-DER-92BE42466559D5, which is the book's "Epidermal stem
  cells", not the dermis) and S. epidermidis. None describes the dermal layers.

  osteoblast — 1: CON-MSK-967E873EEEACE0, the four-bone-cell enumeration, which
  is record 6. osteoclast — 3: that same record plus two calcium-homeostasis
  physiology concepts (CON-END-113A6621B654E8, CON-END-ECB5A7408FF5F9).
  bone — 35, of which the live CON-MSK-* histology cluster on DIS-HIS-T03 was
  read item by item: coverings and matrix (-73194853F85AEC, -0E9A4639848229,
  -52DC4C4BF9126D, -776EFBBA474279), classification (-12504AAE2403E8),
  decalcification (-FF2CB25DA57944), growth (-CCDCEC8F7ACBC0), the Haversian
  system (-5DF0AED914A81E) and five function statements. Not one of them
  describes a bone cell's origin, site, L.M. or E.M. picture. The rest of the 35
  are bone marrow, radiology and hip anatomy, dismissed on reading.

  cardiac muscle — 2: afterload (physiology) and cardiac muscle from splanchnic
  mesoderm (embryology). Neither concerns the intercalated disc.

  smooth muscle — 5: PDGF in wound repair, and four records on where smooth
  muscle lies in the airway. None describes its ultrastructure.

  intercalated, caveolae, dense bodies, desmin, Howship, ruffled, sarcolemma,
  myofibril, fascia adherens, corkscrew, Pacinian, osteoid, alkaline phosphatase
  — no existing record of any kind.
-->

# Item

## id
CON-DER-56784AB396C13E

## label
The papillary and reticular layers of the dermis
## canonical_key
dermis.layers.papillary-reticular

## aliases
Papillary layer
Reticular layer
Layers of the dermis
Papillary versus reticular dermis
Stratum papillare and stratum reticulare

## arabic_label
طبقتا الأدمة: الطبقة الحليمية والطبقة الشبكية

## arabic_aliases
الطبقة الحليمية
الطبقة الشبكية
الأدمة الحليمية والأدمة الشبكية

## definition
The **dermis** is formed of two layers: a superficial __papillary layer__ and a deep __reticular layer__.

The **papillary layer** is the thinner, superficial layer and forms the dermal papillae. It is loose connective tissue, more cellular, and carries fine **type III collagen** and elastic fibres. It is __more vascular because it nourishes the avascular epidermis__, and it contains **Meissner's corpuscles**.

The **reticular layer** is the thicker, deep layer of dense connective tissue. It is less cellular, carries **type I collagen** in bundles with elastic fibres, and is __less vascular__. It contains **Pacinian corpuscles**, Ruffini's end organs and Krause's end bulbs.
## explicit_objective
Distinguish the papillary layer of the dermis from the reticular layer on thickness and position, connective-tissue density, cellularity, fibre type, vascularity and the encapsulated receptors each contains.

## pitfalls
Assuming the epidermis carries its own blood vessels. It is avascular and fed by diffusion, which is exactly why the papillary layer is the more vascular of the two — a student who forgets this loses the reason for the difference and has to memorise it instead.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
derm

## primary_node_id
DIS-HIS-T03

## secondary_node_ids
DIS-HIS-T02 | DIS-HIS-T04

## topic
Organ histology

## subtopic
Integumentary System

## microtopic
The Dermis

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Histology > Integumentary System > The Dermis

## article_ids
ART-103-HIS-DERMIS-LAYERS

## related_article_ids
ART-103-HIS-DERMIS-LAYERS
ART-103-HIS-SKIN-THICK-THIN-JUNCTION

## related_concept_ids
CON-DER-A4BD56E5027310

## resource_ids
src_2bf25a6864c9f6ce3283

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.5

## exam_weight_by_year
KAU_Y1=0.5

## clinical_relevance
0.35

## academic_relevance
0.9

## weight_confidence
0.3

## confidence
0.9

## exam_signal
src_37f6c0daf3436096af19 | end_of_year | 2025 | p19 | 103 BMS

## atomic_claim_ids
CLM-DER-DERMIS-LAYERS-01 | CLM-DER-DERMIS-LAYERS-02

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Histology Q1, 3 Marks] Compare between Reticular layer and Papillary layer.
"Formed of 2 layers: Papillary layer and Reticular layer."
"Deeo Connective tissue under epidermis."

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-DER-A4BD56E5027310

## conflicts
[clear]

## uncertainty
The book lists adipocytes among the cells of both layers without saying where in the dermis they actually lie; adipose tissue proper belongs to the hypodermis, which the same book excludes from the skin. The two statements are not reconciled in the text.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

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
microtopicId: The department book's own section, "The Dermis", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-HIS-T03.
nanotopicId: The microtopic "The Dermis" is already the finest level the department book's own chapter structure names; a nanotopic would be invented.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the micrograph it needs is requested on ART-103-HIS-DERMIS-LAYERS.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book and the 2025 end-of-year paper; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "papillary", "reticular", "dermis" and "dermal" — the hits are papillary muscle, reticular fibres, adrenal zona reticularis and dermal tumours, none of which is a candidate for this concept.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
rejectedMergeCandidateIds: CON-DER-A4BD56E5027310 (arrector pili reaching the papillary dermis) names the papillary layer but is a concept about a muscle, not about the two dermal layers. Deliberately not merged; cross-linked instead.
relationships: Walked the CON-DER-* concepts on DIS-HIS-T03 and the CON-MSK-* concepts in this batch. Only same-topic proximity to the arrector pili concept; no typed edge holds between the dermal layers and anything already live, so no relations batch was written. The osteoblast/osteoclast pair in this file does carry a typed contrast and is recorded in each other's related_concept_ids pending a relations batch the lead has not scoped.

---

# Item

## id
CON-MSK-D137ADEEC56243

## label
The osteoblast: the bone-forming cell
## canonical_key
osteoblast.structure.origin-site-lm-em

## aliases
Osteoblast
Bone forming cell
Bone-forming cell
Negative Golgi image
Osteoid-secreting cell

## arabic_label
الخلية بانية العظم

## arabic_aliases
بانية العظم
الخلايا البانية للعظم
أوستيوبلاست

## definition
The **osteoblast** is the __bone-forming cell__. It arises from **osteogenic (osteoprogenitor) cells** and lies as a continuous single layer immediately under the periosteum, covering the bone surface, and under the endosteum.

By **light microscopy** it is an oval cell with a few minute processes and an eccentric nucleus. Its cytoplasm is darkly basophilic with a negative Golgi image beside the nucleus, and it is __rich in alkaline phosphatase__.

By **electron microscopy** it shows the characters of a **protein-forming cell**: abundant rough endoplasmic reticulum, mitochondria and a well-developed Golgi apparatus.
## explicit_objective
State the origin, site, light-microscopic and electron-microscopic features of the osteoblast, and explain why its ultrastructure is that of a protein-secreting cell.

## pitfalls
Reading the pale area beside the nucleus as an artefact or as damage. It is the negative Golgi image — the Golgi apparatus excludes the basic dye that stains the rest of the cytoplasm — and it is positive evidence that the cell is actively laying down matrix.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-HIS-T02

## secondary_node_ids
DIS-HIS-T01 | DIS-HIS-T04

## topic
Basic tissues

## subtopic
Bone

## microtopic
Bone Cells

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Histology > Bone > Bone Cells

## article_ids
ART-103-HIS-BONE-CELLS

## related_article_ids
ART-103-HIS-BONE-CELLS

## related_concept_ids
CON-MSK-76CE11C6DCDC37 | CON-MSK-967E873EEEACE0

## resource_ids
src_2bf25a6864c9f6ce3283

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.7

## exam_weight_by_year
KAU_Y1=0.7

## clinical_relevance
0.45

## academic_relevance
0.95

## weight_confidence
0.3

## confidence
0.9

## exam_signal
src_37f6c0daf3436096af19 | end_of_year | 2025 | p20 | 103 BMS

## atomic_claim_ids
CLM-MSK-OSTEOBLAST-01 | CLM-MSK-OSTEOBLAST-02

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Histology Q2, 6 Marks] Compare between Osteoblast and Osteoclast regarding (origin, site, LM and EM)
"Darkly basophilic cytoplasm with a negative Golgi image near nucleus."
"Characters of protein forming cells. They are rich in rER, mitochondria & a well-developed Golgi apparatus."

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-MSK-967E873EEEACE0 | CON-MSK-73194853F85AEC

## conflicts
[clear]

## uncertainty
The book gives no size for the osteoblast, saying only that "size of the cell depends on its activity", so no dimension can be quoted for it as one can for the osteoclast's nuclear count.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

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
microtopicId: The department book's own section, "Bone Cells", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-HIS-T02.
nanotopicId: "Bone Cells" is the finest heading the department book prints under Bone; a nanotopic below it would be invented.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the fields it needs are requested on ART-103-HIS-BONE-CELLS.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book and the 2025 end-of-year paper; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "osteoblast", "osteoid", "alkaline phosphatase" and "bone cell" — the only hits are the live enumeration concept and its claim, neither of which is a candidate record for this one.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
rejectedMergeCandidateIds: CON-MSK-967E873EEEACE0 "Bone cells include osteogenic cells, osteoblasts, osteocytes, and osteoclasts" is an enumeration; its objective is to list the four cells, not to describe one of them on four axes. CON-MSK-73194853F85AEC "Bone comprises periosteal/endosteal coverings, bone cells, and extracellular matrix" is a level above that again. Neither merged; both cross-linked.
relationships: Walked the CON-MSK-* concepts on DIS-HIS-T02 and DIS-HIS-T03 and the live bone concepts CON-MSK-967E873EEEACE0 and CON-MSK-73194853F85AEC. Two typed edges genuinely hold — contrasts_with to CON-MSK-76CE11C6DCDC37 and part_of to CON-MSK-967E873EEEACE0 — but the lead scoped no relations file for this module, so they are recorded here and in related_concept_ids rather than written as a batch nobody claimed.

---

# Item

## id
CON-MSK-76CE11C6DCDC37

## label
The osteoclast: the bone-resorbing cell
## canonical_key
osteoclast.structure.origin-site-lm-em

## aliases
Osteoclast
Bone destroying cell
Bone-destroying cell
Howship's lacuna
Ruffled border

## arabic_label
الخلية هادمة العظم

## arabic_aliases
هادمة العظم
الخلايا الهادمة للعظم
أوستيوكلاست

## definition
The **osteoclast** is the __bone-destroying cell__. It is formed by **fusion of mononuclear haemopoietic progenitor cells** and lies on the bone surface near the bone marrow, inside an excavation called **Howship's lacuna**.

By **light microscopy** it is a large irregular cell with __6 to 12 nuclei__ and foamy acidophilic cytoplasm, showing a brush border against the nearby bony surface.

By **electron microscopy** that brush border is a __ruffled surface bearing microvilli__, and the cytoplasm is rich in lysosomes, mitochondria and Golgi apparatus and shows multiple vesicles.
## explicit_objective
State the origin, site, light-microscopic and electron-microscopic features of the osteoclast, and explain why a bone-resorbing cell is multinucleated, ruffled and lysosome-rich.

## pitfalls
Deriving the osteoclast from the osteogenic cell, as if it were an osteoblast that changed its mind. It comes from the haemopoietic line and is made by fusion — which is why it is multinucleated and the osteoblast never is.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-HIS-T02

## secondary_node_ids
DIS-HIS-T01 | DIS-HIS-T04

## topic
Basic tissues

## subtopic
Bone

## microtopic
Bone Cells

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Histology > Bone > Bone Cells

## article_ids
ART-103-HIS-BONE-CELLS

## related_article_ids
ART-103-HIS-BONE-CELLS

## related_concept_ids
CON-MSK-D137ADEEC56243 | CON-MSK-967E873EEEACE0

## resource_ids
src_2bf25a6864c9f6ce3283

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.7

## exam_weight_by_year
KAU_Y1=0.7

## clinical_relevance
0.55

## academic_relevance
0.95

## weight_confidence
0.3

## confidence
0.9

## exam_signal
src_37f6c0daf3436096af19 | end_of_year | 2025 | p20 | 103 BMS

## atomic_claim_ids
CLM-MSK-OSTEOCLAST-01 | CLM-MSK-OSTEOCLAST-02

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Histology Q2, 6 Marks] Compare between Osteoblast and Osteoclast regarding (origin, site, LM and EM)
"Fusion of mononuclear hemopoietic progenitor cells."
"Osteoclast has a ruffled surface which shows microvilli"

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-MSK-967E873EEEACE0 | CON-END-113A6621B654E8 | CON-MSK-73194853F85AEC

## conflicts
[clear]

## uncertainty
The book calls the same structure a "brush border" in its L.M. row and a "ruffled surface which shows microvilli" in its E.M. row without saying they are one structure seen at two magnifications. That reading is the obvious one but the book does not state it.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

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
microtopicId: The department book's own section, "Bone Cells", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-HIS-T02.
nanotopicId: "Bone Cells" is the finest heading the department book prints under Bone; a nanotopic below it would be invented.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the fields it needs are requested on ART-103-HIS-BONE-CELLS.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book and the 2025 end-of-year paper; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "osteoclast", "howship", "ruffled" and "multinucleated" — only "osteoclast" returns anything, and those are live concepts and claims rather than candidate records.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
rejectedMergeCandidateIds: CON-MSK-967E873EEEACE0 is the four-bone-cell enumeration and CON-MSK-73194853F85AEC the coverings-cells-matrix enumeration above it, both a different grain from this record. CON-END-113A6621B654E8 "Activated osteoclasts resorb organic and inorganic bone matrix and release calcium, phosphate, and hydroxyproline" is calcium-homeostasis physiology on DIS-PHY-T06, not the cell's origin, site or appearance. None merged.
relationships: Walked the same node set as CON-MSK-D137ADEEC56243. A contrasts_with edge to the osteoblast and a part_of edge to CON-MSK-967E873EEEACE0 genuinely hold; no relations file is scoped for this module, so they are recorded here and in related_concept_ids.

---

# Item

## id
CON-MSK-0DEAF126DF8F2E

## label
The intercalated disc: transverse and lateral parts
## canonical_key
cardiac.intercalated-disc.lm-em

## aliases
Intercalated disc
Intercalated discs
Fascia adherens
Transverse and lateral components of the intercalated disc
Cardiac cell junction

## arabic_label
القرص البيني في العضلة القلبية

## arabic_aliases
الأقراص البينية
القرص المقحم
إنترکاليتد ديسك

## definition
**Intercalated discs** are the junctions between the sarcolemmas of adjacent cardiac muscle cells within a fibre. By **light microscopy** they are clear lines that cross the fibre transversely at intervals along its length.

By **electron microscopy** each disc has two regions. The __transverse component__ crosses the fibre; **desmosomes** and adherent junctions (**fascia adherens**) sit here and bind the cells firmly so they do not separate during repetitive contraction.

The __lateral component__ lies parallel to the fibre; **gap junctions** sit here and let contraction signals pass from cell to cell, and their lateral position shelters them from the contraction forces.
## explicit_objective
Describe the intercalated disc as it appears by light microscopy and by electron microscopy, and say which junction lies in which component and what each one does.

## pitfalls
Treating the disc as a single flat plate across the fibre. Its two components lie in different orientations and do different jobs — mechanical anchorage across the fibre, electrical coupling along it — and putting the gap junctions in the transverse part destroys the reason they survive contraction.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-HIS-T02

## secondary_node_ids
DIS-HIS-T04 | SYS-CVS-T01

## topic
Basic tissues

## subtopic
Muscle Tissue

## microtopic
Cardiac Muscle

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Histology > Muscle Tissue > Cardiac Muscle

## article_ids
ART-103-HIS-CARDIAC-INTERCALATED-DISC

## related_article_ids
ART-103-HIS-CARDIAC-INTERCALATED-DISC

## related_concept_ids
CON-MSK-888DFA3AA4E974 | CON-MSK-E36936D62038BF | CON-MSK-2E451ACE10A724 | CON-MSK-5EA95D36121EF8

## resource_ids
src_2bf25a6864c9f6ce3283

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.5

## exam_weight_by_year
KAU_Y1=0.5

## clinical_relevance
0.5

## academic_relevance
0.9

## weight_confidence
0.3

## confidence
0.9

## exam_signal
src_37f6c0daf3436096af19 | end_of_year | 2025 | p21 | 103 BMS

## atomic_claim_ids
CLM-MSK-INTERCALATED-DISC-01 | CLM-MSK-INTERCALATED-DISC-02

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Histology Q3, 3 Marks] Mention LM and EM picture of Intercalated disc.
"By LM, intercalated discs are clear lines that appear transversely at intervals along the length of cardiac muscle fiber."
"Their position in the lateral parts of the disc protect them from the contraction forces"

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book writes both "adherent junctions" and "fascia adherens" for the same structure in one sentence and does not say whether the fascia adherens is a kind of adherent junction or a synonym for it. The standard reading is that they are the same thing, but the text does not settle it.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

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
microtopicId: The department book's own section, "Cardiac Muscle", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-HIS-T02.
nanotopicId: "Cardiac Muscle" is the finest heading the department book prints under Muscle Tissue; a nanotopic below it would be invented.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the micrographs it needs are requested on ART-103-HIS-CARDIAC-INTERCALATED-DISC and on the written question.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book and the 2025 end-of-year paper; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "intercalated", "intercalated disc", "fascia adherens" and "gap junction" — the first three return nothing at all and the fourth returns an oocyte concept, so no candidate record exists.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
rejectedMergeCandidateIds: Nothing was found to reject. "intercalated", "intercalated disc" and "fascia adherens" each returned no existing record of any kind.
relationships: Walked the live CON-MSK-* muscle concepts, of which CON-MSK-E36936D62038BF (A and I bands producing striations) is the only near neighbour, and the two muscle concepts in this batch. A contrasts_with edge to CON-MSK-888DFA3AA4E974 holds — the cardiac fibre is striated and coupled by discs, the smooth is neither. No relations file is scoped for this module, so it is recorded here.

---

# Item

## id
CON-MSK-2E451ACE10A724

## label
The cardiac muscle fibre and its myocytes
## canonical_key
cardiac-muscle.fibre.lm-em-structure

## aliases
Cardiac myocyte
Cardiac muscle fibre
Diad tubular system
Atrial granules
Lipofuscin granules
Brown atrophy of the heart

## arabic_label
البنية النسيجية لليفة العضلة القلبية بالمجهرين الضوئي والإلكتروني

## arabic_aliases
الخلية العضلية القلبية
الجهاز الأنبوبي الثنائي
الحبيبات الأذينية
حبيبات الليبوفسين

## definition
Each **cardiac muscle fibre** is made up of many separate cardiac myocytes linked to each other.

By **light microscopy** a cardiac myocyte is a cylindrical cell about **80 micrometres long and 15 micrometres in diameter** that branches and joins adjacent cells. Its sarcolemma is a thin cell membrane; its nucleus is __single (occasionally two), oval and central__; and its acidophilic sarcoplasm shows non-clear transverse striations (less distinct than skeletal muscle) and intercalated discs.

By **electron microscopy** the sarcoplasm holds __fewer myofibrils than skeletal muscle__; numerous large mitochondria with closely packed cristae; and a sarcoplasmic reticulum less developed than in skeletal muscle that forms, with the T-tubule, a **diad (not a triad) tubular system** at the level of the Z line.

Its inclusions are **glycogen granules**; **lipofuscin granules**, which accumulate with age to form brown atrophy of the heart; and, in atrial muscle cells only, **atrial granules** containing atrial natriuretic hormones that affect urinary sodium and water excretion — __giving atrial muscle cells an endocrine function as well as a contractile one__.
## explicit_objective
State the light-microscopic size, shape, sarcolemma and nucleus of a cardiac myocyte, and its electron-microscopic organelles (myofibrils, mitochondria, diad tubular system) and inclusions (glycogen, lipofuscin, atrial granules), including the endocrine role of atrial granules.

## pitfalls
Assuming cardiac muscle has a triad tubular system like skeletal muscle. Its T-tubule pairs with only one terminal cisterna of sarcoplasmic reticulum, at the level of the Z line, forming a diad, not a triad at the A-I junction — the tubular-system row is one of the rows the comparison table tests directly.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-HIS-T02

## secondary_node_ids
DIS-HIS-T04 | SYS-CVS-T01

## topic
Basic tissues

## subtopic
Muscle Tissue

## microtopic
Cardiac Muscle

## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Histology > Muscle Tissue > Cardiac Muscle

## article_ids
ART-103-HIS-CARDIAC-INTERCALATED-DISC

## related_article_ids
ART-103-HIS-CARDIAC-INTERCALATED-DISC

## related_concept_ids
CON-MSK-0DEAF126DF8F2E | CON-MSK-5EA95D36121EF8 | CON-MSK-2493DDAE4798CE

## resource_ids
src_2bf25a6864c9f6ce3283

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.45

## exam_weight_by_year
KAU_Y1=0.5

## clinical_relevance
0.4

## academic_relevance
0.9

## weight_confidence
0.3

## confidence
0.85

## exam_signal
src_7272bde5a8d524835d9b | department_questions | 2026 | p24-25 | 103 BMS

## atomic_claim_ids
CLM-MSK-CARDIAC-FIBRE-STRUCTURE-01 | CLM-MSK-CARDIAC-FIBRE-STRUCTURE-02

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[LM picture] "Cardiac muscle cell is characterized by: 80µm in length. Shape: Cylindrical cells. Size: about 15µm in diameter & branch and join to adjacent cells. Sarcolemma: Thin cell membrane. Nucleus: single (may be two), oval & central in each cardiac myocyte. Sarcoplasm: by LM, is acidophilic, exhibits non-clear transverse striations and intercalated discs."
[EM picture] "Myofibrils: Less than in skeletal muscle. Mitochondria: numerous, large with closely packed cristae. Sarcoplasmic reticulum: less in number, development and organization than in skeletal muscle. Its arrangement with T- tubule takes the form of Diad (Not triad) tubular system at level of Z- line." "Glycogen granules. Lipofuscin granules: accumulate to be abundant in old age, forming brown atrophy of the heart. Atrial granules: present in muscle cells of heart atria. They contain atrial natriuretic hormones which affect urinary excretion of sodium & water balance. So, muscle cells of heart's atria also have an endocrine function."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book gives the myocyte's length as 80µm without saying whether this is a value for a single myocyte between intercalated discs or for the fibre as a whole, given the fibre itself is defined as "many separate cells... linked to each other."

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

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
microtopicId: The department book's own section, "Cardiac Muscle", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-HIS-T02.
nanotopicId: "Cardiac Muscle" is the finest heading the department book prints under Muscle Tissue; a nanotopic below it would be invented.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; a micrograph is requested on ART-103-HIS-CARDIAC-INTERCALATED-DISC.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book and the department's own Histology written-assessment revision set (Q5); this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "cardiac myocyte", "diad", "atrial granules" and "lipofuscin" — the cardiac myocyte hits are all cardiovascular physiology (action-potential ionic basis), not histological structure, and the other three terms return nothing.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
rejectedMergeCandidateIds: Nothing was found to reject.
relationships: This is the general LM/EM structure of a cardiac myocyte, distinct from CON-MSK-0DEAF126DF8F2E (which owns only the intercalated disc's own two-component structure) and from CON-MSK-5EA95D36121EF8 (Purkinje fibres, a specialised cardiac fibre this record's own features are contrasted against). Cross-linked to CON-MSK-2493DDAE4798CE, the equivalent skeletal-muscle-fibre record, as the nearest same-shape neighbour. This is one of the four topics the department's own Histology written-assessment (src_7272bde5a8d524835d9b, Q5) asks that no article covered until this batch — see the lane report.

---

# Item

## id
CON-MSK-5EA95D36121EF8

## label
Purkinje fibres of the conducting system
## canonical_key
cardiac-muscle.purkinje-fibres.histological-characteristics

## aliases
Purkinje muscle fibres
Purkinje fibres
Moderator band
Atrioventricular bundle fibres
Conducting fibres of the heart

## arabic_label
ألياف بوركنجي القلبية

## arabic_aliases
الألياف الموصلة للقلب
الحزمة المعتدلة
ألياف بوركنجى

## definition
**Purkinje muscle fibres** are highly specialised cardiac muscle fibres that constitute the **atrioventricular (A-V) bundle** and its branches; the **moderator band** in the right ventricle contains Purkinje fibres.

They __rapidly transmit the contractile impulse__ to the ventricular muscle via **gap junctions**, faster than ordinary myocardium, and are grouped into bundles surrounded by a connective-tissue sheath.

Histologically they are __larger in diameter__ than ordinary cardiac fibres, with a usually eccentric nucleus and pale, vacuolated sarcoplasm from excess glycogen. They show **no striations** because their few myofibrils lie peripherally, parallel to the sarcolemma, and they carry **no intercalated discs**.
## explicit_objective
Define Purkinje muscle fibres by site and function (the moderator band, the A-V bundle and its branches, and rapid gap-junction conduction faster than ordinary myocardium), and list the five histological features — diameter, nucleus position, sarcoplasm, striations, intercalated discs — that distinguish them from an ordinary cardiac myocyte.

## pitfalls
Assuming a specialised conducting cardiac fibre must still carry intercalated discs because it is cardiac muscle. Purkinje fibres carry gap junctions, which give the speed, but no intercalated discs at all — the fastest-conducting cardiac fibre is the one built for signal speed rather than the mechanical anchorage ordinary myocardium needs to contract as one.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-HIS-T02

## secondary_node_ids
DIS-HIS-T04 | SYS-CVS-T01

## topic
Basic tissues

## subtopic
Muscle Tissue

## microtopic
Cardiac Muscle

## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Histology > Muscle Tissue > Cardiac Muscle

## article_ids
ART-103-HIS-CARDIAC-INTERCALATED-DISC

## related_article_ids
ART-103-HIS-CARDIAC-INTERCALATED-DISC

## related_concept_ids
CON-MSK-0DEAF126DF8F2E | CON-MSK-2E451ACE10A724

## resource_ids
src_2bf25a6864c9f6ce3283

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.45

## exam_weight_by_year
KAU_Y1=0.5

## clinical_relevance
0.55

## academic_relevance
0.9

## weight_confidence
0.3

## confidence
0.85

## exam_signal
src_7272bde5a8d524835d9b | department_questions | 2026 | p26 | 103 BMS

## atomic_claim_ids
CLM-MSK-PURKINJE-FIBRES-01 | CLM-MSK-PURKINJE-FIBRES-02

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Purkinje Muscle Fibers] "Moderator band is located in the right ventricle and it contains Purkinje muscle fibers." "Purkinje muscle fibers are highly specialized cardiac muscle fibers that constitute atrioventricular (A –V) bundle & its branches." "They rapidly transmit the contractile impulses to various parts of ventricular cardiac muscle cells via gap junctions, faster than the ordinary myocardium."
[Histological characteristics of purkinje fibers] "They are larger in diameter, than ordinary cardiac muscle fibers. Nucleus: usually eccentric in position. Sarcoplasm: pale & vacuolated (due to excess glycogen). No striations appear in the sarcoplasm due to few myofibrils, which are peripherally situated parallel to sarcolemma. No intercalated discs."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book states Purkinje fibres carry no intercalated discs but does not say whether they retain any tubular system (diad, triad, or none) at all — the silence is not the same as a stated absence, and this record does not assert one.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

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
microtopicId: The department book's own section, "Cardiac Muscle", is written in `microtopic` as a title and carried precisely by `module_subject`; "Purkinje Muscle Fibers" is the book's own sub-heading within it, but the canonical tree stops at DIS-HIS-T02 so it resolves to no `MIC_` node.
nanotopicId: A nanotopic below "Cardiac Muscle" would be invented; the book prints no heading finer than "Purkinje Muscle Fibers", which is carried in `aliases` instead.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the book's own labelled Purkinje-cell diagram is requested on ART-103-HIS-CARDIAC-INTERCALATED-DISC.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book and the department's own Histology written-assessment revision set (Q7); this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "Purkinje" — every hit is either cerebellar Purkinje cells (104 CPS neuro), the cardiac conduction system's function in 104 CPS anatomy/physiology, or the 103 BMS glossary term; none states the histological LM characteristics this record owns.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
rejectedMergeCandidateIds: The live CON-NEU-* Purkinje-cell records (cerebellum) and the 104 CPS conduction-system concepts were read and rejected — cerebellar Purkinje cells are neurons, not cardiac muscle, and the 104 CPS records state the conduction pathway's function, not this fibre's own histological picture.
relationships: Cross-linked to CON-MSK-0DEAF126DF8F2E (intercalated disc — the junction Purkinje fibres are explicitly stated to lack) and CON-MSK-2E451ACE10A724 (the ordinary cardiac myocyte this record's every feature is contrasted against). This is one of the four topics the department's own Histology written-assessment (src_7272bde5a8d524835d9b, Q7) asks that no article covered until this batch — see the lane report.

---

# Item

## id
CON-MSK-B080975D6171CF

## label
Skeletal, cardiac and smooth muscle compared
## canonical_key
muscle-tissue.three-types.comparison-table

## aliases
Differences between the three types of muscle fibers
Skeletal versus cardiac versus smooth muscle
Comparison of muscle types
Muscle fibre comparison table
Three types of muscle fibers table

## arabic_label
الفروق بين الأنواع الثلاثة للألياف العضلية

## arabic_aliases
مقارنة العضلات الهيكلية والقلبية والملساء
جدول الفروق بين أنواع الأنسجة العضلية

## definition
The department book's summary table sets the **three muscle types** side by side across fourteen features.

**Site:** skeletal muscle attaches to bone, cardiac muscle forms the heart wall, smooth muscle lies in the wall of the viscera. **Size:** skeletal fibres are largest, cardiac medium, smooth smallest. **Single fibre:** a skeletal fibre is one cell and a smooth fibre is one cell, while a cardiac fibre is made of several linked cells (myocytes).

**Shape:** skeletal and cardiac fibres are cylindrical, smooth fibres spindle-shaped. **Branching:** skeletal fibres rarely branch, cardiac fibres branch, smooth fibres do not. **Sarcolemma:** thick in skeletal, very thin in cardiac, thin in smooth.

**Striation:** skeletal is striated, cardiac shows non-clear striation, smooth is non-striated. **Nuclei:** skeletal fibres have multiple peripheral nuclei, cardiac and smooth each have one central nucleus. **Sarcomeres:** regular in skeletal, irregular in cardiac, absent in smooth.

**Tubular system:** skeletal has a triad at the A-I junction, cardiac a diad at the Z line, smooth none (caveolae instead). **Cell junctions:** skeletal none, cardiac the intercalated disc (fascia adherens, desmosomes and gap junctions), smooth gap junctions alone.

**Regeneration:** skeletal regenerates from satellite cells, cardiac cannot regenerate in normal conditions, smooth regenerates by mitosis or from pericytes. **Action:** skeletal is __voluntary__; cardiac and smooth are __involuntary__. **Innervation:** skeletal has motor innervation; cardiac and smooth have autonomic innervation.

The table's final row also names each type's distinguishing modification where one exists: the **muscle spindle** for skeletal muscle and **Purkinje fibres** for cardiac muscle, with no entry printed for smooth muscle.
## explicit_objective
Reproduce, feature by feature, the department book's own table comparing skeletal, cardiac and smooth muscle across site, size, single-fibre composition, shape, branching, sarcolemma thickness, striation, nuclei, sarcomeres, tubular system, cell junctions, regeneration, action and innervation.

## pitfalls
Treating "striated" as all-or-nothing. Cardiac muscle is not unstriated — its striation is "non-clear", less distinct than skeletal muscle's, because cardiac muscle still has sarcomeres (irregular ones) while smooth muscle, genuinely unstriated, has none at all. Collapsing this into a two-way striated/unstriated split loses the row that actually separates cardiac muscle from both of its neighbours in the table.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-HIS-T02

## secondary_node_ids
DIS-HIS-T04

## topic
Basic tissues

## subtopic
Muscle Tissue

## microtopic
Differences between the Three Types of Muscle Fibers

## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Histology > Muscle Tissue

## article_ids
ART-103-HIS-MUSCLE-COMPARISON-TABLE

## related_article_ids
ART-103-HIS-MUSCLE-COMPARISON-TABLE

## related_concept_ids
CON-MSK-2493DDAE4798CE | CON-MSK-2E451ACE10A724 | CON-MSK-888DFA3AA4E974 | CON-MSK-BD54A250111D42

## resource_ids
src_2bf25a6864c9f6ce3283

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.5

## exam_weight_by_year
KAU_Y1=0.6

## clinical_relevance
0.3

## academic_relevance
0.95

## weight_confidence
0.35

## confidence
0.9

## exam_signal
src_7272bde5a8d524835d9b | department_questions | 2026 | p29 | 103 BMS

## atomic_claim_ids
CLM-MSK-MUSCLE-COMPARISON-01 | CLM-MSK-MUSCLE-COMPARISON-02

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Difference between types of muscle fibers, table] "Tubular System: Triad system (at level of A-I junction) [Skeletal] — Diad system (at level of Z line) [Cardiac] — Absent (Caveolae) [Smooth]."
"Cell Junctions: None [Skeletal] — Intercalated disc: Fascia adherence, Desmosomes, Gap junctions [Cardiac] — Gap junction [Smooth]."
"Modifications: Muscle spindle [Skeletal] — Purkinje fibers [Cardiac] — (none printed) [Smooth]."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book gives cardiac muscle's striation as "Non-clear striation" without defining what makes a striation "clear" versus "non-clear" beyond the word itself; no numeric or structural criterion is printed anywhere else in the chapter.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

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
microtopicId: The department book prints "Differences between the Three Types of Muscle Fibers" as its own heading, carried in `microtopic`; the canonical tree's Muscle Tissue node has no child for it (only Skeletal Muscle, Cardiac Muscle and Smooth Muscle are listed), so `module_subject` stops at "Muscle Tissue" rather than inventing a tree segment the academic tree file does not carry, and the fuller heading is kept only in `microtopic` and `aliases`.
nanotopicId: A nanotopic would be invented; the table is already the finest unit the book prints.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; a photograph or redrawing of the book's own table is requested on ART-103-HIS-MUSCLE-COMPARISON-TABLE.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book and the department's own Histology written-assessment revision set (Q9); this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "differences between the three types", "diad tubular system" and "comparison of muscle" — no existing record of any kind names this synthesis.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
rejectedMergeCandidateIds: Nothing was found to reject; the individual rows are covered piecemeal by the skeletal, cardiac and smooth muscle records already in this file (cross-linked here), but no existing record spans all three, which is why B7c's report flagged this as a genuine gap rather than a duplicate.
relationships: Cross-linked to the three muscle-type records this table draws its rows from (CON-MSK-2493DDAE4798CE skeletal, CON-MSK-2E451ACE10A724 cardiac, CON-MSK-888DFA3AA4E974 smooth) and to CON-MSK-BD54A250111D42 (the skeletal triad, the tubular-system row's skeletal cell). This is one of the four topics the department's own Histology written-assessment (src_7272bde5a8d524835d9b, Q9) asks that no article covered until this batch — see the lane report.

---

# Item

## id
CON-MSK-888DFA3AA4E974

## label
Ultrastructure of the smooth muscle cell
## canonical_key
smooth.muscle-ultrastructure.em-picture

## aliases
Smooth muscle EM picture
Smooth muscle ultrastructure
Caveolae
Dense bodies
Smooth muscle fibre

## arabic_label
البنية الدقيقة للعضلات الملساء

## arabic_aliases
العضلات الملساء
الليف العضلي الأملس
الكهيفات

## definition
On **electron microscopy** the smooth muscle cell has a thin sarcolemma surrounded by a basal lamina, with __no T-tubules and no tubular system__; instead the surface is invaginated into **caveolae**, which control calcium release and contraction.

The single oval central nucleus takes a **corkscrew shape** during contraction. The acidophilic sarcoplasm holds numerous mitochondria, sarcoplasmic reticulum, free ribosomes, a small Golgi apparatus and glycogen granules, mainly around the nucleus.

Thick **myosin** and thin **actin** filaments are __irregularly arranged, so no striations appear__. Actin inserts into sarcoplasmic and sarcolemma-associated **dense bodies**, which correspond to the Z line of striated muscle; abundant intermediate **desmin** filaments insert there too, and these attachments transmit contractile force to adjacent cells.

There is **no troponin** — __calmodulin takes its place__.
## explicit_objective
Describe the electron-microscopic picture of a smooth muscle cell, and name the striated-muscle structure that each smooth-muscle feature replaces.

## pitfalls
Concluding that smooth muscle has no contractile filaments because it has no striations. It has both actin and myosin; they are simply arranged irregularly rather than in register, which is the whole reason no bands appear.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-HIS-T02

## secondary_node_ids
DIS-HIS-T01 | DIS-HIS-T04

## topic
Basic tissues

## subtopic
Muscle Tissue

## microtopic
Smooth Muscle

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Histology > Muscle Tissue > Smooth Muscle

## article_ids
ART-103-HIS-SMOOTH-MUSCLE

## related_article_ids
ART-103-HIS-SMOOTH-MUSCLE

## related_concept_ids
CON-MSK-0DEAF126DF8F2E | CON-MSK-E36936D62038BF | CON-MSK-B080975D6171CF

## resource_ids
src_2bf25a6864c9f6ce3283

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.5

## exam_weight_by_year
KAU_Y1=0.5

## clinical_relevance
0.4

## academic_relevance
0.9

## weight_confidence
0.3

## confidence
0.85

## exam_signal
src_37f6c0daf3436096af19 | end_of_year | 2025 | p21 | 103 BMS

## atomic_claim_ids
CLM-MSK-SMOOTH-MUSCLE-EM-01 | CLM-MSK-SMOOTH-MUSCLE-EM-02

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Histology Q4, 3 Marks] Mention EM picture of Smooth muscles
"Sarcolemma thin surrounded by basal lamina. It shows no T-tubules, instead there are invaginations along the cell surface, called caveolae."
"No troponin , instead there is calmodulin protein."

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-MSK-E36936D62038BF

## conflicts
[clear]

## uncertainty
The department book prints no E.M. heading for smooth muscle at all. Everything the examiner marks as the "EM picture" is printed under one heading, "Histological structure", mixed with features visible by light microscopy — size, shape and nuclear position among them. Which of those items the examiner counts as electron-microscopic is not stated anywhere in the book.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

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
microtopicId: The department book's own section, "Smooth Muscle", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-HIS-T02.
nanotopicId: "Smooth Muscle" is the finest heading the department book prints under Muscle Tissue; a nanotopic below it would be invented.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the micrograph it needs is requested on ART-103-HIS-SMOOTH-MUSCLE and on the written question.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book and the 2025 end-of-year paper; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "caveolae", "dense bodies", "desmin", "sarcolemma" and "myofibril" — every one returns no existing record, so there is no candidate to point at.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
rejectedMergeCandidateIds: CON-MSK-E36936D62038BF "Alternating anisotropic dark A bands and isotropic light I bands create striations" is the striated-muscle counterpart and explains why smooth muscle is not striated, but its objective is the striated sarcomere. Deliberately not merged; cross-linked instead.
relationships: Walked the live CON-MSK-* and CON-RES-* smooth-muscle concepts and the four other concepts in this batch. contrasts_with holds to CON-MSK-E36936D62038BF and to CON-MSK-0DEAF126DF8F2E. The live CON-RES-* records are about where smooth muscle lies in the airway, not what it looks like, so no edge holds to them. No relations file is scoped for this module, so the edges are recorded here.

---

# Item

## id
CON-MSK-967E873EEEACE0

## label
The four cell types of bone
## canonical_key
bone.cells.four-types

## aliases
Bone cells
Osteogenic cell
Osteoprogenitor cell
Osteocyte
Four bone cells
teaching.bone.cells (legacy canonical key)

## arabic_label
خلايا العظم

## definition
Bone contains **four cell types**. Three belong to one lineage; the fourth stands apart.

The **osteogenic (osteoprogenitor) cell** arises from undifferentiated mesenchymal cells and pericytes, divides, and gives rise to the **osteoblast**, the bone-forming cell. The osteoblast, once surrounded by the calcified matrix it has deposited, becomes an imprisoned mature bone cell, the **osteocyte**.

The fourth cell, the **osteoclast**, is __not part of that sequence__: it is a multinucleated bone-destroying cell formed instead by fusion of mononuclear haemopoietic progenitor cells.
## explicit_objective
Name the four bone cell types, state which three form one differentiation lineage and which one does not, and explain the origin of each.

## pitfalls
Treating the four bone cells as four unrelated types. Three of them are one lineage — the osteogenic cell becomes the osteoblast, and the osteoblast walled into calcified matrix becomes the osteocyte — while the osteoclast comes from the haemopoietic line by fusion and is not part of that sequence at all.

## concept_type
classification

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-HIS-T02

## secondary_node_ids
DIS-HIS-T01 | DIS-HIS-T04

## topic
Basic tissues

## subtopic
Bone

## modules
103 BMS

## module_subject
103 BMS > Histology > Bone > Bone Cells

## article_ids
ART-103-HIS-BONE-CELLS

## related_article_ids
ART-103-HIS-BONE-CELLS

## related_concept_ids
CON-MSK-D137ADEEC56243 | CON-MSK-76CE11C6DCDC37

## resource_ids
src_2bf25a6864c9f6ce3283

## learner_years
1

## universities
kau

## original_wording
[Bone, General structure] "B- Bone Cells: Osteogenic cells, osteoblasts, osteocytes and osteoclasts."

## rejected_merge_candidate_ids
CON-MSK-D137ADEEC56243 | CON-MSK-76CE11C6DCDC37

## uncertainty
The book states 10 to 20% of osteoblasts differentiate into osteocytes, some flatten into bone-lining cells, and the majority undergo apoptosis, without stating what triggers a given osteoblast to take one path over another.

## field_notes
definition: Filled from the department book's own "General structure of bone" list and the individual cell entries elsewhere in the same chapter (already cited on the four full cell records this file carries); this update supplies the enumeration-level definition and objective that coverage/103-BMS-OWED.md §1 flagged as missing.
explicitObjective: See definition note above.
canonicalKey: This block previously carried two `## canonical_key` headings (`teaching.bone.cells`, the value still live today, then `bone.cells.four-types` below it) — the importer keeps only the first heading of a repeated key and silently drops the second, so the intended rename to the topic.subtopic.aspect-style key never actually reached live state. Kept `bone.cells.four-types` as the one real key, since that is the value coverage/101-ISK-untaught-concepts.md and coverage/103-BMS-OWED.md §1 both already cite as this concept's canonical key, and it follows the file's own topic.subtopic.aspect convention where `teaching.bone.cells` does not; checked for collision against every canonical_key in docs/Kasr-Source-Imports/concept/*.md and against live state — no match for either string beyond this record. The old key is kept as a plain-text alias above for traceability, not as a second machine key.

---

# Item

## id
CON-MSK-E36936D62038BF

## label
A bands and I bands make the striations
## canonical_key
skeletal.myofibril.a-and-i-bands

## aliases
A band
I band
Striations
Anisotropic and isotropic bands
Transverse striations of striated muscle
teaching.a-i-bands (legacy canonical key)

## arabic_label
الحزم الداكنة والفاتحة المكوّنة للتخطيط العرضي

## definition
Each myofibril of striated muscle shows alternating dark and light bands, and the dark bands of adjacent myofibrils line up at the same level, producing the appearance of **transverse striations**.

Under the polarising microscope the __light band is isotropic__ — it does not alter the plane of polarised light — so it is called the **I band**. The __dark band is anisotropic__ — it alters polarised light in two planes — so it is called the **A band**.
## explicit_objective
Explain why the A band is called anisotropic and the I band isotropic, based on their behaviour under polarised light, and state how their alternation produces the appearance of transverse striation.

## pitfalls
Reading "anisotropic" and "isotropic" as names for the colours seen in a stained section. They describe behaviour under the polarising microscope — the A band alters polarised light in two planes and the I band does not — and the dark and light appearance in an ordinary section follows from filament overlap, not from a dye.

## concept_type
mechanism

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-HIS-T02

## secondary_node_ids
DIS-HIS-T01 | DIS-HIS-T04

## topic
Basic tissues

## subtopic
Muscle Tissue

## modules
103 BMS

## module_subject
103 BMS > Histology > Muscle Tissue > Skeletal Muscle

## article_ids
ART-103-HIS-SKELETAL-MUSCLE-STRUCTURE

## related_article_ids
ART-103-HIS-SKELETAL-MUSCLE-STRUCTURE

## related_concept_ids
CON-MSK-888DFA3AA4E974 | CON-MSK-0DEAF126DF8F2E | CON-MSK-BBEDCAE76A03B9 | CON-MSK-70448A9B07D24A

## resource_ids
src_2bf25a6864c9f6ce3283

## learner_years
1

## universities
kau

## original_wording
[EM Picture of Myofibrils] "According to their appearance under the polarizing microscope, the light band is isotropic (so called I band) as it does not alter the plane of polarized light. The dark band is anisotropic (so called A band) as it alters the polarized light in two planes."

## uncertainty
The book does not state the physical basis of anisotropy (the overlap of thick and thin filaments) in this sentence; that mechanism is given separately under the sarcomere heading, which this record cross-links to rather than restates.

## field_notes
definition: Filled from the department book's own "EM Picture of Myofibrils" paragraph; this update supplies the definition and objective that coverage/103-BMS-OWED.md §1 flagged as missing.
explicitObjective: See definition note above.
relatedConceptIds: Added CON-MSK-BBEDCAE76A03B9 (H zone/M line within the A band) and CON-MSK-70448A9B07D24A (band length changes on contraction), the two live records this exact idea sits beside, plus the two muscle-type concepts already cross-linked.
canonicalKey: This block previously carried two `## canonical_key` headings (`teaching.a-i-bands`, the value still live today, then `skeletal.myofibril.a-and-i-bands` below it) — the importer keeps only the first heading of a repeated key and silently drops the second, so the intended rename never reached live state. Kept `skeletal.myofibril.a-and-i-bands` as the one real key: it is the value coverage/101-ISK-untaught-concepts.md and coverage/103-BMS-OWED.md §1 already cite for this concept, and it follows the file's topic.subtopic.aspect convention where `teaching.a-i-bands` does not; checked for collision against every canonical_key in docs/Kasr-Source-Imports/concept/*.md and against live state — no match beyond this record. The old key is kept as a plain-text alias above for traceability.

---

# Item

## id
CON-DER-A4BD56E5027310

## label
The arrector pili muscle
## canonical_key
hair-follicle.arrector-pili.structure-attachment

## subject
derm

## aliases
Arrector pili
Arrector pili muscle
Erector pili
Goose skin
teaching.arrector.structure (legacy canonical key)

## arabic_label
العضلة الناصبة للشعرة

## definition
The **arrector pili muscle** is a bundle of smooth muscle fibres that extends from the mid shaft of the hair follicle to the **papillary layer of the dermis**.

In fear and cold, __sympathetic stimulation contracts the arrector pili__, erecting the hair, depressing the skin over the muscle and elevating the skin around the hair — the **"goose skin"** response.
## explicit_objective
State the attachments of the arrector pili muscle and explain the goose-skin response as a sympathetically driven smooth-muscle contraction.

## pitfalls
Expecting a striated muscle because the hair visibly stands up. The arrector pili is smooth muscle under sympathetic control, which is why the response to fear and cold is involuntary and why it cannot be produced to order.

## concept_type
mechanism

## support_mode
direct_statement

## primary_node_id
DIS-HIS-T03

## secondary_node_ids
DIS-HIS-T02 | DIS-HIS-T04

## topic
Organ histology

## subtopic
Integumentary System

## modules
103 BMS

## module_subject
103 BMS > Histology > Integumentary System > Skin Appendages

## article_ids
ART-103-HIS-HAIR-FOLLICLE

## related_article_ids
ART-103-HIS-HAIR-FOLLICLE

## related_concept_ids
CON-DER-56784AB396C13E

## resource_ids
src_2bf25a6864c9f6ce3283

## learner_years
1

## universities
kau

## original_wording
[Arrector Pili Muscle] "A bundle of smooth muscle fibers that extend from the mid shaft of the hair follicle to the papillary layer of the dermis. In case of fear and cold; sympathetic stimulation causes contraction of arrector pili muscle leading to erection of hair with depression of skin over the muscle and elevation of skin around the hair (goose skin)."

## uncertainty
The book does not state whether the arrector pili is present at every hair follicle or only at some; it describes the muscle and its reflex without a stated exception.

## field_notes
definition: Filled from the department book's own "Arrector Pili Muscle" paragraph; this update supplies the definition and objective that coverage/103-BMS-OWED.md §1 flagged as missing.
explicitObjective: See definition note above.
canonicalKey: This block previously carried two `## canonical_key` headings (`teaching.arrector.structure`, the value still live today, then `hair-follicle.arrector-pili.structure-attachment` below it) — the importer keeps only the first heading of a repeated key and silently drops the second, so the intended rename never reached live state. Kept `hair-follicle.arrector-pili.structure-attachment` as the one real key: it is the value coverage/101-ISK-untaught-concepts.md and coverage/103-BMS-OWED.md §1 already cite for this concept, and it follows the file's topic.subtopic.aspect convention where `teaching.arrector.structure` does not; checked for collision against every canonical_key in docs/Kasr-Source-Imports/concept/*.md and against live state — no match beyond this record. The old key is kept as a plain-text alias above for traceability.

---

# Item

## id
CON-MSK-842FCAD0B94A8F

## label
Cartilage: an avascular supporting tissue
## canonical_key
cartilage.general.characteristics-composition

## aliases
Characteristics of cartilage
Composition of cartilage
Functions of cartilage
Cartilage matrix composition

## arabic_label
الغضروف: خصائصه وتكوينه

## arabic_aliases
الغضروف
مصفوفة الغضروف

## definition
**Cartilage** is a specialised connective tissue whose matrix is __rubbery yet flexible, so it bears mechanical stress__.

Like connective tissue proper, its cells (**chondroblasts** and **chondrocytes**) are widely separated by a considerable amount of matrix, formed of collagen and elastic fibres embedded in ground substance.

It arises from undifferentiated mesenchymal cells and is **avascular**, with no lymph vessels or nerves. It is __nourished only by diffusion__ of oxygen and nutrients from the surrounding connective tissue or, at a joint, from synovial fluid.
## explicit_objective
State the general characteristics, composition and functions of cartilage, and explain why it is avascular, has no lymphatics or nerves, and is classified into three types on the basis of its matrix.

## pitfalls
Assuming cartilage repairs as quickly as bone because both are connective tissue. Cartilage has no blood supply of its own and is nourished only by diffusion, which is exactly why cartilage injury heals slowly and bone, being highly vascular, does not.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-HIS-T02

## secondary_node_ids
DIS-HIS-T01
DIS-HIS-T04

## topic
Basic tissues

## subtopic
Cartilage

## microtopic
Cartilage

## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Histology > Cartilage > Cartilage

## article_ids
ART-103-HIS-CARTILAGE-CELLS

## related_article_ids
ART-103-HIS-CARTILAGE-CELLS

## related_concept_ids
[clear]

## resource_ids
src_2bf25a6864c9f6ce3283

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.3

## exam_weight_by_year
KAU_Y1=0.3

## clinical_relevance
0.25

## academic_relevance
0.85

## weight_confidence
0.3

## confidence
0.85

## exam_signal


## atomic_claim_ids
CLM-MSK-CARTILAGE-GENERAL-01
CLM-MSK-CARTILAGE-GENERAL-02

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Cartilage, Definition] "It is a specialized type of connective tissue (C.T.) in which the matrix is rubbery to bear the mechanical stress."
[Cartilage, Characters] "It is avascular, nourished by diffusion of O2 & nutrients from the surrounding C.T. or synovial fluid in the joint cavities."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book lists five functions of cartilage (support with flexibility, shock absorption, smooth joint surfaces, keeping the airway patent, and bone growth) without ranking them; none is marked as the type-defining function.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

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
microtopicId: The department book's own section, "Cartilage", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-HIS-T02.
nanotopicId: "Cartilage" is the finest heading the department book prints under Cartilage; a nanotopic below it would be invented.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the image it needs is requested on ART-103-HIS-CARTILAGE-CELLS.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "cartilage", "chondroblast" and "avascular connective tissue" — the only hits are pending 101 ISK cartilage records (a different module) and no live concept states cartilage's general characteristics.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
CON-MSK-E198B099DCA0C0

## label
The chondroblast and appositional growth
## canonical_key
cartilage.chondroblast.structure-origin-site-lm-em-function

## aliases
Chondroblast
Cartilage-forming cell

## arabic_label
الخلية بانية الغضروف

## arabic_aliases
بانية الغضروف
كوندروبلاست

## definition
The **chondroblast** arises from undifferentiated mesenchymal cells, which withdraw their processes, proliferate and transform into chondroblasts that start to secrete matrix. It always lies on the __surface of the cartilage__, at the inner aspect of the perichondrium.

By **light microscopy** it is flat to oval or spindle-shaped, with deeply basophilic cytoplasm and a flat, oval, pale-stained nucleus with a prominent nucleolus, and it can divide.

By **electron microscopy** it shows the features of a **protein-forming cell**: a euchromatic nucleus, abundant ribosomes and rough endoplasmic reticulum, a large Golgi apparatus and many mitochondria.

It forms cartilage collagen (**type II**) and cartilage matrix, and changes into a **chondrocyte** once matrix surrounds it, producing __appositional growth of cartilage from outside__.
## explicit_objective
State the origin, site, light- and electron-microscopic features of the chondroblast, and explain its role in appositional cartilage growth.

## pitfalls
Crediting the chondroblast with interstitial growth. Appositional growth from the surface is the chondroblast's job; growth from inside by division of already-buried chondrocytes is a separate process, interstitial growth.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-HIS-T02

## secondary_node_ids
DIS-HIS-T01
DIS-HIS-T04

## topic
Basic tissues

## subtopic
Cartilage

## microtopic
Hyaline Cartilage

## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Histology > Cartilage > Hyaline Cartilage

## article_ids
ART-103-HIS-CARTILAGE-CELLS

## related_article_ids
ART-103-HIS-CARTILAGE-CELLS

## related_concept_ids
[clear]

## resource_ids
src_2bf25a6864c9f6ce3283

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.35

## exam_weight_by_year
KAU_Y1=0.35

## clinical_relevance
0.25

## academic_relevance
0.85

## weight_confidence
0.3

## confidence
0.85

## exam_signal


## atomic_claim_ids
CLM-MSK-CHONDROBLAST-01
CLM-MSK-CHONDROBLAST-02

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Cartilage Cells, Chondroblasts] "Arise from (UMCs), which withdraw their processes & proliferate... They are transformed into chondroblasts which start to secrete the matrix."
[Cartilage Cells, Chondroblasts, EM] "Features of protein forming cells: (Euchromatic nucleus, abundant ribosomes, rER, large Golgi apparatus & many mitochondria)."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book gives no size for the chondroblast, unlike some other cells in the same chapter.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

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
microtopicId: The department book's own section, "Hyaline Cartilage", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-HIS-T02.
nanotopicId: "Hyaline Cartilage" is the finest heading the department book prints under Cartilage; a nanotopic below it would be invented.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the image it needs is requested on ART-103-HIS-CARTILAGE-CELLS.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "chondroblast" — no existing record of any kind.
relationships: Cross-linked to CON-MSK chondrocyte (next record): the two cells the book compares in one table, origin-to-origin and function-to-function.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
CON-MSK-CB0E0F665E200B

## label
The chondrocyte and interstitial growth
## canonical_key
cartilage.chondrocyte.structure-origin-site-lm-em-function

## aliases
Chondrocyte
Isogenous group
Cell nest

## arabic_label
الخلية الغضروفية

## arabic_aliases
خلية الغضروف
كوندروسايت

## definition
The **chondrocyte** develops from a **chondroblast**: when the chondroblast matures it secretes enough matrix to be completely surrounded and __imprisoned in a lacuna__. Young chondrocytes are superficial and older ones lie deeper in the matrix.

**Superficial chondrocytes** are ovoid, parallel to the surface, with pale basophilic cytoplasm and a rounded dark central nucleus, usually single in a lacuna surrounded by a darkly stained capsule of condensed matrix.

**Older, deeper chondrocytes** are rounded or triangular with a dark rounded nucleus and pale basophilic cytoplasm rich in fat and glycogen (which dissolve during preparation). They divide once or twice to give clusters of 2 to 8 cells — **isogenous groups** or cell nests — enclosed by a shared lacuna.

By **electron microscopy** chondrocytes show the features of protein-forming cells, but less prominently than chondroblasts, and old chondrocytes additionally show large lipid droplets and glycogen granules.

Chondrocytes are the __maintaining cells of cartilage__: they continuously secrete new matrix around themselves, producing **interstitial growth** of cartilage from inside.
## explicit_objective
State the origin, site, light- and electron-microscopic features of the chondrocyte, describe isogenous groups, and explain interstitial cartilage growth.

## pitfalls
Expecting lacunae to be truly empty in life. Chondrocytes completely fill their lacunae in the living tissue; the empty-looking space seen in a section is a shrinkage artefact of preparation, and mistaking it for a real gap misreads the slide.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-HIS-T02

## secondary_node_ids
DIS-HIS-T01
DIS-HIS-T04

## topic
Basic tissues

## subtopic
Cartilage

## microtopic
Hyaline Cartilage

## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Histology > Cartilage > Hyaline Cartilage

## article_ids
ART-103-HIS-CARTILAGE-CELLS

## related_article_ids
ART-103-HIS-CARTILAGE-CELLS

## related_concept_ids
[clear]

## resource_ids
src_2bf25a6864c9f6ce3283

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.35

## exam_weight_by_year
KAU_Y1=0.35

## clinical_relevance
0.25

## academic_relevance
0.85

## weight_confidence
0.3

## confidence
0.85

## exam_signal


## atomic_claim_ids
CLM-MSK-CHONDROCYTE-01
CLM-MSK-CHONDROCYTE-02

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Cartilage Cells, Chondrocytes] "Develop from chondroblasts. When chondroblasts mature, they secrete enough matrixes to be completely surrounded by it and imprisoned in lacunae, they are now called chondrocytes."
[Cartilage Cells, Chondrocytes] "They divide once or twice giving clusters of cells formed of 2 or 4, up to 8 cells (isogenous groups or cell nest)."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book does not state how many isogenous groups typically form per lacuna region, only the size range of a single group (2 to 8 cells).

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

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
microtopicId: The department book's own section, "Hyaline Cartilage", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-HIS-T02.
nanotopicId: "Hyaline Cartilage" is the finest heading the department book prints under Cartilage; a nanotopic below it would be invented.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the image it needs is requested on ART-103-HIS-CARTILAGE-CELLS.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "chondrocyte", "isogenous group" and "cell nest" — no existing record of any kind.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
CON-MSK-FB07A439E2B324

## label
The perichondrium
## canonical_key
cartilage.perichondrium.layers-functions

## aliases
Perichondrium
Outer fibrous layer of perichondrium
Inner chondrogenic layer

## arabic_label
السمحاق الغضروفي

## arabic_aliases
غلاف الغضروف

## definition
The **perichondrium** is a capsule-like structure of dense fibrous connective tissue that surrounds hyaline cartilage, __except at the articular surface of joints__.

It has two layers: an outer **fibrous layer** of white fibrous connective tissue, formed of fibroblasts that secrete type I collagen and rich in blood vessels and nerves; and an inner **chondrogenic (cellular) layer** rich in chondroblasts.

Its functions are __nutrition of the non-vascular cartilage__ by diffusion, providing attachment for muscles, and forming new cartilage cells during growth.
## explicit_objective
State the two layers of the perichondrium, their composition, and its three functions, and explain why cartilage lacking a perichondrium behaves differently.

## pitfalls
Assuming every piece of hyaline cartilage has a perichondrium. Articular cartilage on a joint surface has none, which is exactly why it has no independent blood supply route through a perichondrium and depends entirely on synovial fluid.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-HIS-T02

## secondary_node_ids
DIS-HIS-T01
DIS-HIS-T04

## topic
Basic tissues

## subtopic
Cartilage

## microtopic
Hyaline Cartilage

## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Histology > Cartilage > Hyaline Cartilage

## article_ids
ART-103-HIS-CARTILAGE-CELLS

## related_article_ids
ART-103-HIS-CARTILAGE-CELLS

## related_concept_ids
[clear]

## resource_ids
src_2bf25a6864c9f6ce3283

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.3

## exam_weight_by_year
KAU_Y1=0.3

## clinical_relevance
0.3

## academic_relevance
0.8

## weight_confidence
0.3

## confidence
0.85

## exam_signal


## atomic_claim_ids
CLM-MSK-PERICHONDRIUM-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Cartilage, Structure] "Perichondrium: it is a capsule-like structure formed of dense fibrous C.T. that surrounds the hyaline cartilage except at the articular surface of joints."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book does not state whether the perichondrium regenerates after surgical stripping, only that it forms new cartilage cells "during growth".

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

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
microtopicId: The department book's own section, "Hyaline Cartilage", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-HIS-T02.
nanotopicId: "Hyaline Cartilage" is the finest heading the department book prints under Cartilage; a nanotopic below it would be invented.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the image it needs is requested on ART-103-HIS-CARTILAGE-CELLS.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "perichondrium" — no existing record of any kind.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
CON-MSK-0EA979EBF9D434

## label
Hyaline cartilage
## canonical_key
cartilage.hyaline.definition-sites

## aliases
Hyaline cartilage
Sites of hyaline cartilage

## arabic_label
الغضروف الزجاجي

## arabic_aliases
الغضروف الهياليني

## definition
**Hyaline cartilage** is the __most common type of cartilage__. It appears translucent with a glassy appearance (hyalo = glass) and has the typical structure of cartilage; the **other two types are variants of its basic structure**.

It is found in the fetal skeleton, the articular surface of bones, costal cartilage, the epiphyseal plate, and the upper respiratory passages (nose, larynx, trachea and bronchi).
## explicit_objective
Name the five sites of hyaline cartilage and explain why it is treated as the template for the other cartilage types.

## pitfalls
Listing "joints" generically as a site. The book is specific: it is the articular surface of bones that carries hyaline cartilage, not the joint capsule or ligaments.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-HIS-T02

## secondary_node_ids
DIS-HIS-T01
DIS-HIS-T04

## topic
Basic tissues

## subtopic
Cartilage

## microtopic
Hyaline Cartilage

## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Histology > Cartilage > Hyaline Cartilage

## article_ids
ART-103-HIS-CARTILAGE-TYPES

## related_article_ids
ART-103-HIS-CARTILAGE-TYPES

## related_concept_ids
[clear]

## resource_ids
src_2bf25a6864c9f6ce3283

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.35

## exam_weight_by_year
KAU_Y1=0.35

## clinical_relevance
0.3

## academic_relevance
0.85

## weight_confidence
0.3

## confidence
0.85

## exam_signal


## atomic_claim_ids
CLM-MSK-HYALINE-SITES-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Hyaline Cartilage, Sites] "1. Fetal skeleton. 2. Articular surface of bones. 3. Costal cartilage. 4. Epiphyseal plate. 5. Upper Respiratory passages (nose, larynx, trachea & bronchi)."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
None recorded; the site list is stated plainly.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

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
microtopicId: The department book's own section, "Hyaline Cartilage", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-HIS-T02.
nanotopicId: "Hyaline Cartilage" is the finest heading the department book prints under Cartilage; a nanotopic below it would be invented.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the image it needs is requested on ART-103-HIS-CARTILAGE-TYPES.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "hyaline cartilage" — pending 101 ISK records use it only as an alias/MCQ distractor, not as a sites concept for this book.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
CON-MSK-0F4870E557FAF4

## label
Elastic cartilage and white fibrocartilage
## canonical_key
cartilage.elastic-vs-fibrocartilage.comparison

## aliases
Yellow elastic cartilage
White fibrocartilage
Elastic cartilage
Fibrocartilage

## arabic_label
الغضروف المرن الأصفر والغضروف الليفي الأبيض

## arabic_aliases
الغضروف المرن
الغضروف الليفي

## definition
**Yellow elastic cartilage** is yellow in the fresh state, opaque and flexible, and is __covered by perichondrium__. It has the same structure as hyaline cartilage but with many branching elastic fibres embedded in the matrix, plus a few type II collagen fibres; its chondrocytes form small, mostly 2-cell isogenous groups.

It sits in the ear pinna, the Eustachian tube, the epiglottis and some laryngeal cartilages, and the external auditory canal, and it is __very flexible, recovering its shape after deformation__.

**White fibrocartilage** is a tough type, important in __bone-to-bone attachment__, with characters intermediate between hyaline cartilage and dense regular white fibrous connective tissue. It is __not surrounded by perichondrium__, and is formed of dense type I collagen fibres in parallel thick bundles, with cartilage cells inside lacunae present in rows between the bundles, embedded in very scanty matrix.

It sits in the shoulder and hip joints, the intervertebral disc, the mandibular joint, the symphysis pubis, the sternoclavicular joint, and the semilunar cartilages of the knee joints, and it is __strong and tough, resisting great tensile stretch__ and attaching bones with limited mobility.
## explicit_objective
Compare yellow elastic cartilage and white fibrocartilage on structure, perichondrial covering, site and function.

## pitfalls
Giving white fibrocartilage a perichondrium. Only hyaline and elastic cartilage have one; fibrocartilage is the exception the book states outright, which is consistent with fibrocartilage sitting in high-load joints where it must bond directly to bone.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-HIS-T02

## secondary_node_ids
DIS-HIS-T01
DIS-HIS-T04

## topic
Basic tissues

## subtopic
Cartilage

## microtopic
Yellow Elastic Cartilage

## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Histology > Cartilage > Yellow Elastic Cartilage
103 BMS > Histology > Cartilage > White Fibro Cartilage

## article_ids
ART-103-HIS-CARTILAGE-TYPES

## related_article_ids
ART-103-HIS-CARTILAGE-TYPES

## related_concept_ids
[clear]

## resource_ids
src_2bf25a6864c9f6ce3283

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.4

## exam_weight_by_year
KAU_Y1=0.4

## clinical_relevance
0.35

## academic_relevance
0.9

## weight_confidence
0.3

## confidence
0.85

## exam_signal


## atomic_claim_ids
CLM-MSK-ELASTIC-FIBROCARTILAGE-01
CLM-MSK-ELASTIC-FIBROCARTILAGE-02

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Cartilage] "Yellow Elastic Cartilage... Has the same structure of hyaline cartilage, but with large number of branching elastic fibers embedded in the matrix... Chondrocytes form small cell nests (mostly 2 cell isogenous groups)."
[Cartilage] "White Fibro Cartilage... Not surrounded with perichondrium. Formed of dense collagen fibers (type I), in parallel thick bundles."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book gives the sites of white fibrocartilage as a list of joints and discs without ranking which bears the most load, though the intervertebral disc is expanded separately in the very next section.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

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
microtopicId: The department book's own section, "Yellow Elastic Cartilage", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-HIS-T02.
nanotopicId: "Yellow Elastic Cartilage" is the finest heading the department book prints under Cartilage; a nanotopic below it would be invented.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the image it needs is requested on ART-103-HIS-CARTILAGE-TYPES.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "elastic cartilage" (no hit) and "fibrocartilage" (only pending 101 ISK aliases, a different module and a different book) — no candidate for this record.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
CON-MSK-9C7E37FE296254

## label
The intervertebral disc and disc prolapse
## canonical_key
cartilage.intervertebral-disc.annulus-nucleus-herniation

## aliases
Intervertebral disc
Annulus fibrosus
Nucleus pulposus
Disc prolapse
Disc herniation

## arabic_label
القرص الفقري بين الفقرات

## arabic_aliases
الحلقة الليفية
النواة اللبية
انزلاق غضروفي

## definition
The **intervertebral disc** lies between the bodies of two adjacent vertebrae. It is formed of an outer fibrous ring, the **annulus fibrosus**, made of white fibrocartilage (type I collagen), surrounding an inner soft jelly-like mass, the **nucleus pulposus** (type II collagen).

**Herniation** of the nucleus pulposus from the annulus fibrosus, called __disc prolapse__, can compress nerve roots and cause severe pain.
## explicit_objective
Describe the two components of the intervertebral disc, their collagen types, and the clinical consequence of nucleus pulposus herniation.

## pitfalls
Reversing the collagen types. The tough outer annulus fibrosus is white fibrocartilage with type I collagen, built for tensile strength; the soft inner nucleus pulposus carries type II collagen, the same collagen type as hyaline cartilage matrix, built for cushioning.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-HIS-T02

## secondary_node_ids
DIS-HIS-T01
DIS-HIS-T04

## topic
Basic tissues

## subtopic
Cartilage

## microtopic
Structure of the Intervertebral Disc

## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Histology > Cartilage > Structure of the Intervertebral Disc

## article_ids
ART-103-HIS-CARTILAGE-TYPES

## related_article_ids
ART-103-HIS-CARTILAGE-TYPES

## related_concept_ids
[clear]

## resource_ids
src_2bf25a6864c9f6ce3283

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.4

## exam_weight_by_year
KAU_Y1=0.4

## clinical_relevance
0.6

## academic_relevance
0.85

## weight_confidence
0.3

## confidence
0.85

## exam_signal


## atomic_claim_ids
CLM-MSK-IV-DISC-01
CLM-MSK-IV-DISC-02

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Structure of the Intervertebral Disc] "An outer fibrous ring formed of white fibrocartilage (collagen type I), called annulus fibrosus. An inner soft jelly-like inner mass containing collagen type II, called nucleus pulposus."
[Read only topic] "Herniation of the nucleus pulposus from the annulus fibrosus, a condition called disc prolapse, can compress the nerve roots causing severe pain."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book does not name which nerve roots are compressed or at which vertebral levels disc prolapse is most common; it states the mechanism only in general terms.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

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
microtopicId: The department book's own section, "Structure of the Intervertebral Disc", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-HIS-T02.
nanotopicId: "Structure of the Intervertebral Disc" is the finest heading the department book prints under Cartilage; a nanotopic below it would be invented.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the image it needs is requested on ART-103-HIS-CARTILAGE-TYPES.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "intervertebral disc", "annulus fibrosus" and "nucleus pulposus" — no existing record of any kind.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
CON-MSK-295AEB5D72F8D0

## label
Periosteum and endosteum
## canonical_key
bone.coverings.periosteum-endosteum-comparison

## aliases
Periosteum
Endosteum
Bone coverings
Outer fibrous layer of periosteum
Inner osteogenic layer

## arabic_label
السمحاق العظمي والبطانة العظمية

## arabic_aliases
السمحاق
البطانة الداخلية للعظم

## definition
**Periosteum** covers the outer surface of bone and is formed of two layers: an outer **fibrous layer** of dense type I collagen fibres, fibroblasts and blood capillaries, and an inner **osteogenic layer** of osteogenic cells that __thickens markedly during growth and fracture repair__ as these cells multiply.

Its blood capillaries nourish bone, its collagen protects bone and gives attachment for muscles, and its osteogenic cells differentiate into osteoblasts that form bone matrix and become osteocytes, driving __appositional bone growth__.

**Endosteum** is a delicate layer of connective tissue containing a __single layer of osteogenic cells__ that lines the inner bone surface; it protects the bone surface and adds bone growth from inside.
## explicit_objective
Compare the periosteum and endosteum on structure and function, and explain why the periosteum thickens in growth and fracture.

## pitfalls
Treating periosteum and endosteum as interchangeable linings. Periosteum is two-layered and covers the outer surface; endosteum is a single osteogenic-cell layer lining the inner surface. Only the periosteum carries the outer fibrous layer that gives muscle attachment.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-HIS-T02

## secondary_node_ids
DIS-HIS-T01
DIS-HIS-T04

## topic
Basic tissues

## subtopic
Bone

## microtopic
Bone Coverings (Periosteum & Endosteum)

## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Histology > Bone > Bone Coverings (Periosteum & Endosteum)

## article_ids
ART-103-HIS-BONE-COVERINGS-CELLS

## related_article_ids
ART-103-HIS-BONE-COVERINGS-CELLS

## related_concept_ids
[clear]

## resource_ids
src_2bf25a6864c9f6ce3283

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.35

## exam_weight_by_year
KAU_Y1=0.35

## clinical_relevance
0.35

## academic_relevance
0.85

## weight_confidence
0.3

## confidence
0.85

## exam_signal


## atomic_claim_ids
CLM-MSK-BONE-COVERINGS-01
CLM-MSK-BONE-COVERINGS-02

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Bone Coverings] "Periosteum: A layer of connective tissue which covers outer surface of bone... Outer fibrous layer... Inner osteogenic layer: It is a cellular layer formed of osteogenic cells."
[Bone Coverings] "Endosteum: A Delicate layer of C.T. contains a single layer of osteogenic cells."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book does not state a thickness for the endosteum, only that it is "delicate", unlike the periosteum whose inner layer is explicitly said to thicken in growth and fracture.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

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
microtopicId: The department book's own section, "Bone Coverings (Periosteum & Endosteum)", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-HIS-T02.
nanotopicId: "Bone Coverings (Periosteum & Endosteum)" is the finest heading the department book prints under Bone; a nanotopic below it would be invented.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the image it needs is requested on ART-103-HIS-BONE-COVERINGS-CELLS.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "periosteum" (one pending live concept about long-bone widening, an anatomy MCQ distractor from a different module) and "endosteum" (no hit) — neither is a candidate for this histological structure-function record.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
CON-MSK-E2291B6BD6BBDF

## label
The osteogenic (osteoprogenitor) cell
## canonical_key
osteogenic-cell.structure.origin-site-lm-em-function

## aliases
Osteogenic cell
Osteoprogenitor cell

## arabic_label
الخلية السلفية العظمية

## arabic_aliases
الخلية العظمية السلفية
أوستيوجينيك سيل

## definition
The **osteogenic (osteoprogenitor) cell** arises from undifferentiated mesenchymal cells and pericytes. It is present in the inner layer of the periosteum and in the endosteum.

By **light microscopy** it is a flat cell with a flat nucleus and pale basophilic cytoplasm; by **electron microscopy** it shows free ribosomes.

It can divide and give rise to **osteoblasts**, and osteogenic cells are well developed and numerous in fracture and at young age. __In areas of poor vascularity, osteogenic cells can give rise to chondroblasts instead.__
## explicit_objective
State the origin, site, light- and electron-microscopic features of the osteogenic cell, and explain why it can become either an osteoblast or, in poorly vascular sites, a chondroblast.

## pitfalls
Assuming the osteogenic cell always becomes an osteoblast. The book states it can instead give rise to chondroblasts in areas of poor vasculature — the same branch point that lets a fracture callus form cartilage before bone.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-HIS-T02

## secondary_node_ids
DIS-HIS-T01
DIS-HIS-T04

## topic
Basic tissues

## subtopic
Bone

## microtopic
Bone Cells

## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Histology > Bone > Bone Cells

## article_ids
ART-103-HIS-BONE-COVERINGS-CELLS

## related_article_ids
ART-103-HIS-BONE-COVERINGS-CELLS

## related_concept_ids
CON-MSK-D137ADEEC56243
CON-MSK-967E873EEEACE0

## resource_ids
src_2bf25a6864c9f6ce3283

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.4

## exam_weight_by_year
KAU_Y1=0.4

## clinical_relevance
0.4

## academic_relevance
0.85

## weight_confidence
0.3

## confidence
0.85

## exam_signal


## atomic_claim_ids
CLM-MSK-OSTEOGENIC-CELL-01
CLM-MSK-OSTEOGENIC-CELL-02

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Bone Cells, Osteogenic Cell] "Origin: UMC & pericytes... Present in the inner layer of periosteum & endosteum."
[Bone Cells, Osteogenic Cell, Functions] "They can divide & give rise to osteoblasts, they are well developed & numerous in case of fracture & young age. Osteogenic cells can give rise to chondroblasts in area of poor vasculature."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book gives no size for the osteogenic cell, only that it is "flat", the same qualifier it gives the osteoblast's nucleus shape but not its overall size.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

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
microtopicId: The department book's own section, "Bone Cells", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-HIS-T02.
nanotopicId: "Bone Cells" is the finest heading the department book prints under Bone; a nanotopic below it would be invented.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the image it needs is requested on ART-103-HIS-BONE-COVERINGS-CELLS.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "osteogenic cell" and "osteoprogenitor" — the only hits are a haematology bone-marrow enumeration (CON-HEM-8D8E87B1F8310F) and the live four-bone-cell enumeration already an update row in this file, neither of which describes this cell's own origin, site, LM or EM.
rejectedMergeCandidateIds: CON-MSK-967E873EEEACE0 is the four-bone-cell enumeration, a level above a single cell's own structure; not merged, cross-linked instead.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
CON-MSK-6C87364F2CE942

## label
The osteocyte: the mature bone cell
## canonical_key
osteocyte.structure.origin-site-lm-em-canaliculi-function

## aliases
Osteocyte
Mature bone cell
Canaliculi
Bone lacuna

## arabic_label
الخلية العظمية الناضجة

## arabic_aliases
أوستيوسايت

## definition
The **osteocyte**, the mature bone cell, arises from the **osteoblast**. It lies singly in a bony **lacuna**; lacunae communicate through **canaliculi** that connect osteocytes together — __essential because the calcified matrix lets no tissue fluid pass, so these connections carry nutrient and waste exchange__.

By **light microscopy** osteocytes are oval cells with fine minute processes, oval nuclei, and lightly basophilic cytoplasm containing alkaline phosphatase.

By **electron microscopy** the osteocyte lies within its lacuna with its processes extending into the canaliculi, and processes of neighbouring cells are connected by **gap junctions** for nutrition; the cytoplasm has less rough endoplasmic reticulum than the osteoblast but still contains a Golgi apparatus and mitochondria.

Osteocytes are __bone-maintaining cells__: they form the organic part of matrix and calcify it by continuous deposition of calcium salts, and healthy osteocytes are important for the viability of the matrix. Only one osteocyte occupies a lacuna, and because __osteocytes cannot divide, there is no interstitial growth in bone__.
## explicit_objective
State the origin, site, light- and electron-microscopic features of the osteocyte, describe the canalicular network, and explain why bone has no interstitial growth.

## pitfalls
Expecting bone to grow from inside the way cartilage does. Chondrocytes divide and give interstitial growth; osteocytes cannot divide, so bone grows only by apposition from the periosteum and endosteum, never from within an existing lacuna.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-HIS-T02

## secondary_node_ids
DIS-HIS-T01
DIS-HIS-T04

## topic
Basic tissues

## subtopic
Bone

## microtopic
Bone Cells

## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Histology > Bone > Bone Cells

## article_ids
ART-103-HIS-BONE-COVERINGS-CELLS

## related_article_ids
ART-103-HIS-BONE-COVERINGS-CELLS

## related_concept_ids
CON-MSK-967E873EEEACE0
CON-MSK-5DF0AED914A81E

## resource_ids
src_2bf25a6864c9f6ce3283

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.4

## exam_weight_by_year
KAU_Y1=0.4

## clinical_relevance
0.4

## academic_relevance
0.85

## weight_confidence
0.3

## confidence
0.85

## exam_signal


## atomic_claim_ids
CLM-MSK-OSTEOCYTE-01
CLM-MSK-OSTEOCYTE-02

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Bone Cells, Osteocytes] "Present singly in bony lacunae. Lacunae communicate through canaliculi which connect them together. These connections are important for exchange of nutrition & waste products, as matrix is calcified & no tissue fluid can pass through it."
[Bone Cells, Osteocytes] "Only one osteocyte is present within a lacuna, unlike chondrocytes, as osteocytes cannot divide. NO interstitial growth in bone."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book does not state what proportion of osteocytes remain viable over time, only that "healthy osteocytes are important for viability of matrix" — implying unhealthy ones exist without describing the consequence.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

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
microtopicId: The department book's own section, "Bone Cells", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-HIS-T02.
nanotopicId: "Bone Cells" is the finest heading the department book prints under Bone; a nanotopic below it would be invented.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the image it needs is requested on ART-103-HIS-BONE-COVERINGS-CELLS.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "osteocyte" and "canaliculi" — the only hits are the live Haversian-lamellae concept (a structural fact about the canal, not the cell) and the four-bone-cell enumeration; neither describes the osteocyte's own origin, LM or EM.
rejectedMergeCandidateIds: CON-MSK-5DF0AED914A81E describes the Haversian canal's lamellae and mentions osteocytes only in passing; not merged, cross-linked instead as the structural context this cell sits in.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
CON-MSK-CAFCD73A40E6DC

## label
Osteoclast versus megakaryocyte
## canonical_key
osteoclast.megakaryocyte.comparison

## aliases
Osteoclast versus megakaryocyte
Megakaryocyte
Howship lacuna comparison

## arabic_label
مقارنة الخلية هادمة العظم بالخلية النواءة

## arabic_aliases
الخلية النواءة

## definition
**Osteoclasts** and **megakaryocytes** are both large, prominent cells that students confuse.

The **megakaryocyte** sits in bone marrow, is 50 to 70 micrometres in diameter, has basophilic cytoplasm, a __single multilobed nucleus__, and forms platelets.

The **osteoclast** sits on the inner bone surface within **Howship's lacuna**, is larger at about 150 micrometres in diameter, has foamy acidophilic cytoplasm, is __multinucleated__, and resorbs bone.
## explicit_objective
Distinguish the osteoclast from the megakaryocyte on site, diameter, cytoplasm, nucleus and function.

## pitfalls
Confusing the two because both are large, multinucleated-looking marrow-associated cells. The megakaryocyte has one multilobed nucleus and lies in the marrow itself; the osteoclast is truly multinucleated and lies in its own excavation on the bone surface, not free in the marrow.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-HIS-T02

## secondary_node_ids
DIS-HIS-T01
DIS-HIS-T04

## topic
Basic tissues

## subtopic
Bone

## microtopic
Bone Cells

## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Histology > Bone > Bone Cells

## article_ids
ART-103-HIS-BONE-MATRIX-CLASSIFICATION

## related_article_ids
ART-103-HIS-BONE-MATRIX-CLASSIFICATION

## related_concept_ids
CON-MSK-76CE11C6DCDC37

## resource_ids
src_2bf25a6864c9f6ce3283

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.35

## exam_weight_by_year
KAU_Y1=0.35

## clinical_relevance
0.35

## academic_relevance
0.85

## weight_confidence
0.3

## confidence
0.85

## exam_signal


## atomic_claim_ids
CLM-MSK-OSTEOCLAST-MEGAKARYOCYTE-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Comparison between megakaryocyte and osteoclast] "Site: Bone marrow / Howship's lacuna on inner bone surface. Diameter: 50-70 µm / 150 µm. Cytoplasm: Basophilic / Foamy acidophilic. Nucleus: Single, multilobed / Multinucleated. Function: Form platelets / Bone resorption."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book gives no cause for the confusion beyond the table itself; it does not explain why the two look superficially similar under low power.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

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
microtopicId: The department book's own section, "Bone Cells", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-HIS-T02.
nanotopicId: "Bone Cells" is the finest heading the department book prints under Bone; a nanotopic below it would be invented.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the image it needs is requested on ART-103-HIS-BONE-MATRIX-CLASSIFICATION.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "megakaryocyte" — hits are haematology concepts about platelet formation with no comparison to the osteoclast; no candidate for this specific comparison record.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
CON-MSK-89674D65B2316B

## label
Bone matrix: organic and inorganic parts
## canonical_key
bone.matrix.organic-inorganic-composition

## aliases
Bone matrix composition
Organic part of bone matrix
Inorganic part of bone matrix
Osteoporosis

## arabic_label
تركيب مصفوفة العظم

## arabic_aliases
المصفوفة العظمية

## definition
Bone matrix is formed of two main parts. The **organic part (35%)** is mainly **type I collagen** fibres arranged as thick bundles, plus ground substance in the form of glycosaminoglycans and glycoproteins.

The **inorganic part (65%)** is mainly **calcium salts**, as calcium phosphate and carbonate, present on the surface of collagen bundles and within the ground substance, and it __causes the hardness of bone__. The matrix is arranged as lamellae of calcified collagen bundles embedded in calcified ground substance.

**Osteoporosis**, a common bone disease with progressive loss of normal bone density and increased fracture risk, is caused by __bone resorption exceeding bone formation__.
## explicit_objective
State the two components of bone matrix, their approximate proportions, and what each contributes to bone's properties, and define osteoporosis in terms of the osteoblast-osteoclast balance.

## pitfalls
Reversing the percentages. The organic part, mostly collagen, is the smaller share at 35%; the inorganic mineral part is the larger share at 65% and is what makes bone hard rather than merely tough.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-HIS-T02

## secondary_node_ids
DIS-HIS-T01
DIS-HIS-T04

## topic
Basic tissues

## subtopic
Bone

## microtopic
Bone Matrix: Ground substance & Fibers

## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Histology > Bone > Bone Matrix: Ground substance & Fibers

## article_ids
ART-103-HIS-BONE-MATRIX-CLASSIFICATION

## related_article_ids
ART-103-HIS-BONE-MATRIX-CLASSIFICATION

## related_concept_ids
CON-MSK-0E9A4639848229
CON-MSK-52DC4C4BF9126D

## resource_ids
src_2bf25a6864c9f6ce3283

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.4

## exam_weight_by_year
KAU_Y1=0.4

## clinical_relevance
0.5

## academic_relevance
0.85

## weight_confidence
0.3

## confidence
0.85

## exam_signal


## atomic_claim_ids
CLM-MSK-BONE-MATRIX-COMPOSITION-01
CLM-MSK-BONE-MATRIX-COMPOSITION-02

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Bone Matrix] "1- ORGANIC PART (35%): It is mainly formed of type I collagen fibers which are arranged as thick bundles & ground substance... 2- INORGANIC PART (65%): It is mainly formed of calcium salts in the form of calcium phosphate & carbonate."
[Read only topic] "Osteoporosis is a common bone disease, characterized by progressive loss of normal bone density that increases the risk of bone fracture. It is caused by increased bone resorption over bone formation."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book does not state whether the 35/65 split is by dry weight or by volume.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

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
microtopicId: The department book's own section, "Bone Matrix: Ground substance & Fibers", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-HIS-T02.
nanotopicId: "Bone Matrix: Ground substance & Fibers" is the finest heading the department book prints under Bone; a nanotopic below it would be invented.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the image it needs is requested on ART-103-HIS-BONE-MATRIX-CLASSIFICATION.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "bone matrix" — two narrow live concepts exist (ground substance and fibres named without proportions; lamellar arrangement) neither of which states the organic/inorganic percentages this record adds.
rejectedMergeCandidateIds: CON-MSK-0E9A4639848229 and CON-MSK-52DC4C4BF9126D each state a single narrow fact about bone matrix (its components exist; its lamellar arrangement) without the organic/inorganic proportions and osteoporosis link this record adds; not merged, cross-linked instead, and both are updated elsewhere in this file to carry this module.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
CON-MSK-514B359316B831

## label
Preparing a bone section: decalcification vs grinding
## canonical_key
bone.preparation.decalcification-vs-grinding

## aliases
Decalcification method
Grinding method
Preparation of bone sections

## arabic_label
طرق تحضير مقاطع العظم

## arabic_aliases
إزالة الكالسيوم
طريقة الطحن

## definition
Bone's hardness, from its calcium content, is the main problem in preparing a section.

In the **decalcification method**, calcium is removed by treating the bone with a mineral acid such as 10% nitric acid; the bone becomes soft and can be cut and stained, and __decalcified sections demonstrate the bone cells and soft tissues__.

In the **grinding method**, bone is dried in air, cut into small pieces with a saw, and thinned by grinding on a carborundum wheel; the resulting ground sections are unstained and show only the bone lamellae, lacunae, canaliculi, and the Haversian and Volkmann's canals, with __no cells__. The grinding method is not used for spongy bone.
## explicit_objective
Compare the decalcification and grinding methods of preparing a bone section on their steps and on what each does and does not show.

## pitfalls
Expecting a ground bone section to show cells. Grinding preserves the mineral architecture but destroys or removes everything cellular; only a decalcified section shows the cells.

## concept_type
investigation

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-HIS-T02

## secondary_node_ids
DIS-HIS-T01
DIS-HIS-T04

## topic
Basic tissues

## subtopic
Bone

## microtopic
Methods of Preparation of Bone Sections

## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Histology > Bone > Methods of Preparation of Bone Sections

## article_ids
ART-103-HIS-BONE-MATRIX-CLASSIFICATION

## related_article_ids
ART-103-HIS-BONE-MATRIX-CLASSIFICATION

## related_concept_ids
[clear]

## resource_ids
src_2bf25a6864c9f6ce3283

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.3

## exam_weight_by_year
KAU_Y1=0.3

## clinical_relevance
0.3

## academic_relevance
0.8

## weight_confidence
0.3

## confidence
0.85

## exam_signal


## atomic_claim_ids
CLM-MSK-BONE-PREPARATION-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Methods of Preparation of Bone Sections] "1- Decalcification method... Decalcified bone sections demonstrate the bone cells and soft tissues. 2- Grinding method... Ground bone sections are unstained sections which only show the bone lamellae, lacunae, canaliculi (no cells), Haversian & Volkmann's canals."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book does not state why the grinding method is unsuitable for spongy bone, only that it is not used for it.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

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
microtopicId: The department book's own section, "Methods of Preparation of Bone Sections", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-HIS-T02.
nanotopicId: "Methods of Preparation of Bone Sections" is the finest heading the department book prints under Bone; a nanotopic below it would be invented.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the image it needs is requested on ART-103-HIS-BONE-MATRIX-CLASSIFICATION.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "decalcification" and "grinding method" — no existing record of any kind.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
CON-MSK-B55521FFEC2527

## label
Anatomical and histological classification of bone
## canonical_key
bone.classification.anatomical-vs-histological

## aliases
Classification of bone
Long bone
Short bone
Flat bone
Irregular bone

## arabic_label
تصنيف العظام

## arabic_aliases
العظام الطويلة
العظام القصيرة
العظام المسطحة
العظام غير المنتظمة

## definition
There are two methods for classifying bone.

The **anatomical classification**, by the shape of the bone, gives four types: __long bones, short bones, flat bones, and irregular bones__.

The **histological classification**, by the structure of the bone, gives two types: __compact bone and spongy (cancellous) bone__.
## explicit_objective
State the two classification systems for bone and list the categories each contains.

## pitfalls
Treating "long, short, flat, irregular" and "compact, spongy" as one classification. They are two independent systems on two different axes — shape versus internal structure — and a single bone, for instance a long bone, normally shows both compact and spongy bone within it.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-HIS-T02

## secondary_node_ids
DIS-HIS-T01
DIS-HIS-T04

## topic
Basic tissues

## subtopic
Bone

## microtopic
Classification of the Bone

## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Histology > Bone > Classification of the Bone

## article_ids
ART-103-HIS-BONE-MATRIX-CLASSIFICATION

## related_article_ids
ART-103-HIS-BONE-MATRIX-CLASSIFICATION

## related_concept_ids
[clear]

## resource_ids
src_2bf25a6864c9f6ce3283

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.3

## exam_weight_by_year
KAU_Y1=0.3

## clinical_relevance
0.25

## academic_relevance
0.8

## weight_confidence
0.3

## confidence
0.85

## exam_signal


## atomic_claim_ids
CLM-MSK-BONE-CLASSIFICATION-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Classification of the Bone] "I- ANATOMICAL CLASSIFICATION (According to the shape of bone): 1- Long bones 2- Short bones. 3- Flat bones. 4- Irregular bones. II- HISTOLOGICAL CLASSIFICATION (According to structure of bone): A- Compact bone B- Spongy bone."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book gives no examples of which named bones belong to each anatomical category in this chapter.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

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
microtopicId: The department book's own section, "Classification of the Bone", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-HIS-T02.
nanotopicId: "Classification of the Bone" is the finest heading the department book prints under Bone; a nanotopic below it would be invented.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the image it needs is requested on ART-103-HIS-BONE-MATRIX-CLASSIFICATION.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "classification of bone" and "anatomical classification" — no existing record states both systems together for this book.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
CON-MSK-A67054CAEEE89E

## label
Compact bone and the Haversian system
## canonical_key
bone.compact.haversian-system-structure

## aliases
Compact bone
Haversian system
Osteon
Volkmann canal
Sharpey fibers
Interstitial lamellae
Circumferential lamellae

## arabic_label
العظم المدمج والجهاز الهافرسي

## arabic_aliases
نظام هافرس
العظم الكثيف

## definition
**Compact bone** forms the shaft of long bones and also covers the surface of spongy bone. From outside in it is built of several layers.

The **periosteum** covers the outer surface. Beneath it, the **external circumferential lamellae** are osteocytes in lacunae between lamellae of calcified collagen bundles running parallel to the bone surface.

The **Haversian system (osteon)** is the __structural unit of compact bone__: cylindrical structures arranged parallel to the long axis of the bone, each with a central **Haversian canal** carrying blood vessels and nerves in loose connective tissue, surrounded by 5 to 20 concentric circular bony lamellae with osteocytes in lacunae between them, and connected to each other and to the periosteum or marrow cavity by transverse or oblique **Volkmann's canals**.

**Interstitial lamellae** are irregularly arranged lamellae and osteocytes filling the spaces between Haversian systems. **Internal circumferential lamellae** run parallel to the inner circumference, surrounding the marrow cavity, and the **endosteum** lines the inner surface.

**Perforating fibres of Sharpey** are calcified collagen fibres from tendons or ligaments that perforate the periosteum, attach to the external circumferential lamellae, become continuous with the matrix collagen, and __fix the tendon to the bone__.
## explicit_objective
List, from outside to inside, the six structural components of compact bone, describe the Haversian system, and state the role of Volkmann's canals and Sharpey's fibres.

## pitfalls
Treating the Haversian canal and the Volkmann canal as the same structure. Haversian canals run longitudinally, parallel to the shaft, inside each osteon; Volkmann canals run transversely or obliquely and connect Haversian canals to each other and to the surface — they cross osteons rather than sitting inside one.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-HIS-T02

## secondary_node_ids
DIS-HIS-T01
DIS-HIS-T04

## topic
Basic tissues

## subtopic
Bone

## microtopic
Compact Bone

## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Histology > Bone > Compact Bone

## article_ids
ART-103-HIS-COMPACT-SPONGY-BONE

## related_article_ids
ART-103-HIS-COMPACT-SPONGY-BONE

## related_concept_ids
CON-MSK-5DF0AED914A81E
CON-MSK-702060D54048F5

## resource_ids
src_2bf25a6864c9f6ce3283

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.5

## exam_weight_by_year
KAU_Y1=0.5

## clinical_relevance
0.4

## academic_relevance
0.9

## weight_confidence
0.3

## confidence
0.85

## exam_signal


## atomic_claim_ids
CLM-MSK-COMPACT-BONE-HAVERSIAN-01
CLM-MSK-COMPACT-BONE-HAVERSIAN-02

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Compact Bone, Haversian System] "They are cylindrical structures which are longitudinally arranged parallel to longitudinal axis of bone. Each one is formed of a central canal (Haversian canal)... surrounded by 5-20 of concentrically arranged circular bony lamellae."
[Compact Bone] "Compact bone has transverse or oblique canals that connect Haversian canals together & with periosteum or bone marrow cavity, called Volkmann's canals."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book does not state a typical diameter for the Haversian canal or system, only the 5-20 lamella count.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

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
microtopicId: The department book's own section, "Compact Bone", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-HIS-T02.
nanotopicId: "Compact Bone" is the finest heading the department book prints under Bone; a nanotopic below it would be invented.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the image it needs is requested on ART-103-HIS-COMPACT-SPONGY-BONE.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "Haversian" and "osteon" — two narrow live concepts exist (canal contents; lamella count) but neither states the whole six-part structure of compact bone this record synthesises.
rejectedMergeCandidateIds: CON-MSK-5DF0AED914A81E (lamella count) and CON-MSK-702060D54048F5 (canal contents) each state one fact about the Haversian canal alone; this record is the whole compact-bone structure the book teaches as one unit. Not merged, cross-linked, and both are updated elsewhere in this file to carry this module.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
CON-MSK-0403FC429F118B

## label
Spongy (cancellous) bone
## canonical_key
bone.spongy.structure-sites

## aliases
Spongy bone
Cancellous bone
Bony trabeculae

## arabic_label
العظم الإسفنجي

## arabic_aliases
العظم الشبكي

## definition
**Spongy (cancellous) bone** is present in the centre of flat, short and irregular bones, and in the epiphysis of long bones.

It is formed of irregular, branching and anastomosing **bony trabeculae** enclosing irregular bone marrow cavities between them. Each trabecula is formed of bone lamellae with osteocytes between them, and there are __no Haversian systems__.

The bone surface is covered by periosteum and the marrow cavities are lined by endosteum.
## explicit_objective
State the sites of spongy bone and describe its trabecular structure, contrasting it with compact bone's Haversian organisation.

## pitfalls
Looking for a Haversian system inside spongy bone. The book states explicitly that spongy bone has none; its lamellae follow the branching trabeculae instead of concentric canals.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-HIS-T02

## secondary_node_ids
DIS-HIS-T01
DIS-HIS-T04

## topic
Basic tissues

## subtopic
Bone

## microtopic
Cancellous (Spongy) Bone

## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Histology > Bone > Cancellous (Spongy) Bone

## article_ids
ART-103-HIS-COMPACT-SPONGY-BONE

## related_article_ids
ART-103-HIS-COMPACT-SPONGY-BONE

## related_concept_ids
[clear]

## resource_ids
src_2bf25a6864c9f6ce3283

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.35

## exam_weight_by_year
KAU_Y1=0.35

## clinical_relevance
0.3

## academic_relevance
0.85

## weight_confidence
0.3

## confidence
0.85

## exam_signal


## atomic_claim_ids
CLM-MSK-SPONGY-BONE-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Cancellous (Spongy) Bone] "Spongy bone is present in the center of flat, short & irregular bones as well as epiphysis of long bones... It is formed of irregular branching & anastomosing bony trabeculae enclosing between them irregular bone marrow cavities... No Haversian systems."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book gives no trabecular thickness or spacing figures for spongy bone.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

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
microtopicId: The department book's own section, "Cancellous (Spongy) Bone", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-HIS-T02.
nanotopicId: "Cancellous (Spongy) Bone" is the finest heading the department book prints under Bone; a nanotopic below it would be invented.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the image it needs is requested on ART-103-HIS-COMPACT-SPONGY-BONE.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "spongy bone" and "cancellous bone" — no existing record of any kind.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
CON-MSK-092F6F14307DB9

## label
The two methods of bone formation
## canonical_key
bone.ossification.two-methods-overview

## aliases
Ossification
Bone formation
Intramembranous ossification overview
Intracartilaginous ossification overview

## arabic_label
التعظم: نظرة عامة

## arabic_aliases
تكوين العظم

## definition
Bones of the body are formed by one of two methods. **Intramembranous ossification** occurs in flat bones, from a mesenchymal connective tissue membrane.

**Intracartilaginous (endochondral) ossification** replaces a cartilage model with bone and occurs in long, short and irregular bones.

A __balance between osteoblast and osteoclast activity__ is necessary for a stable blood calcium level: osteoclast activity is stimulated by **parathyroid hormone** and inhibited by **calcitonin** from the C-cells of the thyroid, and calcitonin is used in treating osteoporosis.
## explicit_objective
Name the two methods of ossification and which bones use each, and state how parathyroid hormone and calcitonin oppose each other in regulating osteoclast activity.

## pitfalls
Assuming all bones ossify the same way. Flat bones ossify directly within a mesenchymal membrane; long, short and irregular bones ossify by replacing a pre-existing cartilage model — the starting tissue is different in each case.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-HIS-T02

## secondary_node_ids
DIS-HIS-T01
DIS-HIS-T04

## topic
Basic tissues

## subtopic
Bone

## microtopic
Ossification (Bone Formation)

## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Histology > Bone > Ossification (Bone Formation)

## article_ids
ART-103-HIS-BONE-OSSIFICATION

## related_article_ids
ART-103-HIS-BONE-OSSIFICATION

## related_concept_ids
[clear]

## resource_ids
src_2bf25a6864c9f6ce3283

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.4

## exam_weight_by_year
KAU_Y1=0.4

## clinical_relevance
0.45

## academic_relevance
0.85

## weight_confidence
0.3

## confidence
0.85

## exam_signal


## atomic_claim_ids
CLM-MSK-OSSIFICATION-OVERVIEW-01
CLM-MSK-OSSIFICATION-OVERVIEW-02

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Ossification (Bone Formation)] "Bones of the body are formed by one of two methods: - I- Intramembranous ossification. II- Intracartilagenous ossification"
[Read only topics] "Osteoclast activity is hormonally regulated, stimulated by the parathyroid hormone, and inhibited by calcitonin from C-cells of the thyroid gland. Calcitonin is given in the treatment of patients with osteoporosis."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book does not state which method is faster or which produces stronger bone; the two are presented as parallel routes to the same tissue.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

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
microtopicId: The department book's own section, "Ossification (Bone Formation)", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-HIS-T02.
nanotopicId: "Ossification (Bone Formation)" is the finest heading the department book prints under Bone; a nanotopic below it would be invented.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the image it needs is requested on ART-103-HIS-BONE-OSSIFICATION.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "ossification" and "intramembranous" — a pending 101 ISK alias exists for each term, from a different module's different book, not a candidate for this record.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
CON-MSK-C2EFE3D04B945A

## label
Intramembranous ossification
## canonical_key
bone.ossification.intramembranous.steps

## aliases
Intramembranous ossification
Ossification centre
Membrane bone

## arabic_label
التعظم الغشائي

## arabic_aliases
التعظم داخل الغشاء

## definition
**Intramembranous ossification** occurs in flat bones, starting from a mesenchymal connective tissue membrane of undifferentiated mesenchymal cells, fibres and blood vessels.

These cells condense at areas rich in blood vessels, called **ossification centres**, and differentiate through osteogenic cells into **osteoblasts**. The osteoblasts lay down **osteoid**, which calcifies; some osteoblasts become imprisoned in lacunae as **osteocytes**.

Osteoblasts on the trabecular bone surfaces continue producing matrix, so trabeculae thicken, branch and anastomose to form **spongy bone**, and the spaces between them become occupied by bone marrow cells arriving with blood vessels.

At either side of the central spongy bone, __remodelling replaces spongy bone with compact bone__, and beyond the compact bone a specialised connective tissue invests the developing bone to become the **periosteum**.
## explicit_objective
Describe, in order, the steps of intramembranous ossification from mesenchymal membrane to periosteum-covered bone.

## pitfalls
Thinking intramembranous ossification skips a spongy-bone stage. It does not: trabeculae of spongy bone form first from the ossification centre and are only later remodelled into compact bone at the bone's margins.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-HIS-T02

## secondary_node_ids
DIS-HIS-T01
DIS-HIS-T04

## topic
Basic tissues

## subtopic
Bone

## microtopic
Intramembranous Ossification

## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Histology > Bone > Intramembranous Ossification

## article_ids
ART-103-HIS-BONE-OSSIFICATION

## related_article_ids
ART-103-HIS-BONE-OSSIFICATION

## related_concept_ids
[clear]

## resource_ids
src_2bf25a6864c9f6ce3283

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.4

## exam_weight_by_year
KAU_Y1=0.4

## clinical_relevance
0.35

## academic_relevance
0.9

## weight_confidence
0.3

## confidence
0.85

## exam_signal


## atomic_claim_ids
CLM-MSK-INTRAMEMBRANOUS-01
CLM-MSK-INTRAMEMBRANOUS-02

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Intramembranous Ossification] "UMCs condense at areas rich in blood vessels, these areas are known as ossification centers (O.Cs)... Osteoblasts lay down osteoid which calcify, some osteoblasts will be imprisoned in lacunae & become osteocytes."
[Intramembranous Ossification] "At either side of the central spongy bone, a process of remodeling takes place (replacement of spongy bone by compact bone). At either side of the compact bone, a specialized connective tissue invests developing bone to become the periosteum."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book does not name a specific flat bone as a worked example for this process within the histology chapter.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

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
microtopicId: The department book's own section, "Intramembranous Ossification", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-HIS-T02.
nanotopicId: "Intramembranous Ossification" is the finest heading the department book prints under Bone; a nanotopic below it would be invented.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the image it needs is requested on ART-103-HIS-BONE-OSSIFICATION.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "intramembranous ossification" and "ossification centre" — the only hit is a pending 101 ISK alias from a different module's anatomy MCQ set, not a process description.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
CON-MSK-745C364E5BDA5D

## label
The primary ossification centre
## canonical_key
bone.ossification.intracartilaginous.primary-center

## aliases
Primary ossification center
Periosteal bone collar
Intracartilaginous ossification
Endochondral ossification

## arabic_label
مركز التعظم الأولي

## arabic_aliases
التعظم الغضروفي

## definition
**Intracartilaginous (endochondral) ossification** replaces a cartilage model with compact or spongy bone, in long, short and irregular bones; a long bone has a shaft (**diaphysis**) and two ends (**epiphyses**).

The **primary ossification centre** appears in the middle of the diaphysis. Increased vascularity of the perichondrium turns chondrogenic cells into osteogenic cells that differentiate into osteoblasts, so the __perichondrium becomes periosteum__, and osteoblasts form a **periosteal bone collar** of bone around the cartilage model.

The bone collar blocks diffusion of oxygen and nutrients to the underlying cartilage, so the central chondrocytes enlarge and deposit calcium; __calcification of the cartilage matrix kills these chondrocytes__, leaving irregular cavities.

**Osteoclasts** open holes in the bone collar, letting a vascular core of undifferentiated mesenchymal cells and blood vessels invade the cavities; the mesenchymal cells become osteogenic cells, then osteoblasts, which deposit bone matrix as irregular trabeculae of spongy bone, the spaces between them occupied by bone marrow.

Osteoclasts then merge the irregular marrow cavities into one regular cavity, and the bony lamellae become regularly, concentrically arranged into **Haversian systems**, forming compact bone.
## explicit_objective
Describe, in order, the steps of the primary ossification centre from bone collar formation to compact-bone Haversian system, and explain why the bone collar causes chondrocyte death at the model's centre.

## pitfalls
Assuming osteoblasts alone drive intracartilaginous ossification. Osteoclasts are just as essential — they open the bone collar to let the vascular invasion in, and later merge the irregular marrow cavities into one regular cavity; without them the invasion and the final Haversian architecture cannot happen.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-HIS-T02

## secondary_node_ids
DIS-HIS-T01
DIS-HIS-T04

## topic
Basic tissues

## subtopic
Bone

## microtopic
Intracartilagenous Ossification

## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Histology > Bone > Intracartilagenous Ossification

## article_ids
ART-103-HIS-BONE-OSSIFICATION

## related_article_ids
ART-103-HIS-BONE-OSSIFICATION

## related_concept_ids
[clear]

## resource_ids
src_2bf25a6864c9f6ce3283

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.5

## exam_weight_by_year
KAU_Y1=0.5

## clinical_relevance
0.4

## academic_relevance
0.9

## weight_confidence
0.3

## confidence
0.85

## exam_signal


## atomic_claim_ids
CLM-MSK-PRIMARY-OSSIFICATION-01
CLM-MSK-PRIMARY-OSSIFICATION-02

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Intracartilagenous Ossification, Primary ossification center] "Osteoblasts form a layer of bone around the cartilage model & under the periosteum called periosteal bone collar. Bone collar impedes the diffusion of O2 and nutrients to the underlying cartage cells."
[Intracartilagenous Ossification] "Osteoclasts form holes in the bone collar so a vascular core formed of U.M.C. & blood vessels invade the irregular cavities within the model... Bony lamellae become regularly & concentrically arranged forming Haversian system & compact bone."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book does not give a gestational or postnatal timing for when the primary centre appears, only that it occurs "in the middle of the diaphysis".

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

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
microtopicId: The department book's own section, "Intracartilagenous Ossification", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-HIS-T02.
nanotopicId: "Intracartilagenous Ossification" is the finest heading the department book prints under Bone; a nanotopic below it would be invented.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the image it needs is requested on ART-103-HIS-BONE-OSSIFICATION.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "primary ossification center" and "bone collar" — the only hit is a pending 101 ISK alias for endochondral ossification generally, from a different module's book, without this record's step-by-step content.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
CON-MSK-EBA37D8401180C

## label
The secondary ossification centre and epiphyseal plate
## canonical_key
bone.ossification.secondary-center-and-epiphyseal-zones

## aliases
Secondary ossification center
Epiphyseal plate
Epiphyseal cartilage zones
Zone of hypertrophy
Zone of calcification
Zone of resting cartilage

## arabic_label
مركز التعظم الثانوي ومناطق الغضروف المشاشي

## arabic_aliases
الصفيحة المشاشية

## definition
The **secondary ossification centre** appears in the **epiphysis** and follows steps like the primary centre until the cartilage is replaced by spongy bone.

Once ossification is complete, the entire cartilage model is replaced by bone except for two structures: the **epiphyseal plate** of cartilage between epiphysis and diaphysis, and the **articular cartilage** at the bony ends.

The **epiphyseal plate** passes through zones: a zone of __resting__ hyaline cartilage; a __proliferative__ zone where cells increase in number and line up in parallel rows; a zone of __hypertrophy__ where cells enlarge as glycogen and alkaline phosphatase accumulate; a zone of __calcification__ where chondrocytes deposit calcium and die, leaving empty spaces; a zone of __invasion__ where an avascular bud of capillaries and mesenchymal cells enters through holes the osteoclasts have made; and a zone of __ossification__ where mesenchymal cells and pericytes become osteogenic cells, then osteoblasts, depositing matrix as irregular spongy trabeculae.

A **remodelling stage** follows, in which osteoclasts resorb bone from some areas while osteoblasts deposit new bone in others, producing a single marrow cavity, and a final **compact bone** stage develops the Haversian system with one central marrow cavity.
## explicit_objective
List the six zones of the epiphyseal cartilage in order from resting cartilage to ossification, and name the two structures that remain cartilage even after ossification is otherwise complete.

## pitfalls
Forgetting that two pieces of cartilage survive ossification on purpose. The epiphyseal plate stays cartilage so the bone can keep lengthening, and the articular cartilage stays cartilage so the joint surface can glide — both are exceptions the book states explicitly, not an incomplete process.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-HIS-T02

## secondary_node_ids
DIS-HIS-T01
DIS-HIS-T04

## topic
Basic tissues

## subtopic
Bone

## microtopic
Intracartilagenous Ossification

## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Histology > Bone > Intracartilagenous Ossification

## article_ids
ART-103-HIS-BONE-OSSIFICATION

## related_article_ids
ART-103-HIS-BONE-OSSIFICATION

## related_concept_ids
[clear]

## resource_ids
src_2bf25a6864c9f6ce3283

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.5

## exam_weight_by_year
KAU_Y1=0.5

## clinical_relevance
0.4

## academic_relevance
0.9

## weight_confidence
0.3

## confidence
0.85

## exam_signal


## atomic_claim_ids
CLM-MSK-SECONDARY-OSSIFICATION-01
CLM-MSK-SECONDARY-OSSIFICATION-02

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Intracartilagenous Ossification, Secondary ossification center] "Now the entire cartilage model is replaced by bone except: A plate of cartilage present between epiphysis & diaphysis & is called epiphyseal plate. Articular cartilage at the bony ends."
[Changes at the epiphyseal cartilage] "Zone of resting hyaline cartilage... Proliferative zone... Zone of hypertrophy... Zone of calcification... Zone of invasion... Zone of ossification... Remodeling stage... Stage of compact bone formation."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book numbers these as "3- Changes at the epiphyseal cartilage" but does not state whether every named zone is physically distinct on a single slide or whether some are only distinguishable by activity rather than location.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

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
microtopicId: The department book's own section, "Intracartilagenous Ossification", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-HIS-T02.
nanotopicId: "Intracartilagenous Ossification" is the finest heading the department book prints under Bone; a nanotopic below it would be invented.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the image it needs is requested on ART-103-HIS-BONE-OSSIFICATION.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "epiphyseal plate" and "secondary ossification center" — the only hits are a pending 101 ISK anatomy record about where a long bone lengthens, from a different module's different book, without this record's six-zone histological detail.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
CON-MSK-507DCD2CD12E15

## label
The connective-tissue coats of skeletal muscle
## canonical_key
skeletal-muscle.organisation.epimysium-perimysium-endomysium

## aliases
Epimysium
Perimysium
Endomysium
Skeletal muscle organisation
Muscle connective tissue coverings

## arabic_label
الأغلفة الضامة للعضلة الهيكلية

## arabic_aliases
غلاف العضلة الخارجي
غلاف الحزمة العضلية
غلاف الليفة العضلية

## definition
Skeletal muscles are attached to the skeleton, except for the muscles of the face and tongue, the pharynx and upper third of the oesophagus, the diaphragm, and the cremasteric muscles.

Skeletal muscle consists of muscle fibres held together and supported by connective tissue organised into **three nested layers**.

The **epimysium** is dense connective tissue surrounding the whole muscle, penetrated by its major vessels and nerves. The **perimysium** is less dense connective tissue descending from the epimysium that surrounds a group of fibres to form a **bundle (fascicle)**, carrying large vessels and nerves. The **endomysium** is a layer of reticular fibres surrounding each individual fibre, carrying small vessels and fine nerves.

This connective tissue __transmits force and connects the fibres together__, and its vessels nourish the muscle cells by diffusion.
## explicit_objective
Name the four exceptions to skeletal muscle being bone-attached, and describe the three connective-tissue layers of a skeletal muscle from whole muscle down to single fibre.

## pitfalls
Placing the layers in the wrong order or scale. Epimysium wraps the whole muscle, perimysium wraps one fascicle (a bundle of fibres), and endomysium wraps a single fibre — mixing up perimysium and endomysium is the most common slip, since both sound similar and both carry small vessels.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-HIS-T02

## secondary_node_ids
DIS-HIS-T01
DIS-HIS-T04

## topic
Basic tissues

## subtopic
Muscle Tissue

## microtopic
Skeletal Muscle

## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Histology > Muscle Tissue > Skeletal Muscle

## article_ids
ART-103-HIS-SKELETAL-MUSCLE-STRUCTURE

## related_article_ids
ART-103-HIS-SKELETAL-MUSCLE-STRUCTURE

## related_concept_ids
CON-MSK-81DB31A24F7B4E

## resource_ids
src_2bf25a6864c9f6ce3283

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.4

## exam_weight_by_year
KAU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.85

## weight_confidence
0.3

## confidence
0.85

## exam_signal


## atomic_claim_ids
CLM-MSK-SKELETAL-ORGANISATION-01
CLM-MSK-SKELETAL-ORGANISATION-02

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Skeletal Muscle, Sites] "Skeletal muscles are attached to the skeleton, EXCEPT: Face, tongue. Pharynx & upper 1/3 of esophagus. Diaphragm. Cremasteric muscles."
[Skeletal Muscle, Organization] "a) Epimysium... b) Perimysium... c) Endomysium: A layer of reticular fibers that surround each muscle fiber."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book does not explain why the named exceptions (face, tongue, pharynx, diaphragm, cremaster) are not attached to bone at both ends, only that they are exceptions.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

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
microtopicId: The department book's own section, "Skeletal Muscle", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-HIS-T02.
nanotopicId: "Skeletal Muscle" is the finest heading the department book prints under Muscle Tissue; a nanotopic below it would be invented.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the image it needs is requested on ART-103-HIS-SKELETAL-MUSCLE-STRUCTURE.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "epimysium", "perimysium" and "endomysium" — no existing record of any kind; the only near hit, musculotendinous junction, describes a different site (where muscle meets tendon) and is cross-linked rather than merged.
rejectedMergeCandidateIds: CON-MSK-81DB31A24F7B4E (musculotendinous junction) is about the muscle-tendon interface, not the three-layer connective tissue coat; not merged, cross-linked instead.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
CON-MSK-2493DDAE4798CE

## label
The skeletal muscle fibre
## canonical_key
skeletal-muscle.fibre.lm-picture-and-sarcoplasm-contents

## aliases
Skeletal muscle fibre
Myofiber
Sarcolemma
Sarcoplasm
Myoglobin

## arabic_label
الليفة العضلية الهيكلية

## arabic_aliases
الليف العضلي الهيكلي
الساركوليما
الساركوبلازم

## definition
Each **skeletal muscle fibre** is a long cell, 10 to 100 micrometres in diameter and markedly variable in length, cylindrical and non-branched except in the face and tongue. Its **sarcolemma** is thick from fusion with the surrounding basal lamina and endomysium.

Each fibre has __multiple, oval, peripheral nuclei__, one for every mononucleated myoblast that fused to form it. Its sarcoplasm is acidophilic with uniformly placed transverse striations, clearest in longitudinal section.

The sarcoplasm contains **myofibrils** running the fibre's full length; a well-developed **sarcoplasmic reticulum**, a tubular network around the myofibrils specialised for calcium storage and pumping; numerous mitochondria arranged in rows between myofibrils; **myoglobin**, an oxygen-binding pigment; and glycogen and lipid granules between the myofibrils for energy.

Muscle tissue is __mesodermal__: undifferentiated mesenchymal cells differentiate into **myoblasts**, embryonic progenitors that differentiate into myocytes, which can form any of the three muscle types.
## explicit_objective
State the size, shape, sarcolemma, nuclear pattern and sarcoplasmic contents of a skeletal muscle fibre by light microscopy, and trace muscle tissue's mesodermal origin from mesenchymal cell to myocyte.

## pitfalls
Expecting one nucleus per skeletal muscle fibre. Each fibre has multiple peripheral nuclei, one per fused myoblast — this is the feature that most reliably separates skeletal muscle from cardiac muscle (one or two central nuclei) on a slide.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-HIS-T02

## secondary_node_ids
DIS-HIS-T01
DIS-HIS-T04

## topic
Basic tissues

## subtopic
Muscle Tissue

## microtopic
Skeletal Muscle

## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Histology > Muscle Tissue > Skeletal Muscle

## article_ids
ART-103-HIS-SKELETAL-MUSCLE-STRUCTURE

## related_article_ids
ART-103-HIS-SKELETAL-MUSCLE-STRUCTURE

## related_concept_ids
CON-MSK-E36936D62038BF | CON-MSK-B080975D6171CF | CON-MSK-2E451ACE10A724

## resource_ids
src_2bf25a6864c9f6ce3283

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.45

## exam_weight_by_year
KAU_Y1=0.45

## clinical_relevance
0.3

## academic_relevance
0.9

## weight_confidence
0.3

## confidence
0.85

## exam_signal


## atomic_claim_ids
CLM-MSK-SKELETAL-FIBRE-LM-01
CLM-MSK-SKELETAL-FIBRE-LM-02

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Skeletal Muscle Fiber, LM picture] "Size: 10-100µm in diameter... Nuclei: each cell has multiple, oval peripheral nuclei. Their number in each cell corresponds to the number of fused mononucleated myoblasts."
[Origin of the Muscle Tissue] "Undifferentiated mesenchymal cells → differentiate first into myoblasts. Myoblasts are embryonic progenitor cells that differentiate into myocytes."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book states the length is "markedly variable" without giving a range, unlike the diameter, which is given as 10 to 100 micrometres.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

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
microtopicId: The department book's own section, "Skeletal Muscle", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-HIS-T02.
nanotopicId: "Skeletal Muscle" is the finest heading the department book prints under Muscle Tissue; a nanotopic below it would be invented.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the image it needs is requested on ART-103-HIS-SKELETAL-MUSCLE-STRUCTURE.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "sarcolemma", "myofiber" and "skeletal muscle fibre" — no existing live concept describes the fibre's own LM picture; the only near neighbour, A and I bands, is an update row in this file and is cross-linked rather than folded in, since it describes the EM striation pattern rather than the whole-fibre LM picture.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
CON-MSK-0824FE988ADA00

## label
The sarcomere: the contractile unit
## canonical_key
skeletal-muscle.sarcomere.definition-z-line-to-z-line

## aliases
Sarcomere
Z line
H zone
M line
Contractile unit

## arabic_label
الوحدة القِسيمية العضلية

## arabic_aliases
الساركومير
الخط Z

## definition
The **sarcomere** is the portion of a myofibril between two adjacent **Z lines**. It includes one dark (**A**) band and the two halves of the light (**I**) bands on either side, and it is the __basic functional unit of contraction__ in striated muscle.

Within it, thick **myosin** filaments are restricted to the A band; thin **actin** filaments attach to the Z line, pass through the I band, and extend into the A band as far as the start of the H zone.

The **A band** appears dark because it holds both myosin and actin; its central paler **H zone** holds only myosin; the **M line** that bisects the H zone is produced by interconnections of adjacent myosin filaments; the **I band** appears light because it holds only actin; and the **Z line** is dense with condensed actin filaments and accessory proteins that keep the thick and thin filaments precisely aligned.

On contraction, __the I bands shorten and the H zone is abolished while the A band's length stays constant__, because the filaments overlap further rather than shortening themselves.
## explicit_objective
Define the sarcomere by its Z-line boundaries, name its component bands and lines, state which filament occupies each, and explain why the A band does not change length on contraction while the I band does.

## pitfalls
Assuming the myosin or actin filaments themselves shorten during contraction. They do not: the A band's length is constant because it is fixed by the myosin filament's own length, and shortening comes entirely from the filaments sliding further across each other, which is why the I band and H zone shrink while the A band does not.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-HIS-T02

## secondary_node_ids
DIS-HIS-T01
DIS-HIS-T04

## topic
Basic tissues

## subtopic
Muscle Tissue

## microtopic
Skeletal Muscle

## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Histology > Muscle Tissue > Skeletal Muscle

## article_ids
ART-103-HIS-SKELETAL-MUSCLE-STRUCTURE

## related_article_ids
ART-103-HIS-SKELETAL-MUSCLE-STRUCTURE

## related_concept_ids
CON-MSK-E36936D62038BF
CON-MSK-BBEDCAE76A03B9
CON-MSK-70448A9B07D24A

## resource_ids
src_2bf25a6864c9f6ce3283

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.5

## exam_weight_by_year
KAU_Y1=0.5

## clinical_relevance
0.35

## academic_relevance
0.95

## weight_confidence
0.3

## confidence
0.85

## exam_signal


## atomic_claim_ids
CLM-MSK-SARCOMERE-01
CLM-MSK-SARCOMERE-02

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Sarcomere] "The portion of a myofibril between two adjacent Z lines. It includes one dark band and 2 halves of light bands on both side. It is the basic contractile unit of striated muscle... I-bands are very short in contracted muscle and longer in relaxed muscle, the length of the A-bands remain constant."
[EM Picture of Myofibrils] "The thick myosin filaments are restricted to the A-band. The thin actin filaments attach to the Z line and pass through the I-band, then extend into the A-band till the beginning of H zone."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book does not give a resting sarcomere length in micrometres, describing the contraction-related length changes only qualitatively.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

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
microtopicId: The department book's own section, "Skeletal Muscle", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-HIS-T02.
nanotopicId: "Skeletal Muscle" is the finest heading the department book prints under Muscle Tissue; a nanotopic below it would be invented.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the image it needs is requested on ART-103-HIS-SKELETAL-MUSCLE-STRUCTURE.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "sarcomere", "Z line" and "H zone" — three narrow live concepts exist (H zone/M line relationship; contraction shortening I band and H zone; a cardiology sarcomere-disease record from an unrelated concept) none of which defines the sarcomere itself as the Z-to-Z unit this record does.
rejectedMergeCandidateIds: CON-MSK-BBEDCAE76A03B9 states only that the A band has a central H zone bisected by an M line, and CON-MSK-70448A9B07D24A states only the contraction-related length changes; this record is the sarcomere's own definition and filament map. Not merged, cross-linked, and both narrow records are updated elsewhere in this file to carry this module.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
CON-MSK-3FC22F6080FD06

## label
Red, white and intermediate muscle fibres
## canonical_key
skeletal-muscle.fibre-types.red-white-intermediate

## aliases
Red muscle fibre
White muscle fibre
Intermediate muscle fibre
Muscle fibre types

## arabic_label
أنواع ألياف العضلة الهيكلية

## arabic_aliases
الألياف الحمراء
الألياف البيضاء
الألياف المتوسطة

## definition
Skeletal muscle fibres are classified into three types: **red fibres**, **white fibres**, and **intermediate fibres**.

__Classifying fibre types in a muscle biopsy has clinical value__ for diagnosing muscle diseases, including those due to mitochondrial disorders.
## explicit_objective
Name the three skeletal muscle fibre types, and state why fibre typing on a muscle biopsy is clinically useful.

## pitfalls
Treating "red versus white" as a strict binary. The book names three categories, including an intermediate type, and biopsy typing is used precisely because a real muscle mixes all three rather than being purely one type.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-HIS-T02

## secondary_node_ids
DIS-HIS-T01
DIS-HIS-T04

## topic
Basic tissues

## subtopic
Muscle Tissue

## microtopic
Skeletal Muscle

## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Histology > Muscle Tissue > Skeletal Muscle

## article_ids
ART-103-HIS-SKELETAL-MUSCLE-FIBRE-TYPES-CLINICAL

## related_article_ids
ART-103-HIS-SKELETAL-MUSCLE-FIBRE-TYPES-CLINICAL

## related_concept_ids
[clear]

## resource_ids
src_2bf25a6864c9f6ce3283

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.35

## exam_weight_by_year
KAU_Y1=0.35

## clinical_relevance
0.5

## academic_relevance
0.8

## weight_confidence
0.3

## confidence
0.85

## exam_signal


## atomic_claim_ids
CLM-MSK-FIBRE-TYPES-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Types of Skeletal Muscle Fibers] "Red Fibers - White Fibers - Intermediate Fibers"
[Read only topic] "Classification of fiber types in muscle biopsies has clinical role for diagnosis of muscle diseases as those due to mitochondrial disorders."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The figure naming red, white and intermediate fibres carries no accompanying text in the extracted book on what histochemically or functionally distinguishes them (for example mitochondrial content, contraction speed or myoglobin content); the book states only the three-way classification and its clinical use.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

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
microtopicId: The department book's own section, "Skeletal Muscle", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-HIS-T02.
nanotopicId: "Skeletal Muscle" is the finest heading the department book prints under Muscle Tissue; a nanotopic below it would be invented.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the image it needs is requested on ART-103-HIS-SKELETAL-MUSCLE-FIBRE-TYPES-CLINICAL.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "muscle fibre types", "red fiber" and "white fiber" — no existing record of any kind.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
CON-MSK-9D01E2358A65E2

## label
Muscle hypertrophy, dystrophy and cramps
## canonical_key
skeletal-muscle.clinical.hypertrophy-dystrophy-cramps

## aliases
Skeletal muscle hypertrophy
Muscular dystrophy
Muscle cramps
Dystrophin

## arabic_label
الضخامة العضلية والحثل العضلي والتشنج العضلي

## arabic_aliases
الحثل العضلي
تشنج العضلات

## definition
**Skeletal muscle hypertrophy** takes place by __enlargement of existing muscle fibres__, as in exercise.

**Muscular dystrophy** is a progressive degeneration of skeletal muscle fibres in which a __lack of dystrophin in satellite cells__ means they fail to replace the degenerated fibres, resulting in decreased muscle function.

**Muscle cramps** are sudden, painful contractions caused by lowered blood flow to the muscle, lowered blood potassium, or vigorous exercise without proper warm-up (stretching); they usually involve the muscles of the lower leg.
## explicit_objective
Distinguish muscle hypertrophy from muscular dystrophy by their cellular basis, and list the three causes of muscle cramps the book gives.

## pitfalls
Treating hypertrophy and dystrophy as opposite points on the same scale. Hypertrophy is a normal, reversible enlargement of intact fibres; dystrophy is a disease of the regenerative machinery itself (satellite cells lacking dystrophin), which is why exercise helps one and cannot fix the other.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-HIS-T02

## secondary_node_ids
DIS-HIS-T01
DIS-HIS-T04

## topic
Basic tissues

## subtopic
Muscle Tissue

## microtopic
Skeletal Muscle

## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Histology > Muscle Tissue > Skeletal Muscle

## article_ids
ART-103-HIS-SKELETAL-MUSCLE-FIBRE-TYPES-CLINICAL

## related_article_ids
ART-103-HIS-SKELETAL-MUSCLE-FIBRE-TYPES-CLINICAL

## related_concept_ids
CON-MSK-740E240D62B9A5

## resource_ids
src_2bf25a6864c9f6ce3283

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.35

## exam_weight_by_year
KAU_Y1=0.35

## clinical_relevance
0.6

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.85

## exam_signal


## atomic_claim_ids
CLM-MSK-SKELETAL-CLINICAL-01
CLM-MSK-SKELETAL-CLINICAL-02

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Read only topics] "Skeletal muscle hypertrophy takes place by the enlargement of the existing muscle fibers, as in exercise. Muscular dystrophy is a progressive degeneration of skeletal muscle fibers, in which lack of dystrophin in satellite cells → fail to replace the degenerated fibers resulting in decrease in muscle function."
[Read only topics] "Muscle Cramps are sudden painful contractions of muscles due to lowered blood flow to them, lowered levels of potassium, or vigorous exercise without proper warming up (stretching). They usually involve the muscles of lower leg."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book does not name a specific muscular dystrophy (such as Duchenne) or state the inheritance pattern; it gives the mechanism (dystrophin loss impairing satellite cells) without a named disease entity.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

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
microtopicId: The department book's own section, "Skeletal Muscle", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-HIS-T02.
nanotopicId: "Skeletal Muscle" is the finest heading the department book prints under Muscle Tissue; a nanotopic below it would be invented.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the image it needs is requested on ART-103-HIS-SKELETAL-MUSCLE-FIBRE-TYPES-CLINICAL.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "muscular dystrophy", "dystrophin" and "muscle cramp" — no existing record of any kind.
relationships: CON-MSK-740E240D62B9A5 (satellite cells regenerate after injury) is the mechanism this record's dystrophy sentence depends on; cross-linked rather than merged since that record is the regeneration mechanism and this one is the clinical triad of hypertrophy, dystrophy and cramps.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
CON-DER-17748598BF7ECE

## label
Skin: the body's largest organ
## canonical_key
skin.general.definition-layers-hypodermis-exclusion

## aliases
Skin
Hypodermis
Subcutaneous tissue
Layers of the skin

## arabic_label
الجلد: تعريفه وطبقاته

## arabic_aliases
الجلد
الطبقة تحت الجلدية

## definition
**Skin** is a protective covering of the whole body, and the __largest and heaviest organ__, accounting for 15 to 20% of body weight. It is formed of two layers, the outer **epidermis** and the inner **dermis**.

The **hypodermis is not part of the skin**: it is a deep layer of adipose connective tissue beneath the skin, corresponding to the superficial fascia, that binds the skin loosely to underlying tissues and allows the skin to move freely.

Skin is classified as **thick** or **thin** according to the thickness of its epidermis.
## explicit_objective
State the two layers of skin, explain why the hypodermis is excluded from the skin proper, and name the basis on which skin is classified as thick or thin.

## pitfalls
Counting the hypodermis as a third skin layer. The book names it, describes it, and then states outright that it is not part of the skin — it is subcutaneous tissue.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
derm

## primary_node_id
DIS-HIS-T03

## secondary_node_ids
DIS-HIS-T02
DIS-HIS-T04

## topic
Organ histology

## subtopic
Integumentary System

## microtopic
Skin

## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Histology > Integumentary System > Skin

## article_ids
ART-103-HIS-SKIN-THICK-THIN-JUNCTION

## related_article_ids
ART-103-HIS-SKIN-THICK-THIN-JUNCTION

## related_concept_ids
CON-DER-56784AB396C13E

## resource_ids
src_2bf25a6864c9f6ce3283

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.35

## exam_weight_by_year
KAU_Y1=0.35

## clinical_relevance
0.3

## academic_relevance
0.85

## weight_confidence
0.3

## confidence
0.85

## exam_signal


## atomic_claim_ids
CLM-DER-SKIN-GENERAL-01
CLM-DER-SKIN-GENERAL-02

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Skin, Definition] "A protective covering of the whole body. The largest and heaviest organ, accounts for 15-20% of the body weight."
[Skin] "N.B.: Hypodermis: is not a part of the skin (Greek; hypo = under, dermis = skin)... Corresponds to the superficial fascia."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book gives 15 to 20% as skin's share of body weight without stating whether this figure includes the hypodermis it has just excluded from the skin proper.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

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
microtopicId: The department book's own section, "Skin", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-HIS-T03.
nanotopicId: "Skin" is the finest heading the department book prints under Integumentary System; a nanotopic below it would be invented.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the image it needs is requested on ART-103-HIS-SKIN-THICK-THIN-JUNCTION.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "hypodermis" and "skin definition" — no existing record states skin's two-layer definition or the hypodermis exclusion for this book.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
CON-DER-B60DAF01451E85

## label
The epidermis
## canonical_key
epidermis.general.definition-derivation-cell-types

## aliases
Epidermis
Keratinocytes
Non-keratinocytes

## arabic_label
البشرة

## arabic_aliases
طبقة البشرة

## definition
The **epidermis** is the outer epithelial layer of the skin, a **keratinised stratified squamous epithelium** derived from ectoderm.

It is thicker over the soles than the palms, is __avascular__ (receiving its nutrition by diffusion), and is rich in free nerve endings.

The epidermis is formed of **keratinocytes**, which represent 85% of its cells, and **non-keratinocytes**. Deeper keratinocytes continuously divide, differentiate and accumulate keratin filaments while progressing upwards, and superficial keratinocytes are continuously shed.
## explicit_objective
State the epidermis's tissue type, germ layer origin, vascularity and two cell categories, and describe the general direction of keratinocyte maturation.

## pitfalls
Assuming the epidermis has its own blood vessels because it is living tissue. It is avascular and depends entirely on diffusion from the dermis beneath it, which is why the papillary layer of the dermis is the more vascular layer.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
derm

## primary_node_id
DIS-HIS-T03

## secondary_node_ids
DIS-HIS-T02
DIS-HIS-T04

## topic
Organ histology

## subtopic
Integumentary System

## microtopic
The Epidermis

## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Histology > Integumentary System > The Epidermis

## article_ids
ART-103-HIS-EPIDERMIS-LAYERS

## related_article_ids
ART-103-HIS-EPIDERMIS-LAYERS

## related_concept_ids
CON-DER-56784AB396C13E

## resource_ids
src_2bf25a6864c9f6ce3283

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.4

## exam_weight_by_year
KAU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.9

## weight_confidence
0.3

## confidence
0.85

## exam_signal


## atomic_claim_ids
CLM-DER-EPIDERMIS-GENERAL-01
CLM-DER-EPIDERMIS-GENERAL-02

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[The Epidermis] "It is an outer epithelial layer (keratinized stratified squamous epithelium). Derived from ectoderm... Avascular layer receiving its nutrition by diffusion."
[The Epidermis] "(A) Keratinocytes: Represent 85% of the cells in epidermis."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book does not give the percentage split among the three named non-keratinocyte types (Langerhans cells, Merkel cells, melanocytes), only that keratinocytes are 85% of the total.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

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
microtopicId: The department book's own section, "The Epidermis", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-HIS-T03.
nanotopicId: "The Epidermis" is the finest heading the department book prints under Integumentary System; a nanotopic below it would be invented.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the image it needs is requested on ART-103-HIS-EPIDERMIS-LAYERS.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "epidermis" and "keratinocyte" — the only hits are a glossary word-parts entry and a pending 101 ISK alias/label from a different module's different book; neither states this book's own epidermis definition.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
CON-DER-743AA0CD69B8A4

## label
The stratum basale
## canonical_key
epidermis.stratum-basale.lm-em

## aliases
Stratum basale
Basal cell layer
Malpighian layer

## arabic_label
الطبقة القاعدية

## arabic_aliases
الطبقة الجرثومية

## definition
The **stratum basale (basal cell layer)** is the deepest single layer of low columnar cells, resting on a clear wavy basement membrane.

By **light microscopy** its cells have basophilic cytoplasm with a large basal oval nucleus and show intense mitotic figures, __responsible for renewal — the epidermis is regenerated every 2 to 4 weeks__. **Melanocytes** and **Merkel's cells** are found in this layer.

By **electron microscopy** its cells are attached to each other and to the prickle cell layer above by **desmosomes**, and to the basement membrane by **hemidesmosomes**; they are rich in free ribosomes and polysomes, and show keratin intermediate filaments about 10 nanometres in diameter, arranged singly or in bundles, ending in desmosomes.
## explicit_objective
Describe the light- and electron-microscopic features of the stratum basale, state which two non-keratinocyte cell types are found in it, and give the epidermal renewal time.

## pitfalls
Attaching the basal cell to the basement membrane with a desmosome. Desmosomes join keratinocyte to keratinocyte; hemidesmosomes are the specific junction that anchors the basal cell to the basement membrane beneath it.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
derm

## primary_node_id
DIS-HIS-T03

## secondary_node_ids
DIS-HIS-T02
DIS-HIS-T04

## topic
Organ histology

## subtopic
Integumentary System

## microtopic
The Epidermis

## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Histology > Integumentary System > The Epidermis

## article_ids
ART-103-HIS-EPIDERMIS-LAYERS

## related_article_ids
ART-103-HIS-EPIDERMIS-LAYERS

## related_concept_ids
[clear]

## resource_ids
src_2bf25a6864c9f6ce3283

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.45

## exam_weight_by_year
KAU_Y1=0.45

## clinical_relevance
0.35

## academic_relevance
0.9

## weight_confidence
0.3

## confidence
0.85

## exam_signal


## atomic_claim_ids
CLM-DER-STRATUM-BASALE-01
CLM-DER-STRATUM-BASALE-02

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Stratum Basale or (Basal Cell Layer)] "The deepest single layer of low columnar cells, resting on a clear wavy basement membrane... Intense mitotic figures (responsible for renewal); epidermis is regenerated every 2-4 weeks. Melanocytes and Merkel's cells are found in this layer."
[Stratum Basale, EM] "Cells are attached to each other and to prickle cell layer by desmosomes. Cells are attached to basement membrane by hemi-desmosomes."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
None recorded beyond the book's own statement that renewal takes 2 to 4 weeks; it does not state whether this figure varies by body site.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

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
microtopicId: The department book's own section, "The Epidermis", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-HIS-T03.
nanotopicId: "The Epidermis" is the finest heading the department book prints under Integumentary System; a nanotopic below it would be invented.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the image it needs is requested on ART-103-HIS-EPIDERMIS-LAYERS.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "stratum basale" — no existing record of any kind.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
CON-DER-1138A6D64D53B3

## label
The stratum spinosum and the Malpighian layer
## canonical_key
epidermis.stratum-spinosum.lm-em-and-malpighian-layer

## aliases
Stratum spinosum
Prickle cell layer
Malpighian layer
Langerhans cells site

## arabic_label
الطبقة الشوكية

## arabic_aliases
طبقة الخلايا الشائكة

## definition
The **stratum spinosum (prickle cell layer)** is 4 to 8 layers of polyhedral cells above the basal cell layer, with less basophilic cytoplasm than the stratum basale and central rounded nuclei.

Cell borders appear separated by small spaces crossed by fine spine-like processes, giving the prickly appearance; the processes mark where cells are __joined by desmosomes__, and the spaces are shrinkage artefacts. **Langerhans cells** are present in this layer, and the soles of the feet have a thicker stratum spinosum with more desmosomes.

**Mitotic figures are confined to the Malpighian layer**, which consists of both the stratum basale and the stratum spinosum together.

By **electron microscopy** the cytoplasm is filled with bundles of intermediate filaments (**tonofilaments**) ending in the dense plaques of numerous desmosomes along highly interdigitating cell boundaries.
## explicit_objective
Describe the stratum spinosum's light- and electron-microscopic features, name the non-keratinocyte cell it contains, and define the Malpighian layer.

## pitfalls
Restricting mitosis to the stratum basale alone. The book defines the Malpighian layer as basale plus spinosum together, and states mitotic figures are confined to that combined layer, not to the basale in isolation.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
derm

## primary_node_id
DIS-HIS-T03

## secondary_node_ids
DIS-HIS-T02
DIS-HIS-T04

## topic
Organ histology

## subtopic
Integumentary System

## microtopic
The Epidermis

## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Histology > Integumentary System > The Epidermis

## article_ids
ART-103-HIS-EPIDERMIS-LAYERS

## related_article_ids
ART-103-HIS-EPIDERMIS-LAYERS

## related_concept_ids
[clear]

## resource_ids
src_2bf25a6864c9f6ce3283

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.4

## exam_weight_by_year
KAU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.85

## weight_confidence
0.3

## confidence
0.85

## exam_signal


## atomic_claim_ids
CLM-DER-STRATUM-SPINOSUM-01
CLM-DER-STRATUM-SPINOSUM-02

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Stratum Spinosum (Prickle Cell Layer)] "4-8 layers of polyhedral cells present above the basal cell layer... Langerhans cells are present in this layer."
[N.B.] "Mitotic figures are confined to the Malpighian layer, which consists of both stratum basale and stratum spinosum."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book does not state why the soles carry a thicker stratum spinosum with more desmosomes beyond noting the fact.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

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
microtopicId: The department book's own section, "The Epidermis", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-HIS-T03.
nanotopicId: "The Epidermis" is the finest heading the department book prints under Integumentary System; a nanotopic below it would be invented.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the image it needs is requested on ART-103-HIS-EPIDERMIS-LAYERS.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "stratum spinosum", "prickle cell" and "Malpighian layer" — no existing record of any kind.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
CON-DER-867BD073CDD6D5

## label
The stratum granulosum converts cells into keratinised cells using keratohyalin granules and seals the epidermis using lamellar granules

## canonical_key
epidermis.stratum-granulosum.keratohyalin-and-lamellar-granules

## aliases
Stratum granulosum
Granular cell layer
Keratohyalin granules
Lamellar granules
Keratinization
Filaggrin

## arabic_label
الطبقة الحبيبية

## arabic_aliases
حبيبات الكيراتوهيالين
التقرن

## definition
The stratum granulosum (granular cell layer) is 3 to 5 layers of spindle-shaped cells above the prickle cell layer, with deeply basophilic, granular cytoplasm and flat pale nuclei. Its cytoplasm shows two types of granules by electron microscopy. Keratohyalin granules are irregular, large, membrane-free bodies containing proteins rich in phosphate groups, filaggrin and trichohyalin, which account for the granules' intense basophilia and which promote aggregation of keratin filaments into tonofibrils, the step by which granular cells convert into keratinised cells, a process called keratinisation. Membrane-coated lamellar granules are surrounded by membranes and contain lamellar discs of lipid bilayer; their contents form lipid sheets in the intercellular spaces (the cement substance) that act as a barrier with a sealing effect.

## explicit_objective
Distinguish the two granule types of the stratum granulosum by structure and function, and define keratinisation.

## pitfalls
Confusing the two granule types by function. Keratohyalin granules drive keratin filament aggregation inside the cell (keratinisation); lamellar granules discharge lipid between cells to form the epidermal permeability barrier — one builds the keratin scaffold, the other seals the gaps around it.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
derm

## primary_node_id
DIS-HIS-T03

## secondary_node_ids
DIS-HIS-T02
DIS-HIS-T04

## topic
Organ histology

## subtopic
Integumentary System

## microtopic
The Epidermis

## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Histology > Integumentary System > The Epidermis

## article_ids
ART-103-HIS-EPIDERMIS-LAYERS

## related_article_ids
ART-103-HIS-EPIDERMIS-LAYERS

## related_concept_ids
CON-DER-8BE6D5C68517EC

## resource_ids
src_2bf25a6864c9f6ce3283

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.45

## exam_weight_by_year
KAU_Y1=0.45

## clinical_relevance
0.4

## academic_relevance
0.9

## weight_confidence
0.3

## confidence
0.85

## exam_signal


## atomic_claim_ids
CLM-DER-STRATUM-GRANULOSUM-01
CLM-DER-STRATUM-GRANULOSUM-02

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Stratum Granulosum, EM] "a) Keratohyalin granules: ...contain proteins rich in phosphate groups... Filaggrin and trichohyalin that promote aggregation of keratin filaments into tonofibrils. By this step, the granular cells convert into keratinized cells in a process called keratinization."
[Stratum Granulosum, EM] "b) Membrane-coated lamellar granules: ...Their contents form lipid-containing sheets in the intercellular spaces (cement substance) that act as barrier and have a sealing effect."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book does not state the granule count or size range for either granule type, only their contents and function.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

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
microtopicId: The department book's own section, "The Epidermis", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-HIS-T03.
nanotopicId: "The Epidermis" is the finest heading the department book prints under Integumentary System; a nanotopic below it would be invented.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the image it needs is requested on ART-103-HIS-EPIDERMIS-LAYERS.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "keratohyalin", "lamellar granule" and "stratum granulosum" — one narrow live concept exists (keratin aggregation into tonofibrils, CON-DER-8BE6D5C68517EC) which states the keratohyalin half of this record without the lamellar-granule barrier function; not merged, cross-linked, and updated elsewhere in this file to carry this module.
rejectedMergeCandidateIds: CON-DER-8BE6D5C68517EC states only the keratohyalin/tonofibril step; this record adds the granule's named proteins and the second, lamellar-granule mechanism the live record does not cover.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
CON-DER-AB2A559A79ACB3

## label
The stratum lucidum is a clear layer of dying flattened cells and the stratum corneum the outermost layer of dead, anucleate, keratin-filled scales

## canonical_key
epidermis.terminal-layers.lucidum-and-corneum

## aliases
Stratum lucidum
Clear layer
Stratum corneum
Horny layer
Scales

## arabic_label
الطبقة الشفافة والطبقة القرنية

## arabic_aliases
الطبقة الصافية
الطبقة القرنية

## definition
The stratum lucidum (clear layer) is a thin, lightly stained, clear, homogeneous layer of much-flattened cells, more apparent in thick skin, whose nuclei are disappearing by karyolysis. By electron microscopy its cells are extremely flattened with thickened cell membranes, few remnants of desmosomes, organelles lost to lysosomal activity, and nuclei appearing as ghosts or gone entirely; the cells hold densely packed keratin filaments (tonofibrils) in an electron-dense matrix formed by keratohyalin granules. The stratum corneum (horny layer), the outermost layer, appears by light microscopy as a thick eosinophilic layer of heavily keratinised dead cells called scales; by electron microscopy its cells show thickened membranes held by remnants of desmosomes, are filled with mature keratin filaments in an amorphous matrix, and show neither nuclei nor organelles. The epidermis is translucent enough to show the dermis through it, especially in light-skinned individuals, which is why skin colour is diagnostically useful: it pales in anaemia and turns blue when oxygenated blood is insufficient, as in heart and lung disease.

## explicit_objective
Describe the light- and electron-microscopic features of the stratum lucidum and stratum corneum, and explain why skin colour changes are diagnostically useful.

## pitfalls
Expecting nuclei or organelles anywhere in the stratum corneum. By the time cells reach this outermost layer they have neither; a nucleus seen this superficially belongs to a lower layer or is an artefact, not a corneum cell.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
derm

## primary_node_id
DIS-HIS-T03

## secondary_node_ids
DIS-HIS-T02
DIS-HIS-T04

## topic
Organ histology

## subtopic
Integumentary System

## microtopic
The Epidermis

## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Histology > Integumentary System > The Epidermis

## article_ids
ART-103-HIS-EPIDERMIS-LAYERS

## related_article_ids
ART-103-HIS-EPIDERMIS-LAYERS

## related_concept_ids
[clear]

## resource_ids
src_2bf25a6864c9f6ce3283

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.4

## exam_weight_by_year
KAU_Y1=0.4

## clinical_relevance
0.4

## academic_relevance
0.85

## weight_confidence
0.3

## confidence
0.85

## exam_signal


## atomic_claim_ids
CLM-DER-TERMINAL-LAYERS-01
CLM-DER-TERMINAL-LAYERS-02

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Stratum Lucidum (Clear Layer)] "A thin, lightly stained, clear, homogeneous layer... Nuclei are on their way to disappear by karyolysis... More apparent in thick skin."
[Stratum Corneum (Horny Layer)] "Appears as a thick eosinophilic layer. Formed of heavily keratinized dead cells, called scales... They show neither nuclei nor organelles."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book does not state whether the stratum lucidum is present at all in thin skin, only that it is "more apparent" in thick skin, which the comparison table elsewhere calls "less apparent" rather than absent in thin skin.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

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
microtopicId: The department book's own section, "The Epidermis", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-HIS-T03.
nanotopicId: "The Epidermis" is the finest heading the department book prints under Integumentary System; a nanotopic below it would be invented.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the image it needs is requested on ART-103-HIS-EPIDERMIS-LAYERS.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "stratum lucidum" and "stratum corneum" — no existing record of any kind.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
CON-DER-0A867D7DC2BEFC

## label
Langerhans cells are bone-marrow-derived, stellate, antigen-presenting cells of the stratum spinosum with tennis-racquet Birbeck granules

## canonical_key
epidermis.non-keratinocytes.langerhans-cells

## aliases
Langerhans cell
Birbeck granule
Antigen presenting cell of the skin

## arabic_label
خلايا لانغرهانس

## arabic_aliases
خلية لانغرهانز
حبيبات بيربك

## definition
Langerhans cells originate from bone marrow precursors that migrate via the blood to the dermis and then the epidermis. They represent 3 to 8% of epidermal cells, are stellate (star-shaped), and are found mainly between cells of the stratum spinosum. In an H&E skin section a Langerhans cell appears with a dark-staining nucleus and pale, clear cytoplasm, and it can be identified with vital stains. By electron microscopy the cytoplasm is of low density and contains a prominent Golgi complex, numerous primary and secondary lysosomes, and special tennis-racquet-shaped granules called Birbeck granules, some of which may contain hydrolytic enzymes; the nucleus is dark and highly irregular; and keratin filaments, desmosomes, melanin granules and cell junctions to keratinocytes are all absent. Langerhans cells act as antigen-presenting cells, binding antigen that contacts the skin and presenting it to T lymphocytes, giving them a significant role in skin immunological reactions such as allergic dermatitis.

## explicit_objective
State the origin, site, light- and electron-microscopic features of the Langerhans cell, name its diagnostic organelle, and explain its immunological function.

## pitfalls
Looking for desmosomes or melanin granules to identify a Langerhans cell. The book states both are absent from it; the diagnostic electron-microscopic feature is the Birbeck granule, and on light microscopy the cell is recognised instead by its pale, clear cytoplasm against a dark nucleus.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
derm

## primary_node_id
DIS-HIS-T03

## secondary_node_ids
DIS-HIS-T02
DIS-HIS-T04

## topic
Organ histology

## subtopic
Integumentary System

## microtopic
The Epidermis

## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Histology > Integumentary System > The Epidermis

## article_ids
ART-103-HIS-EPIDERMIS-NON-KERATINOCYTES

## related_article_ids
ART-103-HIS-EPIDERMIS-NON-KERATINOCYTES

## related_concept_ids
[clear]

## resource_ids
src_2bf25a6864c9f6ce3283

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.4

## exam_weight_by_year
KAU_Y1=0.4

## clinical_relevance
0.5

## academic_relevance
0.85

## weight_confidence
0.3

## confidence
0.85

## exam_signal


## atomic_claim_ids
CLM-DER-LANGERHANS-01
CLM-DER-LANGERHANS-02

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Langerhans Cells] "Origin: Bone marrow precursors migrate via blood to dermis then epidermis... Represent 3-8% of epidermal cells. They are stellate-shaped cells found mainly between cells of the stratum spinosum."
[Langerhans Cells, EM] "Special tennis-racquet-shaped granules (Birbeck's granules)... Absence of keratin filaments and desmosomes. Absence of melanin granules. Absence of cell junctions between them and keratinocytes."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book does not state what proportion of Birbeck granules actually contain hydrolytic enzymes, only that "some may".

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

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
microtopicId: The department book's own section, "The Epidermis", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-HIS-T03.
nanotopicId: "The Epidermis" is the finest heading the department book prints under Integumentary System; a nanotopic below it would be invented.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the image it needs is requested on ART-103-HIS-EPIDERMIS-NON-KERATINOCYTES.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "Langerhans cell" and "Birbeck granule" — no existing record of any kind.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
CON-DER-71C980D8864B73

## label
Melanocytes are neural-crest-derived, basal-layer pigment cells whose tyrosinase-driven melanin synthesis is invisible on routine H&E stain

## canonical_key
epidermis.non-keratinocytes.melanocytes

## aliases
Melanocyte
Melanosome
Tyrosinase
Melanin synthesis

## arabic_label
الخلايا الصباغية

## arabic_aliases
ميلانوسايت
الخلايا المنتجة للميلانين

## definition
Melanocyte precursors arise from the neural crest (ectoderm) and migrate to the skin early in development, differentiating into melanocytes. Their cell bodies lie between and just below the cells of the stratum basale, with rounded, pale-stained nuclei and long irregular cytoplasmic processes extending between keratinocytes, the tips of which terminate in invaginations of cells in the stratum basale and stratum spinosum; H&E-stained skin sections do not demonstrate melanocytes. By electron microscopy the cell shows the characters of an active protein-synthesising cell — abundant rough endoplasmic reticulum, a prominent Golgi apparatus and mitochondria — with granules called melanosomes, a nucleus with euchromatin and a prominent nucleolus, no desmosomes to keratinocytes, and hemidesmosomes binding it to the basal lamina. Melanin pigment is formed by epidermal melanocytes, which synthesise the enzyme tyrosinase essential for melanin synthesis, and ultraviolet light speeds melanin synthesis.

## explicit_objective
State the origin, site, light- and electron-microscopic features of the melanocyte, name the enzyme required for melanin synthesis, and explain why melanocytes are invisible on a routine H&E section.

## pitfalls
Trying to identify melanocytes on an ordinary H&E slide. The book states outright that H&E sections do not demonstrate them; a special stain or electron microscopy is required, unlike keratinocytes, which H&E shows directly.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
derm

## primary_node_id
DIS-HIS-T03

## secondary_node_ids
DIS-HIS-T02
DIS-HIS-T04

## topic
Organ histology

## subtopic
Integumentary System

## microtopic
The Epidermis

## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Histology > Integumentary System > The Epidermis

## article_ids
ART-103-HIS-EPIDERMIS-NON-KERATINOCYTES

## related_article_ids
ART-103-HIS-EPIDERMIS-NON-KERATINOCYTES

## related_concept_ids
[clear]

## resource_ids
src_2bf25a6864c9f6ce3283

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.45

## exam_weight_by_year
KAU_Y1=0.45

## clinical_relevance
0.5

## academic_relevance
0.9

## weight_confidence
0.3

## confidence
0.85

## exam_signal


## atomic_claim_ids
CLM-DER-MELANOCYTE-01
CLM-DER-MELANOCYTE-02

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Melanocytes] "Origin: Precursors arise from neural crest (ectoderm) and migrate to the skin early in development and differentiate to melanocytes... The H&E stained skin sections do not demonstrate melanocytes."
[Function of melanocytes] "Melanin pigment is formed by the epidermal melanocytes (as they can synthesize tyrosinase enzyme which is essential for melanin synthesis). Ultraviolet light speeds melanin synthesis."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book does not state the melanocyte-to-keratinocyte ratio, only their site relative to the stratum basale and stratum spinosum.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

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
microtopicId: The department book's own section, "The Epidermis", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-HIS-T03.
nanotopicId: "The Epidermis" is the finest heading the department book prints under Integumentary System; a nanotopic below it would be invented.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the image it needs is requested on ART-103-HIS-EPIDERMIS-NON-KERATINOCYTES.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "melanocyte" and "tyrosinase" — the only hit is an unrelated endocrine concept about ACTH-driven skin pigmentation in Cushing syndrome, not a candidate for this cell's own structure.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
CON-DER-B9BE859E905F44

## label
Albinism is a tyrosinase defect, vitiligo an autoimmune depigmentation, and suntanning a reversible UV-driven rise in melanin synthesis

## canonical_key
melanocyte.disorders.albinism-vitiligo-suntanning

## aliases
Albinism
Vitiligo
Sun tanning
Pigmentary skin disorders

## arabic_label
اضطرابات التصبغ الجلدي

## arabic_aliases
البهاق
المهق
اسمرار الجلد

## definition
Albinism is the absence of melanin production resulting from a genetic defect in tyrosinase synthesis. Vitiligo presents as white, depigmented patches of skin; its exact cause is unknown, but an autoimmune condition may be involved. Sun tanning is the acquired darkening of skin from exposure to ultraviolet radiation, usually sunlight; excessive exposure may lead to sunburn, accelerated skin ageing, and increased skin cancer risk.

## explicit_objective
Distinguish albinism, vitiligo and sun tanning by cause, and state the risks of excessive ultraviolet exposure.

## pitfalls
Treating albinism and vitiligo as the same disorder because both cause pale skin. Albinism is a genetic enzyme defect present from birth and affects the whole body's melanin production; vitiligo is patchy, acquired, and likely autoimmune, destroying melanocytes that were previously making pigment normally.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
derm

## primary_node_id
DIS-HIS-T03

## secondary_node_ids
DIS-HIS-T02
DIS-HIS-T04

## topic
Organ histology

## subtopic
Integumentary System

## microtopic
The Epidermis

## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Histology > Integumentary System > The Epidermis

## article_ids
ART-103-HIS-EPIDERMIS-NON-KERATINOCYTES

## related_article_ids
ART-103-HIS-EPIDERMIS-NON-KERATINOCYTES

## related_concept_ids
[clear]

## resource_ids
src_2bf25a6864c9f6ce3283

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.35

## exam_weight_by_year
KAU_Y1=0.35

## clinical_relevance
0.55

## academic_relevance
0.8

## weight_confidence
0.3

## confidence
0.85

## exam_signal


## atomic_claim_ids
CLM-DER-PIGMENT-DISORDERS-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Read only topic] "Albinism: is absence of melanin production resulting from a genetic defect in tyrosinase synthesis. Vitiligo: presented as white depigmented patches of skin. The exact cause is unknown; however, an autoimmune condition may be involved. Sun tanning: Acquired darkening of skin due to exposure to ultraviolet radiation... Excessive exposure may lead to sunburn, accelerated aging of the skin & increased risk of skin cancer."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book states vitiligo's cause as "unknown", with autoimmunity only a possibility, not a confirmed mechanism.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

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
microtopicId: The department book's own section, "The Epidermis", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-HIS-T03.
nanotopicId: "The Epidermis" is the finest heading the department book prints under Integumentary System; a nanotopic below it would be invented.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the image it needs is requested on ART-103-HIS-EPIDERMIS-NON-KERATINOCYTES.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "albinism", "vitiligo" and "sun tanning" — no existing record of any kind.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
CON-DER-0CE4E701A394EC

## label
The zigzag dermal-epidermal junction of interdigitating papillae and ridges forms fingerprints and is fixed by three named structures

## canonical_key
skin.dermal-epidermal-junction.structure-fixation-fingerprints

## aliases
Dermal-epidermal junction
Epidermal ridges
Fingerprints
Factors fixing epidermis to dermis

## arabic_label
التماس بين البشرة والأدمة

## arabic_aliases
بصمات الأصابع

## definition
The dermal-epidermal junction is zigzag-shaped: dermal papillae, projections of the dermis, interdigitate with matching concavities in the epidermis called epidermal ridges. This interdigitation forms fingerprints, which are of medico-legal importance, and serves two purposes: it provides attachment of epidermis to dermis, and it increases the surface area available for nutrition of the avascular epidermis. Three factors fix the epidermis to the dermis: the basement membrane of the epidermis; hemidesmosomes, between the basal epidermal cells and that basement membrane; and the dermal papillae interdigitating with the epidermal ridges.

## explicit_objective
Describe the dermal-epidermal junction and list the three factors that fix the epidermis to the dermis.

## pitfalls
Naming only one fixation factor, usually hemidesmosomes, and stopping there. The book gives three together — the basement membrane itself, the hemidesmosomes anchoring cells to it, and the mechanical interlocking of the papillae and ridges — and a question asking "how is epidermis fixed to dermis" wants all three.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
derm

## primary_node_id
DIS-HIS-T03

## secondary_node_ids
DIS-HIS-T02
DIS-HIS-T04

## topic
Organ histology

## subtopic
Integumentary System

## microtopic
The Dermis

## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Histology > Integumentary System > The Dermis

## article_ids
ART-103-HIS-SKIN-THICK-THIN-JUNCTION

## related_article_ids
ART-103-HIS-SKIN-THICK-THIN-JUNCTION

## related_concept_ids
CON-DER-56784AB396C13E

## resource_ids
src_2bf25a6864c9f6ce3283

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.4

## exam_weight_by_year
KAU_Y1=0.4

## clinical_relevance
0.4

## academic_relevance
0.85

## weight_confidence
0.3

## confidence
0.85

## exam_signal


## atomic_claim_ids
CLM-DER-DEJ-01
CLM-DER-DEJ-02

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Dermal-epidermal junction] "Zigzag-like interdigitations between dermal papillae and epidermal ridges forming the finger prints which are of medico legal importance."
[Factors fixing epidermis to dermis] "1. The basement membrane of epidermis. 2. Hemidesmosomes: between basal epidermal cells & basement membrane. 3. Dermal papillae interdigitating with epidermal ridges."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book does not state whether fingerprint pattern is genetically fixed or state at what developmental stage the ridge pattern is laid down.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

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
microtopicId: The department book's own section, "The Dermis", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-HIS-T03.
nanotopicId: "The Dermis" is the finest heading the department book prints under Integumentary System; a nanotopic below it would be invented.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the image it needs is requested on ART-103-HIS-SKIN-THICK-THIN-JUNCTION.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "dermal-epidermal junction", "epidermal ridge" and "fingerprint" — no existing record of any kind.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
CON-DER-ACDEAF318B290B

## label
Thin (hairy) skin covers most of the body and differs from thick skin in every epidermal layer, its appendages, and its dermal papillae

## canonical_key
skin.thin.definition-sites-and-comparison-with-thick-skin

## aliases
Thin skin
Hairy skin
Thick skin comparison
Non-hairy skin

## arabic_label
الجلد الرقيق (المشعر)

## arabic_aliases
الجلد الرفيع

## definition
Thin (hairy) skin covers the whole body except the palms, soles, and the tips and sides of the fingers and toes; the eyelid carries the thinnest skin in the body. It shares the basic structure of thick skin but differs from it: its epidermis, Malpighian layer, granular layer (a single layer rather than 3 to 5) and horny layer are all thinner, its clear layer is less apparent rather than clearly present, and its dermal papillae are fewer, small and irregular rather than more numerous, large and regular. Unlike thick (non-hairy) skin, which has a thick epidermis of 400 to 1400 micrometres confined to the palms and soles and lacks hair follicles, sebaceous glands and arrector pili muscles altogether, thin skin carries hair follicles, sebaceous glands and arrector pili muscles, and carries fewer sweat glands than thick skin.

## explicit_objective
State where thin skin is found, and compare it with thick skin across epidermal thickness, each named epidermal layer, dermal papillae, and the presence of hair-associated appendages.

## pitfalls
Assuming thin skin has more sweat glands because it has more appendages overall (hair follicles, sebaceous glands, arrector pili). The book states the opposite for sweat glands specifically: thick skin carries more of them, not thin skin.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
derm

## primary_node_id
DIS-HIS-T03

## secondary_node_ids
DIS-HIS-T02
DIS-HIS-T04

## topic
Organ histology

## subtopic
Integumentary System

## microtopic
Thin (Hairy) Skin

## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Histology > Integumentary System > Thin (Hairy) Skin
103 BMS > Histology > Integumentary System > Thick (Non-Hairy) Skin

## article_ids
ART-103-HIS-SKIN-THICK-THIN-JUNCTION

## related_article_ids
ART-103-HIS-SKIN-THICK-THIN-JUNCTION

## related_concept_ids
[clear]

## resource_ids
src_2bf25a6864c9f6ce3283

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.45

## exam_weight_by_year
KAU_Y1=0.45

## clinical_relevance
0.35

## academic_relevance
0.9

## weight_confidence
0.3

## confidence
0.85

## exam_signal


## atomic_claim_ids
CLM-DER-THIN-SKIN-01
CLM-DER-THIN-SKIN-02

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Thin (Hairy) Skin] "It covers all the body except palms, soles, tips and sides of fingers and toes. Eyelid has got the thinnest skin in the body."
[Differences between the thick and thin skin] "Malpighian layer: Thicker / Thinner. Granular layer: Thicker (3-5) / Thinner (single)... Dermal papillae: More, large, regular / Fewer, small, irregular... Hair follicles, Sebaceous glands, Arrector pili muscles: Absent / Present. Sweat glands: More numerous / Less numerous."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book gives a thickness range (400 to 1400 micrometres) for thick skin's epidermis but no comparable numeric range for thin skin's epidermis, describing it only as "thinner".

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

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
microtopicId: The department book's own section, "Thin (Hairy) Skin", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-HIS-T03.
nanotopicId: "Thin (Hairy) Skin" is the finest heading the department book prints under Integumentary System; a nanotopic below it would be invented.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the image it needs is requested on ART-103-HIS-SKIN-THICK-THIN-JUNCTION.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "thick skin" (no hit for this book) and "thin skin" (one narrow live concept about apocrine glands' site, not a thick-versus-thin comparison) — no candidate states this book's own comparison table.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
CON-DER-7B13D571066F63

## label
Hair is a keratinised thread grown from an epidermal-downgrowth hair follicle, whose epidermal stem cells also drive wound healing

## canonical_key
hair-follicle.structure-development-and-epidermal-stem-cells

## aliases
Hair follicle
Hair
Epidermal stem cells
Skin appendages

## arabic_label
بصيلة الشعر والخلايا الجذعية البشروية

## arabic_aliases
بصيلة الشعرة
الشعرة

## definition
During development, cells of the epidermis grow down into the connective-tissue dermis to form the skin appendages: hair follicles and hairs, sebaceous glands, and sweat glands. Hair is a keratinised epithelial thread embedded in a hair follicle, an epidermal sheath from which the hair develops. Epidermal stem cells are undifferentiated epithelial cells that reside in the hair follicle; they do not contribute to the population of basal stem cells of the epidermis. Under normal conditions they are responsible for the growth of hair follicles and sebaceous glands, and when the epidermis is injured or lost, they migrate toward the wound surface and participate in the initial healing of the wound.

## explicit_objective
Describe hair as a keratinised follicular structure, state the developmental origin of skin appendages, and explain the dual role of hair-follicle epidermal stem cells.

## pitfalls
Assuming hair-follicle epidermal stem cells simply top up the epidermis's own basal stem cell pool. The book states the opposite: they are a separate population that does not contribute to basal epidermal stem cells under normal conditions, and only migrates out to help the epidermis specifically after a wound.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
derm

## primary_node_id
DIS-HIS-T03

## secondary_node_ids
DIS-HIS-T02
DIS-HIS-T04

## topic
Organ histology

## subtopic
Integumentary System

## microtopic
Hair

## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Histology > Integumentary System > Hair

## article_ids
ART-103-HIS-HAIR-FOLLICLE

## related_article_ids
ART-103-HIS-HAIR-FOLLICLE

## related_concept_ids
CON-DER-A4BD56E5027310

## resource_ids
src_2bf25a6864c9f6ce3283

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.4

## exam_weight_by_year
KAU_Y1=0.4

## clinical_relevance
0.4

## academic_relevance
0.85

## weight_confidence
0.3

## confidence
0.85

## exam_signal


## atomic_claim_ids
CLM-DER-HAIR-FOLLICLE-01
CLM-DER-HAIR-FOLLICLE-02

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Skin Appendages, Hair] "Hair is a keratinized epithelial thread that is embedded in hair follicle. The hair follicle is an epidermal sheath, from which it develops."
[Epidermal stem cells] "Under normal conditions, epidermal stem cells are responsible for the growth of hair follicles as well as sebaceous glands. When the epidermis is injured or lost, the epidermal stem cells migrate toward the wound surface and participate in the initial healing of the wound."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book does not describe the hair follicle's own internal layered structure (root sheaths, matrix, papilla) beyond calling it "an epidermal sheath"; only the stem-cell function is elaborated.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

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
microtopicId: The department book's own section, "Hair", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-HIS-T03.
nanotopicId: "Hair" is the finest heading the department book prints under Integumentary System; a nanotopic below it would be invented.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the image it needs is requested on ART-103-HIS-HAIR-FOLLICLE.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "hair follicle" and "epidermal stem cell" — the only hit, CON-DER-A4BD56E5027310, describes the arrector pili muscle attaching to the follicle, not the follicle's own structure or its stem cells; not merged, cross-linked instead.
rejectedMergeCandidateIds: CON-DER-A4BD56E5027310 is the arrector pili muscle, which attaches to the follicle but is not the follicle itself; cross-linked as the structure this concept's stem cells sit beside.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
CON-DER-406696F770DA63

## label
Sebaceous glands are holocrine acinar glands, usually attached to hair, whose cells die to release sebum

## canonical_key
sebaceous-glands.structure-holocrine-secretion-function

## aliases
Sebaceous gland
Sebum
Holocrine secretion
Acne

## arabic_label
الغدد الدهنية

## arabic_aliases
الزهم
الإفراز الشامل

## definition
Sebaceous glands develop as outgrowths of the external sheath of the hair follicle. They are simple alveolar (acinar) or branched alveolar exocrine glands, sited in the dermis of thin skin, usually associated with hairs and rarely without them, as in the eyelids. Each alveolus is lined by basal flattened germinal cells, whose mitosis produces large polyhedral cells, and large polyhedral vacuolated cells, which gradually fill with numerous lipid droplets. The excretory duct is short and wide, opening into the upper third of the hair follicle, and is lined by stratified squamous epithelium continuous with the follicle. The oily secretion, sebum, is released by holocrine secretion: the cell undergoes programmed cell death (apoptosis), and both the secretory product and the cell debris are discharged through the short duct. Sebaceous glands keep thin skin and its hairs soft, preventing cracking, and their secretion is antifungal and antibacterial. Acne is inflammation of a sebaceous gland from obstruction of its duct by sebum, known as a whitehead; if the plugged sebum mixes with melanin it is called a blackhead.

## explicit_objective
Describe the structure and holocrine secretory mechanism of the sebaceous gland, state its functions, and explain the difference between a whitehead and a blackhead.

## pitfalls
Calling sebaceous secretion merocrine or apocrine by analogy with sweat glands. Sebaceous glands are holocrine: the whole cell dies and becomes part of the secretion, which is why their secretory cells must be continuously replaced by mitosis of the basal germinal cells.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
derm

## primary_node_id
DIS-HIS-T03

## secondary_node_ids
DIS-HIS-T02
DIS-HIS-T04

## topic
Organ histology

## subtopic
Integumentary System

## microtopic
Sebaceous Glands

## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Histology > Integumentary System > Sebaceous Glands

## article_ids
ART-103-HIS-SEBACEOUS-GLANDS

## related_article_ids
ART-103-HIS-SEBACEOUS-GLANDS

## related_concept_ids
[clear]

## resource_ids
src_2bf25a6864c9f6ce3283

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.4

## exam_weight_by_year
KAU_Y1=0.4

## clinical_relevance
0.55

## academic_relevance
0.85

## weight_confidence
0.3

## confidence
0.85

## exam_signal


## atomic_claim_ids
CLM-DER-SEBACEOUS-01
CLM-DER-SEBACEOUS-02

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Sebaceous Glands] "Development: develop as outgrowths of the external sheath of the hair follicle. Type: Simple alveolar (acinar) or branched alveolar exocrine gland."
[Mode of secretion] "The secretion is occurred by holocrine mode of secretion as follow: Cell undergoes programmed cell death (apoptosis) and both the secretory product and cell debris are discharged from the gland through their short ducts."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book states sebaceous glands sit "in the dermis of thin skin" without stating whether any exist in thick skin at all, beyond the general rule (elsewhere in the book) that thick skin lacks hair follicles and sebaceous glands together.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

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
microtopicId: The department book's own section, "Sebaceous Glands", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-HIS-T03.
nanotopicId: "Sebaceous Glands" is the finest heading the department book prints under Integumentary System; a nanotopic below it would be invented.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the image it needs is requested on ART-103-HIS-SEBACEOUS-GLANDS.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "sebaceous gland" and "holocrine" — the only hits are a Montgomery-gland concept in an unrelated obstetric context and a pending MCQ title from a different module, neither describing this book's own structure and secretion mechanism.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
CON-DER-9D049A8C76F844

## label
Eccrine sweat glands cool the whole body by merocrine secretion everywhere except thick skin sites; apocrine glands are puberty-onset scent glands of the axilla, pubis and perineum

## canonical_key
sweat-glands.eccrine-vs-apocrine-comparison

## aliases
Eccrine sweat gland
Apocrine sweat gland
Sweat gland comparison
Merocrine secretion

## arabic_label
الغدد العرقية الناتحة والراشحة

## arabic_aliases
الغدد العرقية
الغدد المفرزة الجزئية

## definition
Sweat glands are simple tubular coiled glands, sited deep in the dermis all over the body except the glans penis and nail beds. Eccrine glands lie all over the body except the glans penis and nail beds, are more numerous, and predominate in thick skin; their secretory part is small with a narrow lumen and three cell types — large clear cells (more numerous, broad base, narrow apex, pale glycogen-rich cytoplasm, joined by intercellular canaliculi), small dark cells (less numerous, narrow base, wide apex, dark cytoplasm with glycoprotein granules; watery secretion from the clear cells passes through the canaliculi to mix with the dark cells' protein product), and myoepithelial cells; their excretory duct spirals through dermis and epidermis, opens directly onto the epidermis, and is lined by two cuboidal cell layers; their secretion is a clear watery fluid of water, sodium chloride, urea and ammonia with low protein content, and its main function is body temperature regulation. Apocrine glands occur in the thin skin of the axillary, pubic and perineal regions, are less numerous, are absent from thick skin, and only start to function at puberty; their secretory part is large with a wide lumen and only two cell types, simple cuboidal cells (eosinophilic cytoplasm, apical granules discharged by exocytosis) and myoepithelial cells; their excretory duct spirals through the dermis and opens into a hair follicle rather than directly onto the skin, lined by two cuboidal cell layers; their secretion is viscous and initially odourless, becoming offensive through bacterial action. Both types share a merocrine mode of secretion, by exocytosis, for their main secretory output, despite the older name "apocrine" implying otherwise.

## explicit_objective
Compare eccrine and apocrine sweat glands on site, cell number and type, excretory duct destination, secretion composition, and onset of function.

## pitfalls
Assuming apocrine glands secrete by a true apocrine (cytoplasm-shedding) mechanism because of the name. The book's own heading over both glands' "Mode of secretion" rows reads merocrine (by exocytosis) for both, so the name is historical rather than mechanistic.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
derm

## primary_node_id
DIS-HIS-T03

## secondary_node_ids
DIS-HIS-T02
DIS-HIS-T04

## topic
Organ histology

## subtopic
Integumentary System

## microtopic
Sweat Glands

## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Histology > Integumentary System > Sweat Glands

## article_ids
ART-103-HIS-SWEAT-GLANDS

## related_article_ids
ART-103-HIS-SWEAT-GLANDS

## related_concept_ids
CON-DER-F4F6AA9BEAB1B6
CON-DER-6C82312DEBED0A
CON-DER-8F25CCE084AF16
CON-DER-D09D3742DF2B67

## resource_ids
src_2bf25a6864c9f6ce3283

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.5

## exam_weight_by_year
KAU_Y1=0.5

## clinical_relevance
0.45

## academic_relevance
0.9

## weight_confidence
0.3

## confidence
0.85

## exam_signal


## atomic_claim_ids
CLM-DER-SWEAT-GLANDS-01
CLM-DER-SWEAT-GLANDS-02

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Eccrine sweat glands vs Apocrine sweat glands, Sites] "All over the body except glans penis & nail beds... More numerous... More in thick skin" / "Thin skin of axillary, pubic & perineal regions... Less numerous... Not present in thick skin."
[Eccrine vs Apocrine] "Mode of secretion: Merocrine (by exocytosis)" [heading over both] "...Apocrine... Start function at puberty. They secrete viscous odorless secretion that becomes offensive by bacterial action."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book gives the eccrine duct as opening "into epidermis" and the apocrine duct as opening "into a hair follicle", but does not state whether an apocrine gland ever also has an independent surface opening.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

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
microtopicId: The department book's own section, "Sweat Glands", is written in `microtopic` as a title and carried precisely by `module_subject`; it resolves to no `MIC_` node because the canonical tree stops at DIS-HIS-T03.
nanotopicId: "Sweat Glands" is the finest heading the department book prints under Integumentary System; a nanotopic below it would be invented.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the image it needs is requested on ART-103-HIS-SWEAT-GLANDS.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "eccrine", "apocrine" and "sweat gland" — four narrow live concepts exist (apocrine duct destination; apocrine sites; apocrine odour; palmar sweat gland abundance) none of which states the full eccrine-versus-apocrine comparison this record synthesises; not merged, cross-linked, and all four are updated elsewhere in this file to carry this module.
rejectedMergeCandidateIds: CON-DER-F4F6AA9BEAB1B6, CON-DER-6C82312DEBED0A and CON-DER-8F25CCE084AF16 each state one apocrine fact (duct, site, odour) and CON-DER-D09D3742DF2B67 states only that palmar skin has many sweat glands; this record is the whole eccrine-apocrine comparison table the book teaches as one unit.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
CON-MSK-5DF0AED914A81E

## label
A Haversian canal is surrounded by 5–20 concentric circular bony lamellae with osteocytes in lacunae

## modules
103 BMS

## module_subject
103 BMS > Histology > Bone > Compact Bone

## related_concept_ids
CON-MSK-702060D54048F5

## field_notes
modules: This record states a fact the 103 BMS Histology department book also teaches, at the section named in `module_subject`; added because the live record carried an empty `moduleIds`. No other field is changed.
relatedConceptIds: Cross-linked to CON-MSK-702060D54048F5 (Haversian canal contents), the paired narrow fact from the same live source; the fuller compact-bone/Haversian-system record this module mints separately is CON-MSK-B55521FFEC2527 (see this batch's new concepts), cross-linked from that record's own related_concept_ids rather than merged.

---

# Item

## id
CON-MSK-702060D54048F5

## label
A Haversian canal contains blood vessels and nerves in loose connective tissue

## modules
103 BMS

## module_subject
103 BMS > Histology > Bone > Compact Bone

## related_concept_ids
CON-MSK-5DF0AED914A81E

## field_notes
modules: This record states a fact the 103 BMS Histology department book also teaches, at the section named in `module_subject`; added because the live record carried an empty `moduleIds`. No other field is changed.
relatedConceptIds: Cross-linked to CON-MSK-5DF0AED914A81E (Haversian lamellae), the paired narrow fact from the same live source.

---

# Item

## id
CON-MSK-0E9A4639848229

## label
Bone matrix contains ground substance and fibers

## modules
103 BMS

## module_subject
103 BMS > Histology > Bone > Bone Matrix: Ground substance & Fibers

## related_concept_ids
CON-MSK-52DC4C4BF9126D

## field_notes
modules: This record states a fact the 103 BMS Histology department book also teaches, at the section named in `module_subject`; added because the live record carried an empty `moduleIds`. No other field is changed.
relatedConceptIds: Cross-linked to CON-MSK-52DC4C4BF9126D (matrix lamellar arrangement); the organic/inorganic percentage breakdown this module adds is a separate new mint (see this batch), cross-linked from there rather than merged here.

---

# Item

## id
CON-MSK-52DC4C4BF9126D

## label
Bone matrix is arranged as lamellae of calcified collagen bundles in calcified ground substance

## modules
103 BMS

## module_subject
103 BMS > Histology > Bone > Bone Matrix: Ground substance & Fibers

## related_concept_ids
CON-MSK-0E9A4639848229

## field_notes
modules: This record states a fact the 103 BMS Histology department book also teaches, at the section named in `module_subject`; added because the live record carried an empty `moduleIds`. No other field is changed.
relatedConceptIds: Cross-linked to CON-MSK-0E9A4639848229 (matrix components).

---

# Item

## id
CON-MSK-BD54A250111D42

## label
A T tubule between two terminal SR cisternae forms a triad

## modules
103 BMS

## module_subject
103 BMS > Histology > Muscle Tissue > Skeletal Muscle

## related_article_ids
ART-103-HIS-SKELETAL-MUSCLE-STRUCTURE

## related_concept_ids
CON-MSK-B080975D6171CF

## field_notes
modules: This record states a fact the 103 BMS Histology department book also teaches, at the section named in `module_subject`; added because the live record carried an empty `moduleIds`. No other field is changed.
This narrow live fact already matches the department book's own definition of the triad tubular system (T-tubules at A-I band junctions, each between a pair of terminal cisternae) closely enough that no separate mint was made for it; module placement added instead.
relatedArticleIds: ART-103-HIS-SKELETAL-MUSCLE-STRUCTURE is extended in this batch to state the triad tubular system by name and its role in excitation-contraction coupling, which this live fact anchors but no article named until now — flagged as a genuine gap in the lane report (department written-assessment Q3).
relatedConceptIds: Cross-linked to CON-MSK-B080975D6171CF, the skeletal/cardiac/smooth comparison table, whose "Tubular System" row states this same fact as the skeletal-muscle cell.

---

# Item

## id
CON-MSK-BBEDCAE76A03B9

## label
A band has a central pale H zone bisected by M line

## modules
103 BMS

## module_subject
103 BMS > Histology > Muscle Tissue > Skeletal Muscle

## article_ids
ART-103-HIS-SKELETAL-MUSCLE-STRUCTURE

## related_article_ids
ART-103-HIS-SKELETAL-MUSCLE-STRUCTURE

## related_concept_ids
CON-MSK-E36936D62038BF

## field_notes
modules: This record states a fact the 103 BMS Histology department book also teaches, at the section named in `module_subject`; added because the live record carried an empty `moduleIds`. No other field is changed.
relatedConceptIds: Cross-linked to the A/I band update row (CON-MSK-E36936D62038BF) in this same file, the band this H zone and M line sit inside.
articleIds/relatedArticleIds: `check-two-sided-coverage.py "103 BMS" --list` flagged this id as tested (main_concept of an MCQ in question/103-BMS-MCQ-nerve-muscle.md, a different lane's file) with no article link at all. ART-103-HIS-SKELETAL-MUSCLE-STRUCTURE's own Definition section already states this exact fact ("The A band appears dark... the H zone... the M line, which bisects the H zone"), which the article's own related_concepts was updated to cite back; article_ids added here so both sides of the coverage check resolve.

---

# Item

## id
CON-MSK-70448A9B07D24A

## label
Contraction shortens I band, abolishes H zone, preserves A band, and shortens sarcomere/fiber without filament shortening

## modules
103 BMS

## module_subject
103 BMS > Histology > Muscle Tissue > Skeletal Muscle

## related_article_ids
ART-103-HIS-SKELETAL-MUSCLE-STRUCTURE

## related_concept_ids
CON-MSK-B080975D6171CF

## field_notes
modules: This record states a fact the 103 BMS Histology department book also teaches, at the section named in `module_subject`; added because the live record carried an empty `moduleIds`. No other field is changed.
The department book illustrates this exact contraction-length relationship in its "Relaxed and contracted sarcomere" figure (file page 26); the figure's own caption text was not machine-readable in the corpus extraction, so this update adds only module placement, not a new original_wording quote, to avoid overstating what the extracted text itself states.
relatedArticleIds: ART-103-HIS-SKELETAL-MUSCLE-STRUCTURE already states this exact contraction-length relationship in its own Mechanism and Key determinants sections, sourced from the book's own EM-picture prose ("I-bands are very short in contracted muscle and longer in relaxed muscle, the length of the A-bands remain constant," file page 25); the article did not yet cite this concept id, which is the gap the lane report flagged (department written-assessment Q3's "during contraction" table) — cited now.
relatedConceptIds: Cross-linked to CON-MSK-B080975D6171CF, the skeletal/cardiac/smooth comparison table, which states sarcomere regularity/absence as one of its own rows.

---

# Item

## id
CON-MSK-740E240D62B9A5

## label
After injury satellite cells activate, proliferate, and fuse into new muscle fibers

## modules
103 BMS

## module_subject
103 BMS > Histology > Muscle Tissue > Skeletal Muscle

## related_article_ids
ART-103-HIS-SKELETAL-MUSCLE-FIBRE-TYPES-CLINICAL

## related_concept_ids
[clear]

## field_notes
modules: This record states a fact the 103 BMS Histology department book also teaches, at the section named in `module_subject`; added because the live record carried an empty `moduleIds`. No other field is changed.
Matches the department book's own regeneration paragraph (satellite cells lie between sarcolemma and basal lamina, activate after injury, proliferate and fuse to form new fibres); module placement added.
relatedArticleIds: ART-103-HIS-SKELETAL-MUSCLE-FIBRE-TYPES-CLINICAL discusses this fact (satellite-cell regeneration) without owning it as a new concept of its own; added so the article's related_concepts link resolves in both directions.

---

# Item

## id
CON-MSK-81DB31A24F7B4E

## label
At musculotendinous junction muscle connective tissue continues into tendon collagen

## modules
103 BMS

## module_subject
103 BMS > Histology > Muscle Tissue > Skeletal Muscle

## related_article_ids
ART-103-HIS-SKELETAL-MUSCLE-FIBRE-TYPES-CLINICAL

## related_concept_ids
[clear]

## field_notes
modules: This record states a fact the 103 BMS Histology department book also teaches, at the section named in `module_subject`; added because the live record carried an empty `moduleIds`. No other field is changed.
Matches the department book's own musculotendinous junction paragraph; module placement added.
relatedArticleIds: ART-103-HIS-SKELETAL-MUSCLE-FIBRE-TYPES-CLINICAL discusses this fact without owning it as a new concept of its own; added so the article's related_concepts link resolves in both directions.

---

# Item

## id
CON-DER-34D2463B0EAFFE

## label
A sensory nerve ending beneath a Merkel cell forms a Merkel cell–neurite complex

## modules
103 BMS

## module_subject
103 BMS > Histology > Integumentary System > The Epidermis

## related_article_ids
ART-103-HIS-EPIDERMIS-NON-KERATINOCYTES

## related_concept_ids
[clear]

## field_notes
modules: This record states a fact the 103 BMS Histology department book also teaches, at the section named in `module_subject`; added because the live record carried an empty `moduleIds`. No other field is changed.
relatedArticleIds: ART-103-HIS-EPIDERMIS-NON-KERATINOCYTES discusses this fact without owning it as a new concept of its own; added so the article's related_concepts link resolves in both directions.
Matches the department book's own Merkel cell EM description (a free sensory nerve fibre traverses the basal lamina to terminate as a disc-shaped expansion beneath the Merkel cell, forming the Merkel cell-neurite complex); module placement added. The department book's fuller Merkel cell record (origin, LM, EM, function) is a separate new mint in this batch, ART-103-HIS-EPIDERMIS-NON-KERATINOCYTES.

---

# Item

## id
CON-DER-F4F6AA9BEAB1B6

## label
Apocrine ducts spiral through dermis, open into hair follicles, and have two cuboidal-cell layers

## modules
103 BMS

## module_subject
103 BMS > Histology > Integumentary System > Sweat Glands

## related_article_ids
ART-103-HIS-SWEAT-GLANDS

## related_concept_ids
CON-DER-6C82312DEBED0A
CON-DER-8F25CCE084AF16

## field_notes
modules: This record states a fact the 103 BMS Histology department book also teaches, at the section named in `module_subject`; added because the live record carried an empty `moduleIds`. No other field is changed.
relatedConceptIds: Cross-linked to the other two apocrine-fact live records updated alongside this one; the full eccrine-versus-apocrine comparison this module mints separately cross-links all three from its own side.
relatedArticleIds: ART-103-HIS-SWEAT-GLANDS discusses this fact without owning it as a new concept of its own; added so the article's related_concepts link resolves in both directions.

---

# Item

## id
CON-DER-6C82312DEBED0A

## label
Apocrine glands occur in thin skin of axillary, pubic, and perineal regions

## modules
103 BMS

## module_subject
103 BMS > Histology > Integumentary System > Sweat Glands

## related_article_ids
ART-103-HIS-SWEAT-GLANDS

## related_concept_ids
CON-DER-F4F6AA9BEAB1B6
CON-DER-8F25CCE084AF16

## field_notes
modules: This record states a fact the 103 BMS Histology department book also teaches, at the section named in `module_subject`; added because the live record carried an empty `moduleIds`. No other field is changed.
relatedConceptIds: Cross-linked to the other two apocrine-fact live records updated alongside this one.
relatedArticleIds: ART-103-HIS-SWEAT-GLANDS discusses this fact without owning it as a new concept of its own; added so the article's related_concepts link resolves in both directions.

---

# Item

## id
CON-DER-8F25CCE084AF16

## label
Apocrine secretion is viscous and initially odorless but becomes offensive through bacterial action

## modules
103 BMS

## module_subject
103 BMS > Histology > Integumentary System > Sweat Glands

## related_article_ids
ART-103-HIS-SWEAT-GLANDS

## related_concept_ids
CON-DER-F4F6AA9BEAB1B6
CON-DER-6C82312DEBED0A

## field_notes
modules: This record states a fact the 103 BMS Histology department book also teaches, at the section named in `module_subject`; added because the live record carried an empty `moduleIds`. No other field is changed.
relatedConceptIds: Cross-linked to the other two apocrine-fact live records updated alongside this one.
relatedArticleIds: ART-103-HIS-SWEAT-GLANDS discusses this fact without owning it as a new concept of its own; added so the article's related_concepts link resolves in both directions.

---

# Item

## id
CON-DER-D09D3742DF2B67

## label
Sweat glands of palmar skin

## modules
103 BMS

## module_subject
103 BMS > Histology > Integumentary System > Sweat Glands

## related_article_ids
ART-103-HIS-SWEAT-GLANDS

## related_concept_ids
[clear]

## field_notes
modules: This record states a fact the 103 BMS Histology department book also teaches, at the section named in `module_subject`; added because the live record carried an empty `moduleIds`. No other field is changed.
Consistent with (though narrower than) the department book's statement that eccrine glands "are more in thick skin", of which the palm is a named site; module placement added.
relatedArticleIds: ART-103-HIS-SWEAT-GLANDS discusses this fact without owning it as a new concept of its own; added so the article's related_concepts link resolves in both directions.

---

# Item

## id
CON-DER-8BE6D5C68517EC

## label
Aggregation of keratin into tonofibrils converts granular cells into keratinized cells

## modules
103 BMS

## module_subject
103 BMS > Histology > Integumentary System > The Epidermis

## related_article_ids
ART-103-HIS-EPIDERMIS-LAYERS

## related_concept_ids
[clear]

## field_notes
modules: This record states a fact the 103 BMS Histology department book also teaches, at the section named in `module_subject`; added because the live record carried an empty `moduleIds`. No other field is changed.
Matches the department book's own stratum granulosum keratinisation step; module placement added. The fuller keratohyalin/lamellar-granule record this module mints separately is a new concept in this batch, cross-linked from there.
relatedArticleIds: ART-103-HIS-EPIDERMIS-LAYERS discusses this fact without owning it as a new concept of its own; added so the article's related_concepts link resolves in both directions.

---

