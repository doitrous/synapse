<!--
  102 INT — single-best-answer questions taken from Kasr Al Ainy's own department
  question books, for concepts that already exist.

  Sources (all in ../manifest/kasr-y1-sources.json):
    src_07f0a0ff41addf826c7f — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf",
      154 pages, Biochemistry, modules 102 INT and 103 BMS. No text layer; read by OCR.
    src_2093c80b1f9c25f9c0a4 — "Physio MCQ First Year.pdf", 72 pages. No text layer.
    src_439c87aadd2a449415d2 — "dpt book mcq Physio MCQ [Blood] 2023.pdf", 15 pages.
    src_b21bbb801aed8c932206 — "dpt book mcq Physio MCQ [ANS] 2023.pdf", 10 pages.

  Every `question`, `title` and `answer_*` here is a TRANSCRIPTION of what the
  department printed. The stems and options keep the book's own spelling, including
  its American forms — "hemoglobin", "esterified", "anemia". Everything this batch
  *writes* — explanations, learning objectives, author notes — is British spelling.
  Where OCR mangled a printed word beyond recognition ("Veniricles", "Bigeding",
  "plaisiet") the page was re-read and the printed word restored; every such
  restoration is named in that item's author_notes.

  Every correct answer is the department's own printed answer key, read off the key
  grid at the end of the chapter and cross-checked against two independent OCR passes
  of that grid. No key was inferred, and no item whose key the two passes disagreed
  about is here.

  Selection: 614 bank items are tagged 102 INT. This file holds the subset that
  (a) carries a printed key both passes agreed on, (b) is not a duplicate of another
  item, (c) reads cleanly enough to transcribe, and (d) genuinely tests one of the
  38 existing concepts in ../concept/102-INT-concepts.md — the same idea, not merely
  the same chapter. The full accounting, including the concepts this corpus wants and
  does not have, is in scripts/kasr/extract/102-INT/mcq-authored-report.md.

  No resource_ids: a question's resource_ids resolves against the *catalogue* store,
  and this module's catalogue batch cannot be imported yet, so naming a source there
  would be a dangling reference. The provenance is in source_citation, which carries
  the manifest ID, the chapter, the printed question number, the page read and the
  key page.

  Status is Draft throughout. A faculty reviewer should confirm the department's key
  before any of these is shown to a student.

  Import: Content Setup > Bulk Import > question.
-->

# Item

## id
QST-102-INT-MCQ-001
## title
Glycine is:
## question
Glycine is:
## vignette
Amino acids are classified twice over — once by chemical group and once by whether the diet has to supply them. This item asks only for the chemical placement of the smallest of the twenty.
## subject
fnd
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
A
## answer_a
Neutral aliphatic amino acid
## explanation_a
Glycine has a single hydrogen atom as its side chain, so it is aliphatic — a plain carbon skeleton with no ring — and it is neutral, because the side chain carries neither a second amino group nor a second carboxyl group. It sits in the neutral aliphatic subgroup alongside alanine, as one of the two short-chain members, and the other neutral aliphatic subgroups are the branched-chain ones (valine, leucine, isoleucine), the hydroxyl-containing ones (serine, threonine), the sulfur-containing ones (cysteine, methionine) and the amides (asparagine, glutamine). The thing to hold is that the chemical group and the nutritional group are independent facts about the same molecule: glycine is neutral aliphatic *and* non-essential, and the second half does not follow from the first. Its short side chain is also why glycine occupies every third position of the collagen triplet — nothing bulkier would let three chains pack that closely.
## answer_b
Basic aliphatic amino acid
## explanation_b
This is the answer of a student who has learned that the aliphatic group subdivides into neutral, acidic and basic but has not attached names to the subgroups. The basic aliphatic amino acids are arginine and lysine, both of which carry a second nitrogen-containing group on the side chain; glycine's side chain is one hydrogen atom and cannot be basic.
## answer_c
Acidic aliphatic amino acid
## explanation_c
The acidic aliphatic amino acids are aspartic acid and glutamic acid, whose side chains carry a second carboxyl group. Picking this suggests the amino and carboxyl groups of the amino acid backbone — which every amino acid has — are being counted as the side chain. Classification is always by what hangs off the alpha carbon, never by the backbone.
## answer_d
Acidic aromatic amino acid
## explanation_d
This option fails twice over: glycine has no ring, so it is not aromatic, and no acidic amino acid is aromatic either — the aromatic group is phenylalanine, tyrosine and tryptophan, and the acidic group is aspartic and glutamic acids. This option pairs two labels that never occur together, which is the give-away.
## topic
Biochemistry
## subtopic
Amino Acids of Biological Importance
## main_concept
CON-FND-D0EDFFF1477094
## concept_ids

## contextual_concept_ids

## difficulty
Easy
## question_type
Classification
## cognitive_effort
Low
## cognitive_effort_score
0.2
## setting
Academic
## reasoning_level
1
## inferred_difficulty
80
## exam_relevance
8
## clinical_relevance
0.2
## academic_relevance
0.95
## exam_weight_by_year
KAU_Y1=0.6
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Biochemistry > Amino Acids of Biological Importance
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-AMINO-ACIDS-OF-BIOLOGICAL-IMPORTANCE
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Place a named amino acid in its chemical classification, and recognise that the chemical group carries no information about whether the amino acid is essential.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Amino Acids of Biological Importance, printed MCQ 6, page 25; printed answer key page 29, cell 6 = a.
## estimated_seconds
40
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Stem and options are verbatim from page 25; no OCR repair was needed on this item. The key cell was read the same way by both OCR passes of the page-29 grid. The concept this tests names glycine explicitly in its definition, which is why this item was kept while the neighbouring items on the isoelectric point and on peptide bond formation were not — those are taught by the same article but belong to no existing concept.

---

# Item

## id
QST-102-INT-MCQ-002
## title
Which of the following is formed when 2 cysteine are conjugated by disulfide bond?
## question
Which of the following is formed when 2 cysteine are conjugated by disulfide bond?
## vignette
This molecule is counted as a twenty-first amino acid more often than any other, and its nutritional status is the half of the answer students get wrong.
## subject
fnd
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
C
## answer_a
Homo cysteine
## explanation_a
Homocysteine is a single amino acid with one more methylene group in its chain than cysteine has — a difference in chain length, not a dimer. Picking it reads "conjugated" as "modified" rather than as "two molecules joined", which is the specific misreading this option catches.
## answer_b
Acetyl cysteine
## explanation_b
Acetylcysteine is cysteine carrying an acetyl group on its amino nitrogen — again one molecule with something added, not two molecules joined through their sulfurs. The stem specifies a disulfide bond, and a disulfide bond by definition links two sulfur atoms, so the product must contain two sulfur-containing residues.
## answer_c
Cystine
## explanation_c
Two molecules of cysteine are conjugated by a disulfide bond formed by the removal of two hydrogen atoms, and the dimer is cystine. Three things follow and all three are examinable. First, cystine is not a twenty-first amino acid: it is made after cysteine has been incorporated, exactly as hydroxyproline and hydroxylysine are made after proline and lysine. Second, cystine is a sulfur-containing amino acid, and it inherits cysteine's nutritional status, not methionine's — so cystine is non-essential, even though the other sulfur-containing amino acid, methionine, is essential. That single inference is the trap set on the 2025 exam paper. Third, the same bond does structural work at a higher level: a disulfide bond between two cysteines is one of the five interactions holding tertiary structure together, as in keratin and insulin, and it is the cross-link that makes heat-coagulated albumin irreversibly denatured.
## answer_d
Homo cystine
## explanation_d
It is the near-miss. Homocystine is the disulfide dimer of homocysteine, so the *reaction* described is right but the *starting material* is wrong. A student who picks this has the chemistry of the disulfide bond and has simply not held the one-methylene difference between cysteine and homocysteine.
## topic
Biochemistry
## subtopic
Amino Acids of Biological Importance
## main_concept
CON-FND-D0EDFFF1477094
## concept_ids

## contextual_concept_ids

## difficulty
Easy
## question_type
Classification
## cognitive_effort
Low
## cognitive_effort_score
0.25
## setting
Academic
## reasoning_level
1
## inferred_difficulty
75
## exam_relevance
9
## clinical_relevance
0.2
## academic_relevance
0.95
## exam_weight_by_year
KAU_Y1=0.6
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Biochemistry > Amino Acids of Biological Importance
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-AMINO-ACIDS-OF-BIOLOGICAL-IMPORTANCE
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Identify cystine as the disulfide-linked dimer of cysteine, and infer its nutritional status from cysteine rather than from methionine.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Amino Acids of Biological Importance, printed MCQ 13, page 26; printed answer key page 29, cell 13 = c.
## estimated_seconds
45
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 26; the book prints the stem across two lines and options a to d beneath it, and no repair was needed. The homocysteine/homocystine pair makes this a better item than its face value suggests, because both distractors are real molecules rather than invented ones. The nutritional inference is carried in explanation_c because it is the concept's own stated pitfall and was examined on the 2025 paper.

---

# Item

