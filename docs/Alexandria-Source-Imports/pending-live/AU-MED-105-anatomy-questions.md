<!--
  AU-MED-105 Anatomy · 7 MCQs whose main_concept is one of the Kasr Year 1
  pending ids held in pending-live/AU-MED-105-anatomy.md (adductor canal
  CON-MSK-59755B64721E3D and sciatic nerve course CON-MSK-D622CBF981F879,
  both from docs/Kasr-Source-Imports/concept/103-BMS-anatomy-concepts.md).
  All 7 are transcribed from the same Lower limb part 1 (Thigh) bank as
  question/AU-MED-105-anatomy-mcq.md, src_f0b73dc856d890ca9c58, items 17,
  21, 23, 25, 27 (adductor canal) and 38, 41 (sciatic nerve course) — keyed
  from a full-resolution render of the bank's own answer table (p11), which
  is cleanly legible and NOT the pdftotext-garbled extraction the triage
  (coverage/AU-MED-105-anatomy-triage.md) flagged as unresolved.

  Two-sided coverage (LANE-BRIEF.md §22): both ids are named in
  related_concepts of docs/Kasr-Source-Imports/article/103-BMS-anatomy.md
  (ART-103-ANA-ADDUCTOR-CANAL, ART-103-ANA-SCIATIC-NERVE) — verified by
  direct grep, not assumed.

  Validate with:
    npm run medical:batch -- docs/Alexandria-Source-Imports/pending-live/AU-MED-105-anatomy-questions.md \
      --with docs/Kasr-Source-Imports/concept/101-ISK-concepts.md \
      --with docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md \
      --with docs/Kasr-Source-Imports/concept/101-ISK-practical-concepts.md \
      --with docs/Kasr-Source-Imports/concept/103-BMS-anatomy-concepts.md \
      --with docs/Kasr-Source-Imports/article/103-BMS-anatomy.md

  Prove the merge with:
    npm run medical:simulate -- docs/Kasr-Source-Imports/concept/101-ISK-concepts.md \
      docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md \
      docs/Kasr-Source-Imports/concept/101-ISK-practical-concepts.md \
      docs/Kasr-Source-Imports/concept/103-BMS-anatomy-concepts.md \
      docs/Kasr-Source-Imports/article/103-BMS-anatomy.md \
      docs/Alexandria-Source-Imports/pending-live/AU-MED-105-anatomy.md \
      docs/Alexandria-Source-Imports/pending-live/AU-MED-105-anatomy-questions.md

  Do not apply this file until pending-live/AU-MED-105-anatomy.md's own 36
  sparse updates are live (its own apply-after condition in INDEX.md).
-->

# Item

## id
QST-MSK-AU105-PEND-ADDCANAL-INTACT

## title
The one structure that survives an adductor-canal infection

## question
Following surgery, an infection was found in the adductor canal, damaging the enclosed structures. Which of the following structures remains intact?

## subject
msk

## status
Draft

## owner
Admin team

## vignette


## correct_answer
D

## answer_a
Femoral artery

## explanation_a
Incorrect. The femoral artery (as the superficial/subsartorial femoral artery) is a content of the adductor canal, so it would be damaged, not spared.

## answer_b
Femoral vein

## explanation_b
Incorrect. The femoral vein is also a content of the adductor canal, so it too would be damaged.

## answer_c
Saphenous nerve

## explanation_c
Incorrect. The saphenous nerve travels through the adductor canal (before piercing the fascia near the knee to become superficial), so it would also be damaged.

## answer_d
Great saphenous vein

## explanation_d
Correct. The great saphenous vein is a superficial vein running in the subcutaneous tissue of the thigh, outside the adductor canal entirely — an infection confined to the canal's four deep contents (femoral artery, femoral vein, saphenous nerve, nerve to vastus medialis) would not reach it. This distinction — deep canal contents versus the superficial saphenous system — is the same logic tested from the opposite direction in the 'sub-sartorial canal EXCEPT' item elsewhere in this bank.

## answer_e


## explanation_e


## answer_f


## explanation_f


## attached_image


## attachments


## format


## written_parts


## matching_options


## matching_prompts


## correct_answers


## labeling_image


## labeling_alt


## labeling_points


## completion_text


## derived_from


## main_concept
CON-MSK-59755B64721E3D

