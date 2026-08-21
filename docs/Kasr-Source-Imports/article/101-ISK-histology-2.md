<!--
  Library articles for 101 ISK — Histology, Year 1, Kasr Al Ainy (kau).

  Twelve articles, completing the Histology half of the module: the three blood
  leaves of ../academic/101-isk-structure.md not covered by 101-ISK-histology.md,
  and the nine remaining leaves — Microscopes, Microtechniques, The cell, Nucleus,
  Connective Tissue Fibres, Types of Connective Tissue Proper, Glandular
  Epithelium, Neuro Epithelium and Myo Epithelium — added in the pass that
  followed.

  Source of record: the department's own book, "Normal Structure of the Human
  Body (ISK - 101)", staff of the Histology and Anatomy Departments, Faculty of
  Medicine, Cairo University — extracted chapter by chapter into
  scripts/kasr/extract/deptbook.json (manifest source src_b1e6dc481eaf337268d0).
  Every percentage, diameter, count and classification below is the book's own.
  Where the book is silent the article says so in `evidence_gaps`, and where the
  question books ask for something the book never teaches, that is named in
  `field_notes` rather than smuggled in as though the faculty had taught it.

  What the question books ask of each leaf was read from
  scripts/kasr/extract/mcq-bank.json, filtered by `leaf`. Two of these leaves —
  Neuro Epithelium and Myo Epithelium — carry three questions and one question
  respectively, and the book gives each of them three or four lines. They are
  written short on purpose.

  `related_concepts` is what the importer derives coverage from, so each article
  lists every concept in ../concept/101-ISK-mcq-concepts.md and
  ../concept/101-ISK-concepts.md whose `module_subject` is that article's own
  subject path, copied rather than re-derived. Two articles list one concept
  beyond that rule — ART-101-HIS-THE-CELL the lateral junctions and
  ART-101-HIS-NUCLEUS the gamete nuclei — because those concepts name these
  articles in their own `article_ids` and their questions are filed on these
  leaves. Both are taught in the prose, from the department book, with the
  chapter they come from named in `evidence_basis`. Four leaves carry no concept
  at all yet, and their `field_notes` say so rather than borrowing one.

  The repository holds zero medical images (../media-requests/media-audit.md).
  Every plate these articles need is written as an `image_recommendations` block
  for a human to source. Nothing here downloads, generates or attaches an asset.

  Import: Content Setup › Bulk Import › Library articles.
-->

# Item
## id
ART-101-HIS-RED-BLOOD-CORPUSCLES
## title
Red blood corpuscles
## subject
haem
## status
Draft
## owner
Claude
## topic
Blood
## language
en
## learner_stage
Year 1 foundation
## template_id
TPL-CONCEPT
## archetype
concept
## high_yield
Core
## time_sensitive
stable
## publication_gate
needs_evidence
## universities
kau
## years
Year 1
## module
101 ISK
## module_subject
101 ISK > Histology > Blood > Red Blood Corpuscles
## primary_node_id
DIS-HIS-T02
## secondary_node_ids
SYS-HEM-T01-S01-M01
SYS-HEM-T01-S02-M02
## related_concepts
CON-HEM-1935D59A1D2839 | CON-HEM-4F5347CC3664E0
## related_articles
ART-101-HIS-HAEMOPOIESIS: The reticulocyte that replaces a lost red corpuscle, and the marrow that makes it, are described there.
ART-101-HIS-CYTOPLASMIC-ORGANELLES: The cell coat and the cytoskeleton this article relies on are set out in the cytology chapter, and the red corpuscle is the book's own worked example of both.
## aliases
RBCs | Erythrocytes | Red blood cells | Red corpuscles
## reading_time
12
## summary
Everything the examiner asks about the red corpuscle comes back to one design decision: it threw away its nucleus and its organelles to carry more haemoglobin, and it took a biconcave shape to trade gas across a larger surface. The diameter, the pale centre, the acidophilia, the rouleaux, the crenation and the 120-day life span are all consequences of that one trade, and the paper marks the consequences.
## sections
### Definition
Blood is a special type of connective tissue that circulates inside blood vessels, formed of cells and an extracellular fluid matrix called plasma. Of whole blood, 45% is cells and 55% is plasma. It is examined as a blood film: a drop spread on a glass slide, air-dried, and stained with a neutral stain such as Leishman's — a mixture of the acidic red dye eosin and the basic blue dye methylene blue, dissolved in methyl alcohol, which acts as the fixative.

The red blood corpuscle is a non-nucleated biconcave disc. In top view it is rounded; in side view the biconcavity shows, and it is the biconcavity that raises the surface area available for gas exchange. The book is careful with the word corpuscle: it states that red corpuscles and platelets are not true cells, because neither has a nucleus.

In a fresh unstained film the corpuscles already appear coloured, because of their haemoglobin. In a Leishman-stained film they are rounded, non-nucleated and acidophilic — haemoglobin is a basic protein, so it takes the acidic dye — with a pale centre occupying about one third of the diameter. A corpuscle staining this way is described as normochromic.

### Mechanism
The red corpuscle is adapted to its work in three ways, and the book sets them out as a table of factor against mode of adaptation. Learning the pairing matters more than learning the list, because the question books scramble the pairs.

The plasmalemma does two things. It is flexible, which lets the corpuscle be squeezed through capillaries narrower than itself. It is lipoprotein and therefore highly selective, which is what makes it a suitable surface for gas exchange while keeping the haemoglobin inside.

The shape does two things. The biconcave form increases the surface area available for gas exchange. The rounded edges ease passage through branched vessels.

The content does two things. The absence of a nucleus and of organelles means the corpuscle cannot divide, but it also leaves more space for haemoglobin — the corpuscle is 33% haemoglobin, 66% water and 1% enzymes. Those enzymes are the second half of the adaptation: haemoglobin reductase, which keeps haemoglobin able to combine with oxygen, and carbonic anhydrase, which lets the corpuscle carry carbon dioxide.

On electron microscopy the consequence of throwing away the nucleus is visible. There is no nucleus and no organelle of any kind; the cell is filled with electron-dense homogeneous haemoglobin, and the cell membrane is the only structure left. Beneath that membrane lies a cytoskeleton of actin and spectrin, which maintains the biconcave shape and the stability of the membrane. Outside it lies the glycocalyx, which carries the antigenic sites for the ABO blood groups and the Rh factor. The two surfaces do different jobs, and the paper asks them separately: the outer coat determines the blood group, the inner cytoskeleton determines the shape.

At the end of about 120 days the corpuscle is phagocytosed by macrophages in the liver, the bone marrow and the spleen. Its pigment is excreted as bile pigments and its iron is retained and reused to form new corpuscles.

### Key determinants
The corpuscle is 6–9 µm across, averaging 7.5 µm. It is 2.2 µm thick at the edge and 0.8 µm at the centre, which is why the centre is pale, and that pale centre is about one third of the diameter.

Size and shape are the two variables that change in disease, and the book names both sets.

Abnormal shapes arise from a change in the cell membrane or in the haemoglobin content. Spherocytes are spherical, ovalocytes oval, sickle cells crescent-shaped and poikilocytes pear-shaped. All of them are more fragile than a normal corpuscle and more liable to haemolysis, and the anaemia that follows is the consequence of that fragility rather than of any failure to make haemoglobin.

Abnormal sizes are microcytes, less than 6 µm; macrocytes, more than 9 µm; and anisocytosis, which is not a cell type but a description of a film in which corpuscles of different sizes appear together.

Rouleaux is the adhesion of corpuscles to one another in the arrangement of piles of coins. It happens in slow circulation, not in normal circulation. Its cause is surface tension produced by the biconcave surface, and it is reversible and does no damage to the corpuscles. The long chains sediment more readily than single corpuscles, which is the mechanism of a raised erythrocyte sedimentation rate — a non-specific rise that accompanies inflammation.

Osmotic behaviour is the other examinable property. In isotonic plasma, whose osmotic pressure equals that of 0.9% saline, the corpuscle keeps its normal shape. In a hypertonic solution it loses water, shrinks, and shows notches — crenation. In a hypotonic solution it takes up water, swells, bursts and leaks its haemoglobin, leaving behind the cell membrane alone, which is called a cell ghost.

Counting is done by haemocytometer or by an electronic counting instrument. The count is highest in the newborn and falls gradually with age.

**What the department's plates mark, and what the answer page accepts.** Every blood plate in the practical book opens with the same stem — "This is a ..., stained by ..." — and it carries marks of its own before any arrow is answered. The answer is a blood film, stained by Leishman's stain, and a student who begins with the arrowed cell has left the first half of the question blank. It is worth reading the field before reading the arrow: a blood film is a monolayer dominated by acidophilic non-nucleated red corpuscles, with the occasional nucleated leucocyte among them and small platelet fragments between them, and that description is what makes the preparation recognisable as a preparation.

The red corpuscle is then arrowed on almost every one of those plates, and the character the answer page wants is always the same: an RBC with central pallor. The pallor is thinning and not a hole — the corpuscle is 0.8 µm thick at the centre against 2.2 µm at the edge — and it is emphatically not a nucleus, because the mature corpuscle has none at all, which is the character the examiner is testing. On the same plate a second arrow often falls on a crenated corpuscle, the same cell shrunken in a hypertonic medium and showing notches at its edge, and the two are marked as separate answers.

### Normal values
Blood is 45% cells and 55% plasma. The average red corpuscle count is 5 million per mm³: 4.5–5.5 million per mm³ in the adult male and 4–5 million per mm³ in the adult female. The book attributes the higher male figure to the stimulatory effect of male hormones on the bone marrow.

Diameter is 6–9 µm, average 7.5 µm. Thickness is 2.2 µm at the edge and 0.8 µm at the centre. The pale centre is about one third of the diameter. Microcytes are under 6 µm and macrocytes over 9 µm. Life span is about 120 days. Content is 33% haemoglobin, 66% water and 1% enzymes.

Anaemia is a count below 4 million per mm³. Polycythaemia is a count above 6 million per mm³. Isotonicity is the osmotic pressure of 0.9% saline.

### Clinical significance
Anaemia is defined by the book as a decreased number of corpuscles — oligocythaemia — and/or a decreased haemoglobin concentration, and three named types are taught.

Pernicious anaemia follows a low vitamin B12 caused by failure of the stomach to produce intrinsic factor. Sickle cell anaemia is caused by an abnormal, rigid type of haemoglobin, HbS, which accumulates at one side of the corpuscle and pulls it into a crescent. Aplastic anaemia follows destruction of the bone marrow by chemotherapy or irradiation, and because the marrow makes every blood cell the result is a pancytopenia rather than an isolated anaemia.

Polycythaemia is an increased number of corpuscles caused by hypoxia stimulating the bone marrow, and the book divides it in two. Physiological polycythaemia occurs at high altitude, with muscular exercise, and in the newborn. Pathological polycythaemia accompanies chronic lung and heart diseases. The division is the examinable point: chronic lung disease belongs on the pathological side, not among the physiological causes.

The raised erythrocyte sedimentation rate of inflammation is the clinical face of rouleaux, and the two are worth holding together, because the rate is measured constantly and the mechanism behind it is taught only here.

### Common misconceptions
The corpuscle is not immunologically active. It transports gases; it does not phagocytose, and it plays no part in defence. The antigens of the ABO and Rh systems sit on its coat, but carrying an antigen is not the same as mounting a response.

Aged corpuscles are not destroyed by megakaryocytes and not destroyed only in the spleen. They are phagocytosed by macrophages, in liver, bone marrow and spleen alike.

Crenation is what a hypertonic solution does, and haemolysis with a cell ghost is what a hypotonic solution does. The pair is reversed more often than any other fact in this chapter, and a single sentence fixes it: a hypertonic solution draws water out, so the cell shrinks.

Rouleaux is not a sign of damage and not a feature of normal circulation. It is reversible, it harms nothing, and it needs slow flow to occur.

The central pallor is not a nucleus and not a vacuole. It is the thin middle of a biconcave disc seen from above, and the absence of a nucleus is precisely the character the answer page asks for.

Answering only the arrowed cell is answering half the question. The department's stem names the preparation and the stain first, and those are marks in their own right.
## hold_these
The red corpuscle is 6–9 µm across with an average of 7.5 µm, and the pale centre is about one third of the diameter.
It is 2.2 µm thick at the edge and 0.8 µm at the centre, which is why the centre is pale.
It is acidophilic because haemoglobin is a basic protein.
Life span is about 120 days, ending in phagocytosis by macrophages of liver, bone marrow and spleen, with the iron reused and the pigment excreted as bile pigment.
Average count 5 million per mm³, adult male 4.5–5.5 and adult female 4–5, the difference being the stimulatory effect of male hormones on the marrow.
Anaemia is below 4 million per mm³ and polycythaemia above 6 million per mm³.
Content is 33% haemoglobin, 66% water and 1% enzymes, the enzymes being haemoglobin reductase and carbonic anhydrase.
The cytoskeleton of actin and spectrin on the inner surface keeps the shape, while the glycocalyx on the outer surface carries the ABO and Rh antigens.
Hypertonic solution causes crenation, hypotonic solution causes swelling, bursting and a cell ghost, and isotonicity is the osmotic pressure of 0.9% saline.
Rouleaux occurs in slow circulation, is caused by the surface tension of the biconcave surface, is reversible and harmless, and explains the raised erythrocyte sedimentation rate.
On electron microscopy the cell membrane is the only structure present, the interior being homogeneous electron-dense haemoglobin.
Every practical blood plate opens "This is a ..., stained by ...", and the answer is a blood film stained by Leishman's stain, which is eosin and methylene blue in methyl alcohol.
A blood film is a monolayer of acidophilic non-nucleated red corpuscles, with occasional nucleated leucocytes and small platelet fragments between them.
The answer page's character for the red corpuscle is "RBC with central pallor"; the same plate usually arrows a crenated corpuscle, with notches at its edge, as a separate answer.
## lose_the_mark
Pairing the adaptations wrongly. The flexible membrane is for squeezing through capillaries and the lipoprotein membrane for gas exchange, while the biconcave shape gives surface area and the rounded edges ease passage through branched vessels.
Swapping crenation and haemolysis. Hypertonic shrinks and crenates, hypotonic swells and bursts.
Giving the red corpuscle a role in immunity. It carries blood group antigens but does not defend.
Writing that aged corpuscles are destroyed by megakaryocytes, or only in the spleen. Macrophages destroy them, in liver, bone marrow and spleen.
Calling chronic lung disease a physiological cause of polycythaemia. High altitude, exercise and the newborn are physiological, and chronic lung and heart disease are pathological.
Attributing rouleaux to low surface tension. The book attributes it to the surface tension caused by the biconcave surface, and it happens in slow circulation.
Saying the pale centre is half the diameter. The book states one third.
Calling the red corpuscle a true cell. The book states that red corpuscles and platelets are not true cells.
Explaining the corpuscle's acidophilia by saying haemoglobin is acidic. Haemoglobin is a basic protein, which is why it binds the acid dye.
Skipping the preparation. Every blood plate begins "This is a ..., stained by ...", and the answer is a blood film stained by Leishman's stain before any cell is named.
Calling the central pallor a nucleus or a vacuole. It is the thin centre of a biconcave disc, and the mature corpuscle has no nucleus at all.
## image_recommendations
### histology · Human peripheral blood film, Leishman stain, oil immersion, showing normochromic red corpuscles with the pale central third clearly visible
Purpose: The pale centre being one third of the diameter is a proportion, and a proportion is what a student either sees or guesses. The written paper asks for the fraction and the practical asks the student to recognise it.
Priority: required
Status: needed
Kind: histology
Section: Definition
Source direction: openly licensed haematology atlas or an institutional teaching set
Rights: must be CC-BY or public domain, no all-rights-reserved textbook figure
Notes: An unlabelled version is preferred so the same plate can carry a labelling question later.
### diagram · Red corpuscle in top view and in side view, with the 7.5 µm diameter, the 2.2 µm edge thickness and the 0.8 µm central thickness marked
Purpose: The book's own first figure. Top view against side view is the only way to show why a rounded cell has a pale middle, and the three measurements only make sense on a drawn profile.
Priority: required
Status: needed
Kind: diagram
Section: Key determinants
Source direction: purpose-drawn, following the department book's page 26 figure rather than reproducing it
Rights: newly drawn for this product, or CC-BY
### diagram · The four abnormal shapes side by side — spherocyte, ovalocyte, sickle cell and poikilocyte — beside a normal biconcave corpuscle for scale
Purpose: The book prints these unlabelled. Four named shapes recalled from a word list are four words. Seen together against a normal cell, they are a discrimination the student can make on a slide.
Priority: required
Status: needed
Kind: diagram
Section: Key determinants
Source direction: purpose-drawn, or an openly licensed haematology morphology plate
Rights: must be CC-BY or public domain, or newly drawn for this product
### histology · Rouleaux formation in a blood film, corpuscles adherent in the arrangement of piles of coins
Purpose: The book's simile is a visual one, and students who have only read the words routinely describe clumping rather than stacking. The distinction matters because the stacking is what makes the chains sediment.
Priority: strongly helpful
Status: needed
Kind: histology
Section: Key determinants
Source direction: openly licensed haematology atlas
Rights: must be CC-BY or public domain
### diagram · One corpuscle in isotonic, hypertonic and hypotonic solution, showing normal shape, crenation with notches, and swelling to a burst cell with a cell ghost left behind
Purpose: This is the single most commonly reversed pair in the chapter, and the reversal survives repeated reading of the sentence. Three cells in a row, in the same drawing, fixes the direction of water movement.
Priority: required
Status: needed
Kind: diagram
Section: Key determinants
Source direction: purpose-drawn for this product
Rights: newly drawn for this product, or CC-BY
## conflicts
[clear]
## evidence_gaps
The book states no acid–base buffering role for the red corpuscle, although the question books ask for one. Only gas transport is claimed here.
The book names spherocytes as an abnormal shape and actin and spectrin as the cytoskeleton, but never connects the two. It does not state that hereditary spherocytosis is a spectrin defect, and this article does not either.
No numerical value is given for the erythrocyte sedimentation rate, nor for the osmotic fragility test, although both are named.
The book gives no figure for the newborn red corpuscle count, saying only that the count is highest in the newborn and falls gradually.
The book does not say how much of the 120-day life span is spent where, nor at what rate corpuscles are replaced.
The department book does not describe what a blood film looks like as a field — a monolayer dominated by red corpuscles with occasional leucocytes and platelets between them. It describes the preparation, and it describes each cell. The field description in Key determinants is assembled from the practical book's own plates, on every one of which a red corpuscle, a leucocyte and a platelet are arrowed in the same picture, rather than quoted from a sentence in either source.
No independent citation has been attached to any figure in this article. Every number is traceable to the department book only, which is a single source.
## evidence_basis
Department Book Module 101, "Normal Structure of the Human Body (ISK - 101)", Faculty of Medicine, Cairo University, Part I Histology, chapter III "Blood", section on Red Blood Corpuscles, printed pages 26-28, including the page 28 table "Adaptation of RBCs To Perform Their Functions". Extracted to scripts/kasr/extract/deptbook.json.
The department's practical book, "DPT Practical Histo 101" (src_b4cb8bf9f0c7a6584b4b), catalogued in scripts/kasr/extract/practical.json — the marked plate and facing answer page for the Leishman blood film carrying a neutrophil, a platelet, a red corpuscle with central pallor and a crenated corpuscle (p. 90), and the further Leishman films on pages 92 to 106, every one of which opens with the same two-part stem and arrows a red corpuscle with central pallor.
## field_notes
arabicTitle: Arabic histological terminology has not been reviewed for this module. It is filled at the evidence pass with a reviewer rather than guessed here.
media: No image exists in the repository, so every plate this article needs is written as an image recommendation.
relatedConcepts: No concept in ../concept/101-ISK-concepts.md or ../concept/101-ISK-mcq-concepts.md sits on this leaf. The two now listed are the identification concepts from ../concept/101-ISK-practical-concepts.md whose module subject path is this leaf, and both are taught above — the blood film and Leishman's stain in Definition and Key determinants, and the corpuscle's non-nucleated acidophilic disc with its central pallor, against the crenated corpuscle, in Definition, Key determinants and Common misconceptions.
practicalIdentification: The description of the blood film as a field is assembled from the practical plates rather than quoted from either source, and it is recorded in evidence_gaps.
questionIds: Questions for this article are authored in the question pass that follows, and the reciprocal link is written then.
subtopic: No SUB_ identifier has been assigned to this module in the canonical taxonomy, so the curriculum position is carried by module_subject instead.
microtopic: No microtopic level exists beneath this node.
nanotopic: No nanotopic level exists beneath this node.
reviewer: Not yet reviewed by faculty. The publication gate is needs_evidence for that reason.
beyondTheBook: The question books ask for the molecular cause of hereditary spherocytosis (a spectrin gene defect) and for an acid–base buffering function. Neither is in this chapter, and neither is taught here. Both are recorded as evidence gaps for a faculty reviewer to rule on.
## notes
Extended to close the practical gap on this leaf: two identification concepts sat here with no article claiming them, and the article already taught the substance of both — the Leishman preparation with its two dyes and its fixative, the corpuscle's acidophilia, its non-nucleated state, the pale central third, and crenation in a hypertonic medium. What it did not carry was the shape of the question. The department asks the preparation and the stain before it asks about any cell, and it arrows a normal and a crenated corpuscle on the same field, so the plate convention is written down here rather than left for a student to meet cold at the bench.

The book teaches this chapter as a table of factor against adaptation, and the question books test the pairing rather than the list, so the Mechanism section is organised as three factors with two adaptations each rather than as prose about function.

---

# Item
## id
ART-101-HIS-NON-GRANULAR-LEUKOCYTES
## title
Non-granular leukocytes
## subject
haem
## status
Draft
## owner
Claude
## topic
Blood
## language
en
## learner_stage
Year 1 foundation
## template_id
TPL-CONCEPT
## archetype
concept
## high_yield
Core
## time_sensitive
stable
## publication_gate
needs_evidence
## universities
kau
## years
Year 1
## module
101 ISK
## module_subject
101 ISK > Histology > Blood > Non granular leukocytes
## primary_node_id
DIS-HIS-T02
## secondary_node_ids
SYS-HEM-T01-S01-M02
SYS-HEM-T01-S02-M01
## related_articles
ART-101-HIS-GRANULAR-LEUKOCYTES: The differential count this article completes is stated there, and the total leukocytic count applies to both halves of it.
ART-101-HIS-CONNECTIVE-TISSUE-CELLS: The macrophage and the plasma cell, which are what the monocyte and the B lymphocyte become once they leave the blood, are described there.
ART-101-HIS-HAEMOPOIESIS: The marrow stem cell that both lines start from, and the thymus, are described there.
## aliases
Agranulocytes | Non granular leucocytes | Mononuclear leucocytes | Monocytes and lymphocytes
## reading_time
13
## summary
Two cells sit in this half of the differential count, and the exam separates them on one thing each: the monocyte on its size and its kidney-shaped nucleus, the lymphocyte on its surface receptors. Neither can be told apart from its neighbours by the granules, because neither has specific granules, so the questions turn instead on what each becomes after it leaves the blood — a macrophage, or a plasma cell.
## sections
### Definition
The non-granular leucocytes are the monocytes and the lymphocytes. They are non-granular in the sense that neither carries specific granules; both carry azurophil granules, which are lysosomes.

The monocyte is the largest leucocyte, 13–20 µm across, and is 3–8% of the white cells. Its nucleus is large, eccentric, pale and kidney-shaped, with one or two nucleoli. Its cytoplasm is non-granular and pale basophilic, with a frosted-glass appearance produced by its lysosomes, the azurophil granules.

The lymphocyte is the second most common white cell at 20–30% of the differential count. It is the second line of defence and it is the immune-competent cell: it carries surface markers, which are receptors for antigens, and it is those receptors and not its appearance that decide what kind of lymphocyte it is.

Two counts frame the chapter. The total leukocytic count is the total number of white cells per mm³ of blood, taken by haemocytometer or electronic counting instrument. The differential leukocytic count is the percentage of each type of white cell relative to the total, counted on a blood film stained with Leishman's stain.

### Mechanism
The monocyte is a stage, not a destination. It circulates for about three days, then enters the connective tissue and becomes a macrophage, where it lives about three months. It is highly phagocytic, engulfing bacteria and debris; it is an antigen-presenting cell; and it is the precursor of every phagocytic cell in the body — the dust cells of the lung, the Kupffer cells of the liver, the osteoclasts of bone and the microglia of the central nervous system all descend from it. When a question asks for the origin of a macrophage, of a Kupffer cell or of an osteoclast, the answer is the monocyte.

The lymphocyte is also a stage, but the pathway depends on which lymphocyte it is, and the three types look identical under both light and electron microscopy. They differ only in their surface receptors.

T lymphocytes begin as stem cells in the bone marrow and migrate to the thymus gland, where they differentiate and acquire their receptors. The book calls this thymic education. Their surface markers are T-cell receptors, of which the CD4 and CD8 proteins are named, and they mediate cell-mediated immunity. Four functional types are taught. Cytotoxic CD8-positive cells secrete perforins, which make pores in virally infected, transplanted or neoplastic cells. Helper CD4-positive cells activate B cells in the humoral response. Regulatory, or suppressor, T cells maintain unresponsiveness to self antigens and suppress an excessive response. Memory T cells give the rapid secondary response.

B lymphocytes mature in the bursa of Fabricius in birds and in the bone marrow in mammals. They carry receptors for IgM and IgD, and they mediate humoral immunity. Exposed to their specific antigen and activated by T-helper cells, a B lymphocyte becomes a plasmablast, then a plasma cell producing antibodies, and B memory cells responsible for the rapid second immune response. The two cells needed to start the humoral response are therefore the B lymphocyte and the T-helper cell.

Natural killer cells develop from the precursors of T and B cells but do not mature in the thymus. They carry CD16 among other markers and have neither T-cell nor B-cell receptors. They act in innate, early immunity without needing T-helper stimulation, they act similarly to cytotoxic T cells, and they secrete interferon, which is antiviral.

