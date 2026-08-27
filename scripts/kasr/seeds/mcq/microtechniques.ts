/**
 * `101 ISK > Histology > Introduction > Microtechniques` — the question books' MCQs.
 *
 * Eighty-seven rows, the largest histology leaf outside cytology, and almost
 * none of it is about microtechniques. The extractor filed a row here whenever
 * a stain was named in it, and the department's own chapter is two pages: three
 * tissue-processing methods and a list of eight stains. What arrived is
 * therefore the whole of first-year histology asked sideways — the Golgi
 * apparatus (seven rows), the eosinophil (nine), the three connective tissue
 * fibres (twelve), the mast cell (five), fat cells, mitochondria, centrioles,
 * lysosomes, peroxisomes, the basement membrane, the plasma membrane — each
 * arriving because the answer happens to be a stain.
 *
 * That is not a fault in the extraction so much as a fact about how this
 * faculty examines. A stain question is the cheapest way to ask whether a
 * student knows what a structure is made of: silver browns the Golgi because
 * the Golgi is a network, toluidine blue is metachromatic on the mast cell
 * because the granule holds heparin, and reticular fibres need silver because
 * they are invisible in H&E. The stain is the question's surface; the
 * structure is what it tests.
 *
 * So the concepts here divide on a line worth stating. A row asking what a
 * technique or a class of stain *is* — what freezing is for, what a neutral
 * stain is, what metachromasia means — takes one of the five concepts minted
 * in this file. A row asking which stain shows a named structure takes the
 * concept for that structure, reused verbatim from the leaf that teaches it:
 * `golgi-apparatus-lm-appearance-and-position` and
 * `mitochondrion-ultrastructure-and-staining` from `cytoplasm.ts`,
 * `mast-cell-lm-em-metachromasia` from the 2022 papers,
 * `eosinophil-granule-contents-and-role-in-allergy` from
 * `granular-leukocytes.ts`, `connective-tissue-fibre-stains-by-fibre-type`
 * from `connective-tissue-fibres.ts`. Every one of those already carries the
 * staining fact in its own definition, because staining is how this book
 * teaches structure. Minting a rival "silver stain" concept would have split a
 * student's mastery of the Golgi across two ideas for no gain.
 *
 * Fifteen rows are excluded, and fourteen of the fifteen for the same reason:
 * an option was lost and three remain where the contract is four to five. This
 * leaf's questions are short — "Mitochondria can be stained with:" and four
 * one-word options — and a short option is the easiest thing on a page for a
 * scanner to drop.
 *
 * Five answers are overridden against the extracted key rather than for a
 * missing one, and four of those five come off two facing pages of a single
 * book — p25 numbers 31 to 33, and p21 number 7 — where the keys are shifted
 * by one line: fat cells are keyed to PAS, mitochondria to Sudan III, and the
 * peroxisome to alkaline phosphatase, each of which is the answer belonging to
 * the row above or below it. Every one of the five names the department book
 * statement it is being corrected against.
 *
 * The eleven rows this leaf takes from the sat end-of-module papers are added at the
 * end, and they are the worst-damaged set in the batch: six of the eleven are
 * excluded and four of those six fail the same way, with the candidate's pen
 * crossing an option letter so that the correct option was read into the option
 * above it as one compound entry. Iron haematoxylin and the centrioles are the
 * pair to look at — they are the same fact asked from either end, on two different
 * papers, and each row lost its answer into its neighbour.
 *
 * One row records a conflict. `the-white-blood-cells-with-histamine-heparin` has a
 * recovered key pointing at Eosinophils where the department book gives histamine
 * and heparin to the basophil; the conflict is written on
 * `basophil-granule-contents-and-anaphylaxis` in all four leaves that declare it,
 * together with the evidence — three option boxes found where the paper had four,
 * and a 13% overlap — that says the key is an artefact of the lost box. It is
 * recorded, not resolved. Two of the five live rows carry answers recovered from
 * the 2022 script; the other three are worked from the department book and say so.
 *
 * `neutrophil-granules-and-first-line-defence`,
 * `monocyte-is-the-largest-leukocyte-and-becomes-the-macrophage`,
 * `leukocytes-are-granular-or-non-granular` and
 * `nucleus-shape-position-and-number-identify-the-cell` are copied verbatim from
 * the leaves that mint them: three of the papers' rows here are cell-identification
 * questions filed under microtechniques because they name a stain, and a rival key
 * for any of those four would halve a student's mastery of it.
 */