## id
QST-102-INT-MCQ-003
## title
Which of the following is a non-essential amino acid?
## question
Which of the following is a non-essential amino acid?
## vignette
Three of the four options are amino acids that fall outside the non-essential group, and they fall outside it for two different reasons.
## subject
fnd
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
D
## answer_a
Lysine
## explanation_a
Lysine is one of the nine essential amino acids — valine, leucine, isoleucine, threonine, methionine, lysine, phenylalanine, tryptophan and histidine. It is also basic aliphatic, and the pairing is worth noticing because its partner in that chemical subgroup, arginine, is *not* essential: being basic does not make an amino acid essential.
## answer_b
Leucine
## explanation_b
Leucine is essential and branched-chain. All three branched-chain amino acids happen to be essential, which tempts students into treating "branched-chain" as a nutritional label; it is a chemical one, and the coincidence is not a rule.
## answer_c
Arginine
## explanation_c
This is the option the question exists for. Arginine is neither essential nor non-essential: it is the only half-essential, or semi-essential, amino acid, formed in the body fast enough for an adult but not fast enough for a growing child or adolescent. A student who picks it has remembered that arginine is made in the body and has forgotten that it holds a category of its own.
## answer_d
Tyrosine
## explanation_d
Tyrosine is non-essential: the body makes it, sitting outside both the essential nine and the single half-essential entry. Read the four options together and the whole nutritional classification is on the page. Essential amino acids are not formed in the body at all, so a deficiency lowers the rate of growth and of protein synthesis and produces a negative nitrogen balance; there are nine, and lysine and leucine are two of them. Half-essential means formed, but not fast enough for growth, and arginine is the only member. Non-essential means formed at a rate sufficient for adults and growing children alike, mostly from carbohydrate, and tyrosine belongs there. The practical use of the list is biological value: a protein containing all the essential amino acids is of high biological value, as milk and egg are, and one deficient in even one — zein of maize, deficient in tryptophan — is of low biological value.
## topic
Biochemistry
## subtopic
Amino Acids of Biological Importance
## main_concept
CON-FND-D0EDFFF1477094
## concept_ids

## contextual_concept_ids

## difficulty
Moderate
## question_type
Classification
## cognitive_effort
Medium
## cognitive_effort_score
0.4
## setting
Academic
## reasoning_level
2
## inferred_difficulty
58
## exam_relevance
9
## clinical_relevance
0.35
## academic_relevance
0.95
## exam_weight_by_year
KAU_Y1=0.6
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Biochemistry > Amino Acids of Biological Importance
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-AMINO-ACIDS-OF-BIOLOGICAL-IMPORTANCE
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Sort named amino acids into the three nutritional groups, and distinguish half-essential from non-essential rather than collapsing the two.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Amino Acids of Biological Importance, printed MCQ 24, page 28; printed answer key page 28-29 grid, cell 24 = d.
## estimated_seconds
55
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 28. The item is stronger than a plain recall question because option c is half-essential rather than essential, so the question separates students who hold three categories from students who hold two. That is the department's own distinction, printed as its own paragraph in the book.

---

# Item

## id
QST-102-INT-MCQ-004
## title
The only half-essential amino acid is:
## question
The only half-essential amino acid is:
## vignette
This category has exactly one member, and for a clear reason: it is formed in the body fast enough for an adult and not fast enough for a growing child.
## subject
fnd
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
B
## answer_a
Alanine
## explanation_a
Alanine is non-essential and neutral aliphatic — one of the two short-chain members of that subgroup with glycine. Nothing about it is rate-limited in a growing child, which is the whole meaning of the half-essential category.
## answer_b
Arginine
## explanation_b
Arginine is the only half-essential, or semi-essential, amino acid. The definition is a rate, not a presence: half-essential amino acids *are* formed in the body, but at a rate that is enough for adults and not enough for growing children and adolescents. That is why the category exists at all and why it cannot be merged with either neighbour — an essential amino acid is not formed in the body at all, and a non-essential one is formed fast enough for anybody. Two further placements travel with arginine and are examined alongside it. Chemically it is basic aliphatic, paired with lysine; lysine is essential and arginine is not, which is the clearest demonstration in the chapter that the chemical group and the nutritional group are independent.
## answer_c
Asparagine
## explanation_c
Asparagine is non-essential, and chemically it is one of the two amides of the acidic amino acids, with glutamine. The name's resemblance to "aspartate" is doing the work here rather than any nutritional fact.
## answer_d
Aspartate
## explanation_d
Aspartate is acidic aliphatic and non-essential — and it is worth stating the wider rule directly: there is no essential acidic amino acid anywhere on the list. Aspartic acid and glutamic acid are both non-essential, so an option offering an "essential acidic amino acid" has no correct partner at all.
## topic
Biochemistry
## subtopic
Amino Acids of Biological Importance
## main_concept
CON-FND-D0EDFFF1477094
## concept_ids

## contextual_concept_ids

## difficulty
Easy
## question_type
Classification
## cognitive_effort
Low
## cognitive_effort_score
0.25
## setting
Academic
## reasoning_level
1
## inferred_difficulty
72
## exam_relevance
8
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.5
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Biochemistry > Amino Acids of Biological Importance
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-AMINO-ACIDS-OF-BIOLOGICAL-IMPORTANCE
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Name the single half-essential amino acid and state the rate argument that defines the category.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Amino Acids of Biological Importance, printed MCQ 22, page 28; printed answer key page 29, cell 22 = b.
## estimated_seconds
35
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 28. Distractors c and d are weaker than a good item deserves — asparagine is picked for its name and aspartate for its chemical group rather than for a nutritional misconception — so the explanations carry the two rules the department actually tests here: the rate definition of half-essential, and the absence of any essential acidic amino acid. Kept because arginine's status is examined directly and is the only member of its category.

---

# Item

## id
QST-102-INT-MCQ-005
## title
The polysaccharide which is used to prevent constipation:
## question
The polysaccharide which is used to prevent constipation:
## vignette
All four options are polysaccharides. Only one of them survives the gut intact, and that is the whole of the answer.
## subject
gi
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
C
## answer_a
Heparin
## explanation_a
Heparin is a glycosaminoglycan — a sulfated heteropolysaccharide — and its use is anticoagulant: it inactivates clotting factors IX and XI by binding them and acts as a catalyst for antithrombin III. It is not eaten, is not a dietary bulking agent, and has nothing to do with intestinal transit. This option catches a student sorting by "polysaccharide with a named clinical use" rather than by mechanism.
## answer_b
Glycogen
## explanation_b
It is the instructive wrong answer. Glycogen is a homopolysaccharide of glucose, exactly as cellulose is — same monomer, same class. What separates them is the linkage: glycogen uses α1,4 bonds within its branches and α1,6 at the branch points, and human amylase hydrolyses α-linkages, so glycogen is digested and absorbed. A student who picks this is sorting carbohydrates by their monomer instead of by their bond.
## answer_c
Cellulose
## explanation_c
The reason is a single Greek letter. Cellulose is a long unbranched chain of β-glucose units joined by β1,4-glucosidic linkage. Amylase, the digestive enzyme, hydrolyses only α-linkages, so nothing in the human gut can cleave a β1,4 bond and cellulose passes through undigested. Undigested cellulose increases the bulk of food, which stimulates intestinal contractions and so prevents constipation; cellulose has one further dietary consequence, delaying fat absorption. The point to carry is that the benefit comes entirely from the cellulose that is *never absorbed*: there is no human cellulase, so this is not slow digestion but no digestion at all. Starch, glycogen and cellulose are all long chains of glucose, and what makes two of them food and the third a fibre is the anomeric form of the linkage, not the length of the chain or the presence of branching.
## answer_d
Inulin
## explanation_d
Inulin is a polymer of fructose, not of glucose, and it is a polysaccharide of plant origin rather than a dietary fibre with a stated bowel action. Picking it takes "plant polysaccharide humans handle poorly" as sufficient, when the constipation claim attaches to cellulose specifically, with the β1,4 bond as the reason.
## topic
Biochemistry
## subtopic
Carbohydrates of Biological Importance
## main_concept
CON-GIT-9589A7077392FD
## concept_ids

## contextual_concept_ids

## difficulty
Easy
## question_type
Mechanism
## cognitive_effort
Low
## cognitive_effort_score
0.3
## setting
Both
## reasoning_level
2
## inferred_difficulty
74
## exam_relevance
8
## clinical_relevance
0.6
## academic_relevance
0.85
## exam_weight_by_year
KAU_Y1=0.6
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Biochemistry > Carbohydrates of Biological Importance
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-CARBOHYDRATES-OF-BIOLOGICAL-IMPORTANCE
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Explain from the β1,4-glucosidic linkage why cellulose escapes digestion, and name the dietary consequence that follows from it.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Carbohydrates of Biological Importance, printed MCQ 60, page 13; printed answer key page 15, cell 60 = c.
## estimated_seconds
45
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
OCR appended the page furniture "10 moe" to option d; the page was re-read and option d is printed as "Inulin" alone, which is what is transcribed here. The stem and the other three options needed no repair. This is the only item in the whole 614 that tests the cellulose concept; the chapter's other sixty clean items test monosaccharide classification, isomerism, disaccharide linkages and the individual glycosaminoglycans, none of which is an existing concept.

---

# Item

