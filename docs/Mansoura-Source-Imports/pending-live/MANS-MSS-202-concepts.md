<!--
  Sparse updates only. Every ## id below targets a concept that exists ONLY in an
  unimported Kasr Year 1 or Alexandria Year 1 batch -- none of these ids are in
  server/data/medical-library-v1.json yet (checked directly, 2026-09-02). Apply each
  record ONLY after its target file (named per record) is live.

  `## label` and `## canonical_key` are written on every row (a filled label makes
  the batch validator's stub-create check treat the row as a full authoring attempt
  rather than an update, and an update row silent on `## label` blanks the live
  concept's real label on merge).

  Unlike the HIS-203 lane's own precedent (which restates module_subject in full),
  `## module_subject` is DELIBERATELY OMITTED from every row here: verified
  directly against `scripts/validate-content-batch.mjs` (not the header-comment
  claim in MANS-HIS-203-concepts.md, which itself does not actually pass this
  check when re-run) that module_subject validates against the fields THIS ROW
  declares, not the merge target's -- so both "restate the original line" (module
  not in this row's own append-only `## modules`) and "restate only the new line"
  (silently erases the Kasr/AU placement on merge, since module_subject is not
  append-safe) fail. Omitting the field entirely leaves the live record's existing
  module_subject completely untouched by this update, which is the only option
  that neither errors nor erases -- the per-row field_notes below say which pages
  test each concept, in place of a module_subject line.

  `## universities`, `## modules` and `## learner_years` are append-safe list
  columns (optionalList/importList): `+mans`, `+MANS-MSS-202`, `+1` add without
  disturbing kau/au or the existing 101 ISK / AU-MED-105 modules and learner years.

  One live concept (glenoid labrum, CON-MSK-F17F226A520EC5) is reused directly in
  the question overlay with NO overlay row here, per this lane's own precedent
  (MANS-HIS-203-triage.md's chemotaxis/opsonins reuse) that a live target needs
  no overlay.

  Lane MANS-MSS-202-author1. Gate is `medical:batch` with every target file named
  via --with -- run once without --with (expect the "does not exist" refusal) and
  once with (expect a clean pass); these `## id`s are not live, so `medical:simulate`
  cannot resolve them yet and is not the gate here:

  node scripts/validate-content-batch.mjs "docs/Mansoura-Source-Imports/pending-live/MANS-MSS-202-concepts.md" \
    --with docs/Kasr-Source-Imports/concept/101-ISK-concepts.md \
    --with docs/Alexandria-Source-Imports/concept/AU-MED-105-anatomy-concepts.md
-->

# Item

## id
CON-MSK-24E318F2E3F18E

## canonical_key
long-thoracic-nerve-serratus-anterior-winging

## label
Injury to the long thoracic nerve at mastectomy paralyses serratus anterior, winging the scapula

## universities
+mans

## modules
+MANS-MSS-202

## learner_years
+1

## field_notes
universityNotes: mans: MSS Past Years.pdf tests this concept twice — p.2's mastectomy vignette (winging of scapula, keyed A, long thoracic nerve) and p.3's "root values of the long thoracic nerve = C5,C6,C7" (keyed A) — both authored against this same concept.

---

# Item

## id
CON-MSK-EE022A2043C10F

## canonical_key
axillary-nerve-injury-shoulder-dislocation

## label
Shoulder dislocation endangers the axillary nerve, costing deltoid and teres minor

## universities
+mans

## modules
+MANS-MSS-202

## learner_years
+1

## field_notes
universityNotes: mans: MSS Past Years.pdf tests this concept twice — p.21's "muscles innervated by the axillary nerve" (keyed E, deltoid and teres minor) and p.21's "lesion of axillary nerve causes" (keyed B, flat shoulder) — both authored against this same concept.

---

# Item

## id
CON-MSK-9B52018C4649BD

## canonical_key
carpal-tunnel-median-nerve-compression

## label
Carpal tunnel syndrome is the median nerve compressed under the flexor retinaculum

## universities
+mans

## modules
+MANS-MSS-202

## learner_years
+1

## field_notes
universityNotes: mans: MSS Past Years.pdf tests this concept twice — p.4's "deformity from median nerve injury" (keyed D, ape hand deformity, this concept's own label) and p.21's "carpal tunnel syndrome, nerve involved" (keyed A, median nerve) — both authored against this same concept.

---

# Item

## id
CON-MSK-F125616F7ED37A

## canonical_key
musculocutaneous-nerve-origin-course-branches

## label
The musculocutaneous nerve leaves the lateral cord, pierces coracobrachialis, and ends as a skin nerve

## universities
+mans

## modules
+MANS-MSS-202

## learner_years
+1

## field_notes
universityNotes: mans: MSS Past Years.pdf p.21 tests "which nerve is a branch of the lateral cord" (keyed C, musculocutaneous nerve), authored against this concept's origin fact.

---

# Item

## id
CON-MSK-77C8DFCB26299F

## canonical_key
wrist.carpal-bones-scaphoid-fracture-and-pisiform-sesamoid

## label
The scaphoid is the most commonly fractured carpal bone (classically after a fall on the outstretched hand, with its distal-entering blood supply putting the proximal fragment at risk of avascular necrosis), and the pisiform is the carpal sesamoid bone, embedded in the tendon of flexor carpi ulnaris

## universities
+mans

## modules
+MANS-MSS-202

## learner_years
+1

## field_notes
universityNotes: mans: MSS Past Years.pdf p.34 tests a classic FOOSH + anatomical-snuffbox-tenderness vignette (keyed B, scaphoid), authored against this concept. The stem carries "(see photo)" but is fully answerable from text alone; held as a low-risk image caveat, not a blocker (see MANS-MSS-202-triage.md).
