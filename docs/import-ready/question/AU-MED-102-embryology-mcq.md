<!--
  AU-MED-102 Embryology, keyed EOM-paper questions testing the 4 NEW concepts
  and the 1 HIT-LIVE sparse-update concept this lane fully controls (all five
  live in concept/AU-MED-102-embryology-concepts.md, not pending-live/ --
  the pending-live embryology files hold the 12 HIT-PENDING Kasr overlays and
  their 13 questions instead). Closes a gap: these 5 concepts had no question
  file at all until this pass (LANE-BRIEF's scope test -- "if you cannot name
  the question, do not write it" -- was already satisfied by each concept's
  exam_signal, but the question record itself was owed).

  Sourcing: coverage/AU-MED-102-embryology-triage.md rows 4 (capacitation),
  13 (allantois -> median umbilical ligament), 14 (oligohydramnios), 15
  (urachal fistula), all keyed on src_3bf4527b51de57464e14 (twin
  src_413115a28d7dc9914c91), EOM "Final foundation 2030" / "Foundation Final
  Egyptian", p17 Q80 and p18 Q83-85.

  OWED: idea #3 (zona pellucida function, CON-DEV-642BA9E28AC8B6) has only an
  unkeyed source (src_29f02a5a4d6a273dea76 p6 Q22) -- no second keyed sitting
  found. Per the corpus-hazard rule (an unkeyed item is not authored), no
  question is written for it here; the concept stays traceable to a named
  question (Q22) without a graded MCQ. Flagged in the module report, not
  silently dropped.

  Two-sided coverage: all 4 main_concepts are named in related_concepts by
  the article on library_ids below (article/AU-MED-102-embryology-articles.md,
  ART-AU-MED-102-EMBR-FERTILIZATION / -AMNION / -UMBILICAL-CORD), confirmed
  by reading the article file directly, not assumed.

  Gates:
  npm run medical:batch -- "docs/Alexandria-Source-Imports/question/AU-MED-102-embryology-mcq.md" \
    --with docs/Alexandria-Source-Imports/concept/AU-MED-102-embryology-concepts.md \
    --with docs/Alexandria-Source-Imports/article/AU-MED-102-embryology-articles.md
  npm run medical:simulate -- docs/Alexandria-Source-Imports/concept/AU-MED-102-embryology-concepts.md docs/Alexandria-Source-Imports/article/AU-MED-102-embryology-articles.md docs/Alexandria-Source-Imports/question/AU-MED-102-embryology-mcq.md --emit /tmp/sim-AU-MED-102-embryology-own-questions.json
  npm run medical:audit -- --source /tmp/sim-AU-MED-102-embryology-own-questions.json
-->

# Item

## id
QST-DEV-AU102-CAPACITATION-01

## title
What is meant by capacitation?

## question
What is meant by capacitation?

## subject
dev

## status
Draft

## owner
Admin team

## vignette

## correct_answer
A

## answer_a
Removal of the glycoprotein coat and seminal plasma proteins from the sperm's plasma membrane

## explanation_a
Correct. Capacitation is the process, occurring in the female genital tract, by which the glycoprotein coat and seminal plasma proteins are stripped from the plasma membrane overlying the sperm's acrosomal region. Stripping this coat exposes the surface receptors the sperm needs to bind the zona pellucida and sets off the membrane changes that make the acrosome reaction possible afterward. Without capacitation a sperm cannot undergo the acrosome reaction at all, which is why it is the mandatory checkpoint between ejaculation and actual fertilising capability — the fact to hold onto is that it strips a coat away, it does not add one.

## answer_b
Formation of the acrosome cap during spermiogenesis

## explanation_b
Incorrect. The acrosome cap is built earlier, during spermiogenesis in the seminiferous tubules, well before capacitation happens later in the female genital tract.

## answer_c
Fusion of the sperm and oocyte plasma membranes

## explanation_c
Incorrect. Membrane fusion between sperm and oocyte is the final fertilisation event itself, downstream of both capacitation and the acrosome reaction, not capacitation.

## answer_d
Loss of the sperm's flagellum before fertilisation

## explanation_d
Incorrect. The sperm keeps its flagellum through capacitation, the acrosome reaction and fertilisation; flagellar loss is not part of this process.

## answer_e

## explanation_e

## topic
Anatomy

## subtopic
General Embryology

## main_concept
CON-DEV-CA422E559742A2

## concept_ids

## contextual_concept_ids

## difficulty
Moderate

## question_type
Anatomy

## cognitive_effort
Medium

## cognitive_effort_score
0.4

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
0.9

## exam_weight_by_year
AU_Y1=0.3

## years
AU_Y1

## universities
au

## module
AU-MED-102

## question_only_for

## module_subject
AU-MED-102 > Embryology > Fertilization

## library_ids
ART-AU-MED-102-EMBR-FERTILIZATION

## resource_ids
src_3bf4527b51de57464e14
src_413115a28d7dc9914c91