## id
QST-102-INT-MCQ-006
## title
The conjugation of GAGs with a protein core produces:
## question
The conjugation of GAGs with a protein core produces:
## vignette
The molecule this question names is the one that does the shock absorbing in a joint, and knowing what it is made of is the first half of knowing how it works.
## subject
fnd
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
C
## answer_a
Glycon
## explanation_a
Glycon is the sugar half of a glycoside — the term belongs to the monosaccharide-derivative section of the chapter, where a glycoside is described as a glycon joined to an aglycon. It names a part of a small molecule, not a macromolecular complex with a protein core.
## answer_b
Aglycon
## explanation_b
It is the mirror of option a: the aglycon is the non-sugar half of a glycoside. A student picking either of these has matched "sugar plus non-sugar" to the wrong pair of terms — glycoside chemistry rather than extracellular matrix chemistry.
## answer_c
Proteoglycans
## explanation_c
Most glycosaminoglycans are covalently conjugated to a protein core, and that product is a proteoglycan — formed of about 95% carbohydrate and only 5% protein. That ratio is worth holding, because it tells you where the function lives. The glycosaminoglycan chains are unbranched, usually more than fifty sugar units long, built of repeating disaccharide units of an amino sugar and a uronic acid, and it is their negatively charged carboxylate and sulfate groups that trap water and create a hydrated gel. When that gel is compressed, water is squeezed out and the molecules occupy a smaller volume; when the compression is released, they regain their original hydrated size. That reversible compressibility is the shock-absorbing property — it is why proteoglycans cushion joints and make the eyeball resilient. Note what is *not* doing the work: not the protein core, and not the sugar chains being physically springy. It is fixed negative charge holding water, and take the water away and the gel does nothing.
## answer_d
Amino sugar
## explanation_d
It is a component rather than a product. Amino sugars — glucosamine, galactosamine, mannosamine — are constituents of glycosaminoglycans, one half of each repeating disaccharide unit. Picking this answers "what is a GAG built from?" instead of "what does a GAG plus a protein core make?", which is a level of assembly lower than the stem asks for.
## topic
Biochemistry
## subtopic
Carbohydrates of Biological Importance
## main_concept
CON-FND-F32B7A523D305A
## concept_ids

## contextual_concept_ids

## difficulty
Moderate
## question_type
Mechanism
## cognitive_effort
Medium
## cognitive_effort_score
0.4
## setting
Academic
## reasoning_level
2
## inferred_difficulty
60
## exam_relevance
8
## clinical_relevance
0.5
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.6
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Biochemistry > Carbohydrates of Biological Importance
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-CARBOHYDRATES-OF-BIOLOGICAL-IMPORTANCE
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Identify the proteoglycan as a glycosaminoglycan conjugated to a protein core, and state the charge-and-water mechanism by which it absorbs shock.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Carbohydrates of Biological Importance, printed MCQ 70, page 15; printed answer key page 15, cell 70 = c.
## estimated_seconds
45
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 15, no repair needed; the answer key sits on the same page as the question and reads 70.c unambiguously. This is a partial fit and it is worth being honest about: the concept's objective is to explain shock absorption *from the charge on a proteoglycan*, and the stem tests only the structural half — what a proteoglycan is. It is kept because the concept's definition opens with exactly that sentence, and because the mechanism can be carried in explanation_c where a student meets it. No item in the 614 asks for the compressibility mechanism itself.

---

# Item

## id
QST-102-INT-MCQ-007
## title
Extrinsic pathway of apoptosis is initiated by:
## question
Extrinsic pathway of apoptosis is initiated by:
## vignette
Apoptosis has two pathways, and three of the four options below belong to the other one or to a step further downstream.
## subject
fnd
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
C
## answer_a
Caspase 9
## explanation_a
Caspase 9 is the initiator caspase of the *intrinsic* pathway — it is activated downstream of cytochrome c release from the mitochondria. Two errors are possible here and both are worth naming: putting an intrinsic component on the extrinsic side, and confusing an enzyme that is activated during a pathway with the event that starts it.
## answer_b
Caspase 8
## explanation_b
This is the closest wrong answer. Caspase 8 does belong to the extrinsic pathway, but it is activated *by* death-receptor ligation, not the initiator of it. The stem asks what initiates the pathway; the receptor binding comes first, and the caspase is its consequence. A student who picks this has the right pathway and the wrong step.
## answer_c
Binding of a ligand to TNF or FAS receptors
## explanation_c
The extrinsic pathway is initiated through binding of a ligand to the tumour necrosis factor (TNF) or FAS receptors on the cell surface. That binding activates several caspases — intracellular cysteine proteases — and activated caspases in turn activate caspase-activated DNase, the enzyme that cuts genomic DNA between the nucleosomes into fragments of about 200 base pairs or multiples of it, which is what produces the characteristic DNA ladder on electrophoresis. Set that against the intrinsic, or mitochondrial, pathway and the distinction becomes clean: the intrinsic pathway is triggered by intracellular stress, promotes release of cytochrome c from mitochondria into the cytosol, and cytochrome c then activates the caspases. So the extrinsic pathway starts at a receptor on the outside and the intrinsic pathway starts at an organelle on the inside — no receptor initiates the intrinsic one at all. The intrinsic pathway is also the one regulated by the Bcl-2 family: Bax, Bak and Bok are the apoptotic members and control cytochrome c release, and Bcl-2 and Bcl-x are the anti-apoptotic members.
## answer_d
Cytochrome c
## explanation_d
Cytochrome c is the signal of the intrinsic pathway: cellular stress promotes its release from the mitochondria into the cytosol, and the released cytochrome c activates the caspases. Picking it here is the commonest way of merging the two pathways into one — using the intrinsic trigger to start the extrinsic route.
## topic
Biochemistry
## subtopic
Cell Cycle, Apoptosis, and Tumor Suppressor Genes
## main_concept
CON-FND-1F66060A9C2625
## concept_ids

## contextual_concept_ids

## difficulty
Moderate
## question_type
Mechanism
## cognitive_effort
Medium
## cognitive_effort_score
0.45
## setting
Academic
## reasoning_level
2
## inferred_difficulty
58
## exam_relevance
9
## clinical_relevance
0.5
## academic_relevance
0.95
## exam_weight_by_year
KAU_Y1=0.6
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Biochemistry > Cell Cycle, Apoptosis, and Tumor Suppressor Genes
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-CELL-CYCLE-APOPTOSIS-AND-TUMOR-SUPPRESSOR-GENES
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Assign the TNF and FAS receptors to the initiation of the extrinsic apoptotic pathway, and distinguish an initiating event from a downstream effector.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Cell Cycle and Apoptosis, printed MCQ 10, page 78; printed answer key page 79, cell 10 = c.
## estimated_seconds
50
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 78, no repair needed. Every distractor here is a real component of the apoptotic machinery, which is what makes the item worth keeping: none of them is wrong because it is absurd, each is wrong because it sits on the other pathway or one step too late. Option b is the discriminating one.

---

# Item

## id
QST-102-INT-MCQ-008
## title
One of these is pro-apoptotic gene:
## question
One of these is pro-apoptotic gene:
## vignette
The family in this question is named after its best-known member, and that member does the opposite of what the family name suggests to most students.
## subject
fnd
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
A
## answer_a
Bax
## explanation_a
Bax is one of the apoptotic members of the Bcl-2 family, with Bak and Bok. They exert their effect by controlling the release of cytochrome c from the mitochondria into the cytosol — the step that starts the intrinsic pathway — and under physiological conditions they sit in balance with the anti-apoptotic members of the same family, Bcl-2 and Bcl-x. Bax has a second appearance in this chapter that is worth carrying: p53, the guardian of the genome, behaves differently according to how badly the DNA is damaged. With moderate damage, phosphorylated p53 acts as a transcription factor for p21, p21 inhibits the CDK2-cyclin E complex, and the cycle arrests in G1 so the cell can repair itself. With severe damage, the same phosphorylated p53 activates the Bax gene and the cell is killed instead. So Bax is the executioner arm of p53, which is why the two are examined together.
## answer_b
BCL-2
## explanation_b
This is the misconception the item exists to catch. The whole family is named after Bcl-2, which is exactly why students read the name as meaning "apoptotic". Bcl-2 itself is the *anti*-apoptotic member, with Bcl-x; it opposes cytochrome c release. The family name says nothing about the direction of any individual member's action.
## answer_c
Bcl-x
## explanation_c
Bcl-x is the other anti-apoptotic member of the family, alongside Bcl-2. A student who picks this is sorting by name similarity — anything beginning "Bcl" — rather than by the two-column division: Bax, Bak and Bok on the apoptotic side; Bcl-2 and Bcl-x on the anti-apoptotic side.
## answer_d
MYC
## explanation_d
MYC is an oncogene rather than a member of the Bcl-2 family at all, so it belongs to neither column. It is the only option here that is not a Bcl-2 family protein, which makes it the option a student picks when they have not recognised the family and are choosing the unfamiliar name.
## topic
Biochemistry
## subtopic
Cell Cycle, Apoptosis, and Tumor Suppressor Genes
## main_concept
CON-FND-1F66060A9C2625
## concept_ids

## contextual_concept_ids

