<!--
  Library articles for 108 INT — Pathology, Year 1, Kasr Al Ainy (kau).

  Eight articles, one per teaching unit of the department's own theoretical
  book, manifest source src_e294bafc730fe7111b06 ("Introduction to Pathology",
  22 pages, native text), extracted into
  ../../../scripts/kasr/extract/108-INT/deptbook.json. The book's own chapters
  and headings are the article boundaries: its front matter becomes one article,
  chapter 1 becomes three (cell injury, necrosis, apoptosis, which is how its own
  headings divide), and chapter 2 becomes four (accumulations, pigments,
  calcification, amyloidosis). Nothing is grouped that the book does not group.

  Between them these eight teach all 49 concepts in
  ../concept/108-INT-concepts-pathology.md, and every concept is named in exactly
  one article's `related_concepts`. That column is the link the importer reads —
  it is what puts an article ID onto a concept record — so it is filled here for
  every concept, and each concept carries the same article back on its own
  `article_ids`.

  Every definition, list, gross description and microscopic description is the
  department book's own. Practical descriptions are the department practical
  book's, src_a2ffe25e8362fe840ceb. Exam wording quoted anywhere in this batch
  comes from the two end-of-year papers, src_bd1595e59d116b78436a (2025) and
  src_3deab75f7f81cc5f5260 (2024). The student-compiled department question bank,
  src_3f8527b376185eb3c2eb, is used only as evidence of topic weighting and is
  never reproduced: it carries "For personal use only, No other uses without
  permission" and is recorded as NOT CLEARED FOR PUBLICATION in
  ../../../scripts/kasr/extract/108-INT/mcq.json.

  Deliberately left out. `resource_ids`, `article_source_ids`, `claim_ids` and
  `span_ids` are blank with stated reasons: the Kasr sources are real and
  checksummed but absent from corpus-source-index.json, and no evidence pass
  exists for this module, so a resource, claim, citation or span ID written here
  would name a record that does not exist. `callout_evidence` is absent for the
  same reason — it exists to bind a callout to a claim and a citation, and there
  are none. Also left out: inflammation, repair and neoplasia. The canonical tree
  has nodes for all three under SYS-FND-T03, and this module's book teaches none
  of them.

  The repository holds zero medical images, so every plate these articles need is
  a `media_recommendations` block for a human to source. The book's own figures
  are inside a copyrighted PDF and are named as briefs, never attached.

  Import: Admin › Bulk import → article. These must be imported before the
  concept batch.
-->

# Item
## id
ART-108-PAT-INTRODUCTION-TO-PATHOLOGY
## title
Introduction to pathology
## arabic_title
مقدمة في علم الأمراض
## aliases
What is pathology
Scope of pathology
General and systemic pathology
Characteristics of disease
Classification of disease
## subject
fnd
## topic
General pathology
## subtopic
Introduction to Pathology
## microtopic
General classification of diseases
## nanotopic

## primary_node_id
SYS-FND-T03
## secondary_node_ids
DIS-PAT
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
## summary
Pathology is the scientific study of disease, and the first two pages of the department book set up everything that follows: the subject is learned in two stages, every disease is described under the same six headings, and diseases as a whole are classified by mechanism. None of that is examined heavily on its own, but a student who cannot separate aetiology from pathogenesis will misread the wording of half the written questions in this module.
## sections
### Definition
Pathology is the scientific study of disease. It includes the functional and structural changes in disease, from the molecular level to the effects on the individual.

It is learned in two stages. General pathology is the study of the main types of disease process — inflammation, tumours and the rest. Systemic pathology is the description of specific diseases as they affect organs or organ systems, lung cancer for example. This module teaches general pathology only, and only its opening: cellular response to injury, and intracellular accumulation and extracellular deposition.

### Mechanism
For each disease entity the book studies six characteristics, in order.

Epidemiology is the distribution and determinants of a disease in different populations. Aetiology is the cause. Causes are genetic abnormalities; environmental factors, which are infective agents, chemicals, radiation and mechanical trauma; primary, idiopathic or cryptogenic disease, where the cause is unknown; and multifactorial disease, due to a combination. Sometimes the exact aetiology is not known but the disease is seen more often in people with certain traits, occupations or habits, and these are risk factors; other risk factors facilitate a disease in an individual, as malnutrition facilitates infection.

Pathogenesis is the mechanism by which the aetiology operates to produce disease. This is the distinction that matters most in the wording of exam questions, and it is the one students lose marks on.

Morphological changes are the structural changes detected by gross examination of organs, at surgery or at autopsy, or by light or electron microscopy. A lesion is the structural abnormality seen in an organ in disease — a mass, an ulcer.

Complications and sequelae are the secondary effects: spread of infection to a distant site, a tumour causing intestinal obstruction. Prognosis is the known likely course of the disease, describing its fate if allowed to follow its natural course, and is of course subject to change by medical or surgical intervention.

### Key determinants
The most widely used general classification of disease is the one based on pathogenesis, or disease mechanism. Most diseases fall under one of two headings.

Congenital disease is either genetic or non-genetic. Acquired disease the book divides five ways: inflammatory, haemodynamic, growth disorders, disordered immunity, and metabolic and degenerative disease.

Reading that list against this module tells a student what 108 INT covers and what it does not. Everything in this book — cell injury, necrosis, apoptosis, accumulations, calcification, amyloidosis — sits under metabolic and degenerative disease, with the immune examples of fibrinoid necrosis and reactive amyloidosis reaching into disordered immunity. Inflammation, haemodynamics and growth disorders are named in the classification and taught later.

### Clinical significance
The six headings are the shape of every case presentation a student will ever give, and the shape of every disease chapter in every book that follows. A disease learned as a list of facts is forgotten; a disease learned as cause, mechanism, morphology, complications and outcome can be reconstructed.

The Egyptian context belongs in the aetiology and epidemiology headings and nowhere else. Where a Western text names a commonest cause, the local one may differ — the book itself does this openly, naming alcohol as the commonest cause of hepatic steatosis "in USA" and leaving Egypt unstated. Read that qualifier every time it appears.

### Common misconceptions
General pathology is not the introductory half and systemic pathology is not the advanced half. The division is by what is being described: a process, or a named disease in a named organ. Both are studied at every level of training.

Congenital does not mean genetic. The book splits congenital disease into genetic and non-genetic, so a condition present at birth because of an intrauterine insult is congenital and not genetic.
## published_summary

## published_sections
[clear]

## hold_these
Pathology is learned in two stages: general pathology, the main types of disease process, and systemic pathology, specific diseases in named organs.
The six characteristics studied for every disease are epidemiology, aetiology, pathogenesis, morphological changes, complications and sequelae, and prognosis.
Aetiology is the cause; pathogenesis is the mechanism by which that cause produces the disease.
A lesion is the structural abnormality seen in an organ in disease.
Prognosis describes the course the disease would take if left to run naturally, before any intervention.
Diseases are classified by pathogenesis into congenital, genetic or non-genetic, and acquired.
Acquired disease is inflammatory, haemodynamic, growth disorders, disordered immunity, or metabolic and degenerative.
## lose_the_mark
Using aetiology and pathogenesis as if they meant the same thing. A question asking for the pathogenesis of hydropic degeneration is not asking what caused it.
Reading congenital as genetic. The book divides congenital disease into genetic and non-genetic.
Treating a risk factor as a cause. The book keeps them separate: a risk factor is an association or a facilitator where the exact aetiology is unknown.
Quoting a Western commonest cause without the qualifier the book itself attaches to it.
## related_concepts
CON-FND-E9DDE81591D0A7 | CON-FND-1712C0F57AAD45 | CON-FND-0BE3CE88A36BB5
## related_articles
ART-108-PAT-CELL-INJURY-AND-ADAPTATION: the first teaching chapter, which the classification of disease by mechanism leads directly into
ART-108-PAT-AMYLOIDOSIS: the module's clearest example of a disease described under all six headings at once
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

## universities
kau
## years
KAU_Y1
## module
108 INT
## module_subject
108 INT > Pathology > Introduction to Pathology
108 INT > Pathology > Introduction to Pathology > General classification of diseases
## university_notes
kau: Kasr Alainy teaches this as the unnumbered front matter of the 108 INT pathology department book, before CHAPTER (1). The book gives it no ILO block of its own, which is why nothing here carries an ILO quotation.
## annotations
### definition_of · CON-FND-E9DDE81591D0A7
Quote: Pathology is the scientific study of disease. It includes the functional and structural changes in disease, from the molecular level to the effects on the individual.
Block: body

### definition_of · CON-FND-1712C0F57AAD45
Quote: Pathogenesis is the mechanism by which the aetiology operates to produce disease.
Block: body

### definition_of · CON-FND-0BE3CE88A36BB5
Quote: The most widely used general classification of disease is the one based on pathogenesis, or disease mechanism.
Block: body
## media

## media_recommendations
### flowchart · The six characteristics of a disease entity as a single sequence, from epidemiology through to prognosis
Purpose: A student must be able to reproduce the six headings in order under exam pressure, and prose gives no shape to hold them in. One figure that shows cause leading to mechanism leading to morphology leading to outcome makes the order recoverable rather than memorised.
Priority: strongly helpful
Status: needed
Kind: flowchart
Section: Mechanism
Source direction: drawn to order from the department book's own list on page 1
Rights: original diagram, no third-party figure required

### comparison table · Congenital versus acquired disease with the book's five subdivisions of acquired disease
Purpose: The classification is a two-level tree written out as prose, and a student asked to place a named disease has to rebuild the tree first. Showing it as a tree removes that step.
Priority: optional
Status: needed
Kind: comparison table
Section: Key determinants
Source direction: drawn to order from the department book's list on page 2
Rights: original diagram
## publication_gate
needs_evidence
## evidence_basis
Kasr Alainy 108 INT pathology department book, manifest source src_e294bafc730fe7111b06, physical pages 1 and 2, native text layer.
The book's own reference list names Robbins Basic Pathology 10th edition and Underwood's Pathology 6th edition; neither was consulted for this article and nothing here is taken from them.
## evidence_gaps
No claim or citation record exists for this module, so nothing in this article is claim-linked.
The book does not say whether a risk factor is a weak aetiology or a separate category, and this article does not settle it.
## conflicts
[clear]

## last_reviewed

## review_due

## notes
This article carries the module's framing and is deliberately the shortest of the eight. It is placed on the topic node SYS-FND-T03 rather than a subtopic because it is about general pathology as a whole; the other seven sit on subtopics or on the section node.
## field_notes
nanotopicId: The module subject tree has two levels under Pathology here — "Introduction to Pathology" and its single child — and nothing below, so there is no nanotopic title to write; searched the catalogue for a NAN_ node covering this material and found none.
questionIds: No questions test this article yet. The 2025 and 2024 papers ask nothing from the book's front matter, and the question batch for this module is a later pass.
resourceIds: The Kasr manifest sources are checksummed and real, but corpus-source-index.json holds only corpus/01-explicitly-taught/ sources, so a resource ID naming src_e294bafc730fe7111b06 would fail the corpus check. The citation is written out in evidence_basis instead.
articleSourceIds: As above — the source that supports this article as a whole is src_e294bafc730fe7111b06, which the corpus source index does not contain.
claimIds: No evidence pass has been run for 108 INT; searched the live claim store for "pathology", "etiology" and "classification of disease" and found nothing that asserts this article's content. Left blank under LD-14 rather than attaching a near-miss claim.
spanIds: A span binds one sentence to the claims that support it, and this module has no claims. Writing a span ID here would name an evidence record that does not exist, which §3 forbids. Reported as a known contract gap rather than filled.
media: No rights-cleared asset exists for this module. Two are requested in media_recommendations; the department book's own figures sit inside a copyrighted PDF and are not attached.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: A review date is set when a reviewer is assigned; setting one now would be a date nobody agreed to.

---

# Item
## id
ART-108-PAT-CELL-INJURY-AND-ADAPTATION
## title
Cellular response to injury
## arabic_title
استجابة الخلية للإصابة
## aliases
Cell injury
Cellular adaptation
Reversible cell injury
Causes of cell injury
Mechanisms of cell injury
Cloudy swelling
## subject
fnd
## topic
General pathology
## subtopic
Cellular Response to Injury
## microtopic
Mechanisms of cell injury
## nanotopic
Reversible Injury (degeneration)
## primary_node_id
SYS-FND-T03-S01
## secondary_node_ids
DIS-PAT-T01
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
## summary
A cell under stress has three options, and they are points on one continuum rather than three separate fates: adapt, take reversible injury, or take irreversible injury and die. Which one it takes depends on how hard the stress is and how long it lasts. This article covers the seven causes of cell injury, the three mechanisms by which they act, and the three morphological patterns of reversible injury — with cloudy swelling first, which is the fact the 2025 paper opened on.
## sections
### Definition
Normal cell function requires a balance between physiological demands and the limitations of cell structure and metabolic capacity; the result is a steady state, or homeostasis. Cells can alter their functional state in response to modest stress to maintain that steady state.

More excessive physiological stresses, or adverse pathologic stimuli, result in adaptation, reversible injury, or irreversible injury and cell death. These responses may be considered a continuum of progressive impairment of cell structure and function.

Adaptation occurs when a physiological or pathological stressor induces a new state that changes the cell but otherwise preserves its viability in the face of the stimulus. There are four adaptive changes: hypertrophy, hyperplasia, atrophy and metaplasia. Reversible injury denotes pathological cell changes that can be restored to normal if the stimulus is removed or if the cause of injury is mild. Irreversible injury occurs when stressors exceed the capacity of the cell to adapt, and denotes permanent pathological changes that cause cell death.

### Mechanism
The book gives seven causes of cell injury and puts one of them first.

Oxygen deprivation, hypoxia, affects aerobic respiration and therefore the ability to generate ATP; the book calls this the extremely important and common cause of cell injury and death. Hypoxia occurs three ways: ischaemia, a deficient blood supply; inadequate oxygenation, as in cardiorespiratory failure; and loss of oxygen-carrying capacity of the blood, as in anaemia and carbon monoxide poisoning. The other six causes are physical agents, including trauma, heat, cold, radiation and electric shock; chemical agents and drugs, including therapeutic drugs, poisons, environmental pollutants, alcohol and narcotics; infectious agents, including viruses, bacteria, fungi and parasites; immunological reactions, including autoimmune disease and injury following the response to infection; genetic derangements, such as chromosomal alterations and specific gene mutations; and nutritional imbalances, including protein–calorie deficiency, lack of specific vitamins, and nutritional excess.

How much injury results depends on the duration and persistence of the injury, the nature of the injurious agent, and the type of cell affected.

Three mechanisms carry the injury out, and they converge. The first is interference with aerobic respiration in the mitochondria. Reduced ATP impairs the biochemical processes that depend on it: the sodium pump loses activity, so sodium accumulates inside the cell with influx of water into the cell causing it to swell; protein synthesis is interfered with; and intracellular calcium rises, because calcium levels are kept in check by ATP-dependent enzymes.