## learning_objective
State what capacitation removes from the sperm surface and explain why it must happen before the acrosome reaction can occur.

## source_citation
Alexandria University AU-MED-102 (Foundation of Basic Medical Sciences), End of Module paper "Final foundation 2030" / "Foundation Final Egyptian" (twin papers, question 80 of 112, p17, cohort 2030).

## attached_image

## attachments

## media_recommendations

## estimated_seconds
40

## randomise_answers
yes

## author_notes
Tests CON-DEV-CA422E559742A2, one of the 4 NEW embryology concepts this lane authored (coverage/AU-MED-102-embryology-triage.md row 4) — closes the gap that this concept had no question record until now.

---

# Item

## id
QST-DEV-AU102-OLIGOHYDRAMNIOS-01

## title
Volume of amniotic fluid in oligohydramnios

## question
Oligohydramnios is defined as an amniotic fluid volume of…

## subject
dev

## status
Draft

## owner
Admin team

## vignette

## correct_answer
B

## answer_a
Less than 800 mL

## explanation_a
Incorrect. 800 mL is within, near the low end of, the normal amniotic fluid range at term, not the oligohydramnios threshold.

## answer_b
Less than 400 mL

## explanation_b
Correct. Oligohydramnios is defined as an amniotic fluid volume under 400 mL at term, a reduction that matters clinically because too little fluid restricts fetal movement and lung expansion and can lead to pulmonary hypoplasia and limb deformities from compression. The commonest causes are reduced fetal urine output — renal agenesis or urinary tract obstruction — or premature rupture of membranes, since fetal urine is the dominant contributor to amniotic fluid volume in the second half of pregnancy. The number to hold onto is 400 mL, the same low-end cutoff that separates this from the excess-fluid condition, polyhydramnios.

## answer_c
Less than 1500 mL

## explanation_c
Incorrect. 1500 mL sits within the normal range for amniotic fluid at term, well above the oligohydramnios cutoff.

## answer_d
Less than 2000 mL

## explanation_d
Incorrect. Above roughly 2000 mL is the range associated with polyhydramnios, the excess-fluid condition, the opposite abnormality to oligohydramnios.

## answer_e

## explanation_e

## topic
Anatomy

## subtopic
General Embryology

## main_concept
CON-DEV-3D26C14BF0AA28

## concept_ids

## contextual_concept_ids

## difficulty
Easy

## question_type
Anatomy

## cognitive_effort
Low

## cognitive_effort_score
0.2

## setting
Academic

## reasoning_level
1

## inferred_difficulty
70

## exam_relevance
7

## clinical_relevance
0.4

## academic_relevance
0.8

## exam_weight_by_year
AU_Y1=0.3

## years
AU_Y1

## universities
au

## module
AU-MED-102

## question_only_for

## module_subject
AU-MED-102 > Embryology > Amnion

## library_ids
ART-AU-MED-102-EMBR-AMNION

## resource_ids
src_3bf4527b51de57464e14
src_413115a28d7dc9914c91

## learning_objective
State the 400 mL threshold that defines oligohydramnios and name its principal fetal causes.

## source_citation
Alexandria University AU-MED-102 (Foundation of Basic Medical Sciences), End of Module paper "Final foundation 2030" / "Foundation Final Egyptian" (twin papers, question 84 of 112, p18, cohort 2030).

## attached_image

## attachments

## media_recommendations

## estimated_seconds
30

## randomise_answers
yes

## author_notes
Tests CON-DEV-3D26C14BF0AA28, one of the 4 NEW embryology concepts this lane authored (coverage/AU-MED-102-embryology-triage.md row 14) — closes the gap that this concept had no question record until now.

---

# Item

## id
QST-DEV-AU102-PATENT-URACHUS-01

## title
Nature of the discharge from a urachal fistula

## question
A patent (persistent) urachus discharges which of the following from the umbilicus?

## subject
dev

## status
Draft

## owner
Admin team

## vignette

## correct_answer
A

## answer_a
Urine

## explanation_a
Correct. A patent urachus is a urachal fistula: the urachus, the fibrous remnant of the allantoic duct running from the bladder apex to the umbilicus, fails to obliterate and its lumen stays open, so urine leaks continuously from the bladder out through the umbilicus. A discharging umbilicus in a neonate that smells of urine, and worsens with bladder distension or crying, points straight to a patent urachus rather than an infected umbilical stump. The structure to remember is the urachus itself — it normally becomes the median umbilical ligament once it closes, so a patent urachus is simply that closure failing.

## answer_b
Meconium

## explanation_b
Incorrect. Meconium discharge from the umbilicus points to a different anomaly — an omphalomesenteric (vitelline) fistula, connecting the ileum to the umbilicus via a patent yolk stalk, not the urachus.

## answer_c
Peritoneal fluid

