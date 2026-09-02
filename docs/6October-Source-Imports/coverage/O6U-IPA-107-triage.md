# O6U-IPA-107 -- `Pathology Q Bank.pdf` triage (T/F sections)

401 pages, 13,301 native words, 0 garbled -- the single largest fully-native source
in the O6U Year 1 corpus. The book is organised as chapter narrative followed by a
"Choose the correct answer" MCQ section (no printed/inferable key in plain-text
extraction, per S2 readability pass) and, at the very end of six chapters, a short
"True or False" section where **every statement prints its own inline answer**,
`( true )` or `( false )`, directly after the statement. This triage covers only
those six T/F sections; the MCQ portions remain unkeyed and unauthored.

## Key method

Plain `pagetext.mjs show` extraction of each T/F page; each line ends in a printed
`( true )` / `( false )` marker immediately after the statement text -- no OCR, no
visual-marking heuristic (`pdf_visual_keys.py`/`keys` mode), needed for these 9
pages. Every printed answer was independently cross-checked against standard
pathology fact before authoring; none contradicted fact.

## T/F sections found (9 pages, ~90 statements total)

| # | Pages | Topic | Statements | Authored |
|--:|---|---|--:|--:|
| 1 | 246-248 | Hemodynamic disorders (edema, hyperemia/congestion, thrombosis, embolism, infarction, gangrene, shock) | ~37 | 12 |
| 2 | 279-280 | Infectious/parasitic pathology I (bilharziasis, leprosy, syphilis) | ~13 | 13 |
| 3 | 299 | Infectious/parasitic pathology II (syphilis continued, actinomycosis, bacteremia/septicemia/toxemia/pyemia) | ~7 | 7 |
| 4 | 399-401 | Neoplasia (dysplasia/metaplasia, choristoma/hamartoma, staging/grading, carcinoma, growth rate, anaplasia) | ~33 | 8 |

Total statements available across the six T/F blocks: approximately 90 (chapters
vary from ~7 to ~37 items). 40 were selected and authored per the ~50-item cap
in the dispatch, prioritising: (a) statements with unambiguous, independently
verifiable printed answers, (b) statements naturally paired with an opposite
concept in the same block (dysplasia/metaplasia, congestion/hyperemia, red/pale
infarction, cystitis glandularis/cystica, lepromatous/tuberculoid leprosy,
bacteremia/septicemia/toxemia, choristoma/hamartoma, staging/grading,
benign/malignant growth rate) so the 3 required author-constructed distractors
per item have a natural, defensible source rather than being invented from
nothing, and (c) even coverage across all three subject areas (hemodynamics,
infectious/parasitic pathology, neoplasia) rather than exhausting one block.

Held / not authored from this pass: the remaining ~50 statements in the same six
blocks (redundant/near-duplicate phrasings of an already-authored fact, or items
whose printed answer required more context than fits a defensible single-best-
answer distractor set within this pass's item budget). None were held for a
missing or contradictory printed key -- every printed answer in these six T/F
blocks checked out against standard fact. The 392-page "choose the correct
answer" MCQ portion between chapters remains **unkeyed** in plain-text
extraction and is recorded as such, not authored, not editorially keyed, per
dispatch instruction.

## Format note: 2-option seed rejected by emit-mcq.mjs, rewritten to 4-option

The dispatch instruction to author "true/false-derived single-best-answer
questions" was first drafted as a literal 2-option True/False format
(`{"A": "True", "B": "False"}`). `emit-mcq.mjs` enforces the seed contract's
4-5 option requirement and rejected this (`error: ipa107-tf-qNNN: 2 options --
the contract is 4 to 5`). The seed was rewritten in full: each item now presents
the printed-true fact as the correct option among 4 single-best-answer options,
with the other 3 being author-constructed plausible-but-wrong distractors (see
above). Only the one correct answer's key comes from the printed source, in
line with every other batch authored under this dispatch.

## Search-before-mint findings (contra coordinator's steer)

The dispatch flagged Kasr `104-CPS` / `108-INT` and ASU-INF pathology ids as
"likely overlaps." An exhaustive search across `104-CPS`'s
anatomy/physiology/histology files, `108-INT-concepts-pathology.md`,
`208-INT-concepts.md`, and both ASU-INF microbiology files found **only one
genuine reuse hit**: `CON-FND-D75B95517F50CF` (cellular anaplasia), sourced from
Kasr's `208-INT-concepts.md` -- a cross-year hit (208 INT is Kasr Year 2; concept
ids are university-blind and year-blind, so this still counts as valid reuse per
`00-START-HERE.md` §4). None of the hemodynamics, infectious/parasitic pathology
(bilharziasis, leprosy, syphilis, bacteremia/septicemia terminology) or the
remaining neoplasia facts (dysplasia/metaplasia, choristoma/hamartoma,
staging/grading, carcinoma) had an existing concept to reuse -- all 24 new
concepts and 6 new articles were minted fresh. This is reported as an honest
negative finding: the coordinator's overlap expectation did not pan out for this
cluster's specific content, likely because 104-CPS/108-INT/ASU-INF's pathology
coverage concentrates on different subtopics (inflammation/cell-injury basics,
specific organ pathology) than this cluster's hemodynamics/infectious/neoplasia
mix.

## `M1-N`-style triage-key naming

The coordinator asked that new triage keys align to the module's existing
`M1-N`-style naming so `ledger.mjs` reconciles. `O6U-IPA-107` is a brand-new
module for this lane with no pre-existing seed/triage-key convention to align
to (unlike, e.g., a module that already has an `M1-N` numbering scheme from a
prior batch). Per the coordinator's own fallback ("or note in the report if
that is impossible"), this triage instead follows the same convention already
established for this lane's other clusters (`hid-q01`, `ipa107-tf-qNNN` as
instructed in the dispatch) and matches the seed's own `cluster: "ipa107-tf"`
field so `ledger.mjs`'s `clusterForKey()` regex-matches correctly -- confirmed
by a clean ledger run (see `O6U-IPA-107-LEDGER.md`).

## Concept/article inventory

- 24 new concepts minted: 12 hemodynamics (`CON-CVS-*`), 11 infectious/parasitic
  pathology (`CON-INF-*`), 1 shared with neoplasia dysplasia/metaplasia pairing
  (`CON-FND-*`) -- see `concept/O6U-IPA-107-new-concepts.md`.
- 6 new articles: infarction/vascular change, thrombosis/embolism,
  edema/gangrene/vascular effects, bilharzial pathology, leprosy/syphilis,
  neoplasia basics -- see `article/O6U-IPA-107-new-articles.md`.
- 1 concept overlay + 1 article overlay reused from Kasr `208-INT` (cellular
  anaplasia) -- see `pending-live/O6U-IPA-107-overlay-{concepts,articles}.md`.

## Gate results

- `gate.mjs batch` on resource (1 item), concepts (24 items), articles (6
  items): 0 errors each.
- `gate.mjs batch` on the emitted question batch (40 items), with all 7 touched
  files passed via `--with`: 0 errors.
- `gate.mjs simulate` on all 6 touched files (resource, concepts, articles,
  pending-live overlay concepts, pending-live overlay articles, question batch):
  `batches=6 created=73 updated=0 rejected=0 skipped=0 errors=0`.
