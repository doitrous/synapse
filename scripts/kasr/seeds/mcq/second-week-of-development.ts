/**
 * `101 ISK > Anatomy > General Embryology > Second Week of Development` — the
 * question books' MCQs.
 *
 * Forty-four rows and eighteen questions, and this is the leaf the department
 * examines hardest in general embryology. The department book calls the second
 * week "the week of twos" without saying so: the trophoblast becomes two
 * layers, the embryoblast becomes two layers, the extra-embryonic mesoderm
 * becomes two leaves, and the books ask each of those three splits from both
 * sides. What holds them together is the day-by-day calendar the chapter is
 * actually written as — seventh day, eighth, ninth and tenth, eleventh and
 * twelfth, thirteenth — and four of the questions here ask nothing but a date.
 *
 * The same three rules pick between copies as in the other embryology leaves,
 * and they matter more here than anywhere because twenty-six of the forty-four
 * rows are re-printings:
 *
 *   1. One copy per distinct question, the rest excluded with the clean twin
 *      named, so a rescan can tell a duplicate from an oversight.
 *   2. The copy with the complete option set wins, even when its stem carries
 *      the department book's page margin — the `em`, `Ac`, `ad`, `Vi`, `P`
 *      tokens are a reader's pencil marks and appear on a hundred rows this
 *      corpus already imports. A row that lost an option, gained one from the
 *      question above it, or printed one option twice cannot win, because none
 *      of those can be repaired from the surviving text.
 *   3. The source's answer stands unless the department book contradicts it,
 *      and an override says which sentence of the book it stands on.
 *
 * Seven answers are supplied or overridden. Three are rows the books left
 * unkeyed, where the answer comes from a sentence of the department book named
 * in the override; four are rows whose pencilled mark contradicts the book on
 * the same page. Two of those four are worth naming because the mark is not
 * random but systematically one option out: "primary chorionic
 * villi" is marked "it contains fetal blood vessels", which is the *tertiary*
 * villus, and "secondary chorionic villi" is marked the same way. A villus
 * gains its mesoderm at the secondary stage and its vessels only at the
 * tertiary, and the book says so twice.
 *
 * `regarding-implantation` survives in three copies and none of them is whole.
 * The clean-stemmed copy truncated the option that makes it false — the
 * implantation cavity is made by proteolytic enzyme from the syncytiotrophoblast,
 * and the words "produced from embryonic disc" are what the row lost, leaving
 * an option that reads true. The department-book copy kept all four options and
 * lost only its stem to a pencil note. The complete option set wins, and the
 * reasoning is written on both rows.
 *
 * Nine of the eleven concepts are reused verbatim from lanes that got here
 * first — `blastocyst-structure-poles-and-the-start-of-implantation` from
 * `first-week-of-development.ts`, `gastrulation-trilaminar-disc-from-epiblast`
 * from `third-week-of-development.ts`, and `chorionic-villi-types-development`,
 * `notochord-formation-fate`, `paraxial-mesoderm-somite-derivatives` and
 * `amniotic-fluid-functions` from the sat papers. Three of the rows in this
 * leaf are third-week and fetal-membrane questions the extractor filed here on
 * their wording, and they go to the concepts that already own them rather than
 * to new keys.
 *
 * `ART-101-ANA-IMPLANTATION` is filed under First Week of Development but is
 * the article that teaches this leaf: the department book puts implantation,
 * the decidua and the whole day-by-day calendar in its Second Week chapter, and
 * the article follows the book rather than the cluster path.
 */
