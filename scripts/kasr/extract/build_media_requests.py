#!/usr/bin/env python3
"""Generate docs/Kasr-Source-Imports/media-requests/practical-media-requests.md.

One request per distinct slide subject, in the `media_needed` /
`media_recommendations` grammar documented in media-audit.md and implemented by
parseMediaRequests (src/data/bulkImport.ts:485).
"""
import json, os, re

ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", ".."))
DEST = os.path.join(ROOT, "docs", "Kasr-Source-Imports", "media", "practical-media-requests.md")
CAT = json.load(open(os.path.join(ROOT, "scripts", "kasr", "extract", "practical.json")))

PB = "DPT Practical Histo 101"
FR = "DPT 1 Final Revision"
RX = "Radiology (X-Ray) Orientation"

# label, kind, brief, purpose, stain, structures, deps, priority, source, rights
REQ = []
def r(label, kind, brief, purpose, stain, structures, deps, priority="required",
      source="Openly licensed histology teaching collection, or an original slide "
             "photographed by the Cairo University histology department.",
      rights="Must be CC-BY, CC0 or public domain, or carry written departmental "
             "permission. Record the licence and the photographer before release."):
    REQ.append(dict(label=label, kind=kind, brief=brief, purpose=purpose, stain=stain,
                    structures=structures, deps=deps, priority=priority,
                    source=source, rights=rights))

EM = ("Openly licensed electron-microscopy teaching collection, or an original "
      "micrograph from the departmental EM archive.")
IDENT = ("The station asks the student to identify %s from the image and name the "
         "marked structures. There is no text the answer can be read off; without "
         "the plate the item cannot be attempted.")

# ---------------- Cytology ----------------
r("Cell membrane between two adjacent cells (EM)", "histology",
  "Transmission EM of apposed plasma membranes of two cells at magnification high enough "
  "to resolve the trilaminar unit membrane, with the intercellular space and the cytoplasm "
  "of both cells in frame.", IDENT % "the plasma membrane", "unstained (EM; osmium/lead contrast)",
  ["two dark (electron-dense) lines separated by one pale line - trilaminar unit membrane",
   "intercellular space", "cytoplasm of each cell"],
  [(PB,[2,33,35]),(FR,[4])], source=EM)
r("Mitochondria (LM)", "histology",
  "Light micrograph of cells with abundant mitochondria shown as oval, rod-shaped or "
  "granular bodies distinct enough to be counted.",
  IDENT % "mitochondria under the light microscope",
  "iron haematoxylin (dark blue) or Janus green (green)",
  ["oval / rod / granular mitochondria", "surrounding cytoplasm", "nucleus for scale"],
  [(PB,[3])])
r("Mitochondrion (EM)", "histology",
  "Transmission EM of one or more mitochondria with the double membrane, the cristae and "
  "the matrix all separately resolvable, and adjacent rER in the same field.",
  IDENT % "a mitochondrion and its internal structure", "unstained (EM)",
  ["outer and inner membranes", "cristae", "matrix", "adjacent rough endoplasmic reticulum"],
  [(PB,[4,37,39,43,70]),(FR,[6])], source=EM)
r("Golgi apparatus (EM)", "histology",
  "Transmission EM of a Golgi complex showing the stack of parallel flattened saccules with "
  "transfer vesicles on one face and secretory vesicles on the other.",
  IDENT % "the Golgi apparatus", "unstained (EM)",
  ["stacked parallel saccules", "transfer vesicles", "secretory vesicles", "surrounding cytoplasm"],
  [(PB,[6,51,53,72]),(FR,[14])], source=EM)
r("Golgi apparatus in a nerve cell (silver)", "histology",
  "Silver-impregnated nerve cell in which the Golgi apparatus appears as brown fine fibrils "
  "or granules in a perinuclear position, with the central rounded nucleus visible.",
  IDENT % "the Golgi apparatus and state its position in a nerve cell",
  "silver impregnation (Golgi stains brown)",
  ["brown fine fibrils / granules of Golgi", "perinuclear position", "central rounded nucleus"],
  [(PB,[7,47]),(FR,[10])])
