<!--
  Practical items for 108 INT — Pathology, Year 1, Kasr Al Ainy (kau).

  Ten records, one per teaching item catalogued in
  ../../../scripts/kasr/extract/108-INT/practical.json from
  `Dpt Book Pathology Practical [INT-108].pdf` — "Atlas of Practical General
  Pathology, Modules INT-108 & INT-208, Faculty of Medicine Cairo University,
  2025-2026", manifest source ID src_a2ffe25e8362fe840ceb. Six are microscopic
  slides, four are gross museum specimens. All ten are Pathology.

  ==================================================================
  1 · THIS IS AN EXCERPT, NOT THE MODULE'S PRACTICAL
  ==================================================================

  The supplied PDF carries printed page numbers 1, 2, 3, 4 and then jumps
  straight to 22, 23, 24. Printed pages 5-21 — seventeen pages — are absent
  outright, and the book continues past printed 24 by an unknown amount. Every
  teaching page held carries exactly two items with no exceptions, so the twenty
  histopathology teaching pages (printed 2-21) imply about forty histopathology
  items against the six held; the four gross items are a floor with no ceiling.

  These ten records are therefore roughly 23% of the atlas — 10 of at least 44 —
  and they must not be counted, published or timetabled as the module's practical
  syllabus. The department needs to be asked for printed pages 5-21 and everything
  after printed page 24 before this batch is treated as complete.

  A second sign of the same gap: the atlas numbers its glass slides, and the two
  described here are SLIDE (7) and SLIDE (9). Those numbers index the department's
  physical slide box rather than a position in the book, so they are not evidence
  about which pages were removed — but they do say the numbered set runs to at
  least nine and that this file documents two of those numbers.

  ==================================================================
  2 · C19-1 CONTRADICTS ITSELF AND IS AUTHORED UNRESOLVED
  ==================================================================

  On specimen C19-1 (the tabby-cat heart, PRC-FND-INT108-C19-1) the atlas's gross
  description says the LEFT ventricle is hypertrophied and dilated, the numbered
  diagnosis printed beneath it says the RIGHT, and the plate's own printed label
  reads "L.V." The extraction confirmed all three on the rendered page at 300 dpi,
  so this is a defect in the book and not an OCR error. The same diagnosis list
  also ends with an empty numbered item "4." — a fourth diagnosis was intended and
  never written.

  No side is picked here. The item is authored with a mark scheme that records
  ventricular hypertrophy and dilatation without naming a ventricle, so an examiner
  can mark it either way once a pathologist rules; the source's second numbered
  diagnosis, which is the line that names a side, is deliberately absent from the
  Final diagnosis section. The missing fourth diagnosis is not guessed at.

  ==================================================================
  3 · STAINS ARE NAMED ONCE, AND NEVER INFERRED
  ==================================================================

  Exactly one plate in the extract names its stain: the paired Prussian-blue / H&E
  plate of hepatic haemochromatosis (PRC-FND-INT108-DS04). Everywhere else the
  atlas prints no stain at all. Two captions give a colour — "homogenous pink" for
  the splenic hyalinosis, "blue basophilic" for the calcific deposits — and those
  are colour cues about what is on the slide, not statements about how it was
  prepared. H&E is nowhere inferred from them, in a mark scheme, an objective or a
  media brief. Magnification is null throughout: the atlas prints none on any plate.

  Each unstained micrograph says so on its own `references` block, so a student and
  a reviewer both see the limit rather than inheriting an assumption.

  ==================================================================
  4 · WHY EVERY ITEM IS A SKILLS CHECKLIST
  ==================================================================

  Five practical `type` values share one importer schema, and only one of them fits
  what this atlas actually sets.

  `Skills checklist` — chosen. Manual 08 defines it as a procedure broken into
  observable steps, in the order they are performed, marked by an examiner, with no
  simulated patient and no actor brief. That is exactly an OSPE spot station, and
  the atlas supplies the procedure itself: its two introduction pages print the
  department's own method. For a slide (printed page 1): naked-eye examination
  before the microscope, low power to identify tissue, lesion and pattern, high
  power for cellular features, then "Section in ....... (Tissue?)", then the lesion,
  then a final diagnosis naming lesion and organ. For a gross specimen (printed page
  22): identify and describe the lesion, commenting on specimen, size, shape,
  surface, borders in a jarred specimen and cut surface, then a final diagnosis
  naming lesion and organ. Every mark-scheme section below is that method plus the
  item's own listed features. Nothing in these mark schemes is authored beyond the
  atlas's own two pages of guidance and the item's own caption.

  `OSCE station` — rejected. The validator refuses a station with no actor brief,
  and correctly: an encounter needs someone to answer. A spot station has no
  patient, and inventing a history so that a heart in a jar could have one would be
  fabricating the clinical scenario the atlas does not have.

  `Clinical case` — rejected. The source carries no history, no results, no
  decisions and no management. Every decision point would be invented.

  `Lab interpretation` — rejected. There is not one laboratory value in the source.

  `Imaging interpretation` — the near miss, and worth stating why it lost. Its model
  would hold the plate, and manual 10's rule that an image-based item cannot publish
  without its image is true here too. But every block in that format must be an MCQ
  with exactly one correct option and a `Why:` on every distractor, and the atlas
  gives a caption and a diagnosis, not options — so every distractor would be
  authored rather than extracted. More importantly, the thing being examined at
  Kasr Al Ainy is a systematic spoken description ending in a diagnosis, which the
  department printed as its own method. A checklist reproduces that; a multiple
  choice replaces it. The media requests in
  ../media-requests/108-INT-practical-media-requests.md agree: they ask for `Kind:
  histology` and `Kind: clinical photograph`, not `Kind: imaging example`.

  ==================================================================
  5 · CURRICULUM TAGGING, AND WHAT THE SCHEMA CANNOT CARRY
  ==================================================================

  `IMPORT_SCHEMAS.practical` has 27 columns and none of them is `universities`,
  `years` or `module` — articles, questions and concepts have all three, practicals
  have none, and an unknown column is a hard error in the batch validator. So:

    · `108 INT` rides on the first segment of every `module_subject` path, which is
      how `resolveModuleSubjectPath` reads a module out of a written path anyway.
    · `kau` and `KAU_Y1` are written into every item's `references` block, which is
      the only prose field on a practical that survives import. They are recorded
      rather than guessed; a human retagging these once the schema grows a column
      will find them there.

  Every `module_subject` path is copied segment for segment from
  ../academic/108-int-structure.md, including the book's own spellings.

  ==================================================================
  6 · MEDIA
  ==================================================================

  The repository holds zero medical images, so all ten items need an asset that does
  not exist and none of them can publish until a human supplies it. Every block in
  `media_recommendations` below is carried over from
  ../media-requests/108-INT-practical-media-requests.md, which Omar authored — same
  brief, same purpose, same kind, same rights line, same `Notes:` line naming the
  owning `INT108-PRAC-PATHO-…` item ID. One line was added to each: `Section:
  station`. The importer reads a medium-led heading's tail as the section name, so
  `### image · Hyaline degeneration, spleen` would otherwise be taken as naming a
  question block that does not exist in a checklist, and the row would fail. For
  this format the only valid section is the literal `station`.

  No `station_image` is set on any item. That column takes a real working URL, and a
  placeholder there shows a student a broken image.

  The atlas's preface admits "only few pictures are downloaded from websites", so
  the department does not own every plate in it and does not say which. Nothing from
  the source PDF may be re-hosted without a licence check; every request asks for a
  freshly licensed equivalent or an original departmental photograph.

  ==================================================================
  7 · VALIDATION
  ==================================================================

    node --experimental-strip-types scripts/validate-content-batch.mjs \
      "docs/Kasr-Source-Imports/practical/108-INT-practical.md" \
      --with "docs/Kasr-Source-Imports/concept/108-INT-concepts-pathology.md"

  Every concept ID named below is one of the 49 in that sibling file. None is live
  yet, so the concepts must be imported first — the import order is concept before
  practical in any case.

  Import: Admin › Bulk import → practical. Import ONCE. The atlas covers INT-108 and
  INT-208 and the corpus files the same file under both, flagged crossModulePractical;
  importing per folder would create these ten items twice.
