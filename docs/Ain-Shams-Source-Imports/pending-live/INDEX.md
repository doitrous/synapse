# pending-live/ — apply order

Omar's chief-of-staff import order queues Kasr Year 1 ahead of Ain Shams. Every file here is a
sparse overlay update (`+asu`, `+1` learner year, `+ASU-<MODULE>`) onto a concept id that exists
only in another lane's unimported batch — never in live state. **Never import from this folder
until the file it names is live.**

| File | Applies after | Target ids |
|---|---|---|
| `ASU-LOCO-msk-physiology.md` | `docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md`, `103-BMS-histology-concepts.md` and `103-BMS-mcq-vitamins-nerve-concepts.md` are all live | 20 ids covering excitation-contraction coupling/triad, troponin-tropomyosin-actin-myosin structure, sarcomere Z-line-to-Z-line definition, cross-bridge cycling (tension + ATP detachment), skeletal muscle overview, electrical/excitability changes, all-or-none law, twitch, isometric/isotonic definitions and comparison, length-tension, load-velocity/afterload, motor-unit grading (recruitment/frequency/Treppe), fibre types, three energy systems, fatigue, rigor mortis, denervation, electromyography. Backs the ASU-LOCO Locomotor Physiology MCQ paper (90 Qs, `src_3be9856ba9380e79cb01`). |
| `ASU-LOCO-msk-biochemistry.md` | `docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md`, `101-ISK-mcq-concepts.md`, `103-BMS-mcq-purine-concepts.md`, `103-BMS-mcq-carbohydrate-concepts.md` and `docs/Alexandria-Source-Imports/concept/AU-MED-102-biochem-molecular-concepts.md` are all live | 5 ids: collagen hydroxylation/glycosylation, scurvy as defective collagen synthesis, purine catabolism to uric acid, purine salvage (free-base arm), creatine phosphate as the energy-buffering store. Backs part of the ASU-LOCO Biochemistry Locomotor MCQ paper (88 Qs, `src_e4a23646b45bcc340c70`). |
| `ASU-LOCO-msk-articles.md` | `docs/Kasr-Source-Imports/article/103-BMS-physiology.md`, `103-BMS-mcq-vitamins-nerve.md`, `103-BMS-histology.md`, `102-INT-biochemistry.md`, `101-ISK-histology-2.md`, `103-BMS-mcq-purine.md` and `103-BMS-mcq-carbohydrate.md` are all live | 12 article ids backing the 20 physiology + 5 biochemistry concepts sparse-updated above (satisfies the "main concept must have an article" rule before questions are authored against them). `medical:simulate` with the seven base files then this file: `created: 0, updated: 12`, 0 errors. |
