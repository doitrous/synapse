<!--
  Sparse updates only. Every ## id below targets a concept that exists ONLY in
  docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md (an unimported Kasr Year 1
  batch) -- none of these 23 ids are in server/data/medical-library-v1.json yet.
  Apply this file ONLY after 101-ISK-mcq-concepts.md is live (see pending-live/INDEX.md).

  Per LANE-BRIEF Sec16 rule 1/2 and Sec18 correction 2: sparse update = ## id +
  ## label + ## canonical_key (both discriminators, retyped exactly from
  101-ISK-mcq-concepts.md) + only the fields being changed. `+` additions are one
  university/module per line. No other field is restated from the target record.
  Concepts have no `university_notes` column (that is an article field) -- the
  Alexandria-specific note for each record below is folded into `field_notes` instead.
  No `module_subject` here: a leading `+` on a non-id-list column is an error under
  the current validator, and this field has no additive semantics in the real
  importer (parseModuleSubjectPaths does not strip a leading `+`), so it is left
  off sparse updates entirely rather than risking a silent full-field replacement.

  UPDATE (validator moved under this lane, commit d82dd36, merged): an update row
  with `## id` but no `## label` is now a hard error ("label is required"), not a
  silent skip of the stub-create check -- `## label` was added back to every row
  below, retyped exactly from 101-ISK-mcq-concepts.md, alongside the
  `## canonical_key` that was already there.

  Lane W1-102-ANAT. Correct gate sequence, per the chief of staff's rule change
  (main, brief Sec19): `medical:batch` WITHOUT --with must fail every row with
  "is not a concept that exists" (nothing here is live or authored in this folder);
  the SAME command WITH --with must resolve clean, because the target ids are
  fully authored in 101-ISK-mcq-concepts.md:
    npm run medical:batch -- "docs/Alexandria-Source-Imports/pending-live/AU-MED-102-anatomy.md"
    npm run medical:batch -- "docs/Alexandria-Source-Imports/pending-live/AU-MED-102-anatomy.md" \
      --with docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md
  Then simulate (own directory only):
  npm run medical:simulate -- "docs/Alexandria-Source-Imports/pending-live/AU-MED-102-anatomy.md" \
    --emit /tmp/sim-AU-MED-102-anatomy-pending.json
-->

# Item

## id
CON-MSK-D193498AB94D21

## label
Every anatomical description assumes the erect position: standing, eyes forward, arms at the sides, palms facing forwards

## canonical_key
anatomical-erect-position-is-the-reference-for-all-description

## universities
+au

## modules
+AU-MED-102


## learner_years
+1

## exam_signal
src_2df3b7f9b3b393dc1d8f | dept_bank | | p2 | MED 102

## field_notes
universityNotes: au: Foundation of Basic Medical Sciences tests the same criteria (upright, eyes forward, upper limb at the sides, facing anteriorly) as a true/false item bank (MCQs - Foundation Anatomy & Embryology mcqs Nebras, keyed).

---

# Item

## id
CON-MSK-EE7CDEF8ACA587

## label
The three anatomical planes are named by the two parts each one leaves behind

## canonical_key
anatomical-planes-median-coronal-horizontal

## universities
+au

## modules
+AU-MED-102


## learner_years
+1

## exam_signal
src_2df3b7f9b3b393dc1d8f | dept_bank | | p2 | MED 102
src_29f02a5a4d6a273dea76 | dept_bank | | p2 | MED 102

## field_notes
universityNotes: au: Also tested unkeyed in EOM - End Foundation wafdeen-1.pdf (Q8, plane dividing the body into upper and lower parts) — no answer key survives in that file; recorded for completeness, not authored as a question.

---

# Item

## id
CON-MSK-A0C1F50FABDC0F

## label
Medial and lateral are measured from the median plane; proximal and distal from the root of the limb

## canonical_key
terms-of-position-medial-lateral-proximal-distal

## universities
+au

## modules
+AU-MED-102


## learner_years
+1

## exam_signal
src_2df3b7f9b3b393dc1d8f | dept_bank | | p3 | MED 102

## field_notes
universityNotes: au: Tested as "planter surface of the foot & dorsum" terminology (sole vs palm) rather than the upper-limb proximal/distal framing 101-ISK teaches it through — same underlying terms-of-position idea, different worked example.

---

# Item

## id
CON-MSK-2145D2D62EC401

## label
Superficial fascia insulates, smooths, mobilises, conducts, and carries muscles and glands

## canonical_key
superficial-fascia-features

## universities
+au

## modules
+AU-MED-102


## learner_years
+1

