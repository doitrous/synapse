<!--
  Lane W1-102-BIOC-B. Questions whose main_concept is HIT-PENDING (a Kasr Y1
  concept, sparse-updated in ./AU-MED-102-biochem-metabolism.md, not yet live)
  hold here rather than in question/AU-MED-102-biochem-metabolism-mcq.md, per
  the chief of staff's binding order (brief Sec21): a question on an unimported
  concept holds with it. Apply only after the same Kasr concept file AND its
  matching Kasr article file are both live (pending-live/INDEX.md).

  This first slice covers the twelve AFM Bioenergetics questions (Q1-Q12,
  src_01ab4268402d32d4d111, p54-55) against the six Kasr bioenergetics concepts
  already sparse-updated in ./AU-MED-102-biochem-metabolism.md. The remaining
  carbohydrate- and lipid-metabolism pending questions (all AFM items whose
  main_concept is one of the seventeen other Kasr ids in that same pending-live
  file) are OWED — see this lane's Sec8 report.

  library_ids point at the KASR article that teaches the tested concept
  (ART-103-BIO-BIOENERGETICS-AND-HIGH-ENERGY-BONDS or ART-103-BIO-RESPIRATORY-CHAIN,
  both in docs/Kasr-Source-Imports/article/103-BMS-mcq-carbohydrate.md), not an
  AU-MED-102 article — these six concepts have no Alexandria-authored article,
  only the sparse update.

  Proved with medical:simulate passing the Kasr concept AND article files as
  plain args FIRST (so they land as created before this file's rows are
  checked against them), then this file plain-arg last:
    npm run medical:simulate -- \
      docs/Kasr-Source-Imports/concept/103-BMS-mcq-carbohydrate-concepts.md \
      docs/Kasr-Source-Imports/article/103-BMS-mcq-carbohydrate.md \
      docs/Alexandria-Source-Imports/pending-live/AU-MED-102-biochem-metabolism-questions.md \
      --emit /tmp/sim-AU-MED-102-biochem-metabolism-pending-questions.json
  medical:batch on this file alone needs both --with:
    npm run medical:batch -- docs/Alexandria-Source-Imports/pending-live/AU-MED-102-biochem-metabolism-questions.md \
      --with docs/Kasr-Source-Imports/concept/103-BMS-mcq-carbohydrate-concepts.md \
      --with docs/Kasr-Source-Imports/article/103-BMS-mcq-carbohydrate.md
-->

# Item

## id
QST-FND-BIOENERG-HIGH-LOW-ENERGY-BONDS-001

## title
All of the following contain a high energy bond EXCEPT

## question
All of the following contain high energy bond EXCEPT:

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## format
single best answer

## derived_from
AFM Biochemistry Questions, Bioenergetics Q1 (src_01ab4268402d32d4d111, p54).

## correct_answer
B

## answer_a
ATP

## explanation_a
Incorrect as an EXCEPT answer — ATP's terminal phosphoanhydride bonds are the archetypal high-energy bonds, releasing well above 7.3 kcal/mol on hydrolysis.

## answer_b
Glucose-6-phosphate

## explanation_b
Correct — this is the exception. Glucose 6-phosphate is a low-energy phosphate ester; its hydrolysis releases substantially less free energy than the 7.3 kcal/mol-or-more threshold that defines a high-energy bond, which is why it does not belong on a list with ATP, acetyl-CoA and phosphoenolpyruvate.

## answer_c
Acetyl-CoA

## explanation_c
Incorrect as an EXCEPT answer — the thioester bond in acetyl-CoA is high-energy, which is exactly why it can transfer its acetyl group to citrate synthase or drive fatty-acid synthesis.

## answer_d
Phosphoenolpyruvate

## explanation_d
Incorrect as an EXCEPT answer — phosphoenolpyruvate's enol-phosphate bond is one of the highest-energy bonds in the body, which is what makes the pyruvate kinase reaction so strongly favourable.

## topic
Biomolecules

## subtopic
Bioenergetics

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
1

## inferred_difficulty
55

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
AU_Y1=0.4

