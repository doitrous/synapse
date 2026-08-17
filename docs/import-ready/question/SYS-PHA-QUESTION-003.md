# Item

## id
QST-PHA-PKA-DEFINITION-001

## title
A weak acid drug has a pKa of 4. What does that value tell you?

## question
A weak acid drug has a pKa of 4. What does that value tell you?

## subject
pharm

## status
Draft

## owner
Dr. Omar

## vignette
Two weak acid drugs are compared. One has a pKa of 4 and the other a pKa of 7. A student is asked
what the number represents before considering how either behaves in the stomach.

## correct_answer
B

## answer_a
The pH at which the drug is completely ionised

## explanation_a
Incorrect, and it overstates the degree of ionisation. At its pKa a drug is **half** ionised, not
completely — the ionised and non-ionised forms are present in equal amounts. Complete ionisation is
approached only several pH units away from the pKa. This option picks the student who has correctly
linked pKa to a pH value but not to the 50:50 ratio that defines it.

## answer_b
The pH at which the drug is 50% ionised, since pKa is the negative logarithm of Ka

## explanation_b
Correct. **pKa equals the negative logarithm of Ka**, the acid dissociation constant — and its
practical meaning is that **at a pH equal to the pKa, the drug is exactly 50% ionised and 50%
non-ionised**.

Ka measures how readily an acid gives up a proton, so a **stronger** acid has a larger Ka and
therefore a **smaller** pKa. Taking the negative logarithm converts an unwieldy range of constants
into a single convenient number on the same scale as pH, which is why pKa rather than Ka is quoted
for drugs.

The reason this matters in pharmacology is that only the **non-ionised** form is appreciably
lipid-soluble and able to cross membranes by simple diffusion. The ionised form is surrounded by
water and is effectively excluded from the lipid bilayer. So the ratio of the two forms — set by the
difference between the local **pH** and the drug's **pKa** — controls absorption and excretion at
every site in the body.

The direction follows from Le Chatelier's principle rather than memorisation: **a weak acid is
non-ionised in an acidic medium**, because the surrounding protons suppress its dissociation, and
ionised in an alkaline one. A **weak base behaves oppositely**. Each pH unit away from the pKa
changes the ratio roughly tenfold, so a drug with a pKa of 4 in a stomach at pH 1 is overwhelmingly
non-ionised, while at plasma pH 7.4 it is overwhelmingly ionised.

Two standard applications follow. **Weak acids are absorbed from the stomach** to an appreciable
extent because they are non-ionised there — although the small intestine still dominates overall
absorption because of its vastly greater surface area. And **urinary pH can be manipulated to trap a
drug in the tubule**: alkalinising the urine ionises a weak acid, preventing its reabsorption and
accelerating its excretion in overdose.

## answer_c
The pH of the solution in which the drug was dissolved

## explanation_c
Incorrect. pKa is a **property of the drug molecule** and does not change with the solution it is
placed in; the pH of the solution is an independent variable. Confusing the two removes the entire
point of the concept, which is to compare a fixed molecular property against a variable environmental
pH in order to predict the ionisation ratio.

## answer_d
The proportion of the drug that reaches the systemic circulation unchanged

## explanation_d
Incorrect: that is **bioavailability**, a dimensionless fraction determined by absorption and
first-pass metabolism. It is influenced by ionisation, so the two are related — but pKa is a
physicochemical constant on the pH scale, while bioavailability is a percentage of an administered
dose. This option picks the student matching on "a number describing drug behaviour" without
checking what the number measures.

## answer_e
The pH at which the drug is most lipid-soluble

## explanation_e
Incorrect, and it points in the wrong direction. Effective lipid solubility is greatest where the
drug is **least ionised**, which for a weak acid means a pH well **below** its pKa, not at it. At the
pKa itself the drug is half ionised, so its lipid solubility is intermediate. This option correctly
connects pKa to lipid solubility and then locates the maximum at the wrong point on the pH scale.

## topic
Acids, bases and drug ionisation

## subtopic

## main_concept
CON-FND-B984AA153E7E66

## concept_ids
CON-FND-C0E41863BB113A

## contextual_concept_ids
CON-FND-E6BC7647754BFE

## difficulty
Moderate

## question_type
Pharmacology

## cognitive_effort
Medium

## cognitive_effort_score
0.55

## setting
Academic

## reasoning_level
3

## inferred_difficulty
58

## exam_relevance
9

## clinical_relevance
0.8

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.9

## years
KAU_Y1

## universities
kau

## module
108 INT

## question_only_for