## difficulty
Moderate
## question_type
Classification
## cognitive_effort
Medium
## cognitive_effort_score
0.4
## setting
Academic
## reasoning_level
2
## inferred_difficulty
62
## exam_relevance
9
## clinical_relevance
0.5
## academic_relevance
0.95
## exam_weight_by_year
KAU_Y1=0.6
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Biochemistry > Cell Cycle, Apoptosis, and Tumor Suppressor Genes
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-CELL-CYCLE-APOPTOSIS-AND-TUMOR-SUPPRESSOR-GENES
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Assign each named member of the Bcl-2 family to the pro-apoptotic or anti-apoptotic side, and state what the family controls.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Cell Cycle and Apoptosis, printed MCQ 14, page 78; printed answer key page 79, cell 14 = a.
## estimated_seconds
40
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 78. OCR read option c as "Bel-x"; there is no protein of that name and the department means Bcl-x, so the printed word has been restored. Option b is left as the book's own "BCL-2" capitalisation. Distractor b is the concept's stated pitfall, printed in the concept record as such, which is the main reason this item was chosen over the mirror-image item 15 on the following page.

---

# Item

## id
QST-102-INT-MCQ-009
## title
Cyclin B forms complex with:
## question
Cyclin B forms complex with:
## vignette
The cell cycle is driven by pairs: each cyclin pairs with the kinase it activates and with the transition that pair carries.
## subject
fnd
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
A
## answer_a
CDK1
## explanation_a
CDK1-cyclin B, together with CDK1-cyclin A, drives the transition from G2 to M. The general rule is that cyclins complex with and activate particular cyclin-dependent kinases, and each complex produces the regulatory effect that carries the cell from one phase to the next: there are at least ten cyclins, designated A, B and so on, and at least eight CDKs, CDK1 to CDK8, acting in specific combinations at specific points. Learn the three pairings together, because they map onto the cycle in order. CDK4-cyclin D and CDK6-cyclin D drive progression past the restriction point at the G1/S boundary. CDK2-cyclin E and CDK2-cyclin A initiate DNA synthesis in early S phase. CDK1-cyclin A and CDK1-cyclin B drive G2 to M. Note that this is what a CDK does, and it is not what a checkpoint does: the CDK-cyclin complexes drive the transitions, while the G1 checkpoint (cell size, nutrients, growth factors, DNA damage), the G2 checkpoint (cell size, DNA damage) and the spindle assembly checkpoint are the surveillance that decides whether a transition should be allowed.
## answer_b
CDK2
## explanation_b
CDK2 partners cyclin E and cyclin A, and its complexes initiate DNA synthesis in early S phase. It is also the kinase that p21 inhibits when p53 arrests a moderately damaged cell in G1 — so CDK2 belongs to the G1/S part of the cycle, not to the G2/M transition cyclin B carries.
## answer_c
CDK4
## explanation_c
CDK4 partners cyclin D, and CDK4-cyclin D drives the cell past the restriction point in late G1. Picking it puts cyclin B at the start of the cycle instead of the end, which is the commonest way of scrambling this list — the letters of the cyclins do not run in the same order as the phases.
## answer_d
CDK6
## explanation_d
CDK6 also partners cyclin D and also acts at the G1/S restriction point, so it is the twin of option c. A student picking either has remembered that cyclin D has two kinase partners and has attached cyclin B to that pair instead of to CDK1.
## topic
Biochemistry
## subtopic
Cell Cycle, Apoptosis, and Tumor Suppressor Genes
## main_concept
CON-FND-1F66060A9C2625
## concept_ids

## contextual_concept_ids

## difficulty
Hard
## question_type
Mechanism
## cognitive_effort
High
## cognitive_effort_score
0.6
## setting
Academic
## reasoning_level
2
## inferred_difficulty
38
## exam_relevance
7
## clinical_relevance
0.35
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.5
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Biochemistry > Cell Cycle, Apoptosis, and Tumor Suppressor Genes
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-CELL-CYCLE-APOPTOSIS-AND-TUMOR-SUPPRESSOR-GENES
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Pair each cyclin with its cyclin-dependent kinase and with the cell-cycle transition that pair drives, and separate the driving complexes from the checkpoints.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Cell Cycle and Apoptosis, printed MCQ 6, page 77; printed answer key page 79, cell 6 = a.
## estimated_seconds
55
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 77. Rated Hard because all four options are real CDKs and the discrimination is pure recall of a table with no derivable pattern — the letters of the cyclins do not track the order of the phases. Every distractor names the transition its own kinase actually carries, so a student who misses this still leaves with the whole table.

---

# Item

## id
QST-102-INT-MCQ-010
## title
DNA strands run in relation to each other
## question
DNA strands run in relation to each other
## vignette
One word, and it is the first of the five characteristics of the double helix.
## subject
fnd
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
A
## answer_a
Antiparallel
## explanation_a
The two strands of DNA run antiparallel — one runs 5' to 3' where the other runs 3' to 5' — are paired to each other, and coil around a common axis to form a right-handed helix. Antiparallel is not a decorative detail; it is what makes complementary base pairing geometrically possible, and it is why a DNA polymerase, which reads a template only 3' to 5' and therefore builds only 5' to 3', can copy one strand continuously and must copy the other in fragments. The other four characteristics of the helix travel with this one: the strands are held together by complementary base pairing through specific hydrogen bonds, two between adenine and thymine and three between guanine and cytosine; the stacked base pairs are stabilised inside the helix by Van der Waals forces and hydrophobic interactions; the whole resembles a spiral staircase whose steps are the base pairs and whose handrails are the sugar-phosphate backbones; and the helix is 2 nm wide with a major groove of 2.2 nm and a minor groove of 1.2 nm through which drugs and proteins reach the bases without opening the helix.
## answer_b
Parallel
## explanation_b
It is the only distractor here with a real misconception behind it: a student picturing two strands drawn side by side on a page, with no attention to which end of each is 5'. Parallel strands cannot base-pair, because the bases would not face each other across the axis. The 2025 exam paper put "parallel" and "antiparallel" in the same completion-question word bank, which is a good sign of how often the two are swapped.
## answer_c
Perpendicular
## explanation_c
Perpendicular describes the relationship of the *bases* to the backbone — the nitrogenous bases are linked to the pentoses and project to the inside of the two strands at right angles. Picking this transfers a true statement about one part of the structure to the wrong part of it.
## answer_d
Horizontal
## explanation_d
Horizontal is not a relationship between two strands at all; it is a statement about how a diagram happens to be drawn on a page. An option like this discriminates only between students who have read the chapter and students who have not.
## topic
Biochemistry
## subtopic
Chemistry of Nucleic Acids
## main_concept
CON-FND-5BAF472E54A764
## concept_ids

## contextual_concept_ids

## difficulty
Easy
## question_type
Mechanism
## cognitive_effort
Low
## cognitive_effort_score
0.2
## setting
Academic
## reasoning_level
1
## inferred_difficulty
82
## exam_relevance
9
## clinical_relevance
0.15
## academic_relevance
0.95
## exam_weight_by_year
KAU_Y1=0.6
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Biochemistry > Chemistry of Nucleic Acids
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-CHEMISTRY-OF-NUCLEIC-ACIDS
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
State the orientation of the two DNA strands relative to each other and explain why that orientation is a precondition for base pairing.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Chemistry of Nucleic Acids, printed MCQ 15, page 55; printed answer key page 55, cell 15 = a.
## estimated_seconds
30
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 55; the book prints the stem without a colon and with a full stop, which OCR dropped, and the wording is otherwise unaltered. Options c and d are weak, so the explanations do the teaching that the options do not: c is redirected to the true statement it borrows from, and the correct answer carries the four remaining characteristics of the helix. The answer key is printed on the same page and reads 15.a.

---

# Item

## id
QST-102-INT-MCQ-011
## title
DNA rich in G-C pairs have:
## question
DNA rich in G-C pairs have:
## vignette
This is the second of the double helix's five characteristics, and it is the one that explains why heat alone can separate the strands.
## subject
fnd
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
C
## answer_a
1 Hydrogen bond
## explanation_a
No base pair in DNA is held by a single hydrogen bond. A student picking this has read the question as being about the number of bonds between two *nucleotides along a strand*, where a single phosphodiester bond does the joining — but that bond is covalent and runs along the backbone, not across the helix.
## answer_b
2 Hydrogen bonds
## explanation_b
It is the discriminating distractor: two hydrogen bonds hold adenine to thymine, not guanine to cytosine. This is the whole of the misconception — the numbers have been remembered and attached to the wrong pair. The pair with the extra bond is G-C.
## answer_c
3 Hydrogen bonds
## explanation_c
Guanine pairs with cytosine through three hydrogen bonds, and adenine pairs with thymine through two. Two consequences follow and both are examinable. First, DNA rich in G-C is more stable and needs more heat to separate, because there are more bonds per step to break — heating DNA ruptures the hydrogen bonds and separates the strands, which is DNA denaturation, and cooling reanneals them, which is the first step of the polymerase chain reaction. Second, and more important for the exam, the bond holding the two strands to each other is a *hydrogen* bond and not a covalent one. Along each strand the nucleotides are joined by phosphodiester bonds, which are covalent; across the two strands there is nothing but hydrogen bonding, plus the Van der Waals and hydrophobic forces that stack the base pairs. If the join between the strands were covalent, heat alone could not separate them and replication would be impossible.
## answer_d
4 Hydrogen bonds
## explanation_d
Four is not a number the chapter uses for any base pair. It is picked by extrapolating a pattern — two for the smaller pair, three for the next, so four for something bigger — rather than by recalling the two correct figures.
## topic
Biochemistry
## subtopic
Chemistry of Nucleic Acids
## main_concept
CON-FND-5BAF472E54A764
## concept_ids

## contextual_concept_ids

