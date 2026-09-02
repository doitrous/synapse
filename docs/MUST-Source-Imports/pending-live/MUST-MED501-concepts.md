<!--
  MUST-MED501 (Rheumatology & Immunology) — pending-live sparse CONCEPT
  overlay, written per TRIAGE APPROVED condition 2 (second search before
  minting the triage's 28 "new" rows).

  Six of those 28 rows turned out to already exist as full records in other
  lanes' unimported batches — five on Helwan Year 1's own branch
  (codex/helwan-year1-content, docs/Helwan-Source-Imports/concept/), which is
  NOT merged into this branch (docs/Helwan-Source-Imports/ here holds only a
  LANE-CARD.md stub — confirmed by listing before writing anything), and one
  in docs/import-ready/concept/ASU-IBM-biochem-mcq-concepts.md, which IS
  present in this tree. Per 00-START-HERE.md §3 "the concept-id overlay rule":
  a hit only in another lane's unimported batch is a sparse update written
  here, applied only after the named source file is live/merged — this file
  does not attempt to gate or simulate against the five Helwan-sourced ids,
  since their full records are not resolvable in this branch at all; it is a
  documentary hold for whoever lands Helwan Y1 or does the eventual MUST
  cross-university reconciliation. The one ASU-sourced id below IS
  resolvable locally and gate.mjs batch was in fact run against it (see
  question/MUST-MED501-source-a-mcq.md's gate log).

  Corrected split (reported in full to the chief of staff): of the triage's
  29 concept rows (0 live / 1 pending / 28 new), 7 of the 28 "new" rows are
  actually hits on 5 distinct existing ids (rows 2+3 share one Helwan record;
  rows 7+8 share another) — leaving 21 genuinely new + the original 1 ASU
  pending + these 5 Helwan pendings = 6 reused ids total, 20 authored as new
  concepts (the 21st, row 25's RF-immunoglobulin-class fact, is held per the
  printed-key conflict and not minted this pass — see the question seed hold).

  Helwan ids below were read via `git show codex/helwan-year1-content:...`
  (Helwan's concept dir listed first, per the dispatch instruction) — full
  records copied verbatim for my own reading to
  /private/tmp/.../scratchpad/helwan-joint/*.md (not committed; session-local).

  CROSS-LANE ID COLLISION FOUND, flagged to the chief of staff, not silently
  worked around: Helwan's own docs/Helwan-Source-Imports/concept/HU-LCS-103-
  family163-q15-28-concepts.md prints `## id CON-REN-B9E0531973510E` on a
  record labelled "Gout produces needle-shaped negatively birefringent urate
  crystals and hyperuricaemia" — but that exact id is ALREADY LIVE-CORPUS
  (pending, in docs/import-ready/concept/103-BMS-biochemistry-concepts.md and
  103-BMS-mcq-purine-concepts.md, both also mirrored in docs/Kasr-Source-
  Imports) as an UNRELATED biochemistry concept: "cancer, leukaemia and
  psoriasis cause secondary metabolic gout through increased purine
  catabolism" (canonical_key `teaching.bio2.secondary-metabolic-gout` on the
  Kasr side). `gate.mjs simulate` caught this the hard way — not as a missing-
  id error, but as a *silent* resolve to the wrong concept, only visible on
  inspecting which record actually owns that id. Not used here: this lane
  instead minted its own fresh id, CON-MSK-62481C7639A017 (canonical key
  `gout.investigation.joint-aspiration-crystal-microscopy-and-uric-acid`),
  authored as a full new record in ../concept/MUST-MED501-rheumatology-
  concepts.md, covering A07/A09/B09. Whether Helwan's own record needs a
  remint is Helwan's lane's call, not this one's — flagged here for the chief
  of staff to route.
-->

# Item

## id
CON-MSK-F6F560B9332DCB

## universities
+must

## learner_years
+5

## modules
+MUST-MED501

## module_subject
HU-LCS-103 > Integrated Musculoskeletal Assessment
MUST-MED501 > Rheumatology and Immunology > Rheumatoid arthritis

## exam_weight_by_year
MUST_Y5=0.75

## exam_signal
src_92c2608c239affc24b1f | mcq_bank | | A01

## field_notes
must: Source A "Anti-CCP antibodies most associated with -> a) Rheumatoid arthritis" (A01) tests exactly this Helwan record's "anti-citrullinated peptide is the positive serologic response in rheumatoid arthritis" fact. Target: Helwan Year 1, codex/helwan-year1-content, docs/Helwan-Source-Imports/concept/HU-LCS-103-family163-q59-73-concepts.md (status: under review, not live — apply this overlay only after that branch lands).

---

# Item

## id
CON-MSK-CFE4B805DB79CC

## universities
+must

## learner_years
+5

## modules
+MUST-MED501

## module_subject
HU-LCS-103 > Integrated Musculoskeletal Assessment
HU-LCS-96 > Joint Pathology
MUST-MED501 > Rheumatology and Immunology > Rheumatoid arthritis

## exam_weight_by_year
MUST_Y5=0.7

## exam_signal
src_92c2608c239affc24b1f | mcq_bank | | A02
src_92c2608c239affc24b1f | mcq_bank | | A03

## field_notes
must: This Helwan record's own definition ("prolonged stiffness and swelling of hands and wrists ... rheumatoid-factor elevation in several unrelated diseases") independently teaches both A02 ("Typical feature of RA -> Prolonged morning stiffness") and A03 ("True about RF except -> seronegative excluded from RA") — one record answering two triage rows, per the tiebreaker rule in 00-START-HERE.md §4. Target: Helwan Year 1, codex/helwan-year1-content, docs/Helwan-Source-Imports/concept/HU-LCS-103-family143-q1-13-joint-concepts.md and HU-LCS-103-family96-joint-pathology-concepts.md (same id, two local restatements; status: under review, not live).

---

# Item

## id
CON-MSK-5AD256E28E4183

## universities
+must

## learner_years
+5

## modules
+MUST-MED501

## module_subject
HU-LCS-103 > Integrated Musculoskeletal Assessment
HU-LCS-96 > Joint Pathology
MUST-MED501 > Rheumatology and Immunology > Osteoarthritis

## exam_weight_by_year
MUST_Y5=0.5

## exam_signal
src_92c2608c239affc24b1f | mcq_bank | | A13

## field_notes
must: This Helwan record's own definition ("distal interphalangeal disease produces hard painless Heberden nodes") directly answers A13 ("Heberden nodules seen in -> Osteoarthritis"). Target: Helwan Year 1, codex/helwan-year1-content, docs/Helwan-Source-Imports/concept/HU-LCS-103-family143-q1-13-joint-concepts.md (status: under review, not live). Bouchard's nodes (this batch's new CON-MSK-0F7D1D6A7DACC2, PIP joint) is cross-linked via related_concept_ids rather than merged into this record — different eponym, different joint.

---

# Item

## id
CON-MSK-8A2645A63ADA75

## universities
+must

## learner_years
+5

## modules
+MUST-MED501

## module_subject
HU-LCS-103 > Integrated Musculoskeletal Assessment
MUST-MED501 > Rheumatology and Immunology > Pseudogout

## exam_weight_by_year
MUST_Y5=0.5

## exam_signal
src_92c2608c239affc24b1f | mcq_bank | | A22

## field_notes
must: This Helwan record's own definition ("pseudogout is inflammatory joint disease caused by calcium pyrophosphate deposition ... keys calcium pyrophosphate deposition as the feature favouring pseudogout over gout") directly answers A22 ("Pseudogout (chondrocalcinosis) crystal -> Calcium pyrophosphate dihydrate"). Target: Helwan Year 1, codex/helwan-year1-content, docs/Helwan-Source-Imports/concept/HU-LCS-103-family143-q14-25-joint-concepts.md (status: under review, not live).

---

# Item

## id
CON-FND-9D3DE90B645E7A

## universities
+must

## learner_years
+5

## modules
+MUST-MED501

## module_subject
ASU-IBM > Biochemistry > Questions > Lipids & Biological Membrane
MUST-MED501 > Rheumatology and Immunology > Antiphospholipid syndrome

## exam_weight_by_year
MUST_Y5=0.6

## exam_signal
src_92c2608c239affc24b1f | mcq_bank | | A16

## field_notes
must: This ASU-IBM record's own definition ("antibodies form against acidic (negatively charged) phospholipids, predisposing to thrombosis and pregnancy complications") directly answers A16 ("30yo woman DVT + recurrent abortion Hx, low platelets -> Antiphospholipid antibodies"). Target: docs/import-ready/concept/ASU-IBM-biochem-mcq-concepts.md (status: under review, subject `pharm`, not live) — present in this tree, and gate.mjs batch was run for this batch with `--with docs/import-ready/concept/ASU-IBM-biochem-mcq-concepts.md`.
