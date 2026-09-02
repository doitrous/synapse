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
