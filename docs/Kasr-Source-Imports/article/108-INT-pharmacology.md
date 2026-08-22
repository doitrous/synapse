<!--
  Library articles for the Pharmacology half of module 108 INT, Kasr Al Ainy,
  Year 1. Nine articles, one for each of the nine major sections of the
  department book src_af30e4191cb4087f8d3f, "General Pharmacology: Introduction
  to Basic Principles of Drug Therapy". The book has a single chapter, so its
  section headings are the only division the faculty itself makes, and these
  articles reproduce it rather than imposing a different one.

    ART-108-PHA-INTRODUCTION            Introduction                     p3
    ART-108-PHA-MEMBRANE-PASSAGE        Passage of drugs across membranes p3-5
    ART-108-PHA-PHARMACOKINETICS-ADME   Pharmacokinetics [ADME]          p5-12
    ART-108-PHA-KINETIC-PRINCIPLES      Fundamental Principles           p13-14
    ART-108-PHA-PHARMACODYNAMICS        Pharmacodynamics                 p14-19
    ART-108-PHA-ADVERSE-DRUG-REACTIONS  Adverse Drug Reactions           p20-24
    ART-108-PHA-DRUG-INTERACTIONS       Drug Interactions                p25-26
    ART-108-PHA-POSOLOGY                Dosage of Drugs (Posology)       p27-28
    ART-108-PHA-ROUTES                  Routes and Dosage Forms          p29-33

  Every article uses TPL-CONCEPT, because each teaches a set of principles
  rather than a condition, a drug or a procedure. TPL-DRUG was considered and
  rejected: it expects Class and members, Indications, Dosing principles and
  Monitoring, and this book names no drug the OCR can be trusted on.

  The concept link runs in both directions and the direction that matters is
  this one. `related_concepts` on the article is what puts the article's ID onto
  the concept record at import; a concept naming an article that does not name
  it back resolves to nothing, and every question on that concept then fails
  coverage. So every concept in 108-INT-concepts-pharmacology.md appears in the
  `related_concepts` of exactly the article that teaches it, and each of those
  concepts carries the same article on its own `article_ids`.

  Seven of the nine live pharmacology concepts are also listed, on
  ART-108-PHA-PHARMACOKINETICS-ADME and ART-108-PHA-KINETIC-PRINCIPLES. Those
  nine already carry one article, ART-FND-TOP-770778D86F, which is a generated
  topic page rather than a taught article; listing them here gives them a real
  one without removing what they have, and the matching `+` rows are in
  108-INT-concepts-pharmacology-updates.md.

  Sources, all from ../manifest/kasr-y1-sources.json and all cited in prose
  rather than in resource_ids: the department book src_af30e4191cb4087f8d3f
  (OCR, 14 headings flagged ocrUncertain — no drug name, dose or number is
  quoted from it); the orientation ILO sheet src_b4f736e3bd809dbee187 (55
  ILOs, ticked SAQ / MCQ / OSPE); the 2025 EOY paper src_bd1595e59d116b78436a
  and the 2024 EOY paper src_3deab75f7f81cc5f5260, both native text, which are
  where every quoted exam line comes from.

  The department MCQ bank src_ec50845c4498e17b9b6b is NOT quoted anywhere in
  these articles. It carries "For personal use only, No other uses without
  permission. Copyright (c) 2025. All rights reserved", is student-collected,
  and is marked NOT CLEARED FOR PUBLICATION. What it contributed is a
  distribution — 52 of its 68 pharmacology items are in the Pharmacokinetics
  chapter, 16 in the Introduction — which is recorded on the concepts'
  exam_signal and shaped what these articles spend their length on. No stem,
  option or phrasing from it appears in any student-facing line.

  What is empty and why is on each article's field_notes: resource_ids and
  article_source_ids because the Kasr sources are absent from
  corpus-source-index.json; claim_ids and span_ids because no evidence pass has
  been run for this module and spans are evidence records belonging in
  docs/import-ready/evidence/, which this task did not author.
-->

# Item

## id
ART-108-PHA-INTRODUCTION

## title
Introduction to drug therapy

## arabic_title
مقدمة في العلاج الدوائي

## aliases
General pharmacology introduction
Scope of pharmacology
Pharmacokinetics and pharmacodynamics

## subject
pharm

## topic
General pharmacology

## subtopic
Introduction

## microtopic

## nanotopic

## primary_node_id
SYS-FND-T04

## secondary_node_ids
DIS-PHA-T01 | DIS-PHA-T02 | DIS-PHA

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1–3 foundation

## reading_time
5

## high_yield
Core

## time_sensitive
stable

## status
Draft

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## module
108 INT

## module_subject
108 INT > Pharmacology > Introduction

## universities
kau

## years
KAU_Y1

## summary
General pharmacology is the study of how a drug and a body act on each other. The subject divides in two, and almost every question in this module belongs to one half or the other. Pharmacokinetics follows the drug — absorbed, distributed, metabolised, excreted — and so answers what concentration reaches the site of action. Pharmacodynamics follows the effect — receptor, response, dose-response curve — and so answers what that concentration does. Holding the division makes the rest of the module readable.

## sections
### Definition
Pharmacology is the study of drugs and their interaction with living systems. A drug is any substance that produces a change in biological function through its chemical actions.

Pharmacokinetics is what the body does to the drug. It covers absorption, distribution, metabolism and excretion, together abbreviated ADME, and its output is a plasma concentration over time.

Pharmacodynamics is what the drug does to the body. It covers the mechanism of action, the receptor, and the relationship between concentration and response, and its output is an effect.

Pharmacotherapeutics is the use of both to treat a patient — choosing a drug, a dose, a route and an interval that put the concentration where it needs to be for long enough to work.

### Mechanism
The two halves meet at one number: the plasma concentration. Everything kinetic determines it and everything dynamic reads it.

That is why therapy is aimed at a concentration rather than at a dose. A dose that is right for one patient may produce a toxic concentration in another whose clearance is halved, and the effect follows the concentration, not the prescription.

### Key determinants
The dose and the route set how much drug enters. Absorption, distribution, metabolism and excretion set how much of it is present at the site of action, and for how long. The receptor and the drug's efficacy at it set what that concentration produces.

A change anywhere along that chain changes the outcome, which is what makes drug interactions, liver disease, renal impairment and age matter so much in this module.

### Clinical significance
The orientation ILO sheet for this course opens with the distinction — its first stated objective is to explain the difference between pharmacokinetics and pharmacodynamics — and it is examined by multiple-choice.

Practically, the division is a diagnostic tool. When a patient responds unexpectedly to a drug, the first question is which half has changed: has the concentration moved, or has the response to that concentration moved? A kinetic problem is answered by changing the dose; a dynamic one usually is not.

### Common misconceptions
Students often read "kinetics" as speed and "dynamics" as strength. Both halves deal with time and with magnitude. The division is the direction of action — body on drug, or drug on body — and nothing else.

## published_summary

## published_sections

## hold_these
Pharmacokinetics is what the body does to the drug; pharmacodynamics is what the drug does to the body.
Therapy aims at a plasma concentration, not at a dose.
Pharmacokinetics produces a concentration; pharmacodynamics reads it.

## lose_the_mark
Sorting a described property by whether it sounds fast or slow instead of by direction of action.
Assuming a poor response always means too small a dose. It may mean the receptor has changed, which no dose increase will fix.

## related_concepts
CON-FND-6BB35F11EBD54B

## related_articles
ART-108-PHA-PHARMACOKINETICS-ADME: the kinetic half, in full
ART-108-PHA-PHARMACODYNAMICS: the dynamic half, in full
ART-108-PHA-MEMBRANE-PASSAGE: the transfer step both halves depend on

## question_ids
[clear]

## resource_ids
[clear]

## article_source_ids
[clear]

## claim_ids
[clear]

## span_ids
[clear]

## annotations
### definition_of · CON-FND-6BB35F11EBD54B
Quote: Pharmacokinetics is what the body does to the drug.
Block: body

## media


## media_recommendations
### diagram · The two halves of pharmacology meeting at plasma concentration
Purpose: Teaches CON-FND-6BB35F11EBD54B. A student has to see ADME feeding one number and that number feeding the dose-response curve before the division stops being two lists of words. Prose can state the division but cannot show the join.
Priority: strongly helpful
Status: needed
Section: Mechanism
Source direction: openly licensed pharmacology text
Rights: must be CC-BY or public domain

## university_notes
kau: Kasr Al Ainy teaches this in module 108 INT alongside Introduction to Pathology; the pharmacology half carries 6 marks at the end-of-module sitting and 8 written marks at the end of year.

## publication_gate
needs_evidence

## evidence_basis
Department book src_af30e4191cb4087f8d3f, "General Pharmacology: Introduction to Basic Principles of Drug Therapy", Introduction section, page 3.
Orientation ILO sheet src_b4f736e3bd809dbee187, ILO 1 and ILO 2, page 1.
Chapter ILO block of the same book, which names the mechanisms of action and the basic kinetic processes as the chapter's own objectives.

## evidence_gaps
No claim or citation record exists for 108 INT; every statement here awaits the evidence pass.
ILO 2, on the meaning of pharmacotherapeutics, carries no tick in any of the three format columns on the ILO sheet, so what the department expects of it is unknown.

## conflicts
[clear]

## last_reviewed

## review_due

## notes
The shortest article in the set, deliberately. Its job is to give a student the division to hang the other eight on, and lengthening it would compete with them.

## field_notes
microtopicId: SYS-FND-T04 has no microtopic spanning both kinetics and dynamics, which is what this article is about; module_subject carries the curriculum position instead.
nanotopicId: The catalogue holds no NAN_ ids for first-year general pharmacology.
questionIds: No questions test this article yet; a question batch for 108 INT has not been authored.
media: No rights-cleared asset exists for 108 INT — one is requested in media_recommendations instead.
lastReviewed: New record; no reviewer has seen it.
reviewDue: A review date is set when a reviewer is assigned.
resourceIds: The Kasr source src_af30e4191cb4087f8d3f is a real manifest entry but is absent from corpus-source-index.json, so citing it here fails the corpus check. It is cited in evidence_basis and in the file preamble instead.
articleSourceIds: The same corpus-index gap; the sources are named in evidence_basis.
claimIds: No evidence pass has been run for 108 INT, so no claim exists to point at, and attaching a near-miss claim from another subject to clear a validator is the wrong trade (LD-14, MASTER-PLAN.md:117).
spanIds: A span is an evidence record and belongs in docs/import-ready/evidence/ in its own file; this task authored concepts and articles only, so no span exists yet. It is owed before this article can publish.
publishedSummary: Status is Draft, so there is no safe student projection yet; published_summary is filled when the evidence gate is passed.
publishedSections: As above — the student-visible projection is written at publication, not before.
conflicts: The Introduction section of the book and the ILO sheet agree; no source disagreement was found.

---

# Item

## id
ART-108-PHA-MEMBRANE-PASSAGE

## title
Passage of drugs across cell membranes

## arabic_title
مرور الأدوية عبر أغشية الخلايا

## aliases
Drug transfer across membranes
Simple diffusion and carrier mediated transport
pH partition of drugs

## subject
pharm

## topic
General pharmacology

## subtopic
Passage of drugs across cell membranes

## microtopic

## nanotopic

## primary_node_id
SYS-FND-T04-S01-M01