The second is accumulation of reactive oxygen species. Free radicals, including reactive oxygen species, are chemical species that have a single unpaired electron in an outer orbit, which makes them highly reactive, so that they interact with and alter adjacent molecules. They are produced normally in small amounts during the redox reactions of mitochondrial respiration. The species named are superoxide, the hydroxyl radical and hydrogen peroxide, and normally there is a balance between free radicals and defence mechanisms, which include antioxidants such as vitamin E and enzymes such as superoxide dismutase. In some situations the defences are overcome and free radicals interact with membrane lipids by peroxidation, and with cellular proteins and DNA — that is oxidative stress. Free radicals play a major role in reperfusion injury, following restoration of blood flow in ischaemic tissue, and in cellular ageing, chemical injury and radiation damage.

The third is disruption of membranes, which is the common result of the first two. ATP depletion affects the sodium pump of the plasma membrane; rising intracellular calcium activates phospholipases that break membranes down; free-radical peroxidation of membrane lipids damages the structure further; and disruption of lysosomal membranes releases DNAases and proteases into the cytosol, leading to death of the cell.

### Key determinants
Reversible injury shows three morphological patterns, in order of severity.

Cloudy swelling is one of the earliest changes seen in injury, and is due to loss of the sodium pump with accumulation of sodium and water inside the cell. The cell is swollen and the cytoplasm appears granular. It is seen in liver cells, myocardial cells and renal tubular cells — the three cell types with the highest metabolic demand and the most to lose from ATP failure.

Hydropic, ballooning or vacuolar change has the same mechanism as cloudy swelling but is more advanced. The cells are swollen with excess water, and the cytoplasm is pale and shows multiple vacuoles.

Fatty change occurs in hypoxic and toxic injury. Lipid appears as empty vacuoles in the cytoplasm, in cells involved in or dependent on fat metabolism such as hepatocytes and myocardial cells. Fatty change in myocardium can be spotty, in ischaemia, or diffuse, in toxaemia as in diphtheria. The book treats fatty change again in chapter 2 as an intracellular accumulation, and the fuller account is in the accumulations article.

Beyond these three, cell death occurs primarily through two morphological patterns and mechanisms: necrosis and apoptosis, each with its own article.

### Clinical significance
The continuum is what makes reperfusion injury intelligible, and reperfusion injury is why the continuum matters clinically. Restoring blood flow to an ischaemic organ delivers oxygen to tissue whose antioxidant defences are already spent, and the burst of free radicals injures cells that survived the ischaemic period. A student who has learned "restore the circulation" as an unqualified good cannot explain why an infarct can extend after the vessel is opened.

The three cell types named for cloudy swelling — liver, myocardium, renal tubule — are the same three that appear throughout this module: they take the fatty change, they take the coagulative necrosis of infarction, and they take the amyloid. That is not coincidence but the same fact restated: cells with high metabolic demand and dependence on continuous perfusion fail first, whatever the insult.

### Common misconceptions
Adaptation, reversible injury and irreversible injury are not three alternatives a cell chooses between. They are points on one continuum, and the same stimulus moves a cell along it as it grows stronger or lasts longer.

Hypoxia and ischaemia are not the same word. Ischaemia is one of three routes to hypoxia, and the one that also withdraws substrate and lets metabolites accumulate; anaemia and carbon monoxide poisoning produce hypoxia with the blood supply intact.

Free radicals are not purely pathological. They are made routinely during mitochondrial respiration, and the injury is a failure of the balance rather than the presence of the radical.
## published_summary

## published_sections
[clear]

## hold_these
A cell answers stress with adaptation, reversible injury, or irreversible injury and death, and the three are one continuum.
The four adaptations are hypertrophy, hyperplasia, atrophy and metaplasia.
Hypoxia is the commonest cause of cell injury and reaches the cell three ways: ischaemia, inadequate oxygenation, and loss of oxygen-carrying capacity.
ATP depletion stops the sodium pump, so sodium and then water enter the cell and it swells.
The reactive oxygen species are superoxide, the hydroxyl radical and hydrogen peroxide; the defences are antioxidants such as vitamin E and enzymes such as superoxide dismutase.
Free radicals play a major role in reperfusion injury, cellular ageing, chemical injury and radiation damage.
Lysosomal membrane rupture releases DNAases and proteases into the cytosol and kills the cell.
Cloudy swelling is the earliest morphological change of reversible injury, and is seen in liver, myocardial and renal tubular cells.
Hydropic change is cloudy swelling further advanced; fatty change is the third reversible pattern.
## lose_the_mark
Answering "loss of ATP" when asked what causes reperfusion injury. The answer is increased free radicals, and the 2025 paper offered ATP loss as a distractor.
Naming fatty change or nuclear pyknosis as the earliest change of reversible injury. It is cloudy swelling.
Explaining cell swelling as osmosis alone, without the ATP-dependent sodium pump that failed first.
Using hypoxia and ischaemia interchangeably.
Listing only the mechanisms and not the causes, or the reverse, when a question asks for one of them by name.
## related_concepts
CON-FND-D53E254A82F334 | CON-FND-DF726F864C8BC3 | CON-FND-8989A49BEBCF14 | CON-FND-375B9454502DE8 | CON-FND-7B96FFE8FC4285 | CON-FND-2126819970522D | CON-FND-2DDF56DA42A0A8
## related_articles
ART-108-PAT-NECROSIS: irreversible injury by the first of its two patterns, which this article stops at the threshold of
ART-108-PAT-APOPTOSIS: irreversible injury by the second pattern
ART-108-PAT-INTRACELLULAR-ACCUMULATIONS: the fuller account of fatty change, which this article names as the third reversible morphology
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

## universities
kau
## years
KAU_Y1
## module
108 INT
## module_subject
108 INT > Pathology > Cellular Response to Injury
108 INT > Pathology > Cellular Response to Injury > Effects of cell injury stimuli
108 INT > Pathology > Cellular Response to Injury > Causes of cell injury
108 INT > Pathology > Cellular Response to Injury > Mechanisms of cell injury
108 INT > Pathology > Cellular Response to Injury > Morphologic Alternations in Cell Injury > Reversible Injury (degeneration)
## university_notes
kau: Kasr Alainy sets nine ILOs for this chapter, including "Discuss mechanism of cell injury", "Discuss reversible cell injury", "Describe the effects of cell injury", "Discuss the pathogenesis of hydropic degeneration" and "Describe morphological changes of intracellular water accumulation". The pathogenesis wording is deliberate: the paper asks for mechanism, not cause.
## annotations
### definition_of · CON-FND-D53E254A82F334
Quote: These responses may be considered a continuum of progressive impairment of cell structure and function.
Block: body

### definition_of · CON-FND-DF726F864C8BC3
Quote: There are four adaptive changes: hypertrophy, hyperplasia, atrophy and metaplasia.
Block: body

### causes · CON-FND-8989A49BEBCF14
Quote: Hypoxia occurs three ways: ischaemia, a deficient blood supply; inadequate oxygenation, as in cardiorespiratory failure; and loss of oxygen-carrying capacity of the blood, as in anaemia and carbon monoxide poisoning.
Block: body

### definition_of · CON-FND-375B9454502DE8
Quote: the sodium pump loses activity, so sodium accumulates inside the cell with influx of water into the cell causing it to swell
Block: body

### definition_of · CON-FND-7B96FFE8FC4285
Quote: In some situations the defences are overcome and free radicals interact with membrane lipids by peroxidation, and with cellular proteins and DNA — that is oxidative stress.
Block: body

### definition_of · CON-FND-2126819970522D
Quote: Free radicals play a major role in reperfusion injury, following restoration of blood flow in ischaemic tissue, and in cellular ageing, chemical injury and radiation damage.
Block: body

### definition_of · CON-FND-2DDF56DA42A0A8
Quote: Cloudy swelling is one of the earliest changes seen in injury, and is due to loss of the sodium pump with accumulation of sodium and water inside the cell.
Block: body
## media

## media_recommendations
### flowchart · Hypoxia to ATP depletion to the three downstream failures — sodium pump, protein synthesis, intracellular calcium — converging on membrane disruption
Purpose: The three mechanisms of cell injury are taught as a list but act as a converging network, and a student who holds them as a list cannot answer "discuss mechanism of cell injury" in a way that scores. One figure showing the convergence is what turns the list into an argument.
Priority: required
Status: needed
Kind: flowchart
Section: Mechanism
Source direction: drawn to order from the department book's pages 4 and 5
Rights: original diagram, no third-party figure required
Notes: Serves CON-FND-375B9454502DE8, CON-FND-7B96FFE8FC4285 and CON-FND-2126819970522D.

### histology · Liver or renal tubule showing cloudy swelling: swollen cells with granular cytoplasm and preserved nuclei
Purpose: Teaches CON-FND-2DDF56DA42A0A8. Cloudy swelling is the earliest change and the hardest to see, because nothing dramatic has happened yet; a student who has only read "granular cytoplasm" will not recognise it and will reach for the more obvious vacuolated field instead.
Priority: required
Status: needed
Kind: histology
Section: Key determinants
Source direction: openly licensed pathology teaching set or institutional collection
Rights: must be CC-BY or public domain, no all-rights-reserved textbook figure

### diagram · The continuum from homeostasis through adaptation and reversible injury to cell death, with the stimulus strength and duration on one axis
Purpose: Teaches CON-FND-D53E254A82F334. The book's own word is continuum, and prose that lists three responses in sequence reads as three boxes; the point is that there are no boxes.
Priority: strongly helpful
Status: needed
Kind: diagram
Section: Definition
Source direction: drawn to order from the department book's page 3
Rights: original diagram
## publication_gate
needs_evidence
## evidence_basis
Kasr Alainy 108 INT pathology department book, manifest source src_e294bafc730fe7111b06, physical pages 3 to 5, native text layer, including the chapter's own nine-item ILO block.
Exam weighting from the 2025 and 2024 end-of-year papers, src_bd1595e59d116b78436a and src_3deab75f7f81cc5f5260, and from the topic distribution of the department question bank src_3f8527b376185eb3c2eb, which is counted and not quoted.
## evidence_gaps
No claim or citation record exists for this module, so nothing in this article is claim-linked.
The book does not say at what point on the continuum reversibility is lost, and this article does not supply a threshold.
The book gives vitamin E and superoxide dismutase as the antioxidant defences without saying whether that is the whole list.
## conflicts
The book lists fatty change among the morphologies of reversible injury in chapter 1 and again as an intracellular accumulation in chapter 2. That is one lesion filed twice by one book rather than two sources disagreeing; this article names it and points to the accumulations article for the full account.
## last_reviewed

## review_due

## notes
Placed on the section node SYS-FND-T03-S01 because it spans all four of that section's microtopics rather than sitting in one. The necrosis and apoptosis articles take the microtopic nodes M02 and M03.
## field_notes
questionIds: No questions test this article yet; the question batch for 108 INT is a later pass by another agent, and it will resolve against this article's ID.
resourceIds: The Kasr manifest sources are checksummed and real but absent from corpus-source-index.json, which holds only corpus/01-explicitly-taught/ sources, so a resource ID naming src_e294bafc730fe7111b06 would fail the corpus check. Written out in evidence_basis instead.
articleSourceIds: As above — the supporting source is src_e294bafc730fe7111b06, which the corpus source index does not contain.
claimIds: No evidence pass has been run for 108 INT. Searched the live claim store for "cell injury", "free radical", "reperfusion" and "cloudy swelling"; the only near hits are immunology and muscle-energetics claims that assert something else. Left blank under LD-14.
spanIds: A span binds one sentence to the claims supporting it, and this module has no claims. Writing a span ID would name an evidence record that does not exist. Reported as a known contract gap.
media: No rights-cleared asset exists for this module. Three are requested in media_recommendations.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: A review date is set when a reviewer is assigned.

---

# Item
## id
ART-108-PAT-NECROSIS
## title
Necrosis and its types
## arabic_title
النخر وأنواعه
## aliases
Necrosis
Types of necrosis
Coagulative necrosis
Caseation
Fat necrosis
Fibrinoid necrosis
Karyorrhexis
## subject
fnd
## topic
General pathology
## subtopic
Cellular Response to Injury
## microtopic
Types of necrosis
## nanotopic
Coagulative necrosis (ischemic necrosis)
## primary_node_id
SYS-FND-T03-S01-M02
## secondary_node_ids
DIS-PAT-T01
DIS-PAT-T08
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
## summary
Necrosis is death of a group of cells within a living body, and it is the single heaviest topic in this module: 25 of the 58 pathology questions in the department bank turn on it, and both end-of-year papers ask for its types. Two processes make its morphology — protein denaturation and enzymatic digestion — and which of the two wins decides which of the five types results.
## sections
### Definition
Necrosis is death of a group of cells within a living body. Both qualifiers carry weight: it kills a group rather than an individual cell, and it happens inside a living organism rather than after death.

With severe or prolonged moderate injury there is loss of membrane integrity and release of lysosomal enzymes into the cytosol, destroying the cellular constituents. There is also leakage of cell constituents into the surrounding tissue, resulting in an inflammatory response. Necrotic areas are removed by macrophages and repaired by fibrosis, and dystrophic calcification may occur.

Two processes underlie the basic morphological changes: denaturation of proteins, and enzymatic digestion of organelles and other cytosolic components. Everything that follows is a consequence of which of these two predominates.

### Mechanism
The nucleus changes three ways. Karyolysis is fading of nuclear basophilia. Pyknosis is nuclear shrinkage, followed by karyorrhexis. Karyorrhexis is destructive nuclear fragmentation. Eventually the nucleus disappears completely.

The cytoplasm changes too. Necrotic cells are more eosinophilic — they stain pinker with haematoxylin and eosin — partly because of the loss of cytoplasmic RNA, which binds the blue dye haematoxylin, and partly because of denatured cytoplasmic proteins, which bind the red dye eosin. There is a loss of cell border definition. Later the necrotic tissue appears structureless pink because of autolysis by lysosomal enzymes.

Read the two processes against those changes and the types of necrosis stop being a list to memorise. Where denaturation predominates and the digesting enzymes are themselves denatured, the outlines survive and the tissue stays firm — coagulative necrosis. Where enzymatic digestion predominates, or the tissue has little structural protein to hold a shape, the tissue liquefies. Where a third material is involved — bacterial lipid, released fat, fibrin-like protein — the type takes its name from that material.

### Key determinants
There are five types.

Coagulative necrosis, also called ischaemic necrosis, occurs because of acute ischaemia, a sudden decrease in blood supply, and is due to protein denaturation. Presumably the injury denatures structural proteins as well as the enzymes that cause proteolysis, so the cellular outlines are maintained for some time. The necrotic area is initially white or yellow but of normal consistency — infarction of kidney, spleen and heart. Microscopic examination shows loss of nuclei and increased eosinophilia of the cytoplasm with retention of the general cellular outline, appearing as a ghost of the original tissue. Eventually the outline is lost, the tissue breaks down and appears structureless pink, inflammatory cells infiltrate it, and macrophages remove the dead tissue.

Liquefactive or colliquative necrosis occurs in CNS infarctions, where the tissues are rich in lipid, soft and lack supporting stroma. The necrotic area becomes surrounded by glial tissue and is changed into a cyst. Pus in suppurative inflammation is also an example of liquefactive necrosis — and that second example is the one examiners reach for.

