# Helwan Y1 × live-tree ID collision audit — 2026-09-02

Text-only integrity audit, dispatched off MUST Y5 MED501's finding that
`medical:simulate` silently resolved Helwan Y1 concept `CON-REN-B9E0531973510E`
to a live Kasr biochemistry record with an unrelated label. No content was
authored and production was not touched — this is a read-only audit against
the `codex/helwan-year1-content` branch and `origin/main`.

## Method

A small parser (`# Item` blocks → `id` / `canonical_key` / `label`) read every
`docs/Helwan-Source-Imports/{concept,article,question}/*.md` file at
`codex/helwan-year1-content` (never catted whole files — output only) and
every `docs/import-ready/{concept,article,question}/*.md` and
`docs/*-Source-Imports/{concept,article,question}/*.md` file on `origin/main`
(Helwan excluded — its own tree isn't merged there), plus the concept graph
and content ledger inside `server/data/medical-library-v1.json` (the
2026-08-12 fixture snapshot, stale by design — it predates Helwan and most of
the current Kasr/ASU/Alexandria trees, so it is a *lower bound*, not the
current live count).

| | Helwan Y1 unique IDs | Other-tree unique IDs |
|---|---|---|
| concept | 1,715 | 3,486 |
| article | 252 | 696 |
| question | 2,301 | 3,913 |

(1,715 vs the 1,698 quoted in the dispatch is file-count noise — some
concepts are re-declared as `type: update` rows across sibling family
batches; not investigated further, it doesn't change the findings below.)

## Findings

### (a) Exact ID collisions — same ID, live/other-tree record already exists

**Concept: 87. Article: 0. Question: 0.**

Helwan mints its own module-scoped IDs for brand-new concepts
(`CON-HU-BMS101-<SLUG>`, one script) and its own `QST-HU-*` / `ART-HU-*`
namespaces for questions and articles — those never collide. The 87
concept collisions all come from *other* Helwan author scripts (the
`HU-LCS-103-family*` set) that hand-typed a live `CON-<SYS>-<14hex>` ID into
a lookup table and marked the row `type: 'update'`, intending to reuse an
existing concept rather than mint a new one.

Breaking the 87 down by what actually differs:

| Split | Count | Risk |
|---|---|---|
| Same `canonical_key`, same label (paraphrase-free reuse) | 63 | eviction risk only (below) |
| Same `canonical_key`, label **reworded** (same fact, cosmetic) | 22 | content overwrite + eviction risk |
| Same `canonical_key`, label **reworded to a different fact** | **1** | genuine collision |
| Different `canonical_key`, identical label (cosmetic key only) | 1 | none |

The **1 genuine collision** is the one MED501 flagged:

- `CON-REN-B9E0531973510E`, key `teaching.bio2.secondary-metabolic-gout`
  - **Live (Kasr, `103-BMS-biochemistry-concepts.md` / fixture):**
    "Cancer, leukemia, and psoriasis can cause secondary metabolic gout
    through increased purine catabolism." — an etiology statement.
  - **Helwan overwrite (`HU-LCS-103-family163-q15-28-concepts.md`,
    `type: update`):** "Gout produces needle-shaped negatively birefringent
    urate crystals and hyperuricaemia in the local assessment pattern." — a
    lab/morphology vignette from Family-163 Q18 (leukemia-linked) + Q22
    (uric acid 15.7 mg/dL), definition/aliases/pitfalls/concept_type all
    replaced to match.

The other 22 reworded-but-same-fact rows are lower-severity instances of the
identical mechanism (e.g. `CON-INF-ABF1EA01540430` "An antibiotic is an
antimicrobial substance..." → "Antibiotics are low-molecular-weight
antimicrobial secondary metabolites..." — same fact, independently worded).
Full list of all 87 with both labels and file paths: `collision-results.json`
in this branch's scratch output is not committed (working data); regenerate
with the extraction script described below if needed.

### (b) Same canonical_key, different ID (duplicate ideas)

**0 found** between Helwan and the rest of the tree. Helwan's authoring
correctly avoided minting a second ID for a concept another lane already
owns under the same key — the 87 collisions above are all it produced, and
none of them are "two IDs, one idea" duplicates.

### (c) How Helwan minted IDs

Two different mechanisms exist in the Helwan lane, confirmed by reading the
scripts directly:

1. `scripts/helwan/HU-BMS-101-author.mjs` (brand-new concepts):
   `conceptId = (key) => 'CON-HU-BMS101-' + key.toUpperCase()...` — a
   literal, module-scoped ID, not a hash. Cannot collide with anything
   outside Helwan.
2. `scripts/helwan/HU-LCS-103-family163-*-author.mjs` (the collision
   source): a hard-coded object literal, e.g.
   `gout: 'CON-REN-B9E0531973510E'`, feeding `type: 'update'` rows. This
   does **not** go through `Instruction Manual for Content
   Creation/tools/mint-concept-id.mjs` at all — that tool mints
   `CON-<SYS>-sha256(canonical_key).slice(0,14)` and refuses a `canonical_key`
   whose hash is already taken. The family163 script bypasses it: the author
   searched the corpus, found an ID that looked like "the gout concept," and
   reused it by hand. The row is self-aware of this — its
   `rejected_merge_candidate_ids` field literally says *"Exact-ID update
   selected; no rival concept ID is introduced"* — but that judgment call
   was made against a label, not the full definition, and turned out wrong
   for this one concept.

**Verdict: not a hash collision, not a copied ID from the wrong file — a
manually reused ID (bypassing the mint tool's own collision check) that
`mergeAuthoringData`'s field-level semantics then let silently overwrite.**

### (d) A larger risk than the one collision: eviction

`docs/chief-of-staff/BOARD.md`'s 2026-08-27 Alexandria-probe entry already
documents this hazard class: *"full record on a found id evicts other
universities / un-publishes, reported as a plain update."*
`src/data/importMerge.ts`'s own header states the rule precisely: a field
the incoming row does not mention (`undefined`) survives; a field the row
**does** mention always replaces the existing value — a plain list (`hu`)
replaces, only a `+`-prefixed list (`+hu`) appends.

Checked all 87 Helwan collision rows for this: **84 of 87 are bare
full-record rows** (`## universities` = `hu`, not `+hu`; same for
`## learner_years` / `## modules`). Only 3 correctly used the sparse `+hu`
overlay convention `MANUAL-REVISION-BRIEF.md` requires for a live hit.

That means on **84 concepts**, if these batches applied as written, the
live `universityIds` (e.g. `["kau"]`), `learnerYears` (e.g. `[1,2,3]`) and
`moduleIds` were replaced with Helwan-only values (`["hu"]`, `[1]`,
`["HU-LCS-103"]`) rather than gaining `hu` alongside the existing owner.
This is a bigger blast radius than the single mislabeled concept — it risks
silently un-listing 84 concepts from Kasr's/ASU's/Alexandria's own
curricula, independent of whether the label also changed.

## Production risk verdict

Helwan Y1 landed via 93 guarded imports on 2026-08-31/09-01
(`codex/helwan-year1-content:docs/Helwan-Source-Imports/CLAUDE-HANDOVER.md`:
*"Final production read-back: 895 articles / 6,161 questions / 101
practicals / 4,750 concepts... Guarded imports: 93... every import was
dry-run first, had zero rejected rows, was committed, and was exact-read-back
as Draft."* — `HU-LCS-103` (34 batches, family163 included) is in that
read-back table, so this is not hypothetical: these rows are live.)

Per collision:

- **`CON-REN-B9E0531973510E` — OVERWRITTEN.** Label/definition/aliases/
  pitfalls/concept_type replaced with Helwan's crystal+leukemia+lab-value
  framing; `universityIds`/`learnerYears` likely narrowed from Kasr's
  `["kau"]`/`[1,2,3]` to `["hu"]`/`[1]` (bare-record row). Status remains
  `under review` / `needs_evidence`, so students see nothing today — but any
  lane (like MED501) that searches or simulates against this ID now gets
  Helwan's version, not Kasr's.
- **22 reworded-but-same-fact concepts — OVERWRITTEN (content), likely
  MERGED-DOWN (tagging).** No meaning change, but original curator wording
  is gone from the live record, and (being bare-record) the
  university/year/module tagging is at the same eviction risk.
- **61 same-label full-record hits — likely MERGED-DOWN (tagging only).**
  Label unaffected because it happened to match; university/year/module
  tagging still at eviction risk from the bare-record shape.
- **3 sparse `+hu` hits — UNAFFECTED.** Correctly done.

This audit did **not** query production — the fixture used is the stale
2026-08-12 snapshot, and no `medical:simulate`/DB read was run against
current live state. The overwrite/eviction verdicts above are derived from
the documented merge semantics (`importMerge.ts`, the BOARD.md hazard note)
applied to what the Helwan batch files actually contain, not from a
confirmed prod read-back.

## Fix plan

1. **Split the one genuine collision.** Mint a new ID via
   `mint-concept-id.mjs` for Helwan's Family-163 Q18/Q22 fact (a
   disambiguating key, e.g. `teaching.msk.gout.secondary-crystal-lab-pattern`).
   Restore `CON-REN-B9E0531973510E`'s label/definition/aliases/pitfalls/
   concept_type to the original Kasr wording (source:
   `docs/Kasr-Source-Imports/concept/103-BMS-biochemistry-concepts.md`).
   Re-point the Helwan question(s), `CLM-REN-B9E0531973510E`, and article
   link to the new ID.
2. **Convert the 84 bare-record rows to sparse overlays.** For each, change
   `## universities` / `## learner_years` / `## modules` to `+hu` /
   `+HU_Y1` / `+HU-LCS-103` (append, not replace) and drop the label/
   definition/aliases fields back to blank (inherit) unless the content is
   the deliberate fix in step 1. Re-apply via
   `apply-content-import-to-db.mjs --commit` per file, dry-run first.
3. **Sparse-restore any concept whose universityIds/learnerYears were
   already evicted** by cross-referencing the owning university's
   `*-Source-Imports` record (union the lost values back in) — this needs a
   live read to know which of the 84 actually lost tagging versus which
   silently no-opped because the values happened to already match.
4. **Verify via a production read-back** once the synapsedb tunnel is up:
   pull `synapse-concept-graph-v2` for the 87 IDs listed above, confirm
   `universityIds` includes every originally-listed university (not just
   `hu`) and that `CON-REN-B9E0531973510E`'s label matches the restored
   Kasr wording, not the Helwan one.

## Guard landed

Added a third pass to `scripts/report-duplicate-keys.ts` — §3 "One ID, more
than one canonical key" (~24 lines: a `byId` grouping symmetric to the
existing `byKey`/`byLabel` passes, plus its report section and a
console-summary line). This is exactly the exact-id/different-key check
this collision would have shown up in, had Helwan's tree been merged before
running it.

- `node --experimental-strip-types scripts/report-duplicate-keys.ts` runs
  clean and found **9 pre-existing (unrelated, low-risk) cases** already in
  `origin/main` — same-fact concepts whose `canonical_key` was renamed after
  the ID was minted (all same-label, all low risk), confirming the check
  fires correctly on real data with zero false positives.
- `npm test` — 1934/1934 passing.
- Not in scope here but worth a follow-up: this guard catches
  same-id/different-key, not the bare-vs-`+`-prefixed eviction risk in
  finding (d) above, which is the larger blast radius. That needs its own
  check (a batch row on a live-hit ID whose list fields aren't `+`-prefixed
  should warn) — flagging as a separate follow-up, not implemented here.
