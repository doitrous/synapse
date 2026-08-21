# Practical media requests — 101 ISK

One request per **distinct slide subject**, not per plate. The catalogue at
`scripts/kasr/extract/practical.json` holds 170 practical slides and
27 radiology plates, but they resolve to **85 distinct subjects** —
six plates of simple columnar epithelium need one image, not six.

**Why this file exists.** `docs/Kasr-Source-Imports/media/media-audit.md` establishes
that the repository holds zero medical images: no micrograph, no anatomy plate, no
radiograph. Every slide catalogued for this module therefore needs an image that does
not exist yet, and the practical cannot run until a human sources them. Nothing here
was generated, downloaded or saved — these are written requests to be fulfilled.

**Format.** Each block below is a `media_needed` / `media_recommendations` entry in the
grammar parsed by `parseMediaRequests` (`src/data/bulkImport.ts:485`): a
`### <medium> · <label>` heading followed by labelled lines. `Kind:` is drawn from
`MEDIA_REQUEST_KINDS`, `Priority:` from `MEDIA_REQUEST_PRIORITIES`, `Status:` from
`MEDIA_REQUEST_STATUSES` (`src/data/contentControl.ts:104-128`). Paste a block into the
`media_needed` column of the practical row that owns it.

**Counts.** 82 required · 2 strongly helpful · 1 optional.

**Priority rule applied here.** `required` means the station cannot be answered without
the image — which is true of every identify-this-slide item, since the stem carries no
text the answer could be read from. `strongly helpful` is used only for comparison
plates whose teaching point survives, degraded, on two separate images. `optional` is
used only where the source page is itself a schematic rather than a specimen.

**A rights warning found in the source.** Page 85 of `DPT Practical Histo 101` prints a
third-party image URL from the University of Western Australia's Blue Histology
collection. The departmental deck therefore contains at least one image the faculty does
not own. Do not re-host anything traced to that collection without checking its licence;
source a freely licensed equivalent instead. Every `Rights:` line below is written on the
assumption that nothing is cleared until someone has recorded a licence.

---

## Cytology

*27 requests.*

### image · Cell membrane between two adjacent cells (EM)
Brief: Transmission EM of apposed plasma membranes of two cells at magnification high enough to resolve the trilaminar unit membrane, with the intercellular space and the cytoplasm of both cells in frame.
Purpose: The station asks the student to identify the plasma membrane from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: unstained (EM; osmium/lead contrast). Structures that must be visible and markable: two dark (electron-dense) lines separated by one pale line - trilaminar unit membrane; intercellular space; cytoplasm of each cell. Depends on: DPT Practical Histo 101 pp. 2, 33, 35; DPT 1 Final Revision pp. 4.
Source direction: Openly licensed electron-microscopy teaching collection, or an original micrograph from the departmental EM archive.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Mitochondria (LM)
Brief: Light micrograph of cells with abundant mitochondria shown as oval, rod-shaped or granular bodies distinct enough to be counted.
Purpose: The station asks the student to identify mitochondria under the light microscope from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: iron haematoxylin (dark blue) or Janus green (green). Structures that must be visible and markable: oval / rod / granular mitochondria; surrounding cytoplasm; nucleus for scale. Depends on: DPT Practical Histo 101 pp. 3.
Source direction: Openly licensed histology teaching collection, or an original slide photographed by the Cairo University histology department.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Mitochondrion (EM)
Brief: Transmission EM of one or more mitochondria with the double membrane, the cristae and the matrix all separately resolvable, and adjacent rER in the same field.
Purpose: The station asks the student to identify a mitochondrion and its internal structure from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: unstained (EM). Structures that must be visible and markable: outer and inner membranes; cristae; matrix; adjacent rough endoplasmic reticulum. Depends on: DPT Practical Histo 101 pp. 4, 37, 39, 43, 70; DPT 1 Final Revision pp. 6.
Source direction: Openly licensed electron-microscopy teaching collection, or an original micrograph from the departmental EM archive.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Golgi apparatus (EM)
Brief: Transmission EM of a Golgi complex showing the stack of parallel flattened saccules with transfer vesicles on one face and secretory vesicles on the other.
Purpose: The station asks the student to identify the Golgi apparatus from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: unstained (EM). Structures that must be visible and markable: stacked parallel saccules; transfer vesicles; secretory vesicles; surrounding cytoplasm. Depends on: DPT Practical Histo 101 pp. 6, 51, 53, 72; DPT 1 Final Revision pp. 14.
Source direction: Openly licensed electron-microscopy teaching collection, or an original micrograph from the departmental EM archive.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Golgi apparatus in a nerve cell (silver)
Brief: Silver-impregnated nerve cell in which the Golgi apparatus appears as brown fine fibrils or granules in a perinuclear position, with the central rounded nucleus visible.
Purpose: The station asks the student to identify the Golgi apparatus and state its position in a nerve cell from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: silver impregnation (Golgi stains brown). Structures that must be visible and markable: brown fine fibrils / granules of Golgi; perinuclear position; central rounded nucleus. Depends on: DPT Practical Histo 101 pp. 7, 47; DPT 1 Final Revision pp. 10.
Source direction: Openly licensed histology teaching collection, or an original slide photographed by the Cairo University histology department.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Golgi apparatus in a secretory cell (silver)
Brief: Silver-impregnated secretory (glandular) cells in which the Golgi apparatus lies apical to the nucleus, with the cell membrane outlining individual cells.
Purpose: The station asks the student to identify the Golgi apparatus and state its apical position from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: silver impregnation (Golgi stains brown). Structures that must be visible and markable: brown fibrils / granules of Golgi; apical position relative to the nucleus; cell membrane. Depends on: DPT Practical Histo 101 pp. 8, 49; DPT 1 Final Revision pp. 12.
Source direction: Openly licensed histology teaching collection, or an original slide photographed by the Cairo University histology department.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Negative Golgi image
Brief: Routinely stained plasma cell (or comparable secretory cell) in which the Golgi zone appears as an unstained pale area beside the nucleus - the negative Golgi image.
Purpose: The station asks the student to identify the negative Golgi image from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: H&E. Structures that must be visible and markable: pale unstained juxtanuclear Golgi zone; basophilic cytoplasm; eccentric cart-wheel nucleus of the plasma cell. Depends on: DPT Practical Histo 101 pp. 9, 151; DPT 1 Final Revision pp. 42.
Source direction: Openly licensed histology teaching collection, or an original slide photographed by the Cairo University histology department.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Rough endoplasmic reticulum (EM)
Brief: Transmission EM of rER as parallel regular flattened cisternae with ribosomes clearly resolved as dense granules on the cytosolic face.
Purpose: The station asks the student to identify rER and give one visible character from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: unstained (EM). Structures that must be visible and markable: parallel flattened cisternae; ribosomes studding the membrane; cisternal lumen. Depends on: DPT Practical Histo 101 pp. 10, 41, 71.
Source direction: Openly licensed electron-microscopy teaching collection, or an original micrograph from the departmental EM archive.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Smooth endoplasmic reticulum (EM)
Brief: Transmission EM of sER as a network of smooth-surfaced tubules and vesicles of differing size and shape, with no ribosomes on the membranes.
Purpose: The station asks the student to identify sER and give one visible character from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: unstained (EM). Structures that must be visible and markable: smooth membrane surface; absence of ribosomes; vesicles and tubules of varying size. Depends on: DPT Practical Histo 101 pp. 11, 45; DPT 1 Final Revision pp. 8.
Source direction: Openly licensed electron-microscopy teaching collection, or an original micrograph from the departmental EM archive.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Smooth ER with mitochondrion (EM)
Brief: Transmission EM field containing both sER and a mitochondrion so the two can be told apart in one image.
Purpose: The station asks the student to identify sER and a mitochondrion in the same field from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: strongly helpful
Status: needed
Kind: histology
Notes: Stain: unstained (EM). Structures that must be visible and markable: sER tubules; mitochondrion with cristae. Depends on: DPT Practical Histo 101 pp. 12.
Source direction: Openly licensed electron-microscopy teaching collection, or an original micrograph from the departmental EM archive.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Smooth and rough ER together (EM)
Brief: Transmission EM field containing both sER and rER, positioned so the presence and absence of ribosomes is the discriminating feature.
Purpose: The station asks the student to identify and contrast sER with rER from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: unstained (EM). Structures that must be visible and markable: ribosome-studded rER cisternae; smooth sER tubules. Depends on: DPT Practical Histo 101 pp. 13.
Source direction: Openly licensed electron-microscopy teaching collection, or an original micrograph from the departmental EM archive.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Primary lysosome (EM)
Brief: Transmission EM of a primary lysosome - a uniformly electron-dense membrane-bound body with homogeneous content and no ingested material.
Purpose: The station asks the student to identify a primary lysosome from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: unstained (EM). Structures that must be visible and markable: single limiting membrane; homogeneous electron-dense matrix; absence of ingested debris. Depends on: DPT Practical Histo 101 pp. 14.
Source direction: Openly licensed electron-microscopy teaching collection, or an original micrograph from the departmental EM archive.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Secondary lysosome - multivesicular body (EM)
Brief: Transmission EM of a multivesicular body: a membrane-bound vacuole containing several small internal vesicles.
Purpose: The station asks the student to identify a multivesicular body from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: unstained (EM). Structures that must be visible and markable: limiting membrane; multiple small internal vesicles. Depends on: DPT Practical Histo 101 pp. 15.
Source direction: Openly licensed electron-microscopy teaching collection, or an original micrograph from the departmental EM archive.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Heterolysosome (EM)
Brief: Transmission EM of a heterolysosome containing recognisably exogenous ingested material.
Purpose: The station asks the student to identify a heterolysosome and state its origin from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: unstained (EM). Structures that must be visible and markable: limiting membrane; heterogeneous ingested exogenous content. Depends on: DPT Practical Histo 101 pp. 16.
Source direction: Openly licensed electron-microscopy teaching collection, or an original micrograph from the departmental EM archive.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Autolysosome (EM)
Brief: Transmission EM of an autolysosome containing a recognisable degenerating organelle (e.g. a mitochondrial remnant).
Purpose: The station asks the student to identify an autolysosome and state what it contains from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: unstained (EM). Structures that must be visible and markable: limiting membrane; identifiable degenerating organelle inside. Depends on: DPT Practical Histo 101 pp. 17.
Source direction: Openly licensed electron-microscopy teaching collection, or an original micrograph from the departmental EM archive.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Nissl's granules in a nerve cell
Brief: Light micrograph of a motor neurone cell body with focal (spotty) basophilic Nissl granules in the perikaryon and dendrites but not the axon hillock.
Purpose: The station asks the student to identify Nissl's granules and name the organelle they represent from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: toluidine blue / cresyl violet, or H&E. Structures that must be visible and markable: focal basophilic Nissl granules; large vesicular nucleus with prominent nucleolus; axon hillock free of Nissl substance. Depends on: DPT Practical Histo 101 pp. 18.
Source direction: Openly licensed histology teaching collection, or an original slide photographed by the Cairo University histology department.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Ribosome and translation (schematic)
Brief: Labelled schematic of a ribosome on mRNA showing large and small subunits, A- and P-sites, tRNA and the growing amino-acid chain.
Purpose: Supports the written questions on ribosome structure; the corresponding book page is a schematic rather than a micrograph, so a redrawn diagram is an exact substitute.
Priority: optional
Status: needed
Kind: diagram
Notes: Structures that must be visible and markable: large ribosomal subunit; small ribosomal subunit; P-site; A-site; tRNA; mRNA; codon; growing amino-acid chain. Depends on: DPT Practical Histo 101 pp. 19.
Source direction: Redraw in-house, or use a CC0 molecular-biology schematic.
Rights: Redrawn in-house is preferred so the licence is unambiguous.