## years
AU_Y1

## universities
au

## module
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Bioenergetics > High- and low-energy phosphate bonds

## question_only_for

## main_concept
CON-FND-7228237A5897B5

## concept_ids

## contextual_concept_ids

## library_ids
ART-103-BIO-BIOENERGETICS-AND-HIGH-ENERGY-BONDS

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
Identify glucose 6-phosphate as a low-energy phosphate ester among three genuinely high-energy compounds.

## source_citation
AFM Biochemistry Questions (Alexandria University Medical Biochemistry Department), Bioenergetics Q1.

## author_notes

## estimated_seconds
45

## randomise_answers
yes

## media_recommendations

## attached_image

## attachments

---

# Item

## id
QST-FND-BIOENERG-COENZYME-Q-001

## title
Coenzyme Q catalyses electron transport between

## question
Co-enzyme Q catalizes electron transport between:

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## format
single best answer

## derived_from
AFM Biochemistry Questions, Bioenergetics Q2 (src_01ab4268402d32d4d111, p54).

## correct_answer
C

## answer_a
FADH2 and cytochrome b

## explanation_a
Incorrect. FADH2-linked electrons (from Complex II or other flavoproteins) are delivered to coenzyme Q, which then passes them onward to Complex III's cytochromes — but the option reverses the direction of the specific hand-off this question tests, which is coenzyme Q accepting electrons from the NADH side, not from FADH2 directly to cytochrome b.

## answer_b
It is the last member in the electron transport chain

## explanation_b
Incorrect. Coenzyme Q is a mobile carrier positioned after Complex I and Complex II and before Complex III; cytochrome oxidase (Complex IV) is the chain's last member, not coenzyme Q.

## answer_c
NADH and ubiquinone

## explanation_c
Correct. Complex I (NADH dehydrogenase) passes electrons from NADH to coenzyme Q (ubiquinone), reducing it to ubiquinol; ubiquinol then diffuses within the inner mitochondrial membrane to deliver those electrons to Complex III. This NADH-to-ubiquinone hand-off is coenzyme Q's defining role as the chain's first mobile carrier.

## answer_d
Cytochrome Q and cytochrome C

## explanation_d
Incorrect. There is no "cytochrome Q" — coenzyme Q (ubiquinone) is a quinone, not a cytochrome, and this option confuses the two different classes of electron carrier.

## topic
Biomolecules

## subtopic
Bioenergetics

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
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
AU_Y1=0.4

## years
AU_Y1

## universities
au

## module
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Bioenergetics > Electron transport chain

## question_only_for

## main_concept
CON-FND-A3BC299ED2C7C9

## concept_ids

## contextual_concept_ids

## library_ids
ART-103-BIO-RESPIRATORY-CHAIN

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
Place coenzyme Q correctly as the carrier that accepts electrons from Complex I (NADH) and passes them to Complex III, not as the chain's terminal member.

## source_citation
AFM Biochemistry Questions (Alexandria University Medical Biochemistry Department), Bioenergetics Q2.

## author_notes

## estimated_seconds
60

## randomise_answers
yes

## media_recommendations

## attached_image

## attachments

---

# Item

## id
QST-FND-BIOENERG-ATP-SYNTHASE-001

## title
All are true as regards ATP synthase EXCEPT

## question
All are true as regards ATP synthase EXCEPT:

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## format
single best answer

## derived_from
AFM Biochemistry Questions, Bioenergetics Q4 (src_01ab4268402d32d4d111, p54).

## correct_answer
D

## answer_a
It has two subunits F1 and F0

## explanation_a
Incorrect as an EXCEPT answer — this is true. ATP synthase is built of a membrane-embedded F0 subunit and a matrix-projecting F1 subunit.

## answer_b
F1 subunit has catalytic activity

## explanation_b
Incorrect as an EXCEPT answer — this is true. ATP is synthesised on F1, whose rotating subunits catalyse the condensation of ADP and inorganic phosphate.

## answer_c
F0 subunit serves as a proton channel

## explanation_c
Incorrect as an EXCEPT answer — this is true. F0 spans the inner mitochondrial membrane and is the channel protons flow through, down their electrochemical gradient.

