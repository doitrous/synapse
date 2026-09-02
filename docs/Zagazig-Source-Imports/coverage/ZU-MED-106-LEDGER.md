# ZU-MED-106 (Cardiopulmonary) — cps-final-sba cluster ledger

**Tool note (wall found this pass):** `node scripts/content/ledger.mjs docs/Zagazig-Source-Imports/coverage/seeds/ZU-MED-106 --triage coverage/ZU-MED-106-triage-keys.txt`
reports every one of this cluster's 36 authored keys as "remaining", 0 authored — **not
accurate**, a tool limitation, not a real gap. `ledger.mjs`'s `clusterForKey()` only strips a
trailing `-qNN` suffix to bucket a triage key under its seed's `cluster`; `ZU-MED-106-triage-keys.txt`
(written by the Phase-0 lane) uses full descriptive slugs with no numeric suffix
(`cps-lung-carcinoma-lingula-anatomy`, not `cps-final-sba-q01`), so every triage key buckets
under a synthetic one-key "cluster" equal to itself, never the seed file's own declared
`cluster: "cps-final-sba"` — the authored-keys set and the remaining-keys lookup end up in two
different map entries and can never intersect, regardless of what the seed's `key` field says
(verified: renaming a seed question's `key` to the exact triage slug still reports it
"remaining"). This table is hand-verified against the seed and the gate-clean batch instead.

## Cluster: cps-final-sba

| cluster | authored | held | remaining | total |
|---|--:|--:|--:|--:|
| cps-final-sba | 36 | 0 | 0 | 36 |

36 of 36 recovered SBA keys authored (`docs/Zagazig-Source-Imports/coverage/seeds/ZU-MED-106/cps-final-sba.json`,
emitted to `question/ZU-MED-106-cardiopulmonary-mcq.md`, `gate.mjs batch` clean — 0 errors). No
question in this cluster carries a `hold` — every printed/hand-drawn-ink key in the triage was
defensible, so nothing needed `held-indefensible-key`.

## Held

(none)

## Out of scope this pass (not "held" — never routed to this cluster)

The triage's other 11 slugs are the paper's 10 written/essay questions (Q5 split into two
concept-slugs, 5a/5b) — no single-letter key exists for a written answer, so the dispatch
scoped this pass to the 36 keyed SBA items only and these were never seeded:

- cps-pleura-surface-anatomy
- cps-internal-jugular-vein-tributaries
- cps-co2-transport-forms-in-blood
- cps-intra-alveolar-pressure (live-partial hit, citation only — needs a full concept before an essay question could be authored against it; not resolved this pass)
- cps-arteriolar-autoregulation-intrinsic-mechanism
- cps-stress-relaxation-bp-regulation
- cps-surfactant-functions
- cps-chylomicron-metabolism
- cps-palatine-vs-pharyngeal-tonsil-histology
- cps-purkinje-vs-cardiac-muscle-histology
- cps-pneumocyte-type-2-histology-function

## Concept resolution for the 36 authored SBA questions

