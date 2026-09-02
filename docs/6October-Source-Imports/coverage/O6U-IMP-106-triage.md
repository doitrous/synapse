# O6U-IMP-106 -- `MIP` folder triage

Corpus root `/Users/doitrous/Desktop/Universities/6 October University/Faculty of
Medicine/Year 1/MIP/_Telegram O6U Med Bot/`. Four pre-curated files per the Priority 4
cap. This pass covers the two sources named in
`coverage/O6U-Y1-priority-sources.md`'s "Recommended next-triage order" item 3.

## Source A -- `Micro & Para MCQ Final 19..#Diaa (O6U bot)..pdf` (19p, fully scanned)

One of only two real final-exam papers in the whole O6U Year 1 corpus.

**OCR**: all 19 pages OCR'd (`pagetext.mjs ocr`, two foreground chunks of 10+9 pages,
psm=6, 55-116 words/page). `pagetext.mjs keys` reported "no text layer" on every page
even post-OCR (its garbled-page heuristic doesn't re-run against OCR text), so the
printed-key search was done by rendering pages to image and reading them by eye, per the
LANE-CARD's "confirm cues by eye" instruction -- all 19 pages were rendered and read.

**Format**: this is a mobile screenshot of `forms.office.com` (Microsoft Forms) -- a
"review your answers" scroll, not a printed answer-key table. Each question shows one
option highlighted in a teal box with a filled radio button. **This is the same shape as
the disqualified `BOS final exam 20-21` case** (one respondent's own completed MS-Forms
attempt) -- the standing ruling ("marks that are one respondent's answers are NOT a key")
applies here too, so the highlight was never trusted on its own.

**Method used instead**: every highlighted answer across all 19 pages was independently
cross-checked against standard microbiology/parasitology/infection-control fact, the same
method `O6U-IPA-107`'s T/F sections used. Result, by distinct question (33 distinct
questions found; several repeat verbatim 2-3x across the scroll with an identical
highlighted answer both times, e.g. "normal flora bacteriocin" and "droplet precaution
mask" each appear 3x, "defective virus" and "abscess/collagenase" each appear 2x, always
with the same highlighted choice):

- **27 confirmed correct** against independent fact-check (~82% of distinct questions) --
  real, verifiable stems with a real, verifiable key. This clears the LANE-CARD's "≥60%
  keyed with real stems" bar by a wide margin even though the marks are not a printed key.
- **2 debatable, held**: "how bacteria make abscess in human tissue" (marked answer
  "collagenase", repeated identically both times it appears) -- plausible for
  *Bacteroides*-type abscesses but coagulase is at least as standard a textbook answer for
  abscess-associated virulence, and I could not independently settle it with confidence;
  "what is meant by superinfection" -- the marked option's own wording is backwards from
  the usual textbook phrasing (sensitive-on-top-of-resistant vs the normal
  resistant-emerges-after-treating-sensitive framing) and was not authored as printed.
- **4 confirmed wrong, held** (the respondent's own errors, exactly the BOS-final failure
  mode): "usual shape of DNA viruses" marked "helical" (real answer: icosahedral -- most
  DNA viruses, poxvirus is the brick-shaped exception); "helical nucleocapsids found
  primarily in DNA-containing viruses" marked true (real answer: RNA viruses -- same
  underlying misconception as the DNA-shape item, evidence this is one confused
  respondent, not a key); "which parasite does not need soil to complete its life cycle"
  marked "Ascaris lumbricoides" (real answer: *Enterobius vermicularis* -- Ascaris eggs
  require soil embryonation); a clinical vignette (whitish-creamy small worm-like objects
  in stool, eggs negative) marked "Myiasis" (clinically this reads as enterobiasis, not
  myiasis; the alternative option's text was OCR-illegible so the correct key is not
  recoverable from this scan either way).
