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
Correct — this is the exception. Glucose 6-phosphate is a low-energy phosphate ester; its hydrolysis releases substantially less free energy than the 7.3 kcal/mol-or-more threshold that defines a high-energy bond. That is why it does not belong on a list with ATP, acetyl-CoA and phosphoenolpyruvate, all of which clear that threshold.

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
Correct — this is the false statement. Protons flow from the intermembrane space, where the electron-transport-chain complexes pumped them, through F0 and into the matrix, driving F1 to rotate and synthesise ATP. The flow direction is from F0 toward F1, not the reverse the option states. Getting the direction backwards is the specific error this question is built to catch.

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

---

# Item

## id
QST-FND-CHO-GLUCONEOGENESIS-SUBSTRATES-001

## title
Substrates for gluconeogenesis, all except

## question
All the following are substrates for gluconeogenesis EXCEPT:

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
AFM Biochemistry Questions, Carbohydrate Metabolism Q21 (src_01ab4268402d32d4d111, p27-28).

## correct_answer
A

## answer_a
Palmitic acid

## explanation_a
Correct — this is the exception. Palmitic acid, an even-chain fatty acid, is broken down entirely to acetyl-CoA, and acetyl-CoA cannot be converted net to glucose because the pyruvate dehydrogenase reaction that would make it is irreversible. Fatty acids can only contribute carbon to gluconeogenesis through their rare odd-chain propionyl-CoA residues, which palmitic acid, being even-chain, does not produce.

## answer_b
Lactic acid

## explanation_b
Incorrect as an EXCEPT answer — lactate is a genuine gluconeogenic substrate, converted to pyruvate by lactate dehydrogenase and entering the pathway there, as in the Cori cycle.

## answer_c
Alanine

## explanation_c
Incorrect as an EXCEPT answer — alanine is transaminated to pyruvate in the liver and is a major gluconeogenic amino acid, carrying muscle nitrogen to the liver in the glucose-alanine cycle.

## answer_d
Glycerol

## explanation_d
Incorrect as an EXCEPT answer — glycerol, released by lipolysis, is phosphorylated and oxidised to dihydroxyacetone phosphate, entering gluconeogenesis directly.

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
CON-FND-089E2C3E01031C

## concept_ids

## contextual_concept_ids

## library_ids
ART-103-BIO-GLUCONEOGENESIS-AND-CORI-CYCLE

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
Explain why fatty acids, unlike lactate, alanine and glycerol, cannot serve as net gluconeogenic substrates.

## source_citation
AFM Biochemistry Questions (Alexandria University Medical Biochemistry Department), Carbohydrate Metabolism Q21.

## author_notes

## estimated_seconds
65

## randomise_answers
yes

## media_recommendations

## attached_image

## attachments

---

# Item

## id
QST-FND-CHO-NAD-NADP-EXCEPT-001

## title
Which dehydrogenase is not NAD+ dependent

## question
All the dehydrogenases listed below are NAD+ dependent, EXCEPT:

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
AFM Biochemistry Questions, Carbohydrate Metabolism Q6 (src_01ab4268402d32d4d111, p25).

## correct_answer
B

## answer_a
Lactate dehydrogenase

## explanation_a
Incorrect as an EXCEPT answer — lactate dehydrogenase uses NAD+/NADH to interconvert pyruvate and lactate.

## answer_b
Glucose-6-phosphate dehydrogenase

## explanation_b
Correct — this is the exception. G6PD, the hexose monophosphate pathway's first and rate-limiting enzyme, is specific for NADP+, not NAD+. This distinction matters clinically: NADPH, not NADH, is what G6PD deficiency leaves red cells short of, which is why the deficiency causes oxidant-induced haemolysis rather than an energy-production defect.

## answer_c
Pyruvate dehydrogenase

## explanation_c
Incorrect as an EXCEPT answer — the pyruvate dehydrogenase complex uses NAD+ as one of its five coenzymes, alongside TPP, lipoate, CoA and FAD.

## answer_d
Glyceraldehyde-3-phosphate dehydrogenase

## explanation_d
Incorrect as an EXCEPT answer — this glycolytic enzyme reduces NAD+ to NADH while oxidising glyceraldehyde 3-phosphate.

## topic
Carbohydrate metabolism

## subtopic
Dehydrogenase coenzymes

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
0.5

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
AU-MED-102 > Biochemistry > Carbohydrate Metabolism > Dehydrogenase coenzymes

## question_only_for

## main_concept
CON-FND-534286EBBAC239

## concept_ids

## contextual_concept_ids

## library_ids
ART-102-BIO-CHEMISTRY-OF-FREE-NUCLEOTIDES

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
Identify G6PD as the NADP+-specific exception among a list of NAD+-dependent dehydrogenases, and connect this to its clinical consequence.

## source_citation
AFM Biochemistry Questions (Alexandria University Medical Biochemistry Department), Carbohydrate Metabolism Q6.

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
QST-FND-CHO-MUSCLE-NO-G6PASE-001

## title
Why muscle glycogen cannot raise blood glucose