## concept_ids


## contextual_concept_ids


## topic
Lower limb

## subtopic
The Thigh

## difficulty
Moderate

## question_type
Anatomy

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
58

## exam_relevance
6

## clinical_relevance
0.4

## academic_relevance
0.8

## exam_weight_by_year
AU_Y1=0.6

## years
AU_Y1

## universities
au

## module
AU-MED-105

## module_subject
AU-MED-105 > Anatomy > Thigh > Medial compartment of thigh (adductor canal)

## question_only_for


## library_ids
ART-103-ANA-ADDUCTOR-CANAL

## resource_ids
src_f0b73dc856d890ca9c58

## learning_objective
Distinguish the adductor canal's four deep contents (femoral artery and vein, saphenous nerve, nerve to vastus medialis) from the superficial great saphenous vein, which never enters the canal.

## source_citation
Alexandria University, AU-MED-105, "MCQs — Lower limb part 1 (Thigh)" (Dr Ibrahim Amr revision bank, src_f0b73dc856d890ca9c58), item 17 (p6).

## media_recommendations


## estimated_seconds
55

## randomise_answers
yes

## author_notes
Key read directly from the bank's own answer table (p11, item 17 = D), confirmed legible at full render resolution — this is NOT the pdftotext-garbled extraction the triage flagged; a page render recovers a clean, correctly-ordered key. Main concept is a Kasr Year 1 pending id (`CON-MSK-59755B64721E3D`, from `103-BMS-anatomy-concepts.md`), named in `related_concepts` of the live-pending Kasr article `ART-103-ANA-ADDUCTOR-CANAL` (`103-BMS-anatomy.md`) — filed here per LANE-BRIEF §21, not deferred. 

---

# Item

## id
QST-MSK-AU105-PEND-ADDCANAL-SUBSARTORIAL

## title
The one structure not found in the sub-sartorial (adductor) canal

## question
All of these structures are present in sub-sartorial canal except …………

## subject
msk

## status
Draft

## owner
Admin team

## vignette


## correct_answer
B

## answer_a
Femoral artery

## explanation_a
Incorrect (this IS a content, so not the exception). The femoral artery is the adductor canal's principal content.

## answer_b
Femoral nerve

## explanation_b
Correct — this is the exception. The femoral nerve terminates in the femoral triangle above the canal; only two of its branches (the saphenous nerve and the nerve to vastus medialis) continue into the adductor canal, not the nerve trunk itself. The femoral nerve's early termination in the triangle, well before the canal begins, is worth contrasting with the femoral artery and vein, which travel the canal's entire length.

## answer_c
Femoral vein

## explanation_c
Incorrect (this IS a content). The femoral vein runs through the canal alongside the artery.

## answer_d
Deep lymph vessels

## explanation_d
Incorrect (these ARE contents). Deep lymphatic vessels accompanying the femoral vessels also pass through the canal.

## answer_e


## explanation_e


## answer_f


## explanation_f


## attached_image


## attachments


## format


## written_parts


## matching_options


## matching_prompts


## correct_answers


## labeling_image


## labeling_alt


## labeling_points


## completion_text


## derived_from


## main_concept
CON-MSK-59755B64721E3D

## concept_ids


## contextual_concept_ids


## topic
Lower limb

## subtopic
The Thigh

## difficulty
Moderate

## question_type
Anatomy

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
58

## exam_relevance
6

## clinical_relevance
0.4

## academic_relevance
0.8

## exam_weight_by_year
AU_Y1=0.6

## years
AU_Y1

## universities
au

## module
AU-MED-105

## module_subject
AU-MED-105 > Anatomy > Thigh > Medial compartment of thigh (adductor canal)

## question_only_for


## library_ids
ART-103-ANA-ADDUCTOR-CANAL

## resource_ids
src_f0b73dc856d890ca9c58

## learning_objective
Separate the femoral nerve trunk (which ends in the femoral triangle) from its two branches that do continue into the adductor canal.

## source_citation
Alexandria University, AU-MED-105, "MCQs — Lower limb part 1 (Thigh)" (Dr Ibrahim Amr revision bank, src_f0b73dc856d890ca9c58), item 21 (p5).

## media_recommendations


## estimated_seconds
55

## randomise_answers
yes

