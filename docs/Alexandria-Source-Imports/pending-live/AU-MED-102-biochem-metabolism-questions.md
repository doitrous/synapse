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
Correct — this is the exception. The enol phosphate bond in phosphoenolpyruvate is high-energy, one of the highest in the body, precisely the opposite of the other three options — pairing it with glycosidic and peptide bonds on a "low energy" list is the error this question is built to catch. This is the same high-energy-bond fact tested from the opposite direction elsewhere in this bank.

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
Correct. All four respiratory complexes, together with the mobile carriers coenzyme Q and cytochrome c, are embedded in or associated with the inner mitochondrial membrane, which is also where the proton gradient that drives ATP synthase is built. The membrane's large surface area, folded into cristae, is what lets it hold all four complexes at high density.

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
Correct — this is the false statement. Unlike Complexes I, III and IV, Complex II does not pump protons across the membrane, so it contributes no direct energy-releasing, proton-pumping step to the chain — it simply feeds electrons into coenzyme Q at a lower energy point than Complex I does, which is also why FADH2-linked electrons yield less ATP than NADH-linked ones. This is the same fact tested from the "reverse" direction as the question above on complex II.

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
Correct. Complexes I, III and IV are the chain's three proton-pumping, coupling sites, each moving protons from the matrix to the intermembrane space as electrons pass through; Complex II, lacking this proton-pumping function, is the one complex left out of every correct list of coupling sites. Recognising this list is what lets a student predict the ATP yield difference between NADH- and FADH2-linked electron entry.

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
Correct. 2,4-Dinitrophenol is the classic chemical uncoupler: it carries protons across the inner mitochondrial membrane independently of ATP synthase, collapsing the gradient and letting the electron transport chain run freely while ATP synthesis stops and the dissipated energy is released as heat. This is the mechanism historically exploited, and later abandoned as dangerously toxic, when the compound was tried as a weight-loss drug.

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

---

# Item

## id
QST-FND-CHO-GLUCOKINASE-001

## title
Glucokinase is more active after a meal because

## question
Glucokinase is more active after a meal, because:

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
AFM Biochemistry Questions, Carbohydrate Metabolism Q3 (src_01ab4268402d32d4d111, p25).

## correct_answer
A

## answer_a
It is an inducible enzyme

## explanation_a
Correct. Glucokinase's gene expression is induced by insulin, which rises after a meal, so more enzyme is made and glucose phosphorylation in the liver and beta-cells increases exactly when dietary glucose is arriving. This inducibility, not a change in substrate affinity, is what the question is testing.

## answer_b
It has more affinity to glucose than hexokinase

## explanation_b
Incorrect. Glucokinase has a much *higher* Km (lower affinity) for glucose than hexokinase; this is what lets it respond to the high glucose concentrations only seen after a meal, rather than being saturated at all times like hexokinase.

## answer_c
It is present in all tissues

## explanation_c
Incorrect. Glucokinase is restricted to the liver and pancreatic beta-cells; hexokinase, not glucokinase, is the isoform present in essentially all other tissues.

## answer_d
Can act on all monosaccharides

## explanation_d
Incorrect. Glucokinase is specific for glucose, unlike hexokinase, which can phosphorylate several hexoses; broad substrate range is not why glucokinase activity rises after a meal.

## topic
Carbohydrate metabolism

## subtopic
Glycolysis

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
AU-MED-102 > Biochemistry > Carbohydrate Metabolism > Glycolysis

## question_only_for

## main_concept
CON-FND-EA1BA37ACB643B

## concept_ids

## contextual_concept_ids

## library_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
Explain glucokinase's post-prandial rise in activity as insulin-induced expression, not increased substrate affinity.

## source_citation
AFM Biochemistry Questions (Alexandria University Medical Biochemistry Department), Carbohydrate Metabolism Q3.

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
QST-FND-CHO-PFK1-001

## title
Which enzyme catalyses an irreversible glycolytic reaction

## question
Which enzyme catalyses an irreversible reaction?

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
AFM Biochemistry Questions, Carbohydrate Metabolism Q4 (src_01ab4268402d32d4d111, p25).

## correct_answer
B

## answer_a
Transketolase

## explanation_a
Incorrect. Transketolase is a hexose monophosphate pathway enzyme catalysing a freely reversible two-carbon transfer, not one of glycolysis's three irreversible steps.

