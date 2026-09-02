<!--
HU-COLLISION-RESTORE-2026-09-02 -- Helwan ID-collision audit prod restore batch

Restores the 87 concept ids docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md
found reused by Helwan's HU-LCS-103-family163-*-author.mjs / HU-BMS-102-*
concept batches, in case any of Helwan's 93 guarded imports (already live as
Draft, per docs/Helwan-Source-Imports/CLAUDE-HANDOVER.md) applied the ORIGINAL
bare full-record rows before the collision-fix1 source correction landed.

DO NOT APPLY BLIND. Every row here restates only the id and the correct
label (this repair lane's best-available source-of-truth: the newest
non-Helwan *-Source-Imports markdown record, or the live concept-graph
fixture when no current markdown record exists) plus Helwan's own +hu /
+<year> / +<module> tags as an APPEND, never a replace. canonical_key is
deliberately left blank on every row -- Kasr's markdown occasionally renames
a canonical_key after the id was minted (report-duplicate-keys.ts's #3 pass
finds 9 such pre-existing, unrelated cases), so restating one here risks
asserting a key mismatch against whatever the live-imported value actually
is. No other field is set: this batch must never re-introduce the eviction
risk it exists to undo.

Required before running this batch: a synapsedb tunnel read-back
(synapse-concept-graph-v2) for these 87 ids, to confirm which ones actually
lost universityIds/learnerYears/moduleIds or had their label overwritten --
this audit was run against the stale 2026-08-12 fixture and the current
*-Source-Imports markdown trees, never against a live DB read. A row whose
live state was never actually touched is a harmless no-op append; do not
skip the read-back on that assumption alone.

dry-run first: node scripts/apply-content-import-to-db.mjs <this file>
(no --commit) -- then --commit only on Omar's explicit instruction, per
LANE-CARD.md's "nothing changes from Draft without Omar's direct
instruction."
-->

# Item

## label
An antimicrobial chemotherapeutic agent is a chemically synthesized substance that kills or inhibits microorganisms to treat infection

## id
CON-INF-25871D95E4E1D3

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). One of the 22 reworded-but-same-fact hits: restores Kasr's original label over Helwan's rewording. See the fix report's needs-merge list for whether Helwan's wording carried a fact worth folding back in by hand.

---

# Item

## label
Antibiotics are low-molecular-weight antimicrobial secondary metabolites originally produced by microorganisms

## id
CON-INF-ABF1EA01540430

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). One of the 22 reworded-but-same-fact hits: restores Kasr's original label over Helwan's rewording. See the fix report's needs-merge list for whether Helwan's wording carried a fact worth folding back in by hand.

---

# Item

## label
A bacteriostatic agent reversibly inhibits bacterial multiplication

## id
CON-INF-4E8ECDA3106CD7

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). One of the 22 reworded-but-same-fact hits: restores Kasr's original label over Helwan's rewording. See the fix report's needs-merge list for whether Helwan's wording carried a fact worth folding back in by hand.

---

# Item

## label
Bacterial ribosomes are 70S and carry out protein synthesis

## id
CON-INF-29351FD540E214

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). One of the 22 reworded-but-same-fact hits: restores Kasr's original label over Helwan's rewording. See the fix report's needs-merge list for whether Helwan's wording carried a fact worth folding back in by hand.

---

# Item

## label
Sulfonamides are bacteriostatic because they are structural analogues of PABA and competitively inhibit the bacterial enzyme that builds folic acid from it

## id
CON-INF-5A15540CA80809

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). One of the 22 reworded-but-same-fact hits: restores Kasr's original label over Helwan's rewording. See the fix report's needs-merge list for whether Helwan's wording carried a fact worth folding back in by hand.

---

# Item

## label
Beta-lactamase causes antibiotic resistance by inactivating the beta-lactam drug

## id
CON-INF-64A7823DCEC6E5

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). One of the 22 reworded-but-same-fact hits: restores Kasr's original label over Helwan's rewording. See the fix report's needs-merge list for whether Helwan's wording carried a fact worth folding back in by hand.

---

# Item

## label
Development of an alternative metabolic pathway confers resistance to sulfonamides

## id
CON-INF-39978E6864743D

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). One of the 22 reworded-but-same-fact hits: restores Kasr's original label over Helwan's rewording. See the fix report's needs-merge list for whether Helwan's wording carried a fact worth folding back in by hand.

