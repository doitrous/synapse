# 102 INT · evidence chain report

What was produced, what the book actually says, and where its wording and the
concepts' wording part company.

- `docs/Kasr-Source-Imports/evidence/102-INT-claims.md` — **21 claims**, all 14 fields
- `docs/Kasr-Source-Imports/evidence/102-INT-citations.md` — **21 citations**, all 12 fields

All 21 plan entries produced a claim and a citation. **Nothing was dropped for want of a
supportable span**, but four claims are narrower than their concept, and that is set out
under "Concepts the book supports only in part" below — a narrower claim is not the same
as a missing one, and neither is a silent one.

Every ID is the plan's. No claim ID, citation ID, concept ID or resource ID was minted
here. The single resource is `src_a488633802ec053c6325` — *Department Book Module 102.pdf*,
167 pages, Faculty of Medicine, Cairo University — already live in the evidence store.

---

## Validator output

### Claims

```
$ npm run --silent medical:batch -- "docs/Kasr-Source-Imports/evidence/102-INT-claims.md" \
    --with "docs/Kasr-Source-Imports/concept/102-INT-concepts.md"
{
 "file": "docs/Kasr-Source-Imports/evidence/102-INT-claims.md",
 "kind": "claim",
 "items": 21,
 "fieldsUsed": 14,
 "notes": [],
 "errors": [
  "Item 1 (CLM-FND-AMINO-ACID-CHEMICAL-AND-NUTRITIONAL-CLAS-01): Concept CON-FND-D0EDFFF1477094 does not exist",
  … the same error for all 21 items, one per concept ID …
 ]
}
```

**21 errors, and all 21 are the false positive `00-START-HERE.md` §8 describes.** The
concepts are real: they are in `docs/Kasr-Source-Imports/concept/102-INT-concepts.md`, all
21 of them, and I did not invent one.

`--with` does not help here, and it is worth saying why rather than leaving the flag
looking broken. In `scripts/validate-content-batch.mjs` the `--with` list (`alongside`,
line 40) is read only inside the `kind === 'question'` branch, at lines 148 and 170. The
evidence branch below it builds `conceptIds` from a different source entirely — line 502,
`readdir(dirname(file))`: **every `.md` in the batch's own directory, and nothing else.**
The concept batch lives in `concept/`, not `evidence/`, so it is out of scope no matter
what is passed on the command line.

Proof that the file itself is clean, rather than an assertion that it is. Copying the
claims batch and the concept batch into one throwaway directory outside the repo — no repo
file moved, added or edited — and validating there:

```
$ npm run --silent medical:batch -- "<scratch>/evidence/102-INT-claims.md"
{
 "kind": "claim",
 "items": 21,
 "fieldsUsed": 14,
 "notes": [],
 "errors": []
}
```

**Zero errors** once the concept batch is a sibling. The 21 errors above are directory
scoping, not content.

### Citations

```
$ npm run --silent medical:batch -- "docs/Kasr-Source-Imports/evidence/102-INT-citations.md" \
    --with "docs/Kasr-Source-Imports/evidence/102-INT-claims.md" \
    --with "docs/Kasr-Source-Imports/evidence/102-INT-sources.md"
{
 "file": "docs/Kasr-Source-Imports/evidence/102-INT-citations.md",
 "kind": "citation",
 "items": 21,
 "fieldsUsed": 12,
 "notes": [],
 "errors": []
}
```

**Zero errors.** Both `--with` files are already siblings in `evidence/`, so this one
resolves whether the flags are passed or not.

### The gate — `medical:simulate`

Since `medical:batch` cannot see across directories, I ran the check that can. It applies
the batches to a copy of live state in dependency order:

```
$ npm run --silent medical:simulate -- \
    "docs/Kasr-Source-Imports/concept/102-INT-concepts.md" \
    "docs/Kasr-Source-Imports/evidence/102-INT-sources.md" \
    "docs/Kasr-Source-Imports/evidence/102-INT-claims.md" \
    "docs/Kasr-Source-Imports/evidence/102-INT-citations.md" \
    --emit <scratch>/sim-102-INT-evidence.json

batches: [
  {"file":"…/102-INT-sources.md",  "kind":"resource", "created":69, "updated":0, "rejected":0},
  {"file":"…/102-INT-concepts.md", "kind":"concept",  "created":21, "updated":0},
  {"file":"…/102-INT-claims.md",   "kind":"claim",    "created":21, "updated":0, "rejected":0},
  {"file":"…/102-INT-citations.md","kind":"citation", "created":21, "updated":0, "rejected":0}
]
delta:   {"articles":0,"concepts":21,"relations":0,"claims":21,"citations":21,"resources":69,"articleSpans":0}
errors:  []
skipped: []
```

