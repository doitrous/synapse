/**
 * `101 ISK > Anatomy > General Embryology > Third Week of Development` — the
 * question books' MCQs.
 *
 * Thirty-three rows and fifteen questions, and the leaf is wider than its
 * name. Gastrulation, the notochord and the intra-embryonic mesoderm are the
 * third week proper and are the bulk of it. But the extraction also files here
 * everything the books ask about the folding of the embryonic disc and about
 * the derivatives of the germ layers — fourth-week and Embryonic Period
 * material in the department book's own chapters — because the wording matches
 * this cluster. Those questions are authored here against the concepts the sat
 * papers already minted for them, with the module paths the book gives, rather
 * than being re-minted under a third-week name.
 *
 * Four rows are not embryology at all: the trilaminar appearance of the *cell
 * membrane* on electron microscopy. "Trilaminar" is the word they share with
 * the trilaminar embryonic disc, and it is the only thing they share. They are
 * excluded to the Cytology leaves that own them.
 *
 * Seven answers are supplied or overridden. Four are rows the books left
 * unkeyed, where the answer comes from a sentence of the department book named
 * in the override; three are department-book rows whose pencilled mark
 * contradicts the book on the same page. The worst of those is "the primitive
 * streak first appears at the beginning of the ___ week", marked *first* — the
 * primitive streak is the event that opens the third week, and the book says
 * so in the first line of the chapter this leaf is named after.
 *
 * Only one concept is minted here, and four are reused verbatim, because this
 * leaf sits where three other lanes have already been working.
 * `notochord-formation-fate` and `embryonic-disc-folding-types-causes-results`
 * come from the sat papers; `intra-embryonic-mesoderm-divisions-and-derivatives`
 * and `neural-tube-and-neural-crest-derivatives` come from `nervous-system.ts`,
 * which reached the same third-week material from the Basis of Anatomy side.
 * Their label, definition, objective, pitfall, node and module path are copied
 * unchanged, so re-emitting them adds these occurrences to their exam signal
 * and changes nothing else. Two of those reuses cost this leaf a distinction it
 * would otherwise have drawn — where intra-embryonic mesoderm is *absent*, and
 * the neural plate as against the neural crest — and the option explanations
 * carry that teaching instead. Splitting a student's mastery of the mesoderm
 * across two keys to keep a tidier definition would be the worse trade.
 *
 * The two minted concepts are `gastrulation-trilaminar-disc-from-epiblast`,
 * which no existing key covers, and `germ-layer-derivatives-ectoderm-and-endoderm`,
 * which is the list `intra-embryonic-mesoderm-divisions-and-derivatives`
 * explicitly leaves out — that concept ends by saying the gut lining is
 * endodermal and the central nervous system ectodermal and that neither is
 * mesodermal, so the ectoderm and endoderm lists are a separate objective
 * rather than a rival reading of the same one.
 *
 * `ART-101-ANA-NOTOCHORD` covers the leaf's largest concept. The folding
 * questions have `ART-101-ANA-EMBRYONIC-FOLDING` and the germ-layer questions
 * have nothing yet; both sets are taught under a concept whose own article
 * lives elsewhere, which the coverage merge in `build-batches.ts` handles.
 */
