<!--
  O6U-IPH-108 -- pending-live sparse CONCEPT overlay, three hits from Kasr
  108-INT-concepts-pharmacology.md, reused per 00-START-HERE.md §3/§4
  (search-before-mint). "pending" is LIVE in Kasr's own production import
  queue, ahead of this checkout's local server/data/medical-library-v1.json
  snapshot (confirmed absent from live by direct grep) -- find-existing.mjs
  and medical:simulate see these three only in Kasr's own unimported batch
  file named below. Apply this file ONLY after the named source concept file
  is live.

  Search covered find-existing.mjs on "route of administration", "oral route
  absorption", "sublingual route", "first pass metabolism", "intravenous
  route advantages", "intramuscular injection", "subcutaneous injection",
  "transdermal patch", "nasal drug administration", "alkaloid", "glycoside",
  "resin drug", "volatile oil", "narcotic prescription", "eye drop shelf
  life", "atropine sulfate solubility", "dry powder inhaler", "topical
  dosage form", "depot preparation" -- plus a direct grep of Kasr
  108-INT-concepts-pharmacology.md (the dispatch's named likely-overlap
  module) for "sublingual", "subcutaneous", "intramuscular", "nasal",
  "inhaler", "MDI", "alkaloid", "glycoside", "liniment", "ointment",
  "transdermal". Three genuine hits found, all in that one 108-INT file's
  "Routes of Drug Administration" section; no hit anywhere for the other
  eleven new concepts this cluster mints (IV/IM/SC/transdermal/nasal-route
  specifics, dosage-form terminology, inhaler devices, alkaloids, plant drug
  classes, astringents, narcotic prescriptions, eye drop storage, salt-form
  solubility, local-vs-systemic action) -- 108-INT's routes coverage is a
  higher-level pharmacokinetic classification, not the practical-pharmacy
  specifics this cluster's source tests.

  Source file:
    A. docs/Kasr-Source-Imports/concept/108-INT-concepts-pharmacology.md -- university kau, module 108 INT (Year 1)

  Simulate together with the source file:
  npm run medical:simulate -- docs/6October-Source-Imports/pending-live/O6U-IPH-108-overlay-concepts.md \
    --with docs/Kasr-Source-Imports/concept/108-INT-concepts-pharmacology.md \
    --emit /tmp/sim-O6U-IPH-108-pending-concepts.json
-->

# Item

## id
CON-FND-6A60CE8D2E7C5C

## label
Routes of administration divide into enteral, parenteral and topical, and the route chosen is a kinetic decision before it is a practical one

## universities
+o6u

## learner_years
+1

## modules
+O6U-IPH-108

## module_subject
O6U-IPH-108 > Practical Pharmacology > Routes of Drug Administration > Enteral/parenteral/topical classification
108 INT > Pharmacology > Routes of Drug Administration and Dosage Forms

## field_notes
o6u: Reused for the practical bank's Q32 ("Parenteral administration ... The correct
answer is: Usually produces a more rapid response than oral administration") -- the general
enteral/parenteral/topical classification and its onset-speed prediction is exactly this
concept's own explicit_objective. Sourced from "all Practical pharma questions
_compressed.pdf" (coverage/O6U-IPH-108-triage.md).

---

# Item

## id
CON-FND-3CC8853A7D6DA8

## label
The oral route is the safest and most convenient, and its price is the first pass, slow onset and dependence on a co-operative gut

## universities
+o6u

## learner_years
+1

## modules
+O6U-IPH-108

## module_subject
O6U-IPH-108 > Practical Pharmacology > Routes of Drug Administration > Oral route
108 INT > Pharmacology > Routes of Drug Administration and Dosage Forms > Oral and first-pass

## field_notes
o6u: Reused for the practical bank's Q19 ("What is characteristic of the oral route? ...
The correct answer is: Absorption depends on GI tract secretion and motor function") --
this concept's own definition already covers the oral route's dependence on gut
co-operation. Sourced from "all Practical pharma questions _compressed.pdf"
(coverage/O6U-IPH-108-triage.md).

