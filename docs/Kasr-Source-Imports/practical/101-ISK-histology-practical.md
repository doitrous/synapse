<!--
  101 ISK Histology practical (spot) items — one per distinct slide subject.

  Source: `scripts/kasr/extract/practical.json`, which catalogues 170 slides from
  the Histology Department's practical book `DPT Practical Histo 101 (1).pdf`
  (src_b4cb8bf9f0c7a6584b4b, 210 pp.) and the data-show revision deck
  `DPT 1- ISK 101 - Final Revision (1).pdf` (src_05a0b0c29acc94017b8f, 68 pp.).
  Those 170 slides are 64 distinct subjects: six plates of simple columnar
  epithelium are one item, not six. The catalogue's own findings key records that
  the revision deck is largely a re-print of the book's question/answer pairs, so
  the two are de-duplicated here rather than imported twice.

  How this faculty runs the spot exam, from the book itself. The book is four
  blocks — Cytology pp.1-73, Blood pp.74-115, Connective Tissue pp.116-164,
  Epithelium pp.165-210 — and each block runs titled teaching plates, then an
  explicit divider (p.32 "DATA SHOW MODEL EXAM", p.89 "BLOOD - Trial test",
  p.138 "Test"), then question/answer plate pairs on consecutive pages. The
  question page carries a micrograph marked with coloured arrows, stars,
  rectangles and circles; the facing page is the model answer. The stems are
  open-set — "Give 1 visible character", "Mention 2 visible characters",
  "Identify the tissue (be specific)" — and the marked answer accepts any valid
  feature. A stem almost always opens by asking what the preparation and the
  stain are before it asks about any marked structure.

  `lab_questions` needs options, which the real exam does not have. The four
  options per question are therefore written so that the three wrong ones are
  the confusions this faculty itself sets up: the pairs it prints on facing
  pages and the pairs Prof. Dalia El Marakby tabulates in her departmental
  handouts (Cytology src_0abbf6bc25c43a087d36, Blood src_450c71dc6273b2e64ca3,
  Connective tissue src_d56198df979fc164f6c6, Epithelium src_79ef34f0f9d8de85acae).
  No distractor is invented.

  MEDIA. The repository holds zero medical images — see
  `docs/Kasr-Source-Imports/media-requests/media-audit.md`. Every item here is
  unrunnable until a human sources its micrograph. That is recorded, not worked
  around: each `media_needed` block cross-references the written request in
  `docs/Kasr-Source-Imports/media-requests/practical-media-requests.md` by its
  exact heading. Nothing was generated, downloaded or saved.

  Concepts: `docs/Kasr-Source-Imports/concept/101-ISK-practical-concepts.md`
  (43 new identification concepts) and
  `docs/Kasr-Source-Imports/concept/101-ISK-concepts.md` (6 reused).
-->

# Item
## title
Plasma membrane of two adjacent cells (EM)
## subject
fnd
## type
Lab interpretation
## lab_subtype
Lab
## difficulty
Moderate
## learning_objective
Identify the plasma membrane on an electron micrograph, give one visible character of it, and name the intercellular space and the cytoplasm on either side.
## module_subject
101 ISK > Histology > Cytology > Cytoplasm
## main_concept
CON-FND-8BD70C3ED36B79
## lab_questions
### The structure in the red rectangle
Concept: CON-FND-8BD70C3ED36B79
Difficulty: Easy
Q: The red rectangle outlines the boundary between the two cells in the field. What structure has it outlined?
*= The plasma (cell) membrane of each of the two cells
Why: Why: the boundary between two cells is two plasma membranes lying parallel, which is what the rectangle encloses.
* The nuclear envelope
Why: Why: chosen by students who see two membranes with a space between them and reach for the envelope; the nuclear envelope's two membranes bound one compartment and are interrupted by pores, and it never has cytoplasm on both sides.
* A desmosome
Why: Why: chosen by students who expect a named junction wherever two membranes meet; a desmosome is a local plaque with filaments inserted into it, not a plain run of membrane.
* Rough endoplasmic reticulum
Why: Why: picked when the parallel dark lines are read as cisternae; rER lies inside one cell's cytoplasm and carries ribosomes, and it never separates two cells.
Explanation: The department's stem asks for the structure in the rectangle before it asks anything about the arrows: it is the apposed plasma membranes of two cells.
### One visible character of the membrane
Concept: CON-FND-8BD70C3ED36B79
Difficulty: Moderate
Q: Give one visible character of the structure in the rectangle.
*= Two dark layers separated by one pale layer — a trilaminar unit membrane
Why: Why: this is the character the answer page prints, and it is what the magnification of the plate is chosen to show.
* A single dense line
Why: Why: what a student honestly reports from a low-power view; at the magnification this plate uses the three layers are resolved, and the examiner is asking for that resolution.
* A fuzzy outer coat of glycocalyx
Why: Why: chosen by students reciting the membrane's full description; the glycocalyx is real but is usually not resolved here and is not the trilaminar character being asked for.
* Ribosomes studding its cytosolic surface
Why: Why: the character of rough endoplasmic reticulum, offered by students who have not separated the plasma membrane from the membranes inside the cell.
Explanation: Two dark and one pale layer — the unit membrane — is the answer the book's model page gives.
### Blue star and green arrow
Concept: CON-FND-8BD70C3ED36B79
Difficulty: Moderate
Q: The blue star marks the material inside one cell and the green arrow the gap between the two membranes. Name each.
*= Cytoplasm (blue star) and intercellular space (green arrow)
Why: Why: these are the two things the plate marks separately, and the answer page names them in these words.
* Cytoplasm and the pale middle layer of the unit membrane
Why: Why: the classic error — the pale layer lies inside one membrane, while the intercellular space lies between the membranes of two different cells.
* Nuclear sap and the perinuclear space
Why: Why: chosen by students who read the field as a nucleus; the perinuclear space lies between two membranes of one envelope, not between two cells.
* Matrix and cristae
Why: Why: the answer for a mitochondrion, given by students who name the organelle they revised most rather than the one on the plate.
Explanation: The intercellular space is between cells; the pale layer is within one membrane. The plate marks them with different arrows for exactly that reason.
## media_needed
### image · Cell membrane between two adjacent cells (EM)
Brief: Transmission EM of the apposed plasma membranes of two cells, resolving the trilaminar unit membrane, with the intercellular space and both cytoplasms in frame.
Purpose: The stem carries no text the answer could be read from; without the micrograph none of the three questions can be attempted.
Priority: required
Status: needed
Kind: histology
Section: station
Notes: Fulfils the existing request "### image · Cell membrane between two adjacent cells (EM)" in docs/Kasr-Source-Imports/media-requests/practical-media-requests.md — do not raise a second request. The repository holds no medical images at all (see media-requests/media-audit.md), so this item cannot run until a human supplies one.
## references
DPT Practical Histo 101 (src_b4cb8bf9f0c7a6584b4b), teaching plate p. 2; question plates pp. 33 and 35 with model answers on pp. 34 and 36.
DPT 1- ISK 101 - Final Revision (src_05a0b0c29acc94017b8f) p. 4, model answer p. 5.
Slide catalogue: scripts/kasr/extract/practical.json.
Terminology: Prof. Dalia El Marakby, Cytology handout (src_0abbf6bc25c43a087d36) p. 3.
---
# Item
## title
Mitochondria under the light microscope
## subject
fnd
## type
Lab interpretation
## lab_subtype
Lab
## difficulty
Moderate
## learning_objective
Identify mitochondria on a light micrograph, name a stain that demonstrates them and give one visible character.
## module_subject
101 ISK > Histology > Cytology > Cytoplasm
## main_concept
CON-FND-ED156BF8FBFD46
## lab_questions
### The organelle at the green arrow
Concept: CON-FND-ED156BF8FBFD46
Difficulty: Easy
Q: The green arrow points to granules and short rods scattered through the cytoplasm. What organelle are they?
*= Mitochondria
Why: Why: rods and granules through the cytoplasm, demonstrated by a special stain, are what the department's plate marks as mitochondria.
* Lysosomes
Why: Why: chosen because lysosomes are also small cytoplasmic bodies; they are not demonstrable by iron haematoxylin or Janus green and need a histochemical stain for their hydrolytic enzymes.
* Secretory granules
Why: Why: picked in a glandular cell, where granules are expected; secretory granules are apical and clustered, while mitochondria lie wherever the cell is working hardest.
* Ribosomes
Why: Why: offered because ribosomes are granular too; they are below the resolution of the light microscope and only show as diffuse cytoplasmic basophilia.
Explanation: Mitochondria are the granules and rods the department demonstrates with a specific stain.
### The stain that shows them
Concept: CON-FND-ED156BF8FBFD46
Difficulty: Moderate
Q: Name a stain that demonstrates this organelle under the light microscope.
*= Iron haematoxylin, which stains them dark blue, or Janus green, which stains them green
Why: Why: these are the two stains the book's answer page names for this plate.
* H&E
Why: Why: the default answer; abundant mitochondria only make the cytoplasm acidophilic in H&E, and no individual organelle is resolved.
* Silver impregnation
Why: Why: the right answer on the neighbouring Golgi plate, which is why students reach for it here; silver demonstrates the Golgi apparatus and reticular fibres, not mitochondria.
* Sudan III
Why: Why: chosen by students who remember it as a special stain; Sudan III stains fat, and the plate it belongs to is the inclusions plate.
Explanation: Naming the stain is part of the marked answer on this plate, not an optional extra.
## media_needed
### image · Mitochondria (LM)
Brief: Light micrograph of cells with abundant mitochondria shown as oval, rod-shaped or granular bodies, stained by iron haematoxylin or Janus green.
Purpose: The item asks the student to recognise mitochondria at light-microscope resolution and to name the stain that made them visible; neither is answerable from text.
Priority: required
Status: needed
Kind: histology
Section: station
Notes: Fulfils the existing request "### image · Mitochondria (LM)" in docs/Kasr-Source-Imports/media-requests/practical-media-requests.md. No image exists in the repository; the item is unrunnable until one is supplied.
## references
DPT Practical Histo 101 (src_b4cb8bf9f0c7a6584b4b), teaching plate p. 3; question plate p. 43 with model answer p. 44.
Slide catalogue: scripts/kasr/extract/practical.json.
Terminology: Prof. Dalia El Marakby, Cytology handout (src_0abbf6bc25c43a087d36) p. 6.
---
# Item
## title
Mitochondrion (EM)
## subject
fnd
## type
Lab interpretation
## lab_subtype
Lab
## difficulty
Moderate
## learning_objective
Identify a mitochondrion on an electron micrograph and name its cristae and its matrix when each is separately arrowed.
## module_subject
101 ISK > Histology > Cytology > Cytoplasm
## main_concept
CON-FND-E0B130AC5EC939
## lab_questions
### The organelle
Concept: CON-FND-E0B130AC5EC939
Difficulty: Easy
Q: An oval vesicle bounded by two membranes, the inner thrown into shelves, occupies the centre of the field. What is it?
*= A mitochondrion
Why: Why: a double-membraned oval body whose inner membrane forms cristae is the mitochondrion, and no other organelle has that arrangement.
* A secondary lysosome
Why: Why: chosen because both are membrane-bound bodies of moderate density; a lysosome has one membrane and heterogeneous contents, not regular internal shelves.
* A peroxisome
Why: Why: offered by students who know peroxisomes are also small round bodies of the metabolic machinery; peroxisomes are single-membraned and have no cristae.
* The nucleus
Why: Why: picked when the two membranes are read as the nuclear envelope; the envelope is interrupted by pores and encloses chromatin, not cristae.
Explanation: Two membranes plus cristae plus matrix is the mitochondrion, and the department expects the organelle named before its parts.
### Blue arrows and arrowhead
Concept: CON-FND-E0B130AC5EC939
Difficulty: Moderate
Q: The blue arrows point to the shelves inside the organelle and the arrowhead to the material between them. Name each.
*= Cristae (blue arrows) and matrix (arrowhead)
Why: Why: the cristae are the folds of the inner membrane and the matrix is what they project into; the answer page names them in these words.
* Cristae for both
Why: Why: the commonest slip — the student names what they revised and does not notice that two different things are marked on one organelle.
* Inner membrane (blue arrows) and intermembrane space (arrowhead)
Why: Why: chosen by students working from a biochemistry diagram; the department's answer page asks for cristae and matrix, which are the histological names for what is visible.
* Ribosomes (blue arrows) and cytoplasm (arrowhead)
Why: Why: picked when the plate is read as rough endoplasmic reticulum, which the book shows on the facing plates.
Explanation: Cristae are the folds; the matrix is the dense material they sit in. The plate arrows both because both are asked.
## media_needed
### image · Mitochondrion (EM)
Brief: Transmission EM of one or more mitochondria with double membrane, cristae and matrix separately resolvable, adjacent rER in the same field.
Purpose: The two questions ask the student to name structures the examiner has arrowed on a micrograph; there is no text the answers could be read off.
Priority: required
Status: needed
Kind: histology
Section: station
Notes: Fulfils the existing request "### image · Mitochondrion (EM)" in docs/Kasr-Source-Imports/media-requests/practical-media-requests.md. No image exists in the repository.
## references
DPT Practical Histo 101 (src_b4cb8bf9f0c7a6584b4b), teaching plates pp. 4 and 70; question plates pp. 37 and 39 with model answers pp. 38 and 40.
DPT 1- ISK 101 - Final Revision (src_05a0b0c29acc94017b8f) p. 6, model answer p. 7.
Slide catalogue: scripts/kasr/extract/practical.json.

