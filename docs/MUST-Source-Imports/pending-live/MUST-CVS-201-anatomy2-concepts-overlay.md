<!--
  MUST-CVS-201 · pending-live sparse CONCEPT overlay (Anatomy tranche 4,
  author4).

  2 new concept ids, both pending in unimported batches — neither is in
  server/data/medical-library-v1.json (checked directly, not just via
  find-existing.mjs):

    A. docs/Kasr-Source-Imports/concept/104-CPS-anatomy-concepts.md — 1 id:
       CON-DEV-4E02B436616DC0, cardiac looping and dextrocardia. Anatomy2's
       HD-Q17 asks for "situs inversus" — dextrocardia plus a complete
       mirror-image reversal of the abdominal viscera — an extension of this
       concept's own dextrocardia definition rather than a fact stated
       verbatim in it; find-existing.mjs "situs inversus" returned no hit
       before this extension was chosen over a new mint. Different record
       from any id tranche 3 already overlaid onto this same source file.

    B. docs/import-ready/concept/SYS-CVS-CONCEPT-T08.md — 1 id:
       CON-CVS-4F97E55A041408, Eisenmenger physiology (shunt reversal from
       sustained pulmonary overcirculation). Same source file tranche 3
       already overlaid for Tetralogy of Fallot (CON-CVS-AF9212C18AAF03,
       still in pending-live/MUST-CVS-201-anatomy-concepts-overlay.md); this
       is a second, different record from that file, found via
       find-existing.mjs "eisenmenger" (2 hits, both pointing at this id).

  Sibling docs/MUST-Source-Imports/pending-live/MUST-CVS-201-anatomy2-questions.md
  carries the 50 MCQs from this tranche; 48 of them reuse the 20 concepts
  tranche 3 already overlaid in MUST-CVS-201-anatomy-concepts-overlay.md
  (no new overlay row needed for those), 1 uses the new CON-DEV id below, 1
  uses the new CON-CVS id below, and 1 (ESO-Q15, abdominal esophagus / left
  gastric artery) is a genuine new mint in concept/article/evidence records
  instead — not an overlay row, since no existing concept covers it. See
  that file's own header and pending-live/INDEX.md for the full apply order.

  Per 00-START-HERE.md §3 (module_subject fully replaces on every write —
  no '+' form there): the Kasr-source row restates its existing
  "104 CPS > …" line plus MUST-CVS-201's own; the SYS-CVS-CONCEPT-T08 row
  has no prior module_subject to restate (same as tranche 3's Tetralogy row
  in that file) so it writes only its own line. '## universities',
  '## learner_years' and '## modules' are true ID-list columns and take
  '+must' / '+2' / '+MUST-CVS-201'.

  Simulate together with the source file each block targets, e.g.:
    node scripts/content/gate.mjs simulate \
      docs/Kasr-Source-Imports/concept/104-CPS-anatomy-concepts.md \
      docs/import-ready/concept/SYS-CVS-CONCEPT-T08.md \
      docs/MUST-Source-Imports/pending-live/MUST-CVS-201-anatomy2-concepts-overlay.md
-->

# Item

## id
CON-DEV-4E02B436616DC0

## label
The primitive heart tube normally loops to the right; a leftward loop produces dextrocardia, and when the whole body's viscera mirror as well the combined condition is called situs inversus

## modules
+MUST-CVS-201

## module_subject
104 CPS > Anatomy > Development of the Heart
MUST-CVS-201 > Anatomy > Heart Development and Fetal Circulation > Cardiac Looping

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.4

## field_notes
must: Tested as Heart Development Q17, "Dextrocardia with complete mirror-image reversal of abdominal organs is called:" — printed answer: situs inversus. The concept's own definition (docs/Kasr-Source-Imports/concept/104-CPS-anatomy-concepts.md) states that a leftward, rather than the normal rightward, bend of the primitive heart tube produces dextrocardia, a mirror-image reversal of the heart's own chambers and vessels; it does not itself use the term "situs inversus" for the whole-body form, which is the standard extension applied in this question's explanation rather than a separately stated fact. find-existing.mjs "situs inversus" returned no hit, confirming no dedicated record exists to reuse instead. src_ac0704bd16ff99889463 p29.

---

# Item

## id
CON-CVS-4F97E55A041408

## label
Sustained pulmonary overcirculation can reverse a shunt permanently

## modules
+MUST-CVS-201

## module_subject
MUST-CVS-201 > Anatomy > Heart Development and Fetal Circulation > Congenital Shunt Physiology

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.5

## field_notes
must: Tested as Heart Development Q19, "In Eisenmenger's complex, the defects include:" — printed answer: ASD and pulmonary hypertension. This concept's own definition (docs/import-ready/concept/SYS-CVS-CONCEPT-T08.md, the Year-3 SYS-CVS congenital-heart-disease catalogue) already states the shunt-reversal mechanism the question tests: prolonged high pulmonary flow and pressure remodel the pulmonary arterioles irreversibly until pulmonary vascular resistance exceeds systemic resistance and the shunt reverses. This record carries no prior `module_subject` value in its source file — nothing to restate, so this row writes only MUST-CVS-201's own line, the same pattern tranche 3 used for the sibling Tetralogy of Fallot record in this file. `learner_years` on the live-pending record reads `3 | 4`; `+2` is appended here (unlike the Tetralogy record, which already read `2 | 3 | 4`). src_ac0704bd16ff99889463 p29.
