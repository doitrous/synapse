/**
 * `101 ISK > Histology > Connective Tissue > Types of Connective Tissue Proper`
 * — the question books' MCQs.
 *
 * Nineteen rows, fourteen sittable. Four of the five exclusions lost an option
 * to the scan, and one — "The most common type of connective tissue (C.T.) Is"
 * — lost the option that was the answer, which its intact twin still holds.
 * The fifth is not a question at all: the extractor caught a matching table and
 * its answer key running together across a page break.
 *
 * The leaf's two adipose questions about ageing are a matched pair — one asks
 * what decreases, one what increases — and they are kept as a pair, because a
 * student who has learnt that brown fat is a newborn's tissue should be able to
 * answer both and a student who has only memorised one answer should not.
 *
 * Two rows from the sat end-of-module papers are added at the end, both live. The
 * tendon row is one of the few in the histology half of this batch whose answer was
 * recovered from a marked script — high confidence, and agreeing with the
 * department book — and the loose areolar row is worked from the book, which says
 * the tissue is found everywhere in the body except the brain.
 * `dense-white-fibrous-ct-regular-versus-irregular` is copied verbatim from
 * `connective-tissue-cells.ts`, where it is minted.
 */
import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Types of Connective Tissue Proper',
  modulePath: '101 ISK > Histology > Connective Tissue > Types of Connective Tissue Proper',
  articleId: 'ART-101-HIS-TYPES-OF-CONNECTIVE-TISSUE',

  concepts: [
    {
      key: 'loose-areolar-ct-is-the-commonest-and-holds-every-cell-and-fibre',
      label: 'Loose areolar connective tissue is the commonest type and the only one containing every connective tissue cell and every fibre',
      definition: 'Loose areolar connective tissue is the most common and most widespread type of connective tissue proper. It contains all the types of connective tissue cell and all three types of fibre — mainly collagen bundles — with the most abundant ground substance of any type. It is called loose because of the areolae, potential cavities in it that can hold large amounts of fluid or gas, and it is flexible and well vascularised.',
      objective: 'Identify loose areolar connective tissue as the commonest type and name what makes it loose and complete.',
      pitfall: 'Assuming a tissue full of fibres must be the commonest. Density is the opposite of what defines this one: it is loose precisely because ground substance and areolae, not fibres, dominate it.',
      subject: 'fnd', primary: 'DIS-HIS-T02', secondary: [],
      modulePath: '101 ISK > Histology > Connective Tissue > Types of Connective Tissue Proper',
      type: 'structural_description',
    },
    {
      key: 'loose-areolar-ct-sites-and-functions',
      label: 'Loose areolar connective tissue lies under every epithelium and in every space except the brain',
      definition: 'Loose areolar connective tissue is found everywhere in the body except the brain: filling the spaces between organs, in the papillary layer of the dermis, in the lamina propria and submucosa of mucous membranes, in serous membranes, and around blood vessels and nerves. Because it is well vascularised and full of ground substance it is where nutrients and wastes are exchanged with the blood; it also binds structures together and limits the spread of infection.',
      objective: 'Name the sites of loose areolar connective tissue and its three functions, and state the one place it is absent.',
      pitfall: 'Assuming the brain, being soft, is full of loose connective tissue. It is nervous tissue with neuroglia as its support, and the department names it as the exception.',
      subject: 'fnd', primary: 'DIS-HIS-T02', secondary: [],
      modulePath: '101 ISK > Histology > Connective Tissue > Types of Connective Tissue Proper',
      type: 'structure_function_relationship',
    },
    {
      key: 'white-versus-brown-adipose-connective-tissue',
      label: 'White adipose tissue is unilocular and stores fat; brown adipose tissue is multilocular and burns it for heat',
      definition: 'White adipose connective tissue is made of unilocular fat cells and is white because it is poorly vascularised and its droplets hold carotenoids; it is affected by diet and by hormones, lies under the skin and around organs, and stores fat. Brown adipose connective tissue is made of multilocular fat cells and is brown from its richer blood supply and the cytochrome pigments of its many mitochondria; it is affected by hormones but not by diet, is abundant in fetal life and in the newborn, is lost during childhood and replaced by white fat, and performs thermogenesis — burning fat to release heat through the thermogenin of its mitochondria.',
      objective: 'Contrast white and brown adipose tissue by fat cell type, colour, age distribution and function.',
      pitfall: 'Attributing thermogenesis to white fat because it insulates. Insulating against heat loss and generating heat are different jobs and belong to different tissues.',
      subject: 'fnd', primary: 'DIS-HIS-T02', secondary: [],
      modulePath: '101 ISK > Histology > Connective Tissue > Types of Connective Tissue Proper',
      type: 'comparison',
    },
    {
      key: 'adipose-ct-stores-insulates-supports-and-secretes-leptin',
      label: 'Adipose connective tissue stores fat, insulates, supports organs, fills spaces and secretes leptin',
      definition: 'Adipose connective tissue is fat cells predominating, held by a fine network of reticular fibres with collagen dividing it into incomplete lobules. It synthesises and stores fat, insulates the body against heat loss, keeps organs such as the kidney in position, fills the spaces between tissues and gives the skin its contour. It also has an endocrine function: it secretes leptin, which inhibits food intake and raises the metabolic rate. It has no role in immunity.',
      objective: 'List the functions of adipose connective tissue, including its endocrine one.',
      pitfall: 'Forgetting that fat is an endocrine organ, and equally, crediting it with defence functions. Antibody comes from the plasma cell, and no fat cell makes any.',
      subject: 'fnd', primary: 'DIS-HIS-T02', secondary: [],
      modulePath: '101 ISK > Histology > Connective Tissue > Types of Connective Tissue Proper',
      type: 'structure_function_relationship',
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
    {
      key: 'connective-tissue-proper-versus-specialised-connective-tissue',
      label: 'Connective tissue is graded by the consistency of its matrix: soft is connective tissue proper, and cartilage, bone and blood are the specialised types',
      definition: 'All connective tissue is cells plus an intercellular matrix, and the matrix\'s consistency divides it. Where the matrix is soft the tissue is connective tissue proper, which is loose — areolar, adipose, reticular, mucoid — or dense — white fibrous and yellow elastic. Where the matrix is rubbery the tissue is cartilage, where solid it is bone, and where fluid it is blood; these three are the specialised connective tissues. Mesenchyme is the embryonic connective tissue from which all of them arise.',
      objective: 'Classify a named tissue as connective tissue proper, specialised connective tissue, embryonic connective tissue or not connective tissue at all.',
      pitfall: 'Refusing to count blood as connective tissue because it is liquid and circulates. The matrix is the plasma, and being fluid is exactly what places it among the specialised types.',
      subject: 'fnd', primary: 'DIS-HIS-T02', secondary: [],
      modulePath: '101 ISK > Histology > Connective Tissue > Types of Connective Tissue Proper',
      type: 'classification',
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
  ],

  questions: [
    {
      key: 'among-the-functions-of-the-loose-areolar-connective-tissue-c5a1d4b0',
      conceptKey: 'loose-areolar-ct-sites-and-functions',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'The fourth option was swallowed into the third: option C reads "Binds structures together. ‏.ل‎ Forms the stroma of the organs", so three parsed options carry four answers and the correct one cannot be selected on its own. The variant recorded in the bank shows the intact four — the fourth is "Forms the stroma of the organs" — so a rescan of the page recovers this question whole.',
    },
    {
      key: 'brown-adipose-connective-tissue-is-brown-due-to-a6480806',
      conceptKey: 'white-versus-brown-adipose-connective-tissue',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'Only three options survived and the contract is four to five. The question is sound and keyed — brown fat is brown from both the cytochrome pigment of its mitochondria and its richer blood supply, which is why "cytochrome oxidase only" is a distractor rather than the answer — so the fourth option is worth recovering by rescanning.',
    },
    {
      key: 'ground-substance-is-jelly-like-and-formed-mainly-of-hyaluron-70bc3485',
      conceptKey: 'mucoid-ct-is-jelly-rich-in-hyaluronic-acid',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'Three options survived where the contract needs four. The answer itself is intact — mucoid connective tissue — so what was lost is a distractor, and rescanning the page would restore the question in full.',
    },
    {
      key: 'loose-areolar-c-t-is-abundant-in-all-of-the-following-except-20f03d69',
      conceptKey: 'loose-areolar-ct-sites-and-functions',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the one organ that loose areolar connective tissue does not occupy.',
      explanations: {
        A: 'True, so not the exception. The papillary layer of the dermis is loose areolar connective tissue.',
        B: 'True, so not the exception. Loose areolar tissue sheathes the vessels and nerves running through the body.',
        C: 'True, so not the exception. The lamina propria and submucosa of mucous membranes are loose areolar tissue, which is what lets them swell.',
        D: 'The exception, and the answer. The brain is nervous tissue supported by its own neuroglia, and the department names it as the single place this otherwise universal tissue is absent — chosen wrongly by students who read "soft" as "loose connective tissue".',
      },
    },
    {
      key: 'protects-newborn-infants-by-heat-production-668a03de',
      conceptKey: 'white-versus-brown-adipose-connective-tissue',
      difficulty: 'Easy', questionType: 'Clinical application',
      learningObjective: 'Attribute newborn thermogenesis to brown adipose tissue.',
      explanations: {
        A: 'White fat insulates against heat loss, which sounds close enough to be tempting, but insulation is passive. It generates no heat of its own.',
        B: 'Mucoid connective tissue is the jelly of the umbilical cord and the dental pulp. It supports and nothing more.',
        C: 'Correct. Brown fat is abundant in the newborn and its multilocular cells burn fat for heat through the thermogenin of their many mitochondria.',
        D: 'Reticular connective tissue forms the stroma of lymph node, spleen and liver. It has no thermal role.',
      },
    },
    {
      key: 'regarding-loose-areolar-connective-tissue-6106453d',
      conceptKey: 'loose-areolar-ct-sites-and-functions',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Recognise the position of loose areolar connective tissue beneath epithelium and reject the properties of dense tissue.',
      explanations: {
        A: 'Correct. Loose areolar tissue lies immediately under epithelium throughout the body — as the papillary dermis, as the lamina propria of mucosa — which is where the epithelium gets its blood supply from.',
        B: 'Being condensed with fibres describes dense connective tissue: white fibrous and yellow elastic. Loose areolar tissue has scattered fibres in abundant matrix.',
        C: 'Backwards, and worth getting right: loose areolar tissue is well vascularised, which is exactly why the avascular epithelium above it can be fed at all.',
        D: 'Also backwards. Loose areolar tissue has the most abundant ground substance of any connective tissue proper — that abundance is what makes it loose.',
      },
    },
    {
      key: 'reticular-fibers-e-anchoring-fibres-f-capsule-of-organs-g-or-2b6627b1',
      conceptKey: 'connective-tissue-proper-versus-specialised-connective-tissue',
      difficulty: 'Easy', questionType: 'Classification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'Not a multiple-choice question. The extractor caught the tail of one matching table, the whole of the next ("Table III [Concerning Types of Connective Tissue Proper]") and the heading of the answer key that followed, and read the run-on as a stem with options. There is no MCQ on the page to recover; what is there is a matching item, which is a different question format from the one this bank imports.',
    },
    {
      key: 'the-followings-are-functions-for-adipose-c-t-except-6dc03c18',
      conceptKey: 'adipose-ct-stores-insulates-supports-and-secretes-leptin',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Separate the functions of adipose tissue from those of the immune cells that live in connective tissue.',
      explanations: {
        A: 'True, so not the exception. Subcutaneous fat is the body\'s thermal insulation.',
        B: 'The exception, and the answer. Antibody is secreted by the plasma cell. Adipose tissue is connective tissue and connective tissue does contain defence cells, which is what makes this misfire — but the fat cell itself secretes leptin, not immunoglobulin.',
        C: 'True, so not the exception. Perirenal fat holds the kidney in position, and losing it lets the kidney drop.',
        D: 'True, so not the exception. Fat fills the spaces between tissues and gives the skin its contour.',
      },
    },
    {
      key: 'the-followings-are-functions-for-white-adipose-c-t-except-bb17f077',
      conceptKey: 'white-versus-brown-adipose-connective-tissue',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Assign thermogenesis to brown fat and insulation to white.',
      explanations: {
        A: 'True, so not the exception. White fat is the body\'s insulation against heat loss.',
        B: 'The exception, and the answer. Thermogenesis belongs to brown, multilocular fat, whose mitochondria carry thermogenin. The pair of words is the trap: insulating against heat loss and generating heat sound like one function and are two, in two different tissues.',
        C: 'True, so not the exception. White fat around the kidney keeps it in position.',
        D: 'True, so not the exception. White fat fills the spaces between tissues.',
      },
    },
    {
      key: 'the-most-common-type-of-connective-tissue-c-t-is-7777c872',
      conceptKey: 'loose-areolar-ct-is-the-commonest-and-holds-every-cell-and-fibre',
      difficulty: 'Easy', questionType: 'Classification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'Three options survived, lettered A, B and D — the gap shows that option C was lost, and C is the correct answer: its intact twin `the-most-common-type-of-connective-tissue-is-a11e7354` has "Loose areolar connective tissue" in that slot. So this copy is a question with its answer removed. The twin is the one that imports; rescanning this page would only produce a duplicate of it.',
    },
    {
      key: 'the-most-common-type-of-connective-tissue-is-a11e7354',
      conceptKey: 'loose-areolar-ct-is-the-commonest-and-holds-every-cell-and-fibre',
      difficulty: 'Easy', questionType: 'Classification',
      learningObjective: 'Name the commonest type of connective tissue proper.',
      answerOverride: 'C',
      answerOverrideReason: 'The source printed no key. The department states outright that loose areolar connective tissue is the most common type, and the leaf\'s other question on the same point — `the-most-widespread-c-t-is-fc4178f4` — is keyed to it.',
      explanations: {
        A: 'Reticular connective tissue is restricted to the stroma of lymph node, spleen and liver. It is delicate and specialised, not general-purpose.',
        B: 'Adipose tissue is bulky and conspicuous, which is why it draws the eye, but it is confined to fat depots. Bulk is not the same as being widespread.',
        C: 'Correct. Loose areolar connective tissue is the commonest type and is found everywhere in the body except the brain.',
        D: 'White fibrous connective tissue is dense and specialised for strength — tendon, ligament, organ capsule, reticular dermis — so it appears wherever pull must be resisted and nowhere else.',
      },
    },
    {
      key: 'the-most-widespread-c-t-is-fc4178f4',
      conceptKey: 'loose-areolar-ct-is-the-commonest-and-holds-every-cell-and-fibre',
      difficulty: 'Easy', questionType: 'Classification',
      learningObjective: 'Name the most widely distributed connective tissue.',
      explanations: {
        A: 'Correct. Loose areolar connective tissue fills the spaces of the whole body except the brain, which makes it both the commonest and the most widely spread.',
        B: 'Reticular connective tissue lies only in the stroma of the lymphoid organs and the liver.',
        C: 'Mucous (mucoid) connective tissue is confined to the umbilical cord, the vitreous humour and the dental pulp — three places, and two of them only before birth.',
        D: 'Adipose tissue is widely distributed but is present only where fat is stored, and its amount varies with diet and hormones rather than being a constant feature of every space.',
      },
    },
    {
      key: 'the-pulp-of-teeth-is-formed-from-which-type-of-connective-ti-de47d559',
      conceptKey: 'mucoid-ct-is-jelly-rich-in-hyaluronic-acid',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Recognise dental pulp as one of the three sites of mucoid connective tissue.',
      explanations: {
        A: 'Mesenchymal tissue is the embryonic connective tissue from which all the rest arise. The dental pulp develops from it but is not still it.',
        B: 'Loose areolar tissue also has abundant ground substance, which is the pull here, but its matrix is not jelly and it holds every cell type rather than mainly fibroblasts.',
        C: 'Correct. The pulp of the teeth is mucoid connective tissue, along with the umbilical cord — Wharton\'s jelly — and the vitreous humour.',
        D: 'Adipose tissue is fat cells predominating. There is no fat depot inside a tooth.',
        E: 'Yellow elastic tissue is dense parallel elastic fibres, built for recoil, and sits in the aorta, the airways and the elastic ligaments.',
      },
    },
    {
      key: 'the-type-of-c-t-contains-all-types-of-c-t-cells-fibers-is-ca-e59fd7fd',
      conceptKey: 'loose-areolar-ct-is-the-commonest-and-holds-every-cell-and-fibre',
      difficulty: 'Easy', questionType: 'Classification',
      learningObjective: 'Identify the one connective tissue that contains every cell type and every fibre type.',
      explanations: {
        A: 'Correct. Loose areolar connective tissue holds all the connective tissue cells and all three fibre types, mainly as collagen bundles, in the most abundant matrix of any type.',
        B: 'Adipose tissue is defined by one cell predominating — the fat cell — which is the opposite of containing all of them.',
        C: 'White fibrous tissue is packed collagen bundles with fibroblasts and almost no other cell, and it carries no elastic or reticular fibres to speak of.',
        D: 'Mucoid tissue contains mainly fibroblasts, with only fine collagen and reticular fibres. Its abundant matrix makes it a plausible guess, but its cell population is narrow.',
      },
    },
    {
      key: 'what-type-of-adipose-tissue-tends-to-decrease-as-humans-age-bc518299',
      conceptKey: 'white-versus-brown-adipose-connective-tissue',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'State which adipose tissue is lost after infancy and give it under both its names.',
      explanations: {
        A: 'Both cannot fall, because the tissue that is lost is replaced by the other. White fat increases as brown fat disappears.',
        B: 'White adipose tissue increases with age rather than decreasing — it is what replaces the brown fat of infancy.',
        C: 'Unilocular is the fat cell of white adipose tissue, so this is the same wrong answer as B under its cellular name.',
        D: 'Correct. Multilocular is the fat cell of brown adipose tissue, which is abundant in the newborn, is lost through childhood and persists in adults only in the interscapular, mediastinal and axillary regions.',
      },
    },
    {
      key: 'what-type-of-adipose-tissue-tends-to-increase-as-humans-age-37a458f1',
      conceptKey: 'white-versus-brown-adipose-connective-tissue',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Recognise that white and unilocular name the same tissue, so an option offering both must be the answer.',
      explanations: {
        A: 'Brown adipose tissue is the one that goes: plentiful in the newborn, largely lost during childhood as white fat replaces it.',
        B: 'True as far as it goes, and this is where a student stops too early. White adipose tissue does increase — but so does unilocular adipose tissue, because they are the same thing.',
        C: 'Also true, and for the same reason: the unilocular fat cell is the cell of white adipose tissue.',
        D: 'Correct. B and C are two names for one tissue, so both are right and the combined option is the only complete answer.',
      },
    },
    {
      key: 'which-of-the-following-can-be-classified-as-specialized-conn-8a5cb301',
      conceptKey: 'connective-tissue-proper-versus-specialised-connective-tissue',
      difficulty: 'Moderate', questionType: 'Classification',
      learningObjective: 'Distinguish the specialised connective tissues from connective tissue proper and from embryonic connective tissue.',
      explanations: {
        A: 'Mesenchyme is the embryonic connective tissue every other type arises from. It is a precursor, not a specialisation.',
        B: 'Mucoid connective tissue is one of the four loose types of connective tissue proper — its matrix is soft, which is what keeps it in that group.',
        C: 'Dense connective tissue is also connective tissue proper, just with fibres predominating over matrix. Being firm is not the same as being specialised.',
        D: 'Correct. The consistency of the matrix is what grades connective tissue, and a fluid matrix — plasma — places blood among the specialised types with cartilage and bone. Students reject it because it circulates, but circulating is what its matrix is for.',
      },
    },
    {
      key: 'which-of-the-following-is-not-primarily-composed-of-connecti-315fbd0a',
      conceptKey: 'connective-tissue-proper-versus-specialised-connective-tissue',
      difficulty: 'Easy', questionType: 'Classification',
      learningObjective: 'Recognise which named structures are built of connective tissue and which is not.',
      explanations: {
        A: 'Correct. The brain is nervous tissue, supported by neuroglia rather than by connective tissue, and it is the one place the department says loose areolar tissue is absent.',
        B: 'An organ capsule is irregular white fibrous connective tissue — dense collagen bundles running in several directions.',
        C: 'A ligament is connective tissue too: irregular white fibrous tissue, or in a few named cases yellow elastic tissue.',
        D: 'Areolar tissue is the commonest connective tissue proper, so it is the most connective tissue of all four — picked only by a student reading the "NOT" too quickly.',
      },
    },
    {
      key: 'which-types-of-adipose-cells-is-a-characteristic-for-newborn-b3e19af7',
      conceptKey: 'white-versus-brown-adipose-connective-tissue',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the adipose tissue characteristic of the newborn.',
      explanations: {
        A: 'White fat is present in the newborn but is not characteristic of it — it is the adult\'s fat, and it increases as brown fat is lost.',
        B: 'Yellow describes bone marrow and elastic connective tissue, not a type of fat cell.',
        C: 'Grey is not one of the department\'s two types of adipose tissue.',
        D: 'Correct. Brown adipose tissue, with its multilocular cells, is abundant in fetal life and in the newborn, where its thermogenesis keeps the infant warm.',
      },
    },
    {
      key: 'the-followin-e-of-connective-tissue-c-t-is-widely-distribute-815ee14d',
      conceptKey: 'loose-areolar-ct-sites-and-functions',
      difficulty: 'Easy', questionType: 'Classification',
      learningObjective: 'Name the type of connective tissue proper found everywhere in the body.',
      answerOverride: 'b',
      answerOverrideReason:
        'The 2020 paper printed no key and the highlight recovery does not cover that sitting, so the answer comes from the department book: loose areolar connective tissue is the most common type and is found everywhere in the body except the brain — between organs, in the papillary layer of the dermis, in mucosa and serous membranes and around vessels and nerves. The stem has lost a word to the scanner ("The followin e of connective tissue"), but the question is intact.',
      explanations: {
        a: 'Irregular white fibrous connective tissue is a dense type, sited in the reticular layer of the dermis, in ligaments, in the sclera and in organ capsules. It is widespread but it is not everywhere, and it is dense rather than loose.',
        b: 'Correct. Loose areolar connective tissue is the commonest type, holds every kind of connective tissue cell and every kind of fibre, and the book says it is found everywhere in the body except the brain.',
        c: 'Yellow elastic connective tissue is confined to places that must recoil: the aorta, the trachea and bronchi, the vocal cords and three named ligaments.',
        d: 'Regular white fibrous connective tissue is tendon and cornea — collagen bundles laid parallel to withstand pull in one direction. Its whole point is that it is specialised to a site.',
      },
    },
    {
      key: 'the-type-of-c-t-in-tendons-is-tetaedseouserssides-olte-790b9105',
      conceptKey: 'dense-white-fibrous-ct-regular-versus-irregular',
      difficulty: 'Easy', questionType: 'Classification',
      learningObjective: 'Name the connective tissue of a tendon and say how its fibres are arranged.',
      answerOverride: 'a',
      answerOverrideReason:
        'Covered by the recovered key: the highlight on the 2022 script resolves to option a with high confidence, and the department book agrees — regular white fibrous connective tissue has collagen bundles laid regularly with fibroblasts in rows between them, and its sites are the tendon and the cornea. The stem carries scanner noise where the blank was ("tetaedSeouserssides OlTE") but the question and every option are intact.',
      explanations: {
        a: 'Correct, and confirmed by the recovered key. A tendon is regular white fibrous connective tissue: parallel collagen bundles that resist stretch in one direction, with rows of fibroblasts between them.',
        b: 'Yellow elastic connective tissue recoils after stretching and is found in the aorta, the trachea and the ligamentum flavum. A tendon that stretched and recoiled would waste the muscle\'s pull.',
        c: 'Mucoid connective tissue is the soft jelly of the umbilical cord, the vitreous and the dental pulp. It is the least resistant tissue in the chapter.',
        d: 'Adipose connective tissue stores fat, insulates and supports organs. It is a packing tissue and carries no load.',
      },
    },
  ],
}