## library_ids
ART-FND-TOP-008C54089F

## resource_ids
src_d98abbe78377e7262afc

## learning_objective
Define pKa as the negative logarithm of Ka and as the pH at which a drug is half ionised, and use
the pH–pKa relationship to predict the ionisation and membrane permeability of weak acids and bases.

## source_citation
Kasr Alainy 108 INT, Module 108 MCQs (Dr Moussa, VIP Academy, 2026), Section 1 Introduction and
passage across cell membrane, Q2 and Q5.

## attached_image

## attachments

## media_recommendations
### graph · Explanation for answer B
Brief: Percentage ionised plotted against pH for a weak acid of pKa 4 and a weak base of pKa 8, with
the 50% crossing point marked at each pKa, and the pH of stomach, small intestine, plasma and urine
marked as vertical lines
Purpose: The whole concept is a relationship between two positions on the pH scale. Seeing the 50%
crossing at the pKa, and where the body's compartments sit relative to it, converts the rule from
something recalled to something read off.
Priority: required
Status: needed
Source direction: openly licensed pharmacology teaching diagram, or draw to specification
Rights: must be CC-BY or public domain

## estimated_seconds
90

## randomise_answers
yes

## author_notes
Source poses this as a calculation (pKa 4 drug at pH 3, ratio of unionised to ionised). Re-expressed
as the definition first, because students who cannot state what pKa *is* cannot do the calculation
reliably; the ratio problem is covered by QST-PHA-IONISATION-RATIO-001 in this file. Distractors A
and E are the two near misses — complete rather than half ionisation, and maximum lipid solubility
at rather than below the pKa.

---

# Item

## id
QST-PHA-IONISATION-RATIO-001

## title
A weak acid with a pKa of 4 is placed in a solution of pH 3. What is the ratio of non-ionised to ionised drug?

## question
A weak acid with a pKa of 4 is placed in a solution of pH 3. What is the ratio of non-ionised to ionised drug?

## subject
pharm

## status
Draft

## owner
Dr. Omar

## vignette
A weak acid drug with a pKa of 4 is dissolved in gastric contents at pH 3.

## correct_answer
C

## answer_a
1:10

## explanation_a
Incorrect — this is the correct magnitude with the ratio inverted, and it is the commonest error on
this calculation. It would mean the drug is predominantly **ionised** at pH 3. But a weak acid in an
**acidic** medium is suppressed from dissociating by the surrounding protons, so it is predominantly
**non-ionised**. Writing the ratio the wrong way round reverses every conclusion about absorption
that follows from it.

## answer_b
1:1

## explanation_b
Incorrect. A 1:1 ratio occurs only when **pH equals pKa** — that is the definition of pKa. Here the
pH is 3 and the pKa is 4, so they differ by one unit and the two forms cannot be equal. This option
picks the student who remembers the 50:50 rule but does not check whether the condition for it is
satisfied.

## answer_c
10:1

## explanation_c
Correct. The ratio follows from the Henderson–Hasselbalch relationship, and for a weak acid the
useful form is:

**pH − pKa = log₁₀ ([ionised] / [non-ionised])**

Substituting: 3 − 4 = **−1**, so log₁₀([ionised]/[non-ionised]) = −1, giving
[ionised]/[non-ionised] = 10⁻¹ = 1/10. Inverting to the ratio the question asks for,
**non-ionised : ionised = 10 : 1**.

Two things make this reliable without memorising the formula's orientation. First, the arithmetic:
each **pH unit** of difference between pH and pKa changes the ratio by a factor of **ten**, so a
one-unit difference gives 10:1, two units 100:1, three units 1000:1. Second, and more important, a
**qualitative check on the direction**: a weak acid in an acid medium is mostly **non-ionised**. Since
pH 3 is more acidic than the pKa of 4, the non-ionised form must dominate — so the larger number
belongs to the non-ionised side. Doing the sum and then sanity-checking the direction catches the
inversion that produces option A.

The pharmacological consequence is direct. Only the **non-ionised** form is lipid-soluble enough to
cross membranes by simple diffusion, so at pH 3 about **91%** of this drug is in the absorbable form.
That is why weak acids such as aspirin are absorbed appreciably from the **stomach**, while weak
bases are not and are absorbed in the small intestine.

The same logic run in reverse is the basis of **ion trapping** in overdose: alkalinising the urine
raises tubular pH well above the pKa of a weak acid, converting it almost entirely to the ionised
form, which cannot be reabsorbed and is therefore excreted.

## answer_d
100:1

