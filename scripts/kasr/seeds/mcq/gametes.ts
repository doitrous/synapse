/**
 * `101 ISK > Anatomy > General Embryology > Gametes` — the question books' MCQs.
 *
 * Thirty-one rows and eleven distinct questions, each printed two or three
 * times. Thirteen rows survive; eighteen are excluded, and all but three of
 * those are annotated re-printings of a question that is clean elsewhere in this
 * file.
 *
 * The annotated printings are worth naming as a group, because they fail in a
 * way a reviewer should see. Seven of them carry "(DEP BOOK)" in the stem, and
 * six of those seven are keyed to an answer I believe is wrong — capacitation
 * keyed to "increase movement of the tail", spermatogenesis keyed to "starts at
 * birth", sperm receptors keyed to the corona radiata, Phase II keyed to
 * capacitation, the sperm's energy keyed to the tail, and the zona reaction
 * keyed to "occurs after capacitation". In every one of those six the clean
 * printing of the same question, with the same four options, is keyed correctly
 * and is live in this file. That is not six independent mistakes; it is one
 * answer column set against the wrong questions, the same failure the cytoplasm
 * lane found clustering by page. Each of the six is excluded with its clean twin
 * named, and none is silently absorbed.
 *
 * Three concepts are reused verbatim and one is minted.
 * `gamete-morphology-and-the-haploid-nucleus` is already declared in
 * `nucleus.ts` — with this leaf's own modulePath, since it was always an
 * embryology concept that a nucleus question happened to reach — and is repeated
 * here unchanged. `fertilization-site-mechanism-results` comes from the written
 * papers and `cilium-origin-and-ultrastructure` from `cytoplasm.ts`; the latter
 * carries the two cilia-and-flagella questions that the topic clustering filed
 * under Gametes because their answer is the sperm.
 *
 * The minted one is `gametogenesis-timing-in-male-and-female`. It is not a rival
 * to the morphology concept: four rows of this leaf ask nothing about what a
 * gamete looks like and everything about when it is made, and the department
 * book examines the two starting points against each other — puberty in the
 * male, intrauterine life with an arrest in the female. A student can know one
 * and not the other.
 *
 * On whether the books ask timing the book never states: they do not here. Both
 * schedules are printed in the book's own text on page 66.
 */
