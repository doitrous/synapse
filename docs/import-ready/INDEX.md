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

## Respiratory practical bank — in progress

| | |
|---|---|
| Import at | **Admin → Practical Setup → Bulk import** |
| Files | `SYS-RES-PRACTICAL-001.md` … `SYS-RES-PRACTICAL-013.md` |
| Contents | 59 items · 226 questions · 157 mark-scheme items |
| Lands as | `Draft`. 53 items subject `resp`; 6 land in `pharm` — see the move batch below. |

| Type | Items |
|---|---:|
| Clinical case | 20 |
| Lab interpretation | 19 |
| Imaging interpretation | 6 |
| OSCE station | 6 |
| Skills checklist | 8 |

All thirteen files validate clean. Difficulty across the 226 questions: Easy 57
(25.2%), Moderate 124 (54.9%), Hard 34 (15.0%), Challenging 11 (4.9%).

The six OSCE stations carry full actor briefs written as answers to what a
candidate actually asks — *"When asked about wheeze, say yes, there is a
whistling sound, mostly when you breathe out, and it is worse in the mornings"* —
with behavioural flags telling the actor what to volunteer, what to withhold
until asked, and which jargon to challenge.

**Coverage and depth are both complete.** All 112 concepts the bank was written
against are taught by **at least two** questions — the 99 that remain `resp` (97
by two, 2 by three) and the 13 that moved to `pharm` (two each). Every option
carries an explanation naming the misconception that picks it, and every question
carries its own intended difficulty.

Six items are drug material rather than respiratory and are tagged `pharm`: the
persistent-cough and cough-clinic cases, acetylcysteine's two uses, one molecule
with three properties, and the two preparation-comparison sets. The inhaler OSCE
station and the inhaler and nebuliser checklists stay `resp` — each mentions one
drug concept in passing, and what they assess is technique.

**33 media requests** accompany the bank: 11 graphs (spirometry traces,
pressure-volume curves, dissociation curves), 11 histology fields, 4 anatomy
plates, 4 clinical photographs and 3 diagrams.

### A note on the pathology concepts