## explanation_d
Incorrect. 100:1 corresponds to a **two**-unit difference between pH and pKa, since each unit changes
the ratio tenfold. Here the difference is only one unit (pH 3 versus pKa 4), so the ratio is 10:1.
This option picks the student who has the direction and the tenfold rule right but has miscounted the
gap — or who has squared the factor rather than applying it once.

## answer_e
1:100

## explanation_e
Incorrect on both counts: the magnitude corresponds to a two-unit difference rather than one, and the
ratio is inverted so that the ionised form dominates. Both errors run against the stem — the pH and
pKa differ by one unit, and a weak acid in acid conditions is mainly non-ionised. This option
combines the mistakes in options A and D.

## topic
Acids, bases and drug ionisation

## subtopic

## main_concept
CON-FND-C0E41863BB113A

## concept_ids
CON-FND-B984AA153E7E66

## contextual_concept_ids
CON-FND-ADD586E767E034

## difficulty
Moderate

## question_type
Pharmacology

## cognitive_effort
Medium

## cognitive_effort_score
0.6

## setting
Academic

## reasoning_level
3

## inferred_difficulty
54

## exam_relevance
9

## clinical_relevance
0.8

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.9

## years
KAU_Y1

## universities
kau

## module
108 INT

## question_only_for

## library_ids
ART-FND-TOP-008C54089F

## resource_ids
src_d98abbe78377e7262afc

## learning_objective
Apply the Henderson–Hasselbalch relationship to calculate the ratio of non-ionised to ionised weak
acid at a given pH, and verify the direction using the rule that weak acids are non-ionised in acid.

## source_citation
Kasr Alainy 108 INT, Module 108 MCQs (Dr Moussa, VIP Academy, 2026), Section 1 Introduction and
passage across cell membrane, Q2.

## attached_image

## attachments

## media_recommendations
### graph · Explanation for answer C
Brief: Percentage ionised against pH for a weak acid of pKa 4, with pH 3 marked and the 91%
non-ionised / 9% ionised split annotated, and the tenfold-per-pH-unit steps labelled either side of
the pKa
Purpose: Options A, C, D and E are four ratios from the same relationship. Marking the working point
on the curve and labelling the tenfold steps lets a student check both the magnitude and the
direction, which is where all four differ.
Priority: strongly helpful
Status: needed
Source direction: openly licensed pharmacology teaching diagram, or draw to specification
Rights: must be CC-BY or public domain

## estimated_seconds
100

## randomise_answers
yes

## author_notes
Taken directly from the source's Q2, with its four options retained where they represent real errors
and a fifth added (1:100) to cover the combined inversion-plus-miscount. The worked explanation
deliberately teaches the qualitative direction check alongside the arithmetic, because the inversion
in option A is the error students make under time pressure even when they can state the formula.

---

# Item

## id
QST-PHA-ACID-BASE-DEFINITION-001

## title
On the Brønsted–Lowry definition, what makes a substance an acid?

## question
On the Brønsted–Lowry definition, what makes a substance an acid?

## subject
pharm

## status
Draft

## owner
Dr. Omar

## vignette
A student is asked to define an acid, and answers that an acid is a substance that turns litmus red
and tastes sour.

## correct_answer
A

## answer_a
It donates a proton

## explanation_a
Correct. A **Brønsted–Lowry acid donates a proton**; a **Brønsted–Lowry base accepts** one. In
aqueous **Arrhenius** terms the same substances are described by their effect on ion concentrations —
an acid increases hydrogen-ion concentration, a base increases hydroxide-ion concentration.

The proton-transfer definition is the more useful of the two in pharmacology, for two reasons.

**It explains drug ionisation.** A weak acid drug exists in equilibrium between a protonated,
**non-ionised** form and a deprotonated, **ionised** form. Whether it donates its proton depends on
the surrounding hydrogen-ion concentration — that is, on the **pH** — relative to its **pKa**. Since
only the non-ionised form crosses membranes readily, proton donation is what determines absorption.
A weak base works in reverse: it **accepts** a proton to become ionised, so it is ionised in acid and
non-ionised in alkali.

**It defines conjugate pairs.** When an acid donates its proton, what remains is its **conjugate
base**, and the two differ by exactly that proton. This is why buffers work: a weak acid and its
conjugate base together resist pH change, because whichever direction the pH is pushed, one member of
the pair absorbs or releases protons to oppose it.

