# FHB 102-2 — Mucize Pharmacology, Antibacterial (1) — per-question triage

Source: `Semester 102/FHB 102-2/00 Module-wide/08 Midterm Exams/FHB102-2 MCQs till mid_MUCIZE DOCTORS PUPLISH.pdf`,
physical pages 29–36 (Q1–Q50 + its own answer table). `pagetext.mjs status` shows every page in this
range at `words>0 garbled=no`; nothing was rendered. The section ends at physical page 36 — page 37
starts "Antibacterial (2) MCQs", out of scope for this cluster.

This is a preliminary triage pass, not a ruling — re-check every printed item against the PDF and
against `docs/MUST-Source-Imports/question/FHB-102-2-microbiology-introduction-mcq.md` before writing,
per the lane's standing caution (holds are guidance, not authority).

## Why so many holds

Two dedupe forces are at work in this cluster specifically:

1. **Cross-source overlap with the already-authored "Pharmacology" / "Pharmacology Part 2" question
   sets** (`QST-MUST-FHB1022-PHARM-Q1xx…`, `QST-MUST-FHB1022-PHARM2-Q1…`), which already cover beta-lactam
   mechanism, penicillin-binding proteins, natural/semisynthetic/broad-spectrum/antipseudomonas
   penicillin classification, beta-lactamase inhibitors, benzathine-penicillin use, antistaph
   penicillin, and cephalosporin generations 1/2/4 by name. Antibacterial (1) re-tests a large fraction
   of these exact same facts from a different literal exam question.
2. **Heavy internal repetition inside Antibacterial (1) itself** — the bank restates the same
   classification facts (natural penicillin, semisynthetic penicillin, broad-spectrum penicillin,
   antipseudomonas penicillin, beta-lactamase inhibitor, cephalosporin generation 1/2/3/4) three times
   each (e.g. Q5/Q29/Q41 all ask "which is a natural penicillin", differing only in distractor drug
   names) with the same printed key pattern.

The first clean occurrence of each fact is proposed AUTHOR; later repeats of the identical fact —
whether against this cluster's own earlier item or against an already-shipped PHARM/PHARM2 question —
are proposed HOLD as source-duplicate facts, per the lane's standing "duplicate of an already-authored
same-source fact → hold" rule.

## Table