---
# Item
## title
Golgi apparatus (EM)
## subject
fnd
## type
Lab interpretation
## lab_subtype
Lab
## difficulty
Moderate
## learning_objective
Identify the Golgi apparatus on an electron micrograph, give one visible character, and tell a transfer vesicle from a secretory vesicle by the face it lies on.
## module_subject
101 ISK > Histology > Cytology > Cytoplasm
## main_concept
CON-FND-89F4A730D095B7
## lab_questions
### The organelle and its nickname
Concept: CON-FND-89F4A730D095B7
Difficulty: Moderate
Q: A stack of short, smooth, parallel flattened saccules lies beside the nucleus, with small vesicles at one end and larger ones at the other. Name the organelle and the nickname the department gives it.
*= The Golgi apparatus — the secretory apparatus of the cell
Why: Why: a stack of smooth parallel saccules with vesicles at both faces is the Golgi, and the book's own answer page gives the nickname.
* Rough endoplasmic reticulum — the protein factory
Why: Why: chosen because both are stacks of parallel membranes; rER cisternae are long channels studded with ribosomes, while Golgi saccules are short, smooth and stacked.
* Smooth endoplasmic reticulum — the lipid factory
Why: Why: picked because neither carries ribosomes; sER is an irregular network of tubules and vesicles of differing size, not a regular stack.
* A stack of secondary lysosomes
Why: Why: offered by students who read the vesicles rather than the saccules; lysosomes are separate rounded bodies and are never stacked in parallel.
Explanation: Both halves are marked: the organelle and the nickname the department teaches with it.
### Red arrow and green arrow
Concept: CON-FND-89F4A730D095B7
Difficulty: Hard
Q: The red arrow points to small vesicles at one face of the stack and the green arrow to larger vesicles at the other. Name each.
*= Transfer vesicles (red arrow) at the entry face and secretory vesicles (green arrow) at the exit face
Why: Why: transfer vesicles arrive from the rER at the cis face; secretory vesicles bud from the trans face, and size follows that direction.
* Secretory vesicles (red arrow) and transfer vesicles (green arrow)
Why: Why: the two named correctly but the wrong way round, by a student who has learned the pair without learning which face each belongs to.
* Pinocytic vesicles and phagosomes
Why: Why: chosen by students who associate any vesicle with endocytosis; both of those form at the cell membrane, not at the Golgi.
* Primary lysosomes at both faces
Why: Why: picked because the Golgi does bud lysosomes; that is one product of the trans face and does not name the small vesicles arriving at the other.
Explanation: The face decides the name: small vesicles in at the cis face, larger ones out at the trans face.
## media_needed
### image · Golgi apparatus (EM)
Brief: Transmission EM of a Golgi complex: the stack of parallel flattened saccules with transfer vesicles at one face and secretory vesicles at the other.
Purpose: Both questions turn on which face a marked vesicle lies at, which only the micrograph can show.
Priority: required
Status: needed
Kind: histology
Section: station
Notes: Fulfils the existing request "### image · Golgi apparatus (EM)" in docs/Kasr-Source-Imports/media-requests/practical-media-requests.md. No image exists in the repository; the item cannot run until one is supplied.
## references
DPT Practical Histo 101 (src_b4cb8bf9f0c7a6584b4b), teaching plates pp. 6 and 72; question plates pp. 51 and 53 with model answers pp. 52 and 54.
DPT 1- ISK 101 - Final Revision (src_05a0b0c29acc94017b8f) p. 14, model answer p. 15.
Slide catalogue: scripts/kasr/extract/practical.json.
---
# Item
## title
Golgi apparatus in a nerve cell (silver)
## subject
fnd
## type
Lab interpretation
## lab_subtype
Lab
## difficulty
Moderate
## learning_objective
Identify the Golgi apparatus in a silver-stained nerve cell, name the stain and the colour, and state the organelle's position relative to the nucleus.
## module_subject
101 ISK > Histology > Cytology > Cytoplasm
## main_concept
CON-FND-F4DF782C697CCF
## lab_questions
### The stain and the colour
Concept: CON-FND-F4DF782C697CCF
Difficulty: Moderate
Q: The red arrow marks brown fine fibrils around the nucleus of a nerve cell. What stain produced them, and in what colour?
*= Silver impregnation, staining the Golgi apparatus brown
Why: Why: silver is the department's demonstration for the Golgi, and brown is the colour its answer page names.
* Orcein, staining elastic fibres brown
Why: Why: chosen because orcein also gives brown; orcein belongs to the connective-tissue block and stains no organelle.
* Janus green, staining mitochondria green
Why: Why: the right answer on the mitochondrial plate two pages earlier, given by a student who has not read which organelle is arrowed.
* H&E, in which the Golgi is basophilic
Why: Why: picked by students who assume every slide is H&E; in H&E the Golgi takes no stain at all, which is why the negative Golgi image exists.
Explanation: Stain and colour are both marked on this plate; the Golgi is a silver preparation and it is brown.
### Position of the organelle
Concept: CON-FND-F4DF782C697CCF
Difficulty: Hard
Q: Give one visible feature of the arrowed organelle and state its position in this cell.
*= Fine fibrils or granules, lying around the nucleus — perinuclear
Why: Why: in a nerve cell the Golgi forms a network encircling the central rounded nucleus, which is the position the answer page requires.
* Fine fibrils or granules, lying apical to the nucleus
Why: Why: correct for the secretory cell on the facing plate; the department sets the two together precisely because the position is what changes.
* Coarse basophilic clumps scattered through the cytoplasm
Why: Why: that describes Nissl's granules, the other thing a silver or basophilic nerve-cell plate shows.
* A pale unstained zone beside the nucleus
Why: Why: the negative Golgi image, which is what the Golgi looks like when it is not stained; here it has been stained and is brown.
Explanation: Perinuclear in the nerve cell, apical in the secretory cell — the pair is the whole teaching point.
## media_needed
### image · Golgi apparatus in a nerve cell (silver)
Brief: Silver-impregnated nerve cell with the Golgi apparatus as brown fibrils or granules in a perinuclear position, central rounded nucleus visible.
Purpose: The answer depends on the colour of the impregnation and on where the network sits relative to the nucleus; neither survives in words.
Priority: required
Status: needed
Kind: histology
Section: station
Notes: Fulfils the existing request "### image · Golgi apparatus in a nerve cell (silver)" in docs/Kasr-Source-Imports/media-requests/practical-media-requests.md. No image exists in the repository.
## references
DPT Practical Histo 101 (src_b4cb8bf9f0c7a6584b4b), teaching plate p. 7; question plate p. 47 with model answer p. 48.
DPT 1- ISK 101 - Final Revision (src_05a0b0c29acc94017b8f) p. 10, model answer p. 11.
Slide catalogue: scripts/kasr/extract/practical.json.
---
# Item
## title
Golgi apparatus in a secretory cell (silver)
## subject
fnd
## type
Lab interpretation
## lab_subtype
Lab
## difficulty
Moderate
## learning_objective
Identify the Golgi apparatus in a silver-stained secretory cell, state that its position is apical to the nucleus, and name the cell membrane when marked.
## module_subject
101 ISK > Histology > Cytology > Cytoplasm
## main_concept
CON-FND-F4DF782C697CCF
## lab_questions
### Position in a secretory cell
Concept: CON-FND-F4DF782C697CCF
Difficulty: Moderate
Q: Red arrows mark brown fibrils in a row of glandular cells. Give one visible feature of the organelle and its position.
*= Fine fibrils or granules, apical to the nucleus
Why: Why: in a secretory cell the Golgi lies between the nucleus and the apex, on the side the secretion travels towards; that is the answer the book prints.
* Fine fibrils or granules, perinuclear
Why: Why: the nerve-cell answer, given by students who learned one position for the organelle rather than one position per cell type.
* Coarse acidophilic granules at the base of the cell
Why: Why: describes zymogen or basal ergastoplasm; the arrowed structure is brown from silver and lies above the nucleus, not below it.
* A brown network in the connective tissue between the cells
Why: Why: reticular fibres, which silver also stains brown; the arrow is inside the epithelial cells, not in the stroma.
Explanation: Apical, not perinuclear. Position is the part of the answer that separates this plate from the nerve-cell plate.
### The green arrows
Concept: CON-FND-F4DF782C697CCF
Difficulty: Easy
Q: The green arrows point to the lines outlining each individual cell in the row. What are they?
*= The cell membranes
Why: Why: the boundaries between adjacent secretory cells are their plasma membranes, which the silver preparation outlines.
* The basement membrane
Why: Why: chosen because both are membranes named on epithelial plates; the basement membrane runs beneath the whole row, not between cells.
* Intercellular canaliculi
Why: Why: picked by students who expect a named lumen in a gland; the arrows are on the boundary itself, not on a space within it.
* Reticular fibres
Why: Why: silver stains those brown too, but they lie in the connective tissue supporting the gland, not between epithelial cells.
Explanation: The plate marks the cell membranes so that the position of the Golgi within each cell can be judged.
## media_needed
### image · Golgi apparatus in a secretory cell (silver)
Brief: Silver-impregnated glandular cells with the Golgi apical to the nucleus and the cell membranes outlining individual cells.
Purpose: The answer is a position within a cell whose boundaries must be visible; only the micrograph carries it.
Priority: required
Status: needed
Kind: histology
Section: station
Notes: Fulfils the existing request "### image · Golgi apparatus in a secretory cell (silver)" in docs/Kasr-Source-Imports/media-requests/practical-media-requests.md. No image exists in the repository.
## references
DPT Practical Histo 101 (src_b4cb8bf9f0c7a6584b4b), teaching plate p. 8; question plate p. 49 with model answer p. 50.
DPT 1- ISK 101 - Final Revision (src_05a0b0c29acc94017b8f) p. 12, model answer p. 13.
Slide catalogue: scripts/kasr/extract/practical.json.
---
# Item
## title
Negative Golgi image
## subject
fnd
## type
Lab interpretation
## lab_subtype
Lab
## difficulty
Hard
## learning_objective
Identify the negative Golgi image on a routinely stained secretory cell and explain why the Golgi appears as an absence of stain.
## module_subject
101 ISK > Histology > Cytology > Cytoplasm
## main_concept
CON-FND-0492C40A7F76E7
## concept_ids
CON-FND-B83D7EAAF68D3B
## lab_questions
### The pale zone beside the nucleus
Concept: CON-FND-0492C40A7F76E7
Difficulty: Hard
Q: A clear unstained area lies beside the eccentric nucleus of a cell whose remaining cytoplasm is deeply basophilic. What is it?
*= The negative Golgi image
Why: Why: the Golgi takes neither dye in a routine stain, so in a strongly basophilic cell it appears as a pale juxtanuclear hole — the department's negative Golgi image.
* A fat droplet dissolved during processing
Why: Why: chosen because dissolved fat also leaves a clear space; a fat vacuole is sharply round and may lie anywhere, while this zone is always beside the nucleus.
* A vacuole of autolysis
Why: Why: picked by students who read any clear space as artefact; the zone is a constant feature of this cell type, not damage.
* The nucleolus
Why: Why: offered because it is also juxtanuclear; the nucleolus is inside the nucleus and is deeply basophilic, the opposite of pale.
Explanation: The Golgi is unstained, and its outline is read from the basophilia surrounding it.
### Which cell carries it
Concept: CON-FND-B83D7EAAF68D3B
Difficulty: Moderate
Q: Which cell does the department use to demonstrate this appearance?
*= The plasma cell
Why: Why: its cytoplasm is deeply basophilic from abundant rER, so the unstained Golgi zone beside its eccentric cart-wheel nucleus stands out.
* The mast cell
Why: Why: the cell printed beside it on the same plate; the mast cell is basophilic too, but its basophilia is granular and its nucleus is pale, central and rounded.
* The macrophage
Why: Why: chosen because it is the other large connective-tissue cell; its cytoplasm is only faintly basophilic, so no negative image stands out in it.
* The neutrophil
Why: Why: picked by students who think of any cell with a busy cytoplasm; the neutrophil's granules take neither dye strongly and it has no prominent Golgi zone on a film.
Explanation: The plasma cell is the department's demonstration because its basophilia is what makes the absence visible.
## media_needed
### image · Negative Golgi image
Brief: Routinely stained plasma cell in which the Golgi zone appears as an unstained pale area beside the eccentric nucleus.
Purpose: The whole identification is a shape made of absent colour, which cannot be conveyed except by the slide.
Priority: required
Status: needed
Kind: histology
Section: station
Notes: Fulfils the existing request "### image · Negative Golgi image" in docs/Kasr-Source-Imports/media-requests/practical-media-requests.md. No image exists in the repository.
## references
DPT Practical Histo 101 (src_b4cb8bf9f0c7a6584b4b), teaching plate p. 9; question plate p. 151 with model answer p. 152.
DPT 1- ISK 101 - Final Revision (src_05a0b0c29acc94017b8f) p. 42, model answer p. 43.
Slide catalogue: scripts/kasr/extract/practical.json.
---
# Item
## title
Rough endoplasmic reticulum (EM)
## subject
fnd
## type
Lab interpretation
## lab_subtype
Lab
## difficulty
Moderate
## learning_objective
Identify rough endoplasmic reticulum on an electron micrograph, give one visible character and state its function.
## module_subject
101 ISK > Histology > Cytology > Cytoplasm
## main_concept
CON-FND-08378767774524
## lab_questions
### The arrowed granules
Concept: CON-FND-08378767774524
Difficulty: Moderate
Q: Arrows point to dense granules studding the outer surface of long parallel flattened cisternae. What are the granules, and what is their main function?
*= Ribosomes; protein synthesis
Why: Why: the answer page names the arrowed granules as ribosomes and gives protein synthesis as the function.
* The rough endoplasmic reticulum; protein synthesis
Why: Why: the right organelle for the wrong arrow — the plate arrows the granules, and the cisternae they sit on are asked separately.
* Glycogen rosettes; energy storage
Why: Why: chosen because glycogen also appears as dense granules on EM; glycogen lies free in the cytosol and never lines a membrane.
* Secretory granules; storage of the finished product
Why: Why: picked by students who expect granules in a secretory cell to be product; secretory granules are membrane-bound bodies, not particles on a membrane's surface.
Explanation: The granules on the membrane are ribosomes; naming the organelle instead answers a different question on the same plate.
### One visible character
Concept: CON-FND-08378767774524
Difficulty: Moderate
Q: Give one visible character of the organelle the yellow arrows mark.
*= Parallel flattened tubules covered by ribosomes
Why: Why: this is the character the book's answer page prints for rER.
* A smooth surface with vesicles of different size and shape
Why: Why: the character of smooth ER, which the book shows on the neighbouring plate; students who have learned one description use it for both.
* A stack of short saccules with vesicles at each end
Why: Why: the Golgi apparatus; chosen when parallel membranes are read as a stack rather than as long channels.
* A double membrane with shelf-like folds
Why: Why: the mitochondrion, offered by students who have not separated the two double-membraned things on these plates.
Explanation: Long, regular, parallel and ribosome-studded — that combination is only rER.
## media_needed
### image · Rough endoplasmic reticulum (EM)
Brief: Transmission EM of rER as parallel regular flattened cisternae with ribosomes resolved as dense granules on the cytosolic face.
Purpose: The item asks the student to separate the arrowed granules from the membrane they sit on, which requires the micrograph.
Priority: required
Status: needed
Kind: histology
Section: station
Notes: Fulfils the existing request "### image · Rough endoplasmic reticulum (EM)" in docs/Kasr-Source-Imports/media-requests/practical-media-requests.md. No image exists in the repository.
## references
DPT Practical Histo 101 (src_b4cb8bf9f0c7a6584b4b), teaching plates pp. 10 and 71; question plates pp. 39 and 41 with model answers pp. 40 and 42.
Slide catalogue: scripts/kasr/extract/practical.json.
Terminology: Prof. Dalia El Marakby, Cytology handout (src_0abbf6bc25c43a087d36) pp. 7 and 10.
---
# Item
## title
Smooth endoplasmic reticulum (EM)
## subject
fnd
## type
Lab interpretation
## lab_subtype
Lab
## difficulty
Moderate
## learning_objective
Identify smooth endoplasmic reticulum on an electron micrograph and give one visible feature the model answer accepts.
## module_subject
101 ISK > Histology > Cytology > Cytoplasm
## main_concept
CON-FND-369A1D27DFE0DD
## lab_questions
### The organelle at the yellow arrow
Concept: CON-FND-369A1D27DFE0DD
Difficulty: Moderate
Q: The yellow arrow marks an anastomosing system of tubules and vesicles of differing size whose surface carries no granules. Name the organelle.
*= Smooth endoplasmic reticulum
Why: Why: a ribosome-free membrane system of irregular tubules and vesicles is sER, and that is what the plate marks.
* Rough endoplasmic reticulum cut tangentially
Why: Why: an intelligent objection — a tangential cut can hide the regularity, but not the ribosomes, and there are none here.
* The Golgi apparatus
Why: Why: chosen because the Golgi is also smooth; the Golgi is a regular stack of parallel saccules, not an irregular network.
* Pinocytic vesicles
Why: Why: picked because of the vesicles; pinocytic vesicles form at the cell membrane and are uniform, not a continuous anastomosing system.
Explanation: Absence of ribosomes plus irregular calibre is the identification.
### One visible feature
Concept: CON-FND-369A1D27DFE0DD
Difficulty: Easy
Q: Mention one visible feature of this organelle.
*= No ribosomes on its surface
Why: Why: one of the three features the book's answer page lists — smooth surface, no ribosomes, vesicles of different size and shape.
* Ribosomes attached by their large subunits
Why: Why: the feature of rER, chosen by students who have learned the ER as one organelle rather than two.
* Cristae projecting into a dense matrix
Why: Why: the mitochondrion, which the book prints on the adjoining plate with sER in the same field.
* A limiting membrane enclosing heterogeneous debris
Why: Why: a secondary lysosome, offered when the irregular profiles are read as contents rather than as channels.
Explanation: The department accepts any of its three listed characters; the absence of ribosomes is the safest of them.
## media_needed
### image · Smooth endoplasmic reticulum (EM)
Brief: Transmission EM of sER as anastomosing ribosome-free tubules and vesicles of differing size and shape.
Purpose: The identification rests on the absence of a feature, which can only be judged from the image.
Priority: required
Status: needed
Kind: histology
Section: station
Notes: Fulfils the existing request "### image · Smooth endoplasmic reticulum (EM)" in docs/Kasr-Source-Imports/media-requests/practical-media-requests.md. No image exists in the repository.
## references
DPT Practical Histo 101 (src_b4cb8bf9f0c7a6584b4b), teaching plate p. 11; question plate p. 45 with model answer p. 46.
DPT 1- ISK 101 - Final Revision (src_05a0b0c29acc94017b8f) p. 8, model answer p. 9.
Slide catalogue: scripts/kasr/extract/practical.json.

