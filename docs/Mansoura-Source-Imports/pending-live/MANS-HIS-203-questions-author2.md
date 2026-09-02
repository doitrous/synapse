<!--
  MANS-HIS-203-author2 — Parasitology cluster (extended triage, condition 3).
  15 questions across 3 clusters, authored from the His Continuous Berlin
  Book 2026 (Parasitology-HIS section, p.63-76, src_c4ee1e63536c22ca52d4):
  malaria (7, matching existing live CON-INF- concepts — no --with needed
  for those, they are already live), leishmania (4) and filariasis (4)
  (both against newly minted concepts in this lane's own
  concept/MANS-HIS-203-concepts.md, paired articles in
  article/MANS-HIS-203-articles.md). All keys printed (plain letter beside
  the option), no OCR.

  Gate:

  npm run medical:batch -- "docs/Mansoura-Source-Imports/pending-live/MANS-HIS-203-questions-author2.md" \
    --with docs/Mansoura-Source-Imports/resource/MANS-HIS-203-resources.md \
    --with docs/Mansoura-Source-Imports/concept/MANS-HIS-203-concepts.md \
    --with docs/Mansoura-Source-Imports/article/MANS-HIS-203-articles.md

  Import: Admin › Bulk import → question.
-->

# Item

## id
QST-MANSHIS203-MALARIA-LIVE-MALARIA-PAROXYSM

## title
Cause of the typical malaria paroxysm

## question
The typical malaria paroxysm (the cold, hot and sweating stages) occurs due to:

## subject
pharm

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Invasion of the liver by sporozoites

## explanation_a
Incorrect. Sporozoites invading the liver starts the pre-erythrocytic (exo-erythrocytic) cycle, which is clinically silent; it is not what triggers the paroxysm itself.

## answer_b
Invasion of RBCs by merozoites

## explanation_b
Incorrect. Merozoites invading fresh RBCs begins a new erythrocytic cycle, but the paroxysm is triggered at the end of that cycle, not its start.

## answer_c
Rupture of the erythrocytic schizont

## explanation_c
Correct. The paroxysm's cold, hot and sweating stages are triggered by the synchronous rupture of erythrocytic schizonts, which releases merozoites, malarial pigment and cellular debris into the bloodstream. This debris acts on the body's temperature-regulating centre, producing the classic cycle of chills, high fever and then drenching sweats, timed to the parasite's own erythrocytic cycle length.

## answer_d
Gametocyte formation

## explanation_d
Incorrect. Gametocyte formation produces the sexual stage that is infective to the mosquito; it does not itself provoke the paroxysm.

## answer_e
Hypnozoite activation

## explanation_e
Incorrect. Hypnozoite activation (in P. vivax and P. ovale) causes a relapse, restarting the erythrocytic cycle after a dormant period, but the paroxysm itself is still driven by schizont rupture, not by the hypnozoite's reactivation as such.

## topic
Parasitology

## subtopic
Malaria

## main_concept
CON-INF-5C4F5C2F22E10C

## concept_ids
CON-INF-5C4F5C2F22E10C

## contextual_concept_ids
CON-INF-EF397F3C9D03B0

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
MANS_Y1=high

## years
MANS_Y1

## universities
mans

## module
MANS-HIS-203

## module_subject
MANS-HIS-203 > Parasitology > Malaria

## question_only_for

## library_ids
ART-INF-TOP-28EB55C385

## resource_ids
src_c4ee1e63536c22ca52d4

## learning_objective
Identify rupture of the erythrocytic schizont as the trigger for the malaria paroxysm, as distinct from the other stages of the parasite's life cycle.

## source_citation
His Continuous Berlin Book 2026, Parasitology-HIS, p.63

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer letter beside option, p.63 (L1 PARA questions, FORMATIVE + LECTURE MCQ, Q4); repeated with the same key across the L1 lecture set (Q6) and two later past-exam blocks (دفعة 61 Q3, دفعة 57 Q3)

---

# Item

## id
QST-MANSHIS203-MALARIA-LIVE-MALARIA-RELAPSE-SPECIES

## title
Species most associated with relapse via hypnozoites

## question
Which Plasmodium species is most associated with relapses due to hypnozoite formation in the liver?

## subject
pharm

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Plasmodium falciparum

## explanation_a
Incorrect. P. falciparum forms no hypnozoites and does not relapse; its persistence between treated attacks (when it occurs) is recrudescence from residual blood-stage parasites, not liver-stage reactivation.

## answer_b
Plasmodium malariae

## explanation_b
Incorrect. P. malariae also forms no hypnozoites; its own low-grade persistence is recrudescence, which can occur even years later, but again from the blood stage, not a dormant liver form.

