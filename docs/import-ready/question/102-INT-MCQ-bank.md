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

---
# Item
## id
QST-102-INT-MCQ-023
## title
Enzymes can recognize and react with a special chemical substance called:
## question
Enzymes can recognize and react with a special chemical substance called:
## vignette
Every enzyme is specific for the molecule it acts on. This item asks for the name of that molecule.
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
Cofactor
## explanation_a
A cofactor is a non-protein helper — a metal ion or an organic coenzyme — that some enzymes need in order to work. It assists catalysis; it is not the molecule the enzyme recognises and converts. Picking it confuses a helper of the enzyme with the target of the enzyme.
## answer_b
Activator
## explanation_b
An activator raises an enzyme’s activity, but it is not what the enzyme acts on. The stem asks for the molecule the enzyme recognises and reacts with, which is the substrate; the activator only modulates the rate at which that reaction runs.
## answer_c
Substrate
## explanation_c
Correct. The substrate is the specific molecule an enzyme binds at its active site and converts to product. Enzyme specificity is defined against the substrate — the active site is shaped to fit it — which is exactly the recognise-and-react relationship the stem describes.
## answer_d
Product
## explanation_d
The product is what the reaction yields, not what the enzyme starts from. It appears at the end, after the substrate has been converted; a student who picks it has read the reaction backwards.
## topic
Biochemistry
## subtopic
Enzymes
## main_concept
CON-FND-BA7E60E9E6800B
## concept_ids

## contextual_concept_ids

## difficulty
Easy
## question_type
Definition
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
102 INT > Biochemistry > Enzymes
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-ENZYMES
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Name the molecule an enzyme acts on and distinguish it from the cofactor, activator and product.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Enzymes, printed MCQ 1, page 45; printed answer key = c.
## estimated_seconds
35
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 45. Tests the substrate half of the concept definition, which lists specificity for the substrate as a defining feature of enzymes.
---
# Item
## id
QST-102-INT-MCQ-024
## title
Enzymes belong to which group of biomolecules?
## question
Enzymes belong to which group of biomolecules?
## vignette
The concept defines enzymes by their chemical class before anything else. This item asks for that class.
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
Lipids
## explanation_a
Lipids are hydrophobic molecules built mainly from fatty acids; they store energy and build membranes, and they are not catalysts of metabolic reactions in the way enzymes are. Almost all enzymes are proteins, so lipid is the wrong class.
## answer_b
Carbohydrates
## explanation_b
Carbohydrates are the substrates and energy stores of metabolism, not its catalysts. A student who picks this may be thinking of what enzymes act on rather than what enzymes are made of.
## answer_c
Phospholipids
## explanation_c
Phospholipids are the amphipathic building blocks of membranes, not catalysts. This distractor pairs the membrane role with the enzyme question; the two are unrelated.
## answer_d
Proteins
## explanation_d
Correct. Enzymes are proteins — polymers of amino acids folded into a shape that carries the active site. (The rare catalytic RNAs, ribozymes, are the sole exception and are not what a departmental “enzymes are…” item is asking.) The concept opens by defining enzymes as protein biocatalysts.
## topic
Biochemistry
## subtopic
Enzymes
## main_concept
CON-FND-BA7E60E9E6800B
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
102 INT > Biochemistry > Enzymes
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-ENZYMES
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
State the chemical class of enzymes and reject the other three macromolecule classes.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Enzymes, printed MCQ 2, page 45; printed answer key = d.
## estimated_seconds
35
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 45. The protein-nature claim is the first clause of the concept definition.
---
# Item
## id
QST-102-INT-MCQ-025
## title
Common features of the enzymes include:
## question
Common features of the enzymes include:
## vignette
Four statements are offered about enzymes; only one is a genuine property. The other three are the classic misconceptions the definition exists to correct.
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
Produced by living cells
## explanation_a
Correct. Enzymes are synthesised by living cells — this is part of their definition as biological catalysts. The other three options are each a property enzymes specifically do NOT have, which is why this is the only defensible choice.
## answer_b
Affection of the reaction equilibrium
## explanation_b
A catalyst speeds a reaction toward equilibrium but never moves the equilibrium position itself; it accelerates the forward and reverse rates equally. Believing an enzyme shifts equilibrium is the single most common enzyme misconception, and the concept names it explicitly as false.
## answer_c
Chemically changed at the end of the reaction
## explanation_c
A catalyst emerges from the reaction unchanged and is free to act again — that is what makes tiny amounts sufficient. “Chemically changed at the end” describes a reactant, not a catalyst.
## answer_d
Needed in large amount
## explanation_d
Because they are regenerated, enzymes are needed only in trace amounts; one enzyme molecule turns over many substrate molecules. “Large amount” contradicts the catalytic definition.
## topic
Biochemistry
## subtopic
Enzymes
## main_concept
CON-FND-BA7E60E9E6800B
## concept_ids

## contextual_concept_ids

## difficulty
Medium
## question_type
Reasoning
## cognitive_effort
Medium
## cognitive_effort_score
0.4
## setting
Academic
## reasoning_level
2
## inferred_difficulty
68
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
102 INT > Biochemistry > Enzymes
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-ENZYMES
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Select a true property of enzymes and reject the three standard false claims (they shift equilibrium, are consumed, or are needed in bulk).
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Enzymes, printed MCQ 3, page 45; printed answer key = a.
## estimated_seconds
45
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 45. Each distractor is a negation of a clause in the concept definition (unchanged by the reaction, needed in tiny amounts, does not affect equilibrium).
---
# Item
## id
QST-102-INT-MCQ-026
## title
The enzymes are polymers of:
## question
The enzymes are polymers of:
## vignette
Following on from the class of enzymes, this item asks for their monomer.
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
Fatty acids
## explanation_a
Fatty acids are the building blocks of lipids, not proteins. This is the distractor for a student who has not connected “enzymes are proteins” to “proteins are chains of amino acids”.
## answer_b
Amino acids
## explanation_b
Correct. Enzymes are proteins, and proteins are polymers of amino acids joined by peptide bonds. The chain folds so that particular side chains come together to form the active site.
## answer_c
Hexose sugars
## explanation_c
Hexose sugars are the monomers of polysaccharides such as glycogen and starch, not of proteins. Picking this confuses the carbohydrate polymer with the protein polymer.
## answer_d
Inorganic phosphate
## explanation_d
Inorganic phosphate is a small ion, not a monomer of any macromolecule chain; it is a backbone linker in nucleic acids but is never the repeating unit of a protein.
## topic
Biochemistry
## subtopic
Enzymes
## main_concept
CON-FND-BA7E60E9E6800B
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
102 INT > Biochemistry > Enzymes
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-ENZYMES
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Identify the monomer of an enzyme as the amino acid.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Enzymes, printed MCQ 4, page 45; printed answer key = b.
## estimated_seconds
35
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 45. Direct corollary of the protein-nature clause in the concept definition.
---
# Item
## id
QST-102-INT-MCQ-027
## title
The active site of an enzyme:
## question
The active site of an enzyme:
## vignette
The active site is the pocket where catalysis happens. Three of these statements misdescribe it.
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
Is remote from the site of substrate attachment
## explanation_a
The active site IS the site of substrate attachment — substrate binding and catalysis happen in the same pocket. A site remote from where the substrate binds describes an allosteric site, not the active site.
## answer_b
Is converted to product
## explanation_b
The substrate is converted to product; the active site is not consumed. Confusing the site with the substrate it holds is the error here — the enzyme, active site included, is regenerated.
## answer_c
Catalyses the reaction
## explanation_c
Correct. The active site binds the substrate and catalyses its conversion, chiefly by lowering the activation energy of the reaction. This is the defining function named in the concept.
## answer_d
Increases the energy of reaction
## explanation_d
An enzyme LOWERS the activation energy — that is the whole mechanism of catalysis. “Increases the energy of reaction” inverts it, and is the trap for a student who has the direction of the energy barrier reversed.
## topic
Biochemistry
## subtopic
Enzymes
## main_concept
CON-FND-5846431203789F
## concept_ids

## contextual_concept_ids

## difficulty
Medium
## question_type
Reasoning
## cognitive_effort
Medium
## cognitive_effort_score
0.4
## setting
Academic
## reasoning_level
2
## inferred_difficulty
68
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
102 INT > Biochemistry > Enzymes
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-ENZYMES
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
State what the active site does — bind substrate and catalyse the reaction — and reject claims that it is remote, is consumed, or raises the reaction’s energy.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Enzymes, printed MCQ 5, page 45; printed answer key = c.
## estimated_seconds
45
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 45. Distractor D is the exact inverse of the mechanism clause, deliberately paired with the correct statement.
---
# Item
## id
QST-102-INT-MCQ-028
## title
In any reaction catalyzed by an enzyme, the reacting molecule is called the:
## question
In any reaction catalyzed by an enzyme, the reacting molecule is called the:
## vignette
A second phrasing of the substrate definition, this time against a different set of distractors.
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
Substrate
## explanation_a
Correct. The reacting molecule the enzyme binds and converts is the substrate. Everything else listed is either a helper of the enzyme or a variant of the enzyme, not the molecule being reacted on.
## answer_b
Cofactor
## explanation_b
A cofactor is a non-protein helper the enzyme may need; it is not the reacting molecule. It assists the conversion of the substrate rather than being converted itself.
## answer_c
Coenzyme
## explanation_c
A coenzyme is an organic cofactor (often vitamin-derived) that ferries chemical groups. It participates in catalysis but is not the substrate whose fate the reaction describes.
## answer_d
Isozyme
## explanation_d
Isozymes are different protein forms of the same enzyme activity. This option names a kind of enzyme, not the molecule the enzyme acts on.
## topic
Biochemistry
## subtopic
Enzymes
## main_concept
CON-FND-BA7E60E9E6800B
## concept_ids

## contextual_concept_ids

## difficulty
Easy
## question_type
Definition
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
102 INT > Biochemistry > Enzymes
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-ENZYMES
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Name the reacting molecule as the substrate and separate it from cofactor, coenzyme and isozyme.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Enzymes, printed MCQ 6, page 45; printed answer key = a.
## estimated_seconds
35
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 45. Same substrate claim as item 23, kept because the department asks it against a distinct distractor set (cofactor/coenzyme/isozyme).
---
# Item
## id
QST-102-INT-MCQ-029
## title
The general mechanism in enzyme action is by:
## question
The general mechanism in enzyme action is by:
## vignette
This item asks for the single sentence that captures how any enzyme accelerates a reaction.
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
Reducing activation energy
## explanation_a
Correct. An enzyme provides an alternative reaction path with a lower activation energy, so more substrate molecules can cross the barrier per unit time. This is the universal mechanism of enzyme catalysis stated in the concept.
## answer_b
Increasing activation energy
## explanation_b
Increasing the activation energy would SLOW the reaction — the opposite of catalysis. This is the sign-flip trap: the barrier is lowered, never raised.
## answer_c
Decreasing pH value
## explanation_c
Enzymes do not work by changing the pH of the medium; rather, each enzyme has an optimum pH at which it works best. Confusing “pH affects enzymes” with “enzymes act by changing pH” reverses cause and effect.
## answer_d
Increasing pH value
## explanation_d
As with option C, altering pH is not how an enzyme catalyses. pH is a condition that affects the enzyme, not a lever the enzyme pulls on the reaction.
## topic
Biochemistry
## subtopic
Enzymes
## main_concept
CON-FND-5846431203789F
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
102 INT > Biochemistry > Enzymes
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-ENZYMES
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
State that enzymes work by lowering activation energy, not by changing pH.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Enzymes, printed MCQ 7, page 45; printed answer key = a.
## estimated_seconds
35
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
OCR fragment “me Enzymes 42” trailing option D on the page was a running header, not part of the option, and was dropped. Verbatim otherwise from page 45.
---
# Item
## id
QST-102-INT-MCQ-030
## title
Factors affecting enzyme activity include:
## question
Factors affecting enzyme activity include:
## vignette
Three genuine factors are listed separately, then together. The best answer is the one that is complete.
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
Temperature
## explanation_a
Temperature does affect enzyme activity, but it is not the only factor, so on its own it is an incomplete answer to a stem that lists all three separately and then together.
## answer_b
Concentration of substrate
## explanation_b
Substrate concentration is a real factor, but choosing it alone ignores temperature and pH, which the stem also offers. The combined option is more complete.
## answer_c
pH
## explanation_c
pH is a genuine factor — each enzyme has an optimum pH — but selecting it alone is incomplete for the same reason as A and B.
## answer_d
Temperature, concentration and pH
## explanation_d
Correct. Temperature, substrate concentration and pH all set the rate of an enzyme-catalysed reaction, and the concept lists exactly these (with enzyme and cofactor concentration) as the determinants. When a stem offers each true factor separately and then all together, the all-together option is the intended answer.
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
Reasoning
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
102 INT > Biochemistry > Enzymes
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-ENZYMES
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Recognise temperature, substrate concentration and pH as jointly the factors that set enzyme rate.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Enzymes, printed MCQ 10, page 46; printed answer key = d.
## estimated_seconds
35
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 46. Classic “all of the above” structure; the concept enumerates these determinants explicitly.
---
# Item
## id
QST-102-INT-MCQ-031
## title
In enzyme kinetics, Km implies:
## question
In enzyme kinetics, Km implies:
## vignette
The Michaelis constant has one precise definition and several near-miss paraphrases. This item separates them.
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
The substrate concentration that gives one half Vmax
## explanation_a
Correct. Km is the substrate concentration at which the reaction runs at half of its maximal velocity (Vmax). This is the operational definition, and a smaller Km means the enzyme reaches half-maximal speed at lower substrate — i.e. higher affinity.
## answer_b
The dissociation constant for the enzyme substrate complex
## explanation_b
Km equals the dissociation constant of the ES complex only under the special assumption that the complex is at true equilibrium (k2 much smaller than the off-rate). As a general definition of Km this is an approximation, not the primary meaning, so it is not the best answer.
## answer_c
Concentration of enzyme
## explanation_c
Km is a substrate concentration, not an enzyme concentration, and it is independent of how much enzyme is present. This option confuses the two concentrations.
## answer_d
Half of the substrate concentration required to achieve Vmax
## explanation_d
This is the deliberate corruption: Km is not “half the substrate needed for Vmax”. Vmax is approached only at saturating (effectively infinite) substrate, so “half the substrate for Vmax” has no defined value. Km is defined the other way round — the substrate that gives half the VELOCITY.
## topic
Biochemistry
## subtopic
Enzymes
## main_concept
CON-FND-028C50A610B2A2
## concept_ids

## contextual_concept_ids

## difficulty
Medium
## question_type
Definition
## cognitive_effort
Medium
## cognitive_effort_score
0.4
## setting
Academic
## reasoning_level
2
## inferred_difficulty
68
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
102 INT > Biochemistry > Enzymes
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-ENZYMES
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
State that Km is the substrate concentration giving half Vmax and reject the corrupted paraphrase.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Enzymes, printed MCQ 13, page 46; printed answer key = a.
## estimated_seconds
45
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 46. Distractors B and D are the two standard Km misstatements; the concept fixes Km as the substrate concentration for half Vmax.
---
# Item
## id
QST-102-INT-MCQ-032
## title
The catalytic efficiency of two different enzymes can be compared by the:
## question
The catalytic efficiency of two different enzymes can be compared by the:
## vignette
To rank two enzymes for how readily they act on their substrate, one parameter is the standard yardstick.
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
Formation of the product
## explanation_a
That both enzymes make product tells you nothing about which does so more readily; every working enzyme forms product. It is not a comparative measure of affinity or efficiency.
## answer_b
Km value
## explanation_b
Correct. Km compares the substrate affinity of two enzymes: the enzyme with the lower Km reaches half-maximal velocity at lower substrate and so binds its substrate more effectively. That is why Km is the standard comparator, as the concept states.
## answer_c
Molecular size of the enzymes
## explanation_c
Molecular size does not track catalytic efficiency — small and large enzymes can be equally or unequally efficient. Size is irrelevant to the comparison.
## answer_d
pH of optimum value
## explanation_d
Optimum pH tells you the conditions each enzyme prefers, not how efficiently it handles its substrate. Two enzymes could share an optimum pH yet differ widely in Km.
## topic
Biochemistry
## subtopic
Enzymes
## main_concept
CON-FND-028C50A610B2A2
## concept_ids

## contextual_concept_ids

## difficulty
Medium
## question_type
Reasoning
## cognitive_effort
Medium
## cognitive_effort_score
0.4
## setting
Academic
## reasoning_level
2
## inferred_difficulty
68
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
102 INT > Biochemistry > Enzymes
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-ENZYMES
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Use Km as the comparator of substrate affinity between enzymes and reject size, pH and product formation.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Enzymes, printed MCQ 14, page 46; printed answer key = b.
## estimated_seconds
45
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 46. Leans on the affinity clause of the Km concept (lower Km = higher affinity).
---
# Item
## id
QST-102-INT-MCQ-033
## title
Blocking the enzyme action by occupying its active site is called:
## question
Blocking the enzyme action by occupying its active site is called:
## vignette
Inhibitors are named by where and how they act. This item asks for the term when the block is at the active site.
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
Non-competitive inhibition
## explanation_a
A non-competitive inhibitor binds a site OTHER than the active site, so it is not defeated by adding substrate. The stem specifies the active site, which points to competitive inhibition instead.
## answer_b
Allosteric inhibition
## explanation_b
Allosteric inhibition also acts away from the active site, at a regulatory site, changing the enzyme’s shape. It is not the active-site block the stem describes.
## answer_c
Competitive inhibition
## explanation_c
Correct. When the inhibitor occupies the active site itself — because it resembles the substrate — it is a competitive inhibitor. The concept ties competitive inhibition to active-site occupancy by a substrate look-alike.
## answer_d
Feedback inhibition
## explanation_d
Feedback inhibition names WHERE in a pathway an inhibitor acts (an end product switching off an earlier step), not the active-site mechanism. That end product is usually an allosteric, not active-site, inhibitor.
## topic
Biochemistry
## subtopic
Enzymes
## main_concept
CON-FND-CB8584ED2F3C49
## concept_ids

## contextual_concept_ids

## difficulty
Easy
## question_type
Definition
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
102 INT > Biochemistry > Enzymes
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-ENZYMES
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Name active-site occupancy by a substrate-like molecule as competitive inhibition.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Enzymes, printed MCQ 17, page 47; printed answer key = c.
## estimated_seconds
35
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 47. The active-site occupancy clause is central to the competitive-inhibition concept.
---
# Item
## id
QST-102-INT-MCQ-034
## title
Enzyme inhibition caused by a substance resembling the substrate molecule is called:
## question
Enzyme inhibition caused by a substance resembling the substrate molecule is called:
## vignette
Structural resemblance to the substrate is the signature of one class of inhibitor.
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
Allosteric inhibition
## explanation_a
Allosteric inhibitors need not resemble the substrate at all; they bind a separate regulatory site by their own shape. Resemblance to the substrate is not their defining feature.
## answer_b
Competitive inhibition
## explanation_b
Correct. A molecule that resembles the substrate closely enough to fit the active site competes with the substrate for that site — competitive inhibition. Substrate mimicry is exactly the clause the concept uses to define it.
## answer_c
Feedback inhibition
## explanation_c
Feedback inhibition describes a pathway end product shutting down an upstream enzyme; the inhibitor there resembles the end product, not the substrate of the enzyme it blocks.
## answer_d
Non-competitive inhibition
## explanation_d
A non-competitive inhibitor binds away from the active site and does not resemble the substrate. Structural mimicry is the hallmark of the competitive type instead.
## topic
Biochemistry
## subtopic
Enzymes
## main_concept
CON-FND-CB8584ED2F3C49
## concept_ids

## contextual_concept_ids

## difficulty
Easy
## question_type
Definition
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
102 INT > Biochemistry > Enzymes
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-ENZYMES
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Link substrate resemblance to competitive inhibition.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Enzymes, printed MCQ 18, page 47; printed answer key = b.
## estimated_seconds
35
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 47. Same concept as item 33, asked from the substrate-resemblance side; kept because the two phrasings catch different errors.
---
# Item
## id
QST-102-INT-MCQ-035
## title
A competitive inhibitor:
## question
A competitive inhibitor:
## vignette
Competitive inhibition has a precise kinetic fingerprint on Km and Vmax. This item tests that fingerprint.
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
Increases the Km of the enzyme
## explanation_a
Correct. A competitive inhibitor raises the apparent Km — more substrate is now needed to reach half-maximal velocity because inhibitor and substrate compete for the active site. Vmax is unchanged, since enough substrate still out-competes the inhibitor. The concept states exactly this: higher apparent Km, untouched Vmax.
## answer_b
Decreases the Vmax of the enzyme
## explanation_b
Lowering Vmax is the fingerprint of a NON-competitive inhibitor, which removes functional enzyme regardless of substrate. A competitive inhibitor leaves Vmax intact because saturating substrate overcomes it.
## answer_c
Increases the Vmax of the enzyme
## explanation_c
No inhibitor increases Vmax — inhibition can only reduce or leave activity unchanged. This option confuses inhibition with activation.
## answer_d
Decreases the Km of the enzyme
## explanation_d
A competitive inhibitor raises, not lowers, Km. Decreasing Km would mean tighter substrate binding, the opposite of what competition for the active site produces.
## topic
Biochemistry
## subtopic
Enzymes
## main_concept
CON-FND-CB8584ED2F3C49
## concept_ids

## contextual_concept_ids

## difficulty
Hard
## question_type
Reasoning
## cognitive_effort
Medium
## cognitive_effort_score
0.55
## setting
Academic
## reasoning_level
2
## inferred_difficulty
55
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
102 INT > Biochemistry > Enzymes
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-ENZYMES
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
State that a competitive inhibitor raises apparent Km while leaving Vmax unchanged.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Enzymes, printed MCQ 19, page 47; printed answer key = a.
## estimated_seconds
45
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 47 (trailing OCR fragment “mum Enzymes 44” on option D was a running footer, dropped). The Km-up / Vmax-unchanged signature is the crux of the concept.
---
# Item
## id
QST-102-INT-MCQ-036
## title
An allosteric effector influences enzyme activity by:
## question
An allosteric effector influences enzyme activity by:
## vignette
Allosteric regulation is defined by where the effector binds and what that binding does to the protein.
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
Covalently modifying the enzyme
## explanation_a
Covalent modification (such as phosphorylation) is a separate regulatory mechanism. An allosteric effector binds non-covalently and reversibly; it does not form a covalent bond with the enzyme.
## answer_b
Binding to the substrate and altering its conformation
## explanation_b
An allosteric effector binds the ENZYME, not the substrate. Altering the substrate’s conformation is not the mechanism; changing the enzyme’s conformation is.
## answer_c
Competing for the catalytic site with substrate
## explanation_c
Competing for the catalytic site describes a competitive inhibitor. The defining feature of an allosteric effector is that it acts at a DIFFERENT site, not the active site.
## answer_d
Binding to a site on the enzyme distinct from the catalytic site
## explanation_d
Correct. An allosteric effector binds a regulatory site distinct from the active site and changes activity by inducing a conformational change in the protein. That distinct-site, conformational mechanism is precisely the concept’s definition.
## topic
Biochemistry
## subtopic
Enzymes
## main_concept
CON-FND-6BBAC69900B22F
## concept_ids

## contextual_concept_ids

## difficulty
Medium
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
68
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
102 INT > Biochemistry > Enzymes
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-ENZYMES
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Describe allosteric action as binding a site distinct from the active site to produce a conformational change.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Enzymes, printed MCQ 20, page 48; printed answer key = d.
## estimated_seconds
45
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 48. Distractor C is the deliberate competitive-inhibition confusion the allosteric concept is meant to separate.
---
# Item
## id
QST-102-INT-MCQ-037
## title
Which of the following represents irreversible enzyme inhibition?
## question
Which of the following represents irreversible enzyme inhibition?
## vignette
Some inhibitors bind and let go; others disable the enzyme for good. This item asks for an example of the permanent kind.
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
Statins
## explanation_a
Statins reversibly inhibit HMG-CoA reductase; they are competitive, substrate-like inhibitors that bind and release, not permanent poisons. So they are not an example of irreversible inhibition.
## answer_b
Allopurinol
## explanation_b
Allopurinol inhibits xanthine oxidase; it acts reversibly (its oxidised product binds tightly but the classic teaching contrasts it with true irreversible poisons). It is not the intended answer for permanent inhibition.
## answer_c
Mercury
## explanation_c
Correct. Mercury and other heavy-metal salts inhibit irreversibly by combining with free sulfhydryl (–SH) groups on the enzyme, permanently disabling it. The concept names heavy-metal binding to sulfhydryl groups as the model of irreversible inhibition.
## answer_d
Sulfonamides
## explanation_d
Sulfonamides are competitive, reversible inhibitors — they mimic PABA and block bacterial folate synthesis, releasing when PABA rises. Reversible, not irreversible.
## topic
Biochemistry
## subtopic
Enzymes
## main_concept
CON-FND-42EE1863F04920
## concept_ids

## contextual_concept_ids

