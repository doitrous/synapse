<!--
  O6U-IPA-107 -- pending-live sparse CONCEPT overlay, one hit from Pathology Q Bank.pdf's
  neoplasia T/F section, reused per 00-START-HERE.md §3/§4 (search-before-mint). "pending"
  is LIVE in Kasr's own production import queue, ahead of this checkout's local
  server/data/medical-library-v1.json snapshot -- find-existing.mjs and medical:simulate see
  it only in the sibling university's own unimported batch file named below. Apply this file
  ONLY after the named source concept file is live.

  This was the ONLY genuine reuse hit this pass, out of an extensive search across Kasr
  108-INT-concepts-pathology.md, 104-CPS's anatomy/physiology/histology files, 208-INT-
  concepts.md, and both ASU-INF microbiology files -- the coordinator's steer toward those as
  likely overlaps did not pan out for this cluster's specific hemodynamics/infectious-
  pathology/neoplasia content (see coverage/O6U-IPA-107-triage.md's "search findings" note).

  Source file:
    A. docs/Kasr-Source-Imports/concept/208-INT-concepts.md -- university kau, module 208 INT (Year 2)

  Simulate together with the source file:
  npm run medical:simulate -- docs/6October-Source-Imports/pending-live/O6U-IPA-107-overlay-concepts.md \
    --with docs/Kasr-Source-Imports/concept/208-INT-concepts.md \
    --emit /tmp/sim-O6U-IPA-107-pending-concepts.json
-->

# Item

## id
CON-FND-D75B95517F50CF

## label
Anaplasia (cellular and nuclear pleomorphism, loss of polarity, abnormal mitoses) grades a malignant tumor’s differentiation, and worse differentiation means faster growth and more anaplasia, not less

## universities
+o6u

## learner_years
+1

## modules
+O6U-IPA-107

## module_subject
O6U-IPA-107 > General Pathology > Neoplasia
208 INT > General Pathology > Neoplasia > Grading

## field_notes
o6u: Tested as T/F 33 (p400): "cellular anaplasia means changes in cellular morphology and
loss of polarity" (true), Pathology Q Bank.pdf, per its own printed T/F answers. Cross-year
hit (208 INT is Kasr Year 2) -- concept ids are university-blind and year-blind, so this
still counts as a genuine reuse per 00-START-HERE.md §4.

---
