<!--
  103 BMS · Biochemistry · the nine concepts the Metabolism Of Heme MCQs test,
  where nothing already authored covers them.

    ART-103-BIO-HEME-BIOSYNTHESIS-AND-PORPHYRIA  → 3 concepts
    ART-103-BIO-HEME-CATABOLISM-AND-BILIRUBIN    → 4
    ART-103-BIO-HYPERBILIRUBINAEMIA-SYNDROMES    → 2

  THE IDS WERE NOT MINTED HERE. Nine questions in
  ../question/103-BMS-MCQ-protein-heme.md already name each of these concepts in
  their main_concept, and the three article IDs are already named in their
  library_ids. This file is written to those fixed IDs, in both directions:
  every concept names its article in article_ids and every article lists the
  concept back in related_concepts.

  ONE CONSEQUENCE OF THAT, RECORDED RATHER THAN HIDDEN. mint-concept-id.mjs
  derives the hex tail from a SHA-256 of the canonical key, so a canonical key
  written after the fact does not generally reproduce an ID minted earlier from
  a key nobody wrote down. Eight of the nine canonical keys below are authored
  fresh and do not hash to their own ID; only CON-HEM-26C990AD8F630C was
  recovered — its key is `heme.catabolism.res-liver-intestine`, confirmed by
  re-minting. This is flagged on every affected record in field_notes so that a
  later author does not re-mint from the canonical key and fork the record.

  JAUNDICE WAS PARTLY AUTHORED ALREADY, and nothing here repeats it. The 2025
  end-of-year paper's Case (3) produced two concepts in
  ./103-BMS-biochemistry-concepts.md — CON-GIT-4A2A86832F1FF2, the three-way
  classification of jaundice by bilirubin fraction and serum enzyme, and
  CON-GIT-A265DD7A7CC8EF, clay stool and dark urine in obstruction — plus an
  update to the live CON-HEM-F2B664C215C912 on haemolytic anaemia. No second
  jaundice-classification concept is written. What is written instead is the
  material those three do not reach: where haem is made, what the porphyrias
  and lead poisoning do to that pathway, which organs catabolise haem, what
  bilirubin is conjugated with, what conjugated bilirubin *is*, what governs
  faecal stercobilinogen, and the two named syndromes.

  THE FIRST ARTICLE IS ON CANCELLED MATERIAL. The department orientation
  cancels "Biosynthesis of heme & Porphyria (pp115-118)" outright, for both the
  end-of-module and the final exam. The three concepts that fall inside it —
  CON-HEM-3D75438A839FBD, CON-HEM-66B1DEEC8ED961 and CON-HEM-4C0C6A97CA8788 —
  are kept, because the question book still asks them and a student may still
  meet them, but nothing on those records claims the topic is examined:
  blueprint_weight and exam_weight_by_year are 0.05, weight_confidence is 0.2,
  and exam_signal records the question book appearance with the cancellation on
  its face. Heme catabolism, blood bilirubin and jaundice (pp119-123) are NOT
  cancelled and carry ordinary weights.

  LIVE NEAR-MISSES, SEARCHED BY LABEL TEXT AND NOT BY SUBJECT. The CON-HEM-
  namespace sits under a legacy subject, so a subject-filtered search reports
  nothing while the namespace is full. Searching the label text found five live
  records worth deciding about, and none of them covers a concept below:
  CON-HEM-881E8EA781D8E2, CON-HEM-8B4F811AE09E0F, CON-HEM-F2B664C215C912,
  CON-HEM-7F0EF6B0D6F2FB and CON-INF-D52C8D8ED370EE. Each is named in the
  rejected_merge_candidate_ids of the concept it nearly matched, with the
  reason it was not merged.

  SOURCE. Every statement is from src_300847a5fa64809d6c07, Dpt book
  Biochemistry 103.pdf, chapter "VIII- METABOLISM OF HEME", printed pages 115
  to 123. Where the book is silent the record says so. The department question
  book (src_07f0a0ff41addf826c7f) establishes what is asked and appears in
  exam_signal only; it is never cited as evidence that something is true.

  WHAT THE BOOK CANNOT SUPPORT is recorded on the records that need it, not
  smoothed over. The largest gap is Crigler-Najjar: the department textbook
  teaches Gilbert syndrome and does not describe Crigler-Najjar at all, so
  CON-HEM-20178168A8FCF0 rests on the question book for the syndrome itself and
  on the textbook only for the two mechanisms it turns on — that glucuronyl
  transferase is induced by phenobarbital, and that unconjugated bilirubin
  above about 20 mg/dL causes kernicterus.

  THE BOOK'S SUMMARY TABLE LEAVES A CELL BLANK AND IT IS LEFT BLANK. On printed
  page 123 the enzyme row for haemolytic jaundice is empty — not "normal",
  empty. That is established for this module and nothing here fills it.

  Import: Admin › Concepts › Import. Order: article → concept.
-->

# Item

## label
Haem is made in the erythroid bone marrow and the liver, and inside the cell the pathway is split between mitochondrion and cytosol

## id
CON-HEM-3D75438A839FBD

## canonical_key
heme.biosynthesis.organ-and-intracellular-sites

## aliases
Sites of heme biosynthesis
Major sites of heme biosynthesis
Heme synthesis site
Organ site of heme synthesis
Intracellular site of heme synthesis
Bone marrow and liver heme synthesis

## arabic_label
مواقع تخليق الهيم: نخاع العظم والكبد

## arabic_aliases
الموقع العضوي لتخليق الهيم
الموقع داخل الخلية لتخليق الهيم

## definition
The two major sites of haem biosynthesis are the erythrocyte-producing cells of the bone marrow, which are active in haemoglobin synthesis, and the liver, which makes several haem proteins and cytochrome P450 in particular. Inside the cell the pathway is divided between two compartments: the initial reaction and the last three steps occur in mitochondria, and the intermediate steps occur in the cytosol. The two facts are connected — a mature red cell has no mitochondria, so it cannot make haem at all, and it is the nucleated marrow precursors that do.