-->

# Item

## id
PRC-FND-INT108-SLIDE07

## title
Spot the slide: hyaline degeneration of the spleen

## subject
fnd

## type
Skills checklist

## status
Draft

## owner
Claude

## duration
5

## marks
20

## difficulty
Moderate

## mark_scheme
Approach to the slide (6): Examines the slide with the naked eye before placing it on the stage
Approach to the slide (6): Identifies the tissue and the pattern of the lesion under low power before changing objective
Approach to the slide (6): Moves to high power to read the cellular detail
Describing the section (10): Opens the description by naming the tissue — section in spleen
Describing the section (10): Points out the splenic capsule and says it is thickened, structureless and homogenous
Describing the section (10): Points out a fibrous trabecula and says it carries the same change
Describing the section (10): Finds a lymphoid follicle and its central arteriole
Describing the section (10): States that the arteriolar wall is thickened and its lumen narrowed
Final diagnosis (4): Gives the diagnosis as lesion plus organ — hyaline degeneration (hyalinosis), spleen
Final diagnosis (4): Says that hyaline names an appearance rather than one substance, so the word is a description and not a diagnosis on its own

## module_subject
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Hyaline Change

## main_concept
CON-FND-5CB8B822A9A6AF

## concept_ids
[clear]

## contextual_concept_ids
CON-FND-0A32C902A825AA

## learning_objective
Work through a histopathology slide in the department's own order — naked eye, low power, high power — and describe hyaline degeneration of the spleen in the capsule, the trabeculae and the central arterioles of the lymphoid follicles, closing with a diagnosis that names both the lesion and the organ.

## references
Atlas of Practical General Pathology, Modules INT-108 & INT-208, Faculty of Medicine Cairo University, 2025-2026 — SLIDE (7), printed page 2. Manifest source src_a2ffe25e8362fe840ceb.
Method: the same atlas's steps for examining a histopathology slide, printed page 1.
The atlas names no stain for this plate. Its "homogenous pink" is a colour cue about the section, not a statement of how it was prepared, and no stain should be assumed from it. No magnification is printed on any plate in this atlas.
Kasr Al Ainy (kau) · Year 1 (KAU_Y1) · module 108 INT · Pathology.

