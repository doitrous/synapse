# Al-Azhar University Damietta Year 1 -- priority source set (S2)

Scope: the three modules that have any downloaded material at all --
`AZD-HBI`, `AZD-MSK`, `AZD-RESP` (see `academic/AZD-Y1-modules.md`). The other
four Year 1 modules (`AZD-NHB`, `AZD-PDDT`, `AZD-BMS`, `AZD-CMBG`) and every
ancillary/pass-fail component have **zero** source material in this corpus --
needs Omar sources, and Telegram fetching is retired so this lane cannot close
that gap by fetching further. Tier order follows the same rubric as the 6
October lane: 1 = real exam papers, 2 = practical/oral exam material, 3 =
comprehensive/core MCQ or question banks, 4 = narrower notes/topic-specific
sets, 5 = admin/reference. Readability is from
`coverage/AZD-Y1-readability-index.md`.

**Note on this corpus**: like 6 October's Year 1 tree, every module folder here
holds exactly 4 pre-curated files -- the prior local `Year 1 Priority 4.md` pass
(dated 2026-08-31) already applied the same 4-resource-per-module cap. There is
no larger uncurated pool sitting behind these 12 files on Desktop, and Telegram
fetching is retired, so this is the entire recoverable pool for these three
modules.

## AZD-MSK (`Musculoskeletal` folder)

| Tier | Source | Readability |
|--:|---|---|
| 1 | `Formative exam with answers.pdf` | 5p / 1003 words, 0 garbled -- **fully native, fully keyed**: 25 questions across 4 subjects (Biochem, Anatomy, Histology, Physiology), every correct option highlighted in solid yellow. Plain-text extraction sees only 1/25 keys (bold-marker heuristic) -- the key only appears on render. See `coverage/AZD-MSK-triage.md`. |
| 2 | `Anatomy prac.نظري.pdf` | 5p / 1042 words, 0 garbled -- practical anatomy revision notes (upper/lower limb), not a question set. |
| 3 | `bone histo questions.pdf` | 2p / 240 words, 0 garbled but glyph-mangled extraction (broken ligatures). Mostly essay-style prompts ("enumerate...", "define...") plus a handful of bare MCQ stems with no options or keys printed -- a revision checklist, not an answerable bank as-is. |
| 4 | `Mechanism of muscle contraction.pdf` | 10p / 394 words, 0 garbled -- lecture notes on excitation-contraction coupling. |

## AZD-RESP (`Respiratory` folder)

| Tier | Source | Readability |
|--:|---|---|
| 4 | `S.G of respiratory module(3).pdf` | 65p / 10,988 words, 0 garbled -- by far the largest native document in the whole corpus. A study guide (prose), not a keyed question set -- no MCQ stems found in a sample read. |
| 4 | `patho respiratory.pdf` | 16p / 1674 words, 0 garbled -- pathology notes. |
| 4 | `para respiratory.pdf` | 22p / 2650 words, 0 garbled -- parasitology notes. |
| 4 | `فسيولوجي ..مديول Respiratory.pdf` | 13p / 39 words -- despite the filename claiming "complete physiology module", this is image-heavy (low-word-count-but-not-garbled trap); needs OCR before it can be trusted as notes or a question set. |

None of Respiratory's four files are exam papers or banks -- all read as lecture
or study notes, consistent with the prior curator's own description in `Year 1
Priority 4.md` ("core [subject] PDF", "complete module study guide"), not this
pass's independent classification alone.

## AZD-HBI (`Blood` folder)

| Tier | Source | Readability |
|--:|---|---|
| 1 | `حل امتحان السوماتيف موديول blood .pdf` ("solved formative exam") | 5p / 15 native words -- effectively an image scan despite 0 reported garbled pages (low-word-count-but-not-garbled trap, same as `AZD-RESP`'s physiology file above). The filename claims a solved/keyed exam; nothing can be confirmed without OCR. |
| 3 | `اساله البارا موديول blood .pdf` ("module question set") | 3p / 9 native words -- same image-heavy trap, needs OCR. |
| 4 | `تلخيص هستو موديول blood.pdf` ("histology module summary") | 15p / 45 native words -- image-heavy notes, needs OCR. |
| 4 | `ملخص فسيو blood.pdf` ("physiology module summary") | 7p / 21 native words -- image-heavy notes, needs OCR. |

All four `AZD-HBI` files need OCR before any content can be read at all -- none
were OCR'd in this pass (S1b's "OCR priority scans only" instruction was spent
confirming `AZD-MSK`'s render-based key instead, which needed no OCR and
resolved the whole module in one pass).

## Recommended next-triage order

1. **`حل امتحان السوماتيف موديول blood .pdf`** (`AZD-HBI`, 5p) is the single
   highest-value OCR target in the corpus: it is the only other file besides
   `AZD-MSK`'s formative exam whose filename claims a solved/keyed exam, and at
   5 pages it is a cheap OCR run (`pagetext.mjs ocr --force --dpi 400`) before
   committing to a full triage pass on it.
2. **`اساله البارا موديول blood .pdf`** (`AZD-HBI`, 3p) -- same module,
   cheapest remaining OCR target, likely the question stems this module's
   solved exam answers.
3. **`فسيولوجي ..مديول Respiratory.pdf`** (`AZD-RESP`, 13p) -- worth an OCR
   pass only after the two `AZD-HBI` exam files above; it reads as notes, not
   a question set, so lower authoring value even once legible.
4. `تلخيص هستو موديول blood.pdf` and `ملخص فسيو blood.pdf` (`AZD-HBI`, 15p +
   7p) -- both notes/summaries once OCR'd, not exam content; lowest priority
   of the four still-illegible files.
5. `AZD-NHB`, `AZD-PDDT`, `AZD-BMS`, `AZD-CMBG`, and every ancillary/pass-fail
   component have no material at all -- needs Omar sources before any triage
   is possible for them.
