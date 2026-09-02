# AUN-INI-105 -- S3 triage, `INI MCQ .pdf`

Module: Infection and Immunity (`AUN-INI-105`), Year 1 Semester 2. Chosen per
`coverage/AUN-Y1-priority-sources.md` §AUN-INI-105 as the module's richest
source: `Year 1/INI/_Telegram 64 Newer/INI MCQ .pdf`, 132 pages / 25,488
words, 0 garbled pages (`pagetext.mjs status`), not yet triaged before this
pass. `Week 6 INI Quizzes.pdf` (62p, fully garbled), `Formative 7 INI
answered .pdf` (7p, fully garbled) and `INI All GDs - solved.pdf` (253p, 40
garbled pages) are left for a later lane per the dispatch.

## Key-recovery method

`pagetext.mjs keys` was run first on pages 4-10 (per the manual's rule for
visually-marked keys) and correctly reported 0 marked/0 keyed -- this source
carries no highlight/circle/red-text keys at all, so the tool's known
footer-misreport bug (a chief-of-staff tool warning received mid-pass: `keys`
can misread a page footer as a red-text hit on the last option) never
produced a false hit here; every recovered key in this triage comes from
`pagetext.mjs show`'s plain page text instead, not from `keys` output, so
that bug does not touch this pass's results.

Reading past page 10 found the real key mechanism: the source is not a
Moodle export like `AUN-MPT-104`'s quiz bank, but a compiled MCQ book where
**each chapter restarts question numbering at 1 and ends with its own
plain-text printed answer table** (a grid of question numbers over a grid of
letters, headed "ANSWERS" -- except the Mycology chapter, whose table is
headed "**ANSWES**", a typo, findable only by reading past the expected
"ANSWERS" grep miss). `pagetext.mjs grep "❖"` found all 11 chapter headers in
one call; `pagetext.mjs grep "ANSWERS"` found 10 of the 11 answer tables in
one call (the 11th, Mycology's, only turned up on direct page reading because
of the "ANSWES" typo). Every chapter's answer table was then read directly
(`pagetext.mjs show`) to recover 100% of that chapter's printed keys -- no
OCR, no render, no visual key-reading needed anywhere in this file.

## Chapter structure (full source map)

| # | Chapter | Pages | Items | Notes |
|--:|---|---|--:|---|
| 1 | Bacterial cell structure | 4-27 | 161 | answer table p26-27; Q133 carries a double answer "D,E" |
| 2 | Bacterial growth | 28-37 | 60 | answer table p37 |
| 3 | Bacteriophage | 38-41 | 24 | answer table p41 |
| 4 | Bacterial Genetics | 42-50 | 58 | answer table p50 |
| 5 | Antimicrobial chemotherapy & Pathogenesis of bacterial infections | 51-62 | 74 MCQ + 10 True/False (Q75-84) | answer table p62; the True/False block is a different item type (2-valued, no A-D options), not authored this pass |
| 6 | General virology | 63-77 | 102 | answer table p77 |
| 7 | General Mycology | 78-82 | 33 | answer table p82, headed "**ANSWES**" (typo) -- the `pagetext.mjs grep "ANSWERS"` sweep misses this one |
| 8 | Introduction to parasitology | 84-85 | 16 | answer table p86; a second, parasitology-only table of contents sits on p83 |
| 9 | Trematodes | 87-100 | 98 | answer table wraps p99-100 |
| 10 | Cestode | 101-111 | 86 | answer table p111 |
| 11 | Nematoda | 112-130 | 164 | answer table wraps p131-132 |

**Total: 886 items** (876 standard 4-5-option MCQ + 10 True/False), all
100%-keyed by a printed plain-text table. Micro (chapters 1-7, ending
General Mycology p82) and para (chapters 8-11) each carry their own
introductory table of contents (p3 and p83) -- the intro page's claim that
the file covers "part 1 of micro and part 1 of para" is confirmed accurate;
`coverage/AUN-Y1-priority-sources.md`'s existing entry for this file did not
have this chapter breakdown, since the file was unread before this pass.

This pass read and per-question-keyed only **Chapter 1** (Q1-58 of 161, the
window needed for the ~50-question authoring dispatch); chapters 2-11 are
counted, page-mapped and confirmed 100%-keyable by the same table mechanism
(spot-checked on chapters 5, 7, 9, 10, 11 while mapping structure) but not
read at per-question level -- queued for a later lane. **Chapter-1 key note
for that later work:** this triage's seed keys use bare `ini-mcq-qNNN`
(chapter-1's own question number, per the dispatch's literal instruction),
which only works because chapter 1 is the only chapter authored so far --
every other chapter also restarts at Q1, so a future lane touching chapter 2
onward must disambiguate (e.g. `ini-mcq-ch2-qNNN`) or its keys will collide
with chapter 1's in `ledger.mjs`'s reconciliation.

## Checkpoint table -- Chapter 1, Q1-50 window

| Module | Questions read | Keys recovered | Authored | Held | Concepts -- live | pending | new |
|---|--:|--:|--:|--:|--:|--:|--:|
| AUN-INI-105 (ch1, Q1-50) | 50 | 50 (100%) | 45 | 5 | 2 | 8 | 6 |

- **Questions read (50):** Q1-Q50 of chapter 1, "Bacterial cell structure"
  (stems and options read via `pagetext.mjs show`, pages 4-11).
- **Keys recovered (50 of 50, 100%):** every question in this window has a
  printed letter (or, for Q42, a printed letter among five options) in the
  chapter's own plain-text answer table -- comfortably clears the ≥60%
  condition for TRIAGE APPROVED.
- **Printed-key vs. expected-answer conflicts found while cross-checking
  each key against the obvious textbook fact (not assumed correct just
  because it is printed and machine-readable):**
  - **Q3** ("Rod shaped bacteria are known as?", options Cocci/Comma
    forms/**Bacilli**/Pleomorphic forms) is keyed **A "Cocci"** -- textbook
    fact is Bacilli (C). **Held.**
  - **Q5** ("Spherical-shaped bacteria are referred as?", options
    **Cocci**/Bacilli/Spirilla/None) is keyed **B "Bacilli"** -- textbook
    fact is Cocci (A). **Held.** Q3 and Q5 read as if their intended answers
    were transposed with each other (a plausible source-side transcription
    slip); confirmed a genuine conflict either way, not an OCR artefact,
    since both keys were read as plain, unambiguous printed text.
  - **Q35** ("All of the following structures of bacteria contain (or are
    made of) protein EXCEPT?", options Plasmids/Ribosomes/Pili/**Cell
    membrane**) is keyed **D "Cell membrane"**. Defensible in that a
    membrane is chiefly phospholipid, but option A "Plasmids" is also
    arguably correct under the same logic (a plasmid is DNA, not protein)
    -- two options can defend "except," and nothing in the stem resolves
    which was intended. **Held** as genuinely ambiguous, not a confident
    single-letter conflict like Q3/Q5.
  - All other 47 keys in the Q1-50 window check out against the obvious
    textbook fact with no conflict -- see the per-question table below.
- **Schema-shape holds found during authoring, not during triage reading:**
  **Q13** ("A Gram-negative cell wall is …… than a Gram positive one?") and
  **Q16** ("The cell wall type that has less peptidoglycan is?") print only
  **two** options each (Thicker/Thinner; Gram negative/Gram positive) -- both
  keys are correct and uncontested, but the seed schema's 4-6-option floor
  (`scripts/content/seed.schema.md`) refused them. Inventing two distractors
  not in the source was judged worse than holding, so both are held rather
  than authored -- discovered by `emit-mcq.mjs`'s own validation, not by a
  pre-read of the stems, which is why they are not counted among the
  "keys recovered" figure above (their keys ARE recovered; they are held on
  option-count grounds, not a key conflict).