## media_recommendations
### image · Hyaline degeneration, spleen
Brief: Micrograph of spleen in which the capsule and a fibrous trabecula are both in frame and visibly thickened and structureless, together with a lymphoid follicle whose central arteriole shows a thickened wall and a narrowed lumen.
Purpose: The station asks the student to identify the lesion and the organ from the section. There is no text on the stem the answer can be read off.
Priority: required
Status: needed
Kind: histology
Section: station
Notes: Owning item: INT108-PRAC-PATHO-S07 (SLIDE (7)). Stain: not named by the source; the caption calls the hyalinosis "homogenous pink", which is a colour cue only and not a statement of stain. Magnification: not printed. Structures that must be visible and markable: splenic capsule showing hyalinosis; fibrous trabecula showing hyalinosis; lymphoid follicle; central arteriole with thickened wall and narrowed lumen.
Source direction: An original section photographed by the pathology department, Cairo University, or an openly licensed histopathology teaching collection.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release. Do not re-host the plate from the source PDF — its preface admits some images were downloaded from websites.

---

# Item

## id
PRC-FND-INT108-SLIDE09

## title
Spot the slide: fatty degeneration (steatosis) of the liver

## subject
fnd

## type
Skills checklist

## status
Draft

## owner
Claude

## duration
5

## marks
20

## difficulty
Easy

## mark_scheme
Approach to the slide (6): Examines the slide with the naked eye before placing it on the stage
Approach to the slide (6): Identifies the tissue and the pattern of the lesion under low power before changing objective
Approach to the slide (6): Moves to high power to read the cellular detail
Describing the section (10): Opens the description by naming the tissue — section in liver
Describing the section (10): States that the hepatocytes are distended by cytoplasmic vacuoles
Describing the section (10): States that the vacuoles are empty
Describing the section (10): States that the nucleus is pushed to one side, giving the cell a signet-ring appearance
Describing the section (10): Explains that the vacuole marks where fat sat and was dissolved out by the xylol and alcohol used to prepare the paraffin section
Final diagnosis (4): Gives the diagnosis as lesion plus organ — fatty degeneration (steatosis), liver
Final diagnosis (4): Names the accumulating substance as triglyceride within parenchymal cells

## module_subject
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Lipids intracellular accumulations > Steatosis (Fatty Change)

## main_concept
CON-FND-70554B38361679

## concept_ids
CON-FND-3B89025E2FB4E0

## contextual_concept_ids
CON-FND-A0BC07E35554B1

## learning_objective
Recognise steatosis in a paraffin section of liver by the empty cytoplasmic vacuole and the displaced nucleus, and explain why the fat itself is absent from the slide rather than reporting an empty cell.

## references
Atlas of Practical General Pathology, Modules INT-108 & INT-208, Faculty of Medicine Cairo University, 2025-2026 — SLIDE (9), printed page 2. Manifest source src_a2ffe25e8362fe840ceb.
Method: the same atlas's steps for examining a histopathology slide, printed page 1.
The atlas names no stain for this plate, and no stain should be assumed. It does state the preparation — a paraffin section — which is what the caption's explanation of the empty vacuole depends on. No magnification is printed on any plate in this atlas.
Kasr Al Ainy (kau) · Year 1 (KAU_Y1) · module 108 INT · Pathology.

## media_recommendations
### image · Fatty degeneration (steatosis), liver
Brief: Micrograph of liver in which hepatocytes are distended by large empty cytoplasmic vacuoles with the nucleus displaced to one side, so the signet-ring appearance is unmistakable at the printed size.
Purpose: Identify-the-lesion station. The empty vacuole is the whole teaching point and cannot be described into existence.
Priority: required
Status: needed
Kind: histology
Section: station
Notes: Owning item: INT108-PRAC-PATHO-S09 (SLIDE (9)). Stain: not named by the source. Magnification: not printed. Structures that must be visible and markable: hepatocytes with empty cytoplasmic vacuoles; nuclei pushed to one side giving the signet-ring appearance; adjacent unaffected hepatocytes for contrast.
Source direction: An original section photographed by the pathology department, Cairo University, or an openly licensed histopathology teaching collection.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release. Do not re-host the plate from the source PDF.

---

# Item

## id
PRC-FND-INT108-DS01

## title
Spot the slide: traumatic fat necrosis

## subject
fnd

## type
Skills checklist

## status
Draft

## owner
Claude

## duration
5

## marks
20

## difficulty
Moderate

## mark_scheme
Approach to the slide (6): Examines the slide with the naked eye before placing it on the stage
Approach to the slide (6): Identifies the tissue and the pattern of the lesion under low power before changing objective
Approach to the slide (6): Moves to high power to read the cellular detail
Describing the section (10): Opens the description by naming the tissue — section in adipose tissue
Describing the section (10): Identifies ghost outlines where fat cells have died
Describing the section (10): Identifies foamy macrophages surrounding them and says the foam is engulfed fat
Describing the section (10): Identifies multinucleated giant cells in the same field
Final diagnosis (4): Gives the diagnosis as lesion plus tissue — traumatic fat necrosis
Final diagnosis (4): Separates the traumatic form from the enzymatic form, which is the one that produces chalky calcium soaps