## difficulty
Medium
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
68
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
102 INT > Biochemistry > Enzymes
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-ENZYMES
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Identify a heavy-metal poison as an irreversible inhibitor and separate it from reversible drug inhibitors.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Enzymes, printed MCQ 21, page 48; printed answer key = c.
## estimated_seconds
45
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 48. The mercury/sulfhydryl mechanism is stated in the irreversible-inhibition concept; the three drug distractors are all reversible inhibitors.
---
# Item
## id
QST-102-INT-MCQ-038
## title
A zymogen or proenzyme is:
## question
A zymogen or proenzyme is:
## vignette
Some enzymes are made in an off state and switched on later. This item asks what that off form is.
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
A hormone
## explanation_a
A hormone is a signalling molecule, not an inactive enzyme. A zymogen may be activated in response to signals, but it is itself an enzyme-in-waiting, not the signal.
## answer_b
A vitamin
## explanation_b
A vitamin is a micronutrient, often the source of a coenzyme. It is unrelated to the definition of a zymogen as an inactive enzyme form.
## answer_c
An enzyme precursor
## explanation_c
Correct. A zymogen (proenzyme) is an inactive precursor of an enzyme, switched on by proteolytic removal of the part of the chain that masks its active site. That precursor definition is exactly the concept.
## answer_d
A modulator
## explanation_d
A modulator adjusts an enzyme’s activity (as an allosteric effector does). A zymogen is not a modulator; it is the enzyme itself before activation.
## topic
Biochemistry
## subtopic
Enzymes
## main_concept
CON-FND-F6E154FA6FF42A
## concept_ids

## contextual_concept_ids

## difficulty
Easy
## question_type
Definition
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
102 INT > Biochemistry > Enzymes
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-ENZYMES
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Define a zymogen as an inactive enzyme precursor.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Enzymes, printed MCQ 23, page 48; printed answer key = c.
## estimated_seconds
35
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 48. Straight statement of the zymogen concept’s core definition.
---
# Item
## id
QST-102-INT-MCQ-039
## title
An example of a pro-enzyme is:
## question
An example of a pro-enzyme is:
## vignette
Having defined a zymogen, this item asks which of four names is one.
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
Pepsinogen
## explanation_a
Correct. Pepsinogen is the inactive precursor secreted by gastric chief cells; acid and autocatalysis cleave it to active pepsin. The “-ogen” suffix flags the zymogen, and pepsinogen is the concept’s worked example.
## answer_b
Trypsin
## explanation_b
Trypsin is the ACTIVE enzyme; its zymogen is trypsinogen. Picking trypsin selects the product of activation rather than the precursor the stem asks for.
## answer_c
Chymotrypsin
## explanation_c
Chymotrypsin is likewise the active form; its precursor is chymotrypsinogen. Same error as trypsin — the active enzyme, not the proenzyme.
## answer_d
Lysine
## explanation_d
Lysine is an amino acid, not an enzyme at all, let alone a proenzyme. It is the odd-one-out distractor.
## topic
Biochemistry
## subtopic
Enzymes
## main_concept
CON-FND-F6E154FA6FF42A
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
102 INT > Biochemistry > Enzymes
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-ENZYMES
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Recognise pepsinogen as a zymogen and distinguish it from the active enzymes and the amino acid distractor.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Enzymes, printed MCQ 24, page 48; printed answer key = a.
## estimated_seconds
35
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 48. Pepsinogen→pepsin is the example named in the zymogen concept; trypsin/chymotrypsin are the active-form traps.
---
# Item
## id
QST-102-INT-MCQ-040
## title
Phosphorylation / dephosphorylation of enzymes:
## question
Phosphorylation / dephosphorylation of enzymes:
## vignette
Reversible covalent modification is a major on/off switch in metabolism. This item tests its specifics.
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
Occurs on specific serine and threonine residues
## explanation_a
Correct. A protein kinase attaches phosphate to specific serine, threonine (and sometimes tyrosine) residues; a phosphatase removes it. The concept identifies these hydroxyl-bearing residues as the sites of the modification.
## answer_b
Is a non-covalent type of modification
## explanation_b
Phosphorylation forms a covalent phosphoester bond to the residue’s hydroxyl group — it is a covalent modification, not a non-covalent interaction. This option contradicts the mechanism.
## answer_c
Is an irreversible type of modification
## explanation_c
It is reversible: kinase adds the phosphate, phosphatase takes it off, which is what makes it usable as a rapid on/off switch. “Irreversible” is the trap that confuses it with proteolytic activation.
## answer_d
Does not affect the enzyme’s catalytic activity
## explanation_d
The whole point of the modification is that it changes activity — switching an enzyme on or off depending on which enzyme it is. Saying it has no effect denies its regulatory role.
## topic
Biochemistry
## subtopic
Enzymes
## main_concept
CON-FND-6A58FA1680290F
## concept_ids

## contextual_concept_ids

## difficulty
Medium
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
68
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
102 INT > Biochemistry > Enzymes
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-ENZYMES
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
State that enzyme phosphorylation is a reversible covalent modification on serine and threonine residues that changes activity.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Enzymes, printed MCQ 25, page 48; printed answer key = a.
## estimated_seconds
45
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 48. The serine/threonine, covalent, reversible clauses are all in the covalent-modification concept.

---
# Item
## id
QST-102-INT-MCQ-041
## title
Proteins are:
## question
Proteins are:
## vignette
Before their building blocks, this item asks what proteins are as a class of molecule.
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
Organic compounds with low molecular weight
## explanation_a
Proteins are organic, but not of low molecular weight. They are polymers of many amino acids, so their masses run from thousands to millions of daltons — the opposite of a small molecule.
## answer_b
Organic compounds with high molecular weight
## explanation_b
Correct. Proteins are carbon-based (organic) macromolecules built by joining amino acids through peptide bonds, giving large molecular weights that rise with chain length.
## answer_c
Inorganic compounds with low molecular weight
## explanation_c
Proteins are carbon-containing, so they are organic, not inorganic; and being polymers, they are large, not low in molecular weight. Both halves of this option are wrong.
## answer_d
Inorganic compounds with high molecular weight
## explanation_d
The molecular weight is high, which is right, but proteins are organic — built on a carbon backbone — so calling them inorganic misclassifies them.
## topic
Biochemistry
## subtopic
Amino Acids
## main_concept
CON-FND-A37A5AA8733ACE
## concept_ids

## contextual_concept_ids

## difficulty
Easy
## question_type
Definition
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
State that proteins are organic macromolecules of high molecular weight built from amino acids.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Amino Acids of Biological Importance, printed MCQ 1, page 25; printed answer key = b.
## estimated_seconds
30
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 25.
---
# Item
## id
QST-102-INT-MCQ-042
## title
Synthesis of proteins commonly requires:
## question
Synthesis of proteins commonly requires:
## vignette
This item asks how many different amino acids the body draws on to build its proteins.
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
100 different amino acids
## explanation_a
Hundreds of amino acids exist in nature, but only a fixed set is used to build proteins. One hundred overstates the number the ribosome assembles.
## answer_b
300 different amino acids
## explanation_b
This is far above the count used in protein synthesis. Non-protein amino acids are numerous, but they are not the ones read from the genetic code.
## answer_c
20 different amino acids
## explanation_c
Correct. Twenty standard amino acids are specified by the genetic code and used by the ribosome to build proteins; every protein is a sequence drawn from this set.
## answer_d
30 different amino acids
## explanation_d
Close to the correct order of magnitude but still wrong — the standard set the genetic code encodes is twenty, not thirty.
## topic
Biochemistry
## subtopic
Amino Acids
## main_concept
CON-FND-A37A5AA8733ACE
## concept_ids

## contextual_concept_ids

## difficulty
Easy
## question_type
Definition
## cognitive_effort
Low
## cognitive_effort_score
0.2
## setting
Academic
## reasoning_level
1
## inferred_difficulty
83
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
State that twenty standard amino acids are used to synthesise proteins.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Amino Acids of Biological Importance, printed MCQ 2, page 25; printed answer key = c.
## estimated_seconds
30
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 25.
---
# Item
## id
QST-102-INT-MCQ-043
## title
Which of the following is an example of α-amino acids?
## question
Which of the following is an example of α-amino acids?
## vignette
An α-amino acid carries its amino group on the carbon next to the carboxyl group. This item asks which of the four is a true α-amino acid.
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
Phenylalanine
## explanation_a
Correct. Phenylalanine has its amino group on the α-carbon, the carbon adjacent to the carboxyl group — the defining arrangement of an α-amino acid, shared by the standard protein amino acids.
## answer_b
Proline
## explanation_b
Proline is an imino acid, not a true amino acid: its nitrogen is part of a ring and forms a secondary amine (imino) group rather than a free α-amino group.
## answer_c
Hydroxyproline
## explanation_c
Like proline, hydroxyproline carries a ring nitrogen and is classed as an imino acid; it is proline hydroxylated in collagen, not a free α-amino acid.
## answer_d
Glutathione
## explanation_d
Glutathione is a tripeptide (γ-glutamyl-cysteinyl-glycine), not a single amino acid, so it cannot be an example of an α-amino acid.
## topic
Biochemistry
## subtopic
Amino Acids
## main_concept
CON-FND-A37A5AA8733ACE
## concept_ids

## contextual_concept_ids

## difficulty
Medium
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
66
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
Identify a true α-amino acid and distinguish it from imino acids and peptides.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Amino Acids of Biological Importance, printed MCQ 3, page 25; printed answer key = a.
## estimated_seconds
40
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
OCR printed "o amino acids"; the printed word is "α (alpha) amino acids", restored here.
---
# Item
## id
QST-102-INT-MCQ-044
## title
Which of the following is an imino acid?
## question
Which of the following is an imino acid?
## vignette
One of the twenty standard building blocks has its nitrogen locked in a ring, making it an imino rather than an amino acid. This item asks which.
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
Alanine
## explanation_a
Alanine is a simple neutral aliphatic amino acid with a free α-amino group; its nitrogen is not part of any ring, so it is not an imino acid.
## answer_b
Glutamate
## explanation_b
Glutamate is an acidic amino acid with a free α-amino group and a side-chain carboxyl; it has no ring nitrogen and is not an imino acid.
## answer_c
Proline
## explanation_c
Correct. Proline's side chain loops back onto its own α-nitrogen, forming a ring so the nitrogen is a secondary (imino) group — which is why proline is called an imino acid.
## answer_d
Serine
## explanation_d
Serine is a neutral amino acid with a hydroxyl side chain and a free α-amino group; nothing about it makes it an imino acid.
## topic
Biochemistry
## subtopic
Amino Acids
## main_concept
CON-FND-A37A5AA8733ACE
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
78
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
Identify proline as the imino acid among the standard amino acids.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Amino Acids of Biological Importance, printed MCQ 4, page 25; printed answer key = c.
## estimated_seconds
35
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 25.
---
# Item
## id
QST-102-INT-MCQ-045
## title
Amino acids can be classified by:
## question
Amino acids can be classified by:
## vignette
This item asks which of the listed schemes is a real basis for classifying amino acids.
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
Physical classification
## explanation_a
Amino acids are not grouped by a general 'physical' scheme. The standard schemes are chemical (by side-chain group), nutritional and metabolic — physical is not one of them.
## answer_b
Pathological classification
## explanation_b
There is no 'pathological' classification of amino acids. Disease can result from amino-acid disorders, but that does not make pathology a way of sorting the amino acids themselves.
## answer_c
Chemical classification
## explanation_c
Correct. Amino acids are classified chemically by the nature of their side chain — aliphatic, aromatic, heterocyclic, acidic, basic, and so on — one of the standard classification schemes.
## answer_d
Quantitative classification
## explanation_d
Amino acids are not sorted by quantity. A 'quantitative' scheme is not among the recognised bases, which are chemical, nutritional (essential/non-essential) and metabolic.
## topic
Biochemistry
## subtopic
Amino Acids
## main_concept
CON-FND-5C05062976F311
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
Recognise chemical structure as a basis for classifying amino acids.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Amino Acids of Biological Importance, printed MCQ 5, page 25; printed answer key = c.
## estimated_seconds
30
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 25.
---
# Item
## id
QST-102-INT-MCQ-046
## title
Histidine is an example of:
## question
Histidine is an example of:
## vignette
Histidine's side chain carries a nitrogen-containing ring. This item asks which chemical class that places it in.
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
Aromatic amino acid
## explanation_a
The aromatic amino acids are phenylalanine, tyrosine and tryptophan, whose side chains carry a benzene or indole ring. Histidine's ring contains nitrogen, so it is grouped as heterocyclic rather than plainly aromatic.
## answer_b
Heterocyclic amino acid
## explanation_b
Correct. Histidine's side chain is an imidazole ring, a five-membered ring containing two nitrogen atoms; a ring built from more than one kind of atom makes it a heterocyclic amino acid.
## answer_c
Branched chain amino acid
## explanation_c
The branched-chain amino acids are valine, leucine and isoleucine, with branched aliphatic side chains. Histidine's side chain is a ring, not a branched hydrocarbon.
## answer_d
Non-branched chain amino acid
## explanation_d
This describes straight aliphatic side chains such as glycine or alanine. Histidine carries a ring, so it is neither branched nor a simple non-branched aliphatic amino acid.
## topic
Biochemistry
## subtopic
Amino Acids
## main_concept
CON-FND-5C05062976F311
## concept_ids

## contextual_concept_ids

## difficulty
Medium
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
64
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
Classify histidine as a heterocyclic amino acid by its imidazole side chain.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Amino Acids of Biological Importance, printed MCQ 7, page 25; printed answer key = b.
## estimated_seconds
40
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 25.
---
# Item
## id
QST-102-INT-MCQ-047
## title
Valine is:
## question
Valine is:
## vignette
This item asks for the chemical class of valine, one of the three branched-chain amino acids.
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
Aliphatic branched amino acid
## explanation_a
Correct. Valine's side chain is an isopropyl group — a short carbon chain that branches — making it an aliphatic, branched-chain amino acid alongside leucine and isoleucine.
## answer_b
Aliphatic non-branched amino acid
## explanation_b
Valine is aliphatic, but its side chain branches at the β-carbon; non-branched aliphatic amino acids such as glycine or alanine have straight side chains.
## answer_c
Aromatic amino acid
## explanation_c
Aromatic amino acids carry a benzene or indole ring (phenylalanine, tyrosine, tryptophan). Valine's side chain is a small branched hydrocarbon with no ring.
## answer_d
Heterocyclic amino acid
## explanation_d
Heterocyclic amino acids such as histidine or tryptophan have a ring containing atoms other than carbon. Valine has no ring at all.
## topic
Biochemistry
## subtopic
Amino Acids
## main_concept
CON-FND-5C05062976F311
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
76
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
Classify valine as a branched-chain aliphatic amino acid.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Amino Acids of Biological Importance, printed MCQ 9, page 26; printed answer key = a.
## estimated_seconds
35
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 26.
---
# Item
## id
QST-102-INT-MCQ-048
## title
Which of the following amino acids contains a hydroxyl group?
## question
Which of the following amino acids contains a hydroxyl group?
## vignette
One of these side chains carries an –OH group. This item asks which amino acid is the hydroxyl-containing one.
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
Arginine
## explanation_a
Arginine's side chain ends in a guanidinium group rich in nitrogen, which makes it basic — there is no hydroxyl group on it.
## answer_b
Serine
## explanation_b
Correct. Serine's side chain is a hydroxymethyl group (–CH2OH), so it carries a hydroxyl group; this –OH is also the site that can be phosphorylated.
## answer_c
Cysteine
## explanation_c
Cysteine's side chain carries a thiol (–SH) group, not a hydroxyl. The sulfur is what lets it form disulfide bonds.
## answer_d
Methionine
## explanation_d
Methionine's side chain contains sulfur in a thioether linkage; it has no hydroxyl group.
## topic
Biochemistry
## subtopic
Amino Acids
## main_concept
CON-FND-5C05062976F311
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
77
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
Identify serine as a hydroxyl-containing amino acid.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Amino Acids of Biological Importance, printed MCQ 10, page 26; printed answer key = b.
## estimated_seconds
35
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
OCR printed "hydroxy]"; restored to "hydroxyl".
---
# Item
## id
QST-102-INT-MCQ-049
## title
An amino acid containing a hydroxyl group is:
## question
An amino acid containing a hydroxyl group is:
## vignette
This item again asks for a hydroxyl-bearing amino acid, from a different set of options.
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
Threonine
## explanation_a
Correct. Threonine's side chain carries a hydroxyl group on a branched carbon; together with serine it makes up the pair of hydroxyl-containing amino acids that can be phosphorylated.
## answer_b
Methionine
## explanation_b
Methionine's side chain contains sulfur in a thioether, not a hydroxyl group.
## answer_c
Glutathione
## explanation_c
Glutathione is a tripeptide, not a single amino acid, so it is not the answer to a question about which amino acid carries a hydroxyl group.
## answer_d
Hydroxyproline
## explanation_d
Hydroxyproline does carry a hydroxyl, but it is an imino acid formed by modifying proline in collagen, not one of the standard hydroxyl amino acids the department pairs (serine and threonine); threonine is the intended answer.
## topic
Biochemistry
## subtopic
Amino Acids
## main_concept
CON-FND-5C05062976F311
## concept_ids

## contextual_concept_ids

## difficulty
Medium
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
63
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
Identify threonine as a hydroxyl-containing standard amino acid.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Amino Acids of Biological Importance, printed MCQ 11, page 26; printed answer key = a.
## estimated_seconds
40
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
OCR printed "hydroxyl]"; restored to "hydroxyl".
---
# Item
## id
QST-102-INT-MCQ-050
## title
Which of the following amino acids contains a sulfur atom?
## question
Which of the following amino acids contains a sulfur atom?
## vignette
Two standard amino acids carry sulfur. This item asks which of the four listed is one of them.
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
Serine
## explanation_a
Serine's side chain is a hydroxymethyl group; it carries oxygen in an –OH, not sulfur.
## answer_b
Threonine
## explanation_b
Threonine carries a hydroxyl group on its side chain, not a sulfur atom.
## answer_c
Methionine
## explanation_c
Correct. Methionine's side chain contains a sulfur atom in a thioether linkage; with cysteine it is one of the two sulfur-containing amino acids.
## answer_d
Aspartate
## explanation_d
Aspartate is an acidic amino acid with a side-chain carboxyl group; it contains no sulfur.
## topic
Biochemistry
## subtopic
Amino Acids
## main_concept
CON-FND-5C05062976F311
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
78
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
Identify methionine as a sulfur-containing amino acid.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Amino Acids of Biological Importance, printed MCQ 12, page 26; printed answer key = c.
## estimated_seconds
35
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 26.
---
# Item
## id
QST-102-INT-MCQ-051
## title
An amino acid containing an acidic group is:
## question
An amino acid containing an acidic group is:
## vignette
This item asks for the amino acid whose side chain carries a second, acidic carboxyl group.
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
Arginine
## explanation_a
Arginine's side chain is basic, carrying a nitrogen-rich guanidinium group — the opposite of an acidic side chain.
## answer_b
Glycine
## explanation_b
Glycine's side chain is a single hydrogen atom; it is neutral, with no extra acidic group.
## answer_c
Pyruvate
## explanation_c
Pyruvate is a keto acid intermediate of metabolism, not an amino acid, so it cannot answer a question about amino-acid side chains.
## answer_d
Aspartate
## explanation_d
Correct. Aspartate's side chain carries a carboxyl group that ionises to a negative charge, making it one of the two acidic amino acids alongside glutamate.
## topic
Biochemistry
## subtopic
Amino Acids
## main_concept
CON-FND-5C05062976F311
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
76
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
Identify aspartate as an acidic amino acid by its side-chain carboxyl group.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Amino Acids of Biological Importance, printed MCQ 14, page 26; printed answer key = d.
## estimated_seconds
35
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 26.
---
# Item
## id
QST-102-INT-MCQ-052
## title
An amino acid containing a basic group is:
## question
An amino acid containing a basic group is:
## vignette
This item asks for the amino acid whose side chain carries an extra nitrogen-containing basic group.
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
Lysine
## explanation_a
Correct. Lysine's side chain ends in an ε-amino group that accepts a proton and carries a positive charge, making it a basic amino acid together with arginine and histidine.
## answer_b
Proline
## explanation_b
Proline is an imino acid with a ring side chain; it has no extra basic group.
## answer_c
Glycine
## explanation_c
Glycine's side chain is one hydrogen atom, so it is neutral, not basic.
## answer_d
Alanine
## explanation_d
Alanine's side chain is a simple methyl group; it is neutral aliphatic, with no basic group.
## topic
Biochemistry
## subtopic
Amino Acids
## main_concept
CON-FND-5C05062976F311
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
78
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
Identify lysine as a basic amino acid by its side-chain amino group.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Amino Acids of Biological Importance, printed MCQ 15, page 27; printed answer key = a.
## estimated_seconds
35
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 27.
---
# Item
## id
QST-102-INT-MCQ-053
## title
An amino acid containing an aromatic ring is:
## question
An amino acid containing an aromatic ring is:
## vignette
This item asks which amino acid carries a true aromatic (benzene-type) ring in its side chain.
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
Histidine
## explanation_a
Histidine carries an imidazole ring, but that ring contains nitrogen, so it is classed as heterocyclic rather than a plain aromatic amino acid.
## answer_b
Proline
## explanation_b
Proline's ring is a saturated pyrrolidine ring with no aromatic character; it is an imino acid, not an aromatic one.
## answer_c
Alanine
## explanation_c
Alanine's side chain is a small methyl group with no ring at all.
## answer_d
Phenylalanine
## explanation_d
Correct. Phenylalanine's side chain is a benzyl group carrying a benzene ring, making it one of the aromatic amino acids alongside tyrosine and tryptophan.
## topic
Biochemistry
## subtopic
Amino Acids
## main_concept
CON-FND-5C05062976F311
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
76
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
Identify phenylalanine as an aromatic amino acid.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Amino Acids of Biological Importance, printed MCQ 16, page 27; printed answer key = d.
## estimated_seconds
35
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 27.
---
# Item
## id
QST-102-INT-MCQ-054
## title
An example of a heterocyclic amino acid is:
## question
An example of a heterocyclic amino acid is:
## vignette
A heterocyclic amino acid has a ring containing an atom other than carbon. This item asks which of the four fits.
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
Histidine
## explanation_a
Correct. Histidine's side chain is an imidazole ring containing two nitrogen atoms; a ring built from more than one kind of atom makes it heterocyclic.
## answer_b
Cysteine
## explanation_b
Cysteine carries a thiol side chain with no ring; it is a sulfur-containing amino acid, not a heterocyclic one.
## answer_c
Tyrosine
## explanation_c
Tyrosine's ring is a benzene ring bearing a hydroxyl — an aromatic side chain of carbon only, so it is aromatic rather than heterocyclic.
## answer_d
Methionine
## explanation_d
Methionine has a straight sulfur-containing side chain with no ring at all.
## topic
Biochemistry
## subtopic
Amino Acids
## main_concept
CON-FND-5C05062976F311
## concept_ids

## contextual_concept_ids

## difficulty
Medium
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
66
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
Identify histidine as a heterocyclic amino acid.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Amino Acids of Biological Importance, printed MCQ 17, page 27; printed answer key = a.
## estimated_seconds
40
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 27.
---
# Item
## id
QST-102-INT-MCQ-055
## title
Serine is an amino acid with:
## question
Serine is an amino acid with:
## vignette
This item asks how serine's side chain is classed on the polarity scheme.
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
Non-polar group
## explanation_a
Serine's hydroxyl side chain is polar and can hydrogen-bond with water, so it is not non-polar.
## answer_b
Uncharged polar group
## explanation_b
Correct. Serine's –OH side chain is polar and forms hydrogen bonds but carries no charge at physiological pH, placing it among the uncharged (neutral) polar amino acids.
## answer_c
Charged polar group
## explanation_c
Charged polar side chains are the acidic (aspartate, glutamate) and basic (lysine, arginine, histidine) ones. Serine's hydroxyl is polar but neutral, not charged.
## answer_d
Hydrophobic group
## explanation_d
Hydrophobic side chains are the non-polar ones such as valine or leucine. Serine's hydroxyl makes it hydrophilic, not hydrophobic.
## topic
Biochemistry
## subtopic
Amino Acids
## main_concept
CON-FND-327EF635E45CB6
## concept_ids

## contextual_concept_ids

## difficulty
Medium
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
65
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
Classify serine as an uncharged polar amino acid.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Amino Acids of Biological Importance, printed MCQ 18, page 27; printed answer key = b.
## estimated_seconds
40
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 27.
---
# Item
## id
QST-102-INT-MCQ-056
## title
Arginine is:
## question
Arginine is:
## vignette
This item asks how arginine's strongly basic side chain is classed on the polarity scheme.
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
An amino acid with an uncharged polar group
## explanation_a
Uncharged polar side chains, such as serine's hydroxyl, are neutral. Arginine's guanidinium group takes up a proton and carries a positive charge, so it is not uncharged.
## answer_b
An amino acid with a charged polar group
## explanation_b
Correct. Arginine's guanidinium side chain is protonated and positively charged at physiological pH, placing it among the charged polar (basic) amino acids.
## answer_c
An amino acid with a non-polar group
## explanation_c
Non-polar side chains are hydrocarbon-like and hydrophobic. Arginine's nitrogen-rich, charged side chain is strongly polar, the opposite of non-polar.
## answer_d
An amino acid with a hydrophobic group
## explanation_d
Arginine's charged guanidinium group is highly hydrophilic and interacts strongly with water, so it is not hydrophobic.
## topic
Biochemistry
## subtopic
Amino Acids
## main_concept
CON-FND-327EF635E45CB6
## concept_ids

## contextual_concept_ids