## exam_signal
src_8d6ddf874f8984be8217 | EOM_paper | | p1 | MED 102
src_7d031a45baeadc973a00 | EOM_paper | | p1 | MED 102

## field_notes
universityNotes: au: Directly tested on the "End foundation" EOM paper (both stream twins) — "the fatty connective tissue just under the skin" — answer superficial fascia. High-confidence EOM-paper signal.

---

# Item

## id
CON-MSK-6CD9FFF51AE9CD

## label
Deep fascia is one non-elastic collagen membrane that takes five different forms, each with its own job

## canonical_key
deep-fascia-parts-functions

## universities
+au

## modules
+AU-MED-102


## learner_years
+1

## exam_signal
src_3bf4527b51de57464e14 | EOM_paper | | p16 | MED 102
src_413115a28d7dc9914c91 | EOM_paper | | p16 | MED 102

## field_notes
universityNotes: au: EOM paper Q76 asks which statement best describes deep fascia (forms intermuscular septa) — high-confidence EOM-paper signal. The Anatomy Tutorial (AFM) also asks a clinical vignette on cutting the extensor retinaculum (a deep-fascia derivative) but that item carries no printed answer key in this corpus and is not counted as exam evidence here.

---

# Item

## id
CON-MSK-9A22BB8909AF29

## label
The axial skeleton is the skull, hyoid, sternum, ribs and vertebral column; the appendicular skeleton is the limbs and their girdles

## canonical_key
skeleton-axial-versus-appendicular

## universities
+au

## modules
+AU-MED-102


## learner_years
+1

## exam_signal
src_2df3b7f9b3b393dc1d8f | dept_bank | | p3 | MED 102
src_29f02a5a4d6a273dea76 | dept_bank | | p3 | MED 102

## field_notes
universityNotes: au: EOM - End Foundation wafdeen-1.pdf's occurrence (Q9) has no answer key anywhere in that file — recorded as exam signal, not authored as a question.

---

# Item

## id
CON-MSK-00B4A0D32A6420

## label
Bones fall into six shape classes, and the department book names one worked example of each

## canonical_key
bone-shapes-six-classes-with-examples

## universities
+au

## modules
+AU-MED-102


## learner_years
+1

## exam_signal
src_2df3b7f9b3b393dc1d8f | dept_bank | | p3 | MED 102
src_98e8ccbfb3fe73a8c8e3 | dept_bank | | p2 | MED 102

## field_notes
universityNotes: au: Tested for the long-bone exception (sacrum, not a long bone) and the largest sesamoid bone (patella) — both keyed in both twin banks.

---

# Item

## id
CON-MSK-6DCABD3AE947F5

## label
The air cavities of a pneumatic bone lighten the skull, give the voice resonance and warm inspired air — they do not strengthen it

## canonical_key
pneumatic-bone-air-cavities-and-their-uses

## universities
+au

## modules
+AU-MED-102


## learner_years
+1

## exam_signal
src_84b91e011582f2b53494 | dept_bank | | p4 | MED 102

## field_notes
universityNotes: au: Two Wagih-bank items test this (why pneumatic bones are so named; which function pneumatic bones do NOT serve). Both sit in the bank whose printed key is OCR-garbled and unaligned to question number (see coverage/AU-MED-102-anatomy-triage.md) — recorded as exam signal only, not authored as a question until the key is recovered by render.

---

# Item

## id
CON-MSK-EFD497A9922A4D

## label
A long bone is an epiphysis at each end, a diaphysis between them, and a metaphysis where the two meet

## canonical_key
long-bone-regions-epiphysis-diaphysis-metaphysis

## universities
+au

## modules
+AU-MED-102


## learner_years
+1

## exam_signal
src_2df3b7f9b3b393dc1d8f | dept_bank | | p3 | MED 102
src_98e8ccbfb3fe73a8c8e3 | dept_bank | | p3 | MED 102

## field_notes
universityNotes: au: Tested as three items — "the end of the long bone is called" (epiphysis), "the shaft... is called diaphysis" (true), "epiphysis is separated from diaphysis by..." (cartilage) — all keyed in both twin banks.

---

# Item

## id
CON-MSK-C30E73A5353ABB

## label
A long bone lengthens at its epiphyseal plates and widens from the periosteum, and the end that ossifies later is the growing end

## canonical_key
long-bone-grows-in-length-at-the-epiphyseal-plate

## universities
+au

## modules
+AU-MED-102


## learner_years
+1