## module_subject
108 INT > Pathology > Cellular Response to Injury > Necrosis > Types of necrosis > Fat necrosis

## main_concept
CON-FND-6626C19B61A23B

## concept_ids
CON-FND-4CD77608FB35DF

## contextual_concept_ids
CON-FND-8DA30AD870AC1E

## learning_objective
Identify traumatic fat necrosis from the three cell populations the department's caption names — ghosts of fat cells, foamy macrophages and multinucleated giant cells — and say which of the two forms of fat necrosis the section shows.

## references
Atlas of Practical General Pathology, Modules INT-108 & INT-208, Faculty of Medicine Cairo University, 2025-2026 — data show plate, printed page 3. Manifest source src_a2ffe25e8362fe840ceb.
Method: the same atlas's steps for examining a histopathology slide, printed page 1.
The atlas names no stain and no preparation for this plate, and neither should be assumed. No magnification is printed on any plate in this atlas.
Kasr Al Ainy (kau) · Year 1 (KAU_Y1) · module 108 INT · Pathology.

## media_recommendations
### image · Traumatic fat necrosis
Brief: Micrograph of adipose tissue showing ghost outlines of dead fat cells ringed by foamy macrophages, with at least one multinucleated giant cell in the same field.
Purpose: Identify-the-lesion station. The three named cell types are the mark scheme, so all three must be in one field.
Priority: required
Status: needed
Kind: histology
Section: station
Notes: Owning item: INT108-PRAC-PATHO-DS01. Stain: not named by the source. Magnification: not printed. Structures that must be visible and markable: ghosts of fat cells; foamy macrophages; multinucleated giant cells.
Source direction: An original section photographed by the pathology department, Cairo University, or an openly licensed histopathology teaching collection.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release. Do not re-host the plate from the source PDF.

---

# Item

## id
PRC-FND-INT108-DS02

## title
Spot the slide: renal infarction with coagulative necrosis

## subject
fnd

## type
Skills checklist

## status
Draft

## owner
Claude

## duration
5

## marks
20

## difficulty
Moderate

## mark_scheme
Approach to the slide (6): Examines the slide with the naked eye before placing it on the stage
Approach to the slide (6): Identifies the tissue and the pattern of the lesion under low power before changing objective
Approach to the slide (6): Moves to high power to read the cellular detail
Describing the section (10): Opens the description by naming the tissue — section in kidney
Describing the section (10): Identifies a zone in which the tissue architecture is still recognisable although the cells within it are dead
Describing the section (10): Names that appearance coagulative necrosis
Describing the section (10): Compares the necrotic zone with the viable renal tissue beside it in the same field
Describing the section (10): Identifies inflammatory cells at the margin of the lesion
Final diagnosis (4): Gives the diagnosis as lesion plus organ — renal infarction with coagulative necrosis
Final diagnosis (4): Explains that the outline survives because denaturation of the cell's proteins outruns its autolysis

## module_subject
108 INT > Pathology > Cellular Response to Injury > Necrosis > Types of necrosis > Coagulative necrosis (ischemic necrosis)

## main_concept
CON-FND-5285A9707E61CA

## concept_ids
CON-FND-4CD77608FB35DF

## contextual_concept_ids
CON-FND-8989A49BEBCF14

## learning_objective
Recognise coagulative necrosis in a renal infarct by the preserved tissue outline, justify the diagnosis by comparing the dead zone with the living parenchyma next to it, and explain why the architecture survives the cells.

## references
Atlas of Practical General Pathology, Modules INT-108 & INT-208, Faculty of Medicine Cairo University, 2025-2026 — data show plate, printed page 3. Manifest source src_a2ffe25e8362fe840ceb.
Method: the same atlas's steps for examining a histopathology slide, printed page 1.
The atlas names no stain and no preparation for this plate, and neither should be assumed. No magnification is printed on any plate in this atlas.
Kasr Al Ainy (kau) · Year 1 (KAU_Y1) · module 108 INT · Pathology.

## media_recommendations
### image · Infarction, kidney
Brief: Micrograph of kidney containing both infarcted and viable tissue in one field, so the preserved outlines of coagulative necrosis can be compared directly with the living parenchyma beside them, with the inflammatory margin included.
Purpose: Identify-the-lesion station. The comparison is the teaching point, so a field of pure necrosis will not do.
Priority: required
Status: needed
Kind: histology
Section: station
Notes: Owning item: INT108-PRAC-PATHO-DS02. Stain: not named by the source. Magnification: not printed. Structures that must be visible and markable: zone of coagulative necrosis with maintained architecture; adjacent viable renal tissue; inflammatory cells at the margin. The atlas's caption points at the necrotic zone with an arrow, so leave room for an arrow marker over that zone.
Source direction: An original section photographed by the pathology department, Cairo University, or an openly licensed histopathology teaching collection.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release. Do not re-host the plate from the source PDF.

---

# Item

## id
PRC-FND-INT108-DS03

## title
Spot the slide: dystrophic calcification in fibrotic tissue

## subject
fnd

## type
Skills checklist

## status
Draft

## owner
Claude

## duration
5

## marks
20

## difficulty
Moderate