## answer_b
Phosphofructokinase

## explanation_b
Correct. Phosphofructokinase-1 catalyses the committed, rate-limiting, irreversible step of glycolysis — fructose 6-phosphate to fructose 1,6-bisphosphate — and is the pathway's principal site of allosteric regulation (activated by AMP, inhibited by ATP and citrate). No other glycolytic enzyme combines irreversibility with this degree of allosteric control.

## answer_c
Aldolase

## explanation_c
Incorrect. Aldolase splits fructose 1,6-bisphosphate reversibly and is shared, unchanged in direction, between glycolysis and gluconeogenesis.

## answer_d
Glyceraldehyde-3-phosphate dehydrogenase

## explanation_d
Incorrect. This oxidoreductase reaction is reversible under physiological conditions and runs in both glycolysis and gluconeogenesis.

## topic
Carbohydrate metabolism

## subtopic
Glycolysis

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
AU-MED-102 > Biochemistry > Carbohydrate Metabolism > Glycolysis

## question_only_for

## main_concept
CON-FND-853096A349FFBD

## concept_ids

## contextual_concept_ids

## library_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
Name PFK-1 as glycolysis's committed, irreversible, allosterically regulated step.

## source_citation
AFM Biochemistry Questions (Alexandria University Medical Biochemistry Department), Carbohydrate Metabolism Q4.

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
QST-FND-CHO-SUBSTRATE-LEVEL-PHOS-001

## title
An example of substrate level phosphorylation

## question
An example of substrate level phosphorylation is:

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
AFM Biochemistry Questions, Carbohydrate Metabolism Q5 (src_01ab4268402d32d4d111, p25).

## correct_answer
C

## answer_a
Isocitrate dehydrogenase

## explanation_a
Incorrect. Isocitrate dehydrogenase produces NADH, an oxidative-phosphorylation-linked product, not ATP/GTP made directly at the enzyme's own active site.

## answer_b
Enolase

## explanation_b
Incorrect. Enolase forms phosphoenolpyruvate, a high-energy compound, but it does not itself transfer a phosphate to ADP; that transfer happens one step later, at pyruvate kinase.

## answer_c
Pyruvate kinase

## explanation_c
Correct. Pyruvate kinase transfers the phosphate from phosphoenolpyruvate directly to ADP, generating ATP without involvement of the electron transport chain — the defining feature of substrate-level phosphorylation. Glycolysis has two such steps (phosphoglycerate kinase and pyruvate kinase) and the citric acid cycle has one (succinate thiokinase).

## answer_d
Glyceraldehyde-3-phosphate dehydrogenase

## explanation_d
Incorrect. This step produces NADH and 1,3-bisphosphoglycerate; the ATP-generating substrate-level step it feeds into is the next reaction, catalysed by phosphoglycerate kinase, not this one.

## topic
Carbohydrate metabolism

## subtopic
Substrate-level phosphorylation

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
AU_Y1=0.4

## years
AU_Y1

## universities
au

## module
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Carbohydrate Metabolism > Substrate-level phosphorylation

## question_only_for

## main_concept
CON-FND-5253967A0E3786

## concept_ids

## contextual_concept_ids

## library_ids
ART-103-BIO-BIOENERGETICS-AND-HIGH-ENERGY-BONDS

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
Identify pyruvate kinase as a substrate-level phosphorylation step, distinguishing it from oxidative-phosphorylation-linked and upstream reactions.

## source_citation
AFM Biochemistry Questions (Alexandria University Medical Biochemistry Department), Carbohydrate Metabolism Q5.

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
QST-FND-CHO-FLUORIDE-ENOLASE-001

## title
Which glycolytic enzyme is inhibited by fluoride ions

## question
Which enzyme in glycolytic pathway is inhibited by fluoride ions?

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
AFM Biochemistry Questions, Carbohydrate Metabolism Q7 (src_01ab4268402d32d4d111, p25-26).

## correct_answer
D

## answer_a
Hexokinase

## explanation_a
Incorrect. Hexokinase is not fluoride-sensitive; it is inhibited by its own product, glucose 6-phosphate, not by fluoride ions.

## answer_b
Phosphofructokinase

## explanation_b
Incorrect. PFK-1 is regulated allosterically by ATP, AMP and citrate, not inhibited by fluoride.

## answer_c
Aldolase

