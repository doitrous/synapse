<!--
  Hand-maintained ledger for HU-ORL-305 (ledger.mjs has a dot/sequential-key
  bug on Helwan ledgers — see LANE-CARD-Y2-3.md §7 / HU-GIT-301-LEDGER.md's
  own note). Keys are the sequential `ophth-qNNNN` ids from
  coverage/HU-ORL-305-triage-keys.txt (980 keys total, bank order: Ch1 items
  1-26 = ophth-q0001..q0026, Ch2 items 1-13 = ophth-q0027..q0039, Ch3 items
  1-96 = ophth-q0040..q0135, Ch4-15 = ophth-q0136..q0980).
-->

## Lane-1 pass (this commit)

Authored ophth-q0001 through ophth-q0059 — every key up to and including
Chapter 3 item #20 — against the 980-key triage list (`HU-ORL-305-triage-keys.txt`):

- Chapter 1 (Brief anatomy of the eye and its adnexa): ophth-q0001..q0026 — 26/26 authored.
- Chapter 2 (Clinical examination of the eye): ophth-q0027..q0039 — 13/13 authored.
- Chapter 3 (The protective system of the eye), items #1-20 of 96: ophth-q0040..q0059 — 20/20 authored.

59/59 keys in this range authored, 0 held, 0 unexpected (direct set-diff of
`HU-ORL-305-triage-keys.txt` against every `question[].key` present in
`coverage/seeds/HU-ORL-305/{ch1,ch2,ch3}.json` — all 59 keys match exactly,
`ophth-ch{1,2,3}-qNN` form). 921 keys remain in the 980-key triage after this
pass.

| cluster | authored | held | remaining | total |
|---|---:|---:|---:|---:|
| ch1 (Brief anatomy of the eye and its adnexa) | 26 | 0 | 0 | 26 |
| ch2 (Clinical examination of the eye) | 13 | 0 | 0 | 13 |
| ch3 items #1-20 (The protective system of the eye) | 20 | 0 | 0 | 20 |
| **subtotal this pass** | **59** | **0** | **0** | **59** |
| ch3 items #21-96 (The protective system of the eye, remainder) | 0 | 0 | 76 | 76 |
| ch4 (Normal and abnormal image capture) | 0 | 0 | 91 | 91 |
| ch5 (Ocular motility in health and disease) | 0 | 0 | 63 | 63 |
| ch6 (The Glaucomas) | 0 | 0 | 71 | 71 |
| ch7 (The red eye) | 0 | 0 | 203 | 203 |
| ch8 (The retina: function and diseases) | 0 | 0 | 90 | 90 |
| ch9 (The eye and the brain) | 0 | 0 | 73 | 73 |
| ch10 (Eye diseases in infancy and early childhood) | 0 | 0 | 60 | 60 |
| ch11 (The eye in systemic diseases) | 0 | 0 | 43 | 43 |
| ch12 (Ocular and orbital injuries) | 0 | 0 | 81 | 81 |
| ch13 (Medications and the eye) | 0 | 0 | 43 | 43 |
| ch14 (Lasers in ophthalmology) | 0 | 0 | 23 | 23 |
| ch15 (Some related topics) | 0 | 0 | 4 | 4 |
| **total (bank)** | **59** | **0** | **921** | **980** |

Note: "total" per chapter is bank items (matching `bank_missing_in_seq` = 0
except ch3/ch6/ch7/ch8/ch9/ch10/ch11/ch12, whose 21 combined unjoined items —
see `HU-ORL-305-triage.md` — are excluded from "remaining" since they have no
recovered key to author from yet).

## Concepts / overlay this pass

34 new concepts minted (`CON-OPH-*`, system-prefix established as the
ophthalmology reuse family for future universities). 1 pending-live overlay
(`CON-NEU-3FF95D30CD5825`, Alexandria's pending corneal-transparency concept)
— see `pending-live/HU-ORL-305-questions.md`. 0 rejected-merge-candidate
near-misses recorded this pass (the two other near-hits found during search —
`AU-MED-203-anatomy-concepts.md`'s visual-field-defect alias, and
`SCU-FBS102-s2-mint-concepts.md`'s superior-orbital-fissure-boundaries
concept — are different facts from what this cluster tests, documented as
non-merges in the concept `field_notes`, not formally rejected merge
candidates since they were never real merge candidates).

## Lane-2 pass (this commit)

Authored ophth-q0060 through ophth-q0128 (Chapter 3 items #21-96, minus 7
held) against the 980-key triage list, extending lane-1's ophth-q0001..q0059
without touching it:

- Chapter 3 (The protective system of the eye), items #21-96 of 96:
  ophth-q0060..q0135 — 69/76 authored, 7 held.

69 keys authored, direct set-diff of the 71 `joined` triage keys in this
range (`ch3-q21`..`ch3-q96` minus the 5 unjoined) against every
`question[].key` present in `coverage/seeds/HU-ORL-305/ch3b.json` — all 69
match exactly, `ophth-ch3b-qNN` form (2 more triage-`joined` keys, Q48/Q49,
were additionally held this pass — see below). 852 keys remain in the 980-key
triage after this pass.

Held this pass (7, all Chapter 3):

- Q32, Q36, Q47, Q50, Q53 — unjoined-no-key (printed answer key has no row
  for these 5 bank items; see `HU-ORL-305-triage.md`). Unchanged from
  lane-1's triage; still held, not authored.
- Q48, Q49 — printed with only 2 options (True/False), below even the
  3-option build-time-4th-option precedent lane-1 used once (Ch1 Q20).
  Fabricating a second AND third distractor to reach the 4-option minimum
  would go beyond that narrow precedent, so both are held rather than
  authored. Both have valid printed keys (Q48=B/False, Q49=A/True) and are
  ready to author if a future pass adopts a T/F-specific build path.

Cross-check: every one of the 69 transcribed keys was independently verified
by a second, from-scratch regex parse of the cached `pdftotext -layout` text
of the answer key's Chapter 3 block (91 printed `Qn <letter>` cells,
`Q(\d+)\s+([A-E])` pattern) — 0 mismatches against the hand-transcribed
`scripts/helwan/extract/HU-ORL-305/mcq-bank-ophthalmology-ch3b.json`.