Caseation necrosis is a type of necrosis where the necrotic tissue appears semi-solid, yellowish and cheese-like, from casein. Under the microscope it appears as granular structureless pink material. It occurs mainly in tuberculosis, due to tissue digestion by activated macrophages; liberation of lipids from the tubercle bacillus capsule adds to the cheese-like appearance.

Fat necrosis is of two types. Traumatic fat necrosis follows trauma to adipose tissue, which releases intracellular fat and provokes an inflammatory response; macrophages engulf the fat and fibrosis follows, and a common site is the breast, where it results in a palpable mass. Enzymatic fat necrosis occurs in acute pancreatitis, where there is leakage of pancreatic lipase, which acts on mesenteric fat cells splitting fat into fatty acids, which combine with calcium to form white calcium soaps.

Fibrinoid necrosis is a special form in which the necrotic material has staining reactions resembling fibrin: the material is deep red and homogeneous with haematoxylin and eosin. It is seen with collagen damage in some autoimmune diseases such as rheumatoid arthritis, and in immune reactions involving blood vessels, such as polyarteritis nodosa.

### Clinical significance
Two of the five types are the reason a student can read an organ from its description alone. A firm, pale, wedge-shaped area in a kidney or spleen is coagulative necrosis and means an artery closed. A soft, cystic cavity in the brain is liquefactive and means the same thing happened in tissue that could not hold its shape. The infarct is one event; the appearance is the tissue's answer to it.

Caseation is the one type that names a disease. Tuberculosis remains a live diagnosis in Egypt in a way it is not in the sources these books draw on, and it appears again in this module as a cause of reactive amyloidosis and as an example of dystrophic calcification in old lesions — three separate places where the same organism sets the answer.

Necrosis is also where this module's two chapters meet. Dystrophic calcification occurs in necrotic tissue; old tuberculous lesions and fat necrosis are two of the six examples on the book's own dystrophic list.

### Common misconceptions
Necrosis is not simply cell death. It is death of a group of cells within a living body, and both qualifiers are marked.

Caseation is not firm because the architecture survives. It is structureless — the architecture is completely gone — and that is exactly what separates it from coagulative necrosis, the other type that stays solid.

Pyknosis and karyorrhexis are not the same change. Pyknosis is shrinkage of the whole nucleus into a dense mass; karyorrhexis is fragmentation of it.

Fat necrosis is not an accumulation of fat inside cells. It is death of adipose tissue; the accumulation of triglyceride inside living parenchymal cells is fatty change, and the 2024 paper used exactly that swap as a distractor.
## published_summary

## published_sections
[clear]

## hold_these
Necrosis is death of a group of cells within a living body.
The two processes underlying its morphology are denaturation of proteins and enzymatic digestion of organelles and cytosolic components.
Karyolysis is fading of nuclear basophilia, pyknosis is nuclear shrinkage, karyorrhexis is nuclear fragmentation.
Necrotic cytoplasm stains pinker because RNA that bound haematoxylin is lost and denatured protein binds eosin.
Coagulative necrosis follows acute ischaemia and keeps the cell outline as a ghost of the original tissue, in kidney, spleen and heart.
Liquefactive necrosis occurs in CNS infarction and in pus.
Caseation necrosis is semi-solid, yellowish and cheese-like, occurs mainly in tuberculosis, and is structureless under the microscope.
Enzymatic fat necrosis occurs in acute pancreatitis and forms white calcium soaps; traumatic fat necrosis occurs in the breast and forms a palpable mass.
Fibrinoid necrosis is deep red and homogeneous on H&E and marks autoimmune collagen and vessel damage.
Necrotic tissue is removed by macrophages and repaired by fibrosis, and may calcify dystrophically.
## lose_the_mark
Naming only the brain when asked where liquefactive necrosis occurs. Pus is liquefactive necrosis, and the 2024 answer was the centre of a pyogenic abscess against three solid-organ infarcts.
Confusing pyknosis with karyorrhexis. The 2024 paper asked for karyorrhexis by its definition alone.
Saying caseation retains tissue architecture because it is firm. It is structureless.
Describing fat necrosis as intracellular accumulation of neutral lipids, or attributing calcium soaps to the traumatic form.
Giving fibrinoid necrosis as containing fibrin. It only stains like fibrin; the name records an appearance.
Answering a "type of necrosis in autoimmune vessel disease" question with caseation or coagulative. It is fibrinoid.
## related_concepts
CON-FND-4CD77608FB35DF | CON-FND-8DA30AD870AC1E | CON-FND-5285A9707E61CA | CON-FND-88508ABAB84A67 | CON-FND-5B3B6BA12670C7 | CON-FND-6626C19B61A23B | CON-FND-BA0739479AD0FC
## related_articles
ART-108-PAT-CELL-INJURY-AND-ADAPTATION: the injury that precedes necrosis, and the mechanisms that produce it
ART-108-PAT-APOPTOSIS: the other pattern of cell death, and the comparison students are asked for
ART-108-PAT-PATHOLOGICAL-CALCIFICATION: dystrophic calcification, which necrotic tissue undergoes
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

## universities
kau
## years
KAU_Y1
## module
108 INT
## module_subject
108 INT > Pathology > Cellular Response to Injury > Necrosis
108 INT > Pathology > Cellular Response to Injury > Necrosis > Types of necrosis > Coagulative necrosis (ischemic necrosis)
108 INT > Pathology > Cellular Response to Injury > Necrosis > Types of necrosis > Liquefactive or colliquative necrosis
108 INT > Pathology > Cellular Response to Injury > Necrosis > Types of necrosis > Caseation necrosis
108 INT > Pathology > Cellular Response to Injury > Necrosis > Types of necrosis > Fat necrosis
108 INT > Pathology > Cellular Response to Injury > Necrosis > Types of necrosis > Fibrinoid necrosis
## university_notes
kau: The Kasr Alainy chapter ILOs ask the student to "Describe the morphological picture of necrosis", "Discuss fate of necrotic tissue" and "Discuss different types of necrosis". The fate of necrotic tissue is a separate ILO from its morphology and is examined as one: removal by macrophages, repair by fibrosis, and possible dystrophic calcification.
## annotations
### definition_of · CON-FND-4CD77608FB35DF
Quote: Necrosis is death of a group of cells within a living body.
Block: body

### definition_of · CON-FND-8DA30AD870AC1E
Quote: Karyolysis is fading of nuclear basophilia. Pyknosis is nuclear shrinkage, followed by karyorrhexis. Karyorrhexis is destructive nuclear fragmentation.
Block: body

### definition_of · CON-FND-5285A9707E61CA
Quote: Presumably the injury denatures structural proteins as well as the enzymes that cause proteolysis, so the cellular outlines are maintained for some time.
Block: body

### definition_of · CON-FND-88508ABAB84A67
Quote: Pus in suppurative inflammation is also an example of liquefactive necrosis — and that second example is the one examiners reach for.
Block: body

### definition_of · CON-FND-5B3B6BA12670C7
Quote: Caseation necrosis is a type of necrosis where the necrotic tissue appears semi-solid, yellowish and cheese-like, from casein.
Block: body

### definition_of · CON-FND-6626C19B61A23B
Quote: Enzymatic fat necrosis occurs in acute pancreatitis, where there is leakage of pancreatic lipase, which acts on mesenteric fat cells splitting fat into fatty acids, which combine with calcium to form white calcium soaps.
Block: body

### definition_of · CON-FND-BA0739479AD0FC
Quote: Fibrinoid necrosis is a special form in which the necrotic material has staining reactions resembling fibrin: the material is deep red and homogeneous with haematoxylin and eosin.
Block: body
## media

## media_recommendations
### histology · Renal infarct at low power: coagulative necrosis with preserved cell outlines beside viable renal tissue, inflammatory cells at the margin
Purpose: Teaches CON-FND-5285A9707E61CA. The whole point is that dead tissue still looks like kidney, and no prose description makes a student believe that until they have seen the ghost outlines beside living tubules in one field.
Priority: required
Status: needed
Kind: histology
Section: Key determinants
Source direction: openly licensed pathology teaching set; the department practical book carries this as a data-show item and its own image is inside a copyrighted PDF
Rights: must be CC-BY or public domain

### histology · Traumatic fat necrosis: ghosts of fat cells surrounded by foamy macrophages and multinucleated giant cells
Purpose: Teaches CON-FND-6626C19B61A23B. The department practical examines this as a data-show item and asks for a description; a student who has read the words but not seen the field cannot produce one.
Priority: required
Status: needed
Kind: histology
Section: Key determinants
Source direction: openly licensed pathology teaching set
Rights: must be CC-BY or public domain

### clinical photograph · Mesenteric fat necrosis in acute pancreatitis, showing white chalky deposits
Purpose: Teaches CON-FND-6626C19B61A23B. The examiner's phrase is "chalky white", and the 2024 paper marked it as the correct option; a photograph fixes what chalky white means on real mesentery in a way the phrase alone does not.
Priority: strongly helpful
Status: needed
Kind: clinical photograph
Section: Key determinants
Source direction: openly licensed surgical or autopsy image collection; the department book's own Figure (1.1) shows this and is not rights-cleared
Rights: must be CC-BY or public domain

### comparison table · The five types of necrosis against tissue affected, gross appearance, microscopic appearance and typical cause
Purpose: Both end-of-year papers ask for types of necrosis, and the department bank returns to them constantly. The five are learned as five paragraphs and examined as one comparison, and the table is the form the question is actually asked in.
Priority: required
Status: needed
Kind: comparison table
Section: Key determinants
Source direction: drawn to order from the department book's pages 6 and 7
Rights: original diagram
## publication_gate
needs_evidence
## evidence_basis
Kasr Alainy 108 INT pathology department book, manifest source src_e294bafc730fe7111b06, physical pages 6 and 7, native text layer.
Kasr Alainy 108 INT pathology practical book, src_a2ffe25e8362fe840ceb, for the renal infarct and traumatic fat necrosis items on physical page 7.
Weighting from the 2025 and 2024 end-of-year papers and from the topic distribution of the department question bank src_3f8527b376185eb3c2eb, in which 25 of 58 pathology rows turn on necrosis. That bank is counted, never quoted.
## evidence_gaps
No claim or citation record exists for this module, so nothing in this article is claim-linked.
The book says coagulative outlines are maintained "for some time" without giving an interval.
The book names caseation as occurring "mainly" in tuberculosis without listing the other causes.
The book does not say whether traumatic fat necrosis also forms calcium soaps; it attaches them to the enzymatic form only.
## conflicts
[clear]

## last_reviewed

## review_due

## notes
This is the heaviest article in the module by exam weight and the one a question batch should draw on first. The five types are written as five separate concepts rather than one, because both papers ask for them individually and a single "types of necrosis" concept could not carry five distinct objectives.
## field_notes
questionIds: No questions test this article yet; the 108 INT question batch is a later pass and will resolve against this article's ID.
resourceIds: The Kasr manifest sources are checksummed and real but absent from corpus-source-index.json, which holds only corpus/01-explicitly-taught/ sources, so a resource ID naming src_e294bafc730fe7111b06 would fail the corpus check. Written out in evidence_basis instead.
articleSourceIds: As above — the two supporting sources are src_e294bafc730fe7111b06 and src_a2ffe25e8362fe840ceb, neither of which the corpus source index contains.
claimIds: No evidence pass has been run for 108 INT. Searched the live claim store for "necrosis", "coagulative", "caseation" and "fibrinoid"; the four necrosis claims are systemic observations in other courses and none defines a type. Left blank under LD-14.
spanIds: A span binds one sentence to the claims supporting it, and this module has no claims. Writing a span ID would name an evidence record that does not exist. Reported as a known contract gap.
media: No rights-cleared asset exists for this module. Four are requested in media_recommendations; the book's own Figure (1.1) is inside a copyrighted PDF and is named as a brief rather than attached.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: A review date is set when a reviewer is assigned.

---

# Item
## id
ART-108-PAT-APOPTOSIS
## title
Apoptosis, and how it differs from necrosis
## arabic_title
الاستماتة والفرق بينها وبين النخر
## aliases
Apoptosis
Programmed cell death
Apoptotic bodies
Caspases
Necrosis versus apoptosis
## subject
fnd
## topic
General pathology
## subtopic
Cellular Response to Injury
## microtopic
Apoptosis
## nanotopic
Control of apoptosis
## primary_node_id
SYS-FND-T03-S01-M03
## secondary_node_ids
DIS-PAT-T01
DIS-PAT-T08
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
## summary
Apoptosis is programmed cell death: energy-dependent, single-cell, membrane-intact, and silent to the immune system. Both end-of-year papers asked about it and the department book's own formative MCQ asks the same thing twice — the enzymes are caspases and there is no inflammation. The comparison with necrosis is the highest-value thing in this article, because a student who holds both definitions can still fail to tell them apart.
## sections
### Definition
Apoptosis is a programmed cell death which is energy dependent. It is a form of cell death which leads to the deletion of individual cells. Their membranes remain intact and thus do not provoke an inflammatory response.

Each clause is a mark. Energy dependent, because a cell too ATP-depleted to run apoptosis dies by necrosis instead. Individual cells, against necrosis's group. Membranes intact, which is the reason for the last clause: nothing leaks out, so nothing calls the inflammatory cells in.

### Mechanism
Apoptosis is controlled by the bcl-2 protein family. It is brought about by the activation of a group of enzymes called caspases. These enzymes destroy the nuclear membrane and activate DNAases which degrade nuclear DNA.

The morphology follows from that. The cytoplasm condenses and the cell shrinks, retaining an intact plasma membrane. The nucleus shrinks and fragments. Apoptotic cells show surface blebs which later fragment into membrane-bound apoptotic bodies, consisting of a dark nuclear fragment surrounded by eosinophilic cytoplasm. Apoptotic cells and apoptotic bodies are removed by adjacent cells or macrophages.

Removal by neighbours rather than by a summoned inflammatory infiltrate is what keeps apoptosis silent, and it is also why apoptosis is so much harder to catch on a slide than necrosis: individual cells go, and the debris is cleared locally within hours.

### Key determinants
Apoptosis occurs in physiological and pathological conditions, and the physiological list comes first for a reason.

Physiologically, it carries out programmed destruction of cells during embryogenesis; hormone-dependent involution of tissues, as in the endometrium during menstruation; cell deletion in proliferating cell populations, such as intestinal epithelium, to maintain a constant cell number; and removal of defective cells that acquire significant DNA damage, to get rid of cells with unwanted mutations.

Pathologically, it causes cell death in virus-infected cells, induced either by the virus as in HIV infection or by the host immune response as in viral hepatitis; irradiation damage through DNA damage; elimination of cancer cells, including by the action of anticancer drugs; cytotoxicity induced by T lymphocytes, as in organ transplant rejection; accumulation of misfolded proteins, from inherited defects or free-radical damage, which may be the basis of cell loss in several neurodegenerative disorders; and pathological atrophy in parenchymal organs after duct obstruction, as in the pancreas.

That last pathological cause is worth holding, because it reappears in chapter 2: misfolded protein that is not cleared is what amyloid is made of.

