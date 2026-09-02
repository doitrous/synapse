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

## Remaining (921 keys)

Chapter 3 items #21-96 (76 keys) plus the whole of Chapters 4-15 (845 keys) —
see `HU-ORL-305-triage-keys.txt` for the full sequential list
(`ophth-q0060` through `ophth-q0980`). Bank order, ready for the next
cluster/lane pass; no further triage beyond the structural join was performed
on this remainder (see `HU-ORL-305-triage.md`'s own scope note).