Lymphocytes are actively motile and circulate continuously between blood and lymphatic organs. The book makes a point of this: they are the only cells which can return to the blood, and they are found in blood, in lymph and in lymphatic tissue.

### Key determinants
The monocyte is settled by size and nucleus. It is the largest leucocyte at 13–20 µm, larger than the large lymphocyte at 10–15 µm, and its nucleus is large, eccentric, pale and kidney-shaped, with one or two nucleoli. The frosted-glass cytoplasm is the descriptive term the book uses and the question books repeat. On electron microscopy the nucleus is euchromatic with a clear nucleolus, and the cytoplasm has pseudopodia, mitochondria, rough endoplasmic reticulum, a well developed Golgi, and many primary and secondary lysosomes — the picture of a cell that is about to become a professional phagocyte.

Lymphocytes are classified twice, and the two classifications answer different questions.

By activity there are small and large lymphocytes. The small lymphocyte is 15–20% of white cells and 6–8 µm across, with a dark nucleus that fills the cell and only a thin rim of pale basophilic cytoplasm; on electron microscopy the nucleus is heterochromatic, and the cytoplasm holds many free ribosomes, two centrioles and small azurophil granules. It is the majority of circulating lymphocytes, and it is the book's own type example of a metabolically inactive cell with a condensed nucleus. The large lymphocyte is 5–10% of white cells and 10–15 µm across, with a large, indented, pale nucleus carrying a clear nucleolus, and abundant deeply basophilic cytoplasm; on electron microscopy the nucleus is euchromatic with a prominent nucleolus and the cytoplasm holds more mitochondria, rough endoplasmic reticulum, ribosomes, Golgi and lysosomes. A large lymphocyte is either an activated lymphocyte or a natural killer cell.

By function there are T lymphocytes, B lymphocytes and natural killer cells. They cannot be separated on a slide. T lymphocytes are 60–80% of lymphocytes and live for years. B lymphocytes are 20–30% and live from a few days to a few months. Natural killer cells are 5–10% and live for years. The maturation site separates them: thymus for T, bone marrow for B, and neither for the natural killer cell.

### Normal values
Monocytes are 3–8% of white cells, 13–20 µm in diameter, and live three days in blood and three months in connective tissue. Monocytosis is above 8% and monocytopenia below 3%.

Lymphocytes are 20–30% of white cells. Small lymphocytes are 15–20% of white cells at 6–8 µm; large lymphocytes are 5–10% at 10–15 µm. Of the lymphocytes, T cells are 60–80%, B cells 20–30% and natural killer cells 5–10%. Lymphocytosis is above 30% and lymphocytopenia below 20%.

The total leukocytic count is 4,000–11,000 per mm³. Leukocytosis is above 11,000 per mm³ and leukopenia below 4,000 per mm³.

### Clinical significance
Monocytosis accompanies chronic infection — the book names tuberculosis, syphilis and glandular fever — and monocytic leukaemia. Monocytopenia occurs as part of a pancytopenia rather than in isolation.

Lymphocytosis is physiological in children, and pathological in chronic infections such as tuberculosis and whooping cough, and in leukaemia. Lymphocytopenia, like monocytopenia, occurs as part of a pancytopenia.

Leukocytosis, an increase in the total white count, divides in two. Physiological leukocytosis is transient and follows pregnancy, labour, a cold bath or exercise. Pathological leukocytosis follows acute or chronic infection. Leukopenia is caused by X-ray, by irradiation, by typhoid fever, by influenza virus and by excessive use of some antibiotics.

Leukaemia is a cancer that starts in the bone marrow, giving a very high leucocytic count with abnormal and immature white cell forms appearing in the peripheral blood. The immaturity, not simply the number, is what makes the film diagnostic.

The book's named viral correlation is HIV, the human immunodeficiency virus that causes AIDS. It destroys T-helper cells, and because the T-helper cell is what activates the B cell, immunity falls and the patient becomes susceptible to infection.

### Common misconceptions
The plasma cell is not a lymphocyte with a different name and it does not come from the T lymphocyte. It is what a B lymphocyte becomes after antigen exposure and T-helper activation, by way of the plasmablast.

The macrophage does not come from the lymphocyte. It comes from the monocyte, and so do the dust cell, the Kupffer cell, the osteoclast and the microglial cell.

A large lymphocyte is not a monocyte. The monocyte is larger, at 13–20 µm against 10–15 µm, and its nucleus is kidney-shaped rather than merely indented.

Natural killer cells are not a kind of T lymphocyte. They arise from the same precursor pool but never pass through the thymus, and they carry neither T-cell nor B-cell receptors — which is exactly why they can act without T-helper stimulation.

Being non-granular does not mean having no granules at all. Both cells carry azurophil granules, which are lysosomes; what they lack is specific granules.
## hold_these
The monocyte is the largest leucocyte at 13–20 µm, 3–8% of white cells, with a large eccentric pale kidney-shaped nucleus and frosted-glass cytoplasm.
Monocyte life span is 3 days in blood and 3 months in connective tissue.
The monocyte is the precursor of all phagocytic cells — macrophages, dust cells of the lung, Kupffer cells of the liver, osteoclasts of bone and microglia of the central nervous system — and is an antigen-presenting cell.
Lymphocytes are 20–30% of white cells, small lymphocytes 15–20% at 6–8 µm and large lymphocytes 5–10% at 10–15 µm.
A large lymphocyte is either an activated lymphocyte or a natural killer cell.
T lymphocytes are 60–80% of lymphocytes and mature in the thymus, B lymphocytes are 20–30% and mature in bone marrow in mammals, and natural killer cells are 5–10% and mature in neither.
The three functional lymphocyte types look identical by light and electron microscopy and differ only in surface receptors.
B lymphocytes carry receptors for IgM and IgD and become plasmablast, then plasma cell, then B memory cell.
Cytotoxic CD8-positive T cells secrete perforins, helper CD4-positive T cells activate B cells, regulatory T cells maintain self-tolerance and memory T cells give the secondary response.
Total leukocytic count is 4,000–11,000 per mm³, leukocytosis above 11,000 and leukopenia below 4,000.
The differential leukocytic count is the percentage of each type against the total, read on a Leishman-stained blood film.
Lymphocytes are the only cells which can return to the blood after leaving it.
## lose_the_mark
Deriving the macrophage from the lymphocyte. The monocyte is the parent of every phagocytic cell the book names.
Deriving the plasma cell from the T lymphocyte. The plasma cell comes from the B lymphocyte, after activation by a T-helper cell.
Calling the large lymphocyte the largest leucocyte. The monocyte is larger at 13–20 µm against 10–15 µm.
Treating natural killer cells as thymus-educated. They arise from T and B precursors but never mature in the thymus, and carry neither receptor.
Saying non-granular means no granules. Both cells carry azurophil granules, which are lysosomes.
Giving IgE as the B lymphocyte receptor. The book gives IgM and IgD, and IgE receptors belong to the basophil and the mast cell.
Reporting monocytopenia or lymphocytopenia as an isolated finding. The book presents both as part of a pancytopenia.
Confusing the two counts. The total leukocytic count is cells per mm³, and the differential count is a percentage of the total.
## image_recommendations
### histology · Blood film, Leishman stain, oil immersion, one monocyte and one small lymphocyte in the same field at the same magnification
Purpose: The discrimination is one of relative size and nuclear shape, and relative size cannot be judged from two separate plates. Two cells in one field make the 13–20 µm against 6–8 µm difference visible rather than remembered.
Priority: required
Status: needed
Kind: histology
Section: Key determinants
Source direction: openly licensed haematology atlas or an institutional teaching set
Rights: must be CC-BY or public domain, no all-rights-reserved textbook figure
Notes: An unlabelled version is preferred so the same plate can carry a labelling question later.
### histology · Monocyte at oil immersion showing the kidney-shaped eccentric nucleus and the frosted-glass cytoplasm
Purpose: Frosted glass is a descriptive term the book uses and the examiner repeats, and it means nothing to a student who has never seen the texture it describes.
Priority: required
Status: needed
Kind: histology
Section: Definition
Source direction: openly licensed haematology atlas
Rights: must be CC-BY or public domain
### comparison table · Small versus large lymphocyte — percentage, diameter, light-microscopic nucleus and cytoplasm, electron-microscopic nucleus and organelles, side by side
Purpose: The book sets this out as a table and the paper asks it back as a table. Prose forces the student to rebuild the columns before answering.
Priority: strongly helpful
Status: needed
Kind: comparison table
Section: Key determinants
Source direction: purpose-drawn from the department book's page 37 table, redrawn rather than reproduced
Rights: newly drawn for this product, or CC-BY
### diagram · Monocyte leaving a capillary and becoming a macrophage, with the four named descendants — dust cell, Kupffer cell, osteoclast, microglial cell — drawn at their sites
Purpose: The origin of four differently named cells in four different organs is a fact about a lineage. Drawn as one branching path from one blood cell, it stops being four facts to memorise separately.
Priority: strongly helpful
Status: needed
Kind: diagram
Section: Mechanism
Source direction: purpose-drawn for this product
Rights: newly drawn for this product, or CC-BY
### diagram · The B lymphocyte pathway — antigen exposure, T-helper activation, plasmablast, plasma cell secreting antibody, and the B memory cell branch
Purpose: The examinable point is that two cells are required to start the humoral response, and that is a relation between cells rather than a property of one. A drawing carries the dependency; a list does not.
Priority: required
Status: needed
Kind: diagram
Section: Mechanism
Source direction: purpose-drawn for this product
Rights: newly drawn for this product, or CC-BY
## conflicts
[clear]
## evidence_gaps
The book states that the three lymphocyte types are indistinguishable by light and electron microscopy but does not say how they are distinguished in practice beyond naming their surface markers. No immunostaining method is described in this chapter.
The book gives no total lymphocyte life span figures beyond "years", "a few days to a few months" and "years" for T, B and natural killer cells respectively.
The book names CD4, CD8 and CD16 but does not say what a CD number is.
The question books ask which blood cell can divide. This chapter does not state that the lymphocyte divides, although it describes activation to plasmablast and plasma cell.
The macrophage's own structure and its role as an antigen-presenting cell are taught in the connective tissue chapter, not here, so this article names the destination without describing it.
No independent citation has been attached to any figure in this article.
## evidence_basis
Department Book Module 101, "Normal Structure of the Human Body (ISK - 101)", Faculty of Medicine, Cairo University, Part I Histology, chapter III "Blood", section on Non Granular Leucocytes, printed pages 36-38, including the page 37 tables comparing small with large lymphocytes and T with B with natural killer cells. Extracted to scripts/kasr/extract/deptbook.json.
## field_notes
arabicTitle: Arabic histological terminology has not been reviewed for this module. It is filled at the evidence pass with a reviewer rather than guessed here.
media: No image exists in the repository, so every plate this article needs is written as an image recommendation.
relatedConcepts: No authored concept sits on this leaf yet. The existing blood concepts cover granulocytes and platelets, and neither is what this article teaches, so none is claimed.
questionIds: Questions for this article are authored in the question pass that follows.
subtopic: No SUB_ identifier has been assigned to this module in the canonical taxonomy.
microtopic: No microtopic level exists beneath this node.
nanotopic: No nanotopic level exists beneath this node.
reviewer: Not yet reviewed by faculty. The publication gate is needs_evidence for that reason.
beyondTheBook: The question books ask which cell is the stem cell of the histiocyte, using a word this chapter never uses. Histiocyte is the connective tissue chapter's synonym for the fixed macrophage, and the answer is still the monocyte. The synonym is recorded here rather than introduced into the prose as though the book had taught it.
## notes
The differential count percentages in this article and in ART-101-HIS-GRANULAR-LEUKOCYTES together make up the book's whole differential, and they should be checked as a set at the evidence pass rather than one article at a time.

---

# Item
## id
ART-101-HIS-HAEMOPOIESIS
## title
Haemopoiesis
## subject
haem
## status
Draft
## owner
Claude
## topic
Blood
## language
en
## learner_stage
Year 1 foundation
## template_id
TPL-CONCEPT
## archetype
concept
## high_yield
Core
## time_sensitive
stable
## publication_gate
needs_evidence
## universities
kau
## years
Year 1
## module
101 ISK
## module_subject
101 ISK > Histology > Blood > Haemopoiesis
## primary_node_id
DIS-HIS-T02
## secondary_node_ids
SYS-HEM-T01-S01-M01
SYS-HEM-T01-S02-M03
## related_articles
ART-101-HIS-BLOOD-PLATELETS: The megakaryocyte described here is where the platelet comes from, and the demarcation channels are set out in full there.
ART-101-HIS-RED-BLOOD-CORPUSCLES: The reticulocyte is the immature form of the corpuscle described there, and the 120-day life span is what the marrow is replacing.
ART-101-HIS-CONNECTIVE-TISSUE-CELLS: The reticular cell, the fibroblast, the undifferentiated mesenchymal cell and the pericyte that make up the marrow stroma are described there as connective tissue cells.
## aliases
Haematopoiesis | Hemopoiesis | Blood cell formation | Bone marrow
## reading_time
9
## summary
The department book teaches haemopoiesis as a place rather than as a series of cells: what red bone marrow is made of, how a finished cell gets out of it, and two cells you can recognise — the reticulocyte and the megakaryocyte. It does not walk the erythroid or myeloid maturation series, and an answer built around blast and myelocyte stages is answering a question this chapter never sets.
## sections
### Definition
Haemopoiesis is the formation of blood cells, in the bone marrow and in lymphatic organs such as the thymus.

Bone marrow is myeloid tissue, and it is of two types. Red bone marrow is active; yellow bone marrow is inactive. Red marrow is present in most bones of children, and in the adult it retreats to the flat, short and irregular bones. Yellow marrow lies in the shafts of adult long bones. It is a fat store, and the book is explicit that it can change into active marrow at need — which is why yellow marrow is not simply dead space.

### Mechanism
Red bone marrow is described as a stroma holding free cells.

The stroma has two parts. The fixed cells are the reticular cells, which together with reticular fibres form a background network, and alongside them fibroblasts, undifferentiated mesenchymal cells, pericytes, osteogenic cells and fat cells. The book states that the fat cells are the largest cells in the bone marrow. The second part of the stroma is the blood sinusoids: wide, irregular blood capillaries lined by endothelial cells over a basement membrane that is not continuous, and through the pores of that discontinuous membrane the finished blood cells leave the marrow and enter the circulation. The discontinuity is the mechanism, and it is what a question about the sinusoid is testing.

The free cells are the developing stages of the blood cells, and the stem cells.

The proportions of the free cells reflect life span rather than importance. The ratio of immature white cells to immature red cells in the marrow is 5:1, and the reason the book gives is that the life span of most white cells is shorter than that of the red corpuscle — so more of them have to be made to hold a smaller number in the blood.

Two developing cells are described in detail, and they are the two the paper asks for.

The reticulocyte is an immature red corpuscle, slightly larger than the mature cell at 9 µm. Its cytoplasm is acidophilic, because it already holds haemoglobin, and within it lie remnants of ribosomes and polysomes forming a reticulum. That reticulum is not visible on a routine film: it is demonstrated with a supravital stain, brilliant cresyl blue, which stains living cells outside the body. So the reticulocyte is an acidophilic cell with a basophilic reticulum, and the pairing is what the question turns on.

The megakaryocyte is a very large cell, 50–70 µm across, with a single multilobed dark nucleus and basophilic cytoplasm. Invaginations of its cell membrane form demarcation channels which divide its cytoplasm into fragments; those fragments shed as platelets. It also extends pseudopodia — platelet ribbons — from which platelets detach directly.

### Key determinants
Red against yellow marrow is the book's own comparison, and it is asked as a table. Red marrow is active and haemopoietic, present in most bones of the child and in the adult's flat, short and irregular bones. Yellow marrow is inactive and fatty, in the shafts of adult long bones, and convertible back to red marrow at need. The trap is the site: the shaft of an adult long bone holds yellow marrow, not red.

The reticulocyte is settled on three facts: 9 µm, acidophilic cytoplasm with a basophilic reticulum, and a supravital stain. It does not exceed 1% of peripheral blood normally, and it rises after haemorrhage or destruction of red corpuscles — which makes the reticulocyte count the marrow's own report on whether it is responding.

The megakaryocyte is settled on two: it is very large at 50–70 µm, and its nucleus is single and multilobed. Single is the word that matters. The megakaryocyte is not multinucleated; it has one nucleus with many lobes.

### Normal values
The ratio of immature white cells to immature red cells in the marrow is 5:1. The reticulocyte measures 9 µm and does not exceed 1% of the cells in peripheral blood. The megakaryocyte is 50–70 µm in diameter.

### Clinical significance
Because the marrow is where the abnormality begins, the marrow is where it is found. The book states that a bone marrow aspirate or biopsy is needed to diagnose disorders such as aplastic anaemia and leukaemia — the film shows the consequence, the marrow shows the cause.

The reticulocyte percentage carries the same logic in the other direction. A rise above the normal 1% after bleeding or haemolysis says the marrow has responded; its absence says it has not.

The book's named therapeutic use is bone marrow transplantation: in marrow diseases such as leukaemia, stem cells taken from a donor are infused into the same or another person. The component transplanted is the haemopoietic stem cell, not the stroma, not the sinusoids and not the fat.

### Common misconceptions
Yellow marrow is not marrow that has been used up. It is a fat store that converts to active marrow when the body needs it, and its site — the shafts of adult long bones — is the point of the comparison.

The blood sinusoid does not have a continuous basement membrane. If it did, no cell could leave.

Reticular cells are part of the fixed stroma, not part of the free cell population, and the free cells are the developing blood cells and the stem cells.

The megakaryocyte's nucleus is single and multilobed, not several nuclei. Reading it as multinucleated turns a correct option into a wrong one.

The reticulum of the reticulocyte is ribosomal remnant, not a nucleus and not a granule, and it is demonstrated supravitally — outside the living body — rather than by a vital stain, which is given to the living animal.
## hold_these
Haemopoiesis is the formation of blood cells in bone marrow and in lymphatic organs such as the thymus.
Red marrow is active and lies in most bones of children and in the flat, short and irregular bones of adults, while yellow marrow is inactive fat in the shafts of adult long bones and can convert back at need.
Fat cells are the largest cells in the bone marrow.
Blood sinusoids are wide irregular capillaries with a non-continuous basement membrane, and blood cells leave through its pores.
The ratio of immature white cells to immature red cells in marrow is 5:1, because most white cells are shorter-lived than the red corpuscle.
The reticulocyte is 9 µm, has acidophilic cytoplasm with a basophilic reticulum of ribosome and polysome remnants, and is demonstrated with the supravital stain brilliant cresyl blue.
Reticulocytes do not exceed 1% in peripheral blood, and the percentage rises after haemorrhage or destruction of red corpuscles.
The megakaryocyte is 50–70 µm with a single multilobed dark nucleus and basophilic cytoplasm.
Demarcation channels are invaginations of the megakaryocyte's own cell membrane, and platelet ribbons are its pseudopodia.
The component transplanted in marrow disease is the haemopoietic stem cell.
## lose_the_mark
Placing red marrow in the shaft of an adult long bone. That is where yellow marrow lies.
Giving the sinusoid a continuous basement membrane. It is non-continuous, which is how cells get out.
Listing reticular cells among the free cells of the marrow. They are fixed cells of the stroma.
Calling the megakaryocyte multinucleated. It has one nucleus with many lobes.
Inverting the ratio to 1:5. The book states 5:1, immature white cells to immature red cells.
Calling brilliant cresyl blue a vital stain. A vital stain is given inside the living animal, and reticulocytes are stained supravitally, outside the body.
Describing the reticulocyte as basophilic. Its cytoplasm is acidophilic from haemoglobin, and only the reticulum is basophilic.
Answering a question about haemopoiesis with a maturation series of blasts and myelocytes. This chapter teaches marrow structure, the reticulocyte and the megakaryocyte, and nothing else.
## image_recommendations
### comparison table · Red versus yellow bone marrow — activity, site in the child, site in the adult, content, and convertibility
Purpose: The book asks this as a table and the paper asks it back as a table. The examinable error is a site error, and sites compare badly in prose.
Priority: required
Status: needed
Kind: comparison table
Section: Key determinants
Source direction: purpose-drawn from the department book's page 39 table, redrawn rather than reproduced
Rights: newly drawn for this product, or CC-BY
### diagram · Red bone marrow in section, with the reticular cell and reticular fibre network, fat cells, a blood sinusoid, and a blood cell passing through a pore in the discontinuous basement membrane
Purpose: The whole mechanism of this chapter is a cell crossing a gap in a wall. A drawing shows the gap. A sentence about a non-continuous basement membrane leaves the student unsure what is discontinuous with what.
Priority: required
Status: needed
Kind: diagram
Section: Mechanism
Source direction: purpose-drawn for this product
Rights: newly drawn for this product, or CC-BY
### histology · Reticulocytes in a blood film stained supravitally with brilliant cresyl blue, the reticulum visible inside otherwise pink cells
Purpose: The examinable pairing is an acidophilic cell containing a basophilic net, and it is a two-colour fact. It cannot be carried by a description, and no routine film shows it at all.
Priority: required
Status: needed
Kind: histology
Section: Mechanism
Source direction: openly licensed haematology atlas or institutional teaching set
Rights: must be CC-BY or public domain
### diagram · Megakaryocyte with its single multilobed nucleus, demarcation channels cutting the cytoplasm into fragments, and a platelet ribbon shedding platelets from a pseudopodium
Purpose: The book's own page 40 figure. The single-nucleus-many-lobes point and the channel-to-fragment relation are both spatial, and both are the ones that go wrong on paper.
Priority: required
Status: needed
Kind: diagram
Section: Mechanism
Source direction: purpose-drawn, following the department book's page 40 figure rather than reproducing it
Rights: newly drawn for this product, or CC-BY
Notes: The same drawing serves ART-101-HIS-BLOOD-PLATELETS, where the demarcation channels are the origin story of the platelet.
## conflicts
[clear]
## evidence_gaps
The chapter's own stated objective asks for the histological structure of the cells involved in the various stages of haemopoiesis, but the text covers only marrow structure, the reticulocyte and the megakaryocyte. Neither the erythroid nor the myeloid maturation series is described, and no blast, myelocyte, metamyelocyte or band cell is defined anywhere in this chapter.
The book names the stem cell but does not classify it, does not give a pluripotent-to-committed hierarchy, and does not name a colony-forming unit.
No growth factor is named. Erythropoietin does not appear in the chapter, although hypoxia stimulating the marrow is stated in the red corpuscle chapter.
The book gives no normal cellularity for marrow, and no age at which red marrow retreats from the long bones.
The book does not say where haemopoiesis occurs before birth.
No independent citation has been attached to any figure in this article.
## evidence_basis
Department Book Module 101, "Normal Structure of the Human Body (ISK - 101)", Faculty of Medicine, Cairo University, Part I Histology, chapter III "Blood", section on Haemopoiesis, printed pages 39-40, including the page 39 red-versus-yellow marrow table and the page 40 megakaryocyte figure. Extracted to scripts/kasr/extract/deptbook.json.
## field_notes
arabicTitle: Arabic histological terminology has not been reviewed for this module. It is filled at the evidence pass with a reviewer rather than guessed here.
media: No image exists in the repository, so every plate this article needs is written as an image recommendation.
relatedConcepts: No authored concept sits on this leaf yet, and none is invented here.
questionIds: Questions for this article are authored in the question pass that follows.
subtopic: No SUB_ identifier has been assigned to this module in the canonical taxonomy.
microtopic: No microtopic level exists beneath this node.
nanotopic: No nanotopic level exists beneath this node.
reviewer: Not yet reviewed by faculty. The publication gate is needs_evidence for that reason.
beyondTheBook: Some question books ask this leaf for myeloblasts, metamyelocytes and band cells, and for the bones in which erythropoiesis occurs. The department book teaches none of them in this chapter. Nothing about those stages is asserted here, and the absence is recorded as an evidence gap for a faculty reviewer rather than filled from another textbook.
## notes
This leaf carries only six questions in the extracted question bank, but two of the six are the same question about bone marrow transplantation asked twice, and a third asks what increases as haemopoietic activity falls. Both turn on marrow structure rather than on a maturation series, which supports writing the article the way the book teaches it.

---

# Item
## id
ART-101-HIS-MICROSCOPES
## title
Microscopes
## subject
fnd
## status
Draft
## owner
Claude
## topic
Introduction
## language
en
## learner_stage
Year 1 foundation
## template_id
TPL-CONCEPT
## archetype
concept
## high_yield
Core
## time_sensitive
stable
## publication_gate
needs_evidence
## universities
kau
## years
Year 1
## module
101 ISK
## module_subject
101 ISK > Histology > Introduction > Microscopes
## primary_node_id
DIS-HIS-T04
## secondary_node_ids
DIS-HIS-T01
## related_articles
ART-101-HIS-MICROTECHNIQUES: The instrument is useless without a section to put under it, and the three processing techniques and the stains are set out there.
ART-101-HIS-THE-CELL: The cell membrane is the book's own worked example of a structure below the resolution of the light microscope and visible only by electron microscopy.
## aliases
Light microscope | Electron microscope | TEM | SEM | Magnification and resolution
## reading_time
7
## summary
Two numbers separate the four instruments this chapter names, and the paper asks them in the wrong units on purpose. Magnification is how much bigger the image is; resolution is how close two points can be and still be seen as two. The light microscope stops at 1500 times and 0.2 µm, the electron microscope reaches 0.2 nm, and everything the student is later told is "invisible by light microscopy" is invisible for that one arithmetical reason.
## sections
### Definition
Histology is the science that deals with the study of tissue, from histos, tissue, and logy, science. Cells aggregate into four basic tissue types, and the whole of this part of the module works through them: epithelial tissue, connective tissue, muscular tissue and nervous tissue.

A microscope is an optical instrument for examining a histological specimen. The book recognises two classes, the light microscope and the electron microscope, and divides the second into two types, the transmission electron microscope and the scanning electron microscope.