The **strength** of an acid or base is expressed by **Ka and Kb** respectively — how far the
dissociation equilibrium lies towards the ionised form. A larger Ka, and hence a smaller pKa, means a
stronger acid. "Strong" and "weak" therefore describe the *extent of dissociation*, not the
concentration of a solution: a concentrated solution of a weak acid and a dilute solution of a strong
acid are different things, which is a distinction the litmus-and-taste description in the vignette
cannot make.

## answer_b
It accepts a proton

## explanation_b
Incorrect — this defines a **base**, not an acid. The two halves of the Brønsted–Lowry definition are
mirror images, and transposing them inverts every subsequent prediction: a student holding this will
expect weak acids to be ionised in acidic media and will get the direction of drug absorption and ion
trapping backwards. Fixing which way round the pair goes is the whole value of the definition.

## answer_c
It increases the hydroxide-ion concentration of an aqueous solution

## explanation_c
Incorrect. Raising hydroxide-ion concentration is the **Arrhenius definition of a base**. This option
mixes the two frameworks and takes the wrong member of the pair: the Arrhenius description of an
**acid** is that it increases hydrogen-ion concentration. It is worth noting that in water the two are
inversely linked — their product is fixed — so raising hydroxide necessarily *lowers* hydrogen ion,
which is the opposite of acidic behaviour.

## answer_d
It has a pH below 7 at 25°C

## explanation_d
Incorrect, because it confuses a property of a **solution** with a property of a **substance**. A
solution is acidic when its pH is below 7 at 25°C, but pH describes the solution's composition, not
what makes the dissolved substance an acid — and the same acid produces different pH values at
different concentrations. The definition has to be about proton transfer, which is a property of the
molecule.

## answer_e
It dissociates completely in aqueous solution

## explanation_e
Incorrect, because it describes only **strong** acids. Complete dissociation is one end of a spectrum;
**weak** acids dissociate only partially and are acids nonetheless. Insisting on complete dissociation
would exclude almost every acidic drug, since the pharmacologically interesting ones are precisely
those that are partly ionised at physiological pH — which is what makes their behaviour pH-dependent.

## topic
Acids, bases and drug ionisation

## subtopic

## main_concept
CON-FND-C580DAFC89ED2A

## concept_ids
CON-FND-7A13EADDDC6F2B

## contextual_concept_ids
CON-FND-C0E41863BB113A

## difficulty
Easy

## question_type
Pharmacology

## cognitive_effort
Low

## cognitive_effort_score
0.3

## setting
Academic

## reasoning_level
1

## inferred_difficulty
74

## exam_relevance
8

## clinical_relevance
0.6

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
108 INT

## question_only_for

## library_ids
ART-FND-TOP-008C54089F

## resource_ids
src_d98abbe78377e7262afc

## learning_objective
State the Brønsted–Lowry definitions of acid and base as proton donor and acceptor, distinguish them
from the Arrhenius descriptions, and separate acid strength from solution concentration.

## source_citation
Kasr Alainy 108 INT, Module 108 MCQs (Dr Moussa, VIP Academy, 2026), Section 1 Introduction and
passage across cell membrane.

## attached_image

## attachments

## media_recommendations
### diagram · Explanation for answer A
Brief: A conjugate acid–base pair shown transferring a proton, with the acid losing H⁺ to become its
conjugate base and the reverse reaction drawn alongside, annotated with how a weak acid drug's
ionised and non-ionised forms map onto the pair
Purpose: Proton transfer is a process between two species, and the link to a drug's ionised and
non-ionised forms is the reason the definition matters here. One diagram carries both, where prose
separates the chemistry from the pharmacology.
Priority: optional
Status: needed
Source direction: openly licensed chemistry or pharmacology teaching diagram
Rights: must be CC-BY or public domain

## estimated_seconds
60

## randomise_answers
yes

## author_notes
Graded Easy and included for bank-mix balance. The vignette's litmus-and-taste answer sets up the
distinction the item tests — an operational description versus a mechanistic definition — and lets
distractor D (a property of the solution) and E (strong acids only) each be wrong for a statable
reason. Option B is the straight transposition, which matters because it reverses every ionisation
prediction downstream.

---

# Item

## id
QST-PHA-PH-DEFINITION-001

## title
A solution's hydrogen-ion concentration falls from 10⁻⁴ to 10⁻⁶ mol/L. What happens to its pH?

## question
A solution's hydrogen-ion concentration falls from 10⁻⁴ to 10⁻⁶ mol/L. What happens to its pH?

## subject
pharm

## status
Draft

## owner
Dr. Omar

## vignette
A solution is diluted and buffered so that its hydrogen-ion concentration falls hundredfold, from
10⁻⁴ to 10⁻⁶ mol/L, at 25°C.

