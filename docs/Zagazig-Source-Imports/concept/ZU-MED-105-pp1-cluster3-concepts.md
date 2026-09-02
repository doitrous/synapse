<!--
  ZU-MED-105 (Professional Practice I) -- 31 NEW concepts minted for pp1-cluster3,
  authored entirely from mcq شامل.pdf's Self-Directed-Learning section (pages 2-11
  of 44), backing pp1-cluster3's 32 authored questions (1 concept backs 2 questions --
  CON-POP-92DD5FB34120C6, the "adjust and adapt to suit student needs" implementation
  step, tested once as the false "doctor needs" exception and once as the correct
  "student needs" direct match -- every other concept backs exactly 1 question). This
  is the first authored material in this module on self-directed learning; lanes 1-2's
  62 questions (pp1-cluster1, pp1-cluster2) never touch SDL.

  Search-before-mint run against `find-existing.mjs` (short literal queries:
  self-directed learning, learning plan, learning needs, 360 appraisal, autonomy,
  beneficence, non-maleficence, privacy, confidentiality, team dynamics, forming,
  spectrum of health, determinants of health, SWOT, vulnerable groups, vulnerability,
  pluralism, stigmatization, non-discrimination, accountability, responsibility,
  bioethics, medical ethics, equity, equality, consent, wellness). "self-directed
  learning" hit ONE existing record: pp1-cluster2's `interestedlearner.staged-self-
  directed-learning-stage-two` concept (Grow's model, stage 2). Because this source's
  own SDL-stages material (the 4-stage ascendency model, stage 4 = self-directed
  learner) sits close enough to that existing concept's full-model coverage, the
  general "stages list" item (source Q18, "ascendency SDL competencies... include" =
  All of the above) was held rather than minted -- too close a restatement of ground
  the existing concept already covers -- while the stage-4-specific item (Q19) was
  judged a genuinely distinct sibling fact and minted fresh. "learning needs" hit
  pp1-cluster2's `learningneeds.definition...` concept (backing pp1-past-q48); this
  source's own "Learning needs are..." item (Q30) restates the identical fact in
  reverse MCQ orientation and was held as a duplicate rather than authored as a twin
  question. Every other search term relevant to this cluster's SDL content returned 0
  hits, confirming SDL is genuinely new territory in this module and this corpus.

  This pass deliberately does NOT author mcq شامل.pdf's remaining sections (pages
  12-40: bioethics-principles definitions, consent/confidentiality, vulnerability/
  dignity/pluralism/stigmatization, leadership/team-dynamics, health determinants).
  Those sections are triaged (keyed, method validated -- see coverage/ZU-MED-105-
  triage.md) but several of their facts sit too close to lane1/2's existing concepts
  (vertical equity, genetic-factors-non-modifiable-determinant) or to internal
  duplicates within mcq شامل.pdf itself (the bioethics-principles block is tested
  near-verbatim twice, on pages 12-16 and again on pages 16-23) to mint cleanly
  without further per-item review. Real remaining scope for a follow-up pass.

  No dedicated professionalism/ethics/self-management subject code exists in
  `src/data/curriculumCatalog.ts` -- every concept below uses `subject: pop`, matching
  pp1-cluster1/2 and the LANE-CARD's own note.

  Import: Admin › Concepts › Import.
-->


# Item

## id
CON-POP-9CD7F469384281

## label
Learning is the process of acquiring new understanding, knowledge, behaviors, skills, values, attitudes and preferences

## canonical_key
learning.definition-process-of-acquiring-new-understanding

## aliases
Definition of learning

## arabic_label


## arabic_aliases


## definition
Learning is the general process of acquiring new understanding, knowledge, behaviours, skills, values, attitudes and preferences. This source's self-directed-learning bank opens by testing this broad definition before narrowing to self-directed learning specifically, so that the two terms are not confused with each other. Learning is the umbrella process; self-directed learning is one particular way of carrying it out, driven by the learner's own initiative.

## explicit_objective
State the general definition of learning as the process of acquiring new understanding, knowledge, behaviours, skills, values, attitudes and preferences.

## pitfalls
Confusing this broad definition of learning with the narrower definition of self-directed learning, which specifically requires the learner's own initiative rather than describing the acquisition process in general.

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
Self-directed learning

## microtopic
Learning and SDL definitions

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-SDL-FOUNDATIONS

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
0.15

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Is the process of acquiring new understanding, knowledge, behaviors, skills, values, attitudes, and preferences. Refer to… A) Self-directed learning (SDL) B) Learning C) Learning materials D) teaching" ANSWER: B (yellow fill-rectangle over the correct option, ad hoc PyMuPDF detection, mcq شامل.pdf p.2)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this compiled self-directed-learning MCQ bank; a medical-education or SDL-theory textbook citation (e.g. Grow's staged self-directed learning model, already cited by this module's pp1-cluster2 concepts for a related fact) would strengthen this before publication.

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
CON-POP-7288A0F38E0B14

## label
Self-directed learning is a process in which individuals take the initiative, with or without the help of others

## canonical_key
sdl.definition-individual-initiative-with-or-without-help

## aliases
Definition of self-directed learning (SDL)

## arabic_label


## arabic_aliases


## definition
Self-directed learning (SDL) is a process in which individuals take the initiative, with or without the help of others, in identifying their own learning needs and pursuing them. The defining feature that separates SDL from learning in general is this element of learner-driven initiative. A learner may still seek help from teachers or peers under this definition; what matters is that the learner, not an instructor, initiates and drives the process.

## explicit_objective
State that self-directed learning is defined by the learner taking the initiative, with or without help from others, rather than by working alone.

## pitfalls
Assuming self-directed learning means learning entirely without any help from others, when the definition explicitly allows help, the defining feature is who takes the initiative, not whether help is used.

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
Self-directed learning

## microtopic
Learning and SDL definitions

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-SDL-FOUNDATIONS

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
0.15

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"A process in which individuals take the initiative, with or without the help of other. refer to A) Self-directed learning (SDL) B) Learning C) Learning materials D) teaching" ANSWER: A (yellow fill-rectangle over the correct option, ad hoc PyMuPDF detection, mcq شامل.pdf p.2)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this compiled self-directed-learning MCQ bank; a medical-education or SDL-theory textbook citation (e.g. Grow's staged self-directed learning model, already cited by this module's pp1-cluster2 concepts for a related fact) would strengthen this before publication.

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
CON-POP-6CB35064A4334E

## label
Learning materials are the curriculum-defined resources teachers use, and the procedures and devices that make teaching and learning more effective

## canonical_key
learningmaterials.definition-resources-and-devices-for-teaching

## aliases
Definition of learning materials

## arabic_label


## arabic_aliases


## definition
Learning materials are the resources that teachers use to help learners meet the expectations for learning defined by the curriculum, together with the procedures and devices that make teaching and learning more integrating, stimulating, reinforcing and effective. This source marks the combined definition as correct, treating the curriculum-alignment role and the procedures-and-devices role as two complementary parts of the same overall concept rather than as competing single answers. Learning materials therefore serve both a curriculum-fidelity function and a teaching-effectiveness function together.

## explicit_objective
State that learning materials combine curriculum-aligned teacher resources with the procedures and devices that make teaching and learning more effective.

## pitfalls
Picking only the curriculum-alignment description or only the procedures-and-devices description as the complete definition, when this source marks the combination of both as the correct answer.

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
Self-directed learning

## microtopic
Learning and SDL definitions

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-SDL-FOUNDATIONS

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
0.15

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Learning materials …….. A) The resources that teachers use to assist learners to meet the expectations for learning are defined by curriculum. B) implementing appropriate learning strategies, and evaluating learning outcomes. C) Are those procedures and devices that help to make teaching and learning more integrating, stimulating, reinforcing, and effective. D) A and C." ANSWER: D (yellow fill-rectangle over the correct option, ad hoc PyMuPDF detection, mcq شامل.pdf p.2)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this compiled self-directed-learning MCQ bank; a medical-education or SDL-theory textbook citation (e.g. Grow's staged self-directed learning model, already cited by this module's pp1-cluster2 concepts for a related fact) would strengthen this before publication.

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
CON-POP-080E3854128CCA

## label
Types of learning resources include audio, visual, and combined visual-audio resources

## canonical_key
learningresources.types-audio-visual-and-visual-audio

## aliases
Types of learning resources

## arabic_label


## arabic_aliases


## definition
Learning resources can be classified by the sense they primarily engage: audio learning resources (sound-based), visual learning resources (sight-based), and visual-audio learning resources that combine both channels. This source marks all three of these categories as valid types rather than treating any single one as the complete answer. Recognising all three types matters because a self-directed learner selecting resources needs to know the full range of formats available, not just one modality.

## explicit_objective
List audio, visual and visual-audio as the types of learning resources this source recognises.

## pitfalls
Naming only one sensory channel (audio or visual alone) as the complete set of resource types, when the combined visual-audio category is also a recognised, separate type.

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
Self-directed learning

## microtopic
Learning and SDL definitions

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-SDL-FOUNDATIONS

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
0.15

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Types of learning resources A) Audio learning resources B) Visual learning resources C) Visual-Audio learning resources D) ALL the above" ANSWER: D (yellow fill-rectangle over the correct option, ad hoc PyMuPDF detection, mcq شامل.pdf p.2)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this compiled self-directed-learning MCQ bank; a medical-education or SDL-theory textbook citation (e.g. Grow's staged self-directed learning model, already cited by this module's pp1-cluster2 concepts for a related fact) would strengthen this before publication.

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
CON-POP-DFDA6F203DDDB4

## label
Increasing hope is not a listed function of learning resources; promoting critical thinking, participation, interest, and saving time and effort, and using maximum senses are

## canonical_key
learningresources.functions-except-increase-hope

## aliases
Functions of learning resources (except)

## arabic_label


## arabic_aliases


## definition
This source lists five genuine functions of learning resources: promoting critical thinking, encouraging participation, capturing attention and interest, saving time and effort, and engaging the maximum number of senses. "Increasing hope" is not one of the functions this source names, which is why it is marked as the exception in an "all except" question. The five genuine functions all describe how resources support the cognitive and practical mechanics of learning, a different category from an emotional outcome like hope.

## explicit_objective
Identify that increasing hope is not among this source's listed functions of learning resources, unlike promoting critical thinking, participation, attention, efficiency and use of the senses.

## pitfalls
Assuming every positive-sounding outcome listed as a distractor, including "increasing hope", must be a genuine function, when this source specifically marks it as the one that is not.

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
Self-directed learning

## microtopic
Learning and SDL definitions

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-SDL-FOUNDATIONS

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
0.15

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Functions of learning resources all except A) Promote critical thinking B) Encourage participation C) Attention/interest D) Time and effort saving E) Use of maximum senses F) Increase the hope" ANSWER: F (yellow fill-rectangle over the correct option, ad hoc PyMuPDF detection, mcq شامل.pdf p.3). Source printed 6 options; the authored question trims to 5 by dropping option D ("Time and effort saving", still a genuine function per this concept's own definition) and re-lettering, keeping the marked exception "Increase the hope" as the correct answer, per the module's >5-options-trimmed-and-documented rule.

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this compiled self-directed-learning MCQ bank; a medical-education or SDL-theory textbook citation (e.g. Grow's staged self-directed learning model, already cited by this module's pp1-cluster2 concepts for a related fact) would strengthen this before publication.

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
CON-POP-8F139440920D13

## label
Benefits of self-directed learning include building soft skills, encouraging independence, and creating a collaborative learning environment, together

## canonical_key
sdl.benefits-except-none-all-of-above

## aliases
Benefits of self-directed learning

## arabic_label


## arabic_aliases


## definition
This source names three benefits of self-directed learning: building important soft skills, encouraging independence in learning, and creating a collaborative learning environment. It marks all three together as the correct answer rather than treating any single benefit as sufficient. These benefits combine an individual dimension (soft skills, independence) with a social one (collaboration), showing that SDL is not purely a solitary activity despite being learner-initiated.

## explicit_objective
List building soft skills, encouraging independence, and creating a collaborative learning environment as the benefits of self-directed learning this source names together.

## pitfalls
Treating self-directed learning as purely an individual, solitary activity, when this source also credits it with creating a collaborative learning environment alongside the individual benefits.

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
Self-directed learning

## microtopic
Learning and SDL definitions

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-SDL-FOUNDATIONS

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
0.15

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Importance / Benefits of Self-directed learning A) Building important soft skills B) Encouraging independence in learning, C) Creating a collaborative learning environment D) All of the above" ANSWER: D (yellow fill-rectangle over the correct option, ad hoc PyMuPDF detection, mcq شامل.pdf p.3)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this compiled self-directed-learning MCQ bank; a medical-education or SDL-theory textbook citation (e.g. Grow's staged self-directed learning model, already cited by this module's pp1-cluster2 concepts for a related fact) would strengthen this before publication.

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
CON-POP-CD9760EFED7A90

## label
The two broad subdivisions of self-directed-learning methods are facilitated learning and self-paced learning

## canonical_key
sdl.methods-two-subdivisions-facilitated-and-self-paced

## aliases
Methods of self-directed learning

## arabic_label


## arabic_aliases


## definition
This source divides self-directed-learning methods into two broad subdivisions: facilitated learning and self-paced learning. It marks the combination of these two ('facilitated learning' and 'self-paced learning' together) as the correct answer, over a third distractor of merely 'providing a template'. Facilitated learning still involves guidance from someone else, while self-paced learning is driven entirely by the learner's own timing and choices, so together they cover the full spectrum of how self-directed learning can be structured.

## explicit_objective
State that facilitated learning and self-paced learning are the two broad subdivisions of self-directed-learning methods this source names.

## pitfalls
Treating 'providing a template' as one of the two broad subdivisions of SDL methods, when this source marks it only as a distractor alongside facilitated and self-paced learning.

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
Self-directed learning

## microtopic
Learning and SDL definitions

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-SDL-FOUNDATIONS

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
0.15

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Methods of Self-directed learning: The two broad subdivisions of Self-directed learning are: A) Facilitated learning B) Self-paced learning C) Providing a template D) A and b E) B and c" ANSWER: D (yellow fill-rectangle over the correct option, ad hoc PyMuPDF detection, mcq شامل.pdf p.3)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this compiled self-directed-learning MCQ bank; a medical-education or SDL-theory textbook citation (e.g. Grow's staged self-directed learning model, already cited by this module's pp1-cluster2 concepts for a related fact) would strengthen this before publication.

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
CON-POP-B4EC3C06A58284

## label
Self-paced learning needs the learner to be motivated, oriented towards learning, and competent to choose suitable resources for the content required

## canonical_key
selfpacedlearning.definition-motivated-oriented-competent-to-choose-resources

## aliases
Definition of self-paced learning

## arabic_label


## arabic_aliases


## definition
Self-paced learning needs the learner to be motivated, oriented towards learning, and competent to choose suitable resources for the content required, without another person setting the pace. This distinguishes it from facilitated learning, which still involves guidance and structure supplied by someone else. Because the learner alone must judge which resources are suitable, self-paced learning places a heavier demand on the learner's own motivation and resource-selection competence than facilitated learning does.

## explicit_objective
State that self-paced learning requires the learner to be motivated, oriented towards learning, and competent to choose suitable resources independently.

## pitfalls
Confusing self-paced learning with facilitated learning, when the defining feature of self-paced learning is that the learner alone, not a facilitator, sets the pace and selects the resources.

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
Self-directed learning

## microtopic
Learning and SDL definitions

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-SDL-FOUNDATIONS

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
0.15

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"needs the learner to be motivated, oriented towards learning, and competent to choose suitable resources for the required content . refer to….. A) Facilitated learning B) Self-paced learning C) Providing a template D) A and b E) B and c" ANSWER: B (yellow fill-rectangle over the correct option, ad hoc PyMuPDF detection, mcq شامل.pdf p.3)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this compiled self-directed-learning MCQ bank; a medical-education or SDL-theory textbook citation (e.g. Grow's staged self-directed learning model, already cited by this module's pp1-cluster2 concepts for a related fact) would strengthen this before publication.

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
CON-POP-92DD5FB34120C6

## label
The final step to implement self-directed learning is to adjust and adapt teaching to suit student needs, not doctor needs

## canonical_key
sdlsteps.adjust-and-adapt-to-suit-student-needs

## aliases
Steps to implement SDL: adjust and adapt

## arabic_label


## arabic_aliases


## definition
Among the steps to implement self-directed learning, the final step is to adjust and adapt the approach to suit the needs of the student. This source tests this fact from two directions: as the exception in an 'all true except' question, where 'adjust and adapt to suit doctor needs' is marked false precisely because the adaptation should serve the student, not the physician role; and directly, where a stem describing teachers blending this method within classroom education to suit the needs and growth of students is matched to 'adjust and adapt to suit student needs'. Both questions rest on the same underlying fact: SDL implementation should be adapted around the learner, not around an unrelated party.

## explicit_objective
State that the adapt step in implementing self-directed learning means adjusting the approach to suit student needs, and recognise 'doctor needs' as a false substitution for that step.

## pitfalls
Accepting 'adjust and adapt to suit doctor needs' as a valid implementation step, when this source specifically marks it as the false, out-of-place option among otherwise genuine SDL implementation steps.

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
Self-directed learning

## microtopic
Implementing SDL

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-SDL-PROCESS

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
0.15

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Steps to implement self-directed learning: all true except A) Assess student readiness B) Set goals for learning C) Engage students in the process D) Adjust and adapt to suit doctor needs" ANSWER: D (yellow fill-rectangle over the correct option, ad hoc PyMuPDF detection, mcq شامل.pdf p.4) / "Teachers often blend this learning method within classroom education to suit the needs and growth of students . Refer to which Steps to implement self-directed learning is…. A) Assess student readiness B) Set goals for learning C) Engage students in the process D) Adjust and adapt to suit student needs" ANSWER: D (yellow fill-rectangle over the correct option, ad hoc PyMuPDF detection, mcq شامل.pdf p.4)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this compiled self-directed-learning MCQ bank; a medical-education or SDL-theory textbook citation (e.g. Grow's staged self-directed learning model, already cited by this module's pp1-cluster2 concepts for a related fact) would strengthen this before publication.

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
CON-POP-5FE8921B68EE1D

## label
Setting goals for learning gives students the freedom to study in their own way while adhering to firm rules to complete their work

## canonical_key
sdlsteps.set-goals-for-learning-step

## aliases
Steps to implement SDL: set goals

## arabic_label


## arabic_aliases


## definition
One step to implement self-directed learning is to set goals for learning: goals give students the freedom necessary to study in their own way, while still adhering to firm rules needed to complete the work. This balances learner autonomy against structure, since goals provide direction without dictating the exact path a student must follow to reach them. This step sits alongside assessing student readiness, engaging students in the process, and adjusting to suit student needs as one of the four recognised implementation steps in this source.

## explicit_objective
State that setting goals for learning is the SDL implementation step that gives students freedom to study their own way while still requiring firm rules to complete the work.

## pitfalls
Confusing the goal-setting step, which balances freedom with firm completion rules, with the separate 'engage students in the process' or 'assess student readiness' steps in this source's four-step implementation sequence.

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
Self-directed learning

## microtopic
Implementing SDL

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-SDL-PROCESS

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
0.15

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Goals provide students with the freedom necessary to study in their own way while adhering to firm rules to complete their work. Refer to which Steps to implement self-directed learning is…. A) Assess student readiness B) Set goals for learning C) Engage students in the process D) Adjust and adapt to suit doctor needs" ANSWER: B (yellow fill-rectangle over the correct option, ad hoc PyMuPDF detection, mcq شامل.pdf p.4)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this compiled self-directed-learning MCQ bank; a medical-education or SDL-theory textbook citation (e.g. Grow's staged self-directed learning model, already cited by this module's pp1-cluster2 concepts for a related fact) would strengthen this before publication.

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
CON-POP-8245F23357A485

## label
Evaluating the effectiveness of learning includes frequent evaluation, consulting the teacher, seeking feedback, and regularly reflecting on what was learned

## canonical_key
sdl.evaluate-effectiveness-of-learning-all-of-above

## aliases
Evaluating the effectiveness of learning

## arabic_label


## arabic_aliases


## definition
This source lists four practices for evaluating the effectiveness of learning: frequent evaluation that lets students reflect on their learning and progress, consulting with the teacher, seeking feedback, and regularly thinking about what has been learned. It marks all four together as the correct answer rather than singling out any one practice. Together they combine self-reflection, external consultation and deliberate feedback-seeking as complementary ways to judge whether learning has actually been effective.

## explicit_objective
List frequent evaluation, teacher consultation, feedback-seeking, and regular reflection together as this source's practices for evaluating the effectiveness of learning.

## pitfalls
Treating self-reflection alone as sufficient to evaluate learning effectiveness, when this source also credits consulting the teacher and actively seeking feedback as necessary complementary practices.

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
Self-directed learning

## microtopic
Implementing SDL

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-SDL-PROCESS

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
0.15

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Evaluate the effectiveness of learning include…. A) Frequent evaluation allows students to reflect on their learning and progress. B) Consulting with the teacher. C) Seeking feedback D) Regularly thinking about what they have learned is helpful. E) All of the above ." ANSWER: E (yellow fill-rectangle over the correct option, ad hoc PyMuPDF detection, mcq شامل.pdf p.5)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this compiled self-directed-learning MCQ bank; a medical-education or SDL-theory textbook citation (e.g. Grow's staged self-directed learning model, already cited by this module's pp1-cluster2 concepts for a related fact) would strengthen this before publication.

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
CON-POP-884F98BACEF2F0

## label
Evaluating professionalism is not a listed competency of self-directed learners; self-awareness, critical appraisal, critical thinking, and reflection are

## canonical_key
sdlcompetencies.except-evaluating-the-professionalism

## aliases
Competencies of self-directed learners (except)

## arabic_label


## arabic_aliases


## definition
This source names four genuine competencies of self-directed learners: self-awareness, critical appraisal, critical thinking, and reflection. 'Evaluating the professionalism' is not one of the competencies this source lists, which is why it is marked as the exception in an 'all are... except' question. The four genuine competencies all describe internal cognitive and reflective capacities a learner directs at their own learning process, a different category from judging professionalism as an external standard.

## explicit_objective
Identify that evaluating professionalism is not among this source's listed competencies of self-directed learners, unlike self-awareness, critical appraisal, critical thinking and reflection.

## pitfalls
Assuming any plausible-sounding professional skill, including evaluating professionalism, must be one of the SDL competencies, when this source specifically marks it as the exception.

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
Self-directed learning

## microtopic
Implementing SDL

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-SDL-PROCESS

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
0.15

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"All are the Competencies of Self-directed learners . except. A) Self-awareness B) Critical appraisal C) Critical thinking D) Evaluating the professionalism E) Reflection" ANSWER: D (yellow fill-rectangle over the correct option, ad hoc PyMuPDF detection, mcq شامل.pdf p.5)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this compiled self-directed-learning MCQ bank; a medical-education or SDL-theory textbook citation (e.g. Grow's staged self-directed learning model, already cited by this module's pp1-cluster2 concepts for a related fact) would strengthen this before publication.

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
CON-POP-1B10F39EC84BF8

## label
The process of self-directed learning includes assessing the task at hand, evaluating one's own strengths and weaknesses, and practising and monitoring one's own performance

## canonical_key
sdlprocess.assess-strength-weakness-practice-monitor-all-of-above

## aliases
Process of self-directed learning

## arabic_label


## arabic_aliases


## definition
This source describes the process of self-directed learning as including assessing the task at hand, evaluating one's own strengths and weaknesses, and practising and monitoring one's own performance, marking all three together as the correct answer. This process is inherently self-referential: the learner must assess the task, judge their own capability against it, and then monitor their own execution, rather than relying on an external party to perform any of these steps. Together these three activities form a repeating cycle a self-directed learner works through for each new learning task.

## explicit_objective
List assessing the task, evaluating one's own strengths and weaknesses, and practising and monitoring one's own performance together as the process of self-directed learning this source describes.

## pitfalls
Treating self-assessment of strengths and weaknesses as sufficient on its own to describe the SDL process, when this source also requires assessing the task itself and practising and monitoring performance.

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
Self-directed learning

## microtopic
Implementing SDL

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-SDL-PROCESS

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
0.15

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Process of self-directed learning include A) Assess the task at hand B) Evaluate own strength and weakness C) Practice and monitor own performance D) All of the above" ANSWER: D (yellow fill-rectangle over the correct option, ad hoc PyMuPDF detection, mcq شامل.pdf p.5)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this compiled self-directed-learning MCQ bank; a medical-education or SDL-theory textbook citation (e.g. Grow's staged self-directed learning model, already cited by this module's pp1-cluster2 concepts for a related fact) would strengthen this before publication.

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
CON-POP-EB4ED5CBBC3672

## label
The process of self-directed learning involves the student's belief about intelligence and learning

## canonical_key
sdlprocess.students-belief-about-intelligence-and-learning

## aliases
Beliefs in the SDL process

## arabic_label


## arabic_aliases


## definition
Within the process of self-directed learning, this source marks the student's belief about intelligence and learning itself as a relevant factor, over distractors about belief in reality, love or hope. This reflects a mindset dimension of self-directed learning: how a student thinks about whether intelligence and ability can grow through effort shapes how willingly that student takes the initiative the definition of SDL requires. A student who believes intelligence and learning ability are fixed is less likely to engage fully in self-directed effort than one who believes they can develop.

## explicit_objective
State that a student's belief about intelligence and learning, rather than belief about reality, love or hope, is the factor this source names within the SDL process.

## pitfalls
Treating this as a question about general personal beliefs (reality, love, hope) rather than recognising that only belief about intelligence and learning is the mindset factor this source ties to the SDL process.

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
Self-directed learning

## microtopic
Implementing SDL

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-SDL-PROCESS

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
0.15

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"In the Process of self-directed learning A) Student s belief about intelligence and learning B) Student s belief about reality C) Student s belief about love D) Student s belief about hope" ANSWER: A (yellow fill-rectangle over the correct option, ad hoc PyMuPDF detection, mcq شامل.pdf p.5)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this compiled self-directed-learning MCQ bank; a medical-education or SDL-theory textbook citation (e.g. Grow's staged self-directed learning model, already cited by this module's pp1-cluster2 concepts for a related fact) would strengthen this before publication.

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
CON-POP-FE5DFDE4DA899F

## label
The ascendency of SDL competencies in students proceeds through 4 stages

## canonical_key
sdlstages.four-stages-of-student-sdl

## aliases
Number of SDL ascendency stages

## arabic_label


## arabic_aliases


## definition
This source states that the ascendency of self-directed-learning competencies in students proceeds through 4 stages, rather than 2, 3 or 5. This staged model tracks a learner's growth from needing explicit direction toward becoming fully self-directed, with competence building cumulatively across each stage rather than appearing all at once. Knowing the correct stage count matters for correctly identifying which specific stage a given description belongs to elsewhere in this source's SDL-stages material.

## explicit_objective
State that this source's SDL-competency ascendency model has 4 stages.

## pitfalls
Miscounting the number of stages in the SDL-competency ascendency model as 2, 3 or 5 instead of the 4 this source specifies.

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
Self-directed learning

## microtopic
Implementing SDL

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-SDL-PROCESS

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
0.15

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"The ascendency of SDL competencies in the students are A) The 5 stages of the Student SDL B) The 3 stages of the Student SDL C) The 4 stages of the Student SDL D) The 2 stages of the Student SDL" ANSWER: C (yellow fill-rectangle over the correct option, ad hoc PyMuPDF detection, mcq شامل.pdf p.5)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this compiled self-directed-learning MCQ bank; a medical-education or SDL-theory textbook citation (e.g. Grow's staged self-directed learning model, already cited by this module's pp1-cluster2 concepts for a related fact) would strengthen this before publication.

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
CON-POP-4853A6DBF7003B

## label
Stage 4 of the ascendency of SDL competencies is when students attain the level of a self-directed learner

## canonical_key
sdlstages.stage-four-is-self-directed-learner

## aliases
SDL ascendency stage 4

## arabic_label


## arabic_aliases


## definition
In this source's 4-stage SDL-competency ascendency model, stage 4 is reached when students attain the level of a self-directed learner, distinguishing it from the dependent, interested and involved learner stages that this source uses as distractors for the same question. Stage 4 represents the endpoint of the ascendency sequence, where the learner no longer needs the scaffolding that earlier stages require. Recognising stage 4 specifically as 'self-directed learner' matters because the earlier stages in this same progression are named and tested elsewhere in this module's material.

## explicit_objective
State that stage 4 of this source's SDL-competency ascendency model is when a student attains the level of a self-directed learner.

## pitfalls
Confusing stage 4 (self-directed learner) with an earlier stage in the same ascendency sequence, such as the dependent, interested or involved learner stages used as distractors here.

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
Self-directed learning

## microtopic
Implementing SDL

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-SDL-PROCESS

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
0.15

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"The Stage 4 of The ascendency of SDL competencies in the students are.. A) The student is a Dependent learner B) The student is an interested learner. C) The students attain the level of Self-directed learn D) The student is an involved learner." ANSWER: C (yellow fill-rectangle over the correct option, ad hoc PyMuPDF detection, mcq شامل.pdf p.6)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this compiled self-directed-learning MCQ bank; a medical-education or SDL-theory textbook citation (e.g. Grow's staged self-directed learning model, already cited by this module's pp1-cluster2 concepts for a related fact) would strengthen this before publication.

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
CON-POP-3B70434C3F15BA

## label
Co-operation is not a recommended method for assessing SDL competencies; self-assessment, logbook, peer assessment, and portfolio are

## canonical_key
sdlassessment.methods-except-co-operation

## aliases
Methods to assess SDL competencies (except)

## arabic_label


## arabic_aliases


## definition
This source names four recommended methods for assessing self-directed-learning competencies: self-assessment, keeping a logbook, peer assessment, and a portfolio for the SDL work. 'Co-operation' is not one of the recommended assessment methods this source lists, which is why it is marked as the exception in an 'except' question. The four genuine methods each produce some form of record or judgement of the learner's SDL competence, a different category from co-operation, which describes a general working relationship rather than an assessment technique.

## explicit_objective
Identify that co-operation is not among this source's recommended methods for assessing SDL competencies, unlike self-assessment, a logbook, peer assessment and a portfolio.

## pitfalls
Assuming any generally positive working behaviour, including co-operation, must count as an assessment method for SDL competencies, when this source specifically marks it as the exception.

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
Self-directed learning

## microtopic
Implementing SDL

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-SDL-PROCESS

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
0.15

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"How to assess your competencies from SDL? all are recommended methods for the assessment of the SDL competencies.except A) Self-assessment B) logbook, C) peer assessment D) portfolio for the SDL E) co-operation" ANSWER: E (yellow fill-rectangle over the correct option, ad hoc PyMuPDF detection, mcq شامل.pdf p.6)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this compiled self-directed-learning MCQ bank; a medical-education or SDL-theory textbook citation (e.g. Grow's staged self-directed learning model, already cited by this module's pp1-cluster2 concepts for a related fact) would strengthen this before publication.

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
CON-POP-04BE7EB0144E77

## label
A learning plan is a document designed to help you reflect upon and structure your learning for success in examinations and your career, based on self-reflection and objective evaluation

## canonical_key
learningplan.definition-document-for-reflection-and-structure

## aliases
Definition of a learning plan

## arabic_label


## arabic_aliases


## definition
A learning plan is a document designed to help a learner reflect upon and structure their learning for success in examinations and their career in general practice, and it is based upon self-reflection combined with an objective evaluation of the learner's own skills and knowledge. This source marks the combination of these two descriptions as the correct answer, over a third distractor describing it merely as 'a set of skills that can be taught, learned, and acquired'. A learning plan is therefore both a concrete document and a process grounded in honest self-evaluation, not simply a skill someone possesses.

## explicit_objective
State that a learning plan is a document for structuring learning toward exam and career success, grounded in self-reflection and objective self-evaluation.

## pitfalls
Describing a learning plan as merely 'a set of skills that can be taught, learned and acquired', when this source marks the document-plus-self-evaluation description as the correct combined answer instead.

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
Self-directed learning

## microtopic
Learning plans

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-LEARNING-PLANS

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
0.15

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"A learning plan is………….. A) a document designed to help you reflect upon and structure your learning for success in examinations and your career in general practice. B) based upon self-reflection and an objective evaluation of your skills and knowledge. C) a set of skills that can be taught, learned, and acquired D) a an b E) all of the above" ANSWER: D (yellow fill-rectangle over the correct option, ad hoc PyMuPDF detection, mcq شامل.pdf p.7)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this compiled self-directed-learning MCQ bank; a medical-education or SDL-theory textbook citation (e.g. Grow's staged self-directed learning model, already cited by this module's pp1-cluster2 concepts for a related fact) would strengthen this before publication.

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
CON-POP-73D8106528D745

## label
A learning plan aims to centre learning on current practice, support informed choices, integrate theory and practice, and enhance motivation to learn

## canonical_key
learningplan.aims-all-of-the-above

## aliases
Aims of a learning plan

## arabic_label


## arabic_aliases


## definition
This source lists four aims of a learning plan: to place the learner at the centre of the learning process using current practice as the basis of learning, to help the learner make informed choices about their education needs, to help integrate theory and practice into the learner's work, and to enhance motivation to learn and to ask appropriate questions of oneself and others. It marks all four together as the correct answer rather than any single aim alone. Together these aims connect a learning plan's practical starting point (current practice) to its ultimate purpose (sustained motivation and better-integrated knowledge).

## explicit_objective
List centring on current practice, supporting informed choices, integrating theory and practice, and enhancing motivation together as the aims of a learning plan this source names.

## pitfalls
Treating any single aim, such as motivation alone, as the complete purpose of a learning plan, when this source credits all four listed aims together.

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
Self-directed learning

## microtopic
Learning plans

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-LEARNING-PLANS

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
0.15

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"A learning plan aims to: A) place you at the center of the learning process, and use your current practice as the basis of learning B) assist you to make informed choices about your education needs C) assist you to integrate theory and practice into your work D) enhance your motivation to learn and to ask appropriate questions of yourself and others E) all of the above" ANSWER: E (yellow fill-rectangle over the correct option, ad hoc PyMuPDF detection, mcq شامل.pdf p.7)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this compiled self-directed-learning MCQ bank; a medical-education or SDL-theory textbook citation (e.g. Grow's staged self-directed learning model, already cited by this module's pp1-cluster2 concepts for a related fact) would strengthen this before publication.

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
CON-POP-D2A2BD04821724

## label
Developing a learning plan requires identifying learning needs so that learning goals can be formulated, as part of a cyclical process

## canonical_key
learningplan.development-cyclical-process-needs-and-goals

## aliases
Developing a learning plan

## arabic_label


## arabic_aliases


## definition
To develop a learning plan, learning needs must first be identified so that learning goals can be formulated from them, and this source marks that development as part of a cyclical process rather than a one-off, linear task. This source's correct answer combines both facts (needs-then-goals, and the cyclical nature of the process) over a distractor suggesting the learner should simply 'depend on yourself' without this structured needs-to-goals sequence. Because the process is cyclical, a learning plan is expected to be revisited and updated as needs and goals change over time, not written once and left unchanged.

## explicit_objective
State that developing a learning plan requires identifying learning needs to formulate goals, as part of a cyclical rather than one-off process.

## pitfalls
Treating learning-plan development as a single linear task of listing goals, when this source specifically marks it as a cyclical process that starts from identifying learning needs.

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
Self-directed learning

## microtopic
Learning plans

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-LEARNING-PLANS

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
0.15

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"To develop learning plan …. A) needs must be identified and so learning goals can be formulated B) Developing a learning plan consists of a cyclical process C) You should depend on your self D) All o the above E) A and b" ANSWER: E (yellow fill-rectangle over the correct option, ad hoc PyMuPDF detection, mcq شامل.pdf p.7)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this compiled self-directed-learning MCQ bank; a medical-education or SDL-theory textbook citation (e.g. Grow's staged self-directed learning model, already cited by this module's pp1-cluster2 concepts for a related fact) would strengthen this before publication.

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
CON-POP-E40D5DCE94F41A

## label
Uncovering gaps in one's knowledge is best done using more than one method, combining subjective and objective approaches

## canonical_key
learningneedsgaps.methods-to-uncover-combination-of-methods

## aliases
Methods to uncover knowledge gaps

## arabic_label


## arabic_aliases


## definition
To uncover the gaps in a learner's knowledge, this source marks the correct approach as using more than one method, because a combination of subjective and objective methods together gives a better overall picture of a learner's knowledge gaps than either alone. This is marked as the combination of these two related statements, over a distractor recommending the use of only one method. Relying on a single method risks missing gaps that only a different type of method, subjective or objective, would reveal.

## explicit_objective
State that uncovering gaps in one's knowledge is best done by combining more than one method, including both subjective and objective approaches together.

## pitfalls
Assuming a single assessment method is sufficient to uncover knowledge gaps, when this source specifically marks using more than one method, combining subjective and objective approaches, as correct.

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
Self-directed learning

## microtopic
Learning needs assessment

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-LEARNING-PLANS

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
0.15

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"According to methods to help you uncover the gaps in your knowledge the following are true A) It is best to use more than one method B) a combination of subjective and objective methods often gives a better overall picture of your knowledge gaps. C) Use one method only D) A and b" ANSWER: D (yellow fill-rectangle over the correct option, ad hoc PyMuPDF detection, mcq شامل.pdf p.8)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this compiled self-directed-learning MCQ bank; a medical-education or SDL-theory textbook citation (e.g. Grow's staged self-directed learning model, already cited by this module's pp1-cluster2 concepts for a related fact) would strengthen this before publication.

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
CON-POP-3FE77513FD6195

## label
Learning-needs assessment methods include 360-degree appraisal, critical incident reviews, and self-assessment, together

## canonical_key
learningneedsassessment.methods-list-all-of-the-above

## aliases
Learning-needs assessment methods

## arabic_label


## arabic_aliases


## definition
This source names three learning-needs assessment methods: 360-degree appraisal, critical incident reviews, and self-assessment, marking all three together as the correct answer rather than any single method. These three methods draw on different sources of information: 360-degree appraisal gathers views from multiple people around the learner, critical incident reviews examine specific past events, and self-assessment relies on the learner's own judgement. Together they give a learner several complementary ways to identify their own learning needs.

## explicit_objective
List 360-degree appraisal, critical incident reviews and self-assessment together as this source's learning-needs assessment methods.

## pitfalls
Treating self-assessment alone as sufficient to identify learning needs, when this source also credits 360-degree appraisal and critical incident reviews as complementary assessment methods.

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
Self-directed learning

## microtopic
Learning needs assessment

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-LEARNING-PLANS

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
0.15

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Learning needs assessment methods:are A) 360° appraisal B) Critical incident reviews C) Self-assessment D) All of the above" ANSWER: D (yellow fill-rectangle over the correct option, ad hoc PyMuPDF detection, mcq شامل.pdf p.8)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this compiled self-directed-learning MCQ bank; a medical-education or SDL-theory textbook citation (e.g. Grow's staged self-directed learning model, already cited by this module's pp1-cluster2 concepts for a related fact) would strengthen this before publication.

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
CON-POP-52FB910B52C075

## label
Practice reviews could involve using data that already exists, or doing a formal patient satisfaction questionnaire

## canonical_key
practicereviews.definition-existing-data-or-satisfaction-questionnaire

## aliases
Definition of practice reviews

## arabic_label


## arabic_aliases


## definition
Practice reviews, as a learning-needs assessment method, could involve using data that already exists or doing a formal patient satisfaction questionnaire. This distinguishes practice reviews from 360-degree appraisal (which gathers direct feedback from colleagues) and from self-assessment (which relies purely on the learner's own judgement), since practice reviews draw specifically on existing practice-level data or a structured patient survey. Recognising this distinction matters because these methods are frequently tested against one another as near-identical-sounding distractors in this source's material.

## explicit_objective
State that practice reviews use existing data or a formal patient satisfaction questionnaire, distinguishing this method from 360-degree appraisal and self-assessment.

## pitfalls
Confusing practice reviews, which use existing data or a patient satisfaction questionnaire, with 360-degree appraisal, which instead gathers direct colleague feedback about the learner's own performance.

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
Self-directed learning

## microtopic
Learning needs assessment

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-LEARNING-PLANS

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
0.15

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Could involve using data that already exist or doing a formal patient satisfaction questionnaire. Refer to…….. A) 360° appraisal B) practice reviews C) Self-assessment D) Observation" ANSWER: B (yellow fill-rectangle over the correct option, ad hoc PyMuPDF detection, mcq شامل.pdf p.8)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this compiled self-directed-learning MCQ bank; a medical-education or SDL-theory textbook citation (e.g. Grow's staged self-directed learning model, already cited by this module's pp1-cluster2 concepts for a related fact) would strengthen this before publication.

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
CON-POP-4928854B1DDF75

## label
Prioritizing learning needs in a systematic and fair way involves assessing the situation, analyzing the data, prioritizing the needs, and communicating the results

## canonical_key
prioritizelearningneeds.steps-systematic-fair-way-all-of-above

## aliases
Steps to prioritize learning needs

## arabic_label


## arabic_aliases


## definition
This source lists four steps to prioritize learning needs in a systematic and fair way: assessing the situation, analyzing the data, prioritizing the needs themselves, and communicating the results, marking all four together as the correct answer. This four-step sequence moves from gathering information (assess, analyze) through to decision-making (prioritize) and finally to sharing that decision with others (communicate). Missing any one of the four steps would leave the prioritisation process either poorly informed or poorly acted upon.

## explicit_objective
List assessing the situation, analyzing the data, prioritizing the needs and communicating the results together as this source's steps to prioritize learning needs systematically and fairly.

## pitfalls
Treating assessment and analysis alone as sufficient to prioritize learning needs, when this source also requires the further steps of prioritizing the needs and communicating the results.

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
Self-directed learning

## microtopic
Learning needs assessment

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-LEARNING-PLANS

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
0.15

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Steps to prioritize learning needs in a systematic and fair way A) Assess the situation B) Analyze the data C) Prioritize the needs D) Communicate the results E) All of the above" ANSWER: E (yellow fill-rectangle over the correct option, ad hoc PyMuPDF detection, mcq شامل.pdf p.9)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this compiled self-directed-learning MCQ bank; a medical-education or SDL-theory textbook citation (e.g. Grow's staged self-directed learning model, already cited by this module's pp1-cluster2 concepts for a related fact) would strengthen this before publication.

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
CON-POP-EE4FAFD2340040

## label
Assessing the situation, the first step in prioritizing learning needs, uses methods such as observations, performance reviews, or tests

## canonical_key
prioritizelearningneeds.assess-the-situation-step

## aliases
Assess-the-situation step

## arabic_label


## arabic_aliases


## definition
Before learning needs can be prioritized, the current situation must first be assessed, using various methods to collect data such as observations, performance reviews, or tests. This source identifies this specific first step, 'assess the situation', as the one being described, distinguishing it from the later steps of analyzing the data, prioritizing the needs, or communicating the results within the same four-step sequence. Because this step comes first, the quality of the data collected here shapes how well the later analysis and prioritisation steps can actually work.

## explicit_objective
State that assessing the situation using observations, performance reviews or tests is the first step in this source's sequence for prioritizing learning needs.

## pitfalls
Confusing the assess-the-situation step with the later analyze-the-data step in the same four-step prioritisation sequence, when this stem specifically describes the initial data-collection step.

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
Self-directed learning

## microtopic
Learning needs assessment

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-LEARNING-PLANS

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
0.15

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Before you can prioritize learning needs, you need to assess the current situation. You can use various methods to collect data, such as observations, performance reviews, or tests refer to A) Assess the situation B) Analyze the data C) Prioritize the needs D) Communicate the results" ANSWER: A (yellow fill-rectangle over the correct option, ad hoc PyMuPDF detection, mcq شامل.pdf p.9)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this compiled self-directed-learning MCQ bank; a medical-education or SDL-theory textbook citation (e.g. Grow's staged self-directed learning model, already cited by this module's pp1-cluster2 concepts for a related fact) would strengthen this before publication.

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
CON-POP-01ED4BE8794CB4

## label
Tools and frameworks that help prioritize learning needs include the SWOT analysis, the KSA analysis, and the ADDIE model, together

## canonical_key
learningneedstools.swot-ksa-addie-frameworks

## aliases
Frameworks for prioritizing learning needs

## arabic_label


## arabic_aliases


## definition
This source names three tools and frameworks that can help with the process of prioritizing learning needs: the SWOT analysis, the KSA (knowledge, skills, attitudes) analysis, and the ADDIE (analysis, design, development, implementation, evaluation) model, marking all three together as the correct answer. These three frameworks are borrowed from broader management and instructional-design practice rather than being unique to self-directed learning, but this source specifically credits all three as usable tools for this purpose. Knowing that all three are valid, rather than just one, matters for recognising the range of structured approaches available to a learner prioritising their own needs.

## explicit_objective
List the SWOT analysis, the KSA analysis and the ADDIE model together as the tools and frameworks this source names for prioritizing learning needs.

## pitfalls
Assuming only one of SWOT, KSA or ADDIE is the correct framework for this purpose, when this source marks all three together as valid tools.

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
Self-directed learning

## microtopic
Learning needs assessment

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-LEARNING-PLANS

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
0.15

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"You can use different tools and frameworks to help you with this process, such as A) the SWOT analysis B) the KSA analysis C) the ADDIE model D) all of the above" ANSWER: D (yellow fill-rectangle over the correct option, ad hoc PyMuPDF detection, mcq شامل.pdf p.10)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this compiled self-directed-learning MCQ bank; a medical-education or SDL-theory textbook citation (e.g. Grow's staged self-directed learning model, already cited by this module's pp1-cluster2 concepts for a related fact) would strengthen this before publication.

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
CON-POP-3F82C113E0CF3E

## label
Learning needs and their causes are prioritized based on importance and urgency, feasibility, and relevance and demand, together

## canonical_key
prioritizelearningneeds.basis-importance-feasibility-relevance

## aliases
Basis for prioritizing learning needs

## arabic_label


## arabic_aliases


## definition
After learning needs and their causes have been identified, this source marks the basis for prioritizing them as importance and urgency, feasibility (considering cost, time and resources), and relevance and demand, taken together rather than any single criterion alone. Weighing all three criteria together prevents a learner from prioritising a need that is important but currently infeasible, or one that is easy to address but not actually relevant or in demand. This combined-criteria approach mirrors the combined, 'all of the above' pattern this source uses repeatedly across its learning-needs material.

## explicit_objective
List importance and urgency, feasibility, and relevance and demand together as the basis this source names for prioritizing identified learning needs.

## pitfalls
Prioritizing learning needs on a single criterion such as importance alone, when this source also requires weighing feasibility and relevance and demand together with it.

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
Self-directed learning

## microtopic
Learning needs assessment

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-LEARNING-PLANS

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
0.15

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"After you have identified the learning needs and their causes, you need to prioritize them based on : A) Importance.Urgency. B) Feasibility (cost, time & resources). Impact. C) Relevance.Demand. D) All of the above" ANSWER: D (yellow fill-rectangle over the correct option, ad hoc PyMuPDF detection, mcq شامل.pdf p.10)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this compiled self-directed-learning MCQ bank; a medical-education or SDL-theory textbook citation (e.g. Grow's staged self-directed learning model, already cited by this module's pp1-cluster2 concepts for a related fact) would strengthen this before publication.

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
CON-POP-348C6A8E287628

## label
The final step in prioritizing learning needs is to communicate the results

## canonical_key
prioritizelearningneeds.final-step-communicate-results

## aliases
Final step in prioritizing learning needs

## arabic_label


## arabic_aliases


## definition
In this source's four-step sequence for prioritizing learning needs, assess the situation, analyze the data, prioritize the needs, and communicate the results, the final step is specifically to communicate the results. This closes the sequence by ensuring the prioritisation decision reaches the people who need to act on it, rather than remaining only as an internal judgement the learner keeps to themselves. Recognising communication as the final, not an earlier, step matters because this source tests each of the four steps individually elsewhere in its material.

## explicit_objective
State that communicating the results is the final step in this source's four-step sequence for prioritizing learning needs.

## pitfalls
Placing 'communicate the results' earlier in the sequence, such as confusing it with assessing the situation, when this source specifically marks it as the final step after the needs have already been prioritized.

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
Self-directed learning

## microtopic
Learning needs assessment

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-LEARNING-PLANS

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
0.15

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"The final step in prioritizing learning needs is A) Assess the situation B) Analyze the data C) Prioritize the needs D) Communicate the results" ANSWER: D (yellow fill-rectangle over the correct option, ad hoc PyMuPDF detection, mcq شامل.pdf p.10)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this compiled self-directed-learning MCQ bank; a medical-education or SDL-theory textbook citation (e.g. Grow's staged self-directed learning model, already cited by this module's pp1-cluster2 concepts for a related fact) would strengthen this before publication.

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
CON-POP-D99CB8ECFCDF1C

## label
After assessing learning needs, the next step in developing a learning plan is identification of learning goals

## canonical_key
learningplan.next-step-after-needs-assessment-identify-goals

## aliases
Next step after assessing learning needs

## arabic_label


## arabic_aliases


## definition
After learning needs have been assessed, this source marks the next step in developing a learning plan as the identification of learning goals, ahead of the later steps of identifying learning resources and support, forms of evidence of learning, and specifying timeframes and mode of contact. This places goal-setting immediately after needs assessment in the overall learning-plan development sequence, before a learner moves on to identifying the resources or evidence a plan will use. Getting this order right matters because this source treats learning-plan development as a defined multi-step sequence, tested step by step elsewhere in its material.

## explicit_objective
State that identification of learning goals is the step that follows assessing learning needs in this source's learning-plan development sequence.

## pitfalls
Placing resource identification or evidence-of-learning identification immediately after needs assessment, when this source specifically marks goal identification as the step that comes next.

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
Self-directed learning

## microtopic
Learning needs assessment

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-LEARNING-PLANS

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
0.15

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"After assessing learning needs, here are the next step in developing learning plan: A) Identification of learning goals B) Identification of learning resources, supports and strategies C) Identification of forms of evidence of learning D) Specify timeframes and mode of contact" ANSWER: A (yellow fill-rectangle over the correct option, ad hoc PyMuPDF detection, mcq شامل.pdf p.10)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this compiled self-directed-learning MCQ bank; a medical-education or SDL-theory textbook citation (e.g. Grow's staged self-directed learning model, already cited by this module's pp1-cluster2 concepts for a related fact) would strengthen this before publication.

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
CON-POP-BBD0AD95EE9894

## label
Identifying learning resources, supports and strategies includes the availability of and confidence to access people, resources, and technology

## canonical_key
learningresourcesidentification.includes-people-resources-technology

## aliases
Identifying learning resources, supports and strategies

## arabic_label


## arabic_aliases


## definition
Identifying learning resources, supports and strategies, a step in developing a learning plan, includes the learner's availability of and confidence to access people, resources, and technology, and this source marks all three together as the correct answer. Each of the three, people, material resources, and technology, represents a different channel through which a learner can obtain support, so a complete identification step must consider all three rather than only one. This step follows goal identification in this source's overall learning-plan development sequence.

## explicit_objective
List access to people, resources and technology together as what this source's identification-of-learning-resources step includes.

## pitfalls
Treating access to material resources alone as sufficient for this step, when this source also credits access to people and to technology as necessary parts of identifying learning resources, supports and strategies.

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
Self-directed learning

## microtopic
Learning needs assessment

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-LEARNING-PLANS

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
0.15

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Identification of learning resources, supports and strategies - includes A) availability and confidence to access People B) availability and confidence to access Resources C) availability and confidence to access Technology D) all of the above" ANSWER: D (yellow fill-rectangle over the correct option, ad hoc PyMuPDF detection, mcq شامل.pdf p.11)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this compiled self-directed-learning MCQ bank; a medical-education or SDL-theory textbook citation (e.g. Grow's staged self-directed learning model, already cited by this module's pp1-cluster2 concepts for a related fact) would strengthen this before publication.

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
CON-POP-32E93BAFB3C72D

## label
Evidence of learning could include a portfolio, case notes, role plays and/or case studies

## canonical_key
evidenceoflearning.forms-portfolio-case-notes-role-plays

## aliases
Forms of evidence of learning

## arabic_label


## arabic_aliases


## definition
Evidence of learning, one of the steps in developing a learning plan, could include a portfolio, case notes, role plays and/or case studies, and this source marks 'identification of forms of evidence of learning' as the step this description matches. This step is distinct from identifying learning goals or learning resources, since it concerns how a learner will demonstrate, after the fact, that learning has actually taken place. Recognising a portfolio, case notes, role plays and case studies as forms of such evidence matters because this source tests each learning-plan development step against similar-sounding distractor steps.

## explicit_objective
State that a portfolio, case notes, role plays and case studies are forms of evidence of learning, matched to the 'identification of forms of evidence of learning' step in this source's learning-plan sequence.

## pitfalls
Confusing the identification-of-evidence-of-learning step with the identification-of-learning-goals or identification-of-learning-resources steps in the same learning-plan development sequence.

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
Self-directed learning

## microtopic
Learning needs assessment

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-LEARNING-PLANS

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
0.15

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Evidence of learning could include a portfolio, case notes, role plays and/or case studies. Refer to A) Identification of learning goals B) Identification of learning resources, supports and strategies C) Identification of forms of evidence of learning D) Specify timeframes and mode of contact" ANSWER: C (yellow fill-rectangle over the correct option, ad hoc PyMuPDF detection, mcq شامل.pdf p.11)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this compiled self-directed-learning MCQ bank; a medical-education or SDL-theory textbook citation (e.g. Grow's staged self-directed learning model, already cited by this module's pp1-cluster2 concepts for a related fact) would strengthen this before publication.

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

