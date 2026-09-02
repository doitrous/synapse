# ASU-IMM sibling-merge overlay — sparse updates onto 4 LIVE kau (Kasr) concepts
# Fix owed from asu-imm-author9: that lane found these 4 live concepts via
# find-existing.mjs, judged a cross-university sparse update "risky" (no such rule
# exists — the law is one idea = one id across universities, reuse via sparse
# overlay, per 00-START-HERE.md §3 "Per-university traceability on shared records"),
# and minted 4 distinct ASU-scoped concepts instead. Those 4 mints are deleted from
# ASU-IMM-immunology-concepts.md; the 5 ASU questions that tested them (ch2 QST-ASU-IMM-168,
# ch4 QST-...-Q10, Q41, Q29, Q36) now carry these live ids as their main_concept.
#
# All 4 target ids are already LIVE (server/data/medical-library-v1.json), not
# HIT-PENDING — no "applies after" ordering needed. `exam_weight_by_year` is
# dropped (same as module_subject elsewhere in this pending-live convention: a
# leading "+" on that column is refused, the field has no additive semantics —
# confirmed by gate.mjs batch on this file). Validate with:
#   node scripts/content/gate.mjs simulate docs/Ain-Shams-Source-Imports/pending-live/ASU-IMM-sibling-merge-overlay-concepts.md docs/Ain-Shams-Source-Imports/concept/ASU-IMM-immunology-concepts.md docs/Ain-Shams-Source-Imports/question/ASU-IMM-hegazy-ch2-mcq.md docs/Ain-Shams-Source-Imports/question/ASU-IMM-hegazy-ch4-mcq.md

# Item

## id
CON-IMM-2AE767715E0D7D

## label
IL-1 is an important mediator of innate inflammatory responses

## universities
+asu

## modules
+ASU-IMM

## learner_years
+1

## field_notes
examSignal: Tested by ASU-IMM's hegazy.pdf Chapter 2 Q30 (QST-ASU-IMM-168; "Which one of the following statements best describes properties of interleukin 1 (IL-1)? a. It is a macrophage-derived product") — the option keyed correct states IL-1's macrophage origin, the same inflammatory-mediator-cytokine fact this live concept already teaches (IL-1 as a key innate/inflammatory mediator secreted by macrophages). Recorded as a sparse update, not a new mint: asu-imm-author9 found this exact id via find-existing.mjs "IL-1" and logged "close but not identical grain (mediator-role vs macrophage-origin framing) ... a cross-university sparse update carries real risk of breaking that record's existing per-university traceability ... deferred ... a distinct ASU-scoped concept minted instead" (ASU-IMM-immunology-concepts.md, the now-deleted CON-IMM-A15EC6751FF401) — that reasoning invents a rule the manual does not have; the law is reuse via sparse overlay, never a second record for the same idea.

---

# Item

## id
CON-IMM-FBBBE2775F5FB2

## label
CD3 labels total T cells, while CD4 and CD8 label T-cell subsets for microscopic or flow-cytometric counting

## universities
+asu

## modules
+ASU-IMM

## learner_years
+1

## field_notes
examSignal: Tested by ASU-IMM's hegazy.pdf Chapter 4 Q10 (QST-ASUIMM-HEGAZY-CH4-HEGAZY-CH4-Q10) and Q41 (QST-ASUIMM-HEGAZY-CH4-HEGAZY-CH4-Q41, a repeat of the same stem) — both key CD3 as the marker retained on every peripheral T cell regardless of CD4/CD8 subset — the same fact this live concept already teaches (CD3 = total-T-cell marker vs CD4/CD8 subset markers). The now-deleted ASU mint CON-IMM-0E8641D21D4210 ("CD3 is the pan-T-cell marker, expressed on every peripheral T cell regardless of CD4 or CD8 subset") logged a generic "no close-grain match" note, but find-existing.mjs "CD3" does return this id directly — the search was run too narrowly or its result discarded; recorded here as the sparse update the manual requires instead of a second record for the same idea.

---

# Item

## id
CON-IMM-4D0073E7453DD7

## label
A naive lymphocyte is mature but has not yet encountered antigen

## universities
+asu

## modules
+ASU-IMM

## learner_years
+1

## field_notes
examSignal: Tested by ASU-IMM's hegazy.pdf Chapter 4 Q36 (QST-ASUIMM-HEGAZY-CH4-HEGAZY-CH4-Q36; "Naive B & T lymphocytes are: b. Mature cells before encountering an Ag") — the identical definitional fact this live concept already teaches. The now-deleted ASU mint CON-IMM-2C9A5E12E169CD ("Naive B and T lymphocytes are mature cells that have not yet encountered their specific antigen") logged a generic "no close-grain match" note despite find-existing.mjs "naive lymphocyte" returning this id directly; recorded here as the sparse update the manual requires.

---

# Item

## id
CON-IMM-50DBC7E2B378BE

## label
Absent costimulation makes a naive T cell nonresponsive or anergic

## universities
+asu

## modules
+ASU-IMM

## learner_years
+1

## field_notes
examSignal: Tested by ASU-IMM's hegazy.pdf Chapter 4 Q29 (QST-ASUIMM-HEGAZY-CH4-HEGAZY-CH4-Q29; T-cell anergy following incomplete activation signalling, most classically B7 failing to engage CD28) — the same costimulation-failure-causes-anergy fact this live concept already teaches. The now-deleted ASU mint CON-IMM-DAEBF3B95AFFC1 ("T-cell anergy is the functional unresponsiveness that follows incomplete activation signalling...") logged a generic "no close-grain match" note despite find-existing.mjs "anergy"/"costimulation" returning this id directly; recorded here as the sparse update the manual requires.
