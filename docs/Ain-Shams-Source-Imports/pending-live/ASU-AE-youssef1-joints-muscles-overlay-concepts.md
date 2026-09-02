<!--
  ASU-AE · "youssef1" joints/muscles classification MCQ block (src_043fae682fac40076fd6,
  "MCQs - Bg Mcq dr.youssef.pdf", pp.12-17) — pending-live sparse CONCEPT overlay.

  Every ## id below targets a concept that exists ONLY in an unimported batch from
  another lane (Kasr) — none is in server/data/medical-library-v1.json yet.
  find-existing.mjs found this block's joint- and muscle-classification facts
  overwhelmingly already minted as generic (university-blind) concepts in Kasr's
  101-ISK-mcq-concepts.md — a single Kasr concept commonly covers several of this
  block's individual MCQs, since the Kasr record states the whole classification
  (e.g. every upper-limb joint's shape, or every pennate-muscle class) and each ASU
  MCQ only tests one named example drawn from it. Only two facts in the whole block
  (52 keyed items) came back with zero hits on all four find-existing.mjs queries —
  those are minted fresh in the sibling ASU-AE-youssef1-joints-muscles-new-concepts.md
  file instead of overlaid here.

  Apply this file ONLY after the named source file is live:
    A. docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md — university `kau`,
       module `101 ISK` (Anatomy, Basis of Anatomy / Upper Limb).

  Per LANE-BRIEF §6 rule 1/2 and the concepts manual: `## module_subject` fully
  replaces on every write (no `+` form) — every row restates the source's existing
  line plus ASU's own. `## universities`, `## learner_years` and `## modules` are
  true ID-list columns and take `+asu` / `+1` / `+ASU-AE`. `## exam_signal` is a
  full-replace multi-line field (parsed by parseExamAppearances, not the `+` list
  directive) — omitted here rather than risking silently dropping the source's own
  existing appearance rows; the ASU source and page are recorded in `field_notes`
  instead, per the manual. Note: CON-MSK-8863ACD7E8D790 already carries one ASU
  overlay row from a separate cluster (ASU-AE-youssef-terminology-overlay-concepts.md,
  the epiphyseal-plate fact from youssef2) — this file adds this block's own,
  different facts about the same concept in a second, additive row; the two files'
  `+asu`/`+1`/`+ASU-AE` directives are idempotent list-appends, not conflicting.

  Simulate together with the source file this block targets:
  node scripts/content/gate.mjs simulate \
    docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md \
    docs/Ain-Shams-Source-Imports/pending-live/ASU-AE-youssef1-joints-muscles-overlay-concepts.md \
    docs/Ain-Shams-Source-Imports/concept/ASU-AE-youssef1-joints-muscles-new-concepts.md \
    docs/Ain-Shams-Source-Imports/article/ASU-AE-youssef1-joints-muscles-new-articles.md \
    docs/Ain-Shams-Source-Imports/question/ASU-AE-youssef1-joints-muscles-mcq.md
-->

# Item

## id
CON-MSK-1E40050F141F4C

## label
A synovial joint is seven named components around a potential cavity

## universities
+asu

## learner_years
+1

## modules
+ASU-AE

## module_subject
101 ISK > Anatomy > Basis of Anatomy > Articular system
ASU-AE > Anatomy > Questions > MCQ

## field_notes
asu: Tested twice in the ASU-AE youssef1 joints/muscles MCQ block (target A) — (1) which named joint type among suture/syndesmosis/hinge/gomphosis/primary-cartilaginous is the most moveable (answer: hinge, a synovial joint, since this concept's own definition states synovial joints are "freely mobile" while fibrous and cartilaginous joints are fixed or limited), and (2) a synovial-joint-characteristics EXCEPT row where the false statement is that the articular surfaces are covered by synovial membrane (this concept's own definition instead states the articular surfaces are covered by hyaline articular cartilage, and that the synovial membrane covers everything inside the joint except those surfaces). youssef1 "MCQs - Bg Mcq dr.youssef.pdf" p.12 Q6 and p.16 Q41, hand-marked answers in the original scan, rendered and read by eye (no usable text layer on this file).

---

# Item

## id
CON-MSK-17E2267FB4758F

## label
A fibrous joint is an immobile union by fibrous tissue, in three named types

## universities
+asu

## learner_years
+1

## modules
+ASU-AE

## module_subject
101 ISK > Anatomy > Basis of Anatomy > Articular system
ASU-AE > Anatomy > Questions > MCQ

## field_notes
asu: Tested five times in the ASU-AE youssef1 joints/muscles MCQ block (target A) — the inferior tibiofibular joint named generically as "Fibrous" in one matching set and specifically as "Syndesmosis" in a second, separate matching set on a later page (both correct, different granularity of the same fact); the joints of the skull vault (skull cap) as sutures, tested twice (once as a single-best-answer stem, once again in a matching set); gomphosis named as the joint type in a matching set; and an INCORRECT-statement row whose false option claims syndesmosis is a type of primary cartilaginous joint (this concept's own definition instead places syndesmosis among the three fibrous-joint types, alongside gomphosis and suture). youssef1 p.12 Q6 [common with the synovial-joint overlay above], p.13 Q16, p.13 Q10 (match), p.14 Q22 (match), p.16 Q43, p.16 Q50/Q51 (match), hand-marked answers in the original scan, rendered and read by eye.

---

# Item

## id
CON-MSK-8863ACD7E8D790

## label
Primary cartilaginous joints are hyaline and temporary; secondary ones are fibrocartilaginous and midline

## universities
+asu

## learner_years
+1

## modules
+ASU-AE

## module_subject
101 ISK > Anatomy > Basis of Anatomy > Articular system
ASU-AE > Anatomy > Questions > MCQ

## field_notes
asu: Tested eight times in the ASU-AE youssef1 joints/muscles MCQ block (target A), a much larger set of angles than the one existing ASU overlay row on this concept (from the separate youssef-terminology cluster's epiphyseal-plate fact) — symphysis pubis named directly as an example of a secondary cartilaginous joint (asked twice, once as a single-best-answer stem and once as "Symphysis pubis is:"); the intervertebral disc joint named as secondary cartilaginous in a matching set; the fact that a secondary cartilaginous joint unites bones by white fibrocartilage; the epiphyseal plate named as primary cartilaginous in a second, separate matching set from the one this concept's existing overlay row already covers; the fact that primary cartilaginous joints are usually temporary; the fact that they usually ossify with age; and the generalisation that joints lying in the median plane of the body (such as the symphysis pubis and intervertebral discs) are usually secondary cartilaginous. youssef1 p.12 Q(page top, cut by the scan's fold — numbered 3 by position, before the visible Q4), p.13 Q11 (match), p.13 Q15, p.14 Q25 (match), p.14 Q19, p.15 Q33, p.15 Q39, p.16 Q44, hand-marked answers in the original scan, rendered and read by eye.

---

# Item

## id
CON-MSK-4D7492BC85C03D

## label
Each joint of the upper limb is classified by the shape of its articular surfaces, and no two neighbouring joints share a type

## universities
+asu

## learner_years
+1

## modules
+ASU-AE

## module_subject
101 ISK > Anatomy > Upper Limb > Joints of Upper Limb
ASU-AE > Anatomy > Questions > MCQ

## field_notes
asu: Tested nine times in the ASU-AE youssef1 joints/muscles MCQ block (target A), each row naming one of the joint-type examples already stated in this concept's own definition — the interphalangeal joints as hinge (asked three ways: joint type directly, "which joint is hinge synovial", and in a matching set); the superior radioulnar joint as pivot; the acromioclavicular joint as plane; the wrist as ellipsoid (asked twice, once directly and once in a later matching set); the carpometacarpal joint of the thumb as saddle (asked twice, once directly and once in a later matching set); the elbow as hinge (asked twice in two separate matching sets); and the shoulder as ball-and-socket in a matching set. youssef1 p.12 Q4, p.13 Q12/Q13/Q14 (match), p.14 Q18/Q20/Q23/Q24 (match), p.16 Q45/Q46/Q48/Q49 (match), hand-marked answers in the original scan, rendered and read by eye.

---

# Item

## id
CON-MSK-B88F413E4536F9

## label
The movements possible at an upper limb joint follow from its type and the number of its axes

## universities
+asu

## learner_years
+1

## modules
+ASU-AE

## module_subject
101 ISK > Anatomy > Upper Limb > Joints of Upper Limb
ASU-AE > Anatomy > Questions > MCQ

## field_notes
asu: Tested once in the ASU-AE youssef1 joints/muscles MCQ block (target A) — the interphalangeal joints named as uniaxial, matching this concept's own statement that a hinge joint (its worked example is the interphalangeal joints) is uniaxial and permits flexion/extension only. youssef1 p.16 Q42, hand-marked answer in the original scan, rendered and read by eye.

---

# Item

## id
CON-MSK-888467E7C45479

## label
Skeletal muscles are classified by the direction of their fibres, from strap-like to multipennate

## universities
+asu

## learner_years
+1

## modules
+ASU-AE

## module_subject
101 ISK > Anatomy > Upper Limb > Shoulder Region
ASU-AE > Anatomy > Questions > MCQ

## field_notes
asu: Tested eleven times in the ASU-AE youssef1 joints/muscles MCQ block (target A) — deltoid as multipennate (asked three times: directly, and in two separate later matching sets); flexor pollicis longus as unipennate (asked three times: directly, and in two separate later matching sets); sartorius as an example of a parallel/strap muscle (asked twice: directly, and in a matching set as "parallel fibers"); rectus femoris as bipennate, matching this concept's own worked example, in a matching set; and two facets this concept's definition does not name outright but which the same fibre-direction classification scheme covers — trapezius as an example of a muscle with spiralized fibres (asked twice: directly, and in a later matching set), tibialis anterior as an example of a circumpennate muscle (in a matching set), and sternocleidomastoid as an example of a cruciate muscle (in a matching set); this last trio (spiral, circumpennate, cruciate) extends the concept's own definition text, which names only parallel/strap, unipennate, bipennate and multipennate explicitly. youssef1 p.13 Q8, p.14 Q17, p.15 Q32/Q34/Q36/Q37/Q38 (match), p.16 Q40, p.17 Q54/Q56/Q58/Q59/Q60 (match), hand-marked answers in the original scan, rendered and read by eye.

---

# Item

## id
CON-MSK-F598AF39FBE297

## label
A purposeful movement needs four kinds of muscle, and each is named for what it does to the movement rather than for where it lies

## universities
+asu

## learner_years
+1

## modules
+ASU-AE

## module_subject
101 ISK > Anatomy > Basis of Anatomy > Muscular system
ASU-AE > Anatomy > Questions > MCQ

## field_notes
asu: Tested as a full matching set of all four roles in the ASU-AE youssef1 joints/muscles MCQ block (target A) — the muscle producing the opposite action named as antagonist, the muscle preventing movement of another joint named as fixator, the muscle initiating a particular movement named as agonist (prime mover), and the muscle aiding another in the same movement named as synergist — matching this concept's own four-role definition exactly. youssef1 p.15 Q28-31 (match), hand-marked answers in the original scan, rendered and read by eye.

---

# Item

## id
CON-MSK-4018ED42ADDDB4

## label
A muscle attaches either directly to bone or through a tendon or an aponeurosis

## universities
+asu

## learner_years
+1

## modules
+ASU-AE

## module_subject
101 ISK > Anatomy > Basis of Anatomy > Muscular system
ASU-AE > Anatomy > Questions > MCQ

## field_notes
asu: Tested four times in the ASU-AE youssef1 joints/muscles MCQ block (target A) — the tendon's function stated as linking a muscle to a bone; a muscle-attachment-types EXCEPT row where the false option is "ligament" (a ligament connects bone to bone, not a muscle attachment, matching this concept's own three named attachment types of direct/tendon/aponeurosis); and two INCORRECT-statement rows both built on this concept's own stated convention that "the origin conventionally the more fixed end" — one row's false option claims the most moveable part of a muscle is its origin, the other's claims the origin is the most moveable end, both testing the same reversed-convention error from opposite phrasing. youssef1 p.13 Q7, p.15 Q27, p.17 Q52/Q53, hand-marked answers in the original scan, rendered and read by eye.

---
