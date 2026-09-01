<!--
  MUST-MED501 (Rheumatology & Immunology) — new `msk` concepts, S2 authoring.
  Second-search run first per dispatch condition 2 (find-existing.mjs +
  docs/import-ready + docs/*-Source-Imports grep + Helwan Y1's own concept
  tree on codex/helwan-year1-content) — none of these 18 duplicate a live or
  pending record; the 6 genuine hits found are written as sparse overlay
  updates instead, in ../pending-live/MUST-MED501-concepts.md, not here.

  Placement: rheumatology-disease concepts sit under `msk` (the target-organ
  body system) per this lane's TRIAGE APPROVED condition 3 — the 20-subject
  list in "Instruction Manual for Content Creation/00-START-HERE.md" §3 does
  in fact carry a subject id `imm` (currently zero live concepts), which
  looks like it could have been used instead; flagged back to the chief of
  staff as a possible correction to the "no dedicated imm/rheum slot" premise,
  but this batch follows the explicit condition-3 ruling (msk / inf split)
  rather than deciding the taxonomy question itself.

  Ids minted with "Instruction Manual for Content Creation/tools/mint-concept-id.mjs"
  (deterministic, unsalted, checked against the full live+pending corpus at
  mint time — 13,171 existing ids). Primary teaching source: src_a51388c9442af6f01df5
  (Dr Shaf3y Rheumatology-40p.pdf), cited by page below; a handful of facts are
  bank-only (printed key, no independent lecture restatement in the pages read)
  and say so in field_notes rather than overclaiming lecture support.
-->

# Item

## id
CON-MSK-80497C8F1AEFBF

## article_ids
ART-MSK-MUST-MED501-RHEUMATOID-ARTHRITIS

## label
Rheumatoid arthritis can cause normocytic anaemia of chronic disease, microcytic anaemia from NSAID-induced GI bleeding, megaloblastic anaemia from methotrexate, or haemolytic anaemia from Felty syndrome

## canonical_key
rheumatoidarthritis.anemia.chronic-disease-mechanism

## aliases
RA anaemia
Anaemia of chronic disease in rheumatoid arthritis

## definition
Rheumatoid arthritis produces a normocytic normochromic anaemia of chronic disease from marrow suppression by ongoing inflammation. RA-associated anaemia can also be microcytic hypochromic (NSAID-induced GI bleeding), megaloblastic (folate deficiency from methotrexate), or haemolytic (hypersplenism in Felty syndrome) — the mechanism named must match the clinical context given rather than defaulting to one type.

## explicit_objective
Name the anaemia type behind a given RA clinical picture, distinguishing chronic-disease marrow suppression from the NSAID, methotrexate and Felty-syndrome mechanisms that also occur in RA.

## pitfalls
Assuming every RA anaemia is "anaemia of chronic disease" by default. A chronic, otherwise-unremarkable RA case is normocytic chronic-disease anaemia, but drug history (NSAIDs, methotrexate) or splenomegaly each point to a different, specific mechanism with its own MCV signature.

## concept_type
clinical_feature

## status
Draft

## subject
msk

## topic
Musculoskeletal system

## subtopic
Rheumatoid arthritis

## universities
must

## learner_years
5

## modules
MUST-MED501

## module_subject
MUST-MED501 > Rheumatology and Immunology > Rheumatoid arthritis

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
src_92c2608c239affc24b1f | mcq_bank | | A04
src_a51388c9442af6f01df5 | lecture | | p13-14

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs run for "anemia of chronic disease", "RA anemia" and "Felty syndrome" — no hit. Helwan Y1's own joint-pathology concept files (codex/helwan-year1-content, checked directly) name RA's clinical/deformity/RF pattern but not its anaemia mechanisms.

---

# Item

## id
CON-MSK-25C19AFDFE983B

## article_ids
ART-MSK-MUST-MED501-RHEUMATOID-ARTHRITIS

## label
The ACR 1987 classification criteria for rheumatoid arthritis require symmetrical, not asymmetrical, joint swelling

## canonical_key
rheumatoidarthritis.diagnosis.acr1987-criteria

## aliases
ARA 1987 criteria
RA diagnostic criteria

## definition
The (older) ACR 1987 classification criteria for rheumatoid arthritis are: morning stiffness of at least one hour, swelling of three or more joint areas, swelling of a PIP/MCP/wrist joint, subcutaneous nodules, a positive rheumatoid factor, SYMMETRICAL joint swelling, and hand/wrist radiographic erosion or peri-articular osteopenia. A patient is classified as having RA with four or more of these seven, the first four having lasted more than six weeks. Asymmetrical arthritis is not one of the seven — RA's own criterion names symmetrical involvement.

## explicit_objective
Identify which item in a list of proposed ACR-1987-criteria features is not genuine, recognising that the actual criterion is symmetrical (not asymmetrical) joint swelling.

## pitfalls
Treating any plausible RA feature as a candidate criterion. The list is a fixed set of seven; "asymmetrical arthritis" is not merely absent from it, it inverts the actual (symmetrical) criterion, which is the trap the source question is built around.

## concept_type
classification

## status
Draft

## subject
msk

## topic
Musculoskeletal system

## subtopic
Rheumatoid arthritis

## universities
must

## learner_years
5

## modules
MUST-MED501

## module_subject
MUST-MED501 > Rheumatology and Immunology > Rheumatoid arthritis

## exam_weight_by_year
MUST_Y5=0.7

## clinical_relevance
0.6

## academic_relevance
0.8

## confidence
0.9

## support_mode
direct_statement

## exam_signal
src_92c2608c239affc24b1f | mcq_bank | | A05
src_a51388c9442af6f01df5 | lecture | | p16

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs run for "ACR criteria" and "rheumatoid arthritis diagnostic criteria" — no hit anywhere in live state or any docs/*-Source-Imports root.

---

# Item

## id
CON-MSK-B13C7FC581085A

## article_ids
ART-MSK-MUST-MED501-GOUT-AND-PSEUDOGOUT

## label
Acute gout classically presents in a man with a hot, painful, swollen joint precipitated by thiazide diuretics, alcohol, high meat/purine intake, infection, exercise or trauma

## canonical_key
gout.presentation.acute-attack-risk-factors

## aliases
Gout risk factors
Acute gouty arthritis presentation

## definition
Acute gouty arthritis classically presents with sudden onset of a hot, painful, swollen joint (most often the first metatarsophalangeal joint), precipitated by excess meat/purine intake, alcohol, infection, exercise, trauma, or drugs that raise urate such as thiazide diuretics. Gout is roughly ten times more common in men than women.

## explicit_objective
Recognise acute gout from a case combining male sex, a precipitating drug or dietary trigger (thiazide diuretic, high meat/purine intake), and an acutely inflamed joint.

## pitfalls
Treating the precipitating factor (the thiazide, the diet) as if it were itself the diagnosis, rather than as the trigger that unmasks the underlying urate-crystal arthritis.

## concept_type
clinical_feature

## status
Draft

## subject
msk

## topic
Musculoskeletal system

## subtopic
Gout

## universities
must

## learner_years
5

## modules
MUST-MED501

## module_subject
MUST-MED501 > Rheumatology and Immunology > Gout

## exam_weight_by_year
MUST_Y5=0.75

## clinical_relevance
0.85

## academic_relevance
0.6

## confidence
0.9

## support_mode
direct_statement

## exam_signal
src_92c2608c239affc24b1f | mcq_bank | | A06
src_23cd28c5b092d029d0af | mcq_bank | | B08
src_a51388c9442af6f01df5 | lecture | | p32-33

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs run for "gout" (54 hits, all biochemistry-mechanism concepts on causes/allopurinol from Kasr 103-BMS — none teach clinical presentation or risk factors); Helwan Y1's own gout concepts (codex/helwan-year1-content) teach crystal pathology and podagra location, not risk factors — related but distinct, noted rather than merged.

---

# Item

## id
CON-MSK-701B1D6D701748

## article_ids
ART-MSK-MUST-MED501-GOUT-AND-PSEUDOGOUT

## label
Acute gout management removes the precipitating cause — including stopping a thiazide diuretic — alongside anti-inflammatory treatment of the attack

## canonical_key
gout.management.acute-attack-remove-precipitant

## aliases
Gout management — stop the precipitant
Withdrawal of thiazide in gout

## definition
General management of gout removes any precipitating cause, including drugs that raise serum urate — most importantly stopping a thiazide diuretic — alongside decreasing meat, alcohol and purine intake, before or alongside anti-inflammatory treatment (colchicine, NSAIDs or corticosteroids) of the acute attack itself.

## explicit_objective
Identify withdrawal of the precipitating drug (e.g. a thiazide diuretic) as the appropriate management step in a patient whose gout attack follows a known precipitant.

## pitfalls
Reaching straight for a urate-lowering drug (allopurinol) as "the" management answer — that is chronic/maintenance therapy and can worsen an acute attack (see the allopurinol-timing concept). Acute management removes the precipitant and treats the inflammation; it does not start urate-lowering therapy.

## concept_type
management

## status
Draft

## subject
msk

## topic
Musculoskeletal system

## subtopic
Gout

## universities
must

## learner_years
5

## modules
MUST-MED501

## module_subject
MUST-MED501 > Rheumatology and Immunology > Gout

## exam_weight_by_year
MUST_Y5=0.65

## clinical_relevance
0.85

## academic_relevance
0.5

## confidence
0.9

## support_mode
direct_statement

## exam_signal
src_92c2608c239affc24b1f | mcq_bank | | A08
src_23cd28c5b092d029d0af | mcq_bank | | B10
src_a51388c9442af6f01df5 | lecture | | p34

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD.md.
finalPublisher: Not applicable — MUST is never imported to production.

---

# Item

## id
CON-MSK-9ADBB590A62AD8

## article_ids
ART-MSK-MUST-MED501-RHEUMATOID-ARTHRITIS

## label
The boutonniere deformity of rheumatoid arthritis is flexion of the proximal interphalangeal joint with hyperextension of the distal interphalangeal joint

## canonical_key
rheumatoidarthritis.deformity.boutonniere-mechanism

## aliases
Buttonhole deformity
Boutonniere deformity mechanism

## definition
The boutonniere (buttonhole) deformity of rheumatoid arthritis is flexion of the proximal interphalangeal (PIP) joint with hyperextension of the distal interphalangeal (DIP) joint, from rupture of the extensor tendon's central slip over the PIP joint, letting the lateral bands slip volarward so the joint "buttonholes" through the extensor mechanism.

## explicit_objective
State the joint-level mechanism of the boutonniere deformity — PIP flexion with DIP hyperextension — and distinguish it from swan-neck deformity, the opposite pattern.

## pitfalls
Reversing the two joints — describing PIP hyperextension with DIP flexion as "boutonniere" describes swan-neck deformity instead.

## concept_type
mechanism

## status
Draft

## subject
msk

## topic
Musculoskeletal system

## subtopic
Rheumatoid arthritis

## universities
must

## learner_years
5

## modules
MUST-MED501

## module_subject
MUST-MED501 > Rheumatology and Immunology > Rheumatoid arthritis

## exam_weight_by_year
MUST_Y5=0.55

## clinical_relevance
0.5

## academic_relevance
0.7

## confidence
0.75

## support_mode
direct_statement

## exam_signal
src_92c2608c239affc24b1f | mcq_bank | | A10

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD.md.
finalPublisher: Not applicable — MUST is never imported to production.
exam_signal: The local lecture (src_a51388c9442af6f01df5, p14) names ulnar deviation of fingers and radial deviation of the wrist as RA deformities but does not independently restate the boutonniere/swan-neck joint-level mechanism in the pages read — this fact is bank-printed, standard teaching, confidence set accordingly (0.75, not higher).

---

# Item

## id
CON-MSK-6F48728AD91062

## article_ids
ART-MSK-MUST-MED501-SERONEGATIVE-SPONDYLOARTHROPATHIES

## label
Ankylosing spondylitis presents typically in young men with inflammatory back pain and morning stiffness that improves with activity

## canonical_key
ankylosingspondylitis.presentation.young-male-inflammatory-back-pain

## aliases
AS clinical presentation
Inflammatory back pain

## definition
Ankylosing spondylitis is a chronic inflammatory disorder of the axial skeleton, typically presenting in men aged 15-40 (3:1 male predominance) with insidious low back pain and morning stiffness that improves with activity/movement and worsens with rest, often with a positive family history and a high association with HLA-B27.

## explicit_objective
Recognise ankylosing spondylitis from the combination of young age, male sex, activity-relieved back pain/morning stiffness, and a positive family history.

## pitfalls
Confusing inflammatory back pain (better with movement, worse with rest, prominent morning stiffness) with mechanical back pain (worse with movement) — the direction of the movement-response is the discriminating clue, not merely the presence of back pain.

## concept_type
clinical_feature

## status
Draft

## subject
msk

## topic
Musculoskeletal system

## subtopic
Ankylosing spondylitis

## universities
must

## learner_years
5

## modules
MUST-MED501

## module_subject
MUST-MED501 > Rheumatology and Immunology > Ankylosing spondylitis

## exam_weight_by_year
MUST_Y5=0.8

## clinical_relevance
0.85

## academic_relevance
0.6

## confidence
0.9

## support_mode
direct_statement

## exam_signal
src_92c2608c239affc24b1f | mcq_bank | | A11
src_92c2608c239affc24b1f | mcq_bank | | A14
src_23cd28c5b092d029d0af | mcq_bank | | B07
src_a51388c9442af6f01df5 | lecture | | p26-27

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs run for "spondylitis" and "ankylosing" — no hit. Tested three times (A11/A14/B07) per the triage's own concept-collapse note; all three cite this one record.

---

# Item

## id
CON-MSK-0F7D1D6A7DACC2

## article_ids
ART-MSK-MUST-MED501-OA-SEPTIC-CTD

## label
Bouchard's nodes are osteoarthritis nodes at the proximal interphalangeal joint, the PIP counterpart of Heberden's nodes at the DIP joint

## canonical_key
osteoarthritis.signs.bouchard-nodes-pip

## aliases
Bouchard's nodes
PIP joint osteoarthritis nodes

## definition
In nodal osteoarthritis, Bouchard's nodes are hard bony nodes at the proximal interphalangeal (PIP) joints — the PIP-joint counterpart of Heberden's nodes at the distal interphalangeal (DIP) joints — both reflecting osteophyte formation at the small hand joints.

## explicit_objective
Localise Bouchard's nodes to the PIP joint and distinguish them from Heberden's nodes at the DIP joint.

## pitfalls
Swapping the two eponyms. A simple anchor: Heberden's is distal, Bouchard's is proximal.

## concept_type
clinical_feature

## status
Draft

## subject
msk

## topic
Musculoskeletal system

## subtopic
Osteoarthritis

## universities
must

## learner_years
5

## modules
MUST-MED501

## module_subject
MUST-MED501 > Rheumatology and Immunology > Osteoarthritis

## exam_weight_by_year
MUST_Y5=0.55

## clinical_relevance
0.6

## academic_relevance
0.6

## confidence
0.9

## support_mode
direct_statement

## exam_signal
src_92c2608c239affc24b1f | mcq_bank | | A12
src_a51388c9442af6f01df5 | lecture | | p31

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs run for "Bouchard" — no hit. The live/pending Heberden's-node record found (Helwan Y1, codex/helwan-year1-content, CON-MSK-5AD256E28E4183) names Heberden's but not Bouchard's — related, cross-linked via related_concept_ids, not merged (different joint, different eponym, distinct objective).

## related_concept_ids
CON-MSK-5AD256E28E4183

---

# Item

## id
CON-MSK-034637C65F80EC

## article_ids
ART-MSK-MUST-MED501-SERONEGATIVE-SPONDYLOARTHROPATHIES

## label
Psoriatic arthritis has a distinct pattern that predominantly involves the distal interphalangeal joints, associated with nail changes

## canonical_key
psoriaticarthritis.pattern.dip-joint-involvement

## aliases
Psoriatic arthropathy — DIP pattern
DIP joint psoriatic arthritis

## definition
Psoriatic arthropathy has several named patterns; the predominant-DIP pattern (roughly 10% of cases) selectively involves the distal interphalangeal (DIP) joints and is associated with psoriatic nail ridging and hyperkeratosis, distinguishing it from rheumatoid arthritis, which characteristically spares the DIP joints.

## explicit_objective
Identify the distal interphalangeal joint as the classic site of a named psoriatic-arthritis pattern, associated with nail changes.

## pitfalls
Assuming psoriatic arthritis always presents as an asymmetrical oligoarthritis (its most common pattern, over 50% of cases) — the DIP-predominant and arthritis-mutilans patterns are named, distinct minority presentations, and a DIP-only vignette should be read as psoriatic rather than osteoarthritis or RA.

## concept_type
clinical_feature

## status
Draft

## subject
msk

## topic
Musculoskeletal system

## subtopic
Psoriatic arthritis

## universities
must

## learner_years
5

## modules
MUST-MED501

## module_subject
MUST-MED501 > Rheumatology and Immunology > Psoriatic arthritis

## exam_weight_by_year
MUST_Y5=0.55

## clinical_relevance
0.6

## academic_relevance
0.5

## confidence
0.85

## support_mode
direct_statement

## exam_signal
src_92c2608c239affc24b1f | mcq_bank | | A15
src_a51388c9442af6f01df5 | lecture | | p28-29

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs run for "psoriatic arthritis" — no hit.

---

# Item

## id
CON-MSK-FEFF8B1FB23880

## article_ids
ART-MSK-MUST-MED501-OA-SEPTIC-CTD

## label
Osteoarthritis is the most common form of arthritis, and its nodal generalised form is markedly more common in postmenopausal women

## canonical_key
osteoarthritis.epidemiology.most-common-arthritis-postmenopausal

## aliases
OA epidemiology
Nodal osteoarthritis in postmenopausal women

## definition
Osteoarthritis is the most common form of arthritis, degenerative rather than inflammatory, presenting from about 45 years of age and usually over 60. Its nodal (Heberden's/Bouchard's-node) generalised pattern is markedly more common in postmenopausal women.

## explicit_objective
State that osteoarthritis is both the most common arthritis overall and, in its nodal generalised form, characteristically more common in postmenopausal women.

## pitfalls
Confusing OA's high overall prevalence with rheumatoid arthritis's own female predominance — nodal OA's postmenopausal pattern is a separate, specific epidemiological fact, not a restatement of RA's demographics.

## concept_type
clinical_feature

## status
Draft

## subject
msk

## topic
Musculoskeletal system

## subtopic
Osteoarthritis

## universities
must

## learner_years
5

## modules
MUST-MED501

## module_subject
MUST-MED501 > Rheumatology and Immunology > Osteoarthritis

## exam_weight_by_year
MUST_Y5=0.5

## clinical_relevance
0.55

## academic_relevance
0.6

## confidence
0.75

## support_mode
direct_statement

## exam_signal
src_92c2608c239affc24b1f | mcq_bank | | A18
src_23cd28c5b092d029d0af | mcq_bank | | B02
src_a51388c9442af6f01df5 | lecture | | p30-31

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs run for "osteoarthritis" (found only a Kasr biochemistry GAG-function record, mentioning OA in passing while teaching glycosaminoglycan roles — not a duplicate of this epidemiology objective). Helwan Y1's own osteoarthritis concepts (codex/helwan-year1-content) teach pathology (cartilage loss, osteophytes, Heberden nodes), not epidemiology — related, not merged.
exam_signal: The "most common arthritis" / postmenopausal-female association is bank-printed (A18, B02); the local lecture independently confirms the age range (45, usually >60) but not the postmenopausal-female framing word-for-word — confidence set accordingly (0.75).

---

# Item

## id
CON-MSK-FAB3B52B4C8200

## article_ids
ART-MSK-MUST-MED501-OA-SEPTIC-CTD

## label
A new acute monoarthritis needs joint aspiration primarily to exclude septic arthritis before other diagnoses are assumed

## canonical_key
monoarthritis.workup.joint-aspiration-exclude-septic

## aliases
Acute monoarthritis workup
Joint aspiration to exclude septic arthritis

## definition
A patient presenting with acute monoarthritis (a single hot, swollen, painful joint) needs joint aspiration as the key next investigation — by fluid appearance, Gram stain and culture — primarily to exclude septic arthritis before a crystal or degenerative cause is assumed.

## explicit_objective
Choose joint aspiration as the appropriate next step in a new acute monoarthritis, recognising that excluding septic arthritis takes priority over other differentials.

## pitfalls
Jumping straight to an X-ray or a specific crystal diagnosis before aspiration has excluded infection — septic arthritis is the differential that cannot wait, since delayed treatment destroys the joint.

## concept_type
investigation

## status
Draft

## subject
msk

## topic
Musculoskeletal system

## subtopic
Joint disease — investigation

## universities
must

## learner_years
5

## modules
MUST-MED501

## module_subject
MUST-MED501 > Rheumatology and Immunology > Investigation of joint disease

## exam_weight_by_year
MUST_Y5=0.65

## clinical_relevance
0.85

## academic_relevance
0.55

## confidence
0.85

## support_mode
direct_statement

## exam_signal
src_92c2608c239affc24b1f | mcq_bank | | A19
src_a51388c9442af6f01df5 | lecture | | p1-2

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs run for "monoarthritis" and "septic arthritis" — no hit anywhere.

---

# Item

## id
CON-MSK-760A4579097BF2

## article_ids
ART-MSK-MUST-MED501-OA-SEPTIC-CTD

## label
Limited scleroderma (CREST syndrome) carries a better prognosis than diffuse systemic sclerosis, at roughly 70% ten-year survival

## canonical_key
scleroderma.crest.survival-prognosis

## aliases
CREST syndrome prognosis
Limited scleroderma survival

## definition
CREST syndrome (Calcinosis, Raynaud's phenomenon, oEsophageal dysmotility, Sclerodactyly, Telangiectasia) is the limited cutaneous form of systemic sclerosis. It carries a better prognosis than diffuse systemic sclerosis, at roughly 70% ten-year survival, because its skin-and-peripheral-vessel-predominant disease specifically spares the severe early internal-organ involvement that worsens diffuse disease's outlook.

## explicit_objective
State that limited scleroderma/CREST carries a substantially better prognosis (~70% ten-year survival) than diffuse systemic sclerosis.

## pitfalls
Treating every form of scleroderma as carrying the same prognosis — CREST's limited, peripheral pattern is specifically the better-prognosis one.

## concept_type
clinical_feature

## status
Draft

## subject
msk

## topic
Musculoskeletal system

## subtopic
Scleroderma

## universities
must

## learner_years
5

## modules
MUST-MED501

## module_subject
MUST-MED501 > Rheumatology and Immunology > Scleroderma

## exam_weight_by_year
MUST_Y5=0.5

## clinical_relevance
0.55

## academic_relevance
0.5

## confidence
0.75

## support_mode
direct_statement

## exam_signal
src_92c2608c239affc24b1f | mcq_bank | | A20
src_23cd28c5b092d029d0af | mcq_bank | | B05
src_a51388c9442af6f01df5 | lecture | | p21

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs run for "CREST" and "scleroderma" — no hit. Tested twice (A20/B05) per the triage's own concept-collapse note; both cite this one record.
exam_signal: The local lecture (p21) names CREST's five features but the ~70%-survival figure is bank-printed (both A20 and B05 independently, not word-for-word restated in the lecture pages read) — confidence set accordingly (0.75).

---

# Item

## id
CON-MSK-4E0BB35B7F5B5A

## article_ids
ART-MSK-MUST-MED501-RHEUMATOID-ARTHRITIS

## label
Poor prognostic factors in rheumatoid arthritis include female sex, a rapid disease course, high-titre rheumatoid factor, early anaemia and HLA-DR4

## canonical_key
rheumatoidarthritis.prognosis.poor-prognosis-factors

## aliases
RA poor prognosis
RA prognostic factors

## definition
Poor prognostic factors in rheumatoid arthritis include female sex, an aggressive/rapid disease course, a strongly positive rheumatoid factor, anaemia within the first 3 months of disease, and carriage of HLA-DR4.

## explicit_objective
List the recognised poor-prognosis markers in RA (female sex, rapid course, high-titre RF, early anaemia, HLA-DR4) and recognise a vignette naming several of them together as "poor prognosis".

## pitfalls
Treating any single adverse feature as sufficient to answer "poor prognosis" without checking whether the question asks for the combination — this bank's own item keys "all of the above" when several listed factors are each independently poor-prognostic.

## concept_type
clinical_feature

## status
Draft

## subject
msk

## topic
Musculoskeletal system

## subtopic
Rheumatoid arthritis

## universities
must

## learner_years
5

## modules
MUST-MED501

## module_subject
MUST-MED501 > Rheumatology and Immunology > Rheumatoid arthritis

## exam_weight_by_year
MUST_Y5=0.55

## clinical_relevance
0.55

## academic_relevance
0.55

## confidence
0.8

## support_mode
direct_statement

## exam_signal
src_92c2608c239affc24b1f | mcq_bank | | A21

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs run for "rheumatoid arthritis" and "poor prognosis" — no hit for this specific factor list.

---

# Item

## id
CON-MSK-619AD8682F0912

## article_ids
ART-MSK-MUST-MED501-GOUT-AND-PSEUDOGOUT

## label
Allopurinol is chronic gout therapy, not acute-attack treatment — starting it mid-attack can precipitate or worsen acute gouty arthritis

## canonical_key
gout.management.allopurinol-not-for-acute-attack

## aliases
Allopurinol timing in gout
Allopurinol not for acute gout

## definition
Allopurinol (a xanthine oxidase inhibitor) is chronic/maintenance therapy for gout, not treatment of an acute attack. Starting it during an acute flare can precipitate or worsen acute gouty arthritis by mobilising urate, so it should be started only about four weeks after the last acute attack, with colchicine cover, never as acute-attack treatment.

## explicit_objective
Recognise allopurinol as excluded from acute-gout treatment, and explain why (risk of precipitating/worsening the attack) rather than only memorising the exclusion.

## pitfalls
Reaching for allopurinol as "the" gout drug regardless of timing — its urate-lowering action is exactly what makes it dangerous to start mid-attack.

## concept_type
management

## status
Draft

## subject
msk

## topic
Musculoskeletal system

## subtopic
Gout

## universities
must

## learner_years
5

## modules
MUST-MED501

## module_subject
MUST-MED501 > Rheumatology and Immunology > Gout

## exam_weight_by_year
MUST_Y5=0.7

## clinical_relevance
0.75

## academic_relevance
0.55

## confidence
0.9

## support_mode
direct_statement

## exam_signal
src_92c2608c239affc24b1f | mcq_bank | | A23
src_a51388c9442af6f01df5 | lecture | | p35

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs run for "allopurinol" and "gout" — the 3 live biochemistry allopurinol concepts under `CON-REN-` (Kasr 103-BMS, structure/xanthine-oxidase-mechanism) teach a different objective (mechanism, not clinical timing) and are cross-linked below per the triage's own note, not merged.

## related_concept_ids
CON-REN-B3AEE6F22A046A
CON-REN-E5BAEF03791C8F
CON-REN-42ED4D5025FB7B

---

# Item

## id
CON-MSK-CCA223707719DA

## article_ids
ART-MSK-MUST-MED501-RHEUMATOID-ARTHRITIS

## label
NSAIDs are anti-inflammatory drugs for RA symptom control, not disease-modifying anti-rheumatic drugs (DMARDs)

## canonical_key
dmard.classification.nsaids-are-not-dmards

## aliases
DMARD classification
NSAIDs are not DMARDs

## definition
Disease-modifying anti-rheumatic drugs (DMARDs — gold, D-penicillamine, sulfasalazine, hydroxychloroquine, leflunomide, methotrexate and biologics) act on the underlying disease process. NSAIDs are anti-inflammatory drugs that control symptoms by inhibiting prostaglandin synthesis but do not modify the disease course, so NSAIDs are not classified as DMARDs even though both are used to treat RA.

## explicit_objective
Distinguish the DMARD drug class from NSAIDs, recognising that an anti-inflammatory drug controlling pain and swelling is not automatically disease-modifying.

## pitfalls
Treating "used to treat RA" as equivalent to "DMARD" — NSAIDs treat RA symptoms without being DMARDs; the two categories are defined by mechanism (disease-course-modifying vs. symptom control), not by which disease they are prescribed for.

## concept_type
classification

## status
Draft

## subject
msk

## topic
Musculoskeletal system

## subtopic
Rheumatoid arthritis — treatment

## universities
must

## learner_years
5

## modules
MUST-MED501

## module_subject
MUST-MED501 > Rheumatology and Immunology > Rheumatoid arthritis

## exam_weight_by_year
MUST_Y5=0.65

## clinical_relevance
0.6

## academic_relevance
0.65

## confidence
0.9

## support_mode
direct_statement

## exam_signal
src_92c2608c239affc24b1f | mcq_bank | | A25
src_a51388c9442af6f01df5 | lecture | | p16-18

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs run for "DMARD" — no hit anywhere.

---

# Item

## id
CON-MSK-45AB84AE33DEA1

## article_ids
ART-MSK-MUST-MED501-RHEUMATOID-ARTHRITIS

## label
The true variants of rheumatoid arthritis are Felty syndrome, Caplan syndrome and the juvenile forms — RA has no congenital variant

## canonical_key
rheumatoidarthritis.variants.true-variants-exclude-congenital

## aliases
RA variants
Felty syndrome, Caplan syndrome, juvenile RA

## definition
The recognised variants of rheumatoid arthritis are Felty syndrome (splenomegaly, pancytopenia, lymphadenopathy, vasculitis), Caplan syndrome (pneumoconiosis plus RA) and the juvenile forms (oligoarticular, polyarticular, Still's disease). RA has no congenital variant — it is an acquired disease, not one present from birth.

## explicit_objective
Identify which item in a listed set of conditions is not a true variant of rheumatoid arthritis, recognising "congenital" as inconsistent with RA's acquired, adult/juvenile-onset nature.

## pitfalls
Assuming juvenile RA counts as "congenital" because it can start in childhood — juvenile chronic arthritis is an age-of-onset variant, not a from-birth condition.

## concept_type
classification

## status
Draft

## subject
msk

## topic
Musculoskeletal system

## subtopic
Rheumatoid arthritis

## universities
must

## learner_years
5

## modules
MUST-MED501

## module_subject
MUST-MED501 > Rheumatology and Immunology > Rheumatoid arthritis

## exam_weight_by_year
MUST_Y5=0.5

## clinical_relevance
0.45

## academic_relevance
0.6

## confidence
0.85

## support_mode
direct_statement

## exam_signal
src_23cd28c5b092d029d0af | mcq_bank | | B01
src_a51388c9442af6f01df5 | lecture | | p15

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs run for "Felty syndrome" and "Caplan syndrome" — no hit.

---

# Item

## id
CON-MSK-0A1E8E3ECCCCDD

## article_ids
ART-MSK-MUST-MED501-OA-SEPTIC-CTD

## label
Septic arthritis management is drainage and antibiotics — blood transfusion has no role in it

## canonical_key
septicarthritis.management.blood-transfusion-not-indicated

## aliases
Septic arthritis treatment
Blood transfusion not indicated in septic arthritis

## definition
Management of septic arthritis is joint drainage/aspiration plus appropriate systemic antibiotics (and analgesia). Blood transfusion is not part of standard septic-arthritis management — it treats a separate, unrelated indication if one exists, not the joint infection itself.

## explicit_objective
Identify blood transfusion as NOT part of standard septic-arthritis management, distinguishing genuine treatment steps (drainage, antibiotics) from an unrelated intervention.

## pitfalls
Treating any serious-sounding hospital intervention listed among the options as plausibly "part of management" — the exclusion turns on whether the option treats the joint infection, not on how medically serious it sounds.

## concept_type
management

## status
Draft

## subject
msk

## topic
Musculoskeletal system

## subtopic
Septic arthritis

## universities
must

## learner_years
5

## modules
MUST-MED501

## module_subject
MUST-MED501 > Rheumatology and Immunology > Septic arthritis

## exam_weight_by_year
MUST_Y5=0.5

## clinical_relevance
0.6

## academic_relevance
0.4

## confidence
0.75

## support_mode
direct_statement

## exam_signal
src_23cd28c5b092d029d0af | mcq_bank | | B03
src_a51388c9442af6f01df5 | lecture | | p1-2

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs run for "septic arthritis" — no hit.
exam_signal: The local lecture's joint-aspiration table (p1-2) names purulent fluid as diagnostic of septic arthritis but does not carry its own management-drug list in the pages read for this batch — the blood-transfusion exclusion is bank-printed (B03), standard teaching; confidence set accordingly (0.75).

---

# Item

## id
CON-MSK-8F9C7C223F3410

## article_ids
ART-MSK-MUST-MED501-SERONEGATIVE-SPONDYLOARTHROPATHIES

## label
Reiter's syndrome is a seronegative spondyloarthropathy, not a feature or association of scleroderma

## canonical_key
scleroderma.differential.reiters-not-a-feature

## aliases
Scleroderma differential
Reiter's syndrome vs scleroderma

## definition
Reiter's syndrome (reactive arthritis) is a seronegative spondyloarthropathy — associated with preceding Chlamydia trachomatis or enteric infection, asymmetric oligoarthritis, conjunctivitis and mucocutaneous lesions — and is not a feature or association of scleroderma (systemic sclerosis), which is a separate connective-tissue disease with its own distinct manifestations (Raynaud's phenomenon, skin fibrosis, oesophageal dysmotility, pulmonary/renal/cardiac involvement).

## explicit_objective
Recognise Reiter's syndrome as belonging to the seronegative-arthritis family, not to scleroderma, when asked which of several listed features is NOT a feature or association of scleroderma.

## pitfalls
Grouping every rheumatological-sounding diagnosis together — Reiter's and scleroderma are classified and managed under entirely separate disease families (seronegative spondyloarthropathy vs. connective tissue disease) despite both appearing in the same rheumatology curriculum.

## concept_type
classification

## status
Draft

## subject
msk

## topic
Musculoskeletal system

## subtopic
Scleroderma

## universities
must

## learner_years
5

## modules
MUST-MED501

## module_subject
MUST-MED501 > Rheumatology and Immunology > Scleroderma

## exam_weight_by_year
MUST_Y5=0.5

## clinical_relevance
0.45

## academic_relevance
0.55

## confidence
0.85

## support_mode
direct_statement

## exam_signal
src_23cd28c5b092d029d0af | mcq_bank | | B04
src_a51388c9442af6f01df5 | lecture | | p25

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs run for "Reiter" and "reactive arthritis" — no hit.

---

# Item

## id
CON-MSK-15D2DA4BEA0048

## article_ids
ART-MSK-MUST-MED501-OA-SEPTIC-CTD

## label
Beta-blockers are avoided in Raynaud's phenomenon because their vasoconstrictor effect can precipitate or worsen attacks

## canonical_key
raynaudsphenomenon.management.avoid-beta-blockers

## aliases
Raynaud's phenomenon management
Avoid beta-blockers in Raynaud's

## definition
Raynaud's phenomenon is episodic vasospasm of the digital arteries. Treatment avoids vasoconstricting drugs — beta-blockers in particular are avoided (or stopped) because their vasoconstrictor effect can precipitate or worsen attacks — favouring vasodilators such as nifedipine instead.

## explicit_objective
Identify beta-blockers as the drug class to avoid in a patient with Raynaud's phenomenon, and recall vasodilators (e.g. nifedipine) as the treatment used instead.

## pitfalls
Treating beta-blockers as simply "another antihypertensive option" in a Raynaud's patient — their vasoconstrictor action is specifically counterproductive here, unlike most other antihypertensive classes.

## concept_type
management

## status
Draft

## subject
msk

## topic
Musculoskeletal system

## subtopic
Raynaud's phenomenon

## universities
must

## learner_years
5

## modules
MUST-MED501

## module_subject
MUST-MED501 > Rheumatology and Immunology > Raynaud's phenomenon

## exam_weight_by_year
MUST_Y5=0.5

## clinical_relevance
0.6

## academic_relevance
0.4

## confidence
0.75

## support_mode
direct_statement

## exam_signal
src_23cd28c5b092d029d0af | mcq_bank | | B06
src_a51388c9442af6f01df5 | lecture | | p21

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs run for "Raynaud" — no hit.
exam_signal: The local lecture's Raynaud's treatment section (p21) names vasodilators (nifedipine, prazosin) as therapy but does not independently restate the beta-blocker exclusion in the pages read — this fact is bank-printed (B06), standard teaching; confidence set accordingly (0.75).

---

# Item

## id
CON-MSK-62481C7639A017

## article_ids
ART-MSK-MUST-MED501-GOUT-AND-PSEUDOGOUT

## label
Gout's gold-standard investigation is joint aspiration with polarized-light crystal microscopy; serum uric acid is a supportive, not diagnostic, test

## canonical_key
gout.investigation.joint-aspiration-crystal-microscopy-and-uric-acid

## aliases
Gout diagnosis
Joint aspiration and polarized microscopy in gout
Serum uric acid in gout

## definition
Joint aspiration examined by polarized-light microscopy is the gold-standard investigation for gout, demonstrating needle-shaped, negatively birefringent monosodium urate crystals in the synovial fluid — this definitively confirms the diagnosis and distinguishes gout from pseudogout (rhomboid, positively birefringent calcium pyrophosphate crystals). Serum uric acid is typically raised in gout (normal roughly 2-7 mg%) and is a useful supportive investigation, but it is neither as specific nor as diagnostic as crystal microscopy, since levels can be normal during an acute attack or elevated in asymptomatic hyperuricaemia without gout.

## explicit_objective
Rank joint aspiration with polarized-light crystal microscopy above serum uric acid as the gold-standard versus supportive investigation for gout, and recognise the crystal appearance (needle-shaped, negatively birefringent) that confirms it.

## pitfalls
Treating serum uric acid as sufficient on its own to confirm gout — a normal level during an acute attack does not exclude gout, and a raised level without symptoms does not diagnose it; only crystal visualisation is definitive.

## concept_type
investigation

## status
Draft

## subject
msk

## topic
Musculoskeletal system

## subtopic
Gout

## universities
must

## learner_years
5

## modules
MUST-MED501

## module_subject
MUST-MED501 > Rheumatology and Immunology > Gout

## exam_weight_by_year
MUST_Y5=0.75

## clinical_relevance
0.8

## academic_relevance
0.6

## confidence
0.9

## support_mode
direct_statement

## exam_signal
src_92c2608c239affc24b1f | mcq_bank | | A07
src_92c2608c239affc24b1f | mcq_bank | | A09
src_23cd28c5b092d029d0af | mcq_bank | | B09
src_a51388c9442af6f01df5 | lecture | | p1-2
src_a51388c9442af6f01df5 | lecture | | p33

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs run for "gout" and "joint aspiration" — no live/local hit teaching this exact investigation-hierarchy objective. A Helwan Y1 record (codex/helwan-year1-content, docs/Helwan-Source-Imports/concept/HU-LCS-103-family163-q15-28-concepts.md) prints this same fact under id CON-REN-B9E0531973510E, but that id is ALREADY LIVE-CORPUS as an unrelated Kasr biochemistry concept ("secondary metabolic gout" causes — cancer/leukaemia/psoriasis via increased purine catabolism, docs/import-ready/concept/103-BMS-biochemistry-concepts.md and 103-BMS-mcq-purine-concepts.md) — a genuine cross-lane id collision, not this lane's error, caught by gate.mjs simulate resolving to the wrong record. Not reused for that reason; minted fresh here instead. See ../pending-live/MUST-MED501-concepts.md's header for the full note, flagged to the chief of staff to route to Helwan's own lane.