The comparison with necrosis is the thing to be able to produce. Necrosis kills a group of cells, swells them, ruptures the membrane, spills the contents and provokes inflammation, and is not energy dependent. Apoptosis deletes individual cells, shrinks them, keeps the membrane intact, packages the remains into apoptotic bodies and provokes no inflammation, and costs the cell energy. Both fragment the nucleus, which is why the nuclear picture alone does not separate them.

### Clinical significance
Anticancer drugs work by pushing tumour cells into apoptosis, and the same machinery removes cells whose DNA is damaged before their mutations are inherited. A cell that cannot run apoptosis is a cell that keeps damaged DNA, which is where this module's material meets neoplasia in later courses.

At the other end, too much apoptosis is a disease too: the book names accumulation of misfolded protein as the possible basis of cell loss in neurodegenerative disorders, and HIV infection as a cause of virus-driven apoptotic cell death.

The absence of inflammation is what makes apoptosis clinically invisible. An organ can lose a great deal of parenchyma to apoptosis with no fever, no infiltrate and no pain, which is why the physiological uses are safe and why the pathological ones are found late.

### Common misconceptions
Apoptosis is not pathological only. The 2025 paper offered that as a distractor, and most apoptosis in a healthy body is physiological.

Apoptosis is not passive. It costs energy, which is why the book calls it energy dependent, and which is why a severely ATP-depleted cell dies the other way.

The enzymes are caspases, not proteases in general. Caspases are proteases, but proteases is offered as a distractor both in the department book's own formative MCQ and in the 2024 paper, and caspases is the marked answer.

A cell dying by apoptosis does not swell. It shrinks, and cell swelling was the 2025 distractor.
## published_summary

## published_sections
[clear]

## hold_these
Apoptosis is programmed, energy-dependent cell death that deletes individual cells with their membranes intact, so it provokes no inflammation.
It is controlled by the bcl-2 protein family and executed by caspases.
Caspases destroy the nuclear membrane and activate DNAases which degrade nuclear DNA.
The cell shrinks, the nucleus shrinks and fragments, surface blebs form and break off as apoptotic bodies, and neighbours or macrophages remove them.
An apoptotic body is a dark nuclear fragment surrounded by eosinophilic cytoplasm, bounded by membrane.
Physiological apoptosis covers embryogenesis, hormone-dependent involution, deletion in proliferating populations, and removal of DNA-damaged cells.
Pathological apoptosis covers viral infection, irradiation, cancer-cell elimination, transplant rejection, misfolded proteins and post-obstructive atrophy.
Necrosis swells the cell and inflames; apoptosis shrinks it and does not. Both fragment the nucleus.
## lose_the_mark
Answering proteases rather than caspases when asked which group of enzymes brings apoptosis about.
Saying apoptosis is pathological only, or that it involves death of a group of cells.
Listing inflammation among the features of apoptosis. The 2024 paper asked for the exception and inflammation was it.
Separating apoptosis from necrosis on the nucleus. Both fragment it; the membrane and the inflammatory response are what settle it.
Describing the apoptotic cell as swollen.
## related_concepts
CON-FND-11D3CBC654E7F3 | CON-FND-C6661CBD045436 | CON-FND-A40D59DAB245EA | CON-FND-46B3AD5A2D8294 | CON-FND-2CDE9A5C884133
## related_articles
ART-108-PAT-NECROSIS: the other pattern of irreversible injury, and the half of the comparison this article does not restate
ART-108-PAT-CELL-INJURY-AND-ADAPTATION: the continuum both patterns sit at the end of
ART-108-PAT-AMYLOIDOSIS: misfolded protein, which is a cause of apoptosis here and the substance of amyloid there
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

## universities
kau
## years
KAU_Y1
## module
108 INT
## module_subject
108 INT > Pathology > Cellular Response to Injury > Apoptosis
108 INT > Pathology > Cellular Response to Injury > Apoptosis > Causes of apoptosis
108 INT > Pathology > Cellular Response to Injury > Apoptosis > Morphological changes
108 INT > Pathology > Cellular Response to Injury > Apoptosis > Control of apoptosis
108 INT > Pathology > Cellular Response to Injury > Morphologic Alternations in Cell Injury > Irreversible Injury
## university_notes
kau: The Kasr Alainy chapter ILO is "Describe morphological features of apoptosis" — morphology only. The control of apoptosis is not an ILO, yet the caspase question appears in the book's own formative assessment and again on the 2024 paper, so it is examined regardless of the ILO list.
## annotations
### definition_of · CON-FND-11D3CBC654E7F3
Quote: Apoptosis is a programmed cell death which is energy dependent. It is a form of cell death which leads to the deletion of individual cells. Their membranes remain intact and thus do not provoke an inflammatory response.
Block: body

### definition_of · CON-FND-C6661CBD045436
Quote: Apoptosis is controlled by the bcl-2 protein family. It is brought about by the activation of a group of enzymes called caspases.
Block: body

### definition_of · CON-FND-A40D59DAB245EA
Quote: Apoptosis occurs in physiological and pathological conditions, and the physiological list comes first for a reason.
Block: body

### definition_of · CON-FND-46B3AD5A2D8294
Quote: Apoptotic cells show surface blebs which later fragment into membrane-bound apoptotic bodies, consisting of a dark nuclear fragment surrounded by eosinophilic cytoplasm.
Block: body

### contrasts_with · CON-FND-2CDE9A5C884133
Quote: Both fragment the nucleus, which is why the nuclear picture alone does not separate them.
Block: body
## media

## media_recommendations
### comparison table · Necrosis against apoptosis across cell size, membrane integrity, nuclear change, inflammatory response, number of cells and energy requirement
Purpose: Teaches CON-FND-2CDE9A5C884133. The book never tabulates this comparison and the exam asks it as a discrimination; a student holding two prose definitions in separate chapters cannot produce the six-row answer the question wants.
Priority: required
Status: needed
Kind: comparison table
Section: Key determinants
Source direction: drawn to order from the department book's pages 6 and 8
Rights: original diagram

### diagram · Morphology of apoptosis in sequence: condensation, shrinkage, blebbing, apoptotic bodies, phagocytosis by a neighbouring cell
Purpose: Teaches CON-FND-46B3AD5A2D8294. The ILO asks the student to describe the morphology, which means reproducing a sequence; a still description of the end state does not carry the order.
Priority: required
Status: needed
Kind: diagram
Section: Mechanism
Source direction: openly licensed cell-biology figure, or drawn to order from the department book's page 8; the book's own Figure 1.2 is inside a copyrighted PDF
Rights: must be CC-BY or public domain if sourced rather than drawn

### histology · Apoptotic bodies in a tissue section, with an arrow, alongside a field of necrosis at the same magnification
Purpose: Teaches CON-FND-2CDE9A5C884133. Apoptosis is hard to find on a slide precisely because single cells go quietly; putting the two fields side by side is the only way prose about "shrinkage against swelling" becomes something a student can recognise.
Priority: strongly helpful
Status: needed
Kind: histology
Section: Key determinants
Source direction: openly licensed pathology teaching set
Rights: must be CC-BY or public domain
## publication_gate
needs_evidence
## evidence_basis
Kasr Alainy 108 INT pathology department book, manifest source src_e294bafc730fe7111b06, physical pages 5, 8 and 9, native text layer, including the chapter's own formative MCQ block on page 9.
Exam weighting from the 2025 and 2024 end-of-year papers, src_bd1595e59d116b78436a and src_3deab75f7f81cc5f5260, in which apoptosis appears three times across the two sittings.
## evidence_gaps
No claim or citation record exists for this module, so nothing in this article is claim-linked.
The book names the bcl-2 family as the control without separating the members that promote apoptosis from those that oppose it.
The book does not say how a cell that lacks the ATP for apoptosis behaves when the apoptotic signal arrives.
## conflicts
Two live immunology concepts on DIS-IMU-T02 describe apoptosis as the principal cytotoxic-T-cell killing mechanism, where this book lists T-cell cytotoxicity as one pathological cause among several. That is a difference of emphasis between two courses rather than a contradiction, and both are recorded on the concept records.
## last_reviewed

## review_due

## notes
The necrosis–apoptosis comparison is written as its own concept, CON-FND-2CDE9A5C884133, and taught here rather than in the necrosis article, so that a student meets it after both halves are known. The concept is also owed a typed often_confused_with edge in a relations batch.
## field_notes
questionIds: No questions test this article yet; the 108 INT question batch is a later pass.
resourceIds: The Kasr manifest sources are absent from corpus-source-index.json, which holds only corpus/01-explicitly-taught/ sources, so a resource ID naming src_e294bafc730fe7111b06 would fail the corpus check. Written out in evidence_basis instead.
articleSourceIds: As above — the supporting source is src_e294bafc730fe7111b06, which the corpus source index does not contain.
claimIds: No evidence pass has been run for 108 INT. Two live claims mention apoptosis, CLM-IMM-7EC2CFBC19A9E9 and CLM-IMM-8BBDB99CE5FD3C, and both are cytotoxic-T-cell assertions that support neither the definition nor the morphology taught here. Left blank under LD-14 rather than attaching a near-miss.
spanIds: A span binds one sentence to the claims supporting it, and this module has no claims. Reported as a known contract gap rather than filled with an ID that names nothing.
media: No rights-cleared asset exists for this module. Three are requested in media_recommendations; the book's Figure 1.2 sits in a copyrighted PDF and is named as a brief.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: A review date is set when a reviewer is assigned.

---

# Item
## id
ART-108-PAT-INTRACELLULAR-ACCUMULATIONS
## title
Intracellular accumulations: fat, cholesterol, hyaline and glycogen
## arabic_title
التراكمات داخل الخلوية
## aliases
Intracellular accumulations
Steatosis
Fatty change
Fatty liver
Hyaline change
Russell bodies
Xanthoma
Glycogen storage disease
## subject
fnd
## topic
General pathology
## subtopic
Intracellular Accumulation and Extracellular Depositions
## microtopic
Intracellular Accumulations
## nanotopic
Steatosis (Fatty Change)
## primary_node_id
SYS-FND-T03-S01-M01
## secondary_node_ids
DIS-PAT-T01
DIS-PAT-T08
## template_id
TPL-CONCEPT
## archetype
concept
## language
en
## learner_stage
Years 1–3 foundation
## reading_time
15
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
## summary
Chapter 2 opens with a single organising idea: a cell accumulates a substance when production, metabolism or degradation fails, and there are only three routes by which that happens. Everything after it — fat, cholesterol, hyaline, glycogen and the pigments — is an instance. Fatty change of the liver is the heaviest of them, examined grossly, microscopically and by cause across both papers and both practical books.
## sections
### Definition
Cells may accumulate abnormal amounts of various substances, by three routes.

A normal endogenous substance — water, protein, carbohydrate or lipid — may be produced at a normal rate but accumulate because the metabolic rate is inadequate to remove it, as with fat accumulation in liver cells; or it may accumulate because of genetic or acquired defects in its metabolism, as in the lysosomal storage diseases. An abnormal endogenous substance, the product of a mutated gene, accumulates because of defective folding or transport and inadequate degradation, as in alpha-1 antitrypsin disease. An abnormal exogenous substance may accumulate in normal cells that are unable to degrade it, as in macrophages laden with environmental carbon.

Note that two of the three routes are failures of removal rather than of production. The rate of synthesis in a fatty liver can be entirely normal.

Of the lipids, triglycerides are the commonest to accumulate; cholesterol and phospholipids also do.

### Mechanism
Steatosis, or fatty change, is an abnormal accumulation of triglycerides within parenchymal cells, either due to excessive entry or defective metabolism. Fatty change is typically reversible, but it can lead to inflammation and fibrosis. The most common site is the liver, but it can occur in heart, muscle and kidney. Causes of hepatic steatosis include alcohol abuse, which the book names the most common cause in the USA, protein malnutrition, diabetes mellitus, obesity, hypoxia and toxins.

The pathogenesis is four routes, each with its own example. Increased fatty acids entering the liver, in starvation and with corticosteroids. Decreased fatty acid oxidation, in hypoxia. Increased triglyceride formation, with alcohol. Impaired lipoprotein secretion from the liver, also with alcohol. Alcohol appears twice, at two separate steps, which is why it carries the weight the book gives it.

Cholesterol is normally required for cell membrane or lipid-soluble hormone synthesis, and its production is tightly regulated, but it accumulates in several pathological states. In atherosclerosis, cholesterol and cholesterol esters accumulate in arterial wall smooth muscle cells and macrophages, and extracellular accumulations appear microscopically as cleft-like spaces, because the cholesterol crystals dissolved during normal histological processing. In acquired and hereditary hyperlipidaemias, lipids accumulate in foamy macrophages forming clusters in subcutaneous tissues and tendons, producing masses called xanthomas.

Glycogen is commonly stored within cells as a ready energy source. Excessive intracellular deposits, seen as clear vacuoles, are seen in the glycogen storage diseases, the glycogenoses.

### Key determinants
The morphology of a fatty liver is asked grossly and microscopically, and both are marked.

Grossly, fatty livers are enlarged and soft; the borders are rounded, and the cut section is yellow and greasy. Microscopically, small intracytoplasmic droplets or large vacuoles of fat accumulate in the liver cells, and the nucleus becomes flattened and pushed to one side giving the cell a signet ring appearance. On a routine paraffin section the vacuole is empty, because the fat dissolved in xylol and alcohol during processing.

In the myocardium, fatty change can be spotty, in ischaemia, or diffuse, in toxaemia as in diphtheria. The department's museum specimen shows a yellow myocardium in which the columnae carneae carry brown dots alternating with yellow ones — the tabby cat appearance.

Hyaline change is a different kind of entry on this list, because it names an appearance rather than a substance. The term hyaline usually refers to an alteration within cells or in the extracellular space that gives a homogeneous, glassy, pink appearance in routine histological sections stained with haematoxylin and eosin. It is widely used as a descriptive histological term rather than a specific marker for cell injury.

Intracellular hyaline change has two named examples: Russell bodies, hyaline change in plasma cells in chronic inflammation due to distension with immunoglobulins, and Mallory alcoholic hyaline in hepatocytes in chronic alcoholism. Extracellular hyaline change has three: collagenous fibrous tissue in old scars, where the book says the biochemical basis of the change is not clear; mesenchymal soft-tissue tumours, particularly leiomyoma; and the arteriolar walls of long-standing hypertension and diabetes, especially in the kidney, hyalinised by extravasated plasma protein and deposition of basement membrane material.

### Clinical significance
Fatty change is the module's clearest example of a lesion that is reversible and yet consequential. It is typically reversible, and it can lead to inflammation and fibrosis — both are true, and the second is why a fatty liver is worth finding.

The Egyptian context deserves stating plainly, because the book states its own. Alcohol is named as the commonest cause of hepatic steatosis "in USA"; the book does not say what the commonest cause is in Egypt, and this article does not supply one. What can be said is that the other five causes it lists — protein malnutrition, diabetes mellitus, obesity, hypoxia and toxins — are all locally common, and that a student answering "four causes of fatty liver" should give the book's list rather than a single Western headline.

