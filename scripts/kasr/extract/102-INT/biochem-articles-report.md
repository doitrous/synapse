# 102 INT — Biochemistry library articles, author's report

Output: `docs/Kasr-Source-Imports/article/102-INT-biochemistry.md`
Source of record: `Department Book Module 102.pdf`, manifest `src_a488633802ec053c6325`, Part I.
Page offset for Part I: printed = physical − 4. Every range below is physical, with printed after it.

## What was produced

Eleven articles, one per Biochemistry chapter of `102 INT` that a 2025 end-of-year question touched.
All eleven `articleId`s were taken verbatim from `scripts/kasr/extract/102-INT/article-plan.json`.
No ID was minted. The four `ART-102-PHY-` entries were not touched, and
`102-INT-physiology.md` was not opened or written.

| Article | Physical (printed) pages | Concepts | primary_node_id |
|---|---|---|---|
| ART-102-BIO-AMINO-ACIDS-OF-BIOLOGICAL-IMPORTANCE | 5–10 (1–6) | 1 | DIS-BIO-T05 |
| ART-102-BIO-PROTEINS-OF-BIOLOGICAL-IMPORTANCE | 11–16 (7–12) | 1 | DIS-BIO-T05 |
| ART-102-BIO-CARBOHYDRATES-OF-BIOLOGICAL-IMPORTANCE | 17–27 (13–23) | 2 | DIS-BIO-T01 |
| ART-102-BIO-LIPIDS-OF-BIOLOGICAL-IMPORTANCE | 28–39 (24–35) | 3 | DIS-BIO-T04 |
| ART-102-BIO-CHEMISTRY-OF-HEMOPROTEINS | 40–47 (36–43) | 1 | DIS-BIO-T05 (overridden) |
| ART-102-BIO-ENZYMES | 54–65 (50–61) | 2 | DIS-BIO-T02 |
| ART-102-BIO-CHEMISTRY-OF-FREE-NUCLEOTIDES | 66–72 (62–68) | 1 | DIS-BIO-T01 |
| ART-102-BIO-DNA-SYNTHESIS-REPLICATION-AND-REPAIR | 81–85 (77–81) | 1 | DIS-BIO-T06 |
| ART-102-BIO-RNA-SYNTHESIS-TRANSCRIPTION | 86–91 (82–87) | 1 | DIS-BIO-T06 |
| ART-102-BIO-PROTEIN-SYNTHESIS-TRANSLATION | 92–101 (88–97) | 2 | DIS-BIO-T06 |
| ART-102-BIO-CELL-CYCLE-APOPTOSIS-AND-TUMOR-SUPPRESSOR-GENES | 107–111 (103–107) | 1 | DIS-BIO-T06 |

All sixteen concept IDs from the plan appear in `related_concepts`, checked mechanically against
`article-plan.json`. Every `module_subject` path is byte-identical to the plan's `modulePath`.

## Validation

```
npm run --silent medical:batch -- "docs/Kasr-Source-Imports/article/102-INT-biochemistry.md"
{ "kind": "article", "items": 11, "fieldsUsed": 51, "annotations": 34,
  "mediaRequests": 35, "calloutsWithEvidence": 0, "errors": [] }
```

**fieldsUsed 51. Errors 0.** Floor is 49.

The three columns not used are `body` and `image_recommendations`, both legacy aliases the manual
says never to write, and `callout_evidence`. `callout_evidence` was deliberately omitted rather
than filled: its content is claim IDs, citation IDs and a span ID, and none of those records exists
for module 102. A heading-only block would have registered in the validator's
`calloutsWithEvidence` count while carrying no evidence, which is worse than an absent column.
It is the first field to fill when the evidence pass lands.

Two further checks were run beyond what was asked, and both are clean:

```
npm run --silent medical:simulate -- "…/102-INT-biochemistry.md"
batches: [{"kind":"article","created":11,"updated":0,"rejected":0}]
delta:   {"articles":11}  errors: []
```

`created: 11, updated: 0, rejected: 0` confirms eleven new articles and no accidental overwrite.