## difficulty
Easy
## question_type
Mechanism
## cognitive_effort
Low
## cognitive_effort_score
0.25
## setting
Academic
## reasoning_level
1
## inferred_difficulty
76
## exam_relevance
9
## clinical_relevance
0.2
## academic_relevance
0.95
## exam_weight_by_year
KAU_Y1=0.6
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Biochemistry > Chemistry of Nucleic Acids
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-CHEMISTRY-OF-NUCLEIC-ACIDS
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Give the number of hydrogen bonds in each DNA base pair and name the bond that holds the two strands to each other.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Chemistry of Nucleic Acids, printed MCQ 4, page 53; printed answer key page 55, cell 4 = c.
## estimated_seconds
30
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
OCR ran the numeral into the word in every option — "1lHydrogen bond", "2Hydrogen bonds" — and the page was re-read to restore the space the book prints. No wording is changed. The chapter's MCQ 20 asks the same fact from the A-T side; only one of the pair is transcribed here, because two items testing one number in opposite directions is repetition rather than coverage.

---

# Item

## id
QST-102-INT-MCQ-012
## title
A Piece of double stranded DNA has 30% A, what will be the % of G?
## question
A Piece of double stranded DNA has 30% A, what will be the % of G?
## vignette
Nothing is given except one base composition. Everything else has to come from the pairing rule.
## subject
fnd
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
C
## answer_a
%30
## explanation_a
This assumes the four bases are present in equal proportions, or simply copies the figure in the stem. Base pairing fixes A equal to T and G equal to C, but it says nothing at all about how the two *pairs* share the remaining total — that is a property of the particular piece of DNA, and here it has to be calculated.
## answer_b
%40
## explanation_b
This is what you get from 100 − 30 − 30 = 40 treated as the answer, that is, subtracting A and T and then handing the whole remainder to G alone. The remainder belongs to G *and* C together, and since G equals C it has to be halved.
## answer_c
%20
## explanation_c
The reasoning is three steps. Adenine pairs only with thymine and guanine only with cytosine, so in double-stranded DNA A = T and G = C. If A is 30%, then T is also 30%, and A + T together account for 60%. The remaining 40% is shared between G and C, and because they are equal, each is 20%. Notice what the question is really testing: it is complementary base pairing used as an arithmetic constraint rather than recited as a fact, which is exactly the step that separates a student who has memorised "A pairs with T" from one who has understood why the two strands are complements of each other. The same rule underlies the constant ratio (A+G)/(T+C) the chapter asks about elsewhere — purines equal pyrimidines in any double-stranded molecule — and the same rule is what lets one strand act as the template for the other during replication.
## answer_d
%70
## explanation_d
Seventy is 100 − 30, that is, the whole of the DNA that is not adenine. It ignores thymine entirely and hands everything else to guanine, so it is the same error as option b made one step earlier.
## topic
Biochemistry
## subtopic
Chemistry of Nucleic Acids
## main_concept
CON-FND-5BAF472E54A764
## concept_ids

## contextual_concept_ids

## difficulty
Hard
## question_type
Mechanism
## cognitive_effort
High
## cognitive_effort_score
0.65
## setting
Academic
## reasoning_level
3
## inferred_difficulty
42
## exam_relevance
7
## clinical_relevance
0.1
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.4
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Biochemistry > Chemistry of Nucleic Acids
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-CHEMISTRY-OF-NUCLEIC-ACIDS
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Apply complementary base pairing quantitatively to derive an unknown base composition in double-stranded DNA.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Chemistry of Nucleic Acids, printed MCQ 16, page 55; printed answer key page 55, cell 16 = c.
## estimated_seconds
75
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 55, including the book's own "%30" ordering of sign and numeral. Rated Hard rather than Moderate because both wrong-answer routes — forgetting T, and forgetting to halve the remainder — are arithmetically natural and produce two of the four printed options. This is the only calculation item in the batch, and it is kept because it tests the concept's own content rather than a separate skill.

---

# Item

## id
QST-102-INT-MCQ-013
## title
In eukaryotes, which of the following DNA polymerases is required for mitochondrial DNA replication?
## question
In eukaryotes, which of the following DNA polymerases is required for mitochondrial DNA replication?
## vignette
Five eukaryotic DNA polymerases share the work of replication and repair, each with exactly one job.
## subject
fnd
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
D
## answer_a
DNA polymerase α
## explanation_a
DNA polymerase α, working as the α-primase complex, lays down the RNA primers and the short stretch of DNA attached to them. It starts chains; it does not copy a genome. A student picking it has remembered that α comes first alphabetically and has mapped that onto "the polymerase that does the main job", which is not how the work is divided among the five polymerases.
## answer_b
DNA polymerase β
## explanation_b
DNA polymerase β is the repair polymerase: in the four steps of DNA repair — endonuclease recognises and nicks, exonuclease excises, polymerase fills, ligase seals — β is the one that fills the gap. It is not the gap-filler at the replication fork either; that is δ, a clear division of labour between the two.
## answer_c
DNA polymerase δ
## explanation_c
DNA polymerase δ synthesises the lagging strand, discontinuously and from many primers, and afterwards fills the gaps between Okazaki fragments once RNase H has removed those primers. It is a nuclear replication enzyme, and the stem asks for the mitochondrial one.
## answer_d
DNA polymerase γ
## explanation_d
DNA polymerase γ synthesises mitochondrial DNA, and it is the only one of the five with a job outside the nucleus. Hold the list as five names and five jobs, tested as an enumeration: α, as the α-primase complex, makes the RNA primers and the short DNA attached to them; β repairs DNA; γ synthesises mitochondrial DNA; δ synthesises the lagging strand; ε synthesises the leading strand. Delta and epsilon also proofread, removing a misplaced nucleotide by exonuclease action and replacing it, because a misread template would become a permanent mutation. Why mitochondria need their own polymerase at all follows from the nucleic-acids chapter: mitochondrial DNA is a separate small double-stranded circular supercoil, 0.3 to 1% of total cellular DNA, coding for 2 ribosomal RNAs, 22 transfer RNAs and 13 proteins of oxidative phosphorylation, and it is replicated inside the organelle rather than in the nucleus.
## topic
Biochemistry
## subtopic
DNA Synthesis (Replication) and Repair
## main_concept
CON-FND-A73C06E0EC3C1D
## concept_ids

## contextual_concept_ids

## difficulty
Moderate
## question_type
Mechanism
## cognitive_effort
Medium
## cognitive_effort_score
0.45
## setting
Academic
## reasoning_level
2
## inferred_difficulty
58
## exam_relevance
9
## clinical_relevance
0.3
## academic_relevance
0.95
## exam_weight_by_year
KAU_Y1=0.6
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Biochemistry > DNA Synthesis (Replication) and Repair
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-DNA-SYNTHESIS-REPLICATION-AND-REPAIR
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Name the eukaryotic DNA polymerase responsible for mitochondrial DNA and give the specific job of each of the other four.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter DNA Synthesis (Replication) and Repair, printed MCQ 15, page 59; printed answer key page 60, cell 15 = d.
## estimated_seconds
50
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
The book prints the Greek letters α, β, δ and γ; OCR rendered them "oa.", "B", "6" and "y", and they are restored here to the letters the page shows. Nothing else in the stem or options is altered. Every distractor names a real polymerase with a real, different job, and each explanation gives that job, so the item teaches the whole five-way division whichever option a student picks.

---

# Item

## id
QST-102-INT-MCQ-014
## title
The DNA polymerase involved in synthesis of the leading strand in eukaryotes is:
## question
The DNA polymerase involved in synthesis of the leading strand in eukaryotes is:
## vignette
Two of the five polymerases work at the fork itself, one on each new strand, and they are the pair most often swapped.
## subject
fnd
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
D
## answer_a
DNA polymerase α
## explanation_a
DNA polymerase α is the primer-maker: as the α-primase complex it synthesises the RNA primers and the short stretch of DNA attached to them, on both strands. It is present at the fork but it starts chains rather than extending them into a whole strand.
## answer_b
DNA polymerase β
## explanation_b
DNA polymerase β repairs DNA — it is the polymerase that fills the gap after an endonuclease has nicked the damaged strand and an exonuclease has excised the lesion. It has no role in normal replication at the fork at all.
## answer_c
DNA polymerase δ
## explanation_c
This is the swap the item is built to catch. Delta makes the *lagging* strand, not the leading one. The two are worth separating by the number of primers each needs rather than by their names: δ works on the template that runs the wrong way relative to the fork, so it has to wait for more template to be exposed and start again each time, which is why it needs many primers and produces Okazaki fragments of 100 to 200 bases. Epsilon works on the template the fork exposes continuously and needs only one primer.
## answer_d
DNA polymerase ε
## explanation_d
DNA polymerase ε synthesises the leading strand: it requires only one RNA primer, copies in the direction of the advancing replication fork, and synthesises continuously in the 5' to 3' direction. Its partner δ synthesises the lagging strand, requires multiple RNA primers, copies in the direction opposite to the fork's advance, and synthesises discontinuously as Okazaki fragments; δ then fills the gaps between those fragments after RNase H has removed the primers, and DNA ligase joins the ends. Both ε and δ proofread by exonuclease activity, removing a misplaced nucleotide and replacing it, because an uncorrected misreading would become a permanent mutation. The reason the fork needs two different polymerases at all is worth stating once: both new strands must be built 5' to 3', but the two templates run antiparallel, so only one of them can be read continuously as the fork opens — and every restart on the other needs its own primer.
## topic
Biochemistry
## subtopic
DNA Synthesis (Replication) and Repair
## main_concept
CON-FND-A73C06E0EC3C1D
## concept_ids
CON-FND-5BAF472E54A764
## contextual_concept_ids

