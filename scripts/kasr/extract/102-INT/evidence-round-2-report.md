# 102 INT · evidence chain, round 2

The seventeen concepts that came off the 2024 end-of-year paper, and the six articles
written for them after the first evidence pass had finished. What was written, what the
book actually says, and where the book and the concepts part company.

- `docs/Kasr-Source-Imports/evidence/102-INT-claims.md` — **21 + 17 = 38 claims**, all 14 fields
- `docs/Kasr-Source-Imports/evidence/102-INT-citations.md` — **21 + 17 = 38 citations**, all 12 fields
- `docs/Kasr-Source-Imports/evidence/102-INT-spans.md` — **21 + 16 = 37 spans**, all 6 fields
- `scripts/kasr/extract/102-INT/article-evidence.json` — **15 → 21 articles**
- `scripts/kasr/extract/102-INT/claims-without-a-span.txt` — created, **holding no IDs**

**All seventeen claims were written and all seventeen are quotable.** Nothing was dropped
for want of support in the department book. **Sixteen of the seventeen have an article
span; one does not**, and the reason is on the article side rather than the book side —
see "The one claim with no span" below.

The existing 21 claims, 21 citations and 21 spans were not touched: not rewritten, not
reordered, not reformatted. Everything new is appended after a `---`, in the same field
order and the same voice.

Every ID is the plan's. No claim ID, citation ID, concept ID or resource ID was minted.
Span IDs are derived mechanically — `CLM-…` → `SPN-…` — as round 1 derived them. The
single resource is `src_a488633802ec053c6325`, *Department Book Module 102.pdf*, 167 pages.
`evidence_role` is `local_curriculum` on all seventeen: the department book is
authoritative about what this faculty teaches, not independent verification of the
medicine.

---

## Validator output

Three runs, invoked directly as the brief specifies.

### Claims

```
$ node --experimental-strip-types scripts/validate-content-batch.mjs \
    "docs/Kasr-Source-Imports/evidence/102-INT-claims.md" \
    --with "docs/Kasr-Source-Imports/concept/102-INT-concepts.md"
{
 "file": "docs/Kasr-Source-Imports/evidence/102-INT-claims.md",
 "kind": "claim",
 "items": 38,
 "fieldsUsed": 14,
 "notes": [],
 "errors": []
}
```

**38 items, zero errors.** Worth recording against round 1: that pass reported 21 false
`Concept … does not exist` errors and had to prove the file clean by copying both batches
into a scratch directory, because the evidence branch of the validator built its concept
list from `readdir(dirname(file))` and the concept batch lives in `concept/`. That no
longer happens — this run resolves all 38 concept IDs from `--with` with no workaround.
Whatever changed, the round-1 report's workaround is now obsolete and its explanation
should not be repeated.

### Citations

```
$ node --experimental-strip-types scripts/validate-content-batch.mjs \
    "docs/Kasr-Source-Imports/evidence/102-INT-citations.md" \
    --with "docs/Kasr-Source-Imports/evidence/102-INT-claims.md" \
    --with "docs/Kasr-Source-Imports/evidence/102-INT-sources.md"
{
 "file": "docs/Kasr-Source-Imports/evidence/102-INT-citations.md",
 "kind": "citation",
 "items": 38,
 "fieldsUsed": 12,
 "notes": [],
 "errors": []
}
```

**38 items, zero errors.**

### Spans

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
 "items": 37,
 "fieldsUsed": 6,
 "notes": [],
 "errors": []
}
```

**37 items, zero errors.** 37 rather than 38 is the one deliberate omission named below,
not an overwrite: the file still holds all 21 round-1 spans, and the substring check
below re-verifies every one of them.

---

## The mechanical span-substring check

The validator checks that IDs resolve. It does **not** check that a span's `text` is
really on the page, so a silently paraphrased span validates clean. Round 1 wrote a
throwaway script for this; I wrote the same check again and ran it from the session
scratchpad rather than adding it to the repo, because the brief limits me to the three
batch files, `article-evidence.json`, `claims-without-a-span.txt` and this report. It
parses the two article batches the way the importer's parser does, splits each
`## sections` body on its `### ` headings, and asserts that each span's `text` is a
verbatim substring of the named section of the named article:

```
$ python3 span_substring_check.py
37 spans checked: 37 verbatim, 0 failed
```