## secondary_node_ids
DIS-PHA-T01 | DIS-PHA

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1–3 foundation

## reading_time
7

## high_yield
Core

## time_sensitive
stable

## status
Draft

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## module
108 INT

## module_subject
108 INT > Pharmacology > Passage of drugs across cell membranes

## universities
kau

## years
KAU_Y1

## summary
Every kinetic process in this module is the same event repeated: a drug crossing a membrane. Absorption is a crossing, distribution is a series of crossings, and tubular reabsorption is a crossing in reverse. Two mechanisms account for almost all of it — passive diffusion through the lipid, which needs the drug to be small, lipid-soluble and uncharged, and carrier-mediated transport, which needs a protein and is therefore saturable. Because most drugs are weak acids or weak bases, the pH of the compartment decides how much of the drug is uncharged, and so decides how much can cross.

## sections
### Definition
A cell membrane is a lipid bilayer with proteins in it. A drug can get across it in one of two ways: dissolve through the lipid, or be carried through by a protein.

Simple diffusion is movement down a concentration gradient through the lipid, with no carrier and no energy. Carrier-mediated transport uses a protein: facilitated diffusion runs down the gradient without energy, while active transport runs against it and consumes energy.

### Mechanism
Most drugs cross cell membranes by passive diffusion, and only the uncharged, lipid-soluble fraction can make the crossing.

Three properties of the molecule set the rate: molecular size, lipid solubility, and degree of ionisation. Size and lipid solubility are fixed for a given drug. Ionisation is not — it depends on where the drug is.

Almost every drug is a weak acid or a weak base, which means it sits in equilibrium between a charged and an uncharged form, and the position of that equilibrium is set by the drug's pKa and the pH around it. A weak acid is mostly uncharged in an acidic medium; a weak base is mostly uncharged in an alkaline one. Uncharged means lipid-soluble, and lipid-soluble means able to cross.

Carrier-mediated transport behaves quite differently, and has three signatures that give it away. It needs a carrier, so a drug with no carrier simply cannot use it. It is saturable, because there is a finite number of carriers. And it can be competitively inhibited by another substance using the same carrier.

### Key determinants
For diffusion: size, lipid solubility, degree of ionisation, the concentration gradient, and the surface area available.

For carrier-mediated transport: the presence of a suitable carrier, the number of carriers, whether the drug is competing with anything else for them, and — for active transport only — the availability of energy.

The pH difference between two compartments is a determinant in its own right, because it can trap a drug on one side. A drug that crosses into a compartment where it ionises cannot diffuse back out; it accumulates. This is ion trapping, and it explains why alkalinising the urine speeds the excretion of a weak acid, why weak bases concentrate in gastric juice, and why a weak base can reach an infant through relatively acidic breast milk.

### Clinical significance
The 2025 end-of-year paper asked why a weak acid drug is better absorbed from the stomach, and the answer it marked correct was that in an acidic medium the weak acid is mostly non-ionised and lipid-soluble. The 2024 paper asked which statement best describes active transport, and marked "It requires a carrier" correct. Both are this article, and neither is answerable without the mechanism.

The clinical use is in poisoning. If the drug is a weak acid, alkalinising the urine ionises it in the tubule and it cannot be reabsorbed, so more is excreted. If it is a weak base, the urine is acidified for the same reason in reverse.

### Common misconceptions
The stomach question above trips students in a particular way: they answer it correctly and then conclude that the stomach is where weak acids are absorbed. It is not. The small intestine absorbs most of almost every drug because its surface area is vastly larger; the acid environment only shifts the equilibrium.

The other common error is treating "carrier-mediated" and "active" as the same thing. Facilitated diffusion also uses a carrier. What makes transport active is moving the drug against its gradient at the cost of energy.

## published_summary

## published_sections

## hold_these
Only the non-ionised, lipid-soluble fraction of a drug can cross a membrane by simple diffusion.
A weak acid is mostly non-ionised in an acidic medium; a weak base is mostly non-ionised in an alkaline one.
Carrier-mediated transport has three signatures: it needs a carrier, it saturates, and it can be competitively inhibited.
A drug that ionises inside a compartment is trapped there.

## lose_the_mark
Concluding from the ionisation rule that the stomach is the main site of absorption. Surface area decides that, and the small intestine wins.
Calling facilitated diffusion active transport because it uses a carrier.
Reversing the ion-trapping rule and acidifying the urine to excrete an acid.

## related_concepts
CON-FND-584FCF6897C35E | CON-FND-9D7D3A5B015805 | CON-FND-ED16C95CE71A4B

## related_articles
ART-108-PHA-PHARMACOKINETICS-ADME: where every one of these crossings is put to work
ART-108-PHA-INTRODUCTION: the division this article sits inside
ART-108-PHA-ROUTES: the route decides which membranes the drug must cross at all

## question_ids
[clear]

## resource_ids
[clear]

## article_source_ids
[clear]

## claim_ids
[clear]

## span_ids
[clear]

## annotations
### definition_of · CON-FND-584FCF6897C35E
Quote: Most drugs cross cell membranes by passive diffusion, and only the uncharged, lipid-soluble fraction can make the crossing.
Block: body

### definition_of · CON-FND-9D7D3A5B015805
Quote: It needs a carrier, so a drug with no carrier simply cannot use it.
Block: body

## media

## media_recommendations
### diagram · Weak acid and weak base ionisation across a pH gradient
Purpose: Teaches CON-FND-ED16C95CE71A4B and CON-FND-97E55D75DE9ED1. Ion trapping is a two-compartment argument and students reverse it under exam pressure; seeing the charged form accumulate on one side fixes the direction in a way a sentence does not.
Priority: required
Status: needed
Section: Key determinants
Source direction: openly licensed pharmacology text
Rights: must be CC-BY or public domain

### graph · Saturation of a carrier-mediated transport process against concentration
Purpose: Teaches CON-FND-9D7D3A5B015805. The plateau is what distinguishes carrier-mediated transport from diffusion, and a curve that flattens is the whole argument.
Priority: strongly helpful
Status: needed
Section: Mechanism
Source direction: openly licensed physiology or pharmacology text
Rights: must be CC-BY or public domain

## university_notes
kau: Kasr Al Ainy gives this its own section in the department book, before pharmacokinetics rather than inside it, which is why it is a separate article here.

## publication_gate
needs_evidence

## evidence_basis
Department book src_af30e4191cb4087f8d3f, "Passage of drugs across cell membranes", pages 3 to 5, including its Simple diffusion and Carrier mediated transport subsections.
Orientation ILO sheet src_b4f736e3bd809dbee187, ILOs 4, 5, 6 and 22, page 1.
EOY paper src_bd1595e59d116b78436a, 2025 sitting, Section 1 Q13, with the answer recovered from the solved copy at confidence 1.00.
EOY paper src_3deab75f7f81cc5f5260, 2024 sitting, Section 1 Q13, answer recovered at confidence 1.00.

## evidence_gaps
No claim or citation record exists for 108 INT.
The book's own statement of the pH-partition rule could not be quoted, because the page carrying it is part of an OCR'd document and the section heading above it is one of the fourteen flagged ocrUncertain in extraction.

## conflicts
The 2025 stem asserts that a weak acid is better absorbed from the stomach, while the same course teaches that the small intestine is the main absorbing surface for most drugs. The question is testing the ionisation principle rather than the site, and both positions are stated in this article rather than one being dropped.

## last_reviewed

## review_due

## notes
The ion-trapping content is taught here, where the mechanism is, and applied in the excretion part of ART-108-PHA-PHARMACOKINETICS-ADME. The concept CON-FND-97E55D75DE9ED1 is owned by that article, not this one, to keep it beside renal excretion where it is examined.

## field_notes
microtopicId: The article is placed on SYS-FND-T04-S01-M01 under protest, because the taxonomy has no microtopic for membrane transfer and Absorption is the nearest honest home; module_subject carries the book's own section instead.
nanotopicId: The catalogue holds no NAN_ ids for first-year general pharmacology.
questionIds: No questions test this article yet; a question batch for 108 INT has not been authored.
media: No rights-cleared asset exists for 108 INT — two are requested in media_recommendations instead.
lastReviewed: New record; no reviewer has seen it.
reviewDue: A review date is set when a reviewer is assigned.
resourceIds: The Kasr sources are real manifest entries but are absent from corpus-source-index.json, so citing one fails the corpus check; they are cited in evidence_basis.
articleSourceIds: The same corpus-index gap.
claimIds: No evidence pass has been run for 108 INT (LD-14, MASTER-PLAN.md:117).
spanIds: Spans are evidence records belonging in docs/import-ready/evidence/ in their own file; this task authored concepts and articles only. Owed before publication.
publishedSummary: Status is Draft, so no student projection exists yet.
publishedSections: As above.

---

# Item

## id
ART-108-PHA-PHARMACOKINETICS-ADME

## title
Pharmacokinetics: absorption, distribution, metabolism and excretion

## arabic_title
حركية الدواء: الامتصاص والتوزيع والاستقلاب والإخراج

## aliases
ADME
Absorption distribution metabolism excretion
Pharmacokinetics
Bioavailability and first-pass effect

## subject
pharm

## topic
General pharmacology

## subtopic
Pharmacokinetics

## microtopic

## nanotopic

## primary_node_id
SYS-FND-T04-S01

## secondary_node_ids
DIS-PHA-T01 | DIS-PHA-T08 | DIS-PHA

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1–3 foundation

## reading_time
14

## high_yield
Core

## time_sensitive
stable

## status
Draft

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## module
108 INT

## module_subject
108 INT > Pharmacology > Pharmacokinetics

## universities
kau

## years
KAU_Y1

## summary
Pharmacokinetics is the four-step account of what happens to a drug between the prescription and the receptor. Absorption decides how much gets in and how fast. Distribution decides where it goes and how much of it stays free. Metabolism converts it into something the kidney can handle, and is the step drugs most often interfere with in each other. Excretion removes it, chiefly by the kidney. Together they produce a plasma concentration over time, and every dosing decision in medicine is an attempt to control that curve.

## sections
### Definition
Absorption is the passage of a drug from its site of administration into the circulation. Distribution is its movement from the circulation into the tissues. Metabolism, or biotransformation, is its chemical conversion, usually into a more polar and more easily excreted form. Excretion is its removal from the body.

Bioavailability is the fraction of an administered dose that reaches the systemic circulation unchanged. An intravenous dose is complete by definition; an oral dose is not.

The apparent volume of distribution relates the amount of drug in the body to the plasma concentration, and clearance is the volume of body fluid cleared of drug per unit time.

### Mechanism
Absorption. Most oral drugs are absorbed from the small intestine, whose villi give it far more surface than the stomach has. How quickly the drug arrives there depends on gastric emptying; how quickly it leaves depends on splanchnic blood flow. Food, other drugs and gut disease all interfere, and food can compete directly with a drug for absorption.

An orally absorbed drug then travels in the portal vein to the liver before it reaches the rest of the body. Whatever the liver removes on that first pass never reaches the circulation at all. This is the first-pass effect, and it is the usual reason an oral dose must be larger than an intravenous one.

Distribution. Only free drug leaves the circulation, so plasma protein binding limits distribution and acts as a reservoir — albumin binding acidic drugs, alpha-1 acid glycoprotein binding basic ones. Lipid solubility decides whether the free drug can cross membranes; regional blood flow decides how fast it arrives; tissue affinity decides where it accumulates.

