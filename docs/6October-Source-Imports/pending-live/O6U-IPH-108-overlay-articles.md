<!--
  O6U-IPH-108 -- pending-live sparse ARTICLE overlay (sibling
  overlay-concepts.md carries the concept half). Apply ONLY after the named
  source article file is live. Restates ## title verbatim. universities/
  years/module are true ID-list columns; module_subject and university_notes
  fully replace on every write.

  Source file:
    A. docs/Kasr-Source-Imports/article/108-INT-pharmacology.md -- university kau, module 108 INT (Year 1)

  Simulate together with the source file:
  npm run medical:simulate -- docs/6October-Source-Imports/pending-live/O6U-IPH-108-overlay-articles.md \
    --with docs/Kasr-Source-Imports/article/108-INT-pharmacology.md \
    --emit /tmp/sim-O6U-IPH-108-pending-articles.json
-->

# Item

## id
ART-108-PHA-ROUTES

## title
Routes of Drug Administration and Dosage Forms

## subject
fnd

## topic
Practical Pharmacology

## summary
Routes of administration divide into enteral, parenteral and topical; the choice predicts
bioavailability, onset speed, and whether first-pass metabolism applies.

## sections

## universities
+o6u

## years
+O6U_Y1

## module
+O6U-IPH-108

## module_subject
O6U-IPH-108 > Practical Pharmacology > Routes of Drug Administration > Classification
108 INT > Pharmacology > Routes of Drug Administration and Dosage Forms

## university_notes
o6u: Reused for the practical bank's Q32 (parenteral vs oral onset speed) and Q19 (oral
route depends on GI secretion/motor function) -- this article's own `related_concepts`
lists both CON-FND-6A60CE8D2E7C5C and CON-FND-3CC8853A7D6DA8. From "all Practical pharma
questions _compressed.pdf" (coverage/O6U-IPH-108-triage.md).

## field_notes
arabicTitle: No verification pass run this session; the source record (108-INT-pharmacology.md) carries none either.

---

<!--
  Lane 2 (o6u-iph108-author2, cluster "pharmabank") additions below -- siblings
  of the ten CONCEPT overlay rows in overlay-concepts.md. Apply each block
  ONLY after its own named source article file is live.

  Source files:
    E. docs/Kasr-Source-Imports/article/208-INT-articles.md -- university kau, module 208 INT (Year 2)
    F. docs/Assiut-Source-Imports/article/AUN-MPT-104-articles.md -- university aun, module AUN-MPT-104 (Year 1)
    G. docs/Mansoura-Source-Imports/article/MANS-PPPM-articles.md -- university mans, module MANS-PPPM (Year 1)

  Simulate together with each source file separately:
  npm run medical:simulate -- docs/6October-Source-Imports/pending-live/O6U-IPH-108-overlay-articles.md \
    --with docs/Kasr-Source-Imports/article/208-INT-articles.md \
    --emit /tmp/sim-O6U-IPH-108-pending-articles-208int.json
  npm run medical:simulate -- docs/6October-Source-Imports/pending-live/O6U-IPH-108-overlay-articles.md \
    --with docs/Assiut-Source-Imports/article/AUN-MPT-104-articles.md \
    --emit /tmp/sim-O6U-IPH-108-pending-articles-aunmpt104.json
  npm run medical:simulate -- docs/6October-Source-Imports/pending-live/O6U-IPH-108-overlay-articles.md \
    --with docs/Mansoura-Source-Imports/article/MANS-PPPM-articles.md \
    --emit /tmp/sim-O6U-IPH-108-pending-articles-manspppm.json
-->

# Item

## id
ART-FND-208INT-CHOLINERGIC-PHARMACOLOGY

## title
Cholinergic and antimuscarinic pharmacology: agonists, anticholinesterases, atropine, organophosphorus poisoning and neuromuscular blocker reversal

## subject
pharm

## topic
Autonomic Pharmacology