**All 37 pass**, the 21 from round 1 included. No span text was paraphrased, summarised
or replaced by its claim's `display_text`.

---

## The one claim with no span

### `CLM-FND-MEMBRANE-FLUIDITY-DETERMINANTS-01` — the book teaches it, the article does not

The claim is written and the citation quotes the page. The department book states it
plainly, physical p34 (printed p30), as the N.B. under "Common Functions of Phospholipids":

> "Increased unsaturated fatty acids (USFA) content (at C2 of phospholipids) will increase
> membrane fluidity, because the kinks of the cis-double bonds prevent the packing of
> phospholipids closely together."

What is missing is on the article side. `ART-102-BIO-LIPIDS-OF-BIOLOGICAL-IMPORTANCE` —
the article `claim-plan.json` assigns this concept to — **never teaches membrane fluidity
determinants at all.** Its only sentence containing the word "fluidity" is the cholesterol
one, "is an important constituent of cell membranes that controls their fluidity", which
belongs to a different claim and asserts a different thing. Searching the whole article
for *phospholipid*, *amphipathic*, *bilayer*, *packing* and *kink* returns the
phospholipid classification, the phospholipases and the snake venom paragraph, and nothing
about packing or fluidity.

So there is no sentence to span. Writing one against the cholesterol sentence would
certify a packing mechanism against a sentence that does not state it, which is the exact
failure the spans rule exists to prevent. The claim therefore stands with its citation and
without a span, and this is the single reason the span count is 37 rather than 38.

**It is not listed in `claims-without-a-span.txt`, and must not be.** That file is read by
`unsupportedClaims()` in `scripts/kasr/seeds/links.ts` to stop a concept pointing at a
claim that was never written. This claim *was* written; listing it would strip a real,
cited claim off `CON-FND-D1FDD52629718C`. The file was created holding comments only.