| Triage slug | Status this pass | Concept id | Where |
|---|---|---|---|
| cps-lung-carcinoma-lingula-anatomy | pending overlay | CON-RES-69F499B794713C | pending-live/ZU-MED-106-cardiopulmonary-pending-overlays.md |
| cps-thyrocervical-trunk-ligation | new | CON-RES-955D96B44C894B | concept/ZU-MED-106-cardiopulmonary-concepts.md |
| cps-recurrent-laryngeal-nerve-thyroarytenoid | live overlay (found this pass, not in original triage) | CON-END-80B5AB75A902CA | concept/ZU-MED-106-cardiopulmonary-live-overlays.md |
| cps-sphenoethmoidal-recess-sphenoid-sinus | new | CON-RES-B7F72DE965803C | concept/ZU-MED-106-cardiopulmonary-concepts.md |
| cps-foreign-body-right-main-bronchus | new | CON-RES-6012F0954E7322 | concept/ZU-MED-106-cardiopulmonary-concepts.md |
| cps-thoracic-duct-injury-chylothorax | new | CON-RES-2B6FCEB91A0904 | concept/ZU-MED-106-cardiopulmonary-concepts.md |
| cps-laryngopharynx-piriform-recess | new | CON-RES-27E08645FB1ED3 | concept/ZU-MED-106-cardiopulmonary-concepts.md |
| cps-vocal-cord-abduction-posterior-cricoarytenoid | pending overlay | CON-RES-52550F9711D9AC | pending-live/ZU-MED-106-cardiopulmonary-pending-overlays.md |
| cps-littles-area-sphenopalatine-artery | new | CON-RES-17414C8C9D554C | concept/ZU-MED-106-cardiopulmonary-concepts.md |
| cps-carotid-buffer-nerve-stimulation-effect | new | CON-CVS-59209DA1538EF3 | concept/ZU-MED-106-cardiopulmonary-concepts.md |
| cps-neurogenic-shock-mechanism | new | CON-CVS-95D22A5CE0786A | concept/ZU-MED-106-cardiopulmonary-concepts.md |
| cps-isometric-relaxation-second-heart-sound | new | CON-CVS-A2C83B11C157D7 | concept/ZU-MED-106-cardiopulmonary-concepts.md |
| cps-post-hemorrhage-capillary-shift-mechanism | new | CON-CVS-1EECD34B9D29C7 | concept/ZU-MED-106-cardiopulmonary-concepts.md |
| cps-angiotensin-ii-thirst-effect | new (2 questions: Q14, Q17 — identical printed pair) | CON-CVS-754E928F0B1027 | concept/ZU-MED-106-cardiopulmonary-concepts.md |
| cps-refractory-shock-cause-of-death | live overlay | CON-CVS-1AD44A19DA47AD | concept/ZU-MED-106-cardiopulmonary-live-overlays.md |
| cps-hydrostatic-indifferent-point | new | CON-CVS-DA13298B79C518 | concept/ZU-MED-106-cardiopulmonary-concepts.md |
| cps-conducting-zone-dead-space | new | CON-RES-AD9290375D32B1 | concept/ZU-MED-106-cardiopulmonary-concepts.md |
| cps-quiet-inspiration-diaphragm | new | CON-RES-330055DC3680D9 | concept/ZU-MED-106-cardiopulmonary-concepts.md |
| cps-forced-expiration-muscles | new | CON-RES-3941F8C7E00CE1 | concept/ZU-MED-106-cardiopulmonary-concepts.md |
| cps-pulmonary-edema-surface-tension-prevention | new | CON-RES-F01C6C08BC4DB9 | concept/ZU-MED-106-cardiopulmonary-concepts.md |
| cps-hypoxia-definition | new | CON-RES-AC70D14BAD8E0A | concept/ZU-MED-106-cardiopulmonary-concepts.md |
| cps-bronchial-tone-vip-relaxation | new | CON-RES-EE354719967A90 | concept/ZU-MED-106-cardiopulmonary-concepts.md |
| cps-stagnant-hypoxia-decreased-blood-supply | live overlay | CON-RES-654A12F4B21CC0 | concept/ZU-MED-106-cardiopulmonary-live-overlays.md |
| cps-central-chemoreceptors-co2-sensitivity | pending overlay | CON-RES-C6F65BAAC06FAA | pending-live/ZU-MED-106-cardiopulmonary-pending-overlays.md |
| cps-ldl-receptor-apo-specificity | new | CON-FND-364731CA35A229 | concept/ZU-MED-106-cardiopulmonary-concepts.md |
| cps-cholesterol-synthesis-committed-step | new | CON-FND-253AEF836C2FE1 | concept/ZU-MED-106-cardiopulmonary-concepts.md |
| cps-apo-cii-lipoprotein-lipase-activation | new | CON-FND-316FE8CED7F007 | concept/ZU-MED-106-cardiopulmonary-concepts.md |
| cps-hmp-pathway-nadph-source | new | CON-FND-CE2DD8FE93BB7E | concept/ZU-MED-106-cardiopulmonary-concepts.md |
| cps-de-novo-fatty-acid-synthesis-nadph | new | CON-FND-C27E8DBD202F8A | concept/ZU-MED-106-cardiopulmonary-concepts.md |
| cps-tay-sachs-hexosaminidase-a | new | CON-FND-AC75093D20D558 | concept/ZU-MED-106-cardiopulmonary-concepts.md |
| cps-thymus-epithelial-reticular-cells | pending overlay | CON-HEM-02424D1AF8A169 | pending-live/ZU-MED-106-cardiopulmonary-pending-overlays.md |
| cps-splenic-sinusoid-endothelium | pending overlay | CON-HEM-4D47090A0B7561 | pending-live/ZU-MED-106-cardiopulmonary-pending-overlays.md |
| cps-basilar-artery-characteristics | new | CON-HEM-E2CC25BA588EC2 | concept/ZU-MED-106-cardiopulmonary-concepts.md |
| cps-nervous-tissue-capillaries | new | CON-HEM-27FB0852185FA4 | concept/ZU-MED-106-cardiopulmonary-concepts.md |
| cps-terminal-bronchiole-histology | live overlay | CON-RES-BECD91B06EA39D | concept/ZU-MED-106-cardiopulmonary-live-overlays.md |

Totals: **26 new concepts minted**, **4 live overlays** (3 named by the original triage, 1 more
— recurrent laryngeal nerve motor supply — found search-before-mint on this pass), **5 pending
overlays** (1 named by the original triage — lingula — the other 4 found search-before-mint on
this pass: posterior cricoarytenoid, thymic epithelial reticular cells, splenic sinusoid,
central chemoreceptors). 35 distinct concepts back 36 authored questions (the angiotensin-II
thirst concept backs 2 identical printed questions, Q14 and Q17).

## Gate summary (this pass)

```
GATE batch concept/ZU-MED-106-cardiopulmonary-concepts.md: items=26 errors=0
GATE batch article/ZU-MED-106-cardiopulmonary-articles.md: items=5 errors=0
GATE batch concept/ZU-MED-106-cardiopulmonary-live-overlays.md: items=4 errors=0
GATE batch pending-live/ZU-MED-106-cardiopulmonary-pending-overlays.md: items=5 errors=0
GATE batch question/ZU-MED-106-cardiopulmonary-mcq.md: items=36 errors=0
GATE simulate 13 file(s) (own 5 files + the 6 dependency files the 5 overlay rows target,
  applied in order): batches=13 created=259 updated=10 rejected=0 skipped=0 errors=0
```