## summary
M2 muscarinic receptors are Gi-coupled and located in the heart, where their stimulation decreases intracellular cAMP and slows heart rate.

## sections

## universities
+o6u

## years
+O6U_Y1

## module
+O6U-IPH-108

## module_subject
O6U-IPH-108 > Autonomic Pharmacology > Muscarinic Receptor Subtypes > M2 receptor location
208 INT > Chapter 10 Pharmacology > Autonomic Nervous System > Receptor Signal Transduction

## university_notes
o6u: Reused for the pharmabank cluster's Q1 (M2 receptor location = heart) -- this
article's own related concept CON-FND-F9E1875546E70D states this exact fact. From "pharma
MCQs bank .pdf" (coverage/O6U-IPH-108-triage.md).

## field_notes
arabicTitle: No verification pass run this session; the source record (208-INT-articles.md) carries none either.

---

# Item

## id
ART-FND-AUN-MPT104-CHOLINERGIC-PHARMACOLOGY-GAPFILL

## title
Parasympathetic pharmacology: direct-acting agonists, cholinesterase inhibitors and organophosphate poisoning

## subject
fnd

## topic
Autonomic Pharmacology

## summary
Direct-acting cholinomimetics (bethanechol, carbachol) and cholinesterase inhibitors (neostigmine, physostigmine, edrophonium, echothiophate) differ in mechanism, reversibility, CNS penetration and clinical indication.

## sections

## universities
+o6u

## years
+O6U_Y1

## module
+O6U-IPH-108

## module_subject
O6U-IPH-108 > Autonomic Pharmacology > Cholinesterase Inhibitors > Physostigmine mechanism
AUN-MPT-104 > Parasympathetic nervous system (Agonists) 1-2 > Direct-acting cholinomimetics and cholinesterase inhibitors

## university_notes
o6u: Reused for the pharmabank cluster's Q2 (acetylcholine's clinical unsuitability), Q5
(neostigmine's skeletal-muscle effect versus physostigmine) Q16/Q19 (bethanechol's
megacolon indication and the atonic-retention contraindication clarification) -- this
article's own related concepts CON-FND-6B410DA4B612B9, CON-FND-7044CBD216CDEC and
CON-FND-A1A577616D7186 cover these facts. From "pharma MCQs bank .pdf"
(coverage/O6U-IPH-108-triage.md).

## field_notes
arabicTitle: No verification pass run this session; the source record (AUN-MPT-104-articles.md) carries none either.

---

# Item

## id
ART-FND-AUN-MPT104-ANTIMUSCARINIC-PHARMACOLOGY

## title
Antimuscarinic pharmacology: atropine, scopolamine, ipratropium and ganglion blockers

## subject
fnd

## topic
Autonomic Pharmacology

## summary
Atropine's systemic adverse-effect profile, muscarinic antagonists' therapeutic uses and contraindications (including narrow-angle glaucoma), and physostigmine's reversal of the anticholinergic toxidrome.

## sections

## universities
+o6u

## years
+O6U_Y1

## module
+O6U-IPH-108

## module_subject
O6U-IPH-108 > Autonomic Pharmacology > Cholinesterase Inhibitors > Physostigmine as antidote
AUN-MPT-104 > Parasympathetic nervous system (Antagonists) > Antimuscarinic pharmacology

## university_notes
o6u: Reused for the pharmabank cluster's Q8 (physostigmine as the antidote for atropine
toxicity) and Q22 (antimuscarinics contraindicated in glaucoma) -- this article's own
related concepts CON-FND-1E1CDB94DF60D6 and CON-FND-7F6FE263FBC1C0 cover these facts. From
"pharma MCQs bank .pdf" (coverage/O6U-IPH-108-triage.md).

## field_notes
arabicTitle: No verification pass run this session; the source record (AUN-MPT-104-articles.md) carries none either.

---

# Item

## id
ART-FND-AUN-MPT104-ANS-CHOLINERGIC-ADRENERGIC-TRANSMISSION

## title
Introduction to the autonomic nervous system: cholinergic transmission, receptor specificity and muscarinic subtypes

