<!--
  AU-MED-102 Biochemistry sub-lane D — MCQs testing this lane's 7 HIT-PENDING
  concepts (pending-live/AU-MED-102-biochem-molecular.md). Per LANE-BRIEF SS21/SS22,
  authored NOW rather than deferred, and quarantined here (not the import root)
  because the concepts themselves are sparse updates onto ids that exist only in
  another lane's unimported Kasr batch.

  Two-sided coverage check (SS22) — verified by reading each Kasr article's own
  ## related_concepts, not the concept's article_ids (which Kasr generated
  heuristically and are not always right):
    CON-FND-5BAF472E54A764 -> ART-102-BIO-CHEMISTRY-OF-NUCLEIC-ACIDS   VERIFIED
    CON-FND-A73C06E0EC3C1D -> ART-102-BIO-DNA-SYNTHESIS-REPLICATION-AND-REPAIR VERIFIED
    CON-FND-27013C64915C7E -> ART-102-BIO-RNA-SYNTHESIS-TRANSCRIPTION  VERIFIED
    CON-FND-4508AC0EA86F86 -> ART-102-BIO-PROTEIN-SYNTHESIS-TRANSLATION VERIFIED
    CON-FND-42F34977A8DF23 -> ART-108-PHA-PHARMACODYNAMICS             VERIFIED
  Two of the seven HIT-PENDING concepts FAIL this check — their own article_ids
  claims an article that does NOT actually name them in related_concepts — and are
  therefore NOT authored as questions here, per SS22's explicit rule:
    CON-FND-CC55F157021237 (promoter boxes) claims ART-102-BIO-RNA-SYNTHESIS-TRANSCRIPTION,
      which does not list it in related_concepts.
    CON-FND-D6DFABFBA0BA5E (nucleotide six jobs) claims ART-102-BIO-CHEMISTRY-OF-FREE-NUCLEOTIDES,
      which does not list it in related_concepts.
  Both ideas (E33 promoter definition, E20/E21/E22 cAMP/SAM/PAPS) are tested by AU
  questions (DNA & RNA MCQ Q37 and Q21/22/23) but stay unauthored pending Kasr Y1's
  verification pass on these two articles (per SS22, "Kasr Y1 is running a
  verification pass").

  Validate:
    npm run medical:batch -- <this file> \
      --with docs/Kasr-Source-Imports/concept/102-INT-concepts.md \
      --with docs/Kasr-Source-Imports/concept/108-INT-concepts-pharmacology.md \
      --with docs/Kasr-Source-Imports/article/102-INT-biochemistry.md \
      --with docs/Kasr-Source-Imports/article/108-INT-pharmacology.md
    npm run medical:simulate -- docs/Kasr-Source-Imports/concept/102-INT-concepts.md \
      docs/Kasr-Source-Imports/concept/108-INT-concepts-pharmacology.md \
      docs/Kasr-Source-Imports/article/102-INT-biochemistry.md \
      docs/Kasr-Source-Imports/article/108-INT-pharmacology.md \
      docs/Alexandria-Source-Imports/pending-live/AU-MED-102-biochem-molecular.md \
      <this file> --emit /tmp/sanity.json
  Apply only after both named Kasr files (concept AND article) are live, same as
  pending-live/AU-MED-102-biochem-molecular.md's own ordering line.
-->

# Item

## id
QST-FND-5BAF472E54A764-01

## title
Concerning DNA structure, all of the following are correct EXCEPT:

## question
Concerning DNA structure, all of the following are correct EXCEPT:

## subject
fnd

## status
Draft

## owner
Admin team

## vignette

## correct_answer
C

## answer_a
The two strands of DNA run antiparallel

## explanation_a
Incorrect as the answer, because this statement is true. The two strands of the double helix do run in opposite (antiparallel) directions, which is why one strand's 5' end sits opposite the other strand's 3' end.

## answer_b
The two strands are held together by complementary base pairing

## explanation_b
Incorrect as the answer, because this statement is true. Hydrogen bonds between complementary bases (A with T, G with C) are the only force holding the two strands of the duplex together.

## answer_c
Adenine pairs with thymine through three hydrogen bonds

## explanation_c
Correct — this is the false statement, which is what the question asks for. Adenine pairs with thymine through two hydrogen bonds, not three; three hydrogen bonds is the guanine-cytosine pair's count. Mixing up which base pair has two bonds and which has three is one of the most common errors in this topic. The memory hook worth keeping is "two for A-T, three for G-C" — G and C simply have one more bond than A and T.

## answer_d
Cytosine pairs with guanine through three hydrogen bonds

## explanation_d
Incorrect as the answer, because this statement is true. Guanine and cytosine pair through three hydrogen bonds, one more than the adenine-thymine pair.

## topic
Molecular biology

## subtopic
DNA structure

## main_concept
CON-FND-5BAF472E54A764

## concept_ids
[clear]

## contextual_concept_ids
[clear]

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
2

## inferred_difficulty
55

## exam_relevance
6

## clinical_relevance
0.2

## academic_relevance
0.7

## exam_weight_by_year
AU_Y1=0.4

## years
AU_Y1

## universities
au

## module
AU-MED-102

## question_only_for

## library_ids
ART-102-BIO-CHEMISTRY-OF-NUCLEIC-ACIDS

## resource_ids
src_80f6b1121bd3b85f8886

## learning_objective
State the correct hydrogen-bond count for each DNA base pair (two for A-T, three for G-C) and identify a statement that reverses it as false.

## source_citation
AU-MED-102 Biochemistry, DNA & RNA MCQ, Q24.

## attached_image

## attachments
[clear]

## media_recommendations

## estimated_seconds
70

## randomise_answers
yes

## author_notes
Tests a HIT-PENDING Kasr concept (CON-FND-5BAF472E54A764, not minted by this lane); library_ids points at the verified Kasr article, per LANE-BRIEF SS22.

---

# Item

## id
QST-FND-A73C06E0EC3C1D-01

## title
Which of the following eukaryotic DNA polymerases has proofreading?

## question
Which of the following eukaryotic DNA polymerases has proofreading?

## subject
fnd

## status
Draft

## owner
Admin team

## vignette

## correct_answer
B

## answer_a
DNA polymerase alpha

## explanation_a
Incorrect. Alpha, as part of the alpha-primase complex, lays down the RNA primer and a short stretch of DNA; it is not the polymerase credited with proofreading in this scheme.

## answer_b
DNA polymerase delta

## explanation_b
Correct. Delta synthesises the lagging strand, discontinuously as Okazaki fragments, and — together with epsilon — carries the 3'-to-5' exonuclease proofreading activity that removes a wrongly paired nucleotide during replication. This proofreading step is the second of replication's two independent fidelity checks, alongside correct base pairing itself. The detail worth keeping is that proofreading belongs to the strand-synthesising polymerases (delta and epsilon), not to alpha (priming) or beta (repair).

## answer_c
DNA polymerase gamma

## explanation_c
Incorrect. Gamma is dedicated to replicating mitochondrial DNA, not nuclear genomic DNA, and is not the polymerase this question credits with proofreading.

## answer_d
DNA polymerase beta

## explanation_d
Incorrect. Beta's role is DNA repair (filling small gaps), not proofreading during ongoing replication.

## topic
Molecular biology

## subtopic
DNA replication

## main_concept
CON-FND-A73C06E0EC3C1D

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Hard

## question_type
Classification

## cognitive_effort
High

## cognitive_effort_score
0.65

## setting
Academic

## reasoning_level
2

## inferred_difficulty
45

## exam_relevance
6

## clinical_relevance
0.15

## academic_relevance
0.7

## exam_weight_by_year
AU_Y1=0.4

## years
AU_Y1

## universities
au

## module
AU-MED-102

## question_only_for

## library_ids
ART-102-BIO-DNA-SYNTHESIS-REPLICATION-AND-REPAIR

## resource_ids
src_80f6b1121bd3b85f8886

## learning_objective
Name delta as the eukaryotic DNA polymerase carrying proofreading exonuclease activity during lagging-strand synthesis.

## source_citation
AU-MED-102 Biochemistry, DNA & RNA MCQ, Q57.

## attached_image

## attachments
[clear]

## media_recommendations

## estimated_seconds
70

## randomise_answers
yes

## author_notes
Tests a HIT-PENDING Kasr concept, not minted by this lane; library_ids points at the verified Kasr article, per LANE-BRIEF SS22.

---

# Item

## id
QST-FND-27013C64915C7E-01

## title
An intron is the portion of:

## question
An intron is the portion of:

## subject
fnd

## status
Draft

## owner
Admin team

## vignette

## correct_answer
B

## answer_a
DNA that is cleaved off during replication

## explanation_a
Incorrect. Introns are a transcript-processing concept, not a replication one — nothing is cleaved from DNA itself during replication as part of normal splicing.

## answer_b
mRNA that is removed after transcription

## explanation_b
Correct. An intron is a non-coding portion of the primary mRNA transcript that is removed by the spliceosome during processing, leaving only the exons joined together in the mature mRNA. Splicing the same primary transcript differently (alternative splicing) is what allows one gene to yield several different protein products. The detail worth keeping is the direction: introns are removed, exons are retained and joined.

## answer_c
tRNA that is added on after its synthesis

## explanation_c
Incorrect. This describes no real step of tRNA processing that the bank associates with the term 'intron' — introns are specifically an mRNA/pre-mRNA concept.

## answer_d
Protein that is removed after translation

## explanation_d
Incorrect. Removing a piece of protein after translation is a post-translational processing event (such as removing a signal peptide), not what 'intron' refers to — introns are removed from RNA, not protein.

## topic
Molecular biology

## subtopic
Transcription

## main_concept
CON-FND-27013C64915C7E

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.35

## setting
Academic

## reasoning_level
1

## inferred_difficulty
70

## exam_relevance
6

## clinical_relevance
0.15

## academic_relevance
0.65

## exam_weight_by_year
AU_Y1=0.4

## years
AU_Y1

## universities
au

## module
AU-MED-102

## question_only_for

## library_ids
ART-102-BIO-RNA-SYNTHESIS-TRANSCRIPTION

## resource_ids
src_80f6b1121bd3b85f8886

## learning_objective
Define an intron as the portion of the primary mRNA transcript removed during splicing, distinct from an exon.

## source_citation
AU-MED-102 Biochemistry, DNA & RNA MCQ, Q8.

## attached_image

## attachments
[clear]

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
Tests a HIT-PENDING Kasr concept, not minted by this lane; library_ids points at the verified Kasr article, per LANE-BRIEF SS22.

---

# Item

## id
QST-FND-4508AC0EA86F86-01

## title
What type of mutation involves a change that produces a stop codon?

## question
What type of mutation involves a change that produces a stop codon?

## subject
fnd

## status
Draft

## owner
Admin team

## vignette

## correct_answer
D

## answer_a
Unacceptable missense

## explanation_a
Incorrect. A missense mutation changes the codon to specify a different amino acid; it does not create a stop codon.

## answer_b
Partially acceptable missense

## explanation_b
Incorrect. Like unacceptable missense, this describes a codon change that still specifies an amino acid (just one that is chemically more tolerated), not a stop codon.

## answer_c
Silent

## explanation_c
Incorrect. A silent mutation changes the codon to a synonym that still specifies the same amino acid — no change in the protein at all, let alone a stop codon.

## answer_d
Nonsense

## explanation_d
Correct. A nonsense mutation is specifically the base substitution that turns a sense codon into a stop codon, prematurely terminating translation. This is the most damaging of the three functional classes (nonsense, missense, silent) because it truncates the protein rather than merely altering or preserving one residue. The name is a useful hook: 'nonsense' because the truncated message no longer makes biological sense.

## topic
Molecular biology

## subtopic
Mutation

## main_concept
CON-FND-4508AC0EA86F86

## concept_ids
[clear]

## contextual_concept_ids
[clear]

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
2

## inferred_difficulty
55

## exam_relevance
7

## clinical_relevance
0.3

## academic_relevance
0.7

## exam_weight_by_year
AU_Y1=0.4

## years
AU_Y1

## universities
au

## module
AU-MED-102

## question_only_for

## library_ids
ART-102-BIO-PROTEIN-SYNTHESIS-TRANSLATION

## resource_ids
src_80f6b1121bd3b85f8886

## learning_objective
Name a nonsense mutation as the base substitution that creates a stop codon, distinguishing it from missense and silent substitutions.

## source_citation
AU-MED-102 Biochemistry, DNA & RNA MCQ, Q32.

## attached_image

## attachments
[clear]

## media_recommendations

## estimated_seconds
70

## randomise_answers
yes

## author_notes
Tests a HIT-PENDING Kasr concept, not minted by this lane; library_ids points at the verified Kasr article, per LANE-BRIEF SS22.

---

# Item

## id
QST-FND-42F34977A8DF23-01

## title
Growth factors bind to what type of receptors?

## question
Growth factors bind to what type of receptors?

## subject
fnd

## status
Draft

## owner
Admin team

## vignette

## correct_answer
D

## answer_a
Ligand-gated ion channels

## explanation_a
Incorrect. Ligand-gated ion channels transduce on a millisecond timescale (for example the nicotinic acetylcholine receptor); growth factors do not signal through this receptor type.

## answer_b
G-protein-linked receptors

## explanation_b
Incorrect. GPCRs signal through heterotrimeric G proteins and second messengers; growth factors are not the ligand class this receptor family is defined by.

## answer_c
Cyclic AMP

## explanation_c
Incorrect. Cyclic AMP is a second messenger, not a receptor — it is a molecule some receptor pathways produce downstream, not something a growth factor binds to directly.

## answer_d
Receptor tyrosine kinases

## explanation_d
Correct. Growth factors are the classic ligand class for receptor tyrosine kinases, one of the four receptor types (alongside ligand-gated ion channels, GPCRs and nuclear receptors) that transduce signals on progressively longer timescales. Binding triggers receptor dimerisation and autophosphorylation of tyrosine residues, which then recruits downstream signalling proteins. The detail worth keeping is the ligand-to-receptor-family pairing: growth factors go with receptor tyrosine kinases, the way steroid hormones go with intracellular nuclear receptors.

## topic
Cell signalling

## subtopic
Receptor classification

## main_concept
CON-FND-42F34977A8DF23

## concept_ids
[clear]

## contextual_concept_ids
[clear]

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
2

## inferred_difficulty
55

## exam_relevance
6

## clinical_relevance
0.3

## academic_relevance
0.65

## exam_weight_by_year
AU_Y1=0.4

## years
AU_Y1

## universities
au

## module
AU-MED-102

## question_only_for

## library_ids
ART-108-PHA-PHARMACODYNAMICS

## resource_ids
src_4ff0b2fb099c99bb896e

## learning_objective
Identify receptor tyrosine kinases as the receptor family growth factors bind, within the four-type receptor classification.

## source_citation
AU-MED-102 Biochemistry, Cell Signaling MCQ, Q6.

## attached_image

## attachments
[clear]

## media_recommendations

## estimated_seconds
70

## randomise_answers
yes

## author_notes
Tests a HIT-PENDING Kasr concept (from 108-INT-concepts-pharmacology.md, not 102-INT); library_ids points at the verified Kasr article ART-108-PHA-PHARMACODYNAMICS, per LANE-BRIEF SS22. crossLaneBoundary: this is the receptor-mechanism half of the myasthenia-gravis/nicotinic-receptor vignette this lane owns (see pending-live/AU-MED-102-biochem-molecular.md).
