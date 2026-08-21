# 102 INT · article spans report

What was written, where the article's sentence and its claim did not line up, and
what I did about it.

- `docs/Kasr-Source-Imports/evidence/102-INT-spans.md` — **21 spans, one per claim**
- `scripts/kasr/extract/102-INT/article-evidence.json` — **15 articles**, every claim
  and span that belongs to each

**No claim was left unspanned.** All 21 claims in `102-INT-claims.md` are asserted
somewhere in the two article batches, and every one of them is asserted in the article
`claim-plan.json` names, in a section that exists.

No ID was minted. A span ID is its claim's ID with `SPN-` in place of `CLM-`, so
`CLM-GIT-CELLULOSE-DIETARY-IMPORTANCE-01` → `SPN-GIT-CELLULOSE-DIETARY-IMPORTANCE-01`.
`section_id` is the `### ` heading copied exactly from the article. `text_hash` is left
out so the importer derives it.

---

## Validator output

```
$ node --experimental-strip-types scripts/validate-content-batch.mjs \
    "docs/Kasr-Source-Imports/evidence/102-INT-spans.md" \
    --with "docs/Kasr-Source-Imports/article/102-INT-biochemistry.md" \
    --with "docs/Kasr-Source-Imports/article/102-INT-physiology.md" \
    --with "docs/Kasr-Source-Imports/evidence/102-INT-claims.md" \
    --with "docs/Kasr-Source-Imports/evidence/102-INT-citations.md"
{
 "file": "docs/Kasr-Source-Imports/evidence/102-INT-spans.md",
 "kind": "span",
 "items": 21,
 "fieldsUsed": 6,
 "notes": [],
 "errors": []
}
```

**Zero errors.** Every article ID, claim ID and citation ID resolved.

The validator checks that the IDs exist. It does not check that `text` is really on the
page, so I checked that separately: a script parses the two article batches the way the
importer's parser does, splits each `## sections` body on its `### ` headings, and asserts
that each span's `text` is a **verbatim substring of the named section of the named
article**. All 21 pass. That check is the one that matters here — a span whose text has
been silently paraphrased still validates.

---

## Where an article sentence and its claim did not match

The evidence report warned that some of the four narrower claims and nine
book/concept divergences would surface here. Two of them did, and four further
mismatches are structural rather than substantive. Nothing was stretched at either end.

### Structural: the article asserts the claim as an enumeration, not as a sentence

Six claims are enumerations — five polymerases, six denaturation effects, three point
mutations, four ganglion types, six coagulation limits, three nutritional groups. The
department book prints each as a numbered list, the article reproduces that list as
consecutive paragraphs, and **no single sentence in the article carries the claim.**

For these the span quotes the **contiguous block of consecutive paragraphs** exactly as it
stands on the page, rather than one line of the list. The text is still findable verbatim,
and it still says neither more nor less than the claim. The alternative — a span on one
list item — would have certified one fifth of a claim as though it were the whole, which
is the failure this file exists to prevent. The affected spans are:

| Span | Block quoted |
|---|---|
| `SPN-FND-AMINO-ACID-CHEMICAL-AND-NUTRITIONAL-CLAS-01` | three paragraphs: essential, half-essential, non-essential |
| `SPN-FND-EUKARYOTIC-DNA-POLYMERASES-AND-ROLES-01` | five paragraphs, α β γ δ ε |
| `SPN-FND-POINT-MUTATION-TYPES-AND-CONSEQUENCES-01` | three paragraphs: missense, nonsense, silent |
| `SPN-FND-PROTEIN-DENATURATION-EFFECTS-01` | the six effects, as the article lists them |
| `SPN-NEU-AUTONOMIC-GANGLIA-TYPES-01` | the four numbered ganglion types |
| `SPN-HEM-PHYSIOLOGICAL-LIMITATION-OF-COAGULATION-01` | the six numbered limiting mechanisms |

Two of those blocks stop short deliberately, and both stops are the citation's own boundary:

- **`SPN-NEU-AUTONOMIC-GANGLIA-TYPES-01`** ends at "…secrete catecholamines directly into
  the bloodstream." The article's next two sentences give the cholinergic preganglionic
  supply and the 80% adrenaline / 20% noradrenaline output with its 5-to-10-fold longer
  duration. Those are true and they are in the book, but they are **outside
  `CIT-AUTONOMIC-GANGLIA-TYPES-01`'s support span**, which ends where the span ends.
- **`SPN-FND-EUKARYOTIC-DNA-POLYMERASES-AND-ROLES-01`** starts at the α entry rather than
  at the article's framing line, which is a sentence about the book's summary rather than
  about the polymerases.