## answer_c
Plasmodium vivax

## explanation_c
Correct. P. vivax (along with P. ovale) uniquely forms hypnozoites, a dormant liver stage that can reactivate months to years after the primary infection to cause a true relapse — a distinct clinical and mechanistic entity from recrudescence, and the basis for giving primaquine as causal (radical cure) prophylaxis against these two species specifically.

## answer_d
Plasmodium knowlesi

## explanation_d
Incorrect. P. knowlesi, a zoonotic species acquired from macaques, does not form hypnozoites either; it is notable instead for its very short (24-hour) erythrocytic cycle and potential for rapid parasitaemia rise.

## topic
Parasitology

## subtopic
Malaria

## main_concept
CON-INF-D22710A2184C60

## concept_ids
CON-INF-D22710A2184C60

## contextual_concept_ids

## difficulty
Moderate

## question_type
Classification

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
MANS_Y1=high

## years
MANS_Y1

## universities
mans

## module
MANS-HIS-203

## module_subject
MANS-HIS-203 > Parasitology > Malaria

## question_only_for

## library_ids
ART-INF-TOP-28EB55C385

## resource_ids
src_c4ee1e63536c22ca52d4

## learning_objective
Identify P. vivax (with P. ovale) as the species that relapses via dormant hepatic hypnozoites, as distinct from recrudescence in the other species.

## source_citation
His Continuous Berlin Book 2026, Parasitology-HIS, p.65

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer letter beside option, p.65 (Parasitology-HIS references block, Q1)

---

# Item

## id
QST-MANSHIS203-MALARIA-LIVE-MALARIA-CEREBRAL-SPECIES

## title
Species most associated with cerebral malaria

## question
Cerebral malaria is a severe complication most commonly associated with which species?

## subject
pharm

## status
Draft

## owner
Claude

## vignette

## correct_answer
D

## answer_a
Plasmodium vivax

## explanation_a
Incorrect. P. vivax causes benign tertian malaria; its complications are far less severe than falciparum's, and cerebral involvement is not a recognised feature of vivax infection.

## answer_b
Plasmodium malariae

## explanation_b
Incorrect. P. malariae causes benign quartan malaria; its main long-term complication is immune-complex nephrotic syndrome, not cerebral disease.

## answer_c
Plasmodium ovale

## explanation_c
Incorrect. P. ovale, like vivax, causes a benign tertian pattern and is not associated with cerebral malaria.

## answer_d
Plasmodium falciparum

## explanation_d
Correct. P. falciparum causes malignant (subtertian) malaria and is the species responsible for cerebral malaria, along with the rest of its complicated-malaria picture (blackwater fever, algid malaria, acute renal failure, severe anaemia and pulmonary oedema). This severity follows from falciparum's ability to invade RBCs of all ages, producing the highest parasitaemia of any human Plasmodium species, and from cytoadherence of parasitised cells to microvascular endothelium (the pernicious-syndrome mechanism).

## topic
Parasitology

## subtopic
Malaria

## main_concept
CON-INF-A5691403C45F53

## concept_ids
CON-INF-A5691403C45F53

## contextual_concept_ids

## difficulty
Easy

## question_type
Classification

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
MANS_Y1=high

## years
MANS_Y1

## universities
mans

## module
MANS-HIS-203

## module_subject
MANS-HIS-203 > Parasitology > Malaria

## question_only_for

## library_ids
ART-INF-TOP-28EB55C385

## resource_ids
src_c4ee1e63536c22ca52d4

## learning_objective
Identify P. falciparum as the species responsible for cerebral malaria and the rest of the complicated-malaria picture.

## source_citation
His Continuous Berlin Book 2026, Parasitology-HIS, p.66

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer letter beside option, p.66 (Parasitology-HIS references block, Q6)

---

# Item

## id
QST-MANSHIS203-MALARIA-LIVE-MALARIA-ALGID

## title
Algid malaria

## question
In complicated falciparum malaria, circulatory collapse with hypotension and peripheral circulatory failure is termed:

## subject
pharm

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Cerebral malaria

## explanation_a
Incorrect. Cerebral malaria is a picture of decreased consciousness, convulsions and paralysis from cerebral involvement, not a circulatory-collapse picture.

## answer_b
Algid malaria

## explanation_b
Correct. Algid malaria is the name given to the circulatory-collapse presentation of complicated falciparum malaria — low blood pressure and peripheral circulatory failure, analogous to septic-shock-like hypoperfusion. It is listed by the department's own book alongside cerebral malaria, acute renal failure, severe anaemia, pulmonary oedema, blackwater fever and metabolic acidosis as one of the recognised complications of severe falciparum disease. Recognising it matters clinically because it needs circulatory support, not just antimalarial treatment, to reverse the hypoperfusion.

