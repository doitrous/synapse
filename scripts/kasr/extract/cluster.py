#!/usr/bin/env python3
"""
Cluster scripts/kasr/questions.json into distinct assessable objectives.

WHAT IS MECHANICAL IN HERE
  - normalising whitespace in question text
  - counting occurrences, years, marks ranges
  - picking `canonicalAsked` (a legibility score over the verbatim texts of a
    cluster's occurrences -- it never composes new wording, it only chooses
    which existing occurrence reads cleanest)
  - parsing the subject tree out of the structure markdown and reporting
    coverage per leaf, including the leaves with zero objectives
  - integrity checks: every index assigned exactly once, nothing dropped

WHAT IS JUDGEMENT (mine, from reading all 704 rows)
  - the OBJECTIVES table below: which indices belong to the same assessable
    objective, what that objective is (`label`), where it sits in the subject
    tree, and the confidence
  - the UNCLUSTERED table: rows I could not confidently assign, with why

Usage:  python3 scripts/kasr/extract/cluster.py
Writes: scripts/kasr/extract/clusters.json
        scripts/kasr/extract/clusters-report.md
"""

import json
import os
import re
import sys
from collections import defaultdict

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
QUESTIONS = os.path.join(ROOT, "scripts", "kasr", "questions.json")
STRUCTURE = os.path.join(ROOT, "docs", "Kasr-Source-Imports", "academic", "101-isk-structure.md")
OUT_JSON = os.path.join(ROOT, "scripts", "kasr", "extract", "clusters.json")
OUT_MD = os.path.join(ROOT, "scripts", "kasr", "extract", "clusters-report.md")

A = "101 ISK > Anatomy"
H = "101 ISK > Histology"
BASIS = A + " > Basis of Anatomy"
EMB = A + " > General Embryology"
UL = A + " > Upper Limb"
CYT = H + " > Cytology"
BLD = H + " > Blood"
CT = H + " > Connective Tissue"
EPI = H + " > Epithelial Tissues"

# Paths that the 101 subject tree does NOT contain. Kept explicit rather than
# forced onto a nearby leaf, and reported separately.
OFF = "OFF-TREE"

