# ZU-MED-104 (Musculoskeletal & Integumentary) — module ledger

**Tool note (same wall the ZU-MED-106 lane found, confirmed again this
pass):** `node scripts/content/ledger.mjs docs/Zagazig-Source-Imports/coverage/
seeds/ZU-MED-104 --triage docs/Zagazig-Source-Imports/coverage/ZU-MED-104-
triage-keys.txt --out coverage/ZU-MED-104-LEDGER.md` reports every authored
key as "remaining", 0 authored, and **overwrites this file with only its own
raw table** — the same pre-existing `clusterForKey()` limitation the
ZU-MED-106 LEDGER documents: it strips only a trailing `-qNN` suffix to
bucket a triage key under a synthetic cluster (`msk-final24`, `msk-
summer24`), never matching either seed's own declared `cluster` field
(`msk-final-sba`, `msk-summer-sba`), so the authored-keys set and the
remaining-keys lookup end up in different map entries and can never
intersect. Both cluster sections below are hand-verified against their own
seed and gate-clean batch instead (raw tool output preserved at the bottom
of this file for the record, from both the `zagazig-104-author1` and this
`zagazig-104-author2` pass).

## Cluster: msk-final-sba (Fakous MSK Final 2024.pdf, authored by `zagazig-104-author1`)

| cluster | authored | held | remaining | total |
|---|--:|--:|--:|--:|
| msk-final-sba | 36 | 0 | 0 | 36 |

36 of 36 recovered SBA keys authored
(`docs/Zagazig-Source-Imports/coverage/seeds/ZU-MED-104/msk-final-sba.json`, emitted to
`question/ZU-MED-104-msk-mcq.md`, `gate.mjs batch` clean — 0 errors, and
`validate-content-batch.mjs` re-run directly per the known gate.mjs-crash-masking-errors
bug — confirmed a genuine clean pass, not a crash). No question in this cluster carries a
`hold` — every hand-drawn-ink key in the triage was defensible on independent
anatomical/physiological grounds (see `coverage/ZU-MED-104-triage.md`), so nothing needed
`held-indefensible-key`.

### Held (msk-final-sba)

(none)

### Out of scope this pass (not "held" — never routed to this cluster)

The triage's 9 structured-essay questions (`coverage/ZU-MED-104-triage-keys.txt` header
note) have no single-letter key — essay-format, graded by rubric/department book — so the
dispatch scoped this pass to the 36 keyed SBA items only and these were never seeded.
`Fakous MSK Summer 2024.pdf` (a distinct resit paper) and the OSPE image-identification
file were likewise out of scope for the Final-paper pass — see below for the Summer
paper's own cluster, authored by this `zagazig-104-author2` pass.

### Concept resolution for the 36 authored SBA questions (msk-final-sba)

