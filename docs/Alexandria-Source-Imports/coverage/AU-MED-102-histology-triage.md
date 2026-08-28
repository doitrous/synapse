# AU-MED-102 · Histology (+ Physiology fold) — question-led triage

Lane W1-102-HIST. Module `AU-MED-102` (`MED 102 - Foundation of Basic Medical Sciences &
Medical Terminology`), department `Histology`, year `AU_Y1`. GUARD = paper (5 files in
`Exams`: 2 categorised `End of Module paper`, 3 categorised `Department Questions`/"EOM MCQs
- " prefix). **Physiology fold** (orchestrator decision, `coverage/00-gap-ledger.md` "Wave-1
decisions"): AU-MED-102 has a single Physiology file and no Physiology lane of its own: its
questions are triaged here too. **Finding: the papers test Physiology heavily** (autonomic
nervous system + membrane transport + homeostasis — roughly a third of every paper's
non-Anatomy/Biochemistry/Embryology content) — so Step 2 should author Physiology alongside
Histology for this module, not skip it. Step 1 only — no concepts, articles or questions
authored below. Ends at the LANE-BRIEF §8 checkpoint.

## Counts

| questions triaged | keyed | unkeyed/unconfirmed | distinct concepts tested | hit-live | hit-pending | new |
|---:|---:|---:|---:|---:|---:|---:|
| 182 (Histology 132 + Physiology 50, counting each paper's citation of an item separately) | 152 | 30 | 58 (37 Histology + 21 Physiology) | 1 | 29 | 28 |

Of the 30 unkeyed/unconfirmed rows: 2 are the examiner's own unresolved mark (`Q64 = XXX`,
cited from both sourceIds that carry the 112-question bank), and 28 are every
Histology/Physiology-relevant citation from `EOM - End Foundation wafdeen-1.pdf` — see "Key
status: the wafdeen-1 paper" below for why none of that file's answers are recorded. Many
rows above cite the *same* underlying question twice (once per sourceId, where two files turn
out to be the same bank — see "Same bank, two sittings") — the distinct-item count is well
under 182; 58 distinct ideas is the number that matters for Step 2 authoring.

## Sources read

| sourceId | file | category | mode | key status found |
|---|---|---|---|---|
| `src_8d6ddf874f8984be8217` | `Exams/EOM - End foundation 2030.pdf` | End of Module paper | native, 12p | sectioned by department (Anatomy/Biochemistry/Physiology/Histology/Embryology); answer block at foot of each department's page(s); all keyed |
| `src_7d031a45baeadc973a00` | `Exams/EOM - end foundation مصريين 222 1.pdf` | Department Questions ("EOM MCQs -" prefix) | native, 11p | same bank as the file above (see "Same bank, two sittings" below), sectioned by department, all keyed; carries one extra Physiology item (myasthenia gravis) that the other sitting placed under Biochemistry |
| `src_3bf4527b51de57464e14` | `Exams/EOM - Final foundation 2030.pdf` | End of Module paper | native, 24p | continuous Q1–112, no department headers; answer block at foot; keyed except **Q64 = `XXX`** (examiner left it unresolved — recorded unkeyed, not guessed) |
| `src_413115a28d7dc9914c91` | `Exams/EOM - Foundation Final Egyptian.pdf` | Department Questions ("EOM MCQs -" prefix) | native, 24p | **content- and key-identical to `src_3bf4527b51de57464e14`**, including the same unresolved `Q64 = XXX` — same bank, cited under a different filename/sha256 (see below) |
| `src_29f02a5a4d6a273dea76` | `Exams/EOM - End Foundation wafdeen-1.pdf` | Department Questions ("EOM MCQs -" prefix) | native, 15p | continuous Q1–60, no department headers, **no answer block anywhere in the extracted text** — see "Key status: the wafdeen-1 paper" |

**Department files read** (Histology + Physiology, non-papers, extracted myself via
`scripts/alexandria/extract/pagetext.py` — not shared exam sources, so mine to run):

- `src_6308b5cf810fff88f4fb` / `src_13b9f43899f73978d4b1` — *Foundation* (Histology, Dr. Iman
  Nabil), 89p / 87p, two distinct-hash copies of the same title (not detected as name-twins by
  the manifest; near-identical filenames with an Arabic export-date suffix on the second).
  Table of contents: **1. Cell** (1.1 Cell Membrane · 1.2 Vesicular transport · 1.3 Cell
  organelles · 1.4 Centrosome · 1.5 Cytoplasmic inclusions · 1.6 Nucleus · 1.7 Nuclear pore
  complex · 1.8 Nucleolus · 1.9 Cell cycle & division · 1.10 Human chromosome · 1.11 Cell
  proliferation & death), **2. Epithelium** (lining/glandular/special types, functions,
  polarity, basement membrane, junctions, CAMs), **3. Connective tissue** (ground substance,
  fibres, cells, CT types), **4. Skin** (epidermis, dermis, hypodermis, appendages, functions).
  This is the department-book chapter structure used to group the tables below.
- `src_6e20a51098b2f4714c69` (twinPreferred), `src_0ff7a13df50c9413f992` (twinPreferred),
  `src_48dd7182f5b2779027dc` (twinPreferred) — Cell / Epithelium / Connective tissue revision
  condensates of the same notes; read for corroboration, not cited individually below. Their
  three non-preferred twins were skipped per the manifest's twin-handling rule.
- `src_13408f3cb7a0fd3cada1` — *Principles of Human Physiology, Foundation Module* (Dr.
  Mohammed Abdel Gawad), 58p, the module's one Physiology file. Table of contents: **Part 1A
  Cell membrane transport** · **Part 1B Homeostasis** · **Part 2 Autonomic nervous system**.

## Same bank, two sittings — a manifest twin-detection gap

`src_3bf4527b51de57464e14` ("Final foundation 2030.pdf") and `src_413115a28d7dc9914c91`
("Foundation Final Egyptian.pdf") extract to the **same 112 questions in the same order with
the same answer key** (including the same unresolved `Q64 = XXX`), but the manifest's
`nameTwinOf` is `null` on both — their filenames differ too much for the fuzzy name-match to
fire. They are the same underlying paper cited under two names/cohorts. Likewise
`src_8d6ddf874f8984be8217` ("End foundation 2030.pdf") and `src_7d031a45baeadc973a00` ("end
foundation مصريين 222 1.pdf") are the same 56-question bank, reordered between department
sections (one extra item — myasthenia gravis nAChR — sits in Biochemistry in the first and
Physiology in the second) and stated as `stream: egyptian` only on the second. **Recorded
below by citing both sourceIds per question** (per `exam_signal`'s own `src | tier | year`
per-line shape), not as duplicate authoring targets — Step 2 should write one question per
distinct item and list every sourceId that carried it.

## Key status: the wafdeen-1 paper

`src_29f02a5a4d6a273dea76` has no `ANSWERS` block anywhere in the extracted text (unlike all
four other Exams sources for this module). Its text layer shows an isolated blank line after
exactly one option per question — a formatting artefact consistent with a bolded/highlighted
correct answer surviving as extra whitespace in `pdftotext` output — but I have **not**
decoded this. `SHARED-TOOLCHAIN.md`'s answer-key decision procedure requires confirming a
suspected mark by rendering the page (200 dpi, not 150), which is a job for whoever authors
from this file, not for a plain-text pagetext cache, and doing it from the blank-line pattern
alone would be exactly the kind of invented key the brief forbids. **Every question from this
file is recorded as unconfirmed below**, not as answered. If the same 60-question bank
resurfaces keyed elsewhere (it shares several items verbatim with the two banks above — e.g.
the Q7/Q42 cell-coat and fat-soluble-passage items), Step 2 should prefer the keyed sitting and
treat wafdeen-1 only as a second citation.

## Histology — grouped by department-book chapter

### 1.1 Cell Membrane

| sourceId | page | stem (short) | key status | signals |
|---|---|---|---|---|
| `src_29f02a5a4d6a273dea76` | p1 | Membrane structure linking the cell membrane to cytoplasmic components (peripheral protein) | unconfirmed | filename says "wafdeen" but manifest streamSignal is null |
| `src_3bf4527b51de57464e14` | p2 | Which allows passage of fat-soluble substances (phospholipids) | keyed (b) | cohort 2030 (filename) |
| `src_413115a28d7dc9914c91` | p2 | same item | keyed (b) | — |
| `src_3bf4527b51de57464e14` | p9 | Function of the cell coat (glycocalyx → cell–cell adhesion) | keyed (d) | |
| `src_413115a28d7dc9914c91` | p9 | same item | keyed (d) | |

### 1.2 Vesicular transport

| sourceId | page | stem (short) | key status | signals |
|---|---|---|---|---|
| `src_8d6ddf874f8984be8217` | p8 | Substance that enters the cell with pinocytosis (fluid with ions) | keyed (d) | cohort 2030 |
| `src_7d031a45baeadc973a00` | p8 | same item | keyed (d) | stream: egyptian |
| `src_3bf4527b51de57464e14` | p9 | Type of vesicular transport shown in a diagram | keyed (c) | diagram question |
| `src_413115a28d7dc9914c91` | p9 | same item | keyed (c) | diagram question |
| `src_29f02a5a4d6a273dea76` | p1 | Process forming coated vesicles (receptor-mediated endocytosis) | unconfirmed | |

### 1.3 Cell organelles (incl. cytoskeleton, mitochondria, ER, Golgi, lysosomes/peroxisomes)

| sourceId | page | stem (short) | key status | signals |
|---|---|---|---|---|
| `src_8d6ddf874f8984be8217` | p7 | Cytoskeleton type forming centrioles | keyed (b) | cohort 2030 |
| `src_7d031a45baeadc973a00` | p7 | same item | keyed (b) | stream: egyptian |
| `src_8d6ddf874f8984be8217` | p8 | Neuroglial tumour, IHC marker (GFAP) | keyed (c) | |
| `src_7d031a45baeadc973a00` | p7 | same item | keyed (c) | |
| `src_3bf4527b51de57464e14` | p7 | Mesenchymal tumour, IHC marker (vimentin) | keyed (d) | |
| `src_413115a28d7dc9914c91` | p7 | same item | keyed (d) | |
| `src_29f02a5a4d6a273dea76` | p6 | same idea, vimentin/mesenchymal tumour | unconfirmed | |
| `src_8d6ddf874f8984be8217` | p9 | Mitochondrial DNA (circular) | keyed (c) | |
| `src_7d031a45baeadc973a00` | p8 | same item | keyed (c) | |
| `src_29f02a5a4d6a273dea76` | p3 | Cardiolipin site in the mitochondrion | unconfirmed | |
| `src_29f02a5a4d6a273dea76` | p3 | Polysomes attach to which structure (RER) | unconfirmed | |
| `src_29f02a5a4d6a273dea76` | p3 | Golgi part pointed to in a diagram | unconfirmed | diagram question |
| `src_8d6ddf874f8984be8217` | p10 | Golgi face bearing transport vesicles (trans) | keyed (d) | |
| `src_7d031a45baeadc973a00` | p9 | same item | keyed (d) | |
| `src_8d6ddf874f8984be8217` | p10 | Features of sER | keyed (a) | |
| `src_7d031a45baeadc973a00` | p9 | same item | keyed (a) | |
| `src_3bf4527b51de57464e14` | p9 | Organelle in steroid-hormone synthesis (sER) | keyed (a) | |
| `src_413115a28d7dc9914c91` | p9 | same item | keyed (a) | |
| `src_3bf4527b51de57464e14` | p10 | Organelle function shown in a diagram | keyed (b) | diagram question |
| `src_413115a28d7dc9914c91` | p10 | same item | keyed (b) | diagram question |
| `src_3bf4527b51de57464e14` | p10 | Autophagy — process breaking down malfunctioning organelles | keyed (a) | |
| `src_413115a28d7dc9914c91` | p10 | same item | keyed (a) | |
| `src_3bf4527b51de57464e14` | p10 | Organelle "responsible for maintaining body temperature" | keyed (b, peroxisome) | **medically odd key — see HAZARDS** |
| `src_413115a28d7dc9914c91` | p10 | same item | keyed (b) | |
| `src_3bf4527b51de57464e14` | p10 | Mutated protein affecting flagella function (tubulin) | keyed (a) | |
| `src_413115a28d7dc9914c91` | p10 | same item | keyed (a) | |
| `src_3bf4527b51de57464e14` | p20 | Organelle comparison (double membrane / steroid synthesis / protein-synthesising cell) | keyed (b) | |
| `src_413115a28d7dc9914c91` | p20 | same item | keyed (b) | |
| `src_29f02a5a4d6a273dea76` | p6 | Organelle function shown in a photo | unconfirmed | diagram question |
| `src_29f02a5a4d6a273dea76` | p10 | Phase in which the cell attains full size (cell-cycle/growth, filed here for organelle-content growth) | unconfirmed | |
| `src_29f02a5a4d6a273dea76` | p12 | Secretion mode shown in a diagram | unconfirmed | diagram question |

### 1.6–1.9 Nucleus, chromatin, nucleolus, cell cycle

| sourceId | page | stem (short) | key status | signals |
|---|---|---|---|---|
| `src_8d6ddf874f8984be8217` | p9 | Central core of the nucleosome (eight histones) | keyed (b) | |
| `src_7d031a45baeadc973a00` | p8 | same item | keyed (b) | |
| `src_3bf4527b51de57464e14` | p8 | same item | keyed (b) | |
| `src_413115a28d7dc9914c91` | p8 | same item | keyed (b) | |
| `src_8d6ddf874f8984be8217` | p9 | Checkpoint shown at a black arrow (restriction checkpoint) | keyed (a) | diagram question |
| `src_7d031a45baeadc973a00` | p8–9 | same item | keyed (a) | diagram question |
| `src_3bf4527b51de57464e14` | p8 | Phase the restriction checkpoint occurs in (G1) | keyed (a) | |
| `src_413115a28d7dc9914c91` | p8 | same item | keyed (a) | |
| `src_29f02a5a4d6a273dea76` | p6 | Form of chromatin appearing lightly stained/basophilic (euchromatin) | unconfirmed | |
| `src_29f02a5a4d6a273dea76` | p10 | Event occurring during cytokinesis | unconfirmed | |
| `src_3bf4527b51de57464e14` | p11 | Mitosis stage shown in a diagram | keyed (c) | diagram question |
| `src_413115a28d7dc9914c91` | p11 | same item | keyed (c) | diagram question |
| `src_8d6ddf874f8984be8217` | p9 | Final cells produced from telophase 1 (meiosis) | keyed (b) | |
| `src_7d031a45baeadc973a00` | p8 | same item | keyed (b) | |
| `src_3bf4527b51de57464e14` | p11 | Phase in which crossing-over occurs (prophase I) | keyed (a) | |
| `src_413115a28d7dc9914c91` | p11 | same item | keyed (a) | |

### 1.11 Cell proliferation & death

| sourceId | page | stem (short) | key status | signals |
|---|---|---|---|---|
| `src_8d6ddf874f8984be8217` | p7 | Cell type in the stable cell population | keyed (b) | |
| `src_7d031a45baeadc973a00` | p6 | same item | keyed (b) | |
| `src_3bf4527b51de57464e14` | p11 | Smooth muscle classified by proliferative ability (stable cell population) | keyed (c) | |
| `src_413115a28d7dc9914c91` | p11 | same item | keyed (c) | |
| `src_29f02a5a4d6a273dea76` | p11 | Characteristics of stable cells | unconfirmed | |
| `src_8d6ddf874f8984be8217` | p7 | Macrophage nucleus shape (eccentric, kidney-shaped) | keyed (d) | |
| `src_7d031a45baeadc973a00` | p6 | same item | keyed (d) | |

### 2. Epithelium (lining, glandular, special types, polarity, junctions)

| sourceId | page | stem (short) | key status | signals |
|---|---|---|---|---|
| `src_3bf4527b51de57464e14` | p8 | Normal lining epithelium of wet surfaces subject to wear and tear | keyed (a) | |
| `src_413115a28d7dc9914c91` | p8 | same item | keyed (a) | |
| `src_29f02a5a4d6a273dea76` | p11 | Normal lining epithelium of the oesophagus | unconfirmed | |
| `src_8d6ddf874f8984be8217` | p9 | Appearance of transitional epithelium in the empty bladder | keyed (c) | |
| `src_7d031a45baeadc973a00` | p9 | same item | keyed (c) | |
| `src_8d6ddf874f8984be8217` | p10 | Apical surface structure of an epithelium (stereocilia) | keyed (b) | wording: "epidermis" in this sitting |
| `src_7d031a45baeadc973a00` | p9 | same item | keyed (b) | wording drifted to "epididymis" in this sitting — **see HAZARDS** |
| `src_8d6ddf874f8984be8217` | p10 | Gland type shown in a diagram | keyed (a) | wording: "unilocular gland" |
| `src_7d031a45baeadc973a00` | p9 | same item | keyed (a) | wording drifted to "unicellular gland" — **see HAZARDS** |
| `src_3bf4527b51de57464e14` | p11 | Where a named epithelium type is found (thyroid follicle etc.) | keyed (a) | |
| `src_413115a28d7dc9914c91` | p11 | same item | keyed (a) | |
| `src_3bf4527b51de57464e14` | p12 | Epithelium type in the organ of Corti (neuroepithelium) | keyed (b) | |
| `src_413115a28d7dc9914c91` | p12 | same item | keyed (b) | |
| `src_3bf4527b51de57464e14` | p13 | What epithelial polarity facilitates (fluid absorption) | keyed (a) | |
| `src_413115a28d7dc9914c91` | p13 | same item | keyed (a) | |
| `src_3bf4527b51de57464e14` | p14 | Cell polarity feature increasing ion transport (basal infolding) | keyed (b) | |
| `src_413115a28d7dc9914c91` | p14 | same item | keyed (b) | |
| `src_29f02a5a4d6a273dea76` | p13 | Protein related to the microvillous structure (actin) | unconfirmed | |
| `src_8d6ddf874f8984be8217` | p8 | Junction type containing cytokeratin filaments | keyed (c) | |
| `src_7d031a45baeadc973a00` | p8 | same item | keyed (c) | |
| `src_29f02a5a4d6a273dea76` | p13 | Junction number containing connexins | unconfirmed | |
| `src_3bf4527b51de57464e14` | p22 | Barrier junction between cells (tight junction) | keyed (d) | |
| `src_413115a28d7dc9914c91` | p22 | same item | keyed (d) | |
| `src_3bf4527b51de57464e14` | p22 | Substance describing gap junction (connexin) | keyed (b) | |
| `src_413115a28d7dc9914c91` | p22 | same item | keyed (b) | |
| `src_3bf4527b51de57464e14` | p9 | Function of a pointed junction structure (link cytoskeleton to ECM — hemidesmosome) | keyed (a) | |
| `src_413115a28d7dc9914c91` | p9 | same item | keyed (a) | |
| `src_3bf4527b51de57464e14` | p22 | Gland with apocrine secretory mechanism | keyed (c) | |
| `src_413115a28d7dc9914c91` | p22 | same item | keyed (c) | |

### 3. Connective tissue

| sourceId | page | stem (short) | key status | signals |
|---|---|---|---|---|
| `src_8d6ddf874f8984be8217` | p7 | CT fibre forming delicate supporting networks (reticular) | keyed (d) | |
| `src_7d031a45baeadc973a00` | p7 | same item | keyed (d) | |
| `src_3bf4527b51de57464e14` | p8 | same item | keyed (d) | |
| `src_413115a28d7dc9914c91` | p8 | same item | keyed (d) | |
| `src_29f02a5a4d6a273dea76` | p13 | Most abundant CT fibre type | unconfirmed | |
| `src_3bf4527b51de57464e14` | p12 | Ground-substance component causing viscous gel nature (proteoglycans) | keyed (c) | |
| `src_413115a28d7dc9914c91` | p12 | same item | keyed (c) | |
| `src_8d6ddf874f8984be8217` | p8 | CT type most affected in tendons/ligaments ("white fibrous"/dense regular) | keyed (d) | |
| `src_7d031a45baeadc973a00` | p7 | same item | keyed (d) | |
| `src_3bf4527b51de57464e14` | p23 | True statement about a named CT (vascularity/cellularity/ground substance/pulling-force resistance) | keyed (c) | |
| `src_413115a28d7dc9914c91` | p23 | same item | keyed (c) | |
| `src_3bf4527b51de57464e14` | p23 | Characteristic of loose areolar CT | keyed (c) | |
| `src_413115a28d7dc9914c91` | p23 | same item | keyed (c) | |
| `src_29f02a5a4d6a273dea76` | p14 | CT type shown in a diagram (ligamenta nuchae etc.) | unconfirmed | diagram question |
| `src_8d6ddf874f8984be8217` | p8 | Site for adipose CT (behind eyeball) | keyed (b) | |
| `src_7d031a45baeadc973a00` | p8 | same item | keyed (b) | |
| `src_3bf4527b51de57464e14` | p12 | Infant with no brown fat — probable consequence | keyed (d) | |
| `src_413115a28d7dc9914c91` | p12 | same item | keyed (d) | |
| `src_3bf4527b51de57464e14` | p23 | Characteristic of unilocular adipose CT | keyed (b) | |
| `src_413115a28d7dc9914c91` | p23 | same item | keyed (b) | |
| `src_29f02a5a4d6a273dea76` | p14 | Organelle abundant in multilocular adipose CT (mitochondria) | unconfirmed | |
| `src_3bf4527b51de57464e14` | p12 | Cell responsible for a bee-sting reaction (mast cell) | keyed (a) | |
| `src_413115a28d7dc9914c91` | p12 | same item | keyed (a) | |
| `src_3bf4527b51de57464e14` | p12 | Process a named cell initiates (diagram) | keyed (c) | diagram question |
| `src_413115a28d7dc9914c91` | p12 | same item | keyed (c) | diagram question |
| `src_3bf4527b51de57464e14` | p13 | Most abundant cell in the pulp of growing teeth (mesenchymal stem cells) | keyed (b) | |
| `src_413115a28d7dc9914c91` | p13 | same item | keyed (b) | |
| `src_3bf4527b51de57464e14` | p13 | Inactive cell that can return to an active state (fibrocyte) | keyed (c) | |
| `src_413115a28d7dc9914c91` | p13 | same item | keyed (c) | |
| `src_29f02a5a4d6a273dea76` | p13 | Transient connective-tissue cell (plasma cell) | unconfirmed | |

### 4. Skin

| sourceId | page | stem (short) | key status | signals |
|---|---|---|---|---|
| `src_8d6ddf874f8984be8217` | p7 | Cell affected in vitiligo (melanocytes) | keyed (a) | |
| `src_7d031a45baeadc973a00` | p7 | same item | keyed (a) | |
| `src_3bf4527b51de57464e14` | p8 | Epidermal layer giving the waterproof barrier | keyed (a) | |
| `src_413115a28d7dc9914c91` | p8 | same item | keyed (a) | |
| `src_29f02a5a4d6a273dea76` | p15 | Function of the stratum spinosum | unconfirmed | |
| `src_3bf4527b51de57464e14` | p13 | Histological feature of sebaceous-gland germinal cells | keyed (a) | |
| `src_413115a28d7dc9914c91` | p13 | same item | keyed (a) | |
| `src_3bf4527b51de57464e14` | p13 | Nature of eccrine sweat-gland secretion (watery, electrolyte-rich) | keyed (c) | |
| `src_413115a28d7dc9914c91` | p13 | same item | keyed (c) | |

## Physiology (folded) — grouped by the book's own parts

### Part 1A — Cell membrane transport

| sourceId | page | stem (short) | key status | signals |
|---|---|---|---|---|
| `src_3bf4527b51de57464e14` | p14 | Best description of osmosis | **unkeyed — examiner's key is `XXX`** | |
| `src_413115a28d7dc9914c91` | p14 | same item | **unkeyed — same `XXX`** | |
| `src_29f02a5a4d6a273dea76` | p1 | Definition of osmosis (different option set) | unconfirmed | |
| `src_3bf4527b51de57464e14` | p14 | Transport type of the Na+/K+ pump (primary active transport) | keyed (c) | |
| `src_413115a28d7dc9914c91` | p14 | same item | keyed (c) | |

### Part 1B — Homeostasis

| sourceId | page | stem (short) | key status | signals |
|---|---|---|---|---|
| `src_8d6ddf874f8984be8217` | p5 | Ionic basis of the membrane potential | keyed (a) | |
| `src_7d031a45baeadc973a00` | p5 | same item | keyed (a) | |
| `src_8d6ddf874f8984be8217` | p5 | Which ion is higher in ECF than ICF (calcium) | keyed (a) | |
| `src_7d031a45baeadc973a00` | p5 | same item | keyed (a) | |
| `src_3bf4527b51de57464e14` | p15 | Statement best describing ECF | keyed (a) | |
| `src_413115a28d7dc9914c91` | p15 | same item | keyed (a) | |
| `src_8d6ddf874f8984be8217` | p5 | Components of a negative-feedback loop | keyed (a) | |
| `src_7d031a45baeadc973a00` | p5 | same item | keyed (a) | |
| `src_3bf4527b51de57464e14` | p14 | Statement best describing homeostasis | keyed (c) | |
| `src_413115a28d7dc9914c91` | p14 | same item | keyed (c) | |
| `src_3bf4527b51de57464e14` | p14 | Smallest body-fluid compartment (transcellular) | keyed (a) | |
| `src_413115a28d7dc9914c91` | p14 | same item | keyed (a) | |
| `src_3bf4527b51de57464e14` | p15 | Example of a positive-feedback mechanism (suckling reflex) | keyed (b) | |
| `src_413115a28d7dc9914c91` | p15 | same item | keyed (b) | |

### Part 2 — Autonomic nervous system

| sourceId | page | stem (short) | key status | signals |
|---|---|---|---|---|
| `src_8d6ddf874f8984be8217` | p6 | Result of vagus nerve stimulation | keyed (b) | |
| `src_7d031a45baeadc973a00` | p5 | same item | keyed (b) | |
| `src_8d6ddf874f8984be8217` | p6 | Exam-stress vignette: dry mouth + tachycardia, receptor type (cholinergic, sweat/salivary) | keyed (c) | |
| `src_7d031a45baeadc973a00` | p6 | myasthenia gravis vignette placed in this section instead — see OWED | keyed (d) | this sitting moved the item here from Biochemistry |
| `src_3bf4527b51de57464e14` | p16 | Nicotinic receptor location (motor end plate) | keyed (c) | |
| `src_413115a28d7dc9914c91` | p16 | same item | keyed (c) | |
| `src_8d6ddf874f8984be8217` | p6 | Sympathomimetic drug — associated effect (urine retention) | keyed (a) | |
| `src_7d031a45baeadc973a00` | p6 | same item | keyed (a) | |
| `src_8d6ddf874f8984be8217` | p6 | Effect of anterior hypothalamus stimulation | keyed (c) | |
| `src_7d031a45baeadc973a00` | p6 | same item | keyed (c) | |
| `src_3bf4527b51de57464e14` | p15 | Function of the autonomic ganglia | keyed (d) | |
| `src_413115a28d7dc9914c91` | p15 | same item | keyed (d) | |
| `src_29f02a5a4d6a273dea76` | p10 | Function of the autonomic ganglia (second phrasing) | unconfirmed | |
| `src_3bf4527b51de57464e14` | p15 | Consequence of sacral spinal-cord destruction (loss of erection) | keyed (a) | |
| `src_413115a28d7dc9914c91` | p15 | same item | keyed (a) | |
| `src_3bf4527b51de57464e14` | p15 | Where preganglionic parasympathetic fibres usually relay (terminal ganglia) | keyed (b) | |
| `src_413115a28d7dc9914c91` | p15 | same item | keyed (b) | |
| `src_3bf4527b51de57464e14` | p16 | Consequence of cervical sympathetic ganglion injury (Horner's-type) | keyed (c) | |
| `src_413115a28d7dc9914c91` | p16 | same item | keyed (c) | |
| `src_3bf4527b51de57464e14` | p19 | Better treatment for bronchial asthma (adrenergic subtype) | keyed (d) | |
| `src_413115a28d7dc9914c91` | p19 | same item | keyed (d) | |
| `src_29f02a5a4d6a273dea76` | p7 | Effect of epinephrine on bronchial smooth muscle | unconfirmed | |
| `src_29f02a5a4d6a273dea76` | p10 | Effect of a beta-blocker | unconfirmed | |
| `src_3bf4527b51de57464e14` | p21 | True statement about preganglionic nerves (CNS cell body) | keyed (b) | |
| `src_413115a28d7dc9914c91` | p21 | same item | keyed (b) | |
| `src_3bf4527b51de57464e14` | p23 | Location of the sympathetic centre in the CNS | keyed (c) | |
| `src_413115a28d7dc9914c91` | p23 | same item | keyed (c) | |
| `src_29f02a5a4d6a273dea76` | p5 | Control-system type illustrated by vagal slowing of the SA node | unconfirmed | |
| `src_29f02a5a4d6a273dea76` | p5 | What characterises autonomic neurons (involuntary control) | unconfirmed | |
| `src_29f02a5a4d6a273dea76` | p5 | Main relay site of preganglionic sympathetic fibres | unconfirmed | |
| `src_29f02a5a4d6a273dea76` | p7 | Significance of parasympathetic tone (resting heart rate) | unconfirmed | |

## Cohort / stream signals

- `src_8d6ddf874f8984be8217`, `src_3bf4527b51de57464e14`: `cohortSignal: ["2030"]` (filename
  "foundation 2030" — a **graduating-cohort label, not a sitting year**, per the brief).
- `src_7d031a45baeadc973a00`: `streamSignal: "egyptian"` (مصريين in the filename).
- `src_413115a28d7dc9914c91` and `src_29f02a5a4d6a273dea76`: filenames state "Egyptian" and
  "wafdeen" respectively, but the manifest's `streamSignal` is `null` on both — the same class
  of stream-classifier gap already found by the sibling AU-MED-103-histology triage (recorded
  there as a manifest defect). Not re-derived here; recorded as a filename-only signal.
- **No sitting year is printed on any of the five sources' own pages** — none carry a dated
  header — so `sittingYear` stays empty on every item above, correctly.

## Ordered list of distinct ideas tested → concept candidates

Key search run per idea: `find-existing.mjs` (≥4 queries where the idea supported them) **and**
`grep -ril "<term>" docs/*-Source-Imports/concept/` (mandatory per brief §16, since
`find-existing.mjs` does not read a pending file's `## canonical_key`). Full keyword-run output
kept at `/tmp/au102-hist-triage/{hist,phys}-results.txt` (scratch, not committed) for anyone
re-checking a specific query.

### Histology (37 ideas)

| # | Idea | Classification | Evidence |
|---|---|---|---|
| 1 | Peripheral membrane proteins link the membrane to the cytoskeleton | **NEW** | no hit either query |
| 2 | Phospholipid bilayer permits passage of fat-soluble substances | **NEW** | no hit |
| 3 | The glycocalyx/cell coat mediates recognition and cell–cell adhesion | **HIT-PENDING** | `CON-FND-F2237ED98E88F3` "The cell coat is the carbohydrate of the outer membrane surface…" — `101-ISK-mcq-concepts.md` |
| 4 | Endocytosis subtypes (pinocytosis / receptor-mediated / phagocytosis) distinguished by uptake mechanism | **HIT-PENDING** | `CON-FND-E66C68C0B80D16` "The membrane takes material in by phagocytosis, pinocytosis or receptor-mediated endocytosis…" — `101-ISK-mcq-concepts.md` |
| 5 | Cardiolipin is localised to the inner mitochondrial membrane | **NEW** | no hit |
| 6 | RER (ribosome-studded, protein export) vs sER (ribosome-free, steroid synthesis) distinguished by structure and function | **HIT-PENDING** | multiple pending records, `101-ISK-concepts.md` / `101-ISK-mcq-concepts.md` / `101-ISK-practical-concepts.md` (RER and sER each separately described) |
| 7 | Golgi apparatus polarity: forming/cis vs maturing/trans face, direction follows secretion | **HIT-PENDING** | `101-ISK-concepts.md`, `101-ISK-practical-concepts.md` ("stacked parallel saccules with transfer vesicles on one face and secretory vesicles on the other") |
| 8 | Autophagy = the cell degrading its own malfunctioning organelles | **NEW** | `find-existing.mjs`: "No existing record… safe to create" |
| 9 | Peroxisome function/staining | **HIT-PENDING**, but **flagged** | `101-ISK-mcq-concepts.md`: "A peroxisome holds oxidases that make hydrogen peroxide and catalase that destroys it" — this pending record does **not** support the exam's claimed answer (thermoregulation); see HAZARDS, do not silently reconcile |
| 10 | Cytoskeleton typing: microtubule triplets form centrioles | **HIT-PENDING** | `101-ISK-mcq-concepts.md` "A centriole is a cylinder of nine microtubule triplets…" |
| 11 | Intermediate-filament typing is diagnostic of tumour origin (vimentin=mesenchymal, GFAP=neuroglial) | **HIT-PENDING** | separate pending alias entries for Vimentin and GFAP in `101-ISK-mcq-concepts.md` — Step 2 must check whether one record already covers the typing logic or each filament is its own record |
| 12 | Euchromatin (active, lightly stained) vs heterochromatin (condensed, inactive) | **HIT-PENDING** | `101-ISK-mcq-concepts.md`, both described separately |
| 13 | Nucleosome core is eight histones | **NEEDS RECHECK** | an *article* alias ("Nucleosome and histones", `102-INT-biochemistry.md`) was found; no concept record confirmed in this pass — do not assume either way at Step 2 |
| 14 | Nucleolus and rRNA synthesis (pars fibrosa/granulosa/amorpha) | **HIT-PENDING** | extensive, `101-ISK-mcq-concepts.md` |
| 15 | Mitochondrial DNA is a small circular molecule, maternally inherited | **HIT-PENDING** | `102-INT-concepts.md` "Mitochondrial DNA is a small double-stranded circular supercoil… inherited only from the mother" |
| 16 | Restriction checkpoint occurs in G1 | **NEW** (general "cell cycle checkpoint" topic is HIT-PENDING as an *article* alias, `102-INT-biochemistry.md`, but no concept record on the restriction-checkpoint claim itself surfaced) | flagged for a closer Step 2 check |
| 17 | Mitosis stage identification (chromosome condensation, nuclear-envelope breakdown, cytokinesis) | **NEW** | no hit |
| 18 | Meiosis: crossing-over occurs in prophase I | **NEW** | no hit |
| 19 | Cell-population kinetics: labile / stable / permanent, by tissue example | **HIT-PENDING** | `CON-` aliased "Stable cell population" — `101-ISK-mcq-concepts.md` |
| 20 | Macrophage nuclear morphology (eccentric, kidney-shaped) | **NEW** | no hit |
| 21 | Transitional epithelium's distension-dependent morphology (umbrella cells, layer count) | **HIT-PENDING** | `101-ISK-concepts.md` / `101-ISK-mcq-concepts.md` "Transitional epithelium — urothelium — has dome-shaped superficial cells with rigid plaques, and it thins from 6–8 layers to 3–4 as the bladder fills" |
| 22 | Epithelium lining by specific site (oesophagus, organ of Corti) | **NEW** (both queries) | no hit |
| 23 | Apical surface specialisations distinguish epithelial types (cilia/stereocilia/microvilli/flagella) | **HIT-PENDING** | stereocilia and microvilli each separately pending, `101-ISK-mcq-concepts.md` / `101-ISK-practical-concepts.md` |
| 24 | Glandular classification (unicellular/unilocular vs compound) | **NEW** | no hit under either wording |
| 25 | Secretion mechanisms: merocrine / apocrine / holocrine | **mixed** | apocrine is **HIT-LIVE** (`CON-DER-8F25CCE084AF16` "Apocrine secretion is viscous and initially odorless but becomes offensive through bacterial action"); merocrine and holocrine are pending-*question*-only (`101-ISK-mcq.md`), no concept record confirmed — **NEW** for those two pending a closer check |
| 26 | Epithelial polarity: microvilli↔absorption, basal infolding↔ion transport | **mixed** | basal infolding is **HIT-PENDING** (`101-ISK-mcq-concepts.md` "Basal infoldings increase the basal surface area… to power active transport"); the general "polarity facilitates fluid absorption" framing is **NEW** |
| 27 | Junction typing: desmosome/cytokeratin, hemidesmosome↔basement membrane, gap junction↔connexin, tight junction↔paracellular barrier | **mixed** | hemidesmosome and tight junction are **HIT-PENDING** (`101-ISK-mcq-concepts.md`); gap-junction/connexin and desmosome/cytokeratin specifically are **NEW** on the queries run — recommend a plain "gap junction" re-query at Step 2 before minting |
| 28 | Ground substance viscosity from proteoglycans/GAGs (hyaluronic acid) | **HIT-PENDING**, related but not confirmed identical scope | `101-ISK-mcq-concepts.md` "Mucoid connective tissue is a soft jelly rich in hyaluronic acid…" describes mucoid CT locations, not directly "ground substance viscosity" — flagged for a Step 2 scope check |
| 29 | CT fibre types: collagen I/II/III, elastic, reticular; reticular forms delicate networks | **HIT-PENDING** | extensive, `101-ISK-mcq-concepts.md` / `101-ISK-histology-2.md` / `101-ISK-identification.md` |
| 30 | CT cell types and behaviour: fibroblast↔fibrocyte reactivation, mast cell (bee-sting/allergic), mesenchymal stem cells in dental pulp | **mixed** | mast cell is extensively **HIT-PENDING** (22 records, `101-ISK-concepts.md`/`101-ISK-mcq-concepts.md`); fibroblast/fibrocyte reactivation and dental-pulp mesenchymal cells are **NEW** on the queries run |
| 31 | Loose areolar CT: commonest type, contains every fibre/cell type | **HIT-PENDING** | `101-ISK-mcq-concepts.md` / `101-ISK-practical-concepts.md` |
| 32 | Dense regular ("white fibrous") CT of tendons/ligaments | **NEW** | no hit |
| 33 | Adipose CT: unilocular vs multilocular, sites, neonatal brown-fat deficiency and thermoregulation | **NEW** | no hit on either wording |
| 34 | Epidermal strata and the waterproof/keratin barrier (stratum spinosum/granulosum/lucidum) | **NEW** | no hit |
| 35 | Vitiligo = loss of melanocytes | **NEW** | no hit |
| 36 | Sebaceous gland germinal-cell histology | **NEW** (a *different* live concept, `CON-GYN-057D0C4EA5196B` on Montgomery's areolar glands, is not a duplicate — different scope) | not a hit |
| 37 | Eccrine sweat gland secretion (watery, electrolyte-rich, merocrine) | **NEW** | no hit |

**Histology total: 37 ideas** — 1 HIT-LIVE (row 25, apocrine only), 20 HIT-PENDING (rows 3, 4,
6, 7, 9\*, 10, 11, 12, 14, 15, 19, 21, 23, 25\* [merocrine/holocrine still open], 26\* [basal
infolding only], 27\* [hemidesmosome + tight junction only], 28\*, 29, 30\* [mast cell only],
31 — asterisked rows are partial hits, the remainder of that row is NEW/flagged), 1 needs
recheck (row 13), 15 clean NEW (rows 1, 2, 5, 8, 16, 17, 18, 20, 22, 24, 32, 33, 34, 35, 37) —
plus 36 (a false-positive live neighbour, treated as NEW).

### Physiology (21 ideas)

| # | Idea | Classification | Evidence |
|---|---|---|---|
| 1 | Resting membrane potential's ionic basis (Na/K/Cl/protein gradients) | **NEW** (a related but distinct pending concept exists — see note) | `CON-NEU-77596C8A899A7E` "Sodium permeability sets nerve excitability and extracellular potassium sets the resting potential" (`103-BMS-mcq-vitamins-nerve-concepts.md`) is nerve-specific excitability, not the general foundation-level ionic-distribution claim tested here — flagged for a Step 2 tiebreaker, not pre-merged |
| 2 | Negative-feedback loop components (detector/centre/effector) | **NEW** | no hit |
| 3 | ECF vs ICF electrolyte distribution (Ca2+, Na+, Cl- vs K+/protein/phosphate) | **NEW** | no hit |
| 4 | Vagal (parasympathetic) effects on thoracic/abdominal viscera | **HIT-PENDING** | `CON-NEU-C3D7B209FB3260` "The vagus carries the whole parasympathetic supply of the thoracic and abdominal viscera, slowing the atria, constricting bronchi, driving gut…" (`102-INT-concepts.md`) |
| 5 | Autonomic fibres named by transmitter; sympathetic sweat-gland innervation is the cholinergic exception | **HIT-PENDING** | `CON-NEU-1DB903AAE3D02A` "Autonomic fibres are named for the transmitter they release: cholinergic fibres are every preganglionic fibre, every postganglionic parasymp[athetic]…" (`102-INT-concepts.md`) |
| 6 | Sympathetic mass discharge (pupil, heart, bronchi, bladder together) | **HIT-PENDING** | `CON-NEU-DCDACCB179C2A5` "The sympathetic system discharges as one unit in an emergency…" (`102-INT-concepts.md`) |
| 7 | Anterior hypothalamus stimulation → parasympathetic-type response | **NEW** | no hit |
| 8 | Osmosis: solvent movement across a semipermeable membrane down its gradient | **NEW** | confirmed via both `find-existing.mjs` and a direct grep; `CON-HEM-BF988AB4E39366` (RBC crenation in tonic media) is related but a distinct, narrower concept |
| 9 | Na+/K+ pump as the paradigm primary active transporter | **HIT-PENDING** | `CON-NEU-1E66BE533E894C` "The Na+-K+ pump is ATP-driven primary active transport of three sodium out for two potassium in, which makes it electrogenic" (`103-BMS-mcq-vitamins-nerve-concepts.md`) |
| 10 | Homeostasis defined as regulation within narrow limits (not a fixed state) | **NEW** | no hit |
| 11 | Body-fluid compartment volumes — transcellular is the smallest | **NEW** | no hit |
| 12 | Positive-feedback example: the suckling reflex during lactation | **NEW** | no hit |
| 13 | Autonomic ganglia as relay stations; four ganglion types (paravertebral/collateral/terminal/adrenal medulla) | **HIT-PENDING** | `CON-NEU-FCFD384A1011F8` "There are four types of autonomic ganglion — the paravertebral sympathetic chain, the collateral ganglia, the terminal ganglia, and the adre[nal medulla]…" (`102-INT-concepts.md`) — also covers the "where do preganglionic parasympathetic fibres relay" item (terminal ganglia) |
| 14 | Sacral parasympathetic outflow and erectile function; spinal-level lesion correlate | **NEW** | no hit |
| 15 | Cervical sympathetic chain lesion → Horner's-type picture | **NEW** | no hit |
| 16 | Nicotinic receptor distribution (motor end-plate vs autonomic ganglia) and ligand-gated ion-channel nature | **NEW** (closely related pending concept on myasthenia gravis exists, see below) | no direct hit on receptor distribution/classification itself |
| 17 | Myasthenia gravis = autoantibodies against the nicotinic ACh receptor at the neuromuscular junction | **HIT-PENDING** | `103-BMS-mcq-vitamins-nerve-concepts.md`: "Myasthenia gravis is antibodies against the acetylcholine receptor, which is why an anticholinesterase relieves it" |
| 18 | Adrenoceptor subtypes: beta-2 agonism relaxes bronchial smooth muscle; beta-blockade slows the heart | **HIT-PENDING** | `CON-NEU-F16D60268905BC` "Adrenergic receptors sit both on the effector organ and on the nerve ending… two alpha and three beta subtypes" (`102-INT-concepts.md`) |
| 19 | Preganglionic autonomic neurons: cell bodies in the CNS, cholinergic regardless of division | **HIT-PENDING** | same `CON-NEU-1DB903AAE3D02A` as idea 5 |
| 20 | ANS general definition: control of involuntary/visceral function | **NEW** | no hit |
| 21 | Sympathetic outflow origin: lateral horn, thoracolumbar cord | **NEW** | no hit (distinct from idea 13's ganglion-types concept, which is about ganglia, not spinal origin) |

**Physiology total: 21 ideas** — 8 HIT-PENDING (rows 4, 5, 6, 9, 13, 17, 18, 19 — rows 5 and 19
share one record), 13 NEW (rows 1\*, 2, 3, 7, 8, 10, 11, 12, 14, 15, 16\*, 20, 21 — rows 1 and
16 each have a related-but-not-identical pending neighbour flagged for a Step 2 tiebreaker, per
`00-START-HERE` §4).

**Combined**: 58 distinct ideas, 1 HIT-LIVE, 29 HIT-PENDING (partial-row hits counted once per
row), 28 NEW (including the one needs-recheck row, conservatively not counted as a hit).

## HAZARDS

- **Suspect answer key on the peroxisome item** (Histology idea 9). The 112-question bank
  (`src_3bf4527b51de57464e14` / `src_413115a28d7dc9914c91`) keys "organelle responsible for
  maintaining body temperature" as **peroxisome**, but the only pending concept on peroxisome
  function found in this search describes hydrogen-peroxide detoxification, not
  thermoregulation (that role is classically brown-fat mitochondria, which this same bank
  tests correctly elsewhere as its own item). Recorded faithfully as the paper's key; **not
  reconciled or corrected here** — Step 2 should decide whether this is the department's own
  (mis)teaching, worth a `university_notes` entry, or a paper error to note and not encode as a
  fact.
- **Wording drift between the two sittings of the same 56/60-question bank.** The apical-
  epithelium item reads "lining the epidermis" in `src_8d6ddf874f8984be8217` and "lining the
  epididymis" in `src_7d031a45baeadc973a00`; the gland item reads "unilocular gland" in the
  first and "unicellular gland" in the second. Both keep the same correct-letter key across
  both sittings, so the underlying tested idea is unambiguous (stereocilia in a pseudostratified
  epithelium; a single-celled/unilocular gland type respectively) — but Step 2 should write the
  question from whichever wording is medically coherent, not average the two, and should note
  the discrepancy rather than silently pick one.
- **`src_29f02a5a4d6a273dea76` (wafdeen-1) is entirely unconfirmed** — see "Key status: the
  wafdeen-1 paper" above. 26 of this triage's 27 unkeyed/unconfirmed rows come from this one
  file. If Step 2 needs any of its items keyed, that is a render-and-confirm job (200 dpi),
  not something this triage should guess at.
- **Two source pairs are the same bank under different filenames/hashes**, not independent
  sittings — see "Same bank, two sittings" above. Author once per distinct item; cite both
  sourceIds.
- **Stream-classifier manifest gap** (as already found by the sibling AU-MED-103-histology
  triage): `src_413115a28d7dc9914c91` and `src_29f02a5a4d6a273dea76` both state a stream in
  their filename ("Egyptian", "wafdeen") that the manifest's `streamSignal` did not pick up.
  Recorded here as a filename-derived signal only.
- **Hyaluronic acid/ground-substance item (Histology idea 28) sits on the Biochemistry
  boundary.** `src_3bf4527b51de57464e14` Q33 ("composition of repeating units of hyaluronic
  acid") reads as classic glycosaminoglycan biochemistry and is **not counted in this triage's
  totals** — flagged here so the Biochemistry lane and Step 2 don't both silently claim or both
  silently drop it.
- **9 diagram/photo questions** (marked "diagram question" above) must stay diagram questions
  with a media request at Step 3, never rewritten into prose stems, per `05-questions.md`.

## OWED

- **The myasthenia-gravis/nicotinic-receptor vignette moves between department sections
  across the two sittings of the same bank** (Biochemistry in `src_8d6ddf874f8984be8217`,
  Physiology in `src_7d031a45baeadc973a00`) — flagging for whichever lane authors it so it is
  not silently double-claimed or dropped between Biochemistry and Physiology.
- **Junction typing (idea 27) and the ground-substance/hyaluronic-acid item (idea 28) need a
  plain, single-word re-query** (`gap junction`, `proteoglycan`) before minting — my compound
  queries may have been too specific per `00-START-HERE` §4's "search the shortest distinctive
  word first" rule; I ran the words I judged most distinctive, but a fresh pair of eyes at
  Step 2 should re-check before treating either as clean NEW.
- **Idea 13 (nucleosome/eight histones) needs a direct file check**, not just
  `find-existing.mjs` — only an article alias surfaced, and I could not confirm or rule out a
  concept record in the time this triage allowed.
- **Idea 11 (intermediate-filament typing) and idea 25 (secretion mechanisms) may resolve to
  fewer concepts than listed** if Step 2 finds one existing pending record already covers the
  whole classification (all filament types; all three secretion mechanisms) rather than one
  per filament/mechanism — recorded as separate rows here because that is what the search
  surfaced, not because it is certainly the right final grain.

## BLOCKED

none — all five Exams sources were cached by the tooling lane by the time I needed them; both
department files (Histology, Physiology) were mine to extract directly and were not blocked on
anything.