Two properties describe any of them. Magnification power is the degree of enlargement. Resolution power is the least distance between two points that can still be seen as two points and not as one. They are not the same property, and the difference is what the chapter is for: enlarging an image that is already blurred simply gives a larger blur.

### Mechanism
The light microscope works with light. Its source of illumination is daylight or an electric lamp, and its magnifying system is a pair of glass lens systems in series — the ocular, or eyepiece, and the objective. Because the two lenses act one after the other, their powers multiply rather than add, and the magnification power of the instrument is the power of the objective multiplied by the power of the eyepiece.

The transmission electron microscope replaces both. Its source of illumination is a beam of electrons rather than light, and its magnifying system is electromagnetic coils rather than glass lenses. The electron beam passes through the specimen, and the image is finally seen on a fluorescent screen, because an electron image cannot be seen by the eye directly.

The scanning electron microscope is the same family of instrument put to a different question. It gives three-dimensional images on the screen, and it shows only the surfaces of the objects examined. That last clause is the whole of its examinable limitation: a scanning micrograph cannot show what is inside a cell, because the beam never went inside.

### Key determinants
Magnification is settled by multiplication. The strongest eyepiece the book gives is 15 and the strongest objective is 100, so the maximum magnification power of the light microscope is 15 × 100 = 1500 times. The transmission electron microscope magnifies 1000 to 100,000 times or more.

Resolution is settled by a series that runs in three different units, and the units are where marks are lost. The resolution power of the naked eye is 0.2 mm. The resolution power of the light microscope is 0.2 µm. The resolution power of the electron microscope is 0.2 nm. The figure 0.2 is constant across all three; only the unit changes, and only the unit is being tested.

The unit chain the book states is 1 mm = 1000 µm, 1 µm = 1000 nm, and 1 nm = 10 angstroms. Read as a chain it says the electron microscope resolves a thousand times finer than the light microscope, which resolves a thousand times finer than the eye.

The decision rule for the paper follows directly. If a question offers 0.2 mm, 0.2 µm and 0.2 nm as three options, it is asking which instrument, not which number. If a question offers 1500 and 100,000, it is asking about magnification and not about resolution.

### Normal values
Maximum magnification power of the light microscope: 15 × 100 = 1500 times. Magnification of the transmission electron microscope: 1000 to 100,000 times or more.

Resolution power of the naked eye: 0.2 mm. Of the light microscope: 0.2 µm. Of the electron microscope: 0.2 nm.

Units: 1 mm = 1000 µm; 1 µm = 1000 nm; 1 nm = 10 Å.

Four basic tissue types. Two classes of microscope. Two types of electron microscope.

### Clinical significance
The resolution figures are not trivia; they decide what a diagnostic slide can be asked to show. A light microscope resolves 0.2 µm, which is 200 nm. The plasma membrane is 7.5–10 nm thick. It is therefore some twenty to twenty-five times finer than the light microscope can resolve, which is why the membrane is not seen in a routine haematoxylin and eosin section and has to be demonstrated indirectly with silver or PAS acting on its carbohydrate coat. The trilaminar unit membrane — two dark layers with a light layer between — exists only as an electron-microscopic description, and no light microscope will ever show it.

The same arithmetic sets the boundary for every other structure the module calls sub-microscopic: cristae, cisternae, ribosomes, the basal lamina, the cell junctions. Every one of them is an electron-microscopic finding, and a written answer that claims to have seen one by light microscopy is claiming an impossibility.

The scanning electron microscope has its own diagnostic role and its own limit. It is the instrument for surface texture — cilia, microvilli, the surface of a blood cell — and it is the wrong instrument for anything internal.

### Common misconceptions
Magnification and resolution are not two words for the same thing. A photographic enlargement of a blurred image raises magnification and leaves resolution exactly where it was; the light microscope's ceiling is set by resolution, not by the lenses available.

The transmission and scanning electron microscopes are not interchangeable. Transmission passes the beam through the specimen and gives internal structure on a fluorescent screen; scanning gives a three-dimensional image of surfaces only.

The 1500 times figure is a maximum, not the magnification of every light microscope, and it is reached only with the strongest eyepiece and the strongest objective together.

Angstroms and nanometres are not the same. One nanometre is ten angstroms, so a membrane described as 75–100 Å and a membrane described as 7.5–10 nm are the same membrane.
## hold_these
Histology is the science of tissue, and the four basic tissue types are epithelial, connective, muscular and nervous.
Magnification power is the degree of enlargement and equals objective power multiplied by eyepiece power.
Resolution power is the least distance between two points that can still be seen as two points and not one.
The maximum magnification power of the light microscope is 15 × 100 = 1500 times.
The transmission electron microscope magnifies 1000 to 100,000 times or more.
Resolution power is 0.2 mm for the naked eye, 0.2 µm for the light microscope and 0.2 nm for the electron microscope — the same figure in three different units.
The transmission electron microscope uses an electron beam for illumination and electromagnetic coils as its magnifying system, and the image is seen on a fluorescent screen.
The scanning electron microscope gives three-dimensional images and shows surfaces only.
1 mm = 1000 µm, 1 µm = 1000 nm, and 1 nm = 10 angstroms.
## lose_the_mark
Giving the light microscope a resolution of 0.2 mm or the electron microscope a resolution of 0.2 µm. The figure never changes; only the unit does, and the unit is the answer.
Adding the objective and eyepiece powers instead of multiplying them. Two lenses in series multiply.
Quoting 1500 times as the magnification of the electron microscope. It is the light microscope's ceiling.
Crediting the transmission electron microscope with three-dimensional surface images. That is the scanning instrument.
Saying the scanning electron microscope shows the interior of the cell. It shows surfaces only.
Treating magnification as the thing that limits the light microscope. Resolution is the limit; magnification beyond it adds nothing.
Writing that the electron microscope uses glass lenses. It uses electromagnetic coils.
## image_recommendations
### diagram · The three resolution powers drawn to scale on one logarithmic line — naked eye 0.2 mm, light microscope 0.2 µm, electron microscope 0.2 nm — with the plasma membrane at 7.5–10 nm marked below the light-microscope limit
Purpose: The whole chapter is one number in three units, and units are exactly what prose cannot make felt. Put on a single scale, the fact that the membrane sits far below the light microscope's limit stops being an assertion and becomes a position on a line.
Priority: required
Status: needed
Kind: diagram
Section: Key determinants
Source direction: purpose-drawn for this product
Rights: newly drawn for this product, or CC-BY
### diagram · Light microscope and transmission electron microscope side by side, each labelled with its source of illumination, its magnifying system and where the image is finally seen
Purpose: The book's own pairing. The three differences are a set, and a student who has learnt them as three separate sentences reliably keeps one and loses the other two.
Priority: required
Status: needed
Kind: diagram
Section: Mechanism
Source direction: purpose-drawn, following the department book's page 4 and page 5 figures rather than reproducing them
Rights: newly drawn for this product, or CC-BY
### comparison table · Transmission versus scanning electron microscope — what the beam does, what kind of image results, and whether the interior or only the surface is shown
Purpose: The examinable distinction is a single either/or that the names do not carry. A two-column table is the form the question is asked in.
Priority: strongly helpful
Status: needed
Kind: comparison table
Section: Mechanism
Source direction: purpose-drawn for this product
Rights: newly drawn for this product, or CC-BY
## conflicts
[clear]
## evidence_gaps
The book gives no resolution figure for the scanning electron microscope, only for the electron microscope as a class.
The book gives no magnification range for the scanning electron microscope.
The chapter names the parts of the light microscope only as source of illumination and magnifying system. No condenser, stage, diaphragm or fine adjustment is described, and none is claimed here.
The book does not say why the electron microscope resolves better than the light microscope. The wavelength argument is not made anywhere in this chapter and is not made here.
No independent citation has been attached to any figure in this article. Every number is traceable to the department book only, which is a single source.
## evidence_basis
Department Book Module 101, "Normal Structure of the Human Body (ISK - 101)", Faculty of Medicine, Cairo University, Part I Histology, chapter I "Introduction", section on Microscopes, printed pages 4-5. The plasma membrane thickness quoted in Clinical significance is from the same book's Cytology chapter, printed pages 7-21. Extracted to scripts/kasr/extract/deptbook.json.
## field_notes
arabicTitle: Arabic histological terminology has not been reviewed for this module. It is filled at the evidence pass with a reviewer rather than guessed here.
media: No image exists in the repository, so every plate this article needs is written as an image recommendation rather than left as an unexplained blank.
relatedConcepts: No concept in ../concept/101-ISK-concepts.md or ../concept/101-ISK-mcq-concepts.md carries the module subject path of this leaf, so the list is empty. None is invented here, and no concept belonging to another leaf is claimed as taught by this article.
questionIds: The extracted question bank holds seven questions on this leaf, and they are authored in the question pass rather than here.
subtopic: No SUB_ identifier has been assigned to this module in the canonical taxonomy, so the curriculum position is carried by module_subject instead.
microtopic: No microtopic level exists beneath this node.
nanotopic: No nanotopic level exists beneath this node.
reviewer: Not yet reviewed by faculty. The publication gate is needs_evidence for that reason.
beyondTheBook: Nothing in this article comes from outside the department book. The arithmetic in Clinical significance — that 0.2 µm is 200 nm and therefore some twenty to twenty-five times the membrane's thickness — is the book's own two numbers put side by side, not an imported fact.
## notes
Several questions filed under this leaf in the extracted bank are really cell membrane questions that happen to mention the electron microscope. They are answered by ART-101-HIS-THE-CELL, and this article carries only the instrument side of them.

---

# Item
## id
ART-101-HIS-MICROTECHNIQUES
## title
Microtechniques
## subject
fnd
## status
Draft
## owner
Claude
## topic
Introduction
## language
en
## learner_stage
Year 1 foundation
## template_id
TPL-CONCEPT
## archetype
concept
## high_yield
Core
## time_sensitive
stable
## publication_gate
needs_evidence
## universities
kau
## years
Year 1
## module
101 ISK
## module_subject
101 ISK > Histology > Introduction > Microtechniques
## primary_node_id
DIS-HIS-T04
## secondary_node_ids
DIS-HIS-T02
## related_articles
ART-101-HIS-MICROSCOPES: The instrument these techniques feed, and the resolution limit that decides what a stained section can be asked to show.
ART-101-HIS-CONNECTIVE-TISSUE-FIBRES: Mallory, van Gieson, orcein and silver are all fibre stains, and the fibre article sets out which colour each gives which fibre.
ART-101-HIS-CYTOPLASMIC-ORGANELLES: Best's carmine, Sudan III, Janus green and iron haematoxylin are named in the cytology chapter with the inclusions and organelles they demonstrate.
## aliases
Tissue processing | Histological stains | H&E | Paraffin technique | Frozen section
## reading_time
11
## summary
Three ways of turning a piece of tissue into a section, and each is best at exactly one thing: paraffin is the most common, celloidin the most perfect, freezing the most rapid. The stains that follow are asked as pairs — dye against what it binds — and every one of those pairs turns on a single idea: a basic dye binds an acidic component, so the nucleus is always basophilic, and an acidic dye binds a basic one.
## sections
### Definition
A microtechnique is the sequence of steps that turns a piece of tissue into a section thin enough and clear enough to be examined by light microscopy. The book teaches three, and sets each out as a method with its advantages and its disadvantages.

Two words carry the whole staining half of the chapter, and both are named for the dye rather than for the structure. A component of the cell that is acidic binds the basic dye haematoxylin and stains blue: it is basophilic. A structure that is basic binds the acidic dye eosin and stains pink or red: it is acidophilic. The nucleus, rich in DNA and RNA, is acidic and therefore always basophilic. The cytoplasm may be either, depending on what it holds.

### Mechanism
The three tissue-processing methods differ in what they do to the tissue on the way, and each disadvantage follows from that.

The paraffin technique is the most common. Its advantages are a short preparation time, serial sections suitable for research, very thin sections, and sections that stain easily. Its disadvantages come from two of the reagents: xylol, the solvent, dissolves fat, and the heat of the process damages enzymes. The consequence the book draws is that the paraffin technique cannot be used to show the chemical components of the cell — the fat has gone and the enzymes are dead.

The celloidin technique is the most perfect. It is perfect for fine details, it uses no heat and so preserves structure, and it is suitable for large organs such as the eyeball and for soft tissues such as the brain. Its disadvantages are a long preparation time, thick sections, no serial sections, and sections that are not easily stained.

The freezing technique is the most rapid. It is the most rapid method for the diagnosis of tumours during surgery, and because it applies no heat and no fat solvent it preserves enzymes, which is why it is the technique histochemical stains require. Its disadvantages are thick sections, difficulty in cutting, no serial sections, and sections that are not easily stained.

Read together, the three make one pattern: speed, perfection and chemistry cannot all be had at once, and each technique gives up two of them.

### Key determinants
Haematoxylin and eosin is the most commonly used stain in routine histological slides, and the pairing is the reference point for everything else. Haematoxylin is a basic blue dye and binds acidic, basophilic components — the nucleus, because of its DNA and RNA content, and the cytoplasm of protein-forming cells, because of their ribosomes. Eosin is an acidic pink or red dye and binds basic, acidophilic structures, which is usually the cytoplasm.

The special stains are then a list of dye against target, and the question books test them one pair at a time.

Silver stains the Golgi apparatus, nerve cells and nerve fibres brown, and reticular fibres black. It also demonstrates the cell coat, because the coat is carbohydrate.

A neutral stain is a mixture of an acidic and a basic stain, and Leishman's stain is the example. It is used to demonstrate blood cells, which is why every blood film in this module is a Leishman film.

A vital stain stains living cells inside the living animal, which phagocytose the dye; trypan blue and Indian ink are the examples, and the macrophage is the cell they demonstrate. A supravital stain stains living cells outside the living body, and the example is brilliant cresyl blue on reticulocytes. Inside the animal against outside the body is the entire distinction, and it is the one the paper asks.

A metachromatic stain gives a colour different from the colour of the stain itself. Toluidine blue, a blue dye, reacts with the mucopolysaccharide granules of blood basophils and mast cells to give violet.

Histochemical stains need the frozen technique, because they act on molecules the other two techniques destroy. Periodic acid–Schiff stains glycogen magenta red. Sudan III stains fat orange. Enzyme methods demonstrate acid and alkaline phosphatases, which are lysosomal enzymes.

Orcein stains elastic fibres brown.

Immunohistochemical stains use dye-labelled antibodies to demonstrate a specific antigen, and the book's own example is the proteins of the intermediate filaments.

Four more stains are named elsewhere in the same book rather than in this chapter, and the question books ask them under this heading. Best's carmine stains glycogen red. Iron haematoxylin stains mitochondria and demonstrates centrioles. Janus green stains mitochondria green. Mallory's trichrome stains collagen fibres blue, and van Gieson stains collagen red and elastic fibres yellow. They are listed here as cross-references, and their chapters are named in the evidence basis.

### Normal values
Three tissue-processing microtechniques: paraffin, celloidin and freezing. Eight special histological stains listed: silver, neutral, vital, supravital, metachromatic, histochemical, orcein and immunohistochemical. Three histochemical stains: PAS, fat stains such as Sudan III, and enzyme stains for acid and alkaline phosphatase.

### Clinical significance
Two of these techniques exist because a clinician needs an answer inside a working day.

The frozen section is the surgeon's technique. It is the most rapid method for diagnosing a tumour during surgery, which means while the patient is still on the table and the extent of the operation is still an open question. Its thick, awkward, poorly staining sections are the price of that speed, and they are accepted for that reason.

Immunohistochemistry answers a different clinical question: not whether a tumour is present but what it came from. A dye-labelled antibody against an intermediate filament protein reports the cell of origin — cytokeratin for epithelium, vimentin for connective tissue, and so on — and the cell of origin is what decides the treatment.

The routine sections are diagnostic in their own way. A pale, vesicular nucleus with a clear nucleolus reports an active cell; a small, dark, condensed nucleus reports an inactive one. That reading is made on an ordinary haematoxylin and eosin slide, and it is available every day.

### Common misconceptions
Basophilic does not mean basic. It means having an affinity for the basic dye, which a structure has by being acidic. The nucleus is basophilic because its nucleic acids are acidic, and reading the word the other way inverts every staining answer in the module.

A vital stain and a supravital stain are not the same procedure with two names. Vital staining is done inside the living animal; supravital staining is done outside the living body, and the reticulocyte is the supravital example.

Reticular fibres are not simply faint in haematoxylin and eosin. They are not visible in it at all, and they are shown with silver, which turns them brown to black, or with PAS, because of their high sugar content.

The paraffin technique is not the best technique. It is the most common one. The most perfect is celloidin, and the most rapid is freezing, and a question that uses one of those three superlatives is asking for a different method each time.

Metachromasia is not a property of the stain alone. It is what happens when the dye meets a particular tissue component — in this module the heparin-rich mucopolysaccharide granules of the mast cell and the basophil — so toluidine blue is metachromatic on those granules and orthochromatic elsewhere.
## hold_these
Paraffin is the most common technique, celloidin the most perfect, and freezing the most rapid.
Paraffin uses xylol, which dissolves fat, and heat, which damages enzymes, so it cannot show the chemical components of the cell.
Celloidin uses no heat, gives perfect fine detail and suits large organs such as the eyeball and soft tissue such as brain, but is slow, thick and hard to stain.
Freezing is the most rapid method for diagnosing tumours during surgery and preserves enzymes, which is why histochemical stains need it.
Haematoxylin is a basic blue dye binding acidic (basophilic) components; eosin is an acidic pink dye binding basic (acidophilic) structures.
The nucleus is always basophilic because of its DNA and RNA; cytoplasm may be acidophilic or basophilic.
Silver stains Golgi, nerve cells and nerve fibres brown, and reticular fibres black.
Leishman's stain is a neutral stain, a mixture of acidic and basic dyes, used for blood films.
A vital stain works inside the living animal (trypan blue, Indian ink, taken up by macrophages); a supravital stain works outside the living body (brilliant cresyl blue on reticulocytes).
Toluidine blue is metachromatic on the mucopolysaccharide granules of mast cells and basophils, giving violet from a blue dye.
PAS stains glycogen magenta red, Sudan III stains fat orange, and enzyme stains demonstrate acid and alkaline phosphatases as lysosomal enzymes.
Orcein stains elastic fibres brown.
Immunohistochemistry uses dye-labelled antibodies and demonstrates intermediate filament proteins.
## lose_the_mark
Reading basophilic as "is a base". It means it binds the basic dye, which an acidic structure does.
Swapping vital for supravital. Vital is inside the living animal; supravital is outside the living body, and the reticulocyte is the supravital case.
Naming paraffin as the technique for enzymes or fat. Its heat kills enzymes and its xylol dissolves fat; the frozen technique is the one that keeps both.
Calling celloidin the most rapid or freezing the most perfect. Each superlative belongs to exactly one technique.
Saying reticular fibres stain pink with H&E. They are not visible in H&E at all.
Attributing metachromasia of the mast cell granule to histamine. It is the heparin in the granule that produces it.
Choosing H&E to demonstrate the cell membrane or the cell coat. Both need silver or PAS, and both are demonstrated through the carbohydrate of the coat.
Giving the frozen section as the technique with the best sections. Its sections are thick, hard to cut and not easily stained; the point of it is speed.
## image_recommendations
### comparison table · The three tissue-processing techniques — paraffin, celloidin and freezing — in three columns of superlative, advantages and disadvantages, as the book prints it
Purpose: The book sets this out as a table on page 5 and the paper asks it back as a table. Read as prose, the three sets of advantages blur into one list and the student can no longer say which technique gave up which property.
Priority: required
Status: needed
Kind: comparison table
Section: Mechanism
Source direction: purpose-drawn from the department book's page 5 table, redrawn rather than reproduced
Rights: newly drawn for this product, or CC-BY
### comparison table · Every named stain against the structure it demonstrates and the colour it gives — H&E, silver, Leishman, trypan blue, brilliant cresyl blue, toluidine blue, PAS, Sudan III, orcein, immunohistochemistry
Purpose: This chapter is asked one dye-and-target pair at a time, and a student revising from prose has to rebuild the whole grid before answering any single pair. The grid is the correct form for both learning and testing.
Priority: required
Status: needed
Kind: comparison table
Section: Key determinants
Source direction: purpose-drawn for this product from the department book's page 6 stain list
Rights: newly drawn for this product, or CC-BY
### histology · One routine haematoxylin and eosin section at medium power in which a basophilic nucleus and an acidophilic cytoplasm are both unambiguously visible
Purpose: Blue against pink is the reference every other staining fact is measured from, and it is a colour fact. No description of "basophilic" substitutes for having seen the two colours in one field.
Priority: required
Status: needed
Kind: histology
Section: Definition
Source direction: openly licensed histology teaching set
Rights: must be CC-BY or public domain, no all-rights-reserved textbook figure
### histology · Toluidine blue preparation showing metachromasia — granules violet where the dye itself is blue
Purpose: Metachromasia is defined as a colour different from the stain's own colour, which is a claim that cannot be checked in monochrome prose. Students write the word fluently without having seen the effect.
Priority: strongly helpful
Status: needed
Kind: histology
Section: Key determinants
Source direction: openly licensed histology teaching set
Rights: must be CC-BY or public domain
Notes: The same plate serves ART-101-HIS-GRANULAR-LEUKOCYTES and ART-101-HIS-CONNECTIVE-TISSUE-CELLS, where mast cell and basophil metachromasia is the identifying feature.
## conflicts
[clear]
## evidence_gaps
The chapter's own stated learning outcomes ask the student to name the common fixatives and list their functions, but the text of pages 4-6 lists processing techniques and stains and never gives a list of fixatives. No fixative list is supplied here. The only fixative the book names anywhere in this part is the methyl alcohol of Leishman's stain, named in the blood chapter.
The book does not describe the individual steps of any of the three techniques — no fixation, dehydration, clearing, embedding, sectioning or mounting sequence is given, only the advantages and disadvantages of each method.
The book does not say what "serial sections" are for beyond the word research.
No section thickness is given in micrometres for any of the three techniques; the text says only "very thin" or "thick".
The book gives no staining time, concentration or protocol for any stain.
No independent citation has been attached to any statement in this article.
## evidence_basis
Department Book Module 101, "Normal Structure of the Human Body (ISK - 101)", Faculty of Medicine, Cairo University, Part I Histology, chapter I "Introduction", section on Microtechniques and Histological Stains, printed pages 5-6, including the page 5 three-column table of tissue processing methods. The four cross-referenced stains are from the same book: Best's carmine, Sudan III, Janus green and iron haematoxylin from the Cytology chapter, printed pages 7-21; Mallory's trichrome and van Gieson from the Connective Tissue Fibres chapter, printed pages 47-48. Extracted to scripts/kasr/extract/deptbook.json.
## field_notes
arabicTitle: Arabic histological terminology has not been reviewed for this module. It is filled at the evidence pass with a reviewer rather than guessed here.
media: No image exists in the repository, so every plate this article needs is written as an image recommendation rather than left as an unexplained blank.
relatedConcepts: No concept in ../concept/101-ISK-concepts.md or ../concept/101-ISK-mcq-concepts.md carries the module subject path of this leaf, so the list is empty. None is invented here.
questionIds: The extracted question bank holds eighty-seven questions filed on this leaf. They are authored in the question pass rather than here.
subtopic: No SUB_ identifier has been assigned to this module in the canonical taxonomy, so the curriculum position is carried by module_subject instead.
microtopic: No microtopic level exists beneath this node.
nanotopic: No nanotopic level exists beneath this node.
reviewer: Not yet reviewed by faculty. The publication gate is needs_evidence for that reason.
beyondTheBook: Nothing here comes from outside the department book, but four stains come from outside this chapter of it. Best's carmine, Sudan III, Janus green, iron haematoxylin, Mallory's trichrome and van Gieson are taught in the cytology and connective tissue chapters, and the paragraph that names them says so rather than presenting them as part of the introduction's own stain list.
## notes
Most of the eighty-seven questions filed on this leaf in the extracted bank are stain questions whose subject matter belongs to another chapter — an eosinophil, a mast cell, a collagen fibre — and only the dye is being asked. This article gives the dye-and-target grid; the cell or fibre in each stem is described in its own article.

---

# Item
## id
ART-101-HIS-THE-CELL
## title
The cell and its plasma membrane
## subject
fnd
## status
Draft
## owner
Claude
## topic
Cytology
## language
en
## learner_stage
Year 1 foundation
## template_id
TPL-CONCEPT
## archetype
concept
## high_yield
Core
## time_sensitive
stable
## publication_gate
needs_evidence
## universities
kau
## years
Year 1
## module
101 ISK
## module_subject
101 ISK > Histology > Cytology > The cell
## primary_node_id
DIS-HIS-T01
## secondary_node_ids
SYS-FND-T01-S01-M01
SYS-FND-T01-S02-M02
## related_concepts
CON-FND-F4B7458F8B8265 | CON-FND-85CC08A33D0A88 | CON-FND-F2237ED98E88F3 | CON-FND-17E5245CBA11D0
## related_articles
ART-101-HIS-CYTOPLASMIC-ORGANELLES: The rest of the cytoplasm — mitochondria, endoplasmic reticulum, Golgi, lysosomes, ribosomes and cytoskeleton — is set out there, with the membranous against non-membranous division the plasma membrane belongs to.
ART-101-HIS-NUCLEUS: The cell's second basic component, described in full.
ART-101-HIS-RED-BLOOD-CORPUSCLES: The book's own worked example of this article — the coat that carries the blood groups and the inner cytoskeleton that keeps the biconcave shape are both red corpuscle facts.
ART-101-HIS-MICROSCOPES: Why the membrane is invisible by light microscopy is an arithmetical consequence of resolution, worked there.
ART-101-HIS-MEMBRANOUS-SPECIALISATIONS: The four lateral junctions summarised here are set out in full there, together with the apical and basal specialisations and the basement membrane.
## aliases
Plasmalemma | Cell membrane | Plasma membrane | Glycocalyx | Cell coat | Endocytosis
## reading_time
13
## summary
Almost every question filed on this leaf is a cell membrane question, and almost every one turns on a side: the carbohydrate coat is on the outside and the cytoskeleton is on the inside, integral proteins cross the bilayer and peripheral proteins rest on a face, the phospholipid heads face out and the tails face in. Learn the membrane as a structure with two distinguishable surfaces and the thickness, the stains, the receptors and the three kinds of endocytosis all follow.
## sections
### Definition
The cell is the basic structural and functional unit of the living body. The functions the book lists for it are absorption, respiration, secretion, excretion, sensation, conduction, contraction, movement, growth and reproduction — the whole repertoire of the organism, carried out at the scale of one cell.