### image · Centriole (EM, longitudinal and transverse)
Brief: Transmission EM of a centriole with a transverse section in which the nine triplets of microtubules can be counted, plus a longitudinal view showing the pair at right angles.
Purpose: The station asks the student to identify a centriole and state how its microtubules are arranged from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: unstained (EM). Structures that must be visible and markable: nine triplets of microtubules in cross-section; pinwheel arrangement; the paired centrioles at right angles. Depends on: DPT Practical Histo 101 pp. 20, 21, 55; DPT 1 Final Revision pp. 16.
Source direction: Openly licensed electron-microscopy teaching collection, or an original micrograph from the departmental EM archive.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Cilia (EM, longitudinal and transverse)
Brief: Transmission EM of cilia including a transverse section resolving the 9+2 axoneme - nine peripheral doublets and two central singlets - and a longitudinal section of the shaft with the basal body.
Purpose: The station asks the student to identify the axoneme and distinguish doublets from singlets from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: unstained (EM). Structures that must be visible and markable: nine peripheral doublet microtubules; two central singlet microtubules; ciliary membrane; basal body; shaft (axoneme) in longitudinal section. Depends on: DPT Practical Histo 101 pp. 22, 57, 59; DPT 1 Final Revision pp. 18.
Source direction: Openly licensed electron-microscopy teaching collection, or an original micrograph from the departmental EM archive.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Microvilli (EM, longitudinal and transverse)
Brief: Transmission EM of microvilli showing the pale actin core and the absence of microtubules, ideally in the same frame as cilia so the two can be contrasted.
Purpose: The station asks the student to identify microvilli and contrast them with cilia from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: unstained (EM). Structures that must be visible and markable: pale core with no microtubules; small size relative to cilia; covering cell membrane; terminal web. Depends on: DPT Practical Histo 101 pp. 23, 59; DPT 1 Final Revision pp. 18.
Source direction: Openly licensed electron-microscopy teaching collection, or an original micrograph from the departmental EM archive.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Glycogen inclusion in liver cells
Brief: Light micrograph of liver parenchyma with stored glycogen demonstrated as magenta/red granules in the hepatocyte cytoplasm.
Purpose: The station asks the student to identify the inclusion, name the stain and name the cell from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: PAS or Best's carmine. Structures that must be visible and markable: red / magenta glycogen granules; hepatocyte cytoplasm; hepatocyte nuclei. Depends on: DPT Practical Histo 101 pp. 24, 61; DPT 1 Final Revision pp. 20.
Source direction: Openly licensed histology teaching collection, or an original slide photographed by the Cairo University histology department.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Fat inclusion in adipocytes (H&E)
Brief: Light micrograph of adipose tissue in routine H&E where the lipid has dissolved out, leaving an empty vacuole with a thin rim of cytoplasm and a flattened peripheral nucleus.
Purpose: The station asks the student to identify the inclusion and explain why it appears empty from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: H&E. Structures that must be visible and markable: empty (dissolved) fat vacuole; thin rim of cytoplasm; flattened peripheral nucleus. Depends on: DPT Practical Histo 101 pp. 25.
Source direction: Openly licensed histology teaching collection, or an original slide photographed by the Cairo University histology department.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Fat inclusion in adipocytes (Sudan III)
Brief: Frozen-section light micrograph of adipose tissue with lipid stained orange by Sudan III, shown as a large droplet filling the cell.
Purpose: The station asks the student to identify the inclusion, name the stain and name the cell from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: Sudan III. Structures that must be visible and markable: large orange lipid droplet; thin rim of cytoplasm; peripheral nucleus. Depends on: DPT Practical Histo 101 pp. 26, 155; DPT 1 Final Revision pp. 20.
Source direction: Openly licensed histology teaching collection, or an original slide photographed by the Cairo University histology department.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Open-face and closed-face nuclei (LM)
Brief: Light micrograph showing an open-face (euchromatic, pale, vesicular) nucleus and a closed-face (heterochromatic, dark) nucleus side by side in one field.
Purpose: The station asks the student to identify each nucleus type and relate appearance to activity from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: H&E. Structures that must be visible and markable: pale open-face nucleus with prominent nucleolus; dark closed-face nucleus; nuclear membrane. Depends on: DPT Practical Histo 101 pp. 27.
Source direction: Openly licensed histology teaching collection, or an original slide photographed by the Cairo University histology department.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Nucleus and nuclear envelope (EM)
Brief: Transmission EM of a nucleus in which the two layers of the nuclear envelope, nuclear pores, the nucleolus and the perinuclear cisterna are separately resolvable.
Purpose: The station asks the student to identify the nuclear envelope, a nuclear pore and the nucleolus from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: unstained (EM). Structures that must be visible and markable: outer nuclear membrane; inner nuclear membrane; perinuclear cisterna; nuclear pores; nucleolus; continuity of outer membrane with rER. Depends on: DPT Practical Histo 101 pp. 28, 31, 63, 73.
Source direction: Openly licensed electron-microscopy teaching collection, or an original micrograph from the departmental EM archive.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Euchromatic nucleus (EM)
Brief: Transmission EM of a predominantly euchromatic nucleus with a thin rim of peripheral heterochromatin, a chromatin island, a nucleolus, nuclear membrane and a visible nuclear pore.
Purpose: The station asks the student to identify the nucleus type and every marked chromatin compartment from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: unstained (EM). Structures that must be visible and markable: peripheral heterochromatin; chromatin island; nucleolus; nuclear sap (euchromatin); nuclear membrane; nuclear pore. Depends on: DPT Practical Histo 101 pp. 29, 67; DPT 1 Final Revision pp. 24.
Source direction: Openly licensed electron-microscopy teaching collection, or an original micrograph from the departmental EM archive.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Heterochromatic nucleus (EM)
Brief: Transmission EM of a predominantly heterochromatic nucleus with dense peripheral heterochromatin, chromatin islands and nucleolus-associated chromatin.
Purpose: The station asks the student to identify the nucleus type and every marked chromatin compartment from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: unstained (EM). Structures that must be visible and markable: dense peripheral heterochromatin; chromatin island; nucleolus-associated chromatin; nuclear sap; nuclear membrane. Depends on: DPT Practical Histo 101 pp. 30, 65; DPT 1 Final Revision pp. 22.
Source direction: Openly licensed electron-microscopy teaching collection, or an original micrograph from the departmental EM archive.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

