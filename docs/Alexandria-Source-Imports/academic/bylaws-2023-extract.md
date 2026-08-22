# Alexandria Faculty of Medicine — 2023 bylaws, Years 1–3 extract

Source: `/Users/doitrous/Desktop/Alexandria University/General Resources/University
Regulations/اللائحة الداخلية برنامج بكالوريوس الطب و الجراحة2023.pdf` ("اللائحة الداخلية
لبرنامج بكالوريوس الطب والجراحة القائم على الكفاءات — نظام الخمس سنوات — لائحة 2023"), 20
printed pages / 21 PDF pages, native text layer (no OCR needed — see §0).

Page numbers below are **PDF physical page numbers** (1 = cover), taken by splitting
`pdftotext`'s form-feed-delimited output. The document's own printed folio number is one
less than the PDF page for every content page (folio 12 = PDF p.13, folio 16 = PDF p.17,
etc.) because the cover and the table-of-contents page carry no folio. Both are usable for
verification; this file cites the PDF page.

## 0 · Readability check

- `pdffonts`: 17 embedded font subsets, all `TrueType`/`CID TrueType`, all but three marked
  `emb=yes`; several Arabic-bearing runs (`BCDEEE+Calibri`, `BCDFEE+Calibri`) carry `uni=yes`
  or `uni=no` inconsistently, which is the exact "text layer present but partially
  undecodable" trap the toolchain notes warn about.
- `pdftotext -layout` produced 4,992 words. Read start-to-finish (all 21 pages) to check for
  the undecodable-run symptom (mojibake, missing diacritics, boxes): the Arabic prose reads
  correctly (RTL logical order reversed by the tool but every word decodes to real Arabic),
  and — critically for this task — **the entire curriculum table (Years 1–5, PDF pp. 13–15)
  and the curriculum map (PDF pp. 19–20) are typeset in English**, not Arabic, so no OCR or
  Arabic-decoding judgement call was needed for the module codes, titles, credit points,
  weeks, marks or department lists used below. No OCR pass was run; none was needed.
- Nothing in the Years 1–3 scope below is marked "could not read" — every cell in the table
  extracted cleanly and was cross-checked against the curriculum map (PDF pp. 19–20), which
  restates the same modules in diagram form and agrees on every title, week count and
  semester placement.

## 1 · Course-code grammar (PDF p.7, "تعريفات هامة" / "رمز المقرر")

A module code is three Latin letters + three digits. The letters: `UNI` = university
requirement (متطلبات الجامعة), `MED` = faculty/college requirement (متطلبات الكلية), `E` =
elective (مقررات اختيارية), `BSS` = behavioural/social-science course (مقررات سلوكية
اجتماعية) — **`BSS` does not appear in the Years 1–3 table** (§3) or the corpus; it is
recorded here only because the bylaws define it. The hundreds digit is the year/level
(100/200/300/400/500); the tens-and-units digits are the module's running number within the
programme.

## 2 · Departments (PDF p.5)

The bylaws list 33 numbered academic departments with Arabic/English names and a four-digit
code (`0501`–`0533`), e.g. `0514 Human Anatomy & Embryology`, `0520 Medical Physiology`,
`0511 Forensic Medicine and Clinical Toxicology`. This is the department list referenced
under "Sharing Departments" in §3; it is broader than the corpus subfolder names used in
`README.md` §D (which group several of these, e.g. Anatomy and Embryology are one corpus
folder against two bylaws departments).

## 3 · Programme structure table, Years 1–3 (PDF pp.13–14, "الخطة الاسترشادية للبرنامج")

Header states `Phase I (Pre-clerkship): 1 Cr P = 20 Marks` and, from Level III Semester 6
on, `Phase II (Clerkship): 1 Cr P = 25 Marks`. "Total Marks" below is the module's own total
as printed; where a module is taught jointly with a second component (e.g. Medical
Terminology, Communication and Basic Clinical Skills, Professionalism/Medical Law & Ethics)
the bylaws print the two components' marks separately, joined by `+` in the source layout —
reproduced here as `base (+component: n)` rather than summed, because the source never
states a combined total.

### Year 1 (Level I)

| Code | Title (bylaws, English) | Cr P | Weeks | Total marks | Sharing departments | Page |
|---|---|---:|---|---|---|---|
| MED101 | Medical School Orientation | 4 | 2 | — (no marks stated) | Medical Education | p.13 |
| MED102 | Foundation of Basic Medical Sciences + Medical Terminology | 16 | 8 WS | 300 (+ Medical Terminology: 20) | Anatomy/Histology, Biochemistry/Physiology, Pathology (Genetics) | p.13 |
| MED103 | Blood and Immune System + Medical Terminology | 10 | 5 WS | 180 (+ Medical Terminology: 20) | Anatomy/Histology, Biochemistry/Physiology | p.13 |
| UNI104 | English (University Requirement) | — | 30–60 contact hours | P/F | University Team | p.13 |
| MED105 | Musculoskeletal System + Communication and Basic Clinical Skills (1) | 14 | 7 Ws | 250 (+ Comm./BCS 1: 30) | Anatomy/Histology, Biochemistry/Physiology | p.13 |
| MED106 | Cardio-respiratory Systems + Communication and Basic Clinical Skills (2) | 16 | 8 Ws | 300 (+ Comm./BCS 2: 20) | Anatomy/Histology, Biochemistry/Physiology | p.13 |
| UNI107 | Social issues (University Requirement) | — | 30–60 contact hours | P/F | University Team | p.13 |

Semesters: MED101, MED102, MED103, UNI104 = **Level I Semester 1**; MED105, MED106, UNI107 =
**Level I Semester 2** (both stated as row headers in the table, p.13).

### Year 2 (Level II)

| Code | Title (bylaws, English) | Cr P | Weeks | Total marks | Sharing departments | Page |
|---|---|---:|---|---|---|---|
| MED201 | Endocrines and Genitourinary Systems + Communication and Basic Clinical Skills (3) | 16 | 8 Ws | 300 (+ Comm./BCS 3: 20) | Anatomy/Histology, Biochemistry/Physiology | p.13 |
| MED202 | Gastrointestinal System and Nutrition + Communication and Basic Clinical Skills (4) | 14 | 7 Ws | 250 (+ Comm./BCS 4: 30) | Anatomy/Histology, Biochemistry/Physiology | p.13 |
| MED203 | Nervous System + Professionalism, Medical Law & Ethics | 14 | 7 Ws | 270 (+ Professionalism/Law/Ethics: 10) | Anatomy/Histology, Biochemistry/Physiology, Forensic and toxicology, "team from different departments" | p.14 |
| MED204 | Concept of Health & Disease (1) + Professionalism, Medical Law & Ethics | 10 | 5 Ws | 180 (+ Professionalism/Law/Ethics: 20) | Pathology/Pharmacology, Forensic and toxicology, "team from different departments" | p.14 |
| MED205 | Concept of Health & Disease (2) + Professionalism, Medical Law & Ethics | 6 | 3 Ws | 110 (+ Professionalism/Law/Ethics: 10) | Pathology/Pharmacology, Forensic and toxicology, "team from different departments" | p.14 |

Semesters: MED201, MED202 = **Level II Semester 3** (p.13); MED203, MED204, MED205 =
**Level II Semester 4** (p.14).

### Year 3 (Level III)

| Code | Title (bylaws, English) | Cr P | Weeks | Total marks | Sharing departments | Page |
|---|---|---:|---|---|---|---|
| MED301 | Infection 1 | 8 | 4 Ws | 160 | Microbiology/Parasitology, Pathology/Pharmacology, Community Medicine | p.14 |
| MED302 | Infection 2 | 12 | 6 Ws | 240 | Microbiology/Parasitology, Pathology/Pharmacology, Tropical medicine, Community Medicine | p.14 |
| MED303 | Concept of Health & Disease (3) | 8 | 4 Ws | 160 | Pathology/Pharmacology | p.14 |
| E304 | Elective 1 | 2 | 30 contact hours | P/F | All Departments | p.14 |
| MED305 | Medicine | 6 | 4 Ws | 150 | Internal Medicine | p.14 |
| E306 | Elective 2 | 3 | 2 Ws | P/F | All Departments | p.14 |
| MED307 | Investigative medicine | 3 | 2 Ws | 75 | Clinical pathology, Radiology | p.14 |
| MED308 | Research | 6 | 4 Ws | 150 | Community medicine | p.14 |
| MED309 | Surgery | 6 | 4 Ws | 150 | Surgery | p.14 |
| UNI310 | Entrepreneurship (University Requirement) | — | 30–60 contact hours | P/F | University Team | p.14 |
| UNI311 | Critical thinking (University Requirement) | — | 30–60 contact hours | P/F | University Team | p.14 |

Semesters: MED301, MED302, MED303, E304 = **Level III Semester 5** (still Phase I / Pre-
clerkship, `1 Cr P = 20 Marks`, p.14); MED305, E306, MED307, MED308, MED309, UNI310, UNI311 =
**Level III Semester 6**, and the header on p.14 marks this row onward as **Phase II
(Clerkship)**, where `1 Cr P = 25 Marks` — a rate change the bylaws state explicitly, not a
transcription artefact.

The curriculum map (PDF pp.19–20) restates Year 3 as "30 Cr P" for Semester 5 and "24 Cr P"
for Semester 6, matching the sum of the Cr P column above (8+12+8+2=30; 6+3+3+6+6=24), which
is the cross-check referred to in §0.

Years 4 and 5 (MED401–MED506, PDF p.15) are out of this lane's scope (LANE-BRIEF §1 module
list stops at MED309/UNI311) and are not transcribed here.