Cells vary enormously in size, from the granular cells of the cerebellum at 4 µm to the ovum at 150 µm. They vary in shape as well: rounded, oval, flat, stellate, polygonal, cubical or columnar. The animal cell has two basic components, and only two — the cytoplasm and the nucleus.

The plasma membrane, or plasmalemma, is the limiting membrane that envelopes every cell. It is 7.5–10 nm thick. On electron microscopy it appears trilaminar — two dark, electron-dense layers separated by an intermediate light, electron-lucent layer — and that appearance is called the unit membrane. On light microscopy it is not resolved with haematoxylin and eosin and has to be demonstrated with silver or with PAS, both of which act on the carbohydrate of its outer coat rather than on the membrane itself.

### Mechanism
The membrane is built of three kinds of molecule, and each sits somewhere specific.

The lipid is phospholipid arranged as a bilayer, with the hydrophilic heads facing outwards towards the aqueous solution on either side and the hydrophobic tails directed inwards towards each other. Cholesterol lies among the hydrophobic fatty acid tails, where it restricts the movement of the phospholipid molecules and so modulates the fluidity of the membrane — the book's stated stabilising effect.

The protein is about 50% of the total membrane mass, and it takes two forms which the paper separates constantly. Peripheral proteins are loosely attached to a surface of the membrane. Integral, or transmembrane, proteins cross the bilayer, and only they can do the jobs that require a route through it: channel proteins for ions and water, and carrier proteins for small polar molecules such as glucose and for the sodium–potassium pump.

The carbohydrate lies at the external surface only, where it forms glycoproteins and glycolipids. That fuzzy external layer is the cell coat, or glycocalyx. Its functions are cell adhesion, cell identification and recognition, protection, and cell immunity, and it carries the cell's specific receptors — for drugs, for hormones, for bacteria and for viruses. The blood group antigens sit here, on the outer surface of the erythrocyte. Beneath the inner surface, by contrast, lies a cytoskeleton of peripheral proteins, and in the red corpuscle that cytoskeleton is what gives the cell its elasticity and flexibility and holds its biconcave shape. Two surfaces, two jobs, and the paper asks them separately.

Material crosses the membrane in bulk in two directions. Endocytosis is bulk movement into the cell by forming vesicles from the plasma membrane, and it has three types.

Phagocytosis, cell eating, surrounds a solid particle with pseudopodia; the book's example is a white blood cell engulfing a bacterium. Pinocytosis, cell drinking, takes in extracellular fluid and what is dissolved in it through small invaginations; the example is the thyroid follicular cell taking up colloid. Receptor-mediated endocytosis begins when a ligand binds its receptors on the coat; the receptors aggregate over a patch of membrane, clathrin coats that patch on its cytoplasmic side to form a coated pit, and the pit pinches off as a coated vesicle. The example is the uptake of growth hormone.

Exocytosis is the reverse. A cytoplasmic vesicle fuses with the plasma membrane and discharges its contents to the exterior without breaking the continuity of the membrane, and it is the mechanism the merocrine gland uses.

### Key determinants
Three discriminations settle nearly every question on this leaf.

The first is the unit. The membrane is 7.5–10 nm thick. Nanometres is the only order of magnitude that fits: at 7.5–10 µm the membrane would be thicker than most whole cells, and at 7.5–10 angstroms it would be thinner than a single lipid molecule. The same figure written the older way is 75–100 Å.

The second is the surface. Carbohydrate, glycocalyx, receptors and blood group antigens are on the outer surface only. The cytoskeleton is on the inner surface. Nothing in the book puts the coat on both.

The third is peripheral against integral. A peripheral protein is loosely attached to a face. An integral protein crosses the bilayer, and every channel, every carrier and the sodium–potassium pump is integral. A question that offers "transmembrane protein" as an option is asking which of the two words means the same thing.

Four membranous terms are set against one another in the question books and are worth separating once. The glycocalyx is the cell membrane's own outer coat. Cristae are the folds of the inner mitochondrial membrane. Cisternae are the sacs of the endoplasmic reticulum. The unit membrane is the trilaminar electron-microscopic appearance shared by all of them, and it is what "all cell membranes have the same appearance" means — the same three-layered profile, not the same composition or function.

The three types of endocytosis are decided by what is taken in, not by the length of the word. Phagocytosis takes solids. Pinocytosis takes fluid. Receptor-mediated endocytosis takes whatever its receptor binds, however little of it there is, and it is the only one of the three with a named coat protein, clathrin.

Where two cells meet, their plasma membranes are joined by junctions, and the question books ask these against the cell membrane as well as against the epithelial chapter that owns them. Four lateral junctions are recognised, and they are told apart by the width of the space between the two membranes and by what is anchored on the cytoplasmic side. In the tight or occluding junction, the zonula occludens, the two adjacent membranes actually fuse at points through transmembrane proteins on each cell, so the distance between them is zero; it encircles the apex of the cell like a belt and restricts the passage of substances between cells. In the adherens junction, the zonula adherens, a wide intercellular space is bridged by transmembrane proteins joined with the help of calcium ions, and condensed protein on the cytoplasmic side binds them to actin filaments; it also encircles the cell, and it provides lateral adhesion. The macula adherens, or desmosome, has the same wide space and the same calcium dependence, but its thickened cytoplasmic side is an attachment plaque anchoring intermediate filaments, and it does not encircle the cell — it is scattered as circular spots. It is the strongest junction, and it is found where a surface is subjected to friction, especially in stratified squamous epithelium. The gap junction, or nexus, leaves a narrow gap that is bridged by channels rather than closed; each channel is formed of six symmetrical transmembrane protein molecules, and it allows ions and small molecules to pass between adjacent cells and impulses to pass between muscle cells. A junctional complex is three of them together — zonula occludens, zonula adherens and desmosome — as between the simple columnar cells lining the small intestine.

The examinable contrast is between the first and the last. The zonula occludens fuses the two membranes and leaves no space; the gap junction bridges a space that is still there. So a statement that the gap junction provides an actual fusion of two cell membranes is describing the zonula occludens, and it is the standard wrong option.

### Normal values
Plasma membrane thickness: 7.5–10 nm, equivalently 75–100 Å.

Protein: about 50% of the total membrane mass.

Cell size: 4 µm in the granular cells of the cerebellum to 150 µm in the ovum.

Two basic components of the animal cell. Three molecular components of the membrane. Three types of endocytosis. Three layers in the unit membrane on electron microscopy.

### Clinical significance
The receptors of the cell coat are where this chapter meets medicine, and the book makes the point through the failures.

A target cell that lacks growth hormone receptors on its plasma membrane cannot respond to the hormone even though the blood level of hormone is normal, and the result is a type of dwarfism. The lesson generalises: a hormone level is only half of an endocrine answer, and the receptor is the other half.

The coat is also how a pathogen gets in. Its receptors for bacteria and for viruses are what let a particular organism attach to a particular cell, and that specificity is why one virus infects the respiratory epithelium and another does not.

Blood grouping is a cell coat test. The ABO and Rh antigens are cell coat molecules on the erythrocyte surface, so a transfusion reaction is a reaction to carbohydrate chemistry on the outside of one cell type.

Receptors on the coat also explain two facts from the blood and connective tissue chapters that would otherwise be free-standing. The mast cell and the basophil carry surface receptors for IgE, and that receptor is what makes them the cells of allergy.

### Common misconceptions
The cell coat is not on both surfaces. It is on the outer surface only; the inner surface carries the cytoskeleton. Swapping the two is the commonest way this material is failed, and it costs the blood-grouping question and the red cell elasticity question together.

The phospholipid heads are not hydrophobic. The heads are hydrophilic and face outwards into the aqueous solution on either side; the tails are hydrophobic and face inwards.

A peripheral protein is not simply a small integral protein. It does not cross the bilayer at all, so it cannot be a channel and cannot be a pump.

7.5–10 is not a measurement in micrometres. The membrane is measured in nanometres, and reading the unit wrongly makes it thicker than most organelles.

The membrane is not invisible because it is unstained. It is below the resolution of the light microscope, which is 0.2 µm — two hundred nanometres against seven and a half. Silver and PAS do not resolve the membrane either; they thicken the picture by staining its carbohydrate coat.

The trilaminar appearance is not two membranes with a space between them. It is one membrane seen as three layers: dark, light, dark.

The gap junction does not fuse the two cell membranes. It bridges a gap that remains open, and fusion at points is what the zonula occludens does.
## hold_these
The cell is the basic structural and functional unit of the living body, and its two basic components are cytoplasm and nucleus.
Cell size ranges from 4 µm in the granular cells of the cerebellum to 150 µm in the ovum.
The plasma membrane, or plasmalemma, is the limiting membrane of every cell and is 7.5–10 nm thick.
By electron microscopy the membrane is trilaminar — two dark layers with an intermediate light layer — which is the unit membrane.
By light microscopy the membrane is not seen in H&E and is demonstrated with silver or PAS, which act on the carbohydrate of its coat.
Phospholipid forms a bilayer with hydrophilic heads outwards and hydrophobic tails inwards, and cholesterol lies among the tails, restricting phospholipid movement and stabilising the membrane.
Protein is about 50% of membrane mass; peripheral proteins are loosely attached to a surface and integral (transmembrane) proteins cross the bilayer as channels, carriers and the sodium–potassium pump.
Carbohydrate is on the external surface only, forming the glycocalyx of glycoproteins and glycolipids.
The cell coat functions in adhesion, identification and recognition, protection and cell immunity, and carries receptors for drugs, hormones, bacteria and viruses.
Blood group antigens are cell coat molecules on the outer surface of the red corpuscle; the cytoskeleton on the inner surface gives it elasticity, flexibility and its biconcave shape.
Endocytosis has three types: phagocytosis for solid particles, pinocytosis for extracellular fluid, and receptor-mediated endocytosis using clathrin-coated pits and coated vesicles.
Exocytosis discharges a vesicle's contents outside the cell without breaking the continuity of the membrane.
Four lateral junctions link epithelial cells: zonula occludens (membranes fuse, distance zero, belt, restricts passage), zonula adherens (wide space, calcium, actin, belt), macula adherens or desmosome (wide space, calcium, attachment plaque anchoring intermediate filaments, scattered spots, strongest, resists friction) and gap junction or nexus (narrow gap bridged by channels of six transmembrane proteins, passing ions, small molecules and impulses).
A junctional complex is zonula occludens plus zonula adherens plus desmosome, as between the simple columnar cells of the small intestine.
## lose_the_mark
Putting the cell coat on the inner surface, or on both surfaces. It is on the outer surface only, and the cytoskeleton is the inner one.
Reading 7.5–10 as micrometres or as angstroms. It is nanometres; 7.5–10 nm is 75–100 Å.
Calling a peripheral protein a channel or a pump. Only an integral, transmembrane protein crosses the bilayer.
Writing that the phospholipid heads are hydrophobic and directed inwards. The heads are hydrophilic and face outwards; the tails face inwards.
Answering "phagocytosis" for the uptake of extracellular fluid. Phagocytosis takes solids; pinocytosis takes fluid.
Describing the trilaminar membrane as two unit membranes separated by a space. It is one membrane with three layers.
Choosing H&E to demonstrate the cell membrane. Silver or PAS is the answer, and both work through the carbohydrate coat.
Attributing the red corpuscle's biconcave shape to the cell coat. The coat carries the blood groups; the inner cytoskeleton holds the shape.
Saying the membrane is invisible by light microscopy because it is transparent. It is below the light microscope's 0.2 µm resolution.
Writing that the gap junction fuses the two cell membranes. It bridges a gap that is still open; the zonula occludens is the one that fuses them, leaving a distance of zero.
Anchoring actin filaments at the desmosome. The desmosome's attachment plaque anchors intermediate filaments; actin belongs to the zonula adherens.
## image_recommendations
### diagram · The fluid-mosaic plasma membrane in section — phospholipid bilayer with hydrophilic heads out and hydrophobic tails in, cholesterol among the tails, a peripheral protein on each face, an integral protein spanning the bilayer as a channel, and the glycocalyx of glycoproteins and glycolipids on the outer surface only
Purpose: Every high-frequency error on this leaf is a side error — coat inside, heads inward, peripheral protein crossing. One drawing with an unambiguous inside and outside settles all three at once, which no amount of prose does.
Priority: required
Status: needed
Kind: diagram
Section: Mechanism
Source direction: purpose-drawn for this product, following the department book's page 8 figure rather than reproducing it
Rights: newly drawn for this product, or CC-BY
### histology · Transmission electron micrograph of a plasma membrane at high magnification showing the trilaminar unit membrane — dark, light, dark
Purpose: The trilaminar description is routinely misread as two membranes with a gap. The micrograph is the only thing that shows it is one structure, and the module asserts the appearance a dozen times without ever showing it.
Priority: required
Status: needed
Kind: histology
Section: Definition
Source direction: openly licensed electron microscopy teaching set or an institutional collection
Rights: must be CC-BY or public domain, no all-rights-reserved textbook figure
### diagram · The three types of endocytosis drawn in one row — pseudopodia surrounding a bacterium, a small invagination taking in fluid, and a clathrin-coated pit pinching off as a coated vesicle — with exocytosis as a fourth panel running the other way
Purpose: The three are distinguished by what is engulfed and by how the membrane moves, and both are spatial. Side by side they are one comparison; separately they are three definitions that students match to the wrong example.
Priority: required
Status: needed
Kind: diagram
Section: Mechanism
Source direction: purpose-drawn for this product
Rights: newly drawn for this product, or CC-BY
### diagram · One red corpuscle in section with the glycocalyx and its ABO and Rh antigens labelled on the outer surface and the actin–spectrin cytoskeleton labelled on the inner surface
Purpose: The two most-asked applications of this article — what determines blood group, and what gives the red cell its flexibility — are the same drawing read on opposite faces. Drawn together they stop being confusable.
Priority: strongly helpful
Status: needed
Kind: diagram
Section: Clinical significance
Source direction: purpose-drawn for this product
Rights: newly drawn for this product, or CC-BY
Notes: Serves ART-101-HIS-RED-BLOOD-CORPUSCLES as well, where the same two surfaces are the examinable pair.
### diagram · The four lateral junctions between two epithelial cells, drawn in one column — zonula occludens with the membranes fused and no space, zonula adherens with a wide space and actin on the cytoplasmic side, macula adherens with an attachment plaque anchoring intermediate filaments, and a gap junction with an open narrow gap bridged by six-protein channels
Purpose: The four are told apart by the width of one space and by which filament is anchored, and both are measurements on a drawing. The standard wrong answer — that a gap junction fuses the membranes — is visibly wrong the moment the gap is drawn open.
Priority: required
Status: needed
Kind: diagram
Section: Key determinants
Source direction: purpose-drawn, following the department book's page 60-61 figures rather than reproducing them
Rights: newly drawn for this product, or CC-BY
Notes: The same drawing serves ART-101-HIS-MEMBRANOUS-SPECIALISATIONS, where the junctions are the chapter's own content.
## conflicts
Which membrane molecule has the stabilising effect. The department book states that cholesterol lies among the hydrophobic fatty acid tails, restricts the movement of the phospholipid molecules and so modulates membrane fluidity, and the concept CON-FND-85CC08A33D0A88 follows the book. One question in the extracted bank marks "phospholipids" as the answer to the stabilising-effect stem while another marks cholesterol for the same idea. This article follows the department book: cholesterol is the stabiliser. The question-book discrepancy is recorded rather than resolved silently, and it needs a faculty ruling before either item is published.
## evidence_gaps
The book does not name the fluid-mosaic model as such in this chapter, although it describes every element of it. The phrase is not used here.
The book does not say what proportion of membrane mass is lipid or carbohydrate; only the protein figure, about 50%, is given.
No mechanism is given for how a coated vesicle sheds its clathrin coat, and no fate is given for the vesicle after it forms.
The book names receptor-mediated endocytosis and clathrin but does not describe the receptor itself, its recycling, or what happens to the ligand.
The book gives no figure for the membrane's permeability, no list of what crosses it passively, and no account of active against passive transport in this chapter, although the question books ask about both.
The book does not explain why cell size varies from 4 µm to 150 µm, nor what limits it.
The book gives no width in nanometres for the gap of a gap junction or for the intercellular space of an adherens junction, and it names no junctional protein family — no claudin, occludin, cadherin or connexin appears anywhere. The question books use the word connexon for the gap junction channel and give the gap as 2-3 nm; neither is in the department book, and neither is stated in this article.
No independent citation has been attached to any figure in this article. Every number is traceable to the department book only, which is a single source.
## evidence_basis
Department Book Module 101, "Normal Structure of the Human Body (ISK - 101)", Faculty of Medicine, Cairo University, Part I Histology, chapter II "Cytology", introductory section on The Cell, printed page 7, and the plasma membrane section of the Cytoplasm chapter, printed pages 7-21, including the molecular structure of the cell membrane and the three types of endocytosis. The four lateral junctions are from the same book's Polarity and Membranous Specializations chapter, printed pages 60-62. Extracted to scripts/kasr/extract/deptbook.json.
## field_notes
arabicTitle: Arabic histological terminology has not been reviewed for this module. It is filled at the evidence pass with a reviewer rather than guessed here.
media: No image exists in the repository, so every plate this article needs is written as an image recommendation rather than left as an unexplained blank.
relatedConcepts: All three concepts whose module subject path is 101 ISK > Histology > Cytology > The cell are listed, copied from ../concept/101-ISK-mcq-concepts.md, together with a fourth, CON-FND-17E5245CBA11D0, whose own module subject path is the Polarity and Membranous Specializations leaf but whose article_ids name this article and whose three questions are filed on this leaf. Rather than leave those three questions with nothing to read, the four lateral junctions are taught above, in the department book's own terms and cross-referenced to ART-101-HIS-MEMBRANOUS-SPECIALISATIONS, which owns that leaf. Each listed concept is taught in the prose above — the unit membrane and its thickness in Definition, the molecular components in Mechanism, and the cell coat in Mechanism and Clinical significance. The endocytosis-and-exocytosis concept CON-FND-E66C68C0B80D16 is deliberately not listed: it was moved to the 101 ISK > Histology > Cytology > Cytoplasm path while this batch was being written, so it belongs to ART-101-HIS-CYTOPLASMIC-ORGANELLES. This article still teaches the three types of endocytosis, because the leaf's questions need them, but it does not claim a concept that now sits on another leaf.
questionIds: Questions for this article are authored in the question pass, and the reciprocal link is written then.
subtopic: No SUB_ identifier has been assigned to this module in the canonical taxonomy, so the curriculum position is carried by module_subject instead.
microtopic: No microtopic level exists beneath this node.
nanotopic: No nanotopic level exists beneath this node.
reviewer: Not yet reviewed by faculty. The publication gate is needs_evidence for that reason.
beyondTheBook: The four lateral junctions in Key determinants are from the department book's epithelial chapter rather than its cytology chapter, and the evidence basis says so. The question books' own vocabulary for them — connexon, and a gap of 2-3 nm — is deliberately not used, because the department book names no junctional protein family and gives no gap width; a student answering from this article answers in the book's words. The IgE receptors of the mast cell and the basophil, named in Clinical significance, are taught in the blood and connective tissue chapters of the same book rather than in the cytology chapter. They are used here as an application of the cell coat's receptor function, and the cross-reference is stated rather than presented as this chapter's own content. Nothing from outside the department book is asserted anywhere in this article.
## notes
The department book splits this material between a one-page section called The Cell and the opening pages of the Cytoplasm chapter. The subject tree gives the leaf to The cell and the question bank files forty-six membrane questions there, so the membrane is taught here and the remaining organelles are left to ART-101-HIS-CYTOPLASMIC-ORGANELLES, which holds the Cytoplasm leaf. The two articles are written not to repeat each other.

---

# Item
## id
ART-101-HIS-NUCLEUS
## title
Nucleus
## subject
fnd
## status
Draft
## owner
Claude
## topic
Cytology
## language
en
## learner_stage
Year 1 foundation
## template_id
TPL-CONCEPT
## archetype
concept
## high_yield
Core
## time_sensitive
stable
## publication_gate
needs_evidence
## universities
kau
## years
Year 1
## module
101 ISK
## module_subject
101 ISK > Histology > Cytology > Nucleus
## primary_node_id
DIS-HIS-T01
## secondary_node_ids
SYS-FND-T01-S01-M03
## related_concepts
CON-FND-BC0AAA59F11F66 | CON-FND-C5C16B3F123155 | CON-FND-6C5ABFD844D630 | CON-FND-30573B6D0A9AFD | CON-FND-AEAB45FAA2C33D | CON-FND-5097CA5BAB2E51 | CON-DEV-0BA870DF2C2E13 | CON-FND-E2DE55693981A7 | CON-FND-C81FD3E574D3AA | CON-FND-BAABF179A898ED
## related_articles
ART-101-HIS-THE-CELL: The cell's other basic component, and the plasma membrane whose trilaminar profile the nuclear envelope repeats twice over.
ART-101-HIS-CYTOPLASMIC-ORGANELLES: The rough endoplasmic reticulum the outer nuclear membrane is continuous with, and the ribosomes whose subunits leave through the nuclear pores, are described there.
ART-101-HIS-NON-GRANULAR-LEUKOCYTES: The small lymphocyte is the book's own type example of a heterochromatic, condensed, metabolically inactive nucleus.
ART-101-HIS-CONNECTIVE-TISSUE-CELLS: The plasma cell and the active fibroblast are the book's worked examples of a euchromatic, vesicular nucleus in a protein-forming cell.
ART-101-HIS-CYTOPLASMIC-ORGANELLES: The gamete nuclei summarised in Clinical significance belong to the embryology part of the same book, and the sperm's mitochondrial sheath and axial filament are cytoskeletal structures described in the cytology chapter.
## aliases
Nuclear envelope | Chromatin | Euchromatin | Heterochromatin | Nucleolus | Nuclear sap
## reading_time
13
## summary
One idea runs through the whole chapter, and the paper asks it a dozen different ways: a nucleus tells you how busy its cell is. Uncoiled euchromatin means active genes, a pale vesicular nucleus and a clear nucleolus; coiled heterochromatin means inactive genes, a small dark condensed nucleus and no visible nucleolus. The envelope, the pores, the three parts of the nucleolus and the sap are the machinery that idea runs on, and the number, position and shape of the nucleus are how half the cells in this module are identified in the first place.
## sections
### Definition
The nucleus is the largest component of all cells, with two stated exceptions: the red blood corpuscles and the platelets, which the book states are not true cells because neither has one.

Most cells are mononucleated. Liver cells are binucleated. Osteoclasts and skeletal muscle fibres are multinucleated.

The position of the nucleus may be central, basal, peripheral or eccentric. Its shape may be flat, rounded, oval, bilobed, segmented or multilobed, or kidney-shaped — and each of those shapes belongs to a cell the module names elsewhere, from the flat nucleus of a simple squamous cell to the kidney-shaped nucleus of the monocyte.

In haematoxylin and eosin the nucleus is basophilic, because of its DNA and RNA content. It is always basophilic, which is what makes it the reference against which a cytoplasm is called acidophilic or basophilic.

Structurally the nucleus has four parts: the nuclear membrane, or envelope; the chromatin material; the nucleolus; and the nuclear sap.

### Mechanism
The nuclear envelope is a double-walled membrane, two parallel unit membranes separated by a perinuclear space and interrupted by nuclear pores. The two walls are not alike. The outer membrane is rough, studded with polyribosomes, and continuous with the cisternae of the rough endoplasmic reticulum — the nucleus and the protein factory are one continuous compartment. The inner membrane is fibrillar, with peripheral chromatin attached to it, and it is associated with the nuclear lamina, made mainly of lamins, which are intermediate filament proteins.

Two words are used here and they are not the same thing. A nuclear pore is the circular opening itself — the place where the inner and outer membranes become continuous with one another. The nuclear pore complex is the protein machine that fills that opening: a non-membranous cylindrical assembly of about thirty nucleoporin proteins arranged as an octagonal ring, with filaments extending into the cytoplasm on one side and into the nucleus on the other, and a transporter protein at its centre. The hole is the pore; the machinery in it is the complex, and the question books turn on that difference. Traffic runs both ways through it: proteins are transported into the nucleus, and RNA and ribosomal subunits are exported out of it.

Chromatin is the chromosomal material in the uncoiled state, as it exists in the non-dividing nucleus. It is the genetic material, and it is made of nucleoproteins — double-stranded DNA together with histone and non-histone protein. It is basophilic because of the phosphate groups of its nucleic acid, which is the same reason ribosomes make a cytoplasm basophilic. It carries the genetic information, forms mRNA, rRNA and tRNA, and directs and controls protein synthesis.

Chromatin exists in two forms, and the difference between them is the diagnostic idea of the whole chapter. Euchromatin is extended, uncoiled chromatin containing active genes. It predominates in metabolically active, protein-forming cells. It appears as fine threads, giving a pale basophilic vesicular nucleus with a clear nucleolus, and it is electron-lucent by electron microscopy. Heterochromatin is coiled, inactive chromatin containing inactive genes. It predominates in metabolically inactive cells, of which the small lymphocyte is the book's example. It appears as coarse dark basophilic clumps, giving a condensed nucleus with an unclear nucleolus, and it is electron-dense.

Heterochromatin sits in three places: as peripheral chromatin attached to the inner surface of the nuclear membrane, as chromatin islands scattered in the nuclear sap, and as nucleolus-associated chromatin condensed around the nucleolus.

