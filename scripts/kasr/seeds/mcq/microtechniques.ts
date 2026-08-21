/**
 * `101 ISK > Histology > Introduction > Microtechniques` — the question books' MCQs.
 *
 * Eighty-seven rows, sixty-seven live: the highest survival rate of the eleven
 * leaves I have worked, and the cleanest scans. The exclusions are almost all
 * three-option rows rather than damage — this chapter's questions are short and
 * the books often print only three choices for them, which the four-option
 * contract cannot take.
 *
 * The leaf is not really about technique; it is about which stain shows what,
 * asked from both ends. Half its rows name a stain and want a target, half name
 * a target and want a stain, and a third of them are strays that the topic
 * clustering sent here because a stain appears in the option list — the
 * eosinophil questions, the mast cell questions, the fibre questions and the fat
 * cell questions all belong to other chapters and are examined here through
 * toluidine blue, orcein, silver and Sudan. The concepts follow the stains
 * rather than the chapters, except where an existing concept already carries the
 * cell: `eosinophil-granule-contents-and-role-in-allergy`,
 * `mast-cell-lm-em-metachromasia`,
 * `monocyte-is-the-largest-leukocyte-and-becomes-the-macrophage`,
 * `golgi-apparatus-lm-appearance-and-position`,
 * `plasma-membrane-unit-membrane-em-and-thickness`,
 * `white-versus-brown-adipose-connective-tissue`,
 * `organelles-inclusions-and-the-membranous-classification` and my own
 * `rbc-shape-size-and-light-microscopic-appearance` are all repeated verbatim
 * with their own modulePaths, so that the merge is a no-op.
 *
 * `pericyte-and-undifferentiated-mesenchymal-cell` is minted here under the
 * modulePath of `Connective Tissue > Connective Tissue Cells` for one excluded
 * row, and is repeated verbatim in `connective-tissue-cells.ts`, which is where
 * it belongs.
 *
 * Eighteen answers are overridden and four of those go against a printed key.
 * Two are worth naming. `fat-cells-are-stained-with` is keyed to PAS: it shares
 * its four options word for word with `glycogen-granules-are-stained-with` on
 * the same page, and the answer column has been carried across — fat is Sudan
 * III and glycogen is Best's carmine and PAS. `peroxisomes-are-stained-by` is
 * keyed to alkaline phosphatase where the option list also offers a
 * histochemical stain for catalase, and catalase is the peroxisome's own enzyme
 * — the phosphatases are the lysosome's. That override disagrees with the
 * department book's microtechniques page, which lists acid and alkaline
 * phosphatase together as lysosomal enzyme stains and never says what
 * demonstrates a peroxisome; the book's own cytoplasm chapter gives the
 * peroxisome oxidases and catalase, and the two halves of the book are what the
 * override is reconciling. A reviewer should look at it.
 */
