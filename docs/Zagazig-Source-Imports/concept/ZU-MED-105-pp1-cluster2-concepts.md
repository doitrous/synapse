<!--
  ZU-MED-105 (Professional Practice I) — 21 NEW concepts minted for the second
  40-item source (امتحانات سابقه.pdf, pages 5-13, Q30-76), backing pp1-cluster2's
  22 authored questions (2 concepts each back 2 questions — a within-source
  duplicate and a cross-source duplicate — matching pp1-cluster1's own pattern;
  see coverage/ZU-MED-105-triage-keys.txt for the full question-to-concept map).
  Search-before-mint run against `find-existing.mjs` (short single-word/phrase
  queries: group dynamics, double effect, altruism, informal communication,
  learning needs, interpersonal skills, competence, implied consent, genetic
  factors, self-directed learner, chaperone, genital examination, dress
  professionally, leadership style) — 0 reusable hits for any of them; the two
  incidental hits returned (immunocompetence/bacterial-competence for
  "competence", molecular chaperones for "chaperone") are unrelated domains.
  `docs/Zagazig-Source-Imports/concept/ZU-MED-108-*` does not exist yet (PP II
  lane has not landed any concepts), so no cross-lane reuse check was possible
  there. No dedicated professionalism/ethics subject code exists in
  `src/data/curriculumCatalog.ts` — every concept below uses `subject: pop`,
  matching pp1-cluster1 and the LANE-CARD's own note.

  Several marked keys in this source disagree with more conventional
  professionalism/ethics teaching (see each concept's own `uncertainty`
  field): "Ethics" over "Professionalism" for the public-trust definition,
  "Autonomy" over "Beneficence" for altruism, "Interpersonal skills" over
  "Altruism" for a conflict-of-interest violation, and "implied consent must
  be signed" against standard consent doctrine (implied consent specifically
  does not require a signature). Each mark was render-confirmed as a single,
  unambiguous highlight (not a two-mark conflict), so it stands per corpus
  policy; explanations are written attributively ("as keyed by this source")
  rather than asserting the surprising reading as uncontested fact. No
  evidence-store `src_…` resource exists yet for this PDF — citation lives in
  each concept's `original_wording` and each question's `source_citation`.

  Import: Admin › Concepts › Import.
-->

# Item

## id
CON-POP-7AC09AB22572DE

## label
The appropriate leadership style is selected based on the situation, the group's size and qualification, and the group's maturity, together

## canonical_key
leadershipstyle.selection-depends-on-situation-group-and-maturity

## aliases
Contingency factors in leadership style selection
Situational leadership style choice

## arabic_label


## arabic_aliases


## definition
Contingency models of leadership hold that no single leadership style is universally best. The style a leader should adopt is instead chosen by weighing several factors together: the situation itself, the size and qualification of the group being led, and the group's level of maturity. This source's own past-exam bank marks "all of the above" as the correct answer against three options that each name only one of these three contingent factors.

## explicit_objective
State that leadership-style selection depends jointly on the situation, the group's size and qualification, and the group's maturity, not on any single one of these factors alone.

## pitfalls
Picking a single named factor (situation, group size/qualification, or group maturity) as sufficient on its own, when the question is testing that all three combine to determine the appropriate style.

## concept_type
factual

## status
Draft

## support_mode
direct_statement

## subject
pop

## primary_node_id


## secondary_node_ids


## topic
Professional skills and self-management

## subtopic
Team dynamics and leadership

## microtopic
Leadership style selection

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-TEAMS-LEARNING

## related_article_ids
ART-POP-ZU105-TEAM-LEADERSHIP

## related_concept_ids
CON-POP-81EC3F32942A5A
CON-POP-061AD45B48F65F

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.35

## exam_weight_by_year
ZU_Y1=0.45

## clinical_relevance
0.35

## academic_relevance
0.65

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Selection of the appropriate leadership style depends on: A) The situation itself B) The group size and qualification C) Maturity of the group D) All of the above" ANSWER: D (gray fill-rectangle over option D, ad hoc PyMuPDF detection, امتحانات سابقه.pdf p.6 Q39).

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this one compiled past-exam bank; a leadership/management-theory textbook citation would strengthen this before publication.

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

---

# Item

## id
CON-POP-762D92ADD06F4D

## label
Group dynamics is the pattern of interactions between people talking together in a group setting

## canonical_key
groupdynamics.definition-is-interactions-between-people-in-a-group-setting

## aliases
Definition of group dynamics
Interaction patterns in working groups

## arabic_label


## arabic_aliases


## definition
Group dynamics refers to the pattern of interactions and communication that occurs between people who are talking together within a group setting. This pattern is not fixed; it shifts over time as roles, trust and communication develop, and it is a genuinely important factor in how a working group performs its tasks, not only in purely social groups.

## explicit_objective
State that group dynamics is the pattern of interactions between people talking together in a group setting, and that it is changeable and relevant to working, not only social, groups.

## pitfalls
Assuming group dynamics is unimportant to working teams, fixed and unchangeable, or relevant only to purely social settings.

## concept_type
factual

## status
Draft

## support_mode
direct_statement

## subject
pop

## primary_node_id


## secondary_node_ids


## topic
Professional skills and self-management

## subtopic
Team dynamics and leadership

## microtopic
Group dynamics

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-TEAMS-LEARNING

## related_article_ids
ART-POP-ZU105-TEAM-LEADERSHIP

## related_concept_ids
CON-POP-F442216AEE9CF5

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.3

## exam_weight_by_year
ZU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.6

## weight_confidence
0.4

## confidence
0.85

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Regarding group dynamics; which statement is correct? A) It is not important factors for a working group B) It cannot be changed C) It is the interactions between people who are talking together in a group setting D) It is important only in social groups" ANSWER: C (gray fill-rectangle over option C, ad hoc PyMuPDF detection + render-confirmed, امتحانات سابقه.pdf p.7 Q40).

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this one compiled past-exam bank; a group-dynamics/team-theory textbook citation would strengthen this before publication.

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

