# `EOY (INT - 102) 199` — the 2025 end-of-year paper for 102 INT, as data

Output: `scripts/kasr/extract/102-INT/eoy-2025-199.json`
Sources read in full: `src_f90429f7c288986e68b5` (the paper, 11 pp) and
`src_77300134fd057d61852c` (the same paper with a student's answers, 11 pp).
Textbooks consulted chapter by chapter, not cover to cover:
`src_a488633802ec053c6325` (Biochemistry, 167 pp) and
`src_bfeed7a91f343a86b255` (Physiology, 158 pp).

**21 seeds · 19 schemes · 3 media requests · 7 `unsat` entries.**

---

## 1 · "Enumerate two of the following" — the decision

Section I prints six items, each marked `{2 Marks}`, and instructs the student
to answer two. I have recorded **six seeds of 2 marks each, with six schemes
B1–B6**, not one 4-mark question with six options.

Three reasons, in the order they mattered.

**A seed carries exactly one `modulePath`, and there is no honest single path
for these six.** They come from six different chapters of the department book:
Carbohydrates, Proteins, Enzymes, Chemistry of Free Nucleotides, DNA Synthesis,
and Protein Synthesis. Collapsing them into one seed would force one `key`, one
`label`, one `definition` and one `modulePath` — and would file five of the six
in the wrong chapter. That is not a presentational compromise; it is a wrong
fact written into the blueprint.

**A student revising must prepare all six.** They cannot know which two they
will pick until they open the paper, so the revision load is six items, not
two. The blueprint's job is to tell a student what to revise, and a model that
says "one 4-mark question" understates that load by a factor of three.

**`exam_relevance` is a statement about the department, not about the
candidate.** All six were set. That the department thought all six worth asking
in a final paper is the signal, and it survives the fact that any one candidate
sat only two of them. Nothing about "four of six were never sat" reduces the
evidence that those four are examinable; the following year's paper may well
draw two different ones from the same six.

The cost is that marks no longer sum naively, so the JSON and this report give
**two totals**, and `unsat[B1]` records the ambiguity against the data.

## 2 · Marks, and whether they reconcile

| | Printed on the paper | Obtainable by one candidate |
|---|---:|---:|
| Biochemistry I (six × 2, answer two) | 12 | 4 |
| Biochemistry II (four × 3) | 12 | 12 |
| Biochemistry III (diagrams 6 + 5 + 5) | 16 | 16 |
| Biochemistry IV (two blocks × five × 1) | 10 | 10 |
| **Section 1 (Biochemistry)** | **50** | **42** |
| Physiology 1 (3 + 2 + 2) | 7 | 7 |
| Physiology 2 | 9 | 9 |
| Physiology 3 | 8 | 8 |
| Physiology 4 | 6 | 6 |
| **Section 2 (Physiology)** | **30** | **30** |
| **Paper** | **80** | **72** |

Every sub-total reconciles against the printed sub-marks. Diagram (1) is
1+1+1+1+1+1 = 6 ✓. Diagram (2) is 1 + 1+0.5+0.5 + 1+1 = 5 ✓. Diagram (3) is
0.5+1.5 + 0.5+1.5 + 0.5+0.5 = 5 ✓. `marks` in the JSON is always the **printed**
figure; the two co-primary seeds (§4) carry `marks: 0` so nothing is counted
twice.

72 obtainable is the number to compare with the 101 paper's 81.

## 3 · Difficulty mix

| Band | Count | Share | Target |
|---|---:|---:|---:|
| Easy | 5 | 23.8% | 25% |
| Moderate | 12 | 57.1% | 55% |
| Hard | 3 | 14.3% | 15% |
| Challenging | 1 | 4.8% | 5% |

Nothing was forced. `Hard` went to B5 (five Greek-lettered DNA polymerases with
a distinct role each — δ and ε are routinely swapped), B13 (naming three
mutation types *and* explaining the mechanism of severity for two of them), and
B14 (the amino-acid matching block, where two of the seven options are
deliberate baits — see §7). `Challenging` went to P2 alone: nine marks across
three general and three specific limiting reactions, one of which is the whole
protein C / thrombomodulin / plasmin cascade, held at once.

## 4 · Two questions test two concepts each

Following the 101 precedent for Case 1, two questions are co-primary on a
second concept, recorded as a second seed with the same `q` and `marks: 0`:

- **B11** — the eicosanoid diagram is 3 marks for naming enzymes and 3 marks
  for where three drug classes act. A student can name phospholipase A2 and
  still not know why an NSAID fails to relieve leukotriene bronchospasm. Second
  seed: `eicosanoid-pathway-drug-targets`.
- **P1** — 3 marks for the absorption mechanism, 4 for importance and
  deficiency. Reciting intrinsic factor and the ileal receptor is a different
  piece of knowledge from predicting a macrocytic anaemia with neurological
  signs. Second seed: `vitamin-b12-importance-and-deficiency`.

`mintQuestionId` hashes section and question number, so both members of a pair
mint the same question ID — which is right: one question, two concepts.

## 5 · The three diagrams: blocked, and what is and is not recoverable

The figures did not extract from either PDF. Nothing has been invented and no
URL has been written. Three `mediaRequest` blocks are filed, all
`priority: required`, `status: needed`, each naming the department-book figure a
fulfiller should redraw and the rights constraint. All three questions are
listed in `unsat` as blocked on their asset.

I did **not** convert a diagram question into prose. Each scheme keeps its
numbered blanks as parts, with a bracketed note in the prompt that the figure is
required to sit it.

What the missing figure costs, precisely:

- **Diagram (1) — order not recoverable.** The set of three enzymes is certain
  from the book (phospholipase A2, prostaglandin H synthase, lipoxygenase). Which
  number takes which is not readable from the text. The order recorded follows
  the solved copy, corroborated by the sub-questions running (a) SAID → (b)
  NSAID → (c) Singulair, which walks the pathway in that sequence. **Recorded as
  unverified.**
- **Diagram (2) — order recoverable from the text alone.** Blank 2 carries "the
  ribonucleoproteins responsible" and "a disease related", which can only be
  splicing. Blank 3 carries "mention its importance", which can only be
  alternative splicing. Blank 1 is therefore transcription. The solved copy
  agrees independently. The figure is still needed for a student to sit it.
- **Diagram (3) — partly recoverable.** Blank 3 is fixed as the silent mutation,
  because its sub-question asks only for "its effect" at 0.5 marks rather than
  for severe damage at 1.5. Blanks 1 and 2 carry *identical* sub-questions, so
  nonsense-vs-missense cannot be settled from the text. The order recorded is
  the solved copy's and is **unverified**.

## 6 · What the solved copy actually contains

This matters more than expected: **the solved copy answers only page 1 and the
three diagram blanks.** Sections II and IV and the whole of Section 2 are blank
in the extracted text — the student answered the matching blocks by drawing
connecting lines, which do not extract, and left the essay questions unwritten.

So the provenance of `expects` splits three ways, and `unsat` records it:

- **B1–B6** and the diagram blanks: student answers, each checked against the
  book and found to match.
- **B7–B13, P1–P4**: derived from the department books. No student answer existed.
- **B14, B15**: derived entirely from the department books. No student answer
  existed for either matching block.

## 7 · The two matching blocks

Recorded as `format: "matching"` with all seven options in each block, lettered
A–G in the order the paper prints them (the paper itself prints them unlettered,
in a right-hand column). The unused distractors are kept, because they are what
the block tests.

**Block 1 — amino acids.** Glycine = C (non-essential smallest), Lysine = E
(essential basic), Cystine = F (non-essential sulfur-containing),
Isoleucine = B (essential branched-chain), Glutamate = D (non-essential acidic).
Unused: **A, "Essential sulfur containing amino acid"** — that is methionine, and
it baits the student who knows cystine has sulfur but not that it is made in the
body; and **G, "Essential acidic amino acid"** — which describes nothing, because
both acidic amino acids are non-essential. Two well-built traps, which is why
this block is graded `Hard`. Every pairing follows from the book's chemical
classification (physical p5–p7) and nutritional classification (physical p9).

**Block 2 — cell cycle and apoptosis.** CDK = G (regulatory protein in cell
cycle), P53 = D (Guardian of the Genome — the book's own phrase),
Bax = B (apoptotic), TNF/FAS receptors = C (extrinsic pathway), Bcl-2 = A
(anti-apoptotic). Unused: **E, "Initiate intrinsic pathway of Apoptosis"** and
**F, "Check cell size and cell damage"** (that is the G2 checkpoint, not a
protein).

**One residual doubt, named rather than hidden.** Bax could be argued into E,
since it controls cytochrome c release from mitochondria. I placed it at B
because the book's own heading for Bax, Bak and Bok is "Apoptotic modulators",
Bcl-2 then takes "Anti-apoptotic" as its exact printed counterpart, and the book
attributes intrinsic initiation to intracellular stress rather than to any
protein on the prompt list — which makes E a distractor by construction. It is
in `unsat[B15]` so a reviewer can overturn it without re-deriving it.

Two of the paper's own spellings were corrected in the student-facing
`matchingPrompts` but kept verbatim in `asked`: **"Lycine" → Lysine** and
**"Anti-Aptotic" → Anti-apoptotic**. A student cannot sit a question against a
word that is not a word.

## 8 · Where the solved copy and the department book disagree

**Nowhere in substance.** Every answer the student wrote is supported:

| Item | Student wrote | Book |
|---|---|---|
| Cellulose | prevents constipation; delays fat absorption | verbatim, physical p24 |
| Denaturation | loss of 2°/3°/4°, ↓solubility, ↑viscosity, ↑digestibility, loss of biological activity | physical p15 — and the book adds a sixth, loss of antigenic property, which the student omitted. Kept in `expects`. |
| Enzyme rate factors | the five headings, verbatim | physical p57–p58 |
| Hydrogen carriers | NAD+, NADP+, FAD, FMN | physical p72, verbatim |
| Post-translational modification | five types with the book's own examples | physical p99, near-verbatim |
| Diagram (1) blanks | PLA2, PGH synthase, lipoxygenase | physical p38 figure — the set matches; only the numbering is unverified (§5) |
| Diagram (2) blanks | Transcription, Splicing, Alternative splicing | physical p91 figure |
| Diagram (3) blanks | Nonsense, Missense, Silent | physical p101 figure — set matches; 1↔2 unverified (§5) |
| DNA polymerases (item 5) | *left blank* | supplied from physical p85 |

**Two wording disagreements, both the paper's rather than the student's:**

1. The paper asks for **"Nucleosides that act as a hydrogen carriers"**. NAD+,
   NADP+, FMN and FAD are nucle**otide**-derived coenzymes, not nucleosides — a
   nucleoside has no phosphate. The book calls them coenzymes throughout. The
   `label` and `definition` say "nucleotide-derived coenzymes"; `asked` keeps the
   paper's word.
2. The paper writes **"Singular"**; the book writes **"Singulair"**. `asked`
   keeps "Singular"; the scheme prompt uses the book's spelling. I did **not**
   write "montelukast" anywhere — the department book never gives the generic
   name, and §5 of the manual says do not add a fact the source does not carry.

**One extraction artefact, worth recording so nobody propagates it.** On
physical p35 the OCR interleaves a figure annotation into the body text, so it
reads as though phospholipase A2 were "not found in human body". It is
phospholipase **D** that is absent from humans; the annotation belongs to it.
The eicosanoid section on physical p38 confirms PLA2 is the human enzyme that
liberates arachidonic acid. Nothing in the JSON follows the garbled reading.

## 9 · Placement decisions that needed a judgement

**Blood and haemostasis have no `DIS-PHY` topic of their own.** I placed them
under **`DIS-PHY-T02` (Cardiovascular)** — for P1b (B12 importance and
deficiency) and P2 (limitations of coagulation) — because blood is the
circulating tissue of the cardiovascular system and haemostasis is an
interaction between the vessel wall, the platelets and the plasma. The
alternatives are worse rather than merely different: `DIS-PHY-T01` (Cell and
membrane physiology) does not describe a plasma protein cascade, and
`DIS-PHY-T07` (Neurophysiology) is plainly wrong. The real haematology home
exists in the By-System view and is carried in `secondary`:
`SYS-HEM-T02-S02-M02` (B12 and folate) and `SYS-HEM-T03` (Hemostasis and
thrombosis).

**P1 (B12 absorption) went to `DIS-PHY-T05` (Gastrointestinal) instead**, because
what the question actually asks is a gut mechanism — parietal-cell intrinsic
factor, an ileal brush-border receptor, pancreatic trypsin, pinocytosis. Its
`secondary` still points at the haematology node, and its co-primary seed sits
under T02, so the pair is reachable from both.

**GAGs (B7) went to `DIS-BIO-T01` (Biomolecules), not to the Proteins of
Extracellular Matrix chapter.** The shock-absorbing passage the question is
drawn from is on physical p25, inside *Carbohydrates of Biological Importance*.
That matters, because `biochem-chapters.json` marks Proteins of Extracellular
Matrix `cancelledForExam: true` for 2025/2026 — so a reader who assumed the ECM
chapter would conclude this question was on cancelled material. It was not.

Every `primary` and every `secondary` was checked to exist in
`src/data/medicalLibraryTaxonomy.generated.ts` before it was written. Nothing was
invented.

## 10 · Ligatures restored in `asked`

The native text drops `fi` and `fl`. I restored them only where unambiguous, and
only these four:

- p1 `modi cation` → `modification`
- p4 `anti-in ammatory` → `anti-inflammatory` (twice)
- p5 `modi cations` → `modifications`
- p8 `de ciency` → `deficiency`

Nothing else in any `asked` string was touched. Spelling, capitalisation and the
paper's own errors ("Lycine", "Aptotic", "Singular", "Enumerate two of the
following:") are as printed.

## 11 · Open questions, named rather than guessed

1. **Diagram (1): which blank is which enzyme.** Set certain, order inferred.
   Blocked on `mediaRequest B11`.
2. **Diagram (3): which of blanks 1 and 2 is nonsense and which is missense.**
   Sub-questions are identical, so the text cannot settle it. Blocked on
   `mediaRequest B13`.
3. **Bax → "Apoptotic" vs "Initiate intrinsic pathway of Apoptosis"** in matching
   block 2. Reasoned in §7; a reviewer with the department's own model answer
   should confirm.
4. **The 9 marks of P2 do not divide evenly** across the six limiting reactions,
   and the paper prints no per-item breakdown. The mark scheme is recorded as an
   unweighted list of eleven components rather than a false weighting.
5. **The matching blocks have no printed option letters.** A–G is my assignment,
   in printed order. If the department's model answer letters them differently,
   the pairings still hold but the letters must be re-mapped.
6. **`scripts/kasr/seeds/types.ts` does not yet model this file.** It lacks
   `matching` in `WrittenFormat`, `matchingOptions`/`matchingPrompts` on
   `Scheme`, and `difficulty`/`sourcePage` on `Seed` and `solvedCopy` on
   `SourceRef`. I wrote what the task specified and did **not** edit `types.ts`,
   which is outside `102-INT/` and is currently modified in the working tree by
   another session. The generator needs those four additions before it can read
   this file.
7. **`physio-chapters.json` was rewritten by a concurrent session mid-task**
   (13:24 today): the tree went from 27 `Haemopoietic system > …` paths to 19
   `Blood > …` paths. Every `modulePath` in the JSON is validated against the
   **current** file, so P1/P1b now read `Blood > Vitamin B12 and folic acid` and
   P2 reads `Blood > Physiological limitations of blood coagulation` — which is
   a better fit than the chapter name I would have used. Re-run the check in §12
   before anything is generated from this file, in case it moves again.

## 12 · How to re-verify

```bash
python3 - <<'PY'
import json
base='scripts/kasr/extract/102-INT/'
d=json.load(open(base+'eoy-2025-199.json'))
paths={c['subjectPath'] for f in ('biochem-chapters.json','physio-chapters.json')
       for c in json.load(open(base+f))}
tax=open('src/data/medicalLibraryTaxonomy.generated.ts').read()
bad=[(s['key'],x) for s in d['seeds']
     for x in ([s['modulePath']] if s['modulePath'] not in paths else [])
             + [n for n in [s['primary']]+s['secondary'] if '["%s",'%n not in tax]]
print(bad or 'all modulePaths and node IDs resolve')
PY
```

Nothing was committed, pushed or imported, and nothing outside
`scripts/kasr/extract/102-INT/` was modified.