## explanation_c
Incorrect. Aldolase is not a fluoride target; it has no metal cofactor for fluoride to chelate.

## answer_d
Enolase

## explanation_d
Correct. Fluoride ions chelate the Mg2+ that enolase requires to convert 2-phosphoglycerate to phosphoenolpyruvate, inhibiting the enzyme. This is the basis of using sodium fluoride as a glycolysis-blocking preservative in blood glucose collection tubes, which keeps a sample's glucose reading from falling artefactually before it is measured.

## topic
Carbohydrate metabolism

## subtopic
Glycolysis

## difficulty
Moderate

## question_type
Pharmacology

## cognitive_effort
Medium

## cognitive_effort_score
0.45

## setting
Both

## reasoning_level
1

## inferred_difficulty
55

## exam_relevance
5

## clinical_relevance
0.5

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
AU-MED-102 > Biochemistry > Carbohydrate Metabolism > Glycolysis inhibitors

## question_only_for

## main_concept
CON-FND-0D6BFD870813B7

## concept_ids

## contextual_concept_ids

## library_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
Name enolase as fluoride's target in glycolysis, via magnesium chelation.

## source_citation
AFM Biochemistry Questions (Alexandria University Medical Biochemistry Department), Carbohydrate Metabolism Q7.

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
QST-FND-CHO-ANAEROBIC-NAD-REGEN-001

## title
NAD+ regeneration during anaerobic glycolysis

## question
During anaerobic glycolysis NAD+ is regenerated from NADH by:

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
AFM Biochemistry Questions, Carbohydrate Metabolism Q8 (src_01ab4268402d32d4d111, p26).

## correct_answer
D

## answer_a
Glyceraldehyde-3-phosphate dehydrogenase

## explanation_a
Incorrect. This enzyme is what *produces* the NADH that needs regenerating, not the enzyme that reoxidises it back to NAD+.

## answer_b
Oxygen

## explanation_b
Incorrect. Oxygen is the electron transport chain's terminal acceptor for aerobic NADH reoxidation; anaerobic glycolysis specifically cannot use this route, which is exactly why a separate mechanism is needed.

## answer_c
Glutamate dehydrogenase

## explanation_c
Incorrect. Glutamate dehydrogenase interconverts glutamate and alpha-ketoglutarate in amino acid metabolism; it has no role regenerating glycolytic NAD+.

## answer_d
Lactate dehydrogenase

## explanation_d
Correct. Lactate dehydrogenase reduces pyruvate to lactate, oxidising NADH back to NAD+ in the same step. This regeneration is glycolysis's real purpose under anaerobic conditions — without it, glyceraldehyde-3-phosphate dehydrogenase would run out of NAD+ and glycolysis would stall.

## topic
Carbohydrate metabolism

## subtopic
Glycolysis

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
55

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
AU-MED-102 > Biochemistry > Carbohydrate Metabolism > Glycolysis

## question_only_for

## main_concept
CON-FND-403D06D1FB129F

## concept_ids

## contextual_concept_ids

## library_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
State that lactate dehydrogenase regenerates NAD+ for glycolysis under anaerobic conditions, not for the sake of making lactate itself.

## source_citation
AFM Biochemistry Questions (Alexandria University Medical Biochemistry Department), Carbohydrate Metabolism Q8.

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
QST-FND-CHO-EPINEPHRINE-PHOSPHORYLASE-001

## title
The hormone activating glycogen phosphorylase

## question
The hormone activating the enzyme glycogen phosphorylase is:

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
AFM Biochemistry Questions, Carbohydrate Metabolism Q22 (src_01ab4268402d32d4d111, p28).

## correct_answer
A

## answer_a
Epinephrine

## explanation_a
Correct. Epinephrine (and glucagon in the liver) binds a membrane receptor, raises cAMP, and activates protein kinase A, which phosphorylates and activates glycogen phosphorylase kinase, which in turn phosphorylates and activates glycogen phosphorylase itself. Each step amplifies the signal, so a small hormonal stimulus produces a large, rapid release of glucose 1-phosphate from glycogen.

## answer_b
Insulin

## explanation_b
Incorrect. Insulin opposes this cascade, promoting glycogen synthesis (via glycogen synthase) rather than breakdown.

## answer_c
Growth hormone

