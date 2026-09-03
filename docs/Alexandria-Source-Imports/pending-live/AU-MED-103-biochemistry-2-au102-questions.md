<!--
  AU-MED-103 Biochemistry Step 2 lane 2 (W1-103-BIOC, bioc2) -- 7 SBA reusing five concepts already minted for the sibling AU-MED-102 lane (same university, concept ids university-blind per LANE-CARD.md SS1/SS4), extended for AU-MED-103 via pending-live/AU-MED-103-biochemistry-2-au102-overlay-concepts.md. Per LANE-BRIEF.md SS16/SS21: main_concept/library_ids below are AU-MED-102 ids, not this lane's own concept/article batch. Validate with --with docs/Alexandria-Source-Imports/concept/AU-MED-102-biochem-metabolism-concepts.md (q01, q02, q03, q06) or --with docs/Alexandria-Source-Imports/concept/AU-MED-102-biochem-nitrogen-blood-concepts.md (q04, q05, q07), plus the matching article file.

  Import: Admin › Bulk import → question.
-->

# Item

## id
QST-au103-BIOC2AU102-BIOC2AU102-Q01

## title
Two children each have fructose detectable in the urine after a fruit-containing meal. One is otherwise entirely well; the other has vomiting, hypoglycaemia and failure to thrive. What distinguishes the two conditions?

## question
Two children each have fructose detectable in the urine after a fruit-containing meal. One is otherwise entirely well; the other has vomiting, hypoglycaemia and failure to thrive. What distinguishes the two conditions?

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
The well child has essential fructosuria (fructokinase deficiency, biochemically harmless); the unwell child has hereditary fructose intolerance (aldolase B deficiency, which traps toxic fructose-1-phosphate)

## explanation_a
Correct. Essential fructosuria is fructokinase deficiency: fructose is simply never phosphorylated to fructose-1-phosphate, so it accumulates unchanged and spills into urine, but because no toxic intermediate ever forms, the condition is entirely benign. Hereditary fructose intolerance is a different enzyme's deficiency, aldolase B, which acts one step further down the pathway; fructokinase still works normally in this disease, so fructose-1-phosphate is made but cannot be split further, and it accumulates to toxic levels that sequester inorganic phosphate, deplete ATP and cause exactly the vomiting, hypoglycaemia and failure to thrive described. Fructosuria (fructose in the urine) is common to both conditions and cannot by itself distinguish them; it is the clinical picture -- and the specific missing enzyme -- that tells them apart.

## answer_b
Both children have the identical enzyme deficiency; the difference is only how much fruit each ate

## explanation_b
Incorrect. The two conditions involve two different enzymes (fructokinase versus aldolase B) at two different steps of the same pathway, which is exactly why one is harmless and the other is dangerous; the difference is not simply a matter of dose.

## answer_c
The well child has hereditary fructose intolerance; the unwell child has essential fructosuria

## explanation_c
Incorrect. This reverses the two conditions -- hereditary fructose intolerance (aldolase B deficiency) is the dangerous one causing symptoms, and essential fructosuria (fructokinase deficiency) is the benign one.

## answer_d
The well child has galactosaemia; the unwell child has essential fructosuria

## explanation_d
Incorrect. Galactosaemia is a disorder of galactose, not fructose, metabolism (galactose-1-phosphate uridyltransferase deficiency); it would not present with fructose in the urine at all.

## topic
Fructose metabolism

## subtopic

## main_concept
CON-FND-031381BCC0ACC5

## concept_ids

## contextual_concept_ids

## difficulty
Moderate

## question_type

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
AU_Y1=0.5

## years
AU_Y1

## universities
au

## module
AU-MED-103

## module_subject
AU-MED-103 > Biochemistry

## question_only_for

## library_ids
ART-FND-FRUCTOSE-AND-GALACTOSE-DISORDERS

## resource_ids