```
npm run --silent medical:audit -- --source <sim with 102-INT-concepts.md alongside>
mine: 2 errors — articleData.claimIds missing, articleData.spanIds missing
```

Simulated with the sibling concept batch, the only remaining audit errors against my IDs are
`claimIds` and `spanIds`. Both are named as owed below. Simulated **without** the concept batch the
audit also reports `references unknown concept …` for all sixteen concepts, which is expected: the
102 concepts are authored and not yet live.

## The §7 back-link

Checked in the simulated end state rather than assumed. With
`docs/Kasr-Source-Imports/concept/102-INT-concepts.md` applied alongside, each concept comes out
carrying this article in `articleIds` — e.g. `CON-FND-D0EDFFF1477094 → ["ART-102-BIO-AMINO-ACIDS-OF-BIOLOGICAL-IMPORTANCE"]`.
The link is written from the article side at import, so no edit to the concept batch was needed and
none was made.

**One thing for the human to watch at import time.** Every concept record in
`102-INT-concepts.md` carries `## article_ids` / `[clear]`. The simulation applies both batches and
comes out with the back-links intact, so the two do not fight in the simulator. If the two batches
are applied in separate sittings with the concepts second, re-check one concept's `article_ids`
afterwards before assuming the link survived.

## primary_node_id — the one override

**`ART-102-BIO-CHEMISTRY-OF-HEMOPROTEINS`: plan said `DIS-BIO-T07`, written as `DIS-BIO-T05`.**

The plan takes `primary` from `concepts[0]`, and that concept is HbA1c — clinical biochemistry, and
honestly so. But the article teaches the whole chapter, as instructed: haem chemistry and the
porphin ring substituent positions, myoglobin's eight helices and six coordinate bonds, the
structure of HbA1, the T and R forms, the globin gene families, sickle cell anaemia and
thalassaemia. One section of it is a laboratory test. Filing all of that under Clinical biochemistry
would put protoporphyrin IX in front of a student browsing for investigations.

Written as `DIS-BIO-T05` Amino acids and proteins, with `DIS-BIO-T07` **and** `SYS-END-T06-S01`
both carried in `secondary_node_ids`, so the clinical route to the article is preserved one level
down. Recorded in that article's own `conflicts` block, not only here.

The same article's `subject` was left at `fnd` rather than the concept's `endo`, for the same
reason. Nine of the other ten articles take `primary_node_id` straight from `concepts[0].primary`.
Every canonical node used — `DIS-BIO-T01/T02/T04/T05/T06/T07`, `SYS-GIT-T02-S02`, `SYS-MSK-T04-S02`,
`SYS-MUL-T04-S01`, `SYS-END-T06-S01`, `SYS-INF-T06-S01`, `SYS-FND-T03-S02`, `SYS-IMM-T03-S01`,
`SYS-FND-T02-S01`, `SYS-FND-T01-S02` — was resolved against `MEDICAL_TAXONOMY_INDEX` before being
written. `secondary_node_ids` were taken from the concept records rather than invented; four
articles have none and carry `[clear]` plus a `secondaryNodeIds` field note.

## `subject`: `fnd` on all eleven

The instruction allowed `fnd` or the majority subject of the article's concepts. `fnd` is at least
tied on ten of the eleven. On hemoproteins the only concept is `endo`, and that is the one place
`fnd` is a deliberate choice rather than the default — reasoning above. The concept-level subjects
(`gi`, `endo`, `pharm`, `mul`) record where each *exam concept* has clinical reach; they are
preserved on the concept records and reached through `secondary_node_ids` here.

## The lipids chapter — drugs

`ART-102-BIO-LIPIDS-OF-BIOLOGICAL-IMPORTANCE` carries three concepts, two of them about drugs.

- `status: Draft`, `publication_gate: needs_evidence`, and a `notes` line saying it stays Draft
  through any later evidence pass because it is treatment content.
- **No dose, route or frequency anywhere.** The book gives none, and none was added. Recorded in
  `evidence_gaps`.