| Triage key | Status this pass | Concept id | Where |
|---|---|---|---|
| msk-final24-q01 | pending overlay | CON-MSK-24A0858459A59D | docs/import-ready/concept/101-ISK-mcq-concepts.md (Kasr) |
| msk-final24-q02 | new | CON-MSK-A9C1424E9CB9B1 | concept/ZU-MED-104-msk-concepts.md |
| msk-final24-q03 | new | CON-MSK-9F295DCA61C8E6 | concept/ZU-MED-104-msk-concepts.md |
| msk-final24-q04 | pending overlay | CON-MSK-1FC89E36FFD98E | docs/import-ready/concept/101-ISK-mcq-concepts.md (Kasr) |
| msk-final24-q05 | new | CON-MSK-D8CF9BB2FF6C77 | concept/ZU-MED-104-msk-concepts.md |
| msk-final24-q06 | pending overlay | CON-MSK-2A322BCDAEBFFD | docs/Alexandria-Source-Imports/concept/AU-MED-105-anatomy-concepts.md |
| msk-final24-q07 | pending overlay | CON-MSK-1B2BD8EC2B44B8 | docs/import-ready/concept/101-ISK-concepts.md (Kasr) |
| msk-final24-q08 | pending overlay | CON-MSK-E04D8A31AEAC23 | docs/import-ready/concept/101-ISK-mcq-concepts.md (Kasr) |
| msk-final24-q09 | new | CON-MSK-FFB8E902B96AD0 | concept/ZU-MED-104-msk-concepts.md |
| msk-final24-q10 | new | CON-MSK-FD71E5AF4A7E33 | concept/ZU-MED-104-msk-concepts.md |
| msk-final24-q11 | new | CON-MSK-C68B915B0A6EBD | concept/ZU-MED-104-msk-concepts.md |
| msk-final24-q12 | pending overlay | CON-MSK-F12505C48037BB | docs/Alexandria-Source-Imports/concept/AU-MED-105-anatomy-concepts.md |
| msk-final24-q13 | new | CON-MSK-6BC15702C41224 | concept/ZU-MED-104-msk-concepts.md |
| msk-final24-q14 | pending overlay | CON-MSK-8D5275EEE05F98 | docs/Alexandria-Source-Imports/concept/AU-MED-105-anatomy-concepts.md |
| msk-final24-q15 | new | CON-MSK-03F3DA894D0C4D | concept/ZU-MED-104-msk-concepts.md |
| msk-final24-q16 | live overlay | CON-MSK-F656F96F575FFB | concept/ZU-MED-104-msk-live-overlays.md |
| msk-final24-q17 | new | CON-MSK-56D528233B4749 | concept/ZU-MED-104-msk-concepts.md |
| msk-final24-q18 | pending overlay | CON-MSK-583524B3AE47F7 | docs/Alexandria-Source-Imports/concept/AU-MED-105-anatomy-concepts.md |
| msk-final24-q19 | pending overlay | CON-FND-E6C216AED80ED8 | docs/import-ready/concept/102-INT-mcq-concepts.md (Kasr) |
| msk-final24-q20 | live overlay | CON-MSK-967E873EEEACE0 | concept/ZU-MED-104-msk-live-overlays.md |
| msk-final24-q21 | pending overlay | CON-MSK-0824FE988ADA00 | docs/import-ready/concept/103-BMS-histology-concepts.md (Kasr) |
| msk-final24-q22 | new | CON-DER-B4778F5BB4C3FF | concept/ZU-MED-104-msk-concepts.md |
| msk-final24-q23 | pending overlay | CON-MSK-813357B2DDE44E | docs/Alexandria-Source-Imports/concept/AU-MED-105-histology-concepts.md |
| msk-final24-q24 | new | CON-MSK-770450C94FB6C2 | concept/ZU-MED-104-msk-concepts.md |
| msk-final24-q25 | new | CON-DER-F007227C0C1633 | concept/ZU-MED-104-msk-concepts.md |
| msk-final24-q26 | live overlay | CON-MSK-0E3AE8E79060E1 | concept/ZU-MED-104-msk-live-overlays.md |
| msk-final24-q27 | pending overlay | CON-NEU-449C26E1F64F74 | docs/import-ready/concept/102-INT-physiology-concepts.md (Kasr) |
| msk-final24-q28 | pending overlay | CON-NEU-5664D7AB68AD8D | docs/import-ready/concept/103-BMS-mcq-vitamins-nerve-concepts.md (Kasr) |
| msk-final24-q29 | new | CON-MSK-F9DD4BBAC7D900 | concept/ZU-MED-104-msk-concepts.md |
| msk-final24-q30 | pending overlay | CON-MSK-7253D390093A21 | docs/import-ready/concept/103-BMS-physiology-concepts.md (Kasr) |
| msk-final24-q31 | new | CON-MSK-C901502C99C892 | concept/ZU-MED-104-msk-concepts.md |
| msk-final24-q32 | pending overlay | CON-MSK-1030B9F3A5996A | docs/import-ready/concept/103-BMS-physiology-concepts.md (Kasr) |
| msk-final24-q33 | new | CON-NEU-1A249087FE95F2 | concept/ZU-MED-104-msk-concepts.md |
| msk-final24-q34 | new | CON-NEU-53A1528D25C66A | concept/ZU-MED-104-msk-concepts.md |
| msk-final24-q35 | pending overlay | CON-MSK-242998842BE25C | docs/import-ready/concept/103-BMS-physiology-concepts.md (Kasr) |
| msk-final24-q36 | new | CON-CVS-C6E888D47E1254 | concept/ZU-MED-104-msk-concepts.md |