**21 claims, 21 citations, zero errors, nothing rejected.** Every concept ID, claim ID and
resource ID resolved. That is the answer the directory-scoped run could not give.

(The concept and source batches are named here only to give the claims something to resolve
against — they are other agents' files and I neither edited nor imported them.)

---

## Claims I think are really two claims

Named rather than split: I did not mint a second ID for any of these.

| Claim | Why it is two |
|---|---|
| `CLM-GIT-CELLULOSE-DIETARY-IMPORTANCE-01` | "Prevents constipation" and "delays fat absorption" are two independent consequences of the same undigestibility. The book states them as two sentences in one Clinical Correlation box, so one span covers both, but they are separate assertions and a question could test either alone. |
| `CLM-FND-MRNA-SPLICING-AND-ALTERNATIVE-SPLICING-01` | Splicing removing introns is one claim; alternative splicing yielding several proteins from one gene is another. The book prints them as two blocks on physical p91, and the second explains the protein-count-exceeds-gene-count observation, which the first does not touch. |
| `CLM-NEU-PARASYMPATHETIC-FUNCTION-THORACIC-ABDOMI-01` | Four organ systems, four independent assertions: heart, lungs, gut, gall bladder. The book itself numbers them 1 to 4. They share one origin sentence and one page, so one citation carries them, but this is really five claims — the vagal course plus one per organ. |
| `CLM-NEU-AUTONOMIC-GANGLIA-TYPES-01` | Four ganglion types, each with its own location, its own fibre class and, for the adrenal medulla, its own mechanism. A classification claim can reasonably hold a closed list, which is why it is written as one, but the adrenal-medulla member in particular carries a mechanism the other three do not. |
| `CLM-FND-PROTEIN-DENATURATION-EFFECTS-01` | The structural statement (bonds ruptured, primary structure left) and the six listed effects are one claim only if you read the effects as consequences of the structural loss, which the book does. Six enumerated effects could each be their own claim. |
| `CLM-HEM-PHYSIOLOGICAL-LIMITATION-OF-COAGULATION-01` | Six independent limiting mechanisms. Written as one closed list because the book's own framing is "many physiological limiting mechanisms … which includes", but each mechanism stands alone. |
| `CLM-HEM-VITAMIN-B12-IMPORTANCE-AND-DEFICIENCY-01` | The haematological consequence and the neurological one rest on two different requirements (DNA synthesis; myelination) and the book grades them differently — the anaemia flatly, the neurology as "may cause". |

---

## Concepts the book supports only in part

These four claims are deliberately narrower than the concept they support. In each case the
missing part **is** in the book, at a page I name, but not in a span that also carries the
part the claim asserts — so joining them would have meant a quotation that does not say what
the claim says. Each is a `-02` waiting to be authored, not a gap in the source.

### 1 · `CLM-FND-AMINO-ACID-CHEMICAL-AND-NUTRITIONAL-CLAS-01`

The concept holds two classifications at once. The claim carries only the **nutritional**
one (physical p9, printed p5), because the chemical placements are a chart on physical
pp5–7 with no sentence tying the two schemes together.

Two things follow:

- The **chemical** half — glycine as the smallest neutral aliphatic, lysine as basic
  aliphatic, cystine as the disulfide-linked dimer of cysteine, isoleucine as branched-chain,
  glutamate as acidic aliphatic — is fully supported on physical pp5–7 and needs its own claim.
- **The book nowhere states "no acidic amino acid is essential."** That is a true inference
  from putting the p5 chart beside the p9 list, and it is a good teaching point, but it is
  the concept's synthesis, not the book's sentence. I have not made a claim assert it.

### 2 · `CLM-FND-CELL-CYCLE-AND-APOPTOSIS-REGULATORY-PROT-01`

The concept divides the proteins four ways. The book never makes that fourfold division in
one place; it teaches each group in its own section. The claim carries the first group only —
cyclins and CDKs, physical p108, printed p104. The other three are each quotable, and each
needs its own claim ID:

| Missing part | Physical page | Printed page | Section |
|---|---|---|---|
| p53 as guardian of the genome: p21 and G1 arrest after moderate damage, Bax and apoptosis after severe | 111 | 107 | `P53 Gene` |
| Bcl-2 family split into anti-apoptotic (Bcl-2, Bcl-x) and apoptotic (Bax, Bak, Bok) modulators controlling cytochrome c release | 110 | 106 | `Regulation of intrinsic pathway` |
| TNF and FAS receptors initiating the extrinsic pathway on ligand binding | 109 | 105 | `Mechanisms of Apoptosis · 1- Extrinsic pathway` |

### 3 · `CLM-FND-NUCLEOTIDE-COENZYME-HYDROGEN-CARRIERS-01`

The concept ends "FMN is the only one of the four that contains no adenine." The book does
say this — but as a **heading label** on physical p71: "Flavin Mono Nucleotide (FMN not
containing adenine)". It is not part of the p72 hydrogen-carrier sentence the claim rests
on, so it is recorded in the citation's `context_note` and left for a second claim rather
than folded into this one.