Four patterns result. The drug may stay in plasma, spread through extracellular fluid, spread through total body water, or leave the water compartments and concentrate in one tissue. The apparent volume of distribution reads that pattern back as a number, and because it is a proportionality term and not a real space it can exceed the volume of the whole patient.

The barriers matter separately. The blood-brain barrier admits lipid-soluble, unbound, non-ionised drug and excludes the rest. The placenta is a much weaker barrier, so a drug given to a pregnant woman is given to the fetus. Weak bases are trapped in breast milk and reach the infant.

Metabolism. The liver does most of it, though the gut wall, plasma, lung and kidney all contribute. Phase I reactions — oxidation, reduction, hydrolysis — expose or add a functional group, and may leave the metabolite less active, equally active, or more active than the parent drug. Phase II reactions conjugate the drug or its Phase I metabolite into a polar and usually inactive product.

Microsomal enzymes sit in the smooth endoplasmic reticulum of the hepatocyte, act on lipid-soluble drugs, catalyse most Phase I reactions, and can be induced or inhibited. Non-microsomal enzymes are cytoplasmic or mitochondrial, are not confined to the liver, and are not inducible. Hepatic microsomal enzymes are inducible; non-microsomal enzymes are not.

An inducer increases enzyme synthesis over days to weeks, so the drug is cleared faster and loses effect, and an inducer can induce the metabolism of the very drug that caused it. An inhibitor blocks the enzyme within hours, so the drug accumulates.

Excretion. Renal elimination is the sum of three processes. Glomerular filtration handles free drug only, so a highly protein-bound drug is barely filtered. Active tubular secretion needs a carrier, is saturable, and is therefore a site of competition between drugs. Passive tubular reabsorption returns lipid-soluble, non-ionised drug to the blood, which is why urine pH changes the amount finally excreted.

Drug in bile may be reabsorbed from the intestine and returned to the liver, an enterohepatic circulation that prolongs the drug's action. The lungs excrete volatile drugs, and skin, salivary and mammary glands excrete small amounts.

### Key determinants
The rate and extent of absorption; the fraction bound to plasma protein; the activity of the metabolising enzymes and whether anything is inducing or inhibiting them; renal function; and urine pH.

Change any one and the plasma concentration moves. That is the entire basis of pharmacokinetic drug interaction, of dose adjustment in liver and kidney disease, and of the difference between two patients given the same prescription.

### Clinical significance
This is the most heavily examined part of the module. Of the 68 pharmacology items in the department's own question bank, 52 sit in the pharmacokinetics chapter. Bioavailability was asked as a written definition in both the 2024 and the 2025 sittings. The 2025 paper asked what distinguishes hepatic microsomal from non-microsomal enzymes; the 2024 paper asked what a microsomal enzyme inducer can do, and what increases drug metabolism.

The practical consequences are the ones a student meets on the ward within a year: a drug that fails because another drug induced its metabolism, a drug that becomes toxic because renal function fell, a drug that cannot be given orally because the first pass removes almost all of it.

### Common misconceptions
Incomplete bioavailability is not the same as poor absorption. A drug can be absorbed completely and still barely reach the circulation, because the liver removed it on the first pass.

Protein binding does not block renal elimination outright. It blocks filtration; secretion strips the drug off the protein and clears it anyway.

Induction does not always reduce toxicity. If the toxic species is the metabolite, induction makes things worse.

## published_summary

## published_sections

## hold_these
Bioavailability is the fraction of the dose reaching the systemic circulation unchanged; it is 1 for an intravenous dose by definition.
The small intestine absorbs most drugs, because of surface area.
Only free drug distributes, is filtered, and acts.
Microsomal enzymes are hepatic and inducible; non-microsomal enzymes are neither confined to the liver nor inducible.
Renal elimination is filtration plus secretion minus reabsorption.
An inhibitor acts within hours; an inducer takes days to weeks.

## lose_the_mark
Treating low bioavailability as a failure of absorption when it is a first pass through the liver.
Saying a protein-bound drug cannot be eliminated by the kidney — secretion clears it.
Assuming a metabolite is always less active than the parent drug.
Explaining an interaction by enzyme induction when the plasma level has not moved.

## related_concepts
CON-FND-97E55D75DE9ED1 | CON-FND-F2DD5E50875917 | CON-FND-CF40F32A8A74A0 | CON-FND-040D2633B0A2FE | CON-FND-53FF18E42BC94B | CON-FND-3CECD012838275 | CON-FND-C3B843D7032C7F | CON-FND-44B6AE3E7DDA55 | CON-FND-E34035C5B4FF80 | CON-FND-450B67836EBF1A | CON-FND-88101C454AAF1D | CON-FND-67D5E471045317 | CON-FND-CBA2A73AE9A6D8 | CON-FND-0D3254CF812B1A | CON-FND-FD53CFAE6AAC72 | CON-FND-43BED56FA9D1E9 | CON-FND-87C323BB0CE321 | CON-FND-01E59D0FD26046 | CON-FND-9D89A82094F8AA

## related_articles
ART-108-PHA-MEMBRANE-PASSAGE: the crossing every one of these four steps depends on
ART-108-PHA-KINETIC-PRINCIPLES: half-life, steady state and the two doses derived from these parameters
ART-108-PHA-DRUG-INTERACTIONS: what happens when one drug changes another's ADME
ART-108-PHA-ROUTES: the route that decides whether absorption and the first pass happen at all

## question_ids
[clear]

## resource_ids
[clear]

## article_source_ids
[clear]

## claim_ids
[clear]

## span_ids
[clear]

## annotations
### definition_of · CON-FND-CF40F32A8A74A0
Quote: Bioavailability is the fraction of an administered dose that reaches the systemic circulation unchanged.
Block: body

### definition_of · CON-FND-E34035C5B4FF80
Quote: Hepatic microsomal enzymes are inducible; non-microsomal enzymes are not.
Block: body

### definition_of · CON-FND-01E59D0FD26046
Quote: Active tubular secretion needs a carrier, is saturable, and is therefore a site of competition between drugs.
Block: body

## media

## media_recommendations
### diagram · The first pass, from gut lumen through gut wall and portal vein to the liver
Purpose: Teaches CON-FND-CF40F32A8A74A0. Students who cannot picture the portal circulation cannot see why an oral dose is larger than an intravenous one, and the anatomy is the argument.
Priority: required
Status: needed
Section: Mechanism
Source direction: openly licensed pharmacology text
Rights: must be CC-BY or public domain

### comparison table · Microsomal against non-microsomal drug-metabolising enzymes
Purpose: Teaches CON-FND-E34035C5B4FF80. ILO 18 asks for the comparison across four attributes at once — site, organs, phases catalysed and inducibility — and four parallel attributes are exactly what prose handles worst.
Priority: required
Status: needed
Section: Mechanism
Source direction: openly licensed pharmacology text
Rights: must be CC-BY or public domain

### diagram · Filtration, secretion and reabsorption along the nephron for a drug
Purpose: Teaches CON-FND-88101C454AAF1D. The three processes act at different points along one tubule, and their sum is the answer; a student needs to see where each happens.
Priority: strongly helpful
Status: needed
Section: Mechanism
Source direction: openly licensed physiology text
Rights: must be CC-BY or public domain

## university_notes
kau: Kasr Al Ainy weights this section most heavily of the nine — 52 of the 68 pharmacology questions in the department's own bank fall in this chapter, and both end-of-year papers read draw the majority of their pharmacology marks from it.

## publication_gate
needs_evidence

## evidence_basis
Department book src_af30e4191cb4087f8d3f, "Pharmacokinetics [ADME]", pages 5 to 12, with its Absorption, Distribution, Metabolism and Excretion subsections.
Orientation ILO sheet src_b4f736e3bd809dbee187, ILOs 7 to 23, page 1.
EOY paper src_bd1595e59d116b78436a, 2025 sitting, Section 1 Q13 to Q18 and Section 2 Q3a, answers recovered from the solved copy.
EOY paper src_3deab75f7f81cc5f5260, 2024 sitting, Section 1 Q13 to Q19 and Section 2 QIIIc and QIIId.

## evidence_gaps
No claim or citation record exists for 108 INT.
Four of the book's ADME subsection headings extracted with OCR damage, including the Pharmacokinetics heading itself, so no wording from those headings is quoted and no drug name, dose or number is taken from this book anywhere in the article.
ILOs 51 and 52, on pharmacogenetics and pharmacogenomics, are examined by the ILO sheet and were asked as an MCQ in the 2025 sitting, but the book does not cover them, so this article does not teach them.

## conflicts
The 2024 paper offers "First-pass metabolism occurs only in the liver" as a distractor, which implies that the department counts gut-wall metabolism as part of the first pass. The book's oral-route section names the liver alone. This article follows the paper, which is the more recent and more specific statement, and records the book's position here rather than dropping it.

## last_reviewed

## review_due

## notes
The longest article in the set, matching where the department's own questions fall. It owns seven of the nine live pharmacology concepts, which previously had only the generated topic page ART-FND-TOP-770778D86F as an article; the matching append rows are in 108-INT-concepts-pharmacology-updates.md.

## field_notes
microtopicId: The article covers all four kinetic microtopics and is therefore placed on the subtopic node SYS-FND-T04-S01; no single MIC_ id would be honest.
nanotopicId: The catalogue holds no NAN_ ids for first-year general pharmacology.
questionIds: No questions test this article yet; a question batch for 108 INT has not been authored.
media: No rights-cleared asset exists for 108 INT — three are requested in media_recommendations instead.
lastReviewed: New record; no reviewer has seen it.
reviewDue: A review date is set when a reviewer is assigned.
resourceIds: The Kasr sources are absent from corpus-source-index.json, so citing one fails the corpus check; they are cited in evidence_basis.
articleSourceIds: The same corpus-index gap.
claimIds: No evidence pass has been run for 108 INT (LD-14, MASTER-PLAN.md:117).
spanIds: Spans are evidence records belonging in docs/import-ready/evidence/ in their own file; owed before publication.
publishedSummary: Status is Draft, so no student projection exists yet.
publishedSections: As above.

---

# Item

## id
ART-108-PHA-KINETIC-PRINCIPLES

## title
Fundamental principles of pharmacokinetics

## arabic_title
المبادئ الأساسية لحركية الدواء

## aliases
Plasma half life
Steady state
Loading and maintenance dose
First-order and zero-order kinetics

## subject
pharm

## topic
General pharmacology

## subtopic
Fundamental Principles of Pharmacokinetics

## microtopic

## nanotopic

## primary_node_id
SYS-FND-T04-S01

## secondary_node_ids
DIS-PHA-T01 | DIS-PHA-T08 | DIS-PHA

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1–3 foundation

## reading_time
9

## high_yield
Core

## time_sensitive
stable

## status
Draft

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## module
108 INT

## module_subject
108 INT > Pharmacology > Fundamental Principles of Pharmacokinetics

## universities
kau

## years
KAU_Y1

## summary
Absorption, distribution, metabolism and excretion produce four numbers between them — order of elimination, half-life, volume of distribution and clearance — and those four numbers answer every dosing question a first-year student is asked. How long until the drug works? How long until it is gone? How large a first dose, and how large every dose after it? This article is where the ADME machinery turns into a prescription.