import type { McqLeafSeed } from '../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Third Week of Development',
  modulePath: '101 ISK > Anatomy > General Embryology > Third Week of Development',
  articleId: 'ART-101-ANA-NOTOCHORD',

  concepts: [
    {
      key: 'notochord-formation-fate',
      label: 'The notochord forms in four steps, guides the embryo, and ends as the nucleus pulposus',
      definition:
        'The notochord is the temporary primitive axial skeleton of the embryonic disc and develops in four steps. The prenotochordal process is a solid cord of epiblast cells from the primitive pit that invaginates and extends cranially in the midline between ectoderm and endoderm as far as the bucco-pharyngeal membrane. The cavity of the primitive pit then extends into it as the notochordal canal, whose roof lies against ectoderm, whose floor is fused with endoderm and whose cavity is continuous with the amniotic cavity. Degeneration of that floor with the fused endoderm opens the neurenteric canal, a temporary communication between amniotic cavity and yolk sac, leaving roof and sides as the notochordal plate. The plate then folds on itself into the definitive notochord, a solid cord with no cavity, and the endoderm approximates and fuses beneath it so amniotic cavity and yolk sac are separate again. It is the temporary axial skeleton, its firmness limits the head fold during folding, and the vertebral column forms around it. Most of it degenerates; the part within the intervertebral disc persists as the nucleus pulposus.',
      objective: 'Summarise the notochord: its four steps of formation, its importance, and its fate.',
      pitfall: 'Saying the notochord becomes the vertebral column. It does not — the column forms around it and the notochord degenerates, surviving only as the nucleus pulposus of the intervertebral disc.',
      subject: 'dev',
      primary: 'DIS-EMB-T01',
      secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > Third Week of Development',
      type: 'developmental_process',
      aliases: ['Notochordal plate', 'Nucleus pulposus'],
    },
    {
      key: 'gastrulation-trilaminar-disc-from-epiblast',
      label: 'Gastrulation turns the bilaminar disc into a trilaminar one, and all three of its layers come from the epiblast',
      definition:
        'Gastrulation is the transformation of the bilaminar embryonic disc into a trilaminar disc, and it is the characteristic event of the third gestational week. It begins with the primitive streak — a median narrow groove with bulging sides in the midline of the caudal part of the epiblast, formed by proliferation and migration of epiblast cells — and the primitive node, a rounded bulge at the cranial end of the streak with the primitive pit in its middle. Epiblast cells then invaginate through the primitive groove: some displace the hypoblast to become the endodermal layer, some spread as a middle layer of intra-embryonic mesoderm, and some form the notochord in the median region. What is left of the epiblast is the ectoderm. The whole trilaminar disc is therefore derived from the epiblast — the hypoblast contributes no layer to the embryo — and the disc changes shape from oval to pear-shaped with a broader cranial part while this happens.',
      objective:
        'Define gastrulation, name the week and the structure it starts from, and state which of the two layers of the bilaminar disc gives rise to all three germ layers.',
      pitfall:
        'Giving the endoderm to the hypoblast because the hypoblast is the lower of the two layers. The invaginating epiblast cells *replace* the hypoblast, and the department book says explicitly that all three layers come from the epiblast.',
      subject: 'dev',
      primary: 'DIS-EMB-T01',
      secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > Third Week of Development',
      type: 'developmental_process',
      aliases: ['Gastrulation', 'Primitive streak', 'Primitive node', 'Primitive pit', 'Epiblast'],
    },
    {
      key: 'intra-embryonic-mesoderm-divisions-and-derivatives',
      label: 'Intra-embryonic mesoderm divides into paraxial, intermediate and lateral plate, and each division has its own derivatives',
      definition: 'The intra-embryonic mesoderm arises from the primitive streak and divides into three on each side of the midline: paraxial mesoderm beside the notochord and neural tube, from the cranial part of the streak, which segments into somites and so into the vertebrae, the dermis and the skeletal muscles; intermediate mesoderm, from the middle of the streak, which forms the urogenital system; and lateral plate mesoderm, from the caudal part, which the coelom splits into somatopleuric mesoderm forming the trunk wall connective tissue and the parietal serous layers and splanchnopleuric mesoderm forming the connective tissue and smooth muscle of gut and respiratory tract, cardiac muscle and the visceral serous layers. The lining epithelium of the gut is endodermal and the central nervous system ectodermal, so neither is a mesodermal derivative.',
      objective: 'Name the three divisions of intra-embryonic mesoderm and give what each forms, and reject the endodermal and ectodermal structures offered beside them.',
      pitfall: 'Reading "urogenital system" as endodermal because the bladder is. The kidney and gonad come from intermediate mesoderm; only the lining epithelium of the bladder and urethra is endodermal.',
      subject: 'dev', primary: 'DIS-EMB-T01', secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > Third Week of Development',
      type: 'classification',
    },
    {
      key: 'neural-tube-and-neural-crest-derivatives',
      label: 'The neural tube becomes the central nervous system; the neural crest beside it becomes almost everything peripheral',
      definition: 'The neural plate of ectoderm, induced by the underlying notochord, sinks as a neural groove whose lips are the neural folds. The folds meet and fuse, beginning in the cervical region and closing towards both ends, to give the neural tube; the tube becomes the brain and the spinal cord — that is, the whole central nervous system, grey matter and white matter alike. As the folds fuse, cells at their crests separate as the neural crest and migrate. The neural crest gives the sensory, sympathetic and parasympathetic ganglia, the Schwann cells, the melanocytes and the suprarenal medulla. Both are ectodermal in origin, and neither gives rise to any mesodermal structure.',
      objective: 'Separate the derivatives of the neural tube from those of the neural crest, and name the germ layer both come from.',
      pitfall: 'Giving the peripheral nerves to the neural tube because the central nervous system is its derivative and nerves look like an extension of it. The tube gives only the central nervous system; the peripheral ganglia and Schwann cells come from the crest.',
      subject: 'dev', primary: 'DIS-EMB-T01', secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > Third Week of Development',
      type: 'developmental_process',
    },
    {
      key: 'embryonic-disc-folding-types-causes-results',
      label: 'Folding turns a flat disc into a cylinder with a gut inside it and a ring in its belly wall',
      definition:
        'Folding of the embryonic disc begins at the end of the third week and is complete at the end of the fourth. It is caused by expansion of the amniotic cavity, which produces longitudinal and transverse folding, and by growth of the neural tube and somites, which increases longitudinal length and drives the cephalo-caudal folds. Its results are transformation of the flat disc into a cylindrical body with a body cavity, the amniotic cavity coming to surround the embryo, and formation of the primitive umbilical ring — the defect in the ventral abdominal wall where the lateral folds fail to fuse because of the connecting stalk, allantois and vitelline duct. The gut is divided into foregut in the head fold, hindgut in the tail fold and midgut between the lateral folds, with the secondary yolk sac compressed into the vitelline duct. Folding also produces the forebrain bulge, the pericardial bulge and the stomodeum between them, and reverses position: the septum transversum becomes caudal and the bucco-pharyngeal membrane the most cranial structure, while the connecting stalk becomes more cranial and ventral and the cloacal membrane the most caudal.',
      objective: 'State the results of folding of the embryonic disc, including the divisions of the gut and the reversal of position.',
      pitfall: 'Missing the reversal of position. The septum transversum starts cranial to the disc and ends caudal to the heart, and a student who does not see the fold turn the disc over cannot place the diaphragm afterwards.',
      subject: 'dev',
      primary: 'DIS-EMB-T01',
      secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > Embryonic Period',
      type: 'developmental_process',
      aliases: ['Cephalo-caudal folding', 'Lateral folding', 'Primitive umbilical ring'],
    },
    {
      key: 'germ-layer-derivatives-ectoderm-and-endoderm',
      label: 'Ectoderm makes what covers and what senses; endoderm makes the linings of the gut and airway and the glands that bud off them',
      definition:
        'The department book lists the derivatives of the outer and the inner germ layer and asks them against each other. Ectoderm gives the central nervous system; the derivatives of the neural crest; the otic and lens placodes, which become the internal ear and the lens of the eye; the peripheral nerves and the sensory epithelium of ear, nose and eye; the epidermis of the skin; the pituitary gland; and the beginning and the end of the digestive tract, which are ectodermal depressions rather than gut. Endoderm gives two kinds of epithelium: the mucous lining epithelium of the digestive system apart from its beginning and end, of the respiratory tract, of most of the urinary bladder and urethra and of the tympanic cavity and Eustachian tube; and the glandular epithelium that is the parenchyma of the liver, pancreas, thyroid, thymus, palatine and nasopharyngeal tonsils and parathyroid glands. What is left over — dermis, muscle, bone, connective tissue and the serous membranes — is mesoderm.',
      objective:
        'Assign a named structure to the germ layer it comes from, and separate the epithelium of an organ from the connective tissue around it.',
      pitfall:
        'Giving the whole skin to the ectoderm. Only the epidermis is ectodermal; the dermis under it comes from the dermatome of the somite, and the books ask "epidermis" precisely so that the distinction has to be made.',
      subject: 'dev',
      primary: 'DIS-EMB-T01',
      secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > Embryonic Period',
      type: 'classification',
      aliases: ['Ectodermal derivatives', 'Endodermal derivatives', 'Germ layer derivatives'],
    },
  ],

  questions: [
    {
      key: 'notochord-is-developed-from-f09634da',
      conceptKey: 'notochord-formation-fate',
      difficulty: 'Hard',
      questionType: 'Developmental process',
      learningObjective: 'Name the cells the notochord develops from and where they lie.',
      explanations: {
        A: 'The near-miss the question is built on. Epiblast cells at the primitive *streak* become endoderm and intra-embryonic mesoderm; it is the cells at the primitive *pit*, in the node at the streak\'s cranial end, that make the notochord.',
        B: 'The hypoblast contributes no layer to the embryo. It is displaced by invaginating epiblast and ends up in the wall of the yolk sac.',
        C: 'The notochord is not a derivative of the mesoderm but a separate product of the same invagination — the two form side by side, the mesoderm lateral and the notochord median.',
        D: 'Correct. The prenotochordal process is a solid cord of epiblast cells derived from the primitive pit, which invaginates and grows cranially in the midline as far as the bucco-pharyngeal membrane.',
      },
    },
    {
      key: 'neurenteric-canal-is-formed-due-to-degeneration-of-520e8ef1',
      conceptKey: 'notochord-formation-fate',
      difficulty: 'Hard',
      questionType: 'Developmental process',
      learningObjective: 'Say exactly what degenerates to open the neurenteric canal.',
      explanations: {
        A: 'Correct. The floor of the notochordal canal is fused with the endoderm beneath it, and when both degenerate together the amniotic cavity above and the yolk sac below are briefly continuous.',
        B: 'The roof is what survives. Roof and sides persist as the notochordal plate, which then folds on itself to give the definitive notochord — so a question keyed to the roof has the structure degenerating that goes on to become the notochord itself.',
        C: 'Two errors in one option: the roof again, and the ectoderm. The roof lies against ectoderm but is not fused with it; the fusion is at the floor, with endoderm.',
        D: 'The bucco-pharyngeal membrane also degenerates, but months of development and a whole chapter away — it opens the stomodeum into the foregut, not the amniotic cavity into the yolk sac.',
      },
    },
    {
      key: 'one-of-the-following-is-true-regarding-the-notochord-2017-de-003a5fd4',
      conceptKey: 'notochord-formation-fate',
      difficulty: 'Hard',
      questionType: 'Structure and function',
      learningObjective: 'Give the extent, origin, position and fate of the notochord.',
      explanations: {
        A: 'Wrong end. The notochord runs from the primitive pit *cranially* to the bucco-pharyngeal membrane; the cloacal membrane is caudal to the primitive streak, in the opposite direction.',
        B: 'Correct. Most of the notochord degenerates, and the part inside the intervertebral disc persists as the nucleus pulposus — the only piece of it a living adult still carries.',
        C: 'Cells migrating from the primitive streak give the endoderm and the intra-embryonic mesoderm. The notochord comes from the primitive pit, in the node.',
        D: 'Upside down. The notochord lies ventral to the neural tube — it is the floor the tube is built above, and the vertebral bodies form around it in front of the vertebral canal.',
      },
    },
    {
      key: 'gastrulation-is-9d787378',
      conceptKey: 'gastrulation-trilaminar-disc-from-epiblast',
      difficulty: 'Easy',
      questionType: 'Developmental process',
      learningObjective: 'Define gastrulation.',
      explanations: {
        A: 'Correct. Gastrulation is the transformation of the bilaminar embryonic disc into a trilaminar one, and it is the characteristic event of the third week along with the chorionic villi.',
        B: 'The bilaminar disc is what gastrulation starts *from*, and it formed on the eighth day when the amniotic cavity separated epiblast from hypoblast. This option names the state before the process.',
        C: 'The chorion and its villi form in parallel, on the other side of the chorionic cavity, but they are trophoblast derivatives and are no part of the embryonic disc.',
        D: 'Folding begins at the end of the third week, when gastrulation is finished — the disc has to have three layers before it can fold into a body with three layers in it.',
      },
    },
    {
      key: 'the-primitive-streak-rst-appears-at-the-beginning-of-the-wee-b87b6467',
      conceptKey: 'gastrulation-trilaminar-disc-from-epiblast',
      difficulty: 'Moderate',
      questionType: 'Developmental timing',
      learningObjective: 'Give the week in which the primitive streak appears.',
      answerOverride: 'C',
      answerOverrideReason:
        'The department question book marks A, the first week. The department book opens its Third Week chapter by naming gastrulation as one of the two characteristic events of the third gestational week, and gastrulation begins with the formation of the primitive streak and node in the epiblast — so the streak appears at the beginning of the third week. In the first week the embryo is still a cleaving ball of blastomeres with no epiblast to form a streak in.',
      explanations: {
        A: 'The mark this reprint carries, and impossible: in the first week the embryo is cleaving in the uterine tube and has no epiblast layer for a streak to appear in.',
        B: 'The second week makes the bilaminar disc, which is what the streak later appears in. This is the closest wrong answer and the one a student picks who dates the streak from the disc rather than from the invagination.',
        C: 'Correct. The primitive streak appears at the beginning of the third week and is the opening event of gastrulation.',
        D: 'By the fourth week the streak has done its work and is regressing; folding has begun, and the streak survives mainly as the structure that limits the tail fold.',
      },
    },
    {
      key: 'intraembryonic-mesoderm-is-formed-between-ectoderm-and-endod-c38b93d9',
      conceptKey: 'intra-embryonic-mesoderm-divisions-and-derivatives',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Say where intra-embryonic mesoderm lies and where it does not.',
      explanations: {
        A: 'One of the three places mesoderm is absent. At the bucco-pharyngeal membrane the ectoderm and endoderm are fused to one another, leaving no space for a middle layer.',
        B: 'The other fused membrane, at the caudal end of the disc, and absent for the same reason. The two membranes are why the disc has holes in its middle layer at both ends.',
        C: 'Correct. The intra-embryonic mesoderm spreads on both sides of the notochord and the neural tube, which is exactly where it later divides into paraxial, intermediate and lateral plate.',
        D: 'The third mesoderm-free region. Between the primitive node and the bucco-pharyngeal membrane the midline is occupied by the notochord and the neural tube themselves.',
      },
    },
    {
      key: 'one-of-the-followings-is-not-a-part-of-intraembryonic-mesode-29a6885b',
      conceptKey: 'intra-embryonic-mesoderm-divisions-and-derivatives',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Name the three subdivisions of the intra-embryonic mesoderm and reject what is not one of them.',
      answerOverride: 'D',
      answerOverrideReason:
        'This reprint of the 2022 sitting marks C, the lateral plate mesoderm, which the department book names as one of the three parts the intra-embryonic mesoderm divides into on the seventeenth day. The one option that is not a part of it is D: amnioblasts are second-week cells lining the roof of the amniotic cavity, and they are not mesoderm of any kind.',
      explanations: {
        A: 'Intermediate mesoderm is the middle of the three, derived from the middle part of the primitive streak, and it goes on to form the urogenital system.',
        B: 'Paraxial mesoderm is the most medial of the three, on both sides of the notochord and neural tube, and it is the one that segments into somites.',
        C: 'Lateral plate mesoderm is the most lateral of the three, and the coelom splits it into somatopleuric and splanchnopleuric layers. It is the option this reprint marks, and it is a part of the intra-embryonic mesoderm rather than the exception.',
        D: 'Correct. Amnioblasts are the cells that separate from the embryoblast on the eighth day to line the roof of the amniotic cavity. They belong to the second week and to no part of the mesoderm.',
      },
    },
    {
      key: 'neural-plate-is-a-thickened-median-region-of-0bbbcaae',
      conceptKey: 'neural-tube-and-neural-crest-derivatives',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Name the germ layer the neural plate is a thickening of.',
      answerOverride: 'C',
      answerOverrideReason:
        'No copy of this question in the bank carries a key; the one copy that was keyed had lost option A into its stem and is excluded. The department book lists the central nervous system first among the derivatives of the ectoderm, and the neural plate is its first appearance, so the answer is C.',
      explanations: {
        A: 'The endoderm is the innermost layer and gives the linings of the gut and airway. Nothing nervous comes from it.',
        B: 'Mesoderm surrounds the neural tube and forms the vertebrae that protect it, but it forms no part of it. A student picks this because the somites lie either side of the plate in every diagram.',
        C: 'Correct. The neural plate is a thickened median region of the ectoderm, induced by the notochord under it, and it is where the whole central nervous system starts.',
        D: 'The notochord induces the neural plate and lies beneath it, but the plate is not made of it. The notochord ends as the nucleus pulposus, not as the brain.',
      },
    },
    {
      key: 'regarding-formation-of-central-nervous-system-mark-the-corre-c072edfa',
      conceptKey: 'neural-tube-and-neural-crest-derivatives',
      difficulty: 'Hard',
      questionType: 'Developmental process',
      learningObjective: 'Identify the one true statement about how the central nervous system forms.',
      answerOverride: 'A',
      answerOverrideReason:
        'The row carries no key. The department book lists the central nervous system as the first derivative of the ectoderm, which is option A; the other three are each false as written — the notochord does induce the plate, the neural groove is a depression of the plate rather than of the crest, and the caudal neuropore is the last part of the tube to close rather than the first.',
      explanations: {
        A: 'Correct. The central nervous system heads the department book\'s list of ectodermal derivatives, and it begins as the neural plate, a thickening of the ectoderm.',
        B: 'A double negative hiding a real fact. The notochord does induce the overlying ectoderm to form the neural plate, so "not induced" is false — and the induction is one of the notochord\'s three listed importances.',
        C: 'Swaps plate for crest. The neural groove is a depression in the midline of the neural *plate*; the neural crest separates from the crests of the folds on either side of that groove and becomes ganglia, melanocytes and much else.',
        D: 'The wrong end and the wrong order. Fusion of the neural folds begins in the middle and spreads both ways, so the neuropores close last, and the cranial one closes before the caudal.',
      },
    },
    {
      key: 'before-folding-the-most-caudal-structure-in-the-tail-fold-is-6811bd9c',
      conceptKey: 'embryonic-disc-folding-types-causes-results',
      difficulty: 'Hard',
      questionType: 'Developmental process',
      learningObjective: 'Name the most caudal structure of the disc before folding.',
      explanations: {
        A: 'The cloacal membrane is the most caudal structure *after* folding, not before. The reversal of position is the whole point of the pair of questions the books ask here.',
        B: 'The primitive streak lies caudal in the disc and is what limits the tail fold, but the connecting stalk is caudal to it — which is why the streak is the limit of the fold rather than its end.',
        C: 'The primitive node sits at the *cranial* end of the primitive streak. Of the four options this is the most cranial structure, not the most caudal.',
        D: 'Correct. Before folding the connecting stalk is the most caudal structure of the disc; folding swings it cranially and ventrally, and the cloacal membrane takes its place at the caudal end.',
      },
    },
    {
      key: 'after-folding-the-most-caudal-structure-at-tail-fold-is-dep-34984edf',
      conceptKey: 'embryonic-disc-folding-types-causes-results',
      difficulty: 'Hard',
      questionType: 'Developmental process',
      learningObjective: 'Name the most caudal structure after folding.',
      answerOverride: 'B',
      answerOverrideReason:
        'The department-book copy marks C, the connecting stalk, which is the answer to the *other* half of the pair — the connecting stalk is most caudal before folding. The department book states the reversal explicitly: in the tail fold the connecting stalk with the allantois becomes more cranial and ventral, and the cloacal membrane becomes the most caudal structure.',
      explanations: {
        A: 'The primitive streak is regressing by the time folding is complete, and it was never the most caudal structure — the connecting stalk lay caudal to it even before the fold.',
        B: 'Correct. Folding swings the connecting stalk cranially and ventrally, and that leaves the cloacal membrane as the most caudal structure of the embryo.',
        C: 'The answer before folding, and the mark this copy carries. Reading it here is missing the reversal of position that the question exists to test.',
        D: 'The bucco-pharyngeal membrane is at the opposite end: after folding it becomes the most *cranial* structure, replacing the septum transversum that started there.',
      },
    },
    {
      key: 'tail-fold-of-the-embryo-is-limited-by-dep-book-ac-ad-ac-ad-a-c1b63c26',
      conceptKey: 'embryonic-disc-folding-types-causes-results',
      difficulty: 'Moderate',
      questionType: 'Developmental process',
      learningObjective: 'Name the structure whose firmness limits the tail fold.',
      explanations: {
        A: 'The notochord limits the *head* fold. The department book pairs the two — notochord cranially, primitive streak caudally — and the books ask both with the other as the distractor.',
        B: 'Correct. The tail fold is limited by the relatively firm primitive streak, in the same way that the head fold is limited by the relatively firm notochord.',
        C: 'The yolk sac is what folding compresses into the vitelline duct. Far from limiting the fold, it is one of the things the fold acts on.',
        D: 'Expansion of the amniotic cavity is a *cause* of folding, not a limit to it. The option is here to catch a student who has learnt the causes and not the limits.',
      },
    },
    {
      key: 'concerning-the-folding-of-the-embryonic-disc-select-the-corr-695627d7',
      conceptKey: 'embryonic-disc-folding-types-causes-results',
      difficulty: 'Hard',
      questionType: 'Developmental process',
      learningObjective: 'Give the cause, the types, the timing and the limits of folding.',
      answerOverride: 'D',
      answerOverrideReason:
        'The reprint of the 2023 and 2022 sittings marks B — that folding is of two types only, head and tail. The department book gives two types of folding of which the cephalo-caudal type is only one: the transverse or lateral folding, with right and left lateral folds, is the other, and the primitive umbilical ring exists precisely because the lateral folds fail to fuse. B is therefore false. The book states that the firmness of the notochord limits the head fold, which makes D the only option that stands.',
      explanations: {
        A: 'The wrong cavity. Folding is caused by expansion of the *amniotic* cavity, together with growth of the neural tube and somites; the yolk sac is compressed by folding rather than driving it.',
        B: 'The mark this reprint carries, and false. The head and tail folds are the cephalo-caudal pair; the right and left lateral folds are a second type, and without them the disc could never close into a cylinder.',
        C: 'Folding begins at the end of the third week and is complete at the end of the fourth. Early in the second week the disc is not yet trilaminar and has nothing to fold.',
        D: 'Correct. The department book gives the firmness of the notochord as what limits the head fold, in the same sentence that gives the primitive streak as what limits the tail fold.',
      },
    },
    {
      key: 'epidermis-of-skin-is-derived-from-a1791b98',
      conceptKey: 'germ-layer-derivatives-ectoderm-and-endoderm',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Assign the epidermis to its germ layer and separate it from the dermis.',
      explanations: {
        A: 'The neural crest gives the melanocytes that live in the epidermis, along with peripheral ganglia and much of the head\'s connective tissue — but it does not make the epidermis itself.',
        B: 'The neural tube is the ectoderm that sank inwards to become the central nervous system. The epidermis is the ectoderm that stayed on the surface, which is exactly the distinction the option pair tests.',
        C: 'Correct. The epidermis of the skin is a surface ectodermal derivative, and it is on the department book\'s list of ectodermal derivatives in those words.',
        D: 'Mesoderm makes the *dermis*, from the dermatome of the somite. A student who answers "skin" rather than "epidermis" picks this, which is why the books ask for the epidermis by name.',
      },
    },
    {
      key: 'parenchyma-of-the-liver-is-developed-from-d5de0bdd',
      conceptKey: 'germ-layer-derivatives-ectoderm-and-endoderm',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Assign the parenchyma of a gut-derived gland to its germ layer.',
      answerOverride: 'A',
      answerOverrideReason:
        'No copy of this question in the bank carries a key. The department book lists the glandular epithelium derived from endoderm as "parenchyma of liver, pancreas, thyroid, thymus, tonsils and parathyroid glands" — the liver by name, first in the list.',
      explanations: {
        A: 'Correct. The liver buds from the endoderm of the foregut, and its parenchyma — the hepatocytes and the bile ducts — is endodermal glandular epithelium, like the pancreas, thyroid, thymus and parathyroids beside it in the book\'s list.',
        B: 'Ectoderm gives the beginning and the end of the digestive tract but nothing between them. A liver from ectoderm would have had to arise from the stomodeum.',
        C: 'The neural crest contributes to the ganglia of the gut wall, not to the glandular epithelium that buds off it.',
        D: 'The intra-embryonic mesoderm gives the connective tissue capsule, the stroma and the blood vessels of the liver — everything except the parenchyma, which is the word the question turns on.',
      },
    },
    {
      key: 'after-folding-the-most-caudal-structure-at-tail-fold-is-4363fc0d',
      conceptKey: 'embryonic-disc-folding-types-causes-results',
      difficulty: 'Hard',
      questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A duplicate of `after-folding-the-most-caudal-structure-at-tail-fold-is-dep-34984edf` that lost option C, the connecting stalk, and carries no key. The complete copy is imported with an override.',
    },
    {
      key: 'all-the-statements-concerned-to-the-trilaminar-appearance-of-520cbee7',
      conceptKey: 'gastrulation-trilaminar-disc-from-epiblast',
      difficulty: 'Hard',
      questionType: 'Structure and function',
      learningObjective: 'Not part of this leaf.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Not an embryology question. It is about the trilaminar appearance of the *cell membrane* on electron microscopy — heavy metal in the phospholipid heads, two electron-dense layers with an electron-lucent one between. The extractor filed it here on the word "trilaminar", which it shares with the trilaminar embryonic disc and nothing else. It belongs to the Cytology leaves.',
    },
    {
      key: 'before-folding-the-most-caudal-structure-in-the-tail-fold-is-a72d0bdd',
      conceptKey: 'embryonic-disc-folding-types-causes-results',
      difficulty: 'Hard',
      questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The department-book copy of `before-folding-the-most-caudal-structure-in-the-tail-fold-is-6811bd9c`, marked C — the primitive node, which is the most *cranial* of the four options. The correctly keyed copy was asked twice and is the one imported.',
    },
    {
      key: 'before-folding-the-most-caudal-structure-in-the-tail-fold-is-f4912515',
      conceptKey: 'embryonic-disc-folding-types-causes-results',
      difficulty: 'Hard',
      questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A third copy reduced to two options, the primitive streak and the connecting stalk, with option A read into the stem and option C lost. Unkeyed.',
    },
    {
      key: 'by-em-the-cell-membrane-appears-as-0094c4a1',
      conceptKey: 'gastrulation-trilaminar-disc-from-epiblast',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Not part of this leaf.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A cytology question — the appearance of the cell membrane by electron microscopy — filed here on the word "trilaminar". It belongs to the Cytology leaves of Histology.',
    },
    {
      key: 'cell-membrane-appears-as-trilaminar-structure-because-0345e60f',
      conceptKey: 'gastrulation-trilaminar-disc-from-epiblast',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Not part of this leaf.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The same cytology question one step further on — why the cell membrane looks trilaminar, namely osmium deposited in the hydrophilic heads. Filed here on a shared word; it belongs to the Cytology leaves.',
    },
    {
      key: 'gastrulation-is-dep-book-2ecc8237',
      conceptKey: 'gastrulation-trilaminar-disc-from-epiblast',
      difficulty: 'Easy',
      questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A clean but unkeyed department-book copy of `gastrulation-is-9d787378`, with the same four options. One copy of a question is imported and the keyed one is it.',
    },
    {
      key: 'intraembryonic-mesoderm-is-formed-between-ectoderm-and-endod-9c02d2ba',
      conceptKey: 'intra-embryonic-mesoderm-divisions-and-derivatives',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The department-book copy of `intraembryonic-mesoderm-is-formed-between-ectoderm-and-endod-c38b93d9`, with the same four options and the same answer C. Kept as a recorded duplicate so a rescan of page 123 does not author it a second time.',
    },
    {
      key: 'intraembryonic-mesoderm-is-formed-between-ectoderm-and-endod-c529e945',
      conceptKey: 'intra-embryonic-mesoderm-divisions-and-derivatives',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A third copy reduced to three options — the stem swallowed option A and option D was lost — and unkeyed. Since D, the median region between primitive pit and bucco-pharyngeal membrane, is one of the three regions the answer depends on distinguishing, what was lost matters.',
    },
    {
      key: 'neural-plate-is-a-thickened-median-region-of-a-endoderm-4732175e',
      conceptKey: 'neural-tube-and-neural-crest-derivatives',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The only keyed copy of the neural plate question, and its stem swallowed option A: it ends "a thickened median region of a .. Endoderm", leaving three options. The complete four-option copy `neural-plate-is-a-thickened-median-region-of-0bbbcaae` is imported instead, with its answer overridden to the C that this row keys — so the key is not lost, only the broken option set.',
    },
    {
      key: 'neural-plate-is-a-thickened-median-region-of-dep-book-9f1a467a',
      conceptKey: 'neural-tube-and-neural-crest-derivatives',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A third, unkeyed copy of the same question with the same four options. One copy is imported.',
    },
    {
      key: 'neurenteric-canal-is-formed-due-to-degeneration-of-dep-book-7afe36a7',
      conceptKey: 'notochord-formation-fate',
      difficulty: 'Hard',
      questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The department-book copy of `neurenteric-canal-is-formed-due-to-degeneration-of-520e8ef1`, marked B — the roof of the notochordal canal — where the book says it is the floor, together with the endoderm fused to it, that degenerates. The correctly keyed copy was asked twice and is the one imported.',
    },
    {
      key: 'notochord-is-developed-from-dep-book-2024-em-em-em-em-em-d1ea0b43',
      conceptKey: 'notochord-formation-fate',
      difficulty: 'Hard',
      questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The department-book copy of `notochord-is-developed-from-f09634da`, with the same four options and the same answer D. A recorded duplicate rather than a second question.',
    },
    {
      key: 'parenchyma-of-the-liver-is-developed-from-a-endoderm-d934e750',
      conceptKey: 'germ-layer-derivatives-ectoderm-and-endoderm',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A duplicate of `parenchyma-of-the-liver-is-developed-from-d5de0bdd` whose stem swallowed option A and whose options carry line-break debris. Unkeyed, like every copy of this question.',
    },
    {
      key: 'parenchyma-of-the-liver-is-developed-from-dep-book-ac-p-a-en-25be9c9e',
      conceptKey: 'germ-layer-derivatives-ectoderm-and-endoderm',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The department-book copy of the same question, with options A and B read into the stem along with the page margin, and no key. The clean copy is imported with an override taken from the book\'s own list of endodermal derivatives.',
    },
    {
      key: 'tail-fold-of-the-embryo-is-limited-by-a3244e1a',
      conceptKey: 'embryonic-disc-folding-types-causes-results',
      difficulty: 'Moderate',
      questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A duplicate of `tail-fold-of-the-embryo-is-limited-by-dep-book-ac-ad-ac-ad-a-c1b63c26` that lost option C, the yolk sac, and carries no key. The complete keyed copy is imported.',
    },
    {
      key: 'the-de-nitive-yolk-sac-develops-during-dep-book-ac-ad-ac-ad-aa472d7d',
      conceptKey: 'yolk-sac-development-and-functions',
      difficulty: 'Moderate',
      questionType: 'Developmental timing',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'None of the four options can be right. The row offers first, third, fourth and fifth week, and the department book states that the primary yolk sac forms on the ninth gestational day and the secondary — definitive — yolk sac on the thirteenth, both of which are the second week. The row carries no key either. Excluded because a question whose correct answer is not among its options cannot be repaired by choosing the least wrong one; the disagreement is recorded on `yolk-sac-development-and-functions` in `fetal-membranes.ts`, which is the concept it would have tested.',
    },
    {
      key: 'trilaminar-membrane-f184b506',
      conceptKey: 'gastrulation-trilaminar-disc-from-epiblast',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Not part of this leaf.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The third cytology row filed here on the word "trilaminar": two dark lines and one light one in the electron-microscopic cell membrane. It belongs to the Cytology leaves of Histology.',
    },
  ],
}