The support span here is unusually short, and deliberately. The book's actual assertion is a
**two-column table** under a "2H" arrow, not prose. Quoting a table as though it were a
sentence would mean inventing the connectives, so the span is the one real sentence — "The
above coenzymes (NAD+, NADP+, FMN, and FAD) are hydrogen carriers as follows:" — and the
table is described, as a table, in `context_note`.

### 4 · `CLM-MUL-SNAKE-VENOM-PHOSPHOLIPASE-HAEMOLYSIS-01`

The concept ends "Untreated, snake venom toxins cause death; the treatment is antitoxin."
The book says exactly that, in the next sentence on physical p35. I left it out of the span
on purpose: it is a treatment statement, and folding it in would drag a `foundational_stable`
mechanism claim into `treatment_or_action`, or worse, leave a treatment statement classed as
foundational. It belongs to a separate claim carrying `risk_class: treatment_or_action`.

---

## Where the book's wording and the concept's definition genuinely diverge

Nine of these. Each is a real difference, not a paraphrase.

**1 · Collateral sympathetic ganglia — the book lists four, the concept three.**
`CON-NEU-FCFD384A1011F8` names "coeliac, superior mesenteric and inferior mesenteric".
Physical p152 (printed p39) lists **"celiac, superior mesenteric, aorticorenal, and inferior
mesenteric ganglia"**. The **aorticorenal ganglion is missing from the concept.** This one
is worth fixing at the concept, not just noting: a student revising from the concept would
not know a ganglion the book teaches. The claim's `qualifiers` carry the book's full list.

**2 · HbA1c — the concept says the binding is "irreversible"; the book does not.**
`CON-END-47313D5F26B03A` and its plan label both say the glucose binds "non-enzymatically
and irreversibly". Physical p44 (printed p40) says the reaction is **non-enzymatic** and that
it **depends on exposure across the 120-day life span**, which is what carries the
three-month window. The word "irreversible" is nowhere on the page. The claim says what the
book says.

**3 · Singulair, never montelukast.** The plan brief and the concept both name montelukast.
The book, physical p39 (printed p35), writes only **"3- Singulair: - It is leukotriene
receptor antagonist."** The brand appears; the generic name appears nowhere in the chapter.
The claim uses the book's word and records the substitution in `qualifiers`, because citing
a page for a name that is not on it would be a fabricated locator.

**4 · Coagulation limits — the book does not divide them into "general" and "specific".**
`CON-HEM-87280E690F877F` splits six mechanisms into three general and three specific.
Physical p140 (printed p27) gives a **flat numbered list of six**, in a different order, with
no such division. The split is a good pedagogic organiser and it is not the source's. The
claim keeps the book's flat six.

Two smaller mismatches sit inside the same divergence:
- The concept lists **"smooth endothelium, hepatic clearance and natural heparin"** as the
  general three and omits **continuous normal flow rate of blood**, which is the book's
  item 4 and the reason it names post-operative bed rest and thrombosis.
- The concept attributes factor IX/X/XI/XII inhibition to **antithrombin III "facilitated by
  heparin"**; the book's item 2 puts it the other way round — **heparin** "combines with
  antithrombin III in the blood to inactivate factors IX, X, XI & XII". Same physiology,
  opposite subject.

**5 · Vitamin B12 deficiency — the book hedges the neurology and does not hedge the anaemia.**
`CON-HEM-DDAAF125FD2EBE` says deficiency "gives both a macrocytic anaemia and neurological
signs". Physical p132 (printed p19) says deficiency **"results in MACROCYTIC ANEMIA"** but
**"may cause neurological manifestations"**. The claim preserves the asymmetry.

**6 · Vitamin B12 — thymidine triphosphate is the concept's, not the book's.**
`CON-HEM-DDAAF125FD2EBE` says B12 is required "to form thymidine triphosphate, a building
block of DNA". Physical p131 (printed p18) says only that B12 **"is essential for the
synthesis of DNA"**. True biochemistry, absent from this source. The claim says DNA synthesis.

**7 · Intrinsic factor — "parietal cells of the stomach", not "of the gastric glands".**
A small one, and the same cell. Recorded so nobody later reads the difference as a second
source. Physical p131.

