# 104 CPS — MCQ authoring ledger

Machine-regenerable. Computed by joining every `scripts/kasr/seeds/mcq/104-CPS/*.ts` leaf's `questions[].key` against `scripts/kasr/extract/104-CPS/mcq-bank.json` by key — never by leaf tag, which is known to be unreliable (a row tagged for one leaf can already be claimed by another leaf's seed). Regenerate with `npm run kasr:ledger-104` before dispatching new authoring work; do not hand-edit this file.

## Totals

bank rows: 1289 | keyed: 1114 | unkeyed/OCR-blocked: 175 | authored: 913 | excluded: 214 | remaining: 25

Cross-check against `build-batches.ts "104 CPS"`'s own accounting (its "kept" count excludes live-but-unanswered rows, which this ledger counts as AUTHORED since their key is claimed in a seed either way):

- authored (by key, this ledger): 913
- of those, held back as unanswered (no printed answer, no `answerOverride`) the same way `mcq()` in build-batches.ts does: 0
- authored minus held-back = build-style "kept": 913

## By cluster (leaf tag)

| cluster (leaf tag) | bank rows | authored | excluded | remaining |
|---|---:|---:|---:|---:|
| Lymph node | 25 | 17 | 0 | 4 |
| Respiratory Portion | 34 | 28 | 2 | 4 |
| Special Circulation | 5 | 1 | 0 | 4 |
| Macrophage system | 5 | 1 | 1 | 3 |
| Organization of the Respiratory System | 12 | 6 | 3 | 3 |
| Spleen | 27 | 19 | 5 | 3 |
| Basic Mechanisms of Circulatory Control | 36 | 26 | 8 | 2 |
| out-of-module | 1 | 0 | 0 | 1 |
| Tonsils | 18 | 10 | 4 | 1 |
| (untagged) | 219 | 88 | 4 | 0 |
| A-V Connections | 54 | 42 | 12 | 0 |
| Alveolar Phagocytes | 4 | 3 | 0 | 0 |
| Arteries | 62 | 49 | 13 | 0 |
| Cardiac Function | 80 | 54 | 26 | 0 |
| Cell Division | 42 | 39 | 3 | 0 |
| Chromosomal Aberrations (Abnormalities) | 22 | 21 | 1 | 0 |
| Conducting Portion | 74 | 64 | 10 | 0 |
| Control of Respiration | 25 | 19 | 6 | 0 |
| Electrical Activity of the Heart | 82 | 57 | 25 | 0 |
| Gas exchange in the lung | 21 | 18 | 3 | 0 |
| Gas Transport by the Blood | 35 | 32 | 3 | 0 |
| Human Chromosome | 48 | 43 | 4 | 0 |
| Lung Volumes and Capacities | 9 | 6 | 3 | 0 |
| Lungs — Gross Anatomy | 21 | 16 | 5 | 0 |
| Mechanical Properties of Cardiac Muscle | 42 | 30 | 12 | 0 |
| Mechanics of Breathing | 22 | 18 | 4 | 0 |
| Mediastinum | 41 | 30 | 11 | 0 |
| Pulmonary Compliance | 45 | 41 | 4 | 0 |
| The Cell Cycle | 5 | 5 | 0 | 0 |
| The heart | 43 | 31 | 12 | 0 |
| Thoracic Wall | 33 | 28 | 5 | 0 |
| Thymus | 17 | 12 | 4 | 0 |
| Vascular Function | 44 | 36 | 8 | 0 |
| Veins | 36 | 23 | 13 | 0 |

## Remaining keys by cluster

Every KEYED bank row whose key is not yet claimed by any seed (authored or excluded). A dispatch can copy an exact key list straight out of a section below.

### Lymph node (4)

- `all-of-the-following-help-drainage-of-lymph-except-6cd27447` — All of the following help drainage of lymph Except:
- `all-secondary-lymphatic-ergons-except-402b68d3` — All secondary lymphatic ergons except
- `reticular-ct-can-be-stained-by-50c0381c` — reticular CT can be stained by
- `which-two-of-the-following-are-necessary-to-stimulate-b-lymp-0b3fa792` — Which two of the following are necessary to stimulate B- Lymphocyte to divide an…

### Respiratory Portion (4)

- `fetal-lung-is-characterized-by-fd1480a7` — fetal lung is characterized by:
- `fetal-lung-is-similar-to-gland-in-3e898cac` — fetal lung is similar to gland in
- `support-lung-tissue-prevent-over-expansion-684cc6bf` — support lung tissue, prevent over-expansion
- `what-type-of-tissue-forms-the-alveoli-in-the-lung-44df5f2e` — What type of tissue forms the alveoli in the lung?

### Special Circulation (4)

- `all-of-the-following-cause-pulmonary-vasoconstriction-except-44323c47` — All of the following cause pulmonary vasoconstriction Except:
- `pulmonary-vascular-resistance-f5ca3914` — Pulmonary vascular resistance
- `the-coronary-blood-flow-0e0b7a15` — The coronary blood flow:
- `which-one-of-the-following-is-the-correct-statement-regardin-c5bde64a` — Which one of the following is the correct statement regarding coronary food flow…

### Macrophage system (3)

- `liver-cells-is-example-for-18d16db7` — liver cells is example for
- `monocyte-in-while-macrophage-in-ac70f5eb` — monocyte in ………., while macrophage in ……………
- `vonkupffer-cell-in-while-langerhan-s-cell-in-a4a2289a` — Vonkupffer cell in ………………., while langerhan's Cell in ……………

### Organization of the Respiratory System (3)

- `bronchoconstriction-is-produced-by-cea9ca3b` — Bronchoconstriction is produced by:
- `concerning-the-olfactory-epithelium-9305cebb` — Concerning the olfactory epithelium:
- `which-of-the-following-are-functions-of-components-of-the-re-4b944d7a` — Which of the following are functions of components of the respiratory system?

### Spleen (3)

- `irregular-barrel-shape-that-lined-by-fenestrated-cells-non-c-43d8f714` — ……..... irregular barrel shape that lined by fenestrated cells, non Contineuos b…
- `the-lymphatic-organ-containing-littoral-macrophage-cells-is-00df2662` — The lymphatic organ containing Littoral macrophage cells is: |
- `trabeculae-divide-spleen-into-024bb379` — trabeculae divide spleen into

### Basic Mechanisms of Circulatory Control (2)

- `epistaxis-mean-6a48dc85` — Epistaxis mean:
- `mean-systemic-filling-pressure-is-decreased-by-d3f1a38e` — Mean systemic filling pressure is decreased by:

### out-of-module (1)

- `which-of-the-following-characteristic-are-helpful-in-differe-90dd02ea` — Which of the following characteristic are helpful in differentiating between cer…

### Tonsils (1)

- `is-aggregation-of-lymph-tissue-with-incomplete-capsule-498c1c81` — is aggregation of lymph tissue with incomplete capsule

## Unkeyed (needs cleaner scans)

175 bank row(s) have no printed/recovered answer at all (`answerConfidence: "none"`). Of those, 137 are still untouched — neither authored (no `answerOverride` on file) nor excluded — and are not counted in "remaining" above because there is no establishable answer to author against yet. They need a cleaner scan, a solved-book match, or an editorial ruling before they can be dispatched.