The nucleolus is a rounded, deeply basophilic mass rich in nucleic acids and surrounded by chromatin, usually one or two per nucleus. By electron microscopy it is spongy and — unlike every organelle in the cytoplasm that is called membranous — it is not limited by a membrane at all. Its dark areas are three. The pars amorpha, or nucleolar organiser, is the DNA filaments carrying the genes for ribosomal RNA. The pars fibrosa is newly formed rRNA strands. The pars granulosa is mature rRNA granules. The pars fibrosa and pars granulosa together are called the nucleolonema. The light areas are nucleolar sap. What the nucleolus does follows from what it is made of: it forms ribosomal RNA and the ribosomal subunits, which pass out through the nuclear pores into the cytoplasm.

Nuclear sap is the colloidal solution filling the spaces between the chromatin and the nucleolus, formed of nucleoproteins, enzymes, sugars, and calcium, potassium and phosphorus ions. Its stated role is to provide the medium for the transport of RNA through the nuclear pores.

The functions of the nucleus as a whole are four: it carries all the genetic information and hereditary factors, it controls all cell functions including protein synthesis, it is responsible for RNA formation, and it directs cell division.

### Key determinants
Euchromatin against heterochromatin is the book's own comparative table and the single most examined pairing in the cytology part. Six columns separate them: state of coiling, gene activity, the kind of cell they predominate in, the light-microscopic appearance of the chromatin, the resulting appearance of the whole nucleus, and the electron density. Euchromatin is uncoiled, active, in protein-forming cells, fine threads, a pale vesicular nucleus with a clear nucleolus, electron-lucent. Heterochromatin is coiled, inactive, in inactive cells, coarse dark clumps, a condensed nucleus with an unclear nucleolus, electron-dense.

The examinable trap is the direction of the inference. A vesicular nucleus is not a nucleus with a hole in it; it is a pale nucleus, and pale means euchromatin, and euchromatin means an active cell. The nerve cell and the liver cell are the book's active examples; the small lymphocyte is its inactive one.

The same pair carries a second set of names in the practical, and a student who has met only one set will not recognise the other. The department's light-microscopic plate is titled "open and closed face nuclei". An open-face nucleus is the vesicular one: pale, faintly basophilic, its chromatin extended, in an active protein-forming cell such as a nerve cell. A closed-face nucleus is the condensed one: small and darkly basophilic, its chromatin coiled, as in a small lymphocyte. Open face and vesicular are the same nucleus, and closed face and condensed are the same nucleus; only the vocabulary changes between the written paper and the spot. The pallor is the diagnosis and not a failure of staining, which is the reason the department prints the two side by side on one plate.

**What the department's plates mark, and what the answer page accepts.** The practical book sets three nuclear plates and the electron-microscopic pair is where most of the marks are.

Nucleolus against nuclear membrane, on one electron micrograph. The blue arrow is the nucleolus and the red arrow is the nuclear membrane, and the two are arrowed on the same plate precisely because they are confusable: the nucleolus is a rounded deeply basophilic mass lying inside the nucleus with no limiting membrane of its own, and the envelope is the two-membraned boundary around the whole of it. A separate labelled plate names the outer and the inner nuclear layers as the two walls of that envelope, with the perinuclear space between them and a pore where they fuse.

The heterochromatic nucleus. The stem says identify the structure and be specific, so "nucleus" alone earns nothing — the answer is a heterochromatic nucleus. The red arrow is peripheral heterochromatin, the green arrow a chromatin island, the yellow arrow nucleolus-associated chromatin, the yellow star the nuclear sap or euchromatin, and the arrowhead the nuclear membrane.

The euchromatic nucleus. The same five markers with two changed: the yellow arrow is now the nucleolus itself, clear in an active cell, and the arrowhead is a nuclear pore. Both plates carry the same list of components, which is the point of setting them as a pair — what separates them is proportion, not the presence or absence of any one part. A nucleus dominated by condensed chromatin is heterochromatic and its cell is inactive; a nucleus that is mostly pale sap with a clear nucleolus is euchromatic and its cell is working.

The three parts of the nucleolus are asked by name and each has one answer. Pars amorpha is the part of the chromosome carrying the genes that encode rRNA. Pars fibrosa is newly synthesised rRNA. Pars granulosa is mature rRNA. Nucleolonema is the name for the last two together, and the light area is nucleolar sap — not a fourth dark component, and not a fibrous lamina, which belongs to the envelope and not to the nucleolus.

The envelope is settled on three facts: two unit membranes with a perinuclear space between them; a granular outer membrane continuous with the rough endoplasmic reticulum; a fibrillar inner membrane with the nuclear lamina and the peripheral chromatin. Like everything else made of nucleic acid it is basophilic, never acidophilic.

The last determinant is the one the rest of the module runs on: a cell is very often named from its nucleus. Number, position, shape and staining together identify it, and the examples are fixed across the question books. The neutrophil has a segmented nucleus of two to five lobes; the eosinophil a bilobed horse-shoe nucleus; the basophil an irregular S-shaped nucleus usually obscured by its granules; the monocyte a large, pale, eccentric kidney-shaped nucleus; the large lymphocyte a large indented nucleus with a visible nucleolus and the small lymphocyte a dark rounded one filling the cell; the megakaryocyte a single large multilobed dark nucleus; the plasma cell an eccentric cartwheel nucleus beside a pale Golgi area; and the unilocular fat cell a flattened nucleus pushed to the periphery by its single droplet, which is the signet-ring appearance. Nuclear level is used the same way at tissue scale: crowded columnar cells whose nuclei sit at more than one level make an epithelium pseudostratified, not stratified, because every one of those cells still reaches the basement membrane. Each of those cells is described in its own article; what belongs here is the vocabulary they are all described in.

### Normal values
The nuclear pore complex is formed of thirty nucleoporin proteins in an octagonal ring.

There are usually one or two nucleoli per nucleus.

The nucleus has four structural parts, heterochromatin has three sites, the nucleolus has three dark regions, and the book lists four functions for the nucleus.

The nuclear envelope is two unit membranes; each unit membrane carries the 7.5–10 nm trilaminar profile described in the cell membrane chapter.

### Clinical significance
The chapter's clinical content is short, and both statements are about growth going wrong.

Chromosomal alterations are associated with tumours and with genetic diseases. The nucleus carries the hereditary material, so a change in the chromosome is a change transmitted to every daughter cell.

The departmental question books examine four such alterations by name, and they are set out here because the paper asks them, with the caution that the histology chapter itself states only the general association and none of the karyotypes. Down syndrome is trisomy 21 — an extra chromosome 21, so the somatic cells hold 47 chromosomes. Turner syndrome affects females and has an XO sex chromosome constitution, so the somatic cells hold 45 chromosomes and the genital system is underdeveloped. Klinefelter syndrome affects males and is XXY, so the somatic cells hold 47 chromosomes. Cri-du-chat syndrome is a partial deletion of the short arm of chromosome 5. The arithmetic is the trap: an extra chromosome makes 47 and belongs to Down and to Klinefelter, while Turner is a chromosome short at 45, and the books put the two beside each other with the same four options.

Large nucleoli are found in rapidly growing malignant cells. This follows directly from what the nucleolus is for. A cell that is dividing fast needs ribosomes fast; ribosomal subunits are made in the nucleolus; so the nucleolus enlarges. A pathologist reporting prominent nucleoli is reporting a rate of protein synthesis, and the same reasoning that makes a plasma cell's nucleolus clear makes a tumour cell's nucleolus large.

The same logic gives the routine slide its diagnostic value. A pale vesicular nucleus with a clear nucleolus says the cell is synthesising; a small dark condensed nucleus says it is not. That judgement is available on any haematoxylin and eosin section, and the module uses it to tell an active fibroblast from a fibrocyte and a plasma cell from a small lymphocyte.

The two nuclei that decide the sex of a child are described in the embryology part of the same book, and they are summarised here because the question books ask them against this leaf. The sperm's head holds a condensed nucleus carrying the father's hereditary material — 22 autosomes and either an X or a Y chromosome — with an acrosomal cap containing hyaluronidase and acrosin over most of that nucleus, minimal cytoplasm, and a cell membrane around it. The whole sperm is about 55 µm long: head 4 µm, middle piece 6 µm, tail 45 µm. Spermatogenesis begins at puberty and continues into old age. The mature ovum is a secondary oocyte about 120 µm across, carrying the mother's hereditary material — 22 autosomes and an X chromosome only — with a large cytoplasm that is the zygote's first source of nutrition, and three coverings which from within outwards are the cell membrane, the zona pellucida, a glycoprotein coat carrying the sperm receptors, and the corona radiata, follicular cells held together by hyaluronic acid. Oogenesis begins in intrauterine life, is arrested, and resumes from puberty to the menopause. So it is the sperm nucleus, not the ovum's, that carries either sex chromosome, and the ovum's diameter is 120 µm rather than 12.

### Common misconceptions
The nucleolus is not a membrane-bound organelle. By electron microscopy it is spongy and not limited by a membrane, which is why it is never listed among the membranous organelles.

Heterochromatin is not "chromatin in the form of coiled filaments" in the sense of fine threads. It is coiled into coarse, dark, clumped masses; fine threads are euchromatin.

A condensed nucleus does not mean a damaged nucleus. It means an inactive cell, and the small lymphocyte — the majority of circulating lymphocytes — has one all its life.

The fibrous lamina, or nuclear lamina, belongs to the inner nuclear membrane and not to the nucleolus. A question listing the components of the nucleolus and offering the fibrous lamina is testing exactly that.

The pars amorpha is not mature rRNA. It is the DNA of the nucleolar organiser — the chromosomal segment carrying the rRNA genes. Mature rRNA is the pars granulosa, and newly formed rRNA is the pars fibrosa.

The nuclear envelope is not acidophilic. Everything in the nucleus that stains in H&E stains basophilic, because of its nucleic acid.

Not every cell has one nucleus and not every multinucleated cell is abnormal. Liver cells are binucleated, and osteoclasts and skeletal muscle are multinucleated, in health.

The ovum nucleus does not carry either sex chromosome. It carries 22 autosomes and an X, always; the sperm nucleus is the one that carries an X or a Y.

The corona radiata is not the innermost covering of the ovum. The order from within outwards is cell membrane, zona pellucida, corona radiata, so the corona radiata is the outer one.

An open-face nucleus is not a different structure from a vesicular one. They are two names for the same pale euchromatic nucleus, and closed face is the same nucleus as condensed. The practical uses the first pair of names and the written paper the second.

The nucleolus is not part of the nuclear envelope. It sits inside the nucleus and has no membrane; the envelope is the two-membraned boundary around the whole nucleus, and the department arrows the two on one plate.

Both electron-microscopic nuclei carry every component. Peripheral heterochromatin, chromatin islands, nucleolus-associated chromatin, nuclear sap, membrane and pores are on the euchromatic plate as well as the heterochromatic one. Which name the nucleus takes is decided by proportion.
## hold_these
The nucleus is the largest component of all cells except red blood corpuscles and platelets, which the book states are not true cells.
Liver cells are binucleated; osteoclasts and skeletal muscle are multinucleated.
The nucleus is basophilic in H&E because of its DNA and RNA.
A pale (vesicular) nucleus means an active cell such as a nerve cell or liver cell; a dark (condensed) nucleus means an inactive cell such as the small lymphocyte.
The nucleus has four parts: nuclear envelope, chromatin, nucleolus and nuclear sap.
The nuclear envelope is two parallel unit membranes with a perinuclear space; the outer membrane is granular with polyribosomes and continuous with rER, the inner is fibrillar with peripheral chromatin and the nuclear lamina of lamins.
The nuclear pore complex is thirty nucleoporin proteins in an octagonal ring; it imports proteins and exports RNA and ribosomal subunits.
Euchromatin is uncoiled with active genes, predominates in protein-forming cells, looks like fine threads, gives a vesicular nucleus with a clear nucleolus and is electron-lucent.
Heterochromatin is coiled with inactive genes, predominates in inactive cells, looks like coarse dark clumps, gives a condensed nucleus with an unclear nucleolus and is electron-dense.
The three sites of heterochromatin are peripheral chromatin, chromatin islands and nucleolus-associated chromatin.
The nucleolus is not limited by a membrane; its dark areas are pars amorpha (rRNA genes), pars fibrosa (newly formed rRNA) and pars granulosa (mature rRNA), the last two together being the nucleolonema, and its light areas are nucleolar sap.
The nucleolus forms rRNA and the ribosomal subunits, which leave through the nuclear pores.
Nuclear sap fills the space between chromatin and nucleolus and provides the medium for transport of RNA through the pores.
Large nucleoli are found in rapidly growing malignant cells, and chromosomal alterations are associated with tumours and genetic diseases.
A nuclear pore is the opening where the two membranes become continuous; the nuclear pore complex is the non-membranous protein assembly filling it.
Chromatin is basophilic because of the phosphate groups of its nucleic acid.
Cells are named from their nuclei: neutrophil segmented into two to five lobes, eosinophil bilobed horse-shoe, basophil irregular S-shaped, monocyte kidney-shaped, small lymphocyte dark and rounded, megakaryocyte single and multilobed, plasma cell eccentric cartwheel, unilocular fat cell flattened and peripheral.
Nuclei at more than one level in a crowded columnar epithelium make it pseudostratified, not stratified.
Down syndrome is trisomy 21 with 47 chromosomes; Klinefelter is XXY with 47; Turner is XO with 45; cri-du-chat is partial deletion of the short arm of chromosome 5.
The sperm nucleus carries 22 autosomes and either an X or a Y chromosome; the ovum nucleus carries 22 autosomes and an X only.
The sperm is about 55 µm long — head 4 µm, middle piece 6 µm, tail 45 µm — with the acrosomal cap over most of the nucleus, not over the middle piece; spermatogenesis starts at puberty.
The mature ovum is about 120 µm across, and its three coverings from within outwards are cell membrane, zona pellucida (glycoprotein, carrying the sperm receptors) and corona radiata (follicular cells joined by hyaluronic acid).
Open face is the practical's name for the pale vesicular euchromatic nucleus of an active cell; closed face is its name for the small dark condensed heterochromatic nucleus.
On an electron micrograph of a nucleus the department's five markers are peripheral heterochromatin, chromatin islands, nucleolus-associated chromatin, nuclear sap or euchromatin, and the nuclear membrane, with the nucleolus and a nuclear pore added on the euchromatic plate.
On a labelled EM plate the two walls of the envelope are named as the outer and the inner nuclear layers.
The nucleolus and the nuclear membrane are arrowed on the same plate as separate answers: the nucleolus lies inside the nucleus with no membrane of its own.
## lose_the_mark
Calling the nucleolus a membranous organelle. By electron microscopy it has no limiting membrane at all.
Describing heterochromatin as fine threads or as coiled filaments rather than coarse dark clumps. Fine threads are euchromatin.
Reading a vesicular nucleus as an empty or degenerating one. Pale means euchromatic, and euchromatic means active.
Listing the fibrous lamina among the components of the nucleolus. It belongs to the inner nuclear membrane.
Giving pars amorpha as mature rRNA. Mature rRNA is the pars granulosa; pars amorpha is the DNA carrying the rRNA genes.
Calling the nuclear envelope acidophilic. Nuclear structures are basophilic.
Saying more heterochromatin is seen in protein-forming cells. Protein-forming cells are euchromatic; heterochromatin predominates in inactive cells.
Making the outer nuclear membrane the fibrillar one. The outer is granular and continuous with rER; the inner is fibrillar and carries the lamina.
Treating binucleate or multinucleate cells as pathological. Liver cells, osteoclasts and skeletal muscle are normally so.
Using nuclear pore and nuclear pore complex as though they were one term. The pore is the hole; the complex is the protein machine in it.
Giving Turner syndrome 47 chromosomes. An extra chromosome makes 47 and belongs to Down and Klinefelter; Turner is XO, at 45.
Calling a pseudostratified epithelium stratified because its nuclei lie at several levels. Every one of its cells still reaches the basement membrane.
Giving the ovum nucleus an X or a Y. Only the sperm nucleus carries either; the ovum always carries an X.
Putting the acrosomal cap over the middle piece, or giving the ovum a diameter of 12 µm. The cap covers most of the nucleus in the head, and the ovum is about 120 µm.
Naming the corona radiata as the inner covering of the ovum. It is the outer one.
Answering "nucleus" to a stem that says be specific. The answer is a euchromatic or a heterochromatic nucleus, and the chromatin state is what carries the mark.
Answering "nuclear membrane" for the arrow on the nucleolus. The nucleolus is inside the nucleus and has no limiting membrane.
Reading the pallor of an open-face nucleus as poor staining. Pale means uncoiled chromatin and a cell that is synthesising.
## image_recommendations
### comparison table · Euchromatin versus heterochromatin — coiling, gene activity, type of cell, light-microscopic appearance of chromatin, appearance of the whole nucleus and nucleolus, and electron density
Purpose: The book prints this as a table on page 24 and the paper asks it back column by column. In prose the six contrasts collapse into a general impression of "pale means active", and the student loses the electron-density and nucleolus rows.
Priority: required
Status: needed
Kind: comparison table
Section: Key determinants
Source direction: purpose-drawn from the department book's page 24 table, redrawn rather than reproduced
Rights: newly drawn for this product, or CC-BY
### histology · A vesicular nucleus and a condensed nucleus at the same magnification in one figure, with the heterochromatin clumps labelled in the condensed one
Purpose: The judgement this chapter trains is a visual one made every time a slide is read, and it is a judgement about degree of darkness. Two nuclei side by side teach it; a sentence about pallor does not.
Priority: required
Status: needed
Kind: histology
Section: Key determinants
Source direction: openly licensed histology teaching set, or an institutional collection
Rights: must be CC-BY or public domain, no all-rights-reserved textbook figure
Notes: The department book prints the same pairing twice, on pages 22 and 24. An unlabelled version is preferred so the plate can carry a recognition question later.
### diagram · The nuclear pore complex in section and from above — cytoplasmic filaments, cytoplasmic ring, transporter protein, nuclear ring and nuclear basket, at the point where inner and outer membranes fuse
Purpose: The book's own page 23 figure. The pore is a place where two membranes meet and a named protein sits, and every part of that is a spatial relation that a list of five component names does not convey.
Priority: required
Status: needed
Kind: diagram
Section: Mechanism
Source direction: purpose-drawn, following the department book's page 23 figure rather than reproducing it
Rights: newly drawn for this product, or CC-BY
### histology · A euchromatic and a heterochromatic nucleus by electron microscopy, side by side at one magnification, with peripheral heterochromatin, a chromatin island, nucleolus-associated chromatin, the nucleolus, the nuclear membrane and a nuclear pore all identifiable on each
Purpose: The department sets these as facing plates with the same five markers, and the whole distinction is a proportion of dark to pale. Proportion cannot be judged from one image, and a student shown only the heterochromatic plate learns to read the components as belonging to it alone.
Priority: required
Status: needed
Kind: histology
Section: Key determinants
Source direction: openly licensed cell biology EM atlas, or an institutional EM teaching set
Rights: must be CC-BY or public domain, no all-rights-reserved textbook figure
Notes: Serves concept CON-FND-BAABF179A898ED. Unlabelled versions are preferred so the same pair can carry the department's own marker question.
### histology · Electron micrograph of the nuclear envelope at high magnification, both membranes resolved with the perinuclear space between them, at least one pore where they fuse, and ribosomes on the outer membrane continuous with a rough endoplasmic reticulum cisterna
Purpose: The envelope is examined as three things at once — two membranes, a space, and a fusion point — and only a magnification high enough to resolve all three teaches any of them. The continuity with the rough reticulum is the fact students most often accept without ever having seen it.
Priority: required
Status: needed
Kind: histology
Section: Mechanism
Source direction: openly licensed cell biology EM atlas
Rights: must be CC-BY or public domain
Notes: Serves concept CON-FND-C81FD3E574D3AA.
### diagram · A gallery of nuclear positions and shapes — central, basal, peripheral and eccentric; flat, rounded, oval, bilobed, segmented or multilobed and kidney — each drawn in the cell the module names for it
Purpose: The book prints position and shape as two rows of small unlabelled drawings on page 22 and never attaches a cell to any of them. Attaching the cells is exactly what turns a vocabulary list into the identification skill the practical and the written paper both test, and it can only be done in a picture.
Priority: required
Status: needed
Kind: diagram
Section: Key determinants
Source direction: purpose-drawn, following the department book's page 22 figures rather than reproducing them, with the cell examples added from the blood, connective tissue and epithelium chapters
Rights: newly drawn for this product, or CC-BY
### diagram · The nucleus in section — envelope with perinuclear space and pores, outer membrane continuous with rER and studded with ribosomes, nuclear lamina and peripheral chromatin on the inner membrane, chromatin islands, and a nucleolus with pars amorpha, pars fibrosa, pars granulosa and nucleolar sap labelled
Purpose: Three separate examinable lists — four nuclear parts, three heterochromatin sites, three nucleolar regions — are all positions in one structure. Drawn once, they become a map instead of three lists to be recalled independently.
Priority: required
Status: needed
Kind: diagram
Section: Mechanism
Source direction: purpose-drawn, following the department book's page 23 and page 25 figures rather than reproducing them
Rights: newly drawn for this product, or CC-BY
## conflicts
[clear]
## evidence_gaps
The book gives no size for the nucleus, no nucleocytoplasmic ratio, and no diameter for the nuclear pore or the perinuclear space.
The book names the nuclear lamina and lamins but does not say what the lamina does beyond being associated with the inner membrane.
The book states that chromatin is chromosomal material in the uncoiled state but does not describe the nucleosome, the histone octamer, or any level of packing between DNA and chromosome.
Cell division is named as a function of the nucleus, but no stage of mitosis or meiosis is described in this chapter.
No named chromosomal disorder appears in this chapter. The book states only that chromosomal alterations are associated with tumours and genetic diseases. The karyotypes of Down, Turner, Klinefelter and cri-du-chat syndromes given in Clinical significance are from the departmental question books, several of them marked in those books as departmental questions, and not from the extracted text of pages 22-25. They need a faculty ruling before publication, and if the department does not teach them here they should be moved to a genetics article rather than kept.
The cells named in Key determinants as examples of nuclear shape — neutrophil, eosinophil, basophil, monocyte, lymphocyte, megakaryocyte, plasma cell, fat cell — are described in the blood, connective tissue and epithelium chapters of the same book, not in the nucleus chapter, which lists the shapes without attaching a cell to any of them.
The book does not state the Barr body here, although the granular leucocyte chapter does.
The book gives no chromosome number for the normal human somatic cell anywhere in this chapter. The gamete chromosome complements given in Clinical significance are from the embryology part of the same book, not from this chapter, and the cytology chapter never states how a haploid gamete nucleus relates to a diploid somatic one.
The book describes no stage of gametogenesis, no meiosis and no reduction division anywhere in the histology part, so nothing is said here about how a gamete comes to carry half the chromosomes.
The department book does not use the terms "open face" and "closed face". They appear only as the caption of the practical book's light-microscopic plate, which prints no marked question and no answer page. The equation made here — open face is the book's pale vesicular nucleus, closed face its dark condensed one — joins that caption to the book's own pair, and is the article's own reasoning rather than a sentence either source prints. It is the vocabulary the spot exam uses, so it is stated here rather than left for a student to guess at the bench.
No independent citation has been attached to any figure in this article. Every number is traceable to the department book only, which is a single source.
## evidence_basis
Department Book Module 101, "Normal Structure of the Human Body (ISK - 101)", Faculty of Medicine, Cairo University, Part I Histology, chapter II "Cytology", section on The Nucleus, printed pages 22-25, including the page 24 euchromatin-versus-heterochromatin table, the page 23 nuclear pore complex figure and the page 25 electron micrograph of the nucleolus. The gamete nuclei summarised in Clinical significance are from the same book's Part II, General Embryology, chapter on Gametes, printed pages 66-67. The named cells in the nuclear-shape paragraph are from the same book's Blood, Connective Tissue and Epithelial Tissues chapters, printed pages 26-62. Extracted to scripts/kasr/extract/deptbook.json.
The department's practical book, "DPT Practical Histo 101" (src_b4cb8bf9f0c7a6584b4b), catalogued in scripts/kasr/extract/practical.json — the marked plates and facing answer pages for the nucleolus against the nuclear membrane (p. 63), the heterochromatic nucleus (p. 65) and the euchromatic nucleus (p. 67), and the labelled plate naming the outer and inner nuclear layers (p. 73); and the captioned teaching plate of open and closed face nuclei (p. 27). Every marker and accepted answer in "What the department's plates mark" is taken from those answer pages.
## field_notes
arabicTitle: Arabic histological terminology has not been reviewed for this module. It is filled at the evidence pass with a reviewer rather than guessed here.
media: No image exists in the repository, so every plate this article needs is written as an image recommendation rather than left as an unexplained blank.
practicalIdentification: The open-face and closed-face paragraph is the one place in this article where a term is equated across two sources rather than quoted from one. It is recorded in evidence_gaps.
relatedConcepts: All six concepts whose module subject path is 101 ISK > Histology > Cytology > Nucleus are listed, copied from ../concept/101-ISK-mcq-concepts.md, together with a seventh, CON-DEV-0BA870DF2C2E13, whose own module subject path is the General Embryology > Gametes leaf but whose article_ids name this article and whose two questions are filed on this leaf. Rather than leave those two questions with nothing to read, the gamete nuclei are summarised in Clinical significance from the embryology chapter of the same book, with the source named. Each listed concept is taught above — the four parts, the nuclear sap and the functions in Definition and Mechanism; the envelope and the pore-versus-pore-complex distinction in Mechanism and Key determinants; euchromatin against heterochromatin and the three heterochromatin sites in Mechanism and Key determinants; the three parts of the nucleolus and what it makes in Mechanism and Key determinants; nuclear number, position, shape and level as the way a cell is named in Key determinants; and the four named chromosomal syndromes in Clinical significance. The last of those six was minted while this article was being written and is the only one whose content the histology chapter itself does not carry; it is taught with its source named rather than left uncovered.
questionIds: The extracted question bank files seventy-one questions on this leaf. They are authored in the question pass rather than here.
subtopic: No SUB_ identifier has been assigned to this module in the canonical taxonomy, so the curriculum position is carried by module_subject instead.
microtopic: No microtopic level exists beneath this node.
nanotopic: No nanotopic level exists beneath this node.
reviewer: Not yet reviewed by faculty. The publication gate is needs_evidence for that reason.
beyondTheBook: Two blocks of content in this article are not in the department book's nucleus chapter, and both are named as such rather than smuggled in. The karyotypes of Down, Turner, Klinefelter and cri-du-chat syndromes in Clinical significance come from the departmental question books, which mark several of them as departmental questions; the chapter itself teaches only that chromosomal alterations are associated with tumours and genetic diseases. They are taught here because concept CON-FND-5097CA5BAB2E51 sits on this leaf and the questions on it would otherwise have nowhere to be read, and they carry an explicit sentence in the prose saying the chapter does not state them. The named cells in the nuclear-shape paragraph are from other chapters of the same book, cross-referenced rather than reproduced, and so is the gamete material in Clinical significance, which belongs to the embryology part. Nothing in this article comes from a textbook other than the department's own book and its own question books.
## notes
Extended to close the practical gap on this leaf: three identification concepts sat here with no article claiming them. Two the article already taught in full — the nuclear envelope with its two membranes, perinuclear space and pores, and the euchromatin-against-heterochromatin comparison with the three sites of heterochromatin — and needed only the department's own marker-by-marker answers written down. The third could not honestly be declared until the article was extended, because the article carried that idea under one set of names and the spot exam asks it under another: pale vesicular and dark condensed in the book, open face and closed face on the plate.

