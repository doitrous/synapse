# ASU-LOCO triage — Phase 1

Module: **ASU-LOCO** (Locomotor System), ASU_Y1, Term 2. Only 3 of LOCO's 9 subject folders
(Anatomy/Biochemistry/Clinical Medicine/Histology/Microbiology/Parasitology/Pathology/Pharmacology/
Physiology) have a manifest row under `sourceCategory: MCQs` — Biochemistry, Physiology, and one
Parasitology **Practical** MCQ file. Placement: `msk` (direct — 20-list has `msk` for locomotor/
musculoskeletal, LANE-BRIEF §6), except the parasitology-identification facts which are organism biology,
not msk-specific (placement note in §C below).

Manifest flags 2 of 3 `blocked`/`textLayer:none` — wrong for both (CamScanner hazard, consistent with
every other ASU module). The Physiology file is native and correctly flagged `ready`.

## Papers read

| sourceId (fileName) | Manifest flag | Actual finding | Pages | Questions | Key |
|---|---|---|---|---|---|
| `MCQs - Locomotor Physiology Questions.pdf` | ready (correct) | Native text, clean — skeletal muscle physiology (excitation-contraction coupling, sliding filament, fiber types, motor unit gradation, twitch, EMG, muscle disease) | 27 | 90 MCQs + 30 written essay prompts (non-MCQ) | Printed answer table pp.22–23, **90/90 complete** |
| `MCQs - Biochemistry Locomotor MCQs - CA1.pdf` | blocked | CamScanner scan ("Biochemistry Academy" branded, same house style as ASU-IBM's bank), OCR'd; 5 internal sections: Collagen, Calcium & Vitamin D, Purine Catabolism, Muscle Energy/Creatine, "Important MCQs" (4 clinical-vignette cases: AGAT/creatine synthesis defect, purine-salvage enzyme pairing, enzyme-deficiency-disease pairing) | 14 | ~30 + ~18 + ~16 + ~20 + 4 ≈ **88** | Per-section printed answer tables, all 5 present; OCR of the tables themselves is noisy (small grid text) but every section's key block was located and is legible on direct inspection |
| `MCQs - Para Dr Ayman Locomotor Practical MCQ 2025.pdf` (filed under Parasitology/Practical/Slides) | blocked | CamScanner scan, OCR'd clean; **image-based spot/identification quiz** — each stem asks to identify an arrowed structure or organism in an embedded photo (arthropod anatomy, parasite/vector identification); text alone is enough to name the organism-level fact tested even without re-viewing every embedded image | 8 | 25 | Inline answer string at the foot of p.7 (`1-a 2-a 3-e …25-b`), **25/25 complete** |

## A — Block-level concepts (Physiology, 90 Qs)

| Sub-topic | Representative concepts (canonical key) |
|---|---|
| Excitation-contraction coupling | `skeletal-muscle.excitation-contraction-coupling.sequence`, `skeletal-muscle.t-tubule.depolarization-spread`, `skeletal-muscle.ryanodine-receptor.calcium-release`, `skeletal-muscle.triad.structural-composition` |
| Sliding filament / contractile proteins | `skeletal-muscle.sliding-filament-theory`, `skeletal-muscle.troponin-tropomyosin.regulatory-role`, `skeletal-muscle.sarcomere.z-line-definition`, `skeletal-muscle.cross-bridge-cycling.steps`, `skeletal-muscle.a-band-i-band-h-zone.changes-with-contraction` |
| Muscle fiber types & metabolism | `skeletal-muscle.fiber-types.classification-and-properties`, `skeletal-muscle.energy-sources.atp-cp-glycogen`, `skeletal-muscle.fatigue.causes-and-mechanism`, `skeletal-muscle.mcardle-disease.phosphorylase-deficiency`, `skeletal-muscle.rigor-mortis.mechanism` |
| Gradation of contraction | `skeletal-muscle.motor-unit-recruitment.gradation-mechanism`, `skeletal-muscle.frequency-summation.tetanus`, `skeletal-muscle.length-tension-relationship.preload`, `skeletal-muscle.force-velocity-relationship.afterload`, `skeletal-muscle.starling-law.definition` |
| Twitch / electrical properties / pathology | `skeletal-muscle.simple-twitch.phases-and-factors`, `skeletal-muscle.denervation.fibrillation-vs-fasciculation`, `skeletal-muscle.electromyography.diagnostic-use` |

**Written prompts (30, non-MCQ):** same topic coverage as above, phrased as essay/discussion questions —
flagged for Phase 2 written-question or article authoring, not counted in the MCQ tally.

## B — Block-level concepts (Biochemistry, ~88 Qs, 5 sections)

| Section | Representative concepts |
|---|---|
| Collagen (~30) | `collagen.hydroxylation.vitamin-c-cofactor`, `collagen.lysyl-oxidase.copper-dependent-crosslinking`, `scurvy.mechanism-vitamin-c-deficiency`, `collagen.primary-structure.gly-x-y-repeat`, `collagen.synthesis-pathway.step-sequence`, `collagen.maturation.intracellular-vs-extracellular-events`, `ehlers-danlos-syndrome.fibrillar-collagen-defect`, `collagen.tissue-specific-architecture.parallel-vs-gel-vs-crystalline` |
| Calcium & Vitamin D (~18) | `vitamin-d.activation-pathway.hydroxylation-steps`, `vitamin-d.renal-failure.1-alpha-hydroxylase-deficiency`, `calcium-homeostasis.regulatory-hormones` |
| Purine Catabolism (~16) | `purine-catabolism.uric-acid.gout-mechanism`, `purine-salvage.enzyme-reaction-pairing-hgprt-pnp-adenosine-deaminase`, `purine-enzyme-deficiency.disease-pairing-lesch-nyhan-scid` |
| Muscle Energy / Creatine (~20) | `creatine-synthesis.pathway-arginine-glycine-agat-gamt`, `creatine-phosphate.energy-buffering-role`, `creatinine.formation-and-clinical-marker-use` |
| "Important MCQs" clinical vignettes (4) | `agat-deficiency.creatine-synthesis-disorder-presentation` (developmental delay, low serum/urine creatinine case) — same purine/creatine facts as above in clinical-vignette form |

## C — Block-level concepts (Parasitology Practical, 25 Qs — image-identification)

Organism/vector identification, not msk-specific — **placement note**: per LANE-BRIEF §6's placement rule
for parasitology/microbiology, these route to `inf`, not `msk`, even though the paper is filed under the
Locomotor module folder (skin/subcutaneous-tissue arthropods and helminths, taught alongside msk because
of the body-site correlation, not the mechanism).

| Concepts (canonical key) |
|---|
| `arthropod.tick-anatomy.scutum-capitulum-festoons` (hard vs soft tick identification) |
| `arthropod.flea-anatomy.genal-comb-pronotal-comb` |
| `arthropod.louse-anatomy.mouthparts-and-species-id` (Pediculus humanus) |
| `arthropod.myiasis-fly-identification.sarcophaga-calliphora-wohlfahrtia-musca` |
| `helminth.onchocerca-volvulus.male-vs-female-identification` |
| `helminth.trichinella-spiralis.male-vs-female-identification` |
| `protozoan.flagellate-structure.kinetoplast-flagellum` |
| `cutaneous-larva-migrans.presentation` (bed-sore/bedridden-patient vector case) |
| `filariasis.vector-transmission.blackfly-onchocerciasis` |
| `trichinosis.presentation.periorbital-oedema-splinter-haemorrhage` |
| `leishmaniasis.sandfly-vector-and-nodule-ulcer-presentation` (Sinai case) |
| `pediculosis-vs-fleas.species-differentiation` |

## D — Live-hit spot-checks run (`find-existing.mjs`, 10 terms)

| Term | Result |
|---|---|
| `sliding filament theory`, `excitation contraction coupling` | No hit — safe to create (surprising given how fundamental these are; likely phrased differently live, e.g. under "sarcomere" or "cross-bridge") |
| `collagen synthesis` | 4 existing records |
| `Ehlers Danlos`, `vitamin D hydroxylation`, `Lesch Nyhan`, `onchocerca`, `trichinella`, `myiasis` | No hit — safe to create |
| `muscle fatigue` | 10 existing records |

Unlike ASU-HCB (heavy overlap) or ASU-AE (heavy embryology overlap), **ASU-LOCO's physiology and
parasitology content looks mostly genuinely new** — the fundamental muscle-physiology mechanism concepts
returned no hits on direct search (though a broader term like "sarcomere" or "cross-bridge" should be
tried before minting, per LANE-BRIEF §6's four-query minimum), and the parasitology identification facts
are new territory (INF's parasitology coverage was limited to 2 files, not the locomotor arthropods here).

## Totals

- **Papers read:** 3 (all triaged); other LOCO subject folders (Anatomy, Histology, Pathology,
  Clinical Medicine, Pharmacology) have **no MCQ-category source** in the manifest — only Practical/
  Lecture files, not opened this pass (per LANE-BRIEF §4's assessment-first ordering, MCQ/written/EOM
  tiers come before practicals).
- **Questions triaged:** 90 (physiology, full topic breakdown) + 88 (biochemistry, block-level) + 25
  (parasitology, block-level) = **203 MCQs**, plus 30 written essay prompts flagged separately.
- **Answer keys recovered:** 90/90, ~88/88 (5 sections all keyed), 25/25 — **all three sources fully
  keyed**, no key gaps found in this module (unlike ASU-IMM's 61-Q gap).
- **Distinct concepts tested:** 18 (physiology) + 15 (biochemistry) + 12 (parasitology) = **45 named**.
  - **Live-hit:** confirmed for `collagen synthesis` (4 records) and `muscle fatigue` (10 records); most
    other searched terms returned no hit.
  - **Pending-hit:** 0 found in `docs/*-Source-Imports` searches.
  - **New:** the majority — placement `msk` for physiology/biochemistry concepts, `inf` for the
    parasitology-identification concepts (cross-module placement, flagged above).
- **Practicals not yet opened this pass:** LOCO has a large Practical-only corpus (anatomy checklists,
  histology jars, pathology museum specimens, clinical exam checklists — see the earlier manifest dump)
  that was out of scope for this MCQ-first triage; noting for Phase 2's practical-authoring pass.

## Needs-Omar / no-bank note

No MCQ, written, or EOM source exists anywhere in the manifest for LOCO's Anatomy, Histology, Pathology,
Clinical Medicine, or Pharmacology subjects — only lecture/practical material. These are **not** part of
this session's "no bank" list (that's reserved for whole modules with zero assessment sources — see the
consolidated report), but within ASU-LOCO they are a real gap: 5 of 9 subject folders have no
exam-shaped material to triage from.