r("Golgi apparatus in a secretory cell (silver)", "histology",
  "Silver-impregnated secretory (glandular) cells in which the Golgi apparatus lies apical "
  "to the nucleus, with the cell membrane outlining individual cells.",
  IDENT % "the Golgi apparatus and state its apical position",
  "silver impregnation (Golgi stains brown)",
  ["brown fibrils / granules of Golgi", "apical position relative to the nucleus", "cell membrane"],
  [(PB,[8,49]),(FR,[12])])
r("Negative Golgi image", "histology",
  "Routinely stained plasma cell (or comparable secretory cell) in which the Golgi zone "
  "appears as an unstained pale area beside the nucleus - the negative Golgi image.",
  IDENT % "the negative Golgi image", "H&E",
  ["pale unstained juxtanuclear Golgi zone", "basophilic cytoplasm",
   "eccentric cart-wheel nucleus of the plasma cell"],
  [(PB,[9,151]),(FR,[42])])
r("Rough endoplasmic reticulum (EM)", "histology",
  "Transmission EM of rER as parallel regular flattened cisternae with ribosomes clearly "
  "resolved as dense granules on the cytosolic face.",
  IDENT % "rER and give one visible character", "unstained (EM)",
  ["parallel flattened cisternae", "ribosomes studding the membrane", "cisternal lumen"],
  [(PB,[10,41,71])], source=EM)
r("Smooth endoplasmic reticulum (EM)", "histology",
  "Transmission EM of sER as a network of smooth-surfaced tubules and vesicles of differing "
  "size and shape, with no ribosomes on the membranes.",
  IDENT % "sER and give one visible character", "unstained (EM)",
  ["smooth membrane surface", "absence of ribosomes", "vesicles and tubules of varying size"],
  [(PB,[11,45]),(FR,[8])], source=EM)
r("Smooth ER with mitochondrion (EM)", "histology",
  "Transmission EM field containing both sER and a mitochondrion so the two can be told "
  "apart in one image.", IDENT % "sER and a mitochondrion in the same field", "unstained (EM)",
  ["sER tubules", "mitochondrion with cristae"], [(PB,[12])],
  priority="strongly helpful", source=EM)
r("Smooth and rough ER together (EM)", "histology",
  "Transmission EM field containing both sER and rER, positioned so the presence and absence "
  "of ribosomes is the discriminating feature.",
  IDENT % "and contrast sER with rER", "unstained (EM)",
  ["ribosome-studded rER cisternae", "smooth sER tubules"], [(PB,[13])], source=EM)
r("Primary lysosome (EM)", "histology",
  "Transmission EM of a primary lysosome - a uniformly electron-dense membrane-bound body "
  "with homogeneous content and no ingested material.",
  IDENT % "a primary lysosome", "unstained (EM)",
  ["single limiting membrane", "homogeneous electron-dense matrix", "absence of ingested debris"],
  [(PB,[14])], source=EM)
r("Secondary lysosome - multivesicular body (EM)", "histology",
  "Transmission EM of a multivesicular body: a membrane-bound vacuole containing several "
  "small internal vesicles.", IDENT % "a multivesicular body", "unstained (EM)",
  ["limiting membrane", "multiple small internal vesicles"], [(PB,[15])], source=EM)
r("Heterolysosome (EM)", "histology",
  "Transmission EM of a heterolysosome containing recognisably exogenous ingested material.",
  IDENT % "a heterolysosome and state its origin", "unstained (EM)",
  ["limiting membrane", "heterogeneous ingested exogenous content"], [(PB,[16])], source=EM)
r("Autolysosome (EM)", "histology",
  "Transmission EM of an autolysosome containing a recognisable degenerating organelle "
  "(e.g. a mitochondrial remnant).",
  IDENT % "an autolysosome and state what it contains", "unstained (EM)",
  ["limiting membrane", "identifiable degenerating organelle inside"], [(PB,[17])], source=EM)
r("Nissl's granules in a nerve cell", "histology",
  "Light micrograph of a motor neurone cell body with focal (spotty) basophilic Nissl "
  "granules in the perikaryon and dendrites but not the axon hillock.",
  IDENT % "Nissl's granules and name the organelle they represent",
  "toluidine blue / cresyl violet, or H&E",
  ["focal basophilic Nissl granules", "large vesicular nucleus with prominent nucleolus",
   "axon hillock free of Nissl substance"], [(PB,[18])])
