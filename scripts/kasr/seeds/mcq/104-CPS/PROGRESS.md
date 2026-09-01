# 104 CPS MCQ authoring — progress

## run31 (off run30 @ b5fc83c3) — Lungs anatomy CLOSED (2/2), Spleen CLOSED
(26/28: 21 kept, 5 excluded, 2 escalated)

Two commits, each ran the full build+batch+simulate+audit+duplicate-keys
gate before committing. Branch `kasr-104-author-run31`, pushed to origin.

**Lungs anatomy (both down-payment rows run30 flagged)**:
- New `anatomy-lungs-surface-features.ts` (articleId
  ART-104-ANA-LUNG-SURFACE-FEATURES): sparse reuse of
  `lung.mediastinal-surface-impressions` (CON-RES-DC1111DA6DD151, pinned
  in 104-CPS-anatomy-concepts.md) — 1 kept: left lung's mediastinal
  impression is the descending thoracic aorta (behind the hilum), not
  SVC/IVC (right-lung impressions).
- New `anatomy-azygos-vein-relations.ts` (articleId
  ART-104-ANA-THORACIC-WALL-VEINS): fresh mint
  `azygos-vein.arch-and-relation-to-right-lung-root` after find-existing
  returned "safe to create" for 4 different search terms — 1 kept: the
  azygos vein runs directly behind the root of the right lung before its
  arch turns forward above that same root.
- Gate: 466 kept (+2), 84 excluded (unchanged), 104 MCQ concepts (+2: 1
  sparse-reuse first-appearance + 1 fresh mint). 0 ids lost. medical:batch
  4 pre-existing errors only. medical:simulate errors: [].

**Spleen (26 bank-tagged rows + 2 deferred from Arteries by run27 —
choose-the-correct-statement-concerning-the-malpighian-corpuscle,
penicillar-arteriole-is-3-parts — = 28 effectively)**:

New `lymphatic-spleen-histology.ts` (articleId ART-104-HIS-LYMPHOID-ORGANS,
the same comprehensive lymph-node/spleen/tonsil/thymus article
`lymphatic-lymph-node.ts` and `lymphatic-thymus.ts` already use — a
GOLDMINE of pinned, hand-authored, unimported concepts this article's own
`related_concepts` already names, most sitting in
`104-CPS-practical-concepts.md`):
- 4 sparse reuses (all found via find-existing.mjs / direct id lookup
  BEFORE minting anything, per the heightened dedup mitigation):
  - `spleen.capsule-trabeculae-white-pulp-and-red-pulp`
    (CON-HEM-2F3CB0082551D1) — 2 kept: trabeculae composition, capsule
    covered by peritoneum.
  - `spleen.red-pulp-billroth-cords-and-stave-cell-sinusoids`
    (CON-HEM-594B1725902DAD) — 4 kept: red pulp = cords + sinusoids,
    stave-cell lining, Billroth cords infiltration, red-pulp-shows-cords.
  - `splenic-white-pulp.zones-and-cellular-composition`
    (CON-HEM-7B050DE7FE2B80, in the *written-paper* pipeline's own
    generated `104-CPS-concepts.md` — NOT `GENERATED_BY` this MCQ
    pipeline, so `existingConceptIds()` does see it) — **9 kept**, the
    single biggest concept this session touched: four-zone architecture,
    marginal-zone mixed T+B population, six duplicate-occurrence
    "thymus-dependent zone = PALS" rows (three of them the lymph-node-
    paracortex/spleen-PALS cross-organ pairing), plus the
    Malpighian-corpuscle follicular-zone row deferred from Arteries.
  - `spleen.open-closed-and-open-and-closed-circulation-theories`
    (CON-HEM-4D47090A0B7561) — 3 kept: closed theory, trabecular-artery→
    follicular-arteriole and white-pulp-arteriole→penicillar-arteriole
    sequence steps.
- 2 fresh mints, both search-clean (`find-existing.mjs` "functions of the
  spleen" / "destruction of old red cells spleen" / "sheathed arteriole"
  / "penicillar arteriole" — all "safe to create"):
  - `spleen.functions-filtration-storage-and-destruction-of-old-rbcs` (1
    kept) — fully grounded in the article's own Mechanism section, no
    gap.
  - `penicillar-arteriole.three-segments-pulp-sheathed-and-terminal` (1
    kept, the Arteries-deferred row) — **gap disclosed**: the article
    names the penicillar arteriole's origin (central arteriole) and end
    (terminal arterial capillaries) but not its three named intermediate
    segments (pulp arteriole, sheathed/ellipsoid arteriole) — standard,
    undisputed histology, flagged for the article-authoring lane.
- 5 excludes, bookkept: 1 corrupted stem (bled with a second question's
  own opening — "regarding-the-white-pulp..."), 1 three-option contract
  violation ("billroth-cords-are-part-of"), 3 already bank-flagged
  `editorialExcluded` rows.

Extended existing `lymphatic-thymus.ts` (+1 Q, leaf-mismatch reroute):
`small-round-shape-with-acidophilic-mass...` (Hassall's corpuscle
identification, bank-tagged "Spleen" but genuinely thymus) routed onto
this file's **own already-existing** concept
`thymus.hassalls-corpuscles-cortex-medulla-contrast-and-reticular-cell-
functions` (CON-HEM-3F5E8C649251F1) — no new search needed, no new
duplicate introduced by choosing this over bringing in the OTHER pinned
Hassall's-corpuscle record into a different file.

**Duplicate-overlap found, not created — needs a future consolidation
pass**: `thymus.hassalls-corpuscles-cortex-medulla-contrast-and-reticular-
cell-functions` (CON-HEM-3F5E8C649251F1, already in `lymphatic-thymus.ts`
from an earlier session) and `CON-HEM-10B2E783E164FD`
(`thymus.hassalls-corpuscle-structure-and-location`, in
`104-CPS-practical-concepts.md`) are two **separately-pinned** records
covering adjacent Hassall's-corpuscle content — one a broad cortex/
medulla-contrast definition, the other a narrow practical-station
identification concept. Pre-existing (from before this session), found
while searching, not introduced by this session.

**2 genuine source conflicts found, deliberately NOT authored** (left
undeclared in any seed file — no seed references these keys at all — per
the run30 brachiocephalic-vein precedent: escalate a printed-key-vs-
pinned-concept contradiction rather than silently pick a side):
- `irregular-barrel-shape-that-lined-by-fenestrated-cells-non-c-43d8f714`:
  the bank's own printed ("same-file", high-confidence) key answers
  "Red pulp" (A), but the pinned, department-book-sourced concept
  `CON-HEM-594B1725902DAD` attributes "barrel shaped... fenestrated...
  stave cells... non-continuous basal lamina" specifically to **blood
  sinusoids** (option B) — a distinct red-pulp component from Billroth
  cords, which have no such shape/lining at all. Red pulp as a whole is
  not itself barrel-shaped.
- `trabeculae-divide-spleen-into-024bb379`: the bank's own printed key
  answers "regular Cortex, irregular medulla" (C) — but cortex/medulla
  terminology **does not exist for the spleen at all** (it is lymph-node/
  thymus vocabulary); the pinned concept `CON-HEM-2F3CB0082551D1` states
  splenic trabeculae divide the organ into **irregular compartments**
  throughout, matching option A ("irregular Compartment") instead.
Both need a chief-of-staff / Omar ruling. Concept ids noted above for
whoever picks these up.

**Recompute confirms the closure**: after this session's two commits, the
"what's left" script shows exactly 2 remaining "Spleen"-tagged rows
(matching the 2 escalated conflicts above) and 3 remaining "Arteries"-
tagged rows (was 5 before this session; the 2 closed here were genuinely
splenic content).

Gate (Spleen commit) — build-batches.ts "104 CPS": 487 MCQ questions kept
(was 466, +21), 89 excluded (was 84, +5), 110 MCQ concepts (was 104, +6: 4
sparse-reuse first-appearances + 2 fresh mints). Additive-only diff: 0 ids
lost anywhere; +2 real fresh-mint concept ids, +4 pinned concepts' first
appearance in this pipeline's own file, +21 QM-104-* ids. medical:batch
(10-file --with recipe): items 487, fieldsUsed 43, errors 4 — the 4
pre-existing respiratory-histology option-count errors, 0 new.
medical:simulate (positional, 11 files): errors: [], skipped: [].
medical:audit --source: total 570 errors (systemic, pre-existing); 4
involving my 2 fresh-mint ids (1 shared atomicClaimIds-missing bulk line +
1 "references unknown resource" line each) — 0 real errors introduced;
all 21 new QM-104-* ids show 0 audit errors. medical:duplicate-keys: 0
canonical key collisions; 1 pre-existing label collision (Aspirin/102
INT, unrelated).

## Next action (resume-first, run31's own closing note)

Both of this session's dispatched clusters (Lungs anatomy, Spleen) are now
closed, modulo the 2 escalated Spleen conflicts above (needs a human
ruling, not further authoring). Per the "what's left" recompute just
above, the next-largest untouched clusters are **Electrical Activity of
the Heart (47 remaining, the largest untouched CVS leaf)**, **Mechanical
Properties of Cardiac Muscle (36)**, and **Vascular Function (35)** — none
has a dedicated MCQ seed file yet. Check `104-CPS-physiology-concepts.md`
/ `104-CPS-histology-concepts.md` for pinned, unimported concepts before
minting anything on any of these, per the heightened dedup mitigation —
this session's own experience (a comprehensive, already-hand-authored
lymphoid-organs article/concept-set sitting unimported) suggests the same
may be true here.

Branch: `kasr-104-author-run30` (off `kasr-104-author-run29` @ `39521cf0`,
pushed to origin). run29's own base was `kasr-104-author-run28` @ `3af4de1e`;
run28's own base was `kasr-104-author-run27` @ `bd7e9f9b`;
run27's own base was `kasr-104-author-run26` @ `1314b2ff`; run26's own base
was `kasr-104-author-run25` @ `14f77eef`; run25's own base was
`kasr-104-author-run23` @ `29aff753`; run24 was interrupted mid-Pulmonary-
Compliance and never committed anything — its work is gone, redone cleanly
in run25.