## correct_answer
D

## answer_a
It falls from 4 to 2, since the solution has become more acidic

## explanation_a
Incorrect on both the direction of the pH change and the direction of the acidity change. Because pH
is a **negative** logarithm, a **fall** in hydrogen-ion concentration produces a **rise** in pH — the
scale runs opposite to the concentration. And a solution with fewer hydrogen ions is **less** acidic,
not more. This option makes the sign error twice, which is why it superficially looks self-consistent.

## answer_b
It rises from 4 to 6, and the solution has become more acidic

## explanation_b
Incorrect in its second clause only, which makes it the closest wrong answer. The arithmetic is
right — pH does rise from 4 to 6 — but a rising pH means the solution is becoming **less** acidic, or
more alkaline. Hydrogen-ion concentration has fallen a hundredfold, so acidity has fallen with it.
This option catches the student who can do the logarithm but has not internalised that the pH scale
is inverted relative to acidity.

## answer_c
It rises from 4 to 6, and the hydroxide-ion concentration is unchanged

## explanation_c
Incorrect in its second clause. In water the two ion concentrations are **inversely linked**: their
product is approximately **10⁻¹⁴** at 25°C, so a hundredfold **fall** in hydrogen ion requires a
hundredfold **rise** in hydroxide ion, from 10⁻¹⁰ to 10⁻⁸ mol/L. They cannot move independently. This
option gets the pH right and then treats the two ions as unrelated.

## answer_d
It rises from 4 to 6, and the solution has become less acidic

## explanation_d
Correct. **pH is the negative base-10 logarithm of hydrogen-ion activity**, so

pH = −log₁₀[H⁺]: at 10⁻⁴ mol/L, pH = **4**; at 10⁻⁶ mol/L, pH = **6**.

Three features of the scale follow from that definition and account for every distractor here.

**It is inverted.** Because the logarithm is negated, a **falling** hydrogen-ion concentration gives a
**rising** pH. High pH therefore means *few* hydrogen ions.

**It is logarithmic.** Each pH unit is a **tenfold** change in concentration, so the two-unit rise here
corresponds to the hundredfold fall given. This is why small pH changes are physiologically large: an
arterial pH moving from 7.4 to 7.1 is a doubling of hydrogen-ion concentration.

**Acidity tracks hydrogen ion, not pH number.** A solution is **acidic** when pH is below 7 and
hydrogen-ion activity exceeds hydroxide-ion activity; **basic** when pH is above 7 and hydroxide
exceeds hydrogen; and **neutral** at pH 7, where the two are equal. So this solution, moving from pH
4 to pH 6, remains acidic throughout but is markedly **less** acidic than it was.

Two further relations complete the picture. **pH + pOH ≈ 14** for dilute aqueous solutions at 25°C,
where **pOH is the negative logarithm of hydroxide-ion activity** — so this solution's pOH falls from
10 to 8. And **increasing hydrogen-ion concentration decreases hydroxide-ion concentration**, because
their product stays near 10⁻¹⁴.

One qualification worth carrying: **neutrality is not always exactly pH 7**. Pure water is neutral
because hydrogen- and hydroxide-ion activities are equal, but the ionisation of water changes with
temperature, so the neutral pH shifts slightly away from 7 at body temperature.

## answer_e
It cannot be determined without knowing the hydroxide-ion concentration

## explanation_e
Incorrect. pH is defined **solely** by hydrogen-ion activity, so the value given is sufficient. The
hydroxide-ion concentration can in fact be *derived* from it, since the two are linked by the ion
product of water — so far from being missing information, it is redundant. This option treats two
interdependent quantities as independent unknowns.

## topic
Acids, bases and pH

## subtopic

## main_concept
CON-FND-454CB40359E468

## concept_ids
CON-FND-FBAA90D61BE8AB

## contextual_concept_ids
CON-FND-ADD586E767E034

## difficulty
Easy

## question_type
Pharmacology

## cognitive_effort
Low

## cognitive_effort_score
0.35

## setting
Academic

## reasoning_level
2

## inferred_difficulty
71

## exam_relevance
8

## clinical_relevance
0.7

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
108 INT

## question_only_for

## library_ids
ART-FND-TOP-008C54089F

## resource_ids
src_d98abbe78377e7262afc

## learning_objective
Calculate pH from hydrogen-ion concentration, and state that the scale is inverted and logarithmic so
that a falling hydrogen-ion concentration raises pH and reduces acidity.