---
# Item
## title
Smooth ER with a mitochondrion (EM)
## subject
fnd
## type
Lab interpretation
## lab_subtype
Lab
## difficulty
Moderate
## learning_objective
Identify smooth endoplasmic reticulum and a mitochondrion in the same field and give the character that separates them.
## module_subject
101 ISK > Histology > Cytology > Cytoplasm
## main_concept
CON-FND-369A1D27DFE0DD
## concept_ids
CON-FND-E0B130AC5EC939
## lab_questions
### Two organelles in one field
Concept: CON-FND-369A1D27DFE0DD
Also: CON-FND-E0B130AC5EC939
Difficulty: Moderate
Q: The field contains a network of smooth-surfaced tubules and one oval body bounded by two membranes with internal shelves. Name them in that order.
*= Smooth endoplasmic reticulum and a mitochondrion
Why: Why: the ribosome-free network is sER and the double-membraned body with cristae is the mitochondrion; the department prints them together because they sit together where lipid is handled.
* Rough endoplasmic reticulum and a mitochondrion
Why: Why: chosen by students who assume any ER beside a mitochondrion is rough, as on the earlier plate; the surface here carries no ribosomes.
* Golgi apparatus and a secondary lysosome
Why: Why: picked when the tubular network is read as a stack and the dense body as debris; neither has cristae or a double membrane.
* Smooth endoplasmic reticulum and a peroxisome
Why: Why: a defensible attempt — peroxisomes do bud from ER — but a peroxisome has one membrane and no cristae.
Explanation: Two organelles, two separate identifications; the surface decides the first and the double membrane with cristae decides the second.
### Why they lie together
Concept: CON-FND-369A1D27DFE0DD
Difficulty: Hard
Q: Why does the department show these two organelles on one plate?
*= Fat is concentrated where smooth ER is abundant, and the mitochondria supplying the energy lie among it
Why: Why: the handout places fat in the areas of cytoplasm rich in sER, and mitochondria sit where the cell is working.
* Because smooth ER buds from the mitochondrial outer membrane
Why: Why: a plausible-sounding invention; smooth ER is continuous with rough ER and with the nuclear envelope, never with a mitochondrion.
* Because mitochondria supply the ribosomes that smooth ER lacks
Why: Why: chosen by students trying to connect the two facts they remember; ribosomes come from the nucleolus, and smooth ER has none by definition.
* Because both are demonstrated by Janus green
Why: Why: Janus green stains mitochondria only, and it is a light-microscope stain that has no bearing on an electron micrograph.
Explanation: The plate is a functional pairing, not an accident of sectioning.
## media_needed
### image · Smooth ER with mitochondrion (EM)
Brief: Transmission EM with smooth ER tubules and at least one mitochondrion in the same field, cristae resolved.
Purpose: The item asks the student to make two identifications in one field and to say why the two lie together; both need the field itself.
Priority: required
Status: needed
Kind: histology
Section: station
Notes: Fulfils the existing request "### image · Smooth ER with mitochondrion (EM)" in docs/Kasr-Source-Imports/media-requests/practical-media-requests.md. No image exists in the repository.
## references
DPT Practical Histo 101 (src_b4cb8bf9f0c7a6584b4b), teaching plate p. 12.
Slide catalogue: scripts/kasr/extract/practical.json.
Terminology: Prof. Dalia El Marakby, Cytology handout (src_0abbf6bc25c43a087d36) pp. 6, 7 and 15.
---
# Item
## title
Smooth and rough ER in one field (EM)
## subject
fnd
## type
Lab interpretation
## lab_subtype
Lab
## difficulty
Hard
## learning_objective
On a micrograph carrying both systems, say which profile is rough and which is smooth and give the character that decides each.
## module_subject
101 ISK > Histology > Cytology > Cytoplasm
## main_concept
CON-FND-82768007A697F1
## concept_ids
CON-FND-08378767774524 | CON-FND-369A1D27DFE0DD
## lab_questions
### Which is which
Concept: CON-FND-82768007A697F1
Difficulty: Hard
Q: Two membrane systems are continuous with each other in this field. What single feature decides which is rough and which is smooth?
*= The presence or absence of ribosomes on the cytosolic surface
Why: Why: the two systems are continuous, so nothing about position separates them; only the surface does.
* Whether the profiles are flattened or vesicular
Why: Why: the intuitive answer, and the reason the plate exists — a tangentially cut rER cisterna looks vesicular and a distended sER tubule looks flat.
* Which system lies nearer the nucleus
Why: Why: chosen because rER is continuous with the nuclear envelope; proximity is a tendency, not a rule, and the plate is a single field.
* Which system stains more densely
Why: Why: picked by students importing light-microscope thinking; electron density here reflects contrast agents and section thickness, not the identity of the system.
Explanation: Surface, not shape. The continuity of the two systems is the point of the plate.
### What abundance of each does to the cytoplasm
Concept: CON-FND-82768007A697F1
Difficulty: Moderate
Q: Under the light microscope, what does an abundance of each system do to the staining of the cytoplasm?
*= Abundant rough ER makes it basophilic; abundant smooth ER makes it acidophilic
Why: Why: the departmental handout states both, and this is the link between the electron micrograph and the slides the student will meet.
* Both make it basophilic
Why: Why: chosen because both are ER; the basophilia comes from the ribosomal RNA, which only the rough system carries.
* Abundant rough ER makes it acidophilic; abundant smooth ER makes it basophilic
Why: Why: the pair learned the wrong way round, which shows up whenever a student is asked to explain a plasma cell's colour.
* Neither affects the staining of the cytoplasm
Why: Why: picked by students who treat ultrastructure and light microscopy as unrelated; the whole reason these plates precede the tissue blocks is that they are not.
Explanation: Ribosomal RNA is what makes cytoplasm basophilic, so only the rough system does it.
## media_needed
### image · Smooth and rough ER together (EM)
Brief: Transmission EM showing rough and smooth ER continuous in one field, with ribosomes resolved on the rough portion only.
Purpose: The question is which of two continuous systems is which; it is unanswerable without seeing the continuity.
Priority: required
Status: needed
Kind: histology
Section: station
Notes: Fulfils the existing request "### image · Smooth and rough ER together (EM)" in docs/Kasr-Source-Imports/media-requests/practical-media-requests.md. No image exists in the repository.
## references
DPT Practical Histo 101 (src_b4cb8bf9f0c7a6584b4b), teaching plate p. 13.
Slide catalogue: scripts/kasr/extract/practical.json.
Terminology: Prof. Dalia El Marakby, Cytology handout (src_0abbf6bc25c43a087d36) p. 7.
---
# Item
## title
Primary lysosome (EM)
## subject
fnd
## type
Lab interpretation
## lab_subtype
Lab
## difficulty
Moderate
## learning_objective
Identify a primary lysosome on an electron micrograph and say what makes it primary rather than secondary.
## module_subject
101 ISK > Histology > Cytology > Cytoplasm
## main_concept
CON-FND-42CCE864C55A08
## lab_questions
### Primary or secondary
Concept: CON-FND-42CCE864C55A08
Difficulty: Moderate
Q: A membrane-bound body of uniform, moderate electron density lies near the Golgi. Is it a primary or a secondary lysosome, and why?
*= Primary — its contents are homogeneous, so it has not yet fused with anything
Why: Why: a newly released lysosome carries only its enzymes, and the department defines primary by that homogeneity.
* Secondary — any lysosome near the Golgi has already been used
Why: Why: the reasoning is backwards: proximity to the Golgi is where lysosomes are made, which is what makes this one new.
* Primary — because it is small
Why: Why: size is a tendency, not the criterion; a small heterogeneous body is still secondary.
* Secondary — because it is membrane-bound
Why: Why: chosen by students who half-remember that secondary lysosomes are vesicles; every lysosome is membrane-bound.
Explanation: Homogeneous contents means nothing has been taken in yet.
### Where it came from
Concept: CON-FND-42CCE864C55A08
Difficulty: Easy
Q: Where in the cell is this body formed?
*= Its enzymes are made in the rough ER and released from the Golgi apparatus as a vesicle
Why: Why: this is the route the departmental handout gives, and it is why the plate places the body beside a Golgi stack.
* It buds from the smooth ER, like a peroxisome
Why: Why: correct for peroxisomes, which the handout does describe as budding from ER; lysosomes come from the Golgi.
* It forms at the cell membrane by pinocytosis
Why: Why: that route makes a pinocytic vesicle, which becomes a multivesicular body only after it fuses with a lysosome.
* It divides from an existing lysosome
Why: Why: chosen by students carrying over mitochondrial division; lysosomes are not self-replicating.
Explanation: rER makes the enzymes, the Golgi packages them, and the vesicle released is the primary lysosome.
## media_needed
### image · Primary lysosome (EM)
Brief: Transmission EM of a newly formed lysosome as a membrane-bound body of homogeneous moderate density, ideally with a Golgi stack in the same field.
Purpose: Primary and secondary are told apart by the uniformity of the contents, which is an image judgement.
Priority: required
Status: needed
Kind: histology
Section: station
Notes: Fulfils the existing request "### image · Primary lysosome (EM)" in docs/Kasr-Source-Imports/media-requests/practical-media-requests.md. No image exists in the repository.
## references
DPT Practical Histo 101 (src_b4cb8bf9f0c7a6584b4b), teaching plate p. 14.
Slide catalogue: scripts/kasr/extract/practical.json.
Terminology: Prof. Dalia El Marakby, Cytology handout (src_0abbf6bc25c43a087d36) p. 9.
---
# Item
## title
Multivesicular body (EM)
## subject
fnd
## type
Lab interpretation
## lab_subtype
Lab
## difficulty
Hard
## learning_objective
Identify a multivesicular body as a secondary lysosome and name what it has fused with.
## module_subject
101 ISK > Histology > Cytology > Cytoplasm
## main_concept
CON-FND-42CCE864C55A08
## lab_questions
### The body containing small vesicles
Concept: CON-FND-42CCE864C55A08
Difficulty: Hard
Q: A membrane-bound body contains a cluster of small vesicles. Name it and say what it has fused with.
*= A multivesicular body — a secondary lysosome that has fused with pinocytic vesicles
Why: Why: the handout names the multivesicular body as the secondary lysosome whose substrate arrived by pinocytosis.
* A heterolysosome that has fused with solid ingested particles
Why: Why: the neighbouring plate; a heterolysosome (phagolysosome) contains recognisable solid material, not a set of small vesicles.
* An autolysosome that has fused with a damaged organelle
Why: Why: the third of the three; an autolysosome contains the remains of the cell's own organelles, classically a mitochondrion.
* A residual body of indigestible material
Why: Why: a residual body is what is left when digestion has finished; its contents are dense and amorphous, not vesicular.
Explanation: The three secondary lysosomes are named by what they swallowed: vesicles, solid particles, or the cell's own organelles.
## media_needed
### image · Secondary lysosome - multivesicular body (EM)
Brief: Transmission EM of a multivesicular body: a membrane-bound secondary lysosome containing a cluster of small internal vesicles.
Purpose: The identification is made from the character of the contents, which no text can substitute for.
Priority: required
Status: needed
Kind: histology
Section: station
Notes: Fulfils the existing request "### image · Secondary lysosome - multivesicular body (EM)" in docs/Kasr-Source-Imports/media-requests/practical-media-requests.md. No image exists in the repository.
## references
DPT Practical Histo 101 (src_b4cb8bf9f0c7a6584b4b), teaching plate p. 15.
Slide catalogue: scripts/kasr/extract/practical.json.
Terminology: Prof. Dalia El Marakby, Cytology handout (src_0abbf6bc25c43a087d36) p. 9.
---
# Item
## title
Heterolysosome (EM)
## subject
fnd
## type
Lab interpretation
## lab_subtype
Lab
## difficulty
Hard
## learning_objective
Identify a heterolysosome and say what distinguishes it from the cell's other secondary lysosomes.
## module_subject
101 ISK > Histology > Cytology > Cytoplasm
## main_concept
CON-FND-42CCE864C55A08
## lab_questions
### Contents of the arrowed body
Concept: CON-FND-42CCE864C55A08
Difficulty: Hard
Q: A large membrane-bound body holds material of mixed density that came from outside the cell. What is it?
*= A heterolysosome — a phagolysosome, a secondary lysosome holding phagocytosed material
Why: Why: hetero- names the origin of the contents: material taken in from outside, which is what phagocytosis brings.
* An autolysosome
Why: Why: the mirror image and the commonest confusion; auto- means the cell's own organelles, and the name turns entirely on where the contents came from.
* A primary lysosome
Why: Why: chosen by students who see one membrane and stop; a primary lysosome's contents are homogeneous because nothing has been taken in.
* A peroxisome
Why: Why: peroxisomes are small, uniform and enzymatic; they neither engulf nor accumulate mixed debris.
Explanation: Hetero- and auto- are the same structure named by the source of what is inside it.
## media_needed
### image · Heterolysosome (EM)
Brief: Transmission EM of a heterolysosome (phagolysosome) holding heterogeneous phagocytosed material within a single limiting membrane.
Purpose: Only the appearance of the contents distinguishes it from the other secondary lysosomes on the neighbouring plates.
Priority: required
Status: needed
Kind: histology
Section: station
Notes: Fulfils the existing request "### image · Heterolysosome (EM)" in docs/Kasr-Source-Imports/media-requests/practical-media-requests.md. No image exists in the repository.
## references
DPT Practical Histo 101 (src_b4cb8bf9f0c7a6584b4b), teaching plate p. 16.
Slide catalogue: scripts/kasr/extract/practical.json.
Terminology: Prof. Dalia El Marakby, Cytology handout (src_0abbf6bc25c43a087d36) p. 9.
---
# Item
## title
Autolysosome (EM)
## subject
fnd
## type
Lab interpretation
## lab_subtype
Lab
## difficulty
Hard
## learning_objective
Identify an autolysosome by recognising a degenerating organelle inside it, and name what is left when digestion is incomplete.
## module_subject
101 ISK > Histology > Cytology > Cytoplasm
## main_concept
CON-FND-42CCE864C55A08
## concept_ids
CON-FND-E0B130AC5EC939
## lab_questions
### What is inside it
Concept: CON-FND-42CCE864C55A08
Difficulty: Moderate
Q: A membrane-bound body encloses a recognisable but degenerating mitochondrion. Name the body.
*= An autolysosome
Why: Why: a secondary lysosome digesting one of the cell's own organelles is an autolysosome, and the handout's own example is a destroyed mitochondrion.
* A heterolysosome
Why: Why: the same structure with the wrong origin; hetero- would require the contents to have come from outside the cell.
* A multivesicular body
Why: Why: chosen because both hold internal membrane; a multivesicular body holds small pinocytic vesicles, not a whole organelle.
* A swollen mitochondrion with a duplicated outer membrane
Why: Why: an honest reading of the picture by a student who has not met autophagy; the extra membrane belongs to the lysosome, not to the mitochondrion.
Explanation: An organelle of the cell's own inside a lysosome is autophagy.
### What is left afterwards
Concept: CON-FND-42CCE864C55A08
Difficulty: Moderate
Q: Digestion inside such a body is often incomplete. What is the undigested remnant called, and what happens to it in a long-lived cell?
*= A residual body; in nerve and cardiac muscle cells it accumulates over years as lipofuscin
Why: Why: the handout names lipofuscin as the age pigment of exactly those two long-lived cell types.
* A residual body; it is always discharged by exocytosis
Why: Why: half right — discharge is one fate, but the handout gives accumulation as the other, and it is the one that produces a visible pigment.
* A melanosome; it darkens the cell
Why: Why: chosen because melanin is the pigment students name first; melanin is synthesised for a purpose, not left over from digestion.
* A peroxisome; it detoxifies the remnant
Why: Why: picked by students grouping all the small bodies together; peroxisomes bud from ER with their own enzymes and are not digestive leftovers.
Explanation: Residual body is the name; lipofuscin is what it becomes when the cell lives long enough.
## media_needed
### image · Autolysosome (EM)
Brief: Transmission EM of an autolysosome enclosing a recognisable degenerating organelle, ideally a mitochondrion.
Purpose: The identification depends on recognising a specific organelle inside the lysosome, which only the micrograph shows.
Priority: required
Status: needed
Kind: histology
Section: station
Notes: Fulfils the existing request "### image · Autolysosome (EM)" in docs/Kasr-Source-Imports/media-requests/practical-media-requests.md. No image exists in the repository.
## references
DPT Practical Histo 101 (src_b4cb8bf9f0c7a6584b4b), teaching plate p. 17.
Slide catalogue: scripts/kasr/extract/practical.json.
Terminology: Prof. Dalia El Marakby, Cytology handout (src_0abbf6bc25c43a087d36) p. 9.