## sections
### Definition
Elimination is first-order when the rate is proportional to concentration, so a constant fraction of the drug goes per unit time. It is zero-order when the eliminating enzyme or carrier is saturated, so a constant amount goes per unit time whatever the concentration.

The plasma half-life is the time in which the plasma concentration falls to half its value.

Steady state is the condition in which the rate of drug entering the body equals the rate leaving it.

A loading dose is an initial dose given to reach the target concentration promptly. A maintenance dose replaces what has been eliminated since the previous dose.

### Mechanism
Order of elimination first, because everything else depends on it. In first-order elimination the half-life is a constant, doubling the dose doubles the steady-state level, and the arithmetic behaves the way intuition expects. Once the process saturates and becomes zero-order, the half-life is no longer fixed and a small increase in dose can produce a large and dangerous rise in concentration.

Half-life is not a primary property of a drug. It follows from the volume of distribution and the clearance together, which is why liver or kidney disease lengthens it and why a drug with a large volume of distribution can have a long half-life despite brisk clearance.

Because a first-order process removes a constant fraction, successive half-lives cover roughly 50, 75, 87.5 and 94 per cent of the distance to the plateau. Four to five half-lives therefore bring repeated dosing to steady state, and about the same number clear the drug after it is stopped.

That number is the reason a loading dose exists. Waiting four to five half-lives is acceptable for an antihypertensive and unacceptable for an antiarrhythmic, so the first dose is made large enough to fill the volume of distribution at once, and subsequent doses only replace what is lost.

The two doses come from different parameters and this is where marks are lost. The loading dose follows from the volume of distribution and the target concentration. The maintenance dose follows from clearance, the target concentration and the dosing interval — and the 2025 paper marked exactly that: clearance multiplied by the desired steady-state concentration and the dosing interval.

Raising the dose raises the plateau; it does not shorten the climb. Only a loading dose changes when the target is reached.

### Key determinants
Clearance and volume of distribution, which between them set half-life. Whether the eliminating process is saturated, which sets the order. The dosing interval, which with clearance sets the plateau. And renal or hepatic function, which changes clearance and so changes all of it.

### Clinical significance
Both sittings read examined this section. The 2025 paper asked for a written definition of plasma half-life for one mark, and asked what is required for a drug to reach steady state — equal rates of administration and elimination. It also asked how the maintenance dose is correctly calculated. The 2024 paper asked which pharmacokinetic principle applies to plasma half-life, marking correct that the half-life is fixed in drugs following first-order elimination, and asked for a written description of the loading dose.

On the ward these four numbers are what therapeutic drug monitoring is built on, and they are why a drug with a narrow therapeutic index and zero-order kinetics is one of the most dangerous things a prescriber handles.

### Common misconceptions
Half-life is not duration of action. A drug may act long after its plasma level has halved, and may stop acting well before.

Zero-order elimination is not slow elimination. It is fixed elimination, and being fixed is what makes proportional reasoning about dose fail.

A larger dose does not reach steady state sooner. It reaches a higher steady state at exactly the same time.

## published_summary

## published_sections

## hold_these
Four to five half-lives to steady state, and four to five to wash out.
The half-life is fixed only while elimination is first-order.
Loading dose comes from the volume of distribution; maintenance dose comes from clearance.
Steady state means rate in equals rate out.

## lose_the_mark
Reading half-life as duration of action.
Calculating a maintenance dose from the volume of distribution.
Expecting a bigger dose to reach steady state faster.
Treating a lengthening half-life as a measurement error rather than as the signature of saturation.

## related_concepts
CON-FND-BB7BEEC27836BE | CON-FND-955AD7B6FE6F03 | CON-FND-3D0ACE759233EC | CON-FND-7A66C16BA5029C | CON-FND-3CC86CC26BF549 | CON-FND-7F59EAD61B05E0

## related_articles
ART-108-PHA-PHARMACOKINETICS-ADME: the four processes these parameters are derived from
ART-108-PHA-POSOLOGY: what happens when the therapeutic index is narrow
ART-108-PHA-ROUTES: infusion is how a steady state is held in practice

## question_ids
[clear]

## resource_ids
[clear]

## article_source_ids
[clear]

## claim_ids
[clear]

## span_ids
[clear]

## annotations
### definition_of · CON-FND-7A66C16BA5029C
Quote: Steady state is the condition in which the rate of drug entering the body equals the rate leaving it.
Block: body

### definition_of · CON-FND-955AD7B6FE6F03
Quote: The plasma half-life is the time in which the plasma concentration falls to half its value.
Block: body

### contrasts_with · CON-FND-BB7BEEC27836BE
Quote: It is zero-order when the eliminating enzyme or carrier is saturated, so a constant amount goes per unit time whatever the concentration.
Block: body

## media

## media_recommendations
### graph · Plasma concentration against time on repeated dosing, reaching steady state over five half-lives
Purpose: Teaches CON-FND-3D0ACE759233EC and CON-FND-7A66C16BA5029C. The sawtooth climbing to a plateau is the single image that makes both the time to steady state and the role of a loading dose obvious, and prose cannot deliver a curve.
Priority: required
Status: needed
Section: Mechanism
Source direction: openly licensed pharmacology text
Rights: must be CC-BY or public domain

### graph · First-order against zero-order elimination on the same axes
Purpose: Teaches CON-FND-BB7BEEC27836BE. An exponential fall beside a straight-line fall shows in one glance why half-life is constant in one and meaningless in the other.
Priority: required
Status: needed
Section: Mechanism
Source direction: openly licensed pharmacology text
Rights: must be CC-BY or public domain

## university_notes
kau: The department book gives this its own section, "Fundamental Principles of Pharmacokinetics", separate from ADME, with Plasma Half Life, Loading dose and Maintenance dose as its three subsections.

## publication_gate
needs_evidence

## evidence_basis
Department book src_af30e4191cb4087f8d3f, "Fundamental Principles of Pharmacokinetics", pages 13 to 14.
Orientation ILO sheet src_b4f736e3bd809dbee187, ILOs 24 to 30, page 2, of which 24, 25, 26 and 27 carry both the SAQ and the MCQ tick.
EOY paper src_bd1595e59d116b78436a, 2025 sitting, Section 1 Q15 and Q17 and Section 2 Q3b.
EOY paper src_3deab75f7f81cc5f5260, 2024 sitting, Section 1 Q17 and Section 2 QIIIb.

## evidence_gaps
No claim or citation record exists for 108 INT.
The book states that steady state is reached after several half-lives without naming a figure, and no Kasr source read gives one in words. The four to five taught here is the standard first-order arithmetic, and the 2024 paper supports it only negatively, by marking "two half-lives" wrong.

## conflicts
The 2025 answer gives the maintenance dose as clearance multiplied by the desired steady-state concentration and the dosing interval, which is a dose per interval. A continuous infusion rate is clearance multiplied by the concentration alone, with no interval term. Both are correct for what they describe; the paper does not say which case it means, and neither reading is dropped here.

## last_reviewed

## review_due

## notes
Carries two of the nine live concepts, CON-FND-3CC86CC26BF549 and CON-FND-7F59EAD61B05E0, which previously had only the generated topic page as an article. No new loading-dose or maintenance-dose concept was minted.

## field_notes
microtopicId: Placed on the subtopic node SYS-FND-T04-S01 under protest — half-life, order of elimination and steady state belong to none of its four microtopics, and no node was invented to hold them.
nanotopicId: The catalogue holds no NAN_ ids for first-year general pharmacology.
questionIds: No questions test this article yet; a question batch for 108 INT has not been authored.
media: No rights-cleared asset exists for 108 INT — two are requested in media_recommendations instead.
lastReviewed: New record; no reviewer has seen it.
reviewDue: A review date is set when a reviewer is assigned.
resourceIds: The Kasr sources are absent from corpus-source-index.json; they are cited in evidence_basis.
articleSourceIds: The same corpus-index gap.
claimIds: No evidence pass has been run for 108 INT (LD-14, MASTER-PLAN.md:117).
spanIds: Spans are evidence records belonging in docs/import-ready/evidence/ in their own file; owed before publication.
publishedSummary: Status is Draft, so no student projection exists yet.
publishedSections: As above.

---

# Item

## id
ART-108-PHA-PHARMACODYNAMICS

## title
Pharmacodynamics: receptors, ligands and the dose-response curve

## arabic_title
الديناميكا الدوائية: المستقبلات والروابط ومنحنى الاستجابة للجرعة

## aliases
Pharmacodynamics
Drug receptor interaction
Agonists and antagonists
Dose-response curve

## subject
pharm

## topic
General pharmacology

## subtopic
Pharmacodynamics

## microtopic

## nanotopic

## primary_node_id
SYS-FND-T04-S02

## secondary_node_ids
DIS-PHA-T02 | DIS-PHA

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1–3 foundation

## reading_time
12

## high_yield
Core

## time_sensitive
stable

## status
Draft

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## module
108 INT

## module_subject
108 INT > Pharmacology > Pharmacodynamics

## universities
kau

## years
KAU_Y1

## summary
Pharmacodynamics asks what a drug does once it has arrived. Most drugs work by binding a receptor, and everything that follows — whether the binding produces an effect, how large that effect can be, how much drug is needed, and what happens when a second drug binds the same receptor — is read off one curve. Learn to read the concentration-response curve and most of this section answers itself. The department examines this half heavily: the same four-mark written question on receptor types and signal transduction appeared in both sittings read.

## sections
### Definition
A receptor is a cellular macromolecule, usually a protein, with which a drug forms a reversible complex that begins the chain of events ending in an effect.

Affinity is the tendency of a drug to form that complex — the ability of a drug to fit onto a receptor.

Efficacy is the maximum response the drug can produce however much is given. Potency is the amount of drug needed to produce a given response.

An agonist binds and produces a response; an antagonist binds and produces none, acting only by preventing an agonist from binding.

### Mechanism
Not every drug uses a receptor. A drug may inhibit or activate an enzyme, block or open an ion channel, compete for a transporter, replace a deficient substance, or act by a purely physical or chemical mechanism, as an antacid does when it neutralises gastric acid. Naming the mechanism is what predicts a drug's selectivity, and a drug with no receptor has very little.

For the drugs that do use a receptor, affinity and efficacy are separate properties, and separating them is the whole of the next three paragraphs.

A full agonist has affinity and full efficacy: it produces the maximum the receptor can give. A partial agonist has affinity but submaximal efficacy: however much is given it cannot reach the maximum, and in the presence of a full agonist it competes for the receptor and so behaves as an antagonist. An inverse agonist has affinity and negative efficacy, reducing the receptor's constitutive activity. An antagonist has affinity and no efficacy at all.

On the curve, potency is position along the dose axis and efficacy is the height of the plateau. The two are independent: of two drugs at the same receptor, the more potent may reach the lower maximum. When the 2025 paper described Drug A reaching 80 per cent and Drug B reaching 100 per cent at the same receptor, the answer was that Drug B has the greater efficacy — a statement about the plateau, not about the dose.

Antagonism divides by whether the block can be overcome. A competitive antagonist binds the same site, so enough agonist displaces it: the curve shifts to the right in parallel, potency falls, and the maximum is eventually still reached. A non-competitive antagonist binds elsewhere or binds irreversibly, so the curve flattens, the maximum falls, and no amount of agonist restores it.

