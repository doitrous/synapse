<!--
  Sparse updates only. Lane W1-102-BIOC-B (sub-lane of W1-102-BIOC), AU-MED-102
  Biochemistry — bioenergetics + carbohydrate metabolism + lipid metabolism
  (triage topics G, I, J).

  Every ## id below targets a concept that exists ONLY in an unimported Kasr
  Year 1 batch — none is in server/data/medical-library-v1.json yet. Apply this
  file ONLY after the named Kasr file is live (see pending-live/INDEX.md). Three
  source files are involved:

    A. docs/Kasr-Source-Imports/concept/103-BMS-biochemistry-concepts.md
    B. docs/Kasr-Source-Imports/concept/103-BMS-mcq-carbohydrate-concepts.md
    C. docs/Kasr-Source-Imports/concept/103-BMS-mcq-lipid-concepts.md
    D. docs/Kasr-Source-Imports/concept/102-INT-concepts.md

  Each record below names which one (A/B/C/D) it targets. Per LANE-BRIEF Sec16
  rule 1/2, Sec18 correction 2, and the coordinator's merged-validator note
  (d82dd36): every record carries `## id` + `## label` (the Kasr concept's own
  label, retyped verbatim — required by the validator as of d82dd36, not
  optional) + only the fields being changed. `+` additions are one
  university/module/year per line (pipe-joined is safe again per the
  coordinator, but this file keeps one-per-line for readability). Concepts have
  no `university_notes` column — the Alexandria-specific note for each record is
  folded into `field_notes` instead.

  Every idea below is tested ONLY by the department's AFM staff question bank
  (src_01ab4268402d32d4d111) — no other AU-MED-102 Biochemistry source touches
  bioenergetics, carbohydrate metabolism or lipid metabolism at all (triage
  Sec5). Every exam_signal row cites that one source; page numbers are the PDF's
  own page index (matching scripts/alexandria/pagetext/src_01ab4268402d32d4d111.json).

  Simulated with (all four Kasr files together, since several records below
  reference more than one):
  npm run medical:simulate -- "docs/Alexandria-Source-Imports/pending-live/AU-MED-102-biochem-metabolism.md" \
    --with docs/Kasr-Source-Imports/concept/103-BMS-biochemistry-concepts.md \
    --with docs/Kasr-Source-Imports/concept/103-BMS-mcq-carbohydrate-concepts.md \
    --with docs/Kasr-Source-Imports/concept/103-BMS-mcq-lipid-concepts.md \
    --with docs/Kasr-Source-Imports/concept/102-INT-concepts.md \
    --emit /tmp/sim-AU-MED-102-biochem-metabolism-pending.json
-->

# Item

## id
CON-FND-7228237A5897B5

## label
A bond is high energy when hydrolysis releases 7.3 kcal/mol or more, which is what each terminal phosphate bond of ATP yields

## universities
+au

## modules
+AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Bioenergetics > High- and low-energy phosphate bonds

## exam_signal
src_01ab4268402d32d4d111 | dept_bank | | p54 | MED 102

## field_notes
universityNotes: Tested twice by the AFM bank — which compound lacks a high-energy bond (glucose 6-phosphate is the low-energy exception among ATP/PEP/acetyl-CoA, Q1) and which bond listed is NOT low-energy (enol phosphate is high-energy, unlike phosphate ester/glycosidic/peptide bonds, Q6). Both are the same threshold fact tested from opposite directions.

---

# Item

## id
CON-FND-A3BC299ED2C7C9

## label
The respiratory chain has four complexes and two mobile carriers, and NADH and FADH2 enter it at different points

## universities
+au

## modules
+AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Bioenergetics > Electron transport chain

## exam_signal
src_01ab4268402d32d4d111 | dept_bank | | p54 | MED 102

## field_notes
universityNotes: Tested twice by the AFM bank — coenzyme Q's role carrying electrons from NADH (via Complex I) to ubiquinone/cytochrome b, not as the chain's last member (Q2), and the chain's location and composition, inner mitochondrial membrane with 3 complexes plus CoQ and cytochrome c per the department's own key (Q7) — the department's key for Q7 counts complexes I, III and IV as "the following 3 complexes" alongside CoQ and cytochrome c, naming Complex II separately, which this record's own four-complex count already accommodates.

---

# Item

## id
CON-FND-0CA8047810DF78

## label
Complexes I, III and IV pump the protons; the gradient they build is what drives ATP synthase

## universities
+au

## modules
+AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Bioenergetics > Chemiosmosis and ATP synthase

