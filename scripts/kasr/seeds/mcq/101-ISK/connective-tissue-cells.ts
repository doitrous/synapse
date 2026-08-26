/**
 * `101 ISK > Histology > Connective Tissue > Connective Tissue Cells` — the
 * question books' MCQs.
 *
 * Eighty-nine rows, seventy-four live. Clean scans, honest keys: only two
 * printed answers are overridden and thirteen supplied where none was given.
 * The exclusions are almost all three-option rows or the second printing of a
 * question that survives whole elsewhere in the file.
 *
 * Nineteen of the twenty-one concepts are reused rather than minted, because
 * this leaf is where the connective tissue cells already live: eight come from
 * the written papers or from sibling MCQ leaves —
 * `fibroblast-features-function`, `plasma-cell-features-function`,
 * `mast-cell-lm-em-metachromasia`, `b-lymphocyte-becomes-the-plasma-cell`,
 * `monocyte-is-the-largest-leukocyte-and-becomes-the-macrophage`,
 * `basophil-granule-contents-and-anaphylaxis`,
 * `white-versus-brown-adipose-connective-tissue`,
 * `adipose-ct-stores-insulates-supports-and-secretes-leptin`,
 * `dense-white-fibrous-ct-regular-versus-irregular`,
 * `red-bone-marrow-stroma-and-free-cells`,
 * `rough-endoplasmic-reticulum-structure-and-protein-export`,
 * `ser-structure-function-steroid-detoxification` and
 * `golgi-apparatus-lm-appearance-and-position` — and five are repeated from
 * leaves I wrote earlier in this pass:
 * `connective-tissue-fibres-collagen-reticular-and-elastic` and
 * `pericyte-and-undifferentiated-mesenchymal-cell`, plus
 * `sudan-shows-fat-and-the-signet-ring-cell`, `vital-and-supravital-stains`,
 * `metachromatic-stain-toluidine-blue-and-heparin` and
 * `reticular-fibres-and-reticular-cells` from `microtechniques.ts`. All are
 * copied verbatim with their own modulePaths, so the emitter's merge changes
 * nothing.
 *
 * Two rival keys already in the batch, both left alone. The fibroblast has two:
 * `fibroblast-features-function` from the written papers and
 * `fibroblast-active-and-fibrocyte-inactive` from `types-of-connective-tissue-proper.ts`.
 * I have used the first for every fibroblast row here, including the ones about
 * what the cell secretes, even though the emitted definition describes the cell
 * rather than listing its products — the key claims the function and a third key
 * would make the split worse. Someone reconciling the two should widen that
 * definition to name collagen, elastin, fibrillin, reticular fibres and the
 * ground substance, and to say that the fibroblast makes no heparin and does not
 * grow epithelium, which is what four rows of this leaf turn on. The fat cell
 * likewise has `white-versus-brown-adipose-connective-tissue` and
 * `fat-cells-unilocular-vs-multilocular-comparison`; the first is used here.
 *
 * Only two concepts are minted. `connective-tissue-cells-fixed-free-and-which-are-branched`
 * carries four rows that ask nothing about any one cell and everything about how
 * the cells are grouped, which is an objective of its own — a student can know
 * every cell and still not know which of them is branched.
 * `mast-cell-granule-contents-and-the-anaphylactic-reaction` carries the
 * secretions and the two anaphylaxis cases; the existing mast cell concept is
 * about identifying the cell down a microscope, and what it releases is a
 * different thing to know.
 *
 * Nine rows from the sat end-of-module papers are added at the end. No answer among
 * them was recovered — the highlight pass in `eom-answers.json` reaches no row in
 * this leaf — so all six live answers are worked from the department book and each
 * says so in its `answerOverrideReason`. The three exclusions are the batch's usual
 * failure: on the 2022 and 2024 scripts the candidate's pen crossed option letters,
 * sending those options into the stem, and `thermogenesis-is-a-function-of` lost
 * its correct option into the one above it.
 *
 * `connective-tissue-fibre-stains-by-fibre-type` and
 * `mucoid-ct-is-jelly-rich-in-hyaluronic-acid` are copied verbatim from the leaves
 * that mint them, because two of the papers' rows ask them from the cell side.
 */