| cluster | authored | held | remaining | total |
|---|---:|---:|---:|---:|
| ch1 (Brief anatomy of the eye and its adnexa) | 26 | 0 | 0 | 26 |
| ch2 (Clinical examination of the eye) | 13 | 0 | 0 | 13 |
| ch3 items #1-20 (The protective system of the eye) | 20 | 0 | 0 | 20 |
| ch3 items #21-96 (The protective system of the eye, remainder) | 69 | 7 | 0 | 76 |
| **subtotal ch3 (whole chapter)** | **89** | **7** | **0** | **96** |
| **subtotal all lanes to date** | **128** | **7** | **0** | **135** |
| ch4 (Normal and abnormal image capture) | 0 | 0 | 91 | 91 |
| ch5 (Ocular motility in health and disease) | 0 | 0 | 63 | 63 |
| ch6 (The Glaucomas) | 0 | 0 | 71 | 71 |
| ch7 (The red eye) | 0 | 0 | 203 | 203 |
| ch8 (The retina: function and diseases) | 0 | 0 | 90 | 90 |
| ch9 (The eye and the brain) | 0 | 0 | 73 | 73 |
| ch10 (Eye diseases in infancy and early childhood) | 0 | 0 | 60 | 60 |
| ch11 (The eye in systemic diseases) | 0 | 0 | 43 | 43 |
| ch12 (Ocular and orbital injuries) | 0 | 0 | 81 | 81 |
| ch13 (Medications and the eye) | 0 | 0 | 43 | 43 |
| ch14 (Lasers in ophthalmology) | 0 | 0 | 23 | 23 |
| ch15 (Some related topics) | 0 | 0 | 4 | 4 |
| **total (bank)** | **128** | **7** | **845** | **980** |

Note: "remaining" for ch4-ch15 still excludes each chapter's own unjoined
items (16 more, outside ch3) pending future triage/authoring of those
chapters — see `HU-ORL-305-triage.md`'s own per-chapter unjoined counts.

## Concepts / overlay this pass

28 new concepts minted (`CON-OPH-*`, continuing lane-1's ophthalmology reuse
family). 7 facts reuse lane-1's already-minted concepts unchanged
(`ptosisMechanisms`, `lagophthalmos`, `nasolacrimalDuct`, `thyroidEyeDisease`,
`proptosisDifferential`, `blepharitisTypes`, `dacryocystitisMgmt` — ids
recomputed deterministically via the same canonical-key hash, not re-minted,
not re-emitted). No new pending-live overlay this pass (lane-1's
`CON-NEU-3FF95D30CD5825` overlay is untouched). 0 rejected-merge-candidate
near-misses recorded this pass — `find-existing.mjs` and a
`docs/*/concept|pending-live` grep were run for every new concept's shortest
distinctive term before minting (see
`scripts/helwan/HU-ORL-305-ophthalmology-data-2.mjs`'s header note for the
full search-result summary); the closest hits (cavernous haemangioma
histology, cavernous sinus thrombosis/orbital cellulitis anatomy, vitamin A
deficiency biochemistry, retinoblastoma/rhabdomyosarcoma molecular biology,
orbicularis oculi sustained-closure anatomy) were each a different specific
fact from a different subject, never real merge candidates, so none are
listed as `rejected_merge_candidate_ids`.

## Lane-3 pass (this commit)

Authored ophth-q0136 through ophth-q0226 (Chapter 4, "Normal and abnormal
image capture," all 91 bank items — the chapter is fully joined, 91/91
keyed, 0 unjoined, per `HU-ORL-305-triage.md`'s join table):

- Chapter 4 (Normal and abnormal image capture): ophth-q0136..q0226 —
  91/91 authored, 0 held.

91 keys authored, direct set-diff of the full 91-item Chapter 4 key range
against every `question[].key` present in `coverage/seeds/HU-ORL-305/ch4.json`
— all 91 match exactly, `ophth-ch4-qNN` form. Extraction cross-check: every
one of the 91 transcribed stems/options/keys was independently verified by a
second, from-scratch regex parse of the cached `pdftotext -layout` text of
the answer key's Chapter 4 block (`Q(\d+)\s+([A-E])` pattern over p.2 of the
answer key PDF) — 0 mismatches against the hand-transcribed
`scripts/helwan/extract/HU-ORL-305/mcq-bank-ophthalmology-ch4.json`. 761
keys remain in the 980-key triage after this pass (Chapter 3's 7 held items
plus the whole of Chapters 5-15).