## author_notes
Key read directly from the bank's own answer table (p11, item 21 = B), confirmed legible at full render resolution — this is NOT the pdftotext-garbled extraction the triage flagged; a page render recovers a clean, correctly-ordered key. Main concept is a Kasr Year 1 pending id (`CON-MSK-59755B64721E3D`, from `103-BMS-anatomy-concepts.md`), named in `related_concepts` of the live-pending Kasr article `ART-103-ANA-ADDUCTOR-CANAL` (`103-BMS-anatomy.md`) — filed here per LANE-BRIEF §21, not deferred. 

---

# Item

## id
QST-MSK-AU105-PEND-ADDCANAL-LATWALL

## title
The lateral wall of the adductor canal

## question
Lateral wall of adductor canal is formed by …………

## subject
msk

## status
Draft

## owner
Admin team

## vignette


## correct_answer
A

## answer_a
Vastus medialis muscle

## explanation_a
Correct. Vastus medialis forms the adductor canal's lateral wall, with sartorius forming the roof and adductor longus then adductor magnus forming the posterior (medial-facing) wall as the canal descends. A simple way to fix the three walls: roof=sartorius (the muscle the canal is named for, 'sub-sartorial'), lateral=vastus medialis, posterior=adductor longus then magnus.

## answer_b
Adductor brevis muscle

## explanation_b
Incorrect. Adductor brevis lies deeper and more proximally in the medial thigh; it is not one of the adductor canal's three named walls.

## answer_c
Sartorius muscle

## explanation_c
Incorrect. Sartorius forms the roof of the adductor canal, not its lateral wall.

## answer_d
Adductor longus muscle

## explanation_d
Incorrect. Adductor longus (with adductor magnus below it) forms the canal's posterior wall, not the lateral one.

## answer_e


## explanation_e


## answer_f


## explanation_f


## attached_image


## attachments


## format


## written_parts


## matching_options


## matching_prompts


## correct_answers


## labeling_image


## labeling_alt


## labeling_points


## completion_text


## derived_from


## main_concept
CON-MSK-59755B64721E3D

## concept_ids


## contextual_concept_ids


## topic
Lower limb

## subtopic
The Thigh

## difficulty
Moderate

## question_type
Anatomy

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
58

## exam_relevance
6

## clinical_relevance
0.4

## academic_relevance
0.8

## exam_weight_by_year
AU_Y1=0.6

## years
AU_Y1

## universities
au

## module
AU-MED-105

## module_subject
AU-MED-105 > Anatomy > Thigh > Medial compartment of thigh (adductor canal)

## question_only_for


## library_ids
ART-103-ANA-ADDUCTOR-CANAL

## resource_ids
src_f0b73dc856d890ca9c58

## learning_objective
Name the adductor canal's three walls correctly: roof (sartorius), lateral wall (vastus medialis), posterior wall (adductor longus then magnus).

## source_citation
Alexandria University, AU-MED-105, "MCQs — Lower limb part 1 (Thigh)" (Dr Ibrahim Amr revision bank, src_f0b73dc856d890ca9c58), item 23 (p5).

## media_recommendations


## estimated_seconds
55

## randomise_answers
yes

## author_notes
Key read directly from the bank's own answer table (p11, item 23 = A), confirmed legible at full render resolution — this is NOT the pdftotext-garbled extraction the triage flagged; a page render recovers a clean, correctly-ordered key. Main concept is a Kasr Year 1 pending id (`CON-MSK-59755B64721E3D`, from `103-BMS-anatomy-concepts.md`), named in `related_concepts` of the live-pending Kasr article `ART-103-ANA-ADDUCTOR-CANAL` (`103-BMS-anatomy.md`) — filed here per LANE-BRIEF §21, not deferred. 

---

# Item

## id
QST-MSK-AU105-PEND-ADDCANAL-FALSE-THIRD

## title
The one false statement about the adductor canal's location and contents

## question
The following are true regarding the adductor canal, EXCEPT:

## subject
msk

## status
Draft

## owner
Admin team

## vignette


## correct_answer
B

## answer_a
Its posterior wall is formed by adductor longus and magnus

## explanation_a
Incorrect (this is true, so not the exception). Adductor longus forms the upper part of the posterior wall and adductor magnus the lower part, as the canal descends toward the adductor hiatus.

## answer_b
It lies in the medial part of the upper third of the thigh

