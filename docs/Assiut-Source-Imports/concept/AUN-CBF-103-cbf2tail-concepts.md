<!--
  AUN-CBF-103 -- new concepts minted from "All quizzes CBF .pdf" (lane 5,
  branch lane/aun-cbf103-l5), the OCR'd pp.150-210 authoring batch (dispatch
  scope: pp.150-210, the window lane 4 left already OCR'd; see
  coverage/AUN-CBF-103-triage.md "S3 lane 5 addendum"). Every canonical_key
  below was confirmed NEW by find-existing.mjs plus a broad grep across every
  docs/*-Source-Imports root and docs/import-ready before minting -- search
  terms recorded in the triage addendum's "Concept search notes (lane 5)".
  This source is a Moodle attempt-review export (no accompanying department
  lecture deck); teaching text is drawn from the bank's own stems and printed
  "The correct answer is:" keys, cross-checked against standard undergraduate
  biochemistry and physiology teaching, and cited to src_f7e45bae9ce161e08d46
  (evidence/AUN-CBF-103-allquizzes-resources.md).

  Import: Admin > Concepts import.
-->

# Item

## id
CON-FND-09CF1802363F0D

## label
De novo fatty acid synthesis (lipogenesis) runs in the cytosol on the fatty acid synthase complex, adding two carbons per cycle and spending NADPH supplied mainly by the pentose phosphate (HMP) pathway

## canonical_key
lipogenesis.fatty-acid-synthase.cytosol-two-carbon-nadph

## aliases
Fatty acid synthase
De novo lipogenesis
NADPH for fatty acid synthesis
Palmitate synthesis

## arabic_label
تخليق الأحماض الدهنية في السيتوبلازم بإنزيم fatty acid synthase

## arabic_aliases
تخليق الأحماض الدهنية
مركب سينثاز الأحماض الدهنية

## definition
De novo fatty acid synthesis (lipogenesis) is the pathway that builds a long-chain fatty acid, chiefly palmitate, from acetyl-CoA. It takes place in the cytosol, not the mitochondrion: acetyl-CoA generated in the mitochondrion is exported to the cytosol as citrate, cleaved back to acetyl-CoA there, and then committed to synthesis by acetyl-CoA carboxylase, which makes malonyl-CoA. The actual chain assembly is carried out by the multienzyme fatty acid synthase complex, which lengthens the growing fatty acyl chain by two carbons at a time in each cycle, using malonyl-CoA as the two-carbon donor and losing one carbon as CO2 per addition. Each elongation cycle consumes reducing power in the form of NADPH, and the NADPH is supplied mainly by the pentose phosphate (hexose monophosphate) pathway, whose first and rate-limiting enzyme is glucose 6-phosphate dehydrogenase; the malic enzyme reaction contributes a smaller share. Synthesis therefore has a characteristic set of requirements distinct from fatty acid oxidation: a cytosolic location, a two-carbon growth increment, and NADPH rather than NAD+/FAD as the electron carrier.

## explicit_objective
State that lipogenesis is cytosolic, that fatty acid synthase elongates the chain two carbons per cycle, and that the required NADPH comes mainly from the pentose phosphate pathway via glucose 6-phosphate dehydrogenase.

## pitfalls
Placing fatty acid synthesis in the mitochondria (that is where oxidation occurs, and where the acetyl-CoA starts before it is exported as citrate), thinking the chain grows one carbon at a time, or naming an oxidative enzyme (pyruvate dehydrogenase, acetyl-CoA carboxylase) instead of glucose 6-phosphate dehydrogenase as the source of NADPH.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Lipid Metabolism

## subtopic
Fatty acid synthesis

## microtopic

## nanotopic

## modules
AUN-CBF-103

## article_ids
ART-FND-AUN-CBF103-CBF2TAIL-LIPOGENESIS

## related_article_ids

## related_concept_ids
CON-FND-2F3A652B8E3104
CON-FND-FCFC1B5A95695E

## resource_ids
src_f7e45bae9ce161e08d46

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.3

## exam_weight_by_year
AUN_Y1=0.3

## clinical_relevance
0.3

## academic_relevance
0.7

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The correct answer is: The fatty acyl chain on the fatty acid synthase complex is elongated two carbons at a time" (Quiz40 Q1, p155); "The correct answer is: Glucose 6 P dehydrogenase" (Quiz40 Q3, p157); "The correct answer is: Cytosol" (Quiz40 Q4, p158).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
None beyond standard undergraduate teaching level.

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
sourceCandidateIds: find-existing.mjs "fatty acid synthase", "de novo fatty acid synthesis cytosol", "pentose phosphate NADPH lipogenesis" -- 0 hits; broad grep across docs/*-Source-Imports/concept and docs/import-ready surfaced only the reused Kasr acetyl-CoA-carboxylase (CON-FND-2F3A652B8E3104) and citrate-shuttle (CON-FND-FCFC1B5A95695E) records, neither of which states the fatty-acid-synthase two-carbon mechanism, the cytosolic location, or the pentose-phosphate NADPH source this block tests -- safe to create.
relationships: companion to the reused Kasr lipogenesis concepts CON-FND-2F3A652B8E3104 (acetyl-CoA carboxylase, the committed step) and CON-FND-FCFC1B5A95695E (citrate shuttle) -- this record is the fatty-acid-synthase / NADPH-source half those two records assume.

---

# Item

## id
CON-NEU-F612BCFCBE54C7

## label
A few organs receive only one autonomic division -- the skin, sweat glands, arrector pili and most blood vessels have sympathetic supply only, while a few glands such as the lacrimal gland are dominated by parasympathetic supply -- whereas most viscera get both

## canonical_key
autonomic.innervation.single-versus-dual-supply-organs

## aliases
Organs with sympathetic supply only
Single autonomic supply
Dual autonomic innervation
Sympathetic-only organs

## arabic_label
الأعضاء ذات الإمداد اللاإرادي المفرد مقابل المزدوج

## arabic_aliases
الإمداد السمبثاوي المفرد
الأعضاء ذات الإمداد المزدوج

## definition
Most visceral organs receive a dual autonomic supply -- both a sympathetic and a parasympathetic input that usually act on the organ in opposite directions. A small but exam-favourite set of structures, however, are supplied by only one division. The skin and its appendages -- the sweat glands, the arrector pili muscles that raise hairs, and the great majority of cutaneous and skeletal-muscle blood vessels -- receive a sympathetic supply only, with no parasympathetic input; this is why the answer to "which organ is innervated exclusively by the sympathetic division" is the skin, and why cutting the sympathetic nerve to the skin abolishes sweating (the sweat glands, although supplied by sympathetic fibres, use acetylcholine as their transmitter). The adrenal medulla is another sympathetic-only structure, innervated directly by preganglionic sympathetic fibres. On the parasympathetic side, glands such as the lacrimal gland are functionally dominated by the parasympathetic secretomotor supply, which is why it is the answer to the mirror-image "which organ is innervated by the parasympathetic division" question in this bank. Recognising which structures escape the usual dual pattern is the point being tested.

## explicit_objective
Identify the structures with a single autonomic supply -- skin, sweat glands, arrector pili, most blood vessels and the adrenal medulla as sympathetic-only, and secretomotor glands such as the lacrimal gland as parasympathetic-dominated -- against the dual supply of most viscera.

## pitfalls
Assuming every organ has both a sympathetic and a parasympathetic supply; forgetting that the skin, sweat glands and blood vessels have no parasympathetic input; or overlooking that sweat glands, though sympathetic, are cholinergic, so cutting their sympathetic nerve stops (not increases) sweating.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
neuro

## primary_node_id

## secondary_node_ids

## topic
Autonomic Nervous System

## subtopic
Autonomic innervation of organs

## microtopic

## nanotopic

## modules
AUN-CBF-103

## article_ids
ART-FND-AUN-CBF103-CBF2TAIL-AUTONOMIC-SUPPLY

## related_article_ids

## related_concept_ids
CON-NEU-1DB903AAE3D02A
CON-NEU-C3D7B209FB3260

## resource_ids
src_f7e45bae9ce161e08d46

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.3

## exam_weight_by_year
AUN_Y1=0.3

## clinical_relevance
0.4

## academic_relevance
0.6

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The correct answer is: Skin" (Quiz45&46 Q1, p160); "The correct answer is: Lacrimal gland" (Quiz45&46 Q3, p162).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
Which single gland the department counts as the archetypal parasympathetic-only organ can vary between texts; the printed key names the lacrimal gland, followed here.

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
sourceCandidateIds: find-existing.mjs "organs sympathetic supply only", "single autonomic supply skin", "adrenal medulla sympathetic innervation" -- 0 hits; broad grep across docs/*-Source-Imports/concept surfaced the reused Kasr ANS bundle (cholinergic/adrenergic fibres CON-NEU-1DB903AAE3D02A, parasympathetic thoracic viscera CON-NEU-C3D7B209FB3260, nicotinic/muscarinic locations CON-NEU-5B28B080597460) but none stating which organs receive a single division only -- safe to create.
relationships: companion to the reused Kasr ANS concepts; this record is the "which organs have one supply vs two" fact that the transmitter-based and regional-effect records do not state.

---

# Item

## id
CON-FND-004F18D507CB45

## label
Choline is a building block of acetylcholine and of the choline-containing phospholipids (lecithin, sphingomyelin and plasmalogens), but it is not a precursor of the prostaglandins, which are made from arachidonic acid

## canonical_key
choline.derivatives.acetylcholine-phospholipids-not-prostaglandins

## aliases
Choline functions
Choline derivatives
Choline-containing phospholipids

## arabic_label
مشتقات الكولين ووظائفه

## arabic_aliases
الفوسفوليبيدات المحتوية على الكولين
الأسيتيل كولين

## definition
Choline is a small nitrogenous compound (a quaternary amine, itself made by transmethylation of ethanolamine using S-adenosylmethionine) that serves as a building block for several important molecules. It is esterified with acetate to form acetylcholine, the neurotransmitter of the whole parasympathetic system and of the neuromuscular junction. It is incorporated into the choline-containing membrane phospholipids: phosphatidylcholine (lecithin), sphingomyelin, and the choline plasmalogens. What choline is NOT is a precursor of the prostaglandins and other eicosanoids: these twenty-carbon signalling lipids are synthesised from arachidonic acid (a polyunsaturated fatty acid released from membrane phospholipids), not from choline. So in a question that lists the products choline enters into and asks for the exception, prostaglandins is the correct exclusion, because they belong to the arachidonic-acid pathway rather than the choline pathway.

## explicit_objective
List the molecules built from choline -- acetylcholine and the choline phospholipids lecithin, sphingomyelin and plasmalogens -- and recognise that prostaglandins are an exception because they are made from arachidonic acid.

## pitfalls
Assuming that because choline sits in membrane phospholipids it must also feed the eicosanoid pathway; the prostaglandins come specifically from arachidonic acid, so choline is not their precursor.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Lipid Metabolism

## subtopic
Choline and phospholipids

## microtopic

## nanotopic

## modules
AUN-CBF-103

## article_ids
ART-FND-AUN-CBF103-CBF2TAIL-CHOLINE

## related_article_ids

## related_concept_ids
CON-FND-3622E11F05032C
CON-FND-90496D64322904

## resource_ids
src_f7e45bae9ce161e08d46

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.3

## exam_weight_by_year
AUN_Y1=0.3

## clinical_relevance
0.3

## academic_relevance
0.7

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The correct answer is: Prostaglandins" (Quiz47 Q4, "Choline enters in the synthesis of all the following, except", p178).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
None beyond standard undergraduate teaching level.

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
sourceCandidateIds: find-existing.mjs "choline acetylcholine phospholipids", "choline plasmalogens sphingomyelin", "choline derivatives" -- 0 hits; broad grep surfaced the reused SAM-transmethylation concept (CON-FND-3622E11F05032C, which makes choline) and the eicosanoid concept (CON-FND-90496D64322904, prostaglandins from arachidonic acid) but neither states choline's own set of derivatives -- safe to create.
relationships: downstream of CON-FND-3622E11F05032C (SAM makes choline) and complementary to CON-FND-90496D64322904 (the arachidonic-acid origin of the prostaglandins that are the exception here).

---

# Item

## id
CON-FND-8850A66300EBBE

## label
Antimetabolite chemotherapy starves dividing cells of nucleotides: folate antagonists such as methotrexate block dihydrofolate reductase, and nucleotide/base analogues are used as anticancer (and antiviral) drugs

## canonical_key
chemotherapy.antimetabolites.dhfr-inhibitors-and-nucleotide-analogues

## aliases
Methotrexate
Dihydrofolate reductase inhibitor
Nucleotide analogues
Folate antagonists
Antimetabolites

## arabic_label
مضادات الأيض في علاج الأورام ومثبطات dihydrofolate reductase

## arabic_aliases
ميثوتريكسات
نظائر النيوكليوتيدات

## definition
Antimetabolites are drugs that resemble a normal metabolite closely enough to jam the pathway that would use it, and in cancer chemotherapy the target is nucleotide (DNA/RNA precursor) synthesis, because rapidly dividing cells need a steady supply of deoxyribonucleotides. Folate antagonists are one major class: methotrexate is a structural analogue of folate that competitively and potently inhibits dihydrofolate reductase, the enzyme that regenerates tetrahydrofolate. Blocking it collapses the one-carbon-carrying tetrahydrofolate pool needed for thymidylate and purine synthesis, so the dividing cell cannot make DNA. A second, overlapping class is the nucleotide and base analogues (for example fluorouracil, mercaptopurine and cytarabine, and the antiviral acyclovir): synthetic analogues of the normal purine and pyrimidine building blocks that are used to treat cancer and viral infection by being mistaken for the real nucleotide and derailing nucleic-acid synthesis. The unifying idea tested here is that interfering with nucleotide supply -- whether by inhibiting dihydrofolate reductase or by feeding in a fraudulent nucleotide analogue -- selectively harms the fastest-dividing cells.

## explicit_objective
State that methotrexate is a folate analogue that inhibits dihydrofolate reductase to starve dividing cells of nucleotides, and that synthetic nucleotide/base analogues are used as anticancer and antiviral drugs.

## pitfalls
Confusing methotrexate's target (dihydrofolate reductase) with thymidylate synthase (the target of fluorouracil) or ribonucleotide reductase; or assuming nucleotide analogues treat metabolic diseases such as diabetes rather than cancer and viral infection.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Nucleotide Metabolism

## subtopic
Antimetabolite drugs

## microtopic

## nanotopic

## modules
AUN-CBF-103

## article_ids
ART-FND-AUN-CBF103-CBF2TAIL-ANTIMETABOLITES

## related_article_ids

## related_concept_ids
CON-FND-DB8B4EFEB287DA

## resource_ids
src_f7e45bae9ce161e08d46

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.3

## exam_weight_by_year
AUN_Y1=0.3

## clinical_relevance
0.6

## academic_relevance
0.4

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The correct answer is: Dihydrofolate reductase" (Quiz51 Q2, methotrexate, p191); "The correct answer is: Cancer" (Quiz52 Q1, synthetic analogs of nucleotides, p197).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
None beyond standard undergraduate teaching level.

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
sourceCandidateIds: find-existing.mjs "dihydrofolate reductase methotrexate", "nucleotide analogue anticancer", "folate antagonist" -- 0 hits across docs/*-Source-Imports/concept and docs/import-ready; the pending Kasr purine file has salvage/gout/regulation concepts but no antimetabolite-drug record -- safe to create.
relationships: complements the reused purine-salvage concept CON-FND-DB8B4EFEB287DA (the nucleotide-supply pathways these drugs attack).

---

# Item

## id
CON-FND-A09ADB03E77557

## label
Pyrimidine synthesis builds the ring first (from carbamoyl phosphate + aspartate) then attaches ribose; a UMP synthase defect causes hereditary orotic aciduria, treated with uridine

## canonical_key
pyrimidine.synthesis.carbamoyl-phosphate-and-orotic-aciduria

## aliases
Pyrimidine biosynthesis
Orotic aciduria
UMP synthase deficiency
Carbamoyl phosphate pyrimidine

## arabic_label
تخليق البيريميدين وبيلة الحمض الأوروتيكي الوراثية

## arabic_aliases
بيلة الحمض الأوروتيكي
تخليق حلقة البيريميدين

## definition
Pyrimidine nucleotides are built in the opposite order to purines: the pyrimidine ring is assembled first as a free base and only then attached to ribose-5-phosphate. Ring assembly begins with carbamoyl phosphate (made in the cytosol by carbamoyl phosphate synthetase II) condensing with aspartate, and proceeds through orotic acid to orotidine monophosphate and then uridine monophosphate (UMP), the parent pyrimidine nucleotide. Several precursors are shared with purine synthesis -- PRPP (5-phosphoribosyl-1-pyrophosphate), aspartate, glutamine and tetrahydrofolate one-carbon units are used in both pathways -- but carbamoyl phosphate is characteristic of pyrimidine synthesis and is the one item on a shared-precursor list that does not also feed purine ring assembly. A block in UMP synthase (the bifunctional enzyme catalysing the last two steps) causes hereditary orotic aciduria: orotic acid accumulates and is excreted in the urine, and because the child cannot make its own pyrimidines it develops a megaloblastic anaemia and failure to thrive that are corrected by giving uridine, which bypasses the block and refills the pyrimidine pool.

## explicit_objective
Describe pyrimidine synthesis as ring-first from carbamoyl phosphate and aspartate, name carbamoyl phosphate as the precursor NOT shared with purine synthesis, and identify UMP synthase deficiency as orotic aciduria treated with uridine.

## pitfalls
Treating carbamoyl phosphate as a shared purine/pyrimidine precursor (PRPP, aspartate, glutamine and tetrahydrofolate are shared; carbamoyl phosphate is pyrimidine-specific); or giving a purine base rather than uridine to treat orotic aciduria.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Nucleotide Metabolism

## subtopic
Pyrimidine synthesis

## microtopic

## nanotopic

## modules
AUN-CBF-103

## article_ids
ART-FND-AUN-CBF103-CBF2TAIL-PYRIMIDINE

## related_article_ids

## related_concept_ids
CON-FND-265D369FD41B85
CON-FND-DB8B4EFEB287DA

## resource_ids
src_f7e45bae9ce161e08d46

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.3

## exam_weight_by_year
AUN_Y1=0.3

## clinical_relevance
0.5

## academic_relevance
0.5

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The correct answer is: Uridine" (Quiz51 Q5, elevated orotic acid, low UMP synthase, p194); "The correct answer is: Carbamoyle phosphate" (Quiz51 Q6, used in both purine and pyrimidine biosynthesis except, p195).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
None beyond standard undergraduate teaching level.

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
sourceCandidateIds: find-existing.mjs "orotic aciduria UMP synthase", "pyrimidine synthesis carbamoyl phosphate", "carbamoyl phosphate synthetase II" -- 0 hits; the pending Kasr purine file (CON-FND-265D369FD41B85 purine nitrogen donors, CON-FND-DB8B4EFEB287DA salvage) covers purine synthesis only, not the pyrimidine ring or orotic aciduria -- safe to create.
relationships: complements the reused purine concepts CON-FND-265D369FD41B85 (shared precursors) and CON-FND-DB8B4EFEB287DA (salvage) -- this record is the pyrimidine-side counterpart.

---

# Item

## id
CON-FND-FD5287EA2BD39B

## label
Mitochondrial DNA is maternally inherited and gives a non-Mendelian pattern; its mutations damage the respiratory-chain enzymes it encodes, but nuclear-gene disorders such as sickle cell anaemia are not among them

## canonical_key
mitochondrial-dna.maternal-inheritance.respiratory-chain-mutations

## aliases
Mitochondrial DNA
Maternal inheritance
Non-Mendelian inheritance
mtDNA mutations

## arabic_label
الحمض النووي الميتوكوندري والوراثة الأمومية

## arabic_aliases
الوراثة الأمومية
طفرات الحمض النووي الميتوكوندري

## definition
Mitochondria carry their own small circular DNA (mtDNA), separate from the nuclear genome. Because the fertilised egg's mitochondria come almost entirely from the ovum, mtDNA is inherited from the mother, and mitochondrial diseases therefore show a maternal, non-Mendelian pattern of inheritance: an affected mother can transmit the disorder to all her children, but an affected father does not pass it on. Mitochondrial DNA encodes a subset of the subunits of the respiratory-chain (oxidative phosphorylation) complexes -- notably components of Complexes I, III, IV and V -- so mtDNA mutations characteristically damage these enzymes and hit tissues with high energy demand (nerve, muscle, retina). A disorder caused by a nuclear-gene mutation with ordinary Mendelian inheritance -- sickle cell anaemia, a point mutation in the beta-globin gene -- is therefore NOT a consequence of mitochondrial DNA mutation, and it is the correct exclusion when a list of mtDNA-related features is given.

## explicit_objective
State that mitochondrial DNA is maternally (non-Mendelianly) inherited and that its mutations impair the respiratory-chain enzymes it encodes, distinguishing them from nuclear-gene Mendelian disorders such as sickle cell anaemia.

## pitfalls
Attributing a nuclear-gene disorder (sickle cell anaemia) to mitochondrial DNA; or expecting a Mendelian (paternal-transmissible) pattern rather than the maternal, non-Mendelian pattern of mitochondrial inheritance.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Molecular Biology

## subtopic
Mitochondrial DNA

## microtopic

## nanotopic

## modules
AUN-CBF-103

## article_ids
ART-FND-AUN-CBF103-CBF2TAIL-MTDNA

## related_article_ids

## related_concept_ids

## resource_ids
src_f7e45bae9ce161e08d46

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.3

## exam_weight_by_year
AUN_Y1=0.3

## clinical_relevance
0.5

## academic_relevance
0.5

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The correct answer is: Sickle cell anemia" (Quiz52 Q2, mutations in mitochondrial DNA results in all of the following except, p198).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
None beyond standard undergraduate teaching level.

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
sourceCandidateIds: find-existing.mjs "mitochondrial DNA maternal inheritance", "non-Mendelian inheritance", "mtDNA respiratory chain mutation" -- 0 hits across docs/*-Source-Imports/concept and docs/import-ready -- safe to create.

---

# Item

## id
CON-FND-4BB9601CAC6042

## label
DNA replication begins with unwinding the helix, needs an RNA primer laid down before DNA synthesis (because DNA polymerase can only extend an existing 3' end), and in eukaryotes is carried out mainly by DNA polymerase delta

## canonical_key
replication.initiation.unwinding-rna-primer-pol-delta

## aliases
DNA replication initiation
RNA primer
Unwinding proteins helicase
DNA polymerase delta

## arabic_label
بدء تضاعف الحمض النووي والحاجة إلى البادئ الرايبوزي

## arabic_aliases
البادئ الرايبوزي
إنزيم بوليميراز دلتا

## definition
DNA replication proceeds through an ordered set of steps. The first step is to open the double helix: unwinding proteins (helicase, aided by single-strand binding proteins and, ahead of the fork, topoisomerase) separate the two parental strands so they can serve as templates. DNA polymerase cannot start a new chain from nothing -- it can only add nucleotides to the free 3'-hydroxyl end of an already existing strand -- so a short RNA primer must be synthesised first by primase; this is why "formation of the RNA primer precedes replication" and why an RNA primer is necessary at all (its purpose is to provide the 3' end that DNA polymerase then extends). In eukaryotes the bulk of new DNA on both leading and lagging strands is synthesised by DNA polymerase delta (with polymerase epsilon and the primer-laying polymerase alpha also involved), distinct from the bacterial replicative enzyme DNA polymerase III. Once synthesis is complete the RNA primers are removed and replaced with DNA and the fragments are sealed. The three ideas the bank tests are: unwinding is the first step, the RNA primer must come before DNA synthesis because polymerase needs an existing 3' end, and eukaryotic replication is a polymerase-delta job.

## explicit_objective
State that replication starts with unwinding, that an RNA primer is laid down before DNA synthesis because DNA polymerase can only extend an existing 3' end, and that DNA polymerase delta is the main eukaryotic replicative enzyme.

## pitfalls
Thinking DNA polymerase can initiate a strand de novo (it cannot -- it only extends a 3' end, which is why a primer is needed); naming ligase or a bacterial polymerase (DNA polymerase III) as the eukaryotic replicative enzyme; or placing primer formation after, rather than before, DNA synthesis.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Molecular Biology

## subtopic
DNA replication

## microtopic

## nanotopic

## modules
AUN-CBF-103

## article_ids
ART-FND-AUN-CBF103-CBF2TAIL-REPLICATION

## related_article_ids

## related_concept_ids
CON-FND-252B3C77D181DA
CON-FND-FFEE58EC9C0784

## resource_ids
src_f7e45bae9ce161e08d46

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.3

## exam_weight_by_year
AUN_Y1=0.3

## clinical_relevance
0.2

## academic_relevance
0.8

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The correct answer is: Unwinding proteins" (Quiz53 Q1, p201); "The correct answer is: Precedes replication" (Quiz53 Q4, RNA primer, p204); "The correct answer is: DNA polymerase 6 [delta]" (Quiz53 Q7, p207); "The correct answer is: DNA polymerase can only add nucleotides to an existing strand" (Quiz53 Q8, p208).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
None beyond standard undergraduate teaching level.

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
sourceCandidateIds: find-existing.mjs "DNA replication unwinding first step", "RNA primer DNA polymerase 3 prime end", "DNA polymerase delta eukaryotic replication" -- 0 hits; the Alexandria molecular file has DNA-ligase/Okazaki (CON-FND-252B3C77D181DA), topoisomerase (CON-FND-FFEE58EC9C0784), semiconservative and primosome records but none stating the unwinding-first / primer-necessity / polymerase-delta trio this quiz tests -- safe to create.
relationships: companion to the reused Alexandria molecular concepts CON-FND-252B3C77D181DA (ligase seals Okazaki fragments) and CON-FND-FFEE58EC9C0784 (topoisomerase relieves supercoiling) -- this record is the initiation/priming/eukaryotic-polymerase half of the same replication story.

---

# Item

## id
CON-FND-3F1E41E8CB067D

## label
RNA is more susceptible than DNA to alkaline hydrolysis because the ribose 2'-hydroxyl group, absent in DNA's deoxyribose, attacks the neighbouring phosphodiester bond

## canonical_key
rna.ribose-2-hydroxyl.alkaline-hydrolysis-lability

## aliases
RNA alkaline hydrolysis
Ribose 2' hydroxyl
RNA versus DNA stability
2'-OH lability

## arabic_label
حساسية الحمض النووي الريبوزي للتحلل القلوي بسبب مجموعة 2'-OH

## arabic_aliases
التحلل القلوي للـ RNA
مجموعة الهيدروكسيل 2

## definition
A key chemical difference between RNA and DNA is the sugar: RNA is built on ribose, which carries a hydroxyl group on its 2' carbon, whereas DNA is built on 2'-deoxyribose, which lacks that hydroxyl. That single 2'-hydroxyl makes RNA far less stable than DNA. Under alkaline conditions the 2'-OH is deprotonated and its oxygen attacks the adjacent phosphorus of the phosphodiester backbone, cleaving the chain (via a cyclic 2',3'-phosphate intermediate). DNA, lacking the 2'-OH, cannot undergo this internal attack and so resists alkaline hydrolysis. This is why "susceptibility to alkaline hydrolysis because of neighbouring pentose hydroxyl groups" is a feature that distinguishes most RNA molecules from DNA -- it is a direct chemical consequence of ribose having the extra 2'-hydroxyl that deoxyribose does not.

## explicit_objective
Explain that RNA's ribose 2'-hydroxyl group makes it susceptible to alkaline hydrolysis, a lability that DNA (with 2'-deoxyribose) lacks, and use this as a distinguishing feature of RNA.

## pitfalls
Attributing RNA's alkaline lability to uracil or to being single-stranded rather than to the ribose 2'-hydroxyl group; or forgetting that it is the absence of that 2'-OH that makes DNA the more chemically stable store of genetic information.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Molecular Biology

## subtopic
RNA structure

## microtopic

## nanotopic

## modules
AUN-CBF-103

## article_ids
ART-FND-AUN-CBF103-CBF2TAIL-RNA-RIBOSE

## related_article_ids

## related_concept_ids
CON-FND-F1E54D68C8FAB0

## resource_ids
src_f7e45bae9ce161e08d46

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.3

## exam_weight_by_year
AUN_Y1=0.3

## clinical_relevance
0.2

## academic_relevance
0.8

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The correct answer is: Susceptibility to alkaline hydrolysis because of neighboring pentose hydroxyl groups" (Quiz54 Q1, characteristic distinguishing most RNA molecules from DNA, p210).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
None beyond standard undergraduate teaching level.

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
sourceCandidateIds: find-existing.mjs "RNA alkaline hydrolysis 2' hydroxyl", "ribose 2'-OH lability", "RNA versus DNA stability pentose" -- 0 hits; the Alexandria molecular RNA concept CON-FND-F1E54D68C8FAB0 covers uracil-vs-thymine and single-strandedness but explicitly not the 2'-hydroxyl / alkaline-hydrolysis distinction this item tests -- safe to create.
relationships: complements CON-FND-F1E54D68C8FAB0 (the uracil/single-strand differences between RNA and DNA) with the ribose-2'-OH / alkaline-lability difference it does not state.
