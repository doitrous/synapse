/**
 * `101 ISK > Anatomy > General Embryology > Third Week of Development` — the
 * question books' MCQs.
 *
 * Thirty-three rows, sixteen live. Four of the thirty-three are not embryology
 * at all: `by-em-the-cell-membrane-appears-as`,
 * `cell-membrane-appears-as-trilaminar-structure-because`,
 * `trilaminar-membrane` and `all-the-statements-concerned-to-the-trilaminar-appearance-of`
 * are cell-membrane questions the topic clustering dropped into this leaf. They
 * keep `plasma-membrane-unit-membrane-em-and-thickness`, repeated verbatim from
 * `the-cell.ts` with that leaf's modulePath intact, rather than being given a
 * rival key here.
 *
 * Two concepts are reused from the written papers —
 * `embryonic-disc-folding-types-causes-results` and `notochord-formation-fate` —
 * and three are minted. The folding one has a rival already: the written batch
 * carries both `embryonic-folding-types-and-causes`, from the 2025 paper, and
 * `embryonic-disc-folding-types-causes-results`, from another sitting, and the
 * two are one idea under two keys. I have reused the second, because only it
 * states the reversal of position that three of this leaf's questions turn on,
 * and I have not touched the first. Someone should merge them on the paper side;
 * adding a third key here would have made it worse.
 *
 * A gap in the department book, recorded on `neural-plate-and-the-ectodermal-origin-of-the-nervous-system`
 * rather than papered over. Four rows of this leaf ask about neurulation — the
 * neural plate as thickened ectoderm, the neural groove, induction by the
 * notochord, and which end of the neural tube closes first — and the extraction
 * of the department book contains none of it. The book names the central nervous
 * system in its list of ectodermal derivatives on page 87 and says nothing about
 * how the tube forms. The explanations here are written to what the faculty
 * would accept and the gap is declared on the concept; a reviewer should check
 * them against whatever the students are actually lectured from.
 *
 * Four answers are overridden. Two are supplied where none was printed
 * (`neural-plate-is-a-thickened-median-region-of`,
 * `regarding-formation-of-central-nervous-system`,
 * `parenchyma-of-the-liver-is-developed-from`), and one is set against a printed
 * key: `the-primitive-streak-first-appears-at-the-beginning-of-the-week` is keyed
 * to the first week, where the book puts gastrulation and the streak in the
 * third — the week the chapter is named for. A fourth,
 * `after-folding-the-most-caudal-structure-at-tail-fold-is`, is keyed to the
 * connecting stalk, which is the answer to the *other* question on the same
 * page: before folding it is the connecting stalk, after folding it is the
 * cloacal membrane, and the two questions are printed together precisely so that
 * a student has to hold the reversal in mind.
 *
 * One exclusion is a reviewer's problem rather than a scanner's:
 * `all-the-statements-concerned-to-the-trilaminar-appearance-of` prints two false
 * statements and asks for one exception. That is not fixable by rescanning.
 */
