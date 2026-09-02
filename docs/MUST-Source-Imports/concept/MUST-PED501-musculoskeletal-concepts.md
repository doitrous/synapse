<!--
  MUST-PED501 (Pediatrics) — new `msk` concepts from chapter 28
  (Musculoskeletal disorders) of the Lissauer EOM MCQs source
  (src_6b517a8a10e860f24cbe), S2 authoring after TRIAGE APPROVED
  (coverage/MUST-PED501-triage.md). find-existing.mjs run per concept
  (shortest distinctive term first) — no live or pending hit for any of
  these 16 ideas; all genuine new mints. One near-miss noted below
  (osteogenesis imperfecta's biochemical mechanism, ASU-LOCO) — cross-
  linked, not merged, different objective (mechanism vs clinical
  presentation).

  Ids minted with "Instruction Manual for Content Creation/tools/mint-concept-id.mjs"
  (deterministic, unsalted, checked against the full live+pending corpus at
  mint time). Placement: rheum/joint-disease concepts sit under `msk`,
  matching the MUST-MED501 precedent (rheumatoid arthritis, gout, etc. were
  placed under `msk`) rather than `imm`.
-->

# Item

## id
CON-MSK-82522DF09B1D69

## article_ids
ART-MSK-MUST-PED501-BONE-AND-JOINT-INFECTION

## label
Staphylococcus aureus is the most likely causative organism of paediatric osteomyelitis

## canonical_key
osteomyelitis.microbiology.staphylococcus-aureus-commonest

## aliases
Paediatric osteomyelitis organism
Bone infection microbiology

## definition
Osteomyelitis in children is most often caused by Staphylococcus aureus, typically following haematogenous spread from a preceding skin infection (such as an abscess) or occasionally direct inoculation. Other pathogens do occur — group A Streptococcus is a recognised alternative cause, Salmonella and Staphylococcus are both increased in sickle cell anaemia, and Mycobacterium tuberculosis and Haemophilus influenzae are rarer, more insidious or unimmunized-population causes — but S. aureus remains the single most likely organism in a typical presentation.

## explicit_objective
Identify Staphylococcus aureus as the most likely causative organism of paediatric osteomyelitis, distinguishing it from the rarer alternative organisms associated with specific risk factors.

## pitfalls
Defaulting to an exotic or risk-factor-specific organism (Salmonella, TB) without a clue pointing to that risk factor (sickle cell disease, immigration/immunisation history) present in the vignette — in an otherwise unremarkable presentation, Staphylococcus aureus remains the most likely answer.

## concept_type
investigation

## status
Draft

## subject
msk

## topic
Musculoskeletal system

## subtopic
Paediatric bone and joint infection

## universities
must

## learner_years
5

## modules
MUST-PED501

## module_subject
MUST-PED501 > 06 EOM Exams > EOM MCQs - Lissauer mcq final > Ch.28

## exam_weight_by_year
MUST_Y5=0.6

## clinical_relevance
0.7

## academic_relevance
0.6

## confidence
0.85

## support_mode
direct_statement

## exam_signal
src_6b517a8a10e860f24cbe | mcq_bank | | 28.1

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD-Y5.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs "osteomyelitis staphylococcus" — no hit.
keySource: printed "Correct." answer + rationale (Lissauer 28.1).

---

# Item

## id
CON-MSK-9F8A331C276810

## article_ids
ART-MSK-MUST-PED501-GROWTH-PLATE-AND-OVERUSE

## label
Osgood-Schlatter disease is tibial-tuberosity pain in an adolescent athlete, worse after exercise, with local swelling

## canonical_key
osgoodschlatterdisease.presentation.tibial-tuberosity-adolescent-athlete

## aliases
Osgood-Schlatter disease presentation
Tibial tuberosity apophysitis

## definition
Osgood-Schlatter disease is an osteochondritis of the patellar tendon insertion at the tibial tuberosity, typically affecting physically active adolescents (classically footballers or basketball players), presenting with knee pain that worsens after exercise, localised tenderness and swelling over the tibial tuberosity, and often accompanying hamstring tightness. It occurs bilaterally in 25-50% of cases, and the child is otherwise afebrile with no history of trauma.

## explicit_objective
Recognise tibial-tuberosity swelling and exercise-related knee pain in a physically active adolescent as Osgood-Schlatter disease, distinguishing it from osteomyelitis, septic arthritis, Perthes disease and slipped capital femoral epiphysis.

## pitfalls
Confusing Osgood-Schlatter disease's exercise-related, afebrile, localised presentation with septic arthritis or osteomyelitis, both of which typically involve fever and systemic illness. Missing the specific tibial-tuberosity location as the distinguishing clue from other adolescent knee pain causes.

## concept_type
clinical_feature

## status
Draft

## subject
msk

## topic
Musculoskeletal system

## subtopic
Overuse and growth-plate disorders

## universities
must

## learner_years
5

## modules
MUST-PED501

## module_subject
MUST-PED501 > 06 EOM Exams > EOM MCQs - Lissauer mcq final > Ch.28

## exam_weight_by_year
MUST_Y5=0.6

## clinical_relevance
0.7

## academic_relevance
0.6

## confidence
0.85

## support_mode
direct_statement

## exam_signal
src_6b517a8a10e860f24cbe | mcq_bank | | 28.3, 28.13.4

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD-Y5.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs "osgood-schlatter" — no hit.
keySource: printed "Correct." answer + rationale, both 28.3 and 28.13.4 (Lissauer).
dupeNote: same concept tested twice (28.3, 28.13.4) with different vignette wording — collapsed to one record per LANE-CARD-Y5.md's duplicate-collapsing convention.

---

# Item

## id
CON-MSK-E06CA84864AD09

## article_ids
ART-MSK-MUST-PED501-BONE-AND-JOINT-INFECTION

## label
A hot, swollen, single joint with fever and refusal to move it is septic arthritis until excluded

## canonical_key
septicarthritis.presentation.hot-swollen-joint-refusal-to-move

## aliases
Septic arthritis presentation
Single hot swollen joint with fever

## definition
Septic arthritis presents with a single joint that is red, swollen, warm and acutely painful, in a systemically unwell, febrile child who cries with any movement of the joint and refuses to bear weight. It must be actively differentiated from osteomyelitis (bone rather than joint tenderness) and from reactive arthritis/transient synovitis (usually afebrile, less acutely unwell), and confirmed or excluded with joint aspiration and imaging, since delayed treatment risks permanent joint damage.

## explicit_objective
Recognise an acutely red, hot, swollen single joint with fever and refusal to move as septic arthritis, distinguishing it from osteomyelitis and reactive arthritis/transient synovitis.

## pitfalls
Attributing an acutely inflamed single joint with fever to a less urgent cause (transient synovitis, trauma) without excluding septic arthritis first — this is a joint-threatening emergency and aspiration/imaging should not be delayed on the assumption of a benign cause.

## concept_type
clinical_feature

## status
Draft

## subject
msk

## topic
Musculoskeletal system

## subtopic
Paediatric bone and joint infection

## universities
must

## learner_years
5

## modules
MUST-PED501

## module_subject
MUST-PED501 > 06 EOM Exams > EOM MCQs - Lissauer mcq final > Ch.28

## exam_weight_by_year
MUST_Y5=0.6

## clinical_relevance
0.8

## academic_relevance
0.6

## confidence
0.85

## support_mode
direct_statement

## exam_signal
src_6b517a8a10e860f24cbe | mcq_bank | | 28.4, 28.12.1

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD-Y5.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs "septic arthritis children" — no hit.
keySource: printed "Correct." answer + rationale, both 28.4 and 28.12.1 (Lissauer).
dupeNote: same concept tested twice (28.4, 28.12.1) with different vignette wording — collapsed to one record per LANE-CARD-Y5.md's duplicate-collapsing convention.

---

# Item

## id
CON-MSK-7D7B4E472D9523

## article_ids
ART-MSK-MUST-PED501-BONE-AND-JOINT-INFECTION

## label
Systemic-onset juvenile idiopathic arthritis is diagnosed on fever, polyarthritis and a salmon-pink rash with negative ANA/dsDNA/ASOT

## canonical_key
systemiconsetjia.diagnosis.fever-rash-polyarthritis-criteria

## aliases
Still's disease
Systemic JIA diagnosis

## definition
Systemic-onset juvenile idiopathic arthritis presents with a systemic illness, polyarthritis (more than four joints) and a salmon-pink evanescent rash, with lymphadenopathy and splenomegaly, and a raised neutrophil count and markedly raised ESR — but negative ANA, negative double-stranded DNA and a normal antistreptolysin O titre, which help exclude SLE and post-streptococcal arthritis respectively. It is distinguished from acute lymphoblastic leukaemia (which would typically show an abnormal blood film with atypical cells) and Epstein-Barr virus infection (which rarely causes widespread arthritis).

## explicit_objective
Recognise fever, polyarthritis and a salmon-pink rash with negative autoimmune/streptococcal serology as systemic-onset JIA, distinguishing it from SLE, post-streptococcal arthritis, leukaemia and EBV infection.

## pitfalls
Assuming a positive ANA is needed for any inflammatory arthritis diagnosis — systemic JIA is characteristically ANA-negative, and jumping to SLE because of the fever/rash/arthritis triad ignores the negative dsDNA that should exclude it.

## concept_type
classification

## status
Draft

## subject
msk

## topic
Musculoskeletal system

## subtopic
Juvenile idiopathic arthritis

## universities
must

## learner_years
5

## modules
MUST-PED501

## module_subject
MUST-PED501 > 06 EOM Exams > EOM MCQs - Lissauer mcq final > Ch.28

## exam_weight_by_year
MUST_Y5=0.6

## clinical_relevance
0.7

## academic_relevance
0.7

## confidence
0.85

## support_mode
direct_statement

## exam_signal
src_6b517a8a10e860f24cbe | mcq_bank | | 28.5

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD-Y5.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs "systemic juvenile idiopathic arthritis" — no hit.
keySource: printed "Correct." answer + rationale (Lissauer 28.5).

---

# Item

## id
CON-MSK-D278F6E57D9A20

## article_ids
ART-MSK-MUST-PED501-BONE-AND-JOINT-INFECTION

## label
An acute limp with decreased hip external rotation, 1-2 weeks after a viral illness, is reactive arthritis (transient synovitis)

## canonical_key
reactivearthritis.presentation.transient-synovitis-post-viral-limp

## aliases
Transient synovitis of the hip
Irritable hip

## definition
Reactive arthritis, also known as transient synovitis of the hip, is the most common cause of acute hip pain in children aged 2-12 years, typically following or accompanying a viral infection. It presents with sudden-onset hip or knee pain, or a limp, with no pain at rest but decreased range of movement (particularly external rotation), and the child is not systemically unwell — this distinguishes it from septic arthritis, where the child is febrile and systemically unwell with severe pain on any movement and refusal to weight bear.

## explicit_objective
Distinguish reactive arthritis/transient synovitis (afebrile, decreased external rotation, recent viral illness) from septic arthritis (febrile, systemically unwell, severe pain on any movement).

## pitfalls
Assuming any acute limp with hip pain in a child is transient synovitis without excluding septic arthritis — a normal ultrasound and C-reactive protein help exclude the more dangerous diagnosis, and fever or systemic illness should always prompt that exclusion first.

## concept_type
clinical_feature

## status
Draft

## subject
msk

## topic
Musculoskeletal system

## subtopic
Paediatric limp differential diagnosis

## universities
must

## learner_years
5

## modules
MUST-PED501

## module_subject
MUST-PED501 > 06 EOM Exams > EOM MCQs - Lissauer mcq final > Ch.28

## exam_weight_by_year
MUST_Y5=0.6

## clinical_relevance
0.7

## academic_relevance
0.6

## confidence
0.85

## support_mode
direct_statement

## exam_signal
src_6b517a8a10e860f24cbe | mcq_bank | | 28.7, 28.12.3

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD-Y5.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs "reactive arthritis transient synovitis" — no hit.
keySource: printed "Correct." answer + rationale, both 28.7 and 28.12.3 (Lissauer).
dupeNote: same concept tested twice (28.7, 28.12.3) with different vignette wording (post-viral vs post-gastroenteritis trigger) — collapsed to one record per LANE-CARD-Y5.md's duplicate-collapsing convention.

---

# Item

## id
CON-MSK-0B9268E913D9B8

## article_ids
ART-MSK-MUST-PED501-CONGENITAL-AND-DEVELOPMENTAL

## label
Positional talipes equinovarus is a normal-sized foot that can be passively corrected to the neutral position, unlike fixed talipes deformities

## canonical_key
positionaltalipes.diagnosis.passively-correctable-to-neutral

## aliases
Positional talipes
Neonatal foot deformity assessment

## definition
Positional talipes equinovarus is a common newborn foot deformity caused by intrauterine compression: the foot is of normal size, the deformity is mild, and it can be corrected to the neutral position with passive manipulation. This distinguishes it from fixed bony deformities such as talipes equinovarus (inverted, supinated, cannot be passively corrected) and talipes calcaneovalgus (everted, dorsiflexed, also fixed) — the key diagnostic test is whether the foot can be passively brought to neutral.

## explicit_objective
Distinguish positional talipes equinovarus (passively correctable, normal-sized foot) from fixed talipes deformities that cannot be passively corrected.

## pitfalls
Diagnosing any newborn foot deformity as "talipes equinovarus" without testing passive correctability — the ability to bring the foot to a neutral position is what separates the benign positional variant from a fixed structural deformity needing orthopaedic referral.

## concept_type
clinical_feature

## status
Draft

## subject
msk

## topic
Musculoskeletal system

## subtopic
Congenital foot deformity

## universities
must

## learner_years
5

## modules
MUST-PED501

## module_subject
MUST-PED501 > 06 EOM Exams > EOM MCQs - Lissauer mcq final > Ch.28

## exam_weight_by_year
MUST_Y5=0.5

## clinical_relevance
0.6

## academic_relevance
0.6

## confidence
0.85

## support_mode
direct_statement

## exam_signal
src_6b517a8a10e860f24cbe | mcq_bank | | 28.8

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD-Y5.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs "positional talipes equinovarus" — no hit.
keySource: printed "Correct." answer + rationale (Lissauer 28.8).

---

# Item

## id
CON-MSK-8F4F7C8E6969CC

## article_ids
ART-MSK-MUST-PED501-CONGENITAL-AND-DEVELOPMENTAL

## label
Recurrent unexplained fractures with blue sclera and a similarly-affected sibling suggest osteogenesis imperfecta

## canonical_key
osteogenesisimperfecta.presentation.recurrent-fracture-blue-sclera

## aliases
Osteogenesis imperfecta clinical presentation
Brittle bone disease diagnosis

## definition
Osteogenesis imperfecta presents clinically with recurrent fractures from minimal or no trauma, X-rays showing osteoporotic-looking bone, and a subtle blue tinge to the sclera that can be difficult to identify with confidence. Because it is typically autosomal dominant, an affected sibling with a similar unexplained-fracture history is a supporting clue, though child-protection concerns for non-accidental injury must be addressed in parallel with investigating for osteogenesis imperfecta and other medical explanations, not dismissed once a plausible medical cause is suspected.

## explicit_objective
Recognise recurrent unexplained fractures, blue sclera and a similarly affected sibling as osteogenesis imperfecta, while still addressing non-accidental injury concerns in parallel.

## pitfalls
Treating osteogenesis imperfecta and non-accidental injury as mutually exclusive — the presence of a plausible medical explanation (blue sclera, affected sibling, osteoporotic bone on X-ray) does not eliminate the need to address child-protection concerns alongside the medical work-up.

## concept_type
clinical_feature

## status
Draft

## subject
msk

## topic
Musculoskeletal system

## subtopic
Bone fragility disorders

## universities
must

## learner_years
5

## modules
MUST-PED501

## module_subject
MUST-PED501 > 06 EOM Exams > EOM MCQs - Lissauer mcq final > Ch.28

## exam_weight_by_year
MUST_Y5=0.6

## clinical_relevance
0.7

## academic_relevance
0.6

## confidence
0.8

## support_mode
direct_statement

## exam_signal
src_6b517a8a10e860f24cbe | mcq_bank | | 28.9

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD-Y5.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs "osteogenesis imperfecta" — 1 pending near-miss: docs/Ain-Shams-Source-Imports/concept/ASU-LOCO-msk-new-concepts.md, CON-FND-D74FE513D2971F, teaches the collagen glycine-substitution mutation mechanism, not this clinical presentation (recurrent fracture/blue sclera/family history) — different objective per the tiebreaker rule (00-START-HERE.md §4), not merged.
keySource: printed "Correct." answer + rationale (Lissauer 28.9).
relatedConceptIds: CON-FND-D74FE513D2971F (ASU-LOCO, biochemical mutation mechanism) teaches the same disease's molecular basis — cross-linked, not merged.

---

# Item

## id
CON-MSK-C418298986A33D

## article_ids
ART-MSK-MUST-PED501-LIMP-AND-PAIN-DIFFERENTIALS

## label
An unexplained femur fracture in a pre-mobile infant, with no consistent trauma history, is a non-accidental injury red flag

## canonical_key
nonaccidentalinjury.redflag.unexplained-femur-fracture-immobile-infant

## aliases
Non-accidental injury red flag
Unexplained fracture in an infant

## definition
A femur fracture in an infant who is not yet independently mobile, with no history of trauma the parents can give and no discoloration or warmth suggesting infection, raises non-accidental injury as the leading concern — the absence of a plausible mechanical explanation (rather than the fracture itself) is what makes this a red flag. Osteomyelitis and septic arthritis are differentials but would usually be accompanied by fever, warmth and redness over the affected area, which are absent here.

## explicit_objective
Recognise an unexplained femur fracture in a pre-mobile infant, without signs of infection, as a non-accidental injury red flag rather than defaulting to osteomyelitis or septic arthritis.

## pitfalls
Reflexively attributing any femur fracture in a young child to osteomyelitis or septic arthritis without checking for the fever, warmth and redness those diagnoses require — a fracture with no infective signs and no plausible trauma history in a pre-mobile infant is the specific pattern that should raise non-accidental injury.

## concept_type
clinical_feature

## status
Draft

## subject
msk

## topic
Musculoskeletal system

## subtopic
Non-accidental injury

## universities
must

## learner_years
5

## modules
MUST-PED501

## module_subject
MUST-PED501 > 06 EOM Exams > EOM MCQs - Lissauer mcq final > Ch.28

## exam_weight_by_year
MUST_Y5=0.6

## clinical_relevance
0.8

## academic_relevance
0.6

## confidence
0.8

## support_mode
direct_statement

## exam_signal
src_6b517a8a10e860f24cbe | mcq_bank | | 28.12.2

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD-Y5.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs "non-accidental injury fracture" — no hit.
keySource: printed EMQ answer + rationale (Lissauer 28.12.2).

---

# Item

## id
CON-MSK-7A5C22E0AD1EA5

## article_ids
ART-MSK-MUST-PED501-LIMP-AND-PAIN-DIFFERENTIALS

## label
Growing pains present as bilateral, nocturnal leg pain in a well child with an entirely normal examination

## canonical_key
growingpains.presentation.nocturnal-bilateral-normal-exam

## aliases
Growing pains diagnosis
Benign nocturnal leg pain in children

## definition
Growing pains is a poorly understood but benign condition of preschool- and school-age children, presenting as episodes of generalised, symmetrical pain in the lower limbs that often wake the child from sleep, are not present at the start of the day, and do not limit daytime physical activity. The physical examination is entirely normal, distinguishing it from pathological causes of limb pain (malignancy, infection, hypermobility syndromes) which would typically show an abnormal finding on examination.

## explicit_objective
Recognise bilateral, nocturnal leg pain with a normal daytime examination as growing pains, a diagnosis of exclusion made on a reassuringly normal picture rather than a specific positive test.

## pitfalls
Over-investigating a classic growing-pains presentation (bilateral, nocturnal, normal exam, no daytime limitation) as though it were a red-flag pain syndrome — the entirely normal examination and benign pattern are themselves diagnostic, not a gap requiring further work-up by default.

## concept_type
clinical_feature

## status
Draft

## subject
msk

## topic
Musculoskeletal system

## subtopic
Paediatric limp and limb pain

## universities
must

## learner_years
5

## modules
MUST-PED501

## module_subject
MUST-PED501 > 06 EOM Exams > EOM MCQs - Lissauer mcq final > Ch.28

## exam_weight_by_year
MUST_Y5=0.5

## clinical_relevance
0.6

## academic_relevance
0.5

## confidence
0.8

## support_mode
direct_statement

## exam_signal
src_6b517a8a10e860f24cbe | mcq_bank | | 28.13.1

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD-Y5.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs "growing pains" — no hit.
keySource: printed EMQ answer + rationale (Lissauer 28.13.1).

---

# Item

## id
CON-MSK-BB11D3925C69D2

## article_ids
ART-MSK-MUST-PED501-LIMP-AND-PAIN-DIFFERENTIALS

## label
Severe pain, allodynia and a cold limb after minor trauma suggests complex regional pain syndrome

## canonical_key
complexregionalpainsyndrome.presentation.post-minor-trauma-allodynia

## aliases
Complex regional pain syndrome in children
Post-traumatic allodynia

## definition
Complex regional pain syndrome often presents in a single foot or ankle after relatively minor trauma, with severe pain disproportionate to the injury, hyperaesthesia (increased sensitivity to stimuli) and allodynia (pain from a stimulus that would not normally cause pain), and the affected part may be cool to touch with swelling and mottling. This distinguishes it from a simple fracture (which would show on X-ray) or infection (which would typically show warmth and systemic signs rather than coolness).

## explicit_objective
Recognise disproportionate pain, allodynia and a cool, mottled limb after minor trauma as complex regional pain syndrome.

## pitfalls
Attributing severe, disproportionate pain after minor trauma to an occult fracture or infection without noting the specific allodynia and cool/mottled limb pattern that points to complex regional pain syndrome instead.

## concept_type
clinical_feature

## status
Draft

## subject
msk

## topic
Musculoskeletal system

## subtopic
Paediatric limp and limb pain

## universities
must

## learner_years
5

## modules
MUST-PED501

## module_subject
MUST-PED501 > 06 EOM Exams > EOM MCQs - Lissauer mcq final > Ch.28

## exam_weight_by_year
MUST_Y5=0.5

## clinical_relevance
0.6

## academic_relevance
0.5

## confidence
0.8

## support_mode
direct_statement

## exam_signal
src_6b517a8a10e860f24cbe | mcq_bank | | 28.13.2

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD-Y5.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs "complex regional pain syndrome" — no hit.
keySource: printed EMQ answer + rationale (Lissauer 28.13.2).

---

# Item

## id
CON-MSK-991CA5F641CF66

## article_ids
ART-MSK-MUST-PED501-LIMP-AND-PAIN-DIFFERENTIALS

## label
Anterior knee pain worse on stairs or standing from sitting, in an adolescent female, suggests chondromalacia patellae

## canonical_key
chondromalaciapatellae.presentation.anterior-knee-pain-adolescent-female

## aliases
Chondromalacia patellae presentation
Patellofemoral pain in adolescents

## definition
Chondromalacia patellae is softening of the articular cartilage of the patella, most often affecting adolescent females, causing pain when the patella is tightly apposed to the femoral condyles — such as standing up from sitting or walking up stairs — and is often associated with hypermobility and flat feet, suggesting a biomechanical component. It is a diagnosis based on this characteristic pain pattern and demographic rather than a specific investigation finding.

## explicit_objective
Recognise anterior knee pain worse on stairs or rising from sitting, in an adolescent female, as chondromalacia patellae.

## pitfalls
Confusing chondromalacia patellae's activity-related, patellofemoral pain pattern with Osgood-Schlatter disease's tibial-tuberosity-specific swelling and tenderness — both affect physically active adolescents but the pain location and demographic differ.

## concept_type
clinical_feature

## status
Draft

## subject
msk

## topic
Musculoskeletal system

## subtopic
Paediatric limp and limb pain

## universities
must

## learner_years
5

## modules
MUST-PED501

## module_subject
MUST-PED501 > 06 EOM Exams > EOM MCQs - Lissauer mcq final > Ch.28

## exam_weight_by_year
MUST_Y5=0.5

## clinical_relevance
0.6

## academic_relevance
0.5

## confidence
0.8

## support_mode
direct_statement

## exam_signal
src_6b517a8a10e860f24cbe | mcq_bank | | 28.13.3

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD-Y5.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs "chondromalacia patellae" — no hit.
keySource: printed EMQ answer + rationale (Lissauer 28.13.3).

---

# Item

## id
CON-MSK-4B072F692CE4E2

## article_ids
ART-MSK-MUST-PED501-GROWTH-PLATE-AND-OVERUSE

## label
Nocturnal back pain in a young child is a red flag for osteoid osteoma or another tumour, not benign back pain

## canonical_key
osteoidosteoma.presentation.night-back-pain-red-flag

## aliases
Osteoid osteoma presentation
Red-flag back pain in children

## definition
Back pain that wakes a young child from sleep is a red-flag symptom that must be taken seriously, since back pain in young children is uncommon and other red flags (young age, night waking, fever, weight loss, focal neurological signs) should prompt investigation for a tumour such as osteoid osteoma, a benign lesion that classically presents with pain worse at night. This must be distinguished from osteomyelitis of the spine, which would present with pain but usually alongside fever, systemic upset and tenderness over the affected area.

## explicit_objective
Recognise nocturnal back pain in a young child as a red-flag symptom warranting investigation for a tumour such as osteoid osteoma, rather than dismissing it as benign.

## pitfalls
Treating any back pain in a young child as musculoskeletal strain without weighing the red-flag features (young age, night waking, systemic symptoms) that should prompt imaging for a structural or neoplastic cause.

## concept_type
clinical_feature

## status
Draft

## subject
msk

## topic
Musculoskeletal system

## subtopic
Overuse and growth-plate disorders

## universities
must

## learner_years
5

## modules
MUST-PED501

## module_subject
MUST-PED501 > 06 EOM Exams > EOM MCQs - Lissauer mcq final > Ch.28

## exam_weight_by_year
MUST_Y5=0.5

## clinical_relevance
0.7

## academic_relevance
0.5

## confidence
0.75

## support_mode
direct_statement

## exam_signal
src_6b517a8a10e860f24cbe | mcq_bank | | 28.13.5

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD-Y5.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs "osteoid osteoma" and "red flag back pain children" — no hit.
keySource: printed EMQ answer + rationale (Lissauer 28.13.5).

---

# Item

## id
CON-MSK-68328A47A7A64A

## article_ids
ART-MSK-MUST-PED501-CONGENITAL-AND-DEVELOPMENTAL

## label
A painless limp with asymmetric thigh skin folds in a breech-born infant suggests late-presenting developmental dysplasia of the hip

## canonical_key
developmentaldysplasiaofhip.presentation.late-diagnosis-painless-limp

## aliases
DDH late presentation
Painless limp in a toddler

## definition
Developmental dysplasia of the hip is usually identified on one of the routine hip screening checks in early infancy, but is occasionally missed since examination is not 100% sensitive; a late presentation is with a painless limp once the child begins walking, together with asymmetry of the skin folds around the affected thigh and a hip that cannot be fully abducted. Breech presentation is a recognised risk factor that increases the pre-test likelihood of DDH.

## explicit_objective
Recognise a painless limp with asymmetric thigh skin folds and reduced hip abduction, in a child with a breech-birth history, as late-presenting developmental dysplasia of the hip.

## pitfalls
Assuming a normal newborn hip check permanently excludes developmental dysplasia of the hip — screening is not 100% sensitive, and a later painless limp with the classic examination findings should still prompt consideration of DDH, especially with a breech-birth risk factor.

## concept_type
clinical_feature

## status
Draft

## subject
msk

## topic
Musculoskeletal system

## subtopic
Developmental hip disorders

## universities
must

## learner_years
5

## modules
MUST-PED501

## module_subject
MUST-PED501 > 06 EOM Exams > EOM MCQs - Lissauer mcq final > Ch.28

## exam_weight_by_year
MUST_Y5=0.6

## clinical_relevance
0.7

## academic_relevance
0.6

## confidence
0.8

## support_mode
direct_statement

## exam_signal
src_6b517a8a10e860f24cbe | mcq_bank | | 28.14.1

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD-Y5.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs "developmental dysplasia of the hip" — no hit.
keySource: printed EMQ answer + rationale (Lissauer 28.14.1).

---

# Item

## id
CON-MSK-6E5383E930EDFF

## article_ids
ART-MSK-MUST-PED501-CONGENITAL-AND-DEVELOPMENTAL

## label
Widely-spaced knees with swollen wrists in a young child suggests rickets rather than normal-variant bow legs

## canonical_key
rickets.presentation.bow-legs-swollen-wrists

## aliases
Rickets presentation
Bow legs with swollen wrist joints

## definition
Bow legs (genu varum) are a common normal variant up to around 3 years of age, but the additional finding of swollen wrist joints changes the picture toward rickets — vitamin D deficiency causing defective bone mineralisation at the growth plates, which widens and softens the wrists as well as the legs. A child with this combination needs blood tests to confirm the diagnosis and should be started on vitamin D supplementation with dietary advice.

## explicit_objective
Distinguish rickets (bow legs plus swollen wrists) from simple normal-variant bow legs in a young child, and identify the need for vitamin D confirmation and treatment.

## pitfalls
Reassuring a family that bow legs are a normal variant without checking for the additional wrist-swelling clue that should prompt investigation for rickets instead.

## concept_type
clinical_feature

## status
Draft

## subject
msk

## topic
Musculoskeletal system

## subtopic
Congenital and developmental limb variants

## universities
must

## learner_years
5

## modules
MUST-PED501

## module_subject
MUST-PED501 > 06 EOM Exams > EOM MCQs - Lissauer mcq final > Ch.28

## exam_weight_by_year
MUST_Y5=0.5

## clinical_relevance
0.6

## academic_relevance
0.5

## confidence
0.8

## support_mode
direct_statement

## exam_signal
src_6b517a8a10e860f24cbe | mcq_bank | | 28.14.2

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD-Y5.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs "rickets bow legs" — no hit.
keySource: printed EMQ answer + rationale (Lissauer 28.14.2).

---

# Item

## id
CON-MSK-5FF6001568DC6A

## article_ids
ART-MSK-MUST-PED501-CONGENITAL-AND-DEVELOPMENTAL

## label
Flat feet in a toddler, with a visible arch on tiptoe or big-toe extension, is a normal developmental variant

## canonical_key
flatfeet.normalvariant.toddler-arch-on-tiptoe

## aliases
Flexible flat feet in toddlers
Normal variant flat feet

## definition
Flat feet are a normal variant of childhood in toddlers, caused by flatness of the medial longitudinal arch combined with a fat pad that disappears with age; an arch can usually be demonstrated on standing on tiptoe or by passively extending the big toe, confirming the foot is flexible rather than fixed. A fixed, often painful flat foot, unable to demonstrate an arch this way, is a different problem and may indicate a congenital tarsal coalition needing orthopaedic referral.

## explicit_objective
Recognise flat feet with a demonstrable arch on tiptoe/big-toe extension as a normal toddler variant, distinguishing it from a fixed flat foot needing further investigation.

## pitfalls
Referring every case of toddler flat feet for orthopaedic assessment without first testing whether an arch appears on tiptoe or big-toe extension — a demonstrable arch confirms the benign, flexible, normal-variant pattern.

## concept_type
clinical_feature

## status
Draft

## subject
msk

## topic
Musculoskeletal system

## subtopic
Congenital and developmental limb variants

## universities
must

## learner_years
5

## modules
MUST-PED501

## module_subject
MUST-PED501 > 06 EOM Exams > EOM MCQs - Lissauer mcq final > Ch.28

## exam_weight_by_year
MUST_Y5=0.4

## clinical_relevance
0.5

## academic_relevance
0.4

## confidence
0.8

## support_mode
direct_statement

## exam_signal
src_6b517a8a10e860f24cbe | mcq_bank | | 28.14.3

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD-Y5.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs "flat feet toddler normal variant" — no hit.
keySource: printed EMQ answer + rationale (Lissauer 28.14.3).

---

# Item

## id
CON-MSK-6A81D49AE2535B

## article_ids
ART-MSK-MUST-PED501-CONGENITAL-AND-DEVELOPMENTAL

## label
Persistent idiopathic toe-walking, when the child can walk normally and heel-walk on request, with normal tone, is a normal developmental variant

## canonical_key
toewalking.normalvariant.idiopathic-heel-walk-on-request

## aliases
Idiopathic toe-walking
Habitual toe-walking in toddlers

## definition
Toe-walking is common in young children and can become a persistent habit; it is a normal variant when the child can walk normally on request (including on their heels) and general examination of tone and reflexes is normal. This distinguishes idiopathic toe-walking from a pathological cause such as mild cerebral palsy, which would show increased tone on examination, or Duchenne muscular dystrophy in older boys, which should be excluded when the pattern persists.

## explicit_objective
Distinguish idiopathic toe-walking (normal tone/reflexes, able to heel-walk on request) from a pathological cause such as cerebral palsy or, in older boys, Duchenne muscular dystrophy.

## pitfalls
Assuming persistent toe-walking is always benign without checking tone, reflexes and the ability to heel-walk on request — a normal examination is what confirms the idiopathic, normal-variant diagnosis rather than the toe-walking pattern alone.

## concept_type
clinical_feature

## status
Draft

## subject
msk

## topic
Musculoskeletal system

## subtopic
Congenital and developmental limb variants

## universities
must

## learner_years
5

## modules
MUST-PED501

## module_subject
MUST-PED501 > 06 EOM Exams > EOM MCQs - Lissauer mcq final > Ch.28

## exam_weight_by_year
MUST_Y5=0.4

## clinical_relevance
0.5

## academic_relevance
0.4

## confidence
0.8

## support_mode
direct_statement

## exam_signal
src_6b517a8a10e860f24cbe | mcq_bank | | 28.14.4

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD-Y5.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs "toe walking children" — no hit.
keySource: printed EMQ answer + rationale (Lissauer 28.14.4).