## explicit_objective
Name the bone marrow and the liver as the two major sites of haem biosynthesis, state which steps of the pathway are mitochondrial and which are cytosolic, and explain from that split why a mature erythrocyte cannot make haem.

## pitfalls
Answering "liver and kidney". That pair is the site of L-amino acid oxidase, and the kidney's prominence elsewhere in nitrogen metabolism makes it feel right here; the book never names it as a site of haem synthesis. The other error is answering "RBCs", which confuses the nucleated marrow precursor with the mature circulating cell that has lost its mitochondria.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
haem

## primary_node_id
DIS-BIO-T07

## secondary_node_ids
SYS-HEM-T01-S01 | SYS-FND-T06

## topic
Clinical biochemistry

## subtopic
Biosynthesis of Heme

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Heme Metabolism > Biosynthesis of Heme

## article_ids
ART-103-BIO-HEME-BIOSYNTHESIS-AND-PORPHYRIA

## related_article_ids
ART-103-BIO-HEME-CATABOLISM-AND-BILIRUBIN

## related_concept_ids
CON-HEM-4C0C6A97CA8788 | CON-HEM-66B1DEEC8ED961 | CON-HEM-095C9C97B56CCA

## resource_ids
src_300847a5fa64809d6c07

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.05

## exam_weight_by_year
KAU_Y1=0.05

## clinical_relevance
0.4

## academic_relevance
0.35

## weight_confidence
0.2

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p137 q1, topic cancelled from both exams | 103 BMS

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"The major sites of heme biosynthesis are: - The erythrocyte-producing cells of the bone marrow which are active in hemoglobin synthesis. - The liver which synthesizes several heme proteins (particularly, cytochrome P450)."
"The initial reaction and the last three steps occur in mitochondria. The intermediate steps of the biosynthetic pathway occur in the cytosol."

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-HEM-095C9C97B56CCA

## conflicts
[clear]

## uncertainty
The book says "major sites" without saying what fraction of total body haem each contributes, or which other tissues make any. It also gives no figure for daily synthesis, although it gives one for daily turnover in the catabolism section.

## evidence_gaps
Supported by the department book only. No independent verification against an international biochemistry reference has been attached, and no evidence claim is authored for this concept in this batch.

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
authored_needs_independent_evidence

## exclusion_reason


## field_notes
canonicalKey: The ID is fixed — question QM-103-A87F24F58B91 already names it in main_concept — so the key was written to describe the concept, not minted from. It does not hash to this ID under mint-concept-id.mjs. Do not re-mint from it.
microtopicId: The book's own section, "BIOSYNTHESIS OF HEME — Site", is already the leaf named in module_subject; the canonical tree has nothing finer than DIS-BIO-T07 in this branch.
nanotopicId: No nanotopic exists below this level in the biochemistry branch, and inventing one would place the concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
atomicClaimIds: Deliberately empty. The evidence chain for this batch is a separate scope and no claim is authored here; attaching a live claim from a neighbouring concept to clear the field would be a near-miss binding, which 02-concepts.md forbids.
resourceOccurrenceIds: Hand-authored from the department textbook and question book; this concept has no corpus extraction record.
sourceCandidateIds: Searched live state by label text for "heme", "hemoglobin degradation" and "ALA synthase". "heme" returns CON-HEM-8B4F811AE09E0F on iron reuse and nothing on synthesis; the other two return nothing. No corpus candidate exists.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded. The topic is cancelled from both exams, which is a statement about examination and is carried by the weights and by exam_signal, not by exclusion — the concept is still taught material a student may meet.
rejectedMergeCandidateIds: CON-HEM-095C9C97B56CCA says glycolysis is the red cell's only source of ATP because the red cell has no mitochondria. Not merged — it is a statement about red cell energy metabolism, and this is a statement about where haem is made. They share one premise and answer different questions; the question's own record links them as contextual rather than identical.
cancellation: The department orientation cancels "Biosynthesis of heme & Porphyria (pp115-118)" for both the end-of-module and the final exam, and the Site subsection on printed page 115 is inside it. The concept is kept because the question book still asks it; blueprint_weight, exam_weight_by_year and weight_confidence are all held low so that no field on this record claims the topic is examined.
relationships: Walked the 122 live CON-HEM- records by label text, the 28 concepts in ./103-BMS-biochemistry-concepts.md and the eight minted beside this one. Three loose neighbours are in related_concept_ids. No typed edges are written — this batch authors no relations file — and the prerequisite_of edge from this concept to CON-HEM-4C0C6A97CA8788 and the mechanism_step_before chain through the eight synthetic steps are recorded here as owed.

---

# Item

## label
Whether a porphyria is neuropsychiatric or photosensitive depends on whether the block falls before or after the porphyrinogen ring closes

## id
CON-HEM-66B1DEEC8ED961

## canonical_key
porphyria.manifestations.block-before-or-after-ring-closure

## aliases
Porphyrias
Neuropsychiatric manifestations of porphyria
Photosensitivity in porphyria
Acute intermittent porphyria
Porphyria cutanea tarda
ALA and PBG accumulation

## arabic_label
البورفيريا: المظاهر العصبية النفسية والحساسية للضوء

## arabic_aliases
البورفيريا الحادة المتقطعة
البورفيريا الجلدية الآجلة

## definition
Porphyrias are inherited, or occasionally acquired, defects in haem synthesis that let porphyrins or their precursors accumulate in tissues and spill into urine. They produce two clinical pictures, and which one a patient gets is decided by where the block sits. A block before the porphyrinogen ring has been assembled leaves the small linear precursors ALA and porphobilinogen to accumulate; these are neurotoxic, decreasing ATPase activity in nerve cells, and they injure sympathetic nerves to give abdominal pain and somatic nerves to give peripheral neuritis, skeletal muscle paralysis and neuropsychiatric symptoms — the book's example is acute intermittent porphyria, a uroporphyrinogen I synthase deficiency. A block after the ring is closed leaves porphyrinogens to accumulate in skin, where they oxidise spontaneously to porphyrins that absorb light at about 400 nm, release free radicals and destroy skin cells through lysosomal damage — the book's example is porphyria cutanea tarda, a uroporphyrinogen decarboxylase deficiency.

