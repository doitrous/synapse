# FHB 102-2 — Mucize Pharmacology, Antibacterial (2) — per-question triage

Source: `Semester 102/FHB 102-2/00 Module-wide/08 Midterm Exams/FHB102-2 MCQs till mid_MUCIZE DOCTORS PUPLISH.pdf`,
physical pages 37–44 (Q1–Q50 + its own answer table, page 44). `pagetext.mjs status` shows pages 37–47
all at `words>0 garbled=no`; nothing was rendered. The section ends at physical page 44 — page 45 starts
"Advanced MCQs", out of scope for this cluster (that section already has prior authoring history from an
earlier MUST session, per `CLAUDE-HANDOVER.md`).

Cited by grep against `Semester 102/FHB 102-2/Pharmacology/01 University Material/`, per the CoS's
cache-search method. One file, **`general antibacterial 2.pdf`** (15 pages, Dr. Mohamed Abdel Aziz slide
deck), turned out to carry almost every fact this cluster needed in a single dense, well-organized source:
p2 (Aztreonam/monobactams), p3+p5 (Carbapenems: imipenem/meropenem), p6+p8+p9 (Vancomycin), p10
(Bacitracin), p11 (Chemoprophylaxis), p12 (biliary tract drug list), p13–p15 (concentration- vs
time-dependent PK/PD, including a three-column classification table). This is a **new resource
registration** for this lane — not previously cited by the `mucizeAssessmentResourceId`/`vancomycinResourceId`
teaching set used in Antibacterial (1) / PHARM2.

This is a preliminary triage pass, not a ruling — re-check every printed item against the PDF and against
the cited teaching page before trusting a disposition, per the lane's standing caution.

## Why so many holds

Three dedupe forces are at work in this cluster:

1. **Cross-source overlap with PHARM2** (`QST-MUST-FHB1022-PHARM2-Qxx`), which already tested Aztreonam's
   monobactam identity/spectrum/cross-allergy/nephrotoxicity-alternative facts, Imipenem+cilastatin,
   carbapenem broad spectrum, Vancomycin's mechanism/spectrum/MRSA use/oral C. diff use/red man syndrome/
   non-beta-lactam classification, and Clindamycin-associated CDAD.
2. **Cross-source overlap with the existing PHARM mechanism family** (`QST-MUST-FHB1022-PHARM-Q128/137/138`),
   which already tested vancomycin's D-Ala-D-Ala binding mechanism and bacitracin's precursor-transport
   mechanism — both close enough to this cluster's transglycosylation/dephosphorylation phrasing (Q7, Q12)
   that authoring them again would just restate an existing governed mechanism fact under new wording.
3. **Heavy internal repetition inside Antibacterial (2) itself** — carbapenem-meningitis-safety,
   bacitracin-topical-use, aztreonam-beta-lactamase-resistance, vancomycin-spectrum and the
   concentration/time-dependent PK/PD facts are each asked two or three times with different distractor
   sets.

A fourth, new-to-this-cluster issue: **two questions (Q38, Q49) directly contradict each other** on
Clarithromycin's PK/PD classification, and the governed source (p15's three-column table) sides with Q49
("Both") and contradicts Q38 ("Concentration-dependent" alone). Per the lane rule that printed keys stand
even when a bank's own wording is inconsistent, Q38 is held (contradicts the governed table) rather than
silently corrected, while Q49 is authored (matches the table).

## Table

