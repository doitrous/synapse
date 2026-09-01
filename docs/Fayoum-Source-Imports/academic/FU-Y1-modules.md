<!--
  Fayoum University Faculty of Medicine, Year 1 — academic module structure.
  Derived only from the local Desktop source tree's own cover pages, running
  heads, and body text (see the cited page per fact below) — nothing was
  inferred from a bylaw document, since none exists anywhere in this corpus.
  No marks/credit-hour table was found anywhere in the 16-file corpus
  (grepped for "credit|marks|semester|module|bylaw|total mark|hour" across
  every source, /tmp grep log not committed — see manifest note); every
  "marks" cell below is "unknown — needs Omar" for that reason, not an
  inference.
  Import target: Academic Setup > Import (once Omar rules on module codes
  and marks). Module ids are FU-local; four carry unconfirmed status and
  must not be treated as final until Omar resolves them.
-->

# Year 1

Four folders exist in the source tree at `Year 1/*`: **Disease Mechanism**,
**Musculoskeletal**, **Neuroscience**, **Normal Structure**. Reading the
cover pages inside each folder shows every one of the first three actually
bundles **two** consecutive numbered modules (an "I" and a "II"), the same
shape Fayoum uses for Musculoskeletal (confirmed by two distinct printed
covers). Neuroscience's source set only evidences a "Neuroscience I"; no
"Neuroscience II" file exists in this corpus (it may not have been
collected, or may sit in a later year — unconfirmed either way).

Semester is stated in-body for only two of these seven modules (see the
`Semester` column). No file in the corpus states a marks or credit-hour
value for any module.

## Modules