---

# Item

## id
CON-POP-67DD8B8C2B3779

## label
Self-awareness is knowing one's own motivations, preferences and personality and how these shape one's judgment and interactions

## canonical_key
selfawareness.definition-is-knowing-own-motivations-preferences-personality

## aliases
Definition of self-awareness
Self-knowledge and judgment

## arabic_label


## arabic_aliases


## definition
Self-awareness is the standard term for knowing one's own motivations, preferences and personality, and understanding how these factors shape one's judgment, decisions and interactions with other people. This module's own past-exam bank tests this definition directly, distinguishing it from time management, goal setting and leadership, three related but distinct professional skills.

## explicit_objective
State the standard definition of self-awareness as knowing one's own motivations, preferences and personality and how these shape judgment, decisions and interactions with others.

## pitfalls
Confusing self-awareness's definition (knowing oneself) with time management, goal setting or leadership, each of which is a related but distinct skill that self-awareness itself does not define.

## concept_type
factual

## status
Draft

## support_mode
direct_statement

## subject
pop

## primary_node_id


## secondary_node_ids


## topic
Professional skills and self-management

## subtopic
Self-awareness and emotional intelligence

## microtopic
Definition of self-awareness

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-TEAMS-LEARNING

## related_article_ids
ART-POP-ZU105-SELF-AWARENESS-EQ

## related_concept_ids
CON-POP-78B3B7230B06FB
CON-POP-04C8461A94B246

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.3

## exam_weight_by_year
ZU_Y1=0.4

## clinical_relevance
0.25

## academic_relevance
0.6

## weight_confidence
0.4

## confidence
0.85

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"\"To know your motivations, preferences, and personality and understanding how these factors influence your judgment decisions, and interactions with other people\". This is the definition of: A) Time management B) Goal setting C) Self-awareness D) Leaderships" ANSWER: C (gray fill-rectangle over option C, ad hoc PyMuPDF detection + render-confirmed, امتحانات سابقه.pdf p.7 Q41).

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this one compiled past-exam bank; a professionalism-curriculum textbook citation would strengthen this before publication.

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

---

# Item

## id
CON-POP-C706E771463721

## label
Asking permission before an examination and limiting who is present or can see the patient is an expression of patient confidentiality

## canonical_key
patientconfidentiality.privacy-during-physical-examination

## aliases
Privacy during physical examination
Controlling who is present during an exam

## arabic_label


## arabic_aliases


## definition
Asking a patient's permission before examining them, and making sure only the staff who are actually needed are present while other patients cannot see or overhear the encounter, are concrete expressions of protecting the patient's confidentiality and privacy during a physical examination. This is a narrower, more specific principle than the general categories of "professional responsibilities" or "scientific knowledge" offered as distractors in this module's past-exam bank.

## explicit_objective
State that seeking permission before an examination and limiting who is present or can see the patient is an expression of patient confidentiality.

## pitfalls
Classifying this behaviour under the broad umbrella of "professional responsibilities" rather than the narrower, specific principle of confidentiality that it actually demonstrates.

## concept_type
factual

## status
Draft

## support_mode
direct_statement

## subject
pop

## primary_node_id


## secondary_node_ids


## topic
Ethics, law and professionalism

## subtopic
Student conduct and confidentiality

## microtopic
Confidentiality during examination

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-PROFESSIONAL-CONDUCT

## related_article_ids
ART-POP-ZU105-BIOETHICS-PRINCIPLES

## related_concept_ids
CON-POP-DAB775A3A5B37C

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.35

## exam_weight_by_year
ZU_Y1=0.45

## clinical_relevance
0.5

## academic_relevance
0.55

## weight_confidence
0.4

## confidence
0.85

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Asking for your patient's permission before examining them. Make sure that only those who are needed are attending, and other patients cannot see him/her, is considered commitment to the following principle of medical professionalism: A) Patient confidentiality B) Improving access to care C) Professional responsibilities D) Scientific knowledge" ANSWER: A (gray fill-rectangle over option A, ad hoc PyMuPDF detection + render-confirmed, امتحانات سابقه.pdf p.8 Q45).

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this one compiled past-exam bank; a professionalism-curriculum textbook citation would strengthen this before publication.

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

---

# Item

## id
CON-POP-7B0E9C767D6C99

## label
This source classifies seeking advice about an impairing substance or treatment from a registered practitioner as an "informal communication" ethics commitment

## canonical_key
studentethics.informal-communication-for-impairment-disclosure

## aliases
Disclosure of impairing substances or treatment
Student ethics categories in this source

## arabic_label


## arabic_aliases


## definition
This source's past-exam bank marks "informal communication" as the professional-ethics commitment demonstrated by a student seeking advice from a registered medical practitioner about a substance or treatment that might impair their reason, judgment, or professional responsibilities. Many professionalism curricula instead label this behaviour "student health"; this source's own categorisation is recorded here for reviewer cross-check rather than silently corrected.

## explicit_objective
Recognise how this source categorises a student's disclosure-seeking about an impairing substance or treatment among professional-ethics commitments.

## pitfalls
Assuming "student health" is this source's marked answer for this scenario; this source's own printed key marks "informal communication" instead.

## concept_type
factual

## status
Draft

## support_mode
direct_statement

## subject
pop

## primary_node_id


## secondary_node_ids


## topic
Ethics, law and professionalism

## subtopic
Student conduct and confidentiality

## microtopic
Student professional ethics categories

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-PROFESSIONAL-CONDUCT

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.2

## exam_weight_by_year
ZU_Y1=0.3

## clinical_relevance
0.3

## academic_relevance
0.4

## weight_confidence
0.25

