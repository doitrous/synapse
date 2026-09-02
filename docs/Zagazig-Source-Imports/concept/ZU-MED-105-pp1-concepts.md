<!--
  ZU-MED-105 (Professional Practice I) — 34 NEW concepts minted for the first
  40-question SBA cluster, authored from three tier-1 sources: `Zag P.P1 Final
  2024.pdf` (Zagazig main campus, printed key line), `Fakous P.P1 Final
  2024.pdf` (Zagazig's Fakous campus — provenance ruled usable, LANE-CARD.md
  §7) and `امتحانات سابقه.pdf` pages 1-4 (Fakous campus past-exam compilation,
  gray fill-rectangle key). See coverage/ZU-MED-105-triage.md for the full
  key-recovery method on each source. Search-before-mint run against
  `find-existing.mjs` (short single-word queries) plus direct greps of the
  Kasr/Helwan/MUST/FOMSCU/Mansoura pending trees for every core term — 0
  reusable hits found anywhere in the corpus; this module's professionalism/
  ethics/soft-skills content is genuinely new territory (see triage's own
  concept-search-sample section). No dedicated professionalism/ethics subject
  code exists in `src/data/curriculumCatalog.ts` — every concept below uses
  `subject: pop` (Population health), the only system whose catalog carries an
  "Ethics, law and professionalism" topic; `topic`/`subtopic` below are
  free descriptive text, not required to match a literal catalog node (the
  ZU-MED-106 worked example does the same). No evidence-store `src_…`
  resource exists yet for any of these three PDFs (not in
  `corpus-source-index.json`) — per 12-resources.md's weakest-but-honest
  option 3, `resource_ids`/`atomic_claim_ids` are left blank; the citation
  lives in each concept's own `original_wording` and in each question's
  `source_citation`.

  Two concepts are shared by a literal duplicate fact tested on two different
  papers (`checklisttool.assesses-student-satisfaction` — Zag q1 + Fakous
  q(v); `teamdevelopment.storming-stage-is-conflict-and-rebellion` — Zag q4 +
  Fakous q(vii)); four more are shared within the amtihanat-sabqa source
  itself (self-awareness "remedy", "lack→wrong decisions", goal-setting,
  time-management definition each cover 2 near-identical questions on that
  one compiled bank — see coverage/ZU-MED-105-triage-keys.txt for the exact
  question-to-concept map).

  Import: Admin › Concepts › Import.
-->

# Item

## id
CON-POP-34609C72D29B49

## label
A checklist tool is used in student assessment to measure student satisfaction, not attendance or graduation rate

## canonical_key
checklisttool.assesses-student-satisfaction

## aliases
Checklist assessment tool
Student satisfaction checklist

## arabic_label


## arabic_aliases


## definition
A checklist is a structured assessment tool that records whether specific, predefined criteria were met during an observed encounter or activity. In the context of student evaluation, both this module's Zagazig-campus and Fakous-campus Final papers mark the same answer to "what can a checklist tool be used to assess": student satisfaction, rather than annual survey participation, attendance rate, or graduation rate — the checklist's structured, item-by-item format suits capturing a satisfaction rating at the point of an encounter, not longitudinal administrative metrics that need separate record systems.

## explicit_objective
State that a checklist tool is used to assess student satisfaction, not administrative metrics like attendance or graduation rate.

## pitfalls
Confusing a checklist (a real-time, item-by-item assessment tool) with longitudinal administrative records (attendance logs, graduation registries) that happen to also describe students but are tracked by entirely different systems.

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
Assessment and feedback tools

## microtopic
Checklist tools

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-PROFESSIONALISM-CORE

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
0.4

## exam_weight_by_year
ZU_Y1=0.5

## clinical_relevance
0.4

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
Zag: "The checklist tool can be used to asses A) Annual student survey B) Student attendance rate C) Student graduation rate D) Student satisfaction" ANSWER: D (printed key line, Zag P.P1 Final 2024.pdf p.1 Q1). Fakous: "Checklist tool can be used to assess: a. Annual student survey b. Student attendance rate c. Student satisfaction d. Student graduation rate" ANSWER: c (light-blue highlight, Fakous P.P1 Final 2024.pdf p.1 Q(v)) — same fact, options reordered between papers.

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond these two exam papers; a professionalism-curriculum textbook citation would strengthen this before publication.

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
CON-POP-CB4F8F21622C78

## label
A strong physician-patient relationship is built on trust and communication, not financial obligations or personal opinions

## canonical_key
physicianpatientrelationship.built-on-trust-and-communication

## aliases
Foundations of the physician-patient relationship
Trust and communication in patient care

## arabic_label


## arabic_aliases


## definition
The physician-patient relationship's durability and therapeutic value rest on trust and open communication between the two parties, not on transactional elements like billing or on the physician's own unshared personal opinions or social connections. This is the answer this module's Zag Final paper marks against three distractors that each describe something adjacent to, but distinct from, the actual foundation of the relationship.

## explicit_objective
State that trust and communication, not financial obligations, personal opinions or social connections, are what a strong physician-patient relationship is built on.

## pitfalls
Mistaking the transactional aspects of care (billing, administrative contact) for the relationship's foundation, when those are consequences of the relationship existing, not what sustains it.

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
Physician-patient relationship

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-PROFESSIONALISM-CORE

## related_article_ids


## related_concept_ids
CON-POP-9989FDD0F11529

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.4

## exam_weight_by_year
ZU_Y1=0.5

## clinical_relevance
0.4

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
"A strong physician-patient relationship is built on A) Financial obligations B) Trust and communication C) Personal opinions and views D) Social connections" ANSWER: B (printed key line, Zag P.P1 Final 2024.pdf p.1 Q2)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

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
CON-POP-C5AF15AA02250C

## label
In the model of preconditions leading to accountability, the base of the model is ability

## canonical_key
accountabilitymodel.precondition-base-is-ability

## aliases
Preconditions of accountability
Accountability model base

## arabic_label


## arabic_aliases


## definition
A staged model of the preconditions that build toward genuine accountability places ability at its base — a person cannot be meaningfully held accountable for a task they lack the capacity to perform. Authority, professionalism and responsibility are later or adjacent elements of the same model, but this module's Zag Final paper marks ability, specifically, as the foundational precondition.

## explicit_objective
State that ability is the base precondition in the model leading to accountability, not authority, professionalism or responsibility.

## pitfalls
Treating "responsibility" as interchangeable with the base of an accountability model — responsibility (being assigned a task) presupposes the ability to carry it out, so ability is the more fundamental precondition.

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
Accountability

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-PROFESSIONALISM-CORE

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
0.4

## exam_weight_by_year
ZU_Y1=0.5