| # | Printed key | Disposition | Reason / concept hit |
|---:|:---:|---|---|
| 1 | b | AUTHOR | Narrow-spectrum definition (acts on either G+ve or G-ve, not both). New — no existing MUST question tests this classification. |
| 2 | c | AUTHOR | Broad-spectrum definition (acts on both G+ve and G-ve). New, pairs with Q1. |
| 3 | b | AUTHOR | Bactericidal = kill and destroy bacteria. New. |
| 4 | b | AUTHOR | Bacteriostatic contraindicated in severe infections. New; printed key is a simplification of the usual "immunocompromised host" teaching — stands as printed, flag for medical review at gate time. |
| 5 | c | HOLD | "Natural chemotherapeutic agent" = natural penicillins. Duplicate fact of `QST-MUST-FHB1022-PHARM-Q130` ("which is a natural penicillin") and internal duplicate of Q29/Q41 below. |
| 6 | b | AUTHOR | Prophylactic vs therapeutic/curative antimicrobial use. New. |
| 7 | b | AUTHOR | General adverse effect of antimicrobials = G.I.T upset. New angle (general antimicrobials, not penicillin-specific as `PHARM-Q139`). |
| 8 | b | AUTHOR | Candida superinfection caused by broad-spectrum antibiotics. New. |
| 9 | a | AUTHOR (recheck) | Pseudomembranous colitis associated with C. difficile. Close to `QST-MUST-FHB1022-PHARM2-Q13` ("CDAD is commonly **caused by**", i.e. which drug causes it) but tests the inverse fact (which organism causes pseudomembranous colitis) — flagged for a careful side-by-side read before minting a second concept. |
| 10 | d | AUTHOR | NOT a mechanism of antimicrobial action (vitamin absorption is a distractor). New. |
| 11 | a | HOLD | Beta-lactam class membership (penicillins/cephalosporins/carbapenems/monobactams). Duplicate of `QST-MUST-FHB1022-PHARM2-Q19` ("beta-lactam antibiotics include all EXCEPT") and `-Q24` ("which is NOT a beta-lactam"). |
| 12 | b | HOLD | Penicillin mechanism = inhibits cell-wall synthesis via PBP binding. Duplicate of `QST-MUST-FHB1022-MICRO-INTRO-Q90` and `-PHARM-Q126`. |
| 13 | c | HOLD | Benzathine penicillin = long-acting, rheumatic-fever prophylaxis. Duplicate of `QST-MUST-FHB1022-PHARM-Q131`. |
| 14 | b | HOLD | Oxacillin = antistaph penicillin. Duplicate of `QST-MUST-FHB1022-PHARM-Q146`. |
| 15 | a | HOLD | Ampicillin/amoxicillin = broad-spectrum penicillins. Duplicate of `QST-MUST-FHB1022-PHARM-Q133`; internal duplicate of Q31/Q43. |
| 16 | c | AUTHOR | Bacampicillin = prodrug, less diarrhoea, good absorption. New specific pharmacokinetic fact, not covered elsewhere. |
| 17 | d | HOLD | Antipseudomonas penicillins effective vs Pseudomonas + other G-ve. Duplicate of `QST-MUST-FHB1022-PHARM-Q134`/`-Q147`; internal duplicate of Q32/Q44. |
| 18 | a | HOLD | Beta-lactamase inhibitor = "Augmentin". Duplicate of `QST-MUST-FHB1022-PHARM-Q129`/`-Q135`; also flag stem/key imprecision — Augmentin is the amoxicillin+clavulanate combination product, not itself "a beta-lactamase inhibitor" (Q33 below states the same fact more precisely as clavulanic acid). |
| 19 | d | AUTHOR | Clinical uses of penicillin (tonsillitis, rheumatic-fever prophylaxis, meningitis) = all of the above. First clean occurrence; internal duplicate partner is Q34. |
| 20 | d | HOLD | Side effects of penicillins (anaphylaxis, GIT upset, superinfection) = all of the above. Duplicate of `QST-MUST-FHB1022-PHARM-Q139`; internal duplicate family with Q35/46/47 (46/47 are distinct NOT-framing items, kept separate — see below). |
| 21 | a | AUTHOR | 1st-generation cephalosporins mainly effective vs G+ve. New angle (spectrum-by-generation trend; existing PHARM2 items test generation-by-drug-name, not this trend). |
| 22 | a | AUTHOR | Cefoperazone not nephrotoxic due to dual (biliary+renal) excretion. New. |
| 23 | a | AUTHOR | Cefotaxime = 3rd-generation cephalosporin. Gap-filling — existing set covers 1st/2nd/4th gen by name but no 3rd. First clean occurrence; internal duplicate partners Q38/Q50. |
| 24 | b | AUTHOR | Cefotaxime crosses the blood-brain barrier. New. |
| 25 | d | AUTHOR | Cephalosporin adverse effects (allergy, nephrotoxicity, disulfiram-like reaction) = all of the above. First clean occurrence; internal duplicate partner Q40. |
| 26 | a | HOLD | Cefepime = 4th-generation cephalosporin. Duplicate of `QST-MUST-FHB1022-PHARM2-Q5`; internal duplicate of Q39. |
| 27 | a | AUTHOR | Resistance to beta-lactamases increases 1st→4th generation. New general-trend fact. |
| 28 | d | AUTHOR | NOT a side effect of cephalosporins (increased appetite is the distractor). New negation framing. |
| 29 | a | HOLD | Natural penicillin = benzyl penicillin. Duplicate of Q5/Q41 and `PHARM-Q130`. |
| 30 | b | HOLD | Semisynthetic penicillin = ampicillin. Duplicate of Q42; overlaps `PHARM-Q133` classification. |
| 31 | a | HOLD | Broad-spectrum penicillin = ampicillin. Duplicate of Q15/Q43. |
| 32 | a | HOLD | Antipseudomonas penicillin = azlocillin. Duplicate of Q17/Q44. |
| 33 | a | HOLD | Beta-lactamase inhibitor = clavulanic acid. Duplicate of Q18/Q45 and `PHARM-Q135` (this is the medically precise version of the fact, worth preferring over Q18/Q45 if this cluster is ever revisited). |
| 34 | d | HOLD | Uses of penicillins = all of the above. Duplicate of Q19. |
| 35 | d | HOLD | Side effects of penicillins = all of the above. Duplicate of Q20/`PHARM-Q139`. |
| 36 | a | HOLD | 1st-generation cephalosporin = cefradine. Duplicate of `PHARM2-Q1`; internal duplicate of Q48. |
| 37 | a | HOLD | 2nd-generation cephalosporin = cefuroxime. Duplicate of `PHARM2-Q3`; internal duplicate of Q49. |
| 38 | a | HOLD | 3rd-generation cephalosporin = ceftazidime. Duplicate of Q23; internal duplicate of Q50. |
| 39 | a | HOLD | 4th-generation cephalosporin = cefepime. Duplicate of Q26. |
| 40 | d | HOLD | Cephalosporin adverse effects = all of the above. Duplicate of Q25. |
| 41 | a | HOLD | Natural penicillin = benzathine penicillin. Duplicate of Q5/Q29. |
| 42 | b | HOLD | Semisynthetic penicillin = amoxicillin. Duplicate of Q30. |
| 43 | a | HOLD | Broad-spectrum penicillin = ampicillin. Duplicate of Q15/Q31. |
| 44 | a | HOLD | Antipseudomonas penicillin = carbenicillin. Duplicate of Q17/Q32. |
| 45 | a | HOLD | Beta-lactamase inhibitor = sulbactam. Duplicate of Q18/Q33. |
| 46 | a | AUTHOR | NOT a use of penicillins — anaphylactic shock is a side effect, not an indication. Distinct negation framing, single occurrence. |
| 47 | d | AUTHOR | NOT a side effect of penicillins — typhoid is an indication, not a side effect. Distinct negation framing, single occurrence. |
| 48 | a | HOLD | 1st-generation cephalosporin = cefadroxil. Duplicate of Q36/`PHARM2-Q1`. |
| 49 | a | HOLD | 2nd-generation cephalosporin = cefamandole. Duplicate of Q37/`PHARM2-Q3`. |
| 50 | a | HOLD | 3rd-generation cephalosporin = ceftriaxone. Duplicate of Q23/Q38. |