- **Montelukast's generic name is not written.** The department book prints only the trade name and
  the class, "leukotriene receptor antagonist" (physical p39). Recorded in `evidence_gaps`.
- **The paper's "Singular" was not silently corrected.** The book prints "Singulair"; the 2025 paper
  prints "Singular". The teaching text uses the book's spelling; the paper's spelling is recorded in
  `university_notes` so a student recognises the question they will actually be shown; the
  difference is stated in `conflicts`.
- The media request for the eicosanoid pathway diagram carries an explicit instruction that the drug
  bars be labelled by class only and carry no dose.

## Where the book was silent, and what I did

Nothing was borrowed from another textbook. Each of the eleven articles carries an `evidence_gaps`
block naming its own silences. The ones worth surfacing:

- **Amino acids.** The book uses "negative nitrogen balance" without defining nitrogen balance
  anywhere in Part I. The term is used exactly as the book uses it and no definition was added.
- **Proteins.** The book says denaturation "may be reversible" but gives only an irreversible
  example (albumin). No reversible example was invented. No temperature, pH or urea concentration
  is given for any protein. Chaperones are named with no individual chaperone and no mechanism.
- **Carbohydrates.** No fibre intake figure, no gram quantity, no measure of how much fat absorption
  is delayed. No colonic bacterial fermentation — the book does not mention it, so neither does the
  article. Mucopolysaccharidosis is "more than 40 genetic disorders" with none named.
- **Lipids.** The book does not say which snake, does not name the antitoxin, gives no time course,
  and does not say whether the venom lecithinase is the same PLA2 that feeds eicosanoid synthesis.
  It says SAIDs inhibit phospholipase A2 without saying how — no lipocortin or annexin was added.
- **Hemoproteins.** No HbA1c diagnostic threshold and no treatment target; only the 4–6.5% normal
  range and "higher in diabetes mellitus". The book never discusses conditions that shorten red cell
  survival and falsify the test — the article states the dependence on the 120-day life span but adds
  no clinical caveat the book does not give. No prevalence figure for sickle cell or thalassaemia,
  and none exists in this corpus for Egypt.
- **Enzymes.** The book does not name the bacterial enzyme sulfonamides inhibit — only "the enzyme
  involved in the formation of folic acid using PABA as substrate". No name was added. No Km or Vmax
  value for any enzyme, and no optimum pH except pepsin at 2. No sulfonamide resistance, no adverse
  effects, no trimethoprim.
- **Nucleotides.** The book never ties NAD+ to catabolism or NADPH to biosynthesis, and never names
  the vitamin behind the nicotinamide. Neither association was added. The riboflavin origin of
  ribitol is stated — in a different chapter (physical p20), and `evidence_basis` says so.
- **DNA synthesis.** The book does not distinguish topoisomerase I from II, names no repair pathway
  (no NER, no MMR), and gives no inheritance or prevalence for xeroderma pigmentosum.
- **RNA synthesis.** No individual snRNP is named, no spliceosome count, no splicing chemistry, no
  branch point or lariat. The lupus autoantibody is not named. No splicing-failure disease is given,
  and none was added — the book's "related disease" is lupus, which attacks the machinery.
- **Translation.** The book does not name vitamin K in connection with γ-carboxyglutamate, and does
  not name vitamin C in connection with collagen hydroxylation. Neither was added, even though both
  are the obvious next sentence.
- **Cell cycle.** The book names no protein that *initiates* the intrinsic pathway, does not name
  the TNF/FAS ligands, does not number the caspases, and never contrasts apoptosis with necrosis.
  The "about 50% of human cancers" figure is given without a source or population, and is quoted as
  the book's own figure.

## Extraction problem found and resolved

