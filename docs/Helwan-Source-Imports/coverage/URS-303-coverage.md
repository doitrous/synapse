# URS 303 — source coverage

Lane `HU-URS-303` (triage-only — chief-of-staff ruling: this module has no
teaching source in the corpus, so no concept, article or question is authored
here). This ledger records what the five manifest rows for `HU-URS-303`
yielded; the companion `URS-303-triage.md` turns that yield into an exam
signal.

**5 of 5 source files have been read.** Two are corpus markdown notes (read
directly); three are the module's only question material, extracted with
`scripts/helwan/extract/pagetext.py --module "HU-URS-303"` and read by eye
where the extraction mode is OCR or the page is short enough to sight-check in
full — every page of every file, 39 pages in total.

## Every source row

| sourceId | File | Category | Mode | Pages | Yield |
|---|---|---|---|---|---|
| `src_6d84fcb80124429883e5` | `Administration/00 Source availability note.md` | Administration | native (direct read) | 1 (short note) | **Provenance, not content.** States the Telegram channel `t.me/URS303/12/1493` was searched for `schedule`, `marks`, `quiz content`, `instructions`, `exam`, `تعليمات` on 22 Aug 2026; only `exam` returned anything — the three PDFs below, posted 6 Feb 2026. No schedule, mark-allocation, marks/result sheet or orientation post exists in the searched channel. This is the source that tells a Telegram-fetch agent what has already been tried and failed, so it is not repeated blind. |
| `src_6d64d0e448b550647607` | `Anatomy/Notes/Anatomical levels - URS 303.md` | Anatomy notes | native (direct read) | 1 (8 bullet levels) | **8 vertebral-level landmarks** (T8–L5) relevant to renal/urinary anatomy: IVC opening, oesophageal opening, aortic opening, kidney span, transpyloric plane contents, renal/gonadal vessel levels, IMA origin, aortic bifurcation, quadratus lumborum extent and IVC formation. This is the one genuinely teaching-shaped fragment in the whole module folder — short, but real anatomy prose, not a recall list. Sourced from the same `t.me/URS303/12/1493` link as the administration note. |
| `src_7922fa4a0807f36f8893` | `Past Exams and MCQs/EOM - MCQs - URS 303 final exam Batch 2021 related.pdf` | Past Exams and MCQs (EOM) | OCR (manifest said native; page text was 2 words / 94% word-forming-but-unreadable on the sampled pages, so the extractor fell back to OCR itself — no hand override needed) | 25, 0 empty, 0 unreadable after OCR | **No formal MCQ paper at all.** OCR recovers a multi-student, multi-"Model" exam-*recall* compilation (headed "Anatomy Model 1", "Model 2", "Histology First Group", etc.) in mixed English and Arabizi, with heavy repetition across models of the same recalled topic. 510 OCR lines carry recognisable text; 325 have ≥3 English words; of those, **236 distinct topics survive near-duplicate clustering** — 117 about the urinary/reproductive system, 119 about other systems (endocrine, respiratory, cardiovascular, GI, rheumatology, general ID) that a comprehensive/cumulative "final" apparently also covered. Pages 23–25 are pure Arabic study-advice with no question content, but they carry three live links a later fetch should use (see the orchestrator report's TELEGRAM section): a different channel, `t.me/ii0y_gun`, holding a prior year's final ("batch 2020"), a lecture-recording Drive folder, a doctor's revision form and the students' own quiz. |
| `src_99bc338174d951e0fe95` | `Past Exams and MCQs/MCQs - URS 303 GUR questions.pdf` | Past Exams and MCQs | native, confirmed readable | 6, 0 empty, 1 unreadable (page 1, a one-word title "GUN") | A clean, single-author revision crib sheet — bullet facts, mostly `topic: answer`, sectioned by subject (Anatomy, Physio, Histo, Bio, Micro, Pharma, Patho). **99 bullets → 100 parsed items** (one bullet wraps a subject sub-header). 71 are on-topic for the urinary/reproductive system; the rest (mostly a page of named CBL case numbers with no content) drift off it. This is the best-focused of the three question files. |
| `src_c9bb66caa9855640f4f2` | `Past Exams and MCQs/MCQs - URS 303 phase questions.pdf` | Past Exams and MCQs | native, confirmed readable | 8, 1 empty (page 8, blank), 1 unreadable (page 1, title only) | Same crib-sheet format as the GUR file, but **the content is not this module's**: only 8 of 100 parsed items touch the urinary/reproductive system (uterus/kidney/ovarian-vein anatomy on page 2, minimal-change nephrotic syndrome, a schistosoma-UTI complication). The other 92 are endocrine (DKA, MODY, insulin), respiratory (COPD, bronchial arteries), cardiovascular, rheumatology and general ID/parasitology — a broader "phase" exam recall that happens to be filed in this module's folder. See the triage note under BLOCKED/OPEN. |

## What "read" means here

Every page of every PDF was pulled through the shared page-text cache
(`scripts/helwan/extract/pagetext/<sourceId>.json`) and the full text of all
39 pages was read, not sampled — there is no answer-key highlight mechanism to
calibrate against here (see the hazard note below), so there was nothing
gained by rendering pages to images the way a printed, highlight-marked paper
would require.

## No answer key exists in the Kasr sense

Every Kasr module ledger this lane's brief points to (`108-INT-coverage.md`)
recovers keys from a **printed paper with a highlight overlay or a solved/
unsolved twin**. This module has neither. All three PDFs are student-authored
revision material: a `topic: answer` crib sheet (GUR, Phase) or a garbled
OCR transcript of several students' own memories of an exam (EOM). Where an
answer appears at all, it is **the answer the student who wrote the sheet
believed was correct**, not a department mark scheme, and it is recorded in
`mcq-bank.json` as `"keyRecoveryMethod": "recalled-fact"`, explicitly
distinguished from `printed` or `highlight` recovery. Confidence should be
treated as low and uncorroborated — nothing here has been checked against an
authoritative key because no authoritative key is in the corpus.

## Manifest note

The EOM file's manifest row records `textLayer: "native"`; the extractor's own
readability probe disagreed (2 words / 94% word-forming-but-not-readable on
the sampled pages) and fell back to OCR automatically, the same silent-error
shape the brief's hazard notes warn about elsewhere in this corpus. No hand
intervention was needed because the extractor already carries that guard; it
is recorded here so a later lane does not re-trust the manifest's `native`
tag for this file.

## Owed from what was read

| Owed | Scale | Why it is not done |
|---|---|---|
| A formal MCQ/EOM paper with a real key | 0 of 3 question files qualify | Nothing in the corpus for this module is a departmental paper with a printed or highlight-recoverable key; all three are student-authored recall/crib material. This is a corpus gap, not a reading gap — see TELEGRAM. |
| A department book or lecture set for any of the seven subjects | 0 pages | The corpus holds no `isDepartmentBook` row and no lecture-note row for `HU-URS-303` at all — only the administration note, one short anatomy-levels note, and three recall PDFs. This lane cannot write a subject tree, a concept or an article without one (see the orchestrator report). |
| A practical/OSPE source | 0 pages | None supplied. The EOM recall does not mention a practical section for this module (contrast the pharma/anatomy tips on its last two pages, which describe only the theory paper). |
| Disambiguation of the "Phase questions" file | 92 of 100 items | Filed under `HU-URS-303` by the manifest, but its content is overwhelmingly not urinary/reproductive-system. Flagged rather than silently excluded — see `URS-303-triage.md` and the BLOCKED section of the orchestrator report. |
