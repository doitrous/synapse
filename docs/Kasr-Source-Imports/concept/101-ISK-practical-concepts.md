<!--
  Identification concepts for the 101 ISK practical (spot) exam.

  Source: the Histology Department's own practical book,
  `DPT Practical Histo 101 (1).pdf` (src_b4cb8bf9f0c7a6584b4b, 210 pp.), and the
  data-show revision deck `DPT 1- ISK 101 - Final Revision (1).pdf`
  (src_05a0b0c29acc94017b8f, 68 pp.), catalogued as 170 slides in
  `scripts/kasr/extract/practical.json`. Terminology and the contrasts used in
  the pitfalls are taken from Prof. Dalia El Marakby's departmental handouts
  (Cytology src_0abbf6bc25c43a087d36, Blood src_450c71dc6273b2e64ca3,
  Connective tissue src_d56198df979fc164f6c6, Epithelium src_79ef34f0f9d8de85acae),
  catalogued in `scripts/kasr/extract/notes.json`.

  A practical concept is an IDENTIFICATION concept: what a student must see on
  the section, not what they must recite about it. Where a concept the slides
  assess already exists in `101-ISK-concepts.md` it is reused and does not
  reappear here. Six are reused that way: CON-HEM-5724364F46CD5A,
  CON-HEM-CC292B4D6CC61E, CON-FND-EE10AFCE944705, CON-FND-42CCE864C55A08,
  CON-FND-0FAE59E00B748E and CON-FND-89FBF21510F273.

  IDs are minted exactly as `scripts/kasr/seeds/types.ts` mints them:
  sha256 of `kau:101 ISK:<canonical_key>`, first 14 hex, upper-cased, behind
  `CON-<SYS>-`. A concept already minted from the same key collides with itself
  rather than forking.

  On the exam_signal tier. The brief for this batch asked for tier `formative`.
  `EXAM_SOURCE_TIERS` in `src/data/examSignal.ts` has no such tier, and an
  unrecognised one is silently coerced to `other` (weight 0.3). These lines
  therefore read `department_book`, which is what the practical book is and
  carries the weight it deserves (0.6). Note also that
  `scripts/kasr/seeds/types.ts` types `tier` as
  `end_of_year | end_of_module | resit | formative` — a vocabulary that shares
  only two values with the one the importer actually parses.

  Placement is on the discipline view: DIS-HIS-T01 for cells and organelles,
  DIS-HIS-T02 for the basic tissues, with DIS-HIS-T04 (Microscopy and slide
  identification) as the secondary placement every one of these earns by being
  a spot-identification concept.
-->

# Item
## label
The plasma membrane is identified on electron microscopy as a trilaminar unit membrane
## id
CON-FND-8BD70C3ED36B79
## canonical_key
unit-membrane-trilaminar-identification
## definition
At the magnification the department's plates use, the plasma membrane resolves into two electron-dense (dark) layers separated by one electron-lucent (pale) layer — the trilaminar unit membrane. Where two cells meet, two such membranes run parallel with the intercellular space between them and the cytoplasm of each cell outside them.
## explicit_objective
Identify the plasma membrane on an electron micrograph, give one visible character of it, and name the intercellular space and the cytoplasm on either side when each is separately marked.
## pitfalls
Calling the pale middle layer "the intercellular space". The pale layer lies inside one membrane; the intercellular space is the gap between the membranes of two different cells, and the examiner marks the two with different arrows on the same plate.
## concept_type
structural_description
## status
under review
## subject
fnd
## primary_node_id
DIS-HIS-T01
## secondary_node_ids
DIS-HIS-T04
## modules
101 ISK
## module_subject
101 ISK > Histology > Cytology > Cytoplasm
## universities
kau
## learner_years
1
## exam_signal
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p35 | 101 ISK
src_05a0b0c29acc94017b8f | department_book | undated | p4 | 101 ISK
## weight_confidence
0.6
## support_mode
direct_statement
## original_wording
[DPT Practical Histo 101 p.35, answer p.36] Structure outlined by red rectangle is ... / Give 1 visible character of A / Mention the structure marked by blue star / Green arrow point to ...
[Answer page] 2 dark & 1 pale layers (trilamellar); cytoplasm (blue star); intercellular space (green arrow)
## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology for this concept has not been researched yet; it is filled during the evidence pass rather than guessed.
exam_signal: the practical book and the revision deck print no year, so the year slot reads "undated" rather than a guessed sitting.

---

# Item
## label
Mitochondria are identified under the light microscope as rods or granules stained by iron haematoxylin or Janus green
## id
CON-FND-ED156BF8FBFD46
## canonical_key
mitochondria-light-microscopy-identification
## definition
Mitochondria are not resolved by routine H&E. The department demonstrates them with iron haematoxylin, which stains them dark blue, or Janus green, which stains them green; they then appear as granules or short rods scattered through the cytoplasm and concentrated in the most active part of the cell.
## explicit_objective
Identify mitochondria on a light micrograph, name a stain that demonstrates them, and give one visible character.
## pitfalls
Answering "H&E". Abundant mitochondria only make the cytoplasm acidophilic in H&E; the plate the examiner marks is an iron-haematoxylin or Janus-green preparation, and naming the stain is part of the answer.
## concept_type
structural_description
## status
under review
## subject
fnd
## primary_node_id
DIS-HIS-T01
## secondary_node_ids
DIS-HIS-T04
## modules
101 ISK
## module_subject
101 ISK > Histology > Cytology > Cytoplasm
## universities
kau
## learner_years
1
## exam_signal
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p43 | 101 ISK
## weight_confidence
0.6
## support_mode
direct_statement
## original_wording
[DPT Practical Histo 101 p.43, answer p.44] Green arrow points to ..., name a stain for it & one visible feature
[Answer page] green arrow: mitochondria; stain: iron hematoxylin or Janus green; cristae
## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology for this concept has not been researched yet; it is filled during the evidence pass rather than guessed.
exam_signal: the practical book prints no year, so the year slot reads "undated" rather than a guessed sitting.

---

# Item
## label
A mitochondrion is identified on electron microscopy by its double membrane, its cristae and its matrix
## id
CON-FND-E0B130AC5EC939
## canonical_key
mitochondrion-ultrastructure-identification
## definition
On electron microscopy a mitochondrion is a rounded or oval vesicle bounded by two unit membranes, the inner of which is thrown into shelf-like cristae projecting into an electron-dense matrix.
## explicit_objective
Identify a mitochondrion on an electron micrograph and name the cristae and the matrix separately when each is arrowed.
## pitfalls
Answering "cristae" for the arrow that points between them. The cristae are the folds of the inner membrane; the matrix is the material they project into, and the department's plate arrows both on the same organelle.
## concept_type
structural_description
## status
under review
## subject
fnd
## primary_node_id
DIS-HIS-T01
## secondary_node_ids
DIS-HIS-T04
## modules
101 ISK
## module_subject
101 ISK > Histology > Cytology > Cytoplasm
## universities
kau
## learner_years
1
## exam_signal
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p37 | 101 ISK
src_05a0b0c29acc94017b8f | department_book | undated | p6 | 101 ISK
## weight_confidence
0.6
## support_mode
direct_statement
## original_wording
[DPT Practical Histo 101 p.37, answer p.38] The organelle is called ... / Blue arrows point to ... / Arrowhead points to ...
[Answer page] blue arrows: cristae; red arrowhead: matrix
## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology for this concept has not been researched yet; it is filled during the evidence pass rather than guessed.
exam_signal: the practical book and the revision deck print no year, so the year slot reads "undated" rather than a guessed sitting.

---