The Greek letters naming the DNA polymerases on physical page 85 are set in a Symbol font, and the
cached page text returns them as private-use characters (`U+F061`, `U+F062`, `U+F067`, `U+F064`,
`U+F065`) rather than as letters, so `show.py` prints "DNA polymerase -primase complex" with a hole
where the letter should be. Read as α, β, γ, δ, ε from the code points, and independently confirmed
on physical pages 82–83, where δ and ε are printed as ordinary text against the lagging and leading
strands, and on page 83 where δ fills the gaps between Okazaki fragments. Recorded in that article's
`evidence_gaps` so the next reader does not have to rediscover it.

## Conflicts recorded (article-level `conflicts` blocks)

- **Amino acids** — the paper's matching list offers "Essential acidic amino acid", which has no
  correct partner: the book makes both acidic amino acids non-essential. Also, the paper prints
  "Lycine" for lysine; not corrected in the record of what was asked.
- **Lipids** — "Singular" / "Singulair", as above.
- **Nucleotides** — the paper asks for "Nucleosides that act as a hydrogen carriers". By the book's
  own definition (physical p67) a nucleoside carries no phosphate, and all four hydrogen carriers do:
  NAD+, NADP+ and FAD are dinucleotides, FMN is a mononucleotide. The book's section heading is
  "Free Nucleosides and Nucleotides", which is the likely origin, and the book does elsewhere call
  S-adenosyl methionine a nucleoside. Taught as nucleotide-derived coenzymes; neither corrected.
  Also, the subject tree names the leaf "Chemistry of Free Nucleotides" and the book's Contents
  prints "Chemistry of Nucleotides"; `module_subject` follows the tree because the path must resolve
  against it.
- **Hemoproteins** — the `primary_node_id` override, above.
- **Cell cycle** — two of the paper's matching options have no partner among the five proteins it
  names: "Initiate intrinsic pathway of Apoptosis" (the book gives intracellular stress and
  cytochrome c, with Bax/Bak/Bok as modulators of release, not initiators) and "Check cell size and
  cell damage" (the book's own diagram gives that to the G1 and G2 checkpoints). Neither option is
  assigned to a protein.
- Carbohydrates, Proteins, Enzymes, DNA synthesis, RNA synthesis and Translation carry `[clear]` —
  the book and the paper agree.

## Media requests filed — 35, all as `media_recommendations`

No URL appears anywhere in the file. Zero images exist in this repository
(`docs/Kasr-Source-Imports/media-requests/media-audit.md`), so every figure is a request. Each block
carries a brief in its heading, a `Purpose:` saying what a student can do afterwards and why prose
cannot carry it, `Priority:`, `Status:`, `Kind:`, `Section:`, `Source direction:` and `Rights:`.
Twenty-three are `Priority: required` and twelve are `strongly helpful`.

Four of them are `required` for a reason stronger than usual: **the 2025 paper prints the department
book's own diagram with its labels removed and asks the student to restore them.** A student who has
never seen the diagram cannot begin the question. These are the eicosanoid synthesis pathway
(Lipids, 6 marks), the post-transcriptional modification pathway (RNA synthesis, 5 marks), the point
mutation types figure (Translation, 5 marks), and the cell cycle ring with its CDK-cyclin complexes
and checkpoints (Cell cycle, 5 marks).

By article: Amino acids 3, Proteins 3, Carbohydrates 3, Lipids 3, Hemoproteins 4, Enzymes 3,
Nucleotides 3, DNA synthesis 3, RNA synthesis 3, Translation 4, Cell cycle 3.

Every request that serves a specific examined concept names that concept ID in its `Notes:` line, as
§6 of `00-START-HERE.md` requires for a request routed through an article on a concept's behalf.

## Owed, and named rather than guessed

1. **`claim_ids` and `span_ids` are `[clear]` on all eleven.** Both are on the audit's *must carry a
   value* list, so this is a real audit failure and the only one against my IDs. No claim and no
   citation record exists for module 102 — `docs/Kasr-Source-Imports/evidence/102-INT-sources.md`
   holds 69 **resource** records and nothing else. Authoring a span requires a claim, and inventing
   either ID would attach these articles to nothing. Both carry a `claimIds` / `spanIds` field note
   and an `evidence_gaps` line. The evidence pass closes this.