## exam_signal
src_01ab4268402d32d4d111 | dept_bank | | p54 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p55 | MED 102

## field_notes
universityNotes: Tested three times by the AFM bank — ATP synthase's F1/F0 subunits and the direction of proton flow, F0 to F1 (Q4, an EXCEPT item); which statement about Complex II is false, that it is a site of energy release, since it is not a proton-pumping/coupling complex (Q8); and which complexes coupling sites are associated with, I/III/IV (Q9). All three turn on the same fact this record already states — the coupling/proton-pumping complexes are I, III and IV, and Complex II is not one of them.

---

# Item

## id
CON-FND-6B7241CD9F3C42

## label
Cells do not store energy as ATP; creatine phosphate is the store, and the ATP–ADP cycle turns over in seconds

## universities
+au

## modules
+AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Bioenergetics > ATP-ADP cycle and energy storage

## exam_signal
src_01ab4268402d32d4d111 | dept_bank | | p54 | MED 102

## field_notes
universityNotes: Directly tested — "energy is stored in the muscles as: creatine phosphate" (Q5), keyed against ATP, S-adenosyl-methionine and active acetate as distractors.

---

# Item

## id
CON-FND-C3CB859E560A18

## label
An uncoupler lets oxidation continue while ATP synthesis stops, and the energy leaves as heat; ADP availability is what normally sets the rate

## universities
+au

## modules
+AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Bioenergetics > Uncouplers of oxidative phosphorylation

## exam_signal
src_01ab4268402d32d4d111 | dept_bank | | p55 | MED 102

## field_notes
universityNotes: Directly tested — "an uncoupler of oxidative phosphorylation: 2,4-dinitrophenol" (Q10), keyed against barbiturates, cyanide and carboxin as distractors (all electron-transport-chain inhibitors, not uncouplers).

---

# Item

## id
CON-FND-8771AB893CA4C3

## label
The reducing agent is the electron donor, and oxygen has the highest redox potential, which is why it sits at the end of the chain

## universities
+au

## modules
+AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Bioenergetics > Electron transport chain

## exam_signal
src_01ab4268402d32d4d111 | dept_bank | | p55 | MED 102

## field_notes
universityNotes: Directly tested — "final acceptor in the electron transport chain: O2" (Q11), keyed against NADH, FADH2 and NAD+ as distractors (all electron donors upstream of oxygen, not the terminal acceptor).

---

# Item

## id
CON-HEM-095C9C97B56CCA

## label
Glycolysis is the only source of ATP in the red cell, because the red cell has no mitochondria

## universities
+au

## modules
+AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Carbohydrate Metabolism > Glycolysis in the red cell

## exam_signal
src_01ab4268402d32d4d111 | dept_bank | | p25 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p30 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p36 | MED 102

## field_notes
universityNotes: Tested three times — glycolysis product in erythrocytes is lactate, not pyruvate/CO2/NADPH (Q2); RBCs' oxidation of glucose yields 2 ATP, none from mitochondrial pathways (Q36); and where RBCs get all their energy, anaerobic glycolysis (Q80, against TCA cycle/fatty acid oxidation/electron transport chain distractors). A fourth item (Q55, "RBCs derive their energy from: glycolysis") repeats the same fact against the same four-option distractor set.

---

# Item

## id
CON-FND-EA1BA37ACB643B

## label
Hexokinase has a low Km and works everywhere; glucokinase has a high Km, sits in liver and β-cells, and is induced by insulin

## universities
+au

## modules
+AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Carbohydrate Metabolism > Glycolysis

## exam_signal
src_01ab4268402d32d4d111 | dept_bank | | p25 | MED 102

## field_notes
universityNotes: Directly tested — "glucokinase is more active after a meal, because: it is an inducible enzyme" (Q3), against glucokinase having more affinity than hexokinase, acting in all tissues, and acting on all monosaccharides as distractors — all three false statements this record's definition already corrects.

---

# Item

## id
CON-FND-853096A349FFBD

## label
Glycolysis has three irreversible steps, and the committed one is PFK-1 making fructose 1,6-bisphosphate

## universities
+au

## modules
+AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Carbohydrate Metabolism > Glycolysis

## exam_signal
src_01ab4268402d32d4d111 | dept_bank | | p25 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p26 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p29 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p30 | MED 102