## answer_c
Blackwater fever

## explanation_c
Incorrect. Blackwater fever is massive intravascular haemolysis with haemoglobinuria, a distinct complication from the circulatory-collapse picture algid malaria describes.

## answer_d
Recrudescence

## explanation_d
Incorrect. Recrudescence is the recurrence of clinical attacks from persistent low-grade blood-stage parasitaemia, a chronic/relapsing pattern rather than an acute circulatory-collapse complication.

## topic
Parasitology

## subtopic
Malaria

## main_concept
CON-INF-7AED4BCB0638F3

## concept_ids
CON-INF-7AED4BCB0638F3

## contextual_concept_ids
CON-INF-D52C8D8ED370EE | CON-INF-A5691403C45F53

## difficulty
Moderate

## question_type
Classification

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
MANS_Y1=high

## years
MANS_Y1

## universities
mans

## module
MANS-HIS-203

## module_subject
MANS-HIS-203 > Parasitology > Malaria

## question_only_for

## library_ids
ART-INF-TOP-28EB55C385

## resource_ids
src_c4ee1e63536c22ca52d4

## learning_objective
Identify algid malaria as the circulatory-collapse complication of severe falciparum malaria, as distinct from cerebral malaria and blackwater fever.

## source_citation
His Continuous Berlin Book 2026, Parasitology-HIS, p.63

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: department book's own complicated-falciparum-malaria list, p.63, item 18 ("Algid Malaria: ↓Bl.P, peripheral circulatory failure")

---

# Item

## id
QST-MANSHIS203-MALARIA-LIVE-MALARIA-BLACKWATER

## title
Blackwater fever

## question
A patient with falciparum malaria develops massive intravascular haemolysis with haemoglobinuria, anaemia, jaundice and fever, and is at risk of renal failure. This complication is known as:

## subject
pharm

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Algid malaria

## explanation_a
Incorrect. Algid malaria is the circulatory-collapse/hypotension complication, not a haemolytic one; the two are listed separately in the department's own complicated-falciparum-malaria list.

## answer_b
Blackwater fever

## explanation_b
Correct. Blackwater fever is massive intravascular haemolysis producing haemoglobinuria (giving urine its dark, "blackwater" colour), together with anaemia, jaundice and fever, and it carries a real risk of progressing to acute renal failure from the haemoglobin load on the kidneys. It is one of the named complications of severe falciparum malaria in the department's own list.

## answer_c
Cerebral malaria

## explanation_c
Incorrect. Cerebral malaria is a picture of decreased consciousness, convulsions and paralysis, not a haemolytic/renal complication.

## answer_d
Recrudescence

## explanation_d
Incorrect. Recrudescence is the recurrence of clinical attacks from persisting low-grade parasitaemia, not an acute haemolytic event.

## topic
Parasitology

## subtopic
Malaria

## main_concept
CON-INF-D52C8D8ED370EE

## concept_ids
CON-INF-D52C8D8ED370EE

## contextual_concept_ids
CON-INF-5DFBC7FBB17B73

## difficulty
Moderate

## question_type
Diagnosis

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
MANS_Y1=high

## years
MANS_Y1

## universities
mans

## module
MANS-HIS-203

## module_subject
MANS-HIS-203 > Parasitology > Malaria

## question_only_for

## library_ids
ART-INF-TOP-28EB55C385

## resource_ids
src_c4ee1e63536c22ca52d4

## learning_objective
Identify blackwater fever as massive intravascular haemolysis with haemoglobinuria in severe falciparum malaria, distinct from algid and cerebral malaria.

## source_citation
His Continuous Berlin Book 2026, Parasitology-HIS, p.63

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: department book's own complicated-falciparum-malaria list, p.63, item 18 ("Black water fever")

---

# Item

## id
QST-MANSHIS203-MALARIA-LIVE-MALARIA-RENAL-FAILURE

## title
Acute renal failure in complicated falciparum malaria

## question
Acute renal failure, one of the recognised complications of severe falciparum malaria, results mainly from:

## subject
pharm

## status
Draft

## owner
Claude

## vignette

## correct_answer
A

## answer_a
Anoxic acute tubular necrosis

## explanation_a
Correct. Acute renal failure in severe falciparum malaria is mainly the result of anoxic acute tubular necrosis, following from the same microvascular obstruction, hypoperfusion and haemoglobin/pigment load that produce the disease's other complications (blackwater fever, algid malaria). It is listed among these complications in the department's own complicated-falciparum-malaria summary.

## answer_b
Direct invasion of the kidney by merozoites

