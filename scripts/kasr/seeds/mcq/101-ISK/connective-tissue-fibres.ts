/**
 * `101 ISK > Histology > Connective Tissue > Connective Tissue Fibres` — the
 * question books' MCQs.
 *
 * Fifty-one rows, and the leaf is not what its name says. The extractor filed
 * a row here whenever the word "collagen" appeared anywhere in it, options
 * included, so alongside the fibre questions this leaf carries the basement
 * membrane (nine rows, because the basal lamina is type IV collagen), dense
 * regular and irregular connective tissue (four rows, because their bundles
 * are collagen), the fibroblast, the undifferentiated mesenchymal cell, the
 * phagocytic cell and one mast-cell row whose only connection to fibres is
 * that "Collagen" is a distractor in it.
 *
 * Those rows are authored here rather than dropped, and each takes the concept
 * its teaching actually belongs to — `basement-membrane-two-layers-and-what-fixes-the-epithelium-to-it`
 * from `polarity-and-membranous-specializations.ts`, `dense-white-fibrous-ct-regular-versus-irregular`
 * from `pectoral-region.ts`, `fibroblast-active-and-fibrocyte-inactive` from
 * `haemopoiesis.ts`. Every one of those is copied verbatim, key and definition
 * alike, so the emitter's merge-by-key adds this leaf's occurrences to a
 * concept that already exists rather than minting a rival for the same idea.
 * The concept keeps its own `modulePath`, which points at the leaf that
 * teaches it; only the question sits here.
 *
 * What the leaf does examine, once the borrowed rows are set aside, is a
 * table. The department book prints connective tissue fibres as a three-column
 * comparison — structure, synthesis, light microscopy, staining, characters,
 * functions — and a second table of collagen types I, II, III, IV and VII, and
 * the books ask down the columns of both. Nine rows are the collagen-type
 * table alone; the most common type is asked twice and the strongest once.
 *
 * Two concepts are reused from the practical batch rather than re-minted:
 * `collagen-versus-elastic-fibre-identification` and
 * `reticular-fibre-silver-identification`. They were written for slide
 * identification, and the MCQs ask the same discriminations in words. A third,
 * `connective-tissue-fibre-stains-by-fibre-type`, is new, because the books
 * ask a question the practical concepts do not answer — what van Gieson does
 * to each of the three fibres — and the whole stain table is the object being
 * examined, not any one fibre's appearance.
 *
 * Twelve rows are excluded. Seven lost options below the four the contract
 * requires; two are follow-on stems whose case never came with them; two are
 * damaged duplicates of clean rows kept here; one had elastic-fibre characters
 * bleed into it from the question printed beside it.
 *
 * Ten answers are overridden, every one of them because the source printed no
 * key at all. None of this leaf's extracted answers contradicts the department
 * book.
 *
 * Four rows from the sat end-of-module papers are added at the end, two live and
 * two excluded, with no recovered answers among them: both live answers are worked
 * from the department book's fibre-and-stain table and its collagen-type table and
 * say so. The two exclusions are 2024 rows off a ringed script — one lost the
 * option naming silver, the other reduced four Roman-numeral combinations to
 * unreadable fragments — and neither can be reconstructed without a rescan.
 */