## explicit_objective
Given the enzyme deficient in a porphyria, predict whether the patient presents with neuropsychiatric symptoms or with photosensitivity, by deciding whether the block lies before or after closure of the porphyrinogen ring.

## pitfalls
Learning the two porphyrias as a pair of names with a pair of symptoms attached, and then being unable to place a third. The rule is positional, not a list: it is the accumulating molecule that decides. Naming uroporphyrinogen III, coproporphyrinogen III or protoporphyrinogen as the cause of the neuropsychiatric picture is the same error — all three are closed rings, so all three give photosensitivity.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
haem

## primary_node_id
DIS-BIO-T07

## secondary_node_ids
SYS-HEM-T01-S01 | SYS-DER-T01

## topic
Clinical biochemistry

## subtopic
Porphyrias

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Heme Metabolism > Porphyrias

## article_ids
ART-103-BIO-HEME-BIOSYNTHESIS-AND-PORPHYRIA

## related_article_ids
ART-103-BIO-HEME-CATABOLISM-AND-BILIRUBIN

## related_concept_ids
CON-HEM-3D75438A839FBD | CON-HEM-4C0C6A97CA8788

## resource_ids
src_300847a5fa64809d6c07

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.05

## exam_weight_by_year
KAU_Y1=0.05

## clinical_relevance
0.5

## academic_relevance
0.35

## weight_confidence
0.2

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p137 q3, q4 and q5, topic cancelled from both exams | 103 BMS

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"These are characterized by the accumulation of ALA or PBG, as a result of relative or absolute inhibition of the enzyme uroporphyrinogen I synthase together with increased activity of the enzyme ALA synthase."
"Any enzyme defect after the synthesis of the porphyrinogen ring will lead to the accumulation of porphyrins in the skin."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book says the neuropsychiatric group arises from "relative or absolute" inhibition of uroporphyrinogen I synthase together with increased ALA synthase activity, without saying what drives the ALA synthase rise in an inherited deficiency. It also gives no frequency for either porphyria and no diagnostic test.

## evidence_gaps
Supported by the department book only. No independent verification against an international biochemistry or haematology reference has been attached, and no evidence claim is authored for this concept in this batch. The book names two example porphyrias and does not list the rest, so the concept states a rule the book gives and two instances, not a complete classification.

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
authored_needs_independent_evidence

## exclusion_reason


## field_notes
canonicalKey: The ID is fixed — question QM-103-813884B8474D already names it in main_concept — so the key was written to describe the concept, not minted from. It does not hash to this ID under mint-concept-id.mjs. Do not re-mint from it.
microtopicId: The book's own section, "PORPHYRIAS", is already the leaf named in module_subject; the canonical tree has nothing finer than DIS-BIO-T07 in this branch.
nanotopicId: No nanotopic exists below this level in the biochemistry branch.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
atomicClaimIds: Deliberately empty. The evidence chain for this batch is a separate scope and no claim is authored here.
resourceOccurrenceIds: Hand-authored from the department textbook and question book; no corpus extraction record exists.
sourceCandidateIds: Searched live state by label text for "porphyria", "photosensitivity" and "ALA synthase". All three return nothing live; the only hits are the three pending questions in this lane. No corpus candidate exists.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: Nothing was folded into this record.
conflicts: The book's prose and its own summary diagram agree on both branches; no source disagreement was found to record.
exclusionReason: Not excluded. The topic is cancelled from both exams, which the weights and exam_signal carry; the material is still taught and still asked in the question book.
rejectedMergeCandidateIds: Deliberately empty. Searching live state by label text for "porphyria", "photosensitivity", "neurotoxic" and "skin damage" returned no record close enough to be a merge candidate — the porphyrias are absent from live state entirely. The near neighbours that do exist are the other two concepts of this article, which are new here and cross-linked rather than merged.
cancellation: The department orientation cancels "Biosynthesis of heme & Porphyria (pp115-118)" for both exams, and PORPHYRIAS on printed page 118 is inside it. Kept because the question book sets three items on it; all weights held at 0.05 with weight_confidence 0.2 so nothing claims examination.
relationships: Walked the live CON-HEM- namespace by label text, the 28 concepts in ./103-BMS-biochemistry-concepts.md and the eight minted beside this one. Two loose neighbours are in related_concept_ids. No typed edges are written — this batch authors no relations file — and a contrasts_with edge between the neuropsychiatric and photosensitive branches is the one most worth writing.

---

# Item

## label
Lead blocks haem synthesis at both ends of the pathway — ALA dehydratase and ferrochelatase — which is why the anaemia is microcytic and iron does not fix it

## id
CON-HEM-4C0C6A97CA8788

## canonical_key
heme.biosynthesis.lead-inhibits-two-enzymes

## aliases
Lead poisoning
Lead and heme synthesis
ALA dehydratase inhibition
Ferrochelatase inhibition
Plumbism

## arabic_label
تأثير التسمم بالرصاص على تخليق الهيم

## arabic_aliases
تثبيط إنزيم نازعة هيدرات حمض دلتا أمينوليفولينيك
تثبيط إنزيم الفيروكيليتاز

## definition
The department book records lead's effect on haem metabolism as a note in its own right: in lead poisoning, lead inhibits ALA dehydratase and ferrochelatase. The two enzymes sit at opposite ends of the pathway. ALA dehydratase is step 2, condensing two molecules of ALA into porphobilinogen in the cytosol, so blocking it backs ALA up. Ferrochelatase is step 8, inserting ferrous iron into the centre of the protoporphyrin ring in the mitochondrion, so blocking it leaves protoporphyrin unable to become haem and leaves the iron unused.

