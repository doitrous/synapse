# Questions and library articles — ready to import

Everything in this folder has been validated and is waiting for a human to apply
it through **Admin → Bulk import**. Nothing here has been imported.

This folder holds the **cardiovascular question bank** and the **cardiovascular
library articles for topics 2–9**. Practicals live in
[`docs/import-ready/`](../import-ready/INDEX.md), maintained separately.

**Import concepts before articles, and articles before questions.** An article
names the concepts it teaches, and a question names the article it tests; import
them the other way round and the links resolve to nothing.

---

## Cardiovascular library, topics 2–9 — 128 concepts, 58 articles

The clinical half of the cardiovascular system. Topic 1 (structure and function)
was already in the library; these eight topics were not, and their absence was
what capped the question bank at Topic 1.

| | |
|---|---|
| Import at | **Admin → Library Setup → Bulk import** |
| Files | `SYS-CVS-CONCEPT-T02.md` … `-T09.md`, then `SYS-CVS-ARTICLE-T02.md` … `-T09.md` |
| Order | **All eight concept files first, then the article files.** Within each group, any order. |
| Lands as | `Draft`, system `SYS-CVS`. Nothing reaches a student until you publish it. |

| Topic | | Concepts | Articles | Media flagged |
|---|---|---:|---:|---:|
| T02 | Cardiovascular presentations | 11 | 5 | 8 |
| T03 | Ischaemic heart disease | 14 | 6 | 8 |
| T04 | Heart failure and cardiomyopathy | 18 | 8 | 8 |
| T05 | Rhythm and conduction | 16 | 7 | 9 |
| T06 | Valvular and pericardial disease | 18 | 8 | 10 |
| T07 | Hypertension and vascular disease | 19 | 8 | 10 |
| T08 | Congenital and inflammatory disease | 16 | 8 | 9 |
| T09 | Investigations and procedures | 16 | 8 | 8 |
| | **Total** | **128** | **58** | **70** |

T02 uses `TPL-PRESENTATION`, T09 uses `TPL-INVESTIGATION`, and the rest use
`TPL-CONDITION` — so their section headings differ by design, and each file
satisfies the required sections for its own template.

**No dose, rate, energy or drug schedule appears in any of these articles.** They
name the decision and the reason for it and hand the number to the guideline in
force, because a number authored here would be wrong somewhere and stale
eventually.

**Egyptian context is written where it changes the answer**, not decoratively:
rheumatic heart disease in T08 is the clearest case, and the T06 valve articles
inherit it.

### What to expect after importing

All 128 concepts land as `needs_evidence` and `under review`: they carry their
teaching content and their relations, but no independent evidence chain, so they
are ready to be taught from and not yet ready to be published. The articles land
as `faculty_review` (54) or `needs_evidence` (4) for the same reason.

The 70 media requests appear at **Library Setup → Media requests** alongside the
question ones.

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
cardiovascular topic with articles when the bank was written. The topic 2–9
articles above lift that constraint: a clinical question bank for them can now be
authored, and has not been.

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
any errors. All 26 files in this folder currently exit 0.

To re-check every one of them:

```bash
for f in docs/questions-import-ready/SYS-CVS-*.md; do echo "$f"; node --experimental-strip-types scripts/validate-content-batch.mjs "$f" | head -1; done
```