---

# Item

## id
CON-FND-CF40F32A8A74A0

## label
Bioavailability is the fraction of an oral dose that reaches the systemic circulation, and first-pass metabolism is what removes the rest

## universities
+o6u

## learner_years
+1

## modules
+O6U-IPH-108

## module_subject
O6U-IPH-108 > Practical Pharmacology > Routes of Drug Administration > Sublingual route escapes first-pass
108 INT > Pharmacology > Bioavailability and First-Pass Metabolism

## field_notes
o6u: Reused for the practical bank's Q21 ("The main reason for administering nitroglycerin
in angina pectoris by sublingual route is ... The correct answer is: To avoid first pass
metabolism"), which is this concept's own core distinction. Sourced from "all Practical
pharma questions _compressed.pdf" (coverage/O6U-IPH-108-triage.md).

---

<!--
  Lane 2 (o6u-iph108-author2, cluster "pharmabank") additions below -- one hit
  from Kasr 208-INT-concepts.md, eight hits from Assiut AUN-MPT-104-concepts.md,
  and one hit from Mansoura MANS-PPPM-concepts.md, all reused per 00-START-HERE.md
  §3/§4 (search-before-mint). All three source files are "pending" -- each
  module's own not-yet-imported batch, confirmed absent from this checkout's
  local server/data/medical-library-v1.json snapshot by direct grep of all ten
  ids together (0 hits). Apply each block ONLY after its own named source
  concept file is live.

  Search covered find-existing.mjs on "atropine", "physostigmine",
  "neostigmine", "pilocarpine", "echothiophate", "muscarinic receptor",
  "cholinesterase inhibitor", "anticholinergic", "pancuronium", "hyoscine",
  "scopolamine", "cholinomimetic", "quaternary ammonium", "hair tonic",
  "postoperative paralytic ileus", "narrow angle glaucoma", "pre-anesthetic
  medication" -- plus a direct grep of Kasr 108-INT/208-INT/102-INT, Assiut
  AUN-MPT-104, Mansoura MANS-PPPM, MUST CVS-201 and Alexandria 106 concept
  files (the dispatch's own named likely-overlap general-pharmacology
  modules) and a full read of every candidate hit's own concept body before
  reuse. Ten genuine, fact-level hits found across the three files below; no
  hit anywhere for this cluster's other thirty-two questions, which mint nine
  new concepts instead (see concept/O6U-IPH-108-pharmabank-concepts.md).

  Source files:
    B. docs/Kasr-Source-Imports/concept/208-INT-concepts.md -- university kau, module 208 INT (Year 2)
    C. docs/Assiut-Source-Imports/concept/AUN-MPT-104-concepts.md -- university aun, module AUN-MPT-104 (Year 1)
    D. docs/Mansoura-Source-Imports/concept/MANS-PPPM-concepts.md -- university mans, module MANS-PPPM (Year 1)

  Simulate together with each source file separately:
  npm run medical:simulate -- docs/6October-Source-Imports/pending-live/O6U-IPH-108-overlay-concepts.md \
    --with docs/Kasr-Source-Imports/concept/208-INT-concepts.md \
    --emit /tmp/sim-O6U-IPH-108-pending-concepts-208int.json
  npm run medical:simulate -- docs/6October-Source-Imports/pending-live/O6U-IPH-108-overlay-concepts.md \
    --with docs/Assiut-Source-Imports/concept/AUN-MPT-104-concepts.md \
    --emit /tmp/sim-O6U-IPH-108-pending-concepts-aunmpt104.json
  npm run medical:simulate -- docs/6October-Source-Imports/pending-live/O6U-IPH-108-overlay-concepts.md \
    --with docs/Mansoura-Source-Imports/concept/MANS-PPPM-concepts.md \
    --emit /tmp/sim-O6U-IPH-108-pending-concepts-manspppm.json
