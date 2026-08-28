# AU-MED-103 · Physiology — question-led triage

Lane W1-103-PHYS. Module `AU-MED-103` (`MED 103 - Blood and Immune System & Medical
Terminology`), department `Physiology`, year `AU_Y1`. GUARD = paper (3 EOM papers in `Exams`,
plus the module's `General` bank rows). Step 1 only — no concepts, articles or questions
authored below. Ends at the LANE-BRIEF §8 checkpoint.

## Counts

| questions triaged | keyed | unkeyed | distinct concepts tested (Physiology) | hit-live | hit-pending | new |
|---:|---:|---:|---:|---:|---:|---:|
| 51 EOM + 10 practical spots + 27 bank items = 88 | 74 | 14 | 20 | 7 | 1 | 12 |

Of the 145 EOM questions across the module's 3 papers, **51 are this department's** (the rest
are Biochemistry's or Histology's — see "Department-attribution method" below; the sibling
`AU-MED-103-histology-triage.md` independently found 19 Histology-owned EOM questions, leaving
~75 for Biochemistry, consistent with a 51/19/75 split of 145). The `General` folder's two MCQ
banks contribute a further 10 keyed "Spot" station items (Physiology's own section of a
three-department practical bank) plus 27 items from a messier Microsoft-Forms-screenshot bank,
14 of which carry no recoverable key in the cached text.

## Sources read

| sourceId | file | category | mode | key status found |
|---|---|---|---|---|
| `src_49f438279b68a489aa42` | `Exams/EOM - Blood End Egyptian 1.pdf` | End of Module paper | native, 7p | answer block at foot of last page, Q1–35, all keyed |
| `src_56bc398ce32f0140fc29` | `Exams/EOM - Blood Final Egyptian final.pdf` | End of Module paper | native, 16p | answer block at foot of last page, Q1–70; **Q13 = `xx`** (Biochemistry's question, not mine — noted for completeness) |
| `src_c9c9ca53cfa1321d0508` | `Exams/EOM - Blood end wafdeen final.pdf` | End of Module paper | native, 11p | answer block at foot of last page, Q1–40, all keyed |
| `src_3e62e4d388493af88dbe` | `General/.../MCQs - Blood practical.pdf` (twinPreferred) | Department Questions | native, 29p | phone-screenshot capture of a Microsoft Forms quiz titled "Physiology Questions"; "Correct answers:" printed per item where the respondent got it wrong, but a right-first-try item shows no reveal at all — see HAZARDS |
| `src_4b9b0c4cf94fde15b14a` | `General/.../MCQs - Practical Blood Questions_...pdf` (twin of preferred `src_5309ee19e1149a5bbe9d`, a `.docx` not yet in `scripts/alexandria/pagetext/`) | Department Questions | native, 18p | clean "Spot 1–10 (Physiology)" section (also Histology 1–9, Biochemistry 1–13) with a dedicated answer page; all 10 Physiology spots keyed |

**Substitution note**, matching the sibling Histology lane's own note on the same file:
`src_5309ee19e1149a5bbe9d` (`.docx`, `twinPreferred: true`) is still absent from
`scripts/alexandria/pagetext/` — the shared `pagetext.py` tool only knows how to read a PDF
(`pdftotext`/`pdftoppm`+`tesseract`), so it cannot process a `.docx` even if named explicitly,
and the tooling lane's bulk `--module` selection filters to `fileType == "pdf"` so it will never
pick this row up on its own either. I read the already-cached, non-preferred **PDF** twin
(`src_4b9b0c4cf94fde15b14a`) instead of waiting or extracting the `.docx` myself (Department
Questions is the tooling lane's category, not mine to OCR/extract). **Step 2 should re-open the
preferred `.docx` once it exists and cite that one**, per the manifest's own rule.

**Department files** (Physiology, non-practical): **none exist.** Unlike Histology and
Biochemistry, the manifest has zero `Department Book` or `Lecture Slides` rows under
`departmentFolder == "Physiology"` for `AU-MED-103` — only the 7 `Practical` rows (4 distinct
documents after twin-dedup) listed below. This module's corpus contains no Physiology teaching
text at all; the practical protocol sheets are the closest thing to a department source, and
even they only cover the lab-test topics (CBC/ESR/Hct/blood-grouping/bleeding-and-clotting
time), not cell-function physiology (immune cells, hemostasis cascade, blood groups mechanism,
etc.). Flagged in HAZARDS — Step 2's articles will need a general physiology reference
(NAQAAE-aligned textbook), not a department-specific citation, for most of this department's
concepts.

**Practical documents read** (mine to extract — not a paper/bank category, so not the tooling
lane's job; extracted via `scripts/alexandria/extract/pagetext.py` myself):

| sourceId | file | pages | content |
|---|---|---|---|
| `src_f5026e42c1d5c7361a7b` (twinPreferred) | `Physiology/Practical/Dr Eslam/Blood practical.pdf` | 50p | CBC, ESR, blood grouping, bleeding time, coagulation time, PT/INR/aPTT — puncture technique and safety |
| `src_a026c7eabba03b146bd1` (twinPreferred) | `Physiology/Practical/Dr_ Aliaa/Blood Aliaa Practical.pdf` | 19p | ESR principle, apparatus, procedure, normal values by sex/hour |
| `src_dc2cf80b7e674606b9d0` (no twin) | `Physiology/Practical/Dr_ Gawad/2- ورق العملي.pdf` | 16p | "Principles of Human Physiology — Practical (Blood)": hematocrit definition, normal values, interpretation |
| `src_3972abc91c78bdbd265a` (twinPreferred) | `Physiology/Practical/Dr_ Gawad/drGawad - Blood Physiology - Practical(2)-2.pdf` | 79p | Same practical, slide-deck form ("Lecture 8, Blood Practical") — puncture safety, then the same battery of tests |

**These are practical technique sheets, not theory sources — noted for a later practical lane,
not triaged as question-teaching material here** (per dispatch: "your folder's 5 files are
mostly practical material — note what is practical for a later lane"). Their content does
corroborate which lab-test topics this department owns (see the Spot-bank and bank-1 rows
below, which test exactly these tests) but they are not cited as the source of any concept in
this triage — no concept here is authored from a practical sheet alone, only from an actual
question per LANE-BRIEF §10.

## Department-attribution method

**No orientation/blueprint sheet exists for this module** (corpus-wide fact, per the manifest
README and gap ledger). The three EOM papers mix Biochemistry, Physiology and Histology
questions in one continuous numbered list with no section headers naming a department. I
attributed each question to a department by content — metabolic-pathway/enzyme/vitamin-cofactor
questions → Biochemistry; cell/organ microscopic structure and cell-lineage-stage identification
→ Histology; blood/immune **function**, regulation, clinical interpretation of a lab value, and
the lab tests themselves → Physiology — cross-checked against what this department's own
practical sheets test (CBC interpretation, ESR, Hct, blood grouping, bleeding/coagulation time,
PT/aPTT/INR) and, where the Histology lane had already triaged the same papers, against its
`AU-MED-103-histology-triage.md` to avoid claiming the same question twice.

**Five questions I initially scoped as Physiology were dropped after checking the Histology
triage — it had already claimed them, with a concrete department-book citation I do not have:**

| sourceId | Q | idea | why deferred |
|---|---|---|---|
| `src_49f438279b68a489aa42` | Q25 | Role of the reticulo-endothelial system | Histology triage's own "Reticulo-endothelial system" chapter, from *Histology of the Blood, Immune & Lymphoid System* (Dr. Iman Nabil) |
| `src_49f438279b68a489aa42` | Q30 | What gives the RBC membrane its flexibility (cytoskeleton) | Histology triage's "Red blood cells" chapter — same department book |
| `src_56bc398ce32f0140fc29` | Q23 | Main function of neutrophils | Histology triage's "Granulopoiesis / neutrophils" chapter |
| `src_56bc398ce32f0140fc29` | Q50 | Function of T helper cells | Histology triage's "Lymphocytes and cells of the immune system" chapter |
| `src_56bc398ce32f0140fc29` | Q51 | Function of natural killer cells | Histology triage's "Lymphocytes and cells of the immune system" chapter |

I deferred rather than duplicate because my own department has **no department book at all**
(see above) — nothing in my sources demonstrably teaches these five facts, while Histology's
department book explicitly does. This is a judgement call, not a rule the validator enforces;
flagged again in HAZARDS for the orchestrator to confirm or overrule.

## Questions this department teaches, grouped by topic

No department-book chapter exists to group by (see above), so grouping follows the practical
sheets' own topic order, which matches the Spot-bank's own section order.

### Anaemia classification from the CBC (normocytic / microcytic / macrocytic)

| sourceId | page | stem (short) | key status | signals |
|---|---|---|---|---|
| `src_56bc398ce32f0140fc29` | p8 | Type of anaemia after acute bleeding (Q34, normocytic normochromic) | keyed (d) | stream: Egyptian (filename) |
| `src_56bc398ce32f0140fc29` | p12 | CBC diagnosis, smoker with chronic lung disease, low EPO (Q55) | keyed (d, secondary polycythaemia) — **key looks physiologically inconsistent** (chronic lung disease usually *raises* EPO; recorded as printed, not resolved) | stream: Egyptian |
| `src_56bc398ce32f0140fc29` | p13 | Cause of microcytic anaemia after acute bleed (Q60) | keyed (c, chronic blood loss) | stream: Egyptian |
| `src_c9c9ca53cfa1321d0508` | p4 | Type of anaemia after 1.5 L acute blood loss (Q15) | keyed (d, normochromic normocytic) | stream: wafdeen |
| `src_49f438279b68a489aa42` | p6–7 | Fatigue after climbing, Hb 11 / Hct 38 → diagnosis (Q33) | keyed (b, "sickle cell anaemia") — **key looks physiologically inconsistent** (altitude classically raises Hb/Hct toward polycythaemia, and the given values read as mildly anaemic, not sickled); recorded as printed | stream: Egyptian |
| `src_3e62e4d388493af88dbe` | p1–2 | Hb 20 g/dl, high-altitude resident → diagnosis + 2 other causes (item "36") | keyed, answer block ("Secondary polycythaemia"; pulmonary/cardiac disease) | Forms-screenshot bank |
| `src_3e62e4d388493af88dbe` | p2 | CBC (Hgb 11, Hct 31.8, normal MCV/MCH) → diagnosis + causes (item "37") | keyed, answer block ("Normocytic normochromic anaemia"; acute haemolysis/acute blood loss) | " |
| `src_3e62e4d388493af88dbe` | p6–7 | CBC (low Hb/Hct/MCV/MCH, high platelets) → diagnosis + define MCV/MCH (unnumbered, ~item "43") | keyed, answer block ("Microcytic hypochromic anaemia, thrombocytosis, leukocytosis") | " |
| `src_3e62e4d388493af88dbe` | p20 | Cause of macrocytic normochromic anaemia (item "54") | keyed (D, Vitamin B12 deficiency) — revealed on the next screenshot after an initial wrong attempt | " |
| `src_3e62e4d388493af88dbe` | p21–22 | 34F irregular menses + breathlessness, CBC → diagnosis (item "56") | **unclear** — answer text appears inline ("Microcytic Hypochromic anaemia") but with no "Correct answers:" block or incorrect-marker; recorded as *implied by on-screen selection, not a clean key* | " |
| `src_3e62e4d388493af88dbe` | p19 | Causes of normocytic normochromic anaemia, open question (item "53") | keyed, rich answer block (acute haemorrhage; haemolytic — intracellular: thalassaemia/sickle cell; extracellular: mismatched transfusion/infection/drugs/food/autoimmune) | " |
| `src_3e62e4d388493af88dbe` | p22–23 | Possible cause of microcytic hypochromic anaemia, options (item "57") | **unkeyed** — marked "Incorrect", no reveal shown in the cached text | " |
| `src_3e62e4d388493af88dbe` | p24–25 | Olympic runner at altitude, CBC → diagnosis (item "59") | keyed, answer block, but **truncated** (only "Haemoglobin 17. R.B.Cs 6.5. Haematocrit 60" survives before the page cuts off) | " |
| `src_3e62e4d388493af88dbe` | p25 | Main issue in polycythaemia, options (item "60") | **unkeyed** — marked "Incorrect", no reveal | " |
| `src_3e62e4d388493af88dbe` | p25–26 | Appendicitis CBC → diagnosis (item "61") | **implied, not a clean key** — "Leukocytosis" appears inline with no reveal marker | " |
| `src_3e62e4d388493af88dbe` | p28 | Which does *not* cause anaemia, options (unnumbered, ~item "65") | **unkeyed** — marked "Incorrect", no reveal | " |
| `src_3e62e4d388493af88dbe` | p28–29 | CBC abnormality (macrocytic), define MCV (item "70") | **unkeyed** — cuts off after "Enter your answer", no reveal captured | " |
| `src_3e62e4d388493af88dbe` | p28–29 | CBC parameter indicating a condition + its normal value (item "71") | keyed, answer block ("WBCs — leukocytosis"; 4000–10000 cells/mm³) | " |
| `src_3e62e4d388493af88dbe` | p29 | CBC abnormality + cause + normal INR range (item "72") | **unkeyed/truncated** — stem present, no answer visible before the file ends | " |
| `src_4b9b0c4cf94fde15b14a` | Spot 7 | CBC (Hb7, MCV110, MCH29, MCHC34) → abnormality, one reason, define MCV | keyed (macrocytic normochromic anaemia; folate/B12 deficiency; MCV = average single-RBC volume) | Physiology spot bank, dedicated answer page |
| `src_4b9b0c4cf94fde15b14a` | Spot 10 | 50F CBC → abnormality, one cause, normal INR range | keyed (normocytic normochromic anaemia; acute blood loss; 0.8–1.2) | " |

### Polycythaemia and erythropoietin

| sourceId | page | stem | key status | signals |
|---|---|---|---|---|
| `src_49f438279b68a489aa42` | p5 | Cause of anaemia in renal failure (Q21, EPO deficiency) | keyed (d) | stream: Egyptian |
| `src_49f438279b68a489aa42` | p4 | Blood picture of a man living in Red Sea mountains (Q22, ↑ viscosity) | keyed (c) | stream: Egyptian |
| `src_56bc398ce32f0140fc29` | p7 | Cause of ↑ erythropoietin (Q32) | keyed (b, chronic respiratory disease) | stream: Egyptian |
| `src_56bc398ce32f0140fc29` | p8 | Cause of secondary polycythaemia (Q33) | keyed (a, chronic lung disease) | stream: Egyptian |
| `src_c9c9ca53cfa1321d0508` | p6 | Cause of primary polycythaemia (Q17) | keyed (b, bone-marrow tumour) | stream: wafdeen |
| `src_3e62e4d388493af88dbe` | p25 | Main issue in polycythaemia (item "60", see anaemia table above) | unkeyed | Forms-screenshot bank |

### Blood viscosity and fluidity

| sourceId | page | stem | key status | signals |
|---|---|---|---|---|
| `src_49f438279b68a489aa42` | p5 | What is responsible for blood fluidity (Q26, heparin/antithrombin III) | keyed (a) | stream: Egyptian |
| `src_56bc398ce32f0140fc29` | p15 | Cause of increased blood viscosity (Q67, severe diarrhoea) | keyed (c) | stream: Egyptian |

### Reticulocyte response to accelerated erythropoiesis

| sourceId | page | stem | key status | signals |
|---|---|---|---|---|
| `src_49f438279b68a489aa42` | p5 | Cells expected to rise after hemorrhagic spots + nose bleeding (Q27, reticulocyte) | keyed (a) | stream: Egyptian |
| `src_56bc398ce32f0140fc29` | p11 | Which cell rises with the accelerated rate of erythropoiesis (Q62, reticulocyte) | keyed (a) | stream: Egyptian |

### Haemoglobin–oxygen binding (iron coordination bonds)

| sourceId | page | stem | key status | signals |
|---|---|---|---|---|
| `src_49f438279b68a489aa42` | p7 | What iron is bonded to in deoxyhaemoglobin (Q35) | keyed (a, N of imidazole ring of proximal histidine) | stream: Egyptian |
| `src_56bc398ce32f0140fc29` | p9 | What occupies the 5th coordination bond of iron in haemoglobin (Q40) | keyed (b, proximal histidine) | stream: Egyptian |
| `src_c9c9ca53cfa1321d0508` | p1 | What forms the 6th coordination bond with Fe²⁺ in oxyhaemoglobin (Q2) | keyed (a, oxygen) | stream: wafdeen |

### Plasma and plasma proteins

| sourceId | page | stem | key status | signals |
|---|---|---|---|---|
| `src_c9c9ca53cfa1321d0508` | p2 | Definition of plasma (Q7) | keyed (d, whole blood without the blood cells) | stream: wafdeen |
| `src_56bc398ce32f0140fc29` | p15 | Plasma protein mainly responsible for maintaining blood volume (Q68, albumin) | keyed (b) | stream: Egyptian |

### Blood groups, Rh, and transfusion

| sourceId | page | stem | key status | signals |
|---|---|---|---|---|
| `src_49f438279b68a489aa42` | p6 | Antibodies present in O-negative blood (Q31) | keyed (a, anti-A + anti-B) | stream: Egyptian |
| `src_49f438279b68a489aa42` | p5 | Indication for blood transfusion (Q23) | keyed (c, leukocytopenia) — **counter-intuitive key**, not resolved | stream: Egyptian |
| `src_49f438279b68a489aa42` | p5 | Rh-negative mother, Rh-positive husband, prior abortion → risk to this baby (Q24) | keyed (a, HDN) | stream: Egyptian |
| `src_56bc398ce32f0140fc29` | p13 | Best indication for fresh-frozen-plasma transfusion (Q35) | keyed (a, haemophilia) | stream: Egyptian |
| `src_56bc398ce32f0140fc29` | p13 | Cause of haemolytic anaemia (Q44, mismatched transfusion) | keyed (a) | stream: Egyptian |
| `src_56bc398ce32f0140fc29` | p13 | Blood group inferred from anti-A present / anti-B, anti-Rh absent (Q56) | keyed (c) | stream: Egyptian |
| `src_56bc398ce32f0140fc29` | p13 | Prevention of erythroblastosis fetalis (Q57) | keyed (b, anti-D after each labour) | stream: Egyptian |
| `src_c9c9ca53cfa1321d0508` | p7 | Compatible donors for an AB-negative recipient (Q24) | keyed (c) | stream: wafdeen |
| `src_c9c9ca53cfa1321d0508` | p7 | Condition for erythroblastosis fetalis to develop (Q25) | keyed (a, Rh+ father / Rh− mother) | stream: wafdeen |
| `src_c9c9ca53cfa1321d0508` | p7 | Complication of incompatible transfusion (Q26) | keyed (a, haemolytic reaction) | stream: wafdeen |
| `src_3e62e4d388493af88dbe` | p6–7 | Blood group of a case + who it can donate to (item "42") | keyed, answer block (AB-negative; donates to AB-negative and AB-positive) | Forms-screenshot bank |
| `src_3e62e4d388493af88dbe` | p14 | Who this patient can safely receive blood from, given antigen/antibody grid (item "48") | **unkeyed** — marked "Incorrect", no reveal | " |
| `src_4b9b0c4cf94fde15b14a` | Spot 1 | Identify the blood group; who it can receive from; why blood group O is a universal donor | keyed (A-negative; A− or O−; no agglutinogens on its RBCs so it can't trigger agglutination) | Physiology spot bank |

### Haemostasis — coagulation cascade and natural anticoagulants

| sourceId | page | stem | key status | signals |
|---|---|---|---|---|
| `src_49f438279b68a489aa42` | p2 | Role of vitamin K (Q11, clotting-factor synthesis) | keyed (a) | stream: Egyptian |
| `src_56bc398ce32f0140fc29` | p6 | Substance released by endothelial cells against intravascular thrombosis (Q24, prostacyclin) | keyed (b) | stream: Egyptian |
| `src_56bc398ce32f0140fc29` | p7 | Trigger of the extrinsic pathway (Q30, tissue factor) | keyed (c) | stream: Egyptian |
| `src_56bc398ce32f0140fc29` | p7 | Drug to keep at home after treating a cerebral thrombus (Q31, coumarins) | keyed (a) | stream: Egyptian |
| `src_56bc398ce32f0140fc29` | p8–9 | Cause of DVT after prolonged bed rest (Q37) | keyed (a, sluggish blood flow) | stream: Egyptian |
| `src_56bc398ce32f0140fc29` | p9 | Blood elements involved in this thrombus (Q38, platelets) | keyed (c) | stream: Egyptian |
| `src_56bc398ce32f0140fc29` | p9 | Requirement for normal clotting (Q39, calcium ions) | keyed (a) | stream: Egyptian |
| `src_56bc398ce32f0140fc29` | p13 | Platelet secretion important for clot retraction (Q58, fibrin-stabilising factor/XIII) | keyed (d) | stream: Egyptian |
| `src_56bc398ce32f0140fc29` | p13 | Result of vitamin K deficiency (Q59) | keyed (b, deficiency of prothrombin) | stream: Egyptian |
| `src_56bc398ce32f0140fc29` | p14 | Mechanism of heparin (Q61, activates antithrombin III) | keyed (a) | stream: Egyptian |
| `src_56bc398ce32f0140fc29` | p14 | Effect of factor VIII deficiency (Q64, disturbed intrinsic pathway) | keyed (c) | stream: Egyptian |
| `src_56bc398ce32f0140fc29` | p15 | Deficiency caused by warfarin + haematuria (Q65, prothrombin) | keyed (a) | stream: Egyptian |
| `src_c9c9ca53cfa1321d0508` | p9 | Factor in the extrinsic pathway (Q31, tissue factor) | keyed (d) | stream: wafdeen |
| `src_c9c9ca53cfa1321d0508` | p9 | Reaction requiring calcium (Q32) | keyed (d) | stream: wafdeen |
| `src_c9c9ca53cfa1321d0508` | p10 | Cause of DVT after 6 weeks' bed rest (Q36) | keyed (b, slow blood flow) | stream: wafdeen |
| `src_c9c9ca53cfa1321d0508` | p10 | Factor preventing clot extension (Q37, heparin) | keyed (b) | stream: wafdeen |
| `src_3e62e4d388493af88dbe` | p13 | Prolonged clotting time suggests… (item "47", except-format) | **unkeyed** — no reveal | Forms-screenshot bank |
| `src_3e62e4d388493af88dbe` | p16 | Test giving prolonged time in all *except* one disease (item "50") | **unkeyed** — no reveal | " |
| `src_4b9b0c4cf94fde15b14a` | Spot 4 | Fibrin-mesh formation test; congenital condition delaying it (haemophilia); effect of platelet deficiency on it | keyed (fibrin mesh; haemophilia; no effect) | Physiology spot bank |
| `src_4b9b0c4cf94fde15b14a` | Spot 5 | Acquired cause of prolonged coagulation time; INR = 3.0 interpretation | keyed (liver failure/vit-K deficiency; "PT of patient > PT of standard") | " |

### Laboratory tests — bleeding time, coagulation time, PT/aPTT/INR

| sourceId | page | stem | key status | signals |
|---|---|---|---|---|
| `src_3e62e4d388493af88dbe` | p4 | Coagulation time test: normal value, causes of prolongation (item "39") | keyed, answer block (5–10 min; liver disease, vit K deficiency) | Forms-screenshot bank |
| `src_3e62e4d388493af88dbe` | p5 | Bleeding time: other puncture sites, normal time, prolonged in… (item "40") | keyed, answer block (ear lobule/finger tip; 2–5 min; ITP) | " |
| `src_3e62e4d388493af88dbe` | p6 | Monitoring heparin (aPTT) vs warfarin (PT); normal INR range (item "41") | keyed, answer block (aPTT ~35s; PT ~11–15s; INR 0.8–1.2) | " |
| `src_3e62e4d388493af88dbe` | p17 | Best test to monitor heparin (item "51") | **unkeyed** — marked "Incorrect", no reveal | " |
| `src_4b9b0c4cf94fde15b14a` | Spot 6 | Normal value of coagulation time; MCHC equation | keyed (5–10 min; Hb/Hct × 100) | Physiology spot bank |
| `src_4b9b0c4cf94fde15b14a` | Spot 8 | Normal value of this test; blood element it assesses; effect of that element's deficiency | keyed (2–5 min; platelets; increases the value) — this is bleeding time, cross-referencing item "40" above | " |

### ESR and haematocrit

| sourceId | page | stem | key status | signals |
|---|---|---|---|---|
| `src_3e62e4d388493af88dbe` | p3 | Hematocrit test: name, normal value (male), causes of increase (item "38") | keyed, answer block ("Hematocrit ruler"; male 47±7; polycythaemia & dehydration) | Forms-screenshot bank |
| `src_3e62e4d388493af88dbe` | p9–10 | ESR test: tube name, what it measures, normal value, physiological cause of increase (unnumbered, ~item "44") | keyed, answer block (Wassermann's tube; ESR; 3–5 mm; menses) | " |
| `src_3e62e4d388493af88dbe` | p11 | Which statement about ESR/haematocrit is correct, 4 options (unnumbered, ~item "45") | **unkeyed** — no reveal | " |
| `src_3e62e4d388493af88dbe` | p15 | ESR value decreases in… (chart shown, options implied) (unnumbered, ~item "49") | **unkeyed** — no reveal, and the chart's own values did not extract cleanly | " |
| `src_4b9b0c4cf94fde15b14a` | Spot 2 | ESR reading; one physiological cause of increase in an adult female; effect of congenital afibrinogenaemia on ESR | keyed (45; menses or pregnancy; decreases) | Physiology spot bank |
| `src_4b9b0c4cf94fde15b14a` | Spot 3 | Hematocrit value; normal adult-male value; effect of saline infusion on it | keyed (38; 40–54; decreases) | " |

### White cell count interpretation

| sourceId | page | stem | key status | signals |
|---|---|---|---|---|
| `src_3e62e4d388493af88dbe` | p11–12 | CBC (female) → diagnosis, 4 options (acute haemolysis / pancytopenia / ITP / malnutrition) (unnumbered, ~item "46") | **unkeyed** — no reveal | Forms-screenshot bank |
| `src_3e62e4d388493af88dbe` | p26 | Appendicitis, CBC → diagnosis (item "61", leukocytosis) | implied, not a clean key (see anaemia table) | " |
| `src_4b9b0c4cf94fde15b14a` | Spot 9 | 40M recurrent infections, CBC shows a malignant condition — which parameter, what's its normal range | keyed (WBCs/leukocytosis; 4000–10000 cells/mm³) | Physiology spot bank |

### Immunoglobulins and innate defence

| sourceId | page | stem | key status | signals |
|---|---|---|---|---|
| `src_49f438279b68a489aa42` | p2 | Immunoglobulin class in hypersensitivity reactions (Q13, IgE) | keyed (c) | stream: Egyptian |
| `src_56bc398ce32f0140fc29` | p6 | Immunoglobulin class in oral mucosa/secretions (Q28, IgA) | keyed (b) | stream: Egyptian |
| `src_56bc398ce32f0140fc29` | p7 | Which Ig type is shown in an attached image (Q29) | keyed (per printed key) — **diagram-dependent**; the source image is not in the cached page text, so the stem cannot be fully verified without it. Flag as a media/diagram question for Step 3 | stream: Egyptian |
| `src_c9c9ca53cfa1321d0508` | p5 | Basis of immunoglobulin classification (Q18, light/heavy chain type) | keyed (c) | stream: wafdeen |
| `src_c9c9ca53cfa1321d0508` | p7 | Definition of opsonins (Q27) | keyed (d) | stream: wafdeen |
| `src_56bc398ce32f0140fc29` | p14 | Process by which antibodies coat bacteria for phagocytosis (Q66, opsonisation) | keyed (b) | stream: Egyptian |

## Ordered list of distinct ideas tested → concept candidates

Grouped in the same topic order as above. Key search run per idea: `find-existing.mjs` with
the queries listed, plus `grep -ril "<term>" docs/*-Source-Imports/concept/` for the canonical
key (find-existing does not read a pending file's `## canonical_key`, per LANE-BRIEF §15).

| # | Idea (as tested) | Search terms used | Classification | Evidence |
|---|---|---|---|---|
| 1 | Anaemia classified by RBC indices (normocytic normochromic — acute blood loss / bone-marrow depression; microcytic hypochromic — iron deficiency; macrocytic — B12/folate deficiency) | reticulocyte *(no)*; hemolytic anemia; microcytic hypochromic; normocytic normochromic; macrocytic anemia; iron deficiency anemia | **HIT-LIVE** | `CON-HEM-9BDC2EB39840B4` (acute-haemorrhage → normocytic normochromic), `CON-HEM-47DFF88A145F5E` (marrow depression → normocytic normochromic), `CON-HEM-7F0EF6B0D6F2FB` (iron deficiency → microcytic hypochromic), `CON-HEM-AA67D0E4B516BF` (B12 deficiency → macrocytic) |
| 2 | Hemolytic anaemia — general definition and intrinsic/extrinsic causes | hemolytic anemia | **HIT-LIVE** | `CON-HEM-F2B664C215C912`, `CON-HEM-CDF561308A4D25` |
| 3 | Reticulocyte count rises with accelerated erythropoiesis (response to haemorrhage/haemolysis) | reticulocyte | **NEW** at this grain, with a related **HIT-LIVE**/HIT-PENDING identification concept alongside it — `CON-HEM-D86697439C5923` (live) is about the *cresyl-blue-stain identification* of a reticulocyte, not the *physiological point* that its count rises after blood loss; Step 2 should check whether that live record's body already covers the response before minting a second one |
| 4 | Polycythaemia (primary vs secondary) and erythropoietin's regulation of RBC production | polycythemia; erythropoietin | **NEW** | only a pending question title (`101-ISK-mcq.md`, "polycythemia is:") and an unrelated glossary word-parts entry for "erythropoietin" — no concept record either way |
| 5 | Blood viscosity — determinants and physiological effects (anaemia lowers it; polycythaemia/free plasma Hb raise it) | blood viscosity | **HIT-LIVE** | `CON-HEM-1CA767E86D9C3A`, `CON-HEM-C8B9CD41563B5B`, `CON-HEM-B70E44482E6095` |
| 6 | Haemoglobin–oxygen binding: the iron's 5th/6th coordination bonds (proximal histidine occupies the 5th; the 6th is empty in deoxy-Hb, O2 in oxy-Hb) | coordination position heme iron; biconcave *(unrelated)* | **NEW** | no hit on the targeted query; flagged for a second search pass in Step 2 with different phrasing before minting |
| 7 | ABO/Rh blood-group physiology: antigens/antibodies, universal-donor logic, compatibility, transfusion indications and reactions | blood group; blood transfusion; universal donor; antigen agglutinin | **NEW** | `blood transfusion` surfaced an adjacent live citation (`CIT-4FA6BA99C2BEAA` "Incompatible blood transfusion" under `CLM-HEM-2F0FB0B040A268`) — Step 2 must open that claim's parent concept before deciding this is genuinely new |
| 8 | Rh isoimmunisation / erythroblastosis fetalis (HDN) and its prevention with anti-D | erythroblastosis fetalis; Rh incompatibility | **NEW** | no hit on either query |
| 9 | Plasma composition/definition; plasma proteins maintain blood volume via oncotic pressure (albumin) | albumin oncotic; clotting factor | **NEW** | `clotting factor` surfaced an adjacent **pending** compound concept (`102-INT-concepts.md`: liver makes albumin/fibrinogen/clotting factors/globulins, listing several plasma-protein functions together) — Step 2 tiebreaker needed: is "albumin maintains blood volume" a distinct testable objective from that broader record, or the same idea at a finer grain? |
| 10 | Coagulation cascade: extrinsic-pathway trigger (tissue factor) and calcium requirement | extrinsic pathway; intrinsic pathway; calcium coagulation | **NEW** at this grain | `extrinsic pathway` hit a live concept about the pathway's **speed** (`CON-HEM-C943D81335E86E`, "rapid at about 15 seconds") — a different fact about the same pathway, not the trigger-identity fact the questions actually test. Flagged so Step 2 does not mistake the speed record for coverage of the trigger record |
| 11 | Natural anticoagulants — heparin/antithrombin III mechanism, endothelial prostacyclin | heparin; antithrombin | **HIT-LIVE** | `CON-HEM-ABF3EABEDD7170`, `CON-HEM-FF26A3D7EE6DB7`, `CON-HEM-532BFAEE98CC39`, `CON-HEM-2BF99442385474`, `CON-HEM-1975918ED45C76` |
| 12 | Platelet function in haemostasis — adhesion (vWF/collagen), aggregation (PAF) | platelet adhesion; platelet aggregation | **HIT-LIVE** | `CON-HEM-3843C5316D5FE8`, `CON-HEM-C9FEF63D7C15F6` |
| 13 | Bleeding time and coagulation/clotting time as two distinct lab tests (technique, normal values, what each depends on, causes of prolongation) | bleeding time; clotting time; clotting time test | **NEW** | no hit on any of the three queries; the only related live hit anywhere (`CON-HEM-5E948BE9C94615`, found via the mandatory canonical-key grep) is about thrombocytopenia *causing* a prolonged bleeding time, a different objective from "how the test itself is performed and read" |
| 14 | PT/INR and aPTT as therapy-monitoring tests; INR interpretation | prothrombin time; partial thromboplastin; INR international normalized ratio | **NEW** | no hit on any of the three queries |
| 15 | ESR — technique (Wassermann's tube), normal values, physiological causes of rise, and the afibrinogenaemia paradox (ESR falls without fibrinogen) | erythrocyte sedimentation; afibrinogenemia | **HIT-PENDING** | `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` carries "Erythrocyte sedimentation rate" as an alias on a live-adjacent record — unimported Kasr batch, not live yet; the afibrinogenaemia-specific fact was not found anywhere |
| 16 | Hematocrit — technique, normal male value, effect of dilution (saline infusion lowers it) | hematocrit; saline infusion hematocrit | **NEW** | the only "hematocrit" hit is an unrelated renal-physiology concept (`CON-REN-F8ECC7089B5A73`, renal-blood-flow equation) |
| 17 | MCV/MCH/MCHC — definitions and the MCHC calculation (Hb ÷ Hct × 100) | MCHC | **NEW** | no hit |
| 18 | WBC count interpretation — leukocytosis as a CBC finding and its normal range | leukocytosis | **NEW** at this grain | `CON-IMM-84D583D12328C3` (live) covers only "infection causes leukocytosis" as an aetiology fact, not the CBC-parameter/normal-range point the questions test |
| 19 | Immunoglobulin classes — structural basis of classification (light/heavy chain type), IgA in secretions, IgE in hypersensitivity | immunoglobulin; IgE hypersensitivity | **HIT-LIVE** | `CON-IMM-30F59F7120E442` (IgM/IgD as BCR), `CON-IMM-E098A15ED29DE2` (serum Ig classes + salivary IgA), `CON-OBS-5C8EFDA760C2EC` (placental Ig transfer) — none is an exact match to "classification by chain type" or "IgE/hypersensitivity", so Step 2 must pick the nearest and cross-link rather than assume full coverage |
| 20 | Opsonisation — definition and role in phagocytosis | opsonin; phagocytosis | **HIT-LIVE** | `CON-IMM-DA2EA4EC41707C` ("An opsonin is a molecule that facilitates phagocytosis") — a close match |

**Table total: 20 distinct ideas** — 7 HIT-LIVE (rows 1, 2, 5, 11, 12, 19, 20), 1 HIT-PENDING
(row 15), 12 NEW (rows 3, 4, 6, 7, 8, 9, 10, 13, 14, 16, 17, 18 — several of these sit next to
live or pending ground at a different grain and are flagged for a Step 2 tiebreaker rather than
pre-judged either way, exactly as the sibling Histology triage flagged its own grain-mismatches).

## HAZARDS

- **This department has no source text of its own beyond practical protocol sheets.** Every
  Physiology concept and article in Step 2 will need a general reference (a standard
  physiology textbook aligned to NAQAAE), not a department-book citation — unlike Biochemistry
  and Histology, which have lecture slides / notes to cite directly. Say so explicitly in each
  article's evidence rather than inventing a department-book citation that does not exist.
- **Five questions were deferred to the Histology triage** (RES role, RBC-membrane flexibility,
  neutrophil function, T-helper function, NK-cell function — table above, "Department-
  attribution method"). This is my judgement call based on whose department book demonstrably
  teaches the fact, not a rule the validator enforces. If the orchestrator or the Histology lane
  disagrees, these five should move back here before Step 2 concepts are minted on either side.
- **`MCQs - Blood practical.pdf` (`src_3e62e4d388493af88dbe`) is a phone screenshot of a
  Microsoft Forms quiz**, matching exactly what the Histology triage already flagged: UI chrome
  captured as text ("9:57", battery icons), inconsistent/repeating question numbers across page
  captures (the same item's stem and reveal often split across two "pages" of the PDF, and at
  least one question number — 63 — never appears at all), and **14 of the 27 Physiology items
  in it have no recoverable key** in the cached text: either the respondent answered correctly
  first try (Forms shows no "Correct answers:" reveal in that case) or the item is right at a
  page-break and the reveal is cut off. I did not attempt to re-render or guess any of these —
  recorded as unkeyed, per the manual's own rule that an unrecoverable key is recorded, not
  authored. **A render-level check (200 dpi, per `SHARED-TOOLCHAIN.md`'s key-recovery
  procedure) might recover some of these from on-screen tick/cross marks that plain text
  extraction cannot see** — worth a second pass before Step 3 if this bank is to be used at all
  beyond its 14 cleanly-keyed items.
- **Two questions carry a key that looks physiologically inconsistent** (EOM1 Q23: leukocytopenia
  as "the" indication for blood transfusion over secondary polycythaemia; EOM1 Q33: an altitude
  climber with Hb 11/Hct 38 keyed as sickle-cell anaemia rather than a picture consistent with
  mild anaemia or expected altitude polycythaemia; EOM2 Q55: chronic lung disease with a stated
  *low* EPO keyed as secondary polycythaemia, when chronic hypoxia should raise EPO). Recorded
  as printed per the manual's rule against inventing or "fixing" an answer — not resolved,
  flagged for whoever authors these three so the explanation can note the tension rather than
  silently teach the printed key as uncontested fact.
- **General MCQ bank count mismatch**, same finding as the Histology triage: the dispatch note
  said "3 MCQ banks in General"; the manifest shows only 2 distinct twin-groups there. Recorded,
  not assumed to be an error in the dispatch.
- **The `.docx` twin `src_5309ee19e1149a5bbe9d`** is still uncached — see "Substitution note"
  above. Step 2 should re-verify the 10 Physiology spot answers against it once cached, since
  the manifest's own finding is that twins are not always byte-identical even across format.
- **EOM2 Q29 needs its source image** — it is a diagram question ("what type of immunoglobulin
  is shown") and the image is not in the extracted page text. Media request, not a rewritten
  prose stem, per `05-questions.md`.

## OWED

- **4 practical documents, noted not authored** (`src_f5026e42c1d5c7361a7b`,
  `src_a026c7eabba03b146bd1`, `src_dc2cf80b7e674606b9d0`, `src_3972abc91c78bdbd265a` — see
  "Practical documents read" above). For the later practical lane; they cover CBC/ESR/Hct/
  blood-grouping/bleeding-and-clotting-time technique in more procedural detail than any
  question here draws on.
- **Five questions deferred to Histology** (see HAZARDS) — needs orchestrator or cross-lane
  confirmation before Step 2 on either side.
- **`src_5309ee19e1149a5bbe9d`** (`.docx`) — re-read once cached; re-confirm the 10 Physiology
  spot answers against it before Step 2 citations are finalised (same obligation the Histology
  lane recorded for its own 9 spots from the same file).
- **14 unkeyed items in the Forms-screenshot bank** — candidates for a render-level key-recovery
  pass (200 dpi per SHARED-TOOLCHAIN) if that bank is judged worth the effort beyond its 14
  cleanly-keyed items; otherwise they stay recorded as unkeyed and unauthored.
- **Rows 3, 7, 9, 10, 18, 19 above carry an adjacent live/pending record at a different grain**
  — each needs the Step 2 tiebreaker from `00-START-HERE.md` §4 ("could one record answer both
  questions…") before minting, rather than being pre-judged as either a duplicate or genuinely
  distinct here.

## BLOCKED

none — every source needed for this department's triage was either pre-cached by the tooling
lane, already cached by the sibling Histology lane (the non-preferred PDF twin of the docx
bank), or safely extractable by me (the practical sheets, not a shared paper/bank category).