# Item
## label
The Golgi apparatus is identified on electron microscopy by stacked parallel saccules with transfer vesicles on one face and secretory vesicles on the other
## id
CON-FND-89F4A730D095B7
## canonical_key
golgi-apparatus-ultrastructure-identification
## definition
On electron microscopy the Golgi apparatus is a stack of short, smooth, parallel flattened saccules. Small transfer vesicles arrive at the entry (cis) face from the rough endoplasmic reticulum and larger secretory vesicles bud from the exit (trans) face, which is why the department calls it the secretory apparatus of the cell.
## explicit_objective
Identify the Golgi apparatus on an electron micrograph, give one visible character, and tell a transfer vesicle from a secretory vesicle by the face it lies on.
## pitfalls
Reading the stack as rough endoplasmic reticulum. rER cisternae are long parallel channels studded with ribosomes; Golgi saccules are short, smooth and stacked, with vesicles at both ends.
## concept_type
structural_description
## status
under review
## subject
fnd
## primary_node_id
DIS-HIS-T01
## secondary_node_ids
DIS-HIS-T04
## modules
101 ISK
## module_subject
101 ISK > Histology > Cytology > Cytoplasm
## universities
kau
## learner_years
1
## exam_signal
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p51 | 101 ISK
src_05a0b0c29acc94017b8f | department_book | undated | p14 | 101 ISK
## weight_confidence
0.6
## support_mode
direct_statement
## original_wording
[DPT Practical Histo 101 p.51, answer p.52] Organelle is called ... & its nickname is ... / Yellow star marks ... & 1 visible feature ... / Red arrow points to ... green arrow points to ...
[Answer page] Golgi saccules parallel / stacked (yellow star); cytoplasm (blue star); transfer vesicles (red arrow); secretory vesicles (green arrow)
## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology for this concept has not been researched yet; it is filled during the evidence pass rather than guessed.
exam_signal: the practical book and the revision deck print no year, so the year slot reads "undated" rather than a guessed sitting.

---

# Item
## label
In a silver preparation the Golgi apparatus is brown fibrils or granules, perinuclear in a nerve cell and apical in a secretory cell
## id
CON-FND-F4DF782C697CCF
## canonical_key
golgi-apparatus-position-silver-stain
## definition
Silver impregnation stains the Golgi apparatus brown, as fine fibrils or granules. In a nerve cell it lies around the central rounded nucleus; in a secretory cell it lies apical to the nucleus, on the side the secretion travels towards.
## explicit_objective
Identify the Golgi apparatus on a silver-stained light micrograph, name the stain and the colour it gives, and state the organelle's position in the cell type on the plate.
## pitfalls
Giving "perinuclear" for every plate. The department sets the nerve cell and the secretory cell as a pair precisely because the position is the part of the answer that changes between them.
## concept_type
structural_description
## status
under review
## subject
fnd
## primary_node_id
DIS-HIS-T01
## secondary_node_ids
DIS-HIS-T04
## modules
101 ISK
## module_subject
101 ISK > Histology > Cytology > Cytoplasm
## universities
kau
## learner_years
1
## exam_signal
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p47 | 101 ISK
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p49 | 101 ISK
src_05a0b0c29acc94017b8f | department_book | undated | p10 | 101 ISK
## weight_confidence
0.6
## support_mode
direct_statement
## original_wording
[DPT Practical Histo 101 p.47, answer p.48] Red arrow demonstrates ... / One visible feature of organelle is ... & its position is ... / It is stained ... with ... stain
[Answer page] fine fibrils or granules; perinuclear position; nucleus central / rounded
[DPT Practical Histo 101 p.49, answer p.50] Red arrows demonstrate ... in ... cells — apical position
## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology for this concept has not been researched yet; it is filled during the evidence pass rather than guessed.
exam_signal: the practical book and the revision deck print no year, so the year slot reads "undated" rather than a guessed sitting.

---

# Item
## label
The negative Golgi image is an unstained pale zone beside the nucleus of a routinely stained secretory cell
## id
CON-FND-0492C40A7F76E7
## canonical_key
negative-golgi-image-identification
## definition
In H&E the Golgi apparatus takes neither dye, so in a cell whose remaining cytoplasm is deeply basophilic — classically the plasma cell — it appears as a clear pale area beside the nucleus. The department calls this the negative Golgi image.
## explicit_objective
Identify the negative Golgi image on a routinely stained slide and say why the Golgi appears as an absence of stain rather than a colour.
## pitfalls
Calling the pale zone a vacuole or a fat droplet. Those are sharply circumscribed and may sit anywhere in the cell; the negative Golgi image is always juxtanuclear and always in a cell whose other cytoplasm is strongly basophilic.
## concept_type
structural_description
## status
under review
## subject
fnd
## primary_node_id
DIS-HIS-T01
## secondary_node_ids
DIS-HIS-T04
## modules
101 ISK
## module_subject
101 ISK > Histology > Cytology > Cytoplasm
## universities
kau
## learner_years
1
## exam_signal
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p9 | 101 ISK
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p151 | 101 ISK
src_05a0b0c29acc94017b8f | department_book | undated | p42 | 101 ISK
## weight_confidence
0.6
## support_mode
direct_statement
## original_wording
[DPT Practical Histo 101 p.9] Negative Golgi apparatus
[DPT Practical Histo 101 p.151, answer p.152] Black arrow points to ... — negative Golgi image, on the plasma cell
## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology for this concept has not been researched yet; it is filled during the evidence pass rather than guessed.
exam_signal: the practical book and the revision deck print no year, so the year slot reads "undated" rather than a guessed sitting.

---

# Item
## label
Rough endoplasmic reticulum is identified by long parallel flattened cisternae studded with ribosomes
## id
CON-FND-08378767774524
## canonical_key
rough-endoplasmic-reticulum-ultrastructure
## definition
On electron microscopy rough endoplasmic reticulum is a system of long, regular, parallel flattened cisternae whose cytosolic surface carries ribosomes as dense granules. Abundant rER is what makes the cytoplasm of a protein-forming cell basophilic under the light microscope.
## explicit_objective
Identify rough endoplasmic reticulum on an electron micrograph, give one visible character, and state that its function is protein synthesis.
## pitfalls
Answering "ribosomes" when the arrow is on the cisternae, or "rER" when it is on the granules. The department's plate arrows the two separately and marks them as separate answers.
## concept_type
structural_description
## status
under review
## subject
fnd
## primary_node_id
DIS-HIS-T01
## secondary_node_ids
DIS-HIS-T04
## modules
101 ISK
## module_subject
101 ISK > Histology > Cytology > Cytoplasm
## universities
kau
## learner_years
1
## exam_signal
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p41 | 101 ISK
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p39 | 101 ISK
src_05a0b0c29acc94017b8f | department_book | undated | p6 | 101 ISK
## weight_confidence
0.6
## support_mode
direct_statement
## original_wording
[DPT Practical Histo 101 p.41, answer p.42] Arrows point to ..., its main function ...
[Answer page] arrows: ribosomes; function: protein synthesis
[DPT Practical Histo 101 p.39, answer p.40] Organelle pointed to by the yellow arrows is ... / Mention 1 visible character for C — rER: parallel tubules / covered by ribosomes
## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology for this concept has not been researched yet; it is filled during the evidence pass rather than guessed.
exam_signal: the practical book and the revision deck print no year, so the year slot reads "undated" rather than a guessed sitting.

---

# Item
## label
Smooth endoplasmic reticulum is identified by a ribosome-free surface and vesicles of differing size and shape
## id
CON-FND-369A1D27DFE0DD
## canonical_key
smooth-endoplasmic-reticulum-ultrastructure
## definition
On electron microscopy smooth endoplasmic reticulum is an anastomosing system of tubules and vesicles of different size and shape whose surface carries no ribosomes. Where it is abundant the cytoplasm is acidophilic, and it is concentrated in the parts of the cell that handle lipid.
## explicit_objective
Identify smooth endoplasmic reticulum on an electron micrograph and give one visible feature the answer page accepts.
## pitfalls
Learning only the word "smooth". The department's answer page lists three characters — smooth surface, no ribosomes, and vesicles of different size and shape — and a student holding only the first cannot defend the identification when asked for a second feature.
## concept_type
structural_description
## status
under review
## subject
fnd
## primary_node_id
DIS-HIS-T01
## secondary_node_ids
DIS-HIS-T04
## modules
101 ISK
## module_subject
101 ISK > Histology > Cytology > Cytoplasm
## universities
kau
## learner_years
1
## exam_signal
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p45 | 101 ISK
src_05a0b0c29acc94017b8f | department_book | undated | p8 | 101 ISK
## weight_confidence
0.6
## support_mode
direct_statement
## original_wording
[DPT Practical Histo 101 p.45, answer p.46] Name the organelle pointed to by the yellow arrow / Mention one visible feature
[Answer page] smooth surface; no ribosomes; vesicles of different size and shape
## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology for this concept has not been researched yet; it is filled during the evidence pass rather than guessed.
exam_signal: the practical book and the revision deck print no year, so the year slot reads "undated" rather than a guessed sitting.

---