Bank total: 1289 questions in `scripts/kasr/extract/104-CPS/mcq-bank.json`.
As of this session's (run30's) HEAD: **464 kept**, 84 excluded, 102 MCQ
concepts. (run29's own HEAD was 453 kept, 82 excluded, 98 MCQ concepts.)

## The heart (13/13 bank-tagged rows accounted for this session — run30,
first CVS leaf closed after Veins) — 11 kept, 2 excluded, 0 left unclaimed
for other clusters (2 genuinely belong to not-yet-started clusters, see
below, but are documented rather than silently dropped). Plus a **down
payment on the next leaf**: 2 of the 4 gross-anatomy rows run29 surfaced
(bank-tagged "Veins", genuinely heart/thorax anatomy) authored here too,
since the dispatch brief scoped this session as "Heart (histology/
anatomy)" explicitly; the other 2 (both genuinely Lungs anatomy) are left
for the next session, plus 1 more heart-anatomy row found and deliberately
NOT authored due to a genuine source conflict (below). Five commits: wall-
layers reuse, Purkinje fresh mint, Frank-Starling reroute + fix, coronary-
circulation reuse, heart gross-anatomy reuse — each ran the full
build+batch+simulate+audit gate before committing.

**MINT DISCIPLINE, done properly this time**: `find-existing.mjs` was run
for every candidate BEFORE minting anything, per the heightened CVS
mitigation (and run29's own self-caught precedent of what happens when
this is skipped).