## difficulty
Medium
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
65
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
Classify arginine as a charged polar (basic) amino acid.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Amino Acids of Biological Importance, printed MCQ 19, page 27; printed answer key = b.
## estimated_seconds
40
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 27.
---
# Item
## id
QST-102-INT-MCQ-057
## title
Amino acids are nutritionally classified into:
## question
Amino acids are nutritionally classified into:
## vignette
This item asks for the categories of the nutritional classification of amino acids.
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
Essential, non-essential, and half-essential amino acids
## explanation_a
Correct. The nutritional scheme sorts amino acids by whether the diet must supply them: essential (must be eaten), non-essential (the body can make them) and half- (semi-) essential.
## answer_b
Ketogenic, glucogenic, and mixed amino acids
## explanation_b
This is the metabolic classification, based on whether an amino acid's carbon skeleton yields ketone bodies or glucose — not the nutritional one.
## answer_c
Aliphatic, aromatic, and heterocyclic amino acids
## explanation_c
This is the chemical classification, based on side-chain structure, not on dietary need.
## answer_d
Non-polar, uncharged polar, and charged polar amino acids
## explanation_d
This is the polarity-based classification, which describes how side chains interact with water, not a nutritional grouping.
## topic
Biochemistry
## subtopic
Amino Acids
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
State the three categories of the nutritional classification of amino acids.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Amino Acids of Biological Importance, printed MCQ 20, page 27; printed answer key = a.
## estimated_seconds
30
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 27.
---
# Item
## id
QST-102-INT-MCQ-058
## title
Valine is:
## question
Valine is:
## vignette
This item asks where valine falls on the nutritional (dietary) classification.
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
Essential amino acid
## explanation_a
Correct. Valine cannot be synthesised by the body and must be supplied by the diet, so it is an essential amino acid — one of the branched-chain essentials with leucine and isoleucine.
## answer_b
Non-essential amino acid
## explanation_b
Non-essential amino acids are those the body can make for itself, such as alanine or glycine. Valine cannot be synthesised, so it is not non-essential.
## answer_c
Semi-essential amino acid
## explanation_c
The semi- (half-) essential amino acids are arginine and histidine, needed extra during growth. Valine is fully essential, required from the diet throughout life.
## answer_d
Mixed amino acid
## explanation_d
'Mixed' belongs to the metabolic classification (both glucogenic and ketogenic), not the nutritional one, so it does not describe valine's dietary status.
## topic
Biochemistry
## subtopic
Amino Acids
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
77
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
Classify valine as an essential amino acid.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Amino Acids of Biological Importance, printed MCQ 21, page 27; printed answer key = a.
## estimated_seconds
35
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 27. This item tests nutritional class; MCQ-001-style items test chemical class.
---
# Item
## id
QST-102-INT-MCQ-059
## title
Proteins containing all the essential amino acids have:
## question
Proteins containing all the essential amino acids have:
## vignette
Dietary proteins differ in how completely they supply the essential amino acids. This item asks what a complete protein is said to have.
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
High biological value
## explanation_a
Correct. A protein that supplies all the essential amino acids in adequate amounts is a complete protein of high biological value — animal proteins such as egg and milk are the classic examples.
## answer_b
Moderate biological value
## explanation_b
Moderate value describes proteins short in one or more essential amino acids. A protein carrying the full set is high, not moderate, value.
## answer_c
Low biological value
## explanation_c
Low biological value describes incomplete proteins, typically plant proteins lacking one or more essential amino acids — the opposite of a protein that contains them all.
## answer_d
Low molecular weight
## explanation_d
Biological value reflects amino-acid completeness, not size. Containing all the essential amino acids says nothing about molecular weight.
## topic
Biochemistry
## subtopic
Amino Acids
## main_concept
CON-FND-F7B968019AB64C
## concept_ids

## contextual_concept_ids

## difficulty
Easy
## question_type
Definition
## cognitive_effort
Low
## cognitive_effort_score
0.2
## setting
Academic
## reasoning_level
1
## inferred_difficulty
79
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
Relate a complete essential-amino-acid profile to high biological value of a protein.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Amino Acids of Biological Importance, printed MCQ 23, page 28; printed answer key = a.
## estimated_seconds
35
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 28.
---
# Item
## id
QST-102-INT-MCQ-060
## title
Amino acids are classified metabolically into:
## question
Amino acids are classified metabolically into:
## vignette
This item asks for the categories of the metabolic classification of amino acids.
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
Ketogenic, glucogenic, and mixed amino acids
## explanation_a
Correct. The metabolic scheme sorts amino acids by the fate of their carbon skeleton: ketogenic (to ketone bodies/acetyl-CoA), glucogenic (to glucose precursors) and mixed (both).
## answer_b
Acidic, alkaline, and neutral amino acids
## explanation_b
Acidic/basic/neutral describes side-chain charge under the chemical classification, not the metabolic fate of the carbon skeleton.
## answer_c
Aliphatic, aromatic, and heterocyclic amino acids
## explanation_c
This is the chemical classification by side-chain structure, not a metabolic grouping.
## answer_d
Essential, non-essential, and semi-essential amino acids
## explanation_d
This is the nutritional classification, based on dietary need, not on whether the carbon skeleton yields glucose or ketone bodies.
## topic
Biochemistry
## subtopic
Amino Acids
## main_concept
CON-FND-4EA3F93C091334
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
79
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
State the three categories of the metabolic classification of amino acids.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Amino Acids of Biological Importance, printed MCQ 25, page 28; printed answer key = a.
## estimated_seconds
30
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 28.
---
# Item
## id
QST-102-INT-MCQ-061
## title
Lysine is:
## question
Lysine is:
## vignette
This item asks for the metabolic class of lysine, whose carbon skeleton has a single fate.
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
Pure ketogenic amino acid
## explanation_a
Correct. Lysine's carbon skeleton is degraded only to acetyl-CoA/acetoacetate and cannot form glucose, so it is one of the two purely ketogenic amino acids (with leucine).
## answer_b
Pure glucogenic amino acid
## explanation_b
Glucogenic amino acids yield glucose precursors such as pyruvate or citric-acid-cycle intermediates. Lysine cannot form glucose, so it is not glucogenic.
## answer_c
Pure galactogenic amino acid
## explanation_c
'Galactogenic' is not a metabolic class of amino acids; the categories are glucogenic, ketogenic and mixed.
## answer_d
Glucogenic and ketogenic amino acid
## explanation_d
Mixed amino acids such as phenylalanine yield both glucose and ketone bodies. Lysine gives only ketogenic products, so it is not mixed.
## topic
Biochemistry
## subtopic
Amino Acids
## main_concept
CON-FND-4EA3F93C091334
## concept_ids

## contextual_concept_ids

## difficulty
Medium
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
Classify lysine as a purely ketogenic amino acid.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Amino Acids of Biological Importance, printed MCQ 26, page 28; printed answer key = a.
## estimated_seconds
40
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 28.
---
# Item
## id
QST-102-INT-MCQ-062
## title
Phenylalanine is:
## question
Phenylalanine is:
## vignette
This item asks for the metabolic class of phenylalanine, whose carbon skeleton has two fates.
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
Pure galactogenic amino acid
## explanation_a
'Galactogenic' is not a real metabolic class of amino acids; the categories are glucogenic, ketogenic and mixed.
## answer_b
Pure glucogenic amino acid
## explanation_b
Phenylalanine does yield the glucose precursor fumarate, but it also yields acetoacetate, so it is not purely glucogenic.
## answer_c
Pure ketogenic amino acid
## explanation_c
Phenylalanine yields the ketogenic product acetoacetate, but it also yields fumarate, a glucose precursor, so it is not purely ketogenic.
## answer_d
Glucogenic and ketogenic amino acid
## explanation_d
Correct. Phenylalanine (via tyrosine) is broken down to both fumarate (glucogenic) and acetoacetate (ketogenic), making it a mixed amino acid.
## topic
Biochemistry
## subtopic
Amino Acids
## main_concept
CON-FND-4EA3F93C091334
## concept_ids

## contextual_concept_ids

## difficulty
Medium
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
61
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
Classify phenylalanine as a mixed (glucogenic and ketogenic) amino acid.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Amino Acids of Biological Importance, printed MCQ 27, page 28; printed answer key = d.
## estimated_seconds
40
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 28.
---
# Item
## id
QST-102-INT-MCQ-063
## title
Amino acid is:
## question
An amino acid is:
## vignette
Amino acids are amphoteric — their net charge depends on the pH of the medium. This item asks how the charge behaves in acidic conditions.
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
Positively charged in acidic medium
## explanation_a
Correct. In an acidic (low-pH) medium, excess protons keep the amino group protonated and suppress carboxyl ionisation, so the amino acid carries a net positive charge and migrates to the cathode.
## answer_b
Positively charged in alkaline medium
## explanation_b
In an alkaline medium the carboxyl group is deprotonated and the amino group loses its proton, so the amino acid is net negative, not positive.
## answer_c
Negatively charged in acidic medium
## explanation_c
A net negative charge appears in alkaline, not acidic, conditions. In acid the molecule gains protons and is positive.
## answer_d
Uncharged in alkaline medium
## explanation_d
At high pH an amino acid carries a net negative charge; it is uncharged only at its isoelectric point, not in an alkaline medium.
## topic
Biochemistry
## subtopic
Amino Acids
## main_concept
CON-FND-889417DDD8A661
## concept_ids

## contextual_concept_ids

## difficulty
Medium
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
62
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
State that an amino acid is positively charged in an acidic medium.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Amino Acids of Biological Importance, printed MCQ 28, page 28; printed answer key = a.
## estimated_seconds
45
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 28.
---
# Item
## id
QST-102-INT-MCQ-064
## title
The isoelectric point (IEP) of all monoamino-monocarboxylic amino acids is at pH:
## question
The isoelectric point (IEP) of all monoamino-monocarboxylic amino acids is at pH:
## vignette
At the isoelectric point an amino acid carries no net charge. This item asks for the approximate IEP of the simple monoamino-monocarboxylic amino acids.
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
10.02
## explanation_a
A pH near 10 is the isoelectric region of basic amino acids such as lysine, not of the neutral monoamino-monocarboxylic ones.
## answer_b
6.02
## explanation_b
Correct. For a simple monoamino-monocarboxylic amino acid the isoelectric point is about 6, the average of the α-carboxyl and α-amino pKa values, where the zwitterion carries no net charge.
## answer_c
2.02
## explanation_c
A pH near 2–3 is the isoelectric region of acidic amino acids such as aspartate, whose extra carboxyl lowers the IEP, not that of the neutral amino acids.
## answer_d
30.02
## explanation_d
A pH of 30 is outside the possible pH scale and cannot be an isoelectric point.
## topic
Biochemistry
## subtopic
Amino Acids
## main_concept
CON-FND-889417DDD8A661
## concept_ids

## contextual_concept_ids

## difficulty
Medium
## question_type
Definition
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
State that the isoelectric point of neutral (monoamino-monocarboxylic) amino acids is about 6.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Amino Acids of Biological Importance, printed MCQ 29, page 29; printed answer key = b.
## estimated_seconds
45
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
OCR printed the stem without "is at pH"; the printed phrasing is restored for readability. Answer key = b.
---
# Item
## id
QST-102-INT-MCQ-065
## title
Peptide bond is formed between the carboxylic group of one amino acid:
## question
A peptide bond is formed between the carboxylic group of one amino acid and:
## vignette
This item asks which group of the next amino acid joins the carboxyl group to make a peptide bond.
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
With the carboxylic group of the other
## explanation_a
Two carboxyl groups do not condense into a peptide bond; a peptide bond joins a carboxyl to an amino group, not carboxyl to carboxyl.
## answer_b
With the amino group of the other
## explanation_b
Correct. A peptide bond is an amide formed by condensation between the α-carboxyl group of one amino acid and the α-amino group of the next, releasing a molecule of water.
## answer_c
With the hydroxylic group of the other
## explanation_c
A carboxyl reacting with a hydroxyl would give an ester, not a peptide bond; the peptide bond forms with the amino group.
## answer_d
With the amidic group of the other
## explanation_d
The peptide bond is itself the amide (–CO–NH–) that results; it forms with the free α-amino group, not with a pre-existing amide group.
## topic
Biochemistry
## subtopic
Amino Acids
## main_concept
CON-FND-7C8A02831B3243
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
79
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
State that a peptide bond forms between the carboxyl group of one amino acid and the amino group of the next.
## source_citation
Kasr Al Ainy Department Book MCQs — "DPT BOOK MCQ D book bio 102&103 mcq (1).pdf", manifest src_07f0a0ff41addf826c7f; chapter Amino Acids of Biological Importance, printed MCQ 30, page 29; printed answer key = b.
## estimated_seconds
35
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Verbatim from page 29; stem lightly repunctuated for readability.

---
# Item
## id
QST-102-INT-MCQ-066
## title
Which of the following is an aldotriose?
## question
Which of the following is an aldotriose?
## vignette
This item asks the student to match each aldose to its carbon-count class, starting with the aldotriose.
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
Glyceraldehyde
## explanation_a
Correct. Glyceraldehyde is the aldotriose — the 3-carbon aldose.
## answer_b
Erythrose
## explanation_b
Erythrose is the aldotetrose (4 carbons), one carbon longer than an aldotriose.
## answer_c
Ribose
## explanation_c
Ribose is an aldopentose (5 carbons), not a triose.
## answer_d
Glucose
## explanation_d
Glucose is an aldohexose (6 carbons), the largest of the aldoses named in this list.
## topic
Biochemistry
## subtopic
Carbohydrates of Biological Importance
## main_concept
CON-FND-ABEA43BF07B408
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
79
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
102 INT > Biochemistry > Carbohydrates of Biological Importance
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-CARBOHYDRATES-OF-BIOLOGICAL-IMPORTANCE
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Match each aldose to its carbon-count class, starting with the aldotriose.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p6 q2. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---
# Item
## id
QST-102-INT-MCQ-067
## title
Which of the following are Aldohexoses?
## question
Which of the following are Aldohexoses?
## vignette
This item asks the student to identify a pair of named aldohexoses (glucose, mannose, galactose).
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
Glucose and fructose
## explanation_a
Fructose is a ketohexose, not an aldose, so this pair mixes classes even though both sugars are hexoses.
## answer_b
Fructose and ribose
## explanation_b
Fructose is a ketohexose and ribose is an aldopentose — neither is an aldohexose, so this pair fails on both counts.
## answer_c
Glucose and Galactose
## explanation_c
Correct. Glucose, mannose and galactose are the aldohexose examples; glucose and galactose are two of the three.
## answer_d
Ribose and glucose
## explanation_d
Ribose is an aldopentose, not a hexose, so this pair fails the carbon-count test even though glucose alone qualifies.
## topic
Biochemistry
## subtopic
Carbohydrates of Biological Importance
## main_concept
CON-FND-ABEA43BF07B408
## concept_ids

## contextual_concept_ids

## difficulty
Moderate
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
79
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
102 INT > Biochemistry > Carbohydrates of Biological Importance
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-CARBOHYDRATES-OF-BIOLOGICAL-IMPORTANCE
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Identify a pair of named aldohexoses (glucose, mannose, galactose).
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p6 q3. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---
# Item
## id
QST-102-INT-MCQ-068
## title
Which of the following is the simplest ketose?
## question
Which of the following is the simplest ketose?
## vignette
This item asks the student to name dihydroxyacetone as the simplest ketose.
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
Erythrulose
## explanation_a
Erythrulose is the ketotetrose (4 carbons) — one class larger than the simplest ketose.
## answer_b
Ribulose
## explanation_b
Ribulose is the ketopentose (5 carbons), further still from the simplest ketose.
## answer_c
Dihydroxyacetone
## explanation_c
Correct. Dihydroxyacetone is the simplest ketose (C3).
## answer_d
Fructose
## explanation_d
Fructose is the ketohexose (6 carbons), the largest ketose named in this list, not the simplest.
## topic
Biochemistry
## subtopic
Carbohydrates of Biological Importance
## main_concept
CON-FND-ABEA43BF07B408
## concept_ids

## contextual_concept_ids

## difficulty
Easy
## question_type
Definition
## cognitive_effort
Low
## cognitive_effort_score
0.2
## setting
Academic
## reasoning_level
1
## inferred_difficulty
79
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
102 INT > Biochemistry > Carbohydrates of Biological Importance
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-CARBOHYDRATES-OF-BIOLOGICAL-IMPORTANCE
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Name dihydroxyacetone as the simplest ketose.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p7 q7. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---
# Item
## id
QST-102-INT-MCQ-069
## title
A ketohexose sugar is:
## question
A ketohexose sugar is:
## vignette
This item asks the student to identify fructose as the ketohexose example.
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
Dihydroxyacetone
## explanation_a
Dihydroxyacetone is the ketotriose (3 carbons), not a hexose.
## answer_b
Ribulose
## explanation_b
Ribulose is the ketopentose (5 carbons), one carbon short of a hexose.
## answer_c
Fructose
## explanation_c
Correct. Fructose is the named example of a ketohexose.
## answer_d
Glucose
## explanation_d
Glucose is a hexose but an aldose, not a ketose — it carries its carbonyl group at C1, not C2.
## topic
Biochemistry
## subtopic
Carbohydrates of Biological Importance
## main_concept
CON-FND-ABEA43BF07B408
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
79
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
102 INT > Biochemistry > Carbohydrates of Biological Importance
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-CARBOHYDRATES-OF-BIOLOGICAL-IMPORTANCE
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Identify fructose as the ketohexose example.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p7 q8. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---
# Item
## id
QST-102-INT-MCQ-070
## title
Two sugars which differ from one another only in the configuration around a single carbon atom are termed:
## question
Two sugars which differ from one another only in the configuration around a single carbon atom are termed:
## vignette
This item asks the student to recall the definition of epimers.
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
Epimers
## explanation_a
Correct. Epimers are compounds with the same molecular formula that differ only in the configuration around one carbon.
## answer_b
Anomers
## explanation_b
Anomers are specifically the alpha- and beta- forms created by cyclization at the new stereocentre, not a difference at any single carbon in general.
## answer_c
Optical isomers
## explanation_c
"Optical isomers" is not one of the four named isomer types here.
## answer_d
Stereoisomers
## explanation_d
"Stereoisomers" is a broader term than the specific, single-carbon definition of epimers — it would also describe enantiomers and anomers, so it is less precise than the option the question is testing for.
## topic
Biochemistry
## subtopic
Carbohydrates of Biological Importance
## main_concept
CON-FND-358E18A31D89FC
## concept_ids

## contextual_concept_ids

## difficulty
Moderate
## question_type
Definition
## cognitive_effort
Low
## cognitive_effort_score
0.2
## setting
Academic
## reasoning_level
1
## inferred_difficulty
79
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
102 INT > Biochemistry > Carbohydrates of Biological Importance
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-CARBOHYDRATES-OF-BIOLOGICAL-IMPORTANCE
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Recall the definition of epimers.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p8 q18. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---
# Item
## id
QST-102-INT-MCQ-071
## title
D- glucose and D- mannose are epimers at carbon:
## question
D- glucose and D- mannose are epimers at carbon:
## vignette
This item asks the student to recall that glucose and mannose are epimers at C2.
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
l
## explanation_a
C2, not C1, is the point of difference between glucose and mannose.
## answer_b
3
## explanation_b
C3 is not the carbon for the glucose-mannose epimer pair; C4 is the carbon for the glucose-galactose pair instead.
## answer_c
2
## explanation_c
Correct. Glucose and mannose are epimers at C2.
## answer_d
5
## explanation_d
C5 is not a configuration named for any epimer pair in this chapter.
## topic
Biochemistry
## subtopic
Carbohydrates of Biological Importance
## main_concept
CON-FND-358E18A31D89FC
## concept_ids

## contextual_concept_ids

## difficulty
Easy
## question_type
Structure and function
## cognitive_effort
Low
## cognitive_effort_score
0.2
## setting
Academic
## reasoning_level
1
## inferred_difficulty
79
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
102 INT > Biochemistry > Carbohydrates of Biological Importance
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-CARBOHYDRATES-OF-BIOLOGICAL-IMPORTANCE
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Recall that glucose and mannose are epimers at C2.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p8 q20. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---
# Item
## id
QST-102-INT-MCQ-072
## title
D- glucose and D- galactose are epimers at carbon:
## question
D- glucose and D- galactose are epimers at carbon:
## vignette
This item asks the student to recall that glucose and galactose are epimers at C4.
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
l
## explanation_a
C1 is not the carbon named for either epimer pair.
## answer_b
2
## explanation_b
C2 is the carbon named for the glucose-mannose pair, not glucose-galactose.
## answer_c
3
## explanation_c
C3 is not a configuration named for any epimer pair in this chapter.
## answer_d
4
## explanation_d
Correct. Glucose and galactose are epimers at C4.
## topic
Biochemistry
## subtopic
Carbohydrates of Biological Importance
## main_concept
CON-FND-358E18A31D89FC
## concept_ids

## contextual_concept_ids

## difficulty
Easy
## question_type
Structure and function
## cognitive_effort
Low
## cognitive_effort_score
0.2
## setting
Academic
## reasoning_level
1
## inferred_difficulty
79
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
102 INT > Biochemistry > Carbohydrates of Biological Importance
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-CARBOHYDRATES-OF-BIOLOGICAL-IMPORTANCE
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Recall that glucose and galactose are epimers at C4.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p8 q21. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---
# Item
## id
QST-102-INT-MCQ-073
## title
The sugar abundantly present in honey is:
## question
The sugar abundantly present in honey is:
## vignette
This item asks the student to name fructose as the sugar present in honey.
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
Maltose
## explanation_a
Maltose is not among the sugars present in honey; it is the disaccharide product of starch digestion.
## answer_b
Fructose
## explanation_b
Correct. Fructose ("fruit sugar") is present in honey, fruits, semen, sucrose and inulin.
## answer_c
Ribulose
## explanation_c
Ribulose is a ketopentose used as a structural example elsewhere in the chapter, not a sugar present in honey.
## answer_d
Lactose
## explanation_d
Lactose is milk sugar, formed of galactose and glucose — it is not present in honey.
## topic
Biochemistry
## subtopic
Carbohydrates of Biological Importance
## main_concept
CON-FND-EDE6D8E401EB10
## concept_ids

## contextual_concept_ids

## difficulty
Easy
## question_type
Definition
## cognitive_effort
Low
## cognitive_effort_score
0.2
## setting
Academic
## reasoning_level
1
## inferred_difficulty
79
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
102 INT > Biochemistry > Carbohydrates of Biological Importance
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-CARBOHYDRATES-OF-BIOLOGICAL-IMPORTANCE
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Name fructose as the sugar present in honey.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p9 q25. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---
# Item
## id
QST-102-INT-MCQ-074
## title
The sugar found in DNA is:
## question
The sugar found in DNA is:
## vignette
This item asks the student to name deoxyribose as the sugar of DNA.
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
Xylose
## explanation_a
Xylose is an aldopentose example used earlier in the chapter's carbon-count classification, not a nucleic-acid sugar.
## answer_b
Ribose
## explanation_b
Ribose is the RNA sugar, the other pentose in this pair — easy to swap with deoxyribose if the two nucleic acids aren't kept straight.
## answer_c
Deoxyribose
## explanation_c
Correct. 2-deoxyribose is a component of deoxyribonucleic acid (DNA).
## answer_d
Ribulose
## explanation_d
Ribulose is a ketopentose from the carbonyl/carbon-count classification, not a nucleic-acid sugar.
## topic
Biochemistry
## subtopic
Carbohydrates of Biological Importance
## main_concept
CON-FND-EDE6D8E401EB10
## concept_ids

## contextual_concept_ids

## difficulty
Easy
## question_type
Definition
## cognitive_effort
Low
## cognitive_effort_score
0.2
## setting
Academic
## reasoning_level
1
## inferred_difficulty
79
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
102 INT > Biochemistry > Carbohydrates of Biological Importance
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-CARBOHYDRATES-OF-BIOLOGICAL-IMPORTANCE
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Name deoxyribose as the sugar of DNA.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p9 q26. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---
# Item
## id
QST-102-INT-MCQ-075
## title
Sugar alcohol of glucose is:
## question
Sugar alcohol of glucose is:
## vignette
This item asks the student to match glucose to its sugar alcohol, sorbitol.
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
Sorbitol
## explanation_a
Correct. Sorbitol is glucose and fructose alcohol.
## answer_b
Inositol
## explanation_b
Inositol is not named among the sugar alcohols at all.
## answer_c
Dulcitol
## explanation_c
Dulcitol is galactose alcohol, not glucose's.
## answer_d
Mannitol
## explanation_d
Mannitol is mannose alcohol, not glucose's.
## topic
Biochemistry
## subtopic
Carbohydrates of Biological Importance
## main_concept
CON-FND-2BD334DFDAE34C
## concept_ids

## contextual_concept_ids

## difficulty
Easy
## question_type
Structure and function
## cognitive_effort
Low
## cognitive_effort_score
0.2
## setting
Academic
## reasoning_level
1
## inferred_difficulty
79
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
102 INT > Biochemistry > Carbohydrates of Biological Importance
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-CARBOHYDRATES-OF-BIOLOGICAL-IMPORTANCE
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Match glucose to its sugar alcohol, sorbitol.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p9 q28. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---
# Item
## id
QST-102-INT-MCQ-076
## title
In amino sugars, an amino group replaces the hydroxyl group on which carbon?
## question
In amino sugars, an amino group replaces the hydroxyl group on which carbon?
## vignette
This item asks the student to state that amino sugars are formed by replacing the C2 hydroxyl with an amino group.
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
First carbon
## explanation_a
C1 carries the carbonyl group (the aldehyde) in an aldose, not the substitution site for amino sugars.
## answer_b
Second carbon
## explanation_b
Correct. Amino sugars are sugars in which the hydroxyl group at C2 is replaced by an amino group (NH2).
## answer_c
Third carbon
## explanation_c
C3 is not the substitution site for amino sugars — it is also not the site for deoxy sugars, which use C2 as well.
## answer_d
Fourth carbon
## explanation_d
C4 is not a substitution site for any of the monosaccharide derivative classes here.
## topic
Biochemistry
## subtopic
Carbohydrates of Biological Importance
## main_concept
CON-FND-2BD334DFDAE34C
## concept_ids