## explanation_c
Incorrect. Growth hormone has broad anti-insulin metabolic effects but does not act through this specific cAMP-to-phosphorylase cascade to activate glycogen phosphorylase.

## answer_d
Glucocorticoids

## explanation_d
Incorrect. Glucocorticoids raise blood glucose mainly by promoting gluconeogenesis and protein catabolism, not by directly activating glycogen phosphorylase through this cascade.

## topic
Carbohydrate metabolism

## subtopic
Glycogen metabolism regulation

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
AU-MED-102 > Biochemistry > Carbohydrate Metabolism > Glycogen metabolism regulation

## question_only_for

## main_concept
CON-FND-CA74978B7B7ED1

## concept_ids

## contextual_concept_ids

## library_ids
ART-103-BIO-GLYCOGEN-METABOLISM

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
Name epinephrine (and glucagon) as the activators of glycogen phosphorylase via the cAMP cascade, distinguishing them from insulin's opposite effect.

## source_citation
AFM Biochemistry Questions (Alexandria University Medical Biochemistry Department), Carbohydrate Metabolism Q22.

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
QST-FND-CHO-COMPLETE-OXIDATION-ATP-001

## title
Complete oxidation of one molecule of glucose yields how many ATPs

## question
Complete oxidation of one molecule of glucose yields how many ATPs?

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
AFM Biochemistry Questions, Carbohydrate Metabolism Q13 (src_01ab4268402d32d4d111, p26; option text recovered by 200 dpi render, the OCR text layer having scrambled "38" to "129").

## correct_answer
C

## answer_a
12

## explanation_a
Incorrect. Twelve ATP is the classical yield per single turn of the citric acid cycle alone, not the total for complete oxidation of a whole glucose molecule through glycolysis, pyruvate oxidation and two turns of the cycle.

## answer_b
24

## explanation_b
Incorrect. This undercounts the total; it omits a substantial share of the oxidative-phosphorylation-linked ATP from the ten NADH and two FADH2 produced per glucose.

## answer_c
38

## explanation_c
Correct. This bank uses the classical P/O-ratio convention (NADH = 3 ATP, FADH2 = 2 ATP), under which complete oxidation of one glucose to CO2 and water yields 38 ATP: 2 net from glycolysis, 2 from the citric acid cycle (as GTP), and the rest from the electron transport chain oxidising 10 NADH and 2 FADH2. Modern texts, using more accurate P/O ratios (NADH is about 2.5 ATP, FADH2 about 1.5), give a total closer to 30-32 — a real difference in convention, not a computational error, and this question is keyed to the classical figure.

## answer_d
129

## explanation_d
Incorrect. This figure does not correspond to any standard accounting of glucose oxidation under either convention; it is not a plausible total by any teaching model.

## topic
Carbohydrate metabolism

## subtopic
Complete glucose oxidation

## difficulty
Hard

## question_type
Mechanism

## cognitive_effort
High

## cognitive_effort_score
0.7

## setting
Academic

## reasoning_level
3

## inferred_difficulty
35

## exam_relevance
6

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
AU-MED-102 > Biochemistry > Carbohydrate Metabolism > Complete glucose oxidation

## question_only_for

## main_concept
CON-FND-0F4A45886203EF

## concept_ids

## contextual_concept_ids

## library_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
State the classical 38-ATP yield of complete glucose oxidation this bank tests, while recognising that modern P/O ratios give a lower figure.

## source_citation
AFM Biochemistry Questions (Alexandria University Medical Biochemistry Department), Carbohydrate Metabolism Q13.

## author_notes
Convention clash recorded in coverage/AU-MED-102-biochemistry-triage.md Sec10, per the chief of staff's ruling: keep the printed key, name the convention in the explanation, no sparse update to the Kasr concept's own definition.

## estimated_seconds
75

## randomise_answers
yes

## media_recommendations

## attached_image

## attachments

---

# Item

## id
QST-FND-CHO-PDH-COENZYMES-001

## title
Coenzymes involved in the pyruvate dehydrogenase reaction

## question
All the following coenzymes are involved in the pyruvate dehydrogenase reaction EXCEPT:

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
AFM Biochemistry Questions, Carbohydrate Metabolism Q14 (src_01ab4268402d32d4d111, p26-27).

## correct_answer
B

## answer_a
Thiamine pyrophosphate (TPP)