Irreversibility adds a further twist that has nothing to do with the curve. An irreversible antagonist binds covalently, so clearing the drug from plasma does not restore the receptor; the block lifts only when the cell synthesises new receptors, which can take days.

Receptors themselves fall into four families, and they act on four different timescales. Ligand-gated ion channels open a pore directly, in milliseconds. G-protein-coupled receptors act through a G protein and a second messenger, in seconds. Enzyme-linked receptors, such as the tyrosine kinases, phosphorylate intracellular targets over minutes to hours. Intracellular nuclear receptors bind a lipid-soluble ligand and change gene transcription, so their effect appears over hours and outlasts the drug.

Receptors are not fixed in number. Chronic exposure to an agonist reduces receptor number and sensitivity — down-regulation — and chronic exposure to an antagonist increases them, which is why abruptly stopping a long-term antagonist can produce a rebound.

### Key determinants
For any drug at any receptor: its affinity, its efficacy, the concentration reaching the receptor, the number of receptors available, and whether anything else is occupying them.

For the response a patient shows: all of the above, plus how long the drug has been given, because receptor number moves.

### Clinical significance
This section carries the heaviest examined weight in the module. ILO 36 — describe the types of receptors and signal transduction mechanisms — carries both the SAQ and the MCQ tick, and the same four-mark written question appeared in the 2024 and 2025 sittings, asking for the four receptor types and how each transduces signals. Repetition across sittings is the strongest blueprint evidence this corpus holds.

Antagonism was asked in both sittings from opposite directions: the 2024 paper asked what characterises a competitive antagonist and marked "It can be displaced by an excess of the agonist"; the 2025 paper asked how a non-competitive antagonist is distinguished from a competitive one and marked the fall in Emax. The 2025 paper also asked separately about irreversible antagonism.

Clinically, the timescale of the receptor family predicts the timescale of the drug. A steroid given intravenously still acts through gene transcription, so waiting for it to work in minutes is a category error.

### Common misconceptions
Affinity is not potency and potency is not efficacy. An antagonist can have very high affinity and, by definition, zero efficacy.

An antagonist is not a drug with a negative effect. At a quiet receptor it does nothing; what looks like an effect is the removal of agonist tone that was already present.

The parallel rightward shift belongs to the competitive antagonist. The fall in maximum belongs to the non-competitive one. Students remember that the curve moves and forget which way.

## published_summary

## published_sections

## hold_these
Affinity is binding; efficacy is what the binding produces; potency is how much is needed.
Competitive antagonism is surmountable and shifts the curve right; non-competitive antagonism is not and lowers Emax.
An irreversible antagonist's duration is set by receptor turnover, not by its half-life.
Four receptor families, four timescales: channel in milliseconds, G-protein in seconds, enzyme-linked in minutes to hours, nuclear in hours to days.
Chronic agonist down-regulates; chronic antagonist up-regulates.

## lose_the_mark
Calling the drug that works at a smaller dose the better drug — that is potency, and it says nothing about the maximum.
Assigning the parallel rightward shift to the non-competitive antagonist.
Predicting an irreversible antagonist's duration from its plasma half-life.
Expecting a nuclear-receptor drug to act quickly because it was given intravenously.

## related_concepts
CON-FND-1A18E2FEA47B37 | CON-FND-38CD8C0BD5B4DE | CON-FND-17149EED384DCA | CON-FND-4388E0D8A75FD4 | CON-FND-138FC0AB7A3461 | CON-FND-390F2D9EC3D6DC | CON-FND-42F34977A8DF23

## related_articles
ART-108-PHA-INTRODUCTION: the division this half sits inside
ART-108-PHA-DRUG-INTERACTIONS: antagonism that needs no shared receptor
ART-108-PHA-ADVERSE-DRUG-REACTIONS: what receptor adaptation does over time
ART-108-PHA-POSOLOGY: the same curve, read for safety rather than for effect

## question_ids
[clear]

## resource_ids
[clear]

## article_source_ids
[clear]

## claim_ids
CLM-FND-IRREVERSIBLE-ANTAGONISM-01

## span_ids
SPN-PHA-PHARMACODYNAMICS-01

## annotations
### definition_of · CON-FND-38CD8C0BD5B4DE
Quote: Affinity is the tendency of a drug to form that complex — the ability of a drug to fit onto a receptor.
Block: body

### definition_of · CON-FND-17149EED384DCA
Quote: Efficacy is the maximum response the drug can produce however much is given. Potency is the amount of drug needed to produce a given response.
Block: body

### contrasts_with · CON-FND-138FC0AB7A3461
Quote: A non-competitive antagonist binds elsewhere or binds irreversibly, so the curve flattens, the maximum falls, and no amount of agonist restores it.
Block: body

## media

## media_recommendations
### graph · Agonist concentration-response curves with a competitive and a non-competitive antagonist on the same axes
Purpose: Teaches CON-FND-138FC0AB7A3461 and CON-FND-17149EED384DCA. This is the single most examined image in the module — both sittings asked antagonism from the curve — and a parallel shift beside a flattened plateau cannot be carried by a sentence.
Priority: required
Status: needed
Section: Mechanism
Source direction: openly licensed pharmacology text
Rights: must be CC-BY or public domain

### diagram · The four receptor families and their transduction pathways
Purpose: Teaches CON-FND-42F34977A8DF23. A four-mark written question on exactly this appeared in both sittings read; a student answering it must hold four parallel pathways at once, which is what a diagram is for and prose is not.
Priority: required
Status: needed
Section: Mechanism
Source direction: openly licensed pharmacology text
Rights: must be CC-BY or public domain

### graph · Full agonist, partial agonist and inverse agonist on one set of axes
Purpose: Teaches CON-FND-4388E0D8A75FD4. The partial agonist's lower plateau and the inverse agonist's fall below baseline are positions on a graph, and defining them in words is what makes students confuse a partial agonist with a weak one.
Priority: strongly helpful
Status: needed
Section: Mechanism
Source direction: openly licensed pharmacology text
Rights: must be CC-BY or public domain

## university_notes
kau: Kasr Al Ainy asks the receptor-types question as a four-mark structured written answer at the end of year, and it appeared in that form in both the 2024 and the 2025 papers.

## publication_gate
needs_evidence

## evidence_basis
Department book src_af30e4191cb4087f8d3f, "Pharmacodynamics", pages 14 to 19, with its Possible Mechanisms of Action, Definition of a receptor, Concentration-Response Curve, Types of Ligands, Types of Antagonists and Types of receptors subsections.
Orientation ILO sheet src_b4f736e3bd809dbee187, ILOs 31 to 37, page 2, of which 32, 34, 35 and 36 carry both ticks.
EOY paper src_bd1595e59d116b78436a, 2025 sitting, Section 1 Q19, Q20, Q21 and Q23, and Section 2 Q4.
EOY paper src_3deab75f7f81cc5f5260, 2024 sitting, Section 1 Q20 and Q21, and Section 2 QIV.

## evidence_gaps
No claim or citation record exists for 108 INT.
The timescales attached to the four receptor families here are the standard ones. The Kasr sources name the four families and ask how each transduces a signal, but neither the book nor either paper states a timescale, so that framing is an organising device rather than an examined figure.

## conflicts
[clear]

## last_reviewed

## review_due

## notes
Seven concepts, more than any article except the ADME one, and the two heaviest records in the whole batch — CON-FND-42F34977A8DF23 and CON-FND-138FC0AB7A3461 — both sit here.

## field_notes
microtopicId: The article covers all three pharmacodynamics microtopics — receptors, dose-response and therapeutic index is handled in ART-108-PHA-POSOLOGY — so it is placed on the subtopic node rather than in one of them.
nanotopicId: The catalogue holds no NAN_ ids for first-year general pharmacology.
questionIds: No questions test this article yet; a question batch for 108 INT has not been authored.
media: No rights-cleared asset exists for 108 INT — three are requested in media_recommendations instead.
lastReviewed: New record; no reviewer has seen it.
reviewDue: A review date is set when a reviewer is assigned.
resourceIds: The Kasr sources are absent from corpus-source-index.json; they are cited in evidence_basis.
articleSourceIds: The same corpus-index gap.
claimIds: No evidence pass has been run for 108 INT (LD-14, MASTER-PLAN.md:117).
spanIds: Spans are evidence records belonging in docs/import-ready/evidence/ in their own file; owed before publication.
publishedSummary: Status is Draft, so no student projection exists yet.
publishedSections: As above.
conflicts: The book, the ILO sheet and both papers agree throughout this section; no source disagreement was found.

---

# Item

## id
ART-108-PHA-ADVERSE-DRUG-REACTIONS

## title
Adverse drug reactions, tolerance and dependence

## arabic_title
التفاعلات الدوائية الضارة والتحمل والاعتماد

## aliases
Adverse drug reactions
ADR classification
Drug allergy and idiosyncrasy
Tolerance and dependence

## subject
pharm

## topic
General pharmacology

## subtopic
Adverse Drug Reactions

## microtopic
Adverse reactions

## nanotopic

## primary_node_id
SYS-FND-T04-S03-M01

## secondary_node_ids
DIS-PHA-T08 | DIS-PHA-T02 | DIS-PHA

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1–3 foundation

## reading_time
11

## high_yield
Core

## time_sensitive
stable

## status
Draft

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## module
108 INT

## module_subject
108 INT > Pharmacology > Adverse Drug Reactions

## universities
kau

## years
KAU_Y1

## summary
Every drug that does something useful can do something harmful, and the department teaches the harm as a classification rather than as a list. Five letters, A to E, sort every adverse reaction by whether it is dose-related, whether it could have been predicted, and when it appears — and the letter tells you what to do about it. Type B reactions carry most of the exam weight, because that is where allergy, idiosyncrasy and super-sensitivity live, and the papers keep asking students to tell them apart.

## sections
### Definition
An adverse drug reaction is a harmful and unintended response to a drug given at doses used for therapy.

Type A is augmented: a predictable extension of the drug's known action. Type B is bizarre: unpredictable from the pharmacology. Type C follows chronic use. Type D appears after a delay. Type E follows the end of use.

Drug allergy is an immune-mediated reaction. Idiosyncrasy is a qualitatively abnormal response of genetic origin. Super-sensitivity is an exaggerated normal action in response to a small therapeutic dose.

Tolerance is the need for a larger dose to produce the effect an earlier dose produced. Dependence is an adapted state in which the drug is needed to feel or function normally.

### Mechanism
Type A is the drug doing more of what it does. It is common, dose-related, predictable from the mechanism, and it is managed by reducing the dose.

Type B bears no relation to the known pharmacology. It occurs in a susceptible minority, is not dose-related, is often severe, and is managed by stopping the drug and never giving it again.

Inside Type B, the three subtypes have different mechanisms and this is what the papers test. Allergy is an immune response to the drug or one of its metabolites, so it requires prior sensitisation and bears no relation to dose. Idiosyncrasy arises from a genetic difference in an enzyme or a receptor, is present on first exposure, and needs no immune mechanism. Allergy is immune-mediated; idiosyncrasy is genetically determined. Super-sensitivity is quantitatively rather than qualitatively abnormal — the normal action of the drug, exaggerated, after a small dose.

Type C reactions need continued exposure, and tolerance and dependence are the two that matter most here.

Tolerance has two routes. It is pharmacokinetic when the drug induces the enzymes that metabolise it, so less reaches the receptor. It is pharmacodynamic when the receptor adapts: chronic agonist exposure reduces receptor number and sensitivity, which is down-regulation, while chronic antagonist exposure increases them.