## source_citation
Kasr Alainy 108 INT, Module 108 MCQs (Dr Moussa, VIP Academy, 2026), Section 1 Introduction and
passage across cell membrane; Acids, bases and pH as taught in the 108 module.

## attached_image

## attachments

## media_recommendations
### graph · Explanation for answer D
Brief: A pH scale from 0 to 14 with hydrogen-ion and hydroxide-ion concentrations shown on parallel
axes beneath it, the two moving in opposite directions, the product 10⁻¹⁴ annotated, and the working
points at pH 4 and pH 6 marked
Purpose: Distractors C and E treat the two ion concentrations as independent. Showing them on
opposing axes with a fixed product makes the inverse coupling visible and shows why one value
determines the other.
Priority: strongly helpful
Status: needed
Source direction: openly licensed chemistry teaching diagram, or draw to specification
Rights: must be CC-BY or public domain

## estimated_seconds
70

## randomise_answers
yes

## author_notes
Graded Easy, for bank-mix balance. Each option pairs a pH value with a claim about the solution, so
both halves are graded and distractor B can be the "arithmetic right, meaning wrong" near miss — the
inverted-scale error that persists well past first year. The temperature qualification on neutrality
is included because the live concept states it explicitly and a bare "neutral = pH 7" would
contradict the library.

---

# Item

## id
QST-PHA-POH-RELATION-001

## title
A solution has a pOH of 10 at 25°C. Is it acidic, and what is its hydrogen-ion concentration?

## question
A solution has a pOH of 10 at 25°C. Is it acidic, and what is its hydrogen-ion concentration?

## subject
pharm

## status
Draft

## owner
Dr. Omar

## vignette
A dilute aqueous solution at 25°C is measured and found to have a pOH of 10.

## correct_answer
B

## answer_a
Basic, with a hydrogen-ion concentration of 10⁻¹⁰ mol/L

## explanation_a
Incorrect, and it makes the error of reading pOH as though it were pH. A pOH of 10 corresponds to a
**pH of 4**, not 10, because the two sum to about 14 — so the solution is **acidic**, and its
hydrogen-ion concentration is 10⁻⁴ mol/L. The value 10⁻¹⁰ mol/L is in fact the **hydroxide**-ion
concentration here. This option transposes both the acid–base conclusion and the ion.

## answer_b
Acidic, with a hydrogen-ion concentration of 10⁻⁴ mol/L

## explanation_b
Correct. Two relationships are needed, and both are worth holding explicitly.

**pOH is the negative base-10 logarithm of hydroxide-ion activity**, so a pOH of 10 means
[OH⁻] = 10⁻¹⁰ mol/L.

**For dilute aqueous solutions at 25°C, pH + pOH ≈ 14.** So pH = 14 − 10 = **4**, and therefore
[H⁺] = 10⁻⁴ mol/L.

Since pH 4 is **below 7**, the solution is **acidic** — hydrogen-ion activity (10⁻⁴) exceeds
hydroxide-ion activity (10⁻¹⁰), which is the defining condition.

The reason pH and pOH sum to a constant is the **ion product of water**: increasing hydrogen-ion
concentration decreases hydroxide-ion concentration, because their product remains approximately
**10⁻¹⁴**. Check it here: 10⁻⁴ × 10⁻¹⁰ = 10⁻¹⁴. Taking negative logarithms of both sides of that
product turns the multiplication into the addition pH + pOH ≈ 14.

The practical point is that **either value determines the other**, so a solution's acid–base status
can be established from whichever was measured. The trap this question is built around is that a
**high pOH means an acidic solution** — the pOH scale runs opposite to the pH scale, which itself
already runs opposite to hydrogen-ion concentration. Two inversions catch students out, and the safe
method is always to convert to pH first and then judge acidity against 7.

Note the conditions attached to these constants: the value 14 and the neutral point of 7 both apply
to **dilute aqueous solutions at 25°C**. Because the ionisation of water is temperature-dependent, the
ion product and hence the neutral pH shift slightly at body temperature.

## answer_c
Acidic, with a hydrogen-ion concentration of 10⁻¹⁰ mol/L

## explanation_c
Incorrect in the concentration, though the conclusion is right — which makes this the near miss.
10⁻¹⁰ mol/L is the **hydroxide**-ion concentration, read directly from the pOH of 10. The
hydrogen-ion concentration is 10⁻⁴ mol/L, obtained by converting to pH first. The option is
internally inconsistent: a hydrogen-ion concentration of 10⁻¹⁰ mol/L would give pH 10 and an alkaline
solution, contradicting its own first word.

## answer_d
Neutral, since pOH of 10 and pH of 10 balance at the ion product