Xanthomas and atheromatous plaques are the same process in two places: lipid-laden foamy macrophages, in tendon and in artery wall. The atheromatous plaque is also the book's first example of dystrophic calcification, which is where this article hands over to the calcification article.

### Common misconceptions
An accumulation does not mean the cell is making too much. Two of the three routes are failures of removal.

A vacuolated cytoplasm is not automatically fat. Water in hydropic change, fat in steatosis and glycogen in the glycogenoses all leave clear vacuoles on a routine section, and only a special stain separates them.

A fatty liver is not shrunken. It is enlarged, with rounded borders that record its softness; the 2024 paper offered a shrunken yellow greasy liver as a distractor and shrinkage is what made it wrong.

Hyaline is not one substance. Russell bodies are immunoglobulin, Mallory hyaline is a hepatocyte inclusion, and arteriolar hyalinosis is plasma protein and basement membrane — one word for three materials that happen to look alike.

Fat necrosis is not on this list. It is death of adipose tissue, taught in the necrosis article; fatty change is accumulation inside living parenchymal cells.
## published_summary

## published_sections
[clear]

## hold_these
A cell accumulates a substance by three routes: a normal endogenous substance not removed or defectively metabolised, an abnormal endogenous substance from a mutated gene, or an abnormal exogenous substance the cell cannot degrade.
Steatosis is abnormal accumulation of triglycerides within parenchymal cells, from excessive entry or defective metabolism, and it is typically reversible.
The causes of hepatic steatosis are alcohol, protein malnutrition, diabetes mellitus, obesity, hypoxia and toxins.
The four pathogenic routes are increased fatty acid entry, decreased fatty acid oxidation, increased triglyceride formation, and impaired lipoprotein secretion.
A fatty liver is enlarged and soft with rounded borders, and a yellow greasy cut section.
Fatty hepatocytes show a fat vacuole pushing the nucleus aside — the signet ring appearance.
Myocardial fatty change is spotty in ischaemia and diffuse in toxaemia; the gross specimen is the tabby cat heart.
Cholesterol appears as cleft-like spaces in atheroma and in foamy macrophages in xanthomas.
Hyaline names a homogeneous glassy pink appearance, not a substance: Russell bodies and Mallory hyaline intracellularly, old scars, leiomyoma and arteriolar walls extracellularly.
Excess intracellular glycogen appears as clear vacuoles and means a glycogen storage disease.
## lose_the_mark
Calling hepatic steatosis irreversible, or describing the fatty liver as shrunken.
Giving one mechanism for alcohol. It acts at two of the four routes.
Naming a xanthoma as a calcium or urate deposit because it sits in a tendon. It is lipid.
Offering Russell bodies, brown atrophy or hyalinosis when asked for an example of abnormal lipid deposition — the answer on the 2024 paper was xanthomas.
Answering hyaline arteriolosclerosis when asked for intracellular hyaline change. That is extracellular; the intracellular answer is Russell bodies.
Reading a clear cytoplasmic vacuole as fat without a stain that shows it is.
## related_concepts
CON-FND-0A32C902A825AA | CON-FND-3B89025E2FB4E0 | CON-FND-A0BC07E35554B1 | CON-FND-70554B38361679 | CON-FND-4354823564BAB3 | CON-FND-3BB4FF8F2223FF | CON-FND-5CB8B822A9A6AF | CON-FND-2D8B89A2F75643
## related_articles
ART-108-PAT-PATHOLOGICAL-PIGMENTS: the fourth class of intracellular accumulation, given its own article because the book gives it five pages
ART-108-PAT-PATHOLOGICAL-CALCIFICATION: the atheromatous plaque is the first example on the dystrophic list
ART-108-PAT-CELL-INJURY-AND-ADAPTATION: fatty change as one of the three reversible morphologies, which is where chapter 1 leaves it
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

## universities
kau
## years
KAU_Y1
## module
108 INT
## module_subject
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Lipids intracellular accumulations > Steatosis (Fatty Change)
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Lipids intracellular accumulations > Cholesterol & Cholesterol Esters
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Hyaline Change
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Glycogen
## university_notes
kau: Four of chapter 2's seven ILOs are about fatty change alone — its morphological changes, its pathogenesis in different organs, its morphological picture in different organs, and its clinical significance in liver and heart. The department practical adds a liver steatosis slide, a liver steatosis specimen, a tabby cat heart and a splenic hyalinosis slide, so the same material is examined twice in two formats.
## annotations
### definition_of · CON-FND-0A32C902A825AA
Quote: Note that two of the three routes are failures of removal rather than of production.
Block: body

### definition_of · CON-FND-3B89025E2FB4E0
Quote: Steatosis, or fatty change, is an abnormal accumulation of triglycerides within parenchymal cells, either due to excessive entry or defective metabolism.
Block: body

### definition_of · CON-FND-A0BC07E35554B1
Quote: Alcohol appears twice, at two separate steps, which is why it carries the weight the book gives it.
Block: body

### definition_of · CON-FND-70554B38361679
Quote: Microscopically, small intracytoplasmic droplets or large vacuoles of fat accumulate in the liver cells, and the nucleus becomes flattened and pushed to one side giving the cell a signet ring appearance.
Block: body

### definition_of · CON-FND-4354823564BAB3
Quote: In the myocardium, fatty change can be spotty, in ischaemia, or diffuse, in toxaemia as in diphtheria.
Block: body

### definition_of · CON-FND-3BB4FF8F2223FF
Quote: In acquired and hereditary hyperlipidaemias, lipids accumulate in foamy macrophages forming clusters in subcutaneous tissues and tendons, producing masses called xanthomas.
Block: body

### definition_of · CON-FND-5CB8B822A9A6AF
Quote: It is widely used as a descriptive histological term rather than a specific marker for cell injury.
Block: body

### definition_of · CON-FND-2D8B89A2F75643
Quote: Excessive intracellular deposits, seen as clear vacuoles, are seen in the glycogen storage diseases, the glycogenoses.
Block: body
## media

## media_recommendations
### histology · Liver in steatosis: hepatocytes distended by empty cytoplasmic vacuoles pushing the nucleus to one side, signet-ring appearance, H&E paraffin section
Purpose: Teaches CON-FND-70554B38361679. The department practical examines this as numbered slide 9 and asks for a description; "signet ring" is a shape a student has to have seen, and describing it from words produces the wrong shape.
Priority: required
Status: needed
Kind: histology
Section: Key determinants
Source direction: openly licensed pathology teaching set or institutional collection
Rights: must be CC-BY or public domain

### clinical photograph · Gross slice of a fatty liver: diffuse yellow cut surface with rounded borders
Purpose: Teaches CON-FND-70554B38361679 and CON-FND-3B89025E2FB4E0. The practical examines specimen D105-2 grossly, and the rounded border is the sign of softness — a feature that is invisible in prose and obvious in a photograph.
Priority: required
Status: needed
Kind: clinical photograph
Section: Key determinants
Source direction: openly licensed autopsy or museum specimen collection
Rights: must be CC-BY or public domain

### clinical photograph · Tabby cat heart: opened chambers, yellow myocardium, brown dots alternating with yellow on the columnae carneae
Purpose: Teaches CON-FND-4354823564BAB3. The department practical examines specimen C19-1 and the diagnosis rests on a striping pattern; no verbal description of "brown dots alternating with yellow ones" lets a student recognise it in the exam hall.
Priority: required
Status: needed
Kind: clinical photograph
Section: Key determinants
Source direction: openly licensed museum specimen collection
Rights: must be CC-BY or public domain

### histology · Spleen showing hyalinosis: thickened structureless homogeneous pink capsule, trabeculae and central arterioles with narrowed lumina
Purpose: Teaches CON-FND-5CB8B822A9A6AF. The practical examines this as numbered slide 7, and hyaline is defined by an appearance — the one thing that cannot be conveyed by defining it.
Priority: required
Status: needed
Kind: histology
Section: Key determinants
Source direction: openly licensed pathology teaching set
Rights: must be CC-BY or public domain

### flowchart · The four pathogenic routes to hepatic steatosis, with the two steps at which alcohol acts marked
Purpose: Teaches CON-FND-A0BC07E35554B1. The ILO asks the student to discuss the pathogenesis, and the marked answer depends on seeing that fat enters, is burned, is packaged and is exported — four steps on one pathway rather than four unrelated facts.
Priority: strongly helpful
Status: needed
Kind: flowchart
Section: Mechanism
Source direction: drawn to order from the department book's page 11
Rights: original diagram
## publication_gate
needs_evidence
## evidence_basis
Kasr Alainy 108 INT pathology department book, manifest source src_e294bafc730fe7111b06, physical pages 10 to 12, native text layer, plus page 5 for the myocardial fatty change sentence in chapter 1.
Kasr Alainy 108 INT pathology practical book, src_a2ffe25e8362fe840ceb, for slides 7 and 9 and specimens C19-1 and D105-2.
Exam weighting from the 2025 and 2024 end-of-year papers, src_bd1595e59d116b78436a and src_3deab75f7f81cc5f5260.
## evidence_gaps
No claim or citation record exists for this module, so nothing in this article is claim-linked.
The book does not give a threshold proportion of hepatocytes at which the change is called steatosis, nor does it separate microvesicular from macrovesicular fat.
The book names alpha-1 antitrypsin disease as its example of an abnormal endogenous substance without describing the lesion.
The book names no glycogen storage disease and no affected organ.
The book says the biochemical basis of hyalinisation in old scars is not clear.
## conflicts
The department book names alcohol the commonest cause of hepatic steatosis "in USA" and is silent on Egypt. Five live biochemistry concepts on DIS-BIO-T04 give carbohydrate overfeeding and adipose overmobilisation as routes to fatty liver, which the pathology book's four-route list does not name in those words. Neither list contradicts the other; both are recorded on the concept records rather than one being chosen silently.
The practical book's specimen C19-1 names hypertrophy and dilatation of the right ventricle in its diagnosis while its own description says the left ventricle. The two lines disagree with each other, so this article asserts neither ventricle.
## last_reviewed

## review_due

## notes
This article and the pigments article together cover the book's INTRACELLULAR ACCUMULATIONS heading. They are split because the pigments run to five pages with their own diseases, and one article carrying both would have needed thirteen concepts and two unrelated sets of media.
## field_notes
questionIds: No questions test this article yet; the 108 INT question batch is a later pass.
resourceIds: The Kasr manifest sources are absent from corpus-source-index.json, which holds only corpus/01-explicitly-taught/ sources, so a resource ID naming src_e294bafc730fe7111b06 or src_a2ffe25e8362fe840ceb would fail the corpus check. Written out in evidence_basis instead.
articleSourceIds: As above — the two supporting sources are outside the corpus source index.
claimIds: No evidence pass has been run for 108 INT. Searched the live claim store for "steatosis", "fatty liver", "xanthoma", "hyaline" and "glycogen"; the hepatic hits are biochemistry claims about metabolic routes, which support neither the pathological definition nor the morphology taught here. Left blank under LD-14.
spanIds: A span binds one sentence to the claims supporting it, and this module has no claims. Reported as a known contract gap.
media: No rights-cleared asset exists for this module. Five are requested in media_recommendations, four of them required because the department practical examines all four items by sight.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: A review date is set when a reviewer is assigned.

---

# Item
## id
ART-108-PAT-PATHOLOGICAL-PIGMENTS
## title
Pathological pigments, exogenous and endogenous
## arabic_title
الأصبغة المرضية
## aliases
Pigments
Anthracosis
Lipofuscin
Brown atrophy
Melanin
Haemosiderin
Hemosiderin
Haemochromatosis
Hemozoin
## subject
fnd
## topic
General pathology
## subtopic
Intracellular Accumulation and Extracellular Depositions
## microtopic
Pigments
## nanotopic
Endogenous Pigments
## primary_node_id
SYS-FND-T03-S01-M01
## secondary_node_ids
DIS-PAT-T01
DIS-PAT-T08
## template_id
TPL-CONCEPT
## archetype
concept
## language
en
## learner_stage
Years 1–3 foundation
## reading_time
16
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
## summary
Pigments can be exogenous, coming from outside the body, or endogenous, synthesised within it. The book gives five — carbon, lipofuscin, melanin, haemosiderin and hemozoin — and the exam takes one question from each. Two of them carry a named disease apiece: brown atrophy of the heart for lipofuscin, and primary haemochromatosis with its bronze diabetes for iron.
## sections
### Definition
Pigments can be exogenous, coming from outside the body, or endogenous, synthesised within the body itself.

Of the exogenous pigments, carbon is the one that matters. Carbon particles in air polluted by factory and car exhaust are inhaled and picked up by macrophages within the alveoli, then transported through lymphatic channels to the regional lymph nodes in the tracheobronchial region. Accumulations of this pigment blacken the tissues of the lungs — anthracosis — and the involved lymph nodes. In coal miners the aggregates of carbon dust may induce a fibroblastic reaction and thus cause a serious lung disease known as coal worker's pneumoconiosis. Tattooing is the second: the pigments inoculated in the skin are phagocytosed by dermal macrophages, resulting in permanent localised pigmentation.

The endogenous pigments are lipofuscin, melanin, and the haemoglobin-derived pigments haemosiderin and hemozoin.

### Mechanism
Lipofuscin is an insoluble pigment, also known as lipochrome or wear-and-tear pigment. It is derived through lipid peroxidation of cellular membranes, and it is a sign of free-radical injury and lipid peroxidation throughout cell life — but lipofuscin is not injurious to the cell or its functions. It appears as a yellow-brown, finely granular, often perinuclear cytoplasmic pigment, seen in the liver and heart cells of ageing patients or patients with severe malnutrition and cancer.

Melanin is an endogenous, non-haemoglobin-derived, brown-black pigment formed when the enzyme tyrosinase catalyses the oxidation of tyrosine to dihydroxyphenylalanine in melanocytes. Increased melanin is observed in five conditions: prolonged exposure to the sun; melanocytic naevi and melanomas; chloasma of pregnancy, brown patches in the skin of the face, nipple and genitalia due to hormonal changes; Addison's disease; and café-au-lait patches in neurofibromatosis. In primary adrenal disease, hyperpigmentation of the skin, particularly of sun-exposed areas and at pressure points such as the neck, elbows, knees and knuckles, is quite characteristic, and it is caused by elevated levels of pro-opiomelanocortin, derived from the anterior pituitary and a precursor of both ACTH and melanocyte-stimulating hormone.

Haemosiderin is a haemoglobin-derived, golden yellow-to-brown, granular pigment. Iron is normally carried by transferrins and stored in cells bound to apoferritin as ferritin micelles, and ferritin is a constituent of most cell types. When there is a local or systemic excess of iron, ferritin forms haemosiderin granules, which are easily seen with the light microscope; haemosiderin represents aggregates of ferritin micelles.

Hemozoin is a brownish iron-containing pigment produced by parasites feeding on blood cells, as in malaria and bilharziasis. It is not reactive to Prussian blue. The pigments are released in blood and taken by macrophages of liver, spleen and other organs.

### Key determinants
Increased haemosiderin in tissues is localised or generalised, and the distinction is the question.

