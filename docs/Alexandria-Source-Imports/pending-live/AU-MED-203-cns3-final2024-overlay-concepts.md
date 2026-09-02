# AU-MED-203 · Nervous System · Week 2 EOM Final — sparse update against 1 ASU-CNS-3
# neuroanatomy concept that is not yet live (HIT-PENDING against an unimported
# sibling-university batch, LANE-BRIEF §16 rule 1; LANE-CARD-Y2 §6: "check ASU-CNS-3 first,
# reuse via sparse overlay with tag additions only — never a twin, never a short module_subject
# on an overlay row"). Apply only after
# docs/Ain-Shams-Source-Imports/concept/ASU-CNS-3-final2024-mcq-concepts.md is live (a different
# ASU-CNS-3 source file from the one lane 6's AU-MED-203-cns3-overlay-concepts.md depends on —
# kept as its own file pair rather than merged, so the two apply-after conditions are never
# conflated). Do not import from this folder directly — see pending-live/INDEX.md for the exact
# ordering line per record.
#
# Validate with:
#   node scripts/content/gate.mjs batch docs/Alexandria-Source-Imports/pending-live/AU-MED-203-cns3-final2024-overlay-concepts.md \
#     --with docs/Ain-Shams-Source-Imports/concept/ASU-CNS-3-final2024-mcq-concepts.md
# (fails without --with, passes with it — the correct, expected state for a sparse update.)

# Item

## id
CON-NEU-44845BF496BE5F

## label
The trochlear nerve and the superior cerebellar peduncle both decussate at the inferior (inferior collicular) level of the midbrain

## universities
+au

## modules
+AU-MED-203

## learner_years
+2

## field_notes
examSignal: Tested by AU-MED-203 Week 2 EOM Final (src_70b2ac8853db17b047ea, p2 q5 — "Which of the following cranial nerves originates from Contralateral nucleus to its side? ... a. Trochlear nerve") — the same fact this ASU-CNS-3 concept already teaches (the trochlear nerve's fibres decussate before exiting the dorsal midbrain, so the nerve effectively originates from a nucleus contralateral to the side it supplies). Recorded as an update, not a new mint, because the underlying testable claim is identical; verified via find-existing.mjs ("trochlear nerve") before minting was even considered — no closer AU-MED-203 candidate than this ASU-CNS-3 record exists (the module's own trochlear-nerve concepts cover dural entry point, oculomotor-vs-trochlear position and muscle target, not this decussation fact). AU-MED-203's own Quiz 1/2 anatomy article (`article/AU-MED-203-anatomy-articles.md`) cannot be listed in this concept's own `article_ids` (that stays ASU-CNS-3's article, which this lane does not own), so the reciprocal link lives on the question side instead (see `AU-MED-203-cns3-final2024-overlay-questions.md`).
