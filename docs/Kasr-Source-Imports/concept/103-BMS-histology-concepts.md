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
The papillary layer of the dermis is thin, loose, cellular and vascular; the reticular layer is thick, dense and less vascular

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
The dermis is formed of two layers. The papillary layer is the thinner superficial layer and forms the dermal papillae; it is loose connective tissue, more cellular, carries fine type III collagen and elastic fibres, is more vascular because it nourishes the avascular epidermis, and contains Meissner's corpuscles. The reticular layer is the thicker deep layer of dense connective tissue, less cellular, carries type I collagen in bundles with elastic fibres, is less vascular, and contains Pacinian corpuscles, Ruffini's end organs and Krause's end bulbs.

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

## related_concept_ids
CON-DER-A4BD56E5027310

## resource_ids
src_2bf25a6864c9f6ce3283

## approved_file_resource_ids

## approved_video_resource_ids

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

## source_candidate_ids

## original_wording
[Histology Q1, 3 Marks] Compare between Reticular layer and Papillary layer.
"Formed of 2 layers: Papillary layer and Reticular layer."
"Deeo Connective tissue under epidermis."

## merge_ids

## rejected_merge_candidate_ids
CON-DER-A4BD56E5027310

## conflicts

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
The osteoblast arises from osteogenic cells, lines the bone surface, and has the ultrastructure of a protein-secreting cell

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
The osteoblast is the bone-forming cell. It arises from osteogenic (osteoprogenitor) cells and lies immediately under the periosteum as a continuous single layer covering the bone surface, and under the endosteum. By light microscopy it is an oval cell with a few minute processes and an eccentric nucleus, its cytoplasm darkly basophilic with a negative Golgi image beside the nucleus, and it is rich in alkaline phosphatase. By electron microscopy it shows the characters of a protein-forming cell: abundant rough endoplasmic reticulum, mitochondria and a well-developed Golgi apparatus.

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

## approved_video_resource_ids

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

## source_candidate_ids

## original_wording
[Histology Q2, 6 Marks] Compare between Osteoblast and Osteoclast regarding (origin, site, LM and EM)
"Darkly basophilic cytoplasm with a negative Golgi image near nucleus."
"Characters of protein forming cells. They are rich in rER, mitochondria & a well-developed Golgi apparatus."

## merge_ids

## rejected_merge_candidate_ids
CON-MSK-967E873EEEACE0 | CON-MSK-73194853F85AEC

## conflicts

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
The osteoclast is a multinucleated cell formed by fusion of haemopoietic progenitors that resorbs bone from Howship's lacuna

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
The osteoclast is the bone-destroying cell. It is formed by fusion of mononuclear haemopoietic progenitor cells, and lies on the bone surface near the bone marrow inside an excavation called Howship's lacuna. By light microscopy it is a large irregular cell with 6 to 12 nuclei and foamy acidophilic cytoplasm, showing a brush border against the nearby bony surface. By electron microscopy that brush border is a ruffled surface bearing microvilli, and the cytoplasm is rich in lysosomes, mitochondria and Golgi apparatus and shows multiple vesicles.

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

## approved_video_resource_ids

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

## source_candidate_ids

## original_wording
[Histology Q2, 6 Marks] Compare between Osteoblast and Osteoclast regarding (origin, site, LM and EM)
"Fusion of mononuclear hemopoietic progenitor cells."
"Osteoclast has a ruffled surface which shows microvilli"

## merge_ids

## rejected_merge_candidate_ids
CON-MSK-967E873EEEACE0 | CON-END-113A6621B654E8 | CON-MSK-73194853F85AEC

## conflicts

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
The intercalated disc has a transverse component carrying desmosomes and fascia adherens and a lateral component carrying gap junctions

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
Intercalated discs are the junctions between the sarcolemmas of adjacent cardiac muscle cells within a cardiac muscle fibre. By light microscopy they are clear lines that cross the fibre transversely at intervals along its length. By electron microscopy each disc has two regions. The transverse component crosses the fibre; desmosomes and adherent junctions (fascia adherens) sit here and bind the cells firmly together so they do not separate during repetitive contraction. The lateral component lies parallel to the fibre; gap junctions sit here and let contraction signals pass from cell to cell, and their lateral position shelters them from the contraction forces.

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
CON-MSK-888DFA3AA4E974 | CON-MSK-E36936D62038BF

## resource_ids
src_2bf25a6864c9f6ce3283