Localised haemosiderosis results from haemorrhage into tissues: extravasated red blood cells at the site of injury are phagocytosed over several days by macrophages, which break down the haemoglobin, and the iron released from haem is incorporated into ferritin and eventually haemosiderin — as in chronic venous congestion of the lung. Generalised or systemic haemosiderosis follows systemic iron overload, and the main causes are three: increased absorption of dietary iron; haemolytic anaemias, in which abnormal quantities of iron are released from erythrocytes; and repeated blood transfusions, because the transfused red cells constitute an exogenous load of iron.

In systemic haemosiderosis the pigment is deposited first in the mononuclear phagocytes of liver, bone marrow, spleen and lymph nodes and in scattered macrophages elsewhere; with progressive accumulation, parenchymal cells throughout the body, principally in liver, pancreas, heart and endocrine organs, become pigmented. Histologically the iron pigment appears as a coarse, golden, granular pigment lying within the cell's cytoplasm, and it is visualised by the Prussian blue reaction. In most instances of systemic haemosiderosis the pigment does not damage the parenchymal cells or impair organ function.

Primary haemochromatosis is different, and worse. It is the most common form of iron overload, a congenital disorder due to a gene defect on chromosome 6; heterozygotes have increased absorption of iron, but only in homozygotes does this reach dangerous levels. The defect causes increased absorption of iron in the small intestine even while transferrin is fully saturated. In the liver, haemosiderin appears as golden-yellow granules in the cytoplasm of periportal hepatocytes, staining blue with Prussian blue; with increasing iron load there is progressive involvement of the rest of the lobule, along with bile duct epithelium and Kupffer cell pigmentation, and at this stage the liver is typically slightly larger than normal, dense and chocolate brown. Fibrous septa develop slowly, leading ultimately to a micronodular pattern of cirrhosis in an intensely pigmented liver. In advanced disease haemosiderin is deposited in many tissues, notably endocrine glands such as pancreas, adrenal, pituitary and thyroid. Bronze diabetes is due to iron-induced damage of pancreatic islets and increased melanotropin secretion by pituitary leading to excess melanin production in skin, in addition to haemosiderin deposition in the skin. Deposition of haemosiderin in the heart can lead to heart failure.

Brown atrophy of the heart is the lipofuscin disease. It is a senile atrophy of the heart with an excess of lipofuscin pigment. Grossly the heart is reduced in size and brown in colour; the coronaries appear more tortuous due to the decreased size of the heart with normal length arteries; and the pericardial fat is replaced by oedematous jelly-like tissue, which is serous atrophy of the fat. Microscopically the muscle fibres are thin and atrophic, and excess fine yellowish-brown lipofuscin pigments are seen on both sides of the nucleus in sections stained with haematoxylin and eosin.

### Clinical significance
Two of these pigments are read directly off a patient. Skin darkened at pressure points and in sun-exposed areas in a patient with primary adrenal failure is melanin, and the mechanism is a shared precursor rather than a hormone acting where it should not. A bronze diabetic is carrying two pigments at once, iron and melanin, driven by one disease.

Anthracosis is the module's cleanest illustration that a deposit and a disease are not the same thing. The blackened lung of a city dweller is an accumulation with no consequence; the same pigment in a heavier dose in a coal miner provokes fibrosis and becomes pneumoconiosis. The pigment did not change — the dose and the reaction to it did.

Hemozoin's local relevance is worth stating: the book names bilharziasis alongside malaria, which a Western text would not, and both are diagnoses made in Egypt. Its failure to react with Prussian blue is the practical point — two brown pigments in the same liver macrophage, and one stain separates them.

### Common misconceptions
Lipofuscin is not a cause of injury. It marks free-radical damage and the book states outright that it is not injurious to the cell or its functions.

Iron deposition does not mean organ damage. In most instances of systemic haemosiderosis the pigment harms nothing; it is haemochromatosis, with its far heavier load, that produces cirrhosis and heart failure.

The bronze of bronze diabetes is not iron alone. It is haemosiderin in the skin plus extra melanin driven by increased pituitary melanotropin.

The tortuous coronaries of brown atrophy are not diseased arteries. The arteries are normal; the heart beneath them has shrunk.

Hemozoin containing iron does not make it Prussian blue positive.
## published_summary

## published_sections
[clear]

## hold_these
Inhaled carbon is carried by alveolar macrophages to tracheobronchial lymph nodes and blackens both — anthracosis; in coal miners it provokes fibrosis and becomes coal worker's pneumoconiosis.
Lipofuscin is wear-and-tear pigment from lipid peroxidation of cell membranes, yellow-brown, finely granular, perinuclear, and not injurious to the cell.
Brown atrophy of the heart is senile atrophy with excess lipofuscin: small brown heart, tortuous coronaries, serous atrophy of pericardial fat, thin atrophic fibres with pigment on both sides of the nucleus.
Melanin is made when tyrosinase oxidises tyrosine to dihydroxyphenylalanine in melanocytes.
Melanin is increased by sun exposure, naevi and melanoma, chloasma of pregnancy, Addison's disease and café-au-lait patches in neurofibromatosis.
Addisonian pigmentation comes from raised pro-opiomelanocortin, the precursor of both ACTH and MSH.
Haemosiderin is aggregated ferritin, golden yellow-brown and granular, shown by the Prussian blue reaction.
Generalised haemosiderosis has three causes: increased dietary iron absorption, haemolytic anaemia, and repeated transfusion.
Primary haemochromatosis is a chromosome 6 gene defect; the liver becomes chocolate brown and finally micronodular cirrhosis, and bronze diabetes is islet damage plus excess skin melanin plus skin haemosiderin.
Hemozoin is a brownish iron pigment made by blood-feeding parasites in malaria and bilharziasis, and it does not react with Prussian blue.
## lose_the_mark
Answering lipofuscin, haemosiderin or calcium salts when asked what the lung accumulates in anthracosis. It is carbon particles.
Answering hemosiderin, lipofuscin or melanin for the pigment of parasitic infection. It is hemozoin.
Attributing bronze diabetes to amyloidosis of the pancreas, Wilson disease or alpha-1 antitrypsin deficiency. It is haemochromatosis.
Answering amyloid, lipid or carbon for café-au-lait patches. It is melanin.
Explaining Addisonian pigmentation by cortisol deficiency directly rather than by raised POMC.
Calling systemic haemosiderosis a damaging deposition. Usually it is not.
Treating anthracosis and coal worker's pneumoconiosis as the same condition.
## related_concepts
CON-FND-57B12823E95B52 | CON-FND-2A370D3EF3EDCF | CON-FND-063F60318B4D20 | CON-FND-AA9A76DBB4EE6B | CON-FND-5DBC795B58DC74 | CON-FND-B9A3C8B28B1443 | CON-FND-C96C66BC1A17DF
## related_articles
ART-108-PAT-INTRACELLULAR-ACCUMULATIONS: the other three classes of intracellular accumulation, and the classification these pigments are instances of
ART-108-PAT-CELL-INJURY-AND-ADAPTATION: free-radical injury, which is what lipofuscin is the residue of, and atrophy as an adaptation
ART-108-PAT-AMYLOIDOSIS: the amyloid heart, which is the other end of this module's cardiac gross pathology
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

## universities
kau
## years
KAU_Y1
## module
108 INT
## module_subject
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Pigments
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Pigments > Exogenous Pigments
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Pigments > Endogenous Pigments
## university_notes
kau: Three of chapter 2's seven ILOs are about pigment: causes of increased melanin pigmentation, the pathogenesis of brown atrophy of the heart, and its morphology. The chapter's own formative assessment is a matching item pairing haemosiderin, hemozoin, melanin and carbon with their diseases, and its printed answer key lists five answers for four items and cites an option the question does not offer — a defect in the book, recorded in the extraction and not reproduced here.
## annotations
### definition_of · CON-FND-57B12823E95B52
Quote: Accumulations of this pigment blacken the tissues of the lungs — anthracosis — and the involved lymph nodes.
Block: body

### definition_of · CON-FND-2A370D3EF3EDCF
Quote: It is derived through lipid peroxidation of cellular membranes, and it is a sign of free-radical injury and lipid peroxidation throughout cell life — but lipofuscin is not injurious to the cell or its functions.
Block: body

### definition_of · CON-FND-063F60318B4D20
Quote: It is a senile atrophy of the heart with an excess of lipofuscin pigment.
Block: body

### definition_of · CON-FND-AA9A76DBB4EE6B
Quote: Melanin is an endogenous, non-haemoglobin-derived, brown-black pigment formed when the enzyme tyrosinase catalyses the oxidation of tyrosine to dihydroxyphenylalanine in melanocytes.
Block: body

### definition_of · CON-FND-5DBC795B58DC74
Quote: When there is a local or systemic excess of iron, ferritin forms haemosiderin granules, which are easily seen with the light microscope; haemosiderin represents aggregates of ferritin micelles.
Block: body

### definition_of · CON-FND-B9A3C8B28B1443
Quote: Bronze diabetes is due to iron-induced damage of pancreatic islets and increased melanotropin secretion by pituitary leading to excess melanin production in skin, in addition to haemosiderin deposition in the skin.
Block: body

### definition_of · CON-FND-C96C66BC1A17DF
Quote: Hemozoin is a brownish iron-containing pigment produced by parasites feeding on blood cells, as in malaria and bilharziasis.
Block: body
## media

## media_recommendations
### histology · Paired liver sections in haemochromatosis: Prussian blue showing blue haemosiderin, and H&E showing the same pigment brown
Purpose: Teaches CON-FND-5DBC795B58DC74 and CON-FND-B9A3C8B28B1443. The department practical examines exactly this pair as a data-show item, and the teaching point is that one substance takes two colours depending on the stain — which requires both fields side by side and cannot be carried by describing either.
Priority: required
Status: needed
Kind: histology
Section: Key determinants
Source direction: openly licensed pathology teaching set with matched Prussian blue and H&E fields
Rights: must be CC-BY or public domain

### clinical photograph · Brown atrophy of the heart: small heart with open left side, dark brown myocardium, tortuous coronaries, pericardial fat replaced by jelly-like tissue
Purpose: Teaches CON-FND-063F60318B4D20. The practical examines specimen C18-1 and expects size, colour, coronary tortuosity and serous atrophy of fat to be described; the size is only judgeable against the aorta in the same photograph, which is how the specimen is set.
Priority: required
Status: needed
Kind: clinical photograph
Section: Key determinants
Source direction: openly licensed museum specimen collection
Rights: must be CC-BY or public domain

### histology · Anthracotic lung: black carbon pigment within alveolar macrophages and along lymphatics
Purpose: Teaches CON-FND-57B12823E95B52. Anthracosis is defined by where the pigment sits, in the macrophage and along the lymphatic route to the node, and a photograph of a black lung surface does not show either.
Priority: strongly helpful
Status: needed
Kind: histology
Section: Definition
Source direction: openly licensed pulmonary pathology teaching set
Rights: must be CC-BY or public domain

### comparison table · The five pigments against origin, colour, the stain that shows them, and the disease each is associated with
Purpose: The chapter's own formative assessment is a matching item pairing pigments with diseases, and the 2024 paper asked two separate pigment-to-disease questions. The comparison is the form the question takes, and the five are taught as five paragraphs pages apart.
Priority: required
Status: needed
Kind: comparison table
Section: Mechanism
Source direction: drawn to order from the department book's pages 12 to 15
Rights: original diagram
## publication_gate
needs_evidence
## evidence_basis
Kasr Alainy 108 INT pathology department book, manifest source src_e294bafc730fe7111b06, physical pages 12 to 15, native text layer, plus the chapter's seven-item ILO block on page 10.
Kasr Alainy 108 INT pathology practical book, src_a2ffe25e8362fe840ceb, for the Prussian blue data-show item on page 8 and specimen C18-1 on page 10.
Exam weighting from the 2025 and 2024 end-of-year papers, src_bd1595e59d116b78436a and src_3deab75f7f81cc5f5260, which between them ask four pigment questions.
## evidence_gaps
No claim or citation record exists for this module, so nothing in this article is claim-linked.
The book does not say how much carbon load separates harmless anthracosis from pneumoconiosis.
The book does not say what ageing, malnutrition and cancer have in common as settings for lipofuscin.
The book names a gene defect on chromosome 6 in haemochromatosis without naming the gene, and none is asserted here.
The book does not explain why hemozoin's iron is unavailable to the Prussian blue reaction.
The book says chloasma is due to "hormonal changes" without naming the hormone.
## conflicts
A live endocrinology concept attributes ACTH-driven skin pigmentation to Cushing syndrome, where this book attributes it to Addison's disease. Both are consequences of raised pro-opiomelanocortin and neither contradicts the other; both are recorded on the melanin concept rather than one being chosen silently.
## last_reviewed

## review_due

## notes
Brown atrophy of the heart is placed on SYS-FND-T03-S01-M04, the adaptations node, because it is genuinely an atrophy; every other concept in this article sits on M01 under protest, since the canonical tree has no node for pigments at all. All seven carry a primaryNodeId field note.
## field_notes
questionIds: No questions test this article yet; the 108 INT question batch is a later pass.
resourceIds: The Kasr manifest sources are absent from corpus-source-index.json, which holds only corpus/01-explicitly-taught/ sources, so a resource ID naming src_e294bafc730fe7111b06 or src_a2ffe25e8362fe840ceb would fail the corpus check. Written out in evidence_basis instead.
articleSourceIds: As above — both supporting sources are outside the corpus source index.
claimIds: No evidence pass has been run for 108 INT. Searched the live claim store for "lipofuscin", "hemosiderin", "anthracosis", "hemochromatosis" and "melanin"; the only hits are a malaria trophozoite claim, an albinism claim and a Cushing pigmentation claim, each of which asserts something adjacent rather than this content. Left blank under LD-14.
spanIds: A span binds one sentence to the claims supporting it, and this module has no claims. Reported as a known contract gap.
media: No rights-cleared asset exists for this module. Four are requested in media_recommendations, three of them required because the practical examines those items by sight.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: A review date is set when a reviewer is assigned.

---

# Item
## id
ART-108-PAT-PATHOLOGICAL-CALCIFICATION
## title
Pathological calcification
## arabic_title
التكلس المرضي
## aliases
Pathological calcification
Dystrophic calcification
Metastatic calcification
Nephrocalcinosis
Calcium deposition
## subject
fnd
## topic
General pathology
## subtopic
Intracellular Accumulation and Extracellular Depositions
## microtopic
Pathological Calcification
## nanotopic
Dystrophic calcification
## primary_node_id
SYS-FND-T03-S01
## secondary_node_ids
DIS-PAT-T01
DIS-PAT-T08
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
## summary
Calcium salts deposited in tissue other than teeth or bone are pathological, and there are two kinds. Dystrophic calcification is in damaged tissue at a normal serum calcium; metastatic calcification is in viable tissue at a raised one. The two look identical on the slide and in the pot, which is why the question is always about the tissue and the blood rather than about the deposit.
## sections
### Definition
Pathological calcification is an abnormal deposition of calcium salts in tissue other than teeth or bone. Calcification may be dystrophic or metastatic.

Dystrophic calcification occurs in tissues already affected by disease. Serum calcium is normal. The calcification is due to local precipitation of insoluble calcium salts.