---

# Item

## label
Altered drug permeability confers resistance to tetracycline and amikacin

## id
CON-INF-DFC3D949513ED2

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). One of the 22 reworded-but-same-fact hits: restores Kasr's original label over Helwan's rewording. See the fix report's needs-merge list for whether Helwan's wording carried a fact worth folding back in by hand.

---

# Item

## label
Penicillin resistance by S. aureus is acquired genetic resistance; Mycoplasma resistance to cell-wall antibiotics is intrinsic

## id
CON-INF-DCD82D2A1D396C

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). One of the 22 reworded-but-same-fact hits: restores Kasr's original label over Helwan's rewording. See the fix report's needs-merge list for whether Helwan's wording carried a fact worth folding back in by hand.

---

# Item

## label
R-plasmids carry genes for bacterial antibiotic resistance

## id
CON-INF-134BE2C9B827D5

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). One of the 22 reworded-but-same-fact hits: restores Kasr's original label over Helwan's rewording. See the fix report's needs-merge list for whether Helwan's wording carried a fact worth folding back in by hand.

---

# Item

## label
Transposons are mobile 'jumping genes' able to relocate within or between DNA molecules

## id
CON-INF-D6A264E108B348

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). One of the 22 reworded-but-same-fact hits: restores Kasr's original label over Helwan's rewording. See the fix report's needs-merge list for whether Helwan's wording carried a fact worth folding back in by hand.

---

# Item

## label
Antibiotic eradication of susceptible normal flora can permit resistant organisms to cause superinfection

## id
CON-INF-86D082D1785D7A

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). One of the 22 reworded-but-same-fact hits: restores Kasr's original label over Helwan's rewording. See the fix report's needs-merge list for whether Helwan's wording carried a fact worth folding back in by hand.

---

# Item

## label
Two drugs together may summate, synergise, potentiate or reverse each other, and the four are not interchangeable words

## id
CON-FND-CE72B2E63A736B

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). One of the 22 reworded-but-same-fact hits: restores Kasr's original label over Helwan's rewording. See the fix report's needs-merge list for whether Helwan's wording carried a fact worth folding back in by hand.

---

# Item

## label
Addition means combined action equals the sum of each antimicrobial action

## id
CON-INF-EAF4C14131FA44

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
Adaptation takes four forms: hypertrophy, hyperplasia, atrophy and metaplasia

## id
CON-FND-DF726F864C8BC3

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). One of the 22 reworded-but-same-fact hits: restores Kasr's original label over Helwan's rewording. See the fix report's needs-merge list for whether Helwan's wording carried a fact worth folding back in by hand.

---

# Item

## label
Necrosis and apoptosis differ in cell size, membrane integrity and inflammation

## id
CON-FND-2CDE9A5C884133

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). One of the 22 reworded-but-same-fact hits: restores Kasr's original label over Helwan's rewording. See the fix report's needs-merge list for whether Helwan's wording carried a fact worth folding back in by hand.

---

# Item

## label
The neutrophil carries two granule populations and is the first line of non-specific defence

## id
CON-HEM-3899015C5024C0

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). One of the 22 reworded-but-same-fact hits: restores Kasr's original label over Helwan's rewording. See the fix report's needs-merge list for whether Helwan's wording carried a fact worth folding back in by hand.

---

# Item

## label
Basophil and mast-cell granules contain mediators such as histamine

## id
CON-IMM-075EC1A6A3022D

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). One of the 22 reworded-but-same-fact hits: restores Kasr's original label over Helwan's rewording. See the fix report's needs-merge list for whether Helwan's wording carried a fact worth folding back in by hand.

---

# Item

## label
Coagulative necrosis keeps the cell outline because denaturation outruns autolysis

## id
CON-FND-5285A9707E61CA

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
The two calcifications look identical; only the serum calcium tells them apart

## id
CON-FND-718662116D90C4

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). One of the 22 reworded-but-same-fact hits: restores Kasr's original label over Helwan's rewording. See the fix report's needs-merge list for whether Helwan's wording carried a fact worth folding back in by hand.

---

# Item

## label
Congo red under polarised light gives amyloid its apple-green birefringence