r("Ribosome and translation (schematic)", "diagram",
  "Labelled schematic of a ribosome on mRNA showing large and small subunits, A- and P-sites, "
  "tRNA and the growing amino-acid chain.",
  "Supports the written questions on ribosome structure; the corresponding book page is a "
  "schematic rather than a micrograph, so a redrawn diagram is an exact substitute.",
  None, ["large ribosomal subunit","small ribosomal subunit","P-site","A-site","tRNA","mRNA",
         "codon","growing amino-acid chain"],
  [(PB,[19])], priority="optional",
  source="Redraw in-house, or use a CC0 molecular-biology schematic.",
  rights="Redrawn in-house is preferred so the licence is unambiguous.")
r("Centriole (EM, longitudinal and transverse)", "histology",
  "Transmission EM of a centriole with a transverse section in which the nine triplets of "
  "microtubules can be counted, plus a longitudinal view showing the pair at right angles.",
  IDENT % "a centriole and state how its microtubules are arranged", "unstained (EM)",
  ["nine triplets of microtubules in cross-section", "pinwheel arrangement",
   "the paired centrioles at right angles"], [(PB,[20,21,55]),(FR,[16])], source=EM)
r("Cilia (EM, longitudinal and transverse)", "histology",
  "Transmission EM of cilia including a transverse section resolving the 9+2 axoneme - nine "
  "peripheral doublets and two central singlets - and a longitudinal section of the shaft "
  "with the basal body.",
  IDENT % "the axoneme and distinguish doublets from singlets", "unstained (EM)",
  ["nine peripheral doublet microtubules","two central singlet microtubules",
   "ciliary membrane","basal body","shaft (axoneme) in longitudinal section"],
  [(PB,[22,57,59]),(FR,[18])], source=EM)
r("Microvilli (EM, longitudinal and transverse)", "histology",
  "Transmission EM of microvilli showing the pale actin core and the absence of microtubules, "
  "ideally in the same frame as cilia so the two can be contrasted.",
  IDENT % "microvilli and contrast them with cilia", "unstained (EM)",
  ["pale core with no microtubules","small size relative to cilia","covering cell membrane",
   "terminal web"], [(PB,[23,59]),(FR,[18])], source=EM)
r("Glycogen inclusion in liver cells", "histology",
  "Light micrograph of liver parenchyma with stored glycogen demonstrated as magenta/red "
  "granules in the hepatocyte cytoplasm.",
  IDENT % "the inclusion, name the stain and name the cell", "PAS or Best's carmine",
  ["red / magenta glycogen granules","hepatocyte cytoplasm","hepatocyte nuclei"],
  [(PB,[24,61]),(FR,[20])])
r("Fat inclusion in adipocytes (H&E)", "histology",
  "Light micrograph of adipose tissue in routine H&E where the lipid has dissolved out, "
  "leaving an empty vacuole with a thin rim of cytoplasm and a flattened peripheral nucleus.",
  IDENT % "the inclusion and explain why it appears empty", "H&E",
  ["empty (dissolved) fat vacuole","thin rim of cytoplasm","flattened peripheral nucleus"],
  [(PB,[25])])
r("Fat inclusion in adipocytes (Sudan III)", "histology",
  "Frozen-section light micrograph of adipose tissue with lipid stained orange by Sudan III, "
  "shown as a large droplet filling the cell.",
  IDENT % "the inclusion, name the stain and name the cell", "Sudan III",
  ["large orange lipid droplet","thin rim of cytoplasm","peripheral nucleus"],
  [(PB,[26,155]),(FR,[20])])
r("Open-face and closed-face nuclei (LM)", "histology",
  "Light micrograph showing an open-face (euchromatic, pale, vesicular) nucleus and a "
  "closed-face (heterochromatic, dark) nucleus side by side in one field.",
  IDENT % "each nucleus type and relate appearance to activity", "H&E",
  ["pale open-face nucleus with prominent nucleolus","dark closed-face nucleus",
   "nuclear membrane"], [(PB,[27])])
r("Nucleus and nuclear envelope (EM)", "histology",
  "Transmission EM of a nucleus in which the two layers of the nuclear envelope, nuclear "
  "pores, the nucleolus and the perinuclear cisterna are separately resolvable.",
  IDENT % "the nuclear envelope, a nuclear pore and the nucleolus", "unstained (EM)",
  ["outer nuclear membrane","inner nuclear membrane","perinuclear cisterna","nuclear pores",
   "nucleolus","continuity of outer membrane with rER"],
  [(PB,[28,31,63,73])], source=EM)