## 4 · Assessment split (PDF pp.16–17, "توزيع درجات المقررات")

The bylaws state **one programme-wide split, not a per-module one** — no module row in §3
carries its own written/practical/continuous percentages, and no "could not read" applies
here: the source simply does not break the split out by module.

- Continuous assessment / coursework, collected in the portfolio: **30%** of the module's
  total mark, covering assignments and presentations during the term.
- Final written exam: **40%** of the total mark, held at the end of the semester in the
  pre-clerkship phase and at the end of the academic year in the clerkship phase.
- Practical/clinical exam: **30%** of the total mark — in Phase I this is practical/lab
  skills tests at the end of the module; in Phase II it is clinical/professional skills
  tests at the end of the clinical rotation.
- Second-round (resit) exams split differently: **60% written / 40% practical-clinical**.
- Elective and university-requirement modules (E304, E306, UNI104, UNI107, UNI310, UNI311)
  carry a written-only exam; the pure clinical-skills modules carry a clinical-only one — the
  bylaws state this as a blanket exception (p.16) rather than listing it per module.
- Maximum mark per module = Cr P × 20 (Phase I) or Cr P × 25 (Phase II) (p.16), consistent
  with the "Total Marks" column in §3 wherever both figures are stated (e.g. MED305: 6 Cr P
  × 25 = 150, matching the table).

No module in Years 1–3 states an individual written/practical/continuous split different
from this blanket rule; recording a per-module split beyond what §3's "Total marks" column
already carries would be inventing a figure the source does not give.