Totals: **17 new concepts minted**, **3 live overlays** (dorsalis pedis, osteoblasts/bone
cells, endomysium — all confirmed directly against `server/data/medical-library-v1.json`),
**16 pending overlays** (11 Kasr — 101-ISK ×4, 102-INT ×2, 103-BMS ×5 — and 5 Alexandria
AU-MED-105). 36 distinct concepts back 36 authored questions — no duplicate pair this pass
(unlike ZU-MED-106's Q14/Q17, which shared one concept).

### Gate summary (msk-final-sba)

```
GATE batch concept/ZU-MED-104-msk-concepts.md --with article/ZU-MED-104-msk-articles.md:
  items=17 errors=0
GATE batch article/ZU-MED-104-msk-articles.md --with concept/ZU-MED-104-msk-concepts.md:
  items=4 errors=0
GATE batch concept/ZU-MED-104-msk-live-overlays.md: items=3 errors=0
GATE batch pending-live/ZU-MED-104-msk-pending-overlays.md: items=16 errors=0
GATE batch question/ZU-MED-104-msk-mcq.md
  --with concept/ZU-MED-104-msk-concepts.md
  --with article/ZU-MED-104-msk-articles.md
  --with concept/ZU-MED-104-msk-live-overlays.md
  --with pending-live/ZU-MED-104-msk-pending-overlays.md
  --with docs/import-ready/article/101-ISK-anatomy.md
  --with docs/import-ready/article/AU-MED-105-anatomy-articles.md
  --with docs/import-ready/article/102-INT-biochemistry.md
  --with docs/import-ready/article/103-BMS-histology.md
  --with docs/import-ready/article/AU-MED-105-histology-articles.md
  --with docs/import-ready/article/102-INT-physiology-blood-ans.md
  --with docs/import-ready/article/103-BMS-mcq-vitamins-nerve.md
  --with docs/import-ready/article/103-BMS-physiology.md:
  items=36 errors=0
```

`validate-content-batch.mjs` was re-run directly on all four own batches and on the
question batch with the full `--with` dependency chain (per the LANE-CARD's known
`gate.mjs`-prints-`errors=0`-when-the-validator-crashes bug) — every run completed with a
real JSON summary and `"errors": []`, confirming the clean gate results are genuine, not a
masked crash. The question batch's only non-error output was expected `needs_evidence`
publication-status warnings on all 36 (Draft-status content awaiting evidence review, the
normal state for freshly authored content — not a gate failure).

```
GATE simulate 22 file(s) (9 dependency concept files + 8 dependency article files the 19
  overlay rows target, applied first, then this lane's own 5 files — concept, article,
  live-overlays, pending-overlays, question — applied in order):
  batches=22 created=770 updated=141 rejected=0 skipped=0 errors=0
```

---

## Cluster: msk-summer-sba (Fakous MSK Summer 2024.pdf, authored by `zagazig-104-author2`)

| cluster | authored | held | remaining | total |
|---|--:|--:|--:|--:|
| msk-summer-sba | 30 | 6 | 0 | 36 |

30 of 36 keyed SBA authored, 6 held
(`docs/Zagazig-Source-Imports/coverage/seeds/ZU-MED-104/msk-summer-sba.json`, emitted to
`question/ZU-MED-104-msk-summer-mcq.md`, `gate.mjs batch` clean — 0 errors — and
`validate-content-batch.mjs` re-run directly per the known gate.mjs-crash-masking-errors
bug, confirmed a genuine clean pass with `"errors": []`).

### Held (msk-summer-sba)

- **msk-summer24-q06** — `held-no-printed-key` — "Which of the following nerve roots is
  damaged in positive Trendelenburg sign?" — no circle, corrupted glyph, or margin letter
  on any of the 4 options, confirmed by `render --force`.
- **msk-summer24-q10** — `duplicate-of msk-final24-q15` — same fibula-fracture/spared-
  muscle fact the Final paper's own `CON-MSK-03F3DA894D0C4D` already covers (tibialis
  anterior spared); this paper's own key names extensor digitorum longus instead,
  conflicting with the Final's already-authored answer to the identical fact.