## contextual_concept_ids

## difficulty
Easy
## question_type
Structure and function
## cognitive_effort
Low
## cognitive_effort_score
0.2
## setting
Academic
## reasoning_level
1
## inferred_difficulty
79
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
102 INT > Biochemistry > Carbohydrates of Biological Importance
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-CARBOHYDRATES-OF-BIOLOGICAL-IMPORTANCE
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
State that amino sugars are formed by replacing the C2 hydroxyl with an amino group.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p11 q38. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---
# Item
## id
QST-102-INT-MCQ-077
## title
Reduction of monosaccharides produces:
## question
Reduction of monosaccharides produces:
## vignette
This item asks the student to state that reducing a monosaccharide's carbonyl group produces a sugar alcohol.
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
Sugar acid
## explanation_a
Sugar acids form by oxidation of the primary alcohol group, the opposite chemistry to reduction.
## answer_b
Deoxy sugar
## explanation_b
Deoxy sugars form by replacing the C2 hydroxyl with hydrogen, not by reducing the carbonyl group.
## answer_c
Amino sugar
## explanation_c
Amino sugars form by replacing the C2 hydroxyl with an amino group, not by reduction.
## answer_d
Sugar alcohol
## explanation_d
Correct. Sugar alcohols are sugars in which the carbonyl group is reduced to an alcohol group.
## topic
Biochemistry
## subtopic
Carbohydrates of Biological Importance
## main_concept
CON-FND-2BD334DFDAE34C
## concept_ids

## contextual_concept_ids

## difficulty
Easy
## question_type
Definition
## cognitive_effort
Low
## cognitive_effort_score
0.2
## setting
Academic
## reasoning_level
1
## inferred_difficulty
79
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
102 INT > Biochemistry > Carbohydrates of Biological Importance
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-CARBOHYDRATES-OF-BIOLOGICAL-IMPORTANCE
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
State that reducing a monosaccharide's carbonyl group produces a sugar alcohol.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p9 q29. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---
# Item
## id
QST-102-INT-MCQ-078
## title
Which of the following is a sugar alcohol?
## question
Which of the following is a sugar alcohol?
## vignette
This item asks the student to identify mannitol as a sugar alcohol against three unmodified sugars.
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
Mannitol
## explanation_a
Correct. Mannitol is the sugar alcohol of mannose, formed by reducing mannose's carbonyl group to an alcohol group.
## answer_b
Fructose
## explanation_b
Fructose is an unmodified ketohexose, not a reduction product of any sugar.
## answer_c
Galactose
## explanation_c
Galactose is an unmodified aldohexose — its reduction product, dulcitol, would be the sugar alcohol, not galactose itself.
## answer_d
Ribose
## explanation_d
Ribose is an unmodified aldopentose — its reduction product, ribitol, would be the sugar alcohol, not ribose itself.
## topic
Biochemistry
## subtopic
Carbohydrates of Biological Importance
## main_concept
CON-FND-38F8E2264D46B1
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
79
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
102 INT > Biochemistry > Carbohydrates of Biological Importance
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-CARBOHYDRATES-OF-BIOLOGICAL-IMPORTANCE
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Identify mannitol as a sugar alcohol against three unmodified sugars.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p10 q30. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---
# Item
## id
QST-102-INT-MCQ-079
## title
Sucrose hydrolysis produces:
## question
Sucrose hydrolysis produces:
## vignette
This item asks the student to state that sucrose hydrolyses to glucose and fructose.
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
Galactose and mannose
## explanation_a
Neither galactose nor mannose is a component of sucrose; sucrose is built from fructose and glucose.
## answer_b
Glucose and fructose
## explanation_b
Correct. Sucrose is formed of fructose and glucose united by a glycosidic linkage, so hydrolysis returns those two monosaccharides.
## answer_c
Glucose and galactose
## explanation_c
Glucose and galactose are the hydrolysis products of lactose, not sucrose.
## answer_d
Glucose and mannose
## explanation_d
Mannose is not a component of any disaccharide named in this chapter.
## topic
Biochemistry
## subtopic
Carbohydrates of Biological Importance
## main_concept
CON-FND-FC888FB7A7D8A8
## concept_ids

## contextual_concept_ids

## difficulty
Easy
## question_type
Structure and function
## cognitive_effort
Low
## cognitive_effort_score
0.2
## setting
Academic
## reasoning_level
1
## inferred_difficulty
79
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
102 INT > Biochemistry > Carbohydrates of Biological Importance
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-CARBOHYDRATES-OF-BIOLOGICAL-IMPORTANCE
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
State that sucrose hydrolyses to glucose and fructose.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p11 q41. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---
# Item
## id
QST-102-INT-MCQ-080
## title
One of following is a non- reducing disaccharide:
## question
One of following is a non- reducing disaccharide:
## vignette
This item asks the student to identify sucrose as the non-reducing disaccharide.
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
Isomaltose
## explanation_a
Isomaltose is not discussed as an exception to the reducing pattern; only sucrose is singled out as non-reducing.
## answer_b
Lactose
## explanation_b
Lactose is grouped with maltose as having a free carbonyl group, making it a reducing sugar.
## answer_c
Sucrose
## explanation_c
Correct. In sucrose both carbonyl carbons are involved in the linkage, so it is non-reducing.
## answer_d
Maltose
## explanation_d
Maltose is reducing, alongside lactose, because it retains a free carbonyl group.
## topic
Biochemistry
## subtopic
Carbohydrates of Biological Importance
## main_concept
CON-FND-FC888FB7A7D8A8
## concept_ids

## contextual_concept_ids

## difficulty
Moderate
## question_type
Structure and function
## cognitive_effort
Low
## cognitive_effort_score
0.2
## setting
Academic
## reasoning_level
1
## inferred_difficulty
79
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
102 INT > Biochemistry > Carbohydrates of Biological Importance
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-CARBOHYDRATES-OF-BIOLOGICAL-IMPORTANCE
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Identify sucrose as the non-reducing disaccharide.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p11 q44. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---
# Item
## id
QST-102-INT-MCQ-081
## title
A carbohydrate formed by B 1,4-galactosidic linkages is:
## question
A carbohydrate formed by B 1,4-galactosidic linkages is:
## vignette
This item asks the student to match the beta1,4-galactosidic linkage to lactose.
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
Maltose
## explanation_a
Maltose's linkage is alpha1,4-glucosidic, a glucosidic bond rather than a galactosidic one.
## answer_b
Cellulose
## explanation_b
Cellulose's linkage is beta1,4-glucosidic — the same anomeric form and position as lactose's, but glucosidic rather than galactosidic, since cellulose is built of glucose units only.
## answer_c
Lactose
## explanation_c
Correct. Lactose is galactose and glucose united by a beta1,4-galactosidic linkage.
## answer_d
Sucrose
## explanation_d
Sucrose's linkage is alpha1,2-glucosidic (beta2,1-fructosidic), not a 1,4-galactosidic bond.
## topic
Biochemistry
## subtopic
Carbohydrates of Biological Importance
## main_concept
CON-FND-FC888FB7A7D8A8
## concept_ids

## contextual_concept_ids

## difficulty
Easy
## question_type
Structure and function
## cognitive_effort
Low
## cognitive_effort_score
0.2
## setting
Academic
## reasoning_level
1
## inferred_difficulty
79
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
102 INT > Biochemistry > Carbohydrates of Biological Importance
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-CARBOHYDRATES-OF-BIOLOGICAL-IMPORTANCE
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Match the beta1,4-galactosidic linkage to lactose.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p12 q49. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---
# Item
## id
QST-102-INT-MCQ-082
## title
Which of the following is a polymer of fructose?
## question
Which of the following is a polymer of fructose?
## vignette
This item asks the student to identify inulin as a fructan (fructose polymer).
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
Starch
## explanation_a
Starch is a glucan — a polymer of glucose, per the Glucans list.
## answer_b
Dextrin
## explanation_b
Dextrin is not discussed in the homopolysaccharide classification.
## answer_c
Inulin
## explanation_c
Correct. Inulin is a fructan, formed of fructose units, present in plants.
## answer_d
Cellulose
## explanation_d
Cellulose is a glucan — a polymer of glucose, per the Glucans list, alongside starch and glycogen.
## topic
Biochemistry
## subtopic
Carbohydrates of Biological Importance
## main_concept
CON-FND-4128FE1AD6819C
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
79
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
102 INT > Biochemistry > Carbohydrates of Biological Importance
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-CARBOHYDRATES-OF-BIOLOGICAL-IMPORTANCE
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Identify inulin as a fructan (fructose polymer).
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p12 q51. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---
# Item
## id
QST-102-INT-MCQ-083
## title
Starch is a:
## question
Starch is a:
## vignette
This item asks the student to classify starch as a homopolysaccharide (glucan).
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
Homopolysaccharide
## explanation_a
Correct. Starch is listed among the Glucans — homopolysaccharides built entirely of glucose units.
## answer_b
Monosaccharide
## explanation_b
Starch is a large polymer of many glucose units, far from the single-unit monosaccharide class.
## answer_c
Disaccharide
## explanation_c
Starch contains far more than the two units that define a disaccharide.
## answer_d
Heteropolysaccharide
## explanation_d
Heteropolysaccharides contain more than one monosaccharide type; starch is built of glucose alone, which makes it a homopolysaccharide instead.
## topic
Biochemistry
## subtopic
Carbohydrates of Biological Importance
## main_concept
CON-FND-4706C1246E4B76
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
79
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
102 INT > Biochemistry > Carbohydrates of Biological Importance
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-CARBOHYDRATES-OF-BIOLOGICAL-IMPORTANCE
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Classify starch as a homopolysaccharide (glucan).
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p13 q54. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---
# Item
## id
QST-102-INT-MCQ-084
## title
Which of the following is the carbohydrate storage form in animals?
## question
Which of the following is the carbohydrate storage form in animals?
## vignette
This item asks the student to state that glycogen is the animal storage carbohydrate.
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
Starch
## explanation_a
Starch is the plant storage form, not the animal one.
## answer_b
Glycogen
## explanation_b
Correct. Glycogen is the storage form of carbohydrates in animals.
## answer_c
Glucose
## explanation_c
Glucose is the monosaccharide that glycogen is built from and stores, not the storage form itself.
## answer_d
Inulin
## explanation_d
Inulin is a plant fructan, unrelated to animal carbohydrate storage.
## topic
Biochemistry
## subtopic
Carbohydrates of Biological Importance
## main_concept
CON-FND-4706C1246E4B76
## concept_ids

## contextual_concept_ids

## difficulty
Easy
## question_type
Definition
## cognitive_effort
Low
## cognitive_effort_score
0.2
## setting
Academic
## reasoning_level
1
## inferred_difficulty
79
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
102 INT > Biochemistry > Carbohydrates of Biological Importance
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-CARBOHYDRATES-OF-BIOLOGICAL-IMPORTANCE
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
State that glycogen is the animal storage carbohydrate.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p13 q57. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---
# Item
## id
QST-102-INT-MCQ-085
## title
Which of the following is a glycosaminoglycans?
## question
Which of the following is a glycosaminoglycans?
## vignette
This item asks the student to identify heparin as a GAG against a fructan and two amino sugars.
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
Inulin.
## explanation_a
Inulin is a fructan homopolysaccharide, not a GAG.
## answer_b
Heparin
## explanation_b
Correct. Heparin is one of the sulfate-containing glycosaminoglycans.
## answer_c
Glucosamine
## explanation_c
Glucosamine is an amino sugar — a monosaccharide derivative and a building block that GAGs are made from, not a GAG itself.
## answer_d
Galactosamine
## explanation_d
Galactosamine is likewise an amino sugar, a component monosaccharide of some GAGs rather than a GAG in its own right.
## topic
Biochemistry
## subtopic
Carbohydrates of Biological Importance
## main_concept
CON-FND-E84660F1CEC3AE
## concept_ids

## contextual_concept_ids

## difficulty
Moderate
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
79
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
102 INT > Biochemistry > Carbohydrates of Biological Importance
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-CARBOHYDRATES-OF-BIOLOGICAL-IMPORTANCE
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Identify heparin as a GAG against a fructan and two amino sugars.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p14 q65. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---
# Item
## id
QST-102-INT-MCQ-086
## title
The polysaccharide which is used to prevent blood clotting is:
## question
The polysaccharide which is used to prevent blood clotting is:
## vignette
This item asks the student to name heparin as the anticoagulant GAG.
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
Heparin
## explanation_a
Correct. Heparin proteoglycan is an important anticoagulant, preventing thrombus formation.
## answer_b
Keratan sulfate
## explanation_b
Keratan sulfate's role is corneal transparency and development, not anticoagulation.
## answer_c
Cellulose
## explanation_c
Cellulose is a structural plant homopolysaccharide, unrelated to blood clotting.
## answer_d
Heparan sulfate
## explanation_d
Heparan sulfate's role is cell membrane receptors and cell-cell interaction — a name easily confused with heparin, but a different job.
## topic
Biochemistry
## subtopic
Carbohydrates of Biological Importance
## main_concept
CON-FND-CD24D4572D101B
## concept_ids

## contextual_concept_ids

## difficulty
Easy
## question_type
Structure and function
## cognitive_effort
Low
## cognitive_effort_score
0.2
## setting
Academic
## reasoning_level
1
## inferred_difficulty
79
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
102 INT > Biochemistry > Carbohydrates of Biological Importance
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-CARBOHYDRATES-OF-BIOLOGICAL-IMPORTANCE
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Name heparin as the anticoagulant GAG.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p14 q67. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---
# Item
## id
QST-102-INT-MCQ-087
## title
Free cholesterol contains:
## question
Free cholesterol contains:
## vignette
This item asks the student to state that free cholesterol contains 27 carbon atoms.
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
24 carbon atoms
## explanation_a
24 carbon atoms is the threshold for a 'very long chain' fatty acid, not cholesterol's own carbon count.
## answer_b
25 carbon atoms
## explanation_b
25 carbon atoms is not the figure for cholesterol, which contains 27.
## answer_c
26 carbon atoms
## explanation_c
26 carbon atoms is not the figure for cholesterol, which contains 27.
## answer_d
27 carbon atoms
## explanation_d
Correct. Free cholesterol contains 27 carbon atoms.
## topic
Lipids Of Biological Importance
## subtopic
Lipids of Biological Importance
## main_concept
CON-FND-E77FD4A4D78884
## concept_ids

## contextual_concept_ids

## difficulty
Easy
## question_type
Structure and function
## cognitive_effort
Low
## cognitive_effort_score
0.2
## setting
Academic
## reasoning_level
1
## inferred_difficulty
79
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
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
State that free cholesterol contains 27 carbon atoms.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p22 q38. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.
---
# Item
## id
QST-102-INT-MCQ-088
## title
Phosphatidic acid is present in:
## question
Phosphatidic acid is present in:
## vignette
This item asks the student to identify lecithin and cephalin as phosphatidic acid derivatives, distinct from the ceramide-based glycolipids.
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
Lecithin and cephalin
## explanation_a
Correct. Both lecithin (phosphatidic acid plus choline) and cephalin (phosphatidic acid plus ethanolamine) are built directly on phosphatidic acid, so it is present in both.
## answer_b
Lecithin and cerebrosides
## explanation_b
Cerebrosides are glycolipids, built from ceramide and a carbohydrate, not from phosphatidic acid at all.
## answer_c
Gangliosides and cephalin
## explanation_c
Gangliosides are glycolipids, built from ceramide and a carbohydrate radical, not from phosphatidic acid.
## answer_d
Lecithin and gangliosides
## explanation_d
Gangliosides are glycolipids built from ceramide, not phosphatidic acid, so this pairing is wrong on the gangliosides half even though lecithin is correctly a phosphatidic acid derivative.
## topic
Lipids Of Biological Importance
## subtopic
Lipids of Biological Importance
## main_concept
CON-FND-D5D15A190D88AE
## concept_ids

## contextual_concept_ids

## difficulty
Moderate
## question_type
Structure and function
## cognitive_effort
Medium
## cognitive_effort_score
0.5
## setting
Academic
## reasoning_level
1
## inferred_difficulty
60
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
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
Identify lecithin and cephalin as phosphatidic acid derivatives, distinct from the ceramide-based glycolipids.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p19 q21. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.
---
# Item
## id
QST-102-INT-MCQ-089
## title
Which of the following is considered glycolipid?
## question
Which of the following is considered glycolipid?
## vignette
This item asks the student to name cerebrosides as one of the glycolipid examples.
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
Sphingomyelin
## explanation_a
Sphingomyelin is classed as a phospholipid (ceramide plus phosphocholine), not a glycolipid.
## answer_b
Lecithin
## explanation_b
Lecithin is a glycerophospholipid (phosphatidic acid plus choline), not a glycolipid.
## answer_c
Plasmalogens
## explanation_c
Plasmalogens are glycerophospholipids with a fatty-alcohol substitution, not glycolipids.
## answer_d
Cerebrosides
## explanation_d
Correct. Cerebrosides are listed directly among the glycolipid examples, alongside sulfolipids and gangliosides.
## topic
Lipids Of Biological Importance
## subtopic
Lipids of Biological Importance
## main_concept
CON-FND-5C3202473D16EA
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
79
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
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
Name cerebrosides as one of the glycolipid examples.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p21 q34. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.
---
# Item
## id
QST-102-INT-MCQ-090
## title
Hydrolysis of phosphatidic acid yields:
## question
Hydrolysis of phosphatidic acid yields:
## vignette
This item asks the student to derive phosphatidic acid's hydrolysis products (1,2-diacylglycerol and phosphoric acid) from its stated substituent positions on glycerol.
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
1, 2-diacylglycerol and phosphoric acid
## explanation_a
Correct. Phosphoric acid sits at position 3 of phosphatidic acid's glycerol backbone, with the two fatty acids at positions 1 and 2; hydrolysing off that phosphate leaves 1,2-diacylglycerol and phosphoric acid.
## answer_b
1, 3-diacylglycerol and phosphoric acid
## explanation_b
A 1,3-diacylglycerol would require the phosphate to sit at position 2, contradicting the standard numbering, which places phosphoric acid at position 3 and the two fatty acids at positions 1 and 2.
## answer_c
1, 4-diacylglycerol and phosphoric acid
## explanation_c
Glycerol has only three carbons, so a '4' position does not exist on it — this option is not consistent with the glycerol-based structure of phosphatidic acid.
## answer_d
1, 5-diacylglycerol and phosphoric acid
## explanation_d
Glycerol has only three carbons, so a '5' position does not exist on it — this option is not consistent with the glycerol-based structure of phosphatidic acid.
## topic
Lipids Of Biological Importance
## subtopic
Lipids of Biological Importance
## main_concept
CON-FND-D5D15A190D88AE
## concept_ids

## contextual_concept_ids

## difficulty
Hard
## question_type
Structure and function
## cognitive_effort
High
## cognitive_effort_score
0.8
## setting
Academic
## reasoning_level
1
## inferred_difficulty
45
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
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
Derive phosphatidic acid's hydrolysis products (1,2-diacylglycerol and phosphoric acid) from its stated substituent positions on glycerol.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p19 q20. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.
---
# Item
## id
QST-102-INT-MCQ-091
## title
Which of the following is a simple lipid?
## question
Which of the following is a simple lipid?
## vignette
This item asks the student to identify triacylglycerol as the simple lipid example.
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
Lecithin
## explanation_a
Lecithin is a compound lipid — a phospholipid, since it contains fatty acid, alcohol and a phosphate group.
## answer_b
Fatty acid
## explanation_b
Fatty acid on its own is a derived lipid, a hydrolysis product, not a simple lipid (an ester).
## answer_c
Triacylglycerol
## explanation_c
Correct. Triacylglycerol (neutral fat) is the example of a simple lipid — an ester of fatty acids with the alcohol glycerol, nothing more added.
## answer_d
Steroids BS =
## explanation_d
Steroids are derived lipids, not esters of fatty acid with alcohol at all.
## topic
Lipids Of Biological Importance
## subtopic
Lipids of Biological Importance
## main_concept
CON-FND-30D2E317144DDF
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
79
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
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
Identify triacylglycerol as the simple lipid example.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p18 q14. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.
---
# Item
## id
QST-102-INT-MCQ-092
## title
Lung surfactant is formed mainly of:
## question
Lung surfactant is formed mainly of:
## vignette
This item asks the student to name dipalmitoyl-lecithin as the main constituent of lung surfactant.
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
Dipalmitoyl-lecithin
## explanation_a
Correct. Lung surfactant is formed mainly of dipalmitoyl-lecithin, secreted naturally by pneumocytes.
## answer_b
Phosphatidylethanolamine
## explanation_b
Phosphatidylethanolamine (cephalin) is not the surfactant lipid; its own role is increasing thrombin formation for blood clotting.
## answer_c
Ceramide
## explanation_c
Ceramide is a sphingolipid building block, not the lipid credited with forming lung surfactant.
## answer_d
Phosphatidylinositol
## explanation_d
Phosphatidylinositol's role is as a second messenger, not as the main constituent of lung surfactant.
## topic
Lipids Of Biological Importance
## subtopic
Lipids of Biological Importance
## main_concept
CON-FND-CEDE8978E2DE3A
## concept_ids

## contextual_concept_ids

## difficulty
Easy
## question_type
Structure and function
## cognitive_effort
Low
## cognitive_effort_score
0.2
## setting
Academic
## reasoning_level
1
## inferred_difficulty
79
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
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
Name dipalmitoyl-lecithin as the main constituent of lung surfactant.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p20 q24. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.
---
# Item
## id
QST-102-INT-MCQ-093
## title
Cholesteryl esters are examples of:
## question
Cholesteryl esters are examples of:
## vignette
This item asks the student to identify cholesteryl esters as one of the wax examples.
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
Waxes
## explanation_a
Correct. Cholesteryl esters are listed directly among the wax examples, alongside ceramide and the vitamin A/D esters.
## answer_b
Neutral fats
## explanation_b
Neutral fats are the triacylglycerol subtype of simple lipid — three fatty acids on glycerol — not cholesteryl esters.
## answer_c
Compound lipids
## explanation_c
Compound lipids add a phosphate or carbohydrate group beyond fatty acid and alcohol; cholesteryl esters, a wax, are a simple lipid.
## answer_d
Derived lipids
## explanation_d
Derived lipids are hydrolysis products such as free fatty acids and steroids; the ester form, cholesteryl esters, is specifically filed under waxes rather than derived lipids.
## topic
Lipids Of Biological Importance
## subtopic
Lipids of Biological Importance
## main_concept
CON-FND-E618B54C3E216C
## concept_ids

## contextual_concept_ids

## difficulty
Moderate
## question_type
Classification
## cognitive_effort
Medium
## cognitive_effort_score
0.5
## setting
Academic
## reasoning_level
1
## inferred_difficulty
60
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
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
Identify cholesteryl esters as one of the wax examples.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p19 q18. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.
---
# Item
## id
QST-102-INT-MCQ-094
## title
How many carbon atoms do eicosanoids have?
## question
How many carbon atoms do eicosanoids have?
## vignette
This item asks the student to state that eicosanoids are C20 compounds, matching their arachidonic acid precursor.
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
18
## explanation_a
18 carbons describes fatty acids like stearic, oleic or linoleic acid, not the C20 backbone of eicosanoids.
## answer_b
20
## explanation_b
Correct. Eicosanoids are physiologically active compounds formed from C20 polyunsaturated fatty acids such as arachidonic acid.
## answer_c
22
## explanation_c
22 carbons is not the carbon count of eicosanoids; they are C20 specifically, matching arachidonic acid.
## answer_d
24
## explanation_d
24 carbons describes a very-long-chain fatty acid by chain-length classification, not the C20 eicosanoids.
## topic
Lipids Of Biological Importance
## subtopic
Lipids of Biological Importance
## main_concept
CON-FND-588CA87354B099
## concept_ids

## contextual_concept_ids

## difficulty
Easy
## question_type
Definition
## cognitive_effort
Low
## cognitive_effort_score
0.2
## setting
Academic
## reasoning_level
1
## inferred_difficulty
79
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
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
State that eicosanoids are C20 compounds, matching their arachidonic acid precursor.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p18 q12. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.
---
# Item
## id
QST-102-INT-MCQ-095
## title
What is the other name of triglycerides?
## question
What is the other name of triglycerides?
## vignette
This item asks the student to name 'neutral fats' as the other term for triacylglycerol/triglycerides.
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
Sphingolipid
## explanation_a
Sphingolipid is a different lipid family entirely, built on sphingosine rather than glycerol; it is not another name for triglyceride.
## answer_b
Lecithin
## explanation_b
Lecithin is a specific phospholipid (phosphatidylcholine), a compound lipid, not another name for triglyceride.
## answer_c
Neutral fats
## explanation_c
Correct. 'Neutral fats' is the other name for triacylglycerol (TAG), the simple-lipid subtype built from three fatty acids on glycerol.
## answer_d
Waxes
## explanation_d
Waxes are the simple lipid's other subtype — one fatty acid on a monohydroxy alcohol higher than glycerol — not another name for the three-fatty-acid triglyceride.
## topic
Lipids Of Biological Importance
## subtopic
Lipids of Biological Importance
## main_concept
CON-FND-E618B54C3E216C
## concept_ids