## explanation_b
Correct — this is the false statement. The adductor canal lies in the middle third of the thigh (running from the apex of the femoral triangle down to the adductor hiatus), not the upper third. Placing the canal in the thigh's three thirds matters clinically too, since it is the landmark surgeons use when approaching the femoral vessels or performing a saphenous nerve block.

## answer_c
It contains the femoral vessels and nerve to vastus medialis

## explanation_c
Incorrect (this is true). These are two of the canal's four named contents, alongside the saphenous nerve.

## answer_d
Saphenous nerve is one of its contents

## explanation_d
Incorrect (this is true). The saphenous nerve travels the length of the canal before piercing its roof near the knee.

## answer_e


## explanation_e


## answer_f


## explanation_f


## attached_image


## attachments


## format


## written_parts


## matching_options


## matching_prompts


## correct_answers


## labeling_image


## labeling_alt


## labeling_points


## completion_text


## derived_from


## main_concept
CON-MSK-59755B64721E3D

## concept_ids


## contextual_concept_ids


## topic
Lower limb

## subtopic
The Thigh

## difficulty
Moderate

## question_type
Anatomy

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
58

## exam_relevance
6

## clinical_relevance
0.4

## academic_relevance
0.8

## exam_weight_by_year
AU_Y1=0.6

## years
AU_Y1

## universities
au

## module
AU-MED-105

## module_subject
AU-MED-105 > Anatomy > Thigh > Medial compartment of thigh (adductor canal)

## question_only_for


## library_ids
ART-103-ANA-ADDUCTOR-CANAL

## resource_ids
src_f0b73dc856d890ca9c58

## learning_objective
Correct the canal's location to the middle third of the thigh, the one false claim among otherwise-accurate adductor canal facts.

## source_citation
Alexandria University, AU-MED-105, "MCQs — Lower limb part 1 (Thigh)" (Dr Ibrahim Amr revision bank, src_f0b73dc856d890ca9c58), item 25 (p5).

## media_recommendations


## estimated_seconds
55

## randomise_answers
yes

## author_notes
Key read directly from the bank's own answer table (p11, item 25 = B), confirmed legible at full render resolution — this is NOT the pdftotext-garbled extraction the triage flagged; a page render recovers a clean, correctly-ordered key. Main concept is a Kasr Year 1 pending id (`CON-MSK-59755B64721E3D`, from `103-BMS-anatomy-concepts.md`), named in `related_concepts` of the live-pending Kasr article `ART-103-ANA-ADDUCTOR-CANAL` (`103-BMS-anatomy.md`) — filed here per LANE-BRIEF §21, not deferred. 

---

# Item

## id
QST-MSK-AU105-PEND-ADDCANAL-FALSE-WALL

## title
The one false statement about the adductor canal's walls (second form)

## question
Regarding adductor canal, which statement is false?

## subject
msk

## status
Draft

## owner
Admin team

## vignette


## correct_answer
C

## answer_a
It begins at the apex of the femoral triangle

## explanation_a
Incorrect (this is true, so not the exception). The adductor canal is the direct continuation of the femoral triangle, starting where the triangle's apex narrows.

## answer_b
It transmits the saphenous nerve

## explanation_b
Incorrect (this is true). The saphenous nerve is one of the canal's four contents.

## answer_c
Its posterior wall is formed by the adductor brevis muscle

## explanation_c
Correct — this is the false statement. The posterior wall is formed by adductor longus and adductor magnus, not adductor brevis, which lies more proximally and does not contribute to the canal's walls. Adductor brevis lies proximal to and outside the canal altogether, which is exactly why substituting it for adductor longus/magnus is a plausible-looking but incorrect distractor.

## answer_d
Its lateral wall is formed by the vastus medialis muscle

## explanation_d
Incorrect (this is true). Vastus medialis forms the lateral wall along the canal's length.

## answer_e


## explanation_e


## answer_f


## explanation_f


## attached_image


## attachments


## format


## written_parts


## matching_options


## matching_prompts


## correct_answers


## labeling_image


## labeling_alt


## labeling_points


## completion_text


## derived_from


## main_concept
CON-MSK-59755B64721E3D

## concept_ids


## contextual_concept_ids


## topic
Lower limb

## subtopic
The Thigh

## difficulty
Moderate

