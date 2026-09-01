# MU-MED104 (Musculoskeletal) — S3 first-module triage

## Module choice: switched from MED102 to MED104

The Phase-0 brief defaults to **MED102 Foundation 2** (per `CLAUDE-HANDOVER.md`'s
recommendation) unless inventory shows another module has clearly richer keyed exam
material. It does:

| Module | Tier-1 paper files (S0 scan) | Tier-2 bank files | Total files |
|---|--:|--:|--:|
| MU-MED102 | 12 | 98 | 261 |
| **MU-MED104** | **27** | 57 | **334** |

MED104 has more than double MED102's exam-paper count (27 vs 12), is the single largest
module in the whole Year-1 corpus (334 files), and its papers verified as native-text,
well-formed real end-module/EOY exams with explicit "model answer"/"answered" variants —
see `manifest/y1-sources.json` sourceIds below. **Switching to MED104** for this triage
pass; MED102 remains the second-priority module for the next lane pass.

## Critical finding: printed keys are not in the text layer — they are visual-only markup

Every "Answers"/"model answer" file sampled in this module (and, for comparison, one in
MED102) has a **clean native text layer with no key indicator at all** —
`pagetext.mjs status`/`show` reports normal word counts and readable prose, but the correct
option is marked only by page-rendering-visible formatting that `pdftotext -layout` does not
carry into the text layer:

- `MFM42Support - Answers of MSK1 END.pdf` (MED104, Biochemistry) — key marked by **red
  font colour** on the correct option line.
- `MSK2 endmodule exam group 1- model answer.pdf` (MED104, Anatomy/Pathology) — key marked
  by **underline**.
- `End Foundation 2 Batch 43 - Answers - Telegram 9659.pdf` (MED102, Microbiology, sampled
  for comparison before the module switch) — key marked by a **light grey highlight box**.

Three different visual encodings, all invisible to `pdftotext`/OCR text extraction, found in
three different files from the same corpus. This is the same class of hazard as the Kasr
"answer keys hide in highlights" trap, confirmed here independently for Menoufia. **Recovery
requires `pagetext.mjs render` (with `--force`, since these pages are not "garbled" by the
tool's own definition — they have a full, clean text layer) and reading the rendered page
image, not text/OCR.** Budget render calls deliberately (~50x the token cost of a cached
text page per the manual) — this triage rendered exactly 3 pages, one per file, to sample
the method and produce this checkpoint table, not the module's full ~27-paper set.

## Triage sample (3 rendered pages, 3 sources)

| Source | sourceId | Method | Page | Qs on page | Keys recovered |
|---|---|---|---:|--:|--:|
| `MFM42Support - Answers of MSK1 END.pdf` | `mu_2b2ae5ff3599e526123e` | rendered (red text) | p1 | 5 | 5/5 |
| `MSK2 endmodule exam group 1- model answer.pdf` | `mu_f6869acd17fa39839f00` | rendered (underline) | p1 | 3 | 3/3 |
| `End Foundation 2 Batch 43 - Answers - Telegram 9659.pdf` (MED102, comparison only, not counted in the MED104 totals below) | `mu_56d88740af5ca3011894` | rendered (grey highlight) | p1 | 3 | 3/3 |

sourceIds verified against `manifest/y1-sources.json` (`relativePath` match), 2026-09-02.

## Per-question triage (MED104 sample, 8 questions)

| # | Question (short) | Concept | Recovered key | Live / Pending / New |
|---|---|---|---|---|
| 1 | Amino acid not in collagen (present in elastin instead) | Desmosine as an elastin-specific cross-link, absent from collagen | d) Desmosine | **Pending** — `docs/import-ready/concept/102-INT-mcq-concepts.md` "Collagen and elastin ... desmosine cross-links" (same idea, Kasr 102-INT) |
| 2 | Menkes disease mechanism | Menkes disease: defective lysyl-oxidase-mediated collagen/elastin cross-linking (copper transport defect) | d) Defective cross-linking of collagen and elastin | **New** — no hit for "Menkes" anywhere live or pending |
| 3 | False statement about ascorbic acid | Ascorbic acid (vitamin C) cannot be synthesized in the human body | c) It can be synthesized in the body (false statement = correct answer) | **Pending** — `docs/import-ready/concept/AU-MED-102-biochem-metabolism-concepts.md` "cannot make ascorbic acid in the human body" (Alexandria AU-MED-102) |
| 4 | What increases intestinal Ca²⁺ solubility | pH-dependence of calcium solubility/absorption in the gut | b) Low pH | **New** — `find-existing` hits for "calcium absorption" are about which *vitamin* is required (103-BMS-MCQ-vitamins.md), not the pH mechanism; not the same tested idea |
| 5 | NOT a reason Vit D is considered a hormone | Vitamin D's atypical-hormone status (dietary source undermines the "hormone" classification) | c) It is found in dietary food | **New** — no hit for this specific classification-criteria angle (live Vit D concepts cover PTH/1,25(OH)₂D₃ physiology, not this "why is it hormone-like" framing) |
| 6 | Osteolytic epiphyseal mass, giant cells on biopsy | Giant cell tumor of bone (osteoclastoma) — locally malignant | d) Locally malignant process | **New** — no hit |
| 7 | Vit D deficiency in chronic renal disease — which enzyme defect | Renal 1-alpha-hydroxylase activates 25(OH)D → 1,25(OH)₂D₃; CKD impairs this step | b) Alpha-1 hydroxylase enzyme | **Live** — `CON-END-1DE2C490ABBA64` "PTH and decreased phosphate activate proximal-tubular 1-alpha-hydroxylase to form 1,25-dihydroxyvitamin D3" — same mechanism, CKD-defect framing is the new angle to add as an overlay, not a new concept |
| 8 | Sequestrum definition | Sequestrum = dead bone fragment (osteomyelitis) | b) Dead bone | **New** — `find-existing "osteomyelitis"` hits an unrelated Pasteurella/cat-bite concept (ASU-INF); no hit for the sequestrum definition itself |

## Checkpoint table (13-orchestration.md §5 shape)

| Module | Questions triaged | Keys recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|--:|--:|--:|--:|--:|--:|---|
| MU-MED104 (sample) | 8 | 8 | 8 | 1 | 2 | 5 | Menkes disease, Ca²⁺-pH absorption, Vit-D-as-hormone criteria → `fnd` (biochemistry, no live subject yet, per 00-START-HERE §3); Giant cell tumor of bone, Sequestrum/osteomyelitis → `msk` |

This is a **sample**, not the full module: 3 of MED104's 27 tier-1 paper files were
rendered (one page each). The remaining 24 paper files, 57 bank files and 9 department-book
files (see `coverage/MU-Y1-priority-sources.md`, `MU-MED104` section) are triaged-but-not-
keyed at this checkpoint — their question stems are readable via cached text (no render
needed for the stem, only for the key), so the next pass can triage question content freely
and defer render calls to key-recovery only, file by file.

## Needs Omar / open items

- Which visual key-marking convention (colour, underline, highlight) a given source uses is
  not predictable from the filename — each source needs at least one rendered page to
  determine its convention before bulk key recovery.
- MED106's semester-map marks (30) vs subject-component marks (45) conflict is unresolved —
  see `academic/MU-Y1-modules.md`. Not blocking for MED104 triage.
- `fnd` and `msk` subject placements above are provisional (this triage's own read of
  00-START-HERE §3's subject list), not yet confirmed by whoever runs S2 for this module.