## confidence
0.55

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Seeking advice from a registered medical practitioner regarding the potential impact of any substance or treatment that might impair your reason or judgment or other wise impact upon your professional responsibilities, is considered commitment to the following medical students professional ethics: A) Academic integrity B) Student health C) Informal communication D) Confidentiality" ANSWER: C (gray fill-rectangle over option C, ad hoc PyMuPDF detection + render-confirmed, امتحانات سابقه.pdf p.8 Q46).

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty
Marked key (C, "Informal communication") is surprising against the more conventional fit "Student health" (B) for self-disclosure about an impairing substance/treatment. Render-confirmed the mark is genuinely and unambiguously on C (not a two-mark conflict), so it stands per corpus rule (marked keys stand, doubt recorded here) rather than being held; flagged for reviewer attention.

## evidence_gaps
No department-book or corpus-indexed source beyond this one compiled past-exam bank; a professionalism-curriculum textbook citation, or reviewer confirmation of the intended attribute label, would strengthen this before publication.

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

---

# Item

## id
CON-POP-65F655B7C50D18

## label
The interested learner seeks opportunities and sets some goals but is still sometimes directed and still building confidence

## canonical_key
interestedlearner.staged-self-directed-learning-stage-two

## aliases
Grow's staged self-directed learning model, stage 2
Interested learner stage

## arabic_label


## arabic_aliases


## definition
In the staged self-directed-learning model, the interested learner is the second stage: motivated enough to seek opportunities and set some goals, going beyond a purely dependent learner who needs explicit direction, but still needing direction some of the time and still building the confidence that the later involved and self-directed stages assume.

## explicit_objective
Identify the interested-learner stage as motivated and goal-setting but still sometimes-directed and still building confidence, distinct from dependent, involved and self-directed learners.

## pitfalls
Confusing the interested learner (motivated, goal-setting, still needs some direction and confidence) with the more autonomous involved or self-directed learner stages, or with the more passive dependent learner stage.

## concept_type
factual

## status
Draft

## support_mode
direct_statement

## subject
pop

## primary_node_id


## secondary_node_ids


## topic
Professional skills and self-management

## subtopic
Learner types and learning needs

## microtopic
Learner types

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-TEAMS-LEARNING

## related_article_ids


## related_concept_ids
CON-POP-797554394313EA

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.25

## exam_weight_by_year
ZU_Y1=0.3

## clinical_relevance
0.2

## academic_relevance
0.55

## weight_confidence
0.35

## confidence
0.7

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"The learner who seeks some opportunities sets some goals. Sometimes directed, and needs confidence to be gained is known as ..........: A) Dependent learner B) Interested learner C) Involved learner D) Self-directed learner" ANSWER: B (gray fill-rectangle over option B, ad hoc PyMuPDF detection + render-confirmed, امتحانات سابقه.pdf p.8 Q47).

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this one compiled past-exam bank naming the staged self-directed-learning model; a medical-education-theory textbook citation would strengthen this before publication.

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

---

# Item

## id
CON-POP-797554394313EA

## label
A learning need is the gap between current and desired knowledge, skills and abilities

## canonical_key
learningneeds.definition-is-gap-between-current-and-desired-competence

## aliases
Definition of learning needs
Gap analysis in education

## arabic_label


## arabic_aliases


## definition
A learning need is, by definition, the gap between a person's or group's current knowledge, skills and abilities and the level they need to reach. Identifying this gap is what tells an educator or learner where to focus effort next, distinguishing a learning need from learning resources, objectives or goals, each of which is a related but different concept.

## explicit_objective
State that a learning need is the gap between current and desired knowledge, skills and abilities.

## pitfalls
Confusing a learning need (the diagnostic gap itself) with learning resources (materials), learning objectives (planned outcome statements), or learning goals (broader aims).

## concept_type
factual

## status
Draft

## support_mode
direct_statement

## subject
pop

## primary_node_id


## secondary_node_ids


## topic
Professional skills and self-management

## subtopic
Learner types and learning needs

## microtopic
Learning needs

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-TEAMS-LEARNING

## related_article_ids


## related_concept_ids
CON-POP-65F655B7C50D18

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.25

## exam_weight_by_year
ZU_Y1=0.3

## clinical_relevance
0.2

## academic_relevance
0.55

## weight_confidence
0.4

## confidence
0.85

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"The gaps between the current and desired knowledge, skills, and abilities of persons or groups is: A) Learning resources B) Learning objectives C) Learning needs D) Learning goals" ANSWER: C (gray fill-rectangle over option C, ad hoc PyMuPDF detection + render-confirmed, امتحانات سابقه.pdf p.8 Q48).

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this one compiled past-exam bank; a medical-education-theory textbook citation would strengthen this before publication.

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

---

# Item

## id
CON-POP-B69FD1D1AE7BD2

## label
A fellow medical student's presence alone does not substitute for a supervising clinician or chaperone during an intimate examination

## canonical_key
intimateexam.fellow-student-presence-is-not-adequate-supervision

## aliases
Chaperone requirement for genital or rectal examination
Supervision during intimate examination

## arabic_label


## arabic_aliases


## definition
This source's past-exam bank marks the presence of only a fellow medical student, rather than a supervising clinician or an accompanying chaperone such as a nurse, as one of the circumstances under which a medical student should not conduct a genital or rectal examination. The reasoning is that a peer's presence does not by itself confer the supervision that legitimises an intimate examination, unlike consent (a precondition, not a bar) or proper supervision.

## explicit_objective
Recognise that a fellow student's presence alone does not substitute for a supervising clinician or chaperone during an intimate examination.

## pitfalls
Assuming any second person present, including a fellow student, satisfies the supervision or chaperone requirement for an intimate examination.

## concept_type
factual

## status
Draft

## support_mode
direct_statement

## subject
pop

## primary_node_id


## secondary_node_ids


## topic
Ethics, law and professionalism

## subtopic
Student conduct and confidentiality

## microtopic
Intimate examination conduct

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-PROFESSIONAL-CONDUCT

## related_article_ids
ART-POP-ZU105-BIOETHICS-PRINCIPLES

## related_concept_ids
CON-POP-030DEA3D6246D2

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.3

## exam_weight_by_year
ZU_Y1=0.35

## clinical_relevance
0.5

## academic_relevance
0.4

## weight_confidence
0.3