## exam_signal
src_8d6ddf874f8984be8217 | EOM_paper | | p1 | MED 102
src_7d031a45baeadc973a00 | EOM_paper | | p1 | MED 102
src_3bf4527b51de57464e14 | EOM_paper | | p1 | MED 102
src_413115a28d7dc9914c91 | EOM_paper | | p1 | MED 102

## field_notes
universityNotes: au: Tested on both EOM papers ("which bone has a growing upper end" / "which is a growing end of a bone") — the single most repeated Anatomy fact in this module's exam corpus (4 occurrences across the two paper pairs).

---

# Item

## id
CON-MSK-40012FE18569EC

## label
A long bone takes four sets of arteries, and the shaft is divided between two of them — nutrient artery inside, periosteal arteries outside

## canonical_key
long-bone-arterial-supply-nutrient-metaphyseal-epiphyseal-periosteal

## universities
+au

## modules
+AU-MED-102


## learner_years
+1

## exam_signal
src_2df3b7f9b3b393dc1d8f | dept_bank | | p3 | MED 102

## field_notes
universityNotes: au: Tested as a true/false item on nutrient-artery direction ("directed towards the non-growing end" — true), keyed in the department bank.

---

# Item

## id
CON-MSK-2C78EFB16CA67F

## label
A bone forms either directly in a connective tissue membrane or by replacing a cartilage model, and which one it did is fixed for each bone

## canonical_key
ossification-membranous-versus-cartilaginous

## universities
+au

## modules
+AU-MED-102


## learner_years
+1

## exam_signal
[clear]

## field_notes
universityNotes: au: No question in any triaged Anatomy source names ossification type directly. Kept in scope as chapter-completion under brief §10 — the department's own Anatomy Summaries sheet (src_bfb1aee3422c7577592c) teaches membranous vs cartilaginous ossification as part of the same Skeletal-system chapter that the growing-end and epiphysis/diaphysis facts above are examined from — not a directly question-driven update.

---

# Item

## id
CON-MSK-17E2267FB4758F

## label
A fibrous joint is an immobile union by fibrous tissue, in three named types

## canonical_key
fibrous-joints-types-definition

## universities
+au

## modules
+AU-MED-102


## learner_years
+1

## exam_signal
src_2df3b7f9b3b393dc1d8f | dept_bank | | p5 | MED 102
src_98e8ccbfb3fe73a8c8e3 | dept_bank | | p6 | MED 102

## field_notes
universityNotes: au: Tested for suture identification, gomphosis (peg-and-socket), syndesmosis, and "no movement in..." across several keyed items in both twin banks.

---

# Item

## id
CON-MSK-8863ACD7E8D790

## label
Primary cartilaginous joints are hyaline and temporary; secondary ones are fibrocartilaginous and midline

## canonical_key
primary-versus-secondary-cartilaginous-joints

## universities
+au

## modules
+AU-MED-102


## learner_years
+1

## exam_signal
src_3bf4527b51de57464e14 | EOM_paper | | p16 | MED 102
src_413115a28d7dc9914c91 | EOM_paper | | p16 | MED 102

## field_notes
universityNotes: au: EOM paper Q75 (which joint type is found in the midline — secondary cartilaginous) is a direct, high-confidence signal on this exact record.

---

# Item

## id
CON-MSK-1E40050F141F4C

## label
A synovial joint is seven named components around a potential cavity

## canonical_key
synovial-joint-structure-characters

## universities
+au

## modules
+AU-MED-102


## learner_years
+1

## exam_signal
src_2df3b7f9b3b393dc1d8f | dept_bank | | p6 | MED 102
src_84b91e011582f2b53494 | dept_bank | | p2 | MED 102

## field_notes
universityNotes: au: "All bones of synovial joints are covered with hyaline cartilage" (true) is keyed in the department bank. The Wagih-bank synovial-joint-definition item (same idea) sits in the OCR-garbled-key file and is recorded as signal only.

---

# Item

## id
CON-MSK-4D7492BC85C03D

## label
Each joint of the upper limb is classified by the shape of its articular surfaces, and no two neighbouring joints share a type

## canonical_key
upper-limb-joint-types-by-articular-surfaces

## universities
+au

## modules
+AU-MED-102


## learner_years
+1

## exam_signal
src_2df3b7f9b3b393dc1d8f | dept_bank | | p5 | MED 102
src_2df3b7f9b3b393dc1d8f | dept_bank | | p6 | MED 102
src_2df3b7f9b3b393dc1d8f | dept_bank | | p7 | MED 102

## field_notes
universityNotes: au: The Foundation module tests this classification generically (pivot, hinge, ellipsoid, uniaxial-exception, ball-and-socket) rather than only through upper-limb examples — 101 ISK's own label names the upper limb because that is the region its department book teaches from; the underlying axis/shape classification is the same idea Alexandria's paper tests.