r("Euchromatic nucleus (EM)", "histology",
  "Transmission EM of a predominantly euchromatic nucleus with a thin rim of peripheral "
  "heterochromatin, a chromatin island, a nucleolus, nuclear membrane and a visible nuclear pore.",
  IDENT % "the nucleus type and every marked chromatin compartment", "unstained (EM)",
  ["peripheral heterochromatin","chromatin island","nucleolus","nuclear sap (euchromatin)",
   "nuclear membrane","nuclear pore"], [(PB,[29,67]),(FR,[24])], source=EM)
r("Heterochromatic nucleus (EM)", "histology",
  "Transmission EM of a predominantly heterochromatic nucleus with dense peripheral "
  "heterochromatin, chromatin islands and nucleolus-associated chromatin.",
  IDENT % "the nucleus type and every marked chromatin compartment", "unstained (EM)",
  ["dense peripheral heterochromatin","chromatin island","nucleolus-associated chromatin",
   "nuclear sap","nuclear membrane"], [(PB,[30,65]),(FR,[22])], source=EM)

# ---------------- Blood ----------------
BF = "Leishman"
BSRC = ("Openly licensed haematology atlas, or an original Leishman-stained film "
        "photographed in the departmental haematology lab.")
r("Blood film - survey field of all elements", "histology",
  "Low/medium-power Leishman-stained peripheral film containing a neutrophil, an eosinophil, "
  "a basophil, a lymphocyte, a monocyte, red cells and platelets in one field.",
  "Used as the orientation plate for the whole blood block; the student must locate and name "
  "each element within one field.", BF,
  ["neutrophil","eosinophil","basophil","lymphocyte","monocyte","erythrocytes","platelets"],
  [(PB,[83])], source=BSRC)
r("Neutrophil", "histology",
  "Oil-immersion Leishman-stained neutrophil with a clearly segmented multilobed nucleus and "
  "fine neutral cytoplasmic granules, red cells alongside for scale.",
  IDENT % "the neutrophil and give one visible feature", BF,
  ["segmented / multilobed nucleus","fine neutral granules","pale cytoplasm",
   "adjacent RBCs with central pallor"],
  [(PB,[77,90,92,106]),(FR,[57,63])], source=BSRC)
r("Barr body on a neutrophil", "histology",
  "Oil-immersion Leishman-stained neutrophil from a female showing a drumstick Barr body "
  "appended to one nuclear lobe.",
  IDENT % "the Barr body and state what it represents", BF,
  ["drumstick Barr body attached to the segmented nucleus","neutrophil nuclear lobes","platelets"],
  [(PB,[78,92])], source=BSRC)
r("Eosinophil", "histology",
  "Oil-immersion Leishman-stained eosinophil with a bilobed nucleus and coarse refractile "
  "eosinophilic (orange-red) granules filling the cytoplasm.",
  IDENT % "the eosinophil and give one visible feature", BF,
  ["bilobed nucleus","coarse eosinophilic granules","cell membrane",
   "adjacent RBCs with central pallor"], [(PB,[79,94]),(FR,[59])], source=BSRC)
r("Basophil", "histology",
  "Oil-immersion Leishman-stained basophil with coarse dark basophilic granules that overlie "
  "and mask the S-shaped nucleus.",
  IDENT % "the basophil and give one visible feature", BF,
  ["coarse large basophilic granules","S-shaped nucleus masked by granules",
   "adjacent RBCs"], [(PB,[80,96,98,106]),(FR,[63])], source=BSRC)
r("Lymphocyte", "histology",
  "Oil-immersion Leishman-stained small lymphocyte with a dense dark round nucleus and a "
  "narrow rim of pale blue cytoplasm; a large lymphocyte in the same or a paired field.",
  IDENT % "the lymphocyte and give one visible feature", BF,
  ["dark round nucleus","narrow rim of cytoplasm","adjacent RBCs for size comparison"],
  [(PB,[81,100,102,104]),(FR,[61])], source=BSRC)
r("Monocyte", "histology",
  "Oil-immersion Leishman-stained monocyte with a kidney-shaped (indented) nucleus and "
  "abundant frosted-glass (finely granular grey-blue) cytoplasm.",
  IDENT % "the monocyte and give one visible feature", BF,
  ["kidney-shaped indented nucleus","frosted-glass cytoplasm","large cell size"],
  [(PB,[82,104]),(FR,[61])], source=BSRC)