## confidence
0.6

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Under no circumstances medical students should conduct genital or rectal examination: A) After patient consent for the examination B) For patients with different culture and believes C) In the presence of another medical student D) Without supervision or an accompanying nurse" ANSWER: C (gray fill-rectangle over option C, ad hoc PyMuPDF detection + render-confirmed, امتحانات سابقه.pdf p.8 Q49).

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty
Source stem prints as an incomplete sentence with no explicit "except" clause; the marked option (C) is read here as completing an implied "except" framing rather than a plain absolute prohibition, since option A (patient consent) reads as a precondition rather than a circumstance to avoid. Render-confirmed the mark is genuinely and unambiguously on C, so it stands rather than being held.

## evidence_gaps
No department-book or corpus-indexed source beyond this one compiled past-exam bank; a clinical-skills/informed-consent teaching document would strengthen this before publication.

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

---

# Item

## id
CON-POP-946044064A5629

## label
The doctrine of double effect is usually framed as weighing beneficence against non-maleficence

## canonical_key
doubleeffect.combined-effect-of-beneficence-and-nonmaleficence

## aliases
Double effect doctrine
Beneficence and non-maleficence balance

## arabic_label


## arabic_aliases


## definition
The doctrine of double effect is usually framed as weighing an action's intended good effect, beneficence, against a foreseen but unintended harmful effect, non-maleficence. The action is judged permissible when the good effect is what is actually intended and is proportionate to the foreseen harm, a balancing test distinct from the autonomy, justice, malpractice or confidentiality distractors offered against it.

## explicit_objective
State that the doctrine of double effect is usually framed as the combined weighing of beneficence and non-maleficence.

## pitfalls
Pairing double effect with autonomy and justice, or with malpractice and confidentiality, rather than with the beneficence/non-maleficence balancing it actually describes.

## concept_type
factual

## status
Draft

## support_mode
direct_statement

## subject
pop

## primary_node_id


## secondary_node_ids


## topic
Ethics, law and professionalism

## subtopic
Bioethical principles

## microtopic
Double effect doctrine

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-BIOETHICS-EXTENDED

## related_article_ids
ART-POP-ZU105-BIOETHICS-PRINCIPLES

## related_concept_ids
CON-POP-BED479E0FA27CA

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.35

## exam_weight_by_year
ZU_Y1=0.4

## clinical_relevance
0.4

## academic_relevance
0.6

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Double effect in medical ethics is usually regarded as the combined effect at: A) Beneficence and Autonomy B) Malpractice and Confidentiality C) Autonomy and justice D) Beneficence and Non maleficence" ANSWER: D (gray fill-rectangle over option D, ad hoc PyMuPDF detection + render-confirmed, امتحانات سابقه.pdf p.9 Q50).

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this one compiled past-exam bank; a bioethics textbook citation would strengthen this before publication.

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

---

# Item

## id
CON-POP-7927E6E886F653

## label
This source labels the set of values, behaviors and relationships that supports public trust in doctors as "ethics"

## canonical_key
ethics.definition-labelled-for-values-supporting-public-trust

## aliases
Ethics vs professionalism terminology
Values supporting public trust in doctors

## arabic_label


## arabic_aliases


## definition
This source's past-exam bank marks "ethics" as the term for the set of values, behaviors, and relationships that supports the trust the public has in doctors. Many professionalism curricula reserve the more precise term "professionalism" for exactly this description, treating ethics as the underlying moral framework professionalism is built on, so the two terms are closely related and sometimes used loosely for one another in less formal sources.

## explicit_objective
Recognise how this source labels the set of values, behaviours and relationships supporting public trust in doctors.

## pitfalls
Assuming "professionalism" is this source's marked answer for this description; this source's own printed key marks "ethics" instead.

## concept_type
factual

## status
Draft

## support_mode
direct_statement

## subject
pop

## primary_node_id


## secondary_node_ids


## topic
Ethics, law and professionalism

## subtopic
Bioethical principles

## microtopic
Ethics and professionalism terminology

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-BIOETHICS-EXTENDED

## related_article_ids
ART-POP-ZU105-PROFESSIONALISM-CORE

## related_concept_ids
CON-POP-BA335133348060

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.2

## exam_weight_by_year
ZU_Y1=0.3

## clinical_relevance
0.25

## academic_relevance
0.45

## weight_confidence
0.25

## confidence
0.55

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"The set of values, behaviors, and relationships that supports the trust the politic has in doctors, is called: A) Ethics B) Professionalism C) Attributes D) Principles" ANSWER: A (gray fill-rectangle over option A, ad hoc PyMuPDF detection + render-confirmed, امتحانات سابقه.pdf p.9 Q51).

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty
Marked key (A, "Ethics") is a looser fit than the more curriculum-standard term "Professionalism" (B) for this exact description. Render-confirmed the mark is genuinely and unambiguously on A (not a two-mark conflict), so it stands per corpus rule rather than being held; flagged for reviewer attention.

## evidence_gaps
No department-book or corpus-indexed source beyond this one compiled past-exam bank; a professionalism-curriculum textbook citation, or reviewer confirmation of the intended term, would strengthen this before publication.

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

---

# Item

## id
CON-POP-3E12C58814C605

## label
This source ties the attribute of altruism to autonomy

## canonical_key
altruism.related-medical-ethic-as-keyed-in-this-source

## aliases
Altruism and bioethical principles
Self-interest versus patient interest

## arabic_label


## arabic_aliases


## definition
This source's past-exam bank marks "autonomy" as the medical ethic related to the attribute of altruism, read here as prioritising the patient's own needs and choices over the physician's self-interest. The more conventional pairing in professionalism-charter teaching links altruism to beneficence, acting for the patient's benefit ahead of one's own interest, so this source's own pairing is recorded here for reviewer cross-check rather than silently corrected.

## explicit_objective
Recognise how this source ties the attribute of altruism to a specific bioethical principle.

## pitfalls
Assuming "beneficence" is this source's marked answer for altruism's related ethic; this source's own printed key marks "autonomy" instead.

## concept_type
factual

