# Qena Faculty of Medicine (South Valley University) — Year 1 source manifest (S0)

Full machine-readable rows: `y1-sources.json` (21 sources). This file is the
human-readable summary.

Desktop folder name is **"Qina University"** (informal); the faculty's own bylaw PDFs
name the institution **Qena Faculty of Medicine, South Valley University** (كلية طب
قنا – جامعة جنوب الوادي) — there is no institution actually named "Qina University".
`universityId` stays `svu` per the empty shell already on `main`
(`src/data/universities.ts`: `{ id: 'svu', name: 'South Valley University (Qena)' }`).
Flagging the name mismatch per the lane brief; not a reason to change the id.

## Corpus shape

| Corpus | Files | What |
|---|--:|---|
| `faculty-admin` | 2 | Internal Bylaw 2020 (five-year program) + Internal Bylaw 2023 (5+2 credit-point program, current/live) |
| `year1` | 19 | Anatomy (4), Biochemistry (4), Embryology (4, `.pptx`), Histology (3), Physiology (4) — all filed under a `_Telegram FAS1` subfolder per subject |

**No exam paper, question bank, or department-book branch exists anywhere in this
corpus.** Every Year 1 file is a lecture PDF or slide deck. This was already flagged by
a prior Desktop curation pass (`Year 1/_Catalog/Year 1 Priority 4.md`): "The bot exposes
a first-semester Year 1 branch with Anatomy, Embryology, Histology, Biochemistry, and
Physiology. It does not expose an exam, department-book, or question-bank branch for
these subjects." Confirmed directly by this manifest's own file listing, not just
restated from that note.

## Twins

One name-twin pair, collapsed:

| Preferred | Discard | Why |
|---|---|---|
| `Histology/_Telegram FAS1/هستولوجى أولى طب قنا (1).pdf` (23pp, 6390 words) | `Histology/_Telegram FAS1/هستولوجى أولى طب قنا.pdf` (16pp, 4378 words) | Identical page-1 text; the "(1)" copy is the fuller download, the other a partial re-download of the same lecture note. Different sha256 (not exact-duplicate), so both rows are kept in the manifest with `nameTwinOf`/`twinPreferred` set — only the preferred copy should be read/authored from. |

`Physiology/Lec1.pdf` (5pp) and `Physiology/Lecture 1.pdf` (13pp) look like a twin pair
by name but are **not** — different page counts, both CamScanner scans, content not
compared page-by-page (both unreadable without OCR — see readability index). Treated as
two distinct lectures pending OCR confirmation.

## Module mapping (see `academic/SVU-Y1-modules.md` for the cited bylaw table)

| Corpus subject folder | Module id | Bylaw module | Department(s) per bylaw |
|---|---|---|---|
| Anatomy, Embryology, Histology | `SVU-PMM101` | Principles of microscopic and macroscopic structures | Anatomy Department (incl. Embryology, per ANA001) + Histology and Cell Biology department |
| Biochemistry, Physiology | `SVU-CBF101` | Cell biology and function | Biochemistry department + Physiology department |

Both are **Semester 1** modules. Nothing in the local corpus maps to the Semester 2
modules (INI-102, MPT-102, HPE-102) or to PSM-101/PPE-101 — no files exist for those yet.
This mapping is this lane's own reading of the bylaw's department list against the
corpus folder names — the bylaw awards points/marks per **module**, not per department,
so a department folder possibly split across two modules (or vice versa) cannot be ruled
out without a syllabus-level document. Flag **needs Omar** if a more granular
department→module map surfaces later.

## Verification performed

- All 21 sha256/size values computed directly (`shasum -a 256`, `stat -f%z`), not copied
  from the Desktop catalog notes.
- Bylaw module table facts (codes, marks, points, weeks, departments) verified by
  `node scripts/content/pagetext.mjs grep "<2023 bylaw>" "Anatomy|Histology|Physiology|Biochemistry|Embryology|PMM|CBF|PSM|PPE"`
  and a direct `show` of pages 29–30, not by trusting the Desktop summary note.
- Readability pass (`pagetext.mjs index`) run over the whole `Year 1/` tree — see
  `coverage/SVU-Y1-readability-index.md`. `.pptx` files (Embryology) are not covered by
  this PDF-only tool; not yet opened for readability.
