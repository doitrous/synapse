| cluster | authored | held | remaining | total |
|---|---:|---:|---:|---:|
| 2024-eom-cns-gross-anatomy | 23 | 1 | 0 | 24 |
| 2024-eom-head-and-neck-anatomy | 26 | 2 | 0 | 28 |
| 2024-eom-physiology | 23 | 0 | 0 | 23 |
| 2024-eom-physiology-b | 34 | 4 | 0 | 38 |
| 2023-eom-head-and-neck-anatomy | 79 | 0 | 10 | 89 |

`2023-eom-head-and-neck-anatomy` is the EOM (2023 sitting) paper src_1d0cd2a7afeb66dcfd85
(printed 30/11/2023). First pass: Q1-24 read (pages 1-3), 20 genuinely-new items authored,
4 skipped as near-duplicates of already-authored EOM 197 stems (Q4 lateral-rectus/abducent,
Q13 skin over mandibular angle/great auricular, Q22 internal laryngeal nerve, Q24 posterior
midbrain/tectum). Second pass (2026-09-06): Q25-51 read (pages 4-6, image-only, rendered
200dpi), 24 genuinely-new items authored (cluster continued in seed
eom2023-head-and-neck-anatomy-p2.json → batch 205-NEU-2023eom-head-neck-p2-mcq.md), 3 skipped
as near-duplicates (Q31 Broca/MCA vs EOM197 "region supplied by MCA"; Q47 corpus-callosum
commissural fibre vs EOM197 "fibres connecting the 2 hemispheres"; Q48 primary-motor-cortex
localisation, single-fact Q51 auditory=temporal authored instead). 24 new concepts minted
(CON-NEU-…, unsalted university-blind, collision-checked vs 6304 live+pending IDs), added to
article ART-NEU-205NEU-HEAD-AND-NECK-ANATOMY coverage. `total` = 115 MCQs minus 7 skipped
dupes = 108; `remaining` = Q52-115 (pages 7-14, image-only) + Section B (cross-match), not yet
triaged. See 205-NEU-eom2023-triage-keys.txt.

Third pass (2026-09-06), SLICE 1: Q52-69 read (pages 7-8, image-only, rendered 200dpi), the
CNS-physiology tail. 12 genuinely-new items authored (Q53,55,56,57,58,60,61,63,64,66,67,68) into
seed eom2023-head-and-neck-anatomy-p3.json -> batch 205-NEU-2023eom-head-neck-p3-mcq.md; 6 skipped
as near-duplicates of already-authored 205 NEU stems (Q52 trochlear-not-in-fossa, Q54 presynaptic
inhibition [exact], Q59 factors affecting transmission, Q62 post-tetanic potentiation, Q65 receptor
potential, Q69 dorsal-column modality). 12 new physiology concepts minted (CON-NEU-…, unsalted
university-blind sha256/NEU, collision-checked via mint-concept-id.mjs against live+pending IDs and
the module concept file), added to article ART-NEU-205NEU-CNS-PHYSIOLOGY coverage. `total` drops to
115 - 13 dupes = 102; authored 44 -> 56; `remaining` = Q70-115 (pages 9-14, image-only) + Section B.

Third pass SLICE 2 (2026-09-06): Q70-87 read (pages 9-10). 11 genuinely-new items authored
(Q71,72,73,74,76,78,79,81,82,84,85) into seed eom2023-head-and-neck-anatomy-p4.json -> batch
205-NEU-2023eom-head-neck-p4-mcq.md; 7 skipped as near-duplicates (Q70 raphe-magnus serotonin,
Q75 nuclear-bag Ia [exact stem], Q77 stretch-reflex receptor, Q80 tendon-jerk sudden stretch,
Q83 pyramidal/UMN lesion signs, Q86 crista stereocilia-kinocilium [exact], Q87 Broca stroke). 11
new physiology concepts minted (unsalted university-blind, collision-checked), 8 added to
ART-NEU-205NEU-CNS-PHYSIOLOGY and 3 (motor control / vestibular) to ART-NEU-205NEU-CNS-PHYSIOLOGY-B
coverage. `total` = 115 - 20 dupes = 95; authored 56 -> 67; `remaining` = Q88-115 (pages 11-14,
image-only) + Section B (held for image attachment).