## field_notes
universityNotes: Tested five times — which enzyme catalyses an irreversible reaction, PFK (Q4); the key enzyme of glycolysis, PFK-1 (Q11); PFK-1's activator, AMP, against ATP/F1,6BP/F1P (Q12); which glycolytic reaction is reversible, PFK1/glucokinase/pyruvate kinase are all irreversible so phosphoglycerate kinase is the answer (Q32); and which two enzymes convert G6P to F1,6BP, phosphohexose isomerase and PFK-1 (Q38). All five turn on identifying PFK-1 as the committed, rate-limiting, allosterically regulated step this record already names.

---

# Item

## id
CON-FND-5253967A0E3786

## label
Substrate-level phosphorylation makes ATP directly at three reactions: two in glycolysis and one in the citric acid cycle

## universities
+au

## modules
+AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Carbohydrate Metabolism > Substrate-level phosphorylation

## exam_signal
src_01ab4268402d32d4d111 | dept_bank | | p25 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p26 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p29 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p33 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p34 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p35 | MED 102

## field_notes
universityNotes: Tested six times — an example of substrate-level phosphorylation, pyruvate kinase against isocitrate dehydrogenase/enolase/GAPDH (Q5); which reaction does NOT generate ATP, hexokinase, since it consumes rather than makes ATP (Q10); phosphoglycerate kinase's own reaction, 1,3-BPG to 3-PG (Q33, tests the reaction identity rather than the phosphorylation itself, kept here as the same enzyme); which reaction produces ATP at the substrate level, phosphoglycerate kinase (Q34); which reaction forms a newly-created high-energy phosphate bond, 2-phosphoglycerate to phosphoenolpyruvate, i.e. the enolase step feeding pyruvate kinase (Q63); and the TCA cycle's own substrate-level step, printed by this bank as "ketoglutarate to succinate" — collapsing the α-ketoglutarate dehydrogenase and succinate thiokinase steps into one option (Q69, render-checked at 200 dpi to recover the true option text, the OCR text layer having dropped the intermediate "succinyl-CoA" wording).

---

# Item

## id
CON-FND-534286EBBAC239

## label
NAD+, NADP+, FMN and FAD are the nucleotide-derived coenzymes that carry hydrogen between oxidised and reduced forms

## universities
+au

## modules
+AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Carbohydrate Metabolism > Dehydrogenase coenzymes

## exam_signal
src_01ab4268402d32d4d111 | dept_bank | | p25 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p32 | MED 102

## field_notes
universityNotes: Tested twice — which dehydrogenase is NOT NAD+-dependent, glucose-6-phosphate dehydrogenase, which is NADP+-specific (Q6); and the same fact from the other direction, which NAD-dependent-enzyme list has the one exception, again G6PD (Q54). Both cross-reference CON-HEM-A1EF4D20C85878 (G6PD, already live) as the concrete example the AFM bank tests the NAD/NADP distinction through — this lane does not sparse-update that record again here, since sub-lane A's own AU-MED-102-biochem-structural scope does not test it and no update is owed beyond the existing live record.

---

# Item

## id
CON-FND-0D6BFD870813B7

## label
Fluoride stops glycolysis at enolase and arsenic stops it at glyceraldehyde 3-phosphate dehydrogenase

## universities
+au

## modules
+AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Carbohydrate Metabolism > Glycolysis inhibitors

## exam_signal
src_01ab4268402d32d4d111 | dept_bank | | p25 | MED 102

## field_notes
universityNotes: Directly tested — "which enzyme in glycolytic pathway is inhibited by fluoride ions: enolase" (Q7), against hexokinase/PFK/aldolase as distractors.

---

# Item

## id
CON-FND-403D06D1FB129F

## label
Anaerobic glycolysis makes lactate not for the lactate but to regenerate the NAD+ that glyceraldehyde 3-phosphate dehydrogenase needs

## universities
+au

## modules
+AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Carbohydrate Metabolism > Glycolysis

## exam_signal
src_01ab4268402d32d4d111 | dept_bank | | p26 | MED 102

## field_notes
universityNotes: Directly tested — "during anaerobic glycolysis NAD+ is regenerated from NADH by: lactate dehydrogenase" (Q8), against GAPDH/oxygen/glutamate dehydrogenase as distractors.

---

# Item

## id
CON-FND-CA74978B7B7ED1

## label
Glycogen synthesis and breakdown are reciprocally switched by one cAMP cascade, with calcium and AMP as the muscle's own overrides

## universities
+au

## modules
+AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Carbohydrate Metabolism > Glycogen metabolism regulation