# Item
## label
Rough and smooth endoplasmic reticulum are told apart on one micrograph by ribosomes, not by shape
## id
CON-FND-82768007A697F1
## canonical_key
rough-versus-smooth-endoplasmic-reticulum-electron-microscopy
## definition
The department sets a plate showing both systems in one field. The rough system is recognised by ribosomes on its cytosolic face and by long regular parallel cisternae; the smooth system by a bare surface and by tubules and vesicles of varying size. The two are continuous with each other, so the surface, not the outline, is the discriminator.
## explicit_objective
On a micrograph carrying both, say which profile is rough and which is smooth and give the character that decides each.
## pitfalls
Deciding by profile shape. A tangentially cut rER cisterna looks vesicular and a distended sER tubule looks flattened; only the presence or absence of ribosomes settles it.
## concept_type
structural_description
## status
under review
## subject
fnd
## primary_node_id
DIS-HIS-T01
## secondary_node_ids
DIS-HIS-T04
## modules
101 ISK
## module_subject
101 ISK > Histology > Cytology > Cytoplasm
## universities
kau
## learner_years
1
## exam_signal
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p13 | 101 ISK
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p12 | 101 ISK
## weight_confidence
0.6
## support_mode
direct_statement
## original_wording
[DPT Practical Histo 101 p.13] EM of Smooth & Rough Endoplasmic Reticulum
[DPT Practical Histo 101 p.12] EM of Smooth Endoplasmic Reticulum & Mitochondrion
## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology for this concept has not been researched yet; it is filled during the evidence pass rather than guessed.
exam_signal: the practical book and the revision deck print no year, so the year slot reads "undated" rather than a guessed sitting.

---

# Item
## label
Nissl's granules are the basophilic clumps of rough endoplasmic reticulum seen in a nerve cell body
## id
CON-FND-4AE74C678A6F64
## canonical_key
nissl-granules-identification
## definition
In a stained nerve cell the cytoplasm carries coarse basophilic clumps, Nissl's granules. They are aggregates of rough endoplasmic reticulum with free ribosomes; their basophilia is the light-microscopic expression of the ribosomal RNA in them.
## explicit_objective
Identify Nissl's granules in a nerve cell and state what organelle they are made of.
## pitfalls
Naming them as an organelle in their own right. The examiner expects the student to say rough endoplasmic reticulum with ribosomes; "Nissl granules" alone names the appearance, not the structure.
## concept_type
structural_description
## status
under review
## subject
fnd
## primary_node_id
DIS-HIS-T01
## secondary_node_ids
DIS-HIS-T04
## modules
101 ISK
## module_subject
101 ISK > Histology > Cytology > Cytoplasm
## universities
kau
## learner_years
1
## exam_signal
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p18 | 101 ISK
## weight_confidence
0.6
## support_mode
direct_statement
## original_wording
[DPT Practical Histo 101 p.18] Nissl's granules in nerve cell
## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology for this concept has not been researched yet; it is filled during the evidence pass rather than guessed.
exam_signal: the practical book and the revision deck print no year, so the year slot reads "undated" rather than a guessed sitting.

---

# Item
## label
A ribosome is identified on a labelled diagram by its two subunits and the mRNA, tRNA and growing chain they hold
## id
CON-FND-ACF503263BA7D7
## canonical_key
ribosome-structure-identification
## definition
A ribosome is a non-membranous particle of ribosomal RNA and protein, formed of a small and a large subunit united by the mRNA strand. The department's labelled plate names the two subunits, the P and A sites, the tRNA, the codon on the mRNA and the growing amino-acid chain.
## explicit_objective
Name the parts of a ribosome on a labelled diagram and say where in the cell free ribosomes and attached ribosomes send their product.
## pitfalls
Swapping the subunits. The large subunit carries the groove that the polypeptide chain passes through and is the one that binds the rER membrane; the small subunit is the one the mRNA is read against.
## concept_type
structural_description
## status
under review
## subject
fnd
## primary_node_id
DIS-HIS-T01
## secondary_node_ids
DIS-HIS-T04
## modules
101 ISK
## module_subject
101 ISK > Histology > Cytology > Cytoplasm
## universities
kau
## learner_years
1
## exam_signal
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p19 | 101 ISK
## weight_confidence
0.6
## support_mode
direct_statement
## original_wording
[DPT Practical Histo 101 p.19] Ribosome (labelled diagram): large ribosomal subunit; small ribosomal subunit; P-site; A-site; amino acid chain (protein); tRNA; mRNA; codon
## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology for this concept has not been researched yet; it is filled during the evidence pass rather than guessed.
exam_signal: the practical book and the revision deck print no year, so the year slot reads "undated" rather than a guessed sitting.

---

# Item
## label
A centriole is identified in transverse section by nine triplets of microtubules and no central pair
## id
CON-FND-759499A4A27938
## canonical_key
centriole-ultrastructure-identification
## definition
A centriole is a short cylinder whose wall is built of twenty-seven microtubules arranged as nine triplets, with nothing in the centre. Two centrioles lie at right angles near the nucleus, and a single centriole embedded in the cytoplasm is the basal body of a cilium.
## explicit_objective
Identify a centriole on an electron micrograph and state that its microtubules are arranged as nine triplets.
## pitfalls
Answering "nine doublets and two singlets", which is the axoneme of the cilium's shaft, not the centriole. The department teaches the two on facing plates: 9 x 3 = 27 in the centriole and basal body, 9 x 2 + 2 = 20 in the shaft.
## concept_type
structural_description
## status
under review
## subject
fnd
## primary_node_id
DIS-HIS-T01
## secondary_node_ids
DIS-HIS-T04
## modules
101 ISK
## module_subject
101 ISK > Histology > Cytology > Cytoplasm
## universities
kau
## learner_years
1
## exam_signal
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p55 | 101 ISK
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p21 | 101 ISK
src_05a0b0c29acc94017b8f | department_book | undated | p16 | 101 ISK
## weight_confidence
0.6
## support_mode
direct_statement
## original_wording
[DPT Practical Histo 101 p.55, answer p.56] The organelle is called ... / Red arrows point to ..., arranged as ...
[Answer page] red arrow: microtubules; arranged as 9 triplets
## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology for this concept has not been researched yet; it is filled during the evidence pass rather than guessed.
exam_signal: the practical book and the revision deck print no year, so the year slot reads "undated" rather than a guessed sitting.

---

# Item
## label
A microvillus is told from a cilium on electron microscopy by having no microtubules and a pale core
## id
CON-FND-942169C7CEC1CA
## canonical_key
microvillus-versus-cilium-electron-microscopy
## definition
On the department's plate both projections are cut in the same field. The cilium is the larger, and its shaft contains an axoneme of about twenty microtubules — nine peripheral doublets and two central singlets. The microvillus is small, has a pale core containing no microtubules, and is covered by the same cell membrane.
## explicit_objective
On a micrograph showing both, identify each projection and give the character that separates them.
## pitfalls
Deciding by length alone. Stereocilia are long microvilli and are longer than many cilia; what settles the identification is the microtubule content of the core.
## concept_type
structural_description
## status
under review
## subject
fnd
## primary_node_id
DIS-HIS-T01
## secondary_node_ids
DIS-HIS-T04
## modules
101 ISK
## module_subject
101 ISK > Histology > Epithelial Tissues > Polarity and Membranous Specializations
## universities
kau
## learner_years
1
## exam_signal
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p59 | 101 ISK
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p23 | 101 ISK
src_05a0b0c29acc94017b8f | department_book | undated | p18 | 101 ISK
## weight_confidence
0.6
## support_mode
direct_statement
## original_wording
[DPT Practical Histo 101 p.59, answer p.60] Red square surrounds ..., give 1 character / Blue square surrounds ..., give 1 character / Yellow arrows point to ...
[Answer page] shaft of cilium / axoneme formed of ~20 microtubules; microvilli: no microtubules, pale core, small; cell membrane
## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology for this concept has not been researched yet; it is filled during the evidence pass rather than guessed.
exam_signal: the practical book and the revision deck print no year, so the year slot reads "undated" rather than a guessed sitting.

---

# Item
## label
Glycogen is identified as red granules in liver cells after Best's carmine or PAS
## id
CON-FND-7650D31963FEBD
## canonical_key
glycogen-inclusion-identification
## definition
Glycogen dissolves during routine processing and leaves vacuoles in H&E. It is demonstrated by Best's carmine, which gives red granules, or by PAS, which gives magenta-red; the department's plate is of liver cells.
## explicit_objective
Identify glycogen as the inclusion on a stained plate, name a stain that demonstrates it, give one visible character, and name the cell it is shown in.
## pitfalls
Naming Sudan III. Sudan stains fat, and the department prints the glycogen plate and the fat plate side by side as figures a and b of one question so that the two stains have to be told apart.
## concept_type
structural_description
## status
under review
## subject
fnd
## primary_node_id
DIS-HIS-T01
## secondary_node_ids
DIS-HIS-T04
## modules
101 ISK
## module_subject
101 ISK > Histology > Cytology > Cytoplasm
## universities
kau
## learner_years
1
## exam_signal
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p61 | 101 ISK
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p24 | 101 ISK
src_05a0b0c29acc94017b8f | department_book | undated | p20 | 101 ISK
## weight_confidence
0.6
## support_mode
direct_statement
## original_wording
[DPT Practical Histo 101 p.61, answer p.62] Identify inclusions in fig. a & b / Name the used stains for fig. a & b / Give visible character for fig. a & b / Name the cell in fig. a & b
[Answer page] fig a: glycogen, red granules, liver cells
## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology for this concept has not been researched yet; it is filled during the evidence pass rather than guessed.
exam_signal: the practical book and the revision deck print no year, so the year slot reads "undated" rather than a guessed sitting.

