# ZU-MED-106 (Cardiopulmonary) — S3 first-module triage

Cardiopulmonary was chosen as the first module: it has the highest word count of any
Zagazig Year 1 module in the readability index (375,295 words across 147 PDFs), the
second-highest paper+bank count (10 paper + 32 bank, `manifest/y1-sources.md`), several
of its Priority-4 sources are native-text (no OCR needed), and multiple staging
filenames explicitly flag themselves solved/answered (`FAQOUS ospe Cardiopulmonary 2025
answered.pdf`, `MCQ answer_.pdf`, `Mcq dr wagih محلول.pdf` — "محلول" = "solved") — a
concentration of recoverable keys no other module's filenames showed as clearly.

**Scope of this pass**: one complete source, fully triaged, as a worked example that
also validates a key-recovery method this corpus needs (see "Key-recovery method"
below). The other 3 Priority-4 Cardiopulmonary sources and the remaining ~143 non-
priority files in this module are catalogued in `manifest/y1-sources.json` and
`coverage/ZU-Y1-readability-index.md` but **not yet triaged** — real remaining S3 work,
not a gap hidden by this table. See "Remaining scope" below.

## Source: `Fakous CPS Final 2024.pdf`

5 pages, native text (no OCR needed), 10 written/essay questions (Total 72 marks: "10+
36 SBA" per the paper's own header) + 36 single-best-answer MCQs. All 46 questions read
in full via `pagetext.mjs show` and `pagetext.mjs render --force` (pages 2-5).

### Key-recovery method (a new trap for this corpus)

`pagetext.mjs keys` reports **0 keyed** on every question in this file (`0 keyed / 0
ambiguous / 17 unmarked` on the pages sampled) — its detector looks for coloured text,
bold/underline font flags, or PDF annotations (00-START-HERE.md / SHARED-TOOLCHAIN.md
`keys` reasons: `red-text | underline-flag | bold-flag | highlight-annot | ...`), and
this paper's correct answer is marked by a **hand-drawn ink strike/circle over the
option letter**, added when the paper was graded/annotated before scanning — a vector
drawing, not a font or colour property, so the automated detector is structurally blind
to it here. The `pdftotext -layout` text layer still shows the effect indirectly: the
struck-through letter's glyph comes out corrupted or replaced (`.d) Lingula` → `A
Lingula.`, `b) Thyrocervical trunk` → ` Thyrocervical trunk.` with the label dropped, an
"X" appears mid-line, etc.) — this is the "textLayer lies" pattern, but recoverable
**without OCR**: the corrupted/missing option letter reliably identifies the marked
answer. **Confirmed, not just inferred** — page 2 was rendered (`pagetext.mjs render
--force`, since the page has a text layer and isn't "garbled" so render normally
refuses without `--force`) and visually shows a diagonal pen stroke through the correct
letter on all 8 questions on that page, exactly matching the text-corruption pattern.
Pages 3-5 were rendered the same way and read directly from the image rather than
re-inferred from corrupted text, to avoid compounding an unverified assumption across
28 more questions.

**This is a corpus-wide risk, not a one-file quirk** — the "Zag/Fakous Final" naming
pattern for exam papers, plus explicit "solved/محلول" filenames, both point at graded
hard-copy papers scanned back in. Any lane authoring from this module's `paper`-kind
sources should expect this pattern and confirm with a render before trusting a
corrupted-glyph inference, exactly as done here.

### Checkpoint table

| Source | Questions triaged | Keys recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|--:|--:|--:|--:|--:|--:|---|
| `Fakous CPS Final 2024.pdf` | 46 (10 written + 36 SBA) | 36/36 SBA (written = essay, graded by rubric/department book, no single-letter key) | 45 (1 exact SBA duplicate collapsed, Q14=Q17) | 4 (all partial — see below) | 1 | 40 | `resp` (upper-airway anatomy + pulmonary physiology, majority), `cvs` (shock/BP-regulation/heart-sound physiology), `fnd` (general lipid/cholesterol biochemistry, per the pharm-adjacent placement rule in `00-START-HERE.md` §3) — not asserted as final, an S3 orchestrator call |

Full per-question rollup: `coverage/ZU-MED-106-triage-keys.txt`.

**The 4 live-hits are all partial matches, not clean reuse** — flagging this explicitly
because a shallow read would over-count them as "already covered":
- `cps-intra-alveolar-pressure` → only a citation exists (`CIT-FCC0FC6F6145B2`), no full
  concept — the written question's "definition and values" objective would still need a
  new or substantially expanded concept.
- `cps-refractory-shock-cause-of-death` → live concept `CON-CVS-1AD44A19DA47AD` covers
  the *microvascular change* in late refractory shock (precapillary sphincter/venule
  behavior); this question tests *cause of death* (toxin release from ischemic tissue) —
  same broad topic, different fact/objective. Needs an authoring-time judgment call
  (§4 tiebreaker in `00-START-HERE.md`) on whether one concept can honestly cover both.
- `cps-stagnant-hypoxia-decreased-blood-supply` → live concept `CON-RES-654A12F4B21CC0`
  is scoped to *localized* stagnant hypoxia from thrombosis/embolism; this question tests
  the general definition (decreased blood supply → stagnant hypoxia). Likely the same
  concept with a broader definition, not two — again an authoring call, not resolved
  here.
- `cps-terminal-bronchiole-histology` → live concept `CON-RES-BECD91B06EA39D` covers the
  terminal bronchiole's *position* (immediately proximal to the respiratory bronchiole);
  this question tests a *histological* feature (no glands in lamina propria). Plausibly
  the same concept, needs the fuller record read before deciding.

The 1 pending-hit (`cps-lung-carcinoma-lingula-anatomy`) matches Kasr's
`104-CPS-anatomy` concept/article/glossary batch by alias — worth noting the module code
coincidence: Kasr's own Cardiopulmonary module is also "104 CPS", unrelated to Zagazig's
`ZU-MED-106` numbering but the same subject matter, which is exactly the kind of
cross-university overlap `find-existing.mjs` and the concept-id-overlay rule
(`concept-id-mint-is-university-blind`) are built to catch.

## Remaining scope (not done this pass)

- **3 more Priority-4 Cardiopulmonary sources** untouched: `Cardio-Pulmonary Module
  Final (4).pdf`, `Cardio-Pulmonary Module Final ---Part 2-1.pdf`, `all Previous Years
  ospe Cardiopulmonary (1).pdf`. The first of these was spot-checked for `keys` only (5
  pages, 0 keyed, 2 unmarked) — not yet triaged for content or checked for the same
  hand-mark pattern.
- **~143 non-priority Cardiopulmonary files** (154 total in `manifest/y1-sources.md` for
  `ZU-MED-106`, minus the 4 Priority-4 + this session's spot-checks) are sha256'd and
  readability-indexed but not read.
- **7 other Year 1 modules** have had no S3 triage at all yet.

## Needs Omar

- The 4 live-hit "partial match" concepts above need an authoring-time call on
  merge-vs-split (00-START-HERE.md §4 tiebreaker) — flagged here so it isn't
  re-discovered from scratch later, not resolved by this lane.
- Subject placement for the ENT/upper-airway anatomy items (sphenoid sinus, piriform
  recess, posterior cricoarytenoid, thyroarytenoid, sphenopalatine artery) defaults to
  `resp` in this triage (nose/pharynx/larynx are anatomically part of the respiratory
  tract) since `ent` is explicitly "pending an Omar ruling — do not mint against it yet"
  per `00-START-HERE.md` §3. Flagging the default rather than asserting it's settled.
- General lipid/cholesterol biochemistry items (Q26-30: LDL receptor, cholesterol
  synthesis, ApoCII, HMP pathway, fatty acid synthesis) default to `fnd` per the
  pharm-adjacent placement rule — same flag, not asserted as final.
