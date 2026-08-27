/**
 * `101 ISK > Anatomy > General Embryology > Fetal Membranes` — the question
 * books' MCQs.
 *
 * Sixty-nine rows, twenty-eight live. The worst-scanned leaf of the eleven:
 * forty-one rows are lost, and of those, four are collisions in which two
 * questions have run into one row — the biaxial-joint row carries a joints
 * question, a trophoblast question and a notochord option all at once — while
 * most of the rest are annotated re-printings whose stems have swallowed one of
 * their own options.
 *
 * Twelve answers are overridden, the most of any leaf here, and six of those are
 * against a printed key. The pattern is the one the whole batch shows: a
 * "(DEP BOOK)" printing keyed one option away from the truth, with the clean
 * printing either keyed correctly or carrying no key at all. Where the annotated
 * printing is the only complete option set it is kept and corrected —
 * `placental-barrier-is-the-separation-between-dep-book-em-em-e`,
 * `one-of-the-following-is-correct-regarding-the-functions-of-p` and
 * `abnormally-long-umbilical-cord-may-lead-to-dep-book-2024-ac` are the three
 * live rows in that position.
 *
 * Nine concepts are reused verbatim. Four come from the written papers —
 * `placenta-anomalies`, `umbilical-cord-anomalies`, `amniotic-fluid-functions`
 * and `decidua-definition-parts-fates`; one, `notochord-formation-fate`, carries
 * the three neurenteric-canal printings; `chorionic-villi-types-development`
 * carries the chorionic plate; `mucoid-ct-is-jelly-rich-in-hyaluronic-acid`
 * carries the two mucoid-tissue strays that reached this leaf through Wharton's
 * jelly; and two are repeated from my own `second-week-of-development.ts`,
 * `second-week-day-by-day-timetable` and `placental-barrier-early-and-late`,
 * with that file's text unchanged so the merge is a no-op.
 *
 * `connective-tissue-fibres-collagen-reticular-and-elastic` is minted here under
 * the modulePath of `Connective Tissue > Connective Tissue Fibres`, which has no
 * seed file yet, for four stray questions about collagen types and fibre
 * distribution that landed in this leaf because one of their options is the
 * umbilical cord. Like `collagen-synthesis-requires-vitamin-c` in
 * `red-blood-corpuscles.ts`, it should be reused rather than re-minted when that
 * leaf is written.
 *
 * On whether the books ask timing the department book never states: here, once.
 * `polyhydramnios-is-the-increase-of-the-volume-of-amniotic-flu` asks for the
 * volume in litres above which amniotic fluid is called excessive. The
 * department book defines polyhydramnios as "increased amniotic fluid at full
 * term" and gives no figure anywhere, so the number the question wants is not in
 * the source this faculty teaches from. The row is excluded on other grounds as
 * well — the option it wants was lost — but the gap would remain after a
 * rescan.
 *
 * A later pass added the five rows this leaf takes from the sat end-of-module
 * papers. They are the cleanest rows in the file — four options each, no
 * collisions, no swallowed options — and they say something the question books
 * do not: across four papers and five years the department has examined this
 * leaf on two facts only, the vessel count of the cord and which decidua makes
 * the maternal part of the placenta. The cord question is set twice in
 * consecutive years with the false option changed from "2 veins and one
 * artery" to "2 veins and 2 arteries", which is the same question testing the
 * same single fact from two sides.
 *
 * None of the five printed a key, and the recovered answer sheet covers
 * neither of the two sources they come from, so all four live answers are
 * taken from the department book and each says so in its reason. No concept is
 * minted: all four reuse concepts this file already carries.
 *
 * The fifth row is excluded and is the interesting one. "Regarding full term
 * placenta, one of the following is not true" offers a weight of 500–600 gm, a
 * thickness of one cm, a diameter of 25–30 cm, and the cord attached to the
 * maternal surface. Against the department book three of those four are false:
 * the book gives thickness 3 cm and diameter 15–25 cm, and the cord is on the
 * fetal surface. Only the weight matches. A single-best-answer question with
 * three defensible answers cannot be sat, and the disagreement is recorded on
 * `placenta-structure-plates-septa-and-cotyledons` rather than resolved by
 * picking the option that feels most wrong.
 *
 * Three further sat rows are filed here that the slice put in other leaves,
 * because this file owns the concept each one tests. The chorionic-villi
 * question reached `hand.json` on the words "finger-like"; the long-cord
 * question reached `fetal-period.json`, though this file already carries the
 * live copy of it; and the yolk-sac question reached
 * `second-week-of-development.json`, though the department book teaches the
 * yolk sac in this chapter. All three come from the ringed 2024 script and all
 * three are excluded. Filing them here rather than adding this leaf\u2019s
 * concepts to three other leaves keeps each concept\u2019s article list honest:
 * a hand article does not teach chorionic villi.
 */