| # | Printed key | Disposition | Reason / concept hit |
|---:|:---:|---|---|
| 1 | C | HOLD | Aztreonam targets Gram-negative bacteria including Pseudomonas. Duplicate of `PHARM2-Q9` (monobactam spectrum = aerobic Gram-negative bacilli); source confirms ("Act only on G-ve including Pseudomonas") but the tested fact is the same core spectrum classification. |
| 2 | B | HOLD | Aztreonam NOT contraindicated in penicillin allergy (False). Duplicate of `PHARM2-Q21`/`-Q23` (aztreonam minimal/no cross-allergy). |
| 3 | B | AUTHOR | Aztreonam's key advantage over other beta-lactams = resistance to beta-lactamase. New — p2: "Resist B-lactamase enzyme", not previously tested (PHARM2 tested cross-allergy and nephrotoxicity-alternative advantages, not this one). |
| 4 | C | HOLD | Carbapenems have the broadest spectrum among beta-lactams. Duplicate of `PHARM2-Q12`. |
| 5 | B | HOLD | Cilastatin added to Imipenem to inhibit renal dehydropeptidase. Duplicate of `PHARM2-Q11`. |
| 6 | B | AUTHOR | Meropenem is safe for use in meningitis (unlike imipenem). New — p5: "Safe in meningitis (no seizures)". |
| 7 | B | HOLD | Vancomycin MOA = inhibition of transglycosylation in peptidoglycan synthesis. Duplicate of the existing `PHARM-Q137` (vancomycin D-Ala-D-Ala/cell-wall mechanism family) and `PHARM2-Q14` — same core cell-wall mechanism fact restated at a different level of molecular detail. |
| 8 | B | HOLD | Oral vancomycin treats pseudomembranous colitis. Duplicate of `PHARM2-Q16`. |
| 9 | A | HOLD | Red man syndrome from rapid IV vancomycin infusion. Duplicate of `PHARM2-Q17`. |
| 10 | D | AUTHOR | Adverse effect NOT linked to vancomycin = Blue man syndrome. New negation angle — p9's governed vancomycin AE list is thrombophlebitis, red man syndrome, neurotoxicity, nephrotoxicity; blue man syndrome is absent from it. Flag: option C ("Seizures") is read as consistent with the source's general "Neurotoxic" entry rather than a verbatim match — the decisive negative (D) and two of three positives (A, B) are cleanly source-confirmed. |
| 11 | B | AUTHOR | Bacitracin limited to topical use because systemic use is nephrotoxic. New — p10: "Not used systemically because it is nephrotoxic." |
| 12 | B | HOLD | Bacitracin inhibits peptidoglycan synthesis via dephosphorylation. Duplicate of the existing `PHARM-Q138` (bacitracin precursor-transport mechanism) — same underlying mechanism restated. |
| 13 | B | HOLD | Chemoprophylaxis for rheumatic fever = benzathine penicillin. Duplicate of the existing rheumatic-fever-prophylaxis chain (Antibacterial(1) Q13/34/41, `PHARM-Q131`). |
| 14 | B | AUTHOR | Dental-procedure endocarditis prophylaxis = ampicillin or amoxicillin. New — p11: "Before dental manipulation — ampicillin or amoxicillin ... (kill strept.viridans)." Pairs with Q28. |
| 15 | A | AUTHOR | Polymyxin increases cell membrane permeability. New — p11 footer: "Antimicrobials that Increase permeability of cell membrane are polymyxin and nystatin." |
| 16 | A | AUTHOR | Ceftriaxone used in biliary tract infections. New — p12's governed drug list: Ceftriaxone, Cefoperazone, Rifampicin, Doxycycline, Ampicillin. Distinct microtopic from the existing cefoperazone-biliary-excretion (PK/mechanism) concept in Antibacterial(1) Q22 — this is a clinical-use indication list, not an excretion-route fact. Pairs with Q31. |
| 17 | B | AUTHOR | Concentration-dependent antibiotics require high concentrations above MIC. New — p13. |
| 18 | B | AUTHOR | Aminoglycosides are concentration-dependent. New — p15's governed three-column PK/PD table. Pairs with Q47. |
| 19 | C | AUTHOR | Vancomycin is time-dependent with minimal PAE. New — confirmed by the same p15 table (Vancomycin is listed under "Time-Dependent, minimal PAE"). |
| 20 | C | AUTHOR | Clindamycin is both time- and concentration-dependent. New — confirmed by the p15 table. |
| 21 | B | AUTHOR | Aztreonam's route = parenteral (IV/IM). New — p2: "Synthetic Parenteral only (IV—IM)"; not previously tested (PHARM2 tested spectrum/cross-allergy, not route). |
| 22 | C | AUTHOR | Carbapenems do NOT target beta-lactamase-producing Staphylococcus. New — p3: "(not act on staph (B-lactamase producing bacteria))". |
| 23 | B | AUTHOR | Imipenem avoided in meningitis due to seizure risk (CNS toxicity). New — p3: "It has CNS toxicity –seizure (not used in meningitis)." |
| 24 | A | AUTHOR | Meropenem doesn't need cilastatin because it's resistant to renal dehydropeptidase. New — p5: "Stable in renal tubule (not affected by dehydropeptidase enzyme)." Pairs with Q6. |
| 25 | C | HOLD | Vancomycin bactericidal via cell-wall synthesis inhibition. Duplicate of `PHARM2-Q14`. |
| 26 | B | AUTHOR | Oral vancomycin ineffective systemically because it is not absorbed. New — p6: "Not absorbed orally." |
| 27 | B | AUTHOR | Bacitracin primarily effective against beta-lactamase-producing Staphylococcus. New — p10: "skin Staph. aureus (β-lactamase producing) infections." Pairs with Q11. |
| 28 | B | AUTHOR | Endocarditis chemoprophylaxis targets Streptococcus viridans. New — p11, same bullet as Q14 ("kill strept.viridans"). |
| 29 | B | HOLD | Oral vancomycin used in pseudomembranous colitis. Duplicate of `PHARM2-Q16`/`-Q30`. |
| 30 | B | HOLD | Polymyxin mechanism = disrupts cell membrane permeability. Internal duplicate of Q15 (first occurrence authored there). |
| 31 | D | AUTHOR | Linezolid is NOT listed for biliary tract infections. New — same p12 governed list as Q16; Linezolid is absent from the 5-drug list. |
| 32 | B | AUTHOR | Time-dependent antibiotics prioritize duration above MIC. New — p14. Pairs with Q17 (complementary concentration- vs time-dependent definitions). |
| 33 | C | HOLD | Beta-lactams exhibit time-dependent killing. Duplicate of the existing `pharmacology.beta-lactams.time-dependent-killing` concept (Absalam/PHARM Q150), reinforced by the same p15 table (beta-lactams listed under time-dependent). |
| 34 | A | AUTHOR | Azithromycin is both time- and concentration-dependent. New — confirmed by the p15 table (grouped with Clarithromycin on one row). Pairs with Q49. |
| 35 | B | HOLD | Aztreonam replaces extended-spectrum penicillins because it resists beta-lactamase. Internal duplicate of Q3. |
| 36 | B | HOLD | Vancomycin red man syndrome caused by histamine release. Duplicate of `PHARM2-Q27`'s citation (histamine-mediated red man syndrome already claimed there). |
| 37 | B | HOLD | Bacitracin systemic use avoided due to nephrotoxicity. Internal duplicate of Q11. |
| 38 | B | HOLD | Clarithromycin is a concentration-dependent antibiotic. **Contradicts** the governed p15 table, which classifies Clarithromycin as "Both" (time- and concentration-dependent), not concentration-dependent alone — and contradicts this cluster's own Q49. Printed key stands unrepaired; held, not silently corrected. |
| 39 | B | AUTHOR | Rheumatic-fever chemoprophylaxis prevents Streptococcus pyogenes infection. New — p11: "Prophylaxis against rheumatic fever (strept.pyogenous- Group A beta hemolytic Strept)." Distinct microtopic from the held Q13 (drug identity vs organism identity) and from the existing microbiology S. pyogenes Lancefield/hemolysis questions (different subject area). |
| 40 | B | HOLD | Imipenem requires cilastatin. Internal duplicate of Q5; duplicate of `PHARM2-Q11`. |
| 41 | B | HOLD | Aztreonam is a monobactam. Duplicate of `PHARM2-Q8`. |
| 42 | B | HOLD | Meropenem's advantage over imipenem = no seizure risk. Internal duplicate of Q23 (same underlying imipenem-seizure/meropenem-safe fact, restated as a comparison). |
| 43 | C | HOLD | Vancomycin NOT effective against Gram-negative bacteria. Duplicate of `PHARM2-Q15` (vancomycin primarily Gram-positive). |
| 44 | A | HOLD | Bacitracin's spectrum most similar to Vancomycin. No teaching page in assigned sources states this specific comparison — both are cell-wall/Gram-positive agents but no source draws the direct "most similar to" claim. |
| 45 | A | HOLD | Bacitracin used topically for minor skin infections. Internal duplicate of Q11 (same core topical-use fact). |
| 46 | A | HOLD | Cefoperazone indicated for biliary tract infections. Duplicate of the existing Antibacterial(1) Q22 cefoperazone-biliary-excretion concept. |
| 47 | B | AUTHOR | High PAE characteristic of Aminoglycosides. New — confirmed by the p15 table. Pairs with Q18 (same governed table row). |
| 48 | C | HOLD | Penicillin is time-dependent with minimal PAE. Internal duplicate of Q33 (beta-lactam/penicillin time-dependent-minimal-PAE fact, already held as duplicate of the existing `pharmacology.beta-lactams.time-dependent-killing` concept). |
| 49 | C | AUTHOR | Clarithromycin is classified as Both (time- and concentration-dependent). New — matches the governed p15 table exactly (unlike the contradicting Q38). Pairs with Q34. |
| 50 | B | AUTHOR | Vancomycin used for anaerobic infection. New — p8: "3-Anaerobic infection" listed among governed vancomycin uses (corroborated by a second file, `Pharma 102 (FHB) (Vancomycin) + (BACITRACIN).pdf` p1, "5. Anaerobic infection"). Distinct microtopic from vancomycin's Gram-positive/MRSA spectrum fact already tested in PHARM2. |

