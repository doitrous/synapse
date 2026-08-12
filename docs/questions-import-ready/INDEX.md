# Questions — ready to import

Everything in this folder has been validated and is waiting for a human to apply
it through **Admin → Questions Setup → Bulk import**. Nothing here has been
imported.

This folder holds **question banks only**. Practicals live in
[`docs/import-ready/`](../import-ready/INDEX.md), maintained separately.

---

## Cardiovascular question bank — 219 questions

| | |
|---|---|
| Import at | **Admin → Questions Setup → Bulk import** |
| Files | `SYS-CVS-QUESTION-001.md` … `SYS-CVS-QUESTION-010.md` |
| Order | Any. The files are independent of one another. |
| Lands as | `Draft`, subject `cvs`. Nothing reaches a student until you publish it. |

| Batch | Article it tests | Questions | Media flagged |
|---|---|---:|---:|
| 001 | `ART-CVS-HEART-ORIENTATION` | 16 | 5 |
| 002 | `ART-CVS-CHAMBERS-VALVES` | 24 | 7 |
| 003 | `ART-CVS-CORONARY-CIRCULATION` | 27 | 8 |
| 004 | `ART-CVS-CONDUCTION` | 23 | 7 |
| 005 | `ART-CVS-CARDIAC-HISTOLOGY` | 26 | 8 |
| 006 | `ART-CVS-CARDIAC-CYCLE` | 20 | 6 |
| 007 | `ART-CVS-CARDIAC-OUTPUT` | 20 | 5 |
| 008 | `ART-CVS-CARDIAC-ELECTRICAL` | 24 | 8 |
| 009 | `ART-CVS-BLOOD-PRESSURE` | 21 | 3 |
| 010 | `ART-CVS-VASCULAR-FLOW` | 18 | 4 |
| | **Total** | **219** | **61** |

**Difficulty across the bank.** Easy 55 (25%) · Moderate 119 (54%) · Hard 34
(16%) · Challenging 11 (5%).

**Coverage.** All 98 cardiovascular concepts are the main concept of at least one
question. This is Topic 1 — structure and function — because it was the only
cardiovascular topic with articles when the bank was written.

### Two things to expect after importing

**39 questions cannot publish until you supply media.** They carry a
`media_recommendations` block with `Priority: required`, meaning the image or
recording *is* the question — a histology field to identify, an ECG to read, a
murmur to hear. They appear at **Library Setup → Media requests**. The other 22
flags are `strongly helpful` and do not gate release.

**171 questions target concepts that have not passed the evidence gate.** 21 of
the 98 concepts are `published`; the rest are `needs_evidence`. Every affected
question says so in `author_notes`, so the concept's evidence chain and the
question can be promoted together.

---

## Re-checking a file before you import

```bash
node --experimental-strip-types scripts/validate-content-batch.mjs docs/questions-import-ready/SYS-CVS-QUESTION-001.md
```

It reports item count, the difficulty split, concepts tested, media flagged, and
any errors. All ten currently exit 0.