import type { McqLeafSeed } from '../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Fetal Membranes',
  modulePath: '101 ISK > Anatomy > General Embryology > Fetal Membranes',
  articleId: 'ART-101-ANA-CHORIONIC-VILLI-PLACENTA',

  concepts: [
    {
      key: 'placenta-structure-plates-septa-and-cotyledons',
      label: 'The placenta is a chorionic plate of fetal tissue facing a decidual plate of maternal tissue, with intervillous spaces between them divided into cotyledons by septa from the maternal side',
      definition:
        'The placenta is a temporary disc-shaped organ lying mostly in the upper part of the posterior wall of the uterus near the fundus, formed by the union of a maternal part — the decidual plate, which is decidua basalis — and a fetal part, the chorionic plate, which is chorion frondosum. Its fetal surface is smooth and covered by transparent amnion, with the umbilical cord attached near its centre and the umbilical vessels running over it; its maternal surface is rough and shows cotyledons separated by grooves, covered by a thin layer of decidua basalis. The chorionic plate is, from the outside inwards, amnion, somatopleuric extra-embryonic mesoderm, cytotrophoblast and syncytiotrophoblast; the decidual plate is decidua basalis with its maternal arterioles, venules and uterine glands, then the cytotrophoblastic shell, then syncytiotrophoblast lining the intervillous spaces. The placental, or decidual, septa are incomplete septa extending from the decidual plate into the intervillous spaces, each with a core of decidua basalis covered by cytotrophoblast and syncytiotrophoblast; they carry no maternal vessels, they are not fixed to the chorionic plate, and opposite each of them is a groove on the maternal surface separating one cotyledon from the next.',
      objective:
        'Name the two plates of the placenta and what each is made of, and say where the septa arise, what they contain and what they divide.',
      pitfall:
        'Attaching the septa to the chorionic plate. They grow from the decidual — maternal — side and stop short, which is why they are called incomplete and why the intervillous spaces still communicate with one another; a septum reaching the chorionic plate would divide the maternal blood into separate compartments.',
      subject: 'dev',
      primary: 'DIS-EMB-T02',
      secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > Fetal Membranes',
      type: 'structural_description',
      aliases: ['Chorionic plate', 'Decidual plate', 'Cotyledon', 'Decidual septa', 'Intervillous space'],
      conflicts: [
        'The 2020-12-24 end-of-module paper asks which statement about the full-term placenta is not true and offers, among its options, a thickness of one cm and a diameter of 25\u201330 cm. The department book gives thickness 3 cm and diameter 15\u201325 cm, so both of those options are false against the book, as is the paper\u2019s fourth option putting the umbilical cord on the maternal surface. The paper printed no key. Three false options in a single-best-answer question is why `regarding-full-term-placenta-one-of-the-following-is-not-tru-ae89b3ce` is excluded rather than answered.',
      ],
    },
    {
      key: 'placental-functions-and-hormones',
      label: 'The placenta exchanges, excretes, passes maternal antibodies and secretes four hormones — and it stops bacteria and most but not all viruses',
      definition:
        'The placenta exchanges metabolic products and the respiratory gases between mother and fetus, excretes fetal urea and creatinine, transmits maternal antibodies to the fetal blood so that the newborn has passive immunity, protects the fetus, and acts as an endocrine gland. Its hormones are progesterone, which maintains the endometrium of pregnancy; oestrogen, which stimulates growth of the uterus and maturation of the mammary gland; human chorionic gonadotropin, which maintains the corpus luteum and is the hormone a pregnancy test detects; and somatomammotropin, which gives the fetus priority on maternal blood glucose and promotes breast development. The barrier keeps bacteria and most viruses out, but only most: named exceptions are recorded, so no statement that the placenta stops all viruses is true.',
      objective:
        'List the functions of the placenta, name its four hormones and what each does, and state the limits of its protective role.',
      pitfall:
        'Reading the protective function as absolute. The correct word is "most" — some viruses cross, which is why rubella and similar infections in pregnancy matter, and a question offering "prevents the passage of all viruses" is offering an overstatement rather than a fact.',
      subject: 'dev',
      primary: 'DIS-EMB-T02',
      secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > Fetal Membranes',
      type: 'structure_function_relationship',
      aliases: ['HCG', 'Somatomammotropin', 'Placental hormones'],
    },
    {
      key: 'umbilical-cord-development-and-contents',
      label: 'The cord runs primitive umbilical ring to primitive cord to definitive cord, and the physiological hernia lives in the primitive cord',
      definition:
        'The primitive umbilical ring forms in the fourth week, as the expanding amniotic cavity folds the disc and shifts the amnio-ectodermal junction ventrally; through it pass the allantois and the umbilical vessels within the connecting stalk, and the vitelline duct with its vessels. When the amnion sheathes those structures the primitive umbilical cord is formed, containing the secondary yolk sac, the vitelline duct and vessels, the connecting stalk with the remnant of the allantois and the umbilical vessels, and later the herniated intestinal loops — the physiological umbilical hernia, which is therefore a feature of the primitive cord and not of the definitive one. The definitive cord forms when the intestine returns to the abdomen, one umbilical vein and the extra-embryonic vitelline vessels obliterate, and the vitelline duct, secondary yolk sac and extra-embryonic allantois degenerate; Wharton\'s jelly forms from the mesoderm of the connecting stalk. The definitive cord therefore holds two umbilical arteries and one umbilical vein in Wharton\'s jelly, sheathed by amnion. It is tortuous because the umbilical arteries take a wavy course, and a wider curve of an artery makes a false knot, which causes the fetus no stress.',
      objective:
        'Name the contents of the primitive umbilical ring, of the primitive cord and of the definitive cord, and place the physiological hernia in the right one.',
      pitfall:
        'Putting the intestinal loops in the ring or in the definitive cord. The ring is the defect they pass through before the hernia exists; the definitive cord is what is left after they have gone back — the herniated loops belong to the primitive cord, between the two.',
      subject: 'dev',
      primary: 'DIS-EMB-T02',
      secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > Fetal Membranes',
      type: 'developmental_process',
      aliases: ['Primitive umbilical ring', 'Physiological umbilical hernia', 'Wharton\'s jelly'],
    },
    {
      key: 'yolk-sac-allantois-heuser-and-the-vitelline-duct',
      label: 'Heuser\'s membrane lines the primary yolk sac, the allantois buds from the secondary one, and the vitelline duct is what connects the definitive sac to the midgut',
      definition:
        'The primary yolk sac is made when flat cells from the hypoblast form Heuser\'s membrane lining the blastocele, on the ninth day. The secondary — definitive — yolk sac follows when new hypoblast-derived cells line Heuser\'s membrane, a large part of the sac is pinched off as the chorionic cavity grows, and a diverticulum extends from its caudal wall into the connecting stalk as the allantois. After folding, the sac is compressed into the vitelline (vitello-intestinal) duct, which connects the midgut to the part of the sac outside the folded disc, and duct and sac then gradually degenerate. The yolk sac is not merely a vestige: it shares with the endoderm in forming the gut, its allantois forms the apex of the urinary bladder, the primordial germ cells arise in the wall of its caudal part from migrated epiblast, the blood vessels of the gut develop in the mesoderm around the vitelline duct, and blood cells are first formed in its splanchnic extra-embryonic mesoderm.',
      objective:
        'Distinguish primary from secondary yolk sac by what lines each, name the structure that connects the sac to the midgut, and give the functions of the yolk sac.',
      pitfall:
        'Attaching Heuser\'s membrane to the definitive yolk sac. It lines the primary one; the definitive sac is lined by a second wave of hypoblast cells laid down over it, and every printing of this question offers the definitive sac as its first option.',
      subject: 'dev',
      primary: 'DIS-EMB-T02',
      secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > Fetal Membranes',
      type: 'developmental_process',
      aliases: ['Heuser\'s membrane', 'Allantois', 'Vitelline duct', 'Secondary yolk sac'],
    },
    {
      key: 'amnion-expansion-and-the-amniochorionic-membrane',
      label: 'The amniotic cavity keeps expanding, and each thing it touches it obliterates — the chorionic cavity first, then the uterine cavity',
      definition:
        'The amnion is the wall of the amniotic cavity. As the cavity expands it does five things in turn: it folds the embryonic disc and produces the primitive umbilical ring; it wraps the umbilical cord in a sheath of amnion; it covers the fetal surface of the placenta; it brings the amnion against the chorion, forming the amniochorionic membrane and obliterating the chorionic cavity between them; and finally it presses that membrane, with the decidua capsularis, against the decidua parietalis, obliterating the uterine cavity itself at about the fourth month.',
      objective:
        'Give the consequences of expansion of the amniotic cavity in order, and name the membrane it forms with the chorion.',
      pitfall:
        'Crediting the expanding amnion with things it only surrounds. It does not form the secondary yolk sac, the connecting stalk or the neural tube — those arise from hypoblast, extra-embryonic mesoderm and ectoderm respectively; what the amnion does is enclose, sheathe and obliterate.',
      subject: 'dev',
      primary: 'DIS-EMB-T02',
      secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > Fetal Membranes',
      type: 'developmental_process',
      aliases: ['Amniochorionic membrane', 'Amnio-ectodermal junction', 'Amnion'],
    },
    {
      key: 'twins-monozygotic-and-dizygotic',
      label: 'Monozygotic twins come from one zygote and are always of the same sex; dizygotic twins come from two ova and need not be',
      definition:
        'Dizygotic twins arise when two ova are released and each is fertilised by its own sperm. They are the commoner kind, are genetically no more alike than any two siblings, may be of either sex, and each has its own amnion, its own chorion and usually its own placenta. Monozygotic twins arise when a single fertilised ovum splits, so the two share one genotype: they are identical, and being identical they are necessarily of the same sex. What they share of the membranes depends on when the split occurred — the earlier it happens the more separate the sacs, and a late split leaves one chorion and one amnion between them.',
      objective:
        'Say which kind of twinning is commoner, which is always same-sex, and how the membranes differ between the two.',
      pitfall:
        'Answering "commonest" for monozygotic because identical twins are the more remarkable. Dizygotic twinning is the commoner by a wide margin, and both questions in these books offer "is the commonest type" as the first option of the monozygotic stem.',
      subject: 'dev',
      primary: 'DIS-EMB-T02',
      secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > Fetal Membranes',
      type: 'comparison',
      aliases: ['Identical twins', 'Fraternal twins', 'Monozygotic', 'Dizygotic'],
    },
    {
      key: 'connective-tissue-fibres-collagen-reticular-and-elastic',
      label: 'Collagen type I builds the strong dense tissues, type III is the reticular fibre of organ stromas, and elastic fibres are what ligamentum nuchae is made of',
      definition:
        'Connective tissue has three kinds of fibre. Collagen is the commonest, and its types differ by where they are: type I in dense connective tissue — tendon, ligament, capsule of organs, dermis and bone — type II in cartilage, type III as the reticular fibre, and type IV in the basement membrane. Reticular fibres are fine, branching type III collagen, stained black by silver, and they form the supporting stroma of parenchymatous organs such as liver, spleen, lymph node and bone marrow. Elastic fibres are made of elastin with a fibrillin microfibril scaffold, stain brown with orcein, and give yellow elastic connective tissue — ligamentum nuchae, ligamenta flava and the vocal ligaments — its ability to recoil.',
      objective:
        'Match each fibre type to the tissue it builds, and name a site where each predominates.',
      pitfall:
        'Reading "reticular" as a separate protein. A reticular fibre is collagen — type III — and the two questions in these books that name type III and reticular tissue have the same answer, the stroma of parenchymatous organs, phrased two ways.',
      subject: 'fnd',
      primary: 'DIS-HIS-T02',
      secondary: [],
      modulePath: '101 ISK > Histology > Connective Tissue > Connective Tissue Fibres',
      type: 'classification',
      aliases: ['Collagen types', 'Reticular fibres', 'Elastic fibres', 'Ligamentum nuchae'],
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
      key: 'placenta-anomalies',
      label: 'The placenta goes wrong in six ways, grouped by what is abnormal',
      definition:
        'The congenital anomalies of the placenta are grouped by what is abnormal about it: position, as in placenta previa; shape, bilobed or trilobed; number, twin or accessory placenta; attachment of the umbilical cord, velamentous where the cord is attached through the amniotic membrane and battledore where it is attached to the margin; diameter, as in placenta membranacea, which is thinner and wider; and infiltration, as accreta, increta and percreta.',
      objective: 'Enumerate the congenital anomalies of the placenta under its six headings.',
      pitfall: 'Listing names without the grouping. They are grouped by position, shape, number, cord attachment, diameter and infiltration, and the grouping is what makes six unrelated names recallable.',
      subject: 'dev',
      primary: 'DIS-EMB-T02',
      secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > Fetal Membranes',
      type: 'clinical_correlation',
      aliases: ['Velamentous placenta', 'Battledore placenta', 'Placenta membranacea', 'Placenta accreta'],
    },
    {
      key: 'umbilical-cord-anomalies',
      label: 'The cord goes wrong in its length, its contents, its vessels or its attachment',
      definition:
        'The congenital anomalies of the umbilical cord are: a short cord, which limits fetal movement and can separate the placenta prematurely during delivery; a long cord, which may encircle the fetal neck or form a true knot; congenital umbilical hernia (omphalocele), where the proximal cord contains intestinal loops because the intestine failed to return to the abdominal cavity; presence of only one umbilical artery from degeneration of the other; and abnormal attachment to the placenta — battledore, at the margin, or velamentous, through the amniotic membrane.',
      objective: 'Enumerate the congenital anomalies of the umbilical cord and give the consequence of each.',
      pitfall: 'Calling a false knot an anomaly. A false knot is a wider curve of an umbilical artery and it causes no fetal stress; it is the true knot, in a long cord, that matters.',
      subject: 'dev',
      primary: 'DIS-EMB-T02',
      secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > Fetal Membranes',
      type: 'clinical_correlation',
      aliases: ['Omphalocele', 'Single umbilical artery'],
    },
    {
      key: 'amniotic-fluid-functions',
      label: 'Amniotic fluid does different work early, late and during delivery',
      definition:
        'Amniotic fluid is a clear watery fluid of water, electrolytes, protein, carbohydrate, lipid, phospholipid and urea, produced first by the amnioblast cells, then derived from maternal blood by osmosis, with fetal urine added from the fifth month. In early pregnancy it is a shock absorber protecting the fetus from external trauma, a thermal insulator keeping the fetal temperature constant, and the thing that prevents adhesion of the fetus to the uterine wall and of fetal parts to each other. In late pregnancy it provides space for the fetal movements that develop the fetal muscles, space for fetal urine, and a medium the fetus swallows to learn to suckle. During delivery it protects the fetus against uterine contractions, its fore bag helps the cervical canal dilate gradually, its rupture signals the start of labour, and being sterile it washes the vagina just before the fetus passes.',
      objective: 'Enumerate the functions of amniotic fluid in early pregnancy, in late pregnancy and during delivery.',
      pitfall: 'Giving cushioning alone. The functions are grouped by stage, and the delivery group — gradual cervical dilatation, the sign of labour, washing the birth canal — is a third of the answer.',
      subject: 'dev',
      primary: 'DIS-EMB-T02',
      secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > Fetal Membranes',
      type: 'structure_function_relationship',
      aliases: ['Liquor amnii'],
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
      key: 'second-week-day-by-day-timetable',
      label: 'The second week runs to a timetable: day 7 implantation and two trophoblasts, day 8 the amniotic cavity, day 9 the primary yolk sac and lacunae, day 11–12 extra-embryonic mesoderm, day 13 the chorionic cavity',
      definition:
        'The second week runs day by day. On the seventh day the blastocyst begins implantation and the trophoblast differentiates into inner cytotrophoblast and outer syncytiotrophoblast, beginning at the embryonic pole. On the eighth day the blastocyst is partly embedded, the hypoblast forms, and the amniotic cavity appears within the rest of the inner cell mass, separating amnioblast from epiblast and completing the bilaminar disc. On the ninth and tenth the blastocyst is completely embedded, the breach is plugged by a fibrin clot, Heuser\'s membrane forms from the hypoblast and turns the blastocele into the primary yolk sac, and lacunar spaces appear in the syncytiotrophoblast. On the eleventh and twelfth the endometrial epithelium covers the clot and completes implantation, the lacunae fill with maternal blood as the utero-placental circulation, and extra-embryonic mesoderm appears from the yolk sac wall. On the thirteenth the spaces in that mesoderm run together into one chorionic cavity, the mesoderm divides into somatic and splanchnic, the secondary yolk sac replaces the primary, the allantois buds from it into the connecting stalk, and the primary chorionic villi begin.',
      objective:
        'Place each event of the second week on the day it occurs, and say what the week does not yet produce.',
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
      key: 'mucoid-ct-is-jelly-rich-in-hyaluronic-acid',
      label: 'Mucoid connective tissue is a soft jelly rich in hyaluronic acid, found in the umbilical cord, the vitreous and the dental pulp',
      definition:
        'Mucoid connective tissue contains mainly fibroblasts with fine collagen and reticular fibres in a large amount of soft jelly-like ground substance rich in mucus and hyaluronic acid. It is found in the umbilical cord, where it is called Wharton\'s jelly, in the vitreous humour of the eye and in the pulp of the teeth. Its role is supportive.',
      objective: 'Recognise mucoid connective tissue by its ground substance and name its three sites.',
      pitfall: 'Reaching for loose areolar connective tissue because it too has abundant ground substance. What marks mucoid tissue out is that the matrix is jelly and the cells are almost only fibroblasts.',
      subject: 'fnd',
      primary: 'DIS-HIS-T02',
      secondary: [],
      modulePath: '101 ISK > Histology > Connective Tissue > Types of Connective Tissue Proper',
      type: 'structural_description',
    },
  ],

  questions: [
    {
      key: 'chorionic-plate-aa0b703c',
      conceptKey: 'chorionic-villi-types-development',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Identify the chorionic plate as the fetal half of the placenta.',
      answerOverride: 'B',
      answerOverrideReason:
        'This printing carries no key, and the "(DEP BOOK)" printing of the same question is keyed to the decidua basalis, which is the *decidual* plate. The department book states that the placenta is formed by union of a maternal part, the decidual plate or decidua basalis, and a fetal part, the chorionic plate or chorion frondosum. Set to B, which is also what the third printing of this question is keyed to.',
      explanations: {
        A: 'Chorion laeve is the smooth part of the chorion, whose villi degenerate; it forms no part of the placenta and is covered by the decidua capsularis.',
        B: 'The chorionic plate is chorion frondosum, the part carrying well-developed tertiary villi, and it is the fetal part of the placenta.',
        C: 'Decidua basalis is the *decidual* plate — the maternal half. The two plates face each other across the intervillous spaces, and one printing of this question is keyed to this option in error.',
        D: 'Decidua capsularis covers the conceptus on the side away from the placenta and is stretched away as the sac grows. It contributes to no plate.',
      },
    },
    {
      key: 'regarding-the-placental-decidual-septa-10b5239b',
      conceptKey: 'placenta-structure-plates-septa-and-cotyledons',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Say where the placental septa come from and what they do not contain.',
      explanations: {
        A: 'Chorion frondosum is the fetal plate. The septa grow from the opposite side, and their core is maternal decidua.',
        B: 'Placental (decidual) septa are incomplete extensions from the decidual plate into the intervillous spaces.',
        C: 'They are incomplete and do not reach the chorionic plate — if they did, the intervillous spaces would be sealed off from one another instead of intercommunicating.',
        D: 'The maternal vessels are in the decidua basalis of the plate itself, not in the septa. A septum with vessels in it would bleed into the intervillous space at every groove.',
      },
    },
    {
      key: 'placental-barrier-is-the-separation-between-dep-book-em-em-e-64936622',
      conceptKey: 'placental-barrier-early-and-late',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Define the placental barrier by the two bloods it keeps apart.',
      answerOverride: 'D',
      answerOverrideReason:
        'The books key this to C, the cytotrophoblastic shell and the intervillous spaces. The department book defines the placental barrier as the membrane separating maternal blood in the intervillous spaces from fetal blood in the tertiary villi — option D. The shell is a structure the barrier passes near, not what it separates.',
      explanations: {
        A: 'The fetal and maternal surfaces are the two faces of the whole organ, centimetres apart. A barrier is a membrane of a few micrometres.',
        B: 'The chorionic and decidual plates are again the two sides of the organ. Between them lie the intervillous spaces, which is where the barrier actually works — at the villus wall, not at the plates.',
        C: 'The cytotrophoblastic shell lies against the decidual plate and anchors the villi. It borders the intervillous spaces but separates no two circulations, and it is the keyed option.',
        D: 'The barrier separates maternal blood in the intervillous spaces from fetal blood inside the tertiary villi.',
      },
    },
    {
      key: 'one-of-the-following-is-correct-regarding-the-functions-of-p-78fcdecb',
      conceptKey: 'placental-functions-and-hormones',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'State the limits of the placenta\'s protective function.',
      answerOverride: 'A',
      answerOverrideReason:
        'The books key this to D, that the placenta prevents the passage of all viruses. The department book says it prevents bacteria and *most* viruses, with named exceptions, so D is an overstatement. A is the book\'s own statement: transmission of maternal antibodies to fetal blood, giving the fetus immunity. Set to A.',
      explanations: {
        A: 'Maternal antibodies cross the placenta, which is why a newborn has passive immunity for its first months.',
        B: 'Gas exchange is one of the placenta\'s principal functions — it is the fetal lung. Preventing the passage of gases would be fatal within minutes.',
        C: 'The placenta does produce progesterone, which maintains the endometrium of pregnancy, along with oestrogen, HCG and somatomammotropin.',
        D: 'The word is "most", not "all". Some viruses cross, which is the whole clinical point of rubella in pregnancy — and this is the keyed option.',
      },
    },
    {
      key: 'one-of-the-following-is-not-among-the-anomalies-of-placenta-0dc99158',
      conceptKey: 'placenta-anomalies',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Separate an anomaly of the placenta from an anomaly of the amniotic fluid.',
      answerOverride: 'D',
      answerOverrideReason:
        'The books key this to placenta accreta, which is one of the department book\'s own six groups — the infiltration group, with increta and percreta. The one option that is not a placental anomaly at all is polyhydramnios, an excess of amniotic fluid. Set to D.',
      explanations: {
        A: 'An anomaly, so not the answer. Velamentous placenta is the cord-attachment group: the cord attached through the amniotic membrane.',
        B: 'An anomaly, so not the answer, and the keyed option. Placenta accreta is the infiltration group, in which the villi invade the myometrium.',
        C: 'An anomaly, so not the answer. A bipartite placenta is the shape group, with the bilobed and trilobed forms.',
        D: 'Not a placental anomaly. Polyhydramnios is an excess of amniotic fluid at full term, from maternal diabetes, oesophageal atresia or a central nervous system malformation. The placenta may be entirely normal.',
      },
    },
    {
      key: 'thin-and-wide-placenta-is-known-as-b2864ad3',
      conceptKey: 'placenta-anomalies',
      difficulty: 'Easy', questionType: 'Clinical application',
      learningObjective: 'Name the anomaly of placental diameter.',
      answerOverride: 'A',
      answerOverrideReason:
        'This printing carries no key. The department book groups placenta membranacea under anomalies of diameter, describing it as thinner and wider, which is the stem word for word; the third printing of this question is keyed to the same option.',
      explanations: {
        A: 'Placenta membranacea is the diameter anomaly — a placenta spread thin and wide over the membranes.',
        B: 'Placenta increta is an infiltration anomaly: villi growing into the myometrium. Thickness of invasion, not of the disc.',
        C: 'Velamentous placenta is a cord-attachment anomaly, the cord inserting through the amniotic membrane.',
        D: 'An accessory placenta is a number anomaly — a second, smaller lobe beside the main one, each of normal thickness.',
      },
    },
    {
      key: 'marginal-attachment-of-umbilical-cord-to-the-placenta-is-kno-09cd8da4',
      conceptKey: 'placenta-anomalies',
      difficulty: 'Easy', questionType: 'Clinical application',
      learningObjective: 'Name the marginal cord attachment and separate it from the membranous one.',
      explanations: {
        A: 'Battledore placenta is the cord attached at the margin of the disc — named for the bat of the old game, a handle at the edge of a paddle.',
        B: 'Velamentous placenta is the other cord-attachment anomaly, and the one it is confused with: there the cord inserts into the membranes and the vessels run through them, which is dangerous because they are unprotected. One printing of this question is keyed to it.',
        C: 'Placenta previa is a position anomaly — implantation in the lower uterine segment. Nothing to do with the cord.',
        D: 'Placenta accreta is an infiltration anomaly, the villi invading the myometrium. Also nothing to do with the cord.',
      },
    },
    {
      key: 'abnormally-long-umbilical-cord-may-lead-to-dep-book-2024-ac-59be1fce',
      conceptKey: 'umbilical-cord-anomalies',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Give the consequence of a long cord and separate it from that of a short one.',
      answerOverride: 'C',
      answerOverrideReason:
        'Neither printing of this question carries a key. The department book gives the long cord two consequences — encircling the fetal neck, and a true knot — and gives premature separation of the placenta to the *short* cord. Encircling the neck is strangulation during delivery, option C.',
      explanations: {
        A: 'A false knot is a wider curve of an umbilical artery, and it causes the fetus no stress. It is a feature of the cord\'s tortuosity, not of its length, and it is the option students pick because "knot" appears in the long-cord description — the knot that matters there is a true one.',
        B: 'Early separation of the placenta belongs to the short cord, which is pulled taut as the fetus descends. This is the paired question with the answers exchanged.',
        C: 'A long cord may encircle the fetal neck and strangle the baby during delivery.',
        D: 'Adhesion of the fetus to the uterine wall is prevented by amniotic fluid, and its failure is a fluid problem — oligohydramnios — not a cord problem.',
      },
    },
    {
      key: 'physiological-hernia-occurs-when-a-loop-of-intestine-is-pres-95afdc5e',
      conceptKey: 'umbilical-cord-development-and-contents',
      difficulty: 'Hard', questionType: 'Developmental process',
      learningObjective: 'Place the physiological hernia in the primitive cord rather than the ring or the definitive cord.',
      explanations: {
        A: 'An intestinal loop in the abdominal cavity is where it belongs and is not a hernia at all — that is the state before the herniation and again after the loop returns.',
        B: 'The primitive umbilical ring is the defect in the ventral abdominal wall that the loops pass through. It is the doorway, not the room, and it forms in the fourth week before the intestine grows out.',
        C: 'The herniated intestinal loops lie in the primitive umbilical cord, along with the secondary yolk sac, the vitelline duct and the connecting stalk.',
        D: 'The definitive cord is what remains after the intestine has gone back into the abdomen and the yolk sac, vitelline duct and allantois have degenerated. An intestinal loop there is an omphalocele — a real anomaly, and one printing of this question is keyed to it.',
      },
    },
    {
      key: 'regarding-the-primitive-umbilical-ring-7dc961fb',
      conceptKey: 'umbilical-cord-development-and-contents',
      difficulty: 'Hard', questionType: 'Developmental process',
      learningObjective: 'List the contents of the primitive umbilical ring.',
      explanations: {
        A: 'The amniochorionic membrane forms later, when the expanding amniotic cavity presses the amnion against the chorion. The ring is surrounded by the ventral body wall.',
        B: 'The definitive yolk sac lies in the primitive umbilical *cord*, once the amnion has sheathed the structures passing through the ring — one step further on. It is the strongest distractor here, and one printing of this question is keyed to it.',
        C: 'The vitelline duct with its vessels passes through the ring, along with the allantois and the umbilical vessels inside the connecting stalk.',
        D: 'The intestinal loops herniate later still, into the primitive cord. In the fourth week, when the ring forms, the midgut is still inside the abdomen.',
      },
    },
    {
      key: 'definitive-yolk-sac-is-connected-with-midgut-through-ce358c9f',
      conceptKey: 'yolk-sac-allantois-heuser-and-the-vitelline-duct',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the duct that joins yolk sac to midgut.',
      explanations: {
        A: 'The connecting stalk joins the caudal end of the disc to the chorion and carries the allantois and the umbilical vessels. It reaches the placenta, not the gut.',
        B: 'Folding compresses the secondary yolk sac into the vitelline, or vitello-intestinal, duct, which connects it to the midgut.',
        C: 'The allantois is a diverticulum from the caudal wall of the yolk sac into the connecting stalk, and its proximal part becomes the apex of the bladder. It runs the other way. One printing of this question is keyed to it.',
        D: 'The hindgut is a division of the gut itself, formed in the tail fold. A duct cannot connect the yolk sac to the midgut by way of a different part of the gut.',
      },
    },
    {
      key: 'allantois-is-a-dorsal-extension-from-11d3fece',
      conceptKey: 'yolk-sac-allantois-heuser-and-the-vitelline-duct',
      difficulty: 'Moderate', questionType: 'Developmental process',
      learningObjective: 'Give the origin of the allantois.',
      explanations: {
        A: 'The allantois is a diverticulum from the caudal wall of the secondary yolk sac, extending into the connecting stalk.',
        B: 'The amniotic cavity is on the other side of the embryonic disc and gives off no diverticulum at all.',
        C: 'The chorionic cavity is the extra-embryonic coelom, a space rather than a lined sac that could bud.',
        D: 'The primary yolk sac has already been replaced by the secondary one by the time the allantois appears, on the thirteenth day. One stage too early.',
      },
    },
    {
      key: 'heuser-s-membrane-lines-the-d3bb317b',
      conceptKey: 'yolk-sac-allantois-heuser-and-the-vitelline-duct',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Attach Heuser\'s membrane to the primary yolk sac.',
      answerOverride: 'B',
      answerOverrideReason:
        'Two of the four printings of this question carry no key and the third has its stem damaged; that third is keyed to B. The department book states that the primary yolk sac forms when flat hypoblast-derived cells form Heuser\'s membrane lining the blastocele, so B is right.',
      explanations: {
        A: 'Definitive is another word for secondary, and the secondary sac is lined by a second wave of hypoblast cells laid down over Heuser\'s membrane. Offered first in every printing, and one stage too late.',
        B: 'Heuser\'s membrane lines the blastocele on the ninth day and so converts it into the primary yolk sac.',
        C: 'The secondary yolk sac is the same structure as the definitive one under its other name — which is why the two appear as separate options and neither can be right.',
        D: 'The vitelline duct is what is left of the sac after folding compresses it. It is a remnant, formed weeks later, and is not lined by Heuser\'s membrane.',
      },
    },
    {
      key: 'which-of-the-following-is-responsible-for-bladder-developmen-a309b8ba',
      conceptKey: 'yolk-sac-allantois-heuser-and-the-vitelline-duct',
      difficulty: 'Moderate', questionType: 'Developmental process',
      learningObjective: 'Trace the apex of the bladder to the allantois.',
      answerOverride: 'A',
      answerOverrideReason:
        'The books print no key. The department book lists among the functions of the yolk sac that the proximal part of the allantois forms the apex of the urinary bladder, so the allantois is the structure the question wants.',
      explanations: {
        A: 'The proximal part of the allantois forms the apex of the urinary bladder; what remains of it in the adult is the urachus, or median umbilical ligament.',
        B: 'The yolk sac is the allantois\'s parent and shares in forming the gut, but the bladder comes specifically from the diverticulum it sends into the connecting stalk. The question is asking for the more precise structure.',
        C: 'Amniotic fluid accumulates fetal urine once the bladder works. It is downstream of the organ, not its origin.',
        D: 'The primitive gut gives the hindgut and cloaca, which the bladder is partitioned from — but the apex itself is allantoic.',
      },
    },
    {
      key: 'expansion-of-amniotic-cavity-will-lead-to-f19f597a',
      conceptKey: 'amnion-expansion-and-the-amniochorionic-membrane',
      difficulty: 'Moderate', questionType: 'Developmental process',
      learningObjective: 'Name what the expanding amniotic cavity forms when it meets the chorion.',
      explanations: {
        A: 'The secondary yolk sac is formed by hypoblast cells re-lining the primary sac and by pinching off, on the thirteenth day. The amnion is not involved.',
        B: 'The connecting stalk is the surviving bridge of extra-embryonic mesoderm across the chorionic cavity. Expansion of the amnion narrows that cavity rather than creating the stalk.',
        C: 'Expansion brings the amnion into contact with the chorion, and the two together are the amniochorionic membrane — the membrane that ruptures at the start of labour.',
        D: 'The neural tube forms from ectoderm induced by the notochord, inside the embryo. Expansion of the surrounding cavity has nothing to do with it.',
      },
    },
    {
      key: 'regarding-the-decidua-basalis-one-of-the-following-statement-be62401c',
      conceptKey: 'decidua-definition-parts-fates',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Give the fate of decidua basalis and separate it from the other two parts.',
      answerOverride: 'B',
      answerOverrideReason:
        'The books print no key. The department book states that decidua basalis, the decidual plate, persists to form the maternal part of the placenta; the fusing, the covering and the final degeneration belong to capsularis and parietalis. Set to B.',
      explanations: {
        A: 'Fusing and obliterating the uterine cavity is what capsularis and parietalis do to each other at about the fourth month. Basalis is on the other side of the conceptus altogether.',
        B: 'Decidua basalis lies between the conceptus and the myometrium and becomes the maternal part of the placenta.',
        C: 'Covering the embryo and separating it from the uterine cavity is decidua capsularis — the classic swap, since basalis is beneath and capsularis above.',
        D: 'Degenerating at last is the fate of capsularis and parietalis. Basalis is the one part of the decidua that persists as an organ.',
      },
    },
    {
      key: 'regarding-the-decidua-parietalis-choose-the-correct-statemen-61eab5d0',
      conceptKey: 'decidua-definition-parts-fates',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Give the fate of decidua parietalis.',
      explanations: {
        A: 'Lying between the implanted embryo and the myometrium is decidua basalis, which becomes the placenta. Parietalis is the lining of the rest of the cavity.',
        B: 'Covering the embryo is decidua capsularis. Parietalis is what capsularis eventually fuses with, not the covering itself.',
        C: 'Persisting as the maternal part of the placenta is again basalis. This question and the decidua basalis question are printed with the same four statements and differ only in which part is named.',
        D: 'Decidua parietalis fuses with the capsularis, obliterating the uterine cavity, and is shed at delivery — it degenerates at last.',
      },
    },
    {
      key: 'neurenteric-canal-is-the-communication-between-eb87f229',
      conceptKey: 'notochord-formation-fate',
      difficulty: 'Moderate', questionType: 'Developmental process',
      learningObjective: 'Name the two cavities the neurenteric canal joins.',
      explanations: {
        A: 'The chorionic cavity is outside the embryonic disc entirely; the neurenteric canal is a passage through the disc, which is why it joins the two cavities on either side of it.',
        B: 'Degeneration of the floor of the notochordal canal and the endoderm fused to it opens a temporary communication between the amniotic cavity above and the yolk sac below.',
        C: 'The uterine cavity is maternal and separated from everything embryonic by the decidua. No canal within the embryo could reach it.',
        D: 'The yolk sac is one of the two correct cavities and the chorionic cavity is not the other. Half right, which makes it the best of the three wrong answers.',
      },
    },
    {
      key: 'one-of-the-following-is-an-event-of-the-8th-day-of-pregnancy-36b190f2',
      conceptKey: 'second-week-day-by-day-timetable',
      difficulty: 'Hard', questionType: 'Developmental timing',
      learningObjective: 'Assign four second-week events to their days and pick the eighth.',
      explanations: {
        A: 'The hypoblast forms on the eighth day, when the embryoblast cells facing the blastocele become cuboidal — the same day the amniotic cavity opens.',
        B: 'The primary yolk sac forms on the ninth day, when Heuser\'s membrane lines the blastocele. One day late, and it is the answer to the companion question on the same page.',
        C: 'The extra-embryonic mesoderm appears on the eleventh and twelfth days, from the wall of the yolk sac — so it needs the yolk sac of option B to exist first.',
        D: 'The primary chorionic villi begin after the thirteenth day, at the very end of the second week.',
      },
    },
    {
      key: 'chorionic-vesicle-is-formed-at-the-dep-book-c67d2aab',
      conceptKey: 'second-week-day-by-day-timetable',
      difficulty: 'Hard', questionType: 'Developmental timing',
      learningObjective: 'Date the chorionic vesicle from the day its cavity closes.',
      answerOverride: 'D',
      answerOverrideReason:
        'Neither printing of this question carries a key. The chorionic vesicle exists once the separate spaces in the extra-embryonic mesoderm have run together into a single chorionic cavity with a chorion around it, and the department book places that on the thirteenth day. Set to D.',
      explanations: {
        A: 'On the tenth day the blastocyst has only just been completely embedded; there is no extra-embryonic mesoderm yet and so no cavity to enclose.',
        B: 'The eleventh and twelfth days bring the extra-embryonic mesoderm and the first scattered spaces in it. Closer, but the spaces are still separate.',
        C: 'The eighth day is the amniotic cavity and the bilaminar disc — five days too early, and the earliest option offered.',
        D: 'On the thirteenth day the spaces fuse into a single chorionic cavity and the wall around it — somatic mesoderm, cytotrophoblast, syncytiotrophoblast — is the chorion.',
      },
    },
    {
      key: 'regarding-monozygotic-twin-dep-book-2024-75c8fa43',
      conceptKey: 'twins-monozygotic-and-dizygotic',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'State what follows from two twins sharing one zygote.',
      answerOverride: 'B',
      answerOverrideReason:
        'This printing carries no key; the other printing of the same question, which lost an option, is keyed to B. Monozygotic twins come from one fertilised ovum and therefore share one genotype, so they must be of the same sex — the only true statement of the four.',
      explanations: {
        A: 'Dizygotic twinning is the commoner kind by a wide margin. Identical twins are the more memorable, which is why this option is offered first.',
        B: 'One zygote means one set of chromosomes, so the two are necessarily of the same sex.',
        C: 'Monozygotic twins are identical — that is what the word means. Non-identical describes the dizygotic pair.',
        D: 'Development from two ova is the definition of dizygotic twinning, and it is the direct contradiction of "monozygotic" in the stem.',
      },
    },
    {
      key: 'regarding-the-dizygotic-twin-90dcf9d2',
      conceptKey: 'twins-monozygotic-and-dizygotic',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'State what follows from two twins arising from two zygotes.',
      answerOverride: 'A',
      answerOverrideReason:
        'The books print no key. Dizygotic twins arise from two ova fertilised by two sperms, so they are genetically ordinary siblings — non-identical, of either sex, and each with its own amnion and chorion. Only A is true.',
      explanations: {
        A: 'Two zygotes means two genotypes, so the twins are no more alike than any brother and sister.',
        B: 'Always of the same sex is the monozygotic rule. Dizygotic twins may be a boy and a girl, which is in fact the only certain way to tell the two kinds apart at birth.',
        C: 'Each dizygotic twin implants separately and has its own amnion. A shared amnion happens only in a monozygotic pair that split late.',
        D: 'A common chorion likewise requires one conceptus. Two separate implantations give two chorions, and usually two placentae.',
      },
    },
    {
      key: 'concerning-to-the-mucous-ct-the-followings-are-true-except-3c6fa9a0',
      conceptKey: 'mucoid-ct-is-jelly-rich-in-hyaluronic-acid',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Recognise that mucoid tissue is defined by its ground substance and not by its fibres.',
      explanations: {
        A: 'True, so not the exception. The matrix is a soft jelly, which is where the name comes from.',
        B: 'True, so not the exception. Hyaluronic acid is what makes the ground substance so abundant and so hydrated.',
        C: 'The exception, and the answer. Mucoid tissue has only *fine* collagen and reticular fibres; abundant type I collagen belongs to dense white fibrous tissue, which is the opposite kind of connective tissue — strong rather than soft.',
        D: 'True, so not the exception. Wharton\'s jelly, the main component of the umbilical cord, is mucoid connective tissue.',
      },
    },
    {
      key: 'mucoid-connective-tissue-is-present-in-all-of-the-following-8f3ee0bf',
      conceptKey: 'mucoid-ct-is-jelly-rich-in-hyaluronic-acid',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Name the three sites of mucoid tissue and reject the one that only sounds like a fourth.',
      explanations: {
        A: 'The exception, and the answer. A mucous membrane is an epithelium with its underlying lamina propria — loose areolar tissue, not mucoid tissue. The two share a syllable and nothing else, which is exactly why the option works.',
        B: 'True, so not the exception. The pulp of the teeth is one of the three sites.',
        C: 'True, so not the exception. In the umbilical cord it is called Wharton\'s jelly.',
        D: 'True, so not the exception. The vitreous humour of the eye is the third site.',
      },
    },
    {
      key: 'collagen-type-1-is-present-in-d30b3868',
      conceptKey: 'connective-tissue-fibres-collagen-reticular-and-elastic',
      difficulty: 'Moderate', questionType: 'Classification',
      learningObjective: 'Place type I collagen in the dense tissues.',
      explanations: {
        A: 'The capsule of an organ is dense irregular connective tissue, and its strength is type I collagen.',
        B: 'Fetal connective tissue is mesenchyme, cellular and with very fine fibres. It has not yet laid down the dense bundles type I forms.',
        C: 'Vascular — mucoid — connective tissue holds only fine collagen and reticular fibres in a jelly matrix; its whole character is the absence of dense collagen.',
        D: 'The placenta\'s connective tissue is the loose mesodermal core of the villi and Wharton\'s jelly in the cord, neither of which is dense.',
      },
    },
    {
      key: 'collagen-type-iii-forms-f73a03ca',
      conceptKey: 'connective-tissue-fibres-collagen-reticular-and-elastic',
      difficulty: 'Moderate', questionType: 'Classification',
      learningObjective: 'Identify type III collagen as the reticular fibre.',
      explanations: {
        A: 'White fibrous connective tissue — tendon, ligament, aponeurosis — is type I. It is the option a student picks who has learnt "collagen means strong" without the numbering.',
        B: 'Type III collagen is the reticular fibre, and reticular fibres form the supporting stroma of parenchymatous organs such as liver, spleen and lymph node.',
        C: 'The basement membrane is type IV collagen, a network rather than a fibre.',
        D: 'Placental connective tissue is the loose core of the villus, and is not defined by a collagen type at all.',
      },
    },
    {
      key: 'reticular-connective-tissue-is-present-in-7407c983',
      conceptKey: 'connective-tissue-fibres-collagen-reticular-and-elastic',
      difficulty: 'Easy', questionType: 'Classification',
      learningObjective: 'Name the site of reticular connective tissue.',
      explanations: {
        A: 'The capsule of an organ is dense irregular tissue of type I collagen. The reticular tissue is inside the capsule, holding the parenchyma.',
        B: 'Ligamentum nuchae is yellow elastic connective tissue — it has to stretch and recoil as the head nods.',
        C: 'The umbilical cord is mucoid connective tissue, Wharton\'s jelly.',
        D: 'Reticular tissue forms the stroma of the parenchymatous organs — liver, spleen, lymph node and bone marrow — where a fine branching network can support cells without stiffening the organ.',
      },
    },
    {
      key: 'yellow-elastic-connective-tissue-is-present-in-94267e94',
      conceptKey: 'connective-tissue-fibres-collagen-reticular-and-elastic',
      difficulty: 'Easy', questionType: 'Classification',
      learningObjective: 'Name the site of yellow elastic connective tissue.',
      explanations: {
        A: 'The capsule of an organ resists stretch rather than performing it; it is dense collagen.',
        B: 'Ligamentum nuchae is the type example of yellow elastic connective tissue, along with the ligamenta flava and the vocal ligaments.',
        C: 'The umbilical cord is mucoid tissue. This question and the reticular-tissue question are printed with the same four options, so the four sites have to be held apart as a set.',
        D: 'The stroma of organs is reticular tissue, type III collagen.',
      },
    },
    {
      key: 'chorionic-plate-dep-book-em-em-em-em-em-a8dcf7a0',
      conceptKey: 'chorionic-villi-types-development',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'An annotated re-printing keyed to the decidua basalis, which is the maternal plate. The chorionic plate is chorion frondosum. The clean printing at `chorionic-plate-aa0b703c` is live with the answer supplied.',
    },
    {
      key: 'chorionic-plate-a-is-the-chorion-leave-04836a61',
      conceptKey: 'chorionic-villi-types-development',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The stem has swallowed option A. Its key, B for chorion frondosum, is right and is what the override on `chorionic-plate-aa0b703c` rests on.',
    },
    {
      key: 'chorionic-plate-a-is-the-chorion-leave-i-ac2e4530',
      conceptKey: 'chorionic-villi-types-development',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The worst of four printings: the stem has swallowed option A and option B has swallowed option C, so two of the four choices are printed under one letter. Live and clean at `chorionic-plate-aa0b703c`.',
    },
    {
      key: 'chorionic-villi-are-considered-as-secondary-chorionic-villi-2cea4d11',
      conceptKey: 'chorionic-villi-types-development',
      difficulty: 'Hard', questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Damaged twice. The stem has swallowed option A — "(2023 - 2022) ad Ac a- Contact the decidua basalis y Ac" — and the printed key, B, says a villus is secondary when it is covered by syncytiotrophoblast, which is true of a primary villus as well and so cannot be what makes it secondary. The answer is C, the mesenchymal core. A rescan repairs the stem; the key is a reviewer\'s matter, and this is the only printing.',
    },
    {
      key: 'regarding-the-placental-decidual-septa-dep-book-ac-ad-ac-ad-307df933',
      conceptKey: 'placenta-structure-plates-septa-and-cotyledons',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'An annotated re-printing keyed to C, that the septa are fixed to the chorionic plate. The book calls them incomplete, which is precisely the statement that they are not. The clean printing at `regarding-the-placental-decidual-septa-10b5239b` is keyed to the decidual plate and is live.',
    },
    {
      key: 'regarding-the-placental-decidual-septa-they-are-composed-of-ee8d832f',
      conceptKey: 'placenta-structure-plates-septa-and-cotyledons',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The stem has swallowed option A and option C was lost, leaving three. Live at `regarding-the-placental-decidual-septa-10b5239b`.',
    },
    {
      key: 'placental-barrier-is-the-separation-between-f03f08bd',
      conceptKey: 'placental-barrier-early-and-late',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The correct option is the one the scanner destroyed: D reads "Fetal and maternal blood inside ام ~nta". A student cannot pick an answer they cannot read. The complete printing at `placental-barrier-is-the-separation-between-dep-book-em-em-e-64936622` is live with its key overridden.',
    },
    {
      key: 'placental-barrier-is-the-separation-between-a-fetal-and-mate-578ad71c',
      conceptKey: 'placental-barrier-early-and-late',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The stem has swallowed options A and B, leaving two. Live at `placental-barrier-is-the-separation-between-dep-book-em-em-e-64936622`.',
    },
    {
      key: 'one-of-the-following-is-correct-regarding-the-functions-of-p-cc32867b',
      conceptKey: 'placental-functions-and-hormones',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option D has lost a word and reads "It prevents the passage cf all viruses", and the row carries no key. The other printing, `one-of-the-following-is-correct-regarding-the-functions-of-p-78fcdecb`, has the option intact and is live with its key overridden.',
    },
    {
      key: 'one-of-the-following-is-not-true-regarding-the-placenta-2023-8f9f62d3',
      conceptKey: 'placenta-structure-plates-septa-and-cotyledons',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The stem has swallowed option A — "a- Its fetal part develops from chorion frondosum" — and so states one of its own answers before asking. The key, B, is right: the maternal part develops from decidua basalis, not capsularis. It is the only printing, and a rescan of the stem alone recovers it.',
    },
    {
      key: 'marginal-attachment-of-umbilical-cord-to-the-placenta-is-kno-d1364623',
      conceptKey: 'placenta-anomalies',
      difficulty: 'Easy', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'An annotated re-printing keyed to placenta previa, which is an anomaly of position and has nothing to do with the cord. The clean printing at `marginal-attachment-of-umbilical-cord-to-the-placenta-is-kno-09cd8da4`, asked twice as often, is keyed to battledore placenta and is live.',
    },
    {
      key: 'thin-and-wide-placenta-is-known-as-dep-book-a198717a',
      conceptKey: 'placenta-anomalies',
      difficulty: 'Easy', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'An annotated duplicate whose answer option is misspelt as "Placenta membrancacea". Its key agrees with the override on the clean printing at `thin-and-wide-placenta-is-known-as-b2864ad3`, which is live.',
    },
    {
      key: 'thin-and-wide-placenta-is-known-as-0-02725316',
      conceptKey: 'placenta-anomalies',
      difficulty: 'Easy', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option C was lost, leaving three, and there is no key. Live at `thin-and-wide-placenta-is-known-as-b2864ad3`.',
    },
    {
      key: 'abnormally-long-umbilical-cord-may-lead-to-889819f2',
      conceptKey: 'umbilical-cord-anomalies',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option D breaks up mid-phrase — "Adhesion between the fetus with t\' > wall of uterus". The complete printing at `abnormally-long-umbilical-cord-may-lead-to-dep-book-2024-ac-59be1fce` is live with the answer supplied.',
    },
    {
      key: 'physiological-hernia-occurs-when-a-loop-of-intestine-is-pres-c41b6bde',
      conceptKey: 'umbilical-cord-development-and-contents',
      difficulty: 'Hard', questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Damaged twice: option C has been replaced by "Vitelline duct" where the other printing has "Primitive umbilical cord" — which is the answer — and the row is then keyed to D, the definitive cord, where an intestinal loop would be an omphalocele rather than a physiological hernia. The clean printing at `physiological-hernia-occurs-when-a-loop-of-intestine-is-pres-95afdc5e` is live.',
    },
    {
      key: 'regarding-the-primitive-umbilical-ring-dep-book-ac-p-vi-a-it-dd89f1a3',
      conceptKey: 'umbilical-cord-development-and-contents',
      difficulty: 'Hard', questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The stem has swallowed option A, and the row is keyed to B, that the ring contains the definitive yolk sac — which belongs to the primitive umbilical *cord*, one stage later. The clean printing at `regarding-the-primitive-umbilical-ring-7dc961fb` is keyed to the vitelline duct and is live.',
    },
    {
      key: 'de-nitive-yolk-sac-is-connected-with-midgut-through-dep-book-472797e2',
      conceptKey: 'yolk-sac-allantois-heuser-and-the-vitelline-duct',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'An annotated re-printing keyed to the allantois, which runs from the yolk sac into the connecting stalk and reaches the bladder, not the gut. The clean printing at `definitive-yolk-sac-is-connected-with-midgut-through-ce358c9f`, asked twice as often, is keyed to the vitelline duct and is live.',
    },
    {
      key: 'definitive-yolk-sac-is-connected-with-midgut-through-wi-a-co-e324de0a',
      conceptKey: 'yolk-sac-allantois-heuser-and-the-vitelline-duct',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The stem has swallowed option A and option C was lost, leaving two. Live at `definitive-yolk-sac-is-connected-with-midgut-through-ce358c9f`.',
    },
    {
      key: 'chorionic-vesicle-is-formed-at-the-e1495d12',
      conceptKey: 'second-week-day-by-day-timetable',
      difficulty: 'Hard', questionType: 'Developmental timing',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Every option has lost its ordinal to the scanner — "10\" day", "11\" day", "8\" day", "13 day" — so a question that is nothing but four dates has no readable dates in it, and there is no key. The other printing, `chorionic-vesicle-is-formed-at-the-dep-book-c67d2aab`, has the ordinals intact and is live with the answer supplied.',
    },
    {
      key: 'allantois-is-a-dorsal-extension-from-1-df5dcbdb',
      conceptKey: 'yolk-sac-allantois-heuser-and-the-vitelline-duct',
      difficulty: 'Moderate', questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A duplicate with scan debris run into the stem and no key. Clean and keyed at `allantois-is-a-dorsal-extension-from-11d3fece`.',
    },
    {
      key: 'allantois-is-a-dorsal-extension-from-dep-book-3d403c21',
      conceptKey: 'yolk-sac-allantois-heuser-and-the-vitelline-duct',
      difficulty: 'Moderate', questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A "(DEP BOOK)"-annotated duplicate with no key. Clean and keyed at `allantois-is-a-dorsal-extension-from-11d3fece`.',
    },
    {
      key: 'heuser-s-membrane-lines-the-a-definitive-yolk-sac-35f78a4b',
      conceptKey: 'yolk-sac-allantois-heuser-and-the-vitelline-duct',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The stem has swallowed option A. Its key, B for the primary yolk sac, is right and is what the override on `heuser-s-membrane-lines-the-d3bb317b` rests on.',
    },
    {
      key: 'heuser-s-membrane-lines-the-definitive-yolk-sac-1-0aec68c9',
      conceptKey: 'yolk-sac-allantois-heuser-and-the-vitelline-duct',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The stem has swallowed option A and option C was lost, leaving two. Live at `heuser-s-membrane-lines-the-d3bb317b`.',
    },
    {
      key: 'heuser-s-membrane-lines-the-dep-book-em-em-em-em-em-114cec21',
      conceptKey: 'yolk-sac-allantois-heuser-and-the-vitelline-duct',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The fourth printing, "(DEP BOOK)"-annotated and with no key. Live at `heuser-s-membrane-lines-the-d3bb317b`.',
    },
    {
      key: 'yolk-sac-shares-in-the-formation-of-49e90126',
      conceptKey: 'yolk-sac-allantois-heuser-and-the-vitelline-duct',
      difficulty: 'Moderate', questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Two of the four options are not answers to this stem: B reads "3 month" and D "5\'\' month", both bled in from a fetal-period question on the same page. The answer, that the yolk sac shares in forming the foregut, midgut and hindgut, survives as option A, but a two-option question cannot be sat. The page needs rescanning.',
    },
    {
      key: 'expansion-of-amniotic-cavity-will-lead-to-dep-book-ac-ad-ac-0ca89b33',
      conceptKey: 'amnion-expansion-and-the-amniochorionic-membrane',
      difficulty: 'Moderate', questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option B was lost, leaving three, and there is no key. Clean and keyed at `expansion-of-amniotic-cavity-will-lead-to-f19f597a`.',
    },
    {
      key: 'polyhydramnios-is-the-increase-of-the-volume-of-amniotic-flu-fda7ba4e',
      conceptKey: 'amniotic-fluid-functions',
      difficulty: 'Moderate', questionType: 'Normal values',
      learningObjective: 'Not sittable as printed.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option B was lost, leaving three — one, three and four litres — and the conventional threshold, two litres, is the missing one. It is also the one row in this leaf that asks for a figure the department book never gives: the book defines polyhydramnios as "increased amniotic fluid at full term" and states no volume anywhere. A rescan restores the option; establishing what the faculty expects as the number is a question for the department, not for the scanner.',
    },
    {
      key: 'fetal-movements-are-normally-perceived-by-the-mother-startin-c1773dfb',
      conceptKey: 'amniotic-fluid-functions',
      difficulty: 'Moderate', questionType: 'Developmental timing',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Two of the four options have bled in from the twinning question on the same page — B reads "Always of same sex" and D "Has a common chorion" — and the correct answer, the fifth month, is not among the two that remain. The row is keyed to one of the imported options. The page needs rescanning.',
    },
    {
      key: 'one-of-the-following-is-an-event-of-day-of-pregnancy-1c27a38c',
      conceptKey: 'second-week-day-by-day-timetable',
      difficulty: 'Hard', questionType: 'Developmental timing',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The stem has lost the number it turns on and reads "One of the following is an event of day of pregnancy". The four options are four different days\' events, so without the day the question has no answer — and the key, B, would make it the ninth day while three other printings of the same stem name the eighth. A rescan is needed to say which day was asked.',
    },
    {
      key: 'one-of-the-following-is-an-event-of-the-8-day-of-pregnancy-a017ed9f',
      conceptKey: 'second-week-day-by-day-timetable',
      difficulty: 'Hard', questionType: 'Developmental timing',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The stem\'s ordinal has been read as a quotation mark — "the 8\'\' day" — and there is no key. The printing at `one-of-the-following-is-an-event-of-the-8th-day-of-pregnancy-36b190f2` has the ordinal intact and a correct key, and is live.',
    },
    {
      key: 'one-of-the-following-is-an-event-of-the-8-day-of-pregnancy-1-ed81d1bd',
      conceptKey: 'second-week-day-by-day-timetable',
      difficulty: 'Hard', questionType: 'Developmental timing',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option C was lost, leaving three, and the ordinal in the stem is damaged in the same way. Live at `one-of-the-following-is-an-event-of-the-8th-day-of-pregnancy-36b190f2`.',
    },
    {
      key: 'one-of-the-following-is-an-event-of-the-9-day-of-pregnancy-32dcf5e1',
      conceptKey: 'second-week-day-by-day-timetable',
      difficulty: 'Hard', questionType: 'Developmental timing',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The same question as `one-of-the-following-is-an-event-of-the-9th-day-of-pregnancy-35412c8d`, which is live in the Second Week of Development leaf with its answer supplied. This printing has the same four options, no key, and a damaged ordinal in the stem, so it is excluded as the redundant copy rather than published as a second identical item.',
    },
    {
      key: 'one-of-the-following-is-an-event-of-the-gth-day-of-pregnancy-b2cb39c0',
      conceptKey: 'second-week-day-by-day-timetable',
      difficulty: 'Hard', questionType: 'Developmental timing',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Damaged twice. The stem\'s day has been read as "the gth day", which could be the ninth or the eighth, and the row is keyed to A, the formation of the hypoblast — an eighth-day event. If the stem is the ninth day the key is wrong; if it is the eighth then this duplicates the row already live at `one-of-the-following-is-an-event-of-the-8th-day-of-pregnancy-36b190f2`. Either way it cannot be published as it stands.',
    },
    {
      key: 'neurenteric-canal-is-the-communication-between-2017-2nd-dep-452a3c4a',
      conceptKey: 'notochord-formation-fate',
      difficulty: 'Moderate', questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The correct option is not present. The four options offered are the amniotic sac with the chorionic cavity, the yolk sac with the chorionic cavity, the notochordal canal with the amniotic cavity, and the amniotic with the uterine cavity — and the answer, the amniotic cavity with the yolk sac, is missing, having apparently been replaced when option C was lost. The row is keyed to the first of them. The page needs rescanning; the question is intact at `neurenteric-canal-is-the-communication-between-eb87f229`.',
    },
    {
      key: 'neurenteric-canal-is-the-communication-between-amniotic-and-fc78e051',
      conceptKey: 'notochord-formation-fate',
      difficulty: 'Moderate', questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The stem has swallowed option A and option C was lost, leaving two. Live at `neurenteric-canal-is-the-communication-between-eb87f229`.',
    },
    {
      key: 'one-of-the-following-is-an-extraembryonic-fetal-membrane-201-30c68d66',
      conceptKey: 'amnion-expansion-and-the-amniochorionic-membrane',
      difficulty: 'Moderate', questionType: 'Classification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option D has been replaced by a whole sentence from another question — "Short cord may lead to premature separation of the placenta" — and the row is keyed to B, the bucco-pharyngeal membrane, which is a fusion of ectoderm and endoderm within the embryonic disc and not an extra-embryonic membrane at all. The answer is A, the amniochorionic membrane. Both defects need the page rescanned.',
    },
    {
      key: 'one-of-the-following-is-an-extraembryonic-fetal-membranes-am-67cee721',
      conceptKey: 'amnion-expansion-and-the-amniochorionic-membrane',
      difficulty: 'Moderate', questionType: 'Classification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The other printing of the same question, and no better: the stem has swallowed option A, which is the answer, and option B is misspelt to "meriibrané". Both copies of this question are damaged, so a rescan is the only route to it.',
    },
    {
      key: 'regarding-monozygotic-twin-352aa255',
      conceptKey: 'twins-monozygotic-and-dizygotic',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option D was lost, leaving three. Its key, B, is right and is what the override on `regarding-monozygotic-twin-dep-book-2024-75c8fa43` rests on; that printing has the full option set and is live.',
    },
    {
      key: 'one-of-the-following-is-biaxial-joint-a-shoulder-hip-i-elbow-c3a84493',
      conceptKey: 'notochord-formation-fate',
      difficulty: 'Moderate', questionType: 'Classification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three questions have collided into one row. The stem is a joints question — "One of the following is biaxial joint" — whose four options have all run into option A along with the stem of a fourth question about the trophoblast, while options B, C and D come from two different embryology questions, one of them the neurenteric canal and one the notochord. Nothing here is answerable; the page will yield three or four separate questions when rescanned.',
    },
    {
      key: 'one-of-the-following-joints-is-synovial-uniaxial-a-shoulder-843d1c93',
      conceptKey: 'yolk-sac-allantois-heuser-and-the-vitelline-duct',
      difficulty: 'Moderate', questionType: 'Classification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Another collision. The stem asks for a uniaxial synovial joint and has swallowed its own first option, while the four options listed are the duodenal epithelium, the wrist, the connecting stalk and the secondary yolk sac — three of which belong to two different embryology questions. Only the wrist could answer the stem, and a one-answer option list with three imported distractors is not a question. Needs rescanning.',
    },
    {
      key: 'scaphoid-19-regarding-the-decidua-parictalis-choose-the-corr-c8853425',
      conceptKey: 'decidua-definition-parts-fates',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The row has no stem of its own. What was captured is the tail of a hand question — "Scaphoid" — followed by the numbered heading of the next question, "19- Regarding the decidua parictalis, choose the correct statement:", and then four options from three different questions, one of which is "Scaphoid" again. The decidua parietalis question itself survives intact at `regarding-the-decidua-parietalis-choose-the-correct-statemen-61eab5d0`, which is live; this row is the wreckage of the page break.',
    },
    {
      key: 'premature-separation-of-placenta-occurs-due-to-e8fde7ca',
      conceptKey: 'umbilical-cord-anomalies',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Attach premature separation of the placenta to the short cord, and give what each of the other cord and placental anomalies causes instead.',
      answerOverride: 'a',
      answerOverrideReason: 'The 2020 paper printed no key and the recovered answer sheet does not cover this source, so the answer is taken from the department book rather than from a key. The book lists among the congenital anomalies of the cord "short cord limiting fetal movement and causing premature separation of placenta during delivery", which is option a in the paper\u2019s own words.',
      explanations: {
        a: 'A cord too short to pay out as the fetus descends is put under traction during delivery, and the pull is transmitted to the placenta and strips it off the decidua basalis before the baby is delivered.',
        b: 'The long cord is the dangerous one a student remembers, because neck encirclement and a true knot are life-threatening \u2014 but both of those strangle the fetal circulation through the cord itself. A long cord has slack to spare and pulls on nothing.',
        c: 'An accessory placenta is an anomaly of number, a separate lobe joined to the main disc by vessels. It matters because the extra lobe may be retained after delivery, which is the opposite problem: placenta left behind rather than placenta detached early.',
        d: 'Placenta accreta is abnormal infiltration of the placenta into the uterine wall, and it too is the opposite of this question \u2014 an accreta will not separate when it should, and is a cause of retained placenta and post-partum haemorrhage.',
      },
    },
    {
      key: 'regarding-full-term-placenta-one-of-the-following-is-not-tru-ae89b3ce',
      conceptKey: 'placenta-structure-plates-septa-and-cotyledons',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three of the four options are false against the department book, and the paper printed no key. The book gives the full-term placenta a weight of 500\u2013600 gm (option a, true), a thickness of 3 cm (against option b\u2019s one cm), and a diameter of 15\u201325 cm (against option c\u2019s 25\u201330 cm); and it puts the umbilical cord on the fetal surface, against option d\u2019s maternal surface. A "which is not true" question with three true answers has no single best answer, and this is not a scanning fault a rescan would fix \u2014 the options are cleanly extracted and the item needs a faculty reviewer. The disagreement is recorded on the concept rather than settled here by guessing which of the three the examiner meant.',
    },
    {
      key: 'concerning-the-umbilical-cord-at-birth-select-the-incorrect-1f7b6b65',
      conceptKey: 'umbilical-cord-development-and-contents',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Give the vessel count, the length and the placental attachment of the definitive umbilical cord.',
      answerOverride: 'b',
      answerOverrideReason: 'The 2021 paper printed no key and the recovered answer sheet has no entry for this source, so the answer comes from the department book. The book gives the definitive cord two umbilical arteries and one umbilical vein, a length of 50\u201360 cm, attachment near the centre of the fetal surface of the placenta, and a short cord as a cause of premature separation \u2014 so a, c and d are its own words and b is the one statement it contradicts.',
      explanations: {
        a: 'True, and the figure is exactly 50\u201360 cm long and about 2 cm across. The length matters because it is what the two length anomalies are measured against.',
        b: 'This is the incorrect statement, and the answer. The cord carries two arteries and one vein, not two veins and one artery. The count is inverted so often because the fetal circulation is inverted: the paired vessels are the arteries carrying deoxygenated blood away from the fetus, and the single vessel is the vein bringing oxygenated blood back. A student who reasons from the adult body, where veins outnumber arteries, gets it backwards.',
        c: 'True. The cord is attached near the centre of the smooth, amnion-covered fetal surface; attachment at the margin is battledore placenta and attachment through the amniotic membrane is velamentous, and both are named as anomalies precisely because the normal site is the fetal surface.',
        d: 'True, and it is the first named cord anomaly: a short cord limits fetal movement and is put under traction at delivery, stripping the placenta prematurely.',
      },
    },
    {
      key: 'concerning-the-placenta-one-of-the-following-is-incorrect-35ecea57',
      conceptKey: 'placenta-structure-plates-septa-and-cotyledons',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the fetal and the maternal part of the placenta, and say which of the three deciduae each part comes from.',
      answerOverride: 'b',
      answerOverrideReason: 'The 2021 paper printed no key and the recovered answer sheet does not cover this source, so the answer is taken from the department book. The book states the placenta is formed by union of a maternal part \u2014 the decidual plate, which is decidua basalis \u2014 and a fetal part, the chorionic plate, which is chorion frondosum. Option b names decidua capsularis, which the book gives no part in the placenta at all.',
      explanations: {
        a: 'True. The fetal part is the chorionic plate, and the chorionic plate is chorion frondosum \u2014 the pole of the chorion facing decidua basalis, where the villi are kept and grow.',
        b: 'This is the incorrect statement, and the answer. The maternal part is decidua basalis. Decidua capsularis is the thin layer that covers the conceptus on the side facing the uterine cavity; it degenerates as the sac expands, which is what lets the amniochorionic membrane meet decidua parietalis. Students pick it because all three deciduae are learnt as one list and only one of them makes placenta.',
        c: 'True. The placental barrier separates maternal blood in the intervillous spaces from fetal blood in the tertiary villi, and it is the whole reason the two circulations never mix.',
        d: 'True. The placenta is an endocrine gland as well as an exchange organ, secreting progesterone, oestrogen, human chorionic gonadotropin and somatomammotropin.',
      },
    },
    {
      key: 'regarding-the-umbilical-cord-at-birth-select-the-incorrect-s-c6e1b0e6',
      conceptKey: 'umbilical-cord-development-and-contents',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Give the vessel count, the length and the placental attachment of the definitive umbilical cord.',
      answerOverride: 'b',
      answerOverrideReason: 'The 2022 paper printed no key and the recovered answer sheet has no entry for this source, so the answer comes from the department book: the definitive cord holds two umbilical arteries and one umbilical vein. This is the previous year\u2019s question reset with the false option changed from "2 veins and one artery" to "2 veins and 2 arteries"; the other three options are word for word the same and are all true.',
      explanations: {
        a: 'True, and the cord is 50\u201360 cm long and about 2 cm in diameter.',
        b: 'This is the incorrect statement, and the answer. The count is two arteries and one vein, three vessels in all, not four. This year\u2019s version is harder than the previous year\u2019s "2 veins and one artery", because it gets the total wrong as well as the distribution, and a student who has learnt only "three vessels" can still catch it.',
        c: 'True. The cord is attached near the centre of the fetal surface of the placenta \u2014 the smooth surface covered by amnion, over which the umbilical vessels run to reach the villi.',
        d: 'True, and the short cord\u2019s known effect: it limits fetal movement and separates the placenta prematurely during delivery.',
      },
    },
    {
      key: 'the-finger-like-projections-of-cytotrophoblast-into-syncytio-e1d795a7',
      conceptKey: 'chorionic-villi-types-development',
      difficulty: 'Easy', questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'Filed here rather than in `hand.ts`, where the slice put it because the stem says "finger-like": it is a chorionic villi question and this leaf owns the concept. From the ringed 2024 script, with `options` empty \u2014 the four names are inside the stem, "a\u00e9Somatic villi b. Splanchnic villi _& Primary chorionic vill d. Secondary chorionic vill", with the letters struck through and the word villi truncated twice. The department book\u2019s answer is the primary chorionic villi, the finger-like projections of cytotrophoblast into the syncytiotrophoblast; somatic and splanchnic are names of extra-embryonic mesoderm, not of villi. A rescan of an unringed copy recovers it.',
    },
    {
      key: 'abnormally-long-umbilical-cord-may-lead-to-6-formation-of-fa-ccd8e6fc',
      conceptKey: 'umbilical-cord-anomalies',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'Filed here rather than in `fetal-period.ts`, where the slice put it: it is a cord-anomaly question, this leaf owns the concept, and the live copy of the same question is already here as `abnormally-long-umbilical-cord-may-lead-to-dep-book-2024-ac-59be1fce`. From the ringed 2024 script, with `options` empty \u2014 the choices are inside the stem, "Formation of false knots. - Early separation of placenta during delivery -& Strangulation of the baby during delivery", and the stem then runs on into the next question. The department book\u2019s answer is strangulation: a long cord may encircle the fetal neck or form a true knot, while the false knot is a wider curve of an umbilical artery that causes no fetal stress and early separation belongs to the short cord. The live copy carries all of that; this row adds only the sat paper\u2019s occurrence, and needs a rescan to do even that.',
    },
    {
      key: 'yolk-sac-shares-in-the-formation-of-a-forebrain-midbrain-and-c18f545a',
      conceptKey: 'yolk-sac-allantois-heuser-and-the-vitelline-duct',
      difficulty: 'Easy', questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'Filed here rather than in `second-week-of-development.ts`, where the slice put it: the department book teaches the yolk sac in the Fetal Membranes chapter, this leaf owns the concept, and the question-book copy of the same question is already here as `yolk-sac-shares-in-the-formation-of-49e90126`. From the ringed 2024 script, with `options` empty \u2014 the four choices are inside the stem, "a Forebrain, midbrain and hind brain _*. Kidneys ec Foregut, midgut and hindgut AL Spleen", with the letters struck through and the printed number mangled to 419. The book\u2019s answer is the gut: the yolk sac shares with the endoderm in forming the foregut, midgut and hindgut. A rescan of an unringed copy recovers it.',
    },
  ],
}