| Module id | Name (as printed) | Semester | Marks | Subjects present in this corpus | Source(s) |
|---|---|---|---|---|---|
| `FU-NS101` | Normal Structure I — printed code **"NS 101"** | unknown — needs Omar | unknown — needs Omar | Biochemistry | `uni book 2024 -2025.pdf` p1: *"Normal Structure I / NS 101"*, by Dr. Amr Aly Zahra, Professor and Head of Medical Biochemistry & Molecular Biology Dept. |
| `FU-NS2` | Normal Structure (2) Module | unknown — needs Omar | unknown — needs Omar | Histology | `normal structure 2 mod.pdf` p1: *"Normal structure (2) module / Theoritical Histology"*, Prof. Mohamed Salah Elgendy + Histology dept, 2024-2025. `هستو (1).pdf` p1: *"Histology introduction Handout"*, same author, 2018-2019 (supplementary, single-topic). |
| `FU-NS-unconfirmed` | Normal Structure — physiology component, I vs II not confirmed | unknown — needs Omar | unknown — needs Omar | Physiology | `_physiology of normal structure module 2023.pdf` — scanned, 0-word text layer on every page (not OCR'd; not a priority exam paper/bank per S1b scope), so the cover text that would confirm I vs II has not been read. |
| `FU-DM1` | Disease Mechanism **I** (inferred from filename digit + department, not from a printed "I") | unknown — needs Omar | unknown — needs Omar | Microbiology | `DISEASE MECHANISM1'micro'.pdf` p1: *"Medical Microbiology and Immunology Department / Microbial Disease Mechanisms"*, by Prof. Dr. Ahmed Ashraf Wegdan et al. |
| `FU-DM2` | Disease Mechanism **II** Module | **1st semester** (body text, pp5, 129, 151, 163, 171, 197) | unknown — needs Omar | Pathology (general pathology) | `Pathology department book.pdf` p1: *"Disease mechanism II Module / Integrated system notes / For 1st year medical students"*, Fayoum Faculty of Medicine, 2022-2023, Pathology Dept staff. |
| `FU-DM-unconfirmed` | Disease Mechanism — module number not printed | unknown — needs Omar | unknown — needs Omar | Parasitology, Pharmacology | `Para department book .pdf` p1: *"MEDICAL PARASITOLOGY / Integrated System Notes / Disease Mechanism Module for 1st year Medical Students"* — no "I"/"II" on cover, 2023. `Important Q.pdf` p1-2: pharmacology MCQs headed *"DISEASE MODULE / SECTION ONE / Pharma"* — "SECTION ONE" is a page-layout heading, not confirmed to mean "module I". |
| `FU-MSK1` | Musculoskeletal **I** Module (filename convention; printed cover doesn't use "I" but lists the same three subjects both years running) | unknown — needs Omar | unknown — needs Omar | Anatomy & Embryology, Biochemistry, Histology | `MSK-I module theoretical 2024.pdf` p1: *"I-Human Anatomy & Embryology / II-Biochemistry / III-Histology"*, By Staff Members, 2024; p103 running head *"Muscloskeletal & integumentary module"*. `MSK-I module practical 2024.pdf` p1: *"I-Human Anatomy & Embryology / II-Histology"*; p5: *"Musculoskeletal module"*. |
| `FU-MSK2` | Musculoskeletal **II** Module | **2nd semester** (body text, pp61, 62, 77) | unknown — needs Omar | Physiology, Microbiology, Pathology, Pharmacology, Parasitology | `MSK-II module theoretical 2023.pdf` p1: *"Musckolskeletal II Module / Theoretical / Physiology, Microbiology, Pathology, Pharmacology, Parasitology"*, Fayoum Faculty of Medicine, 2022/2023. `MSK-II module practical 2022.pdf` p1: *"Musckolskeletal II Module / PRACTICAL / Physiology, Pathology, Parasitology"*; p63: *"MSK II module / 1st Year / 2023"*. |
| `FU-NEURO1` | Neuro Sciences **I** Module | unknown — needs Omar | unknown — needs Omar | Anatomy, Physiology, Histology, Pharmacology | `Neuroscience 1 theoritical 2023.pdf` p1: *"Neuro sciences I / Module / Theoretical / Anatomy, Physiology, Histology, Pharmacology"*, Fayoum Faculty of Medicine, 2022/2023. Also carries `10 Anatomy MCQs Head & neck.pdf` (bank, part in-scope — see flags below), `7- Physiology MCQ of Autonomic Nervous System.pdf` (bank, unkeyed), `امتحانات فارما عملي.pdf` (paper, currently unreadable). |

## What this table does NOT claim

- No official module code was found for any module except `NS 101`. `FU-DM1`/`FU-DM2`/
  `FU-MSK1`/`FU-MSK2`/`FU-NEURO1` are this lane's own derivation from filenames and printed
  titles, not a faculty-issued code — flag for Omar before these become permanent ids.
- No semester is known for `FU-NS101`, `FU-NS2`, `FU-DM1`, `FU-MSK1`, or `FU-NEURO1`. Only
  `FU-DM2` (1st semester) and `FU-MSK2` (2nd semester) are confirmed in-body.
- No marks or credit-hour value is known for any of the seven modules. Nothing in this
  16-file corpus states one; a bylaw or official curriculum document was not present in the
  source tree and was not fetched (Telegram fetching is retired — this is a "needs Omar
  sources" gap, not a search failure).
- `FU-DM-unconfirmed` and `FU-NS-unconfirmed` are placeholders, not real module ids — they
  exist so the two Disease Mechanism sources and the one Normal Structure source aren't
  force-fit into `FU-DM1`/`FU-DM2`/`FU-NS101`/`FU-NS2` on a guess. Resolving them needs
  either a readable cover page (Physiology of Normal Structure, once OCR'd) or an Omar
  ruling (Parasitology and the pharmacology "Important Q" set, both undated on the I/II
  question).
- Whether a "Neuroscience II" module exists for Fayoum Year 1 is unknown — no such source
  was collected. Log as **needs Omar sources**.

## Source Evidence Used

- Manifest: `docs/Fayoum-Source-Imports/manifest/y1-sources.json` (16 sources, S0)
- Every cell above cites its own source file and page; no fact was carried over from
  another university or invented to fill a gap.
- Grep sweep for curriculum signal: `node scripts/content/pagetext.mjs grep "<Year 1 dir>" "credit|marks|semester|module|bylaw|total mark|hour" --case` — 231 hits across all 16
  files, none naming a marks or credit-hour figure.