## status
Draft

## support_mode
direct_statement

## subject
pop

## primary_node_id


## secondary_node_ids


## topic
Ethics, law and professionalism

## subtopic
Bioethical principles

## microtopic
Altruism and its related principle

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-BIOETHICS-EXTENDED

## related_article_ids
ART-POP-ZU105-BIOETHICS-PRINCIPLES

## related_concept_ids
CON-POP-BED479E0FA27CA

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.2

## exam_weight_by_year
ZU_Y1=0.3

## clinical_relevance
0.3

## academic_relevance
0.4

## weight_confidence
0.25

## confidence
0.5

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"The attribute of Altruism is related to the following medical ethic: A) Autonomy B) Beneficence C) Non-maleficence D) Justice" ANSWER: A (gray fill-rectangle over option A, ad hoc PyMuPDF detection + render-confirmed, امتحانات سابقه.pdf p.9 Q52).

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty
Marked key (A, "Autonomy") is a less conventional pairing than "Beneficence" (B), the more standard fit for altruism in professionalism-charter teaching. Render-confirmed the mark is genuinely and unambiguously on A (not a two-mark conflict), so it stands per corpus rule rather than being held; flagged for reviewer attention.

## evidence_gaps
No department-book or corpus-indexed source beyond this one compiled past-exam bank; a bioethics/professionalism-charter textbook citation, or reviewer confirmation of the intended pairing, would strengthen this before publication.

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

---

# Item

## id
CON-POP-6A53546B82C5B1

## label
Self-awareness is the professionalism attribute behind continued development, emotional intelligence, boundary-keeping and role-modelling

## canonical_key
selfawareness.professionalism-attribute-development-boundaries-rolemodel

## aliases
Self-awareness as a professionalism attribute
Boundary-keeping and role modelling

## arabic_label


## arabic_aliases


## definition
This source's past-exam bank ties self-awareness to the combination of pursuing continued professional development (or, in a second copy of the same item, demonstrating emotional intelligence), keeping appropriate boundaries with patients and colleagues, behaving ethically, and recognising one's own position as a role model. Each of these four abilities depends on an accurate, ongoing understanding of one's own conduct and limits, which is why the source groups them under self-awareness rather than under a narrower attribute like compassion, dedication, integrity or fidelity.

## explicit_objective
Identify self-awareness as the professionalism attribute behind continued development or emotional intelligence, boundary-keeping and role-modelling.

## pitfalls
Confusing this broad, self-monitoring cluster of behaviours with a narrower professionalism attribute such as compassion, dedication, integrity or fidelity.

## concept_type
factual

## status
Draft

## support_mode
direct_statement

## subject
pop

## primary_node_id


## secondary_node_ids


## topic
Ethics, law and professionalism

## subtopic
Professional duties

## microtopic
Self-awareness as a professionalism attribute

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-PROFESSIONAL-CONDUCT

## related_article_ids
ART-POP-ZU105-SELF-AWARENESS-EQ

## related_concept_ids
CON-POP-78B3B7230B06FB
CON-POP-4F509DABFFC4B1

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.3

## exam_weight_by_year
ZU_Y1=0.4

## clinical_relevance
0.35

## academic_relevance
0.55

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"The ability to foster continued professional development, maintain appropriate boundaries with patients and colleagues, maintain ethical behavior, and recognizes position as a role model for others, is related to the following professionalism attribute: A) Compassion B) Dedication C) Self-awareness D) Integrity" ANSWER: C (امتحانات سابقه.pdf p.9 Q53). Second copy: "The ability to demonstrate emotional intelligence, maintain appropriate boundaries with patients and colleagues, maintain ethical behavior, and recognizes position as a role model for others is called: A) Integrity B) Self-Awareness C) Fidelity D) Dedication" ANSWER: B (امتحانات سابقه.pdf p.10 Q55). Both gray fill-rectangle, ad hoc PyMuPDF detection + render-confirmed.

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this one compiled past-exam bank; a professionalism-curriculum textbook citation would strengthen this before publication.

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

---

# Item

## id
CON-POP-F69CC831F4C76E

## label
Refusing an unsupervised, rushed street treatment in favour of proper hospital care is an application of non-maleficence

## canonical_key
nonmaleficence.refusal-of-unsupervised-rushed-treatment

## aliases
Non-maleficence in an urgent street scenario
Avoiding harm from rushed treatment

## arabic_label


## arabic_aliases


## definition
When a medical student refuses to treat an injury quickly and without proper facilities on the street, and instead directs the patient to a hospital, that refusal avoids the harm an improperly equipped, rushed treatment could cause. Avoiding that foreseeable harm, rather than actively promoting benefit (beneficence), respecting the patient's stated wish for speed (autonomy), or distributing resources fairly (justice), is the defining concern of non-maleficence in this scenario.

## explicit_objective
Recognise refusing an unsupervised, rushed treatment in favour of proper hospital care as an application of non-maleficence.

