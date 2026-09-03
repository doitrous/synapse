# AU-MED-203 · Nervous System · Week 2 EOM Final (Q61-120) — sparse update against 1
# ASU-CNS-3 physiology concept that is not yet live (HIT-PENDING against an unimported
# sibling-university batch, LANE-BRIEF §16 rule 1; LANE-CARD-Y2 §6: "check ASU-CNS-3 first,
# reuse via sparse overlay with tag additions only — never a twin, never a short module_subject
# on an overlay row"). Apply only after docs/Ain-Shams-Source-Imports/concept/ASU-CNS-3-physio-mcq-concepts.md
# is live. Do not import from this folder directly — see pending-live/INDEX.md for the exact
# ordering line per record.
#
# Validate with:
#   node scripts/content/gate.mjs batch docs/Alexandria-Source-Imports/pending-live/AU-MED-203-cns3-physio-overlay-concepts.md \
#     --with docs/Ain-Shams-Source-Imports/concept/ASU-CNS-3-physio-mcq-concepts.md
# (fails without --with, passes with it — the correct, expected state for a sparse update.)

# Item

## id
CON-NEU-A873F557A4465C

## label
The periaqueductal gray produces analgesia via enkephalinergic neurons

## universities
+au

## modules
+AU-MED-203

## learner_years
+2

## field_notes
examSignal: Tested by AU-MED-203 Nervous System Week 2 EOM Final (src_70b2ac8853db17b047ea, p22 q103 — "The density of opiate receptors is high in: ... d. A & b" [periaqueductal grey and nucleus raphe magnus]; p22 q104 — descending pain control sequence starting at the periaqueductal grey; p24 q119 — enkephalin release as part of the endogenous opioid system) — the same fact this ASU-CNS-3 concept already teaches (the periaqueductal grey's enkephalinergic neurons produce descending analgesia via the nucleus raphe magnus relay). Recorded as an update, not a new mint, because the underlying testable claim is identical; verified via find-existing.mjs ("enkephalin" -> ASU-CNS-3 physio hit among others) before minting was even considered. AU-MED-203's own Quiz 1/2 physiology article (`article/AU-MED-203-physiology-articles.md`) cannot be listed in this concept's own `article_ids` (that stays ASU-CNS-3's article, which this lane does not own), so the reciprocal link lives on the question side instead (see `AU-MED-203-cns3-physio-overlay-questions.md`). Reused by three questions from the same paper (q103, q104, q119), one overlay row covers all three. This is a new overlay file pair (not an append to the existing `AU-MED-203-cns3-overlay-concepts.md`) because its base source is a different ASU-CNS-3 file (`ASU-CNS-3-physio-mcq-concepts.md`, not `-anatomy-mcq-concepts.md`).