**cardiovascular-heart-wall-and-valves.ts** (already-existing file, this
exact leaf's own `modulePath` and `articleId` — extended, not replaced):
- **Sparse reuse, not a fresh mint**: `find-existing.mjs "epicardium"` /
  `"myocardium"` surfaced a hand-authored, pinned record
  (`CON-CVS-CC8835108F512C`, canonical_key `heart-wall.three-layers-
  epicardium-myocardium-endocardium`) already sitting in
  `104-CPS-histology-concepts.md`, already cross-linked as this file's own
  article's (`ART-104-HIS-HEART-AND-VESSEL-WALL`) `related_concepts`. 6
  kept questions: 5 wall-layer identification rows (epicardium/myocardium/
  pericardium/subendocardium distinguished by structure) + 1 conducting-
  system-location row (subendocardial connective tissue, not the
  myocardium — the article's own "Common misconceptions" section states
  this exact point).

**New file `cardiovascular-conducting-system-histology.ts`** (articleId
`ART-104-ANA-HEART-SKELETON-AND-CONDUCTION`, a real, live, evidenced
Draft anatomy article — read in full before authoring; deliberately a
different article from the file above, since no 104-CPS histology article
states Purkinje fibres' own cellular-level picture):
- **Fresh mint after a real search, overlap found and recorded, not
  reused**: `cardiac-conducting-system.purkinje-fibre-site-and-
  histological-characteristics` (1 kept: the "except" question on
  diameter/nucleus/sarcoplasm/striations/intercalated-discs). `find-
  existing.mjs "purkinje"` / `"subendocardial"` returned no 104-CPS-scoped
  hit, but surfaced `CON-MSK-5EA95D36121EF8`
  (`docs/import-ready/concept/103-BMS-histology-concepts.md`, canonical_key
  `cardiac-muscle.purkinje-fibres.histological-characteristics`) — a
  **different Kasr module's own pending batch**, fully evidenced, stating
  this exact idea. That record's own `rejectedMergeCandidateIds` field had
  already considered and rejected merging with "the 104 CPS conduction-
  system concepts" on the grounds that those state function, not
  histology — but this leaf's own bank row tests exactly the histological
  picture 103-BMS's record already owns. Not reused: `existingConceptIds()`
  for module "104 CPS" only scans `docs/Kasr-Source-Imports/concept/
  104-CPS-*.md` (confirmed by reading `build-batches.ts:151-180` directly),
  so a different module's file in `docs/import-ready/` is invisible to it,
  and `mintConceptId` under subject `cvs` would not reproduce
  `CON-MSK-5EA95D36121EF8`'s own MSK-system mint in any case — the same
  "different pipeline/root, no safe sparse-update path" situation
  documented repeatedly elsewhere in this branch for GENERATED_BY-blind and
  cross-catalogue overlaps. Minted fresh under 104 CPS instead, overlap
  recorded in the concept's own `conflicts` field — **needs a
  chief-of-staff ruling** on consolidation once 103-BMS's own batch is
  imported.
  **Gap disclosed**: `ART-104-ANA-HEART-SKELETON-AND-CONDUCTION` states the
  conducting system is specialised cardiac muscle (not nerve), names the
  AV bundle's branches, the moderator band link and Purkinje fibres as
  their terminal expression, but does not itself state the cellular LM
  picture (diameter, nucleus, sarcoplasm, striations, intercalated discs,
  connective-tissue sheath) this question tests — standard, undisputed
  histology, already fully evidenced in the sibling 103-BMS record;
  flagged for the 104 CPS histology-article-authoring lane.

**physiology-cardiac-preload-frank-starling.ts** (already-existing file,
leaf "Mechanical Properties of Cardiac Muscle" — a **leaf-mismatch
reroute**: both rows bank-tagged "The heart" restate this file's own
already-claimed Frank-Starling/preload concept, the leaf-field-unreliable
hazard confirmed yet again, no new search needed):
- 1 kept (`according-to-starling-law-the-strength-of-cardiac-muscle-
  con-4e1e6c59`): restates "strength of contraction proportional to degree
  of fibre stretch" in different wording from this file's existing 4
  questions.
- **Self-caught defect, same class as run27's/run29's own precedent**:
  `in-the-whole-intact-heart-bef9de81` was drafted as a kept question on
  first pass, but this commit's own `medical:batch` run flagged it ("3
  options — the contract is 4 to 5") — the bank extraction genuinely never
  recovered an option C for this row. Converted to `exclude: true` before
  the final gate run; the fix is reflected in the commit's own gate-line
  history (first run: 5 errors, 465 kept; after fix: back to the 4
  pre-existing, 464 kept).
- 1 more excluded (`according-to-starling-law-the-tension-of-isometric-
  cardiac-m-0dfbb05b`): already unanswerable in the bank itself
  (`answer: null`, `editorialExcluded: true`) — no printed key, and none of
  the five options restates Starling's own core relationship.

**New file `physiology-coronary-circulation.ts`** (articleId
`ART-104-PHY-CORONARY-AND-PULMONARY-CIRCULATION`, leaf "Special
Circulation" — this session also closes that leaf's own single remaining
bank row as a side effect):
- **Sparse reuse, not a fresh mint**: `find-existing.mjs "coronary flow"`
  surfaced a hand-authored, pinned record (`CON-CVS-B29600F656A34B`,
  canonical_key `coronary-circulation.phasic-flow-and-autoregulation`,
  `module_subject` "104 CPS > Physiology > Cardiovascular System > Special
  Circulation" — this exact leaf) already sitting in `104-CPS-physiology-
  concepts.md`, pinned to this same live article. 2 kept: `the-left-
  coronary-flow-e45593b5` (bank-tagged "The heart" — leaf-mismatch reroute,
  left-vs-right phasic pattern) and `which-of-the-following-is-correct-
  0954638f` (Special Circulation's own last remaining row — diastole-
  dominant supply + subendocardial vulnerability + metabolic-over-neural
  regulation, a 5-option comprehensive-answer item). **Special Circulation
  leaf is now 0 remaining.**

**New file `cardiovascular-heart-gross-anatomy.ts`** (articleId
`ART-104-ANA-HEART-CHAMBERS`, a real, live, evidenced Draft anatomy
article — the first CVS **gross anatomy** MCQ file this session opens,
down-payment on the resume-first note below):
- **Sparse reuse, not a fresh mint**: `find-existing.mjs "sternocostal"`
  surfaced a hand-authored, pinned record (`CON-CVS-74C0F9BB0D3490`,
  canonical_key `heart.external-features`) already sitting in
  `104-CPS-anatomy-concepts.md`, cross-linked as this same article's own
  `related_concepts`. 1 kept: `regarding-the-anatomy-of-the-heart-
  following-statements-are-62f7c901` (bank-tagged "Veins" — one of run29's
  own 4 down-payment rows; heart surfaces/chambers, the RV-vs-LV anterior
  relationship as the false statement).
  **Gap disclosed**: neither this article nor the pinned concept states in
  one sentence that the RIGHT ventricle specifically predominates on the
  sternocostal surface / lies anterior to the left — defensible by
  elimination from what both do state (apex + diaphragmatic surface are
  left-ventricular) and from the sibling coronary-arteries article (left
  coronary's anterior interventricular branch supplies only "a strip of
  the right ventricle" on the sternocostal surface), but not spelled out
  explicitly; flagged for the anatomy-article-authoring lane.

**A genuine source conflict found, authored around rather than
guessed past** — the second of run29's 4 down-payment rows,
`regarding-brachiocephalic-veins-one-of-the-following-stateme-8aac4731`
(bank answer B: "They drain lymph from whole body" marked as the false/
"incorrect" statement, `answerConfidence: editorial-no-printed-key` — no
printed key exists, an earlier pipeline stage's own editorial guess). But
`find-existing.mjs "brachiocephalic vein"` surfaced a hand-authored,
pinned, department-book-sourced record (`CON-CVS-9CDFD3C60A2550`,
canonical_key `brachiocephalic-veins.formation-and-course`,
`104-CPS-anatomy-concepts.md`) whose own definition states, of the two
veins together: "drain... lymph from the whole body" — treating this as a
true, if collective/elliptical, statement (right vein via the right
lymphatic duct, left vein via the thoracic duct, so between the two nearly
all the body's lymph reaches the venous system through them). This
**directly contradicts** the bank's own un-keyed editorial guess that the
same statement is the row's false "except" answer. Rather than force the
bank's unverified guess into a kept question, or silently substitute my
own contradicting judgement, this row is **left unauthored**, the
conflict recorded here for a human ruling — this is exactly the kind of
"drift to rule on" the manual asks a lane to escalate rather than resolve
by guessing. The concept id (`CON-CVS-9CDFD3C60A2550`) is noted for
whoever picks this up.

**2 rows left deliberately unclaimed for their true, not-yet-started
clusters** (no seed file references these keys — do not recount as
still-open "The heart" work):
- `increasing-the-inotropic-state-of-the-myocardium-will-4a21ac61`
  (pressure-volume-loop width / end-systolic-volume effects of inotropy) —
  genuinely **Mechanical Properties of Cardiac Muscle** (36 remaining
  rows). `find-existing.mjs "inotropic"` surfaced a pinned
  `104-CPS-physiology-concepts.md` concept
  (`cardiac-contractility.inotropy-and-lusitropy.camp-pka-mechanisms`,
  `CON-CVS-BF82D6F52B72C9`) but it teaches the beta-adrenergic/cAMP/PKA
  **molecular mechanism** of inotropy, not the PV-loop/force-velocity
  **mechanical consequence** this row tests — genuinely distinct
  objectives per the tiebreaker rule, so a NEW concept is needed, out of
  this session's scope; flagged with its likely cross-link target.
- `ecg-record-gives-valuable-information-about-all-of-the-follo-68820593`
  (ECG's own diagnostic scope: rhythm/chamber-size/ischaemia yes, cardiac
  output no) — genuinely **Electrical Activity of the Heart** (47
  remaining rows, the largest untouched CVS leaf). No dedicated 104 CPS
  ECG article/concept file exists yet; flagged as a starting point for
  whoever opens that leaf.

**Down payment on the next leaf, 2 rows deliberately left for next
session** (both well-supported by an article already read in full this
session — do not recount as still-open "The heart" work, and do not
re-search from scratch):
- `the-mediastinal-surface-of-the-left-lang-shows-an-impression-24a9bb35`
  (left lung's mediastinal-surface impression for the descending thoracic
  aorta, not SVC/IVC which are right-lung impressions) and
  `which-vessel-passes-directly-behind-the-right-hilum-01be7ae1` (azygos
  vein) are both genuinely **Lungs anatomy**, directly supported by
  `ART-104-ANA-LUNG-SURFACE-FEATURES` (read in full this session — its
  Structure section states exactly the left-lung mediastinal-surface
  groove list, including "behind the hilum, the groove for the descending
  thoracic aorta"). The azygos row needs one more source check (the exact
  "passes directly behind" phrasing wasn't found verbatim; the cardiac-
  sling passage in `ART-104-ANA-HEART-VESSELS-NERVES-FIXATION` — "the
  azygos arch and right pulmonary artery round the right principal
  bronchus" — is the closest match so far).

## Veins (34 bank-tagged rows + 6 rows deferred from Arteries = 40
accounted for this session — run29) — 9 kept via 2 sparse reuses in a new
file, 1 kept via a leaf-mismatch routing onto an existing concept in
`cardiovascular-artery-classification.ts`, 7 kept via a fresh mint in a
second new (physiology) file, 4 more questions routed onto already-existing
concepts in 2 other files, 10 excluded (2 already bank-flagged, 8 found
this session), 8 left deliberately unclaimed for their true clusters.
Three commits — two authoring, one dedup-correction — each running the full
build+batch+simulate+audit gate before committing.

**A dedup-mitigation catch, corrected before this branch goes anywhere
further** (documented in full since the dispatch brief specifically called
out keeping the 0-dup streak): the first authoring commit minted 4 fresh
concepts for `cardiovascular-veins-histology.ts` on the strength of
grep-based reasoning rather than actually running `find-existing.mjs` for
each one first — a shortcut the heightened CVS mitigation exists precisely
to prevent. Running the tool properly immediately afterward (prompted by
writing this very PROGRESS entry) surfaced two hand-authored, pinned,
unimported concepts already sitting in `104-CPS-histology-concepts.md`,
covering the same content in more depth:
- `CON-CVS-B29610035B568D` (`vein-classification.venule-medium-and-large-
  vein-histology`, `module_subject` "104 CPS > Histology > Cardiovascular
  System > Veins" — this exact leaf) already teaches the venule, medium
  vein and large vein (inferior vena cava) in one classification sweep —
  subsuming what had been minted as three separate concepts (medium-vein
  wall/valves, IVC adventitial muscle, venule wall structure).
- `CON-CVS-3C04F2DED454C9` (`artery-vs-vein.medium-sized-histological-
  comparison`, `module_subject` "Arteries", same article) already sets a
  medium artery against a medium vein across thickness, lumen, valves and
  all three tunics — subsuming the artery-vs-vein comparison content from
  a fourth minted concept.
The 4 erroneous fresh mints (already pushed in the first commit) were
replaced with sparse reuses of these two pinned ids in a follow-up commit
— **0 question ids changed or were lost** (confirmed by diff: the
`comm -23`/`comm -13` question-id sets are identical before and after the
fix; only the 4 concept ids themselves were retired, replaced by the 2
correct pinned ones). One further-diagnosed row (`very-wide-lumen-thick-
wall-1c5648f9`, testing the large ELASTIC ARTERY's own "very wide lumen,
thick wall" signature, genuinely distinct from either pinned concept's
scope) was re-routed as a leaf-mismatch extension onto
`cardiovascular-artery-classification.ts`'s own pre-existing
`artery-classification.elastic-muscular-and-arteriolar-types` concept,
which already states this exact fact in its own definition — confirmed by
reading that file directly rather than assumed.

**New file `cardiovascular-veins-histology.ts`** (articleId
`ART-104-HIS-ARTERIES-AND-VEINS`, the same article the Arteries cluster
used — confirmed by reading its full prose again before authoring: its own
artery/vein comparison states medium-vein wall structure and valves, the
inferior vena cava's longitudinal adventitial muscle, venule wall
structure, and the postmortem vein-vs-artery lumen difference in detail).
Both concepts below are **sparse reuses**, not fresh mints:
- `vein-classification.venule-medium-and-large-vein-histology`
  (`CON-CVS-B29610035B568D`, 5 kept): venule wall structure (except-style
  question), the inferior vena cava's longitudinally-arranged adventitial
  smooth muscle and its respiration-linked elongate/shorten function (3
  questions, one restated per independent source occurrence), and the
  medium vein's adventitia-dominant wall. **Conflict recorded, not
  reused**: `CON-CVS-08AA7F26A9BD28` ("Postcapillary venule wall",
  canonical_key `teaching.postcapillary-venule.media`) is a live,
  single-sentence fact from a different, cross-university Systems-view
  catalogue (pinned to `ART-CVS-CARDIAC-HISTOLOGY`, no 104-CPS module,
  `GENERATED_BY`-blind to this pipeline) naming the same pericyte-and-
  reticular-fibre venule fact — same "different pipeline, no safe
  sparse-update path" reasoning already documented elsewhere in this
  branch.
- `artery-vs-vein.medium-sized-histological-comparison`
  (`CON-CVS-3C04F2DED454C9`, 4 kept): internal-elastic-lamina absence in
  veins vs a medium artery's prominent one (2 duplicate-occurrence
  questions), the medium vein's adventitia-vs-media thickness reversal
  relative to an artery, and the collapsed, blood-filled postmortem vein
  lumen vs an artery's elastic-recoiled, emptier one.

**New file `cardiovascular-venous-capacitance-and-return.ts`** (articleId
`ART-104-PHY-VENOUS-RETURN-AND-BAROREFLEX`,
`docs/Kasr-Source-Imports/article/104-CPS-articles.md` — Draft, evidenced,
5 claims/5 spans per its own notes, **not** `GENERATED_BY`, read in full
before authoring against it):
- `veins.capacitance-compliance-and-blood-volume-reservoir` (7 kept):
  veins as capacitance vessels holding roughly 60-70% of blood volume,
  roughly 10x arterial distensibility, the venous pressure-volume curve's
  shape, and mean systemic filling pressure defined exactly as this
  article's own Definition section states it ("the pressure present
  throughout the systemic circulation when the heart stops pumping and
  flow is zero"). Deliberately a **different file and article** from
  `physiology-circulatory-control-hemorrhagic-shock.ts`, whose own
  `venous-return.determinants-and-equation` concept carries the open,
  previously-documented article-mismatch issue (pinned to
  `ART-104-PHY-NERVOUS-AND-CHEMORECEPTOR-CONTROL`, which its own `##
  notes` field disclaims teaching venous-return material) — this new
  concept is untouched by that issue, resolving it by routing around it
  rather than compounding it.
  **Gap disclosed**: the article defines MSFP precisely and ties venous
  capacity to it, but does not itself state the 60-70%/~10x/curve-shape
  figures this leaf's own bank tests directly (standard, undisputed
  physiology; flagged for the article-authoring lane).

**A self-caught defect, same class as run27's own precedent**: a
capacitance-vessels duplicate-occurrence row
(`which-of-the-following-are-called-capacitance-vessels-that-h-3d3e4b7b`)
was drafted as a kept question on first pass, but this commit's own
`medical:batch` run flagged it — option A ("Arteries") had bled into the
stem itself ("...most of the blood volume? @ Arteries", the `@` a
corrupted "A)" marker), leaving only 3 real options. Converted to
`exclude: true` before the final gate run; the fix is reflected in the
commit's own gate-line history (first run: 5 errors; after fix: back to
the 4 pre-existing).

**4 more questions routed onto already-existing concepts** (bank-tagged
"Veins", genuinely those concepts' own content — the leaf-field-unreliable
hazard confirmed yet again):
- `cardiovascular-av-connections-histology.ts`: +2 questions onto
  `arteriovenous-anastomosis.direct-shunt-sites-and-innervation` — two
  independent source occurrences of the basic arteriole-to-venule
  definition, not yet tested by that concept's existing 2 questions.
- `cardiovascular-vessel-wall-general-plan.ts`: +1 question onto
  `tunica-adventitia.vasa-vasorum-and-composition` (a 6th duplicate-
  occurrence restating the literal "vessels of the vessels" meaning); +1
  question onto `blood-vessel-wall.general-three-tunic-plan` (media smooth
  muscle circularly arranged, applied to a large vein specifically —
  cross-references the large-vein adventitial-muscle and valve-
  distribution facts authored in the new veins-histology file).

**10 excludes**: 2 already bank-flagged unanswerable
(`medium-sized-arteries-d8faffa8` fragment;
`the-wall-of-inferior-vena-cava-contains-5098daea`'s own merged options),
8 found this session — four more A+B/C+D-style option merges
(`concerning-large-veins-which-one-of-the-following-statements-1b1fd630`,
`the-internal-elastic-lamina-in-the-medium-sized-artery-is-an-b0c0cd7a`,
`concerning-the-medium-sized-veins-all-of-the-following-are-t-7d6b234b`,
plus the capacitance-vessels stem-bleed above), a corrupted 2-option row
(`the-medium-sized-vein-is-characterized-by-efb9e135`, only options A/B
survived despite a legible handwritten answer mark), a 3-choice merge with
a physiologically-uncertain printed answer
(`post-capillary-venule-is-lined-by-epithelium-2ee47577` — printed "simple
columnar" doesn't match standard simple-squamous teaching for a post-
capillary venule, and no source resolves the discrepancy), a two-equally-
plausible-true-answers row
(`tunica-media-of-vein-is-typically-wider-than-tunica-media-of-1c2af8e7`),
and two unanswerable heart/fetal-circulation anatomy fragments leaf-tagged
Veins in the bank (`regarding-the-fetal-circulation-and-circulatory-
changes-afte-6044f685`, `regarding-the-heart-choose-the-correct-answer-it-
lies-in-the-c3cd415b`) bookkept in the new histology file since neither is
a vein-histology question at all.

**8 rows left deliberately unclaimed** (no seed file references these
keys — do not recount as still-open Veins work; the recompute script will
still show them under the "Veins" leaf tag, since the bank's own tag is
what it counts, not the row's true content):
- `choose-the-correct-statement-concerning-the-lymphatic-vessel-9d893940`
  (lymphatic vessel structure: bicuspid valves, beaded appearance) and
  `surface-receive-lymph-from-afferent-vessel-while-surface-whe-cfcfeed1`
  (lymph-node hilum: afferent on convex surface, efferent vessel + vein at
  concave hilum) — genuinely **Lymph node** cluster content (21
  already-tagged rows), not vein histology.
- `greatest-total-cross-sectional-area-a-aorta-1242be79` (capillaries have
  the greatest total cross-sectional area of any vessel type) — genuinely
  **Vascular Function** hemodynamics (35 already-tagged rows), distinct
  from the blood-volume-distribution facts kept above.
- `in-progressive-hemorrhagic-shock-which-of-the-following-occu-649d7c04`
  (capillary permeability rises in progressive/decompensated shock) —
  genuinely **Basic Mechanisms of Circulatory Control** shock physiology
  (18 already-tagged rows), not routed into the already-mis-pinned
  `physiology-circulatory-control-hemorrhagic-shock.ts` file to avoid
  compounding its open article-mismatch issue.
- `regarding-brachiocephalic-veins-one-of-the-following-stateme-8aac4731`,
  `regarding-the-anatomy-of-the-heart-following-statements-are-62f7c901`,
  `the-mediastinal-surface-of-the-left-lang-shows-an-impression-24a9bb35`,
  `which-vessel-passes-directly-behind-the-right-hilum-01be7ae1` — genuine
  gross **thorax/heart/lung anatomy** (brachiocephalic vein drainage and
  the thoracic duct; heart-chamber surfaces; the left lung's mediastinal
  relations; the azygos vein behind the right hilum), not histology at
  all. These 4 rows are a natural down-payment on **the next CVS leaf**
  (Heart / Spleen / Lungs anatomy) — small in number, but confirm that
  leaf's bank content genuinely exists and is distinct in kind (gross
  anatomy, not histology or physiology) from every leaf closed so far.

**Recompute confirms the closure**: after this session's three commits, the
"what's left" script (below) shows exactly 8 remaining "Veins"-tagged rows
(matching the 8 deliberately-unclaimed above) and 5 remaining
"Arteries"-tagged rows (was 11 before this session; the 6 closed here were
genuinely vein content, leaving the 2 Spleen + 1 Vascular Function + 2
Basic-Mechanisms-of-Circulatory-Control rows run27 had already identified
as unclaimed).

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

**run30's dispatched Heart cluster is now closed (13/13 bank-tagged rows
accounted for — 11 kept, 2 excluded, 0 deliberately unclaimed for other
clusters though 2 rows are documented and deferred there; plus 1 gross-
anatomy down-payment row kept and Special Circulation's own last row
closed as a side effect — see "The heart" section above).** Per the
dispatch brief's stated order, **Spleen or Lungs anatomy is next.**
Concretely:
- **`104-CPS-anatomy-concepts.md` / `104-CPS-anatomy.md` are now a
  confirmed, rich, already-written article+concept pair covering gross
  thorax/heart/lung anatomy in full** — 19 real, live, evidenced Draft
  articles (`ART-104-ANA-THORACIC-CAGE` through `ART-104-ANA-DEV-HEART-
  OUTFLOW-AND-CIRCULATION`; the full id-to-title map is in this session's
  own research, reconstructible via `awk '/^## id$/{getline id; print id}
  /^## title$/{getline t; print "  -> " t}'
  docs/Kasr-Source-Imports/article/104-CPS-anatomy.md`), most already used
  by the pre-run25 `anatomy-*.ts` seed files sitting in this same
  directory (pericardium, diaphragm, pleura, aortic-arch-relations,
  development-of-the-heart, large-nerves-of-the-thorax, lymphatics-of-the-
  thorax — all already closed, do not re-author). **Two of these articles
  are the Lungs-anatomy starting point**: `ART-104-ANA-LUNG-SURFACE-
  FEATURES` ("The lungs: external features, hilum, fissures, lobes and the
  differences between the two sides") and `ART-104-ANA-LUNG-SEGMENTS-AND-
  BLOOD-SUPPLY` — neither has a seed file yet (`anatomy-pleura.ts` is
  pleura only, not lung parenchyma/hilum). Check `104-CPS-anatomy-
  concepts.md` for pinned, unimported concepts on lung external features/
  hilum/fissures before minting, per the heightened CVS dedup mitigation —
  unchecked this session (time did not allow going beyond the Heart
  cluster's own down-payment).
- **2 rows already deferred here for Lungs anatomy, well-supported, do not
  re-search**: `the-mediastinal-surface-of-the-left-lang-shows-an-
  impression-24a9bb35` and `which-vessel-passes-directly-behind-the-right-
  hilum-01be7ae1` — see "The heart" section above for the exact article
  passages already found.
- **Spleen (26 already-tagged rows + 2 deferred from Arteries — see the
  Arteries section above — = 28 effectively)** remains completely
  untouched; no dedicated file exists, and no search for pinned Spleen
  concepts has been run yet this branch.
- **A genuine source conflict needs a human ruling before anyone authors
  it**: `regarding-brachiocephalic-veins-one-of-the-following-stateme-
  8aac4731` — see "The heart" section above. Do not silently pick either
  side; escalate to the chief of staff / Omar.
- **A chief-of-staff consolidation ruling is needed**, not urgent: this
  session's fresh-mint `cardiac-conducting-system.purkinje-fibre-site-and-
  histological-characteristics` (`CON-CVS-3A8240E7E48C00`) overlaps
  `CON-MSK-5EA95D36121EF8` in a different Kasr module's own pending batch
  (`docs/import-ready/concept/103-BMS-histology-concepts.md`) — see "The
  heart" section above for the full reasoning.
- **2 rows genuinely belong to not-yet-started clusters, documented, not
  authored**: `increasing-the-inotropic-state-of-the-myocardium-will-
  4a21ac61` (Mechanical Properties of Cardiac Muscle, 36 remaining rows)
  and `ecg-record-gives-valuable-information-about-all-of-the-follo-
  68820593` (Electrical Activity of the Heart, 47 remaining rows, the
  largest untouched CVS leaf) — see "The heart" section above.

**Superseded, kept for history — run28's own closing note:**
A-V Connections: 54/54 accounted for (40 kept, 12 excluded, 7 deliberately
left unclaimed — see the A-V Connections section above).

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

## run33 (recovery probe, off run31 — run32 died at 0 commits): Electrical Activity of the Heart CLOSED

**47/47 bank rows accounted for — 28 kept, 19 excluded, 0 remaining.**
Committed in small increments (2 kept 3-option-contract fixes caught and
corrected mid-session, so numbers below are the final, gate-clean state).

4 files, module_subject "104 CPS > Physiology > Cardiovascular System >
Electrical Activity of the Heart" for every concept and question:

- **`cardiovascular-pacemaker-electrophysiology.ts`** (articleId
  ART-104-PHY-PACEMAKER-ELECTROPHYSIOLOGY): 4 sparse reuses — a **goldmine**
  find, same class as A-V Connections' own histology-concepts discovery.
  Grepping `104-CPS-physiology-concepts.md` for this cluster's own article
  ids (before minting anything, per the heightened CVS dedup mitigation)
  turned up 7 already-pinned, hand-authored, unimported concepts covering
  most of this leaf's textbook content: `sa-node-pacemaker-potential.phase-4`
  (CON-CVS-34D3CB7F794801), `...phase-0-and-3` (CON-CVS-0AD04EE46FD2C5),
  `cardiac-pacemaker-hierarchy...` (CON-CVS-802E52B82883CD),
  `cardiac-sarcolemma.ionic-pumps-exchangers...` (CON-CVS-7A8A04F61D44D1),
  `autonomic-nervous-system...chronotropy-dromotropy` (CON-CVS-AAAD34C16F9880),
  `cardiac-conduction-system...av-nodal-delay` (CON-CVS-11E581298A0B95),
  `cardiac-myocyte-action-potential.refractory-periods...`
  (CON-CVS-5288011D93888B). 7 kept, 2 excluded (3-option bank rows).
- **`cardiovascular-autonomic-control-and-refractory-periods.ts`**
  (articleId ART-104-PHY-CARDIAC-CONDUCTION): 3 of the 7 reuses above.
  8 kept, 1 excluded (3-option row).
- **`cardiovascular-working-myocyte-action-potential.ts`** (articleId
  ART-104-PHY-CARDIAC-ACTION-POTENTIAL — a Draft article already staged and
  named as a sibling by both articles above, but grepped for as a concept's
  own `article_ids` in the physiology-concepts file with 0 hits: a genuine
  gap, not another goldmine). 2 fresh mints after find-existing.mjs "safe
  to create" on every term tried (cardiac AP plateau/L-type Ca-K balance;
  functional syncytium/intercalated discs). 3 kept, 5 excluded (1 more
  3-option row, 3 OCR page-bleed merges, 1 stem/option mismatch).
- **`cardiovascular-ecg-basics.ts`** — no 104-CPS-scoped ECG article exists
  yet (the one ECG article in the repo, SYS-CVS-ARTICLE-T09, is the
  cross-university Systems-view pipeline's own, no 104 CPS moduleId, same
  no-safe-reuse situation as every other cross-catalogue overlap documented
  in this file). Used ART-104-PHY-CARDIAC-CONDUCTION as the closest live
  104-CPS article, with the gap recorded on all 4 fresh-mint concepts
  (ecg.waveform-electrophysiological-correlates, ecg.intervals-and-segments,
  ecg.recording-technique, myocardial-ischemia.electrical-effects). 10 kept,
  11 excluded — 1 more 3-option row, 2 leaf-mismatched pneumotaxic rows
  (see below), 2 unverified/disputable-key rows, 5 rows already excluded at
  the bank/editorial-keying stage (recorded here as seed excludes for this
  leaf's own complete accounting, per standing practice).

**Two self-caught 3-option-contract defects**, same class as run27's/run29's
own precedent: I initially wrote 4-option explanations for 3 bank rows
(`in-the-sinoatrial-sa-node...-51bb7e46`, `relaxation-asaction-potential-
ends...-4f27e09d`, `the-absolute-refractory-period-in-the-ventricles-
dcf3f403`) without re-checking the bank's actual `options` keys first.
`medical:batch` flagged all 3 ("N options — the contract is 4 to 5")
before any push; converted to `exclude: true` and re-verified clean.
**Lesson for the next session touching this bank**: check
`options.keys()` for every row BEFORE drafting explanations, not after —
several rows here have only 3 real options (A/B/C or A/B/D) despite
looking complete in a quick stem-only read.

**Needs-Omar / follow-up items, not fixed in this pass**:
- **2 leaf-mismatched rows** (`pneumotaxic-center-functions-primarily-to-
  9eda7d1c`, `...-a-limit-inspiratio-e9225808`) are tagged leaf "Electrical
  Activity of the Heart" but are genuinely Control of Respiration content
  (pneumotaxic centre limits inspiration) — that cluster is already fully
  closed (`physiology-control-of-respiration.ts`, concept
  `respiratory-center.drg-vrg-pontine-groups-and-rhythm-generation` already
  teaches this exact fact). Excluded from this leaf rather than re-authored,
  to avoid touching an already-closed sibling file outside this session's
  own bounded scope. A future session touching Control of Respiration
  should fold these 2 rows in as a routed addition (reusing that concept,
  no new mint needed).
- **2 rows with an unverified/disputable key**, excluded rather than
  overridden or trusted: `in-ecg-atrial-fibrillation-shows-253f1614`
  (handwritten-recovered answer B, "atrial rate 200-300/min", sits closer
  to standard atrial-flutter teaching than fibrillation's classic
  350-600/min with absent P waves as the defining sign — option D) and
  `ventricular-repolarization-45-...-9258256a` (handwritten-recovered
  answer B, "V1 at the left 5th intercostal space", conflicts with standard
  lead placement — V1 is right 4th ICS; left 5th ICS is V4). This branch's
  own `answerOverride` convention (see the cytogenetics files) only
  overrides against a directly re-verified department-book page; that
  re-verification was not attempted this pass (recovery-probe time budget),
  so both were excluded rather than guessed at either way. Worth a real
  answerOverride pass later if someone has the department book's ECG pages
  open already.
- **No 104-CPS-scoped ECG-teaching article exists.** `cardiovascular-ecg-
  basics.ts`'s 4 concepts all carry a `gaps` note that ART-104-PHY-CARDIAC-
  CONDUCTION (used as the closest live article) does not itself state the
  P/QRS/T-to-event correlation, interval/segment definitions, paper
  calibration or limb-lead definitions this leaf teaches. Same class of gap
  as the Purkinje-fibre histology concept in `cardiovascular-conducting-
  system-histology.ts` — flagged for a future 104 CPS physiology-article-
  authoring pass, not fixed here.

Gate (final, cumulative across all 4 commits): 515 kept (+28 from the
487 baseline), 108 excluded (+19 from 89). `medical:batch` full `--with`
(all 104-CPS concept + article files): 4 pre-existing errors only (0 new)
at every stage. `medical:simulate` positional (all concepts, all articles,
then the question file): `errors: []`, all `rejected: 0`. Additive-only
diff confirmed at every commit (`git diff` on the built files showed only
header summary/count lines changing, never a removed content line).

**No stalls experienced this session** — every read was kept small
(grep/offset+limit, never a full multi-thousand-line file at once), and
commits landed roughly every 8-10 questions as instructed. First commit
landed well inside the 3-minute target.

Next largest untouched clusters (per the recompute in run28's own section
above, now stale by this cluster's closure — rerun the recompute script
before trusting exact counts): Mechanical Properties of Cardiac Muscle
(36), Vascular Function (~43 effectively), Veins (~40 effectively).

## run35 (recovery canary, off run33 HEAD 3510399c): Mechanical Properties
## of Cardiac Muscle — started, first commit

**36 bank rows tagged leaf "Mechanical Properties of Cardiac Muscle".**
First sub-cluster closed this commit: Inotropic Mechanisms (5 kept, 1
excluded, 30 rows of this leaf remain: contractility/EC-coupling general,
afterload, PV loop, force-velocity/Vmax, cardiac index, hemorrhagic shock,
1 mistagged urinary-bladder row, 1 mistagged Poiseuille-law row).

**`physiology-cardiac-inotropy-mechanisms.ts`** (articleId ART-104-PHY-
CARDIAC-MECHANICS, same article the sibling Frank-Starling/preload file in
this leaf already uses): 2 sparse reuses, 0 fresh mints — both found by
grepping `104-CPS-physiology-concepts.md` for "inotrop" and "digitalis"/
"Na-K pump" BEFORE minting anything, per the heightened CVS dedup
mitigation:
- `cardiac-contractility.inotropy-and-lusitropy.camp-pka-mechanisms`
  (CON-CVS-BF82D6F52B72C9) — already pinned with this exact leaf's own
  module_subject AND article ART-104-PHY-CARDIAC-MECHANICS (an exact
  match, not a cross-leaf borrow). Covers the beta-adrenergic-cAMP-PKA
  axis for both positive (sympathetic) and negative (muscarinic/ACh)
  inotropy.
- `cardiac-sarcolemma.ionic-pumps-exchangers.resting-gradient-maintenance`
  (CON-CVS-7A8A04F61D44D1) — pinned under "Electrical Activity of the
  Heart"'s own module_subject/article (a genuine cross-leaf reuse, same
  class as the Electrical Activity cluster's own goldmine finds). Its
  own original_wording names digitalis by name as the textbook example of
  Na-K-ATPase inhibition driving Na-Ca-exchanger reversal — an exact
  mechanism match for this leaf's 2 digitalis-mechanism rows.

5 kept: 2x digitalis-mechanism (Na-K pump/exchanger-reversal), 1x
digitalis/definition-of-positive-inotropism, 1x negative-inotropic-
mechanisms (cAMP inhibition), 1x ACh-as-negative-inotropic-agent. 1
excluded (`negative-inotropic-mechanisms-include-all-except-c65c04da`,
3-option row — A/B/D only, no C, same class as every other 3-option
exclusion this branch already documents).

**New hazard found and confirmed this commit — `medical:batch`'s
"library_ids coverage" check does not understand this codebase's own
`+X`-prefixed sparse-append convention for a reused concept's
`article_ids` line.** `build-batches.ts`'s `conceptUpdateBlock`
(`emit.ts:299-318`) deliberately emits a **literal** `+` before each
newly-linked article id on a sparse-reuse row (e.g.
`+ART-104-PHY-PACEMAKER-ELECTROPHYSIOLOGY | +ART-104-PHY-CARDIAC-
MECHANICS`) — this is real, working syntax `conceptImport.ts` strips and
appends onto the live record's existing array field at actual import
time, the same append-not-replace mechanism documented for `## modules`
and `## exam_signal` elsewhere in `emit.ts`'s own doc comments.
`validate-content-batch.mjs`, however, parses `article_ids` with a plain
`.split('|').map(trim)` (line ~768) that never strips a leading `+`, so
the concept's parsed `articleIds` become `"+ART-104-PHY-CARDIAC-
MECHANICS"` (literal plus) instead of `"ART-104-PHY-CARDIAC-MECHANICS"` —
which then fails to match the plain (unprefixed) `library_ids` a
question in the same batch carries, producing two **new** "main concept
... is not covered by any article in library_ids" false-positive errors
(`medical:batch` full `--with`: 6 errors total = the 4 pre-existing
3-option-contract rows + these 2). No prior session ever hit this because
the only earlier reuse of `CON-CVS-7A8A04F61D44D1` (in the Electrical
Activity cluster) was on a question later excluded for a 3-option
contract failure, and excluded questions skip the coverage check
entirely — this is the first non-excluded question to test a concept
receiving its first-ever article link through this route.
**`medical:simulate` (the real gate) confirms this is a validator
artifact, not a real defect**: full positional run (all 6 concept files +
4 article files + the question file), `errors: []`, `skipped: []`, every
tier's own `rejected: 0`, delta shows `concepts: 237` / `articles: 57` —
the import genuinely goes through clean. Future sessions reusing a
concept whose sparse `article_ids` line is entirely `+`-prefixed should
expect this same false alarm from `medical:batch` and confirm against
`medical:simulate` instead, exactly as this file's own standing guidance
already says (`medical:batch` is not the gate — simulate and audit are).
Not fixed in the validator itself this pass (out of this session's own
bounded scope — a shared `scripts/` tool, not this leaf's file).

Gate: 520 kept (+5 from 515), 109 excluded (+1 from 108).
`medical:batch` full `--with`: 6 errors (4 pre-existing 3-option-contract
rows on unrelated Respiratory-leaf items, + 2 false-positive
library_ids-coverage errors explained above — both non-blocking, see
hazard note). `medical:simulate` positional (all concept/article files +
the question file): `errors: []`, `skipped: []`, all `rejected: 0`.
`medical:audit`: `errors: []`. Additive-only diff confirmed (`git diff`
on both changed generated files showed only the 108→109 header count
line and pure appends — no removed content line).

First commit landed inside the 3-minute recovery-canary target.

Next in this leaf (30 rows remaining): afterload/stroke-volume-change
questions, PV-loop, force-velocity/Vmax + length-tension shift with
inotropy (needs its own find-existing pass — not yet searched), cardiac
index, hemorrhagic shock (2 rows, may already be covered by the existing
`physiology-circulatory-control-hemorrhagic-shock.ts` file — check before
minting), 1 mistagged urinary-bladder-plasticity row (not cardiac at all
— exclude or flag for routing to wherever smooth-muscle physiology
lives), 1 mistagged Poiseuille-law row (vascular resistance, not cardiac
muscle mechanics — likely belongs in Vascular Function, this leaf's own
next queued cluster).

## run35, second commit: Preload/afterload/PV-loop sub-cluster (7 kept, 1
## excluded)

**4 rows added to the EXISTING `physiology-cardiac-preload-frank-starling.ts`**
(not a new file): `as-the-preload-increases...-b3ab5a86` and its near-
duplicate `...-32d2b2d9` (preload raises active tension, via sarcomere
stretch — not inotropy, not a sarcomere-length decrease, not a shortening-
velocity decrease), `which-of-the-following-conditions-would-lixely-
increase...-bf2e2eaa` (fluid infusion raises preload; hypertension raises
afterload instead; hypoalbuminaemia oedema and venous thrombosis both
lower it), `stroke-volume-is-increased-by...-ccb4e991` (preload rise is
the correct cause; venodilation and raised arterial pressure/afterload
both cut stroke volume instead). All 4 reuse this file's own already-
declared concept (`cardiac-muscle-length-tension.frank-starling-law.
preload-effect-on-shortening`) — 0 new reuses/mints needed. Added here
rather than a separate file because these bank rows carry the *bank's*
"Mechanical Properties of Cardiac Muscle" leaf tag (not this file's own
bank-leaf tag, "Cardiac Function") but the same modulePath and the same
already-declared concept — routed by modulePath/concept fit, per this
branch's standing practice of treating the bank's own `leaf` field as
unreliable.

**`physiology-cardiac-afterload-and-pv-loop.ts`** (new file, articleId
ART-104-PHY-CARDIAC-MECHANICS): 2 fresh mints, both after find-existing.mjs
"safe to create" AND a grep sweep of all 104-CPS concept files for "EDPVR"/
"ESPVR"/"pressure-volume"/"force-velocity"/"Vmax" turning up only one
unrelated written-question concept (`ventricular-pressure-volume-loop.
effect-of-increased-inotropy`, 104-CPS-concepts.md — a different fact, what
*moves* the ESPVR line, not what each loop landmark *is*):
- `ventricular-pressure-volume-loop.landmarks.edpvr-espvr-preload-afterload`
  — EDPVR = passive filling tension, ESPVR = maximal active tension
  (contractility index, not "total" tension), EDV = preload proxy, ESP =
  afterload proxy.
- `ventricular-afterload.effect-on-shortening.force-velocity-relationship`
  — increased afterload moves the ventricle along its fixed force-velocity
  curve (velocity of shortening down, ESV up, SV down), contrasted against
  inotropy's own curve-shifting effect (Vmax genuinely rises) already
  covered by this leaf's `physiology-cardiac-inotropy-mechanisms.ts`.

3 kept (`concerning-the-pressure-volume-loop...-0eb3ce9e` EDPVR/ESPVR-
definitions EXCEPT question; `increased-afterload-on-the-ventricle-
c44cd5fe` and its near-duplicate `what-is-the-effect-of-increased-
afterload...-9084d395`, both testing the same afterload-decreases-
shortening-velocity fact against Vmax/ESV/SV distractors). 1 excluded
(`an-increase-in-afterload-and-venous-compliance...-4dc76b7f` — already
`editorialExcluded: true` in the bank itself, depends on an unavailable
graph; recorded here for this leaf's own complete accounting, not
silently dropped).

Gate: 527 kept (+7 from 520), 110 excluded (+1 from 109). Additive-only
proof done by id-set diff this time (more reliable than eyeballing
`git diff -/+`  lines, since the new mid-file insertions in the preload
file reordered several downstream cardiac-cycle questions and made git's
diff render them as spurious remove+re-add pairs): `comm -23` on
`QM-104-*` ids extracted from `git show HEAD:...` vs the current file —
0 lines (empty), 520 -> 527; same for `CON-CVS-*` ids in the concepts
file — 0 lines, 64 -> 66. `medical:simulate` positional (all concept/
article files + the question file): `errors: []`, `skipped: []`, all
`rejected: 0`. `medical:batch` full `--with`: identical 6 errors as the
previous commit (the 4 pre-existing 3-option rows + the 2 known
library_ids false-positives on the digitalis questions, see this file's
own hazard note above) — 0 new. `medical:audit`: `errors: []`.

Next in this leaf (23 rows remaining): the wider contractility/EC-
coupling group (L-type Ca channels, phospholamban, "regarding the cardiac
muscle" / "the cardiac muscle fibers" general rows, myocardial-
contractility-decrease row), cardiac index, stroke-volume-reserve-during-
exercise, hemorrhagic shock (2 rows — check `physiology-circulatory-
control-hemorrhagic-shock.ts` before minting), the mistagged urinary-
bladder-plasticity row, the mistagged Poiseuille-law row (route to
Vascular Function, this leaf's own next queued cluster after this one
closes).

## run35, third commit: cell-biology/contractility-mechanism group (7
## kept, 0 excluded, 0 fresh mints)

**`physiology-cardiac-muscle-cell-biology.ts`** (new file, articleId
ART-104-PHY-CARDIAC-MECHANICS): 3 sparse reuses, 0 fresh mints — all found
by grepping every 104-CPS concept file for "phospholamban"/"L-type"/
"functional syncytium" before minting anything:
- `cardiac-contractility.inotropy-and-lusitropy.camp-pka-mechanisms`
  (CON-CVS-BF82D6F52B72C9) — 3rd/4th/5th/6th reuse in this leaf now; its
  own hand-authored definition already names phospholamban's SERCA-
  inhibition role and myocardial ischaemia's relaxation-impairing
  mechanism by name, an exact match for 4 of this file's 6 questions
  (EC-coupling/ischaemia, phospholamban itself, decreased-contractility
  discrimination, positive-inotropic-mechanism discrimination).
- `cardiac-action-potential.plateau-phase2.calcium-potassium-balance`
  (CON-CVS-D0CD4A234205EF) — genuine cross-leaf reuse from "Electrical
  Activity of the Heart" (article ART-104-PHY-CARDIAC-ACTION-POTENTIAL);
  its own definition already states L-type Ca++ channels are voltage-
  gated, open during the plateau and inactivate slowly — an exact match
  for the L-type-channel-properties EXCEPT row.
- `cardiac-muscle.functional-syncytium-and-intercalated-discs`
  (CON-CVS-7FC4E8F3FBEFFE) — genuine cross-leaf reuse, same article as
  above; exact match for the cardiac-muscle-structure row (functional vs
  true syncytium, intercalated discs, gap junctions).

**Confirms this session's own hazard note above with a second data
point**: both cross-leaf reuses here are concepts this *pipeline itself*
originally minted (they live as full records in `104-CPS-mcq-concepts.md`,
not hand-authored records in `-physiology-concepts.md`), and this build's
own diff shows their `article_ids` line rewritten wholesale, cleanly,
without a `+` prefix (`ART-104-PHY-CARDIAC-ACTION-POTENTIAL | ART-104-PHY-
CARDIAC-MECHANICS`) — because the pipeline owns the whole record for a
concept it minted itself, unlike a hand-authored record it must touch
conservatively via sparse `+`-append. Both validated clean with 0 new
`medical:batch` errors, confirming the false-positive is specific to
reusing a *hand-authored* pinned concept's `article_ids`, not reuse in
general.

**1 question added to the existing `physiology-cardiac-preload-frank-
starling.ts`** (`regarding-the-cardiac-muscle-47c4dc0a` — Frank-Starling's
law restated directly against staircase/treppe, acidosis and sympathetic-
stimulation distractors), reusing that file's own already-declared
concept — 0 new reuses/mints.

Gate: 534 kept (+7 from 527), 110 excluded (unchanged — 0 excludes this
commit). Additive-only proof by `QM-104-*` id-set diff: `comm -23` empty,
527 -> 534. `medical:simulate` positional: `errors: []`, `skipped: []`,
all `rejected: 0`. `medical:batch` full `--with`: identical 6 errors as
the previous two commits (0 new). `medical:audit`: `errors: []`.

Leaf running total across all 3 commits this session: 19 kept, 2
excluded, 2 fresh mints, 5 concept reuses (2 same-leaf, 3 cross-leaf).
17 rows remain of the original 36 (contractility "regarding the cardiac
muscle fibers"-style stragglers are now done; still open: cardiac index,
stroke-volume-reserve-during-exercise, hemorrhagic shock x2, 1 mistagged
urinary-bladder row, 1 mistagged Poiseuille-law row).

HANDOFF: kasr-104-author-run35@<this commit's sha, see `git log -1`> ·
resume-first: cardiac index + stroke-volume-reserve rows (check
`physiology-cardiac-output-formula.ts` for an existing cardiac-index
concept before minting), then hemorrhagic shock (check `physiology-
circulatory-control-hemorrhagic-shock.ts` before minting), then close out
the leaf's 2 mistagged rows, then move to Vascular Function per the
dispatch's own queued order.

## run36 (off run35 @ 4163717f) — Mechanical Properties of Cardiac Muscle
CLOSED (34/36 accounted: 26 kept, 8 excluded; 2 deliberately left, both
genuinely out of this cluster). One commit, full gate run before
committing.

Recomputed the exact remainder directly against the bank (leaf ==
"Mechanical Properties of Cardiac Muscle") cross-referenced against every
seed file's own claimed question keys, since the handoff note above was
written mid-session and undercounted slightly — 15 remained at the start
of this session, not 17.

**`find-existing.mjs` run for every candidate before minting anything**,
per the heightened CVS dedup mitigation:

- `physiology-cardiac-preload-frank-starling.ts`: +1 row
  (`according-to-the-frank-starling-law-of-the-heart-f4ab249c`) onto the
  file's own already-declared Frank-Starling concept — reroute, no search
  needed. **Self-caught defect**: drafted as kept on first pass, but the
  first `medical:batch` run flagged it (3 options, no D — the bank
  extraction never recovered a 4th option). Converted to `exclude: true`;
  the fix is reflected in the gate-line history below (first run: 7
  errors; after fix: back to the 6 pre-existing). The same law is already
  tested by 8 other kept questions in this file, so no content lost.
- `physiology-cardiac-output-formula.ts`: +3 rows.
  `regarding-cardiac-index-the-following-is-truc-except-80705f05` reroutes
  onto this file's own already-existing
  `cardiac-output.definition-formula-and-index` concept, which already
  states CO ~5 L/min and cardiac index ~3.2 L/min/m2 — an exact match for
  the "except" answer (5 L/min is CO, not cardiac index). **Fresh mint**
  `sympathetic-stimulation.cardiac-signature.rate-inotropy-and-cardiac-output`
  (`find-existing.mjs` "sympathetic stimulation effects heart rate
  contractility cardiac output" -> safe to create), directly grounded in
  this file's own `ART-104-PHY-CARDIAC-OUTPUT-AND-EXERCISE` article, whose
  Mechanism section states the identical "heart rate up, inotropy up"
  cardiac-side signature for exercise — restated here for isolated
  sympathetic stimulation, not a new claim. 2 kept questions onto it
  (`sympathetic-stimulation-has-the-following-effect-s-on-the-he-e6a61131`,
  `what-is-the-effect-of-sympathetic-stimulation-on-the-heart-836e2203`).
- `physiology-cardiac-afterload-and-pv-loop.ts`: +5 rows (2 kept, 3
  excluded), all onto the file's own already-existing
  `ventricular-afterload.effect-on-shortening.force-velocity-relationship`
  concept — **no fresh mint needed**: that concept's own definition,
  minted by an earlier session specifically to contrast afterload against
  inotropy, already states "increased inotropy... shifts the entire curve
  up and to the right and genuinely raises Vmax" — exactly the fact this
  leaf's remaining inotropy/force-velocity/PV-loop rows test. Kept:
  `increasing-the-inotropic-state-of-the-heart-will-ans-25958be0` (force-
  velocity/length-tension/Vmax/degree-of-shortening, answer B),
  `the-velocity-of-shortening-of-cardiac-muscle-is-decreased-by-68b1dda6`
  (afterload decreases shortening velocity, answer C). Leaf-mismatch
  reroute kept: `increasing-the-inotropic-state-of-the-myocardium-will-
  4a21ac61` (bank-tagged "The heart", genuinely this concept's own PV-
  loop-width content, answer B — the row PROGRESS.md's own run31 entry
  flagged as needing a new concept that a later session, unlogged here,
  already minted). **Gap disclosed**: the length-tension curve's own
  shift direction with inotropy (up-and-left) is not explicitly stated by
  this concept or `ART-104-PHY-CARDIAC-MECHANICS` — standard, undisputed
  cardiac physiology, flagged for the article-authoring lane. Excluded:
  `increasing-the-inotropic-state-of-the-heart-will-968a1868` (credited
  answer's own option text is OCR-garbled — "Wmiax increases" for "Vmax
  increases" — no seed-level field can repair option text; identical fact
  taught cleanly by the kept sibling above), plus 2 bank-level-
  unanswerable bookkeeping excludes
  (`the-velocity-of-shortening-of-cardiac-muscle-is-decreased-by-f3398b36`,
  `stroke-volume-reserve-sv-7-from-70-up-to-200-ml-during-max-e-64548dbe`)
  recorded for a complete accounting.
- `cardiovascular-autonomic-control-and-refractory-periods.ts` (an
  Electrical Activity of the Heart file — leaf-mismatch reroute): +1
  excluded row (`positive-chronotropic-effect-of-sympathetic-stimulation-
  is-8acc86aa`) onto the file's own existing chronotropy-dromotropy
  concept. A distractor option (B) is an uninterpretable extraction
  fragment ("The orig decreases the contractility"); the bank's own
  `variants` field confirms a cleaner copy of this same paper reads
  differently for B, proving corruption rather than mere terseness. The
  credited funny-current fact is already taught cleanly by this file's own
  sibling question, so excluded rather than guessed past.
- `physiology-circulatory-control-hemorrhagic-shock.ts` (a Basic
  Mechanisms of Circulatory Control file — leaf-mismatch reroute): +3 rows
  (2 kept, 1 bookkeeping exclude). **Sparse reuse, not a fresh mint**:
  `find-existing.mjs "carotid sinus baroreceptor"` / "baroreceptor reflex"
  surfaced a hand-authored, pinned record (`CON-CVS-C3E60AC7A9EDB1`,
  canonical_key `arterial-baroreceptor-reflex.response-to-a-rise-and-a-
  fall-in-arterial-pressure`) already sitting in `104-CPS-concepts.md`
  (the written-paper pipeline's own generated file, not `GENERATED_BY`
  this MCQ pipeline), already pinned to this exact leaf's module_subject.
  2 kept: `a-reduction-of-carotid-sinus-pressure-would-cause-a-decrease-
  8602bea7` (falling carotid pressure raises HR/contractility/TPR, lowers
  venous capacitance — the concept's own stated reflex arc) and
  `during-hemorrhagic-shock-the-patient-exhibits-a-decreased-he-5f1a1828`
  (same reflex raises HR/contractility/TPR in compensated shock; venous
  pressure itself falls from the primary volume loss, disclosed as basic
  undisputed hemodynamics distinct from what the reused concept states
  explicitly, not invented). 1 bookkeeping exclude
  (`during-hemorrhagic-shock-the-patient-exhibits-4d2e0a8d`, a corrupted
  duplicate-occurrence copy already unanswerable at the bank's own
  editorial stage).

**2 rows left deliberately unclaimed, cluster still counted CLOSED**
(neither is genuinely Mechanical Properties of Cardiac Muscle content —
confirmed by reading each row directly):
- `the-plasticity-of-the-urinary-bladder-is-explained-by-8bf89a19` —
  genuinely urinary-system smooth-muscle physiology, out of 104 CPS's own
  cardiovascular scope entirely (no CVS concept or article teaches
  bladder plasticity; forcing it in would mean inventing a home for it).
  Left unauthored, no seed file references this key.
- `the-poiseuille-law-is-concerned-with-which-of-the-following-501dd5db` —
  genuinely Vascular Function hemodynamics (Poiseuille's law -> vascular
  resistance), the next cluster in this dispatch's own queued order. Down
  payment: pick this up first when opening that cluster rather than
  re-deriving from scratch.

Gate (this commit): 542 kept (+8 from 534), 116 excluded (+6 from 110),
128 MCQ concepts (+2: 1 fresh mint + 1 pinned concept's first appearance
in this pipeline's own file via sparse reuse). `medical:batch` full
`--with` (10-file recipe: 6 concept files + 4 article files): 6 errors —
all pre-existing (2 known-false-positive `library_ids` coverage errors on
the digitalis rows, 4 pre-existing respiratory 3-option-contract rows), 0
new (confirmed by an intermediate run that caught and fixed the
Frank-Starling 3-option row above; final run matches the 6-error
baseline exactly). `medical:simulate` (positional, 11 files: 6 concept +
4 article + the question file): `errors: []`, `skipped: []`, delta
concepts +240 / articles +57 (whole-library totals, additive). `medical:
audit --source`: 579 total errors (systemic, pre-existing); every touched
id (`CON-CVS-87EC1C2FC5D77D` fresh mint, `CON-CVS-C3E60AC7A9EDB1` and
`CON-CVS-BF82D6F52B72C9` reuses) shows exactly the same pre-existing pair
(1 shared `atomicClaimIds`-missing bulk line + 1 "references unknown
resource" line) already documented for every `needs_evidence` concept in
this branch — 0 real errors introduced. `medical:duplicate-keys`: 0
canonical key collisions, 1 pre-existing label collision (Aspirin/102
INT, unrelated).

## Next action (resume-first)

Mechanical Properties of Cardiac Muscle is CLOSED. Next: **Vascular
Function** (35 bank-tagged rows) per the dispatch's own queued order —
start with the down-payment `the-poiseuille-law-is-concerned-with-which-
of-the-following-501dd5db` row above (Poiseuille's law -> vascular
resistance), then recompute the exact remainder for leaf "Vascular
Function" the same way this session did (cross-reference the bank against
every seed file's own claimed question keys — do not trust any prior
session's row-count note without recomputing). Check
`104-CPS-physiology-concepts.md` for pinned, unimported Vascular-Function
concepts before minting anything, per the heightened dedup mitigation —
this cluster already turned up two "no fresh mint needed, an earlier
session's own concept already says it" wins, so check thoroughly before
assuming a gap.

HANDOFF: kasr-104-author-run36@<this commit's sha, see `git log -1`> ·
resume-first: Vascular Function cluster, starting with the Poiseuille-law
down-payment row.

## run36 continued — Vascular Function CLOSED (32/35 accounted: 29 kept,
3 excluded; 3 deliberately left, all genuine source gaps/conflicts, not
guessed past). Same commit as above did not include this — separate
commit, full gate run before committing.

**Goldmine confirmed again**: before minting anything, grepped
`104-CPS-physiology-concepts.md` for "Vascular Function" module_subject
and found **7 pinned, hand-authored, unimported concepts** already
sitting there (hemodynamics F=deltaP/R + TPR worked values, arterial BP/
MAP/pulse-pressure, vascular-tree pressure/compliance distribution,
capillary-exchange diffusion + Starling forces — the latter two already
reused by the A-V Connections cluster per this file's own earlier
entries — interstitial-fluid/oedema, and local-blood-flow-regulation/
autoregulation), plus, in the sibling "Basic Mechanisms of Circulatory
Control" module_subject, **5 more pinned concepts** named as
`related_concepts` on `ART-104-PHY-NERVOUS-AND-CHEMORECEPTOR-CONTROL`
(peripheral chemoreceptors, central chemoreceptors, the CNS ischaemic
response, the Cushing reflex, and the two medullary centres) — every one
read in full and cross-checked against its own bank row before use.

**Two new files** (Vascular Function's own leaf, no seed file existed for
it before this session):
- `physiology-vascular-function-hemodynamics.ts` (articleId
  ART-104-PHY-HEMODYNAMICS-AND-ARTERIAL-PRESSURE): sparse reuse of
  `hemodynamics.flow-pressure-resistance-relationship`
  (CON-CVS-FA5FB57963DDF7, 6 kept + 2 excluded — TPR/MAP calculations,
  viscosity/radius effects on flow and resistance, **gap disclosed**:
  Poiseuille's own radius^4/viscosity expansion of resistance is not
  itself stated by this article, standard undisputed physics),
  `arterial-blood-pressure.systolic-diastolic-map-and-pulse-pressure`
  (CON-CVS-A0579343614BCD, 5 kept — MAP/pulse-pressure definitions and
  calculations), and `local-blood-flow-regulation.myogenic-and-metabolic-
  autoregulation` (CON-CVS-56A68328FD03C7, cross-leaf reuse from "Basic
  Mechanisms of Circulatory Control", 1 kept — active hyperaemia as the
  quantitatively dominant local-flow mechanism). Two **fresh mints**,
  both search-clean (`find-existing.mjs` "Reynolds number turbulent blood
  flow" / "critical closing pressure" -> "safe to create"), both
  **gap-disclosed** rather than sourced to any live article (no 104-CPS
  article states either): `turbulent-blood-flow.reynolds-number-
  determinants` (2 kept + 1 excluded) and `critical-closing-pressure.
  definition-and-mechanism` (1 kept) — standard, undisputed
  haemodynamics, flagged for the article-authoring lane.
- `physiology-vascular-function-capillary-exchange-and-edema.ts`
  (articleId ART-104-PHY-CAPILLARY-EXCHANGE-AND-LYMPHATICS): sparse reuse
  of `interstitial-fluid.volume-determinants-and-causes-of-oedema`
  (CON-CVS-6D8E2D62A9F51E, 2 kept — the four-mechanism causes-of-oedema
  classification, including the pitting-vs-non-pitting lymphatic-
  obstruction distinction the concept's own definition already states).

**Extended `physiology-circulatory-control-hemorrhagic-shock.ts`**
(Basic Mechanisms of Circulatory Control leaf — leaf-mismatch reroute
from this cluster's own "Vascular Function" bank tag, genuinely this
file's own content-home): 3 more sparse-reuse concepts (`peripheral-
chemoreceptor-reflex.carotid-and-aortic-bodies` CON-CVS-131F06D46D3B84,
`cns-ischemic-response.trigger-and-effect` CON-CVS-8E2C7AEC68C4CB,
`cushing-reflex.trigger-and-triad` CON-CVS-BBAEB2E1A51102), plus 7 more
questions routed onto the arterial-baroreceptor-reflex concept this
branch already added in the previous commit (carotid-body-vs-carotid-
sinus discrimination, hemorrhagic-shock clinical vignette, hypertension-
reflex-direction except-question, hypovolemic-shock clinical-signs
except-question x2) — 9 kept + 1 excluded across the file this commit.

**Extended `cardiovascular-autonomic-control-and-refractory-periods.ts`**
(Electrical Activity of the Heart leaf): +4 kept questions onto the
already-existing `autonomic-nervous-system.heart-rate-and-conduction-
velocity.chronotropy-dromotropy` concept (vagal-tone-withdrawal-raises-
HR, restated 3 times as duplicate-occurrence rows plus once combined with
the HR-to-CO-to-ABP chain) — **gap disclosed**: the HR-to-CO-to-ABP chain
itself is basic undisputed physiology, already established elsewhere in
this same pipeline's own cardiac-output concept, not invented fresh.

**Extended `physiology-cardiac-output-formula.ts`**: +1 kept question
(stroke-volume-from-CO/HR calculation) onto the already-existing
`cardiac-output.definition-formula-and-index` concept.

**Two self-caught defects, same class as prior sessions' own
precedent**: `baroreceptors-of-carotid-sinus-and-aortic-arch-are-
sensitive-5a5b4cb9` and `the-tendency-for-blood-flow-to-be-turbulent-is-
increased-by-19fbd049` were both drafted as kept questions on first pass,
but this commit's own `medical:batch` run flagged both (3 options each,
contract is 4 to 5 — the second row's own option C text is itself a merge
of two original choices that an earlier draft had wrongly split into
separate C/D options not actually present in the bank's own data).
Converted both to `exclude: true` before the final gate run; the fix is
reflected in the commit's own gate-line history (first run: 9 errors;
after fix: back to 7, all pre-existing/known-false-positive).

**3 rows left deliberately unclaimed, cluster still counted CLOSED** —
genuine source gaps/conflicts, not guessed past:
- `which-combination-of-the-following-local-factors-leads-to-ar-c8779f94`
  — the bank's own credited answer ("Decrease in CO2, increase in
  lactate and decrease in K+" as the combination causing arteriolar
  vasodilatation) directly contradicts both standard physiology and this
  session's own pinned `local-blood-flow-regulation` concept, which
  states explicitly that vasodilator metabolites are CO2, H+ and
  adenosine (i.e. INCREASED CO2 dilates, not decreased) — a genuine,
  sourced conflict between the bank's own key and a pinned, evidenced
  concept, escalated rather than resolved by picking a side, per the
  brachiocephalic-vein precedent documented earlier in this file.
- `atrial-natriuretic-peptide-6fd6b3d3` — tests ANP's own direct actions
  (secretion trigger, vasodilator/BP-lowering effect), which no 104-CPS
  article covers in any depth (the one live article that mentions ANP at
  all explicitly disclaims teaching it, "not covered by this article for
  reasons of scope"; the glossary term is too thin to source these
  specific claims). Left unauthored rather than sourced to nothing.
- `which-of-the-following-changes-would-not-occur-following-inh-ff65be24`
  — tests the RAAS/ACE-inhibitor mechanism (renin/aldosterone/sodium-
  reabsorption/peripheral-resistance), which no 104-CPS article covers
  beyond a single passing mention of "increased renin-angiotensin-
  aldosterone secretion" in the postural-hypotension concept — not enough
  depth to source this row's own specific pharmacology claims. Left
  unauthored rather than sourced to nothing.
All three flagged for the article-authoring lane (a dedicated local-
factors/RAAS/ANP article would resolve all three at once).

Gate (this commit): 569 kept (+27 from 542), 121 excluded (+5 from 116),
137 MCQ concepts (+9: 2 fresh mints + 7 pinned concepts' first appearance
in this pipeline's own files via sparse reuse). `medical:batch` full
`--with`: 7 errors — all pre-existing/known-false-positive (3
`library_ids`-coverage false positives on sparse-reused hand-authored
concepts, including 1 new one from this commit's own
`local-blood-flow-regulation` reuse, confirmed against the same false-
positive class documented earlier in this file; 4 pre-existing respiratory
3-option-contract rows), 0 new real errors (confirmed by an intermediate
run that caught and fixed the 2 self-caught defects above). `medical:
simulate` (positional, 11 files): `errors: []`, `skipped: []`, delta
concepts +242 / articles +57. `medical:audit --source`: 581 total errors
(systemic, pre-existing, +2 from the previous commit's 579 — both new
fresh-mint concept ids each showing only the same pre-existing
`needs_evidence` pair, 0 real errors introduced). `medical:duplicate-keys`:
0 canonical key collisions, 1 pre-existing label collision. Additive-only
id diff: 0 QM-104-* ids removed, +27 added, matching the kept-count delta
exactly.

## Next action (resume-first)

Vascular Function is CLOSED. Per the dispatch's own queued order, budget
permitting, continue to the next untouched CVS cluster. Recompute the
"what's left" leaf breakdown first (do not trust any prior count without
recomputing) — as of this session's own recompute at the start of the
Mechanical-Properties work, the largest untouched CVS leaves after this
session's two closures are likely **Basic Mechanisms of Circulatory
Control** (18 bank-tagged rows, though this session's own reroutes into
`physiology-circulatory-control-hemorrhagic-shock.ts` have already closed
a meaningful fraction of it — recompute before assuming how much remains)
and **Conducting Portion** (67, respiratory, a different organ system).
Check `104-CPS-physiology-concepts.md` / `104-CPS-histology-concepts.md`
for pinned, unimported concepts before minting anything on either, per
the heightened dedup mitigation — this session's own experience (12
pinned concepts found across two clusters) suggests the same is true
almost everywhere in this module.

HANDOFF: kasr-104-author-run36@<this commit's sha, see `git log -1`> ·
resume-first: recompute "what's left" leaf breakdown, then continue to
the next largest untouched CVS cluster (likely Basic Mechanisms of
Circulatory Control or Conducting Portion), checking pinned physiology/
histology concept files before minting.