## difficulty
Hard
## question_type
Mechanism
## cognitive_effort
High
## cognitive_effort_score
0.6
## setting
Academic
## reasoning_level
3
## inferred_difficulty
44
## exam_relevance
9
## clinical_relevance
0.25
## academic_relevance
0.95
## exam_weight_by_year
KAU_Y1=0.6
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Biochemistry > DNA Synthesis (Replication) and Repair
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-DNA-SYNTHESIS-REPLICATION-AND-REPAIR
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Assign DNA polymerases δ and ε to the lagging and leading strands respectively, and justify the assignment from the antiparallel geometry of the fork.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter DNA Synthesis (Replication) and Repair, printed MCQ 16, page 59; printed answer key page 60, cell 16 = d.
## estimated_seconds
55
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Greek letters restored as in the previous item: OCR read them "o", "B", "6" and "¢". Rated Hard because δ and ε are the concept's own stated pitfall and the two options are adjacent letters with no mnemonic separating them; the explanations therefore give the primer-count argument, which is derivable and sticks where the letters do not. CON-FND-5BAF472E54A764 is listed as also-assessed because answering correctly for the right reason requires the antiparallel arrangement of the two strands.

---

# Item

## id
QST-102-INT-MCQ-015
## title
If the amount of substrate is not limiting, the velocity of reaction is directly proportional to:
## question
If the amount of substrate is not limiting, the velocity of reaction is directly proportional to:
## vignette
Five factors set the rate of an enzyme-catalysed reaction. The clause "if the amount of substrate is not limiting" removes one of them and points at another.
## subject
fnd
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
A
## answer_a
Concentration of enzymes
## explanation_a
Velocity is directly proportional to enzyme concentration, up to a point beyond which further enzyme adds no velocity — and at that point the substrate has become the limiting factor. The stem removes exactly that ceiling by stipulating that substrate is not limiting, which leaves enzyme concentration as the variable velocity tracks. Read the five factors as two kinds of argument and this becomes derivable rather than memorised. Substrate concentration, enzyme concentration and cofactor concentration are *limiting-factor* arguments: velocity rises until whatever else is needed runs out. Raise substrate and velocity rises to Vmax as the enzyme saturates, and then the enzyme concentration limits it; raise enzyme, and eventually substrate limits it; raise cofactor, and once every enzyme molecule has its cofactor the enzyme limits it. Temperature and pH are *optimum* arguments: velocity rises to a peak and then falls, because past the peak the protein itself is being damaged. Only one factor is varied at a time, and the rate is measured as the initial velocity, before substrate has fallen and product accumulated.
## answer_b
Temperature
## explanation_b
The word that makes it wrong is "directly proportional". Temperature does affect the rate, but not proportionally and not monotonically: velocity rises with temperature up to an optimum near 37 °C for most animal enzymes, and beyond that it falls, because the enzyme protein denatures and the organisation of the catalytic site is disrupted, with activity virtually stopping around 70 °C. A relationship that reverses direction is not a proportionality.
## answer_c
Concentration of products
## explanation_c
It inverts the sign. Accumulating product does not drive an enzyme faster; it is why the rate is measured as the initial velocity, at the very beginning of the reaction, before product accumulates and the reaction approaches equilibrium. Note also that an enzyme does not change where the reaction ends up — it lowers the activation energy and speeds the approach to equilibrium, leaving ΔG and the equilibrium position untouched.
## answer_d
Ph
## explanation_d
For the same reason as temperature: pH is an optimum relationship, not a proportional one. Each enzyme has an optimum pH at which it is maximally active, most falling between 5 and 9, and activity falls away on either side of it, virtually stopping about two pH units above or below. Raising pH does not raise velocity.
## topic
Biochemistry
## subtopic
Enzymes
## main_concept
CON-FND-F29934C070A94C
## concept_ids

## contextual_concept_ids

## difficulty
Moderate
## question_type
Mechanism
## cognitive_effort
Medium
## cognitive_effort_score
0.5
## setting
Academic
## reasoning_level
3
## inferred_difficulty
55
## exam_relevance
9
## clinical_relevance
0.2
## academic_relevance
0.95
## exam_weight_by_year
KAU_Y1=0.6
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Biochemistry > Enzymes
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-ENZYMES
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Name the five factors affecting the rate of an enzyme-catalysed reaction and say which of them stands in a proportional relationship to velocity and which stands in an optimum relationship.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Enzymes, printed MCQ 16, page 47; printed answer key page 49, cell 16 = a.
## estimated_seconds
55
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 47, including the book's own "Ph" for pH in option d, which is left as printed. Two of the distractors are genuine factors from the same five-item list, so the item discriminates on the *shape* of each relationship rather than on membership of the list — which is what makes it worth more than the same chapter's MCQ 10, whose correct option is a bundle of three factors and whose other three options are each individually true.

---

# Item

## id
QST-102-INT-MCQ-016
## title
Concerning effect of pH on the catalytic activity of the enzymes:
## question
Concerning effect of pH on the catalytic activity of the enzymes:
## vignette
pH is one of the five factors affecting enzyme velocity, and it is one of the two whose relationship to velocity has a peak rather than a slope.
## subject
fnd
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
B
## answer_a
Activity increases as we go away from the optimum pH
## explanation_a
It states the relationship backwards. The optimum pH is by definition the pH at which the enzyme shows maximal activity, so moving away from it can only lower activity — enzyme activity virtually stops about two pH units above or below the optimum. A student picking this has read "optimum" as a threshold to be exceeded rather than as a peak.
## answer_b
Changes of pH alter the charges on the substrate and the active site
## explanation_b
This is the mechanism behind the whole factor. Slight changes in pH cause marked changes in activity by altering the charges on the substrate and on the catalytic site — and since the fit between the two depends on complementary chemistry as well as complementary shape, changing those charges changes how well the substrate binds and how well catalysis proceeds. Extreme changes of pH do something different and worse: they denature the enzyme protein, which is an irreversible inhibition rather than a reversible loss of activity. That two-tier structure is the point to hold — slight change alters charge and is reversible, extreme change denatures and is not. Most enzymes have an optimum pH between 5 and 9, with one clear exception: pepsin, the stomach's digestive enzyme, is maximally active at pH 2, and enzymes built to work at neutral pH are denatured in that environment.
## answer_c
Extreme changes of pH don't affect the catalytic activity
## explanation_c
It is the strongest form of the misconception. Extreme changes of pH have the largest effect of all: they denature the enzyme protein, disorganising the catalytic site and causing irreversible inhibition. A student picking this may be generalising from the fact that a protein can be moved a little either side of its optimum without much harm.
## answer_d
Pepsin is maximally active at alkaline pH (above 7)
## explanation_d
It inverts the named exception. Pepsin works in the stomach and is maximally active at pH 2. The likely route to this answer is remembering that pepsin is the exception to the "optimum between 5 and 9" rule without remembering in which direction it is exceptional — and the stomach, which is where pepsin works, settles that.
## topic
Biochemistry
## subtopic
Enzymes
## main_concept
CON-FND-F29934C070A94C
## concept_ids

## contextual_concept_ids

## difficulty
Moderate
## question_type
Mechanism
## cognitive_effort
Medium
## cognitive_effort_score
0.45
## setting
Academic
## reasoning_level
2
## inferred_difficulty
57
## exam_relevance
8
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.5
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Biochemistry > Enzymes
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-ENZYMES
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Explain how pH changes alter enzyme velocity, and distinguish a slight change that alters charge from an extreme change that denatures.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Enzymes, printed MCQ 12, page 46; printed answer key page 49, cell 12 = b.
## estimated_seconds
55
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 46; the book's own "don't" is left as printed. All three distractors carry nameable misconceptions — optimum read as a threshold, extreme pH read as harmless, and the pepsin exception remembered without its direction — which is why this item was kept over the chapter's several thinner pH questions.

---

# Item

## id
QST-102-INT-MCQ-017
## title
The pH level where the enzyme is most active is known as
## question
The pH level where the enzyme is most active is known as
## vignette
One word of vocabulary, and it is the word the rest of the pH section depends on.
## subject
fnd
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
C
## answer_a
Standard
## explanation_a
"Standard" describes a reference condition chosen for comparison, not a value at which a particular enzyme performs best. Nothing in the chapter attaches it to enzyme activity.
## answer_b
Equilibrium
## explanation_b
It confuses two things the chapter is careful to separate. Equilibrium is where a reaction ends up, and an enzyme accelerates a reaction without affecting its equilibrium point — it lowers the activation energy and leaves ΔG unchanged. The optimum pH is about how fast the enzyme works, not about where the reaction settles.
## answer_c
Optimum
## explanation_c
Each enzyme has an optimum pH at which it shows maximal activity, and activity decreases away from it in both directions, virtually stopping about two pH units above or below. Most enzymes have an optimum pH between 5 and 9; pepsin, working in the stomach, is the named exception at pH 2. The same word is used for temperature, and for the same reason: the optimum temperature is about 37 °C for most animal enzymes and about 50 °C for most plant enzymes, with activity virtually stopping near 70 °C as the protein denatures. Both are peaks, and that is what separates them from the three concentration factors — substrate, enzyme and cofactor — where velocity rises until something else becomes limiting and then simply plateaus.
## answer_d
Neutral
## explanation_d
It assumes that every enzyme peaks at pH 7 because most of the body sits near there. Most enzymes have an optimum somewhere between 5 and 9, which is a range rather than a point, and pepsin's optimum of pH 2 shows how far outside neutrality an optimum can lie.
## topic
Biochemistry
## subtopic
Enzymes
## main_concept
CON-FND-F29934C070A94C
## concept_ids

