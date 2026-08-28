# 104 CPS MCQ authoring — progress

Branch: `kasr-104-author-run26` (off `kasr-104-author-run25` @ `14f77eef`,
pushed to origin). run25's own base was `kasr-104-author-run23` @ `29aff753`;
run24 was interrupted mid-Pulmonary-Compliance and never committed anything —
its work is gone, redone cleanly in run25.

Bank total: 1289 questions in `scripts/kasr/extract/104-CPS/mcq-bank.json`.
As of this session's HEAD: **352 kept / 1114 keyed**, 57 excluded, 83 MCQ
concepts.

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
As of this session's HEAD: 58 Arteries, 54 A-V Connections, 47 Electrical
Activity of the Heart, 36 Mechanical Properties of Cardiac Muscle, 35
Vascular Function, 34 Veins, 26 Spleen, 24 Gas
Transport by the Blood, 21 Lymph node, 19 Conducting
Portion, 18 Basic Mechanisms of Circulatory Control, 17 Tonsils, 15
Control of Respiration, 13 Chromosomal Aberrations, 13 The heart, 1 each
of Human Chromosome / Thymus / Special Circulation / Alveolar Phagocytes.
(456 rows have `leaf:"(none)"` in the bank — topic-only, lower priority.)

## Next action (resume-first)

**Both of this session's (run26's) dispatched clusters are now closed.**
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

Remaining "Lungs"-adjacent work, not yet started, from the recompute
script (rerun it, don't trust this count once anyone else has committed):
58 Arteries, 54 A-V Connections, 47 Electrical Activity of the Heart, 36
Mechanical Properties of Cardiac Muscle, 35 Vascular Function (+2 deferred
from Pulmonary Compliance, +1 deferred from this session's gas-exchange
pass = 38 effectively), 34 Veins, 26 Spleen, 24 Gas Transport by the Blood
(+1 deferred from this session = 25 effectively), 21 Lymph node, 19
Conducting Portion, 18 Basic Mechanisms of Circulatory Control, 17
Tonsils, 13 Chromosomal Aberrations, 13 The heart, 1 each of Human
Chromosome / Thymus / Special Circulation / Alveolar Phagocytes, plus 456
`leaf:"(none)"` rows (topic-only, lower priority). None of the CVS
histology/anatomy leaves have a dedicated seed file yet as of this
checkpoint — check `cardiovascular-*.ts` files first, they may already own
some of these.

Then move to the CVS histology/anatomy leaves (Arteries 58, A-V
Connections 54, Veins 34, Electrical Activity of the Heart 47,
Mechanical Properties of Cardiac Muscle 36, Vascular Function 35) — all
big, none started as dedicated files yet as of this checkpoint (check
`cardiovascular-*.ts` files first, they may already own some of these).

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
