/**
 * `101 ISK > Anatomy > General Embryology > Second Week of Development` — the
 * question books' MCQs.
 *
 * Forty-four rows, twenty live. The chapter the books examine hardest in the
 * whole of General Embryology, and the one where their printed keys are least
 * reliable: eight live rows here have their answers overridden, and eleven of
 * the twenty-four exclusions are annotated re-printings whose keys point at an
 * option the department book contradicts.
 *
 * The pattern is worth stating once. A "(DEP BOOK)" printing of a question in
 * this leaf is keyed correctly about a third of the time. Where a clean printing
 * exists the annotated one is excluded against it. Where the annotated printing
 * is the only complete option set — which happens six times, because the clean
 * copies of those questions lost an option to the scanner — it is kept and its
 * answer overridden, with the reasoning written out. Nothing is absorbed
 * silently in either direction.
 *
 * Five concepts are reused verbatim, with their own modulePaths intact:
 * `chorionic-villi-types-development`, `implantation-abnormal-sites`,
 * `notochord-formation-fate` and `paraxial-mesoderm-somite-derivatives` from the
 * written papers, and `embryonic-disc-folding-types-causes-results`, also from
 * the papers, which carries the one stomodeum row. The last three are strays:
 * the topic clustering filed a notochord question, a somite question and a
 * stomodeum question under this leaf although the book teaches all three later.
 *
 * Five are minted, and they divide the chapter the way the book does — where the
 * blastocyst implants and how; what happens on which day; what the embryoblast
 * becomes; what the extra-embryonic mesoderm becomes; and what the placental
 * barrier is made of. The day-by-day one is minted separately from the others on
 * purpose: four rows of this leaf ask nothing but dates, and a student can know
 * that the amniotic cavity forms between amnioblast and epiblast without knowing
 * that it does so on the eighth day.
 */