## pitfalls
Labelling this scenario as autonomy (respecting the patient's request for speed) or beneficence (actively promoting welfare) rather than non-maleficence (avoiding the harm a rushed, improperly equipped treatment could cause).

## concept_type
factual

## status
Draft

## support_mode
direct_statement

## subject
pop

## primary_node_id


## secondary_node_ids


## topic
Ethics, law and professionalism

## subtopic
Bioethical principles

## microtopic
Non-maleficence in practice

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-BIOETHICS-EXTENDED

## related_article_ids
ART-POP-ZU105-BIOETHICS-PRINCIPLES

## related_concept_ids
CON-POP-030DEA3D6246D2

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.3

## exam_weight_by_year
ZU_Y1=0.4

## clinical_relevance
0.5

## academic_relevance
0.45

## weight_confidence
0.4

## confidence
0.75

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"A 52-year-old man fails in the street with a wound in his right leg. A fifth-year medical student happens to be passing and examines the man. The man asked the student to treat the wound quickly to be able to go to work, but the student refused and asked the man to go to the hospital to be treated. Which medical ethic is presented in this case? A) Autonomy B) Beneficence C) Non-maleficence D) Justice" ANSWER: C (gray fill-rectangle over option C, ad hoc PyMuPDF detection + render-confirmed, امتحانات سابقه.pdf p.9 Q54).

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this one compiled past-exam bank; a bioethics textbook citation would strengthen this before publication.

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

---

# Item

## id
CON-POP-DB3532EBE9C5A6

## label
This source classifies working for private industry gain that violates professional responsibilities as a lapse in interpersonal skills

## canonical_key
interpersonalskills.conflict-of-interest-for-private-gain-as-keyed

## aliases
Conflict of interest for private gain
Working for pharmaceutical or insurance industry advantage

## arabic_label


## arabic_aliases


## definition
This source's past-exam bank marks "interpersonal skills" as the attribute violated when a medical professional lets working for private gain or personal advantage, such as for medical equipment manufacturers, insurance companies, or pharmaceutical firms, compromise their professional responsibilities. Professionalism-charter teaching more conventionally frames exactly this conflict-of-interest scenario as a violation of altruism, prioritising personal gain over patients' and colleagues' interests, so this source's own categorisation is recorded here for reviewer cross-check rather than silently corrected.

## explicit_objective
Recognise how this source categorises a professional-responsibility violation from working for private industry gain.

## pitfalls
Assuming "altruism" is this source's marked answer for a conflict-of-interest-for-private-gain scenario; this source's own printed key marks "interpersonal skills" instead.

## concept_type
factual

## status
Draft

## support_mode
direct_statement

## subject
pop

## primary_node_id


## secondary_node_ids


## topic
Ethics, law and professionalism

## subtopic
Professional duties

## microtopic
Conflicts of interest

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-PROFESSIONAL-CONDUCT

## related_article_ids


## related_concept_ids
CON-POP-74579735DA0CFE

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.2

## exam_weight_by_year
ZU_Y1=0.3

## clinical_relevance
0.3

## academic_relevance
0.35

## weight_confidence
0.2

## confidence
0.4

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Medical professionals have many opportunities to violate their professional responsibilities by working for private gain or personal advantage, especially for-profit industries, including medical equipment manufacturers, Insurance companies, and pharmaceutical firms. By doing that they violate the following attribute: A) Interpersonal skills B) Compassion C) Altruism D) Self-Awareness" ANSWER: A (gray fill-rectangle over option A, ad hoc PyMuPDF detection + render-confirmed, امتحانات سابقه.pdf p.10 Q56).

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty
Marked key (A, "Interpersonal skills") is a weak semantic fit; standard professionalism-charter teaching frames a conflict-of-interest-for-private-gain scenario as a violation of altruism (C), not interpersonal skills. Render-confirmed the mark is genuinely and unambiguously on A (not a two-mark conflict), so it stands per corpus rule rather than being held; flagged strongly for reviewer attention as the least defensible single mark in this cluster.

## evidence_gaps
No department-book or corpus-indexed source beyond this one compiled past-exam bank; a professionalism-charter (e.g. ABIM) textbook citation, or reviewer confirmation of the intended attribute, would strengthen this before publication.

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

---

# Item

## id
CON-POP-4F06A9970BD361

## label
Competence is the intellectual capacity to understand, analyze and judge information

## canonical_key
competence.definition-is-intellectual-capacity-to-understand-analyze-judge

## aliases
Definition of decision-making competence
Intellectual capacity for judgment

## arabic_label


## arabic_aliases


## definition
Competence, in the decision-making sense used in this module, is the intellectual capacity to understand, analyse and judge information. That capacity is what lets a person weigh options and reach a reasoned decision, distinguishing competence from autonomy (the right to decide), implied consent (a way consent is inferred), or conflict of interest (a bias risk), each offered as a distractor.

## explicit_objective
State that competence is the intellectual capacity to understand, analyse and judge information.

## pitfalls
Confusing competence (the intellectual capacity to understand and judge) with autonomy (the right to decide), which presupposes competence but is a distinct concept.

## concept_type
factual

## status
Draft

## support_mode
direct_statement

## subject
pop

## primary_node_id


## secondary_node_ids


## topic
Ethics, law and professionalism

## subtopic
Patient autonomy and consent

## microtopic
Decision-making competence

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-BIOETHICS-EXTENDED

## related_article_ids


## related_concept_ids
CON-POP-C0BA4B4254386F

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.3

## exam_weight_by_year
ZU_Y1=0.4

## clinical_relevance
0.4

## academic_relevance
0.55

## weight_confidence
0.4

## confidence
0.85

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"The intellectual capacity to understand, analyze, and judge information is termed: A) Autonomy B) Competence C) Implied consent D) Conflict of interest" ANSWER: B (gray fill-rectangle over option B, ad hoc PyMuPDF detection + render-confirmed, امتحانات سابقه.pdf p.10 Q57).

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this one compiled past-exam bank; a medical-ethics/consent-law textbook citation would strengthen this before publication.

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

---

# Item

## id
CON-POP-1D37B6A7CF6B84

## label
Students should first seek permission from the staff responsible for a patient's care before approaching that patient

## canonical_key
studentpatientcontact.seek-permission-from-care-team-as-first-step

## aliases
First step before approaching a patient
Permission from the treating team

## arabic_label


## arabic_aliases


## definition
Before approaching a patient as part of a group of students, the deliberate first step is to seek permission from the staff responsible for that patient's care. The treating team's clearance is what should come before the students' own contact with the patient begins, respecting both the care team's authority over the patient and the patient's own situation, distinct from the separate, later steps of explaining student status and obtaining the patient's own consent.

## explicit_objective
State that students should first seek permission from the staff responsible for a patient's care before approaching that patient.

## pitfalls
Treating "seek permission" and "explain student status/obtain consent" as interchangeable or unordered, when this scenario specifically tests which comes first.

## concept_type
factual

## status
Draft

## support_mode
direct_statement

## subject
pop

## primary_node_id


## secondary_node_ids


## topic
Ethics, law and professionalism