## mark_scheme
Approach to the slide (6): Examines the slide with the naked eye before placing it on the stage
Approach to the slide (6): Identifies the tissue and the pattern of the lesion under low power before changing objective
Approach to the slide (6): Moves to high power to read the cellular detail
Describing the section (10): Opens the description by naming the tissue — section in fibrotic tissue
Describing the section (10): Identifies deposits of calcium within the fibrous tissue and describes them as basophilic
Describing the section (10): Identifies inflammatory cells in the same field
Describing the section (10): Points out the ragged, torn foci and explains them as a cutting artefact where the microtome knife met the calcium
Final diagnosis (4): Gives the diagnosis as lesion plus tissue — dystrophic calcification in fibrotic tissue
Final diagnosis (4): States that calling it dystrophic rather than metastatic rests on a normal serum calcium, which the section cannot show

## module_subject
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Pathological Calcification > Dystrophic calcification

## main_concept
CON-FND-33466CEBFC4EBA

## concept_ids
CON-FND-718662116D90C4

## contextual_concept_ids
CON-FND-87392C49DB246C

## learning_objective
Identify calcium deposited in damaged fibrous tissue, read the microtome tearing as evidence of calcium rather than as a spoiled slide, and state what the section alone cannot settle — whether the calcification is dystrophic or metastatic.

## references
Atlas of Practical General Pathology, Modules INT-108 & INT-208, Faculty of Medicine Cairo University, 2025-2026 — data show plate, printed page 4. Manifest source src_a2ffe25e8362fe840ceb.
Method: the same atlas's steps for examining a histopathology slide, printed page 1.
The atlas names no stain for this plate. Its "blue basophilic" is a colour cue about the deposits, not a statement of how the section was prepared, and no stain should be assumed from it. The caption does note tearing by the microtome knife, which implies a cut section. No magnification is printed on any plate in this atlas.
Kasr Al Ainy (kau) · Year 1 (KAU_Y1) · module 108 INT · Pathology.

## media_recommendations
### image · Dystrophic calcification
Brief: Micrograph of fibrotic tissue carrying basophilic calcific deposits, with the characteristic ragged tearing at the calcified foci left visible rather than cropped out.
Purpose: Identify-the-lesion station, and the tearing artefact is itself examinable — the caption explains it, so the image must contain it.
Priority: required
Status: needed
Kind: histology
Section: station
Notes: Owning item: INT108-PRAC-PATHO-DS03. Stain: not named by the source; the caption's "basophilic" is a colour cue only. Magnification: not printed. Structures that must be visible and markable: basophilic calcific deposits; surrounding fibrous tissue; inflammatory cells; ragged or torn foci left by the microtome cutting through calcium.
Source direction: An original section photographed by the pathology department, Cairo University, or an openly licensed histopathology teaching collection.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release. Do not re-host the plate from the source PDF.

---

# Item

## id
PRC-FND-INT108-DS04

## title
Spot the slide: haemosiderin in hepatic haemochromatosis, Prussian blue beside H&E

## subject
fnd

## type
Skills checklist

## status
Draft

## owner
Claude

## duration
5

## marks
20

## difficulty
Hard

## mark_scheme
Approach to the slide (6): Examines the slide with the naked eye before placing it on the stage
Approach to the slide (6): Identifies the tissue and the pattern of the lesion under low power before changing objective
Approach to the slide (6): Moves to high power to read the cellular detail
Reading the two stains (8): Opens the description by naming the tissue — section in liver
Reading the two stains (8): Names the stain the atlas states for this plate — Prussian blue
Reading the two stains (8): Describes the pigment in the Prussian-blue section as blue granules lying within the cells
Reading the two stains (8): States that the same pigment appears brown in the H&E section printed alongside it
Final diagnosis (6): Gives the diagnosis as lesion plus organ — hepatic haemochromatosis with haemosiderin deposition
Final diagnosis (6): Names haemosiderin as stored excess iron
Final diagnosis (6): Declines to call a brown pigment iron on its colour alone, and says that the iron stain is what settles it

## module_subject
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Pigments > Endogenous Pigments

## main_concept
CON-FND-5DBC795B58DC74

## concept_ids
CON-FND-B9A3C8B28B1443

## contextual_concept_ids
CON-FND-C96C66BC1A17DF

## learning_objective
Read a paired plate of the same haemochromatotic liver and say what each stain contributes: that the brown granules of the routine section and the blue granules of the Prussian-blue section are one pigment, that the pigment is haemosiderin, and that colour alone does not identify iron.

## references
Atlas of Practical General Pathology, Modules INT-108 & INT-208, Faculty of Medicine Cairo University, 2025-2026 — data show plate, printed page 4. Manifest source src_a2ffe25e8362fe840ceb.
Method: the same atlas's steps for examining a histopathology slide, printed page 1.
This is the one plate in the supplied extract whose stain the atlas states: Prussian blue, with H&E named as the comparison section. Every other plate in this batch names none, and none is inferred. No magnification is printed on any plate in this atlas.
Kasr Al Ainy (kau) · Year 1 (KAU_Y1) · module 108 INT · Pathology.