## subject
fnd

## topic
Autonomic Pharmacology

## summary
M3 muscarinic receptors are Gq-coupled, signalling through IP3/DAG, distinct from the Gi-coupled, cAMP-lowering M2 receptor.

## sections

## universities
+o6u

## years
+O6U_Y1

## module
+O6U-IPH-108

## module_subject
O6U-IPH-108 > Autonomic Pharmacology > Muscarinic Receptor Subtypes > M3 signal transduction
AUN-MPT-104 > Introduction to Autonomic Nervous System > Muscarinic receptor subtypes and signal transduction

## university_notes
o6u: Reused for the pharmabank cluster's Q21 (antimuscarinics decrease DAG in salivary
gland) -- this article's own related concept CON-FND-5530C30545ED40 states this exact fact.
From "pharma MCQs bank .pdf" (coverage/O6U-IPH-108-triage.md).

## field_notes
arabicTitle: No verification pass run this session; the source record (AUN-MPT-104-articles.md) carries none either.

---

# Item

## id
ART-MANS-PPPM-NEOSTIGMINE-GIT-MOTILITY

## title
Neostigmine — cholinesterase inhibition increasing GIT motility

## subject
fnd

## topic
Autonomic Pharmacology

## summary
Neostigmine inhibits acetylcholinesterase, raising acetylcholine at gut muscarinic receptors and increasing GIT motility, which is why it is used for postoperative paralytic ileus.

## sections

## universities
+o6u

## years
+O6U_Y1

## module
+O6U-IPH-108

## module_subject
O6U-IPH-108 > Autonomic Pharmacology > Cholinesterase Inhibitors > Neostigmine and GIT motility
MANS-PPPM > Pharmacology > Autonomic Nervous System Pharmacology > Cholinesterase Inhibitors

## university_notes
o6u: Reused for the pharmabank cluster's Q17 (neostigmine for postoperative paralytic
ileus) -- this article's own related concept CON-FND-ECECFC8B855144 states this exact fact.
From "pharma MCQs bank .pdf" (coverage/O6U-IPH-108-triage.md).

## field_notes
arabicTitle: No verification pass run this session; the source record (MANS-PPPM-articles.md) carries none either.

---

# Item

## id
ART-108-PHA-PHARMACOKINETICS-ADME

## title
Pharmacokinetics: Absorption, Distribution, Metabolism, Excretion

## subject
fnd

## topic
Practical Pharmacology

## summary
Absorption is the pharmacokinetic step most critical to reaching a therapeutic plasma
concentration; bioavailability is the fraction of a dose reaching systemic circulation
unchanged, and first-pass hepatic metabolism is what removes the rest of an oral dose.

## sections

## universities
+o6u

## years
+O6U_Y1

## module
+O6U-IPH-108

## module_subject
O6U-IPH-108 > Practical Pharmacology > Routes of Drug Administration > Sublingual escapes first-pass
108 INT > Pharmacology > Pharmacokinetics > ADME

## university_notes
o6u: Reused for the practical bank's Q21 (sublingual nitroglycerin avoids first-pass
metabolism) -- this article's own `related_concepts` lists CON-FND-CF40F32A8A74A0. From
"all Practical pharma questions _compressed.pdf" (coverage/O6U-IPH-108-triage.md).

## field_notes
arabicTitle: No verification pass run this session; the source record (108-INT-pharmacology.md) carries none either.

---

<!--
  Lane 4 (o6u-iph108-author4, cluster "pharmabank3") additions below --
  siblings of the three CONCEPT overlay rows lane 4 added to
  overlay-concepts.md. Apply each block ONLY after
  docs/Kasr-Source-Imports/article/208-INT-articles.md is live.

  Source file:
    H. docs/Kasr-Source-Imports/article/208-INT-articles.md -- university kau, module 208 INT (Year 2)

  Simulate together with the source file:
  npm run medical:simulate -- docs/6October-Source-Imports/pending-live/O6U-IPH-108-overlay-articles.md \
    --with docs/Kasr-Source-Imports/article/208-INT-articles.md \
    --emit /tmp/sim-O6U-IPH-108-pending-articles-208int.json