## answer_d
Proton flow is from F1 to F0

## explanation_d
Correct — this is the false statement. Protons flow from the intermembrane space, where the electron-transport-chain complexes pumped them, through F0 and into the matrix — that is, from F0's outer face to its inner face, driving F1's rotation from the F0 side, not "from F1 to F0." Getting the direction backwards is the specific error this question is built to catch.

## topic
Biomolecules

## subtopic
Bioenergetics

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
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.85

## exam_weight_by_year
AU_Y1=0.45

## years
AU_Y1

## universities
au

## module
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Bioenergetics > Chemiosmosis and ATP synthase

## question_only_for

## main_concept
CON-FND-0CA8047810DF78

## concept_ids

## contextual_concept_ids

## library_ids
ART-103-BIO-RESPIRATORY-CHAIN

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
State the direction of proton flow through ATP synthase correctly: into the matrix, from F0 toward F1.

## source_citation
AFM Biochemistry Questions (Alexandria University Medical Biochemistry Department), Bioenergetics Q4.

## author_notes

## estimated_seconds
60

## randomise_answers
yes

## media_recommendations

## attached_image

## attachments

---

# Item

## id
QST-FND-BIOENERG-CREATINE-PHOSPHATE-001

## title
Energy is stored in the muscles as

## question
Energy is stored in the muscles as:

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## format
single best answer

## derived_from
AFM Biochemistry Questions, Bioenergetics Q5 (src_01ab4268402d32d4d111, p54).

## correct_answer
B

## answer_a
ATP

## explanation_a
Incorrect. ATP turns over far too quickly — seconds at rest — to serve as the muscle's energy store; it is the currency spent and regenerated continuously, not the reserve held for future use.

## answer_b
Creatine phosphate

## explanation_b
Correct. Creatine phosphate is the muscle's phosphagen store, a high-energy compound that regenerates ATP almost instantly via creatine kinase at the very start of contraction, buying time for glycolysis and oxidative phosphorylation to ramp up. This is why creatine phosphate, not ATP itself, is described as where muscle stores its readily mobilisable energy.

## answer_c
S-adenosyl-methionine

## explanation_c
Incorrect. S-adenosylmethionine is the body's principal methyl-group donor for transmethylation reactions; it has no role as a muscle energy reserve.

## answer_d
Active acetate

## explanation_d
Incorrect. "Active acetate" (acetyl-CoA) is a central metabolic intermediate for oxidation and biosynthesis, not a stored energy reserve analogous to creatine phosphate.

## topic
Biomolecules

## subtopic
Bioenergetics

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
1

## inferred_difficulty
70

## exam_relevance
5

## clinical_relevance
0.3

## academic_relevance
0.75

## exam_weight_by_year
AU_Y1=0.4

## years
AU_Y1

## universities
au

## module
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Bioenergetics > ATP-ADP cycle and energy storage

## question_only_for

## main_concept
CON-FND-6B7241CD9F3C42

## concept_ids

## contextual_concept_ids

## library_ids
ART-103-BIO-BIOENERGETICS-AND-HIGH-ENERGY-BONDS

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
Name creatine phosphate as the muscle's mobilisable energy store, distinct from ATP itself.

## source_citation
AFM Biochemistry Questions (Alexandria University Medical Biochemistry Department), Bioenergetics Q5.

## author_notes

## estimated_seconds
40

## randomise_answers
yes

## media_recommendations

## attached_image

## attachments

---

# Item

## id
QST-FND-BIOENERG-LOW-ENERGY-BONDS-001

## title
The following are examples of low energy bonds EXCEPT

## question
The following are examples of low energy bonds, EXCEPT:

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## format
single best answer

## derived_from
AFM Biochemistry Questions, Bioenergetics Q6 (src_01ab4268402d32d4d111, p54).

## correct_answer
B

## answer_a
Phosphate ester bond

## explanation_a
Incorrect as an EXCEPT answer — a phosphate ester bond, as in glucose 6-phosphate, is low-energy, releasing well under the high-energy threshold on hydrolysis.