## learning_objective
Contrast essential fructosuria (fructokinase deficiency, benign) with hereditary fructose intolerance (aldolase B deficiency, harmful), both presenting with fructosuria.

## source_citation
EOM - Blood End Egyptian 1, Q20 (Alexandria University, AU-MED-103); EOM - Blood end wafdeen final, Q38, Q40; MCQs - CHO Metabolism MCQs (1), Q101.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
90

## randomise_answers
yes

## author_notes
pendingLiveTarget: AU-MED-102-biochem-metabolism-concepts.md (Alexandria, sibling module). Sourced from three separate triage rows (essential fructosuria, WAF Q38; HFI, EGY1 Q20/WAF Q40/AGHA-CHO Q101), combined into one contrast question since the exam's own logic tests exactly this pairing.

---

# Item

## id
QST-au103-BIOC2AU102-BIOC2AU102-Q02

## title
A neonate develops jaundice, hepatosplenomegaly and cataracts after starting milk feeds. Which enzyme deficiency is responsible, and what accumulates to cause the cataracts specifically?

## question
A neonate develops jaundice, hepatosplenomegaly and cataracts after starting milk feeds. Which enzyme deficiency is responsible, and what accumulates to cause the cataracts specifically?

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
Galactose-1-phosphate uridyltransferase deficiency; galactitol, produced by aldose reductase, osmotically damages the lens

## explanation_a
Correct. Classic galactosaemia is deficiency of galactose-1-phosphate uridyltransferase, the enzyme that normally exchanges galactose-1-phosphate's phosphate for UDP-glucose's glucose; without it, galactose-1-phosphate accumulates in liver, kidney, lens and brain, producing the hepatosplenomegaly, jaundice and later intellectual disability. The cataracts specifically come from a side pathway: excess galactose is diverted by aldose reductase to galactitol, an osmotically active sugar alcohol that cannot leave the lens easily and draws water in, swelling and clouding the lens.

## answer_b
Galactokinase deficiency; galactose itself directly damages the lens with no intermediate metabolite

## explanation_b
Incorrect. Galactokinase deficiency is a milder, separate galactosaemia variant that causes cataracts alone (via galactitol, the same mechanism) without the liver/brain involvement of classic galactosaemia; and galactose itself is not what directly damages the lens -- its diversion to galactitol is the actual mechanism, in both variants.

## answer_c
Fructokinase deficiency; sorbitol damages the lens

## explanation_c
Incorrect. Fructokinase deficiency (essential fructosuria) is a fructose, not galactose, disorder, and it is biochemically harmless; it is not the cause of this neonate's presentation.

## answer_d
Aldolase B deficiency; fructose-1-phosphate damages the lens

## explanation_d
Incorrect. Aldolase B deficiency is hereditary fructose intolerance, a fructose disorder triggered by fructose or sucrose exposure (typically at weaning), not by milk (lactose/galactose) feeding, and it does not cause cataracts.

## topic
Galactose metabolism

## subtopic

## main_concept
CON-FND-C4459ABD69361C

## concept_ids

## contextual_concept_ids

## difficulty
Moderate

## question_type

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
AU_Y1=0.5

## years
AU_Y1

## universities
au

## module
AU-MED-103

## module_subject
AU-MED-103 > Biochemistry

## question_only_for

## library_ids
ART-FND-FRUCTOSE-AND-GALACTOSE-DISORDERS

## resource_ids

## learning_objective
State galactose-1-phosphate uridyltransferase deficiency as the cause of classic galactosaemia and explain the galactitol/aldose-reductase mechanism behind its cataracts.

## source_citation
MCQs - CHO Metabolism MCQs (1), Q61, Q103 (Alexandria University, AU-MED-103).

## attached_image

## attachments

## media_recommendations

## estimated_seconds
90

## randomise_answers
yes

## author_notes
pendingLiveTarget: AU-MED-102-biochem-metabolism-concepts.md (Alexandria, sibling module). Combines the two AGHA-CHO restatements of 'commonest deficient enzyme' with the article's own galactitol/cataract mechanism into one richer vignette rather than two near-duplicate questions.