---

# Item
## label
Fat is identified as a large orange droplet in an adipocyte after Sudan III, and as an empty vacuole in H&E
## id
CON-FND-53E16F5D4E3538
## canonical_key
fat-inclusion-identification
## definition
Fat dissolves in the solvents used for routine processing, so in H&E an adipocyte shows an empty vacuole with the nucleus and cytoplasm pushed to the rim. Sudan III preserves and stains it, giving a large orange droplet in the same cell.
## explicit_objective
Identify fat as the inclusion, name the stain used on the plate in front of you, and give the visible character that stain produces.
## pitfalls
Reading the H&E plate as "no fat". The empty vacuole is the fat; the department sets the H&E and Sudan III plates as a pair so that the student learns the vacuole and the orange droplet are the same droplet differently handled.
## concept_type
structural_description
## status
under review
## subject
fnd
## primary_node_id
DIS-HIS-T01
## secondary_node_ids
DIS-HIS-T04
## modules
101 ISK
## module_subject
101 ISK > Histology > Cytology > Cytoplasm
## universities
kau
## learner_years
1
## exam_signal
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p61 | 101 ISK
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p25 | 101 ISK
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p26 | 101 ISK
## weight_confidence
0.6
## support_mode
direct_statement
## original_wording
[DPT Practical Histo 101 p.61, answer p.62] fig b: lipid/fat, large orange droplet, fat cells (adipocytes); stain Sudan III
[DPT Practical Histo 101 p.25] Inclusions - Fat cells, H&E
[DPT Practical Histo 101 p.26] Inclusions - Fat cells, Sudan III
## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology for this concept has not been researched yet; it is filled during the evidence pass rather than guessed.
exam_signal: the practical book and the revision deck print no year, so the year slot reads "undated" rather than a guessed sitting.

---

# Item
## label
An open-face nucleus is pale and euchromatic and belongs to an active cell; a closed-face nucleus is dark and heterochromatic
## id
CON-FND-E2DE55693981A7
## canonical_key
open-versus-closed-face-nucleus
## definition
Under the light microscope a vesicular or open-face nucleus is pale and basophilic only faintly, because its chromatin is extended; it belongs to an active, protein-forming cell such as a nerve cell. A closed-face nucleus is small and darkly basophilic because its chromatin is condensed, as in a small lymphocyte.
## explicit_objective
Tell an open-face from a closed-face nucleus on a light micrograph and say what each implies about the cell's activity.
## pitfalls
Reading pallor as poor staining. The paleness is the diagnosis, not an artefact — it means the chromatin is uncoiled and the cell is synthesising.
## concept_type
structural_description
## status
under review
## subject
fnd
## primary_node_id
DIS-HIS-T01
## secondary_node_ids
DIS-HIS-T04
## modules
101 ISK
## module_subject
101 ISK > Histology > Cytology > Nucleus
## universities
kau
## learner_years
1
## exam_signal
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p27 | 101 ISK
## weight_confidence
0.6
## support_mode
direct_statement
## original_wording
[DPT Practical Histo 101 p.27] LM of open & closed face nuclei: open face nucleus; closed face nucleus
## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology for this concept has not been researched yet; it is filled during the evidence pass rather than guessed.
exam_signal: the practical book and the revision deck print no year, so the year slot reads "undated" rather than a guessed sitting.

---

# Item
## label
The nuclear envelope is identified on electron microscopy as two membranes with a perinuclear space, interrupted by nuclear pores
## id
CON-FND-C81FD3E574D3AA
## canonical_key
nuclear-envelope-ultrastructure
## definition
The nuclear envelope is two parallel unit membranes separated by the perinuclear space and interrupted where the two fuse at a nuclear pore. The outer membrane carries ribosomes and is continuous with the rough endoplasmic reticulum; the nucleolus is a separate rounded deeply basophilic mass inside the nucleus and not part of the envelope.
## explicit_objective
Identify the nuclear membrane, the perinuclear space and a nuclear pore on an electron micrograph, and distinguish them from the nucleolus.
## pitfalls
Answering "nuclear membrane" for the arrow on the nucleolus. The department arrows the two on the same plate, and the nucleolus is inside the nucleus with no limiting membrane of its own.
## concept_type
structural_description
## status
under review
## subject
fnd
## primary_node_id
DIS-HIS-T01
## secondary_node_ids
DIS-HIS-T04
## modules
101 ISK
## module_subject
101 ISK > Histology > Cytology > Nucleus
## universities
kau
## learner_years
1
## exam_signal
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p63 | 101 ISK
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p31 | 101 ISK
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p73 | 101 ISK
## weight_confidence
0.6
## support_mode
direct_statement
## original_wording
[DPT Practical Histo 101 p.63, answer p.64] Blue arrow points to ... / Red arrow points to ...
[Answer page] blue arrow: nucleolus; red arrow: nuclear membrane
[DPT Practical Histo 101 p.73] E.M. of Nucleus (labelled): outer nuclear layer; inner nuclear layer
## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology for this concept has not been researched yet; it is filled during the evidence pass rather than guessed.
exam_signal: the practical book and the revision deck print no year, so the year slot reads "undated" rather than a guessed sitting.

---

# Item
## label
A euchromatic and a heterochromatic nucleus are told apart on electron microscopy by how much condensed chromatin they carry
## id
CON-FND-BAABF179A898ED
## canonical_key
euchromatic-versus-heterochromatic-nucleus
## definition
Both nuclei show the same components — peripheral heterochromatin on the inner membrane, chromatin islands in the nuclear sap, nucleolus-associated chromatin, the nucleolus, the nuclear membrane and its pores. What separates them is proportion: the heterochromatic nucleus is dominated by condensed chromatin and belongs to an inactive cell; the euchromatic nucleus is mostly pale nuclear sap with a clear nucleolus and belongs to an active one.
## explicit_objective
State whether an electron micrograph shows a euchromatic or a heterochromatic nucleus, be specific about which, and name the peripheral heterochromatin, the chromatin islands, the nucleolus and the nuclear pore when arrowed.
## pitfalls
Answering only "nucleus". The department's stem says be specific, and a nucleus named without its chromatin state earns nothing.
## concept_type
structural_description
## status
under review
## subject
fnd
## primary_node_id
DIS-HIS-T01
## secondary_node_ids
DIS-HIS-T04
## modules
101 ISK
## module_subject
101 ISK > Histology > Cytology > Nucleus
## universities
kau
## learner_years
1
## exam_signal
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p65 | 101 ISK
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p67 | 101 ISK
src_05a0b0c29acc94017b8f | department_book | undated | p22 | 101 ISK
src_05a0b0c29acc94017b8f | department_book | undated | p24 | 101 ISK
## weight_confidence
0.6
## support_mode
direct_statement
## original_wording
[DPT Practical Histo 101 p.65, answer p.66] Identify the structure (be specific) / Identify red arrow & green arrow / Identify yellow arrow & yellow star / Arrow head points to ...
[Answer page, heterochromatic] peripheral heterochromatin; chromatin island; nucleolus associated chromatin; nuclear sap / euchromatin; nuclear membrane
[DPT Practical Histo 101 p.67, answer p.68, euchromatic] nucleolus (yellow arrow); nuclear pore (arrowhead)
## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology for this concept has not been researched yet; it is filled during the evidence pass rather than guessed.
exam_signal: the practical book and the revision deck print no year, so the year slot reads "undated" rather than a guessed sitting.

---