## answer_b
Enol phosphate bond

## explanation_b
Correct — this is the exception. The enol phosphate bond in phosphoenolpyruvate is high-energy, one of the highest in the body, precisely the opposite of the other three options — pairing it with glycosidic and peptide bonds on a "low energy" list is the error this question is built to catch.

## answer_c
Glycosidic bond

## explanation_c
Incorrect as an EXCEPT answer — the glycosidic bond linking sugar residues (as in glycogen or sucrose) is a low-energy bond.

## answer_d
Peptide bond

## explanation_d
Incorrect as an EXCEPT answer — the peptide bond linking amino acids is also a low-energy bond, notwithstanding its central role in protein structure.

## topic
Biomolecules

## subtopic
Bioenergetics

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
1

## inferred_difficulty
55

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
AU_Y1=0.4

## years
AU_Y1

## universities
au

## module
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Bioenergetics > High- and low-energy phosphate bonds

## question_only_for

## main_concept
CON-FND-7228237A5897B5

## concept_ids

## contextual_concept_ids

## library_ids
ART-103-BIO-BIOENERGETICS-AND-HIGH-ENERGY-BONDS

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
Identify the enol phosphate bond as high-energy among three genuinely low-energy bond types.

## source_citation
AFM Biochemistry Questions (Alexandria University Medical Biochemistry Department), Bioenergetics Q6.

## author_notes

## estimated_seconds
45

## randomise_answers
yes

## media_recommendations

## attached_image

## attachments

---

# Item

## id
QST-FND-BIOENERG-ETC-LOCATION-001

## title
As regards the electron transport chain

## question
As regards ETC:

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## format
single best answer

## derived_from
AFM Biochemistry Questions, Bioenergetics Q7 (src_01ab4268402d32d4d111, p54).

## correct_answer
B

## answer_a
It is present in the outer mitochondrial membrane

## explanation_a
Incorrect. The electron transport chain's complexes are embedded in the inner mitochondrial membrane, whose large surface area (increased by cristae) accommodates them; the outer membrane is freely permeable and carries no chain complexes.

## answer_b
It is present in the inner mitochondrial membrane

## explanation_b
Correct. All four respiratory complexes, together with the mobile carriers coenzyme Q and cytochrome c, are embedded in or associated with the inner mitochondrial membrane, which is also where the proton gradient that drives ATP synthase is built.

## answer_c
It contains 5 complexes, CoQ and cytochrome C

## explanation_c
Incorrect. The chain has four complexes (I-IV), not five, alongside its two mobile carriers, coenzyme Q and cytochrome c.

## answer_d
It contains 3 complexes, CoQ and cytochrome C

## explanation_d
Incorrect. This undercounts the complexes by one; the chain has four (I, II, III and IV), even though only I, III and IV pump protons — Complex II's absence from the proton-pumping set does not make it any less one of the chain's four complexes.

## topic
Biomolecules

## subtopic
Bioenergetics

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
1

## inferred_difficulty
55

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
AU_Y1=0.4

## years
AU_Y1

## universities
au

## module
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Bioenergetics > Electron transport chain

## question_only_for

## main_concept
CON-FND-A3BC299ED2C7C9

## concept_ids

## contextual_concept_ids

## library_ids
ART-103-BIO-RESPIRATORY-CHAIN

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
State that the electron transport chain sits in the inner mitochondrial membrane and correctly count its four complexes.

## source_citation
AFM Biochemistry Questions (Alexandria University Medical Biochemistry Department), Bioenergetics Q7.

## author_notes

## estimated_seconds
50

## randomise_answers
yes

## media_recommendations

## attached_image

## attachments

---

# Item

## id
QST-FND-BIOENERG-COMPLEX-II-001

## title
As regards complex II of the ETC, all are correct EXCEPT

## question
As regards complex II of the ETC, all are correct, EXCEPT:

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## format
single best answer

## derived_from
AFM Biochemistry Questions, Bioenergetics Q8 (src_01ab4268402d32d4d111, p55).

## correct_answer
D