## approved_file_resource_ids

## approved_video_resource_ids

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

## source_candidate_ids

## original_wording
[Histology Q3, 3 Marks] Mention LM and EM picture of Intercalated disc.
"By LM, intercalated discs are clear lines that appear transversely at intervals along the length of cardiac muscle fiber."
"Their position in the lateral parts of the disc protect them from the contraction forces"

## merge_ids

## rejected_merge_candidate_ids

## conflicts

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
CON-MSK-888DFA3AA4E974

## label
Smooth muscle has caveolae instead of T-tubules and dense bodies instead of Z lines, and its irregular myofilaments leave it unstriated

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
On electron microscopy the smooth muscle cell has a thin sarcolemma surrounded by a basal lamina, with no T-tubules and no tubular system; instead the surface is invaginated into caveolae, which control calcium release and contraction. The single oval central nucleus takes a corkscrew shape during contraction. The acidophilic sarcoplasm holds numerous mitochondria, sarcoplasmic reticulum, free ribosomes, a small Golgi apparatus and glycogen granules, mainly around the nucleus. Thick myosin and thin actin filaments are irregularly arranged, so no striations appear. Actin inserts into sarcoplasmic and sarcolemma-associated dense bodies, which correspond to the Z line of striated muscle, and abundant intermediate desmin filaments insert there too; those attachments transmit contractile force to adjacent cells. There is no troponin — calmodulin takes its place.

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
CON-MSK-0DEAF126DF8F2E | CON-MSK-E36936D62038BF

## resource_ids
src_2bf25a6864c9f6ce3283

## approved_file_resource_ids

## approved_video_resource_ids

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

## source_candidate_ids

## original_wording
[Histology Q4, 3 Marks] Mention EM picture of Smooth muscles
"Sarcolemma thin surrounded by basal lamina. It shows no T-tubules, instead there are invaginations along the cell surface, called caveolae."
"No troponin , instead there is calmodulin protein."

## merge_ids

## rejected_merge_candidate_ids
CON-MSK-E36936D62038BF

## conflicts

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
Bone cells include osteogenic cells, osteoblasts, osteocytes, and osteoclasts

## aliases
Bone cells
Osteogenic cell
Osteoprogenitor cell
Osteocyte
Four bone cells

## arabic_label
خلايا العظم

## pitfalls
Treating the four bone cells as four unrelated types. Three of them are one lineage — the osteogenic cell becomes the osteoblast, and the osteoblast walled into calcified matrix becomes the osteocyte — while the osteoclast comes from the haemopoietic line by fusion and is not part of that sequence at all.

## modules
103 BMS

## module_subject
103 BMS > Histology > Bone > Bone Cells

## related_concept_ids
CON-MSK-D137ADEEC56243 | CON-MSK-76CE11C6DCDC37

## rejected_merge_candidate_ids
CON-MSK-D137ADEEC56243 | CON-MSK-76CE11C6DCDC37

---

# Item

## id
CON-MSK-E36936D62038BF

## label
Alternating anisotropic dark A bands and isotropic light I bands create striations

## aliases
A band
I band
Striations
Anisotropic and isotropic bands
Transverse striations of striated muscle

## arabic_label
الحزم الداكنة والفاتحة المكوّنة للتخطيط العرضي

## pitfalls
Reading "anisotropic" and "isotropic" as names for the colours seen in a stained section. They describe behaviour under the polarising microscope — the A band alters polarised light in two planes and the I band does not — and the dark and light appearance in an ordinary section follows from filament overlap, not from a dye.

## modules
103 BMS

## module_subject
103 BMS > Histology > Muscle Tissue > Skeletal Muscle

## related_concept_ids
CON-MSK-888DFA3AA4E974 | CON-MSK-0DEAF126DF8F2E

---

# Item

## id
CON-DER-A4BD56E5027310

## label
Arrector pili is a smooth-muscle bundle extending from mid hair follicle to papillary dermis

## subject
derm

## aliases
Arrector pili
Arrector pili muscle
Erector pili
Goose skin

## arabic_label
العضلة الناصبة للشعرة

## pitfalls
Expecting a striated muscle because the hair visibly stands up. The arrector pili is smooth muscle under sympathetic control, which is why the response to fear and cold is involuntary and why it cannot be produced to order.

## modules
103 BMS

## module_subject
103 BMS > Histology > Integumentary System > Skin Appendages

## related_concept_ids
CON-DER-56784AB396C13E