import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Connective Tissue Cells',
  modulePath: '101 ISK > Histology > Connective Tissue > Connective Tissue Cells',
  articleId: 'ART-101-HIS-CONNECTIVE-TISSUE-CELLS',

  concepts: [
    {
      key: 'connective-tissue-cells-fixed-free-and-which-are-branched',
      label: 'Connective tissue cells divide into fixed and free, and into branched and unbranched — and the two divisions do not coincide',
      definition:
        'The cells of connective tissue proper are grouped two ways. By permanence: the fixed cells are the fibroblast and fibrocyte, the fat cell, the undifferentiated mesenchymal cell, the pericyte, the reticular cell and the pigment cell, all resident and long-lived; the free cells are the macrophage, the mast cell, the plasma cell and the wandering leukocytes, which come and go and are mostly short-lived — the plasma cell most obviously so. By shape: the branched cells are the fibroblast, the undifferentiated mesenchymal cell, the pericyte, the macrophage and the pigment cell, all of which send out processes; the unbranched are the fat cell, which is a sphere, and the plasma cell and mast cell, which are oval. Cells of other tissues are not connective tissue cells at all however phagocytic they are: the microglia is the macrophage of the central nervous system and belongs to nervous tissue, and the Kupffer cell and the dust cell belong to liver and lung.',
      objective:
        'Sort the connective tissue cells into fixed and free and into branched and unbranched, and reject cells that belong to other tissues.',
      pitfall:
        'Assuming a free cell must be branched because it moves. The macrophage is free and branched, but the plasma cell and the mast cell are free and oval, while the fibroblast is fixed and the most branched of all — motility and shape are unrelated here.',
      subject: 'fnd',
      primary: 'DIS-HIS-T02',
      secondary: [],
      modulePath: '101 ISK > Histology > Connective Tissue > Connective Tissue Cells',
      type: 'classification',
      aliases: ['Fixed connective tissue cells', 'Free connective tissue cells', 'Branched cells'],
    },
    {
      key: 'mast-cell-granule-contents-and-the-anaphylactic-reaction',
      label: 'The mast cell stores heparin and histamine and releases them when allergen binds its IgE — which is what an anaphylactic reaction is',
      definition:
        'The mast cell\'s granules hold heparin, which prevents clotting, histamine, which dilates vessels and raises their permeability, and — in the books\' account — serotonin; it also releases eosinophil chemotactic factor and leukotrienes. Its surface carries receptors for IgE, so that when an allergen binds antibody already fixed to the cell, the granules are discharged at once. That discharge is the immediate allergic reaction: locally, itching, swelling and wheal; systemically, the vasodilatation and increased permeability that produce oedema, bronchospasm and a sudden fall in blood pressure — anaphylactic shock, as after a penicillin injection or a peanut in a sensitised child. The mast cell does not make histaminase; that is the eosinophil\'s enzyme, and it is what ends the reaction the mast cell began.',
      objective:
        'List what the mast cell releases, explain how IgE triggers the release, and connect each mediator to a sign of the allergic reaction.',
      pitfall:
        'Giving the mast cell histaminase. It releases histamine and the eosinophil destroys it — the two cells are the two ends of one reaction, and swapping the enzyme for the amine reverses which cell is causing the trouble.',
      subject: 'fnd',
      primary: 'DIS-HIS-T02',
      secondary: [],
      modulePath: '101 ISK > Histology > Connective Tissue > Connective Tissue Cells',
      type: 'clinical_correlation',
      aliases: ['Anaphylaxis', 'Histamine release', 'IgE receptors', 'Allergic reaction'],
    },
    {
      key: 'fibroblast-features-function',
      label: 'The active fibroblast comes from the mesenchymal cell and is built to synthesise protein',
      definition:
        'The fibroblast is the commonest cell of connective tissue proper and arises from the undifferentiated mesenchymal cell and from the pericyte. In its active state it is a branched cell with many long thin processes, deeply basophilic cytoplasm and a central large oval pale nucleus with a prominent nucleolus. By electron microscopy it is a protein-synthesising cell: well-developed rER and Golgi apparatus, many mitochondria and a euchromatic nucleus. The inactive form, the fibrocyte, is a smaller spindle cell with few processes, paler cytoplasm and a smaller darker nucleus with more heterochromatin and less rER, Golgi and mitochondria.',
      objective: 'State where the fibroblast comes from and describe the active fibroblast by light and electron microscopy.',
      pitfall: 'Describing the fibrocyte and calling it a fibroblast. The question asks the active cell — branched, deeply basophilic, pale euchromatic nucleus — and the inactive one is the opposite of it in every feature.',
      subject: 'fnd',
      primary: 'DIS-HIS-T02',
      secondary: [],
      modulePath: '101 ISK > Histology > Connective Tissue > Connective Tissue Cells',
      type: 'structural_description',
      aliases: ['Active fibroblast', 'Fibrocyte'],
      gaps: [
        'The emitted definition describes the fibroblast and does not list what it secretes. Four rows of this leaf turn on the products — collagen, elastin and fibrillin, reticular fibres and the ground substance — and on what the cell does not make, heparin, and does not do, grow epithelium. The teaching is carried in the option explanations here; the definition should be widened rather than a second fibroblast key minted, since the batch already carries `fibroblast-active-and-fibrocyte-inactive` as a rival.',
      ],
    },
    {
      key: 'plasma-cell-features-function',
      label: 'The plasma cell is a B lymphocyte turned into an antibody factory, and its nucleus shows it',
      definition:
        'The plasma cell arises from the B lymphocyte and is numerous in lymphoid tissue. It is a large oval cell with deeply basophilic cytoplasm showing a negative Golgi image, and an eccentric spherical nucleus whose dark heterochromatin alternates with lighter euchromatin to give the cart-wheel or clock-face appearance. By electron microscopy it is a protein-forming cell rich in rough endoplasmic reticulum, with a well developed Golgi, many mitochondria, a euchromatic nucleus and no secretory granules. Its function is the synthesis and secretion of antibodies.',
      objective: 'Give the origin, site and light-microscopic picture of the plasma cell and relate them to antibody secretion.',
      pitfall: 'Expecting secretory granules. The plasma cell has none — it exports antibody continuously, which is why its cytoplasm is rough endoplasmic reticulum rather than stored product.',
      subject: 'fnd',
      primary: 'DIS-HIS-T02',
      secondary: [],
      modulePath: '101 ISK > Histology > Connective Tissue > Connective Tissue Cells',
      type: 'structure_function_relationship',
      aliases: ['Plasmacyte', 'Cart-wheel nucleus', 'Clock-face nucleus'],
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
      key: 'b-lymphocyte-becomes-the-plasma-cell',
      label: 'The plasma cell is a B lymphocyte that has been activated by antigen and by a helper T cell',
      definition:
        'The B lymphocyte matures in the bone marrow in mammals and carries surface receptors for IgM and IgD. When it meets its specific antigen and is activated by a helper T cell, it becomes a plasmablast and then a plasma cell, which synthesises and secretes antibody — the humoral immune response. Some of its progeny become B memory cells, which give the rapid second response. The plasma cell itself is a transient connective tissue cell with deeply basophilic cytoplasm, a negative Golgi image and a cart-wheel nucleus.',
      objective: 'Trace the plasma cell back to the B lymphocyte and name what activates the change.',
      pitfall: 'Deriving the plasma cell from the T lymphocyte or the monocyte because both are involved in the response. The T helper cell only permits the change; the cell that becomes a plasma cell is the B lymphocyte.',
      subject: 'haem',
      primary: 'DIS-HIS-T02',
      secondary: ['SYS-HEM-T01-S01-M02'],
      modulePath: '101 ISK > Histology > Blood > Non granular leukocytes',
      type: 'developmental_process',
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
      key: 'basophil-granule-contents-and-anaphylaxis',
      label: 'The basophil holds histamine and heparin, carries IgE receptors, and its histamine release is anaphylaxis',
      definition:
        'Basophils are 0–1% of the white cell count, 10–12 µm, with an S-shaped nucleus obscured by coarse granules that stain metachromatically purple with toluidine blue because of their heparin. The specific granules are large, rounded and electron dense, holding histamine, heparin, eosinophil chemotactic factor and leukotrienes, and the cell membrane carries receptors for IgE. Heparin prevents clotting and promotes allergy; histamine causes vasodilatation with a sudden drop in blood pressure — anaphylaxis; leukotrienes cause bronchospasm and bronchial asthma. Basophilia is above 2%.',
      objective: 'List what the basophil granule contains, and connect each substance to the clinical event it produces.',
      pitfall: 'Calling the basophil a mast cell. Both stain metachromatically, both hold histamine and heparin and both carry IgE receptors — the book compares them directly — but they differ in life span, size, nuclear shape and phagocytic ability, and the mast cell is 20–30 µm against the basophil’s 10–12.',
      subject: 'haem',
      primary: 'DIS-HIS-T02',
      secondary: ['SYS-HEM-T01-S01-M02'],
      modulePath: '101 ISK > Histology > Blood > Granular leukocytes',
      type: 'structure_function_relationship',
      aliases: ['Basophil granules', 'Anaphylaxis', 'Basophilia'],
      conflicts: [
        'The recovered key for the 2022 end-of-module paper resolves its question 40 — which white blood cells contain histamine and heparin — to Eosinophils, while the department book gives histamine and heparin to the basophil and the mast cell and gives the eosinophil histaminase and sulphatase, which destroy them. The disagreement is recorded rather than resolved. The evidence in `eom-answers.json` points at the extraction rather than at either source: only three of the four option boxes were found on that page, the option that was lost is Basophils, and the candidate\'s highlight overlaps the box the key names by 13% of its area. The row is excluded in `microtechniques.ts` with the same note.',
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
      key: 'adipose-ct-stores-insulates-supports-and-secretes-leptin',
      label: 'Adipose connective tissue stores fat, insulates, supports organs, fills spaces and secretes leptin',
      definition:
        'Adipose connective tissue is fat cells predominating, held by a fine network of reticular fibres with collagen dividing it into incomplete lobules. It synthesises and stores fat, insulates the body against heat loss, keeps organs such as the kidney in position, fills the spaces between tissues and gives the skin its contour. It also has an endocrine function: it secretes leptin, which inhibits food intake and raises the metabolic rate. It has no role in immunity.',
      objective: 'List the functions of adipose connective tissue, including its endocrine one.',
      pitfall: 'Forgetting that fat is an endocrine organ, and equally, crediting it with defence functions. Antibody comes from the plasma cell, and no fat cell makes any.',
      subject: 'fnd',
      primary: 'DIS-HIS-T02',
      secondary: [],
      modulePath: '101 ISK > Histology > Connective Tissue > Types of Connective Tissue Proper',
      type: 'structure_function_relationship',
    },
    {
      key: 'dense-white-fibrous-ct-regular-versus-irregular',
      label: 'Dense white fibrous connective tissue is regular when its collagen bundles run one way and irregular when they run in every direction',
      definition:
        'Dense white fibrous connective tissue is packed with collagen bundles and holds few cells and little ground substance. It is regular when the bundles are parallel and the pull is in one direction — tendons, ligaments and aponeuroses — and irregular when the bundles interweave in different planes to resist pull from any direction, as in the dermis of the skin, the capsules of organs, the periosteum and perichondrium, and the stroma that surrounds the lobules of the mammary gland. Both are dense; the direction of the bundles is what separates them, and it follows from the direction of the force.',
      objective: 'Tell dense regular from dense irregular white fibrous connective tissue on a section and name a site of each.',
      pitfall: 'Reading "densely packed collagen with few cells" as regular. That much is true of both; the word that decides it is whether the bundles run one way or many, and a capsule or a gland stroma is surrounded from all sides and so is irregular.',
      subject: 'fnd',
      primary: 'DIS-HIS-T02',
      secondary: [],
      modulePath: '101 ISK > Histology > Connective Tissue > Types of Connective Tissue Proper',
      type: 'comparison',
    },
    {
      key: 'red-bone-marrow-stroma-and-free-cells',
      label: 'Red bone marrow is a stroma of fixed cells and blood sinusoids holding free developing blood cells and stem cells',
      definition:
        'Red bone marrow has a stroma and free cells. The stroma is reticular cells, which with reticular fibres form the supporting network, together with fibroblasts, undifferentiated mesenchymal cells, pericytes, osteogenic cells and fat cells — the largest cells in the marrow — and the blood sinusoids, wide irregular capillaries lined by endothelium on a non-continuous basement membrane, through whose pores finished cells enter the blood. The free cells are the developing stages of the blood cells and the stem cells, immature white cells outnumbering immature red cells about five to one because most white cells are shorter-lived.',
      objective: 'Name the fixed cells, the sinusoids and the free cells of red bone marrow and say what each contributes.',
      pitfall: 'Expecting the sinusoid to have a continuous basement membrane like an ordinary capillary. It is the gaps in it that let a finished blood cell leave the marrow at all.',
      subject: 'haem',
      primary: 'DIS-HIS-T02',
      secondary: ['SYS-HEM-T01-S02-M03'],
      modulePath: '101 ISK > Histology > Blood > Haemopoiesis',
      type: 'structural_description',
    },
    {
      key: 'connective-tissue-fibres-collagen-reticular-and-elastic',
      label: 'Collagen type I builds the strong dense tissues, type III is the reticular fibre of organ stromas, and elastic fibres are what ligamentum nuchae is made of',
      definition:
        'Connective tissue has three kinds of fibre. Collagen is the commonest, and its types differ by where they are: type I in dense connective tissue — tendon, ligament, capsule of organs, dermis and bone — type II in cartilage, type III as the reticular fibre, and type IV in the basement membrane. Reticular fibres are fine, branching type III collagen, stained black by silver, and they form the supporting stroma of parenchymatous organs such as liver, spleen, lymph node and bone marrow. Elastic fibres are made of elastin with a fibrillin microfibril scaffold, stain brown with orcein, and give yellow elastic connective tissue — ligamentum nuchae, ligamenta flava and the vocal ligaments — its ability to recoil.',
      objective: 'Match each fibre type to the tissue it builds, and name a site where each predominates.',
      pitfall: 'Reading "reticular" as a separate protein. A reticular fibre is collagen — type III — and the two questions in these books that name type III and reticular tissue have the same answer, the stroma of parenchymatous organs, phrased two ways.',
      subject: 'fnd',
      primary: 'DIS-HIS-T02',
      secondary: [],
      modulePath: '101 ISK > Histology > Connective Tissue > Connective Tissue Fibres',
      type: 'classification',
      aliases: ['Collagen types', 'Reticular fibres', 'Elastic fibres', 'Ligamentum nuchae'],
    },
    {
      key: 'reticular-fibres-and-reticular-cells',
      label: 'Reticular fibres are branching, argyrophilic and PAS-positive, invisible in H&E, and the reticular cells that make them are modified fibroblasts of the organ stroma',
      definition:
        'Reticular fibres are fine, branching fibres of type III collagen that form a network rather than bundles. They are stained black by silver — argyrophilic — and are PAS-positive because of the carbohydrate on them; they are not demonstrable in a routine H&E section at all. They form the supporting stroma of the parenchymatous organs, and the reticular cells that produce them lie along them. A reticular cell is regarded as a modified fibroblast, is found mainly in the stroma of organs, and in the lymphoid organs and bone marrow has a phagocytic function; it is not demonstrated by iron haematoxylin, which is the centriole stain.',
      objective: 'Give the stains that show a reticular fibre and the one that does not, and describe the reticular cell and where it lives.',
      pitfall: 'Saying reticular fibres form bundles. They branch and anastomose into a mesh — which is why the tissue is named for a net — while it is collagen that bundles.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Introduction > Microtechniques',
      type: 'structure_function_relationship',
      aliases: ['Argyrophilic', 'Silver stain', 'Reticular cell', 'Reticular tissue'],
    },
    {
      key: 'rough-endoplasmic-reticulum-structure-and-protein-export',
      label: 'Rough endoplasmic reticulum is flattened cisternae studded on the outside with ribosomes, and it makes and segregates protein for export',
      definition:
        'The endoplasmic reticulum is a membranous network of intercommunicating channels and sacs — cisternae — extending from the nucleus to the cell membrane, and it is of two kinds. The rough kind is parallel flattened cisternae bounded by a single membrane whose outer, cytoplasmic surface is studded with ribosomes bound to receptor proteins called ribophorins; it is continuous with the outer membrane of the nuclear envelope, which is itself studded with polyribosomes for the same reason. It is abundant in cells that make protein for export, such as the plasma cell, and its ribosomes are what give those cells their light-microscopic basophilia, focal, diffuse or localised. It synthesises the exported proteins, segregates them into its lumen away from the cytoplasm, performs their initial glycosylation, packs them into transfer vesicles for the Golgi apparatus, protects the cytoplasm from the hydrolytic enzymes it makes, and serves as an intracellular pathway.',
      objective: 'Describe the rough endoplasmic reticulum\'s membranes and ribosome attachment, and list what it does to a protein before the Golgi apparatus receives it.',
      pitfall: 'Giving rough endoplasmic reticulum two membranes because a mitochondrion has two. It has one, and the ribosomes are on its outer face — the face towards the cytoplasm, where the messenger RNA is.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Cytology > Cytoplasm',
      type: 'structure_function_relationship',
      aliases: ['Granular endoplasmic reticulum', 'Ribophorin', 'Cisternae', 'Protein segregation'],
    },
    {
      key: 'ser-structure-function-steroid-detoxification',
      label: 'Smooth endoplasmic reticulum is invisible in itself and known by the acidophilia it causes and its ribosome-free tubules',
      definition:
        'Smooth endoplasmic reticulum is a membranous organelle concerned with lipid and steroid synthesis, well developed in cells that form fat and steroid hormones, such as liver cells. On light microscopy it is not demonstrated as such, but where it is abundant it gives the cytoplasm an acidophilia. On electron microscopy it is a network of branching and anastomosing tubules of variable shape, continuous with the rough endoplasmic reticulum, whose membranes carry no bound ribosomes.',
      objective: 'Describe smooth endoplasmic reticulum as it appears on light microscopy and on electron microscopy, and say what it does.',
      pitfall: 'Expecting to see it under the light microscope. What is seen is the cytoplasmic acidophilia it produces when abundant, not the organelle.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Cytology > Cytoplasm',
      type: 'structure_function_relationship',
      aliases: ['Agranular endoplasmic reticulum'],
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
      key: 'sudan-shows-fat-and-the-signet-ring-cell',
      label: 'Sudan III stains fat orange in a frozen section; in H&E the fat has dissolved and the cell is left as a signet ring',
      definition:
        'Fat is demonstrated by the fat stains, of which Sudan III is the type example, staining it orange; the section must be a frozen one, because the xylol of the paraffin technique dissolves the fat away. In a routine H&E section the fat has therefore gone, and a unilocular fat cell appears as an empty vacuole with the cytoplasm squeezed into a thin rim and the nucleus flattened against one side — the signet ring appearance. The unilocular cell holds one large droplet, does not divide, and is the cell of white adipose tissue, which stores fat; heat generation belongs to the multilocular cell of brown fat.',
      objective: 'Name the fat stain and the technique it needs, and explain the signet ring appearance from what H&E does to fat.',
      pitfall: 'Attributing the signet ring to a fat stain. It is what H&E leaves behind — a hole where the droplet was. A Sudan-stained fat cell is a solid orange ball and looks nothing like a ring.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Introduction > Microtechniques',
      type: 'structure_function_relationship',
      aliases: ['Sudan III', 'Fat stain', 'Signet ring appearance'],
    },
    {
      key: 'vital-and-supravital-stains',
      label: 'A vital stain stains living cells inside the living animal, a supravital stain stains living cells outside the body',
      definition:
        'A vital stain is one given to a living animal, whose cells then take it up while alive: trypan blue and Indian ink are injected, and the macrophages phagocytose them, which is how the macrophage is demonstrated. A supravital stain works on living cells outside the body — brilliant cresyl blue added to a drop of fresh blood shows the reticulum of the reticulocyte, which is residual ribosomal RNA and disappears as the cell matures. The distinction is where the cell is when it is stained, not what the dye is.',
      objective: 'Define vital and supravital staining, and give the cell each is used to demonstrate.',
      pitfall: 'Treating supra- as "better". It means outside — supravital staining happens outside the living body, on cells that are still alive, and the two words differ by that single fact.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Introduction > Microtechniques',
      type: 'classification',
      aliases: ['Trypan blue', 'Indian ink', 'Brilliant cresyl blue', 'Supravital'],
    },
    {
      key: 'metachromatic-stain-toluidine-blue-and-heparin',
      label: 'A metachromatic stain gives a colour that is not its own — toluidine blue turns violet-magenta on the heparin of mast cell and basophil granules',
      definition:
        'A metachromatic stain is one that produces a colour different from the colour of the dye itself. Toluidine blue is the example: it is blue, and on the sulphated mucopolysaccharide granules of the mast cell and of the blood basophil it turns violet, purple or magenta red. The molecule responsible is heparin, which is why the same reaction identifies both cells and why no other connective tissue cell shows it — the plasma cell is basophilic but not metachromatic, the macrophage takes trypan blue, and the fat cell takes Sudan.',
      objective: 'Define metachromasia, name the stain and the two cells it identifies, and give the granule component responsible.',
      pitfall: 'Reading metachromasia as simply "stains strongly". The point is that the colour changes — a granule that goes purple in a blue dye is metachromatic, and one that merely goes a deeper blue is not.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Introduction > Microtechniques',
      type: 'structure_function_relationship',
      aliases: ['Toluidine blue', 'Metachromasia', 'Metachromatic granules'],
    },
    {
      key: 'connective-tissue-fibre-stains-by-fibre-type',
      label: 'Each connective tissue fibre has its own colour in each of the fibre stains, and the stain table is what tells the three apart',
      definition:
        'The department book prints the three fibres against the stains that show them. Collagen is pink with eosin, blue with Mallory\'s trichrome and red with van Gieson. Elastic fibres are pink with eosin, brown with orcein and yellow with van Gieson. Reticular fibres are not visible in H&E at all; silver stains them brown — the reason they are called argyrophilic — and PAS stains them red, because of their high sugar content. Van Gieson is therefore the one stain that separates collagen from elastic in a single section by colour alone, red against yellow, and silver is the only way to see a reticular fibre.',
      objective:
        'Give the colour each of the three connective tissue fibres takes with H&E, Mallory, van Gieson, orcein, silver and PAS, and choose the right stain when asked to demonstrate one fibre.',
      pitfall:
        'Answering "brown" without asking which brown. Orcein browns elastic fibres and silver browns reticular fibres; naming the colour is not naming the stain, and the two fibres look nothing alike once shown.',
      subject: 'fnd', primary: 'DIS-HIS-T04', secondary: ['DIS-HIS-T02'],
      modulePath: '101 ISK > Histology > Connective Tissue > Connective Tissue Fibres',
      type: 'comparison',
      aliases: ['Mallory trichrome', 'Van Gieson', 'Orcein', 'Silver impregnation'],
    },
    {
      key: 'mucoid-ct-is-jelly-rich-in-hyaluronic-acid',
      label: 'Mucoid connective tissue is a soft jelly rich in hyaluronic acid, found in the umbilical cord, the vitreous and the dental pulp',
      definition: 'Mucoid connective tissue contains mainly fibroblasts with fine collagen and reticular fibres in a large amount of soft jelly-like ground substance rich in mucus and hyaluronic acid. It is found in the umbilical cord, where it is called Wharton\'s jelly, in the vitreous humour of the eye and in the pulp of the teeth. Its role is supportive.',
      objective: 'Recognise mucoid connective tissue by its ground substance and name its three sites.',
      pitfall: 'Reaching for loose areolar connective tissue because it too has abundant ground substance. What marks mucoid tissue out is that the matrix is jelly and the cells are almost only fibroblasts.',
      subject: 'fnd', primary: 'DIS-HIS-T02', secondary: [],
      modulePath: '101 ISK > Histology > Connective Tissue > Types of Connective Tissue Proper',
      type: 'structural_description',
    },
  ],

  questions: [
    {
      key: 'most-common-cell-in-connective-tissue-is-d3f2effb',
      conceptKey: 'fibroblast-features-function',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the commonest cell of connective tissue.',
      explanations: {
        A: 'Correct. The fibroblast is the commonest cell of connective tissue proper — it is the cell that built the tissue.',
        B: 'Plasma cells are free cells, numerous only in lymphoid tissue and at sites of chronic inflammation.',
        C: 'Mast cells are scattered, chiefly around blood vessels and under the epithelium of gut and lung.',
        D: 'Macrophages are numerous where there is something to eat, but they are immigrants from the blood rather than the resident population.',
      },
    },
    {
      key: 'regarding-fibroblasts-all-of-the-following-are-true-except-d11f9d64',
      conceptKey: 'fibroblast-features-function',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Recognise the fibroblast as the commonest connective tissue cell.',
      explanations: {
        A: 'The exception, and the answer. Fibroblasts are the commonest cell of connective tissue proper, not rare ones.',
        B: 'True, so not the exception. Producing collagen is the fibroblast\'s chief work.',
        C: 'True, so not the exception. In dense connective tissue there is little but collagen and fibroblasts.',
        D: 'True as the books mean it, so not the exception. The fibroblast is a differentiated cell and does not divide in ordinary circumstances; new fibroblasts come from undifferentiated mesenchymal cells and pericytes, and mitoses appear only when a wound demands them.',
      },
    },
    {
      key: 'collagen-fibers-are-mainly-synthesized-by-397ebdb5',
      conceptKey: 'fibroblast-features-function',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the cell that makes collagen in connective tissue proper.',
      explanations: {
        A: 'Mast cells store and release heparin and histamine. They build nothing.',
        B: 'Macrophages digest — including old collagen. They are the demolition half of the pair, not the construction half.',
        C: 'Correct. Fibroblasts synthesise collagen, and in connective tissue proper they are the main source of it.',
        D: 'Plasma cells are protein-synthesising cells, but the protein is antibody, which is exported into the plasma rather than laid down as fibre.',
      },
    },
    {
      key: 'which-connective-tissue-cell-type-produces-collagen-73d8bd11',
      conceptKey: 'fibroblast-features-function',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the collagen-producing connective tissue cell.',
      explanations: {
        A: 'Correct. The fibroblast.',
        B: 'The connective tissue macrophage phagocytoses; it makes no fibre.',
        C: 'Histiocyte is simply the other name for the connective tissue macrophage, so B and C are the same cell offered twice — which is a clue that neither is the answer.',
        D: 'The plasma cell makes antibody.',
      },
    },
    {
      key: 'the-ground-substance-of-connective-tissue-is-synthesized-mai-cd0927fe',
      conceptKey: 'fibroblast-features-function',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Attribute the ground substance to the fibroblast as well as the fibres.',
      explanations: {
        A: 'Mast cells release heparin into the tissue, which is a glycosaminoglycan — but releasing a stored mediator is not synthesising the matrix.',
        B: 'Macrophages break the matrix down during remodelling; they do not lay it down.',
        C: 'Correct. The fibroblast makes both the fibres and the ground substance they lie in.',
        D: 'The plasma cell exports antibody and nothing structural.',
      },
    },
    {
      key: 'elastic-fibers-are-formed-by-2c26970b',
      conceptKey: 'fibroblast-features-function',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Attribute the elastic fibre to the same cell that makes collagen.',
      explanations: {
        A: 'Correct. The fibroblast secretes elastin and fibrillin as well as collagen — one cell makes all three fibre types.',
        B: 'Macrophages are phagocytes. This is the option chosen by students who assume a different fibre must mean a different cell.',
        C: 'Fat cells store lipid and secrete leptin.',
        D: 'Mast cells secrete heparin and histamine.',
      },
    },
    {
      key: 'all-the-followings-are-concerned-to-the-function-of-the-fibr-649df5cb',
      conceptKey: 'fibroblast-features-function',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Keep epithelial growth off the fibroblast\'s list of functions.',
      explanations: {
        A: 'True, so not the exception. Elastin and fibrillin are both fibroblast products — fibrillin is the microfibril scaffold the elastin is laid on.',
        B: 'True, so not the exception. Collagen is its principal product.',
        C: 'True, so not the exception. Wound healing is the fibrocyte turning active again and laying down new collagen.',
        D: 'The exception, and the answer. Epithelium grows on its own account, from its own stem cells; the fibroblast supplies the connective tissue beneath it and does not drive it.',
      },
    },
    {
      key: 'fibroblast-has-the-following-functions-except-15bee59f',
      conceptKey: 'fibroblast-features-function',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Keep heparin off the fibroblast\'s list.',
      explanations: {
        A: 'True, so not the exception. All three fibre types are fibroblast products.',
        B: 'True, so not the exception. The ground substance is made by the same cell.',
        C: 'True, so not the exception, and the same fact as A named more narrowly.',
        D: 'The exception, and the answer. Heparin comes from the mast cell — and the mast cell often sits right beside the fibroblast in loose connective tissue, which is what makes the swap easy.',
      },
    },
    {
      key: 'a-female-was-exposed-to-car-accident-while-driving-resulting-34e5110d',
      conceptKey: 'fibroblast-features-function',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Name the cell that heals a wound.',
      answerOverride: 'A',
      answerOverrideReason:
        'Neither printing of this case carries a key. Wound healing is the laying down of new collagen and ground substance, which is the fibroblast\'s work — the department book gives repair of injuries among its functions and says the fibrocyte becomes active again for wound healing.',
      explanations: {
        A: 'Correct. The fibrocyte reverts to an active fibroblast and lays down the collagen that closes the wound.',
        B: 'Fat cells fill the space beneath the skin and store lipid. They contribute bulk, not repair — and in the obese, an excess of them actually delays healing.',
        C: 'Mast cells release histamine in the first minutes of injury and open the vessels; that is the inflammatory phase, not the healing one.',
        D: 'Plasma cells make antibody and appear in chronic inflammation. They fight infection rather than close a wound.',
      },
    },
    {
      key: 'the-following-c-t-cells-are-a-protein-secreting-cells-46a76caa',
      conceptKey: 'rough-endoplasmic-reticulum-structure-and-protein-export',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Name the two connective tissue cells built for protein export.',
      explanations: {
        A: 'The fat cell stores lipid and the macrophage digests; neither has the rough endoplasmic reticulum of an exporter.',
        B: 'Half right — the fibroblast is one of the two — but the fat cell is not a protein-secreting cell, whatever its leptin output.',
        C: 'Half right the other way: the plasma cell is one of the two, and the macrophage is not.',
        D: 'Correct. The fibroblast, exporting collagen, and the plasma cell, exporting antibody, are the two protein-secreting cells of connective tissue, and both are deeply basophilic for the same reason.',
      },
    },
    {
      key: 'which-of-the-following-cells-of-the-connective-tissue-is-ric-bc1fe204',
      conceptKey: 'rough-endoplasmic-reticulum-structure-and-protein-export',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Name the connective tissue cell with the most rough endoplasmic reticulum.',
      explanations: {
        A: 'The fibrocyte is the resting fibroblast, with little rough endoplasmic reticulum — the active form would be a better answer than this one.',
        B: 'The monocyte is a blood cell with pale non-granular cytoplasm and lysosomes; its work is digestion, not export.',
        C: 'Correct. The plasma cell is packed with rough endoplasmic reticulum, which is why its cytoplasm is the most deeply basophilic in connective tissue.',
        D: 'The adipocyte is almost entirely one lipid droplet, with the cytoplasm squeezed into a rim.',
      },
    },
    {
      key: 'rer-is-present-in-the-following-except-b3ad726e',
      conceptKey: 'rough-endoplasmic-reticulum-structure-and-protein-export',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Name the cell whose endoplasmic reticulum is smooth rather than rough.',
      explanations: {
        A: 'True, so not the exception. The plasma cell is the type example of a rough-ER-rich cell.',
        B: 'True, so not the exception. The pancreatic acinar cell exports digestive enzymes and is full of rough ER.',
        C: 'The exception, and the answer. The liver cell is dominated by *smooth* endoplasmic reticulum, for lipid and steroid synthesis and for detoxification — it has rough ER as well, but the question is asking which of the four is not characterised by it.',
        D: 'True, so not the exception. The active fibroblast is a protein-synthesising cell.',
      },
    },
    {
      key: 'ser-is-present-in-64c0db92',
      conceptKey: 'ser-structure-function-steroid-detoxification',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Name both cells rich in smooth endoplasmic reticulum.',
      explanations: {
        A: 'True but incomplete. The liver cell uses smooth ER for lipid synthesis and for detoxification.',
        B: 'The plasma cell is the opposite — rough ER throughout, for antibody export.',
        C: 'True but incomplete. A steroid-secreting endocrine cell is built on smooth ER.',
        D: 'Correct. Liver cells and steroid-forming endocrine cells, the two classic sites.',
      },
    },
    {
      key: 'smooth-endoplasmic-reticulum-is-seen-in-796d4f97',
      conceptKey: 'ser-structure-function-steroid-detoxification',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the cell with abundant smooth endoplasmic reticulum.',
      explanations: {
        A: 'Correct. The liver cell — for lipid and steroid synthesis and for the detoxification of drugs.',
        B: 'The muscle cell has a specialised form of it, the sarcoplasmic reticulum, which stores calcium; but the cell the books name for smooth ER is the hepatocyte.',
        C: 'The plasma cell is rough ER from end to end.',
        D: 'The fat cell stores its lipid as a droplet in the cytosol, not in a membrane system.',
      },
    },
    {
      key: 'the-cell-responsible-for-production-of-antibodies-is-147cfb54',
      conceptKey: 'plasma-cell-features-function',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the antibody-producing cell.',
      explanations: {
        A: 'The fibroblast exports protein, but structural protein — collagen and elastin.',
        B: 'Correct. The plasma cell synthesises and secretes antibody.',
        C: 'The mast cell releases mediators it has stored, not proteins it has made to order.',
        D: 'The macrophage presents the antigen that starts the response and then leaves the antibody to the plasma cell.',
      },
    },
    {
      key: 'plasma-cells-secrete-c77cb034',
      conceptKey: 'plasma-cell-features-function',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Give the plasma cell\'s product.',
      explanations: {
        A: 'Heparin is a mast cell granule constituent.',
        B: 'Histamine likewise.',
        C: 'Correct. Antibodies — immunoglobulin — are what the plasma cell exists to make.',
        D: '"Both a & b" is the answer to the mast cell version of this question, printed on the same page with the same options.',
      },
    },
    {
      key: 'cartwheel-nucleus-is-present-in-5ecb7541',
      conceptKey: 'plasma-cell-features-function',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Attribute the cart-wheel nucleus to the plasma cell.',
      explanations: {
        A: 'The fibroblast has a large pale oval nucleus with a prominent nucleolus — an active nucleus, but not patterned.',
        B: 'Correct. The plasma cell\'s eccentric nucleus alternates dark heterochromatin with pale euchromatin in radiating blocks: the cart-wheel, or clock face.',
        C: 'The mast cell\'s nucleus is central, spherical and pale, and is usually hidden by the granules over it.',
        D: 'The macrophage\'s nucleus is kidney-shaped, which is the other named nuclear shape in this chapter.',
      },
    },
    {
      key: 'which-one-of-the-following-c-t-cells-its-nucleus-has-a-clock-0ca42b38',
      conceptKey: 'plasma-cell-features-function',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Recognise the clock-face nucleus as the cart-wheel under its other name.',
      explanations: {
        A: 'The mast cell nucleus is pale, round and central.',
        B: 'The macrophage nucleus is kidney-shaped and eccentric.',
        C: 'The fibroblast nucleus is a large pale oval with a nucleolus.',
        D: 'Correct. Clock face and cart wheel are two names for the same radiating chromatin pattern of the plasma cell nucleus.',
      },
    },
    {
      key: 'russell-bodies-are-spherical-inclusion-present-in-1564c965',
      conceptKey: 'plasma-cell-features-function',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Attribute Russell bodies to the plasma cell and explain what they are.',
      explanations: {
        A: 'A fat cell contains one droplet of lipid, not spherical protein inclusions.',
        B: 'Correct. Russell bodies are accumulations of immunoglobulin distending the rough endoplasmic reticulum of a plasma cell that is making antibody faster than it can export it.',
        C: 'A phagocytic cell contains phagosomes and residual bodies — inclusions, but of ingested material rather than of its own product.',
        D: 'An endothelial cell is a thin lining cell with no notable inclusions.',
      },
    },
    {
      key: 'negative-golgi-image-is-seen-in-e1c39ee4',
      conceptKey: 'golgi-apparatus-lm-appearance-and-position',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Name the cell in which the negative Golgi image is best seen.',
      explanations: {
        A: 'The mast cell\'s cytoplasm is crowded with granules; a pale unstained patch would not stand out and is not what the cell is known for.',
        B: 'The macrophage\'s cytoplasm is pale throughout, so there is no dark background for a pale area to show against.',
        C: 'The active fibroblast is basophilic and does have a Golgi, but it is the plasma cell that the books name — its basophilia is the deepest of any connective tissue cell.',
        D: 'Correct. The plasma cell\'s deeply basophilic cytoplasm makes the unstained Golgi region show as a clear pale area beside the nucleus.',
      },
    },
    {
      key: 'the-cell-derived-from-b-lymphocytes-is-04a5fb17',
      conceptKey: 'b-lymphocyte-becomes-the-plasma-cell',
      difficulty: 'Easy', questionType: 'Developmental process',
      learningObjective: 'Trace the plasma cell to the B lymphocyte.',
      explanations: {
        A: 'The mast cell comes from the undifferentiated mesenchymal cell, in connective tissue.',
        B: 'Correct. The B lymphocyte, on meeting its antigen and being helped by a T cell, becomes a plasmablast and then a plasma cell.',
        C: 'The fibroblast comes from the undifferentiated mesenchymal cell and the pericyte.',
        D: 'The macrophage comes from the blood monocyte — which is the other lineage question on this page and has a different answer.',
      },
    },
    {
      key: 'which-connective-tissue-cell-is-derived-from-b-lymphocytes-27372f6f',
      conceptKey: 'b-lymphocyte-becomes-the-plasma-cell',
      difficulty: 'Easy', questionType: 'Developmental process',
      learningObjective: 'Trace the plasma cell to the B lymphocyte.',
      explanations: {
        A: 'The fibroblast is mesenchymal in origin and has nothing to do with the immune lineages.',
        B: 'The mast cell is also mesenchymal, despite behaving like a basophil.',
        C: 'The histiocyte is the connective tissue macrophage and comes from the monocyte.',
        D: 'Correct. The plasma cell.',
      },
    },
    {
      key: 'b-lymphocytes-can-f540974e',
      conceptKey: 'b-lymphocyte-becomes-the-plasma-cell',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Say what a B lymphocyte does when it meets its antigen.',
      explanations: {
        A: 'Ingesting organisms is the neutrophil\'s and macrophage\'s work. The lymphocyte has no phagocytic apparatus.',
        B: 'Correct. On activation it becomes a plasmablast and then a plasma cell, which secretes antibody.',
        C: 'The macrophage comes from the monocyte, not from any lymphocyte — this is the standard confusion between the two responses.',
        D: 'Histamine is secreted by the mast cell and the basophil.',
      },
    },
    {
      key: 'basophilic-granules-are-present-in-d83bb504',
      conceptKey: 'mast-cell-lm-em-metachromasia',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Attribute granular basophilia to the mast cell.',
      explanations: {
        A: 'The fibroblast\'s basophilia is diffuse, from its ribosomes, and it has no granules.',
        B: 'The plasma cell is the most basophilic cell of all, but again diffusely — a fact worth holding, because the word in the stem is "granules".',
        C: 'Correct. The mast cell is packed with coarse basophilic granules, which toluidine blue also stains metachromatically.',
        D: 'The macrophage\'s cytoplasm is pale and its lysosomes are too fine to read as granules by light microscopy.',
      },
    },
    {
      key: 'which-one-of-the-following-c-t-cells-has-receptors-for-immun-12b90f12',
      conceptKey: 'mast-cell-lm-em-metachromasia',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Attribute IgE receptors to the mast cell.',
      explanations: {
        A: 'Correct. The mast cell carries IgE receptors on its surface, which is how an allergen triggers it.',
        B: 'The macrophage has receptors for the Fc of IgG and for complement, which help it phagocytose opsonised material — related receptors for a different immunoglobulin and a different purpose.',
        C: 'The fibroblast carries no immunoglobulin receptors at all.',
        D: 'The plasma cell makes immunoglobulin rather than binding it; a receptor for its own product would be self-defeating.',
      },
    },
    {
      key: 'mast-cells-secrete-455c9fa8',
      conceptKey: 'mast-cell-granule-contents-and-the-anaphylactic-reaction',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name both principal mast cell products.',
      explanations: {
        A: 'True but incomplete. Heparin is the anticoagulant of the granule and is what makes it metachromatic.',
        B: 'True but incomplete. Histamine is the vasodilator.',
        C: 'Antibodies come from the plasma cell. The mast cell binds antibody made by someone else.',
        D: 'Correct. Heparin and histamine together, and a student who takes the first true option has half the granule.',
      },
    },
    {
      key: 'mast-cells-synthesize-and-secrete-47d982aa',
      conceptKey: 'mast-cell-granule-contents-and-the-anaphylactic-reaction',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'List the mast cell granule contents as the books give them.',
      explanations: {
        A: 'True but incomplete.',
        B: 'True but incomplete.',
        C: 'True but incomplete as the books have it: serotonin is listed among the mast cell\'s secretions alongside heparin and histamine.',
        D: 'Correct. All three.',
      },
    },
    {
      key: 'mast-cells-synthesize-and-secrete-all-of-the-following-excep-11a2b817',
      conceptKey: 'mast-cell-granule-contents-and-the-anaphylactic-reaction',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Keep histaminase, the eosinophil\'s enzyme, off the mast cell.',
      explanations: {
        A: 'True, so not the exception.',
        B: 'True, so not the exception.',
        C: 'True, so not the exception, as the books list it.',
        D: 'The exception, and the answer. Histaminase destroys histamine and is secreted by the eosinophil, which arrives to end the reaction the mast cell started. One syllable separates the mediator from its antidote.',
      },
    },
    {
      key: 'which-of-the-following-cells-is-the-precursor-of-histamine-h-b9acdb2d',
      conceptKey: 'mast-cell-granule-contents-and-the-anaphylactic-reaction',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the source of histamine and heparin in connective tissue.',
      explanations: {
        A: 'The fibroblast makes fibres and ground substance.',
        B: 'Correct. The mast cell stores both in its granules and releases them together.',
        C: 'The plasma cell makes antibody.',
        D: 'The macrophage digests, and secretes cytokines rather than amines.',
      },
    },
    {
      key: 'which-connective-tissue-cell-type-secretes-histamine-9be3bcf4',
      conceptKey: 'mast-cell-granule-contents-and-the-anaphylactic-reaction',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the histamine-secreting connective tissue cell.',
      explanations: {
        A: 'The fibroblast makes structural protein.',
        B: 'The fibrocyte is the same cell resting, and makes even less.',
        C: 'Correct. The mast cell.',
        D: 'The plasma cell makes antibody — and it is antibody of the IgE class, bound to the mast cell, that triggers the histamine release. The two cells work in sequence, which is why they are so often offered together.',
      },
    },
    {
      key: 'after-receiving-penicillin-injection-a-patient-suffered-from-97d6c896',
      conceptKey: 'mast-cell-granule-contents-and-the-anaphylactic-reaction',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Attribute an allergic reaction to mast cell histamine.',
      explanations: {
        A: 'Fibroblast growth factors drive repair over days. An allergic reaction takes minutes.',
        B: 'Adipocyte lipid is storage, not signalling.',
        C: 'Plasma cell antibody is what sensitised the patient in the first place, but the reaction itself is the release triggered when the allergen meets that antibody on a mast cell.',
        D: 'Correct. Histamine from mast cell granules produces the vasodilatation, oedema and fall in blood pressure of the allergic reaction.',
      },
    },
    {
      key: 'a-2-year-old-girl-with-itchy-skin-respiratory-distress-is-br-6aa27462',
      conceptKey: 'mast-cell-granule-contents-and-the-anaphylactic-reaction',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Name the cell whose mediator raises vascular permeability in anaphylaxis.',
      answerOverride: 'C',
      answerOverrideReason:
        'Neither printing of this case carries a key. The increased vascular permeability of an immediate allergic reaction is produced by histamine, and in the tissues — skin, lips, eyelids, airway — the cell that releases it is the mast cell.',
      explanations: {
        A: 'The eosinophil arrives later and secretes histaminase and sulphatase to end the reaction. It is a raised eosinophil count that marks allergy, not the eosinophil that causes it.',
        B: 'Macrophages phagocytose and present antigen; they release no vasoactive amine.',
        C: 'Correct. Allergen cross-links IgE on the mast cell surface, the granules discharge, and histamine dilates vessels and opens their junctions — flushing, swollen lips and eyelids, and a blood pressure of 90/40.',
        D: 'The plasma cell made the IgE that sensitised the child, days or weeks earlier. It is upstream of the reaction, not the cause of the permeability.',
      },
    },
    {
      key: 'a-17-year-old-girl-received-a-penicillin-injection-for-treat-f3300143',
      conceptKey: 'basophil-granule-contents-and-anaphylaxis',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Name the blood cell responsible for anaphylactic shock.',
      answerOverride: 'D',
      answerOverrideReason:
        'The books print no key. The stem asks which cell is responsible for an anaphylactic shock fifteen minutes after an intravenous drug, and of the four blood and connective tissue cells offered only the basophil releases histamine — the department book names the histamine release of the basophil as anaphylaxis in so many words.',
      explanations: {
        A: 'The plasma cell made the IgE that sensitised her, but the shock itself is the discharge of granules from the cell that IgE is bound to.',
        B: 'The fibroblast has no part in an immediate reaction.',
        C: 'The eosinophil is drawn in to terminate the reaction — it destroys histamine with histaminase — so it is the brake rather than the accelerator.',
        D: 'Correct. The basophil, the blood counterpart of the mast cell, carries IgE receptors and releases histamine; the vasodilatation and sudden fall in blood pressure that follow are what anaphylaxis is.',
      },
    },
    {
      key: 'metachromatic-granules-are-present-in-ff0b4b3d',
      conceptKey: 'metachromatic-stain-toluidine-blue-and-heparin',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Attribute metachromatic granules to the mast cell.',
      explanations: {
        A: 'Correct. The heparin of the mast cell granule turns toluidine blue purple — metachromasia.',
        B: 'The plasma cell is basophilic but not metachromatic; its blue is the dye\'s own colour.',
        C: 'The fat cell has a lipid droplet and no granules.',
        D: 'The pigment cell holds melanin, which is brown on its own account and needs no dye at all.',
      },
    },
    {
      key: 'which-one-of-the-following-can-be-stained-metachromatically-7daf8adf',
      conceptKey: 'metachromatic-stain-toluidine-blue-and-heparin',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the cell toluidine blue stains metachromatically.',
      explanations: {
        A: 'Correct. The mast cell.',
        B: 'The macrophage is shown by trypan blue in the living animal, or by acid phosphatase histochemistry.',
        C: 'The fibroblast takes haematoxylin diffusely and metachromatically nothing.',
        D: 'The plasma cell is the other deeply basophilic cell, and the one this question exists to exclude.',
      },
    },
    {
      key: 'which-of-the-following-cells-has-metachromatic-granules-b7f93ce6',
      conceptKey: 'metachromatic-stain-toluidine-blue-and-heparin',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Name both cells with metachromatic granules.',
      explanations: {
        A: 'The lymphocyte has a thin agranular rim of cytoplasm and no granules to be metachromatic.',
        B: 'Correct. The mast cell and the blood basophil, which share their heparin-rich granules, their IgE receptors and this staining reaction.',
        C: 'The plasma cell is basophilic without being metachromatic — the distinction this whole group of questions is built on.',
        D: '"Mast cells" alone is true but incomplete, and incomplete is wrong when the fuller option is on the list.',
      },
    },
    {
      key: 'macrophages-originate-from-5ccc2776',
      conceptKey: 'monocyte-is-the-largest-leukocyte-and-becomes-the-macrophage',
      difficulty: 'Easy', questionType: 'Developmental process',
      learningObjective: 'Trace the macrophage to the blood monocyte.',
      explanations: {
        A: 'The chondroblast makes cartilage matrix and is a fixed cell of a different tissue.',
        B: 'The plasma cell is the other end of the immune system — it comes from the B lymphocyte and makes antibody.',
        C: 'The mast cell is mesenchymal in origin and is not a phagocyte.',
        D: 'Correct. The blood monocyte enters the tissue and becomes the macrophage.',
      },
    },
    {
      key: 'monocyte-can-give-rise-to-c0233404',
      conceptKey: 'monocyte-is-the-largest-leukocyte-and-becomes-the-macrophage',
      difficulty: 'Easy', questionType: 'Developmental process',
      learningObjective: 'Name what the monocyte becomes in tissue.',
      explanations: {
        A: 'Mast cells arise in the connective tissue itself, from undifferentiated mesenchymal cells.',
        B: 'Plasma cells come from B lymphocytes.',
        C: 'Correct. In connective tissue the monocyte becomes the macrophage — and in liver the Kupffer cell, in lung the dust cell, in bone the osteoclast, in the brain the microglia.',
        D: 'Lymphocytes arise from lymphoid precursors and are a separate line from the monocyte altogether.',
      },
    },
    {
      key: 'which-one-of-the-following-originates-from-the-blood-monocyt-fcb6ac31',
      conceptKey: 'monocyte-is-the-largest-leukocyte-and-becomes-the-macrophage',
      difficulty: 'Easy', questionType: 'Developmental process',
      learningObjective: 'Name the connective tissue cell of monocyte origin.',
      explanations: {
        A: 'The mast cell is mesenchymal. It resembles the basophil, which does come from the marrow, but it is not that cell grown up.',
        B: 'Correct. The macrophage.',
        C: 'The fibroblast is mesenchymal.',
        D: 'The plasma cell comes from the B lymphocyte.',
      },
    },
    {
      key: 'the-main-function-of-histiocyte-macrophage-is-c8c0259a',
      conceptKey: 'monocyte-is-the-largest-leukocyte-and-becomes-the-macrophage',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Give the macrophage\'s main function.',
      explanations: {
        A: 'Antibody secretion is the plasma cell\'s.',
        B: 'Histamine secretion is the mast cell\'s.',
        C: 'Correct. Phagocytosis — the cell is named for it, macro-phage, the big eater.',
        D: 'Exocytosis is a mechanism every secretory cell uses, not a function that identifies a cell.',
      },
    },
    {
      key: 'which-cell-is-a-connective-tissue-macrophage-00fb611a',
      conceptKey: 'monocyte-is-the-largest-leukocyte-and-becomes-the-macrophage',
      difficulty: 'Moderate', questionType: 'Classification',
      learningObjective: 'Give the macrophage\'s name in connective tissue among its names in other tissues.',
      explanations: {
        A: 'The Kupffer cell is the macrophage of the liver sinusoid.',
        B: 'Correct. Histiocyte is the connective tissue macrophage\'s own name.',
        C: 'The dust cell is the macrophage of the lung alveolus.',
        D: 'The Langerhans cell is the antigen-presenting cell of the epidermis. All four are the same lineage under four names, and only one of them belongs to connective tissue.',
      },
    },
    {
      key: 'which-one-of-the-following-c-t-cells-is-typically-an-antigen-cdd2224d',
      conceptKey: 'monocyte-is-the-largest-leukocyte-and-becomes-the-macrophage',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the antigen-presenting cell of connective tissue.',
      explanations: {
        A: 'The mast cell binds antigen through IgE and reacts to it; it does not present it to a T cell.',
        B: 'Correct. The macrophage engulfs the antigen and presents it to the helper T lymphocyte, which is how both immune responses begin.',
        C: 'The fibroblast has no immunological role.',
        D: 'The plasma cell is the product of antigen presentation, not the agent of it.',
      },
    },
    {
      key: 'antigen-presenting-cells-are-1e0f895d',
      conceptKey: 'monocyte-is-the-largest-leukocyte-and-becomes-the-macrophage',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Name the second antigen-presenting cell beside the macrophage.',
      explanations: {
        A: 'Correct. Macrophages and reticular cells: the reticular cell of lymphoid tissue is phagocytic and presents antigen, which is why the books pair the two.',
        B: 'The plasma cell is the end of the response, not its beginning.',
        C: 'The mast cell reacts to antigen through bound IgE; it presents nothing.',
        D: 'The fibroblast plays no immunological part at all.',
      },
    },
    {
      key: 'kidney-shaped-nucleus-is-present-in-0e1036f5',
      conceptKey: 'monocyte-is-the-largest-leukocyte-and-becomes-the-macrophage',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Attribute the kidney-shaped nucleus to the macrophage.',
      explanations: {
        A: 'The fibroblast\'s nucleus is a large pale oval with a prominent nucleolus.',
        B: 'The plasma cell\'s nucleus is eccentric with a cart-wheel pattern.',
        C: 'The mast cell\'s nucleus is central, spherical and pale.',
        D: 'Correct. The macrophage keeps the eccentric kidney-shaped nucleus of the monocyte it came from.',
      },
    },
    {
      key: 'pericytes-of-the-connective-tissue-arises-from-0ccf61ed',
      conceptKey: 'pericyte-and-undifferentiated-mesenchymal-cell',
      difficulty: 'Moderate', questionType: 'Developmental process',
      learningObjective: 'Trace the pericyte to the undifferentiated mesenchymal cell.',
      explanations: {
        A: 'The reticular cell is itself a modified fibroblast and produces reticular fibres; it is a sibling rather than a parent.',
        B: 'The fibroblast is one of the things a pericyte can become, so this reverses the direction.',
        C: 'Correct. The pericyte arises from the undifferentiated mesenchymal cell — which is why it keeps the power to become something else.',
        D: 'The macrophage comes from the monocyte and gives rise to nothing.',
      },
    },
    {
      key: 'which-cell-is-present-around-blood-capillaries-02d05730',
      conceptKey: 'pericyte-and-undifferentiated-mesenchymal-cell',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the cell that wraps a capillary.',
      explanations: {
        A: 'Mast cells lie *near* blood vessels, which is what makes this the strongest distractor — but they lie beside them, not wrapped around the endothelium inside its basement membrane.',
        B: 'Macrophages wander through the tissue and are not fixed to vessels.',
        C: 'Correct. The pericyte lies along the capillary, sharing its basement membrane and embracing the endothelium with long processes.',
        D: 'Plasma cells are free cells of the tissue at large.',
      },
    },
    {
      key: 'under-certain-conditions-pericytes-of-the-connective-tissue-a9606c24',
      conceptKey: 'pericyte-and-undifferentiated-mesenchymal-cell',
      difficulty: 'Moderate', questionType: 'Developmental process',
      learningObjective: 'List everything a pericyte can become.',
      explanations: {
        A: 'True but incomplete. After injury it can replace lost endothelium.',
        B: 'True but incomplete. It is one of the two sources of new fibroblasts.',
        C: 'True but incomplete. It can become smooth muscle, which is what it already half is.',
        D: 'Correct. All three, which is the point of calling it undifferentiated.',
      },
    },
    {
      key: 'which-one-of-the-connective-tissue-cell-can-differentiate-in-1766980c',
      conceptKey: 'pericyte-and-undifferentiated-mesenchymal-cell',
      difficulty: 'Moderate', questionType: 'Developmental process',
      learningObjective: 'Name the connective tissue cell that can replace endothelium.',
      explanations: {
        A: 'The macrophage is a terminal cell — it comes from the monocyte and becomes nothing further.',
        B: 'The plasma cell is likewise terminal and short-lived.',
        C: 'Correct. The pericyte lies against the endothelium and can become endothelium after injury.',
        D: 'The mast cell is terminal too.',
        E: 'The fibroblast is differentiated; it is one of the things a pericyte becomes, not a cell that becomes something else.',
      },
    },
    {
      key: 'after-injury-of-adult-c-t-the-following-cells-differentiate-98a950e2',
      conceptKey: 'pericyte-and-undifferentiated-mesenchymal-cell',
      difficulty: 'Hard', questionType: 'Clinical application',
      learningObjective: 'Name the two cells repair calls on.',
      explanations: {
        A: 'The mast cell opens the vessels in the first minutes of injury but lays down nothing.',
        B: 'Correct. Pericytes divide and differentiate to supply new cells, and fibroblasts lay down the collagen; the pair is what repair needs.',
        C: 'Reticular cells and histiocytes belong to organ stroma and to phagocytosis respectively.',
        D: 'Plasma cells appear in chronic inflammation and make antibody, not matrix.',
      },
    },
    {
      key: 'incase-of-injury-pericytes-can-differentiate-into-c2e80ffa',
      conceptKey: 'pericyte-and-undifferentiated-mesenchymal-cell',
      difficulty: 'Moderate', questionType: 'Developmental process',
      learningObjective: 'Name what a pericyte becomes after injury.',
      answerOverride: 'C',
      answerOverrideReason:
        'The books print no key. The pericyte gives rise to fibroblasts, smooth muscle and endothelium, and of the four options only the fibroblast is on that list — the parallel question `under-certain-conditions-pericytes-of-the-connective-tissue-a9606c24` names all three and is keyed to "all of the above".',
      explanations: {
        A: 'The chondrocyte comes from the chondroblast, in cartilage, and no connective tissue pericyte becomes one.',
        B: 'The histiocyte is the connective tissue macrophage and comes from the blood monocyte. The books ask this the other way round too — "can pericytes become macrophages?" — and the answer is no both times.',
        C: 'Correct. The fibroblast is one of the three the pericyte gives rise to, and the one repair needs most.',
        D: 'Lymphocytes come from lymphoid precursors in the marrow and thymus.',
      },
    },
    {
      key: 'all-of-the-following-about-pericytes-are-correct-except-af0909ec',
      conceptKey: 'pericyte-and-undifferentiated-mesenchymal-cell',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Keep the macrophage lineage out of the pericyte\'s repertoire.',
      explanations: {
        A: 'The exception, and the answer. The macrophage comes from the blood monocyte. The pericyte is undifferentiated and versatile, which is exactly why students grant it a lineage it does not have.',
        B: 'True, so not the exception. Its actin and myosin let it contract and so regulate capillary flow.',
        C: 'True, so not the exception. It lies along the capillary within the basement membrane.',
        D: 'True, so not the exception. Endothelium and smooth muscle are both within its power.',
      },
    },
    {
      key: 'all-of-the-following-cells-synthesize-collagen-except-21c4f616',
      conceptKey: 'connective-tissue-fibres-collagen-reticular-and-elastic',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Recognise the several cells that make collagen and the one that does not.',
      explanations: {
        A: 'True, so not the exception. The chondroblast makes the type II collagen of cartilage.',
        B: 'True, so not the exception. The odontoblast makes the collagen of dentine.',
        C: 'True, so not the exception. The osteoblast makes the type I collagen of bone matrix.',
        D: 'The exception, and the answer. The pericyte is an undifferentiated reserve cell; it can *become* a fibroblast and then make collagen, but as a pericyte it makes none.',
      },
    },
    {
      key: 'collagen-is-secreted-by-all-of-the-following-except-7fd972a9',
      conceptKey: 'connective-tissue-fibres-collagen-reticular-and-elastic',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the cell in a collagen-making list that makes none.',
      explanations: {
        A: 'True, so not the exception. The fibroblast is the type example.',
        B: 'True, so not the exception. Bone matrix is largely type I collagen.',
        C: 'The exception, and the answer. The mast cell stores and releases mediators; it builds nothing.',
        D: 'True, so not the exception. Cartilage matrix is type II collagen.',
      },
    },
    {
      key: 'collagen-fibers-are-formed-by-the-following-cell-f61ccc12',
      conceptKey: 'connective-tissue-fibres-collagen-reticular-and-elastic',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Pick the collagen-forming cell from a list of three that do not.',
      answerOverride: 'C',
      answerOverrideReason:
        'This printing carries no key; the parallel printing at `collagen-fibers-are-formed-by-88f2dbc4`, with the same four options, is keyed to the chondroblast. Of the four cells offered only the chondroblast makes collagen — the macrophage and the histiocyte are the same phagocyte under two names, and the adipocyte stores fat.',
      explanations: {
        A: 'The macrophage digests collagen during remodelling; it makes none.',
        B: 'The histiocyte is the macrophage under its connective tissue name, so options A and B are one cell offered twice — which is itself the signal that neither can be the answer.',
        C: 'Correct. The chondroblast lays down the type II collagen of cartilage matrix.',
        D: 'The adipocyte stores lipid and secretes leptin.',
      },
    },
    {
      key: 'collagen-fibers-are-formed-by-88f2dbc4',
      conceptKey: 'connective-tissue-fibres-collagen-reticular-and-elastic',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Pick the collagen-forming cell from a list of three that do not.',
      explanations: {
        A: 'The macrophage phagocytoses.',
        B: 'The histiocyte is the same cell under another name.',
        C: 'Correct. The chondroblast makes the collagen of cartilage.',
        D: 'The adipocyte stores fat.',
      },
    },
    {
      key: 'the-type-iii-collagen-fibers-are-secreted-by-the-following-c-8989156b',
      conceptKey: 'reticular-fibres-and-reticular-cells',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Name the two cells that make type III collagen.',
      explanations: {
        A: 'The macrophage makes no collagen of any type.',
        B: 'Correct. Type III collagen is the reticular fibre, made by fibroblasts and by the reticular cells of organ stroma, which are themselves modified fibroblasts.',
        C: 'The mast cell secretes mediators.',
        D: 'The plasma cell secretes antibody.',
      },
    },
    {
      key: 'adipocytes-are-of-two-types-9c8972f7',
      conceptKey: 'white-versus-brown-adipose-connective-tissue',
      difficulty: 'Easy', questionType: 'Classification',
      learningObjective: 'Name the two kinds of fat cell.',
      explanations: {
        A: 'Free and fixed is the classification of connective tissue cells in general, not of fat cells — and the fat cell is fixed under it.',
        B: 'Correct. Unilocular, with one droplet, and multilocular, with many.',
        C: 'Primary and secondary describes lysosomes and chorionic villi elsewhere in this course, not adipocytes.',
        D: '"None of the above" fails once B is true.',
      },
    },
    {
      key: 'white-adipose-connective-tissue-0bb77a0b',
      conceptKey: 'white-versus-brown-adipose-connective-tissue',
      difficulty: 'Easy', questionType: 'Classification',
      learningObjective: 'Match white fat to its cell type.',
      explanations: {
        A: 'Multilocular cells make brown fat, whose many droplets and many mitochondria are what let it burn fat for heat.',
        B: 'Correct. White adipose tissue is made of unilocular cells, each holding one large droplet.',
        C: '"All of the above" cannot hold when A and B are alternatives.',
        D: '"None of the above" fails once B is true.',
      },
    },
    {
      key: 'brown-adipose-connective-tissue-is-92f66979',
      conceptKey: 'white-versus-brown-adipose-connective-tissue',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Give both the cell type and the function of brown fat.',
      explanations: {
        A: 'Storage is white fat\'s job. Brown fat spends what it holds.',
        B: 'True but incomplete. Heat production is its function.',
        C: 'True but incomplete. Multilocular fat cells are what it is made of.',
        D: 'Correct. Multilocular cells producing heat, and the two facts explain each other — many small droplets give a large surface for the mitochondria to work on.',
      },
    },
    {
      key: 'which-of-the-following-cells-has-the-mission-of-producing-he-ca6b5640',
      conceptKey: 'white-versus-brown-adipose-connective-tissue',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the heat-producing cell.',
      explanations: {
        A: 'Plasma cells make antibody.',
        B: 'White adipocytes insulate against heat loss, which is not the same as generating heat — the commonest confusion in this pair.',
        C: 'Correct. The brown, multilocular adipocyte burns fat through the thermogenin of its many mitochondria.',
        D: 'Mast cells release mediators.',
      },
    },
    {
      key: 'an-obese-40-year-old-female-suffered-from-delayed-healing-of-0d539fdd',
      conceptKey: 'white-versus-brown-adipose-connective-tissue',
      difficulty: 'Hard', questionType: 'Clinical application',
      learningObjective: 'Explain delayed healing in an obese patient from what fat tissue is like.',
      answerOverride: 'A',
      answerOverrideReason:
        'Neither printing of this case carries a key. Obesity is an increase in white, unilocular fat, and it is that tissue — poorly vascularised and holding few fibroblasts — that heals slowly. Brown fat is negligible in an adult, and an increase in fibroblasts would speed healing rather than delay it.',
      explanations: {
        A: 'Correct. Adipose tissue is poorly vascularised and cell-poor, so a wound through a thick layer of it has a worse blood supply and fewer fibroblasts to work with.',
        B: 'Multilocular brown fat is a tissue of fetal life and infancy, largely replaced by white fat during childhood; an adult has too little for it to matter.',
        C: 'More fibroblasts would mean more collagen and faster healing. The option has the direction reversed.',
        D: 'A fall in fibroblast number would indeed delay healing, but obesity does not cause one — what it causes is more fat between the fibroblasts that are there.',
      },
    },
    {
      key: 'leptin-hormone-is-secreted-by-the-following-cell-319a9a0c',
      conceptKey: 'adipose-ct-stores-insulates-supports-and-secretes-leptin',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Name the cell with an endocrine function among the connective tissue cells.',
      answerOverride: 'D',
      answerOverrideReason:
        'The books print no key. The department book gives adipose connective tissue an endocrine function and names leptin as its hormone, so the cell is the adipocyte.',
      explanations: {
        A: 'The fibroblast secretes fibres and ground substance, and growth factors locally; it is not an endocrine cell.',
        B: 'The histiocyte is the connective tissue macrophage and secretes cytokines that act nearby.',
        C: 'The plasma cell secretes antibody into the plasma, which is a secretion but not a hormone.',
        D: 'Correct. The adipocyte secretes leptin, which inhibits food intake and raises the metabolic rate — fat reporting on its own quantity.',
      },
    },
    {
      key: 'give-orange-color-with-fat-cell-0899ef91',
      conceptKey: 'sudan-shows-fat-and-the-signet-ring-cell',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the stain that colours fat orange.',
      explanations: {
        A: 'Correct. Sudan III stains fat orange, and the section must be a frozen one.',
        B: 'PAS gives magenta red on carbohydrate.',
        C: 'Silver blackens reticular fibres and browns the Golgi.',
        D: 'H&E dissolves the fat away and leaves a signet ring.',
      },
    },
    {
      key: 'which-of-the-following-is-suitable-to-examine-the-fat-cells-1d31aa77',
      conceptKey: 'sudan-shows-fat-and-the-signet-ring-cell',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Choose the technique that shows fat.',
      answerOverride: 'D',
      answerOverrideReason:
        'The books print no key. Fat is demonstrated by a fat stain — Sudan III — on a frozen section; the other three options are a carbohydrate stain, a metal impregnation and an enzyme reaction.',
      explanations: {
        A: 'PAS shows carbohydrate: glycogen, mucus, basement membrane.',
        B: 'Silver shows reticular fibres, nerve tissue and the Golgi.',
        C: 'Acid phosphatase histochemistry identifies lysosomes and so phagocytes.',
        D: 'Correct. Sudan III.',
      },
    },
    {
      key: 'all-of-the-following-is-branched-connective-tissue-cells-exc-63e60765',
      conceptKey: 'connective-tissue-cells-fixed-free-and-which-are-branched',
      difficulty: 'Moderate', questionType: 'Classification',
      learningObjective: 'Sort the connective tissue cells by shape.',
      explanations: {
        A: 'Branched, so not the exception. The pericyte wraps a capillary in long processes.',
        B: 'Branched, so not the exception. The active fibroblast is the most processed cell of all.',
        C: 'The exception, and the answer. The plasma cell is a plump oval with no processes — which suits a cell that exports antibody into the fluid around it rather than reaching out to anything.',
        D: 'Branched, so not the exception. The pigment cell sends dendritic processes between the cells it supplies with melanin.',
      },
    },
    {
      key: 'all-those-connective-tissue-cells-are-branched-except-a9f8601d',
      conceptKey: 'connective-tissue-cells-fixed-free-and-which-are-branched',
      difficulty: 'Moderate', questionType: 'Classification',
      learningObjective: 'Recognise the fat cell as the unbranched extreme.',
      explanations: {
        A: 'Branched, so not the exception.',
        B: 'Branched, so not the exception.',
        C: 'The exception, and the answer. A unilocular fat cell is a sphere distended by a single droplet; there is no room for a process and nothing for one to do.',
        D: 'Branched, so not the exception. The undifferentiated mesenchymal cell keeps the stellate shape of the mesenchyme it came from.',
      },
    },
    {
      key: 'which-one-of-these-cells-is-not-a-cell-type-routinely-found-c1599b92',
      conceptKey: 'connective-tissue-cells-fixed-free-and-which-are-branched',
      difficulty: 'Moderate', questionType: 'Classification',
      learningObjective: 'Reject a phagocyte that belongs to another tissue.',
      explanations: {
        A: 'Found there, so not the answer. The fibroblast is the commonest cell of loose connective tissue.',
        B: 'The answer. Microglia are the macrophages of the central nervous system and are found only there — they share the macrophage\'s lineage, which is exactly what makes the option plausible.',
        C: 'Found there, so not the answer. The histiocyte is the connective tissue macrophage.',
        D: 'Found there, so not the answer. Plasma cells are free cells of loose connective tissue, more numerous where there is chronic inflammation.',
      },
    },
    {
      key: 'asection-in-the-tendon-shows-all-the-following-features-exce-7988c5ae',
      conceptKey: 'dense-white-fibrous-ct-regular-versus-irregular',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Recall that dense regular tissue is nearly all fibre and nearly no free cells.',
      explanations: {
        A: 'True, so not the exception. Dense tissue has little ground substance between its bundles.',
        B: 'The exception, and the answer. A tendon is collagen bundles with fibrocytes squeezed between them and almost nothing else; free cells such as macrophages and mast cells belong to loose connective tissue, where there is room and blood supply for them.',
        C: 'True, so not the exception. Parallel bundles are what make it regular.',
        D: 'True, so not the exception. Tendon is the type example of dense regular white fibrous tissue.',
      },
    },
    {
      key: 'white-fibrous-connective-tissue-0298dd17',
      conceptKey: 'dense-white-fibrous-ct-regular-versus-irregular',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Give the cell of dense white fibrous tissue and reject three properties of loose tissue.',
      answerOverride: 'D',
      answerOverrideReason:
        'The books print no key. Dense white fibrous tissue has little ground substance, a poor blood supply — which is why a tendon heals slowly — and is dominated by collagen rather than carrying all three fibre types. Its cells are fibroblasts and fibrocytes, so only D is true.',
      explanations: {
        A: 'Abundant matrix is loose areolar tissue, and mucoid tissue most of all. Dense tissue is packed with fibre and has little ground substance.',
        B: 'Dense fibrous tissue is poorly vascularised, which is why tendons and ligaments heal so slowly.',
        C: 'It is dominated by collagen. Tissue containing all three fibre types in quantity is loose areolar tissue, the general-purpose one.',
        D: 'Correct. Its cells are fibroblasts, in their resting fibrocyte form, lying in rows between the bundles they made.',
      },
    },
    {
      key: 'fixed-cells-of-bone-marrow-include-the-following-except-adc09a5d',
      conceptKey: 'red-bone-marrow-stroma-and-free-cells',
      difficulty: 'Moderate', questionType: 'Classification',
      learningObjective: 'Separate the marrow stroma from the cells developing in it.',
      explanations: {
        A: 'Fixed, so not the exception. Fibroblasts are part of the stroma.',
        B: 'Fixed, so not the exception. Fat cells are stromal and are the largest cells in the marrow.',
        C: 'Fixed, so not the exception. The sinusoidal endothelium is part of the framework.',
        D: 'The exception, and the answer. The megakaryocyte is a free cell — a developing blood element, shedding platelets into the sinusoid — not part of the scaffolding.',
      },
    },
    {
      key: 'the-largest-cell-in-bone-marrow-is-1a337a60',
      conceptKey: 'red-bone-marrow-stroma-and-free-cells',
      difficulty: 'Hard', questionType: 'Normal values',
      learningObjective: 'Name the largest cell in marrow as the department book has it.',
      explanations: {
        A: 'Correct as the book has it: it names the fat cells as the largest cells of the marrow stroma.',
        B: 'The megakaryocyte is the largest of the *haemopoietic* cells and is what most students answer — at 100 µm it is enormous, but the book\'s statement is about the fat cell, and a distended unilocular adipocyte is larger still.',
        C: 'The reticular cell is a modest stellate cell of the framework.',
        D: 'The fibroblast is likewise ordinary in size.',
      },
    },
    {
      key: 'the-stroma-of-myeloid-tissue-is-formed-of-674a466d',
      conceptKey: 'red-bone-marrow-stroma-and-free-cells',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'List the fixed cells that make up the marrow stroma.',
      explanations: {
        A: 'Platelets are a circulating product, not a structural element.',
        B: 'Lymphocytes are free cells developing in the marrow, not part of its framework.',
        C: 'Correct. Reticular cells, fat cells and fibroblasts — the fixed cells of the stroma, with the reticular fibres and the sinusoids.',
        D: 'Developing blood cells are the free population the stroma supports; this option mixes one stromal cell with them.',
      },
    },
    {
      key: 'the-stroma-of-the-red-bone-marrow-contains-all-the-following-39d0bfd5',
      conceptKey: 'red-bone-marrow-stroma-and-free-cells',
      difficulty: 'Moderate', questionType: 'Classification',
      learningObjective: 'Reject a bone cell offered as part of the marrow stroma.',
      explanations: {
        A: 'Present, so not the exception. Reticular cells with their fibres are the framework.',
        B: 'Present, so not the exception, and the largest cells there.',
        C: 'The exception, and the answer. The osteocyte is a bone cell, walled into its lacuna in the bone around the marrow cavity. Osteo*genic* cells are in the stroma; osteo*cytes* are in the bone, and one syllable moves the cell out of the tissue.',
        D: 'Present, so not the exception. Macrophages of the marrow phagocytose the extruded nuclei of developing red cells.',
        E: 'Present, so not the exception. Fibroblasts are stromal.',
      },
    },
    {
      key: 'in-the-red-bone-marrow-you-can-recognize-390999dd',
      conceptKey: 'red-bone-marrow-stroma-and-free-cells',
      difficulty: 'Moderate', questionType: 'Classification',
      learningObjective: 'Recall that marrow contains both the stroma and the cells developing in it.',
      answerOverride: 'D',
      answerOverrideReason:
        'The books key this to B. All three of the first options are true of red bone marrow — the stroma holds fat cells, fibroblasts, endothelial cells, macrophages and reticular cells, and the free population is the developing blood cells — so with "all of the above" on the list, no single one of them can be the answer.',
      explanations: {
        A: 'True but incomplete. Fat cells, fibroblasts and the sinusoidal endothelium are all stromal elements.',
        B: 'True but incomplete, and the option the books key this question to. Macrophages and reticular cells are there too.',
        C: 'True but incomplete. The developing blood cells are the free population, and the reason the tissue exists.',
        D: 'Correct. All three groups are present, and naming only one of them describes a third of the marrow.',
      },
    },
    {
      key: 'a-female-was-exposed-to-car-accident-while-driving-resulting-8fe03a09',
      conceptKey: 'fibroblast-features-function',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A duplicate of `a-female-was-exposed-to-car-accident-while-driving-resulting-34e5110d` with the same four options and no key, differing only in a misprint of option D as "Plasma celis". The cleaner printing is live with the answer supplied.',
    },
    {
      key: 'a2-year-old-girl-with-itchy-skin-respiratory-distress-is-bro-c55d51bf',
      conceptKey: 'mast-cell-granule-contents-and-the-anaphylactic-reaction',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A duplicate of `a-2-year-old-girl-with-itchy-skin-respiratory-distress-is-br-6aa27462`, the same case with the same four options and no key; the two differ only in scan noise through the stem. The other printing is live with the answer supplied.',
    },
    {
      key: 'an-obese-40-year-old-female-suffered-from-delayed-healing-of-861a6f54',
      conceptKey: 'white-versus-brown-adipose-connective-tissue',
      difficulty: 'Hard', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The stem has swallowed option A — "could be attributed to: ا a. Increased unilocular fat cells. 6" — which is the answer, so the question gives itself away. The clean printing at `an-obese-40-year-old-female-suffered-from-delayed-healing-of-0d539fdd` is live.',
    },
    {
      key: 'elastic-fibers-are-formed-by-the-following-cell-205754d3',
      conceptKey: 'fibroblast-features-function',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A duplicate of `elastic-fibers-are-formed-by-2c26970b` with the same four options and no key of its own. The keyed printing is live.',
    },
    {
      key: 'askin-biopsy-from-an-individual-suffering-from-severe-itchin-5594d1c4',
      conceptKey: 'mast-cell-granule-contents-and-the-anaphylactic-reaction',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option A has swallowed option B — "Plasmacell. .ط Fibroblast" — leaving three readable choices with two statements under one letter. The question is a good one: severe itching means histamine, and histamine in a skin biopsy means an excess of mast cells. A rescan of the option block recovers it.',
    },
    {
      key: 'choose-the-correct-statement-9acae77d',
      conceptKey: 'white-versus-brown-adipose-connective-tissue',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three options only, where the contract is four, and the stem — "Choose the correct statement" — names no subject at all, so the row cannot be read without the options. The answer would be C: the book says white fat is affected by diet and hormones and brown fat by hormones but not diet, so both are affected by hormones. A rescan is needed for the fourth option and for whatever the stem originally said.',
    },
    {
      key: 'concerning-the-previous-biopsy-which-of-the-following-cells-10dcc1ac',
      conceptKey: 'fibroblast-features-function',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The stem refers to "the previous biopsy" and the row does not contain it — a follow-on question printed beneath a case that the extraction filed as a separate row. Two of its options are damaged as well: C reads "Fibriflin" and D "Reticuler fibers", and neither is a cell. This is a reviewer\'s problem as much as a scanner\'s, since rescanning will not join the two rows.',
    },
    {
      key: 'concerning-the-previous-blopsy-which-of-the-following-cells-ca0a5da7',
      conceptKey: 'fibroblast-features-function',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The second printing of the same orphaned follow-on question. Its four options are clean and its answer would be the fibroblast, but the case it depends on is still not in the row. Joining them is an editorial decision.',
    },
    {
      key: 'reticular-connective-tissue-consists-of-reticular-fibers-and-ca46e88c',
      conceptKey: 'reticular-fibres-and-reticular-cells',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three options only, and the answer — the reticular cell — is not among them; the closest is "fibroblasts", which is defensible only because a reticular cell is a modified fibroblast. The row needs the page rescanned before anyone can say what the fourth option was.',
    },
    {
      key: 'the-following-is-a-free-connective-tissue-cell-c0ed3375',
      conceptKey: 'connective-tissue-cells-fixed-free-and-which-are-branched',
      difficulty: 'Moderate', questionType: 'Classification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option C has swallowed option D — "Fat cell. .ل Plasma cell." — and the plasma cell is the answer, so the correct choice is now hidden inside a wrong one. A fifth entry, "Possessing many free ribosomes", has bled in from another question. The page needs rescanning.',
    },
    {
      key: 'the-following-is-a-short-lived-connective-tissue-cell-28056504',
      conceptKey: 'connective-tissue-cells-fixed-free-and-which-are-branched',
      difficulty: 'Moderate', questionType: 'Classification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option A has swallowed option B, leaving three readable choices. The answer, the plasma cell, does survive as option D, and a rescan of the option block recovers a question that has no twin in the bank.',
    },
    {
      key: 'this-cell-can-be-vitally-stained-da285c11',
      conceptKey: 'vital-and-supravital-stains',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three options only. The key, B for the macrophage, is right — trypan blue injected into a living animal is taken up by macrophages. A rescan of the fourth option recovers it.',
    },
    {
      key: 'which-of-the-following-cells-can-be-stained-with-vital-stain-53e0c507',
      conceptKey: 'vital-and-supravital-stains',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three options only, and the same question as the row above. Its key, A for the macrophage, is right. Both printings need a fourth option.',
    },
    {
      key: 'vital-stain-is-used-to-detect-the-following-cell-17a5dfad',
      conceptKey: 'vital-and-supravital-stains',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option C was lost, and option C is the answer — the macrophage is the cell a vital stain detects. Three options remain and none of them is correct, so the row cannot be sat at all. This is the third printing of the vital-stain question in this leaf and the only one whose option set was four; a rescan of it would settle all three.',
    },
    {
      key: 'which-connective-tissue-cell-type-produces-the-ground-substa-30be074e',
      conceptKey: 'fibroblast-features-function',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option B was lost, leaving three. The key, A for the fibroblast, is right, and the same teaching is live at `the-ground-substance-of-connective-tissue-is-synthesized-mai-cd0927fe`.',
    },
    {
      key: 'macrophages-can-be-stained-with-64f1f7d3',
      conceptKey: 'vital-and-supravital-stains',
      difficulty: 'Easy', questionType: 'Stain identification',
      learningObjective: 'Name the stain that demonstrates a macrophage, and say why it works.',
      answerOverride: 'a',
      answerOverrideReason:
        'The 2021 paper printed no key and the highlight recovery does not cover that sitting, so the answer comes from the department book rather than from a key: it says the macrophage is demonstrated by vital stains such as trypan blue or India ink, which it phagocytoses. The other three options are the stains the same chapters give to other cells and fibres.',
      explanations: {
        a: 'Correct. Trypan blue is a vital stain — injected into the living animal — and the macrophage identifies itself by eating it, so the dye granules inside the cell are the demonstration.',
        b: 'Toluidine blue stains the mast cell and the blood basophil metachromatically, turning their heparin granules purple. It is the neighbouring cell in the same chapter and the commonest wrong answer here.',
        c: 'Silver stains reticular fibres brown, and the Golgi apparatus. It shows a fibre network, not a phagocyte.',
        d: 'Orcein browns elastic fibres. Both silver and orcein give a brown result, which is why naming the colour is never enough to name the stain.',
      },
    },
    {
      key: 'mast-cells-can-be-metachromatically-stained-with-f11c8392',
      conceptKey: 'metachromatic-stain-toluidine-blue-and-heparin',
      difficulty: 'Easy', questionType: 'Stain identification',
      learningObjective: 'Name the metachromatic stain of the mast cell granule.',
      answerOverride: 'c',
      answerOverrideReason:
        'No key was printed on the 2021 paper and none was recovered for that sitting, so the answer is taken from the department book: the mast cell\'s basophilic granules are stained metachromatically purple or red by toluidine blue. It is the only metachromatic stain the book teaches.',
      explanations: {
        a: 'Indian ink is a vital stain the macrophage phagocytoses. It marks a cell by being eaten, not by changing colour, so it cannot be metachromatic at all.',
        b: 'Sudan III stains fat orange, on a frozen section, and identifies the adipocyte. Nothing about it involves a colour change.',
        c: 'Correct. Toluidine blue is blue, and on the sulphated heparin of the mast cell granule it turns violet or magenta red — a colour different from the dye\'s own, which is what metachromasia means.',
        d: 'Trypan blue is the other vital stain of the macrophage. Two of the four options here are macrophage stains, so a student who has not separated the mast cell from the macrophage has a one-in-two chance of the wrong cell.',
      },
    },
    {
      key: 'mallory-trichrome-stain-can-be-used-for-demonstration-of-6d56187b',
      conceptKey: 'connective-tissue-fibre-stains-by-fibre-type',
      difficulty: 'Easy', questionType: 'Stain identification',
      learningObjective: 'Give the fibre Mallory\'s trichrome demonstrates and the colour it gives.',
      answerOverride: 'a',
      answerOverrideReason:
        'The 2021 paper carried no key and no highlight was recovered for it, so the answer is worked from the department book\'s fibre-and-stain table: collagen fibres are pink with eosin, blue with Mallory\'s trichrome and red with van Gieson. Mallory is listed against no other fibre.',
      explanations: {
        a: 'Correct. Mallory\'s trichrome stains collagen fibres blue, and it is one of the three stains the book tabulates against collagen.',
        b: 'Reticular fibres are invisible in H&E and are shown by silver, which browns them, or by PAS, which reddens them because of their sugar content. Mallory does not reach them.',
        c: 'A macrophage is a cell, not a fibre, and it is demonstrated by a vital stain it eats. Putting a cell in a fibre-stain question tests whether the student knows what the stain is for.',
        d: 'Actin microfilaments are cytoskeletal and intracellular, and the book says all three cytoskeletal systems are hard to see by light microscopy except by immunofluorescence. No trichrome shows them.',
      },
    },
    {
      key: 'the-following-cell-stained-metachromati-ally-with-toluidine-453ba687',
      conceptKey: 'mast-cell-lm-em-metachromasia',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the connective tissue cell that stains metachromatically.',
      answerOverride: 'c',
      answerOverrideReason:
        'The 2022 paper printed no key for this row and the highlight recovery returned nothing for it, so the answer comes from the department book: only the mast cell is described as having granules stained metachromatically purple or red by toluidine blue. This is the same fact as `mast-cells-can-be-metachromatically-stained-with`, asked from the other end.',
      explanations: {
        a: 'The plasma cell is deeply basophilic, which makes it the closest wrong answer — but its basophilia is diffuse cytoplasmic staining from rough endoplasmic reticulum, and it takes the dye\'s own colour. Basophilic is not the same as metachromatic.',
        b: 'The macrophage is demonstrated by a vital stain it phagocytoses, trypan blue or India ink, and its cytoplasm is only palely basophilic.',
        c: 'Correct. The mast cell\'s granules are sulphated and rich in heparin, and heparin is what turns blue toluidine violet-magenta.',
        d: 'The pericyte is a small undifferentiated cell around a capillary, with few organelles and no granules at all. There is nothing in it for a metachromatic dye to react with.',
      },
    },
    {
      key: 'the-c-t-cell-that-gives-rise-to-fibroblast-is-dd05bec0',
      conceptKey: 'pericyte-and-undifferentiated-mesenchymal-cell',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Name the connective tissue cells a fibroblast can arise from.',
      answerOverride: 'a',
      answerOverrideReason:
        'No key was printed on the 2022 paper and none was recovered, so the answer is taken from the department book: the fibroblast arises from undifferentiated mesenchymal cells and from pericytes, and the pericyte in injury divides and differentiates into endothelium, fibroblasts and smooth muscle cells. The undifferentiated mesenchymal cell is not among the four options, which leaves the pericyte as the only stem cell on the list.',
      explanations: {
        a: 'Correct. The pericyte is the adult mesenchymal stem cell of connective tissue, lying against the capillary wall, and on injury it divides into endothelium, smooth muscle and fibroblasts.',
        b: 'The mast cell arises from the undifferentiated mesenchymal cell itself and gives rise to nothing. It is a differentiated secretory cell, not a reserve.',
        c: 'The fat cell also arises from the undifferentiated mesenchymal cell and is an end point. A cell full of stored lipid is the least likely thing on the list to divide into something else.',
        d: 'The reticular cell is the tempting one, because it can turn phagocytic when stimulated by antigen — but changing behaviour is not differentiating into another cell type, and the book has it arising from the undifferentiated mesenchymal cell rather than giving rise to fibroblasts.',
      },
    },
    {
      key: 'the-mucoid-c-t-is-characterized-by-1711ddbb',
      conceptKey: 'mucoid-ct-is-jelly-rich-in-hyaluronic-acid',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Recognise mucoid connective tissue by its jelly-like ground substance.',
      answerOverride: 'a',
      answerOverrideReason:
        'The 2022 paper carried no key and no highlight was recovered for that row, so the answer comes from the department book, which describes mucoid connective tissue as containing mainly fibroblasts with fine collagen and reticular fibres in a large amount of soft jelly-like ground substance rich in mucus and hyaluronic acid. The extractor has mangled two words of option a — "€xCess" and "Substance" — but the option is legible.',
      explanations: {
        a: 'Correct. The excess of soft jelly-like ground substance is what mucoid tissue is: Wharton\'s jelly of the umbilical cord, the vitreous humour and the dental pulp.',
        b: 'Fat cells predominating is adipose connective tissue. Both are loose types, and grouping them is the mistake this option exists to catch.',
        c: 'High vascularity belongs to loose areolar tissue and to brown adipose tissue. Wharton\'s jelly is a packing around the umbilical vessels, not a vascular tissue itself.',
        d: 'Predominating collagen fibres is white fibrous connective tissue, a dense type. Mucoid tissue has only fine collagen and reticular fibres, which is why it is a jelly rather than a cord.',
      },
    },
    {
      key: 'thermogenesis-is-a-function-of-88fee2d0',
      conceptKey: 'white-versus-brown-adipose-connective-tissue',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'The correct option has been swallowed by another. The candidate\'s pen crossed the letter of option c on this 2022 script, so "c. Multilocular fat cell" was read as the tail of option b and the bank now holds "Histiocyté. ¢. Multilocular fat cell." as one entry. The department book gives thermogenesis to the multilocular fat cell of brown adipose tissue, breaking down fat to release heat through thermogenin in its mitochondria — so the answer is inside option b\'s string rather than being an option of its own, and the row cannot be sat until page 2 of the 2022 paper is rescanned.',
    },
    {
      key: 'the-following-cell-can-give-rise-to-endothelial-cell-of-fibr-982990c2',
      conceptKey: 'pericyte-and-undifferentiated-mesenchymal-cell',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'The bank row has no options. This is a 2024 row off a ringed script: the pen crossed all four option letters and they were read into the stem, where they remain legible as Fibroblast, Mast cell, Histiocyte and Pericyte. The department book answers it — the pericyte in injury divides and differentiates into endothelium, fibroblasts and smooth muscle cells — and the same fact is examined in the live row `the-c-t-cell-that-gives-rise-to-fibroblast-is` above. Options cannot be added to the bank by hand, so the row waits on a rescan of page 2 of the 2024 paper.',
    },
    {
      key: 'the-antigen-presenting-c-t-cell-is-histiocyte-plasma-cell-yf-a7a84400',
      conceptKey: 'connective-tissue-cells-fixed-free-and-which-are-branched',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'No options in the bank row. The pen crossed the option letters on this 2024 script and all four went into the stem, where they read Histiocyte, Plasma cell, Mast cell and Fibroblast. The department book gives antigen presentation to the macrophage, which it names the histiocyte, and also to the reticular cell — which is not among the options, so the intended answer is the histiocyte. A question with an empty option map cannot be emitted; recoverable by rescanning page 2 of the 2024 paper.',
    },
  ],
}