**8 · Eukaryotic DNA polymerases — the concept adds proofreading, the summary list does not.**
`CON-FND-A73C06E0EC3C1D` ends "Polymerases δ and ε also proofread by exonuclease activity."
That is true and it is in the book — physical p83 (printed p79), under "C) Proofreading of
newly synthesized DNA strands" — but it is two pages from the p85 summary the claim quotes.
It is in `qualifiers` and named in the citation's `context_note`, not asserted by the span.

**9 · Sulfonamides — the book never names the enzyme.**
The concept says sulfonamides inhibit "the bacterial enzyme that builds folic acid from it".
So does the book, and no more: physical p60 (printed p56) says **"the enzyme involved in the
formation of folic acid using PABA as substrate"**. Neither dihydropteroate synthase nor any
other name appears. The claim does not supply one.

---

## Extraction traps hit, and how each was handled

Both are places where a plain text extraction would have produced a quotation that is not
what the page says. Neither was worked around silently.

**Physical p85 — the Greek letters are gone.** The five-polymerase summary is set in a Symbol
font with no `ToUnicode` map. `pdftotext -layout`, `pdftotext -raw` and PyMuPDF all agree,
and all three are wrong the same way:

```
- DNA polymerase : for DNA repair.
- DNA polymerase : for mitochondrial DNA synthesis.
```

The letters are simply dropped, and a quotation built from that extraction would name no
polymerase at all. **β renders correctly two paragraphs later** in "a repair DNA polymerase β",
which is what makes this trap quiet: the page looks partly fine. The span was read from the
page rendered to an image at 170 dpi, where α, β, γ, δ and ε are all legible. The citation's
`context_note` says so, so a reviewer who re-extracts and finds bare colons knows why.

**Physical p35 — a figure label interleaved into a sentence.** The snake venom sentence
extracts as:

> "Snake venom toxins contain lecithinase enzyme with PLA2 (Not activity, when injected into
> blood, it converts phospholipids present in cell human body) of membranes RBCs into
> lysophospholipids…"

The intruding fragment is "(Not found in human body)", the phospholipase D annotation from the
adjacent figure, sliced into the paragraph by reading order. Rendered, the sentence runs
unbroken. The span is the rendered reading, and `context_note` records the interleaving.

Both confirm the standing note that a text layer can be present and still lie.

---

## Things I could not determine

Named, not guessed.

1. **Whether the concepts should be corrected.** The aorticorenal ganglion (divergence 1),
   "irreversibly" on HbA1c (2), montelukast for Singulair (3), and the general/specific split
   of the coagulation limits (4) are all concept-side, and `102-INT-concepts.md` is another
   agent's file. I did not touch it. Someone has to decide whether the concept follows the
   book or the book gets corrected by a second source, and that decision is not mine to make
   from inside an evidence pass.

2. **Where "no acidic amino acid is essential" should live.** It is true, it is derivable from
   two pages of this book, and it is the sharpest thing in that concept's label. It is not a
   sentence anyone wrote. It probably wants a second source rather than a stretched citation.

3. **Whether the four narrower claims should get their `-02` IDs now.** I did not mint them —
   the brief forbids inventing an ID and the plan allocates one claim per entry. The pages are
   listed above so a follow-up pass has nothing to re-derive.

4. **`CLM-FND-FACTORS-AFFECTING-ENZYME-REACTION-RATE-01` quotes headings, not prose.** The
   book asserts the five factors *by enumerating them as five numbered subheadings* across
   physical pp57–58; there is no sentence that says "five factors govern the rate". The span
   is the section heading plus those five subheadings, with the explanatory bullets elided.
   That is the source's own words and its own structure, but it is a weaker span than the
   others and someone may prefer to split it into five claims, one per factor, each with a
   prose span from the bullets. `confidence` is 0.9 rather than 0.95 for that reason.

5. **`CLAIMS.md` has no row for this scope.** The file was already modified in the working
   tree when I started, and the brief limits me to the two batch files and this report, so I
   did not add one. The scope was `102 INT · claims` and `102 INT · citations`, both in
   `docs/Kasr-Source-Imports/evidence/`.

---

## What was not done, deliberately

- No `git commit`, no `git push`, no import.
- No edit to `claim-plan.json`, `article-plan.json`, `102-INT-concepts.md`,
  `102-INT-sources.md`, or either article file.
- No dose stated anywhere. The two drug claims —
  `CLM-INF-SULFONAMIDE-COMPETITIVE-INHIBITION-OF-FO-01` and
  `CLM-FND-EICOSANOID-PATHWAY-DRUG-TARGETS-01` — carry
  `risk_class: treatment_or_action` and so need two independent counting citations before
  anything can call them verified. They have one apiece, from a teaching text, so they will
  land and stay at `needs_evidence`. That is correct: a department book is not independent
  verification of a drug mechanism.
