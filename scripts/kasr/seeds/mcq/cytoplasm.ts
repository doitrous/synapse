/**
 * `101 ISK > Histology > Cytology > Cytoplasm` — the question books' MCQs.
 *
 * The largest leaf in the module: 276 rows in the bank, plus nine moved here
 * from `The cell` and one from `Nucleus`, because their concepts live here and
 * the emitter cannot write the same concept id twice in one batch. It spans
 * every organelle the department book teaches, which is why it carries far more
 * concepts than any other leaf — twenty-three, of which four are not minted here
 * at all.
 *
 * Four concepts are reused from the written-paper batch with their labels,
 * definitions, objectives and pitfalls copied verbatim, so re-emitting them is
 * an update that changes nothing except adding the question books' occurrences
 * to their exam signal: `ser-structure-function-steroid-detoxification`,
 * `lysosome-types-electron-microscopy`, `lysosome-types-secondary-fates` and
 * `cilium-origin-and-ultrastructure`. A rival key for any of them would halve a
 * student's mastery of an idea two papers have already examined.
 *
 * `organelle-content-identifies-what-a-cell-does` is minted here and is the one
 * concept in this file that is not about an organelle. It exists because a
 * quarter of the leaf asks the question the other way round — given a cell, what
 * is prominent in it — and because the cells the books use for it (fibroblast,
 * fibrocyte, macrophage, plasma cell, undifferentiated mesenchymal cell,
 * erythrocyte) have concepts of their own that already belong to sibling leaves
 * of this batch and cannot be declared again here. The cell-specific facts are
 * taught in the option explanations instead.
 *
 * Where the books examine hardest, by count: the cytoskeleton and the numbers
 * that go with it (microtubule 24 nm and 13 protofilaments, centriole 27
 * microtubules, ciliary shaft 20, basal body 27, rootlets 9) is asked more than
 * any other subject in the module, and the secondary lysosomes come second.
 *
 * Eleven answers are overridden. The worst of them is
 * `detoxification-of-drugs-is-the-function-of`, keyed to the Golgi apparatus,
 * where four other rows in the same books key detoxification to smooth
 * endoplasmic reticulum.
 */