Dependence has three grades. Habituation, or psychic dependence, is a desire to continue for the sense of well-being, with no withdrawal syndrome on stopping. Physical dependence is an adapted state in which stopping produces a characteristic withdrawal syndrome, so the drug must be tapered. Addiction combines both with compulsive drug-seeking that overrides the harm being done.

Type D reactions appear long after the exposure that caused them. Teratogenicity is a structural defect produced in the developing fetus; mutagenicity is a heritable change in the genetic material; carcinogenicity is the induction of malignancy.

Type E reactions follow withdrawal of a drug the body has adapted to, and are prevented by tapering rather than by stopping — which is exactly what physical dependence predicts.

### Key determinants
Whether the reaction is dose-related. Whether it could have been predicted from the drug's known action. Whether prior exposure was needed. When it appeared relative to starting, continuing or stopping the drug.

Those four questions assign the letter, and the letter assigns the management.

### Clinical significance
The 2025 paper asked what distinguishes drug allergy from idiosyncrasy and asked for a written definition of super-sensitivity and of mutagenicity. The 2024 paper asked what an exaggerated normal action to a small therapeutic dose is called, and what an altered response due to genetic variation is called. Four separate questions across two sittings land on the Type B subtypes alone.

The 2025 paper also asked which mechanism of acquired tolerance is pharmacodynamic, marking down-regulation of receptors after prolonged agonist administration.

On the ward, the letter is the decision. A Type A reaction usually means the same drug at a smaller dose. A Type B reaction means that drug is finished for that patient, permanently, and should be recorded as such.

### Common misconceptions
Reducing the dose after a Type B reaction. A bizarre reaction is not dose-related, so a smaller dose is not a safer dose.

Classifying by severity. Severity has nothing to do with the letter; a fatal Type A reaction is still Type A.

Calling any unexpected reaction an allergy. Allergy needs an immune mechanism and prior sensitisation; an abnormal first-dose response points to idiosyncrasy.

Treating physical dependence as addiction. A patient on long-term opioid analgesia may be physically dependent and not addicted; what marks addiction is compulsive behaviour, not withdrawal.

Using teratogenicity and mutagenicity as synonyms. One is a malformation in the exposed fetus, the other a heritable change that can be passed on.

## published_summary

## published_sections

## hold_these
Type A is augmented, dose-related and predictable; Type B is bizarre, not dose-related and not predictable.
Allergy is immune-mediated; idiosyncrasy is genetic; super-sensitivity is an exaggerated normal response to a small dose.
Tolerance is pharmacokinetic when the drug induces its own metabolism and pharmacodynamic when the receptor adapts.
Chronic agonist down-regulates receptors; chronic antagonist up-regulates them.
Physical dependence requires a taper; habituation does not.

## lose_the_mark
Halving the dose after a Type B reaction.
Assigning the letter by how serious the reaction was.
Explaining all tolerance by enzyme induction when the drug is not metabolised by an inducible enzyme.
Equating physical dependence with addiction.

## related_concepts
CON-FND-D957928472CA57 | CON-FND-062BA29B028382 | CON-FND-7FFD028F1C7B58 | CON-FND-2A5DE8657047E4 | CON-FND-A1FC8CB691E6C5 | CON-FND-57E821D46F016D

## related_articles
ART-108-PHA-PHARMACODYNAMICS: the receptor adaptation that produces pharmacodynamic tolerance
ART-108-PHA-PHARMACOKINETICS-ADME: enzyme induction, the kinetic route to tolerance
ART-108-PHA-POSOLOGY: the therapeutic index, which predicts how much room there is before harm

## question_ids
[clear]

## resource_ids
[clear]

## article_source_ids
[clear]

## claim_ids
[clear]

## span_ids
[clear]

## annotations
### definition_of · CON-FND-7FFD028F1C7B58
Quote: Allergy is immune-mediated; idiosyncrasy is genetically determined.
Block: body

### definition_of · CON-FND-D957928472CA57
Quote: An adverse drug reaction is a harmful and unintended response to a drug given at doses used for therapy.
Block: body

### causes · CON-FND-57E821D46F016D
Quote: Physical dependence is an adapted state in which stopping produces a characteristic withdrawal syndrome, so the drug must be tapered.
Block: body

## media

## media_recommendations
### comparison table · The five types of adverse drug reaction against dose-dependence, predictability, timing and management
Purpose: Teaches CON-FND-D957928472CA57 and CON-FND-062BA29B028382. ILO 41 asks students to assign a type from a clinical description, which means holding five categories against four attributes at once — twenty cells that prose turns into a paragraph nobody can revise from.
Priority: required
Status: needed
Section: Definition
Source direction: openly licensed pharmacology text
Rights: must be CC-BY or public domain

### diagram · Receptor number over time under chronic agonist and chronic antagonist exposure
Purpose: Teaches CON-FND-A1FC8CB691E6C5. Down-regulation and up-regulation are opposite movements of the same quantity, and students reverse them; two curves settle it.
Priority: strongly helpful
Status: needed
Section: Mechanism
Source direction: openly licensed pharmacology text
Rights: must be CC-BY or public domain

## university_notes
kau: The department book divides this section into five headings, Type A to Type E, and files tolerance and dependence under Type C chronic effects rather than giving them a section of their own.

## publication_gate
needs_evidence

## evidence_basis
Department book src_af30e4191cb4087f8d3f, "Adverse Drug Reactions", pages 20 to 24, with its five Type subsections.
Orientation ILO sheet src_b4f736e3bd809dbee187, ILOs 37 to 44, page 2, of which 38 and 44 carry both ticks.
EOY paper src_bd1595e59d116b78436a, 2025 sitting, Section 1 Q23 and Q24, and Section 2 Q3c and Q3d.
EOY paper src_3deab75f7f81cc5f5260, 2024 sitting, Section 1 Q22 and Q24.

## evidence_gaps
No claim or citation record exists for 108 INT.
Three of the book's five Type headings extracted with OCR damage — Type A, Type B and Type C, the last of them as "lll) Type © (Chronic effects)". The letters and their meanings are recoverable from the ILO sheet, so the classification is safe, but no wording is quoted from those headings and no drug example is taken from the book.
ILO 38 and ILO 44 both carry the SAQ and MCQ ticks and neither appeared in the two sittings read, so the weight they carry rests on the blueprint alone.

## conflicts
[clear]

## last_reviewed

## review_due

## notes
Tolerance and dependence are taught here because the book files them under Type C, but their concepts are placed on the pharmacodynamics node, since the adaptation is a receptor adaptation and the 2025 question tested it as such. Both concepts carry a placed-under-protest note recording that.

## field_notes
nanotopicId: The catalogue holds no NAN_ ids for first-year general pharmacology.
questionIds: No questions test this article yet; a question batch for 108 INT has not been authored.
media: No rights-cleared asset exists for 108 INT — two are requested in media_recommendations instead.
lastReviewed: New record; no reviewer has seen it.
reviewDue: A review date is set when a reviewer is assigned.
resourceIds: The Kasr sources are absent from corpus-source-index.json; they are cited in evidence_basis.
articleSourceIds: The same corpus-index gap.
claimIds: No evidence pass has been run for 108 INT (LD-14, MASTER-PLAN.md:117).
spanIds: Spans are evidence records belonging in docs/import-ready/evidence/ in their own file; owed before publication.
publishedSummary: Status is Draft, so no student projection exists yet.
publishedSections: As above.
conflicts: No source disagreement was found in this section; the papers and the ILO sheet are consistent.

---

# Item

## id
ART-108-PHA-DRUG-INTERACTIONS

## title
Drug interactions

## arabic_title
التداخلات الدوائية

## aliases
Drug interactions
Drug-drug interaction
Synergism and potentiation
Physiological antagonism

## subject
pharm

## topic
General pharmacology

## subtopic
Drug Interactions

## microtopic
Interactions

## nanotopic

## primary_node_id
SYS-FND-T04-S03-M02

## secondary_node_ids
DIS-PHA-T08 | DIS-PHA-T01 | DIS-PHA-T02 | DIS-PHA

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1–3 foundation

## reading_time
8

## high_yield
Core

## time_sensitive
stable

## status
Draft

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## module
108 INT

## module_subject
108 INT > Pharmacology > Drug Interactions

## universities
kau

## years
KAU_Y1

## summary
Two drugs given together may do less than either alone, more than both together, or something neither would do at all. The department teaches interactions by where they happen — in the syringe, along ADME, or at the site of action — because the location predicts everything else, including whether the plasma concentration has moved. It is also where a first-year student meets a distinction worth keeping: antagonism that needs a shared receptor, and antagonism that does not.

## sections
### Definition
A drug interaction is a change in the effect of one drug caused by the presence of another.

A pharmaceutical interaction occurs outside the patient, when two drugs are mixed before administration. A pharmacokinetic interaction occurs when one drug changes another's absorption, distribution, metabolism or excretion. A pharmacodynamic interaction occurs when both drugs act on the same system.

Summation is a combined effect equal to the sum of the separate effects. Synergism is a combined effect greater than that sum. Potentiation is one drug increasing the effect of another that has no such effect of its own. Reversal of action is one drug turning another's effect into its opposite.

### Mechanism
Pharmaceutical interactions are chemical, and they happen in the syringe or the infusion bag. Two drugs may react or one may precipitate the other, and the loss occurs before a molecule reaches the patient.

Pharmacokinetic interactions move the plasma concentration, and every step of ADME offers a mechanism. At absorption, one drug may bind or chelate another in the gut, or change gastric emptying. At distribution, one drug may displace another from plasma protein and raise its free fraction. At metabolism, one drug may induce or inhibit the enzymes handling another — the commonest and most clinically important of the four. At excretion, two drugs may compete for the same saturable tubular carrier, and the one that loses is excreted more slowly.

Pharmacodynamic interactions do not move the plasma concentration at all. Both drugs act on the same system, and the effect moves while the level stays put. That is the diagnostic test: if the effect has changed and the concentration has not, the interaction is pharmacodynamic and no kinetic explanation will fit.

The four possible results of a combination are worth separating carefully, because two of them are routinely confused. Potentiation requires that the potentiating drug have no such effect of its own; if both drugs act, the term is synergism.

Antagonism is the pharmacodynamic interaction the department examines most, and it comes in forms that do not involve a shared receptor. Chemical antagonism is a direct reaction between two substances, so the antagonist inactivates the drug before it reaches any receptor — a chelating agent binding a heavy metal, an antacid neutralising acid. Physiological antagonism is two drugs acting at different receptors on different systems to produce opposite effects on the same measurement, so each cancels the other without either binding the other's site.

### Key determinants
How many drugs the patient is taking. Whether any of them induces or inhibits a metabolising enzyme. Whether any is highly protein-bound. Renal function, which decides how much competition at the tubular carrier matters. And whether two of them act on the same physiological system.

### Clinical significance
The ILO sheet gives interactions three separate objectives — the mechanisms, the consequences given a description, and the possible results of a combination — all MCQ-ticked, and adds chemical and physiological antagonism as an SAQ-ticked objective of its own. The 2024 paper asked for a written description of physiological antagonism for one mark.

Neither sitting read asked a general interaction question, which is worth knowing: the blueprint says this is examined and two papers have not yet shown it, so it should be revised as due rather than as absent.