## question_type
Anatomy

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
58

## exam_relevance
6

## clinical_relevance
0.4

## academic_relevance
0.8

## exam_weight_by_year
AU_Y1=0.6

## years
AU_Y1

## universities
au

## module
AU-MED-105

## module_subject
AU-MED-105 > Anatomy > Thigh > Medial compartment of thigh (adductor canal)

## question_only_for


## library_ids
ART-103-ANA-ADDUCTOR-CANAL

## resource_ids
src_f0b73dc856d890ca9c58

## learning_objective
Confirm the posterior wall is adductor longus/magnus, correcting the false substitution of adductor brevis in this item.

## source_citation
Alexandria University, AU-MED-105, "MCQs — Lower limb part 1 (Thigh)" (Dr Ibrahim Amr revision bank, src_f0b73dc856d890ca9c58), item 27 (p6).

## media_recommendations


## estimated_seconds
55

## randomise_answers
yes

## author_notes
Key read directly from the bank's own answer table (p11, item 27 = C), confirmed legible at full render resolution — this is NOT the pdftotext-garbled extraction the triage flagged; a page render recovers a clean, correctly-ordered key. Main concept is a Kasr Year 1 pending id (`CON-MSK-59755B64721E3D`, from `103-BMS-anatomy-concepts.md`), named in `related_concepts` of the live-pending Kasr article `ART-103-ANA-ADDUCTOR-CANAL` (`103-BMS-anatomy.md`) — filed here per LANE-BRIEF §21, not deferred. Same underlying wall-naming fact as QST-MSK-AU105-PEND-ADDCANAL-LATWALL and QST-MSK-AU105-PEND-ADDCANAL-FALSE-THIRD, each bank item testing a different wall or a different false substitution.

---

# Item

## id
QST-MSK-AU105-PEND-SCIATIC-EXCEPT

## title
The one false statement about the sciatic nerve's course

## question
Regarding the sciatic nerve, All the following are true EXCEPT:

## subject
msk

## status
Draft

## owner
Admin team

## vignette


## correct_answer
C

## answer_a
It arises from sacral plexus (L4,5 + S1,2,3)

## explanation_a
Incorrect (this is true, so not the exception). The sciatic nerve is the sacral plexus's largest branch, formed from the ventral rami of L4 through S3.

## answer_b
It lies on the obturator internus, superior and inferior gemelli muscle

## explanation_b
Incorrect (this is true). These, with quadratus femoris, form the upper part of the 'bed' the sciatic nerve travels on as it crosses the gluteal region.

## answer_c
It passes through the lesser sciatic foramen to the gluteal region

## explanation_c
Correct — this is the false statement. The sciatic nerve enters the gluteal region through the GREATER sciatic foramen, below piriformis, not the lesser sciatic foramen. Confusing the greater and lesser sciatic foramina is one of the most common errors in gluteal-region anatomy, since both share 'sciatic' in their name despite transmitting almost entirely different structures.

## answer_d
In the back of the thigh, it divides into tibial and common peroneal nerves

## explanation_d
Incorrect (this is true). The sciatic nerve typically divides into its two terminal branches at a variable point in the lower thigh, often near the apex of the popliteal fossa.

## answer_e


## explanation_e


## answer_f


## explanation_f


## attached_image


## attachments


## format


## written_parts


## matching_options


## matching_prompts


## correct_answers


## labeling_image


## labeling_alt


## labeling_points


## completion_text


## derived_from


## main_concept
CON-MSK-D622CBF981F879

## concept_ids


## contextual_concept_ids


## topic
Lower limb

## subtopic
The Gluteal Region

## difficulty
Moderate

## question_type
Anatomy

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
58

## exam_relevance
6

## clinical_relevance
0.4

## academic_relevance
0.8

## exam_weight_by_year
AU_Y1=0.6

## years
AU_Y1

## universities
au

## module
AU-MED-105

## module_subject
AU-MED-105 > Anatomy > Lower Limb > Gluteal region

## question_only_for


## library_ids
ART-103-ANA-SCIATIC-NERVE

## resource_ids
src_f0b73dc856d890ca9c58

## learning_objective
Correct the sciatic nerve's exit route to the greater sciatic foramen (below piriformis), the one false statement among otherwise-accurate facts about its course and division.