# (key, label, subjectPath, confidence, indices)
OBJECTIVES = [
    # ---------------------------------------------------------------- Histology > Introduction
    ("glycogen-demonstration-stain",
     "Glycogen is a carbohydrate and so is demonstrated by the carbohydrate stains -- Best's carmine and PAS -- not by the lipid or metal stains.",
     H + " > Introduction > Microtechniques", "high", [84, 202, 526]),
    ("fat-cell-staining-sudan",
     "Fat is dissolved by routine processing, so fat cells are demonstrated with a lipid-soluble dye such as Sudan III rather than with H&E.",
     H + " > Introduction > Microtechniques", "medium", [271]),

    # ---------------------------------------------------------------- Histology > Cytology > The cell
    ("cell-membrane-structure-molecular",
     "The cell membrane is a fluid phospholipid bilayer whose molecules have polar heads and non-polar tails, with cholesterol and intrinsic and extrinsic proteins embedded in it.",
     CYT + " > The cell", "high", [523]),
    ("cell-membrane-staining-pas-silver",
     "The cell membrane carries a carbohydrate-rich glycocalyx, which is why silver and PAS are the stains that demonstrate it.",
     CYT + " > The cell", "high", [138, 164, 174, 198, 386, 452]),
    ("clathrin-coated-vesicle-endocytosis",
     "In receptor-mediated endocytosis the cytoplasmic side of the forming vesicle is coated by clathrin.",
     CYT + " > The cell", "high", [272, 524]),
    ("cell-cycle-renewable-cell-populations",
     "Cell populations are static, potentially renewable or continuously renewing, and potentially renewable cells sit in G0 and re-enter the cycle when replacement is needed.",
     CYT + " > The cell", "high", [544]),
    ("meiosis-stages-crossing-over",
     "Crossing-over between homologous chromosomes happens in the prophase of the first meiotic division.",
     CYT + " > The cell", "high", [545]),

    # ---------------------------------------------------------------- Histology > Cytology > Cytoplasm
    ("organelle-membranous-vs-nonmembranous",
     "Organelles divide into membranous ones (mitochondria, ER, Golgi, lysosomes, peroxisomes) and non-membranous ones (ribosomes, centrioles, cytoskeletal filaments).",
     CYT + " > Cytoplasm", "medium", [76]),
    ("mitochondria-structure-em",
     "By EM the mitochondrion has a smooth outer membrane and an inner membrane thrown into cristae enclosing a matrix, and it divides by simple division.",
     CYT + " > Cytoplasm", "high", [141, 167, 177, 273, 363]),
    ("golgi-apparatus-structure-function-staining",
     "The Golgi apparatus is a stack of flattened saccules with a cis and a trans face, sited near the nucleus in secretory cells, demonstrated by silver and osmium, and it packages secretion and forms lysosomes.",
     CYT + " > Cytoplasm", "high", [80, 83, 134, 139, 160, 165, 175, 184, 348, 369, 370, 525, 635]),
    ("rer-structure-function-protein-synthesis",
     "Rough endoplasmic reticulum is studded with ribosomes bound at ribophorins, synthesises export protein, and its RNA is what makes cytoplasm basophilic.",
     CYT + " > Cytoplasm", "high", [385, 522, 634]),
    ("ser-structure-function-steroid-detoxification",
     "Smooth endoplasmic reticulum is a tubular network without ribosomes that synthesises steroid, detoxifies drugs and stores calcium, so it is well developed in steroid-secreting cells.",
     CYT + " > Cytoplasm", "high", [200, 276, 519, 570, 618, 633]),
    ("lysosome-formation-features",
     "Lysosomes are membrane-bound bags of acid hydrolase formed by rER and Golgi together, and they are numerous in phagocytic cells.",
     CYT + " > Cytoplasm", "high", [199, 275]),
    ("lysosome-types-secondary-fates",
     "Secondary lysosomes are named by what the primary lysosome fused with -- heterolysosome, autolysosome, multivesicular body -- and all end as residual bodies.",
     CYT + " > Cytoplasm", "high", [3, 19, 77, 203, 278, 521, 571, 619]),
    ("ribosome-types-em-function",
     "Ribosomes are either free (synthesising protein for the cell itself) or attached to rER (synthesising protein for export), and by EM each is a large and a small subunit.",
     CYT + " > Cytoplasm", "high", [135, 161, 185]),
    ("intermediate-filaments-types-function",
     "Intermediate filaments are tissue-specific -- cytokeratin in epithelium, desmin in muscle, vimentin in connective tissue, neurofilaments in nerve, lamins in the nucleus -- which is why they identify the origin of a tumour.",
     CYT + " > Cytoplasm", "high", [384, 451, 518]),
    ("microfilaments-actin-structure-function",
     "Actin microfilaments form the core of microvilli and the contractile machinery of the cell, not the core of cilia or the mitotic spindle.",
     CYT + " > Cytoplasm", "high", [517]),
    ("microtubules-vs-microfilaments-comparison",
     "Microtubules and microfilaments differ in diameter, in protein subunit (tubulin against actin) and in what they can be shown as by light microscopy.",
     CYT + " > Cytoplasm", "high", [349]),
    ("centriole-staining-structure",
     "Centrioles are non-membranous cylinders of nine microtubule triplets, demonstrated with iron haematoxylin, and they organise the mitotic spindle.",
     CYT + " > Cytoplasm", "high", [205, 279, 516]),
    ("cilia-origin-structure-axoneme-function",
     "A cilium arises from a basal body of 27 microtubules and its shaft (axoneme) holds 20 microtubules in a 9+2 pattern covered by cell membrane, so a defect in it causes chronic respiratory infection.",
     CYT + " > Cytoplasm", "high", [4, 20, 79, 142, 168, 178, 204, 387, 453, 520]),

    # ---------------------------------------------------------------- Histology > Cytology > Nucleus
    ("euchromatin-heterochromatin-nuclear-activity",
     "Euchromatin is uncoiled, electron-lucent and carries the active genes, so the nucleus of an actively synthesising cell is vesicular while an inactive one is heterochromatic and dark.",
     CYT + " > Nucleus", "high", [78, 201, 277, 352, 388, 454]),
    ("nucleolus-parts-rrna",
     "The nucleolus has a nucleolar organiser, pars fibrosa holding newly formed rRNA, pars granulosa holding mature rRNA, and pars amorpha.",
     CYT + " > Nucleus", "high", [82, 140, 166, 176, 274, 389, 455, 527]),
    ("chromosome-structure-centromere-telomere",
     "A chromosome carries telomeres at its ends and a centromere whose kinetochores attach to the spindle fibres during division.",
     CYT + " > Nucleus", "medium", [543]),
    ("chromosomal-numerical-aberrations-aneuploidy",
     "Numerical chromosomal aberration is euploidy or aneuploidy, and aneuploidy arises from non-disjunction so that gametes are not haploid.",
     CYT + " > Nucleus", "medium", [546]),

    # ---------------------------------------------------------------- Histology > Blood
    ("rbc-structure-em-adaptation",
     "The red cell is a non-nucleated biconcave disc with electron-dense homogeneous haemoglobin, its shape held by an actin-spectrin cytoskeleton, and it carries carbonic anhydrase.",
     BLD + " > Red Blood Corpuscles", "high", [220, 227, 297, 402, 467]),
    ("reticulocyte-supravital-staining",
     "The reticulocyte still holds ribosomal RNA, which is why it is demonstrated by a supravital stain such as brilliant cresyl blue.",
     BLD + " > Red Blood Corpuscles", "high", [226, 296, 630]),
    ("platelet-em-structure-granulomere-hyalomere",
     "The platelet is a granulomere of alpha, delta and lambda granules surrounded by a hyalomere of microtubules, microfilaments and the open canalicular and dense tubular systems, and that structure explains how it works.",
     BLD + " > Blood Platelets", "high", [1, 17, 225, 294, 382, 403, 468]),
    ("neutrophil-features-function",
     "The neutrophil has a segmented nucleus of two to five lobes, both specific and azurophil granules, secretes phagocytin, and rises in acute pyogenic infection.",
     BLD + " > Granular leukocytes", "high", [223, 404, 469]),
    ("eosinophil-features-granules-function",
     "The eosinophil makes up 2-4% of leukocytes, has a bilobed nucleus and oval specific granules with a crystalloid core, and terminates allergic reactions with histaminase and arylsulphatase.",
     BLD + " > Granular leukocytes", "high", [92, 364, 406, 471, 573, 621]),
    ("basophil-features-granules-ige",
     "The basophil has an S-shaped nucleus and metachromatic granules of histamine and heparin, and its membrane carries receptors for IgE.",
     BLD + " > Granular leukocytes", "high", [90, 224, 293, 383, 407, 472, 632]),
    ("eosinophil-vs-neutrophil-comparison",
     "Eosinophil and neutrophil are told apart by differential count, by the shape of the nucleus and by the light-microscopic appearance of the cytoplasmic granules.",
     BLD + " > Granular leukocytes", "high", [0, 16]),
    ("leukocyte-classification-granular-nongranular",
     "Leukocytes divide into granular (neutrophil, eosinophil, basophil) and non-granular (lymphocyte, monocyte).",
     BLD + " > Granular leukocytes", "high", [222, 292]),
    ("leukocyte-identification-by-lm-features",
     "A leukocyte can be named from a single described light-microscopic feature of its cytoplasm or nucleus.",
     BLD + " > Granular leukocytes", "medium", [405, 470]),
    ("monocyte-lm-em-function",
     "The monocyte is the largest blood leukocyte, with a horse-shoe or kidney-shaped nucleus and lysosome-rich cytoplasm, and it is the precursor of the tissue macrophage.",
     BLD + " > Non granular leukocytes", "high", [137, 163, 187, 221, 291, 350]),
    ("t-lymphocyte-subsets-cd4-cd8",
     "T-lymphocytes carry out cell-mediated immunity, CD4 cells being helper and CD8 cells cytotoxic, the latter killing by perforins.",
     BLD + " > Non granular leukocytes", "high", [94, 295, 410, 475]),
    ("nk-cell-features-markers",
     "The natural killer cell is identified by the CD16 surface marker and kills without prior sensitisation.",
     BLD + " > Non granular leukocytes", "high", [408, 473]),
    ("megakaryocyte-features",
     "The megakaryocyte is the largest cell of the bone marrow, with a single multilobed nucleus and basophilic cytoplasm, and it sheds the blood platelets.",
     BLD + " > Haemopoiesis", "high", [219, 290, 381, 409, 474, 629]),
    ("haemopoiesis-myeloid-erythroid-ratio",
     "In red bone marrow immature white cells outnumber immature red cells in a fixed myeloid to erythroid ratio.",
     BLD + " > Haemopoiesis", "medium", [93]),
    ("blood-cell-identification-matching",
     "Each blood cell can be matched to the single feature that identifies it -- nuclear shape, granule content or where it is found.",
     BLD + " > Haemopoiesis", "low", [361, 362]),

    # ---------------------------------------------------------------- Histology > Connective Tissue
    ("fibroblast-features-function",
     "The fibroblast has a pale vesicular nucleus and rER-rich basophilic cytoplasm, forms the connective tissue fibres and ground substance, and is the cell of wound healing.",
     CT + " > Connective Tissue Cells", "high", [144, 170, 180, 371, 622, 636]),
    ("macrophage-lm-em-staining-function",
     "The macrophage has an indented dark nucleus and lysosome- and Golgi-rich cytoplasm, takes up vital stains such as trypan blue and India ink, and phagocytoses and presents antigen.",
     CT + " > Connective Tissue Cells", "high", [210, 284, 390, 456, 531, 623]),
    ("macrophage-histiocyte-origin",
     "The tissue macrophage (histiocyte) is derived from the blood monocyte.",
     CT + " > Connective Tissue Cells", "high", [87, 375, 395, 461]),
    ("mast-cell-lm-em-metachromasia",
     "The mast cell has a central rounded nucleus and granules that stain metachromatically with toluidine blue, and by EM those granules are scroll-like, holding histamine and heparin.",
     CT + " > Connective Tissue Cells", "high", [2, 18, 145, 171, 181, 391]),
    ("plasma-cell-features-function",
     "The plasma cell arises from the B-lymphocyte, has an eccentric clock-face nucleus and deeply basophilic rER-rich cytoplasm with a negative Golgi image, and it secretes antibody.",
     CT + " > Connective Tissue Cells", "high", [209, 283, 392, 457, 532]),
    ("plasma-cell-vs-macrophage-comparison",
     "Plasma cell and macrophage are separated by origin, by site and by their light-microscopic appearance.",
     CT + " > Connective Tissue Cells", "high", [572, 620]),
    ("pericyte-features-potency",
     "The pericyte lies along the capillary wall inside its own basal lamina, contains actin and myosin, and is the undifferentiated cell that can become fibroblast, smooth muscle or endothelium.",
     CT + " > Connective Tissue Cells", "high", [86, 143, 169, 179, 206, 280]),
    ("multilocular-brown-fat-cell-features",
     "The multilocular (brown) fat cell holds many small fat droplets and mitochondria rich in cytochrome oxidase, and it generates heat by thermogenin.",
     CT + " > Connective Tissue Cells", "high", [85, 207, 281, 356]),
    ("fat-cells-unilocular-vs-multilocular-comparison",
     "Unilocular and multilocular fat cells are separated by origin, by site and by their light-microscopic appearance.",
     CT + " > Connective Tissue Cells", "high", [136, 162, 186]),
    ("antigen-presenting-ct-cell-macrophage",
     "The antigen-presenting cell of connective tissue is the macrophage.",
     CT + " > Connective Tissue Cells", "high", [89, 208, 282]),
    ("collagen-fibres-staining",
     "Collagen fibres are acidophilic with H&E and are specifically demonstrated blue by Mallory trichrome.",
     CT + " > Connective Tissue Fibres", "high", [147, 173, 183, 355, 393, 458]),
    ("reticular-fibres-origin-staining",
     "Reticular fibres are type III collagen secreted by reticular cells and fibroblasts, and they are blackened by silver.",
     CT + " > Connective Tissue Fibres", "high", [88, 374, 394, 460, 529]),
    ("elastic-fibres-orcein-staining",
     "Elastic fibres branch and anastomose rather than run in bundles, and they stain brown with orcein.",
     CT + " > Connective Tissue Fibres", "high", [211, 285, 530]),
    ("ct-proper-types-sites",
     "Each type of connective tissue proper is identified by where it is found and what it does -- loose areolar the commonest, reticular forming the stroma of organs, regular white fibrous in tendon and cornea, yellow elastic in the aorta.",
     CT + " > Types of Connective Tissue Proper", "high",
     [146, 172, 182, 213, 286, 353, 354, 373, 376, 459, 528, 533, 624]),
    ("mucoid-ct-features-site",
     "Mucoid connective tissue is jelly-like from excess ground substance and is found in the umbilical cord.",
     CT + " > Types of Connective Tissue Proper", "high", [212, 372]),

    # ---------------------------------------------------------------- Histology > Epithelial Tissues
    ("epithelium-general-characters",
     "Epithelium is cellular with little intercellular substance, avascular, rests on a basement membrane and has a high power of regeneration.",
     EPI + " > Surface Epithelium", "high", [357, 377, 396, 462, 534]),
    ("surface-epithelium-types-and-sites",
     "Each named surface epithelium belongs to a particular site -- simple squamous lining blood vessels, simple cubical in thyroid follicles, pseudostratified ciliated columnar as respiratory epithelium.",
     EPI + " > Surface Epithelium", "high", [214, 287, 359, 360, 397, 463]),
    ("simple-epithelium-structure-function",
     "Simple squamous, cubical and columnar epithelia are told apart by cell shape and nuclear shape, and each shape suits its function.",
     EPI + " > Surface Epithelium", "high", [378, 535]),
    ("transitional-epithelium-features",
     "Transitional epithelium is five to thirty layers thick with a clear wavy basement membrane and superficial cells covered by rigid plaques, so it can stretch.",
     EPI + " > Surface Epithelium", "high", [215, 536]),
    ("transitional-vs-stratified-squamous-epithelium-comparison",
     "Oesophagus and urinary bladder differ in type of epithelium, in basement membrane, in the intermediate layer and in the shape of the superficial cells.",
     EPI + " > Surface Epithelium", "high", [5, 21]),
    ("glandular-epithelium-classification-exocrine",
     "An exocrine gland delivers its secretion through a duct system and is classified by whether duct and secretory portion are branched.",
     EPI + " > Glandular Epithelium", "high", [379, 398, 464, 625]),
    ("glandular-secretion-modes-holocrine-apocrine-merocrine",
     "Merocrine secretion leaves the cell unchanged, apocrine loses the apex of the cell and holocrine loses the whole cell.",
     EPI + " > Glandular Epithelium", "high", [216, 288, 399, 465, 537]),
    ("special-epithelium-myo-neuro",
     "Myoepithelium is the contractile epithelium and neuroepithelium the sensory one.",
     EPI + " > Myo Epithelium", "medium", [539]),
    ("cell-junctions-types-structure",
     "Cell junctions are occluding (zonula occludens, membranes fusing and encircling the apex), anchoring (zonula adherens and macula adherens with its attachment plaque) and communicating (gap junction).",
     EPI + " > Polarity and Membranous Specializations", "high",
     [217, 289, 380, 400, 401, 466, 538, 627, 628, 637]),
    ("basement-membrane-structure-collagen",
     "The basement membrane is a basal lamina of type IV collagen made by the epithelium plus a reticular lamina of type III made by connective tissue, held down by type VII anchoring fibrils.",
     EPI + " > Polarity and Membranous Specializations", "high", [218]),
    ("apical-specializations-microvilli-stereocilia",
     "Stereocilia are long non-motile microvilli, not cilia.",
     EPI + " > Polarity and Membranous Specializations", "high", [626]),

    # ---------------------------------------------------------------- Anatomy > Basis of Anatomy
    ("anatomical-planes-terms-of-position",
     "The median, sagittal, coronal and transverse planes divide the body in fixed ways, and terms such as superior and medial are defined against the anatomical position.",
     BASIS + " > Introduction", "high", [120, 550]),
    ("deep-fascia-parts-functions",
     "Deep fascia is the tough membranous sheath that forms intermuscular septa, retinacula, interosseous membranes and vascular sheaths, and it holds structures in place and helps venous return.",
     BASIS + " > Fascia", "high", [122, 148, 188, 268, 548, 569, 583, 617]),
    ("superficial-fascia-features",
     "Superficial fascia is the fatty layer beneath the skin -- it contains fat, and it is deep fascia and not superficial that forms retinacula and septa.",
     BASIS + " > Fascia", "high", [233, 414, 479]),
    ("bone-classification-types",
     "Bones are classified as long, short, flat, irregular, sesamoid and pneumatic, the pisiform being the sesamoid of the wrist.",
     BASIS + " > Skeletal system", "high", [118]),
    ("bone-functions-types-pneumatic",
     "A pneumatic bone is air-filled, which lightens the skull, warms inspired air and gives the voice resonance -- it is not a bone built to withstand stress.",
     BASIS + " > Skeletal system", "high", [229, 299]),
    ("bone-growth-epiphyseal-plate",
     "A long bone grows in length at the epiphyseal plate and in width by the periosteum.",
     BASIS + " > Skeletal system", "high", [117]),
    ("bone-blood-supply-arteries",
     "A long bone is supplied by nutrient (diaphyseal), metaphyseal, epiphyseal and periosteal arteries, the diaphyseal artery feeding the inner part of the shaft.",
     BASIS + " > Skeletal system", "high", [547]),
    ("fibrous-joints-types-definition",
     "A fibrous joint unites bones by fibrous tissue with no cavity, and its types are suture, syndesmosis and gomphosis -- the tooth in its socket being the gomphosis.",
     BASIS + " > Articular system", "high", [119, 123, 149, 189, 228, 267, 298, 582]),
    ("cartilaginous-joints-primary-vs-secondary",
     "A primary cartilaginous joint unites bones by hyaline cartilage and is temporary, as at the epiphyseal plate; a secondary one unites them by fibrocartilage in the median plane and is permanent, as at the intervertebral disc.",
     BASIS + " > Articular system", "high", [7, 23, 415, 480]),
    ("synovial-joint-structure-characters",
     "A synovial joint has a cavity, a fibrous capsule lined by synovial membrane, articular surfaces covered by hyaline cartilage, and supporting ligaments.",
     BASIS + " > Articular system", "high", [230, 300, 411, 413, 476, 478]),
    ("synovial-joint-types-examples",
     "Synovial joints are classified by the shape of their surfaces and the axes they move on, so that the wrist is the biaxial ellipsoid example.",
     BASIS + " > Articular system", "high", [231, 301]),
    ("articular-cartilage-function",
     "The articular cartilage of a synovial joint acts as a shock absorber and gives a smooth low-friction surface.",
     BASIS + " > Articular system", "high", [416]),
    ("muscle-attachment-types",
     "A muscle attaches either directly to bone or indirectly through tendon or aponeurosis, and the attachments are named origin and insertion.",
     BASIS + " > Muscular system", "high", [6, 22]),
    ("muscle-classification-by-action-prime-mover",
     "By action a muscle is prime mover, antagonist, fixator or synergist, the prime mover being the one that initiates the movement.",
     BASIS + " > Muscular system", "high", [232, 302, 412, 477, 549]),
    ("lymph-vessels-structure-function",
     "Lymph capillaries begin blindly in tissue spaces with wide pores and no valves, are absent from brain, spinal cord, bone marrow and avascular structures, and afferent vessels carry lymph towards the node.",
     BASIS + " > Lymphatic system", "medium", [702]),
    ("lymphatic-ducts-right-thoracic-drainage",
     "The right lymphatic duct drains the right side of the head, neck and thorax and the right upper limb; the thoracic duct drains the rest.",
     BASIS + " > Lymphatic system", "medium", [703]),

    # ---------------------------------------------------------------- Anatomy > General Embryology
    ("fertilization-site-mechanism-results",
     "Fertilization happens in the lateral third of the uterine tube, and it restores the diploid number, determines sex, starts cleavage and produces the zygote.",
     EMB + " > First Week of Development", "high",
     [124, 150, 192, 234, 303, 419, 484, 555, 566, 606, 614]),
    ("implantation-normal-site",
     "The blastocyst normally implants by its embryonic pole in the posterior wall of the fundus of the uterus.",
     EMB + " > First Week of Development", "high", [235, 304, 420, 485, 554]),
    ("implantation-abnormal-sites",
     "Implantation outside the normal site gives ectopic pregnancy -- tubal, ovarian, abdominal or cervical -- and implantation in the lower segment gives placenta praevia.",
     EMB + " > First Week of Development", "high", [125, 151, 191, 265, 580]),
    ("blastocyst-structure-inner-cell-mass",
     "The blastocyst is a cavity (blastocoele) walled by the outer cell mass or trophoblast, with the inner cell mass at its embryonic pole.",
     EMB + " > First Week of Development", "high", [305]),
    ("second-week-development-events",
     "In the second week the blastocyst completes implantation, the trophoblast splits into cytotrophoblast and syncytiotrophoblast, the inner cell mass becomes a bilaminar (not trilaminar) disc, and the amniotic cavity forms.",
     EMB + " > Second Week of Development", "high", [236, 421, 486]),
    ("trophoblast-syncytio-cytotrophoblast",
     "The syncytiotrophoblast is a multinucleated mass without cell boundaries, while the cytotrophoblast keeps its cell walls.",
     EMB + " > Second Week of Development", "high", [553]),
    ("amnion-amniotic-cavity-formation",
     "The roof of the amniotic cavity is formed by amnioblasts and its floor by the epiblast (ectoderm) of the embryonic disc.",
     EMB + " > Second Week of Development", "high", [488]),
    ("notochord-formation-fate",
     "The notochord forms from cells migrating through the primitive node, extends from the primitive pit to the buccopharyngeal membrane, induces the neural plate, and persists as the nucleus pulposus.",
     EMB + " > Third Week of Development", "high", [557, 593]),
    ("paraxial-mesoderm-somite-derivatives",
     "Paraxial mesoderm segments into somites, each giving a sclerotome for the vertebral column, a myotome for skeletal muscle and a dermatome for the dermis.",
     EMB + " > Third Week of Development", "high", [121, 266, 482, 556, 581]),
    ("neurulation-neural-tube-formation",
     "The neural tube forms by folding of the ectodermal neural plate.",
     EMB + " > Third Week of Development", "high", [558]),
    ("embryonic-disc-folding-types-causes-results",
     "The flat embryonic disc folds in a head, a tail and two lateral folds, driven by the expanding amniotic cavity and the growing neural tube, and this converts the disc into a cylinder and encloses the gut.",
     EMB + " > Embryonic Period", "high", [9, 25, 237, 367, 417, 481, 551]),
    ("decidua-definition-parts-fates",
     "The decidua is the pregnant endometrium, in three parts named by their relation to the conceptus -- basalis, capsularis and parietalis -- each with its own fate.",
     EMB + " > Fetal Membranes", "high", [8, 24]),
    ("placenta-formation-fetal-maternal-parts",
     "The fetal part of the placenta develops from the chorion frondosum and the maternal part from the decidua basalis, with a barrier between fetal and maternal blood and a large hormonal function.",
     EMB + " > Fetal Membranes", "high", [239, 308, 422, 487]),
    ("placenta-anomalies",
     "Placental anomalies are of shape (bipartite, succenturiate), of implantation site (praevia) and of adherence (accreta), and velamentous insertion is an anomaly of cord attachment.",
     EMB + " > Fetal Membranes", "high", [310, 567, 607, 615]),
    ("placenta-gross-features-full-term",
     "At full term the placenta is about 500-600 g, some 2-3 cm thick and 15-20 cm across, with the cord attached to its fetal surface.",
     EMB + " > Fetal Membranes", "medium", [559]),
    ("chorionic-villi-types-development",
     "Chorionic villi pass from primary (cytotrophoblast core) to secondary (mesenchymal core) to tertiary (blood vessels in the core), and become either anchoring or branch villi.",
     EMB + " > Fetal Membranes", "high", [240, 309, 423, 489, 568, 616]),
    ("umbilical-cord-structure-at-birth",
     "At birth the umbilical cord is about 50-60 cm long, contains two arteries and one vein in Wharton's jelly, and is attached to the fetal surface of the placenta.",
     EMB + " > Fetal Membranes", "high", [238, 307, 418, 483]),
    ("umbilical-cord-anomalies",
     "The cord may be too short (premature separation of the placenta), too long (coiling and prolapse), abnormally inserted, or carry a single artery.",
     EMB + " > Fetal Membranes", "high", [126, 152, 190, 552]),
    ("amniotic-fluid-functions",
     "Amniotic fluid cushions the fetus, allows it to move and grow symmetrically, keeps the temperature even, prevents adhesions and helps dilate the cervix in labour.",
     EMB + " > Fetal Membranes", "high", [264, 579]),

    # ---------------------------------------------------------------- Anatomy > Upper Limb > Pectoral Region
    ("pectoralis-major-attachment-nerve-action",
     "Pectoralis major arises by clavicular and sternocostal heads, inserts into the lateral lip of the bicipital groove, is supplied by both pectoral nerves, and adducts and medially rotates the arm.",
     UL + " > Pectoral Region", "high", [10, 26, 107]),
    ("breast-structure-blood-supply-bed",
     "The breast lies on a bed of pectoralis major, serratus anterior and external oblique, is slung by Cooper's ligaments, and is supplied by lateral thoracic, internal thoracic and intercostal arteries.",
     UL + " > Pectoral Region", "high", [242, 311, 641]),
    ("breast-lymphatic-drainage",
     "Lymph from the nipple, areola and most of the breast drains to the pectoral (anterior) group of axillary nodes.",
     UL + " > Pectoral Region", "high", [100]),
    ("case-breast-carcinoma-mastectomy-axillary-nodes",
     "In mastectomy for breast carcinoma the axillary nodes are cleared, the opposite breast must be examined because lymphatics cross the midline, and injury to the nerve of serratus anterior costs abduction above the shoulder.",
     UL + " > Pectoral Region", "high", [14, 30, 33, 55, 368]),
    ("deltopectoral-groove-contents",
     "The deltopectoral groove, between deltoid and pectoralis major, contains the cephalic vein and the deltoid branch of the thoracoacromial artery.",
     UL + " > Pectoral Region", "high", [241, 638]),
    ("clavipectoral-fascia-attachments-structures-piercing",
     "The clavipectoral fascia stretches from clavicle to axillary fascia enclosing subclavius and pectoralis minor, and is pierced by the cephalic vein, the lateral pectoral nerve, the thoracoacromial artery and the lymphatics.",
     UL + " > Pectoral Region", "high", [329, 598]),
    ("serratus-anterior-attachments-nerve-action",
     "Serratus anterior arises by digitations from the upper eight ribs, inserts on the medial border of the scapula, is supplied by the long thoracic nerve, and protracts the scapula and fixes it to the chest wall.",
     UL + " > Pectoral Region", "high", [337]),
    ("case-clavicle-fracture-middle-third",
     "The clavicle breaks at the junction of its middle and outer thirds, the shoulder drops because the strut is lost, and the underlying vessels and cords of the plexus are what is at risk.",
     UL + " > Pectoral Region", "high", [32, 54]),

    # ---------------------------------------------------------------- Upper Limb > Shoulder Region
    ("deltoid-attachment-nerve-action",
     "Deltoid arises from the clavicle, acromion and spine of scapula, inserts on the deltoid tuberosity, is supplied by the axillary nerve, and abducts the arm from 15 to 90 degrees.",
     UL + " > Shoulder Region", "high", [127, 153, 193, 649]),
    ("rotator-cuff-muscles-attachments-actions",
     "The rotator cuff is supraspinatus, infraspinatus and teres minor on the greater tuberosity and subscapularis on the lesser -- teres major is not one of them, and subscapularis is the strongest medial rotator.",
     UL + " > Shoulder Region", "high", [105, 115, 257, 322, 590]),
    ("shoulder-abduction-muscles-attachments-nerve-action",
     "Abduction at the shoulder joint is begun by supraspinatus and carried on by deltoid, with their attachments and nerve supply from the suprascapular and axillary nerves.",
     UL + " > Shoulder Region", "high", [262, 435, 501, 577, 587]),
    ("scapular-rotation-abduction-beyond-90-muscles",
     "Abduction beyond 90 degrees needs the scapula to rotate, which is done by trapezius and serratus anterior through the spinal accessory and long thoracic nerves.",
     UL + " > Shoulder Region", "high", [564, 604, 612]),
    ("shoulder-abduction-muscle-sequence",
     "Raising the arm above the shoulder happens in a fixed order -- first supraspinatus, then deltoid, then serratus anterior.",
     UL + " > Shoulder Region", "high", [109, 443, 508]),
    ("scapular-anastomosis-arteries",
     "The anastomosis around the scapula joins the subclavian artery through the suprascapular and deep transverse cervical arteries to the third part of the axillary artery through the subscapular artery.",
     UL + " > Shoulder Region", "high", [323, 441, 507, 588]),
    ("intermuscular-spaces-quadrangular-triangular-boundaries-contents",
     "The quadrangular, upper and lower triangular spaces behind the shoulder have set muscular and bony boundaries, the quadrangular space transmitting the axillary nerve and posterior circumflex humeral vessels.",
     UL + " > Shoulder Region", "high", [106, 249, 319, 439, 505, 560, 600, 608]),

    # ---------------------------------------------------------------- Upper Limb > Muscles of the Back
    ("trapezius-attachments-nerve-action",
     "Trapezius is supplied by the spinal accessory nerve, and its upper and lower fibres rotate the scapula while the middle fibres retract it.",
     UL + " > Muscles of the Back", "high", [258, 648]),
    ("latissimus-dorsi-attachments-action-nerve",
     "Latissimus dorsi extends, adducts and medially rotates the arm -- it does none of flexion, abduction or lateral rotation.",
     UL + " > Muscles of the Back", "high", [651]),
    ("triangle-of-auscultation-boundaries",
     "The triangle of auscultation is bounded by trapezius, latissimus dorsi and the medial border of the scapula.",
     UL + " > Muscles of the Back", "high", [652]),

    # ---------------------------------------------------------------- Upper Limb > Axilla
    ("axilla-boundaries-walls-contents",
     "The axilla has an anterior wall of pectoralis major and minor, subclavius and clavipectoral fascia, a posterior wall of subscapularis, teres major and latissimus dorsi, a medial wall of serratus anterior and ribs, and it contains the axillary vessels, the cords and branches of the brachial plexus, lymph nodes, fat and the tail of the breast.",
     UL + " > Axilla", "high", [96, 253, 342, 444, 509, 639, 644]),
    ("axillary-artery-parts-branches",
     "Pectoralis minor divides the axillary artery into three parts giving one, two and three branches, the thoracoacromial and lateral thoracic coming from the second part.",
     UL + " > Axilla", "high", [312, 640]),
    ("brachial-plexus-formation-branches",
     "The brachial plexus is formed of five roots, three trunks, six divisions, three cords and its terminal branches, the suprascapular nerve coming off the upper trunk and the axillary and radial off the posterior cord.",
     UL + " > Axilla", "high", [313, 365, 437, 503, 591, 642, 643]),
    ("axillary-lymph-nodes-groups-drainage",
     "The five groups of axillary nodes each drain their own territory -- pectoral the breast and front of the trunk, subscapular the back above the iliac crest, lateral the limb, and all funnel through the central to the apical group.",
     UL + " > Axilla", "high", [98, 345]),
    ("long-thoracic-nerve-serratus-anterior-winging",
     "The long thoracic nerve (C5,6,7) supplies serratus anterior, so injuring it -- in mastectomy or a stab to the lateral chest wall -- gives winging of the scapula.",
     UL + " > Axilla", "high", [112, 436, 502, 646, 647]),
    ("erb-palsy-upper-trunk-injury",
     "Traction on the upper trunk (C5,6) during birth or a fall gives Erb's palsy, in which the limb hangs adducted and medially rotated with the forearm pronated -- the policeman's tip position.",
     UL + " > Axilla", "high", [35, 57, 104]),
    ("case-klumpke-lower-trunk-avulsion",
     "Avulsion of the lower trunk (C8, T1) from a violent upward pull on the arm paralyses the small muscles of the hand and gives claw hand with sensory loss on the medial side.",
     UL + " > Axilla", "high", [34, 56]),

    # ---------------------------------------------------------------- Upper Limb > Arm
    ("biceps-brachii-attachments-action-nerve",
     "Biceps has a long head from the supraglenoid tubercle and a short head from the coracoid process, inserts into the radial tuberosity, is supplied by the musculocutaneous nerve, and flexes the elbow and supinates the flexed forearm.",
     UL + " > Arm", "high", [102, 320, 654, 658, 667]),
    ("triceps-brachii-attachments-action-nerve",
     "Triceps has long, lateral and medial heads, inserts into the olecranon, is supplied by the radial nerve, and extends the elbow.",
     UL + " > Arm", "high", [659]),
    ("brachialis-muscle-attachments-nerve-action",
     "Brachialis arises from the lower half of the front of the humerus, inserts into the coronoid process and ulnar tuberosity, and is the main flexor of the elbow.",
     UL + " > Arm", "high", [256, 344, 662]),
    ("brachial-artery-origin-course-end-branches",
     "The brachial artery begins at the lower border of teres major, runs down medial to the biceps tendon with the median nerve crossing it from lateral to medial, and ends at the neck of the radius by dividing into radial and ulnar arteries.",
     UL + " > Arm", "high", [129, 155, 195, 321, 428, 494, 589, 655]),
    ("cubital-fossa-boundaries-contents",
     "The cubital fossa is bounded by pronator teres and brachioradialis with a floor of brachialis and supinator, and contains, from medial to lateral, the median nerve, the brachial artery and the biceps tendon, with the radial nerve under brachioradialis.",
     UL + " > Arm", "high", [656, 664, 666]),

    # ---------------------------------------------------------------- Upper Limb > Forearm
    ("radial-artery-course-branches",
     "The radial artery begins in the cubital fossa, runs lateral to the tendon of flexor carpi radialis, crosses the floor of the snuff box, and gives the dorsal and palmar carpal, first dorsal metacarpal, princeps pollicis and radialis indicis branches.",
     UL + " > Forearm", "high", [245, 261, 316, 430, 496, 576, 586, 682, 694, 699, 701]),
    ("ulnar-artery-course-relations-branches",
     "At the wrist the ulnar artery lies lateral to the pisiform and superficial to the flexor retinaculum, having given the common interosseous and the carpal branches in the forearm.",
     UL + " > Forearm", "high", [327]),
    ("forearm-anterior-compartment-muscles-groups",
     "The anterior compartment of the forearm has a superficial group from the common flexor origin and a deep group of flexor pollicis longus, flexor digitorum profundus and pronator quadratus -- brachioradialis is not one of them.",
     UL + " > Forearm", "high", [668, 672, 692]),
    ("forearm-extensor-compartment-muscles",
     "The superficial extensors arise from the common extensor origin on the lateral epicondyle, while extensor carpi radialis longus, abductor pollicis longus and supinator do not.",
     UL + " > Forearm", "high", [674, 683, 685]),
    ("forearm-muscles-attachments-nerve-supply",
     "Each forearm muscle has its own attachment and nerve -- flexor carpi radialis and pronator quadratus from the median and its anterior interosseous branch, flexor carpi ulnaris from the ulnar, the extensors from the posterior interosseous.",
     UL + " > Forearm", "high", [247, 317, 669, 670, 676, 679]),
    ("flexor-digitorum-superficialis-profundus-attachments-nerve",
     "Flexor digitorum superficialis arises from the common flexor origin, radius and ulna and inserts into the middle phalanges, while profundus arises from the ulna and interosseous membrane, inserts into the distal phalanges, and has a double nerve supply.",
     UL + " > Forearm", "high", [269, 270, 333, 594, 671, 673]),
    ("supination-pronation-muscles-attachments-nerve",
     "Supination and pronation turn the radius about an axis through the head of the radius and the styloid of the ulna -- biceps and supinator supinate through the musculocutaneous and posterior interosseous nerves, the two pronators pronate through the median.",
     UL + " > Forearm", "high", [366, 426, 492, 565, 605, 613, 680, 684]),
    ("interosseous-membrane-attachments",
     "The interosseous membrane joins radius to ulna, its posterior aspect giving origin to the deep extensors and its anterior to flexor pollicis longus and flexor digitorum profundus.",
     UL + " > Forearm", "medium", [335]),
    ("carpal-arches-anterior-posterior-comparison",
     "The anterior and posterior carpal arches are each formed by the carpal branches of the radial and ulnar arteries, and are compared by formation and by what they supply.",
     UL + " > Forearm", "high", [596, 686]),
    ("flexor-retinaculum-attachments-relations-carpal-tunnel",
     "The flexor retinaculum bridges the carpal bones to roof the carpal tunnel, which transmits the median nerve and the long flexor tendons, while the ulnar nerve and artery and the palmaris longus tendon pass superficial to it.",
     UL + " > Forearm", "high", [108, 110, 244, 259, 315, 574, 584]),
    ("extensor-retinaculum-attachments-compartments",
     "The extensor retinaculum sends septa to the radius and ulna dividing the space beneath it into six compartments, each with its own tendons.",
     UL + " > Forearm", "high", [562, 602, 610]),

    # ---------------------------------------------------------------- Upper Limb > Hand
    ("palmar-arterial-arches-site-formation-branches",
     "The superficial palmar arch is mainly the ulnar artery completed by the superficial palmar branch of the radial and gives the common palmar digital arteries; the deep arch is mainly the radial completed by the deep branch of the ulnar and lies a finger's breadth proximal to it.",
     UL + " > Hand", "high", [12, 28, 95, 434, 500, 561, 601, 609, 688]),
    ("anatomical-snuff-box-site-boundaries-contents",
     "The anatomical snuff box lies at the base of the thumb bounded in front by abductor pollicis longus and extensor pollicis brevis and behind by extensor pollicis longus, floored by the scaphoid and trapezium, roofed by skin and the cephalic vein, and crossed by the radial artery -- so tenderness in it means a fractured scaphoid.",
     UL + " > Hand", "high", [15, 31, 41, 63, 130, 156, 196, 448, 513]),
    ("thumb-movements-muscles",
     "The thumb moves in a plane of its own, each of its flexion, extension, abduction and adduction being produced by a named pair or single muscle.",
     UL + " > Hand", "high", [255, 343]),
    ("extensor-expansion-formation",
     "The extensor expansion of a finger is formed by the tendon of extensor digitorum, joined by the lumbrical and interossei.",
     UL + " > Hand", "high", [346, 450, 515]),
    ("palmar-spaces-thenar-midpalmar",
     "The thenar and midpalmar spaces lie deep to the palmar aponeurosis, the thenar space containing the flexor tendons of the index and the first lumbrical.",
     UL + " > Hand", "medium", [336]),

    # ---------------------------------------------------------------- Upper Limb > Joints
    ("sternoclavicular-joint-type-surfaces-ligaments",
     "The sternoclavicular joint is a synovial saddle joint with an intra-articular disc, held by capsular, interclavicular and costoclavicular ligaments.",
     UL + " > Joints of Upper Limb", "high", [131, 157, 197]),
    ("shoulder-joint-type-ligaments-movements",
     "The glenohumeral joint is a ball-and-socket synovial joint whose glenohumeral, coracohumeral and transverse humeral ligaments plus the rotator cuff hold it, and it is weakest and dislocates inferiorly.",
     UL + " > Joints of Upper Limb", "high", [103, 330, 597]),
    ("shoulder-joint-movements-muscles",
     "Each movement at the shoulder joint has its own muscles -- pectoralis major and anterior deltoid flexing, latissimus dorsi and posterior deltoid extending.",
     UL + " > Joints of Upper Limb", "high", [324, 449, 514]),
    ("elbow-joint-type-ligaments-movements",
     "The elbow is a synovial hinge between the humerus above and the radius and ulna below, strengthened by radial and ulnar collateral ligaments, flexed by brachialis and biceps and extended by triceps.",
     UL + " > Joints of Upper Limb", "high", [13, 29, 111, 260, 445, 510, 575]),
    ("wrist-joint-movements-muscles-ligaments",
     "The wrist is a biaxial ellipsoid joint held by collateral and radiocarpal ligaments, each of its flexion, extension, abduction and adduction being produced by named muscles -- palmaris longus and flexor pollicis longus abduct nothing.",
     UL + " > Joints of Upper Limb", "high", [326, 592, 698]),

    # ---------------------------------------------------------------- Upper Limb > Nerve Supply & Injuries
    ("radial-nerve-origin-root-branches",
     "The radial nerve arises from the posterior cord (C5-T1) and gives muscular, cutaneous and articular branches in the axilla, arm, forearm and hand, ending as superficial and posterior interosseous branches.",
     UL + " > Nerve Supply of Upper Limb & Nerve Injuries", "high",
     [11, 27, 263, 351, 424, 442, 490, 578, 585, 660, 663]),
    ("radial-nerve-injury-spiral-groove-wrist-drop",
     "Fracture of the shaft of the humerus injures the radial nerve in the spiral groove, giving wrist drop with loss of extension of wrist and fingers and sensory loss over the lateral two-thirds of the dorsum of the hand.",
     UL + " > Nerve Supply of Upper Limb & Nerve Injuries", "high",
     [36, 58, 101, 132, 158, 252, 338, 340]),
    ("median-nerve-origin-course-relations-branches",
     "The median nerve arises by two heads from the medial and lateral cords, gives no branch in the arm, may be compressed between the two heads of pronator teres, and at the wrist lies between the tendons of palmaris longus and flexor carpi radialis before entering the carpal tunnel.",
     UL + " > Nerve Supply of Upper Limb & Nerve Injuries", "high",
     [99, 114, 246, 425, 491, 681, 687, 700]),
    ("carpal-tunnel-median-nerve-compression",
     "Compression of the median nerve in the carpal tunnel gives numbness of the lateral three and a half fingers and wasting of the thenar eminence, sparing the palm because the palmar cutaneous branch passes above the retinaculum.",
     UL + " > Nerve Supply of Upper Limb & Nerve Injuries", "high", [39, 61]),
    ("ulnar-nerve-origin-course-branches",
     "The ulnar nerve comes from the medial cord, gives no branch in the arm, pierces the medial intermuscular septum, enters the forearm between the two heads of flexor carpi ulnaris, and enters the hand superficial to the flexor retinaculum where its deep branch supplies the intrinsic muscles.",
     UL + " > Nerve Supply of Upper Limb & Nerve Injuries", "high",
     [250, 332, 431, 440, 446, 447, 497, 506, 511, 512, 657, 691]),
    ("ulnar-nerve-injury-claw-hand",
     "Injury to the ulnar nerve gives claw hand with loss of thumb adduction and wasting of the hypothenar and interossei -- and the deformity is worse, not better, when the nerve is cut at the wrist.",
     UL + " > Nerve Supply of Upper Limb & Nerve Injuries", "high",
     [40, 62, 113, 248, 318, 433, 499]),
    ("musculocutaneous-nerve-origin-course-branches",
     "The musculocutaneous nerve arises from the lateral cord, pierces coracobrachialis, supplies the three flexors of the arm, and ends as the lateral cutaneous nerve of the forearm.",
     UL + " > Nerve Supply of Upper Limb & Nerve Injuries", "high",
     [128, 154, 194, 432, 498, 595, 661]),
    ("axillary-nerve-injury-shoulder-dislocation",
     "Dislocation of the shoulder endangers the axillary nerve, paralysing deltoid and teres minor so that abduction is lost, the shoulder becomes flat, and sensation goes over the lower half of the deltoid.",
     UL + " > Nerve Supply of Upper Limb & Nerve Injuries", "high", [37, 59]),
    ("surgical-neck-humerus-fracture-axillary-nerve-posterior-circumflex",
     "Fracture of the surgical neck of the humerus injures the axillary nerve and the posterior circumflex humeral artery that run with it through the quadrangular space.",
     UL + " > Nerve Supply of Upper Limb & Nerve Injuries", "high", [97]),
    ("upper-limb-cutaneous-nerve-supply",
     "The skin of the upper limb is supplied in named strips -- the medial side of the arm and forearm from the medial cord, the lateral side from the musculocutaneous, the dorsum of the hand from radial and ulnar, the palm from median and ulnar.",
     UL + " > Nerve Supply of Upper Limb & Nerve Injuries", "high",
     [251, 325, 438, 504, 563, 599, 603, 611]),
    ("case-wrist-laceration-vessels-nerves",
     "A cut across the front of the wrist divides the radial and ulnar arteries and the median and ulnar nerves, and the bleeding is controlled by pressure on the brachial artery against the humerus or on the radial artery against the lower radius.",
     UL + " > Nerve Supply of Upper Limb & Nerve Injuries", "high", [38, 60, 133, 159]),

    # ---------------------------------------------------------------- Upper Limb > Veins
    ("upper-limb-superficial-veins-cephalic-basilic",
     "The cephalic vein is the lateral continuation of the dorsal venous network and ends in the axillary vein, while the basilic vein joins the venae comitantes of the brachial artery to form the axillary vein.",
     UL + " > Veins of the Upper Limb", "high", [116]),

    # ---------------------------------------------------------------- Off-tree: neuron histology
    ("neuron-cytoskeleton-axonal-transport",
     "Transport of neurotransmitter along the neuron runs on microtubules.",
     OFF + ": Histology > Nerve Tissue", "high", [540]),
    ("neuron-processes-dendrite-axon",
     "A dendrite is multiple, short, tapering and contains Nissl bodies, while the axon is single, long and of constant diameter without them.",
     OFF + ": Histology > Nerve Tissue", "high", [541]),
    ("neuron-classification-multipolar-bipolar",
     "Neurons are classified by their processes, the Purkinje cell of the cerebellar cortex being the multipolar example.",
     OFF + ": Histology > Nerve Tissue", "high", [542]),

    # ---------------------------------------------------------------- Off-tree: lower limb & thorax cases
    ("case-common-peroneal-nerve-neck-of-fibula",
     "The common peroneal nerve winds round the neck of the fibula where it is easily injured, giving foot drop with loss of dorsiflexion and eversion and numbness over the lateral leg and dorsum of the foot.",
     OFF + ": Anatomy > Lower Limb", "high", [42, 46, 64, 68]),
    ("case-femoral-neck-fracture-elderly",
     "The neck of the femur is the common fracture site in the elderly, and the limb becomes short and laterally rotated, with avascular necrosis of the head as the complication.",
     OFF + ": Anatomy > Lower Limb", "high", [43, 65]),
    ("case-femoral-hernia-femoral-canal",
     "A femoral hernia comes through the femoral ring into the femoral canal, is commoner in women because their ring is wider, and readily strangulates.",
     OFF + ": Anatomy > Lower Limb", "high", [44, 66]),
    ("case-knee-meniscus-injury-ligaments",
     "Violent abduction and external rotation of the flexed knee tears the medial meniscus because it is fixed to the tibial collateral ligament, and the cruciate ligaments are what stop hyperextension and forward sliding.",
     OFF + ": Anatomy > Lower Limb", "high", [45, 67]),
    ("case-sciatic-nerve-injury",
     "The sciatic nerve (L4,5, S1,2,3) arises from the sacral plexus and a complete division at the back of the thigh paralyses the hamstrings and everything below the knee, sparing only the saphenous territory on the medial side of the foot.",
     OFF + ": Anatomy > Lower Limb", "high", [47, 69]),
    ("case-angina-coronary-arteries",
     "Anginal pain radiating to the left shoulder and arm comes from the two coronary arteries arising from the ascending aorta, each with its named branches and territory.",
     OFF + ": Anatomy > Thorax", "high", [48, 70]),
    ("case-pleural-effusion-pleura-parts",
     "Fluid in the pleural cavity is a pleural effusion; the pleura has parietal parts with their recesses and a visceral part, and blood, air or pus in the cavity are haemothorax, pneumothorax and empyema.",
     OFF + ": Anatomy > Thorax", "high", [49, 71]),
    ("case-haemopericardium-pericardium-parts",
     "Blood in the pericardial cavity is haemopericardium, drained by aspiration in the fifth left intercostal space, the pericardium having fibrous and serous parts supplied by the internal thoracic and pericardiacophrenic arteries.",
     OFF + ": Anatomy > Thorax", "high", [50, 72]),
    ("case-cardiac-conducting-system",
     "Irregular heartbeat after infarction of the territory of the right coronary artery points to damage of the conducting system -- SA node, AV node, bundle of His and its branches -- each with its own site and course.",
     OFF + ": Anatomy > Thorax", "high", [51, 73]),
    ("case-inhaled-foreign-body-bronchus",
     "An inhaled foreign body goes to the right principal bronchus because it is wider, shorter and more in line with the trachea, and lodging in a lobar bronchus collapses that lobe.",
     OFF + ": Anatomy > Thorax", "high", [52, 74]),
    ("case-thoracic-aortic-aneurysm",
     "A pulsatile retrosternal swelling with dysphagia and hoarseness is an aneurysm of the arch of the aorta pressing on the oesophagus and the left recurrent laryngeal nerve.",
     OFF + ": Anatomy > Thorax", "high", [53, 75]),
]