r("Platelets", "histology",
  "Oil-immersion Leishman-stained field showing platelets singly and in a small clump, "
  "unmistakably smaller than the surrounding red cells.",
  IDENT % "platelets and state their origin", BF,
  ["individual platelets","platelet clump","adjacent RBCs for scale"],
  [(PB,[84,102])], source=BSRC)
r("Erythrocytes - LM and EM", "histology",
  "Paired plate: a light micrograph of red cells showing the biconcave disc with central "
  "pallor, and a scanning EM showing the biconcave surface profile.",
  IDENT % "the erythrocyte and relate its shape to its function", "Leishman (LM); unstained (EM)",
  ["central pallor","biconcave disc profile","absence of a nucleus"],
  [(PB,[75,76])], source=BSRC)
r("Reticulocyte (supravital preparation)", "histology",
  "Oil-immersion cresyl-blue supravital preparation showing reticulocytes with the "
  "blue-staining reticular network of residual ribosomal RNA.",
  IDENT % "the cell, name the stain and state that it is supravital",
  "brilliant cresyl blue (supravital)",
  ["blue reticular network inside the red cell","mature RBCs without a network"],
  [(PB,[67,114]),(FR,[67])], source=BSRC)
r("Bone marrow - megakaryocytes and fat cells", "histology",
  "Medium-power section or smear of red bone marrow showing megakaryocytes with large "
  "multilobed nuclei, adipocytes, and developing haemopoietic cells between sinusoids.",
  IDENT % "the tissue, a megakaryocyte and the fat cells", "H&E (section) or Leishman (smear)",
  ["megakaryocyte with large multilobed nucleus","fat cells (adipocytes)",
   "haemopoietic cell clusters","marrow sinusoid"],
  [(PB,[65,85,86,87,108,110,112]),(FR,[65])], source=BSRC)

# ---------------- Connective tissue ----------------
r("Fibroblast and fibrocyte", "histology",
  "Light micrograph of connective tissue with an active fibroblast (large pale oval nucleus, "
  "basophilic cytoplasm) and a quiescent fibrocyte (small dark spindle nucleus) distinguishable.",
  IDENT % "the cell and state whether it is active or quiescent", "H&E",
  ["fibroblast oval pale nucleus","fibrocyte spindle dark nucleus","surrounding collagen bundles"],
  [(PB,[143])])
r("Macrophage", "histology",
  "Light micrograph of connective tissue containing macrophages, ideally after vital dye "
  "(trypan blue / India ink) uptake so the ingested particles identify the cell.",
  IDENT % "the macrophage and state how it was demonstrated",
  "H&E, or vital staining with trypan blue / India ink",
  ["ingested dye particles in the cytoplasm","indented / kidney-shaped nucleus",
   "irregular cell outline"], [(PB,[120])])
r("Mast cell", "histology",
  "Light micrograph of connective tissue with mast cells whose numerous coarse metachromatic "
  "granules fill the cytoplasm and obscure the central rounded nucleus.",
  IDENT % "the mast cell and give one visible character",
  "toluidine blue (metachromasia) or H&E",
  ["numerous coarse basophilic / metachromatic granules","central rounded nucleus",
   "perivascular position"], [(PB,[121,139,151]),(FR,[42])])
r("Plasma cell", "histology",
  "Light micrograph of connective tissue with plasma cells showing an eccentric cart-wheel "
  "nucleus, deeply basophilic cytoplasm and a pale juxtanuclear negative Golgi image.",
  IDENT % "the plasma cell and give two visible characters", "H&E",
  ["eccentric cart-wheel nucleus","strongly basophilic cytoplasm","negative Golgi image"],
  [(PB,[122,123,151]),(FR,[42])])
r("Unilocular (white) fat cell", "histology",
  "Light micrograph of white adipose tissue: large signet-ring cells each with a single "
  "vacuole, a thin rim of cytoplasm and a flattened peripheral nucleus.",
  IDENT % "the tissue and the cell type that forms it", "H&E (and Sudan III on frozen section)",
  ["single large fat droplet per cell","thin rim of cytoplasm","flattened peripheral nucleus",
   "delicate connective-tissue septa"], [(PB,[118,130,153]),(FR,[44])])