# Item
## label
A Leishman-stained blood film is recognised as a preparation before any cell in it is named
## id
CON-HEM-1935D59A1D2839
## canonical_key
leishman-blood-film-survey-identification
## definition
A blood film is a drop of blood spread on a slide, dried and stained with a neutral stain — Leishman's, which is methylene blue plus eosin in methyl alcohol. The field is a monolayer dominated by acidophilic non-nucleated erythrocytes, with occasional nucleated leucocytes and small platelet fragments between them. Every spot question in this block opens by asking what the preparation is and what stained it.
## explicit_objective
State that a slide is a blood film and name Leishman's as the stain before identifying any individual cell in it.
## pitfalls
Starting with the marked cell. The department's stem is "This is a ..., stained with ..." and carries marks of its own; a student who answers only "neutrophil" has left the first half of the question blank.
## concept_type
structural_description
## status
under review
## subject
haem
## primary_node_id
DIS-HIS-T02
## secondary_node_ids
DIS-HIS-T04 | SYS-HEM-T01-S02-M02
## modules
101 ISK
## module_subject
101 ISK > Histology > Blood > Red Blood Corpuscles
101 ISK > Histology > Blood > Granular leukocytes
101 ISK > Histology > Blood > Blood Platelets
## universities
kau
## learner_years
1
## exam_signal
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p83 | 101 ISK
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p90 | 101 ISK
src_05a0b0c29acc94017b8f | department_book | undated | p57 | 101 ISK
## weight_confidence
0.6
## support_mode
direct_statement
## original_wording
[DPT Practical Histo 101 p.90, answer p.91] This is a ..., stained by ...
[DPT Practical Histo 101 p.83] A blood film showing different blood elements: neutrophil; eosinophil; basophil
## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology for this concept has not been researched yet; it is filled during the evidence pass rather than guessed.
exam_signal: the practical book and the revision deck print no year, so the year slot reads "undated" rather than a guessed sitting.

---

# Item
## label
The Barr body is a drumstick appendage on the segmented nucleus of a female neutrophil
## id
CON-HEM-DD758E69648658
## canonical_key
barr-body-neutrophil-identification
## definition
In about 3 to 6 per cent of the neutrophils of a female, one segment of the nucleus carries a small drumstick-shaped appendage joined by a thin chromatin thread. This is the Barr body, the condensed inactive X chromosome.
## explicit_objective
Identify a Barr body on a marked neutrophil in a blood film and say what it represents.
## pitfalls
Calling the drumstick an extra nuclear lobe and counting it. A lobe is the size of the others and joined like them; the Barr body is much smaller and hangs off one segment, and the same plate marks the ordinary lobes separately.
## concept_type
structural_description
## status
under review
## subject
haem
## primary_node_id
DIS-HIS-T02
## secondary_node_ids
DIS-HIS-T04 | SYS-HEM-T01-S01-M02
## modules
101 ISK
## module_subject
101 ISK > Histology > Blood > Granular leukocytes
## universities
kau
## learner_years
1
## exam_signal
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p92 | 101 ISK
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p78 | 101 ISK
## weight_confidence
0.6
## support_mode
direct_statement
## original_wording
[DPT Practical Histo 101 p.92, answer p.93] Red arrow points to ... characterized by ..., while the green arrow points to ...
[Answer page] neutrophil: segmented / multilobed nucleus (red arrow); Barr body (green arrow); platelets (yellow arrow)
## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology for this concept has not been researched yet; it is filled during the evidence pass rather than guessed.
exam_signal: the practical book and the revision deck print no year, so the year slot reads "undated" rather than a guessed sitting.

---

# Item
## label
A basophil is identified by large basophilic granules that mask its S-shaped nucleus
## id
CON-HEM-1F7D2D1717F91A
## canonical_key
basophil-identification-blood-film
## definition
The basophil is the rarest leucocyte at 0 to 1 per cent. Its cytoplasm is filled with large granules that stain basophilic, and metachromatically purple with toluidine blue because of their heparin; the granules are numerous enough to obscure the irregular, segmented, S-shaped nucleus underneath them.
## explicit_objective
Identify a basophil in a blood film, give the character of its granules and describe what the granules do to the visibility of its nucleus.
## pitfalls
Confusing it with the mast cell. Both carry coarse metachromatic granules, but the mast cell is a connective-tissue cell with a pale rounded nucleus and is never a cell of the blood film; a basophil found outside a film is a mast cell misnamed.
## concept_type
structural_description
## status
under review
## subject
haem
## primary_node_id
DIS-HIS-T02
## secondary_node_ids
DIS-HIS-T04 | SYS-HEM-T01-S01-M02
## modules
101 ISK
## module_subject
101 ISK > Histology > Blood > Granular leukocytes
## universities
kau
## learner_years
1
## exam_signal
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p96 | 101 ISK
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p106 | 101 ISK
src_05a0b0c29acc94017b8f | department_book | undated | p63 | 101 ISK
## weight_confidence
0.6
## support_mode
direct_statement
## original_wording
[DPT Practical Histo 101 p.96, answer p.97] Red arrow points to ..., characterized by ... granules & nucleus is ...
[Answer page] basophil: basophilic granules, nucleus S-shaped / masked by granules
## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology for this concept has not been researched yet; it is filled during the evidence pass rather than guessed.
exam_signal: the practical book and the revision deck print no year, so the year slot reads "undated" rather than a guessed sitting.

---

# Item
## label
Lymphocyte and monocyte are told apart on a film by nuclear shape and by the look of the cytoplasm
## id
CON-HEM-29CA381FD3707B
## canonical_key
lymphocyte-versus-monocyte-blood-film
## definition
Both are non-granular leucocytes. The small lymphocyte is the smaller cell, with a dark heterochromatic nucleus that fills it and a thin rim of pale basophilic cytoplasm. The monocyte is the largest leucocyte at 13 to 20 micrometres, with a large eccentric pale kidney-shaped nucleus and abundant cytoplasm of a frosted-glass appearance given to it by fine azurophilic granules.
## explicit_objective
Identify a lymphocyte and a monocyte in the same blood film and give the nuclear and cytoplasmic character that separates them.
## pitfalls
Calling a large lymphocyte a monocyte. A large lymphocyte also has a pale indented nucleus and abundant cytoplasm, but its cytoplasm is deeply basophilic rather than frosted-glass, and its nucleus is not kidney-shaped.
## concept_type
structural_description
## status
under review
## subject
haem
## primary_node_id
DIS-HIS-T02
## secondary_node_ids
DIS-HIS-T04 | SYS-HEM-T01-S01-M02
## modules
101 ISK
## module_subject
101 ISK > Histology > Blood > Non granular leukocytes
## universities
kau
## learner_years
1
## exam_signal
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p100 | 101 ISK
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p104 | 101 ISK
src_05a0b0c29acc94017b8f | department_book | undated | p61 | 101 ISK
## weight_confidence
0.6
## support_mode
direct_statement
## original_wording
[DPT Practical Histo 101 p.104, answer p.105] Blue arrow points to ..., characterized by ... nucleus and the cytoplasm shows ... appearance / Red arrow points to ...
[Answer page] monocyte: kidney shaped nucleus, frosted glass cytoplasm; lymphocyte
[DPT Practical Histo 101 p.100, answer p.101] Red arrow points to ..., characterized by ... nucleus surrounded by ... cytoplasm — lymphocyte: dark nucleus, thin rim / little cytoplasm
## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology for this concept has not been researched yet; it is filled during the evidence pass rather than guessed.
exam_signal: the practical book and the revision deck print no year, so the year slot reads "undated" rather than a guessed sitting.

---

# Item
## label
A platelet is identified on a film as a small non-nucleated cytoplasmic fragment, often in clumps
## id
CON-HEM-9A7C4752AA21E3
## canonical_key
platelet-identification-blood-film
## definition
Platelets are small oval non-nucleated fragments of megakaryocyte cytoplasm, 2 to 4 micrometres across — far smaller than any leucocyte and smaller than a red cell. On a stained film each shows a pale peripheral hyalomere and a central granular granulomere, and they commonly lie in small clumps between the erythrocytes.
## explicit_objective
Identify platelets in a blood film and give the character that separates them from a small leucocyte and from cell debris.
## pitfalls
Reading a clump of platelets as a single nucleated cell. The absence of a nucleus is the point: a platelet is not a cell, and the department's answer page names it a fragment.
## concept_type
structural_description
## status
under review
## subject
haem
## primary_node_id
DIS-HIS-T02
## secondary_node_ids
DIS-HIS-T04 | SYS-HEM-T01-S01-M03
## modules
101 ISK
## module_subject
101 ISK > Histology > Blood > Blood Platelets
## universities
kau
## learner_years
1
## exam_signal
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p102 | 101 ISK
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p84 | 101 ISK
src_05a0b0c29acc94017b8f | department_book | undated | p57 | 101 ISK
## weight_confidence
0.6
## support_mode
direct_statement
## original_wording
[DPT Practical Histo 101 p.102, answer p.103] The arrow in A points to ... / The boxed area in B shows ...
[Answer page] platelets (arrow in field A); lymphocytes (boxed area in field B)
## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology for this concept has not been researched yet; it is filled during the evidence pass rather than guessed.
exam_signal: the practical book and the revision deck print no year, so the year slot reads "undated" rather than a guessed sitting.