### Substantive mismatches

**1 · `CLM-MUL-SNAKE-VENOM-PHOSPHOLIPASE-HAEMOLYSIS-01` — the article carries the treatment
sentence the claim deliberately excludes.** The article's paragraph ends "Snake venom toxins
therefore cause death if they are not treated with antitoxins." The evidence report says
that sentence was kept out of the citation on purpose: it is a treatment statement, and
folding it into a `foundational_stable` mechanism claim would misclassify it. **The span
stops one sentence earlier, for the same reason.** That sentence of the article is
currently unspanned, and it needs a `treatment_or_action` claim of its own before it can
be.

**2 · `CLM-END-HBA1C-THREE-MONTH-GLYCAEMIC-WINDOW-01` — the claim's two halves sit in two
sections.** The claim asserts both the mechanism (non-enzymatic binding, 120-day exposure)
and the use (a test of diabetic control over the last three months). The article puts the
mechanism in `Key determinants` and the department's own test sentence — "HbA1c is used as
a test to determine the diabetic control of the patient during the last three months." — in
`Clinical significance`. They are not contiguous. **The span takes the mechanism paragraph**,
which is the larger half and is verbatim parallel to the citation's opening. The
`Clinical significance` sentence is supported by the same claim and the same citation and
deserves a second span; the brief allocates one span per claim, so I did not mint one.

**3 · `CLM-FND-GAG-SHOCK-ABSORPTION-MECHANISM-01` — a sentence the citation covers only
behind an ellipsis sits in the middle.** The claim's three steps (charge traps water into a
gel → compression squeezes water out reversibly → shock absorption in joints and eyeball)
map onto the article's sentences 1, 3 and 4 of one paragraph. Sentence 2 lists the gel's
other properties — mechanical support, ion filter, synovial lubricant — which
`CIT-GAG-SHOCK-ABSORPTION-MECHANISM-01` covers only as "This gel: …". **The span is
sentences 3–4**, the compressibility mechanism and the two named sites, both quoted in full
by the citation. The charge-and-water step in sentence 1 is therefore not inside this span,
even though the claim asserts it — I would rather the span under-report than certify a
sentence against an ellipsis.

**4 · `CLM-FND-EICOSANOID-SYNTHESIS-PATHWAY-ENZYMES-01` — lipoxygenase is one paragraph too
far away.** The claim names three enzymes: phospholipase A2, prostaglandin H synthase and
lipoxygenase. The article gives them in three consecutive paragraphs, but the middle
paragraph's third sentence names **prostacyclin synthase and thromboxane synthase**, which
`CIT-EICOSANOID-SYNTHESIS-PATHWAY-ENZYMES-01` does not name. **The span runs from
"The pathway starts at membrane phospholipids." to "…cyclooxygenase, abbreviated COX, and
peroxidase."** — so it carries phospholipase A2, the fork, and prostaglandin H synthase with
its two catalytic activities, but **not** the lipoxygenase branch. Extending it one sentence
further would have dragged in two enzymes the citation does not support.

**5 · `CLM-FND-FACTORS-AFFECTING-ENZYME-REACTION-RATE-01` — the article names the five
factors as subheadings, exactly as the book does.** The evidence report already flagged that
this citation "quotes headings, not prose", and the article inherited the shape: five
paragraphs opening "Substrate concentration.", "Enzyme concentration.", "Cofactor
concentration.", "Temperature.", "pH." Their bodies carry Km, Vmax, 37 °C, 70 °C and pH 2
pepsin — detail the claim does not assert and the citation quotes only as elided bullets.
**The span is the section's opening sentence**, which asserts the five-factor count and the
book's own methodological caveat (one factor varied at a time, initial velocity), both
inside the citation's quoted words. It does not name the five. This is the weakest span in
the file, and it is weak for the same reason its citation is: the source enumerates rather
than states.

**6 · `CLM-FND-POST-TRANSLATIONAL-COVALENT-MODIFICATION-01` — the five modifications are
five paragraphs below the span.** The span is the article's definitional pair: residues
modified enzymatically for three named purposes, by the addition of functional groups. The
five named groups (phosphorylation, glycosylation, acetylation or methylation,
hydroxylation, carboxylation) follow as five separate paragraphs, each with the example the
citation elides. I kept the span to the definitional pair rather than quoting eight
paragraphs; the claim's list of five is therefore broader than the span.

