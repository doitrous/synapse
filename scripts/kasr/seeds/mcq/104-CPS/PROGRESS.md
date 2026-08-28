# 104 CPS MCQ authoring — progress

Branch: `kasr-104-author-run28` (off `kasr-104-author-run27` @ `bd7e9f9b`,
pushed to origin). run27's own base was `kasr-104-author-run26` @ `1314b2ff`;
run26's own base was `kasr-104-author-run25` @ `14f77eef`; run25's own base
was `kasr-104-author-run23` @ `29aff753`; run24 was interrupted mid-
Pulmonary-Compliance and never committed anything — its work is gone,
redone cleanly in run25.

Bank total: 1289 questions in `scripts/kasr/extract/104-CPS/mcq-bank.json`.
As of this session's (run28's) HEAD: **432 kept**, 71 excluded, 95 MCQ
concepts. (run27's own HEAD was 395 kept, 64 excluded, 88 MCQ concepts.)

## A-V Connections (54/54 bank rows accounted for this session — run28) —
40 kept, 12 excluded, 7 left unclaimed for other clusters (Basic Mechanisms
of Circulatory Control 2, Vascular Function 5). Three commits: the new
histology leaf file, leaf-mismatch routing plus a physiology sparse reuse,
and a cleanup pass that recorded 4 already-known corrupted rows as proper
seed excludes (they had been identified but never actually written as
`exclude: true` entries — caught by re-running the recompute script after
the first two commits, which is why "what's left" tools exist).

**A major dedup-research finding drives this whole cluster**: before
minting anything, `find-existing.mjs "fenestrated capillary"` /
`"lymphatic capillary"` / `"pericyte"` surfaced a **rich, complete,
hand-authored histology concept set already sitting unimported** in
`docs/Kasr-Source-Imports/concept/104-CPS-histology-concepts.md` and its
sibling `docs/Kasr-Source-Imports/article/104-CPS-histology.md` — an
earlier, separate authoring pass that filled every sub-heading of the
department's histology chapters this MCQ pipeline had never read. Both
files are **not GENERATED_BY** (so `existingConceptIds()` for module
"104 CPS" does see them) and both are tagged `module_subject "104 CPS >
Histology > Cardiovascular System > A-V Connections"` — this leaf, exactly.
Three of this cluster's five new-file concepts are **sparse reuses** of
that set, not fresh mints:
- `fenestrated-capillary.structure-junctions-and-sites`
  (`CON-CVS-132A76916FEC05`)
- `blood-vs-lymphatic-capillary.structural-and-functional-comparison`
  (`CON-CVS-E8964EBC8F2357`)
- `capillary-exchange.starling-forces-and-trans-capillary-filtration`
  (`CON-CVS-98657F1E7D300D`, in `104-CPS-physiology-concepts.md`, module
  "Vascular Function")

Also reused, in existing files: `alveolar-phagocytes.dust-cells-and-heart-
failure-cells` (`CON-RES-D8B1BE3C6CFABD`, `respiratory-alveolar-
phagocytes.ts`) and the already-in-file `thymus.dual-origin-and-epithelial-
reticular-cells` (`lymphatic-thymus.ts`, no new search needed — already
this pipeline's own prior concept).

**The same pinned file also names the leaf's own dedicated article**:
`ART-104-HIS-AV-CONNECTIONS-CAPILLARIES-SHUNTS` ("Arteriovenous
connections: capillary types and shunts"), a real, evidenced, Draft
article in `104-CPS-histology.md` — not live yet, but not a phantom
forward-reference either (the run25 hazard's distinction): it has real
prose, a real evidence basis (department book pp. 11-13), and sits in a
file this session can pass via `--with` at gate time. Used as this file's
`articleId`; verified against its actual prose (read in full) before
authoring against it, per the heightened article-mispinning awareness.

Two more overlaps found and recorded, not reused — both the same
GENERATED_BY-blind pattern documented for the Pulmonary-Compliance and
Gas-Exchange clusters:
- `capillary-types.continuous-and-sinusoidal-structure-and-sites` (fresh
  mint) overlaps a live, thin, single-sentence Systems-view catalogue
  (`CON-CVS-2A37D5DDEB19DB`/`047FC0A529AFBA`, pinned to
  `ART-CVS-CARDIAC-HISTOLOGY`, no 104-CPS module) **and**
  `CON-CVS-9585A65D9EDA4D`, the original hand-picked 40-question MCQ
  batch's own continuous-vs-sinusoidal concept, sitting in the
  *generated* `104-CPS-concepts.md` — reusing either would have emitted a
  full record and silently overwritten a hand-authored one.
- `capillary-pericyte.contractile-function-differentiation-and-position`
  (fresh mint) overlaps the same Systems-view catalogue's
  `CON-CVS-CC810A201244F0`/`5D4C49C48AA325` (pericyte flow/location, same
  GENERATED_BY-blind reasoning).

**Article-coverage gaps disclosed, not invented** (in the concept's own
`gaps` field, per the "verify the article actually teaches it" rule): the
covering article's Mechanism section states continuous-vs-sinusoid wall
structure and the sinusoid's liver/spleen/bone-marrow sites, but not that
continuous capillaries are commonest, that endocrine glands also carry
sinusoids, that macrophages associate with the sinusoidal wall, or that
sinusoids carry fewer pericytes — four facts, all standard histology,
tested directly by this leaf's bank, flagged for the article-authoring
lane. Separately, the article names pericytes only in passing (shared
with the fenestrated capillary) and does not itself teach pericyte
contractile function or differentiation potential — also disclosed.

**Found, not fixed** (a different lane's pending, unreviewed Draft
article, out of this session's own file-ownership scope): the same
article's Clinical-significance section states arteriovenous shunts
"dilate in cold and constrict in heat" — reversed from standard
thermoregulatory physiology (dilate in heat for cooling, constrict in cold
for conservation). Neither of this leaf's 2 AV-shunt questions depends on
resolving that direction, so both were written without touching the
erroneous sentence, and their own explanations state the correct
physiology independently. Flagging for the histology-lane to correct in
`104-CPS-histology.md`.

**Cross-file concept overlap found, not merged, needing a routing
decision this session did not make on its own**: `control-blood-flow-to-
capillaries-49927906`, `is-terminal-portion-of-arteriole...-2a292f09` and
`regarding-the-metarterioles...-f3764004` (bank-tagged "A-V Connections"
but genuinely metarteriole/precapillary-sphincter content) were routed to
run27's own `arterioles.resistance-function-and-regulation` concept in
`cardiovascular-artery-classification.ts` (Arteries cluster, closed) —
but a **separately-pinned**, not-yet-imported concept,
`CON-CVS-E6F658EEC11072` (`metarteriole.precapillary-sphincter-and-flow-
regulation`, module_subject "Arteries", same real
`ART-104-HIS-ARTERIES-AND-VEINS` article), teaches the identical narrower
fact in `104-CPS-histology-concepts.md`. Not reused here — run27's broader
concept is this branch's own prior committed work, and switching to the
pinned id mid-cluster would have required re-authoring rather than
extending. Recorded for a future consolidation pass; needs a ruling on
which of the two survives once `104-CPS-histology-concepts.md` is
eventually imported.

**Leaf-tag-unreliable hazard, confirmed yet again** (13 of 54 rows
mistagged, the largest single-session count so far): 4 rows were genuinely
Arteries content (`cardiovascular-artery-classification.ts`), 4 were
genuinely Respiratory Portion content (2 kept onto existing concepts, 2
excluded — one a 3-option contract violation, one a corrupted stem merging
a bronchiole question with an alveolar-sac one), 1 was genuinely Alveolar
Phagocytes content, and 1 was genuinely Thymus content (blood-thymic
barrier, onto an already-existing question's own sibling concept, a
distinct angle from that concept's existing question).

**Hazards hit, confirmed against this session's own content**:
- **Leading-`+` in an option value breaks import** (00-START-HERE §2,
  already confirmed once in Organization-of-Respiratory-System): the
  Starling-forces zero-net-flow calculation's option D is literally
  "+2 mmHg". `medical:batch` refuses it outright
  (`answer_d starts with "+"`); no seed-level field exists to rewrite
  option text. Excluded.
- **A+B/C+D option-merge corruption** (same class as the Arteries
  cluster's own precedent): `the-blood-sinusoidal-capillaries-are-
  characterized-by-the-fo-768558f4` — only 2 distinguishable choices
  survive for a 4-option item. Excluded.
- **Corrupted-stem merge with clean surviving options**: a bronchiole
  question's stem bled into an alveolar-sac question's — the 4 lettered
  options answer only the alveolar-sac half cleanly, with a confident
  editorial-reconstruction answer, but the STEM ITSELF cannot be shown to
  a student, and no seed-level field exists to override stem text (only
  `answerOverride` exists, for the answer letter). Excluded — a genuinely
  new hazard variant: previous sessions' stem-merge corruptions all also
  corrupted the options; this is the first case found where the options
  survive clean but the stem alone is unusable.
- **A 3-option item where the "all of the above" option itself names a
  now-incomplete set**: `which-of-the-following-is-a-component-of-the-
  respiratory-mem-f9f2931b` — only A, B and D survive (no C), and D reads
  "All of the above" over a set missing a member. Excluded; the same fact
  survives cleanly on a sibling question already in the target file.
- **A tracking gap, not a data-loss one**: this session initially decided
  to exclude 2 already-bank-flagged rows and 2 self-found corrupted rows
  but forgot to actually write the `exclude: true` seed entries for any of
  the 4 — caught only by re-running the "what's left" recompute script
  after the first two commits, which still showed 11 remaining rows
  against a planned 7. All 4 added in a third, cleanup commit. **Always
  re-run the recompute script after claiming a cluster closed, not just
  after the first commit** — it is the only tool that catches this class
  of "said I'd exclude it, never actually did" mistake.

## Arteries (58/58 bank rows accounted for this session — run27, the first
CVS histology/anatomy leaf this pipeline has closed) — 43 kept, 6 excluded,
11 left unclaimed for other clusters (9 listed below + 2 more — the
baroreceptor/atrial-stretch-receptor pair — documented in their own
finding further down, since routing them surfaced a pre-existing
article-mismatch bug worth a longer note). Five commits, one per concept
group;
each ran the full build+batch+simulate gate before committing. Full-session
diff vs base `1314b2ff` (comm -23, both directions): **0 CON-\*/QM-104-\*
ids lost anywhere**, +5 CON-\* ids in `104-CPS-mcq-concepts.md` (4 genuine
mints, 1 pre-existing pinned id's first appearance in this file via sparse
reuse — see below), +40 QM-104-\* ids.

Files touched: `cardiovascular-artery-classification.ts` (extended existing
concept + 3 new concepts), `cardiovascular-vessel-wall-general-plan.ts`
(extended existing concept + 1 new concept), new
`cardiovascular-capillary-exchange.ts`.

**cardiovascular-artery-classification.ts** (articleId
`ART-104-HIS-ARTERIES-AND-VEINS`, confirmed to teach every fact below before
authoring against it):
- Extended `artery-classification.elastic-muscular-and-arteriolar-types`
  (existing, hand-authored concept) with 7 more duplicate-book-occurrence
  questions on the same elastic/muscular/arteriolar comparison.
- New `elastic-artery.aortic-tunica-media-structure` (5 kept + 1 excluded):
  aorta media = smooth muscle between 40-70 elastic membranes; why the
  aorta's IEL is unclear (indistinguishable from the media's own elastic
  laminae, not absent/thin/unstainable — the article's own "Common
  misconceptions" section states this explicitly).
  Excluded: `which-of-the-following-is-not-true-regarding-the-aorta` — A+B
  and C+D option pairs merged into 2 surviving keys, unfixable at the seed
  layer.
- New `basilar-artery.muscular-type-despite-cranial-location` (2 kept,
  duplicate occurrences): basilar artery is histologically muscular,
  flagged by its unusually prominent IEL. **`gaps` field discloses**: the
  article teaches the general elastic-vs-muscular IEL-prominence rule but
  never names the basilar artery as a worked example — this question
  applies the rule to a named vessel the article itself doesn't mention.
- New `arterioles.resistance-function-and-regulation` (8 kept): metarteriole
  and precapillary sphincter as the arteriole's own terminal segment
  (article-confirmed); arterioles as the principal resistance vessels, NOT
  the most compliant type (veins are); Poiseuille's-law radius⁴ calculation
  (8x flow from radius doubled + pressure halved); pressure autoregulation;
  arteriolar-tone hypertension mechanism (duplicate occurrence kept);
  sympathetic stimulation and TPR. **Re-scoped in from a planned "defer to
  Vascular Function" list** — all of it is fundamentally the arteriole's own
  histology-linked resistance function, which the leaf's own article
  explicitly teaches, so authoring it here (rather than leaving it
  unclaimed for a cluster with no dedicated file yet) was the more honest
  call.
  **Self-caught defect**: `the-main-site-of-r-sistance-in-the-systemic-
  circulation` was drafted as a kept question in this concept, but the
  first `medical:batch` run of that commit's stage flagged a 5th error (3
  options, contract is 4-5) — re-inspection confirmed option A's text
  ("Aorta") had bled into the stem during extraction, same corruption class
  as several other rows this cluster. Converted to `exclude: true` before
  committing; the fix is reflected in the commit's own gate-line history
  (first run: 5 errors; after fix: back to the 4 pre-existing).

**cardiovascular-vessel-wall-general-plan.ts** (articleId
`ART-104-HIS-HEART-AND-VESSEL-WALL`, confirmed to teach every fact below):
- Extended `blood-vessel-wall.general-three-tunic-plan` (existing concept)
  with 10 kept + 1 excluded: IEL function/location, thrombus-on-endothelial-
  damage, endothelium histology, external elastic lamina, subendothelium
  composition, tunica media elastic-fibre component.
  Excluded: `internal-elastic-lamina-is-well-developed-in-the-tunica-inti` —
  option C merges "Capillaries" with a bled-over "c. Lymphatic", leaving
  only 3 distinguishable options; the same fact survives cleanly on a
  sibling question with a clean 4-option set.
- New `tunica-adventitia.vasa-vasorum-and-composition` (7 kept + 1
  excluded): vasa vasorum's literal meaning and location (adventitia of
  LARGE vessels only, nourishing what luminal diffusion can't reach),
  vein>artery frequency gradient, named-constituent identification rows.
  Excluded: `the-tunica-adventitia-of-a-blood-vessel-contains-collagen-fi` —
  same A+B/C+D merge-corruption class, caught before authoring rather than
  after a failed gate run this time.
- 3 more excludes attached to `blood-vessel-wall.general-three-tunic-plan`
  for bookkeeping (none test a kept concept specifically, all corrupted):
  `tunica-media-of-blood-vessels-constitutes-the-following` (unkeyed AND a
  merged option — double-disqualified); `regarding-the-blood-vessels-0-a-
  smooth-muscle` (stem absorbed option A's text, leaving 3 options);
  `the-wall-of-the-arterioles-lacks` (A+B and C+D merged, 2 surviving
  keys).

**New file `cardiovascular-capillary-exchange.ts`** (articleId
`ART-104-PHY-CAPILLARY-EXCHANGE-AND-LYMPHATICS` — deliberately a different
article from the two files above, since a leaf's single `articleId` must
match its concepts' real teaching article, and this content's true home is
Vascular Function physiology, not vessel-wall histology):
- **Dedup win, not a fresh mint**: `find-existing.mjs "capillary
  permeability"`, run before minting per the heightened CVS dedup
  mitigation, hit `CON-CVS-D3D1AF25EFA406`
  (`capillary-exchange.diffusion-permeability-and-vesicular-transport`,
  hand-authored and pinned in `104-CPS-physiology-concepts.md`, module_subject
  Vascular Function) — already teaching the exact
  continuous<fenestrated<discontinuous permeability ranking the 2 remaining
  bank rows test. Declaring the same canonical_key resolved to the pinned
  id and emitted a sparse reuse row (confirmed in the built output:
  `field_notes` states "every other field is untouched"). The concept-id
  diff shows this id as "new" only because it is `104-CPS-mcq-concepts.md`'s
  first-ever reference to it — not a fresh mint.
- 2 kept questions (duplicate occurrence pair): a discontinuous/sinusoidal
  capillary lets plasma cross freely, a continuous capillary blocks blood
  cells outright; the item also bundles (and this corrects) a
  reversed-boundary distractor pair confusing which elastic lamina sits
  where.

**Left unclaimed for other, not-yet-started or already-flagged clusters (9
rows, no seed file references any of these keys)** — do not recount these
as still-open Arteries work, but do not treat "Arteries: 0 remaining" as
meaning every leaf-tagged-Arteries row was mine to author either:
- **Veins (6 rows)**, genuinely vein-histology content mistagged under the
  Arteries leaf (same leaf-field-unreliable hazard as every prior cluster):
  `concerning-the-medium-sized-veins-all-of-the-following` (also corrupted,
  A+B/C+D merge), `medium-sized-vein-is-characterized-by` (clean, 4
  options), `smooth-muscle-fibers-are-found-in-the-tunica-adventitia-of`
  (IVC-focused), `the-following-is-a-difference-between-medium-sized-
  artery-an` (artery-vs-vein comparison), `the-wall-of-inferior-vena-cava-
  contains` (unkeyed + corrupted), `tunica-media-of-vein-is-typically-
  wider-than-tunica-media-of` (unkeyed + corrupted, stem absorbed option A).
  Veins has 34 already-tagged rows of its own; these 6 join that pile for
  whoever starts that cluster.
- **Spleen (2 rows)**, genuinely splenic histology mistagged under Arteries:
  `choose-the-correct-statement-concerning-the-malpighian-corpuscle` and
  `penicillar-arteriole-is-3-parts` (splenic circulation, not general
  arteriolar histology). Spleen has 26 already-tagged rows of its own.
- **Vascular Function (1 row)**: `under-normal-conditions-the-capillaries`
  — corrupted (only 3 options, A/B/C, no D) and about capillary blood-
  volume distribution/hemodynamics rather than vessel-wall histology or the
  arteriole-resistance content re-scoped in above. Whoever starts Vascular
  Function (35 already-tagged rows) will exclude this on sight; flagged
  here so it isn't silently lost.

**Duplicate-overlap and article-coverage findings from this session, none
requiring a fix here**:
- No new cross-pipeline concept-overlap was found for any of the 4 fresh
  mints (aorta, basilar artery, arterioles, vasa-vasorum/adventitia) —
  `find-existing.mjs` returned "safe to create" for "basilar artery",
  "arteriole resistance" and "vasa vasorum" (only a glossary-term hit, not
  a concept, for the last one) before minting each.
- **A pre-existing article/concept mismatch was discovered, not fixed**:
  `physiology-circulatory-control-hemorrhagic-shock.ts` (from an earlier
  session's Cardiac Function re-route work) is pinned to
  `ART-104-PHY-NERVOUS-AND-CHEMORECEPTOR-CONTROL`, but at least 4 of its 5
  concepts (hemorrhagic-shock hormones, atrial functions, venous-return
  equation, venous-return-during-exercise) describe content that article's
  own `## notes` field explicitly disclaims teaching ("the arterial
  baroreceptor reflex itself is taught by the sibling article ART-104-PHY-
  VENOUS-RETURN-AND-BAROREFLEX and is not repeated here") — the venous-
  return/MSFP material these concepts actually need is taught by that
  sibling article instead, not by the one this file cites. This is why this
  session did NOT route the bank's 2 baroreceptor/atrial-stretch-receptor
  rows (`stimulation-of-arterial-baroreceptors-causes-all-except`,
  `stimulation-of-atrial-stretch-receptors-produce`) into that file as
  originally planned — doing so would have compounded an existing
  citation gap rather than closing one. Both rows are left unclaimed,
  leaf-tagged "Arteries", for whoever next touches Basic Mechanisms of
  Circulatory Control (18 already-tagged rows) to resolve alongside the
  article re-pin this finding calls for. Separately, `ART-104-PHY-VENOUS-
  RETURN-AND-BAROREFLEX` itself is live, evidenced and already overlaps a
  written-paper-pipeline concept, `CON-CVS-C3E60AC7A9EDB1`
  (`arterial-baroreceptor-reflex.response-to-a-rise-and-a-fall-in-arterial-
  pressure`) — a `GENERATED_BY` file, blind to this MCQ pipeline's dedup
  mechanism, so whoever authors those 2 rows will need the same fresh-mint-
  plus-`conflicts`-note treatment already used elsewhere in this file.

## Gas exchange in the lung (5/7 triaged this session: 3 kept, 2 excluded;
2 left unclaimed for other clusters — see below) — run26, NEW file
`physiology-gas-exchange-in-the-lung.ts`. The dispatch brief flagged this
leaf as needing a new physiology concept file + article scaffold; checked
first per the brief and `ART-104-PHY-GAS-EXCHANGE-AND-VQ-MATCHING` was
already live in `104-CPS-physiology.md` with `module_subject` matching this
leaf exactly (diffusion physics, V/Q regional variation, physiologic
shunt) — no article scaffold needed, only the new concept file.

- **Reused `alveolar-capillary-diffusion.factors-determining-rate`**
  (`CON-RES-C323EEF5DA30FF`, already hand-authored/pinned in
  `104-CPS-physiology-concepts.md`) for the one question that is exactly
  its own content (factors affecting respiratory-membrane diffusion rate:
  thickness, surface area, diffusion coefficient). Sparse reuse row
  confirmed in the built output.
- **New mint: `hypoxemia.causes-and-distinction-from-non-hypoxemic-hypoxia`**
  (`CON-RES-59FB00D6B96AE0`) for 2 questions (which of 4 listed items does
  NOT cause hypoxaemia — left-to-right shunt is the exception; which cause
  of hypoxia shows decreased arterial PO2 with normal alveolar PO2 —
  right-to-left shunt, vs hypoventilation which drops both, vs
  anaemia/CO poisoning which drop neither). Searched first
  (`find-existing.mjs` "hypoxemia" / "hypoxaemia" / "right-to-left shunt" /
  "alveolar PO2") and against this module's other two gas-exchange
  concepts (V/Q regional variation; pulmonary physiologic shunt) — neither
  covers hypoxaemia classification.
  - **Overlap found and recorded, not a duplicate-mint**: a live,
    different-textbook, Year-3, no-104-CPS-module topic catalogue exists —
    `ART-RES-TOP-265990F7BD` ("Hypoxia", In review) with 12 linked concepts
    (`CON-RES-22FEB4F22E7D79` anaemic hypoxia, `CON-RES-654A12F4B21CC0`
    stagnant hypoxia, `CON-RES-A0F793A4A37DC0` histotoxic mechanism,
    `CON-RES-723332CA1E127F` cyanotic shunt, several CO-poisoning
    concepts) — classifying hypoxia **by type** for a topic overview. My
    concept classifies hypoxaemia **by mechanism** (arterial-vs-alveolar
    PO2 pattern) for this module's own gas-exchange chapter — genuinely
    distinct objectives (matches the START-HERE tiebreaker: one record
    could not answer both without becoming two stapled-together
    paragraphs), recorded in the concept's own `conflicts` field. Note this
    is **not** the `GENERATED_BY`-blind dedup case from the dispatch brief:
    `existingConceptIds()` only scans `docs/Kasr-Source-Imports/concept/
    104-CPS-*.md`, so it cannot see this live-production catalogue at all,
    regardless of canonical_key — no sparse-update path exists here even in
    principle. Same resolution pattern as the Pulmonary Compliance
    cluster's FRC/lung-volumes overlap with its own Year-3 catalogue.
  - **Disclosed two-sided article-coverage gap** (in the concept's own
    `gaps` field): the covering article already teaches diffusion
    impairment and V/Q-mismatch/shunt as hypoxaemia mechanisms in its
    Clinical Significance section, but its prose does not yet explicitly
    enumerate hypoventilation or altitude as causes, contrast
    right-to-left against left-to-right shunt, or state that anaemia/CO
    poisoning leave PaO2 unchanged. Not expanded by hand here — the
    article's own sourced claims/spans are all tied to specific department-
    book pages via the evidence pass, and inventing new prose without a
    verified page citation would violate the "never invent a fact" rule.
    Flagging for the article-authoring lane, same as Pulmonary
    Compliance's LUNG-RECOIL-AND-SURFACTANT gap.
- **Excluded (2)**: `respiratory-portions-for-aeb43c04` (already bank-
  flagged `editorialExcluded` — corrupted option merge); `with-respect-to-
  gas-exchange-across-the-alyeolar-membrane-ea528c00` (the bank's own
  **correct answer**, option C, is corrupted — `‏و00‎` for the gas name,
  `4S5mmHg` for the number — and unlike a distractor, a corrupted correct
  answer cannot be guessed at; standard values make both "PO2 ≈ 40" and
  "PCO2 ≈ 45" plausible reconstructions, so left unkeyed per the law of
  priority rather than guessed).
- **Left unclaimed (2), not authored, not lost** — genuinely mistagged,
  belong to other not-yet-started clusters, matching the leaf-field-
  unreliable hazard: `av-shunt-include-the-following-except-99b84173` is
  about peripheral (finger/toe/placenta) arteriovenous anastomoses, not
  pulmonary gas exchange at all — belongs to the **A-V Connections**
  cluster (54 remaining rows). `with-respect-to-gas-exchange-across-the-
  alveolar-membrane-e168f662` (Hb O2-carrying capacity, ~20ml O2/100ml
  blood; Bohr-effect distractors) is genuinely **Gas Transport by the
  Blood** content (24 remaining rows), not alveolar-membrane diffusion —
  the existing gas-exchange article's scope is diffusion/V-Q/shunt only
  and does not teach Hb-O2 binding at all. Neither key appears in any seed
  file; the next pass on their true clusters will pick them up. **Do not
  recount these as still-open Gas-exchange-in-the-lung work when both
  clusters below show non-zero.**

## Control of Respiration (15/15 triaged this session: 9 kept, 6 excluded)
— run26, extends the already-existing `physiology-control-of-respiration.ts`
(kept its 1 existing concept + 1 question). Its article
`ART-104-PHY-RESPIRATORY-CENTERS-AND-CHEMORECEPTORS` was already live in
`104-CPS-physiology.md` and already covers DRG/VRG, apneustic/pneumotaxic
centres, central/peripheral chemoreceptors, CO2 narcosis and the
Hering-Breuer reflex in full — no article-coverage gap this time.

**Dedup win, not a duplicate-mint**: all 3 concepts this cluster needed
already existed as **hand-authored, pinned** records in
`docs/Kasr-Source-Imports/concept/104-CPS-physiology-concepts.md` (not
`GENERATED_BY`, so `existingConceptIds()` in build-batches.ts does scan it) —
`CON-RES-A54FECB95CBEBC` (`respiratory-center.drg-vrg-pontine-groups-and-
rhythm-generation`), `CON-RES-C6F65BAAC06FAA` (`chemoreceptors-respiratory.
central-and-peripheral-drive-contributions`) and `CON-RES-B68E39C6B4178F`
(`hering-breuer-reflex.pulmonary-stretch-receptors`). Declaring these same
canonical_keys in the seed made `resolveConceptId` resolve to the pinned ids
and emit sparse reuse rows (label restated verbatim, only `exam_signal` +
`+article_ids` added) — confirmed in the built output, and confirmed by the
concept-id diff showing exactly these 3 ids as the only "new" concept ids,
with 0 ids lost anywhere. This is the mechanism the run25 hazard note
describes as blind for `GENERATED_BY` files; `104-CPS-physiology-concepts.md`
is a different, hand-authored file the mechanism does see, so no dedup
mitigation (fresh mint + `conflicts` note) was needed here — genuinely no
duplicate-mint risk this time.

Questions:
- `respiratory-center.drg-vrg-pontine-groups-and-rhythm-generation`: 5 kept
  (nervous control locates the inspiratory centre in the medulla vs cortex/
  apneustic/pneumotaxic; pneumotaxic centre limits inspiration duration;
  pneumotaxic centre inhibits the apneustic centre; "respiratory center
  includes" location question asked twice across different question books
  with an identical option set, reworded stems — both kept as separate
  questions per the Respiratory Portion cluster's own precedent for
  repeated-verbatim-option-set rows).
- `chemoreceptors-respiratory.central-and-peripheral-drive-contributions`:
  3 kept (CO2 narcosis threshold/mechanism; CO2 as the most potent
  respiratory stimulus; peripheral chemoreceptor location/afferents/
  properties).
- `hering-breuer-reflex.pulmonary-stretch-receptors`: 1 kept (which
  mechanism stops inspiration and starts expiration).

**Excluded (6), all genuinely unfixable from the seed layer, not judgement
calls**:
- `all-about-peripheral-chemoreceptors-is-true-except-332ae5b1` — option C's
  text is corrupted at the OCR/extraction stage: a literal Arabic letter
  (waw, U+0648) stands in for the "P" of "PO2", wrapped in RTL/LRM direction
  marks, confirmed by inspecting the raw codepoints. A clean variant of this
  exact option exists from a sibling exam-book occurrence, but the bank
  keeps this occurrence's corrupted text as canonical and there is no
  seed-level field to override option text (only the answer letter can be
  overridden via `answerOverride`) — same class of unfixable defect as the
  leading-`+` hazard.
- `concerning-the-interaction-of-respiratory-centers-in-the-bra-61d1bcea` —
  all four options are truncated OCR fragments (weakest fuzzy-OCR match in
  this cluster, ratio 0.749), and the bank's own answer text contradicts
  standard brainstem-transection physiology (apneustic-centre isolation
  produces apneusis — prolonged inspiration, not the "prolonged expiration"
  this option states). Independently confirmed out of scope: this leaf's own
  article states in its own `evidence_gaps` that brainstem-transection
  experimental evidence was not reached in the reading pass.
- `in-metabolic-acidosis-compensatory-hyperventilation-occurs-i-4b08cc0a` —
  option B's text ("3920 ml/minute; 3920 ml/minute") is garbage carried over
  from an unrelated ventilation-calculation question in the same source PDF
  (column-alignment OCR failure). Effectively a 3-option item once B is
  discounted, below the 4-5 contract, with no seed-level fix available.
- `the-basic-rhythm-of-respiration-is-generated-by-neurons-loca-4d2b32e9` and
  `which-of-the-following-discharges-s-8-1-receptort-fa-ling-be-5358ae60` —
  both already flagged `editorialExcluded` by the bank's own extraction
  (correct answer's letter did not survive OCR).
- `the-respiratory-center-includes-inspiratory-neurons-that-are-373857a5` —
  corrupted OCR merge of two separate questions into one stem, with only 2
  of an original 4 lettered options surviving; cannot be reconstructed to
  the 4-5 option contract or confidently attributed to either underlying
  question.

**No new article-coverage gap this cluster** — the existing article already
teaches everything the 9 kept questions test.

## Clusters fully closed (0 remaining bank rows for that `leaf` tag)

- Cardiac Function (38/38 triaged: 20 kept, 18 excluded) — commit `c7186aa6`.
  Spans `physiology-cardiac-function.ts`, `physiology-cardiac-output-
  formula.ts`, and re-routed rows in `physiology-circulatory-control-
  hemorrhagic-shock.ts` (venous return / AV shunt / athlete's heart / shock
  rows were mistagged "Cardiac Function" in the bank but belong under
  Basic Mechanisms of Circulatory Control). **+1 more this session**: a
  `diacrotic-wave-is-caused-by` row bank-tagged "Pulmonary Compliance" is
  genuinely Cardiac Function content (aortic pressure curve) — added as a
  new question on the existing `aortic-pressure-curve.limbs-and-dicrotic-
  notch` concept, so this cluster is now 39 kept-or-excluded from that
  original count plus this one re-route.
- Organization of the Respiratory System (9/9 triaged: 6 kept, 3 excluded)
  — commit `58d39e81`. New file `physiology-dead-space-and-alveolar-
  ventilation.ts`; additions to `physiology-pleural-mechanics.ts` and
  `physiology-intrapleural-pressure-extremes.ts`. **+2 more this session**:
  two rows bank-tagged "Pulmonary Compliance" are genuinely Organization-of-
  Respiratory-System content (alveolar ventilation formula; physiologic vs
  anatomical dead space) — added to `physiology-dead-space-and-alveolar-
  ventilation.ts`: one new question on the existing `alveolar-ventilation.
  calculation-formula` concept, and one new concept (`dead-space.
  physiologic-equals-anatomical-plus-alveolar`) with its own question.
- **Pulmonary Compliance (27/30 triaged this session: 24 kept, 3 excluded;
  3 more deferred — see below)** — run25. New files:
  - `physiology-lung-volumes-and-capacities.ts` — 3 concepts (lung-volumes-
    and-capacities definitions/relationships, work-of-breathing elastic-vs-
    frictional, obstructive-vs-restrictive PFT pattern), 18 kept + 2
    excluded (a 3-option ERV-calculation row below the 4-5 option contract;
    the bank's own already-flagged unkeyed residual-volume row).
  - `physiology-pulmonary-compliance-and-surfactant.ts` — 2 concepts
    (surfactant reduces-surface-tension-and-increases-compliance;
    pulmonary-compliance rises-in-emphysema/falls-in-fibrosis-oedema-
    surfactant-deficiency), 3 kept + 1 excluded (an unparseable OCR dump of
    an entire unrelated lecture-slide deck).
  - **Article-coverage gap, open**: both files cite the already-live
    `ART-104-PHY-LUNG-RECOIL-AND-SURFACTANT` as `articleId`. A brand-new
    `ART-104-PHY-LUNG-VOLUMES-AND-VENTILATORY-MECHANICS` id was tried first
    (matching the `_example.ts.txt` forward-reference precedent) but failed
    the **real** gate — `medical:simulate` (not just `medical:batch`)
    genuinely errors `article ... does not exist` when a question cites an
    article with no live or sibling-batch record at all; the myo-epithelium
    precedent only works when someone else's batch is expected imminently,
    not for an article nobody has started. Pointing the 18 lung-volumes/
    work-of-breathing/obstructive-restrictive questions at the real, live,
    evidenced `LUNG-RECOIL-AND-SURFACTANT` article clears the gate, but that
    article's prose does not yet teach lung volumes/spirometry or the
    obstructive/restrictive pattern — **only elastic recoil and surfactant**.
    The article-authoring lane should add those three sections (department
    book "Cardiopulmonary (Respiration)", Chapter 2 "Pulmonary Compliance")
    to close this honestly, rather than the citation silently standing in
    for content that was never written.
  - **Cross-pipeline concept-overlap, flagged not merged**: the surfactant
    concept here (`surfactant.reduces-surface-tension-and-increases-
    compliance`) substantively overlaps the live `CON-RES-4D4CBF3BB8AF1E`
    (canonical_key `pulmonary-surfactant.functions-and-causes-of-
    deficiency`), minted by the **written-paper** pipeline into the
    generated `104-CPS-concepts.md`. Not reused: that file carries
    `Generated by scripts/kasr/build-batches.ts`, so `existingConceptIds()`
    treats it as this pipeline's own prior output and skips it — reusing the
    same canonical_key would not produce a safe sparse update, it would
    silently full-overwrite the live record's `blueprint_weight`,
    `exam_signal`, `secondary_node_ids` and every other field this MCQ
    pipeline does not itself populate (documented failure mode in
    `build-batches.ts`'s `reuseNote` comment). Minted fresh instead, with
    the overlap recorded in the concept's own `conflicts` field. Separately,
    a **much larger** live catalogue of lung-volumes/capacities concepts
    (`CON-RES-37824D44CE9505` "FRC is the lung volume remaining after
    normal expiration", `CON-RES-F6F63B084F0575` "FRC formula", and others,
    `learner_years: [3]`, no `104 CPS` module tag, source batch no longer
    in this checkout) already exists per `ART-104-PHY-AIRWAY-ANATOMY-AND-
    DEAD-SPACE`'s own `## notes` field ("a large existing live catalogue,
    Year 3 pulmonology course... from a different textbook"). The new
    `lung-volumes-and-capacities.definitions-and-relationships` concept here
    is a fresh, deliberately-distinct mint against that catalogue too, for
    the same reason. **Needs a chief-of-staff ruling** on whether/how the
    MCQ pipeline's Year-1 concepts should consolidate with either of these
    two other-pipeline catalogues — not something a bounded authoring
    session should resolve by guessing at a cross-pipeline/cross-textbook
    merge.
  - **3 rows deferred, not authored, not lost**: `concerning-compliance-of-
    large-arterial-blood-vessels-one-is-9eea479c`, `concerning-compliance-
    of-the-stomach-one-is-true-ec247c63`, and `which-one-can-increase-the-
    compliance-of-blood-vessels-3a01102d` are bank-tagged "Pulmonary
    Compliance" but are genuinely **general compliance** content (arterial
    elastin/collagen recruitment, gastric smooth-muscle plasticity and
    Laplace's law, oestrogen's vasodilatory effect) — none of it pulmonary.
    The first and third belong under the not-yet-started **Vascular
    Function** cluster (35 remaining bank rows, no dedicated file exists
    yet); the second is arguably GI physiology, outside this module's own
    cardiopulmonary scope entirely and worth a scope ruling before anyone
    authors it. Left unclaimed in the bank (no seed file references these
    3 keys) so the next Vascular Function pass picks them up — do **not**
    recount them as still-open Pulmonary Compliance work.

- **Respiratory Portion (28/30 triaged this session: 28 kept, 2 excluded)**
  — run25, extends the already-existing `respiratory-respiratory-
  portion.ts` (kept its 1 existing concept + 1 question; article
  `ART-104-HIS-RESPIRATORY-PORTION` was already live in `104-CPS-
  histology.md`, so no article-coverage gap this time). Added 4 new
  concepts + 1 reused concept:
  - `respiratory-portion.structural-sequence-and-pores-of-kohn` (bronchiole
    -> duct -> sac -> alveolus; respiratory bronchiole as the true
    conducting-to-respiratory transition; pores of Kohn), 8 Qs.
  - `blood-air-barrier.four-layers` (surfactant film / type I pneumocyte /
    fused basal lamina / capillary endothelium; type II pneumocyte
    deliberately excluded), 2 Qs.
  - `interalveolar-septum.composition` (delicate, capillary-rich, elastic +
    reticular fibres, resident phagocytes — not smooth muscle/collagen/
    avascular), 2 Qs.
  - `respiratory-portion.clinical-correlations` (emphysema mechanism;
    congenital cystic disease of the lung), 2 Qs.
  - Extended `pneumocyte-type-i-vs-type-ii.structure-and-function` (already
    existed) with 8 more questions — the bank asks this comparison
    repeatedly across several source books with reworded stems/options.
  - **Reused `surfactant.reduces-surface-tension-and-increases-compliance`**
    (minted in the Pulmonary Compliance cluster's `physiology-pulmonary-
    compliance-and-surfactant.ts`) for 6 histology-flavoured surfactant
    rows (who secretes it, RDS risk in infants of diabetic mothers, what
    its absence does) — declared identically in both files per
    `build-batches.ts`'s cross-leaf concept merge; **keep the two copies in
    sync if either is edited**, since the emitted concept always takes the
    first leaf's definition. Its `conflicts` overlap note (vs the live
    written-paper-pipeline concept) applies here unchanged.
  - Excluded: `surfactant-2c89308b` (2 surviving options, below the 4-5
    contract, and none of its 3 `variants` fully agree with this
    occurrence's own option set either) and `afferents-which-may-
    stimulate-inspiratory-centers-include` (bank-tagged leaf mismatch —
    genuinely Control-of-Respiration content — and already unkeyed per the
    bank's own extraction).

## Hazard confirmed this session (beyond the two below)

- **A forward-referenced article that does not exist anywhere is a real
  `medical:simulate` error, not a tolerable one.** The `_example.ts.txt`
  precedent ("`ART-101-HIS-MYO-EPITHELIUM` does not exist yet; another lane
  is writing it") only describes a *template*, never gate-tested — it is not
  a general licence to cite a phantom article id. `medical:simulate`
  genuinely reports `article ... does not exist` for one with no live or
  sibling-batch record, same as `medical:batch`'s `library_ids ... is not an
  article that exists`. If no suitable article exists yet, either write one
  (with real evidence — `span_ids` is on the audit's must-carry-a-value
  list, so a Draft article still needs at least one real span/claim pair)
  or point at the closest existing, live, evidenced article and flag the
  resulting content-coverage gap explicitly (as done here) — do not leave a
  citation to nothing and call the batch gate-clean.

## How to recompute "what's left" (do this first, don't trust stale counts)

```
node -e "
const fs=require('fs'), path=require('path');
const dir='scripts/kasr/seeds/mcq/104-CPS';
const used=new Set();
for(const f of fs.readdirSync(dir).filter(f=>f.endsWith('.ts'))){
  const c=fs.readFileSync(path.join(dir,f),'utf8');
  const re=/(?:^|[^a-zA-Z])key:\s*[\"']([^\"']+)[\"']/g; let m;
  while((m=re.exec(c))) used.add(m[1]);
}
const bank=JSON.parse(fs.readFileSync('scripts/kasr/extract/104-CPS/mcq-bank.json','utf8'));
const remaining=bank.questions.filter(q=>!used.has(q.key));
const byLeaf={};
for(const q of remaining) byLeaf[q.leaf||'(none)']=(byLeaf[q.leaf||'(none)']||0)+1;
Object.entries(byLeaf).sort((a,b)=>b[1]-a[1]).forEach(([l,c])=>console.log(c,l));
"
```
As of run27's HEAD: 54 A-V Connections, 47 Electrical Activity of the
Heart, 36 Mechanical Properties of Cardiac Muscle, 35 Vascular Function, 34
Veins, 26 Spleen, 24 Gas Transport by the Blood, 21 Lymph node, 19
Conducting Portion, 18 Basic Mechanisms of Circulatory Control, 17 Tonsils,
13 Chromosomal Aberrations, 13 The heart, **11 Arteries** (deliberately
left unclaimed — see the Arteries section above; NOT still-open Arteries
authoring work), 1 each of Human Chromosome / Thymus / Special Circulation
/ Alveolar Phagocytes. (456 rows have `leaf:"(none)"` in the bank —
topic-only, lower priority.)

## Next action (resume-first)

**run28's dispatched A-V Connections cluster is now closed (54/54
accounted for — 40 kept, 12 excluded, 7 deliberately left unclaimed).**
Per the dispatch brief's stated order, **Veins (34 bank rows) is next** —
6 more Veins rows were already flagged mistagged-under-Arteries by run27
(see the Arteries section above) and are not yet claimed by any file;
check `cardiovascular-*.ts` files first, since this session did not touch
Veins. run28 did not reach Veins this session (A-V Connections alone took
three commits — two authoring, one exclude-tracking cleanup — and a
substantial dedup-research pass that turned up a whole unimported
histology-concepts batch) — this is a clean stop point, not an
interruption.

**Superseded, kept for history — run27's own closing note:**
Arteries: 58/58 accounted for (43 kept, 6 excluded, 9 left unclaimed for
Veins/Spleen/Vascular Function — see the Arteries section above).

**Superseded, kept for history — run26's own closing note:**
Control of Respiration: 15/15 triaged (9 kept, 6 excluded), 0 remaining
bank rows. Gas exchange in the lung: 5/7 triaged (3 kept, 2 excluded), 2
left unclaimed for their true clusters (A-V Connections; Gas Transport by
the Blood — see above, do not recount as open gas-exchange work, but do
not treat as "0 remaining" for THIS leaf's own recompute script either,
since it still counts leaf-tag matches). Pulmonary Compliance and
Respiratory Portion were closed in run25.

**This session's own dedup finding for the next lane to know about**: the
live "Hypoxia" topic article (`ART-RES-TOP-265990F7BD`, Year 3, no 104 CPS
module) and its 12 linked concepts are a THIRD other-pipeline catalogue
alongside the two already documented (Pulmonary Compliance's FRC/lung-
volumes catalogue; the written-paper `GENERATED_BY` surfactant concept) —
add it to the standing list anyone touches when authoring hypoxia/shunt/
anaemia-adjacent respiratory content.

**Stale, superseded by run28 — kept for history only.** The paragraph
below described counts before Arteries and A-V Connections were closed;
see the recompute re-run just after it for the real, current picture.

Remaining work as of **run28's own HEAD** (rerun the recompute script,
don't trust this count once anyone else has committed): 47 Electrical
Activity of the Heart, 36 Mechanical Properties of Cardiac Muscle, 35
Vascular Function (+5 deferred from this session's A-V Connections pass,
+2 from Pulmonary Compliance, +1 from Gas-exchange = 43 effectively), 34
Veins (+6 deferred from Arteries = 40 effectively — **Veins is next**),
26 Spleen (+2 deferred from Arteries = 28 effectively), 24 Gas Transport
by the Blood (+1 deferred = 25 effectively), 21 Lymph node, 19 Conducting
Portion, 18 Basic Mechanisms of Circulatory Control (+2 deferred from this
session's A-V Connections pass = 20 effectively), 17 Tonsils, 13
Chromosomal Aberrations, 13 The heart, **11 Arteries** (deliberately left
unclaimed, not open Arteries work — see the Arteries section above),
**7 A-V Connections** (deliberately left unclaimed, not open A-V-
Connections work — see the A-V Connections section above), 3 Pulmonary
Compliance (deferred, not open work), 2 Gas exchange in the lung
(deferred, not open work), 1 each of Human Chromosome / Thymus / Special
Circulation / Alveolar Phagocytes, plus 456 `leaf:"(none)"` rows
(topic-only, lower priority).

Of the CVS histology/anatomy leaves, **Arteries and A-V Connections are
now closed** (dedicated files exist: `cardiovascular-artery-
classification.ts`, `cardiovascular-capillary-exchange.ts`,
`cardiovascular-av-connections-histology.ts`). **Veins, Electrical
Activity of the Heart, Mechanical Properties of Cardiac Muscle and
Vascular Function have no dedicated file yet** — check `cardiovascular-
*.ts` files first in case a future session already claimed some of them,
and check `104-CPS-histology-concepts.md` / `104-CPS-physiology-
concepts.md` for pinned, unimported concepts before minting anything, per
the heightened CVS dedup mitigation — this session found a whole
unimported histology-concepts batch already covering large parts of A-V
Connections, and the same file plausibly covers some of Veins and Vascular
Function too (it was authored as one pass across every CVS histology
sub-heading, not leaf by leaf).

## Hazards hit and confirmed this session (beyond the dispatch brief)

- **`medical:simulate` has no `--with` flag.** Unlike `medical:batch`,
  passing `--with X` to `simulate-content-import.mjs` silently drops `X`
  from the files it loads (its arg parser excludes anything immediately
  after any `--flag`). Pass every file — concepts, mcq-concepts, articles,
  then the question file — as **plain positional arguments**, concepts/
  articles before the question file that references them.
- **A literal leading "+" in an extracted option's text breaks import.**
  `medical:batch` flags it directly: `answer_X starts with "+", but this
  column does not take an append — the record keeps a value nothing will
  ever match`. Not fixable from the seed (no stem/option override field
  exists) — exclude the question. Hit twice on the same source page in
  the Organization-of-Respiratory-System cluster (`+4 mm Hg` / `+6 mm Hg`
  distractors on an intrapleural-pressure question and its corrupted-stem
  sibling).
- The `leaf` field in the bank is unreliable for routing, not just
  occasionally: 12 of Cardiac Function's 38 remaining rows (venous
  return, AV shunt, athlete's heart, exercise circulation, hemorrhagic
  shock) were genuinely Basic-Mechanisms-of-Circulatory-Control content
  mistagged. Always read the stem before trusting the bank's `leaf` tag.
