| cluster | authored | held | remaining | total |
|---|---:|---:|---:|---:|
| anatomy | 49 | 0 | 0 | 49 |
| anatomy-ao | 0 | 0 | 12 | 12 |
| anatomy-bs | 0 | 0 | 10 | 10 |
| anatomy-cs | 0 | 0 | 6 | 6 |
| anatomy-eso | 0 | 0 | 10 | 10 |
| anatomy-hd | 0 | 0 | 11 | 11 |
| histo | 50 | 0 | 0 | 50 |

## Held
(none)

## Remaining
- anatomy-ao-q01
- anatomy-ao-q04
- anatomy-ao-q07
- anatomy-ao-q08
- anatomy-ao-q10
- anatomy-ao-q11
- anatomy-ao-q13
- anatomy-ao-q14
- anatomy-ao-q17
- anatomy-ao-q18
- anatomy-ao-q25
- anatomy-ao-q28
- anatomy-bs-q01
- anatomy-bs-q02
- anatomy-bs-q03
- anatomy-bs-q04
- anatomy-bs-q06
- anatomy-bs-q09
- anatomy-bs-q13
- anatomy-bs-q17
- anatomy-bs-q19
- anatomy-bs-q20
- anatomy-cs-q01
- anatomy-cs-q03
- anatomy-cs-q04
- anatomy-cs-q05
- anatomy-cs-q08
- anatomy-cs-q10
- anatomy-eso-q01
- anatomy-eso-q02
- anatomy-eso-q06
- anatomy-eso-q07
- anatomy-eso-q08
- anatomy-eso-q09
- anatomy-eso-q11
- anatomy-eso-q14
- anatomy-eso-q18
- anatomy-eso-q20
- anatomy-hd-q02
- anatomy-hd-q03
- anatomy-hd-q04
- anatomy-hd-q06
- anatomy-hd-q07
- anatomy-hd-q08
- anatomy-hd-q09
- anatomy-hd-q10
- anatomy-hd-q11
- anatomy-hd-q12
- anatomy-hd-q13

## Superseded (tranche 4, 2026-09-02)

This file's "Remaining" list above is a **cosmetic artifact**, not a literal
task list — the two-segment keys tranche 3 used for its own authored cluster
(`anatomy-bs-q01` etc.) collide with `ledger.mjs`'s own `-qNN` cluster-split
regex, so the 49 "remaining" rows above are re-numbered duplicates of the
already-authored set, not the 51 genuinely un-authored source questions (see
`LANE-CARD-Y2.md`'s tranche-4 dispatch and `MUST-CVS-201-triage-keys.txt`'s
own `[A]`-tag record for the ground truth). Tranche 4 (branch
`must-cvs201-author4`) worked from the triage-keys file directly instead,
authored the true remaining 50 MCQs and held 1 (BS-Q15, left conus artery —
no matching concept anywhere in the corpus), using clean single-segment keys
(`anatomy2-qNN`, cluster `anatomy2`) precisely to avoid this same collision.
See `coverage/MUST-CVS-201-anatomy2-LEDGER.md` for that cluster's own,
uncorrupted ledger. **The Anatomy CVS201 EOM Final paper's 100 MCQs are now
fully closed: 99 authored + 1 held, 0 remaining.** The 6 essay questions
remain un-authored (skipped by the tranche-4 dispatch, printed model answers
on p.32 for whenever a later pass wants them).