r("Multilocular (brown) fat cell", "histology",
  "Light micrograph of brown adipose tissue: smaller rounded cells each holding many small "
  "fat droplets, with a central nucleus and a rich capillary bed.",
  IDENT % "the tissue and the cell type that forms it", "H&E (and Sudan III on frozen section)",
  ["many small fat droplets per cell","central rounded nucleus","abundant blood vessels",
   "smaller cell size than unilocular fat"], [(PB,[119,131,155]),(FR,[46])])
r("Brown versus white adipose tissue (comparison plate)", "histology",
  "Side-by-side light micrographs of brown and white adipose tissue at matched magnification "
  "so the multilocular and unilocular patterns can be compared directly.",
  "Supports the compare-and-contrast station; a single-tissue image cannot carry the comparison.",
  "H&E", ["unilocular cells with peripheral nuclei","multilocular cells with central nuclei",
          "capillary density difference"], [(PB,[132])], priority="strongly helpful")
r("Collagen fibers", "histology",
  "Light micrograph in which collagen appears as thick acidophilic wavy bundles running in "
  "condensed groups.", IDENT % "the fiber type and give one character", "H&E (or Masson trichrome)",
  ["thick acidophilic bundles","wavy course","fibroblast nuclei between bundles"],
  [(PB,[125])])
r("Elastic fibers", "histology",
  "Light micrograph in which elastic fibers run singly as thin refractile zigzag threads that "
  "branch and rejoin, distinct from the collagen around them.",
  IDENT % "the fiber type and give one character", "orcein or Verhoeff (elastic stain); H&E",
  ["thin single fibers","zigzag / wavy course","branching and anastomosis",
   "contrast with collagen bundles"], [(PB,[126])])
r("Reticular fibers", "histology",
  "Silver-impregnated light micrograph in which reticular fibers form a fine brown/black "
  "branching and anastomosing meshwork.",
  IDENT % "the fiber type, name the stain and give a character", "silver impregnation",
  ["fine brown/black fibers","branching and anastomosing network","supported cells within the mesh"],
  [(PB,[127])])
r("Loose areolar connective tissue", "histology",
  "Spread or section of loose areolar tissue showing collagen bundles, single elastic fibers, "
  "fibroblasts and abundant pale matrix.",
  IDENT % "the tissue and both fiber types in it", "H&E (fibers), orcein for elastic",
  ["collagen bundles","elastic fibers","fibroblast nucleus","ground substance / matrix"],
  [(PB,[129,141]),(FR,[40])])
r("Reticular connective tissue", "histology",
  "Silver-impregnated section (lymph node or spleen) showing the reticular fiber meshwork "
  "supporting free cells.",
  IDENT % "the tissue, name the special stain and give two characters", "silver impregnation",
  ["brown thin reticular fibers","branching and anastomosing network","free cells in the mesh"],
  [(PB,[133,145,157]),(FR,[48])])
r("Yellow elastic connective tissue", "histology",
  "Section of elastic tissue (ligamentum nuchae or elastic artery) stained to show thick "
  "parallel elastic fibers, which are yellow in the fresh state.",
  IDENT % "the tissue, its fresh colour, its stain and two characters",
  "orcein (fibers stain brown); Verhoeff as an alternative",
  ["thick parallel elastic fibers","zigzag / branching profile","few fibroblasts between fibers"],
  [(PB,[134,149,159]),(FR,[50])])
r("Regular white fibrous connective tissue", "histology",
  "Longitudinal section of tendon or ligament: thick parallel collagen bundles in regular "
  "array with rows of flattened fibrocyte nuclei between them.",
  IDENT % "the tissue, its fresh colour and two characters", "H&E",
  ["parallel regular thick collagen bundles","rows of flattened fibroblast/fibrocyte nuclei",
   "acidophilic staining"], [(PB,[135,147,161]),(FR,[52])])
r("Irregular white fibrous connective tissue", "histology",
  "Section of dermis or organ capsule: thick collagen bundles running in many directions, "
  "with scattered fibroblast nuclei.",
  IDENT % "the tissue, its fresh colour and two characters", "H&E",
  ["irregularly arranged thick collagen bundles","bundles cut in several planes",
   "scattered fibroblast/fibrocyte nuclei"], [(PB,[136,143,163]),(FR,[54])])