## contextual_concept_ids

## difficulty
Easy
## question_type
Mechanism
## cognitive_effort
Low
## cognitive_effort_score
0.2
## setting
Academic
## reasoning_level
1
## inferred_difficulty
84
## exam_relevance
6
## clinical_relevance
0.2
## academic_relevance
0.85
## exam_weight_by_year
KAU_Y1=0.4
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Biochemistry > Enzymes
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-ENZYMES
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Define the optimum pH of an enzyme and recognise that temperature has an optimum in the same sense, unlike the three concentration factors.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Enzymes, printed MCQ 11, page 46; printed answer key page 49, cell 11 = c.
## estimated_seconds
25
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 46, stem printed without a colon. A vocabulary item and rated Easy accordingly; it is included because the batch needs a proportion of low-difficulty items and because option b carries a real confusion — rate against equilibrium — that the chapter states explicitly.

---

# Item

## id
QST-102-INT-MCQ-018
## title
Snake venom causes hemolysis of RBCs due to activation of the following enzyme:
## question
Snake venom causes hemolysis of RBCs due to activation of the following enzyme:
## vignette
All four options are lipid-handling enzymes. Only one of them attacks the phospholipid of a cell membrane.
## subject
mul
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
C
## answer_a
Cholesteryl ester esterase
## explanation_a
This enzyme hydrolyses cholesteryl esters — the waxes formed from cholesterol and a fatty acid — releasing free cholesterol. Cholesteryl esters are not structural components of the red cell membrane bilayer in the way phospholipids are, and hydrolysing them does not rupture a membrane.
## answer_b
Hormone sensitive lipase
## explanation_b
Hormone-sensitive lipase acts on stored triacylglycerol in adipose tissue, releasing fatty acids — it is the enzyme of lipolysis, which is a metabolic process in fat cells and not an attack on a membrane. This option catches a student sorting by "enzyme that breaks down a lipid" without asking which lipid, and in which structure.
## answer_c
Lecithinase
## explanation_c
Snake venom toxins contain a lecithinase enzyme with phospholipase A2 activity. Injected into the blood, it converts the phospholipids present in the cell membranes of red blood cells into lysophospholipids, and a lysophospholipid cannot hold a bilayer together, so the membrane ruptures — that is the haemolysis. Untreated, snake venom toxins cause death, and the treatment is antitoxin; no dose is printed and none is added here. Two details make this answer secure rather than merely plausible. The glycerophospholipids are hydrolysed by a family of phospholipases — PLA1, PLA2, PLC and PLD — each named for the bond it attacks, and the venom's activity is specifically A2, which is why the product named in the answer is a *lyso*phospholipid. And phospholipase D is not the answer under any circumstances: it is absent from humans and present only in plants.
## answer_d
Phosphatase
## explanation_d
A phosphatase removes a phosphate group from a substrate — it is the counterpart of a kinase in covalent modification, not a membrane-destroying enzyme. Picking it takes "phospholipids contain phosphate" as sufficient, without asking which bond has to be cleaved to break a bilayer.
## topic
Biochemistry
## subtopic
Lipids of Biological Importance
## main_concept
CON-MUL-4749CA1B14B669
## concept_ids

## contextual_concept_ids

## difficulty
Moderate
## question_type
Mechanism
## cognitive_effort
Medium
## cognitive_effort_score
0.45
## setting
Both
## reasoning_level
2
## inferred_difficulty
58
## exam_relevance
9
## clinical_relevance
0.7
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.6
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Biochemistry > Lipids of Biological Importance
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-LIPIDS-OF-BIOLOGICAL-IMPORTANCE
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Name the venom enzyme responsible for haemolysis, classify its activity, and explain from the product why the red cell membrane ruptures.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Lipids of Biological Importance, printed MCQ 23, page 20; printed answer key page 22, cell 23 = c.
## estimated_seconds
50
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 20. The department examined this same content as a 3-mark "explain on a biochemical basis" question on the 2025 paper, which is why the concept exists; this MCQ tests the naming half of it, and the mechanism is carried in explanation_c. The concept's pitfall — naming phospholipase D — is not one of the printed options, so it is stated in the explanation instead of being left to a distractor.

---

# Item

## id
QST-102-INT-MCQ-019
## title
Which of the following fatty acids is a precursor for eicosanoids?
## question
Which of the following fatty acids is a precursor for eicosanoids?
## vignette
The eicosanoid pathway begins at a membrane phospholipid and passes through a single fatty acid before it forks in two.
## subject
fnd
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
C
## answer_a
Stearic acid
## explanation_a
Stearic acid is a saturated, non-essential fatty acid. Eicosanoids are made from *polyunsaturated* fatty acids with twenty carbons, and a saturated chain has no double bonds at all, so it cannot be cyclised or oxygenated into any of these products.
## answer_b
Palmitic acid
## explanation_b
Palmitic acid is the commonest saturated fatty acid in the diet and, like stearic acid, has no double bonds. This option and option a fail for the same reason, which is worth noticing: the eicosanoid precursor is defined by its degree of unsaturation and its chain length together, not by abundance.
## answer_c
Arachidonic acid
## explanation_c
Eicosanoids are physiologically active compounds formed from polyunsaturated fatty acids with twenty carbons, and arachidonic acid is the standard example. It reaches the pathway two ways: it is liberated from membrane phospholipids by phospholipase A2, or it is synthesised from the ω-6 essential fatty acid linoleate. From arachidonic acid the pathway forks, and the fork is what the whole chapter turns on. Prostaglandin H synthase makes the *cyclic* compounds — prostaglandins, prostacyclins and thromboxanes — and it carries two catalytic activities, cyclooxygenase and peroxidase. Lipoxygenase makes the *acyclic* compounds, the leukotrienes and the lipoxins. Everything clinical in the chapter follows from which side of that fork a drug or a mediator sits on.
## answer_d
Lignoceric acid
## explanation_d
Lignoceric acid is a very-long-chain saturated fatty acid of twenty-four carbons. It fails the test twice over: too long, and saturated. It is the option that catches a student who has remembered that eicosanoid precursors are long-chain without remembering that "eicosa-" fixes the number at twenty.
## topic
Biochemistry
## subtopic
Lipids of Biological Importance
## main_concept
CON-FND-588CA87354B099
## concept_ids

## contextual_concept_ids

## difficulty
Easy
## question_type
Mechanism
## cognitive_effort
Low
## cognitive_effort_score
0.3
## setting
Academic
## reasoning_level
2
## inferred_difficulty
70
## exam_relevance
9
## clinical_relevance
0.5
## academic_relevance
0.95
## exam_weight_by_year
KAU_Y1=0.6
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Biochemistry > Lipids of Biological Importance
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-LIPIDS-OF-BIOLOGICAL-IMPORTANCE
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Identify arachidonic acid as the eicosanoid precursor, name the enzyme that liberates it, and name the two enzymes at the fork below it.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Lipids of Biological Importance, printed MCQ 10, page 18; printed answer key page 22, cell 10 = c.
## estimated_seconds
35
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 18. The department examined this pathway as a labelled diagram worth 6 marks on the 2025 paper — the labels removed were the three enzymes — so the pathway is carried in explanation_c rather than left implicit. The distractors are all real fatty acids and each fails on a stated property, which lets the explanations teach the two-part definition of an eicosanoid precursor.

---

# Item

## id
QST-102-INT-MCQ-020
## title
An example of acyclic eicosanoids is:
## question
An example of acyclic eicosanoids is:
## vignette
Below arachidonic acid the pathway forks. Three of these four products come off one branch and one comes off the other.
## subject
fnd
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
C
## answer_a
Prostaglandins
## explanation_a
Prostaglandins are cyclic eicosanoids, made by prostaglandin H synthase — the enzyme whose two catalytic activities are cyclooxygenase and peroxidase. The word itself is the clue that misleads: "prosta-" says nothing about ring structure, so the group has to be learned as belonging to the cyclic branch.
## answer_b
Thromboxane
## explanation_b
Thromboxanes are cyclic. Their immediate parent is prostaglandin H2, from which thromboxane synthase makes TXA2, so they sit two steps down the same branch as the prostaglandins. Thromboxane A2 is the vasoconstrictor and platelet aggregator made in the platelet, and it is the reason an NSAID acting on cyclooxygenase changes platelet behaviour at all.
## answer_c
Leukotrienes
## explanation_c
Lipoxygenase converts arachidonic acid into the acyclic compounds, which are the leukotrienes and the lipoxins. The fork is the whole of this topic, so it is worth holding in one sentence: prostaglandin H synthase makes the cyclic products — prostaglandins, prostacyclins and thromboxanes — and lipoxygenase makes the acyclic ones. The clinical consequence is what matters most. Leukotrienes are made by leukocytes, platelets and mast cells; they stimulate inflammatory reactions and drive the severe allergic responses that produce bronchoconstriction, low blood pressure and shock. Because a nonsteroidal anti-inflammatory drug inhibits cyclooxygenase, it closes the cyclic branch and leaves the lipoxygenase branch running — which is exactly why an NSAID does not relieve leukotriene-driven bronchospasm, and why a leukotriene receptor antagonist is a separate drug rather than a stronger NSAID. A steroid, acting above the fork on phospholipase A2, reduces the supply to both branches.
## answer_d
Prostacyclins
## explanation_d
Prostacyclin, PGI2, is cyclic — made from prostaglandin H2 by prostacyclin synthase, in the endothelium of blood vessels, where it is a vasodilator and an inhibitor of platelet aggregation. It is the counterpart of thromboxane A2 rather than a member of the other branch.
## topic
Biochemistry
## subtopic
Lipids of Biological Importance
## main_concept
CON-FND-588CA87354B099
## concept_ids