---

# Item
## label
An erythrocyte is identified by being non-nucleated, acidophilic and centrally pale
## id
CON-HEM-4F5347CC3664E0
## canonical_key
erythrocyte-identification-blood-film
## definition
On a Leishman-stained film the erythrocyte is a rounded non-nucleated acidophilic disc about 7.5 micrometres across, with a central pallor of about one third of its diameter produced by its biconcavity. A crenated cell is the same cell shrunken in a hypertonic medium and shows notches at its edge.
## explicit_objective
Identify an erythrocyte in a blood film, give the character the answer page asks for, and tell a normal cell from a crenated one on the same plate.
## pitfalls
Calling the central pallor a nucleus or a vacuole. It is thinning, not a hole; the mature red cell has no nucleus at all, which is the character the examiner is asking for.
## concept_type
structural_description
## status
under review
## subject
haem
## primary_node_id
DIS-HIS-T02
## secondary_node_ids
DIS-HIS-T04 | SYS-HEM-T01-S01-M01
## modules
101 ISK
## module_subject
101 ISK > Histology > Blood > Red Blood Corpuscles
## universities
kau
## learner_years
1
## exam_signal
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p90 | 101 ISK
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p76 | 101 ISK
src_05a0b0c29acc94017b8f | department_book | undated | p57 | 101 ISK
## weight_confidence
0.6
## support_mode
direct_statement
## original_wording
[DPT Practical Histo 101 p.90, answer p.91] Green arrow points to ..., characterized by ... / Blue arrow points to ...
[Answer page] RBC with central pallor (green arrow); crenated RBC (blue arrow)
## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology for this concept has not been researched yet; it is filled during the evidence pass rather than guessed.
exam_signal: the practical book and the revision deck print no year, so the year slot reads "undated" rather than a guessed sitting.

---

# Item
## label
A reticulocyte is only seen in a supravital preparation, where cresyl blue precipitates its ribosomal remnants as a reticulum
## id
CON-HEM-C020FBF779203C
## canonical_key
reticulocyte-supravital-identification
## definition
The reticulocyte is the last stage before the mature red cell. It is acidophilic like a red cell but still holds remnants of ribosomes and polysomes; these are precipitated into a visible blue network only by a supravital stain such as cresyl blue, applied to living cells. Reticulocytes do not exceed one per cent of the cells in peripheral blood.
## explicit_objective
State that a slide is a supravital preparation, name cresyl blue as the stain and say that it is supravital, and identify the marked reticulocyte.
## pitfalls
Answering "Leishman". Leishman's is applied to a fixed dried film and shows no reticulum at all; the whole point of this plate is that the reticulum exists only while the cell is alive.
## concept_type
structural_description
## status
under review
## subject
haem
## primary_node_id
DIS-HIS-T02
## secondary_node_ids
DIS-HIS-T04 | SYS-HEM-T01-S01-M01
## modules
101 ISK
## module_subject
101 ISK > Histology > Blood > Haemopoiesis
## universities
kau
## learner_years
1
## exam_signal
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p114 | 101 ISK
src_05a0b0c29acc94017b8f | department_book | undated | p67 | 101 ISK
## weight_confidence
0.6
## support_mode
direct_statement
## original_wording
[DPT Practical Histo 101 p.114, answer p.115] This is a ... stained with ... which is a ... stain / Name the cell pointed out by red arrow
[Answer page] reticulocyte; cresyl blue is a supravital stain
## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology for this concept has not been researched yet; it is filled during the evidence pass rather than guessed.
exam_signal: the practical book and the revision deck print no year, so the year slot reads "undated" rather than a guessed sitting.

---

# Item
## label
Bone marrow is identified by its fat cells and by the megakaryocyte, the largest cell with a single multilobed nucleus
## id
CON-HEM-CF325DABA0EA62
## canonical_key
megakaryocyte-and-bone-marrow-identification
## definition
A bone marrow section is a crowded field of developing blood cells among fat cells, which are the largest cells of the marrow stroma. The megakaryocyte stands out at 50 to 70 micrometres with one very large multilobed dark nucleus and basophilic cytoplasm from which platelets detach.
## explicit_objective
Identify a section as bone marrow and name the megakaryocyte and the fat cells when each is arrowed.
## pitfalls
Reading the megakaryocyte's single multilobed nucleus as several nuclei and calling the cell multinucleated, or calling it an osteoclast. The megakaryocyte's lobes belong to one nucleus, and the department's stem asks first for the tissue, which osteoclasts would not identify.
## concept_type
structural_description
## status
under review
## subject
haem
## primary_node_id
DIS-HIS-T02
## secondary_node_ids
DIS-HIS-T04 | SYS-HEM-T01-S02-M03
## modules
101 ISK
## module_subject
101 ISK > Histology > Blood > Haemopoiesis
## universities
kau
## learner_years
1
## exam_signal
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p110 | 101 ISK
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p108 | 101 ISK
src_05a0b0c29acc94017b8f | department_book | undated | p65 | 101 ISK
## weight_confidence
0.6
## support_mode
direct_statement
## original_wording
[DPT Practical Histo 101 p.110, answer p.111] Identify the tissue / The blue arrow points to ...
[DPT Practical Histo 101 p.108, answer p.109] Identify the tissue / The red arrows point to ... — fat cells / adipocytes
[DPT 1 Final Revision p.65, answer p.66] fat cells / adipocytes (red arrows); megakaryocyte (blue arrow)
## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology for this concept has not been researched yet; it is filled during the evidence pass rather than guessed.
exam_signal: the practical book and the revision deck print no year, so the year slot reads "undated" rather than a guessed sitting.

---

# Item
## label
The fibroblast is the commonest connective-tissue cell, recognised on section by its nucleus alone
## id
CON-FND-2030501B814D35
## canonical_key
fibroblast-versus-fibrocyte-identification
## definition
In an ordinary section of connective tissue the fibroblast's cytoplasm blends into the matrix and only the nucleus is visible: oval, pale, with a prominent nucleolus in the active fibroblast, smaller and darker in the resting fibrocyte. It is the cell the department expects to be named between the collagen bundles.
## explicit_objective
Identify a fibroblast or fibrocyte on a connective-tissue section from its nucleus and its position among the fibres.
## pitfalls
Naming an endothelial nucleus in a capillary wall instead. The fibroblast lies free among the fibre bundles; an endothelial nucleus bulges into a lumen, and loose areolar tissue is full of small vessels.
## concept_type
structural_description
## status
under review
## subject
fnd
## primary_node_id
DIS-HIS-T02
## secondary_node_ids
DIS-HIS-T04
## modules
101 ISK
## module_subject
101 ISK > Histology > Connective Tissue > Connective Tissue Cells
## universities
kau
## learner_years
1
## exam_signal
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p143 | 101 ISK
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p141 | 101 ISK
src_05a0b0c29acc94017b8f | department_book | undated | p40 | 101 ISK
## weight_confidence
0.6
## support_mode
direct_statement
## original_wording
[DPT Practical Histo 101 p.143, answer p.144] Name cell pointed out by arrow / Arrowhead points to ...
[Answer page] fibrocyte (or fibroblast) (arrow); collagen bundles (arrowhead)
## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology for this concept has not been researched yet; it is filled during the evidence pass rather than guessed.
exam_signal: the practical book and the revision deck print no year, so the year slot reads "undated" rather than a guessed sitting.

---

# Item
## label
A macrophage is identified by an irregular outline, a dark kidney-shaped nucleus and ingested vital dye
## id
CON-FND-90E8073879B42A
## canonical_key
macrophage-identification-vital-stain
## definition
The macrophage is a large irregular connective-tissue cell with pale basophilic cytoplasm and a dark kidney-shaped nucleus. Its specific demonstration is a vital stain — trypan blue or India ink — which the cell phagocytoses, so the granules of dye inside it are the identification.
## explicit_objective
Identify a macrophage on a section and name the vital stain that demonstrates it.
## pitfalls
Confusing it with a monocyte. They are the same lineage, but the monocyte is the circulating form named on a blood film; a phagocytic cell sitting in connective tissue full of dye is a macrophage.
## concept_type
structural_description
## status
under review
## subject
fnd
## primary_node_id
DIS-HIS-T02
## secondary_node_ids
DIS-HIS-T04
## modules
101 ISK
## module_subject
101 ISK > Histology > Connective Tissue > Connective Tissue Cells
## universities
kau
## learner_years
1
## exam_signal
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p120 | 101 ISK
## weight_confidence
0.6
## support_mode
direct_statement
## original_wording
[DPT Practical Histo 101 p.120] Macrophage
## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology for this concept has not been researched yet; it is filled during the evidence pass rather than guessed.
exam_signal: the practical book and the revision deck print no year, so the year slot reads "undated" rather than a guessed sitting.