### Common misconceptions
Reaching for enzyme induction to explain every interaction. Induction is the commonest mechanism, not the only one, and it cannot explain an interaction in which the plasma level is unchanged.

Using synergism and potentiation interchangeably.

Calling any pair of opposing drugs competitive antagonists. Competitive antagonism requires the same binding site; physiological antagonism specifically does not.

## published_summary

## published_sections

## hold_these
Pharmaceutical before the patient, pharmacokinetic along ADME, pharmacodynamic at the site of action.
A pharmacodynamic interaction moves the effect without moving the plasma concentration.
Potentiation needs the potentiating drug to have no such effect of its own; otherwise it is synergism.
Chemical and physiological antagonism need no shared receptor.

## lose_the_mark
Explaining an interaction by enzyme induction when the plasma level has not moved.
Treating synergism and potentiation as the same word.
Calling physiological antagonism competitive because the two drugs oppose each other.

## related_concepts
CON-FND-7F618A3D1F940B | CON-FND-CE72B2E63A736B | CON-FND-A1E2092A49359C

## related_articles
ART-108-PHA-PHARMACOKINETICS-ADME: the four steps a kinetic interaction acts on
ART-108-PHA-PHARMACODYNAMICS: receptor antagonism, which this article contrasts with
ART-108-PHA-ADVERSE-DRUG-REACTIONS: what an interaction produces when it goes wrong

## question_ids
[clear]

## resource_ids
[clear]

## article_source_ids
[clear]

## claim_ids
[clear]

## span_ids
[clear]

## annotations
### definition_of · CON-FND-7F618A3D1F940B
Quote: A pharmaceutical interaction occurs outside the patient, when two drugs are mixed before administration.
Block: body

### contrasts_with · CON-FND-A1E2092A49359C
Quote: Physiological antagonism is two drugs acting at different receptors on different systems to produce opposite effects on the same measurement, so each cancels the other without either binding the other's site.
Block: body

### definition_of · CON-FND-CE72B2E63A736B
Quote: Potentiation requires that the potentiating drug have no such effect of its own; if both drugs act, the term is synergism.
Block: body

## media

## media_recommendations
### flowchart · Deciding the type of a drug interaction from whether the plasma concentration moved
Purpose: Teaches CON-FND-7F618A3D1F940B. ILO 46 asks students to explain an interaction from its description, and the decision turns on one question asked in the right order; a flowchart carries a decision procedure in a way a paragraph does not.
Priority: strongly helpful
Status: needed
Section: Mechanism
Source direction: openly licensed pharmacology text
Rights: must be CC-BY or public domain

## university_notes
kau: The department book gives drug interactions their own section with three subsections — pharmaceutical, pharmacokinetic and pharmacodynamic — and the ILO sheet files chemical and physiological antagonism here rather than with receptor antagonism.

## publication_gate
needs_evidence

## evidence_basis
Department book src_af30e4191cb4087f8d3f, "Drug Interactions [DI]", pages 25 to 26, with its three subsections.
Orientation ILO sheet src_b4f736e3bd809dbee187, ILOs 45, 46, 47 and 48, pages 2 and 3.
Chapter ILO 10 of the same book, "Describe the various mechanisms of drug-drug interactions".
EOY paper src_3deab75f7f81cc5f5260, 2024 sitting, Section 2 QIIIa, a 1-mark written question on physiological antagonism.

## evidence_gaps
No claim or citation record exists for 108 INT.
All three of the book's interaction subsection headings extracted with OCR damage, so no wording from them is quoted and no drug example is taken from the book. The chelating agent and antacid examples used here are generic and are not attributed to any Kasr source.
Neither sitting read asked a general drug-interaction question, so three MCQ-ticked ILOs in this section have no paper evidence at all.

## conflicts
[clear]

## last_reviewed

## review_due

## notes
The smallest heavily-ticked section in the module: four ILOs, one of them SAQ-only, and almost no paper evidence. Written to the blueprint rather than to the papers, which is recorded in the concepts' weight_confidence.

## field_notes
nanotopicId: The catalogue holds no NAN_ ids for first-year general pharmacology.
questionIds: No questions test this article yet; a question batch for 108 INT has not been authored.
media: No rights-cleared asset exists for 108 INT — one is requested in media_recommendations instead.
lastReviewed: New record; no reviewer has seen it.
reviewDue: A review date is set when a reviewer is assigned.
resourceIds: The Kasr sources are absent from corpus-source-index.json; they are cited in evidence_basis.
articleSourceIds: The same corpus-index gap.
claimIds: No evidence pass has been run for 108 INT (LD-14, MASTER-PLAN.md:117).
spanIds: Spans are evidence records belonging in docs/import-ready/evidence/ in their own file; owed before publication.
publishedSummary: Status is Draft, so no student projection exists yet.
publishedSections: As above.
conflicts: No source disagreement was found in this section.

---

# Item

## id
ART-108-PHA-POSOLOGY

## title
Dosage of drugs: the therapeutic index and the therapeutic window

## arabic_title
جرعات الأدوية: المؤشر العلاجي والنافذة العلاجية

## aliases
Posology
Therapeutic index
Therapeutic window
LD50 and ED50

## subject
pharm

## topic
General pharmacology

## subtopic
Dosage of Drugs (Posology)

## microtopic
Therapeutic index

## nanotopic

## primary_node_id
SYS-FND-T04-S02-M03

## secondary_node_ids
DIS-PHA-T02 | DIS-PHA-T08 | DIS-PHA

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1–3 foundation

## reading_time
6

## high_yield
Core

## time_sensitive
stable

## status
Draft

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## module
108 INT

## module_subject
108 INT > Pharmacology > Dosage of Drugs (Posology)

## universities
kau

## years
KAU_Y1

## summary
Posology is the study of dose. Its central question is not how much of a drug works but how much room there is between the dose that works and the dose that harms, and the answer is a ratio. A drug with a wide margin can be given on a standard dose to almost anyone; a drug with a narrow one needs the plasma level measured. This is the shortest section in the module and one of the most useful, because it is what turns everything upstream into a prescribing decision.

## sections
### Definition
The ED50 is the dose producing the desired effect in half of a population. The LD50 is the dose that kills half of it.

The therapeutic index is the ratio of the toxic dose to the effective dose — conventionally LD50 divided by ED50.

The therapeutic window is the range of plasma concentration within which the effect is achieved without toxicity.

### Mechanism
Both figures come from the same place: a population, not a patient. ED50 and LD50 are read from dose-response curves for effect and for lethality plotted on the same axes, and the therapeutic index is the horizontal distance between them expressed as a ratio.

A large therapeutic index means a wide gap between working and harming, so a standard dose is safe for almost everyone and monitoring is unnecessary. A small index means the two curves nearly overlap, so a dose that is therapeutic in one patient may be toxic in another, and the plasma level has to be measured.

The therapeutic window is the same idea moved from dose to concentration, and it is the more useful of the two clinically, because it is what a laboratory can actually report. The index is a property of the drug; the window is what a prescriber aims at in a particular patient.

The two ideas connect back to kinetics. A drug with a narrow window and zero-order elimination is the most dangerous combination in this module: the range is small and the arithmetic that would predict a safe dose does not hold.

### Key determinants
The separation between the effect and toxicity curves for the drug. The variability of the population — how much clearance and volume of distribution differ between patients. And whether a laboratory assay exists, because a narrow window without a measurable level is a hazard nobody can manage.

### Clinical significance
The 2024 paper asked which statement describes the therapeutic index and marked "It is a measure of drug safety" correct. It also offered "It is more clinically relevant than the therapeutic window" as a distractor and marked it wrong, which is the department saying the window is the more clinically relevant of the two.

There is a discrepancy worth noticing here. ILO 49 and ILO 50, which are the two objectives covering this section, carry no tick in any format column on the orientation sheet, yet the 2024 paper examined the therapeutic index directly. The extraction records the same kind of gap for the OSPE column, where the header allots six marks and no ILO is ticked, and flags it for faculty. Revise this section as examined regardless of the blank ticks.

### Common misconceptions
Reading a low therapeutic index as a weak drug. The index says nothing about how well the drug works; it says how little room there is between working and harming.

Treating the index as a property of a patient. It is a population figure; what a patient has is a position inside or outside the window.

## published_summary

## published_sections

## hold_these
The therapeutic index is a measure of safety, not of potency or efficacy.
A narrow therapeutic index means the plasma level must be monitored.
The therapeutic window is the concentration range; the index is the dose ratio.

## lose_the_mark
Calling a drug with a low therapeutic index a weak drug.
Confusing the index, which is a ratio of doses, with the window, which is a range of concentrations.
Skipping this section because its ILOs carry no tick — the 2024 paper asked it anyway.

## related_concepts
CON-FND-BB0DBAE1BC802B

## related_articles
ART-108-PHA-PHARMACODYNAMICS: the dose-response curve the ED50 is read from
ART-108-PHA-KINETIC-PRINCIPLES: why a narrow window and zero-order kinetics is the dangerous combination
ART-108-PHA-ADVERSE-DRUG-REACTIONS: what happens on the far side of the window

## question_ids
[clear]

## resource_ids
[clear]

## article_source_ids
[clear]

## claim_ids
[clear]

## span_ids
[clear]

## annotations
### definition_of · CON-FND-BB0DBAE1BC802B
Quote: The therapeutic index is the ratio of the toxic dose to the effective dose — conventionally LD50 divided by ED50.
Block: body

## media

## media_recommendations
### graph · Effect and lethality dose-response curves on one set of axes, with ED50, LD50 and the gap between them marked
Purpose: Teaches CON-FND-BB0DBAE1BC802B. The therapeutic index is a distance between two curves, and a student who has only ever seen the ratio as a formula cannot say what a narrow one looks like.
Priority: required
Status: needed
Section: Mechanism
Source direction: openly licensed pharmacology text
Rights: must be CC-BY or public domain

## university_notes
kau: The department book gives this section two subsections, Uses of LD50 and Therapeutic Index, and the orientation sheet leaves both of its objectives unticked in every format column — a discrepancy against the 2024 paper that the extraction flags for faculty rather than resolving.

## publication_gate
needs_evidence

## evidence_basis
Department book src_af30e4191cb4087f8d3f, "Dosage of Drugs (Posology)", pages 27 to 28, with its Uses of LD50 and Therapeutic Index subsections.
Orientation ILO sheet src_b4f736e3bd809dbee187, ILOs 49 and 50, page 3, both unticked in all three format columns.
EOY paper src_3deab75f7f81cc5f5260, 2024 sitting, Section 1 Q23, answer recovered from the solved copy at confidence 0.9986.

## evidence_gaps
No claim or citation record exists for 108 INT.
Both of the book's subsection headings for this section extracted with OCR damage — "* Uses of LDs0:" and "*Therapeutic Index (Tl):" — so nothing is quoted from them and no numeric example is taken from the book.
ILOs 49 and 50 carry no tick in any format column, so there is no blueprint statement of how this section is examined; the only evidence is one 2024 MCQ.

## conflicts
The 2024 paper marks "It is more clinically relevant than the therapeutic window" wrong, ranking the window above the index clinically. ILO 50 asks only that the two be distinguished and does not rank them. Both positions are recorded and neither is chosen here.

## last_reviewed

## review_due