---

## Blood

*11 requests.*

### image · Blood film - survey field of all elements
Brief: Low/medium-power Leishman-stained peripheral film containing a neutrophil, an eosinophil, a basophil, a lymphocyte, a monocyte, red cells and platelets in one field.
Purpose: Used as the orientation plate for the whole blood block; the student must locate and name each element within one field.
Priority: required
Status: needed
Kind: histology
Notes: Stain: Leishman. Structures that must be visible and markable: neutrophil; eosinophil; basophil; lymphocyte; monocyte; erythrocytes; platelets. Depends on: DPT Practical Histo 101 pp. 83.
Source direction: Openly licensed haematology atlas, or an original Leishman-stained film photographed in the departmental haematology lab.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Neutrophil
Brief: Oil-immersion Leishman-stained neutrophil with a clearly segmented multilobed nucleus and fine neutral cytoplasmic granules, red cells alongside for scale.
Purpose: The station asks the student to identify the neutrophil and give one visible feature from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: Leishman. Structures that must be visible and markable: segmented / multilobed nucleus; fine neutral granules; pale cytoplasm; adjacent RBCs with central pallor. Depends on: DPT Practical Histo 101 pp. 77, 90, 92, 106; DPT 1 Final Revision pp. 57, 63.
Source direction: Openly licensed haematology atlas, or an original Leishman-stained film photographed in the departmental haematology lab.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Barr body on a neutrophil
Brief: Oil-immersion Leishman-stained neutrophil from a female showing a drumstick Barr body appended to one nuclear lobe.
Purpose: The station asks the student to identify the Barr body and state what it represents from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: Leishman. Structures that must be visible and markable: drumstick Barr body attached to the segmented nucleus; neutrophil nuclear lobes; platelets. Depends on: DPT Practical Histo 101 pp. 78, 92.
Source direction: Openly licensed haematology atlas, or an original Leishman-stained film photographed in the departmental haematology lab.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Eosinophil
Brief: Oil-immersion Leishman-stained eosinophil with a bilobed nucleus and coarse refractile eosinophilic (orange-red) granules filling the cytoplasm.
Purpose: The station asks the student to identify the eosinophil and give one visible feature from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: Leishman. Structures that must be visible and markable: bilobed nucleus; coarse eosinophilic granules; cell membrane; adjacent RBCs with central pallor. Depends on: DPT Practical Histo 101 pp. 79, 94; DPT 1 Final Revision pp. 59.
Source direction: Openly licensed haematology atlas, or an original Leishman-stained film photographed in the departmental haematology lab.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Basophil
Brief: Oil-immersion Leishman-stained basophil with coarse dark basophilic granules that overlie and mask the S-shaped nucleus.
Purpose: The station asks the student to identify the basophil and give one visible feature from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: Leishman. Structures that must be visible and markable: coarse large basophilic granules; S-shaped nucleus masked by granules; adjacent RBCs. Depends on: DPT Practical Histo 101 pp. 80, 96, 98, 106; DPT 1 Final Revision pp. 63.
Source direction: Openly licensed haematology atlas, or an original Leishman-stained film photographed in the departmental haematology lab.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Lymphocyte
Brief: Oil-immersion Leishman-stained small lymphocyte with a dense dark round nucleus and a narrow rim of pale blue cytoplasm; a large lymphocyte in the same or a paired field.
Purpose: The station asks the student to identify the lymphocyte and give one visible feature from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: Leishman. Structures that must be visible and markable: dark round nucleus; narrow rim of cytoplasm; adjacent RBCs for size comparison. Depends on: DPT Practical Histo 101 pp. 81, 100, 102, 104; DPT 1 Final Revision pp. 61.
Source direction: Openly licensed haematology atlas, or an original Leishman-stained film photographed in the departmental haematology lab.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Monocyte
Brief: Oil-immersion Leishman-stained monocyte with a kidney-shaped (indented) nucleus and abundant frosted-glass (finely granular grey-blue) cytoplasm.
Purpose: The station asks the student to identify the monocyte and give one visible feature from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: Leishman. Structures that must be visible and markable: kidney-shaped indented nucleus; frosted-glass cytoplasm; large cell size. Depends on: DPT Practical Histo 101 pp. 82, 104; DPT 1 Final Revision pp. 61.
Source direction: Openly licensed haematology atlas, or an original Leishman-stained film photographed in the departmental haematology lab.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Platelets
Brief: Oil-immersion Leishman-stained field showing platelets singly and in a small clump, unmistakably smaller than the surrounding red cells.
Purpose: The station asks the student to identify platelets and state their origin from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: Leishman. Structures that must be visible and markable: individual platelets; platelet clump; adjacent RBCs for scale. Depends on: DPT Practical Histo 101 pp. 84, 102.
Source direction: Openly licensed haematology atlas, or an original Leishman-stained film photographed in the departmental haematology lab.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Erythrocytes - LM and EM
Brief: Paired plate: a light micrograph of red cells showing the biconcave disc with central pallor, and a scanning EM showing the biconcave surface profile.
Purpose: The station asks the student to identify the erythrocyte and relate its shape to its function from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: Leishman (LM); unstained (EM). Structures that must be visible and markable: central pallor; biconcave disc profile; absence of a nucleus. Depends on: DPT Practical Histo 101 pp. 75, 76.
Source direction: Openly licensed haematology atlas, or an original Leishman-stained film photographed in the departmental haematology lab.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Reticulocyte (supravital preparation)
Brief: Oil-immersion cresyl-blue supravital preparation showing reticulocytes with the blue-staining reticular network of residual ribosomal RNA.
Purpose: The station asks the student to identify the cell, name the stain and state that it is supravital from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: brilliant cresyl blue (supravital). Structures that must be visible and markable: blue reticular network inside the red cell; mature RBCs without a network. Depends on: DPT Practical Histo 101 pp. 67, 114; DPT 1 Final Revision pp. 67.
Source direction: Openly licensed haematology atlas, or an original Leishman-stained film photographed in the departmental haematology lab.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Bone marrow - megakaryocytes and fat cells
Brief: Medium-power section or smear of red bone marrow showing megakaryocytes with large multilobed nuclei, adipocytes, and developing haemopoietic cells between sinusoids.
Purpose: The station asks the student to identify the tissue, a megakaryocyte and the fat cells from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: H&E (section) or Leishman (smear). Structures that must be visible and markable: megakaryocyte with large multilobed nucleus; fat cells (adipocytes); haemopoietic cell clusters; marrow sinusoid. Depends on: DPT Practical Histo 101 pp. 65, 85, 86, 87, 108, 110, 112; DPT 1 Final Revision pp. 65.
Source direction: Openly licensed haematology atlas, or an original Leishman-stained film photographed in the departmental haematology lab.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