## contextual_concept_ids

## difficulty
Easy
## question_type
Definition
## cognitive_effort
Low
## cognitive_effort_score
0.2
## setting
Academic
## reasoning_level
1
## inferred_difficulty
79
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
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
Name 'neutral fats' as the other term for triacylglycerol/triglycerides.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p19 q15. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.
---
# Item
## id
QST-102-INT-MCQ-096
## title
If a fatty acid is esterified with long chain monohydroxy alcohol higher than glycerol …
## question
If a fatty acid is esterified with long chain monohydroxy alcohol higher than glycerol the result is:
## vignette
This item asks the student to define waxes as esters of one fatty acid with a long-chain monohydroxy alcohol higher than glycerol.
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
Neutral fats
## explanation_a
Neutral fats (TAG) use glycerol, not a longer-chain monohydroxy alcohol, and use three fatty acids, not one.
## answer_b
Waxes
## explanation_b
Correct. Waxes are defined exactly this way: esters of one fatty acid with a long chain monohydroxy alcohol higher than glycerol.
## answer_c
Sphingolipids
## explanation_c
Sphingolipids are built on sphingosine joined to fatty acid by an amide bond, not an ester of fatty acid with a higher monohydroxy alcohol.
## answer_d
Phospholipids
## explanation_d
Phospholipids add a phosphate group to a fatty-acid/alcohol ester; they are not defined by the alcohol being 'higher than glycerol'.
## topic
Lipids Of Biological Importance
## subtopic
Lipids of Biological Importance
## main_concept
CON-FND-E618B54C3E216C
## concept_ids

## contextual_concept_ids

## difficulty
Moderate
## question_type
Definition
## cognitive_effort
Medium
## cognitive_effort_score
0.5
## setting
Academic
## reasoning_level
1
## inferred_difficulty
60
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
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
Define waxes as esters of one fatty acid with a long-chain monohydroxy alcohol higher than glycerol.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p19 q16. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.
---
# Item
## id
QST-102-INT-MCQ-097
## title
Linoleic acid is an example for:
## question
Linoleic acid is an example for:
## vignette
This item asks the student to name linoleic acid as the ω6 PUFA example.
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
Omega-3 fatty acid
## explanation_a
Omega-3 is the family assigned to linolenic acid, not linoleic acid.
## answer_b
Omega-6 fatty acid
## explanation_b
Correct. Linoleic acid is listed under the ω6 PUFA family, alongside arachidonic acid.
## answer_c
Monoenoic fatty acid
## explanation_c
Monoenoic means one double bond; linoleic acid, a PUFA, carries more than one, so it is polyenoic, not monoenoic.
## answer_d
Saturated fatty acid
## explanation_d
Linoleic acid is unsaturated (polyunsaturated, specifically), not saturated — it belongs among the cis/PUFA fatty acids, not the saturated ones.
## topic
Lipids Of Biological Importance
## subtopic
Lipids of Biological Importance
## main_concept
CON-FND-1DFF2BB6521B64
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
79
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
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
Name linoleic acid as the ω6 PUFA example.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p17 q6. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.
---
# Item
## id
QST-102-INT-MCQ-098
## title
Steroids are examples of which type of lipid?
## question
Steroids are examples of which type of lipid?
## vignette
This item asks the student to classify steroids as derived lipids.
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
Neutral fats
## explanation_a
Neutral fats are the simple-lipid (triacylglycerol) subtype, not where steroids belong.
## answer_b
Waxes
## explanation_b
Waxes are the other simple-lipid subtype, not where steroids belong.
## answer_c
Derived lipids
## explanation_c
Correct. Steroids are one of the derived lipid types, alongside fatty acids, alcohols, fat-soluble vitamins and carotenoids.
## answer_d
Compound lipids
## explanation_d
Compound lipids add a phosphate or carbohydrate group to fatty acid and alcohol; steroids are instead filed under derived lipids.
## topic
Lipids Of Biological Importance
## subtopic
Lipids of Biological Importance
## main_concept
CON-FND-30D2E317144DDF
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
79
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
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
Classify steroids as derived lipids.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p21 q36. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.
---
# Item
## id
QST-102-INT-MCQ-099
## title
The main dietary source for trans fatty acids is:
## question
The main dietary source for trans fatty acids is:
## vignette
This item asks the student to name margarine (partially hydrogenated vegetable oil) as the main dietary source of trans fatty acids.
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
Vegetables
## explanation_a
Vegetables themselves are not named as a trans fat source; only small amounts of trans fat occur naturally (in butter), and the main dietary source is processed — partially hydrogenated vegetable oil.
## answer_b
Margarine
## explanation_b
Correct. The main source of trans fatty acids in the human diet is partially hydrogenated vegetable oils, with margarine as an example.
## answer_c
Ground nuts
## explanation_c
Ground nuts are a source of cis unsaturated fatty acids, not the main dietary source of trans fat.
## answer_d
Fruits
## explanation_d
Fruits are not a named source of trans fatty acids.
## topic
Lipids Of Biological Importance
## subtopic
Lipids of Biological Importance
## main_concept
CON-FND-F5D38D496B7D0D
## concept_ids

## contextual_concept_ids

## difficulty
Easy
## question_type
Definition
## cognitive_effort
Low
## cognitive_effort_score
0.2
## setting
Academic
## reasoning_level
1
## inferred_difficulty
79
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
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
Name margarine (partially hydrogenated vegetable oil) as the main dietary source of trans fatty acids.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p17 q4. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.
---
# Item
## id
QST-102-INT-MCQ-100
## title
Stearic acid is considered as:
## question
Stearic acid is considered as:
## vignette
This item asks the student to classify stearic acid as both saturated and non-essential.
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
Saturated and non-essential fatty acid
## explanation_a
Correct. Stearic acid is listed among the saturated fatty acids, and non-essential fatty acids are defined as all fatty acids other than α-linolenic, linoleic (and conditionally arachidonic) acid — stearic acid is one of these, made in the body mainly from carbohydrates.
## answer_b
Monounsaturated and non-essential fatty acid
## explanation_b
Stearic acid has no double bonds, so "monounsaturated" is wrong regardless of the essential/non-essential half of the option.
## answer_c
Saturated and essential fatty acid
## explanation_c
The named essential fatty acids are α-linolenic and linoleic acid (and conditionally arachidonic); stearic acid is not among them.
## answer_d
Polyunsaturated and non-essential fatty acid
## explanation_d
Stearic acid has no double bonds, so "polyunsaturated" is wrong regardless of the essential/non-essential half of the option.
## topic
Lipids Of Biological Importance
## subtopic
Lipids of Biological Importance
## main_concept
CON-FND-D0969A4C2C03CE
## concept_ids

## contextual_concept_ids

## difficulty
Moderate
## question_type
Classification
## cognitive_effort
Medium
## cognitive_effort_score
0.5
## setting
Academic
## reasoning_level
1
## inferred_difficulty
60
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
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
Classify stearic acid as both saturated and non-essential.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p18 q8. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.
---
# Item
## id
QST-102-INT-MCQ-101
## title
The number of double bonds in arachidonic acid is:
## question
The number of double bonds in arachidonic acid is:
## vignette
This item asks the student to count arachidonic acid's double bonds (four) from its structural formula.
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
|
## explanation_a
This option's text did not survive the scan intact ('|'); read as a plausible original value it most likely intended '1', which is far below the four double bonds the structural formula for arachidonic acid shows.
## answer_b
2
## explanation_b
Two double bonds undercounts the four (CH=CH.CH2) repeats shown in the structural formula for arachidonic acid.
## answer_c
3
## explanation_c
Three double bonds undercounts the four (CH=CH.CH2) repeats shown in the structural formula for arachidonic acid.
## answer_d
4
## explanation_d
Correct. The structural formula for arachidonic acid, CH3.(CH2)4.(CH=CH.CH2)4.(CH2)2.COOH, contains four (CH=CH.CH2) repeats — four double bonds — consistent with its ω6 polyunsaturated classification.
## topic
Lipids Of Biological Importance
## subtopic
Lipids of Biological Importance
## main_concept
CON-FND-1DFF2BB6521B64
## concept_ids

## contextual_concept_ids

## difficulty
Hard
## question_type
Structure and function
## cognitive_effort
High
## cognitive_effort_score
0.8
## setting
Academic
## reasoning_level
1
## inferred_difficulty
45
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
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
Count arachidonic acid's double bonds (four) from its structural formula.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p18 q11. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---
# Item
## id
QST-102-INT-MCQ-102
## title
Disulfide bond can be between:
## question
Disulfide bond can be between:
## vignette
This item asks the student to state that a disulfide bond forms between two cysteine residues.
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
2 alanine
## explanation_a
Alanine's side chain has no sulfur to form a disulfide bond with; named cysteine specifically.
## answer_b
2 tyrosine
## explanation_b
Tyrosine's side chain is a phenol, not a thiol, and is not the residue named for disulfide bonding.
## answer_c
2 cysteine
## explanation_c
Correct. Disulfide bonds are present in many proteins when two cysteine residues connect to form cystine, giving keratin and insulin as examples.
## answer_d
2 serine
## explanation_d
Serine's hydroxyl group takes part in hydrogen bonding elsewhere in the tertiary structure, not in disulfide bond formation, which is reserved for cysteine.
## topic
Proteins Of Biological Importance
## subtopic
Proteins of Biological Importance
## main_concept
CON-FND-9F8AE7C57AFBA8
## concept_ids

## contextual_concept_ids

## difficulty
Easy
## question_type
Definition
## cognitive_effort
Low
## cognitive_effort_score
0.2
## setting
Academic
## reasoning_level
1
## inferred_difficulty
79
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Biochemistry > Proteins of Biological Importance
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-PROTEINS-OF-BIOLOGICAL-IMPORTANCE
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
State that a disulfide bond forms between two cysteine residues.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p35 q31. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.
---
# Item
## id
QST-102-INT-MCQ-103
## title
The Van der Waal interaction is:
## question
The Van der Waal interaction is:
## vignette
This item asks the student to state that Van der Waals interactions are weak forces contributing to tertiary structure stability.
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
A strong bond in the tertiary structure
## explanation_a
Called Van der Waals interactions weak, transient attractions, not strong bonds.
## answer_b
A weak bond in the tertiary structure
## explanation_b
Correct. Described Van der Waals interactions as transient attractions between molecules that, as weak interactions, also contribute to the stability of proteins — introduced among the tertiary-structure interactions.
## answer_c
A strong bond in the secondary structure
## explanation_c
Discussed Van der Waals interactions under tertiary structure, not secondary structure, and in any case calls them weak, not strong.
## answer_d
A weak bond in the primary structure
## explanation_d
Primary structure is held by peptide bonds, not Van der Waals interactions, and called these interactions weak, not strong.
## topic
Proteins Of Biological Importance
## subtopic
Proteins of Biological Importance
## main_concept
CON-FND-9F8AE7C57AFBA8
## concept_ids

## contextual_concept_ids

## difficulty
Easy
## question_type
Definition
## cognitive_effort
Low
## cognitive_effort_score
0.2
## setting
Academic
## reasoning_level
1
## inferred_difficulty
79
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Biochemistry > Proteins of Biological Importance
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-PROTEINS-OF-BIOLOGICAL-IMPORTANCE
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
State that Van der Waals interactions are weak forces contributing to tertiary structure stability.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p35 q30. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.
---
# Item
## id
QST-102-INT-MCQ-104
## title
In the B- pleated sheet structure, the polypeptide chains:
## question
In the B- pleated sheet structure, the polypeptide chains:
## vignette
This item asks the student to describe β-pleated sheet formation as chain segments lining up side by side.
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
Cross each other to form sheet
## explanation_a
Crossing chains is not how described sheet formation; the segments line up side by side, and "crossing" is not the geometry given for any secondary structure.
## answer_b
Cross each other to form coils
## explanation_b
Combines two errors — crossing is not the geometry, and "coils" describes the α-helix, not the β-pleated sheet.
## answer_c
Line side by side to form coils
## explanation_c
Side by side is correct, but the resulting structure is a sheet, not a coil — "coil" is the α-helix's shape, not the β-pleated sheet's.
## answer_d
Line side by side to form sheet
## explanation_d
Correct. When two or more segments of chain are arranged side by side, a β-pleated sheet is formed.
## topic
Proteins Of Biological Importance
## subtopic
Proteins of Biological Importance
## main_concept
CON-FND-FAA25760657211
## concept_ids

## contextual_concept_ids

## difficulty
Easy
## question_type
Structure and function
## cognitive_effort
Low
## cognitive_effort_score
0.2
## setting
Academic
## reasoning_level
1
## inferred_difficulty
79
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Biochemistry > Proteins of Biological Importance
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-PROTEINS-OF-BIOLOGICAL-IMPORTANCE
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Describe β-pleated sheet formation as chain segments lining up side by side.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p32 q13. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.
---
# Item
## id
QST-102-INT-MCQ-105
## title
Which of the following is involved in hydrogen bond formation in the tertiary structure?
## question
Which of the following is involved in hydrogen bond formation in the tertiary structure?
## vignette
This item asks the student to match each side-chain group named for tertiary-structure hydrogen bonding to the correct amino acid.
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
The hydroxyl group of aspartate
## explanation_a
Aspartate's side chain is carboxylic, not hydroxyl; listed aspartic acid's carboxylic group, not a hydroxyl group, among the hydrogen-bonding groups.
## answer_b
The hydroxyl group of serine
## explanation_b
Correct. The hydroxyl group of amino acids such is serine (and threonine) as taking part in internal hydrogen bond formation in the tertiary structure.
## answer_c
The amide group of threonine
## explanation_c
Threonine's group named is a hydroxyl group, like serine's, not an amide group — the amide group belongs to glutamine and asparagine instead.
## answer_d
The sulfur group of methionine St en
## explanation_d
Methionine's sulfur is not among the groups listed for tertiary hydrogen bonding; disulfide bonds, a separate bond type, involve cysteine's sulfur, not methionine's.
## topic
Proteins Of Biological Importance
## subtopic
Proteins of Biological Importance
## main_concept
CON-FND-9F8AE7C57AFBA8
## concept_ids

## contextual_concept_ids

## difficulty
Hard
## question_type
Mechanism
## cognitive_effort
High
## cognitive_effort_score
0.8
## setting
Academic
## reasoning_level
1
## inferred_difficulty
45
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Biochemistry > Proteins of Biological Importance
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-PROTEINS-OF-BIOLOGICAL-IMPORTANCE
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Match each side-chain group named for tertiary-structure hydrogen bonding to the correct amino acid.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p34 q29. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.
---
# Item
## id
QST-102-INT-MCQ-106
## title
In the a- helix structure, the R- groups project:
## question
In the a- helix structure, the R- groups project:
## vignette
This item asks the student to state that the R-groups of an α-helix project outward from the coil.
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
Inwards of the helix
## explanation_a
Inward projection would crowd the R-groups into the helix's core; they project outwards, away from the axis.
## answer_b
Outwards of the helix
## explanation_b
Correct. The R-groups of amino acids project outwards of the helix.
## answer_c
Upwards of the helix
## explanation_c
Upwards is not the direction given; the helix is a coil around a long axis, and the R-groups point outward from that axis, not along it.
## answer_d
Downwards of the helix
## explanation_d
Downwards has the same problem as upwards — it describes motion along the helix's axis rather than the outward projection stated.
## topic
Proteins Of Biological Importance
## subtopic
Proteins of Biological Importance
## main_concept
CON-FND-99CEF760A9D2CC
## concept_ids

## contextual_concept_ids

## difficulty
Easy
## question_type
Structure and function
## cognitive_effort
Low
## cognitive_effort_score
0.2
## setting
Academic
## reasoning_level
1
## inferred_difficulty
79
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Biochemistry > Proteins of Biological Importance
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-PROTEINS-OF-BIOLOGICAL-IMPORTANCE
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
State that the R-groups of an α-helix project outward from the coil.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p33 q16. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.
---
# Item
## id
QST-102-INT-MCQ-107
## title
The primary structure of proteins:
## question
The primary structure of proteins:
## vignette
This item asks the student to recognise the primary structure as the amino acid sequence laid down first, which the higher orders of structure are built from by folding.
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
Determines the secondary and tertiary structures
## explanation_a
Correct. Laid out the four orders of structure in sequence — primary first, as the amino acid sequence fixed by peptide bonds during biosynthesis — and describes the secondary and tertiary orders as further folding of that same chain; the sequence set at the primary level is what the higher orders fold.
## answer_b
Is the final structure of the proteins
## explanation_b
The reverse of the ordering: primary structure is the first of four orders, not the final one — tertiary (or quaternary, for multi-chain proteins) is the higher, later order.
## answer_c
Is the functional structure of the proteins
## explanation_c
The example of a functionally essential order is the quaternary structure of hemoglobin, not the primary sequence on its own.
## answer_d
Includes the a- helix structure
## explanation_d
The α-helix is a secondary-structure feature, one specific folded form the chain can take — it is not part of the primary structure, which is the unfolded amino acid sequence.
## topic
Proteins Of Biological Importance
## subtopic
Proteins of Biological Importance
## main_concept
CON-FND-BE919386760579
## concept_ids

## contextual_concept_ids

## difficulty
Challenging
## question_type
Mechanism
## cognitive_effort
High
## cognitive_effort_score
0.8
## setting
Academic
## reasoning_level
1
## inferred_difficulty
70
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Biochemistry > Proteins of Biological Importance
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-PROTEINS-OF-BIOLOGICAL-IMPORTANCE
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Recognise the primary structure as the amino acid sequence laid down first, which the higher orders of structure are built from by folding.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p32 q10. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.
---
# Item
## id
QST-102-INT-MCQ-108
## title
B- pleated sheets formed between different regions of the same chain is stabilized by:
## question
B- pleated sheets formed between different regions of the same chain is stabilized by:
## vignette
This item asks the student to state that a β-sheet built within one chain is held by intra-chain hydrogen bonds.
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
Inter-chain hydrogen bonds
## explanation_a
Inter-chain hydrogen bonds stabilize a sheet built between separate chains; a sheet formed within one chain's own regions is intra-chain.
## answer_b
Intra-chain hydrogen bonds
## explanation_b
Correct. When two or more segments of a single polypeptide chain are arranged side by side, the resulting β-pleated sheet is stabilized by intra-chain hydrogen bonds.
## answer_c
Inter-chain ionic bonds
## explanation_c
Ionic bonds are not the stabilizing bond type given for β-pleated sheets, whichever scope is chosen; hydrogen bonds are.
## answer_d
Intra-chain ionic bonds
## explanation_d
Intra-chain is the right scope, but ionic bonds are the wrong bond type — specified hydrogen bonds for this structure.
## topic
Proteins Of Biological Importance
## subtopic
Proteins of Biological Importance
## main_concept
CON-FND-FAA25760657211
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
1
## inferred_difficulty
60
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Biochemistry > Proteins of Biological Importance
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-PROTEINS-OF-BIOLOGICAL-IMPORTANCE
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
State that a β-sheet built within one chain is held by intra-chain hydrogen bonds.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p34 q24. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.
---
# Item
## id
QST-102-INT-MCQ-109
## title
Adjacent polypeptide chains running in opposite direction are called:
## question
Adjacent polypeptide chains running in opposite direction are called:
## vignette
This item asks the student to name antiparallel β-pleated sheet as the form with strands running in opposite directions.
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
Parallel B- pleated sheet
## explanation_a
Parallel is the name for segments running in the same direction (N to C terminus), the opposite of what this stem describes.
## answer_b
Anti-parallel B- pleated sheet
## explanation_b
Correct. When adjacent segments run in opposite directions, the structure is termed an antiparallel β-pleated sheet.
## answer_c
Perpendicular B- pleated sheet
## explanation_c
Perpendicular is not a term used for β-sheet strand orientation; the two named orientations are parallel and antiparallel.
## answer_d
Separate B- pleated sheet
## explanation_d
"Separate" describes nothing about strand direction and is not a term used for sheet classification.
## topic
Proteins Of Biological Importance
## subtopic
Proteins of Biological Importance
## main_concept
CON-FND-FAA25760657211
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
79
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Biochemistry > Proteins of Biological Importance
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-PROTEINS-OF-BIOLOGICAL-IMPORTANCE
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Name antiparallel β-pleated sheet as the form with strands running in opposite directions.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p33 q21. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.
---
# Item
## id
QST-102-INT-MCQ-110
## title
The sugar moiety present in RNA is:
## question
The sugar moiety present in RNA is:
## vignette
This item asks the student to identify ribose as RNA's sugar, in contrast to DNA's deoxyribose.
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
Ribulose
## explanation_a
Ribulose is a five-carbon sugar involved in photosynthetic carbon fixation, not the sugar of RNA.
## answer_b
Arabinose
## explanation_b
Arabinose is not a sugar assigned to either nucleic acid.
## answer_c
Ribose
## explanation_c
Correct. The comparison table gives RNA the sugar ribose, versus DNA's 2-deoxyribose.
## answer_d
Deoxyribose
## explanation_d
Deoxyribose is DNA's sugar, not RNA's — this option swaps the two nucleic acids' sugars.
## topic
Nucleic Acids
## subtopic
Chemistry of Nucleic Acids
## main_concept
CON-FND-CB55EE69768E2E
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
79
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
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
Identify ribose as RNA's sugar, in contrast to DNA's deoxyribose.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p53 q2. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.
---
# Item
## id
QST-102-INT-MCQ-111
## title
A DNA segment contains 100 Adenine and 100 cytosines. How many nucleotides are present …
## question
A DNA segment contains 100 Adenine and 100 cytosines. How many nucleotides are present in the segment?
## vignette
This item asks the student to apply complementary base pairing (A with T, G with C) to compute the total nucleotide count of a double-stranded DNA segment from two of its base counts.
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
100
## explanation_a
100 only counts the adenine given in the question — it ignores that the segment is double-stranded and has an equal number of paired thymine and cytosine bases, plus the guanine paired with the given cytosine.
## answer_b
200
## explanation_b
200 accounts for adenine and its thymine partner (100+100) but leaves out the 100 cytosine and its 100 paired guanine entirely.
## answer_c
400
## explanation_c
Correct. In double-stranded DNA, adenine pairs with thymine and guanine pairs with cytosine, so 100 adenine implies 100 thymine, and 100 cytosine implies 100 guanine: 100+100+100+100 = 400 nucleotides total.
## answer_d
50
## explanation_d
640 does not follow from doubling any combination of the given counts consistent with complementary base pairing — it overshoots what the A-T/G-C pairing rule gives.
## topic
Nucleic Acids
## subtopic
Chemistry of Nucleic Acids
## main_concept
CON-FND-5BAF472E54A764
## concept_ids

## contextual_concept_ids

## difficulty
Moderate
## question_type
Calculation
## cognitive_effort
Medium
## cognitive_effort_score
0.5
## setting
Academic
## reasoning_level
1
## inferred_difficulty
60
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
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
Apply complementary base pairing (A with T, G with C) to compute the total nucleotide count of a double-stranded DNA segment from two of its base counts.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p54 q8. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.
---
# Item
## id
QST-102-INT-MCQ-112
## title
Number of hydrogen bonds between adenine and thymine is:
## question
Number of hydrogen bonds between adenine and thymine is:
## vignette
This item asks the student to state the number of hydrogen bonds (two) between adenine and thymine, as distinct from the three between guanine and cytosine.
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
|
## explanation_a
1 is too few for any base pair described; even the weaker A-T pair has two hydrogen bonds, not one.
## answer_b
2
## explanation_b
Correct. Adenine pairs with thymine through two hydrogen bonds.
## answer_c
3
## explanation_c
3 is the number of hydrogen bonds between guanine and cytosine, not adenine and thymine — this swaps the two base pairs' bond counts.
## answer_d
4
## explanation_d
4 hydrogen bonds is not a count given for either base pair; neither A-T (two) nor G-C (three) reaches four.
## topic
Nucleic Acids
## subtopic
Chemistry of Nucleic Acids
## main_concept
CON-FND-5BAF472E54A764
## concept_ids

## contextual_concept_ids

## difficulty
Easy
## question_type
Structure and function
## cognitive_effort
Low
## cognitive_effort_score
0.2
## setting
Academic
## reasoning_level
1
## inferred_difficulty
79
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
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
State the number of hydrogen bonds (two) between adenine and thymine, as distinct from the three between guanine and cytosine.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p55 q20. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.
---
# Item
## id
QST-102-INT-MCQ-113
## title
A phosphodiester bond is present in:
## question
A phosphodiester bond is present in:
## vignette
This item asks the student to locate the phosphodiester bond as the linkage between nucleotides within a nucleic acid strand.
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
Nucleotide in a nucleic acid
## explanation_a
Correct. Nucleotides within a nucleic acid strand are linked by phosphodiester bonds, between the 3'-hydroxyl of one nucleotide and the 5'-hydroxyl of the next, through a phosphate group.
## answer_b
Monosaccharides in a polysaccharide
## explanation_b
Monosaccharides in a polysaccharide are linked by glycosidic bonds, not phosphodiester bonds — a different class of biomolecule entirely.
## answer_c
Amino acids in a polypeptide
## explanation_c
Amino acids in a polypeptide are linked by peptide bonds, not phosphodiester bonds.
## answer_d
Fatty acids in a diglyceride
## explanation_d
Fatty acids in a diglyceride are linked by ester bonds to glycerol, not phosphodiester bonds.
## topic
Nucleic Acids
## subtopic
Chemistry of Nucleic Acids
## main_concept
CON-FND-C5D9467CA2A949
## concept_ids