## explanation_b
Incorrect. Plasmodium infects erythrocytes and hepatocytes, not renal tubular cells directly; the kidney injury is ischaemic/toxic, not from direct parasite invasion of renal tissue.

## answer_c
Immune-complex deposition in the glomerulus

## explanation_c
Incorrect. Immune-complex glomerular disease (nephrotic syndrome) is the renal complication associated with chronic P. malariae infection, not the acute renal failure of severe falciparum malaria.

## answer_d
Chronic dehydration alone

## explanation_d
Incorrect. Dehydration can contribute to renal hypoperfusion, but the acute renal failure of severe falciparum malaria is attributed specifically to anoxic tubular necrosis from the disease process itself, not simply to fluid loss.

## topic
Parasitology

## subtopic
Malaria

## main_concept
CON-INF-5DFBC7FBB17B73

## concept_ids
CON-INF-5DFBC7FBB17B73

## contextual_concept_ids
CON-INF-D52C8D8ED370EE

## difficulty
Hard

## question_type
Mechanism

## cognitive_effort
High

## cognitive_effort_score
0.8

## setting
Academic

## reasoning_level
3

## inferred_difficulty
30

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
MANS_Y1=high

## years
MANS_Y1

## universities
mans

## module
MANS-HIS-203

## module_subject
MANS-HIS-203 > Parasitology > Malaria

## question_only_for

## library_ids
ART-INF-TOP-28EB55C385

## resource_ids
src_c4ee1e63536c22ca52d4

## learning_objective
Identify anoxic acute tubular necrosis as the mechanism of acute renal failure in severe falciparum malaria.

## source_citation
His Continuous Berlin Book 2026, Parasitology-HIS, p.63

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: department book's own complicated-falciparum-malaria list, p.63, item 18 ("Acute renal failure"); mechanism supplied from the live concept's own definition, consistent with the source's listing of renal failure alongside the other pernicious-syndrome complications

---

# Item

## id
QST-MANSHIS203-MALARIA-LIVE-MALARIA-SUPPRESSIVE-PROPHYLAXIS

## title
Suppressive chemoprophylaxis for malaria

## question
Suppressive (chemo-) prophylaxis against malaria, which acts as a blood schizonticide during the trip rather than eradicating liver hypnozoites, uses:

## subject
pharm

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Primaquine

## explanation_a
Incorrect. Primaquine is the causal (radical cure) prophylactic and the drug used to clear hypnozoites and prevent relapse; it is not the standard suppressive/blood-schizonticide agent for travel prophylaxis.

## answer_b
Chloroquine or mefloquine

## explanation_b
Correct. Chloroquine (where the parasite remains sensitive) or mefloquine is used for suppressive prophylaxis. Each acts as a blood schizonticide that kills the erythrocytic stage and so prevents clinical attacks for as long as it is taken, consistent with chloroquine's and artemisinin's role as blood schizonticides for clinical attacks generally. Because it only clears the blood stage, this suppressive prophylaxis must still be continued for weeks after leaving the endemic area, to cover any parasites already released from the liver.

## answer_c
Only iron supplementation

## explanation_c
Incorrect. Iron supplementation has no antimalarial action; it addresses iron deficiency, an unrelated problem, not malaria prophylaxis.

## answer_d
Interferon gamma

## explanation_d
Incorrect. Interferon gamma is used as adjunct systemic therapy in visceral leishmaniasis, not as antimalarial prophylaxis.

## topic
Parasitology

## subtopic
Malaria

## main_concept
CON-INF-27A615A943CBD0

## concept_ids
CON-INF-27A615A943CBD0

## contextual_concept_ids
CON-INF-D22710A2184C60

## difficulty
Moderate

## question_type
Classification

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
MANS_Y1=high

## years
MANS_Y1

## universities
mans

## module
MANS-HIS-203

## module_subject
MANS-HIS-203 > Parasitology > Malaria

## question_only_for

## library_ids
ART-INF-TOP-28EB55C385

## resource_ids
src_c4ee1e63536c22ca52d4

## learning_objective
Distinguish suppressive (blood-schizonticide) prophylaxis from causal (hypnozoite-clearing) prophylaxis in malaria.

## source_citation
His Continuous Berlin Book 2026, Parasitology-HIS, p.63

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: department book's own list, p.63, item 24 ("Suppressive prophylaxis chloroquine or mefloquine"), contrasted with item 23 ("Causal prophylaxis primaquine")

---

# Item

## id
QST-MANSHIS203-LEISHMANIA-MINT-LEISH-VECTOR

## title
Vector of Leishmania

## question
The vector of Leishmania is:

## subject
pharm

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Female Anopheles

## explanation_a
Incorrect. The female Anopheles mosquito is malaria's vector, not Leishmania's; confusing the two vectors is a common exam trap across this department's parasitology bank.

