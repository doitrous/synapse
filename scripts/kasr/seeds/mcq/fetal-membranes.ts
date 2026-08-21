/**
 * `101 ISK > Anatomy > General Embryology > Fetal Membranes` — the question
 * books' MCQs.
 *
 * Sixty-nine rows, the largest leaf in general embryology, and twenty-four
 * questions. The department's chapter is the longest in the book — twelve
 * pages carrying thirteen ILOs, more than any other — and the books ask across
 * all of it: the two plates of the placenta and the septa between them, the
 * barrier, the functions and hormones, the six families of placental anomaly,
 * the amnion and its expansion, the cord from primitive ring to definitive
 * cord, the yolk sac and its five functions, and the twins. What the leaf turns
 * out to be is a chapter examined evenly rather than a chapter with one famous
 * question in it.
 *
 * Six rows are not embryology. They are connective-tissue questions — collagen
 * types, mucoid connective tissue, reticular and yellow elastic tissue — that
 * name the umbilical cord or the placenta in one of their options, and the
 * extractor filed them here on that word. Two more are upper-limb joint
 * questions whose text has merged with an embryology question below it on the
 * page. All eight are excluded to the leaves that own them.
 *
 * The three rules that pick between copies are the same as in the other
 * embryology leaves. One copy per distinct question, with the rest kept and
 * named against it. The copy with the complete option set wins, even when its
 * stem carries a reader's pencil — `em`, `Ac`, `ad`, `Vi`, `P` and the
 * occasional option written into the stem are marginalia from the department
 * book's own pages and appear on a hundred rows this corpus already imports; a
 * row that lost an option, gained one from its neighbour or printed one twice
 * cannot be repaired and does not win. And the source's answer stands unless
 * the department book contradicts it, in which case an override names the
 * sentence it stands on.
 *
 * Ten answers are supplied or overridden — five where no copy of the question
 * was ever keyed and the answer comes from a sentence of the department book
 * named in the override, five against a pencilled mark the book contradicts.
 * Two of the second kind would teach a student something dangerous: the placental
 * barrier marked as the separation between the cytotrophoblastic shell and the
 * intervillous spaces rather than between fetal and maternal blood, and the
 * functions of the placenta marked "it prevents the passage of all viruses" —
 * where the department book names five viruses that cross it, HIV among them.
 *
 * One conflict is recorded rather than resolved. The 2024 sitting asks what is
 * responsible for the development of the bladder, and the department book's
 * sentence in this chapter gives the apex of the bladder to the proximal part
 * of the allantois while its Embryonic Period chapter gives most of the
 * bladder's lining epithelium to endoderm. Both are the same faculty's words.
 * The allantois is the answer the question is drawn from and the conflict sits
 * on `yolk-sac-development-and-functions`.
 *
 * One exclusion is worth naming because it is not a scan fault. The only keyed
 * copy of the monozygotic twin question lost an option and carries three, below
 * the four-to-five the question contract requires, so the four-option
 * department-book copy is imported instead and the excluded row\'s key is
 * carried across to it as a recorded override. The answer is still the
 * source\'s; only the page it was marked on has changed.
 *
 * Nine of the fourteen concepts are reused verbatim from lanes that reached
 * this material first — `decidua-definition-parts-fates`, `placenta-anomalies`,
 * `umbilical-cord-anomalies`, `chorionic-villi-types-development` and
 * `notochord-formation-fate` from the sat papers, and
 * `second-week-day-by-day-events-of-implantation`, `chorion-three-layers-and-the-chorionic-vesicle`
 * and `placental-barrier-early-and-late-layers` shared with
 * `second-week-of-development.ts`, where the book teaches them.
 */
