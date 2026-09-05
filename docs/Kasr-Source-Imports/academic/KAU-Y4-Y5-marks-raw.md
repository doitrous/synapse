# Kasr Year 4 & 5 marks — raw capture (Omar, y4/y5 marks 2026-09-05)

**Not yet delivered as import outlines.** Y4 and Y5 use a *different* mark structure
than Y1-3 and do NOT fit the current `ExamMarks` model (written/practical × end-of-
module/end-of-year) cleanly — a modeling decision is needed first (see bottom).

## Year 4 — module-level (no per-department split)
Each row is a whole module; split is EOM(written) 30% · Practical 30% · EOY(written) 40%.

| Module | Allocated | End of module | Practical | End of Year |
|---|---|---|---|---|
| PSY-413 | 60 | 18 | 18 | 24 |
| COM-418 | 140 | 42 | 42 | 56 |
| FML-420 | 80 | 24 | 24 | 32 |
| PLL-421 | 40 | 12 | 12 | 16 |
| MED-422 | 70 | 70 | – | – |
| SUR-423 | 70 | 70 | – | – |
| PED-424 | 400 | 120 | 120 | 160 |
| OBG-425 | 400 | 120 | 120 | 160 |
| MPC-426 | 10 | – | 10 | – |
| RES-434 | 10 | – | 10 | – |

## Year 5 — clinical rotations, subspecialty-level
Split is End-of-round · Final Clinical · Final Written. Grading note on the sheet:
"End of module exam · End of subspecialty exam · End of year exam (40% written & 30% & OSCE)".

Top-level modules: **MED-522** Medicine 2 (700+70), **SUR-523** Surgery 2 (700+70),
**FML-520** Family Medicine 2 (30), **MPC-526** (10). Year-5 total 1580 (EndOfRound 429 · Final Clinical 439 · Final Written 572).

**Surgery (110): EndOfRound / FinalClinical / FinalWritten**
| Subspecialty | Total | EoRound | Clinical | Written |
|---|---|---|---|---|
| Orthopedics | 35 | 20 | – | 15 |
| Urosurgery | 35 | 20 | – | 15 |
| Neurosurgery | 8 | 8 | – | – |
| Cardiothoracic | 8 | 8 | – | |
| Anesthesia & ICU | 8 | 8 | – | |
| Andrology | 8 | 8 | – | |
| Radio | 8 | 8 | – | |
| Emergency | (5 marks included in general surgery) | | | |

**Medicine (100): EndOfRound / FinalClinical / FinalWritten**
| Subspecialty | Total | EoRound | Clinical | Written |
|---|---|---|---|---|
| Clinical pathology | 30 | – | 30 (clinical+written) | |
| Dermatology | 30 | 10 | 20 (clinical+written) | |
| Cardiology | 8 | 8 | – | – |
| Chest | 8 | 8 | – | |
| Neurology | 8 | 8 | – | |
| Tropical | 8 | 8 | – | |
| Rheumatology | 8 | 8 | – | |
| Emergency | (10 marks included in general medicine) | | | |

## Modeling decision needed
The `ModuleSubject.marks` shape is exactly 4 buckets: writtenEndOfModule,
writtenEndOfYear, practicalEndOfModule, practicalEndOfYear. Y4's "Practical" column
and Y5's "End-of-round / Final Clinical / Final Written" do not map onto those four
without either (a) a lossy convention (e.g. Y5 EndOfRound→practicalEndOfModule,
FinalClinical→practicalEndOfYear, FinalWritten→writtenEndOfYear), or (b) using the
flexible `assessmentScheme` field (richer, but the outline importer doesn't parse it).
Also Y4/Y5 give no per-department split (Y4) or use subspecialties (Y5) rather than the
Anatomy/Physiology-style departments. Decide the representation before authoring these.