## clinical_relevance
0.3

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.75

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"In the model of the preconditions leading to accountability, the base of this model is A) Authority B) Professionalism C) Ability D) Responsibility" ANSWER: C (printed key line, Zag P.P1 Final 2024.pdf p.1 Q3)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty
The source paper does not name which specific accountability-model framework this question draws from; the fact stands as printed (LANE-CARD.md §7) but a department-book cross-check would confirm the exact model referenced.

## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

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
CON-POP-80EF60232916AF

## label
Conflict between team members and rebellion against assigned tasks characterises the storming stage of team development

## canonical_key
teamdevelopment.storming-stage-is-conflict-and-rebellion

## aliases
Storming stage of team development
Tuckman storming stage

## arabic_label


## arabic_aliases


## definition
In the standard stages-of-team-development model (forming, storming, norming, performing, adjourning), the storming stage is marked by conflict between team members and pushback against assigned tasks, as members test roles, authority and the group's own working norms — distinct from forming (initial orientation), performing (productive collaboration) or norming (agreed working conventions).

## explicit_objective
Identify storming as the stage of team development characterised by interpersonal conflict and resistance to assigned tasks.

## pitfalls
Confusing storming (conflict while roles are still being contested) with performing (the team is functioning smoothly) — both involve active teamwork, but only storming is defined by friction.

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
Stages of team development

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-TEAM-LEADERSHIP

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
0.4

## exam_weight_by_year
ZU_Y1=0.5

## clinical_relevance
0.3

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
Zag: "Conflict between team members and some rebellion uprising against the assigned tasks occur in A) Performing B) Forming C) Storming D) Norming" ANSWER: C (printed key line, Zag P.P1 Final 2024.pdf p.1 Q4). Fakous: "Conflict between team members and some uprising against the assigned tasks occur in: a. Adjourning b. Forming c. Performing d. Storming" ANSWER: d (light-blue highlight, Fakous P.P1 Final 2024.pdf p.2 Q(vii)) — same fact, different distractor set.

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond these two exam papers.

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
CON-POP-BED479E0FA27CA

## label
Justice, as a bioethical principle, requires fair distribution of healthcare resources

## canonical_key
justiceprinciple.fair-distribution-of-healthcare-resources

## aliases
Justice bioethical principle
Fair distribution of healthcare resources

## arabic_label


## arabic_aliases


## definition
Justice is one of the four core bioethical principles (alongside autonomy, beneficence and non-maleficence) and specifically concerns the fair distribution of scarce healthcare resources, rather than respect for cultural diversity, avoidance of stigma, or human dignity — each a real ethical value, but not the one this question's stem (fair resource distribution) names.

## explicit_objective
Identify justice as the bioethical principle governing fair distribution of healthcare resources, distinguishing it from cultural respect, non-stigmatization and human dignity.

## pitfalls
Treating any ethically-loaded distractor (cultural diversity, dignity, non-stigmatization) as interchangeable with justice — each of the four bioethical principles has a distinct, specific scope, and only justice concerns distribution/allocation questions.

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
Ethical practice

## microtopic
Bioethical principles

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-BIOETHICS-PRINCIPLES

## related_article_ids


## related_concept_ids
CON-POP-10BB8CF5072B5A

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.5

## exam_weight_by_year
ZU_Y1=0.6

## clinical_relevance
0.5

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
"A bioethical principle requires fair distribution of healthcare resources A) Respect for cultural diversity B) Non stigmatization C) Justice D) Human dignity" ANSWER: C (printed key line, Zag P.P1 Final 2024.pdf p.2 Q5)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

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
CON-POP-57938398EC5C2F

## label
Receiving and acting on peer feedback illustrates the self-assessment and constructive-feedback component of professionalism

## canonical_key
professionalism.self-assessment-and-constructive-feedback-component

## aliases
Self-assessment and constructive feedback
Professionalism feedback component

## arabic_label


## arabic_aliases


## definition
When a medical student receives peer feedback on a group project and uses it to identify areas for improvement, this scenario illustrates the self-assessment-and-constructive-feedback component of professionalism, distinct from scientific knowledge, clinical skills, or time management, which are separate professionalism domains this same question offers as distractors.

## explicit_objective
Identify a peer-feedback scenario as illustrating professionalism's self-assessment and constructive-feedback component, not scientific knowledge, clinical skills or time management.

## pitfalls
Assuming any professionalism-adjacent scenario about teamwork automatically points to "clinical skills" — the stem's emphasis on receiving feedback and identifying improvement areas specifically signals self-assessment, not the underlying clinical competence being assessed.

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
Assessment and feedback tools

## microtopic
Self-assessment and feedback

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-PROFESSIONALISM-CORE

## related_article_ids


## related_concept_ids
CON-POP-C1662B63DDA48A

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.4

## exam_weight_by_year
ZU_Y1=0.5

## clinical_relevance
0.3

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.75

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Medical student receives feedback from their peers recent group project, highlighting areas for improvement in on a d-in. This scenario best illustrates which component of professionalism teamwork and communication A) Scientific knowledge B) Clinical skills C) Self-assessment and constructive feedback D) Time management" ANSWER: C (printed key line, Zag P.P1 Final 2024.pdf p.2 Q6; stem carries an OCR-adjacent typo, "on a d-in", reproduced faithfully from the source rather than silently corrected)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

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
CON-POP-74579735DA0CFE

## label
Compassion in medical professionalism is showing empathy and care towards patients

## canonical_key
compassion.is-empathy-and-care-towards-patients

## aliases
Compassion in professionalism
Empathy and care towards patients

## arabic_label


## arabic_aliases


## definition
Compassion, as a professionalism value, is best described as showing empathy and care towards patients — not as maintaining strict professional distance, focusing on administrative duties, or prioritising clinical tasks over the patient's experience, each of which this question offers as a distractor that mistakes professional boundaries or task focus for the absence of compassion.

## explicit_objective
State that compassion in medical professionalism means showing empathy and care towards patients, not maintaining distance or prioritising administrative/clinical tasks alone.

## pitfalls
Equating "professional distance" with good practice in a way that excludes compassion — appropriate boundaries and compassionate care towards patients are not mutually exclusive.

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
Compassion

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-PROFESSIONALISM-CORE

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
0.4

## exam_weight_by_year
ZU_Y1=0.5

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
"Compassion in medical professionalism is best described as A) Maintaining a strict professional distance B) Showing empathy and care towards patients C) Focusing on administrative duties D) Prioritizing clinical task" ANSWER: B (printed key line, Zag P.P1 Final 2024.pdf p.2 Q7)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

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
CON-POP-52B2729E9560DC

## label
Early education on professional standards helps medical students prevent disciplinary actions