## media_recommendations
### image · Prussian blue — hepatic haemochromatosis
Brief: Paired plate of the same haemochromatotic liver: one Prussian-blue section in which the haemosiderin is blue, and one H&E section of comparable field in which the same pigment is brown. Both sections must be in the one plate.
Purpose: Identify-the-stain-and-the-pigment station. The teaching point is the colour change between the two stains, so a single section teaches half the caption and cannot be marked against it.
Priority: required
Status: needed
Kind: histology
Section: station
Notes: Owning item: INT108-PRAC-PATHO-DS04. Stain: Prussian blue, with H&E named as the comparison section — the only plate in the extract whose stain the source states. Magnification: not printed. Structures that must be visible and markable: blue haemosiderin granules in the Prussian-blue section; brown haemosiderin granules in the H&E section; hepatocytes in both. This is one request for a two-section plate, not two requests.
Source direction: An original section photographed by the pathology department, Cairo University, or an openly licensed histopathology teaching collection. Both sections should come from the same case.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release. Do not re-host the plate from the source PDF.

---

<!--
  C18-1 and the three specimens that follow are gross museum material. The atlas's
  preface records the Cairo University pathology museum, begun by the late Prof.
  Anwar Mahfouz Elwi, as the source of about 1400 specimens, which is the only
  statement of preparation any of them carries. A gross specimen has no stain and
  no magnification, which is why neither appears on these four records.
-->

# Item

## id
PRC-FND-INT108-C18-1

## title
Spot the specimen: brown atrophy of the heart (C18-1)

## subject
fnd

## type
Skills checklist

## status
Draft

## owner
Claude

## duration
5

## marks
20

## difficulty
Moderate

## mark_scheme
Approach to the specimen (6): Names the specimen and the organ before describing any lesion — a heart opened on its left side
Approach to the specimen (6): Comments on size, then shape, then surface, in that order
Approach to the specimen (6): Comments on the borders of the jarred specimen, rather than reporting a consistency that only a fresh specimen allows
Approach to the specimen (6): Describes the cut surface — its colour, and any cavity, cyst or mass within it
Describing the specimen (10): States that the heart is reduced in size, and judges that against the aorta in the same frame rather than from memory
Describing the specimen (10): States that the myocardium is dark brown
Describing the specimen (10): States that the coronary arteries on the outer surface are tortuous
Describing the specimen (10): States that the pericardial fat has been replaced by serous tissue, and names that serous atrophy of fat
Describing the specimen (10): States that the aorta carries yellow atherosclerotic patches
Final diagnosis (4): Gives the first diagnosis — brown atrophy of the heart with serous atrophy of the pericardial fat
Final diagnosis (4): Gives the second diagnosis — atherosclerosis of the aorta
Final diagnosis (4): Attributes the brown colour to lipofuscin, the wear-and-tear pigment, rather than to blood

## module_subject
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Pigments > Endogenous Pigments

## main_concept
CON-FND-063F60318B4D20

## concept_ids
CON-FND-2A370D3EF3EDCF
CON-FND-DF726F864C8BC3

## contextual_concept_ids
CON-FND-3BB4FF8F2223FF

## learning_objective
Describe a jarred heart in the department's own order and read brown atrophy off it — a small dark brown heart judged against the aorta beside it, tortuous coronaries and serous atrophy of the pericardial fat — naming lipofuscin as the pigment and giving both of the specimen's diagnoses.

## references
Atlas of Practical General Pathology, Modules INT-108 & INT-208, Faculty of Medicine Cairo University, 2025-2026 — specimen C18-1, printed page 23. Manifest source src_a2ffe25e8362fe840ceb.
Method: the same atlas's steps for describing a gross specimen, printed page 22.
A gross specimen carries no stain and no magnification. The atlas's preface records the departmental museum of about 1400 specimens as the source of this material.
Kasr Al Ainy (kau) · Year 1 (KAU_Y1) · module 108 INT · Pathology.

## media_recommendations
### image · Brown atrophy of the heart
Brief: Photograph of a heart opened on the left side, framed with the aorta in shot so the reduced cardiac size can be judged against it, showing dark brown myocardium, tortuous surface coronaries, and pericardial fat replaced by gelatinous serous tissue.
Purpose: Identify-the-specimen station. All five gross findings are read off the photograph, and the size judgement in particular fails if the aorta is cropped out.
Priority: required
Status: needed
Kind: clinical photograph
Section: station
Notes: Owning item: INT108-PRAC-PATHO-C18-1. Stain: not applicable to a gross specimen. Structures that must be visible and markable: dark brown myocardium; the heart small relative to the aorta in the same frame; tortuous coronary arteries on the outer surface; serous atrophy of pericardial fat; yellow atherosclerotic patches on the aorta.
Source direction: An original photograph of the numbered museum specimen held by the pathology department, Cairo University, or an openly licensed gross-pathology atlas.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release. Do not re-host the plate from the source PDF.

---

<!--
  C19-1 — the defective plate. Preamble section 2 states the contradiction in full.
  In this record specifically:

    · the mark scheme records ventricular hypertrophy and dilatation with no
      ventricle named, so it can be marked either way once a pathologist rules;
    · the source's numbered diagnosis 2, "Hypertrophy and dilatation of right
      ventricle", is deliberately not reproduced in the Final diagnosis section,
      because the gross description above it says left and the plate is labelled
      "L.V.";
    · the source's numbered diagnosis 4 is an empty "4." with no text, and nothing
      is written in its place.

  Do not resolve any of this by picking the likelier side. It is a defect in a
  faculty book and a pathologist owns it.