import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Second Week of Development',
  modulePath: '101 ISK > Anatomy > General Embryology > Second Week of Development',
  articleId: 'ART-101-ANA-IMPLANTATION',

  concepts: [
    {
      key: 'implantation-normal-site-and-the-syncytiotrophoblast-that-achieves-it',
      label: 'The blastocyst implants by its embryonic pole into the upper posterior wall of the uterus, and it is the syncytiotrophoblast that eats its way in',
      definition:
        'Implantation is the process by which the blastocyst becomes embedded in the superficial layers of the endometrium. It happens normally in the endometrium of the upper part of the posterior wall of the uterus, just below the fundus, and less often in the upper part of the anterior wall; the endometrium at the time is in its secretory phase, thickened, with spiral glands full of secretion and spiral arteries with increased arterio-venous anastomosis. It begins on the seventh day with adhesion of the blastocyst by its embryonic pole. The trophoblast there proliferates into a new outer layer whose cells have no cell membranes between them — the syncytiotrophoblast — leaving an inner cytotrophoblast of separate cells. The syncytiotrophoblast makes the proteolytic enzyme that erodes the endometrium and opens the implantation cavity; the blastocyst sinks into it and is completely embedded by the ninth day, the breach in the endometrial epithelium being plugged by a fibrin clot which the epithelium grows over by the eleventh, completing implantation. On the ninth day lacunar spaces appear in the syncytiotrophoblast, and by the eleventh and twelfth they fill with maternal blood to open the utero-placental circulation.',
      objective:
        'Give the normal site of implantation, name the pole that adheres, and say which trophoblastic layer produces the enzymes and the lacunae.',
      pitfall:
        'Attributing the proteolytic enzymes to the embryonic disc or to the cytotrophoblast. It is the syncytiotrophoblast, the outer layer without cell membranes, that erodes the endometrium and in which the lacunae later open — the disc is not even formed when erosion begins.',
      subject: 'dev',
      primary: 'DIS-EMB-T01',
      secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > Second Week of Development',
      type: 'developmental_process',
      aliases: ['Syncytiotrophoblast', 'Cytotrophoblast', 'Implantation cavity', 'Lacunar stage'],
    },
    {
      key: 'second-week-day-by-day-timetable',
      label: 'The second week runs to a timetable: day 7 implantation and two trophoblasts, day 8 the amniotic cavity, day 9 the primary yolk sac and lacunae, day 11–12 extra-embryonic mesoderm, day 13 the chorionic cavity',
      definition:
        'The department book gives the second week day by day. On the seventh day the blastocyst begins implantation and the trophoblast differentiates into inner cytotrophoblast and outer syncytiotrophoblast, beginning at the embryonic pole. On the eighth day the blastocyst is partly embedded, the hypoblast forms, and the amniotic cavity appears within the rest of the inner cell mass, separating amnioblast from epiblast and completing the bilaminar disc. On the ninth and tenth the blastocyst is completely embedded, the breach is plugged by a fibrin clot, Heuser\'s membrane forms from the hypoblast and turns the blastocele into the primary yolk sac, and lacunar spaces appear in the syncytiotrophoblast. On the eleventh and twelfth the endometrial epithelium covers the clot and completes implantation, the lacunae fill with maternal blood as the utero-placental circulation, and extra-embryonic mesoderm appears from the yolk sac wall. On the thirteenth the spaces in that mesoderm run together into one chorionic cavity, the mesoderm divides into somatic and splanchnic, the secondary yolk sac replaces the primary, the allantois buds from it into the connecting stalk, and the primary chorionic villi begin.',
      objective:
        'Place each event of the second week on the day the book gives it, and say what the week does not yet produce.',
      pitfall:
        'Letting a third-week event into the second. The disc is bilaminar at the end of this week and does not become trilaminar until gastrulation, and the somites do not begin until the twentieth day — both are offered as second-week events in these books, and both are a week early.',
      subject: 'dev',
      primary: 'DIS-EMB-T01',
      secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > Second Week of Development',
      type: 'developmental_process',
      aliases: ['Week of twos', 'Heuser\'s membrane', 'Primary yolk sac'],
    },
    {
      key: 'bilaminar-disc-amnioblast-and-epiblast',
      label: 'The embryoblast splits into epiblast and hypoblast, and the cavity that opens above the epiblast is roofed by amnioblast',
      definition:
        'On the eighth day the cells of the embryoblast facing the blastocele become cuboidal and form the hypoblast. A cavity then opens within the remainder of the inner cell mass — the amniotic cavity — separating two populations: the amnioblast, flat cells in contact with the cytotrophoblast which form the roof of the cavity and are the first source of amniotic fluid, and the epiblast, tall columnar cells in contact with the hypoblast which form its floor. Epiblast and hypoblast together are the bilaminar embryonic disc. The epiblast is the source of all three germ layers of the trilaminar disc formed the following week: ectoderm, intra-embryonic mesoderm and endoderm all come from it, and the hypoblast is displaced rather than converted.',
      objective:
        'Name the two layers of the bilaminar disc and the two cell populations the amniotic cavity separates, and say which of them all three germ layers come from.',
      pitfall:
        'Making the hypoblast the source of the endoderm. It looks like the lower layer becoming the lower layer, and it is wrong — the epiblast supplies all three, which the book states as a point in its own right.',
      subject: 'dev',
      primary: 'DIS-EMB-T01',
      secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > Second Week of Development',
      type: 'structural_description',
      aliases: ['Amnioblast', 'Epiblast', 'Hypoblast', 'Bilaminar embryonic disc'],
    },
    {
      key: 'extraembryonic-mesoderm-somatic-splanchnic-and-the-chorion',
      label: 'Extra-embryonic mesoderm splits into a somatic layer lining the cytotrophoblast and a splanchnic layer covering the yolk sac, and the somatic layer becomes the inner layer of the chorion',
      definition:
        'Extra-embryonic mesoderm appears on the eleventh and twelfth days, from the wall of the yolk sac, between the cytotrophoblast outside and the embryonic disc with its two cavities inside. Spaces open in it and run together on the thirteenth day into the chorionic cavity — the extra-embryonic coelom — which splits the mesoderm in two. The somatic, or somatopleuric, layer lines the cytotrophoblast and covers the amniotic cavity; the splanchnic, or splanchnopleuric, layer covers the secondary yolk sac. The chorion is the wall of the chorionic vesicle and has three layers, from within outwards: somatic extra-embryonic mesoderm, cytotrophoblast and syncytiotrophoblast. What is left of the mesoderm bridging the cavity, connecting the chorion to the caudal end of the embryonic disc, is the connecting stalk.',
      objective:
        'Say what each division of the extra-embryonic mesoderm lines or covers, and name the three layers of the chorion in order from inside out.',
      pitfall:
        'Pairing somatic with the yolk sac. The rule is that somatic goes with the outer wall and the amnion, splanchnic with the gut and the yolk sac — the same pairing that later gives somatopleuric mesoderm the body wall and splanchnopleuric the gut.',
      subject: 'dev',
      primary: 'DIS-EMB-T01',
      secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > Second Week of Development',
      type: 'structural_description',
      aliases: ['Somatopleuric mesoderm', 'Splanchnopleuric mesoderm', 'Chorion', 'Connecting stalk', 'Chorionic cavity'],
    },
    {
      key: 'placental-barrier-early-and-late',
      label: 'The early placental barrier has four layers and the late one has two, because the cytotrophoblast and the villus mesoderm thin away',
      definition:
        'The placental barrier is what maternal blood in the intervillous space must cross to reach fetal blood in the villus. Early it has four layers: syncytiotrophoblast, cytotrophoblast, the connective tissue of the villus core, and the endothelium of the fetal capillary. As pregnancy advances the cytotrophoblast disappears from most of the villus and the core connective tissue is reduced, and the capillaries move to lie against the surface, so that late in pregnancy the barrier is two layers — syncytiotrophoblast and the endothelium of the fetal blood vessels. The thinning is what lets exchange keep pace with a fetus whose demands are rising fastest at the end.',
      objective:
        'Name the layers of the placental barrier early and late in pregnancy, and say which layers are lost and why that matters.',
      pitfall:
        'Keeping the cytotrophoblast in the late barrier. It is the layer that goes, and a barrier described as syncytiotrophoblast plus cytotrophoblast is the early one with two layers already dropped rather than the late one.',
      subject: 'dev',
      primary: 'DIS-EMB-T02',
      secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > Fetal Membranes',
      type: 'structure_function_relationship',
      aliases: ['Placental membrane', 'Materno-fetal barrier'],
    },
    {
      key: 'chorionic-villi-types-development',
      label: 'Chorionic villi run primary to secondary to tertiary, and the chorion that carries them splits into frondosum and laeve',
      definition:
        'Chorionic villi are projections of the chorion that begin at the end of the second week and develop through the third. A primary villus is a core of proliferating cytotrophoblast pushing the syncytiotrophoblast; it becomes a secondary villus when somatic extra-embryonic mesoderm enters the core, and a tertiary villus when fetal blood vessels appear in that mesoderm, the villi then separated by intervillous spaces full of maternal blood. A tertiary villus has a stem (anchoring) part running between chorion and decidua basalis and free (floating) side branches where exchange happens. The chorion carrying well-developed villi is the chorion frondosum, which persists as the fetal part of the placenta; the rest is chorion laeve, whose villi degenerate.',
      objective: 'Name the three types of chorionic villus and what changes between them, and give the fate of chorion frondosum and chorion laeve.',
      pitfall: 'Calling a villus tertiary as soon as it has a mesodermal core. Mesoderm alone makes it secondary; it is tertiary only once vessels have formed in that mesoderm.',
      subject: 'dev',
      primary: 'DIS-EMB-T02',
      secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > Fetal Membranes',
      type: 'developmental_process',
      aliases: ['Chorion frondosum and chorion laeve'],
    },
    {
      key: 'implantation-abnormal-sites',
      label: 'Implantation goes wrong either low inside the uterus or entirely outside it',
      definition:
        'Abnormal implantation is of two kinds. Abnormal intrauterine implantation is in the lower uterine segment: placenta previa, where the placenta is related to the internal os, in complete or total, partial and marginal forms; and low-lying placenta, where the lower edge lies within two centimetres of the internal os. Ectopic pregnancy is implantation outside the uterine cavity — tubal, in the ampulla, isthmus or intramural part; ovarian, on the surface of the ovary; or omental, on the surface of the peritoneum.',
      objective: 'Classify the abnormal sites of implantation into intrauterine and ectopic and name the sites under each.',
      pitfall: 'Treating placenta previa as ectopic. It is inside the uterus; what is abnormal is how low, and the danger is obstructed labour and bleeding rather than rupture.',
      subject: 'dev',
      primary: 'DIS-EMB-T01',
      secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > First Week of Development',
      type: 'clinical_correlation',
      aliases: ['Ectopic pregnancy', 'Placenta previa'],
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
      key: 'paraxial-mesoderm-somite-derivatives',
      label: 'Each somite splits into a sclerotome and a dermomyotome, and those become bone, dermis and muscle',
      definition:
        'Somites are the transverse segments of the paraxial mesoderm, which lies on both sides of the notochord and neural tube. Each somite divides obliquely into a ventromedial sclerotome and a dorsolateral dermomyotome. The sclerotome cells migrate medially to surround the notochord and neural tube and form the vertebrae and intervertebral discs. The dermomyotome subdivides into a dermatome, which forms the dermis of the skin, and a myotome, which forms the skeletal muscles of the body; the dorsal part of the dermomyotome forms the muscle and dermis of the back of the vertebral column and its ventral part those of the rest of the body, matching the dorsal and ventral primary rami of the spinal nerve.',
      objective: 'Describe how a somite differentiates into sclerotome and dermomyotome and name what each derivative forms.',
      pitfall: 'Reading "dermatome" here as the skin area of a spinal nerve. In the somite it is the part of the dermomyotome that makes dermis — although the two senses are related, because the dorsal and ventral parts follow the two primary rami.',
      subject: 'dev',
      primary: 'DIS-EMB-T01',
      secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > Third Week of Development',
      type: 'developmental_process',
      aliases: ['Sclerotome', 'Dermomyotome', 'Myotome', 'Paraxial mesoderm'],
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
  ],

  questions: [
    {
      key: 'early-amniotic-cavity-separates-between-7d4d9cdc',
      conceptKey: 'bilaminar-disc-amnioblast-and-epiblast',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Name the two cell populations the amniotic cavity opens between.',
      explanations: {
        A: 'The amnioblast lies against the cytotrophoblast, but the cavity does not open between them — it opens on the other side of the amnioblast. This option describes a contact rather than a separation.',
        B: 'Correct. The cavity appears within the inner cell mass and separates the amnioblast, which roofs it, from the epiblast, which floors it.',
        C: 'The hypoblast is on the far side of the epiblast, facing the blastocele. The amniotic cavity never touches it — the epiblast is between the two.',
        D: 'The yolk sac is below the hypoblast and is separated from the amniotic cavity by the whole thickness of the bilaminar disc. This is the answer a student gives when they picture the two cavities as neighbours rather than as the two sides of the disc.',
      },
    },
    {
      key: 'the-source-of-the-three-germ-layers-is-4fc8b443',
      conceptKey: 'bilaminar-disc-amnioblast-and-epiblast',
      difficulty: 'Moderate', questionType: 'Developmental process',
      learningObjective: 'Attribute all three germ layers to one layer of the bilaminar disc.',
      explanations: {
        A: 'The hypoblast is displaced by epiblast cells invaginating through the primitive streak; it contributes nothing to the trilaminar disc. It is the intuitive answer — lower layer becomes lower layer — and the book states the contrary as a point in its own right.',
        B: 'Correct. Ectoderm, intra-embryonic mesoderm and endoderm all come from the epiblast.',
        C: 'The extra-embryonic mesoderm is outside the disc, lining the cytotrophoblast and covering the yolk sac. It becomes the chorion and the connecting stalk, not the embryo.',
        D: 'The cytotrophoblast is trophoblast, and the trophoblast never contributes to the embryo proper at all — it makes the fetal part of the placenta.',
      },
    },
    {
      key: 'cells-of-the-embryoblast-form-the-hypoblast-and-epiblast-whi-6310b6fb',
      conceptKey: 'bilaminar-disc-amnioblast-and-epiblast',
      difficulty: 'Moderate', questionType: 'Developmental process',
      learningObjective: 'Name the cavity the embryoblast itself produces.',
      answerOverride: 'D',
      answerOverrideReason:
        'The books print no key. Of the four cavities offered, only the amniotic cavity forms within the inner cell mass; the chorionic cavity forms in the extra-embryonic mesoderm, the blastocele is already there before the embryoblast divides, and the antrum belongs to the ovarian follicle.',
      explanations: {
        A: 'The chorionic cavity is the extra-embryonic coelom, and it opens in the extra-embryonic mesoderm on the thirteenth day — outside the disc, and five days later.',
        B: 'The antrum is the fluid-filled cavity of the ovarian follicle, before ovulation. It has nothing to do with the embryoblast; it is offered because it is another named cavity of the same reproductive story.',
        C: 'The blastocele is the cavity that made the blastocyst a blastocyst, and it existed before the embryoblast split into epiblast and hypoblast. It is later converted into the primary yolk sac, not into a new cavity.',
        D: 'Correct. The amniotic cavity opens within the inner cell mass on the eighth day, separating amnioblast from epiblast.',
      },
    },
    {
      key: 'the-earliest-source-of-amniotic-fluid-is-720ff8b0',
      conceptKey: 'bilaminar-disc-amnioblast-and-epiblast',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Order the sources of amniotic fluid and name the first.',
      explanations: {
        A: 'The epiblast forms the floor of the amniotic cavity and goes on to become the embryo. It is not secretory, and the roof rather than the floor is what makes the fluid.',
        B: 'Diffusion of fluid from maternal blood is the main source later, once there is a placenta to diffuse across. There is no such circulation at the eighth day.',
        C: 'Fetal urine is added only from about the fifth month, when the kidneys begin to work. It is the last source to arrive, not the earliest, and it is the commonest wrong answer because it is the one students remember.',
        D: 'Correct. The amnioblast cells, which form the roof of the amniotic cavity, are the first source of amniotic fluid.',
      },
    },
    {
      key: 'regarding-implantation-ebe480e4',
      conceptKey: 'implantation-normal-site-and-the-syncytiotrophoblast-that-achieves-it',
      difficulty: 'Moderate', questionType: 'Developmental process',
      learningObjective: 'Give the site, the day and the agent of implantation together.',
      explanations: {
        A: 'Implantation starts on the seventh day and is complete on the eleventh. The ninth day is the day the blastocyst is completely embedded, which is a stage within implantation rather than its beginning — a distinction of two days that these books ask about repeatedly.',
        B: 'The blastocyst starts implantation. The chorionic vesicle is what the conceptus becomes at the end of the second week, after implantation is over.',
        C: 'Correct. Implantation occurs normally in the upper part of the posterior wall of the uterus, just below the fundus.',
        D: 'The proteolytic enzymes are made by the syncytiotrophoblast. As printed here the option stops at "proteolytic enzymes" without naming a source, which makes it a true statement about the mechanism and not a false one — but it is not the site, and the stem is answered by C.',
      },
    },
    {
      key: 'the-common-site-of-implantation-in-the-uterus-is-at-2023-202-e9437023',
      conceptKey: 'implantation-normal-site-and-the-syncytiotrophoblast-that-achieves-it',
      difficulty: 'Easy', questionType: 'Developmental process',
      learningObjective: 'Name the wall and the level at which the blastocyst normally implants.',
      explanations: {
        A: 'The anterior wall of the fundus is the second commonest site and the book says so, which makes it the strongest distractor: it is right about the level and wrong about the wall.',
        B: 'Correct. The upper part of the posterior wall, just below the fundus, is the normal site.',
        C: 'The cervix is below the internal os altogether. Implantation there is a cervical ectopic pregnancy, the rarest and most dangerous kind.',
        D: 'The posterior wall of the lower part of the body is the lower uterine segment, where implantation gives placenta previa.',
      },
    },
    {
      key: 'during-the-second-week-of-development-the-trophoblast-differ-faf89e56',
      conceptKey: 'implantation-normal-site-and-the-syncytiotrophoblast-that-achieves-it',
      difficulty: 'Easy', questionType: 'Developmental process',
      learningObjective: 'Name the two layers the trophoblast splits into.',
      explanations: {
        A: 'Correct. The trophoblast differentiates into an inner cytotrophoblast of separate cells and an outer syncytiotrophoblast whose cells have no membranes between them.',
        B: 'A true statement about the second week, but not an answer to the stem: the question asks what the trophoblast differentiates *into*, and this names what the blastocyst does rather than a pair of layers.',
        C: 'Intra-embryonic and extra-embryonic mesoderm are mesoderm, not trophoblast, and the intra-embryonic kind does not exist until the third week.',
        D: 'The secondary yolk sac does form in the second week, on the thirteenth day, but from the hypoblast lining the primary yolk sac — not from the trophoblast.',
      },
    },
    {
      key: 'on-day-nine-trophoblastic-lacunae-and-maternal-sinusoids-beg-89e8faf5',
      conceptKey: 'implantation-normal-site-and-the-syncytiotrophoblast-that-achieves-it',
      difficulty: 'Moderate', questionType: 'Developmental timing',
      learningObjective: 'Place the lacunae in the layer that erodes the endometrium.',
      explanations: {
        A: 'Correct. The lacunar spaces appear within the syncytiotrophoblast on the ninth day, and fill with maternal blood two days later as the utero-placental circulation.',
        B: 'The extra-embryonic coelom is a cavity in the extra-embryonic mesoderm, which does not exist until the eleventh or twelfth day — two days after the lacunae.',
        C: 'The splanchnopleuric extra-embryonic mesoderm covers the yolk sac and is a thirteenth-day structure, deep inside the conceptus rather than at its eroding surface.',
        D: 'The exocoelomic (Heuser\'s) membrane lines the primary yolk sac and is hypoblast-derived. It faces inwards, away from the maternal blood the lacunae are opening onto.',
      },
    },
    {
      key: 'amniotic-cavity-starts-formation-at-the-dep-book-fe3e505c',
      conceptKey: 'second-week-day-by-day-timetable',
      difficulty: 'Moderate', questionType: 'Developmental timing',
      learningObjective: 'Date the appearance of the amniotic cavity.',
      explanations: {
        A: 'The seventh day is when implantation begins and the trophoblast splits in two. The inner cell mass has not yet divided, so there is nothing for a cavity to open within.',
        B: 'Correct. The amniotic cavity forms on the eighth day, at the same time as the hypoblast and the bilaminar disc.',
        C: 'The ninth day brings complete embedding, Heuser\'s membrane, the primary yolk sac and the lacunae — the next entry on the timetable, and the commonest wrong answer for that reason.',
        D: 'By the tenth day the amniotic cavity is already there. The four options are consecutive days, so nothing but the timetable itself separates them.',
      },
    },
    {
      key: 'one-of-the-following-is-an-event-of-the-9th-day-of-pregnancy-35412c8d',
      conceptKey: 'second-week-day-by-day-timetable',
      difficulty: 'Hard', questionType: 'Developmental timing',
      learningObjective: 'Assign four second-week events to their days.',
      answerOverride: 'B',
      answerOverrideReason:
        'This printing carries no key. Of the four events offered, only the primary yolk sac belongs to the ninth day: the book places the hypoblast on the eighth, the extra-embryonic mesoderm on the eleventh and twelfth, and the primary chorionic villi at the end of the week, after the thirteenth.',
      explanations: {
        A: 'The hypoblast forms on the eighth day, with the amniotic cavity. It is one day early, and it is the closest of the three wrong answers.',
        B: 'Correct. Heuser\'s membrane forms on the ninth day and converts the blastocele into the primary yolk sac, alongside complete embedding and the appearance of the lacunae.',
        C: 'The extra-embryonic mesoderm appears on the eleventh and twelfth days, from the wall of the yolk sac — so it needs the yolk sac of option B to exist first.',
        D: 'The primary chorionic villi begin after the thirteenth day, at the very end of the second week. They are four days late for this stem.',
      },
    },
    {
      key: 'one-of-the-following-statements-is-wrong-during-the-second-w-7e758a6f',
      conceptKey: 'second-week-day-by-day-timetable',
      difficulty: 'Moderate', questionType: 'Developmental timing',
      learningObjective: 'Keep the third week\'s trilaminar disc out of the second.',
      answerOverride: 'C',
      answerOverrideReason:
        'The books print no key. Three of the four statements are events the department book places in the second week; the trilaminar disc is not one of them — gastrulation is a third-week event, and the disc is bilaminar throughout the second.',
      explanations: {
        A: 'True of the second week, so not the wrong one. Implantation begins on the seventh day and is complete on the eleventh.',
        B: 'True of the second week, so not the wrong one. The trophoblast splits into cytotrophoblast and syncytiotrophoblast on the seventh day.',
        C: 'The wrong one, and the answer. The inner cell mass becomes a *bilaminar* disc in the second week — epiblast and hypoblast. The third layer arrives with gastrulation in the third week, and the single word "trilaminar" is the whole of the error.',
        D: 'True of the second week, so not the wrong one. The amniotic cavity forms on the eighth day.',
      },
    },
    {
      key: 'somatic-extraembryonic-mesoderm-dep-book-14e3f22a',
      conceptKey: 'extraembryonic-mesoderm-somatic-splanchnic-and-the-chorion',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Say what the somatic layer of extra-embryonic mesoderm lines.',
      explanations: {
        A: 'The connecting stalk is what is left of the extra-embryonic mesoderm bridging the chorionic cavity, not the somatic layer as such. It is a remnant of the whole mesoderm rather than one of its two divisions.',
        B: 'Covering the yolk sac is what the splanchnic layer does. Somatic and splanchnic are asked as a pair in these books, and this is the other half of the pair.',
        C: 'Correct. The somatic layer lines the cytotrophoblast, and with the cytotrophoblast and syncytiotrophoblast makes the three layers of the chorion.',
        D: 'The syncytiotrophoblast is the outermost layer, with the cytotrophoblast between it and the mesoderm. The mesoderm cannot line it without passing through the cytotrophoblast first.',
      },
    },
    {
      key: 'splanchnic-extraembryonic-mesoderm-4d303507',
      conceptKey: 'extraembryonic-mesoderm-somatic-splanchnic-and-the-chorion',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Say what the splanchnic layer of extra-embryonic mesoderm covers.',
      explanations: {
        A: 'The amniotic cavity is covered by the somatic layer, along with the lining of the cytotrophoblast. This is the pair reversed.',
        B: 'Correct. The splanchnic layer covers the secondary yolk sac — splanchnic goes with the gut and its derivatives throughout embryology, and the yolk sac is the gut\'s ancestor.',
        C: 'Lining the cytotrophoblast is the somatic layer\'s work.',
        D: 'Nothing lines the syncytiotrophoblast from within except the cytotrophoblast. Both this and option C describe the outer wall, which is the somatic side of the split.',
      },
    },
    {
      key: 'is-the-middle-layer-of-chorion-c2980524',
      conceptKey: 'extraembryonic-mesoderm-somatic-splanchnic-and-the-chorion',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Order the three layers of the chorion from inside out.',
      explanations: {
        A: 'Correct. The chorion is somatic extra-embryonic mesoderm, cytotrophoblast and syncytiotrophoblast from within outwards, so the cytotrophoblast is the middle layer.',
        B: 'The syncytiotrophoblast is the outermost layer, the one in contact with the decidua and with maternal blood.',
        C: 'The somatic extra-embryonic mesoderm is the innermost layer, facing the chorionic cavity. It is the layer students most often place in the middle, because it is the one they think of last when reciting from outside in.',
        D: 'The splanchnic layer is not part of the chorion at all — it is on the yolk sac, at the other end of the split.',
      },
    },
    {
      key: 'primary-chorionic-villi-dep-book-y-ad-ac-em-64a44f78',
      conceptKey: 'chorionic-villi-types-development',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Give the composition of a primary villus and reject the later stages.',
      answerOverride: 'A',
      answerOverrideReason:
        'The books key this to B, that a primary villus contains fetal blood vessels. Vessels are what make a villus tertiary; a primary villus is a cytotrophoblast core covered by syncytiotrophoblast, with no mesoderm and no vessels at all. The answer is A. The department book is explicit: primary villi are a core of cytotrophoblast covered by syncytiotrophoblast, secondary villi add a mesodermal core, and tertiary villi add vessels within it.',
      explanations: {
        A: 'Correct. A primary villus is a core of proliferating cytotrophoblast pushing into the overlying syncytiotrophoblast, and nothing else.',
        B: 'Fetal blood vessels appear only in the tertiary villus, two stages later. This is the option the books key the question to, and it is the answer to the same question asked about tertiary villi.',
        C: 'The middle of the third week is when secondary villi appear. Primary villi start at the end of the second week, which is a week earlier.',
        D: 'The fetal part of the placenta is the chorion frondosum, made of well-developed tertiary villi. A primary villus is three steps away from that.',
      },
    },
    {
      key: 'secondary-chorionic-villi-dep-book-ac-em-8d6aeb49',
      conceptKey: 'chorionic-villi-types-development',
      difficulty: 'Hard', questionType: 'Developmental timing',
      learningObjective: 'Date the secondary villus and keep the tertiary villus\'s vessels out of it.',
      answerOverride: 'C',
      answerOverrideReason:
        'The books key this to B, that the secondary villus contains fetal blood vessels. It does not: mesoderm alone in the core makes a villus secondary, and it becomes tertiary only once vessels form in that mesoderm. The department book puts secondary villi at the middle of the third week, which is option C, and that is the only true statement of the four.',
      explanations: {
        A: 'Cytotrophoblast covered by syncytiotrophoblast, with nothing between, is the primary villus. The secondary villus has somatic extra-embryonic mesoderm in its core as well.',
        B: 'Fetal blood vessels make a villus tertiary. This is the option the books key the question to, and the distinction it erases — mesoderm without vessels against mesoderm with them — is the one thing this question exists to test.',
        C: 'Correct. Secondary villi form at the middle of the third week, when somatic mesoderm grows into the core of the primary villus.',
        D: 'The fetal part of the placenta is the chorion frondosum, which carries tertiary villi. A secondary villus has no circulation and could not serve as a placenta.',
      },
    },
    {
      key: 'cytotrophoblastic-shell-is-formed-from-cytotrophoblast-of-893da810',
      conceptKey: 'chorionic-villi-types-development',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Trace the cytotrophoblastic shell to the villus that reaches the decidua.',
      answerOverride: 'C',
      answerOverrideReason:
        'This printing carries no key and the other is keyed to the secondary villus, which cannot be right — the shell forms around the tertiary villi and the intervillous spaces, from the cytotrophoblast of the tertiary villi, and it is the stem villi that reach the decidua basalis where the shell lies. Set to C.',
      explanations: {
        A: 'Primary villi exist at the end of the second week, before there are intervillous spaces for a shell to bound. The shell is a third-week structure.',
        B: 'The secondary villus has a mesodermal core but is still floating; it does not reach the decidua. This is the option the other printing of this question is keyed to.',
        C: 'Correct. The shell forms from the cytotrophoblast of the stem, or anchoring, tertiary villi — the ones that run all the way from chorion to decidua basalis and can therefore spread out against it.',
        D: 'The free or floating villi hang in maternal blood in the intervillous spaces and touch nothing. A villus that reaches no wall cannot build a shell against one; the stem villi are named anchoring for exactly this reason.',
      },
    },
    {
      key: 'late-placental-barrier-is-composed-of-dep-book-7b85a221',
      conceptKey: 'placental-barrier-early-and-late',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Name the two layers left in the late placental barrier.',
      answerOverride: 'B',
      answerOverrideReason:
        'None of the three printings of this question carries a key. Late in pregnancy the cytotrophoblast has disappeared from most of the villus and the core connective tissue is reduced, leaving syncytiotrophoblast and the endothelium of the fetal vessels — option B. Every other option keeps the cytotrophoblast, which is the layer that goes.',
      explanations: {
        A: 'Syncytiotrophoblast plus cytotrophoblast is the outer half of the early barrier, and the cytotrophoblast is precisely the layer that disappears. It is also incomplete — a barrier has to reach the fetal blood, and this one stops short of it.',
        B: 'Correct. The late barrier is syncytiotrophoblast and the endothelium of the fetal blood vessels, two layers where the early barrier had four.',
        C: 'Cytotrophoblast and villus mesoderm are the two layers that are lost. This option names the disappearing half of the early barrier and nothing that survives.',
        D: 'Keeping the cytotrophoblast and dropping the syncytiotrophoblast reverses which layer persists. The syncytium is the one in contact with maternal blood throughout, and it is the layer that never goes.',
      },
    },
    {
      key: 'regarding-the-notochord-170a5e93',
      conceptKey: 'notochord-formation-fate',
      difficulty: 'Moderate', questionType: 'Developmental process',
      learningObjective: 'Give the notochord\'s importance and reject three near-misses about its fate and extent.',
      explanations: {
        A: 'It persists as the nucleus pulposus, the soft centre of the disc, not as the annulus fibrosus, the fibrous ring around it. One word apart, and the wrong half of the same structure.',
        B: 'The notochord extends from the primitive pit to the bucco-pharyngeal membrane. The cloacal membrane is caudal to the primitive streak, well beyond the notochord\'s caudal end.',
        C: 'Correct. Its firmness limits the head fold during folding of the embryonic disc, which is one of the three points the book makes about its importance.',
        D: 'The notochord forms in the third week, after gastrulation has produced a primitive pit for it to invaginate from. In the second week there is no epiblast streak yet.',
      },
    },
    {
      key: 'regarding-the-somites-choose-the-true-statement-2017-2nd-dep-0e47c135',
      conceptKey: 'paraxial-mesoderm-somite-derivatives',
      difficulty: 'Moderate', questionType: 'Developmental process',
      learningObjective: 'Say what somites are made of and reject a second-week date for them.',
      answerOverride: 'A',
      answerOverrideReason:
        'The books key this to B, that somites start forming during the second week. The department book puts the first pair of occipital somites on the twentieth gestational day — the third week — and the paraxial mesoderm they segment from does not exist until gastrulation. The true statement is A: somites are the transverse segments of the paraxial mesoderm.',
      explanations: {
        A: 'Correct. Somites are the transverse segments of the paraxial mesoderm, which lies on both sides of the notochord and the neural tube.',
        B: 'The first somite pair separates on the twentieth day, in the third week, and three pairs are added daily from then. This is the option the books key the question to, and it is a whole week early — the paraxial mesoderm itself only appears on the seventeenth day.',
        C: 'The muscle of the gut is smooth muscle from splanchnopleuric lateral plate mesoderm. Somites give skeletal muscle, through the myotome, and skeletal muscle is not what a gut wall is made of.',
        D: 'Intermediate mesoderm forms the urogenital system. Somites come from the paraxial mesoderm, which is the medial of the three divisions — swapping the two is the commonest error in the whole mesoderm story.',
      },
    },
    {
      key: 'early-amniotic-cavity-separates-between-dep-book-ac-p-a-amni-dd2b8ddd',
      conceptKey: 'bilaminar-disc-amnioblast-and-epiblast',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The stem has swallowed two of its own options, and the printing is keyed to C, amnioblast and hypoblast — the epiblast lies between those two, so the cavity cannot separate them. The clean printing at `early-amniotic-cavity-separates-between-7d4d9cdc`, asked twice as often, is keyed to amnioblast and epiblast and is live.',
    },
    {
      key: 'the-source-of-the-three-germ-layers-is-dep-book-83adb804',
      conceptKey: 'bilaminar-disc-amnioblast-and-epiblast',
      difficulty: 'Moderate', questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'An annotated re-printing keyed to the extra-embryonic mesoderm, which lies outside the embryonic disc and contributes nothing to it. The clean printing at `the-source-of-the-three-germ-layers-is-4fc8b443`, asked twice as often, is keyed to the epiblast and is live.',
    },
    {
      key: 'the-source-of-the-three-germ-layers-is-1-09d920ab',
      conceptKey: 'bilaminar-disc-amnioblast-and-epiblast',
      difficulty: 'Moderate', questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option C has been run into option B — "Epiblast. 0 ا 0 Extraembryonic mesoderm. ا" — leaving three readable options, one of them two statements under one letter. Clean at `the-source-of-the-three-germ-layers-is-4fc8b443`.',
    },
    {
      key: 'secondary-chorionic-villi-578434d1',
      conceptKey: 'chorionic-villi-types-development',
      difficulty: 'Hard', questionType: 'Developmental timing',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option C was lost, and option C is the answer — "it is formed at the middle of the 3rd week of pregnancy". Three options remain and none of them is true, so the question cannot be sat at all. The other printing, `secondary-chorionic-villi-dep-book-ac-em-8d6aeb49`, has the complete option set and is live with its answer overridden; a rescan of this page would only confirm what that copy already supplies.',
    },
    {
      key: 'primary-chorionic-villi-84166b6e',
      conceptKey: 'chorionic-villi-types-development',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option C was lost, leaving three, and there is no key. The complete printing is `primary-chorionic-villi-dep-book-y-ad-ac-em-64a44f78`, which is live.',
    },
    {
      key: 'primary-chorionic-villi-7-169939a0',
      conceptKey: 'chorionic-villi-types-development',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A third printing with debris in the stem and in all four options — "cytotrophoblast.and syncytiotrophoblast", "the: 3 week", "Tt forms" — and no key. The option set is complete, so a rescan recovers it, but `primary-chorionic-villi-dep-book-y-ad-ac-em-64a44f78` already carries the same question cleanly.',
    },
    {
      key: 'cytotrophoblastic-shell-is-formed-from-cytotrophoblast-of-de-5a6da708',
      conceptKey: 'chorionic-villi-types-development',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'An annotated re-printing keyed to the secondary villus. The shell forms around the tertiary villi and the intervillous spaces, from the cytotrophoblast of the stem tertiary villi that reach the decidua basalis; a secondary villus reaches nothing. The other printing, `cytotrophoblastic-shell-is-formed-from-cytotrophoblast-of-893da810`, is live with the answer supplied.',
    },
    {
      key: 'late-placental-barrier-is-compose-6dbf1350',
      conceptKey: 'placental-barrier-early-and-late',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Every option is cut off mid-word — "Cytotrophy", "endotheliur. etal blood vessels", "extraembryonic xderm,", "endothelium of أ vessels" — so a student cannot tell which tissue any of them names. The complete printing is `late-placental-barrier-is-composed-of-dep-book-7b85a221`, which is live.',
    },
    {
      key: 'late-placental-barrier-is-composed-of-b86a2ed1',
      conceptKey: 'placental-barrier-early-and-late',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Only two options survived, and both are misspelt beyond confident reading — "Syhcytiotrophoblast", "Syficytlotrophoblast". Complete at `late-placental-barrier-is-composed-of-dep-book-7b85a221`.',
    },
    {
      key: 'is-the-middle-layer-of-chorion-dep-book-y-e4d5758c',
      conceptKey: 'extraembryonic-mesoderm-somatic-splanchnic-and-the-chorion',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'An annotated re-printing keyed to the splanchnic extra-embryonic mesoderm, which is not part of the chorion at all — it covers the yolk sac. The chorion is somatic mesoderm, cytotrophoblast and syncytiotrophoblast, so the middle layer is the cytotrophoblast, and the other printing at `is-the-middle-layer-of-chorion-c2980524` is keyed to it and is live.',
    },
    {
      key: 'ssssessusessnee-is-the-middle-layer-of-chorion-f18c3d53',
      conceptKey: 'extraembryonic-mesoderm-somatic-splanchnic-and-the-chorion',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Two options survived and the leading dots of the stem have been read as "ssssessusessnee". Live at `is-the-middle-layer-of-chorion-c2980524`.',
    },
    {
      key: 'regarding-implantation-dep-book-em-ac-p-a-it-starts-at-the-9-ab5620c5',
      conceptKey: 'implantation-normal-site-and-the-syncytiotrophoblast-that-achieves-it',
      difficulty: 'Moderate', questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The stem has swallowed option A. Its key agrees with the clean printing at `regarding-implantation-ebe480e4`, which is live, so nothing is in dispute here — only the scan.',
    },
    {
      key: 'regarding-implantation-i-237fda61',
      conceptKey: 'implantation-normal-site-and-the-syncytiotrophoblast-that-achieves-it',
      difficulty: 'Moderate', questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Two options survived, and neither is the answer. Live at `regarding-implantation-ebe480e4`.',
    },
    {
      key: 'regarding-the-notochord-dep-book-3021a059',
      conceptKey: 'notochord-formation-fate',
      difficulty: 'Moderate', questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'An annotated re-printing keyed to B, that the notochord lies between the cloacal and bucco-pharyngeal membranes. It runs from the primitive pit forwards to the bucco-pharyngeal membrane; the cloacal membrane is caudal to the primitive streak and well outside it. The clean printing at `regarding-the-notochord-170a5e93` is keyed to the head fold and is live.',
    },
    {
      key: 'notochord-is-developed-from-lo-dfce29cd',
      conceptKey: 'notochord-formation-fate',
      difficulty: 'Moderate', questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The option list has been contaminated by the neighbouring question: option D reads "It is formed during the second week of pregnancy", which belongs to `regarding-the-notochord`, and the correct answer to this stem — epiblast cells at the wall of the primitive pit — is missing altogether. No option is true as printed. The clean version of this question lives in the Third Week leaf as `notochord-is-developed-from-f09634da`; this row needs its page rescanned.',
    },
    {
      key: 'amniotic-cavity-starts-formation-at-the-3c9d19db',
      conceptKey: 'second-week-day-by-day-timetable',
      difficulty: 'Moderate', questionType: 'Developmental timing',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three of the four options have lost their numerals to the scanner — "ih day", "ath day", "gth day" — so a question that is nothing but four dates has no readable dates in it. The complete printing is `amniotic-cavity-starts-formation-at-the-dep-book-fe3e505c`, which is live and keyed to the eighth day.',
    },
    {
      key: 'one-of-the-following-is-an-event-of-the-9-day-of-pregnancy-h-770fe64c',
      conceptKey: 'second-week-day-by-day-timetable',
      difficulty: 'Hard', questionType: 'Developmental timing',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Two of the four options are not answers to this stem at all: B reads "11 day of pregnancy" and C "8 day of pregnancy", which are dates rather than events and have bled in from the neighbouring question. The correct option, formation of the primary yolk sac, is among the ones lost. The complete printing is `one-of-the-following-is-an-event-of-the-9th-day-of-pregnancy-35412c8d`, which is live.',
    },
    {
      key: 'all-of-the-following-are-abnormal-sites-of-implantation-exce-cafc7147',
      conceptKey: 'implantation-abnormal-sites',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option C was lost, leaving three, and the surviving three are all abnormal sites — the internal os, the mesentery and the uterine tube — so the exception the stem asks for is precisely the option that is missing. It is the only printing of this question in the bank, and it needs the page rescanned before it can be sat.',
    },
    {
      key: 'regarding-the-stomodeum-dep-book-em-ac-p-a-it-is-lined-with-e89624ad',
      conceptKey: 'embryonic-disc-folding-types-causes-results',
      difficulty: 'Hard', questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The correct option has been swallowed by the stem and replaced by debris. The stem reads "Regarding the stomodeum (DEP BOOK) em Ac P a- It Is lined with ectoderm. P Vi ad" — "lined with ectoderm" is the true statement — while option A now reads "Second week", which is not an answer to this stem. The key points at D, that the stomodeum is formed before folding, which is false: it is a product of folding, appearing between the forebrain and pericardial bulges that folding creates. A rescan is needed for the option block.',
    },
    {
      key: 'somatic-extraembryonic-mesoderm-6de9610f',
      conceptKey: 'extraembryonic-mesoderm-somatic-splanchnic-and-the-chorion',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option C was lost and option C is the answer — "lines cytotrophoblast" — leaving three options none of which is true. Complete and keyed at `somatic-extraembryonic-mesoderm-dep-book-14e3f22a`, which is live.',
    },
    {
      key: 'splanchnic-extraembryonic-mesoderm-dep-book-em-ac-p-a-covers-70bc5912',
      conceptKey: 'extraembryonic-mesoderm-somatic-splanchnic-and-the-chorion',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The stem has swallowed options A and B, one of which is the answer, and there is no key. Clean and keyed at `splanchnic-extraembryonic-mesoderm-4d303507`.',
    },
    {
      key: 'the-earliest-source-of-amniotic-uid-is-dep-book-em-em-em-em-5abb95ed',
      conceptKey: 'bilaminar-disc-amnioblast-and-epiblast',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option B was lost, leaving three, and the printing is keyed to the epiblast — which forms the floor of the amniotic cavity and secretes nothing. The amnioblast is the first source, and the clean printing at `the-earliest-source-of-amniotic-fluid-is-720ff8b0` is keyed to it and is live.',
    },
    {
      key: 'the-nger-iike-projections-of-cytotrophoblast-into-syncytiotr-1ef26963',
      conceptKey: 'chorionic-villi-types-development',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The row is a collision of two questions. The stem is doubled — "are called: are called:" — and has swallowed option A; a fifth option has appeared reading "Amniotic and uterine cavities Acad Acad 9|Page iP iP", which is a page footer and part of another question\'s options; and option D reads "Secondary chorionic villi Notochord". The key points at that damaged option D, where the answer to the stem as asked is the primary chorionic villus — a cytotrophoblast core pushing into the syncytiotrophoblast is the definition of a primary villus. The page needs rescanning.',
    },
    {
      key: 'the-oor-of-the-amniotic-cavity-is-formed-by-2022-y-ad-ac-a-e-08f9c828',
      conceptKey: 'bilaminar-disc-amnioblast-and-epiblast',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The stem has swallowed option A, and option A is the answer — the floor of the amniotic cavity is the epiblast, which becomes the ectoderm. Option D has been destroyed by a page footer, reading "Amniotic Acad Acad 16 | a g e iP iP", and the key points at B, mesoderm, which is not one of the layers bounding the cavity at this stage. Both the scan and the key are wrong, and this is the only printing; the page needs rescanning.',
    },
  ],
}