## canonical_key
professionalismeducation.early-education-prevents-disciplinary-actions

## aliases
Purpose of early professionalism education
Preventing disciplinary action through professionalism training

## arabic_label


## arabic_aliases


## definition
Early education on professional standards is important for medical students specifically because it helps prevent disciplinary actions later — establishing expectations and norms before lapses occur — rather than to avoid patient contact, encourage cheating behaviour, or delay graduation, three implausible distractors this question pairs with the correct answer.

## explicit_objective
State that early professionalism education is important primarily to prevent disciplinary actions.

## pitfalls
None specific — the three distractors here are not close alternatives, so the main risk is under-reading the stem rather than confusing genuinely similar options.

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
Professionalism education

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-PROFESSIONALISM-CORE

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
0.3

## academic_relevance
0.6

## weight_confidence
0.4

## confidence
0.75

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Early education on professional standards is important for medical students to A) Prevent disciplinary actions B) Avoid patient contact C) Encourage cheating behaviour D) Delay graduation" ANSWER: A (printed key line, Zag P.P1 Final 2024.pdf p.2 Q8)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

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
CON-POP-0933BE06626CF2

## label
Consent is not necessary in emergency cases for lifesaving operations

## canonical_key
informedconsent.emergency-exception-for-lifesaving-operations

## aliases
Emergency exception to informed consent
Lifesaving operations without consent

## arabic_label


## arabic_aliases


## definition
The requirement for informed consent has a recognised emergency exception: when a lifesaving operation is needed and the patient cannot consent (e.g. unconscious, no available surrogate, no time), treatment proceeds without consent under the presumption a reasonable patient would want life-saving care. This does not extend to non-life-threatening operations or cosmetic surgery, which still require consent even under time pressure, and consent is never dispensed with just because "any medical procedure" is being performed.

## explicit_objective
State that the emergency exception to informed consent applies specifically to lifesaving operations, not to any medical procedure, non-life-threatening operations, or cosmetic surgery.

## pitfalls
Over-generalising the emergency exception to "any medical procedure" — the exception is narrowly scoped to situations where withholding treatment would cost life, not convenience or non-urgent care.

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


## modules
ZU-MED-105

## secondary_node_ids


## topic
Ethics, law and professionalism

## subtopic
Ethical practice

## microtopic
Informed consent

## nanotopic


## article_ids
ART-POP-ZU105-BIOETHICS-PRINCIPLES

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
0.5

## exam_weight_by_year
ZU_Y1=0.6

## clinical_relevance
0.6

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
"The consent is not necessary in emergency cases for A) Lifesaving operations B) Any medical procedure C) Non-life-threatening operations D) Cosmetic surgeries" ANSWER: A (printed key line, Zag P.P1 Final 2024.pdf p.3 Q9)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

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
CON-POP-1F313AC6F67599

## label
Compromising is a conflict-resolution strategy that resolves a problem short-term while working toward a long-term solution

## canonical_key
conflictresolution.compromising-is-short-term-fix-toward-long-term-solution

## aliases
Compromising conflict-resolution strategy

## arabic_label


## arabic_aliases


## definition
Among conflict-resolution strategies (competing, compromising, accommodating, avoiding), compromising is the one that resolves a problem in the short term while still working toward a longer-term solution — each party gives up something to reach a workable middle ground now, without necessarily settling the underlying issue permanently. Competing (one side wins outright), accommodating (yielding entirely to the other side) and avoiding (not engaging) each describe a different response pattern.

## explicit_objective
Identify compromising as the conflict-resolution strategy that resolves a problem short-term while working toward a long-term solution.

## pitfalls
Confusing compromising (a partial, mutual concession) with accommodating (fully yielding to the other party) — both involve giving ground, but only compromising is mutual and balanced.

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
Conflict-resolution strategies

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-TEAM-LEADERSHIP

## related_article_ids


## related_concept_ids
CON-POP-0116DF677ECEEF

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.4

## exam_weight_by_year
ZU_Y1=0.5

## clinical_relevance
0.3

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.75

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"A conflict resolution strategy which allows you to resolve a problem in the short-term while working toward a long-term solution A) Competing B) Compromising C) Accommodating D) Avoiding" ANSWER: C (printed key line, Zag P.P1 Final 2024.pdf p.3 Q10 — the page's own printed key line reads "10) C", which numerically indexes option C by position; the module's own answer text at that position is "Accommodating", but the definition tested (short-term fix while working toward a longer-term solution) matches the textbook definition of Compromising, option B, not Accommodating — see uncertainty)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty
The page's printed key line reads "10) C" (third-listed option, "Accommodating"), but the stem's own definition — resolving a problem short-term while working toward a long-term solution — is the standard textbook definition of compromising, not accommodating (which means fully yielding to the other party with no ongoing negotiation). Printed keys stand as printed per LANE-CARD.md §7, but this is flagged for reviewer attention: the concept's `label`/`definition` here document the textbook-correct fact (compromising), and the question batch's own explanation notes the printed-key/textbook mismatch explicitly rather than silently teaching the printed key as fact.

## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper; a conflict-resolution-styles textbook citation would resolve the printed-key/textbook-definition mismatch noted above.

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
CON-POP-BA335133348060

## label
Maintaining professionalism supports the trust the public has in doctors

## canonical_key
professionalism.supports-public-trust-in-doctors

## aliases
Professionalism and public trust
Why professionalism matters for doctors

## arabic_label


## arabic_aliases


## definition
Maintaining professionalism is important for medical students and doctors because it supports the trust the public places in doctors as a group — not to create a competitive environment among colleagues, challenge senior authority, or prioritise personal interests over patient care, each of which professionalism norms actively discourage rather than serve.

## explicit_objective
State that maintaining professionalism is important because it supports public trust in doctors, not competitiveness, challenging authority, or self-interest.

## pitfalls
None specific — the three distractors describe behaviours professionalism explicitly guards against, so they should be readily excluded once the stem is read carefully.

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
Professionalism and public trust

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-PROFESSIONALISM-CORE

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
0.4

## exam_weight_by_year
ZU_Y1=0.5

## clinical_relevance
0.3

## academic_relevance
0.6

## weight_confidence
0.4

## confidence
0.75

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Maintaining professionalism is important for medical students and doctors to A) Create a competitive environment among colleagues B) Challenge the authority of senior healthcare professionals C) Support the trust the public has in doctors D) Prioritize personal interests over patient care" ANSWER: C (printed key line, Zag P.P1 Final 2024.pdf p.3 Q11)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

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
CON-POP-C1662B63DDA48A

## label
Reflective practice is the best method for self-assessment

## canonical_key
selfassessment.best-method-is-reflective-practice