---

# Item

## id
QST-au103-BIOC2AU102-BIOC2AU102-Q03

## title
Gluconeogenesis needs cytosolic reducing power, but the enzyme that makes it (malate dehydrogenase, running in reverse) is mitochondrial. How does the cell solve this compartment problem?

## question
Gluconeogenesis needs cytosolic reducing power, but the enzyme that makes it (malate dehydrogenase, running in reverse) is mitochondrial. How does the cell solve this compartment problem?

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
Mitochondrial oxaloacetate is converted to malate, which crosses into the cytosol (since oxaloacetate itself has no mitochondrial transporter) and is then reoxidised to oxaloacetate there, releasing NADH exactly where the cytosolic gluconeogenic steps need it

## explanation_a
Correct. Oxaloacetate itself has no transporter to cross the inner mitochondrial membrane, so the cell converts it to malate (a molecule that does have a transporter) inside the mitochondrion, shuttles the malate out to the cytosol, and then reoxidises it back to oxaloacetate there using cytosolic malate dehydrogenase. That reoxidation step regenerates NADH in the cytosol as a useful by-product, supplying reducing power the later cytosolic steps of gluconeogenesis (such as glyceraldehyde-3-phosphate dehydrogenase running in reverse) need, which is exactly why this route, rather than a hypothetical direct oxaloacetate transporter, is what the cell actually uses.

## answer_b
Oxaloacetate crosses the mitochondrial membrane directly via its own dedicated transporter

## explanation_b
Incorrect. Oxaloacetate has no dedicated mitochondrial membrane transporter; that absence is precisely the problem the malate shuttle exists to solve.

## answer_c
The reaction happens entirely within the mitochondrion, and glucose itself is exported instead

## explanation_c
Incorrect. Gluconeogenesis's later steps, including the one this shuttle supports, occur in the cytosol, not entirely within the mitochondrion; and it is oxaloacetate/malate, not glucose itself, that is exported at this stage of the pathway.

## answer_d
Pyruvate is exported to the cytosol and directly converted to oxaloacetate there, bypassing the need for malate

## explanation_d
Incorrect. Pyruvate is carboxylated to oxaloacetate inside the mitochondrion by pyruvate carboxylase, not converted directly in the cytosol; oxaloacetate must still be exported as malate because it cannot cross the membrane on its own.

## topic
Gluconeogenesis

## subtopic

## main_concept
CON-FND-95805B0745D091

## concept_ids

## contextual_concept_ids

## difficulty
Moderate

## question_type

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
AU_Y1=0.5

## years
AU_Y1

## universities
au

## module
AU-MED-103

## module_subject
AU-MED-103 > Biochemistry

## question_only_for

## library_ids
ART-FND-GLUCONEOGENESIS-MALATE-SHUTTLE-AND-ATP-COST

## resource_ids

## learning_objective
Explain the malate shuttle: oxaloacetate has no mitochondrial transporter, so it crosses as malate and is reoxidised in the cytosol, supplying NADH there.

## source_citation
MCQs - CHO Metabolism MCQs (1), Q17 (Alexandria University, AU-MED-103).

## attached_image

## attachments

## media_recommendations

## estimated_seconds
90

## randomise_answers
yes

## author_notes
pendingLiveTarget: AU-MED-102-biochem-metabolism-concepts.md (Alexandria, sibling module).

---

# Item

## id
QST-au103-BIOC2AU102-BIOC2AU102-Q04

## title
What is the rate-limiting, committed step of haem biosynthesis, and which cofactor does its enzyme absolutely require?

## question
What is the rate-limiting, committed step of haem biosynthesis, and which cofactor does its enzyme absolutely require?

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
ALA synthase condensing glycine with succinyl-CoA, requiring pyridoxal phosphate (vitamin B6)