## answer_b
Flea

## explanation_b
Incorrect. Fleas transmit organisms such as Yersinia pestis (plague) and some rickettsiae, not Leishmania.

## answer_c
Female sand fly

## explanation_c
Correct. The female sand fly (genus Phlebotomus in the Old World, including Egypt) is the vector of Leishmania. It injects the promastigote form while feeding, which is then taken up by human macrophages and transforms into the amastigote, the form responsible for the disease.

## answer_d
Musca domestica

## explanation_d
Incorrect. Musca domestica (the housefly) is a mechanical vector for some enteric pathogens; it plays no role in Leishmania transmission.

## answer_e
Soft ticks

## explanation_e
Incorrect. Soft ticks transmit organisms such as relapsing-fever Borrelia, not Leishmania.

## topic
Parasitology

## subtopic
Leishmaniasis

## main_concept
CON-INF-8E5A379127842E

## concept_ids
CON-INF-8E5A379127842E

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
MANS_Y1=high

## years
MANS_Y1

## universities
mans

## module
MANS-HIS-203

## module_subject
MANS-HIS-203 > Parasitology > Leishmania

## question_only_for

## library_ids
ART-MANS-HIS-LEISHMANIA-VISCERAL-BASICS

## resource_ids
src_c4ee1e63536c22ca52d4

## learning_objective
Identify the female sand fly as the vector of Leishmania, as distinct from other arthropod vectors.

## source_citation
His Continuous Berlin Book 2026, Parasitology-HIS, p.67

## attached_image

## attachments

## media_recommendations

## estimated_seconds
55

## randomise_answers
yes

## author_notes
keySource: printed answer letter beside option, p.67 (L2 PARA questions, FORMATIVE + LECTURE MCQ, Q2)

---

# Item

## id
QST-MANSHIS203-LEISHMANIA-MINT-LEISH-DIAGNOSTIC-STAGE

## title
Diagnostic stage of Leishmania in tissue smears

## question
What is the diagnostic stage of Leishmania in tissue smears?

## subject
pharm

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Promastigote

## explanation_a
Incorrect. The promastigote (flagellated) is the form found in the sand fly vector and in culture (NNN medium), not the form a tissue smear from a human patient is examined for.

## answer_b
Epimastigote

## explanation_b
Incorrect. The epimastigote is a form seen in the life cycle of trypanosomes, not Leishmania.

## answer_c
Amastigote

## explanation_c
Correct. The amastigote — non-flagellated and obligate intracellular within human macrophages — is the diagnostic stage seen on a Leishman- or Giemsa-stained tissue smear (bone marrow, spleen or liver aspirate). Finding amastigotes within macrophages on such a smear confirms the diagnosis of visceral leishmaniasis.

## answer_d
Trypomastigote

## explanation_d
Incorrect. The trypomastigote is the bloodstream form of Trypanosoma species, not a form Leishmania passes through.

## topic
Parasitology

## subtopic
Leishmaniasis

## main_concept
CON-INF-8E5A379127842E

## concept_ids
CON-INF-8E5A379127842E

## contextual_concept_ids

## difficulty
Moderate

## question_type
Diagnosis

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
MANS_Y1=high

## years
MANS_Y1

## universities
mans

## module
MANS-HIS-203

## module_subject
MANS-HIS-203 > Parasitology > Leishmania

## question_only_for

## library_ids
ART-MANS-HIS-LEISHMANIA-VISCERAL-BASICS

## resource_ids
src_c4ee1e63536c22ca52d4

## learning_objective
Identify the amastigote as the diagnostic stage of Leishmania on a tissue smear, as distinct from the promastigote (vector/culture form).

## source_citation
His Continuous Berlin Book 2026, Parasitology-HIS, p.68

## attached_image

## attachments

## media_recommendations

## estimated_seconds
55

## randomise_answers
yes

## author_notes
keySource: printed answer letter beside option, p.68 (Parasitology-HIS references block, Q3)

---

# Item

## id
QST-MANSHIS203-LEISHMANIA-MINT-LEISH-SKIN-TEST

## title
Leishmanin (Montenegro) skin test

## question
Which of the following diagnostic methods involves injecting killed promastigotes intradermally?

## subject
pharm

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
ELISA test

## explanation_a
Incorrect. ELISA detects circulating anti-leishmanial antibodies in a blood sample; it does not involve injecting anything into the skin.

## answer_b
IFA test

## explanation_b
Incorrect. The indirect fluorescent antibody (IFA) test is also a serological blood test for antibodies, not a skin test.

## answer_c
Leishmanin skin test