-->

# Item

## id
PRC-FND-INT108-C19-1

## title
Spot the specimen: fatty change of the heart, the tabby-cat heart (C19-1)

## subject
fnd

## type
Skills checklist

## status
Draft

## owner
Claude

## duration
5

## marks
20

## difficulty
Hard

## mark_scheme
Approach to the specimen (6): Names the specimen and the organ before describing any lesion — a heart with the chambers opened
Approach to the specimen (6): Comments on size, then shape, then surface, in that order
Approach to the specimen (6): Comments on the borders of the jarred specimen, rather than reporting a consistency that only a fresh specimen allows
Approach to the specimen (6): Describes the cut surface — its colour, and any cavity, cyst or mass within it
Describing the specimen (10): States that the myocardium is yellow
Describing the specimen (10): States that the columnae carneae show brown dots alternating with yellow ones
Describing the specimen (10): Names that alternation the tabby-cat appearance
Describing the specimen (10): Notes ventricular hypertrophy and dilatation
Describing the specimen (10): States that the aorta and the mitral valve carry yellow atherosclerotic patches
Final diagnosis (4): Gives the first diagnosis — fatty change of the heart, the tabby-cat heart
Final diagnosis (4): Gives the second diagnosis — atherosclerosis of the aorta and the mitral valve

## module_subject
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Lipids intracellular accumulations > Steatosis (Fatty Change)

## main_concept
CON-FND-4354823564BAB3

## concept_ids
CON-FND-3B89025E2FB4E0

## contextual_concept_ids
CON-FND-3BB4FF8F2223FF
CON-FND-DF726F864C8BC3

## learning_objective
Describe a jarred heart showing fatty change and name the tabby-cat appearance from the alternating brown and yellow banding of the columnae carneae, giving the specimen's diagnoses of fatty change and of atherosclerosis of the aorta and mitral valve.

## references
Atlas of Practical General Pathology, Modules INT-108 & INT-208, Faculty of Medicine Cairo University, 2025-2026 — specimen C19-1, printed page 23. Manifest source src_a2ffe25e8362fe840ceb.
Method: the same atlas's steps for describing a gross specimen, printed page 22.
Unresolved defect in the source: the atlas's gross description of this specimen says the LEFT ventricle is hypertrophied and dilated, the numbered diagnosis beneath it says the RIGHT, and the plate's own label reads "L.V." All three were confirmed on the rendered page at 300 dpi, so this is a defect in the book rather than a reading error. The mark scheme above therefore records the hypertrophy and dilatation without naming a ventricle, and a pathologist must rule on the side before this item publishes. The source's numbered diagnosis list also ends with an empty item "4.", which is not guessed at here.
A gross specimen carries no stain and no magnification. The atlas's preface records the departmental museum of about 1400 specimens as the source of this material.
Kasr Al Ainy (kau) · Year 1 (KAU_Y1) · module 108 INT · Pathology.

## media_recommendations
### image · Fatty change of the heart (tabby cat)
Brief: Photograph of a heart with the chambers opened, showing yellow myocardium and columnae carneae mottled with alternating brown and yellow bands — the tabby-cat striping — with the aorta and mitral valve in frame.
Purpose: Identify-the-specimen station. The striping is the diagnosis and only survives as an image.
Priority: required
Status: needed
Kind: clinical photograph
Section: station
Notes: Owning item: INT108-PRAC-PATHO-C19-1. Stain: not applicable to a gross specimen. Structures that must be visible and markable: yellow myocardium; brown-and-yellow banded columnae carneae; a hypertrophied and dilated ventricle; yellow atherosclerotic patches on the aorta and mitral valve. **Unresolved in the source:** the gross description says left ventricle, the diagnosis says right, and the plate is labelled "L.V.". Frame the photograph so either can be labelled, and do not caption it until a pathologist has settled which.
Source direction: An original photograph of the numbered museum specimen held by the pathology department, Cairo University, or an openly licensed gross-pathology atlas.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release. Do not re-host the plate from the source PDF.

---

# Item

## id
PRC-FND-INT108-D105-2

## title
Spot the specimen: liver steatosis, fatty change (D105-2)

## subject
fnd

## type
Skills checklist

## status
Draft

## owner
Claude

## duration
5

## marks
20

## difficulty
Easy

## mark_scheme
Approach to the specimen (6): Names the specimen and the organ before describing any lesion — a slice of liver
Approach to the specimen (6): Comments on size, then shape, then surface, in that order
Approach to the specimen (6): Comments on the borders of the jarred specimen, rather than reporting a consistency that only a fresh specimen allows
Approach to the specimen (6): Describes the cut surface — its colour, and any cavity, cyst or mass within it
Describing the specimen (10): States that the cut surface is diffusely yellow
Describing the specimen (10): States that the borders of the slice are rounded
Describing the specimen (10): Reads the rounded border as evidence of a soft consistency
Final diagnosis (4): Gives the diagnosis as lesion plus organ — liver steatosis (fatty change)
Final diagnosis (4): Names what the yellow cut surface looks like down the microscope — hepatocytes distended by fat