import type { McqLeafSeed } from '../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Cytoplasm',
  modulePath: '101 ISK > Histology > Cytology > Cytoplasm',
  articleId: 'ART-101-HIS-CYTOPLASMIC-ORGANELLES',

  concepts: [
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
      key: 'organelle-content-identifies-what-a-cell-does',
      label: 'What a cell is doing can be read from which organelle is prominent in it',
      definition:
        'A cell\'s organelle profile follows from its work, and the books examine the inference in both directions. A protein-forming cell for export — the plasma cell, the fibroblast, the pancreatic acinar cell — has abundant rough endoplasmic reticulum, deeply basophilic cytoplasm, a well-developed Golgi apparatus and a pale euchromatic nucleus. A steroid-forming cell has abundant smooth endoplasmic reticulum instead, and its cytoplasm is acidophilic. A phagocyte — the macrophage or histiocyte, the neutrophil, the monocyte — has many lysosomes, a prominent Golgi and pseudopodia. A resting cell such as the fibrocyte has few organelles, little rough endoplasmic reticulum and pale cytoplasm. The mature erythrocyte has gone to the other extreme and has no nucleus, no mitochondria and no ribosomes at all, having lost them as its haemoglobin content rose.',
      objective:
        'Predict which organelle will be prominent in a named cell, and name the cell from a described organelle profile.',
      pitfall:
        'Reading basophilia as a property of the cell rather than of its ribosomes. A cell is basophilic because it is full of rough endoplasmic reticulum, so the staining and the organelle are one fact, not two that have to be memorised separately.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Cytology > Cytoplasm',
      type: 'structure_function_relationship',
      gaps: [
        'Several cells used in these rows have concepts of their own that already belong to sibling leaves of this batch — `fibroblast-active-and-fibrocyte-inactive` in `haemopoiesis.ts`, the macrophage and plasma cell in the connective-tissue leaves, and the erythrocyte in a leaf not yet seeded. None of them could be declared again here without emitting a duplicate concept id, so the cell-specific facts are carried in the option explanations. When those leaves are authored, these rows should be re-homed to them.',
      ],
    },
    {
      key: 'mitochondrion-ultrastructure-and-staining',
      label: 'A mitochondrion is two membranes — a smooth outer one with porins and an inner one folded into cristae — around a matrix that holds its own DNA',
      definition:
        'A mitochondrion is bounded by two unit membranes. The outer membrane is smooth, carries porins and is permeable to small molecules. The inner membrane is selectively permeable and is thrown into folds — the cristae — which greatly increase its area and carry the elementary particles, globular structures attached by stalks with ATP synthase activity. Between them lies the intermembranous space, and within the inner membrane the matrix, which holds the oxidative enzymes of the citric acid cycle, mitochondrial DNA and mRNA, tRNA and rRNA, and dense calcium-rich granules that act as catalysts. Mitochondria are 0.5 µm across and up to 10 µm long, vary in number and shape with the cell, increase in number by simple division, and are sited in the most active part of the cell. They stain dark blue with iron haematoxylin and green with Janus green, and their cytoplasmic content makes them acidophilic in H&E.',
      objective:
        'Describe the two mitochondrial membranes and the matrix, say what is on the cristae, and give the two stains that demonstrate the organelle.',
      pitfall:
        'Putting the cristae on the outer membrane. The outer one is smooth; it is the inner membrane that folds, and the folds are where the ATP is made.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Cytology > Cytoplasm',
      type: 'structural_description',
      aliases: ['Cristae', 'Elementary particles', 'Mitochondrial matrix', 'Janus green'],
    },
    {
      key: 'mitochondrion-power-house-krebs-oxidative-phosphorylation-and-heat',
      label: 'The mitochondrion makes the cell\'s ATP — Krebs cycle in the matrix, oxidative phosphorylation on the cristae — and in brown fat makes heat instead',
      definition:
        'The mitochondrion is the power house of the cell: it holds the enzymes of aerobic respiration and energy production, and it is sited wherever the cell needs the energy. The enzymes of the citric acid — Krebs — cycle are in the matrix; the enzymes of oxidative phosphorylation are on the inner membrane, in the elementary particles of the cristae, where ATP synthase makes the ATP. Mitochondria also regulate calcium, storing it in the dense matrix granules, and they can generate heat rather than ATP: the mitochondria of the multilocular brown fat cell are packed with cytochrome pigment, which colours the tissue, and with thermogenin, which uncouples oxidation from ATP production so the energy leaves as heat. A defect in the mitochondrial enzymes means a failure to produce the ATP every vital activity needs, and in muscle that shows as muscular weakness.',
      objective:
        'Say where in the mitochondrion each stage of energy production happens, and explain what changes in a mitochondrion that makes heat instead of ATP.',
      pitfall:
        'Placing the Krebs cycle on the inner membrane. The cycle is a set of soluble enzymes in the matrix; only the respiratory chain and ATP synthase are on the membrane, and the books ask both in the same option list.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Cytology > Cytoplasm',
      type: 'structure_function_relationship',
      aliases: ['Oxidative phosphorylation', 'ATP synthase', 'Thermogenin', 'Brown fat'],
    },
    {
      key: 'rough-endoplasmic-reticulum-structure-and-protein-export',
      label: 'Rough endoplasmic reticulum is flattened cisternae studded on the outside with ribosomes, and it makes and segregates protein for export',
      definition:
        'The endoplasmic reticulum is a membranous network of intercommunicating channels and sacs — cisternae — extending from the nucleus to the cell membrane, and it is of two kinds. The rough kind is parallel flattened cisternae bounded by a single membrane whose outer, cytoplasmic surface is studded with ribosomes bound to receptor proteins called ribophorins; it is continuous with the outer membrane of the nuclear envelope, which is itself studded with polyribosomes for the same reason. It is abundant in cells that make protein for export, such as the plasma cell, and its ribosomes are what give those cells their light-microscopic basophilia, focal, diffuse or localised. It synthesises the exported proteins, segregates them into its lumen away from the cytoplasm, performs their initial glycosylation, packs them into transfer vesicles for the Golgi apparatus, protects the cytoplasm from the hydrolytic enzymes it makes, and serves as an intracellular pathway.',
      objective:
        'Describe the rough endoplasmic reticulum\'s membranes and ribosome attachment, and list what it does to a protein before the Golgi apparatus receives it.',
      pitfall:
        'Giving rough endoplasmic reticulum two membranes because a mitochondrion has two. It has one, and the ribosomes are on its outer face — the face towards the cytoplasm, where the messenger RNA is.',
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
      objective:
        'Describe smooth endoplasmic reticulum as it appears on light microscopy and on electron microscopy, and say what it does.',
      pitfall:
        'Expecting to see it under the light microscope. What is seen is the cytoplasmic acidophilia it produces when abundant, not the organelle.',
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
      objective:
        'Recognise the negative Golgi image, name the stain that shows the Golgi positively, and give its position in a secretory cell and in a nerve cell.',
      pitfall:
        'Expecting the pale supranuclear area to be empty. It is where the Golgi is; it looks pale because the Golgi takes neither dye, not because nothing is there.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Cytology > Cytoplasm',
      type: 'structural_description',
      aliases: ['Negative Golgi image', 'Golgi hof', 'Silver impregnation'],
    },
    {
      key: 'golgi-apparatus-em-structure-products-and-functions',
      label: 'The Golgi is a stack of flat saccules with an entry and an exit face, and everything it buds off leaves from the exit face',
      definition:
        'On electron microscopy the Golgi apparatus is a stack of three to ten interconnected, parallel, flat curved saccules lying above one another, with vesicles at both ends. The entry or cis face receives the transfer vesicles that the rough endoplasmic reticulum sends; the exit or trans face buds off the products — secretory vesicles, lysosomes and coated vesicles. A transfer vesicle is therefore not a Golgi product but a Golgi input, which is the distinction the books ask most often. The Golgi packs, concentrates and stores protein, modifies it chemically by adding carbohydrate to make glycoprotein, forms secretory vesicles and primary lysosomes, and renews and maintains the cell membrane by sending membrane to it.',
      objective:
        'Describe the Golgi stack and its two faces, say what arrives at each and what leaves, and list its functions.',
      pitfall:
        'Calling the transfer vesicle a product of the Golgi. It comes from the rough endoplasmic reticulum and arrives at the cis face; secretory vesicles, lysosomes and coated vesicles leave from the trans face.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Cytology > Cytoplasm',
      type: 'structure_function_relationship',
      aliases: ['Cis face', 'Trans face', 'Saccules', 'Transfer vesicle', 'Secretory vesicle'],
    },
    {
      key: 'lysosome-enzymes-origin-and-functions',
      label: 'A lysosome is a single-membrane bag of hydrolytic enzymes made in the rER, packed by the Golgi, and shown only by histochemistry',
      definition:
        'A lysosome is a membranous organelle bounded by a single membrane and containing hydrolytic enzymes — acid phosphatase, protease, sulfatase, phospholipase, nuclease — for intracytoplasmic digestion. The enzymes are made on the rough endoplasmic reticulum, carried by transfer vesicles to the Golgi apparatus and released from it in lysosomes, so two organelles share in forming them. They are abundant in phagocytic cells: macrophages, neutrophils and monocytes. They cannot be seen in a routine section and need a histochemical reaction — the acid phosphatase reaction — to be identified. They digest nutrients and phagocytosed bacteria and viruses, remove excess and non-functional organelles, carry out postmortem autolysis, help the sperm head penetrate the ovum at fertilisation, and activate thyroid hormone by breaking the bond between the hormone and its protein. Lack of a lysosomal enzyme such as a sulfatase leaves sulfated compounds accumulating inside the cell and interfering with the function of nerve cells.',
      objective:
        'Say what a lysosome contains, where its enzymes are made and packed, how it is demonstrated, and list what it does for the cell.',
      pitfall:
        'Handing detoxification of drugs to the lysosome. Both organelles break things down, but drug detoxification is smooth endoplasmic reticulum; the lysosome digests what has been taken in or worn out.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Cytology > Cytoplasm',
      type: 'structure_function_relationship',
      aliases: ['Acid phosphatase', 'Hydrolytic enzymes', 'Intracytoplasmic digestion'],
    },
    {
      key: 'lysosome-types-electron-microscopy',
      label: 'Primary and secondary lysosomes are distinguished on electron microscopy by whether they have yet fused with a substrate',
      definition:
        'A primary lysosome is a small, uniformly electron-dense, membrane-bound vesicle newly budded from the Golgi and containing acid hydrolases that have not yet acted. A secondary lysosome is larger and heterogeneous, having fused with phagosome or autophagosome; a residual body is its end state, holding indigestible material.',
      objective:
        'Distinguish primary from secondary lysosomes and residual bodies by their appearance on electron microscopy.',
      pitfall:
        'Calling every dense body a lysosome. Density alone does not identify one; the acid-phosphatase reaction is what confirms it.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Cytology > Cytoplasm',
      type: 'structural_description',
    },
    {
      key: 'lysosome-types-secondary-fates',
      label: 'A secondary lysosome is named by what the primary lysosome fused with, and all end as residual bodies',
      definition:
        'Secondary lysosomes are heterogeneous membranous vesicles that have entered digestive events. A heterolysosome is a primary lysosome fused with a phagosome, digesting solid particles; a multivesicular body is a primary lysosome fused with a pinocytic vesicle, digesting fluid; an autolysosome is a primary lysosome fused with old organelles. What is left undigested becomes a residual body, which is either discharged from the cell by exocytosis or stays in it as lipofuscin, the pigment that accumulates with age particularly in non-dividing cells such as cardiac muscle and nerve cells.',
      objective:
        'Name the three types of secondary lysosome by what the primary lysosome fused with, and give the fate of the residual body.',
      pitfall:
        'Treating the residual body as a fourth type of secondary lysosome. It is the end state of all three, not a parallel kind.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Cytology > Cytoplasm',
      type: 'classification',
      aliases: ['Heterolysosome', 'Autolysosome', 'Multivesicular body', 'Residual body'],
    },
    {
      key: 'peroxisome-oxidase-and-catalase',
      label: 'A peroxisome holds oxidases that make hydrogen peroxide and catalase that destroys it',
      definition:
        'Peroxisomes, or microbodies, are spherical membranous vesicles bounded by a single membrane, budding off the rough endoplasmic reticulum, whose enzymes are made on free ribosomes rather than on attached ones. They hold two kinds of enzyme. The oxidases carry out beta-oxidation of long-chain fatty acids, which produces heat rather than ATP and generates hydrogen peroxide as a toxic by-product; catalase then breaks that hydrogen peroxide into water and oxygen. They are abundant in liver and kidney cells and they increase in number by division. Lack of peroxisomal enzymes affects the function of organs such as the liver.',
      objective:
        'Name the two enzyme groups of the peroxisome, say what each does, and distinguish the organelle from the lysosome by its enzymes.',
      pitfall:
        'Giving the peroxisome hydrolytic enzymes. It has oxidases and catalase; hydrolases are the lysosome\'s, and every "except" question about peroxisomes in these books is built on that one substitution.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Cytology > Cytoplasm',
      type: 'structure_function_relationship',
      aliases: ['Microbody', 'Catalase', 'Beta oxidation'],
    },
    {
      key: 'ribosome-structure-and-origin-in-the-nucleolus',
      label: 'A ribosome is a non-membranous particle of rRNA and protein, assembled as two unequal subunits in the nucleolus',
      definition:
        'A ribosome is a non-membranous particle formed of ribosomal RNA and protein, appearing on electron microscopy as an electron-dense granule 20–30 nm across. Its rRNA is formed in the nucleolus and its proteins in the cytoplasm; both unite in the nucleolus into a large and a small subunit of unequal size, which return separately to the cytoplasm and join one another only during protein synthesis, held together by the messenger RNA that threads between them. The growing polypeptide chain is carried on the large subunit. Ribosomes linked along one strand of mRNA are polyribosomes or polysomes, seen as bead-like rosettes or spiral chains.',
      objective:
        'Give the composition of a ribosome, say where each of its parts is made and where they are assembled, and explain what joins its two subunits.',
      pitfall:
        'Making the two subunits equal, or making the ribosome membranous. It is two unequal subunits and it has no membrane at all — which is why it is one of only two non-membranous organelles.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Cytology > Cytoplasm',
      type: 'structural_description',
      aliases: ['Polyribosome', 'Polysome', 'Ribosomal subunits'],
    },
    {
      key: 'free-versus-attached-ribosomes-and-cytoplasmic-basophilia',
      label: 'Free ribosomes make protein the cell keeps; attached ribosomes make protein it exports — and both together are why cytoplasm is basophilic',
      definition:
        'A ribosome is either free in the cytoplasm, singly or as a polyribosome, or attached by its large subunit to the ribophorins of the rough endoplasmic reticulum. Free ribosomes form the proteins the cell uses within itself — its glycolytic enzymes, the proteins of its own growth, and the enzymes of its peroxisomes. Attached ribosomes form the proteins the cell secretes: enzymes and hormones for export. Ribosomes are what make cytoplasm basophilic, because of the acidity of the phosphate groups of their RNA, and the pattern of that basophilia says where they are — localised or focal basophilia marks a site of rough endoplasmic reticulum, and diffuse basophilia free ribosomes scattered through the cytosol.',
      objective:
        'Predict from a cell\'s free-to-attached ribosome ratio what kind of protein it is making, and explain what cytoplasmic basophilia is caused by.',
      pitfall:
        'Reading basophilia as acidophilia because RNA is an acid. The RNA is acidic, so it binds the *basic* dye — that is what basophilic means, and the reasoning has to be run one step further than it feels like it should.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Cytology > Cytoplasm',
      type: 'structure_function_relationship',
      aliases: ['Free ribosomes', 'Attached ribosomes', 'Cytoplasmic basophilia'],
    },
    {
      key: 'cytoskeleton-is-three-filament-systems',
      label: 'The cytoskeleton is microtubules, microfilaments and intermediate filaments — and nothing else',
      definition:
        'The cytoskeleton is a complex network of microtubules, microfilaments and intermediate filaments, joined by linking proteins into a microtrabecular lattice that fills the cytosol. All three are non-membranous, and all three are beyond the resolution of the light microscope except by immunofluorescence. The centrioles, cilia and flagella are built by the microtubules and the microvilli and stereocilia by the microfilaments, so they are products of the cytoskeleton rather than a fourth element of it, and the thick filaments of muscle are a contractile apparatus rather than part of it.',
      objective:
        'Name the three elements of the cytoskeleton and recognise what the books offer beside them that is not one.',
      pitfall:
        'Admitting thick filaments to the cytoskeleton because thin filaments are in it. Thin filaments are the microfilaments; thick filaments are myosin of the muscle contractile apparatus, and the books use the pair as an "except" every time.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Cytology > Cytoplasm',
      type: 'classification',
      aliases: ['Microtrabecular lattice', 'Thin filaments'],
    },
    {
      key: 'microtubule-structure-and-functions',
      label: 'A microtubule is a 24 nm hollow cylinder of thirteen protofilaments of alpha and beta tubulin, grown from the microtubule organising centre',
      definition:
        'A microtubule is a hollow cylinder of fixed diameter, 24 nm across, whose wall is thirteen parallel protofilaments built from dimers of alpha and beta tubulin. Its length is not fixed: it lengthens and shortens by adding and losing tubulin at its ends, so it is dynamic, and its assembly is directed by the microtubule organising centre, which is rich in a third form, gamma tubulin, and contains the two perpendicular centrioles. Microtubules determine the shape of the cell and its elongation, transport organelles, vesicles and macromolecules through the cytoplasm, form the mitotic spindle during cell division, and build the centrioles, cilia and flagella. Because the spindle is made of them, cancer chemotherapy that prevents microtubule formation arrests the proliferation of a tumour.',
      objective:
        'Give the diameter, the protein and the wall structure of a microtubule, and list what it builds and what it does.',
      pitfall:
        'Confusing the fixed diameter with a fixed length. The diameter never varies, because thirteen protofilaments always make the same circumference; the length varies constantly, and that instability is what the spindle depends on.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Cytology > Cytoplasm',
      type: 'structure_function_relationship',
      aliases: ['Tubulin', 'Protofilament', 'Microtubule organizing centre', 'MTOC', 'Mitotic spindle'],
    },
    {
      key: 'microfilament-structure-and-functions',
      label: 'A microfilament is a 5–7 nm strand of two coiled chains of actin, and it changes the shape of the cell',
      definition:
        'A microfilament, or thin filament, is a fine strand 5–7 nm in diameter formed of two chains of globular G actin coiled together into filamentous F actin. Microfilaments lie in a web beneath the plasmalemma and form the core of the microvillus and of the stereocilium. They change the shape of the cell in endocytosis, exocytosis and amoeboid movement, transport organelles, cleave the cell in two at the cleavage furrow of cell division, and act with myosin in muscle contraction. The peripheral hyalomere of the platelet and the contractile network of the pericyte are both actin and myosin of this kind.',
      objective:
        'Give the diameter and the protein of a microfilament, and list the movements and shape changes it performs.',
      pitfall:
        'Handing the mitotic spindle to the microfilament. The microfilament cleaves the cell at the end of division; the spindle that separates the chromosomes is microtubule, and the books put the two in the same "except" list.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Cytology > Cytoplasm',
      type: 'structure_function_relationship',
      aliases: ['Actin filament', 'Thin filament', 'G actin', 'F actin'],
    },
    {
      key: 'intermediate-filament-types-and-tumour-diagnosis',
      label: 'Intermediate filaments are supportive, 8–10 nm, and each tissue has its own protein — which is what makes them diagnostic',
      definition:
        'Intermediate filaments are 8–10 nm across, between the microfilaments and the microtubules in size, and are formed by the polymerisation of tetrameric subunits that differ chemically from tissue to tissue. Their role is supportive rather than motile. Cytokeratin is the intermediate filament of epithelium, vimentin of connective tissue and muscle, desmin of muscle, neurofilaments of neurons, glial fibrillary acidic protein of glial cells, and the lamins of the nuclear envelope. Because each is tissue-specific, identifying the intermediate filament protein of a tumour by immunocytochemistry reveals the cell the tumour arose from, and that matters for its diagnosis and its treatment.',
      objective:
        'Give the diameter and subunit of an intermediate filament, name the six proteins and their tissues, and explain why they are used in tumour diagnosis.',
      pitfall:
        'Choosing microtubules for the tumour question because chemotherapy acts on microtubules. Two different tumour questions sit side by side in these books: microtubules are what a drug blocks, and intermediate filaments are what a pathologist stains.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Cytology > Cytoplasm',
      type: 'classification',
      aliases: ['Cytokeratin', 'Vimentin', 'Desmin', 'Neurofilament', 'GFAP', 'Lamins'],
    },
    {
      key: 'centriole-structure-and-role-in-cell-division',
      label: 'A centriole is a cylinder of nine microtubule triplets — 27 microtubules — and a pair of them organises the mitotic spindle',
      definition:
        'A centriole is a short cylindrical structure whose wall is nine bundles of three microtubules each, twenty-seven microtubules in all, with no central pair and no membrane. In a non-dividing cell two lie perpendicular to one another surrounded by a tubulin matrix, the whole being the centrosome, which is the microtubule organising centre. The centrosome duplicates in the S phase of the cell cycle and the two pairs move to opposite poles, where they organise the mitotic spindle, so the centriole is a self-replicating structure. Centrioles also duplicate thousands of times over to form the basal bodies of cilia and flagella, which have exactly a centriole\'s structure.',
      objective:
        'Give the microtubule arrangement of a centriole, describe the centrosome, and say what centrioles do in division and in ciliogenesis.',
      pitfall:
        'Counting nine and stopping. The centriole\'s nine bundles are triplets, so the count is twenty-seven; nine is the rootlet, eighteen the doublets of the shaft alone, and twenty the shaft with its central pair.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Cytology > Cytoplasm',
      type: 'structure_function_relationship',
      aliases: ['Centrosome', 'Diplosome', 'Basal body'],
    },
    {
      key: 'cilium-origin-and-ultrastructure',
      label: 'A cilium arises from a basal body and is built on a 9+2 axoneme',
      definition:
        'A cilium develops from a basal body, itself derived from a centriole, which migrates to the apical cell surface. On electron microscopy the shaft contains an axoneme of nine peripheral microtubule doublets around a central pair, with dynein arms on the doublets that produce the beat.',
      objective:
        'Describe where a cilium comes from and what its 9+2 axoneme looks like on electron microscopy.',
      pitfall:
        'Giving microvilli the same answer. A microvillus has an actin core and no axoneme, and does not beat.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Epithelial Tissues > Polarity and Membranous Specializations',
      type: 'structure_function_relationship',
    },
    {
      key: 'microvillus-and-stereocilium-have-actin-cores',
      label: 'A microvillus is a short actin-cored projection for absorption, and a stereocilium is a long one — neither is a cilium',
      definition:
        'A microvillus is a finger-like projection of the apical cell surface, shorter than a cilium, with a core of actin filaments inserted into a terminal web of the cytoskeleton, and no microtubules. Seen with the light microscope, the mass of them is the striated or brush border, and their purpose is to increase surface area for absorption — in the small intestine and the kidney tubule. A stereocilium is not a cilium either: it is a long, non-motile, solid microvillus with the same actin core and no microtubules, and it helps absorption in the male genital system, notably the epididymis. Cilia, by contrast, are motile, have a microtubular axoneme, and are seen by light microscopy as fine hair-like striations at the free surface.',
      objective:
        'Distinguish microvilli, stereocilia and cilia by their core protein, their motility and what they are seen as by light microscopy.',
      pitfall:
        'Trusting the name "stereocilium". It has no microtubules and does not move; it is a long microvillus and takes an actin answer every time.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Cytology > Cytoplasm',
      type: 'structure_function_relationship',
      aliases: ['Brush border', 'Striated border', 'Terminal web', 'Stereocilia'],
    },
    {
      key: 'endocytosis-three-types-and-exocytosis',
      label: 'The membrane takes material in by phagocytosis, pinocytosis or receptor-mediated endocytosis, and puts it out by exocytosis',
      definition:
        'Endocytosis is the bulk movement of material into the cell by forming vesicles from the plasma membrane, and it is of three kinds. Phagocytosis, cell eating, surrounds a solid particle with pseudopodia — a white blood cell engulfing a bacterium. Pinocytosis, cell drinking, takes in extracellular fluid and what is dissolved in it through small invaginations, needing no other protein to do it. Receptor-mediated endocytosis begins when a ligand binds its receptors; the receptors aggregate over a patch of membrane that clathrin coats on its cytoplasmic side, forming a coated pit which pinches off as a coated vesicle — this is how a hormone such as growth hormone is taken up. Exocytosis is the reverse: a cytoplasmic vesicle fuses with the plasma membrane and discharges its contents outside without breaking the continuity of the membrane, and it is how a merocrine gland secretes.',
      objective:
        'Distinguish the three types of endocytosis by what is taken in and by how the membrane does it, and contrast all three with exocytosis.',
      pitfall:
        'Deciding by the size of the word rather than by what is engulfed. Phagocytosis takes solids, pinocytosis takes fluid, and receptor-mediated endocytosis takes whatever its receptor binds however little of it there is.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Cytology > Cytoplasm',
      type: 'mechanism',
      aliases: ['Phagocytosis', 'Pinocytosis', 'Receptor mediated endocytosis', 'Coated pit', 'Clathrin', 'Exocytosis'],
    },
    {
      key: 'proteasome-degrades-abnormal-and-short-lived-proteins',
      label: 'The proteasome, not the lysosome, destroys abnormal and short-lived proteins inside the cytosol',
      definition:
        'A proteasome is a non-membranous cytoplasmic protein complex that degrades abnormal, misfolded and short-lived proteins in the cytosol, after they have been tagged with ubiquitin. It differs from the lysosome in having no membrane and in acting on the cell\'s own soluble proteins rather than on material taken in or on whole worn-out organelles. Failure of proteasomal degradation lets abnormal protein accumulate in the cell, which is the mechanism the question books attach to Alzheimer\'s disease.',
      objective:
        'Distinguish the proteasome from the lysosome by what each destroys and by whether it has a membrane.',
      pitfall:
        'Answering "lysosome" because the question says degradation. The lysosome digests what has been engulfed or worn out; abnormal short-lived cytosolic protein is the proteasome\'s work.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Cytology > Cytoplasm',
      type: 'structure_function_relationship',
      aliases: ['Proteosome', 'Ubiquitin'],
      gaps: [
        'The department book\'s cytology chapter does not mention proteasomes at all — it names ribosomes and the cytoskeleton as the only non-membranous organelles. The question books nevertheless examine the proteasome as a distractor and, in two rows, as the answer. The concept is minted because it is examined, and this note records that no statement in the faculty\'s own text supports it.',
      ],
    },
  ],

  questions: [
    {
      key: 'a-protein-forming-cell-has-one-of-these-characters-b8e3a5a2',
      conceptKey: 'organelle-content-identifies-what-a-cell-does',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the organelle that marks a cell as a protein producer.',
      explanations: {
        A: 'Acidophilic cytoplasm is the steroid- or lipid-forming cell, where abundant smooth endoplasmic reticulum takes the acid dye. A protein-forming cell is basophilic.',
        B: 'Many lysosomes mark a phagocyte — the macrophage, the neutrophil — a cell that digests rather than one that builds.',
        C: 'Correct. Abundant rough endoplasmic reticulum is the defining feature, because the ribosomes on it are what make protein for export. Asked three times across the books.',
        D: 'A condensed nucleus means coiled, inactive chromatin. A cell making protein needs its genes readable, so its nucleus is pale and euchromatic.',
      },
    },
    {
      key: 'one-of-the-following-is-a-non-membranous-organelles-51a85429',
      conceptKey: 'organelles-inclusions-and-the-membranous-classification',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Sort an organelle into the membranous or non-membranous class.',
      explanations: {
        A: 'A mitochondrion has two membranes, which makes it the most membranous organelle of the list.',
        B: 'Correct. Ribosomes are one of only two non-membranous entries the book gives — the other is the cytoskeleton with everything it builds.',
        C: 'The Golgi apparatus is a stack of membranous saccules.',
        D: 'Rough endoplasmic reticulum is a membranous network; the ribosomes on its surface are non-membranous, but the reticulum itself is not.',
      },
    },
    {
      key: 'the-organelle-responsible-for-synthesis-of-secreted-proteins-a5f70b5a',
      conceptKey: 'free-versus-attached-ribosomes-and-cytoplasmic-basophilia',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Attribute exported protein to the attached ribosome.',
      explanations: {
        A: 'Mitochondria make ATP. They carry ribosomes of their own, but what those make stays inside the mitochondrion.',
        B: 'Lysosomes destroy protein; they do not synthesise it.',
        C: 'Correct. Ribosomes attached to the rough endoplasmic reticulum make the proteins the cell exports — the free ones make what it keeps.',
        D: 'Smooth endoplasmic reticulum has no ribosomes at all, so it cannot make protein of any kind.',
      },
    },
    {
      key: 'a-newborn-presenting-with-yellow-coloration-of-skin-and-eyes-25344efe',
      conceptKey: 'ser-structure-function-steroid-detoxification',
      difficulty: 'Hard', questionType: 'Clinical application',
      learningObjective: 'Trace neonatal jaundice to the organelle that handles bilirubin.',
      answerOverride: 'B',
      answerOverrideReason:
        'The source printed no key. Yellowing of skin and sclera is jaundice, from bilirubin the liver has not yet processed, and the smooth endoplasmic reticulum of the liver cell is the organelle that does that work — underdeveloped in the newborn. Only B names both the organelle and the organ.',
      explanations: {
        A: 'Defective ribosomes would cripple protein synthesis throughout the body, not produce a yellow pigment in the skin.',
        B: 'Correct. The liver cell\'s smooth endoplasmic reticulum is what handles bilirubin, as it handles drugs and alcohol, and it is not yet fully developed in a newborn.',
        C: 'Smooth endoplasmic reticulum in the skin would be a steroid- and lipid-handling organelle in the wrong organ. The skin is where the colour is seen; the liver is where the fault is.',
        D: 'Rough endoplasmic reticulum makes exported protein. The albumin it makes carries bilirubin, which is why this option is tempting, but the processing itself is the smooth reticulum\'s.',
      },
    },
    {
      key: 'among-features-of-medical-conditions-related-to-defective-ly-e320739b',
      conceptKey: 'lysosome-enzymes-origin-and-functions',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Give the consequence of a missing lysosomal enzyme.',
      explanations: {
        A: 'Catalase is a peroxisomal enzyme. Lacking it is a peroxisomal disease, and the option is here because the two single-membrane digestive organelles are constantly swapped.',
        B: 'Hydrogen peroxide accumulates when peroxisomal catalase fails. A lysosome neither makes nor destroys it.',
        C: 'Correct. The department book gives sulfatase deficiency as its example: sulfated compounds accumulate inside cells and interfere with the normal function of nerve cells.',
        D: 'Oxidoreductases belong to the mitochondrion and the peroxisome. The lysosome\'s enzymes are hydrolases.',
      },
    },
    {
      key: 'as-regards-ribosomes-cf982888',
      conceptKey: 'ribosome-structure-and-origin-in-the-nucleolus',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Give the ribosome\'s composition, origin and subunit sizes.',
      explanations: {
        A: 'Correct. rRNA is made in the nucleolus, the proteins in the cytoplasm, and the two unite in the nucleolus into the subunits, which then leave through the nuclear pores.',
        B: 'A ribosome is rRNA with protein, not DNA with protein. DNA with histone is chromatin, and that is what this option describes.',
        C: 'Ribosomes cause basophilia, not acidophilia — their RNA is acidic and so binds the basic dye. Acidophilia comes from abundant smooth endoplasmic reticulum.',
        D: 'The two subunits are of unequal size, a large one and a small one, and the polypeptide chain is carried on the large one. "Equal" is what makes this option false.',
      },
    },
    {
      key: 'concerning-rer-e140daa6',
      conceptKey: 'rough-endoplasmic-reticulum-structure-and-protein-export',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Recognise segregation as a function of rough endoplasmic reticulum.',
      explanations: {
        A: 'Rough endoplasmic reticulum causes basophilia, localised or diffuse, because of its ribosomes. Acidophilia is what the smooth kind causes.',
        B: 'Drug detoxification is smooth endoplasmic reticulum. The two halves of the endoplasmic reticulum are constantly offered for each other\'s functions.',
        C: 'Lysosomes are separate organelles budded from the Golgi. The rough reticulum makes their enzymes but does not carry lysosomes on its membranes.',
        D: 'Correct. Segregation — moving the newly made protein into the lumen, away from the cytosol — is one of its named functions, and it is what protects the cytoplasm from the hydrolytic enzymes it makes.',
      },
    },
    {
      key: 'localized-cytoplasmic-basophilia-indicates-the-presence-of-8aad1583',
      conceptKey: 'free-versus-attached-ribosomes-and-cytoplasmic-basophilia',
      difficulty: 'Moderate', questionType: 'Stains and techniques',
      learningObjective: 'Read a localised patch of basophilia as rough endoplasmic reticulum.',
      explanations: {
        A: 'Mitochondria are acidophilic. They are stained by iron haematoxylin or Janus green, not by the basic dye of a routine section.',
        B: 'DNA is basophilic, but it is in the nucleus. This question is about the cytoplasm, and the option is here to catch a student who answers on staining alone.',
        C: 'The Golgi apparatus takes no dye at all in H&E, which is why it shows as a pale negative image rather than a basophilic patch.',
        D: 'Correct. A localised patch of basophilia is a mass of rough endoplasmic reticulum, its ribosomes concentrated in one region — the Nissl granule of the nerve cell is the type example.',
      },
    },
    {
      key: 'microtubules-are-characterized-by-4216b0e5',
      conceptKey: 'microtubule-structure-and-functions',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Give the subunit of a microtubule and separate its fixed diameter from its variable length.',
      explanations: {
        A: 'The length is not fixed — a microtubule grows and shrinks by adding and losing tubulin, and that instability is what lets the mitotic spindle work.',
        B: 'Correct. Dimers of alpha and beta tubulin build the protofilaments. Gamma tubulin is a third form, and it is in the organising centre rather than in the tube.',
        C: 'Thirteen protofilaments, not ten. The number is fixed and is what fixes the diameter.',
        D: 'The diameter is the one thing that never varies: thirteen protofilaments always give the same circumference, so 24 nm every time. This option swaps the fixed property for the variable one.',
      },
    },
    {
      key: 'microtubules-are-formed-of-a-protein-called-d22ca80b',
      conceptKey: 'microtubule-structure-and-functions',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the microtubule protein.',
      explanations: {
        A: 'Actin is the microfilament protein — the other cytoskeletal element, and the one the books put opposite this every time.',
        B: 'Myosin works with actin in contraction. It is a motor, not a structural subunit of a tube.',
        C: 'Correct. Tubulin, as dimers of an alpha and a beta form.',
        D: 'Clathrin coats the pit of receptor-mediated endocytosis. It builds a cage on a membrane, not a cytoskeletal tube.',
      },
    },
    {
      key: 'one-item-is-a-feature-of-defective-mitochondria-64492312',
      conceptKey: 'mitochondrion-power-house-krebs-oxidative-phosphorylation-and-heat',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Give the clinical consequence of failing mitochondria.',
      explanations: {
        A: 'A mutation in mitochondrial RNA is a cause rather than a feature. The question asks what the patient shows, not what the genome did.',
        B: 'Correct. No ATP means no energy for vital activity, and in muscle that presents as muscular weakness — the department book\'s own applied note.',
        C: 'Failure to break down bilirubin is the smooth endoplasmic reticulum of the liver, which is why an underdeveloped one jaundices a newborn.',
        D: 'Lack of sulfatases is a lysosomal disease, the one that interferes with nerve cell function.',
      },
    },
    {
      key: 'one-of-the-following-structures-is-basophilic-in-staining-1b9bdd60',
      conceptKey: 'free-versus-attached-ribosomes-and-cytoplasmic-basophilia',
      difficulty: 'Easy', questionType: 'Stains and techniques',
      learningObjective: 'Name the cytoplasmic structure that takes the basic dye.',
      answerOverride: 'A',
      answerOverrideReason:
        'The source printed no key. Ribosomes are the only basophilic structure in the list — their RNA phosphate groups bind the basic dye. Smooth endoplasmic reticulum gives acidophilia, and neither the Golgi nor the lysosome is demonstrated in a routine section at all.',
      explanations: {
        A: 'Correct. The acidity of the phosphate groups in ribosomal RNA is what binds the basic dye, and it is the whole reason cytoplasm is ever blue.',
        B: 'Smooth endoplasmic reticulum, when abundant, makes the cytoplasm acidophilic — the opposite reaction.',
        C: 'The Golgi apparatus takes neither dye and appears as an unstained negative image.',
        D: 'Lysosomes cannot be seen in a routine section at all; they need the acid phosphatase reaction.',
      },
    },
    {
      key: 'peroxisomes-are-characterized-by-f8f8c6d8',
      conceptKey: 'peroxisome-oxidase-and-catalase',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Only two options survived extraction and the contract is four to five. Both surviving options are false as well — peroxisomes bud from the rough endoplasmic reticulum rather than the Golgi, and their enzymes are made on free ribosomes rather than by the smooth reticulum — so the correct answer is in what was lost. Asked twice across the books, which makes a rescan of this page worth doing.',
    },
    {
      key: 'the-cytoplasmic-organelle-which-contains-dna-rna-is-a57d4354',
      conceptKey: 'mitochondrion-ultrastructure-and-staining',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the organelle with its own genetic material.',
      explanations: {
        A: 'Rough endoplasmic reticulum carries ribosomes, which are RNA, but it holds no DNA of its own.',
        B: 'Smooth endoplasmic reticulum has neither, having no ribosomes at all.',
        C: 'A lysosome contains hydrolytic enzymes — including a nuclease, which acts on nucleic acid rather than containing it.',
        D: 'Correct. The mitochondrial matrix holds mitochondrial DNA together with mRNA, tRNA and rRNA, which is why the organelle can divide independently of the cell.',
      },
    },
    {
      key: 'the-most-prominent-cytoplasmic-organelles-in-monocytes-are-07106bba',
      conceptKey: 'organelle-content-identifies-what-a-cell-does',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Predict the organelle profile of a cell that is about to become a macrophage.',
      explanations: {
        A: 'Correct. The monocyte is the blood form of the macrophage, so it is built to digest: many lysosomes, and a prominent Golgi apparatus making them.',
        B: 'Glycogen granules are an inclusion of liver and muscle, not the defining content of a phagocyte.',
        C: 'Mitochondria are present in every cell. Being present everywhere makes them useless for identifying one.',
        D: 'Smooth endoplasmic reticulum marks a lipid- or steroid-forming cell, which is the opposite kind of work.',
      },
    },
    {
      key: 'the-wall-of-centrioles-is-composed-of-ebe08389',
      conceptKey: 'centriole-structure-and-role-in-cell-division',
      difficulty: 'Easy', questionType: 'Normal values',
      learningObjective: 'Count the microtubules in a centriole wall.',
      explanations: {
        A: '9 is the number of bundles, and it is the number of microtubules in a rootlet. Stopping at nine is the single commonest error in this leaf.',
        B: 'Correct. Nine bundles of three — 27 microtubules.',
        C: '72 is 9 × 8 and corresponds to nothing. It is in the set as a digit-reversal of 27.',
        D: '18 is the nine doublets of the ciliary shaft counted without its central pair.',
      },
    },
    {
      key: 'which-organelle-is-prominent-in-cells-that-synthesize-steroi-1a88c75b',
      conceptKey: 'ser-structure-function-steroid-detoxification',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Attribute steroid synthesis to smooth endoplasmic reticulum.',
      explanations: {
        A: 'Rough endoplasmic reticulum makes protein for export. A steroid is not a protein, so it needs no ribosomes at any point.',
        B: 'Correct. Smooth endoplasmic reticulum synthesises the steroid hormones — cortisone and testosterone are the book\'s examples — and is abundant in the cells that make them.',
        C: 'Lysosomes digest. They have no synthetic role.',
        D: 'Peroxisomes oxidise long-chain fatty acids and destroy hydrogen peroxide. They handle lipid but they do not build a hormone from it.',
      },
    },
    {
      key: 'cytoplasmic-basophilia-observed-in-lm-is-due-to-edb5e3b2',
      conceptKey: 'free-versus-attached-ribosomes-and-cytoplasmic-basophilia',
      difficulty: 'Easy', questionType: 'Stains and techniques',
      learningObjective: 'Attribute cytoplasmic basophilia to ribosomal RNA.',
      explanations: {
        A: 'The Golgi apparatus takes no dye in H&E; it appears as a pale gap in the basophilia rather than as a source of it.',
        B: 'Euchromatin is basophilic but it is nuclear. The stem says cytoplasmic, and this is the option that catches a student answering on staining alone.',
        C: 'Correct. Ribosomes, free or on the rough endoplasmic reticulum, are what make cytoplasm basophilic — the phosphate groups of their RNA are acidic and bind the basic dye.',
        D: 'Heterochromatin is more basophilic still, and equally nuclear. B and D are the same wrong answer offered twice, which is usually a sign that neither is it.',
      },
    },
    {
      key: '2-subunits-of-ribosome-unite-together-by-5001709f',
      conceptKey: 'ribosome-structure-and-origin-in-the-nucleolus',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Name what holds the two ribosomal subunits together during translation.',
      explanations: {
        A: 'Transfer RNA brings the amino acids in. It passes through the assembled ribosome but it is not what assembles it.',
        B: 'Ribosomal RNA is what the subunits are built from. It is inside each subunit rather than between them.',
        C: 'Correct. The two subunits come together only during protein synthesis, threaded onto the messenger RNA — which is also why a string of them on one mRNA is a polyribosome.',
        D: 'There is a correct option in the set, so "none of the above" cannot stand.',
      },
    },
    {
      key: 'a-45-female-patient-suffering-from-breast-cancer-the-doctor-206762d7',
      conceptKey: 'microtubule-structure-and-functions',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Explain why blocking one cytoskeletal element arrests a tumour.',
      answerOverride: 'C',
      answerOverrideReason:
        'The source printed no key. The department book states that cancer chemotherapy arrests proliferation in tumours by preventing microtubule formation, because the mitotic spindle is microtubule. Only C names that element.',
      explanations: {
        A: 'Microfilaments cleave the cell in two at the end of division, so blocking them would leave a binucleate cell rather than stopping division. They are not what the drug is aimed at.',
        B: 'Intermediate filaments are the other tumour answer in these books — the one a pathologist stains to find where the tumour came from. Staining and blocking are two different questions with the same setting, and this option is the other one\'s answer.',
        C: 'Correct. The mitotic spindle is built of microtubules, so a drug that prevents tubulin polymerising stops the cell dividing — the department book gives exactly this as its applied note.',
        D: 'The proteasome degrades abnormal proteins. Blocking it would not stop a cell dividing.',
      },
    },
    {
      key: 'a-brown-fibrillar-network-in-the-cytoplasm-represents-eb9cf7bb',
      conceptKey: 'golgi-apparatus-lm-appearance-and-position',
      difficulty: 'Moderate', questionType: 'Stains and techniques',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option C carries two options — "Golgi apparatus. d, Ribosomes" — so the correct answer shares a letter with a distractor and only three lettered options remain. The intact copy is `a-brownfibritlar-network-in-the-cytoplasm-represents-3a4d5d6f`, whose stem is worse but whose options are separate; that is the one to use. Kept so a rescan knows this row is a duplicate.',
    },
    {
      key: 'a-brownfibritlar-network-in-the-cytoplasm-represents-3a4d5d6f',
      conceptKey: 'golgi-apparatus-lm-appearance-and-position',
      difficulty: 'Moderate', questionType: 'Stains and techniques',
      learningObjective: 'Identify the Golgi apparatus from its silver appearance.',
      answerOverride: 'C',
      answerOverrideReason:
        'The source printed no key. A brown network of granules and fibrils is the department book\'s own description of the Golgi apparatus demonstrated by silver; no other option in the set is a network or is shown by silver.',
      explanations: {
        A: 'Primary lysosomes are separate vesicles and need the acid phosphatase reaction, which gives discrete deposits rather than a network.',
        B: 'Secondary lysosomes are likewise discrete bodies, and larger and more varied than the primary ones — still not a network.',
        C: 'Correct. Silver impregnation shows the Golgi apparatus as a network of brown granules and fibrils beside the nucleus. It is the positive counterpart of the negative Golgi image seen in H&E.',
        D: 'Ribosomes are far too small to resolve individually by light microscopy; what they produce is a diffuse blue tint, not a brown mesh.',
      },
    },
    {
      key: 'a-child-suffering-from-local-skeletal-muscle-weakness-in-the-bc2d94e7',
      conceptKey: 'mitochondrion-power-house-krebs-oxidative-phosphorylation-and-heat',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option C carries two options — "Membrane receptors defect 0. Lysosomal enzyme deficiency" — leaving three lettered choices with two answers behind one letter. The question is sound and its answer is mitochondrial damage, which is the department book\'s own applied note on muscular weakness; separating C from D at rescan is the whole repair.',
    },
    {
      key: 'a-lysosome-measures-0-4-pm-in-diameter-what-is-the-diameter-c3402333',
      conceptKey: 'lysosome-types-electron-microscopy',
      difficulty: 'Moderate', questionType: 'Normal values',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The stem reads "0.4 pm", where OCR has eaten the micron sign and left picometres. A lysosome 0.4 pm across would be 0.0004 nm, and none of the four options is that; the question can only be answered by silently correcting the stem, which a student sitting it cannot do. Recoverable by rescanning — the intended stem is 0.4 µm and the answer 400 nm.',
    },
    {
      key: 'a-patient-presenting-with-urine-troubles-and-fatty-liver-kid-ff724797',
      conceptKey: 'peroxisome-oxidase-and-catalase',
      difficulty: 'Hard', questionType: 'Clinical application',
      learningObjective: 'Trace a fatty liver with renal involvement to the peroxisome.',
      answerOverride: 'C',
      answerOverrideReason:
        'The source printed no key. Beta-oxidation of long-chain fatty acids is peroxisomal, and the peroxisome is abundant in liver and kidney — the two organs named in the stem. The department book states that lack of peroxisomal enzymes affects the function of organs such as the liver. C names the organelle and the fault together.',
      explanations: {
        A: 'A mitochondrial fault presents as failure of ATP production — weakness in muscle — rather than as fat accumulating in the liver.',
        B: 'Lysosomal enzyme deficiency leaves undigested material accumulating, and the department book\'s example of it is interference with nerve cell function.',
        C: 'Correct. Peroxisomes carry out beta-oxidation of long-chain fatty acids and are most abundant in liver and kidney, which is exactly the pair of organs the stem names.',
        D: 'Defective fat metabolism is the consequence, not the cause. The question asks what examination of the organs showed, and every other option names an organelle.',
      },
    },
    {
      key: 'a-small-tumor-was-exercised-from-the-adrenal-gland-of-an-adu-f5582ccb',
      conceptKey: 'ser-structure-function-steroid-detoxification',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Predict the organelle profile of a steroid-secreting tumour.',
      explanations: {
        A: 'Correct. Steroid hormones are synthesised on smooth endoplasmic reticulum, so a cell making them in excess is packed with it — and the adrenal cortex is the type example of such a cell.',
        B: 'Peroxisomes oxidise fatty acids and destroy hydrogen peroxide. They handle lipid, which makes them tempting, but they build no hormone.',
        C: 'The Golgi apparatus packs and modifies protein for export. A steroid is small and lipid-soluble and leaves the cell by diffusion, needing no packaging at all.',
        D: 'Rough endoplasmic reticulum makes exported protein. A student who answers "hormone, therefore export, therefore rER" has reasoned well but forgotten that a steroid is not a protein.',
      },
    },
    {
      key: 'abnormal-short-lived-proteins-are-degraded-by-5ffd9c0f',
      conceptKey: 'proteasome-degrades-abnormal-and-short-lived-proteins',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Separate proteasomal from lysosomal degradation.',
      answerOverride: 'B',
      answerOverrideReason:
        'The source printed no key. Abnormal and short-lived cytosolic proteins are tagged with ubiquitin and destroyed by the proteasome; the lysosome digests engulfed material and worn-out organelles. Only B is the proteasome.',
      explanations: {
        A: 'The lysosome digests what has been taken into the cell and whole organelles that are worn out. It is a membrane-bound compartment, and a soluble cytosolic protein never enters it.',
        B: 'Correct. The proteasome is a non-membranous complex in the cytosol that destroys abnormal, misfolded and short-lived proteins after they have been ubiquitin-tagged.',
        C: 'Peroxisomes hold oxidases and catalase and act on fatty acids and hydrogen peroxide, not on protein.',
        D: 'An endosome is a vesicle of material taken in from outside, on its way to a lysosome. Again the wrong side of a membrane.',
      },
    },
    {
      key: 'abundance-of-attached-ribosomes-in-the-cytoplasm-is-indicati-ec968717',
      conceptKey: 'free-versus-attached-ribosomes-and-cytoplasmic-basophilia',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Infer what a cell is making from its attached ribosomes.',
      explanations: {
        A: 'Correct. Attached ribosomes feed their product into the lumen of the rough endoplasmic reticulum, which segregates it and sends it to the Golgi for export.',
        B: 'Protein for the cell\'s own use is made on free ribosomes, which release it straight into the cytosol. This is the paired question\'s answer, and the two rows appear together with identical options.',
        C: 'Excessive phagocytosis would show as many lysosomes, not many ribosomes.',
        D: 'Attached and free ribosomes do opposite jobs, so "all of the above" would have the same cell exporting and retaining the same protein.',
      },
    },
    {
      key: 'abundance-of-free-ribosomes-in-the-cytoplasm-is-indicative-o-01e3431b',
      conceptKey: 'free-versus-attached-ribosomes-and-cytoplasmic-basophilia',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Infer what a cell is making from its free ribosomes.',
      explanations: {
        A: 'Protein for export needs the rough endoplasmic reticulum to segregate and package it, so it is made on attached ribosomes. This is the companion question\'s answer.',
        B: 'Correct. A free ribosome releases its product into the cytosol, so what it makes is what the cell keeps — its glycolytic enzymes, the proteins of its own growth, and the enzymes of its peroxisomes.',
        C: 'Phagocytosis is read from lysosome content, not from ribosomes.',
        D: 'The two ribosome populations make different destinations of protein, so no cell shows both meanings at once.',
      },
    },
    {
      key: 'all-are-true-about-rer-except-d806313d',
      conceptKey: 'rough-endoplasmic-reticulum-structure-and-protein-export',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Separate rough from smooth endoplasmic reticulum by function.',
      answerOverride: 'C',
      answerOverrideReason:
        'The source printed no key. A, B and D are all stated by the department book of the rough reticulum. Drug detoxification in the liver is the smooth reticulum\'s function, so C is the exception.',
      explanations: {
        A: 'True, so not the exception. Intercommunicating cisternae are what the endoplasmic reticulum is.',
        B: 'True, so not the exception. It is continuous with the outer membrane of the nuclear envelope, which is itself ribosome-studded for the same reason.',
        C: 'The exception, and the answer. Detoxification of drugs and alcohol in the liver is smooth endoplasmic reticulum. The two halves of one organelle are set against each other in almost every question about either.',
        D: 'True, so not the exception. The ribosomes are on the outer, cytoplasmic surface — which is where the messenger RNA is.',
      },
    },
    {
      key: 'all-characters-of-peroxisome-except-7d3660cd',
      conceptKey: 'peroxisome-oxidase-and-catalase',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Place the peroxisome in liver and kidney rather than in phagocytes.',
      explanations: {
        A: 'True, so not the exception. Liver and kidney cells are where peroxisomes are most abundant.',
        B: 'True, so not the exception. Peroxisomes increase in number by division, as mitochondria do.',
        C: 'The exception, and the answer. The organelle abundant in phagocytic cells is the lysosome. Both are single-membrane enzyme bags, and this substitution is the trap in every peroxisome question in these books.',
        D: 'True, so not the exception. Oxidase is one of the peroxisome\'s two enzyme groups, catalase being the other.',
      },
    },
    {
      key: 'all-function-of-microfilament-except-591d93fc',
      conceptKey: 'microfilament-structure-and-functions',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Attribute the mitotic spindle to microtubules, not microfilaments.',
      explanations: {
        A: 'True, so not the exception. Actin changes the shape of the cell in endocytosis.',
        B: 'The exception, and the answer. The mitotic spindle is microtubule. The microfilament\'s part in division comes later, cleaving the cell in two once the chromosomes have separated — so both elements act in mitosis, at different moments.',
        C: 'True, so not the exception. The cleavage furrow is a contractile ring of actin.',
        D: 'True, so not the exception. The core of a microvillus is a bundle of actin filaments.',
      },
    },
    {
      key: 'all-functions-of-golgi-except-03f2c834',
      conceptKey: 'golgi-apparatus-em-structure-products-and-functions',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Separate what the Golgi does from what the mitochondrion does.',
      explanations: {
        A: 'True, so not the exception. Packing, concentration and storage of the secretory product are the Golgi\'s core work.',
        B: 'True, so not the exception. Chemical modification — adding carbohydrate to make glycoprotein — happens as the protein moves through the stack.',
        C: 'True, so not the exception. Secretory vesicles and lysosomes both bud from its exit face.',
        D: 'The exception, and the answer. Cell respiration and energy production are the mitochondrion\'s. This option is the odd one in a list otherwise entirely about handling protein, which is what makes it findable without knowing every Golgi function.',
      },
    },
    {
      key: 'all-functions-of-microtubule-except-c338b1ec',
      conceptKey: 'microtubule-structure-and-functions',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Attribute endocytic shape change to microfilaments, not microtubules.',
      explanations: {
        A: 'True, so not the exception. Microtubules determine cell shape and cell elongation.',
        B: 'True, so not the exception. They are the tracks along which organelles and vesicles are moved.',
        C: 'The exception, and the answer. Changing the shape of the cell during endocytosis is actin — the microfilament. This row is the mirror image of `all-function-of-microfilament-except`, which offers the spindle; between them the two questions test the same boundary from both sides.',
        D: 'True, so not the exception. The mitotic spindle is microtubule.',
      },
    },
    {
      key: 'all-hydrolytic-enzymes-in-lysosome-except-1f7e0f29',
      conceptKey: 'lysosome-enzymes-origin-and-functions',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Recognise the oxidase as a peroxisomal rather than a lysosomal enzyme.',
      explanations: {
        A: 'True, so not the exception. Phospholipase hydrolyses phospholipid.',
        B: 'True, so not the exception. Acid phosphatase is the lysosome\'s marker enzyme, and the reaction that demonstrates the organelle.',
        C: 'True, so not the exception. Nuclease hydrolyses nucleic acid.',
        D: 'The exception, and the answer. An oxidase oxidises rather than hydrolyses, and it belongs to the peroxisome. Every option here ends in "-ase", so the choice has to be made on the chemistry rather than on the word.',
      },
    },
    {
      key: 'all-of-the-following-are-basophilic-except-8f35a8d8',
      conceptKey: 'free-versus-attached-ribosomes-and-cytoplasmic-basophilia',
      difficulty: 'Easy', questionType: 'Stains and techniques',
      learningObjective: 'Recognise the mitochondrion as acidophilic among basophilic structures.',
      explanations: {
        A: 'True, so not the exception. The nuclear membrane is basophilic like the rest of the nucleus.',
        B: 'True, so not the exception. Chromatin is basophilic from the phosphate of its DNA.',
        C: 'True, so not the exception. Rough endoplasmic reticulum is basophilic because of the RNA of its ribosomes.',
        D: 'The exception, and the answer. Mitochondria are acidophilic, and are demonstrated by iron haematoxylin or Janus green rather than by the basic dye of a routine section. Everything else in the list owes its colour to nucleic acid; the mitochondrion is the one whose bulk is protein.',
      },
    },
    {
      key: 'all-of-the-following-are-cytoskeleton-except-e6b7c353',
      conceptKey: 'cytoskeleton-is-three-filament-systems',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Exclude the thick filament from the cytoskeleton.',
      explanations: {
        A: 'True, so not the exception. Microtubules are the first of the three.',
        B: 'True, so not the exception. Microfilaments — thin filaments — are the second.',
        C: 'The exception, and the answer. Thick filaments are myosin of the muscle contractile apparatus. The trap is the pairing: thin filaments really are cytoskeletal, so "thick" reads as its natural partner.',
        D: 'True, so not the exception. Intermediate filaments are the third.',
      },
    },
    {
      key: 'all-of-the-following-are-function-of-golgi-apparatus-except-3def17d8',
      conceptKey: 'golgi-apparatus-em-structure-products-and-functions',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Recognise that the Golgi handles protein but does not make it.',
      explanations: {
        A: 'True, so not the exception. Chemical modification of protein is one of its functions.',
        B: 'True, so not the exception. Concentration of the secretory product happens in the stack.',
        C: 'The exception, and the answer. Protein is synthesised on ribosomes; the Golgi receives it already made. Everything the Golgi does to a protein is done to something someone else built.',
        D: 'True, so not the exception. Secretory vesicles bud from the exit face.',
      },
    },
    {
      key: 'all-of-the-following-are-membranous-organelles-except-8b29ab8c',
      conceptKey: 'organelles-inclusions-and-the-membranous-classification',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Recognise the centriole as non-membranous.',
      answerOverride: 'C',
      answerOverrideReason:
        'The source printed no key. The cell membrane, rough endoplasmic reticulum and lysosome are all on the department book\'s membranous list; the centriole is built of microtubules and has no membrane, so C is the exception.',
      explanations: {
        A: 'True, so not the exception. The plasma membrane heads the book\'s own list of membranous organelles.',
        B: 'True, so not the exception. Rough endoplasmic reticulum is a membranous network.',
        C: 'The exception, and the answer. A centriole is nine triplets of microtubules and nothing else — no membrane anywhere, which puts it with the ribosomes and the cytoskeleton.',
        D: 'True, so not the exception. A lysosome is bounded by a single membrane, and that membrane is what keeps its hydrolases off the cytoplasm.',
      },
    },
    {
      key: 'all-of-the-following-are-products-of-golgi-apparatus-except-6aaae4bb',
      conceptKey: 'golgi-apparatus-em-structure-products-and-functions',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Recognise the transfer vesicle as a Golgi input rather than a Golgi product.',
      explanations: {
        A: 'True, so not the exception. Secretory vesicles bud from the exit face.',
        B: 'The exception, and the answer. Transfer vesicles come *from* the rough endoplasmic reticulum and arrive at the cis face carrying newly made protein. Everything else in the list leaves; this one arrives, and the direction is the whole question.',
        C: 'True, so not the exception. Primary lysosomes bud from the exit face too.',
        D: 'True, so not the exception. Coated vesicles are among the Golgi\'s products, which is how it renews the cell membrane.',
      },
    },
    {
      key: 'all-of-the-following-are-true-as-regard-the-centrioles-excep-16c90175',
      conceptKey: 'centriole-structure-and-role-in-cell-division',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Read the count and the filament type of a centriole together.',
      explanations: {
        A: 'True, so not the exception. The two centrioles sit at the heart of the microtubule organising centre.',
        B: 'True, so not the exception. Two, perpendicular to one another, in a cell that is not dividing.',
        C: 'True, so not the exception. They organise the mitotic spindle after the centrosome duplicates in S phase.',
        D: 'The exception, and the answer. The number 27 is right but the filament is wrong: a centriole is 27 micro*tubules*, not microfilaments. This is a one-word substitution in an otherwise correct statement, which is the hardest kind of exception to see.',
      },
    },
    {
      key: 'all-of-the-following-are-types-of-secondary-lysosomes-except-422da526',
      conceptKey: 'lysosome-types-secondary-fates',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the three secondary lysosomes and reject a nuclear structure.',
      explanations: {
        A: 'True, so not the exception. A multivesicular body is a primary lysosome fused with a pinocytic vesicle.',
        B: 'True as the books use it here — the residual body is the end state of a secondary lysosome and is listed with them. It is the option a careful student hesitates over, since strictly it is a fate rather than a fourth type.',
        C: 'True, so not the exception. A heterolysosome is a primary lysosome fused with a phagosome.',
        D: 'The exception, and the answer. A Barr body is the inactivated X chromosome, seen as a drumstick on the neutrophil nucleus. It is nuclear and has nothing to do with digestion; the word "body" is the only thing it shares with the rest of the list.',
      },
    },
    {
      key: 'all-of-the-following-share-in-the-formation-of-cytoskeleton-fade47d2',
      conceptKey: 'cytoskeleton-is-three-filament-systems',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Exclude the mitochondrion from the cytoskeleton.',
      explanations: {
        A: 'True, so not the exception. Microtubules are one of the three elements.',
        B: 'True, so not the exception. Microfilaments are another.',
        C: 'True as the books use it — centrioles are built of microtubules and are counted with the cytoskeleton in the department book\'s own table of non-membranous organelles.',
        D: 'The exception, and the answer. A mitochondrion is a membranous organelle that makes energy; it is moved *by* the cytoskeleton rather than being part of it.',
      },
    },
    {
      key: 'all-of-the-followings-are-membranous-organelles-except-e0aa5ebf',
      conceptKey: 'organelles-inclusions-and-the-membranous-classification',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Recognise the microtubule as non-membranous.',
      answerOverride: 'C',
      answerOverrideReason:
        'The source printed no key. Coated vesicles, peroxisomes and lysosomes are all bounded by membrane; the microtubule is a cytoskeletal cylinder of tubulin with none. C is the exception.',
      explanations: {
        A: 'True, so not the exception. A coated vesicle is a piece of the plasma membrane that has pinched off, so it is as membranous as the membrane it came from.',
        B: 'True, so not the exception. A peroxisome is a vesicle bounded by a single membrane.',
        C: 'The exception, and the answer. A microtubule is a hollow cylinder whose wall is thirteen protofilaments of tubulin protein. It is hollow, but a hollow made of protein is not a membrane.',
        D: 'True, so not the exception. A lysosome has a single limiting membrane.',
      },
    },
    {
      key: 'all-the-following-are-true-about-lysosomes-except-7d572d89',
      conceptKey: 'lysosome-enzymes-origin-and-functions',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Separate lysosomal digestion from smooth-reticulum detoxification.',
      explanations: {
        A: 'True, so not the exception. Lysosomes bud from the exit face of the Golgi apparatus.',
        B: 'True, so not the exception. They are invisible in a routine section and need the acid phosphatase histochemical reaction.',
        C: 'True, so not the exception. Hydrolytic enzymes are their defining content.',
        D: 'The exception, and the answer. Detoxification of drugs is smooth endoplasmic reticulum. Both organelles break molecules down, which is why the substitution is tempting, but the lysosome works on what has been engulfed or worn out.',
      },
    },
    {
      key: 'all-the-following-statements-are-true-about-mitochondria-exc-7d66fca9',
      conceptKey: 'mitochondrion-ultrastructure-and-staining',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Recognise that protein synthesis is not what the department book gives mitochondria.',
      explanations: {
        A: 'The exception, and the answer. The site of protein synthesis is the ribosome, free or on the rough endoplasmic reticulum. The mitochondrion holds RNA of its own, which is why this option catches students who reason from the presence of RNA, but the book gives it no synthetic role.',
        B: 'True, so not the exception. Oxidative phosphorylation happens on the inner membrane.',
        C: 'True, so not the exception. Number and shape both vary with the cell and its activity.',
        D: 'True, so not the exception. Mitochondrial DNA is in the matrix, and it is why the organelle can divide on its own.',
      },
    },
    {
      key: 'all-the-statements-concerning-peroxisomes-are-true-except-th-bd68bd06',
      conceptKey: 'peroxisome-oxidase-and-catalase',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Reject hydrolytic enzymes as peroxisomal.',
      answerOverride: 'A',
      answerOverrideReason:
        'The book keys D, but breaking down excess hydrogen peroxide is exactly what peroxisomal catalase does — the department book states it — so D is true and cannot be the exception. A is the false statement: hydrolytic enzymes are the lysosome\'s. The book\'s key has taken the last option rather than the wrong one.',
      explanations: {
        A: 'The exception, and the answer. Hydrolytic enzymes belong to the lysosome. The peroxisome holds oxidases and catalase, and this single substitution is what almost every peroxisome question in these books turns on.',
        B: 'True, so not the exception. Peroxisomes are spherical vesicles bounded by a single membrane.',
        C: 'True, so not the exception. The oxidases generate hydrogen peroxide as a by-product of beta-oxidation.',
        D: 'True, so not the exception. Catalase breaks that hydrogen peroxide into water and oxygen — the organelle makes its own poison and then destroys it. This is the option the book keys, and it is one of the two things a peroxisome is for.',
      },
    },
    {
      key: 'all-the-statements-concerning-ser-are-true-except-35fd0656',
      conceptKey: 'ser-structure-function-steroid-detoxification',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Recall that the endoplasmic reticulum is bounded by one membrane, not two.',
      answerOverride: 'C',
      answerOverrideReason:
        'The book keys B, but detoxification of toxins and drugs is the smooth reticulum\'s best-known function and cannot be the exception. C is the false statement: the endoplasmic reticulum, rough or smooth, is bounded by a single membrane — two membranes is the mitochondrion and the nuclear envelope.',
      explanations: {
        A: 'True, so not the exception. Smooth endoplasmic reticulum is abundant in lipid-synthesising cells such as the liver cell.',
        B: 'True, so not the exception. Detoxification of drugs, alcohol and hormones is one of its named functions. This is the option the book keys, and taking it would mean denying the function the organelle is most famous for.',
        C: 'The exception, and the answer. The endoplasmic reticulum has one membrane. Two-membrane organelles are the mitochondrion and the nucleus, and importing that number here is the mistake being tested.',
        D: 'True, so not the exception. In muscle the smooth reticulum is the sarcoplasmic reticulum, and its calcium release is what triggers contraction.',
      },
    },
    {
      key: 'an-organelle-in-the-cytoplasm-that-has-dna-is-called-3a0b43e8',
      conceptKey: 'mitochondrion-ultrastructure-and-staining',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option B has been lost entirely — the extracted row runs A, C, D — and the answer, mitochondria, is what B held in the intact copies of this question elsewhere in the bank. Three options remain and none of them is right, so the row cannot be sat or scored. The intact copies are `the-cytoplasmic-organelle-which-contains-dna-rna-is-a57d4354` and `the-cytoplasmic-organelle-which-contains-dna-rna-is-0-5c91f4fc`.',
    },
    {
      key: 'apatient-presenting-with-urine-troubles-and-fatty-liver-kidn-bbe49d60',
      conceptKey: 'peroxisome-oxidase-and-catalase',
      difficulty: 'Hard', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option A carries two options — "Mitochondrial abnormalities 6. Lysosomal enzyme deficiency" — so two answers share one letter. This is a second printing of `a-patient-presenting-with-urine-troubles-and-fatty-liver-kid-ff724797` with a different and more specific option set, in which the answer is the defective peroxisomal oxidases of option C; the cleaner copy is the one to use, and this row is kept so a rescan knows the pair belong together.',
    },
    {
      key: 'as-regards-golgi-apparatus-75de1247',
      conceptKey: 'golgi-apparatus-lm-appearance-and-position',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Give the Golgi\'s position in the nerve cell and reject the smooth reticulum\'s functions.',
      explanations: {
        A: 'Correct. In the nerve cell the Golgi is perinuclear — around the nucleus — because the cell has no single secretory surface to face.',
        B: 'Apical position belongs to a secretory cell discharging at a free surface. "Always" is what makes this option false: the nerve cell is the counter-example the books use.',
        C: 'The Golgi\'s saccules are flat and curved and stacked above one another, not parallel flat cisternae — that description belongs to the rough endoplasmic reticulum.',
        D: 'Detoxification of drugs and alcohol is smooth endoplasmic reticulum. It is the function most often lent to the wrong organelle in this leaf.',
      },
    },
    {
      key: 'autolysodomes-are-formed-when-a-1ry-lysosome-fuses-with-f87db0d5',
      conceptKey: 'lysosome-types-secondary-fates',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Match the autolysosome to the substrate it fused with.',
      answerOverride: 'A',
      answerOverrideReason:
        'The book keys C, the pinocytic vesicle, which forms the multivesicular body. "Auto-" means the cell\'s own material: an autolysosome is a primary lysosome fused with an old organelle, option A. The same books key `autolysosome-is-formed-of-primary-lysosome-bb187ec0` correctly as the destroyed organelle, which is what makes this key visibly wrong.',
      explanations: {
        A: 'Correct. Auto- means self: the substrate is the cell\'s own worn-out organelle, wrapped in an autophagic vesicle.',
        B: 'A phagosome — material engulfed from outside — gives the heterolysosome. Hetero- is the opposite prefix, and the two words carry the whole distinction.',
        C: 'A pinocytic vesicle gives the multivesicular body. This is the option the book keys, and it names the wrong one of the three fusions.',
        D: 'A residual body is what is left at the end of digestion, not what starts it.',
      },
    },
    {
      key: 'autolysosome-is-formed-of-primary-lysosome-bb187ec0',
      conceptKey: 'lysosome-types-secondary-fates',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Match the autolysosome to the substrate it fused with.',
      explanations: {
        A: 'Two primary lysosomes fusing would give a larger primary lysosome and no digestion at all — nothing has been brought in to digest.',
        B: 'Correct. A destroyed or worn-out organelle, taken up in an autophagic vesicle, is what the primary lysosome fuses with to make an autolysosome.',
        C: 'A pinocytic vesicle gives the multivesicular body — fluid rather than an organelle.',
        D: 'A residual body is the end state after digestion, so it cannot be the starting substrate.',
      },
    },
    {
      key: 'autolysosomes-are-formed-when-a-1ry-lysosome-fuses-with-826ef1d2',
      conceptKey: 'lysosome-types-secondary-fates',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option D has been overwritten by text from the next question on the page — it reads "detoxify drugs and alcohol. | hormones?" — so the fourth option is not an option at all. The intact copy is `autolysosomes-are-formed-when-a-iry-lysosome-fuses-with-c27033a3`, whose stem has "iry" for "1ry" but whose four options are clean. Kept so a rescan knows this row is a duplicate.',
    },
    {
      key: 'autolysosomes-are-formed-when-a-iry-lysosome-fuses-with-c27033a3',
      conceptKey: 'lysosome-types-secondary-fates',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Match the autolysosome to the substrate it fused with.',
      answerOverride: 'A',
      answerOverrideReason:
        'The source printed no key. An autolysosome is a primary lysosome fused with the cell\'s own old organelle, which is option A; the phagosome gives a heterolysosome and the pinocytic vesicle a multivesicular body.',
      explanations: {
        A: 'Correct. The cell\'s own worn-out organelle — auto- means self, and that prefix is the whole answer.',
        B: 'A phagosome holds material taken in from outside and gives the heterolysosome.',
        C: 'A pinocytic vesicle holds fluid and gives the multivesicular body, whose many small vesicles inside are what name it.',
        D: 'A residual body is undigested residue at the end of the process, not a substrate at its start.',
      },
    },
    {
      key: 'axoneme-of-cilia-consists-of-7bdb56fa',
      conceptKey: 'cilium-origin-and-ultrastructure',
      difficulty: 'Moderate', questionType: 'Normal values',
      learningObjective: 'Count the microtubules in a ciliary axoneme.',
      answerOverride: 'C',
      answerOverrideReason:
        'The book keys B, 18, which counts the nine peripheral doublets and forgets the central pair. The axoneme is 9 doublets plus 2 central singlets — 20 microtubules — and the same books key `the-axoneme-of-the-cilia-has-2ff05c64` correctly as 20.',
      explanations: {
        A: '9 is the number of rootlet microtubules, and the number of bundles in a centriole. It is what is left if the doublets are counted as units.',
        B: '18 is nine doublets counted without the central pair. This is the option the book keys, and the two missing microtubules in the middle are exactly what the "9+2" formula exists to stop you forgetting.',
        C: 'Correct. Nine peripheral doublets — 18 — plus two central singlets makes 20.',
        D: '27 is the basal body and the centriole, nine triplets. That is the structure the shaft grows out of, not the shaft.',
      },
    },
    {
      key: 'basal-body-of-cilia-consists-of-2a6d940d',
      conceptKey: 'cilium-origin-and-ultrastructure',
      difficulty: 'Moderate', questionType: 'Normal values',
      learningObjective: 'Count the microtubules in a ciliary basal body.',
      answerOverride: 'D',
      answerOverrideReason:
        'The book keys B, 18. The basal body has exactly the structure of a centriole — nine triplets, 27 microtubules — and the same books key `concerning-basal-body-it-is-formed-of-f8373bc5` and `the-basal-body-of-the-cilia-has-d824d86d` correctly as 27.',
      explanations: {
        A: '9 is the rootlet, formed from the C microtubule of each of the nine triplets.',
        B: '18 is the doublets of the shaft counted without their central pair, and it belongs to neither structure as a final answer. This is the option the book keys.',
        C: '20 is the shaft — the axoneme — with its central pair. The shaft grows from the basal body but does not have its structure.',
        D: 'Correct. 27, in nine triplets: the basal body is a centriole that has migrated to the apical surface, and it keeps a centriole\'s arrangement exactly.',
      },
    },
    {
      key: 'basophilia-of-the-cytoplasm-is-due-to-7c5699e3',
      conceptKey: 'free-versus-attached-ribosomes-and-cytoplasmic-basophilia',
      difficulty: 'Easy', questionType: 'Stains and techniques',
      learningObjective: 'Attribute cytoplasmic basophilia to ribosomes wherever they sit.',
      explanations: {
        A: 'Correct. Both populations count: free ribosomes and the ribosomes studding the rough endoplasmic reticulum, because the basophilia comes from the RNA and not from the membrane it sits on.',
        B: 'Smooth endoplasmic reticulum has no ribosomes and gives acidophilia — the opposite reaction, from the opposite half of the same organelle.',
        C: 'The Golgi apparatus takes neither dye and shows as an unstained gap.',
        D: 'Lysosomes are invisible without histochemistry and are far too few to colour a whole cytoplasm.',
      },
    },
    {
      key: 'beta-oxidation-occurs-in-7d845d2a',
      conceptKey: 'peroxisome-oxidase-and-catalase',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Attribute beta-oxidation of long-chain fatty acids to the peroxisome as this faculty teaches it.',
      answerOverride: 'D',
      answerOverrideReason:
        'The book keys B, the inner mitochondrial membrane, which is wrong twice over: the department book attributes beta-oxidation of long-chain fatty acids to the peroxisomal oxidases, producing heat rather than ATP, and even the mitochondrial share of beta-oxidation is a matrix process rather than a membrane one. Overridden to D on the faculty\'s own text.',
      explanations: {
        A: 'The matrix holds the citric acid cycle. If beta-oxidation were being asked as a mitochondrial process this would be the option, not the inner membrane — but the department book gives the process to the peroxisome.',
        B: 'The inner membrane carries the respiratory chain and ATP synthase. Nothing is oxidised there in the sense this question means. This is the option the book keys.',
        C: 'Lysosomes hydrolyse; they do not oxidise.',
        D: 'Correct as the department book teaches it. Peroxisomal oxidases carry out beta-oxidation of long-chain fatty acids, producing heat and hydrogen peroxide — which is why the organelle needs catalase.',
      },
    },
    {
      key: 'both-oxidases-and-catalase-enzymes-are-present-in-aee6b7c4',
      conceptKey: 'peroxisome-oxidase-and-catalase',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Recognise "microbody" as the peroxisome\'s other name.',
      answerOverride: 'C',
      answerOverrideReason:
        'The source printed no key. Oxidases and catalase together define the peroxisome, and microbody is the department book\'s own alternative name for it.',
      explanations: {
        A: 'Mitochondria hold the oxidative enzymes of the citric acid cycle and the respiratory chain, but not catalase — and it is catalase that pins this answer down.',
        B: 'Microtubules are cytoskeletal cylinders of tubulin and hold no enzymes at all. The option is here because the word begins the same way as the answer.',
        C: 'Correct. Microbody is the peroxisome, and oxidase plus catalase is exactly its enzyme content: the oxidase makes hydrogen peroxide and the catalase destroys it.',
        D: 'Microfilaments are actin, and likewise hold no enzymes. Three of the four options begin with "micro-", which is what the question is really testing.',
      },
    },
    {
      key: 'by-em-the-pericytes-contain-a-network-of-09c35afd',
      conceptKey: 'microfilament-structure-and-functions',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Recognise a contractile cell by its actin and myosin.',
      explanations: {
        A: 'True, but not the whole answer. Actin is half of a contractile network.',
        B: 'True, but not the whole answer. Myosin is the motor that pulls on the actin, and neither does anything without the other.',
        C: 'Microtubules would give a transport and shape system, not a contractile one. The pericyte wraps a capillary and squeezes it, which needs actin and myosin.',
        D: 'Correct. Both, because contraction is what a pericyte does, and contraction is always actin against myosin.',
      },
    },
    {
      key: 'cell-membrane-extrudes-vesicles-from-the-cytoplasm-to-outsid-019c70f5',
      conceptKey: 'endocytosis-three-types-and-exocytosis',
      difficulty: 'Easy', questionType: 'Mechanism',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option C carries two options — "phagocytosis d.pinocytosis" — so only three lettered choices remain and one of them holds two answers. The question is sound and its answer is exocytosis; separating C from D at rescan is the whole repair, and the same defect appears on several rows from this book.',
    },
    {
      key: 'cell-organelle-surrounded-by-2-membranes-2b6da30f',
      conceptKey: 'mitochondrion-ultrastructure-and-staining',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Name every structure in the cell bounded by two membranes.',
      answerOverride: 'D',
      answerOverrideReason:
        'The source printed no key. Both the nucleus, through its double-walled envelope, and the mitochondrion have two membranes, so neither A nor B alone is complete and D is the answer.',
      explanations: {
        A: 'True, but not the whole answer. The nuclear envelope is two parallel unit membranes with a perinuclear space between them.',
        B: 'True, but not the whole answer. The mitochondrion has a smooth outer membrane and a folded inner one.',
        C: 'Microtubules have no membrane at all — they are protein cylinders, and they belong with the ribosomes among the non-membranous organelles.',
        D: 'Correct. Two membranes is the feature that picks out exactly these two structures in the whole cell, which is why the books keep asking it.',
      },
    },
    {
      key: 'cells-active-in-protein-formation-have-5bdacd34',
      conceptKey: 'organelle-content-identifies-what-a-cell-does',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Assemble the whole organelle profile of a protein-exporting cell.',
      answerOverride: 'D',
      answerOverrideReason:
        'The source printed no key. Rough endoplasmic reticulum, the Golgi complex and ribosomes are three consecutive stations on one production line, and a protein-exporting cell is rich in all three, so D is the only complete answer.',
      explanations: {
        A: 'True, but not the whole answer. Rough endoplasmic reticulum is where the protein is made and segregated.',
        B: 'True, but not the whole answer. The Golgi complex packs, concentrates and modifies it afterwards.',
        C: 'True, but not the whole answer. The ribosomes on that reticulum are what actually assemble the polypeptide.',
        D: 'Correct. The three are one pathway rather than three independent facts, and a cell that has one of them in quantity has all three.',
      },
    },
    {
      key: 'cells-extrude-materials-by-06b23eda',
      conceptKey: 'endocytosis-three-types-and-exocytosis',
      difficulty: 'Easy', questionType: 'Mechanism',
      learningObjective: 'Name the process that moves material out of the cell.',
      explanations: {
        A: 'Endocytosis is the umbrella term for taking material *in*. It is the opposite direction, and the prefix is the whole distinction.',
        B: 'Correct. Exocytosis: a cytoplasmic vesicle fuses with the plasma membrane and discharges its contents outside, without breaking the membrane\'s continuity.',
        C: 'Phagocytosis is a kind of endocytosis, and takes solids in.',
        D: 'Pinocytosis is a kind of endocytosis too, and takes fluid in. Three of the four options move material inwards.',
      },
    },
    {
      key: 'cells-that-are-involved-in-phagocytosis-of-extra-cellular-ma-9b1e4bf6',
      conceptKey: 'organelle-content-identifies-what-a-cell-does',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Predict the organelle profile of a phagocyte.',
      explanations: {
        A: 'Rough endoplasmic reticulum marks a cell exporting protein — the plasma cell, the fibroblast. A phagocyte builds little and digests much.',
        B: 'Correct. Lysosomes are what a phagocyte needs, because engulfing a particle achieves nothing until the hydrolytic enzymes reach it.',
        C: 'Smooth endoplasmic reticulum marks a lipid- or steroid-forming cell.',
        D: 'Ribosomes are in every cell and are prominent where protein is being made. They mark synthesis, and this cell\'s work is destruction.',
      },
    },
    {
      key: 'centriole-consists-of-811ed4c0',
      conceptKey: 'centriole-structure-and-role-in-cell-division',
      difficulty: 'Moderate', questionType: 'Normal values',
      learningObjective: 'Count the microtubules in a centriole.',
      answerOverride: 'D',
      answerOverrideReason:
        'The book keys C, 20, which is the ciliary shaft. A centriole is nine triplets — 27 microtubules — and the same books key `the-wall-of-the-centriole-is-formed-of-7ed317ec`, `wall-of-each-centriole-contain-mts-4e879533` and `the-wall-of-centrioles-is-composed-of-ebe08389` all as 27. This page has slipped one row of a four-row block that asks 9, 18, 20 and 27 in turn.',
      explanations: {
        A: '9 is the rootlet, and the number of bundles in a centriole rather than the number of microtubules.',
        B: '18 is nine doublets — the ciliary shaft without its central pair.',
        C: '20 is the ciliary shaft complete, nine doublets plus two central singlets. This is the option the book keys, and it belongs to the structure the centriole gives rise to rather than to the centriole.',
        D: 'Correct. Nine triplets, 27 microtubules, and no central pair at all.',
      },
    },
    {
      key: 'characters-of-organelles-00245254',
      conceptKey: 'organelles-inclusions-and-the-membranous-classification',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'List the properties that separate an organelle from an inclusion.',
      explanations: {
        A: 'True, but not the whole answer. Living and permanent are the first two of the book\'s five.',
        B: 'True, but not the whole answer. Essential and active are the next two.',
        C: 'True, but not the whole answer. Having a vital function is the fifth.',
        D: 'Correct. All five are one contrast against the inclusion, which is non-living, temporary, usually not essential, inert and a result of the cell\'s activity rather than a doer of it.',
      },
    },
    {
      key: 'complex-network-of-microtubule-intermediate-filaments-microf-0c99a31a',
      conceptKey: 'cytoskeleton-is-three-filament-systems',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the network the three filament systems make.',
      explanations: {
        A: 'A ribosome is a single particle of rRNA and protein, not a network.',
        B: 'A proteasome is a protein-degrading complex, also a discrete particle.',
        C: 'A lysosome is a membrane-bound vesicle of enzymes.',
        D: 'Correct. Microtubules, microfilaments and intermediate filaments with their linking proteins are the cytoskeleton — the microtrabecular lattice that fills the cytosol.',
      },
    },
    {
      key: 'components-of-the-nucleolus-are-all-of-the-following-except-4504bc51',
      conceptKey: 'peroxisome-oxidase-and-catalase',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Recognise the peroxisome as cytoplasmic and so not part of the nucleolus.',
      explanations: {
        A: 'True, so not the exception. Pars granulosa is mature rRNA, one of the nucleolus\'s three dark parts.',
        B: 'True, so not the exception. Pars amorpha is the nucleolar organiser, the DNA encoding rRNA.',
        C: 'True, so not the exception. Pars fibrosa is newly synthesised rRNA.',
        D: 'The exception, and the answer. A peroxisome is a cytoplasmic organelle full of oxidases and catalase; it is on the wrong side of the nuclear envelope entirely. Three "pars" and one organelle is the shape of the question, and the odd one out gives itself away.',
      },
    },
    {
      key: 'concerning-basal-body-it-is-formed-of-f8373bc5',
      conceptKey: 'cilium-origin-and-ultrastructure',
      difficulty: 'Easy', questionType: 'Normal values',
      learningObjective: 'Count the microtubules in a basal body.',
      explanations: {
        A: '9 is the rootlet, built from the C microtubule of each triplet.',
        B: '18 is the doublets of the shaft counted without the central pair.',
        C: '20 is the shaft complete. The shaft grows out of the basal body but does not copy its arrangement.',
        D: 'Correct. 27, in nine triplets — the basal body is a centriole that has migrated to the apical surface.',
      },
    },
    {
      key: 'concerning-brown-fat-the-followings-are-correct-except-21e2a8d8',
      conceptKey: 'mitochondrion-power-house-krebs-oxidative-phosphorylation-and-heat',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Separate brown fat from white by droplet number and mitochondrial content.',
      explanations: {
        A: 'True, so not the exception. Brown fat is richly vascular, which is how the heat it makes is carried away to the rest of the body.',
        B: 'The exception, and the answer. A single large droplet is the white, unilocular cell. Brown fat is multilocular — many small droplets — and the many droplets give the many mitochondria more surface to work on.',
        C: 'True, so not the exception. Abundant mitochondria are what make the tissue brown, through their cytochrome pigment, and what make it able to generate heat.',
        D: 'True, so not the exception. Brown fat is most extensive in the newborn, who cannot shiver effectively.',
      },
    },
    {
      key: 'concerning-centrioles-it-is-formed-of-de37abb3',
      conceptKey: 'centriole-structure-and-role-in-cell-division',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'State the centriole\'s arrangement two ways and see that they are the same statement.',
      explanations: {
        A: 'True, but not the whole answer. Nine triplets is the arrangement.',
        B: 'False, and the trap. Two central singlets belong to the ciliary shaft, which is 9+2. A centriole has nothing in its centre, and importing the central pair is the commonest error on this structure.',
        C: 'True, but not the whole answer. 27 microtubules is the same fact as A, counted rather than described.',
        D: 'Correct. A and C are one arrangement stated two ways, so both are true and both are needed.',
      },
    },
    {
      key: 'concerning-cilia-which-statement-is-false-bda57a70',
      conceptKey: 'cilium-origin-and-ultrastructure',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Give the microtubule count of the ciliary shaft rather than of the basal body.',
      explanations: {
        A: 'True, so not the false one. Cilia are an apical specialisation of the cell surface.',
        B: 'False, and the answer. 27 is the basal body; the shaft is 20 — nine doublets and two central singlets. Both numbers belong to the same cilium, which is exactly why they are confused.',
        C: 'True, so not the false one. Cilia beat, and that motility is what separates them from microvilli and stereocilia.',
        D: 'True, so not the false one. Basal body, shaft and rootlets are the three parts.',
      },
    },
    {
      key: 'concerning-fibroblasts-95bafe52',
      conceptKey: 'organelle-content-identifies-what-a-cell-does',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Recall what a fibroblast is and what its organelle content says about it.',
      answerOverride: 'D',
      answerOverrideReason:
        'The source printed no key. The department book states the fibroblast is the commonest cell of connective tissue proper and describes the active form as having deeply basophilic cytoplasm and well-developed organelles, so A, B and C are all false and D stands.',
      explanations: {
        A: 'The active fibroblast has well-developed rough endoplasmic reticulum, Golgi and mitochondria — it is the department book\'s type example of a protein-synthesising cell. Few organelles describes its resting form, the fibrocyte.',
        B: 'Its ribosomes are mostly attached, on the rough endoplasmic reticulum, because collagen is exported. Many *free* ribosomes would mean protein kept inside the cell.',
        C: 'The cytoplasm is deeply basophilic, not pale. Pale basophilic cytoplasm is the reticular cell, and the phrase is borrowed from that description.',
        D: 'Correct. The fibroblast is the commonest cell of connective tissue proper — which is also why the books ask about it from four different leaves.',
      },
    },
    {
      key: 'concerning-microtubules-one-is-wrong-59b7decc',
      conceptKey: 'microtubule-structure-and-functions',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Separate the microtubule\'s fixed diameter from its variable length.',
      answerOverride: 'D',
      answerOverrideReason:
        'The source printed no key. A, B and C are all true of microtubules. The length is not fixed — microtubules lengthen and shorten constantly by adding and losing tubulin — so D is the wrong statement.',
      explanations: {
        A: 'True, so not the wrong one. The microtubule is one of the three cytoskeletal elements.',
        B: 'True, so not the wrong one. Organelles and vesicles are moved along microtubules.',
        C: 'True, so not the wrong one. The axoneme of a cilium and of a flagellum is microtubule.',
        D: 'The wrong statement, and the answer. What is fixed is the diameter — 24 nm, because thirteen protofilaments always give the same circumference. The length changes continually, and it is that instability the mitotic spindle depends on.',
      },
    },
    {
      key: 'concerning-of-ribosomes-which-is-wrong-149da351',
      conceptKey: 'free-versus-attached-ribosomes-and-cytoplasmic-basophilia',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Recognise that ribosomes never attach to smooth endoplasmic reticulum.',
      answerOverride: 'C',
      answerOverrideReason:
        'The source printed no key. Ribosomes are free in the cytoplasm or attached to the rough reticulum; attachment to the smooth reticulum is what makes it not smooth, so C is the wrong statement. D cannot be the answer because it includes A, which is true.',
      explanations: {
        A: 'True, so not the wrong one. Free ribosomes lie singly or as polyribosomes in the cytosol.',
        B: 'True, so not the wrong one. Attached ribosomes bind by their large subunit to the ribophorins of the rough reticulum.',
        C: 'The wrong statement, and the answer. Smooth endoplasmic reticulum is defined by having no bound ribosomes — that absence is the only difference between the two halves of the organelle.',
        D: 'Cannot be the answer, because A is true. An option that bundles a true statement with a false one can never be "the wrong statement".',
      },
    },
    {
      key: 'concerning-rootlets-it-is-formed-of-02317ab9',
      conceptKey: 'cilium-origin-and-ultrastructure',
      difficulty: 'Easy', questionType: 'Normal values',
      learningObjective: 'Count the microtubules in a ciliary rootlet.',
      explanations: {
        A: 'Correct. 9 — one from each of the nine triplets of the basal body, the C microtubule, growing down into the cytoplasm to anchor the cilium.',
        B: '18 is the shaft\'s doublets without the central pair.',
        C: '20 is the shaft complete.',
        D: '27 is the basal body and the centriole. The four numbers 9, 18, 20 and 27 are the whole of what these books ask about cilia, and each belongs to exactly one part.',
      },
    },
    {
      key: 'concerning-ser-7d545d43',
      conceptKey: 'ser-structure-function-steroid-detoxification',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Pick the one true statement about smooth endoplasmic reticulum.',
      explanations: {
        A: 'It has no ribosomes; that absence is what makes it smooth.',
        B: 'When abundant it makes the cytoplasm acidophilic, not basophilic. Basophilia is the rough reticulum\'s signature.',
        C: 'Protein-forming cells are full of the rough kind. The smooth kind marks lipid and steroid formation.',
        D: 'Correct. In muscle the smooth reticulum is the sarcoplasmic reticulum, and the calcium it releases is what makes the muscle contract.',
      },
    },
    {
      key: 'concerning-shaft-it-is-formed-of-569197bb',
      conceptKey: 'cilium-origin-and-ultrastructure',
      difficulty: 'Easy', questionType: 'Normal values',
      learningObjective: 'Count the microtubules in a ciliary shaft.',
      explanations: {
        A: '9 is the rootlet.',
        B: '18 is the shaft\'s nine doublets with the central pair forgotten — the near miss this question is built around.',
        C: 'Correct. 20: nine peripheral doublets and two central singlets, the 9+2 axoneme.',
        D: '27 is the basal body, nine triplets.',
      },
    },
    {
      key: 'concerning-the-microtubules-one-statement-is-true-1f6809cb',
      conceptKey: 'microtubule-structure-and-functions',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Only three options survived extraction and the contract is four to five. The intact copy is `concerning-the-microtubules-one-statement-istrue-b15f0f22`, which carries four options and a key; this row is a duplicate of it and is kept so a rescan knows so.',
    },
    {
      key: 'concerning-the-microtubules-one-statement-istrue-b15f0f22',
      conceptKey: 'microtubule-structure-and-functions',
      difficulty: 'Moderate', questionType: 'Normal values',
      learningObjective: 'Give the number of protofilaments in a microtubule wall.',
      explanations: {
        A: 'Correct. Thirteen protofilaments make the wall, and that number is why the diameter never varies.',
        B: 'Ten protofilaments would give a narrower tube. The figure is close enough to thirteen to be worth offering and wrong enough to be worth marking.',
        C: 'The same claim about a different subunit, and equally wrong on the number in the other direction — it repeats the thirteen but attaches it to the option the question has already used.',
        D: 'The four statements contradict each other on the count, so they cannot all be true.',
      },
    },
    {
      key: 'concerning-the-multilocular-adipocyte-3683014e',
      conceptKey: 'organelles-inclusions-and-the-membranous-classification',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Identify the multilocular fat cell by the number of its lipid inclusions.',
      explanations: {
        A: 'Correct. Multi-locular means many compartments: the stored fat is in many small droplets rather than one, and the nucleus stays central and rounded because none of them is big enough to displace it.',
        B: 'Multilocular cells make brown adipose tissue. White adipose tissue is unilocular, and the colour follows the mitochondria rather than the droplets.',
        C: 'A single large droplet is the unilocular cell — the direct opposite, and the answer to the companion question with the same four options.',
        D: 'A prominent Golgi and rough endoplasmic reticulum describe a protein-exporting cell. A fat cell stores an inclusion; it exports nothing.',
      },
    },
    {
      key: 'concerning-the-rer-one-statement-is-true-112e1c64',
      conceptKey: 'rough-endoplasmic-reticulum-structure-and-protein-export',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Give the membrane number of the rough reticulum and the face its ribosomes sit on.',
      explanations: {
        A: 'Two membranes is a mitochondrion or a nuclear envelope, and ribosomes on an inner surface would face the lumen, where there is no messenger RNA.',
        B: 'Two membranes again. The count is what makes this false, even though the face is right.',
        C: 'Correct. One membrane, studded on its outer — cytoplasmic — surface, because that is the side the messenger RNA is on and the side the ribophorins face.',
        D: 'One membrane is right but the inner surface is wrong: a ribosome inside the cisterna would be sealed away from the cytosol it draws its materials from. The four options are the two-by-two of membrane count against surface, and only one cell of it is true.',
      },
    },
    {
      key: 'concerning-the-unilocular-adipocyte-bfd37865',
      conceptKey: 'organelles-inclusions-and-the-membranous-classification',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Identify the unilocular fat cell by its single lipid inclusion.',
      explanations: {
        A: 'Many droplets is the multilocular cell — the companion question with the same options, and its answer.',
        B: 'Unilocular cells make white adipose tissue. Brown is multilocular, coloured by the cytochrome of its many mitochondria.',
        C: 'Correct. Uni-locular: one large droplet filling the cell, flattening the nucleus against the periphery and leaving a thin rim of cytoplasm — the signet ring.',
        D: 'A prominent Golgi and rough endoplasmic reticulum belong to a cell exporting protein, which a fat cell is not.',
      },
    },
    {
      key: 'cytoplasmic-of-mitochondria-is-d5ee85e1',
      conceptKey: 'mitochondrion-ultrastructure-and-staining',
      difficulty: 'Easy', questionType: 'Stains and techniques',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Only three options survived extraction and the contract is four to five. The stem is damaged too — "cytoplasmic of mitochondria" is missing a word — so the row needs the page rather than a repair here. The answer is acidophilic, which is why mitochondria need iron haematoxylin or Janus green rather than the basic dye.',
    },
    {
      key: 'cytoskeleton-is-a-network-of-13992462',
      conceptKey: 'cytoskeleton-is-three-filament-systems',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name all three elements of the cytoskeleton.',
      explanations: {
        A: 'True, but not the whole answer. Microtubules are the largest of the three at 24 nm.',
        B: 'True, but not the whole answer. Thin filaments are the microfilaments, 5–7 nm, and the smallest.',
        C: 'True, but not the whole answer. Intermediate filaments are 8–10 nm — named for being between the other two.',
        D: 'Correct. Three elements, and their diameters run in the order the names suggest once you notice that "intermediate" is a size and not a function.',
      },
    },
    {
      key: 'cytoskeleton-is-formed-of-complex-system-of-interconnected-3578e441',
      conceptKey: 'cytoskeleton-is-three-filament-systems',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Only three options survived and the contract is four to five. The row has a second problem for whoever rescans it: the key given is B, "microtubules and centrioles", but option C, "microtubules and filament", is the better statement of the three-element cytoskeleton — the centriole is something microtubules build rather than a second element of the network. Both the missing option and the key need the page.',
    },
    {
      key: 'desmin-filaments-are-2fb3dc39',
      conceptKey: 'intermediate-filament-types-and-tumour-diagnosis',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Classify desmin among the cytoskeletal elements.',
      answerOverride: 'B',
      answerOverrideReason:
        'The book keys A, microfilaments. Desmin is on the department book\'s own list of intermediate filament proteins, with cytokeratin, vimentin, neurofilaments, GFAP and the lamins. The same books key the identically-shaped rows for vimentin and keratin as intermediate filaments, which is what makes this key visibly wrong.',
      explanations: {
        A: 'Microfilaments are actin, and only actin. This is the option the book keys, and taking it would make desmin a contractile protein rather than a supporting one.',
        B: 'Correct. Desmin is the intermediate filament of muscular tissue — one of the six tissue-specific proteins the department book names.',
        C: 'Thick filaments are myosin of the muscle contractile apparatus, and are not cytoskeletal at all. The muscle setting makes this the most tempting wrong answer.',
        D: 'Microtubules are tubulin. Nothing named "-in" of this family is tubulin.',
      },
    },
    {
      key: 'detection-of-is-important-for-treatment-of-tumor-120ab58b',
      conceptKey: 'intermediate-filament-types-and-tumour-diagnosis',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Explain why intermediate filaments are what a pathologist stains in a tumour.',
      explanations: {
        A: 'Microtubules are what a chemotherapy drug blocks — the other tumour question in these books, with the same setting and a different verb. Detection is not what is done to them.',
        B: 'Correct. Each tissue has its own intermediate filament protein, so identifying it by immunocytochemistry reveals the cell the tumour arose from, and that decides how it is treated.',
        C: 'Microfilaments are actin in every cell alike, so finding actin says nothing about where a tumour came from. Being universal is exactly what makes a marker useless.',
        D: 'The proteasome is likewise present everywhere and is not tissue-specific.',
      },
    },
    {
      key: 'detoxification-of-drugs-is-the-function-of-db900d1f',
      conceptKey: 'ser-structure-function-steroid-detoxification',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Attribute drug detoxification to smooth endoplasmic reticulum.',
      answerOverride: 'A',
      answerOverrideReason:
        'The book keys C, the Golgi apparatus, which has no detoxifying role of any kind. Detoxification of drugs, alcohol and hormones is a named function of smooth endoplasmic reticulum in the department book, and four other rows in these same books key it to sER. The key here is simply wrong and is overridden to A.',
      explanations: {
        A: 'Correct. Smooth endoplasmic reticulum detoxifies drugs, alcohol and hormones — which is also why the liver cell, where it is most abundant, is the organ that handles them.',
        B: 'Rough endoplasmic reticulum makes and segregates exported protein. It is the other half of the same organelle and takes none of its functions.',
        C: 'The Golgi apparatus packs and modifies protein. This is the option the book keys, and no statement anywhere in the department text supports it.',
        D: 'Mitochondria oxidise substrates to make ATP. Oxidation is involved in detoxification, which is what makes this the most defensible of the three wrong options, but the enzymes that do it sit on smooth reticulum.',
      },
    },
    {
      key: 'diameter-of-microfilament-nm-6da1140e',
      conceptKey: 'microfilament-structure-and-functions',
      difficulty: 'Easy', questionType: 'Normal values',
      learningObjective: 'Give the diameter of a microfilament.',
      explanations: {
        A: '5–10 nm spans the microfilament and the intermediate filament together, so it identifies neither. It is the near miss the option set is built on.',
        B: '4–8 nm is invented and belongs to nothing in the cytoskeleton.',
        C: '3–6 nm is too small for any of the three.',
        D: 'Correct. 5–7 nm, printed here as "5.7". The three diameters run 5–7 for microfilaments, 8–10 for intermediate filaments and 24 for microtubules.',
      },
    },
    {
      key: 'diameter-of-microtubule-is-9813877c',
      conceptKey: 'microtubule-structure-and-functions',
      difficulty: 'Easy', questionType: 'Normal values',
      learningObjective: 'Give the diameter of a microtubule.',
      explanations: {
        A: '6 nm is a microfilament.',
        B: '10 nm is the top of the intermediate filament range.',
        C: 'Correct. 24 nm, fixed by the thirteen protofilaments of the wall.',
        D: '40 nm is larger than any cytoskeletal element and corresponds to nothing the book gives.',
      },
    },
    {
      key: 'diameter-of-mitochondria-is-while-length-is-xxx-e9de98cd',
      conceptKey: 'mitochondrion-ultrastructure-and-staining',
      difficulty: 'Moderate', questionType: 'Normal values',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The units in every option have been destroyed by OCR — "Mm" and "Nm" where the page must have read µm — so the question that survives is a choice between four impossible sizes. The figures are recoverable in principle (0.5 µm across and up to 10 µm long) but a student cannot be asked to pick between millimetres and nanometres when neither is what was printed. Only a rescan fixes it.',
    },
    {
      key: 'elementary-particles-are-located-at-the-374e7406',
      conceptKey: 'mitochondrion-ultrastructure-and-staining',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Place the elementary particles on the inner mitochondrial membrane.',
      explanations: {
        A: 'The rough endoplasmic reticulum carries ribosomes on its outer surface, not elementary particles. The two are both "granules on a membrane", which is why the option is offered.',
        B: 'The rough reticulum has one membrane, so it has no inner one to speak of.',
        C: 'The outer mitochondrial membrane is smooth and carries porins. It is where small molecules get in, not where ATP is made.',
        D: 'Correct. The elementary particles are the globular structures attached by stalks to the cristae of the inner membrane, and they carry the ATP synthase.',
      },
    },
    {
      key: 'em-of-ser-is-7c35c263',
      conceptKey: 'ser-structure-function-steroid-detoxification',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Describe the smooth reticulum as it appears on electron microscopy.',
      explanations: {
        A: 'Correct. A network of branching and anastomosing tubules of variable shape, continuous with the rough reticulum but carrying no ribosomes.',
        B: 'Ribosomes are exactly what it does not have — their absence is the definition of "smooth".',
        C: 'Parallel flattened cisternae are the rough reticulum. The two halves of the organelle differ in shape as well as in ribosomes, and this option gives the smooth one the rough one\'s shape.',
        D: 'The tubules are of variable shape and size, not uniform. Regularity would be a poor description of a network that branches.',
      },
    },
    {
      key: 'em-picture-of-macrophage-shows-the-followings-except-23338078',
      conceptKey: 'organelle-content-identifies-what-a-cell-does',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Assemble the macrophage\'s ultrastructure and see that its surface belongs to it.',
      explanations: {
        A: 'True, so not the exception. A prominent Golgi is what makes the lysosomes the cell lives by.',
        B: 'True, so not the exception. Rough endoplasmic reticulum is scanty — the macrophage digests rather than exports.',
        C: 'True, so not the exception. Many lysosomes are its defining content.',
        D: 'The exception, and the answer. A macrophage has pseudopodia; they are how it engulfs. A phagocyte with a smooth outline could not do its work, and this is the option that tests whether the surface was included in the picture at all.',
      },
    },
    {
      key: 'enclosed-by-single-membrane-containing-oxidase-280a9681',
      conceptKey: 'peroxisome-oxidase-and-catalase',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Identify an organelle from its membrane count and its enzyme.',
      explanations: {
        A: 'A lysosome is also a single membrane around enzymes, which is why half the description fits — but its enzymes are hydrolases, not oxidases.',
        B: 'The Golgi is a stack of many saccules, not a single vesicle, and it holds no digestive enzyme of its own.',
        C: 'Correct. Single membrane plus oxidase is the peroxisome; catalase is the other half of its enzyme content.',
        D: 'A proteasome has no membrane at all and degrades protein by a different route entirely.',
      },
    },
    {
      key: 'endoplasmic-reticulum-is-formed-of-203dee19',
      conceptKey: 'rough-endoplasmic-reticulum-structure-and-protein-export',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Describe the endoplasmic reticulum as an interconnected system of cisternae.',
      explanations: {
        A: 'Flat curved saccules stacked above one another is the Golgi apparatus. The two organelles are both stacks of membrane, and this is the description that separates them.',
        B: 'Correct. A network of continuous, intercommunicating channels and sacs — cisternae — running from the nuclear envelope out to the cell membrane.',
        C: 'Vesicles with two membranes describes nothing in the cell; two membranes are the mitochondrion and the nucleus, and neither is a vesicle.',
        D: 'Granules with two subunits are ribosomes. They sit on the reticulum but are not what it is made of.',
      },
    },
    {
      key: 'enzymes-associated-with-drug-detoxification-are-associated-w-3938db2c',
      conceptKey: 'ser-structure-function-steroid-detoxification',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Attribute the detoxifying enzymes to smooth endoplasmic reticulum.',
      answerOverride: 'A',
      answerOverrideReason:
        'The source printed no key. Detoxification of drugs, alcohol and hormones is a named function of smooth endoplasmic reticulum in the department book, and none of the other three organelles is given any detoxifying role.',
      explanations: {
        A: 'Correct. The detoxifying enzymes sit on smooth endoplasmic reticulum, which is why the liver cell — where it is most abundant — is the organ that handles drugs and alcohol.',
        B: 'Rough endoplasmic reticulum makes exported protein. Its only share in this is that it is continuous with the smooth kind.',
        C: 'The Golgi apparatus packs and modifies protein and detoxifies nothing, though one row in these books mistakenly keys it so.',
        D: 'Mitochondria oxidise substrates to make ATP. Oxidation is part of detoxification, which makes this the most defensible wrong answer, but the enzymes are not theirs.',
      },
    },
    {
      key: 'enzymes-for-oxidative-phosphorylation-are-present-in-d20e2170',
      conceptKey: 'mitochondrion-power-house-krebs-oxidative-phosphorylation-and-heat',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Place oxidative phosphorylation on the inner mitochondrial membrane.',
      explanations: {
        A: 'The outer membrane is smooth and carries porins; its job is to let small molecules through, not to make ATP.',
        B: 'Correct. The inner membrane, and specifically the elementary particles on its cristae, where ATP synthase does the work.',
        C: 'The matrix holds the citric acid cycle enzymes — one step earlier in the same pathway, and the option this question exists to separate from the answer.',
        D: 'Not all three: the outer membrane has no part in it at all.',
      },
    },
    {
      key: 'enzymes-of-oxidative-phosphorylation-for-atp-production-pres-38f5518a',
      conceptKey: 'mitochondrion-power-house-krebs-oxidative-phosphorylation-and-heat',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the organelle that produces the cell\'s ATP.',
      explanations: {
        A: 'Correct. The mitochondrion is the power house, and oxidative phosphorylation on its cristae is how the ATP is made.',
        B: 'Secondary lysosomes digest. Digestion releases energy-yielding molecules but does not phosphorylate ADP.',
        C: 'Primary lysosomes have not yet digested anything at all.',
        D: 'Rough endoplasmic reticulum makes protein. It uses ATP rather than making it.',
      },
    },
    {
      key: 'enzymes-of-peroxisomes-are-formed-in-fbc4e1e8',
      conceptKey: 'peroxisome-oxidase-and-catalase',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Attribute peroxisomal enzymes to free ribosomes.',
      explanations: {
        A: 'Rough endoplasmic reticulum makes proteins destined for export or for a membrane-bound compartment. The peroxisome buds from it, which is exactly why this option is tempting, but its enzymes take the other route.',
        B: 'Correct. The peroxisome\'s enzymes are made on free ribosomes and imported into the organelle afterwards — the department book states it explicitly.',
        C: 'Attached ribosomes are the rough reticulum\'s, and make exported protein.',
        D: 'Both would mean the cell used two routes for one set of enzymes. It uses one.',
      },
    },
    {
      key: 'enzymes-of-peroxisomes-are-synthesized-by-598d888b',
      conceptKey: 'peroxisome-oxidase-and-catalase',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Attribute peroxisomal enzymes to free ribosomes.',
      answerOverride: 'A',
      answerOverrideReason:
        'The source printed no key. The department book states that peroxisomal enzymes are synthesised on free ribosomes, which is option A. The same question keyed elsewhere in the bank, `enzymes-of-peroxisomes-are-formed-in-fbc4e1e8`, gives free ribosomes too.',
      explanations: {
        A: 'Correct. Free ribosomes, releasing the enzymes into the cytosol, from which the peroxisome imports them.',
        B: 'Attached ribosomes make protein for export or for the secretory pathway — a different destination entirely.',
        C: 'The rough endoplasmic reticulum is where the peroxisome\'s membrane buds from, so half the organelle does come from it. Its enzymes do not, and separating the membrane\'s origin from the contents\' origin is what this question is for.',
        D: 'The Golgi apparatus packs and ships protein; it synthesises none.',
      },
    },
    {
      key: 'fibrocytes-are-characterized-by-3292827d',
      conceptKey: 'organelle-content-identifies-what-a-cell-does',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Read the fibrocyte as the resting state of the fibroblast.',
      explanations: {
        A: 'Deep basophilia means abundant rough endoplasmic reticulum, which is the active fibroblast. The fibrocyte\'s cytoplasm is pale because it has little.',
        B: 'Correct. A smaller spindle-shaped cell with few processes — the resting form, which becomes an active fibroblast again for wound healing.',
        C: 'A well-developed Golgi goes with active export. The fibrocyte is exporting almost nothing.',
        D: 'Active is the fibroblast. The suffix carries the whole distinction: -blast is building, -cyte is resting.',
      },
    },
    {
      key: 'fibrocytes-are-characterized-by-i-ea485e66',
      conceptKey: 'organelle-content-identifies-what-a-cell-does',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A second printing of `fibrocytes-are-characterized-by-3292827d` with the same four options, an "i" read into the stem and an unreadable Arabic list marker trailing option A, and no key extracted. The clean copy is the one to use, and its key — the spindle shape with few processes — applies to both. Kept so a rescan knows this row is a duplicate.',
    },
    {
      key: 'fine-strand-of-2-chain-of-g-actin-coiled-92f14970',
      conceptKey: 'microfilament-structure-and-functions',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Identify the microfilament from its subunit.',
      explanations: {
        A: 'A microtubule is a hollow cylinder of tubulin, not a coiled pair of actin chains.',
        B: 'Intermediate filaments are polymers of tetrameric subunits that differ from tissue to tissue — never actin.',
        C: 'Correct. Two chains of globular G actin coiled into filamentous F actin: the microfilament, 5–7 nm across.',
        D: 'A proteasome is an enzyme complex, not a filament at all.',
      },
    },
    {
      key: 'fixed-diameter-with-13-protofilaments-ac4c5fa9',
      conceptKey: 'microtubule-structure-and-functions',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Identify the microtubule from its wall structure.',
      explanations: {
        A: 'Correct. Thirteen parallel protofilaments make the wall, and because the number never changes the 24 nm diameter never changes either.',
        B: 'Intermediate filaments have no protofilaments and no fixed diameter of that kind; they are 8–10 nm and built from tetramers.',
        C: 'Microfilaments are two coiled chains of actin, 5–7 nm, with no wall and no lumen.',
        D: 'There is a correct option, so "none of the above" cannot stand.',
      },
    },
    {
      key: 'form-the-cytoskeleton-of-the-cells-89821192',
      conceptKey: 'cytoskeleton-is-three-filament-systems',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name all three elements of the cytoskeleton.',
      answerOverride: 'D',
      answerOverrideReason:
        'The source printed no key. Microtubules, microfilaments and intermediate filaments are the three elements the department book gives, so no single one of them is the answer and D is.',
      explanations: {
        A: 'True, but not the whole answer. Microtubules are the largest of the three.',
        B: 'True, but not the whole answer. Microfilaments are the smallest.',
        C: 'True, but not the whole answer. Intermediate filaments lie between them in size and are the supportive element.',
        D: 'Correct. All three, joined by linking proteins into the microtrabecular lattice.',
      },
    },
    {
      key: 'formation-and-degradation-of-hydrogen-peroxide-into-water-is-ba4c070c',
      conceptKey: 'peroxisome-oxidase-and-catalase',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Recognise that one organelle both makes and destroys hydrogen peroxide.',
      explanations: {
        A: 'Ribosomes assemble protein and hold no enzymes of their own.',
        B: 'Lysosomes hydrolyse. They neither make nor destroy hydrogen peroxide, and swapping them for peroxisomes is the standing trap in this leaf.',
        C: 'Correct. The oxidases generate hydrogen peroxide as a by-product and the catalase splits it into water and oxygen — the organelle is named for the compound it handles at both ends.',
        D: 'Proteasomes degrade protein and have nothing to do with peroxide.',
      },
    },
    {
      key: 'free-ribosomes-are-responsible-for-the-synthesis-of-fd7927c0',
      conceptKey: 'free-versus-attached-ribosomes-and-cytoplasmic-basophilia',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Give the destination of protein made on free ribosomes.',
      explanations: {
        A: 'Lipids are made on smooth endoplasmic reticulum. No ribosome makes a lipid.',
        B: 'Correct. Free ribosomes make the protein the cell keeps — the enzymes of its own metabolism and the protein of its own growth.',
        C: 'Carbohydrate is added to protein in the rough reticulum and the Golgi; ribosomes assemble amino acids only.',
        D: 'Protein secreted outside the cell is made on attached ribosomes. This is the exact opposite answer, and the two questions are asked side by side with the same options.',
      },
    },
    {
      key: 'function-of-rer-is-ec76a7dc',
      conceptKey: 'rough-endoplasmic-reticulum-structure-and-protein-export',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Two options are true and the question asks for one. The book keys C, synthesis of secreted proteins, which is the rough reticulum\'s headline function — but D, segregation of proteins synthesised by bound ribosomes, is also a function the department book names, in the same list. A student who picks D has read the chapter and would be marked wrong. Excluded until a faculty reviewer decides which the examiner meant; the fix is to drop or reword one option, not to choose between them here.',
    },
    {
      key: 'fusion-of-1ry-lysosome-with-autophagic-vesicle-47950d98',
      conceptKey: 'lysosome-types-secondary-fates',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the secondary lysosome formed with an autophagic vesicle.',
      explanations: {
        A: 'A heterolysosome comes from a phagosome — material from outside. Hetero- means other, and it is the opposite prefix to the one in the stem.',
        B: 'A multivesicular body comes from a pinocytic vesicle, and the many small vesicles it keeps inside are what name it.',
        C: 'Correct. Autophagic vesicle plus primary lysosome gives the autolysosome — the cell digesting its own worn-out organelles.',
        D: 'A residual body is what is left when digestion is finished, whichever of the three routes was taken.',
      },
    },
    {
      key: 'fusion-of-1ry-lysosome-with-phagocytic-cell-fd06ed00',
      conceptKey: 'lysosome-types-secondary-fates',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the secondary lysosome formed with a phagosome.',
      explanations: {
        A: 'Correct. Phagocytosed material — a phagosome — plus a primary lysosome gives the heterolysosome, which digests solid particles taken from outside.',
        B: 'A multivesicular body is the pinocytic route, and digests fluid.',
        C: 'An autolysosome digests the cell\'s own organelles.',
        D: 'A residual body is the end state of any of the three.',
      },
    },
    {
      key: 'fusion-of-1ry-lysosome-with-pinocytic-vesicle-334eaa05',
      conceptKey: 'lysosome-types-secondary-fates',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the secondary lysosome formed with a pinocytic vesicle.',
      explanations: {
        A: 'A heterolysosome is the phagosome route — solids rather than fluid.',
        B: 'Correct. Pinocytic vesicle plus primary lysosome gives the multivesicular body, digesting the fluid and dissolved material the cell drank.',
        C: 'An autolysosome is the cell\'s own organelles.',
        D: 'A residual body is the residue left at the end, not a fusion product in its own right.',
      },
    },
    {
      key: 'glial-filaments-are-3ca1de46',
      conceptKey: 'intermediate-filament-types-and-tumour-diagnosis',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Classify glial fibrillary acidic protein among the cytoskeletal elements.',
      answerOverride: 'B',
      answerOverrideReason:
        'The book keys D, microtubules. Glial fibrillary acidic protein is on the department book\'s own list of the six intermediate filament proteins, alongside cytokeratin, vimentin, desmin, neurofilaments and the lamins. The same books key the vimentin row correctly as intermediate filaments, which makes this key a slip.',
      explanations: {
        A: 'Microfilaments are actin in every cell alike and have no tissue-specific forms.',
        B: 'Correct. GFAP is the intermediate filament of glial cells, and its tissue specificity is what makes it useful in identifying a glial tumour.',
        C: 'Thick filaments are myosin of muscle and are not cytoskeletal.',
        D: 'Microtubules are tubulin. This is the option the book keys, and it would make a tissue-specific protein out of one that is the same everywhere.',
      },
    },
    {
      key: 'golgi-complex-is-composed-of-all-of-the-following-except-2bdac8a0',
      conceptKey: 'golgi-apparatus-em-structure-products-and-functions',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Recognise the pinocytic vesicle as no part of the Golgi.',
      explanations: {
        A: 'True, so not the exception. The stack of flat curved saccules is the Golgi itself.',
        B: 'True, so not the exception. Transfer vesicles arriving at the cis face are counted as part of the complex, even though they come from the rough reticulum.',
        C: 'The exception, and the answer. A pinocytic vesicle is formed at the plasma membrane and travels inwards to a lysosome. It never belongs to the Golgi, and it is the only vesicle in the list that is not part of the secretory route.',
        D: 'True, so not the exception. Secretory vesicles leaving the trans face are the Golgi\'s own product.',
      },
    },
    {
      key: 'golgi-have-the-following-functions-except-2d0422d2',
      conceptKey: 'golgi-apparatus-em-structure-products-and-functions',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Recognise that the Golgi handles polypeptide but does not assemble it.',
      answerOverride: 'A',
      answerOverrideReason:
        'The book keys B, packing of proteins, which is the Golgi\'s defining function and cannot be the exception. Synthesis of polypeptide chains — option A — is done on ribosomes, and it is the only false statement in the set.',
      explanations: {
        A: 'The exception, and the answer. Polypeptide chains are assembled on ribosomes. The Golgi receives protein already made and never builds a peptide bond.',
        B: 'True, so not the exception. Packing is the first word in every account of what the Golgi does. This is the option the book keys, and taking it would deny the organelle its own definition.',
        C: 'True, so not the exception. The secretory product is concentrated as it passes through the stack.',
        D: 'True, so not the exception. Chemical modification — adding carbohydrate to make glycoprotein — happens there.',
      },
    },
    {
      key: 'golgi-in-plasma-cell-give-with-h-e-1a798206',
      conceptKey: 'golgi-apparatus-lm-appearance-and-position',
      difficulty: 'Easy', questionType: 'Stains and techniques',
      learningObjective: 'Recognise the negative Golgi image in the plasma cell.',
      explanations: {
        A: 'Brown is what silver gives, not H&E. The two stains give opposite pictures of the same organelle, and this option has the right colour with the wrong technique.',
        B: 'Red would mean the Golgi took eosin. It takes neither dye, which is the whole point.',
        C: 'Correct. A pale unstained area beside the nucleus, interrupting the plasma cell\'s deep basophilia — the negative Golgi image.',
        D: 'No histological stain in this syllabus gives green except Janus green, which is a vital stain for mitochondria.',
      },
    },
    {
      key: 'golgi-is-apical-in-position-in-dca3c0ec',
      conceptKey: 'golgi-apparatus-lm-appearance-and-position',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Predict Golgi position from the direction a cell secretes.',
      answerOverride: 'C',
      answerOverrideReason:
        'The source printed no key. The department book gives the Golgi as apical in secretory cells and perinuclear in nerve cells; only C names a cell that discharges at a free surface.',
      explanations: {
        A: 'The liver cell secretes bile in one direction and plasma proteins in another, and its Golgi is not described as apical.',
        B: 'A steroid-secreting cell releases its product by diffusion through the whole surface, so it has no apical face to point a Golgi at — and it needs little Golgi at all.',
        C: 'Correct. A secretory cell discharging into a lumen keeps its Golgi above the nucleus, on the route between the rough reticulum below and the surface above.',
        D: 'The nerve cell is the book\'s counter-example: its Golgi is perinuclear, surrounding the nucleus rather than sitting above it.',
      },
    },
    {
      key: 'heterolysosome-is-formed-of-8a3ac384',
      conceptKey: 'lysosome-types-secondary-fates',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Match the heterolysosome to the substrate it fused with.',
      explanations: {
        A: 'A pinocytic vesicle gives the multivesicular body.',
        B: 'Correct. Hetero- means other: material from outside the cell, engulfed as a phagosome.',
        C: 'An autophagic vesicle gives the autolysosome — the cell\'s own material, the opposite prefix.',
        D: 'A residual body is the end of digestion rather than its beginning.',
      },
    },
    {
      key: 'histiocytes-have-740051e3',
      conceptKey: 'organelle-content-identifies-what-a-cell-does',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Identify the macrophage by its surface and its lysosomes.',
      answerOverride: 'C',
      answerOverrideReason:
        'The source printed no key. The histiocyte is the tissue macrophage: it has pseudopodia, many lysosomes, a pale nucleus is not its distinguishing feature, and its cytoplasm is not deeply basophilic. Only C stands, and the identical row `histocytes-macrophages-have-8d579144` is keyed C in the same books.',
      explanations: {
        A: 'Deep basophilia means abundant rough endoplasmic reticulum, which is the plasma cell. A macrophage is faintly basophilic at most.',
        B: 'The macrophage nucleus is indented and relatively dark, not the pale vesicular nucleus of a protein-exporting cell.',
        C: 'Correct. Pseudopodia — an irregular surface throwing out processes — are how the cell engulfs, and they are what identify it on electron microscopy.',
        D: 'Few lysosomes is the opposite of the truth. The macrophage has more than almost any other cell.',
      },
    },
    {
      key: 'histocytes-macrophages-have-8d579144',
      conceptKey: 'organelle-content-identifies-what-a-cell-does',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Identify the macrophage by its surface and its lysosomes.',
      explanations: {
        A: 'Deeply basophilic cytoplasm is the plasma cell, packed with rough endoplasmic reticulum.',
        B: 'A euchromatic, pale nucleus goes with heavy protein synthesis. The macrophage\'s nucleus is indented and darker.',
        C: 'Correct. Pseudopodia, the processes it engulfs with — the feature that identifies it and the one it could not do its work without.',
        D: 'Few lysosomes contradicts what a phagocyte is for.',
      },
    },
    {
      key: 'homogenous-electron-dense-membrane-limited-granules-are-d9f8521e',
      conceptKey: 'lysosome-types-electron-microscopy',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Identify a primary lysosome by its uniform density.',
      explanations: {
        A: 'Correct. Homogeneous and uniformly electron dense, bounded by a membrane, is a primary lysosome: it has not yet fused with anything, so there is nothing in it but enzyme.',
        B: 'A secondary lysosome is heterogeneous, because it holds whatever it fused with at various stages of digestion. Homogeneous against heterogeneous is the whole distinction.',
        C: 'Free ribosomes are electron dense but far smaller and are not membrane-limited.',
        D: 'Attached ribosomes are likewise not membrane-limited — they sit on a membrane rather than inside one.',
      },
    },
    {
      key: 'hydrolytic-enzymes-are-present-in-2b3ab668',
      conceptKey: 'lysosome-enzymes-origin-and-functions',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Attribute hydrolytic enzymes to the lysosome.',
      explanations: {
        A: 'Mitochondria hold oxidative enzymes for energy production, not hydrolases.',
        B: 'Peroxisomes hold oxidases and catalase. They are the other single-membrane enzyme bag and the standing distractor here.',
        C: 'Correct. Hydrolytic enzymes for intracytoplasmic digestion are what a lysosome is.',
        D: 'Smooth endoplasmic reticulum carries the detoxifying and lipid-synthesising enzymes.',
      },
    },
    {
      key: 'in-merocrine-gland-the-secretory-materials-go-out-of-the-cel-94dda04d',
      conceptKey: 'endocytosis-three-types-and-exocytosis',
      difficulty: 'Moderate', questionType: 'Mechanism',
      learningObjective: 'Connect merocrine secretion to exocytosis.',
      explanations: {
        A: 'Endocytosis brings material in. A gland cell secreting is doing the opposite.',
        B: 'Rupture of the whole cell is holocrine secretion — the sebaceous gland. Naming the three modes of secretion by what survives the process is the point of the question.',
        C: 'Correct. Merocrine secretion is exocytosis: the vesicle fuses with the membrane and discharges, and the cell loses neither cytoplasm nor its life.',
        D: 'Pinocytosis takes fluid in, again the wrong direction.',
      },
    },
    {
      key: 'in-nerve-cell-golgi-is-present-d823c9b7',
      conceptKey: 'golgi-apparatus-lm-appearance-and-position',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Give the Golgi\'s position in the nerve cell.',
      explanations: {
        A: 'Apical is the secretory cell, which has a free surface to discharge at. A nerve cell has none.',
        B: 'Correct. Perinuclear — around the nucleus — because the neuron distributes its product along processes running in every direction.',
        C: 'Basal would put the Golgi below the nucleus, on the wrong side of the secretory route in any cell.',
        D: 'Central is not a term the book uses for Golgi position; the two positions it gives are apical and perinuclear.',
      },
    },
    {
      key: 'in-secretory-cell-golgi-is-present-fdc810b6',
      conceptKey: 'golgi-apparatus-lm-appearance-and-position',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Give the Golgi\'s position in a secretory cell.',
      explanations: {
        A: 'Correct. Apical, above the nucleus, on the route between the rough reticulum in the base of the cell and the free surface it discharges at.',
        B: 'Perinuclear is the nerve cell — the paired question, with the same four options and the other answer.',
        C: 'Basal is where the rough endoplasmic reticulum and the nucleus are, not the Golgi.',
        D: 'Central is not one of the positions the book gives.',
      },
    },
    {
      key: 'in-the-axoneme-each-doublets-of-microtubules-join-central-sh-9f85b4ef',
      conceptKey: 'cilium-origin-and-ultrastructure',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Only two options survived extraction and the contract is four to five. The question is sound and its answer is the radial spokes — dynein is the arm between adjacent doublets, not the link to the central sheath — but two options cannot be sat. Recoverable only by rescanning the page.',
    },
    {
      key: 'in-the-white-adipose-tissue-the-adipocytes-have-the-followin-f2e2a38f',
      conceptKey: 'organelles-inclusions-and-the-membranous-classification',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Separate the white adipocyte from the brown by droplet number.',
      explanations: {
        A: 'True, so not the exception. White adipose tissue is unilocular by definition.',
        B: 'The exception, and the answer. Small multiple droplets are the multilocular brown cell. "Unilocular" in option A and "multiple droplets" here contradict each other outright, which is what makes the exception findable even without the rest.',
        C: 'True, so not the exception. Abundant smooth endoplasmic reticulum goes with handling lipid.',
        D: 'True, so not the exception. Few filamentous mitochondria — the opposite of the brown cell, whose crowd of mitochondria is what colours it.',
      },
    },
    {
      key: 'inactive-enzyme-homogenous-newly-released-from-golgi-2c63ed56',
      conceptKey: 'lysosome-types-electron-microscopy',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Identify the primary lysosome from its origin and its uniformity.',
      explanations: {
        A: 'A ribosome is not enzyme-filled, has no membrane and does not come from the Golgi.',
        B: 'Correct. Newly budded from the Golgi, homogeneous, and holding hydrolases that have not yet acted — a primary lysosome.',
        C: 'A secondary lysosome has already fused with a substrate, so it is heterogeneous and its enzymes are working.',
        D: 'An autolysosome is one kind of secondary lysosome and is likewise no longer inactive.',
      },
    },
    {
      key: 'inclusion-not-essential-except-5072c63a',
      conceptKey: 'organelles-inclusions-and-the-membranous-classification',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Recognise haemoglobin as the inclusion the cell cannot do without.',
      explanations: {
        A: 'Melanin protects the skin from ultraviolet light, but a cell survives perfectly well without it.',
        B: 'Lipofuscin is waste — undigested residue accumulating with age. It is the least essential thing in the cell.',
        C: 'The exception, and the answer. Haemoglobin is an inclusion by the book\'s classification, but it is the entire purpose of the red cell, which has discarded everything else to carry more of it. "Usually not essential" is how the book words the rule, and this is the exception the wording leaves room for.',
        D: 'Carotene is an exogenous pigment taken in with food, and nothing depends on it.',
      },
    },
    {
      key: 'initial-glycosylation-is-a-function-off-4076495c',
      conceptKey: 'rough-endoplasmic-reticulum-structure-and-protein-export',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Place initial glycosylation in the rough reticulum rather than the Golgi.',
      explanations: {
        A: 'Smooth endoplasmic reticulum handles lipid and steroid and detoxification, not sugar on protein.',
        B: 'Lysosomes break glycoprotein down; they add nothing.',
        C: 'The Golgi does glycosylate — but it does the later, further modification. The word "initial" is what points at the earlier organelle, and this is the option that catches a student who reads past it.',
        D: 'Correct. The rough endoplasmic reticulum performs the initial glycosylation, as part of what it does to a protein before the transfer vesicle leaves.',
      },
    },
    {
      key: 'inner-membrane-of-mitochondria-b1f1d15e',
      conceptKey: 'mitochondrion-ultrastructure-and-staining',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Describe the inner mitochondrial membrane completely.',
      explanations: {
        A: 'True, but not the whole answer. The elementary particles are attached to it by stalks.',
        B: 'True, but not the whole answer. It is thrown into the folds called cristae.',
        C: 'True, but not the whole answer. Those folds are what give it its high surface area.',
        D: 'Correct. The three are one fact seen three ways: the membrane folds, folding gives area, and the area carries the particles that make the ATP.',
      },
    },
    {
      key: 'intense-basophilic-cytoplasm-in-the-plasma-cell-is-referred-f4c012c4',
      conceptKey: 'organelle-content-identifies-what-a-cell-does',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Explain the plasma cell\'s basophilia from its organelle content.',
      explanations: {
        A: 'Correct. The plasma cell exports antibody, so it is filled with rough endoplasmic reticulum and ribosomes, and the RNA of those ribosomes is what binds the basic dye.',
        B: 'Few mitochondria would explain nothing about staining, and mitochondria are acidophilic in any case.',
        C: 'Secretory granules would show as discrete bodies. The plasma cell\'s basophilia is diffuse through the whole cytoplasm.',
        D: 'Centrioles are two tiny structures beside the nucleus, far too small to colour a cell.',
      },
    },
    {
      key: 'invagination-of-cm-to-surround-particles-without-need-of-oth-cb0d6294',
      conceptKey: 'endocytosis-three-types-and-exocytosis',
      difficulty: 'Moderate', questionType: 'Mechanism',
      learningObjective: 'Distinguish the endocytic route that needs no accessory protein.',
      explanations: {
        A: 'Correct. Pinocytosis is a plain invagination of the membrane closing round extracellular fluid — no clathrin, no receptor, no pseudopodium.',
        B: 'Exocytosis moves material out, and this stem describes an invagination inwards.',
        C: 'Phagocytosis works by pseudopodia extending outwards around the particle, not by the membrane sinking inwards.',
        D: 'Receptor-mediated endocytosis is the one route that certainly does need other proteins — the receptors and the clathrin coat. It is the option the phrase "without need of other proteins" is written to exclude.',
      },
    },
    {
      key: 'ion-transporting-cells-need-large-surface-area-so-they-are-c-2bffb46b',
      conceptKey: 'mitochondrion-power-house-krebs-oxidative-phosphorylation-and-heat',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Connect basal infoldings to the mitochondria that power them.',
      explanations: {
        A: 'True, but not the whole answer. Numerous mitochondria arranged vertically between the infoldings supply the ATP that active transport costs.',
        B: 'Lateral interdigitations increase contact between neighbouring cells rather than with the basal surface where transport happens.',
        C: 'True, but not the whole answer. Basal infoldings are the invaginations that provide the surface area itself.',
        D: 'Correct. Surface and power together: infoldings to move the ions across and mitochondria packed between them to pay for it, which is why the two are always seen in the same cell.',
      },
    },
    {
      key: 'keratin-filaments-are-ab854459',
      conceptKey: 'intermediate-filament-types-and-tumour-diagnosis',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Only two options survived extraction and the contract is four to five. The question is sound and its answer is intermediate filaments — cytokeratin is the epithelial one — and the companion rows for desmin, vimentin and glial filaments in the same books carry four options each, so a rescan should recover them here too.',
    },
    {
      key: 'kreb-s-cycle-occurs-in-8bf03e0a',
      conceptKey: 'mitochondrion-power-house-krebs-oxidative-phosphorylation-and-heat',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Place the citric acid cycle in the mitochondrial matrix.',
      answerOverride: 'A',
      answerOverrideReason:
        'The book keys B, the inner membrane, which carries the respiratory chain and ATP synthase. The department book puts the oxidative enzymes of the citric acid cycle in the matrix, and the same books key `the-mitochondrial-matrix-contains-all-the-following-except-304ffff7` with Krebs cycle enzymes as a true matrix content. Overridden to A.',
      explanations: {
        A: 'Correct. The Krebs cycle enzymes are soluble, in the matrix — the department book lists them among the matrix contents alongside the mitochondrial DNA and the calcium granules.',
        B: 'The inner membrane carries oxidative phosphorylation, the *next* stage. This is the option the book keys, and the two stages are the two halves of the same question set in almost every mitochondrial row in this leaf.',
        C: 'Lysosomes hydrolyse and have no part in respiration.',
        D: 'Peroxisomes oxidise fatty acids and destroy hydrogen peroxide, which is a different oxidation entirely and produces heat rather than ATP.',
      },
    },
    {
      key: 'lipofusin-pigments-b2f7c41b',
      conceptKey: 'lysosome-types-secondary-fates',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Define lipofuscin as undigested residue in a long-lived cell.',
      answerOverride: 'B',
      answerOverrideReason:
        'The book keys D, none of the above, but B is exactly how the department book describes lipofuscin: undigested material retained in the secondary lysosome — the residual body — accumulating over years in long-lived cells such as cardiac muscle and nerve cells. The same books key the parallel row `residual-bodies-c4d7b4d2` as B on the same wording, which is what makes D untenable here.',
      explanations: {
        A: 'Digested material is absorbed and used. What stays behind and colours the cell is precisely what could not be digested.',
        B: 'Correct. Undigested residue held in the secondary lysosome — the residual body — which in cells that never divide accumulates year on year and becomes the age pigment.',
        C: 'The multivesicular body is one route in; the residue ends up in a residual body whichever route it came by, so naming one of the three is too narrow.',
        D: 'This is the option the book keys, and B is true, so it cannot stand.',
      },
    },
    {
      key: 'lysosome-is-present-in-4d13e152',
      conceptKey: 'lysosome-enzymes-origin-and-functions',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the cells that are rich in lysosomes.',
      explanations: {
        A: 'True, but not the whole answer. The macrophage is the type example.',
        B: 'True, but not the whole answer. The neutrophil\'s azurophil granules are primary lysosomes.',
        C: 'True, but not the whole answer, and it is the category the other two belong to.',
        D: 'Correct. All of them, because all three are phagocytes — and A and B are simply two named members of the class C describes.',
      },
    },
    {
      key: 'lysosomes-under-the-lm-2bce6410',
      conceptKey: 'lysosome-enzymes-origin-and-functions',
      difficulty: 'Moderate', questionType: 'Stains and techniques',
      learningObjective: 'Name the reaction that demonstrates a lysosome by light microscopy.',
      answerOverride: 'C',
      answerOverrideReason:
        'The source printed no key. The department book states that lysosomes require histochemical stains, and the acid phosphatase reaction is the one that identifies them. They are not seen in routine histology or in H&E, and Best\'s carmine is a glycogen stain.',
      explanations: {
        A: 'They cannot be seen in a routine preparation. Being invisible without histochemistry is one of the facts the books ask about them most.',
        B: 'H&E shows neither the organelle nor its contents; the enzymes are colourless and the vesicles too small.',
        C: 'Correct. The acid phosphatase reaction — a histochemical demonstration of the marker enzyme, which is what confirms a dense body is a lysosome at all.',
        D: 'Best\'s carmine stains glycogen red. It is a stain for an inclusion, not for an organelle.',
      },
    },
    {
      key: 'mature-erythrocyte-c87ef04a',
      conceptKey: 'organelle-content-identifies-what-a-cell-does',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Recall what the mature red cell has given up.',
      explanations: {
        A: 'Correct. The mature erythrocyte has no nucleus — the department book goes further and says it is not a true cell — because everything that is not haemoglobin has been discarded to carry more of it.',
        B: 'It has no mitochondria either. Having none is why it cannot use the oxygen it carries.',
        C: 'Ribosomes are lost at the same stage; the reticulocyte still has a few, and its name comes from the network they form with supravital stain, but the mature cell has none.',
        D: 'The diameter is about 7.5 µm, not under 6. The option prints "pm" where the page must have read µm, which is worth noting for whoever rescans it, though it does not affect the answer.',
      },
    },
    {
      key: 'membranous-network-that-extends-from-nucleus-to-cell-membran-3713f054',
      conceptKey: 'rough-endoplasmic-reticulum-structure-and-protein-export',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Identify the endoplasmic reticulum from its extent.',
      explanations: {
        A: 'The cell membrane is the boundary the network runs to, not the network.',
        B: 'Correct. The endoplasmic reticulum is the department book\'s own definition: a membranous network extending from the nucleus to the cell membrane, enclosing intercommunicating channels and sacs.',
        C: 'The Golgi is a localised stack beside the nucleus, not a network spanning the cell.',
        D: 'A lysosome is a single small vesicle.',
      },
    },
    {
      key: 'microbodies-are-94547034',
      conceptKey: 'peroxisome-oxidase-and-catalase',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Recognise "microbody" as another name for the peroxisome.',
      answerOverride: 'A',
      answerOverrideReason:
        'The source printed no key. The department book names the peroxisome "microbody" in its own heading, so A is the answer and the other three organelles have separate names of their own.',
      explanations: {
        A: 'Correct. Microbody is the peroxisome\'s other name, and the department book uses the two interchangeably.',
        B: 'Lysosomes are the other single-membrane enzyme vesicle and the standing confusion in this leaf, but they have never been called microbodies.',
        C: 'Ribosomes are non-membranous particles of rRNA and protein.',
        D: 'A centrosome is the pair of centrioles with its tubulin matrix — the microtubule organising centre, and nothing to do with either enzyme bag.',
      },
    },
    {
      key: 'microfilament-b3fc2d24',
      conceptKey: 'microfilament-structure-and-functions',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Recognise the microfilament as a dynamic structure.',
      explanations: {
        A: 'A stable filament could not change the shape of a cell during endocytosis or pinch it in two at division. Stability is the wrong property for the element whose whole role is movement.',
        B: 'Correct. Microfilaments assemble and disassemble continually — dynamic — which is what lets actin build a cleavage furrow and then take it apart again.',
        C: 'Both would require the filament to be two contradictory things at once. Microtubules are the element the books describe as being of both kinds.',
        D: 'There is a correct option, so "none of the above" cannot stand.',
      },
    },
    {
      key: 'microfilaments-have-the-following-functions-except-ad30d790',
      conceptKey: 'microfilament-structure-and-functions',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Attribute the microtubule organising centre to tubulin, not actin.',
      answerOverride: 'A',
      answerOverrideReason:
        'The book keys D, developing the cleavage furrow, which is a microfilament function the department book names explicitly. The microtubule organising centre — option A — is where microtubules grow from and has nothing to do with actin, so A is the exception.',
      explanations: {
        A: 'The exception, and the answer. The microtubule organising centre is rich in gamma tubulin and holds the centrioles; it directs microtubules. The word in its own name says which element it belongs to.',
        B: 'True, so not the exception. Microfilaments move cytoplasmic components about.',
        C: 'True, so not the exception. Actin beneath the plasmalemma determines and changes cell shape.',
        D: 'True, so not the exception. The cleavage furrow is a contractile ring of actin. This is the option the book keys, and taking it would deny microfilaments their part in cell division.',
      },
    },
    {
      key: 'microtubular-organizing-center-71006c8a',
      conceptKey: 'microtubule-structure-and-functions',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Describe the microtubule organising centre completely.',
      answerOverride: 'D',
      answerOverrideReason:
        'The source printed no key. A, B and C are each stated by the department book of the MTOC — microtubules originate from it, it contains gamma tubulin, and it holds the two perpendicular centrioles — so D is the only complete option.',
      explanations: {
        A: 'True, but not the whole answer. It is where microtubules begin and by which their assembly is directed.',
        B: 'True, but not the whole answer. Gamma tubulin is the third form, found here rather than in the tube itself.',
        C: 'True, but not the whole answer. Two centrioles at right angles sit at its heart, in a tubulin matrix.',
        D: 'Correct. Origin, protein and content are three parts of one description of the centrosome.',
      },
    },
    {
      key: 'microtubule-may-be-bda5465f',
      conceptKey: 'microtubule-structure-and-functions',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Recognise that microtubules exist in both stable and dynamic populations.',
      explanations: {
        A: 'True, but not the whole answer. The microtubules of a ciliary axoneme or a centriole are stable and stay assembled.',
        B: 'True, but not the whole answer. The microtubules of the cytoplasm and of the mitotic spindle grow and shrink continually.',
        C: 'Correct. Both, and the difference is what the microtubule is for: a permanent scaffold in a cilium, a temporary one in a dividing cell.',
        D: 'There is a correct option, so "none of the above" cannot stand.',
      },
    },
    {
      key: 'microtubules-are-formed-from-a9ed25bd',
      conceptKey: 'microtubule-structure-and-functions',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the microtubule protein.',
      explanations: {
        A: 'Ubiquitin is the tag that marks a protein for the proteasome. It is a label, not a building block.',
        B: 'Correct. Tubulin, as alpha and beta dimers polymerised into protofilaments.',
        C: 'Actin builds the microfilaments — the other cytoskeletal element and the standing alternative.',
        D: 'Globulin is a plasma protein class, including the immunoglobulins. It has nothing to do with the cytoskeleton, and the resemblance to "globular actin" is what makes it worth offering.',
      },
    },
    {
      key: 'microtubules-are-formed-of-4c515e9a',
      conceptKey: 'microtubule-structure-and-functions',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Separate the two tubulins in the wall from the third in the organising centre.',
      answerOverride: 'D',
      answerOverrideReason:
        'The book keys C, gamma tubulin, which is the tubulin of the microtubule organising centre and is not what the wall is built from. The protofilaments are dimers of alpha and beta tubulin, which is option D.',
      explanations: {
        A: 'True, but not the whole answer. Alpha tubulin is half of each dimer.',
        B: 'True, but not the whole answer. Beta tubulin is the other half.',
        C: 'Gamma tubulin is in the microtubule organising centre, where it nucleates new microtubules. It directs their growth without becoming part of the tube. This is the option the book keys.',
        D: 'Correct. Alpha and beta together — the dimer that repeats along each of the thirteen protofilaments.',
        E: 'Alpha and gamma is the wrong pair: it takes one of the two wall proteins and one of the organising centre\'s, which is exactly the confusion the option set is built to expose.',
      },
    },
    {
      key: 'microtubules-are-tubular-structure-730eeda0',
      conceptKey: 'microtubule-structure-and-functions',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Only three options survived and the contract is four to five. Worse, none of the three is true as the department book has it: the wall is thirteen protofilaments and not nine triplets, the diameter it gives is 24 nm and not 25, and elongation is at the plus end rather than the minus. The correct option is in what was lost, and only a rescan recovers it.',
    },
    {
      key: 'microvilli-d046e3a4',
      conceptKey: 'microvillus-and-stereocilium-have-actin-cores',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Give the core protein of a microvillus and the organs where it is found.',
      explanations: {
        A: 'Microtubules are the core of a cilium, not of a microvillus. It is the single substitution every question about these two structures is built on.',
        B: 'True, but not the whole answer. The core is a bundle of actin filaments inserted into the terminal web.',
        C: 'True, but not the whole answer. Small intestine and kidney tubule — the two great absorbing surfaces.',
        D: 'Correct. Actin core and absorptive site are one fact rather than two: the microvillus exists to increase surface area, and the actin is what holds it out.',
      },
    },
    {
      key: 'mitochondria-1c8f7b01',
      conceptKey: 'mitochondrion-power-house-krebs-oxidative-phosphorylation-and-heat',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'List what a mitochondrion can do beyond making ATP.',
      explanations: {
        A: 'True, but not the whole answer. Mitochondria move to where the cell needs energy and increase in number by simple division.',
        B: 'True, but not the whole answer. The elementary particles on the cristae carry the ATP synthase.',
        C: 'True, but not the whole answer. In brown fat the energy leaves as heat instead of ATP.',
        D: 'Correct. Movement, division, ATP and heat are all within one organelle\'s repertoire, and a student who stops at ATP has taken a quarter of it.',
      },
    },
    {
      key: 'mitochondria-are-numerous-in-cells-that-are-4a9d4929',
      conceptKey: 'mitochondrion-power-house-krebs-oxidative-phosphorylation-and-heat',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Only three options survived extraction and the contract is four to five. The question is sound and its answer is the metabolically active cell — the department book states that mitochondria are sited in the most active areas — and a fourth option is all that is needed. Recoverable by rescanning.',
    },
    {
      key: 'mitochondria-hive-dark-blue-with-while-green-with-9fa29760',
      conceptKey: 'mitochondrion-ultrastructure-and-staining',
      difficulty: 'Moderate', questionType: 'Stains and techniques',
      learningObjective: 'Match each mitochondrial stain to the colour it gives.',
      explanations: {
        A: 'The two stains are the right pair but in the wrong order. Janus green gives green — the name carries the colour — so it cannot be the dark blue one.',
        B: 'Correct. Iron haematoxylin gives dark blue, Janus green gives green. Haematoxylin is blue in every preparation it is used in, which is the way to hold the pair the right way round.',
        C: 'Silver gives brown or black and is the Golgi stain, not a mitochondrial one.',
        D: 'Silver and PAS are the Golgi and the carbohydrate stains respectively; neither shows mitochondria.',
      },
    },
    {
      key: 'mitochondria-matrix-is-composed-of-4a3131af',
      conceptKey: 'mitochondrion-ultrastructure-and-staining',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'List everything in the mitochondrial matrix.',
      explanations: {
        A: 'True, but not the whole answer. The oxidative enzymes of the citric acid cycle are in the matrix.',
        B: 'True, but not the whole answer. Mitochondrial DNA and the dense calcium-rich granules are there too.',
        C: 'True, but not the whole answer. Messenger, transfer and ribosomal RNA are all present, which is what lets the organelle make some of its own protein.',
        D: 'Correct. Enzymes, genetic material and ions together, and between them they are why a mitochondrion can divide without the nucleus.',
      },
    },
    {
      key: 'mitochondria-of-brown-fat-cell-29fbd803',
      conceptKey: 'mitochondrion-power-house-krebs-oxidative-phosphorylation-and-heat',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Describe what is special about the mitochondria of brown fat.',
      explanations: {
        A: 'True, but not the whole answer. Thermogenin uncouples oxidation from ATP production, so the energy leaves as heat.',
        B: 'True, but not the whole answer. Cytochrome pigment is what makes brown fat brown.',
        C: 'True, but not the whole answer. Their activity is under hormonal control, which is how the body turns the heating on.',
        D: 'Correct. All three, and they are one story: a mitochondrion adapted to burn fuel for warmth rather than for work.',
      },
    },
    {
      key: 'mitochondria-plays-a-role-in-regulation-of-f30a54ed',
      conceptKey: 'mitochondrion-power-house-krebs-oxidative-phosphorylation-and-heat',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Name the ion the mitochondrion helps regulate.',
      answerOverride: 'C',
      answerOverrideReason:
        'The source printed no key. The department book describes dense calcium-rich granules in the mitochondrial matrix acting as catalysts; no role in sodium or sulphur handling is given anywhere, so C is the only supported option and D cannot stand.',
      explanations: {
        A: 'Sodium is handled by the sodium–potassium pump in the plasma membrane — an integral protein, not a mitochondrial function.',
        B: 'Sulphur metabolism belongs to the sulfatases, which are lysosomal and peroxisomal enzymes.',
        C: 'Correct. The matrix granules are calcium-rich, and the mitochondrion stores and releases calcium as well as making ATP.',
        D: 'Only one of the three is a mitochondrial role, so "all of the above" cannot stand.',
      },
    },
    {
      key: 'multilocular-fat-cell-all-true-except-b9038675',
      conceptKey: 'mitochondrion-power-house-krebs-oxidative-phosphorylation-and-heat',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'See why a heat-producing mitochondrion is poor in ATP synthase.',
      explanations: {
        A: 'True, so not the exception. Multilocular cells collected together are brown fat.',
        B: 'True, so not the exception. Thermogenin and cytochrome are what its mitochondria are rich in.',
        C: 'The exception, and the answer. A brown fat mitochondrion is built to release energy as heat, which means uncoupling oxidation from ATP synthesis — so it is comparatively poor in ATP synthase, not rich in it. This is the one option that needs the mechanism rather than a list.',
        D: 'True, so not the exception. The nucleus stays spherical and central, because no single droplet is large enough to push it aside.',
      },
    },
    {
      key: 'multilocular-fat-cells-are-characterized-by-5dc8d837',
      conceptKey: 'mitochondrion-power-house-krebs-oxidative-phosphorylation-and-heat',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Identify brown fat by its mitochondrial content.',
      explanations: {
        A: 'The signet ring is the unilocular white cell, with one droplet flattening the nucleus to the edge.',
        B: 'Heat insulation is white fat, which works by lying between the body and the cold. Brown fat is a heat *generator*, which is the opposite relationship to temperature.',
        C: 'Affected by starvation is again white fat, the body\'s energy store; brown fat is not mobilised the same way.',
        D: 'Correct. Abundant mitochondria are the defining feature, and everything else about brown fat follows from them — the colour, the heat, the vascularity.',
      },
    },
    {
      key: 'multivesicular-bodies-are-formed-when-6a2094f2',
      conceptKey: 'lysosome-types-secondary-fates',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Match the multivesicular body to the substrate it fused with.',
      answerOverride: 'B',
      answerOverrideReason:
        'The book keys A, the phagosome, which gives the heterolysosome. A multivesicular body is a primary lysosome fused with a pinocytic vesicle, and the same books key `fusion-of-1ry-lysosome-with-pinocytic-vesicle-334eaa05` as the multivesicular body. Overridden to B.',
      explanations: {
        A: 'A phagosome gives the heterolysosome — solid material from outside. This is the option the book keys, and it names the wrong one of the three fusions.',
        B: 'Correct. A pinocytic vesicle, holding fluid. Many such small vesicles inside one lysosome is what "multivesicular" describes.',
        C: 'Old organelles give the autolysosome, the cell digesting itself.',
        D: 'The three fusions give three different bodies, so "all of the above" would make the three names interchangeable.',
      },
    },
    {
      key: 'negative-golgi-image-is-a-microscopic-future-of-97b56cb4',
      conceptKey: 'golgi-apparatus-lm-appearance-and-position',
      difficulty: 'Easy', questionType: 'Stains and techniques',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Only three options survived extraction and the contract is four to five. The question is sound and its answer is the plasma cell, whose deep basophilia is what makes the unstained Golgi area visible as a gap. A fourth option is all that is missing; the stem\'s "future" for "feature" is a separate OCR slip that a rescan would fix at the same time.',
    },
    {
      key: 'neuro-filaments-are-0f0b7f53',
      conceptKey: 'intermediate-filament-types-and-tumour-diagnosis',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Classify neurofilaments among the cytoskeletal elements.',
      answerOverride: 'B',
      answerOverrideReason:
        'The book keys C, thick filaments, which are the myosin of muscle and are not cytoskeletal at all. Neurofilaments are on the department book\'s own list of intermediate filament proteins, so the answer is B.',
      explanations: {
        A: 'Microfilaments are actin, the same in every cell, and have no neuronal form.',
        B: 'Correct. Neurofilaments are the intermediate filament of the neuron — one of the six tissue-specific proteins the department book names.',
        C: 'Thick filaments are myosin of the muscle contractile apparatus. This is the option the book keys, and it puts a nerve protein into muscle.',
        D: 'Microtubules are tubulin and are abundant in axons, which is what makes this option tempting; but the axon has both, and only one of them is called a neurofilament.',
      },
    },
    {
      key: 'ning-fibrobl-9dca60d8',
      conceptKey: 'organelle-content-identifies-what-a-cell-does',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The stem has been destroyed: what survives is "© ning fibrobl", the tail of a word and a copyright mark, so there is no question to answer. The four options are intact and match `concerning-fibroblasts-95bafe52`, which is the copy to use — its answer is that the fibroblast is the commonest cell of connective tissue proper. Kept so a rescan knows this row is that question and not a new one.',
    },
    {
      key: 'non-membranous-dense-particles-formed-of-rrna-and-protein-e2dbfbc5',
      conceptKey: 'ribosome-structure-and-origin-in-the-nucleolus',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Identify the ribosome from its composition.',
      explanations: {
        A: 'Correct. rRNA and protein, non-membranous, electron dense — the department book\'s own definition of a ribosome.',
        B: 'A proteasome is protein alone and holds no RNA.',
        C: 'A lysosome is membrane-bound and full of enzyme, which makes it the opposite of every word in the stem.',
        D: 'The cytoskeleton is non-membranous too, which is the half-match, but it is a network of filaments rather than a dense particle and contains no RNA.',
      },
    },
    {
      key: 'one-of-the-following-cilium-parts-has-an-identical-structure-fa438810',
      conceptKey: 'cilium-origin-and-ultrastructure',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Recognise the basal body as a centriole.',
      answerOverride: 'A',
      answerOverrideReason:
        'The book keys B, the rootlets, which are nine single microtubules. The basal body is nine triplets — exactly a centriole, which is what it is derived from — and the same books key `the-basal-body-of-cilia-is-similar-to-87e21812` as the centriole. Overridden to A.',
      explanations: {
        A: 'Correct. The basal body is a centriole that has migrated to the apical surface: nine triplets, 27 microtubules, the same arrangement exactly.',
        B: 'The rootlets are nine single microtubules growing down into the cytoplasm from the basal body — a ninth of a centriole, not a copy of one. This is the option the book keys.',
        C: 'The shaft is the 9+2 axoneme, twenty microtubules with a central pair a centriole never has.',
        D: 'One of the three parts does match a centriole, so "none of the above" cannot stand.',
      },
    },
    {
      key: 'one-of-the-following-statements-is-not-related-to-mitochondr-19ff3c07',
      conceptKey: 'mitochondrion-ultrastructure-and-staining',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Place the cristae on the inner membrane.',
      explanations: {
        A: 'True, so related. Two membranes make it the most membranous organelle there is.',
        B: 'True, so related. Janus green is the vital stain for mitochondria.',
        C: 'True, so related. Power house of the cell is the book\'s own phrase for it.',
        D: 'Not related, and the answer. The cristae are folds of the *inner* membrane; the outer one is smooth and carries porins. Putting the folds outside is the single commonest mitochondrial error.',
      },
    },
    {
      key: 'one-of-the-following-statements-is-not-related-to-smooth-er-35ebd55c',
      conceptKey: 'ser-structure-function-steroid-detoxification',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Recall that smooth endoplasmic reticulum carries no ribosomes.',
      explanations: {
        A: 'True, so related. Anastomosing branching tubules is its electron-microscopic form.',
        B: 'True, so related. It is prominent in lipid-synthesising cells such as the liver cell.',
        C: 'Not related, and the answer. Ribosomes on the membrane are what make endoplasmic reticulum rough. Their absence is the entire definition of the smooth kind.',
        D: 'True, so related. Detoxification of drugs is one of its named functions.',
      },
    },
    {
      key: 'organelle-is-prominent-in-cells-that-synthesize-steroid-horm-bf724755',
      conceptKey: 'ser-structure-function-steroid-detoxification',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Attribute steroid synthesis to smooth endoplasmic reticulum.',
      answerOverride: 'B',
      answerOverrideReason:
        'The source printed no key. Steroid hormone synthesis is a named function of smooth endoplasmic reticulum in the department book, and the identical row `which-organelle-is-prominent-in-cells-that-synthesize-steroi-1a88c75b` is keyed B in the same books.',
      explanations: {
        A: 'Rough endoplasmic reticulum makes protein for export. A hormone that is not a protein needs none of its machinery.',
        B: 'Correct. Smooth endoplasmic reticulum synthesises the steroid hormones, and a cell making them is packed with it.',
        C: 'Lysosomes digest and synthesise nothing.',
        D: 'Peroxisomes oxidise fatty acids. They handle lipid without building a hormone from it.',
      },
    },
    {
      key: 'organelle-responsible-for-renewal-maintenance-of-cell-membra-bc1ebb05',
      conceptKey: 'golgi-apparatus-em-structure-products-and-functions',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option B carries three options at once — "Lysosomes. 6. Mitochondria 0. sER" — so only two lettered choices remain and one of them holds three answers. The question is sound and its answer is the Golgi apparatus, which sends membrane to the cell surface in its vesicles. Three intact copies of the same question exist in the bank, so this row can simply be dropped at rescan if the page will not resolve.',
    },
    {
      key: 'outer-membrane-of-mitochondria-458bb5e5',
      conceptKey: 'mitochondrion-ultrastructure-and-staining',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Describe the outer mitochondrial membrane completely.',
      explanations: {
        A: 'True, but not the whole answer. Smooth — no cristae, which are the inner membrane\'s.',
        B: 'True, but not the whole answer. Porins are the channels that make it leaky.',
        C: 'True, but not the whole answer. Permeability to small molecules is what the porins achieve.',
        D: 'Correct. The three are one description: it is smooth because it does not need area, and permeable because the selectivity is the inner membrane\'s job.',
      },
    },
    {
      key: 'oxidative-enzymes-are-present-in-7fd1372d',
      conceptKey: 'peroxisome-oxidase-and-catalase',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Attribute oxidases to the peroxisome among the organelles offered.',
      explanations: {
        A: 'The Golgi packs and modifies protein and holds no enzyme of this kind.',
        B: 'Correct. Oxidase is one of the peroxisome\'s two enzyme groups — the one that carries out beta-oxidation and makes hydrogen peroxide.',
        C: 'Lysosomes hold hydrolases. The oxidase/hydrolase substitution is the standing trap in every question about either organelle.',
        D: 'Smooth endoplasmic reticulum carries the detoxifying and lipid-synthesising enzymes rather than oxidases.',
      },
    },
    {
      key: 'peroxisomal-enzymes-are-synthetized-in-0dc186ad',
      conceptKey: 'peroxisome-oxidase-and-catalase',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Attribute peroxisomal enzymes to free ribosomes.',
      explanations: {
        A: 'Correct. Free polysomes — free ribosomes strung on one messenger RNA — make the peroxisome\'s enzymes and release them into the cytosol for import.',
        B: 'Attached ribosomes make protein for export or for the secretory pathway. The peroxisome takes the other route, even though its membrane buds from the rough reticulum.',
        C: 'The lysosome degrades protein; it makes none.',
        D: 'The cytosol is where the free ribosomes are, but it is a compartment rather than a structure, and the question asks what does the synthesising.',
      },
    },
    {
      key: 'pinocytosis-is-the-process-by-which-the-cell-can-engulf-60be5e4b',
      conceptKey: 'endocytosis-three-types-and-exocytosis',
      difficulty: 'Easy', questionType: 'Mechanism',
      learningObjective: 'Say what pinocytosis takes in.',
      answerOverride: 'A',
      answerOverrideReason:
        'The book keys B, solid particles, which is phagocytosis. Pinocytosis is cell drinking — fluid droplets — and the same books key `pinocytosis-is-the-process-by-which-the-cell-membrane-can-en-352b7949` as fluid droplets. This row and the receptor-mediated row on the same page are both keyed one line off.',
      explanations: {
        A: 'Correct. Fluid droplets: small invaginations of the membrane closing round extracellular fluid and whatever is dissolved in it.',
        B: 'Solid particles are phagocytosis, taken by pseudopodia. This is the option the book keys, and cell eating and cell drinking are the two halves of the same distinction.',
        C: 'Hormones are taken by receptor-mediated endocytosis, which needs a receptor because a hormone is present in too small a quantity to catch by drinking.',
        D: 'Foreign bodies are solid, so again phagocytosis.',
      },
    },
    {
      key: 'platelets-characterized-by-the-following-except-44420039',
      conceptKey: 'cytoskeleton-is-three-filament-systems',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Recall that a platelet is a cytoplasmic fragment with a full cytoskeleton and no nucleus.',
      explanations: {
        A: 'True, so not the exception. The hyalomere holds a marginal bundle of microtubules and actin microfilaments — a complete cytoskeleton in a cell fragment.',
        B: 'True, so not the exception. Alpha, delta and lambda granules fill the granulomere.',
        C: 'The exception, and the answer. A platelet is a fragment shed from a megakaryocyte and has no nucleus at all. The lobulated nucleus in this option is the megakaryocyte\'s, which is where the fragment came from.',
        D: 'True, so not the exception. Adhesion, aggregation and the release of clotting factors are what platelets are for.',
      },
    },
    {
      key: 'polymerization-of-tetrameric-subunit-5b99bbab',
      conceptKey: 'intermediate-filament-types-and-tumour-diagnosis',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Identify the intermediate filament from its subunit.',
      explanations: {
        A: 'A microtubule is built from dimers of alpha and beta tubulin, not tetramers.',
        B: 'Correct. Intermediate filaments polymerise from tetrameric subunits whose chemistry differs from tissue to tissue — which is why there are six of them and why they are diagnostic.',
        C: 'A microfilament is two coiled chains of globular actin.',
        D: 'A proteasome is an enzyme complex and does not polymerise into a filament at all.',
      },
    },
    {
      key: 'polypeptide-chain-is-present-in-ribosome-in-d14b1e52',
      conceptKey: 'ribosome-structure-and-origin-in-the-nucleolus',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Place the growing polypeptide on the large ribosomal subunit.',
      explanations: {
        A: 'The small subunit binds the messenger RNA and reads it. It carries no polypeptide.',
        B: 'Correct. The large subunit is where the chain is assembled and where it emerges — and it is also the subunit that binds the ribophorins of the rough reticulum, which is no coincidence: the chain has to be delivered into the cisterna.',
        C: 'Only one subunit carries it, so "a, b" cannot stand.',
        D: 'There is a correct option, so "none of the above" cannot stand.',
      },
    },
    {
      key: 'polysomes-are-ab15938e',
      conceptKey: 'ribosome-structure-and-origin-in-the-nucleolus',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Define a polysome.',
      answerOverride: 'A',
      answerOverrideReason:
        'The source printed no key. A polysome is a group of ribosomes linked by one strand of messenger RNA, which is option A; lysosomes, peroxisomes and secretory vesicles are separate membrane-bound bodies and never link into a chain.',
      explanations: {
        A: 'Correct. A group of ribosomes linked along one strand of messenger RNA, seen as bead-like rosettes or spiral chains — many ribosomes reading the same message at once.',
        B: 'Lysosomes are separate membrane-bound vesicles and never string together.',
        C: 'Peroxisomes likewise are individual vesicles.',
        D: 'Secretory vesicles bud singly from the Golgi and travel singly to the surface. The three wrong options all substitute a membranous body for the particle, which is the shape of the guess this question catches.',
      },
    },
    {
      key: 'power-house-of-the-cell-is-50fac16b',
      conceptKey: 'mitochondrion-power-house-krebs-oxidative-phosphorylation-and-heat',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the organelle that makes the cell\'s energy.',
      explanations: {
        A: 'Rough endoplasmic reticulum makes protein, and spends energy doing it.',
        B: 'The cell membrane spends energy too, on active transport.',
        C: 'Correct. The mitochondrion — the department book\'s own phrase, and the organelle every other one draws its ATP from.',
        D: 'The Golgi packs and ships. It is a warehouse, not a power station.',
      },
    },
    {
      key: 'prinuclear-golgi-apparatus-is-present-in-be6060ea',
      conceptKey: 'golgi-apparatus-lm-appearance-and-position',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Name the cell whose Golgi surrounds the nucleus.',
      explanations: {
        A: 'Enteroendocrine cells secrete into the blood at their base, so their Golgi is not perinuclear.',
        B: 'The epididymis is lined by cells with stereocilia secreting at a free surface — an apical arrangement.',
        C: 'A secretory cell keeps its Golgi apical, above the nucleus and below the surface it discharges at.',
        D: 'Correct. The nerve cell, which distributes its product along processes running in all directions and so has no single face to point the Golgi at.',
      },
    },
    {
      key: 'protein-secreting-cells-are-characterized-by-supranuclear-un-13fbdc89',
      conceptKey: 'golgi-apparatus-lm-appearance-and-position',
      difficulty: 'Moderate', questionType: 'Stains and techniques',
      learningObjective: 'Identify the pale supranuclear area as the Golgi.',
      explanations: {
        A: 'Rough endoplasmic reticulum is what makes the *rest* of the cytoplasm deeply basophilic. It is the stained background against which the pale area shows.',
        B: 'Ribosomes are the reason for that basophilia, so again they are what is stained rather than what is not.',
        C: 'Correct. The unstained area above the nucleus is the Golgi apparatus — the negative Golgi image, pale because the organelle takes neither dye.',
        D: 'Secretory vesicles often stain, and where they do they are conspicuous rather than invisible.',
      },
    },
    {
      key: 'protein-subunit-of-microfilament-b8ccc6c4',
      conceptKey: 'microfilament-structure-and-functions',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the microfilament subunit precisely.',
      explanations: {
        A: 'There is no "B actin" in this scheme. The two forms are G — globular — and F — filamentous — and the letter here is invented by analogy with the tubulins.',
        B: 'Alpha tubulin builds microtubules.',
        C: 'Gamma tubulin is in the microtubule organising centre.',
        D: 'Correct. Globular G actin is the subunit; two chains of it coil into filamentous F actin, which is the filament itself.',
      },
    },
    {
      key: 'protein-subunit-of-microtubule-6c6990c2',
      conceptKey: 'microtubule-structure-and-functions',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name both tubulins that build the microtubule wall.',
      explanations: {
        A: 'True, but not the whole answer. Alpha tubulin is one half of the dimer.',
        B: 'True, but not the whole answer. Beta tubulin is the other half.',
        C: 'Gamma tubulin is in the microtubule organising centre and nucleates microtubules without joining the wall. It is the one tubulin that is not a subunit of the tube.',
        D: 'Correct. Alpha and beta together, repeating along each protofilament.',
      },
    },
    {
      key: 'pseudopodia-extend-from-cell-to-surround-particles-b7291384',
      conceptKey: 'endocytosis-three-types-and-exocytosis',
      difficulty: 'Easy', questionType: 'Mechanism',
      learningObjective: 'Recognise phagocytosis by its pseudopodia.',
      explanations: {
        A: 'Pinocytosis is an invagination inwards, not a projection outwards. The direction of the membrane movement is the whole distinction.',
        B: 'Exocytosis discharges material outwards but forms no pseudopodium.',
        C: 'Correct. Pseudopodia extending to surround a solid particle is phagocytosis — the department book\'s example is a white blood cell engulfing a bacterium.',
        D: 'Receptor-mediated endocytosis works by a flat patch of membrane sinking in as a coated pit, again inwards rather than outwards.',
      },
    },
    {
      key: 'receptor-mediated-endocytosis-is-the-process-by-which-the-ce-f0c6d5e0',
      conceptKey: 'endocytosis-three-types-and-exocytosis',
      difficulty: 'Moderate', questionType: 'Mechanism',
      learningObjective: 'Say what receptor-mediated endocytosis takes in.',
      answerOverride: 'C',
      answerOverrideReason:
        'The book keys B, solid particles, which is phagocytosis. Receptor-mediated endocytosis takes up specific molecules bound by their receptors, and the department book\'s own example is the uptake of growth hormone — option C. This row sits beside `pinocytosis-is-the-process-by-which-the-cell-can-engulf-60be5e4b` on the same page and both keys are one line off.',
      explanations: {
        A: 'Fluid droplets are pinocytosis, which needs no receptor at all.',
        B: 'Solid particles are phagocytosis, taken by pseudopodia. This is the option the book keys.',
        C: 'Correct. Hormones — a molecule present in tiny quantity, which the cell can only capture by binding it to a specific receptor and then invaginating the patch it has gathered on.',
        D: 'A foreign body is solid, so phagocytosis again. Three of the four options describe the other two routes.',
      },
    },
    {
      key: 'regarding-blood-platelets-the-peripheral-zone-contains-601a881d',
      conceptKey: 'microfilament-structure-and-functions',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Place the actin of the platelet in its peripheral zone.',
      explanations: {
        A: 'Lysosomes are the platelet\'s lambda granules, and all its granules lie in the central granulomere.',
        B: 'Correct. The peripheral zone is the hyalomere, and it holds the marginal microtubule bundle and the actin microfilaments — the machinery that changes the platelet\'s shape and throws out its pseudopodia.',
        C: 'Glycogen is an inclusion and lies centrally with the granules.',
        D: 'Serotonin is in the delta granules of the granulomere. The whole question is a peripheral-versus-central sort, and everything except the cytoskeleton is central.',
      },
    },
    {
      key: 'regarding-primary-lysosome-the-following-is-true-c2931c79',
      conceptKey: 'lysosome-types-electron-microscopy',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Pick the true statement about a primary lysosome.',
      explanations: {
        A: 'Lysosomes increase in phagocytic cells, not in protein-forming ones. A plasma cell exports; a macrophage digests.',
        B: 'Correct. The acid phosphatase histochemical reaction is the only way a lysosome is demonstrated by light microscopy.',
        C: 'Heterogeneous by electron microscopy is the *secondary* lysosome. The primary one is homogeneous because it has not yet fused with anything.',
        D: 'Respiratory enzymes are mitochondrial. The lysosome holds hydrolases.',
      },
    },
    {
      key: 'regarding-red-blood-cells-all-are-true-except-5b409460',
      conceptKey: 'organelle-content-identifies-what-a-cell-does',
      difficulty: 'Moderate', questionType: 'Normal values',
      learningObjective: 'Give the red cell\'s life span and recall what it has no organelles for.',
      explanations: {
        A: 'True, so not the exception. The biconcave disc gives the largest surface for a given volume, which is what gas exchange needs.',
        B: 'True, so not the exception. No mitochondria — which is why the cell cannot consume the oxygen it carries.',
        C: 'True, so not the exception. The membrane cytoskeleton on the inner surface is what holds the biconcave shape and lets the cell deform through a capillary.',
        D: 'The exception, and the answer. The red cell lives about 120 days, not 20. Twenty is close enough to a month to feel plausible for a cell with no nucleus to repair itself with, which is exactly why it is offered.',
        E: 'True, so not the exception. Aged red cells are removed by the macrophages of the spleen.',
      },
    },
    {
      key: 'regarding-the-cilia-choose-the-correct-statement-976432d4',
      conceptKey: 'cilium-origin-and-ultrastructure',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Pick the true statement about the cilium from three microvillus-flavoured distractors.',
      explanations: {
        A: 'An actin-rich core is the microvillus and the stereocilium. A cilium\'s core is microtubule, and that is what lets it beat.',
        B: 'Correct. The axoneme is 9 peripheral doublets plus 2 central singlets — 20 microtubules.',
        C: 'Increasing surface area is what a microvillus is for. A cilium moves material along a surface rather than enlarging it.',
        D: 'The basal body is nine *triplets*, like the centriole it came from. The doublets are the shaft. Three of the four options give the cilium a microvillus\'s property or the wrong part\'s structure.',
      },
    },
  ],
}