**7 · `CLM-FND-CELL-CYCLE-AND-APOPTOSIS-REGULATORY-PROT-01` — two candidate sentences, and I
took the one that carries both halves.** `Mechanism` has "Cyclins complex with and activate
certain CDKs, and those complexes produce the regulatory effects essential for the passage
of the cell from one phase to another", which is the book's own wording but does not say
that these are *the* regulatory proteins of the cycle. `Key determinants` has both halves in
two contiguous sentences, and that is what the span quotes.

### Divergences from the evidence report that did **not** surface here

The article prose already follows the book rather than the concept in every place the
evidence report flagged, so no span had to choose between them:

- the aorticorenal ganglion **is** in the article's collateral list, so the span carries the
  book's four;
- the article does **not** say the HbA1c bond is irreversible;
- the article writes **Singulair**, never montelukast;
- the article prints the coagulation limits as a **flat six**, not as three general and
  three specific, and its item 2 puts **heparin** as the subject combining with
  antithrombin III;
- the article hedges the B12 neurology ("may also cause") and does not hedge the anaemia;
- the article says **DNA synthesis**, not thymidine triphosphate;
- the article says **parietal cells of the stomach**;
- the article's five-polymerase list does **not** add proofreading;
- the article does **not** name the sulfonamide-target enzyme.

One thing the evidence report named as absent from the book **is** asserted by the article,
and it is not spanned: "There is no essential acidic amino acid anywhere on the list", in
`ART-102-BIO-AMINO-ACIDS-OF-BIOLOGICAL-IMPORTANCE` › `Key determinants`, repeated in
`Common misconceptions`. The evidence report is explicit that the book nowhere states it —
it follows from reading the p5 chart against the p9 list. **No claim asserts it, so no span
covers it.** It needs its own claim, and probably its own second source.

---

## Things I could not determine

1. **Whether a claim may carry more than one span.** The contract does not forbid it —
   `spanIds` is a list on the article, and `claim_ids` is a list on the span — and three
   claims here would be better served by two spans than one: HbA1c (mechanism and test
   statement), amino acid classification (essential/half/non as three paragraphs), and
   post-translational modification (definition and the five groups). The brief says one span
   per claim, so that is what this file contains. Splitting them later needs no new claim
   or citation, only new `SPN-…-02` IDs, which are not mine to mint.

2. **`claim-plan.json` grew from 21 entries to 38 while I was working.** It was rewritten at
   14:41 during this session by another session in this worktree; `102-INT-claims.md` still
   holds 21 claims. The plan now maps 17 further claim IDs — among them
   `CLM-FND-MANNITOL-CLINICAL-APPLICATIONS-01`, `CLM-FND-COMPETITIVE-ENZYME-INHIBITION-MECHANISM-01`,
   `CLM-FND-CHOLESTEROL-IMPORTANCE-AND-DERIVATIVES-01` and
   `CLM-FND-MEMBRANE-FLUIDITY-DETERMINANTS-01` — to articles in this batch, and others to
   six articles that do not exist in `102-INT-biochemistry.md` or `102-INT-physiology.md`
   at all (`ART-102-BIO-CHEMISTRY-OF-NUCLEIC-ACIDS`,
   `ART-102-BIO-PROTEINS-OF-EXTRACELLULAR-MATRIX`, `ART-102-PHY-PLASMA-PROTEINS`,
   `ART-102-PHY-PLATELETS-AND-HAEMOSTASIS`, `ART-102-PHY-SYMPATHETIC-NERVOUS-SYSTEM`,
   `ART-102-PHY-CHEMICAL-TRANSMISSION-AT-AUTONOMIC-JUNCTIONS-AND-AUTONOMIC-RECEPTORS`).
   **`article-evidence.json` lists only claims that have a record in `102-INT-claims.md`**,
   because writing an unauthored claim ID into an article's `claim_ids` would point the
   audit at a claim that does not exist. When those 17 claims are authored, the same
   articles will need their `claim_ids` and `span_ids` extended, and this file rebuilt.

3. **Whether `article-evidence.json` should list the six articles it does not cover.** It is
   keyed on the 15 articles in the two batches named in my brief, in the order they appear
   there. The six extra articles the plan now mentions are not in those batches, so I have
   no article record to attach them to and did not invent keys for them.

4. **Whether the article batches' `claim_ids` and `span_ids` should be edited directly.**
   They are still `[clear]` in both files. The brief says the mapping is for someone else to
   apply, and forbids me editing the articles, so I did not.

---

## What was not done, deliberately

- No `git commit`, no `git push`, no import.
- No edit to the articles, the claims, the citations, `claim-plan.json`,
  `evidence-report.md`, or any other plan file. The only files written are
  `102-INT-spans.md`, `article-evidence.json` and this report.
- No sentence invented, and no article edited to make a span fit.