Several questions filed on this leaf in the extracted bank are really questions about a named blood or connective tissue cell whose nucleus is the discriminating feature — the S-shaped basophil nucleus, the kidney-shaped monocyte nucleus, the multilobed megakaryocyte nucleus. This article supplies the vocabulary of nuclear shape and activity; the cells themselves are described in their own articles.

---

# Item
## id
ART-101-HIS-CONNECTIVE-TISSUE-FIBRES
## title
Connective tissue fibres
## subject
fnd
## status
Draft
## owner
Claude
## topic
Connective tissue
## language
en
## learner_stage
Year 1 foundation
## template_id
TPL-CONCEPT
## archetype
concept
## high_yield
Core
## time_sensitive
stable
## publication_gate
needs_evidence
## universities
kau
## years
Year 1
## module
101 ISK
## module_subject
101 ISK > Histology > Connective Tissue > Connective Tissue Fibres
## primary_node_id
DIS-HIS-T02
## secondary_node_ids
SYS-FND-T03-S02-M03
## related_articles
ART-101-HIS-CONNECTIVE-TISSUE-CELLS: The fibroblast, the reticular cell and the chondroblast that make these fibres are described there, along with the ground substance the fibres lie in.
ART-101-HIS-TYPES-OF-CONNECTIVE-TISSUE: Which fibre predominates is what names each type of connective tissue proper, and the six types are set out there.
ART-101-HIS-MEMBRANOUS-SPECIALISATIONS: Type IV collagen of the basal lamina and type VII anchoring fibrils belong to the basement membrane, described in full there.
ART-101-HIS-MICROTECHNIQUES: Mallory, van Gieson, orcein, silver and PAS are defined there as stains; here they are used as the means of telling one fibre from another.
## aliases
Collagen fibres | Elastic fibres | Reticular fibres | Collagen types
## reading_time
10
## summary
Three fibres, and the book separates them on four things at once: the protein they are made of, the cell that makes them, what they look like by light microscopy, and — the part the paper leans on hardest — which stain shows them. Collagen is the strongest and the most abundant, elastic is the one that recoils, and reticular is the one that is invisible in haematoxylin and eosin and has to be found with silver.
## sections
### Definition
Connective tissue fibres are protein molecules polymerised to form thin threads. The book teaches three types: collagen fibres, elastic fibres and reticular fibres.

Collagen fibres are made of type I collagen protein. Elastic fibres are made of elastin. Reticular fibres are made of type III collagen — which is the single most useful fact in the chapter, because it makes the reticular fibre a kind of collagen rather than a third protein.

### Mechanism
Each fibre is defined by the cell that makes it and by the mechanical job it does, and the two are related.

Collagen fibres are synthesised mainly by fibroblasts, and by osteoblasts in bone. By light microscopy they appear as wavy branching bundles formed of non-branching fibres. They are colourless in fresh sections, and white when condensed, as in a tendon. They are the strongest fibres. They are flexible but inelastic, and their function is to give strength and to resist stretching. The book directs the student to Biochemistry for collagen synthesis itself and teaches none of it here.

Elastic fibres are made of elastin and are synthesised mainly by fibroblasts, and also by chondroblasts and by smooth muscle cells. They are single, thin and branching, and yellow in fresh sections. Their property is that they stretch and recoil, and their function is to give elasticity. Where a tissue has to spring back — the aorta, the trachea, the vocal cords — elastic fibres are what does it.

Reticular fibres are type III collagen, synthesised mainly by fibroblasts, reticular cells and smooth muscle cells. They form a fine fibrillar network. Their function is to form a loose, flexible supporting network — the stroma of organs such as the spleen and the liver. A fibre that supports a soft organ has to be delicate and to branch into a mesh, and that is exactly what type III collagen is arranged to do.

### Key determinants
The stains are the discrimination the paper actually uses, and they are best held as a grid.

Collagen fibres stain pink with eosin, blue with Mallory's trichrome, and red with van Gieson. Elastic fibres stain pink with eosin, brown with orcein, and yellow with van Gieson. Reticular fibres are not visible in haematoxylin and eosin at all; because of their high sugar content they are stained brown by silver and red by PAS.

Two consequences fall out of that grid and both are examined. Van Gieson is the one stain that separates collagen from elastic in a single preparation, red against yellow. And a question that asks which fibre silver demonstrates is asking for the reticular fibre, because it is the only one that needs demonstrating at all.

Branching is the other high-frequency discrimination, and the book's wording repays care. A collagen fibre does not branch; a collagen bundle is wavy and branching, and the bundle is made of non-branching fibres. Elastic fibres are single and do branch. Reticular fibres branch into a network. So when a question asks which fibres can branch except one, type I collagen fibres are the exception, and when a question lists "branched fibres" among the characters of collagen it is naming the property of the bundle as though it were the property of the fibre.

The collagen types are tabulated by the book, and each has one main character, one main site and one cell of origin. Type I is arranged in bundles and lies in connective tissue proper, tendon, bone and organ capsules; it comes from fibroblasts and osteoblasts. Type II is fine fibres in cartilage, from chondroblasts. Type III is the reticular fibre, in the stroma of some organs, from fibroblasts, reticular cells and smooth muscle cells. Type IV is granular, in the basement membrane associated with epithelium, from epithelial cells. Type VII forms the anchoring fibres of basement membranes, from fibroblasts.

Read as a set, the table answers most of the questions asked on this leaf: the most common and the strongest collagen is type I; the collagen of the basal lamina is type IV, and it is in granular form rather than fibrillar; the collagen of the reticular lamina is type III; the anchoring fibrils are type VII; and type II is the one that belongs to cartilage and therefore never to a basement membrane.

### Normal values
Three types of connective tissue fibre.

Five collagen types tabulated: I, II, III, IV and VII.

Collagen stains: eosin pink, Mallory's trichrome blue, van Gieson red. Elastic stains: eosin pink, orcein brown, van Gieson yellow. Reticular stains: not visible in H&E, silver brown, PAS red.

### Clinical significance
Both of the book's clinical statements here are about collagen, and both are about the fibre failing in opposite directions.

Vitamin C deficiency — scurvy — is due to defective collagen synthesis, and it is characterised by unhealed wounds and bleeding gums. The presentation reads directly off the function: collagen gives strength and resists stretching, so a tissue that cannot make it cannot close a wound or hold a tooth in its socket. When a stem describes a child or an adult with bleeding gums, loose teeth and wounds that will not heal, the defective molecule being asked for is collagen.

Keloid is the opposite failure. It is a local swelling caused by an abnormal healing process leading to increased deposition of collagen in scars of the skin — too much of the same fibre, laid down where a normal scar would have stopped.

The clinical value of the stains follows the same practical logic. Reticular fibres form the stroma of the spleen, the liver and the lymph node, and a silver preparation is how a pathologist sees whether that framework is intact — information no haematoxylin and eosin section carries, because in H&E the fibres are not there to see.

### Common misconceptions
Reticular fibres are not a third protein. They are type III collagen, and calling them a kind of collagen keeps the whole classification straight.

Reticular fibres are not merely faint in haematoxylin and eosin. They are not visible in it, which is why a stain is required rather than recommended.

Collagen fibres are not branched. The bundles branch; the fibres within them do not, and elastic and reticular fibres are the branching ones.

Type I collagen is not the collagen of the basement membrane. Type IV is, and it is granular rather than fibrillar. Type II belongs to cartilage and appears in neither.

Elastic fibres are not deeply basophilic. They stain pink with eosin like collagen, and it takes orcein or van Gieson to separate them from it.

Collagen is not elastic. It is flexible but inelastic; recoil is the elastic fibre's property, and the two words are not synonyms.

Cartilage collagen is not made by fibroblasts. Type II comes from chondroblasts, and type IV of the basal lamina comes from the epithelial cells themselves, not from the connective tissue below.
## hold_these
The three connective tissue fibres are collagen (type I collagen), elastic (elastin) and reticular (type III collagen).
Collagen fibres are the strongest, flexible but inelastic, giving strength and resisting stretching, and are wavy branching bundles made of non-branching fibres.
Collagen is made mainly by fibroblasts, and by osteoblasts in bone.
Elastic fibres are single, thin, branching and yellow in the fresh state, made by fibroblasts, chondroblasts and smooth muscle cells, and they stretch and recoil.
Reticular fibres are type III collagen made by fibroblasts, reticular cells and smooth muscle cells, and they form the stroma of organs such as spleen and liver.
Collagen stains pink with eosin, blue with Mallory's trichrome and red with van Gieson.
Elastic fibres stain pink with eosin, brown with orcein and yellow with van Gieson.
Reticular fibres are invisible in H&E and are stained brown by silver and red by PAS, because of their high sugar content.
Type I collagen is the most common and the strongest, in bundles, in CT proper, tendon, bone and organ capsules.
Type II collagen is fine fibres in cartilage, from chondroblasts.
Type IV collagen is granular, in the basement membrane, made by the epithelial cells.
Type VII collagen forms the anchoring fibres of basement membranes.
Vitamin C deficiency causes defective collagen synthesis — scurvy, with unhealed wounds and bleeding gums; keloid is excessive collagen deposition in a skin scar.
## lose_the_mark
Treating reticular fibres as a separate protein. They are type III collagen.
Writing that reticular fibres stain pink with H&E. They are not visible in H&E at all.
Calling collagen fibres branched. The bundles branch; the fibres do not, and that is the exception a "which can branch except" question is built on.
Giving type I collagen for the basal lamina. The basal lamina is type IV, in granular form; the reticular lamina is type III.
Putting type II collagen in a basement membrane. Type II is the cartilage collagen.
Calling elastic fibres deeply basophilic. They are pink with eosin, brown with orcein and yellow with van Gieson.
Saying collagen is elastic. It is flexible but inelastic; recoil belongs to the elastic fibre.
Naming the fibroblast as the source of every collagen. Osteoblasts make type I in bone, chondroblasts make type II, and epithelial cells make type IV.
Choosing Mallory or van Gieson to demonstrate reticular fibres. Silver is the answer, and PAS the alternative.
## image_recommendations
### comparison table · The three connective tissue fibres in one table — protein, cell of origin, light-microscopic appearance, stains and colours, physical characters, function — as the book prints it
Purpose: The book sets this out as a table on page 47 and every question on the leaf asks for one cell of that table. Rebuilt from prose the grid loses its rows, and it is precisely the row-by-row contrast that is being marked.
Priority: required
Status: needed
Kind: comparison table
Section: Key determinants
Source direction: purpose-drawn from the department book's page 47 table, redrawn rather than reproduced
Rights: newly drawn for this product, or CC-BY
### comparison table · The five collagen types — I, II, III, IV, VII — against main character, main site and cell of origin
Purpose: A named type is asked with a site or a cell attached, in either direction. A five-row table is the only form in which both directions are equally available; prose privileges whichever order it was written in.
Priority: required
Status: needed
Kind: comparison table
Section: Key determinants
Source direction: purpose-drawn from the department book's page 48 table, redrawn rather than reproduced
Rights: newly drawn for this product, or CC-BY
### histology · Silver preparation of a lymph node or liver showing the reticular fibre network as a brown-black mesh
Purpose: The single most surprising fact in this chapter is that an entire fibre population is absent from the routine slide. A silver preparation of the same tissue makes the invisible framework visible, and nothing written does that.
Priority: required
Status: needed
Kind: histology
Section: Mechanism
Source direction: openly licensed histology teaching set or an institutional collection
Rights: must be CC-BY or public domain, no all-rights-reserved textbook figure
### histology · Van Gieson preparation in which collagen is red and elastic fibres are yellow in the same field, ideally a section of aorta or dermis
Purpose: One stain separating two fibres by colour is a two-colour fact, and it cannot survive being described. This is also the plate that makes the elastic-versus-collagen decision practical rather than memorised.
Priority: strongly helpful
Status: needed
Kind: histology
Section: Key determinants
Source direction: openly licensed histology teaching set
Rights: must be CC-BY or public domain
### diagram · A collagen bundle drawn branching while the individual fibres within it run unbranched, beside a single branching elastic fibre and a reticular network, at the same scale
Purpose: The examinable distinction is between a bundle that branches and a fibre that does not, and it is a distinction of level, not of wording. One drawing settles it; the sentence that states it is misread every year.
Priority: required
Status: needed
Kind: diagram
Section: Key determinants
Source direction: purpose-drawn for this product
Rights: newly drawn for this product, or CC-BY
## conflicts
[clear]
## evidence_gaps
The book explicitly refers collagen synthesis out to Biochemistry — "COLLAGEN SYNTHESIS: Refer to the Biochemistry" — so no synthetic pathway, no procollagen, no tropocollagen and no cross-linking step is taught in this chapter or stated here.
The book gives no diameter for any of the three fibres and no banding periodicity for collagen.
The book does not describe the electron-microscopic appearance of any of the three fibres in this chapter.
No account is given of elastic fibre composition beyond the word elastin — no fibrillin, no microfibril component.
The book states that reticular fibres have a high sugar content but does not say what that carbohydrate is.
The mechanism by which vitamin C deficiency impairs collagen synthesis is not given; the book states the association and no more.
No independent citation has been attached to any figure in this article. Every statement is traceable to the department book only, which is a single source.
## evidence_basis
Department Book Module 101, "Normal Structure of the Human Body (ISK - 101)", Faculty of Medicine, Cairo University, Part I Histology, chapter on Connective Tissue, section on Connective Tissue Fibres, printed pages 47-48, including the page 47 table of fibre types and the page 48 table of the most common collagen types. The basal lamina and reticular lamina statements are the same book's Polarity and Membranous Specializations chapter, printed pages 60-62. Extracted to scripts/kasr/extract/deptbook.json.
## field_notes
arabicTitle: Arabic histological terminology has not been reviewed for this module. It is filled at the evidence pass with a reviewer rather than guessed here.
media: No image exists in the repository, so every plate this article needs is written as an image recommendation rather than left as an unexplained blank.
relatedConcepts: No concept in ../concept/101-ISK-concepts.md or ../concept/101-ISK-mcq-concepts.md carries the module subject path of this leaf, so the list is empty. None is invented here, and no concept belonging to another leaf is claimed as taught by this article.
questionIds: The extracted question bank files fifty-one questions on this leaf. They are authored in the question pass rather than here.
subtopic: No SUB_ identifier has been assigned to this module in the canonical taxonomy, so the curriculum position is carried by module_subject instead.
microtopic: No microtopic level exists beneath this node.
nanotopic: No nanotopic level exists beneath this node.
reviewer: Not yet reviewed by faculty. The publication gate is needs_evidence for that reason.
beyondTheBook: Nothing in this article comes from outside the department book. The basal lamina and reticular lamina facts used in Key determinants are from the same book's epithelial chapter rather than from this one, and the evidence basis says so; they are included because the question books ask them against this leaf and because they are collagen type statements.
## notes
The department book prints the fibre table and the collagen table on facing material, and the "Types of C.T. Proper" chart falls on the same page 48 as the collagen table. The two leaves are therefore easy to conflate in revision; this article stops at the fibres, and ART-101-HIS-TYPES-OF-CONNECTIVE-TISSUE begins with the chart.

---

# Item
## id
ART-101-HIS-TYPES-OF-CONNECTIVE-TISSUE
## title
Types of connective tissue proper
## subject
fnd
## status
Draft
## owner
Claude
## topic
Connective tissue
## language
en
## learner_stage
Year 1 foundation
## template_id
TPL-CONCEPT
## archetype
concept
## high_yield
Core
## time_sensitive
stable
## publication_gate
needs_evidence
## universities
kau
## years
Year 1
## module
101 ISK
## module_subject
101 ISK > Histology > Connective Tissue > Types of Connective Tissue Proper
## primary_node_id
DIS-HIS-T02
## secondary_node_ids
DIS-HIS-T03
## related_concepts
CON-FND-FE298AB3CE47E9 | CON-FND-5DCA7C68C51E38 | CON-FND-B784BE0F18B493 | CON-FND-37C773B1F99BE3 | CON-FND-86543DB2855310 | CON-FND-EA4034F1E87235 | CON-FND-3E3303864A3CE8 | CON-FND-49D5829AC3DCA1 | CON-FND-7FB8290199B237 | CON-FND-B33D27A8517527 | CON-FND-4671C4D2911392
## related_articles
ART-101-HIS-CONNECTIVE-TISSUE-CELLS: Every cell named here — the fibroblast, the fat cell, the reticular cell, the mast cell, the macrophage, the plasma cell — is described there, along with the ground substance.
ART-101-HIS-CONNECTIVE-TISSUE-FIBRES: Which fibre predominates is what names most of these types, and the three fibres and their stains are set out there.
ART-101-HIS-RED-BLOOD-CORPUSCLES: Blood is one of the specialised connective tissues named in the classification here, and its cells and plasma matrix are described there.
## aliases
Loose areolar CT | Adipose tissue | Brown fat | Reticular CT | Mucoid CT | Wharton's jelly | White fibrous CT | Yellow elastic CT
## reading_time
14
## summary
Connective tissue is graded by the consistency of its matrix, and that one criterion sorts everything: soft matrix is connective tissue proper, rubbery is cartilage, solid is bone and fluid is blood. Within connective tissue proper, four loose types and two dense ones each carry a single defining fact — loose areolar is the commonest and contains everything, brown fat makes heat, mucoid is jelly, yellow elastic recoils — and the exam asks for exactly those facts and the sites that go with them.
## sections
### Definition
All connective tissue is cells plus an intercellular matrix, and the consistency of that matrix is what divides it. Where the matrix is soft the tissue is connective tissue proper. Where it is rubbery the tissue is cartilage; where solid, bone; where fluid, blood. Cartilage, bone and blood are the specialised connective tissues. Mesenchyme is the embryonic connective tissue from which all of them arise. That classification is the first thing to have straight, because a question offering blood, cartilage, mesenchyme and dense connective tissue and asking which is specialised is asking nothing else.

Connective tissue proper is then divided in two. Loose connective tissue has abundant ground substance and tissue fluid in which the cells and fibres are scattered. Dense connective tissue has abundant fibres and fewer cells. There are four loose types — loose areolar, adipose, reticular and mucoid — and two dense types — white fibrous and yellow elastic.

### Mechanism
Each type is what it is because one component of the tissue has been allowed to dominate, and its properties follow from that.

Loose areolar connective tissue is the most common and most widespread type. It contains all the types of connective tissue cell and all three types of fibre, mainly collagen bundles, and it has the most abundant matrix of any type. It is called loose because of the areolae — potential cavities within it which can accommodate a large amount of fluid or gases. It is flexible and well vascularised.

Adipose connective tissue is fat cells predominating, held by a fine network of reticular fibres that supports and binds the individual fat cells, with collagen fibres dividing the tissue into incomplete lobules. It comes in two forms which do opposite things with fat.

Reticular connective tissue contains reticular cells and a fine network of reticular fibres with a moderate amount of matrix. It is a delicate type and it forms the supporting framework — the stroma — of organs such as the lymph node, the liver and the spleen. It is stained brown-black by silver, which is the only way it is seen. What silver shows is a network of fibres that are brown, thin, and branching and anastomosing with each other, and those three are what the department accepts as the visible characters of the tissue.

Mucoid connective tissue contains mainly fibroblasts, with fine collagen and reticular fibres, in a large amount of soft, jelly-like ground substance rich in mucus and hyaluronic acid. Its role is supportive.

White fibrous connective tissue is fibroblasts and collagen fibres packed in bundles with minimal matrix. It is very dense, white in the fresh state, resistant and less flexible. On a section its bundles are thick and acidophilic, and the flattened dark nuclei lying among them are fibroblasts or fibrocytes. It has two arrangements. In regular white fibrous connective tissue the collagen bundles are regularly arranged with fibroblasts in rows between them, and it withstands stretch in one direction. In irregular white fibrous connective tissue the bundles run in different directions with fibroblasts scattered among them, and it withstands stretch in different directions. The arrangement is the function: parallel bundles resist a pull along one line, and a felt of bundles resists a pull from anywhere.

Yellow elastic connective tissue is fibroblasts and condensed parallel elastic fibres with a small amount of matrix. It is dense, with a great predominance of elastic fibres, yellow in the fresh state, and it has great elastic power — it recoils when stretched. Elastic fibres run singly rather than in bundles, and on a section they are thin, zigzag and acidophilic; orcein is the stain that demonstrates them, and it stains them brown.

Each of these types is recognised on a section by which fibre fills the field and how it is arranged, so the three fibre pictures are worth carrying together. A collagen fibre is condensed into thick acidophilic bundles. An elastic fibre is single, thin, zigzag and acidophilic. A reticular fibre is thin, branching and anastomosing, and it is invisible until silver stains it brown. That is why a dense field of thick parallel bundles, a dense field of thin zigzag single fibres, and a brown network in a silver preparation are three different answers rather than three views of one tissue.

### Key determinants
Loose areolar connective tissue is settled by three superlatives and one exception. It is the most common type, the most widespread type, and the only type containing all connective tissue cells and all fibres. It is found everywhere in the body except the brain: filling the spaces between organs, in the papillary layer of the dermis, in the lamina propria and submucosa of mucous membranes, in serous membranes, and around blood vessels and nerves. It sits under every epithelium. Its functions are the exchange of nutrients and wastes to and from the blood vessels, binding structures together, and limiting the spread of infection. The exception is what is asked: the brain is the one place it is absent, because the brain is supported by neuroglia rather than by connective tissue.

Adipose tissue is settled by the white-against-brown comparison, and the two differ on every line. White adipose connective tissue is made of unilocular fat cells — one large droplet per cell — and is white because it is poorly vascularised and its droplets hold carotenoids. It is affected by diet and by hormones. It is widely distributed under the skin, especially in females and in the gluteal region and abdominal wall, in the mammary gland, in the mesentery and around the kidney and other organs. Brown adipose connective tissue is made of multilocular fat cells and is brown from two causes together — a higher vascularity and the cytochrome pigments of its many mitochondria. It is affected by hormones but not by diet. It is present in large amounts in fetal life and in the newborn, is lost during childhood and replaced by white fat, and persists in the adult only in the interscapular, mediastinal and axillary regions. Its function is thermogenesis in the newborn. So brown fat decreases with age and white fat increases, and a question about which type characterises the newborn or protects the newborn by producing heat has one answer.

The functions of adipose tissue as a whole are five: it synthesises and stores fat, it insulates the body against heat loss, it keeps organs such as the kidney in position, it fills the spaces between tissues, and it gives the skin its contour. To those the book adds an endocrine function — it secretes leptin, which inhibits food intake and raises the metabolic rate. Insulating against heat loss and generating heat are different jobs: white fat insulates, brown fat generates, and a question asking for the exception among the functions of white adipose tissue is asking for thermogenesis.

Mucoid connective tissue is settled by its ground substance and its three sites: the umbilical cord, where it is called Wharton's jelly, the vitreous humour of the eye, and the pulp of the teeth. Jelly rich in hyaluronic acid, with almost nothing but fibroblasts in it, is the description; loose areolar tissue also has abundant ground substance, but it has every cell type and every fibre, and mucoid tissue has neither.

Yellow elastic connective tissue is settled by its sites, and the book lists six: large arteries such as the aorta, the trachea and bronchi and bronchioles and the tissue around alveoli, the vocal cords, and three named elastic ligaments — the ligamentum flavum joining the vertebrae, the ligamentum nuchae at the back of the neck, and the suspensory ligament of the penis.

White fibrous tissue is settled by its two arrangements and their sites. Regular is tendon and cornea. Irregular is the reticular layer of the dermis, the ligaments, the sclera of the eye and the capsules of organs.

**What the department's plates mark, and what the answer page accepts.** The practical book sets one marked plate per type and asks the same four things of most of them: name the type — and the stem says be specific, so "connective tissue" is not an answer — give its colour in the fresh state, name the fibre the arrow sits on with one character, and give two visible characters of the tissue.

Loose areolar. The tissue is named specifically. The blue arrow is collagen fibres, condensed into bundles, acidophilic; the green arrow is elastic fibres, single, thin, zigzag, acidophilic; the arrowhead is the fibroblast, or its nucleus; the star is the matrix. Two fibre populations in one open field, with cells scattered between them, is what separates this from every dense type, where one fibre fills the field.