## explanation_d
Incorrect. Neutrality requires **equal** hydrogen- and hydroxide-ion activities, which at 25°C means
**pH = pOH = 7**, not both equal to 10 — and pH and pOH cannot both be 10, since they must sum to
about 14. The option misapplies the idea of balance: the ion product is always satisfied in any
aqueous solution, acidic or alkaline, so satisfying it is not evidence of neutrality.

## answer_e
Basic, with a hydroxide-ion concentration of 10⁻⁴ mol/L

## explanation_e
Incorrect on both counts, and it is the full transposition of the correct answer. A pOH of 10 gives a
hydroxide-ion concentration of 10⁻¹⁰ mol/L, not 10⁻⁴; 10⁻⁴ mol/L is the **hydrogen**-ion
concentration. And because hydroxide is the scarcer ion here, the solution is acidic rather than
basic. This option swaps the two ions and inverts the conclusion accordingly.

## topic
Acids, bases and pH

## subtopic

## main_concept
CON-FND-13363AFA5239CE

## concept_ids
CON-FND-48E1C0E33B1DD3

## contextual_concept_ids
CON-FND-0E928D053BCD48

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
60

## exam_relevance
7

## clinical_relevance
0.6

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.75

## years
KAU_Y1

## universities
kau

## module
108 INT

## question_only_for

## library_ids
ART-FND-TOP-008C54089F

## resource_ids
src_d98abbe78377e7262afc

## learning_objective
Convert between pOH, pH and ion concentrations using pH + pOH ≈ 14 and the ion product of water, and
determine acid–base status from a pOH value.

## source_citation
Kasr Alainy 108 INT, Acids, bases and pH as taught in the 108 module; Module 108 MCQs (Dr Moussa,
VIP Academy, 2026), Section 1.

## attached_image

## attachments

## media_recommendations
### diagram · Explanation for answer B
Brief: A conversion chart linking pOH, pH, hydroxide-ion concentration and hydrogen-ion
concentration for one solution, with arrows showing pOH 10 → pH 4 → [H⁺] 10⁻⁴ and the ion product
10⁻¹⁴ verified at the bottom
Purpose: Every distractor here is a wrong step in the same conversion chain. Laying the chain out
with each arrow labelled is what lets a student see which step they skipped, rather than simply
being told the answer.
Priority: strongly helpful
Status: needed
Source direction: openly licensed chemistry teaching diagram, or draw to specification
Rights: must be CC-BY or public domain

## estimated_seconds
85

## randomise_answers
yes

## author_notes
Built from two live concepts (definition of pOH; pH + pOH = 14) as a conversion problem, because the
double inversion — high pOH meaning acidic — is the specific trap and cannot be tested by asking for
either definition alone. Options are constructed as the four distinct errors in the chain: reading
pOH as pH (A), stopping at the hydroxide concentration (C), misusing the ion product as evidence of
neutrality (D), and swapping the ions entirely (E).

---

# Item

## id
QST-PHA-NEUTRAL-SOLUTION-001

## title
Why is pure water described as neutral, and is that the same as saying its pH is 7?

## question
Why is pure water described as neutral, and is that the same as saying its pH is 7?

## subject
pharm

## status
Draft

## owner
Dr. Omar

## vignette
A student states that pure water is neutral because its pH is exactly 7, and is asked whether that
would still be true of pure water at body temperature.

## correct_answer
E

## answer_a
Yes — neutrality is defined as pH 7, so pure water is pH 7 at any temperature

## explanation_a
Incorrect, and it treats a derived value as the definition. Neutrality is defined by the **equality
of hydrogen- and hydroxide-ion activities**, and pH 7 is merely the value that equality happens to
produce at 25°C. Since the ionisation of water is temperature-dependent, the pH of neutral water
shifts at other temperatures. Defining neutrality by the number rather than the condition is exactly
the error the vignette invites.

## answer_b
Yes — pure water contains no ions at all, so it is neutral by definition

## explanation_b
Incorrect. Pure water does contain ions: it **self-ionises**, so a small proportion of molecules
dissociate into hydrogen and hydroxide ions at any moment. That is why water has a measurable ion
product of about 10⁻¹⁴ at 25°C and can conduct a small current. Neutrality is not the absence of
ions but their **equality**. If water contained no ions, pH would be undefined rather than 7.

## answer_c
No — pure water is slightly acidic because dissolved carbon dioxide forms carbonic acid