**What would fix it:** one paragraph in the lipids article's `Mechanism` or `Key
determinants` carrying the book's N.B. The article batch is another agent's file and the
brief forbids me editing it, so I have not.

---

## Concepts the book supports only in part

Six claims are deliberately narrower than the concept they support. In each case the
missing part **is** in the book, at a page named below, but not in a span that also
carries the part the claim asserts.

### 1 · `CLM-FND-EUKARYOTIC-TRANSCRIPTION-ELEMENTS-AND-MR-01`

`CON-FND-CC55F157021237` holds four things at once and the book teaches them four pages
apart. The claim carries the **promoter division of labour** only — TATA says where, CAAT
and GC say how often — physical p87, printed p83.

| Missing part | Physical | Printed | Section |
|---|---|---|---|
| TFIIH separating the two DNA strands by its helicase activity and activating RNA polymerase II | 88 | 84 | `Steps of Transcription · 2) Initiation` |
| The length of the poly(A) tail determining the half-life of the mRNA | 90 | 86 | `Post-Transcriptional Modifications of mRNA · 2) Polyadenylation at 3′ end` |
| Alternative splicing yielding different proteins from one gene | 91 | 87 | `Alternative splicing` |

The third is **already carried** by `CLM-FND-MRNA-SPLICING-AND-ALTERNATIVE-SPLICING-01`
from round 1. The first two each need their own claim ID, which I did not mint.

### 2 · `CLM-FND-MEMBRANE-FLUIDITY-DETERMINANTS-01`

Two of the concept's four statements are not on physical p34 and are not asserted:

- **The book nowhere states that a saturated chain is straight and therefore packs
  closely.** It states that saturated fatty acids contain no double bonds (physical p29,
  printed p25) and prints a figure comparing a saturated, a trans and a cis chain
  (physical p30, printed p26). The inference is sound and it is not the book's sentence.
- **Cholesterol's control of fluidity is three pages later**, physical p37 (printed p33),
  item 4 of "Importance and derivatives of cholesterol" — where it is carried by
  `CLM-FND-CHOLESTEROL-IMPORTANCE-AND-DERIVATIVES-01`, written in this pass.

### 3 · `CLM-FND-CHOLESTEROL-IMPORTANCE-AND-DERIVATIVES-01`

The concept opens with cholesterol as the most important animal sterol and free
cholesterol's 27 carbon atoms, free or esterified. Those are on the facing page, physical
p36 (printed p32), under `Cholesterol · Sources` and `Forms`, outside the span. The claim
carries the four numbered importances and the excretion sentence that follows them.

### 4 · `CLM-FND-COMPETITIVE-ENZYME-INHIBITION-MECHANISM-01`

The concept's three worked drug examples — allopurinol, sulfonamides, dicumarol and
warfarin — are on the next page, physical p60 (printed p56), under "Examples for
competitive inhibitors". Keeping them out is what lets this stay a `foundational_stable`
mechanism claim instead of dragging a mechanism into `treatment_or_action`. Sulfonamides
already have their own claim from round 1,
`CLM-INF-SULFONAMIDE-COMPETITIVE-INHIBITION-OF-FO-01`.

### 5 · `CLM-FND-REPLICATION-FORK-STRAND-SEPARATION-01`

The concept ends "Topoisomerases relieve the supercoils that unwinding generates ahead of
the fork." True, and in the book — but under Elongation, and in the enzyme summary on
physical p85 (printed p81). It is not part of what makes a fork, and the claim does not
assert it.

### 6 · `CLM-HEM-PLASMA-PROTEINS-FORMATION-AND-FUNCTIONS-01`

The claim carries both halves the concept holds — the two sites of formation and the eight
functions — because the book prints them on the same page. **The span carries only the
eight functions**, for a reason set out under "Where an article sentence and its claim did
not line up" below.

---

## Where the book's wording and the concept's diverge

Eight of these. Each is a real difference, not a paraphrase, and each is recorded on the
citation as well as here.

**1 · Free nucleotides — the book gives four groups, the plan's label says six.**
`claim-plan.json`'s label for `CON-FND-D6DFABFBA0BA5E` says free nucleotides "do six
different jobs — carry energy, signal as second messengers, donate methyl and sulfate
groups, carry hydrogen and carry acyl groups". The book's own division, physical p68
(printed p64), is a numbered **four**: energy transduction; signalling second messengers;
activated precursors in biosynthesis; coenzyme components. The six are the members inside
groups three and four, counted individually. The claim carries the book's four and names
the divergence in `qualifiers`. This is the concept's synthesis, not the book's sentence,
and it is a better teaching organiser than the book's — but it is not what the page says.

**2 · The DNA strands — the book never says "only".**
`CON-FND-5BAF472E54A764`, the plan label, and the article's `Common misconceptions` all
say the two strands are held to each other **only** by hydrogen bonds. That is a true
reading: the book puts phosphodiester bonds along each backbone in the primary-structure
section and hydrogen bonds across the strands in the secondary-structure section. But it
never joins the two with "only", on physical p74 or anywhere else. The claim says the
strands are held together by complementary base pairing through specific hydrogen bonds,
and stops there.

**3 · Mitochondrial DNA — "used as maternal lineage", not "to trace maternal lineage".**
Small, and recorded so a later reader does not take the difference for a second source.
The book's phrase is the clumsier one, physical p77.

**4 · Collagen — the book lists seven reasons, the plan's label names five.**
Physical p51 (printed p47) is a closed numbered list of seven under "Collagen has a strong
structure due to:". The plan's label for `CON-FND-14647EC60106E1` gives three residues per
turn, glycine in every third position, the right-handed superhelix of left-handed chains,
hydroxyproline hydrogen bonds, and covalent cross-links — and omits **the specific
arrangement into fibril and fibres** and **the staggered overhanging array that gives
flexibility**. The claim carries all seven, because dropping two would understate a source
that numbers them.

**5 · The alarm response — bronchodilatation is not one of the five.**
`CON-NEU-DCDACCB179C2A5` ends "In the lungs the same discharge produces bronchodilatation,
so airway resistance falls while almost every other parameter rises." The book does teach
sympathetic bronchodilatation — physical p156 (printed p43), under the thoracic functions
— but the alarm response on physical p158 is a list of exactly **five** items and
bronchodilatation is not among them. The claim carries the five and says so in
`qualifiers`. The article makes the same point explicitly and correctly, calling it "the
sixth fact worth carrying into the same answer even though the book prints it two pages
earlier".

**6 · Plasma proteins — the book does not say oedema follows hypoproteinaemia.**
`CON-HEM-005D132395BF2F`'s pitfall ends "which is why oedema follows hypoalbuminaemia".
The word oedema appears nowhere in the plasma-protein chapter. What the book says about
protein deficiency is function 6's own sentence, physical p123 (printed p10):
**"Deficiency of plasma proteins increases capillary permeability."** That is a different
statement — a permeability change, not an accumulation of fluid — and the claim does not
make the leap. The article, correctly, does not either; it quotes the book's sentence and
records the pitfall's version in `conflicts` rather than teaching it.

**7 · Mannitol — "by osmosis" is the book's word for the mechanism.**
`CON-FND-38F8E2264D46B1` says mannitol "remains osmotically active in the compartment it
occupies". The book, physical p21 (printed p17), says only that mannitol is
non-metabolised and easily excreted by the kidney and that its three uses work "by
osmosis". The restatement is fair and it is not a quotation, so the claim uses the book's
own phrase.

**8 · `CON-FND-4C1A1DFB1C6FA2` carries `subject: pharm` under a `CON-FND-` ID.**
Round 1 flagged this and it is still true. The concept is aspirin and cyclooxygenase,
`topic: Physiology`, `subtopic: Platelets and haemostasis`, `primary_node_id: DIS-PHY-T02`
— but its `subject` field says `pharm` while its ID carries the `FND` system code. The
claim ID the plan allocates is `CLM-FND-ASPIRIN-COX-INHIBITION-MI-PREVENTION-01`, which is
right by the rule in `03-relationships.md` (take the system code from the concept ID), and
I used it exactly. **The mismatch is on the concept, and the concept batch is another
agent's file.** Someone has to decide whether the ID or the `subject` field is wrong; that
decision is not mine to make from inside an evidence pass. Nothing downstream of me breaks
either way — the claim resolves against the concept and the validator is clean — but a
`pharm` concept sitting under `FND` will confuse a later subject-based query.

---

## Extraction traps hit, and how each was handled

Three places where a plain text extraction produces a quotation that is not what the page
says. All three are the standing trap: a text layer can be present and still lie.

**1 · Physical pp165–166 — the Greek subtype markers are private-use codepoints.**
The adrenergic receptor headings are set in a Symbol font with no `ToUnicode` map, so
`α` extracts as `U+F061` and `β` as `U+F062`. A naive read gives:

```
  a. 2 subtypes of alpha-receptors: 1 and 2
  1. Alpha-1 (1) receptors (mainly excitatory): ...