## id
CON-FND-4867DD3814D088

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). One of the 22 reworded-but-same-fact hits: restores Kasr's original label over Helwan's rewording. See the fix report's needs-merge list for whether Helwan's wording carried a fact worth folding back in by hand.

---

# Item

## label
Caseation necrosis is the cheese-like necrosis of tuberculosis

## id
CON-FND-5B3B6BA12670C7

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
Venous thrombosis follows Virchow triad

## id
CON-CVS-1DBCD5D81337B5

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
Paraffin is the most common processing technique, celloidin the most perfect and freezing the most rapid, and each buys its advantage at a stated cost

## id
CON-FND-9F0CCA2BFB5C7B

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
Hypoxia is the commonest cause of cell injury, and it reaches the cell three ways

## id
CON-FND-8989A49BEBCF14

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
ASU hyperplasia increases organ size by increasing cell number

## id
CON-FND-022049C93C4CD0

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
Metaplasia replaces one epithelium with another, and the cost is whatever the original one did — cilia in the smoker's bronchus, distensibility in the bilharzial bladder

## id
CON-FND-5AD09BF9FC2420

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
The fatty liver is enlarged, yellow and greasy, with signet-ring hepatocytes

## id
CON-FND-70554B38361679

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
Dystrophic calcification is calcium laid down in already damaged tissue at a normal serum calcium

## id
CON-FND-33466CEBFC4EBA

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
Hyaline change names a glassy pink appearance, not a single substance

## id
CON-FND-5CB8B822A9A6AF

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
Amyloid is extracellular beta-pleated protein deposited on basement membranes and vessel walls

## id
CON-FND-D955408D228002

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
Metastatic calcification is calcium laid down in living tissue because the blood level is high

## id
CON-FND-87392C49DB246C

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
Primary haemochromatosis is a chromosome-6 defect that loads the body with iron

## id
CON-FND-B9A3C8B28B1443

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
Chronic gout deposits urate tophi in soft tissues and joints and can cause urinary urate stones

## id
CON-REN-31708150F8B722

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
Melanin is made by tyrosinase, and five named conditions increase it

## id
CON-FND-AA9A76DBB4EE6B

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
Liquefactive necrosis turns the dead tissue to fluid, in the brain and in pus

## id
CON-FND-88508ABAB84A67

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
Fat necrosis is traumatic or enzymatic, and the enzymatic form makes chalky calcium soaps

## id
CON-FND-6626C19B61A23B

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
Systemic amyloidosis is primary, secondary or senile, and each has its own protein

## id
CON-FND-E3F496F6DDD7C3

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
An atrial septal defect allows a venous clot to reach the systemic circulation

## id
CON-CVS-B5692258332FC3

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
The mast cell stores heparin and histamine and releases them when allergen binds its IgE — which is what an anaphylactic reaction is

## id
CON-FND-7D406E91EA3BF2

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
Bacteremia as low-dose or low-virulence organisms in blood

## id
CON-INF-58732B86935585

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
Both immune responses start with a macrophage presenting antigen to a helper T cell

## id
CON-HEM-681584C9DC1F94

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
The reticulo-endothelial system is the body's tissue-macrophage network, and its defence is phagocytosis

## id
CON-HEM-157B01DD5EAEB6

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
An opsonin is a molecule that facilitates phagocytosis

## id
CON-IMM-DA2EA4EC41707C

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
Haemosiderin is stored excess iron, deposited locally after bleeding or throughout the body in overload

## id
CON-FND-5DBC795B58DC74

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
The liver is the main site of drug metabolism, but the gut wall, plasma, lung and kidney all metabolise drugs too

## id
CON-FND-C3B843D7032C7F

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
Most drugs cross cell membranes by passive diffusion, which favours the small, lipid-soluble, non-ionised molecule

## id
CON-FND-584FCF6897C35E

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
Bioavailability is the fraction of an oral dose that reaches the systemic circulation, and first-pass metabolism is what removes the rest

## id
CON-FND-CF40F32A8A74A0

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
Autonomic fibres are named for the transmitter they release: cholinergic fibres are every preganglionic fibre, every postganglionic parasympathetic fibre and two sympathetic exceptions, and adrenergic fibres are all the remaining postganglionic sympathetic ones, which secrete noradrenaline

