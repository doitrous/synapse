<!--
  MU-MED104 (Musculoskeletal) · lane-2 authored concepts.

  Six full NEW concept records (Q02/Q04/Q05/Q06 of the MFM42Support END MODULE
  MSK1 exam, biochemistry/physiology; Q01/Q03 of MSK2 endmodule exam group 1,
  pathology) — searched via find-existing.mjs and a canonical-key grep sweep
  first, no existing record found for any of the six (see the field_notes on
  each item for the exact search terms tried).

  Plus two SPARSE overlay records for questions whose main concept is already
  LIVE in server/data/medical-library-v1.json (LANE-CARD §2 rule 4 / the
  concept-id overlay rule in 00-START-HERE.md: "a hit in live state → a sparse
  update: the id, the discriminating columns, and only the overlay fields
  you're adding — never a full record"):
    - CON-MSK-594BD65D8C0D7A (adductor-canal anterior relations) — final41-q1
    - CON-END-1DE2C490ABBA64 (renal 1-alpha-hydroxylase) — msk2-2019-g1-q02

  Evidence (one claim + one citation per new concept, from the MED104 dept
  books/lectures, plus a resource record per source) is in the sibling
  evidence/MU-MED104-* files. Teaching articles are in
  article/MU-MED104-articles.md.

  Simulate together with the sibling article + evidence files + this module's
  new-concept question batches, e.g.:
    npm run medical:simulate -- \
      docs/Menoufia-Source-Imports/concept/MU-MED104-concepts.md \
      docs/Menoufia-Source-Imports/article/MU-MED104-articles.md \
      docs/Menoufia-Source-Imports/evidence/MU-MED104-resources.md \
      docs/Menoufia-Source-Imports/evidence/MU-MED104-claims.md \
      docs/Menoufia-Source-Imports/evidence/MU-MED104-citations.md \
      docs/Menoufia-Source-Imports/question/MU-MED104-new-concepts-mcq.md \
      docs/Menoufia-Source-Imports/question/MU-MED104-live-hits-mcq.md \
      --emit /tmp/sim-MU-MED104-concepts.json

  Import: Admin › Concepts › Import.
-->

# Item

## label
Menkes disease is a copper-transport defect that starves the copper-dependent enzyme lysyl oxidase, so collagen and elastin cannot be cross-linked

## id
CON-FND-C634004C7B9069

## canonical_key
menkes.copper-lysyl-oxidase-crosslinking

## aliases
Menkes disease
Menkes kinky hair disease
Lysyl oxidase deficiency
Copper transport defect collagen elastin

## arabic_label
مرض مينكيس (نقص النحاس)

## arabic_aliases
نقص إنزيم الليسيل أوكسيديز

## definition
Lysyl oxidase is the copper-dependent enzyme that oxidatively deaminates lysine and hydroxylysine residues in tropocollagen and lysine residues in tropoelastin, producing the reactive aldehydes that go on to form the covalent cross-links which give both proteins their mechanical strength. Menkes disease is an X-linked defect of intestinal copper absorption and transport (a mutated copper-transporting ATPase, the same pathway that is disrupted in the opposite direction in Wilson disease), so tissue copper is deficient and lysyl oxidase, like every other copper-dependent enzyme, cannot be made active. The direct consequence is defective cross-linking of both collagen and elastin, not a defect of either protein's primary synthesis, which is why the disease produces connective-tissue fragility (kinky, brittle hair and lax skin and vessels) alongside the neurological features of copper deficiency.

## explicit_objective
State that Menkes disease is a copper-transport (not a synthesis) defect, name lysyl oxidase as the copper-dependent cross-linking enzyme it starves, and give defective cross-linking of collagen and elastin together as the resulting connective-tissue lesion.

## pitfalls
Confusing Menkes disease with a vitamin C (ascorbic acid) deficiency because both end up weakening collagen — vitamin C is a cofactor for prolyl/lysyl hydroxylase (adding hydroxyl groups before secretion), while Menkes disease knocks out lysyl oxidase (forming cross-links after secretion), a different enzyme and a different step. Naming only collagen as affected: lysyl oxidase cross-links elastin by the same chemistry, so Menkes disease costs both proteins together.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T05

## secondary_node_ids
[clear]

## topic
Extracellular matrix proteins

## subtopic
Collagen and elastin cross-linking disorders

## microtopic
Menkes disease

## nanotopic


## modules
MU-MED104

## module_subject
MU-MED104 > 00 Module-wide > 06 EOM Exams > MFM 42 Support > Biochemistry

## article_ids
ART-FND-MU104-COLLAGEN-MINERAL-VITD

## related_article_ids


## related_concept_ids


## resource_ids
src_57f44dcc809b58a1a81f

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.4

## academic_relevance
0.8

## weight_confidence
0.3

## confidence
0.75

## atomic_claim_ids
CLM-FND-MENKES-COPPER-CROSSLINK-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Menkes disease is due to which one of the following: / Defective cross-linking of collagen and elastin

## exam_signal
src_2b2ae5ff3599e526123e | bank | | p1 | MU-MED104

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched "Menkes", "lysyl oxidase" and "copper transport" against live state and every pending batch via find-existing.mjs — no existing concept found (the only near-hits were unrelated copper-metabolism concepts about Wilson disease, ceruloplasmin and taste/smell acuity in the same MSK-main department book).
mu: Tested as MFM42Support - END MODULE MSK1.pdf Q2, "Menkes disease is due to which one of the following" (answer: Defective cross-linking of collagen and elastin), red-text key confirmed by render of the paired Answers file, p1.

---

# Item

## label
Solubility, and therefore intestinal absorption, of calcium is favoured by a low (acidic) pH and impaired by excess oxalate, phytate or unabsorbed fatty acids, which precipitate it as insoluble salts

## id
CON-FND-21CA469838BAA3

## canonical_key
calcium.intestinal-absorption-ph-solubility

## aliases
Factors affecting calcium absorption
Calcium solubility intestine
Calcium oxalate precipitation
Calcium phytate precipitation

## arabic_label
عوامل امتصاص الكالسيوم

## arabic_aliases
ذوبان الكالسيوم في الأمعاء

## definition
Intestinal calcium absorption depends on the mineral first being kept in a soluble, ionised form in the gut lumen; anything that keeps calcium salts in solution favours absorption, and anything that precipitates them as insoluble salts blocks it. A low (acidic) intraluminal pH keeps calcium ionised and soluble, so a high, more alkaline pH lowers its solubility and therefore its absorption — an acidic environment, not an alkaline one, is what favours calcium uptake. Excess dietary oxalate, phytic acid and unabsorbed (saponified) fatty acids all bind calcium into insoluble calcium oxalate, calcium phytate or calcium soaps, and so all reduce the fraction of calcium available for absorption, alongside the physiological drivers of absorption itself — dietary calcium load, vitamin D (calcitriol) and parathyroid hormone.

## explicit_objective
State that a low (acidic) pH, not a high one, favours calcium solubility and absorption, and name excess oxalate, phytate and unabsorbed fatty acids as factors that precipitate calcium and so impair its absorption.

## pitfalls
Assuming a high (alkaline) pH favours calcium solubility because alkaline conditions are often associated with "healthy" absorption in casual teaching — the opposite is true: calcium salts are more soluble, and so better absorbed, in an acidic environment, which is also why achlorhydria (loss of gastric acid) impairs calcium absorption.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T05

## secondary_node_ids
[clear]

## topic
Mineral metabolism

## subtopic
Calcium absorption and blood levels

## microtopic
Factors affecting calcium solubility and absorption

## nanotopic


## modules
MU-MED104

## module_subject
MU-MED104 > 00 Module-wide > 06 EOM Exams > MFM 42 Support > Biochemistry

## article_ids
ART-FND-MU104-COLLAGEN-MINERAL-VITD

## related_article_ids


## related_concept_ids


## resource_ids
src_13d5611eaa0e1504ff10

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.4

## academic_relevance
0.8

## weight_confidence
0.3

## confidence
0.7

## atomic_claim_ids
CLM-FND-CALCIUM-PH-SOLUBILITY-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Which of the following increase the solubility of Ca+2 in the intestines: / Low PH

## exam_signal
src_2b2ae5ff3599e526123e | bank | | p1 | MU-MED104

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched "calcium absorption" and "solubility" against live state and every pending batch via find-existing.mjs — the only hits were about which vitamin/hormone regulates calcium (a different tested angle), not the pH-solubility mechanism; no existing concept found.
mu: Tested as MFM42Support - END MODULE MSK1.pdf Q4, "Which of the following increase the solubility of Ca+2 in the intestines" (answer: Low PH), red-text key confirmed by render of the paired Answers file, p1.

---

# Item

## label
Vitamin D is classed as a hormone because its active form has a steroid-like nuclear receptor mechanism, is synthesised endogenously in skin, is feedback-regulated, and acts on definite distant target organs — not because of any dietary property

## id
CON-FND-31131EDB3C9C2A

## canonical_key
vitamind.hormone-classification-criteria

## aliases
Why vitamin D is a hormone
Calcitriol hormone criteria
Vitamin D prohormone
Steroid hormone action vitamin D

## arabic_label
لماذا يعتبر فيتامين د هرمونًا

## arabic_aliases
معايير تصنيف فيتامين د كهرمون

## definition
Vitamin D is classed as a hormone, not simply a vitamin, on several converging grounds. Structurally, its active form shares the cyclopentanoperhydrophenanthrene ring system of steroid hormones and acts, like them, through a nuclear receptor mechanism. It is synthesised endogenously — cholecalciferol is made in human skin from 7-dehydrocholesterol under ultraviolet light and then activated in two further enzymatic steps (liver 25-hydroxylation, renal 1-alpha-hydroxylation) — so, unlike a true vitamin, the body does not depend on a dietary source for it. The formation of both its active forms (25-hydroxyvitamin D3 and 1,25-dihydroxyvitamin D3) is subject to feedback regulation, and the active hormone (calcitriol) acts on definite, distant target organs — the small intestine, bone and kidney — exactly the "produced in one place, acts on another" pattern that defines a hormone, alongside parathyroid hormone and calcitonin in calcium homeostasis. Being present in dietary food is not one of these criteria and does not, by itself, argue for or against hormone status; it is the mode of action, endogenous synthesis, feedback regulation and target-organ specificity that do.

## explicit_objective
List the four grounds for calling vitamin D a hormone — steroid-like nuclear receptor action, endogenous skin synthesis, feedback-regulated activation, and definite distant target organs — and state that dietary presence is not one of them.

## pitfalls
Treating "found in dietary food" as evidence for vitamin D being a hormone, on the logic that hormones and vitamins are both taken by mouth — the department's own list of criteria never cites diet; it is the endogenous skin synthesis, not any dietary route, that is one of the actual criteria, so a source that only lists a dietary property is not naming a reason vitamin D behaves like a hormone.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T05

## secondary_node_ids
[clear]

## topic
Vitamin D biochemistry

## subtopic
Vitamin D as a hormone

## microtopic
Criteria for classifying vitamin D as a hormone

## nanotopic


## modules
MU-MED104

## module_subject
MU-MED104 > 00 Module-wide > 06 EOM Exams > MFM 42 Support > Biochemistry

## article_ids
ART-FND-MU104-COLLAGEN-MINERAL-VITD

## related_article_ids


## related_concept_ids


## resource_ids
src_57f44dcc809b58a1a81f

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.45

## exam_weight_by_year
MU_Y1=0.45

## clinical_relevance
0.4

## academic_relevance
0.8

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-FND-VITAMIND-HORMONE-CRITERIA-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
One of the following is not a cause of considering VIT D as a hormone: / It is found in dietary food

## exam_signal
src_2b2ae5ff3599e526123e | bank | | p1 | MU-MED104

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched "vitamin D hormone" and "calcitriol" against live state and every pending batch via find-existing.mjs — live vitamin D concepts cover PTH/1,25(OH)2D3 physiology (e.g. CON-END-1DE2C490ABBA64), not this "why is it classed as a hormone" criteria list; no existing concept found for this specific angle.
mu: Tested as MFM42Support - END MODULE MSK1.pdf Q5, "One of the following is not a cause of considering VIT D as a hormone" (answer: It is found in dietary food), red-text key confirmed by render of the paired Answers file, p1.

---

# Item

## label
The axon membrane's action potential is driven by voltage-gated sodium and potassium channels, distinct from the mechanically-gated, ligand-gated and leakage channels found elsewhere on the neurone

## id
CON-NEU-95192B889B38A3

## canonical_key
nerve.axon-voltage-gated-channels

## aliases
Voltage-gated channels axon
Ion channel types nerve
Leakage channels resting potential
Ligand-gated vs voltage-gated channels

## arabic_label
القنوات البوابية الجهدية في المحور العصبي

## arabic_aliases


## definition
Several distinct classes of ion channel are distributed across a neurone, each opened by a different kind of stimulus and each doing a different job. Leakage (non-gated) channels are always open at a low rate and set the resting membrane potential. Ligand-gated channels open when a specific chemical ligand — a neurotransmitter at a synapse, for instance — binds a receptor. Mechanically-gated channels open in response to physical deformation of the membrane, as at a mechanoreceptor ending. The axon itself, along its length, is dominated by voltage-gated channels: a rise in membrane potential past threshold opens voltage-gated sodium channels to drive depolarisation, and the subsequent opening of voltage-gated potassium channels drives repolarisation, propagating the action potential from the axon hillock to the nerve terminal. It is this voltage-gated class, not the ligand- or mechanically-gated classes used elsewhere in the nervous system, that generates and conducts the nerve impulse along the axon.

## explicit_objective
Name voltage-gated channels as the class responsible for generating and conducting the action potential along the axon, and distinguish them from the ligand-gated, mechanically-gated and leakage channels found at other neuronal sites.

## pitfalls
Assuming any channel physically located on a neurone must be voltage-gated — a synaptic receptor channel on the same cell is ligand-gated, and a leakage channel is always open regardless of voltage; it is specifically the axon's own impulse-conducting channels that are voltage-gated.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
neuro

## primary_node_id
DIS-PHY-T07

## secondary_node_ids
DIS-PHY-T01 | SYS-NEU

## topic
Nerve physiology

## subtopic
Action potential generation

## microtopic
Ion channel types on the axon

## nanotopic


## modules
MU-MED104

## module_subject
MU-MED104 > 00 Module-wide > 06 EOM Exams > MFM 42 Support > Physiology

## article_ids
ART-NEU-MU104-AXON-CHANNELS

## related_article_ids


## related_concept_ids
CON-NEU-77596C8A899A7E

## resource_ids
src_a552e2f85e495977a8d8

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.8

## weight_confidence
0.3

## confidence
0.75

## atomic_claim_ids
CLM-NEU-AXON-VOLTAGE-GATED-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Which of the following channel types are located on nerve axon? / Voltage-gated channels

## exam_signal
src_2b2ae5ff3599e526123e | bank | | p2 | MU-MED104

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched "voltage-gated", "leakage channel", "mechanically gated" and "ligand-gated" against live state and every pending batch via find-existing.mjs — the only live/pending hits are single-channel-type concepts in unrelated contexts (cardiac/smooth-muscle voltage-gated calcium, a standalone ligand-gated-channel essay fact, CON-NEU-77596C8A899A7E on excitability factors); none classifies the channel types found on the axon itself, so no existing concept covers this angle.
mu: Tested as MFM42Support - END MODULE MSK1.pdf Q6, "Which of the following channel types are located on nerve axon?" (answer: Voltage-gated channels), red-text key confirmed by render of the paired Answers file, p2.

---

# Item

## label
Giant cell tumour of bone (osteoclastoma) is a locally malignant tumour of unknown origin, typically epiphyseal and around the knee in adults 20-50, giving a soap-bubble radiograph and numerous evenly distributed multinucleated giant cells microscopically

## id
CON-MSK-80E36FA26C910A

## canonical_key
bonetumor.giant-cell-tumor-locally-malignant

## aliases
Giant cell tumor of bone
Osteoclastoma
Soap bubble appearance bone
Locally malignant bone tumor

## arabic_label
ورم الخلايا العملاقة العظمي

## arabic_aliases
الورم العظمي الحال للعظم

## definition
Giant cell tumour of bone (osteoclastoma) is classified, alongside adamantinoma, as a locally malignant tumour of unknown histogenetic origin — a behaviour category distinct from both the benign and the frankly malignant primary bone tumours in the same classification table (which places, for comparison, osteoid osteoma and osteochondroma as benign and osteosarcoma and Ewing tumour as malignant). It typically affects adults aged 20 to 50, with a male predominance, and characteristically arises in the epiphysis around the knee, the distal radius or the sacrum. Radiographically it produces the classic "soap-bubble" appearance as the expanding epiphysis is filled with multiple blood-containing cysts and the cortex thins; microscopically it shows numerous multinucleated giant cells evenly distributed against a background of plump mononuclear cells, with areas of haemorrhage. "Locally malignant" captures its behaviour precisely: it is locally aggressive and prone to recurrence after curettage, but it does not behave as a frankly malignant, metastasising tumour the way osteosarcoma does.

## explicit_objective
State that giant cell tumour of bone is classified as locally malignant (neither simply benign nor frankly malignant), and give its typical age, site, X-ray and microscopic appearance.

## pitfalls
Calling giant cell tumour of bone either "benign" or "malignant" outright — the department's own primary-bone-tumour classification table places it in a distinct third column, "locally malignant," alongside adamantinoma, precisely because it behaves more aggressively than a benign lesion (local recurrence is common) without metastasising like a true sarcoma.

## concept_type
clinical_correlation

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id


## secondary_node_ids
SYS-MSK

## topic
Bone tumours

## subtopic
Tumours of unknown origin

## microtopic
Giant cell tumour of bone (osteoclastoma)

## nanotopic


## modules
MU-MED104

## module_subject
MU-MED104 > 00 Module-wide > 06 EOM Exams > MSK2 Endmodule Group 1 > Pathology

## article_ids
ART-MSK-MU104-BONE-INFECTION-TUMOR

## related_article_ids


## related_concept_ids


## resource_ids
src_202ac924ca2292a7190c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.45

## exam_weight_by_year
MU_Y1=0.45

## clinical_relevance
0.6

## academic_relevance
0.7

## weight_confidence
0.3

## confidence
0.75

## atomic_claim_ids
CLM-MSK-GCT-LOCALLY-MALIGNANT-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Osteolytic epiphyseal mass with giant cells on biopsy — most likely diagnosis / behaviour: locally malignant process

## exam_signal
src_f6869acd17fa39839f00 | bank | | p1 | MU-MED104

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
No DIS-PAT-* node names bone-tumour behaviour classification specifically without over-reaching (DIS-PAT-T01 in the live catalogue is neoplasia in general pathology terms, not this MSK-specific tumour); primary_node_id left empty rather than guessed, per the AU-MED-102 anatomy precedent for the same situation.

## field_notes
sourceCandidateIds: Searched "giant cell tumor" and "osteoclastoma" against live state and every pending batch via find-existing.mjs — no existing concept found.
mu: Tested as MSK2 endmodule exam group 1 - model answer.pdf Q1, "Osteolytic epiphyseal mass, giant cells on biopsy" (answer: Locally malignant process), underline key on p1 (read directly from cached text, not yet render-confirmed for this file's own convention — flagged in coverage/MU-MED104-triage.md).

---

# Item

## label
A sequestrum is a dead fragment of bone in osteomyelitis, produced when a subperiosteal abscess cuts off its blood supply, gradually separated from living bone by granulation tissue, and seen as an avascular, dense fragment on X-ray

## id
CON-MSK-5428B9231C2794

## canonical_key
osteomyelitis.sequestrum-dead-bone

## aliases
Sequestrum
Dead bone osteomyelitis
Involucrum sequestrum
Necrotic bone fragment

## arabic_label
النسيج العظمي الميت (السيكوستروم)

## arabic_aliases


## definition
In acute osteomyelitis, a subperiosteal abscess elevates the periosteum and impairs the blood supply to the underlying cortex, causing that segment of bone to die; this dead, avascular piece of bone is the sequestrum. It is gradually separated from the surrounding living bone by granulation tissue and, because it has no blood supply, appears denser and more radio-opaque than the living bone around it on X-ray — the opposite of the porous, lucent appearance of living, vascularised bone undergoing repair. The periosteum that was elevated over it goes on to lay down new bone (the involucrum), a sleeve of living tissue that can come to enclose the dead sequestrum; the persistence of an infected sequestrum, walled off from both the bloodstream and systemic antibiotics, is what makes chronic osteomyelitis so difficult to eradicate without surgical removal.

## explicit_objective
Define a sequestrum as a dead (avascular) fragment of bone caused by loss of blood supply in osteomyelitis, and state its X-ray appearance and its relationship to the involucrum.

## pitfalls
Confusing the sequestrum (dead bone) with the involucrum (the sleeve of new living bone the periosteum lays down around it) — they are opposite in nature (necrotic versus newly formed, living) even though they arise together in the same disease process and the same radiograph.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id


## secondary_node_ids
SYS-MSK

## topic
Osteomyelitis

## subtopic
Bone necrosis and repair in osteomyelitis

## microtopic
Sequestrum

## nanotopic


## modules
MU-MED104

## module_subject
MU-MED104 > 00 Module-wide > 06 EOM Exams > MSK2 Endmodule Group 1 > Pathology

## article_ids
ART-MSK-MU104-BONE-INFECTION-TUMOR

## related_article_ids


## related_concept_ids


## resource_ids
src_60e27edc756c95033873

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.6

## academic_relevance
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-MSK-SEQUESTRUM-DEAD-BONE-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Sequestrum definition / Dead bone

## exam_signal
src_f6869acd17fa39839f00 | bank | | p1 | MU-MED104

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
No DIS-PAT-* node names osteomyelitis/bone-necrosis specifically without over-reaching; primary_node_id left empty rather than guessed, per the AU-MED-102 anatomy precedent for the same situation.

## field_notes
sourceCandidateIds: Searched "sequestrum" and "osteomyelitis" against live state and every pending batch via find-existing.mjs — the only hit was an unrelated Pasteurella/cat-bite infection concept; no existing concept covers sequestrum itself.
mu: Tested as MSK2 endmodule exam group 1 - model answer.pdf Q3, "Sequestrum definition" (answer: Dead bone), underline key on p1 (read directly from cached text, not yet render-confirmed for this file's own convention — flagged in coverage/MU-MED104-triage.md).

---

# Item

## label
The fibrous adductor-canal roof and sartorius lie anterior to femoral artery

## id
CON-MSK-594BD65D8C0D7A

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED104

## module_subject
103 BMS > Anatomy > Adductor Canal
MU-MED104 > 00 Module-wide > 07 EOY Exams > Final 41 > Anatomy

## field_notes
mu: Tested as "00 Module-wide/07 EOY Exams/Final 41.pdf" Q8 (lower-limb Anatomy section, watermarked-scan paper numbering), "Adductor-canal infection — which structure stays intact" (answer: Great saphenous vein, which runs superficial to the canal rather than being one of its contents), grey-highlight key, rendered p1 (the "Make Watermark" phone-photo OCR-defeats trap — coverage/MU-MED104-triage.md). Sparse update only: this concept's anterior-adductor-canal-relations definition is already live; the "which structure is outside the canal" framing is this question's own new angle, taught in the correct-option explanation rather than the concept definition.

---

# Item

## label
PTH and decreased phosphate activate proximal-tubular 1-alpha-hydroxylase to form 1,25-dihydroxyvitamin D3

## id
CON-END-1DE2C490ABBA64

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED104

## module_subject
103 BMS > Physiology > PTH and Vitamin D Activation
MU-MED104 > 00 Module-wide > 06 EOM Exams > MSK2 Endmodule Group 1 > Physiology

## field_notes
mu: Tested as "MSK2 endmodule exam group 1 - model answer.pdf" Q2, "Vit D deficiency in chronic renal disease — which enzyme defect" (answer: Alpha-1 hydroxylase enzyme), underline key on p1. Sparse update only: this concept's PTH/1-alpha-hydroxylase mechanism is already live; the CKD-defect clinical framing is this question's own new angle, taught in the correct-option explanation.

---

<!--
  MU-MED104 (Musculoskeletal) · lane-3 authored concepts, from the text-only
  Biochemistry/Histology/Physiology tail (q15-30) of the two 2018 MSK1
  end-module papers ("01- MSK1 endmodule 2018 Group 1.pdf" / "02- MSK1
  endmodule 2018 Group 2.pdf", sourceIds mu_c6bc4b9cefd870477236 /
  mu_c4dfd4af7788e7831b4e). Keys recovered via pagetext.mjs keys (red-text
  convention, same as the MFM42Support paper) plus one render of Group 2 p5
  to resolve four automated-tool ambiguities (q24/25/26/27, cross-checked
  against the render at coverage/MU-MED104-triage-keys.txt). q1-14 of both
  papers are Anatomy, numbered-structure/diagram questions — out of scope
  for this text-only pass, left in the ledger's remaining list. Eleven new
  concepts below, each searched via find-existing.mjs first (no hit for
  any — see field_notes), evidenced from MED104's own Anatomy/Biochemistry/
  Histology/Physiology department books. Two of the eleven each cover a
  fact tested by both papers (inguinal canal boundaries: roof in Group 1,
  floor in Group 2; rigor mortis: both papers ask the same mechanism with
  different option wording) — one concept, two questions apiece. A twelfth
  question (Group 2 Q19, Menkes disease) reuses CON-FND-C634004C7B9069,
  already minted in this same file by lane 1/2 — no overlay needed, it is
  already tagged +mu/+MU_Y1/+MU-MED104.

  Evidence in the sibling evidence/MU-MED104-{claims,citations,resources}.md.
  Teaching articles: one extends ART-FND-MU104-COLLAGEN-MINERAL-VITD (Marfan
  and ionized calcium fold into the existing collagen/calcium/vitD-D
  article's related family); three are new, in article/MU-MED104-articles.md.

  Simulate together with the sibling files, e.g.:
    npm run medical:simulate -- \
      docs/Menoufia-Source-Imports/concept/MU-MED104-concepts.md \
      docs/Menoufia-Source-Imports/article/MU-MED104-articles.md \
      docs/Menoufia-Source-Imports/evidence/MU-MED104-resources.md \
      docs/Menoufia-Source-Imports/evidence/MU-MED104-claims.md \
      docs/Menoufia-Source-Imports/evidence/MU-MED104-citations.md \
      docs/Menoufia-Source-Imports/question/MU-MED104-msk1-2018-g1-mcq.md \
      docs/Menoufia-Source-Imports/question/MU-MED104-msk1-2018-g2-mcq.md \
      --emit /tmp/sim-MU-MED104-lane3.json

  Import: Admin › Concepts › Import.
-->

# Item

## label
The inguinal canal's roof is the arching fibers of the internal oblique and transversus abdominis, and its floor is the inguinal (and medially, lacunar) ligament — distinct from its external-oblique-aponeurosis anterior wall and its fascia-transversalis/conjoint-tendon posterior wall

## id
CON-MSK-896A8D2227FDD0

## canonical_key
inguinalcanal.boundaries-roof-floor

## aliases
Inguinal canal boundaries
Roof of inguinal canal
Floor of inguinal canal
Boundaries of the inguinal canal

## arabic_label
حدود القناة الإربية

## arabic_aliases
سقف وأرضية القناة الإربية

## definition
The inguinal canal is an oblique passage in the lower anterior abdominal wall, and each of its four walls is formed by a different layer of the abdominal musculature. The anterior wall is the aponeurosis of the external oblique, reinforced laterally by fibers of internal oblique; the posterior wall is fascia transversalis, reinforced medially by the conjoint tendon. The roof is formed by the arching fibers of the internal oblique and transversus abdominis muscles as they arch over the canal's contents before inserting into the conjoint tendon, while the floor is the inguinal ligament (the rolled-under lower border of the external oblique aponeurosis), reinforced medially by the lacunar ligament. Each wall is reinforced at one end and thin at the other, which is what allows the canal to serve as a controlled weak point for the spermatic cord (or round ligament) to pass through without the abdominal wall failing along its whole length.

## explicit_objective
Name the tissue forming each of the four walls of the inguinal canal (anterior: external oblique aponeurosis; posterior: fascia transversalis/conjoint tendon; roof: arching internal oblique/transversus abdominis fibers; floor: inguinal/lacunar ligament), and state that this wall arrangement is what an inguinal hernia exploits or is repaired through.

## pitfalls
Swapping roof and floor: the roof is muscular (arching internal oblique and transversus abdominis fibers arching over the canal), while the floor is ligamentous (inguinal and lacunar ligament) — a question naming a specific muscle layer is asking about the roof, one naming a ligament is asking about the floor, and neither is the anterior or posterior wall.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id


## secondary_node_ids
SYS-MSK

## topic
Anterior abdominal wall

## subtopic
Inguinal canal

## microtopic
Boundaries of the inguinal canal (roof and floor)

## nanotopic


## modules
MU-MED104

## module_subject
MU-MED104 > 00 Module-wide > 06 EOM Exams > MSK1 Endmodule 2018 > Anatomy

## article_ids
ART-MSK-MU104-INGUINAL-CARTILAGE-BONE

## related_article_ids


## related_concept_ids


## resource_ids
src_1ba3e4e486a175cba06f

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.5

## academic_relevance
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-MSK-INGUINAL-CANAL-BOUNDARIES-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Which one of the following forms the roof of this structure [inguinal canal]? / Arching fibers | Which one of the following forms the floor of this structure? / Inguinal ligament

## exam_signal
src_c6bc4b9cefd870477236 | paper | | p4 | MU-MED104

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched "inguinal canal" and "inguinal canal roof" against live state and every pending batch via find-existing.mjs, and grep -ril "inguinal canal" across docs/*-Source-Imports/concept/ — no existing record found.
mu: Tested twice — "01- MSK1 endmodule 2018 Group 1.pdf" Q15, "Which one of the following forms the roof of this structure?" (answer: Arching fibers), red-text key p4; "02- MSK1 endmodule 2018 Group 2.pdf" Q15, "...forms the floor of this structure?" (answer: Inguinal ligament), red-text key p3. Same fact family (canal boundaries), one concept, two questions.

---

# Item

## label
Only the ionizable, diffusible fraction of plasma calcium (about 50%) is physiologically active; the other half is inactive, split between protein-bound (mainly to albumin, 45%) and diffusible-but-non-ionizable calcium citrate (5%)

## id
CON-FND-253174586AB3B1

## canonical_key
calcium.ionized-diffusible-active-fraction

## aliases
Ionized calcium
Physiologically active calcium
Diffusible calcium fraction
Protein-bound calcium

## arabic_label
الكالسيوم المتأين النشط فسيولوجيًا

## arabic_aliases
الكسر المتأين من كالسيوم البلازما

## definition
Plasma calcium is not a single homogeneous pool: about 45% is bound to plasma proteins, chiefly albumin, and is both non-diffusible and physiologically inactive; about 5% is diffusible but complexed to anions such as citrate and so remains non-ionizable and still physiologically inactive; and the remaining roughly 50% is the free, ionizable, diffusible fraction, which is the only physiologically active form. This ionized fraction is what nerve and muscle excitability, and the coagulation cascade, actually respond to — total plasma calcium (9-11 mg/100 ml) can be normal while the ionized fraction is abnormal, or vice versa, depending on plasma protein and anion levels. A fall in the ionizable fraction specifically, not total calcium, is what precipitates tetany.

## explicit_objective
State that only the ionizable, diffusible fraction of plasma calcium (about 50%) is physiologically active, and that the protein-bound (45%) and non-ionizable diffusible (5%, e.g. calcium citrate) fractions are not.

## pitfalls
Assuming total plasma calcium concentration alone predicts physiological effect — a change in plasma protein (as in albuminuria) shifts the protein-bound fraction without touching the ionizable fraction and so does not cause tetany, whereas a rise in plasma phosphate precipitates calcium specifically out of the ionizable fraction and does.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Mineral metabolism

## subtopic
Calcium homeostasis

## microtopic
Physiologically active (ionized) fraction of plasma calcium

## nanotopic


## modules
MU-MED104

## module_subject
MU-MED104 > 00 Module-wide > 06 EOM Exams > MSK1 Endmodule 2018 > Biochemistry

## article_ids
ART-FND-MU104-CALCIUM-CALCITONIN

## related_article_ids


## related_concept_ids
CON-FND-21CA469838BAA3

## resource_ids
src_57f44dcc809b58a1a81f

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.5

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-FND-CALCIUM-IONIZED-ACTIVE-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
The only physiologically active form of calcium is: / Ionizable diffusible

## exam_signal
src_c6bc4b9cefd870477236 | paper | | p4 | MU-MED104

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched "ionized calcium physiologically active" and "calcium diffusible ionizable" against live state and every pending batch via find-existing.mjs, plus grep -ril for "ionized calcium" — no existing record; distinct from the live CON-FND-21CA469838BAA3 (factors affecting calcium solubility/absorption in the gut, minted by lane 2), which is about absorption, not the plasma-fraction/activity question, so listed as a related concept rather than a duplicate.
mu: Tested as "01- MSK1 endmodule 2018 Group 1.pdf" Q16, "The only physiologically active form of calcium is:" (answer: Ionizable diffusible), red-text key p4.

---

# Item

## label
The department's own list of calcium's functions covers being a constituent of bone and teeth, regulating nerve impulses/neuromuscular excitability/muscle contraction, blood and milk clotting, activating enzymes such as lipase and phosphorylase, and regulating hormone secretion such as insulin — "coenzyme of a kinase" is not on that list

## id
CON-FND-0D6028AF6BB378

## canonical_key
calcium.physiological-functions-list

## aliases
Functions of calcium
Calcium physiological roles
Calcium enzyme cofactor

## arabic_label
وظائف الكالسيوم الفسيولوجية

## arabic_aliases
دور الكالسيوم في الجسم

## definition
The MED104 Biochemistry department book lists five physiological functions of calcium: it is a structural constituent of bone and teeth; it regulates nerve impulse transmission, neuromuscular excitability and muscle contraction; it is essential for blood and milk clotting; it is required for the activity of certain enzymes, named as lipase and phosphorylase; and it participates in the regulation and secretion of some hormones, named as insulin. Calcium acts in these enzyme and secretory roles as a cofactor/activator rather than as a coenzyme, and the department's own list does not name any kinase among calcium-dependent enzymes, so "coenzyme of a kinase" is not one of its taught functions even though calcium genuinely does modulate some kinases elsewhere in general physiology.

## explicit_objective
Name the department's five taught functions of calcium (bone/teeth constituent; nerve impulse and neuromuscular excitability and muscle contraction regulation; blood and milk clotting; activator of lipase and phosphorylase; regulation of hormone secretion e.g. insulin), and recognise that "coenzyme of a kinase" is not among them.

## pitfalls
Treating "calcium activates some kinases" (true in broader physiology, e.g. protein kinase C) as equivalent to the department's own taught list, which names lipase and phosphorylase, not a kinase, as calcium-dependent enzymes — an exam built on this specific list marks a kinase-coenzyme statement as the false one.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Mineral metabolism

## subtopic
Calcium homeostasis

## microtopic
Physiological functions of calcium

## nanotopic


## modules
MU-MED104

## module_subject
MU-MED104 > 00 Module-wide > 06 EOM Exams > MSK1 Endmodule 2018 > Biochemistry

## article_ids
ART-FND-MU104-CALCIUM-CALCITONIN

## related_article_ids


## related_concept_ids
CON-FND-253174586AB3B1

## resource_ids
src_57f44dcc809b58a1a81f

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.35

## exam_weight_by_year
MU_Y1=0.35

## clinical_relevance
0.4

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.75

## atomic_claim_ids
CLM-FND-CALCIUM-FUNCTIONS-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Regarding function of calcium one of these is incorrect: / is a coenzyme of kinase [the false statement, i.e. the correct answer]

## exam_signal
src_c4dfd4af7788e7831b4e | paper | | p3 | MU-MED104

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched "calcium function coenzyme kinase" and "calcium functions physiological role" against live state and every pending batch via find-existing.mjs — no existing record found.
mu: Tested as "02- MSK1 endmodule 2018 Group 2.pdf" Q16, "Regarding function of calcium one of these is incorrect:" (answer: "is a coenzyme of kinase"), red-text key p3.

---

# Item

## label
Vitamin D (calcitriol) raises plasma calcium and phosphate by three coordinated actions: increasing intestinal absorption (via calcium-binding protein), increasing renal tubular calcium reabsorption, and stimulating deposition of calcium and phosphate in bone and teeth (mineralization)

## id
CON-FND-50F3AA5639F2C1

## canonical_key
vitamind.bone-mineralization-action

## aliases
Vitamin D action on bone
Vitamin D bone mineralization
Vitamin D osteoblast stimulation
Calcitriol effect on bone remodeling

## arabic_label
تأثير فيتامين د على ترسيب المعادن في العظم

## arabic_aliases
دور فيتامين د في بناء العظم

## definition
Active vitamin D (1,25-dihydroxyvitamin D3, calcitriol) raises plasma calcium and phosphate through three coordinated target-organ actions taught together in the department's own biochemistry book: in the intestine it induces synthesis of a calcium-binding protein that increases intestinal absorption of calcium (with phosphate absorption following secondarily); in the kidney it increases calcium reabsorption from the renal tubule; and in bone it stimulates the deposition of calcium and phosphate into bone matrix, i.e. bone mineralization. This bone action is anabolic to mineralized bone formation — it supplies and drives the deposition of the mineral that osteoblasts lay down as new bone matrix mineralizes — which is the opposite emphasis to a hormone that instead promotes breakdown/resorption of existing bone to raise plasma calcium.

## explicit_objective
State that, in bone specifically, vitamin D's action is to stimulate deposition of calcium and phosphate (mineralization/osteoblastic bone formation), alongside its intestinal-absorption and renal-reabsorption actions, distinguishing this from a resorptive/osteoclast-stimulating action.

## pitfalls
Confusing vitamin D's bone action with parathyroid hormone's: PTH raises plasma calcium partly by mobilising (resorbing) calcium out of bone, while vitamin D's own bone action, as taught in the department book, is to stimulate deposition of calcium and phosphate into bone, i.e. mineralization — even though both hormones raise plasma calcium overall via their combined actions on gut, kidney and bone.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Mineral metabolism

## subtopic
Vitamin D actions on bone

## microtopic
Vitamin D and bone mineralization

## nanotopic


## modules
MU-MED104

## module_subject
MU-MED104 > 00 Module-wide > 06 EOM Exams > MSK1 Endmodule 2018 > Biochemistry

## article_ids
ART-FND-MU104-CALCIUM-CALCITONIN

## related_article_ids


## related_concept_ids
CON-FND-31131EDB3C9C2A

## resource_ids
src_57f44dcc809b58a1a81f

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.5

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.78

## atomic_claim_ids
CLM-FND-VITD-BONE-MINERALIZATION-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
In bone remodling, vitamin D, / stimulate osteoblasts

## exam_signal
src_c6bc4b9cefd870477236 | paper | | p4 | MU-MED104

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched "vitamin D osteoblast bone remodeling" against live state and every pending batch via find-existing.mjs — no existing record; distinct from the live/pending CON-FND-31131EDB3C9C2A (why vitamin D counts as a hormone, minted by lane 2 from the same department-book page), which is about hormone classification criteria, not this bone-specific mineralization action, so listed as related rather than merged.
mu: Tested as "01- MSK1 endmodule 2018 Group 1.pdf" Q17, "In bone remodling, vitamin D," (answer: "stimulate osteoblasts"), red-text key p4. The department book's own wording is "stimulates deposition of Ca2+ and phosphate in bone and teeth (help bone mineralization)" — osteoblasts are the mineral-depositing cells the exam's paraphrase names directly.

---

# Item

## label
Calcitonin lowers plasma calcium by inhibiting mobilization (resorption) of calcium from bone — the opposite bone action to parathyroid hormone

## id
CON-FND-AF3E4EC06FC7BD

## canonical_key
calcitonin.suppresses-bone-resorption

## aliases
Calcitonin action on bone
Calcitonin suppresses bone resorption
Calcitonin lowers plasma calcium

## arabic_label
الكالسيتونين يثبط ارتشاف العظم

## arabic_aliases
تأثير الكالسيتونين على مستوى الكالسيوم في الدم

## definition
Calcitonin is one of the three hormones (alongside parathyroid hormone and vitamin D) that the department book names as controlling plasma calcium. Its action is the reverse of parathyroid hormone's: by inhibiting the mobilization of calcium out of bone, i.e. suppressing bone resorption, calcitonin decreases plasma calcium level, whereas parathyroid hormone raises it by, among other actions, enhancing calcium mobilization from bone. Calcitonin's bone-resorption-suppressing action is therefore calcium-conserving for the skeleton and calcium-lowering for the plasma.

## explicit_objective
State that calcitonin decreases plasma calcium specifically by inhibiting (suppressing) mobilization of calcium from bone, i.e. suppressing bone resorption — the opposite bone action to parathyroid hormone.

## pitfalls
Assigning calcitonin a resorptive or calcium-releasing bone action by analogy with parathyroid hormone — the department book states the two hormones act oppositely on bone: PTH mobilises calcium out of bone to raise plasma calcium, while calcitonin inhibits that same mobilization to lower it.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Mineral metabolism

## subtopic
Hormonal control of plasma calcium

## microtopic
Calcitonin action on bone resorption

## nanotopic


## modules
MU-MED104

## module_subject
MU-MED104 > 00 Module-wide > 06 EOM Exams > MSK1 Endmodule 2018 > Biochemistry

## article_ids
ART-FND-MU104-CALCIUM-CALCITONIN

## related_article_ids


## related_concept_ids
CON-FND-50F3AA5639F2C1

## resource_ids
src_57f44dcc809b58a1a81f

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.5

## academic_relevance
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-FND-CALCITONIN-BONE-RESORPTION-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
In bone remodling, calcitonin, / suppress bone resorption

## exam_signal
src_c4dfd4af7788e7831b4e | paper | | p4 | MU-MED104

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched "calcitonin bone resorption" against live state and every pending batch via find-existing.mjs — no existing record found.
mu: Tested as "02- MSK1 endmodule 2018 Group 2.pdf" Q17, "In bone remodling, calcitonin," (answer: "suppress bone resorption"), red-text key p4.

---

# Item

## label
Marfan syndrome is an autosomal dominant disorder caused by mutations in the fibrillin-1 gene, the glycoprotein scaffold for elastin deposition, producing lens dislocation, tall stature with arachnodactyly and joint hyperextensibility, and aortic root dilation

## id
CON-FND-E7A460C7B4418B

## canonical_key
marfan.fibrillin-1-defect

## aliases
Marfan syndrome
Fibrillin-1 mutation
Fibrillin defect connective tissue

## arabic_label
متلازمة مارفان ونقص الفيبريللين

## arabic_aliases
طفرة جين الفيبريللين-1

## definition
Fibrillin is the structural glycoprotein component of microfibrils, secreted into the extracellular matrix by fibroblasts, where it provides the scaffold onto which elastin is deposited in big arteries, the periosteum and the suspensory ligament of the eye lens. Marfan syndrome is an autosomal dominant trait caused by mutations in the fibrillin-1 gene. Because fibrillin normally scaffolds elastin deposition in these specific tissues, its defect in Marfan syndrome produces a recognisable triad: ocular (lens dislocation, ectopia lentis), skeletal (tall stature, long digits/arachnodactyly, joint hyperextensibility) and cardiovascular (weakness of the aortic media leading to dilation of the ascending aorta) features.

## explicit_objective
State that Marfan syndrome is caused by a mutation in the fibrillin-1 gene (not collagen, elastin, laminin or fibronectin), and connect the defect to fibrillin's normal role as the microfibril scaffold for elastin deposition.

## pitfalls
Confusing Marfan syndrome's fibrillin-1 defect with the collagen defects of other connective-tissue disorders (e.g. Ehlers-Danlos) or with Menkes disease's copper/lysyl-oxidase cross-linking defect — fibrillin is a distinct structural glycoprotein, a scaffold for elastin deposition rather than a component or cross-linker of collagen or elastin itself.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Extracellular matrix proteins

## subtopic
Connective tissue disorders

## microtopic
Marfan syndrome (fibrillin-1)

## nanotopic


## modules
MU-MED104

## module_subject
MU-MED104 > 00 Module-wide > 06 EOM Exams > MSK1 Endmodule 2018 > Biochemistry

## article_ids
ART-FND-MU104-COLLAGEN-MINERAL-VITD

## related_article_ids


## related_concept_ids
CON-FND-C634004C7B9069

## resource_ids
src_57f44dcc809b58a1a81f

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.6

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.85

## atomic_claim_ids
CLM-FND-MARFAN-FIBRILLIN-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Marfan syndrome is caused by defect in: / fibrillin

## exam_signal
src_c6bc4b9cefd870477236 | paper | | p4 | MU-MED104

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched "marfan syndrome fibrillin" against live state and every pending batch via find-existing.mjs — no existing record found; same department-book page (p71) as CON-FND-31F96EC2F609C9's collagen/elastin table, so grouped into the same article family as related rather than merged (different gene/protein, different disease).
mu: Tested as "01- MSK1 endmodule 2018 Group 1.pdf" Q19, "Marfan syndrome is caused by defect in:" (answer: fibrillin), red-text key p4.

---

# Item

## label
Articular (hyaline) cartilage grows by interstitial growth — division of pre-existing chondrocytes and matrix synthesis from within — during early cartilage formation and at articular surfaces and epiphyseal plates, as opposed to appositional growth from the perichondrium

## id
CON-MSK-21B3B134059401

## canonical_key
cartilage.hyaline-interstitial-growth

## aliases
Interstitial growth cartilage
Hyaline cartilage growth
Articular cartilage growth
Appositional vs interstitial growth

## arabic_label
النمو الخلالي للغضروف الزجاجي

## arabic_aliases
نمو الغضروف المفصلي

## definition
Hyaline cartilage grows by two distinct processes. Interstitial growth results from division of pre-existing chondrocytes and synthesis of new matrix, expanding the cartilage from within; this type of growth occurs only during the early stages of cartilage formation, and specifically continues in articular cartilage and in the epiphyseal plates of long bones, both of which lack a perichondrium. Appositional growth, by contrast, results from differentiation of chondrogenic cells in the perichondrium into chondroblasts/new chondrocytes, which lay down a new layer of matrix on the cartilage surface and increase it in thickness. Because articular cartilage has no perichondrium covering its free (joint) surface, interstitial growth is the only mechanism available to it, which is why a question about articular cartilage's growth mode is specifically testing interstitial, not appositional, growth.

## explicit_objective
State that hyaline (articular) cartilage grows by interstitial growth — chondrocyte division and matrix synthesis from within — and distinguish this from appositional growth from the perichondrium, which articular cartilage lacks.

## pitfalls
Defaulting to "appositional growth" as the general answer for cartilage growth without noting that articular cartilage specifically has no perichondrium on its joint surface, so it can only grow interstitially — appositional growth applies to perichondrium-covered cartilage (e.g. during appositional thickening elsewhere), not to the articular surface itself.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id


## secondary_node_ids
SYS-MSK

## topic
Cartilage histology

## subtopic
Cartilage growth

## microtopic
Interstitial vs appositional growth of hyaline cartilage

## nanotopic


## modules
MU-MED104

## module_subject
MU-MED104 > 00 Module-wide > 06 EOM Exams > MSK1 Endmodule 2018 > Histology

## article_ids
ART-MSK-MU104-INGUINAL-CARTILAGE-BONE

## related_article_ids


## related_concept_ids
CON-MSK-0F4870E557FAF4

## resource_ids
src_28963e11df2847487705

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.4

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-MSK-CARTILAGE-INTERSTITIAL-GROWTH-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
An old aged female complains of pain in the knee joints. X-RAY reveals damage of articular cartilage. What is the type of cartilage in this joint & how does it grow: / hyaline cartilage & grows by interstitial growth

## exam_signal
src_c6bc4b9cefd870477236 | paper | | p4 | MU-MED104

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched "hyaline cartilage interstitial growth" against live state and every pending batch via find-existing.mjs — no existing record; the live/pending CON-MSK-0F4870E557FAF4 (elastic vs fibrocartilage, minted by lane 1's overlay) covers a different cartilage-type-identification fact, not growth mechanism, so listed as related rather than merged.
mu: Tested as "01- MSK1 endmodule 2018 Group 1.pdf" Q20, "...What is the type of cartilage in this joint & how does it grow:" (answer: hyaline cartilage & grows by interstitial growth), red-text key p4.

---

# Item

## label
Haversian systems (osteons), the structural units of compact bone, are concentric lamellae of osteocyte-containing lacunae organized around a central Haversian canal, which develops around and carries a blood vessel

## id
CON-MSK-59D70080410958

## canonical_key
bone.haversian-system-blood-vessel

## aliases
Haversian system
Osteon
Haversian canal blood vessel
Compact bone structural unit

## arabic_label
جملة هافرس (الأوستيون)

## arabic_aliases
قناة هافرس والأوعية الدموية

## definition
Haversian systems (osteons) are the structural units of compact bone: long cylindrical structures running parallel to the bone's longitudinal axis, each built of 4 to 20 concentric circular lamellae of osteocytes in their lacunae, connected by canaliculi, arranged around a central canal — the Haversian canal. The Haversian canal itself contains loose connective tissue rich in blood and lymphatic vessels and nerves, lined by osteogenic cells and osteoblasts, so the osteon develops and is organized around this central vascular supply rather than around a Volkmann's canal (which instead runs transversely/obliquely to connect adjacent Haversian canals to each other and to the periosteum and marrow cavity, carrying the same contents but not itself the axis the lamellae are built around).

## explicit_objective
State that a Haversian system (osteon) is built as concentric bone lamellae organized around a central Haversian canal that carries a blood vessel, and distinguish this from a Volkmann's canal, which connects Haversian systems but is not itself the structure the lamellae develop around.

## pitfalls
Naming a Volkmann's canal as what a Haversian system develops around — Volkmann's canals are the transverse/oblique connecting canals between Haversian systems (and to the periosteum/marrow), sharing the same vascular contents, but the osteon's own concentric lamellae are organized around its own central (Haversian) canal and its blood vessel, not around a Volkmann's canal.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id


## secondary_node_ids
SYS-MSK

## topic
Bone histology

## subtopic
Compact bone structure

## microtopic
Haversian system (osteon) and its central canal

## nanotopic


## modules
MU-MED104

## module_subject
MU-MED104 > 00 Module-wide > 06 EOM Exams > MSK1 Endmodule 2018 > Histology

## article_ids
ART-MSK-MU104-INGUINAL-CARTILAGE-BONE

## related_article_ids


## related_concept_ids


## resource_ids
src_28963e11df2847487705

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.4

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-MSK-HAVERSIAN-BLOOD-VESSEL-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Bone biopsy obtained at the autopsy of a 68-years-old man femur is examined by light microscopy. Which one of the following is a correct statement concerning Haversian systems (osteons)? / develop around a blood vessel

## exam_signal
src_c6bc4b9cefd870477236 | paper | | p5 | MU-MED104

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched "Haversian system osteon blood vessel" against live state and every pending batch via find-existing.mjs — no existing record found.
mu: Tested as "01- MSK1 endmodule 2018 Group 1.pdf" Q25, "...correct statement concerning Haversian systems (osteons)?" (answer: develop around a blood vessel), red-text key p5.

---

# Item

## label
A sarcomere, the contractile unit of skeletal muscle, is defined as the distance between two successive Z lines, spanning an entire A band plus half of the I band on each side

## id
CON-MSK-F7047BEABE5133

## canonical_key
muscle.sarcomere-z-line-distance

## aliases
Sarcomere definition
Distance between Z lines
Contractile unit of muscle

## arabic_label
تعريف الوحدة القلبية (الساركومير)

## arabic_aliases
المسافة بين خطي Z

## definition
The sarcomere is the functional contractile unit of the skeletal muscle fiber, defined as the distance between two successive Z lines. Each sarcomere includes the entire A band (the dark band formed by overlapping thick and thin filaments) plus half of the I band (the light band, bisected by the Z line) on either side of that A band. During contraction, as thin filaments slide further onto the thick filaments, the sarcomere shortens and its Z lines move closer together, while the A band's own length stays constant — which is why sarcomere length (the Z-to-Z distance), not A-band length, is the standard measure of how much a muscle fiber has shortened.

## explicit_objective
Define the sarcomere as the distance between two successive Z lines (one full A band plus a half I band on each side), not the distance between any other pair of striations (A bands, H zones, I bands or M lines).

## pitfalls
Defining the sarcomere as the distance between two A bands, H zones, I bands or M lines instead of Z lines — the Z line sits in the center of the I band and marks the sarcomere's own boundary, so "successive Z lines" is the only pair of landmarks whose distance equals one full sarcomere.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id


## secondary_node_ids
SYS-MSK

## topic
Skeletal muscle physiology

## subtopic
Sarcomere structure

## microtopic
Definition of the sarcomere

## nanotopic


## modules
MU-MED104

## module_subject
MU-MED104 > 00 Module-wide > 06 EOM Exams > MSK1 Endmodule 2018 > Physiology

## article_ids
ART-MSK-MU104-SARCOMERE-RIGORMORTIS

## related_article_ids


## related_concept_ids
CON-MSK-3111C167F86F7B

## resource_ids
src_c021a40ea9f6f8937c6d

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.85

## atomic_claim_ids
CLM-MSK-SARCOMERE-Z-LINE-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
The sarcomere is the distance between two successive: / Z lines

## exam_signal
src_c4dfd4af7788e7831b4e | paper | | p4 | MU-MED104

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched "sarcomere Z line" against live state and every pending batch via find-existing.mjs — no existing record found.
mu: Tested as "02- MSK1 endmodule 2018 Group 2.pdf" Q25, "The sarcomere is the distance between two successive:" (answer: Z lines), red-text key p5 (rendered to resolve an automated-tool ambiguity on this page — see coverage/MU-MED104-triage-keys.txt).

---

# Item

## label
Smooth muscle has no T tubules; instead, subsarcolemmal caveolae (sarcolemmal invaginations) serve the equivalent role of conducting the contraction impulse and, alongside the poorly developed sarcoplasmic reticulum, regulating calcium flow

## id
CON-MSK-3111C167F86F7B

## canonical_key
smoothmuscle.caveolae-t-tubule-equivalent

## aliases
Caveolae smooth muscle
T tubules absent smooth muscle
Subsarcolemmal caveolae

## arabic_label
التجاويف الكهفية في العضلة الملساء

## arabic_aliases
بديل الأنيبيبات المستعرضة في العضلة الملساء

## definition
Unlike skeletal muscle, smooth muscle has no T-tubule system — the department's histology book states this explicitly. In their place, the smooth muscle cell's sarcolemma shows numerous vesicular invaginations called caveolae (subsarcolemmal caveoli), clustered just beneath the plasma membrane. These caveolae are taught as functionally replacing T tubules: they conduct the contraction impulse into the cell interior the way T tubules do in striated muscle, and — together with the smooth muscle cell's own poorly developed sarcoplasmic reticulum — they help regulate cytoplasmic calcium flow, which in smooth muscle is drawn 90% from the extracellular fluid and only about 10% from the SR.

## explicit_objective
State that smooth muscle lacks T tubules and that caveolae are its taught functional and structural equivalent, conducting the contraction impulse and helping regulate calcium alongside the poorly developed sarcoplasmic reticulum.

## pitfalls
Naming dense bodies, attachment plaques, desmin or gap junctions as the T-tubule equivalent — dense bodies and attachment plaques anchor actin filaments (replacing the Z line's anchoring role, not the T tubule's impulse-conducting role), desmin is a cytoskeletal intermediate filament protein, and gap junctions electrically couple adjacent cells rather than conducting the impulse into a single cell's interior; caveolae specifically are the structure the histology book names as functioning like T tubules.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id


## secondary_node_ids
SYS-MSK

## topic
Smooth muscle histology

## subtopic
Smooth muscle ultrastructure

## microtopic
Caveolae as the T-tubule equivalent

## nanotopic


## modules
MU-MED104

## module_subject
MU-MED104 > 00 Module-wide > 06 EOM Exams > MSK1 Endmodule 2018 > Histology

## article_ids
ART-MSK-MU104-SARCOMERE-RIGORMORTIS

## related_article_ids


## related_concept_ids
CON-MSK-A10AC6BAF27F00
CON-MSK-F7047BEABE5133

## resource_ids
src_28963e11df2847487705

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.35

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-MSK-CAVEOLAE-T-TUBULE-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
In smooth muscle cells, which of the following represents T-tubules? / Caveolae

## exam_signal
src_c4dfd4af7788e7831b4e | paper | | p4 | MU-MED104

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched "smooth muscle caveolae T-tubule" against live state and every pending batch via find-existing.mjs — no existing record; distinct from the live/pending CON-MSK-A10AC6BAF27F00 (smooth muscle action-potential electrophysiology, minted by lane 1's overlay), which is about depolarization type not ultrastructure, so listed as related rather than merged.
mu: Tested as "02- MSK1 endmodule 2018 Group 2.pdf" Q26, "In smooth muscle cells, which of the following represents T-tubules?" (answer: Caveolae), red-text key p5 (rendered to resolve an automated-tool ambiguity on this page — see coverage/MU-MED104-triage-keys.txt).

---

# Item

## label
Rigor mortis is the postmortem stiffening of muscle caused by ATP depletion: without ATP, myosin cross bridges that have attached to actin cannot detach, so they remain permanently bound and the muscle becomes rigid

## id
CON-MSK-9E796550525422

## canonical_key
muscle.rigor-mortis-atp-crossbridge

## aliases
Rigor mortis mechanism
ATP cross bridge detachment
Postmortem muscle stiffening

## arabic_label
آلية التيبس الرمي (تيبس ما بعد الموت)

## arabic_aliases
نفاد الـATP وتيبس العضلات

## definition
Rigor mortis is the stiffening of the joints and muscles that occurs after death, caused by depletion of ATP. ATP normally supplies the energy for the power stroke of contraction and is also required to break the actin-myosin cross bridge so the head can release and reset for another cycle; it is this second, detachment role that fails in rigor mortis. Once ATP is exhausted after death, the calcium pumps also stop functioning, so cytoplasmic calcium remains elevated and the actin binding sites stay exposed; the myosin cross bridges that attach to these exposed sites can no longer detach for lack of ATP, and this large-scale, unresolved binding of myosin to actin is what makes the body rigid. The muscle remains in rigor until the muscle proteins themselves begin to deteriorate (autolysis/putrefaction breaks the bound cross bridges down), which is why rigor mortis eventually resolves without any new ATP being made.

## explicit_objective
State that rigor mortis is caused by ATP depletion preventing the detachment of already-formed actin-myosin cross bridges (not by a failure to form cross bridges, and not by ATP continuing to be made after death), leaving the muscle permanently cross-bridged and rigid.

## pitfalls
Reversing the mechanism — saying ATP is needed for cross-bridge formation rather than detachment, or that ATP continues to be formed after death — rigor mortis specifically results from cross bridges that have already formed becoming unable to detach because no further ATP is being made, not from a failure to form them in the first place.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id


## secondary_node_ids
SYS-MSK

## topic
Skeletal muscle physiology

## subtopic
Muscle contraction and relaxation biochemistry

## microtopic
Rigor mortis mechanism

## nanotopic


## modules
MU-MED104

## module_subject
MU-MED104 > 00 Module-wide > 06 EOM Exams > MSK1 Endmodule 2018 > Physiology

## article_ids
ART-MSK-MU104-SARCOMERE-RIGORMORTIS

## related_article_ids


## related_concept_ids
CON-MSK-F7047BEABE5133

## resource_ids
src_c021a40ea9f6f8937c6d

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.45

## academic_relevance
0.7

## weight_confidence
0.3

## confidence
0.85

## atomic_claim_ids
CLM-MSK-RIGOR-MORTIS-CROSSBRIDGE-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
A cadaver discovered two days after death showing Rigor Mortis Signs in the form of Stiffening of the joints and muscles. What is the cause of the stifness? / Increased cross-bridge duration [Group 1] · ATP, which is necessary for the detachment of cross bridges, is not being formed [Group 2]

## exam_signal
src_c6bc4b9cefd870477236 | paper | | p6 | MU-MED104

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched "rigor mortis cross bridge ATP" against live state and every pending batch via find-existing.mjs — no existing record found.
mu: Tested twice — "01- MSK1 endmodule 2018 Group 1.pdf" Q30, "...What is the cause of the stifness?" (answer: Increased cross-bridge duration), red-text key p6; "02- MSK1 endmodule 2018 Group 2.pdf" Q30, same stem (answer: "ATP, which is necessary for the detachment of cross bridges, is not being formed"), red-text key p5 (rendered to resolve an automated-tool ambiguity on this page — see coverage/MU-MED104-triage-keys.txt). Same mechanism, two option-wordings, one concept, two questions.