## explicit_objective
Name the two enzymes of haem synthesis that lead inhibits, place each at its step in the pathway, and explain why the resulting anaemia is microcytic and does not respond to iron.

## pitfalls
Expecting a lead-poisoned patient to improve on iron. Iron supply was never the problem — the enzyme that inserts it is poisoned, so the iron accumulates unused. The other error is reaching for megaloblastic: interference with haem synthesis leaves the cell dividing normally but unable to fill itself with haemoglobin, which is a microcytic picture, while megaloblastic anaemia is a failure of DNA synthesis from folate or B12 deficiency.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
haem

## primary_node_id
DIS-BIO-T07

## secondary_node_ids
SYS-HEM-T01-S01 | SYS-HEM-T02

## topic
Clinical biochemistry

## subtopic
Biosynthesis of Heme

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Heme Metabolism > Biosynthesis of Heme

## article_ids
ART-103-BIO-HEME-BIOSYNTHESIS-AND-PORPHYRIA

## related_article_ids
ART-103-BIO-HEME-CATABOLISM-AND-BILIRUBIN

## related_concept_ids
CON-HEM-3D75438A839FBD | CON-HEM-66B1DEEC8ED961 | CON-HEM-7F0EF6B0D6F2FB

## resource_ids
src_300847a5fa64809d6c07

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.05

## exam_weight_by_year
KAU_Y1=0.05

## clinical_relevance
0.7

## academic_relevance
0.35

## weight_confidence
0.2

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p137 q6, topic cancelled from both exams | 103 BMS

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"N.B. In lead poisoning, lead inhibits ALA dehydratase and ferrochelatase enzymes."
"Insertion of the ferrous iron into the center of the protoporphyrin ring is catalyzed by ferrochelatase (heme synthase) to form heme. Ferrochelatase is inhibited by lead."

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-HEM-7F0EF6B0D6F2FB

## conflicts
[clear]

## uncertainty
The book names the two inhibited enzymes and nothing else about lead poisoning — no blood lead threshold, no red cell morphology, no treatment, and no statement that the anaemia is microcytic. The microcytic morphology is standard haematology and is the reasoning the question's key requires, but it is not this book's own word and is flagged as such.

## evidence_gaps
Supported by the department book only for the enzyme inhibition itself. The consequence taught alongside it in the question book — a microcytic anaemia unresponsive to iron — is not stated in this textbook, and no source in the evidence store has been attached for it. No evidence claim is authored for this concept in this batch.

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
authored_needs_independent_evidence

## exclusion_reason


## field_notes
canonicalKey: The ID is fixed — question QM-103-F47356E89E1A already names it in main_concept — so the key was written to describe the concept, not minted from. It does not hash to this ID under mint-concept-id.mjs. Do not re-mint from it.
microtopicId: The book's own section, "BIOSYNTHESIS OF HEME", is already the leaf named in module_subject; the canonical tree has nothing finer than DIS-BIO-T07 here.
nanotopicId: No nanotopic exists below this level in the biochemistry branch.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
atomicClaimIds: Deliberately empty. The evidence chain for this batch is a separate scope and no claim is authored here.
resourceOccurrenceIds: Hand-authored from the department textbook and question book; no corpus extraction record exists.
sourceCandidateIds: Searched live state by label text for "lead poisoning", "ferrochelatase" and "plumbism". Only the pending question matches; no live or corpus record exists.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: Nothing was folded into this record.
conflicts: None found. The book states the two inhibitions twice, in the step 8 text and in the N.B., and they agree.
exclusionReason: Not excluded. The topic is cancelled from both exams and the weights say so; the material is still in the question book.
rejectedMergeCandidateIds: CON-HEM-7F0EF6B0D6F2FB says iron-deficiency anaemia is microcytic and hypochromic. Not merged — it is about a deficiency of the substrate, and this concept is about poisoning of the enzyme that uses it. The pair is exactly what a student confuses, which makes them worth an often_confused_with edge rather than one record.
relationships: Walked the live CON-HEM- namespace by label text, including the twelve live anaemia records, and the eight concepts minted beside this one. Three loose neighbours are in related_concept_ids. No typed edges are written — this batch authors no relations file — and an often_confused_with edge to CON-HEM-7F0EF6B0D6F2FB is the one this concept most needs.

---

# Item

## label
Bilirubin is formed in three places in turn — reticuloendothelial system, then liver, then intestine — and the kidney is not one of them

## id
CON-HEM-26C990AD8F630C

## canonical_key
heme.catabolism.res-liver-intestine

## aliases
Heme catabolism
Sites of heme catabolism
Bilirubin formation
Reticuloendothelial system
Heme oxygenase
Biliverdin reductase

## arabic_label
مواقع هدم الهيم: الجهاز الشبكي البطاني ثم الكبد ثم الأمعاء

## arabic_aliases
هدم الهيم
تكوين البيليروبين

## definition
The book gives haem catabolism as a sequence of three locations, and bilirubin is formed successively in each. In the reticuloendothelial system, erythrocytes about 120 days old are taken up, globin is removed and hydrolysed to amino acids, and haem oxygenase — needing NADPH and oxygen — releases ferric iron and carbon monoxide to leave green biliverdin, which biliverdin reductase reduces to yellow bilirubin. In the liver, that bilirubin is taken up, conjugated and secreted into bile. In the intestine, bacterial enzymes free it from glucuronic acid and reduce it to stercobilinogen. The kidney appears nowhere in that sequence: it excretes two water-soluble products that reach it in blood — the trace of urobilinogen that escapes the enterohepatic circulation, and conjugated bilirubin when that is abnormally raised — but excreting a product is not participating in the pathway that made it.