- **1 held for an unrecoverable stem**: a schistosomiasis-prevention vignette split across
  a page break (`"...eggs. Based on your suggestive diagnosis how can prevent this
  condition?"`) -- the vignette's opening sentence never appears on any rendered page, so
  the stem cannot be reconstructed cleanly. The same underlying fact (snail control
  prevents schistosomiasis) is covered instead by a separately, cleanly-stemmed question
  elsewhere in the same document ("Snail control is of importance in preventing which
  parasitic disease?").
- 1 question (`Q29`, "which material is used for millipore filter?") has its stem visible
  but its options/answer fall off the end of the render sequence -- not authored, not
  counted either way.

**Condition met**: yes -- 27/33 distinct questions (~82%) keyed with real, independently
verified stems, comfortably over the 60% bar, even under the strict "one respondent's
marks are not a key" reading that required fact-checking every item rather than trusting
the highlight.

## Source B -- `Micro q bank.pdf` (251p, native, 0 garbled)

Confirmed as characterised in `O6U-Y1-priority-sources.md`: printed-key search
(`pagetext.mjs grep` for `answer`, `correct`, `key`, `( true )`, `( false )`, `^ans`)
found real content on only 89 of 251 pages for "correct" (almost all just the word
"correct"/"incorrect" inside a plain MCQ stem, e.g. "the following is INCORRECT
regarding..." -- not a key), and exactly one page, **p251**, with a genuine printed
answer: "Answer the following questions by true or false", 4 short T/F statements each
with an inline `(true)`/`(false)` marker. All 4 independently verified true (hand hygiene
with antiseptic soap; TB spread by prolonged shared air with an infectious person; gloves
do not eliminate the need to wash hands; GI-pathogen hospital transmission via catering
faults such as incomplete poultry defrosting). The other 250 pages are a plain "choose the
correct answer" MCQ bank with no printed/inferable key in plain-text extraction -- same
shape as `Pathology Q Bank.pdf`'s un-keyed MCQ portion, not authored.

Folded into the authored cluster below as 4 bonus items (cheap, genuinely keyed, same
general infection-control topic area as several Source A items).

## Search-before-mint

`find-existing.mjs` run against every distinct question topic (live state + every
`docs/*-Source-Imports` pending folder + `docs/import-ready`, per `00-START-HERE.md`
§3-4). Two real hits, both used:

- **Dimorphic fungi** (yeast at 37C / mycelial at 25C) -- exact match,
  `CON-INF-44400FF4328CA8` in `docs/Ain-Shams-Source-Imports/concept/ASU-INF-microbiology-concepts.md`
  (mirrored to `docs/import-ready/concept/ASU-INF-microbiology-concepts.md`). Pending, not
  live yet (0 hits in `server/data/medical-library-v1.json`) -- handled as a sparse
  pending-live overlay, same pattern as `O6U-IPA-107`'s Kasr `208-INT` reuse.
- **Droplet precautions** -- a live concept exists (`CON-INF-001BC61BB510CF`) but it is
  scoped specifically to meningococcal cases/contacts, not the general infection-control
  fact this cluster's question tests (which mask/isolation category applies under droplet
  precaution generally). Different scope, not reused directly as `main_concept` --
  flagged as a related concept instead, new concept minted for the general fact (matching
  this lane's own `IHI-103` caution: "different context, confirm scope" before force-
  reusing on keyword overlap alone).

Everything else searched (`Taenia solium`, `Taenia saginata`, `bacteriocin`, `Giardia`,
`Cryptosporidium`, `Schistosoma haematobium`, `cercaria`, `Enterobius`, `Ascaris`,
`probiotics`, `convalescent carrier`, `fungal cell wall chitin`, `fleas plague`,
`Phlebotomus`/`leishmaniasis` -- several close hits in `MUST`/`Ain-Shams` cutaneous-
leishmaniasis concepts but scoped to the cutaneous form specifically, not the general
"Phlebotomus transmits leishmaniasis" fact tested here, so not force-reused --,
`trichinosis` -- one Ain-Shams hit on a specific clinical-presentation fact, different
from the pork-cooking-prevention fact tested here, not reused -- , `coagulase`,
`spore forming`) came back either with no match or a scope-mismatched match. This
corpus's microbiology/parasitology general-facts content is, like `O6U-IPA-107`'s
pathology content, a genuinely under-covered area rather than the heavy overlap the
coordinator's steer expected -- an honest negative finding, not a search gap.

## Files this triage produced

- `coverage/O6U-IMP-106-triage-keys.txt` -- flat key list for `ledger.mjs`.
- `coverage/seeds/O6U-IMP-106/MIP-mixed.json` -- authoring seed (Step 2), 30 authored + 6
  held.