## module_subject
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Lipids intracellular accumulations > Steatosis (Fatty Change)

## main_concept
CON-FND-70554B38361679

## concept_ids
CON-FND-3B89025E2FB4E0

## contextual_concept_ids
CON-FND-A0BC07E35554B1

## learning_objective
Diagnose steatosis from a slice of liver on two gross findings alone — a diffusely yellow cut surface and a rounded border — and connect the gross appearance to the signet-ring hepatocyte seen on the corresponding slide.

## references
Atlas of Practical General Pathology, Modules INT-108 & INT-208, Faculty of Medicine Cairo University, 2025-2026 — specimen D105-2, printed page 24. Manifest source src_a2ffe25e8362fe840ceb.
Method: the same atlas's steps for describing a gross specimen, printed page 22.
A gross specimen carries no stain and no magnification. The atlas's preface records the departmental museum of about 1400 specimens as the source of this material.
The microscopic counterpart of this specimen is SLIDE (9) in the same atlas, authored here as PRC-FND-INT108-SLIDE09.
Kasr Al Ainy (kau) · Year 1 (KAU_Y1) · module 108 INT · Pathology.

## media_recommendations
### image · Liver steatosis (fatty change)
Brief: Photograph of a liver slice whose cut surface is diffusely yellow, taken from an angle that keeps the rounded border of the slice visible.
Purpose: Identify-the-specimen station. Both gross findings are visual, and the rounded border is the only evidence of the soft consistency the caption describes — an angle that loses it loses half the answer.
Priority: required
Status: needed
Kind: clinical photograph
Section: station
Notes: Owning item: INT108-PRAC-PATHO-D105-2. Stain: not applicable to a gross specimen. Structures that must be visible and markable: diffusely yellow cut surface; rounded border of the slice.
Source direction: An original photograph of the numbered museum specimen held by the pathology department, Cairo University, or an openly licensed gross-pathology atlas.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release. Do not re-host the plate from the source PDF.

---

# Item

## id
PRC-FND-INT108-S10-1

## title
Spot the specimen: subcutaneous fibroma with dystrophic calcification (S10-1)

## subject
fnd

## type
Skills checklist

## status
Draft

## owner
Claude

## duration
5

## marks
20

## difficulty
Moderate

## mark_scheme
Approach to the specimen (6): Names the specimen before describing any lesion — a sectioned tumour mass
Approach to the specimen (6): Comments on size, then shape, then surface, in that order
Approach to the specimen (6): Comments on the borders of the jarred specimen, rather than reporting a consistency that only a fresh specimen allows
Approach to the specimen (6): Describes the cut surface — its colour, and any cavity, cyst or mass within it
Describing the specimen (10): States that the mass is rounded and capsulated
Describing the specimen (10): Points out the fibrous capsule running round the circumference
Describing the specimen (10): States that the cut surface is greyish white
Describing the specimen (10): Points out granular chalky white foci within the cut surface and names them calcification
Final diagnosis (4): Gives the diagnosis as lesion plus site — subcutaneous fibroma with dystrophic calcification
Final diagnosis (4): States that calcium laid down inside an already abnormal tissue like this is dystrophic, and that dystrophic calcification occurs at a normal serum calcium

## module_subject
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Pathological Calcification > Dystrophic calcification

## main_concept
CON-FND-33466CEBFC4EBA

## concept_ids
CON-FND-718662116D90C4

## contextual_concept_ids
CON-FND-87392C49DB246C

## learning_objective
Describe an encapsulated soft-tissue tumour and identify the chalky white foci in its cut surface as calcification, giving a diagnosis that names both the tumour and the calcification and stating why the calcification is dystrophic.

## references
Atlas of Practical General Pathology, Modules INT-108 & INT-208, Faculty of Medicine Cairo University, 2025-2026 — specimen S10-1, printed page 24. Manifest source src_a2ffe25e8362fe840ceb.
Method: the same atlas's steps for describing a gross specimen, printed page 22.
A gross specimen carries no stain and no magnification. The atlas's preface records the departmental museum of about 1400 specimens as the source of this material.
The microscopic counterpart of the calcification is the data-show plate authored here as PRC-FND-INT108-DS03.
Kasr Al Ainy (kau) · Year 1 (KAU_Y1) · module 108 INT · Pathology.

## media_recommendations
### image · Subcutaneous fibroma with dystrophic calcification
Brief: Photograph of a sectioned rounded encapsulated soft-tissue tumour with a greyish white cut surface bearing granular chalky white calcific foci, with the capsule visible around the circumference.
Purpose: Identify-the-specimen station. The diagnosis is made from the capsule plus the chalky foci, so both must be in frame.
Priority: required
Status: needed
Kind: clinical photograph
Section: station
Notes: Owning item: INT108-PRAC-PATHO-S10-1. Stain: not applicable to a gross specimen. Structures that must be visible and markable: rounded capsulated mass; fibrous capsule around the circumference; greyish white cut surface; granular chalky white foci of calcification.
Source direction: An original photograph of the numbered museum specimen held by the pathology department, Cairo University, or an openly licensed gross-pathology atlas.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release. Do not re-host the plate from the source PDF.