## answer_a
It contains FAD

## explanation_a
Incorrect as an EXCEPT answer — this is true. Complex II (succinate dehydrogenase) carries FAD as its prosthetic group, which accepts electrons from succinate.

## answer_b
It contains succinate dehydrogenase enzyme

## explanation_b
Incorrect as an EXCEPT answer — this is true; Complex II *is* succinate dehydrogenase, the only citric acid cycle enzyme embedded in the inner mitochondrial membrane.

## answer_c
It catalyzes transfer of hydrogen from succinate to CoQ

## explanation_c
Incorrect as an EXCEPT answer — this is true and is exactly Complex II's job: oxidising succinate to fumarate while passing the electrons, via FAD, to coenzyme Q.

## answer_d
It is a site for energy release

## explanation_d
Correct — this is the false statement. Unlike Complexes I, III and IV, Complex II does not pump protons across the membrane, so it contributes no direct energy-releasing, proton-pumping step to the chain — it simply feeds electrons into coenzyme Q at a lower energy point than Complex I does, which is also why FADH2-linked electrons yield less ATP than NADH-linked ones.

## topic
Biomolecules

## subtopic
Bioenergetics

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
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.85

## exam_weight_by_year
AU_Y1=0.45

## years
AU_Y1

## universities
au

## module
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Bioenergetics > Chemiosmosis and ATP synthase

## question_only_for

## main_concept
CON-FND-0CA8047810DF78

## concept_ids

## contextual_concept_ids

## library_ids
ART-103-BIO-RESPIRATORY-CHAIN

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
State that Complex II, unlike Complexes I, III and IV, is not a proton-pumping, energy-releasing site.

## source_citation
AFM Biochemistry Questions (Alexandria University Medical Biochemistry Department), Bioenergetics Q8.

## author_notes

## estimated_seconds
60

## randomise_answers
yes

## media_recommendations

## attached_image

## attachments

---

# Item

## id
QST-FND-BIOENERG-COUPLING-SITES-001

## title
Coupling sites in the ETC are associated with

## question
Coupling sites in ETC are associated with:

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## format
single best answer

## derived_from
AFM Biochemistry Questions, Bioenergetics Q9 (src_01ab4268402d32d4d111, p55).

## correct_answer
D

## answer_a
Complex I, II, III

## explanation_a
Incorrect. This wrongly includes Complex II, which does not pump protons, and wrongly omits Complex IV, which does.

## answer_b
Complex II, III, IV

## explanation_b
Incorrect. This wrongly includes Complex II and wrongly omits Complex I, one of the three genuine proton-pumping, coupling sites.

## answer_c
Complex I, II, IV

## explanation_c
Incorrect. Complex II is again wrongly included; it is not a coupling site.

## answer_d
Complex I, III, IV

## explanation_d
Correct. Complexes I, III and IV are the chain's three proton-pumping, coupling sites, each moving protons from the matrix to the intermembrane space as electrons pass through; Complex II, lacking this proton-pumping function, is the one complex left out of every correct list of coupling sites.

## topic
Biomolecules

## subtopic
Bioenergetics

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
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.85

## exam_weight_by_year
AU_Y1=0.45

## years
AU_Y1

## universities
au

## module
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Bioenergetics > Chemiosmosis and ATP synthase

## question_only_for

## main_concept
CON-FND-0CA8047810DF78

## concept_ids

## contextual_concept_ids

## library_ids
ART-103-BIO-RESPIRATORY-CHAIN

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
Name Complexes I, III and IV as the three coupling (proton-pumping) sites, excluding Complex II.

## source_citation
AFM Biochemistry Questions (Alexandria University Medical Biochemistry Department), Bioenergetics Q9.

## author_notes

## estimated_seconds
55

## randomise_answers
yes

## media_recommendations

## attached_image

## attachments

---

# Item

## id
QST-FND-BIOENERG-UNCOUPLER-001

## title
An uncoupler of oxidative phosphorylation

## question
One of the following is an uncoupler of oxidative phosphorylation:

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## format
single best answer

