<!--
  O6U-IPH-108 -- pending-live sparse CONCEPT overlay, three hits from Kasr
  108-INT-concepts-pharmacology.md, reused per 00-START-HERE.md §3/§4
  (search-before-mint). "pending" is LIVE in Kasr's own production import
  queue, ahead of this checkout's local server/data/medical-library-v1.json
  snapshot (confirmed absent from live by direct grep) -- find-existing.mjs
  and medical:simulate see these three only in Kasr's own unimported batch
  file named below. Apply this file ONLY after the named source concept file
  is live.

  Search covered find-existing.mjs on "route of administration", "oral route
  absorption", "sublingual route", "first pass metabolism", "intravenous
  route advantages", "intramuscular injection", "subcutaneous injection",
  "transdermal patch", "nasal drug administration", "alkaloid", "glycoside",
  "resin drug", "volatile oil", "narcotic prescription", "eye drop shelf
  life", "atropine sulfate solubility", "dry powder inhaler", "topical
  dosage form", "depot preparation" -- plus a direct grep of Kasr
  108-INT-concepts-pharmacology.md (the dispatch's named likely-overlap
  module) for "sublingual", "subcutaneous", "intramuscular", "nasal",
  "inhaler", "MDI", "alkaloid", "glycoside", "liniment", "ointment",
  "transdermal". Three genuine hits found, all in that one 108-INT file's
  "Routes of Drug Administration" section; no hit anywhere for the other
  eleven new concepts this cluster mints (IV/IM/SC/transdermal/nasal-route
  specifics, dosage-form terminology, inhaler devices, alkaloids, plant drug
  classes, astringents, narcotic prescriptions, eye drop storage, salt-form
  solubility, local-vs-systemic action) -- 108-INT's routes coverage is a
  higher-level pharmacokinetic classification, not the practical-pharmacy
  specifics this cluster's source tests.

  Source file:
    A. docs/Kasr-Source-Imports/concept/108-INT-concepts-pharmacology.md -- university kau, module 108 INT (Year 1)

  Simulate together with the source file:
  npm run medical:simulate -- docs/6October-Source-Imports/pending-live/O6U-IPH-108-overlay-concepts.md \
    --with docs/Kasr-Source-Imports/concept/108-INT-concepts-pharmacology.md \
    --emit /tmp/sim-O6U-IPH-108-pending-concepts.json
-->

# Item

## id
CON-FND-6A60CE8D2E7C5C

## label
Routes of administration divide into enteral, parenteral and topical, and the route chosen is a kinetic decision before it is a practical one

## universities
+o6u

## learner_years
+1

## modules
+O6U-IPH-108

## module_subject
O6U-IPH-108 > Practical Pharmacology > Routes of Drug Administration > Enteral/parenteral/topical classification
108 INT > Pharmacology > Routes of Drug Administration and Dosage Forms

## field_notes
o6u: Reused for the practical bank's Q32 ("Parenteral administration ... The correct
answer is: Usually produces a more rapid response than oral administration") -- the general
enteral/parenteral/topical classification and its onset-speed prediction is exactly this
concept's own explicit_objective. Sourced from "all Practical pharma questions
_compressed.pdf" (coverage/O6U-IPH-108-triage.md).

---

# Item

## id
CON-FND-3CC8853A7D6DA8

## label
The oral route is the safest and most convenient, and its price is the first pass, slow onset and dependence on a co-operative gut

## universities
+o6u

## learner_years
+1

## modules
+O6U-IPH-108

## module_subject
O6U-IPH-108 > Practical Pharmacology > Routes of Drug Administration > Oral route
108 INT > Pharmacology > Routes of Drug Administration and Dosage Forms > Oral and first-pass

## field_notes
o6u: Reused for the practical bank's Q19 ("What is characteristic of the oral route? ...
The correct answer is: Absorption depends on GI tract secretion and motor function") --
this concept's own definition already covers the oral route's dependence on gut
co-operation. Sourced from "all Practical pharma questions _compressed.pdf"
(coverage/O6U-IPH-108-triage.md).

---

# Item

## id
CON-FND-CF40F32A8A74A0

## label
Bioavailability is the fraction of an oral dose that reaches the systemic circulation, and first-pass metabolism is what removes the rest

## universities
+o6u

## learner_years
+1

## modules
+O6U-IPH-108

## module_subject
O6U-IPH-108 > Practical Pharmacology > Routes of Drug Administration > Sublingual route escapes first-pass
108 INT > Pharmacology > Bioavailability and First-Pass Metabolism

## field_notes
o6u: Reused for the practical bank's Q21 ("The main reason for administering nitroglycerin
in angina pectoris by sublingual route is ... The correct answer is: To avoid first pass
metabolism"), which is this concept's own core distinction. Sourced from "all Practical
pharma questions _compressed.pdf" (coverage/O6U-IPH-108-triage.md).

---