- **Stem-absent items: none** in this window.
- **Duplicates:** none *within* Q1-50 (no two questions in this window share
  an identical stem), but several Q1-50 stems reappear, near-verbatim, later
  in chapter 1 outside this window -- e.g. Q17/Q154 ("bacterial pili mainly
  contain"), Q18/Q155 ("mesosomes are part of"), Q36/Q152 ("endotoxin
  produced by gram negative bacteria is present in") -- confirming the
  chapter recycles its own earlier questions later on, a pattern worth a
  duplicate-collapse pass whenever a later lane authors past Q50.

## Live / pending / new -- search method

`find-existing.mjs` matches only an exact-substring hit of the whole query
against a field, so short, single-topic terms were searched (`plasmid`,
`peptidoglycan`, `endotoxin`, `exotoxin`, `flagella`, `capsule`, `bacterial
spore`, `mesosome`, `teichoic acid`, `pili`, `nucleoid`, `sterol`,
`virulence factor`, `gram stain`, `plasma membrane`, `prokaryote`, `clone`,
`mycoplasma`), one term per call, re-run this pass for every concept this
window's 47 authored questions test. The chapter overlaps heavily with Ain
Shams's own `ASU-INF-microbiology-concepts.md` (pending, both
`docs/import-ready/concept/` and `docs/Ain-Shams-Source-Imports/concept/`) --
exactly the overlap the lane card's §7 flagged in advance -- so most of this
window's questions reuse an ASU-INF concept rather than mint a twin.