2. **`question_ids` is blank on all eleven**, with a `questionIds` field note. The reciprocal link is
   written in the question pass.
3. **`arabic_title` is blank on all eleven**, with an `arabicTitle` field note. This follows the
   position the sibling concept batch already takes on `arabicLabel` for this same module: teaching
   at Kasr Alainy is in English, the department book prints no Arabic term, and a transliteration is
   not a reviewed term. Filling it is a reviewer's job, not a translator's guess.
4. **`subtopic` is blank on all eleven.** No `SUB_` identifier exists for this module in the
   curriculum overlay. `module_subject` carries the position instead, and it is the department book's
   own chapter name. Noted under `subtopicId`.
5. **`CLAIMS.md` was not updated.** The task restricted edits to the article file and this report, so
   no scope row was claimed or released. Someone should add the row for
   `102 INT · Biochemistry · articles` and move it to Done.
6. **`docs/Kasr-Source-Imports/INDEX.md` was not updated** for the same reason — the new article file
   is not listed there yet.

## Things I could not determine

- **Which post-transcriptional modification the paper intended in each of Diagram (2)'s three
  blanks.** The paper's sub-questions identify the second blank as splicing (it asks for the
  ribonucleoproteins responsible and a related disease) and the third as one whose importance is
  asked. The first cannot be recovered from the paper's text alone. The article teaches all four
  modifications in the book's order rather than asserting a mapping, and says so in `evidence_gaps`.
- **Whether the venom lecithinase and the eicosanoid-pathway phospholipase A2 are the same enzyme.**
  The book says both have PLA2 activity and does not say more. Described separately, as the book
  describes them.
- **What the paper's two unmatched cell-cycle options were meant to pair with.** Recorded as a
  conflict; no protein assigned.

## Searches run before creating

`node "Instruction Manual for Content Creation/tools/find-existing.mjs"` on: cellulose,
glycosaminoglycan, denaturation, eicosanoid, "amino acid", HbA1c, nucleotide, enzyme,
"DNA polymerase", splicing, post-translational, mutation, apoptosis, "cell cycle", sulfonamide,
"snake venom", hemoprotein, haemoglobin, biochemistry, protein, lipid, carbohydrate, transcription,
translation, replication, ART-102.

No live or pending **article** covers any of these eleven chapters. Three live articles came close
and none is a merge candidate; each is named in the relevant article's `notes` with the reason it
stays separate:

- `ART-GIT-TOP-E75BDFCAAB` Protein, Amino-Acid, and Nucleoprotein Digestion — gastrointestinal
  digestion, not amino acid chemistry.
- `ART-HEM-TOP-37142FFF1F` Plasma Proteins — haematology's account of plasma protein function, not
  protein structure.
- `ART-FND-TOP-2C71C33A59` Clinical Biochemistry Laboratory Practice — laboratory practice.

Several live *concepts* overlap at the edges and are likewise named in `notes` rather than merged:
`CON-GIT-0D2A7B91949451` (methylcellulose as a bulk-forming agent), `CON-INF-D4094C0234D780`
(nucleoside analogues inhibiting DNA polymerase), `CON-FND-46C6FBC25A26CF` (levels of expression
regulation), and the two immunology apoptosis concepts `CON-IMM-7EC2CFBC19A9E9` and
`CON-IMM-8BBDB99CE5FD3C`.

## One parser trap worth recording for the next author

`hold_these`, `lose_the_mark`, `field_notes` and `related_articles` split on **newlines only**, so a
semicolon inside them is safe. `evidence_basis`, `evidence_gaps`, `conflicts` and `university_notes`
go through `optionalList` / `splitImportList`, which split on newline, `|` **and** `;`. Six lines in
the first draft carried a semicolon in one of those four fields and would have been silently cut in
half — and the `university_notes` one would have been dropped entirely, because the fragment after
the semicolon has no `UNIVERSITY:` prefix and is filtered out. All six were rewritten, and the whole
file is now checked mechanically for `;` and `|` in those fields. `medical:batch` does not catch this.