## explanation_c
Incorrect as an answer about *pure* water, though the chemistry is real. Water left open to air does
absorb carbon dioxide, forming carbonic acid and falling to a pH of around 5.6 — which is why
laboratory "pure" water is often mildly acidic in practice. But that makes the water a **solution**,
no longer pure, and it is a contamination effect rather than a property of water itself. The stem
specifies pure water, so this option answers a different question.

## answer_d
No — neutrality requires equal ion activities, and pure water has more hydroxide than hydrogen ions

## explanation_d
Incorrect in its second clause. The first half correctly states the definition, but pure water has
**equal**, not unequal, hydrogen- and hydroxide-ion activities — each ion is produced in a one-to-one
ratio when a water molecule dissociates, so there is no mechanism by which one could exceed the other
in pure water. An excess of hydroxide would make it basic rather than neutral.

## answer_e
No — pure water is neutral because its hydrogen- and hydroxide-ion activities are equal, and the pH at which that occurs changes with temperature

## explanation_e
Correct. **Pure water is neutral because it contains equal hydrogen-ion and hydroxide-ion
activities**, and that equality — not any particular number — is what neutrality means.

The equality arises from how the ions are produced. Water **self-ionises**, one molecule donating a
proton to another, and each such event yields exactly **one** hydrogen ion and **one** hydroxide ion.
In the absence of any added solute the two must therefore be present in equal amounts.

At **25°C** that equality corresponds to each ion being at 10⁻⁷ mol/L, so the pH is **7** — the
familiar figure, and the one that makes the scale's midpoint 7 and gives pH + pOH ≈ 14.

But the extent of self-ionisation is **temperature-dependent**. Warming water increases dissociation,
so the ion product rises above 10⁻¹⁴ and both ion concentrations increase. Because they increase
*together*, the water remains **neutral** — the activities are still equal — yet the pH at which that
occurs is **below 7**. At body temperature, neutral pH is closer to 6.8 than to 7.0.

So the two statements in the stem are not equivalent: **neutrality is a condition, pH 7 is a
measurement made under specified conditions.** The general rule to carry is that a solution is
**acidic** when hydrogen-ion activity exceeds hydroxide-ion activity, **basic** when hydroxide exceeds
hydrogen, and **neutral** when they are equal — all three defined by the comparison, with the
numerical pH thresholds holding at 25°C.

This is more than pedantry in a medical context. Arterial pH is quoted around **7.4**, which is
alkaline relative to the 25°C neutral point of 7 but only mildly so relative to the neutral point at
37°C — one reason blood gas values are interpreted at body temperature rather than corrected to room
temperature.

## topic
Acids, bases and pH

## subtopic

## main_concept
CON-FND-737A22D642DD70

## concept_ids
CON-FND-A8A72BC2005748

## contextual_concept_ids
CON-FND-FBAA90D61BE8AB

## difficulty
Moderate

## question_type
Pharmacology

## cognitive_effort
Medium

## cognitive_effort_score
0.55

## setting
Academic

## reasoning_level
3

## inferred_difficulty
56

## exam_relevance
7

## clinical_relevance
0.65

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.7

## years
KAU_Y1

## universities
kau

## module
108 INT

## question_only_for

## library_ids
ART-FND-TOP-008C54089F

## resource_ids
src_d98abbe78377e7262afc

## learning_objective
Explain that neutrality is the equality of hydrogen- and hydroxide-ion activities rather than a pH of
7, and account for the shift in neutral pH with temperature.

## source_citation
Kasr Alainy 108 INT, Acids, bases and pH as taught in the 108 module.

## attached_image

## attachments

## media_recommendations
### graph · Explanation for answer E
Brief: Hydrogen- and hydroxide-ion concentrations in pure water plotted against temperature, rising
together and remaining equal, with the corresponding neutral pH plotted alongside falling from 7 at
25°C towards about 6.8 at 37°C
Purpose: The whole point is that two quantities stay equal while the pH they correspond to moves.
That simultaneity is hard to hold in prose and immediate on paired axes, and it is what distractor A
denies.
Priority: strongly helpful
Status: needed
Source direction: openly licensed chemistry teaching diagram, or draw to specification
Rights: must be CC-BY or public domain

## estimated_seconds
90

## randomise_answers
yes

## author_notes
Written because the live concepts for neutral solutions and pure water both carry the temperature
qualification explicitly, so an item asserting "neutral = pH 7" would contradict the library.
Distractor A is the misconception the vignette states; B denies water's self-ionisation; C is the
dissolved-CO₂ effect, which is true of real laboratory water and so is a genuinely tempting wrong
answer; D states the right definition with the wrong fact attached.