-->

# Item

## id
ART-FND-208INT-ADRENERGIC-PHARMACOLOGY

## title
Adrenergic pharmacology: sympathomimetic agonists, beta-blockers, alpha-blockers, and autacoid antiemetics/antihistamines

## subject
pharm

## topic
Pharmacology

## summary
Sympathomimetic agonists, beta-blockers and alpha-blockers, grouped by receptor selectivity and dose-dependent action.

## sections

## universities
+o6u

## years
+O6U_Y1

## module
+O6U-IPH-108

## module_subject
O6U-IPH-108 > Adrenergic Agonist Pharmacology > Dopamine Dose-Dependent Receptor Selectivity
208 INT > Chapter 10 Pharmacology > Autonomic Nervous System > Adrenergic Agonists

## university_notes
o6u: Reused for the pharmabank3 cluster's Q1 (p161, low-dose dopamine's D1-mediated renal
vasodilation) -- this article's own related concept CON-FND-EA0D1633BF0130 states this exact
fact. From "pharma MCQs bank .pdf" (coverage/O6U-IPH-108-triage.md).

## field_notes
arabicTitle: No verification pass run this session; the source record (208-INT-articles.md) carries none either.

---

# Item

## id
ART-FND-208INT-ANTIHYPERTENSIVE-PHARMACOLOGY

## title
Antihypertensive pharmacology: central alpha2 agonists, direct arteriolar/mixed vasodilators, pregnancy safety, and ACE inhibitor adverse effects/excretion

## subject
pharm

## topic
Pharmacology

## summary
Central alpha2 agonists (clonidine) and their withdrawal-rebound-hypertension risk, alongside direct vasodilators and pregnancy-safe antihypertensive choices.

## sections

## universities
+o6u

## years
+O6U_Y1

## module
+O6U-IPH-108

## module_subject
O6U-IPH-108 > Adrenergic Agonist Pharmacology > Clonidine Withdrawal Syndrome
208 INT > Chapter 10 Pharmacology > Antihypertensive Drugs

## university_notes
o6u: Reused for the pharmabank3 cluster's Q6 (p166, sudden clonidine cessation causing
hypertensive crisis) -- this article's own related concept CON-FND-B6D3C1F469AC58 states
this exact fact. From "pharma MCQs bank .pdf" (coverage/O6U-IPH-108-triage.md).

## field_notes
arabicTitle: No verification pass run this session; the source record (208-INT-articles.md) carries none either.

---

# Item

## id
ART-FND-208INT-ANTIANGINAL-PHARMACOLOGY

## title
Antianginal pharmacology: organic nitrates, calcium-channel blockers, nicorandil and ivabradine

## subject
pharm

## topic
Pharmacology

## summary
Organic nitrates, calcium-channel blockers (including verapamil's role in vasospastic angina prophylaxis), nicorandil and ivabradine.

## sections

## universities
+o6u

## years
+O6U_Y1

## module
+O6U-IPH-108

## module_subject
O6U-IPH-108 > Beta-Blocker Pharmacology > Beta Blockers Contraindicated in Vasospastic Angina
208 INT > Chapter 10 Pharmacology > Antianginal Drugs > Calcium Channel Blockers

## university_notes
o6u: Reused for the pharmabank3 cluster's Q50 (p213, beta blockers not useful in vasospastic
angina, converted from the source's own fill-in-the-blank format) -- this article's own
related concept CON-FND-0356010F3C10AD states that verapamil, not a beta blocker, is the
calcium-channel blocker of choice for vasospastic angina prophylaxis. From "pharma MCQs bank
.pdf" (coverage/O6U-IPH-108-triage.md).

## field_notes
arabicTitle: No verification pass run this session; the source record (208-INT-articles.md) carries none either.

---