## explanation_a
Correct. ALA synthase, a mitochondrial enzyme, catalyses haem biosynthesis's committed and rate-limiting step: condensing glycine with succinyl-CoA to form delta-aminolevulinic acid (ALA), releasing CO2 and CoA-SH. This reaction absolutely requires pyridoxal phosphate, the active form of vitamin B6, as coenzyme, proceeding through a PLP-glycine Schiff base intermediate exactly as other amino-acid-handling PLP enzymes do; no other cofactor (thiamine pyrophosphate, biotin, folic acid) can substitute for it in this specific reaction.

## answer_b
Ferrochelatase inserting iron into protoporphyrin IX, requiring thiamine pyrophosphate

## explanation_b
Incorrect. Ferrochelatase catalyses the pathway's final step, not its rate-limiting committed one, and it does not use thiamine pyrophosphate as cofactor.

## answer_c
PBG deaminase, requiring biotin

## explanation_c
Incorrect. PBG deaminase (hydroxymethylbilane synthase) acts partway through the pathway, not at its committed first step, and does not require biotin.

## answer_d
ALA dehydratase, requiring folic acid

## explanation_d
Incorrect. ALA dehydratase acts on ALA after it is already made (condensing two ALA molecules into porphobilinogen), so it is not the pathway's committed, rate-limiting step, and it does not require folic acid.

## topic
Haem biosynthesis

## subtopic

## main_concept
CON-HEM-6BA5D04F841FBA

## concept_ids

## contextual_concept_ids

## difficulty
Moderate

## question_type

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
AU_Y1=0.5

## years
AU_Y1

## universities
au

## module
AU-MED-103

## module_subject
AU-MED-103 > Biochemistry

## question_only_for

## library_ids
ART-HEM-AU102-HEME-BIOSYNTHESIS

## resource_ids

## learning_objective
Name ALA synthase as haem biosynthesis's rate-limiting, PLP-dependent, glycine-plus-succinyl-CoA-condensing step.

## source_citation
MCQs - Blood Agha MCQ, Q8, Q10, Q24-25 (Alexandria University, AU-MED-103).

## attached_image

## attachments

## media_recommendations

## estimated_seconds
90

## randomise_answers
yes

## author_notes
pendingLiveTarget: AU-MED-102-biochem-nitrogen-blood-concepts.md (Alexandria, sibling module). Distinct from the already-tested Kasr haem-biosynthesis concepts (which cover the pathway's mitochondrion/cytosol split and lead poisoning's two blocked enzymes), neither of which names ALA synthase's own cofactor or substrates.

---

# Item

## id
QST-au103-BIOC2AU102-BIOC2AU102-Q05

## title
Hematin is given as treatment for acute porphyria attacks. What is the biochemical rationale?

## question
Hematin is given as treatment for acute porphyria attacks. What is the biochemical rationale?

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
Hematin represses ALA synthase transcription, reducing production of the toxic porphyrin precursors that accumulate above the enzyme block

## explanation_a
Correct. In an acute porphyria attack, a downstream enzyme block causes ALA and porphobilinogen (the toxic, neuro-active precursors) to accumulate, because the pathway's own end-product, haem, is not being made in sufficient quantity to switch off its own synthesis. Since haem normally represses transcription of ALA synthase (the pathway's committed, rate-limiting enzyme) by negative feedback, giving exogenous hematin (a haem preparation) restores that repression, dialling ALA synthase activity back down and cutting off further production of the very precursors causing the attack.

## answer_b
Hematin directly chelates the accumulated porphyrin precursors, removing them from the circulation

## explanation_b
Incorrect. Hematin does not chelate or remove existing precursors directly; its effect is upstream, on production of new precursors via ALA synthase repression.

## answer_c
Hematin replaces the missing downstream enzyme, allowing the blocked step to proceed

## explanation_c
Incorrect. Hematin is haem itself, the pathway's end product, not a substitute for whichever downstream enzyme is genetically deficient in a given porphyria type.