## explanation_c
Correct. The Leishmanin (Montenegro) skin test injects killed promastigotes intradermally and reads a delayed-hypersensitivity response (induration and erythema) 48-72 hours later. A positive result indicates past infection with Leishmania, becoming positive only 6-8 weeks after cure, and is typically negative during active visceral leishmaniasis because of the marked depression of cell-mediated immunity the active disease itself causes.

## answer_d
DAT test

## explanation_d
Incorrect. The direct agglutination test (DAT) is a serological test performed on a blood sample, not a skin test.

## topic
Parasitology

## subtopic
Leishmaniasis

## main_concept
CON-INF-8E5A379127842E

## concept_ids
CON-INF-8E5A379127842E

## contextual_concept_ids

## difficulty
Moderate

## question_type
Diagnosis

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
MANS_Y1=high

## years
MANS_Y1

## universities
mans

## module
MANS-HIS-203

## module_subject
MANS-HIS-203 > Parasitology > Leishmania

## question_only_for

## library_ids
ART-MANS-HIS-LEISHMANIA-VISCERAL-BASICS

## resource_ids
src_c4ee1e63536c22ca52d4

## learning_objective
Identify the Leishmanin (Montenegro) skin test as the intradermal killed-promastigote test for past Leishmania infection, and that it is negative during active disease.

## source_citation
His Continuous Berlin Book 2026, Parasitology-HIS, p.68

## attached_image

## attachments

## media_recommendations

## estimated_seconds
55

## randomise_answers
yes

## author_notes
keySource: printed answer letter beside option, p.68 (Parasitology-HIS references block, Q9)

---

# Item

## id
QST-MANSHIS203-LEISHMANIA-MINT-LEISH-BLACK-FEVER-SIGN

## title
Why visceral leishmaniasis is called "black fever"

## question
Which clinical sign gives visceral leishmaniasis the name 'black fever' (kala-azar)?

## subject
pharm

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Severe diarrhoea

## explanation_a
Incorrect. Diarrhoea or dysentery can occur in visceral leishmaniasis, from parasite invasion of Peyer's patches, but it is not what gives the disease its "black fever" name.

## answer_b
Dark pigmentation of the skin

## explanation_b
Correct. "Kala-azar" is Hindi for "black fever," reflecting the early hyperpigmentation of the skin (classically circumoral, around the face) that visceral leishmaniasis produces, alongside its systemic fever. This pigmentation is distinct from post-kala-azar dermal leishmaniasis (PKDL), the depigmented nodular lesions that can appear after apparent cure.

## answer_c
Enlarged spleen

## explanation_c
Incorrect. Splenomegaly is a prominent feature of visceral leishmaniasis (with hepatomegaly and lymphadenopathy), but it is the skin pigmentation, not the enlarged spleen, that gives the disease its "black" name.

## answer_d
Nodular lesions

## explanation_d
Incorrect. Nodular skin lesions describe post-kala-azar dermal leishmaniasis (PKDL), a depigmented, not dark, presentation that occurs after recovery, not the sign the disease is named for.

## topic
Parasitology

## subtopic
Leishmaniasis

## main_concept
CON-INF-8E5A379127842E

## concept_ids
CON-INF-8E5A379127842E

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
MANS_Y1=high

## years
MANS_Y1

## universities
mans

## module
MANS-HIS-203

## module_subject
MANS-HIS-203 > Parasitology > Leishmania

## question_only_for

## library_ids
ART-MANS-HIS-LEISHMANIA-VISCERAL-BASICS

## resource_ids
src_c4ee1e63536c22ca52d4

## learning_objective
Explain why visceral leishmaniasis is called "black fever," and distinguish its skin hyperpigmentation from PKDL's depigmented nodules.

## source_citation
His Continuous Berlin Book 2026, Parasitology-HIS, p.68

## attached_image

## attachments

## media_recommendations

## estimated_seconds
55

## randomise_answers
yes

## author_notes
keySource: printed answer letter beside option, p.68 (Parasitology-HIS references block, Q17)

---

# Item

## id
QST-MANSHIS203-FILARIASIS-MINT-FILARIA-WORM-SITE

## title
Site of adult Wuchereria bancrofti worms

## question
Wuchereria bancrofti adult worms live in:

## subject
pharm

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Eye

## explanation_a
Incorrect. The eye is the site adult worms of Loa loa (another filarial species) are classically found crossing, not Wuchereria bancrofti.

## answer_b
Lung

## explanation_b
Incorrect. The lung is where microfilariae can trigger tropical pulmonary eosinophilia by hypersensitivity, but the adult worms themselves do not live there.

## answer_c
Lymphatics