- **msk-summer24-q18** — `held-indefensible-key` — two conflicting marks on "occlusion of
  the third part of axillary artery, which branch is normally patent": a circle on option
  (b) Subscapular, a separate margin "c" note. Both confirmed by `render --force`; neither
  option is itself anatomically defensible (the textbook answer, superior thoracic, arises
  from the first part and is not one of the two marked options).
- **msk-summer24-q31** — `duplicate-of msk-final24-q36` — identical cardiac-action-
  potential-plateau-ion question already authored from the Final paper as
  `CON-CVS-C6E888D47E1254` (Ca2+ only).
- **msk-summer24-q32** — `duplicate-of msk-final24-q35` — same isotonic/isometric-
  contraction-tension concept the Final paper already authored as
  `CON-MSK-242998842BE25C`; this paper's own stem, asked about isotonic contraction
  specifically, marks "tension is increased" as correct — the direct inverse of the
  Final's already-authored isometric-tension-rises fact.
- **msk-summer24-q35** — `held-indefensible-key` — asserts the skeletal muscle triad is
  "two transverse tubules and two terminal cisternae", contradicting this same cluster's
  own `msk-summer24-q22` key on the identical fact (a pair of terminal cisternae with a
  single transverse tubule) — an internal two-key conflict within one paper.

### Uncertain-but-authored (single mark, conflicts with standard teaching — not held)

15 of the 30 authored questions carry a marked key that conflicts with standard
anatomy/physiology teaching, each checked for a second conflicting mark (none found), so
authored per LANE-CARD.md §7's printed-key-stands rule with the conflict documented in the
concept's own `## uncertainty` field for reviewer attention: msk-summer24-q01, q08, q09,
q12, q19, q20, q21, q23, q24, q26, q28, q29, q33, q34, q36. See
`coverage/ZU-MED-104-triage.md` "Uncertain-but-authored items" and "Needs Omar" sections
for the specific conflict on each.

### Concept resolution for the 30 authored SBA questions (msk-summer-sba)