Metastatic calcification occurs in viable tissues in cases of hypercalcaemia. The name records that the calcium travelled to get there, not that a tumour did.

### Mechanism
The two differ in what has gone wrong, and the difference is complete.

In dystrophic calcification the blood is normal and the tissue is not. Something has damaged it — necrosis, thrombosis, an atheromatous plaque, a chronically abnormal valve — and calcium salts precipitate locally in that altered environment. The book does not say what in damaged tissue makes precipitation favourable, and neither does this article.

In metastatic calcification the tissue is normal and the blood is not. Four causes raise the serum calcium. Elevated parathyroid hormone, from a parathyroid tumour, from ectopic parathyroid hormone secreted by other neoplasms, or as secondary hyperparathyroidism in chronic renal failure. Bone destruction, as in primary marrow malignancies such as multiple myeloma, diffuse skeletal metastasis such as breast cancer, accelerated bone turnover in Paget's disease, or immobilisation. Hypervitaminosis D. And, less commonly, the milk-alkali syndrome, due to excessive ingestion of calcium and absorbable antacids such as milk and calcium carbonate.

### Key determinants
The book's six examples of dystrophic calcification are worth learning as a set, because four of them are lesions taught elsewhere in this module: atheromatous plaques; congenital bicuspid aortic valves; areas of necrosis, as in old tuberculous lesions; old thrombi; lithopedion, a retained dead fetus; and fat necrosis.

The main sites of deposition in metastatic calcification are the interstitial tissue of the gastric mucosa, kidney, lungs, and systemic arteries and pulmonary veins. Usually the deposits cause no clinical dysfunction; massive deposits in the kidney — nephrocalcinosis — may in time cause renal failure.

The morphology is the same for both. Grossly, chalky white granular material. Microscopically, calcium salts have a basophilic amorphous granular appearance. On a section, calcification is seen as blue basophilic deposition, and ragged, torn foci are often present because a calcified block is hard for the microtome knife to cut.

That shared morphology is the whole practical point. Given a described calcified lesion, a student cannot decide the type from the deposit; the answer comes from whether the tissue was already damaged and what the serum calcium was.

### Clinical significance
Dystrophic calcification is the commoner of the two on a ward and the more useful radiologically: a calcified valve, a calcified plaque, a calcified old tuberculous focus in the lung apex. Each is a scar with a date on it, visible because calcium is radio-opaque.

Metastatic calcification is a sign that something systemic has gone wrong with calcium handling, and in Egypt the commonest route to it is secondary hyperparathyroidism in chronic renal failure. Its one consequence that matters is nephrocalcinosis, where the deposit in the kidney can produce the renal failure that was already driving the calcium.

Calcification also closes the loop back to chapter 1. The book's account of necrosis ends with the sentence that necrotic areas are removed by macrophages and repaired by fibrosis, and dystrophic calcification may occur — so the fate of necrotic tissue, which is its own ILO, ends here.

### Common misconceptions
Calcification does not mean the calcium level is high. Dystrophic calcification happens at a normal serum calcium, and it is the commoner form.

Metastatic does not mean a tumour spread there. It means the calcium arrived from elsewhere, and the tissue it lands in is viable.

The two cannot be told apart on the deposit. They are morphologically identical grossly and microscopically.

Nephrocalcinosis is not a routine consequence. The book says deposits usually cause no clinical dysfunction, and that massive renal deposits may in time cause failure.
## published_summary

## published_sections
[clear]

## hold_these
Pathological calcification is deposition of calcium salts in tissue other than teeth or bone.
Dystrophic calcification is in tissue already affected by disease, with a normal serum calcium, by local precipitation.
The six examples of dystrophic calcification are atheromatous plaques, congenital bicuspid aortic valves, areas of necrosis such as old tuberculous lesions, old thrombi, lithopedion, and fat necrosis.
Metastatic calcification is in viable tissue in hypercalcaemia.
Its causes are raised parathyroid hormone, bone destruction, hypervitaminosis D, and the milk-alkali syndrome.
Its sites are the interstitial tissue of gastric mucosa, kidney, lungs, systemic arteries and pulmonary veins.
Massive renal deposits — nephrocalcinosis — may in time cause renal failure.
Both forms are chalky white grossly and basophilic amorphous granular microscopically, so only the tissue and the serum calcium separate them.
## lose_the_mark
Answering dystrophic calcification for hyperparathyroidism. Raised parathyroid hormone raises serum calcium, so the calcification is metastatic.
Answering that dystrophic calcification occurs in normal tissues, in hypercalcaemia, or in bone and teeth. It occurs in dead or damaged tissue.
Reading metastatic as meaning tumour spread.
Trying to separate the two on the appearance of the deposit.
Omitting the serum calcium from a definition of either. It is the discriminating fact and it is what the mark is for.
## related_concepts
CON-FND-33466CEBFC4EBA | CON-FND-87392C49DB246C | CON-FND-718662116D90C4
## related_articles
ART-108-PAT-NECROSIS: necrotic tissue, old tuberculous lesions and fat necrosis, which are three of the six dystrophic examples
ART-108-PAT-INTRACELLULAR-ACCUMULATIONS: the atheromatous plaque, which is the first
ART-108-PAT-AMYLOIDOSIS: the other extracellular deposit chapter 2 teaches, and the one calcification is most often set beside
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

## universities
kau
## years
KAU_Y1
## module
108 INT
## module_subject
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Pathological Calcification
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Pathological Calcification > Dystrophic calcification
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Pathological Calcification > Metastatic calcification
## university_notes
kau: Calcification is not named in any of chapter 2's seven ILOs, yet the 2025 paper asked two MCQs on it and the 2024 paper asked for four causes of metastatic calcification as a written question worth two marks. The ILO list understates this topic and the papers are the better guide to its weight.
## annotations
### definition_of · CON-FND-33466CEBFC4EBA
Quote: Dystrophic calcification occurs in tissues already affected by disease. Serum calcium is normal. The calcification is due to local precipitation of insoluble calcium salts.
Block: body

### definition_of · CON-FND-87392C49DB246C
Quote: Metastatic calcification occurs in viable tissues in cases of hypercalcaemia.
Block: body

### contrasts_with · CON-FND-718662116D90C4
Quote: Given a described calcified lesion, a student cannot decide the type from the deposit; the answer comes from whether the tissue was already damaged and what the serum calcium was.
Block: body
## media

## media_recommendations
### histology · Dystrophic calcification in fibrotic tissue: blue basophilic deposits with inflammatory cells, showing the ragged torn foci left by the microtome knife
Purpose: Teaches CON-FND-33466CEBFC4EBA and CON-FND-718662116D90C4. The department practical examines this as a data-show item, and the torn foci are an artefact a student will otherwise read as a processing fault rather than as a clue that the block was calcified.
Priority: required
Status: needed
Kind: histology
Section: Key determinants
Source direction: openly licensed pathology teaching set
Rights: must be CC-BY or public domain

### clinical photograph · Sectioned subcutaneous fibroma showing granular chalky white foci of calcification on a greyish-white cut surface
Purpose: Teaches CON-FND-33466CEBFC4EBA. The practical examines specimen S10-1 grossly, and "chalky white" is the phrase the mark scheme turns on; a photograph is what fixes it.
Priority: strongly helpful
Status: needed
Kind: clinical photograph
Section: Key determinants
Source direction: openly licensed museum specimen collection
Rights: must be CC-BY or public domain

### comparison table · Dystrophic against metastatic calcification: state of the tissue, serum calcium, causes, sites, gross and microscopic appearance
Purpose: Teaches CON-FND-718662116D90C4. The two rows that matter are identical — gross and microscopic appearance — and seeing them identical in a table is what makes the point that the discrimination has to come from the other rows.
Priority: required
Status: needed
Kind: comparison table
Section: Key determinants
Source direction: drawn to order from the department book's pages 15 and 16
Rights: original diagram
## publication_gate
needs_evidence
## evidence_basis
Kasr Alainy 108 INT pathology department book, manifest source src_e294bafc730fe7111b06, physical pages 15 and 16, native text layer.
Kasr Alainy 108 INT pathology practical book, src_a2ffe25e8362fe840ceb, for the dystrophic calcification data-show item on page 8 and specimen S10-1 on page 11.
Exam weighting from the 2025 paper, src_bd1595e59d116b78436a, which asks two calcification MCQs, and the 2024 paper, src_3deab75f7f81cc5f5260, which asks for four causes of metastatic calcification as a written question.
## evidence_gaps
No claim or citation record exists for this module, so nothing in this article is claim-linked.
The book does not explain what in damaged tissue makes local calcium precipitation favourable.
The book does not say why the gastric mucosa, kidney and lung are the preferred sites of metastatic deposition.
The practical book notes the ragged torn foci without saying whether that artefact is itself a reliable sign.
## conflicts
[clear]

## last_reviewed

## review_due

## notes
All three concepts here sit on the section node SYS-FND-T03-S01 under protest: the canonical taxonomy has no node for calcification anywhere in its 1,883 nodes, and none of that section's four microtopics — reversible injury, necrosis, apoptosis, adaptation — describes calcium deposited in tissue. Each carries a primaryNodeId field note saying so.
## field_notes
questionIds: No questions test this article yet; the 108 INT question batch is a later pass.
resourceIds: The Kasr manifest sources are absent from corpus-source-index.json, which holds only corpus/01-explicitly-taught/ sources, so a resource ID naming src_e294bafc730fe7111b06 or src_a2ffe25e8362fe840ceb would fail the corpus check. Written out in evidence_basis instead.
articleSourceIds: As above — both supporting sources are outside the corpus source index.
claimIds: No evidence pass has been run for 108 INT. Searched the live claim store for "calcification", "dystrophic" and "hypercalcemia"; the calcification hit is an ultrasound acoustic-shadowing claim and the hypercalcaemia hits are endocrine diagnostic claims, none of which asserts this content. Left blank under LD-14.
spanIds: A span binds one sentence to the claims supporting it, and this module has no claims. Reported as a known contract gap.
media: No rights-cleared asset exists for this module. Three are requested in media_recommendations.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: A review date is set when a reviewer is assigned.

---

# Item
## id
ART-108-PAT-AMYLOIDOSIS
## title
Amyloidosis
## arabic_title
الداء النشواني
## aliases
Amyloidosis
Amyloid
AL amyloid
AA amyloid
Congo red
Apple green birefringence
Sago spleen
Macroglossia
## subject
fnd
## topic
General pathology
## subtopic
Intracellular Accumulation and Extracellular Depositions
## microtopic
Amyloidosis
## nanotopic
Staining characteristics of amyloid
## primary_node_id
SYS-FND-T03-S01
## secondary_node_ids
DIS-PAT-T01
DIS-PAT-T04
DIS-PAT-T08
## template_id
TPL-CONCEPT
## archetype
concept
## language
en
## learner_stage
Years 1–3 foundation
## reading_time
18
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
## summary
Amyloid is not a substance but a shape: a beta-pleated fibril with amyloid P, which more than twenty different proteins can adopt. Six pages of the department book go to it, and both end-of-year papers draw on it — the fibril protein in a named disease, the Congo red birefringence, the organ pictures, and "what is the nature of amyloid" as a written question. It is the heaviest single topic in chapter 2.
## sections
### Definition
Amyloidosis is extracellular deposition of abnormal protein having beta-pleated configuration with a glycoprotein, amyloid P protein. It is deposited on basement membrane, reticulin fibres, and walls of small blood vessels. The affected tissue becomes hard and waxy.

That definition is the answer to "what is the nature of amyloid", which the book's own formative assessment asks and which the 2024 paper asks as a one-mark definition. Every clause earns part of the mark: extracellular, abnormal protein, beta-pleated, amyloid P, and the sites.

Amyloidosis results from abnormal folding of proteins, which become insoluble, aggregate and deposit as fibrils in extracellular tissues. Normally, misfolded proteins are degraded intracellularly in proteasomes, or extracellularly by macrophages; in amyloidosis these quality control mechanisms fail, leading to accumulation of misfolded protein outside cells. The proteins that form amyloid fall into two general categories: normal proteins that have an inherent tendency to fold improperly, associate and form fibrils when they are produced in increased amounts, and mutant proteins that are prone to misfolding and subsequent aggregation.

### Mechanism
Of more than twenty distinct forms of amyloid protein, the book names two as commonest.

Amyloid light chain, AL, protein is immunoglobulin light chains derived from plasma cells. Amyloid-associated, AA, protein is a non-immunoglobulin protein derived from a larger serum precursor called serum amyloid-associated, SAA, protein, synthesised by hepatocytes as part of the acute phase response.

Amyloidosis is classified into systemic or localised types.

In systemic amyloidosis the material is deposited in many organs — liver, spleen, tongue, heart and kidney — resulting in organomegaly such as hepatomegaly, splenomegaly and macroglossia, and leading to organ dysfunction such as heart failure and proteinuria. It is further classified by aetiology into three.

Primary, or myeloma-associated, amyloidosis has AL protein. It is associated with myeloma, a plasma cell tumour, often multiple, arising in bone marrow and causing extensive bone erosion, which produces an extensive amount of immunoglobulin of a single class with one type of light chain; the light chain forms the amyloid, and the deposits appear in liver, kidneys, heart and spleen.

Secondary, or reactive, amyloidosis has AA protein derived from SAA. SAA is an acute phase reactant protein secreted by the liver when stimulated by cytokines produced by inflammatory cells, so reactive amyloidosis is secondary to long-lasting chronic inflammatory disorders such as bronchiectasis, chronic osteomyelitis, rheumatoid disease, tuberculosis, and Crohn's disease and ulcerative colitis. It is widespread but has a predilection for liver, spleen and kidneys.

Senile amyloidosis deposits minute amounts of transthyretin in the heart and in the wall of blood vessels, and only in a few cases does this result in significant clinical disease.

In localised amyloidosis the deposits are limited to a single tissue or organ. In medullary carcinoma, a tumour from calcitonin-secreting C cells in the thyroid, amyloid material is seen in the stroma surrounding the tumour cells; the material is calcitonin precursor molecules arranged in beta-pleated sheet configuration, and it has no clinical effect but helps in identification of the tumour. Cerebral amyloid is found in Alzheimer disease, in neuritic plaques and in the wall of blood vessels. Localised deposits are rarely seen without any obvious cause, in skin, laryngeal wall, lung, ureter and urinary system. And amyloid is found in the islets of Langerhans in individuals with type 2 diabetes mellitus.

### Key determinants
Amyloid is demonstrated by stains, grossly and microscopically.

Grossly, a slice of tissue immersed in Lugol's iodine stains amyloid dark brown while the rest of the tissue stains yellow — which is the observation that gave the substance its starch-like name. Iodine followed by 1% sulphuric acid turns the amyloid blue.

Microscopically, amyloid stains pink with haematoxylin and eosin. With Congo red it stains orange red, and when examined by polarised light, using two filters in the path of light of a microscope, one fixed and one rotating, the amyloid appears as an apple-green light against a dark background — apple-green birefringence. With the metachromatic stains methyl violet and crystal violet, amyloid stains rose red while the rest of the tissue stains violet.