# index -> why it could not be assigned
UNCLUSTERED = {
    81: "answer-option list only (\"Responsible for cell digestion / Inner membrane form cristae ...\"); the stem it belongs to was OCR'd into the preceding row",
    91: "answer-option list only (\"Basophils / Lymphocytes / Eosinophils\") with no question stem",
    243: "single answer option (\"Supraglenoid tubercle of the scapula.\") split off its stem",
    254: "single answer option about the medial wall of the axilla, split off its stem",
    306: "single answer option about the normal site of implantation, split off its stem",
    314: "single answer option (\"Supraglenoid tubercle of the scapula.\") split off its stem",
    328: "single answer option (\"It gives posterior interosseous recurrent artery.\") split off its stem",
    331: "single answer option (\"It is most commonly dislocated inferiorly.\") split off its stem",
    334: "single answer option (\"Arises from radius, ulna and interosseous membrane.\") split off its stem",
    339: "two answer options (\"Thoracodorsal nerve / Suprascapular nerve\") with no stem",
    341: "single answer option about sensation on the dorsum of the hand, split off its stem",
    347: "exam rubric, not a question (\"The exam consists of 3 sections ...\")",
    358: "column B of an extended-matching table (organelle functions) with no column A and no stem",
    427: "single answer option (\"It arises from annular and lateral collateral ligament.\") split off its stem",
    429: "single answer option (\"is accompanied throughout its course by the basilic vein\") split off its stem",
    493: "single answer option (\"It arises from annular and lateral collateral ligament.\") split off its stem",
    495: "single answer option (\"is accompanied throughout its course by the basilic vein\") split off its stem",
    631: "stem destroyed by OCR (\"1 latel ntains:\"); probably the platelet granulomere question but not legible enough to assign",
    645: "three answer options (\"Pectoralis minor / Subclavius / Clavipectoral fascia\") with no stem",
    650: "answer options about the range of abduction lost, split off their stem",
    653: "answer options (\"Rhomboid major / Trapezius / Medial border of the scapula\") with no stem",
    665: "two answer options (\"bicipital aponeurosis / ulnar nerve\") with no stem",
    675: "two answer options (\"extensor digiti minimi / extensor carpi ulnaris\") with no stem",
    677: "single answer option (\"most medial muscle arising from the common flexor origin\") with no stem",
    678: "single answer option (\"ulnar nerve passes between its two heads\") with no stem",
    689: "single answer option (\"2nd Dorsal metacarpal artery\") with no stem",
    690: "single answer option (\"Radialis indicis artery\") with no stem",
    693: "answer options (forearm flexor muscles) with no stem",
    695: "single answer option (\"palmaris longus\") with no stem",
    696: "single answer option (\"flexor carpi ulnaris\") with no stem",
    697: "single answer option (\"flexor digitorum superficialis\") with no stem",
}