## notes
One concept only, and honestly so: ILOs 49 and 50 cover the same set of dosing definitions and neither is separately ticked, so splitting them would invent a distinction the department does not make.

## field_notes
nanotopicId: The catalogue holds no NAN_ ids for first-year general pharmacology.
questionIds: No questions test this article yet; a question batch for 108 INT has not been authored.
media: No rights-cleared asset exists for 108 INT — one is requested in media_recommendations instead.
lastReviewed: New record; no reviewer has seen it.
reviewDue: A review date is set when a reviewer is assigned.
resourceIds: The Kasr sources are absent from corpus-source-index.json; they are cited in evidence_basis.
articleSourceIds: The same corpus-index gap.
claimIds: No evidence pass has been run for 108 INT (LD-14, MASTER-PLAN.md:117).
spanIds: Spans are evidence records belonging in docs/import-ready/evidence/ in their own file; owed before publication.
publishedSummary: Status is Draft, so no student projection exists yet.
publishedSections: As above.

---

# Item

## id
ART-108-PHA-ROUTES

## title
Routes of drug administration and dosage forms

## arabic_title
طرق إعطاء الأدوية وأشكال الجرعات

## aliases
Routes of administration
Enteral and parenteral routes
Intravenous administration
Dosage forms

## subject
pharm

## topic
General pharmacology

## subtopic
Routes of Drug Administration and Dosage Forms

## microtopic

## nanotopic

## primary_node_id
SYS-FND-T04-S01-M01

## secondary_node_ids
DIS-PHA-T01 | DIS-PHA-T08 | DIS-PHA

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1–3 foundation

## reading_time
10

## high_yield
Core

## time_sensitive
stable

## status
Draft

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## module
108 INT

## module_subject
108 INT > Pharmacology > Routes of Drug Administration and Dosage Forms

## universities
kau

## years
KAU_Y1

## summary
The route is the first pharmacokinetic decision anyone makes about a drug, and it settles most of the others: whether the drug is absorbed at all, how fast it acts, whether the liver gets a first pass at it, and how much can be given. The department examines this section by picture — both papers read show a dosage form and ask what route it is for, then ask for the advantages and disadvantages. That format rewards a student who can classify a route and then reason from the classification.

## sections
### Definition
Enteral routes deliver a drug to the gastrointestinal tract: oral, sublingual, buccal and rectal.

Parenteral routes bypass it: intravenous, intramuscular, subcutaneous, intra-arterial, intracardiac, intrathecal and intra-articular.

Topical routes apply a drug to a surface for a local effect, or through a surface for a systemic one.

### Mechanism
The oral route is safe, painless, cheap and self-administered, and it is the route of choice whenever it will work. Its costs are real: slow onset, uselessness in vomiting or unconsciousness, unreliability when gut motility or contents vary, unsuitability for a drug destroyed by gastric acid or digestive enzymes, and exposure to the first pass.

Sublingual and buccal administration keep the convenience and escape the first pass, because the venous drainage of the mouth goes to the systemic circulation rather than to the portal vein. That is why the onset is fast. The rectal route partly escapes the first pass for the same anatomical reason, and works when a patient cannot swallow.

The parenteral routes trade convenience for control. An intravenous drug is completely bioavailable, acts as fast as circulation allows, and cannot be recalled once given.

Intravenous administration itself has three forms, and the 2025 paper asked students to tell them apart. A bolus delivers the whole dose at once for the fastest possible onset. A slow intravenous injection spreads the same dose over minutes so that a dangerous peak is avoided. An infusion delivers the drug continuously at a controlled rate, which is how a steady state is held and how an irritant drug is diluted as it enters.

The remaining parenteral routes are defined by the compartment they reach. Intra-arterial injection delivers drug to one vascular territory, and inadvertent intra-arterial injection of a drug intended for a vein is a recognised hazard because of what it does distally. Intrathecal injection places the drug directly in the cerebrospinal fluid, which is the point: it is used when a drug must reach the central nervous system and the blood-brain barrier will not let it. Intra-articular injection treats one joint while limiting systemic exposure.

### Key determinants
Whether the patient can swallow and absorb. Whether the drug survives acid, enzymes and the first pass. How fast the effect is needed. How much control over the concentration is needed. Whether the target is local or systemic. And whether the preparation is irritant, which changes how it must be given even by a route that is otherwise correct.

### Clinical significance
Both papers read devote a whole section to routes, and both do it by picture. The 2025 paper asked what route a shown form is given by and for two uses of it, asked students to differentiate the three types of intravenous injection for 1.5 marks, asked what can happen with inadvertent injection into an artery, and asked for two indications for intrathecal injection. The 2024 paper asked how the onset of one route can be delayed, what the common sites for it are, what precautions are taken for irritant drugs given intravenously, and for two applications of intra-arterial injection.

Five separate written sub-questions across the two sittings land on the intravenous and other parenteral routes alone — more than on any other single point in the module.

### Common misconceptions
Assuming any tablet placed in the mouth is sublingual. A tablet meant to be swallowed meets the full first pass wherever it started; it is the venous drainage that matters.

Treating "parenteral" as a synonym for "injected". A drug given by inhalation or transdermally has also bypassed the gut.

Choosing a bolus for a drug whose danger is its peak. The total dose can be exactly right and still cause harm, because the harm is in the rate.

## published_summary

## published_sections

## hold_these
Enteral goes to the gut, parenteral bypasses it, topical acts on a surface.
Sublingual and buccal routes escape the first pass because their venous drainage is systemic.
Bolus, slow injection and infusion differ in rate, in control and in what they can safely deliver.
An intravenous dose is completely bioavailable and cannot be recalled.

## lose_the_mark
Calling a swallowed tablet sublingual because it was put in the mouth.
Giving a bolus of a drug whose toxicity is peak-related.
Naming the oral route the fastest because it is the commonest.

## related_concepts
CON-FND-6A60CE8D2E7C5C | CON-FND-3CC8853A7D6DA8 | CON-FND-6235934A8DD0FE

## related_articles
ART-108-PHA-PHARMACOKINETICS-ADME: absorption and the first pass, which the route decides
ART-108-PHA-KINETIC-PRINCIPLES: infusion is how a steady state is held
ART-108-PHA-MEMBRANE-PASSAGE: which membranes each route asks the drug to cross

## question_ids
[clear]

## resource_ids
[clear]

## article_source_ids
[clear]

## claim_ids
[clear]

## span_ids
[clear]

## annotations
### definition_of · CON-FND-6A60CE8D2E7C5C
Quote: Enteral routes deliver a drug to the gastrointestinal tract: oral, sublingual, buccal and rectal.
Block: body

### contrasts_with · CON-FND-6235934A8DD0FE
Quote: A slow intravenous injection spreads the same dose over minutes so that a dangerous peak is avoided.
Block: body

### causes · CON-FND-3CC8853A7D6DA8
Quote: Sublingual and buccal administration keep the convenience and escape the first pass, because the venous drainage of the mouth goes to the systemic circulation rather than to the portal vein.
Block: body

## media

## media_recommendations
### diagram · Venous drainage of the oral, sublingual and rectal routes against the portal circulation
Purpose: Teaches CON-FND-3CC8853A7D6DA8. Why one route meets the first pass and another does not is a piece of anatomy, and a student who cannot see the portal vein cannot reconstruct the answer under exam pressure.
Priority: required
Status: needed
Section: Mechanism
Source direction: openly licensed anatomy or pharmacology text
Rights: must be CC-BY or public domain

### graph · Plasma concentration against time for an intravenous bolus, a slow injection and an infusion
Purpose: Teaches CON-FND-6235934A8DD0FE. The 2025 paper asked students to differentiate the three for 1.5 marks, and the difference is entirely in the shape of three curves that a sentence describes only loosely.
Priority: required
Status: needed
Section: Mechanism
Source direction: openly licensed pharmacology text
Rights: must be CC-BY or public domain

### clinical photograph · A set of common dosage forms, each labelled with its route
Purpose: Teaches CON-FND-6A60CE8D2E7C5C. Both sittings examine this section by showing a dosage form and asking for the route; a student who has only read route names has never practised the task the exam sets.
Priority: required
Status: needed
Section: Definition
Source direction: openly licensed pharmaceutical image set, or photographs taken locally with rights assigned
Rights: must be CC-BY or public domain, or locally produced with rights cleared

## university_notes
kau: Kasr Al Ainy examines this section by picture in the end-of-year written paper — the stem shows a dosage form and asks for the route, its uses, its advantages and its disadvantages. The orientation sheet's OSPE column is unticked throughout, but its header allots the OSPE six marks, and the extraction records that ILOs 53 to 55, which are this section, are the likeliest candidates. That is unresolved and flagged for faculty.

## publication_gate
needs_evidence

## evidence_basis
Department book src_af30e4191cb4087f8d3f, "ROUTES OF DRUG ADMINISTRATION AND DOSAGE FORMS", pages 29 to 33.
Orientation ILO sheet src_b4f736e3bd809dbee187, ILOs 53, 54 and 55, page 3.
Chapter ILO 11 of the same book, "Compare advantage and disadvantage of different routes of administration of drugs".
EOY paper src_bd1595e59d116b78436a, 2025 sitting, Section 3 Q1 to Q6.
EOY paper src_3deab75f7f81cc5f5260, 2024 sitting, Section 3 Q1 to Q6.

## evidence_gaps
No claim or citation record exists for 108 INT.
The routes questions in both papers are picture-led and 14 distinct questions across the two sittings use an image. Which dosage form each stem showed cannot be recovered from the text layer, so the advantages and disadvantages here are taught for each route in general rather than for the particular preparation displayed.
No answer to any Section 3 question is recoverable. They are written questions and the answers on the solved copies were handwritten, so they are absent from the text layer entirely.
This section's divider heading in the book reports page 34 while its subsections report pages 29 to 33, an inconsistency the extraction records; nothing is quoted from the heading.

## conflicts
[clear]

## last_reviewed

## review_due

## notes
Weighted above what a single MCQ tick per ILO would suggest, because five written sub-questions across two sittings land here. If the unresolved OSPE reading is correct and these three ILOs are the practical ones, they are weighted too low even now — recorded on CON-FND-6A60CE8D2E7C5C rather than resolved.

## field_notes
microtopicId: The three route concepts are placed on SYS-FND-T04-S01-M01 under protest, because the taxonomy has no microtopic for routes of administration and Absorption is the nearest honest home; for the intravenous record that is the sharpest stretch in the batch, since an intravenous drug is not absorbed at all. No node was invented.
nanotopicId: The catalogue holds no NAN_ ids for first-year general pharmacology.
questionIds: No questions test this article yet; a question batch for 108 INT has not been authored.
media: No rights-cleared asset exists for 108 INT — three are requested in media_recommendations instead, one of which is the dosage-form photograph this section is examined from.
lastReviewed: New record; no reviewer has seen it.
reviewDue: A review date is set when a reviewer is assigned.
resourceIds: The Kasr sources are absent from corpus-source-index.json; they are cited in evidence_basis.
articleSourceIds: The same corpus-index gap.
claimIds: No evidence pass has been run for 108 INT (LD-14, MASTER-PLAN.md:117).
spanIds: Spans are evidence records belonging in docs/import-ready/evidence/ in their own file; owed before publication.
publishedSummary: Status is Draft, so no student projection exists yet.
publishedSections: As above.
conflicts: No source disagreement was found in this section.