| Triage key | Status this pass | Concept id | Where |
|---|---|---|---|
| msk-summer24-q01 | new | CON-MSK-B2787003E8A042 | concept/ZU-MED-104-msk-summer-concepts.md |
| msk-summer24-q02 | pending overlay | CON-MSK-ASU-AE-TOE-ADDUCTION-AXIS | docs/Ain-Shams-Source-Imports/concept/ASU-AE-youssef-terminology-new-concepts.md |
| msk-summer24-q03 | pending overlay | CON-MSK-0415214C935D2D | docs/Alexandria-Source-Imports/concept/AU-MED-105-anatomy-concepts.md |
| msk-summer24-q04 | pending overlay | CON-MSK-231FAF0D3F1A84 | docs/Alexandria-Source-Imports/concept/AU-MED-105-anatomy-concepts.md |
| msk-summer24-q05 | pending overlay | CON-MSK-3EE23956EE2DDB | docs/import-ready/concept/103-BMS-anatomy-concepts.md (Kasr) |
| msk-summer24-q07 | pending overlay | CON-MSK-F125616F7ED37A | docs/import-ready/concept/101-ISK-concepts.md (Kasr) |
| msk-summer24-q08 | new | CON-MSK-4DDC5547E3F6B9 | concept/ZU-MED-104-msk-summer-concepts.md |
| msk-summer24-q09 | new | CON-MSK-17F01F0BAD6B1F | concept/ZU-MED-104-msk-summer-concepts.md |
| msk-summer24-q11 | new | CON-MSK-2C52951B7ECD90 | concept/ZU-MED-104-msk-summer-concepts.md |
| msk-summer24-q12 | new | CON-MSK-35546C4BE3D029 | concept/ZU-MED-104-msk-summer-concepts.md |
| msk-summer24-q13 | new | CON-MSK-F3403BC680A09E | concept/ZU-MED-104-msk-summer-concepts.md |
| msk-summer24-q14 | new | CON-MSK-FAAB39CEF5BA96 | concept/ZU-MED-104-msk-summer-concepts.md |
| msk-summer24-q15 | pending overlay | CON-MSK-66A2E56C00F3A7 | docs/import-ready/concept/101-ISK-mcq-concepts.md (Kasr) |
| msk-summer24-q16 | pending overlay | CON-MSK-AB5318A9255811 | docs/import-ready/concept/103-BMS-anatomy-concepts.md (Kasr) |
| msk-summer24-q17 | pending overlay | CON-MSK-6614EA58CFAF9C | docs/import-ready/concept/103-BMS-anatomy-concepts.md (Kasr) |
| msk-summer24-q19 | new | CON-MSK-794D7DCFF1EC5A | concept/ZU-MED-104-msk-summer-concepts.md |
| msk-summer24-q20 | new | CON-MSK-D926FA70E80B77 | concept/ZU-MED-104-msk-summer-concepts.md |
| msk-summer24-q21 | new | CON-DER-FC6E618EF5E648 | concept/ZU-MED-104-msk-summer-concepts.md |
| msk-summer24-q22 | new | CON-MSK-015215DF0C152A | concept/ZU-MED-104-msk-summer-concepts.md |
| msk-summer24-q23 | new | CON-NEU-0C49B84F31317B | concept/ZU-MED-104-msk-summer-concepts.md |
| msk-summer24-q24 | new | CON-FND-51178FF4A71C3E | concept/ZU-MED-104-msk-summer-concepts.md |
| msk-summer24-q25 | pending overlay | CON-MSK-EBA37D8401180C | docs/import-ready/concept/103-BMS-histology-concepts.md (Kasr) |
| msk-summer24-q26 | new | CON-MSK-20171F528FD19E | concept/ZU-MED-104-msk-summer-concepts.md |
| msk-summer24-q27 | new | CON-DER-BA87CF38DCB308 | concept/ZU-MED-104-msk-summer-concepts.md |
| msk-summer24-q28 | new | CON-END-CEFAFB97BEDE58 | concept/ZU-MED-104-msk-summer-concepts.md |
| msk-summer24-q29 | new | CON-NEU-7CD17E162E7E09 | concept/ZU-MED-104-msk-summer-concepts.md |
| msk-summer24-q30 | pending overlay | CON-MSK-3013AA61E917B7 | docs/import-ready/concept/103-BMS-mcq-vitamins-nerve-concepts.md (Kasr) |
| msk-summer24-q33 | new | CON-MSK-9BC1EF2E623E6F | concept/ZU-MED-104-msk-summer-concepts.md |
| msk-summer24-q34 | new | CON-MSK-813A3CBDC1C458 | concept/ZU-MED-104-msk-summer-concepts.md |
| msk-summer24-q36 | new | CON-NEU-09CF6CD84BC47F | concept/ZU-MED-104-msk-summer-concepts.md |