## explicit_objective
List the three sites at which bilirubin is successively formed, name the enzyme that begins the degradation and the pigment each step produces, and explain why the kidney is not a site of haem catabolism despite handling its products.

## pitfalls
Counting the kidney as part of the pathway because urobilinogen and bilirubin can be found in urine. The distinction is the same one that separates liver from kidney in urea metabolism: one organ makes, the other clears. The second error is forgetting the spleen, which is not named as a site in its own right but is the part of the reticuloendothelial system where most aged red cells are taken up.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
haem

## primary_node_id
DIS-BIO-T07

## secondary_node_ids
SYS-HEM-T01-S01 | SYS-GIT-T06

## topic
Clinical biochemistry

## subtopic
Heme Catabolism

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Heme Metabolism > Heme Catabolism

## article_ids
ART-103-BIO-HEME-CATABOLISM-AND-BILIRUBIN

## related_article_ids
ART-103-BIO-HEME-BIOSYNTHESIS-AND-PORPHYRIA

## related_concept_ids
CON-HEM-7A26AE75471EF8 | CON-HEM-22375197AEE80D | CON-HEM-C87C15A849F158 | CON-HEM-881E8EA781D8E2

## resource_ids
src_300847a5fa64809d6c07

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
0.5

## academic_relevance
0.9

## weight_confidence
0.5

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p137 q7 | 103 BMS

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"The formation of the bilirubin occurs subsequently in: A) Reticuloendothelial system (RES) B) Liver C) Intestine"
"The first step in the degradation of heme is catalyzed by the heme oxygenase system of the RE cells in the presence of NADPH and O2."

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-HEM-881E8EA781D8E2 | CON-HEM-8B4F811AE09E0F

## uncertainty
The book names the reticuloendothelial system rather than naming organs, so which organs count as RES is left to the reader; the spleen and liver are the usual answer and the question book expects the spleen, but this book does not print the list. It also gives no time course for the three stages.

## conflicts
[clear]

## evidence_gaps
Supported by the department book only. No independent verification against an international biochemistry reference has been attached, and no evidence claim is authored for this concept in this batch. The book does not state in so many words that the kidney is *not* involved; that is read off its own three-site list and its separate account of renal excretion, which is why support_mode is direct_statement for the three sites and the exclusion is argued rather than quoted.

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
authored_needs_independent_evidence

## exclusion_reason


## field_notes
canonicalKey: This is the one canonical key in the batch that was recovered rather than re-authored — re-minting `heme.catabolism.res-liver-intestine` with mint-concept-id.mjs under HEM reproduces CON-HEM-26C990AD8F630C exactly, so this record's key and ID agree.
microtopicId: The book's own section, "HEME CATABOLISM", is already the leaf named in module_subject; the canonical tree has nothing finer than DIS-BIO-T07 here.
nanotopicId: No nanotopic exists below this level in the biochemistry branch.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
atomicClaimIds: Deliberately empty. The evidence chain for this batch is a separate scope and no claim is authored here.
resourceOccurrenceIds: Hand-authored from the department textbook and question book; no corpus extraction record exists.
sourceCandidateIds: Searched live state by label text for "heme", "bile pigment", "erythrocyte breakdown" and "biliverdin". "biliverdin" returns nothing at all; the other three return the two iron-reuse records named in rejectedMergeCandidateIds. No corpus candidate exists.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: Nothing was folded into this record.
conflicts: None found. The book's prose on printed page 119 and its "Different Stages of Heme Catabolism" figure on printed page 120 agree on the three compartments.
exclusionReason: Not excluded. The cancelled-items orientation cancels printed pages 115 to 118 only; heme catabolism on printed pages 119 to 120 is examinable, and "Different stages of heme catabolism (120)" is named among the examinable diagrams.
rejectedMergeCandidateIds: CON-HEM-881E8EA781D8E2 says erythrocyte breakdown yields excreted bile pigments while iron is reused for new erythrocytes, and CON-HEM-8B4F811AE09E0F says heme iron is reused for new RBC formation. Neither is merged — both are histology-level statements about the fate of the iron, and this concept is about the three successive locations at which the pigment is made and about the organ that is not one of them. A question can test either without the other, and the pending CON-GIT-A265DD7A7CC8EF already records the same decision against CON-HEM-881E8EA781D8E2.
relationships: Walked the live CON-HEM- namespace by label text, the 28 concepts in ./103-BMS-biochemistry-concepts.md and the eight minted beside this one. Four loose neighbours are in related_concept_ids. No typed edges are written — this batch authors no relations file — and the mechanism_step_before chain from this concept through CON-HEM-7A26AE75471EF8 to CON-HEM-22375197AEE80D is the one this article most needs.

---

# Item

## label
The liver makes bilirubin excretable by conjugating it with glucuronic acid, using glucuronyl transferase — an enzyme that can be induced

## id
CON-HEM-7A26AE75471EF8

## canonical_key
bilirubin.hepatic-conjugation.glucuronic-acid-and-glucuronyl-transferase

## aliases
Conjugation of bilirubin
Glucuronyl transferase
UDP-glucuronyltransferase
Bilirubin glucuronide
UDP-glucuronic acid
Phenobarbital induction

## arabic_label
اقتران البيليروبين بحمض الجلوكيورونيك في الكبد

## arabic_aliases
إنزيم ناقلة الجلوكيورونيل
الاقتران الكبدي للبيليروبين

## definition
Unconjugated bilirubin arriving at the liver is taken up by the liver cells, where it dissociates from albumin. Conjugation of bilirubin with glucuronic acid is then catalysed by glucuronyl transferase — two molecules of UDP-glucuronic acid per bilirubin — and the product is conjugated bilirubin. Conjugation increases the polarity and water solubility of bilirubin, which is the single change every difference between the two forms follows from. Glucuronyl transferase is inducible: the book names certain drugs, phenobarbital among them, and glucose.