-->

# Item

## id
CON-FND-F9E1875546E70D

## label
M2 muscarinic receptors are Gi-coupled and decrease intracellular cAMP, slowing heart rate

## universities
+o6u

## learner_years
+1

## modules
+O6U-IPH-108

## module_subject
O6U-IPH-108 > Autonomic Pharmacology > Muscarinic Receptor Subtypes > M2 receptor location
208 INT > Chapter 10 Pharmacology > Autonomic Nervous System > Receptor Signal Transduction

## field_notes
o6u: Reused for the pharmabank cluster's Q1 (p14, "Indicate the location of M2
cholinoreceptor type: ... Heart") -- this concept's own label/definition already state that
M2 is located in the heart and is Gi/cAMP-coupled. Sourced from "pharma MCQs bank .pdf"
(coverage/O6U-IPH-108-triage.md).

---

# Item

## id
CON-FND-6B410DA4B612B9

## label
Acetylcholine is unsuitable for clinical use because it lacks receptor selectivity and is hydrolysed almost instantly, so the doses required for a therapeutic effect are impractically high

## universities
+o6u

## learner_years
+1

## modules
+O6U-IPH-108

## module_subject
O6U-IPH-108 > Autonomic Pharmacology > Cholinergic Neurotransmission > Why acetylcholine is not used clinically
AUN-MPT-104 > Parasympathetic nervous system (Agonists) 1 > Direct-acting cholinomimetics

## field_notes
o6u: Reused for the pharmabank cluster's Q2 (p28, "Acetylcholine is nearly not used in
clinical practice because: ... It is very rapidly hydrolyzed") -- this concept's own
definition already states the rapid-hydrolysis reasoning. Sourced from "pharma MCQs bank
.pdf" (coverage/O6U-IPH-108-triage.md).

---

# Item

## id
CON-FND-7044CBD216CDEC

## label
A direct-acting muscarinic agonist (carbachol) can act at non-innervated muscarinic receptors and cause hypotension on overdose; an indirect-acting acetylcholinesterase inhibitor (neostigmine) instead potentiates nicotinic transmission at the neuromuscular junction, affecting skeletal muscle and producing a cholinergic crisis the direct agonist does not

## universities
+o6u

## learner_years
+1

## modules
+O6U-IPH-108

## module_subject
O6U-IPH-108 > Autonomic Pharmacology > Cholinesterase Inhibitors > Neostigmine at the neuromuscular junction
AUN-MPT-104 > Parasympathetic nervous system (Agonists) 2 > Direct vs indirect-acting cholinomimetics

## field_notes
o6u: Reused for the pharmabank cluster's Q5 (p46, "Neostigmine: ... has an effect on
skeletal muscle greater than that of physostigmine") -- this concept's own original_wording
already documents "Neostigmine differs from pilocarpine in having effects on skeletal
muscle"; this item extends the same underlying indirect-acting/NMJ-potentiation fact to a
neostigmine-versus-physostigmine comparison rather than neostigmine-versus-pilocarpine.
Sourced from "pharma MCQs bank .pdf" (coverage/O6U-IPH-108-triage.md).

---

# Item

## id
CON-FND-1E1CDB94DF60D6

## label
Physostigmine, a centrally-acting cholinesterase inhibitor, reverses the anticholinergic toxidrome

## universities
+o6u

## learner_years
+1

## modules
+O6U-IPH-108

## module_subject
O6U-IPH-108 > Autonomic Pharmacology > Cholinesterase Inhibitors > Physostigmine as antidote
AUN-MPT-104 > Parasympathetic nervous system (Antagonists) > Anticholinergic toxidrome and reversal