def norm(text):
    return re.sub(r"\s+", " ", text).strip()


CLEAN_RE = re.compile(r"[A-Za-z0-9 .,;:()\[\]{}&/'\"?%+\-]")


def legibility(text):
    """Mechanical score for choosing which verbatim occurrence to quote."""
    if not text:
        return -1e9
    clean = sum(1 for ch in text if CLEAN_RE.match(ch)) / len(text)
    score = clean * 100
    n = len(text)
    if n < 15:
        score -= 40
    if n > 340:
        score -= (n - 340) / 12.0
    # a real question usually opens with an instruction verb
    if re.match(r"^\s*(mention|describe|discuss|compare|explain|enumerate|give|"
                r"outline|summari[sz]e|regarding|concerning|point out|name|what|which|list)",
                text, re.I):
        score += 12
    # penalise rows that are clearly several questions welded together by OCR
    score -= 4 * len(re.findall(r"\b\d{1,3}\s*[-.]\s+[A-Z]", text))
    return score


def load_tree(path):
    """Leaf paths of the module subject tree, in document order."""
    leaves = []
    stack = {}
    subject = None
    chapter = None
    with open(path, encoding="utf-8") as fh:
        for line in fh:
            m = re.match(r"^(\s*)- (.+)$", line.rstrip("\n"))
            if not m:
                continue
            indent = len(m.group(1))
            name = re.sub(r"\s*[\[(].*$", "", m.group(2)).strip()
            if indent == 0:
                continue  # the module line itself
            if indent == 2:
                subject, chapter = name, None
            elif indent == 4:
                chapter = name
            elif indent == 6 and subject and chapter:
                leaves.append("101 ISK > %s > %s > %s" % (subject, chapter, name))
    del stack
    return leaves