r("Mucoid connective tissue", "histology",
  "Section of umbilical cord (Wharton's jelly): abundant pale amorphous ground substance with "
  "sparse stellate fibroblasts and fine collagen.",
  IDENT % "the tissue and name where it is found", "H&E",
  ["abundant pale ground substance","stellate / spindle fibroblasts","fine collagen fibrils"],
  [(PB,[137])])

# ---------------- Epithelium ----------------
r("Simple squamous epithelium", "histology",
  "Light micrograph of a single layer of flat cells with flattened central nuclei lining a "
  "vessel or serous surface, with the basement membrane and underlying connective tissue visible.",
  IDENT % "the epithelium and give one visible feature", "H&E",
  ["single layer of flat cells","flat single central nuclei","basement membrane",
   "underlying connective tissue"], [(PB,[167,168,169,185,193,197]),(FR,[27])])
r("Simple cubical epithelium", "histology",
  "Light micrograph of a single layer of square cells with rounded central nuclei, with the "
  "basement membrane visible.", IDENT % "the epithelium and give one visible feature", "H&E",
  ["single layer of square cells","rounded central single nuclei","basement membrane"],
  [(PB,[170,187,195,197]),(FR,[27])])
r("Simple cubical epithelium - thyroid follicles", "histology",
  "Light micrograph of thyroid follicles lined by a single layer of cubical cells around "
  "colloid-filled lumina.",
  "Names the site as well as the type; the station asks the student to place the epithelium "
  "in an organ, which a generic field cannot do.", "H&E",
  ["cubical follicular cells","colloid in the follicular lumen","basement membrane",
   "interfollicular connective tissue"], [(PB,[171])])
r("Simple cubical epithelium - renal tubules", "histology",
  "Light micrograph of renal cortex showing tubules lined by a single layer of cubical cells "
  "with rounded central nuclei.",
  "Names the site as well as the type; the station asks the student to place the epithelium "
  "in an organ.", "H&E",
  ["cubical tubular cells","narrow tubular lumen","rounded central nuclei","basement membrane"],
  [(PB,[172])])
r("Simple columnar epithelium", "histology",
  "Light micrograph of a single layer of tall cells with oval nuclei set at the same basal "
  "level, on a visible basement membrane.",
  IDENT % "the epithelium and give one visible feature", "H&E",
  ["single layer of tall cells","oval basally-placed nuclei in a row","basement membrane",
   "free apical surface"], [(PB,[173,174,199]),(FR,[29])])
r("Pseudostratified columnar ciliated epithelium with goblet cells", "histology",
  "Light micrograph of respiratory-type epithelium: tall cells with nuclei at several levels "
  "but all resting on one basement membrane, surface cilia and interspersed goblet cells.",
  IDENT % "the epithelium and give two visible characters", "H&E (PAS optional for goblet mucin)",
  ["cilia on the free surface","crowded nuclei at different levels","single basement membrane",
   "goblet cells","underlying connective tissue"], [(PB,[175,176,191,201]),(FR,[31])])
r("Pseudostratified columnar ciliated epithelium with stereocilia", "histology",
  "Light micrograph of epididymal epithelium with long non-motile stereocilia on the apical "
  "surface, contrasting with true cilia.",
  IDENT % "the epithelium, name the surface modification and distinguish it from cilia", "H&E",
  ["long tufted stereocilia","tall principal cells","basal cells","single basement membrane"],
  [(PB,[177])])
r("Keratinized stratified squamous epithelium", "histology",
  "Light micrograph of thick skin epidermis with a distinct acidophilic anucleate horny layer "
  "over the intermediate polyhedral layers and a basal layer on the basement membrane.",
  IDENT % "the epithelium and give a feature of each named layer", "H&E",
  ["horny (keratin) layer, acidophilic and condensed","intermediate polyhedral cell layers",
   "basal columnar layer","basement membrane","underlying connective tissue (dermis)"],
  [(PB,[179,180,203]),(FR,[33])])
r("Non-keratinized stratified squamous epithelium", "histology",
  "Light micrograph of oesophageal or oral mucosa: flat but still nucleated superficial cells "
  "over polyhedral intermediate layers and a columnar basal layer.",
  IDENT % "the epithelium and give a feature of each named layer", "H&E",
  ["flat superficial cells retaining flat nuclei","polyhedral intermediate layers",
   "columnar / cuboidal basal layer","basement membrane","underlying connective tissue"],
  [(PB,[180,205,207]),(FR,[35])])
