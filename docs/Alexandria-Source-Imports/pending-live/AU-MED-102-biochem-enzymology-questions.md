<!--
  AU-MED-102 * Biochemistry * sub-lane A enzymology -- questions testing nine concept IDs
  that are HIT-LIVE (Kasr 102-INT bundle) but not yet tagged for `au`/`AU-MED-102`. Per
  LANE-BRIEF sec21 ("questions on a concept whose au/AU-MED-102 tags are not yet applied are
  authored NOW, not deferred"), staged here alongside the overlay records in
  pending-live/AU-MED-102-biochem-enzymology-overlays.md.

  Apply after: docs/Alexandria-Source-Imports/pending-live/AU-MED-102-biochem-enzymology-overlays.md
  is applied (which itself applies after docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md
  and 102-INT-concepts.md, both already live).

  18 questions authored; 1 held (enz-q53, Enzymes MCQ p.12 -- printed key selects an option
  whose text reads "lower Ki and faster Vmax", where "Ki" is almost certainly a typo for "Km"
  and "faster Vmax" is not supportable from the half-maximal-velocity data the stem gives;
  flagged for a page-render check rather than authored on a guess, per
  coverage/AU-MED-102-enzymology-triage-keys.txt / LEDGER).

  Validate with:
    node scripts/content/gate.mjs batch docs/Alexandria-Source-Imports/pending-live/AU-MED-102-biochem-enzymology-questions.md \
      --with docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md \
      --with docs/Kasr-Source-Imports/concept/102-INT-concepts.md \
      --with docs/Alexandria-Source-Imports/pending-live/AU-MED-102-biochem-enzymology-overlays.md \
      --with docs/Alexandria-Source-Imports/evidence/AU-MED-102-biochemistry-resources.md
  Prove the merge with (plain arguments, Kasr files + overlay first):
    node scripts/content/gate.mjs simulate \
      docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md \
      docs/Kasr-Source-Imports/concept/102-INT-concepts.md \
      docs/Alexandria-Source-Imports/pending-live/AU-MED-102-biochem-enzymology-overlays.md \
      docs/Alexandria-Source-Imports/pending-live/AU-MED-102-biochem-enzymology-questions.md

  Import: Admin › Bulk import → question.
-->
# Item

## id
QST-FND-AU-102-ENZ-PENDING-001

## title
Which of the following causes a conformational change to the active site of an enzyme?

## question
Which of the following causes a conformational change to the active site of an enzyme?

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Proteolytic cleavage

## explanation_a
Incorrect. Proteolytic cleavage converts a zymogen into its active form by removing a masking segment, but that is a one-time activation event, not the conformational-change mechanism this question is asking about.

## answer_b
Allosteric inhibitor

## explanation_b
Correct. An allosteric inhibitor binds a site distinct from the enzyme's catalytic (active) site, and its binding there is transmitted through the protein as a conformational change that alters the shape, and therefore the function, of the active site itself. This is the defining mechanism of allosteric regulation -- action at a distance through a shape change, rather than direct occupation of the active site the way a competitive inhibitor works.

## answer_c
Coenzymes

## explanation_c
Incorrect. Coenzymes assist catalysis directly at or near the active site (accepting a group from the substrate); they do not work by causing a conformational change from a separate allosteric site.

## answer_d
Competitive inhibitor

## explanation_d
Incorrect. A competitive inhibitor works by directly and physically occupying the active site itself, competing with substrate for the same space -- not by producing a conformational change from elsewhere in the protein.

## topic
Enzymes

## subtopic
Enzyme regulation

## main_concept
CON-FND-6BBAC69900B22F

## concept_ids
CON-FND-6BBAC69900B22F

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
1

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
AU_Y1=0.35

## years
AU_Y1

## universities
au

## module

## module_subject
AU-MED-102 > Biochemistry > Enzymology

## question_only_for

## library_ids
ART-FND-AU-MED-102-ENZYMOLOGY

## resource_ids
src_9929d079ddfd6e073223

## learning_objective
Identify allosteric inhibitor binding as the cause of a conformational change to the enzyme's active site.

## source_citation
Alexandria University AU-MED-102 Biochemistry department, Enzymes MCQ bank, Dr. Mohamed Agha ("The Genius in Biochemistry").

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer table, Enzymes MCQ Q1 = b
au: Enzymes MCQ bank p.2 Q1
Tests CON-FND-6BBAC69900B22F (Kasr 102-INT, HIT-LIVE), overlaid with au/AU-MED-102 tags in pending-live/AU-MED-102-biochem-enzymology-overlays.md. Apply after that overlay.

---

# Item

## id
QST-FND-AU-102-ENZ-PENDING-002

## title
Concerning allosteric effectors, which statement is correct?

## question
Which of the following statements concerning allosteric effectors is correct?

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Allosteric effectors are usually structural analogues of the substrate

## explanation_a
Incorrect. Resembling the substrate structurally is the hallmark of a competitive inhibitor, which binds the active site itself -- allosteric effectors are not defined by substrate resemblance, since they bind an entirely different site.

## answer_b
The allosteric site of an enzyme is distinct from its substrate-binding site

## explanation_b
Correct. The allosteric site is, by definition, a location on the enzyme distinct and separate from the substrate-binding (catalytic/active) site. An effector binding there works indirectly, through a conformational change transmitted to the active site, rather than by directly occupying the space substrate would use. This separation of sites is exactly what allows allosteric effectors to be structurally unrelated to the substrate, unlike competitive inhibitors.

## answer_c
Allosteric effectors cause enzyme denaturation

## explanation_c
Incorrect. Allosteric effectors modulate activity reversibly through a conformational change; they do not denature the enzyme, which would be an irreversible, non-specific loss of structure.

## answer_d
Allosteric effectors cause no conformational change in the enzyme

## explanation_d
Incorrect. Allosteric effectors work specifically BY causing a conformational change in the enzyme -- that conformational change is the entire mechanism by which binding at a distant site alters activity at the active site.

## topic
Enzymes

## subtopic
Enzyme regulation

## main_concept
CON-FND-6BBAC69900B22F

## concept_ids
CON-FND-6BBAC69900B22F

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
1

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
AU_Y1=0.35

## years
AU_Y1

## universities
au

## module

## module_subject
AU-MED-102 > Biochemistry > Enzymology

## question_only_for

## library_ids
ART-FND-AU-MED-102-ENZYMOLOGY

## resource_ids
src_9929d079ddfd6e073223

## learning_objective
State that an allosteric site is distinct from the substrate-binding site.

## source_citation
Alexandria University AU-MED-102 Biochemistry department, Enzymes MCQ bank, Dr. Mohamed Agha ("The Genius in Biochemistry").

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer table, Enzymes MCQ Q34 = b
au: Enzymes MCQ bank p.8 Q34
Tests CON-FND-6BBAC69900B22F (Kasr 102-INT, HIT-LIVE), overlaid in pending-live/AU-MED-102-biochem-enzymology-overlays.md. Apply after that overlay.

---

# Item

## id
QST-FND-AU-102-ENZ-PENDING-003

## title
An enzyme is:

## question
Which of the following best describes an enzyme?

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
A

## answer_a
Protein in nature

## explanation_a
Correct. Being protein in nature is the one property among the four listed that is universally true of every enzyme without exception, which is why this bank's own key selects it specifically rather than 'all of the above': not every enzyme is 'highly active' in the sense of a fast turnover number (some are comparatively slow), and specificity, while a hallmark of most enzymes, varies in degree rather than being an absolute, universal rule the way 'is a protein' is. The most fundamental, defining property is that an enzyme is a protein biocatalyst.

## answer_b
Highly active

## explanation_b
Incorrect on its own. Most enzymes are indeed highly active catalysts, but activity level varies between enzymes, so it is not the single, universally defining property this question's key selects.

## answer_c
Highly specific

## explanation_c
Incorrect on its own. Specificity is a hallmark of enzyme catalysis, but like activity, its degree varies between enzymes (some are broadly specific, others narrowly so), so it is not chosen as the single defining property here.

## answer_d
All of the above

## explanation_d
Incorrect. Because 'highly active' and 'highly specific' are not strictly universal in the way 'protein in nature' is, this bank's key does not select 'all of the above' -- it isolates the one property that holds without exception.

## topic
Enzymes

## subtopic
Enzyme classification

## main_concept
CON-FND-BA7E60E9E6800B

## concept_ids
CON-FND-BA7E60E9E6800B

## contextual_concept_ids

## difficulty
Easy

## question_type
Recall

## cognitive_effort
Low

## cognitive_effort_score
0.2

## setting
Academic

## reasoning_level
1

## inferred_difficulty
75

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
AU_Y1=0.35

## years
AU_Y1

## universities
au

## module

## module_subject
AU-MED-102 > Biochemistry > Enzymology

## question_only_for

## library_ids
ART-FND-AU-MED-102-ENZYMOLOGY

## resource_ids
src_9929d079ddfd6e073223

## learning_objective
State that being a protein is the single universal defining property of an enzyme.

## source_citation
Alexandria University AU-MED-102 Biochemistry department, Enzymes MCQ bank, Dr. Mohamed Agha ("The Genius in Biochemistry").

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer table, Enzymes MCQ Q6 = a
au: Enzymes MCQ bank p.2 Q6
Tests CON-FND-BA7E60E9E6800B (Kasr 102-INT, HIT-LIVE), overlaid in pending-live/AU-MED-102-biochem-enzymology-overlays.md. Apply after that overlay.

---

# Item

## id
QST-FND-AU-102-ENZ-PENDING-004

## title
Enzymes are:

## question
Which of the following properties applies to enzymes?

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
D

## answer_a
Heat labile

## explanation_a
Incorrect on its own. Enzymes are indeed heat labile (denature with excess heat), but this is only one of three properties all being true together here.

## answer_b
Colloidal in nature

## explanation_b
Incorrect on its own. Enzymes are indeed colloidal in nature (large protein molecules), but again this is only one of three properties, not the complete answer alone.

## answer_c
Non-dialyzable

## explanation_c
Incorrect on its own. Enzymes are indeed non-dialyzable (too large to diffuse across a dialysis membrane), the direct opposite of a small, dialyzable coenzyme -- but this too is only one of three properties.

## answer_d
All of the above

## explanation_d
Correct. Enzymes are heat labile, colloidal, and non-dialyzable all at once: being a large protein molecule (colloidal) is exactly why an enzyme is too big to diffuse through a dialysis membrane (non-dialyzable) and why excess heat unfolds and inactivates it (heat labile). These three properties form a consistent picture that stands in direct contrast to a coenzyme, which is small, non-colloidal and dialyzable -- the opposite set of properties.

## topic
Enzymes

## subtopic
Enzyme classification

## main_concept
CON-FND-BA7E60E9E6800B

## concept_ids
CON-FND-BA7E60E9E6800B

## contextual_concept_ids
CON-FND-90AFE9068889FA

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
1

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
AU_Y1=0.35

## years
AU_Y1

## universities
au

## module

## module_subject
AU-MED-102 > Biochemistry > Enzymology

## question_only_for

## library_ids
ART-FND-AU-MED-102-ENZYMOLOGY

## resource_ids
src_9929d079ddfd6e073223

## learning_objective
State that enzymes are heat labile, colloidal and non-dialyzable, contrasting with a coenzyme's opposite properties.

## source_citation
Alexandria University AU-MED-102 Biochemistry department, Enzymes MCQ bank, Dr. Mohamed Agha ("The Genius in Biochemistry").

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer table, Enzymes MCQ Q26 = d
au: Enzymes MCQ bank p.6 Q26
Tests CON-FND-BA7E60E9E6800B (Kasr 102-INT, HIT-LIVE), overlaid in pending-live/AU-MED-102-biochem-enzymology-overlays.md. Apply after that overlay.

---

# Item

## id
QST-FND-AU-102-ENZ-PENDING-005

## title
The enzyme:

## question
Which of the following correctly describes what an enzyme does to a reaction?

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
A

## answer_a
Reduces the energy of activation

## explanation_a
Correct. An enzyme catalyses a reaction by lowering the energy of activation (Ea) -- the energy barrier that must be overcome for substrate to reach the transition state and proceed to product. Lowering this barrier is the enzyme's entire mechanism of speeding up the reaction; it does not add energy to the reactants or change the energetics of substrate/product themselves.

## answer_b
Decreases the total energy of the substrate

## explanation_b
Incorrect. An enzyme does not decrease the total energy content of the substrate itself -- the substrate's own intrinsic energy is unchanged; only the height of the activation-energy barrier between substrate and transition state is lowered.

## answer_c
Increases the equilibrium constant

## explanation_c
Incorrect. An enzyme never changes the equilibrium constant of a reaction -- it speeds up the approach to the same, pre-existing equilibrium in both directions equally, without shifting where that equilibrium lies.

## answer_d
Decreases the total energy of the product

## explanation_d
Incorrect. An enzyme does not decrease the total energy of the product either; the free-energy difference between substrate and product (which sets the equilibrium) is a fixed thermodynamic property unaffected by the enzyme.

## topic
Enzymes

## subtopic
Enzyme kinetics

## main_concept
CON-FND-5846431203789F

## concept_ids
CON-FND-5846431203789F

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
1

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
AU_Y1=0.35

## years
AU_Y1

## universities
au

## module

## module_subject
AU-MED-102 > Biochemistry > Enzymology

## question_only_for

## library_ids
ART-FND-AU-MED-102-ENZYMOLOGY

## resource_ids
src_9929d079ddfd6e073223

## learning_objective
State that an enzyme lowers activation energy without changing substrate/product energy or the equilibrium constant.

## source_citation
Alexandria University AU-MED-102 Biochemistry department, Enzymes MCQ bank, Dr. Mohamed Agha ("The Genius in Biochemistry").

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer table, Enzymes MCQ Q7 = a
au: Enzymes MCQ bank p.3 Q7
Tests CON-FND-5846431203789F (Kasr 102-INT, HIT-LIVE), overlaid in pending-live/AU-MED-102-biochem-enzymology-overlays.md. Apply after that overlay.

---

# Item

## id
QST-FND-AU-102-ENZ-PENDING-006

## title
All the following statements are true regarding enzymes, EXCEPT:

## question
All of the following statements are true regarding enzymes, EXCEPT:

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Enzymes lower activation energy

## explanation_a
Incorrect (i.e. this statement IS true). Lowering activation energy is exactly how an enzyme speeds up a reaction, so this statement does not answer the EXCEPT.

## answer_b
They alter the equilibrium of the reaction

## explanation_b
Correct. Enzymes never alter a reaction's equilibrium constant -- they only speed up how quickly the reaction reaches the same equilibrium point that would eventually be reached without the enzyme, just far more slowly. This is the direct converse of the fact that enzymes lower activation energy: lowering Ea affects rate, not equilibrium, since equilibrium is set purely by the thermodynamic free-energy difference between substrate and product, which the enzyme does not touch.

## answer_c
They accelerate the chemical reaction

## explanation_c
Incorrect (i.e. this statement IS true). Accelerating the chemical reaction is the entire point of enzyme catalysis, so this statement does not answer the EXCEPT.

## answer_d
Most enzymes are protein in nature

## explanation_d
Incorrect (i.e. this statement IS true). The great majority of enzymes are indeed protein in nature (ribozymes being a rare exception not tested at this level), so this statement does not answer the EXCEPT.

## topic
Enzymes

## subtopic
Enzyme kinetics

## main_concept
CON-FND-5846431203789F

## concept_ids
CON-FND-5846431203789F

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
1

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
AU_Y1=0.35

## years
AU_Y1

## universities
au

## module

## module_subject
AU-MED-102 > Biochemistry > Enzymology

## question_only_for

## library_ids
ART-FND-AU-MED-102-ENZYMOLOGY

## resource_ids
src_9929d079ddfd6e073223

## learning_objective
Identify 'enzymes alter the equilibrium of the reaction' as the false statement among true statements about enzymes.

## source_citation
Alexandria University AU-MED-102 Biochemistry department, Enzymes MCQ bank, Dr. Mohamed Agha ("The Genius in Biochemistry").

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer table, Enzymes MCQ Q9 = b
au: Enzymes MCQ bank p.3 Q9
Tests CON-FND-5846431203789F (Kasr 102-INT, HIT-LIVE), overlaid in pending-live/AU-MED-102-biochem-enzymology-overlays.md. Apply after that overlay.

---

# Item

## id
QST-FND-AU-102-ENZ-PENDING-007

## title
The state produced when two or more molecules collide with the right energy and orientation for a reaction to occur is called:

## question
What is the name for the state produced when two or more molecules collide with just the right energy and just the right orientation so that a chemical reaction might occur?

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Catalytic state

## explanation_a
Incorrect. 'Catalytic state' is not the standard biochemical term for this fleeting high-energy arrangement; 'catalytic' more properly describes the enzyme's role in facilitating the reaction, not the colliding-molecule state itself.

## answer_b
Transition state

## explanation_b
Correct. The transition state is the brief, high-energy arrangement two or more colliding molecules must pass through -- with sufficient energy and the correct orientation -- for a chemical reaction to proceed to product. An enzyme's entire catalytic mechanism, lowering the activation energy, works by stabilising this transition state, making it easier and faster to reach than it would be uncatalysed.

## answer_c
Activation state

## explanation_c
Incorrect. 'Activation state' is not the standard term either; 'activation energy' (Ea) is the energy barrier associated with reaching the transition state, but the state itself is termed the transition state, not the 'activation state'.

## answer_d
None of the above

## explanation_d
Incorrect. Since 'transition state' is itself a correct and standard term for this phenomenon, 'none of the above' cannot be correct.

## topic
Enzymes

## subtopic
Enzyme kinetics

## main_concept
CON-FND-5846431203789F

## concept_ids
CON-FND-5846431203789F

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
1

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
AU_Y1=0.35

## years
AU_Y1

## universities
au

## module

## module_subject
AU-MED-102 > Biochemistry > Enzymology

## question_only_for

## library_ids
ART-FND-AU-MED-102-ENZYMOLOGY

## resource_ids
src_9929d079ddfd6e073223

## learning_objective
Define the transition state as the high-energy state a reaction must pass through, which enzyme catalysis stabilises.

## source_citation
Alexandria University AU-MED-102 Biochemistry department, Enzymes MCQ bank, Dr. Mohamed Agha ("The Genius in Biochemistry").

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer table, Enzymes MCQ Q25 = b
au: Enzymes MCQ bank p.6 Q25
Tests CON-FND-5846431203789F (Kasr 102-INT, HIT-LIVE), overlaid in pending-live/AU-MED-102-biochem-enzymology-overlays.md. Apply after that overlay.

---

# Item

## id
QST-FND-AU-102-ENZ-PENDING-008

## title
The active site of an enzyme is:

## question
The active site of an enzyme is best described as:

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
The amino terminal of the polypeptide chain

## explanation_a
Incorrect. The amino terminal is simply the first end of the polypeptide chain (wherever it happens to fold to); it is not, by definition, where substrate binds.

## answer_b
The site of prosthetic group attachment

## explanation_b
Incorrect. A prosthetic group binds at a specific cofactor-binding location, which may be near but is not synonymous with the substrate-binding active site itself.

## answer_c
The site of substrate attachment

## explanation_c
Correct. The active site is, by definition, the specific three-dimensional region of the enzyme where substrate binds and where the catalytic chemistry -- lowering the activation energy to convert substrate to product -- actually takes place. Its shape and chemical environment are what give the enzyme its substrate specificity.

## answer_d
The carboxy terminal of the polypeptide chain

## explanation_d
Incorrect. The carboxy terminal is simply the other end of the polypeptide chain; like the amino terminal, it is not defined as the substrate-binding location.

## topic
Enzymes

## subtopic
Enzyme kinetics

## main_concept
CON-FND-5846431203789F

## concept_ids
CON-FND-5846431203789F

## contextual_concept_ids

## difficulty
Easy

## question_type
Recall

## cognitive_effort
Low

## cognitive_effort_score
0.2

## setting
Academic

## reasoning_level
1

## inferred_difficulty
75

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
AU_Y1=0.35

## years
AU_Y1

## universities
au

## module

## module_subject
AU-MED-102 > Biochemistry > Enzymology

## question_only_for

## library_ids
ART-FND-AU-MED-102-ENZYMOLOGY

## resource_ids
src_9929d079ddfd6e073223

## learning_objective
Define the active site as the region of an enzyme where substrate binds.

## source_citation
Alexandria University AU-MED-102 Biochemistry department, Enzymes MCQ bank, Dr. Mohamed Agha ("The Genius in Biochemistry").

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer table, Enzymes MCQ Q27 = c
au: Enzymes MCQ bank p.6 Q27
Tests CON-FND-5846431203789F (Kasr 102-INT, HIT-LIVE), overlaid in pending-live/AU-MED-102-biochem-enzymology-overlays.md. Apply after that overlay.

---

# Item

## id
QST-FND-AU-102-ENZ-PENDING-009

## title
The Km value of an enzyme is:

## question
The Km value of an enzyme is defined as:

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
A

## answer_a
The substrate concentration at half maximal velocity

## explanation_a
Correct. Km is defined as the substrate concentration that produces half of the maximal reaction velocity (Vmax) -- it is a substrate-concentration value read directly off the velocity-versus-substrate-concentration curve at the point where velocity equals half of Vmax. A smaller Km indicates the enzyme reaches half-maximal velocity at a lower substrate concentration, meaning higher substrate affinity.

## answer_b
Half the substrate concentration at maximal velocity

## explanation_b
Incorrect. This subtly inverts the definition -- Km is the substrate concentration AT half-maximal velocity, not half of the substrate concentration needed to reach the (full) maximal velocity; these are not mathematically the same quantity.

## answer_c
Dissociation constant of the enzyme-substrate complex

## explanation_c
Incorrect. While Km is numerically related to substrate-binding affinity under simplifying assumptions, it is not itself defined as, or equal to, the formal dissociation constant of the enzyme-substrate complex in general (that distinction matters at a more advanced kinetics level).

## answer_d
The total enzyme concentration

## explanation_d
Incorrect. Km is a substrate-concentration value, not a measure of how much enzyme is present -- enzyme concentration instead determines Vmax, not Km.

## topic
Enzymes

## subtopic
Enzyme kinetics

## main_concept
CON-FND-028C50A610B2A2

## concept_ids
CON-FND-028C50A610B2A2

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
1

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
AU_Y1=0.35

## years
AU_Y1

## universities
au

## module

## module_subject
AU-MED-102 > Biochemistry > Enzymology

## question_only_for

## library_ids
ART-FND-AU-MED-102-ENZYMOLOGY

## resource_ids
src_9929d079ddfd6e073223

## learning_objective
Define Km as the substrate concentration giving half-maximal velocity.

## source_citation
Alexandria University AU-MED-102 Biochemistry department, Enzymes MCQ bank, Dr. Mohamed Agha ("The Genius in Biochemistry").

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer table, Enzymes MCQ Q10 = a
au: Enzymes MCQ bank p.3 Q10
Tests CON-FND-028C50A610B2A2 (Kasr 102-INT, HIT-LIVE), overlaid in pending-live/AU-MED-102-biochem-enzymology-overlays.md. Apply after that overlay.

---

# Item

## id
QST-FND-AU-102-ENZ-PENDING-011

## title
Enzymes which are synthesized in an inactive form are called:

## question
Enzymes which are synthesised in an inactive form are called:

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
D

## answer_a
Co-enzymes

## explanation_a
Incorrect. A coenzyme is a small, non-protein organic cofactor, not an inactive precursor form of the enzyme protein itself.

## answer_b
Apo-enzymes

## explanation_b
Incorrect. An apoenzyme is the catalytically inactive protein-only portion of an enzyme still missing its cofactor -- a related but distinct idea from a zymogen, which is inactive because a masking segment of its own chain has not yet been proteolytically removed, cofactor or no cofactor.

## answer_c
Lysozymes

## explanation_c
Incorrect. Lysozyme is the name of one specific bacteriolytic enzyme, not a general term for enzymes synthesised in inactive form.

## answer_d
Zymogens

## explanation_d
Correct. A zymogen (or proenzyme) is an inactive precursor form in which an enzyme is initially synthesised; it is activated by proteolytic cleavage that removes the segment of the chain masking the active site. Pepsinogen becoming pepsin -- an autocatalytic activation, since pepsin can activate more pepsinogen once a small amount is formed -- is the classic worked example of this mechanism.

## topic
Enzymes

## subtopic
Enzyme kinetics

## main_concept
CON-FND-F6E154FA6FF42A

## concept_ids
CON-FND-F6E154FA6FF42A

## contextual_concept_ids

## difficulty
Easy

## question_type
Recall

## cognitive_effort
Low

## cognitive_effort_score
0.2

## setting
Academic

## reasoning_level
1

## inferred_difficulty
75

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
AU_Y1=0.35

## years
AU_Y1

## universities
au

## module

## module_subject
AU-MED-102 > Biochemistry > Enzymology

## question_only_for

## library_ids
ART-FND-AU-MED-102-ENZYMOLOGY

## resource_ids
src_9929d079ddfd6e073223

## learning_objective
Define a zymogen as an inactive enzyme precursor, activated by proteolysis (e.g. pepsinogen to pepsin).

## source_citation
Alexandria University AU-MED-102 Biochemistry department, Enzymes MCQ bank, Dr. Mohamed Agha ("The Genius in Biochemistry").

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer table, Enzymes MCQ Q11 = d
au: Enzymes MCQ bank p.3 Q11
Tests CON-FND-F6E154FA6FF42A (Kasr 102-INT, HIT-LIVE), overlaid in pending-live/AU-MED-102-biochem-enzymology-overlays.md. Apply after that overlay.

---

# Item

## id
QST-FND-AU-102-ENZ-PENDING-012

## title
In competitive inhibition:

## question
Which of the following is true of a competitive inhibitor?

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
A

## answer_a
The inhibitor has structural similarity to the substrate

## explanation_a
Correct. A competitive inhibitor works precisely because it structurally resembles the enzyme's true substrate closely enough to occupy the active site itself, competing directly with substrate for that same physical space. This structural mimicry is the defining feature that separates competitive inhibition from every other inhibition type, and is exactly why raising substrate concentration can out-compete and overcome a competitive inhibitor's effect.

## answer_b
Km is decreased

## explanation_b
Incorrect. Km is increased, not decreased, in competitive inhibition -- more substrate is needed to reach half-maximal velocity because the inhibitor is competing for the same site.

## answer_c
Vmax is decreased

## explanation_c
Incorrect. Vmax is unchanged (not decreased) in competitive inhibition -- given enough substrate to out-compete the inhibitor, the same maximal velocity is still reachable.

## answer_d
Reaction rate is independent of substrate concentration

## explanation_d
Incorrect. Reaction rate in competitive inhibition is very much dependent on substrate concentration -- raising substrate concentration is specifically what overcomes the inhibitor's effect, the opposite of independence.

## topic
Enzymes

## subtopic
Enzyme kinetics

## main_concept
CON-FND-CB8584ED2F3C49

## concept_ids
CON-FND-CB8584ED2F3C49

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
1

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
AU_Y1=0.35

## years
AU_Y1

## universities
au

## module

## module_subject
AU-MED-102 > Biochemistry > Enzymology

## question_only_for

## library_ids
ART-FND-AU-MED-102-ENZYMOLOGY

## resource_ids
src_9929d079ddfd6e073223

## learning_objective
State that a competitive inhibitor is structurally similar to the substrate and competes for the active site.

## source_citation
Alexandria University AU-MED-102 Biochemistry department, Enzymes MCQ bank, Dr. Mohamed Agha ("The Genius in Biochemistry").

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer table, Enzymes MCQ Q12 = a
au: Enzymes MCQ bank p.3 Q12
Tests CON-FND-CB8584ED2F3C49 (Kasr 102-INT, HIT-LIVE), overlaid in pending-live/AU-MED-102-biochem-enzymology-overlays.md. Apply after that overlay.

---

# Item

## id
QST-FND-AU-102-ENZ-PENDING-013

## title
All of the following are true regarding isoenzymes EXCEPT:

## question
All of the following are true regarding isoenzymes EXCEPT:

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
A

## answer_a
They have identical polypeptide chains

## explanation_a
Correct. Isoenzymes have DIFFERENT, not identical, polypeptide chains/amino acid sequences -- that structural difference is exactly what defines them as isoenzymes in the first place, even though they catalyse the same reaction. Having 'identical polypeptide chains' would instead describe the same enzyme, not distinct isoenzymes of it.

## answer_b
They have different affinity for the substrate

## explanation_b
Incorrect (i.e. this IS true of isoenzymes). Because their structures differ, isoenzymes commonly do have different affinities for the same substrate -- this is one of the functional differences that follows from their structural difference.

## answer_c
They can be separated by electrophoresis

## explanation_c
Incorrect (i.e. this IS true of isoenzymes). Because isoenzymes differ in amino acid composition and charge, they migrate differently and can be separated by electrophoresis -- this is exactly how the clinically useful LDH and CK isoenzyme patterns are distinguished in the lab.

## answer_d
They are present in different cells (tissues)

## explanation_d
Incorrect (i.e. this IS true of isoenzymes). Isoenzymes are characteristically distributed differently across tissues, which is precisely what makes a particular isoenzyme's rise in plasma diagnostically useful for locating tissue damage.

## topic
Enzymes

## subtopic
Clinical enzymology

## main_concept
CON-FND-DD3EE5EC8C07D1

## concept_ids
CON-FND-DD3EE5EC8C07D1

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
1

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
AU_Y1=0.35

## years
AU_Y1

## universities
au

## module

## module_subject
AU-MED-102 > Biochemistry > Enzymology

## question_only_for

## library_ids
ART-FND-AU-MED-102-ENZYMOLOGY

## resource_ids
src_9929d079ddfd6e073223

## learning_objective
Identify that isoenzymes have different, not identical, polypeptide chains despite catalysing the same reaction.

## source_citation
Alexandria University AU-MED-102 Biochemistry department, Enzymes MCQ bank, Dr. Mohamed Agha ("The Genius in Biochemistry").

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer table, Enzymes MCQ Q15 = a
au: Enzymes MCQ bank p.4 Q15
Tests CON-FND-DD3EE5EC8C07D1 (Kasr 102-INT, HIT-LIVE, LDH/CK isoenzyme ruling 2026-08-27), overlaid in pending-live/AU-MED-102-biochem-enzymology-overlays.md. Apply after that overlay.

---

# Item

## id
QST-FND-AU-102-ENZ-PENDING-014

## title
Isoenzymes are enzymes with a different amino acid sequence but the same:

## question
Isoenzymes are enzymes with different amino acid sequences but the same:

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Tissue

## explanation_a
Incorrect. Isoenzymes are characteristically found in DIFFERENT tissues, not the same tissue -- that tissue-specific distribution is exactly what makes them diagnostically useful.

## answer_b
Function

## explanation_b
Correct. Isoenzymes, by definition, differ in amino acid sequence (and often in tissue distribution, quaternary structure and electrophoretic pattern) yet catalyse the same reaction -- the same function is the one property they all share despite these structural differences. LDH's five isoenzymes and CK's three are the worked examples: same catalytic reaction, different subunit composition and tissue source.

## answer_c
Quaternary structure

## explanation_c
Incorrect. Isoenzymes commonly have DIFFERENT quaternary structure (different subunit compositions, e.g. LDH's H4/H3M/H2M2/HM3/M4 combinations), not the same quaternary structure.

## answer_d
Electrophoretic pattern

## explanation_d
Incorrect. Isoenzymes have DIFFERENT electrophoretic patterns -- that is precisely how they are distinguished and identified in the laboratory, not a shared property.

## topic
Enzymes

## subtopic
Clinical enzymology

## main_concept
CON-FND-DD3EE5EC8C07D1

## concept_ids
CON-FND-DD3EE5EC8C07D1

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
1

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
AU_Y1=0.35

## years
AU_Y1

## universities
au

## module

## module_subject
AU-MED-102 > Biochemistry > Enzymology

## question_only_for

## library_ids
ART-FND-AU-MED-102-ENZYMOLOGY

## resource_ids
src_9929d079ddfd6e073223

## learning_objective
State that isoenzymes share the same catalytic function despite differing in structure, tissue and electrophoretic pattern.

## source_citation
Alexandria University AU-MED-102 Biochemistry department, Enzymes MCQ bank, Dr. Mohamed Agha ("The Genius in Biochemistry").

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer table, Enzymes MCQ Q20 = b
au: Enzymes MCQ bank p.5 Q20
Tests CON-FND-DD3EE5EC8C07D1 (Kasr 102-INT, HIT-LIVE, LDH/CK isoenzyme ruling 2026-08-27), overlaid in pending-live/AU-MED-102-biochem-enzymology-overlays.md. Apply after that overlay.

---

# Item

## id
QST-FND-AU-102-ENZ-PENDING-015

## title
A 50-year-old man with sudden chest pain -- which LDH isoenzyme is expected to rise?

## question
A 50-year-old obese man presents to the emergency department with severe chest pain of sudden onset at rest. The doctor suspects heart disease and orders blood tests. Which isoenzyme of LDH would be expected to be abnormally increased in this patient?

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
LDH4

## explanation_a
Incorrect. LDH4 is not the isoenzyme classically associated with cardiac muscle damage.

## answer_b
LDH1

## explanation_b
Correct. LDH is a tetramer built of H (heart) and M (muscle) subunits, forming five tissue isoenzymes numbered LDH1 (H4, richest in H subunits) through LDH5 (M4, richest in M subunits). LDH1, being the isoenzyme richest in the heart-type (H) subunit, is the one classically elevated in myocardial infarction -- exactly the clinical picture this vignette describes (an obese, at-risk patient with sudden-onset chest pain at rest). This is the same tissue-distribution logic that makes LDH5 the isoenzyme that rises in liver disease instead.

## answer_c
LDH3

## explanation_c
Incorrect. LDH3 is intermediate in subunit composition and is not the isoenzyme classically tied to myocardial infarction.

## answer_d
LDH5

## explanation_d
Incorrect. LDH5 (M4, muscle/liver-type) is the isoenzyme that rises in liver disease, not myocardial infarction -- this option represents the opposite end of the LDH1-LDH5 tissue-distribution spectrum from the correct answer.

## topic
Enzymes

## subtopic
Clinical enzymology

## main_concept
CON-FND-DD3EE5EC8C07D1

## concept_ids
CON-FND-DD3EE5EC8C07D1

## contextual_concept_ids
CON-FND-CCE5DCCCB059AA

## difficulty
Hard

## question_type
Application

## cognitive_effort
High

## cognitive_effort_score
0.8

## setting
Academic

## reasoning_level
2

## inferred_difficulty
30

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
AU_Y1=0.35

## years
AU_Y1

## universities
au

## module

## module_subject
AU-MED-102 > Biochemistry > Enzymology

## question_only_for

## library_ids
ART-FND-AU-MED-102-ENZYMOLOGY

## resource_ids
src_9929d079ddfd6e073223

## learning_objective
Apply the LDH isoenzyme tissue-distribution pattern to a myocardial-infarction clinical vignette (LDH1 rises).

## source_citation
Alexandria University AU-MED-102 Biochemistry department, Enzymes MCQ bank, Dr. Mohamed Agha ("The Genius in Biochemistry").

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer table, Enzymes MCQ Q49 = b
au: Enzymes MCQ bank p.11 Q49
Tests CON-FND-DD3EE5EC8C07D1 (Kasr 102-INT, HIT-LIVE, LDH/CK isoenzyme ruling 2026-08-27), overlaid in pending-live/AU-MED-102-biochem-enzymology-overlays.md. Apply after that overlay.

---

# Item

## id
QST-FND-AU-102-ENZ-PENDING-016

## title
Chloride is an activator for:

## question
Chloride ion acts as an activator for which of the following enzymes?

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Trypsin

## explanation_a
Incorrect. Trypsin's activity is not the classic example of chloride-dependent activation tested at this level; trypsin is instead a worked example of protease specificity (cleaving at a basic amino acid's carboxyl side).

## answer_b
Salivary amylase

## explanation_b
Correct. Chloride ion is a positive activator (cofactor) of salivary amylase, raising its catalytic activity -- an activator being, in effect, the positive counterpart of the same cofactor-concentration factor that inhibitors act on negatively. This is a specific, frequently tested example of how a small ion can modulate an enzyme's rate without being a structural component of the active site itself.

## answer_c
Peroxidase

## explanation_c
Incorrect. Peroxidase is not the enzyme classically activated by chloride at this level; it instead uses hydrogen peroxide as its substrate/cofactor system.

## answer_d
Catalase

## explanation_d
Incorrect. Catalase similarly is not the chloride-activated example tested here; its function centres on breaking down hydrogen peroxide, unrelated to chloride activation.

## topic
Enzymes

## subtopic
Enzyme kinetics

## main_concept
CON-FND-F29934C070A94C

## concept_ids
CON-FND-F29934C070A94C

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
1

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
AU_Y1=0.35

## years
AU_Y1

## universities
au

## module

## module_subject
AU-MED-102 > Biochemistry > Enzymology

## question_only_for

## library_ids
ART-FND-AU-MED-102-ENZYMOLOGY

## resource_ids
src_9929d079ddfd6e073223

## learning_objective
Identify chloride as an activator of salivary amylase.

## source_citation
Alexandria University AU-MED-102 Biochemistry department, Enzymes MCQ bank, Dr. Mohamed Agha ("The Genius in Biochemistry").

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer table, Enzymes MCQ Q31 = b
au: Enzymes MCQ bank p.7 Q31
Tests CON-FND-F29934C070A94C (Kasr 102-INT, HIT-LIVE), overlaid in pending-live/AU-MED-102-biochem-enzymology-overlays.md. Apply after that overlay.

---

# Item

## id
QST-FND-AU-102-ENZ-PENDING-017

## title
What is the effect of vigorous shaking on enzyme activity?

## question
What is the effect of vigorous shaking (agitation) on enzyme activity?

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
A

## answer_a
Irreversibly inhibited (lowered activity)

## explanation_a
Correct. Vigorous shaking or agitation, like excess heat or extreme pH, is a physical stress that can denature an enzyme -- unfolding its three-dimensional structure and irreversibly destroying its catalytic activity, in the same broad category of rate-affecting physical factors as temperature. Once denatured this way, the enzyme's activity is lowered and does not spontaneously recover.

## answer_b
Increased enzyme activity

## explanation_b
Incorrect. Agitation does not increase enzyme activity; like excess heat, it is a denaturing physical stress that reduces activity, not enhances it.

## answer_c
No effect

## explanation_c
Incorrect. Vigorous shaking does have a measurable, negative effect on enzyme activity -- it is not neutral or inconsequential to the protein's structure.

## answer_d
Reversibly inhibited, restored by gentle mixing

## explanation_d
Incorrect. The denaturation caused by vigorous agitation is not simply and gently reversed by resuming calm handling -- once the protein's structure has unfolded from this kind of physical stress, the activity loss behaves as irreversible at this level of teaching, unlike, for example, a competitive inhibitor's effect, which is genuinely reversible by adding more substrate.

## topic
Enzymes

## subtopic
Enzyme kinetics

## main_concept
CON-FND-F29934C070A94C

## concept_ids
CON-FND-F29934C070A94C

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
1

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
AU_Y1=0.35

## years
AU_Y1

## universities
au

## module

## module_subject
AU-MED-102 > Biochemistry > Enzymology

## question_only_for

## library_ids
ART-FND-AU-MED-102-ENZYMOLOGY

## resource_ids
src_9929d079ddfd6e073223

## learning_objective
State that vigorous agitation, like excess heat, denatures an enzyme and lowers its activity irreversibly.

## source_citation
Alexandria University AU-MED-102 Biochemistry department, Enzymes MCQ bank, Dr. Mohamed Agha ("The Genius in Biochemistry").

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer table, Enzymes MCQ Q52 = a
au: Enzymes MCQ bank p.11 Q52
Tests CON-FND-F29934C070A94C (Kasr 102-INT, HIT-LIVE), overlaid in pending-live/AU-MED-102-biochem-enzymology-overlays.md. Apply after that overlay.

---

# Item

## id
QST-FND-AU-102-ENZ-PENDING-018

## title
Why does enzyme activity increase when more substrate is added to an already-occurring enzyme reaction?

## question
Why is there increased enzyme activity when more substrate is added to an already-occurring enzyme reaction (below saturation)?

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
There is probably more product present than either enzyme or substrate

## explanation_a
Incorrect. The amount of product already formed does not explain why adding more substrate raises the rate; the relevant comparison is between enzyme and substrate availability, not product.

## answer_b
The enzyme-substrate complex is probably failing to form during the reaction

## explanation_b
Incorrect. Adding more substrate raising the rate implies the enzyme-substrate complex IS forming successfully and more of it forms as substrate rises -- the opposite of a failure to form the complex.

## answer_c
There is probably more enzyme available than there is substrate

## explanation_c
Correct. Below saturation, there is more enzyme available (active sites free) than there is substrate to fill them, so adding more substrate lets more of that spare enzyme capacity form productive enzyme-substrate complexes, raising the rate. This is exactly why the velocity-vs-substrate curve rises steeply at low substrate concentration and only flattens out (reaching Vmax) once substrate becomes so abundant that essentially every enzyme active site is already occupied.

## answer_d
There is probably more substrate present than there is enzyme

## explanation_d
Incorrect. 'More substrate present than enzyme' actually describes the saturating condition where adding still more substrate would NOT further raise the rate (Vmax has been reached) -- the opposite of the situation this question is asking about.

## topic
Enzymes

## subtopic
Enzyme kinetics

## main_concept
CON-FND-F29934C070A94C

## concept_ids
CON-FND-F29934C070A94C

## contextual_concept_ids
CON-FND-74B64897158273

## difficulty
Hard

## question_type
Application

## cognitive_effort
High

## cognitive_effort_score
0.8

## setting
Academic

## reasoning_level
2

## inferred_difficulty
30

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
AU_Y1=0.35

## years
AU_Y1

## universities
au

## module

## module_subject
AU-MED-102 > Biochemistry > Enzymology

## question_only_for

## library_ids
ART-FND-AU-MED-102-ENZYMOLOGY

## resource_ids
src_9929d079ddfd6e073223

## learning_objective
Explain the rising portion of the velocity-substrate curve as reflecting spare enzyme capacity relative to substrate.

## source_citation
Alexandria University AU-MED-102 Biochemistry department, Enzymes MCQ bank, Dr. Mohamed Agha ("The Genius in Biochemistry").

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer table, Enzymes MCQ Q56 = c
au: Enzymes MCQ bank p.12 Q56
Tests CON-FND-F29934C070A94C (Kasr 102-INT, HIT-LIVE), overlaid in pending-live/AU-MED-102-biochem-enzymology-overlays.md. Apply after that overlay.

---

# Item

## id
QST-FND-AU-102-ENZ-PENDING-019

## title
Regulation of enzyme activity by covalent modification involves addition or removal of which group?

## question
Regulation of enzyme activity by covalent modification involves addition or removal of which of the following groups?

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Coenzyme

## explanation_a
Incorrect. A coenzyme associates with an enzyme non-covalently (or, as a prosthetic group, tightly but not as a reversible on/off regulatory switch), so it is not the group whose addition/removal defines this covalent-modification regulatory mechanism.

## answer_b
Phosphate

## explanation_b
Correct. Reversible phosphorylation and dephosphorylation -- adding or removing a phosphate group, catalysed respectively by protein kinase and protein phosphatase -- is the classic covalent-modification mechanism of enzyme regulation. Depending on the specific enzyme, adding the phosphate group can either activate or inactivate it, which is why this mechanism can be found switching different enzymes in opposite directions across different pathways.

## answer_c
Sulphate

## explanation_c
Incorrect. Sulphate-group transfer is not the covalent modification classically tested as the mechanism regulating enzyme activity at this level.

## answer_d
Acetate

## explanation_d
Incorrect. Acetate-group transfer (acetylation) is a real post-translational modification of some proteins, but it is not the specific mechanism this bank's key selects for reversible enzyme-activity regulation here -- phosphorylation is the tested answer.

## topic
Enzymes

## subtopic
Enzyme regulation

## main_concept
CON-FND-6A58FA1680290F

## concept_ids
CON-FND-6A58FA1680290F

## contextual_concept_ids

## difficulty
Easy

## question_type
Recall

## cognitive_effort
Low

## cognitive_effort_score
0.2

## setting
Academic

## reasoning_level
1

## inferred_difficulty
75

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
AU_Y1=0.35

## years
AU_Y1

## universities
au

## module

## module_subject
AU-MED-102 > Biochemistry > Enzymology

## question_only_for

## library_ids
ART-FND-AU-MED-102-ENZYMOLOGY

## resource_ids
src_9929d079ddfd6e073223

## learning_objective
State that covalent-modification regulation of enzymes classically involves phosphate addition/removal.

## source_citation
Alexandria University AU-MED-102 Biochemistry department, Enzymes MCQ bank, Dr. Mohamed Agha ("The Genius in Biochemistry").

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer table, Enzymes MCQ Q61 = b
au: Enzymes MCQ bank p.13 Q61
Tests CON-FND-6A58FA1680290F (Kasr 102-INT, HIT-LIVE), overlaid in pending-live/AU-MED-102-biochem-enzymology-overlays.md. Apply after that overlay.