| Q | Tested idea | Printed key | find-existing result |
|--:|---|:-:|---|
| 1 | Plasmid: accessory extrachromosomal DNA, not a core cellular function | D | **live** -- `CON-DEV-FE47A8F9B0768E` ("Bacterial plasmids are small circular extrachromosomal DNA molecules") |
| 2 | Clone: population from a single parent cell | B | new |
| 3 | Rod-shaped bacteria = bacilli | A | *held -- printed key (Cocci) conflicts with the expected answer (Bacilli)* |
| 4 | Gram-negative bacteria stain pink (safranin counterstain) | A | new |
| 5 | Spherical bacteria = cocci | B | *held -- printed key (Bacilli) conflicts with the expected answer (Cocci)* |
| 6 | Gram-positive bacteria stain violet (crystal violet retained) | B | new |
| 7 | Eukaryote/prokaryote differences: false claim is "no genetic material" | D | new |
| 8 | Prokaryote true statement: single circular DNA chromosome | E | new |
| 9 | Prokaryote characterized by: all of the listed features jointly | E | new |
| 10 | Capsule protects from phagocytosis | A | **pending** -- `docs/import-ready/concept/ASU-INF-microbiology-concepts.md`, `CON-INF-25846A77987558`, canonical_key `bacteria.capsule.function-virulence-identification-vaccine` |
| 11 | Peritrichous: flagella all around the cell | B | new |
| 12 | Cell wall does NOT protect from phagocytosis (that is the capsule's job) | C | **pending** -- `CON-INF-3FBC905C4F778F`, `bacteria.cell-wall.peptidoglycan-rigidity` |
| 13 | Gram-negative wall thinner than Gram-positive | B | *held -- source prints only 2 options (Thicker/Thinner), short of the schema's 4-option floor; would reuse `CON-INF-7E3B831D71A008`* |
| 14 | Flagella and pili are made of protein | D | **pending** -- `CON-INF-83707B09F53803`, `bacteria.flagellum.flagellin-motility` |
| 15 | Gram-negative wall (LPS) contains polysaccharide | A | **pending** -- `CON-INF-0DD46C0FD80938`, `bacteria.gram-negative-cell-wall.composition` |
| 16 | Gram-negative = less peptidoglycan | A | *held -- source prints only 2 options (Gram negative/Gram positive), short of the schema's 4-option floor; would reuse `CON-INF-7E3B831D71A008`* |
| 17 | Bacterial pili mainly contain protein | C | **pending** -- `CON-INF-83707B09F53803` (contextual: `CON-INF-BC446C9816D9CE`) |
| 18 | Mesosomes are part of the plasma membrane | A | **pending** -- `CON-INF-E4012E20B5A13D`, `bacteria.mesosome.structure-and-role` |
| 19 | Teichoic acid found in Gram-positive bacteria | A | **pending** -- `CON-INF-7E3B831D71A008` |
| 20 | Mesosomes are sites of respiratory enzymes | D | **pending** -- `CON-INF-E4012E20B5A13D` |
| 21 | Capsule composed of polysaccharide or (B. anthracis) polypeptide | D | **pending** -- `CON-INF-25846A77987558` |
| 22 | Cell wall (peptidoglycan) maintains bacterial shape | B | **pending** -- `CON-INF-3FBC905C4F778F` |
| 23 | Gram+/- differences reside in the cell wall | A | **pending** -- `CON-INF-7E3B831D71A008` |
| 24 | Bacterial locomotion = flagella (not fimbria) | B | **pending** -- `CON-INF-83707B09F53803` |
| 25 | Teichoic acid found in Gram-positive walls | A | **pending** -- `CON-INF-7E3B831D71A008` |
| 26 | Monotrichous: one flagellum, one pole | A | new |
| 27 | Capsule: protects from phagocytosis AND helps adherence | C | **pending** -- `CON-INF-25846A77987558` |
| 28 | Bacterium lacks a true (membrane-bound) nucleus | B | new |
| 29 | False about Gram-negative wall: contains teichoic acid | A | **pending** -- `CON-INF-7E3B831D71A008` (contextual: `CON-INF-0DD46C0FD80938`) |
| 30 | Pili functions EXCEPT movement (that is the flagellum's job) | B | **pending** -- `CON-INF-BC446C9816D9CE`, `bacteria.pili.ordinary-vs-sex-pili-function` |
| 31 | Only Gram-negative cells have an LPS layer | A | **pending** -- `CON-INF-7E3B831D71A008` |
| 32 | Plasma membrane = selective barrier controlling molecular traffic | C | new |
| 33 | Genetic information stored in the nucleus (vs. ER/Golgi/lysosome) | B | new |
| 34 | Plasma membrane regulates traffic into/out of the cell | D | new |
| 35 | Structures containing protein EXCEPT | D | *held -- ambiguous: Cell membrane (D, printed) and Plasmids (A) are both arguably "except"* |
| 36 | Endotoxin present in lipopolysaccharide | B | **pending** -- `CON-INF-0DD46C0FD80938` (contextual: `CON-INF-C87DF729E2ADDF`) |
| 37 | Exotoxins are heat labile | A | **pending** -- `CON-INF-C87DF729E2ADDF`, `bacteria.toxins.exotoxin-vs-endotoxin` |
| 38 | Flagella are the organ of motility | C | **pending** -- `CON-INF-83707B09F53803` |
| 39 | Lophotrichous: a tuft of flagella at one pole | C | new |
| 40 | NOT an exotoxin character: prepared by organism disintegration (that is endotoxin's release mechanism) | D | **pending** -- `CON-INF-C87DF729E2ADDF` |
| 41 | NOT an endotoxin character: converted to formol toxoid (that is an exotoxin property) | C | **pending** -- `CON-INF-C87DF729E2ADDF` |
| 42 | Virulence factors EXCEPT inclusion granules (a storage structure, not a virulence factor) | E | new |
| 43 | Exotoxin correct statement: strong antigenic | B | **pending** -- `CON-INF-C87DF729E2ADDF` |
| 44 | Endotoxin association = lipopolysaccharide | B | **pending** -- `CON-INF-0DD46C0FD80938` (contextual: `CON-INF-C87DF729E2ADDF`) |
| 45 | Amphitrichous: one flagellum at each of two poles | A | new |
| 46 | Exotoxin best-matching character: they are strong (potent) | D | **pending** -- `CON-INF-C87DF729E2ADDF` |
| 47 | Bacterial spores: false statement is "metabolically active" (spores are dormant) | A | **live** -- `CON-INF-3E6590C8AC2166` ("Bacillus and Clostridium can form dormant highly resistant non-replicating endospores") |
| 48 | Pili occur in both motile and non-motile strains | B | **pending** -- `CON-INF-BC446C9816D9CE` |
| 49 | Lipopolysaccharide responsible for endotoxin activity | A | **pending** -- `CON-INF-0DD46C0FD80938` (contextual: `CON-INF-C87DF729E2ADDF`) |
| 50 | NOT an exotoxin property: coded by chromosome (many are plasmid/phage-coded) | A | **pending** -- `CON-INF-C87DF729E2ADDF` |

Concept placement (subject `inf`, per `00-START-HERE.md` §3: "Microbiology
and Parasitology → inf"; `CON-INF-` prefix, matching Ain Shams's own
convention for the same subject).

## Held (5 of 50 -- key conflict, key ambiguity, or too few printed options)

| Q | Tested idea | Printed key | Reason |
|--:|---|:-:|---|
| 3 | Rod-shaped bacteria | A "Cocci" | Cocci are spherical; the textbook term for rod-shaped bacteria is Bacilli (option C, not marked). |
| 5 | Spherical-shaped bacteria | B "Bacilli" | Bacilli are rod-shaped; the textbook term for spherical bacteria is Cocci (option A, not marked). Read together with Q3, the two answers look transposed. |
| 13 | Gram-negative wall vs. Gram-positive wall thickness | B "Thinner" | Key uncontested, but only 2 options are printed (Thicker/Thinner), short of the seed schema's 4-option floor. |
| 16 | Which wall type has less peptidoglycan | A "Gram negative" | Key uncontested, but only 2 options are printed (Gram negative/Gram positive), short of the seed schema's 4-option floor. |
| 35 | Structures containing protein EXCEPT | D "Cell membrane" | Defensible, but option A "Plasmids" (DNA, not protein) is equally arguable as the EXCEPT answer; the stem does not disambiguate which was intended. |

## Checkpoint table -- Chapter 1, Q51-100 window (lane 2)

| Module | Questions read | Keys recovered | Authored | Held | Concepts -- live | pending | new |
|---|--:|--:|--:|--:|--:|--:|--:|
| AUN-INI-105 (ch1, Q51-100) | 50 | 50 (100%) | 44 | 6 | 9 (incl. reuse of 3 lane-1 mints x 8 uses) | 24 uses across 10 ASU-INF ids | 4 |

- **Questions read (50):** Q51-Q100 of chapter 1 (stems/options via
  `pagetext.mjs show`, pages 10-18), keyed against the same plain-text
  ANSWERS table (p26-27) lane 1 read.
- **Printed-key vs. expected-answer conflicts:** none found in this window
  -- all 50 keys check out against the obvious textbook fact (unlike Q3/Q5
  in the Q1-50 window). No new "Needs Omar" ruling item from this window.
- **Duplicates (6 of 50, all HELD as `duplicate-of`):** the chapter's own
  recycling, flagged in advance by lane 1's triage, showed up concretely in
  this window -- Q51 and Q74 both near-restate Q39 (lophotrichous, "...at
  one pole ... is known as/called"); Q57 and Q68 both near-restate Q47
  (bacterial spores, reusing its exact "are metabolically active" / "more
  resistant than vegetative cells" phrasing); Q80 near-restates Q24
  (bacterial locomotion = flagella, same stem plus a parenthetical);  Q85
  near-restates Q11 (peritrichous, "distributed ... is known as/called").
  Every hold is a near-verbatim stem/option match to an already-authored
  Q1-50 item, not a same-fact-different-phrasing sibling (this bank pairs
  several same-fact-different-phrasing questions deliberately, e.g. Q44/Q49
  on endotoxin-LPS, both authored by lane 1 without a hold).
- **Schema-shape holds:** none in this window -- every candidate question
  prints 4-5 options.
- **New concepts minted (4, all AUN-INI-105-native, article 2):** flagellar
  antigenicity/H-antigen (`CON-INF-BF2E753EF92568`, Q55), protoplast vs.
  spheroplast (`CON-INF-BD1B74226AE7B2`, Q65/Q82), taxonomy definition
  (`CON-INF-1D7E6927DF52F6`, Q78), acellular-virus-vs-prokaryote-vs-
  eukaryote classification (`CON-INF-E3C75AA9B1F5E5`, Q94/Q95). Each
  cleared `find-existing.mjs` first; the 70S-ribosome and normal-flora
  candidates initially planned as mints were dropped once
  `find-existing.mjs` turned up existing pending ASU-INF records
  (`CON-INF-29351FD540E214`, `CON-INF-0B4BAFFD525FDF`) -- reused instead.
- **Concept reuse in this window:** live -- `CON-INF-3E6590C8AC2166`
  (spores, x5), `CON-DEV-FE47A8F9B0768E` (plasmid, x1), `CON-INF-
  398B4BA280679E` (inclusion granules -- found live via `find-existing.mjs`
  "inclusion granule", subject tagged `pharm` in its disposition-ledger
  entry, no local backing article, so this lane's own article 2 picked up
  a short "Related structures" mention + `associated_with` annotation for
  it rather than leaving library_ids empty); lane 1's own AUN-INI-105
  mints -- `CON-INF-52E3C48A1A2AAA` (prokaryote architecture, x7),
  `CON-INF-E4E8831D2BE517` (flagellar arrangement, x1), `CON-INF-
  A1043E023CD6FB` (plasma membrane, x1); pending ASU-INF -- the 8 lane 1
  already overlaid (24 uses across Q52/53/56/58-61/63/67/69/75/76/81/84/
  87-91/97/100) plus 2 more found by this pass's own searches and newly
  overlaid: `CON-INF-7CCB09F434AF06` (Mycoplasma sterol),
  `CON-INF-271E9930B4B73A` (Mycoplasma vs. L-forms).

## Live / pending / new -- Q51-100 search method

Same method as the Q1-50 window: `find-existing.mjs` exact-substring
search, one term per call. New terms searched this pass: `flagella
antigen`, `H antigen`, `protoplast`, `spheroplast`, `mycoplasma`,
`lysozyme`, `Corynebacterium diphtheriae`, `inclusion granule`, `70S
ribosome`, `polysome`, `taxonomy`, `acellular`, `virus is not a true
cell`, `virus obligate intracellular`, `normal flora`, `commensal`. Three
of these (`mycoplasma`, `70S ribosome`, `normal flora`/`commensal`) turned
up existing pending ASU-INF records that were reused instead of minting;
one (`inclusion granule`) turned up an existing **live** record.

## Needs Omar / open items

- Q3 and Q5's transposed-looking keys are worth checking against a second
  copy of this same bank or an official answer sheet, if Omar has one --
  they read as a genuine source-side slip, not an extraction artefact.
- `CON-INF-398B4BA280679E` (live, reused for Q66) carries `subjectId:
  pharm` in `docs/medical-library-program/evidence/SYS-INF-disposition-
  ledger.json` despite being a microbiology/inclusion-granule fact and
  having no locally-tracked backing article -- worth a look by whoever owns
  that concept's canonical placement.
- Chapters 2-11 (725 more items, all confirmed 100%-keyable by the same
  plain-text-table mechanism) are triaged only at the structural level so
  far -- per-question stems, keys and concept searches queued for a later
  lane. Chapter 1 itself still has Q101-Q161 outstanding.
- `Week 6 INI Quizzes.pdf`, `Formative 7 INI answered .pdf` (both fully
  garbled) and `INI All GDs - solved.pdf` (40 garbled pages) remain out of
  scope per the dispatch -- left for a later lane with OCR budget.
- The True/False block inside **chapter 5** (Q75-84 of chapter 5, 10 items
  -- not to be confused with chapter 1's own Q75-84, both authored this
  pass) is a different question shape (2-valued, no lettered options) --
  not authored this pass; a later lane should confirm whether the standard
  MCQ seed schema is the right vehicle for it or whether it needs its own
  handling.

## Chapter 6 "General virology" (author6, pp.63-77, 102 items, answer table p.77)

Read via `pagetext.mjs show`, pages 63-71 (≤3 pages/call), keyed against the
plain-text ANSWERS table on p.77 (already located by lane 1's cross-chapter
grep sweep). Authored **Q1-58 of 102** in order -- a self-contained "virus
structure, classification and genetics" run that ends cleanly at Q58's
exaltation item (the last of a Q51-58 cluster on capsomeres/reassortment/
phenotypic masking/complementation/mutant types/exaltation); Q59 pivots into
retrovirus-replication-cycle specifics (penetration, uncoating, viral-DNA
replication site, antibody-mediated neutralization mechanisms) and antiviral
immunity, a clearly different sub-topic -- the natural hand-off point.
**Next lane (author7) resumes at Q59** ("Regarding the replication cycle of
retrovirus, which sentence is wrong?", p.71); Q60-102 (44 items) remain
untriaged at per-question level, though the chapter's 100%-keyable-by-
printed-table status is confirmed for the whole chapter (this lane read the
full p.77 table, all 102 slots filled except 103-110, which do not exist --
the table itself confirms exactly 102 items).

**Checkpoint table:**

| Module | Questions read | Keys recovered | Authored | Held | Concepts -- live | pending | new |
|---|--:|--:|--:|--:|--:|--:|--:|
| AUN-INI-105 (ch6, Q1-58) | 58 | 58 (100%) | 55 | 3 | 4 (2 concepts x 2 uses each) | 9 (6 concepts) | 42 (24 concepts) |

- **Held (3):** Q32 and Q38 each print only 2 options (schema's 4-option
  floor), Q52 is a near-verbatim duplicate of Q34 (capsomeres = individual
  capsid units, same four distractor concepts reordered).
- **No printed-key vs. expected-answer conflicts** found in Q1-58 -- every
  key checked out against the obvious textbook fact.
- **Two items straying off-topic within the chapter's own page range:** Q6
  (fungal cell membrane = ergosterol) and Q7 (opportunistic fungal infection
  risk factors) are Mycology-topic questions the source bank itself places
  inside the "General virology" chapter's pages -- authored here per the
  bank's own printed structure rather than held for topical purity.
- **Two source typos carried through unaltered:** Q22 option D prints "Pix
  virus" (read as Poxvirus); Q47 option B prints "Mobillivirus" (read as
  Morbillivirus) -- both noted in `author_notes`.
- **Live/pending reuse:** two ASU-INF concepts already live (capsomer
  `CON-INF-80960EC6FD48EC`, virion `CON-INF-BBB25C0749A8D4`) reused directly,
  no overlay needed; six pending concepts reused via sparse overlay -- five
  from `ASU-INF-microbiology-concepts.md`'s "Viral structure: capsid,
  envelope and viroids" and "Viral infection patterns" articles (capsid
  universal component, viroid, envelope origin/composition x3, latent
  infection, systemic/viraemia), one from Ain-Shams's own `ASU-IMM-
  immunology-concepts.md` (type I interferon, cross-subject reuse for Q9's
  "first line of defense" fact).
- **24 new AUN-INI-105 concepts minted** (`concept/AUN-INI-105-ch6-
  concepts.md`), each cleared by `find-existing.mjs` first (search terms:
  antigenic drift, capsomer, prion, bacteriophage, reverse transcriptase,
  plaque assay, complementation, exaltation, phenotypic masking,
  conditional-lethal/plaque-size/host-range mutant, interferon, viremia,
  defective virus, genetic reassortment, naked virus, poxvirus, herpesvirus,
  parvovirus, Retroviridae, budding, virion, obligate intracellular
  parasite, ergosterol, opportunistic fungal infection, hemagglutination,
  host tRNA ribosomes, segmented genome, helper virus, pseudovirion, lytic
  phage, capsid symmetry, envelope glycoprotein serotype -- one term per
  call). Backed by a five-item article (`article/AUN-INI-105-ch6-
  article.md`), split by theme (classification basics; capsid/envelope/
  general properties; replication cycle; prions/fungi/HIV; genetics and
  interactions) since one flat article would have been unwieldy at this
  concept count.

## Lane 7 -- Chapters 7-9 (General Mycology, Introduction to parasitology,
## start of Trematodes)

Lane 7's cluster: Chapter 7 "General Mycology" (pp.78-82, 33 items, answer
table p82 headed "ANSWES" -- a typo) + Chapter 8 "Introduction to
parasitology" (pp.84-85, 16 items, answer table p86; a parasitology-only
contents page sits on p83) + the start of Chapter 9 "Trematodes" (pp.87-100,
98 items, answer table wraps pp.99-100) until ~55 authored total.

| Module | Questions read | Keys recovered | Authored | Held | Concepts -- live | pending | new |
|---|--:|--:|--:|--:|--:|--:|--:|
| AUN-INI-105 (ch7, Q1-33, full chapter) | 33 | 33 (100%) | 26 | 7 | 1 | 8 | 25* |
| AUN-INI-105 (ch8, Q1-16, full chapter) | 16 | 16 (100%) | 16 | 0 | 0 | 7 | 9* |
| AUN-INI-105 (ch9, Q1-21 of 98) | 21 | 21 (100%) | 16 | 5 | 0 | 4 | 12* |

\* "new" here means newly minted **for this lane's own AUN-INI-105 concept
files** (concept/AUN-INI-105-ch7/8/9-concepts.md); several ch9 questions
reuse ch8's own new mints (a same-lane cross-chapter reuse, not a fresh
mint), and "pending" counts every reuse of an already-existing
Ain-Shams/MUST/AUN-lane-1 pending concept, including two ch9 items that
reuse a concept already overlaid earlier in this same lane (chapters 1 and
8), needing no second overlay row.

- **Chapter 7 holds (7 of 33):** Q3 and Q21 are source-side duplicate-option
  defects (two options print identical text, e.g. both "Budding" or both
  "Both benefit") -- held rather than presented to students with a
  duplicate distractor. Q13 and Q14 are printed-key-vs-textbook conflicts
  (Q13: "the MEASURED ability to cause disease" keyed Pathogenicity where
  the textbook term is Virulence; Q14: the printed EXCEPT key names a
  statement that is actually true, missing the real false statement,
  "fungal walls are peptidoglycan"). Q22, Q26, Q31 are near/exact
  duplicates of earlier chapter-7 items (aflatoxin, tinea versicolor,
  yeast budding respectively). Q27 prints a blank option D, leaving only 3
  usable options.
- **Chapter 8:** all 16 items check out against the printed key with no
  conflicts and no duplicates -- a clean, fully-authored chapter.
- **Chapter 9 holds (5 of 21 read):** four are printed-key-vs-textbook
  conflicts, all involving Fasciolopsis buski or the schistosomulum: Q9
  (largest human trematode is Fasciolopsis buski, not Fasciola hepatica,
  the printed key); Q15 (Fasciolopsis buski lives in the intestines, not
  the bile ducts, the printed key); Q17 (Fasciolopsis buski's snail host is
  Segmentina, not Lymnaea -- Lymnaea is Fasciola's own snail host, the
  printed key); Q19 (the schistosomulum matures to adult in the portal
  circulation/liver per standard teaching, not "systemic circulation," the
  printed key). Q21 is a duplicate-option defect (A and B both print "Both
  benefit").
- **Rich reuse families found this pass:** a dedicated "Fungal morphology
  and cell wall" / "Fungal diagnosis and antifungal mechanisms" concept
  cluster inside the pending Ain-Shams `ASU-INF-microbiology-concepts.md`
  covers chitin, glucan/mannan, filamentous-mold morphology, dimorphism and
  hyphae/mycelium -- reused for 6 of chapter 7's questions via a sparse
  `+aun` overlay. A pending MUST `FHB-102-2-parasitology-introduction-
  concepts.md` batch covers facultative/obligatory/opportunistic parasite
  and vector definitions almost verbatim to chapter 8's own items -- reused
  for 7 of chapter 8's questions and, again, for 4 of chapter 9's, via the
  same overlay mechanism (two of the four ch9 reuses needed no *new*
  overlay row at all, since chapters 1 and 8 had already overlaid the same
  concept ids earlier in this lane's own sequence). Helwan's `HU-GIT-301`
  parasitology batch and Mansoura's `MANS-HIS-203` were searched but turned
  up only species-specific facts (e.g. "sheep is Echinococcus's
  intermediate host") at a different grain from this pass's own
  general-definition and Fasciolopsis/Heterophyes-specific questions --
  not reused, cross-referenced in field_notes instead.
- **Known tool gap found this pass:** `gate.mjs simulate` reported
  `errors=0` on two pending-live overlay batches (chapter 7's and chapter
  8's ASU-INF/MUST question files) that `validate-content-batch.mjs` then
  caught as genuinely broken -- three questions with no `library_ids` at
  all, so their main concept was "not covered by any article." All fixed
  before landing; per the lane card's known-bug warning, always run the
  direct validator, not just `gate.mjs`, on a lone pending-live batch.
- **Stop point:** chapter 9 Q1-21 read, keyed and (16 of 21) authored; Q22
  of 98 is the exact resume point for a later lane. Chapters 10 ("Cestode,"
  86 items) and 11 ("Nematoda," 164 items) are entirely unread beyond the
  structural chapter map already recorded above (page ranges, item counts,
  answer-table locations) by lane 1's original full-source-map pass.


## Lane 9 -- Chapter 10 (Cestode)

Lane 9's cluster: Chapter 10 "Cestode" (pp.101-111, 86 items, answer table
p111). This chapter was previously mapped only at the structural level
(page range, item count, answer-table location -- lane 1's original
full-source-map pass); this lane triaged it at per-question level for the
first time and authored the first 55 keyed items in order.

| Module | Questions read | Keys recovered | Authored | Held | Concepts -- live | pending | new |
|---|--:|--:|--:|--:|--:|--:|--:|
| AUN-INI-105 (ch10, Q1-55 of 86) | 55 | 55 (100%) | 51 | 4 | 0 | 17 | 34 |

- **Questions read (55):** Q1-Q55 of chapter 10 (stems/options via
  `pagetext.mjs show`, pages 101-107), keyed against the chapter's own
  plain-text ANSWERS table (p111).
- **Printed-key vs. expected-answer conflicts (2 of 55):**
  - **Q2** ("The following cestode larvae not present in man?", options
    Cysticercus bovis/Cysticercus cellulosae/Hydatid/Coenurus cerebralis)
    is keyed **D "Coenurus cerebralis"** -- standard teaching is that man
    is never Taenia saginata's intermediate host (its larva, cysticercus
    bovis, develops only in cattle), while cysticercus cellulosae, hydatid
    and coenurus cerebralis can all occur in man as an accidental
    intermediate host, so the expected answer is **A "Cysticercus
    bovis,"** not the printed D. **Held.**
  - **Q23** ("Cyclops is the ONLY larval host for?", options
    Diphyllobothrium latum/Diphyllobothrium mansoni/Dracunculus
    medinensis/All of the above) is keyed **A "Diphyllobothrium latum"**
    -- but D. latum needs Cyclops **and** a second, fish, intermediate
    host to become infective, so Cyclops is not its only larval host,
    whereas Dracunculus medinensis (option C) genuinely needs no second
    intermediate host, making C the better fit for "only." **Held** as a
    doubt, not resolved by inference, since the source's own intent for
    this "only" wording is not certain.
- **Duplicates (2 of 55, both HELD as `duplicate-of`):** Q28 near-restates
  Q11 ("Cysticercus cellulosae is the infective stage of T. solium," same
  key A, differing only in the fourth distractor option); Q29
  near-restates Q9 ("Cysticercus bovis is the infective stage of T.
  saginata," same correct content, differing only in option
  lettering/order and the fourth distractor).
- **Schema-shape holds:** none in this window -- every candidate question
  in Q1-55 prints 4-5 options.
- **A same-stem, conflicting-key repeat found while duplicate-checking
  ahead:** Q10 ("Cysticercoid larva is the infective stage of?", key C
  "Dipylidium caninum," textbook-correct) reappears later in the chapter's
  own numbering (its Q65) with identical wording/options but a printed key
  of D "None of the above" -- a genuine source-side key inconsistency
  between two copies of the same question, not an OCR artefact. Q10 is
  authored here with its correct key (C); flagged in `author_notes` for
  whichever later lane reaches Q65, since the two occurrences should not
  both be authored with their own literal printed keys.
- **A near-verbatim recycling pattern confirmed while reading ahead:**
  Q60-77 of this chapter restate Q5-Q22 almost word for word (e.g. Q60 =
  Q5 "Taenia saginata?", Q73 = Q22 "All the intestinal cestodes of man
  inhabit?"), the same self-recycling pattern lane 1 flagged for chapter
  1. A later lane picking up at Q56 should expect a high duplicate rate
  through roughly Q77, several with conflicting keys against their first
  occurrence in the same way Q65 conflicts with Q10.
- **Rich reuse family found this pass:** Helwan's own unimported
  `HU-GIT-301-parasitology-concepts.md` batch (landed today per the
  dispatch, subject `gi`, still pending import) covers Taenia
  saginata/solium host-specificity and autoinfection, Hymenolepis
  nana/diminuta direct-life-cycle and childhood-prevalence facts,
  Diphyllobothrium latum's operculated egg and plerocercoid-in-fish
  facts, and Echinococcus granulosus's sheep-intermediate-host fact --
  reused for 17 of this window's 51 authored questions via a sparse
  `+aun`/`+1`/`+AUN-INI-105` overlay
  (`pending-live/AUN-INI-105-ch10-helwangit-overlay-concepts.md`), the
  same cross-subject (`gi` reused into this module's own `inf`) pattern
  this module's own chapter 6 lane used for an Ain-Shams `ASU-IMM`
  concept. Mansoura's `MANS-HIS-203` and 6 October's `IMP-106` were
  searched (`Taenia solium`, `Echinococcus granulosus`, `Dracunculus
  medinensis`) but turned up no exact matches for this window's facts.
- **9 new AUN-INI-105 concepts minted, covering 34 of this window's
  question-uses** (`concept/AUN-INI-105-ch10-concepts.md`), each
  cleared by `find-existing.mjs` first (search terms: cysticercus bovis,
  coenurus, hydatid, cysticercus cellulosae, Taenia saginata, Taenia
  solium, Echinococcus granulosus, Hymenolepis nana, Hymenolepis
  diminuta, Diphyllobothrium latum, Dipylidium caninum, sparganosis,
  scolex, cysticercoid, plerocercoid, coracidium, gravid proglottid,
  Cyclops, blind intermediate host, Dracunculus medinensis -- one term
  per call). Backed by a three-item article
  (`article/AUN-INI-105-ch10-article.md`), split by theme (general
  cestode body plan + the two Taenia species; Diphyllobothrium latum's
  two-host life cycle + Dipylidium caninum + sparganosis; Echinococcus
  granulosus + cross-species intermediate-host counting), each with a
  "Related concepts (reused)" section mentioning the overlaid Helwan
  facts so every reusing question's `library_ids` still resolves to a
  local article, per this module's own established precedent (ch2/ch6
  lanes' identical treatment of reused live concepts).
- **Stop point:** chapter 10 Q1-55 read, keyed and (51 of 55) authored;
  Q56 of 86 is the exact resume point for a later lane, with 31 items
  remaining in this chapter (expect the Q56-77 duplicate cluster
  described above) plus chapter 11 ("Nematoda," 164 items) entirely
  unread beyond the structural chapter map already recorded above.
### Chapter 6 closed -- lane 8 authored Q59-102 (44 items, pp.71-77)

Read via `pagetext.mjs show`, pages 71-77 (four calls, each ≤3 pages),
resuming exactly at lane 6's stated hand-off point (Q59, "Regarding the
replication cycle of retrovirus...", p.71) and keying every item against the
same plain-text ANSWERS table on p.77 lane 6 had already located and read in
full. **39 of 44 authored, 5 held.**

- **Held (5):** Q74, Q75 and Q78 are near-verbatim duplicates of Q1, Q2 and
  Q5 respectively (identical stems and options -- the chapter recycling its
  own earlier questions, exactly the pattern lane 6's triage flagged in
  advance from the Q51-100 window of chapter 1). Q97 is a near-verbatim
  duplicate of Q48 (same "structural component found in all viruses" stem
  and options, one word added). Q86 ("Interference can be happened during
  the usage of?", printed key D "Vaccines containing viral subunits") is
  held on a printed-key conflict: classical viral interference requires a
  live, replicating virus competing for the same host cell, which a
  non-replicating subunit vaccine cannot provide -- compounded by a
  source-side data-quality issue, since the printed options B and C both
  read "Recombinant vaccines" verbatim (a duplicate/typo in the option
  list itself).
- **No other printed-key vs. expected-answer conflicts** found in this
  window -- all other 39 authored keys check out against the obvious
  textbook fact.
- **Two within-window near-duplicates authored, not held:** Q60 and Q65 both
  test "enveloped virus penetration = fusion" with different stems/option
  sets (same-fact-different-phrasing, the pattern lane 1's triage already
  established as authored-not-held, e.g. Q44/Q49 on endotoxin-LPS) -- both
  authored, sharing one concept. Likewise Q68/Q72/Q73 (persistent infection
  classification and mechanisms), Q82/Q96 (negative-sense RNA needs
  RNA-dependent RNA polymerase to make +sense RNA) and Q83/Q89 (interferon's
  translation-inhibiting mechanism) and Q98/Q100 (protein as the one
  universal viral chemical component) are each same-fact pairs authored
  together under one shared concept, not held.
- **20 new AUN-INI-105 concepts minted** (appended to `concept/AUN-INI-105-
  ch6-concepts.md`), each cleared by `find-existing.mjs` first (search
  terms: penetration enveloped virus fusion, retrovirus reverse
  transcription cytoplasm, positive sense RNA translated directly mRNA,
  antibody neutralization opsonization ADCC, lytic infection host cell
  death, persistent viral infection mechanisms, interferon host species
  specific, negative sense RNA virus RNA dependent RNA polymerase,
  interferon inhibits viral mRNA translation, mRNA synthesis common
  phenomenon viral infections, eclipse period, ultraviolet radiation
  virion, interferon production tissue culture induced viruses, cell
  mediated immunity viral infection, virus different from bacteria binary
  fission size obligate, viral adsorption passive receptor ATP, protein
  chemical component found in all viruses, virus contain enzymes
  replication packaged virion, transcription formation mRNA translation
  formation protein, assembly of RNA viruses occurs in cytoplasm). Backed
  by two new article records appended to `article/AUN-INI-105-ch6-
  article.md` (article 6, infection outcomes and antiviral immunity;
  article 7, replication cycle mechanics and general viral properties),
  each with `annotations` whose `Quote:` text is verified (by script) as a
  verbatim substring of its article's own body section.
- **4 reused directly from lane 6's own AUN-INI-105 mints** (own-tree
  reuse, no overlay needed): DNA/RNA replication site
  (`CON-INF-2E497D2AC72D73`, Q61), reverse transcriptase/HIV
  (`CON-INF-95D8FD3C7D470C`, Q64), defective virus/complementation
  (`CON-INF-10B88E390F1161`, Q99), obligate intracellular parasite
  (`CON-INF-99427A317A9586`, Q101).
- **1 reused directly, live, no overlay** (Q80: virion, `CON-INF-
  BBB25C0749A8D4`).
- **7 reused via pending-live** (`pending-live/AUN-INI-105-ch6b-asuinf-
  questions.md`, apply-after chain in its own header): 4 already-overlaid
  ASU-INF concepts from lane 6's own `pending-live/AUN-INI-105-ch6-asuinf-
  overlay-concepts.md` (latent infection Q70, viroid Q81, envelope
  lipoprotein Q87, capsid universal component Q92 -- no new overlay row
  needed); 3 newly overlaid this pass, appended to that same overlay file:
  cell tropism (`CON-INF-CE64E7CD7B4393`, Q71, from ASU-INF's own "Viral
  oncogenesis, tropism and retroviral integration" article, already in
  `docs/import-ready`), Negri bodies/rabies (`CON-INF-8989679385BD3C`, Q90,
  same ASU-INF batch), and opportunistic pathogen definition (`CON-INF-
  17893AA3303251`, Q76, from Menoufia MUST's own `FHB-102-2-microbiology-
  introduction-concepts.md`, not yet promoted to `docs/import-ready` -- this
  one row's apply-after chain therefore also names that MUST batch).
- **Gates:** `gate.mjs batch` on the own-concept question file (32 items,
  `--with` the extended concept + article + evidence-resource files) --
  `errors=0`. `gate.mjs simulate` on the full six-file pending apply chain
  (ASU-INF concepts, ASU-INF articles, MUST FHB-102-2 concepts, MUST
  FHB-102-2 articles, the (updated) AUN overlay file, the 7-item pending
  question file) -- `errors=0`, `rejected=0`.
- Chapter 6 ("General virology," 102 items) is now **fully triaged and
  authored end to end**: 94 authored, 8 held, 0 remaining.

## Lane 11 -- Chapter 9 "Trematodes" Q22-98 (closing the chapter)

Lane 11's cluster: the remainder of chapter 9 (pp.89-100), Q22 through Q98
(77 items), the exact resume point lane 7 recorded above. All 77 are read
and keyed -- the plain-text ANSWERS table (pp.99-100) was cross-checked
position-by-position two ways (`pagetext.mjs show` display and a direct
`pdftotext -layout` extraction parsed programmatically into a number->letter
map), both agreeing on all 98 keys.

| Module | Questions read | Keys recovered | Authored | Held | Concepts -- new |
|---|--:|--:|--:|--:|--:|
| AUN-INI-105 (ch9, Q22-98 of 98) | 77 | 77 (100%) | 33 | 44 | 27 |

- **32 authored on newly minted concepts** (appended to this lane's own
  `concept/AUN-INI-105-ch9-concepts.md` and `article/AUN-INI-105-ch9-
  article.md`, four new sections plus 27 new `definition_of` annotations,
  each verified by script as a verbatim substring of its section body) --
  `question/AUN-INI-105-ch9b-mcq.md`. **1 more authored via pending-live**
  (Q51, reusing the pending MUST opportunistic-parasite concept
  `CON-INF-C79E84EB999C31`, already overlaid for this lane by chapter 8 --
  no new overlay row needed) -- `pending-live/AUN-INI-105-ch9b-must-
  questions.md`.
- **44 held.** The source bank recycles a small set of core facts (snail
  hosts, habitats, transmission routes, the pathology-agent fact,
  hermaphroditism) across many pages, several verbatim -- Q78-98 in
  particular largely re-runs the Q27-Q40 pattern almost item-for-item. 24
  are near/exact duplicates of facts already authored either earlier in
  this same pass or by lane 7's Q1-21 (e.g. Q22 restates Q1's mutualism/
  symbiosis fact; Q31/Q63/Q82 each restate Q14's "eggs drive schistosomiasis
  pathology" fact a second, third and fourth time). 4 are printed-key-vs-
  textbook conflicts, each corroborated by this bank's *own* internal
  consistency rather than external teaching alone: Q39's transmission key
  contradicts the near-identical Q38, keyed correctly by the same source;
  Q41's Fasciola-cercaria-type key (furcocercous) contradicts this bank's
  own Q48 (leptocercous = simple tail) and Q73 (furcocercous = Schistosoma
  specifically), further corroborated by a pending Helwan concept stating
  Lymnaeid/planorbid snails (Fasciola's family) shed leptocercous cercariae;
  Q94/Q95's snail-host keys for S. mansoni/S. haematobium each contradict
  this very pass's own correctly-keyed Q32/Q33 -- likely one answer-table
  row misaligned by one position. 6 are short of the seed schema's 4-option
  floor (Q42, Q43, Q44, Q57, Q58, Q59, Q76 all print only 3 options). 2 have
  source-side option-text defects: Q70 splits the species name "Schistosoma
  mansoni" across separate A/B options, leaving no valid 4-option set; Q79's
  stem is truncated ("...trematodes inhibit?" with no object).
- **New concepts this pass (27):** snail intermediate hosts by species
  (Biomphalaria/Bulinus/Lymnaea/Pirenella conica); habitat, transmission
  route and infective stage by species (Fasciola's bile ducts and
  plant-borne route; Heterophyes heterophyes's small intestine, smallest-
  trematode size and fish-eating reservoir hosts; Schistosoma's skin-
  penetration/furcocercous-cercaria route, portal-vein staging site, and
  each species' own oviposition site and egg spine location; the
  mature-vs-immature-egg pathology refinement); general morphology and
  classification (leaf-shaped body, suckers as attachment organs,
  Heterophyes heterophyes's extra genital sucker, Schistosoma's separate
  sexes, the mollusc-host rule for Trematoda); and host-count/cercaria
  vocabulary (heteroxenous, monoxenous, leptocercous, miracidium-infects-
  snail). All cleared by `find-existing.mjs` first; two searches
  ("pirenella", "leptocercous") turned up a directly relevant pending Helwan
  concept (`HU-GIT-301-parasitology-concepts.md`) confirming Fasciola's
  cercaria is leptocercous, not furcocercous -- used as corroborating
  evidence for holding Q41 rather than merged (a related but
  differently-framed record).
- **Gates:** `gate.mjs batch` on the own-concept question file (32 items,
  `--with` the extended concept + article + evidence-resource files) --
  `errors=0`. `gate.mjs batch` on the 1-item pending-live file (`--with` the
  MUST FHB-102-2 concept + article + evidence-resource files) -- `errors=0`.
  `gate.mjs simulate` on each file's own positional apply chain --
  `errors=0`, `rejected=0` both times. `validate-content-batch.mjs` run
  directly on all four files (question, pending-live, concept, article),
  per the lane card's known-bug warning -- `errors: []` on all four.
- **Chapter 9 ("Trematodes," 98 items) is now fully triaged and authored
  end to end**, combining lane 7's Q1-21 and this pass's Q22-98: 49
  authored, 49 held, 0 remaining.

## Lane 12 -- Chapter 10 Q56-86 (closing the chapter)

Dispatch: chapter 10 Q56-86 (31 items, pp.107-111) plus chapter 11 Q56-110.
Read via `pagetext.mjs show`, pages 107-111 (three calls), keyed against the
same chapter 10 plain-text ANSWERS table (p111) lane 9 already transcribed.

| Module | Questions read | Keys recovered | Authored | Held | Concepts |
|---|--:|--:|--:|--:|--:|
| AUN-INI-105 (ch10, Q56-86 of 86) | 31 | 31 (100%) | 5 | 26 | 0 new -- all 5 reuse lane 9's own ch10 concepts |

- **Confirms lane 9's Q56-77 recycling prediction exactly**: 18 of these 31
  items are literal or near-literal restatements of Q5-Q22 (Q56=Q52, Q60=Q5,
  Q61=Q6, Q62=Q7, Q63=Q8, Q64=Q9, Q66=Q11, Q67=Q12, Q68=Q13, Q69=Q14,
  Q70=Q15, Q71=Q16, Q72=Q17, Q73=Q22, Q75=Q55, Q86=Q53), plus one already
  flagged by lane 9 in advance (Q65 vs Q10). **Three of these repeats print
  a conflicting key against the first occurrence's own printed (and
  authored) key**, not just a reordered option set: Q65 (D vs Q10's C,
  exactly as lane 9 predicted), Q67 (A vs Q12's D), and Q57 (A vs Q49's B --
  a second, non-adjacent recurrence lane 9 had not flagged, found by
  comparing this window's Q57 against Q49's own already-authored
  explanation). All three held as `duplicate-of <key>` with the key
  conflict written into the hold reason, per the dispatch's instruction.
- **5 authored, all new stems not present in Q1-55**: Q58 (platyhelminths
  needing one intermediate host EXCEPT D. latum, the mirror of Q1's
  two-host-EXCEPT question), Q74 (cestodes not transmitted by insects
  EXCEPT D. latum -- fish route, no arthropod), Q77 (suckers as organs of
  fixation, trematodes and some cestodes), Q78 (cysticercosis routes EXCEPT
  eating pork with cysticercus cellulosae, which causes taeniasis not
  cysticercosis), Q84 (cestodes characterised by hermaphroditism). Every
  one reuses an existing lane-9 concept (`CON-INF-75A2A7934657F3`,
  `CON-INF-BAF8F514F8DF0E`, `CON-INF-FAFE8DFDDE6E1D` x2, `CON-INF-90E657F6924BD0`)
  -- no new concept or article file needed this pass.
- **3 more genuine printed-key/expected-fact conflicts found this window**
  (beyond the duplicate-with-conflicting-key trio above): Q59 ("salt water
  fish" as D. latum's 2nd IH) directly contradicts this module's own
  already-authored Q19 fact (fresh-water fish); Q76 keys Trichinella
  spiralis, a textbook meat-borne nematode, as the EXCEPT to "eating
  contaminated meat," when H. nana is the genuine non-meat exception; Q82
  keys "Muscles" for cysticercosis's "MOST IMPORTANT" site, when standard
  teaching reserves that specific phrasing for the CNS (muscle is the most
  *common* site instead). All three held with the doubt written out.
- **3 schema-floor holds**: Q79, Q80 and Q81 each print only 3 options
  (Procercoid/Plerocercoid/Mature egg; T. solium/D.latum/H.diminuta;
  Dog flea/Rat flea/Soft tick) -- their printed keys are each otherwise
  textbook-consistent (plerocercoid is D. latum's infective stage; D.
  latum's uterine pore means no true gravid segment; H. diminuta's source
  is the rat flea, the same arthropod-intermediate-host pattern as
  Dipylidium caninum's dog/cat flea), so the fact is recorded in the hold
  reason even though not authored. Q83 and Q85 add two more 3-option holds
  (Q83 also a near-duplicate of the pending Helwan Q37 fact).
- **Gates:** `emit-mcq.mjs` then `validate-content-batch.mjs` run directly
  on `question/AUN-INI-105-ch10b-mcq.md` with `--with` the ch10 concept +
  article + evidence-resource files -- `errors: []`. `gate.mjs simulate` on
  the positional chain (ch10 concepts, ch10 article, ch10b questions) --
  `errors=0`, `rejected=0`.
- **Chapter 10 ("Cestode," 86 items) is now fully triaged and authored end
  to end**, combining lane 9's Q1-55 and this pass's Q56-86: 56 authored,
  30 held, 0 remaining.
- **Chapter 11 wall -- dispatch's second half (Q56-110) could not be
  worked**: by the time this pass reached chapter 11, `AUN-INI-105-LEDGER.md`
  on `origin/main` already showed `ini-mcq-ch11 | 83 | 27 | 0 | 110`
  (`remaining=0`) and a separate lane-13 commit had closed Q111-164 --
  chapter 11 is fully triaged/authored/held end to end (Q1-164) by other
  concurrent lanes, landed after this pass had already begun authoring the
  same Q56-110 window (7 new AUN concepts + 3-article file + 19-question
  Helwan-part2 overlay + 26-question own-concept batch, all gate-clean
  against a now-superseded target). That work is **not landed** -- it would
  duplicate/conflict with the already-live chapter 11 content, so it was
  discarded rather than committed. Flagging for chief-of-staff: a
  concurrent-lane collision on chapter 11's Q56-110 window cost this pass
  a full authoring cycle before the shared ledger state was re-checked;
  worth confirming the dispatch board reflects chapter 11 as closed so no
  further lane repeats this.

## Lane 14 -- Chapter 1 Q101-Q161 (closing the chapter)

Lane 14's cluster: the remainder of chapter 1 (pp.18-26), Q101 through Q161
(61 items), the exact resume point lane 2 recorded above. All 61 are read
and keyed -- the plain-text ANSWERS table (pp.26-27) was cross-checked two
ways (`pagetext.mjs show` display and a direct `pdftotext -layout`
extraction), both agreeing on all 61 keys, including Q133's printed double
answer "D,E".

| Module | Questions read | Keys recovered | Authored | Held | Concepts -- mints | reuses |
|---|--:|--:|--:|--:|--:|--:|
| AUN-INI-105 (ch1, Q101-161 of 161) | 61 | 61 (100%) | 47 | 14 | 6 | 41 |

- **47 authored**, split 26 own-direct (question/AUN-INI-105-ch1b-mcq.md,
  reusing already-live/own-lane concepts or this pass's own 6 new mints) and
  21 pending-live (19 reusing Ain-Shams ASU-INF concepts, one more newly
  overlaid this pass -- CON-INF-BF26D7E563FB78, outer-membrane porins -- plus
  2 reusing a newly-overlaid Menoufia MUST saprophyte concept).
- **14 held**: 5 on the seed schema's 4-option floor (Q105, Q107, Q124,
  Q140, Q143, each printing only 2-3 options), 1 on the printed double
  answer (Q133), and 8 as near-duplicates of already-authored INI-105
  items -- Q110/Q111 restate Q11/Q45 (peritrichous/amphitrichous), Q129
  restates Q62's own "role in cell division EXCEPT" template with a
  swapped option set, Q131 restates Q63 ("structure responsible for
  staining") at a finer peptidoglycan-vs-cell-wall grain, Q149 restates
  this same pass's own Q120 (near-identical anti-phagocytic-structure
  option set), and Q152/Q154/Q155 restate Q36/Q17/Q18 -- the last three
  flagged in advance by lane 1's own triage note (above) as later
  recurrences within this chapter.
- **No printed-key vs. expected-answer conflicts requiring a hold** were
  found in this window under the dispatch's tightened standing rule (hold
  only on the bank's own internal inconsistency, not a bare textbook
  conflict) -- one doubtful case, Q160 ("Majority of bacteria are?",
  printed key D "Parasites" against the more standard teaching that
  saprophytes are the majority), was authored with the key as printed and
  the doubt recorded in `author_notes` as a `held-printed-key-conflict`
  candidate for Omar, since no other item in the source states the
  opposite outright.
- **6 new AUN-INI-105 concepts minted** (`concept/AUN-INI-105-ch1b-concepts.md`,
  backed by a new small `article/AUN-INI-105-ch1b-article.md` since none of
  this lane's existing articles fit their themes): antibiotic-inactivating-
  enzyme excretion site, bacterial chromosome function, restriction
  endonucleases not required for chromosomal replication, vibrio (curved-
  rod) morphology, Corynebacterium diphtheriae as diphtheria's cause, and
  spirochete/Treponema pallidum morphology. Each cleared by
  `find-existing.mjs` first (search terms: opportunistic pathogen, volutin,
  metachromatic granule, porin, virulence factor, beta-lactamase, vibrio,
  bacterial chromosome function, restriction endonuclease, diphtheria,
  corynebacterium diphtheriae, saprophyte, spirochete, treponema pallidum,
  crystal violet, 70S ribosome).
- **41 reused**: 26 own-tree (this lane's own chapter 1/5 mints and live
  concepts, e.g. `CON-INF-8B02B0EFEE96F5` opportunistic pathogens from this
  lane's own chapter-5 mint, `CON-INF-52E3C48A1A2AAA` prokaryote
  architecture, `CON-DEV-FE47A8F9B0768E` plasmid, `CON-INF-3E6590C8AC2166`
  spores, `CON-INF-398B4BA280679E` inclusion granules/volutin,
  `CON-INF-A1043E023CD6FB` plasma membrane, `CON-INF-B775994AC7062B`
  virulence factors, `CON-INF-BD1B74226AE7B2` protoplast/spheroplast,
  `CON-INF-16E0B6ECB647D3` Gram stain); 15 pending-live (12 already-overlaid
  ASU-INF concepts from lanes 1/2, one newly overlaid this pass -- porins --
  plus a cross-chapter reuse of chapter 2's own overlaid autotroph/
  heterotroph concept, and one newly-overlaid Menoufia MUST saprophyte
  concept, `CON-INF-4D65B20EBBAE83`, reused for both Q159 and Q160).
- **Gates**: `validate-content-batch.mjs` run directly on all six touched
  files (`question/AUN-INI-105-ch1b-mcq.md`,
  `pending-live/AUN-INI-105-ch1b-asuinf-questions.md`,
  `pending-live/AUN-INI-105-ch1b-must-questions.md`,
  `concept/AUN-INI-105-ch1b-concepts.md`,
  `article/AUN-INI-105-ch1b-article.md`, plus the extended
  `pending-live/AUN-INI-105-ch1-asuinf-overlay-concepts.md`), each with its
  full `--with` sibling chain -- `errors: []` on every file.
  `gate.mjs batch` on all three question files -- `errors=0` each.
  `gate.mjs simulate` across the full 16-file apply chain (own concepts,
  own article, own question file, the ASU-INF concept+article batch, both
  AUN overlay files, the ASU-INF-reuse question file, the MUST concept+
  article batch, the new MUST overlay file, the MUST-reuse question file)
  -- `rejected=0 errors=0`; every authored question carries a non-empty
  `library_ids`.
- **Stop point**: chapter 1 ("Bacterial cell structure," 161 items) is now
  **fully read, keyed and authored end to end** across all four lanes that
  have touched it (lanes 1, 2 and 14; the chapter-2-onward structural map
  in lane 1's own pass) -- 136 authored, 25 held, 0 remaining.