## aliases
Reflective practice for self-assessment

## arabic_label


## arabic_aliases


## definition
Among self-assessment methods, reflective practice — deliberately reviewing one's own performance and reasoning after an event — is marked as the best method, ahead of ignoring mistakes (not a method at all), peer evaluation, or external evaluation, both of which rely on someone else's judgment rather than the learner's own structured self-reflection.

## explicit_objective
State that reflective practice, not peer or external evaluation, is the best method for self-assessment.

## pitfalls
Assuming peer or external evaluation is equivalent to self-assessment — both are valuable feedback sources, but neither is self-assessment by definition, since self-assessment specifically means the learner assessing their own performance.

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
Assessment and feedback tools

## microtopic
Reflective practice

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-PROFESSIONALISM-CORE

## related_article_ids


## related_concept_ids
CON-POP-57938398EC5C2F

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.4

## exam_weight_by_year
ZU_Y1=0.5

## clinical_relevance
0.3

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.75

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"The best method for self-assessment A) Reflective practices B) Ignoring mistakes C) Peer evaluations D) External evaluations" ANSWER: A (printed key line, Zag P.P1 Final 2024.pdf p.3 Q12)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

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
CON-POP-9989FDD0F11529

## label
The physician-patient relationship starts when the patient selects the physician

## canonical_key
physicianpatientrelationship.onset-is-when-patient-selects-physician

## aliases
Onset of the physician-patient relationship

## arabic_label


## arabic_aliases


## definition
The physician-patient relationship is formally considered to begin at the point the patient selects the physician, not when the patient later goes to the physician for care, receives a bill, or is diagnosed — those are later stages or administrative consequences of a relationship that legally and ethically began at the point of selection/acceptance.

## explicit_objective
State that the physician-patient relationship begins when the patient selects the physician, not at a later care-seeking or billing step.

## pitfalls
Confusing the relationship's formal onset (selection) with its first clinical interaction (going for care) — the two are often close in time but are conceptually distinct milestones.

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
Physician-patient relationship

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-PROFESSIONALISM-CORE

## related_article_ids


## related_concept_ids
CON-POP-CB4F8F21622C78

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.4

## exam_weight_by_year
ZU_Y1=0.5

## clinical_relevance
0.4

## academic_relevance
0.6

## weight_confidence
0.4

## confidence
0.75

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"The relationship between the physician and the patient starts when the patient: a. Goes to the physician for care. b. Receives a bill for treatment. c. Diagnosed for the illness. d. Selects the physician." ANSWER: d (light-blue highlight, Fakous P.P1 Final 2024.pdf p.1 Q(i))

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

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
CON-POP-D35A58688EE0E0

## label
Vertical equity is working based on need, since different social groups have different health needs

## canonical_key
verticalequity.definition-is-need-based-differential-care

## aliases
Vertical equity in health services
Need-based health equity

## arabic_label


## arabic_aliases


## definition
Vertical equity is the principle of allocating health resources according to differing need — recognising that different social groups have different health needs and that some require more healthcare than others, and providing care proportionally rather than identically. This is distinct from horizontal equity (equal treatment for people with equal need), equality (identical treatment regardless of need), and integrity (an unrelated professional value).

## explicit_objective
Define vertical equity as need-based differential care, distinguishing it from horizontal equity, equality and integrity.

## pitfalls
Confusing vertical equity (different treatment for different needs) with horizontal equity (same treatment for the same need) — both are equity concepts, but they answer different questions about fairness.

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
Ethical practice

## microtopic
Health equity

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-BIOETHICS-PRINCIPLES

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
0.4

## exam_weight_by_year
ZU_Y1=0.5

## clinical_relevance
0.4

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.75

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Working based on need and the fact that different social groups have different health needs and some of which require more health care than others is called: a. Equality. b. Horizontal equity. c. Vertical equity. d. Integrity." ANSWER: c (light-blue highlight, Fakous P.P1 Final 2024.pdf p.1 Q(ii))

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

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
CON-POP-10BB8CF5072B5A

## label
Justice is the medical ethic governing allocation of limited organ transplants without discrimination

## canonical_key
justiceprinciple.organ-transplant-allocation-without-discrimination

## aliases
Justice in organ transplant allocation

## arabic_label


## arabic_aliases


## definition
Allocating limited organ transplants without discrimination based on race, gender, socioeconomic status, ethnicity, religion or any other social category is an application of the bioethical principle of justice — distinct from autonomy (respecting a patient's own choices), beneficence (acting for the patient's benefit) or non-maleficence (avoiding harm), each a different one of the four core principles.

## explicit_objective
Identify justice as the bioethical principle behind non-discriminatory allocation of limited organ transplants.