Nine concepts under `Respiratory Pathology` reached the graph as damaged
extractions — truncated mid-sentence (*"…human papilloma virus (HPV 6 &"*), or
carrying a figure caption in place of a statement (*"Acute inflammatory cells &
RBC Filling alveolar spaces"*). They are covered, but each question is written
from the verified underlying fact — laryngeal papillomatosis is caused by HPV
types 6 and 11; the alveolar filling described is the red hepatisation of acute
bacterial pneumonia — rather than from the damaged text. **The concept records
themselves still need repair at source**; only the questions tagged to them are
sound.

The 13 `Respiratory Pharmacology` concepts have moved to `pharm` —
`SYS-RES-CONCEPT-MOVE-001.md`, below.

---

## Renal practical bank — 21 items, 105 questions

| | |
|---|---|
| Import at | **Admin → Practical Setup → Bulk import** |
| Files | `SYS-REN-PRACTICAL-001.md` … `SYS-REN-PRACTICAL-007.md` |
| Lands as | `Draft`. Mostly subject `renal`; seven items land in `endo` or `pharm` — see the move batch below. |

All 75 renal concepts are covered. Depth is partial: 50 rest on a single
question, 24 have two, 1 has three. Every file validates at Easy 5 · Moderate 11
· Hard 3 · Challenging 1 per batch of 20.

Seven of the 28 authored items are not renal at all and are tagged accordingly —
2 `endo` (adrenal histology, the two glands sharing a capsule) and 5 `pharm`
(adrenaline in anaphylaxis, adrenaline and the circulation, local and metabolic
adrenaline, gout, the purine pathway). They give those two subjects their first
practical content.

Two mixed items deliberately stay `renal`: the phaeochromocytoma case, whose
three middle questions are creatinine clearance, and the advanced-CKD case, whose
last two are drug questions. A question may test a concept from another subject;
only the item's home changes.

---

## Concept repairs and moves — import these first

Five batches that fix the concept graph itself. They apply through
**Admin → Concepts → Bulk import**, and every row targets an existing concept by
ID: simulation reports **0 created**, so nothing is duplicated.

| File | What it does |
|---|---|
| `SYS-REN-CONCEPT-DEDUP-001.md` | Folds 5 duplicate pairs in `Renal Clearance`. Survivors keep the loser's wording as an alias and record `merge_ids`; the retired records go `inactive` with an `exclusion_reason` rather than being deleted, so existing references still resolve. Renal drops from 119 to 114 live concepts. |
| `SYS-REN-CONCEPT-MOVE-001.md` | Moves 39 concepts out of `renal`, where they never belonged: 12 to `endo`, 27 to `pharm`. Renal drops from 114 to 75. |
| `SYS-RES-CONCEPT-MOVE-001.md` | Moves the 13 `Respiratory Pharmacology` concepts to `pharm`. Respiratory drops from 112 to 99. |
| `SYS-REN-CONCEPT-REPAIR-001.md` | Repairs the 9 damaged `Renal and Urinary-Tract Pathology` concepts. |
| `SYS-RES-CONCEPT-REPAIR-001.md` | Repairs the 9 damaged `Respiratory Pathology` concepts. |

### What the move batch does, and what it leaves for you

| Article | Concepts | To | Topic | Why |
|---|---:|---|---|---|
| `Adrenal Gland` | 12 | `endo` | Adrenal physiology and disease | An endocrine organ, filed under `renal` only because the source chapter grouped it with the retroperitoneal structures. Its canonical node was always `DIS-HIS-T03`. |
| `Adrenaline` | 14 | `pharm` | Autonomic pharmacology | A drug monograph — routes, adverse effects, contraindications, alpha blockade, indications in arrest and anaphylaxis. Canonical node `DIS-PHA-T03`, and its topic field already read "Autonomic pharmacology". |
| `Purine and Pyrimidine Metabolism` | 13 | `pharm` | Inflammation, immunity and cancer pharmacology | Carried for allopurinol, colchicine and 5-fluorouracil. Canonical node `DIS-BIO-T06` is biochemistry, for which there is no curriculum subject. |
| `Respiratory Pharmacology` | 13 | `pharm` | Respiratory and allergy pharmacology | Antitussives, expectorants, mucolytics and demulcents. Canonical node `DIS-PHA-T04`, and the article's topic field already read "System pharmacology". |

Every row keeps its existing label, definition, explicit objective and article
link verbatim; only `subject` and `topic` change, and a `field_notes` line records
why. **No ID is re-minted**, so every question and practical already tagged to
these concepts still resolves.

**The four articles still need moving — an attempt on 13 Aug 2026 did not
persist.** Every `PUT /api/state/…` came back **403**, because that route is
guarded by `requireAdmin` (admin role *and* `aal2`) while the browser session was
only at `aal1`. The reads succeeded and the UI showed the change, because both
state keys are in `STUDENT_READABLE_STATE` so `GET` skips the guard, and the
client re-displays its own unsaved recovery copy after a reload. Verify a write
landed by watching for `PUT … 200`, not by re-reading the screen.

What needs to happen, one at a time in the article editor:

| Article | Was | Now |
|---|---|---|
| Adrenal Gland | REN · Organ histology (legacy) | **END** · Adrenal physiology and disease |
| Adrenaline | REN · Autonomic pharmacology (legacy) | **PHA** · Autonomic pharmacology |
| Purine and Pyrimidine Metabolism | REN · Molecular biology (legacy) | **PHA** · Inflammation, immunity and cancer pharmacology |
| Respiratory Pharmacology | RES · System pharmacology (legacy) | **PHA** · Respiratory and allergy pharmacology |

Change only the "University curriculum overlay" subject and chapter. The
canonical medical placement — `DIS-HIS-T03`, `DIS-PHA-T03`, `DIS-BIO-T06`,
`DIS-PHA-T04` — is already correct and must be left alone, as must every
article's status, summary, sections, key points and traps.

Use the editor rather than bulk import on purpose: an article import row rebuilds
`sections`, `body` and `summary` from the file, so a partial row would blank the
content it did not re-state.

**The concept batches above have not been imported either** — the same 403.
Note that the concept wizard printed "39 imported · 0 failed" while issuing no
write at all, so its success banner reports the in-memory merge, not the save.

### What `endo` and `pharm` now have

Neither subject had any practical content. The retagged items give them a start:
**2 `endo`** items (10 questions) and **11 `pharm`** items (56 questions), each
covering its concepts once. They are not banks yet — no OSCE station, no
checklist, and no second question on any concept — but they are authored,
validated content sitting in the right subject rather than the wrong one.

**Import these before the practical banks** if you want the concept labels a
student sees to match the questions tagged to them.

### How the repairs are recorded

Every repaired concept keeps its damaged text verbatim in `original_wording`, and
a `field_notes` entry states exactly what was changed and why. Where a fact had
to be inferred rather than merely re-typed — a truncation completed, a disease
named where the original gave none — the note says so explicitly.

**One repair carries a flag you should resolve.**
`CON-REN-8A11F1D9204098` read *"About 80% of patients are between the ages of 50
and 80 years"* and named no disease anywhere in the record. It has been repaired
as bladder carcinoma, because the concept sits among the bladder-carcinoma
concepts of the same article and the age range matches that tumour — but that is
an inference about **which disease was meant**, not about wording. It is recorded
in the concept's `uncertainty` field and should be checked against the source
document before that concept is published.

---

## Re-checking a file before you import

```bash
node --experimental-strip-types scripts/validate-content-batch.mjs docs/import-ready/SYS-CVS-PRACTICAL-001.md
```

It reports item count, the difficulty split, concepts tested, media flagged, and
any errors. All 14 practical files currently exit 0.