---
# Item
## title
Nissl's granules in a nerve cell
## subject
fnd
## type
Lab interpretation
## lab_subtype
Lab
## difficulty
Moderate
## learning_objective
Identify Nissl's granules in a nerve cell and state which organelle they are made of.
## module_subject
101 ISK > Histology > Cytology > Cytoplasm
## main_concept
CON-FND-4AE74C678A6F64
## concept_ids
CON-FND-08378767774524
## lab_questions
### What the clumps are made of
Concept: CON-FND-4AE74C678A6F64
Difficulty: Moderate
Q: Coarse basophilic clumps fill the cytoplasm of a large nerve cell body. What organelle are they?
*= Aggregates of rough endoplasmic reticulum with free ribosomes
Why: Why: Nissl's granules are the light-microscopic appearance of massed rER, and the ribosomal RNA in it is what makes them basophilic.
* Aggregates of smooth endoplasmic reticulum
Why: Why: chosen by students who remember ER but not which kind; smooth ER carries no ribosomes and makes cytoplasm acidophilic, not basophilic.
* Clusters of mitochondria
Why: Why: picked because mitochondria also crowd into active cells; they are demonstrated by iron haematoxylin or Janus green, and they do not produce basophilia.
* Lipofuscin pigment granules
Why: Why: a real feature of old nerve cells and so a tempting answer; lipofuscin is brown-yellow and needs no stain, whereas Nissl's granules are basophilic.
Explanation: Naming the appearance is not enough; the department expects the organelle behind it.
### Why they stain as they do
Concept: CON-FND-4AE74C678A6F64
Difficulty: Moderate
Q: Why are these clumps basophilic?
*= Because of the ribosomal RNA they contain
Why: Why: the handout attributes cytoplasmic basophilia to the acidity of the phosphate in ribosomal RNA.
* Because the nerve cell is metabolically active
Why: Why: activity is why the rER is there, but it is not what binds the basic dye; the answer the examiner wants names the molecule.
* Because they contain heparin, which is metachromatic
Why: Why: the mast-cell answer, imported here by students who group all strongly basophilic structures together.
* Because they take up silver during impregnation
Why: Why: silver is the Golgi demonstration on the neighbouring plate; it produces brown, not basophilia.
Explanation: RNA is the reason, which is why the same explanation covers the plasma cell's cytoplasm.
## media_needed
### image · Nissl's granules in a nerve cell
Brief: Light micrograph of a nerve cell body with coarse basophilic Nissl's granules in the cytoplasm and a pale vesicular nucleus.
Purpose: The item asks for the organelle behind an appearance, which requires the appearance to be shown.
Priority: required
Status: needed
Kind: histology
Section: station
Notes: Fulfils the existing request "### image · Nissl's granules in a nerve cell" in docs/Kasr-Source-Imports/media-requests/practical-media-requests.md. No image exists in the repository.
## references
DPT Practical Histo 101 (src_b4cb8bf9f0c7a6584b4b), teaching plate p. 18.
Slide catalogue: scripts/kasr/extract/practical.json.
Terminology: Prof. Dalia El Marakby, Cytology handout (src_0abbf6bc25c43a087d36) pp. 7 and 10.
---
# Item
## title
Ribosome and translation (labelled diagram)
## subject
fnd
## type
Lab interpretation
## lab_subtype
Lab
## difficulty
Moderate
## learning_objective
Name the parts of a ribosome on a labelled diagram and say where free and attached ribosomes send their product.
## module_subject
101 ISK > Histology > Cytology > Cytoplasm
## main_concept
CON-FND-ACF503263BA7D7
## lab_questions
### The two subunits
Concept: CON-FND-ACF503263BA7D7
Difficulty: Moderate
Q: On the department's labelled diagram, which subunit carries the groove that the growing polypeptide chain passes through?
*= The large subunit
Why: Why: the handout puts the central groove holding the polypeptide chain in the large subunit, which is also the one that binds the rER membrane.
* The small subunit
Why: Why: the pair swapped; the small subunit is where the mRNA is held and read, which is what students remember instead.
* Neither — the chain passes between the two subunits
Why: Why: an intuitive reading of the diagram, where the chain does emerge at the junction; the labelled groove belongs to the large subunit.
* The tRNA carries it out
Why: Why: chosen because tRNA is drawn touching the chain; tRNA delivers single amino acids and leaves.
Explanation: Large subunit: the groove and the membrane binding. Small subunit: the mRNA.
### Free versus attached
Concept: CON-FND-ACF503263BA7D7
Difficulty: Moderate
Q: What is the difference in destination between the protein made by a free ribosome and by one attached to rER?
*= Free ribosomes make protein for the cell itself; attached ribosomes make protein for export
Why: Why: the handout gives glycolytic enzymes as the example of the first and digestive enzymes and protein hormones of the second.
* Free ribosomes make protein for export; attached ribosomes make protein for the cell itself
Why: Why: the pair the wrong way round, which is why the department asks it as a question rather than assuming it.
* Both make the same proteins; attachment only speeds synthesis
Why: Why: chosen by students who see one ribosome type and one code; the destination is determined by where synthesis happens.
* Free ribosomes make RNA; attached ribosomes make protein
Why: Why: picked by students who confuse the nucleolus with the ribosome; ribosomes translate, they do not transcribe.
Explanation: Where the ribosome sits decides where the protein goes.
## media_needed
### image · Ribosome and translation (schematic)
Brief: Labelled schematic of a ribosome: large and small subunits, A and P sites, mRNA with codon, tRNA and the growing amino-acid chain.
Purpose: The item is a labelling exercise on the department's own diagram; without the diagram there is nothing to label.
Priority: required
Status: needed
Kind: histology
Section: station
Notes: Fulfils the existing request "### image · Ribosome and translation (schematic)" in docs/Kasr-Source-Imports/media-requests/practical-media-requests.md. The source page is itself a schematic rather than a specimen. No image exists in the repository.
## references
DPT Practical Histo 101 (src_b4cb8bf9f0c7a6584b4b), labelled plate p. 19: large ribosomal subunit; small ribosomal subunit; P-site; A-site; amino acid chain; tRNA; mRNA; codon.
Slide catalogue: scripts/kasr/extract/practical.json.
Terminology: Prof. Dalia El Marakby, Cytology handout (src_0abbf6bc25c43a087d36) p. 10.
---
# Item
## title
Centriole (EM)
## subject
fnd
## type
Lab interpretation
## lab_subtype
Lab
## difficulty
Moderate
## learning_objective
Identify a centriole on an electron micrograph and state that its microtubules are arranged as nine triplets.
## module_subject
101 ISK > Histology > Cytology > Cytoplasm
## main_concept
CON-FND-759499A4A27938
## lab_questions
### Arrangement of the microtubules
Concept: CON-FND-759499A4A27938
Difficulty: Moderate
Q: The red arrows point to the microtubules in the wall of the arrowed cylinder. How are they arranged?
*= Nine triplets, twenty-seven microtubules in all, with nothing in the centre
Why: Why: 9 x 3 = 27 is the arrangement the department prints for the centriole and for the basal body.
* Nine peripheral doublets and two central singlets
Why: Why: the axoneme of a cilium's shaft, which the book teaches two plates later; students learn one nine-fold pattern and use it for both.
* Thirteen protofilaments around a hollow core
Why: Why: true of a single microtubule, not of the centriole built from them; the question is about the arrangement of whole microtubules.
* Nine triplets with two central singlets
Why: Why: the two patterns blended, by a student who has met both and separated neither.
Explanation: Twenty-seven in nine triplets, and no central pair — that is what makes it a centriole rather than a shaft.
### What it becomes
Concept: CON-FND-759499A4A27938
Difficulty: Hard
Q: Besides forming the mitotic spindle, what else does this structure become?
*= The basal body of a cilium or flagellum
Why: Why: the handout describes the basal body as a single centriole of twenty-seven microtubules embedded in the cytoplasm.
* The axoneme of the shaft itself
Why: Why: nearly right and the reason the plates sit together; the shaft grows from the basal body but has a different pattern.
* The core of a microvillus
Why: Why: chosen because microvilli are also apical projections; a microvillus core is actin microfilaments and contains no microtubules at all.
* The microtubule organising centre's gamma tubulin
Why: Why: picked by students who remember the MTOC from the same page; the centriole sits in the centrosome, but it is not the tubulin.
Explanation: Centriole and basal body are the same structure in two jobs.
## media_needed
### image · Centriole (EM, longitudinal and transverse)
Brief: Transmission EM of a centriole in transverse section resolving the nine triplets, with a longitudinal profile of the pair at right angles if available.
Purpose: Counting and grouping the microtubules is the answer, and it can only be done on the section.
Priority: required
Status: needed
Kind: histology
Section: station
Notes: Fulfils the existing request "### image · Centriole (EM, longitudinal and transverse)" in docs/Kasr-Source-Imports/media-requests/practical-media-requests.md. No image exists in the repository.
## references
DPT Practical Histo 101 (src_b4cb8bf9f0c7a6584b4b), teaching plates pp. 20 and 21; question plate p. 55 with model answer p. 56.
DPT 1- ISK 101 - Final Revision (src_05a0b0c29acc94017b8f) p. 16, model answer p. 17.
Slide catalogue: scripts/kasr/extract/practical.json.
---
# Item
## title
Cilia (EM, longitudinal and transverse)
## subject
fnd
## type
Lab interpretation
## lab_subtype
Lab
## difficulty
Moderate
## learning_objective
Identify the shaft of a cilium on an electron micrograph and name its peripheral doublets and central singlets.
## module_subject
101 ISK > Histology > Epithelial Tissues > Polarity and Membranous Specializations
## main_concept
CON-FND-0FAE59E00B748E
## lab_questions
### The structure in the red square
Concept: CON-FND-0FAE59E00B748E
Difficulty: Moderate
Q: The red square encloses an apical projection whose core holds about twenty microtubules. Name it and give one character.
*= The shaft, or axoneme, of a cilium — nine peripheral doublets plus two central singlets
Why: Why: twenty microtubules in the 9 + 2 pattern is the axoneme, and that count is the character the answer page gives.
* A centriole — nine triplets of microtubules
Why: Why: the basal body of this very cilium has that pattern, which is why the two are confused; the shaft loses the third microtubule of each triplet.
* A microvillus — a pale core with no microtubules
Why: Why: the structure in the blue square on the same plate, and the contrast the plate exists to teach.
* A stereocilium — a long microvillus
Why: Why: chosen because stereocilia are long apical projections too; they contain no axoneme, which is what the square is showing.
Explanation: Nine doublets and two singlets: about twenty microtubules, and only the shaft has them.
### Blue arrow and red arrow
Concept: CON-FND-0FAE59E00B748E
Difficulty: Moderate
Q: Within the axoneme the blue arrow marks the two microtubules at the centre and the red arrow a pair at the edge. Name each.
*= Two central singlets (blue) and a peripheral doublet (red)
Why: Why: these are the answer page's own words for the two positions.
* A peripheral doublet (blue) and two central singlets (red)
Why: Why: the pair named correctly and placed wrongly, by a student reading the arrows rather than the positions.
* Central triplets and peripheral singlets
Why: Why: the numbers inverted, which happens when the centriole's triplets are carried across to the shaft.
* Rootlets and basal body
Why: Why: real parts of a cilium — the department names three: basal body, shaft and rootlets — but neither lies inside the axoneme.
Explanation: Peripheral doublets, central singlets; the third part of each triplet became the rootlet.
## media_needed
### image · Cilia (EM, longitudinal and transverse)
Brief: Transmission EM of cilia cut both longitudinally and transversely, with the 9 + 2 axoneme resolved and a basal body in the longitudinal profile.
Purpose: The answers are counts and positions of microtubules within a section, which no description substitutes for.
Priority: required
Status: needed
Kind: histology
Section: station
Notes: Fulfils the existing request "### image · Cilia (EM, longitudinal and transverse)" in docs/Kasr-Source-Imports/media-requests/practical-media-requests.md. No image exists in the repository.
## references
DPT Practical Histo 101 (src_b4cb8bf9f0c7a6584b4b), teaching plate p. 22; question plates pp. 57 and 59 with model answers pp. 58 and 60.
DPT 1- ISK 101 - Final Revision (src_05a0b0c29acc94017b8f) p. 18, model answer p. 19.
Slide catalogue: scripts/kasr/extract/practical.json.
---
# Item
## title
Microvilli (EM, longitudinal and transverse)
## subject
fnd
## type
Lab interpretation
## lab_subtype
Lab
## difficulty
Moderate
## learning_objective
Tell a microvillus from a cilium on one micrograph and give the character that separates them.
## module_subject
101 ISK > Histology > Epithelial Tissues > Polarity and Membranous Specializations
## main_concept
CON-FND-942169C7CEC1CA
## concept_ids
CON-FND-0FAE59E00B748E
## lab_questions
### The structure in the blue square
Concept: CON-FND-942169C7CEC1CA
Difficulty: Moderate
Q: The blue square encloses small apical projections with a pale core. Name them and give one character.
*= Microvilli — small, with no microtubules in the core
Why: Why: the answer page's character for microvilli is exactly the absence of microtubules and the pale core.
* Cilia — with an axoneme of about twenty microtubules
Why: Why: the structure in the red square on the same plate; the plate exists to force the choice between them.
* Basal infoldings of the cell membrane
Why: Why: a real specialisation the handout describes, but a basal one, and the square is at the apex.
* Pinocytic vesicles at the apical surface
Why: Why: chosen when the pale cores are read as lumina; a microvillus is a finger of cytoplasm, not a vesicle.
Explanation: No microtubules, pale core, small — those three make it a microvillus.
### Why length does not decide it
Concept: CON-FND-942169C7CEC1CA
Difficulty: Hard
Q: Why can length not be used to tell microvilli from cilia?
*= Because stereocilia are long microvilli and outrun many cilia
Why: Why: the handout defines stereocilia as long microvilli that are not true cilia, which removes length as a criterion.
* Because both are cut obliquely in every section
Why: Why: an honest worry about sectioning, but the plate shows both in longitudinal and transverse profile precisely so that this does not arise.
* Because cilia shorten as they beat
Why: Why: an invention; cilia bend, they do not shorten, and a fixed section shows no motion at all.
* Because microvilli are always taller than cilia
Why: Why: the rule inverted, by a student who met stereocilia first and generalised from them.
Explanation: The core, not the height. Stereocilia are what make that lesson necessary.
## media_needed
### image · Microvilli (EM, longitudinal and transverse)
Brief: Transmission EM of microvilli in longitudinal and transverse profile, showing pale cores free of microtubules, ideally with cilia in the same field.
Purpose: The contrast is between two things visible side by side; the item cannot be attempted from text.
Priority: required
Status: needed
Kind: histology
Section: station
Notes: Fulfils the existing request "### image · Microvilli (EM, longitudinal and transverse)" in docs/Kasr-Source-Imports/media-requests/practical-media-requests.md. No image exists in the repository.
## references
DPT Practical Histo 101 (src_b4cb8bf9f0c7a6584b4b), teaching plate p. 23; question plate p. 59 with model answer p. 60.
DPT 1- ISK 101 - Final Revision (src_05a0b0c29acc94017b8f) p. 18, model answer p. 19.
Slide catalogue: scripts/kasr/extract/practical.json.
Terminology: Prof. Dalia El Marakby, Cytology handout (src_0abbf6bc25c43a087d36) p. 13.
---
# Item
## title
Glycogen inclusion in liver cells
## subject
fnd
## type
Lab interpretation
## lab_subtype
Lab
## difficulty
Moderate
## learning_objective
Identify glycogen as the inclusion on a stained plate, name a stain that demonstrates it, give one visible character and name the cell.
## module_subject
101 ISK > Histology > Cytology > Cytoplasm
## main_concept
CON-FND-7650D31963FEBD
## concept_ids
CON-FND-53E16F5D4E3538
## lab_questions
### The inclusion and its stain
Concept: CON-FND-7650D31963FEBD
Difficulty: Moderate
Q: Figure a shows red granules filling the cytoplasm of liver cells. Name the inclusion and a stain that demonstrates it.
*= Glycogen, demonstrated by Best's carmine or by PAS
Why: Why: the book's answer page names both stains for figure a and gives red granules in liver cells as the appearance.
* Fat, demonstrated by Sudan III
Why: Why: the answer for figure b on the same question, which is why the department prints the two figures together.
* Haemoglobin, demonstrated by eosin
Why: Why: chosen because both are red; haemoglobin is in red cells, not in the cytoplasm of hepatocytes.
* Lipofuscin, which needs no stain
Why: Why: picked by students who recall a pigment in liver; lipofuscin is a brown-yellow age pigment of nerve and cardiac muscle cells.
Explanation: Both the inclusion and the stain are marked, and the paired figure makes the choice of stain the real question.
### Why it needs a special stain
Concept: CON-FND-7650D31963FEBD
Difficulty: Moderate
Q: What would the same cells look like in an ordinary H&E section?
*= The glycogen would have dissolved, leaving vacuoles
Why: Why: the handout states plainly that glycogen dissolves in H&E and appears as vacuoles.
* The glycogen would be basophilic
Why: Why: chosen by students who associate any carbohydrate-rich structure with basophilia; the material is not there to stain.
* The glycogen would be orange
Why: Why: that is the Sudan III appearance of fat, on the other half of this question.
* It would look the same, since carmine and H&E stain alike
Why: Why: picked by students who think of stains as interchangeable; the point of a special stain is that the routine one loses the material.
Explanation: Both glycogen and fat vanish in routine processing, which is why both have their own plates.
## media_needed
### image · Glycogen inclusion in liver cells
Brief: Light micrograph of hepatocytes with glycogen demonstrated as red granules by Best's carmine or magenta by PAS.
Purpose: The student must recognise the colour a specific stain gives, which only the slide carries.
Priority: required
Status: needed
Kind: histology
Section: station
Notes: Fulfils the existing request "### image · Glycogen inclusion in liver cells" in docs/Kasr-Source-Imports/media-requests/practical-media-requests.md. No image exists in the repository.
## references
DPT Practical Histo 101 (src_b4cb8bf9f0c7a6584b4b), teaching plate p. 24; question plate p. 61 with model answer p. 62.
DPT 1- ISK 101 - Final Revision (src_05a0b0c29acc94017b8f) p. 20, model answer p. 21.
Slide catalogue: scripts/kasr/extract/practical.json.
Terminology: Prof. Dalia El Marakby, Cytology handout (src_0abbf6bc25c43a087d36) p. 15.