---

# Item

## id
CON-MSK-B88F413E4536F9

## label
The movements possible at an upper limb joint follow from its type and the number of its axes

## canonical_key
upper-limb-joint-movements-follow-from-type

## universities
+au

## modules
+AU-MED-102


## learner_years
+1

## exam_signal
src_2df3b7f9b3b393dc1d8f | dept_bank | | p5 | MED 102

## field_notes
universityNotes: au: Same regional-vs-general note as CON-MSK-4D7492BC85C03D above — tested generically here (e.g. "pivot joint considers a... uniaxial").

---

# Item

## id
CON-MSK-CBB4C433F2F81E

## label
The elbow takes twigs from the four nerves that cross it, and the axillary nerve is not one of them

## canonical_key
elbow-joint-nerve-supply-and-hiltons-law

## universities
+au

## modules
+AU-MED-102


## learner_years
+1

## exam_signal
src_2df3b7f9b3b393dc1d8f | dept_bank | | p7 | MED 102

## field_notes
universityNotes: au: Foundation module tests Hilton's law as a general principle ("nerve supply of any joint supplies the muscles acting on it" — true), not through the elbow specifically as 101 ISK's own worked example does.

---

# Item

## id
CON-MSK-229AAD0C8626CF

## label
The three muscle types are told apart by four things at once: where they are, whether they are voluntary, whether they are striated, and which nerves supply them

## canonical_key
muscle-types-skeletal-smooth-cardiac

## universities
+au

## modules
+AU-MED-102


## learner_years
+1

## exam_signal
src_2df3b7f9b3b393dc1d8f | dept_bank | | p6 | MED 102
src_98e8ccbfb3fe73a8c8e3 | dept_bank | | p8 | MED 102

## field_notes
universityNotes: au: Cardiac-muscle control/structure and alimentary-canal (smooth) muscle location both keyed in the department bank.

---

# Item

## id
CON-MSK-4018ED42ADDDB4

## label
A muscle attaches either directly to bone or through a tendon or an aponeurosis

## canonical_key
muscle-attachment-types

## universities
+au

## modules
+AU-MED-102


## learner_years
+1

## exam_signal
src_84b91e011582f2b53494 | dept_bank | | p6 | MED 102

## field_notes
universityNotes: au: Aponeurosis-definition item ("flat, sheet-like connective tissue which attaches a muscle to bone or cartilage") sits in the OCR-garbled-key file — recorded as signal only, not authored as a question.

---

# Item

## id
CON-MSK-F598AF39FBE297

## label
A purposeful movement needs four kinds of muscle, and each is named for what it does to the movement rather than for where it lies

## canonical_key
muscle-action-roles-prime-mover-antagonist-fixator-synergist

## universities
+au

## modules
+AU-MED-102


## learner_years
+1

## exam_signal
src_2df3b7f9b3b393dc1d8f | dept_bank | | p6 | MED 102
src_84b91e011582f2b53494 | dept_bank | | p6 | MED 102

## field_notes
universityNotes: au: "Triceps in elbow extension is an example of prime mover" is keyed in the department bank. The Wagih-bank items on prime-mover terminology and triceps' role sit in the OCR-garbled-key file — recorded as signal only.

---

# Item

## id
CON-MSK-BF3670E27D6F12

## label
The right lymphatic duct drains one quadrant of the body and the thoracic duct drains the other three

## canonical_key
thoracic-duct-and-right-lymphatic-duct-territories

## universities
+au

## modules
+AU-MED-102


## learner_years
+1

## exam_signal
src_8d6ddf874f8984be8217 | EOM_paper | | p1 | MED 102
src_7d031a45baeadc973a00 | EOM_paper | | p1 | MED 102

## field_notes
universityNotes: au: EOM paper Q3 ("which of the following is drained by the thoracic duct — right lower limb") is a direct, high-confidence signal that matches this record's own territory description exactly.

---

# Item

## id
CON-MSK-888467E7C45479

## label
Skeletal muscles are classified by the direction of their fibres, from strap-like to multipennate

## canonical_key
skeletal-muscle-form-classification-by-fibre-direction

## universities
+au

## modules
+AU-MED-102


## learner_years
+1

## exam_signal
src_3bf4527b51de57464e14 | EOM_paper | | p16 | MED 102
src_413115a28d7dc9914c91 | EOM_paper | | p16 | MED 102

## field_notes
universityNotes: au: EOM paper Q77 ("which muscle has a wider range of movement — parallel") is a direct, high-confidence signal on this exact record.