## answer_d
Hematin has no specific mechanism; it works purely as a general anti-inflammatory agent

## explanation_d
Incorrect. Hematin's therapeutic effect has a specific, well-defined biochemical mechanism (feedback repression of ALA synthase), not a nonspecific anti-inflammatory action.

## topic
Haem biosynthesis

## subtopic

## main_concept
CON-HEM-6BA5D04F841FBA

## concept_ids

## contextual_concept_ids

## difficulty
Moderate

## question_type

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
AU_Y1=0.5

## years
AU_Y1

## universities
au

## module
AU-MED-103

## module_subject
AU-MED-103 > Biochemistry

## question_only_for

## library_ids
ART-HEM-AU102-HEME-BIOSYNTHESIS

## resource_ids

## learning_objective
Explain hematin's mechanism in treating acute porphyria: restoring haem's normal feedback repression of ALA synthase.

## source_citation
MCQs - Blood Agha MCQ, Q49 (Alexandria University, AU-MED-103).

## attached_image

## attachments

## media_recommendations

## estimated_seconds
90

## randomise_answers
yes

## author_notes
pendingLiveTarget: AU-MED-102-biochem-nitrogen-blood-concepts.md (Alexandria, sibling module). Second question reusing this concept (q04 tests ALA synthase's own reaction; this tests the feedback-repression fact that explains hematin's clinical use).

---

# Item

## id
QST-au103-BIOC2AU102-BIOC2AU102-Q06

## title
Converting two molecules of pyruvate all the way to one molecule of glucose by gluconeogenesis costs how many high-energy phosphate bonds, and why more than glycolysis's own net yield?

## question
Converting two molecules of pyruvate all the way to one molecule of glucose by gluconeogenesis costs how many high-energy phosphate bonds, and why more than glycolysis's own net yield?

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
Six high-energy phosphate bonds, because gluconeogenesis must bypass glycolysis's three irreversible steps using extra ATP/GTP-consuming reactions, not simply reverse them for free

## explanation_a
Correct. Glycolysis nets 2 ATP per glucose broken down, but gluconeogenesis is not simply that reaction run in reverse: three of glycolysis's steps (hexokinase, PFK-1, pyruvate kinase) are strongly irreversible and must instead be bypassed by different enzymes that themselves consume high-energy phosphate bonds. Converting two pyruvate to one glucose costs six such bonds in total -- two ATP-equivalents (as GTP) at pyruvate carboxylase/PEPCK per pyruvate (four total for two pyruvate), plus two more ATP at the 3-phosphoglycerate kinase-reversal step -- which is exactly why building glucose back up is energetically far more expensive than breaking it down was.

## answer_b
Two high-energy phosphate bonds, exactly mirroring glycolysis's own net ATP yield in reverse

## explanation_b
Incorrect. If gluconeogenesis cost only as much as glycolysis yielded, the two pathways could run simultaneously without any net energy expenditure, which would be a futile and wasteful cycle; the actual cost (six bonds) is three times glycolysis's net yield, which is what keeps the two pathways reciprocally regulated rather than running together.

## answer_c
Six high-energy phosphate bonds, entirely consumed at the pyruvate carboxylase step alone

## explanation_c
Incorrect. The six-bond cost is distributed across more than one bypass step, not concentrated entirely at pyruvate carboxylase; the 3-phosphoglycerate kinase-reversal step also consumes ATP.

## answer_d
No net energy cost at all, since gluconeogenesis is simply glycolysis run backwards

## explanation_d
Incorrect. Gluconeogenesis is emphatically not glycolysis simply reversed; its irreversible-step bypasses are what make it a genuinely different, and energetically costly, pathway.

## topic
Gluconeogenesis

## subtopic

## main_concept
CON-FND-FA3952AF2C99EA

## concept_ids

## contextual_concept_ids

## difficulty
Moderate

## question_type

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
AU_Y1=0.5

## years
AU_Y1

## universities
au

## module
AU-MED-103