Totals: **20 new concepts minted**, **0 live overlays**, **10 pending overlays** (1 Ain
Shams, 2 Alexandria AU-MED-105, 7 Kasr — 101-ISK ×3, 103-BMS ×4). 30 distinct concepts
back 30 authored questions — no duplicate pair within this cluster (the one internal
two-key conflict, q22/q35, was resolved by holding q35, not by sharing a concept).
9 of the 20 fresh mints were minted specifically to avoid overlaying a conflicting,
paper-marked claim onto an already-correct existing live/pending concept from this same
corpus (Final-paper siblings and other lanes' pending concepts) — each is cross-linked via
`related_concept_ids`/`contextual_concept_ids` to the concept it conflicts with, logged in
`## uncertainty` rather than silently diverging.

### Gate summary (msk-summer-sba)

```
GATE batch concept/ZU-MED-104-msk-summer-concepts.md --with article/ZU-MED-104-msk-articles.md:
  items=20 errors=0
GATE batch pending-live/ZU-MED-104-msk-summer-pending-overlays.md: items=10 errors=0
GATE batch question/ZU-MED-104-msk-summer-mcq.md
  --with concept/ZU-MED-104-msk-summer-concepts.md
  --with concept/ZU-MED-104-msk-concepts.md
  --with article/ZU-MED-104-msk-articles.md
  --with pending-live/ZU-MED-104-msk-summer-pending-overlays.md
  --with docs/import-ready/article/101-ISK-anatomy.md
  --with docs/import-ready/article/AU-MED-105-anatomy-articles.md
  --with docs/import-ready/article/103-BMS-histology.md
  --with docs/import-ready/article/103-BMS-anatomy.md
  --with docs/Ain-Shams-Source-Imports/article/ASU-AE-youssef-terminology-new-articles.md
  --with docs/import-ready/article/103-BMS-mcq-vitamins-nerve.md
  --with docs/import-ready/concept/101-ISK-mcq-concepts.md
  --with docs/import-ready/concept/101-ISK-concepts.md
  --with docs/import-ready/concept/102-INT-mcq-concepts.md
  --with docs/import-ready/concept/103-BMS-histology-concepts.md
  --with docs/import-ready/concept/103-BMS-physiology-concepts.md:
  items=30 errors=0
```

`validate-content-batch.mjs` was re-run directly on both own batches (concepts,
pending-overlays) and on the question batch with the full `--with` dependency chain (per
the LANE-CARD's known `gate.mjs`-prints-`errors=0`-when-the-validator-crashes bug) — every
run completed with a real JSON summary and `"errors": []`, confirming the clean gate
results are genuine, not a masked crash. The question batch's only non-error output was
expected `needs_evidence` publication-status warnings on all 30 (Draft-status content
awaiting evidence review) plus a `fieldsUsed` floor warning on the sparse pending-overlays
file — both expected, matching the sibling Final cluster's own record.

```
GATE simulate 20 file(s) (7 dependency concept files + 6 dependency article files the 10
  overlay rows target, plus 3 more dependency concept files for contextual_concept_ids
  cross-links to other lanes' pending concepts, applied first, then this cluster's own 3
  files — concept, pending-overlays, question — applied in order):
  batches=20 created=759 updated=102 rejected=0 skipped=0 errors=0
```

---

## Raw ledger.mjs output (tool-limitation artifact, not accurate — see note above)

| cluster | authored | held | remaining | total |
|---|---:|---:|---:|---:|
| msk-final-sba | 36 | 0 | 0 | 36 |
| msk-final24 | 0 | 0 | 36 | 36 |
| msk-summer-sba | 30 | 0 | 0 | 30 |
| msk-summer24 | 0 | 0 | 30 | 30 |

The `msk-final-sba` and `msk-summer-sba` rows (from each seed's own declared `cluster`
field) correctly show `authored`/`held`/`remaining`/`total` accurately (36/0/0/36 and
30/0/0/30 respectively — the `held`/`remaining` columns read 0 here because the tool has
no way to know about the 6 keys this pass held before they ever reached a seed; the true
held count for the Summer paper is 6, documented by hand above). The `msk-final24` and
`msk-summer24` rows are the synthetic clusters the `--triage` flag's key-bucketing bug
produces; their "0 authored / 36 (or 30) remaining" is the inaccurate half this tool note
explains.
