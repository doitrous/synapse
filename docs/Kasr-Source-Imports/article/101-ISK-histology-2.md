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
CON-FND-F4B7458F8B8265 | CON-FND-85CC08A33D0A88 | CON-FND-F2237ED98E88F3 | CON-FND-E66C68C0B80D16
## related_articles
ART-101-HIS-CYTOPLASMIC-ORGANELLES: The rest of the cytoplasm — mitochondria, endoplasmic reticulum, Golgi, lysosomes, ribosomes and cytoskeleton — is set out there, with the membranous against non-membranous division the plasma membrane belongs to.
ART-101-HIS-NUCLEUS: The cell's second basic component, described in full.
ART-101-HIS-RED-BLOOD-CORPUSCLES: The book's own worked example of this article — the coat that carries the blood groups and the inner cytoskeleton that keeps the biconcave shape are both red corpuscle facts.
ART-101-HIS-MICROSCOPES: Why the membrane is invisible by light microscopy is an arithmetical consequence of resolution, worked there.
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
## conflicts
Which membrane molecule has the stabilising effect. The department book states that cholesterol lies among the hydrophobic fatty acid tails, restricts the movement of the phospholipid molecules and so modulates membrane fluidity, and the concept CON-FND-85CC08A33D0A88 follows the book. One question in the extracted bank marks "phospholipids" as the answer to the stabilising-effect stem while another marks cholesterol for the same idea. This article follows the department book: cholesterol is the stabiliser. The question-book discrepancy is recorded rather than resolved silently, and it needs a faculty ruling before either item is published.
## evidence_gaps
The book does not name the fluid-mosaic model as such in this chapter, although it describes every element of it. The phrase is not used here.
The book does not say what proportion of membrane mass is lipid or carbohydrate; only the protein figure, about 50%, is given.
No mechanism is given for how a coated vesicle sheds its clathrin coat, and no fate is given for the vesicle after it forms.
The book names receptor-mediated endocytosis and clathrin but does not describe the receptor itself, its recycling, or what happens to the ligand.
The book gives no figure for the membrane's permeability, no list of what crosses it passively, and no account of active against passive transport in this chapter, although the question books ask about both.
The book does not explain why cell size varies from 4 µm to 150 µm, nor what limits it.
No independent citation has been attached to any figure in this article. Every number is traceable to the department book only, which is a single source.
## evidence_basis
Department Book Module 101, "Normal Structure of the Human Body (ISK - 101)", Faculty of Medicine, Cairo University, Part I Histology, chapter II "Cytology", introductory section on The Cell, printed page 7, and the plasma membrane section of the Cytoplasm chapter, printed pages 7-21, including the molecular structure of the cell membrane and the three types of endocytosis. Extracted to scripts/kasr/extract/deptbook.json.
## field_notes
arabicTitle: Arabic histological terminology has not been reviewed for this module. It is filled at the evidence pass with a reviewer rather than guessed here.
media: No image exists in the repository, so every plate this article needs is written as an image recommendation rather than left as an unexplained blank.
relatedConcepts: All four concepts whose module subject path is 101 ISK > Histology > Cytology > The cell are listed, copied from ../concept/101-ISK-mcq-concepts.md, and each is taught in the prose above — the unit membrane and its thickness in Definition, the molecular components in Mechanism, the cell coat in Mechanism and Clinical significance, and endocytosis and exocytosis in Mechanism.
questionIds: Questions for this article are authored in the question pass, and the reciprocal link is written then.
subtopic: No SUB_ identifier has been assigned to this module in the canonical taxonomy, so the curriculum position is carried by module_subject instead.
microtopic: No microtopic level exists beneath this node.
nanotopic: No nanotopic level exists beneath this node.
reviewer: Not yet reviewed by faculty. The publication gate is needs_evidence for that reason.
beyondTheBook: The IgE receptors of the mast cell and the basophil, named in Clinical significance, are taught in the blood and connective tissue chapters of the same book rather than in the cytology chapter. They are used here as an application of the cell coat's receptor function, and the cross-reference is stated rather than presented as this chapter's own content. Nothing from outside the department book is asserted anywhere in this article.
## notes
The department book splits this material between a one-page section called The Cell and the opening pages of the Cytoplasm chapter. The subject tree gives the leaf to The cell and the question bank files forty-six membrane questions there, so the membrane is taught here and the remaining organelles are left to ART-101-HIS-CYTOPLASMIC-ORGANELLES, which holds the Cytoplasm leaf. The two articles are written not to repeat each other.