def main():
    with open(QUESTIONS, encoding="utf-8") as fh:
        rows = json.load(fh)["questions"]
    total = len(rows)

    # ---- integrity: every index assigned exactly once ----
    seen = {}
    for key, _, _, _, idxs in OBJECTIVES:
        for i in idxs:
            if i in seen:
                sys.exit("index %d assigned to both %s and %s" % (i, seen[i], key))
            seen[i] = key
    for i in UNCLUSTERED:
        if i in seen:
            sys.exit("index %d is both clustered (%s) and unclustered" % (i, seen[i]))
        seen[i] = "<unclustered>"
    missing = [i for i in range(total) if i not in seen]
    if missing:
        sys.exit("unaccounted indices: %r" % (missing[:40],))
    if len(seen) != total:
        sys.exit("assigned %d indices for %d rows" % (len(seen), total))

    objectives = []
    for key, label, path, conf, idxs in OBJECTIVES:
        occ = []
        for i in idxs:
            r = rows[i]
            occ.append({
                "index": i,
                "sourceId": r["sourceId"],
                "file": r["file"],
                "category": r.get("category"),
                "year": r.get("year"),
                "page": r.get("page"),
                "number": r.get("number"),
                "marks": r.get("marks"),
                "asked": norm(r["text"]),
            })
        canonical = max(occ, key=lambda o: legibility(o["asked"]))["asked"]
        years = sorted({o["year"] for o in occ if o["year"] is not None})
        marks = sorted({o["marks"] for o in occ if o["marks"] is not None})
        section = "Histology" if "Histology" in path else "Anatomy"
        objectives.append({
            "key": key,
            "label": label,
            "canonicalAsked": canonical,
            "subjectPath": path,
            "section": section,
            "occurrences": occ,
            "timesAsked": len(occ),
            "yearsAsked": years,
            "marksRange": [marks[0], marks[-1]] if marks else [],
            "confidence": conf,
        })

    objectives.sort(key=lambda o: (-o["timesAsked"], o["key"]))

    unclustered = [{"index": i, "sourceId": rows[i]["sourceId"], "file": rows[i]["file"],
                    "text": norm(rows[i]["text"])[:200], "why": why}
                   for i, why in sorted(UNCLUSTERED.items())]

    doc = {
        "totalQuestions": total,
        "clusters": len(objectives),
        "unclustered": unclustered,
        "objectives": objectives,
    }
    with open(OUT_JSON, "w", encoding="utf-8") as fh:
        json.dump(doc, fh, indent=1, ensure_ascii=False)
        fh.write("\n")

    write_report(rows, objectives, unclustered, total)
    print("clusters=%d  clustered_rows=%d  unclustered=%d"
          % (len(objectives), total - len(unclustered), len(unclustered)))