## exam_signal
src_01ab4268402d32d4d111 | dept_bank | | p26 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p28 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p31 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p33 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p37 | MED 102

## field_notes
universityNotes: Tested five times — which enzyme is NOT a regulatory enzyme, lactate dehydrogenase, against glycogen phosphorylase/G6PD/pyruvate kinase (Q9); the hormone that activates glycogen phosphorylase, epinephrine (Q22); glycogen phosphorylase's own properties — cAMP-activated, ATP-inhibited, not insulin-activated (Q45); epinephrine and glucagon's combined effect on liver glycogen metabolism, phosphorylase activated while synthase is inactivated (Q57); and, during glycogenolysis, what protein kinase A activates, phosphorylase kinase (Q83).

---

# Item

## id
CON-FND-0F4A45886203EF

## label
Glucose yields 32 ATP aerobically and 2 anaerobically, and four of the aerobic ATP are made at substrate level in glycolysis

## universities
+au

## modules
+AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Carbohydrate Metabolism > Complete glucose oxidation

## exam_signal
src_01ab4268402d32d4d111 | dept_bank | | p26 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p29 | MED 102

## field_notes
universityNotes: Tested twice, and the AFM bank's own printed key uses the OLDER P/O-ratio convention (NADH = 3 ATP, FADH2 = 2 ATP) rather than this record's modern 32/2 figures: "complete oxidation of one molecule of glucose yields how many ATPs" keys 38 (Q13, option text recovered by 200 dpi render after the OCR text layer scrambled it to "129"), and "complete oxidation of glucose to pyruvate in liver produces" keys 8 ATP (Q35, i.e. 2 substrate-level + 2 NADH×3 shuttled — again the old convention). This is a genuine numeric-convention mismatch between this record's modern figure and the department's own examined figure, not an error in either; recorded for the question author's attention rather than silently reconciled.

---

# Item

## id
CON-FND-229C78C9EB0E78

## label
Pyruvate dehydrogenase is irreversible and needs five coenzymes, of which thiamine pyrophosphate is the one that fails first

## universities
+au

## modules
+AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Carbohydrate Metabolism > Pyruvate dehydrogenase

## exam_signal
src_01ab4268402d32d4d111 | dept_bank | | p26 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p27 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p32 | MED 102

## field_notes
universityNotes: Tested three times — which coenzyme is NOT involved in the PDH reaction, biotin, against TPP/NAD+/FAD (Q14); PDH requires all of NAD/CoA/pyruvate EXCEPT ATP (Q40); and which coenzyme-enzyme pairing is wrong, "pyruvate dehydrogenase, PLP" — PDH does not use PLP among its five coenzymes (Q50).

---

# Item

## id
CON-FND-089E2C3E01031C

## label
Lactate, glucogenic amino acids, glycerol and odd-chain fatty acids give glucose; acetyl-CoA never can

## universities
+au

## modules
+AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Carbohydrate Metabolism > Gluconeogenesis

## exam_signal
src_01ab4268402d32d4d111 | dept_bank | | p27 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p31 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p34 | MED 102

## field_notes
universityNotes: Tested four times — no net glucose synthesis from fat because pyruvate-to-acetyl-CoA is irreversible (Q15); gluconeogenic substrates EXCEPT palmitic acid (Q21); which of lactate/glycerol/alanine/acetyl-CoA cannot be a gluconeogenic precursor, acetyl-CoA (Q49); and which compound cannot give net glucose synthesis, acetyl-CoA, against lactate/glycerol/α-ketoglutarate (Q66).

---

# Item

## id
CON-FND-C2C88203E4A918

## label
Gluconeogenesis is the reversal of glycolysis except at three irreversible steps, which four key enzymes bypass

## universities
+au

## modules
+AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Carbohydrate Metabolism > Gluconeogenesis

## exam_signal
src_01ab4268402d32d4d111 | dept_bank | | p27 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p31 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p33 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p35 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p36 | MED 102