## explicit_objective
Name glucuronic acid as the conjugating partner and glucuronyl transferase as the enzyme, state what conjugation changes about the molecule, and explain why an inducible enzyme makes phenobarbital a treatment for jaundice caused by immature or partially deficient conjugation.

## pitfalls
Reaching for a molecule that merely ends in "-uronic acid". Hyaluronic acid contains glucuronic acid as a repeating unit but is a glycosaminoglycan of the extracellular matrix, and galacturonic acid is the uronic acid of plant pectin; the conjugating agent is the free monosaccharide acid itself. The other error is naming conjugation as the rate-limiting step of bilirubin metabolism because it is the step that fails in so many diseases — that an enzyme is a common site of pathology does not make it the normal bottleneck.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
haem

## primary_node_id
DIS-BIO-T07

## secondary_node_ids
SYS-HEM-T01-S01 | SYS-GIT-T06

## topic
Clinical biochemistry

## subtopic
Heme Catabolism

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Heme Metabolism > Heme Catabolism

## article_ids
ART-103-BIO-HEME-CATABOLISM-AND-BILIRUBIN

## related_article_ids
ART-103-BIO-HYPERBILIRUBINAEMIA-SYNDROMES

## related_concept_ids
CON-HEM-C87C15A849F158 | CON-HEM-26C990AD8F630C | CON-HEM-20178168A8FCF0 | CON-HEM-167E007FE3D9EC

## resource_ids
src_300847a5fa64809d6c07

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.8

## exam_weight_by_year
KAU_Y1=0.8

## clinical_relevance
0.7

## academic_relevance
0.9

## weight_confidence
0.5

## confidence
0.95

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p138 q8 and q15 | 103 BMS

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"Conjugation of bilirubin with glucuronic acid is catalyzed by the enzyme glucuronyltransferase. This type of bilirubin is called 'conjugated bilirubin'."
"Conjugation increases polarity and water-solubility of bilirubin."
"Glucuronylansferase is induced by certain drugs, e.g., phenobarbital, and by glucose."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## uncertainty
The book prints the enzyme name three different ways across two pages — "glucuronyltransferase", "Glucuronylansferase" and "Bilirubin-Glucuronyl Transferase" in the figure — and one of those is a typographical slip. Which spelling a marker expects is not settled by this source; the concept uses "glucuronyl transferase" and records the variants as aliases. The book also does not say what limits the rate of the whole pathway, so it does not settle whether conjugation or uptake is the bottleneck.

## conflicts
[clear]

## evidence_gaps
Supported by the department book only. No independent verification against an international biochemistry reference has been attached, and no evidence claim is authored for this concept in this batch. The stoichiometry of two UDP-glucuronic acid molecules per bilirubin is printed in the book's figure on printed page 120 and nowhere in its prose.

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
authored_needs_independent_evidence

## exclusion_reason


## field_notes
canonicalKey: The ID is fixed — question QM-103-C7A4FB0C4A9E-class item on printed page 138 already names it in main_concept — so the key was written to describe the concept, not minted from. It does not hash to this ID under mint-concept-id.mjs. Do not re-mint from it.
microtopicId: The book's own section, "HEME CATABOLISM — B) Liver", is already the leaf named in module_subject; the canonical tree has nothing finer than DIS-BIO-T07 here.
nanotopicId: No nanotopic exists below this level in the biochemistry branch.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
atomicClaimIds: Deliberately empty. The evidence chain for this batch is a separate scope and no claim is authored here.
resourceOccurrenceIds: Hand-authored from the department textbook and question book; no corpus extraction record exists.
sourceCandidateIds: Searched live state by label text for "glucuronyl", "conjugation", "bilirubin" and "phenobarbital". "glucuronyl" and "bilirubin" return no live record at all — the only hits are pending records in this lane — so no corpus candidate exists.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: Nothing was folded into this record.
conflicts: The three spellings of the enzyme name are a typographical inconsistency inside one source rather than a disagreement between sources, so they are recorded in uncertainty rather than as a conflict.
exclusionReason: Not excluded. Printed pages 119 to 123 are outside the cancelled range.
rejectedMergeCandidateIds: Deliberately empty. Searching live state by label text for "glucuronyl", "conjugation" and "bilirubin" returned no live record; the bilirubin material in live state is limited to CON-HEM-881E8EA781D8E2 on bile pigments, which is a near-miss for the catabolism-sites concept rather than for this one and is recorded there.
relationships: Walked the live CON-HEM- namespace by label text, the pending jaundice concepts in ./103-BMS-biochemistry-concepts.md and the eight minted beside this one. Four loose neighbours are in related_concept_ids. No typed edges are written — this batch authors no relations file — and prerequisite_of edges from this concept to both syndrome concepts are owed, since neither Crigler-Najjar nor neonatal jaundice is intelligible without it.

---

# Item

## label
Conjugated bilirubin is water-soluble, and every other row of the book's comparison table follows from that one property

## id
CON-HEM-C87C15A849F158

## canonical_key
bilirubin.conjugated.water-solubility-and-its-consequences

## aliases
Conjugated bilirubin
Cholebilirubin
Direct bilirubin
Direct reacting bilirubin
Unconjugated bilirubin
Hemobilirubin
Indirect bilirubin
Van den Bergh reaction

## arabic_label
البيليروبين المقترن: قابل للذوبان في الماء ومباشر التفاعل

## arabic_aliases
البيليروبين المباشر
البيليروبين غير المقترن

## definition
Conjugated bilirubin is the form the liver has attached glucuronic acid to, and the book calls it cholebilirubin because bile is its route of excretion. It is mostly polar and water-soluble, and because it is soluble it is not bound to plasma proteins; being unbound and soluble it is excreted by the kidney and appears in urine; and being polar it does not pass the blood-brain barrier, so it does not cause brain damage. In the Van den Bergh reaction it reacts directly with the reagent, within one minute, which is why it is called direct-reacting, and its normal serum level is below 0.3 mg/dL. Unconjugated bilirubin is the mirror image on every one of those rows, and in haemolytic jaundice it is the unconjugated fraction that rises while the conjugated fraction stays normal.