## field_notes
o6u: Reused for the pharmabank cluster's Q8 (p50, "Physostigmine it is the preferred drug
for treatment of ... atropine toxicity", printed explanation: "Physostigmine is a tertiary
amine that can penetrate the blood brain barrier. It can antagonize both the peripheral and
CNS effects of atropine.") -- this concept's own definition already states physostigmine's
central penetration and antidote role. Sourced from "pharma MCQs bank .pdf"
(coverage/O6U-IPH-108-triage.md).

---

# Item

## id
CON-FND-C95C991F4315CC

## label
Echothiophate is an irreversible, organophosphate-type acetylcholinesterase inhibitor used topically for glaucoma

## universities
+o6u

## learner_years
+1

## modules
+O6U-IPH-108

## module_subject
O6U-IPH-108 > Autonomic Pharmacology > Cholinesterase Inhibitors > Echothiophate
AUN-MPT-104 > Parasympathetic nervous system (Agonists) 2 > Cholinesterase inhibitors -- reversible vs irreversible

## field_notes
o6u: Reused for the pharmabank cluster's Q13 (p55, "The only cholinomimetic that can
antagonize atropine after fundus examination is: ... Ecothiophate") -- this item extends the
same drug/mechanism (irreversible, CNS-excluded anticholinesterase used topically at the
eye) to its fundus-exam-antagonism indication, not just glaucoma. Sourced from "pharma MCQs
bank .pdf" (coverage/O6U-IPH-108-triage.md).

---

# Item

## id
CON-FND-A1A577616D7186

## label
Bethanechol is a direct-acting, acetylcholinesterase-resistant muscarinic agonist used to restore GI and bladder motility after surgery, and for non-obstructive urinary retention

## universities
+o6u

## learner_years
+1

## modules
+O6U-IPH-108

## module_subject
O6U-IPH-108 > Autonomic Pharmacology > Direct-acting Cholinomimetics > Bethanechol
AUN-MPT-104 > Parasympathetic nervous system (Agonists) 1 > Direct-acting cholinomimetics

## field_notes
o6u: Reused for the pharmabank cluster's Q16 (p58, "Which of the following cholinomimetics
Is suitable for megacolon ... Bethanicol") and Q19 (p61, "Which of the following Is not a
contraindication of cholinergic agonists: ... Atonic urinary retention") -- this item
extends the same bethanechol concept to its megacolon indication and to the
contraindication-versus-indication clarification for atonic urinary retention, alongside the
postop-ileus/urinary-retention indications the source concept already documents. Sourced
from "pharma MCQs bank .pdf" (coverage/O6U-IPH-108-triage.md).

---

# Item

## id
CON-FND-5530C30545ED40

## label
M3 muscarinic receptors are Gq-coupled, signalling through IP3/DAG to raise intracellular calcium -- distinct from the Gi-coupled M2 receptor

## universities
+o6u

## learner_years
+1

## modules
+O6U-IPH-108

## module_subject
O6U-IPH-108 > Autonomic Pharmacology > Muscarinic Receptor Subtypes > M3 signal transduction
AUN-MPT-104 > Introduction to Autonomic Nervous System > Muscarinic receptor subtypes and signal transduction