```

— which reads as though the subtypes were unnamed. The span is taken from the rendered
page, where α1, α2, β1, β2 and β3 are all legible, and the citation's `context_note` says
so, so a reviewer who re-extracts and finds bare digits knows why. This is the same font
trap round 1 hit on the DNA polymerases at physical p85, in a different chapter.

**2 · Physical p158 — the arrows are private-use codepoints too.**
Four of the five alarm-response items put an arrow between the action and the advantage it
buys. The glyph extracts as `U+F0DA`, and a whitespace-normalising read runs the two halves
together as "Dilates the pupils letting more light into the eyes", which reads as a single
clause rather than as cause and consequence. The span writes the glyph as `⇒` and the
`context_note` records both the substitution and the fact that item 4 carries no arrow on
the page, so none was added.

**3 · Physical p59 — a figure's axis label sliced into the sentence.**
The competitive-inhibition paragraph extracts as:

> "At a sufficiently high V max No inhibitor Competitive inhibitor substrate concentration,
> the reaction velocity reaches the Vmax observed in the absence of inhibitor."

The intruding fragments are the graph's y-axis label `Vmax` and its two curve labels
`No inhibitor` / `Competitive inhibitor`, cut into the paragraph by reading order.
Rendered, the sentence runs unbroken. The span is the rendered reading and the
`context_note` records the interleaving. This is the same shape as the snake-venom trap
round 1 hit at physical p35.

Every other support span in this pass was checked mechanically against the cached page
text — Symbol-font codepoints mapped back, page headers and footers stripped, whitespace
normalised — and matched exactly. The p59 sentence is the **only** fragment in seventeen
citations that does not match its extraction, and it is the one the figure interleaves.

---

## Where an article sentence and its claim did not line up

### Structural: the article asserts the claim as an enumeration

Seven of the sixteen new spans are enumerations that no single sentence of the article
carries — the book prints a numbered list, the article reproduces it as consecutive
paragraphs. As round 1 did with its six, the span quotes the **contiguous block of
consecutive paragraphs** rather than one line of it.

| Span | Block quoted |
|---|---|
| `SPN-FND-MITOCHONDRIAL-DNA-CHARACTERISTICS-01` | three paragraphs: shape and amount, coding content, inheritance and myopathy |
| `SPN-FND-DNA-DOUBLE-HELIX-ANTIPARALLEL-STRANDS-01` | two paragraphs: characteristic one, characteristic two |
| `SPN-FND-COLLAGEN-STRUCTURAL-STRENGTH-BASIS-01` | seven paragraphs, One to Seven |
| `SPN-NEU-ADRENERGIC-RECEPTOR-DISTRIBUTION-AND-ACT-01` | ten paragraphs: types, the two locations, presynaptic, postsynaptic mechanisms, then the five subtypes' actions |
| `SPN-NEU-CHOLINERGIC-AND-ADRENERGIC-FIBRE-TRANSMI-01` | three paragraphs: the division, the cholinergic list, the adrenergic remainder |
| `SPN-NEU-SYMPATHETIC-ALARM-STRESS-RESPONSE-01` | seven paragraphs: the discharge, the framing line, the five examples |
| `SPN-HEM-PLASMA-PROTEINS-FORMATION-AND-FUNCTIONS-01` | eight paragraphs, One to Eight |
| `SPN-FND-ASPIRIN-COX-INHIBITION-MI-PREVENTION-01` | three paragraphs, the book's own three sentences |

Two of those blocks stop deliberately short, and both stops are the citation's boundary:

- **`SPN-NEU-ADRENERGIC-RECEPTOR-DISTRIBUTION-AND-ACT-01`** ends at "Beta-3 receptors:
  lipolysis." The article's next two paragraphs compare noradrenaline with adrenaline —
  true, in the book, on the same page, and outside `CIT-ADRENERGIC-…`'s span. They need
  their own claim.
- **`SPN-NEU-SYMPATHETIC-ALARM-STRESS-RESPONSE-01`** ends at the fifth example. The
  article's next paragraph is the bronchodilatation point, which divergence 5 above
  explains is not part of the alarm list.

### Substantive mismatches

**1 · `CLM-HEM-PLASMA-PROTEINS-FORMATION-AND-FUNCTIONS-01` — the claim's two halves sit in
two sections.** The claim asserts both the sites of formation and the eight functions,
because the book prints both on physical p122. The **article** puts formation in
`Mechanism` — "The liver is the main site for synthesis of plasma proteins… Gamma globulins
are formed by plasma cells in the lymphoid tissue." — and the eight functions in
`Key determinants`. They are not contiguous and a span cannot cross a section. **The span
takes the eight functions**, which are the larger half and the examined one; the article
says the 2024 paper asked for six of them. This is the same shape as round 1's HbA1c case
and was resolved the same way. The formation sentences deserve a second span; the brief
allocates one span per claim, so I did not mint one.

**2 · `CLM-FND-REPLICATION-FORK-STRAND-SEPARATION-01` — the span is a mid-paragraph
block.** The article prints all of strand separation as one long paragraph that opens with
the origins of replication and the origin recognition complex, which this claim does not
assert. The span starts at "Two replication forks then form at each origin:" and runs to
"Helicase plus SSB proteins is what creates a replication fork." — contiguous, verbatim,
and neither more nor less than the claim. Round 1's GAG span took the same shape.

**3 · `CLM-FND-CHOLESTEROL-IMPORTANCE-AND-DERIVATIVES-01` — likewise.** The article's
cholesterol paragraph opens with plasma levels and sites of synthesis, which the claim does
not assert. The span starts at "It is converted into bile acids and bile salts in the
liver," and ends at "It is excreted mainly in bile as bile salts."

**4 · `CLM-FND-FREE-NUCLEOTIDE-BIOLOGICAL-FUNCTIONS-01` — the article states the count the
book only enumerates.** The book asserts its four groups by numbering four subheadings
across five pages; the article's `Definition` states it as a sentence — "The book gives four
groups: energy transduction, signalling second messengers, activated precursors in
biosynthesis, and coenzyme components." So the span here is stronger than its citation,
which is the reverse of the usual problem. `confidence` on the citation is 0.9 rather than
0.95 for the same reason round 1 gave the enzyme-rate citation 0.9: the source enumerates
rather than states.

**5 · `CLM-HEM-GLOBIN-PROTEIN-PART-FUNCTIONS-01` — the article's four functions are one
paragraph in `Clinical significance`, not in `Mechanism`.** Where a reader would expect
them. The span follows the article rather than the expectation, and `section_id` is
`Clinical significance` exactly as the article prints it.

### Divergences that did **not** surface

The article prose follows the book rather than the concept everywhere it matters:

- the lipids article does not claim that saturated chains pack closely;
- the plasma-proteins article does **not** say oedema follows hypoproteinaemia — it quotes
  the book's capillary-permeability sentence instead;
- the sympathetic article names bronchodilatation as a fact from two pages earlier rather
  than smuggling it into the alarm list;
- the ECM article prints **seven** collagen reasons, not five;
- the platelets article prints no aspirin dose;
- the free-nucleotides article says **four groups**, not six.

One thing the article asserts that no claim covers: the nucleic-acids article's
`Common misconceptions` says the two strands are held to each other "only by hydrogen
bonds". Divergence 2 above explains why no claim asserts the "only", so no span covers that
sentence.

---

## Drug claims

Two of the seventeen carry `risk_class: treatment_or_action` and so will not auto-publish
and cannot reach `verified` on this evidence:

| Claim | Why | Dose |
|---|---|---|
| `CLM-FND-MANNITOL-CLINICAL-APPLICATIONS-01` | mannitol as a diuretic, in glaucoma and in brain oedema | the book states none, and neither does the claim |
| `CLM-FND-ASPIRIN-COX-INHIBITION-MI-PREVENTION-01` | aspirin in the prevention of myocardial infarction | the book says only "small amounts … for prolonged periods"; no dose, strength or frequency anywhere in the chapter |

Each has one citation, from a teaching text, so both will land and stay at
`needs_evidence`. That is correct: a department book is not independent verification of a
drug's use.

`CLM-FND-COMPETITIVE-ENZYME-INHIBITION-MECHANISM-01` is deliberately **not** a drug claim.
Its span stops before the book's three worked drug examples, which is what keeps it a
mechanism.

---

## Things I could not determine

Named, not guessed.

1. **Whether the lipids article should be extended to teach membrane fluidity.** It is the
   only way `CLM-FND-MEMBRANE-FLUIDITY-DETERMINANTS-01` gets a span. The article batch is
   another agent's file and the brief forbids me editing it. The book's sentence is at
   physical p34, printed p30, so a follow-up pass has nothing to re-derive.

2. **Whether `CON-FND-4C1A1DFB1C6FA2`'s ID or its `subject` field is wrong.** Divergence 8.
   Concept-side, another agent's file, and a decision somebody has to make rather than
   infer.

3. **Whether the concepts should be corrected** where the book differs — the four-versus-six
   nucleotide groups, the seven-versus-five collagen reasons, the oedema pitfall, and the
   "only hydrogen bonds" reading. All four are concept-side. I did not touch
   `102-INT-concepts.md`.

4. **Whether a claim may carry more than one span.** Round 1 raised this and it is still
   open. Three claims in this pass would be better served by two spans than one: plasma
   proteins (formation and functions), adrenergic receptors (distribution and actions), and
   the collagen seven. The contract does not forbid it — `claim_ids` is a list on the span
   and `spanIds` is a list on the article — but the brief allocates one span per claim, and
   `SPN-…-02` IDs are not mine to mint.

5. **Whether the two missing transcription claims should get IDs now.** TFIIH opening the
   strands and the poly(A) tail setting mRNA half-life are each quotable at a page named
   above. `claim-plan.json` allocates one claim per entry and the brief forbids inventing an
   ID, so I did not mint them.

6. **`CLAIMS.md` still has no row for this scope.** It was already modified in the working
   tree when I started, it is outside the files the brief permits me to edit, and I did not
   add one. The scope was `102 INT · claims`, `102 INT · citations` and `102 INT · spans`.

---

## What was not done, deliberately

- No `git commit`, no `git push`, no import.
- No edit to the articles, the concept batch, `claim-plan.json`, `article-plan.json`,
  `102-INT-sources.md`, the round-1 reports, or anything under `scripts/kasr/seeds/`.
- No existing claim, citation or span rewritten, reordered or reformatted. The three
  batches were appended to and nothing else.
- No ID minted, no page number guessed, no quotation invented, no dose stated.
- The span-substring script was run from the session scratchpad and not added to the repo,
  because it is not one of the files this brief permits.