## contextual_concept_ids

## difficulty
Moderate
## question_type
Structure and function
## cognitive_effort
Medium
## cognitive_effort_score
0.5
## setting
Academic
## reasoning_level
1
## inferred_difficulty
60
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
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
Locate the phosphodiester bond as the linkage between nucleotides within a nucleic acid strand.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p54 q13. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.
---
# Item
## id
QST-102-INT-MCQ-114
## title
A short length of DNA has 80 thymine and 80 guanine residues. The total no. of nucleoti…
## question
A short length of DNA has 80 thymine and 80 guanine residues. The total no. of nucleotides in DNA fragment is:
## vignette
This item asks the student to apply complementary base pairing to compute total nucleotide count from thymine and guanine counts.
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
160
## explanation_a
160 only accounts for the thymine and its adenine partner (80+80) — it leaves out the 80 guanine and its 80 paired cytosine.
## answer_b
40
## explanation_b
40 is far too small even for one base pair's worth of the given counts — it does not follow from the base-pairing rule applied to either given number.
## answer_c
320
## explanation_c
Correct. Thymine pairs with adenine and guanine pairs with cytosine, so 80 thymine implies 80 adenine, and 80 guanine implies 80 cytosine: 80+80+80+80 = 320 nucleotides total.
## answer_d
640
## explanation_d
640 overshoots what the pairing rule gives for these counts — it does not correspond to any consistent application of A-T/G-C pairing to 80 and 80.
## topic
Nucleic Acids
## subtopic
Chemistry of Nucleic Acids
## main_concept
CON-FND-5BAF472E54A764
## concept_ids

## contextual_concept_ids

## difficulty
Moderate
## question_type
Calculation
## cognitive_effort
Medium
## cognitive_effort_score
0.5
## setting
Academic
## reasoning_level
1
## inferred_difficulty
60
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
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
Apply complementary base pairing to compute total nucleotide count from thymine and guanine counts.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p54 q12. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.
---
# Item
## id
QST-102-INT-MCQ-115
## title
Which of the following is a purine nucleoside?
## question
Which of the following is a purine nucleoside?
## vignette
This item asks the student to identify Adenosine as a purine nucleoside, built from the purine base adenine.
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
Cytosine
## explanation_a
Cytosine is a pyrimidine base, not a nucleoside, and not a purine.
## answer_b
Adenine
## explanation_b
Adenine is the purine base itself, not its nucleoside; the naming table gives Adenine's nucleoside a separate name, Adenosine.
## answer_c
Adenosine
## explanation_c
Correct. The naming table pairs the purine base Adenine with the nucleoside Adenosine — a purine nucleoside.
## answer_d
Uracil
## explanation_d
Uracil is a pyrimidine base, not a nucleoside, and not a purine.
## topic
Chemistry Of Nucleotides
## subtopic
Chemistry of Free Nucleotides
## main_concept
CON-FND-21029C98FEA19F
## concept_ids

## contextual_concept_ids

## difficulty
Moderate
## question_type
Classification
## cognitive_effort
Medium
## cognitive_effort_score
0.5
## setting
Academic
## reasoning_level
1
## inferred_difficulty
60
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Biochemistry > Chemistry of Free Nucleotides
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-CHEMISTRY-OF-FREE-NUCLEOTIDES
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Identify Adenosine as a purine nucleoside, built from the purine base adenine.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p51 q10. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.
---
# Item
## id
QST-102-INT-MCQ-116
## title
Uridylic acid is composed of:
## question
Uridylic acid is composed of:
## vignette
This item asks the student to apply the nucleotide definition (base + pentose + phosphate) to name uridylic acid's three components.
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
Uracil only
## explanation_a
Uracil alone is only the base; uridylic acid (UMP) is the full nucleotide, which per the definition needs a pentose and phosphate as well.
## answer_b
Uracil and ribose
## explanation_b
Uracil and ribose together describe Uridine, the nucleoside — one step short of uridylic acid, which per the definition also carries a phosphate.
## answer_c
Ribose and phosphate
## explanation_c
Ribose and phosphate without the base omits the nitrogenous base that gives uridylic acid its identity as a uracil-containing compound.
## answer_d
Uracil, ribose, and Phosphate
## explanation_d
Correct. Uridylic acid is Uridine monophosphate (UMP), and a nucleotide is base + pentose + phosphate — here, uracil, ribose and phosphate.
## topic
Chemistry Of Nucleotides
## subtopic
Chemistry of Free Nucleotides
## main_concept
CON-FND-F2A54F8809C051
## concept_ids

## contextual_concept_ids

## difficulty
Moderate
## question_type
Structure and function
## cognitive_effort
Medium
## cognitive_effort_score
0.5
## setting
Academic
## reasoning_level
1
## inferred_difficulty
60
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Biochemistry > Chemistry of Free Nucleotides
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-CHEMISTRY-OF-FREE-NUCLEOTIDES
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Apply the nucleotide definition (base + pentose + phosphate) to name uridylic acid's three components.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p51 q12. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.
---
# Item
## id
QST-102-INT-MCQ-117
## title
Which of the following nucleotides contains ribose sugar and not deoxyribose?
## question
Which of the following nucleotides contains ribose sugar and not deoxyribose?
## vignette
This item asks the student to identify uracil as the base restricted to RNA, and so to ribose, unlike cytosine and adenine which appear in both nucleic acids.
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
Thymine — pentose sugar-phosphate
## explanation_a
Thymine is present only in DNA, so a thymine nucleotide always carries 2-deoxyribose, never ribose.
## answer_b
Uracil — pentose sugar-phosphate
## explanation_b
Correct. Uracil is present only in RNA, so a uracil nucleotide always carries ribose, never deoxyribose — the only one of these four bases restricted to RNA alone.
## answer_c
Adenine — pentose sugar-phosphate
## explanation_c
Listed adenine among the purines present in the structure of both nucleic acids (RNA and DNA), so an adenine nucleotide is not uniquely tied to ribose the way uracil's is.
## answer_d
Cytosine — pentose sugar-phosphate
## explanation_d
Cytosine is present in both nucleic acids, so, like adenine, a cytosine nucleotide can carry either ribose or deoxyribose depending on which nucleic acid it is part of.
## topic
Chemistry Of Nucleotides
## subtopic
Chemistry of Free Nucleotides
## main_concept
CON-FND-C672878EA48528
## concept_ids

## contextual_concept_ids

## difficulty
Moderate
## question_type
Classification
## cognitive_effort
Medium
## cognitive_effort_score
0.5
## setting
Academic
## reasoning_level
1
## inferred_difficulty
60
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Biochemistry > Chemistry of Free Nucleotides
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-CHEMISTRY-OF-FREE-NUCLEOTIDES
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Identify uracil as the base restricted to RNA, and so to ribose, unlike cytosine and adenine which appear in both nucleic acids.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p50 q6. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---

# Item
## id
QST-102-INT-MCQ-118
## title
Blood coagulation:
## question
Blood coagulation:
## vignette
This item asks the student to separate the two initiating cascades of coagulation: the extrinsic pathway is triggered by tissue thromboplastin released on tissue damage, while the intrinsic pathway starts on a negatively charged surface.
## subject
haem
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
D
## answer_a
Through the extrinsic pathway is initiated by contact of blood with a negatively charged surface
## explanation_a
Backwards. Contact with a negatively charged surface initiates the *intrinsic* pathway (factor XII activation), not the extrinsic one.
## answer_b
Through the intrinsic pathway does not occur outside the body
## explanation_b
Backwards. The intrinsic pathway occurs both in vivo and in vitro — it is the extrinsic pathway that occurs only in vivo, since it needs actual tissue trauma.
## answer_c
Through the intrinsic pathway is initiated by tissue damage
## explanation_c
Backwards. Tissue damage initiates the *extrinsic* pathway (via thromboplastin release), not the intrinsic one, which is triggered by collagen or foreign-surface contact instead.
## answer_d
Through the extrinsic pathway is initiated by the release of tissue thromboplastin
## explanation_d
Correct. The extrinsic pathway is initiated when tissue trauma releases tissue thromboplastin, which activates factor VII.

Why this is right:
- Coagulation runs as two initiating cascades that converge.
## topic
Blood
## subtopic
Platelets and haemostasis
## main_concept
CON-HEM-8EC1CD48F9DB41
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
1
## inferred_difficulty
60
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Physiology > Blood > Platelets and haemostasis
## question_only_for
KAU_Y1
## library_ids
ART-102-PHY-PLATELETS-AND-HAEMOSTASIS
## resource_ids
src_2093c80b1f9c25f9c0a4
## learning_objective
State that the extrinsic pathway is initiated by tissue thromboplastin release.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. Physio MCQ First Year.pdf p12 q33. Manifest src_2093c80b1f9c25f9c0a4.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---

# Item
## id
QST-102-INT-MCQ-119
## title
The final reaction in the formation of a blood clot:
## question
The final reaction in the formation of a blood clot:
## vignette
This item asks the student to name the final step of clot formation, in which thrombin converts soluble fibrinogen into the insoluble fibrin mesh.
## subject
haem
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
B
## answer_a
The formation of prothrombin activator
## explanation_a
Forming the prothrombin activator (active factor X with Ca2+, phospholipid and factor Va) is an earlier common-pathway step, not the final one — it is what makes thrombin, not the last reaction itself.
## answer_b
Thrombin converts fibrinogen to fibrin
## explanation_b
Correct. Thrombin converting soluble fibrinogen to insoluble fibrin monomer threads is the final reaction that actually produces the clot — everything before it builds toward generating thrombin.

Why this is right:
- Coagulation runs as two initiating cascades that converge.
## answer_c
Prothrombin activator converts prothrombin to thrombin
## explanation_c
Converting prothrombin to thrombin is the step immediately before the final reaction, not the final reaction itself.
## answer_d
Hageman factor activates prothrombin
## explanation_d
Hageman factor is another name for factor XII, which activates the intrinsic pathway at its very start, not prothrombin at the cascade's end.
## topic
Blood
## subtopic
Platelets and haemostasis
## main_concept
CON-HEM-8EC1CD48F9DB41
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
1
## inferred_difficulty
60
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Physiology > Blood > Platelets and haemostasis
## question_only_for
KAU_Y1
## library_ids
ART-102-PHY-PLATELETS-AND-HAEMOSTASIS
## resource_ids
src_2093c80b1f9c25f9c0a4
## learning_objective
Identify thrombin converting fibrinogen to fibrin as the final step of clot formation.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. Physio MCQ First Year.pdf p12 q35. Manifest src_2093c80b1f9c25f9c0a4.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---

# Item
## id
QST-102-INT-MCQ-120
## title
The correct sequence of activation of extrinsic pathway of blood coagulation is:
## question
The correct sequence of activation of extrinsic pathway of blood coagulation is:
## vignette
This item asks the student to order the extrinsic pathway, in which tissue thromboplastin (tissue factor) activates factor VII.
## subject
haem
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
C
## answer_a
Tissue thromboplastin activates factor VIII
## explanation_a
Factor VIII belongs to the intrinsic pathway (activated when separated from von Willebrand factor by thrombin), not to the extrinsic sequence tissue thromboplastin starts.
## answer_b
Calcium ions activates factor VII
## explanation_b
Calcium is a cofactor throughout the cascade, but it does not itself activate factor VII — tissue thromboplastin does.
## answer_c
Tissue thromboplastin activates factor VII
## explanation_c
Correct. Tissue thromboplastin, released by damaged tissue, activates factor VII — the first step of the extrinsic pathway.

Why this is right:
- Coagulation runs as two initiating cascades that converge.
## answer_d
Tissue thromboplastin activates factor IX
## explanation_d
Factor IX is activated in the intrinsic pathway (by XIa) or, downstream, by the VIIa–thromboplastin complex — but factor VII is the extrinsic pathway's own first target, not IX.
## topic
Blood
## subtopic
Platelets and haemostasis
## main_concept
CON-HEM-8EC1CD48F9DB41
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
1
## inferred_difficulty
60
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Physiology > Blood > Platelets and haemostasis
## question_only_for
KAU_Y1
## library_ids
ART-102-PHY-PLATELETS-AND-HAEMOSTASIS
## resource_ids
src_2093c80b1f9c25f9c0a4
## learning_objective
State that tissue thromboplastin activates factor VII in the extrinsic pathway.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. Physio MCQ First Year.pdf p12 q36. Manifest src_2093c80b1f9c25f9c0a4.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---

# Item
## id
QST-102-INT-MCQ-121
## title
Contact of the blood with subendothelial collagen produces:
## question
Contact of the blood with subendothelial collagen produces:
## vignette
This item asks the student to identify the first step of the intrinsic pathway, in which contact with exposed subendothelial collagen activates factor XII.
## subject
haem
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
C
## answer_a
Inhibition of platelets
## explanation_a
Backwards. Contact with subendothelial collagen *activates* platelets (the adhesion step of primary haemostasis), it does not inhibit them.
## answer_b
Activation of factor VII
## explanation_b
Factor VII is activated by tissue thromboplastin in the *extrinsic* pathway, not by collagen contact, which triggers the intrinsic pathway instead.
## answer_c
Activation of factor XII
## explanation_c
Correct. Contact with exposed subendothelial collagen activates factor XII to XIIa — the first step of the intrinsic pathway.

Why this is right:
- Coagulation runs as two initiating cascades that converge.
## answer_d
Activation of factor IX
## explanation_d
Factor IX is activated further downstream in the intrinsic cascade (by XIa, after XII and XI), not directly by collagen contact itself.
## topic
Blood
## subtopic
Platelets and haemostasis
## main_concept
CON-HEM-8EC1CD48F9DB41
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
1
## inferred_difficulty
60
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Physiology > Blood > Platelets and haemostasis
## question_only_for
KAU_Y1
## library_ids
ART-102-PHY-PLATELETS-AND-HAEMOSTASIS
## resource_ids
src_2093c80b1f9c25f9c0a4
## learning_objective
State that contact with subendothelial collagen activates factor XII, starting the intrinsic pathway.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. Physio MCQ First Year.pdf p13 q41. Manifest src_2093c80b1f9c25f9c0a4.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---

# Item
## id
QST-102-INT-MCQ-122
## title
Tissue thromboplastin:
## question
Tissue thromboplastin:
## vignette
This item asks the student to recognise tissue thromboplastin (tissue factor) as the extrinsic-pathway partner that, with factor VIIa, activates factor X.
## subject
haem
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
C
## answer_a
Is also known as factor V
## explanation_a
Tissue thromboplastin is not another name for factor V — it is the tissue-derived phospholipid that starts the extrinsic pathway by activating factor VII, a separate identity entirely.
## answer_b
Is the cell surface receptor for factor VIIa
## explanation_b
Tissue thromboplastin is the trigger that activates factor VII, not a receptor that factor VIIa binds to on a cell surface.
## answer_c
Complexes with factor VIIa to catalyze the activation of factor X
## explanation_c
Correct. Tissue thromboplastin, complexed with factor VIIa, activates factor X — the extrinsic pathway's route into the common pathway.

Why this is right:
- Coagulation runs as two initiating cascades that converge.
## answer_d
Is an important component of the intrinsic coagulation pathway
## explanation_d
Backwards. Tissue thromboplastin is the defining trigger of the *extrinsic* pathway, not a component of the intrinsic one.
## topic
Blood
## subtopic
Platelets and haemostasis
## main_concept
CON-HEM-8EC1CD48F9DB41
## concept_ids

## contextual_concept_ids

## difficulty
Hard
## question_type
Mechanism
## cognitive_effort
High
## cognitive_effort_score
0.8
## setting
Academic
## reasoning_level
1
## inferred_difficulty
45
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Physiology > Blood > Platelets and haemostasis
## question_only_for
KAU_Y1
## library_ids
ART-102-PHY-PLATELETS-AND-HAEMOSTASIS
## resource_ids
src_2093c80b1f9c25f9c0a4
## learning_objective
State that tissue thromboplastin complexes with factor VIIa to activate factor X.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. Physio MCQ First Year.pdf p14 q44. Manifest src_2093c80b1f9c25f9c0a4.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---

# Item
## id
QST-102-INT-MCQ-123
## title
Thrombomodulin:
## question
Thrombomodulin:
## vignette
This item asks the student to recall thrombomodulin as the endothelial protein that binds thrombin and switches it to activating protein C, one of the natural anticoagulant limiting reactions.
## subject
haem
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
D
## answer_a
Is secreted by RBCs
## explanation_a
Thrombomodulin is secreted by endothelial cells, not by red blood cells — RBCs play no part in this limiting mechanism.
## answer_b
Is activated by heparin
## explanation_b
Thrombomodulin is not activated by heparin — heparin's own anticoagulant action instead works through antithrombin III, a separate limiting mechanism entirely.
## answer_c
Activates platelets
## explanation_c
Thrombomodulin's role is to bind thrombin and, through the resulting complex, activate protein C — it does not itself activate platelets, which is instead what thrombin and ADP do earlier in primary haemostasis.
## answer_d
Binds with thrombin forming a complex that activates protein S
## explanation_d
Correct. Thrombomodulin binds thrombin, and the thrombomodulin–thrombin complex activates protein C, which (with its cofactor protein S) inactivates factors V and VIII and frees fibrinolysis to proceed — one of the named physiological limits on coagulation. The next sentence names protein C, with protein S as its cofactor, as what that complex activates.

Why this is right:
- Blood normally circulates in a fluid state because several physiological mechanisms limit clotting: a healthy endothelium, which keeps blood off subendothelial collagen and carries antiplatelet and anticoagulant surface products; the small amount of heparin in blood, which combines with antithrombin III to inactivate factors IX, X, XI and XII; the liver, which inactivates any activated coagulation factor; a continuous normal flow rate, since stasis allows intravascular clotting; the balance between thromboxane A2 and prostacyclin, which confines a clot to the site of injury; and the fibrinolytic system.
## topic
Blood
## subtopic
Platelets and haemostasis
## main_concept
CON-HEM-87280E690F877F
## concept_ids

## contextual_concept_ids

## difficulty
Hard
## question_type
Mechanism
## cognitive_effort
High
## cognitive_effort_score
0.8
## setting
Academic
## reasoning_level
1
## inferred_difficulty
45
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Physiology > Blood > Platelets and haemostasis
## question_only_for
KAU_Y1
## library_ids
ART-102-PHY-PLATELETS-AND-HAEMOSTASIS
## resource_ids
src_2093c80b1f9c25f9c0a4
## learning_objective
State that thrombomodulin binds thrombin to activate a pathway leading to reduced coagulation.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. Physio MCQ First Year.pdf p14 q47. Manifest src_2093c80b1f9c25f9c0a4.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---

# Item
## id
QST-102-INT-MCQ-124
## title
Factor VII:
## question
Factor VII:
## vignette
This item asks the student to place factor VII as the initiator of the extrinsic pathway together with tissue thromboplastin.
## subject
haem
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
B
## answer_a
Is a cofactor in the intrinsic pathway of coagulation
## explanation_a
Factor VII belongs to the prothrombin group of the extrinsic/common pathway, not a cofactor in the intrinsic pathway — the intrinsic pathway's own contact-group members are XI and XII.
## answer_b
Initiates the process of coagulation with tissue thromboplastin
## explanation_b
Correct. Factor VII, activated by tissue thromboplastin released from damaged tissue, initiates the extrinsic coagulation pathway.

Why this is right:
- Coagulation runs as two initiating cascades that converge.
## answer_c
Activates the conversion of fibrinogen into fibrin
## explanation_c
Converting fibrinogen to fibrin is thrombin's job at the end of the common pathway, not factor VII's at the cascade's start.
## answer_d
Is produced by platelets
## explanation_d
Coagulation factors are produced by the liver (mainly beta globulins), not by platelets, though platelets do contribute phospholipid surface and some factors from their alpha granules — factor VII specifically is hepatic, not platelet-derived.
## topic
Blood
## subtopic
Platelets and haemostasis
## main_concept
CON-HEM-8EC1CD48F9DB41
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
1
## inferred_difficulty
60
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Physiology > Blood > Platelets and haemostasis
## question_only_for
KAU_Y1
## library_ids
ART-102-PHY-PLATELETS-AND-HAEMOSTASIS
## resource_ids
src_2093c80b1f9c25f9c0a4
## learning_objective
State that factor VII initiates coagulation together with tissue thromboplastin.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. Physio MCQ First Year.pdf p18 q67. Manifest src_2093c80b1f9c25f9c0a4.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---

# Item
## id
QST-102-INT-MCQ-125
## title
In thrombocytopenia there is:
## question
In thrombocytopenia there is:
## vignette
This item asks the student to link thrombocytopenia (a low platelet count) to a prolonged bleeding time, the platelet-function measure.
## subject
haem
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
C
## answer_a
Blood coagulation is increased
## explanation_a
Backwards. A low platelet count *impairs* the platelet-dependent phase of haemostasis; blood coagulation (the clotting-factor cascade) is not increased by thrombocytopenia.
## answer_b
Excessive hemolysis of RBCs
## explanation_b
Excessive RBC haemolysis describes a haemolytic anaemia, an unrelated condition to a low platelet count.
## answer_c
Prolonged bleeding time
## explanation_c
Correct. Thrombocytopenia — platelet count below 50,000/mm3, or defective platelet function — is characterised by prolonged bleeding time and petechiae.

Why this is right:
- Thrombocytopenic purpura is due to a decrease of platelet number below 50,000/mm3, or to defective platelet function (thrombasthenia).
- It is characterised by petechiae (the presence of many subcutaneous haemorrhages) and prolongation of bleeding time — the time needed for bleeding to stop without clotting of the blood, normally 1-3 minutes, depending on platelet count and function.
## answer_d
Increased number of platelets
## explanation_d
"Thrombocytopenia" means a *decreased*, not increased, platelet number — the name itself states the opposite of this option.
## topic
Blood
## subtopic
Platelets and haemostasis
## main_concept
CON-HEM-E55B5F7BA5CD04
## concept_ids

## contextual_concept_ids

## difficulty
Easy
## question_type
Reasoning
## cognitive_effort
Low
## cognitive_effort_score
0.2
## setting
Academic
## reasoning_level
1
## inferred_difficulty
79
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Physiology > Blood > Platelets and haemostasis
## question_only_for
KAU_Y1
## library_ids
ART-102-PHY-PLATELETS-AND-HAEMOSTASIS
## resource_ids
src_2093c80b1f9c25f9c0a4
## learning_objective
State that thrombocytopenia prolongs bleeding time.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. Physio MCQ First Year.pdf p18 q70. Manifest src_2093c80b1f9c25f9c0a4.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---

# Item
## id
QST-102-INT-MCQ-126
## title
Erythrocytes:
## question
Erythrocytes:
## vignette
This item asks the student to recall a correct property of erythrocytes: their count rises at high altitude through the hypoxia–erythropoietin pathway.
## subject
haem
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
A
## answer_a
Count is increased in people living at high altitude
## explanation_a
Correct. RBC count runs above the adult range at high altitude, alongside newborns and athletes — a physiological, hypoxia-driven response, not a disease.

Why this is right:
- The average RBC count ranges from 5–5.5 million/mm3 in males and 4–4.5 million/mm3 in females.
## answer_b
Biconcave shape is important to facilitate their rupture in narrow capillaries
## explanation_b
Backwards. The biconcave shape enhances flexibility so erythrocytes can be squeezed through narrow capillaries *without* rupturing — it facilitates safe passage, not rupture.
## answer_c
Synthesize and release erythropoietin
## explanation_c
Erythrocytes do not synthesize erythropoietin — the kidney (85%) and liver (15%) do, and erythrocytes are the *targets* of erythropoietin's action, not its source.
## answer_d
Membrane keeps hemoglobin inside to prevent decreased heart load
## explanation_d
The erythrocyte membrane keeps haemoglobin inside to prevent the *hazards* of free plasma haemoglobin (renal tubule blockage, raised viscosity, raised colloidal osmotic pressure) — those hazards raise cardiac workload if the membrane fails, so the membrane's job is to prevent an *increased*, not decreased, heart load.
## topic
Blood
## subtopic
Erythropoiesis
## main_concept
CON-HEM-E3063003DB0FDD
## concept_ids

## contextual_concept_ids

## difficulty
Easy
## question_type
Definition
## cognitive_effort
Low
## cognitive_effort_score
0.2
## setting
Academic
## reasoning_level
1
## inferred_difficulty
79
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Physiology > Blood > Erythropoiesis
## question_only_for
KAU_Y1
## library_ids
ART-102-PHY-ERYTHROPOIESIS
## resource_ids
src_2093c80b1f9c25f9c0a4
## learning_objective
State that RBC count is higher than normal in people living at high altitude.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. Physio MCQ First Year.pdf p7 q1. Manifest src_2093c80b1f9c25f9c0a4.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---