## explanation_a
Incorrect as an EXCEPT answer — this is true. TPP decarboxylates pyruvate as the complex's first step, which is why thiamine deficiency impairs pyruvate dehydrogenase.

## answer_b
Biotin

## explanation_b
Correct — this is the exception. Biotin is the cofactor for pyruvate *carboxylase* (which makes oxaloacetate for gluconeogenesis), not for pyruvate dehydrogenase, which instead uses TPP, lipoate, CoA, FAD and NAD — five coenzymes, none of them biotin. Confusing the two pyruvate-handling enzymes is the exact trap this question sets.

## answer_c
NAD+

## explanation_c
Incorrect as an EXCEPT answer — this is true. NAD+ accepts the final hydride transfer from the complex's dihydrolipoyl dehydrogenase component.

## answer_d
FAD

## explanation_d
Incorrect as an EXCEPT answer — this is true. FAD reoxidises the reduced lipoate on the dihydrolipoyl dehydrogenase component before NAD+ accepts the electrons.

## topic
Carbohydrate metabolism

## subtopic
Pyruvate dehydrogenase

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.55

## setting
Academic

## reasoning_level
2

## inferred_difficulty
45

## exam_relevance
6

## clinical_relevance
0.3

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
AU-MED-102 > Biochemistry > Carbohydrate Metabolism > Pyruvate dehydrogenase

## question_only_for

## main_concept
CON-FND-229C78C9EB0E78

## concept_ids

## contextual_concept_ids

## library_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
Distinguish pyruvate dehydrogenase's five coenzymes from pyruvate carboxylase's biotin, a common point of confusion between the two enzymes.

## source_citation
AFM Biochemistry Questions (Alexandria University Medical Biochemistry Department), Carbohydrate Metabolism Q14.

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
QST-FND-CHO-GLUCONEOGENIC-ENZYMES-001

## title
Key gluconeogenic enzymes

## question
All the following are key gluconeogenic enzymes EXCEPT:

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
AFM Biochemistry Questions, Carbohydrate Metabolism Q19 (src_01ab4268402d32d4d111, p27).

## correct_answer
C

## answer_a
Pyruvate carboxylase

## explanation_a
Incorrect as an EXCEPT answer — this is a genuine key gluconeogenic enzyme, converting pyruvate to oxaloacetate as the pathway's first bypass step.

## answer_b
Phosphoenolpyruvate carboxykinase

## explanation_b
Incorrect as an EXCEPT answer — this is a genuine key gluconeogenic enzyme, converting oxaloacetate to phosphoenolpyruvate as the second bypass step.

## answer_c
Phosphofructokinase

## explanation_c
Correct — this is the exception. Phosphofructokinase-1 is glycolysis's committed enzyme, running in the opposite direction gluconeogenesis needs; gluconeogenesis bypasses this step using fructose 1,6-bisphosphatase instead, not PFK-1 itself. The other three options are all genuine members of the four-enzyme gluconeogenic bypass set.

## answer_d
Glucose-6-phosphatase

## explanation_d
Incorrect as an EXCEPT answer — this is a genuine key gluconeogenic enzyme, the final bypass step releasing free glucose from glucose 6-phosphate.

## topic
Carbohydrate metabolism

## subtopic
Gluconeogenesis

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
6

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
AU-MED-102 > Biochemistry > Carbohydrate Metabolism > Gluconeogenesis

## question_only_for

## main_concept
CON-FND-C2C88203E4A918

## concept_ids

## contextual_concept_ids

## library_ids
ART-103-BIO-GLUCONEOGENESIS-AND-CORI-CYCLE

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
Name the four true gluconeogenic bypass enzymes and identify PFK-1 as glycolytic, not gluconeogenic.

## source_citation
AFM Biochemistry Questions (Alexandria University Medical Biochemistry Department), Carbohydrate Metabolism Q19.

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
QST-FND-CHO-VON-GIERKE-001

## title
Von Gierke's disease deficient enzyme

## question
Von Gierke's disease is characterized by the deficiency of:

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
AFM Biochemistry Questions, Carbohydrate Metabolism Q23 (src_01ab4268402d32d4d111, p28).

## correct_answer
A

## answer_a
Glucose-6-phosphatase