import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Connective Tissue Fibres',
  modulePath: '101 ISK > Histology > Connective Tissue > Connective Tissue Fibres',
  articleId: 'ART-101-HIS-CONNECTIVE-TISSUE-FIBRES',

  concepts: [
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
      key: 'collagen-types-and-where-each-is-found',
      label: 'The collagen types are told apart by the form they take and the site they take it in, not by any difference visible in one fibre',
      definition:
        'The department book tabulates five collagens. Type I is arranged in bundles and is the commonest and strongest, found in connective tissue proper, tendon, bone and the capsules of organs, made by fibroblasts and osteoblasts. Type II is fine fibres in cartilage, made by chondroblasts. Type III is the reticular fibre, in the stroma of organs, made by fibroblasts, reticular cells and smooth muscle cells. Type IV is not fibrous at all but granular, in the basement membrane, made by the epithelial cells that rest on it. Type VII forms the anchoring fibrils of the basement membrane and is made by fibroblasts.',
      objective:
        'Name the collagen type of a named structure, and give the form — bundle, fine fibre, network, granule or anchoring fibril — that each type takes.',
      pitfall:
        'Assuming a higher number means a bigger fibre. The numbering records the order of discovery, and the two basement-membrane collagens, IV and VII, are the only two that are not fibres in the ordinary sense — IV is granular and VII is an anchoring fibril a fraction of a fibre\'s length.',
      subject: 'fnd', primary: 'DIS-HIS-T02', secondary: [],
      modulePath: '101 ISK > Histology > Connective Tissue > Connective Tissue Fibres',
      type: 'classification',
      aliases: ['Type I collagen', 'Type III collagen', 'Type IV collagen', 'Type VII collagen'],
    },
    {
      key: 'each-connective-tissue-fibre-does-one-mechanical-job',
      label: 'Collagen gives strength, elastic fibres give recoil, and reticular fibres give a supporting network — and a tissue is named for whichever it needs',
      definition:
        'There are three connective tissue fibres and no others; each is a protein polymerised into threads and each does one mechanical job. Collagen is the strongest and the most abundant fibre in the body, flexible but inelastic, and it resists stretching — which is why it makes tendon, and why it is the bulk of the dermis. Elastic fibres stretch and recoil, which is what a large artery such as the aorta needs; when they are lost the wall dilates, and that is the histology of an aneurysm. Reticular fibres branch and anastomose into a loose flexible network and support the cells of an organ, which is what stroma means.',
      objective:
        'Match each of the three fibres to the mechanical property it supplies, and predict which fibre a named tissue or lesion turns on.',
      pitfall:
        'Calling collagen elastic because it is flexible. Flexible and elastic are different properties: collagen bends but does not lengthen and spring back, and that is exactly the difference the aorta depends on.',
      subject: 'fnd', primary: 'DIS-HIS-T02', secondary: [],
      modulePath: '101 ISK > Histology > Connective Tissue > Connective Tissue Fibres',
      type: 'structure_function_relationship',
    },
    {
      key: 'scurvy-is-defective-collagen-synthesis',
      label: 'Bleeding gums, falling teeth and wounds that will not heal are collagen failing, and the cause is vitamin C deficiency',
      definition:
        'The department book states that vitamin C deficiency — scurvy — is due to defective collagen synthesis, and that it presents with unhealed wounds and bleeding gums. Collagen is the fibre of repair: the fibroblast becomes active in injury and lays it down, so when it cannot be made properly the wound stays open and the tissue holding teeth and vessel walls together fails. The book names one other collagen disorder in the same place, keloid, where healing goes the other way and collagen is deposited to excess in a skin scar.',
      objective: 'Recognise the clinical picture of defective collagen synthesis and name the vitamin whose deficiency causes it.',
      pitfall:
        'Reaching for elastin or reticulin because the presentation is bleeding. It is the collagen of the vessel wall and the gum that has failed; elastic and reticular fibres are unaffected in scurvy.',
      subject: 'fnd', primary: 'DIS-HIS-T02', secondary: [],
      modulePath: '101 ISK > Histology > Connective Tissue > Connective Tissue Fibres',
      type: 'clinical_correlation',
      aliases: ['Scurvy', 'Vitamin C deficiency', 'Keloid'],
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
      gaps: [
        'The lamina lucida and lamina densa subdivision of the basal lamina is asked by the question books but is not stated in the department book, which resolves the basement membrane into basal lamina and reticular lamina and stops there.',
      ],
    },
    {
      key: 'dense-white-fibrous-ct-regular-versus-irregular',
      label: 'Dense white fibrous connective tissue is regular when its collagen bundles run one way and irregular when they run in every direction',
      definition: 'Dense white fibrous connective tissue is packed with collagen bundles and holds few cells and little ground substance. It is regular when the bundles are parallel and the pull is in one direction — tendons, ligaments and aponeuroses — and irregular when the bundles interweave in different planes to resist pull from any direction, as in the dermis of the skin, the capsules of organs, the periosteum and perichondrium, and the stroma that surrounds the lobules of the mammary gland. Both are dense; the direction of the bundles is what separates them, and it follows from the direction of the force.',
      objective: 'Tell dense regular from dense irregular white fibrous connective tissue on a section and name a site of each.',
      pitfall: 'Reading "densely packed collagen with few cells" as regular. That much is true of both; the word that decides it is whether the bundles run one way or many, and a capsule or a gland stroma is surrounded from all sides and so is irregular.',
      subject: 'fnd', primary: 'DIS-HIS-T02', secondary: [],
      modulePath: '101 ISK > Histology > Connective Tissue > Types of Connective Tissue Proper',
      type: 'comparison',
    },
    {
      key: 'fibroblast-active-and-fibrocyte-inactive',
      label: 'The fibroblast is the active, protein-synthesising state of a fixed connective tissue cell, and the fibrocyte is its resting state',
      definition: 'The fibroblast is the commonest cell of connective tissue proper, arising from undifferentiated mesenchymal cells and pericytes, and it exists in two states. The active fibroblast is branched with long thin processes, deeply basophilic cytoplasm and a large pale oval nucleus with a prominent nucleolus; on electron microscopy it is a protein-synthesising cell, with well developed rough endoplasmic reticulum and Golgi, many mitochondria and a euchromatic nucleus. The inactive form, the fibrocyte, is a smaller spindle cell with few processes, paler cytoplasm, a small darker heterochromatic nucleus and much less rER, Golgi and mitochondria. It becomes active again for wound healing.',
      objective: 'Recognise the active fibroblast as the type example of a protein-synthesising cell and contrast it with the resting fibrocyte.',
      pitfall: 'Treating fibroblast and fibrocyte as two different cells. They are one cell in two states, and the suffix is the whole distinction: -blast is building, -cyte is resting.',
      subject: 'fnd', primary: 'DIS-HIS-T02', secondary: [],
      modulePath: '101 ISK > Histology > Connective Tissue > Connective Tissue Cells',
      type: 'structure_function_relationship',
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
      key: 'mast-cell-secretions-and-the-allergic-reaction',
      label: 'The mast cell secretes four things, and each one is a separate part of an allergic attack',
      definition:
        'The mast cell carries surface receptors for IgE, and when allergen binds them it discharges its granules. It secretes heparin, an anticoagulant that prevents clotting; histamine, which dilates vessels and raises their permeability; leukotrienes, which contract the smooth muscle of the bronchial tree and so cause the bronchospasm of asthma; and eosinophil chemotactic factor, which draws eosinophils to the allergic site. The department book adds that a massive discharge from mast cells causes anaphylactic shock, through vasodilatation and increased permeability severe enough to drop the blood pressure.',
      objective: 'Name the four mast cell secretions and give what each one does in an allergic reaction.',
      pitfall:
        'Attributing the whole reaction to histamine. Histamine gives the flare and the swelling, but it is the leukotrienes that close the airway, and heparin does nothing allergic at all — it is the anticoagulant that gives the granules their metachromasia.',
      subject: 'fnd', primary: 'DIS-HIS-T02', secondary: [],
      modulePath: '101 ISK > Histology > Connective Tissue > Connective Tissue Cells',
      type: 'structure_function_relationship',
      aliases: ['Heparin', 'Histamine', 'Leukotrienes', 'Eosinophil chemotactic factor'],
    },
  ],

  questions: [
    // --- The three fibres, told apart -------------------------------------
    {
      key: 'which-of-the-following-is-not-a-fiber-found-in-connective-ti-51c88921',
      conceptKey: 'each-connective-tissue-fibre-does-one-mechanical-job',
      difficulty: 'Easy', questionType: 'Classification',
      learningObjective: 'Name the three connective tissue fibres and reject a fibre that belongs to another tissue.',
      explanations: {
        A: 'One of the three. Collagen is the strongest and the most abundant.',
        B: 'One of the three. Elastic fibres are the ones that stretch and recoil.',
        C: 'One of the three. Reticular fibres are the branching network of an organ\'s stroma.',
        D: 'Correct — and not a connective tissue fibre at all. Purkinje fibres are modified cardiac muscle cells conducting the impulse through the ventricle; the word "fibre" in histology names a thread of protein in some places and a whole cell in others, and this option is built on that ambiguity.',
      },
    },
    {
      key: 'which-is-the-most-abundant-fiber-in-connective-tissue-c30a0366',
      conceptKey: 'each-connective-tissue-fibre-does-one-mechanical-job',
      difficulty: 'Easy', questionType: 'Recall',
      learningObjective: 'Name the commonest connective tissue fibre in the body.',
      explanations: {
        A: 'Correct. Collagen is the most abundant fibre in connective tissue and the most abundant protein in the body — tendon, dermis, bone matrix and organ capsules are all collagen.',
        B: 'Elastic fibres are abundant only where recoil is needed: the large arteries, the lung, the ligamenta flava. Everywhere else they are the minority fibre in a collagenous field.',
        C: 'Reticular fibres are fine and sparse by design — they are a delicate supporting mesh in the stroma of organs, not a bulk structural fibre.',
        D: 'Purkinje fibres are cardiac conducting cells, not connective tissue fibres at all.',
      },
    },
    {
      key: 'what-are-stretchable-flexible-ct-fibers-7654229a',
      conceptKey: 'each-connective-tissue-fibre-does-one-mechanical-job',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Attribute stretch and recoil to the elastic fibre and not to collagen.',
      explanations: {
        A: 'Type I collagen is flexible but inelastic — it bends freely and resists being lengthened, which is what makes a tendon transmit a muscle\'s pull without stretching.',
        B: 'Correct. Elastin lets the fibre stretch and spring back, which is why it is concentrated in the aorta, the lung and the skin.',
        C: 'Reticular fibres are described as a loose flexible supporting network. Flexible is not elastic: they bend with the organ but do not recoil.',
        D: 'Type III collagen is the reticular fibre under another name, so this option and C are the same answer — a sign that neither can be right.',
      },
    },
    {
      key: 'the-following-ct-fibers-can-branch-except-81b399b7',
      conceptKey: 'collagen-versus-elastic-fibre-identification',
      difficulty: 'Moderate', questionType: 'Negative stem',
      learningObjective: 'State which connective tissue fibres branch, and separate a branching bundle from a branching fibre.',
      explanations: {
        A: 'Correct, and the exception. The department book\'s wording is exact: collagen forms "wavy branching bundles formed of non-branching fibres". The bundle divides; the individual type I fibre inside it does not.',
        B: 'Elastic fibres branch, and freely — they run singly and anastomose into a network, which is one of the two characters that separates them from collagen in the same field.',
        C: 'Reticular fibres branch and anastomose; that is what makes them a network and what the word reticular means.',
        D: 'Type III collagen is the reticular fibre, so this option repeats C. It branches for the same reason.',
      },
    },
    {
      key: 'the-type-of-tissue-that-makes-up-the-bulk-of-the-dermis-is-892b76b9',
      conceptKey: 'each-connective-tissue-fibre-does-one-mechanical-job',
      difficulty: 'Easy', questionType: 'Site',
      learningObjective: 'Name the fibre that forms the bulk of the dermis.',
      explanations: {
        A: 'Correct. The dermis is dense irregular connective tissue, and its bulk is collagen bundles interweaving in every plane so that skin resists pull from any direction.',
        B: 'Melanin is a pigment made by melanocytes in the epidermis, not a connective tissue at all — and it is a granule, not a fibre.',
        C: 'Keratin is the intermediate filament protein of the epidermal keratinocyte, so it belongs to the layer above the dermis rather than to the dermis itself.',
        D: '"Fibroplastin" is not a substance in this module or in any other; it is built out of "fibroblast" to look plausible.',
      },
    },

    // --- Fibre stains -------------------------------------------------------
    {
      key: 'regarding-the-staining-the-following-are-true-except-a4ee11d4',
      conceptKey: 'connective-tissue-fibre-stains-by-fibre-type',
      difficulty: 'Moderate', questionType: 'Negative stem',
      learningObjective: 'Give the colour each fibre takes with its stain, and identify the fibre that H&E cannot show at all.',
      explanations: {
        A: 'True. Orcein browns elastic fibres, and that is the department book\'s stain for them.',
        B: 'Correct, and the exception. Reticular fibres are not visible in H&E; that invisibility is the whole reason silver impregnation exists for them, and PAS reddens them because of their sugar.',
        C: 'True. Collagen is acidophilic and takes eosin pink — this is what it looks like in every routine section.',
        D: 'True. Toluidine blue stains mast cell granules metachromatically purple, a different colour from the dye itself, because of their heparin.',
      },
    },
    {
      key: 'h-e-could-be-used-to-stain-d6496d7a',
      conceptKey: 'connective-tissue-fibre-stains-by-fibre-type',
      difficulty: 'Moderate', questionType: 'Stain choice',
      learningObjective: 'Say which of the three connective tissue fibres H&E shows and which it does not.',
      explanations: {
        A: 'Correct, and keyed. Collagen and elastic fibres are both acidophilic and both take eosin pink — which is why H&E cannot tell them apart by colour and the student must use bundling and outline instead.',
        B: 'Includes reticular fibres, and those are invisible in H&E. A pairing that contains the one fibre H&E misses cannot be the answer.',
        C: 'Same fault as B for the same reason: reticular fibres take no H&E colour.',
        D: '"All of the above" fails on reticular fibres alone. Two out of three is not all.',
      },
    },

    // --- Reticular fibres ---------------------------------------------------
    {
      key: 'regarding-reticular-fibers-505b1a07',
      conceptKey: 'reticular-fibre-silver-identification',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Give the collagen type of the reticular fibre and the two stains that demonstrate it.',
      explanations: {
        A: 'True on its own — reticular fibres are type III collagen — but the stem offers a combined option, so a single true statement is not yet the answer.',
        B: 'True on its own. Silver browns them, which is why they are called argyrophilic.',
        C: 'True on its own. PAS reddens them, because of the high sugar content that distinguishes type III from type I.',
        D: 'Correct, and keyed. All three statements hold together, and the reason they do is one fact: a sugar-rich type III collagen takes both a silver and a carbohydrate stain.',
      },
    },
    {
      key: 'reticular-fibers-are-dc055205',
      conceptKey: 'reticular-fibre-silver-identification',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Pick the true statement about reticular fibres from a set built out of collagen\'s characters.',
      explanations: {
        A: 'Bundles are collagen type I. Reticular fibres run as a fine anastomosing network — that is the difference between a rope and a net.',
        B: 'The opposite of the fibre on both counts. Reticular fibres are thin and they branch; thick and non-branching describes the individual type I collagen fibre.',
        C: 'Correct. Reticular fibres are type III collagen, and their sugar content is what makes them argyrophilic and PAS-positive.',
        D: 'Reticular fibres are collagen, and collagen has axial periodicity — the banding is the mark of the molecule, not of the fibre\'s calibre.',
      },
    },
    {
      key: 'concerning-the-reticular-fibers-3880308d',
      conceptKey: 'reticular-fibre-silver-identification',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Pick the true statement about reticular fibres, including who makes them and whether H&E shows them.',
      answerOverride: 'C',
      answerOverrideReason:
        'The source printed no key. C is the department book\'s own statement — reticular fibres are type III collagen — and each of the other three contradicts the book directly: they form a network rather than bundles, they are made by fibroblasts, reticular cells and smooth muscle cells rather than chondroblasts, and they are not visible in H&E.',
      explanations: {
        A: 'Bundles belong to type I collagen. The reticular fibre is a network, and the word reticular says so.',
        B: 'Chondroblasts make type II collagen, in cartilage. Reticular fibres come from fibroblasts, reticular cells and smooth muscle cells — the chondroblast is borrowed from the row above in the book\'s own table.',
        C: 'Correct. Reticular fibres are type III collagen; that identity is what explains both their staining and their fineness.',
        D: 'The single most reliable negative fact about this fibre: it is not visible in H&E, which is why silver was needed at all.',
      },
    },
    {
      key: 'the-stroma-of-the-organs-is-formed-by-d1808af0',
      conceptKey: 'reticular-fibre-silver-identification',
      difficulty: 'Easy', questionType: 'Site',
      learningObjective: 'Name the fibre that forms the supporting stroma of an organ.',
      explanations: {
        A: 'Collagen makes the capsule that surrounds an organ, not the delicate mesh inside it. Capsule and stroma are different jobs and different fibres.',
        B: 'Elastic fibres are found in organ stroma only where recoil is needed, as in lung; they are not what supports the parenchymal cells of spleen, lymph node and liver.',
        C: 'Correct. Reticular fibres branch and anastomose into a loose flexible network — the stroma — and the reticular cell that secretes them lives in it.',
        D: 'Muscle fibres are cells of a different basic tissue. Naming them here is the same ambiguity of "fibre" that the Purkinje distractor uses.',
      },
    },
    {
      key: 'reticular-fibers-are-composed-of-type-collagen-fibrils-39d9f941',
      conceptKey: 'collagen-types-and-where-each-is-found',
      difficulty: 'Easy', questionType: 'Recall',
      learningObjective: 'Give the collagen type of the reticular fibre.',
      explanations: {
        A: 'Type II is cartilage collagen, laid down by chondroblasts as fine fibres in the matrix.',
        B: 'Correct. Reticular fibres are type III collagen, and their high sugar content is what separates them from type I in staining.',
        C: 'Type IV is the granular collagen of the basal lamina, made by the epithelium — the only one of the five that is not fibrous.',
        D: 'Type V is not one of the five types this module tabulates; it is offered to see whether the number was memorised or the tissue was understood.',
      },
    },
    {
      key: 'reticular-fibers-are-formed-of-42f854b4',
      conceptKey: 'collagen-types-and-where-each-is-found',
      difficulty: 'Easy', questionType: 'Recall',
      learningObjective: 'Give the collagen type of the reticular fibre against a different distractor set.',
      explanations: {
        A: 'Type I is the bundled collagen of tendon, bone and dermis — the one a student names first because it is the commonest.',
        B: 'Correct. Type III is the reticular fibre.',
        C: 'Type V is outside the five types the department book tabulates.',
        D: 'Type IV is the basal lamina collagen, and granular rather than fibrous, so it cannot make a fibre of any sort.',
      },
    },

    // --- Collagen types -----------------------------------------------------
    {
      key: 'the-most-common-type-of-collagen-in-the-body-is-5b267bfb',
      conceptKey: 'collagen-types-and-where-each-is-found',
      difficulty: 'Easy', questionType: 'Recall',
      learningObjective: 'Name the commonest collagen type in the body.',
      explanations: {
        A: 'Correct. Type I is the collagen of connective tissue proper, tendon, bone and organ capsules, and those tissues are most of the body\'s bulk.',
        B: 'Type II is confined to cartilage, which is a small fraction of adult tissue.',
        C: 'Type III is the reticular fibre — fine and sparse, a supporting mesh rather than a bulk fibre.',
        D: 'Type IV is a granular component of basement membranes, which are microscopically thin sheets.',
      },
    },
    {
      key: 'the-most-common-type-of-collagen-is-2ec4433c',
      conceptKey: 'collagen-types-and-where-each-is-found',
      difficulty: 'Easy', questionType: 'Recall',
      learningObjective: 'Name the commonest collagen type against a distractor set drawn from the higher numbers.',
      explanations: {
        A: 'Correct. Type I, arranged in bundles, is the commonest collagen in the body.',
        B: 'Type III is reticular fibre — everywhere in organ stroma but never in bulk.',
        C: 'Type V is not among the types this module tabulates.',
        D: 'Type VI is not among them either; both C and D exist to reward the student who counted rather than the one who learned the table.',
      },
    },
    {
      key: 'the-strongest-type-of-collagen-is-95388597',
      conceptKey: 'collagen-types-and-where-each-is-found',
      difficulty: 'Easy', questionType: 'Recall',
      learningObjective: 'Name the strongest collagen type and connect its strength to the way it is arranged.',
      explanations: {
        A: 'Correct, and keyed. Type I is the strongest, and it is strongest because it is bundled — many parallel fibres sharing one line of pull, which is what a tendon is.',
        B: 'Type II is fine fibres dispersed in cartilage matrix; cartilage resists compression, and it does so through its ground substance rather than through fibre strength.',
        C: 'Type III forms a delicate anastomosing network built for support, not for load.',
        D: 'Type IV is granular and sits in a basement membrane a fraction of a micrometre thick.',
      },
    },
    {
      key: 'type-i-collagen-is-present-mainly-in-c3d3c17c',
      conceptKey: 'collagen-types-and-where-each-is-found',
      difficulty: 'Moderate', questionType: 'Site',
      learningObjective: 'Name the type of connective tissue in which type I collagen predominates.',
      explanations: {
        A: 'Reticular connective tissue is named for its type III fibres; that is what makes it reticular rather than collagenous.',
        B: 'Correct. Dense collagenous connective tissue — tendon, ligament, dermis, capsule — is bundled type I collagen and little else.',
        C: 'Mucoid connective tissue is jelly rich in hyaluronic acid with few fibres; Wharton\'s jelly of the umbilical cord is the example.',
        D: 'Yellow elastic connective tissue is named for its elastic fibres, which are elastin and not collagen at all.',
      },
    },
    {
      key: 'type-iv-collagen-is-in-the-form-of-6837ce2b',
      conceptKey: 'collagen-types-and-where-each-is-found',
      difficulty: 'Moderate', questionType: 'Recall',
      learningObjective: 'Give the form type IV collagen takes, and note that it is not a fibre.',
      explanations: {
        A: 'Correct, and keyed. The department book\'s table gives type IV as granular — a sheet of granules in the basal lamina, not a thread.',
        B: 'Fibrils are what type I and type III form. Reading "collagen" as "must be a fibre" is the whole trap of this question.',
        C: 'Fibres are the aggregate of fibrils; type IV never gets that far.',
        D: 'Bundles are type I, and bundling is exactly what makes type I strong. Type IV is in a basement membrane, which needs to filter rather than to pull.',
      },
    },
    {
      key: 'all-of-the-following-concerning-reticular-cells-is-true-exce-fbcfc401',
      conceptKey: 'collagen-types-and-where-each-is-found',
      difficulty: 'Moderate', questionType: 'Negative stem',
      learningObjective: 'Name the collagen the reticular cell secretes, and reject the type belonging to cartilage.',
      explanations: {
        A: 'True. The reticular cell secretes reticular fibres, and those are type III collagen.',
        B: 'Correct, and the exception. Type II collagen is cartilage collagen and comes from the chondroblast; the reticular cell never makes it.',
        C: 'True. Reticular cells lie in the stroma of spleen, lymph node and endocrine glands.',
        D: 'True. With their fibres the reticular cells form the supporting network of the organ, which is the definition of stroma.',
      },
    },

    // --- Basement membrane, filed here because of its collagens -------------
    {
      key: 'in-the-basal-lamina-of-the-epithelia-dd5ace05',
      conceptKey: 'basement-membrane-two-layers-and-what-fixes-the-epithelium-to-it',
      difficulty: 'Easy', questionType: 'Recall',
      learningObjective: 'Give the collagen type abundant in the basal lamina.',
      explanations: {
        A: 'Type I is the bundled collagen of tendon and dermis. It lies in the connective tissue below the basement membrane, not within the basal lamina.',
        B: 'Correct. The basal lamina is an electron-dense sheet of type IV collagen and glycoproteins, and the epithelium itself makes it.',
        C: 'Type II is cartilage collagen; there is no epithelium resting on cartilage matrix in this sense.',
        D: 'Type VII is present at the basement membrane but as anchoring fibrils tying it down to the connective tissue, not as the substance of the lamina.',
      },
    },
    {
      key: 'which-type-of-collagen-is-the-main-part-of-basal-lamina-74d02844',
      conceptKey: 'basement-membrane-two-layers-and-what-fixes-the-epithelium-to-it',
      difficulty: 'Easy', questionType: 'Recall',
      learningObjective: 'Name the main collagen of the basal lamina.',
      explanations: {
        A: 'Type I is the collagen of the connective tissue underneath, arranged in bundles.',
        B: 'Type II is cartilage.',
        C: 'Type III makes the reticular lamina, which is the other half of the basement membrane and the connective tissue\'s contribution.',
        D: 'Correct, and keyed. Type IV collagen is the main constituent of the basal lamina.',
      },
    },
    {
      key: 'which-type-of-collagen-is-a-component-of-the-basement-membra-3586de20',
      conceptKey: 'basement-membrane-two-layers-and-what-fixes-the-epithelium-to-it',
      difficulty: 'Easy', questionType: 'Recall',
      learningObjective: 'Name a collagen of the basement membrane from a set of four types.',
      answerOverride: 'B',
      answerOverrideReason:
        'The source printed no key. Type IV is the collagen of the basal lamina in the department book\'s own table, and none of the other three types offered — II, V or I — is a basement membrane component.',
      explanations: {
        A: 'Type II is the fine fibre of cartilage matrix, made by chondroblasts.',
        B: 'Correct. Type IV is the granular collagen of the basal lamina, made by the epithelial cells that sit on it.',
        C: 'Type V is not among the five collagens this module tabulates.',
        D: 'Type I is the bundled collagen of the connective tissue below; it is near the basement membrane but not in it.',
      },
    },
    {
      key: 'collagen-in-the-basal-lamina-323e4024',
      conceptKey: 'basement-membrane-two-layers-and-what-fixes-the-epithelium-to-it',
      difficulty: 'Hard', questionType: 'Recall',
      learningObjective: 'Give both the type and the form of the collagen in the basal lamina.',
      explanations: {
        A: 'Wrong type and wrong form. Type I is bundled collagen in the connective tissue proper.',
        B: 'Type III fibres are the reticular lamina, the connective-tissue half of the basement membrane, not the basal lamina.',
        C: 'The right type in the wrong form, and the option that catches most students. Type IV is correct, but in the basal lamina it is granular; it does not aggregate into fibres.',
        D: 'Correct, and keyed. Type IV, in granular form — the department book\'s table gives exactly this pairing.',
      },
    },
    {
      key: 'contain-collagen-fiber-type-iii-and-ground-substance-27504d3e',
      conceptKey: 'basement-membrane-two-layers-and-what-fixes-the-epithelium-to-it',
      difficulty: 'Moderate', questionType: 'Recall',
      learningObjective: 'Name the layer of the basement membrane made of type III collagen and ground substance.',
      explanations: {
        A: 'The basal lamina is type IV collagen and glycoproteins, and it is the epithelium\'s own product.',
        B: '"Epithelial component" is another name for the basal lamina, so this option is A restated — and it is wrong for the same reason.',
        C: 'Correct. The reticular lamina is the connective-tissue component: type III collagen, which is reticular fibre, together with ground substance.',
        D: 'Pairs two names for the same wrong layer.',
      },
    },
    {
      key: 'electron-dense-sheat-formed-of-collagen-iv-lamins-1c453938',
      conceptKey: 'basement-membrane-two-layers-and-what-fixes-the-epithelium-to-it',
      difficulty: 'Moderate', questionType: 'Recall',
      learningObjective: 'Recognise that the basal lamina and the epithelial component of the basement membrane are one and the same layer.',
      explanations: {
        A: 'True as far as it goes — the basal lamina is the electron-dense sheet of type IV collagen and laminin — but the stem allows a combined option, and B is equally true.',
        B: 'True as far as it goes. The epithelial component of the basement membrane is precisely the basal lamina.',
        C: 'The reticular lamina is the connective-tissue component and is type III collagen, so it is neither electron-dense in this sense nor made of type IV.',
        D: 'Correct. A and B name one layer under two names, so both are right and the combined option is the answer.',
      },
    },
    {
      key: 'anchoring-fibers-that-fix-basement-membrane-to-c-t-are-forme-752f8538',
      conceptKey: 'basement-membrane-two-layers-and-what-fixes-the-epithelium-to-it',
      difficulty: 'Moderate', questionType: 'Recall',
      learningObjective: 'Give the collagen type of the anchoring fibrils of the basement membrane.',
      answerOverride: 'D',
      answerOverrideReason:
        'The source printed no key. The department book\'s collagen table names type VII as anchoring fibres in basement membranes, made by fibroblasts, and gives no other type that role.',
      explanations: {
        A: 'Type I is bundled collagen of the connective tissue; it is what the anchoring fibrils tie the membrane down to, not the fibrils themselves.',
        B: 'Type II is cartilage collagen and plays no part in a basement membrane.',
        C: 'Reticular fibres — type III — make the reticular lamina, which is a layer of the membrane rather than the tether that anchors it.',
        D: 'Correct. Type VII collagen forms the anchoring fibrils.',
      },
    },
    {
      key: 'both-lamina-of-basement-membrane-attached-to-c-t-by-4a62f99d',
      conceptKey: 'basement-membrane-two-layers-and-what-fixes-the-epithelium-to-it',
      difficulty: 'Hard', questionType: 'Recall',
      learningObjective: 'Name what attaches the basement membrane to the underlying connective tissue.',
      explanations: {
        A: 'Type IV collagen is what the basal lamina is made of, not what fastens it down.',
        B: 'Type III collagen is the reticular lamina itself — one of the two laminae the stem is asking about, so it cannot be the attachment.',
        C: 'True on its own: type VII collagen is the anchoring collagen. But the stem offers a combined option.',
        D: 'True on its own: the anchoring fibril is the structure. C and D are the same thing named as a molecule and as a structure.',
        E: 'Correct. C and D together — type VII collagen in the form of anchoring fibrils is what attaches the basement membrane to the connective tissue.',
      },
    },
    {
      key: 'regarding-the-basement-membrane-choose-the-correct-statement-b4a979a7',
      conceptKey: 'basement-membrane-two-layers-and-what-fixes-the-epithelium-to-it',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Pick the true statement about the two laminae, their collagens and the stain that shows the membrane.',
      explanations: {
        A: 'False on the central fact of the layer. The basal lamina is largely type IV collagen; saying it has none contradicts every account of it.',
        B: 'Correct, and keyed. The reticular lamina is the connective-tissue component — reticular fibres, which are type III collagen, plus ground substance.',
        C: 'Janus green is the vital stain for mitochondria. The basement membrane is shown with PAS or with silver, both of which act on its carbohydrate.',
        D: 'The anchoring fibres are type VII, not type I. Type I is the bundled collagen of the connective tissue underneath.',
      },
    },

    // --- Dense connective tissue, filed here because its bundles are collagen
    {
      key: 'dense-regular-collagenous-connective-tissue-is-present-in-fb1b4638',
      conceptKey: 'dense-white-fibrous-ct-regular-versus-irregular',
      difficulty: 'Easy', questionType: 'Site',
      learningObjective: 'Name a site of dense regular collagenous connective tissue.',
      explanations: {
        A: 'Correct. A tendon transmits pull along one line, so its collagen bundles all run that way — the definition of regular.',
        B: 'The umbilical cord is mucoid connective tissue, Wharton\'s jelly, which is ground substance rich in hyaluronic acid with few fibres.',
        C: 'The aorta is yellow elastic connective tissue; it needs recoil, not tensile strength in one direction.',
        D: 'A capsule is pulled on from every side, so its bundles interweave — that makes it dense irregular, not regular.',
      },
    },
    {
      key: 'dense-irregular-collagenous-connective-tissue-is-present-in-7159a865',
      conceptKey: 'dense-white-fibrous-ct-regular-versus-irregular',
      difficulty: 'Easy', questionType: 'Site',
      learningObjective: 'Name a site of dense irregular collagenous connective tissue.',
      explanations: {
        A: 'A tendon is the type example of the regular form: parallel bundles, one direction of pull.',
        B: 'The umbilical cord is mucoid connective tissue, not dense at all.',
        C: 'The aorta is yellow elastic connective tissue.',
        D: 'Correct. An organ capsule is stressed from all directions, so its collagen bundles interweave in different planes — dense irregular.',
      },
    },
    {
      key: 'regarding-dense-irregular-connective-tissue-8-dr-dalia-el-ma-ea84f928',
      conceptKey: 'dense-white-fibrous-ct-regular-versus-irregular',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Say what dense irregular connective tissue is rich in and what it is poor in.',
      explanations: {
        A: 'Dense connective tissue is comparatively poorly vascular; it is packed with fibre, and vessels have little room in it.',
        B: 'Dense means few cells. Cellularity is a feature of loose areolar tissue, which holds every connective tissue cell type there is.',
        C: 'Correct, and keyed. Collagen is the main fibre of dense white fibrous connective tissue in both its regular and irregular forms.',
        D: 'Little ground substance, not a large amount. A large amount of ground substance describes mucoid connective tissue instead.',
      },
    },
    {
      key: 'dense-regular-c-t-is-of-two-types-206de674',
      conceptKey: 'dense-white-fibrous-ct-regular-versus-irregular',
      difficulty: 'Moderate', questionType: 'Classification',
      learningObjective: 'Name the two fibres that give dense regular connective tissue its two forms.',
      explanations: {
        A: 'Correct. Dense regular tissue comes in a white fibrous form, whose parallel bundles are collagen and which makes tendons and ligaments, and a yellow elastic form, whose parallel fibres are elastin and which makes the ligamenta flava and the vocal ligament.',
        B: 'Reticular fibres never form a dense regular tissue; they make a loose anastomosing stroma, which is the opposite arrangement.',
        C: 'Pairs elastic with reticular and so drops collagen, which is the commoner of the two dense regular forms.',
        D: '"None of the above" is only defensible if A is wrong, and A is the department book\'s own division.',
      },
    },

    // --- Cells that were filed here by a collagen distractor ----------------
    {
      key: 'one-of-the-following-is-true-about-fibroblasts-e2894a0e',
      conceptKey: 'fibroblast-active-and-fibrocyte-inactive',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'State what the fibroblast makes, and separate it from the pericyte and the fat cell.',
      explanations: {
        A: 'That is the pericyte. The perivascular stem cell around a capillary divides into endothelium, fibroblasts and smooth muscle; the fibroblast is one of its products, not another stem cell.',
        B: 'Correct, and keyed. The fibroblast synthesises the connective tissue fibres — collagen, elastic and reticular — and the ground substance they lie in.',
        C: 'The active fibroblast is branched with long thin processes, and the inactive fibrocyte is spindle-shaped. Neither is large and cubical; cubical is an epithelial shape.',
        D: 'Fat storage is the adipocyte\'s work. Both cells descend from the undifferentiated mesenchymal cell, which is why the two are confused.',
      },
    },
    {
      key: 'one-of-the-functions-of-undifferentiated-mesenchymal-cells-i-de37d63f',
      conceptKey: 'undifferentiated-mesenchymal-cell-and-pericyte-are-the-stem-cells-of-connective-tissue',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Say what the undifferentiated mesenchymal cell does, as against what the cells it becomes do.',
      answerOverride: 'B',
      answerOverrideReason:
        'The source printed no key. The department book gives the undifferentiated mesenchymal cell as a life-long source of cells in certain adult sites and names bone marrow, for blood cells, as one of them. The other three options are the work of the fibroblast the mesenchymal cell differentiates into, not of the stem cell itself.',
      explanations: {
        A: 'Collagen is laid down by the fibroblast. The mesenchymal cell\'s contribution is to become that fibroblast.',
        B: 'Correct. In bone marrow the undifferentiated mesenchymal cell is the life-long source of the blood cells — the book\'s own example of why the cell stays undifferentiated into adult life.',
        C: 'Ground substance, like fibre, is a fibroblast product.',
        D: 'Elastic fibres are made by fibroblasts, chondroblasts and smooth muscle cells; the stem cell makes none of them directly.',
      },
    },
    {
      key: 'prevent-clotting-promote-allergy-527c340a',
      conceptKey: 'mast-cell-secretions-and-the-allergic-reaction',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the mast cell secretion that is an anticoagulant.',
      explanations: {
        A: 'Histamine is the mast cell\'s vasodilator and permeability agent — it gives the flare and the swelling of an allergic reaction, but it does not touch clotting.',
        B: 'Collagen is a fibre, not a secretion of this kind; it is here because the extraction filed this row under fibres for exactly that word.',
        C: 'Correct. Heparin is the anticoagulant of the mast cell granule, and it is also what makes the granule metachromatic with toluidine blue.',
        D: '"Sulfate" names a chemical group rather than a secretion; heparin is itself a sulphated glycosaminoglycan, which is why the group sounds familiar.',
      },
    },

    // --- Clinical ----------------------------------------------------------
    {
      key: 'a-young-child-was-suffering-from-bleeding-gums-and-non-heali-67086f17',
      conceptKey: 'scurvy-is-defective-collagen-synthesis',
      difficulty: 'Easy', questionType: 'Clinical application',
      learningObjective: 'Name the fibre whose defective synthesis gives bleeding gums and unhealed wounds.',
      explanations: {
        A: 'The extracellular matrix is the whole ground substance and fibre together. The defect in scurvy is specific to one component of it, and naming the whole matrix does not identify it.',
        B: 'Correct, and keyed. Vitamin C deficiency blocks collagen synthesis, and the wound that will not close and the gum that bleeds are collagen failing.',
        C: 'Reticular fibres are type III collagen and are not the fibre of wound repair; scar tissue is type I.',
        D: 'Elastic fibres are unaffected in scurvy. A student picks them because bleeding suggests vessels, and vessels suggest elasticity.',
      },
    },
    {
      key: 'a-46-year-old-woman-was-suffering-from-repeated-bleeding-gum-60da1a74',
      conceptKey: 'scurvy-is-defective-collagen-synthesis',
      difficulty: 'Easy', questionType: 'Clinical application',
      learningObjective: 'Name the molecule whose defective synthesis causes scurvy, when the diagnosis is given in the stem.',
      answerOverride: 'A',
      answerOverrideReason:
        'The source printed no key. The department book states directly that vitamin C deficiency — scurvy — is due to defective collagen synthesis, and none of the other three molecules is implicated in it.',
      explanations: {
        A: 'Correct. Scurvy is defective collagen synthesis, and this stem hands the student the diagnosis and asks only for the molecule.',
        B: 'Elastin is unaffected. Its failure gives loss of recoil in arteries and skin, not bleeding gums.',
        C: 'Reticulin is type III collagen and is not the fibre of repair.',
        D: 'Glycoprotein is a component of ground substance and of the basal lamina; scurvy is a fibre disease, not a ground substance one.',
      },
    },
    {
      key: 'a-68-year-old-man-presented-with-a-two-week-history-of-abdom-fa9d53af',
      conceptKey: 'each-connective-tissue-fibre-does-one-mechanical-job',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Name the fibre whose loss allows an artery to dilate into an aneurysm.',
      answerOverride: 'B',
      answerOverrideReason:
        'The source printed no key. An aneurysm is a dilated arterial segment, and the aorta is yellow elastic connective tissue whose recoil comes from its elastic fibres; losing them lets the wall stretch and stay stretched. None of the other three components supplies recoil.',
      explanations: {
        A: 'Collagen resists stretching but does not recoil, and in a degenerating aortic wall it is often increased rather than lost — it is the scarring, not the failure.',
        B: 'Correct. The aorta\'s wall is packed with elastic laminae; when they are destroyed the vessel dilates and cannot spring back, which is what a CT scan shows as an aneurysm.',
        C: 'Reticular fibres support the cells of an organ\'s stroma; they carry no part of the pressure in a great vessel.',
        D: 'Smooth muscle loss does contribute to a weak arterial wall, and this is the most defensible distractor — but the stem asks what was lost on examining the dilated part, and it is the elastic lamina whose destruction defines the lesion.',
      },
    },

    // --- Excluded ----------------------------------------------------------
    {
      key: 'a-46-year-old-woman-was-suffering-from-repeated-bleeding-gum-cd3cb684',
      conceptKey: 'scurvy-is-defective-collagen-synthesis',
      difficulty: 'Easy', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A second copy of `a-46-year-old-woman-was-suffering-from-repeated-bleeding-gum-60da1a74` from a different book, with the same stem and the same four options and a stray rule mark left in option B ("Elastin molecules |"). The cleaner copy is imported. Kept here so that a rescan knows this row is a duplicate rather than a separate question and does not author it twice.',
    },
    {
      key: 'a-68-year-old-man-presented-with-a-two-week-history-of-abdom-e1bdc17d',
      conceptKey: 'each-connective-tissue-fibre-does-one-mechanical-job',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The damaged twin of `a-68-year-old-man-presented-with-a-two-week-history-of-abdom-fa9d53af`. Its stem has lost words in the middle — "demonstrated loss _of which of the following com contributed In development of this aneurysm" — so the question no longer parses, and option A reads "Collagen |". The clean copy carries the same four options and is the one imported.',
    },
    {
      key: 'scurvy-is-due-to-defective-synthesis-of-f7bf24bb',
      conceptKey: 'scurvy-is-defective-collagen-synthesis',
      difficulty: 'Easy', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Half the option set belongs to a different question. A and B are molecules — collagen and elastin — and C and D are elastic fibre characters, "Flexible but inelastic" and "Stained brown by orcein stain", carried over from the question printed beside it on the page. A four-option row where two options answer a different stem cannot be sat. The teaching survives in `a-46-year-old-woman-was-suffering-from-repeated-bleeding-gum-60da1a74`.',
    },
    {
      key: 'the-cell-involved-in-the-previous-condition-produces-09ca2177',
      conceptKey: 'scurvy-is-defective-collagen-synthesis',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A follow-on stem whose case did not come with it. "The cell involved in the previous condition" cannot be answered without the previous condition, and the bank holds no row that can be shown to be it. Its four options — antibodies, histamine, collagen, reticular fibres — each belong to a different cell, so guessing which case was meant would be inventing the question.',
    },
    {
      key: 'this-delicate-stromal-fibers-described-above-are-composed-pr-27ea2c8d',
      conceptKey: 'reticular-fibre-silver-identification',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The same fault as `the-cell-involved-in-the-previous-condition-produces`: a follow-on item pointing at fibres "described above" in a vignette the bank does not carry. The words left in the stem — delicate, stromal — do determine the answer, but importing a question that refers a student to text that is not there teaches them that the paper is broken rather than that the fibre is reticular.',
    },
    {
      key: 'a17-year-old-boy-presented-with-fever-yellow-red-crusts-over-368abbbb',
      conceptKey: 'each-connective-tissue-fibre-does-one-mechanical-job',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option C is missing from the extraction — the row runs A, B, D — leaving three filled options where the contract is four to five. The gap matters here: the answer to "which connective tissue component acts as a barrier against the spread of infection" is the ground substance, which survives as D, but with an option absent there is no way to know the missing one was not a better answer.',
    },
    {
      key: 'the-basal-lamina-is-formed-of-721e368d',
      conceptKey: 'basement-membrane-two-layers-and-what-fixes-the-epithelium-to-it',
      difficulty: 'Easy', questionType: 'Recall',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three options where the contract is four to five. The question is intact and asked better at `which-type-of-collagen-is-the-main-part-of-basal-lamina-74d02844`, which offers four types and carries a key.',
    },
    {
      key: 'the-reticular-lamina-is-formed-of-f580d048',
      conceptKey: 'basement-membrane-two-layers-and-what-fixes-the-epithelium-to-it',
      difficulty: 'Easy', questionType: 'Recall',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three options where the contract is four to five — the companion row to `the-basal-lamina-is-formed-of-721e368d`, printed as a pair on the same page and truncated the same way. The teaching survives at `contain-collagen-fiber-type-iii-and-ground-substance-27504d3e`.',
    },
    {
      key: 'the-following-are-found-in-basal-lamina-except-e4866915',
      conceptKey: 'basement-membrane-two-layers-and-what-fixes-the-epithelium-to-it',
      difficulty: 'Moderate', questionType: 'Negative stem',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three options only. What survives — laminin, collagen type II, collagen type IV — does contain the intended exception, but a negative stem with one option missing is the one shape where the missing option could itself have been the answer, and nothing in the row rules that out.',
    },
    {
      key: 'the-followings-are-the-functions-of-phagocytic-cells-except-19600dcf',
      conceptKey: 'fibroblast-active-and-fibrocyte-inactive',
      difficulty: 'Easy', questionType: 'Negative stem',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three options where the contract is four to five. It is also not a fibre question — it belongs with the macrophage — and it reached this leaf only because "Collagen secretion" is one of its three surviving options.',
    },
    {
      key: 'which-type-of-ct-fibers-is-stained-by-silver-7a48bbd1',
      conceptKey: 'reticular-fibre-silver-identification',
      difficulty: 'Easy', questionType: 'Stain choice',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three options where the contract is four to five. The same question with a full option set is asked in the Microtechniques leaf as `which-of-the-following-would-be-best-suited-to-visualize-ret-61151fde`, and that is the copy imported.',
    },
    {
      key: 'the-type-of-tissue-that-makes-up-the-bulk-of-the-dermis-is-c-32f7d777',
      conceptKey: 'each-connective-tissue-fibre-does-one-mechanical-job',
      difficulty: 'Easy', questionType: 'Site',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Two filled options. The correct one has been swallowed into the stem — the row ends "the bulk of the dermis is: @ Collagen" — and option C never reached the bank at all. The intact copy is `the-type-of-tissue-that-makes-up-the-bulk-of-the-dermis-is-892b76b9`, which is the one imported.',
    },
    {
      key: 'one-of-the-functi-of-undifferentiated-hymal-cells-is-8224e9fb',
      conceptKey: 'undifferentiated-mesenchymal-cell-and-pericyte-are-the-stem-cells-of-connective-tissue',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The damaged twin of `one-of-the-functions-of-undifferentiated-mesenchymal-cells-i-de37d63f`. Its stem has lost two words to the scan — "One of the functi of undifferentiated hymal cells is" — and although the four options are intact, a stem missing the name of the cell it asks about is not sittable. The clean copy is imported.',
    },
    {
      key: 'in-basement-membrane-a-major-component-of-basal-lamina-is-97048613',
      conceptKey: 'basement-membrane-two-layers-and-what-fixes-the-epithelium-to-it',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Name the collagen type that makes up the basal lamina, and separate it from the types in the reticular lamina and the anchoring fibrils.',
      answerOverride: 'a',
      answerOverrideReason:
        'The 2021 paper printed no key and the highlight recovery does not cover that sitting, so the answer comes from the department book, not from a key: it gives the basal lamina as an electron-dense sheet of type IV collagen granules and glycoproteins made by the epithelial cells, and its collagen table lists type IV in granular form in the basement membrane. The three distractors are the three other collagen types the same table names.',
      explanations: {
        a: 'Correct. Type IV collagen is granular rather than fibrillar, is secreted by the epithelial cells themselves, and is the collagen of the basal lamina — the epithelial half of the basement membrane.',
        b: 'Type III collagen is the reticular fibre, and it is in the basement membrane — but in the reticular lamina, the connective tissue half. This option is right about the membrane and wrong about the layer, which is exactly the distinction the stem asks for.',
        c: 'Type I collagen is the ordinary collagen bundle of connective tissue proper, tendon, bone and organ capsules. It is nowhere in the basement membrane.',
        d: 'Type VII collagen is in the basement membrane too, as the anchoring fibrils that tie it to the underlying connective tissue. It fixes the membrane down rather than forming the lamina, so like option b it is a real component in the wrong role.',
      },
    },
    {
      key: 'the-c-t-fibers-stained-brown-with-orc-in-are-ottttteeudeeeee-76c56217',
      conceptKey: 'connective-tissue-fibre-stains-by-fibre-type',
      difficulty: 'Easy', questionType: 'Stain identification',
      learningObjective: 'Name the fibre orcein browns, and keep it apart from the fibre silver browns.',
      answerOverride: 'b',
      answerOverrideReason:
        'No key was printed on the 2022 paper and none was recovered for this row, so the answer comes from the department book\'s fibre-and-stain table: elastic fibres are pink with eosin, brown with orcein and yellow with van Gieson, while it is silver, not orcein, that browns reticular fibres. The stem carries scanner noise where the blank was ("ottttteeudeeeeeees") but is otherwise intact.',
      explanations: {
        a: 'Reticular fibres are also stained brown — but by silver, not orcein, and the two browns are the trap this option sets. Reticular fibres are invisible in H&E and take PAS red as well, because of their sugar content.',
        b: 'Correct. Orcein is the elastic fibre stain and turns them brown; the book pairs it with van Gieson, which turns the same fibres yellow.',
        c: 'Collagen is pink with eosin, blue with Mallory and red with van Gieson. Orcein is not in its row at all.',
        d: '"b and c" would require orcein to brown collagen as well as elastic fibres. It does not, and van Gieson is the stain that shows both fibres in one section — in two different colours, red and yellow, which is the point of using it.',
      },
    },
    {
      key: 'reticular-fibers-can-be-specially-stained-with-mee-van-gieso-5439519b',
      conceptKey: 'reticular-fibre-silver-identification',
      difficulty: 'Easy', questionType: 'Stain identification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'The bank row has no options, and the first of the four is illegible in the stem as well. This is a 2024 row off a ringed script: the pen crossed the option letters and the options were read into the stem, which now reads "\\ Mee - Van Gieson fe PAS 9 Oreein" — three of the four recoverable as Van Gieson, PAS and orcein, and the first reduced to a stray backslash and "Mee". The department book makes silver the special stain of the reticular fibre, so the lost option is almost certainly silver, but "almost certainly" is not a basis for authoring an answer nobody can see. Recoverable by rescanning page 2 of the 2024 paper.',
    },
    {
      key: 'basement-membrane-shows-the-following-types-of-collagen-zf-i-aad62df4',
      conceptKey: 'collagen-types-and-where-each-is-found',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'No options, and what reached the stem in their place is unreadable: "ZF iit avi ABA AMLRIV ZN. Vail AGA, ML & IV". These were four combinations of Roman numerals on the 2024 paper and the pen through their letters left the extractor with numeral fragments it could not resolve — "AMLRIV" and "AGA, ML & IV" are the same option list read two different ways. The department book gives the basement membrane types III, IV and VII, so the intended answer is recoverable in principle, but no option string here can be trusted to say so. Recoverable only by rescanning page 3 of the 2024 paper.',
    },
    {
      key: 'the-reticular-connective-tissue-can-be-demonstrated-with-3a8d865b',
      conceptKey: 'reticular-fibre-silver-identification',
      difficulty: 'Easy', questionType: 'Stain identification',
      learningObjective: 'Name the stain that shows reticular tissue and say why H&E does not.',
      answerOverride: 'b',
      answerOverrideReason:
        'One of the strays the extractor could not file to a leaf; it is authored here because the answer is the reticular fibre\'s stain. The 2021 paper printed no key and the highlight recovery does not cover that sitting, so the answer comes from the department book: reticular fibres are not visible in H&E and are stained brown by silver, and its chapter on the types of connective tissue proper says reticular connective tissue is stained brown-black by silver.',
      explanations: {
        a: 'Toluidine blue is the metachromatic stain of the mast cell and the blood basophil, acting on the heparin in their granules. It shows a cell, not a fibre network.',
        b: 'Correct. Reticular fibres are argyrophilic — silver-loving — and silver blackens them, which is the only way to see the stroma of a lymph node, spleen or liver as a network.',
        c: 'H&E is the option that makes the question worth asking: the department book says outright that reticular fibres are not visible in it, which is why a special stain is needed at all.',
        d: 'Sudan III stains fat orange and needs a frozen section. It identifies the adipocyte, the tissue reticular fibres also support but are not made of.',
      },
    },
  ],
}
