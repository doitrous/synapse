<!--
  Library articles for 101 ISK — Histology, Year 1, Kasr Al Ainy (kau).

  Twelve articles, completing the Histology half of the module: the six leaves
  of ../academic/101-isk-structure.md not covered by 101-ISK-histology.md, plus
  the six that were left for this pass.

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
No independent citation has been attached to any figure in this article. Every number is traceable to the department book only, which is a single source.
## evidence_basis
Department Book Module 101, "Normal Structure of the Human Body (ISK - 101)", Faculty of Medicine, Cairo University, Part I Histology, chapter III "Blood", section on Red Blood Corpuscles, printed pages 26-28, including the page 28 table "Adaptation of RBCs To Perform Their Functions". Extracted to scripts/kasr/extract/deptbook.json.
## field_notes
arabicTitle: Arabic histological terminology has not been reviewed for this module. It is filled at the evidence pass with a reviewer rather than guessed here.
media: No image exists in the repository, so every plate this article needs is written as an image recommendation.
relatedConcepts: No concept in ../concept/101-ISK-concepts.md or ../concept/101-ISK-mcq-concepts.md sits on this leaf yet. None is invented here, and none of the existing concepts is claimed as taught by this article when it is not.
questionIds: Questions for this article are authored in the question pass that follows, and the reciprocal link is written then.
subtopic: No SUB_ identifier has been assigned to this module in the canonical taxonomy, so the curriculum position is carried by module_subject instead.
microtopic: No microtopic level exists beneath this node.
nanotopic: No nanotopic level exists beneath this node.
reviewer: Not yet reviewed by faculty. The publication gate is needs_evidence for that reason.
beyondTheBook: The question books ask for the molecular cause of hereditary spherocytosis (a spectrin gene defect) and for an acid–base buffering function. Neither is in this chapter, and neither is taught here. Both are recorded as evidence gaps for a faculty reviewer to rule on.
## notes
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