Third pass SLICE 3 (2026-09-06): Q88-105 read (pages 11-12). 12 genuinely-new items authored
(Q90,93,94,95,96,97,98,99,100,101,103,105 — basal ganglia, hypothalamus, vision, hearing,
olfaction, synapse & nerve/eye histology) into seed eom2023-head-and-neck-anatomy-p5.json ->
batch 205-NEU-2023eom-head-neck-p5-mcq.md; 6 skipped as near-duplicates (Q88 cerebellar ataxia,
Q89 paleocerebellum servo-correction = intermediate-zone, Q91 Parkinsonism features, Q92 REM sleep,
Q102 nerve degeneration [exact EOY198 twin], Q104 neuroglia astrocyte morphology). 12 new concepts
minted (unsalted university-blind, collision-checked); 9 added to ART-NEU-205NEU-CNS-PHYSIOLOGY-B and
3 (synapse/ganglion/RPE histology) to ART-NEU-205NEU-SPECIAL-SENSES-NERVE-HISTOLOGY coverage.
`total` = 115 - 26 dupes = 89; authored 67 -> 79; `remaining` = Q106-115 (pages 13-14, image-only)
+ Section B (held for image attachment).

## Held
- 2024eom-q20 — Printed options are Lingual/Hypoglossal/Internal laryngeal/Glossopharyngeal for the nerve related to the superior thyroid artery; the source's own hand annotation crosses out the green-highlighted "Internal laryngeal" and corrects it in the margin to "External laryngeal" — the anatomically correct nerve (external laryngeal nerve is closely related to the superior thyroid artery, not internal laryngeal) — but "External laryngeal" is not one of the four printed options. No printed option is source-supported as correct after the correction; held per the book-is-the-source rule rather than authored against a key the source's own correction contradicts.
- 2024eom-q23 — Two options carry conflicting highlight colours on the source render (p.4): option b ("Lies in the carotid sheath with the carotid artery and the sympathetic trunk", green) and option d ("Lies lateral to the carotid artery in the lower neck", orange/tan) are both marked, with no way to tell which is the intended single key. Both statements are independently defensible as true of the internal jugular vein anatomically, which is consistent with this being a genuine double-mark rather than a stray annotation. Held rather than guessed between two conflicting marks.
- 2024eom-q29 — Printed options for the nerve mediating parotid/ear pain worsened by chewing are Middle superior alveolar / Infraorbital / Glossopharyngeal / Auriculotemporal. On the render (p.5) option c "Glossopharyngeal" is highlighted in ORANGE (not the green used for every confirmed key on this paper), and the solver has drawn a red "?" beside the item — signalling their own uncertainty. The anatomically classic answer for parotid-region and ear pain aggravated by chewing/TMJ movement is the auriculotemporal nerve (option d), which the orange mark contradicts. With the only mark being an off-colour highlight the module has elsewhere treated as ambiguous (cf. q23), plus the solver's question mark, no single option is source-supported with confidence; held rather than authored against a contested key.

- 2024eom-q96 — Contradictory marks (hypermetropia): the green (confirmed-key) highlight sits on option d "Parallel light rays converge in front of the retina" — which is the definition of MYOPIA, wrong for hypermetropia — and that option is struck through by the exam's own hand; an off-colour orange highlight with a circled "A" marks option a "The eye is often shorter than the emmetropic eye", the anatomically correct fact. Green key contradicted by the source's own strikethrough, with only an off-colour mark on the correct option — same rule as the module's Q20 hold. Correct answer is a; needs Omar to confirm.
- 2024eom-q107 — Contradictory marks (organ of Corti): the green (confirmed-key) highlight sits on option d "Border cells support the outer edge of organ of Corti" (dubious — border cells lie at the inner edge) and is struck through by hand; an off-colour orange highlight with a circled "B" marks option b "Inner phalangeal cells surround inner hair cells completely", the anatomically sound statement. Struck-out green key with an off-colour correction — same rule as Q96/Q20. Correct answer is b; needs Omar to confirm.
- 2024eom-q112 — Figure-dependent: references the labelled "Figure (A)" spinal-cord cross-section (structure pointed by number 1). Render-confirmed green key is b (union of lateral & ventral spinothalamic tracts). Held for image attachment.
- 2024eom-q113 — Figure-dependent: references the labelled "Figure (A)" spinal-cord cross-section (structure pointed by number 2). Render-confirmed green key is d (originates from lower 1/3 of motor area 4 in cerebral cortex). Held for image attachment.

## Remaining (frontier, EOM 197 same paper src_e3182cba35c85f7acea8)
- **Q109-111 — DONE** this pass (2026-09-05): corneal-graft immune privilege (Q109.D),
  corneal epithelium histology (Q110.A), iris histology (Q111.A). Text-only, keys render-confirmed
  green highlight p.15; authored into cluster 2024-eom-physiology-b. EOM 197 MCQ tail now closed.
- **Q114-115 + Section B** — figure/table-dependent: Q114-115 and Section B (matching table) are
  figure/table-dependent → hold for image attachment (Q112-113 held above with their keys).
- Untriaged 205 NEU papers: EOY 198 twin, EOY 205 بعد الشرح فاينال (74pp), Baqoon EOM 2021 pair,
  EOM NEU 204 (2019); plus 3 image-only department books and 9 MCQ banks (needs_evidence).