## explicit_objective
Given any statement about a form of bilirubin — protein binding, renal excretion, blood-brain barrier crossing, Van den Bergh behaviour, or which jaundice raises it — decide which form it describes, by asking first whether that form is soluble.

## pitfalls
Believing that conjugated bilirubin causes kernicterus. Only unconjugated bilirubin crosses the blood-brain barrier, because it is hydrophobic, and it does so when its plasma level exceeds the carrying capacity of albumin at about 20 mg/dL. A student who reverses this will misjudge which jaundiced neonate is at risk. The second reversal is expecting conjugated bilirubin to rise in haemolysis — the book's own table records it as normal there.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
haem

## primary_node_id
DIS-BIO-T07

## secondary_node_ids
SYS-HEM-T01-S01 | SYS-GIT-T06

## topic
Clinical biochemistry

## subtopic
Blood Bilirubin

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Heme Metabolism > Blood Bilirubin

## article_ids
ART-103-BIO-HEME-CATABOLISM-AND-BILIRUBIN

## related_article_ids
ART-103-BIO-HYPERBILIRUBINAEMIA-SYNDROMES

## related_concept_ids
CON-HEM-7A26AE75471EF8 | CON-HEM-26C990AD8F630C | CON-GIT-4A2A86832F1FF2 | CON-GIT-A265DD7A7CC8EF

## resource_ids
src_300847a5fa64809d6c07

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.85

## exam_weight_by_year
KAU_Y1=0.85

## clinical_relevance
0.85

## academic_relevance
0.9

## weight_confidence
0.55

## confidence
0.95

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p138 q10 and q11 | 103 BMS

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"Being water-soluble, conjugated bilirubin is not bound to plasma proteins; thus, it can be excreted in urine but does not pass the blood brain barrier."
"The water-soluble conjugated bilirubin (as it is not bound to proteins) reacts rapidly with the reagent (within one minute) and is said to be 'direct reacting.'"

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-GIT-4A2A86832F1FF2

## uncertainty
The book's table gives "mostly nonpolar" and "mostly polar" rather than absolute statements, and it does not say what the residual polarity of unconjugated bilirubin is or how much of it is unbound in plasma. It also gives no reference range for conjugated bilirubin other than "<0.3 mg/dL", with no lower bound.

## conflicts
[clear]

## evidence_gaps
Supported by the department book only. No independent verification against an international clinical chemistry reference has been attached, and no evidence claim is authored for this concept in this batch. The book's summary table on printed page 123 leaves the enzyme row for haemolytic jaundice blank rather than writing "normal"; this concept therefore states nothing about enzymes and nothing is invented to fill that cell.

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
authored_needs_independent_evidence

## exclusion_reason


## field_notes
canonicalKey: The ID is fixed — the question "Conjugated bilirubin is characterized by:" already names it in main_concept — so the key was written to describe the concept, not minted from. It does not hash to this ID under mint-concept-id.mjs. Do not re-mint from it.
microtopicId: The book's own section, "BLOOD BILIRUBIN", is already the leaf named in module_subject; the canonical tree has nothing finer than DIS-BIO-T07 here.
nanotopicId: No nanotopic exists below this level in the biochemistry branch.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
atomicClaimIds: Deliberately empty. The evidence chain for this batch is a separate scope and no claim is authored here.
resourceOccurrenceIds: Hand-authored from the department textbook and question book; no corpus extraction record exists.
sourceCandidateIds: Searched live state by label text for "bilirubin", "conjugated", "kernicterus" and "van den bergh". None returns a live record, so no corpus candidate exists.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: Nothing was folded into this record.
conflicts: None found within the book. Its prose on printed page 119, its Van den Bergh section on printed page 121 and its comparison table on printed page 123 agree row for row.
exclusionReason: Not excluded. Printed pages 119 to 123 are outside the cancelled range.
rejectedMergeCandidateIds: CON-GIT-4A2A86832F1FF2, pending in ./103-BMS-biochemistry-concepts.md, says the three jaundices are told apart by which bilirubin rises and which enzyme rises with it. Not merged, and deliberately not duplicated — that concept classifies the *disease* by laboratory pattern, and this one describes what the *molecule* is. This record therefore asserts nothing about enzymes and stops at the two bilirubin columns of the book's table; the disease rows belong to CON-GIT-4A2A86832F1FF2 and are cross-linked rather than restated.
relationships: Walked the live CON-HEM- namespace by label text, both pending jaundice concepts and the eight minted beside this one. Four loose neighbours are in related_concept_ids. No typed edges are written — this batch authors no relations file — and a contrasts_with edge between conjugated and unconjugated bilirubin, and a prerequisite_of edge from this concept to CON-GIT-4A2A86832F1FF2, are owed.

---

# Item

## label
Faecal stercobilinogen measures how much bilirubin reached the gut, so it rises in haemolysis, falls in hepatocellular jaundice and disappears in obstruction

## id
CON-HEM-22375197AEE80D

## canonical_key
bilirubin.intestinal-fate.stercobilinogen-tracks-gut-delivery

## aliases
Stercobilinogen
Fecal stercobilinogen
Stercobilin
Urobilinogen
Urobilin
Enterohepatic circulation of bile pigments
Clay coloured stool

## arabic_label
الستيركوبيلينوجين البرازي كمؤشر على كمية البيليروبين الواصلة للأمعاء

## arabic_aliases
الستيركوبيلين
اليوروبيلينوجين

