<!--
  Sparse updates for AU-MED-106 (Physiology) onto concept ids that exist only in
  another lane's unimported batch (`docs/import-ready/concept/SYS-CVS-CONCEPT-T05.md`),
  per LANE-BRIEF.md §16 (mint freeze fully lifted, law 1) and §19 (an update-shaped row
  for an id that is not live and not in the same batch folder is an ERROR unless
  validated `--with` the file it targets).

  Validate with:
    npm run medical:batch -- docs/Alexandria-Source-Imports/pending-live/AU-MED-106-physiology.md \
      --with docs/import-ready/concept/SYS-CVS-CONCEPT-T05.md

  Do not apply this file until docs/import-ready/concept/SYS-CVS-CONCEPT-T05.md is live.
-->

# Item

## id
CON-CVS-AEC4F470747102

## label
A broad-complex tachycardia is ventricular tachycardia until proven otherwise

## universities
+au

## learner_years
+1

## modules
+AU-MED-106

## field_notes
targetFile: docs/import-ready/concept/SYS-CVS-CONCEPT-T05.md
source: Telegram bank (`Practical CVS Qs Bank, ASM Minds.pdf`, sourceId pending, Spot 43.3) tests "QRS complex is wide and abnormal in shape" for ventricular tachycardia, matching this record's own broad-complex idea; no content change needed.

---

# Item

## id
CON-CVS-4B1E9C05DA52C1

## label
Ventricular fibrillation produces no cardiac output

## universities
+au

## learner_years
+1

## modules
+AU-MED-106

## field_notes
targetFile: docs/import-ready/concept/SYS-CVS-CONCEPT-T05.md
source: Telegram bank (Spot 32.3) tests "heart rate in ventricular fibrillation is 350-500 beats/min" — the rate signature of this record's own disorganised-rhythm idea; no content change needed.
