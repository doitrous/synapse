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