## explanation_c
Incorrect. Peritoneal fluid is not a normal discharge of any patent embryonic remnant at the umbilicus; this option does not correspond to a real anomaly here.

## answer_d
Amniotic fluid

## explanation_d
Incorrect. Amniotic fluid is confined to the amniotic sac and is not what a patent urachus, which connects to the bladder, discharges.

## answer_e

## explanation_e

## topic
Anatomy

## subtopic
General Embryology

## main_concept
CON-DEV-4AD25E168BD626

## concept_ids

## contextual_concept_ids

## difficulty
Moderate

## question_type
Anatomy

## cognitive_effort
Medium

## cognitive_effort_score
0.35

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
7

## clinical_relevance
0.5

## academic_relevance
0.8

## exam_weight_by_year
AU_Y1=0.3

## years
AU_Y1

## universities
au

## module
AU-MED-102

## question_only_for

## module_subject
AU-MED-102 > Embryology > Umbilical cord

## library_ids
ART-AU-MED-102-EMBR-UMBILICAL-CORD

## resource_ids
src_3bf4527b51de57464e14
src_413115a28d7dc9914c91

## learning_objective
State that a patent urachus discharges urine, and explain why (it is the unobliterated allantoic duct connecting bladder to umbilicus).

## source_citation
Alexandria University AU-MED-102 (Foundation of Basic Medical Sciences), End of Module paper "Final foundation 2030" / "Foundation Final Egyptian" (twin papers, question 83 of 112, p18, cohort 2030).

## attached_image

## attachments

## media_recommendations

## estimated_seconds
35

## randomise_answers
yes

## author_notes
Tests CON-DEV-4AD25E168BD626, one of the 4 NEW embryology concepts this lane authored (coverage/AU-MED-102-embryology-triage.md row 15) — closes the gap that this concept had no question record until now.

---

# Item

## id
QST-REN-AU102-ALLANTOIS-FATE-01

## title
Last fate of the allantois

## question
The allantois obliterates to form which of the following structures?

## subject
dev

## status
Draft

## owner
Admin team

## vignette

## correct_answer
B

## answer_a
Ligamentum teres (round ligament of the liver)

## explanation_a
Incorrect. The ligamentum teres is the remnant of the fetal umbilical vein, not of the allantois, and lies in the free edge of the falciform ligament of the liver.

## answer_b
Median umbilical ligament

## explanation_b
Correct. The allantois is an extra-embryonic diverticulum running from the bladder apex to the umbilicus, and once it obliterates after birth its fibrous remnant persists as the single, midline median umbilical ligament. This is the fact the question is built to test: the singular "median" ligament traces to the allantois, while the paired "medial" umbilical ligaments come from a completely different structure, the obliterated umbilical arteries. Getting the allantois's fate right also anchors the patent-urachus concept, since a patent urachus is exactly this same obliteration failing to happen.

## answer_c
Medial umbilical ligaments

## explanation_c
Incorrect, and this is the specific mix-up the question exists to catch. The medial umbilical ligaments (plural, paired) are remnants of the obliterated umbilical arteries — a different structure with a deceptively similar name.

## answer_d
Ligamentum venosum

## explanation_d
Incorrect. The ligamentum venosum is the remnant of the fetal ductus venosus, unrelated to either the allantois or the umbilical arteries.

## answer_e

## explanation_e

## topic
Anatomy

## subtopic
General Embryology

## main_concept
CON-REN-CB7041F0D25574

## concept_ids

## contextual_concept_ids

## difficulty
Moderate

## question_type
Anatomy

## cognitive_effort
Medium

## cognitive_effort_score
0.35

## setting
Academic

## reasoning_level
2

## inferred_difficulty
58

## exam_relevance
7

## clinical_relevance
0.3

## academic_relevance
0.85

## exam_weight_by_year
AU_Y1=0.3

## years
AU_Y1

## universities
au

## module
AU-MED-102

## question_only_for

## module_subject
AU-MED-102 > Embryology > Umbilical cord

## library_ids
ART-AU-MED-102-EMBR-UMBILICAL-CORD

## resource_ids
src_3bf4527b51de57464e14
src_413115a28d7dc9914c91

## learning_objective
State that the allantois obliterates to form the median umbilical ligament, and distinguish it from the medial umbilical ligaments (umbilical-artery remnants).

## source_citation
Alexandria University AU-MED-102 (Foundation of Basic Medical Sciences), End of Module paper "Final foundation 2030" / "Foundation Final Egyptian" (twin papers, question 85 of 112, p18, cohort 2030).

## attached_image

## attachments

## media_recommendations

## estimated_seconds
35

## randomise_answers
yes

## author_notes
Tests CON-REN-CB7041F0D25574, the module's one HIT-LIVE sparse-update concept (a live Kasr `renal` concept overlaid with the developmental fact and `+au`/`+AU-MED-102`, coverage/AU-MED-102-embryology-triage.md row 13) — closes the gap that this concept had no question record until now.