| cluster | authored | held | remaining | total |
|---|---:|---:|---:|---:|
| ch1-ch3 (lanes 1-2, unchanged) | 128 | 7 | 0 | 135 |
| ch4 (Normal and abnormal image capture) | 91 | 0 | 0 | 91 |
| **subtotal all lanes to date** | **219** | **7** | **0** | **226** |
| ch5 (Ocular motility in health and disease) | 0 | 0 | 63 | 63 |
| ch6 (The Glaucomas) | 0 | 0 | 71 | 71 |
| ch7 (The red eye) | 0 | 0 | 203 | 203 |
| ch8 (The retina: function and diseases) | 0 | 0 | 90 | 90 |
| ch9 (The eye and the brain) | 0 | 0 | 73 | 73 |
| ch10 (Eye diseases in infancy and early childhood) | 0 | 0 | 60 | 60 |
| ch11 (The eye in systemic diseases) | 0 | 0 | 43 | 43 |
| ch12 (Ocular and orbital injuries) | 0 | 0 | 81 | 81 |
| ch13 (Medications and the eye) | 0 | 0 | 43 | 43 |
| ch14 (Lasers in ophthalmology) | 0 | 0 | 23 | 23 |
| ch15 (Some related topics) | 0 | 0 | 4 | 4 |
| **total (bank)** | **219** | **7** | **754** | **980** |

## Concepts / overlay this pass

34 new concepts minted this pass (`CON-OPH-*`, continuing lanes 1-2's
ophthalmology reuse family): 16 covering refraction/optics/keratoconus
(article `ART-HU-ORL305-OPH-IMGCAP-REFRACTION`) and 18 covering
cataract/lens/cornea/vitreous (article
`ART-HU-ORL305-OPH-IMGCAP-CATARACT-LENS`). No lane-1/lane-2 concept reuse
this pass (Chapter 4's optics/cataract/lens/keratoconus content did not
overlap the eyelid/lacrimal/orbit and basic-anatomy facts those lanes
already minted). No new pending-live overlay this pass (lane-1's
`CON-NEU-3FF95D30CD5825` overlay is untouched). `find-existing.mjs` plus a
`docs/*/concept|pending-live` grep were run for every new concept's
shortest distinctive term before minting (keratoconus, cataract,
presbyopia, myopia, hypermetropia, aphakia, lens subluxation, vitreous
hemorrhage, arcus senilis, keratoplasty, accommodation, astigmatism,
corneal dystrophy, pemphigoid, contact lens, corneal transparency — see
`HU-ORL-305-ophthalmology-data-3.mjs`'s header for the full search-result
summary). One real near-duplicate was found (`CON-NEU-3FF95D30CD5825`,
Alexandria's pending AU-MED-203 corneal-transparency-factors concept,
already overlaid by lane-1) but is deliberately NOT reused a second time
this pass: running `validate-content-batch.mjs` against the already-
committed lane-1 batch (which uses this id as `main_concept` for its Ch1
Q8/Q9/Q12) reproduces a live "main concept ... is not covered by any
article in library_ids" error, since lane-1's pending-live overlay never
added the AU-MED-203 article to those questions' `library_ids` and lane-1's
own article never claims this concept as covered. Reusing the id here would import that same defect into this otherwise-clean
batch, so `trachomaCornealOpacityMechanism` mints an HU-owned concept
covering the equivalent fact from its own clinical-mechanism angle instead,
fully covered by this pass's own article. Not listed as a
`rejected_merge_candidate_id` (it was a real reuse
candidate, not a rejected one) — the lane-1 coverage gap itself is flagged
separately via a spawned out-of-scope task, since it lives in a different
chapter's already-committed file, outside this lane's Chapter-4 scope. 0
other rejected-merge-candidate near-misses recorded this pass — the
"accommodation" and "cataract" hits found (Kasr/Assiut pharmacology-angle
accommodation concepts; this lane's own lane-1 red-reflex-colour cataract
concept) were each a different specific fact from a different subject,
never real merge candidates.

## Remaining (754 keys)

Chapter 3's 7 held items (Q32, Q36, Q47, Q48, Q49, Q50, Q53) plus the whole
of Chapters 5-15 (754 keys) — see `HU-ORL-305-triage-keys.txt` for the full
sequential list. Bank order, ready for the next cluster/lane pass; no
further triage beyond the structural join was performed on this remainder
(see `HU-ORL-305-triage.md`'s own scope note).

HANDOFF: next chapter/item = Chapter 5 (Ocular motility in health and
disease), item #1 of 63 (`ophth-q0227`).