# Item
## id
QST-102-INT-MCQ-127
## title
Erythropoietin hormone is:
## question
Erythropoietin hormone is:
## vignette
This item asks the student to identify a correct statement about erythropoietin, the hormone secreted mainly by the kidney in response to hypoxia.
## subject
haem
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
D
## answer_a
Secreted by the kidney 15% and the liver 85%
## explanation_a
Backwards. In adults, erythropoietin is secreted 85% by the kidney and 15% by the liver — the option gives the reversed split.
## answer_b
Stimulated by acidosis at high altitude
## explanation_b
Backwards. Erythropoietin secretion is stimulated by the alkalosis that develops at high altitude, not by acidosis — named alkalosis specifically.
## answer_c
Synthesized and released by red blood cell
## explanation_c
Backwards. Erythropoietin is synthesized and released by the kidneys and liver, not by red blood cells — RBCs are the downstream product of erythropoiesis, not a source of the hormone driving it.
## answer_d
Inhibited by adenosine antagonists
## explanation_d
Correct. Adenosine is one of the named stimulators of erythropoietin secretion, so an adenosine antagonist — blocking that stimulus — would inhibit secretion rather than promote it.

Why this is right:
- Erythropoietin is a glycoprotein hormone normally present in plasma at low concentration.
- During fetal life it is almost completely formed by the liver; in adults, 85% is formed by the kidneys and 15% by the liver — which is why patients with renal failure develop severe anaemia, since hepatic production cannot compensate for the kidneys' inability to produce the hormone.
- Erythropoietin stimulates all steps of erythropoiesis, binding specific receptors on erythropoietin-sensitive cells to stimulate mitosis and inhibit apoptosis.
## topic
Blood
## subtopic
Erythropoiesis
## main_concept
CON-HEM-6DBD73A50D2AD4
## concept_ids

## contextual_concept_ids

## difficulty
Hard
## question_type
Mechanism
## cognitive_effort
High
## cognitive_effort_score
0.8
## setting
Academic
## reasoning_level
1
## inferred_difficulty
45
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Physiology > Blood > Erythropoiesis
## question_only_for
KAU_Y1
## library_ids
ART-102-PHY-ERYTHROPOIESIS
## resource_ids
src_2093c80b1f9c25f9c0a4
## learning_objective
Recognise adenosine as a stimulator of erythropoietin secretion, so its antagonists inhibit secretion.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. Physio MCQ First Year.pdf p7 q5. Manifest src_2093c80b1f9c25f9c0a4.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---

# Item
## id
QST-102-INT-MCQ-128
## title
Stomach plays important role in erythropoiesis because it:
## question
Stomach plays important role in erythropoiesis because it:
## vignette
This item asks the student why the stomach matters for erythropoiesis: it aids absorption of vitamin B12 (via intrinsic factor) and iron (via gastric HCl).
## subject
haem
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
B
## answer_a
Helps absorption of folic acid
## explanation_a
Folic acid absorption is not described as gastric-dependent the way vitamin B12 and iron are — it does not require intrinsic factor or gastric acid.
## answer_b
Helps absorption of B12 and iron
## explanation_b
Correct. Gastric parietal cells provide intrinsic factor (needed for vitamin B12 absorption in the lower ileum) and gastric HCl (needed to reduce dietary iron to its absorbable ferrous form) — both nutrients the stomach makes possible, through different secretions from the same organ.

Why this is right:
- The parietal cells of the stomach secrete intrinsic factor, a glycoprotein that combines with vitamin B12 and protects it from being digested, and it is intrinsic factor that also binds the vitamin to its specific receptor on the brush border of the mucosal cells of the lower ileum. Pancreatic trypsin is required as well, so pancreatic disease may impair absorption.
## answer_c
Secretes erythropoietin
## explanation_c
Erythropoietin is secreted by the kidney (85%) and liver (15%), not by the stomach.
## answer_d
Forms globin part of hemoglobin
## explanation_d
The globin part of haemoglobin is formed by the liver, not the stomach.
## topic
Blood
## subtopic
Erythropoiesis
## main_concept
CON-HEM-D76C58506E52B7
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
1
## inferred_difficulty
60
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Physiology > Blood > Erythropoiesis
## question_only_for
KAU_Y1
## library_ids
ART-102-PHY-ERYTHROPOIESIS
## resource_ids
src_2093c80b1f9c25f9c0a4
## learning_objective
State that the stomach's role in erythropoiesis includes absorption of both vitamin B12 and iron.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. Physio MCQ First Year.pdf p10 q23. Manifest src_2093c80b1f9c25f9c0a4.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---

# Item
## id
QST-102-INT-MCQ-129
## title
Renal failure may cause anemia as
## question
Renal failure may cause anemia as
## vignette
This item asks the student to explain the anaemia of renal failure by the loss of kidney-derived erythropoietin (about 85% of the total).
## subject
haem
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
B
## answer_a
Stem cells are not present in the bone marrow
## explanation_a
The stem cells are present in the marrow in renal failure — the marrow itself is not the diseased organ here, the kidney is, and the marrow simply lacks the hormonal drive to use those stem cells at full rate.
## answer_b
85 % of erythropoietin hormone is formed by the kidney
## explanation_b
Correct. Since the kidney normally makes 85% of erythropoietin and the liver's 15% cannot compensate for its loss, renal failure causes severe anaemia through erythropoietin deficiency.

Why this is right:
- Erythropoietin is a glycoprotein hormone normally present in plasma at low concentration.
- During fetal life it is almost completely formed by the liver; in adults, 85% is formed by the kidneys and 15% by the liver — which is why patients with renal failure develop severe anaemia, since hepatic production cannot compensate for the kidneys' inability to produce the hormone.
- Erythropoietin stimulates all steps of erythropoiesis, binding specific receptors on erythropoietin-sensitive cells to stimulate mitosis and inhibit apoptosis.
## answer_c
The patient cannot eat the essential vitamins
## explanation_c
Renal failure does not stop a patient eating essential vitamins — the anaemia mechanism here is hormonal (lost erythropoietin), not nutritional.
## answer_d
The bone marrow has congenital anomaly
## explanation_d
Attributed renal-failure anaemia to lost erythropoietin drive, not to a congenital marrow anomaly, which is an unrelated and unstated mechanism.
## topic
Blood
## subtopic
Erythropoiesis
## main_concept
CON-HEM-6DBD73A50D2AD4
## concept_ids

## contextual_concept_ids

## difficulty
Easy
## question_type
Reasoning
## cognitive_effort
Low
## cognitive_effort_score
0.2
## setting
Academic
## reasoning_level
1
## inferred_difficulty
79
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Physiology > Blood > Erythropoiesis
## question_only_for
KAU_Y1
## library_ids
ART-102-PHY-ERYTHROPOIESIS
## resource_ids
src_2093c80b1f9c25f9c0a4
## learning_objective
Attribute renal-failure anaemia to loss of the kidney's 85% share of erythropoietin production.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. Physio MCQ First Year.pdf p15 q54. Manifest src_2093c80b1f9c25f9c0a4.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---

# Item
## id
QST-102-INT-MCQ-130
## title
Erythropoiesis occurs in the bone marrow due to
## question
Erythropoiesis occurs in the bone marrow due to
## vignette
This item asks the student to attribute erythropoiesis in the bone marrow to the presence of haemopoietic stem cells.
## subject
haem
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
B
## answer_a
The presence of intrinsic factor receptors
## explanation_a
Intrinsic factor receptors are found in the lower ileal mucosa (for vitamin B12 absorption), not in the bone marrow.
## answer_b
The presence of hemopoietic stem cells
## explanation_b
Correct. Active bone marrow contains the haemopoietic stem cells from which erythrocytes (and the other blood cell lines) develop — their presence, in healthy marrow, is what makes the marrow the site of erythropoiesis after birth.

Why this is right:
- In the fetus, erythropoiesis occurs in the liver and spleen.
- After birth it occurs in active red marrow in the cavities of all bones; by age 20 the marrow in the cavities of long bones (except the upper humerus and femur) becomes inactive yellow marrow infiltrated by fat, so after age 20 only the membranous bones — vertebrae, skull, ribs and pelvis — produce erythrocytes.
- The bone marrow is one of the largest and most active organs in the body, approaching the size and weight of the liver.
## answer_c
The presence of megakaryocytes
## explanation_c
Megakaryocytes are present in bone marrow, but they are the platelet-producing cells, not what makes the marrow the site of erythropoiesis specifically.
## answer_d
The presence of alkaline phosphatase
## explanation_d
Alkaline phosphatase is not named as a reason marrow supports erythropoiesis; it is not part of this mechanism.
## topic
Blood
## subtopic
Erythropoiesis
## main_concept
CON-HEM-A3B0CEA5DFA83E
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
79
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Physiology > Blood > Erythropoiesis
## question_only_for
KAU_Y1
## library_ids
ART-102-PHY-ERYTHROPOIESIS
## resource_ids
src_2093c80b1f9c25f9c0a4
## learning_objective
State that bone marrow is the site of erythropoiesis because it contains haemopoietic stem cells.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. Physio MCQ First Year.pdf p16 q56. Manifest src_2093c80b1f9c25f9c0a4.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---

# Item
## id
QST-102-INT-MCQ-131
## title
In the blood, iron is primarily transported by:
## question
In the blood, iron is primarily transported by:
## vignette
This item asks the student to name transferrin as the plasma protein that transports iron in the blood.
## subject
haem
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
D
## answer_a
Hemosiderin
## explanation_a
Haemosiderin is an aggregate storage form of iron, mainly in the liver, spleen and bone marrow — it is not what carries iron through the circulation.
## answer_b
Ferritin
## explanation_b
Ferritin is the main intracellular storage form of iron, not the circulating transport protein.
## answer_c
Secretin
## explanation_c
Secretin is a gastrointestinal hormone that stimulates pancreatic bicarbonate secretion; it has no role in iron transport.
## answer_d
Transferrin
## explanation_d
Correct. Transferrin is the plasma protein that binds ferric iron exported from enterocytes or macrophages and delivers it to cells with transferrin receptors — bone marrow, liver and muscle.

Why this is right:
- Iron is absorbed by enterocytes of the intestinal mucosa, mainly in the duodenum.
- At the apical membrane, ferrous iron (Fe2+) is transported into the enterocyte by divalent metal transporter 1 (DMT1); unreduced ferric iron (Fe3+) is reduced to Fe2+ in the duodenum by a reductase enzyme; haem is transported in separately by a different carrier, haem carrier protein 1 (HCP1).
## topic
Blood
## subtopic
Iron
## main_concept
CON-HEM-A6420C4B3B3D9A
## concept_ids

## contextual_concept_ids

## difficulty
Easy
## question_type
Definition
## cognitive_effort
Low
## cognitive_effort_score
0.2
## setting
Academic
## reasoning_level
1
## inferred_difficulty
79
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Physiology > Blood > Iron
## question_only_for
KAU_Y1
## library_ids
ART-102-PHY-IRON-METABOLISM
## resource_ids
src_2093c80b1f9c25f9c0a4
## learning_objective
Name transferrin as the plasma iron transport protein.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. Physio MCQ First Year.pdf p15 q51. Manifest src_2093c80b1f9c25f9c0a4.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---

# Item
## id
QST-102-INT-MCQ-132
## title
Iron absorption:
## question
Iron absorption:
## vignette
This item asks the student to recall that iron absorption requires gastric HCl to reduce ferric to the absorbable ferrous form.
## subject
haem
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
B
## answer_a
Occurs when the iron is in the ferric state (Fe3+)
## explanation_a
Backwards. Iron is better absorbed in the ferrous state (Fe2+) — ferric iron (Fe3+) must first be reduced before it can cross via DMT1.
## answer_b
Requires gastric HCl
## explanation_b
Correct. Gastric HCl helps dissolve dietary iron and, with ascorbic acid, reduce ferric iron to the absorbable ferrous form.

Why this is right:
- Iron is absorbed by enterocytes of the intestinal mucosa, mainly in the duodenum.
- At the apical membrane, ferrous iron (Fe2+) is transported into the enterocyte by divalent metal transporter 1 (DMT1); unreduced ferric iron (Fe3+) is reduced to Fe2+ in the duodenum by a reductase enzyme; haem is transported in separately by a different carrier, haem carrier protein 1 (HCP1).
## answer_c
Is a passive process which depends on the body requirements
## explanation_c
Backwards. Iron absorption is an active, carrier-mediated process (DMT1 and HCP1), not passive diffusion, though how much of the absorbed iron is retained does depend on body requirements at the intracellular-fate step.
## answer_d
Occurs in the lower part of the small intestine
## explanation_d
Backwards. Iron is absorbed mainly in the duodenum, the upper part of the small intestine, not the lower part — the lower ileum is instead where vitamin B12 is absorbed, and the two are a standard mix-up.
## topic
Blood
## subtopic
Iron
## main_concept
CON-HEM-A6420C4B3B3D9A
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
1
## inferred_difficulty
60
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Physiology > Blood > Iron
## question_only_for
KAU_Y1
## library_ids
ART-102-PHY-IRON-METABOLISM
## resource_ids
src_2093c80b1f9c25f9c0a4
## learning_objective
State that iron absorption requires gastric HCl.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. Physio MCQ First Year.pdf p11 q27. Manifest src_2093c80b1f9c25f9c0a4.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---

# Item
## id
QST-102-INT-MCQ-133
## title
Microcytic hypochromic anemia is due to:
## question
Microcytic hypochromic anemia is due to:
## vignette
This item asks the student to link microcytic hypochromic anaemia to iron deficiency.
## subject
haem
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
B
## answer_a
Decreased vitamin B12 intake
## explanation_a
Decreased vitamin B12 intake causes macrocytic anaemia (large cells), not microcytic hypochromic anaemia (small, pale cells) — the two deficiencies act at different stages of red cell production.
## answer_b
Decrease iron intake
## explanation_b
Correct. Iron-deficiency anaemia — microcytic and hypochromic because too little haemoglobin can be built — follows from decreased dietary iron intake, among the named causes.

Why this is right:
- Deficiency of iron in the diet is one of the three named causes of iron-deficiency anaemia, due to a lower iron intake than the body needs; it is more common in growing children and during pregnancy, when demand for iron rises.
## answer_c
Diseases of the heart
## explanation_c
Heart disease is not one of the causes of iron-deficiency anaemia; it does not appear in the diet/absorption/blood-loss list.
## answer_d
Acute massive bleeding
## explanation_d
Acute massive bleeding gives a dilutional, normocytic normochromic anaemia in the short term (the liver replaces lost plasma faster than the marrow can replace lost cells) — not the microcytic hypochromic picture of chronic iron depletion.
## topic
Blood
## subtopic
Iron
## main_concept
CON-HEM-BDED630BBC87A3
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
79
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Physiology > Blood > Iron
## question_only_for
KAU_Y1
## library_ids
ART-102-PHY-IRON-METABOLISM
## resource_ids
src_2093c80b1f9c25f9c0a4
## learning_objective
Name decreased dietary iron intake as a cause of microcytic hypochromic anaemia.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. Physio MCQ First Year.pdf p11 q29. Manifest src_2093c80b1f9c25f9c0a4.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---

# Item
## id
QST-102-INT-MCQ-134
## title
As regard the iron required for hemoglobin synthesis:
## question
As regard the iron required for hemoglobin synthesis:
## vignette
This item asks the student to recall that iron for haemoglobin synthesis is carried in the blood bound to transferrin.
## subject
haem
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
B
## answer_a
Ferric iron (Fe3+) is absorbed from the upper part of the small intestine
## explanation_a
Backwards. Ferric iron is the form that is *not* readily absorbed — it must first be reduced to the ferrous form, and absorption occurs mainly in the duodenum, not the upper small intestine generically.
## answer_b
It is transported in the blood in the form of transferrin
## explanation_b
Correct. Iron exported from enterocytes (or released from macrophage recycling of old RBCs) is oxidised to the ferric form and carried in the blood bound to the plasma transport protein transferrin.

Why this is right:
- Iron is absorbed by enterocytes of the intestinal mucosa, mainly in the duodenum.
- At the apical membrane, ferrous iron (Fe2+) is transported into the enterocyte by divalent metal transporter 1 (DMT1); unreduced ferric iron (Fe3+) is reduced to Fe2+ in the duodenum by a reductase enzyme; haem is transported in separately by a different carrier, haem carrier protein 1 (HCP1).
## answer_c
Its deficiency produces macrocytic anemia
## explanation_c
Backwards. Iron deficiency produces microcytic, not macrocytic, anaemia — macrocytic anaemia is the vitamin B12/folic-acid picture.
## answer_d
The greatest percentage of ferritin is found in the bone marrow
## explanation_d
Ferritin, the iron-storage protein, is concentrated mainly in the liver, spleen, intestinal enterocytes and bone marrow together — the bone marrow is not singled out as holding the greatest percentage.
## topic
Blood
## subtopic
Iron
## main_concept
CON-HEM-A6420C4B3B3D9A
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
1
## inferred_difficulty
60
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Physiology > Blood > Iron
## question_only_for
KAU_Y1
## library_ids
ART-102-PHY-IRON-METABOLISM
## resource_ids
src_2093c80b1f9c25f9c0a4
## learning_objective
State that iron is transported in the blood bound to transferrin.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. Physio MCQ First Year.pdf p10 q24. Manifest src_2093c80b1f9c25f9c0a4.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---

# Item
## id
QST-102-INT-MCQ-135
## title
Concerning hemoglobin:
## question
Concerning hemoglobin:
## vignette
This item asks the student to identify a correct property of haemoglobin, whose globin chains form carbamino compounds with CO2.
## subject
haem
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
D
## answer_a
Each molecule can carry 8 molecules of oxygen.
## explanation_a
Each haemoglobin molecule carries four oxygen molecules — one per haem group — not eight; eight is double the true figure and a common overreach from remembering "four haem groups" without the one-to-one ratio.
## answer_b
It contains 2 atoms of iron in the ferrous state
## explanation_b
Haemoglobin contains four haem groups, each with one iron atom, so four atoms of iron in total, not two.
## answer_c
It forms oxyhemoglobin with carbon monoxide
## explanation_c
Haemoglobin forms oxyhaemoglobin with oxygen, not carbon monoxide — carbon monoxide instead forms carboxyhaemoglobin, a different reaction named separately.
## answer_d
The globin part forms carbamino compounds with CO2
## explanation_d
Correct. The globin (polypeptide) part of haemoglobin forms carbamino compounds with carbon dioxide — carbaminohaemoglobin — distinct from the iron-based reactions with oxygen, carbon monoxide and oxidising agents.

Why this is right:
- Hb unites loosely with oxygen to form oxyhaemoglobin; the O2 molecule attaches to iron that stays in the Fe2+ state, so the book calls this oxygenation, not oxidation.
- Hb combines with CO2 to form carbaminohaemoglobin, with CO2 attached to the polypeptide chains rather than the iron.
- Hb reacts with carbon monoxide to form carboxyhaemoglobin.
## topic
Blood
## subtopic
Iron
## main_concept
CON-HEM-CA5D4380823112
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
1
## inferred_difficulty
60
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Physiology > Blood > Iron
## question_only_for
KAU_Y1
## library_ids
ART-102-PHY-IRON-METABOLISM
## resource_ids
src_2093c80b1f9c25f9c0a4
## learning_objective
Name carbaminohaemoglobin as the compound formed between the globin chains and carbon dioxide.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. Physio MCQ First Year.pdf p8 q7. Manifest src_2093c80b1f9c25f9c0a4.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---

# Item
## id
QST-102-INT-MCQ-136
## title
Iron deficiency:
## question
Iron deficiency:
## vignette
This item asks the student to recall that iron deficiency, a cause of microcytic anaemia, often results from chronic blood loss.
## subject
haem
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
C
## answer_a
Is more common in males than in females
## explanation_a
Backwards. Chronic blood loss is more common in females than males, largely through menstrual loss — not the other way round.
## answer_b
May cause anemia by inhibiting the rate of multiplication of RBCs stem cells
## explanation_b
Iron deficiency limits haemoglobin synthesis in the RBCs the marrow already produces; it does not itself slow stem-cell multiplication, which is the mechanism taught for vitamin B12/folic-acid deficiency instead.
## answer_c
Occurs due to chronic blood loss
## explanation_c
Correct. Chronic blood loss — from hookworm infestation, peptic ulcer or piles bleeding, or excessive menstrual loss — is one of the three named causes of iron-deficiency anaemia.

Why this is right:
- Chronic blood loss is one of the three causes of iron-deficiency anaemia named, alongside deficient dietary intake and deficient absorption.
## answer_d
May cause large pale erythrocytes to appear in peripheral blood
## explanation_d
Backwards. Iron deficiency produces small, pale (microcytic, hypochromic) erythrocytes, not large pale ones — large pale cells are the macrocytic picture of vitamin B12 or folic acid deficiency instead.
## topic
Blood
## subtopic
Anaemia
## main_concept
CON-HEM-3767DA0A153B4C
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
79
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Physiology > Blood > Anaemia
## question_only_for
KAU_Y1
## library_ids
ART-102-PHY-ANAEMIA-AND-POLYCYTHEMIA
## resource_ids
src_2093c80b1f9c25f9c0a4
## learning_objective
Name chronic blood loss as a cause of iron deficiency.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. Physio MCQ First Year.pdf p10 q22. Manifest src_2093c80b1f9c25f9c0a4.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---

# Item
## id
QST-102-INT-MCQ-137
## title
Vitamin B12:
## question
Vitamin B12:
## vignette
This item asks the student to recall that vitamin B12 is needed for nuclear maturation and cell division, so its deficiency gives a macrocytic anaemia.
## subject
haem
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
D
## answer_a
Deficiency produces normocytic anemia.
## explanation_a
Backwards. Vitamin B12 deficiency produces macrocytic (large-cell) anaemia, because diminished DNA synthesis fails nuclear maturation and division, leaving bigger, irregular, fragile RBCs — not normocytic anaemia.
## answer_b
Needs gastric HCl for its absorption
## explanation_b
Gastric HCl is what iron absorption needs (to reduce ferric to ferrous iron); vitamin B12 absorption instead needs intrinsic factor from the gastric parietal cells and pancreatic trypsin.
## answer_c
Is absorbed from the upper part of the small intestine
## explanation_c
Backwards on location. Vitamin B12, bound to intrinsic factor, is absorbed in the lower ileum, not the upper small intestine — the receptor for the intrinsic-factor complex sits in the brush border of the terminal ileal mucosa.
## answer_d
Is needed for nuclear maturation and cell division.
## explanation_d
Correct. The bone marrow's rapidly dividing cells need DNA synthesis for nuclear maturation and division, and vitamin B12 is essential for that synthesis.

Why this is right:
- Vitamin B12 is needed for DNA synthesis, so its deficiency leaves the red cell precursors in the marrow unable to complete nuclear maturation and division: the cells end up bigger, irregular and very fragile, which is a macrocytic anaemia. Because vitamin B12 is also needed for the myelination of nerves, deficiency may produce neurological manifestations as well.
## topic
Blood
## subtopic
Anaemia
## main_concept
CON-HEM-DDAAF125FD2EBE
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
79
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Physiology > Blood > Anaemia
## question_only_for
KAU_Y1
## library_ids
ART-102-PHY-ANAEMIA-AND-POLYCYTHEMIA
## resource_ids
src_2093c80b1f9c25f9c0a4
## learning_objective
State that vitamin B12 is needed for nuclear maturation and cell division.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. Physio MCQ First Year.pdf p11 q25. Manifest src_2093c80b1f9c25f9c0a4.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---

# Item
## id
QST-102-INT-MCQ-138
## title
Anemia results from all the following, EXCEPT:
## question
Anemia results from all the following, EXCEPT:
## vignette
This item asks the student to spot the exception: living at high altitude raises the red-cell count (secondary polycythemia) rather than causing anaemia.
## subject
haem
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
A
## answer_a
Living at high altitude
## explanation_a
Correct. The exception. Living at high altitude raises the RBC count through the hypoxia–erythropoietin pathway (secondary polycythemia); it does not cause anaemia, which is the opposite direction of change.

Why this is right:
- Polycythemia means an increased number of RBCs, which may reach 6-8 million/mm3.
- There are two types: primary polycythemia (polycythemia vera), due to a condition in the RBC-forming organs themselves and usually accompanied by increased production of WBCs and platelets too; and secondary polycythemia, which occurs when the tissues become hypoxic, as in obstructive lung disease and in people living at high altitude.
## answer_b
Bone marrow depression
## explanation_b
Bone marrow depression is a genuine cause of anaemia (normocytic, normochromic — the marrow simply cannot keep up production), so it is not the exception.
## answer_c
Atrophy of gastric mucosa
## explanation_c
Atrophy of the gastric mucosa removes the parietal cells that secrete intrinsic factor, causing vitamin B12 malabsorption and macrocytic anaemia — a genuine cause, so not the exception.
## answer_d
Iron deficiency
## explanation_d
Iron deficiency is the standard cause of microcytic hypochromic anaemia, so it is not the exception.
## topic
Blood
## subtopic
Anaemia
## main_concept
CON-HEM-3FDA659AB5822B
## concept_ids

## contextual_concept_ids

## difficulty
Moderate
## question_type
Classification
## cognitive_effort
Medium
## cognitive_effort_score
0.5
## setting
Academic
## reasoning_level
1
## inferred_difficulty
60
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Physiology > Blood > Anaemia
## question_only_for
KAU_Y1
## library_ids
ART-102-PHY-ANAEMIA-AND-POLYCYTHEMIA
## resource_ids
src_2093c80b1f9c25f9c0a4
## learning_objective
Recognise that high altitude raises RBC count (polycythemia) rather than causing anaemia.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. Physio MCQ First Year.pdf p12 q32. Manifest src_2093c80b1f9c25f9c0a4.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---