## derived_from
AFM Biochemistry Questions, Bioenergetics Q10 (src_01ab4268402d32d4d111, p55).

## correct_answer
A

## answer_a
2,4-Dinitrophenol

## explanation_a
Correct. 2,4-Dinitrophenol is the classic chemical uncoupler: it carries protons across the inner mitochondrial membrane independently of ATP synthase, collapsing the gradient and letting the electron transport chain run freely while ATP synthesis stops and the dissipated energy is released as heat.

## answer_b
Barbiturates

## explanation_b
Incorrect. Barbiturates inhibit Complex I of the electron transport chain; blocking electron flow is a different action from uncoupling it, which by contrast lets electron flow continue unchecked.

## answer_c
Cyanide

## explanation_c
Incorrect. Cyanide inhibits Complex IV (cytochrome oxidase), stopping electron flow entirely, rather than uncoupling electron flow from ATP synthesis.

## answer_d
Carboxin

## explanation_d
Incorrect. Carboxin inhibits Complex II (succinate dehydrogenase); like the other two distractors, this is an inhibitor of electron flow, not an uncoupler.

## topic
Biomolecules

## subtopic
Bioenergetics

## difficulty
Moderate

## question_type
Pharmacology

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.4

## academic_relevance
0.8

## exam_weight_by_year
AU_Y1=0.4

## years
AU_Y1

## universities
au

## module
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Bioenergetics > Uncouplers of oxidative phosphorylation

## question_only_for

## main_concept
CON-FND-C3CB859E560A18

## concept_ids

## contextual_concept_ids

## library_ids
ART-103-BIO-RESPIRATORY-CHAIN

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
Distinguish an uncoupler (2,4-dinitrophenol) from three respiratory-chain inhibitors that act by a different mechanism.

## source_citation
AFM Biochemistry Questions (Alexandria University Medical Biochemistry Department), Bioenergetics Q10.

## author_notes

## estimated_seconds
55

## randomise_answers
yes

## media_recommendations

## attached_image

## attachments

---

# Item

## id
QST-FND-BIOENERG-FINAL-ACCEPTOR-001

## title
The final acceptor in the electron transport chain

## question
What is the final acceptor in the electron transport chain?

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## format
single best answer

## derived_from
AFM Biochemistry Questions, Bioenergetics Q11 (src_01ab4268402d32d4d111, p55).

## correct_answer
D

## answer_a
NADH

## explanation_a
Incorrect. NADH is an electron donor at the start of the chain (Complex I), not the acceptor at its end.

## answer_b
FADH2

## explanation_b
Incorrect. FADH2 donates electrons to the chain via Complex II or other flavoproteins; like NADH, it is an upstream donor, not the terminal acceptor.

## answer_c
NAD+

## explanation_c
Incorrect. NAD+ is what NADH becomes after donating its electrons — the oxidised form of an upstream carrier, not the molecule that finally accepts the chain's electrons.

## answer_d
O2

## explanation_d
Correct. Molecular oxygen has the highest redox potential of any carrier in the chain, which is why it sits at the very end: Complex IV (cytochrome oxidase) transfers electrons to O2, reducing it to water. This is the reaction cyanide blocks, and it is the entire reason the chain needs a continuous oxygen supply to keep running.

## topic
Biomolecules

## subtopic
Bioenergetics

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
65

## exam_relevance
5

## clinical_relevance
0.3

## academic_relevance
0.8

## exam_weight_by_year
AU_Y1=0.4

## years
AU_Y1

## universities
au

## module
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Bioenergetics > Electron transport chain

## question_only_for

## main_concept
CON-FND-8771AB893CA4C3

## concept_ids

## contextual_concept_ids

## library_ids
ART-103-BIO-RESPIRATORY-CHAIN

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
Name oxygen as the electron transport chain's final electron acceptor, distinguishing it from the upstream donors NADH and FADH2.

## source_citation
AFM Biochemistry Questions (Alexandria University Medical Biochemistry Department), Bioenergetics Q11.

## author_notes

## estimated_seconds
40

## randomise_answers
yes

## media_recommendations

## attached_image

## attachments