Reticular. The type is named and the special stain is asked for in the same breath: silver. The red arrows are reticular fibres, and the characters are brown, thin, and branching and anastomosing. The examiner asks the type on one plate and the arrowed fibre on another, and the word reticular is the answer to both while naming two different things — the tissue, and the fibre in it.

Yellow elastic. The fresh colour is yellow. The stain is orcein and it stains the fibres brown. The red arrows are elastic fibres and the two characters wanted are drawn from single, thin, zigzag and acidophilic. The fresh colour is asked on this plate and on the fibrous plates for the same reason: yellow here, white there, and answering white out of habit throws the mark away.

Regular white fibrous. The fresh colour is white. The black arrows are the nuclei of fibroblasts or fibrocytes, lying in rows; the red arrows are collagen fibres; and the two characters are drawn from parallel, regular, thick bundles and acidophilic.

Irregular white fibrous. The same plate design with one answer changed: the bundles are irregularly arranged. Everything else — white in the fresh state, thick acidophilic bundles, fibroblast and fibrocyte nuclei among them — is identical, which is why the arrangement of the bundles is the whole of the difference and why naming only "white fibrous connective tissue" does not answer a stem that asks for the specific type.

Mucoid. The department prints this one as a captioned teaching plate rather than a marked question, so there is no model answer to quote. What identifies it on a section is that the ground substance fills the field: a pale jelly with a few scattered fibroblasts and delicate fibres in it, and neither the two fibre populations nor the many cell types that make loose areolar tissue look busy.

### Normal values
Four loose types of connective tissue proper — areolar, adipose, reticular, mucoid — and two dense types — white fibrous and yellow elastic.

Four matrix consistencies dividing connective tissue: soft, rubbery, solid and fluid.

Three named elastic ligaments: ligamentum flavum, ligamentum nuchae and the suspensory ligament of the penis.

Three sites of mucoid connective tissue: umbilical cord, vitreous humour and dental pulp.

Three adult sites of persisting brown fat: interscapular, mediastinal and axillary.

### Clinical significance
Loose areolar connective tissue limits the spread of infection. That is a mechanical statement about a tissue that lies under every epithelium and around every vessel: it is the plane an infection has to cross to spread, and the plane in which a surgeon separates structures. Its abundant vascularity is also why it is where exchange with the blood happens, and why a tissue that is inflamed swells — the areolae are potential cavities that accommodate a large amount of fluid.

Brown fat is the newborn's heating system. A newborn cannot shiver effectively, and thermogenesis in brown adipose tissue — fat burned to release heat through the thermogenin of its mitochondria — is what keeps its temperature up. The tissue is abundant at birth for that reason and is lost through childhood as the mechanism becomes unnecessary.

The endocrine role of adipose tissue is the clinical reason to stop thinking of fat as inert. Leptin from fat cells inhibits food intake and raises the metabolic rate, which makes the fat mass part of the system that regulates the fat mass.

Reticular connective tissue matters clinically because it is the framework of the organs where blood cells are made and filtered — lymph node, spleen, liver — and a silver stain is how that framework is assessed.

### Common misconceptions
Loose areolar connective tissue is not loose because it is poor in fibres in some absolute sense. It contains all three fibre types; it is loose because ground substance and areolae dominate it, and density is precisely what it does not have.

The brain is not full of loose connective tissue because it is soft. It is nervous tissue supported by neuroglia, and the book names it as the one place loose areolar tissue is absent.

Adipose tissue has no role in immunity. It stores, insulates, supports, fills and secretes leptin. Antibody comes from the plasma cell, and no fat cell makes any.

White fat does not perform thermogenesis. It insulates against heat loss, which is the opposite kind of job; heat generation is brown fat.

Brown fat is not brown because of carotenoids. Carotenoids are what make white fat white; brown fat is brown from its richer blood supply and the cytochrome pigments of its mitochondria, and the book gives both causes together.

Blood is connective tissue. Being fluid and circulating does not exclude it — the matrix is the plasma, and a fluid matrix is exactly what places it among the specialised connective tissues.

Mesenchyme is not a specialised connective tissue. It is the embryonic connective tissue from which all the others arise.