## field_notes
o6u: Reused for the pharmabank cluster's Q21 (p72, "Antimuscarinic drugs induce ...
Decreased DAG in salivary gland") -- this concept's own original_wording already documents
this exact fact ("Which of the following is an expected effect of a therapeutic dose of a
drug that blocks muscarinic-3 receptors? ... Decreased DAG in salivary gland tissue").
Sourced from "pharma MCQs bank .pdf" (coverage/O6U-IPH-108-triage.md).

---

# Item

## id
CON-FND-7F6FE263FBC1C0

## label
Muscarinic antagonists are useful as a cholinergic antidote, for eye exams and motion sickness, but contraindicated in narrow-angle glaucoma

## universities
+o6u

## learner_years
+1

## modules
+O6U-IPH-108

## module_subject
O6U-IPH-108 > Autonomic Pharmacology > Antimuscarinic Drugs > Uses and contraindications
AUN-MPT-104 > Parasympathetic nervous system (Antagonists) > Antimuscarinic contraindications and uses

## field_notes
o6u: Reused for the pharmabank cluster's Q22 (p73, "Anti-muscarinics are used in the
treatment of the following disorders EXCEPT: ... Glaucoma") -- this concept's own
original_wording already documents this exact fact ("Muscarinic antagonists are useful for
all of the following EXCEPT: ... Treatment of narrow angle glaucoma"). Sourced from "pharma
MCQs bank .pdf" (coverage/O6U-IPH-108-triage.md).

---

# Item

## id
CON-FND-ECECFC8B855144

## label
Neostigmine, an indirect-acting cholinesterase inhibitor, raises acetylcholine at gut muscarinic receptors and is used to increase GIT motility in postoperative paralytic ileus

## universities
+o6u

## learner_years
+1

## modules
+O6U-IPH-108

## module_subject
O6U-IPH-108 > Autonomic Pharmacology > Cholinesterase Inhibitors > Neostigmine and GIT motility
MANS-PPPM > Pharmacology > Autonomic Nervous System Pharmacology > Cholinesterase Inhibitors

## field_notes
o6u: Reused for the pharmabank cluster's Q17 (p59, "Which of the following cholinomimetics
is the most suitable for postoperative paralytic ileus? ... Neostigmine") -- this concept's
own label/definition already state this exact indication. Sourced from "pharma MCQs bank
.pdf" (coverage/O6U-IPH-108-triage.md).

---

<!--
  Lane 3 (o6u-iph108-author3, cluster "pharmabank2") additions below -- two
  further hits from Kasr 208-INT-concepts.md (source B, already listed above)
  and one further hit from Assiut AUN-MPT-104-concepts.md (source C, already
  listed above), all reused per 00-START-HERE.md §3/§4 (search-before-mint).
  Both source files are still "pending" -- confirmed absent from this
  checkout's local server/data/medical-library-v1.json snapshot by direct
  grep of all three ids together (0 hits). Apply each block ONLY after its
  own named source concept file is live.

  Search covered find-existing.mjs on "hyoscine", "scopolamine CNS",
  "ipratropium", "dobutamine", plus a direct grep of Kasr 108-INT/208-INT/
  102-INT, Assiut AUN-MPT-104, Mansoura MANS-PPPM, MUST CVS-201 and
  Alexandria 106 concept files (the dispatch's own named likely-overlap
  general-pharmacology modules) and a full read of every candidate hit's own
  concept body before reuse. Three genuine, fact-level hits found; no hit
  anywhere for this cluster's other forty-one questions, which mint eighteen
  new concepts instead (see concept/O6U-IPH-108-pharmabank2-concepts.md).

  Simulate together with each source file separately:
  npm run medical:simulate -- docs/6October-Source-Imports/pending-live/O6U-IPH-108-overlay-concepts.md \
    --with docs/Kasr-Source-Imports/concept/208-INT-concepts.md \
    --emit /tmp/sim-O6U-IPH-108-pending-concepts-208int.json
  npm run medical:simulate -- docs/6October-Source-Imports/pending-live/O6U-IPH-108-overlay-concepts.md \
    --with docs/Assiut-Source-Imports/concept/AUN-MPT-104-concepts.md \
    --emit /tmp/sim-O6U-IPH-108-pending-concepts-aunmpt104.json
-->

# Item

## id
CON-FND-8047A5BFDEE7E3

## label
Hyoscine is more markedly CNS depressant/sedating than atropine, which instead tends toward CNS stimulation and tachycardia

## universities
+o6u

## learner_years
+1

## modules
+O6U-IPH-108

## module_subject
O6U-IPH-108 > Autonomic Pharmacology > Scopolamine Profile > CNS distribution
208 INT > Chapter 10 Pharmacology > Autonomic Nervous System > Hyoscine vs atropine CNS effects

## field_notes
o6u: Reused for the pharmabank2 cluster's Q3 (p103, "Indicate the drug which is rapidly and
fully distributed into the CNS and has a greater effect than most other antimuscarinic
agents: ... Scopolamine") -- this concept's own definition already states that hyoscine
(scopolamine) crosses into the CNS more readily and extensively than atropine. Sourced from
"pharma MCQs bank .pdf" (coverage/O6U-IPH-108-triage.md).

---

# Item

## id
CON-FND-50FB4649C59276

## label
Ipratropium is the antimuscarinic bronchodilator option in COPD unresponsive to a beta2 agonist

## universities
+o6u

## learner_years
+1

## modules
+O6U-IPH-108

## module_subject
O6U-IPH-108 > Autonomic Pharmacology > Atropine as Antidote > Ipratropium in COPD
AUN-MPT-104 > Parasympathetic nervous system (Antagonists) > Ipratropium as COPD bronchodilator

## field_notes
o6u: Reused for the pharmabank2 cluster's Q16 (p116, "Which of the following agents is used
to induce broncho-dilatation by a dry powder inhaler in COPD? ... Ipratropium") -- this
concept's own label/definition already state this exact indication. Sourced from "pharma
MCQs bank .pdf" (coverage/O6U-IPH-108-triage.md).

---

# Item

## id
CON-FND-1F4B558BD69110

## label
Dobutamine's selective beta1 agonism gives it a strong inotropic, minimally chronotropic action, making it first-line for cardiogenic shock and acute decompensated heart failure

## universities
+o6u

## learner_years
+1

## modules
+O6U-IPH-108

## module_subject
O6U-IPH-108 > Sympathomimetic Pharmacology > Catecholamine Inotrope Selection > Dobutamine versus isoprenaline in heart block
208 INT > Chapter 10 Pharmacology > Autonomic Nervous System > Dobutamine mechanism

## field_notes
o6u: Reused for the pharmabank2 cluster's Q49 (p153, "Choose the incorrect statement about
Dobutamine: ... Is preferred to isoprenaline in heart block") -- this concept's own pitfall
note ("Confusing dobutamine's minimally chronotropic profile with isoproterenol's, which is
both strongly inotropic and strongly chronotropic") already documents the exact
distinction this item tests. Sourced from "pharma MCQs bank .pdf"
(coverage/O6U-IPH-108-triage.md).

---

<!--
  Lane 4 (o6u-iph108-author4, cluster "pharmabank3") additions below -- three
  further hits from Kasr 208-INT-concepts.md (source B, already listed above),
  all reused per 00-START-HERE.md §3/§4 (search-before-mint). The source file
  is still "pending" -- confirmed absent from this checkout's local
  server/data/medical-library-v1.json snapshot by direct grep of all three ids
  together (0 hits). Apply this block ONLY after 208-INT-concepts.md is live.

  Search covered find-existing.mjs on "dopamine", "clonidine", "verapamil",
  "propranolol", "atenolol", "metoprolol", "esmolol", "timolol", "pindolol",
  "carvedilol", "bisoprolol", "nadolol", "prazosin", "phentolamine",
  "phenoxybenzamine", "tamsulosin", "labetalol", "methyldopa", "reserpine",
  "ritodrine", "brimonidine", "midodrine", plus a direct grep of Kasr
  108-INT/208-INT/102-INT, Assiut AUN-MPT-104, Mansoura MANS-PPPM-concepts.md/
  concepts-2.md and MUST CVS-201 concept files (the dispatch's own named
  likely-overlap general-pharmacology modules) and a full read of every
  candidate hit's own concept body before reuse. Three genuine, fact-level
  hits found, all in Kasr 208-INT-concepts.md; no hit anywhere for this
  cluster's other forty-seven questions, which mint thirty-four new concepts
  instead (see concept/O6U-IPH-108-pharmabank3-concepts.md). Several partial-
  overlap candidates (Assiut AUN-MPT-104's own propranolol/esmolol/prazosin/
  clonidine/phentolamine/tamsulosin/labetalol/nadolol concepts; Kasr 208-INT's
  own atenolol/carvedilol/labetalol concepts; Mansoura MANS-PPPM's own
  phenoxybenzamine/tamsulosin/carvedilol/prazosin concepts) were read in full
  and rejected as reuse candidates -- each covers a genuinely different fact
  from the one this cluster's own questions test, per the same "concept's own
  definition must already state the fact" bar lanes 1-3 applied.

  Simulate together with the source file:
  npm run medical:simulate -- docs/6October-Source-Imports/pending-live/O6U-IPH-108-overlay-concepts.md \
    --with docs/Kasr-Source-Imports/concept/208-INT-concepts.md \
    --emit /tmp/sim-O6U-IPH-108-pending-concepts-208int.json
-->

# Item

## id
CON-FND-EA0D1633BF0130

## label
Dopamine's receptor selectivity is dose-dependent: D1 (renal vasodilation) at low dose, beta1 (cardiac output) at intermediate dose, alpha1 (vasoconstriction) at high dose

## universities
+o6u

## learner_years
+1

## modules
+O6U-IPH-108

## module_subject
O6U-IPH-108 > Adrenergic Agonist Pharmacology > Dopamine Dose-Dependent Receptor Selectivity
208 INT > Chapter 10 Pharmacology > Autonomic Nervous System > Adrenergic Agonists

## field_notes
o6u: Reused for the pharmabank3 cluster's Q1 (p161, "Low-dose dopamine causes renal,
mesenteric, and coronary vasodilatation through: ... D-receptors") -- this concept's own
definition already documents the low-dose D1-mediated renal vasodilation fact; this item's
mesenteric/coronary vascular-bed detail extends the same dose-dependent-selectivity teaching
rather than contradicting it. Sourced from "pharma MCQs bank .pdf"
(coverage/O6U-IPH-108-triage.md).

---

# Item

## id
CON-FND-B6D3C1F469AC58

## label
Clonidine causes severe rebound hypertension (with nervousness and tachycardia) if stopped abruptly, requiring gradual tapering

## universities
+o6u

## learner_years
+1

## modules
+O6U-IPH-108

## module_subject
O6U-IPH-108 > Adrenergic Agonist Pharmacology > Clonidine Withdrawal Syndrome
208 INT > Chapter 10 Pharmacology > Antihypertensive Drugs

## field_notes
o6u: Reused for the pharmabank3 cluster's Q6 (p166, "Sudden cessation may lead to
hypertensive crisis: ... Clonidine") -- this concept's own definition already states this
exact fact. Sourced from "pharma MCQs bank .pdf" (coverage/O6U-IPH-108-triage.md).

---

# Item

## id
CON-FND-0356010F3C10AD

## label
Verapamil's consistent heart-rate-lowering, coronary-vasodilating action makes it the calcium-channel blocker of choice for vasospastic (variant) angina prophylaxis, unlike beta-blockers

## universities
+o6u

## learner_years
+1

## modules
+O6U-IPH-108

## module_subject
O6U-IPH-108 > Beta-Blocker Pharmacology > Beta Blockers Contraindicated in Vasospastic Angina
208 INT > Chapter 10 Pharmacology > Antianginal Drugs > Calcium Channel Blockers

## field_notes
o6u: Reused for the pharmabank3 cluster's Q50 (p213, fill-in "Beta blockers are useful in
all types of angina pectoris EXCEPT ... angina. Answer: vasospastic", converted to a
constructed SBA) -- this concept's own definition already states that beta-blockers are
contraindicated in vasospastic/variant angina because unopposed alpha-mediated
vasoconstriction risks worsening the coronary spasm, unlike verapamil's own consistent
heart-rate-lowering, coronary-vasodilating action. Sourced from "pharma MCQs bank .pdf"
(coverage/O6U-IPH-108-triage.md).

---