# ---------------------------------------------------------------------------
# The Anatomy Department's own orientation sheet (notes.json -> orientation),
# broken into its declared items and mapped -- by my reading -- onto the
# cluster keys above. Empty list means: declared, and no cluster corresponds.
# ---------------------------------------------------------------------------
DECLARED = [
    ("Basis", "Fascia -- superficial", ["superficial-fascia-features"]),
    ("Basis", "Fascia -- deep", ["deep-fascia-parts-functions"]),
    ("Basis", "Bones", ["bone-classification-types", "bone-functions-types-pneumatic",
                        "bone-growth-epiphyseal-plate", "bone-blood-supply-arteries"]),
    ("Basis", "Joints -- fibrous", ["fibrous-joints-types-definition"]),
    ("Basis", "Joints -- cartilaginous", ["cartilaginous-joints-primary-vs-secondary"]),
    ("Basis", "Joints -- synovial", ["synovial-joint-structure-characters",
                                     "synovial-joint-types-examples", "articular-cartilage-function"]),
    ("Basis", "Muscles", ["muscle-attachment-types", "muscle-classification-by-action-prime-mover"]),

    ("Embryology", "Fertilization", ["fertilization-site-mechanism-results"]),
    ("Embryology", "Implantation", ["implantation-normal-site", "implantation-abnormal-sites",
                                    "blastocyst-structure-inner-cell-mass",
                                    "second-week-development-events",
                                    "trophoblast-syncytio-cytotrophoblast"]),
    ("Embryology", "Decidua", ["decidua-definition-parts-fates"]),
    ("Embryology", "Notochord", ["notochord-formation-fate"]),
    ("Embryology", "Intra-embryonic mesoderm", ["paraxial-mesoderm-somite-derivatives",
                                                "neurulation-neural-tube-formation"]),
    ("Embryology", "Folding", ["embryonic-disc-folding-types-causes-results"]),
    ("Embryology", "Fetal membranes -- chorion", ["chorionic-villi-types-development"]),
    ("Embryology", "Fetal membranes -- amnion", ["amnion-amniotic-cavity-formation",
                                                 "amniotic-fluid-functions"]),
    ("Embryology", "Fetal membranes -- placenta", ["placenta-formation-fetal-maternal-parts",
                                                   "placenta-anomalies",
                                                   "placenta-gross-features-full-term"]),
    ("Embryology", "Fetal membranes -- umbilical cord", ["umbilical-cord-structure-at-birth",
                                                         "umbilical-cord-anomalies"]),

    ("Upper Limb", "Muscles -- all except hand (attachment, nerve supply, action)",
     ["pectoralis-major-attachment-nerve-action", "deltoid-attachment-nerve-action",
      "rotator-cuff-muscles-attachments-actions", "trapezius-attachments-nerve-action",
      "latissimus-dorsi-attachments-action-nerve", "serratus-anterior-attachments-nerve-action",
      "biceps-brachii-attachments-action-nerve", "triceps-brachii-attachments-action-nerve",
      "brachialis-muscle-attachments-nerve-action",
      "flexor-digitorum-superficialis-profundus-attachments-nerve",
      "forearm-muscles-attachments-nerve-supply", "forearm-anterior-compartment-muscles-groups",
      "forearm-extensor-compartment-muscles", "supination-pronation-muscles-attachments-nerve",
      "shoulder-abduction-muscles-attachments-nerve-action",
      "scapular-rotation-abduction-beyond-90-muscles", "shoulder-abduction-muscle-sequence"]),
    ("Upper Limb", "Nerves -- brachial plexus", ["brachial-plexus-formation-branches",
                                                 "erb-palsy-upper-trunk-injury",
                                                 "case-klumpke-lower-trunk-avulsion"]),
    ("Upper Limb", "Nerves -- median", ["median-nerve-origin-course-relations-branches",
                                        "carpal-tunnel-median-nerve-compression"]),
    ("Upper Limb", "Nerves -- radial", ["radial-nerve-origin-root-branches",
                                        "radial-nerve-injury-spiral-groove-wrist-drop"]),
    ("Upper Limb", "Nerves -- ulnar", ["ulnar-nerve-origin-course-branches",
                                       "ulnar-nerve-injury-claw-hand"]),
    ("Upper Limb", "Nerves -- axillary",
     ["axillary-nerve-injury-shoulder-dislocation",
      "surgical-neck-humerus-fracture-axillary-nerve-posterior-circumflex"]),
    ("Upper Limb", "Nerves -- musculocutaneous", ["musculocutaneous-nerve-origin-course-branches"]),
    ("Upper Limb", "Cutaneous nerve supply of the upper limb", ["upper-limb-cutaneous-nerve-supply"]),
    ("Upper Limb", "Arteries -- all, with anastomoses and arches",
     ["axillary-artery-parts-branches", "brachial-artery-origin-course-end-branches",
      "radial-artery-course-branches", "ulnar-artery-course-relations-branches",
      "palmar-arterial-arches-site-formation-branches",
      "carpal-arches-anterior-posterior-comparison", "scapular-anastomosis-arteries"]),
    ("Upper Limb", "Veins -- all (beginning, course, end, tributaries, areas drained)",
     ["upper-limb-superficial-veins-cephalic-basilic"]),
    ("Upper Limb", "Spaces -- intermuscular spaces of shoulder",
     ["intermuscular-spaces-quadrangular-triangular-boundaries-contents"]),
    ("Upper Limb", "Spaces -- axilla", ["axilla-boundaries-walls-contents"]),
    ("Upper Limb", "Spaces -- cubital fossa", ["cubital-fossa-boundaries-contents"]),
    ("Upper Limb", "Spaces -- snuff box", ["anatomical-snuff-box-site-boundaries-contents"]),
    ("Upper Limb", "Spaces -- carpal tunnel", ["flexor-retinaculum-attachments-relations-carpal-tunnel"]),
    ("Upper Limb", "Fasciae -- clavipectoral fascia",
     ["clavipectoral-fascia-attachments-structures-piercing"]),
    ("Upper Limb", "Fasciae -- flexor retinaculum",
     ["flexor-retinaculum-attachments-relations-carpal-tunnel"]),
    ("Upper Limb", "Fasciae -- extensor retinaculum", ["extensor-retinaculum-attachments-compartments"]),
    ("Upper Limb", "Joints -- sternoclavicular", ["sternoclavicular-joint-type-surfaces-ligaments"]),
    ("Upper Limb", "Joints -- acromioclavicular", []),
    ("Upper Limb", "Joints -- shoulder", ["shoulder-joint-type-ligaments-movements",
                                          "shoulder-joint-movements-muscles"]),
    ("Upper Limb", "Joints -- elbow", ["elbow-joint-type-ligaments-movements"]),
    ("Upper Limb", "Joints -- superior & inferior radio-ulnar", []),
    ("Upper Limb", "Joints -- wrist", ["wrist-joint-movements-muscles-ligaments"]),
]