---

# Item
## label
A plasma cell is identified by deeply basophilic cytoplasm, an eccentric cart-wheel nucleus and a negative Golgi image
## id
CON-FND-B83D7EAAF68D3B
## canonical_key
plasma-cell-identification
## definition
The plasma cell is a large oval cell with deeply basophilic cytoplasm from its rich rough endoplasmic reticulum. Its nucleus is single and eccentric, with heterochromatin alternating with euchromatin in the cart-wheel pattern, and the pale unstained juxtanuclear zone beside it is the negative Golgi image.
## explicit_objective
Identify a plasma cell on a section and give two visible characters of its nucleus.
## pitfalls
Confusing it with the mast cell, which the department prints on the same plate. Both are basophilic, but the mast cell's basophilia is granular and metachromatic and its nucleus is pale, central and rounded; the plasma cell's basophilia is diffuse and its nucleus is eccentric and cart-wheeled.
## concept_type
structural_description
## status
under review
## subject
fnd
## primary_node_id
DIS-HIS-T02
## secondary_node_ids
DIS-HIS-T04
## modules
101 ISK
## module_subject
101 ISK > Histology > Connective Tissue > Connective Tissue Cells
## universities
kau
## learner_years
1
## exam_signal
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p151 | 101 ISK
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p122 | 101 ISK
src_05a0b0c29acc94017b8f | department_book | undated | p42 | 101 ISK
## weight_confidence
0.6
## support_mode
direct_statement
## original_wording
[DPT Practical Histo 101 p.151, answer p.152] Cells surrounded by yellow circles ... & green circles ... / Black arrow points to ... / Mention 2 visible characters to nucleus pointed by red arrow
[Answer page] mast cells (yellow circles); plasma cells (green circles); negative Golgi image (black arrow); plasma cell nucleus: eccentric, single, cart-wheel
## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology for this concept has not been researched yet; it is filled during the evidence pass rather than guessed.
exam_signal: the practical book and the revision deck print no year, so the year slot reads "undated" rather than a guessed sitting.

---

# Item
## label
White and brown fat are told apart by whether the cell holds one fat droplet or many
## id
CON-FND-97930723FE0D94
## canonical_key
unilocular-versus-multilocular-adipocyte
## definition
The unilocular (white) fat cell is large and oval and holds a single fat droplet that pushes nucleus and cytoplasm into a thin peripheral rim, the signet-ring appearance. The multilocular (brown) fat cell is smaller and rounded and holds many small droplets, so it has no signet ring and its rounded nucleus stays eccentric rather than flattened; brown fat is also the more vascular tissue.
## explicit_objective
Identify white and brown adipose tissue on section, name the cell type each is built from, give two visible characters, and name the stains that demonstrate the fat.
## pitfalls
Reading the empty spaces as artefact holes. The fat dissolves in routine processing and the space is the droplet; Sudan III on the paired plate fills the same space with orange.
## concept_type
structural_description
## status
under review
## subject
fnd
## primary_node_id
DIS-HIS-T02
## secondary_node_ids
DIS-HIS-T04
## modules
101 ISK
## module_subject
101 ISK > Histology > Connective Tissue > Connective Tissue Cells
## universities
kau
## learner_years
1
## exam_signal
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p153 | 101 ISK
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p155 | 101 ISK
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p132 | 101 ISK
src_05a0b0c29acc94017b8f | department_book | undated | p44 | 101 ISK
## weight_confidence
0.6
## support_mode
direct_statement
## original_wording
[DPT Practical Histo 101 p.153, answer p.154] Identify type of this C.T. ... formed of ... cells / The cells can be stained by ... & ... / Mention 2 visible characters of cells / Blue stars mark ... & red arrow points to ...
[Answer page] unilocular fat cells; large / oval, single fat droplet; thin rim of cytoplasm
[DPT Practical Histo 101 p.155, answer p.156] multilocular fat cells; small / rounded, many fat droplets; nuclei; blood vessels
## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology for this concept has not been researched yet; it is filled during the evidence pass rather than guessed.
exam_signal: the practical book and the revision deck print no year, so the year slot reads "undated" rather than a guessed sitting.

---

# Item
## label
Collagen and elastic fibres are told apart in one field by bundling and by outline
## id
CON-FND-103DF490A6E01E
## canonical_key
collagen-versus-elastic-fibre-identification
## definition
In loose areolar tissue both fibres are acidophilic and lie in the same field. Collagen runs as thick, wavy, condensed bundles that do not branch; elastic fibres run singly, thin, branching, in a zigzag course. Orcein stains elastic fibres brown and leaves collagen unstained, and in the fresh state collagen is white while elastic tissue is yellow.
## explicit_objective
Name each fibre when arrowed in a loose areolar section and give one visible character of each.
## pitfalls
Using colour in a stained section to decide. Both are pink in H&E; what separates them is that collagen is bundled and wavy and elastic fibres are single, thin and zigzag. Colour only decides the answer in the fresh state or with orcein.
## concept_type
structural_description
## status
under review
## subject
fnd
## primary_node_id
DIS-HIS-T02
## secondary_node_ids
DIS-HIS-T04
## modules
101 ISK
## module_subject
101 ISK > Histology > Connective Tissue > Connective Tissue Fibres
## universities
kau
## learner_years
1
## exam_signal
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p141 | 101 ISK
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p125 | 101 ISK
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p126 | 101 ISK
src_05a0b0c29acc94017b8f | department_book | undated | p40 | 101 ISK
## weight_confidence
0.6
## support_mode
direct_statement
## original_wording
[DPT Practical Histo 101 p.141, answer p.142] Name fiber pointed by blue arrow & 1 character / Name fiber pointed by green arrow & 1 character
[Answer page] collagen fibers: condensed / bundles / acidophilic; elastic fibers: singly, thin, zigzag, acidophilic
## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology for this concept has not been researched yet; it is filled during the evidence pass rather than guessed.
exam_signal: the practical book and the revision deck print no year, so the year slot reads "undated" rather than a guessed sitting.

---

# Item
## label
Reticular fibres are invisible in H&E and appear as a fine brown branching network after silver
## id
CON-FND-4DBDF635382663
## canonical_key
reticular-fibre-silver-identification
## definition
Reticular fibres are type III collagen with a high sugar content. They do not show in H&E; silver impregnation stains them brown and PAS stains them red. On a silver preparation they form a fine network of thin fibres that branch and anastomose, which is what makes them the stroma of spleen, lymph node and liver.
## explicit_objective
Identify reticular fibres on a silver preparation, name the stain and give two visible characters.
## pitfalls
Naming orcein, which is the elastic-fibre stain and gives brown as well. The colour is not the discriminator; a brown network that branches and anastomoses is reticular, a brown fibre that runs singly in a zigzag is elastic.
## concept_type
structural_description
## status
under review
## subject
fnd
## primary_node_id
DIS-HIS-T02
## secondary_node_ids
DIS-HIS-T04
## modules
101 ISK
## module_subject
101 ISK > Histology > Connective Tissue > Connective Tissue Fibres
## universities
kau
## learner_years
1
## exam_signal
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p145 | 101 ISK
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p127 | 101 ISK
src_05a0b0c29acc94017b8f | department_book | undated | p48 | 101 ISK
## weight_confidence
0.6
## support_mode
direct_statement
## original_wording
[DPT Practical Histo 101 p.145, answer p.146] Identify the type of tissue / Mention a special stain for it / List 2 visible characters for the tissue
[Answer page] brown; thin; branching / anastomosing fibers
## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology for this concept has not been researched yet; it is filled during the evidence pass rather than guessed.
exam_signal: the practical book and the revision deck print no year, so the year slot reads "undated" rather than a guessed sitting.

---