## id
CON-NEU-1DB903AAE3D02A

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
Ion trapping: a drug that ionises in a compartment cannot leave it, which is why urine pH is manipulated in overdose

## id
CON-FND-97E55D75DE9ED1

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
The blood-brain barrier, the placenta and breast milk each let only some drugs through, and each has a clinical consequence

## id
CON-FND-3CECD012838275

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
Beta-1 stimulation by adrenaline increases contractility, rate, conduction, and excitability

## id
CON-REN-E518604E062D82

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
Pharmacokinetics is what the body does to the drug; pharmacodynamics is what the drug does to the body

## id
CON-FND-6BB35F11EBD54B

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
Apparent volume of distribution

## id
CON-FND-CBA2A73AE9A6D8

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-BMS-102

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
The whole muscle's contraction is graded by recruiting more motor units and by raising stimulation frequency toward tetanus, and Treppe raises twitch tension over the first few stimuli of a rested muscle

## id
CON-MSK-C14F65CD68F720

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-LCS-103

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
Bone matrix is 35% organic type I collagen and ground substance and 65% inorganic calcium salts that harden it

## id
CON-MSK-89674D65B2316B

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-LCS-103

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). One of the 22 reworded-but-same-fact hits: restores Kasr's original label over Helwan's rewording. See the fix report's needs-merge list for whether Helwan's wording carried a fact worth folding back in by hand.

---

# Item

## label
Fibrosarcoma spindle cells form fascicles with a herringbone pattern

## id
CON-DER-78AF0815FE7330

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-LCS-103

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). One of the 22 reworded-but-same-fact hits: restores Kasr's original label over Helwan's rewording. See the fix report's needs-merge list for whether Helwan's wording carried a fact worth folding back in by hand.

---

# Item

## label
The intervertebral disc has an outer annulus fibrosus of white fibrocartilage around an inner jelly-like nucleus pulposus, and herniation of the nucleus compresses nerve roots

## id
CON-MSK-9C7E37FE296254

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-LCS-103

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). One of the 22 reworded-but-same-fact hits: restores Kasr's original label over Helwan's rewording. See the fix report's needs-merge list for whether Helwan's wording carried a fact worth folding back in by hand.

---

# Item

## label
Cancer, leukemia, and psoriasis can cause secondary metabolic gout through increased purine catabolism

## id
CON-REN-B9E0531973510E

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-LCS-103

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Genuine collision: this id is Kasr's gout-etiology concept; Helwan's own crystal/lab-value fact now lives at CON-MSK-B37643A373463E instead. Restores label only; no other field is set.

---

# Item

## label
Carpal tunnel syndrome is the median nerve compressed under the flexor retinaculum

## id
CON-MSK-9B52018C4649BD

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-LCS-103

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
The intercalated disc has a transverse component carrying desmosomes and fascia adherens and a lateral component carrying gap junctions

## id
CON-MSK-0DEAF126DF8F2E

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-LCS-103

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
Purkinje fibres are larger, pale and vacuolated cardiac muscle fibres in the moderator band that conduct via gap junctions without intercalated discs

## id
CON-MSK-5EA95D36121EF8

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-LCS-103

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
Smooth muscle has caveolae instead of T-tubules and dense bodies instead of Z lines, and its irregular myofilaments leave it unstriated

## id
CON-MSK-888DFA3AA4E974

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-LCS-103

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
A T tubule between two terminal SR cisternae forms a triad

## id
CON-MSK-BD54A250111D42

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-LCS-103

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
The sarcomere, the segment between two Z lines, is the functional contractile unit of striated muscle

## id
CON-MSK-0824FE988ADA00

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-LCS-103

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
Excitation–contraction coupling relays a T-tubule depolarisation into calcium release, calcium onto troponin C, and tropomyosin off the actin site

## id
CON-MSK-3013AA61E917B7

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-LCS-103

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
Skeletal, cardiac and smooth muscle differ across site, size, fibre composition, shape, branching, sarcolemma, striation, nuclei, sarcomeres, tubular system, cell junctions, regeneration, action and innervation

## id
CON-MSK-B080975D6171CF

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-LCS-103

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
Muscle fatigue weakens and prolongs contraction and leaves relaxation incomplete, from lactic acid, ATP/glycogen/creatine phosphate depletion, impaired neuromuscular transmission and interrupted blood flow