import type { McqLeafSeed } from '../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Microtechniques',
  modulePath: '101 ISK > Histology > Introduction > Microtechniques',
  articleId: 'ART-101-HIS-MICROTECHNIQUES',

  concepts: [
    // ---- minted here: the department's own two pages ----------------------
    {
      key: 'three-tissue-processing-techniques-compared',
      label: 'Paraffin is the most common processing technique, celloidin the most perfect and freezing the most rapid, and each buys its advantage at a stated cost',
      definition:
        'There are three ways of turning a piece of tissue into a section, set out here as a table of advantages against disadvantages. The paraffin technique is the most common: short preparation time, serial sections for research, very thin sections and easy staining — but xylol dissolves the fat out of the tissue and the heat destroys its enzymes, so it cannot show the chemical components of the cell. The celloidin technique is the most perfect: no heat, so fine detail and structure are preserved, and it suits large organs such as the eyeball and soft tissues such as brain — but it takes a long time, gives thick sections, gives no serial sections and stains poorly. The freezing technique is the most rapid, which is why it is used to diagnose a tumour while the surgeon waits, and it preserves enzymes, which is why every histochemical stain is done on a frozen section — but its sections are thick, hard to cut, not serial and not easily stained.',
      objective:
        'Name the three tissue-processing techniques, give the one advantage each is chosen for, and say which technique a named requirement — a serial section, a frozen enzyme, a rapid diagnosis — forces.',
      pitfall:
        'Choosing paraffin because it is the routine one. Paraffin is the default and it is the wrong answer whenever the question involves fat or an enzyme, because the xylol and the heat destroy exactly those.',
      subject: 'fnd', primary: 'DIS-HIS-T04', secondary: [],
      modulePath: '101 ISK > Histology > Introduction > Microtechniques',
      type: 'comparison',
      aliases: ['Paraffin technique', 'Celloidin technique', 'Freezing technique', 'Frozen section'],
    },
    {
      key: 'haematoxylin-and-eosin-basophilia-and-acidophilia',
      label: 'Haematoxylin is a basic blue dye that binds acidic structures, eosin an acidic pink dye that binds basic ones, and the two together are the routine section',
      definition:
        'Haematoxylin and eosin is the commonest staining system in histology and the one every routine slide is made with. Haematoxylin is a basic blue dye, so it binds the acidic components of the cell, which are therefore called basophilic — the nucleus above all, rich in DNA and RNA, and the cytoplasm of a protein-forming cell, whose ribosomes are RNA. Eosin is an acidic pink or red dye and binds the basic structures of the cell, which are called acidophilic — most cytoplasm, and haemoglobin. The rule that follows is worth remembering: the nucleus is always basophilic, while the cytoplasm may be either, and which it is depends on how much RNA the cell is carrying.',
      objective:
        'Say which dye of H&E is basic and which acidic, and predict from a structure\'s chemistry whether it will be basophilic or acidophilic.',
      pitfall:
        'Reasoning from the name of the dye to the colour of the structure. An acidic structure binds the basic dye and is called basophilic — the term names what the structure loves, not what it is, and every step of that has to be run in the right direction.',
      subject: 'fnd', primary: 'DIS-HIS-T04', secondary: [],
      modulePath: '101 ISK > Histology > Introduction > Microtechniques',
      type: 'structure_function_relationship',
      aliases: ['H&E', 'Haematoxylin', 'Eosin', 'Basophilia', 'Acidophilia'],
    },
    {
      key: 'stain-classes-neutral-vital-supravital-and-metachromatic',
      label: 'A stain is classified by how it is applied and what it does, and neutral, vital, supravital and metachromatic each mean one particular thing',
      definition:
        'Beyond H&E there are named classes of stain, and the class is the examinable distinction. A neutral stain is a mixture of an acidic and a basic dye — Leishman\'s stain, eosin and methylene blue dissolved in methyl alcohol, which is also its fixative — and it is used for blood films, because a blood film holds both acidophilic and basophilic cells. A vital stain stains living cells inside the living animal, which the cell must take up itself: trypan blue and India ink demonstrate the macrophage because the macrophage phagocytoses them. A supravital stain stains living cells outside the body, and the standard example is brilliant cresyl blue on the reticulocyte. A metachromatic stain gives a colour different from the colour of the dye itself: toluidine blue, which is blue, stains the mucopolysaccharide granules of the mast cell and the blood basophil violet or purple.',
      objective:
        'Define neutral, vital, supravital and metachromatic staining, and name the cell or preparation that is the standard example of each.',
      pitfall:
        'Reading "vital" and "supravital" as strong and stronger. The whole difference is where the cell was when it took up the dye — inside the living animal, or alive on a slide outside it — and nothing else.',
      subject: 'fnd', primary: 'DIS-HIS-T04', secondary: [],
      modulePath: '101 ISK > Histology > Introduction > Microtechniques',
      type: 'classification',
      aliases: ['Leishman stain', 'Trypan blue', 'Brilliant cresyl blue', 'Toluidine blue', 'Metachromasia'],
    },
    {
      key: 'pas-and-best-carmine-demonstrate-carbohydrate',
      label: 'PAS and Best\'s carmine both show carbohydrate, which is why one pair of stains reddens glycogen, mucus, the basement membrane and the cell coat alike',
      definition:
        'Periodic acid–Schiff is a histochemical reaction for carbohydrate, and it stains what it finds magenta red: the glycogen of the liver and muscle cell, the mucus of the goblet cell, the sugar-rich type III collagen of the reticular fibre, the basement membrane, and the glycocalyx on the outer surface of the plasma membrane. Best\'s carmine is the older stain for the same target and reddens glycogen specifically. The consequence is that a PAS-positive result names a class of molecule, not a structure — so a question offering glycogen, fat and basement membrane against PAS is testing whether the student knows that fat is the one item on the list that is not a carbohydrate.',
      objective: 'Name the two stains that demonstrate carbohydrate and list the structures they redden.',
      pitfall:
        'Expecting one stain to mean one structure. PAS reddens glycogen, mucus, reticular fibres, basement membrane and cell coat, because it reacts with sugar wherever sugar is; the discriminating question is always what a structure is made of.',
      subject: 'fnd', primary: 'DIS-HIS-T04', secondary: [],
      modulePath: '101 ISK > Histology > Introduction > Microtechniques',
      type: 'structure_function_relationship',
      aliases: ['PAS', 'Periodic acid-Schiff', "Best's carmine"],
    },
    {
      key: 'fat-is-shown-by-sudan-and-only-on-a-frozen-section',
      label: 'Fat has to be stained with a fat-soluble dye on a frozen section, because routine processing dissolves it away',
      definition:
        'Sudan III is the histochemical stain for fat and colours it orange; Sudan black does the same in black. Both are fat-soluble dyes that dissolve into the lipid droplet, and both need a frozen section, because the xylol of the paraffin technique dissolves the fat out of the tissue first. That is why an ordinary H&E section of adipose tissue shows an empty space with a rim of cytoplasm and a flattened nucleus — the signet ring appearance — rather than a droplet: the fat has gone, and the space is where it was.',
      objective: 'Name the stains that demonstrate fat, say which processing technique they require, and explain what H&E does to fat instead.',
      pitfall:
        'Reading the empty vacuole of an H&E adipocyte as an artefact hole. It is the fat droplet, dissolved; the signet ring is the evidence that the cell held one large droplet rather than many small ones.',
      subject: 'fnd', primary: 'DIS-HIS-T04', secondary: [],
      modulePath: '101 ISK > Histology > Introduction > Microtechniques',
      type: 'structure_function_relationship',
      aliases: ['Sudan III', 'Sudan black', 'Fat stain'],
    },
    {
      key: 'reticular-cell-forms-the-stroma-and-turns-phagocytic',
      label: 'The reticular cell is a stellate cell of an organ\'s stroma that secretes the reticular fibres it lies on and becomes phagocytic when antigen arrives',
      definition:
        'The reticular cell arises from the undifferentiated mesenchymal cell and lies in the stroma of glands and organs — spleen, lymph node, endocrine glands. It is a small stellate cell with many long thin processes joined to its neighbours by cell junctions, and with the reticular fibres it secretes it forms the supporting network of the organ. It secretes those fibres, which are type III collagen; it turns phagocytic when stimulated by antigen; and it acts as an antigen-presenting cell. It is a resident, long-lived cell of connective tissue, and it is not demonstrated by any special stain of its own — it is the fibres around it that silver blackens.',
      objective: 'Give the site, shape and three functions of the reticular cell, and name the fibre it secretes.',
      pitfall:
        'Treating "reticular cell" and "reticular fibre" as the same demonstration. Silver shows the fibre; the cell is seen in an ordinary section by its stellate shape and its position in the stroma.',
      subject: 'fnd', primary: 'DIS-HIS-T02', secondary: [],
      modulePath: '101 ISK > Histology > Connective Tissue > Connective Tissue Cells',
      type: 'structure_function_relationship',
      aliases: ['Reticular cell', 'Stroma'],
    },

    // ---- reused verbatim from the leaves that teach them -------------------
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
      key: 'lysosome-enzymes-origin-and-functions',
      label: 'A lysosome is a single-membrane bag of hydrolytic enzymes made in the rER, packed by the Golgi, and shown only by histochemistry',
      definition:
        'A lysosome is a membranous organelle bounded by a single membrane and containing hydrolytic enzymes — acid phosphatase, protease, sulfatase, phospholipase, nuclease — for intracytoplasmic digestion. The enzymes are made on the rough endoplasmic reticulum, carried by transfer vesicles to the Golgi apparatus and released from it in lysosomes, so two organelles share in forming them. They are abundant in phagocytic cells: macrophages, neutrophils and monocytes. They cannot be seen in a routine section and need a histochemical reaction — the acid phosphatase reaction — to be identified. They digest nutrients and phagocytosed bacteria and viruses, remove excess and non-functional organelles, carry out postmortem autolysis, help the sperm head penetrate the ovum at fertilisation, and activate thyroid hormone by breaking the bond between the hormone and its protein.',
      objective:
        'Say what a lysosome contains, where its enzymes are made and packed, how it is demonstrated, and list what it does for the cell.',
      pitfall:
        'Naming alkaline phosphatase. The lysosomal marker is acid phosphatase, and the two differ by one word that decides the whole answer.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Cytology > Cytoplasm',
      type: 'structure_function_relationship',
      aliases: ['Acid phosphatase', 'Hydrolytic enzymes'],
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
      key: 'plasma-membrane-unit-membrane-em-and-thickness',
      label: 'The plasma membrane is a 7.5–10 nm trilaminar unit membrane, invisible in H&E and shown only by silver or PAS',
      definition:
        'The plasma membrane, or plasmalemma, is the limiting membrane that envelopes every cell, and it is 7.5–10 nm thick. On electron microscopy it is trilaminar — the unit membrane — two dark, electron-dense layers separated by an intermediate light, electron-lucent layer. On light microscopy it is not resolved with haematoxylin and eosin and has to be demonstrated with silver or with PAS, both of which act on the carbohydrate of its outer coat rather than on the membrane itself. Three other membranous terms are worth distinguishing: the glycocalyx is its own outer coat, cristae are the folds of the inner mitochondrial membrane, and cisternae are the sacs of the endoplasmic reticulum.',
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
      key: 'basement-membrane-two-layers-and-what-fixes-the-epithelium-to-it',
      label: 'The basement membrane has an epithelial basal lamina and a connective-tissue reticular lamina, and hemidesmosomes fix the epithelium to it',
      definition:
        'Every epithelium rests on a basement membrane, and having one is what distinguishes epithelium from the tissues around it. On light microscopy it is an amorphous dense layer staining red with PAS or brown with silver, and it may be clear and thick, as in skin, or non-clear and thin, as in transitional epithelium. On electron microscopy it is two layers named for the tissue that made each: the basal lamina, the epithelial component, an electron-dense sheet of type IV collagen and glycoproteins, itself resolvable into a lamina lucida and a lamina densa; and the reticular lamina, the connective-tissue component, of type III collagen — the reticular fibres — and ground substance. Hemidesmosomes, shaped like half a desmosome on the basal surface of the basal cells, fix the epithelium to it. Its functions are support, attachment, and control of the passage of molecules, which in the kidney glomerulus and the lung alveolus is filtration and gas exchange.',
      objective:
        'Name the two electron-microscopic layers of the basement membrane, say which tissue makes each and what collagen it contains, and name the structure that attaches the epithelium to it.',
      pitfall:
        'Naming the basal lamina as the connective-tissue layer. The basal lamina is the epithelium\'s own contribution; the reticular lamina is the connective tissue\'s. The two-layer question is also asked twice with different answers depending on whether it names the basement membrane or the basal lamina, and the sub-layers of the basal lamina are lamina lucida and lamina densa.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Epithelial Tissues > Polarity and Membranous Specializations',
      type: 'structure_function_relationship',
      aliases: ['Basal lamina', 'Reticular lamina', 'Lamina densa', 'Lamina lucida', 'Hemidesmosome'],
    },
    {
      key: 'connective-tissue-fibre-stains-by-fibre-type',
      label: 'Each connective tissue fibre has its own colour in each of the fibre stains, and the stain table is what tells the three apart',
      definition:
        'The three fibres pair with the stains that show them. Collagen is pink with eosin, blue with Mallory\'s trichrome and red with van Gieson. Elastic fibres are pink with eosin, brown with orcein and yellow with van Gieson. Reticular fibres are not visible in H&E at all; silver stains them brown — the reason they are called argyrophilic — and PAS stains them red, because of their high sugar content. Van Gieson is therefore the one stain that separates collagen from elastic in a single section by colour alone, red against yellow, and silver is the only way to see a reticular fibre.',
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
      key: 'collagen-versus-elastic-fibre-identification',
      label: 'Collagen and elastic fibres are told apart in one field by bundling and by outline',
      definition:
        'In loose areolar tissue both fibres are acidophilic and lie in the same field. Collagen runs as thick, wavy, condensed bundles that do not branch; elastic fibres run singly, thin, branching, in a zigzag course. Orcein stains elastic fibres brown and leaves collagen unstained, and in the fresh state collagen is white while elastic tissue is yellow.',
      objective: 'Name each fibre when arrowed in a loose areolar section and give one visible character of each.',
      pitfall:
        'Using colour in a stained section to decide. Both are pink in H&E; what separates them is that collagen is bundled and wavy and elastic fibres are single, thin and zigzag. Colour only decides the answer in the fresh state or with orcein.',
      subject: 'fnd', primary: 'DIS-HIS-T02', secondary: ['DIS-HIS-T04'],
      modulePath: '101 ISK > Histology > Connective Tissue > Connective Tissue Fibres',
      type: 'structural_description',
      aliases: ['White fibres', 'Yellow fibres', 'Elastin'],
    },
    {
      key: 'reticular-fibre-silver-identification',
      label: 'Reticular fibres are invisible in H&E and appear as a fine brown branching network after silver',
      definition:
        'Reticular fibres are type III collagen with a high sugar content. They do not show in H&E; silver impregnation stains them brown and PAS stains them red. On a silver preparation they form a fine network of thin fibres that branch and anastomose, which is what makes them the stroma of spleen, lymph node and liver.',
      objective: 'Identify reticular fibres on a silver preparation, name the stain and give two visible characters.',
      pitfall:
        'Naming orcein, which is the elastic-fibre stain and gives brown as well. The colour is not the discriminator; a brown network that branches and anastomoses is reticular, a brown fibre that runs singly in a zigzag is elastic.',
      subject: 'fnd', primary: 'DIS-HIS-T02', secondary: ['DIS-HIS-T04'],
      modulePath: '101 ISK > Histology > Connective Tissue > Connective Tissue Fibres',
      type: 'structural_description',
      aliases: ['Argyrophilic fibres', 'Reticulin'],
    },
    {
      key: 'mast-cell-lm-em-metachromasia',
      label: 'The mast cell and the plasma cell are both basophilic and share nothing else',
      definition:
        'The mast cell arises from the undifferentiated mesenchymal cell and lies in loose connective tissue around blood vessels and under the epithelium of the lung and digestive tube. It is a large oval cell, twenty to thirty micrometres, with a central spherical pale nucleus and cytoplasm full of basophilic granules that toluidine blue stains metachromatically purple or red. By electron microscopy it has a well developed Golgi, many mitochondria, few rough endoplasmic reticulum profiles and electron-dense membrane-bound granules. It carries surface receptors for IgE, and it secretes heparin, histamine, leukotrienes and eosinophil chemotactic factor.',
      objective:
        'Give the origin, site and light-microscopic picture of the mast cell, and distinguish it from the plasma cell.',
      pitfall:
        'Reading basophilia as one finding. The mast cell\'s basophilia is granular and metachromatic; the plasma cell\'s is diffuse cytoplasmic basophilia from rough endoplasmic reticulum and is not metachromatic at all.',
      subject: 'fnd', primary: 'DIS-HIS-T02', secondary: [],
      modulePath: '101 ISK > Histology > Connective Tissue > Connective Tissue Cells',
      type: 'structural_description',
      aliases: ['Mast cell granules', 'Metachromasia', 'Toluidine blue'],
    },
    {
      key: 'macrophage-identification-vital-stain',
      label: 'A macrophage is identified by an irregular outline, a dark kidney-shaped nucleus and ingested vital dye',
      definition:
        'The macrophage is a large irregular connective-tissue cell with pale basophilic cytoplasm and a dark kidney-shaped nucleus. It arises from the blood monocyte. Its specific demonstration is a vital stain — trypan blue or India ink — which the cell phagocytoses, so the granules of dye inside it are the identification. By electron microscopy it has pseudopodia and is rich in lysosomes, phagocytosed particles and residual bodies, which is why the acid phosphatase reaction also marks it. It phagocytoses foreign particles, microorganisms and dead cells, fuses into foreign body giant cells, presents antigen to lymphocytes and destroys old red cells in liver and spleen.',
      objective: 'Identify a macrophage on a section, name the vital stain that demonstrates it, and give its origin.',
      pitfall:
        'Confusing it with a monocyte. They are the same lineage, but the monocyte is the circulating form named on a blood film; a phagocytic cell sitting in connective tissue full of dye is a macrophage.',
      subject: 'fnd', primary: 'DIS-HIS-T02', secondary: ['DIS-HIS-T04'],
      modulePath: '101 ISK > Histology > Connective Tissue > Connective Tissue Cells',
      type: 'structural_description',
      aliases: ['Histiocyte', 'Trypan blue', 'India ink'],
    },
    {
      key: 'eosinophil-granule-contents-and-role-in-allergy',
      label: 'The eosinophil ends an allergic reaction with histaminase and sulphatase, and kills parasites with its granule protein',
      definition:
        'Eosinophils are 1–4% of the count, 10–14 µm, with a bilobed horse-shoe nucleus joined by a thick chromatin thread and large acidophilic specific granules. On electron microscopy the granule is oval with an electron-dense crystalloid core of basic protein. The cell terminates allergy by secreting histaminase and sulphatase, which destroy histamine and heparin, and by phagocytosing antigen–antibody complexes; it defends against parasites by the cytotoxic effect of its granule protein. Eosinophilia is above 5%, eosinopenia below 1%.',
      objective:
        'Name the contents of the eosinophil granule and explain how each ends an allergic reaction or kills a parasite.',
      pitfall:
        'Confusing histaminase with histamine. The eosinophil destroys histamine; the basophil releases it. A question naming histaminase, sulphatase and neurotoxin is naming the eosinophil, and the same question with histamine and heparin is naming the basophil.',
      subject: 'haem',
      primary: 'DIS-HIS-T02',
      secondary: ['SYS-HEM-T01-S01-M02'],
      modulePath: '101 ISK > Histology > Blood > Granular leukocytes',
      type: 'structure_function_relationship',
      aliases: ['Eosinophil granules', 'Acidophil', 'Eosinophilia'],
      conflicts: [
        'Eosinophils sit at 1–4% of the differential count. Several question books and my own first reading of the 2025 paper give 2–4%. The course text governs; the discrepancy is recorded rather than resolved silently, because a one-mark question on the count could be marked either way.',
      ],
    },
    {
      key: 'basophil-granule-contents-and-anaphylaxis',
      label: 'The basophil holds histamine and heparin, carries IgE receptors, and its histamine release is anaphylaxis',
      definition:
        'Basophils are 0–1% of the count, 10–12 µm, with an irregular segmented S-shaped nucleus obscured by coarse granules that stain metachromatically purple with toluidine blue because of their heparin. The specific granules are large, rounded and electron dense, holding histamine, heparin, eosinophil chemotactic factor and leukotrienes, and the cell membrane carries receptors for IgE. Heparin prevents clotting and promotes allergy; histamine causes vasodilatation with a sudden drop in blood pressure — anaphylaxis; leukotrienes cause bronchospasm and bronchial asthma. Basophilia is above 2%.',
      objective:
        'List what the basophil granule contains, and connect each substance to the clinical event it produces.',
      pitfall:
        'Calling the basophil a mast cell. Both stain metachromatically, both hold histamine and heparin and both carry IgE receptors, but they differ in life span, size, nuclear shape and phagocytic ability, and the mast cell is 20–30 µm against the basophil’s 10–12.',
      subject: 'haem',
      primary: 'DIS-HIS-T02',
      secondary: ['SYS-HEM-T01-S01-M02'],
      modulePath: '101 ISK > Histology > Blood > Granular leukocytes',
      type: 'structure_function_relationship',
      aliases: ['Basophil granules', 'Anaphylaxis', 'Basophilia'],
      conflicts: [
        'The recovered key for the 2022 end-of-module paper resolves its question 40 — which white blood cells contain histamine and heparin — to Eosinophils, whereas histamine and heparin belong to the basophil and the mast cell, and the eosinophil instead carries histaminase and sulphatase, which destroy them. The disagreement is recorded rather than resolved. The evidence in `eom-answers.json` points at the extraction rather than at either source: only three of the four option boxes were found on that page, the option that was lost is Basophils, and the candidate\'s highlight overlaps the box the key names by 13% of its area. The row is excluded in `microtechniques.ts` with the same note.',
      ],
    },
    {
      key: 'erythrocyte-identification-blood-film',
      label: 'An erythrocyte is identified by being non-nucleated, acidophilic and centrally pale',
      definition:
        'On a Leishman-stained film the erythrocyte is a rounded non-nucleated acidophilic disc about 7.5 micrometres across, with a central pallor of about one third of its diameter produced by its biconcavity. A crenated cell is the same cell shrunken in a hypertonic medium and shows notches at its edge.',
      objective:
        'Identify an erythrocyte in a blood film, give the character the answer page asks for, and tell a normal cell from a crenated one on the same plate.',
      pitfall:
        'Calling the central pallor a nucleus or a vacuole. It is thinning, not a hole; the mature red cell has no nucleus at all, which is the character the examiner is asking for.',
      subject: 'haem', primary: 'DIS-HIS-T02', secondary: ['DIS-HIS-T04', 'SYS-HEM-T01-S01-M01'],
      modulePath: '101 ISK > Histology > Blood > Red Blood Corpuscles',
      type: 'structural_description',
      aliases: ['Central pallor', 'Crenation'],
    },
    {
      key: 'unilocular-versus-multilocular-adipocyte',
      label: 'White and brown fat are told apart by whether the cell holds one fat droplet or many',
      definition:
        'The unilocular (white) fat cell is large and oval and holds a single fat droplet that pushes nucleus and cytoplasm into a thin peripheral rim, the signet-ring appearance. The multilocular (brown) fat cell is smaller and rounded and holds many small droplets, so it has no signet ring and its rounded nucleus stays eccentric rather than flattened; brown fat is also the more vascular tissue, and it is the multilocular cell that generates heat.',
      objective:
        'Identify white and brown adipose tissue on section, name the cell type each is built from, give two visible characters, and name the stains that demonstrate the fat.',
      pitfall:
        'Reading the empty spaces as artefact holes. The fat dissolves in routine processing and the space is the droplet; Sudan III on the paired plate fills the same space with orange.',
      subject: 'fnd', primary: 'DIS-HIS-T02', secondary: ['DIS-HIS-T04'],
      modulePath: '101 ISK > Histology > Connective Tissue > Connective Tissue Cells',
      type: 'structural_description',
      aliases: ['Signet ring appearance', 'Unilocular adipocyte', 'Multilocular adipocyte'],
    },
    {
      key: 'undifferentiated-mesenchymal-cell-and-pericyte-are-the-stem-cells-of-connective-tissue',
      label: 'The undifferentiated mesenchymal cell and the pericyte are the two stem cells connective tissue keeps into adult life',
      definition:
        'Connective tissue arises from mesoderm, and the mesenchymal cells that migrate from it do not all differentiate. The undifferentiated mesenchymal cell stays unspecialised in certain adult sites as a life-long source of cells — in bone marrow it is the source of the blood cells, around vessels the source of pericytes — and it is a small branched cell with pale basophilic cytoplasm, a large central pale nucleus with visible nucleoli, many free ribosomes and a euchromatic nucleus. It divides and can differentiate into every other connective tissue cell: the fibroblast, the fat cell, the reticular cell, the mast cell. The pericyte, or perivascular cell, is the adult mesenchymal stem cell wrapped around blood capillaries, branched with long processes and containing a network of actin and myosin; on injury it divides into endothelium, fibroblasts and smooth muscle cells, and by contracting it narrows the capillary.',
      objective:
        'State what the undifferentiated mesenchymal cell and the pericyte can each become, and give the light-microscopic features that mark a cell as still undifferentiated.',
      pitfall:
        'Crediting the mesenchymal cell with the work of its descendants. It does not lay down collagen or ground substance itself — the fibroblast it becomes does that; what the stem cell contributes is a new cell.',
      subject: 'fnd', primary: 'DIS-HIS-T02', secondary: [],
      modulePath: '101 ISK > Histology > Connective Tissue > Connective Tissue Cells',
      type: 'structure_function_relationship',
      aliases: ['UMC', 'Pericyte', 'Perivascular cell'],
    },
    {
      key: 'neutrophil-granules-and-first-line-defence',
      label: 'The neutrophil carries two granule populations and is the first line of non-specific defence',
      definition:
        'Neutrophils are 60–70% of the white cell count, 10–12 µm, with a dark segmented nucleus of two to five lobes joined by thin chromatin threads. Their azurophil (primary) granules are large, few and dark — primary lysosomes holding myeloperoxidase. Their specific (secondary) granules are small, many and pale, holding collagenase, phagocytin, lysozyme and lactoferrin. Bacterial toxins attract them; they leave the blood by diapedesis between endothelial cells and become motile microphages.',
      objective:
        'Distinguish the neutrophil’s azurophil and specific granules by size, number, staining and contents, and say what each contributes to defence.',
      pitfall:
        'Treating the two granule populations as one. The exam asks which granule holds which enzyme, and myeloperoxidase is in the azurophil granule while lactoferrin, phagocytin, lysozyme and collagenase are in the specific one.',
      subject: 'haem',
      primary: 'DIS-HIS-T02',
      secondary: ['SYS-HEM-T01-S01-M02'],
      modulePath: '101 ISK > Histology > Blood > Granular leukocytes',
      type: 'structure_function_relationship',
      aliases: ['Polymorphonuclear leucocyte', 'Neutrophil granules', 'Microphage'],
      gaps: [
        'Dead neutrophils are stated to form pus cells, and pus is stated to raise body temperature by stimulating the heat-regulating centre. No physiology source in this corpus supports the mechanism as stated; it is recorded because it is stated and examinable, not because it is verified.',
      ],
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
      key: 'leukocytes-are-granular-or-non-granular',
      label: 'Leukocytes divide into granular — neutrophil, eosinophil, basophil — and non-granular — monocyte and lymphocyte',
      definition: 'White blood cells are classified by whether their cytoplasm carries specific granules. The granular leukocytes are the neutrophil, the eosinophil and the basophil, each named for how its specific granules stain, and each has a segmented nucleus — the neutrophil so much so that it is also called the polymorphonuclear leukocyte. The non-granular leukocytes are the monocyte and the lymphocyte, whose cytoplasm holds only azurophil granules, which are lysosomes and are not specific granules. Platelets are not leukocytes at all.',
      objective: 'Sort the five leukocytes into granular and non-granular and recognise the synonyms each carries.',
      pitfall: 'Treating "non-granular" as meaning no granules whatsoever. Monocytes and lymphocytes both carry azurophil granules; what they lack are the specific granules that name the granulocytes.',
      subject: 'haem', primary: 'DIS-HIS-T02', secondary: ['SYS-HEM-T01-S01-M02'],
      modulePath: '101 ISK > Histology > Blood > Non granular leukocytes',
      type: 'classification',
    },
    {
      key: 'nucleus-shape-position-and-number-identify-the-cell',
      label: 'A cell is named from the number, position, shape and staining of its nucleus',
      definition:
        'Most cells have one nucleus; the liver cell has two; the osteoclast and skeletal muscle have many. The nucleus may be central, basal, peripheral or eccentric in position, and flat, rounded, oval, bilobed, segmented or multilobed, or kidney-shaped in outline. The standard examples are: the neutrophil has a multilobed segmented nucleus, the eosinophil a bilobed horse-shoe nucleus, the basophil an irregular S-shaped one, the monocyte a large kidney-shaped one, the large lymphocyte a large indented nucleus with a visible nucleolus and the small lymphocyte a dark round one, the megakaryocyte a single large multilobed dark nucleus, the plasma cell a cartwheel nucleus set eccentrically beside a pale Golgi area, and the unilocular fat cell a flattened nucleus pushed to the periphery by its single droplet. Nuclear level is used the same way: crowded columnar cells whose nuclei lie at more than one level are pseudostratified, not stratified.',
      objective:
        'Name a cell from the number, position and shape of its nucleus, and use nuclear level to tell pseudostratified from stratified epithelium.',
      pitfall:
        'Reading "segmented" and "lobed" as interchangeable across the granulocytes. Two to five joined segments is the neutrophil, two lobes in a horse-shoe is the eosinophil, and an irregular S obscured by granules is the basophil — the books ask all three from the same option list.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Cytology > Nucleus',
      type: 'classification',
      aliases: ['Nuclear shape', 'Nuclear position', 'Multinucleated cell'],
      gaps: [
        'Four adipocyte rows were filed under this leaf and are authored against this concept because the flattened peripheral nucleus of the unilocular cell is one of the options in each. Their fuller concept, `white-versus-brown-adipose-connective-tissue`, is already minted in `types-of-connective-tissue-proper.ts`; it could not be reused here without emitting a duplicate concept id, so the adipose facts are taught in the option explanations instead. The same applies to two granulocyte rows whose concepts live in `granular-leukocytes.ts`.',
      ],
    },
  ],

  questions: [
    // ---- the three processing techniques ----------------------------------
    {
      key: 'freezing-technique-has-the-following-advantage-b5b7cb3c',
      conceptKey: 'three-tissue-processing-techniques-compared',
      difficulty: 'Moderate', questionType: 'Comparison',
      learningObjective: 'Give the advantage the freezing technique is chosen for.',
      answerOverride: 'A',
      answerOverrideReason:
        'The source printed no key. The freezing technique is called "the most rapid", and the other three options — serial sections, thin sections, easy staining — are advantages of the paraffin technique and disadvantages of freezing.',
      explanations: {
        A: 'Freezing is the most rapid method, which is why a frozen section is what a surgeon waits for while a tumour is diagnosed mid-operation.',
        B: 'Serial sections are a paraffin advantage; "no serial sections" is listed among the disadvantages of freezing.',
        C: 'Thin sections are paraffin too. Frozen sections are thick and hard to cut.',
        D: 'Frozen sections are explicitly "not easily stained" — which is a separate matter from their being the only sections that keep enzymes to stain for.',
      },
    },
    {
      key: 'the-suitable-technique-to-stain-the-glycogen-inside-the-cell-7334a397',
      conceptKey: 'three-tissue-processing-techniques-compared',
      difficulty: 'Moderate', questionType: 'Technique choice',
      learningObjective: 'Choose the processing technique that permits a histochemical stain.',
      answerOverride: 'C',
      answerOverrideReason:
        'The source printed no key. Histochemical stains — PAS for glycogen among them — need the frozen technique, because the heat and solvents of paraffin processing destroy the chemical components of the cell.',
      explanations: {
        A: 'Paraffin is the routine technique and the wrong one here because its xylol and heat destroy the cell\'s chemical components, which is exactly what a histochemical stain is looking for.',
        B: 'Celloidin avoids heat and preserves fine structure, but it is the slowest technique and is used for large organs and soft tissue, not for histochemistry.',
        C: 'Histochemical stains are done on frozen sections, because freezing preserves the chemistry the stain reacts with.',
        D: 'Scanning electron microscopy shows surfaces in three dimensions. It is not a way of staining anything, and it is not a light-microscopic technique at all.',
      },
    },

    // ---- H&E and basophilia -----------------------------------------------
    {
      key: 'the-most-common-staining-system-in-the-histology-is-a8697490',
      conceptKey: 'haematoxylin-and-eosin-basophilia-and-acidophilia',
      difficulty: 'Easy', questionType: 'Recall',
      learningObjective: 'Name the routine staining system of histology.',
      answerOverride: 'C',
      answerOverrideReason:
        'The source printed no key. Haematoxylin and eosin is the most commonly used stain in routine histological slides; the other three are special stains used for one target each.',
      explanations: {
        A: 'Silver is a special stain, used for the Golgi apparatus, nerve cells and fibres, and reticular fibres. It is slow and selective, not routine.',
        B: 'Orcein is a special stain with one job: browning elastic fibres.',
        C: 'H&E is the routine system, and every slide a student is shown is H&E unless told otherwise.',
        D: 'PAS is a histochemical reaction for carbohydrate. It is common, but it demonstrates one class of molecule rather than showing a section as a whole.',
      },
    },
    {
      key: 'cytoplasm-of-ribosome-is-b531d7a0',
      conceptKey: 'free-versus-attached-ribosomes-and-cytoplasmic-basophilia',
      difficulty: 'Easy', questionType: 'Staining',
      learningObjective: 'Say how ribosomes make the cytoplasm stain, and why.',
      explanations: {
        A: 'Acidophilic is what cytoplasm poor in RNA looks like — smooth endoplasmic reticulum, or the haemoglobin of a red cell. Ribosomes push the staining the other way.',
        B: 'Ribosomal RNA carries acidic phosphate groups, which bind the basic dye haematoxylin, so ribosome-rich cytoplasm is basophilic.',
        C: 'Ribosomes need no special stain to make their presence felt: their effect on ordinary H&E is exactly the basophilia this question is about. Seeing an individual ribosome does need electron microscopy, which is a different claim.',
        D: '"None of the above" cannot stand while B is the correct account of cytoplasmic basophilia.',
      },
    },

    // ---- classes of stain ---------------------------------------------------
    {
      key: 'lishman-stain-is-1f2148f4',
      conceptKey: 'stain-classes-neutral-vital-supravital-and-metachromatic',
      difficulty: 'Easy', questionType: 'Classification',
      learningObjective: 'Classify Leishman\'s stain among the classes of special stain.',
      explanations: {
        A: 'Keyed. Leishman\'s stain is a neutral stain: a mixture of the acidic dye eosin and the basic dye methylene blue, which is what lets one preparation show both the acidophilic and the basophilic cells of a blood film.',
        B: 'A vital stain is taken up by living cells inside the living animal. Leishman\'s is applied to a dried film of dead cells on a slide.',
        C: 'Supravital staining is of living cells outside the body — brilliant cresyl blue on reticulocytes. Leishman\'s film is fixed with methyl alcohol first, so its cells are not alive.',
        D: 'A metachromatic stain gives a colour different from its own. Leishman\'s components each give their own colour, which is the opposite property.',
      },
    },
    {
      key: 'stain-used-for-blood-film-bc6afbe9',
      conceptKey: 'stain-classes-neutral-vital-supravital-and-metachromatic',
      difficulty: 'Easy', questionType: 'Stain choice',
      learningObjective: 'Name the stain used for a blood film and say why a mixture is needed.',
      explanations: {
        A: 'Eosin alone is acidic and would show the acidophilic structures — red cells and eosinophil granules — and leave the nuclei and basophilic granules unstained.',
        B: 'Leishman\'s stain is the neutral stain for blood films, and being a mixture is the whole point of it.',
        C: 'Methylene blue alone is basic and would stain nuclei and basophilic granules while leaving the red cells almost colourless.',
        D: 'Haematoxylin is the basic dye of the routine tissue stain; it is not used on blood films, where Leishman\'s combined dyes in methyl alcohol both fix and stain in one step.',
      },
    },
    {
      key: 'staining-of-blood-film-is-done-by-5ab7e292',
      conceptKey: 'stain-classes-neutral-vital-supravital-and-metachromatic',
      difficulty: 'Easy', questionType: 'Stain choice',
      learningObjective: 'Name the stain used for a blood film against a set of special stains.',
      explanations: {
        A: 'Orcein browns elastic fibres and has no role in blood.',
        B: 'Silver browns the Golgi and nerve fibres and blackens reticular fibres; it demonstrates none of the blood cells.',
        C: 'H&E is the routine stain for a tissue section, not for a blood film — a film is air-dried and needs a stain that carries its own alcohol fixative.',
        D: 'Leishman\'s stain is the blood film stain.',
      },
    },
    {
      key: 'fixative-material-that-used-in-blood-film-108f04be',
      conceptKey: 'stain-classes-neutral-vital-supravital-and-metachromatic',
      difficulty: 'Moderate', questionType: 'Recall',
      learningObjective: 'Name the fixative in which a blood film stain is dissolved.',
      explanations: {
        A: 'Leishman\'s dyes are dissolved in methyl alcohol, which fixes the air-dried film as the stain is applied — one solution doing both jobs.',
        B: 'Eosin is one of the two dyes in the mixture, not the fixative that carries them.',
        C: 'Ethylene glycol is an antifreeze and has no place in this preparation.',
        D: 'Glycerin is a mounting and clearing agent, not a fixative.',
      },
    },
    {
      key: 'staining-of-the-macrophage-with-trypan-blue-is-an-example-of-58b869d4',
      conceptKey: 'stain-classes-neutral-vital-supravital-and-metachromatic',
      difficulty: 'Easy', questionType: 'Classification',
      learningObjective: 'Classify the demonstration of a macrophage with trypan blue.',
      explanations: {
        A: 'A vital stain is one taken up by living cells inside the living animal — the dye is injected and the macrophage phagocytoses it, which is why this method identifies that cell and no other.',
        B: 'Supravital staining is of living cells outside the body. The reticulocyte with brilliant cresyl blue is the standard example.',
        C: 'A fluorescent stain is read under ultraviolet light; trypan blue is seen in an ordinary microscope as blue granules inside the cell.',
        D: 'A histochemical stain demonstrates a chemical or an enzyme. Trypan blue demonstrates a behaviour — phagocytosis — which is a different kind of evidence.',
      },
    },
    {
      key: 'reticulocytes-could-be-demonstrated-by-eb32930e',
      conceptKey: 'stain-classes-neutral-vital-supravital-and-metachromatic',
      difficulty: 'Moderate', questionType: 'Classification',
      learningObjective: 'Classify the stain that demonstrates a reticulocyte.',
      explanations: {
        A: 'A vital stain works inside the living animal. The reticulocyte is stained on a slide, after the blood has been drawn.',
        B: 'Keyed. Brilliant cresyl blue on living cells outside the body is supravital staining, and it precipitates the residual RNA of the young red cell into the visible reticulum that names it.',
        C: 'Toluidine blue is the metachromatic stain for mast cell and basophil granules; it says nothing about a reticulocyte.',
        D: 'Metachromasia is a property of a dye on a particular substrate. The reticulum of the reticulocyte is shown in the dye\'s own colour, which is the opposite.',
      },
    },
    {
      key: 'macrophages-can-be-stained-by-e506ff16',
      conceptKey: 'stain-classes-neutral-vital-supravital-and-metachromatic',
      difficulty: 'Easy', questionType: 'Stain choice',
      learningObjective: 'Pick the class of stain that demonstrates the macrophage.',
      explanations: {
        A: 'A metachromatic stain demonstrates the mast cell and the basophil, whose granules hold heparin.',
        B: 'A histochemical stain does mark the macrophage indirectly, through the acid phosphatase of its many lysosomes — but the specific demonstration here is the vital stain, and the option offered here is unqualified.',
        C: 'Trypan blue is the vital stain the macrophage phagocytoses, and finding blue granules inside a connective tissue cell is how the cell is identified.',
        D: 'Sudan III demonstrates fat, which identifies the adipocyte.',
      },
    },
    {
      key: 'mast-cells-can-be-stained-by-3e5ca4af',
      conceptKey: 'stain-classes-neutral-vital-supravital-and-metachromatic',
      difficulty: 'Easy', questionType: 'Stain choice',
      learningObjective: 'Pick the class of stain that demonstrates the mast cell.',
      explanations: {
        A: 'Toluidine blue is a metachromatic stain, and the heparin of the mast cell granule turns it purple — a colour the dye itself does not have.',
        B: 'Histochemical stains demonstrate a named chemical or enzyme; the mast cell is not identified that way in this course.',
        C: 'Trypan blue identifies the macrophage, by being eaten. Mast cells are not phagocytic, which is one of the differences between them and the basophil.',
        D: 'Sudan III identifies the fat cell.',
      },
    },
    {
      key: 'basophils-stained-by-toluidine-blue-metachromatic-due-to-046ab3ff',
      conceptKey: 'basophil-granule-contents-and-anaphylaxis',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Name the granule constituent that makes a basophil metachromatic.',
      explanations: {
        A: 'Histamine is in the same granule and is what causes the vasodilatation of anaphylaxis, but it is not what turns the dye purple.',
        B: 'Heparin is the sulphated glycosaminoglycan of the granule, and metachromasia is what a dye does on a densely charged polyanion like it.',
        C: '"Sulfate" names the chemical group that carries the charge rather than the molecule that carries the group — a half-answer that only looks right because heparin is sulphated.',
        D: 'Collagenase is not a basophil product at all.',
      },
    },

    // ---- carbohydrate stains ----------------------------------------------
    {
      key: 'glycogen-can-be-stained-by-the-following-edc769e1',
      conceptKey: 'pas-and-best-carmine-demonstrate-carbohydrate',
      difficulty: 'Easy', questionType: 'Stain choice',
      learningObjective: 'Name the stains that demonstrate glycogen.',
      explanations: {
        A: 'H&E does not show glycogen: the routine technique dissolves and washes much of it out, and what remains takes neither dye distinctively.',
        B: 'True on its own — Best\'s carmine is the classical glycogen stain — but the stem allows a combined option.',
        C: 'True on its own. PAS reacts with the sugar of glycogen and gives magenta red.',
        D: 'Both B and C demonstrate glycogen, and they do so for the same reason: glycogen is a carbohydrate.',
      },
    },
    {
      key: 'glycogen-granules-are-stained-with-760dabb7',
      conceptKey: 'pas-and-best-carmine-demonstrate-carbohydrate',
      difficulty: 'Moderate', questionType: 'Stain choice',
      learningObjective: 'Name the stains that demonstrate glycogen when a combined option is offered.',
      answerOverride: 'D',
      answerOverrideReason:
        'The bank carries A. Best\'s carmine does stain glycogen, so A is a true statement — but so is B, since PAS stains glycogen magenta red, and the row offers "Both a & b" as option D. When two single options are both true and their conjunction is offered, the conjunction is the answer. The neighbouring row on the same printed page, `fat-cells-are-stained-with-8f1f1a6a`, is keyed one line out in the same way, which is what makes this look like a shifted key rather than a considered one.',
      explanations: {
        A: 'True, and the answer the page carries. Best\'s carmine is the classical glycogen stain — but it is not the only one offered here.',
        B: 'Also true. PAS reddens glycogen because glycogen is a carbohydrate, which is exactly what PAS reacts with.',
        C: 'Sudan III is the fat stain. Fat and glycogen are the two cytoplasmic inclusions students most often swap, because both are storage products and both vanish in routine processing.',
        D: 'A and B are both true, so the combined option is the one that stands.',
      },
    },
    {
      key: 'carbohydrates-are-stained-red-with-5278c6fa',
      conceptKey: 'pas-and-best-carmine-demonstrate-carbohydrate',
      difficulty: 'Easy', questionType: 'Stain choice',
      learningObjective: 'Name the stain that reddens carbohydrate.',
      explanations: {
        A: 'Silver browns the Golgi and nerve fibres and blackens reticular fibres. It does redden nothing, and its reticular target is chosen for its sugar only indirectly.',
        B: 'Janus green is the vital stain for mitochondria and gives green, as its name says.',
        C: 'Iron haematoxylin is the stain for centrioles and gives dark blue.',
        D: 'Best\'s carmine reddens carbohydrate — glycogen above all — and PAS does the same in magenta.',
      },
    },
    {
      key: 'the-following-inclusion-can-be-stained-with-best-s-carmine-933220f4',
      conceptKey: 'pas-and-best-carmine-demonstrate-carbohydrate',
      difficulty: 'Easy', questionType: 'Stain choice',
      learningObjective: 'Name the cytoplasmic inclusion that Best\'s carmine demonstrates.',
      explanations: {
        A: 'Haemoglobin is a protein and is acidophilic; it takes eosin in an ordinary film and needs no special stain.',
        B: 'Best\'s carmine demonstrates glycogen, and glycogen is the carbohydrate inclusion of the liver and muscle cell.',
        C: 'Fat needs a fat-soluble dye — Sudan III — on a frozen section, because a carbohydrate stain has nothing to react with in a lipid droplet.',
        D: 'Carotene is the pigment dissolved in the fat droplet and is seen with the fat, not with a carbohydrate stain.',
      },
    },
    {
      key: 'in-light-microscopy-the-basement-membrane-is-stained-with-67deda39',
      conceptKey: 'basement-membrane-two-layers-and-what-fixes-the-epithelium-to-it',
      difficulty: 'Easy', questionType: 'Stain choice',
      learningObjective: 'Name the stain that shows the basement membrane by light microscopy.',
      explanations: {
        A: 'Sudan III shows fat. There is no fat in a basement membrane.',
        B: 'Haematoxylin stains the acidic components of the cell; the basement membrane is not resolved as a distinct layer by it.',
        C: 'Eosin makes it, at best, part of the general pink of the connective tissue below.',
        D: 'Keyed. PAS reddens the basement membrane because its glycoproteins are carbohydrate — the same reason it reddens glycogen and mucus.',
      },
    },
    {
      key: 'the-basement-membrane-can-be-stained-by-0f26b009',
      conceptKey: 'basement-membrane-two-layers-and-what-fixes-the-epithelium-to-it',
      difficulty: 'Moderate', questionType: 'Stain choice',
      learningObjective: 'Name both stains that demonstrate the basement membrane.',
      explanations: {
        A: 'Trypan blue is the vital stain for the macrophage; it is taken up by a living phagocyte and stains no extracellular sheet.',
        B: 'True on its own — silver browns the basement membrane, as it browns the reticular fibres of the reticular lamina.',
        C: 'True on its own — PAS reddens it, through its glycoprotein.',
        D: 'Both B and C work, and they work on the same layer from its two sides: silver on the reticular fibres of the connective tissue half, PAS on the sugar of the whole.',
      },
    },

    // ---- fat stains --------------------------------------------------------
    {
      key: 'fat-cells-can-be-stained-by-c3fbaf71',
      conceptKey: 'fat-is-shown-by-sudan-and-only-on-a-frozen-section',
      difficulty: 'Easy', questionType: 'Stain choice',
      learningObjective: 'Pick the stain that demonstrates the fat cell.',
      explanations: {
        A: 'A metachromatic stain marks the mast cell and the basophil, through their heparin.',
        B: 'A histochemical stain is the right family — Sudan III is one — but the option is unqualified, and the specific member is offered in D.',
        C: 'Trypan blue is the vital stain for the macrophage.',
        D: 'Sudan III dissolves into the fat droplet and colours it orange, and it is the stain that identifies the adipocyte.',
      },
    },
    {
      key: 'fat-cells-are-stained-with-8f1f1a6a',
      conceptKey: 'fat-is-shown-by-sudan-and-only-on-a-frozen-section',
      difficulty: 'Moderate', questionType: 'Stain choice',
      learningObjective: 'Name the stain that demonstrates fat, against a set that also offers the glycogen stains.',
      answerOverride: 'C',
      answerOverrideReason:
        'The bank carries B — PAS — and PAS is a carbohydrate reaction that shows nothing in a lipid droplet. Sudan III is the fat stain and PAS is the glycogen stain, which is option C. This row is number 31 on a page whose numbers 32 and 33 are keyed the same way, one line out: 32 asks for glycogen and is keyed to Best\'s carmine alone, and 33 asks for mitochondria and is keyed to Sudan III. Read as a block the three keys are displaced, and correcting them separately is what this override and the two beside it do.',
      explanations: {
        A: 'Best\'s carmine demonstrates glycogen, which is a carbohydrate.',
        B: 'The answer the page carries, and the reason for this override. PAS reacts with sugar; a fat droplet has none, which is why PAS shows nothing where the fat was.',
        C: 'Sudan III is a fat-soluble dye and stains the droplet orange, on a frozen section.',
        D: '"Both a & b" pairs the two carbohydrate stains, so it is wrong twice over.',
      },
    },
    {
      key: 'which-of-the-following-would-be-best-suited-to-visualize-lip-5681589f',
      conceptKey: 'fat-is-shown-by-sudan-and-only-on-a-frozen-section',
      difficulty: 'Easy', questionType: 'Stain choice',
      learningObjective: 'Choose the stain best suited to showing lipid.',
      explanations: {
        A: 'Orcein browns elastic fibres and does nothing to lipid.',
        B: 'H&E dissolves the lipid out during processing and leaves an empty space — the opposite of visualising it.',
        C: 'Keyed. Sudan III is the fat-soluble dye that colours the droplet orange. The option is printed with the Roman numeral mangled by the scan, but the stain named is unambiguous.',
        D: 'Silver browns the Golgi and nerve fibres and blackens reticular fibres; none of those is lipid.',
      },
    },
    {
      key: 'lipids-e76d0a4d',
      conceptKey: 'fat-is-shown-by-sudan-and-only-on-a-frozen-section',
      difficulty: 'Hard', questionType: 'Negative reasoning',
      learningObjective: 'Reject three false statements about where lipid is stored and what stains it.',
      answerOverride: 'D',
      answerOverrideReason:
        'The source printed no key, and each of the three substantive options fails: fat is stored in the adipocyte of adipose connective tissue rather than mainly in muscle or in liver cells, and PAS is a carbohydrate reaction that gives nothing on lipid. That leaves "none of the above", which is the only option this row can carry.',
      explanations: {
        A: 'Muscle stores glycogen as its ready fuel, not fat as a depot. The fat depot is adipose tissue.',
        B: 'PAS is the carbohydrate reaction. It reddens glycogen, mucus and basement membrane; a lipid droplet has no sugar for it to react with.',
        C: 'The liver stores glycogen. Fat accumulates in it only in disease, which is a pathological finding rather than the normal store this option claims.',
        D: 'By elimination, no option offered is true: fat is stored in the unilocular adipocyte and is demonstrated by Sudan III on a frozen section.',
      },
    },
    {
      key: 'signet-ring-appearance-is-a-descriptive-term-for-the-d9aa199c',
      conceptKey: 'unilocular-versus-multilocular-adipocyte',
      difficulty: 'Moderate', questionType: 'Structural identification',
      learningObjective: 'Say which preparation of a fat cell gives the signet ring appearance and why.',
      explanations: {
        A: 'Sudan III fills the droplet with orange, so the cell looks full rather than empty. That is the opposite of a signet ring.',
        B: 'Sudan black does the same in black; again the space is occupied.',
        C: 'H&E dissolves the fat away, leaving a large empty space with the nucleus and a rim of cytoplasm flattened against one side — the stone and the band of a signet ring.',
        D: 'Toluidine blue is the mast cell stain and does nothing to a fat cell.',
      },
    },
    {
      key: 'concerning-unilocular-adipocytes-they-1051d1be',
      conceptKey: 'unilocular-versus-multilocular-adipocyte',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Pick the true statement about the unilocular fat cell against the characters of the multilocular one.',
      answerOverride: 'A',
      answerOverrideReason:
        'The source printed no key. A is true of the unilocular cell — Sudan III is the stain for its fat — and the other three are each a character of the multilocular cell or of no cell: thermogenesis and multiple small droplets belong to the brown, multilocular adipocyte, and a mature fat cell does not divide.',
      explanations: {
        A: 'The single large droplet of the unilocular cell is fat, and Sudan III is what makes it visible.',
        B: 'Heat generation is the multilocular, brown fat cell\'s work, through the thermogenin of its many mitochondria. White fat insulates against heat loss, which is a different job.',
        C: 'One large droplet is what unilocular means. Many small droplets is the multilocular cell.',
        D: 'A fat cell filled with its droplet does not divide; new fat cells come from the undifferentiated mesenchymal cell.',
      },
    },

    // ---- enzyme histochemistry --------------------------------------------
    {
      key: 'lysosomes-are-stained-by-d73a1b30',
      conceptKey: 'lysosome-enzymes-origin-and-functions',
      difficulty: 'Easy', questionType: 'Stain choice',
      learningObjective: 'Name the histochemical reaction that identifies a lysosome.',
      explanations: {
        A: 'A lysosome cannot be seen in a routine H&E section at all; it is below the useful limit and takes no distinctive colour.',
        B: 'Metachromatic staining marks the heparin of mast cell and basophil granules, not a lysosome.',
        C: 'Acid phosphatase is the lysosomal marker enzyme, and the histochemical reaction for it is how the organelle is identified by light microscopy.',
        D: 'Alkaline phosphatase is the trap this pair of options exists for. It is not the lysosomal enzyme; acid is.',
      },
    },
    {
      key: 'peroxisomes-are-stained-by-898f81f2',
      conceptKey: 'peroxisome-oxidase-and-catalase',
      difficulty: 'Moderate', questionType: 'Stain choice',
      learningObjective: 'Name the enzyme whose histochemical demonstration identifies a peroxisome.',
      answerOverride: 'B',
      answerOverrideReason:
        'The bank carries D, alkaline phosphatase, which is neither a lysosomal nor a peroxisomal enzyme. The peroxisome has two enzyme groups, the oxidases and catalase, and option B names catalase specifically. This row sits on the same book\'s page 21 among the same block of shifted keys as the fat cell and mitochondrion rows.',
      explanations: {
        A: 'A metachromatic stain marks heparin-rich granules; a peroxisome has none.',
        B: 'Catalase is the peroxisome\'s defining enzyme — it destroys the hydrogen peroxide the organelle\'s own oxidases produce — and the histochemical reaction for it is what identifies the organelle.',
        C: 'Acid phosphatase is the lysosomal marker. Substituting one single-membrane vesicle for the other is the standard error here.',
        D: 'The answer the page carries, and the reason for this override. Alkaline phosphatase is a membrane enzyme of absorptive and osteogenic cells; it belongs to neither organelle in this pair.',
      },
    },

    // ---- mitochondria and centrioles ---------------------------------------
    {
      key: 'mitochondria-can-be-stained-by-647ed7cf',
      conceptKey: 'mitochondrion-ultrastructure-and-staining',
      difficulty: 'Easy', questionType: 'Stain choice',
      learningObjective: 'Name the vital stain for mitochondria.',
      explanations: {
        A: 'Janus green is the vital stain for mitochondria, and it colours them green.',
        B: 'Van Gieson is a fibre stain: red for collagen, yellow for elastic fibres.',
        C: 'H&E makes mitochondria part of the general acidophilia of the cytoplasm; it does not distinguish them.',
        D: 'Orcein browns elastic fibres.',
      },
    },
    {
      key: 'mitochondria-can-be-stained-with-8dc54379',
      conceptKey: 'mitochondrion-ultrastructure-and-staining',
      difficulty: 'Moderate', questionType: 'Stain choice',
      learningObjective: 'Name the stain for mitochondria against a set of other special stains.',
      answerOverride: 'B',
      answerOverrideReason:
        'The bank carries C, Sudan III, which is the fat stain. Janus green and iron haematoxylin are the mitochondrial stains, and Janus green is option B. This is the third row of the shifted block on the same printed page as `fat-cells-are-stained-with-8f1f1a6a` and `glycogen-granules-are-stained-with-760dabb7`.',
      explanations: {
        A: 'Best\'s carmine demonstrates glycogen.',
        B: 'Janus green is the vital stain for mitochondria; iron haematoxylin is the other stain used for them.',
        C: 'The answer the page carries, and the reason for this override. Sudan III shows fat, which is a cytoplasmic inclusion rather than an organelle.',
        D: 'Leishman\'s stain is the neutral stain for a blood film and demonstrates whole cells, not organelles.',
      },
    },
    {
      key: 'stain-used-for-centriole-e56e9242',
      conceptKey: 'centriole-structure-and-role-in-cell-division',
      difficulty: 'Easy', questionType: 'Stain choice',
      learningObjective: 'Name the stain that shows centrioles by light microscopy.',
      explanations: {
        A: 'Iron haematoxylin is the stain for centrioles, which are otherwise below the useful resolution of the light microscope in a routine section.',
        B: 'Janus green shows mitochondria.',
        C: 'Silver browns the Golgi and nerve fibres and blackens reticular fibres.',
        D: 'PAS is the carbohydrate reaction; a centriole is protein — tubulin — and holds no sugar.',
      },
    },

    // ---- the Golgi ---------------------------------------------------------
    {
      key: 'golgi-complex-could-be-stained-as-brown-granules-fibrils-by-704fe7f8',
      conceptKey: 'golgi-apparatus-lm-appearance-and-position',
      difficulty: 'Easy', questionType: 'Stain choice',
      learningObjective: 'Name the stain that shows the Golgi apparatus positively.',
      explanations: {
        A: 'H&E shows the Golgi only as a negative image — a pale gap in otherwise basophilic cytoplasm — not as brown granules.',
        B: 'PAS reddens carbohydrate. The Golgi does add sugar to proteins, but the reaction does not outline the organelle.',
        C: 'Silver impregnation shows the Golgi as a network of brown granules and fibrils beside the nucleus.',
        D: 'Integral membrane proteins are a component of a membrane, not a stain — the option is not the same kind of thing as the other three.',
      },
    },
    {
      key: 'golgi-apparatus-5389363c',
      conceptKey: 'golgi-apparatus-lm-appearance-and-position',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Pick the true statement about the light-microscopic Golgi apparatus.',
      explanations: {
        A: 'The two halves are swapped. Silver gives the positive image, brown granules and fibrils; it is H&E that gives the negative image.',
        B: 'Also swapped. H&E gives no granular network — that is silver\'s picture — and what H&E gives is a pale unstained area.',
        C: 'The Golgi varies in size, shape and position with the cell: apical in a secretory cell discharging at a surface, perinuclear in a nerve cell.',
        D: 'The opposite of the fact. It is hard to see in a routine section, which is why the negative image and the silver stain both had to be learned.',
      },
    },
    {
      key: 'concerning-the-golgi-complex-all-the-statements-are-true-exc-766e5673',
      conceptKey: 'golgi-apparatus-lm-appearance-and-position',
      difficulty: 'Hard', questionType: 'Negative stem',
      learningObjective: 'Identify the false statement about the Golgi apparatus in a set of three true ones.',
      answerOverride: 'D',
      answerOverrideReason:
        'The bank carries A, "stained with silver", but that is the correct positive demonstration of the Golgi and cannot be the false statement. D is false both on the record and on this leaf\'s own evidence: the Golgi is best developed in protein-synthesising cells, and the plasma cell — the type example of one — is the cell in which the negative Golgi image is asked about three separate times in this same bank.',
      explanations: {
        A: 'True, and the answer the page carries. Silver shows the Golgi as brown granules and fibrils; this is the reason the override was needed.',
        B: 'True: in an H&E section the Golgi appears as an image — the negative Golgi image, a pale area where the basophilic cytoplasm is interrupted.',
        C: 'True. Size, shape and position all vary with the cell and with what it is secreting.',
        D: 'The exception. A protein-synthesising cell has a well developed Golgi — that is what packages the protein for export — and the plasma cell shows it as a clear negative image.',
      },
    },
    {
      key: 'in-h-e-stained-sections-of-plasma-cell-golgi-apparatus-appea-75f990cf',
      conceptKey: 'golgi-apparatus-lm-appearance-and-position',
      difficulty: 'Easy', questionType: 'Structural identification',
      learningObjective: 'Say how the Golgi apparatus of a plasma cell appears in an H&E section.',
      explanations: {
        A: 'Perinuclear is the Golgi\'s position in a nerve cell. The question asks how it appears, not where it lies, and in the plasma cell it is beside the nucleus rather than around it.',
        B: 'Apical describes the position in a secretory epithelial cell discharging at a free surface. A plasma cell has no free surface.',
        C: 'It appears unstained — the negative Golgi image, a pale gap in the plasma cell\'s otherwise deeply basophilic cytoplasm. Asked three times across three books, which makes it the most repeated question in this leaf.',
        D: 'Basal is where the rough endoplasmic reticulum of a secretory cell lies, below the nucleus, and it is basophilic rather than pale.',
      },
    },
    {
      key: 'in-h-e-stained-sections-of-protein-forming-cell-golgi-appear-03113d3c',
      conceptKey: 'golgi-apparatus-lm-appearance-and-position',
      difficulty: 'Moderate', questionType: 'Structural identification',
      learningObjective: 'Say how the Golgi of any protein-forming cell appears in H&E.',
      answerOverride: 'D',
      answerOverrideReason:
        'The source printed no key. The H&E appearance of the Golgi is the negative Golgi image — an unstained area beside the nucleus — and the identical question asked of the plasma cell, `in-h-e-stained-sections-of-plasma-cell-golgi-apparatus-appea-75f990cf`, is keyed to "unstained" in three separate books.',
      explanations: {
        A: 'Basophilic near the nucleus describes the rough endoplasmic reticulum that surrounds the Golgi, not the Golgi itself. Its basophilia is what makes the Golgi\'s pallor visible.',
        B: 'Acidophilic describes cytoplasm poor in RNA — the opposite of a protein-forming cell\'s.',
        C: 'Brown fibrils and granules is the silver picture, not the H&E one. The question names the stain, and that is the discriminator.',
        D: 'The negative Golgi image: an unstained area beside the nucleus, where the Golgi takes neither dye.',
      },
    },
    {
      key: 'negative-golgi-image-appears-ef77c5a4',
      conceptKey: 'golgi-apparatus-lm-appearance-and-position',
      difficulty: 'Moderate', questionType: 'Structural identification',
      learningObjective: 'State both the cells in which a negative Golgi image is seen and the stain that produces it.',
      answerOverride: 'D',
      answerOverrideReason:
        'The source printed no key. A and B are each true — the negative image is the classical finding in the plasma cell and the osteoblast, both protein-forming cells, and it is an H&E finding — and the row offers their conjunction as option D.',
      explanations: {
        A: 'True on its own. The plasma cell and the osteoblast are the two cells named for the negative Golgi image, because both have deeply basophilic cytoplasm for the pale area to stand out against.',
        B: 'True on its own. The negative image is what H&E gives; silver gives the positive one.',
        C: 'The reverse of the mechanism. A small Golgi gives a small pale area or none; the image is most obvious where the Golgi is large.',
        D: 'Both A and B hold, and together they state the whole finding: which cells, and in which stain.',
      },
    },

    // ---- the plasma membrane ------------------------------------------------
    {
      key: 'regarding-the-cell-membrane-the-following-is-true-171f82d4',
      conceptKey: 'plasma-membrane-unit-membrane-em-and-thickness',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Pick the true statement about the plasma membrane from a set of classification and staining claims.',
      explanations: {
        A: 'The plasma membrane is the first item on the list of membranous organelles — being a membrane is what puts it there.',
        B: 'Cell respiration is the mitochondrion\'s work. The membrane\'s functions are protection, selective permeability, absorption, secretion and reception.',
        C: 'H&E does not resolve it. Silver or PAS is needed, and both act on the carbohydrate of its outer coat.',
        D: 'On electron microscopy it is trilaminar: two dark layers with a light one between them.',
      },
    },
    {
      key: 'the-following-stains-can-be-used-to-stain-the-cell-membrane-fb3d7be9',
      conceptKey: 'plasma-membrane-unit-membrane-em-and-thickness',
      difficulty: 'Moderate', questionType: 'Stain choice',
      learningObjective: 'Name the stain that demonstrates the plasma membrane by light microscopy.',
      answerOverride: 'A',
      answerOverrideReason:
        'The source printed no key. Silver and PAS are the two ways of showing the plasma membrane by light microscopy, and silver is the only one of the four options offered.',
      explanations: {
        A: 'Silver demonstrates the membrane, acting on the carbohydrate of its cell coat rather than on the lipid bilayer itself.',
        B: 'Trichrome stains — Mallory among them — are fibre stains for connective tissue.',
        C: 'Orcein browns elastic fibres.',
        D: 'India ink is a vital stain: it is injected and phagocytosed by macrophages, and it demonstrates a cell rather than a membrane.',
      },
    },

    // ---- the three fibres, asked through their stains -----------------------
    {
      key: 'by-mallory-stain-collagen-fibers-are-stained-1107ffdd',
      conceptKey: 'connective-tissue-fibre-stains-by-fibre-type',
      difficulty: 'Easy', questionType: 'Stain choice',
      learningObjective: 'Give the colour collagen takes with Mallory\'s trichrome.',
      explanations: {
        A: 'Pink is collagen in eosin. Every fibre stain question turns on which stain is named, because collagen has a different colour in each.',
        B: 'Mallory\'s trichrome stains collagen blue.',
        C: 'Brown is orcein on elastic fibres, or silver on reticular ones.',
        D: 'Red is collagen with van Gieson, not with Mallory — the two trichrome-family stains give opposite ends of the spectrum on the same fibre.',
      },
    },
    {
      key: 'which-of-the-following-would-be-best-suited-to-differentiate-2ceebe5f',
      conceptKey: 'connective-tissue-fibre-stains-by-fibre-type',
      difficulty: 'Moderate', questionType: 'Stain choice',
      learningObjective: 'Choose the stain that best separates collagen from the other fibres.',
      explanations: {
        A: 'Keyed. Mallory\'s trichrome turns collagen blue and leaves the other fibres a different colour, which is what "differentiate" asks for.',
        B: 'H&E makes collagen and elastic fibres both pink, so it is the one stain that cannot separate them by colour.',
        C: 'Sudan shows fat and nothing else.',
        D: 'Silver shows reticular fibres. It would identify those, but the question asks for collagen.',
      },
    },
    {
      key: 'a-young-boy-with-unhealed-leg-wound-was-diagnosed-as-vitamin-bbc6ae4f',
      conceptKey: 'connective-tissue-fibre-stains-by-fibre-type',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Choose the stain that best demonstrates collagen when a vignette points at collagen synthesis.',
      answerOverride: 'B',
      answerOverrideReason:
        'The source printed no key. The stem asks for the best stain to differentiate collagen from other fibres, and Mallory\'s trichrome is the stain that turns collagen blue. The identically worded row `which-of-the-following-would-be-best-suited-to-differentiate-2ceebe5f` is keyed A for the same option in a different letter order, which corroborates it.',
      explanations: {
        A: 'H&E leaves collagen and elastic fibres both pink, so it differentiates nothing here — which is precisely why a special stain was invented.',
        B: 'Mallory\'s trichrome stains collagen blue against the other fibres.',
        C: 'Sudan is the fat stain. The vitamin C vignette is about collagen, and collagen is protein.',
        D: 'Silver demonstrates reticular fibres, which are type III collagen and are not the fibre failing in scurvy.',
      },
    },
    {
      key: 'elastic-fibers-can-be-stained-brown-by-3f14dea9',
      conceptKey: 'connective-tissue-fibre-stains-by-fibre-type',
      difficulty: 'Easy', questionType: 'Stain choice',
      learningObjective: 'Name the stain that browns elastic fibres.',
      explanations: {
        A: 'Orcein browns elastic fibres, and it leaves collagen unstained beside them.',
        B: 'Van Gieson does stain elastic fibres, but yellow, and collagen red — that is its whole use.',
        C: 'Mallory\'s trichrome turns collagen blue.',
        D: 'Eosin makes both collagen and elastic fibres pink, which is why neither can be identified in a routine section by colour.',
      },
    },
    {
      key: 'what-color-do-elastic-fibers-stain-with-van-gieson-stain-26a8714b',
      conceptKey: 'connective-tissue-fibre-stains-by-fibre-type',
      difficulty: 'Moderate', questionType: 'Stain choice',
      learningObjective: 'Give the colour elastic fibres take with van Gieson.',
      explanations: {
        A: 'Red or orange is close to what collagen does in van Gieson, which is the swap this question is built on.',
        B: 'Pink or red is collagen — in eosin and in van Gieson alike.',
        C: 'Purple and red is what a metachromatic dye does to a mast cell granule, not what van Gieson does to any fibre.',
        D: 'Keyed. Van Gieson stains elastic fibres yellow and collagen red, which is why it is the one stain that separates the two in a single field.',
      },
    },
    {
      key: 'yellow-elastic-fibers-are-stained-fa279de3',
      conceptKey: 'connective-tissue-fibre-stains-by-fibre-type',
      difficulty: 'Moderate', questionType: 'Stain choice',
      learningObjective: 'Give both colours elastic fibres take, in orcein and in van Gieson.',
      explanations: {
        A: 'True on its own. Orcein browns them.',
        B: 'True on its own. Van Gieson yellows them.',
        C: 'PAS gives magenta red on carbohydrate. Elastin is protein, and elastic fibres are not PAS-positive; reticular fibres are, which is where the confusion starts.',
        D: 'Both A and B hold, and the pair is the whole of what is said about staining elastic fibres apart from eosin.',
      },
    },
    {
      key: 'which-of-the-following-would-be-best-suited-to-visualize-ret-61151fde',
      conceptKey: 'reticular-fibre-silver-identification',
      difficulty: 'Easy', questionType: 'Stain choice',
      learningObjective: 'Choose the stain that demonstrates reticular fibres.',
      explanations: {
        A: 'Mallory\'s trichrome is a collagen stain. Reticular fibres are collagen too — type III — but the trichrome does not resolve them.',
        B: 'H&E does not show reticular fibres at all, which is the fact this whole question rests on.',
        C: 'Sudan shows fat.',
        D: 'Keyed. Silver impregnation is the only way to see a reticular fibre, and it shows them as a fine brown branching network.',
      },
    },
    {
      key: 'reticular-fibers-can-be-stained-by-the-following-except-b899b4e9',
      conceptKey: 'reticular-fibre-silver-identification',
      difficulty: 'Moderate', questionType: 'Negative stem',
      learningObjective: 'Identify the stain that does not show reticular fibres.',
      explanations: {
        A: 'Silver does show them, brown, and gives them the name argyrophilic.',
        B: 'The exception. Reticular fibres are not visible in H&E — the single most examined negative fact about them.',
        C: 'PAS does show them, red, because of the high sugar content of type III collagen.',
        D: '"Both b & c" cannot be the exception when C is a stain that works; pairing a true with a false makes the option false as a whole.',
      },
    },
    {
      key: 'reticular-fibers-have-the-following-characters-except-6d542c4a',
      conceptKey: 'reticular-fibre-silver-identification',
      difficulty: 'Moderate', questionType: 'Negative stem',
      learningObjective: 'Identify the false character of a reticular fibre.',
      explanations: {
        A: 'True. Silver blackens or browns them, and argyrophilic is the word for it.',
        B: 'True. PAS is positive on them, because of their sugar.',
        C: 'True. They form the stroma of spleen, lymph node and liver.',
        D: 'The exception. Reticular fibres branch and anastomose — that is what makes them a network, and unbranched is the one thing they are not.',
      },
    },
    {
      key: 'concerning-the-reticular-connective-tissue-7270b748',
      conceptKey: 'reticular-fibre-silver-identification',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Pick the true statement about reticular connective tissue.',
      answerOverride: 'B',
      answerOverrideReason:
        'The source printed no key. B is correct — reticular fibres are demonstrated by silver — and the other three contradict it: the fibres form a network rather than bundles, binding structures together is the job of loose areolar tissue, and reticular fibres are explicitly not visible in H&E.',
      explanations: {
        A: 'Bundles are collagen type I. Reticular fibres anastomose into a network instead.',
        B: 'Silver impregnation is what demonstrates them, and nothing else in a light microscope will.',
        C: 'Binding structures together is the function of loose areolar connective tissue. Reticular tissue supports the cells of an organ — stroma, not packing.',
        D: 'The opposite of the defining fact. H&E shows nothing of them.',
      },
    },
    {
      key: 'collagen-fibers-have-the-following-characters-except-c8113330',
      conceptKey: 'collagen-versus-elastic-fibre-identification',
      difficulty: 'Moderate', questionType: 'Negative stem',
      learningObjective: 'Identify the false character of a collagen fibre.',
      explanations: {
        A: 'True. Collagen is white in the fresh state when it is present in quantity — a tendon is the everyday example.',
        B: 'True. Collagen is acidophilic, which is why eosin colours it.',
        C: 'True, and the same fact restated: acidophilic means it takes eosin pink.',
        D: 'The exception. Collagen forms branching bundles of non-branching fibres; the individual fibre does not branch, and elastic fibres are the ones that do.',
      },
    },
    {
      key: 'concerning-collagen-fibers-7652b65d',
      conceptKey: 'collagen-versus-elastic-fibre-identification',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Pick the true statement about collagen fibres.',
      answerOverride: 'A',
      answerOverrideReason:
        'The source printed no key. Option A is the correct wording almost verbatim — collagen fibres are "wavy branching bundles formed of non-branching fibres" — and the other three are each contradicted: collagen is acidophilic not basophilic, it is flexible but inelastic, and van Gieson stains it red while yellow is what van Gieson does to elastic fibres.',
      explanations: {
        A: 'The bundle branches; the fibre within it does not.',
        B: 'Collagen is acidophilic — it takes the acidic dye eosin and turns pink. Basophilic is the nucleus, and the cytoplasm of a protein-forming cell.',
        C: 'Elastic is exactly what collagen is not. It is flexible, which is a different property: it bends but does not lengthen and recoil.',
        D: 'Yellow with van Gieson is the elastic fibre. Collagen with van Gieson is red, and this option swaps the two.',
      },
    },
    {
      key: 'all-of-the-following-are-true-about-yellow-elastic-fibers-ex-e01e5f53',
      conceptKey: 'collagen-versus-elastic-fibre-identification',
      difficulty: 'Moderate', questionType: 'Negative stem',
      learningObjective: 'Identify the false character of an elastic fibre.',
      explanations: {
        A: 'True. Elastic fibres are thin and stretch, which is the property that names them.',
        B: 'True. They branch and run singly, unlike the bundled collagen beside them.',
        C: 'True. Orcein is the elastic fibre stain and browns them.',
        D: 'The exception. Elastic fibres are acidophilic and take eosin pink; deep basophilia belongs to nuclei and to ribosome-rich cytoplasm.',
      },
    },
    {
      key: 'elastic-fibers-are-characterized-by-being-df60ef40',
      conceptKey: 'collagen-versus-elastic-fibre-identification',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Pick the true statement about elastic fibres against three collagen characters.',
      explanations: {
        A: 'Bundles are collagen. Elastic fibres run singly and branch.',
        B: 'Keyed. Orcein is the elastic fibre stain and gives brown.',
        C: 'They are demonstrated with H&E — pink, like collagen. It is the reticular fibre that H&E misses entirely.',
        D: 'Transverse striations belong to skeletal and cardiac muscle fibres. The word "fibre" again names two different things in one option list.',
      },
    },

    // ---- the mast cell and the macrophage -----------------------------------
    {
      key: 'after-staining-the-c-t-with-toludin-blue-the-cells-which-hav-a2f2ac30',
      conceptKey: 'mast-cell-lm-em-metachromasia',
      difficulty: 'Easy', questionType: 'Structural identification',
      learningObjective: 'Name the connective tissue cell whose granules go magenta with toluidine blue.',
      explanations: {
        A: 'The plasma cell is basophilic but diffusely, from its rough endoplasmic reticulum, and it is not metachromatic — it stays the colour of the dye.',
        B: 'Metachromatic magenta granules in a connective tissue cell are the mast cell, and the heparin in the granule is why.',
        C: '"Phagocytic cells" means the macrophage, demonstrated by trypan blue it has eaten, not by a change in a dye\'s colour.',
        D: 'Endothelial cells line vessels and have no granules of this kind.',
      },
    },
    {
      key: 'about-mast-cell-all-are-true-except-f4dafeec',
      conceptKey: 'mast-cell-lm-em-metachromasia',
      difficulty: 'Moderate', questionType: 'Negative stem',
      learningObjective: 'Name the immunoglobulin the mast cell has receptors for, and reject the wrong one.',
      explanations: {
        A: 'True. The granules are basophilic in H&E, which is what makes the cell recognisable before any special stain.',
        B: 'True. IgE receptors on the mast cell surface are what allergen binds to, and their binding is what discharges the granules.',
        C: 'The exception. IgA is the antibody of secretions — saliva, tears, gut mucus — and the mast cell has no receptor for it.',
        D: 'True. Toluidine blue on mast cell granules is the standard example of metachromasia.',
      },
    },
    {
      key: 'both-mast-cells-basophilis-share-all-of-the-following-except-bbc3ee7a',
      conceptKey: 'mast-cell-lm-em-metachromasia',
      difficulty: 'Hard', questionType: 'Negative stem',
      learningObjective: 'Name what the mast cell and the basophil do not share.',
      explanations: {
        A: 'Shared. Both carry IgE receptors on the surface, and both discharge on allergen binding.',
        B: 'The exception, and keyed. Neither cell is the phagocyte of this pair — phagocytic ability is among the points on which the two differ, and it is the basophil that has a limited capacity the mast cell lacks.',
        C: 'Shared. Both have metachromatic granules with toluidine blue, for the same reason: heparin.',
        D: 'Shared. Both secrete eosinophil chemotactic factor, which is how eosinophils arrive at an allergic site.',
      },
    },
    {
      key: 'concerning-mast-cells-433dd658',
      conceptKey: 'mast-cell-lm-em-metachromasia',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Pick the true statement about the mast cell against the characters of its neighbours.',
      answerOverride: 'C',
      answerOverrideReason:
        'The source printed no key. C is correct about mast cell granules, and each of the other three belongs to a different cell: antibody formation to the plasma cell, histaminase secretion to the eosinophil, and trypan blue demonstration to the macrophage.',
      explanations: {
        A: 'Antibodies come from the plasma cell. The mast cell binds antibody — IgE, on its surface — which is a different relation and the source of the confusion.',
        B: 'Histaminase is the eosinophil\'s enzyme, and it exists to destroy the histamine the mast cell released. The two cells are on opposite sides of the same reaction.',
        C: 'Mast cell granules stain metachromatically with toluidine blue.',
        D: 'Trypan blue demonstrates the macrophage, which phagocytoses it. The mast cell is not phagocytic.',
      },
    },
    {
      key: 'about-macrophages-all-are-true-except-06f23028',
      conceptKey: 'macrophage-identification-vital-stain',
      difficulty: 'Moderate', questionType: 'Negative stem',
      learningObjective: 'Give the origin of the macrophage and reject the lymphocytic one.',
      explanations: {
        A: 'True. Presenting antigen to lymphocytes is one of the macrophage\'s four listed functions.',
        B: 'The exception. The macrophage comes from the blood monocyte. What comes from the B lymphocyte is the plasma cell, and the two derivations are the pair this question exists to separate.',
        C: 'True. Trypan blue is the vital stain the macrophage phagocytoses, and it is the cell\'s specific demonstration.',
        D: 'True. Acid phosphatase histochemistry marks it, because it is rich in lysosomes.',
      },
    },

    // ---- the eosinophil ----------------------------------------------------
    {
      key: 'nucleus-of-eosinophils-is-6bd7d3b5',
      conceptKey: 'eosinophil-granule-contents-and-role-in-allergy',
      difficulty: 'Easy', questionType: 'Structural identification',
      learningObjective: 'Give the nuclear shape of the eosinophil.',
      explanations: {
        A: 'Multilobed and segmented is the neutrophil, two to five lobes; the eosinophil stops at two.',
        B: 'Bilobed, the two lobes joined by a thick chromatin thread so that the whole looks like a horse-shoe or a pair of spectacles.',
        C: 'The S-shaped nucleus is the basophil\'s, and it is usually hidden by the coarse granules over it.',
        D: 'A large kidney-shaped nucleus is the monocyte.',
      },
    },
    {
      key: 'all-functions-of-eosinophils-except-b50122b0',
      conceptKey: 'eosinophil-granule-contents-and-role-in-allergy',
      difficulty: 'Moderate', questionType: 'Negative stem',
      learningObjective: 'Separate what the eosinophil does in allergy from what the basophil does.',
      explanations: {
        A: 'True. Histaminase and sulphatase destroy histamine and heparin, which is how the eosinophil ends an allergic reaction.',
        B: 'True. Phagocytosing antigen–antibody complexes is one of its listed functions.',
        C: 'True. Its granule protein is cytotoxic to parasites.',
        D: 'The exception. Releasing histamine to cause vasodilatation and anaphylaxis is the basophil and the mast cell. The eosinophil is the cell that stops it.',
      },
    },
    {
      key: 'functions-of-eosinophils-include-all-except-9b4cab42',
      conceptKey: 'eosinophil-granule-contents-and-role-in-allergy',
      difficulty: 'Moderate', questionType: 'Negative stem',
      learningObjective: 'Identify the function that belongs to no leukocyte in this list.',
      explanations: {
        A: 'True. Histaminase destroys histamine.',
        B: 'True. It engulfs antigen–antibody complexes.',
        C: 'True. Its granule protein kills parasites.',
        D: 'The exception, and keyed. Trephone substances are attributed to the lymphocyte, said to promote tissue growth and repair — not to the eosinophil.',
      },
    },
    {
      key: 'eosinophils-granules-include-all-of-the-following-except-8504d8a7',
      conceptKey: 'eosinophil-granule-contents-and-role-in-allergy',
      difficulty: 'Hard', questionType: 'Negative stem',
      learningObjective: 'Name the granule contents of the eosinophil and reject the basophil\'s.',
      answerOverride: 'D',
      answerOverrideReason:
        'The source printed no key. The eosinophil granule carries a basic protein cytotoxic to parasites, together with histaminase and sulphatase. Leukotrienes are listed among the basophil and mast cell secretions, not the eosinophil\'s, so D is the one item on this list that belongs to another cell.',
      explanations: {
        A: 'True. The granule protein is cytotoxic to parasites, and it is also called a neurotoxin for that effect.',
        B: 'True. Histaminase destroys the histamine released by the basophil and mast cell.',
        C: 'True. Sulphatase destroys heparin, the other main product of those cells.',
        D: 'The exception. Leukotrienes are a basophil and mast cell product and cause bronchospasm; the eosinophil opposes their effects rather than releasing them.',
      },
    },
    {
      key: 'eosinophils-increase-in-number-in-case-of-7fad14b2',
      conceptKey: 'eosinophil-granule-contents-and-role-in-allergy',
      difficulty: 'Easy', questionType: 'Clinical application',
      learningObjective: 'Name the two conditions that raise the eosinophil count.',
      explanations: {
        A: 'A bacterial infection raises the neutrophil count. The neutrophil is the first-line phagocyte against bacteria.',
        B: 'True on its own — a parasitic infection raises eosinophils, and the granule protein is why.',
        C: 'True on its own — allergy raises them, because the eosinophil is drawn in to end the reaction.',
        D: 'Both B and C raise the eosinophil count, and both for reasons the cell\'s two functions explain.',
      },
    },
    {
      key: 'eosinophils-are-lowered-1-in-the-following-3c216403',
      conceptKey: 'eosinophil-granule-contents-and-role-in-allergy',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Name a cause of eosinopenia.',
      explanations: {
        A: 'Typhoid fever is the classical cause of a low count in older texts, but the option this question is keyed against is the pharmacological one, and typhoid is not the answer intended here.',
        B: 'Tuberculosis is a chronic infection and does not characteristically drop the eosinophil count.',
        C: 'A viral infection such as influenza raises lymphocytes; it does not define an eosinopenia.',
        D: 'Corticosteroid treatment drops the eosinophil count below one per cent, which is the definition of eosinopenia, and it is the reason a steroid works in allergy.',
      },
    },
    {
      key: 'one-of-the-following-is-true-about-eosinophils-d491deda',
      conceptKey: 'eosinophil-granule-contents-and-role-in-allergy',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Pick the one true statement about the eosinophil from a set built out of its neighbours\' characters.',
      answerOverride: 'B',
      answerOverrideReason:
        'The source printed no key. B is the correct description of the eosinophil nucleus — bilobed, horse-shoe shaped — and each of the other three belongs to another cell: eosinophil chemotactic factor is secreted by the mast cell and the basophil to attract eosinophils rather than by eosinophils themselves, 60–70% is the neutrophil\'s share of the count, and histamine and heparin are basophil products.',
      explanations: {
        A: 'The direction of the arrow is reversed. Eosinophil chemotactic factor is what the mast cell and basophil release to summon eosinophils; the eosinophil receives the signal.',
        B: 'The eosinophil nucleus is bilobed and horse-shoe shaped, the two lobes joined by a thick chromatin thread.',
        C: '60–70% is the neutrophil. The eosinophil is 1–4%.',
        D: 'Histamine and heparin are basophil and mast cell secretions. The eosinophil secretes the two enzymes that destroy them.',
      },
    },
    {
      key: 'a7-year-old-school-boy-has-a-blood-report-with-an-eosinophil-3a9af4fe',
      conceptKey: 'eosinophil-granule-contents-and-role-in-allergy',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Choose the investigation a raised eosinophil count without allergy points to.',
      answerOverride: 'B',
      answerOverrideReason:
        'The source printed no key. The eosinophil has two causes of rise in this course, allergy and parasitic infection, and the stem removes the first by saying the child has no allergic problems. A stool analysis is the investigation for an intestinal parasite, so B is the only option the stem leaves open.',
      explanations: {
        A: 'Urine analysis would be the answer for a urinary schistosomiasis, but the routine first test for the intestinal parasites that raise eosinophils in a schoolchild is the stool.',
        B: 'Eosinophilia with allergy excluded means a parasite, and stool analysis is how a parasite is looked for.',
        C: 'Bleeding time tests platelet function. Eosinophils have no part in haemostasis.',
        D: 'Allergy testing is what the stem has already excluded by saying the boy has no allergic problems.',
      },
    },

    // ---- one erythrocyte row ------------------------------------------------
    {
      key: 'which-of-the-following-is-described-as-having-a-central-pall-9e668638',
      conceptKey: 'erythrocyte-identification-blood-film',
      difficulty: 'Easy', questionType: 'Structural identification',
      learningObjective: 'Name the blood cell that shows a central pallor and say what causes it.',
      explanations: {
        A: 'Keyed. The erythrocyte is biconcave, so its centre is thinner and holds less haemoglobin — a pale disc about a third of the diameter across.',
        B: 'A monocyte is a large nucleated cell with a kidney-shaped nucleus and frosted-glass cytoplasm; nothing about it is centrally pale.',
        C: 'An eosinophil is packed edge to edge with coarse acidophilic granules.',
        D: 'A platelet is a small cell fragment with a pale hyalomere at the periphery and a granular chromomere in the centre — which is the exact reverse of a central pallor, and the reason it is offered here.',
      },
    },

    // ---- reticular cell ----------------------------------------------------
    {
      key: 'concerning-the-reticular-cells-the-followings-are-true-excep-bc90693e',
      conceptKey: 'reticular-cell-forms-the-stroma-and-turns-phagocytic',
      difficulty: 'Hard', questionType: 'Negative stem',
      learningObjective: 'Identify the false statement about the reticular cell, including which stain does not apply to it.',
      explanations: {
        A: 'True. Reticular cells lie in the stroma of spleen, lymph node and endocrine glands.',
        B: 'True: the reticular cell is a fibre-forming cell of the same family as the fibroblast, and both are grouped as connective-tissue-forming cells.',
        C: 'The exception. Iron haematoxylin is the stain for centrioles. What silver demonstrates around the reticular cell is its fibres, not the cell.',
        D: 'True. The reticular cell turns phagocytic when antigen stimulates it, and it presents antigen as well.',
      },
    },

    // ================= excluded ==============================================
    {
      key: 'nucleus-is-due-to-dna-rna-ff2f2e15',
      conceptKey: 'haematoxylin-and-eosin-basophilia-and-acidophilia',
      difficulty: 'Easy', questionType: 'Staining',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three options where the contract is four to five. The teaching survives in the concept and in `cytoplasm-of-ribosome-is-b531d7a0`, which asks the same rule about the cytoplasm with a full option set.',
    },
    {
      key: 'cytoplasm-of-rer-is-7fb32b7f',
      conceptKey: 'free-versus-attached-ribosomes-and-cytoplasmic-basophilia',
      difficulty: 'Easy', questionType: 'Staining',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three options where the contract is four to five. One of a set of three short rows printed together in the same book — rough endoplasmic reticulum, smooth endoplasmic reticulum, ribosome — of which only the ribosome row kept a fourth option.',
    },
    {
      key: 'cytoplasm-of-ser-is-8c46f480',
      conceptKey: 'free-versus-attached-ribosomes-and-cytoplasmic-basophilia',
      difficulty: 'Easy', questionType: 'Staining',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three options where the contract is four to five — the second of the three short staining rows printed together, and truncated the same way.',
    },
    {
      key: 'lishman-s-stain-is-5abe6459',
      conceptKey: 'stain-classes-neutral-vital-supravital-and-metachromatic',
      difficulty: 'Easy', questionType: 'Classification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three options where the contract is four to five, and a duplicate besides: `lishman-stain-is-1f2148f4` asks the same question in the same book with four options and a printed key. That is the copy imported.',
    },
    {
      key: 'by-best-s-carmine-stains-glycogen-granules-appears-18101c1a',
      conceptKey: 'pas-and-best-carmine-demonstrate-carbohydrate',
      difficulty: 'Easy', questionType: 'Stain choice',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three options where the contract is four to five. The colour it asks for — red — is stated in the concept and in `carbohydrates-are-stained-red-with-5278c6fa`, which survives intact.',
    },
    {
      key: 'pas-stain-is-used-to-demonstrate-all-of-the-following-except-039b8a94',
      conceptKey: 'pas-and-best-carmine-demonstrate-carbohydrate',
      difficulty: 'Moderate', questionType: 'Negative stem',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option A has been swallowed into the stem — the row reads "PAS stain is used to demonstrate all of the following except: a-Cell membrane" — leaving three filled options. A negative stem missing an option is the shape in which the missing option may itself have been the answer, and here the surviving exception (fat) is right for a reason worth teaching, so the item is worth rescanning rather than reconstructing.',
    },
    {
      key: 'goblet-cell-can-be-stained-by-9a3c3a95',
      conceptKey: 'pas-and-best-carmine-demonstrate-carbohydrate',
      difficulty: 'Easy', questionType: 'Stain choice',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three options where the contract is four to five. The teaching — the goblet cell\'s mucus is carbohydrate and so is PAS-positive — is carried by the concept and belongs in any case to the glandular epithelium leaf.',
    },
    {
      key: 'which-of-the-following-is-used-to-make-fat-visible-3b3ed7f4',
      conceptKey: 'fat-is-shown-by-sudan-and-only-on-a-frozen-section',
      difficulty: 'Easy', questionType: 'Stain choice',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option D — the correct one — has the page\'s printed answer key run into it, so it reads "Sudan Ill Key Answer | 8 8.1 Vee ee) 98 ‏لششتسا.ءن‎". Four options are filled and the emitter would accept the row, but the option a student would be shown is two lines of scanner noise attached to the right answer. The same question survives cleanly at `which-of-the-following-would-be-best-suited-to-visualize-lip-5681589f`.',
    },
    {
      key: 'centrioles-need-special-stains-to-be-viewed-under-the-lm-lik-1044436c',
      conceptKey: 'centriole-structure-and-role-in-cell-division',
      difficulty: 'Easy', questionType: 'Stain choice',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three options where the contract is four to five. The intact copy is `stain-used-for-centriole-e56e9242`, which offers four and carries the same answer.',
    },
    {
      key: 'to-demonstrate-the-golgi-apparatus-distinctly-they-need-534ed6f7',
      conceptKey: 'golgi-apparatus-lm-appearance-and-position',
      difficulty: 'Easy', questionType: 'Stain choice',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three options where the contract is four to five. `golgi-complex-could-be-stained-as-brown-granules-fibrils-by-704fe7f8` asks the same thing with four options and is the copy imported.',
    },
    {
      key: 'a-young-boy-with-unhealed-leg-wound-was-diagnosed-as-vitamin-6d6b314e',
      conceptKey: 'connective-tissue-fibre-stains-by-fibre-type',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option B — which is the answer, Mallory\'s trichrome — never reached the bank, leaving three options, and the stem itself has lost the letter C to a scanner mark ("diagnosed as vitamin © | deficiency"). The clean copy from the other book is `a-young-boy-with-unhealed-leg-wound-was-diagnosed-as-vitamin-bbc6ae4f`, which is the one imported.',
    },
    {
      key: 'after-staining-of-collagen-fibers-15de85ca',
      conceptKey: 'connective-tissue-fibre-stains-by-fibre-type',
      difficulty: 'Moderate', questionType: 'Stain choice',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three options where the contract is four to five, and the surviving set is internally inconsistent: A ("with H/E it appears pink") is true, B ("stained green with van gieson") is false — van Gieson reds collagen — and C is "all of the above", which cannot hold while B is false. The extracted answer A is right, but a rescan is needed to know what the fourth option said before this item is worth sitting.',
    },
    {
      key: 'matrix-18-elastic-fibers-are-characterized-by-being-80874871',
      conceptKey: 'collagen-versus-elastic-fibre-identification',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The stem is the tail of the previous question run into the number of this one — "Matrix. ‏ظ‎ ‎18. Elastic fibers are characterized by being:" — so what a student would be shown opens with a fragment of a different item. The four options are intact and the intended answer is D, orcein brown, but the question is asked cleanly at `elastic-fibers-are-characterized-by-being-df60ef40` and that copy is imported.',
    },
    {
      key: 'concerning-unilocular-adipocytes-i-370b161c',
      conceptKey: 'unilocular-versus-multilocular-adipocyte',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The damaged twin of `concerning-unilocular-adipocytes-they-1051d1be`. Same four options, but every one of them carries a stray rule mark from the page ("They are stained by Sudan Ill. :", "They are concemed with heat generation. ١") and the stem ends in a loose "i". The clean copy is imported.',
    },
    {
      key: 'among-the-characteristics-of-pericytes-ed77008a',
      conceptKey: 'undifferentiated-mesenchymal-cell-and-pericyte-are-the-stem-cells-of-connective-tissue',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option B has fused with option A — "Having a network of actin and myosin. _b. Being differentiated cells" — leaving three filled options. What is lost is one half of the discrimination the question is built on, since A is true of the pericyte and B is false of it, and they are now printed as one option.',
    },
    {
      key: 'basic-protein-b612b009',
      conceptKey: 'eosinophil-granule-contents-and-role-in-allergy',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three options where the contract is four to five, and the stem is a two-word fragment. What survives — "internam of eosinophils", "externum of eosinophils", "induces pores in parasites" — is an internum/externum distinction in the eosinophil granule that is not taught in the course material at all, so nothing here can be authored against an accepted source.',
    },
    {
      key: 'a-7-year-old-school-boy-has-a-blood-report-with-an-eosinophi-bcef3302',
      conceptKey: 'eosinophil-granule-contents-and-role-in-allergy',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option D has fused with option C — "Estimation of his bleeding time. _d. Sensitivity tests to different allergens" — leaving three filled options. The clean copy of the same vignette is `a7-year-old-school-boy-has-a-blood-report-with-an-eosinophil-3a9af4fe`, which is imported; the two books print it with different counts, nine per cent and six, and both are above the five per cent that defines eosinophilia.',
    },
    {
      key: 'lipofuscin-e-stains-glycogen-ssss-s-protects-from-ultraviole-4b0bb5d1',
      conceptKey: 'stain-classes-neutral-vital-supravital-and-metachromatic',
      difficulty: 'Easy', questionType: 'Matching',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Not a multiple-choice question. This is a matching exercise — a column of pigments and inclusions against a column of stains — that the extractor read as a stem with options, and both columns have been shredded by the scan ("Endogenous pigment in RBCS S.tronhaematoryin |e. Stainsfat SS SSSSSSSS~—S"). Matching is a different question format from the one this bank imports, so a rescan would not make it sittable here either.',
    },
    {
      key: 'the-stain-characteristic-for-the-cell-detected-in-the-previo-27435c6e',
      conceptKey: 'stain-classes-neutral-vital-supravital-and-metachromatic',
      difficulty: 'Moderate', questionType: 'Stain choice',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A follow-on stem whose case did not come with it. "The cell detected in the previous case" cannot be identified from anything in the row, and its four options — trypan blue, toluidine blue, silver, Sudan III — each name a different cell, so choosing between them would mean guessing which case was printed above it.',
    },
    {
      key: 'the-stain-characteristic-for-the-cell-detected-in-the-previo-7fc8427d',
      conceptKey: 'stain-classes-neutral-vital-supravital-and-metachromatic',
      difficulty: 'Moderate', questionType: 'Stain choice',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The same orphan follow-on as `the-stain-characteristic-for-the-cell-detected-in-the-previo-27435c6e`, printed in a second book, and worse: option B has fused with option A ("Trypan blue. ‏.مط‎ Toluidine blue."), leaving three.',
    },
    {
      key: 'cell-membrane-can-be-stained-by-12e975bd',
      conceptKey: 'plasma-membrane-unit-membrane-em-and-thickness',
      difficulty: 'Easy', questionType: 'Stain identification',
      learningObjective: 'Name the light-microscopic stain that shows the plasma membrane.',
      answerOverride: 'a',
      answerOverrideReason:
        'The 2021 paper printed no key and the highlight recovery does not cover that sitting, so the answer given here is not from a key: the plasma membrane is hard to see by light microscopy and needs silver or PAS. Silver — printed here as "AG.", the chemical symbol — is the only one of the four options named.',
      explanations: {
        a: 'Silver is one of the two stains for the plasma membrane, and it works on the carbohydrate of the cell coat rather than on the lipid bilayer.',
        b: 'Trypan blue, misprinted here as "Tryban", is a vital stain that the macrophage phagocytoses. It marks a whole cell by being eaten, not a membrane.',
        c: 'Iron haematoxylin stains mitochondria dark blue, and centrioles. It is a stain for organelles inside the cell.',
        d: 'Sudan III stains fat orange on a frozen section. The membrane is largely lipid, which is what makes this option tempting — but Sudan shows stored neutral fat in droplets, not the phospholipid of a bilayer.',
      },
    },
    {
      key: 'cell-membrane-can-be-stained-by-th-i-fo-g-histochemical-stai-64c1bb0b',
      conceptKey: 'plasma-membrane-unit-membrane-em-and-thickness',
      difficulty: 'Moderate', questionType: 'Stain identification',
      learningObjective: 'Name the histochemical stain that demonstrates the plasma membrane, and say what in the membrane it reacts with.',
      answerOverride: 'd',
      answerOverrideReason:
        'The highlight recovery reached this row on the 2022 script but could not resolve it — the record is ambiguous and low confidence, with no answer — so the answer given here is: silver and PAS are the two ways of showing the plasma membrane, and PAS is the histochemical one, reacting with the carbohydrate of the glycocalyx. Silver is not among these four options, which leaves PAS as the only candidate. The stem is peppered with scanner noise ("th : i ; Fo! g") but its sense — "by the following histochemical stain" — is intact.',
      explanations: {
        a: 'Sudan III is a fat stain and needs a frozen section, since the alcohols of ordinary processing dissolve the fat away. It is a lipid stain rather than a histochemical reaction.',
        b: 'Trypan blue is a vital stain for the macrophage, given to the living animal. Nothing about it is histochemical, and it demonstrates a cell rather than a membrane.',
        c: 'Brilliant cresyl blue is the supravital stain of the reticulocyte, showing the residual ribosomal RNA in an immature red cell. Wrong cell, wrong component, wrong class of stain.',
        d: 'The periodic acid–Schiff reaction is a histochemical test for carbohydrate, and the cell coat on the outer surface of the membrane is glycoprotein and glycolipid — which is why PAS reddens it.',
      },
    },
    {
      key: 'the-blood-count-of-a-patient-suffering-from-acute-tonsilliti-c5b06255',
      conceptKey: 'neutrophil-granules-and-first-line-defence',
      difficulty: 'Easy', questionType: 'Clinical application',
      learningObjective: 'Predict which leukocyte rises in an acute bacterial infection.',
      answerOverride: 'd',
      answerOverrideReason:
        'No key was printed on the 2021 paper and none was recovered for that sitting, so the answer given here is: neutrophils are the first line of non-specific defence, bacterial toxins attract them, and neutrophilia is defined as a count above 75%. Acute tonsillitis is an acute bacterial infection.',
      explanations: {
        a: 'Lymphocytes are the second line of defence and rise in chronic and in viral infection. The word in the stem doing the work is "acute".',
        b: 'Basophils are 0–1% of the count at the best of times, and they rise in allergy, not in infection. A cell that scarce cannot produce a noticeable rise in a differential count.',
        c: 'Eosinophils rise in allergy and in parasitic infestation — eosinophilia is above 5%. They terminate an allergic reaction rather than fighting bacteria.',
        d: 'Neutrophils are drawn to bacterial toxins, leave the blood by diapedesis and phagocytose the bacteria, so an acute pyogenic infection raises their percentage above 75%.',
      },
    },
    {
      key: 'cytoplasm-with-frosted-glass-appearance-is-a-feature-of-7b149473',
      conceptKey: 'monocyte-is-the-largest-leukocyte-and-becomes-the-macrophage',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Name the leukocyte whose cytoplasm is described as frosted glass, and say what gives it that look.',
      answerOverride: 'c',
      answerOverrideReason:
        'The 2021 paper carried no key and no highlight was recovered for it, so the answer given here is: monocytes have non-granular pale basophilic cytoplasm with a frosted-glass appearance due to lysosomes, the azurophil granules. No other cell is described this way.',
      explanations: {
        a: 'The eosinophil\'s cytoplasm is crowded with large acidophilic specific granules — the opposite of frosted glass, which is a haze without visible granules.',
        b: 'The neutrophil has numerous fine pale specific granules and is the closest wrong answer, since fine and pale is halfway to frosted. But the phrase is reserved for the monocyte, and the neutrophil\'s granules are specific granules rather than lysosomes.',
        c: 'The monocyte has no specific granules at all; its pale basophilic cytoplasm is hazed by azurophil granules, which are lysosomes, and that haze is the frosted-glass appearance.',
        d: 'The basophil\'s coarse granules are so dense that they obscure the nucleus itself. Nothing about it is faint.',
      },
    },
    {
      key: 'which-of-the-following-is-a-non-granu-neutrophil-d-eosinop-d961959a',
      conceptKey: 'leukocytes-are-granular-or-non-granular',
      difficulty: 'Easy', questionType: 'Classification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'The stem has been cut off mid-word and has swallowed two of the four options. The pen crossed the letters of options c and d on this 2022 script, so the row reads "Which of the following is a non-granu ¢. Neutrophil. d. Eosinop" — the word "non-granular" truncated, the question mark gone, and two options quoted inside the question — while the option list holds only a and b, against a contract of four to five. The recovered key resolves it to option a with medium confidence, and the lymphocyte and the monocyte are indeed the non-granular leukocytes, but a stem that states two of its own choices and stops in the middle of the word the question turns on cannot be sat. A rescan of page 4 of the 2022 paper needs to recover the end of the stem and the letters and text of options c and d.',
    },
    {
      key: 'iron-hematoxylin-stain-is-used-to-demonstrate-d3bc76f6',
      conceptKey: 'mitochondrion-ultrastructure-and-staining',
      difficulty: 'Easy', questionType: 'Stain identification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'The correct option has been absorbed into the one above it. The candidate\'s pen crossed the letter of option b on this 2020 script, so the bank holds option a as "Mitochondria & cell membrane. b Mitochondria & centrioles." — two rival options in one entry, the first false and the second true. Mitochondria are stained dark blue with iron haematoxylin, while the cell membrane takes silver and PAS instead, and the 2022 row `the-centrioles-can-be-stained-with` confirms that centrioles are the second structure. Choosing this entry would be choosing a right and a wrong answer at once. Recoverable by rescanning page 1 of the 2020 paper.',
    },
    {
      key: 'the-centrioles-can-be-stained-with-geen-76b2d775',
      conceptKey: 'centriole-structure-and-role-in-cell-division',
      difficulty: 'Easy', questionType: 'Stain identification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'The same failure as `iron-hematoxylin-stain-is-used-to-demonstrate`, in the other direction: the pen crossed the letter of option c on this 2022 script and the bank holds option b as "PAS. | .&..Itof.hematoxylin.", which is the false option PAS run together with "Iron haematoxylin", the true one. Iron haematoxylin is the answer — the two rows are the same fact asked from either end — but it exists here only inside a compound option, so the row cannot be sat. Recoverable by rescanning page 2 of the 2022 paper.',
    },
    {
      key: 'large-cell-with-singlemultilobed-dark-nucleus-basophilic-cyt-87930919',
      conceptKey: 'nucleus-shape-position-and-number-identify-the-cell',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'The answer is inside a compound option. The pen crossed the letter of option c on this 2022 script, so the bank holds option b as "Megakaryocyte. [ | Monocyte." The description of the megakaryocyte is word for word the stem — a very large cell with a single multilobed dark nucleus and basophilic cytoplasm — so the answer is the first half of that entry and the monocyte the rival second half. Recoverable by rescanning page 3 of the 2022 paper.',
    },
    {
      key: 'the-white-blood-cells-with-histamine-heparin-contating-gerd-1aa53f18',
      conceptKey: 'basophil-granule-contents-and-anaphylaxis',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'The correct option is not in the option set, and the recovered key disagrees with the known facts. The pen crossed the letter of option d on this 2022 script, so "Basophils" was read into the tail of the stem and only Neutrophils, Lymphocytes and Eosinophils survived as options. Histamine and heparin belong to the basophil and to the mast cell, while the eosinophil carries histaminase and sulphatase to destroy them — the opposite role. The recovered key nevertheless resolves to option c, Eosinophils; the evidence in `eom-answers.json` says why, and says not to trust it: only three of the four option boxes were found on the page, and the highlight overlaps box c by 13% of its area, so the mark almost certainly sits on the option whose box was lost. The conflict is recorded on the concept rather than resolved here. Recoverable by rescanning page 4 of the 2022 paper.',
    },
    {
      key: 'glycogen-in-the-liver-can-be-stained-by-3-i-i-6-it-btpas-je-3d38a0d9',
      conceptKey: 'pas-and-best-carmine-demonstrate-carbohydrate',
      difficulty: 'Easy', questionType: 'Stain identification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'The bank row has no options. All four option letters were crossed by the pen on this 2024 script and the options were read into the stem, where they survive as "BTPAS Je Siver Iron hematoxylin d. Sudan" — PAS, silver, iron haematoxylin and Sudan. Glycogen stains magenta red with PAS and red with Best\'s carmine, so PAS is the answer, but a question with an empty option map cannot be emitted. Recoverable by rescanning page 2 of the 2024 paper.',
    },
    {
      key: 'the-blood-cells-with-receptor-for-ise-are-i-basophits-pe-rbc-1882ece4',
      conceptKey: 'basophil-granule-contents-and-anaphylaxis',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'No options, and three questions have run together in one stem. After the pen crossed the option letters of question 38 on this 2024 script, its four options — Basophils, RBCs, Lymphocytes, Eosinophils — went into the stem, and questions 39 and 40 followed with their own stems and options. All three answers are known: basophils and mast cells carry the IgE receptor; the oval specific granule with an electron-dense core is the eosinophil\'s; and neutrophils increase, not decrease, in bacterial infection. None of them can be emitted from a row holding three questions and no options. Recoverable by rescanning page 4 of the 2024 paper, which would split it into three.',
    },
  ],
}