## explanation_c
Correct. Adult Wuchereria bancrofti worms establish themselves in the lymphatic vessels and nodes, mainly of the lower limbs and genital organs. It is their presence there, and the years of obstruction and fibrosis this provokes, that drives the disease's chronic manifestations, including elephantiasis.

## answer_d
Blood

## explanation_d
Incorrect. Blood is where the adult worms' offspring, the microfilariae, circulate (with nocturnal periodicity); the adult worms themselves remain fixed in the lymphatics rather than circulating.

## answer_e
Subcutaneous tissue

## explanation_e
Incorrect. Subcutaneous tissue is the site for adult Onchocerca volvulus worms (in nodules), not Wuchereria bancrofti.

## topic
Parasitology

## subtopic
Filariasis

## main_concept
CON-INF-3DEFB880DFF98F

## concept_ids
CON-INF-3DEFB880DFF98F

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
MANS_Y1=high

## years
MANS_Y1

## universities
mans

## module
MANS-HIS-203

## module_subject
MANS-HIS-203 > Parasitology > Filariasis

## question_only_for

## library_ids
ART-MANS-HIS-FILARIASIS-WUCHERERIA-BASICS

## resource_ids
src_c4ee1e63536c22ca52d4

## learning_objective
Identify the lymphatics as the site of adult Wuchereria bancrofti worms, as distinct from where microfilariae circulate.

## source_citation
His Continuous Berlin Book 2026, Parasitology-HIS, p.72

## attached_image

## attachments

## media_recommendations

## estimated_seconds
55

## randomise_answers
yes

## author_notes
keySource: printed answer letter beside option, p.72 (L3 PARA questions, FORMATIVE + LECTURE MCQ, Q2)

---

# Item

## id
QST-MANSHIS203-FILARIASIS-MINT-FILARIA-ELEPHANTIASIS-MECHANISM

## title
Mechanism of elephantiasis

## question
Elephantiasis, a chronic manifestation of lymphatic filariasis, occurs due to:

## subject
pharm

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Dead microfilariae alone

## explanation_a
Incorrect. Dead microfilariae contribute to the inflammatory burden but are not, on their own, the mechanism named for elephantiasis; it is the years-long obstructive process around the adult worms that matters.

## answer_b
Obstruction of lymphatics

## explanation_b
Correct. Elephantiasis results from chronic obstruction of lymphatics, caused by worms blocking the lumen, endothelial proliferation and thickening of the lymphatic vessel wall, and fibrosis of the lymphatics and lymph nodes from repeated inflammation. This obstruction, built up over years, is what distinguishes the chronic phase from the acute inflammatory manifestations (lymphangitis, lymphadenitis, filarial fever) of the same infection.

## answer_c
Migration of worms in blood vessels

## explanation_c
Incorrect. Adult filarial worms live fixed in the lymphatics, not migrating through blood vessels; this option describes neither the worm's location nor the mechanism of elephantiasis.

## answer_d
Circulating microfilariae in blood

## explanation_d
Incorrect. Circulating microfilariae in the blood are the diagnostic finding used for blood-film detection, not the mechanism that produces elephantiasis, which instead follows from the adult worm's presence in the lymphatics.

## answer_e
Hyper-responsiveness to microfilarial antigens

## explanation_e
Incorrect. Hyper-responsiveness to microfilarial antigens is the mechanism of tropical pulmonary eosinophilia (TPE), a distinct hypersensitivity-driven manifestation, not of elephantiasis.

## topic
Parasitology

## subtopic
Filariasis

## main_concept
CON-INF-3DEFB880DFF98F

## concept_ids
CON-INF-3DEFB880DFF98F

## contextual_concept_ids

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
MANS_Y1=high

## years
MANS_Y1

## universities
mans

## module
MANS-HIS-203

## module_subject
MANS-HIS-203 > Parasitology > Filariasis

## question_only_for

## library_ids
ART-MANS-HIS-FILARIASIS-WUCHERERIA-BASICS

## resource_ids
src_c4ee1e63536c22ca52d4

## learning_objective
Explain chronic lymphatic obstruction and fibrosis, not circulating microfilariae or hypersensitivity, as the mechanism of elephantiasis.

## source_citation
His Continuous Berlin Book 2026, Parasitology-HIS, p.72

## attached_image

## attachments

## media_recommendations

## estimated_seconds
55

## randomise_answers
yes

## author_notes
keySource: printed answer letter beside option, p.72 (L3 PARA questions, FORMATIVE + LECTURE MCQ, Q1)

---

# Item

## id
QST-MANSHIS203-FILARIASIS-MINT-FILARIA-TPE-HYPERSENSITIVITY

## title
Hypersensitivity type responsible for tropical pulmonary eosinophilia