# Item
## label
Loose areolar connective tissue is identified by both fibre types and scattered cells in an open matrix
## id
CON-FND-3E3303864A3CE8
## canonical_key
loose-areolar-connective-tissue-identification
## definition
Loose areolar tissue is the commonest connective tissue proper. Its section shows collagen bundles and single zigzag elastic fibres running loosely in an abundant matrix, with fibroblast nuclei scattered between them and open spaces — the areolae — that hold tissue fluid.
## explicit_objective
Identify loose areolar connective tissue specifically, and name the two fibre types, the fibroblast and the matrix when each is marked.
## pitfalls
Answering "connective tissue" and stopping. The department's stem says be specific: what distinguishes loose areolar tissue from the fibrous types is that its fibres are loose and both kinds are present, not condensed into bundles that fill the field.
## concept_type
structural_description
## status
under review
## subject
fnd
## primary_node_id
DIS-HIS-T02
## secondary_node_ids
DIS-HIS-T04
## modules
101 ISK
## module_subject
101 ISK > Histology > Connective Tissue > Types of Connective Tissue Proper
## universities
kau
## learner_years
1
## exam_signal
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p141 | 101 ISK
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p129 | 101 ISK
src_05a0b0c29acc94017b8f | department_book | undated | p40 | 101 ISK
## weight_confidence
0.6
## support_mode
direct_statement
## original_wording
[DPT Practical Histo 101 p.141, answer p.142] Identify the tissue (be specific) / Arrow head points to ... & star marks ...
[Answer page] fibroblast cell or nucleus (arrowhead); matrix (star)
## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology for this concept has not been researched yet; it is filled during the evidence pass rather than guessed.
exam_signal: the practical book and the revision deck print no year, so the year slot reads "undated" rather than a guessed sitting.

---

# Item
## label
Reticular connective tissue is the silver-stained network that forms the stroma of an organ
## id
CON-FND-49D5829AC3DCA1
## canonical_key
reticular-connective-tissue-identification
## definition
Reticular connective tissue is a delicate type in which reticular fibres and reticular cells form a supporting framework. It is demonstrated by silver, which stains the fibres brown, and it is the stroma of spleen, lymph node and liver rather than a tissue that stands on its own.
## explicit_objective
Identify reticular connective tissue and name the stain that demonstrates it.
## pitfalls
Confusing the tissue with the fibre. The examiner asks for the type of connective tissue on one plate and for the arrowed fibre on another, and both answers use the word reticular for different things.
## concept_type
structural_description
## status
under review
## subject
fnd
## primary_node_id
DIS-HIS-T02
## secondary_node_ids
DIS-HIS-T04
## modules
101 ISK
## module_subject
101 ISK > Histology > Connective Tissue > Types of Connective Tissue Proper
## universities
kau
## learner_years
1
## exam_signal
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p157 | 101 ISK
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p133 | 101 ISK
src_05a0b0c29acc94017b8f | department_book | undated | p48 | 101 ISK
## weight_confidence
0.6
## support_mode
direct_statement
## original_wording
[DPT Practical Histo 101 p.157, answer p.158] Identify type of C.T. ... & stain ... / Red arrows point to ... / Mention characters for B
[Answer page] reticular fibers (red arrows); brown; thin; branch & anastomose
## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology for this concept has not been researched yet; it is filled during the evidence pass rather than guessed.
exam_signal: the practical book and the revision deck print no year, so the year slot reads "undated" rather than a guessed sitting.

---

# Item
## label
Yellow elastic connective tissue is a dense field of thin, single, zigzag elastic fibres, yellow in the fresh state
## id
CON-FND-7FB8290199B237
## canonical_key
yellow-elastic-connective-tissue-identification
## definition
Yellow elastic connective tissue is a dense tissue in which parallel elastic fibres predominate. On section the fibres are thin, single and zigzag rather than bundled; orcein stains them brown, and in the fresh state the tissue is yellow — as in the ligamentum flavum and the ligamentum nuchae.
## explicit_objective
Identify yellow elastic connective tissue, give its colour in the fresh state, name the stain and the colour it gives, and give two visible characters of its fibres.
## pitfalls
Answering "white" for the fresh colour out of habit. White is the fresh colour of the fibrous types; the department asks the fresh colour on both plates precisely so that the two are not answered alike.
## concept_type
structural_description
## status
under review
## subject
fnd
## primary_node_id
DIS-HIS-T02
## secondary_node_ids
DIS-HIS-T04
## modules
101 ISK
## module_subject
101 ISK > Histology > Connective Tissue > Types of Connective Tissue Proper
## universities
kau
## learner_years
1
## exam_signal
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p159 | 101 ISK
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p149 | 101 ISK
src_05a0b0c29acc94017b8f | department_book | undated | p50 | 101 ISK
## weight_confidence
0.6
## support_mode
direct_statement
## original_wording
[DPT Practical Histo 101 p.159, answer p.160] Type of C.T. is ... & in fresh state is ... colour / It is stained ... colour with ... stain / Give 2 visible characters for C
[Answer page] yellow in the fresh state; orcein (stains brown); singly / thin / zigzag / acidophilic
## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology for this concept has not been researched yet; it is filled during the evidence pass rather than guessed.
exam_signal: the practical book and the revision deck print no year, so the year slot reads "undated" rather than a guessed sitting.

---

# Item
## label
Regular and irregular white fibrous tissue differ only in the arrangement of the same thick collagen bundles
## id
CON-FND-B33D27A8517527
## canonical_key
regular-versus-irregular-white-fibrous-connective-tissue
## definition
Both are dense tissues of thick acidophilic collagen bundles with few cells, and both are white in the fresh state. In the regular form the bundles run parallel with fibroblast nuclei in rows between them; in the irregular form the bundles run in every direction with fibroblasts scattered among them.
## explicit_objective
Identify white fibrous connective tissue as regular or irregular, give its fresh colour, and give two visible characters.
## pitfalls
Answering only "white fibrous connective tissue". The stem asks for the type to be specific, and regular and irregular carry different marks; the arrangement of the bundles is the whole of the difference.
## concept_type
structural_description
## status
under review
## subject
fnd
## primary_node_id
DIS-HIS-T02
## secondary_node_ids
DIS-HIS-T04
## modules
101 ISK
## module_subject
101 ISK > Histology > Connective Tissue > Types of Connective Tissue Proper
## universities
kau
## learner_years
1
## exam_signal
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p161 | 101 ISK
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p163 | 101 ISK
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p147 | 101 ISK
src_05a0b0c29acc94017b8f | department_book | undated | p52 | 101 ISK
## weight_confidence
0.6
## support_mode
direct_statement
## original_wording
[DPT Practical Histo 101 p.161, answer p.162] Type of C.T. is ... & in fresh state is ... colour / Black arrows point to ... / Red arrows demonstrate ... / Give 2 visible characters for C
[Answer page, regular] white in the fresh state; parallel / regular / thick bundles / acidophilic
[DPT Practical Histo 101 p.163, answer p.164, irregular] irregularly arranged / thick bundles / acidophilic
## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology for this concept has not been researched yet; it is filled during the evidence pass rather than guessed.
exam_signal: the practical book and the revision deck print no year, so the year slot reads "undated" rather than a guessed sitting.

---

# Item
## label
Mucoid connective tissue is recognised by ground substance predominating over cells and fibres
## id
CON-FND-4671C4D2911392
## canonical_key
mucoid-connective-tissue-identification
## definition
Mucoid connective tissue is jelly-like: the ground substance, rich in mucus and hyaluronic acid, predominates, with few scattered fibroblasts and delicate fibres running through it. It is the tissue of Wharton's jelly in the umbilical cord, the vitreous humour and the pulp of a tooth.
## explicit_objective
Identify mucoid connective tissue on a section and name a site where it is found.
## pitfalls
Reading the pale field as loose areolar tissue. Loose areolar tissue has two visible fibre populations and many cells; in mucoid tissue the matrix is what fills the field.
## concept_type
structural_description
## status
under review
## subject
fnd
## primary_node_id
DIS-HIS-T02
## secondary_node_ids
DIS-HIS-T04
## modules
101 ISK
## module_subject
101 ISK > Histology > Connective Tissue > Types of Connective Tissue Proper
## universities
kau
## learner_years
1
## exam_signal
src_b4cb8bf9f0c7a6584b4b | department_book | undated | p137 | 101 ISK
## weight_confidence
0.6
## support_mode
direct_statement
## original_wording
[DPT Practical Histo 101 p.137] Mucoid C.T.
## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology for this concept has not been researched yet; it is filled during the evidence pass rather than guessed.
exam_signal: the practical book and the revision deck print no year, so the year slot reads "undated" rather than a guessed sitting.