---

## Connective tissue

*15 requests.*

### image · Fibroblast and fibrocyte
Brief: Light micrograph of connective tissue with an active fibroblast (large pale oval nucleus, basophilic cytoplasm) and a quiescent fibrocyte (small dark spindle nucleus) distinguishable.
Purpose: The station asks the student to identify the cell and state whether it is active or quiescent from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: H&E. Structures that must be visible and markable: fibroblast oval pale nucleus; fibrocyte spindle dark nucleus; surrounding collagen bundles. Depends on: DPT Practical Histo 101 pp. 143.
Source direction: Openly licensed histology teaching collection, or an original slide photographed by the Cairo University histology department.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Macrophage
Brief: Light micrograph of connective tissue containing macrophages, ideally after vital dye (trypan blue / India ink) uptake so the ingested particles identify the cell.
Purpose: The station asks the student to identify the macrophage and state how it was demonstrated from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: H&E, or vital staining with trypan blue / India ink. Structures that must be visible and markable: ingested dye particles in the cytoplasm; indented / kidney-shaped nucleus; irregular cell outline. Depends on: DPT Practical Histo 101 pp. 120.
Source direction: Openly licensed histology teaching collection, or an original slide photographed by the Cairo University histology department.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Mast cell
Brief: Light micrograph of connective tissue with mast cells whose numerous coarse metachromatic granules fill the cytoplasm and obscure the central rounded nucleus.
Purpose: The station asks the student to identify the mast cell and give one visible character from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: toluidine blue (metachromasia) or H&E. Structures that must be visible and markable: numerous coarse basophilic / metachromatic granules; central rounded nucleus; perivascular position. Depends on: DPT Practical Histo 101 pp. 121, 139, 151; DPT 1 Final Revision pp. 42.
Source direction: Openly licensed histology teaching collection, or an original slide photographed by the Cairo University histology department.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Plasma cell
Brief: Light micrograph of connective tissue with plasma cells showing an eccentric cart-wheel nucleus, deeply basophilic cytoplasm and a pale juxtanuclear negative Golgi image.
Purpose: The station asks the student to identify the plasma cell and give two visible characters from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: H&E. Structures that must be visible and markable: eccentric cart-wheel nucleus; strongly basophilic cytoplasm; negative Golgi image. Depends on: DPT Practical Histo 101 pp. 122, 123, 151; DPT 1 Final Revision pp. 42.
Source direction: Openly licensed histology teaching collection, or an original slide photographed by the Cairo University histology department.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Unilocular (white) fat cell
Brief: Light micrograph of white adipose tissue: large signet-ring cells each with a single vacuole, a thin rim of cytoplasm and a flattened peripheral nucleus.
Purpose: The station asks the student to identify the tissue and the cell type that forms it from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: H&E (and Sudan III on frozen section). Structures that must be visible and markable: single large fat droplet per cell; thin rim of cytoplasm; flattened peripheral nucleus; delicate connective-tissue septa. Depends on: DPT Practical Histo 101 pp. 118, 130, 153; DPT 1 Final Revision pp. 44.
Source direction: Openly licensed histology teaching collection, or an original slide photographed by the Cairo University histology department.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Multilocular (brown) fat cell
Brief: Light micrograph of brown adipose tissue: smaller rounded cells each holding many small fat droplets, with a central nucleus and a rich capillary bed.
Purpose: The station asks the student to identify the tissue and the cell type that forms it from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: H&E (and Sudan III on frozen section). Structures that must be visible and markable: many small fat droplets per cell; central rounded nucleus; abundant blood vessels; smaller cell size than unilocular fat. Depends on: DPT Practical Histo 101 pp. 119, 131, 155; DPT 1 Final Revision pp. 46.
Source direction: Openly licensed histology teaching collection, or an original slide photographed by the Cairo University histology department.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Brown versus white adipose tissue (comparison plate)
Brief: Side-by-side light micrographs of brown and white adipose tissue at matched magnification so the multilocular and unilocular patterns can be compared directly.
Purpose: Supports the compare-and-contrast station; a single-tissue image cannot carry the comparison.
Priority: strongly helpful
Status: needed
Kind: histology
Notes: Stain: H&E. Structures that must be visible and markable: unilocular cells with peripheral nuclei; multilocular cells with central nuclei; capillary density difference. Depends on: DPT Practical Histo 101 pp. 132.
Source direction: Openly licensed histology teaching collection, or an original slide photographed by the Cairo University histology department.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Collagen fibers
Brief: Light micrograph in which collagen appears as thick acidophilic wavy bundles running in condensed groups.
Purpose: The station asks the student to identify the fiber type and give one character from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: H&E (or Masson trichrome). Structures that must be visible and markable: thick acidophilic bundles; wavy course; fibroblast nuclei between bundles. Depends on: DPT Practical Histo 101 pp. 125.
Source direction: Openly licensed histology teaching collection, or an original slide photographed by the Cairo University histology department.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Elastic fibers
Brief: Light micrograph in which elastic fibers run singly as thin refractile zigzag threads that branch and rejoin, distinct from the collagen around them.
Purpose: The station asks the student to identify the fiber type and give one character from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: orcein or Verhoeff (elastic stain); H&E. Structures that must be visible and markable: thin single fibers; zigzag / wavy course; branching and anastomosis; contrast with collagen bundles. Depends on: DPT Practical Histo 101 pp. 126.
Source direction: Openly licensed histology teaching collection, or an original slide photographed by the Cairo University histology department.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Reticular fibers
Brief: Silver-impregnated light micrograph in which reticular fibers form a fine brown/black branching and anastomosing meshwork.
Purpose: The station asks the student to identify the fiber type, name the stain and give a character from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: silver impregnation. Structures that must be visible and markable: fine brown/black fibers; branching and anastomosing network; supported cells within the mesh. Depends on: DPT Practical Histo 101 pp. 127.
Source direction: Openly licensed histology teaching collection, or an original slide photographed by the Cairo University histology department.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Loose areolar connective tissue
Brief: Spread or section of loose areolar tissue showing collagen bundles, single elastic fibers, fibroblasts and abundant pale matrix.
Purpose: The station asks the student to identify the tissue and both fiber types in it from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: H&E (fibers), orcein for elastic. Structures that must be visible and markable: collagen bundles; elastic fibers; fibroblast nucleus; ground substance / matrix. Depends on: DPT Practical Histo 101 pp. 129, 141; DPT 1 Final Revision pp. 40.
Source direction: Openly licensed histology teaching collection, or an original slide photographed by the Cairo University histology department.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Reticular connective tissue
Brief: Silver-impregnated section (lymph node or spleen) showing the reticular fiber meshwork supporting free cells.
Purpose: The station asks the student to identify the tissue, name the special stain and give two characters from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: silver impregnation. Structures that must be visible and markable: brown thin reticular fibers; branching and anastomosing network; free cells in the mesh. Depends on: DPT Practical Histo 101 pp. 133, 145, 157; DPT 1 Final Revision pp. 48.
Source direction: Openly licensed histology teaching collection, or an original slide photographed by the Cairo University histology department.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Yellow elastic connective tissue
Brief: Section of elastic tissue (ligamentum nuchae or elastic artery) stained to show thick parallel elastic fibers, which are yellow in the fresh state.
Purpose: The station asks the student to identify the tissue, its fresh colour, its stain and two characters from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: orcein (fibers stain brown); Verhoeff as an alternative. Structures that must be visible and markable: thick parallel elastic fibers; zigzag / branching profile; few fibroblasts between fibers. Depends on: DPT Practical Histo 101 pp. 134, 149, 159; DPT 1 Final Revision pp. 50.
Source direction: Openly licensed histology teaching collection, or an original slide photographed by the Cairo University histology department.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Regular white fibrous connective tissue
Brief: Longitudinal section of tendon or ligament: thick parallel collagen bundles in regular array with rows of flattened fibrocyte nuclei between them.
Purpose: The station asks the student to identify the tissue, its fresh colour and two characters from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: H&E. Structures that must be visible and markable: parallel regular thick collagen bundles; rows of flattened fibroblast/fibrocyte nuclei; acidophilic staining. Depends on: DPT Practical Histo 101 pp. 135, 147, 161; DPT 1 Final Revision pp. 52.
Source direction: Openly licensed histology teaching collection, or an original slide photographed by the Cairo University histology department.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Irregular white fibrous connective tissue
Brief: Section of dermis or organ capsule: thick collagen bundles running in many directions, with scattered fibroblast nuclei.
Purpose: The station asks the student to identify the tissue, its fresh colour and two characters from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: H&E. Structures that must be visible and markable: irregularly arranged thick collagen bundles; bundles cut in several planes; scattered fibroblast/fibrocyte nuclei. Depends on: DPT Practical Histo 101 pp. 136, 143, 163; DPT 1 Final Revision pp. 54.
Source direction: Openly licensed histology teaching collection, or an original slide photographed by the Cairo University histology department.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