## question
Muscle glycogen can not give rise to blood glucose because muscle lakes the enzyme:

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
AFM Biochemistry Questions, Carbohydrate Metabolism Q59 (src_01ab4268402d32d4d111, p33; the source's own stem prints "lakes" for "lacks").

## correct_answer
B

## answer_a
Phosphorylase

## explanation_a
Incorrect. Muscle has glycogen phosphorylase and uses it normally to release glucose 1-phosphate from its own glycogen for local use.

## answer_b
G-6 phosphatase

## explanation_b
Correct. Only the liver (and kidney) expresses glucose 6-phosphatase, the enzyme that dephosphorylates glucose 6-phosphate to free glucose that can leave the cell and enter the blood. Muscle glycogenolysis still produces glucose 6-phosphate, but without this enzyme that glucose 6-phosphate is trapped inside the myocyte and can only be used locally, by glycolysis, never exported as blood glucose.

## answer_c
Glucokinase

## explanation_c
Incorrect. Glucokinase phosphorylates glucose to glucose 6-phosphate in the liver and beta-cells; muscle does not rely on it, and its absence would not explain a failure to *release* glucose.

## answer_d
Debranching enzyme

## explanation_d
Incorrect. Debranching enzyme is needed to fully hydrolyse glycogen's branch points in any tissue, but its presence or absence does not determine whether the freed glucose can leave the cell as blood glucose.

## topic
Carbohydrate metabolism

## subtopic
Glycogen metabolism

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
0.4

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
AU-MED-102 > Biochemistry > Carbohydrate Metabolism > Glycogen metabolism

## question_only_for

## main_concept
CON-FND-3905E3B98C2EC4

## concept_ids

## contextual_concept_ids

## library_ids
ART-103-BIO-GLYCOGEN-METABOLISM

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
Explain why muscle's lack of glucose 6-phosphatase confines its glycogenolysis to local use, unlike the liver's.

## source_citation
AFM Biochemistry Questions (Alexandria University Medical Biochemistry Department), Carbohydrate Metabolism Q59.

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
QST-FND-CHO-GLUCONEOGENESIS-INSULIN-001

## title
Gluconeogenesis is inhibited by

## question
Gluconeogenesis is inhibited by:

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
AFM Biochemistry Questions, Carbohydrate Metabolism Q18 (src_01ab4268402d32d4d111, p27).

## correct_answer
C

## answer_a
Glucagon

## explanation_a
Incorrect. Glucagon activates hepatic gluconeogenesis, opposing insulin, as part of the body's response to falling blood glucose.

## answer_b
Growth hormone

## explanation_b
Incorrect. Growth hormone is an anti-insulin hormone that favours gluconeogenesis, as part of its broader glucose-sparing, fat-mobilising actions.

## answer_c
Insulin

## explanation_c
Correct. Insulin is the only hormone that lowers gluconeogenesis, by suppressing the transcription of the pathway's key enzymes (PEPCK, fructose-1,6-bisphosphatase, glucose-6-phosphatase) and by promoting glycolysis instead. Every other major counter-regulatory hormone — glucagon, cortisol, growth hormone — pushes gluconeogenesis up, which is exactly why insulin's role here is the single exception a student must hold onto.

## answer_d
Glucocorticoids

## explanation_d
Incorrect. Glucocorticoids (cortisol) promote gluconeogenesis, partly by supplying amino-acid substrate through protein catabolism and partly by inducing key gluconeogenic enzymes.

## topic
Carbohydrate metabolism

## subtopic
Gluconeogenesis regulation

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
60

## exam_relevance
6

## clinical_relevance
0.5

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
AU-MED-102 > Biochemistry > Carbohydrate Metabolism > Gluconeogenesis regulation

## question_only_for

## main_concept
CON-FND-7B3B4F0BEBF198

## concept_ids

## contextual_concept_ids

## library_ids
ART-103-BIO-GLUCONEOGENESIS-AND-CORI-CYCLE

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
Name insulin as the sole hormone that inhibits gluconeogenesis, against three counter-regulatory hormones that activate it.

## source_citation
AFM Biochemistry Questions (Alexandria University Medical Biochemistry Department), Carbohydrate Metabolism Q18.

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
QST-FND-CHO-HMP-EXCEPT-001

## title
The HMP shunt pathway is important for all the following except

## question
The HMP shunt pathway is important for all the following EXCEPT:

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
AFM Biochemistry Questions, Carbohydrate Metabolism Q26 (src_01ab4268402d32d4d111, p28).

## correct_answer
A

## answer_a
Generation of ATP

## explanation_a
Correct — this is the exception. The hexose monophosphate pathway generates no ATP at all; it produces NADPH and ribose 5-phosphate instead. This is what separates it from glycolysis as a route of glucose metabolism, since glycolysis exists precisely to make ATP.

## answer_b
Fatty acid biosynthesis

## explanation_b
Incorrect as an EXCEPT answer — the pathway is genuinely important here, supplying the NADPH that fatty-acid synthase and acetyl-CoA carboxylase both require.

## answer_c
Synthesis of reduced glutathione

## explanation_c
Incorrect as an EXCEPT answer — NADPH from this pathway is what glutathione reductase uses to keep glutathione in its reduced, protective form.

## answer_d
Synthesis of ribose

## explanation_d
Incorrect as an EXCEPT answer — ribose 5-phosphate, made in the pathway's non-oxidative phase, is the precursor for nucleotide and nucleic acid synthesis.

## topic
Carbohydrate metabolism

## subtopic
Hexose Monophosphate Pathway

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
AU-MED-102 > Biochemistry > Carbohydrate Metabolism > Hexose Monophosphate Pathway

## question_only_for

## main_concept
CON-FND-B928DE79E08882

## concept_ids

## contextual_concept_ids

## library_ids
ART-103-BIO-HMP-PATHWAY-AND-G6PD

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
State that the HMP shunt yields NADPH and ribose 5-phosphate but no ATP, distinguishing its purpose from glycolysis.

## source_citation
AFM Biochemistry Questions (Alexandria University Medical Biochemistry Department), Carbohydrate Metabolism Q26.

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
QST-FND-CHO-RBC-ENERGY-SOURCE-001

## title
RBCs derive their energy from

## question
RBCs derive their energy from:

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
AFM Biochemistry Questions, Carbohydrate Metabolism Q55 (src_01ab4268402d32d4d111, p32).

## correct_answer
D

## answer_a
Fatty acid oxidation

## explanation_a
Incorrect. Mature red cells have no mitochondria, and beta-oxidation is a mitochondrial process, so they cannot use this route at all.

## answer_b
TCA cycle

## explanation_b
Incorrect. The citric acid cycle also requires mitochondria, which red cells lack; none of its reactions can run in a cell with no mitochondria to house them.

## answer_c
Respiratory chain

## explanation_c
Incorrect. Oxidative phosphorylation depends on the mitochondrial inner membrane and its embedded complexes, none of which a mature red cell possesses.

## answer_d
Glycolysis

## explanation_d
Correct. Because red cells have no mitochondria, anaerobic glycolysis is their only source of ATP, generated entirely by substrate-level phosphorylation. This is also why red cells depend so completely on a steady glucose supply, with no metabolic fallback if it is interrupted.

## topic
Carbohydrate metabolism

## subtopic
Glycolysis in the red cell

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
0.4

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
AU-MED-102 > Biochemistry > Carbohydrate Metabolism > Glycolysis in the red cell

## question_only_for

## main_concept
CON-HEM-095C9C97B56CCA

## concept_ids

## contextual_concept_ids

## library_ids
ART-103-BIO-RBC-GLYCOLYSIS-AND-BPG-SHUNT

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
State that anaerobic glycolysis is the red cell's sole ATP source, because it has no mitochondria for any oxidative pathway.

## source_citation
AFM Biochemistry Questions (Alexandria University Medical Biochemistry Department), Carbohydrate Metabolism Q55.

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
QST-FND-LIPID-CARNITINE-TRANSPORT-001

## title
Long-chain fatty acids are attached to which carrier for mitochondrial transport

## question
For transport across the inner mitochondrial membrane, long chain fatty acids are attached to:

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
AFM Biochemistry Questions, Lipid Metabolism Q9 (src_01ab4268402d32d4d111, p44).

## correct_answer
D

## answer_a
Coenzyme A

## explanation_a
Incorrect. CoA activates the fatty acid to acyl-CoA in the cytosol before mitochondrial entry, but CoA itself cannot cross the inner mitochondrial membrane, which is exactly why a separate carrier is needed.

## answer_b
Acyl transacylase

## explanation_b
Incorrect. This names an enzyme family, not the small molecule carrier that actually crosses the membrane carrying the fatty-acyl group.

## answer_c
Acyl transferase

## explanation_c
Incorrect. Carnitine palmitoyltransferase enzymes catalyse the attachment and release of the acyl group from carnitine; they are the enzymes of the shuttle, not the carrier molecule itself.

## answer_d
Carnitine

## explanation_d
Correct. Long-chain fatty acyl-CoA is converted to acylcarnitine by carnitine palmitoyltransferase I on the outer mitochondrial membrane, and only this carnitine-linked form can cross via a translocase into the matrix, where carnitine palmitoyltransferase II regenerates acyl-CoA. This carnitine shuttle is the only route long-chain fatty acids have into the mitochondrion for beta-oxidation.

## topic
Lipid metabolism

## subtopic
Oxidation of fatty acids

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
0.4

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
AU-MED-102 > Biochemistry > Lipid Metabolism > Oxidation of fatty acids

## question_only_for

## main_concept
CON-FND-177A829022AC8F

## concept_ids

## contextual_concept_ids

## library_ids
ART-103-BIO-FATTY-ACID-OXIDATION

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
Name carnitine as the carrier that shuttles long-chain fatty acyl groups across the inner mitochondrial membrane.

## source_citation
AFM Biochemistry Questions (Alexandria University Medical Biochemistry Department), Lipid Metabolism Q9.

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
QST-FND-LIPID-BETA-OXIDATION-CYCLE-001

## title
Compounds formed during a cycle of beta-oxidation

## question
During each cycle of ongoing Beta-oxidation of fatty acids, all the following compounds are formed EXCEPT:

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
AFM Biochemistry Questions, Lipid Metabolism Q11 (src_01ab4268402d32d4d111, p44).

## correct_answer
C

## answer_a
NADH

## explanation_a
Incorrect as an EXCEPT answer — each cycle's 3-hydroxyacyl-CoA dehydrogenase step reduces NAD+ to NADH, so NADH is genuinely produced every turn.

## answer_b
Acetyl-CoA

## explanation_b
Incorrect as an EXCEPT answer — the thiolase step of every cycle cleaves off a two-carbon acetyl-CoA unit, which is the whole point of the pathway.

## answer_c
Fatty Acyl-CoA

## explanation_c
Correct — this is the exception, as printed. Each cycle regenerates a fatty acyl-CoA shortened by two carbons, so a shortened acyl-CoA persists across cycles rather than being a newly formed product distinct from what entered. The two genuinely new products of each turn are acetyl-CoA and the reduced coenzymes NADH and FADH2.

## answer_d
FADH2

## explanation_d
Incorrect as an EXCEPT answer — the acyl-CoA dehydrogenase step at the start of each cycle reduces FAD to FADH2.

## topic
Lipid metabolism

## subtopic
Oxidation of fatty acids

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
AU-MED-102 > Biochemistry > Lipid Metabolism > Oxidation of fatty acids

## question_only_for

## main_concept
CON-FND-84BDACCA71AF45

## concept_ids

## contextual_concept_ids

## library_ids
ART-103-BIO-FATTY-ACID-OXIDATION

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
List the three genuinely new products of one beta-oxidation cycle (acetyl-CoA, NADH, FADH2), distinguishing them from the shortened acyl-CoA that carries over.

## source_citation
AFM Biochemistry Questions (Alexandria University Medical Biochemistry Department), Lipid Metabolism Q11.

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
QST-FND-LIPID-NADPH-VS-OXIDATION-001

## title
Coenzyme not used in fatty acid oxidation

## question
A coenzyme not used in fatty acid oxidation is:

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
AFM Biochemistry Questions, Lipid Metabolism Q43 (src_01ab4268402d32d4d111, p49).

## correct_answer
D

## answer_a
CoA-SH

## explanation_a
Incorrect as an EXCEPT answer — coenzyme A is genuinely used, carrying the acyl group throughout beta-oxidation as fatty acyl-CoA.

## answer_b
NAD

## explanation_b
Incorrect as an EXCEPT answer — NAD+ is reduced to NADH at the 3-hydroxyacyl-CoA dehydrogenase step of every cycle.

## answer_c
FAD

## explanation_c
Incorrect as an EXCEPT answer — FAD is reduced to FADH2 at the acyl-CoA dehydrogenase step of every cycle.

## answer_d
NADP

## explanation_d
Correct — this is the exception. Fatty acid oxidation is a purely catabolic, NAD+/FAD-using pathway. NADPH is instead spent, not made, on the opposite process, fatty-acid synthesis, and keeping these two reducing currencies on opposite sides of oxidation versus synthesis is what lets both pathways coexist in the same cell without cancelling each other out.

## topic
Lipid metabolism

## subtopic
Cofactors of lipid metabolism

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
AU_Y1=0.4

## years
AU_Y1

## universities
au

## module
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Lipid Metabolism > Cofactors of lipid metabolism

## question_only_for

## main_concept
CON-FND-4C05D459E80AEF

## concept_ids

## contextual_concept_ids

## library_ids
ART-103-BIO-FATTY-ACID-OXIDATION

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
State that NADPH belongs to fatty-acid synthesis, not oxidation, which instead runs on NAD+ and FAD.

## source_citation
AFM Biochemistry Questions (Alexandria University Medical Biochemistry Department), Lipid Metabolism Q43.

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
QST-FND-LIPID-REFSUM-ALPHA-OXIDATION-001

## title
Refsum's disease enzyme deficiency

## question
Refsum's disease is due to lack of enzymes of:

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
AFM Biochemistry Questions, Lipid Metabolism Q1 (src_01ab4268402d32d4d111, p43).

## correct_answer
C

## answer_a
Beta oxidation

## explanation_a
Incorrect. Beta-oxidation handles ordinary straight-chain fatty acids; a branch methyl group two carbons in, as in phytanic acid, actually blocks beta-oxidation's own thiolase step, which is precisely why a separate pathway is needed for such substrates.

## answer_b
Omega oxidation

## explanation_b
Incorrect. Omega-oxidation is a minor pathway oxidising the far end of a fatty acid chain; it is not the pathway defective in Refsum's disease.

## answer_c
Alpha oxidation

## explanation_c
Correct. Refsum's disease is a peroxisomal defect of alpha-oxidation, the pathway that removes one carbon at a time from branched-chain fatty acids such as phytanic acid, which cannot enter beta-oxidation directly because of a methyl branch at the beta-carbon. Phytanic acid, derived from dietary phytol, accumulates and causes the disease's neurological and retinal features.

## answer_d
Desaturation

## explanation_d
Incorrect. Desaturase enzymes introduce double bonds into fatty acid chains; this is unrelated to the branched-chain oxidation defect that defines Refsum's disease.

## topic
Lipid metabolism

## subtopic
Oxidation of fatty acids

## difficulty
Moderate

## question_type
Pathophysiology

## cognitive_effort
Medium

## cognitive_effort_score
0.55

## setting
Both

## reasoning_level
2

## inferred_difficulty
45

## exam_relevance
6

## clinical_relevance
0.7

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
AU-MED-102 > Biochemistry > Lipid Metabolism > Oxidation of fatty acids

## question_only_for

## main_concept
CON-FND-F8FE239D334F4F

## concept_ids

## contextual_concept_ids

## library_ids
ART-103-BIO-FATTY-ACID-OXIDATION

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
Name alpha-oxidation as the pathway defective in Refsum's disease, and explain why phytanic acid cannot instead be processed by beta-oxidation.

## source_citation
AFM Biochemistry Questions (Alexandria University Medical Biochemistry Department), Lipid Metabolism Q1.

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
QST-FND-LIPID-KEY-ENZYME-FA-SYNTHESIS-001

## title
The key enzyme in fatty acid synthesis

## question
The key enzyme in fatty acid synthesis is:

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
AFM Biochemistry Questions, Lipid Metabolism Q23 (src_01ab4268402d32d4d111, p46).

## correct_answer
A

## answer_a
Acetyl CoA carboxylase

## explanation_a
Correct. Acetyl-CoA carboxylase catalyses fatty-acid synthesis's committed, rate-limiting step, carboxylating acetyl-CoA to malonyl-CoA using biotin and ATP. Every physiological signal that regulates lipogenesis — insulin activating it, glucagon and epinephrine inhibiting it via phosphorylation, citrate allosterically activating it — converges on this one enzyme.

## answer_b
Beta hydroxy acyl dehydratase

## explanation_b
Incorrect. This is one of the repeating-cycle enzymes of the fatty-acid synthase complex itself, not the pathway's separate, rate-limiting entry step.

## answer_c
Enoyl reductase

## explanation_c
Incorrect. Like beta-hydroxyacyl dehydratase, this is a cycle enzyme within the fatty-acid synthase complex, reducing the double bond formed by the dehydratase step, not the committed regulatory step.

## answer_d
Acetyl transacylase

## explanation_d
Incorrect. This enzyme loads acetyl groups onto the fatty-acid synthase complex's acyl carrier protein; it is a loading step, not the pathway's key regulatory enzyme.

## topic
Lipid metabolism

## subtopic
Synthesis of fatty acids

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
60

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
AU-MED-102 > Biochemistry > Lipid Metabolism > Synthesis of fatty acids

## question_only_for

## main_concept
CON-FND-2F3A652B8E3104

## concept_ids

## contextual_concept_ids

## library_ids
ART-103-BIO-LIPOGENESIS-AND-DEPOT-FAT

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
Name acetyl-CoA carboxylase as the key, regulated enzyme of fatty-acid synthesis, distinguishing it from the fatty-acid synthase complex's own internal-cycle enzymes.

## source_citation
AFM Biochemistry Questions (Alexandria University Medical Biochemistry Department), Lipid Metabolism Q23.

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
QST-FND-LIPID-CITRATE-SHUTTLE-001

## title
Route for acetyl group transfer across the inner mitochondrial membrane in fatty acid synthesis

## question
In fatty acid synthesis, the transfer of acetyl group across the inner mitochondrial membrane is mainly achieved by means of:

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
AFM Biochemistry Questions, Lipid Metabolism Q7 (src_01ab4268402d32d4d111, p43-44).

## correct_answer
B

## answer_a
Carnitine shuttle

## explanation_a
Incorrect. Carnitine carries fatty acyl groups into the mitochondrion for oxidation — the opposite direction and opposite purpose from moving acetyl-CoA out for synthesis.

## answer_b
Citrate Shuttle

## explanation_b
Correct. Mitochondrial acetyl-CoA condenses with oxaloacetate to form citrate, which crosses the inner mitochondrial membrane on a citrate transporter; in the cytosol, ATP-citrate lyase splits it back into acetyl-CoA, now available for fatty-acid synthesis, and oxaloacetate. This citrate shuttle is the route acetyl-CoA takes out of the mitochondrion, since acetyl-CoA itself cannot cross the membrane directly.

## answer_c
Acetyl transferase

## explanation_c
Incorrect. This names an enzyme class, not the shuttle mechanism that actually moves the two-carbon unit across the membrane as citrate.

## answer_d
Malonyl-transacylase

## explanation_d
Incorrect. Malonyl transacylase loads malonyl groups onto the fatty-acid synthase complex within the cytosol; it plays no part in getting acetyl units out of the mitochondrion in the first place.

## topic
Lipid metabolism

## subtopic
Synthesis of fatty acids

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
AU_Y1=0.4

## years
AU_Y1

## universities
au

## module
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Lipid Metabolism > Synthesis of fatty acids

## question_only_for

## main_concept
CON-FND-FCFC1B5A95695E

## concept_ids

## contextual_concept_ids

## library_ids
ART-103-BIO-LIPOGENESIS-AND-DEPOT-FAT

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
Name the citrate shuttle as the route mitochondrial acetyl-CoA takes to reach the cytosol for fatty-acid synthesis, distinct from the carnitine shuttle's opposite job.

## source_citation
AFM Biochemistry Questions (Alexandria University Medical Biochemistry Department), Lipid Metabolism Q7.

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
QST-FND-LIPID-ADIPOSE-GLYCEROL-3P-001

## title
Source of glycerol-3-phosphate in adipose tissue

## question
Glycerol 3-phosphate in adipose tissue arises primarily from:

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
AFM Biochemistry Questions, Lipid Metabolism Q65 (src_01ab4268402d32d4d111, p52). The AFM bank's own Q12 gives a different, internally inconsistent answer to this same question ("glycerol kinase acting on glycerol") — recorded in the triage as an unresolved contradiction; this question is authored from Q65's keyed answer, which matches standard teaching.

## correct_answer
A

## answer_a
Reduction of dihydroxyacetone phosphate

## explanation_a
Correct. Adipose tissue lacks glycerol kinase, so it cannot phosphorylate free glycerol at all — glycerol released locally by lipolysis simply diffuses out to the blood rather than being reused. Instead, adipocytes make glycerol 3-phosphate for triacylglycerol synthesis by reducing dihydroxyacetone phosphate, a glycolytic intermediate, with glycerol-3-phosphate dehydrogenase, which is why triacylglycerol synthesis in fat cells depends on glucose availability.

## answer_b
Hydrolysis of phosphatidic acid

## explanation_b
Incorrect. Phosphatidic acid is made from glycerol 3-phosphate, not the other way round; hydrolysing it would not supply the starting material this question asks about.

## answer_c
Phosphorylation of glycerol by glycerokinase

## explanation_c
Incorrect. This is the route the AFM bank's own Q12 gives, but it does not match standard teaching or this question's own keyed answer: adipose tissue's defining metabolic limitation is precisely that it lacks glycerol kinase, unlike the liver, which does have it.

## answer_d
Uptake from blood

## explanation_d
Incorrect. Circulating glycerol is taken up mainly by the liver, which can phosphorylate it directly; adipose tissue is not the tissue that relies on this route.

## topic
Lipid metabolism

## subtopic
Synthesis of triacylglycerol

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
40

## exam_relevance
6

## clinical_relevance
0.3

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
AU-MED-102 > Biochemistry > Lipid Metabolism > Synthesis of triacylglycerol

## question_only_for

## main_concept
CON-FND-6B469645AE7DBC

## concept_ids

## contextual_concept_ids

## library_ids
ART-103-BIO-LIPOGENESIS-AND-DEPOT-FAT

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
Explain why adipose tissue makes glycerol 3-phosphate by reducing dihydroxyacetone phosphate rather than by phosphorylating free glycerol, given its lack of glycerol kinase.

## source_citation
AFM Biochemistry Questions (Alexandria University Medical Biochemistry Department), Lipid Metabolism Q65.

## author_notes
This bank's Q12 asks the identical question and keys the opposite (incorrect-by-standard-teaching) answer; recorded as a bank inconsistency in the triage, not silently harmonised.

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
QST-FND-LIPID-LIPOPROTEIN-LIPASE-001

## title
Lipoprotein lipase's own properties

## question
Lipoprotein lipase:

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
AFM Biochemistry Questions, Lipid Metabolism Q4 (src_01ab4268402d32d4d111, p43).

## correct_answer
D

## answer_a
Is an intracellular enzyme

## explanation_a
Incorrect. Lipoprotein lipase is anchored to the luminal surface of capillary endothelium, not held inside a cell, which is where it acts on circulating lipoproteins.

## answer_b
Functions to mobilize stored triacylglycerols from adipose tissues

## explanation_b
Incorrect. Mobilising stored fat is hormone-sensitive lipase's job, acting inside the adipocyte; lipoprotein lipase instead acts outside cells, on circulating triacylglycerol-rich lipoproteins.

## answer_c
Is stimulated by one of the apoproteins present in VLDL

## explanation_c
Incorrect as printed here — apo C-II, present on both chylomicrons and VLDL, is indeed lipoprotein lipase's activator, but this option's imprecise framing is not what the bank keys as the best description of the enzyme; the complete, correct description is the enzyme's own substrate action.

## answer_d
Readily hydrolyzes three fatty acids from triacylglycerols

## explanation_d
Correct. Lipoprotein lipase, sitting on the capillary endothelium and activated by apo C-II, hydrolyses the triacylglycerol carried by chylomicrons and VLDL. Free fatty acids released this way are taken up by adipose tissue and muscle, leaving behind a cholesterol-enriched remnant particle. This is the only option among the four that correctly names both the enzyme's location and its substrate action.

## topic
Lipid metabolism

## subtopic
Plasma lipids and lipoproteins

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
0.4

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
AU-MED-102 > Biochemistry > Lipid Metabolism > Plasma lipids and lipoproteins

## question_only_for

## main_concept
CON-GIT-6CB618DBA50596

## concept_ids

## contextual_concept_ids

## library_ids
ART-103-BIO-LIPOPROTEIN-MACHINERY

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
State that lipoprotein lipase hydrolyses circulating triacylglycerol at the capillary wall, distinguishing it from intracellular hormone-sensitive lipase.

## source_citation
AFM Biochemistry Questions (Alexandria University Medical Biochemistry Department), Lipid Metabolism Q4.

## author_notes

## estimated_seconds
70

## randomise_answers
yes

## media_recommendations

## attached_image

## attachments

---

# Item

## id
QST-FND-LIPID-HDL-PHOSPHOLIPID-001

## title
Main lipid in nascent HDL

## question
The main lipid in nascent HDL is:

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
AFM Biochemistry Questions, Lipid Metabolism Q15 (src_01ab4268402d32d4d111, p45).

## correct_answer
C

## answer_a
Cholesterol

## explanation_a
Incorrect. Cholesterol becomes major only after LCAT esterifies it and it moves into the particle's core as the particle matures; freshly secreted, nascent HDL is not cholesterol-rich.

## answer_b
Free FA

## explanation_b
Incorrect. Free fatty acids travel bound to albumin, not packaged inside HDL particles.

## answer_c
Phospholipids

## explanation_c
Correct. Nascent HDL is secreted by the liver and intestine as a disc-shaped particle whose main lipid is phospholipid, studded with apolipoproteins including apo A-I. As LCAT esterifies cholesterol picked up from tissues and other lipoproteins, the particle matures into a spherical, cholesteryl-ester-rich HDL.

## answer_d
TAG

## explanation_d
Incorrect. Triacylglycerol is the dominant lipid of chylomicrons and VLDL, not of HDL at any stage, nascent or mature.

## topic
Lipid metabolism

## subtopic
Plasma lipids and lipoproteins

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
6

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
AU-MED-102 > Biochemistry > Lipid Metabolism > Plasma lipids and lipoproteins

## question_only_for

## main_concept
CON-GIT-ECB3C2F56DC72D

## concept_ids

## contextual_concept_ids

## library_ids
ART-103-BIO-LIPOPROTEIN-MACHINERY

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
Name phospholipid as nascent HDL's major lipid, distinguishing the freshly secreted disc from the mature, cholesteryl-ester-rich particle LCAT produces.

## source_citation
AFM Biochemistry Questions (Alexandria University Medical Biochemistry Department), Lipid Metabolism Q15.

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
QST-FND-LIPID-KETONE-TISSUES-001

## title
Tissues capable of oxidising ketone bodies

## question
Which of the following tissues are capable of oxidizing ketone bodies?

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
AFM Biochemistry Questions, Lipid Metabolism Q22 (src_01ab4268402d32d4d111, p46).

## correct_answer
B

## answer_a
Liver

## explanation_a
Incorrect. The liver makes ketone bodies but cannot use them itself, because it lacks thiophorase (succinyl-CoA:3-ketoacid CoA transferase), the enzyme needed to reactivate acetoacetate to acetoacetyl-CoA.

## answer_b
Heart

## explanation_b
Correct. Extrahepatic tissues with mitochondria and thiophorase, including heart, skeletal muscle, kidney and, during prolonged starvation, brain, can oxidise ketone bodies for energy. The heart in particular uses them readily, especially when glucose and fatty-acid supply are limited.

## answer_c
RBCS

## explanation_c
Incorrect. Red blood cells have no mitochondria at all, so they cannot oxidise ketone bodies, fatty acids, or run the citric acid cycle by any route.

## answer_d
Plasma

## explanation_d
Incorrect. Plasma is not a tissue and carries out no metabolism itself; ketone bodies are simply transported in it to the tissues that can use them.

## topic
Lipid metabolism

## subtopic
Metabolism of ketone bodies

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
0.5

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
AU-MED-102 > Biochemistry > Lipid Metabolism > Metabolism of ketone bodies

## question_only_for

## main_concept
CON-END-2E748A37DA660A

## concept_ids

## contextual_concept_ids

## library_ids
ART-103-BIO-KETONE-BODY-METABOLISM

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
Name the heart, and other extrahepatic thiophorase-containing tissues, as ketone-body users, contrasting with the liver, which makes but cannot use them.

## source_citation
AFM Biochemistry Questions (Alexandria University Medical Biochemistry Department), Lipid Metabolism Q22.

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
QST-FND-LIPID-CHOLESTEROL-RATE-LIMITING-001

## title
Rate-limiting step in cholesterol biosynthesis

## question
The rate limiting step in cholesterol biosynthesis is:

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
AFM Biochemistry Questions, Lipid Metabolism Q27 (src_01ab4268402d32d4d111, p47).

## correct_answer
A

## answer_a
HMG COA reductase

## explanation_a
Correct. HMG-CoA reductase catalyses the committed, rate-limiting step of cholesterol synthesis, reducing HMG-CoA to mevalonate. It is active in its dephosphorylated state, inhibited by high intracellular cholesterol and by statin drugs, and induced when cellular cholesterol is low, making it the pathway's single most important control point.

## answer_b
HMG COA synthetase

## explanation_b
Incorrect. HMG-CoA synthase makes HMG-CoA one step earlier, from acetoacetyl-CoA and acetyl-CoA; it is shared with ketogenesis and is not the pathway's committed, regulated step.

## answer_c
Thiolase

## explanation_c
Incorrect. Thiolase condenses two acetyl-CoA molecules to acetoacetyl-CoA at the very start of the pathway, well before the committed step.

## answer_d
Mevalonate kinase

## explanation_d
Incorrect. Mevalonate kinase acts immediately after the rate-limiting reductase step; it is not itself rate-limiting.

## topic
Lipid metabolism

## subtopic
Cholesterol metabolism

## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.35

## setting
Both

## reasoning_level
1

## inferred_difficulty
65

## exam_relevance
7

## clinical_relevance
0.7

## academic_relevance
0.85

## exam_weight_by_year
AU_Y1=0.5

## years
AU_Y1

## universities
au

## module
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Lipid Metabolism > Cholesterol metabolism

## question_only_for

## main_concept
CON-GIT-3A348EEAF118BD

## concept_ids

## contextual_concept_ids

## library_ids
ART-103-BIO-CHOLESTEROL-METABOLISM

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
Name HMG-CoA reductase as cholesterol synthesis's rate-limiting, statin-targeted enzyme.

## source_citation
AFM Biochemistry Questions (Alexandria University Medical Biochemistry Department), Lipid Metabolism Q27.

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
QST-FND-LIPID-VLDL-CHYLOMICRON-001

## title
Chylomicrons carry dietary fat; VLDL carries hepatic fat

## question
Which of the following statements about chylomicrons and VLDL best describes their transport function?

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
AFM Biochemistry Questions, Lipid Metabolism Q45 (src_01ab4268402d32d4d111, p49) and Q28 (p47).

## correct_answer
A

## answer_a
Chylomicrons transfer dietary triacylglycerol from the intestine; VLDL transfers hepatic triacylglycerol from the liver to peripheral tissues

## explanation_a
Correct. Chylomicrons, assembled in intestinal mucosal cells and carrying apo B-48, deliver dietary triacylglycerol to peripheral tissues via the lymphatics and blood. VLDL, assembled in the liver and carrying apo B-100, performs the analogous job for endogenously synthesised triacylglycerol, both particles being stripped of their triglyceride core by lipoprotein lipase at the capillary wall.

## answer_b
The main lipid of VLDL is cholesterol

## explanation_b
Incorrect. Like chylomicrons, VLDL is triacylglycerol-rich, not cholesterol-rich; cholesterol becomes dominant only in its downstream remnant, LDL.

## answer_c
VLDL contains apo B-48 as its main protein

## explanation_c
Incorrect. Apo B-48 is the intestinal apoprotein carried by chylomicrons; VLDL's defining apoprotein is apo B-100, made by the liver.

## answer_d
Chylomicrons are important for removal of cholesterol from tissues to the liver

## explanation_d
Incorrect. Reverse cholesterol transport, moving cholesterol from tissues back to the liver, is HDL's job, not chylomicrons', which move dietary fat in the opposite direction, from gut to tissues.

## topic
Lipid metabolism

## subtopic
Plasma lipids and lipoproteins

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
0.4

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
AU-MED-102 > Biochemistry > Lipid Metabolism > Plasma lipids and lipoproteins

## question_only_for

## main_concept
CON-GIT-33EAF87333AAD5

## concept_ids

## contextual_concept_ids

## library_ids
ART-103-BIO-PLASMA-LIPOPROTEINS

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
Contrast chylomicrons (dietary, apo B-48, intestinal) with VLDL (hepatic, apo B-100), naming each particle's source, cargo and apoprotein correctly.

## source_citation
AFM Biochemistry Questions (Alexandria University Medical Biochemistry Department), Lipid Metabolism Q45 and Q28.

## author_notes
Combines two closely paired AFM items (Q28's VLDL-transport statement and Q45's four-option VLDL/chylomicron comparison) into one composite-option question, since both test the same chylomicron-vs-VLDL distinction; each distractor is traced to its own source option.

## estimated_seconds
70

## randomise_answers
yes

## media_recommendations

## attached_image

## attachments

---

# Item

## id
QST-FND-LIPID-KETOSIS-CAUSES-001

## title
Causes of ketosis, all except

## question
All of the following are causes of ketosis, EXCEPT:

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
AFM Biochemistry Questions, Lipid Metabolism Q26 (src_01ab4268402d32d4d111, p46).

## correct_answer
C

## answer_a
Starvation

## explanation_a
Incorrect as an EXCEPT answer — starvation lowers insulin and raises anti-insulin hormones, driving fatty-acid oxidation and ketogenesis to fuel the brain when glucose is scarce.

## answer_b
Severe uncontrolled diabetes mellitus

## explanation_b
Incorrect as an EXCEPT answer — uncontrolled type 1 diabetes combines very low insulin with high anti-insulin hormone activity, maximally activating lipolysis and ketogenesis, producing diabetic ketoacidosis.

## answer_c
Nephritic syndrome

## explanation_c
Correct — this is the exception. Nephritic syndrome is a glomerular inflammatory disorder presenting with haematuria, hypertension and mild proteinuria. It has no recognised mechanism raising ketogenesis, unlike the anti-insulin-driven states in the other three options, which all genuinely increase fatty-acid oxidation and ketone-body production.

## answer_d
High fat, low carbohydrate diet

## explanation_d
Incorrect as an EXCEPT answer — a diet very low in carbohydrate forces greater reliance on fatty-acid oxidation for energy, increasing ketone body production even without a hormonal derangement.

## topic
Lipid metabolism

## subtopic
Metabolism of ketone bodies

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
50

## exam_relevance
6

## clinical_relevance
0.7

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
AU-MED-102 > Biochemistry > Lipid Metabolism > Metabolism of ketone bodies

## question_only_for

## main_concept
CON-END-CC450A236ABF50

## concept_ids

## contextual_concept_ids

## library_ids
ART-103-BIO-KETOSIS

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
Identify nephritic syndrome as unrelated to ketosis, distinguishing genuine anti-insulin-driven causes from an unrelated renal condition.

## source_citation
AFM Biochemistry Questions (Alexandria University Medical Biochemistry Department), Lipid Metabolism Q26.

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
QST-FND-LIPID-LIPOLYSIS-HSL-001

## title
Lipolysis's defining feature

## question
Lipolysis:

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
AFM Biochemistry Questions, Lipid Metabolism Q30 (src_01ab4268402d32d4d111, p47).

## correct_answer
C

## answer_a
Is stimulated by insulin

## explanation_a
Incorrect. Insulin suppresses lipolysis, by promoting dephosphorylation (inactivation) of hormone-sensitive lipase; it is glucagon and epinephrine that stimulate it.

## answer_b
Is inhibited by glucagon

## explanation_b
Incorrect. Glucagon activates lipolysis via the cAMP/protein kinase A cascade, the same mechanism it uses to activate glycogen phosphorylase; it does not inhibit it.

## answer_c
Requires the action of hormone-sensitive lipase

## explanation_c
Correct. Hormone-sensitive lipase is the key enzyme of lipolysis, hydrolysing stored triacylglycerol in adipocytes to free fatty acids and glycerol. It is activated by phosphorylation under glucagon and epinephrine, via cAMP and protein kinase A, and inactivated by insulin-driven dephosphorylation, the opposite regulatory pattern to acetyl-CoA carboxylase in lipogenesis.

## answer_d
Requires an apolipoprotein

## explanation_d
Incorrect. Apolipoproteins are structural and functional components of plasma lipoproteins; lipolysis of stored fat inside the adipocyte has no apolipoprotein requirement.

## topic
Lipid metabolism

## subtopic
Regulation of lipolysis and lipogenesis

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
0.4

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
AU-MED-102 > Biochemistry > Lipid Metabolism > Regulation of lipolysis and lipogenesis

## question_only_for

## main_concept
CON-FND-1C668119B3C0BB

## concept_ids

## contextual_concept_ids

## library_ids
ART-103-BIO-LIPOGENESIS-AND-DEPOT-FAT

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
Name hormone-sensitive lipase as lipolysis's key enzyme, and state its opposite hormonal regulation to lipogenesis's acetyl-CoA carboxylase.

## source_citation
AFM Biochemistry Questions (Alexandria University Medical Biochemistry Department), Lipid Metabolism Q30.

## author_notes

## estimated_seconds
60

## randomise_answers
yes

## media_recommendations

## attached_image

## attachments