## subtopic
Student conduct and confidentiality

## microtopic
Sequencing of student-patient contact

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-TEAMS-LEARNING

## related_article_ids
ART-POP-ZU105-BIOETHICS-PRINCIPLES

## related_concept_ids
CON-POP-030DEA3D6246D2

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.3

## exam_weight_by_year
ZU_Y1=0.4

## clinical_relevance
0.45

## academic_relevance
0.4

## weight_confidence
0.4

## confidence
0.75

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Ahmed is a third-year medical student, He accompanied his colleagues to examine a patient in the cardiology unit. He told his colleagues that according to what learned in academic and clinical settings, before approaching the patient, they should generally first: A) Tell the patient that his cooperation is mandatory B) Seek permission for those responsible for the care of the patent C) Ask the patient about his beliefs D) Ensure that the patient is completely bare" ANSWER: B (gray fill-rectangle over option B, ad hoc PyMuPDF detection + render-confirmed, امتحانات سابقه.pdf p.10 Q58).

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this one compiled past-exam bank; a clinical-skills-course teaching document would strengthen this before publication.

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

---

# Item

## id
CON-POP-CF878BBD3AAEA0

## label
Medical students should dress professionally and wear a name or identity badge throughout clinical practice

## canonical_key
professionalism.dress-code-and-identification-at-all-times

## aliases
Professional dress code for students
Wearing an identity badge

## arabic_label


## arabic_aliases


## definition
Dressing professionally and wearing a visible name or identity badge is a baseline expectation of medical students throughout clinical practice. It signals their role and identity clearly to patients and staff and supports the trust a professional appearance conveys, distinct from an unmanaged stress state or performing procedures on request alone, which are not proper standards of conduct.

## explicit_objective
State that dressing professionally and wearing a visible name/identity badge is expected of medical students at all times during clinical practice.

## pitfalls
Treating an unmanaged, negative state such as accumulated exam or workload stress as an expected standard of conduct rather than something the module's own self-management content teaches students to address.

## concept_type
factual

## status
Draft

## support_mode
direct_statement

## subject
pop

## primary_node_id


## secondary_node_ids


## topic
Ethics, law and professionalism

## subtopic
Professional duties

## microtopic
Professional appearance and identification

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-PROFESSIONAL-CONDUCT

## related_article_ids


## related_concept_ids
CON-POP-CB0D0B3F25B6A3

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.25

## exam_weight_by_year
ZU_Y1=0.35

## clinical_relevance
0.45

## academic_relevance
0.35

## weight_confidence
0.4

## confidence
0.85

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Medical student have certain responsibilities different from those of other students. Being a medical student, at all times during your clinical practice you should: A) Dress professionally and wear a name/identity badge B) Keep your face fully covered to avoid infection C) Perform any medical procedure if the patient asked that D) Spend your time in stress from examinations and excessive workloads" ANSWER: A (gray fill-rectangle over option A, ad hoc PyMuPDF detection + render-confirmed, امتحانات سابقه.pdf p.10 Q59).

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this one compiled past-exam bank; a clinical-skills-course dress-code policy citation would strengthen this before publication.

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

---

# Item

## id
CON-POP-C0BA4B4254386F

## label
A patient's final say in treatment decisions depends on their being competent

## canonical_key
patientautonomy.competence-is-the-exception-to-patients-final-say

## aliases
Competence as the limit on shared decision-making
Final word in treatment choice

## arabic_label


## arabic_aliases


## definition
Medical decision making is a joint process involving physicians and the patient regarding treatment choice, and in the end, the final word rests with the patient unless the patient is not competent. Competence here means having the intellectual capacity to understand, analyse and judge the relevant information about their own treatment; when that capacity is absent, the final word shifts elsewhere, distinguishing this from a patient merely being unconfident or already autonomous, which is the state the final say ordinarily assumes.

## explicit_objective
State that a patient's final say in treatment decisions depends on their being competent.

## pitfalls
Treating "autonomous" or "confident" as the exception that removes a patient's final say, when autonomy is the ordinary basis for that final say and confidence is not the deciding factor; competence is the actual exception.

## concept_type
factual

## status
Draft

## support_mode
direct_statement

## subject
pop

## primary_node_id


## secondary_node_ids


## topic
Ethics, law and professionalism

## subtopic
Patient autonomy and consent

## microtopic
Limits on patient decision-making authority

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-BIOETHICS-EXTENDED

## related_article_ids
ART-POP-ZU105-BIOETHICS-PRINCIPLES

## related_concept_ids
CON-POP-4F06A9970BD361
CON-POP-BCB8B02BF5DBA2

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.35

## exam_weight_by_year
ZU_Y1=0.45

## clinical_relevance
0.5

## academic_relevance
0.5

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Medical decision making is a joint process involving the physicians and the patient regarding treatment choice. It should be a rational process based on a consideration of the facts, but in the end, the final word is with the patient unless he is: A) Autonomous B) Competent C) Minot D) Confident" ANSWER: B (gray fill-rectangle over option B, ad hoc PyMuPDF detection + render-confirmed, امتحانات سابقه.pdf p.11 Q60).

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty
Option C prints as "Minot" in the source, most plausibly a typo for "Minor"; transcribed verbatim in the question's options, with the likely-intended reading noted in the question's own explanation for that option.

## evidence_gaps
No department-book or corpus-indexed source beyond this one compiled past-exam bank; a medical-ethics/consent-law textbook citation would strengthen this before publication.

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

---

# Item

## id
CON-POP-06466A02085C03

## label
This source marks "implied consent must be signed by the patient" as true regarding limitations of medical consent

## canonical_key
impliedconsent.marked-as-requiring-signature-in-this-source

## aliases
Limitations of medical consent (as keyed)
Implied consent and signature requirement

## arabic_label


## arabic_aliases