import type { McqLeafSeed } from '../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Second Week of Development',
  modulePath: '101 ISK > Anatomy > General Embryology > Second Week of Development',
  articleId: 'ART-101-ANA-IMPLANTATION',

  concepts: [
    {
      key: 'blastocyst-structure-poles-and-the-start-of-implantation',
      label: 'The blastocyst is a trophoblast wall around a blastocele with the embryoblast at one pole, and it implants by that embryonic pole',
      definition:
        'Once the morula reaches the uterine cavity the zona pellucida begins to degenerate, uterine fluid seeps between its cells, and the spaces run together into one cavity — the blastocele. The blastocyst is complete at the end of the sixth day. Its wall is a single layer of cells, the outer cell mass or trophoblast; the inner cell mass, or embryoblast, lies inside that wall against one side. The trophoblast covering the embryoblast is the embryonic pole and the opposite side is the abembryonic pole, and it is by the embryonic pole that the blastocyst attaches and begins to implant, normally into the posterior wall of the fundus of the uterus, at the end of the first week.',
      objective:
        'Name the wall, the cavity and the inner cell mass of the blastocyst, place the embryonic and abembryonic poles, and say which pole implants and where.',
      pitfall:
        'Putting the inner cell mass, or the start of implantation, at the abembryonic pole. The embryonic pole is defined as the trophoblast over the embryoblast, so the two are on the same side by definition — and it is that side which goes into the endometrium first.',
      subject: 'dev',
      primary: 'DIS-EMB-T01',
      secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > First Week of Development',
      type: 'structural_description',
      aliases: ['Blastocele', 'Trophoblast', 'Embryoblast', 'Embryonic pole', 'Abembryonic pole'],
    },
    {
      key: 'second-week-day-by-day-events-of-implantation',
      label: 'Implantation runs on a calendar: trophoblast splits on day seven, the amniotic cavity appears on day eight, the primary yolk sac and the lacunae on day nine, and the chorionic cavity on day thirteen',
      definition:
        'The department book writes the second week as a diary and examines it that way. On the seventh day the blastocyst begins implantation and the trophoblast differentiates, at the embryonic pole first, into an inner cytotrophoblast and an outer syncytiotrophoblast — a layer whose cells have no cell membranes and which makes the proteolytic enzyme that erodes the endometrium into an implantation cavity. On the eighth day the blastocyst is partly embedded, the hypoblast forms from the embryoblast cells facing the blastocele, and the amniotic cavity appears in the rest of the inner cell mass. On the ninth and tenth days the blastocyst is completely embedded, the breach in the endometrial epithelium is plugged by a fibrin clot, Heuser\'s membrane converts the blastocele into the primary yolk sac, and lacunar spaces appear in the syncytiotrophoblast — the lacunar stage. On the eleventh and twelfth days the endometrial epithelium grows over the clot to complete implantation, maternal blood fills the lacunae to start the utero-placental circulation, and extra-embryonic mesoderm appears. On the thirteenth day its spaces run together into one chorionic cavity.',
      objective:
        'Give the events of the seventh, eighth, ninth, eleventh and thirteenth gestational days in order, and say which of them completes implantation.',
      pitfall:
        'Dating implantation from the ninth day, because that is when the blastocyst is completely embedded. It *begins* on the seventh and is completed on the eleventh, when the endometrial epithelium closes over the fibrin clot — three different days for three different sentences, and the books ask all three.',
      subject: 'dev',
      primary: 'DIS-EMB-T01',
      secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > Second Week of Development',
      type: 'developmental_process',
      aliases: ['Syncytiotrophoblast', 'Cytotrophoblast', 'Lacunar stage', 'Primary yolk sac', 'Heuser\'s membrane'],
    },
    {
      key: 'bilaminar-embryonic-disc-and-the-amniotic-cavity',
      label: 'The embryoblast splits into hypoblast and epiblast, and the amniotic cavity that opens above the epiblast is roofed by amnioblast and floored by epiblast',
      definition:
        'On the eighth gestational day the inner cell mass becomes two layers. The cells facing the blastocele become cuboidal and form the hypoblast; the amniotic cavity then appears within the remaining cells, dividing them into the amnioblast, which lies against the cytotrophoblast and forms the roof of the cavity, and the epiblast, tall columnar cells lying against the hypoblast and forming its floor. Epiblast and hypoblast together are the bilaminar embryonic disc — bilaminar, not trilaminar: the third layer waits for gastrulation in the third week. The amnioblast is the first source of amniotic fluid, and the early amniotic cavity therefore lies between amnioblast above and epiblast below.',
      objective:
        'Name the two layers of the bilaminar embryonic disc, say which of them floors the amniotic cavity and which cell roofs it, and give the day it all happens.',
      pitfall:
        'Saying the amniotic cavity separates the amnioblast from the cytotrophoblast. The amnioblast lies *against* the cytotrophoblast — that is where it came from being pushed — and the cavity opens on its other side, between amnioblast and epiblast.',
      subject: 'dev',
      primary: 'DIS-EMB-T01',
      secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > Second Week of Development',
      type: 'structural_description',
      aliases: ['Bilaminar embryonic disc', 'Epiblast', 'Hypoblast', 'Amnioblast', 'Amniotic cavity'],
    },
    {
      key: 'extraembryonic-mesoderm-somatic-and-splanchnic',
      label: 'Extra-embryonic mesoderm splits into a somatic leaf lining the cytotrophoblast and covering the amnion, and a splanchnic leaf covering the yolk sac',
      definition:
        'Extra-embryonic mesoderm appears on the eleventh and twelfth days, derived from the wall of the yolk sac, and fills the space between the cytotrophoblast outside and the embryonic disc with its two cavities inside. Large spaces open in it and run together on the thirteenth day into a single chorionic cavity, and that cavity splits the mesoderm into two leaves. The somatic — somatopleuric — leaf is the outer one: it lines the cytotrophoblast and covers the amniotic cavity, and it is the innermost of the three layers of the chorion. The splanchnic — splanchnopleuric — leaf is the inner one and covers the secondary yolk sac. The part of the mesoderm that is not split, because it bridges the two, is the connecting stalk, which joins the chorion to the caudal end of the embryonic disc.',
      objective:
        'Name the two leaves of the extra-embryonic mesoderm and say what each lines or covers, and identify the connecting stalk as the part that neither cavity separates.',
      pitfall:
        'Deciding which leaf is which from the words alone. Splanchnic means visceral, so it goes with the yolk sac — the gut-to-be — and somatic means body wall, so it goes with the amnion and the trophoblast; the intra-embryonic mesoderm splits the same way for the same reason.',
      subject: 'dev',
      primary: 'DIS-EMB-T01',
      secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > Second Week of Development',
      type: 'classification',
      aliases: ['Somatopleuric mesoderm', 'Splanchnopleuric mesoderm', 'Extra-embryonic coelom', 'Connecting stalk'],
    },
    {
      key: 'chorion-three-layers-and-the-chorionic-vesicle',
      label: 'The chorion is three layers — somatic mesoderm, cytotrophoblast and syncytiotrophoblast from inside out — and the vesicle it walls appears on the thirteenth day',
      definition:
        'The chorion is the wall of the chorionic vesicle, and the department book gives its three layers from inside outwards as somatic extra-embryonic mesoderm, cytotrophoblast and syncytiotrophoblast — so the cytotrophoblast is the middle layer, with mesoderm inside it and syncytiotrophoblast outside. The chorionic vesicle itself exists once the scattered spaces of the extra-embryonic coelom fuse into a single chorionic cavity on the thirteenth gestational day. Chorionic villi grow from this wall, and the chorion later divides into the chorion frondosum, which keeps its villi and becomes the fetal part of the placenta, and the smooth chorion leave, whose villi degenerate.',
      objective:
        'Give the three layers of the chorion in order from inside outwards, and the day the chorionic vesicle is formed.',
      pitfall:
        'Reading the layers from the outside because the trophoblast is the part that came first. The book lists them inside out, and the middle layer is the cytotrophoblast either way — but the inner and outer swap, and the "middle layer" question is the one that survives that error while the others do not.',
      subject: 'dev',
      primary: 'DIS-EMB-T02',
      secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > Second Week of Development',
      type: 'structural_description',
      aliases: ['Chorion', 'Chorionic vesicle', 'Chorionic cavity'],
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
      conflicts: [
        'The department book states that the cytotrophoblastic shell originates from the cytotrophoblastic layer of the *tertiary* villi, without saying whether it is the stem or the floating tertiary villi that supply it. The only key in the question bank for "cytotrophoblastic shell is formed from cytotrophoblast of" marks the *secondary* villi, which the book contradicts outright. Both rows of that question are excluded rather than imported with an override, because the book does not settle which of the two tertiary options is meant and an author choosing between them would be inventing the answer.',
      ],
    },
    {
      key: 'placental-barrier-early-and-late-layers',
      label: 'The placental barrier is four layers in early pregnancy and two from the fourth month, losing the cytotrophoblast and the mesoderm as the fetus grows',
      definition:
        'The placental barrier, or placental membrane, is what separates maternal blood in the intervillous spaces from fetal blood inside the tertiary villi. In early pregnancy it has four layers, from the maternal side inwards: syncytiotrophoblast, cytotrophoblast, somatic mesoderm and the endothelium of the fetal blood vessels. From the fourth month it thins to two — syncytiotrophoblast and fetal vessel endothelium — because a larger fetus needs faster exchange and a thinner membrane gives it. The barrier separates the two circulations, permits exchange of nutrients, gases and waste, prevents the passage of bacteria and of most but not all viruses, and mostly excludes toxic material and maternal hormones.',
      objective:
        'Name the layers of the placental barrier in early pregnancy and after the fourth month, and explain why it becomes thinner rather than thicker.',
      pitfall:
        'Expecting a barrier to be reinforced as pregnancy advances. It does the opposite: two of its four layers are lost, because its job is exchange rather than defence and the fetus\'s demand rises faster than its resistance to infection matters.',
      subject: 'dev',
      primary: 'DIS-EMB-T02',
      secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > Fetal Membranes',
      type: 'structure_function_relationship',
      aliases: ['Placental membrane', 'Placental barrier'],
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
      key: 'amniotic-fluid-functions',
      label: 'Amniotic fluid does different work early, late and during delivery',
      definition:
        'Amniotic fluid is a clear watery fluid of water, electrolytes, protein, carbohydrate, lipid, phospholipid and urea, produced first by the amnioblast cells, then derived from maternal blood by osmosis, with fetal urine added from the fifth month. In early pregnancy it is a shock absorber protecting the fetus from external trauma, a thermal insulator keeping the fetal temperature constant, and the thing that prevents adhesion of the fetus to the uterine wall and of fetal parts to each other. In late pregnancy it provides space for the fetal movements that develop the fetal muscles, space for fetal urine, and a medium the fetus swallows to learn to suckle. During delivery it protects the fetus against uterine contractions, its fore bag helps the cervical canal dilate gradually, its rupture signals the start of labour, and being sterile it washes the vagina just before the fetus passes.',
      objective: 'Enumerate the functions of amniotic fluid in early pregnancy, in late pregnancy and during delivery.',
      pitfall: 'Giving cushioning alone. The book groups the functions by stage, and the delivery group — gradual cervical dilatation, the sign of labour, washing the birth canal — is a third of the answer.',
      subject: 'dev',
      primary: 'DIS-EMB-T02',
      secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > Fetal Membranes',
      type: 'structure_function_relationship',
      aliases: ['Liquor amnii'],
    },
  ],

  questions: [
    {
      key: 'the-common-site-of-implantation-in-the-uterus-is-at-2023-202-e9437023',
      conceptKey: 'blastocyst-structure-poles-and-the-start-of-implantation',
      difficulty: 'Easy',
      questionType: 'Developmental process',
      learningObjective: 'Name the normal site of implantation in the uterus.',
      explanations: {
        A: 'The anterior wall of the fundus is the book\'s *second* choice — it says implantation occurs less frequently there — so it is true but not the common site, which is what the stem asks for.',
        B: 'Correct. The blastocyst normally implants in the endometrium of the upper part of the posterior wall, just below the fundus.',
        C: 'The cervix has no endometrium of the kind implantation needs, and a conceptus that reached it would be a cervical ectopic pregnancy — one of the most dangerous of all.',
        D: 'Implantation low on the posterior wall of the body is what produces placenta previa: still inside the uterus, but low enough for the placenta to cover the internal os.',
      },
    },
    {
      key: 'regarding-implantation-dep-book-em-ac-p-a-it-starts-at-the-9-ab5620c5',
      conceptKey: 'blastocyst-structure-poles-and-the-start-of-implantation',
      difficulty: 'Hard',
      questionType: 'Developmental process',
      learningObjective: 'Give the day implantation starts, the stage that starts it, its site, and the source of the enzyme that makes the implantation cavity.',
      explanations: {
        A: 'Wrong day, and a day the chapter really does use. Implantation *begins* on the seventh day; the ninth is when the blastocyst is completely embedded and the lacunae appear, and the eleventh is when it is complete.',
        B: 'The chorionic vesicle does not exist until the thirteenth day, six days after implantation begins. The stage that starts implantation is the blastocyst, by its embryonic pole.',
        C: 'Correct. Implantation occurs in the endometrium of the upper part of the posterior wall of the uterine cavity, just below the fundus.',
        D: 'The right mechanism attached to the wrong source. The proteolytic enzyme that erodes the endometrium into an implantation cavity comes from the syncytiotrophoblast, not from the embryonic disc — which at this stage is not yet even bilaminar.',
      },
    },
    {
      key: 'amniotic-cavity-starts-formation-at-the-dep-book-fe3e505c',
      conceptKey: 'second-week-day-by-day-events-of-implantation',
      difficulty: 'Moderate',
      questionType: 'Developmental timing',
      learningObjective: 'Give the day the amniotic cavity appears.',
      explanations: {
        A: 'The seventh day is when implantation begins and the trophoblast splits into cytotrophoblast and syncytiotrophoblast. The inner cell mass has not yet done anything.',
        B: 'Correct. The amniotic cavity appears on the eighth day, in the inner cell mass, at the same time as the hypoblast forms — which is why the eighth day is the day of the bilaminar disc.',
        C: 'The ninth day belongs to the primary yolk sac and to the lacunar stage of the syncytiotrophoblast. It is the next entry in the diary, one day late.',
        D: 'By the tenth day the blastocyst is fully embedded and the fibrin clot is in place. The amniotic cavity has been there for two days.',
      },
    },
    {
      key: 'on-day-nine-trophoblastic-lacunae-and-maternal-sinusoids-beg-89e8faf5',
      conceptKey: 'second-week-day-by-day-events-of-implantation',
      difficulty: 'Moderate',
      questionType: 'Developmental process',
      learningObjective: 'Name the layer in which the trophoblastic lacunae appear.',
      explanations: {
        A: 'Correct. The lacunar spaces open within the syncytiotrophoblast on the ninth and tenth days, and when maternal blood fills them on the eleventh they become the utero-placental circulation.',
        B: 'The extra-embryonic coelom is a set of spaces in the extra-embryonic mesoderm, on the other side of the cytotrophoblast, and it does not appear until the eleventh and twelfth days.',
        C: 'The splanchnopleuric leaf of the extra-embryonic mesoderm covers the yolk sac, deep inside the conceptus. Nothing maternal reaches it.',
        D: 'The exocoelomic membrane — Heuser\'s membrane — is the flat hypoblast-derived lining of the primary yolk sac. It forms on the same day, which is what makes it a plausible wrong answer, but it is inside the blastocyst rather than at its maternal surface.',
      },
    },
    {
      key: 'one-of-the-following-is-an-event-of-the-9th-day-of-pregnancy-35412c8d',
      conceptKey: 'second-week-day-by-day-events-of-implantation',
      difficulty: 'Hard',
      questionType: 'Developmental timing',
      learningObjective: 'Assign an event of the second week to the ninth day rather than the eighth, eleventh or thirteenth.',
      answerOverride: 'B',
      answerOverrideReason:
        'This department-book row carries no key, and the only bank copy of the ninth-day question that does carry one marks the formation of the hypoblast — which the same book gives as an *eighth*-day event, so that key is one question out. The department book states for the ninth and tenth days that "the blastocele is transformed into the primary yolk sac after formation of Heuser\'s membrane", which is option B.',
      explanations: {
        A: 'The hypoblast forms on the eighth day, together with the amniotic cavity. It is the answer to the neighbouring question in the same books, and the two are printed on facing pages with the same four options.',
        B: 'Correct. On the ninth day Heuser\'s membrane — flat cells derived from the hypoblast — lines the blastocele and converts it into the primary yolk sac.',
        C: 'The extra-embryonic mesoderm appears on the eleventh and twelfth days, from the wall of the yolk sac. It cannot precede the yolk sac it comes from.',
        D: 'The primary chorionic villi form at the end of the second week, after the chorion itself exists on the thirteenth day. They are the last entry in this diary, not the third.',
      },
    },
    {
      key: 'early-amniotic-cavity-separates-between-7d4d9cdc',
      conceptKey: 'bilaminar-embryonic-disc-and-the-amniotic-cavity',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Name the two cell layers the early amniotic cavity lies between.',
      explanations: {
        A: 'The amnioblast lies against the cytotrophoblast — that is its position, not what it is separated from. Putting the cavity here would place it outside the inner cell mass altogether.',
        B: 'Correct. The amniotic cavity opens inside the inner cell mass and divides it into amnioblast forming the roof and epiblast forming the floor.',
        C: 'The hypoblast is the far side of the bilaminar disc, with the epiblast between it and the amniotic cavity. Below the hypoblast is the yolk sac, not the amnion.',
        D: 'The yolk sac lies on the other side of the disc entirely. The two cavities face each other across epiblast and hypoblast, which is exactly why the disc is called bilaminar.',
      },
    },
    {
      key: 'cells-of-the-embryoblast-form-the-hypoblast-and-epiblast-whi-6310b6fb',
      conceptKey: 'bilaminar-embryonic-disc-and-the-amniotic-cavity',
      difficulty: 'Moderate',
      questionType: 'Developmental process',
      learningObjective: 'Name the cavity that appears in the embryoblast as it becomes bilaminar.',
      answerOverride: 'D',
      answerOverrideReason:
        'The row carries no key. The department book\'s account of the eighth day states that the hypoblast forms from the embryoblast cells facing the blastocele and that "the amniotic cavity forms within the rest of the inner cell mass" — so the cavity the embryoblast forms is the amniotic cavity, option D. The other three cavities in the option set belong to the trophoblast, the ovarian follicle and the blastocyst respectively, none of them to the inner cell mass.',
      explanations: {
        A: 'The chorionic cavity forms on the thirteenth day, by fusion of spaces in the extra-embryonic mesoderm — outside the embryoblast and five days later.',
        B: 'The antrum is the fluid-filled cavity of an ovarian follicle, before ovulation. It belongs to the gametes chapter and has nothing to do with the embryoblast.',
        C: 'The blastocele is the cavity the embryoblast sits *against*, and it existed before the hypoblast and epiblast formed. On the ninth day it becomes the primary yolk sac.',
        D: 'Correct. The amniotic cavity appears within the inner cell mass on the eighth day and is what separates amnioblast from epiblast.',
      },
    },
    {
      key: 'one-of-the-following-statements-is-wrong-during-the-second-w-7e758a6f',
      conceptKey: 'bilaminar-embryonic-disc-and-the-amniotic-cavity',
      difficulty: 'Hard',
      questionType: 'Developmental timing',
      learningObjective: 'Identify the one event that does not belong to the second week.',
      answerOverride: 'C',
      answerOverrideReason:
        'The row carries no key. Three of the four statements are on the department book\'s own list of what happens in the second week — implantation is completed on the eleventh day, the trophoblast differentiates into two layers on the seventh, and the amniotic cavity forms on the eighth. The fourth is false as written: the book states that the inner cell mass forms the *bilaminar* embryonic disc in this week, and the trilaminar disc is the product of gastrulation in the third.',
      explanations: {
        A: 'True of the second week, so not the answer. Implantation begins on the seventh day and is completed on the eleventh, when the endometrial epithelium grows over the fibrin clot.',
        B: 'True, so not the answer. The trophoblast differentiates into an inner cytotrophoblast and an outer syncytiotrophoblast, beginning at the embryonic pole on the seventh day.',
        C: 'Correct, in that this is the wrong statement. The inner cell mass becomes a *bilaminar* disc in the second week — epiblast and hypoblast. It becomes trilaminar only in the third week, by gastrulation.',
        D: 'True, so not the answer. The amniotic cavity is formed on the eighth day, within the inner cell mass.',
      },
    },
    {
      key: 'somatic-extraembryonic-mesoderm-dep-book-14e3f22a',
      conceptKey: 'extraembryonic-mesoderm-somatic-and-splanchnic',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Say what the somatic leaf of the extra-embryonic mesoderm lines.',
      explanations: {
        A: 'The connecting stalk is the part of the extra-embryonic mesoderm that the chorionic cavity does *not* split into either leaf, because it bridges chorion and embryonic disc. It is a third thing, not the somatic leaf.',
        B: 'That is the splanchnic leaf. The two options are printed as a pair in these books, in this question and in its mirror image on the facing page, and swapping them is the whole trap.',
        C: 'Correct. The somatic — somatopleuric — leaf lines the cytotrophoblast, and with the cytotrophoblast and syncytiotrophoblast outside it forms the three layers of the chorion.',
        D: 'One layer too far out. The somatic mesoderm lies against the cytotrophoblast; the syncytiotrophoblast is outside the cytotrophoblast, facing the maternal blood, and nothing embryonic lines it.',
      },
    },
    {
      key: 'splanchnic-extraembryonic-mesoderm-4d303507',
      conceptKey: 'extraembryonic-mesoderm-somatic-and-splanchnic',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Say what the splanchnic leaf of the extra-embryonic mesoderm covers.',
      explanations: {
        A: 'The amniotic cavity is covered by the somatic leaf, which also lines the cytotrophoblast. This is the mirror-image question, and this is the mirror-image answer.',
        B: 'Correct. The splanchnic — splanchnopleuric — leaf covers the secondary yolk sac; splanchnic means visceral, and the yolk sac is the gut-to-be.',
        C: 'Lining the cytotrophoblast is the somatic leaf\'s job, and it is what makes the somatic leaf the innermost layer of the chorion.',
        D: 'Nothing embryonic lines the syncytiotrophoblast: it is the outermost layer of the conceptus, in contact with maternal blood in the lacunae.',
      },
    },
    {
      key: 'is-the-middle-layer-of-chorion-c2980524',
      conceptKey: 'chorion-three-layers-and-the-chorionic-vesicle',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Name the middle of the three layers of the chorion.',
      explanations: {
        A: 'Correct. The chorion is somatic mesoderm, cytotrophoblast and syncytiotrophoblast from inside outwards, so the cytotrophoblast is the middle layer whichever end you count from.',
        B: 'The syncytiotrophoblast is the outermost layer, facing the maternal blood in the intervillous spaces. It is the layer the placental barrier keeps longest.',
        C: 'The somatic extra-embryonic mesoderm is the innermost layer, lining the chorionic cavity. Picked by a student counting the layers from the outside in.',
        D: 'The splanchnic leaf is no part of the chorion at all — it covers the yolk sac, on the other side of the chorionic cavity.',
      },
    },
    {
      key: 'primary-chorionic-villi-dep-book-y-ad-ac-em-64a44f78',
      conceptKey: 'chorionic-villi-types-development',
      difficulty: 'Hard',
      questionType: 'Structure and function',
      learningObjective: 'Give what a primary chorionic villus is made of and what it has not got yet.',
      answerOverride: 'A',
      answerOverrideReason:
        'The department-book copy marks B — that a primary villus contains fetal blood vessels — which is the definition of a *tertiary* villus. The department book states that primary villi are "a core of cytotrophoblast covered by syncytiotrophoblast", which is option A, and that vessels appear only at the tertiary stage by the end of the third week.',
      explanations: {
        A: 'Correct. A primary villus is a core of proliferating cytotrophoblast covered by syncytiotrophoblast, and that is all it is: no mesoderm, no vessels.',
        B: 'The mark this copy carries, and the definition of a tertiary villus. Mesoderm enters the core at the secondary stage and vessels form in that mesoderm at the tertiary — two steps after this one.',
        C: 'The middle of the third week is when *secondary* villi appear. Primary villi start at the end of the second week, which is why they are on this leaf at all.',
        D: 'The fetal part of the placenta is the chorion frondosum, made of well-developed tertiary villi. A primary villus is three weeks and two stages away from being placenta.',
      },
    },
    {
      key: 'secondary-chorionic-villi-dep-book-ac-em-8d6aeb49',
      conceptKey: 'chorionic-villi-types-development',
      difficulty: 'Hard',
      questionType: 'Developmental timing',
      learningObjective: 'Give what makes a villus secondary and when it happens.',
      answerOverride: 'C',
      answerOverrideReason:
        'The department-book copy marks B — that a secondary villus contains fetal blood vessels — the same mark it puts on the primary villus question, and equally wrong: the department book states that vessels develop in the mesodermal core at the *tertiary* stage. What the book does state of the secondary villus is that it forms "at the middle of the third week", which is option C.',
      explanations: {
        A: 'True of a primary villus, and true of a secondary one as far as it goes — but incomplete, because what makes a villus secondary is the somatic mesoderm that has entered its core, which this option does not mention.',
        B: 'The mark this copy carries, and the definition of the tertiary villus. A secondary villus has a mesodermal core and no vessels in it yet; the vessels are what promote it to tertiary.',
        C: 'Correct. Secondary villi form at the middle of the third week, when somatic mesoderm is incorporated into the core of the primary villi.',
        D: 'The fetal part of the placenta is chorion frondosum, carrying well-developed *tertiary* villi. A secondary villus has neither the vessels nor the exchange surface for that.',
      },
    },
    {
      key: 'late-placental-barrier-is-composed-of-dep-book-7b85a221',
      conceptKey: 'placental-barrier-early-and-late-layers',
      difficulty: 'Hard',
      questionType: 'Structure and function',
      learningObjective: 'Give the two layers of the placental barrier in the second half of pregnancy.',
      answerOverride: 'B',
      answerOverrideReason:
        'The row carries no key. The department book states that in early pregnancy the barrier is syncytiotrophoblast, cytotrophoblast, somatic mesoderm and fetal vessel endothelium, and that "in the second half of pregnancy it is only syncytiotrophoblast and endothelium of fetal blood vessels" — which is option B.',
      explanations: {
        A: 'These are the two trophoblast layers, the outer two of the four in the early barrier. It is the cytotrophoblast that is lost, so keeping it and losing the endothelium inverts what happens.',
        B: 'Correct. From the fourth month the barrier is syncytiotrophoblast and the endothelium of the fetal blood vessels only — the outermost and innermost of the original four, with both middle layers gone.',
        C: 'Both of these are lost. The cytotrophoblast and the somatic mesoderm are precisely the two middle layers that disappear as the membrane thins.',
        D: 'Half right and half wrong in the most tempting way: the endothelium does persist, but the cytotrophoblast does not, and no barrier can lack the syncytiotrophoblast that faces the maternal blood.',
      },
    },
    {
      key: 'the-source-of-the-three-germ-layers-is-4fc8b443',
      conceptKey: 'gastrulation-trilaminar-disc-from-epiblast',
      difficulty: 'Moderate',
      questionType: 'Developmental process',
      learningObjective: 'Name the layer of the bilaminar disc that gives rise to all three germ layers.',
      explanations: {
        A: 'The intuitive answer and a false one. The hypoblast is displaced by invaginating epiblast cells and ends up lining the yolk sac; it contributes no layer to the embryo.',
        B: 'Correct. All three germ layers come from the epiblast: invaginating cells become endoderm and intra-embryonic mesoderm, and what stays behind is the ectoderm.',
        C: 'The extra-embryonic mesoderm lies outside the disc entirely, between the cytotrophoblast and the two cavities, and becomes chorion, connecting stalk and villus cores.',
        D: 'The cytotrophoblast is trophoblast — placental tissue. Nothing in the embryo proper descends from it.',
      },
    },
    {
      key: 'regarding-the-notochord-170a5e93',
      conceptKey: 'notochord-formation-fate',
      difficulty: 'Hard',
      questionType: 'Structure and function',
      learningObjective: 'Give the extent, function, timing and fate of the notochord.',
      explanations: {
        A: 'The wrong part of the intervertebral disc. The notochord persists as the *nucleus pulposus*, the soft centre; the annulus fibrosus around it comes from the sclerotome.',
        B: 'The notochord runs from the primitive pit cranially to the bucco-pharyngeal membrane. The cloacal membrane is caudal to the primitive streak, so this option describes a notochord running the length of the disc, which it never does.',
        C: 'Correct. The relative firmness of the notochord is what limits the head fold, in the same way that the firmness of the primitive streak limits the tail fold.',
        D: 'The notochord is a third-week structure, formed by invagination through the primitive pit. In the second week there is no primitive pit and no trilaminar disc for it to lie in.',
      },
    },
    {
      key: 'regarding-the-somites-choose-the-true-statement-2017-2nd-dep-0e47c135',
      conceptKey: 'paraxial-mesoderm-somite-derivatives',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Say what a somite is a segment of and what it does not give rise to.',
      answerOverride: 'A',
      answerOverrideReason:
        'This reprint of the 2017 second sitting marks B, that somites start forming during the second week. The department book states that the intra-embryonic mesoderm divides into its three parts on the seventeenth day and that the first pair of occipital somites separates on the twentieth — both of them third-week dates, and both after the paraxial mesoderm the somites are segments of even exists. Option A is the book\'s own definition of a somite.',
      explanations: {
        A: 'Correct. Somites are the transverse segments of the paraxial mesoderm, which lies on both sides of the notochord and the neural tube.',
        B: 'The mark this reprint carries, and impossible: in the second week there is no intra-embryonic mesoderm at all. The first pair of somites separates on the twentieth day.',
        C: 'The smooth muscle of the gut comes from the splanchnopleuric leaf of the lateral plate mesoderm. Somites give skeletal muscle, dermis and vertebrae — the body wall, not the viscera.',
        D: 'Intermediate mesoderm gives the urogenital system. Somites are segments of the paraxial mesoderm, which is the division medial to it.',
      },
    },
    {
      key: 'the-earliest-source-of-amniotic-fluid-is-720ff8b0',
      conceptKey: 'amniotic-fluid-functions',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Name the first source of amniotic fluid and place it against the later ones.',
      explanations: {
        A: 'The epiblast forms the floor of the amniotic cavity but secretes nothing into it. It is on its way to becoming the whole embryo.',
        B: 'Diffusion from maternal blood by osmosis is the *second* source, and the major one through most of pregnancy — but it is not the earliest.',
        C: 'Fetal urine is the third and last source, added only from the fifth month, once the kidneys work. It is also why a fetus with renal agenesis has too little amniotic fluid.',
        D: 'Correct. The amnioblast cells that roof the amniotic cavity from the eighth day are its first source, before there is any fetal circulation or kidney to add to it.',
      },
    },
    {
      key: 'all-of-the-following-are-abnormal-sites-of-implantation-exce-cafc7147',
      conceptKey: 'blastocyst-structure-poles-and-the-start-of-implantation',
      difficulty: 'Moderate',
      questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three options survived — the internal os, the mesentery of the small intestine and the uterine tube — and all three are abnormal sites of implantation, so the exception the stem asks for was in the option that was lost. The row carries no key. Recoverable only by rescanning page 117 of the department book.',
    },
    {
      key: 'amniotic-cavity-starts-formation-at-the-3c9d19db',
      conceptKey: 'second-week-day-by-day-events-of-implantation',
      difficulty: 'Moderate',
      questionType: 'Developmental timing',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The ordinal in every option was destroyed by the scan: the options read "ih day", "ath day", "gth day" and "10th day", so three of the four numbers a student would have to choose between are unreadable. The key marks B, and the department-book copy with intact options — `amniotic-cavity-starts-formation-at-the-dep-book-fe3e505c` — agrees with it and is the one imported.',
    },
    {
      key: 'cytotrophoblastic-shell-is-formed-from-cytotrophoblast-of-893da810',
      conceptKey: 'chorionic-villi-types-development',
      difficulty: 'Hard',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Unkeyed, and its sibling `...-dep-book-5a6da708` is keyed to an answer the department book contradicts. See that row for the reasoning; the disagreement is recorded on `chorionic-villi-types-development` rather than resolved by an author choosing between the two tertiary options the book leaves open.',
    },
    {
      key: 'cytotrophoblastic-shell-is-formed-from-cytotrophoblast-of-de-5a6da708',
      conceptKey: 'chorionic-villi-types-development',
      difficulty: 'Hard',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The only keyed copy, and its mark is B — the secondary chorionic villi — which the department book contradicts: it states that the cytotrophoblastic shell originates from the cytotrophoblastic layer of the *tertiary* villi. But the book does not say which tertiary villi, and the row offers two tertiary options, stem and floating. Overriding to either would be an author choosing an answer the faculty has not stated, so the question is excluded and the conflict recorded on the concept instead. Resolvable by a faculty reviewer, not by a rescan.',
    },
    {
      key: 'during-the-second-week-of-development-the-trophoblast-differ-faf89e56',
      conceptKey: 'second-week-day-by-day-events-of-implantation',
      difficulty: 'Easy',
      questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The option set is contaminated. Option B reads "The blastocyst begins implantation by its embryonic pole", which is a statement from a different question and is not an answer to "the trophoblast differentiates into"; the real option B is gone, and option D trails a fragment of the page margin. The keyed answer A is right, but a question with a foreign option in it cannot be sat as printed, and no other copy of this question survives in the bank.',
    },
    {
      key: 'early-amniotic-cavity-separates-between-dep-book-ac-p-a-amni-dd2b8ddd',
      conceptKey: 'bilaminar-embryonic-disc-and-the-amniotic-cavity',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The department-book copy of `early-amniotic-cavity-separates-between-7d4d9cdc`, marked C — amnioblast and hypoblast — where the book puts the epiblast between the amniotic cavity and the hypoblast. Its stem has also swallowed options A and B. The correctly keyed copy was asked twice and is the one imported.',
    },
    {
      key: 'is-the-middle-layer-of-chorion-dep-book-y-e4d5758c',
      conceptKey: 'chorion-three-layers-and-the-chorionic-vesicle',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The department-book copy of `is-the-middle-layer-of-chorion-c2980524`, marked D — the splanchnic extra-embryonic mesoderm, which is not a layer of the chorion at all: it covers the yolk sac, on the far side of the chorionic cavity. The correctly keyed copy is imported.',
    },
    {
      key: 'late-placental-barrier-is-compose-6dbf1350',
      conceptKey: 'placental-barrier-early-and-late-layers',
      difficulty: 'Hard',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Every option is mutilated: "Syncytiotrophoblast and Cytotrophy", "endotheliur. etal blood vessels", "extraembryonic xderm", "endothelium of ‏أ‎ vessels". The stem lost its last word too. The intact copy is `late-placental-barrier-is-composed-of-dep-book-7b85a221`.',
    },
    {
      key: 'late-placental-barrier-is-composed-of-b86a2ed1',
      conceptKey: 'placental-barrier-early-and-late-layers',
      difficulty: 'Hard',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Only two options survived, both with OCR damage ("Syhcytiotrophoblast", "fetal blond vessels"), and the row carries no key. The intact copy is imported instead.',
    },
    {
      key: 'notochord-is-developed-from-lo-dfce29cd',
      conceptKey: 'notochord-formation-fate',
      difficulty: 'Hard',
      questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A damaged copy of the "notochord is developed from" question, whose option D has been replaced by "It is formed during the second week of pregnancy" from the neighbouring notochord question, so the correct option — epiblast cells at the wall of the primitive pit — is missing. The question is authored in `third-week-of-development.ts`, where its clean keyed copy sits.',
    },
    {
      key: 'one-of-the-following-is-an-event-of-the-9-day-of-pregnancy-h-770fe64c',
      conceptKey: 'second-week-day-by-day-events-of-implantation',
      difficulty: 'Hard',
      questionType: 'Developmental timing',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The option set collapsed into a mixture of two questions: it offers "Formation of hypoblast", "Formation of primary chorionic villi", "11th day of pregnancy" and "8th day of pregnancy" — two events and two dates, from the day-of-pregnancy question and the chorionic-vesicle question that follow each other on the page. The intact copy is `one-of-the-following-is-an-event-of-the-9th-day-of-pregnancy-35412c8d`.',
    },
    {
      key: 'primary-chorionic-villi-7-169939a0',
      conceptKey: 'chorionic-villi-types-development',
      difficulty: 'Hard',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A duplicate of `primary-chorionic-villi-dep-book-y-ad-ac-em-64a44f78` with OCR debris through every option ("cytotrophoblast.and syncytiotrophoblast", "Tt forms the fetal part") and no key. The department-book copy has intact options and is imported with an override.',
    },
    {
      key: 'primary-chorionic-villi-84166b6e',
      conceptKey: 'chorionic-villi-types-development',
      difficulty: 'Hard',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A third copy that lost option C — the timing option — and carries no key. Since the timing is what separates a primary villus from a secondary one, what this row lost is the distinction the question exists to test.',
    },
    {
      key: 'regarding-implantation-ebe480e4',
      conceptKey: 'blastocyst-structure-poles-and-the-start-of-implantation',
      difficulty: 'Hard',
      questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The cleanest stem of the three copies and the one option set that cannot be sat. Option D was truncated to "Implantation cavity is formed through the action of proteolytic enzymes", and the words that were lost — "produced from embryonic disc" — are the whole of what makes it false. As printed, D is true: the implantation cavity really is made by proteolytic enzyme, from the syncytiotrophoblast. That gives the question two correct answers, so the complete department-book copy `regarding-implantation-dep-book-em-ac-p-a-it-starts-at-the-9-ab5620c5` is imported instead despite the pencil note in its stem.',
    },
    {
      key: 'regarding-implantation-i-237fda61',
      conceptKey: 'blastocyst-structure-poles-and-the-start-of-implantation',
      difficulty: 'Hard',
      questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The third copy, reduced to two options — the ninth day and the chorionic vesicle — both of which are false, so the correct answer was in one of the two options that were lost. Unkeyed.',
    },
    {
      key: 'regarding-the-notochord-dep-book-3021a059',
      conceptKey: 'notochord-formation-fate',
      difficulty: 'Hard',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The department-book copy of `regarding-the-notochord-170a5e93`, marked B — that the notochord lies between the cloacal and bucco-pharyngeal membranes. The book gives its cranial limit as the bucco-pharyngeal membrane and its origin as the primitive pit, which lies well cranial to the cloacal membrane. The correctly keyed copy is imported.',
    },
    {
      key: 'regarding-the-stomodeum-dep-book-em-ac-p-a-it-is-lined-with-e89624ad',
      conceptKey: 'second-week-day-by-day-events-of-implantation',
      difficulty: 'Hard',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The option set has broken apart. Option A now reads "Second week", carried in from another question, while the real option A — that the stomodeum is lined with ectoderm, which is the true statement and therefore the answer — has been read into the stem instead. What survives is three false options and a date. Recoverable only by rescanning page 126 of the department book.',
    },
    {
      key: 'secondary-chorionic-villi-578434d1',
      conceptKey: 'chorionic-villi-types-development',
      difficulty: 'Hard',
      questionType: 'Developmental timing',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option C was lost, and option C — "it is formed at the middle of the 3rd week of pregnancy" — is the correct answer. Unkeyed. The complete copy is `secondary-chorionic-villi-dep-book-ac-em-8d6aeb49`.',
    },
    {
      key: 'somatic-extraembryonic-mesoderm-6de9610f',
      conceptKey: 'extraembryonic-mesoderm-somatic-and-splanchnic',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option C was lost, and option C — "lines cytotrophoblast" — is the correct answer. Unkeyed, with line-ending debris on the rest. The complete copy is `somatic-extraembryonic-mesoderm-dep-book-14e3f22a`.',
    },
    {
      key: 'splanchnic-extraembryonic-mesoderm-dep-book-em-ac-p-a-covers-70bc5912',
      conceptKey: 'extraembryonic-mesoderm-somatic-and-splanchnic',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The department-book copy of `splanchnic-extraembryonic-mesoderm-4d303507`, unkeyed, with options A and B both read into the stem. The keyed copy is imported.',
    },
    {
      key: 'ssssessusessnee-is-the-middle-layer-of-chorion-f18c3d53',
      conceptKey: 'chorion-three-layers-and-the-chorionic-vesicle',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Two options survived, the cytotrophoblast and the splanchnic mesoderm, and the dotted blank in the stem was read as "ssssessusessnee". Unkeyed. The complete copy is `is-the-middle-layer-of-chorion-c2980524`.',
    },
    {
      key: 'the-earliest-source-of-amniotic-uid-is-dep-book-em-em-em-em-5abb95ed',
      conceptKey: 'amniotic-fluid-functions',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The department-book copy of `the-earliest-source-of-amniotic-fluid-is-720ff8b0`. It lost option B and is marked A, the epiblast, where the book names the amnioblast cells as the first source. Both faults in one row; the keyed clean copy is imported.',
    },
    {
      key: 'the-nger-iike-projections-of-cytotrophoblast-into-syncytiotr-1ef26963',
      conceptKey: 'chorionic-villi-types-development',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Five options, two of them fragments of neighbouring questions ("Secondary chorionic villi Notochord", "Amniotic and uterine cavities Acad Acad 9|Page"), the stem printed twice, and a mark on D where the description in the stem — finger-like projections of cytotrophoblast into syncytiotrophoblast, with no mesoderm — is the department book\'s definition of the *primary* villus. Neither the option set nor the answer can be repaired from what survives.',
    },
    {
      key: 'the-oor-of-the-amniotic-cavity-is-formed-by-2022-y-ad-ac-a-e-08f9c828',
      conceptKey: 'bilaminar-embryonic-disc-and-the-amniotic-cavity',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option D was replaced by a page footer — "Amniotic Acad Acad 16 | a g e iP iP" — and the mark is on B, mesoderm, where the floor of the amniotic cavity is the epiblast, which becomes the ectoderm. A question whose printed key is wrong and whose fourth option is a page number cannot be repaired here; a rescan of page 127 would give a good question.',
    },
    {
      key: 'the-source-of-the-three-germ-layers-is-1-09d920ab',
      conceptKey: 'gastrulation-trilaminar-disc-from-epiblast',
      difficulty: 'Moderate',
      questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Options B and C were run together into one line — "Epiblast. 0 ‏ا‎ 0 Extraembryonic mesoderm." — so the row carries three options where the book printed four, and one of them holds two answers. Unkeyed. The clean copy `the-source-of-the-three-germ-layers-is-4fc8b443` was asked twice and is imported.',
    },
    {
      key: 'the-source-of-the-three-germ-layers-is-dep-book-83adb804',
      conceptKey: 'gastrulation-trilaminar-disc-from-epiblast',
      difficulty: 'Moderate',
      questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The department-book copy, marked C — the extra-embryonic mesoderm — where the department book states that all three layers of the embryonic disc are derived from the epiblast. The extra-embryonic mesoderm lies outside the disc and becomes chorion and connecting stalk. The correctly keyed copy is imported.',
    },
  ],
}