# Item
## id
QST-102-INT-MCQ-139
## title
Hemoproteins are:
## question
Hemoproteins are:
## vignette
This item asks the student to classify hemoproteins as conjugated proteins (protein plus a haem prosthetic group).
## subject
haem
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
B
## answer_a
Simple proteins
## explanation_a
Wrong direction — a simple protein is one built only of amino acids; hemoproteins carry a heme prosthetic group in addition, which is what makes them conjugated rather than simple.
## answer_b
Conjugated proteins
## explanation_b
Correct. Hemoproteins are conjugated proteins containing heme as a tightly bound prosthetic group — the non-amino-acid heme component is exactly what conjugation means.

Why this is right:
- Hemoproteins are conjugated proteins containing heme as a tightly bound prosthetic group.
## answer_c
Glycoprotein
## explanation_c
A glycoprotein's added group is carbohydrate, not heme; picking this confuses one class of conjugated protein for another.
## answer_d
Lipoproteins
## explanation_d
A lipoprotein's added group is lipid, not heme; hemoproteins are named for their prosthetic group, and that group is heme, not a generic lipid.
## topic
Chemistry Of Hemoproteins
## subtopic
Chemistry of Hemoproteins
## main_concept
CON-HEM-208821E5E203D5
## concept_ids

## contextual_concept_ids

## difficulty
Easy
## question_type
Definition
## cognitive_effort
Low
## cognitive_effort_score
0.2
## setting
Academic
## reasoning_level
1
## inferred_difficulty
79
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Biochemistry > Chemistry of Hemoproteins
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-CHEMISTRY-OF-HEMOPROTEINS
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Define hemoproteins as conjugated proteins whose non-protein component is heme.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p41 q1. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---

# Item
## id
QST-102-INT-MCQ-140
## title
The main function of hemoglobin is:
## question
The main function of hemoglobin is:
## vignette
This item asks the student to name oxygen transport in blood as the main function of haemoglobin.
## subject
haem
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
A
## answer_a
Oxygen transport in blood
## explanation_a
Correct. The hemoprotein table assigns hemoglobin exactly this job: transportation of oxygen in blood.

Why this is right:
- Hemoproteins are conjugated proteins containing heme as a tightly bound prosthetic group.
## answer_b
Oxygen storage in muscles
## explanation_b
That is myoglobin's job in the same table, not hemoglobin's — oxygen storage happens in muscle, oxygen transport happens in blood.
## answer_c
Hydroxylation reactions
## explanation_c
Hydroxylation reactions belong to a different class of enzyme entirely; the table does not credit any hemoprotein it lists with hydroxylation.
## answer_d
Oxidation of tryptophan
## explanation_d
Oxidation of tryptophan is not among the functions assigned to any hemoprotein in its table.
## topic
Chemistry Of Hemoproteins
## subtopic
Chemistry of Hemoproteins
## main_concept
CON-HEM-208821E5E203D5
## concept_ids

## contextual_concept_ids

## difficulty
Easy
## question_type
Structure and function
## cognitive_effort
Low
## cognitive_effort_score
0.2
## setting
Academic
## reasoning_level
1
## inferred_difficulty
79
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Biochemistry > Chemistry of Hemoproteins
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-CHEMISTRY-OF-HEMOPROTEINS
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Match hemoglobin to its stated function, oxygen transport in blood, and distinguish it from myoglobin's storage role.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p41 q2. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---

# Item
## id
QST-102-INT-MCQ-141
## title
Myoglobin is formed of:
## question
Myoglobin is formed of:
## vignette
This item asks the student to recall the structure of myoglobin: a single haem attached to a single polypeptide chain.
## subject
haem
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
D
## answer_a
Four heme groups attached to four polypeptide chains
## explanation_a
This is hemoglobin's composition, not myoglobin's — contrasted the two explicitly: hemoglobin has four heme groups on four chains, myoglobin has one on one.
## answer_b
Two heme groups attached to one polypeptide chain
## explanation_b
Neither protein has this composition; myoglobin has one heme on one chain, and no hemoprotein is described as two hemes on a single chain.
## answer_c
Three heme groups attached to three polypeptide chains
## explanation_c
No hemoprotein is described this way; three hemes on three chains matches neither myoglobin (1:1) nor hemoglobin (4:4).
## answer_d
One heme attached to one polypeptide chain
## explanation_d
Correct. Myoglobin is formed of one heme attached to one polypeptide chain, while hemoglobin is the one with four hemes on four chains.

Why this is right:
- Myoglobin is formed of one heme group attached to one polypeptide chain (apomyoglobin, 153 amino acids, 8 α-helices), while hemoglobin is formed of four heme groups attached to four polypeptide chains.
## topic
Chemistry Of Hemoproteins
## subtopic
Chemistry of Hemoproteins
## main_concept
CON-HEM-B9017F150AF212
## concept_ids

## contextual_concept_ids

## difficulty
Easy
## question_type
Structure and function
## cognitive_effort
Low
## cognitive_effort_score
0.2
## setting
Academic
## reasoning_level
1
## inferred_difficulty
79
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Biochemistry > Chemistry of Hemoproteins
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-CHEMISTRY-OF-HEMOPROTEINS
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
State myoglobin's heme-to-chain ratio (1:1) and contrast it with hemoglobin's (4:4).
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p41 q3. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---

# Item
## id
QST-102-INT-MCQ-142
## title
In sickle cell anemia, the basis of the malfunction of the hemoglobin molecules is:
## question
In sickle cell anemia, the basis of the malfunction of the hemoglobin molecules is:
## vignette
This item asks the student to identify the molecular basis of sickle cell anaemia as the substitution of a single amino acid in the beta chain.
## subject
haem
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
B
## answer_a
Incorrect secondary structure
## explanation_a
A secondary-structure fault is not described; the defect is a single substituted residue, and the α-helical secondary structure itself is not what changes.
## answer_b
Substitution of a single amino acid
## explanation_b
Correct. Traced the whole malfunction to one point mutation in the β-globin gene, replacing glutamate with valine at position six of the β chain — a single amino-acid substitution.

Why this is right:
- Sickle cell anaemia is caused by a single nucleotide alteration — a point mutation — in the β-globin gene, which replaces the polar glutamate normally at position six of the β chain with a nonpolar valine.
## answer_c
Insufficient iron in the diet
## explanation_c
Sickle cell anaemia is not a dietary iron deficiency; the account is genetic, a point mutation in the β-globin gene, with no mention of iron intake.
## answer_d
Faulty binding of the heme groups
## explanation_d
Heme binding is not implicated; the substituted valine creates a sticky surface patch on the β subunit itself, away from where heme sits.
## topic
Chemistry Of Hemoproteins
## subtopic
Chemistry of Hemoproteins
## main_concept
CON-HEM-BEF9577989EAF4
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
1
## inferred_difficulty
60
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Biochemistry > Chemistry of Hemoproteins
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-CHEMISTRY-OF-HEMOPROTEINS
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Attribute sickle cell anaemia's malfunction to a single amino-acid substitution rather than a structural, dietary, or heme-binding defect.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p42 q9. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---

# Item
## id
QST-102-INT-MCQ-143
## title
Fetal hemoglobin (HbF):
## question
Fetal hemoglobin (HbF):
## vignette
This item asks the student to recall that fetal haemoglobin (HbF) has a higher oxygen affinity than adult haemoglobin.
## subject
haem
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
C
## answer_a
Consists of 2 alpha and 2 delta chains
## explanation_a
α2δ2 is HbA2, not HbF — given HbF the composition α2γ2, two alpha and two gamma chains, not delta.
## answer_b
Runs faster than adult hemoglobin in electrophoresis
## explanation_b
HbF's electrophoretic mobility relative to adult haemoglobin is not described, so this is not a supported claim.
## answer_c
Has a higher affinity to oxygen than adult hemoglobin
## explanation_c
Correct. HbF has a higher affinity for oxygen than adult haemoglobin, which allows more efficient transplacental transfer of oxygen from mother to fetus.

Why this is right:
- Hemoglobin structure differs across embryonic, fetal and adult life; all are tetramers of different polypeptide chains encoded by different genes.
## answer_d
Is the major hemoglobin found in adults
## explanation_d
Given HbA1 as the major adult haemoglobin, 98% of the total; HbF is instead described as present only up to six months after birth, not as the major form found in adults.
## topic
Chemistry Of Hemoproteins
## subtopic
Chemistry of Hemoproteins
## main_concept
CON-HEM-E172B2F684099D
## concept_ids

## contextual_concept_ids

## difficulty
Moderate
## question_type
Classification
## cognitive_effort
Medium
## cognitive_effort_score
0.5
## setting
Academic
## reasoning_level
1
## inferred_difficulty
60
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Biochemistry > Chemistry of Hemoproteins
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-CHEMISTRY-OF-HEMOPROTEINS
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
State that fetal haemoglobin's higher oxygen affinity aids transplacental oxygen transfer, and give its correct chain composition (α2γ2).
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p42 q15. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---

# Item
## id
QST-102-INT-MCQ-144
## title
In HbS, the 6th amino acid of the beta chain is replaced by:
## question
In HbS, the 6th amino acid of the beta chain is replaced by:
## vignette
This item asks the student to recall that in HbS the sixth amino acid of the beta chain, glutamate, is replaced by valine.
## subject
haem
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
B
## answer_a
Tyrosine
## explanation_a
Tyrosine is not the residue named; the substituting amino acid is valine.
## answer_b
Valine
## explanation_b
Correct. The point mutation replaces the polar glutamate at position six of the β chain with a nonpolar valine.

Why this is right:
- Sickle cell anaemia is caused by a single nucleotide alteration — a point mutation — in the β-globin gene, which replaces the polar glutamate normally at position six of the β chain with a nonpolar valine.
## answer_c
Glycine
## explanation_c
Glycine is not the residue named for this substitution; specified valine replacing glutamate.
## answer_d
Serine
## explanation_d
Serine is not the residue named here; serine is instead the amino acid that combines with phosphatidic acid to form phosphatidylserine in an unrelated lipid concept, not the HbS substitution.
## topic
Chemistry Of Hemoproteins
## subtopic
Chemistry of Hemoproteins
## main_concept
CON-HEM-BEF9577989EAF4
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
79
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Biochemistry > Chemistry of Hemoproteins
## question_only_for
KAU_Y1
## library_ids
ART-102-BIO-CHEMISTRY-OF-HEMOPROTEINS
## resource_ids
src_07f0a0ff41addf826c7f
## learning_objective
Name valine as the amino acid substituted for glutamate at position six of the β chain in HbS.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. DPT BOOK MCQ D book bio 102&103 mcq (1).pdf p43 q16. Manifest src_07f0a0ff41addf826c7f.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---

# Item
## id
QST-102-INT-MCQ-145
## title
Hemophilia, a recessive X-linked disease is
## question
Hemophilia, a recessive X-linked disease is
## vignette
This item asks the student to recall that haemophilia, an X-linked recessive clotting-factor deficiency, prolongs the coagulation time.
## subject
haem
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
D
## answer_a
Common in females than males
## explanation_a
Backwards. A sex-linked recessive disease on the X chromosome is carried by females (who have a second, usually normal, X) and manifests almost always in males (who have only one X) — the opposite of what this option claims.
## answer_b
Of type-A, is caused by lack of factor XI
## explanation_b
This describes haemophilia B (factor IX deficiency), but the stem does not name a type, and this option misstates the missing factor as XI when haemophilia B is defined by factor IX — haemophilia C is the one caused by factor XI absence.
## answer_c
Characterized by prolonged bleeding time
## explanation_c
Haemophilia is a clotting-factor deficiency, which prolongs the whole blood *coagulation* time, not the *bleeding* time (a platelet-function measure) — the two tests are not interchangeable.
## answer_d
Characterized by prolonged coagulation time
## explanation_d
Correct. Whichever factor is missing (VIII, IX or XI, according to type), haemophilia slows the intrinsic-pathway cascade and so prolongs the whole blood coagulation time.

Why this is right:
- Haemophilia is a sex-linked recessive disease, carried by females and manifested almost always in males, characterised by episodes of haemorrhage into joints or internal organs after minor trauma, and causing prolongation of the whole blood coagulation time.
- There are three types: haemophilia A (classic haemophilia), from deficiency of factor VIII, representing 85% of cases of haemophilia; haemophilia B, from the absence of factor IX; and haemophilia C, from the absence of factor XI.
## topic
Blood
## subtopic
Abnormalities of haemostasis
## main_concept
CON-HEM-54B08B015D5498
## concept_ids

## contextual_concept_ids

## difficulty
Easy
## question_type
Reasoning
## cognitive_effort
Low
## cognitive_effort_score
0.2
## setting
Academic
## reasoning_level
1
## inferred_difficulty
79
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Physiology > Blood > Abnormalities of haemostasis
## question_only_for
KAU_Y1
## library_ids
ART-102-PHY-ABNORMALITIES-OF-HAEMOSTASIS
## resource_ids
src_2093c80b1f9c25f9c0a4
## learning_objective
State that haemophilia prolongs the coagulation time, and its inheritance pattern.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. Physio MCQ First Year.pdf p18 q69. Manifest src_2093c80b1f9c25f9c0a4.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---

# Item
## id
QST-102-INT-MCQ-146
## title
Factor IX:
## question
Factor IX:
## vignette
This item asks the student to recall the action of factor IXa, which (with VIIIa) converts factor X to Xa in the intrinsic pathway.
## subject
haem
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
D
## answer_a
Is a co-factor in the coagulation cascade
## explanation_a
Factor IX is not a cofactor — it is an enzyme (a serine protease once activated). The cofactor in its activation complex is factor VIIIa, not factor IX itself.
## answer_b
Is activated by factor V
## explanation_b
Backwards. Factor IX is activated by factor XIa (upstream of it in the intrinsic pathway), not by factor V, which belongs to the common pathway further downstream.
## answer_c
Deficiency causes hemophilia A
## explanation_c
Backwards. Deficiency of factor IX causes haemophilia B, not haemophilia A — haemophilia A is factor VIII deficiency.
## answer_d
Acts by converting factor X to Xa
## explanation_d
Correct. Activated factor IX (IXa), complexed with activated factor VIII (VIIIa), platelet phospholipid and Ca2+, activates factor X — the step at which the intrinsic pathway hands off to the common pathway.

Why this is right:
- Coagulation runs as two initiating cascades that converge.
## topic
Blood
## subtopic
Abnormalities of haemostasis
## main_concept
CON-HEM-8EC1CD48F9DB41
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
1
## inferred_difficulty
60
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Physiology > Blood > Abnormalities of haemostasis
## question_only_for
KAU_Y1
## library_ids
ART-102-PHY-ABNORMALITIES-OF-HAEMOSTASIS
## resource_ids
src_2093c80b1f9c25f9c0a4
## learning_objective
State what activated factor IX does in the intrinsic pathway.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. Physio MCQ First Year.pdf p14 q46. Manifest src_2093c80b1f9c25f9c0a4.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---

# Item
## id
QST-102-INT-MCQ-147
## title
Vitamin K dependent clotting factors include:
## question
Vitamin K dependent clotting factors include:
## vignette
This item asks the student to identify factor IX among the vitamin-K-dependent clotting factors (II, VII, IX, X).
## subject
haem
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
A
## answer_a
Factor IX
## explanation_a
Correct. Factor IX belongs to the prothrombin group (II, VII, IX, X), all of which need vitamin K for their hepatic synthesis.

Why this is right:
- Vitamin K is a fat-soluble vitamin synthesised by the intestinal bacterial flora, needed for the hepatic formation of factors II, VII, IX and X and proteins C and S.
- Its deficiency decreases formation of these coagulation factors and prolongs coagulation time.
- Deficiency can follow absence of intestinal bacterial flora (as in newborn infants), prolonged treatment with antibiotics, or obstruction of the bile ducts (absence of bile needed for absorption of the fat-soluble vitamin K).
## answer_b
Factor XI
## explanation_b
Factor XI belongs to the contact group with factor XII, activated by contact with an electronegatively-charged surface — it is not one of the vitamin-K-dependent factors.
## answer_c
Fibrinogen
## explanation_c
Fibrinogen (factor I) belongs to the fibrinogen group with V, VIII and XIII, activated by thrombin — its synthesis does not depend on vitamin K.
## answer_d
Plasminogen
## explanation_d
Plasminogen is the fibrinolytic system's substrate, converted to plasmin by tissue plasminogen activator — it plays no part in the vitamin-K-dependent synthesis list.
## topic
Blood
## subtopic
Physiological limitations of blood coagulation
## main_concept
CON-HEM-BC9F1F59205EC7
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
79
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Physiology > Blood > Physiological limitations of blood coagulation
## question_only_for
KAU_Y1
## library_ids
ART-102-PHY-PHYSIOLOGICAL-LIMITATIONS-OF-BLOOD-COAGULATION
## resource_ids
src_2093c80b1f9c25f9c0a4
## learning_objective
Name factor IX as one of the four vitamin-K-dependent clotting factors.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. Physio MCQ First Year.pdf p12 q34. Manifest src_2093c80b1f9c25f9c0a4.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---

# Item
## id
QST-102-INT-MCQ-148
## title
Which of the following is a feature of protein S:
## question
Which of the following is a feature of protein S:
## vignette
This item asks the student to recall that protein S acts as a cofactor to activated protein C in the anticoagulant pathway.
## subject
haem
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
C
## answer_a
It is synthesized by the endothelium
## explanation_a
Thrombomodulin, not protein S, is the endothelial surface protein that binds thrombin to start this pathway. Protein S is a circulating cofactor, not something the endothelium synthesises as its structural component.
## answer_b
Its synthesis requires vitamin C
## explanation_b
Vitamin K, not vitamin C, is what protein S synthesis (like protein C, and factors II, VII, IX, X) depends on in the liver.
## answer_c
It functions as a cofactor to protein C
## explanation_c
Correct. Protein S is the cofactor that activated protein C needs to inactivate factors V and VIII — protein C is the enzyme, protein S enables it.

Why this is right:
- Blood normally circulates in a fluid state because several physiological mechanisms limit clotting: a healthy endothelium, which keeps blood off subendothelial collagen and carries antiplatelet and anticoagulant surface products; the small amount of heparin in blood, which combines with antithrombin III to inactivate factors IX, X, XI and XII; the liver, which inactivates any activated coagulation factor; a continuous normal flow rate, since stasis allows intravascular clotting; the balance between thromboxane A2 and prostacyclin, which confines a clot to the site of injury; and the fibrinolytic system.
## answer_d
It is involved in the inactivation of factor IXa
## explanation_d
That is what activated protein C itself does (with protein S as its cofactor) to factor V and VIII — inactivating factor IXa is not part of this pathway; factor IXa is instead removed by fibrinogen degradation products' inhibition of thrombin further downstream, not by protein C/S directly.
## topic
Blood
## subtopic
Physiological limitations of blood coagulation
## main_concept
CON-HEM-87280E690F877F
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
1
## inferred_difficulty
60
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Physiology > Blood > Physiological limitations of blood coagulation
## question_only_for
KAU_Y1
## library_ids
ART-102-PHY-PHYSIOLOGICAL-LIMITATIONS-OF-BLOOD-COAGULATION
## resource_ids
src_2093c80b1f9c25f9c0a4
## learning_objective
State that protein S is the cofactor of activated protein C.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. Physio MCQ First Year.pdf p14 q48. Manifest src_2093c80b1f9c25f9c0a4.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---

# Item
## id
QST-102-INT-MCQ-149
## title
Albumin:
## question
Albumin:
## vignette
This item asks the student to recall that albumin maintains plasma colloid osmotic pressure, and so governs tissue-fluid formation and blood-volume regulation.
## subject
haem
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
D
## answer_a
Production is decreased in case of burns and kidney disease
## explanation_a
Burns lose albumin directly from the circulation (through damaged capillaries) rather than reducing its production, and kidney disease loses albumin in the urine through a leaky glomerular filter — neither is described as decreased *production*.
## answer_b
Has transport function due to the elongated shape of its molecule
## explanation_b
Transport by binding to substances (hormones, vitamins, lipids, minerals) is albumin's function, but attributed this to albumin's abundance and binding sites, not to an "elongated shape" — elongated shape is instead named for fibrinogen, explaining its outsized contribution to blood viscosity.
## answer_c
Is normally filtered by the kidney due to its relatively small molecular size
## explanation_c
Backwards. Albumin is normally kept inside the plasma precisely because the capillary membrane is impermeable to it (its molecular size is too large to filter through) — it is not normally filtered by the kidney at all, unlike the renal-disease state where a damaged filter lets it leak into urine.
## answer_d
Is important for the tissue fluid formation and blood volume regulation
## explanation_d
Correct. Albumin's colloidal osmotic pressure holds water in the capillaries and draws tissue fluid back in, making it central to both tissue fluid formation and the regulation of circulating blood volume.

Why this is right:
- The liver is the main site of synthesis of the plasma proteins, making albumin, fibrinogen, the coagulation factors and 50% of the globulins, while the gamma globulins are formed by plasma cells in lymphoid tissue. Between them the plasma proteins do eight things. They supply the 25 to 28 mmHg of effective colloidal osmotic pressure that draws tissue fluid into the blood, and albumin supplies most of it because it is the most concentrated. They supply 15% of the buffering power of the blood. The gamma globulins defend the body against microorganisms and their toxins. Fibrinogen and the clotting factors coagulate the blood. Fibrinogen also contributes more than any other protein to blood viscosity, because of its elongated shape. Plasma proteins close the pores of the capillary walls and so limit their permeability. Albumin and the alpha and beta globulins carry hormones, vitamins, lipids and minerals, and stop them being lost rapidly in urine. And they are a reserve for the rapid replacement of tissue protein.
## topic
Blood
## subtopic
Plasma proteins
## main_concept
CON-HEM-005D132395BF2F
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
1
## inferred_difficulty
60
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Physiology > Blood > Plasma proteins
## question_only_for
KAU_Y1
## library_ids
ART-102-PHY-PLASMA-PROTEINS
## resource_ids
src_2093c80b1f9c25f9c0a4
## learning_objective
Name albumin's importance for tissue fluid formation and blood volume regulation.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. Physio MCQ First Year.pdf p8 q9. Manifest src_2093c80b1f9c25f9c0a4.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.

---

# Item
## id
QST-102-INT-MCQ-150
## title
Globulins:
## question
Globulins:
## vignette
This item asks the student to recall that alpha-globulins carry vitamins and hormones, preventing their loss in urine.
## subject
haem
## status
Draft
## owner
Claude
## format
single best answer
## correct_answer
C
## answer_a
All are formed in the liver except B-type is formed by plasma cells
## explanation_a
Backwards on which type is the exception. All globulins are formed in the liver except the gamma type, which plasma cells in lymphoid tissue make — the option names beta as the exception instead of gamma.
## answer_b
Of the gamma type are responsible for the plasma osmotic function
## explanation_b
Backwards. Albumin, not the gamma globulins, is chiefly responsible for the plasma's osmotic function — the gamma globulins' role is defensive (humoral immunity), not osmotic.
## answer_c
Of the alpha type prevents loss of vitamins and hormones in urine
## explanation_c
Correct. Albumin and the alpha (and beta) globulins act as carriers for hormones, vitamins, lipids and minerals; binding these substances to plasma proteins prevents their rapid loss in the urine and provides a usable reservoir.

Why this is right:
- The liver is the main site of synthesis of the plasma proteins, making albumin, fibrinogen, the coagulation factors and 50% of the globulins, while the gamma globulins are formed by plasma cells in lymphoid tissue. Between them the plasma proteins do eight things. They supply the 25 to 28 mmHg of effective colloidal osmotic pressure that draws tissue fluid into the blood, and albumin supplies most of it because it is the most concentrated. They supply 15% of the buffering power of the blood. The gamma globulins defend the body against microorganisms and their toxins. Fibrinogen and the clotting factors coagulate the blood. Fibrinogen also contributes more than any other protein to blood viscosity, because of its elongated shape. Plasma proteins close the pores of the capillary walls and so limit their permeability. Albumin and the alpha and beta globulins carry hormones, vitamins, lipids and minerals, and stop them being lost rapidly in urine. And they are a reserve for the rapid replacement of tissue protein.
## answer_d
Are positively charged at the normal pH of plasma and act as weak acids
## explanation_d
Backwards. At normal plasma pH, plasma proteins are negatively charged, which is exactly why they act as weak acids — being positively charged and acting as weak acids in the same breath is internally contradictory (a positive charge would make a base's conjugate, not an acid).
## topic
Blood
## subtopic
Plasma proteins
## main_concept
CON-HEM-005D132395BF2F
## concept_ids

## contextual_concept_ids

## difficulty
Hard
## question_type
Mechanism
## cognitive_effort
High
## cognitive_effort_score
0.8
## setting
Academic
## reasoning_level
1
## inferred_difficulty
45
## exam_relevance
4.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=0.45
## years
Year 1
## universities
kau
## module
102 INT
## module_subject
102 INT > Physiology > Blood > Plasma proteins
## question_only_for
KAU_Y1
## library_ids
ART-102-PHY-PLASMA-PROTEINS
## resource_ids
src_2093c80b1f9c25f9c0a4
## learning_objective
Name the alpha globulins' transport role in preventing urinary loss of hormones and vitamins.
## source_citation
Kasr Al Ainy departmental question books, module 102 INT. Physio MCQ First Year.pdf p8 q8. Manifest src_2093c80b1f9c25f9c0a4.
## estimated_seconds
60
## randomise_answers
yes
## derived_from
Department book MCQ, transcribed rather than derived.
## author_notes
Asked 1 time across the question books.