The organ pictures are the other half of the examinable material. The liver is enlarged, heavy, firm and rubbery with sharp borders, and its cut surface shows waxy light-brown streaks of amyloid on a yellow background of liver tissue that has undergone fatty change; microscopically the amyloid lies in the walls of sinusoids as pink streaks, the liver cells atrophy from pressure and anoxia, and the walls of hepatic arterioles and venules are thickened.

The kidney is enlarged, its cut surface pale yellow with brown waxy dots which are the amyloid in the glomeruli, and in long-standing cases the kidneys are contracted due to secondary ischaemic changes. Microscopically amyloid is deposited in the basement membrane of the glomerular capillaries and in the mesangium, appearing thick and pink, until the whole glomerular capillary is obliterated by the deposit and appears as a homogeneous pink mass; the walls of the arterioles are thickened by amyloid, the result is ischaemia and atrophy of tubules with increased connective tissue, amyloid is also deposited in the tubular basement membrane, and the tubular lumen shows hyaline casts. Clinically the patient presents with proteinuria and later renal failure.

The spleen takes one of two forms. Sago spleen is enlarged, rubbery and firm, its cut surface showing brown glassy dots — follicles with amyloid deposit — against a red background; the amyloid is deposited in the wall of the central arterioles in the lymph follicles of the white pulp, the walls are thick and pink and the lumen narrowed, and the follicles gradually atrophy and are replaced by amyloid. Diffuse amyloid or lardaceous spleen is a less common type, markedly enlarged, with a cut surface showing brown streaks; the amyloid is widely deposited in the sinusoids of the red pulp and the white pulp is atrophic.

Any part of the gastrointestinal tract can be affected: amyloid in the tongue causes macroglossia, and in the intestine the early lesions mainly affect blood vessels but eventually extend into the adjacent submucosa, muscularis and subserosa, resulting in mucosal atrophy, with malabsorption and protein loss as the effects. In the heart, amyloid is deposited in the walls of small blood vessels and in the interstitial tissue surrounding and replacing muscle fibres; the heart is enlarged and the myocardium thickened and firm, and the effects are cardiac arrhythmias and heart failure.

The diagnosis of amyloidosis depends on the histological demonstration of amyloid deposits in tissues. The most common sites biopsied are the kidney, when renal manifestations are present, or rectal or gingival biopsy in patients suspected of having systemic amyloidosis.

### Clinical significance
Reactive amyloidosis is the form that matters most locally, because its causes are the ones a Cairo hospital sees: tuberculosis, bronchiectasis and chronic osteomyelitis are all on the book's own list, and all three remain common. A patient with years of chronic inflammation who develops proteinuria has one diagnosis to exclude first.

The route from disease to organ failure is short and mechanical. Amyloid in a glomerular basement membrane obliterates the capillary, so protein leaks and then filtration fails. Amyloid around cardiac muscle fibres stiffens the wall, so the heart cannot fill and it fails. Nothing is inflamed, nothing is infected — the organ simply has protein where it needed space.

The diagnostic strategy is worth holding for the same reason. Rectal and gingival biopsy exist because a systemic deposit can be demonstrated from an accessible site; taking the amyloid kidney or the failing heart to prove what a gum can prove is a risk that does not need taking.

### Common misconceptions
Amyloid is not one substance. It is a configuration that more than twenty proteins can adopt, which is why the classification is by protein and by cause rather than by the deposit.

Primary amyloidosis is not idiopathic. In this book it is myeloma-associated, and the 2024 paper asked for exactly that.

Multiple myeloma does not give AA protein. It is a plasma cell tumour, so it gives light chains and therefore AL — and it was the exception in a list of chronic inflammatory diseases on the 2024 paper.

Congo red alone is not diagnostic. It gives orange-red under ordinary light; the confirmation is apple-green birefringence under polarised light.

An amyloid kidney does not stay large. Enlarged early, contracted late, because amyloid in the arterioles makes it ischaemic.

A thickened firm myocardium in amyloidosis is not hypertrophy. It is deposit replacing muscle, and the heart is stiffer rather than stronger.
## published_summary

## published_sections
[clear]

## hold_these
Amyloidosis is extracellular deposition of abnormal protein in beta-pleated configuration with the glycoprotein amyloid P, on basement membranes, reticulin fibres and small vessel walls; the tissue becomes hard and waxy.
It results from failure of the proteasome and macrophage systems that normally clear misfolded protein.
AL amyloid is immunoglobulin light chain from plasma cells; AA amyloid derives from SAA, an acute phase protein made by hepatocytes.
Systemic amyloidosis is primary and myeloma-associated with AL, secondary and reactive with AA, or senile with transthyretin.
Reactive amyloidosis follows bronchiectasis, chronic osteomyelitis, rheumatoid disease, tuberculosis, Crohn's disease and ulcerative colitis.
Localised amyloid occurs in medullary thyroid carcinoma, Alzheimer disease, type 2 diabetic islets, and occasionally without cause in skin, larynx, lung and urinary tract.
Congo red plus polarised light gives apple-green birefringence; Lugol's iodine stains amyloid dark brown grossly; methyl and crystal violet stain it rose red.
The amyloid kidney is enlarged with brown waxy glomerular dots, then contracted; the glomerulus is obliterated by pink homogeneous deposit, and the patient has proteinuria then renal failure.
Sago spleen has brown glassy follicular dots on a red background; lardaceous spleen has diffuse brown streaks in the red pulp.
Cardiac amyloid gives arrhythmia and heart failure; tongue amyloid gives macroglossia; intestinal amyloid gives malabsorption and protein loss.
Diagnosis is histological: kidney biopsy when renal disease is present, otherwise rectal or gingival biopsy.
## lose_the_mark
Answering tuberculosis, acute inflammation or renal transplantation for primary amyloidosis. It is plasma cell tumour, multiple myeloma.
Assigning AA protein to multiple myeloma. Myeloma makes light chains, so AL.
Reporting Congo red orange-red as the confirmation. The confirmation is apple-green birefringence under polarised light.
Answering yellow, blue or black for the polarised-light appearance. It is apple green.
Reading the yellow background of the amyloid liver as amyloid. The yellow is coexisting fatty change; the amyloid is the waxy brown streak.
Describing the amyloid kidney as always enlarged.
Calling the thickened amyloid myocardium hypertrophied.
Defining amyloid without the words extracellular and beta-pleated. Both carry marks.
## related_concepts
CON-FND-D955408D228002 | CON-FND-8151AE03EA25C5 | CON-FND-E3F496F6DDD7C3 | CON-FND-42A1BD1A1DAAE6 | CON-FND-4867DD3814D088 | CON-FND-699152CE450385 | CON-FND-00024C3C0A7C4F | CON-FND-13BFC600597FD6 | CON-FND-A69F39242D6698
## related_articles
ART-108-PAT-PATHOLOGICAL-CALCIFICATION: the other extracellular deposit chapter 2 teaches
ART-108-PAT-INTRACELLULAR-ACCUMULATIONS: hyaline change, which is the other homogeneous pink material on H&E, and the fatty change that colours the amyloid liver yellow
ART-108-PAT-APOPTOSIS: misfolded protein, which the book names as a cause of apoptosis and as the substance of amyloid
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

## universities
kau
## years
KAU_Y1
## module
108 INT
## module_subject
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Amyloidosis
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Amyloidosis > Pathogenesis of amyloidosis
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Amyloidosis > Types of amyloid protein
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Amyloidosis > Systemic amyloidosis
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Amyloidosis > Localized amyloidosis
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Amyloidosis > Staining characteristics of amyloid
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Amyloidosis > Pathological changes in different organs in amyloidosis
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Amyloidosis > Diagnosis of amyloidosis
## university_notes
kau: Amyloidosis is not named in any of chapter 2's seven ILOs, and it occupies six of the chapter's twelve pages. Both papers examine it and the chapter's own formative assessment sets two SAQs on it — the nature of amyloid, and the causes of secondary amyloidosis. As with calcification, the ILO list understates the topic and the papers are the better guide.
## annotations
### definition_of · CON-FND-D955408D228002
Quote: Amyloidosis is extracellular deposition of abnormal protein having beta-pleated configuration with a glycoprotein, amyloid P protein.
Block: body

### definition_of · CON-FND-8151AE03EA25C5
Quote: Amyloid light chain, AL, protein is immunoglobulin light chains derived from plasma cells.
Block: body

### definition_of · CON-FND-E3F496F6DDD7C3
Quote: Senile amyloidosis deposits minute amounts of transthyretin in the heart and in the wall of blood vessels, and only in a few cases does this result in significant clinical disease.
Block: body

### definition_of · CON-FND-42A1BD1A1DAAE6
Quote: In localised amyloidosis the deposits are limited to a single tissue or organ.
Block: body

### diagnosed_by · CON-FND-4867DD3814D088
Quote: With Congo red it stains orange red, and when examined by polarised light, using two filters in the path of light of a microscope, one fixed and one rotating, the amyloid appears as an apple-green light against a dark background — apple-green birefringence.
Block: body

### definition_of · CON-FND-699152CE450385
Quote: Clinically the patient presents with proteinuria and later renal failure.
Block: body

### definition_of · CON-FND-00024C3C0A7C4F
Quote: Sago spleen is enlarged, rubbery and firm, its cut surface showing brown glassy dots — follicles with amyloid deposit — against a red background; the amyloid is deposited in the wall of the central arterioles in the lymph follicles of the white pulp, the walls are thick and pink and the lumen narrowed, and the follicles gradually atrophy and are replaced by amyloid.
Block: body

### definition_of · CON-FND-13BFC600597FD6
Quote: In the heart, amyloid is deposited in the walls of small blood vessels and in the interstitial tissue surrounding and replacing muscle fibres; the heart is enlarged and the myocardium thickened and firm, and the effects are cardiac arrhythmias and heart failure.
Block: body

### definition_of · CON-FND-A69F39242D6698
Quote: The most common sites biopsied are the kidney, when renal manifestations are present, or rectal or gingival biopsy in patients suspected of having systemic amyloidosis.
Block: body
## media

## media_recommendations
### histology · Renal amyloidosis in two panels: H&E showing pink amyloid in glomeruli and afferent arterioles, and Congo red under polarised light showing apple-green birefringence in the same structures
Purpose: Teaches CON-FND-4867DD3814D088 and CON-FND-699152CE450385. The whole diagnostic argument is that one field looks unremarkable and the other is definitive, and a student who has read about birefringence without seeing it cannot picture green light on a black field.
Priority: required
Status: needed
Kind: histology
Section: Key determinants
Source direction: openly licensed renal pathology teaching set with matched H&E and Congo red polarised fields; the book's own Figure (2.2) shows this pair and is inside a copyrighted PDF
Rights: must be CC-BY or public domain

### histology · Liver amyloidosis: amyloid deposited in the sinusoids as pink streaks with compression of the liver cell cords
Purpose: Teaches CON-FND-00024C3C0A7C4F. The teaching point is compression — the liver cells atrophy because something is pressing on them — and a description of "pink streaks" gives no sense of a cord being squeezed.
Priority: required
Status: needed
Kind: histology
Section: Key determinants
Source direction: openly licensed hepatic pathology teaching set; the book's Figure (2.1) shows this and is not rights-cleared
Rights: must be CC-BY or public domain

### clinical photograph · Sago spleen: cut surface showing brown glassy follicular dots against a red background, beside a lardaceous spleen with diffuse brown streaks
Purpose: Teaches CON-FND-00024C3C0A7C4F. The two splenic forms are distinguished by pattern alone — dots against streaks — which is precisely what prose cannot carry and a single paired photograph settles.
Priority: required
Status: needed
Kind: clinical photograph
Section: Key determinants
Source direction: openly licensed museum specimen collection; the book's Figure (2.3) shows both and is not rights-cleared
Rights: must be CC-BY or public domain

### comparison table · Primary, secondary and senile systemic amyloidosis against fibril protein, underlying disease and organs affected
Purpose: Teaches CON-FND-E3F496F6DDD7C3 and CON-FND-8151AE03EA25C5. The 2024 paper asked both a "primary amyloidosis occurs in" question and an "all of these give AA except" question, which are the two directions of one table.
Priority: required
Status: needed
Kind: comparison table
Section: Mechanism
Source direction: drawn to order from the department book's page 17
Rights: original diagram
## publication_gate
needs_evidence
## evidence_basis
Kasr Alainy 108 INT pathology department book, manifest source src_e294bafc730fe7111b06, physical pages 16 to 21, native text layer, including the chapter's own formative assessment SAQs on page 21.
Exam weighting from the 2025 and 2024 end-of-year papers, src_bd1595e59d116b78436a and src_3deab75f7f81cc5f5260, which between them ask four amyloid MCQs and two written parts.
## evidence_gaps
No claim or citation record exists for this module, so nothing in this article is claim-linked.
The book says more than twenty forms of amyloid protein exist and names four, so the full classification is outside this source.
The book does not say what determines which tissues a given amyloid protein prefers.
The book does not say how long chronic inflammation must last before reactive amyloidosis appears.
The book does not give the yield of a rectal or gingival biopsy, so the value of a negative one cannot be stated.
The book does not say whether the hyaline casts in the amyloid kidney are themselves amyloid, nor whether amyloid heart failure is systolic or diastolic.
## conflicts
A live neuropathology concept states that amyloid is AB protein, where this book states that more than twenty forms exist, of which AL and AA are commonest and cerebral amyloid is one localised form. That is a general rule and a special case rather than a disagreement, and both are recorded on the concept records. The book writes the cerebral protein as "Aβ2" where the live record writes "AB protein"; the rendering difference is recorded rather than normalised away.
## last_reviewed

## review_due

## notes
All nine concepts here sit on the section node SYS-FND-T03-S01 under protest: the canonical taxonomy has no node for amyloidosis in any of its four views, and amyloid is an extracellular deposit that none of that section's four microtopics describes. Each carries a primaryNodeId field note. The organ records are kept together on this node rather than distributed across the renal, cardiovascular and gastrointestinal systems views, which would split one systemic disease into four homes.
## field_notes
questionIds: No questions test this article yet; the 108 INT question batch is a later pass and it will have more material here than anywhere else in the module.
resourceIds: The Kasr manifest sources are absent from corpus-source-index.json, which holds only corpus/01-explicitly-taught/ sources, so a resource ID naming src_e294bafc730fe7111b06 would fail the corpus check. Written out in evidence_basis instead.
articleSourceIds: As above — the supporting source is src_e294bafc730fe7111b06, which the corpus source index does not contain.
claimIds: No evidence pass has been run for 108 INT. The one live amyloid claim, CLM-NEU-7AE49F0DB2D418, asserts that amyloid is AB protein, which is true of cerebral amyloid and false as a general statement; attaching it here would import an error. Left blank under LD-14.
spanIds: A span binds one sentence to the claims supporting it, and this module has no claims. Reported as a known contract gap.
media: No rights-cleared asset exists for this module. Four are requested in media_recommendations; the book's Figures (2.1), (2.2) and (2.3) show three of them and sit inside a copyrighted PDF, so each is named as a brief rather than attached.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: A review date is set when a reviewer is assigned.