## source_citation
Alexandria University, AU-MED-105, "MCQs — Lower limb part 1 (Thigh)" (Dr Ibrahim Amr revision bank, src_f0b73dc856d890ca9c58), item 38 (p6).

## media_recommendations


## estimated_seconds
55

## randomise_answers
yes

## author_notes
Key read directly from the bank's own answer table (p11, item 38 = C), confirmed legible at full render resolution — this is NOT the pdftotext-garbled extraction the triage flagged; a page render recovers a clean, correctly-ordered key. Main concept is a Kasr Year 1 pending id (`CON-MSK-D622CBF981F879`, from `103-BMS-anatomy-concepts.md`), named in `related_concepts` of the live-pending Kasr article `ART-103-ANA-SCIATIC-NERVE` (`103-BMS-anatomy.md`) — filed here per LANE-BRIEF §21, not deferred. 

---

# Item

## id
QST-MSK-AU105-PEND-SCIATICBED-EXCEPT

## title
The one muscle not included in the sciatic nerve's bed

## question
Which of the following structures is NOT included in the sciatic bed:

## subject
msk

## status
Draft

## owner
Admin team

## vignette


## correct_answer
C

## answer_a
Ischial part of adductor magnus

## explanation_a
Incorrect (this IS part of the bed, so not the exception). As the sciatic nerve descends into the back of the thigh, the ischial (hamstring) part of adductor magnus forms the lower part of its bed.

## answer_b
Obturator internus

## explanation_b
Incorrect (this IS part of the bed, together with the gemelli). The nerve crosses obturator internus (with the two gemelli) as it lies on the posterior hip muscles just below its point of emergence.

## answer_c
Piriformis

## explanation_c
Correct — this is the exception. The sciatic nerve leaves the pelvis BELOW piriformis (per its own course), so piriformis is the landmark of its emergence, not a muscle the nerve then lies upon as part of its bed lower down. This item rewards reading the sciatic nerve's course as a sequence — piriformis marks where it appears, the bed muscles are what it then lies on as it continues down — rather than treating every nearby muscle as equivalent.

## answer_d
Quadratus femoris

## explanation_d
Incorrect (this IS part of the bed). Quadratus femoris forms the lowest part of the sciatic nerve's bed in the gluteal region, just before the nerve continues onto adductor magnus in the thigh.

## answer_e


## explanation_e


## answer_f


## explanation_f


## attached_image


## attachments


## format


## written_parts


## matching_options


## matching_prompts


## correct_answers


## labeling_image


## labeling_alt


## labeling_points


## completion_text


## derived_from


## main_concept
CON-MSK-D622CBF981F879

## concept_ids


## contextual_concept_ids


## topic
Lower limb

## subtopic
The Gluteal Region

## difficulty
Moderate

## question_type
Anatomy

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
58

## exam_relevance
6

## clinical_relevance
0.4

## academic_relevance
0.8

## exam_weight_by_year
AU_Y1=0.6

## years
AU_Y1

## universities
au

## module
AU-MED-105

## module_subject
AU-MED-105 > Anatomy > Lower Limb > Gluteal region

## question_only_for


## library_ids
ART-103-ANA-SCIATIC-NERVE

## resource_ids
src_f0b73dc856d890ca9c58

## learning_objective
Distinguish piriformis (the landmark the nerve emerges below) from the muscles that actually form its bed lower down (obturator internus/gemelli, quadratus femoris, ischial part of adductor magnus).

## source_citation
Alexandria University, AU-MED-105, "MCQs — Lower limb part 1 (Thigh)" (Dr Ibrahim Amr revision bank, src_f0b73dc856d890ca9c58), item 41 (p7).

## media_recommendations


## estimated_seconds
55

## randomise_answers
yes

## author_notes
Key read directly from the bank's own answer table (p11, item 41 = C), confirmed legible at full render resolution — this is NOT the pdftotext-garbled extraction the triage flagged; a page render recovers a clean, correctly-ordered key. Main concept is a Kasr Year 1 pending id (`CON-MSK-D622CBF981F879`, from `103-BMS-anatomy-concepts.md`), named in `related_concepts` of the live-pending Kasr article `ART-103-ANA-SCIATIC-NERVE` (`103-BMS-anatomy.md`) — filed here per LANE-BRIEF §21, not deferred. 