# Anatomy clusters that no line of the orientation sheet covers. Judgement.
UNDECLARED_NOTE = {
    "anatomical-planes-terms-of-position": "the declared Basis list is Fascia, Bones, Joints, Muscles -- planes and terms of position are not on it",
    "lymph-vessels-structure-function": "no lymphatics anywhere on the sheet",
    "lymphatic-ducts-right-thoracic-drainage": "no lymphatics anywhere on the sheet",
    "axillary-lymph-nodes-groups-drainage": "no lymphatics anywhere on the sheet",
    "breast-lymphatic-drainage": "no lymphatics, and no breast, anywhere on the sheet",
    "breast-structure-blood-supply-bed": "the breast is not named on the sheet",
    "case-breast-carcinoma-mastectomy-axillary-nodes": "the breast is not named on the sheet",
    "case-clavicle-fracture-middle-third": "the clavicle is not named on the sheet",
    "deltopectoral-groove-contents": "not among the five declared spaces",
    "palmar-spaces-thenar-midpalmar": "not among the five declared spaces",
    "interosseous-membrane-attachments": "not among the declared fasciae",
    "thumb-movements-muscles": "the sheet explicitly excludes muscles of the hand",
    "extensor-expansion-formation": "the sheet explicitly excludes muscles of the hand",
    "case-wrist-laceration-vessels-nerves": "covered obliquely by the arteries and nerves lines, but set as a case rather than an SAQ",
    "upper-limb-superficial-veins-cephalic-basilic": None,  # declared; handled above
}

# Muscles the sheet's blanket "all muscles" covers but which never head a
# question in questions.json -- they appear only as MCQ distractors.
NEVER_HEADED_MUSCLES = ["coracobrachialis", "pectoralis minor", "subclavius",
                        "rhomboid major and minor", "levator scapulae",
                        "teres major", "teres minor (alone)"]

# The real end-of-year sittings that print per-question marks. Duplicate
# "solved"/recollection copies of the same paper are deliberately excluded.
CANONICAL_PAPERS = [
    (2025, "EOY (ISK - 101) 199 (1).pdf"),
    (2024, "EOY (ISK - 101) 198 (1).pdf"),
    (2022, "EOY 195 first 2022 101 ISK final (1).pdf"),
    (2022, "EOY 195 first 2022  101 ISK  final module (1).pdf"),
]


def area_of(path):
    """Basis / Embryology / Upper Limb / Histology / off-tree, from a subject path."""
    if path.startswith(OFF):
        return "off-tree"
    if "Histology" in path:
        return "Histology"
    for a in ("Basis of Anatomy", "General Embryology", "Upper Limb"):
        if a in path:
            return {"Basis of Anatomy": "Basis", "General Embryology": "Embryology",
                    "Upper Limb": "Upper Limb"}[a]
    return "other"


