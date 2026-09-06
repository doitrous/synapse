# 310 PAT — PHARMACOLOGY subject coverage ledger (Year 3)

Distinct Pharmacology subject inside module 310 PAT (Omar ruling 2026-09-06: module 310
holds BOTH Pathology and Pharmacology). Concepts `CON-PHA-*`, articles
`ART-PAT-310-PHARMACOLOGY-*` on the `DIS-PHA-T0x` discipline nodes, questions
`310-PAT-pharma-*-mcq.md`. Answer policy (Omar 2026-09-07): these banks print NO answer
key; correct answers are expert-determined by medical reasoning and proven in each item's
per-option explanations; ambiguous / multi-true / True-False / sub-4-option items are HELD.

| cluster (bank, section) | authored | held | excluded | remaining | total |
|---|---:|---:|---:|---:|---:|
| Abolmagd Pharma · ANS (Q1-10, `Pharma MCQ by Abolmagd.pdf` pp.3-6) | 10 | 0 | 0 | 0 | 10 |
| Abolmagd Pharma · ANS (Q11-20, same paper pp.6-8) | 10 | 0 | 0 | 0 | 10 |
| Abolmagd Pharma · ANS autonomic (Q21,26,27,30,31,32,34,35, pp.6-8) | 8 | 0 | 4 | 0 (Q22-25 deferred to CVS/Renal) | 12 |
| Abolmagd Pharma · ANS tail (Q37-39 + Q43-45 PK, pp.8-9) | 6 | 0 | 3 | 0 (Q46 deferred to Autacoids) | 9 |
| Abolmagd Pharma · Autacoids (Q1-7, p.11-12; incl. deferred ANS diphenhydramine) | 7 | 0 | 0 | 0 | 7 |
| **Pharmacology subject total** | **41** | **0** | **7** | Q22-25→CVS/Renal, then Ocular/Muscle, CVS & Renal, Blood | — |

## Subject opened

First PHARMACOLOGY content in module 310 PAT. Source: `Pharma MCQ by Abolmagd.pdf`
(sourceId `src_88f58dc630a0ed14bb4e`, sha256
88f58dc630a0ed14bb4e683e6e939f0e6042836acac9b859d99f9e328881893c; native text, 34 pp;
topic-ordered: ANS, Ocular Pharma, Muscle, Autacoids, CVS & Renal, Blood). No printed
answer key — answers expert-determined per the 2026-09-07 policy, STATUS=Draft.

## Concepts minted (slice 1, ANS Q1-10)

10 minted, 0 reused (first pharma concepts in the module):
- DIS-PHA-T01 Pharmacokinetics: CON-PHA-30D71EED124EB1 (paediatric body water),
  CON-PHA-EA91A3C05AC841 (dosage factors).
- DIS-PHA-T03 Autonomic pharmacology: CON-PHA-84B680E9E0C825 (cholinergic uses),
  CON-PHA-D8BEE79043A11E (ACh vasodilation vs nerve stim), CON-PHA-AC8CF65C557F1E
  (pilocarpine miotic), CON-PHA-18B5986F2BBB09 (exclude obstruction before cholinergic),
  CON-PHA-B0AAE42C7C985B (atropine in OP poisoning), CON-PHA-7B8856FA405C00 (hyoscine
  motion sickness), CON-PHA-026FE3FD6BFBCD (nicotinic effects atropine-resistant),
  CON-PHA-A48D08B756F52C (atropine covers neostigmine muscarinic effects).

Articles: ART-PAT-310-PHARMACOLOGY-PHARMACOKINETICS (T01),
ART-PAT-310-PHARMACOLOGY-CHOLINERGIC (T03).

## Concepts minted (slice 2, ANS Q11-20)

8 minted, 2 reused. Reused: CON-PHA-FCC1FFFC037F61 (atropine contraindications — Q15 and
Q19), CON-PHA-B0AAE42C7C985B (atropine in OP poisoning — reused for Q20). Minted:
CON-PHA-BB51A08D4E47CD (neostigmine reverses NM blockade), CON-PHA-5D0B2956E3CC88 (M2 = Gi,
lowers cAMP — DIS-PHA-T02 Pharmacodynamics), CON-PHA-26C5AE690F42DE (pilocarpine
sialagogue), CON-PHA-876AA36322FF29 (pralidoxime reactivation), CON-PHA-FCC1FFFC037F61
(atropine contraindications), CON-PHA-4A2BDCC19FE49B (antimuscarinic cycloplegia/mydriasis),
CON-PHA-6AD22F19596BA7 (hyoscine CNS depressant), CON-PHA-AE3618871E840B (rivastigmine in
Alzheimer's). Total concepts so far: 18.

## Concepts minted (slice 3, ANS autonomic Q21-35)

8 minted, 0 reused: CON-PHA-816389ACA89EB7 (sugammadex encapsulation),
CON-PHA-F4085607789FEC (alpha-2 presynaptic autoinhibition),
CON-PHA-3A48FAC257E6B3 (parathion is a poison, not therapy),
CON-PHA-529EF65F83F0D7 (neostigmine direct nicotinic action),
CON-PHA-A10C59E7D0E128 (benztropine in Parkinsonism),
CON-PHA-D430AEFDFC4453 (organophosphate management),
CON-PHA-546B54F304B772 (atropinisation endpoints),
CON-PHA-8224C191083704 (atropine effects). Total concepts so far: 26.

## Held / excluded

None held in slices 1-4. Excluded as duplicate facts (dedupe): Q28 (pilocarpine sialagogue
= Q13), Q29 (neostigmine for ileus = cholinergic-uses fact from Q3), Q33 (pralidoxime
reactivation = Q14), Q36 (hyoscine CNS depressant = Q17), Q40 (motion-sickness patch =
Q8), Q41 (oximes effective early = Q14 pralidoxime), Q42 (bethanechol in asthma =
cholinergic contraindication from Q3). Deferred (not lost): Q22-25 (CCB/furosemide/
thiazides/diuretics) → CVS & Renal cluster (DIS-PHA-T04); Q46 (diphenhydramine sedation) →
Autacoids cluster. ANS section (Q1-46) now fully triaged: 34 authored, 7 excluded (dupes),
5 deferred.

## Slice-4 concepts (ANS tail)

6 minted, 0 reused: CON-PHA-F2C4CE8E4D8D59 (beta-1 selectivity relative),
CON-PHA-7A1B72A8535242 (antimuscarinic organ-selective uses), CON-PHA-9BDFC46858D50D
(edrophonium/Tensilon), CON-PHA-A668F2983A9C7E (Vd calc, T01), CON-PHA-B5BE952D5FCFC4
(infusion rate calc, T01), CON-PHA-7903DD2E958352 (steady state = 4-5 half-lives, T01).
Total concepts so far: 32.

## Next

Abolmagd Pharma ANS Q11-46 (pp.6-9): anticholinesterase/antimuscarinic depth, adrenergic
blockers, plus a few interleaved CVS/renal and pharmacokinetics-calculation items (Q22-25,
Q43-45) to route to the right node. Then Ocular Pharma / Muscle / Autacoids, then CVS &
Renal, then Blood; then the GI bank (`PHARMA GITTTTTTT.pdf`) and Respiratory bank
(`Pharma RSPPPPP.pdf`). Dedupe across all three and against these CON-PHA concepts.