import type { McqLeafSeed } from '../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Microtechniques',
  modulePath: '101 ISK > Histology > Introduction > Microtechniques',
  articleId: 'ART-101-HIS-MICROTECHNIQUES',

  concepts: [
    {
      key: 'h-and-e-basophilia-and-acidophilia',
      label: 'Haematoxylin is a basic blue dye that binds acidic components, eosin an acidic pink dye that binds basic ones — so the nucleus is always blue and the cytoplasm may be either',
      definition:
        'Haematoxylin and eosin is the stain used in routine histological slides and the commonest staining system in histology. Haematoxylin is a basic blue dye and binds the acidic components of the cell, which are therefore called basophilic: the nucleus, rich in DNA and RNA, and the ribosomes, whether free or attached to the rough endoplasmic reticulum. Eosin is an acidic pink or red dye and binds basic structures, which are called acidophilic — most cytoplasm, and collagen. It follows that the nucleus is always basophilic while the cytoplasm may be either: a protein-forming cell with abundant rough endoplasmic reticulum and many ribosomes is basophilic, and a steroid-forming cell full of smooth endoplasmic reticulum is acidophilic.',
      objective:
        'Say which of the two dyes is basic and which acidic, what each binds, and predict the staining of a cell from what its cytoplasm contains.',
      pitfall:
        'Reading basophilic as "stained by a basic dye component". It means the opposite way round — a basophilic structure is acidic and takes the basic dye. Getting the direction wrong reverses every answer in the chapter at once.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Introduction > Microtechniques',
      type: 'structure_function_relationship',
      aliases: ['H&E', 'Haematoxylin', 'Eosin', 'Basophilic', 'Acidophilic'],
    },
    {
      key: 'tissue-processing-paraffin-celloidin-and-freezing',
      label: 'Paraffin is the commonest technique, celloidin the most perfect and freezing the most rapid — and only freezing keeps the enzymes and the fat',
      definition:
        'The department book teaches three ways of processing tissue for light microscopy, each with its own advantages and disadvantages. The paraffin technique is the most common: short preparation, serial sections, very thin sections and easy staining — but its xylol solvent dissolves fat out and its heat destroys enzymes, so it cannot show the chemical components of the cell. The celloidin technique is the most perfect: no heat, so fine detail and structure are preserved, and it suits large organs such as the eyeball and soft tissue such as brain — but preparation is long, the sections are thick, no serial sections are possible and they do not stain easily. The freezing technique is the most rapid, which is why it is used to diagnose a tumour during an operation, and because no heat and no solvent are used it preserves both the enzymes and the fat, so it is the technique the histochemical stains require — but its sections are thick, hard to cut, not serial and not easily stained.',
      objective:
        'Give the advantage each technique is named for, and say which technique a histochemical or a fat stain requires and why.',
      pitfall:
        'Giving the freezing technique the paraffin technique\'s advantages. It is fast, and that is all it is fast at: the sections are thick, not serial and hard to stain, and every question in these books offers those three as its distractors.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Introduction > Microtechniques',
      type: 'classification',
      aliases: ['Paraffin technique', 'Celloidin technique', 'Freezing technique', 'Frozen section'],
    },
    {
      key: 'pas-and-bests-carmine-show-carbohydrate',
      label: 'PAS and Best\'s carmine both show carbohydrate — glycogen, goblet cell mucus, the basement membrane and the cell coat',
      definition:
        'Carbohydrate is demonstrated by two histochemical stains. Periodic acid–Schiff — PAS — stains glycogen magenta red, and stains any other carbohydrate-rich structure too: the mucus of the goblet cell, the basement membrane, and the glycocalyx of the cell membrane. Best\'s carmine stains glycogen red and is specific to it. Both need a frozen section for glycogen, because glycogen is water-soluble and dissolves out of a paraffin section, leaving vacuoles where it was. The basement membrane is shown by silver as well as by PAS; neither is visible in a routine H&E section.',
      objective:
        'Name the two carbohydrate stains and what each demonstrates, and say which processing technique glycogen needs.',
      pitfall:
        'Answering "PAS" for fat. PAS is for carbohydrate and Sudan for fat, and the two are offered in the same option list in half the questions of this leaf — one printing of the fat question in these books is keyed to PAS in error.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Introduction > Microtechniques',
      type: 'structure_function_relationship',
      aliases: ['PAS', 'Periodic acid-Schiff', 'Best\'s carmine', 'Glycogen stain'],
    },
    {
      key: 'sudan-shows-fat-and-the-signet-ring-cell',
      label: 'Sudan III stains fat orange in a frozen section; in H&E the fat has dissolved and the cell is left as a signet ring',
      definition:
        'Fat is demonstrated by the fat stains, of which Sudan III is the type example, staining it orange; the section must be a frozen one, because the xylol of the paraffin technique dissolves the fat away. In a routine H&E section the fat has therefore gone, and a unilocular fat cell appears as an empty vacuole with the cytoplasm squeezed into a thin rim and the nucleus flattened against one side — the signet ring appearance. The unilocular cell holds one large droplet, does not divide, and is the cell of white adipose tissue, which stores fat; heat generation belongs to the multilocular cell of brown fat.',
      objective:
        'Name the fat stain and the technique it needs, and explain the signet ring appearance from what H&E does to fat.',
      pitfall:
        'Attributing the signet ring to a fat stain. It is what H&E leaves behind — a hole where the droplet was. A Sudan-stained fat cell is a solid orange ball and looks nothing like a ring.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Introduction > Microtechniques',
      type: 'structure_function_relationship',
      aliases: ['Sudan III', 'Fat stain', 'Signet ring appearance'],
    },
    {
      key: 'collagen-fibre-characters-and-its-stains',
      label: 'Collagen is acidophilic, forms branching bundles of non-branching fibres, and Mallory stains it blue while van Gieson stains it red',
      definition:
        'Collagen fibres are white in the fresh state when they are present in great numbers, which is why the tissues built of them are called white fibrous. In section they are acidophilic and stain pink with haematoxylin and eosin. They are wavy, and they run as branching bundles made up of individual fibres that do not themselves branch — the bundle divides, the fibre does not. Where collagen has to be told apart from the other fibres, a trichrome stain is used: Mallory\'s trichrome stains collagen blue, and van Gieson stains it red while leaving elastic fibres yellow.',
      objective:
        'Give the staining reaction of collagen in H&E, Mallory and van Gieson, and describe the branching of bundle against fibre.',
      pitfall:
        'Saying collagen fibres branch. The bundles branch and the fibres inside them do not — and the reverse is true of elastic fibres, which branch individually and form no bundles, so the two questions are set against each other.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Introduction > Microtechniques',
      type: 'structure_function_relationship',
      aliases: ['Mallory trichrome', 'Van Gieson', 'White fibres', 'Collagen staining'],
    },
    {
      key: 'elastic-fibre-characters-and-orcein',
      label: 'Elastic fibres are thin, branching and stretchable, stain brown with orcein and yellow with van Gieson, and are acidophilic in H&E',
      definition:
        'Elastic fibres are thin, stretchable and branching, and they run singly rather than in bundles. They are yellow in the fresh state when abundant, which is why ligamentum nuchae and the ligamenta flava are called yellow elastic tissue. They are acidophilic and poorly seen in a routine H&E section, and they are demonstrated by orcein, which stains them brown, and by van Gieson, which stains them yellow while colouring collagen red. They show no transverse striations — that is a feature of skeletal muscle, not of a fibre.',
      objective:
        'Give the physical characters of the elastic fibre and the colour it takes with orcein, van Gieson and H&E.',
      pitfall:
        'Calling elastic fibres basophilic. They are acidophilic like collagen; what makes them hard to see in H&E is that they are thin and take the eosin weakly, not that they take the haematoxylin.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Introduction > Microtechniques',
      type: 'structure_function_relationship',
      aliases: ['Orcein', 'Yellow elastic fibres', 'Elastin staining'],
    },
    {
      key: 'reticular-fibres-and-reticular-cells',
      label: 'Reticular fibres are branching, argyrophilic and PAS-positive, invisible in H&E, and the reticular cells that make them are modified fibroblasts of the organ stroma',
      definition:
        'Reticular fibres are fine, branching fibres of type III collagen that form a network rather than bundles. They are stained black by silver — argyrophilic — and are PAS-positive because of the carbohydrate on them; they are not demonstrable in a routine H&E section at all. They form the supporting stroma of the parenchymatous organs, and the reticular cells that produce them lie along them. A reticular cell is regarded as a modified fibroblast, is found mainly in the stroma of organs, and in the lymphoid organs and bone marrow has a phagocytic function; it is not demonstrated by iron haematoxylin, which is the centriole stain.',
      objective:
        'Give the stains that show a reticular fibre and the one that does not, and describe the reticular cell and where it lives.',
      pitfall:
        'Saying reticular fibres form bundles. They branch and anastomose into a mesh — which is why the tissue is named for a net — while it is collagen that bundles.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Introduction > Microtechniques',
      type: 'structure_function_relationship',
      aliases: ['Argyrophilic', 'Silver stain', 'Reticular cell', 'Reticular tissue'],
    },
    {
      key: 'vital-and-supravital-stains',
      label: 'A vital stain stains living cells inside the living animal, a supravital stain stains living cells outside the body',
      definition:
        'A vital stain is one given to a living animal, whose cells then take it up while alive: trypan blue and Indian ink are injected, and the macrophages phagocytose them, which is how the macrophage is demonstrated. A supravital stain works on living cells outside the body — brilliant cresyl blue added to a drop of fresh blood shows the reticulum of the reticulocyte, which is residual ribosomal RNA and disappears as the cell matures. The distinction is where the cell is when it is stained, not what the dye is.',
      objective:
        'Define vital and supravital staining, and give the cell each is used to demonstrate.',
      pitfall:
        'Treating supra- as "better". It means outside — supravital staining happens outside the living body, on cells that are still alive, and the two words differ by that single fact.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Introduction > Microtechniques',
      type: 'classification',
      aliases: ['Trypan blue', 'Indian ink', 'Brilliant cresyl blue', 'Supravital'],
    },
    {
      key: 'neutral-stain-leishman-and-the-blood-film',
      label: 'Leishman\'s stain is a neutral stain — an acidic and a basic dye together in methyl alcohol, which fixes the film as it stains it',
      definition:
        'A neutral stain is a mixture of an acidic and a basic dye, so that acidophilic and basophilic structures are shown in one preparation. Leishman\'s stain is the example the department book gives, and it is what blood films are stained with: acidic red eosin and basic blue methylene blue dissolved in methyl alcohol, which serves as the fixative. That is why a blood film needs no separate fixation step — it is air-dried and then flooded with the stain. The mixture is what lets one slide show the acidophilic granules of the eosinophil, the basophilic granules of the basophil and the acidophilic haemoglobin of the red cell at once.',
      objective:
        'Classify Leishman\'s stain, name its two dyes and its solvent, and say why a blood film needs no separate fixative.',
      pitfall:
        'Calling Leishman\'s a vital stain because it is used on blood. Vital and supravital describe living cells; a blood film is air-dried and dead before the stain reaches it, and the word for a mixture of two dyes is neutral.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Introduction > Microtechniques',
      type: 'structure_function_relationship',
      aliases: ['Leishman stain', 'Neutral stain', 'Blood film'],
    },
    {
      key: 'metachromatic-stain-toluidine-blue-and-heparin',
      label: 'A metachromatic stain gives a colour that is not its own — toluidine blue turns violet-magenta on the heparin of mast cell and basophil granules',
      definition:
        'A metachromatic stain is one that produces a colour different from the colour of the dye itself. Toluidine blue is the example: it is blue, and on the sulphated mucopolysaccharide granules of the mast cell and of the blood basophil it turns violet, purple or magenta red. The molecule responsible is heparin, which is why the same reaction identifies both cells and why no other connective tissue cell shows it — the plasma cell is basophilic but not metachromatic, the macrophage takes trypan blue, and the fat cell takes Sudan.',
      objective:
        'Define metachromasia, name the stain and the two cells it identifies, and give the granule component responsible.',
      pitfall:
        'Reading metachromasia as simply "stains strongly". The point is that the colour changes — a granule that goes purple in a blue dye is metachromatic, and one that merely goes a deeper blue is not.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Introduction > Microtechniques',
      type: 'structure_function_relationship',
      aliases: ['Toluidine blue', 'Metachromasia', 'Metachromatic granules'],
    },
    {
      key: 'special-stains-for-mitochondria-and-centrioles',
      label: 'Janus green shows mitochondria, iron haematoxylin shows centrioles, and silver shows the Golgi — each organelle has its own dye',
      definition:
        'Organelles too small or too pale for routine staining have their own dyes. Janus green B stains mitochondria, and it does so because it is a vital dye reduced by the respiratory enzymes of the living mitochondrion. Iron haematoxylin stains centrioles, which lie beside the nucleus and are otherwise invisible. Silver stains the Golgi apparatus as a network of brown granules and fibrils, and stains nerve cells and fibres brown and reticular fibres black. None of the three organelles is demonstrable in a routine haematoxylin and eosin section.',
      objective:
        'Match each of the three organelle stains to the organelle it shows.',
      pitfall:
        'Swapping Janus green and iron haematoxylin. Both are stains for a single small structure beside the nucleus, and the questions in these books offer them in the same option list every time; Janus is the green one and green goes with the mitochondrion.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Introduction > Microtechniques',
      type: 'classification',
      aliases: ['Janus green', 'Iron haematoxylin', 'Silver impregnation'],
    },
    {
      key: 'enzyme-histochemistry-acid-phosphatase-and-catalase',
      label: 'An enzyme is demonstrated by the reaction it catalyses — acid phosphatase marks the lysosome and catalase the peroxisome',
      definition:
        'Histochemical enzyme stains show an organelle by showing what its enzymes do, and they need a frozen section because heat and solvents destroy the enzyme. Acid phosphatase is the marker enzyme of the lysosome, and a histochemical reaction for it is the standard way of identifying a lysosome and of showing that a cell is phagocytic — it is how the macrophage is demonstrated histochemically. The peroxisome\'s own enzymes are the oxidases, which carry out beta-oxidation of long-chain fatty acids and generate hydrogen peroxide, and catalase, which destroys that peroxide; a reaction for catalase is therefore what marks a peroxisome.',
      objective:
        'Name the marker enzyme of the lysosome and of the peroxisome, and say why enzyme histochemistry needs a frozen section.',
      pitfall:
        'Giving the peroxisome a phosphatase. The phosphatases are the lysosome\'s; the peroxisome has oxidases and catalase, and the whole distinction between the two organelles is which enzymes they carry.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Introduction > Microtechniques',
      type: 'structure_function_relationship',
      aliases: ['Acid phosphatase', 'Alkaline phosphatase', 'Histochemical stain', 'Catalase'],
      conflicts: [
        'The department book\'s microtechniques page lists acid and alkaline phosphatase together as "lysosomal enzymes" demonstrated by enzyme stains, and says nothing about how a peroxisome is shown. Its cytoplasm chapter gives the peroxisome oxidases and catalase. The books ask which stain shows a peroxisome and one printing is keyed to alkaline phosphatase; catalase is what the book\'s own account of the organelle implies, and that is what is taught here.',
      ],
    },
    {
      key: 'pericyte-and-undifferentiated-mesenchymal-cell',
      label: 'The pericyte is an undifferentiated cell wrapped round a capillary with actin and myosin in it, able to contract and to become something else',
      definition:
        'Pericytes lie along the outside of capillaries and venules, sharing their basement membrane and wrapping the endothelium in long processes. They are small cells with a dark, heterochromatic nucleus and few organelles, which is the picture of an undifferentiated cell rather than a working one — and they are indeed undifferentiated, able to give rise to fibroblasts, to smooth muscle and to new endothelium after injury. They carry a network of actin and myosin filaments, so they are contractile and can narrow the capillary they sit on. The undifferentiated mesenchymal cell of connective tissue proper is the same kind of reserve cell away from a vessel wall.',
      objective:
        'Describe the pericyte\'s position, its nucleus and organelle content, and give the two things its actin–myosin network and its undifferentiated state allow it to do.',
      pitfall:
        'Reading "few organelles and a dark nucleus" as a dying cell. It is the signature of a resting, undifferentiated one — the same picture as the fibrocyte — and it is what makes the pericyte a reserve the tissue can call on.',
      subject: 'fnd',
      primary: 'DIS-HIS-T02',
      secondary: [],
      modulePath: '101 ISK > Histology > Connective Tissue > Connective Tissue Cells',
      type: 'structure_function_relationship',
      aliases: ['Pericyte', 'Undifferentiated mesenchymal cell', 'Perivascular cell'],
    },
    {
      key: 'golgi-apparatus-lm-appearance-and-position',
      label: 'The Golgi apparatus is invisible in H&E except as a pale negative image, and its position follows the direction the cell secretes',
      definition:
        'The Golgi apparatus is not seen in a haematoxylin and eosin section as a structure; what is seen is a pale unstained area beside the nucleus where the rest of the basophilic cytoplasm is interrupted — the negative Golgi image, most familiar in the plasma cell. It is demonstrated positively by silver, which shows it as a network of brown granules and fibrils. Its position tells what the cell is doing with its product: it lies apically, above the nucleus, in a secretory cell discharging at a free surface, and around the nucleus — perinuclear — in the nerve cell, which has no single secretory face.',
      objective: 'Recognise the negative Golgi image, name the stain that shows the Golgi positively, and give its position in a secretory cell and in a nerve cell.',
      pitfall: 'Expecting the pale supranuclear area to be empty. It is where the Golgi is; it looks pale because the Golgi takes neither dye, not because nothing is there.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Cytology > Cytoplasm',
      type: 'structural_description',
      aliases: ['Negative Golgi image', 'Golgi hof', 'Silver impregnation'],
    },
    {
      key: 'eosinophil-granule-contents-and-role-in-allergy',
      label: 'The eosinophil ends an allergic reaction with histaminase and sulphatase, and kills parasites with its granule protein',
      definition:
        'Eosinophils are 1–4% of the count, 10–14 µm, with a bilobed horse-shoe nucleus joined by a thick chromatin thread and large acidophilic specific granules. On electron microscopy the granule is oval with an electron-dense crystalloid core of basic protein. The cell terminates allergy by secreting histaminase and sulphatase, which destroy histamine and heparin, and by phagocytosing antigen–antibody complexes; it defends against parasites by the cytotoxic effect of its granule protein. Eosinophilia is above 5%, eosinopenia below 1%.',
      objective: 'Name the contents of the eosinophil granule and explain how each ends an allergic reaction or kills a parasite.',
      pitfall: 'Confusing histaminase with histamine. The eosinophil destroys histamine; the basophil releases it. A question naming histaminase, sulphatase and neurotoxin is naming the eosinophil, and the same question with histamine and heparin is naming the basophil.',
      subject: 'haem',
      primary: 'DIS-HIS-T02',
      secondary: ['SYS-HEM-T01-S01-M02'],
      modulePath: '101 ISK > Histology > Blood > Granular leukocytes',
      type: 'structure_function_relationship',
      aliases: ['Eosinophil granules', 'Acidophil', 'Eosinophilia'],
    },
    {
      key: 'mast-cell-lm-em-metachromasia',
      label: 'The mast cell and the plasma cell are both basophilic and share nothing else',
      definition:
        'The mast cell arises from the undifferentiated mesenchymal cell and lies in loose connective tissue around blood vessels and under the epithelium of the lung and digestive tube. It is a large oval cell, twenty to thirty micrometres, with a central spherical pale nucleus and cytoplasm full of basophilic granules that toluidine blue stains metachromatically purple or red. By electron microscopy it has a well developed Golgi, many mitochondria, few rough endoplasmic reticulum profiles and electron-dense membrane-bound granules.',
      objective: 'Give the origin, site and light-microscopic picture of the mast cell, and distinguish it from the plasma cell.',
      pitfall: 'Reading basophilia as one finding. The mast cell\'s basophilia is granular and metachromatic; the plasma cell\'s is diffuse cytoplasmic basophilia from rough endoplasmic reticulum and is not metachromatic at all.',
      subject: 'fnd',
      primary: 'DIS-HIS-T02',
      secondary: [],
      modulePath: '101 ISK > Histology > Connective Tissue > Connective Tissue Cells',
      type: 'structural_description',
      aliases: ['Mastocyte', 'Tissue basophil'],
    },
    {
      key: 'monocyte-is-the-largest-leukocyte-and-becomes-the-macrophage',
      label: 'The monocyte is the largest leukocyte and the precursor of every phagocytic cell of the tissues',
      definition:
        'The monocyte is 13–20 µm across, the largest of the white cells, with a large eccentric kidney-shaped pale nucleus and non-granular pale basophilic cytoplasm whose lysosomes give it a frosted-glass look. It spends about three days in the blood, then enters connective tissue and becomes the macrophage, living some three months. It is an antigen-presenting cell, and it is the precursor of all the phagocytic cells of the body — the dust cells of the lung, the Kupffer cells of the liver, the osteoclasts of bone and the microglia of the central nervous system.',
      objective: 'Identify the monocyte by size and nuclear shape and name the tissue cells it gives rise to.',
      pitfall: 'Calling the large lymphocyte the largest leukocyte. It reaches 10–15 µm; the monocyte reaches 20 µm, and it is the nuclear shape — kidney, not round — that settles it on a film.',
      subject: 'haem',
      primary: 'DIS-HIS-T02',
      secondary: ['SYS-HEM-T01-S01-M02'],
      modulePath: '101 ISK > Histology > Blood > Non granular leukocytes',
      type: 'structure_function_relationship',
    },
    {
      key: 'plasma-membrane-unit-membrane-em-and-thickness',
      label: 'The plasma membrane is a 7.5–10 nm trilaminar unit membrane, invisible in H&E and shown only by silver or PAS',
      definition:
        'The plasma membrane, or plasmalemma, is the limiting membrane that envelopes every cell, and it is 7.5–10 nm thick. On electron microscopy it is trilaminar — the unit membrane — two dark, electron-dense layers separated by an intermediate light, electron-lucent layer. On light microscopy it is not resolved with haematoxylin and eosin and has to be demonstrated with silver or with PAS, both of which act on the carbohydrate of its outer coat rather than on the membrane itself. The books set it against three other membranous terms: the glycocalyx is its own outer coat, cristae are the folds of the inner mitochondrial membrane, and cisternae are the sacs of the endoplasmic reticulum.',
      objective:
        'Give the thickness of the plasma membrane in the right unit, describe its trilaminar appearance on electron microscopy, and name the stains that show it by light microscopy.',
      pitfall:
        'Reading 7.5–10 in the wrong unit. Nanometres is the only order of magnitude that fits: micrometres would make the membrane thicker than most organelles, and angstroms would make it thinner than one lipid molecule.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Cytology > The cell',
      type: 'structural_description',
      aliases: ['Plasmalemma', 'Unit membrane', 'Trilaminar membrane'],
    },
    {
      key: 'white-versus-brown-adipose-connective-tissue',
      label: 'White adipose tissue is unilocular and stores fat; brown adipose tissue is multilocular and burns it for heat',
      definition:
        'White adipose connective tissue is made of unilocular fat cells and is white because it is poorly vascularised and its droplets hold carotenoids; it is affected by diet and by hormones, lies under the skin and around organs, and stores fat. Brown adipose connective tissue is made of multilocular fat cells and is brown from its richer blood supply and the cytochrome pigments of its many mitochondria; it is affected by hormones but not by diet, is abundant in fetal life and in the newborn, is lost during childhood and replaced by white fat, and performs thermogenesis — burning fat to release heat through the thermogenin of its mitochondria.',
      objective: 'Contrast white and brown adipose tissue by fat cell type, colour, age distribution and function.',
      pitfall: 'Attributing thermogenesis to white fat because it insulates. Insulating against heat loss and generating heat are different jobs and belong to different tissues.',
      subject: 'fnd',
      primary: 'DIS-HIS-T02',
      secondary: [],
      modulePath: '101 ISK > Histology > Connective Tissue > Types of Connective Tissue Proper',
      type: 'comparison',
    },
    {
      key: 'organelles-inclusions-and-the-membranous-classification',
      label: 'Organelles are living and essential, inclusions are not, and organelles divide into membranous and non-membranous',
      definition:
        'Cytoplasm is cytosol, organelles and inclusions. Organelles are living, permanent, essential and active, and have vital functions; inclusions are non-living, temporary, usually not essential and inert, and result from the cell\'s activity. Organelles are classified by whether they have a limiting membrane. The membranous ones are the plasma membrane, mitochondria, endoplasmic reticulum, Golgi apparatus, lysosomes and peroxisomes; the non-membranous ones are the ribosomes and the cytoskeleton, with the centrioles, cilia and flagella that the microtubules build. The inclusions are stored food — glycogen, which dissolves out of an H&E section leaving vacuoles and is shown by Best\'s carmine or PAS, and fat, vacuolated in H&E and orange with Sudan III — and pigments, endogenous (haemoglobin, melanin, lipofuscin) or exogenous (carbon and dust, carotene, tattoo dyes).',
      objective:
        'Separate organelles from inclusions by the five properties the book contrasts, sort the organelles into membranous and non-membranous, and name the inclusions and the stains that show them.',
      pitfall:
        'Calling a coated vesicle or a centriole an organelle of the wrong class. A coated vesicle is a piece of membrane and is membranous; a centriole is built of microtubules and has no membrane at all.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Cytology > Cytoplasm',
      type: 'classification',
      aliases: ['Cytoplasmic inclusions', 'Membranous organelles', 'Non-membranous organelles'],
    },
    {
      key: 'rbc-shape-size-and-light-microscopic-appearance',
      label: 'A red cell is a non-nucleated biconcave disc, 6–9 µm across, acidophilic with a pale centre one third of its diameter',
      definition:
        'Blood is a special connective tissue circulating in vessels, 45 per cent cells and 55 per cent plasma, and its formed elements are erythrocytes, leukocytes and thrombocytes. On a Leishman-stained film the red cell is rounded in top view and biconcave in side view, non-nucleated, and acidophilic — it takes the acidic eosin because haemoglobin is a basic protein — with a pale centre about a third of its diameter, which is what "normochromic" describes. It is 6–9 µm across, averaging 7.5 µm, and 2.2 µm thick at the edge against 0.8 µm at the centre. Abnormal shapes follow from a changed membrane or haemoglobin content: spherocytes, ovalocytes, sickle cells and pear-shaped poikilocytes, all more fragile and more easily haemolysed. Abnormal sizes are microcytes under 6 µm, macrocytes over 9 µm, and anisocytosis, several sizes in one film.',
      objective:
        'Describe a normal red cell on a stained film — shape in both views, size, staining and central pallor — and name the abnormalities of shape and size.',
      pitfall:
        'Reading the two views the wrong way round. The disc is rounded seen from above and biconcave seen edge-on; a red cell described as biconvex is a normal cell with its profile inverted, and it is offered in these books as a distractor more often than any other single error.',
      subject: 'haem',
      primary: 'DIS-HIS-T02',
      secondary: ['SYS-HEM-T01-S01-M02'],
      modulePath: '101 ISK > Histology > Blood > Red Blood Corpuscles',
      type: 'structural_description',
      aliases: ['Erythrocyte', 'Normochromic', 'Anisocytosis', 'Poikilocyte', 'Central pallor'],
    },
  ],

  questions: [
    {
      key: 'the-most-common-staining-system-in-the-histology-is-a8697490',
      conceptKey: 'h-and-e-basophilia-and-acidophilia',
      difficulty: 'Easy', questionType: 'Classification',
      learningObjective: 'Name the routine stain of histology.',
      answerOverride: 'C',
      answerOverrideReason: 'The books print no key. The department book states that haematoxylin and eosin is the stain most commonly used in routine histological slides.',
      explanations: {
        A: 'Silver is a special stain, for the Golgi apparatus, nerve tissue and reticular fibres. It is used when H&E has already failed to show something.',
        B: 'Orcein is a special stain for elastic fibres and nothing else.',
        C: 'Correct. Haematoxylin and eosin is the routine system — a basic blue dye and an acidic pink one, which between them colour nucleus and cytoplasm.',
        D: 'PAS is a histochemical stain for carbohydrate. Like the other three wrong answers it is a stain you reach for after the routine one.',
      },
    },
    {
      key: 'cytoplasm-of-ribosome-is-b531d7a0',
      conceptKey: 'h-and-e-basophilia-and-acidophilia',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Explain why ribosome-rich cytoplasm takes the blue dye.',
      explanations: {
        A: 'Acidophilic cytoplasm is what a cell full of smooth endoplasmic reticulum shows — a steroid-forming cell. Ribosomes give the opposite reaction.',
        B: 'Correct. Ribosomes are ribonucleoprotein, and their RNA is acidic, so they bind the basic haematoxylin and the cytoplasm is basophilic.',
        C: 'No special stain is needed: cytoplasmic basophilia is one of the things a routine H&E shows best.',
        D: '"None of the above" fails once B is true.',
      },
    },
    {
      key: 'the-suitable-technique-to-stain-the-glycogen-inside-the-cell-7334a397',
      conceptKey: 'tissue-processing-paraffin-celloidin-and-freezing',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Choose the processing technique a histochemical stain needs.',
      answerOverride: 'C',
      answerOverrideReason:
        'The books print no key. The department book states that histochemical stains, including PAS for glycogen, need the frozen technique, because the paraffin technique\'s solvent and heat destroy the chemical components of the cell.',
      explanations: {
        A: 'The paraffin technique uses xylol and heat, which is exactly what a histochemical stain cannot survive — the book says it cannot show the chemical components of the cell.',
        B: 'The celloidin technique avoids heat and gives the finest structural detail, but it is slow and its sections do not stain easily; it is chosen for structure, not for chemistry.',
        C: 'Correct. The freezing technique uses neither heat nor solvent, so the enzymes and the soluble constituents survive and the histochemical stains work.',
        D: 'The scanning electron microscope shows surfaces in three dimensions and applies no dye at all.',
      },
    },
    {
      key: 'freezing-technique-has-the-following-advantage-b5b7cb3c',
      conceptKey: 'tissue-processing-paraffin-celloidin-and-freezing',
      difficulty: 'Moderate', questionType: 'Classification',
      learningObjective: 'Give the one advantage the freezing technique has, and reject the paraffin technique\'s three.',
      answerOverride: 'A',
      answerOverrideReason:
        'The books print no key. The department book calls the freezing technique the most rapid method and lists thick sections, difficulty of cutting, absence of serial sections and poor staining among its disadvantages — so of the four options only speed is an advantage of it.',
      explanations: {
        A: 'Correct. It is the most rapid method, which is why a frozen section is what a surgeon waits for during an operation.',
        B: 'Serial sections are an advantage of the paraffin technique. The freezing technique cannot give them.',
        C: 'Very thin sections are again the paraffin technique. Frozen sections are thick and hard to cut.',
        D: 'Easy staining is the paraffin technique too. Three of the four options here are the advantages of the wrong method, which is the whole design of the question.',
      },
    },
    {
      key: 'the-following-inclusion-can-be-stained-with-best-s-carmine-933220f4',
      conceptKey: 'pas-and-bests-carmine-show-carbohydrate',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the inclusion Best\'s carmine is specific for.',
      explanations: {
        A: 'Haemoglobin is an endogenous pigment and is acidophilic — it needs no special stain, since it takes eosin in a routine section.',
        B: 'Correct. Best\'s carmine stains glycogen, and glycogen is the only thing it is used for.',
        C: 'Fat is shown by Sudan III, and only in a frozen section.',
        D: 'Carotene is an exogenous pigment, taken in with food; it is already coloured and is not demonstrated by a carbohydrate stain.',
      },
    },
    {
      key: 'carbohydrates-are-stained-red-with-5278c6fa',
      conceptKey: 'pas-and-bests-carmine-show-carbohydrate',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the carbohydrate stain among three organelle stains.',
      explanations: {
        A: 'Silver stains the Golgi apparatus brown and reticular fibres black — a metal impregnation, not a carbohydrate reaction.',
        B: 'Janus green B stains mitochondria, and it is green.',
        C: 'Iron haematoxylin stains centrioles and is blue-black.',
        D: 'Correct. Best\'s carmine stains carbohydrate — glycogen — red.',
      },
    },
    {
      key: 'glycogen-can-be-stained-by-the-following-edc769e1',
      conceptKey: 'pas-and-bests-carmine-show-carbohydrate',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Name both carbohydrate stains rather than stopping at one.',
      explanations: {
        A: 'H&E does not show glycogen at all — worse, the paraffin technique it accompanies dissolves the glycogen out, leaving vacuoles where it was.',
        B: 'True but incomplete. Best\'s carmine does stain glycogen.',
        C: 'True but incomplete. PAS stains glycogen magenta red.',
        D: 'Correct. Both Best\'s carmine and PAS demonstrate glycogen, and a student who stops at the first true option has given half the answer.',
      },
    },
    {
      key: 'glycogen-granules-are-stained-with-760dabb7',
      conceptKey: 'pas-and-bests-carmine-show-carbohydrate',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Name both carbohydrate stains rather than stopping at one.',
      answerOverride: 'D',
      answerOverrideReason:
        'The books key this to A, Best\'s carmine alone. PAS stains glycogen too — the companion question `glycogen-can-be-stained-by-the-following-edc769e1` is keyed to the option naming both — so with "both a & b" on the list, A is incomplete and D is the answer.',
      explanations: {
        A: 'True but incomplete, and the option the books key this question to. Best\'s carmine does stain glycogen, but so does the next option.',
        B: 'True but incomplete. PAS stains glycogen magenta red.',
        C: 'Sudan III is for fat, not for carbohydrate. It is the one option here that is simply wrong.',
        D: 'Correct. Both Best\'s carmine and PAS stain glycogen.',
      },
    },
    {
      key: 'in-light-microscopy-the-basement-membrane-is-stained-with-67deda39',
      conceptKey: 'pas-and-bests-carmine-show-carbohydrate',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the stain that shows the basement membrane.',
      explanations: {
        A: 'Sudan III shows fat. There is no fat in a basement membrane.',
        B: 'Haematoxylin alone would show the nuclei of the epithelium above it and leave the membrane invisible.',
        C: 'Eosin colours the cytoplasm and collagen pink and does not resolve the basement membrane as a separate structure.',
        D: 'Correct. The basement membrane is carbohydrate-rich and is PAS-positive; silver will also blacken it.',
      },
    },
    {
      key: 'the-basement-membrane-can-be-stained-by-0f26b009',
      conceptKey: 'pas-and-bests-carmine-show-carbohydrate',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Name both stains that show the basement membrane.',
      explanations: {
        A: 'Trypan blue is a vital stain taken up by macrophages in the living animal. It has nothing to do with a basement membrane.',
        B: 'True but incomplete. Silver blackens the basement membrane, as it blackens reticular fibres — the two are chemically alike.',
        C: 'True but incomplete. PAS stains it for its carbohydrate.',
        D: 'Correct. Silver and PAS both demonstrate the basement membrane.',
      },
    },
    {
      key: 'fat-cells-are-stained-with-8f1f1a6a',
      conceptKey: 'sudan-shows-fat-and-the-signet-ring-cell',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Keep the fat stain apart from the two carbohydrate stains.',
      answerOverride: 'C',
      answerOverrideReason:
        'The books key this to PAS. PAS is a carbohydrate stain; fat is demonstrated by Sudan III, option C. This question shares its four options word for word with `glycogen-granules-are-stained-with-760dabb7` on the same page, and the answer column appears to have been carried across from one to the other — which is why the glycogen answer has been printed against the fat question.',
      explanations: {
        A: 'Best\'s carmine is specific for glycogen. It is the answer to the neighbouring question, not to this one.',
        B: 'PAS demonstrates carbohydrate — glycogen, mucus, basement membrane. It is the option the books key this question to, and it is the other carbohydrate stain.',
        C: 'Correct. Sudan III stains fat orange, in a frozen section.',
        D: '"Both a & b" collects the two carbohydrate stains, which is the right answer to the glycogen version of this question and the wrong one here.',
      },
    },
    {
      key: 'fat-cells-can-be-stained-by-c3fbaf71',
      conceptKey: 'sudan-shows-fat-and-the-signet-ring-cell',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Pick the fat stain out of a list of cell-specific stains.',
      explanations: {
        A: 'A metachromatic stain — toluidine blue — identifies the mast cell by its heparin.',
        B: 'A histochemical stain shows an enzyme; acid phosphatase identifies the lysosome and so the macrophage.',
        C: 'Trypan blue is the vital stain the macrophage takes up. These four options are one stain per cell, and this is the macrophage\'s.',
        D: 'Correct. Sudan III is the fat cell\'s stain.',
      },
    },
    {
      key: 'which-of-the-following-would-be-best-suited-to-visualize-lip-5681589f',
      conceptKey: 'sudan-shows-fat-and-the-signet-ring-cell',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Choose the stain for lipid.',
      explanations: {
        A: 'Orcein is for elastic fibres, which it stains brown.',
        B: 'H&E dissolves the lipid away with its solvents and leaves an empty vacuole, which is a clue to fat but not a demonstration of it.',
        C: 'Correct. Sudan III stains lipid orange in a frozen section.',
        D: 'Silver blackens reticular fibres and browns the Golgi and nerve tissue.',
      },
    },
    {
      key: 'signet-ring-appearance-is-a-descriptive-term-for-the-d9aa199c',
      conceptKey: 'sudan-shows-fat-and-the-signet-ring-cell',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Attribute the signet ring to what H&E removes rather than to what a stain adds.',
      explanations: {
        A: 'A Sudan-stained fat cell is a solid orange ball. The droplet is there and coloured, so there is no ring.',
        B: 'Sudan black colours the same droplet black. Again a filled cell, not a ring.',
        C: 'Correct. In H&E the fat has been dissolved out, leaving an empty space with a thin rim of cytoplasm and the nucleus flattened against one side — the signet and its ring.',
        D: 'Toluidine blue shows the mast cell metachromatically and does nothing to fat.',
      },
    },
    {
      key: 'lipids-e76d0a4d',
      conceptKey: 'sudan-shows-fat-and-the-signet-ring-cell',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Reject three plausible statements about where lipid is stored and how it is shown.',
      answerOverride: 'D',
      answerOverrideReason:
        'The books print no key. Lipid inclusions are stored chiefly in fat cells, not in muscle or liver cells; and lipid is shown by Sudan, not by PAS, which is a carbohydrate stain. None of the first three options is true, so the answer is D.',
      explanations: {
        A: 'Muscle cells store glycogen as their fuel reserve, not fat. Fat is stored in the adipocyte.',
        B: 'PAS demonstrates carbohydrate. Confusing it with Sudan is the standard error of this chapter.',
        C: 'The liver stores glycogen too, and it accumulates fat only in disease. The cell whose whole business is storing fat is the adipocyte.',
        D: 'Correct. None of the three is true.',
      },
    },
    {
      key: 'concerning-unilocular-adipocytes-they-1051d1be',
      conceptKey: 'white-versus-brown-adipose-connective-tissue',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Separate the unilocular from the multilocular fat cell.',
      answerOverride: 'A',
      answerOverrideReason:
        'The books print no key for either printing. Only A is true of a unilocular cell: it is stained by Sudan III like all fat. Heat generation and small droplets belong to the multilocular cell of brown fat, and a mature fat cell does not divide.',
      explanations: {
        A: 'Correct. Sudan III stains the fat of a unilocular cell orange, as it does any lipid.',
        B: 'Heat generation is what brown, multilocular fat does, through the thermogenin of its many mitochondria. White fat insulates, which is not the same thing.',
        C: 'Unilocular means one locule — a single large droplet filling the cell. Small droplets are what makes a cell multilocular, and the word in the stem rules the option out.',
        D: 'A mature fat cell is filled by its droplet and does not divide; new fat cells come from undifferentiated mesenchymal cells.',
      },
    },
    {
      key: 'by-mallory-stain-collagen-fibers-are-stained-1107ffdd',
      conceptKey: 'collagen-fibre-characters-and-its-stains',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Give the colour collagen takes with Mallory\'s trichrome.',
      explanations: {
        A: 'Pink is collagen in H&E, from the eosin. Mallory is used precisely because it gives a different colour and so separates collagen from everything else.',
        B: 'Correct. Mallory\'s trichrome stains collagen blue.',
        C: 'Brown is orcein on elastic fibres, or silver on nerve tissue and the Golgi.',
        D: 'Red is collagen with van Gieson — the other trichrome, and the one whose colours are the reverse way round.',
      },
    },
    {
      key: 'which-of-the-following-would-be-best-suited-to-differentiate-2ceebe5f',
      conceptKey: 'collagen-fibre-characters-and-its-stains',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Choose the stain that separates collagen from the other fibres.',
      explanations: {
        A: 'Correct. Mallory\'s trichrome colours collagen blue while leaving the other elements different colours, which is what "differentiate" asks for.',
        B: 'H&E stains collagen pink — and stains most cytoplasm pink as well, so it distinguishes nothing.',
        C: 'Sudan is for fat and shows no fibre at all.',
        D: 'Silver blackens reticular fibres. It differentiates those, not collagen — and reticular fibres are themselves collagen type III, which is what makes the option tempting.',
      },
    },
    {
      key: 'a-young-boy-with-unhealed-leg-wound-was-diagnosed-as-vitamin-bbc6ae4f',
      conceptKey: 'collagen-fibre-characters-and-its-stains',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Choose the stain that would show the fibre a scurvy case has failed to build.',
      answerOverride: 'B',
      answerOverrideReason:
        'Neither printing of this question carries a key. The stem asks for the best stain to distinguish collagen from other fibres, which is the trichrome — Mallory\'s, option B — and the parallel question `which-of-the-following-would-be-best-suited-to-differentiate-2ceebe5f` is keyed to exactly that.',
      explanations: {
        A: 'H&E colours collagen pink and cytoplasm pink with it, so it cannot separate the fibre from its surroundings — which is the whole demand of the stem.',
        B: 'Correct. Mallory\'s trichrome stains collagen blue against a differently coloured background, which is what makes a defect in it visible.',
        C: 'Sudan shows fat. Vitamin C deficiency is a collagen disease and fat is not involved.',
        D: 'Silver shows reticular fibres. They are type III collagen and would be affected too, but the stem asks for the stain that separates collagen from *other* fibres, and silver picks out the reticular ones instead.',
      },
    },
    {
      key: 'collagen-fibers-have-the-following-characters-except-c8113330',
      conceptKey: 'collagen-fibre-characters-and-its-stains',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Recall that a collagen fibre does not branch even though its bundle does.',
      explanations: {
        A: 'True, so not the exception. In quantity, unstained collagen is white — hence white fibrous tissue.',
        B: 'True, so not the exception. Collagen is acidophilic.',
        C: 'True, so not the exception, and the same fact as B in the language of the slide.',
        D: 'The exception, and the answer. The bundles branch; the individual fibres within them do not. Branching fibres are elastic fibres and reticular fibres, which is what makes this the trap.',
      },
    },
    {
      key: 'concerning-collagen-fibers-7652b65d',
      conceptKey: 'collagen-fibre-characters-and-its-stains',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'State the branching pattern of collagen precisely.',
      answerOverride: 'A',
      answerOverrideReason:
        'The books print no key. Only A is true: collagen forms wavy branching bundles made of fibres that do not branch. Collagen is acidophilic rather than basophilic, it is inextensible rather than elastic, and van Gieson stains it red — yellow is what van Gieson does to elastic fibres.',
      explanations: {
        A: 'Correct, and worth reading twice: the bundle branches, the fibre does not, and the option says both.',
        B: 'Collagen is acidophilic — it takes eosin and stains pink. Basophilia belongs to the nucleus and to ribosome-rich cytoplasm.',
        C: 'Collagen is strong and barely stretches; elasticity is the elastic fibre\'s property, and the two fibres are defined against each other.',
        D: 'Van Gieson stains collagen red and elastic fibres yellow. The option has the two colours swapped, which is exactly the confusion the stain exists to prevent.',
      },
    },
    {
      key: 'elastic-fibers-can-be-stained-brown-by-3f14dea9',
      conceptKey: 'elastic-fibre-characters-and-orcein',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the elastic fibre stain.',
      explanations: {
        A: 'Correct. Orcein stains elastic fibres brown.',
        B: 'Van Gieson also shows elastic fibres, but yellow, and it is used to contrast them with the red collagen.',
        C: 'Mallory stains collagen blue.',
        D: 'Eosin is half of the routine stain and shows elastic fibres only faintly, as pale acidophilic threads.',
      },
    },
    {
      key: 'what-color-do-elastic-fibers-stain-with-van-gieson-stain-26a8714b',
      conceptKey: 'elastic-fibre-characters-and-orcein',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Give the colour van Gieson gives to elastic fibres, against the colour it gives collagen.',
      explanations: {
        A: 'Red or orange is closer to what van Gieson does to collagen, and orange is Sudan on fat.',
        B: 'Pink or red is collagen — in H&E and in van Gieson alike. This option is the other fibre\'s answer.',
        C: 'Purple or red is metachromasia, what toluidine blue does to mast cell granules.',
        D: 'Correct. Van Gieson stains elastic fibres yellow, which is why the tissue built of them is called yellow elastic tissue.',
      },
    },
    {
      key: 'yellow-elastic-fibers-are-stained-fa279de3',
      conceptKey: 'elastic-fibre-characters-and-orcein',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Give both stains that demonstrate elastic fibres.',
      explanations: {
        A: 'True but incomplete. Orcein stains them brown.',
        B: 'True but incomplete. Van Gieson stains them yellow.',
        C: 'PAS gives magenta red on carbohydrate. Elastic fibres are protein, and PAS shows them nothing.',
        D: 'Correct. Orcein and van Gieson both demonstrate elastic fibres, in different colours.',
      },
    },
    {
      key: 'elastic-fibers-are-characterized-by-being-df60ef40',
      conceptKey: 'elastic-fibre-characters-and-orcein',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Pick the true statement about elastic fibres from three that belong to collagen or to muscle.',
      explanations: {
        A: 'Arrangement into bundles is collagen. Elastic fibres run singly and branch to form networks.',
        B: 'Correct. Orcein stains them brown, and it is the stain the book names for them.',
        C: 'They are poorly demonstrated in H&E, but not undemonstrable — they show as faint acidophilic threads, so the absolute statement is too strong.',
        D: 'Transverse striations belong to skeletal and cardiac muscle fibres. The word "fibre" carries two meanings in histology, and this option trades on the other one.',
      },
    },
    {
      key: 'all-of-the-following-are-true-about-yellow-elastic-fibers-ex-e01e5f53',
      conceptKey: 'elastic-fibre-characters-and-orcein',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Recall that elastic fibres are acidophilic, not basophilic.',
      explanations: {
        A: 'True, so not the exception. Thin and stretchable is what they are for.',
        B: 'True, so not the exception. They branch, which is how they form a network.',
        C: 'True, so not the exception. Orcein is their stain.',
        D: 'The exception, and the answer. Elastic fibres are acidophilic. Nothing extracellular in connective tissue is deeply basophilic except the metachromatic granules of the mast cell, which are inside a cell.',
      },
    },
    {
      key: 'reticular-fibers-have-the-following-characters-except-6d542c4a',
      conceptKey: 'reticular-fibres-and-reticular-cells',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Recall that reticular fibres branch — that is what makes them a reticulum.',
      explanations: {
        A: 'True, so not the exception. Silver blackens them, which is what argyrophilic means.',
        B: 'True, so not the exception. They are PAS-positive because of the carbohydrate on them.',
        C: 'True, so not the exception. They form the stroma of the parenchymatous organs.',
        D: 'The exception, and the answer. They branch and anastomose into a net, which is where the name comes from. Unbranched fibres are collagen.',
      },
    },
    {
      key: 'reticular-fibers-can-be-stained-by-the-following-except-b899b4e9',
      conceptKey: 'reticular-fibres-and-reticular-cells',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Name the stain that does not show reticular fibres.',
      explanations: {
        A: 'Silver does stain them, black, so it is not the exception.',
        B: 'The exception, and the answer. Reticular fibres are not demonstrable in a routine H&E section at all — they are too fine and take neither dye appreciably.',
        C: 'PAS does stain them, so it is not the exception.',
        D: '"Both b & c" would make PAS an exception too, and PAS works. Half of a wrong pair is still wrong.',
      },
    },
    {
      key: 'which-of-the-following-would-be-best-suited-to-visualize-ret-61151fde',
      conceptKey: 'reticular-fibres-and-reticular-cells',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Choose the stain for reticular fibres.',
      explanations: {
        A: 'Mallory\'s trichrome is the collagen stain, and reticular fibres are too fine for it to pick out.',
        B: 'H&E does not show them at all.',
        C: 'Sudan is for fat.',
        D: 'Correct. Silver blackens reticular fibres, which is why they are called argyrophilic.',
      },
    },
    {
      key: 'concerning-the-reticular-connective-tissue-7270b748',
      conceptKey: 'reticular-fibres-and-reticular-cells',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'State how reticular fibres are demonstrated and reject the bundle description.',
      answerOverride: 'B',
      answerOverrideReason:
        'The books print no key. Only B is true: reticular fibres are demonstrated by silver. They form a branching network rather than bundles, they support rather than bind, and they are not visible in H&E.',
      explanations: {
        A: 'Bundles are collagen. Reticular fibres branch and anastomose into a mesh, which is the property their name records.',
        B: 'Correct. Silver blackens them; without it they cannot be seen.',
        C: 'Binding structures together is the job of loose areolar and of dense connective tissue. Reticular tissue supports the cells of an organ from within.',
        D: 'They are not visible in H&E, which is exactly why silver is needed.',
      },
    },
    {
      key: 'concerning-the-reticular-cells-the-followings-are-true-excep-bc90693e',
      conceptKey: 'reticular-fibres-and-reticular-cells',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Keep the centriole stain away from the reticular cell.',
      explanations: {
        A: 'True, so not the exception. Reticular cells lie in the stroma of organs, along the fibres they make.',
        B: 'True, so not the exception. The reticular cell is regarded as a modified fibroblast — it makes fibres.',
        C: 'The exception, and the answer. Iron haematoxylin is the centriole stain. The reticular *fibre* is shown by silver, and swapping the cell\'s stain for an organelle stain is the error the question is built on.',
        D: 'True, so not the exception. In lymphoid organs and marrow the reticular cell has a phagocytic function.',
      },
    },
    {
      key: 'staining-of-the-macrophage-with-trypan-blue-is-an-example-of-58b869d4',
      conceptKey: 'vital-and-supravital-stains',
      difficulty: 'Easy', questionType: 'Classification',
      learningObjective: 'Classify trypan blue staining of a macrophage.',
      explanations: {
        A: 'Correct. Trypan blue is injected into the living animal and the macrophage phagocytoses it there — staining of living cells inside the living body is vital staining.',
        B: 'Supravital staining is of living cells outside the body, as with the reticulocyte.',
        C: 'A fluorescent stain is read under ultraviolet light and is a different technique entirely.',
        D: 'A histochemical stain demonstrates a chemical or an enzyme. The macrophage can also be shown that way — by acid phosphatase — but that is not what trypan blue does.',
      },
    },
    {
      key: 'macrophages-can-be-stained-by-e506ff16',
      conceptKey: 'vital-and-supravital-stains',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Pick the macrophage\'s stain from a list of one stain per cell.',
      explanations: {
        A: 'A metachromatic stain identifies the mast cell.',
        B: 'A histochemical stain for acid phosphatase does show the macrophage\'s lysosomes — but the option names the class without the reaction, and the stain the question is after is the one that is characteristic.',
        C: 'Correct. Trypan blue is taken up by the macrophage, which is what makes it the classic demonstration of phagocytosis in the living animal.',
        D: 'Sudan III is the fat cell\'s stain.',
      },
    },
    {
      key: 'reticulocytes-could-be-demonstrated-by-eb32930e',
      conceptKey: 'vital-and-supravital-stains',
      difficulty: 'Moderate', questionType: 'Classification',
      learningObjective: 'Classify the stain that shows a reticulocyte.',
      explanations: {
        A: 'A vital stain works inside the living animal. Blood is taken out before a reticulocyte count is made.',
        B: 'Correct. Brilliant cresyl blue on a fresh drop of blood is supravital staining — living cells outside the body — and it shows the reticulum of residual RNA.',
        C: 'Toluidine blue is the metachromatic stain for mast cells and basophils.',
        D: 'Metachromatic is what toluidine blue is; the reticulocyte reticulum is stained the dye\'s own colour, so nothing metachromatic happens.',
      },
    },
    {
      key: 'lishman-stain-is-1f2148f4',
      conceptKey: 'neutral-stain-leishman-and-the-blood-film',
      difficulty: 'Easy', questionType: 'Classification',
      learningObjective: 'Classify Leishman\'s stain.',
      explanations: {
        A: 'Correct. It is a neutral stain — an acidic and a basic dye mixed, so both acidophilic and basophilic structures appear on one film.',
        B: 'A vital stain acts in the living animal; a blood film is dried before it is stained.',
        C: 'A supravital stain acts on living cells outside the body, as brilliant cresyl blue does on reticulocytes.',
        D: 'A metachromatic stain gives a colour other than its own. Leishman\'s gives each component the colour of whichever of its two dyes it binds.',
      },
    },
    {
      key: 'stain-used-for-blood-film-bc6afbe9',
      conceptKey: 'neutral-stain-leishman-and-the-blood-film',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the stain a blood film is made with.',
      explanations: {
        A: 'Eosin alone would show the acidophilic elements — haemoglobin and eosinophil granules — and leave the nuclei invisible.',
        B: 'Correct. Leishman\'s stain, a mixture of eosin and methylene blue in methyl alcohol.',
        C: 'Methylene blue alone is the other half of the mixture and would show only the basophilic elements.',
        D: 'Haematoxylin is the routine section stain and is not used for films.',
      },
    },
    {
      key: 'staining-of-blood-film-is-done-by-5ab7e292',
      conceptKey: 'neutral-stain-leishman-and-the-blood-film',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the blood film stain among three special stains.',
      explanations: {
        A: 'Orcein is for elastic fibres.',
        B: 'Silver is for the Golgi, nerve tissue and reticular fibres.',
        C: 'H&E is the routine stain for sections, not for films.',
        D: 'Correct. Leishman\'s stain.',
      },
    },
    {
      key: 'fixative-material-that-used-in-blood-film-108f04be',
      conceptKey: 'neutral-stain-leishman-and-the-blood-film',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Name the fixative in Leishman\'s stain.',
      explanations: {
        A: 'Correct. The dyes are dissolved in methyl alcohol, which fixes the film as the stain is applied — which is why no separate fixation step is needed.',
        B: 'Eosin is one of the two dyes, not the solvent.',
        C: 'Ethylene glycol is an antifreeze and has no place in a histology laboratory.',
        D: 'Glycerin is a mountant, used to hold a coverslip, not a fixative.',
      },
    },
    {
      key: 'after-staining-the-c-t-with-toludin-blue-the-cells-which-hav-a2f2ac30',
      conceptKey: 'metachromatic-stain-toluidine-blue-and-heparin',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Identify the connective tissue cell that stains metachromatically.',
      explanations: {
        A: 'The plasma cell is deeply basophilic, but diffusely and in the dye\'s own blue — its basophilia comes from rough endoplasmic reticulum, not from sulphated granules.',
        B: 'Correct. Magenta granules in a blue dye is metachromasia, and in connective tissue it identifies the mast cell.',
        C: 'Phagocytic cells — macrophages — are shown by trypan blue in the living animal or by acid phosphatase histochemically.',
        D: 'Endothelial cells are flat and unremarkable in H&E and have no metachromatic granules.',
      },
    },
    {
      key: 'mast-cells-can-be-stained-by-3e5ca4af',
      conceptKey: 'metachromatic-stain-toluidine-blue-and-heparin',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Pick the mast cell\'s stain from a list of one stain per cell.',
      explanations: {
        A: 'Correct. A metachromatic stain — toluidine blue — turns the mast cell\'s granules purple or magenta.',
        B: 'A histochemical stain for acid phosphatase identifies the macrophage.',
        C: 'Trypan blue is the macrophage\'s vital stain.',
        D: 'Sudan III is the fat cell\'s. These four options recur through this leaf as a set, one stain per connective tissue cell.',
      },
    },
    {
      key: 'basophils-stained-by-toluidine-blue-metachromatic-due-to-046ab3ff',
      conceptKey: 'metachromatic-stain-toluidine-blue-and-heparin',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Name the granule component that produces metachromasia.',
      explanations: {
        A: 'Histamine is in the same granule and produces the vasodilatation of anaphylaxis, but it is not what changes the colour of the dye.',
        B: 'Correct. Heparin, a sulphated mucopolysaccharide, is what makes the granules metachromatic.',
        C: 'Sulphate is the chemical group that does the work, but it is a part of the heparin molecule rather than a granule constituent in its own right — the book names heparin.',
        D: 'Collagenase is in the neutrophil\'s specific granules and has nothing to do with staining.',
      },
    },
    {
      key: 'about-mast-cell-all-are-true-except-f4dafeec',
      conceptKey: 'mast-cell-lm-em-metachromasia',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Give the immunoglobulin the mast cell carries receptors for.',
      explanations: {
        A: 'True, so not the exception. The granules are basophilic in H&E.',
        B: 'True, so not the exception. IgE receptors on the surface are what let an allergen trigger the cell.',
        C: 'The exception, and the answer. IgA is the immunoglobulin of secretions — saliva, tears, milk — and no mast cell carries a receptor for it. One letter apart from the true statement above it.',
        D: 'True, so not the exception. Toluidine blue turns the granules purple, which is metachromasia.',
      },
    },
    {
      key: 'both-mast-cells-basophilis-share-all-of-the-following-except-bbc3ee7a',
      conceptKey: 'mast-cell-lm-em-metachromasia',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Name the property that separates the mast cell from the basophil.',
      explanations: {
        A: 'Shared, so not the exception. Both carry IgE receptors, which is why both are triggered by allergen.',
        B: 'The exception, and the answer. Phagocytic ability is one of the four points on which the department book separates the two cells, along with life span, size and nuclear shape.',
        C: 'Shared, so not the exception. Both have heparin-rich granules that toluidine blue stains metachromatically.',
        D: 'Shared, so not the exception. Both secrete eosinophil chemotactic factor, which brings in the cell that will end the reaction.',
      },
    },
    {
      key: 'concerning-mast-cells-433dd658',
      conceptKey: 'mast-cell-lm-em-metachromasia',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Pick the mast cell\'s property from three that belong to its neighbours.',
      answerOverride: 'C',
      answerOverrideReason:
        'The books print no key. Only C is true of the mast cell. Antibody formation is the plasma cell, histaminase is the eosinophil, and trypan blue demonstrates the macrophage.',
      explanations: {
        A: 'Antibody is made by the plasma cell. The two cells share a deep basophilia in H&E and nothing else, which is why they are so often set against each other.',
        B: 'Histaminase is secreted by the eosinophil, and it destroys the histamine the mast cell releases. The two cells are on opposite sides of the same reaction.',
        C: 'Correct. The granules are metachromatic with toluidine blue, from their heparin.',
        D: 'Trypan blue is taken up by phagocytes — the macrophage. The mast cell does not phagocytose, which is one of the points that separates it from the basophil.',
      },
    },
    {
      key: 'about-macrophages-all-are-true-except-06f23028',
      conceptKey: 'monocyte-is-the-largest-leukocyte-and-becomes-the-macrophage',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Trace the macrophage to the monocyte rather than to a lymphocyte.',
      explanations: {
        A: 'True, so not the exception. The macrophage presents antigen to the helper T cell, which is how both immune responses begin.',
        B: 'The exception, and the answer. The macrophage comes from the monocyte. It is the *plasma* cell that comes from the B lymphocyte, and the two answers are traded here.',
        C: 'True, so not the exception. Trypan blue injected into a living animal is taken up by macrophages — the classic vital stain demonstration.',
        D: 'True, so not the exception. Acid phosphatase histochemistry shows its lysosomes and so identifies it as a phagocyte.',
      },
    },
    {
      key: 'mitochondria-can-be-stained-by-647ed7cf',
      conceptKey: 'special-stains-for-mitochondria-and-centrioles',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the mitochondrial stain.',
      explanations: {
        A: 'Correct. Janus green B stains mitochondria — it is reduced by their respiratory enzymes, so only living mitochondria take it.',
        B: 'Van Gieson is a connective tissue trichrome: collagen red, elastic yellow.',
        C: 'H&E shows mitochondria only as a general cytoplasmic acidophilia in cells that have many of them; it does not resolve them.',
        D: 'Orcein stains elastic fibres brown.',
      },
    },
    {
      key: 'mitochondria-can-be-stained-with-8dc54379',
      conceptKey: 'special-stains-for-mitochondria-and-centrioles',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the mitochondrial stain among three stains for other things.',
      answerOverride: 'B',
      answerOverrideReason:
        'The books key this to Sudan III, which is the fat stain. Janus green is the mitochondrial stain, and the parallel question `mitochondria-can-be-stained-by-647ed7cf` is keyed to it. Set to B.',
      explanations: {
        A: 'Best\'s carmine stains glycogen.',
        B: 'Correct. Janus green B is the mitochondrial stain.',
        C: 'Sudan III stains fat, and it is the option the books key this question to.',
        D: 'Leishman\'s stain is for blood films.',
      },
    },
    {
      key: 'stain-used-for-centriole-e56e9242',
      conceptKey: 'special-stains-for-mitochondria-and-centrioles',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Name the centriole stain.',
      explanations: {
        A: 'Correct. Iron haematoxylin demonstrates the centrioles, which lie beside the nucleus and are otherwise invisible by light microscopy.',
        B: 'Janus green is for mitochondria. The two are the pair of organelle stains this leaf keeps setting against each other.',
        C: 'Silver shows the Golgi apparatus, nerve tissue and reticular fibres.',
        D: 'PAS shows carbohydrate.',
      },
    },
    {
      key: 'lysosomes-are-stained-by-d73a1b30',
      conceptKey: 'enzyme-histochemistry-acid-phosphatase-and-catalase',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Name the marker enzyme of the lysosome.',
      explanations: {
        A: 'H&E cannot resolve a lysosome; it is a small membranous vesicle with no distinctive dye affinity.',
        B: 'A metachromatic stain shows sulphated mucopolysaccharide — mast cell granules, not lysosomes.',
        C: 'Correct. Acid phosphatase is the lysosome\'s marker enzyme, and a histochemical reaction for it identifies both the organelle and the cells rich in it.',
        D: 'Alkaline phosphatase works at an alkaline pH. The lysosome\'s interior is acid, which is the point of the word "acid" in the answer.',
      },
    },
    {
      key: 'peroxisomes-are-stained-by-898f81f2',
      conceptKey: 'enzyme-histochemistry-acid-phosphatase-and-catalase',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Identify the peroxisome by the enzyme only it has.',
      answerOverride: 'B',
      answerOverrideReason:
        'The books key this to alkaline phosphatase. The department book\'s cytoplasm chapter gives the peroxisome oxidases and catalase and gives the phosphatases to the lysosome, so a histochemical reaction for catalase — option B — is what identifies a peroxisome. The book\'s microtechniques page lists acid and alkaline phosphatase together as lysosomal enzyme stains and says nothing about peroxisomes, so the two halves of the book have to be read together; this override reconciles them and a reviewer should confirm it.',
      explanations: {
        A: 'A metachromatic stain shows sulphated mucopolysaccharide — mast cell and basophil granules. No organelle of this kind is metachromatic.',
        B: 'Correct. Catalase is the peroxisome\'s own enzyme, the one that destroys the hydrogen peroxide its oxidases generate, and a reaction for catalase marks the organelle.',
        C: 'Acid phosphatase is the lysosome\'s marker. Confusing the two organelles is exactly what this question tests, since both are single-membrane vesicles of similar size.',
        D: 'Alkaline phosphatase is the option the books key this question to. It is a phosphatase, and the phosphatases belong to the lysosome.',
      },
    },
    {
      key: 'in-h-e-stained-sections-of-plasma-cell-golgi-apparatus-appea-75f990cf',
      conceptKey: 'golgi-apparatus-lm-appearance-and-position',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Describe what H&E shows of the Golgi in a plasma cell.',
      explanations: {
        A: 'Perinuclear is the Golgi\'s *position* in a nerve cell, and the question asks how it appears, not where it sits.',
        B: 'Apical is its position in a secretory cell with a free surface. Again a position, not an appearance.',
        C: 'Correct. It appears unstained — a pale gap in the otherwise deeply basophilic cytoplasm, which is the negative Golgi image.',
        D: 'Basal is where the rough endoplasmic reticulum and the nucleus are in a secretory cell, and it is deeply basophilic rather than pale.',
      },
    },
    {
      key: 'in-h-e-stained-sections-of-protein-forming-cell-golgi-appear-03113d3c',
      conceptKey: 'golgi-apparatus-lm-appearance-and-position',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Recognise the negative Golgi image in a protein-forming cell.',
      answerOverride: 'D',
      answerOverrideReason:
        'The books print no key. The Golgi takes neither haematoxylin nor eosin, so in an H&E section of a protein-forming cell it appears as an unstained pale area beside the nucleus — the negative Golgi image, option D. The brown fibrils of option C are what silver shows, not H&E.',
      explanations: {
        A: 'The deeply basophilic cytoplasm around the Golgi is the rough endoplasmic reticulum. The Golgi itself is the interruption in it.',
        B: 'Acidophilia beside the nucleus is what a mitochondria-rich or smooth-ER-rich region gives. The Golgi is neither.',
        C: 'Brown fibrils and granules is what a silver preparation shows — a positive Golgi image. The stem specifies H&E.',
        D: 'Correct. An unstained area near the nucleus: the negative Golgi image.',
      },
    },
    {
      key: 'negative-golgi-image-appears-ef77c5a4',
      conceptKey: 'golgi-apparatus-lm-appearance-and-position',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Give both conditions under which a negative Golgi image is seen.',
      answerOverride: 'D',
      answerOverrideReason:
        'The books print no key. The negative image needs two things at once — a routine H&E preparation, and a cell whose cytoplasm is basophilic enough for the unstained Golgi to show against it, which is what the plasma cell and the osteoblast provide. Both A and B are true, so the answer is D.',
      explanations: {
        A: 'True but incomplete. The plasma cell and the osteoblast are the standard examples, because their cytoplasm is deeply basophilic and the pale gap stands out.',
        B: 'True but incomplete. It is an H&E appearance; silver gives a positive image instead.',
        C: 'A small Golgi is harder to see, not easier. The image appears when the Golgi is well developed and the surrounding cytoplasm strongly stained.',
        D: 'Correct. Both conditions are needed together.',
      },
    },
    {
      key: 'golgi-complex-could-be-stained-as-brown-granules-fibrils-by-704fe7f8',
      conceptKey: 'golgi-apparatus-lm-appearance-and-position',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the stain that gives a positive Golgi image.',
      explanations: {
        A: 'H&E gives the negative image — a pale gap — not brown granules.',
        B: 'PAS stains carbohydrate magenta red. The Golgi handles carbohydrate but is not demonstrated this way.',
        C: 'Correct. Silver impregnation shows the Golgi as a network of brown granules and fibrils.',
        D: 'Integral membrane proteins are a molecular constituent, not a stain, and the option is not an answer to the stem at all.',
      },
    },
    {
      key: 'golgi-apparatus-5389363c',
      conceptKey: 'golgi-apparatus-lm-appearance-and-position',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Pick the true statement about the Golgi from three that invert its staining.',
      explanations: {
        A: 'Reversed. Silver gives the *positive* image, brown granules and fibrils; the negative image is what H&E gives.',
        B: 'Also reversed. H&E gives the negative image, a pale unstained area, not a granular network.',
        C: 'Correct. The Golgi varies in size, shape and position from cell to cell, and its position tells you which way the cell secretes.',
        D: 'It is not easy to see in routine sections at all — that is why the negative image, an absence, is what students are taught to look for.',
      },
    },
    {
      key: 'concerning-the-golgi-complex-all-the-statements-are-true-exc-766e5673',
      conceptKey: 'golgi-apparatus-lm-appearance-and-position',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Recall that the protein-forming cell is where the Golgi is best developed.',
      answerOverride: 'D',
      answerOverrideReason:
        'The books key this to A, that the Golgi is stained with silver — which is true, and is the book\'s own statement. The false statement is D: the Golgi is not merely present in protein-synthesising cells, it is at its best developed in them, since it is where their product is packaged. Set to D.',
      explanations: {
        A: 'True, so not the exception, and the option the books key the question to. Silver shows the Golgi as brown granules and fibrils.',
        B: 'True, so not the exception. What appears in an H&E section is the Golgi image — the pale negative one.',
        C: 'True, so not the exception. Size, shape and position all vary with the cell.',
        D: 'The exception, and the answer. The protein-forming cell is the one with the best developed Golgi of all — the plasma cell\'s negative Golgi image is the standard illustration of it, so the statement contradicts the example every student is taught.',
      },
    },
    {
      key: 'regarding-the-cell-membrane-the-following-is-true-171f82d4',
      conceptKey: 'plasma-membrane-unit-membrane-em-and-thickness',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Pick the true statement about the cell membrane from three that misclassify it.',
      explanations: {
        A: 'The plasma membrane is the first of the membranous organelles. Calling it non-membranous is a contradiction in terms.',
        B: 'Cell respiration is the mitochondrion\'s work. The membrane\'s function is selective permeability and the reception of signals.',
        C: 'At 7.5–10 nm it is far below the light microscope\'s resolution and is not shown by H&E; silver or PAS act on its carbohydrate coat instead.',
        D: 'Correct. By electron microscopy it is trilaminar — two electron-dense layers with an electron-lucent layer between.',
      },
    },
    {
      key: 'the-following-stains-can-be-used-to-stain-the-cell-membrane-fb3d7be9',
      conceptKey: 'plasma-membrane-unit-membrane-em-and-thickness',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Name the stain that demonstrates the cell membrane by light microscopy.',
      answerOverride: 'A',
      answerOverrideReason:
        'The books print no key. The department book states that the plasma membrane is hard to see by light microscopy and needs silver or PAS; of the four options offered here only silver is one of those two.',
      explanations: {
        A: 'Correct. Silver, like PAS, acts on the carbohydrate of the cell coat and so outlines the membrane.',
        B: 'Trichrome stains — Mallory, van Gieson — are for connective tissue fibres.',
        C: 'Orcein is the elastic fibre stain.',
        D: 'Indian ink is a vital stain, phagocytosed by macrophages. It marks a cell by filling it, not by outlining its membrane.',
      },
    },
    {
      key: 'eosinophils-are-lowered-1-in-the-following-3c216403',
      conceptKey: 'eosinophil-granule-contents-and-role-in-allergy',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Name the cause of eosinopenia among three causes of a raised or altered count.',
      explanations: {
        A: 'Typhoid fever does lower the eosinophil count, but the option most students reject last is the one the question is really about — the book names corticosteroid treatment as the cause of eosinopenia.',
        B: 'Tuberculosis is a chronic bacterial infection and raises the lymphocyte and monocyte counts rather than lowering eosinophils.',
        C: 'A viral infection such as influenza lowers the total white count through neutropenia, with a relative lymphocytosis; the eosinophil is not its target.',
        D: 'Correct. Cortisone and the other corticosteroids drop the eosinophil count below 1 per cent, which is eosinopenia.',
      },
    },
    {
      key: 'eosinophils-increase-in-number-in-case-of-7fad14b2',
      conceptKey: 'eosinophil-granule-contents-and-role-in-allergy',
      difficulty: 'Easy', questionType: 'Clinical application',
      learningObjective: 'Give both causes of eosinophilia.',
      explanations: {
        A: 'Bacterial infection raises the neutrophil count. The eosinophil has no part in it.',
        B: 'True but incomplete. Parasitic infection raises eosinophils, which kill the parasite with their granule protein.',
        C: 'True but incomplete. Allergy raises them too, and they act to end the reaction.',
        D: 'Correct. Both parasites and allergy, and the two together are the whole clinical meaning of a raised eosinophil count.',
      },
    },
    {
      key: 'nucleus-of-eosinophils-is-6bd7d3b5',
      conceptKey: 'eosinophil-granule-contents-and-role-in-allergy',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Give the nuclear shape that identifies an eosinophil.',
      explanations: {
        A: 'A multilobed segmented nucleus, two to five lobes, is the neutrophil.',
        B: 'Correct. Bilobed and horse-shoe shaped, the two lobes joined by a thick chromatin thread.',
        C: 'An S-shaped nucleus is the basophil\'s, and it is usually hidden by the granules over it.',
        D: 'A large kidney-shaped nucleus is the monocyte\'s.',
      },
    },
    {
      key: 'one-of-the-following-is-true-about-eosinophils-d491deda',
      conceptKey: 'eosinophil-granule-contents-and-role-in-allergy',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Pick the eosinophil\'s property from three that belong to the basophil or the neutrophil.',
      answerOverride: 'B',
      answerOverrideReason:
        'The books print no key. Only B is true: the eosinophil has a bilobed horse-shoe nucleus. Eosinophil chemotactic factor and histamine with heparin are secreted by the basophil, and 60–70 per cent is the neutrophil\'s share of the white count.',
      explanations: {
        A: 'Eosinophil chemotactic factor is secreted *by* the basophil and mast cell, to summon the eosinophil. The name says who it acts on, not who makes it — which is the trap.',
        B: 'Correct. A bilobed, horse-shoe nucleus with a thick chromatin thread between the lobes.',
        C: '60–70 per cent is the neutrophil. The eosinophil is 1–4 per cent, and above 5 per cent is already eosinophilia.',
        D: 'Histamine and heparin are the basophil\'s granule contents. The eosinophil secretes histamin*ase*, which destroys the first of them.',
      },
    },
    {
      key: 'all-functions-of-eosinophils-except-b50122b0',
      conceptKey: 'eosinophil-granule-contents-and-role-in-allergy',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Separate what the eosinophil does from what the basophil does.',
      explanations: {
        A: 'True, so not the exception. Histaminase and sulphatase destroy histamine and heparin, which is how the eosinophil ends an allergic reaction.',
        B: 'True, so not the exception. It phagocytoses antigen–antibody complexes.',
        C: 'True, so not the exception. Its granule protein is cytotoxic and neurotoxic to parasites.',
        D: 'The exception, and the answer. Vasodilatation and anaphylaxis through histamine are the basophil\'s doing. The eosinophil is the cell that stops it.',
      },
    },
    {
      key: 'functions-of-eosinophils-include-all-except-9b4cab42',
      conceptKey: 'eosinophil-granule-contents-and-role-in-allergy',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Recognise a fibroblast product offered as an eosinophil function.',
      explanations: {
        A: 'True, so not the exception. Histaminase destroys histamine.',
        B: 'True, so not the exception. Antigen–antibody complexes are engulfed.',
        C: 'True, so not the exception. Parasites are killed by the granule\'s basic protein.',
        D: 'The exception, and the answer. Trephone substances are attributed to the fibroblast, which secretes them for the nutrition of neighbouring cells. Nothing in the blood makes them.',
      },
    },
    {
      key: 'eosinophils-granules-include-all-of-the-following-except-8504d8a7',
      conceptKey: 'eosinophil-granule-contents-and-role-in-allergy',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Keep the basophil\'s leukotrienes out of the eosinophil granule.',
      answerOverride: 'D',
      answerOverrideReason:
        'The books print no key. Neurotoxin, histaminase and sulphatase are all eosinophil granule contents in the department book\'s account; leukotrienes belong to the basophil, where they cause the bronchospasm of asthma.',
      explanations: {
        A: 'True, so not the exception. The granule protein is neurotoxic to parasites.',
        B: 'True, so not the exception. Histaminase destroys histamine.',
        C: 'True, so not the exception. Sulphatase destroys heparin.',
        D: 'The exception, and the answer. Leukotrienes are a basophil product and cause bronchospasm. The eosinophil ends the reaction the leukotrienes started, so the two cells\' contents are opposites and are easily traded.',
      },
    },
    {
      key: 'a7-year-old-school-boy-has-a-blood-report-with-an-eosinophil-3a9af4fe',
      conceptKey: 'eosinophil-granule-contents-and-role-in-allergy',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Read a raised eosinophil count without allergy as pointing to parasites.',
      answerOverride: 'B',
      answerOverrideReason:
        'Neither printing of this case carries a key. An eosinophil count above 5 per cent is eosinophilia, and the eosinophil rises for two reasons only — allergy and parasites. The stem excludes allergy, so the investigation to ask for is the one that finds a parasite: stool analysis.',
      explanations: {
        A: 'Urine analysis would find a urinary parasite such as schistosome eggs in some settings, but the routine first test for intestinal parasites — much the commoner cause in a schoolchild — is the stool.',
        B: 'Correct. Stool analysis, looking for the ova of an intestinal parasite.',
        C: 'Bleeding time is a test of platelet function and has nothing to do with the eosinophil.',
        D: 'Allergen sensitivity testing is exactly what the stem has ruled out by saying the boy has no allergic problems — which leaves one cause of eosinophilia standing.',
      },
    },
    {
      key: 'which-of-the-following-is-described-as-having-a-central-pall-9e668638',
      conceptKey: 'rbc-shape-size-and-light-microscopic-appearance',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Attribute the central pallor to the red cell.',
      explanations: {
        A: 'Correct. The red cell is thinnest at its centre — 0.8 µm against 2.2 at the edge — so it holds less haemoglobin there and appears pale.',
        B: 'The monocyte has a pale frosted-glass cytoplasm throughout and a kidney-shaped nucleus; nothing about it is centrally pale.',
        C: 'The eosinophil is packed with coarse acidophilic granules and has no pale centre.',
        D: 'The platelet does have a pale zone — the hyalomere — but it is peripheral, and its centre, the granulomere, is the dark part. The exact inverse, which is what makes it the best distractor.',
      },
    },
    {
      key: 'a-7-year-old-school-boy-has-a-blood-report-with-an-eosinophi-bcef3302',
      conceptKey: 'eosinophil-granule-contents-and-role-in-allergy',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option C has swallowed option D — "Estimation of his bleeding time. _d. Sensitivity tests to different allergens" — leaving three readable choices, one of them two statements under one letter. The parallel printing at `a7-year-old-school-boy-has-a-blood-report-with-an-eosinophil-3a9af4fe` has the option set intact and is live; note that the two printings quote different counts, 9 per cent here and 6 per cent there, and both are above the 5 per cent threshold.',
    },
    {
      key: 'a-young-boy-with-unhealed-leg-wound-was-diagnosed-as-vitamin-6d6b314e',
      conceptKey: 'collagen-fibre-characters-and-its-stains',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option B was lost and option B is the answer — Mallory\'s trichrome. Three options remain, none of them correct, and the stem has lost the letter of the vitamin to a stray glyph. The complete printing at `a-young-boy-with-unhealed-leg-wound-was-diagnosed-as-vitamin-bbc6ae4f` is live.',
    },
    {
      key: 'after-staining-of-collagen-fibers-15de85ca',
      conceptKey: 'collagen-fibre-characters-and-its-stains',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Only three options survived, and the second of them is wrong as printed — van Gieson stains collagen red and elastic fibres yellow, not green. The key, A, is right about H&E. A rescan is needed both for the missing option and to see whether the books really printed "green" or whether that is the scanner.',
    },
    {
      key: 'by-best-s-carmine-stains-glycogen-granules-appears-18101c1a',
      conceptKey: 'pas-and-bests-carmine-show-carbohydrate',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three options only. The key, B for red, is right — Best\'s carmine stains glycogen red — and a rescan of the fourth option would make the row usable.',
    },
    {
      key: 'goblet-cell-can-be-stained-by-9a3c3a95',
      conceptKey: 'pas-and-bests-carmine-show-carbohydrate',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three options only. The key, B for PAS, is right: the goblet cell\'s mucus is carbohydrate-rich and PAS-positive. A rescan of the fourth option recovers it.',
    },
    {
      key: 'pas-stain-is-used-to-demonstrate-all-of-the-following-except-039b8a94',
      conceptKey: 'pas-and-bests-carmine-show-carbohydrate',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The stem has swallowed option A — "all of the following except: a-Cell membrane" — leaving three options. The question is a good one and the answer is fat, which PAS does not show; a rescan of the stem recovers it.',
    },
    {
      key: 'cytoplasm-of-rer-is-7fb32b7f',
      conceptKey: 'h-and-e-basophilia-and-acidophilia',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three options only. The key, B for basophilic, is right — the ribosomes on the rough endoplasmic reticulum are what make a protein-forming cell blue. The teaching survives in `cytoplasm-of-ribosome-is-b531d7a0`, which is live with four options.',
    },
    {
      key: 'cytoplasm-of-ser-is-8c46f480',
      conceptKey: 'h-and-e-basophilia-and-acidophilia',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three options only. The key, A for acidophilic, is right: smooth endoplasmic reticulum carries no ribosomes, so a cell full of it — a steroid-forming cell — is pink rather than blue. A rescan of the fourth option recovers a good contrast question.',
    },
    {
      key: 'nucleus-is-due-to-dna-rna-ff2f2e15',
      conceptKey: 'h-and-e-basophilia-and-acidophilia',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three options only. The key, A for basophilic, is right and is the anchor fact of the whole chapter: nucleic acid is acidic, so it binds the basic dye. A rescan of the fourth option recovers it.',
    },
    {
      key: 'centrioles-need-special-stains-to-be-viewed-under-the-lm-lik-1044436c',
      conceptKey: 'special-stains-for-mitochondria-and-centrioles',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three options only. The key, C for iron haematoxylin, is right, and the same question survives with four options at `stain-used-for-centriole-e56e9242`, which is live.',
    },
    {
      key: 'to-demonstrate-the-golgi-apparatus-distinctly-they-need-534ed6f7',
      conceptKey: 'golgi-apparatus-lm-appearance-and-position',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three options only and no key. The answer is silver, and the same teaching is live at `golgi-complex-could-be-stained-as-brown-granules-fibrils-by-704fe7f8`. A rescan of the fourth option recovers this row.',
    },
    {
      key: 'lishman-s-stain-is-5abe6459',
      conceptKey: 'neutral-stain-leishman-and-the-blood-film',
      difficulty: 'Easy', questionType: 'Classification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three options only. Its key, C for a neutral stain, is right, and the four-option printing at `lishman-stain-is-1f2148f4` carries the same question and is live.',
    },
    {
      key: 'concerning-unilocular-adipocytes-i-370b161c',
      conceptKey: 'white-versus-brown-adipose-connective-tissue',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A duplicate with scan debris through the stem and all four options — "concemed with heat generation", "Sudan Ill" — and no key. The cleaner printing at `concerning-unilocular-adipocytes-they-1051d1be` is live with the answer supplied.',
    },
    {
      key: 'matrix-18-elastic-fibers-are-characterized-by-being-80874871',
      conceptKey: 'elastic-fibre-characters-and-orcein',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The stem has the tail of the previous question and the question number run into it — "Matrix. ظ 18. Elastic fibers are characterized by being:" — so what a student would read begins with a word from another item. The four options are intact and the answer is D, orcein brown; a rescan of the stem alone recovers a question that is not a duplicate of the other elastic-fibre item, since its option set is different.',
    },
    {
      key: 'which-of-the-following-is-used-to-make-fat-visible-3b3ed7f4',
      conceptKey: 'sudan-shows-fat-and-the-signet-ring-cell',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option D — the answer — has a page footer and part of an answer key run into it: "Sudan Ill Key Answer | 8 8.1 Vee ee) 98 لششتسا.ءن". The same question is live and clean at `which-of-the-following-would-be-best-suited-to-visualize-lip-5681589f`.',
    },
    {
      key: 'basic-protein-b612b009',
      conceptKey: 'eosinophil-granule-contents-and-role-in-allergy',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three options only, and two of them are damaged Latin — "internam of eosinophils" against "externum of eosinophils" — where the intended contrast is presumably major basic protein in the granule core against something on the outside. As extracted it cannot be read, let alone answered. Needs rescanning.',
    },
    {
      key: 'among-the-characteristics-of-pericytes-ed77008a',
      conceptKey: 'pericyte-and-undifferentiated-mesenchymal-cell',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option A has swallowed option B — "Having a network of actin and myosin. _b. Being differentiated cells" — leaving three readable choices with two statements under the first letter. The question is a good one: the pericyte does have an actin–myosin network, and it is *un*differentiated, so the swallowed pair contains both the answer and its opposite. A rescan recovers it.',
    },
    {
      key: 'lipofuscin-e-stains-glycogen-ssss-s-protects-from-ultraviole-4b0bb5d1',
      conceptKey: 'organelles-inclusions-and-the-membranous-classification',
      difficulty: 'Moderate', questionType: 'Classification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Not a multiple-choice question at all. The row is what the extraction made of a matching exercise — a left column of pigments and inclusions against a right column of stains and properties — with both columns, the word "Answers", and several lines of dot leaders folded into one stem and four options. Options A and E are the same fragment printed twice. A matching question needs to be transcribed as a matching question; it cannot be repaired into a single-best-answer item.',
    },
    {
      key: 'the-stain-characteristic-for-the-cell-detected-in-the-previo-27435c6e',
      conceptKey: 'metachromatic-stain-toluidine-blue-and-heparin',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The stem refers to "the cell detected in the previous case" and the row does not contain the case. This is a follow-on question printed beneath a stem that the extraction filed as a separate row, so a student sitting it alone has nothing to reason from — a reviewer\'s problem rather than a scanner\'s, since rescanning will not join the two rows. The four options are the leaf\'s standard set of one stain per cell, and toluidine blue is the likeliest intended answer.',
    },
    {
      key: 'the-stain-characteristic-for-the-cell-detected-in-the-previo-7fc8427d',
      conceptKey: 'metachromatic-stain-toluidine-blue-and-heparin',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The second printing of the same orphaned follow-on question, and worse: option A has swallowed option B as well. Both copies need the case they belong to, which is an editorial decision rather than a rescan.',
    },
  ],
}
