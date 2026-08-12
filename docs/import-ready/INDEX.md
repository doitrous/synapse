# Ready to import

Everything in this folder has been validated and is waiting for a human to apply
it through **Admin → Bulk import** on the site. Nothing here has been imported.

Each file is already in the importer's markdown format: open the relevant Bulk
import page, choose the file, review the preview, and commit.

This folder holds the **practical bank**. The question bank moved to
[`docs/questions-import-ready/`](../questions-import-ready/INDEX.md) so two
agents stop writing into one folder.

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
node --experimental-strip-types scripts/validate-content-batch.mjs docs/import-ready/SYS-CVS-PRACTICAL-001.md
```

It reports item count, the difficulty split, concepts tested, media flagged, and
any errors. All 14 practical files currently exit 0.