r("Transitional epithelium (urothelium)", "histology",
  "Light micrograph of relaxed bladder or ureter urothelium: dome-shaped (umbrella) "
  "superficial cells, some binucleate, over polyhedral intermediate layers.",
  IDENT % "the epithelium and give a feature of each named layer", "H&E",
  ["dome-shaped superficial (umbrella) cells","binucleate superficial cells",
   "polyhedral intermediate layers","basal layer","underlying connective tissue"],
  [(PB,[181,182,183,189,209]),(FR,[37])])

# ---------------- Radiology ----------------
RSRC = ("Openly licensed radiology teaching case (e.g. Radiopaedia under CC-BY-NC-SA, checked "
        "against the product's licence policy), or a fully de-identified departmental film.")
RRIGHTS = ("Must be openly licensed or departmentally owned, and must be de-identified: no "
           "patient name, MRN, date of birth or accession number anywhere in the frame or in "
           "the file metadata. Record the licence before release.")
RAD = {}
for item in CAT["radiology"]:
    RAD.setdefault(item["view"], {"pages": [], "structures": [], "region": item["region"]})
    RAD[item["view"]]["pages"].append(item["page"])
    for s in item["structures"]:
        if s not in RAD[item["view"]]["structures"]:
            RAD[item["view"]]["structures"].append(s)
for view, info in RAD.items():
    r("%s (%s)" % (view, info["region"]), "imaging example",
      "%s, correctly positioned and penetrated, no annotation burnt into the image so markers "
      "can be placed by the editor." % view,
      "The orientation station asks the student to name numbered structures on the film. The "
      "structure list is the answer key; without the film there is nothing to number.",
      None, info["structures"],
      [(RX, info["pages"])], source=RSRC, rights=RRIGHTS)

# ---------------- render ----------------
def block(q):
    L = ["### image · %s" % q["label"],
         "Brief: %s" % q["brief"],
         "Purpose: %s" % q["purpose"],
         "Priority: %s" % q["priority"],
         "Status: needed",
         "Kind: %s" % q["kind"]]
    if q["stain"]:
        L.append("Notes: Stain: %s. Structures that must be visible and markable: %s. "
                 "Depends on: %s." % (q["stain"], "; ".join(q["structures"]), deps(q)))
    else:
        L.append("Notes: Structures that must be visible and markable: %s. Depends on: %s."
                 % ("; ".join(q["structures"]), deps(q)))
    L.append("Source direction: %s" % q["source"])
    L.append("Rights: %s" % q["rights"])
    return "\n".join(L)

def deps(q):
    return "; ".join("%s pp. %s" % (f, ", ".join(str(p) for p in sorted(set(ps))))
                     for f, ps in q["deps"])

req = sum(1 for q in REQ if q["priority"] == "required")
sh = sum(1 for q in REQ if q["priority"] == "strongly helpful")
op = sum(1 for q in REQ if q["priority"] == "optional")

head = f"""# Practical media requests — 101 ISK

One request per **distinct slide subject**, not per plate. The catalogue at
`scripts/kasr/extract/practical.json` holds {len(CAT['slides'])} practical slides and
{len(CAT['radiology'])} radiology plates, but they resolve to **{len(REQ)} distinct subjects** —
six plates of simple columnar epithelium need one image, not six.

**Why this file exists.** `docs/Kasr-Source-Imports/media-requests/media-audit.md` establishes
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

**Counts.** {req} required · {sh} strongly helpful · {op} optional.

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

"""

secs = [("Cytology", 0, 27), ("Blood", 27, 38), ("Connective tissue", 38, 53),
        ("Epithelium", 53, 63), ("Radiology (X-ray) orientation", 63, len(REQ))]
body = []
for name, a, b in secs:
    body.append("## %s\n\n*%d requests.*\n\n" % (name, b - a) +
                "\n\n".join(block(q) for q in REQ[a:b]))
open(DEST, "w").write(head + "\n\n---\n\n".join(body) + "\n")
print("requests", len(REQ), "required", req, "helpful", sh, "optional", op)
print("sections", [(n, b-a) for n, a, b in secs])