import type { McqLeafSeed } from '../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Gametes',
  modulePath: '101 ISK > Anatomy > General Embryology > Gametes',
  articleId: 'ART-101-ANA-GAMETES',

  concepts: [
    {
      key: 'gamete-morphology-and-the-haploid-nucleus',
      label: 'Each gamete nucleus carries 22 autosomes and one sex chromosome — always X in the ovum, X or Y in the sperm',
      definition:
        'The sperm is about 55 µm long and has a head, neck, middle piece and tail. Its head holds a condensed nucleus carrying 22 autosomes and either an X or a Y chromosome, with an acrosomal cap of hyaluronidase and acrosin over most of the nucleus, and spermatogenesis begins at puberty and continues into old age. The mature ovum is a secondary oocyte about 120 µm across whose nucleus carries 22 autosomes and an X chromosome only, with a large cytoplasm that is the zygote\'s first source of nutrition; oogenesis begins in intrauterine life, is arrested, and resumes from puberty to the menopause. The ovum has three coverings, from within outwards: cell membrane, zona pellucida — a glycoprotein coat carrying the sperm receptors — and corona radiata, the outer cover of follicular cells held together by hyaluronic acid.',
      objective:
        'State the chromosome content of each gamete nucleus, and name the parts of the sperm and the three coverings of the ovum in order.',
      pitfall:
        'Giving the ovum "either X or Y". The sex of the child is decided by the sperm, because the oocyte nucleus can only carry an X; the two gamete questions are written with the same option in both, and it is true for one and false for the other.',
      subject: 'dev',
      primary: 'DIS-EMB-T01',
      secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > Gametes',
      type: 'structural_description',
      aliases: ['Sperm', 'Ovum', 'Corona radiata', 'Zona pellucida'],
      gaps: [
        'The department book teaches no meiosis. Its Gametes chapter describes the morphology of the sperm and the ovum and the chromosome content of each nucleus, and stops there: the words meiosis, prophase, crossing-over, non-disjunction, aneuploidy and euploidy appear nowhere in the whole book except one sentence in the First Week chapter about the oocyte completing its second meiotic division. Two sat end-of-module questions examine exactly that material \u2014 `during-which-stage-of-first-meiotic-division-does-crossing-o-b01c5d2d` and `numerical-aberrations-of-chromosomes-occur-due-to-fc449570` \u2014 so the papers test what the book this faculty teaches from does not state. The first is answered here from general cytogenetics because only one of its four options is defensible; the second is excluded because more than one is.',
      ],
    },
    {
      key: 'gametogenesis-timing-in-male-and-female',
      label: 'Spermatogenesis runs continuously from puberty to old age, while oogenesis starts before birth, arrests, and resumes from puberty to the menopause',
      definition:
        'Gametogenesis is the formation of gametes from primordial germ cells and takes place in the gonads. The two sexes run it on opposite schedules. In the male it begins at puberty and continues without interruption into old age, so sperm are made afresh throughout adult life. In the female it begins in intrauterine life — the oocytes a woman will ever have are already present before she is born — is then arrested, and resumes at puberty, continuing through the ovarian cycles until the menopause; ovulation falls on the 14th day of each cycle.',
      objective:
        'Give the start and end of gametogenesis in each sex, and name the arrest that interrupts it in the female.',
      pitfall:
        'Reading "starts at birth" as the female answer. Oogenesis starts before birth, in intrauterine life, and that word is what the four options in every printing of this question turn on; a student who has learnt it as "starts early" will accept birth, puberty or menopause as the boundary and get it wrong three ways.',
      subject: 'dev',
      primary: 'DIS-EMB-T01',
      secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > Gametes',
      type: 'developmental_process',
      aliases: ['Spermatogenesis', 'Oogenesis', 'Gametogenesis'],
    },
    {
      key: 'fertilization-site-mechanism-results',
      label: 'Fertilisation happens in the ampulla of the uterine tube and has four results',
      definition:
        'Fertilisation is the process by which sperm and ovum unite to form a zygote, and it occurs in the ampullary part of the uterine tube, its lateral third. Its results are the formation of the zygote; determination of sex, male (XY) or female (XX), by the fertilising sperm; restoration of the diploid number of forty-six chromosomes; and the start of cleavage with migration from the site of fertilisation to implantation in the uterine cavity.',
      objective: 'State where fertilisation occurs and give the four results the department book lists.',
      pitfall: 'Saying the uterus. Fertilisation is tubal; the uterus is where the product of it implants, four days later.',
      subject: 'dev',
      primary: 'DIS-EMB-T01',
      secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > First Week of Development',
      type: 'developmental_process',
      aliases: ['Conception'],
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
  ],

  questions: [
    {
      key: 'regarding-formation-of-sperms-470af7b3',
      conceptKey: 'gametogenesis-timing-in-male-and-female',
      difficulty: 'Easy', questionType: 'Developmental timing',
      learningObjective: 'Give the start and end of spermatogenesis.',
      explanations: {
        A: 'Starting at birth is the female pattern misapplied to the male, and even for the female it is a month too late — she starts in intrauterine life. Nothing about sperm begins at birth. This is the option one annotated printing of this question is keyed to in error.',
        B: 'Stopping at puberty is exactly backwards: puberty is when spermatogenesis begins, not when it ends.',
        C: 'Correct. Spermatogenesis starts at puberty and continues into old age, without the arrest that interrupts the female schedule.',
        D: 'Starting at old age would leave a man infertile for most of his life. The option exists only to complete the four combinations of the two boundaries.',
      },
    },
    {
      key: 'regarding-oogenesis-a0c4a0bf',
      conceptKey: 'gametogenesis-timing-in-male-and-female',
      difficulty: 'Moderate', questionType: 'Developmental timing',
      learningObjective: 'Place the beginning of oogenesis before birth and name the arrest.',
      explanations: {
        A: 'Starting at puberty is the male schedule. Picked by students who reason from menstruation backwards — but the oocytes were already there, arrested, long before the first period.',
        B: 'The end is right and the beginning is wrong. Oogenesis does continue to the menopause, but it began in intrauterine life, not at birth — and that half-truth is what makes this the strongest distractor of the four.',
        C: 'Ending at puberty would mean a woman had no oocytes left to ovulate. Puberty is where the arrested process resumes, not where it stops.',
        D: 'Correct. Oogenesis begins in intrauterine life, is arrested, and resumes at puberty to continue through the ovarian cycles until the menopause.',
      },
    },
    {
      key: 'sperm-capacitation-is-c6e1d047',
      conceptKey: 'fertilization-site-mechanism-results',
      difficulty: 'Moderate', questionType: 'Developmental process',
      learningObjective: 'Define capacitation by what is removed rather than by what improves.',
      explanations: {
        A: 'Capacitation does not add acrosomal enzymes; the hyaluronidase and acrosin are already in the acrosomal cap when the sperm is made. What changes is access to them.',
        B: 'The sperm does become more active after capacitation, which is why this option is tempting and why one annotated printing of this question is keyed to it. But increased motility is a consequence, not the definition — the definition names what is taken away.',
        C: 'The sperm shed most of their cytoplasm during spermiogenesis, in the testis, long before they reach the female tract.',
        D: 'Correct. Capacitation is the removal, in the female genital tract, of the glycoprotein coat covering the acrosomal region of the sperm head, and it takes about seven hours.',
      },
    },
    {
      key: 'phase-ii-of-fertilization-is-b80be73c',
      conceptKey: 'fertilization-site-mechanism-results',
      difficulty: 'Moderate', questionType: 'Developmental process',
      learningObjective: 'Number the phases of fertilisation from the corona radiata inwards.',
      explanations: {
        A: 'Dispersion of the corona radiata is Phase I. It is one place too early, and it is the answer of a student who has counted capacitation out of the sequence but not renumbered what follows.',
        B: 'Capacitation precedes the numbered phases entirely, and one annotated printing of this question is keyed to it in error. Counting it as Phase I shifts every subsequent phase by one, which is precisely the error this pair of questions is built to detect.',
        C: 'Opening the cell membrane of the oocyte is Phase III, the last of the three.',
        D: 'Correct. Phase II is penetration of the zona pellucida — the acrosomal reaction, in which acrosin and trypsin-like enzymes dissolve a path through it.',
      },
    },
    {
      key: 'phase-iii-of-fertilization-is-36e7d08c',
      conceptKey: 'fertilization-site-mechanism-results',
      difficulty: 'Moderate', questionType: 'Developmental process',
      learningObjective: 'Name the third and last phase of fertilisation.',
      explanations: {
        A: 'Penetration of the corona radiata is Phase I, done by hyaluronidase from the several hundred sperms that reach the ovum.',
        B: 'Capacitation is the preparation that precedes Phase I; it is not numbered among the three phases at all.',
        C: 'Correct. Phase III is the fusion and opening of the cell membranes of sperm and oocyte, letting the sperm nucleus, mitochondrial sheath and axial filament into the cytoplasm.',
        D: 'Penetration of the zona pellucida is Phase II. The two questions on this page differ by one word — II against III — and offer the same four options, so a student who has learnt the phases as an unordered list will get one of the pair wrong whichever way they guess.',
      },
    },
    {
      key: 'cortical-and-zona-reactions-occur-0ce5d45d',
      conceptKey: 'fertilization-site-mechanism-results',
      difficulty: 'Hard', questionType: 'Developmental process',
      learningObjective: 'Time the block to polyspermy against the sperm\'s entry.',
      explanations: {
        A: 'After the corona radiata is passed the sperm still has the zona pellucida ahead of it. Blocking other sperms at this point would be premature — the fertilising sperm has not yet arrived.',
        B: 'During zona penetration is one step too early for the same reason: several sperms may still be in the zona, and the block is not thrown until one of them is inside.',
        C: 'Correct. The cortical granules release their lysosomal enzymes once the sperm has entered the oocyte cytoplasm, and those enzymes alter the zona receptors and harden the zona and cell membrane against any further sperm.',
        D: 'The zygote forms only when the two pronuclei fuse, hours later. If the block waited that long, polyspermy would already have happened.',
      },
    },
    {
      key: 'zona-reaction-76bffc77',
      conceptKey: 'fertilization-site-mechanism-results',
      difficulty: 'Moderate', questionType: 'Developmental process',
      learningObjective: 'Define the zona reaction as the ovum\'s act, not the sperm\'s.',
      explanations: {
        A: 'That is Phase II, the sperm\'s acrosomal reaction. The zona reaction is the ovum\'s answer to it, and the two are easily transposed because both name the zona.',
        B: 'Correct. The zona reaction is the release of lysosomal enzymes from the cortical granules lying beneath the oocyte cell membrane; those enzymes change the sperm receptors of the zona so that no further sperm is attracted or admitted.',
        C: 'It does occur after capacitation, but so does everything else in fertilisation, so this says nothing that identifies it. It is the option one annotated printing of this question is keyed to, and a statement that is true but not defining is the hardest kind of distractor to reject.',
        D: 'Degeneration of the zona pellucida is a later and quite separate event — it happens at the end of the fifth day, in the uterine cavity, so the blastocyst can hatch and implant.',
      },
    },
    {
      key: 'sperm-receptors-are-present-on-28da4ad9',
      conceptKey: 'gamete-morphology-and-the-haploid-nucleus',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Place the sperm receptors on the correct covering of the ovum.',
      explanations: {
        A: 'Correct. The zona pellucida is the glycoprotein coat around the oocyte cell membrane, and it carries the sperm receptors.',
        B: 'The corona radiata is the outermost covering, of follicular cells, and the sperm passes it by dissolving the hyaluronic acid between its cells rather than by binding a receptor. One annotated printing of this question is keyed to it in error.',
        C: 'The oocyte cell membrane is the innermost of the three coverings and is where Phase III happens — fusion, not binding. Binding has already selected one sperm by then.',
        D: 'The nuclear membrane is inside the oocyte altogether. A sperm that reached it would have passed everything the receptors exist to regulate.',
      },
    },
    {
      key: 'movement-of-the-sperm-depends-on-af25b991',
      conceptKey: 'gamete-morphology-and-the-haploid-nucleus',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Pair the part that generates the energy with the part that uses it.',
      explanations: {
        A: 'The acrosomal cap carries hyaluronidase and acrosin, which dissolve a path through the ovum\'s coverings. It contributes nothing to movement — it is chemistry, not propulsion.',
        B: 'Correct. The mitochondrial sheath of the middle piece supplies the energy and the tail, an axial filament, does the beating; movement needs both.',
        C: 'The head carries the nucleus and the acrosome and is the passenger, not the engine. Half of this option is right, which is what makes it the most attractive wrong answer.',
        D: 'Neither the head nor the acrosomal cap has any motile apparatus. This pairs the two parts of the sperm that do the least moving.',
      },
    },
    {
      key: 'one-of-the-following-parts-of-sperm-is-responsible-for-produ-83179832',
      conceptKey: 'gamete-morphology-and-the-haploid-nucleus',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Separate the part that makes the energy from the part that spends it.',
      explanations: {
        A: 'Correct. The mitochondrial sheath wraps the proximal part of the axial filament in the middle piece and is the source of the energy for sperm motility.',
        B: 'The nucleus carries the paternal chromosomes. It is condensed and transcriptionally quiet, and produces no energy at all.',
        C: 'The acrosomal cap is a specialised lysosome holding hyaluronidase and acrosin. It spends energy rather than producing it.',
        D: 'The tail is what the energy is spent on, and it is the answer one annotated printing of this question is keyed to. The distinction the question is testing is exactly this one: the tail moves, the middle piece pays for it.',
      },
    },
    {
      key: 'is-the-outer-cover-of-the-mature-ovum-4feb294f',
      conceptKey: 'gamete-morphology-and-the-haploid-nucleus',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Order the three coverings of the ovum from within outwards.',
      answerOverride: 'C',
      answerOverrideReason:
        'The books print no key for this row. The department book gives the ovum three coverings from inner to outer — cell membrane, zona pellucida, corona radiata — so the outer cover is the corona radiata.',
      explanations: {
        A: 'The zona pellucida is the middle covering, between the cell membrane and the corona radiata. It is the one students name first because it is the one with the sperm receptors, and it is one layer short of the answer.',
        B: 'The cell membrane is the innermost of the three, in contact with the oocyte cytoplasm.',
        C: 'Correct. The corona radiata is the outermost covering, formed of follicular cells stuck to one another by hyaluronic acid — which is why the sperm\'s hyaluronidase is what disperses it.',
        D: 'The nuclear membrane is inside the oocyte and is not one of its coverings at all.',
      },
    },
    {
      key: 'cilia-are-present-in-all-of-the-following-except-fec140f6',
      conceptKey: 'cilium-origin-and-ultrastructure',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Distinguish a flagellum from a cilium by number and length, not by internal structure.',
      explanations: {
        A: 'True, so not the exception. The trachea is lined by ciliated pseudostratified columnar epithelium.',
        B: 'True, so not the exception. The bronchi carry the same ciliated lining, part of the mucociliary escalator.',
        C: 'True, so not the exception. The cilia of the uterine tube help carry the ovum and then the embryo towards the uterus.',
        D: 'The exception, and the answer. The sperm\'s tail is a flagellum, not a cilium. The two are built on the same 9+2 axoneme, which is what makes the option feel wrong to a student who has learnt the ultrastructure — they differ in that a cell has many short cilia and one long flagellum.',
      },
    },
    {
      key: 'flagella-are-present-in-a22c3daa',
      conceptKey: 'cilium-origin-and-ultrastructure',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the one human cell with a flagellum.',
      explanations: {
        A: 'The trachea has cilia — many short ones per cell — not a flagellum.',
        B: 'The bronchi likewise carry cilia. A flagellum would move the cell itself, which is not what a fixed epithelial cell needs.',
        C: 'The uterine tube is ciliated. Its cilia move the contents past a stationary cell, the opposite arrangement to the sperm\'s.',
        D: 'Correct. The sperm is the only human cell with a flagellum, and its single long tail is what propels the cell itself.',
      },
    },
    {
      key: 'sperm-capacitation-is-dep-book-0ba3c1a8',
      conceptKey: 'fertilization-site-mechanism-results',
      difficulty: 'Moderate', questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'An annotated re-printing keyed to B, "increase movement of the tail". Capacitation is the removal of the glycoprotein coat from the acrosomal region, which is option D and which the clean printing at `sperm-capacitation-is-c6e1d047` — asked twice as often — is keyed to. Excluded rather than overridden because the clean twin is live in this file and carries the same four options.',
    },
    {
      key: 'sperm-capacitation-is-1-f7d378de',
      conceptKey: 'fertilization-site-mechanism-results',
      difficulty: 'Moderate', questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A third printing, with no key and scan debris through the stem and three options — "erizymes" for enzymes among them. Live and clean as `sperm-capacitation-is-c6e1d047`.',
    },
    {
      key: 'regarding-formation-of-sperms-dep-book-fc2c067e',
      conceptKey: 'gametogenesis-timing-in-male-and-female',
      difficulty: 'Easy', questionType: 'Developmental timing',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'An annotated re-printing keyed to A, "starts at birth and stopped at old age". The department book states that spermatogenesis starts at puberty, which is option C and which the clean printing at `regarding-formation-of-sperms-470af7b3` is keyed to. The clean twin is live.',
    },
    {
      key: 'regarding-oogenesis-dep-book-y-y-p-a-starts-at-puberty-and-c-e89958d8',
      conceptKey: 'gametogenesis-timing-in-male-and-female',
      difficulty: 'Moderate', questionType: 'Developmental timing',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The stem has swallowed two of its own options — "a- Starts at puberty and continues till age. P Vi b- Starts at birth and continues till menopause" — along with the "(DEP BOOK)" annotation, so half the option list is printed inside the question. Clean and keyed at `regarding-oogenesis-a0c4a0bf`.',
    },
    {
      key: 'regarding-oogenesis-0-i-a-starts-at-puberty-and-continues-ti-cd543b08',
      conceptKey: 'gametogenesis-timing-in-male-and-female',
      difficulty: 'Moderate', questionType: 'Developmental timing',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A third printing whose stem has swallowed option A and whose options carry Arabic marginalia and scan debris; the correct option is mangled to "intra-uterine lifey". No key. Clean at `regarding-oogenesis-a0c4a0bf`.',
    },
    {
      key: 'phase-ii-of-fertilization-is-dep-book-abf72a11',
      conceptKey: 'fertilization-site-mechanism-results',
      difficulty: 'Moderate', questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'An annotated re-printing keyed to B, capacitation — which is not one of the three numbered phases at all. Phase II is penetration of the zona pellucida, option D, which the clean printing at `phase-ii-of-fertilization-is-b80be73c` is keyed to. The clean twin is live.',
    },
    {
      key: 'phase-ii-of-fertilization-is-penetration-of-corona-radiate-215ad7a6',
      conceptKey: 'fertilization-site-mechanism-results',
      difficulty: 'Moderate', questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The stem has swallowed option A, leaving three options and a question that names one of its own answers. Clean and keyed at `phase-ii-of-fertilization-is-b80be73c`.',
    },
    {
      key: 'zona-reaction-dep-book-ac-4236c62e',
      conceptKey: 'fertilization-site-mechanism-results',
      difficulty: 'Moderate', questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'An annotated re-printing keyed to C, "occurs after capacitation of the sperms" — a statement that is true of every event in fertilisation and defines none of them. The zona reaction is the release of lysosomal enzymes from the cortical granules, option B, which the clean printing at `zona-reaction-76bffc77` is keyed to. The clean twin is live.',
    },
    {
      key: 'zona-reaction-a-is-the-sperm-penetration-of-zona-pellucida-94b3aef9',
      conceptKey: 'fertilization-site-mechanism-results',
      difficulty: 'Moderate', questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A third printing whose stem has swallowed option A and carries Arabic marginalia. No key. Clean at `zona-reaction-76bffc77`.',
    },
    {
      key: 'cortical-and-zona-reactions-occur-dep-book-em-ac-p-vi-a-afte-4a6413c9',
      conceptKey: 'fertilization-site-mechanism-results',
      difficulty: 'Hard', questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'An annotated duplicate whose stem has swallowed option A — "(DEP BOOK) em Ac P Vi a- After passage of sperms through corona radiate. ad". Its key agrees with the clean printing for once, so nothing is in dispute; the clean copy at `cortical-and-zona-reactions-occur-0ce5d45d`, asked twice as often, is live.',
    },
    {
      key: 'sperm-receptors-are-present-on-dep-book-p-ad-b2d3772f',
      conceptKey: 'gamete-morphology-and-the-haploid-nucleus',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Two defects. Options B and C both read "Corona radiata" — the cell membrane option has been overwritten, so the question offers the same answer twice — and it is keyed to one of that pair, where the receptors are in fact on the zona pellucida. The clean printing at `sperm-receptors-are-present-on-28da4ad9` has the full four options and the right key, and is live. A rescan would restore option C to "Cell membrane".',
    },
    {
      key: 'one-of-the-following-parts-of-sperm-is-responsible-for-produ-c7ebc15b',
      conceptKey: 'gamete-morphology-and-the-haploid-nucleus',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'An annotated re-printing keyed to D, the tail. The tail consumes the energy; the mitochondrial sheath produces it, which is option A and which the clean printing at `one-of-the-following-parts-of-sperm-is-responsible-for-produ-83179832` is keyed to. The clean twin is live.',
    },
    {
      key: 'one-of-the-following-parts-of-sperm-is-responsible-for-produ-575e69c6',
      conceptKey: 'gamete-morphology-and-the-haploid-nucleus',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A third printing with debris through the stem and all four options — option D reads "Tall , |" — and no key. Clean at `one-of-the-following-parts-of-sperm-is-responsible-for-produ-83179832`.',
    },
    {
      key: 'movement-of-the-sperm-depends-on-dep-book-em-p-vi-a-acrosoma-3d3d95c2',
      conceptKey: 'gamete-morphology-and-the-haploid-nucleus',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'An annotated duplicate whose stem has swallowed option A. Its key agrees with the clean printing at `movement-of-the-sperm-depends-on-af25b991`, which is live.',
    },
    {
      key: 'movement-of-the-sperm-depends-on-i-3451b95c',
      conceptKey: 'gamete-morphology-and-the-haploid-nucleus',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A third printing with scan debris in the stem and in every option, and no key. Clean at `movement-of-the-sperm-depends-on-af25b991`.',
    },
    {
      key: 'which-of-the-following-cells-contains-a-haploid-number-of-ch-cb02845d',
      conceptKey: 'gamete-morphology-and-the-haploid-nucleus',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option B was lost, leaving three. The key, C for the sperm, is right — the gametes are the haploid cells, while the primordial germ cell and the zygote are both diploid — so the question is worth recovering, and a rescan needs only the missing option. The other printing of it, `which-of-the-following-cells-contains-a-haploid-number-of-ch-295dd954`, has lost the same option, so neither copy can supply it.',
    },
    {
      key: 'which-of-the-following-cells-contains-a-haploid-number-of-ch-295dd954',
      conceptKey: 'gamete-morphology-and-the-haploid-nucleus',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The second copy of the haploid-cell question, missing the same option B and carrying no key of its own. Both printings need the page rescanned before either can be sat.',
    },
    {
      key: 'size-of-cerebellum-is-while-ovum-is-866079b2',
      conceptKey: 'gamete-morphology-and-the-haploid-nucleus',
      difficulty: 'Moderate', questionType: 'Normal values',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Two options survived, and neither is right for the ovum: the department book gives the mature ovum a diameter of about 120 µm, and both surviving options pair it with 4. The stem is corrupt as well — "Size of cerebellum" cannot be what a cytology question asked beside the size of an ovum. This row needs the page rescanned before anyone can say what it was asking, and it is the one exclusion in this leaf that is not simply a duplicate.',
    },
    {
      key: 'during-which-stage-of-first-meiotic-division-does-crossing-o-b01c5d2d',
      conceptKey: 'gamete-morphology-and-the-haploid-nucleus',
      difficulty: 'Easy', questionType: 'Developmental process',
      learningObjective: 'Name the stage of the first meiotic division at which homologous chromosomes exchange segments.',
      answerOverride: 'a',
      answerOverrideReason: 'Filed here from the unassigned pile: the stem names no structure any leaf\u2019s vocabulary matched, but crossing-over during the first meiotic division is gametogenesis and belongs to this leaf. The 2020 paper printed no key and the recovered answer sheet does not cover this source. The answer does not come from the department book either \u2014 the book teaches no meiosis at all, and that gap is recorded on this concept. It is set to prophase because crossing-over is by definition an event of prophase I, at the pachytene stage, when the homologous chromosomes are synapsed; the other three stages are each defined by an event that is not it, so only one option is defensible and a faculty reviewer is not needed to say which.',
      explanations: {
        a: 'Correct. Crossing-over happens in prophase of the first meiotic division \u2014 at pachytene, once the homologous chromosomes have paired and each is already split into two chromatids, so that segments can be exchanged between the non-sister chromatids at the chiasmata.',
        b: 'Metaphase I is when the paired chromosomes line up on the equator of the spindle. The pairing that crossing-over needs has already happened by then, and this is the commonest wrong answer because students remember that meiosis pairs chromosomes and metaphase is where pairs are visible in a diagram.',
        c: 'Anaphase I is when the homologous chromosomes are pulled apart to opposite poles \u2014 the separation, not the exchange. It is also the stage at which failure of that separation, non-disjunction, produces gametes with the wrong chromosome number.',
        d: 'Telophase I is the reforming of the nuclei around the two separated sets. By then the chromosomes are no longer in contact at all, so no exchange between them is possible.',
      },
    },
    {
      key: 'numerical-aberrations-of-chromosomes-occur-due-to-fc449570',
      conceptKey: 'gamete-morphology-and-the-haploid-nucleus',
      difficulty: 'Hard', questionType: 'Classification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'No answer can be established from the source this faculty teaches from. The department book contains no cytogenetics whatever \u2014 not euploidy, not aneuploidy, not non-disjunction \u2014 and the four options are all non-standard pairings of a mechanism with a term: non-disjunction paired with euploidy, non-haploid gametes paired with aneuploidy, failure of chromatid duplication in S-phase paired with aneuploidy, and failure of metaphase alignment paired with euploidy. Read against ordinary cytogenetics, non-disjunction causes aneuploidy and a non-haploid gamete causes euploidy, so the first option has the two terms the wrong way round and at least two of the others are arguable depending on which half of the pairing the examiner meant to test. The options are cleanly extracted and a rescan would change nothing; this needs a faculty reviewer, and the underlying gap is recorded on the concept.',
    },
  ],
}