---
# Item
## title
Fat inclusion in adipocytes (H&E)
## subject
fnd
## type
Lab interpretation
## lab_subtype
Lab
## difficulty
Moderate
## learning_objective
Recognise that the empty vacuole of an H&E adipocyte is the fat droplet, and explain why it is empty.
## module_subject
101 ISK > Histology > Cytology > Cytoplasm
## main_concept
CON-FND-53E16F5D4E3538
## lab_questions
### The empty space in the cell
Concept: CON-FND-53E16F5D4E3538
Difficulty: Moderate
Q: In this H&E section each large cell holds one clear unstained space with the nucleus flattened against the rim. What was in the space?
*= Fat, which dissolved in the solvents used to process the section
Why: Why: the handout states that fat dissolves in H&E and the cell appears as a signet ring; the space is the droplet.
* Nothing — the cells are artefactually swollen
Why: Why: the honest reading of an empty space by a student who has not been told what processing removes; the constancy of the appearance across every cell is what rules it out.
* Glycogen, which also dissolves
Why: Why: glycogen does dissolve too, but it leaves small scattered vacuoles in a liver cell, not one space filling a cell whose nucleus is pushed to the edge.
* Mucus, washed out during staining
Why: Why: chosen by students thinking of goblet cells; mucus is retained and stains, and a goblet cell is a tall epithelial cell, not a rounded one.
Explanation: The empty vacuole is the fat. The Sudan III plate on the facing page proves it.
### The appearance the department names
Concept: CON-FND-53E16F5D4E3538
Difficulty: Easy
Q: What name does the department give to the appearance of this cell in H&E?
*= A signet-ring appearance
Why: Why: the handout's own term for the unilocular fat cell once its droplet has dissolved.
* A frosted-glass appearance
Why: Why: the monocyte's cytoplasm on the blood plates; both are named appearances, which is why they are swapped.
* A cart-wheel appearance
Why: Why: the plasma cell's nucleus; another named appearance from the same course.
* A negative Golgi image
Why: Why: also an absence of stain, which makes it tempting; that absence lies beside the nucleus and is far smaller than the cell.
Explanation: Signet ring: a thin rim of cytoplasm with the nucleus set into it.
## media_needed
### image · Fat inclusion in adipocytes (H&E)
Brief: H&E light micrograph of unilocular adipocytes showing the signet-ring appearance, the dissolved droplet as an empty space and the flattened peripheral nucleus.
Purpose: The item asks the student to interpret an absence in a specific stain, which requires that stain's image.
Priority: required
Status: needed
Kind: histology
Section: station
Notes: Fulfils the existing request "### image · Fat inclusion in adipocytes (H&E)" in docs/Kasr-Source-Imports/media-requests/practical-media-requests.md. No image exists in the repository.
## references
DPT Practical Histo 101 (src_b4cb8bf9f0c7a6584b4b), teaching plate p. 25.
Slide catalogue: scripts/kasr/extract/practical.json.
Terminology: Prof. Dalia El Marakby, Connective tissue handout (src_d56198df979fc164f6c6) p. 5.
---
# Item
## title
Fat inclusion in adipocytes (Sudan III)
## subject
fnd
## type
Lab interpretation
## lab_subtype
Lab
## difficulty
Easy
## learning_objective
Identify fat by its Sudan III appearance and name the cell that holds it.
## module_subject
101 ISK > Histology > Cytology > Cytoplasm
## main_concept
CON-FND-53E16F5D4E3538
## concept_ids
CON-FND-7650D31963FEBD
## lab_questions
### Inclusion, stain and cell
Concept: CON-FND-53E16F5D4E3538
Difficulty: Easy
Q: Figure b shows a single large orange droplet filling each of a group of rounded cells. Name the inclusion, the stain and the cell.
*= Fat, stained by Sudan III, in fat cells (adipocytes)
Why: Why: this is the answer page's own triple for figure b.
* Glycogen, stained by Best's carmine, in liver cells
Why: Why: the answer for figure a of the same question, and the reason the two figures are printed together.
* Fat, stained by osmium, in liver cells
Why: Why: a plausible mix — fat is right, but the department teaches Sudan III here, and the plate shows adipocytes rather than hepatocytes.
* Carotene pigment, unstained, in fat cells
Why: Why: carotenoids are genuinely dissolved in the droplet and give white fat its colour, so this is a knowledgeable wrong answer; the orange here is the dye, not the pigment.
Explanation: All three parts are asked; the stain is what distinguishes this figure from its pair.
## media_needed
### image · Fat inclusion in adipocytes (Sudan III)
Brief: Sudan III light micrograph of adipocytes with the fat preserved and stained as a single large orange droplet per cell.
Purpose: The colour a specific stain gives is the answer; it cannot be conveyed in words the student is asked to recognise.
Priority: required
Status: needed
Kind: histology
Section: station
Notes: Fulfils the existing request "### image · Fat inclusion in adipocytes (Sudan III)" in docs/Kasr-Source-Imports/media-requests/practical-media-requests.md. No image exists in the repository.
## references
DPT Practical Histo 101 (src_b4cb8bf9f0c7a6584b4b), teaching plate p. 26; question plate p. 61 with model answer p. 62.
DPT 1- ISK 101 - Final Revision (src_05a0b0c29acc94017b8f) p. 20, model answer p. 21.
Slide catalogue: scripts/kasr/extract/practical.json.
---
# Item
## title
Open-face and closed-face nuclei (LM)
## subject
fnd
## type
Lab interpretation
## lab_subtype
Lab
## difficulty
Moderate
## learning_objective
Tell an open-face from a closed-face nucleus on a light micrograph and say what each implies about the cell's activity.
## module_subject
101 ISK > Histology > Cytology > Nucleus
## main_concept
CON-FND-E2DE55693981A7
## lab_questions
### Which nucleus is which
Concept: CON-FND-E2DE55693981A7
Difficulty: Moderate
Q: One nucleus in the field is large and pale, the other small and darkly basophilic. Name each and say which cell is the more active.
*= The pale one is open-face (vesicular) and belongs to the more active cell; the dark one is closed-face
Why: Why: extended euchromatin is pale and means the cell is synthesising, which is why the handout gives the nerve cell as the pale example and the small lymphocyte as the dark one.
* The dark one is open-face and the more active, because dark means more chromatin
Why: Why: the intuitive reading — more stain looks like more work — and exactly the one the plate exists to correct; condensed chromatin is inactive chromatin.
* Both are equally active; the difference is section thickness
Why: Why: an artefact explanation offered by careful students; the two nuclei lie in the same section, which removes that variable.
* The pale one is a degenerating nucleus
Why: Why: chosen because pallor suggests loss; a degenerating nucleus is shrunken and dense (pyknotic), not enlarged and open.
Explanation: Pale means uncoiled means working. That is the whole of the plate.
### The cells the department names
Concept: CON-FND-E2DE55693981A7
Difficulty: Moderate
Q: Which cells does the departmental handout give as its examples of the two states?
*= The nerve cell for the pale vesicular nucleus and the small lymphocyte for the dark one
Why: Why: these are the handout's own two examples, and both cells appear elsewhere in the course.
* The plasma cell for the pale nucleus and the neutrophil for the dark one
Why: Why: both are real cells with distinctive nuclei, and the plasma cell is active; but the handout's stated pair is the nerve cell and the small lymphocyte.
* The fat cell for the pale nucleus and the fibrocyte for the dark one
Why: Why: chosen from the connective-tissue block, where nuclei are also compared; neither is the handout's cytology example.
* The megakaryocyte for the pale nucleus and the erythrocyte for the dark one
Why: Why: the erythrocyte has no nucleus at all, which is what makes this the easiest of the four to eliminate.
Explanation: The examples matter because they are the cells the student will meet on later plates.
## media_needed
### image · Open-face and closed-face nuclei (LM)
Brief: Light micrograph showing a pale vesicular (open-face) nucleus and a dark heterochromatic (closed-face) nucleus in one field.
Purpose: The judgement is a comparison of two nuclei in the same section, which only an image supports.
Priority: required
Status: needed
Kind: histology
Section: station
Notes: Fulfils the existing request "### image · Open-face and closed-face nuclei (LM)" in docs/Kasr-Source-Imports/media-requests/practical-media-requests.md. No image exists in the repository.
## references
DPT Practical Histo 101 (src_b4cb8bf9f0c7a6584b4b), teaching plate p. 27.
Slide catalogue: scripts/kasr/extract/practical.json.
Terminology: Prof. Dalia El Marakby, Cytology handout (src_0abbf6bc25c43a087d36) pp. 16 and 17.
---
# Item
## title
Nucleus and nuclear envelope (EM)
## subject
fnd
## type
Lab interpretation
## lab_subtype
Lab
## difficulty
Moderate
## learning_objective
Name the nuclear membrane, the perinuclear space and a nuclear pore on an electron micrograph, and distinguish them from the nucleolus.
## module_subject
101 ISK > Histology > Cytology > Nucleus
## main_concept
CON-FND-C81FD3E574D3AA
## lab_questions
### Blue arrow and red arrow
Concept: CON-FND-C81FD3E574D3AA
Difficulty: Moderate
Q: The blue arrow points to a dense rounded mass inside the nucleus and the red arrow to the boundary of the nucleus. Name each.
*= Nucleolus (blue) and nuclear membrane (red)
Why: Why: these are the answer page's words; the plate marks the two because students name one for the other.
* Nuclear membrane (blue) and nucleolus (red)
Why: Why: the pair swapped, by a student who answers the arrows in the order they revised rather than the order they are drawn.
* Chromatin island (blue) and peripheral heterochromatin (red)
Why: Why: a knowledgeable answer — both are real and both are marked on the chromatin plates — but the nucleolus is a discrete rounded mass and the boundary is a membrane, not chromatin.
* Barr body (blue) and nuclear lamina (red)
Why: Why: chosen by students who have met the Barr body on the blood plates; that is a drumstick on a neutrophil's nucleus, not a mass inside an interphase nucleus.
Explanation: The nucleolus has no membrane of its own; the envelope is the boundary.
### Structure of the envelope
Concept: CON-FND-C81FD3E574D3AA
Difficulty: Hard
Q: What does the labelled plate show the envelope to be made of?
*= Two unit membranes separated by a perinuclear space and interrupted at pores, the outer one continuous with rough ER
Why: Why: this is the handout's description, and the department's labelled plate names an outer and an inner nuclear layer.
* A single unit membrane, like the plasma membrane
Why: Why: chosen by students generalising from the cell membrane; the plate's own labels name two layers.
* Two membranes with no openings, so transport is entirely active
Why: Why: a reasonable inference from a barrier, but pores are the plate's point and RNA leaves through them.
* A basement membrane of collagen type IV
Why: Why: that is the epithelial basement membrane from a later block; nothing collagenous lies inside a cell.
Explanation: Two membranes, one space, pores where they fuse, and continuity with rER at the outer one.
## media_needed
### image · Nucleus and nuclear envelope (EM)
Brief: Transmission EM of a nucleus with the two-layered envelope, the perinuclear space, at least one pore and the nucleolus all resolvable.
Purpose: The item asks the student to separate the nucleolus from the envelope on a marked micrograph.
Priority: required
Status: needed
Kind: histology
Section: station
Notes: Fulfils the existing request "### image · Nucleus and nuclear envelope (EM)" in docs/Kasr-Source-Imports/media-requests/practical-media-requests.md. No image exists in the repository.
## references
DPT Practical Histo 101 (src_b4cb8bf9f0c7a6584b4b), teaching plates pp. 28, 31 and the labelled plate p. 73; question plate p. 63 with model answer p. 64.
Slide catalogue: scripts/kasr/extract/practical.json.
Terminology: Prof. Dalia El Marakby, Cytology handout (src_0abbf6bc25c43a087d36) p. 16.
---
# Item
## title
Heterochromatic nucleus (EM)
## subject
fnd
## type
Lab interpretation
## lab_subtype
Lab
## difficulty
Hard
## learning_objective
Identify a nucleus as heterochromatic and name its peripheral heterochromatin, chromatin islands and nucleolus-associated chromatin when arrowed.
## module_subject
101 ISK > Histology > Cytology > Nucleus
## main_concept
CON-FND-BAABF179A898ED
## concept_ids
CON-FND-C81FD3E574D3AA
## lab_questions
### Identify the structure, being specific
Concept: CON-FND-BAABF179A898ED
Difficulty: Hard
Q: The stem says: identify the structure, and be specific. Condensed chromatin occupies most of the nucleus. What is the answer?
*= A heterochromatic nucleus — the nucleus of an inactive cell
Why: Why: the stem's "be specific" is asking for the chromatin state, not just the organelle.
* A nucleus
Why: Why: the answer that earns nothing, and the reason the department writes "be specific" into the stem at all.
* A euchromatic nucleus
Why: Why: the facing plate; a student who has learned the two names but not which appearance goes with which picks this half the time.
* A pyknotic nucleus of a dying cell
Why: Why: a thoughtful answer, since condensation does occur in cell death; a pyknotic nucleus is shrunken and uniformly dense, without the ordered peripheral, island and nucleolus-associated pattern this plate shows.
Explanation: Heterochromatic is the answer; the same components appear on both plates and only the proportions differ.
### Red, green and yellow arrows
Concept: CON-FND-BAABF179A898ED
Difficulty: Hard
Q: The red arrow marks condensed chromatin lining the envelope, the green a clump lying free, and the yellow a shell around the nucleolus. Name the three.
*= Peripheral heterochromatin, a chromatin island, and nucleolus-associated chromatin
Why: Why: these are the three distributions the handout lists, and the answer page uses these words.
* Nuclear lamina, a Barr body, and the nucleolus itself
Why: Why: each is a real structure, which is what makes the set tempting; none of the three is a distribution of heterochromatin.
* Peripheral heterochromatin, euchromatin, and the nucleolus
Why: Why: the first is right and the rest drift; euchromatin is the pale sap, marked by the star on this plate, not by the green arrow.
* Perinuclear space, chromatin island, and nucleolar sap
Why: Why: chosen by students who read the peripheral arrow as pointing at the envelope rather than at the chromatin on it.
Explanation: Three named distributions: on the envelope, free in the sap, and around the nucleolus.
## media_needed
### image · Heterochromatic nucleus (EM)
Brief: Transmission EM of an inactive nucleus dominated by condensed chromatin, with peripheral heterochromatin, chromatin islands, nucleolus-associated chromatin and the envelope all resolvable.
Purpose: The whole item is a set of positions within one nucleus; nothing but the micrograph carries them.
Priority: required
Status: needed
Kind: histology
Section: station
Notes: Fulfils the existing request "### image · Heterochromatic nucleus (EM)" in docs/Kasr-Source-Imports/media-requests/practical-media-requests.md. No image exists in the repository.
## references
DPT Practical Histo 101 (src_b4cb8bf9f0c7a6584b4b), teaching plate p. 30; question plate p. 65 with model answer p. 66.
DPT 1- ISK 101 - Final Revision (src_05a0b0c29acc94017b8f) p. 22, model answer p. 23.
Slide catalogue: scripts/kasr/extract/practical.json.
---
# Item
## title
Euchromatic nucleus (EM)
## subject
fnd
## type
Lab interpretation
## lab_subtype
Lab
## difficulty
Hard
## learning_objective
Identify a nucleus as euchromatic and name the nucleolus, the nuclear sap and a nuclear pore when arrowed.
## module_subject
101 ISK > Histology > Cytology > Nucleus
## main_concept
CON-FND-BAABF179A898ED
## concept_ids
CON-FND-C81FD3E574D3AA
## lab_questions
### Identify the structure, being specific
Concept: CON-FND-BAABF179A898ED
Difficulty: Moderate
Q: Most of this nucleus is pale, with a discrete dense nucleolus and only a thin rim of condensed chromatin. Identify it specifically.
*= A euchromatic nucleus — the nucleus of an active cell
Why: Why: predominance of extended chromatin with a clear nucleolus is the euchromatic nucleus of a protein-forming cell.
* A heterochromatic nucleus
Why: Why: the facing plate, chosen by students who register the peripheral rim rather than the proportions; both nuclei carry that rim.
* A nucleus in early mitosis
Why: Why: a reasonable guess from the pallor; a dividing nucleus loses its envelope and condenses chromosomes, and neither is happening here.
* A nucleus
Why: Why: the unspecific answer the stem explicitly refuses.
Explanation: Proportion decides it: mostly pale sap means euchromatic means active.
### Black arrow and arrowhead
Concept: CON-FND-BAABF179A898ED
Difficulty: Hard
Q: On this plate the black arrow marks the boundary of the nucleus and the arrowhead a gap in it. Name each.
*= Nuclear membrane (black arrow) and nuclear pore (arrowhead)
Why: Why: the pore is where the inner and outer membranes fuse, and this plate is where the department asks for it by name.
* Nuclear membrane and the perinuclear space
Why: Why: the space is between the two membranes and runs the whole circumference; the arrowhead is on a discrete interruption.
* Cell membrane and a gap junction
Why: Why: chosen by students who transfer junction vocabulary from the epithelium block; nothing here is a junction between two cells.
* Nuclear lamina and a chromatin island
Why: Why: both real, and the lamina does line the inner membrane; neither is a hole in the envelope.
Explanation: The pore is the diagnostic feature this plate adds to the heterochromatic one.
## media_needed
### image · Euchromatic nucleus (EM)
Brief: Transmission EM of an active nucleus, mostly pale nuclear sap with a discrete nucleolus, a thin peripheral rim of heterochromatin and at least one nuclear pore.
Purpose: The identification is a proportion judged by eye, and the pore is a feature that must be resolved.
Priority: required
Status: needed
Kind: histology
Section: station
Notes: Fulfils the existing request "### image · Euchromatic nucleus (EM)" in docs/Kasr-Source-Imports/media-requests/practical-media-requests.md. No image exists in the repository.
## references
DPT Practical Histo 101 (src_b4cb8bf9f0c7a6584b4b), teaching plate p. 29; question plate p. 67 with model answer p. 68.
DPT 1- ISK 101 - Final Revision (src_05a0b0c29acc94017b8f) p. 24, model answer p. 25.
Slide catalogue: scripts/kasr/extract/practical.json.