Dense connective tissue is not the commonest type. It is loose areolar tissue, and a tissue full of fibres is what loose areolar tissue is not.
## hold_these
Connective tissue is divided by the consistency of its matrix: soft is CT proper, rubbery is cartilage, solid is bone, fluid is blood; cartilage, bone and blood are the specialised connective tissues and mesenchyme is the embryonic one.
CT proper has four loose types — areolar, adipose, reticular, mucoid — and two dense types — white fibrous and yellow elastic.
Loose areolar CT is the most common and most widespread type, contains all CT cells and all three fibres, and has the most abundant ground substance.
Loose areolar CT is found everywhere except the brain, and its functions are exchange with the blood, binding structures together and limiting the spread of infection.
Areolae are potential cavities in loose CT that can accommodate a large amount of fluid or gases.
White adipose tissue is unilocular, white from poor vascularity and carotenoids, affected by diet and hormones, and it increases with age.
Brown adipose tissue is multilocular, brown from higher vascularity and mitochondrial cytochrome pigments, affected by hormones but not diet, abundant in the fetus and newborn, lost during childhood, and it performs thermogenesis.
Adipose tissue stores fat, insulates against heat loss, keeps organs such as the kidney in position, fills spaces, gives the skin its contour and secretes leptin, which inhibits food intake and raises metabolic rate. It has no immune function.
Reticular CT is reticular cells and a fine reticular fibre network forming the stroma of lymph node, liver and spleen, stained brown-black by silver.
Mucoid CT is mainly fibroblasts in a soft jelly rich in mucus and hyaluronic acid, in the umbilical cord (Wharton's jelly), the vitreous humour and the dental pulp.
Regular white fibrous CT is tendon and cornea and withstands stretch in one direction; irregular is the reticular dermis, ligaments, sclera and organ capsules and withstands stretch in different directions.
Yellow elastic CT lies in large arteries such as the aorta, the trachea, bronchi and bronchioles, the vocal cords, the ligamentum flavum, the ligamentum nuchae and the suspensory ligament of the penis.
Loose areolar CT on a plate shows both fibre types in one open field — collagen in condensed acidophilic bundles and elastic fibres single, thin and zigzag — with fibroblast nuclei scattered between them and the matrix filling the areolae.
Reticular CT is demonstrated by silver and its fibres are brown, thin, and branching and anastomosing.
Yellow elastic CT is yellow in the fresh state, is stained brown by orcein, and its fibres are single, thin, zigzag and acidophilic.
Both white fibrous types are white in the fresh state, with thick acidophilic collagen bundles and fibroblast or fibrocyte nuclei among them; regular has them parallel and in rows, irregular has them running in every direction.
Mucoid CT is recognised by its ground substance filling the field, with only scattered fibroblasts and delicate fibres in it.
## lose_the_mark
Naming a dense or fibre-rich tissue as the commonest type. Loose areolar connective tissue is the commonest and the most widespread.
Giving the brain as a site of loose areolar connective tissue. It is the one stated exception.
Crediting white adipose tissue with thermogenesis. White fat insulates; brown fat generates heat.
Attributing the brown colour of brown fat to carotenoids. Carotenoids make white fat white; brown fat is brown from vascularity and cytochrome pigments together.
Listing antibody secretion or defence among the functions of adipose tissue. Antibody comes from the plasma cell.
Saying brown fat increases with age. It is abundant in the newborn, lost through childhood and replaced by white fat.
Refusing to count blood as connective tissue. Its matrix is plasma, and a fluid matrix is what makes it a specialised connective tissue.
Calling mesenchyme a specialised connective tissue. It is the embryonic connective tissue that all the others come from.
Answering loose areolar for the jelly rich in hyaluronic acid. That is mucoid connective tissue — umbilical cord, vitreous, dental pulp.
Putting tendon among the irregular dense tissues. Tendon and cornea are regular; dermis, ligaments, sclera and organ capsules are irregular.
Answering "connective tissue" to a stem that says be specific. Every plate on this leaf asks for the named type, and regular and irregular white fibrous carry different marks.
Giving white as the fresh colour of yellow elastic connective tissue. White is the fibrous types; the department asks the fresh colour on both plates so that the two are not answered alike.
Naming silver for the elastic plate or orcein for the reticular one. Orcein stains elastic fibres brown; silver stains reticular fibres brown; both answers are brown and the stains are not interchangeable.
Reading a pale field as loose areolar tissue. Loose areolar tissue has two fibre populations and many cells in it; in mucoid tissue the matrix is what fills the field.
## image_recommendations
### diagram · The classification chart of connective tissue — matrix consistency splitting proper from cartilage, bone and blood, then proper splitting into four loose and two dense types, with mesenchyme shown as the embryonic origin
Purpose: The book prints this chart on page 48 and the leaf is asked as a placement question — where does this named tissue sit. A tree carries placement; a paragraph carries an order of mention, which is a different thing.
Priority: required
Status: needed
Kind: diagram
Section: Definition
Source direction: purpose-drawn from the department book's page 48 chart, redrawn rather than reproduced
Rights: newly drawn for this product, or CC-BY
### comparison table · White versus brown adipose connective tissue — fat cell type, cause of colour, effect of diet and hormones, age distribution, sites and function
Purpose: The book prints this as a table on page 50, and every one of its six rows is separately examined. Prose forces the student to reassemble the columns before they can answer any single row.
Priority: required
Status: needed
Kind: comparison table
Section: Key determinants
Source direction: purpose-drawn from the department book's page 50 table, redrawn rather than reproduced
Rights: newly drawn for this product, or CC-BY
### histology · Unilocular and multilocular fat cells at the same magnification in one figure, the signet-ring appearance of the unilocular cell clearly visible
Purpose: One droplet against many is a visual difference that decides half the questions on this leaf, and the signet-ring description is a shape word that means nothing to a student who has not seen the shape.
Priority: required
Status: needed
Kind: histology
Section: Key determinants
Source direction: openly licensed histology teaching set or an institutional collection
Rights: must be CC-BY or public domain, no all-rights-reserved textbook figure
### histology · Loose areolar connective tissue spread or section showing scattered cells and collagen bundles in abundant ground substance, with the areolae visible as open spaces
Purpose: "Loose" is a description of texture, and texture is the one property prose consistently fails to convey. The book's own page 49 plate makes the areolae visible, which is what makes the word mean something.
Priority: strongly helpful
Status: needed
Kind: histology
Section: Key determinants
Source direction: openly licensed histology teaching set
Rights: must be CC-BY or public domain
### histology · Three dense connective tissues at one magnification — regular white fibrous, irregular white fibrous, and yellow elastic in orcein — so that thick parallel bundles, thick bundles in every direction, and thin single zigzag fibres are read against each other
Purpose: The department asks two visible characters of each on separate plates, and the characters are only meaningful comparatively: "thick" needs something thin beside it, and "regular" needs something irregular. Three panels at one magnification is the form the discrimination takes.
Priority: required
Status: needed
Kind: histology
Section: Key determinants
Source direction: openly licensed histology teaching set, or institutional slide scans
Rights: must be CC-BY or public domain, no all-rights-reserved textbook figure
Notes: Serves concepts CON-FND-B33D27A8517527 and CON-FND-7FB8290199B237.
### histology · Reticular connective tissue in a silver preparation from lymph node or spleen, the brown fibres thin and visibly branching and anastomosing into a network
Purpose: This tissue is invisible without the stain, so a routine section teaches nothing about it. Branching and anastomosing is a property of a network and cannot be judged from a single fibre.
Priority: required
Status: needed
Kind: histology
Section: Key determinants
Source direction: openly licensed histology teaching set
Rights: must be CC-BY or public domain
Notes: Serves concept CON-FND-49D5829AC3DCA1.
### histology · Mucoid connective tissue in transverse section of umbilical cord, Wharton's jelly filling the field with only scattered fibroblasts in it, beside loose areolar connective tissue at the same magnification
Purpose: The stated pitfall is reading a pale field as loose areolar tissue. Two pale fields side by side, one busy with fibres and cells and one almost empty, is the only way that comparison is made rather than asserted.
Priority: strongly helpful
Status: needed
Kind: histology
Section: Key determinants
Source direction: openly licensed histology teaching set
Rights: must be CC-BY or public domain
Notes: Serves concept CON-FND-4671C4D2911392. The department's own mucoid plate is a captioned teaching slide with no answer page.
### comparison table · Regular versus irregular white fibrous connective tissue and yellow elastic connective tissue — arrangement of fibres, position of fibroblasts, sites and direction of stretch withstood
Purpose: The examinable point is that the arrangement of the bundles is the function, and a table of arrangement against site against direction of stretch is what makes that connection visible rather than asserted.
Priority: strongly helpful
Status: needed
Kind: comparison table
Section: Key determinants
Source direction: purpose-drawn from the department book's page 51 table, redrawn rather than reproduced
Rights: newly drawn for this product, or CC-BY
## conflicts
[clear]
## evidence_gaps
The book gives no quantity for any of these tissues — no percentage of body weight for adipose tissue, no fat cell diameter, no figure for how much brown fat a newborn carries.
The book prints a rhetorical "Why?" beside the brown colour of the multilocular fat cell in its page 50 table rather than an answer, and the answer given here — richer vascularity plus mitochondrial cytochrome pigment — is taken from the same table's own colour row.
No age is given at which brown fat is lost, only "during childhood".
The book names thermogenin as the mitochondrial protein of brown fat but gives no mechanism for uncoupling.
Leptin is named with its two effects and no receptor, no site of action and no measured level.
The book does not say why loose areolar connective tissue limits the spread of infection; the statement is made and not explained.
No independent citation has been attached to any statement in this article. Everything is traceable to the department book only, which is a single source.
The department book does not name orcein. The stain and the brown colour it gives are taken from the practical book's own answer page for the elastic connective tissue plate, which is what the spot exam marks against; the book's fibres chapter is silent on it.
The practical book prints no marked question for mucoid connective tissue — only a captioned teaching plate — so what an examiner accepts as its visible character is not on record. The section appearance stated here follows from the book's own description of the tissue as fibroblasts in a large amount of jelly-like ground substance, and the contrast drawn with loose areolar tissue is the article's own reasoning from the two descriptions rather than a sentence either source prints.
## evidence_basis
Department Book Module 101, "Normal Structure of the Human Body (ISK - 101)", Faculty of Medicine, Cairo University, Part I Histology, chapter on Connective Tissue, section on Types of Connective Tissue Proper, printed pages 48-51, including the page 48 classification chart, the page 49 loose areolar table and reticular-versus-mucoid table, the page 50 white-versus-brown adipose table and the page 51 white fibrous versus yellow elastic table. The matrix-consistency classification that opens the Definition is the same book's Connective Tissue Cells chapter, printed pages 41-46. Extracted to scripts/kasr/extract/deptbook.json.
The department's practical book, "DPT Practical Histo 101" (src_b4cb8bf9f0c7a6584b4b), catalogued in scripts/kasr/extract/practical.json — the marked plates and facing answer pages for loose areolar connective tissue (p. 141), reticular connective tissue in silver (pp. 145, 157), elastic connective tissue in orcein (p. 159), regular white fibrous connective tissue (pp. 147, 161) and irregular white fibrous connective tissue (pp. 143, 163); and the captioned teaching plate for mucoid connective tissue (p. 137). Every marker, stain and accepted answer in "What the department's plates mark" is taken from those answer pages.
## field_notes
arabicTitle: Arabic histological terminology has not been reviewed for this module. It is filled at the evidence pass with a reviewer rather than guessed here.
media: No image exists in the repository, so every plate this article needs is written as an image recommendation rather than left as an unexplained blank.
practicalIdentification: The mucoid connective tissue paragraph is the one place in this article where the section appearance is reasoned from a description rather than quoted from an answer page. It is recorded in evidence_gaps.
relatedConcepts: All six concepts whose module subject path is 101 ISK > Histology > Connective Tissue > Types of Connective Tissue Proper are listed, copied from ../concept/101-ISK-mcq-concepts.md, and each is taught above — the proper-versus-specialised classification in Definition, loose areolar as the complete and commonest type in Mechanism and Key determinants, its sites and functions in Key determinants, the functions of adipose tissue including leptin in Key determinants and Clinical significance, white against brown fat in Key determinants, and mucoid connective tissue in Mechanism and Key determinants.
questionIds: Questions for this article are authored in the question pass, and the reciprocal link is written then.
subtopic: No SUB_ identifier has been assigned to this module in the canonical taxonomy, so the curriculum position is carried by module_subject instead.
microtopic: No microtopic level exists beneath this node.
nanotopic: No nanotopic level exists beneath this node.
reviewer: Not yet reviewed by faculty. The publication gate is needs_evidence for that reason.
beyondTheBook: The proper-versus-specialised classification and the naming of mesenchyme as the embryonic connective tissue come from the department book's connective tissue cells chapter rather than from this one, and the evidence basis says so. Nothing from outside the department book is asserted anywhere in this article.
## notes
Extended to close the practical gap on this leaf: five identification concepts sat here with no article claiming them. The article already carried each tissue's composition, sites and functions, but it had been written for a written paper and said almost nothing about what any of them looks like down a microscope. What was added is the fibre picture of each type — thick acidophilic bundles, single thin zigzag fibres, a thin branching brown network — the two stains the spot exam names, orcein and silver, and the department's own marker-by-marker answers. Mucoid connective tissue is the one type on this leaf the department does not set as a marked question, and the paragraph on it says so.

The department book teaches this leaf almost entirely as tables, one per page, and the question books test it almost entirely as single-cell recall from those tables. The article is therefore organised so that every table row is stated once as a sentence and once again in hold_these, which is where a student revising against a table will look.

---

# Item
## id
ART-101-HIS-GLANDULAR-EPITHELIUM
## title
Glandular epithelium
## subject
fnd
## status
Draft
## owner
Claude
## topic
Epithelial tissues
## language
en
## learner_stage
Year 1 foundation
## template_id
TPL-CONCEPT
## archetype
concept
## high_yield
Core
## time_sensitive
stable
## publication_gate
needs_evidence
## universities
kau
## years
Year 1
## module
101 ISK
## module_subject
101 ISK > Histology > Epithelial Tissues > Glandular Epithelium
## primary_node_id
DIS-HIS-T02
## secondary_node_ids
DIS-HIS-T03
## related_concepts
CON-FND-0A988681FF1ABF | CON-FND-D9E83D81037173 | CON-FND-30381062FF7E61 | CON-FND-677595D34287F6 | CON-FND-B22A5E7A56EC8F | CON-FND-BD4F040EFC8693
## related_articles
ART-101-HIS-MYO-EPITHELIUM: The cells that squeeze an exocrine acinus into its duct, and the reason a ductless gland has none.
ART-101-HIS-SURFACE-EPITHELIUM: The goblet cell sits within the pseudostratified columnar ciliated epithelium of the airway and the simple columnar epithelium of the intestine, both described there, and simple cubical epithelium lines the secretory acini.
ART-101-HIS-THE-CELL: Merocrine secretion is exocytosis, and the mechanism — a vesicle fusing with the plasma membrane without breaking its continuity — is set out there.
ART-101-HIS-NEURO-EPITHELIUM: The other special epithelium in the same short chapter of the book.
## aliases
Glands | Exocrine gland | Endocrine gland | Merocrine | Apocrine | Holocrine | Goblet cell
## reading_time
14
## summary
A gland is classified five times over, and each classification describes a different part of it. Duct present or absent decides exocrine against endocrine. Then, for an exocrine gland only: how many cells make the secretion, what the secretion is like, how much of the cell is lost in making it, whether the duct branches, and what shape the secretory part is. Almost every question on this leaf is answered by knowing which of those five questions a word like "simple", "branched" or "apocrine" is answering.
## sections
### Definition
Glandular epithelium is a type of epithelium modified to act as a gland and produce secretion. It is one of the four classes of epithelial tissue the book recognises, alongside surface epithelium, neuro-epithelium and myo-epithelium, and the two great classes of epithelium by function are covering and secretory.

The first division is made on the presence or absence of a duct, and it gives three classes.

An exocrine gland has two parts. Its secretory portion is the cells that make the secretion; its excretory portion is the ducts that carry the secretion outside the gland — to a surface, whether that surface is the skin, the gut lumen or the mouth.

An endocrine gland is ductless. It is groups of secretory cells with blood capillaries between them, and its hormone secretion is carried away by the blood, directly into the bloodstream, to different parts of the body.

A mixed gland has both: an exocrine part with a duct system and an endocrine part without one. The pancreas is the example.

### Mechanism
An exocrine gland is then classified in five further ways, and each answers a question about a different feature.

By number of cells a gland is unicellular, formed of a single cell, or multicellular, formed of more than one. The goblet cell is the unicellular gland: a single flask-shaped cell secreting mucus onto a free surface, scattered within the pseudostratified columnar ciliated epithelium of the respiratory tract and within the simple columnar epithelium of the intestine. It is exocrine because its secretion reaches a surface, and it needs no duct because it already sits on one.

By the nature of the secretion a gland is watery, serous — a watery secretion containing enzymes — or mucous. The parotid gland is purely serous. A gland containing both serous and mucous secretory cells is called mucoserous, or mixed in nature, which is a different sense of the word mixed from the exocrine-plus-endocrine one.

By mode of secretion a gland is merocrine, apocrine or holocrine, and the three form a ladder of how much of the cell is destroyed in the act. Merocrine secretion is discharged outside the cell by exocytosis with no change in the secretory cell at all; it is the most common mode. Apocrine secretion is released together with the apex of the cell, so part of the apical cytoplasm goes with it. Holocrine secretion accumulates inside the cell until the swollen cell ruptures, and the whole cell is lost with the secretion. None, apex, whole cell — that is the ladder, and every distractor in this leaf is one rung out of place.

By branching of the duct a gland is simple or compound. A simple gland has a single duct that does not branch; a compound gland has a duct that branches like a tree, with each branch carrying a secretory part. A simple gland whose secretory portion alone branches is called simple branched.

By the shape of the secretory part a gland is tubular, when the secretory unit is a tube; alveolar, or acinar, when it is rounded; or tubulo-alveolar, when the secretory part is flask-shaped.

### Key determinants
The single most useful habit on this leaf is to ask which structure a word is describing. Simple and compound describe the duct. Branched describes the secretory part. Tubular, alveolar and tubulo-alveolar describe the shape of the secretory part. So "simple branched tubular" says: the duct does not branch, the secretory portion does, and the secretory unit is a tube. It does not and cannot mean a branching duct, because simple has already settled that question.

Because every exocrine gland has both a duct and a secretory part, the book combines the two lists into a single classification of named forms: simple tubular, simple branched tubular, simple coiled tubular and compound tubular; simple alveolar, simple branched alveolar and compound alveolar; and simple, simple branched and compound tubulo-alveolar.

The named glands the question books place in those forms are these. The intestinal glands, the crypts, are simple tubular. The fundic glands of the stomach are simple branched tubular. The sweat gland is simple coiled tubular. The collecting system of the kidney is compound tubular. The sebaceous gland is simple branched alveolar. The salivary glands are compound tubulo-alveolar. The point to hold is that the answer is read off the architecture and not off the organ: the stomach and the intestine are neighbours and both have tubular glands, and the only thing separating them is that the fundic gland branches at its base and the intestinal crypt does not.

The modes of secretion carry their own set of named glands, and the same three appear every time: the salivary glands are merocrine, the lactating mammary gland is apocrine, and the sebaceous gland is holocrine.

Two words that both mean "mixed" have to be kept apart. A mixed gland proper has an exocrine part and an endocrine part — the pancreas. A mucoserous gland is mixed in the nature of its secretion, having both serous and mucous cells. A question offering "mixed" needs reading twice to see which sense it is using.

Finally, the presence of a duct decides more than where the secretion goes. Myo-epithelial cells exist to squeeze secretion into a duct, so they are found around exocrine acini — salivary, mammary and sweat glands — and not in a ductless gland such as the thyroid. And an endocrine gland cannot be classified by duct branching or by the shape of the secretory part at all, because it has neither.

### Normal values
Three classes of gland by presence of duct: exocrine, endocrine, mixed.

Five criteria for classifying exocrine glands: number of cells, nature of secretion, mode of secretion, branching of the duct, shape of the secretory part.

Three modes of secretion. Three shapes of secretory part. Ten named forms in the book's combined classification.

### Clinical significance
The two halves of the first classification map onto two different kinds of clinical problem, and the reason is the duct.

An exocrine gland can obstruct. Its secretion has to travel down a duct to a surface, so a blocked duct produces a retained secretion and a swollen gland — the clinical logic behind a blocked sebaceous gland, a salivary duct stone and a sweat duct occlusion. An endocrine gland has no duct to block; its failures are failures of the amount of hormone in the blood, and its target is any cell in the body carrying the right receptor.

The pancreas shows both in one organ. Its exocrine part drains enzymes down a duct into the duodenum and its endocrine part releases insulin into the blood, and disease of one part does not have to involve the other.

Mode of secretion also has a visible clinical consequence. The sebaceous gland is holocrine: it makes its secretion by destroying whole cells, so it must continuously replace them, and a gland working that way is doing something no merocrine gland has to do. The lactating mammary gland is apocrine, and the fat in milk is released with the apical cytoplasm of the cell that made it.

### Common misconceptions
The goblet cell is not a multicellular gland. The classification counts the cells that make the secretion, and there is exactly one, however many neighbours it has.

"Ductless" is not a minor descriptive detail. It decides where the secretion goes, whether the gland can be classified by duct branching at all, and whether it has myo-epithelial cells.

Simple branched does not mean a branching duct. Simple has settled the duct; branched can only be describing the secretory part.

Merocrine, apocrine and holocrine do not describe the secretion. They describe how much of the secretory cell is lost with it — none, the apex, or the whole cell.

The parotid is not a mucous or a mixed gland. It is purely serous, and serous means a watery secretion containing enzymes rather than simply a watery one.

An endocrine secretion does not travel down a duct to reach the blood. It is released directly into the bloodstream, which is exactly what having no duct means.

Myo-epithelial cells are not found in every gland. They belong to exocrine acini with ducts to squeeze into, and not to a ductless gland such as the thyroid.
## hold_these
Glandular epithelium is epithelium modified to act as a gland and produce secretion.
Glands are classified by the presence or absence of a duct into exocrine, endocrine and mixed; the pancreas is the mixed gland.
An exocrine gland has a secretory portion and ducts; an endocrine gland is ductless, with capillaries between the secretory cells, and releases its hormone directly into the blood.
Exocrine glands are classified five ways: number of cells, nature of secretion, mode of secretion, branching of the duct and shape of the secretory part.
The goblet cell is the unicellular exocrine gland — one flask-shaped mucous cell in the respiratory and intestinal epithelia.
By nature of secretion a gland is watery, serous (watery with enzymes) or mucous; the parotid is purely serous, and a gland with both cell types is mucoserous.
Merocrine secretion is by exocytosis with no change in the cell and is the most common mode; the salivary gland is the example.
Apocrine secretion is released with the apex of the cell; the lactating mammary gland is the example.
Holocrine secretion accumulates until the swollen cell ruptures and the whole cell is lost; the sebaceous gland is the example.
Simple means the duct does not branch; compound means the duct branches like a tree; branched describes the secretory part, not the duct.
Tubular means a tubular secretory unit, alveolar or acinar a rounded one, and tubulo-alveolar a flask-shaped one.
Intestinal glands are simple tubular, fundic glands simple branched tubular, sweat glands simple coiled tubular, the kidney collecting system compound tubular, the sebaceous gland simple branched alveolar and the salivary glands compound tubulo-alveolar.
Myo-epithelial cells surround exocrine acini — salivary, mammary and sweat — and are absent from ductless glands such as the thyroid.
## lose_the_mark
Calling the goblet cell multicellular. The classification counts the secreting cells, and there is one.
Reading "simple branched tubular" as a branching duct. Simple has already said the duct does not branch; branched describes the secretory part.
Confusing the two senses of mixed. A mixed gland has an exocrine and an endocrine part; a mucoserous gland is mixed in the nature of its secretion.
Placing the fundic gland and the intestinal crypt in the same form. The fundic gland is simple branched tubular and the intestinal crypt is simple tubular.
Giving the sebaceous gland as apocrine. It is holocrine; the lactating mammary gland is the apocrine one.
Naming apocrine as the commonest mode of secretion. Merocrine is the commonest.
Saying the parotid is a mixed or mucous gland. It is purely serous.
Describing an endocrine secretion as passing along a duct. Endocrine glands are ductless and release into the blood.
Putting myo-epithelial cells around the thyroid follicle. They belong to exocrine acini with ducts.
Reading merocrine, apocrine and holocrine as descriptions of what is secreted rather than of how much of the cell is lost.
## image_recommendations
### diagram · The book's combined classification of exocrine glands drawn as ten small figures — simple tubular, simple branched tubular, simple coiled tubular, compound tubular; simple alveolar, simple branched alveolar, compound alveolar; simple, simple branched and compound tubulo-alveolar — each with duct and secretory part distinguishable
Purpose: The whole classification is a shape vocabulary, and a shape vocabulary learnt from words is a list of words. The book itself teaches it as three rows of drawings on page 58 because the terms only separate visually.
Priority: required
Status: needed
Kind: diagram
Section: Key determinants
Source direction: purpose-drawn, following the department book's page 58 figures rather than reproducing them
Rights: newly drawn for this product, or CC-BY
### diagram · Merocrine, apocrine and holocrine secretion in three panels of the same cell — vesicle fusing with an intact apex; apex shed with the product; whole cell ruptured and lost
Purpose: The three modes form a ladder of how much of the cell is destroyed, and that is a quantity shown in a picture and merely asserted in a sentence. Every wrong option on this leaf is one rung along that ladder.
Priority: required
Status: needed
Kind: diagram
Section: Mechanism
Source direction: purpose-drawn for this product
Rights: newly drawn for this product, or CC-BY
### diagram · An exocrine acinus with its duct beside a ductless endocrine cluster with capillaries between the cells, myo-epithelial cells drawn on the exocrine acinus only
Purpose: One drawing carries three separately examined facts — where the secretion goes, why one gland can be classified by duct branching and the other cannot, and why myo-epithelial cells belong to one and not the other. Written out they are three unrelated sentences.
Priority: required
Status: needed
Kind: diagram
Section: Definition
Source direction: purpose-drawn for this product
Rights: newly drawn for this product, or CC-BY
Notes: The same drawing serves ART-101-HIS-MYO-EPITHELIUM, where the basal position of the myo-epithelial cell is the whole content.
### histology · Goblet cells in intestinal simple columnar epithelium, PAS or H&E, the flask shape and the apical mucus clearly visible
Purpose: The goblet cell is called flask-shaped and unicellular, and both are claims about appearance. Seen in a surface epithelium, it is also visibly a single cell among many, which is the fact students most often get wrong.
Priority: strongly helpful
Status: needed
Kind: histology
Section: Mechanism
Source direction: openly licensed histology teaching set or an institutional collection
Rights: must be CC-BY or public domain, no all-rights-reserved textbook figure
### histology · Sebaceous gland in skin at low power, showing cells swelling towards the centre and rupturing into the duct
Purpose: Holocrine secretion is a process ending in the destruction of the cell, and a single section of a sebaceous gland shows every stage of it at once. It is the clearest available demonstration that the mode of secretion is visible in the tissue.
Priority: strongly helpful
Status: needed
Kind: histology
Section: Clinical significance
Source direction: openly licensed histology teaching set
Rights: must be CC-BY or public domain
## conflicts
[clear]
## evidence_gaps
The book describes the three modes of secretion by their mechanism but gives no named gland example for any of them. The salivary, lactating mammary and sebaceous examples used here come from the question books and from the concepts drafted on them, not from the extracted text of pages 57-58.
The same is true of the combined classification. The book prints ten unlabelled diagrams on page 58 and does not attach an organ to any of them; the intestinal, fundic, sweat, kidney, sebaceous and salivary placements come from the question books.
The book states that exocrine glands are unicellular or multicellular but does not name the goblet cell as the unicellular example in this chapter. The goblet cell is described in the surface epithelium chapter as a mucous-secreting cell.
The book gives no structure for the duct system — no intercalated, striated or interlobular duct, and no lining epithelium for any duct.
No endocrine gland beyond the pancreas is named in this chapter, and no hormone is named.
No mechanism is given for how a serous cell differs from a mucous cell in appearance, and no serous demilune is described.
No independent citation has been attached to any statement in this article.
## evidence_basis
Department Book Module 101, "Normal Structure of the Human Body (ISK - 101)", Faculty of Medicine, Cairo University, Part I Histology, chapter on Epithelial Tissues, section on Glandular Epithelium, printed pages 57-58, including the three rows of gland diagrams on page 58. The goblet cell's sites are from the same book's Surface Epithelium chapter, printed pages 52-56, and the myo-epithelial statement from its Myo-epithelium section, printed page 59. Extracted to scripts/kasr/extract/deptbook.json.
## field_notes
arabicTitle: Arabic histological terminology has not been reviewed for this module. It is filled at the evidence pass with a reviewer rather than guessed here.
media: No image exists in the repository, so every plate this article needs is written as an image recommendation rather than left as an unexplained blank.
relatedConcepts: All six concepts whose module subject path is 101 ISK > Histology > Epithelial Tissues > Glandular Epithelium are listed, copied from ../concept/101-ISK-mcq-concepts.md, and each is taught above — the duct-presence classification in Definition, the three modes of secretion in Mechanism, the separate meanings of simple, compound, branched, tubular and alveolar in Mechanism and Key determinants, the named glands in the combined classification in Key determinants, the goblet cell as the unicellular gland in Mechanism, and the nature-of-secretion classification with the serous parotid in Mechanism and Key determinants.
questionIds: Questions for this article are authored in the question pass, and the reciprocal link is written then.
subtopic: No SUB_ identifier has been assigned to this module in the canonical taxonomy, so the curriculum position is carried by module_subject instead.
microtopic: No microtopic level exists beneath this node.
nanotopic: No nanotopic level exists beneath this node.
reviewer: Not yet reviewed by faculty. The publication gate is needs_evidence for that reason.
beyondTheBook: The named gland examples — salivary for merocrine, lactating mammary for apocrine, sebaceous for holocrine, and the six organs placed in the combined classification — are not in the extracted text of this chapter, which teaches the mechanisms and prints the diagrams unlabelled. They come from the departmental question books and are what the paper marks against, so they are taught here and their origin is named rather than presented as the book's own text. A faculty reviewer should confirm them against the printed figures before publication.
## notes
Sixty-eight questions are filed on this leaf in the extracted bank, more than on any other histology leaf in the module except the cytoplasm, and they cluster on three things: which structure a classification word describes, which mode of secretion a named gland uses, and where the myo-epithelial cell sits. The article is ordered to answer those three first.

---

# Item
## id
ART-101-HIS-NEURO-EPITHELIUM
## title
Neuro-epithelium
## subject
fnd
## status
Draft
## owner
Claude
## topic
Epithelial tissues
## language
en
## learner_stage
Year 1 foundation
## template_id
TPL-CONCEPT
## archetype
concept
## high_yield
Core
## time_sensitive
stable
## publication_gate
needs_evidence
## universities
kau
## years
Year 1
## module
101 ISK
## module_subject
101 ISK > Histology > Epithelial Tissues > Neuro Epithelium
## primary_node_id
DIS-HIS-T02
## secondary_node_ids
DIS-HIS-T03
## related_concepts
CON-FND-B6BD265FBD8B5F
## related_articles
ART-101-HIS-SURFACE-EPITHELIUM: The covering class of epithelium, against which the three special classes are defined.
ART-101-HIS-GLANDULAR-EPITHELIUM: The secretory class, taught in the same short chapter of the book.
ART-101-HIS-MYO-EPITHELIUM: The contractile class, and the other three-line section on the same printed page.
## aliases
Neuroepithelium | Sensory epithelium | Taste buds
## reading_time
4
## summary
Epithelium is classified by what it has been modified to do, and this is the class modified to feel. Its cells are sensory cells that act as receptors, and the book gives one example, the taste buds of the tongue. The whole examinable content is the definition and the fact that the prefix names the job, not the ancestry: this is epithelium doing a nervous system's work, not nerve tissue that has become epithelium.
## sections
### Definition
Neuro-epithelium is a special type of epithelial tissue. Its cells — the sensory cells — are modified to act as receptors and to receive the stimulus for some sensation.

It is one of the four classes of epithelium the book recognises. Surface epithelium covers and lines; glandular epithelium secretes; myo-epithelium contracts; neuro-epithelium receives sensation. The classification is by function throughout, and neuro-epithelium is the sensory member of it.

The most common example the book gives is the taste buds in the tongue, which receive the sensation of taste.

### Mechanism
The cell is an epithelial cell that has taken on a receptor function. It sits in an epithelial sheet like its neighbours, and it is modified so that a stimulus arriving at the free surface — a dissolved substance at the surface of the tongue — is converted into a signal the nervous system can carry away.

That is as far as the department book goes with the mechanism, and it is worth saying so plainly rather than filling the gap. No transduction step is described, no receptor molecule is named, no synapse with a sensory nerve fibre is drawn, and no supporting cell of the taste bud is described in this section. What the book teaches is a class of epithelium defined by a job.

### Key determinants
Two things settle every question filed on this leaf.

The first is the definition itself, and it has to be read in the right direction. Neuro-epithelium is epithelium modified for a sensory function. It is not nerve cells modified into epithelium, it is not a claim that nerve and epithelium share an origin, and it is not epithelium that develops from nerve. The prefix names what the cell does, not where it came from, and the three distractors just listed are the three the question books use.

The second is the example. The epithelium forming the taste bud is neuro-epithelium — not glandular epithelium, not simple epithelium, not stratified epithelium, not endothelium. When a stem gives the taste bud, the answer is this class; when a stem asks which class of epithelium is sensory, the answer is the same.

### Clinical significance
The clinical importance of this class is that a sensation can be lost at the receptor rather than along the nerve. If the sensory cells of the taste buds are damaged — and the surface of the tongue is exposed to heat, to chemicals, to infection and to the drying that follows a loss of saliva — the sensation fails although the nerve carrying it is intact.

The class also explains why sensation returns after some kinds of injury to a surface. Epithelium has a high power of regeneration, which the book states of epithelial tissue generally, and a receptor made of epithelial cells is in principle replaceable in a way a neuron is not.

The department book makes neither of these points. They are the reason the class matters clinically, and they are recorded in this article's field notes as reasoning from the book's own definitions rather than as taught content.

### Common misconceptions
Neuro-epithelium is not nerve tissue. The cell is an epithelial cell that has taken on a receptor function, and the "neuro-" describes the job.

It is not a statement about shared origin. The book does not say that nerve and epithelium have the same origin, and an option claiming that they do is wrong for that reason.

It is not epithelium that develops from nerve. Epithelium may be ectodermal, mesodermal or endodermal, and nothing in this section derives the sensory cell from a nerve.

The taste bud is not a gland. It receives a stimulus; it does not produce a secretion, and glandular epithelium is the class next to it in the same chapter.
## hold_these
Neuro-epithelium is a special type of epithelium whose cells, the sensory cells, are modified to act as receptors and receive the stimulus for a sensation.
The book's example is the taste buds of the tongue, which receive the sensation of taste.
It is one of four classes of epithelium: surface (covering and lining), glandular (secretory), neuro (sensory) and myo (contractile).
The prefix names the function of the cell, not its origin.
## lose_the_mark
Defining neuro-epithelium as nerve cells modified into epithelium. It is epithelium modified for a sensory function.
Claiming that nerve and epithelium are of the same origin, or that this epithelium develops from nerve. Neither is what the term means.
Answering "glandular epithelium" for the taste bud. The taste bud receives a stimulus; it does not secrete.
## image_recommendations
### histology · Taste bud in a section of tongue, medium to high power, the barrel-shaped bud set within the surrounding surface epithelium with its taste pore at the free surface
Purpose: The single fact this article carries is that a receptor can be built out of epithelial cells sitting in an ordinary epithelial sheet, and that is a relationship of one structure to its surroundings. The book prints an unlabelled taste bud for exactly this reason, and prose cannot show a cell being both epithelial and sensory at once.
Priority: required
Status: needed
Kind: histology
Section: Definition
Source direction: openly licensed histology teaching set or an institutional collection
Rights: must be CC-BY or public domain, no all-rights-reserved textbook figure
Notes: An unlabelled version is preferred so the same plate can carry a recognition question later. The department book's page 59 image is itself unlabelled.
## conflicts
[clear]
## evidence_gaps
This is one of the shortest sections in the department book — three bullet points and one unlabelled image on page 59 — and the article is short for that reason rather than by choice.
The book does not describe the structure of a taste bud: no taste pore, no gustatory cell, no supporting or sustentacular cell, no basal cell.
No other example of neuro-epithelium is given. The olfactory epithelium, the hair cells of the ear and the retina are not named in this section.
No mechanism of transduction is described, no receptor molecule named and no connection to a sensory nerve fibre described.
The book gives no site for neuro-epithelium beyond the tongue and no account of its embryological origin.
The clinical significance section of this article reasons from the book's own definitions rather than reporting stated clinical content; the book states none for this class.
No independent citation has been attached to any statement in this article.
## evidence_basis
Department Book Module 101, "Normal Structure of the Human Body (ISK - 101)", Faculty of Medicine, Cairo University, Part I Histology, chapter on Epithelial Tissues, section on Neuro-epithelium, printed page 59, three bullet points and one unlabelled figure. The four-class scheme of epithelium and the high regenerative power of epithelium are from the same chapter's Surface Epithelium section, printed pages 52-56. Extracted to scripts/kasr/extract/deptbook.json.
## field_notes
arabicTitle: Arabic histological terminology has not been reviewed for this module. It is filled at the evidence pass with a reviewer rather than guessed here.
media: No image exists in the repository, so the one plate this article needs is written as an image recommendation rather than left as an unexplained blank.
relatedConcepts: The one concept whose module subject path is 101 ISK > Histology > Epithelial Tissues > Neuro Epithelium is listed, copied from ../concept/101-ISK-mcq-concepts.md. It is taught in Definition and Key determinants, including its pitfall — that the prefix names the function and not the ancestry.
questionIds: The extracted question bank holds three questions on this leaf. They are authored in the question pass rather than here.
subtopic: No SUB_ identifier has been assigned to this module in the canonical taxonomy, so the curriculum position is carried by module_subject instead.
microtopic: No microtopic level exists beneath this node.
nanotopic: No nanotopic level exists beneath this node.
reviewer: Not yet reviewed by faculty. The publication gate is needs_evidence for that reason.
beyondTheBook: The two statements in Clinical significance — that a sensation can fail at the receptor with the nerve intact, and that an epithelial receptor is in principle replaceable where a neuron is not — are inferences from the book's own definition of neuro-epithelium and its own statement that epithelium has a high power of regeneration. The book itself gives no clinical content for this class. They are marked here so that a faculty reviewer can strike them if the inference is not one the department wants taught.
## notes
This leaf carries three questions in the extracted bank, and all three test the same definition from different directions: what the term means, what the taste bud is made of, and what the taste bud is an example of. The article is deliberately short. Padding it would not add a single mark and would bury the one distinction that is asked.

---

# Item
## id
ART-101-HIS-MYO-EPITHELIUM
## title
Myo-epithelium
## subject
fnd
## status
Draft
## owner
Claude
## topic
Epithelial tissues
## language
en
## learner_stage
Year 1 foundation
## template_id
TPL-CONCEPT
## archetype
concept
## high_yield
Core
## time_sensitive
stable
## publication_gate
needs_evidence
## universities
kau
## years
Year 1
## module
101 ISK
## module_subject
101 ISK > Histology > Epithelial Tissues > Myo Epithelium
## primary_node_id
DIS-HIS-T02
## secondary_node_ids
DIS-HIS-T03
## related_concepts
CON-FND-38ABCC4E4E4E68
## related_articles
ART-101-HIS-GLANDULAR-EPITHELIUM: The exocrine acini these cells wrap around, and why a ductless gland has none of them.
ART-101-HIS-NEURO-EPITHELIUM: The other special class of epithelium, on the same printed page of the book.
ART-101-HIS-MEMBRANOUS-SPECIALISATIONS: The basement membrane the myo-epithelial cell lies against is described there, with its basal lamina and reticular lamina.
## aliases
Myoepithelium | Myoepithelial cells | Basket cells
## reading_time
4
## summary
One cell, one position, one job. The myo-epithelial cell is epithelium modified to contract, it lies between the base of the secretory cells and their basement membrane, and when it contracts it squeezes the secretion out into the duct. The single question the papers ask is the position, and the standard wrong answer — between the apex of the cell and the basement membrane — is not merely wrong but geometrically impossible.
## sections
### Definition
Myo-epithelium is a special type of epithelium modified to contract. It is the contractile member of the book's four-class scheme of epithelial tissue, alongside surface epithelium which covers and lines, glandular epithelium which secretes, and neuro-epithelium which receives sensation.

Its cells lie between the base of the secretory cells and their basement membrane. They are found around the acini of the salivary glands, the mammary glands and the sweat glands.

### Mechanism
The position is the mechanism. A secretory cell sits on a basement membrane with its apex facing the lumen of the acinus. The myo-epithelial cell lies underneath it, wrapped between the secretory cell's base and that basement membrane. When the myo-epithelial cell contracts, it squeezes the secretory cells from below, and the secretion they hold is discharged into the ducts.

So the cell does not make the secretion and does not carry it. It moves it, and it does so by compressing the acinus against nothing more than its own position. This is the same logic as the milk ejection every mother's breast performs and the sweat that appears at the skin surface faster than it could be made.

Because the job is to squeeze secretion into a duct, the cell only makes sense where there is a duct. A ductless gland such as the thyroid has no myo-epithelial cells, and that follows from the mechanism rather than being a separate fact to learn.

### Key determinants
The examinable point is the position, and it is worth drawing rather than reciting. The basement membrane is basal by definition — it is what the epithelium sits on. The myo-epithelial cell lies between the base of the secretory cell and that membrane.

The standard distractor puts the myo-epithelial cell between the apex of the secretory cell and the basement membrane. Once the geometry is drawn, that option is self-contradictory: the apex faces the lumen and the basement membrane is at the other end of the cell, so nothing can lie between them without passing through the cell itself. A question of the "all of the following except" form on this leaf is almost always built on that one option.

The second determinant is the site list, and it has three entries: salivary glands, mammary glands and sweat glands. All three are exocrine, and all three have acini and ducts. A question offering an endocrine gland is testing the same idea from the other side.

### Clinical significance
The clinical face of this cell is milk ejection. The secretory cells of the lactating breast make milk, but milk reaches the nipple because the myo-epithelial cells around the alveoli contract and squeeze it into the duct system. A failure of that ejection is a failure of delivery, not a failure of production, and the two are clinically different problems in a breastfeeding mother.

The same mechanism operates in the sweat gland, where the secretion has to be moved along a coiled tubular duct to reach the skin surface, and in the salivary glands, where saliva has to be delivered into the mouth on demand.

The department book states none of this; it states the site list and the mechanism, and the clinical reading is set out here as an application of them and named as such in the field notes.

### Common misconceptions
The myo-epithelial cell does not lie at the apex of the secretory cell. It lies basally, between the base of the cell and the basement membrane, and no structure can lie between an apex and a basement membrane.

It is not a muscle cell. It is epithelium modified to contract, which is why it is classified among the epithelia rather than among the muscular tissues.

It does not secrete. It squeezes cells that do.

It is not found in every gland. It belongs to exocrine glands with acini and ducts — salivary, mammary, sweat — and not to a ductless gland such as the thyroid.
## hold_these
Myo-epithelium is a special type of epithelium modified to contract.
Myo-epithelial cells lie between the base of the secretory cells and their basement membrane — basally, never apically.
Their contraction squeezes the secretory cells so that the secretion is discharged into the ducts.
They are found around the acini of the salivary glands, the mammary glands and the sweat glands.
They belong to exocrine glands with ducts, and a ductless gland such as the thyroid has none.
## lose_the_mark
Placing the myo-epithelial cell between the apex of the secretory cell and the basement membrane. The basement membrane is basal, so nothing can lie between it and the apex.
Calling the myo-epithelial cell a muscle cell. It is epithelium modified to contract.
Giving it a secretory function. It squeezes; it does not secrete.
Relating myo-epithelial cells to endocrine glands. They belong to exocrine acini with ducts to squeeze into.
## image_recommendations
### diagram · A secretory acinus in section with one secretory cell shown in full — apex at the lumen, base on the basement membrane — and a myo-epithelial cell drawn in its correct position between that base and the membrane, its processes wrapping the acinus
Purpose: The entire examinable content of this leaf is one spatial relation, and the standard wrong answer is a second spatial relation that is impossible once drawn. A single labelled figure makes the distractor visibly absurd, which no sentence about basal position achieves.
Priority: required
Status: needed
Kind: diagram
Section: Key determinants
Source direction: purpose-drawn, following the department book's page 59 figure rather than reproducing it
Rights: newly drawn for this product, or CC-BY
Notes: The department book's own figure is unlabelled. The same drawing serves ART-101-HIS-GLANDULAR-EPITHELIUM, where the presence of myo-epithelial cells is one of the consequences of having a duct.
## conflicts
[clear]
## evidence_gaps
The department book gives this class four bullet points and one unlabelled figure on page 59, and the article is short for that reason rather than by choice.
The book does not describe the shape of the myo-epithelial cell, its processes, or the basket appearance the cell is named for elsewhere.
No contractile protein is named. Actin and myosin are not mentioned in this section, and no cytoskeletal content is claimed here.
The book gives no stimulus for contraction. Oxytocin is not named, and no nervous or hormonal control is described.
No electron-microscopic description is given.
The book numbers this section "VI - MYO-EPITHELIUM" although it is the fourth class of epithelium listed, which appears to be a typographic error for IV. The numbering is not used in this article.
The clinical significance section of this article applies the book's stated mechanism rather than reporting stated clinical content; the book states none for this class.
No independent citation has been attached to any statement in this article.
## evidence_basis
Department Book Module 101, "Normal Structure of the Human Body (ISK - 101)", Faculty of Medicine, Cairo University, Part I Histology, chapter on Epithelial Tissues, section on Myo-epithelium, printed page 59, four bullet points and one unlabelled figure. The four-class scheme of epithelium is from the same chapter's Surface Epithelium section, printed pages 52-56, and the exocrine-acinus context from its Glandular Epithelium section, printed pages 57-58. Extracted to scripts/kasr/extract/deptbook.json.
## field_notes
arabicTitle: Arabic histological terminology has not been reviewed for this module. It is filled at the evidence pass with a reviewer rather than guessed here.
media: No image exists in the repository, so the one plate this article needs is written as an image recommendation rather than left as an unexplained blank.
relatedConcepts: The one concept whose module subject path is 101 ISK > Histology > Epithelial Tissues > Myo Epithelium is listed, copied from ../concept/101-ISK-mcq-concepts.md. It is taught in Definition, Mechanism and Key determinants, including its pitfall — the apical position that the geometry rules out.
questionIds: The extracted question bank holds a single question on this leaf. It is authored in the question pass rather than here.
subtopic: No SUB_ identifier has been assigned to this module in the canonical taxonomy, so the curriculum position is carried by module_subject instead.
microtopic: No microtopic level exists beneath this node.
nanotopic: No nanotopic level exists beneath this node.
reviewer: Not yet reviewed by faculty. The publication gate is needs_evidence for that reason.
beyondTheBook: The milk-ejection reading in Clinical significance is an application of the book's own mechanism to the mammary gland, which the book itself names as a site. Oxytocin, the hormone that drives that contraction, is deliberately not named, because the book does not name it and nothing else in this module supplies it. A faculty reviewer should decide whether the clinical paragraph is taught or struck.
## notes
This leaf carries one question in the extracted bank, and that question is built on the apical-position distractor. The article is written to that: the position is stated four times in four different forms — definition, mechanism, decision rule and trap — because it is the only thing being examined and because stating it once has demonstrably not been enough.