## module_subject
AU-MED-103 > Biochemistry

## question_only_for

## library_ids
ART-FND-GLUCONEOGENESIS-MALATE-SHUTTLE-AND-ATP-COST

## resource_ids

## learning_objective
State that gluconeogenesis costs six high-energy phosphate bonds per glucose made, and explain why this exceeds glycolysis's own net ATP yield.

## source_citation
MCQs - CHO Metabolism MCQs (1), Q20-21 (Alexandria University, AU-MED-103).

## attached_image

## attachments

## media_recommendations

## estimated_seconds
90

## randomise_answers
yes

## author_notes
pendingLiveTarget: AU-MED-102-biochem-metabolism-concepts.md (Alexandria, sibling module). Distinct from the already-tested question on the four bypass enzymes' identity; this tests the actual ATP-equivalent cost.

---

# Item

## id
QST-au103-BIOC2AU102-BIOC2AU102-Q07

## title
Which of the following is genuinely a precursor consumed in haem biosynthesis, and which listed option is NOT?

## question
Which of the following is genuinely a precursor consumed in haem biosynthesis, and which listed option is NOT?

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
Glycine and succinyl-CoA are genuine precursors; alpha-ketoglutarate is not

## explanation_a
Correct. ALA synthase condenses exactly two precursors, glycine (the simplest amino acid) and succinyl-CoA (a citric acid cycle intermediate), to form delta-aminolevulinic acid, the pathway's first committed product. Alpha-ketoglutarate, though it sits immediately upstream of succinyl-CoA in the citric acid cycle, is not itself a haem precursor -- it must first be converted to succinyl-CoA before that carbon skeleton can enter haem synthesis, which is exactly the kind of one-step-removed distractor a precursors-except question is designed to test.

## answer_b
Alanine and succinyl-CoA are genuine precursors; glycine is not

## explanation_b
Incorrect. Glycine, not alanine, is the amino acid ALA synthase actually uses; offering only three distractor amino acids (alanine, cysteine, serine) instead of listing glycine itself is a classic way this fact is tested, and glycine genuinely is required.

## answer_c
Glycine and acetyl-CoA are genuine precursors; succinyl-CoA is not

## explanation_c
Incorrect. Succinyl-CoA, not acetyl-CoA, is ALA synthase's genuine second substrate; acetyl-CoA feeds the citric acid cycle and many other pathways but is not itself condensed with glycine to form ALA.

## answer_d
Glycine and succinyl-CoA are genuine precursors; oxygen is not

## explanation_d
Incorrect. Later steps of haem biosynthesis (specifically the conversion of coproporphyrinogen III to protoporphyrinogen IX, and protoporphyrinogen IX to protoporphyrin IX) do require molecular oxygen, so oxygen is a genuine requirement of the pathway overall, even though it is not one of ALA synthase's own two substrates.

## topic
Haem biosynthesis

## subtopic

## main_concept
CON-HEM-6BA5D04F841FBA

## concept_ids

## contextual_concept_ids

## difficulty
Moderate

## question_type

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
AU_Y1=0.5

## years
AU_Y1

## universities
au

## module
AU-MED-103

## module_subject
AU-MED-103 > Biochemistry

## question_only_for

## library_ids
ART-HEM-AU102-HEME-BIOSYNTHESIS

## resource_ids

## learning_objective
Identify glycine and succinyl-CoA as ALA synthase's two genuine precursors, and recognise alpha-ketoglutarate as a one-step-removed distractor.

## source_citation
MCQs - Blood Agha MCQ, Q11 (Alexandria University, AU-MED-103).

## attached_image

## attachments

## media_recommendations

## estimated_seconds
90

## randomise_answers
yes

## author_notes
pendingLiveTarget: AU-MED-102-biochem-nitrogen-blood-concepts.md (Alexandria, sibling module). Third question reusing this concept (q04 tests the reaction/cofactor, q05 tests hematin feedback, this tests the precursors-except exam format specifically).