import type { McqLeafSeed } from '../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Third Week of Development',
  modulePath: '101 ISK > Anatomy > General Embryology > Third Week of Development',
  articleId: 'ART-101-ANA-EMBRYONIC-FOLDING',

  concepts: [
    {
      key: 'gastrulation-primitive-streak-and-the-three-layers-from-epiblast',
      label: 'Gastrulation makes the trilaminar disc in the third week, and all three of its layers come from the epiblast',
      definition:
        'Gastrulation is the transformation of the bilaminar embryonic disc into a trilaminar one, and with the chorionic villi it is the characteristic event of the third gestational week. It begins with the primitive streak, a median narrow groove with bulging sides in the caudal part of the epiblast, formed at the beginning of the third week by proliferation and migration of epiblast cells; at its cranial end is the primitive node, a rounded bulge with the primitive pit in its middle. Epiblast cells invaginate through the primitive groove and form the endoderm, replacing the hypoblast, then the intra-embryonic mesoderm as a middle layer, and the notochord in the median plane; what is left of the epiblast is the ectoderm. All three layers therefore come from the epiblast alone. The intra-embryonic mesoderm lies between ectoderm and endoderm on both sides of the notochord and neural tube, and is absent in three places: at the bucco-pharyngeal membrane and at the cloacal membrane, where ectoderm and endoderm are fused, and in the median region between the primitive node and the bucco-pharyngeal membrane, which the notochord and neural tube occupy.',
      objective:
        'Define gastrulation, date the primitive streak, name the layer all three germ layers arise from, and say where intra-embryonic mesoderm is present and where it is absent.',
      pitfall:
        'Deriving the endoderm from the hypoblast. The hypoblast is displaced, not converted — every layer of the trilaminar disc comes from the epiblast, and the book states it as a point in its own right.',
      subject: 'dev',
      primary: 'DIS-EMB-T01',
      secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > Third Week of Development',
      type: 'developmental_process',
      aliases: ['Primitive streak', 'Primitive node', 'Trilaminar embryonic disc', 'Intra-embryonic mesoderm'],
    },
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
      key: 'neural-plate-and-the-ectodermal-origin-of-the-nervous-system',
      label: 'The neural plate is thickened median ectoderm induced by the notochord beneath it, and it folds into the neural tube',
      definition:
        'The central nervous system is a derivative of ectoderm. In the median plane of the ectoderm overlying the notochord, and induced by it, the cells thicken into the neural plate. The plate\'s median part sinks to form the neural groove, with a neural fold rising on either side; the folds meet and fuse, converting the groove into the neural tube. Fusion begins in the middle of the embryo and travels both cranially and caudally, so the ends are the last to shut — the cranial neuropore closes before the caudal one. Cells at the crest of each fold separate as they fuse and become the neural crest, whose derivatives include the sensory ganglia and much of the peripheral nervous system, and which is the source of the "derivatives of the neural crest" the department book lists beside the central nervous system among the ectodermal derivatives.',
      objective:
        'Name the germ layer the neural plate is a thickening of, say what induces it, and give the order in which the neural tube closes.',
      pitfall:
        'Reading the neural groove as a depression of the neural crest. The groove is a depression of the neural plate; the crest is what the raised edges of that groove leave behind, so the crest is a product of the process rather than the thing being depressed.',
      subject: 'dev',
      primary: 'DIS-EMB-T01',
      secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > Third Week of Development',
      type: 'developmental_process',
      aliases: ['Neurulation', 'Neural tube', 'Neural crest', 'Neural groove'],
      gaps: [
        'The extraction of the department book carries no account of neurulation at all: no neural plate, no neural groove, no neural tube closure and no neuropores. The book names the central nervous system and the neural crest derivatives in its list of ectodermal derivatives on page 87 and stops there. Four rows of this leaf examine the process anyway, so the explanations are written to standard teaching rather than to a departmental source, and a reviewer should check them against the lecture material.',
      ],
    },
    {
      key: 'germ-layer-derivatives-ectoderm-and-endoderm',
      label: 'Ectoderm makes the nervous system and the epidermis; endoderm makes the linings and the glandular parenchymas',
      definition:
        'The department book lists the derivatives of two germ layers directly. From ectoderm come the central nervous system; the derivatives of the neural crest; the otic and lens placodes, which form the internal ear and the lens; the peripheral nerves and the sensory epithelium of ear, nose and eye; the epidermis of the skin; the pituitary gland; and the beginning and end of the digestive tract. From endoderm come two kinds of epithelium: the mucous lining of the digestive system apart from its beginning and end, of the respiratory tract, of most of the urinary bladder and urethra, and of the tympanic cavity and Eustachian tube; and the glandular epithelium that is the parenchyma of the liver, pancreas, thyroid, thymus, tonsils and parathyroid glands. Mesoderm is not given as a matching list but through the three divisions of the intra-embryonic mesoderm.',
      objective:
        'Assign an organ or a tissue to the germ layer it comes from, and separate the endodermal parenchymas from the mesodermal stroma that supports them.',
      pitfall:
        'Giving the liver to mesoderm because it is a solid abdominal organ. Its parenchyma — the hepatocytes that do the work — is endodermal; only its connective tissue and vessels are mesodermal, and the same split applies to the pancreas, thyroid and thymus.',
      subject: 'dev',
      primary: 'DIS-EMB-T01',
      secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > Third Week of Development',
      type: 'classification',
      aliases: ['Ectodermal derivatives', 'Endodermal derivatives', 'Germ layers'],
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
      key: 'paraxial-mesoderm-somite-derivatives',
      label: 'Each somite splits into a sclerotome and a dermomyotome, and those become bone, dermis and muscle',
      definition:
        'Somites are the transverse segments of the paraxial mesoderm, which lies on both sides of the notochord and neural tube. Each somite divides obliquely into a ventromedial sclerotome and a dorsolateral dermomyotome. The sclerotome cells migrate medially to surround the notochord and neural tube and form the vertebrae and intervertebral discs. The dermomyotome subdivides into a dermatome, which forms the dermis of the skin, and a myotome, which forms the skeletal muscles of the body; the dorsal part of the dermomyotome forms the muscle and dermis of the back of the vertebral column and its ventral part those of the rest of the body, matching the dorsal and ventral primary rami of the spinal nerve.',
      objective: 'Describe how a somite differentiates into sclerotome and dermomyotome and name what each derivative forms.',
      pitfall: 'Reading "dermatome" here as the skin area of a spinal nerve. In the somite it is the part of the dermomyotome that makes dermis \u2014 although the two senses are related, because the dorsal and ventral parts follow the two primary rami.',
      subject: 'dev',
      primary: 'DIS-EMB-T01',
      secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > Third Week of Development',
      type: 'developmental_process',
      aliases: ['Sclerotome', 'Dermomyotome', 'Myotome', 'Paraxial mesoderm'],
    },
  ],

  questions: [
    {
      key: 'before-folding-the-most-caudal-structure-in-the-tail-fold-is-6811bd9c',
      conceptKey: 'embryonic-disc-folding-types-causes-results',
      difficulty: 'Hard', questionType: 'Developmental process',
      learningObjective: 'Place the caudal structures of the disc before the tail fold turns them over.',
      explanations: {
        A: 'The cloacal membrane is the most caudal structure after folding, not before it. The whole point of the reversal is that these two swap places, and this is the answer to the neighbouring question rather than to this one.',
        B: 'The primitive streak lies in the caudal part of the epiblast, but the connecting stalk is attached beyond it — the streak is caudal within the disc, and the stalk is caudal to the disc.',
        C: 'The primitive node is at the cranial end of the primitive streak, so it is the more cranial of the two, not the more caudal.',
        D: 'Correct. Before folding the connecting stalk, carrying the allantois, is the most caudal structure; the tail fold then swings it cranially and ventrally, leaving the cloacal membrane the most caudal.',
      },
    },
    {
      key: 'after-folding-the-most-caudal-structure-at-tail-fold-is-dep-34984edf',
      conceptKey: 'embryonic-disc-folding-types-causes-results',
      difficulty: 'Hard', questionType: 'Developmental process',
      learningObjective: 'Apply the reversal of position produced by the tail fold.',
      answerOverride: 'B',
      answerOverrideReason:
        'The books key this to the connecting stalk, which is the answer to the paired question about the position *before* folding — the two questions are printed together and their keys appear to have been carried across. The department book states the reversal explicitly: in the tail fold the connecting stalk with the allantois becomes more cranial and ventral, and the cloacal membrane becomes the most caudal. After folding the answer is therefore the cloacal membrane, option B.',
      explanations: {
        A: 'The primitive streak is regressing by this stage and is in any case never the most caudal structure — the connecting stalk was attached beyond it before the fold.',
        B: 'Correct. The tail fold carries the connecting stalk cranially and ventrally, and the cloacal membrane is left as the most caudal structure of the folded embryo.',
        C: 'The connecting stalk is the answer to the same question asked about the position before folding, and it is the option the books key this one to as well. After the fold it has moved cranially and ventrally to lie in the ventral body wall at the umbilical ring, which is the opposite end of the reversal.',
        D: 'The bucco-pharyngeal membrane is at the head end throughout. After folding it becomes the most cranial structure, which makes it the exact mirror of the answer here.',
      },
    },
    {
      key: 'tail-fold-of-the-embryo-is-limited-by-dep-book-ac-ad-ac-ad-a-c1b63c26',
      conceptKey: 'embryonic-disc-folding-types-causes-results',
      difficulty: 'Moderate', questionType: 'Developmental process',
      learningObjective: 'Name the firm structure that limits each of the two longitudinal folds.',
      explanations: {
        A: 'The notochord limits the head fold, not the tail fold. The book pairs the two limits deliberately, and swapping them is the error the question is set to find.',
        B: 'Correct. The relatively firm primitive streak limits the tail fold, as the notochord limits the head fold.',
        C: 'The yolk sac is carried by folding rather than limiting it — the lateral folds pinch it into the vitelline duct.',
        D: 'The amniotic cavity is what causes folding by expanding; something that drives a fold cannot be what stops it.',
      },
    },
    {
      key: 'notochord-is-developed-from-f09634da',
      conceptKey: 'notochord-formation-fate',
      difficulty: 'Moderate', questionType: 'Developmental process',
      learningObjective: 'Trace the notochord to the exact part of the epiblast it comes from.',
      explanations: {
        A: 'Epiblast cells at the primitive streak give the endoderm and the intra-embryonic mesoderm. The notochord comes from a more precise place — the pit at the cranial end, not the length of the streak.',
        B: 'The hypoblast is displaced by the invading epiblast and contributes nothing to the notochord. Half the wrong answers in this chapter come from giving the hypoblast work the epiblast does.',
        C: 'The notochord is not formed from mesoderm; it arises alongside it, from the same epiblast, and lies in the median plane where mesoderm is absent.',
        D: 'Correct. The prenotochordal process is a solid cord of epiblast cells from the wall of the primitive pit, which invaginates and grows cranially in the midline.',
      },
    },
    {
      key: 'neurenteric-canal-is-formed-due-to-degeneration-of-520e8ef1',
      conceptKey: 'notochord-formation-fate',
      difficulty: 'Hard', questionType: 'Developmental process',
      learningObjective: 'Name the wall whose loss opens the neurenteric canal, and say what it connects.',
      explanations: {
        A: 'Correct. The floor of the notochordal canal, fused with the endoderm beneath it, degenerates — which opens the amniotic cavity into the yolk sac through the canal.',
        B: 'The roof of the notochordal canal lies against ectoderm and persists; with the sides it becomes the notochordal plate. Losing the roof would open the canal upwards into nothing.',
        C: 'The same error as B with the wrong layer named as well. The ectoderm is above the roof and the endoderm below the floor, and only the lower pair degenerates.',
        D: 'The bucco-pharyngeal membrane is at the cranial end of the disc and breaks down much later, opening the mouth into the foregut. It has nothing to do with the neurenteric canal.',
      },
    },
    {
      key: 'one-of-the-following-is-true-regarding-the-notochord-2017-de-003a5fd4',
      conceptKey: 'notochord-formation-fate',
      difficulty: 'Moderate', questionType: 'Developmental process',
      learningObjective: 'Give the fate of the notochord and its position relative to the neural tube.',
      explanations: {
        A: 'The notochord extends from the primitive pit cranially as far as the bucco-pharyngeal membrane. The cloacal membrane is at the other end of the disc, caudal to the streak.',
        B: 'Correct. Most of the notochord degenerates; the part inside the intervertebral disc persists as the nucleus pulposus, which is the only piece of it a person keeps.',
        C: 'Cells migrating through the primitive streak give the endoderm and the intra-embryonic mesoderm. The notochord comes from the primitive pit at the cranial end of the streak — a distinction of a few cell-widths that the books examine repeatedly.',
        D: 'The notochord is ventral to the neural tube: it lies under the ectoderm it induces to become the neural plate. A student who pictures the vertebral column, with the cord behind the bodies, has the relation the right way round and has only to remember that the notochord ends up inside the bodies.',
      },
    },
    {
      key: 'gastrulation-is-9d787378',
      conceptKey: 'gastrulation-primitive-streak-and-the-three-layers-from-epiblast',
      difficulty: 'Easy', questionType: 'Developmental process',
      learningObjective: 'Define gastrulation by which disc it produces.',
      explanations: {
        A: 'Correct. Gastrulation is the transformation of the bilaminar embryonic disc into a trilaminar one.',
        B: 'The bilaminar disc is what gastrulation starts from, and it was made in the second week from the embryoblast. Chosen by students who have the two discs the right way round but the arrow reversed.',
        C: 'The chorion and the chorionic villi form in the same third week, which is why they are offered here, but they are extra-embryonic and are formed from the trophoblast, not from the disc.',
        D: 'Folding begins at the end of the third week, after gastrulation has provided it with three layers to fold. The order matters: there is nothing to fold into a gut until the endoderm exists.',
      },
    },
    {
      key: 'the-primitive-streak-rst-appears-at-the-beginning-of-the-wee-b87b6467',
      conceptKey: 'gastrulation-primitive-streak-and-the-three-layers-from-epiblast',
      difficulty: 'Moderate', questionType: 'Developmental timing',
      learningObjective: 'Date the primitive streak to the week gastrulation happens in.',
      answerOverride: 'C',
      answerOverrideReason:
        'The books key this to the first week. The department book makes gastrulation, beginning with the formation of the primitive streak in the epiblast, one of the two characteristic events of the third gestational week — and the epiblast the streak forms in does not exist until the eighth day. The first week is fertilisation, cleavage and blastocyst formation. Set to C.',
      explanations: {
        A: 'The first week is fertilisation, cleavage and the blastocyst. There is no epiblast yet, so there is nothing for a primitive streak to form in. This is the option the books key the question to, and it is a week and a half too early.',
        B: 'The second week is implantation and the bilaminar disc, which does create the epiblast. It is the strongest wrong answer here, and it stops one step short: the epiblast is made in the second week and the streak appears in it at the start of the third.',
        C: 'Correct. The primitive streak appears at the beginning of the third week, and its appearance is the beginning of gastrulation.',
        D: 'By the fourth week gastrulation is over and folding is under way. The streak is already regressing.',
      },
    },
    {
      key: 'intraembryonic-mesoderm-is-formed-between-ectoderm-and-endod-c38b93d9',
      conceptKey: 'gastrulation-primitive-streak-and-the-three-layers-from-epiblast',
      difficulty: 'Hard', questionType: 'Developmental process',
      learningObjective: 'Say where intra-embryonic mesoderm lies by knowing the three places it does not.',
      explanations: {
        A: 'At the bucco-pharyngeal membrane the ectoderm and endoderm are fused to one another, so there is no space between them for mesoderm. That fusion is what makes it a membrane.',
        B: 'The cloacal membrane is the same arrangement at the caudal end — ectoderm fused to endoderm, and no mesoderm between.',
        C: 'Correct. The intra-embryonic mesoderm lies between ectoderm and endoderm on both sides of the notochord and the neural tube.',
        D: 'The median region between the primitive node and the bucco-pharyngeal membrane is occupied by the notochord and the neural tube, so mesoderm is absent there too. All three wrong options name one of the book\'s three exceptions, which is why this question is harder than it looks: a student who has learnt only the exceptions still has to notice that none of them is the answer.',
      },
    },
    {
      key: 'neural-plate-is-a-thickened-median-region-of-0bbbcaae',
      conceptKey: 'neural-plate-and-the-ectodermal-origin-of-the-nervous-system',
      difficulty: 'Easy', questionType: 'Developmental process',
      learningObjective: 'Name the germ layer the neural plate is a thickening of.',
      answerOverride: 'C',
      answerOverrideReason:
        'None of the three printings of this question carries a key. The neural plate is a median thickening of the ectoderm, and the department book puts the central nervous system among the ectodermal derivatives on page 87. Set to C.',
      explanations: {
        A: 'The endoderm is the lowest layer and lines the gut. Nothing nervous comes from it.',
        B: 'The mesoderm lies between the other two and is where the notochord that *induces* the plate sits. Confusing the inducer with the induced is the commonest way to reach this option.',
        C: 'Correct. The neural plate is a thickening of the ectoderm in the median plane, overlying the notochord.',
        D: 'The notochord is beneath the plate and induces it, but it is a separate structure and does not thicken into it. If the plate were notochord the nervous system would be mesodermal.',
      },
    },
    {
      key: 'regarding-formation-of-central-nervous-system-mark-the-corre-c072edfa',
      conceptKey: 'neural-plate-and-the-ectodermal-origin-of-the-nervous-system',
      difficulty: 'Hard', questionType: 'Developmental process',
      learningObjective: 'Hold the order of neural tube closure and the identity of the inducer together.',
      answerOverride: 'A',
      answerOverrideReason:
        'The books print no key. Only A is true: the central nervous system is a derivative of ectoderm, which is the one statement of the four the department book itself makes, in its list of ectodermal derivatives on page 87. B, C and D are each false, and the reasons are given in their explanations.',
      explanations: {
        A: 'Correct. The central nervous system develops from ectoderm, by way of the neural plate and the neural tube.',
        B: 'A double negative hiding a false statement. The notochord does induce the overlying ectoderm to become the neural plate; that induction is the reason the plate lies exactly where the notochord does.',
        C: 'The neural groove is a depression of the neural plate. The neural crest is what is left over at the lips of the groove once the folds fuse, so it is a product of the depression and cannot be the thing depressed.',
        D: 'Closure begins in the middle of the embryo and runs both ways, so the two ends shut last — and of them the cranial neuropore closes before the caudal. Naming the caudal end as first is wrong twice: it is neither first nor an area where closure begins.',
      },
    },
    {
      key: 'epidermis-of-skin-is-derived-from-a1791b98',
      conceptKey: 'germ-layer-derivatives-ectoderm-and-endoderm',
      difficulty: 'Easy', questionType: 'Developmental process',
      learningObjective: 'Separate surface ectoderm from the neural ectoderm beside it.',
      explanations: {
        A: 'The neural crest gives the melanocytes that live in the epidermis, and sensory ganglia, and much else — but not the keratinocytes that are the epidermis itself. This is the most interesting wrong answer in the leaf, because a crest derivative really does end up in the layer.',
        B: 'The neural tube becomes the brain and spinal cord. It began as the same ectoderm, which is what makes the distinction between surface and neural ectoderm worth drawing.',
        C: 'Correct. The epidermis comes from the surface ectoderm, the part of the layer that is left once the neural plate has sunk away from it.',
        D: 'The intra-embryonic mesoderm gives the dermis beneath the epidermis, and the two are commonly answered for each other. Dermis is mesodermal, epidermis ectodermal.',
      },
    },
    {
      key: 'parenchyma-of-the-liver-is-developed-from-d5de0bdd',
      conceptKey: 'germ-layer-derivatives-ectoderm-and-endoderm',
      difficulty: 'Moderate', questionType: 'Developmental process',
      learningObjective: 'Assign the working cells of a gut-derived gland to endoderm.',
      answerOverride: 'A',
      answerOverrideReason:
        'None of the three printings of this question carries a key. The department book lists the parenchyma of the liver, pancreas, thyroid, thymus, tonsils and parathyroid among the derivatives of endoderm, as glandular epithelium. Set to A.',
      explanations: {
        A: 'Correct. The liver parenchyma is endodermal — it grows as a diverticulum from the foregut, whose lining is endoderm.',
        B: 'Ectoderm gives the epidermis, the nervous system and the two ends of the digestive tract. The liver arises from the foregut, well inside the endodermal stretch.',
        C: 'Neural crest cells migrate very widely, but they do not build glandular parenchyma. The question says parenchyma deliberately.',
        D: 'The commonest wrong answer, and it is half right: the liver\'s connective tissue, its capsule and its blood vessels are mesodermal. The parenchyma — the hepatocytes — is not, and the word "parenchyma" in the stem is what separates the two.',
      },
    },
    {
      key: 'by-em-the-cell-membrane-appears-as-0094c4a1',
      conceptKey: 'plasma-membrane-unit-membrane-em-and-thickness',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Report what the electron microscope shows rather than what the chemistry is.',
      explanations: {
        A: 'The lipid bilayer is the molecular arrangement. The electron microscope shows one more layer than that, because it stains the two rows of heads and leaves the tails between them unstained.',
        B: 'Correct. Trilaminar — two electron-dense layers with an electron-lucent layer between them — the unit membrane.',
        C: 'Unilaminar is what the membrane looks like below the magnification at which the three layers separate. It is an appearance of poor resolution, not of the membrane.',
        D: 'Pentalaminar would need two membranes with something between them, which is what a nuclear envelope shows, not a cell membrane.',
      },
    },
    {
      key: 'cell-membrane-appears-as-trilaminar-structure-because-0345e60f',
      conceptKey: 'plasma-membrane-unit-membrane-em-and-thickness',
      difficulty: 'Hard', questionType: 'Mechanism',
      learningObjective: 'Give the reason for the three-layered image rather than a true fact about the membrane.',
      explanations: {
        A: 'True of phospholipids and not an explanation. Having a head and a tail is why they form a bilayer; it is not why the picture has three layers.',
        B: 'Also true, and also not the reason. A bilayer by itself would be expected to look like two layers; the third comes from what the stain does, not from what the lipid does.',
        C: 'Correct. Osmium and other heavy metals deposit in the hydrophilic heads at both surfaces and not in the hydrophobic tails between them, so two dense lines appear with a pale line between.',
        D: '"All of the above" is tempting because A and B are both true statements. The stem asks why the appearance is trilaminar, and only C answers that question — the other two explain the bilayer, which is the thing being imaged rather than the reason for the image.',
      },
    },
    {
      key: 'trilaminar-membrane-f184b506',
      conceptKey: 'plasma-membrane-unit-membrane-em-and-thickness',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Count the dark and light lines of the unit membrane in the right order.',
      explanations: {
        A: 'Reversed. One dark line between two light ones would mean the stain sat in the tails and avoided the heads, which is the opposite of what osmium does.',
        B: 'Correct. Two dark, electron-dense lines — the stained hydrophilic heads at the two surfaces — with one light, electron-lucent line between them.',
        C: 'Two and two makes four layers, not three, and the word trilaminar in the stem rules it out before any biology is needed.',
        D: 'One and one makes two, which is the lipid bilayer counted rather than the image described.',
      },
    },
    {
      key: 'all-the-statements-concerned-to-the-trilaminar-appearance-of-520cbee7',
      conceptKey: 'plasma-membrane-unit-membrane-em-and-thickness',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Not sittable as printed.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Two of the four statements are false and the stem asks for one exception. The books key it to C, "middle layer represents unstained hydrophilic tails", which is indeed false — the tails are hydrophobic, and it is the heads that are hydrophilic and stained. But A, "it is easy to see by light microscope", is false too: at 7.5–10 nm the membrane is far below the light microscope\'s 0.2 µm resolution, which is the point of a neighbouring question in the Microscopes leaf. This is a reviewer\'s problem and not a scanner\'s — the page is legible and both options are printed as intended, so rescanning will not change anything. It needs a faculty decision about which statement was meant to be the false one, and the likeliest reading is that A was meant to say "not easy to see".',
    },
    {
      key: 'before-folding-the-most-caudal-structure-in-the-tail-fold-is-a72d0bdd',
      conceptKey: 'embryonic-disc-folding-types-causes-results',
      difficulty: 'Hard', questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'An annotated re-printing keyed to the primitive node, which is at the *cranial* end of the primitive streak and cannot be the most caudal structure of anything. The clean printing at `before-folding-the-most-caudal-structure-in-the-tail-fold-is-6811bd9c`, asked twice as often, is keyed to the connecting stalk and is live in this file.',
    },
    {
      key: 'before-folding-the-most-caudal-structure-in-the-tail-fold-is-f4912515',
      conceptKey: 'embryonic-disc-folding-types-causes-results',
      difficulty: 'Hard', questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The stem has swallowed option A and only two options survive. Clean and keyed at `before-folding-the-most-caudal-structure-in-the-tail-fold-is-6811bd9c`.',
    },
    {
      key: 'after-folding-the-most-caudal-structure-at-tail-fold-is-4363fc0d',
      conceptKey: 'embryonic-disc-folding-types-causes-results',
      difficulty: 'Hard', questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option C, the connecting stalk, was lost, leaving three. The other printing of this question — `after-folding-the-most-caudal-structure-at-tail-fold-is-dep-34984edf` — has the full four options and is live with its answer overridden, so nothing is lost; a rescan would only confirm the missing option.',
    },
    {
      key: 'concerning-the-folding-of-the-embryonic-disc-select-the-corr-695627d7',
      conceptKey: 'embryonic-disc-folding-types-causes-results',
      difficulty: 'Hard', questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Damaged twice, once by the scanner and once by the examiner. The stem has swallowed option A — "(2023 - 2022) ad Ac a- It is caused by expansion of the yolk sac cavity" — and the printed key, B, says folding "is of two types only head and tail folds", which the department book contradicts: folding is cephalo-caudal *and* transverse, giving head, tail and two lateral folds. The only defensible option left is D, that folding is limited by the notochord, and that is true of the head fold rather than of folding as a whole. A rescan repairs the stem; deciding what the question should be keyed to needs a reviewer.',
    },
    {
      key: 'neurenteric-canal-is-formed-due-to-degeneration-of-dep-book-7afe36a7',
      conceptKey: 'notochord-formation-fate',
      difficulty: 'Hard', questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'An annotated re-printing keyed to the roof of the notochordal canal. The book is explicit that it is the floor, together with the endoderm fused to it, whose degeneration opens the canal — the roof survives as part of the notochordal plate. The clean printing at `neurenteric-canal-is-formed-due-to-degeneration-of-520e8ef1`, asked twice as often, is keyed correctly and is live.',
    },
    {
      key: 'notochord-is-developed-from-dep-book-2024-em-em-em-em-em-d1ea0b43',
      conceptKey: 'notochord-formation-fate',
      difficulty: 'Moderate', questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'An annotated duplicate — "(DEP BOOK - 2024) em em em em em" in the stem and pencil marks in two options. Its key agrees with the clean printing at `notochord-is-developed-from-f09634da`, which is asked twice as often and is live.',
    },
    {
      key: 'gastrulation-is-dep-book-2ecc8237',
      conceptKey: 'gastrulation-primitive-streak-and-the-three-layers-from-epiblast',
      difficulty: 'Easy', questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A "(DEP BOOK)"-annotated duplicate with no key of its own. The clean printing at `gastrulation-is-9d787378` carries the same four options and is live.',
    },
    {
      key: 'intraembryonic-mesoderm-is-formed-between-ectoderm-and-endod-9c02d2ba',
      conceptKey: 'gastrulation-primitive-streak-and-the-three-layers-from-epiblast',
      difficulty: 'Hard', questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'An annotated duplicate — "(DEP BOOK) em em em" in the stem, pencil marks in option D. Its key agrees with the cleaner printing at `intraembryonic-mesoderm-is-formed-between-ectoderm-and-endod-c38b93d9`, which is live.',
    },
    {
      key: 'intraembryonic-mesoderm-is-formed-between-ectoderm-and-endod-c529e945',
      conceptKey: 'gastrulation-primitive-streak-and-the-three-layers-from-epiblast',
      difficulty: 'Hard', questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The stem has swallowed option A and only two options survive, one of which is the answer. Live and keyed at `intraembryonic-mesoderm-is-formed-between-ectoderm-and-endod-c38b93d9`.',
    },
    {
      key: 'neural-plate-is-a-thickened-median-region-of-a-endoderm-4732175e',
      conceptKey: 'neural-plate-and-the-ectodermal-origin-of-the-nervous-system',
      difficulty: 'Easy', questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The stem has swallowed option A and only three options survive. Its key, C for ectoderm, is right and is the reason the override on the clean printing at `neural-plate-is-a-thickened-median-region-of-0bbbcaae` can be made with confidence.',
    },
    {
      key: 'neural-plate-is-a-thickened-median-region-of-dep-book-9f1a467a',
      conceptKey: 'neural-plate-and-the-ectodermal-origin-of-the-nervous-system',
      difficulty: 'Easy', questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A "(DEP BOOK)"-annotated duplicate with no key. The clean printing at `neural-plate-is-a-thickened-median-region-of-0bbbcaae` is live with a supplied answer.',
    },
    {
      key: 'one-of-the-followings-is-not-a-part-of-intraembryonic-mesode-29a6885b',
      conceptKey: 'gastrulation-primitive-streak-and-the-three-layers-from-epiblast',
      difficulty: 'Moderate', questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The stem has swallowed two of its own options — "(2022) Ac P a- Intermediate mesoderm. P Vi b- Paraxial mesoderm. y" — and the printed key is wrong besides. It is keyed to the lateral plate mesoderm, which is one of the three parts of the intra-embryonic mesoderm; the one that is not is the amnioblast, which lines the amniotic cavity and is not mesoderm at all. This is the only printing of a good question, and a rescan of the stem alone recovers it with D as the answer.',
    },
    {
      key: 'parenchyma-of-the-liver-is-developed-from-a-endoderm-d934e750',
      conceptKey: 'germ-layer-derivatives-ectoderm-and-endoderm',
      difficulty: 'Moderate', questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The stem has swallowed option A, which is the answer, so the question gives itself away. The clean printing at `parenchyma-of-the-liver-is-developed-from-d5de0bdd` is live.',
    },
    {
      key: 'parenchyma-of-the-liver-is-developed-from-dep-book-ac-p-a-en-25be9c9e',
      conceptKey: 'germ-layer-derivatives-ectoderm-and-endoderm',
      difficulty: 'Moderate', questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A third printing whose stem has swallowed both option A and option B along with the "(DEP BOOK)" annotation. Live at `parenchyma-of-the-liver-is-developed-from-d5de0bdd`.',
    },
    {
      key: 'tail-fold-of-the-embryo-is-limited-by-a3244e1a',
      conceptKey: 'embryonic-disc-folding-types-causes-results',
      difficulty: 'Moderate', questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option C, the yolk sac, was lost, leaving three, and there is no key. The other printing, `tail-fold-of-the-embryo-is-limited-by-dep-book-ac-ad-ac-ad-a-c1b63c26`, has the full option set and a correct key and is live.',
    },
    {
      key: 'the-de-nitive-yolk-sac-develops-during-dep-book-ac-ad-ac-ad-aa472d7d',
      conceptKey: 'gastrulation-primitive-streak-and-the-three-layers-from-epiblast',
      difficulty: 'Moderate', questionType: 'Developmental timing',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'No correct option is present. The department book puts the transformation of the primary into the secondary — definitive — yolk sac on the thirteenth day, in the second week, and the four options offered are the first, third, fourth and fifth weeks. Either an option was lost and replaced or the question was printed without its answer; the row cannot be sat either way. A rescan of the page is needed to say which, and this is the one row in this leaf whose defect is not a duplicate, a swallowed option or a mis-set key.',
    },
    {
      key: 'one-of-the-following-are-paired-structures-in-the-embryo-14f7f5b7',
      conceptKey: 'paraxial-mesoderm-somite-derivatives',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Separate the paired structures of the early embryo from the median, unpaired ones.',
      answerOverride: 'a',
      answerOverrideReason: 'The 2020 paper printed no key and the recovered answer sheet does not cover this source, so the answer comes from the department book, which counts somites in pairs throughout \u2014 4 occipital, 8 cervical, 12 thoracic, 5 lumbar, 5 sacral and 8 to 10 coccygeal pairs, three pairs separating each day \u2014 because the paraxial mesoderm lies on both sides of the notochord and neural tube and segments on each side. The other three options are single median structures.',
      explanations: {
        a: 'Correct. The paraxial mesoderm lies on both sides of the midline, so its segments come in pairs; the book counts somites in pairs from the first pair of occipital somites on the twentieth day onwards.',
        b: 'The bucco-pharyngeal membrane is a single median structure, one of the two places where ectoderm and endoderm fuse with no mesoderm between them. There is one of it, at the cranial end of the disc.',
        c: 'The pericardial bulge is a single midline swelling, the developing heart lifting the ventral surface of the embryo. Students pair it because the heart later has two sides, but the bulge itself is one.',
        d: 'The allantois is a single diverticulum from the caudal wall of the yolk sac into the connecting stalk. Like the other two distractors it is median and unpaired, and it is offered because it is the least familiar of the four.',
      },
    },
    {
      key: 'neural-tube-is-formed-from-the-following-cells-61c7f665',
      conceptKey: 'neural-plate-and-the-ectodermal-origin-of-the-nervous-system',
      difficulty: 'Easy', questionType: 'Developmental process',
      learningObjective: 'Give the germ layer the neural tube comes from, and say what each of the other layers offered makes instead.',
      answerOverride: 'c',
      answerOverrideReason: 'The 2020 paper printed no key and the recovered answer sheet does not cover this source, so the answer comes from the department book. The book derives the whole nervous system from the neural plate, a thickened median region of the ectoderm overlying the notochord, which folds into the neural tube; the endoderm and the two mesoderms make no part of it.',
      explanations: {
        a: 'Endoderm makes the epithelial lining of the gut and its glands. It lies on the opposite face of the disc from the neural plate, and a student picking it has usually confused the notochord\u2019s induction \u2014 which comes from below \u2014 with the source of the tube itself.',
        b: 'Lateral plate mesoderm splits into somatic and splanchnic layers and lines the body cavity; the neural tube is not mesodermal at all. It is offered because mesoderm is the layer that makes most of the body\u2019s bulk.',
        c: 'Correct. The neural plate is a thickened median region of ectoderm; its edges rise as neural folds, meet and fuse to make the neural tube, and that tube becomes the brain and the spinal cord.',
        d: 'Extra-embryonic mesoderm is outside the embryonic disc altogether \u2014 it makes the connecting stalk, the chorion and the linings of the cavities \u2014 so it can form no part of the embryo\u2019s own nervous system.',
      },
    },
  ],
}