## question
What type of hypersensitivity reaction is responsible for tropical pulmonary eosinophilia (TPE) in lymphatic filariasis?

## subject
pharm

## status
Draft

## owner
Claude

## vignette

## correct_answer
A

## answer_a
Type I

## explanation_a
Correct. Tropical pulmonary eosinophilia is a type I (immediate, IgE-mediated) hypersensitivity reaction to microfilarial antigens, producing dyspnoea, cough and asthmatic attacks. Unlike elephantiasis, which follows years of lymphatic fibrosis and does not respond to antifilarial drugs once established, TPE responds well to diethylcarbamazine (Hetrazan), which is directed at the microfilariae driving the hypersensitivity.

## answer_b
Type II

## explanation_b
Incorrect. Type II (cytotoxic, antibody against a fixed cell-surface antigen) describes reactions such as Rh incompatibility, not the mechanism behind TPE.

## answer_c
Type III

## explanation_c
Incorrect. Type III (immune complex deposition) describes conditions such as serum sickness, not the mechanism responsible for TPE.

## answer_d
Type IV

## explanation_d
Incorrect. Type IV (delayed, T-cell-mediated) reactions take 24-72 hours to develop, unlike the immediate IgE-mediated mechanism behind TPE.

## topic
Parasitology

## subtopic
Filariasis

## main_concept
CON-INF-3DEFB880DFF98F

## concept_ids
CON-INF-3DEFB880DFF98F

## contextual_concept_ids
CON-IMM-64B2E67A0AAF07

## difficulty
Moderate

## question_type
Classification

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
MANS_Y1=high

## years
MANS_Y1

## universities
mans

## module
MANS-HIS-203

## module_subject
MANS-HIS-203 > Parasitology > Filariasis

## question_only_for

## library_ids
ART-MANS-HIS-FILARIASIS-WUCHERERIA-BASICS

## resource_ids
src_c4ee1e63536c22ca52d4

## learning_objective
Identify TPE as a type I hypersensitivity reaction to microfilarial antigens, and that it (unlike elephantiasis) responds to diethylcarbamazine.

## source_citation
His Continuous Berlin Book 2026, Parasitology-HIS, p.83

## attached_image

## attachments

## media_recommendations

## estimated_seconds
55

## randomise_answers
yes

## author_notes
keySource: printed answer letter beside option, p.83 (Parasitology-HIS references block, Q14)

---

# Item

## id
QST-MANSHIS203-FILARIASIS-MINT-FILARIA-BLOOD-COLLECTION-TIMING

## title
Best time to collect blood for microfilariae

## question
What is the recommended time for blood collection when suspecting bancroftian filariasis, to detect circulating microfilariae?

## subject
pharm

## status
Draft

## owner
Claude

## vignette

## correct_answer
D

## answer_a
Morning

## explanation_a
Incorrect. Microfilariae are far less numerous in peripheral blood in the morning; sampling then risks a false-negative result.

## answer_b
Noon

## explanation_b
Incorrect. Noon is, if anything, the time microfilariae are least numerous in peripheral blood, not the recommended collection window.

## answer_c
Evening

## explanation_c
Incorrect. Evening still precedes the peak of nocturnal periodicity; microfilarial density in peripheral blood has not yet reached its maximum.

## answer_d
Night (10 PM-2 AM)

## explanation_d
Correct. Wuchereria bancrofti microfilariae show nocturnal periodicity, becoming most numerous in peripheral blood between about 10 PM and 2 AM, so diagnostic blood films (thick Giemsa-stained smears) are timed to this window to maximise the chance of detecting them. Where clinical timing is impractical, a provocative test with a small dose of diethylcarbamazine can bring microfilariae into daytime peripheral blood instead.

## topic
Parasitology

## subtopic
Filariasis

## main_concept
CON-INF-3DEFB880DFF98F

## concept_ids
CON-INF-3DEFB880DFF98F

## contextual_concept_ids

## difficulty
Moderate

## question_type
Diagnosis

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
MANS_Y1=high

## years
MANS_Y1

## universities
mans

## module
MANS-HIS-203

## module_subject
MANS-HIS-203 > Parasitology > Filariasis

## question_only_for

## library_ids
ART-MANS-HIS-FILARIASIS-WUCHERERIA-BASICS

## resource_ids
src_c4ee1e63536c22ca52d4

## learning_objective
State the nocturnal-periodicity timing rule for collecting blood to detect W. bancrofti microfilariae.

## source_citation
His Continuous Berlin Book 2026, Parasitology-HIS, p.73

## attached_image

## attachments

## media_recommendations

## estimated_seconds
55

## randomise_answers
yes

## author_notes
keySource: printed answer letter beside option, p.73 (Parasitology-HIS references block, Q1)