## id
CON-MSK-2E4061334D52EA

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-LCS-103

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
Smooth muscle contraction is triggered by calcium binding calmodulin to activate myosin light-chain kinase, and cross-bridges that stay attached without cycling — latch bridges — hold tone cheaply

## id
CON-MSK-CF9EFE4EA3C90B

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-LCS-103

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
Skeletal muscle is over four hundred voluntary muscles attached to bone, and contraction that depends on nerve supply serves four functions

## id
CON-MSK-43CD79301071ED

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-LCS-103

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
Skeletal muscle hypertrophy enlarges existing fibres, muscular dystrophy is satellite-cell failure from dystrophin loss, and cramps follow reduced blood flow or low potassium

## id
CON-MSK-9D01E2358A65E2

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-LCS-103

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
A skeletal muscle fibre is a long, multinucleated, striated cell whose sarcoplasm holds myofibrils, sarcoplasmic reticulum and myoglobin

## id
CON-MSK-2493DDAE4798CE

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-LCS-103

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
Myosin has two heavy chains forming flexible cross-bridge heads, and actin's active site is covered at rest by tropomyosin held in place by the three troponin subunits

## id
CON-MSK-287D88DF2F6B8C

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-LCS-103

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
In isometric contraction the muscle's length is held fixed while tension rises; in isotonic contraction tension is held fixed once threshold is reached and the muscle shortens

## id
CON-MSK-87D5C5A48AB5D9

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-LCS-103

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
A muscle twitch is a single, brief contraction and relaxation cycle produced by one action potential, starting about 2 msec after depolarisation

## id
CON-MSK-242998842BE25C

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-LCS-103

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
Bone stores minerals, chiefly calcium

## id
CON-MSK-E4DACFB968DA4D

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-LCS-103

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
A long bone lengthens at its epiphyseal plates and widens from the periosteum, and the end that ossifies later is the growing end

## id
CON-MSK-C30E73A5353ABB

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-LCS-103

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
Fracture healing runs haematoma, then a soft (fibrocartilaginous) callus, then a hard (bony) callus, then remodelling to the original shape

## id
CON-MSK-D95C0801FF59F3

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-LCS-103

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
PTH and decreased phosphate activate proximal-tubular 1-alpha-hydroxylase to form 1,25-dihydroxyvitamin D3

## id
CON-END-1DE2C490ABBA64

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-LCS-103

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
Bone forms by one of two methods, intramembranous or intracartilaginous ossification, and its remodelling is hormonally balanced

## id
CON-MSK-092F6F14307DB9

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-LCS-103

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
A fall in plasma ionized calcium stimulates PTH secretion

## id
CON-END-86BD08DD559197

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-LCS-103

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
Skeletal muscle develops maximal isometric tension at a sarcomere length of about 2.2 micrometres, where thick and thin filament overlap is optimal

## id
CON-MSK-01E9132FDDF9F2

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-LCS-103

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
Rigor mortis is the total, permanent contracture of every muscle after death from loss of the ATP needed to separate actin and myosin, and it is used to help estimate time of death

## id
CON-MSK-6087C9C091ED85

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-LCS-103

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
A cross-bridge cannot detach without a fresh ATP, and without ATP the muscle goes into contracture

## id
CON-MSK-AC42FE7AB41DF2

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-LCS-103

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
Skeletal muscle's own action potential resembles the nerve's but finishes before contraction starts, which is why the fibre can be tetanised

## id
CON-MSK-3B9143FBE075E4

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-LCS-103

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
Neuromuscular transmission runs presynaptic calcium, acetylcholine exocytosis, a cation channel on the end plate, the end-plate potential, then hydrolysis by acetylcholinesterase

## id
CON-MSK-77D955AAB4D0FA

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-LCS-103

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.

---

# Item

## label
Neuromuscular transmission is one-directional, carries a fixed synaptic delay, fatigues with repeated use, and is shaped by Ca2+/Mg2+ and by three classes of drug

## id
CON-NEU-64B329335E9489

## canonical_key

## universities
+hu

## learner_years
+1

## modules
+HU-LCS-103

## field_notes
Restore row for the Helwan ID-collision audit (docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md). Restores universityIds/learnerYears/moduleIds tagging only; the label already matched.
