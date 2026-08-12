# Ready to import

Everything in this folder has been validated and is waiting for a human to apply
it through **Admin → Bulk import** on the site. Nothing here has been imported.

Each file is already in the importer's markdown format: open the relevant Bulk
import page, choose the file, review the preview, and commit.

Two banks are waiting: the **question bank** (10 files) and the **practical
bank** (14 files). They are independent — import either first.

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
question. This is Topic 1 — structure and function — because it is the only
cardiovascular topic with articles; T02–T09 have none, and a question may not
test a concept no article covers.

### Two things to expect after importing

**39 questions cannot publish until you supply media.** They carry a
`media_recommendations` block with `Priority: required`, meaning the image or
recording *is* the question — a histology field to identify, an ECG to read, a
murmur to hear. They appear in the backlog at **Library Setup → Media requests**,
filterable by system, content type, medium, priority and status. The other 22
flags are `strongly helpful` and do not gate release.

**171 questions target concepts that have not passed the evidence gate.** 21 of
the 98 concepts are `published`; the rest are `needs_evidence`. Every affected
question says so in `author_notes`, so the concept's evidence chain and the
question can be promoted together rather than the question quietly outrunning it.

---

## Cardiovascular practical bank — 65 items, 225 questions

| | |
|---|---|
| Import at | **Admin → Practical Setup → Bulk import** |
| Files | `SYS-CVS-PRACTICAL-001.md` … `SYS-CVS-PRACTICAL-014.md` |
| Order | Any. The files are independent of one another. |
| Lands as | `Draft`, subject `cvs`. Nothing reaches a student until you publish it. |

| Type | Items | Questions | Mark-scheme items |
|---|---:|---:|---:|
| OSCE station | 12 | — | 132 |
| Skills checklist | 8 | — | 104 |
| Clinical case | 21 | 105 | — |
| Lab interpretation | 12 | 60 | — |
| Imaging interpretation | 12 | 60 | — |
| **Total** | **65** | **225** | **236** |

| Batch | Type | Items | Questions |
|---|---|---:|---:|
| 001 | OSCE stations, with actor briefs | 10 | — |
| 002 | Skills checklists | 8 | — |
| 003–005 | Clinical cases | 12 | 60 |
| 006–007 | Lab interpretation | 8 | 40 |
| 008–009 | Imaging interpretation | 8 | 40 |
| 010–011 | Clinical cases | 9 | 45 |
| 012 | Lab interpretation | 4 | 20 |
| 013 | Imaging interpretation | 4 | 20 |
| 014 | OSCE stations | 2 | — |

**Difficulty across the bank.** Easy 56 (25%) · Moderate 124 (55%) · Hard 34
(15%) · Challenging 11 (5%). Every question carries its own intended band, and
every option — right and wrong — carries an explanation naming the misconception
that picks it.

**Coverage.** All 98 cardiovascular concepts are taught by at least **two**
questions: 73 by two, 22 by three, 3 by four or five. Batches 001–009 covered
every concept once; 010–014 exist to remove the concepts that were resting on a
single question, and the five that no question actually taught. Topic 1 only,
for the same reason as the question bank — T02–T09 have no articles.

### What to expect after importing

**85 media requests arrive with it**, 57 `required` and 28 `strongly helpful`.
They appear at **Library Setup → Media requests**, classified by medium and
genre: 19 graphs (ECGs, pressure traces), 19 imaging examples (radiographs, echo,
angiograms), 14 histology fields, 10 anatomy plates, 9 diagrams, 5 clinical
photographs, and 9 audio recordings. No placeholder URL is ever written, so a
flagged item still runs cleanly with nothing broken on screen.

**Skills checklists appear in the OSCE tab**, badged to distinguish them from
stations. They have no separate student route of their own.

---

## Re-checking a file before you import

```bash
node --experimental-strip-types scripts/validate-content-batch.mjs docs/import-ready/SYS-CVS-QUESTION-001.md
```

It reports item count, the difficulty split, concepts tested, media flagged, and
any errors. All 24 content files currently exit 0.