import type { McqLeafSeed } from '../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Fetal Membranes',
  modulePath: '101 ISK > Anatomy > General Embryology > Fetal Membranes',
  articleId: 'ART-101-ANA-CHORIONIC-VILLI-PLACENTA',

  concepts: [
    {
      key: 'placenta-structure-plates-septa-and-cotyledons',
      label: 'The placenta is a fetal chorionic plate and a maternal decidual plate with the intervillous spaces between them, divided into cotyledons by septa that never reach across',
      definition:
        'The placenta is formed by the union of two plates. The fetal part is the chorionic plate — the chorion frondosum — made from outside inwards of amnion, somatopleuric extra-embryonic mesoderm, cytotrophoblast and syncytiotrophoblast, and carrying the umbilical vessels that enter and leave the villi. The maternal part is the decidual plate — the decidua basalis — made from outside inwards of decidua basalis containing maternal arterioles, venules and uterine glands, then the cytotrophoblastic shell, then the syncytiotrophoblast that lines the intervillous spaces. Between the two plates hang the tertiary villi, bathed in maternal blood in the intercommunicating intervillous spaces. Placental (decidual) septa are incomplete partitions running from the decidual plate into those spaces, each a core of decidua basalis covered by cytotrophoblast and syncytiotrophoblast; because they are incomplete they do not reach the chorionic plate, and opposite each of them a groove on the maternal surface marks off one of the fifteen to twenty cotyledons.',
      objective:
        'Name the two plates of the placenta and their layers, say what the septa are made of and where they run, and explain what a cotyledon is.',
      pitfall:
        'Calling the septa fetal because they hang into the intervillous spaces where the villi are. They grow up from the decidual plate and their core is maternal decidua; a fetal septum would have to be chorion frondosum, and chorion frondosum is the plate they run away from.',
      subject: 'dev',
      primary: 'DIS-EMB-T02',
      secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > Fetal Membranes',
      type: 'structural_description',
      aliases: ['Chorionic plate', 'Decidual plate', 'Cotyledons', 'Placental septa', 'Intervillous spaces'],
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
      key: 'placental-functions-and-hormones',
      label: 'The placenta exchanges, excretes, transmits maternal antibodies and secretes four hormones — and the immunity it passes on is the function students most often deny it',
      definition:
        'The department book gives the placenta six functions: exchange of metabolic products, exchange of gases, transmission of maternal antibodies to the fetal blood from the fourteenth week so that the fetus gains passive immunity, an endocrine function, a protective role, and an excretory function removing fetal urea and creatinine. Its four hormones are progesterone, which maintains the endometrium of pregnancy; oestrogen, which stimulates growth of the uterus and maturation of the mammary gland; human chorionic gonadotropin, which maintains the corpus luteum to the fourth month and is what a pregnancy test detects; and somatomammotropin, which gives the fetus priority over maternal blood glucose and promotes breast development. The protective role is real but partial: the barrier stops bacteria and most viruses, and the book names five that cross it anyway — HIV, poliomyelitis, rubella, cytomegalovirus and measles.',
      objective:
        'Enumerate the functions of the placenta and its four hormones, and state the limits of its protective role.',
      pitfall:
        'Reading "protective" as absolute. The book lists the viruses that cross, and rubella and cytomegalovirus crossing is the whole reason congenital infection exists as a subject.',
      subject: 'dev',
      primary: 'DIS-EMB-T02',
      secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > Fetal Membranes',
      type: 'structure_function_relationship',
      aliases: ['HCG', 'Somatomammotropin', 'Placental hormones', 'Passive immunity'],
    },
    {
      key: 'placenta-anomalies',
      label: 'The placenta goes wrong in six ways, and the department groups them by what is abnormal',
      definition:
        'The congenital anomalies of the placenta are grouped by what is abnormal about it: position, as in placenta previa; shape, bilobed or trilobed; number, twin or accessory placenta; attachment of the umbilical cord, velamentous where the cord is attached through the amniotic membrane and battledore where it is attached to the margin; diameter, as in placenta membranacea, which is thinner and wider; and infiltration, as accreta, increta and percreta.',
      objective: 'Enumerate the congenital anomalies of the placenta under the six headings the department book uses.',
      pitfall: 'Listing names without the grouping. The book groups them by position, shape, number, cord attachment, diameter and infiltration, and the grouping is what makes six unrelated names recallable.',
      subject: 'dev',
      primary: 'DIS-EMB-T02',
      secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > Fetal Membranes',
      type: 'clinical_correlation',
      aliases: ['Velamentous placenta', 'Battledore placenta', 'Placenta membranacea', 'Placenta accreta'],
      gaps: [
        'The department book prints "placenta accreta: placenta infiltrates till the myometrium" and "placenta increta: placenta infiltrates the myometrium". As printed the two definitions are all but identical and the accreta/increta distinction is not drawn. Recorded as the book states it; a faculty reviewer is needed rather than a rescan.',
      ],
    },
    {
      key: 'umbilical-cord-anomalies',
      label: 'The cord goes wrong in its length, its contents, its vessels or its attachment',
      definition:
        'The congenital anomalies of the umbilical cord are: a short cord, which limits fetal movement and can separate the placenta prematurely during delivery; a long cord, which may encircle the fetal neck or form a true knot; congenital umbilical hernia (omphalocele), where the proximal cord contains intestinal loops because the intestine failed to return to the abdominal cavity; presence of only one umbilical artery from degeneration of the other; and abnormal attachment to the placenta — battledore, at the margin, or velamentous, through the amniotic membrane.',
      objective: 'Enumerate the congenital anomalies of the umbilical cord and give the consequence of each.',
      pitfall: 'Calling a false knot an anomaly. A false knot is a wider curve of an umbilical artery and the book says it causes no fetal stress; it is the true knot, in a long cord, that matters.',
      subject: 'dev',
      primary: 'DIS-EMB-T02',
      secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > Fetal Membranes',
      type: 'clinical_correlation',
      aliases: ['Omphalocele', 'Single umbilical artery'],
      uncertainty: 'The paper prints its mark marker twice on this question — "{5 Marks}. {5 Marks}". It is one five-mark question; the duplication is a typesetting slip in the paper and appears in both the solved and the unsolved copy.',
    },
    {
      key: 'umbilical-cord-development-ring-to-definitive-cord',
      label: 'The cord is built in three stages — a ring in the belly wall, a primitive cord that carries a herniated intestine, and a definitive cord of two arteries and one vein in Wharton\'s jelly',
      definition:
        'The primitive umbilical ring forms in the fourth week as the expanding amniotic cavity folds the disc and drives the amnio-ectodermal junction ventrally; it is the defect in the ventral abdominal wall, and what passes through it is the allantois and the umbilical vessels inside the connecting stalk, together with the vitelline duct and the vitelline vessels. The primitive umbilical cord forms when the amnion ensheathes those structures, and its contents are the secondary yolk sac, the vitelline duct and vessels, the connecting stalk with the remnant of the allantois and the umbilical vessels, and — from the sixth week — the loops of intestine that herniate into it, the physiological umbilical hernia, because the abdominal cavity is too small to hold the growing gut. The definitive umbilical cord forms when the intestine returns by the third month, one umbilical vein and the extra-embryonic vitelline vessels obliterate, the vitelline duct, secondary yolk sac and extra-embryonic allantois degenerate, and Wharton\'s jelly forms from the mesoderm of the connecting stalk. The finished cord is 50 to 60 cm long and 2 cm across, and carries two umbilical arteries and one umbilical vein.',
      objective:
        'Give the contents of the primitive umbilical ring, of the primitive cord and of the definitive cord, and say what physiological umbilical hernia is and when it resolves.',
      pitfall:
        'Putting the herniated intestine in the primitive umbilical *ring*. The ring is the defect; the loops lie in the primitive umbilical cord that the amnion has wrapped around the structures passing through it, and a loop that is still there at term is an omphalocele.',
      subject: 'dev',
      primary: 'DIS-EMB-T02',
      secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > Fetal Membranes',
      type: 'developmental_process',
      aliases: ['Primitive umbilical ring', 'Primitive umbilical cord', 'Wharton\'s jelly', 'Physiological umbilical hernia'],
    },
    {
      key: 'yolk-sac-development-and-functions',
      label: 'The yolk sac runs primary to secondary to vitelline duct, and does five jobs on the way out',
      definition:
        'Heuser\'s membrane — flat cells derived from the hypoblast — lines the blastocele on the ninth gestational day and converts it into the primary yolk sac. On the thirteenth day new hypoblast-derived cells line Heuser\'s membrane, a large part of the sac is pinched off as the chorionic cavity grows, and what is left, much reduced, is the secondary or definitive yolk sac; the allantois is a diverticulum from its caudal wall that extends into the connecting stalk. After folding the secondary yolk sac is compressed into the vitelline (vitello-intestinal) duct, which connects the midgut to the part of the sac outside the folded disc, and duct and sac then dwindle and degenerate. The department book gives it five functions before it goes: it shares with the endoderm in forming the gut; the proximal part of its allantois forms the apex of the urinary bladder; the primordial germ cells develop in the wall of its caudal part from migrating epiblast; the blood vessels of the gut develop in the mesoderm around the vitelline duct, the intra-embryonic part surviving as the gut\'s blood supply while the extra-embryonic part disappears; and blood cells develop in its splanchnic extra-embryonic mesoderm in early pregnancy.',
      objective:
        'Trace the yolk sac from Heuser\'s membrane to the vitelline duct, and enumerate its five functions.',
      pitfall:
        'Reading the yolk sac as a nutritional store, as its name and its role in other animals suggest. In the human it feeds nothing; it is a source of germ cells, blood cells, gut and gut vessels, and it disappears once each of those has been handed on.',
      subject: 'dev',
      primary: 'DIS-EMB-T02',
      secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > Fetal Membranes',
      type: 'developmental_process',
      aliases: ['Primary yolk sac', 'Secondary yolk sac', 'Definitive yolk sac', 'Vitelline duct', 'Heuser\'s membrane', 'Allantois'],
      conflicts: [
        'The department book\'s Fetal Membranes chapter gives "formation of the apex of the urinary bladder from the proximal part of the allantois" as one of the five functions of the yolk sac, while its Embryonic Period chapter lists most of the urinary bladder and urethra among the mucous lining epithelia derived from endoderm. The 2024 question "which of the following is responsible for bladder development" is drawn from the first of those sentences and is authored with the allantois as its answer; the second sentence is equally the faculty\'s and is recorded here rather than argued away.',
        'The department book states that the definitive (secondary) yolk sac forms on the thirteenth gestational day — the second week. A department-book row, `the-de-nitive-yolk-sac-develops-during-dep-book-ac-ad-ac-ad-aa472d7d` in the Third Week leaf, offers first, third, fourth and fifth week and no second week at all, so none of its options can be right. That row is excluded in `third-week-of-development.ts` and the disagreement recorded here.',
      ],
    },
    {
      key: 'amnion-expansion-and-its-results',
      label: 'The amniotic cavity does its work by expanding: it folds the disc, sheathes the cord, and obliterates first the chorionic cavity and then the uterine cavity',
      definition:
        'The amnion is the wall of the amniotic cavity, and almost everything it does follows from that cavity growing. Its expansion causes folding of the embryonic disc and, with it, the formation of the primitive umbilical ring; it wraps a sheath of amnion around the umbilical cord; it covers the fetal surface of the placenta, which is why that surface is smooth and transparent; it brings the amnion into contact with the chorion at the beginning of the third month, forming the amniochorionic membrane and obliterating the chorionic cavity; and it finally presses that membrane, with the decidua capsularis on it, against the decidua parietalis, obliterating the uterine cavity by the end of the third month. It is the amniochorionic membrane whose premature rupture the book gives as the commonest cause of preterm labour.',
      objective:
        'List the results of expansion of the amniotic cavity in order, and name the two cavities it obliterates and when.',
      pitfall:
        'Attributing the folding of the embryonic disc to the yolk sac because the yolk sac is what folding acts on. It is the amniotic cavity that expands; the yolk sac is compressed into the vitelline duct by that expansion, not the cause of it.',
      subject: 'dev',
      primary: 'DIS-EMB-T02',
      secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > Fetal Membranes',
      type: 'developmental_process',
      aliases: ['Amnion', 'Amniochorionic membrane', 'Amnio-ectodermal junction'],
    },
    {
      key: 'decidua-definition-parts-fates',
      label: 'The decidua is the pregnant endometrium, in three parts named by their relation to the conceptus',
      definition:
        'The decidua is the functional layer of the endometrium after implantation, so named because it is shed at birth. Decidua basalis lies deep to the conceptus and becomes the maternal part of the placenta; decidua capsularis covers it and is stretched and lost as the sac grows; decidua parietalis lines the rest of the cavity and fuses with the capsularis by about the fourth month, obliterating the uterine cavity.',
      objective: 'Define the decidua, name its three parts by their relation to the conceptus, and give the fate of each.',
      pitfall: 'Swapping basalis and capsularis. Basalis is beneath and becomes placenta; capsularis is the covering and disappears.',
      subject: 'dev',
      primary: 'DIS-EMB-T02',
      secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > Fetal Membranes',
      type: 'structural_description',
    },
    {
      key: 'monozygotic-and-dizygotic-twins',
      label: 'Monozygotic twins come from one zygote and are identical and of the same sex; dizygotic twins come from two ova, are the commoner kind, and are no more alike than siblings',
      definition:
        'Twins are of two kinds and almost everything about them follows from how many zygotes there were. Monozygotic twins arise from a single fertilised ovum that splits, so the two share one genome: they are identical in appearance and are necessarily of the same sex, and depending on when the split happened they may share a chorion and even an amnion. Dizygotic twins arise from two ova fertilised by two sperms in the same cycle; they are the commoner of the two kinds, they are non-identical — no more alike than any two siblings — they may be of different sexes, and each has its own amnion and its own chorion.',
      objective:
        'Separate monozygotic from dizygotic twins by their origin, their frequency, their likeness, their sex and their membranes.',
      pitfall:
        'Assuming the identical kind must be the commoner kind because it is the one people notice. Dizygotic twinning is commoner, and the books ask both halves of this pair with the same four options so that reversing them costs two marks rather than one.',
      subject: 'dev',
      primary: 'DIS-EMB-T02',
      secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > Fetal Membranes',
      type: 'comparison',
      aliases: ['Monozygotic twins', 'Dizygotic twins', 'Identical twins', 'Fraternal twins'],
      gaps: [
        'The department book\'s extracted text mentions twin placenta only under the anomalies of the placenta by number, and carries no account of monozygotic and dizygotic twinning itself. The definition here is assembled from the question books\' own options, which the department reprints and keys, rather than from a passage of the chapter.',
      ],
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
  ],

  questions: [
    {
      key: 'regarding-the-placental-decidual-septa-10b5239b',
      conceptKey: 'placenta-structure-plates-septa-and-cotyledons',
      difficulty: 'Hard',
      questionType: 'Structure and function',
      learningObjective: 'Say what the placental septa are made of, where they run from, and how far they reach.',
      explanations: {
        A: 'Chorion frondosum is the fetal plate the septa run *towards*. A septum made of it would be growing down from the fetal side, which reverses the direction the book gives.',
        B: 'Correct. The decidual septa are incomplete extensions from the decidual plate into the intervillous spaces, each with a core of decidua basalis covered by cytotrophoblast and syncytiotrophoblast.',
        C: 'The word the answer turns on is "incomplete". The septa stop short of the chorionic plate, which is why the intervillous spaces intercommunicate and why a cotyledon is a compartment rather than a sealed chamber.',
        D: 'The department book describes the septum as a core of decidua basalis with a trophoblast covering and gives the maternal arterioles, venules and uterine glands to the decidual plate, not to the septa that rise from it. This is the hardest distractor here because the core really is maternal tissue.',
      },
    },
    {
      key: 'one-of-the-following-is-not-true-regarding-the-placenta-2023-8f9f62d3',
      conceptKey: 'placenta-structure-plates-septa-and-cotyledons',
      difficulty: 'Hard',
      questionType: 'Structure and function',
      learningObjective: 'Identify the false statement about the placenta among three true ones.',
      explanations: {
        A: 'True, so not the answer. The fetal part of the placenta is the chorionic plate, which is the chorion frondosum — the part of the chorion whose tertiary villi were never allowed to degenerate.',
        B: 'Correct, in that this is the untrue statement. The maternal part is the decidua *basalis*, the decidual plate lying between the conceptus and the myometrium; the decidua capsularis is the covering that is stretched over the sac and lost.',
        C: 'True, so not the answer. The placental barrier separates fetal blood in the tertiary villi from maternal blood in the intervillous spaces, and the two never mix.',
        D: 'True, so not the answer. The placenta makes progesterone, oestrogen, human chorionic gonadotropin and somatomammotropin, and its endocrine function is one of the six the book lists.',
      },
    },
    {
      key: 'placental-barrier-is-the-separation-between-dep-book-em-em-e-64936622',
      conceptKey: 'placental-barrier-early-and-late-layers',
      difficulty: 'Hard',
      questionType: 'Structure and function',
      learningObjective: 'Define the placental barrier by the two things it keeps apart.',
      answerOverride: 'D',
      answerOverrideReason:
        'The department-book copy marks C — the separation between the cytotrophoblastic shell and the intervillous spaces. The department book defines the placental barrier as the membrane "separating maternal blood in the intervillous spaces from fetal blood in the tertiary villi", which is option D. The cytotrophoblastic shell is on the maternal side of the barrier and is no part of the definition.',
      explanations: {
        A: 'Surfaces, not bloods. The fetal and maternal surfaces of the placenta are the two faces of the organ, several millimetres and a whole villous tree apart; the barrier is a membrane a few cells thick.',
        B: 'The chorionic and decidual plates are the two structural halves of the placenta and the intervillous spaces lie between them. Again this names the anatomy of the organ rather than the membrane inside it.',
        C: 'The mark this copy carries. The cytotrophoblastic shell lines the decidual plate on the maternal side and is not part of the barrier at all; the barrier is what wraps each villus.',
        D: 'Correct. The placental barrier separates maternal blood in the intervillous spaces from fetal blood inside the tertiary villi — and that the two never mix is the single most important fact about the placenta.',
      },
    },
    {
      key: 'one-of-the-following-is-correct-regarding-the-functions-of-p-78fcdecb',
      conceptKey: 'placental-functions-and-hormones',
      difficulty: 'Hard',
      questionType: 'Structure and function',
      learningObjective: 'Identify the true statement about the functions of the placenta.',
      answerOverride: 'A',
      answerOverrideReason:
        'The department-book copy marks D — that the placenta prevents the passage of all viruses. The department book says the opposite in the same chapter: the barrier prevents bacteria and most viruses "except HIV, poliomyelitis, rubella, cytomegalovirus and measles". Option A, the transmission of maternal antibodies, is on the book\'s own list of six placental functions, with the note that it begins at the fourteenth week and gives the fetus passive immunity.',
      explanations: {
        A: 'Correct. Transmission of maternal antibodies to the fetal blood, from the fourteenth week, is one of the six functions the book lists, and it is why a newborn is protected for months against infections it has never met.',
        B: 'The reverse of a placental function. Exchange of gases is second on the book\'s list; a placenta that prevented it would asphyxiate the fetus.',
        C: 'Progesterone is the first of the four placental hormones, and it is what maintains the endometrium of pregnancy after the corpus luteum stops.',
        D: 'The mark this copy carries, and the dangerous one to learn. The barrier stops most viruses; the book names five that cross — HIV, poliomyelitis, rubella, cytomegalovirus and measles — and congenital infection is the whole subject built on that exception.',
      },
    },
    {
      key: 'one-of-the-following-is-not-among-the-anomalies-of-placenta-0dc99158',
      conceptKey: 'placenta-anomalies',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Reject the one option that is not a congenital anomaly of the placenta.',
      answerOverride: 'D',
      answerOverrideReason:
        'The reprint marks B, placenta accreta, which is on the department book\'s own list of placental anomalies under infiltration, alongside increta and percreta. The option that is not a placental anomaly is D: polyhydramnios is an excess of amniotic fluid at full term, listed in the chapter under the amniotic fluid with its own causes — maternal diabetes, oesophageal atresia, anencephaly — and not among the six groups of placental anomaly.',
      explanations: {
        A: 'A placental anomaly, under attachment of the umbilical cord: velamentous placenta is a cord attached to the placenta through the amniotic membrane.',
        B: 'The mark this reprint carries, and a placental anomaly all the same — accreta is the first of the three infiltration anomalies, with increta and percreta.',
        C: 'A placental anomaly, under shape. Bipartite and tripartite — bilobed and trilobed — placentas are on the book\'s list.',
        D: 'Correct. Polyhydramnios is more than two litres of amniotic fluid at full term. It is an abnormality of the fluid, not of the placenta, and it is what a student picks last if they have learnt the six anomaly groups by their headings.',
      },
    },
    {
      key: 'thin-and-wide-placenta-is-known-as-dep-book-a198717a',
      conceptKey: 'placenta-anomalies',
      difficulty: 'Moderate',
      questionType: 'Clinical application',
      learningObjective: 'Name the anomaly of placental diameter.',
      explanations: {
        A: 'Correct. Placenta membranacea is the anomaly of diameter — a placenta thinner and wider than normal, spread over more of the uterine wall.',
        B: 'Placenta increta is an anomaly of infiltration, not of diameter: the placenta grows into the myometrium. Its shape is unremarkable; what is wrong is how deeply it is rooted.',
        C: 'Velamentous placenta is an anomaly of cord attachment, where the cord joins through the amniotic membrane rather than into the placental substance.',
        D: 'An accessory placenta is an anomaly of number — a separate extra lobe. It makes the placenta come in two pieces rather than one thin wide one.',
      },
    },
    {
      key: 'marginal-attachment-of-umbilical-cord-to-the-placenta-is-kno-09cd8da4',
      conceptKey: 'umbilical-cord-anomalies',
      difficulty: 'Moderate',
      questionType: 'Clinical application',
      learningObjective: 'Name the anomaly in which the cord attaches at the placental margin.',
      explanations: {
        A: 'Correct. Battledore placenta is attachment of the umbilical cord to the margin of the placenta rather than near its centre — named for the bat-and-shuttlecock game the shape resembles.',
        B: 'Velamentous placenta is the other cord-attachment anomaly, and the more dangerous: the cord ends outside the placenta and its vessels run through the amniotic membrane to reach it, unprotected by Wharton\'s jelly.',
        C: 'Placenta previa is an anomaly of position — implantation in the lower uterine segment — and has nothing to do with where the cord joins.',
        D: 'Placenta accreta is an anomaly of infiltration, in which the placenta grows too deeply into the uterine wall and cannot separate at delivery.',
      },
    },
    {
      key: 'abnormally-long-umbilical-cord-may-lead-to-dep-book-2024-ac-59be1fce',
      conceptKey: 'umbilical-cord-anomalies',
      difficulty: 'Moderate',
      questionType: 'Clinical application',
      learningObjective: 'Give the consequence of an abnormally long umbilical cord.',
      answerOverride: 'C',
      answerOverrideReason:
        'Neither copy of this question in the bank carries a key. The department book states that a long cord "may encircle the fetal neck or form a true knot" and calls both serious life-threatening conditions — which is option C. Options B and D are the book\'s consequences of a *short* cord, and option A is the false knot it explicitly says causes no fetal stress.',
      explanations: {
        A: 'A false knot is a wider curve of an umbilical artery within the cord, and the department book says plainly that it causes no fetal stress. It is not a consequence of length and not a danger.',
        B: 'Premature separation of the placenta during delivery is what a *short* cord causes: it is pulled taut as the fetus descends and drags the placenta with it.',
        C: 'Correct. A long cord may encircle the fetal neck or tie itself in a true knot, and the book calls both serious and life-threatening.',
        D: 'Adhesion of the fetus to the uterine wall is prevented by the amniotic fluid, not by the cord, and is a consequence of too little fluid rather than of too much cord.',
      },
    },
    {
      key: 'physiological-hernia-occurs-when-a-loop-of-intestine-is-pres-95afdc5e',
      conceptKey: 'umbilical-cord-development-ring-to-definitive-cord',
      difficulty: 'Hard',
      questionType: 'Developmental process',
      learningObjective: 'Say where the intestinal loop lies in physiological umbilical hernia.',
      explanations: {
        A: 'The abdominal cavity is where the intestine is supposed to be, and where it returns to by the third month. A loop there is not herniated at all.',
        B: 'The ring is the defect in the abdominal wall the loop passes *through*, not the space it comes to lie in. This is the closest wrong answer and the one the books pair with the ring question.',
        C: 'Correct. Physiological umbilical hernia is the intestinal loop lying in the primitive umbilical cord, from the sixth week, because the abdominal cavity is too small for the growing gut.',
        D: 'The definitive umbilical cord is what forms *after* the intestine has returned. A loop still in the cord at that stage is an omphalocele — a congenital umbilical hernia, and an anomaly rather than a normal stage.',
      },
    },
    {
      key: 'regarding-the-primitive-umbilical-ring-7dc961fb',
      conceptKey: 'umbilical-cord-development-ring-to-definitive-cord',
      difficulty: 'Hard',
      questionType: 'Structure and function',
      learningObjective: 'Give the contents of the primitive umbilical ring.',
      explanations: {
        A: 'The amniochorionic membrane is formed later, at the beginning of the third month, when the expanding amnion meets the chorion. What surrounds the ring in the fourth week is amnion, at the amnio-ectodermal junction.',
        B: 'The definitive — secondary — yolk sac lies in the primitive umbilical *cord*, once the amnion has ensheathed the structures passing through the ring. The ring itself transmits the duct, not the sac.',
        C: 'Correct. The contents of the primitive umbilical ring are the allantois and umbilical vessels inside the connecting stalk, together with the vitelline duct and its vessels.',
        D: 'The intestinal loops herniate at the sixth week, and into the primitive umbilical cord rather than the ring. Reading the ring and the cord as one structure is what this set of questions exists to catch.',
      },
    },
    {
      key: 'definitive-yolk-sac-is-connected-with-midgut-through-ce358c9f',
      conceptKey: 'yolk-sac-development-and-functions',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Name the structure connecting the definitive yolk sac to the midgut.',
      explanations: {
        A: 'The connecting stalk joins the chorion to the caudal end of the embryonic disc and carries the allantois and the umbilical vessels. It reaches the disc, not the gut.',
        B: 'Correct. Folding compresses the secondary yolk sac into the vitelline (vitello-intestinal) duct, which connects the midgut to the part of the sac left outside the folded embryo.',
        C: 'The allantois is a diverticulum from the caudal wall of the same yolk sac, running into the connecting stalk — a second outgrowth of the sac rather than its connection to the gut.',
        D: 'The hindgut lies in the tail fold and has no connection to the yolk sac. It is the midgut, between the lateral folds, that keeps one.',
      },
    },
    {
      key: 'allantois-is-a-dorsal-extension-from-11d3fece',
      conceptKey: 'yolk-sac-development-and-functions',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Name the structure the allantois arises from.',
      explanations: {
        A: 'Correct. The allantois is a diverticulum from the secondary yolk sac — the department book says from its caudal wall, where this question says dorsal — extending into the connecting stalk.',
        B: 'The amniotic cavity lies on the other side of the embryonic disc entirely, and nothing buds from it: it is a space that expands rather than a wall that grows out.',
        C: 'The chorionic cavity is what the connecting stalk crosses. The allantois runs inside that stalk, but it comes from the yolk sac at one end rather than from the cavity around it.',
        D: 'The primary yolk sac is gone by the thirteenth day, replaced by the secondary one, and the allantois forms after that replacement. One stage too early.',
      },
    },
    {
      key: 'which-of-the-following-is-responsible-for-bladder-developmen-a309b8ba',
      conceptKey: 'yolk-sac-development-and-functions',
      difficulty: 'Hard',
      questionType: 'Developmental process',
      learningObjective: 'Name the structure the department book makes responsible for the bladder.',
      answerOverride: 'A',
      answerOverrideReason:
        'The 2024 row carries no key. The department book\'s Fetal Membranes chapter lists among the functions of the yolk sac "formation of the apex of the urinary bladder from the proximal part of the allantois", which is option A and is the sentence this question is drawn from. Its Embryonic Period chapter separately gives most of the bladder\'s lining epithelium to endoderm, and that tension is recorded on `yolk-sac-development-and-functions` rather than resolved here.',
      explanations: {
        A: 'Correct. The department book gives the apex of the urinary bladder to the proximal part of the allantois, and the allantois is a diverticulum of the secondary yolk sac — which is why bladder development appears in a chapter about fetal membranes at all.',
        B: 'The yolk sac is the allantois\'s parent and does five other jobs, but the book names the allantois specifically for the bladder. Choosing the sac over its diverticulum is one step too general.',
        C: 'Amniotic fluid accumulates fetal urine from the fifth month once the bladder works. It is downstream of bladder development, not a cause of it.',
        D: 'The strongest distractor, and not empty: the department book elsewhere gives most of the urinary bladder and urethra to endoderm, through the primordial gut. The sentence this question is written from names the allantois, and the tension between the book\'s two chapters is recorded on the concept.',
      },
    },
    {
      key: 'heuser-s-membrane-lines-the-a-definitive-yolk-sac-35f78a4b',
      conceptKey: 'yolk-sac-development-and-functions',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Say which yolk sac Heuser\'s membrane lines.',
      explanations: {
        A: 'The definitive yolk sac is the secondary one, lined by the new hypoblast-derived cells that grow over Heuser\'s membrane on the thirteenth day. Heuser\'s membrane is under that lining, not it.',
        B: 'Correct. Heuser\'s membrane is flat cells derived from the hypoblast which line the blastocele on the ninth day, converting it into the primary yolk sac.',
        C: 'One stage late. The secondary yolk sac is formed when fresh endodermal cells re-line Heuser\'s membrane and a large part of the sac is pinched off.',
        D: 'The vitelline duct is what is left of the secondary yolk sac after folding compresses it — several stages downstream, and a duct rather than a membrane.',
      },
    },
    {
      key: 'expansion-of-amniotic-cavity-will-lead-to-f19f597a',
      conceptKey: 'amnion-expansion-and-its-results',
      difficulty: 'Moderate',
      questionType: 'Developmental process',
      learningObjective: 'Name a result of expansion of the amniotic cavity.',
      explanations: {
        A: 'The secondary yolk sac is made by new hypoblast-derived cells lining Heuser\'s membrane on the thirteenth day, before the amniotic cavity has expanded appreciably at all.',
        B: 'The connecting stalk is the part of the extra-embryonic mesoderm that the chorionic cavity does not split. Expansion of the amnion moves it — sweeping it cranially and ventrally during folding — but does not make it.',
        C: 'Correct. The expanding amnion meets the chorion at the beginning of the third month, forming the amniochorionic membrane and obliterating the chorionic cavity between them.',
        D: 'The neural tube is formed by fusion of the neural folds in the third and fourth weeks, driven by the notochord\'s induction of the ectoderm, and owes nothing to the amniotic cavity.',
      },
    },
    {
      key: 'regarding-the-decidua-basalis-one-of-the-following-statement-be62401c',
      conceptKey: 'decidua-definition-parts-fates',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Give the fate of the decidua basalis.',
      answerOverride: 'B',
      answerOverrideReason:
        'The 2018 reprint carries no key. The department book states that "the decidua basalis (decidual plate) persists to form the maternal part of the placenta", which is option B, and gives the other three statements to the capsularis and the parietalis.',
      explanations: {
        A: 'It is the decidua *capsularis* that fuses with the parietalis and obliterates the uterine cavity. The basalis is deep to the conceptus and never meets either of them.',
        B: 'Correct. The decidua basalis is the decidual plate, and it persists as the maternal part of the placenta — the only one of the three parts with a future.',
        C: 'Covering the embryo, and separating it from the uterine cavity, is the decidua capsularis. Basalis is beneath the conceptus, between it and the myometrium.',
        D: 'Degenerating last is the decidua parietalis, which lines the rest of the cavity and is expelled after delivery. The books ask that fact as its own question on the facing page.',
      },
    },
    {
      key: 'regarding-the-decidua-parietalis-choose-the-correct-statemen-61eab5d0',
      conceptKey: 'decidua-definition-parts-fates',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Give the position and fate of the decidua parietalis.',
      explanations: {
        A: 'Between the implanted embryo and the myometrium is the decidua basalis, which becomes the maternal part of the placenta.',
        B: 'Covering the embryo and separating it from the uterine cavity is the decidua capsularis, which the growing sac stretches until it fuses with the parietalis.',
        C: 'Persisting as the maternal part of the placenta is again the basalis. Two of the four options are the basalis, which is what makes this question harder than it looks.',
        D: 'Correct. The decidua parietalis lines the rest of the uterine cavity, fuses with the capsularis to obliterate that cavity, and is expelled with the membranes after delivery — so of the three parts it is the one that degenerates last.',
      },
    },
    {
      key: 'regarding-monozygotic-twin-dep-book-2024-75c8fa43',
      conceptKey: 'monozygotic-and-dizygotic-twins',
      difficulty: 'Moderate',
      questionType: 'Clinical application',
      learningObjective: 'Give what follows from monozygotic twins sharing one zygote.',
      answerOverride: 'B',
      answerOverrideReason:
        'This department-book copy carries no key. The 2025 question book\'s copy of the same question, `regarding-monozygotic-twin-352aa255`, is keyed to B — twins are always of the same sex — and that copy is excluded here only because it lost its fourth option and falls below the four-option contract. The answer is therefore the source\'s and not an author\'s: monozygotic twins arise from one fertilised ovum and share one genome, so they cannot differ in sex.',
      explanations: {
        A: 'Dizygotic twinning is the commoner kind. Monozygotic twins are the ones people notice, which is why this option catches so many.',
        B: 'Correct. Monozygotic twins come from one fertilised ovum, so they carry one genome and are necessarily of the same sex.',
        C: 'Non-identical is the dizygotic answer. Monozygotic twins are identical in appearance — that is what having one genome between two people means.',
        D: 'Development from two ova fertilised by two sperms is the definition of *dizygotic* twinning. Monozygotic means one zygote, and the prefix is the whole answer.',
      },
    },
    {
      key: 'regarding-the-dizygotic-twin-90dcf9d2',
      conceptKey: 'monozygotic-and-dizygotic-twins',
      difficulty: 'Moderate',
      questionType: 'Clinical application',
      learningObjective: 'Give what follows from dizygotic twins arising from two ova.',
      answerOverride: 'A',
      answerOverrideReason:
        'The row carries no key. Dizygotic twins arise from two ova fertilised by two sperms, so they are genetically no more alike than any two siblings — option A. The remaining three options are all consequences of a shared genome or a shared conceptus and belong to the monozygotic side of the same pair of questions; the department book prints and keys the monozygotic copy to "twins are always of same sex", which is the mirror of A.',
      explanations: {
        A: 'Correct. Dizygotic twins come from two ova and two sperms, so they are non-identical — ordinary siblings who happen to share a pregnancy.',
        B: 'Always of the same sex is the monozygotic answer, and it is the option the department book keys on the monozygotic version of this question. Dizygotic twins may be of either sex in any combination.',
        C: 'Each dizygotic twin implants separately and has its own amnion. A shared amnion happens only in monozygotic twinning, and only when the split comes late.',
        D: 'A shared chorion likewise belongs to monozygotic twinning. Two separate implantations give two chorions, though two placentas lying side by side may fuse and look like one.',
      },
    },
    {
      key: 'neurenteric-canal-is-the-communication-between-eb87f229',
      conceptKey: 'notochord-formation-fate',
      difficulty: 'Hard',
      questionType: 'Structure and function',
      learningObjective: 'Name the two cavities the neurenteric canal joins.',
      explanations: {
        A: 'The chorionic cavity is outside the embryonic disc altogether, on the far side of the extra-embryonic mesoderm. Nothing inside the disc opens into it.',
        B: 'Correct. Degeneration of the floor of the notochordal canal, with the endoderm fused to it, briefly joins the amniotic cavity above the disc to the yolk sac below it.',
        C: 'The uterine cavity is maternal, and by this stage it is separated from the conceptus by the whole thickness of the decidua capsularis. Nothing embryonic communicates with it.',
        D: 'Both of these lie below or outside the disc, so a canal between them would not have to pass through it at all — and the point of the neurenteric canal is that it passes right through, which is why it is temporary.',
      },
    },
    {
      key: 'one-of-the-following-is-an-event-of-the-8th-day-of-pregnancy-36b190f2',
      conceptKey: 'second-week-day-by-day-events-of-implantation',
      difficulty: 'Hard',
      questionType: 'Developmental timing',
      learningObjective: 'Assign an event of the second week to the eighth day.',
      explanations: {
        A: 'Correct. On the eighth day the embryoblast cells facing the blastocele become cuboidal and form the hypoblast, and the amniotic cavity appears in the rest of the inner cell mass.',
        B: 'The primary yolk sac forms on the ninth day, when Heuser\'s membrane lines the blastocele. It is the answer to the neighbouring question, printed with the same four options.',
        C: 'Extra-embryonic mesoderm appears on the eleventh and twelfth days, from the wall of the yolk sac — so it cannot come before the yolk sac that produces it.',
        D: 'The primary chorionic villi begin at the end of the second week, after the chorionic vesicle exists on the thirteenth day. They are the last event in the diary.',
      },
    },
    {
      key: 'chorionic-plate-a-is-the-chorion-leave-04836a61',
      conceptKey: 'chorionic-villi-types-development',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Say which part of the chorion the chorionic plate is.',
      explanations: {
        A: 'Chorion leave is the smooth part, whose tertiary villi degenerate and which fuses with the deciduae capsularis and parietalis. It is what the chorionic plate is *not*.',
        B: 'Correct. The chorionic plate is the chorion frondosum — the part carrying well-developed tertiary villi, in contact with the decidua basalis, which persists as the fetal part of the placenta.',
        C: 'Decidua basalis is the maternal plate, on the other side of the intervillous spaces. The two plates face each other and the question turns on knowing which is which.',
        D: 'Decidua capsularis covers the conceptus on the side facing the uterine cavity — the side the chorion leave lies against, and the opposite pole of the placenta from the chorionic plate.',
      },
    },
    {
      key: 'chorionic-vesicle-is-formed-at-the-dep-book-c67d2aab',
      conceptKey: 'chorion-three-layers-and-the-chorionic-vesicle',
      difficulty: 'Hard',
      questionType: 'Developmental timing',
      learningObjective: 'Give the day the chorionic vesicle is formed.',
      answerOverride: 'D',
      answerOverrideReason:
        'Neither copy of this question in the bank carries a key. The department book\'s account of the thirteenth gestational day states that "spaces of the extra-embryonic coelom communicate to form a single chorionic cavity", which is when the chorionic vesicle exists — option D.',
      explanations: {
        A: 'On the tenth day the blastocyst has only just been completely embedded and the syncytiotrophoblast is in its lacunar stage. There is no extra-embryonic mesoderm yet, let alone a cavity in it.',
        B: 'The eleventh day completes implantation and fills the lacunae with maternal blood, and the extra-embryonic mesoderm first appears. Its spaces are still multiple and separate.',
        C: 'The eighth day belongs to the hypoblast and the amniotic cavity, inside the inner cell mass. The chorion does not exist in any form.',
        D: 'Correct. On the thirteenth day the separate spaces of the extra-embryonic coelom run together into one chorionic cavity, and the chorionic vesicle — with its three-layered wall — is what results.',
      },
    },
    {
      key: 'chorionic-villi-are-considered-as-secondary-chorionic-villi-2cea4d11',
      conceptKey: 'chorionic-villi-types-development',
      difficulty: 'Hard',
      questionType: 'Structure and function',
      learningObjective: 'Give the change that promotes a primary villus to a secondary one.',
      answerOverride: 'C',
      answerOverrideReason:
        'This reprint of the 2023 and 2022 sittings marks B, that the villi are covered by syncytiotrophoblast — which is true of a primary villus as well and so cannot be what makes one secondary. The department book states that secondary villi form "when somatic mesoderm is incorporated into the core", which is option C.',
      explanations: {
        A: 'Contact with the decidua basalis is what distinguishes the stem or anchoring branch of a *tertiary* villus from its free branches. It says nothing about which of the three stages a villus has reached.',
        B: 'The mark this reprint carries, and true of every chorionic villus from the primary stage onwards — the syncytiotrophoblast is the outer covering throughout. An option true of all three stages cannot define one of them.',
        C: 'Correct. A primary villus becomes secondary when somatic extra-embryonic mesoderm grows into its cytotrophoblast core, at the middle of the third week.',
        D: 'Branch — free or floating — villi arise from the stem villi of the *tertiary* stage, once vessels have formed. That is one stage further on.',
      },
    },
    {
      key: 'abnormally-long-umbilical-cord-may-lead-to-889819f2',
      conceptKey: 'umbilical-cord-anomalies',
      difficulty: 'Moderate',
      questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A duplicate of `abnormally-long-umbilical-cord-may-lead-to-dep-book-2024-ac-59be1fce` whose option D was truncated to "Adhesion between the fetus with t\' > wall of uterus". Unkeyed, like both copies. The intact copy is imported with an override taken from the department book.',
    },
    {
      key: 'allantois-is-a-dorsal-extension-from-1-df5dcbdb',
      conceptKey: 'yolk-sac-development-and-functions',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A clean but unkeyed copy of `allantois-is-a-dorsal-extension-from-11d3fece`, with the same four options and page furniture in the stem. The keyed copy is imported.',
    },
    {
      key: 'allantois-is-a-dorsal-extension-from-dep-book-3d403c21',
      conceptKey: 'yolk-sac-development-and-functions',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The department-book copy of the same question, also unkeyed. Three copies of one question, of which the keyed one is imported and these two are recorded as duplicates.',
    },
    {
      key: 'chorionic-plate-a-is-the-chorion-leave-i-ac2e4530',
      conceptKey: 'chorionic-villi-types-development',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Options B and C were run together into one line — "Is the chorion frondosum. 0 G Is the decidua basalis." — so the row carries three options where the book printed four, and one of them holds two answers. Unkeyed. The complete copy is `chorionic-plate-a-is-the-chorion-leave-04836a61`.',
    },
    {
      key: 'chorionic-plate-aa0b703c',
      conceptKey: 'chorionic-villi-types-development',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A clean but unkeyed copy of the chorionic plate question, with the same four options. The keyed copy is imported; this one would be the same question a second time with an answer supplied by an author rather than a source.',
    },
    {
      key: 'chorionic-plate-dep-book-em-em-em-em-em-a8dcf7a0',
      conceptKey: 'chorionic-villi-types-development',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The department-book copy, marked C — the decidua basalis — where the department book defines the chorionic plate as the chorion frondosum, the *fetal* part of the placenta. Excluded as a duplicate carrying a wrong margin mark rather than imported with an override, since a correctly keyed copy of the same question exists.',
    },
    {
      key: 'chorionic-vesicle-is-formed-at-the-e1495d12',
      conceptKey: 'chorion-three-layers-and-the-chorionic-vesicle',
      difficulty: 'Hard',
      questionType: 'Developmental timing',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'An unkeyed duplicate of `chorionic-vesicle-is-formed-at-the-dep-book-c67d2aab` in which the ordinal suffixes were read as inch marks — "10\" day", "11\" day", "8\" day" — leaving the numbers legible but the row no better than its twin. The department-book copy is imported with an override.',
    },
    {
      key: 'collagen-type-1-is-present-in-d30b3868',
      conceptKey: 'placenta-structure-plates-septa-and-cotyledons',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Not part of this leaf.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A histology question about collagen types, filed here because "Placenta" is one of its four options. It belongs to the Connective Tissue Fibres leaf of Histology.',
    },
    {
      key: 'collagen-type-iii-forms-f73a03ca',
      conceptKey: 'placenta-structure-plates-septa-and-cotyledons',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Not part of this leaf.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The companion collagen question, filed here on the option "Placental connective tissue". It belongs to the Connective Tissue Fibres leaf.',
    },
    {
      key: 'concerning-to-the-mucous-ct-the-followings-are-true-except-3c6fa9a0',
      conceptKey: 'umbilical-cord-development-ring-to-definitive-cord',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Not part of this leaf.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A histology question about mucous connective tissue, filed here because Wharton\'s jelly of the umbilical cord is its type example. It belongs to the Types of Connective Tissue Proper leaf, which is where the jelly is taught as a tissue rather than as a cord component.',
    },
    {
      key: 'de-nitive-yolk-sac-is-connected-with-midgut-through-dep-book-472797e2',
      conceptKey: 'yolk-sac-development-and-functions',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The department-book copy of `definitive-yolk-sac-is-connected-with-midgut-through-ce358c9f`, marked C — the allantois — where the book gives the vitelline duct. The allantois is the other outgrowth of the same yolk sac and runs to the connecting stalk, not to the gut. The correctly keyed copy was asked twice and is imported.',
    },
    {
      key: 'definitive-yolk-sac-is-connected-with-midgut-through-wi-a-co-e324de0a',
      conceptKey: 'yolk-sac-development-and-functions',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A third copy reduced to two options — the vitelline duct and the hindgut — with option A read into the stem and option C lost. Unkeyed.',
    },
    {
      key: 'expansion-of-amniotic-cavity-will-lead-to-dep-book-ac-ad-ac-0ca89b33',
      conceptKey: 'amnion-expansion-and-its-results',
      difficulty: 'Moderate',
      questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The department-book copy of `expansion-of-amniotic-cavity-will-lead-to-f19f597a`, which lost option B and carries no key. The keyed copy has all four options and is imported.',
    },
    {
      key: 'fetal-movements-are-normally-perceived-by-the-mother-startin-c1773dfb',
      conceptKey: 'amnion-expansion-and-its-results',
      difficulty: 'Easy',
      questionType: 'Developmental timing',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The option set has broken apart: two of its four options — "Always of same sex" and "Has a common chorion" — belong to the twin question further down the same page, and the real options for the months are gone. What survives is "Third month", "Seventh month" and two twin statements. The department book gives the fifth month, which is not among them. Recoverable only by rescanning page 131.',
    },
    {
      key: 'heuser-s-membrane-lines-the-d3bb317b',
      conceptKey: 'yolk-sac-development-and-functions',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A clean but unkeyed copy of `heuser-s-membrane-lines-the-a-definitive-yolk-sac-35f78a4b`, with the same four options. The keyed copy is imported.',
    },
    {
      key: 'heuser-s-membrane-lines-the-definitive-yolk-sac-1-0aec68c9',
      conceptKey: 'yolk-sac-development-and-functions',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A third copy which lost option C, the secondary yolk sac, and had option A read into its stem. Unkeyed.',
    },
    {
      key: 'heuser-s-membrane-lines-the-dep-book-em-em-em-em-em-114cec21',
      conceptKey: 'yolk-sac-development-and-functions',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The fourth copy of the Heuser\'s membrane question, department-book, with all four options and no key. One copy of a question is imported and the keyed one is it.',
    },
    {
      key: 'marginal-attachment-of-umbilical-cord-to-the-placenta-is-kno-d1364623',
      conceptKey: 'umbilical-cord-anomalies',
      difficulty: 'Moderate',
      questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The department-book copy of `marginal-attachment-of-umbilical-cord-to-the-placenta-is-kno-09cd8da4`, marked C — placenta previa, which is an anomaly of position and has nothing to do with cord attachment. The correctly keyed copy was asked twice and is imported.',
    },
    {
      key: 'mucoid-connective-tissue-is-present-in-all-of-the-following-8f3ee0bf',
      conceptKey: 'umbilical-cord-development-ring-to-definitive-cord',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Not part of this leaf.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A histology question about the sites of mucoid connective tissue, filed here because the umbilical cord is one of its options. It belongs to the Types of Connective Tissue Proper leaf.',
    },
    {
      key: 'neurenteric-canal-is-the-communication-between-2017-2nd-dep-452a3c4a',
      conceptKey: 'notochord-formation-fate',
      difficulty: 'Hard',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The option set has been rebuilt out of two questions: it offers "Amniotic sac and chorionic cavity", "Yolk sac and chorionic cavity", "Notochordal canal and amniotic cavity" and "Amniotic and uterine cavities", and the correct pairing — amniotic and yolk sac cavities — is not among them. Its mark, A, points at an option the book contradicts. The intact copy `neurenteric-canal-is-the-communication-between-eb87f229` was asked twice and is imported.',
    },
    {
      key: 'neurenteric-canal-is-the-communication-between-amniotic-and-fc78e051',
      conceptKey: 'notochord-formation-fate',
      difficulty: 'Hard',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A third copy reduced to three options by option A being read into the stem, and unkeyed. The complete copy is imported.',
    },
    {
      key: 'one-of-the-following-is-an-event-of-day-of-pregnancy-1c27a38c',
      conceptKey: 'second-week-day-by-day-events-of-implantation',
      difficulty: 'Hard',
      questionType: 'Developmental timing',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The stem lost the day number: it reads "One of the following is an event of day of pregnancy", with no ordinal. Since every option is an event of a different day of the second week, the missing number is the whole question. Its key, B, is consistent with the ninth day, but the row cannot be sat without knowing which day was asked.',
    },
    {
      key: 'one-of-the-following-is-an-event-of-the-8-day-of-pregnancy-1-ed81d1bd',
      conceptKey: 'second-week-day-by-day-events-of-implantation',
      difficulty: 'Hard',
      questionType: 'Developmental timing',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A copy of the eighth-day question that lost option C, the extra-embryonic mesoderm, and carries no key. The complete keyed copy `one-of-the-following-is-an-event-of-the-8th-day-of-pregnancy-36b190f2` is imported.',
    },
    {
      key: 'one-of-the-following-is-an-event-of-the-8-day-of-pregnancy-a017ed9f',
      conceptKey: 'second-week-day-by-day-events-of-implantation',
      difficulty: 'Hard',
      questionType: 'Developmental timing',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A clean but unkeyed third copy of the eighth-day question, with the same four options. The keyed copy is imported.',
    },
    {
      key: 'one-of-the-following-is-an-event-of-the-9-day-of-pregnancy-32dcf5e1',
      conceptKey: 'second-week-day-by-day-events-of-implantation',
      difficulty: 'Hard',
      questionType: 'Developmental timing',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A clean but unkeyed copy of the ninth-day question, which is authored in `second-week-of-development.ts` where the extractor filed its department-book twin. Kept here so a rescan does not author one question in two leaves.',
    },
    {
      key: 'one-of-the-following-is-an-event-of-the-gth-day-of-pregnancy-b2cb39c0',
      conceptKey: 'second-week-day-by-day-events-of-implantation',
      difficulty: 'Hard',
      questionType: 'Developmental timing',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The only keyed copy of the ninth-day question, and its key is one question out: it marks A, formation of the hypoblast, which the department book gives as an *eighth*-day event and which is the keyed answer to the question printed immediately above it with the same four options. The ninth-day question is authored in `second-week-of-development.ts` with the answer the book supports, and this row is recorded here as the source of that key rather than imported with it.',
    },
    {
      key: 'one-of-the-following-is-an-extraembryonic-fetal-membrane-201-30c68d66',
      conceptKey: 'amnion-expansion-and-its-results',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option D has been replaced by "Short cord may lead to premature separation of the placenta", carried in from the cord question below it, and the row is marked B — the bucco-pharyngeal membrane, which is a fusion of ectoderm and endoderm inside the embryonic disc and not an extra-embryonic membrane at all. Neither the option set nor the key can be repaired from what survives.',
    },
    {
      key: 'one-of-the-following-is-an-extraembryonic-fetal-membranes-am-67cee721',
      conceptKey: 'amnion-expansion-and-its-results',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Unkeyed, and the answer cannot be established: it offers the amniochorionic membrane, the bucco-pharyngeal membrane, the cloacal membrane and the allantois, and *two* of those are extra-embryonic. The amniochorionic membrane is amnion fused to chorion, and the allantois is a diverticulum of the yolk sac running into the connecting stalk. The department book\'s own list of the fetal membranes — chorion and villi, placenta, amnion, cord, yolk sac — names neither by these words, so nothing decides between them. A faculty reviewer could; an author cannot.',
    },
    {
      key: 'one-of-the-following-is-biaxial-joint-a-shoulder-hip-i-elbow-c3a84493',
      conceptKey: 'placenta-structure-plates-septa-and-cotyledons',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Not part of this leaf.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Two questions merged into one row. The stem is an upper-limb joint question — "one of the following is biaxial joint" — with its four options and the next question\'s stem all read into it, and the options that survive belong to the trophoblast question that followed. Neither question can be recovered; the joints one belongs to the Joints of Upper Limb leaf in any case.',
    },
    {
      key: 'one-of-the-following-is-correct-regarding-the-functions-of-p-cc32867b',
      conceptKey: 'placental-functions-and-hormones',
      difficulty: 'Hard',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A clean but unkeyed copy of `one-of-the-following-is-correct-regarding-the-functions-of-p-78fcdecb`, with the same four options. The department-book copy is imported with its wrong mark overridden and the override written down.',
    },
    {
      key: 'one-of-the-following-joints-is-synovial-uniaxial-a-shoulder-843d1c93',
      conceptKey: 'placenta-structure-plates-septa-and-cotyledons',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Not part of this leaf.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The second merged joints row: a uniaxial-joint stem whose surviving options are "Lining epithelium of duodenum", "Connecting stalk" and "yolk sac (secondary)" from an embryology question on the same page. Neither question survives, and the joints one belongs to the Joints of Upper Limb leaf.',
    },
    {
      key: 'physiological-hernia-occurs-when-a-loop-of-intestine-is-pres-c41b6bde',
      conceptKey: 'umbilical-cord-development-ring-to-definitive-cord',
      difficulty: 'Hard',
      questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The department-book copy, whose option C has been replaced by "Vitelline duct" from a neighbouring question — so the correct option, the primitive umbilical cord, is gone — and which is marked D, the definitive umbilical cord, which is where a loop of intestine is an omphalocele rather than a physiological hernia. The intact copy `physiological-hernia-occurs-when-a-loop-of-intestine-is-pres-95afdc5e` is imported.',
    },
    {
      key: 'placental-barrier-is-the-separation-between-a-fetal-and-mate-578ad71c',
      conceptKey: 'placental-barrier-early-and-late-layers',
      difficulty: 'Hard',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Options A and B were both read into the stem, leaving two, and the surviving text is damaged throughout ("a+ Fetal and materhal surfaces", "b= Chorionic and decidua! plates"). Unkeyed.',
    },
    {
      key: 'placental-barrier-is-the-separation-between-f03f08bd',
      conceptKey: 'placental-barrier-early-and-late-layers',
      difficulty: 'Hard',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The one copy with a clean stem, and the one whose correct option is destroyed: option D reads "Fetal and maternal blood inside ‏ام‎ ~nta". Since D is the answer, what this row lost is the answer itself. The department-book copy has all four options intact and is imported with its mark overridden.',
    },
    {
      key: 'polyhydramnios-is-the-increase-of-the-volume-of-amniotic-flu-fda7ba4e',
      conceptKey: 'amnion-expansion-and-its-results',
      difficulty: 'Moderate',
      questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option B was lost, and option B is the answer: the department book defines polyhydramnios as more than *two* litres at full term, and what survives is one, three and four. A question that has lost its correct option cannot be repaired by choosing among the rest. Recoverable by rescanning page 11 of the question book.',
    },
    {
      key: 'regarding-monozygotic-twin-352aa255',
      conceptKey: 'monozygotic-and-dizygotic-twins',
      difficulty: 'Moderate',
      questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The only keyed copy of the monozygotic twin question, and it lost option D — "are developed by fertilization of two ova" — leaving three. Three options is below the four-to-five the question contract requires, so the row cannot be imported however good its key is. The department-book copy `regarding-monozygotic-twin-dep-book-2024-75c8fa43` has all four and is imported with this row\'s answer carried across as a recorded override, so nothing is lost but the mark on the page.',
    },
    {
      key: 'regarding-the-placental-decidual-septa-dep-book-ac-ad-ac-ad-307df933',
      conceptKey: 'placenta-structure-plates-septa-and-cotyledons',
      difficulty: 'Hard',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The department-book copy of `regarding-the-placental-decidual-septa-10b5239b`, marked C — that the septa are fixed to the chorionic plate — where the department book calls them incomplete septa extending from the decidual plate into the intervillous spaces. If they reached the chorionic plate the intervillous spaces would not intercommunicate. The correctly keyed copy is imported.',
    },
    {
      key: 'regarding-the-placental-decidual-septa-they-are-composed-of-ee8d832f',
      conceptKey: 'placenta-structure-plates-septa-and-cotyledons',
      difficulty: 'Hard',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A third copy reduced to two options by option A being read into the stem and option C being lost. Unkeyed.',
    },
    {
      key: 'regarding-the-primitive-umbilical-ring-dep-book-ac-p-vi-a-it-dd89f1a3',
      conceptKey: 'umbilical-cord-development-ring-to-definitive-cord',
      difficulty: 'Hard',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The department-book copy of `regarding-the-primitive-umbilical-ring-7dc961fb`, marked B — that the ring contains the definitive yolk sac, which the book places in the primitive umbilical *cord*, once the amnion has ensheathed what passes through the ring. The correctly keyed copy is imported.',
    },
    {
      key: 'reticular-connective-tissue-is-present-in-7407c983',
      conceptKey: 'placenta-structure-plates-septa-and-cotyledons',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Not part of this leaf.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A histology question about the sites of reticular connective tissue, filed here because the umbilical cord is one of its four options. It belongs to the Types of Connective Tissue Proper leaf.',
    },
    {
      key: 'scaphoid-19-regarding-the-decidua-parictalis-choose-the-corr-c8853425',
      conceptKey: 'decidua-definition-parts-fates',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The extractor caught the seam between three questions. The stem is the tail of an upper-limb question ("Scaphoid") followed by the numbered stem of the decidua parietalis question, and the options are fragments of two other questions entirely, one of them "Scaphoid" again. The decidua parietalis question survives whole as `regarding-the-decidua-parietalis-choose-the-correct-statemen-61eab5d0` and is imported from there.',
    },
    {
      key: 'thin-and-wide-placenta-is-known-as-0-02725316',
      conceptKey: 'placenta-anomalies',
      difficulty: 'Moderate',
      questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A copy of the placenta membranacea question that lost option C, velamentous placenta, and carries no key. The complete keyed copy is imported.',
    },
    {
      key: 'thin-and-wide-placenta-is-known-as-b2864ad3',
      conceptKey: 'placenta-anomalies',
      difficulty: 'Moderate',
      questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A clean but unkeyed third copy, spelling option A correctly where the imported copy prints "Placenta membrancacea". The keyed copy is still the one imported, because its answer comes from the source rather than from an author; the misspelling is a scan artefact and belongs to the same rescan as the rest of the page.',
    },
    {
      key: 'yellow-elastic-connective-tissue-is-present-in-94267e94',
      conceptKey: 'placenta-structure-plates-septa-and-cotyledons',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Not part of this leaf.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A histology question about yellow elastic connective tissue — the answer is ligamentum nuchae — filed here because the umbilical cord is one of its options. It belongs to the Types of Connective Tissue Proper leaf.',
    },
    {
      key: 'yolk-sac-shares-in-the-formation-of-49e90126',
      conceptKey: 'yolk-sac-development-and-functions',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The option set has been rebuilt out of two questions: it offers "Foregut, midgut and hindgut", "Forebrain, midbrain and hind brain", "3 month" and "5\" month" — two anatomical lists and two months, the months carried in from the fetal-movements question below. The correct answer survives as option A, but a row in which half the options belong to a different question cannot be sat. Recoverable only by rescanning page 12 of the question book.',
    },
  ],
}
