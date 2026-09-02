# MANS-HIS-203 — first-module triage (Phase-0 sample)

**Scope note, read first:** `MANS-HIS-203`'s source pool is one 190-page, 6-subject
compiled book (`His Continuous Berlin Book 2026.pdf` — Histology, Microbiology,
Parasitology, Physiology, Biochemistry, Pharmacology, each with its own summary + MCQ
section) plus ~110 smaller per-lecture bank/scan files (see `manifest/y1-sources.json`,
archive group `HIS`, 113 files). Exhaustively reading and keying every question in that
pool is S1 Triage proper (00-START-HERE.md §4), a later, more resourced stage than this
Phase-0 survey. What follows is a **representative sample**: the Histology section read
in depth (the task brief's own expected high-hit-rate domain, used here to validate the
method), one page of Microbiology to check the pattern holds across subjects, and the
two garbled Priority-4 scan banks OCR'd and spot-read. Parasitology, Physiology,
Biochemistry and Pharmacology sections of the Continuous Book, and the ~100 remaining
per-lecture files, are catalogued in `manifest/y1-sources.json` and
`coverage/MANS-Y1-priority-sources.md` but **not yet triaged** — flagged below, not
silently skipped.

## Per-source summary

| Source | sourceId | Pages/range read | Questions triaged | Keys recovered | Method |
|---|---|---|--:|--:|---|
| `His Continuous Berlin Book 2026.pdf` — Histology, Lecture 1&2 (incl. two past-exam blocks, "دفعة 62"/"دفعة 63") | `src_c4ee1e63536c22ca52d4` | p.16-19, 26-27, 36-38 | 40 | 40 | printed (plain-text key beside option) |
| same file — Histology, Lecture 3&4 opening | `src_c4ee1e63536c22ca52d4` | p.28 | 5 | 5 | printed |
| same file — Microbiology, Lecture 1 (hypersensitivity) | `src_c4ee1e63536c22ca52d4` | p.46 | 5 | 5 | printed |
| `HIS 1- MCQ-scan.pdf` (Priority-4 #3, Physiology-flavored RBC/Hb bank) | `src_59f4d49a6f6a2ef7c047` | p.2-4 of 26 | 16 | 2 solid + 1 low-confidence | OCR (`pagetext.mjs ocr`) — the correct-answer highlight did not survive OCR for 13 of 16 items; a second OCR pass or visual check is needed before these can be keyed |
| `Histo HIS Important MCQ.pdf` (Priority-4 #4) | `src_7d6804673006cadc10e0` | p.2-3 of 25 | 10 (**content-twin** of the Continuous Book's Lecture 1&2 Q1-10 — same stems, same option order, different file — not counted in the distinct total) | 10, via cross-reference to the Continuous Book's printed keys (this file's own OCR only recovered 2 cleanly) | OCR + cross-ref |
| **Total, distinct questions** | | | **66** | **52** solid (+1 low-confidence, flagged) | |

76 rows were read (40+5+5+16+10); the 10 from `Histo HIS Important MCQ.pdf` duplicate 10
of the 40 already counted from the Continuous Book, leaving **66 distinct** questions.
The cross-reference exercise on that twin file didn't add a new recovered key — it
re-confirmed 10 of the 40 already-printed keys against a second, independent source,
which is worth doing (it's how the OCR-vs-printed discrepancy on this twin was caught)
but doesn't change the recovered-key count.

Full per-question detail (stem summary + recovered key) is in
[`MANS-HIS-203-triage-keys.txt`](MANS-HIS-203-triage-keys.txt).

**OCR/garbled-key trap, confirmed here:** both scanned banks are exam-style question
sets whose correct-answer marking (color highlight or bold) did not survive OCR
uniformly — `HIS 1- MCQ-scan.pdf` lost the key on 13/16 sampled items,
`Histo HIS Important MCQ.pdf` on 8/10. Where a scanned bank's questions are a
content-twin of a readable source (as here), **prefer the readable source's printed
key over re-OCRing** — cheaper and more reliable. Where no readable twin exists (as for
the 6/16 physiology-flavored items with no key at all), the key stays unrecovered
pending a second OCR pass at a different page-segmentation mode or a visual read.

## Per-concept triage

Distinct concepts after collapsing near-duplicate questions (e.g. Q1-20 and Q51-60 of
the Continuous Book collapse onto ~12 concepts, not 30 questions). `find-existing.mjs`
run per term below; a narrow multi-word query under-hit twice (see method note) —
re-running with the bare noun phrase surfaced the hit both times, matching this task's
own warning that a low hit rate usually means the search was too narrow.

| # | Concept (collapsed) | Status | Evidence |
|--:|---|---|---|
| 1 | Platelet structure (hyalomere/granulomere), count, life span, delta-granule contents | **live** | `CON-HEM-3843C5316D5FE8` (platelet adhesion), `CON-HEM-A656973A7F55F1`, `CON-HEM-F5DC4E5E748723`, `CON-HEM-72E5B71B0E45E1` |
| 2 | Erythropoiesis stages — mitosis loss, Hb onset, precursor order | pending | `docs/import-ready/concept/102-INT-mcq-concepts.md`, `AU-MED-103-physiology-concepts.md` |
| 3 | Erythropoiesis site by age (yolk sac → liver → bone marrow) | pending | `102-INT-mcq-concepts.md` — canonical_key `erythropoiesis-site-by-age` |
| 4 | Reticulocyte identification (supravital stain, characteristics) | **live** | `CON-HEM-D86697439C5923` + pending `101-ISK-mcq-concepts.md` |
| 5 | Anemia / polycythemia terminology (increased vs decreased RBC count) | pending | `102-INT-mcq-concepts.md` canonical_key `polycythemia-primary-and-secondary`; `AU-MED-103-physiology-concepts.md` |
| 6 | Neutrophil granules (primary azurophilic vs secondary specific) and nucleus shape | pending | `101-ISK-mcq-concepts.md` canonical_key `neutrophil-granules-and-first-line-defence` |
| 7 | Eosinophil structure/function | **live** | `CON-IMM-1021F84F49EBE0` |
| 8 | Basophil granules/mediators | **live** | `CON-IMM-075EC1A6A3022D`, `CON-IMM-7476A9977CEC6E`, `CON-HEM-1975918ED45C76` |
| 9 | Monocyte origin (myeloid stem cell lineage) | **live** | `CON-HEM-BD15B63AB982A9` |
| 10 | Megakaryocyte structure / thrombopoiesis | **live** | `CON-HEM-D9F4B28BC391FD`, `CON-HEM-C1B8D69FDABED2`, `CON-HEM-3DC3EAA5D4D84B` |
| 11 | Bone marrow — red (active) vs yellow (fatty, inactive) sites | pending | `101-ISK-mcq-concepts.md`, `Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` |
| 12 | Granulopoiesis — stage order, specific-granule timing (myelocyte) | pending | `AU-MED-103-histology-concepts.md` canonical_key `granulopoiesis.series.specific-granule-stage`, mirrored in `Alexandria-Source-Imports/` |
| 13 | B-lymphocyte vs T-lymphocyte function (humoral vs cellular) | **not searched this pass** | — |
| 14 | Lymph node structure — cortex, medulla, follicles, medullary cords (plasma cells) | pending | `Kasr-Source-Imports/concept/104-CPS-practical-concepts.md` (medullary cords), `104-CPS-mcq-concepts.md` (lymphoid follicle) |
| 15 | Spleen structure — white pulp / red pulp / Billroth cords | pending | `Kasr-Source-Imports/concept/104-CPS-concepts.md`, `104-CPS-practical-concepts.md`, `Alexandria-Source-Imports/pending-live/AU-MED-103-histology.md` — exact canonical_key match on both `spleen.red-pulp-billroth-cords-and-stave-cell-sinusoids` |
| 16 | Thymus — Hassall's corpuscles (medulla only) | pending | `Kasr-Source-Imports/concept/104-CPS-practical-concepts.md`, `AU-MED-103-histology.md` — exact canonical_key match `thymus.hassalls-corpuscle-structure-and-location` |
| 17 | Hemoglobin structure — globin chain composition (HbA vs HbF) | **not searched this pass** | — |
| 18 | Type I-IV (Gell-Coombs) hypersensitivity classification, as a standalone concept | **new** | No hit for `hypersensitivity` narrowed to the classification itself — the live/pending corpus has disease-linked hypersensitivity concepts (TB, transplant rejection, drug reactions) but not the Gell-Coombs framework as its own teachable concept. Placement: `CON-IMM-<hex>`, subject `imm` |
| 19 | Rh incompatibility / erythroblastosis fetalis (a type-II hypersensitivity worked example) | pending | `102-INT-physiology-concepts.md`, `Kasr-Source-Imports/concept/102-INT-physiology-concepts.md`, `import-ready/question/AU-MED-103-physiology-mcq.md` |

**Search method note:** two terms (`spleen white pulp`, `thymus Hassall`) returned "safe
to create one" on the first, multi-word `find-existing.mjs` query and then hit
immediately on a bare-noun re-query (`white pulp`, `Hassall`) — consistent with this
lane's brief warning that a low hit rate usually means the search was too narrow, not
that the concept is actually new. Every subsequent term in this table was searched with
both a narrow and a broadened query before being called pending/live.

## Checkpoint table (rolls up into the orchestrator's §5 table)

| Module | Questions triaged | Keys recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|--:|--:|--:|--:|--:|--:|---|
| MANS-HIS-203 (Phase-0 sample, not exhaustive) | 66 | 52 (+1 low-confidence) | 19 (17 searched, 2 not yet searched) | 6 | 10 | 1 | `imm` — Gell-Coombs hypersensitivity classification |

`Keys recovered` = 40 (Continuous Book, Histology Lecture 1&2 + past-exam blocks) + 5
(Continuous Book, Histology Lecture 3&4) + 5 (Continuous Book, Microbiology) + 2 solid
(`HIS 1- MCQ-scan.pdf`) = 52, against 66 distinct questions triaged. The 13 unrecovered
are all in `HIS 1- MCQ-scan.pdf`, whose OCR lost the answer highlight entirely for those
items (1 further item recovered at low confidence, flagged, not counted in the 52).

## Hit-rate validates the task brief's prediction

Of the 17 concepts actually searched, 16 landed live or pending — a 94% hit rate — and
the great majority of those are histology concepts hitting Kasr `101-ISK` / `102-INT` /
`104-CPS` and Alexandria `AU-MED-103` histology batches, exactly as the task brief
predicted. The single confident "new" candidate (#18) is from Microbiology, not
Histology — the classification framework itself (Gell-Coombs Type I-IV), as distinct
from the disease-specific hypersensitivity concepts already live/pending.

## Needs Omar / needs a second pass (not blockers, logged so they aren't lost)

- `HIS 1- MCQ-scan.pdf`: RESOLVED 2026-09-02 by MANS-HIS-203-author1 — a one-time full-page
  render of p.2-4 showed a printed answer-letter column (not a highlight), recovering all
  16/16 keys; see the updated `coverage/MANS-HIS-203-triage-keys.txt`. 5 of the 16 matched
  an existing live concept and were authored; the other 11 (numeric reference-range facts —
  packed cell volume, RBC count, Hb content — and haemoglobin/globin structure facts) have
  no matching live or pending concept and are held pending a dedicated concept-mapping or
  minting pass.
- Parasitology, Physiology, Biochemistry, Pharmacology sections of the Continuous Book
  (pages ~55-176 per its own table of contents) and ~100 remaining per-lecture HIS files
  are catalogued (manifest) but not yet triaged — next pass for this module once triage
  resumes past Phase-0.
- Concept #13 (B/T lymphocyte function) RESOLVED 2026-09-02: matches AU-authored pending
  concept `CON-HEM-FDAC2D5F64032E` (`lymphocyte-types-t-b-and-nk-and-the-immunity-each-
  mediates`, in `Alexandria-Source-Imports/concept/AU-MED-103-histology-concepts.md`) —
  authored via `pending-live/MANS-HIS-203-questions.md`. Concept #17 (Hb chain structure)
  is still not matched to any live/pending concept; the two HIS-1-MCQ-scan questions that
  test it (globin chain composition, fetal Hb composition) are held above.