## explanation_a
Correct. Von Gierke's disease is glycogen storage disease type I, deficiency of glucose 6-phosphatase in liver and kidney. Without it, glucose 6-phosphate cannot be dephosphorylated to free glucose during either glycogenolysis or gluconeogenesis, producing severe fasting hypoglycaemia alongside glycogen accumulation, lactic acidosis, hyperlipidaemia and hyperuricaemia — every feature traceable to the trapped glucose 6-phosphate being shunted down glycolysis and the HMP pathway instead.

## answer_b
Glyceraldehyde-3-phosphate dehydrogenase

## explanation_b
Incorrect. Deficiency of this glycolytic enzyme is not a recognised glycogen storage disease and would not produce Von Gierke's characteristic picture.

## answer_c
Phosphofructokinase

## explanation_c
Incorrect. PFK deficiency causes a different glycogen storage disease (type VII, Tarui disease), presenting with exercise intolerance, not the hepatic/fasting picture of Von Gierke's.

## answer_d
Phosphorylase

## explanation_d
Incorrect. Liver phosphorylase deficiency is a different, generally milder glycogen storage disease (type VI), not Von Gierke's.

## topic
Carbohydrate metabolism

## subtopic
Glycogen storage disease

## difficulty
Moderate

## question_type
Pathophysiology

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Both

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
6

## clinical_relevance
0.7

## academic_relevance
0.8

## exam_weight_by_year
AU_Y1=0.45

## years
AU_Y1

## universities
au

## module
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Carbohydrate Metabolism > Glycogen storage disease

## question_only_for

## main_concept
CON-FND-1BE461A57AB76D

## concept_ids

## contextual_concept_ids

## library_ids
ART-103-BIO-GLYCOGEN-METABOLISM

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
Name glucose 6-phosphatase deficiency as the cause of Von Gierke's disease, distinguishing it from other glycogen storage diseases sharing similar-sounding enzyme names.

## source_citation
AFM Biochemistry Questions (Alexandria University Medical Biochemistry Department), Carbohydrate Metabolism Q23.

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
QST-FND-CHO-FAVISM-001

## title
Favism is due to deficiency of

## question
Favism is due to deficiency of:

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
AFM Biochemistry Questions, Carbohydrate Metabolism Q43 (src_01ab4268402d32d4d111, p31).

## correct_answer
C

## answer_a
Glucose-6-phosphatase

## explanation_a
Incorrect. This enzyme's deficiency causes Von Gierke's disease, an unrelated fasting-hypoglycaemia disorder, not favism.

## answer_b
Pyruvate kinase

## explanation_b
Incorrect. Pyruvate kinase deficiency causes a different haemolytic anaemia, from impaired glycolytic ATP production, not from oxidant sensitivity.

## answer_c
G-6-P-dehydrogenase

## explanation_c
Correct. Favism is glucose-6-phosphate dehydrogenase deficiency: without the NADPH the hexose monophosphate pathway's first, rate-limiting step supplies, red cells cannot regenerate reduced glutathione fast enough to detoxify hydrogen peroxide. An oxidant challenge — classically fava beans, or drugs such as primaquine — then precipitates haemolysis, because the red cell's antioxidant defence, not its energy supply, has failed.

## answer_d
Aldolase B

## explanation_d
Incorrect. Aldolase B deficiency causes hereditary fructose intolerance, a fructose-metabolism disorder unrelated to oxidant-induced haemolysis.

## topic
Carbohydrate metabolism

## subtopic
Hexose Monophosphate Pathway

## difficulty
Moderate

## question_type
Pathophysiology

## cognitive_effort
Medium

## cognitive_effort_score
0.45

## setting
Both

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
6

## clinical_relevance
0.75

## academic_relevance
0.8

## exam_weight_by_year
AU_Y1=0.5

## years
AU_Y1

## universities
au

## module
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Carbohydrate Metabolism > Hexose Monophosphate Pathway

## question_only_for

## main_concept
CON-HEM-4F64967BBFBB6F

## concept_ids

## contextual_concept_ids

## library_ids
ART-103-BIO-HMP-PATHWAY-AND-G6PD

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
Name G6PD deficiency as the cause of favism, tracing the mechanism to NADPH-dependent glutathione regeneration.

## source_citation
AFM Biochemistry Questions (Alexandria University Medical Biochemistry Department), Carbohydrate Metabolism Q43.

## author_notes

## estimated_seconds
55

## randomise_answers
yes

## media_recommendations

## attached_image

## attachments