## Totals

- 50 questions, 0 source-absent (every stem, option set and key is legible); 1 internal contradiction pair (Q38/Q49).
- **25 AUTHOR candidates**: Q3, Q6, Q10, Q11, Q14, Q15, Q16, Q17, Q18, Q19, Q20, Q21, Q22, Q23, Q24, Q26,
  Q27, Q28, Q31, Q32, Q34, Q39, Q47, Q49, Q50.
- **25 HOLD candidates**: Q1, Q2, Q4, Q5, Q7, Q8, Q9, Q12, Q13, Q25, Q29, Q30, Q33, Q35, Q36, Q37, Q38,
  Q40, Q41, Q42, Q43, Q44, Q45, Q46, Q48.
- New concepts needed (subject to recheck): aztreonam beta-lactamase resistance, aztreonam parenteral
  route, meropenem no-cilastatin/safe-in-meningitis, vancomycin adverse-effect list, vancomycin oral
  non-absorption, vancomycin anaerobic-infection use, bacitracin topical-use/nephrotoxicity/spectrum,
  polymyxin membrane-permeability mechanism, dental-endocarditis chemoprophylaxis (drug + organism),
  rheumatic-fever chemoprophylaxis organism, biliary-tract-infection drug list, carbapenem
  staph-beta-lactamase exception, imipenem seizure/meningitis risk, and the concentration-/time-dependent
  PK/PD framework (definitions plus per-drug classifications for aminoglycosides, vancomycin, clindamycin,
  azithromycin/clarithromycin).
- Next source boundary: physical page 45, "Advanced MCQs" — out of scope for this cluster (prior MUST
  session history exists for that section per `CLAUDE-HANDOVER.md`).