## Totals

- 50 questions, 0 source-absent (every stem, option set and key is legible).
- **20 AUTHOR candidates**: Q1, Q2, Q3, Q4, Q6, Q7, Q8, Q9 (recheck), Q10, Q16, Q19, Q21, Q22, Q23, Q24,
  Q25, Q27, Q28, Q46, Q47.
- **30 HOLD candidates** (all duplicate-fact holds, either cross-source against the existing
  Pharmacology/Pharmacology Part 2 question sets or internal to this cluster): Q5, Q11, Q12, Q13, Q14,
  Q15, Q17, Q18, Q20, Q26, Q29, Q30, Q31, Q32, Q33, Q34, Q35, Q36, Q37, Q38, Q39, Q40, Q41, Q42, Q43,
  Q44, Q45, Q48, Q49, Q50.
- New concepts needed (subject to recheck): narrow/broad-spectrum definition, bactericidal definition,
  bacteriostatic-contraindication, prophylactic-vs-therapeutic classification, general-antimicrobial
  GIT-upset adverse effect, Candida superinfection, pseudomembranous-colitis organism, NOT-a-mechanism
  distractor set, bacampicillin prodrug fact, penicillin-uses "all of the above", cephalosporin
  generation-vs-spectrum trend, cefoperazone dual-excretion, cefotaxime 3rd-gen + BBB penetration,
  cephalosporin-adverse-effects "all of the above", generation-vs-beta-lactamase-resistance trend,
  cephalosporin NOT-a-side-effect distractor, penicillin NOT-a-use distractor, penicillin
  NOT-a-side-effect distractor.
- No new articles expected — all facts fit under the existing `MUST-FHB-102-2 > Pharmacology >
  Antimicrobials` article family already used by the Pharmacology/Pharmacology Part 2 clusters;
  confirm exact article ids before writing.

## Open question blocking authoring

This lane's `LANE-CARD.md` §4 states MUST authors exclusively through
`scripts/must/build-fhb102-2-authoring-slice.mjs` (a bespoke, ~13k-line generator script that every
prior MUST commit — including all 224 current Draft questions — went through), not the general
seed-JSON → `emit-mcq.mjs` route. This triage was produced against that reality (existing question ids
above were pulled straight from the generator's own output files). Actually writing the 20 AUTHOR
candidates needs a decision on which pipeline to extend — see the session report for detail.
