# ZU-MED-104 (Musculoskeletal & Integumentary) — msk-final-sba cluster ledger

**Tool note (same wall the ZU-MED-106 lane found):** `node scripts/content/ledger.mjs
docs/Zagazig-Source-Imports/coverage/seeds/ZU-MED-104 --triage
docs/Zagazig-Source-Imports/coverage/ZU-MED-104-triage-keys.txt` reports all 36 authored
keys as "remaining", 0 authored — **not accurate**, the same pre-existing `clusterForKey()`
limitation the ZU-MED-106 LEDGER documents: it strips only a trailing `-qNN` suffix to
bucket a triage key under a synthetic cluster, so `msk-final24-q01`...`msk-final24-q36`
bucket under the synthetic cluster `msk-final24`, never matching the seed's own declared
`cluster: "msk-final-sba"` — the authored-keys set and the remaining-keys lookup end up in
two different map entries and can never intersect. This table is hand-verified against the
seed and the gate-clean batch instead (raw tool output preserved below for the record).

## Cluster: msk-final-sba

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

## Held

(none)

## Out of scope this pass (not "held" — never routed to this cluster)

The triage's 9 structured-essay questions (`coverage/ZU-MED-104-triage-keys.txt` header
note) have no single-letter key — essay-format, graded by rubric/department book — so the
dispatch scoped this pass to the 36 keyed SBA items only and these were never seeded.
`Fakous MSK Summer 2024.pdf` (a distinct resit paper, OCR'd this pass but not yet fully
read/keyed) and the OSPE image-identification file are likewise out of scope this pass —
see `coverage/ZU-MED-104-triage.md` "not authored this pass".

## Concept resolution for the 36 authored SBA questions

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

## Gate summary

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

## Raw ledger.mjs output (tool-limitation artifact, not accurate — see note above)

| cluster | authored | held | remaining | total |
|---|---:|---:|---:|---:|
| msk-final-sba | 36 | 0 | 0 | 36 |
| msk-final24 | 0 | 0 | 36 | 36 |

The `msk-final-sba` row (from the seed's own declared `cluster` field) correctly shows
36/0/0/36 — genuinely accurate. The `msk-final24` row is the synthetic cluster the
`--triage` flag's key-bucketing bug produces; its "0 authored / 36 remaining" is the
inaccurate half this tool note explains.