---

## Epithelium

*10 requests.*

### image · Mucoid connective tissue
Brief: Section of umbilical cord (Wharton's jelly): abundant pale amorphous ground substance with sparse stellate fibroblasts and fine collagen.
Purpose: The station asks the student to identify the tissue and name where it is found from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: H&E. Structures that must be visible and markable: abundant pale ground substance; stellate / spindle fibroblasts; fine collagen fibrils. Depends on: DPT Practical Histo 101 pp. 137.
Source direction: Openly licensed histology teaching collection, or an original slide photographed by the Cairo University histology department.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Simple squamous epithelium
Brief: Light micrograph of a single layer of flat cells with flattened central nuclei lining a vessel or serous surface, with the basement membrane and underlying connective tissue visible.
Purpose: The station asks the student to identify the epithelium and give one visible feature from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: H&E. Structures that must be visible and markable: single layer of flat cells; flat single central nuclei; basement membrane; underlying connective tissue. Depends on: DPT Practical Histo 101 pp. 167, 168, 169, 185, 193, 197; DPT 1 Final Revision pp. 27.
Source direction: Openly licensed histology teaching collection, or an original slide photographed by the Cairo University histology department.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Simple cubical epithelium
Brief: Light micrograph of a single layer of square cells with rounded central nuclei, with the basement membrane visible.
Purpose: The station asks the student to identify the epithelium and give one visible feature from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: H&E. Structures that must be visible and markable: single layer of square cells; rounded central single nuclei; basement membrane. Depends on: DPT Practical Histo 101 pp. 170, 187, 195, 197; DPT 1 Final Revision pp. 27.
Source direction: Openly licensed histology teaching collection, or an original slide photographed by the Cairo University histology department.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Simple cubical epithelium - thyroid follicles
Brief: Light micrograph of thyroid follicles lined by a single layer of cubical cells around colloid-filled lumina.
Purpose: Names the site as well as the type; the station asks the student to place the epithelium in an organ, which a generic field cannot do.
Priority: required
Status: needed
Kind: histology
Notes: Stain: H&E. Structures that must be visible and markable: cubical follicular cells; colloid in the follicular lumen; basement membrane; interfollicular connective tissue. Depends on: DPT Practical Histo 101 pp. 171.
Source direction: Openly licensed histology teaching collection, or an original slide photographed by the Cairo University histology department.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Simple cubical epithelium - renal tubules
Brief: Light micrograph of renal cortex showing tubules lined by a single layer of cubical cells with rounded central nuclei.
Purpose: Names the site as well as the type; the station asks the student to place the epithelium in an organ.
Priority: required
Status: needed
Kind: histology
Notes: Stain: H&E. Structures that must be visible and markable: cubical tubular cells; narrow tubular lumen; rounded central nuclei; basement membrane. Depends on: DPT Practical Histo 101 pp. 172.
Source direction: Openly licensed histology teaching collection, or an original slide photographed by the Cairo University histology department.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Simple columnar epithelium
Brief: Light micrograph of a single layer of tall cells with oval nuclei set at the same basal level, on a visible basement membrane.
Purpose: The station asks the student to identify the epithelium and give one visible feature from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: H&E. Structures that must be visible and markable: single layer of tall cells; oval basally-placed nuclei in a row; basement membrane; free apical surface. Depends on: DPT Practical Histo 101 pp. 173, 174, 199; DPT 1 Final Revision pp. 29.
Source direction: Openly licensed histology teaching collection, or an original slide photographed by the Cairo University histology department.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Pseudostratified columnar ciliated epithelium with goblet cells
Brief: Light micrograph of respiratory-type epithelium: tall cells with nuclei at several levels but all resting on one basement membrane, surface cilia and interspersed goblet cells.
Purpose: The station asks the student to identify the epithelium and give two visible characters from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: H&E (PAS optional for goblet mucin). Structures that must be visible and markable: cilia on the free surface; crowded nuclei at different levels; single basement membrane; goblet cells; underlying connective tissue. Depends on: DPT Practical Histo 101 pp. 175, 176, 191, 201; DPT 1 Final Revision pp. 31.
Source direction: Openly licensed histology teaching collection, or an original slide photographed by the Cairo University histology department.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Pseudostratified columnar ciliated epithelium with stereocilia
Brief: Light micrograph of epididymal epithelium with long non-motile stereocilia on the apical surface, contrasting with true cilia.
Purpose: The station asks the student to identify the epithelium, name the surface modification and distinguish it from cilia from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: H&E. Structures that must be visible and markable: long tufted stereocilia; tall principal cells; basal cells; single basement membrane. Depends on: DPT Practical Histo 101 pp. 177.
Source direction: Openly licensed histology teaching collection, or an original slide photographed by the Cairo University histology department.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Keratinized stratified squamous epithelium
Brief: Light micrograph of thick skin epidermis with a distinct acidophilic anucleate horny layer over the intermediate polyhedral layers and a basal layer on the basement membrane.
Purpose: The station asks the student to identify the epithelium and give a feature of each named layer from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: H&E. Structures that must be visible and markable: horny (keratin) layer, acidophilic and condensed; intermediate polyhedral cell layers; basal columnar layer; basement membrane; underlying connective tissue (dermis). Depends on: DPT Practical Histo 101 pp. 179, 180, 203; DPT 1 Final Revision pp. 33.
Source direction: Openly licensed histology teaching collection, or an original slide photographed by the Cairo University histology department.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Non-keratinized stratified squamous epithelium
Brief: Light micrograph of oesophageal or oral mucosa: flat but still nucleated superficial cells over polyhedral intermediate layers and a columnar basal layer.
Purpose: The station asks the student to identify the epithelium and give a feature of each named layer from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: H&E. Structures that must be visible and markable: flat superficial cells retaining flat nuclei; polyhedral intermediate layers; columnar / cuboidal basal layer; basement membrane; underlying connective tissue. Depends on: DPT Practical Histo 101 pp. 180, 205, 207; DPT 1 Final Revision pp. 35.
Source direction: Openly licensed histology teaching collection, or an original slide photographed by the Cairo University histology department.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

---

## Radiology (X-ray) orientation

*22 requests.*

### image · Transitional epithelium (urothelium)
Brief: Light micrograph of relaxed bladder or ureter urothelium: dome-shaped (umbrella) superficial cells, some binucleate, over polyhedral intermediate layers.
Purpose: The station asks the student to identify the epithelium and give a feature of each named layer from the image and name the marked structures. There is no text the answer can be read off; without the plate the item cannot be attempted.
Priority: required
Status: needed
Kind: histology
Notes: Stain: H&E. Structures that must be visible and markable: dome-shaped superficial (umbrella) cells; binucleate superficial cells; polyhedral intermediate layers; basal layer; underlying connective tissue. Depends on: DPT Practical Histo 101 pp. 181, 182, 183, 189, 209; DPT 1 Final Revision pp. 37.
Source direction: Openly licensed histology teaching collection, or an original slide photographed by the Cairo University histology department.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release.

### image · Plain x-ray shoulder antero-posterior view (Upper Limb)
Brief: Plain x-ray shoulder antero-posterior view, correctly positioned and penetrated, no annotation burnt into the image so markers can be placed by the editor.
Purpose: The orientation station asks the student to name numbered structures on the film. The structure list is the answer key; without the film there is nothing to number.
Priority: required
Status: needed
Kind: imaging example
Notes: Structures that must be visible and markable: Clavicle; Acromioclavicular joint; Acromial process; Coracoid process; Head of the humerus; Glenoid cavity; Lesser tubercle; Greater tubercle; Intertubercular groove; Spinous process of the scapula; Lateral border of the scapula; Greater tubercle of the humerus; Surgical neck of the humerus; Glenoid cavity of the scapula; Coracoid process of the scapula; Lateral end of the clavicle. Depends on: Radiology (X-Ray) Orientation pp. 2, 3.
Source direction: Openly licensed radiology teaching case (e.g. Radiopaedia under CC-BY-NC-SA, checked against the product's licence policy), or a fully de-identified departmental film.
Rights: Must be openly licensed or departmentally owned, and must be de-identified: no patient name, MRN, date of birth or accession number anywhere in the frame or in the file metadata. Record the licence before release.

### image · Oblique coronal MRI shoulder joint (Upper Limb)
Brief: Oblique coronal MRI shoulder joint, correctly positioned and penetrated, no annotation burnt into the image so markers can be placed by the editor.
Purpose: The orientation station asks the student to name numbered structures on the film. The structure list is the answer key; without the film there is nothing to number.
Priority: required
Status: needed
Kind: imaging example
Notes: Structures that must be visible and markable: Head of the humerus; Anatomical neck of the humerus; Surgical neck of the humerus; Greater tubercle of the humerus; Glenoid cavity; Supraglenoid tubercle; Infraglenoid tubercle; Lateral end of the clavicle; Acromial process; Deltoid muscle; Subscapularis muscle; Lateral border of the scapula. Depends on: Radiology (X-Ray) Orientation pp. 4.
Source direction: Openly licensed radiology teaching case (e.g. Radiopaedia under CC-BY-NC-SA, checked against the product's licence policy), or a fully de-identified departmental film.
Rights: Must be openly licensed or departmentally owned, and must be de-identified: no patient name, MRN, date of birth or accession number anywhere in the frame or in the file metadata. Record the licence before release.

### image · Plain x-ray elbow joint (and lateral view) (Upper Limb)
Brief: Plain x-ray elbow joint (and lateral view), correctly positioned and penetrated, no annotation burnt into the image so markers can be placed by the editor.
Purpose: The orientation station asks the student to name numbered structures on the film. The structure list is the answer key; without the film there is nothing to number.
Priority: required
Status: needed
Kind: imaging example
Notes: Structures that must be visible and markable: Olecranon process; Lateral epicondyle of the humerus; Medial epicondyle of the humerus; Head of radius; Neck of radius; Shaft of the humerus; Olecranon fossa; Radial tuberosity of radius; Trochlea and capitulum; Ulna. Depends on: Radiology (X-Ray) Orientation pp. 5.
Source direction: Openly licensed radiology teaching case (e.g. Radiopaedia under CC-BY-NC-SA, checked against the product's licence policy), or a fully de-identified departmental film.
Rights: Must be openly licensed or departmentally owned, and must be de-identified: no patient name, MRN, date of birth or accession number anywhere in the frame or in the file metadata. Record the licence before release.

### image · Coronal MRI of the elbow joint (Upper Limb)
Brief: Coronal MRI of the elbow joint, correctly positioned and penetrated, no annotation burnt into the image so markers can be placed by the editor.
Purpose: The orientation station asks the student to name numbered structures on the film. The structure list is the answer key; without the film there is nothing to number.
Priority: required
Status: needed
Kind: imaging example
Notes: Structures that must be visible and markable: Lateral epicondyle of the humerus; Medial epicondyle of the humerus; Head of radius; Coronoid process of ulna; Olecranon fossa; Ulnar collateral ligament (arrow). Depends on: Radiology (X-Ray) Orientation pp. 6.
Source direction: Openly licensed radiology teaching case (e.g. Radiopaedia under CC-BY-NC-SA, checked against the product's licence policy), or a fully de-identified departmental film.
Rights: Must be openly licensed or departmentally owned, and must be de-identified: no patient name, MRN, date of birth or accession number anywhere in the frame or in the file metadata. Record the licence before release.

### image · Plain x-ray wrist joint (Upper Limb)
Brief: Plain x-ray wrist joint, correctly positioned and penetrated, no annotation burnt into the image so markers can be placed by the editor.
Purpose: The orientation station asks the student to name numbered structures on the film. The structure list is the answer key; without the film there is nothing to number.
Priority: required
Status: needed
Kind: imaging example
Notes: Structures that must be visible and markable: Radius; Head of ulna; Styloid process of ulna; Scaphoid bone; Lunate bone; Triquetrum bone; Pisiform bone; Trapezium bone; Trapezoid bone; Capitate bone; Hamate bone. Depends on: Radiology (X-Ray) Orientation pp. 7.
Source direction: Openly licensed radiology teaching case (e.g. Radiopaedia under CC-BY-NC-SA, checked against the product's licence policy), or a fully de-identified departmental film.
Rights: Must be openly licensed or departmentally owned, and must be de-identified: no patient name, MRN, date of birth or accession number anywhere in the frame or in the file metadata. Record the licence before release.

### image · Plain x-ray hand (Upper Limb)
Brief: Plain x-ray hand, correctly positioned and penetrated, no annotation burnt into the image so markers can be placed by the editor.
Purpose: The orientation station asks the student to name numbered structures on the film. The structure list is the answer key; without the film there is nothing to number.
Priority: required
Status: needed
Kind: imaging example
Notes: Structures that must be visible and markable: Lower end of radius; Lower end of ulna; Styloid process of ulna; Styloid process of radius; Scaphoid; Lunate; Triquetrum; Trapezium; Trapezoid; Capitate; Hamate; 1st metacarpal; Proximal phalanx of thumb; Proximal phalanx of index; Middle phalanx of middle finger; Terminal phalanx of middle finger. Depends on: Radiology (X-Ray) Orientation pp. 8.
Source direction: Openly licensed radiology teaching case (e.g. Radiopaedia under CC-BY-NC-SA, checked against the product's licence policy), or a fully de-identified departmental film.
Rights: Must be openly licensed or departmentally owned, and must be de-identified: no patient name, MRN, date of birth or accession number anywhere in the frame or in the file metadata. Record the licence before release.

### image · Subtracted axillary arteriogram (Upper Limb)
Brief: Subtracted axillary arteriogram, correctly positioned and penetrated, no annotation burnt into the image so markers can be placed by the editor.
Purpose: The orientation station asks the student to name numbered structures on the film. The structure list is the answer key; without the film there is nothing to number.
Priority: required
Status: needed
Kind: imaging example
Notes: Structures that must be visible and markable: Subclavian artery; Axillary artery; Brachial artery; Posterior circumflex humeral artery; Anterior circumflex humeral artery. Depends on: Radiology (X-Ray) Orientation pp. 9.
Source direction: Openly licensed radiology teaching case (e.g. Radiopaedia under CC-BY-NC-SA, checked against the product's licence policy), or a fully de-identified departmental film.
Rights: Must be openly licensed or departmentally owned, and must be de-identified: no patient name, MRN, date of birth or accession number anywhere in the frame or in the file metadata. Record the licence before release.

### image · Forearm arteriogram (Upper Limb)
Brief: Forearm arteriogram, correctly positioned and penetrated, no annotation burnt into the image so markers can be placed by the editor.
Purpose: The orientation station asks the student to name numbered structures on the film. The structure list is the answer key; without the film there is nothing to number.
Priority: required
Status: needed
Kind: imaging example
Notes: Structures that must be visible and markable: Brachial artery; Ulnar artery; Radial artery; Anterior interosseous artery. Depends on: Radiology (X-Ray) Orientation pp. 10.
Source direction: Openly licensed radiology teaching case (e.g. Radiopaedia under CC-BY-NC-SA, checked against the product's licence policy), or a fully de-identified departmental film.
Rights: Must be openly licensed or departmentally owned, and must be de-identified: no patient name, MRN, date of birth or accession number anywhere in the frame or in the file metadata. Record the licence before release.

### image · Subtracted hand arteriogram (Upper Limb)
Brief: Subtracted hand arteriogram, correctly positioned and penetrated, no annotation burnt into the image so markers can be placed by the editor.
Purpose: The orientation station asks the student to name numbered structures on the film. The structure list is the answer key; without the film there is nothing to number.
Priority: required
Status: needed
Kind: imaging example
Notes: Structures that must be visible and markable: Ulnar artery; Radial artery; Deep palmar arch; Princeps pollicis; Radialis indicis. Depends on: Radiology (X-Ray) Orientation pp. 11.
Source direction: Openly licensed radiology teaching case (e.g. Radiopaedia under CC-BY-NC-SA, checked against the product's licence policy), or a fully de-identified departmental film.
Rights: Must be openly licensed or departmentally owned, and must be de-identified: no patient name, MRN, date of birth or accession number anywhere in the frame or in the file metadata. Record the licence before release.

### image · Plain chest x-ray postero-anterior view (Thorax)
Brief: Plain chest x-ray postero-anterior view, correctly positioned and penetrated, no annotation burnt into the image so markers can be placed by the editor.
Purpose: The orientation station asks the student to name numbered structures on the film. The structure list is the answer key; without the film there is nothing to number.
Priority: required
Status: needed
Kind: imaging example
Notes: Structures that must be visible and markable: Clavicle; Aortic knuckle; Right atrium; Left ventricle; Apex of the heart; Right cupola of the diaphragm; Left cupola of the diaphragm; Trachea; Costodiaphragmatic recess; Cardiophrenic recess; Gastric air bubble; Pulmonary artery; Left auricle; Apex of left lung; Coracoid process; Acromioclavicular joint; Head of the humerus; Right cupola of diaphragm; Left cupola of diaphragm; Gas in the stomach fundus; Pulmonary trunk. Depends on: Radiology (X-Ray) Orientation pp. 13, 14.
Source direction: Openly licensed radiology teaching case (e.g. Radiopaedia under CC-BY-NC-SA, checked against the product's licence policy), or a fully de-identified departmental film.
Rights: Must be openly licensed or departmentally owned, and must be de-identified: no patient name, MRN, date of birth or accession number anywhere in the frame or in the file metadata. Record the licence before release.

### image · Sagittal MRI of the chest (Thorax)
Brief: Sagittal MRI of the chest, correctly positioned and penetrated, no annotation burnt into the image so markers can be placed by the editor.
Purpose: The orientation station asks the student to name numbered structures on the film. The structure list is the answer key; without the film there is nothing to number.
Priority: required
Status: needed
Kind: imaging example
Notes: Structures that must be visible and markable: Arch of aorta; Right ventricle; Left atrium; Manubrium sterni; Body of the sternum; Liver; Left ventricle; Oesophagus; Trachea; Ascending aorta; Right lung; Left lung; Right atrium; Superior vena cava. Depends on: Radiology (X-Ray) Orientation pp. 15, 16, 17.
Source direction: Openly licensed radiology teaching case (e.g. Radiopaedia under CC-BY-NC-SA, checked against the product's licence policy), or a fully de-identified departmental film.
Rights: Must be openly licensed or departmentally owned, and must be de-identified: no patient name, MRN, date of birth or accession number anywhere in the frame or in the file metadata. Record the licence before release.

### image · Aortic angiogram (Thorax)
Brief: Aortic angiogram, correctly positioned and penetrated, no annotation burnt into the image so markers can be placed by the editor.
Purpose: The orientation station asks the student to name numbered structures on the film. The structure list is the answer key; without the film there is nothing to number.
Priority: required
Status: needed
Kind: imaging example
Notes: Structures that must be visible and markable: Ascending aorta; Arch of aorta; Innominate artery; Left common carotid artery; Left subclavian artery; Right subclavian artery; Right common carotid artery; Descending aorta. Depends on: Radiology (X-Ray) Orientation pp. 18, 19.
Source direction: Openly licensed radiology teaching case (e.g. Radiopaedia under CC-BY-NC-SA, checked against the product's licence policy), or a fully de-identified departmental film.
Rights: Must be openly licensed or departmentally owned, and must be de-identified: no patient name, MRN, date of birth or accession number anywhere in the frame or in the file metadata. Record the licence before release.

### image · Plain x-ray of the pelvis anteroposterior view (Lower Limb)
Brief: Plain x-ray of the pelvis anteroposterior view, correctly positioned and penetrated, no annotation burnt into the image so markers can be placed by the editor.
Purpose: The orientation station asks the student to name numbered structures on the film. The structure list is the answer key; without the film there is nothing to number.
Priority: required
Status: needed
Kind: imaging example
Notes: Structures that must be visible and markable: Head of femur; Neck of femur; Obturator foramen; Symphysis pubis; Body of the pubis; Ischial tuberosity; Ilium; Sacroiliac joint; Acetabulum; Iliac crest. Depends on: Radiology (X-Ray) Orientation pp. 21.
Source direction: Openly licensed radiology teaching case (e.g. Radiopaedia under CC-BY-NC-SA, checked against the product's licence policy), or a fully de-identified departmental film.
Rights: Must be openly licensed or departmentally owned, and must be de-identified: no patient name, MRN, date of birth or accession number anywhere in the frame or in the file metadata. Record the licence before release.

### image · Plain x-ray knee (anteroposterior view) (Lower Limb)
Brief: Plain x-ray knee (anteroposterior view), correctly positioned and penetrated, no annotation burnt into the image so markers can be placed by the editor.
Purpose: The orientation station asks the student to name numbered structures on the film. The structure list is the answer key; without the film there is nothing to number.
Priority: required
Status: needed
Kind: imaging example
Notes: Structures that must be visible and markable: Shaft of femur; Lateral femoral condyle; Medial femoral condyle; Lateral tibial condyle; Medial tibial condyle; Shaft of tibia; Intercondylar eminence; Head of fibula. Depends on: Radiology (X-Ray) Orientation pp. 22.
Source direction: Openly licensed radiology teaching case (e.g. Radiopaedia under CC-BY-NC-SA, checked against the product's licence policy), or a fully de-identified departmental film.
Rights: Must be openly licensed or departmentally owned, and must be de-identified: no patient name, MRN, date of birth or accession number anywhere in the frame or in the file metadata. Record the licence before release.

### image · Plain x-ray knee (tunnel view) (Lower Limb)
Brief: Plain x-ray knee (tunnel view), correctly positioned and penetrated, no annotation burnt into the image so markers can be placed by the editor.
Purpose: The orientation station asks the student to name numbered structures on the film. The structure list is the answer key; without the film there is nothing to number.
Priority: required
Status: needed
Kind: imaging example
Notes: Structures that must be visible and markable: Popliteal surface of the femur; Shaft of tibia; Shaft of fibula; Patella; Lateral femoral condyle; Lateral tibial condyle; Medial tibial condyle; Medial femoral condyle; Head of fibula. Depends on: Radiology (X-Ray) Orientation pp. 23.
Source direction: Openly licensed radiology teaching case (e.g. Radiopaedia under CC-BY-NC-SA, checked against the product's licence policy), or a fully de-identified departmental film.
Rights: Must be openly licensed or departmentally owned, and must be de-identified: no patient name, MRN, date of birth or accession number anywhere in the frame or in the file metadata. Record the licence before release.

### image · Plain x-ray knee (lateral view) (Lower Limb)
Brief: Plain x-ray knee (lateral view), correctly positioned and penetrated, no annotation burnt into the image so markers can be placed by the editor.
Purpose: The orientation station asks the student to name numbered structures on the film. The structure list is the answer key; without the film there is nothing to number.
Priority: required
Status: needed
Kind: imaging example
Notes: Structures that must be visible and markable: Shaft of femur; Shaft of tibia; Shaft of fibula; Medial condyle of femur; Lateral condyle of femur; Medial tibial condyle; Patella; Femoral condyles; Tibial tuberosity; Tibial condyles; Intercondylar eminence. Depends on: Radiology (X-Ray) Orientation pp. 24, 25.
Source direction: Openly licensed radiology teaching case (e.g. Radiopaedia under CC-BY-NC-SA, checked against the product's licence policy), or a fully de-identified departmental film.
Rights: Must be openly licensed or departmentally owned, and must be de-identified: no patient name, MRN, date of birth or accession number anywhere in the frame or in the file metadata. Record the licence before release.

### image · Plain x-ray leg (Lower Limb)
Brief: Plain x-ray leg, correctly positioned and penetrated, no annotation burnt into the image so markers can be placed by the editor.
Purpose: The orientation station asks the student to name numbered structures on the film. The structure list is the answer key; without the film there is nothing to number.
Priority: required
Status: needed
Kind: imaging example
Notes: Structures that must be visible and markable: Medial tibial condyle; Lateral tibial condyle; Head of fibula; Shaft of tibia; Shaft of fibula; Medial malleolus; Lateral malleolus; Talus bone. Depends on: Radiology (X-Ray) Orientation pp. 26.
Source direction: Openly licensed radiology teaching case (e.g. Radiopaedia under CC-BY-NC-SA, checked against the product's licence policy), or a fully de-identified departmental film.
Rights: Must be openly licensed or departmentally owned, and must be de-identified: no patient name, MRN, date of birth or accession number anywhere in the frame or in the file metadata. Record the licence before release.

### image · Plain x-ray ankle (anteroposterior view) (Lower Limb)
Brief: Plain x-ray ankle (anteroposterior view), correctly positioned and penetrated, no annotation burnt into the image so markers can be placed by the editor.
Purpose: The orientation station asks the student to name numbered structures on the film. The structure list is the answer key; without the film there is nothing to number.
Priority: required
Status: needed
Kind: imaging example
Notes: Structures that must be visible and markable: Shaft of tibia; Shaft of fibula; Medial malleolus; Lateral malleolus; Talus. Depends on: Radiology (X-Ray) Orientation pp. 27.
Source direction: Openly licensed radiology teaching case (e.g. Radiopaedia under CC-BY-NC-SA, checked against the product's licence policy), or a fully de-identified departmental film.
Rights: Must be openly licensed or departmentally owned, and must be de-identified: no patient name, MRN, date of birth or accession number anywhere in the frame or in the file metadata. Record the licence before release.

### image · Plain x-ray foot (lateral view) (Lower Limb)
Brief: Plain x-ray foot (lateral view), correctly positioned and penetrated, no annotation burnt into the image so markers can be placed by the editor.
Purpose: The orientation station asks the student to name numbered structures on the film. The structure list is the answer key; without the film there is nothing to number.
Priority: required
Status: needed
Kind: imaging example
Notes: Structures that must be visible and markable: Calcaneus; Talus; Navicular; Cuboid; Sesamoid bone; Sustentaculum tali; Cuneiform bones; Metatarsal bones. Depends on: Radiology (X-Ray) Orientation pp. 28.
Source direction: Openly licensed radiology teaching case (e.g. Radiopaedia under CC-BY-NC-SA, checked against the product's licence policy), or a fully de-identified departmental film.
Rights: Must be openly licensed or departmentally owned, and must be de-identified: no patient name, MRN, date of birth or accession number anywhere in the frame or in the file metadata. Record the licence before release.

### image · Femoral artery angiogram (Lower Limb)
Brief: Femoral artery angiogram, correctly positioned and penetrated, no annotation burnt into the image so markers can be placed by the editor.
Purpose: The orientation station asks the student to name numbered structures on the film. The structure list is the answer key; without the film there is nothing to number.
Priority: required
Status: needed
Kind: imaging example
Notes: Structures that must be visible and markable: Femoral artery; Profunda femoris artery; Obturator artery. Depends on: Radiology (X-Ray) Orientation pp. 29.
Source direction: Openly licensed radiology teaching case (e.g. Radiopaedia under CC-BY-NC-SA, checked against the product's licence policy), or a fully de-identified departmental film.
Rights: Must be openly licensed or departmentally owned, and must be de-identified: no patient name, MRN, date of birth or accession number anywhere in the frame or in the file metadata. Record the licence before release.

### image · Popliteal arteriogram (Lower Limb)
Brief: Popliteal arteriogram, correctly positioned and penetrated, no annotation burnt into the image so markers can be placed by the editor.
Purpose: The orientation station asks the student to name numbered structures on the film. The structure list is the answer key; without the film there is nothing to number.
Priority: required
Status: needed
Kind: imaging example
Notes: Structures that must be visible and markable: Femoral artery; Popliteal artery; Posterior tibial artery; Anterior tibial artery; Superior medial genicular artery; Superior lateral genicular artery; Inferior medial genicular artery. Depends on: Radiology (X-Ray) Orientation pp. 30.
Source direction: Openly licensed radiology teaching case (e.g. Radiopaedia under CC-BY-NC-SA, checked against the product's licence policy), or a fully de-identified departmental film.
Rights: Must be openly licensed or departmentally owned, and must be de-identified: no patient name, MRN, date of birth or accession number anywhere in the frame or in the file metadata. Record the licence before release.