## pitfalls
Confusing justice (fair allocation/distribution) with beneficence (acting in a specific patient's best interest) — a fair allocation policy can sometimes conflict with what seems best for one individual patient, which is precisely why they are distinct principles.

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
Ethical practice

## microtopic
Bioethical principles

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-BIOETHICS-PRINCIPLES

## related_article_ids


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
0.5

## exam_weight_by_year
ZU_Y1=0.6

## clinical_relevance
0.5

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
"The medical ethic related to allocating limited organ transplants without discrimination based on race, gender, socioeconomic status, ethnicity, religion, or any other social category, is ....... a. Autonomy b. Beneficence c. Non-maleficence d. Justice" ANSWER: d (light-blue highlight, Fakous P.P1 Final 2024.pdf p.1 Q(iii))

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

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
CON-POP-BCB8B02BF5DBA2

## label
In mental disease, the patient's own physician has the right to give permission on the patient's behalf

## canonical_key
mentalcapacity.consent-proxy-is-the-patients-physician

## aliases
Consent proxy in mental incapacity
Mental disease consent authority

## arabic_label


## arabic_aliases


## definition
When a patient's mental disease impairs their capacity to consent, this source marks the patient's own physician — not friends, neighbours, or an unspecified "legal authority" — as holding the right to give permission on the patient's behalf, reflecting the physician's direct clinical relationship and duty of care to that specific patient.

## explicit_objective
State that a mentally incapacitated patient's own physician, not friends, neighbours, or a generic legal authority, holds the right to consent on their behalf per this source.

## pitfalls
Assuming a generic "legally authority" distractor is always the textbook-correct answer for incapacity consent — jurisdictions and curricula vary on who exactly is the consent proxy (court-appointed guardian, next of kin, treating physician), so this fact should be checked against the department's own teaching (see uncertainty).

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
Ethical practice

## microtopic
Consent and capacity

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-BIOETHICS-PRINCIPLES

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
0.4

## exam_weight_by_year
ZU_Y1=0.5

## clinical_relevance
0.5

## academic_relevance
0.6

## weight_confidence
0.3

## confidence
0.6

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"In mental disease which of the following has the right to give permission on behalf of that patient: a. Friends. b. His physician. c. Legally authority d. Neighbors." ANSWER: b (light-blue highlight, Fakous P.P1 Final 2024.pdf p.1 Q(iv))

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty
"Legally authority" (option c, a court-appointed guardian or similar legal proxy) is the answer many medical-ethics curricula would expect for incapacitated-patient consent, not the treating physician; this source's printed/highlighted key names the physician instead. The mark stands as printed per LANE-CARD.md §7 (a single, unambiguous highlight, no conflicting second mark), but this is flagged for reviewer attention as a fact worth a department-book cross-check before publication.

## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper; the uncertainty above should be resolved against Zagazig's own medical-ethics teaching material.

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
CON-POP-0116DF677ECEEF

## label
Negotiation is understanding all parties' interests and working toward a solution that satisfies everyone

## canonical_key
leadership.negotiation-is-understanding-interests-and-reaching-solution

## aliases
Negotiation leadership skill

## arabic_label


## arabic_aliases


## definition
Among leadership skills, understanding the interests of all involved parties and working to reach a solution that satisfies each one is specifically negotiation — distinct from conflict-resolution in general, communication (the means, not the goal-oriented process), and reliability (an unrelated trait).

## explicit_objective
Identify negotiation as the leadership skill of understanding all parties' interests and working toward a mutually satisfying solution.

## pitfalls
Confusing negotiation with conflict-resolution broadly, or with plain communication — negotiation specifically names the goal-directed process of reaching a solution that satisfies multiple parties' interests, not just the exchange of information.

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
Negotiation

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-TEAM-LEADERSHIP

## related_article_ids


## related_concept_ids
CON-POP-1F313AC6F67599

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.4

## exam_weight_by_year
ZU_Y1=0.5

## clinical_relevance
0.3

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.75

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Regarding leadership skills, understanding the interests of all involved parties and working to reach a solution that satisfies each one is referred to: a. Conflict-resolution b. Communication c. Negotiation d. Reliability" ANSWER: c (light-blue highlight, Fakous P.P1 Final 2024.pdf p.2 Q(vi))

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper.

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
CON-POP-78B3B7230B06FB

## label
The remedy for a pattern of wrong decisions from not understanding one's own motivations is to increase self-awareness

## canonical_key
selfawareness.remedy-for-a-pattern-of-wrong-decisions

## aliases
Increasing self-awareness to fix decision-making
Self-awareness remedy for wrong decisions

## arabic_label


## arabic_aliases


## definition
A person who usually makes wrong decisions and cannot understand their own motivations, preferences or personality needs to increase their level of self-awareness — not simply study more hours, withdraw from friends, or ignore the problem, none of which address the underlying gap in self-understanding driving the poor decisions.

## explicit_objective
State that increasing self-awareness, not studying more or withdrawing socially, is the remedy for a pattern of wrong decisions rooted in not understanding one's own motivations.

## pitfalls
Treating "study more" as a generic fix for any academic-sounding problem — this stem's problem is specifically about self-understanding, not knowledge gaps, so the remedy must match the actual deficit named.

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
Self-awareness

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-SELF-AWARENESS-EQ

## related_article_ids


## related_concept_ids
CON-POP-E6469CF6638E93

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.4

## exam_weight_by_year
ZU_Y1=0.5

## clinical_relevance
0.3

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
"Mona is a medical student, she usually makes wrong decisions, does not have the ability to understand her motivations preferences, or personality. What does the need to do? A. To spend more hours in studying her lessons B. To increase her level of self-awareness C. To stop having fun with her friends D. To ignore this problem" ANSWER: B (gray fill-rectangle, امتحانات سابقه.pdf p.1 Q1, render-confirmed). Repeated with a gender-swapped stem ("Mohamed") as Q27 on p.4, ANSWER: C (options reordered) — same fact, same paper.

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam bank.

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
CON-POP-54C99E23E2EEE9

## label
A good level of self-awareness leads to setting appropriate life and career goals

## canonical_key
selfawareness.good-level-leads-to-appropriate-goals

## aliases
Benefits of good self-awareness

## arabic_label


## arabic_aliases


## definition
A good level of self-awareness leads to setting appropriate life and career goals — not to failure in relationships, refusing diversity, or making wrong decisions, each of which this question pairs as the opposite (or an unrelated negative) outcome to contrast with the correct, positive consequence of self-awareness.

## explicit_objective
State that a good level of self-awareness leads to setting appropriate life and career goals.

## pitfalls
None specific — the three distractors are each a negative or unrelated outcome, making this primarily a "spot the positive consequence" item once the stem's polarity ("good level ... leads to") is read carefully.

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
Self-awareness

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-SELF-AWARENESS-EQ

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
0.2

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.75

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Good level of self-awareness leads to: A. Failure in relationships with others B. Refusing diversity C. Making wrong decisions D. Setting appropriate life and career goals" ANSWER: D (gray fill-rectangle, امتحانات سابقه.pdf p.1 Q2, render-confirmed)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam bank.

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
CON-POP-04C8461A94B246

## label
Self-awareness is affected by behavior and perception

## canonical_key
selfawareness.affected-by-behavior-and-perception

## aliases
Sources of self-awareness

## arabic_label


## arabic_aliases


## definition
Self-awareness is gained from different sources and is affected by one's own behaviour and perception — not the claim that negative situations never help build it, that all people share the same level of it, or that it cannot be improved, each a false absolute this question offers as a distractor against the correct, more nuanced statement.

## explicit_objective
State that self-awareness is affected by behaviour and perception, rejecting the false-absolute distractors about negative situations, uniform levels, and unchangeability.

## pitfalls
The source itself prints this option's letter as "E" in an A/B/E/C ordering (a labeling slip, not a fifth real option) — read the fact by its content, not by assuming the printed letter maps to a standard A-D position.

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
Self-awareness

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-SELF-AWARENESS-EQ

## related_article_ids


## related_concept_ids
CON-POP-2605D6A5A4AAD8

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
0.2

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.7

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"We can gain self-awareness from different sources, which of the following statements describes these sources correctly? A. Negative situations don't help us to gain self-awareness B. All people have the same level of self-awareness E. Self-awareness is affected by behavior and perception C. You cannot improve your level of self-awareness" ANSWER: E, i.e. the option reading "Self-awareness is affected by behavior and perception" (gray fill-rectangle, امتحانات سابقه.pdf p.1 Q3, render-confirmed) — the source itself prints this option's letter as "E" in an A/B/E/C sequence, a labeling slip carried faithfully rather than silently relettered.

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty
The source labels the correct option "E" instead of the expected "C" in its own A/B/_/C sequence — a printing/labeling defect in the original exam, not a key ambiguity (only one option is marked, by gray fill, and it is unambiguous which text it covers).

## evidence_gaps
No department-book or corpus-indexed source beyond this exam bank.

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
CON-POP-4F509DABFFC4B1

## label
Emotional intelligence is the ability to understand and manage your own emotions and those of people around you

## canonical_key
emotionalintelligence.definition-is-understanding-and-managing-emotions

## aliases
Emotional intelligence definition
EQ definition

## arabic_label


## arabic_aliases


## definition
Emotional intelligence is defined as the ability to understand and manage one's own emotions, and those of the people around oneself — distinct from time management (organising tasks/time), self-awareness (understanding one's own motivations/personality specifically, a component of but not identical to EQ), and leadership (mobilising/influencing others), each offered as a distractor for a definition that specifically names emotion understanding and management, in oneself and others.