## contextual_concept_ids

## difficulty
Moderate
## question_type
Classification
## cognitive_effort
Medium
## cognitive_effort_score
0.45
## setting
Academic
## reasoning_level
2
## inferred_difficulty
56
## exam_relevance
9
## clinical_relevance
0.6
## academic_relevance
0.95
## exam_weight_by_year
KAU_Y1=0.6
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Biochemistry > Lipids of Biological Importance
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-LIPIDS-OF-BIOLOGICAL-IMPORTANCE
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Separate the cyclic from the acyclic eicosanoids and name the enzyme that produces each class.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Lipids of Biological Importance, printed MCQ 13, page 18; printed answer key page 22, cell 13 = c.
## estimated_seconds
45
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 18. A clean single-odd-one-out item: three cyclic products against one acyclic, so a student who holds the fork answers it and a student who holds only a list of eicosanoid names cannot. The explanations name where on the branch each distractor sits, so the whole diagram is recoverable from any wrong answer.

---

# Item

## id
QST-102-INT-MCQ-021
## title
Non-steroidal anti-inflammatory drugs, such as aspirin act by inhibiting the activity of the enzyme:
## question
Non-steroidal anti-inflammatory drugs, such as aspirin act by inhibiting the activity of the enzyme:
## vignette
Three anti-inflammatory drug classes act at three different points of the eicosanoid pathway. Two of the wrong options here are the points the other two classes act on.
## subject
pharm
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
B
## answer_a
Lipoxygenase
## explanation_a
It names the branch an NSAID leaves running. Lipoxygenase converts arachidonic acid to the acyclic eicosanoids — the leukotrienes and lipoxins. If an NSAID inhibited it, an NSAID would relieve leukotriene-driven bronchospasm, and it does not; that is why Singulair, a leukotriene receptor antagonist, exists as a separate drug rather than as a stronger NSAID.
## answer_b
Cyclooxygenase
## explanation_b
Nonsteroidal anti-inflammatory drugs inhibit cyclooxygenase activity and so inhibit prostaglandin synthesis; the standard examples are aspirin, indomethacin and ibuprofen, given by class and mechanism. Two things make this answer worth more than a name. First, where it acts: cyclooxygenase is one of the two catalytic activities of prostaglandin H synthase, peroxidase being the other, so it is not a separate enzyme at a separate step — inhibiting it closes the cyclic branch and leaves the lipoxygenase branch open. Second, how aspirin does it: the enzymes chapter states that aspirin acetylates the hydroxyl group of the serine at the active site of cyclooxygenase, which makes it an irreversible inhibitor rather than a competitive one. Locate the three drug classes on the pathway and the whole clinical section follows — steroids inhibit phospholipase A2, above the fork, and so reduce the supply to both branches; NSAIDs inhibit cyclooxygenase, on the cyclic branch; and Singulair blocks the leukotriene receptor, downstream of the acyclic branch and not an enzyme inhibitor at all.
## answer_c
Phospholipase A2
## explanation_c
It is the specific confusion this item exists to catch: phospholipase A2 is the *steroid* target. Steroidal anti-inflammatory drugs — hydrocortisone, prednisone, betamethasone — inhibit it, cutting the supply of arachidonic acid to the whole pathway. A student who picks this is treating an NSAID as a weaker steroid acting at the same place, when the two act on opposite sides of the fork and have different consequences for bronchospasm.
## answer_d
Lipoprotein lipase
## explanation_d
Lipoprotein lipase clears triacylglycerol from circulating lipoproteins at the capillary wall — it belongs to lipid transport, not to eicosanoid synthesis, and no anti-inflammatory drug class in the chapter targets it. It is the option a student picks when they have matched on the word "lipase" alone.
## topic
Biochemistry
## subtopic
Lipids of Biological Importance
## main_concept
CON-FND-445EEBE58E1F25
## concept_ids
CON-FND-588CA87354B099
## contextual_concept_ids

## difficulty
Moderate
## question_type
Pharmacology
## cognitive_effort
Medium
## cognitive_effort_score
0.5
## setting
Both
## reasoning_level
3
## inferred_difficulty
60
## exam_relevance
9
## clinical_relevance
0.85
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.6
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Biochemistry > Lipids of Biological Importance
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-LIPIDS-OF-BIOLOGICAL-IMPORTANCE
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Locate each anti-inflammatory drug class on the eicosanoid pathway and explain why blocking cyclooxygenase leaves the leukotriene branch running.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Enzymes, printed MCQ 26, page 48; printed answer key page 49, cell 26 = b.
## estimated_seconds
55
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 48. The item is printed in the Enzymes chapter but the concept it tests is taught in the Lipids chapter, so module_subject and library_ids follow the concept, not the page — the source_citation records where the question was actually printed. Distractor c is the concept's own stated pitfall. Treatment content, so this lands as Draft and no dose is written anywhere in the item.

---

# Item

## id
QST-102-INT-MCQ-022
## title
Prolyl and lysyl residues should be modified in collagen for its proper activity by which post-translational modification?
## question
Prolyl and lysyl residues should be modified in collagen for its proper activity by which post-translational modification?
## vignette
There are five types of covalent post-translational modification, each with a worked example. This question gives the example and asks for the type.
## subject
fnd
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
C
## answer_a
Phosphorylation
## explanation_a
Phosphate groups bind covalently to serine, threonine or tyrosine residues, and adding and removing them regulates the enzymes of glycogen metabolism and the regulators of gene transcription. Note that the residues are different ones: phosphorylation goes on hydroxyl-bearing side chains of serine, threonine and tyrosine, not on proline and lysine.
## answer_b
Glycosylation
## explanation_b
This is not the answer to this stem, but it is close enough to be worth separating carefully. Glycosylation — the addition of carbohydrate groups — is the modification that marks proteins destined for secretion, for lysosomes or for membranes. Collagen *is* glycosylated, with glucose and galactose attached to hydroxylysine residues, which is why it counts as a glycoprotein; but that step comes after the hydroxylation, and it is the hydroxylation the stem names as the modification of prolyl and lysyl residues.
## answer_c
Hydroxylation
## explanation_c
Prolyl and lysyl residues are modified by hydroxylation, and in collagen that hydroxylation leads to stabilisation of the protein. Follow the chain of consequence from both ends. Hydroxylation happens in the lumen of the rough endoplasmic reticulum, catalysed by hydroxylase enzymes that require vitamin C as a cofactor. It converts proline to hydroxyproline and lysine to hydroxylysine. The high hydroxyproline content then forms hydrogen bonds between the three chains of tropocollagen, one of the reasons collagen is strong. And hydroxylysine is what glucose and galactose are attached to, which is what makes collagen a glycoprotein while elastin, having no hydroxylysine, is not. So a vitamin deficiency at one step weakens a fibre several steps later.
## answer_d
Carboxylation
## explanation_d
Carboxylation forms γ-carboxyglutamate from glutamate residues, and its importance is in blood coagulation: γ-carboxyglutamate is what lets the clotting proteins bind Ca2+ during clot formation. It acts on glutamate, not on proline or lysine, and its worked example is a clotting factor rather than a structural fibre.
## topic
Biochemistry
## subtopic
Protein Synthesis (Translation)
## main_concept
CON-FND-344140D2457FBB
## concept_ids

## contextual_concept_ids
CON-FND-14647EC60106E1
## difficulty
Moderate
## question_type
Mechanism
## cognitive_effort
Medium
## cognitive_effort_score
0.45
## setting
Academic
## reasoning_level
2
## inferred_difficulty
60
## exam_relevance
9
## clinical_relevance
0.5
## academic_relevance
0.95
## exam_weight_by_year
KAU_Y1=0.6
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Biochemistry > Protein Synthesis (Translation)
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-PROTEIN-SYNTHESIS-TRANSLATION
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Match a named post-translational covalent modification to the residues it acts on and to its worked example.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Protein Synthesis (Translation), printed MCQ 22, page 71; printed answer key page 72, cell 22 = c.
## estimated_seconds
50
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 71. Collagen is tagged as a contextual concept, not an assessed one: the stem uses collagen as the setting, and what is actually tested is which modification acts on prolyl and lysyl residues. Every distractor is one of the other four modification types and each explanation names the residues and the example that belong to it, so the whole five-item list is recoverable from the item.
