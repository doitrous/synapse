# AU-MED-102 · Biochemistry · Structural chemistry (CHO/lipid/protein/enzymes) — sparse updates
# against Kasr Year 1 concepts that are not yet live (HIT-PENDING, LANE-BRIEF §16 rule 1).
# Apply only after the named Kasr file is live. Do not import from this folder directly —
# see pending-live/INDEX.md for the exact ordering line per record.
#
# Validate with:
#   npm run medical:batch -- docs/Alexandria-Source-Imports/pending-live/AU-MED-102-biochem-structural.md --with docs/Kasr-Source-Imports/concept/102-INT-concepts.md
# (fails without --with, passes with it — that is the correct, expected state per the
# chief of staff's 2026-08-22 note on brief §19.)

# Item

## id
CON-GIT-9589A7077392FD

## label
Cellulose is undigestible because its glucose units are joined by β1,4 bonds, so it acts as dietary bulk that prevents constipation and delays fat absorption

## universities
+au

## modules
+AU-MED-102


## learner_years
+1

## field_notes
examSignal: Tested by AU-MED-102 Biochemistry's CHO Chemistry MCQ bank (src_9722b2289d25d8c796ab, Q15/Q26/Q46/Q48 — cellulose's β-glucosidic linkage, indigestibility by amylase, and non-digestibility) and the AFM master bank's CHO Chemistry section (src_01ab4268402d32d4d111) — the same fact this Kasr concept already teaches (β1,4-linked glucose, resistant to amylase, dietary bulk). Recorded as an update, not a new mint, because the underlying testable claim is identical; AU-MED-102's own article (`article/AU-MED-102-biochem-structural-articles.md`) references this id via its notes rather than re-teaching it, since this lane cannot edit `docs/Kasr-Source-Imports/article/102-INT-biochemistry.md`, which already owns the teaching prose.

---

# Item

## id
CON-FND-2414B3639FD4D3

## label
Denaturation ruptures the bonds holding secondary, tertiary and quaternary structure, leaving the primary sequence intact but the protein insoluble, more viscous, more digestible and biologically dead

## universities
+au

## modules
+AU-MED-102


## learner_years
+1

## field_notes
examSignal: Tested by AU-MED-102 Biochemistry's Protein MCQ bank (src_4852d425a88297af190e, Q18/Q23/Q45/Q63 — which structural level survives denaturation) — the same fact this Kasr concept already teaches (non-covalent bonds broken, primary sequence intact, protein becomes insoluble/more digestible/inactive). Recorded as an update, not a new mint, because the underlying testable claim is identical. AU-MED-102's own Protein Chemistry article (`article/AU-MED-102-biochem-structural-articles.md`) teaches this fact in its Mechanism section and names this id in `related_concepts`/an annotation, per brief §22's two-sided coverage rule — this lane cannot edit `docs/Kasr-Source-Imports/article/102-INT-biochemistry.md`, which is this concept's live `article_ids` home.