## explicit_objective
State the definition of emotional intelligence as understanding and managing one's own and others' emotions, distinguishing it from time management, self-awareness, and leadership.

## pitfalls
Treating self-awareness and emotional intelligence as fully interchangeable — self-awareness (understanding one's own motivations/personality) is one component of emotional intelligence, but EQ additionally requires managing emotions and reading/responding to others' emotions.

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
Emotional intelligence

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-SELF-AWARENESS-EQ

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
0.4

## exam_weight_by_year
ZU_Y1=0.5

## clinical_relevance
0.3

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
""Ability to understand and manage you own emotions, and those of the People around you" this is the definition of: A. Time management B. Self-awareness C. Emotional intelligence D. Leadership" ANSWER: C (gray fill-rectangle, امتحانات سابقه.pdf p.1 Q4, render-confirmed)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam bank.

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
CON-POP-6C0835DD447EE8

## label
Goal setting is identifying life and work priorities and developing strategies to attain them

## canonical_key
goalsetting.definition-is-identifying-priorities-and-strategies

## aliases
Goal setting definition

## arabic_label


## arabic_aliases


## definition
Goal setting is defined as a means to identify one's priorities in life and work, and to develop strategies to attain those personal and professional objectives — distinct from leadership (mobilising/influencing others), emotional intelligence (understanding/managing emotions), and management (broader resource/task coordination), each offered as a distractor for this specific definition about priority-identification and strategy.

## explicit_objective
State the definition of goal setting as identifying priorities and developing strategies to attain personal and professional objectives.

## pitfalls
Confusing goal setting with management broadly — goal setting is specifically about identifying priorities and objectives, a narrower, earlier step than the broader coordination management implies.

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
Goal setting

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-SELF-AWARENESS-EQ

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
0.4

## exam_weight_by_year
ZU_Y1=0.5

## clinical_relevance
0.2

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
""A mean to identify out priorities (life, work) and develop strategies to attain personal and professional objectives", this is the definition of: A. Leadership B. Goal setting C. Emotional intelligence D. Management" ANSWER: B (gray fill-rectangle, امتحانات سابقه.pdf p.1 Q5, render-confirmed). Repeated verbatim as Q22 on p.3 with a reordered option list, ANSWER: C (same text, "Goal setting") — same fact, same paper.

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam bank.

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
CON-POP-CB0D0B3F25B6A3

## label
Time management means spending the time available to you much more effectively/productively

## canonical_key
timemanagement.definition-is-using-available-time-effectively

## aliases
Time management definition

## arabic_label


## arabic_aliases


## definition
Time management means spending the time available to you much more effectively (or, in a second copy of this question in the same bank, "productively") — not stopping all leisure to work constantly, doing everything yourself without delegating, or simply working faster on tasks, each a common misconception about what time management actually means.

## explicit_objective
State that time management means using available time more effectively, not eliminating leisure, refusing to delegate, or simply rushing tasks.

## pitfalls
Equating time management with working harder/longer or refusing delegation — the correct definition is about effective use of available time, which can include delegating and preserving rest, not maximising hours worked.

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
Time and stress management

## microtopic
Time management

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-TIME-STRESS-MANAGEMENT

## related_article_ids


## related_concept_ids
CON-POP-D28ED0B42AA58D

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
0.2

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
"Time management, means to: A. Stop have fun and work all of the day B. Spend the time available to you much more effectively C. Do everything for yourselves and never delegate D. Do your tasks quickly" ANSWER: B (gray fill-rectangle, امتحانات سابقه.pdf p.2 Q11, render-confirmed). Repeated on p.3 Q17 with "effectively" changed to "productively" and options reordered, ANSWER: C (same underlying fact) — same paper.

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam bank.

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
CON-POP-D28ED0B42AA58D

## label
Effective time management requires deciding what is really important and what can wait

## canonical_key
timemanagement.prioritization-decide-what-is-important-vs-what-can-wait

## aliases
Time management prioritization principle

## arabic_label


## arabic_aliases


## definition
Effective time management requires deciding what is really important and what can wait — not doing everything oneself without delegating, treating time management as an unchangeable inborn trait, or spending most time on low-value activities, each a false statement this question pairs against the correct prioritization principle.

## explicit_objective
State that effective time management means deciding what is important versus what can wait, rejecting the false claims that it requires no delegation, is inborn/fixed, or favours low-value activities.

## pitfalls
Treating time management as a fixed personal trait rather than a learnable prioritization skill — the correct answer explicitly frames it as a deliberate decision process, not an inborn characteristic.

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
Time and stress management

## microtopic
Time management

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-TIME-STRESS-MANAGEMENT

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
0.3

## exam_weight_by_year
ZU_Y1=0.4

## clinical_relevance
0.2

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
"Regarding time management, which of the followings is correct? A. You need to decide what is really important and what can wait to effectively manage your time B. Effective persons do everything for themselves and never delegate C. Time management is an inborn skill that can't be acquired or improved D. It is preferred to spend most of your time in the low value activities" ANSWER: A (gray fill-rectangle, امتحانات سابقه.pdf p.2 Q12, render-confirmed)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam bank.

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
CON-POP-24340652786086

## label
Stress is the gap between our expectations and reality, and is a normal part of life

## canonical_key
stress.definition-is-gap-between-expectations-and-reality

## aliases
Definition of stress

## arabic_label


## arabic_aliases


## definition
Stress is defined as the gap between our expectations and reality, and is described as a normal part of life — not a uniform response every person experiences identically, something unaffected by time management, or something with only one source, each a false absolute this question offers as a distractor.

## explicit_objective
State that stress is the gap between expectations and reality and a normal part of life, rejecting the false claims of uniform response, independence from time management, and single-source origin.

## pitfalls
None specific — the three distractors are each an over-generalised absolute claim, so the main task is recognising the nuanced, correctly-hedged option among them.

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
Time and stress management

## microtopic
Stress

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-TIME-STRESS-MANAGEMENT

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
0.3

## academic_relevance
0.6

## weight_confidence
0.4

## confidence
0.75

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which is correct about stress? A. All people will respond exactly the same way to stress B. Stress is the gap between our expectations and reality, it is a normal part of life C. Stress is not affected by time management D. There is only one source of stress" ANSWER: B (gray fill-rectangle, امتحانات سابقه.pdf p.2 Q13, render-confirmed)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam bank.

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
CON-POP-E6469CF6638E93

## label
Lack of self-awareness can result in wrong decisions that lead to negative consequences

## canonical_key
selfawareness.low-level-leads-to-wrong-decisions

## aliases
Consequences of lacking self-awareness

## arabic_label


## arabic_aliases


## definition
Lack of self-awareness can result in wrong decisions that lead to negative consequences — not success in life, good relationships, or knowing what one is good at, each the opposite (or an unrelated positive) outcome this question offers as a distractor against the correct negative consequence.

## explicit_objective
State that a lack of self-awareness can result in wrong decisions leading to negative consequences.

## pitfalls
None specific — the distractors are each a positive outcome, contrasting cleanly with the negative-consequence framing of the stem ("lack of self-awareness ... result in").

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
Self-awareness

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-SELF-AWARENESS-EQ

## related_article_ids


## related_concept_ids
CON-POP-78B3B7230B06FB

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
0.2

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
"Lack of self-awareness can result in: A. Wrong decisions that lead to negative consequences B. Success in life C. Good relationships D. Knowing what you are good at" ANSWER: A (gray fill-rectangle, امتحانات سابقه.pdf p.2 Q15, render-confirmed). Repeated verbatim as Q28 on p.4, ANSWER: A (identical stem/options) — same paper.

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam bank.

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
CON-POP-BE022D3804274C

## label
A to-do list is a tool that helps decide what is really important to get done today and what can wait

## canonical_key
todolist.tool-decides-what-is-important-to-do-today

## aliases
To-do list as a prioritization tool

## arabic_label


## arabic_aliases


## definition
A to-do list is the tool named for helping decide what is really important to get done today and what can wait — distinct from a goal (a broader life/career target, not a daily task-prioritization tool), delegation (assigning tasks to others, not prioritizing one's own), or a "Patriot rule" (a distractor with no standard meaning in this context).

## explicit_objective
Identify a to-do list as the tool for daily prioritization of what is important versus what can wait.

## pitfalls
Confusing a to-do list (a daily task-prioritization tool) with a goal (a longer-term target) — both relate to planning, but operate at different time horizons.

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
Time and stress management

## microtopic
Time management tools

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-TIME-STRESS-MANAGEMENT

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
0.2

## academic_relevance
0.6

## weight_confidence
0.4

## confidence
0.75

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"A tool that helps you decide what is really important to get done today, and what can wait: A. Goal B. To do list C. Delegation D. Patriot rule" ANSWER: B (gray fill-rectangle, امتحانات سابقه.pdf p.2 Q16, render-confirmed)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam bank.

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
CON-POP-81EC3F32942A5A

## label
In democratic leadership style, the leader encourages others to volunteer for responsibilities and confirms commitments

## canonical_key
leadershipstyle.democratic-encourages-volunteering-and-commitment

## aliases
Democratic leadership style

## arabic_label


## arabic_aliases


## definition
In democratic leadership style, the leader encourages others to volunteer for responsibilities and confirms their commitments — not withholding a vote on important decisions, hoarding all jobs and responsibilities, or relying on silence/non-verbal cues instead of open discussion, each of which better describes an autocratic or laissez-faire style than democratic leadership.

## explicit_objective
Describe democratic leadership style as encouraging others to volunteer for responsibilities and confirming commitments, distinguishing it from autocratic behaviours.

## pitfalls
Confusing democratic leadership (participatory, seeks buy-in) with laissez-faire leadership (hands-off, minimal direction) — both involve giving others latitude, but democratic leadership still actively confirms commitments and seeks votes/input.

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
Leadership styles

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-TEAM-LEADERSHIP

## related_article_ids


## related_concept_ids
CON-POP-061AD45B48F65F

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
0.2

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.75

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"In democratic leadership style, the leader: A. Does not ask for a vote to get an important decision B. Encourages others to volunteer for responsibilities and confirms commitments C. Hogs all of the jobs and responsibilities D. Uses silence and non-verbal expression rather than conversation and speaking" ANSWER: B (gray fill-rectangle, امتحانات سابقه.pdf p.3 Q19, render-confirmed)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam bank.

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
CON-POP-061AD45B48F65F

## label
Leadership is the ability of a person to mobilize and/or influence a group of individuals to achieve results

## canonical_key
leadership.definition-is-mobilizing-and-influencing-a-group

## aliases
Definition of leadership

## arabic_label


## arabic_aliases


## definition
Leadership is defined as the ability of a person to mobilize and/or influence a group of individuals to achieve results — distinct from management (coordinating resources/processes), membership (belonging to a group without necessarily directing it), or administration (organisational/operational oversight), each offered as a distractor for this specific mobilize-and-influence definition.

## explicit_objective
State the definition of leadership as the ability to mobilize and/or influence a group to achieve results, distinguishing it from management, membership and administration.

## pitfalls
Treating leadership and management as synonyms — leadership is specifically about mobilizing/influencing people toward results, while management more broadly concerns coordinating resources and processes, and a person can hold one role without the other.

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
Leadership

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-TEAM-LEADERSHIP

## related_article_ids


## related_concept_ids
CON-POP-81EC3F32942A5A

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.4

## exam_weight_by_year
ZU_Y1=0.5

## clinical_relevance
0.2

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
"The ability of a person to mobilize and/or influence group of Individuals to achievers the results, this refers to: A. Management B. Membership C. Administration D. Leadership" ANSWER: D (gray fill-rectangle, امتحانات سابقه.pdf p.3 Q20, render-confirmed)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam bank.

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
CON-POP-F442216AEE9CF5

## label
The core team is formed of members directly involved in caring for patients

## canonical_key
coreteam.definition-is-members-directly-caring-for-patients

## aliases
Core team definition

## arabic_label


## arabic_aliases


## definition
The "core team", in a clinical team structure, is the group formed of members directly involved in caring for patients — distinct from day-to-day operational management (a separate administrative function), an ad-hoc/event-specific group, or support staff such as cleaners/domestic staff, each a different tier of the wider care organisation.

## explicit_objective
Define the core team as the members directly involved in patient care, distinguishing it from operational-management, event-specific, and support-staff groupings.

## pitfalls
Confusing "core team" with the operational-management group — the core team is defined by direct clinical involvement with the patient, not by administrative or managerial function.

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
Team structure

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-TEAM-LEADERSHIP

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
0.4

## academic_relevance
0.6

## weight_confidence
0.4

## confidence
0.7

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Core team is …………………. A. The group responsible for day to day operational management B. Formed for emerged or specific events C. Formed of members who are directly involved in caring for patients D. Formed of individuals such as cleaners or domestic staff" ANSWER: C (gray fill-rectangle, امتحانات سابقه.pdf p.3 Q21, render-confirmed)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam bank.

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
CON-POP-030DEA3D6246D2

## label
On contact with patients, students must seek staff permission, disclose student status, and obtain consent to take a history

## canonical_key
studentpatientcontact.conduct-requires-permission-disclosure-and-consent

## aliases
Student-patient contact conduct

## arabic_label


## arabic_aliases


## definition
On contact with patients, students are expected to do all of: seek permission from the responsible medical staff, explain that they are students, and obtain consent before taking a history — this question's own correct answer is "all of the above" rather than any single one of these individually, since proper student-patient conduct requires every element together.

## explicit_objective
State that proper student-patient contact requires seeking staff permission, disclosing student status, and obtaining consent — all three together, not any single element alone.

## pitfalls
Selecting only one plausible-sounding individual option (e.g. "obtain consent") when the stem's own best answer is "all of the above" — each listed behaviour is independently correct and jointly required.

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
Student-patient conduct

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-BIOETHICS-PRINCIPLES

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
0.5

## exam_weight_by_year
ZU_Y1=0.6

## clinical_relevance
0.6

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
"On contact with patients, students should: A. Seek permission from the responsible medical staff B. Explain that they are students C. Obtain consent to take a history D. All of the above" ANSWER: D (gray fill-rectangle, امتحانات سابقه.pdf p.3 Q23, render-confirmed)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam bank.

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
CON-POP-DAB775A3A5B37C

## label
Presenting the physician's own knowledge and skills is not a justified condition for breaching patient confidentiality

## canonical_key
confidentiality.breach-not-justified-by-showcasing-physician-skill

## aliases
Unjustified confidentiality breach — showcasing physician skill

## arabic_label


## arabic_aliases


## definition
Justified breaches of confidentiality include patient consent, the public good in cases of infectious disease (e.g. HIV), and testimony in courts of law as forensic experts — but presenting the physician's own knowledge and skills is not one of them; disclosing patient information to showcase a physician's expertise serves the physician's own interest, not any of the recognised public-good or legal justifications for breaching confidentiality.

## explicit_objective
Identify "presenting the physician's own knowledge and skills" as the option that is NOT a justified condition for breaching confidentiality, distinguishing it from patient consent, public-good infectious-disease reporting, and forensic court testimony.

## pitfalls
Assuming any professional-sounding justification (like demonstrating competence) counts as a legitimate reason to breach confidentiality — only patient consent, public-good/legal exceptions justify disclosure, not the physician's own professional interest.

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
Ethical practice

## microtopic
Confidentiality

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-BIOETHICS-PRINCIPLES

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
0.5

## exam_weight_by_year
ZU_Y1=0.6

## clinical_relevance
0.5

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
"Conditions of justified breaches of confidentiality are all the followings EXCEPT: A. With the patient consent B. For the public good in cases of infectious diseases like HIV C. For present the physician's knowledge and skills D. In courts of law as forensic experts" ANSWER: C (gray fill-rectangle, امتحانات سابقه.pdf p.4 Q25, render-confirmed)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam bank.

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
CON-POP-B8E59B7F92842B

## label
One of the most important physician duties towards colleagues is to educate them and transfer recent skills and knowledge

## canonical_key
physicianduty.to-colleagues-is-educate-and-transfer-skills

## aliases
Physician duty to colleagues

## arabic_label


## arabic_aliases


## definition
One of the most important physician duties towards colleagues is to educate them and transfer recent skills and knowledge to them — distinct from improving standards of health through public health education (a duty towards the community, not colleagues specifically), maintaining health resources, or reporting infectious disease (a public-health/legal duty), each a real duty but not one aimed at colleagues.

## explicit_objective
State that a physician's key duty to colleagues is to educate them and transfer skills/knowledge, distinguishing it from duties owed to the community or the health system broadly.

## pitfalls
Confusing duties owed to colleagues (peer education, knowledge transfer) with duties owed to the wider community (public health education, resource stewardship, disease reporting) — the stem specifically asks about the colleague relationship.

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
Duties to colleagues

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-PROFESSIONALISM-CORE

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
0.3

## academic_relevance
0.6

## weight_confidence
0.4

## confidence
0.75

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"One of the most important physician duties towards his colleagues is to: A. Improve the standard of health through health education B. Educate his colleagues and transfer recent skills and knowledge to them C. Maintenance of health resources D. Report any infectious diseases that may harm the community" ANSWER: B (gray fill-rectangle, امتحانات سابقه.pdf p.4 Q26, render-confirmed)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam bank.

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
CON-POP-2605D6A5A4AAD8

## label
Self-analysis is an important source of self-awareness

## canonical_key
selfawareness.source-is-self-analysis

## aliases
Self-analysis as a source of self-awareness

## arabic_label


## arabic_aliases


## definition
Self-analysis is an important source of self-awareness — not the false claim that negative situations don't help build it, that self-awareness is unaffected by behaviour or perception, or that one's level of it cannot be changed, each a false absolute this question offers as a distractor against the correct, affirmative statement about self-analysis as a real source.

## explicit_objective
State that self-analysis is an important source of self-awareness, rejecting the false-absolute distractors about negative situations, behaviour/perception, and unchangeability.

## pitfalls
Confusing this item's specific correct answer (self-analysis as a source) with the related but distinct fact that self-awareness is "affected by behavior and perception" (a different question, same bank, same broader topic) — both are true, but they are two separate tested facts, not one.

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
Self-awareness

## nanotopic


## modules
ZU-MED-105

## article_ids
ART-POP-ZU105-SELF-AWARENESS-EQ

## related_article_ids


## related_concept_ids
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
0.2

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.75

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"We can gain self-awareness from different sources, which of the following statements describes sources correctly? A. Negative situations don't help us to gain self-awareness B. Self-analysis is an important source of self- awareness C. Self-awareness is not affected by behavior or perception D. The level of self-awareness cannot be changed" ANSWER: B (gray fill-rectangle, امتحانات سابقه.pdf p.4 Q29, render-confirmed)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam bank.

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