## field_notes
universityNotes: Tested five times — the four key gluconeogenic enzymes EXCEPT phosphofructokinase, which is glycolytic not gluconeogenic (Q19); which enzyme is NOT cytosolic among the gluconeogenic set, pyruvate carboxylase, which is mitochondrial (Q47); which enzymes gluconeogenesis requires, all of PEP carboxykinase/fructose-1,6-bisphosphatase/G6Pase (Q60); the one enzyme shared by glycolysis and gluconeogenesis, aldolase — a related but distinct point from this record's own bypass-enzyme list, since aldolase is one of the pathway's *shared*, non-bypassed steps rather than one of the four key enzymes (Q71); and which reaction is unique to gluconeogenesis, oxaloacetate to phosphoenolpyruvate (Q77, biotin-requiring per Q76's own phrasing of the same fact).

---

# Item

## id
CON-FND-7B3B4F0BEBF198

## label
Glycolysis and gluconeogenesis are reciprocally regulated, and it is fatty acid oxidation that tips the liver towards making glucose

## universities
+au

## modules
+AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Carbohydrate Metabolism > Gluconeogenesis regulation

## exam_signal
src_01ab4268402d32d4d111 | dept_bank | | p27 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p36 | MED 102

## field_notes
universityNotes: Tested twice — gluconeogenesis is inhibited by insulin, against glucagon/growth hormone/glucocorticoids, all of which favour it (Q18); and the synthesis of glucose from pyruvate requires biotin and is inhibited by elevated glucagon being the false option among the four (Q76).

---

# Item

## id
CON-FND-3905E3B98C2EC4

## label
Glycogen breakdown yields mostly glucose-1-phosphate, and only the liver can turn it into blood glucose

## universities
+au

## modules
+AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Carbohydrate Metabolism > Glycogen metabolism

## exam_signal
src_01ab4268402d32d4d111 | dept_bank | | p28 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p33 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p36 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p37 | MED 102

## field_notes
universityNotes: Tested four times — glycogen's own structure and storage facts, all true of branching/bonds/muscle-vs-liver storage (Q44, folded here as the nearest general glycogen-metabolism record, since no Kasr concept states the structural fact alone); why muscle glycogen cannot raise blood glucose, because muscle lacks glucose-6-phosphatase (Q59); which tissue converts glycogen to glucose in the basal state, liver (Q81); and the rate-limiting enzyme of glycogen degradation, glycogen phosphorylase (Q82). A fifth item (Q78, the branching-point-forming enzyme, transglucosidase/glucotransferase) is glycogen synthesis rather than breakdown but is recorded here for the same reason — no finer Kasr concept exists for glycogen's synthesis mechanics specifically.

---

# Item

## id
CON-FND-1BE461A57AB76D

## label
Von Gierke's disease is glucose 6-phosphatase deficiency, and every feature follows from glucose 6-phosphate that cannot be dephosphorylated

## universities
+au

## modules
+AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Carbohydrate Metabolism > Glycogen storage disease

## exam_signal
src_01ab4268402d32d4d111 | dept_bank | | p28 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p31 | MED 102

## field_notes
universityNotes: Tested twice — the deficient enzyme in Von Gierke's disease, G6Pase (Q23); and which statement is false among fasting hypoglycaemia/hyperlipidaemia-and-ketosis/hypouricaemia, since the disease in fact causes *hyper*uricaemia, not hypouricaemia (Q46) — the AFM bank's own EXCEPT item correctly keys the false "hypouricaemia" statement, so no internal contradiction survives into the authored question, unlike a separate Von Gierke item the triage flagged in a different topic group.

---

# Item

## id
CON-HEM-4F64967BBFBB6F

## label
G6PD deficiency increases RBC susceptibility to oxidant-induced hemolysis

## universities
+au

## modules
+AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Carbohydrate Metabolism > Hexose Monophosphate Pathway

## exam_signal
src_01ab4268402d32d4d111 | dept_bank | | p28 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p31 | MED 102

## field_notes
universityNotes: Tested twice — which enzyme generates NADPH, G6PD (Q24, framed as the enzyme identity rather than the haemolysis mechanism, kept here as the same enzyme); and favism's deficient enzyme, G6PD (Q43). This record is already live and updated by Kasr's 103-BMS-biochemistry-concepts.md batch (see that file's own header); this sparse update targets the same id after that Kasr batch lands, per the ordering in pending-live/INDEX.md.

---

# Item

## id
CON-FND-B928DE79E08882

## label
The hexose monophosphate pathway is the main source of NADPH, and its oxidative phase is irreversible

## universities
+au

## modules
+AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Carbohydrate Metabolism > Hexose Monophosphate Pathway

## exam_signal
src_01ab4268402d32d4d111 | dept_bank | | p28 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p30 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p35 | MED 102

## field_notes
universityNotes: Tested three times — which of ATP/fatty-acid-biosynthesis/reduced-glutathione/ribose is NOT what the HMP shunt supplies, ATP (Q26); the HMP pathway's own products, NADPH and pentose phosphate (Q62); and its tissue distribution, cytosol of liver/adipose/testis, i.e. all of the above (Q41). A fourth item on tissue distribution by enzyme activity (Q73, G6PD activity very low in adrenal cortex, against skeletal muscle/adipose/red cell) and the transketolase-thiamine link (Q25, folded here rather than under a separate vitamins concept, since the AFM bank frames it as an HMP-pathway fact) are recorded on the same concept for the same reason — no finer Kasr concept exists for the pathway's tissue distribution or its thiamine-dependent step specifically. Sub-lane C (nitrogen/blood/vitamins) may also touch this same concept from its own vitamins scope; flagged as a cross-lane note, not duplicated here beyond this file.


---

# Item

## id
CON-FND-F8FE239D334F4F

## label
Alpha-oxidation handles fatty acids that are too branched for beta-oxidation and peroxisomal oxidation handles those that are too long

## universities
+au

## modules
+AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Lipid Metabolism > Oxidation of fatty acids

## exam_signal
src_01ab4268402d32d4d111 | dept_bank | | p43 | MED 102

## field_notes
universityNotes: Directly tested — "Refsum's disease is due to lack of enzymes of: alpha oxidation" (Q1), against beta oxidation/omega oxidation/desaturation as distractors.

---

# Item

## id
CON-GIT-3A348EEAF118BD

## label
HMG-CoA reductase is the rate-limiting step of cholesterol synthesis, active when dephosphorylated, and the branch point that decides whether HMG-CoA becomes a sterol or a ketone body is the compartment

## universities
+au

## modules
+AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Lipid Metabolism > Cholesterol metabolism

## exam_signal
src_01ab4268402d32d4d111 | dept_bank | | p43 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p47 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p50 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p51 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p52 | MED 102

## field_notes
universityNotes: Tested seven times — HMG-CoA's own direct products EXCEPT acetoacetyl-CoA, which is upstream of it, not downstream (Q2); the rate-limiting step of cholesterol biosynthesis, HMG-CoA reductase (Q27); HMG-CoA as precursor of all EXCEPT palmitic acid, since HMG-CoA does not feed de novo fatty-acid synthesis (Q51); HMG-CoA as intermediate for ketone bodies and cholesterol, not triglycerides/phospholipids (Q54); the key enzyme of cholesterol biosynthesis, HMG-CoA reductase, restated (Q59); HMG-CoA reductase's own reaction, to mevalonate (Q61); and HMG-CoA lyase's own reaction, to acetoacetate (Q62). The AFM bank frames the cholesterol-vs-ketone-body branch point as which compartment (cytosol for cholesterol, mitochondria for ketogenesis) rather than naming a single regulatory step, consistent with this record's own framing.

---

# Item

## id
CON-GIT-ECB3C2F56DC72D

## label
The plasma lipoproteins form one series ordered by protein content, and that order is the order of density

## universities
+au

## modules
+AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Lipid Metabolism > Plasma lipids and lipoproteins

## exam_signal
src_01ab4268402d32d4d111 | dept_bank | | p43 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p45 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p50 | MED 102

## field_notes
universityNotes: Tested three times — which lipoprotein carries the highest cholesterol content delivered to tissues, LDL (Q3, framed among the delivery lipoproteins, distinct from HDL's overall reverse-transport role); the main lipid in nascent HDL, phospholipid (Q15); and nascent HDL's major component restated, phospholipid (Q52).

---

# Item

## id
CON-GIT-6CB618DBA50596

## label
Lipoprotein lipase empties triacylglycerol-rich particles at the capillary wall; apo C-II activates it, insulin induces it, and heparin displaces it

## universities
+au

## modules
+AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Lipid Metabolism > Plasma lipids and lipoproteins

## exam_signal
src_01ab4268402d32d4d111 | dept_bank | | p43 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p47 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p52 | MED 102

## field_notes
universityNotes: Tested three times — lipoprotein lipase's own properties, hydrolysing triacylglycerol from circulating particles rather than being intracellular or mobilising adipose stores itself (Q4); the consequence of decreased LPL activity, elevation of both chylomicrons and VLDL together (Q32); and its activator, apo C-II (Q64).

---

# Item

## id
CON-END-2E748A37DA660A

## label
The liver makes ketone bodies it cannot itself use, because it has HMG-CoA synthase and lyase and lacks thiophorase

## universities
+au

## modules
+AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Lipid Metabolism > Metabolism of ketone bodies

## exam_signal
src_01ab4268402d32d4d111 | dept_bank | | p43 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p45 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p46 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p48 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p50 | MED 102

## field_notes
universityNotes: Tested seven times — acetoacetate-to-acetone conversion as non-enzymatic (Q5); ketone bodies as lipid-metabolism intermediates (Q6); which substance is NOT used as a muscle energy source, acetone, since it cannot be metabolised for fuel (Q10); ketone-body formation site, hepatic mitochondria (Q16); which tissues can oxidise ketone bodies, heart (against liver, which cannot use its own product) (Q21); ketone bodies formed from active acetate derived from beta-oxidation of fatty acids (Q33); and which liver process is the exception, ketolysis, since the liver cannot use the ketone bodies it makes (Q46).

---

# Item

## id
CON-FND-FCFC1B5A95695E

## label
Acetyl-CoA reaches the cytosol as citrate, and ATP-citrate lyase is what releases it there

## universities
+au

## modules
+AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Lipid Metabolism > Synthesis of fatty acids

## exam_signal
src_01ab4268402d32d4d111 | dept_bank | | p44 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p48 | MED 102

## field_notes
universityNotes: Tested twice — the citrate shuttle as the route for transferring mitochondrial acetyl groups to the cytosol for fatty-acid synthesis (Q7); and the enzyme that releases cytosolic acetyl-CoA from citrate, ATP-citrate lyase (Q38).

---

# Item

## id
CON-FND-177A829022AC8F

## label
A fatty acid is activated to acyl-CoA in the cytosol, and only carnitine can carry it across the inner mitochondrial membrane

## universities
+au

## modules
+AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Lipid Metabolism > Oxidation of fatty acids

## exam_signal
src_01ab4268402d32d4d111 | dept_bank | | p44 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p45 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p48 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p49 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p51 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p52 | MED 102

## field_notes
universityNotes: Tested six times — the transport agent long-chain fatty acids attach to for mitochondrial entry, carnitine (Q9); carnitine's own role, oxidation/transport (Q13); which statement about carnitine is false, that it is involved in fatty-acid synthesis rather than oxidation (Q36); the acyl-CoA synthetase reaction's own requirements, CoASH and ATP (Q40); free fatty acids' transport form in blood, bound to albumin, upstream of the carnitine-mediated mitochondrial step (Q57); a carnitine deficiency's specific effect, impaired beta-oxidation (Q58); and the activating agent and shuttle molecule for beta-oxidation, CoA and carnitine respectively (Q66).

---

# Item

## id
CON-FND-84BDACCA71AF45

## label
Beta-oxidation removes two carbons per turn in the mitochondrial matrix, and that fixes the turn count, the yield per turn, and what an odd-chain fatty acid leaves behind

## universities
+au

## modules
+AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Lipid Metabolism > Oxidation of fatty acids

## exam_signal
src_01ab4268402d32d4d111 | dept_bank | | p44 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p45 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p48 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p49 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p53 | MED 102

## field_notes
universityNotes: Tested five times — the compounds formed each beta-oxidation cycle EXCEPT the fatty acyl-CoA count being wrong as printed (Q11); which enzyme is NOT involved in beta-oxidation, enoyl reductase, which is a fatty-acid-synthesis enzyme instead (Q17); which compound is NOT generated each cycle, NADPH (beta-oxidation generates NADH and FADH2, not NADPH, which is spent in synthesis instead) (Q35); the number of ATP gained from complete oxidation of butyric acid (Q37); and the number of turns needed to process a C20 fatty acid, nine (Q67, render-checked at 200 dpi: option "a-9" circled, matching the printed working "20/2 = 10-1 = 9").

---

# Item

## id
CON-FND-6B469645AE7DBC

## label
Adipose tissue lacks glycerol kinase, so it can only build triacylglycerol when glucose is available and cannot reuse the glycerol it releases

## universities
+au

## modules
+AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Lipid Metabolism > Synthesis of triacylglycerol

## exam_signal
src_01ab4268402d32d4d111 | dept_bank | | p44 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p52 | MED 102

## field_notes
universityNotes: The AFM bank gives two different answers to this same question in two different places — Q12 keys "glycerol kinase acting on glycerol" as the source of adipose glycerol-3-phosphate, while Q65 keys "reduction of dihydroxyacetone phosphate," which is the standard teaching this record itself states (adipose tissue lacks glycerol kinase). This is a genuine internal contradiction in the department's own bank (flagged already in the triage, Sec5/Sec8), not a transcription error by this lane; Q65 is authored as the keyed, standard-teaching-consistent question, and Q12 is recorded here as exam signal only, not separately authored, since authoring both would teach two different mechanisms from one concept record.

---

# Item

## id
CON-GIT-33EAF87333AAD5

## label
Chylomicrons carry dietary triacylglycerol out of the gut; VLDL carries hepatic triacylglycerol out of the liver

## universities
+au

## modules
+AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Lipid Metabolism > Plasma lipids and lipoproteins

## exam_signal
src_01ab4268402d32d4d111 | dept_bank | | p45 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p46 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p47 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p49 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p50 | MED 102

## field_notes
universityNotes: Tested six times — how most dietary lipids are packaged and exported from the intestinal mucosa, as chylomicrons (Q18); chylomicrons' apolipoproteins EXCEPT apo B-100, which is the hepatic (VLDL/LDL) apoprotein, not the intestinal one (Q19); dietary management to lower chylomicron levels, decreased fat intake (Q24, the LPL-deficiency/chylomicronaemia management fact folded here since no finer Kasr concept exists for it); what VLDL transports, triacylglycerol from liver to peripheral tissues (Q28, restated); chylomicron's own transport function, triglycerides from intestine, and LDL's function, cholesterol from liver to peripheral tissues (Q47, Q48); and which statement about VLDL is true, transferring triacylglycerol from liver to tissues, against the false options that VLDL's main lipid is cholesterol or that it carries apo B-48 (the chylomicron apoprotein) (Q45).

---

# Item

## id
CON-END-CC450A236ABF50

## label
Ketosis is what happens when ketogenesis outruns ketolysis, and every cause is a state of high anti-insulin to insulin ratio

## universities
+au

## modules
+AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Lipid Metabolism > Metabolism of ketone bodies

## exam_signal
src_01ab4268402d32d4d111 | dept_bank | | p46 | MED 102

## field_notes
universityNotes: Tested twice — ketosis results from increased fatty-acid oxidation, not from increased carbohydrate utilisation (Q20); and the causes of ketosis EXCEPT nephrotic syndrome, which is not a recognised cause against starvation/uncontrolled diabetes/high-fat-low-carbohydrate diet (Q26).

---

# Item

## id
CON-FND-2F3A652B8E3104

## label
Acetyl-CoA carboxylase is the key enzyme of lipogenesis: it needs biotin, it makes malonyl-CoA, and every control signal converges on it

## universities
+au

## modules
+AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Lipid Metabolism > Synthesis of fatty acids

## exam_signal
src_01ab4268402d32d4d111 | dept_bank | | p47 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p51 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p52 | MED 102

## field_notes
universityNotes: Tested three times — the key enzyme of fatty-acid synthesis, acetyl-CoA carboxylase (Q23, restated Q60); and the true statement about de novo fatty-acid synthesis, that it requires the intermediate malonyl-CoA, against false options on chain length and cellular location (Q31, the pathway runs in the cytosol, not the mitochondria).

---

# Item

## id
CON-FND-1C668119B3C0BB

## label
Insulin and the anti-insulin hormones pull one switch in opposite directions: the phosphorylation state of hormone-sensitive lipase and of acetyl-CoA carboxylase

## universities
+au

## modules
+AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Lipid Metabolism > Regulation of lipolysis and lipogenesis

## exam_signal
src_01ab4268402d32d4d111 | dept_bank | | p47 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p48 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p50 | MED 102

## field_notes
universityNotes: Tested three times — lipolysis's own defining feature, requiring hormone-sensitive lipase (against insulin stimulating it, which is backwards) (Q30); the key enzyme of lipolysis, hormone-sensitive lipase (Q34); and which hormone does NOT increase hormone-sensitive lipase activity in adipose tissue, insulin, since insulin opposes lipolysis (Q50).

---

# Item

## id
CON-FND-4C05D459E80AEF

## label
Fatty acid oxidation reduces FAD and NAD+, fatty acid synthesis spends NADPH, and keeping the two currencies apart is what lets both run in one cell

## universities
+au

## modules
+AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Lipid Metabolism > Cofactors of lipid metabolism

## exam_signal
src_01ab4268402d32d4d111 | dept_bank | | p43 | MED 102
src_01ab4268402d32d4d111 | dept_bank | | p53 | MED 102

## field_notes
universityNotes: Tested twice — which coenzyme is NOT used in fatty-acid oxidation, NADP (oxidation uses NAD+ and FAD, never NADP/NADPH) (Q43); and the reducing agent lipogenesis needs, NADPH, the opposite currency from oxidation (Q68).