## definition
This source's past-exam bank marks "implied consent must be signed by the patient" as the true statement regarding limitations of medical consent. Standard medical-consent teaching distinguishes implied consent, inferred from a patient's conduct such as presenting an arm for a blood draw, precisely by its lack of a signature requirement, which is instead a hallmark of express written consent, so this source's own marked statement sits in tension with that conventional teaching and is recorded here for reviewer attention rather than silently resolved.

## explicit_objective
Recognise how this source characterises a limitation of medical consent, and the tension with standard implied-consent teaching.

## pitfalls
Assuming "the patient retains the right to withdraw permission at any time", a widely taught, generally accepted principle, is this source's marked answer; this source's own printed key marks the implied-consent-signature statement instead, despite that statement's tension with standard consent doctrine.

## concept_type
factual

## status
Draft

## support_mode
direct_statement

## subject
pop

## primary_node_id


## secondary_node_ids


## topic
Ethics, law and professionalism

## subtopic
Patient autonomy and consent

## microtopic
Limitations of medical consent

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-BIOETHICS-EXTENDED

## related_article_ids
ART-POP-ZU105-BIOETHICS-PRINCIPLES

## related_concept_ids
CON-POP-0933BE06626CF2

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.2

## exam_weight_by_year
ZU_Y1=0.3

## clinical_relevance
0.35

## academic_relevance
0.35

## weight_confidence
0.2

## confidence
0.35

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Any physical examination or even blood test need a consent from the patient. The following is true regarding limitations of the medical consent: A) Consent must be taken from the guardian in emergency cases B) Criminal abortion necessitates informed written consent C) Implied consent must be signed by the patient D) The patient retains the right to withdraw permission at any time" ANSWER: C (gray fill-rectangle over option C, ad hoc PyMuPDF detection + render-confirmed, امتحانات سابقه.pdf p.11 Q62).

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty
Marked key (C, "implied consent must be signed") directly conflicts with standard consent doctrine, where implied consent is inferred from conduct and specifically does not require a signature (a hallmark of express/written consent instead); option D echoes a standard, generally accepted principle but is not the option marked. Render-confirmed the mark is genuinely and unambiguously on C (not a two-mark conflict), so it stands per corpus rule rather than being held; flagged strongly for reviewer attention as the most medically counterintuitive single mark in this cluster.

## evidence_gaps
No department-book or corpus-indexed source beyond this one compiled past-exam bank; a medical-ethics/consent-law textbook citation, or reviewer confirmation of the intended answer, would strengthen this before publication.

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

---

# Item

## id
CON-POP-D78EAE5356C6BF

## label
Requiring identical personal characteristics across all team members is not a real characteristic of successful teams

## canonical_key
successfulteams.characteristics-except-uniform-personnel-character

## aliases
What is not a team-success characteristic
Diversity within successful teams

## arabic_label


## arabic_aliases


## definition
Successful teams draw on complementary, diverse skills and personalities rather than requiring every member to share the same personal character. Effective communication, effective leadership, and good cohesion with mutual respect are genuine, widely recognised characteristics of successful teams; requiring uniform personnel characteristics is not, making it the exception among the four options this module's past-exam bank tests.

## explicit_objective
State that requiring identical personal characteristics across all team members is not a real characteristic of successful teams.

## pitfalls
Assuming a successful team requires members who share the same personality type or character, rather than recognising that complementary diversity, not uniformity, is what the source names as genuine.

## concept_type
factual

## status
Draft

## support_mode
direct_statement

## subject
pop

## primary_node_id


## secondary_node_ids


## topic
Professional skills and self-management

## subtopic
Team dynamics and leadership

## microtopic
Characteristics of successful teams

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-TEAMS-LEARNING

## related_article_ids
ART-POP-ZU105-TEAM-LEADERSHIP

## related_concept_ids
CON-POP-F442216AEE9CF5

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.3

## exam_weight_by_year
ZU_Y1=0.4

## clinical_relevance
0.35

## academic_relevance
0.55

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Characteristics of successful teams including all the following except: A) Effective communication B) Effective leadership C) Same personnel characters of all team members D) Good cohesion and mutual respect" ANSWER: C (gray fill-rectangle over option C, ad hoc PyMuPDF detection + render-confirmed, امتحانات سابقه.pdf p.11 Q63).

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this one compiled past-exam bank; a team-dynamics/leadership textbook citation would strengthen this before publication.

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

---

# Item

## id
CON-POP-A90D2EC3026247

## label
Genetic factors are a non-modifiable determinant of health

## canonical_key
healthdeterminants.genetic-factors-are-non-modifiable

## aliases
Modifiable versus non-modifiable determinants of health
Fixed determinants of health

## arabic_label


## arabic_aliases


## definition
Genetic factors are fixed at conception and cannot themselves be changed afterward by an individual's choices or by any policy intervention, making them a non-modifiable determinant of health. Behaviour and lifestyle, socio-economic factors, and the physical environment can all be altered through individual choice, policy or infrastructure, making each of them a modifiable determinant even where change is slow or structurally difficult.

## explicit_objective
State that genetic factors, unlike behaviour, socio-economic status or physical environment, are a non-modifiable determinant of health.

## pitfalls
Treating socio-economic factors or the physical environment as non-modifiable because change is slow or structurally difficult, when they remain modifiable in principle, unlike genetic factors.

## concept_type
factual

## status
Draft

## support_mode
direct_statement

## subject
pop

## primary_node_id


## secondary_node_ids


## topic
Professional skills and self-management

## subtopic
Health determinants

## microtopic
Modifiable vs non-modifiable determinants

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-TEAMS-LEARNING

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.3

## exam_weight_by_year
ZU_Y1=0.4

## clinical_relevance
0.35

## academic_relevance
0.55

## weight_confidence
0.4

## confidence
0.85

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following is NOT a modifiable determinant of health? A) Genetic factors B) Behavior and lifestyle C) Socio-economic factors D) Physical environment" ANSWER: A (gray fill-rectangle over option A, ad hoc PyMuPDF detection + render-confirmed, امتحانات سابقه.pdf p.11 Q64).

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this one compiled past-exam bank; a public-health/health-determinants textbook citation would strengthen this before publication.

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