## definition
In the large intestine, bacterial enzymes release bilirubin from glucuronic acid and reduce it successively to colourless stercobilinogen. Most of it is excreted in stool and oxidised by the oxygen of the air to brown stercobilin, which is what gives stool its colour; about 10 per cent is reabsorbed and returned to the liver in portal blood to be re-excreted in bile, the enterohepatic circulation; and a very little escapes to the systemic circulation and reaches the kidney as colourless urobilinogen, oxidised in air to the yellow urobilin that gives urine its normal colour. Because all of it comes from bilirubin delivered in bile, the amount in stool tracks the delivery: in haemolytic jaundice more bilirubin is made and secreted, so stercobilin increases and the stool becomes dark brown; in hepatocellular jaundice less is secreted, so it usually decreases and the stool is faint; and in obstruction none arrives at all, so stercobilin disappears and the stool is clay coloured.

## explicit_objective
Predict faecal stercobilinogen from the amount of conjugated bilirubin reaching the intestine, and give the stool and urine picture of haemolytic jaundice — dark stool, urobilinogen-positive but bilirubin-negative urine.

## pitfalls
Reasoning from the serum bilirubin instead of from what reaches the gut. Haemolytic jaundice raises serum bilirubin and *raises* stercobilinogen; obstructive jaundice also raises serum bilirubin and abolishes it. The two go opposite ways because what matters downstream is delivery in bile, not concentration in blood. The second error is expecting bilirubin in the urine of a haemolytic patient — the excess there is unconjugated and albumin-bound, so it cannot be filtered, which is why the book calls that jaundice acholuric even while urinary urobilinogen rises.

## concept_type
investigation

## status
under review

## support_mode
inferred

## subject
haem

## primary_node_id
DIS-BIO-T07

## secondary_node_ids
SYS-GIT-T06 | SYS-HEM-T02

## topic
Clinical biochemistry

## subtopic
Heme Catabolism

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Heme Metabolism > Heme Catabolism
103 BMS > Biochemistry > Heme Metabolism > Jaundice (Icterus or Hyperbilirubinemia)

## article_ids
ART-103-BIO-HEME-CATABOLISM-AND-BILIRUBIN

## related_article_ids
ART-103-BIO-JAUNDICE-AND-BILIRUBIN

## related_concept_ids
CON-HEM-26C990AD8F630C | CON-HEM-7A26AE75471EF8 | CON-GIT-A265DD7A7CC8EF | CON-GIT-4A2A86832F1FF2 | CON-HEM-F2B664C215C912

## resource_ids
src_300847a5fa64809d6c07

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.8

## exam_weight_by_year
KAU_Y1=0.8

## clinical_relevance
0.85

## academic_relevance
0.85

## weight_confidence
0.55

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p139 q20 | 103 BMS

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"The majority are excreted in stools and spontaneously oxidized by the oxygen of air to brown stercobilin, which gives stool its brown color."
"Stercobilin increases in feces, which becomes dark brown."
"Stercobilin in the feces usually decreases (faint stool)."

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-HEM-F2B664C215C912 | CON-GIT-A265DD7A7CC8EF

## uncertainty
The book gives the three directions qualitatively and no quantitative range for faecal stercobilinogen, so there is no threshold a student could be asked for. It also says a "very little" amount normally escapes to the systemic circulation without saying how urinary urobilinogen behaves in haemolysis; that direction is inferred from the increased load returning through the enterohepatic circulation, which is why support_mode is inferred rather than direct_statement.

## conflicts
[clear]

## evidence_gaps
Supported by the department book only, and assembled from three separate places in it — the intestinal stage of catabolism on printed page 120, and the haemolytic, obstructive and hepatocellular sections on printed pages 121 and 122. No evidence claim is authored for this concept in this batch. The rise in urinary urobilinogen in haemolysis is a reasoned consequence rather than a printed statement and is flagged as such.

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
authored_needs_independent_evidence

## exclusion_reason


## field_notes
canonicalKey: The ID is fixed — question "Fecal stercobilinogen is increased in:" already names it in main_concept — so the key was written to describe the concept, not minted from. It does not hash to this ID under mint-concept-id.mjs. Do not re-mint from it.
microtopicId: Two of the book's own sections feed this concept and both are named in module_subject, which is finer than any node the canonical tree offers below DIS-BIO-T07.
nanotopicId: No nanotopic exists below this level in the biochemistry branch.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
atomicClaimIds: Deliberately empty. The evidence chain for this batch is a separate scope and no claim is authored here.
resourceOccurrenceIds: Hand-authored from the department textbook and question book; no corpus extraction record exists.
sourceCandidateIds: Searched live state by label text for "stercobilin", "urobilinogen", "enterohepatic" and "clay". "urobilinogen" returns nothing at all and "stercobilin" returns only the two pending records in this lane. No corpus candidate exists.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
mergeIds: Nothing was folded into this record.
conflicts: None found. The three directional statements sit in three different sections of one book and do not contradict each other.
exclusionReason: Not excluded. Printed pages 120 to 122 are outside the cancelled range.
rejectedMergeCandidateIds: CON-HEM-F2B664C215C912, live and updated in ./103-BMS-biochemistry-concepts.md, says haemolytic anaemia is excessive RBC haemolysis and often has jaundice, and its definition already mentions that stercobilin increases in the faeces. Not merged — that record is about the anaemia and its jaundice, and mentions the stool in passing, while this concept is about what governs stercobilinogen in all three directions, including the two in which it falls. Folding this into it would bury the obstructive and hepatocellular halves inside a haemolysis record. CON-GIT-A265DD7A7CC8EF says that in obstructive jaundice the stool is clay coloured and the urine dark. Also not merged, and deliberately not duplicated: it owns the obstructive picture, this concept owns the general rule, and the two are cross-linked instead.
relationships: Walked the live CON-HEM- namespace by label text, including the twelve live anaemia records, both pending jaundice concepts, and the eight minted beside this one. Five loose neighbours are in related_concept_ids. No typed edges are written — this batch authors no relations file — and an investigated_by edge from CON-GIT-4A2A86832F1FF2 to this concept, plus a mechanism_step_before edge from CON-HEM-7A26AE75471EF8, are owed.