def write_report(rows, objectives, unclustered, total):
    leaves = load_tree(STRUCTURE)
    by_key = {o["key"]: o for o in objectives}
    by_leaf = defaultdict(list)
    for o in objectives:
        by_leaf[o["subjectPath"]].append(o)

    L = []
    w = L.append
    w("# What module 101 ISK actually examines")
    w("")
    w("Built from `scripts/kasr/questions.json` -- %d questions machine-extracted from 22 Kasr Al Ainy "
      "papers, 2021-2025 -- by `scripts/kasr/extract/cluster.py`. The %d rows reduce to **%d distinct "
      "assessable objectives**. %d rows could not be assigned and are listed in the appendix."
      % (total, total, len(objectives), len(unclustered)))
    w("")
    w("**Mechanical, and therefore reproducible:** whitespace normalisation; occurrence, year and marks "
      "counting; the legibility score that picks which verbatim occurrence to quote as `canonicalAsked`; "
      "parsing the subject tree; testing each declared syllabus item against the cluster set; and the "
      "check that every one of the %d indices is assigned exactly once.")
    L[-1] = L[-1] % total
    w("")
    w("**Judgement, from reading all %d rows end to end:** which rows are the same assessable objective, "
      "what that objective is, where it sits in the tree, which declared syllabus item each cluster "
      "answers to, and which rows are too broken to place. No string-similarity matching was used to "
      "form a cluster. The papers reword one objective freely -- \"Describe Decidua regarding "
      "definition, parts and fates\" and \"Mention parts and fates of decidua\" share almost no words -- "
      "and they also reuse near-identical wording for objectives that are genuinely different, so "
      "similarity would have both split and merged the wrong things." % total)
    w("")
    w("Corroborating sources, used only to check conclusions and never to form a cluster: "
      "`scripts/kasr/extract/notes.json` (the Anatomy Department orientation sheet, 150 teaching topics, "
      "153 past questions 2016-2024) and `scripts/kasr/extract/mcq-bank.json` (2,704 distinct MCQs with "
      "repetition counts).")
    w("")

    # ------------------------------------------------------------------ 1
    w("## 1. The blueprint -- the top 40 objectives by how often they recur")
    w("")
    w("| # | Objective | Times | Years | Marks | Subject path |")
    w("|---|---|---|---|---|---|")
    for n, o in enumerate(objectives[:40], 1):
        yrs = ", ".join(str(y) for y in o["yearsAsked"]) or "undated"
        mr = o["marksRange"]
        mk = "-" if not mr else ("%g" % mr[0] if mr[0] == mr[1] else "%g-%g" % tuple(mr))
        w("| %d | %s | %d | %s | %s | %s |"
          % (n, o["label"], o["timesAsked"], yrs, mk, o["subjectPath"].replace("101 ISK > ", "")))
    w("")
    w("Independent corroboration: the most-repeated stems in the 2,704-question MCQ bank are wrist drop "
      "from nerve injury (x5), the lateral intermuscular septum (x5), branches of the ulnar artery, "
      "pronation and supination, cutaneous innervation of the palm, lateral rotation at the shoulder, "
      "loss of finger abduction, and carpal tunnel motor loss (all x4) -- the same nerve-injury and "
      "nerve-supply territory that dominates the table above.")
    w("")

    # ------------------------------------------------------------------ 2
    w("## 2. Coverage against the declared syllabus")
    w("")
    w("The Anatomy Department's orientation sheet (`notes.json` -> `orientation`, signed by the head of "
      "the department board) states the examinable syllabus for the 60-mark end-of-year Anatomy written "
      "paper. Each declared item is tested against the cluster set below. Note the sheet governs the "
      "**Anatomy** paper only -- Histology is set by a different department, so Histology clusters are "
      "not \"undeclared\", they are simply outside this sheet's remit.")
    w("")
    w("### 2a. Every declared item, and whether it has ever been examined")
    w("")
    w("| Declared item | Objectives | Total askings | Verdict |")
    w("|---|---|---|---|")
    never, thin = [], []
    for sec, item, keys in DECLARED:
        objs = [by_key[k] for k in keys if k in by_key]
        asks = sum(o["timesAsked"] for o in objs)
        if not objs:
            verdict = "**NEVER EXAMINED**"
            never.append((sec, item))
        elif asks <= 1:
            verdict = "**barely examined**"
            thin.append((sec, item, asks))
        else:
            verdict = "examined"
        w("| %s: %s | %d | %d | %s |" % (sec, item, len(objs), asks, verdict))
    w("")
    w("### 2b. Declared but never examined")
    w("")
    w("This is the most useful single fact here: material the department tells students to learn, and "
      "which no paper in the corpus has ever asked.")
    w("")
    for sec, item in never:
        w("- **%s: %s** -- no cluster corresponds. In `questions.json` the acromioclavicular joint is not "
          "mentioned in any of the %d rows at all; the radio-ulnar joints appear only as wrong options "
          "inside questions about something else (gomphosis, the biaxial ellipsoid joint)." % (sec, item, total)
          if "acromio" in item else "- **%s: %s** -- no cluster corresponds." % (sec, item))
    w("")
    w("Both are declared twice over: the sheet says \"All joints except joints of the hand\", and the "
      "subject tree carries a `Joints of Upper Limb` leaf. Corroboration from the other two corpora "
      "shows this is a genuine examining habit and not an artefact of the 22 papers sampled: across the "
      "2,704-MCQ bank the acromioclavicular joint heads five one-off stems and the radio-ulnar joints "
      "three, against x4-x5 repetition for the favoured topics; across the 153 past questions of "
      "2016-2024 the acromioclavicular joint appears exactly once, as a 2024 *case*, and never as a "
      "short-answer question.")
    w("")
    for sec, item, asks in thin:
        w("- **%s: %s** -- %d asking in the whole corpus." % (sec, item, asks))
    w("")
    w("The veins deserve their own line. The sheet devotes a full clause to them -- \"all veins of the "
      "upper limb (beginning, course, end and name of the tributaries and areas drained by these "
      "tributaries)\" -- and in %d rows they are the subject of exactly one question, an MCQ in the 2024 "
      "end-of-module paper. Every other mention of the cephalic or basilic vein in the corpus is a "
      "distractor inside a question about the deltopectoral groove, the axillary lymph nodes or the "
      "brachial artery. In the wider 2016-2024 past-question set veins surface seven times, again only "
      "as MCQs or as one 2017 dialysis case -- never once as a short-answer question. Since the current "
      "paper is eight SAQs and two cases, a clause of the syllabus written in SAQ language has never "
      "been set as an SAQ." % total)
    w("")
    w("One more gap sits inside a declared item rather than replacing it. \"All muscles (attachment, "
      "nerve supply and action)\" is examined heavily, but only for a subset: the following muscles never "
      "head a question anywhere in the corpus and appear solely as MCQ distractors -- %s."
      % ", ".join(NEVER_HEADED_MUSCLES))
    w("")

    w("### 2c. Examined but not declared")
    w("")
    w("Anatomy clusters that no line of the orientation sheet covers. Either the syllabus has changed "
      "since these were set, or the paper overran it.")
    w("")
    w("| Objective | Times | Years | Why it is undeclared |")
    w("|---|---|---|---|")
    declared_keys = {k for _, _, ks in DECLARED for k in ks}
    undeclared = []
    for o in objectives:
        if o["key"] in declared_keys:
            continue
        a = area_of(o["subjectPath"])
        if a in ("Histology",):
            continue
        note = UNDECLARED_NOTE.get(o["key"])
        if a == "off-tree":
            note = note or ("outside the module entirely -- %s"
                            % o["subjectPath"].replace(OFF + ": ", ""))
        if note is None:
            continue
        undeclared.append((o, note))
    undeclared.sort(key=lambda t: -t[0]["timesAsked"])
    for o, note in undeclared:
        yrs = ", ".join(str(y) for y in o["yearsAsked"]) or "undated"
        w("| %s | %d | %s | %s |" % (o["label"][:110], o["timesAsked"], yrs, note))
    w("")
    off_objs = [o for o in objectives if o["subjectPath"].startswith(OFF)]
    off_asks = sum(o["timesAsked"] for o in off_objs)
    w("The largest single block of undeclared material is the 2025 case bank, which examines **lower "
      "limb and thorax**: %d objectives across %d askings -- common peroneal nerve, femoral neck "
      "fracture, femoral hernia, knee meniscus, sciatic nerve, coronary arteries, pleural effusion, "
      "haemopericardium, the cardiac conducting system, inhaled foreign body and aortic aneurysm. None "
      "of this is on the orientation sheet and none of it exists anywhere in the 101 subject tree, whose "
      "only regional chapter is Upper Limb. A student revising module 101 from either document would not "
      "know these were coming." % (len([o for o in off_objs if "Lower Limb" in o["subjectPath"]
                                        or "Thorax" in o["subjectPath"]]), off_asks))
    w("")
    w("Two smaller overruns are worth naming. The sheet excludes muscles of the hand and joints of the "
      "hand, yet thumb movements and the extensor expansion are both examined. And lymphatics appear "
      "nowhere on the sheet, yet the groups of axillary lymph nodes and the lymphatic drainage of the "
      "breast are asked repeatedly -- including as the mastectomy case, which is the single most "
      "repeated case in the corpus.")
    w("")

    w("### 2d. Does the paper obey its own declared structure?")
    w("")
    w("The sheet states a fixed shape: 8 SAQs -- 2 basis, 2 embryology, 4 upper limb -- plus 2 cases. "
      "Counted from the Anatomy section of each real sitting that prints its marks (duplicate "
      "\"solved\" and recollection copies of the same paper excluded):")
    w("")
    w("| Year | Paper | Basis | Embryology | Upper limb SAQ | Cases | Obeys? |")
    w("|---|---|---|---|---|---|---|")
    idx_key = {}
    for o in objectives:
        for oc in o["occurrences"]:
            idx_key[oc["index"]] = o
    for year, fname in CANONICAL_PAPERS:
        counts = defaultdict(int)
        cases = 0
        for i, r in enumerate(rows):
            if r["file"] != fname:
                continue
            if r.get("section") == "Histology":
                continue
            o = idx_key.get(i)
            if not o:
                continue
            if o["key"].startswith("case-") or "case" in (r["text"][:12].lower()):
                cases += 1
                continue
            counts[area_of(o["subjectPath"])] += 1
        ok = (counts["Basis"] == 2 and counts["Embryology"] == 2
              and counts["Upper Limb"] == 4 and cases == 2)
        w("| %d | %s | %d | %d | %d | %d | %s |"
          % (year, fname[:40], counts["Basis"], counts["Embryology"], counts["Upper Limb"],
             cases, "**yes, exactly**" if ok else "no"))
    w("")
    w("Only the 2025 paper obeys the declared structure, and it obeys it exactly: two basis questions "
      "(types of muscle attachment; primary against secondary cartilaginous joints), two embryology "
      "(decidua; folding), four upper limb (pectoralis major; radial nerve; deep palmar arch; elbow "
      "joint) and two cases. **2024** ran ten SAQs, not eight -- two basis, *three* embryology and "
      "*five* upper limb -- all at a flat 5 marks. **2022** is a different architecture again: a single "
      "combined Histology-and-Anatomy paper of fourteen short essays, twenty-nine MCQs and three "
      "extended-matching questions. This is not a paper drifting from its orientation: the sheet is "
      "headed \"End of Year, 2025-2026\", so it describes the format that 2025 introduced, and the "
      "earlier papers predate it.")
    w("")

    w("### 2e. Coverage by subject-tree leaf")
    w("")
    w("| Leaf | Distinct objectives | Total askings |")
    w("|---|---|---|")
    zero = []
    for leaf in leaves:
        objs = by_leaf.get(leaf, [])
        if not objs:
            zero.append(leaf)
        w("| %s | %d | %d |" % (leaf.replace("101 ISK > ", ""), len(objs),
                                sum(o["timesAsked"] for o in objs)))
    w("")
    w("**Leaves never examined once:**")
    w("")
    for leaf in zero:
        w("- %s" % leaf.replace("101 ISK > ", ""))
    w("")
    w("Three of these six are real gaps a student can act on: **Gametes** (no question on "
      "gametogenesis, spermatogenesis or oogenesis in eleven years), **Fetal Period**, and "
      "**Neuro Epithelium**. The other three are artefacts of how the tree was drawn -- Basis of "
      "Anatomy's Cardiovascular system and Nervous system leaves and Histology's Microscopes leaf carry "
      "content the papers do examine, but always inside a question filed elsewhere. Note also that "
      "Gametes and Fetal Period are absent from the orientation sheet too, so on that evidence they are "
      "genuinely not examinable and the tree, not the faculty, is what is out of step.")
    w("")
    off = sorted(p for p in by_leaf if p.startswith(OFF))
    if off:
        w("**Examined, but nowhere in the 101 subject tree:**")
        w("")
        for p in off:
            objs = by_leaf[p]
            w("- %s -- %d objectives, %d askings"
              % (p.replace(OFF + ": ", ""), len(objs), sum(o["timesAsked"] for o in objs)))
        w("")

    # ------------------------------------------------------------------ 3
    w("## 3. Drift")
    w("")
    w("A caution before the lists: the corpus is not a clean year-by-year sample. 2021 and 2022 are "
      "represented mostly by end-of-module MCQ papers, 2023 largely by a recollection list, and 2025 by "
      "one end-of-year paper plus a case bank. An objective \"disappearing\" after 2022 usually means "
      "the later MCQ papers are missing, not that the faculty stopped asking. The drift worth trusting "
      "is structural, and there are four movements.")
    w("")
    w("**The paper changed shape twice.** 2022 was one combined paper with fourteen short essays, "
      "twenty-nine MCQs and three extended-matching questions. By 2024 the MCQs and matching survive but "
      "the Anatomy section is ten flat 5-mark SAQs. By 2025 the MCQs have collapsed to twenty-six at "
      "half a mark, and Anatomy is the eight-SAQ, two-case structure the orientation sheet describes. "
      "The direction is consistent: fewer, heavier written questions, and MCQs falling from a full mark "
      "to a half.")
    w("")
    w("**Clinical cases arrived and then expanded past the module.** Cases appear in 2022 (one, the "
      "mastectomy), in 2024 (two) and in 2025 (two on the paper) -- but the 2025 case bank carries "
      "twenty-two, of which eleven are lower limb and thorax. Whatever the 2025 paper itself did, the "
      "material students were told to prepare stopped being an upper-limb module.")
    w("")
    w("**The end-of-module MCQ paper is substantially recycled year to year.** The 2023 end-of-module "
      "paper shares 45 of its 58 objectives with the 2022 one -- the same questions, often the same "
      "wording and the same distractors. The 2024 paper is a bigger break, sharing only 16-18 "
      "objectives with either.")
    w("")
    w("**A small stable core spans everything.** Two objectives are asked in all five years: the types "
      "and fates of secondary lysosomes, and ulnar nerve injury and claw hand. Sixteen more span four of "
      "the five.")
    w("")
    years = sorted({y for o in objectives for y in o["yearsAsked"]})
    w("Years present: %s. %d rows carry no year at all -- the compiled question banks, the Baqoon "
      "(third-sitting) lists and the upper-limb formative assessment."
      % (", ".join(str(y) for y in years),
         sum(1 for r in rows if not r.get("year"))))
    w("")

    # ------------------------------------------------------------------ 4
    w("## 4. Marks")
    w("")
    w("| Year | Questions printing a mark | Mark values used | Mean marks/question |")
    w("|---|---|---|---|")
    per_year = defaultdict(list)
    for r in rows:
        if r.get("marks") is not None and r.get("year"):
            per_year[r["year"]].append(r["marks"])
    for y in sorted(per_year):
        v = per_year[y]
        w("| %d | %d | %s | %.2f |"
          % (y, len(v), ", ".join("%g" % m for m in sorted(set(v))), sum(v) / len(v)))
    w("")
    w("2021 and 2023 print no per-question marks anywhere in the corpus -- the 2021 papers are "
      "MCQ answer keys and 2023 survives only as a recollection list -- so they cannot be included.")
    w("")
    w("The trend is steady inflation of the individual written question: mean 4.00 in 2022 across "
      "values of 2 to 5, 4.71 in 2024 with everything flattened to 4 or 5, and 5.06 in 2025 across 3 to "
      "7. Against that, MCQs move the other way. The 2024 paper marks its MCQ section \"{1 Mark each}\"; "
      "the 2025 paper marks its twenty-six MCQs \"{1/2 Mark each}\". Written answers are worth "
      "progressively more and recognition questions progressively less.")
    w("")
    w("### The orientation sheet's arithmetic is wrong, and the papers show which half to trust")
    w("")
    w("The sheet states: *8 SAQ (2 basis-2 embryology) 6 marks each and (4 upper) 7 marks each with "
      "total 54 mark* plus *2 cases, 3 marks each with total 6 mark*, under a heading of 60 marks.")
    w("")
    w("Four questions at 6 and four at 7 is 24 + 28 = **52**, not the 54 the sheet claims. Settling it "
      "from the paper rather than the sheet: the 2025 end-of-year Anatomy section prints its marks, and "
      "they are 6, 6, 6, 6, 7, 7, 7, 7 for the SAQs and 3, 3 for the two cases.")
    w("")
    w("So the **per-question figures on the sheet are exactly right** and the paper follows them "
      "question for question. It is the **stated subtotal that is wrong**: 52, not 54. The real Anatomy "
      "written paper therefore totals **58 marks, not the 60** the sheet is headed with. The two-mark "
      "discrepancy in the subtotal is the whole of the shortfall -- 52 + 6 = 58, while the sheet's "
      "54 + 6 = 60 only reaches the headline total because of the error. A student allocating revision "
      "time by marks should use 6/6/6/6/7/7/7/7/3/3, which is what the paper actually pays.")
    w("")

    # ------------------------------------------------------------------ 5
    w("## 5. What surprised me")
    w("")
    w("**The papers are recycled far more than the file count suggests.** Twenty-two PDFs are not "
      "twenty-two papers. Eight pairs are the same sitting twice -- an unsolved and a solved copy, or a "
      "student's recollection of the paper they had just sat. Once those are collapsed the corpus is "
      "about thirteen distinct sittings. And the recycling continues between sittings: the 2023 "
      "end-of-module paper is three-quarters the 2022 one.")
    w("")
    w("**The single most repeated thing in the corpus is not a topic but a question format.** Kasr "
      "examines by comparison table -- eosinophil against neutrophil, mast cell against plasma cell, "
      "unilocular against multilocular fat, plasma cell against macrophage, oesophagus against urinary "
      "bladder, primary against secondary cartilaginous joint, superficial against deep palmar arch, "
      "anterior against posterior carpal arch. These are not eight instances of \"know your cells\"; each "
      "is a distinct objective with its own printed answer grid, and a student who has revised the two "
      "entities separately can still fail the comparison.")
    w("")
    w("**Nerve injury outweighs nerve anatomy.** Across the blueprint, the MCQ bank and the case bank, "
      "the recurring winners are lesions, not descriptions: wrist drop, claw hand, winged scapula, Erb's "
      "palsy, carpal tunnel, flat shoulder. The orientation sheet anticipates this precisely -- its "
      "nerves clause ends \"and the effect of injury\" -- which makes it the one place where the sheet is "
      "a better guide to the paper than the subject tree is.")
    w("")
    w("**The corpus quietly stopped being an upper-limb module.** Eleven objectives and twenty-two rows "
      "examine the lower limb and thorax, all through the 2025 case bank, and neither the orientation "
      "sheet nor the subject tree contains a word about either region.")
    w("")
    w("**The extraction's own duplicates are informative rather than noise.** Where the same paper "
      "exists as both an unsolved and a solved copy, the solved copy sometimes settles an OCR ambiguity "
      "in the other -- the 2025 MCQ weighting reads as \"{2 Mark each}\" in the unsolved scan and "
      "\"{1/2 Mark each}\" in the solved one, and the half-mark is what makes the section total work.")
    w("")

    # ------------------------------------------------------------------ appendix
    w("## Appendix -- rows that could not be clustered")
    w("")
    w("%d of %d rows. Every one is an OCR casualty rather than a judgement call: the extractor split "
      "an MCQ across two rows and these are the halves carrying answer options but no question stem. "
      "They are listed rather than dropped so the count reconciles." % (len(unclustered), total))
    w("")
    w("| Index | File | Why |")
    w("|---|---|---|")
    for u in unclustered:
        w("| %d | %s | %s |" % (u["index"], u["file"][:38], u["why"]))
    w("")

    with open(OUT_MD, "w", encoding="utf-8") as fh:
        fh.write("\n".join(L) + "\n")


if __name__ == "__main__":
    main()
