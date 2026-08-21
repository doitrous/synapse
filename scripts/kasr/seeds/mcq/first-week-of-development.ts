/**
 * `101 ISK > Anatomy > General Embryology > First Week of Development` — the
 * question books' MCQs.
 *
 * Twenty-four rows, twelve of which survive. The books print this chapter's
 * questions two and three times over and annotate them heavily — "(DEP BOOK)",
 * a year in brackets, strings of "Ac ad", and in five rows an option copied into
 * the stem by a reader's pencil. Where a clean printing of a question exists the
 * annotated copies are excluded and named against it; where none exists the
 * annotated copy is kept, because losing the question entirely is worse than a
 * stem with a marginal note in it. `decidua-basalis-dep-book-em-em-em-em-em`,
 * `phase-iii-of-fertilization-is-dep-book-y-y` and `trophoblast-is-the-outer-wall-of-2016-dep-book`
 * are the three live rows in that position: each is the only complete printing
 * of its question, and in each the annotation sits outside the stem's meaning
 * rather than naming an option.
 *
 * Four concepts are reused rather than minted, with label, definition,
 * objective, pitfall, subject, node and modulePath copied verbatim from the
 * batches that already carry them, so re-emitting them is an update that changes
 * nothing but their exam signal: `fertilization-site-mechanism-results`,
 * `implantation-abnormal-sites` and `decidua-definition-parts-fates` from the
 * written papers, and `peroxisome-oxidase-and-catalase` from `cytoplasm.ts` —
 * the last for `all-functions-of-peroxisome-except`, a cytology question the
 * topic clustering filed under this leaf.
 *
 * One recorded gap in a reused concept. Two papers seeded
 * `fertilization-site-mechanism-results`: the 2023 Baqoon paper defined it as
 * the site and the four results, the 2024 paper as capacitation and the three
 * phases. The written batch emits the shorter of the two, so the definition
 * copied here does not spell the phases out even though the key claims them.
 * `phase-iii-of-fertilization-is-dep-book-y-y` still points at that concept,
 * because the ID is the right one and minting a second key for the phases would
 * split a student's mastery in half; the phase teaching is carried in the option
 * explanations instead. Someone reconciling the two paper seeds should widen the
 * definition rather than add a concept.
 *
 * Two answers are overridden against a printed key, both on the same page of the
 * book. `fertilization-occurs-in-the-following-site-of-fallopian-tube` is keyed
 * to the isthmus where the department book says the ampullary part, its lateral
 * third; and the annotated duplicate of `fertilization-occurs-in-the` is keyed to
 * the surface of the ovary, which is an abnormal site of implantation and not a
 * site of fertilisation at all. The second is excluded rather than overridden
 * because a clean printing of it already sits in this file.
 */
import type { McqLeafSeed } from '../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'First Week of Development',
  modulePath: '101 ISK > Anatomy > General Embryology > First Week of Development',
  articleId: 'ART-101-ANA-FERTILIZATION',

  concepts: [
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
      key: 'cleavage-morula-and-migration-to-the-uterine-cavity',
      label: 'Cleavage divides the zygote inside the zona pellucida, giving a 16-cell morula in the tube by the third day',
      definition:
        'After fertilisation the zygote divides mitotically inside the zona pellucida, which holds the daughter cells together as they compact; the cells get smaller at each division rather than the whole growing, and they are called blastomeres. There are 2 blastomeres on the first day, 4 on the second and 8 on the third, and at 16 cells the ball is called the morula, which is formed in the uterine tube within three days of the zygote. The morula has no cavity and its zona pellucida is intact. It is carried to the uterine cavity, which it reaches on the fourth day, by three things together: peristalsis of the muscular wall of the tube, the beating of the tubal cilia, and tubal mucus, which both eases the passage and feeds the embryo. The zona pellucida only begins to degenerate at the end of the fifth day, after the morula has arrived.',
      objective:
        'Give the cell count and the day at which the morula forms, name the structure that bounds the cleaving cells, and say how the embryo reaches the uterine cavity.',
      pitfall:
        'Attaching the blastocyst\'s features to the morula. The cavity, the loss of the zona pellucida and the start of implantation all belong to the next stage, and every "regarding morula" question in these books offers at least two of them as distractors.',
      subject: 'dev',
      primary: 'DIS-EMB-T01',
      secondary: [],
      modulePath: '101 ISK > Anatomy > General Embryology > First Week of Development',
      type: 'developmental_process',
      aliases: ['Cleavage', 'Blastomere', 'Morula', 'Zona pellucida'],
    },
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
  ],

  questions: [
    {
      key: 'fertilization-occurs-in-the-3c862eec',
      conceptKey: 'fertilization-site-mechanism-results',
      difficulty: 'Easy', questionType: 'Developmental process',
      learningObjective: 'Name the organ in which fertilisation takes place.',
      explanations: {
        A: 'Correct. Fertilisation occurs in the uterine (Fallopian) tube — in its ampullary part, the lateral third.',
        B: 'The surface of the ovary is where the oocyte is released, not where it is fertilised. Implantation there is ovarian ectopic pregnancy, an abnormality; one annotated printing of this very question in the books is keyed to this option in error.',
        C: 'The uterine cavity is where the embryo arrives on the fourth day and implants at the end of the first week — four days after fertilisation, not at it.',
        D: 'The pelvic cavity is where an omental or abdominal ectopic pregnancy would implant. Nothing normal happens to the oocyte there.',
      },
    },
    {
      key: 'fertilization-occurs-in-the-following-site-of-fallopian-tube-3ca55e39',
      conceptKey: 'fertilization-site-mechanism-results',
      difficulty: 'Moderate', questionType: 'Developmental process',
      learningObjective: 'Place fertilisation in the correct part of the uterine tube, not merely in the tube.',
      answerOverride: 'C',
      answerOverrideReason:
        'The books key this to the isthmus. The department book states that fertilisation occurs "in the ampullary part of the uterine tube (lateral third)", and the written batch\'s own concept for this, `fertilization-site-mechanism-results`, says the same. The lateral third is the ampulla, so the answer is C. The isthmus is a real place — it is one of the three tubal sites of ectopic implantation the book lists — which is what makes it a plausible key to print by mistake.',
      explanations: {
        A: 'The intramural part is the short segment inside the uterine wall, the narrowest part of the tube. It is a site of ectopic implantation, and the most dangerous one, but the oocyte never gets that far unfertilised.',
        B: 'The isthmus is the narrow medial third, between the intramural part and the ampulla. It is the answer printed in the books and it is wrong: it is a site of tubal ectopic pregnancy, not the site of fertilisation.',
        C: 'Correct. The lateral third of the tube is the ampulla, and the department book puts fertilisation there.',
        D: 'The infundibulum is the funnel with the fimbriae at the ovarian end. It collects the oocyte and passes it on; fertilisation happens just medial to it, in the ampulla.',
      },
    },
    {
      key: 'one-of-the-following-is-a-result-of-fertilization-9602da04',
      conceptKey: 'fertilization-site-mechanism-results',
      difficulty: 'Moderate', questionType: 'Developmental process',
      learningObjective: 'Separate the results of fertilisation from the steps that produce them.',
      explanations: {
        A: 'Correct. Determination of sex is one of the four results the book lists, and it follows from which sperm arrived: an X-bearing sperm gives XX and a Y-bearing sperm XY.',
        B: 'The cortical and zona reaction is a step within fertilisation, not a result of it — it is the block to polyspermy that happens the moment the membranes fuse.',
        C: 'Formation of the male and female pronuclei is likewise a step. The result is what their fusion produces: the zygote nucleus.',
        D: 'The reverse of the truth, and the answer one annotated printing of this question is keyed to. Each gamete nucleus is haploid; fertilisation restores the diploid number of forty-six, which is the third result on the book\'s list.',
      },
    },
    {
      key: 'phase-iii-of-fertilization-is-dep-book-y-y-99a3f883',
      conceptKey: 'fertilization-site-mechanism-results',
      difficulty: 'Hard', questionType: 'Developmental process',
      learningObjective: 'Put the phases of fertilisation in the book\'s order and name the third by number.',
      explanations: {
        A: 'Dispersion of the corona radiata is Phase I, done by the hyaluronidase of the three to five hundred sperms that reach the ovum.',
        B: 'Capacitation comes before the phases are counted at all — it is the seven-hour removal of the glycoprotein coat from the sperm\'s acrosomal region in the female tract. A student who counts it as Phase I lands one number short on every phase that follows, which is exactly what this question is set to catch.',
        C: 'Correct. Phase III is the opening of the cell membrane of the oocyte: the membranes of sperm head and oocyte fuse, and the sperm nucleus, mitochondrial sheath and axial filament pass into the cytoplasm.',
        D: 'Penetration of the zona pellucida is Phase II, the acrosomal reaction, in which acrosin and trypsin-like enzymes dissolve a path through the zona.',
      },
    },
    {
      key: 'regarding-morula-f3f828ce',
      conceptKey: 'cleavage-morula-and-migration-to-the-uterine-cavity',
      difficulty: 'Moderate', questionType: 'Developmental timing',
      learningObjective: 'Date the morula and keep the blastocyst\'s features off it.',
      explanations: {
        A: 'Correct. The morula is the 16-cell stage, formed inside the uterine tube within three days of the zygote — it has not reached the uterus yet.',
        B: 'Backwards. The zona pellucida is still intact around the morula and only begins to degenerate at the end of the fifth day, after the morula has reached the uterine cavity.',
        C: 'A cavity is what makes a blastocyst a blastocyst. The morula is a solid ball, which is what its name — mulberry — describes.',
        D: 'Implantation is started by the blastocyst, at the end of the first week and by its embryonic pole. The morula is two to three days too early and has no trophoblast yet.',
      },
    },
    {
      key: 'which-structure-bounds-cells-after-fertilization-as-they-com-bf1a56b0',
      conceptKey: 'cleavage-morula-and-migration-to-the-uterine-cavity',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Name what holds the blastomeres together during cleavage.',
      explanations: {
        A: 'Correct. Cleavage happens inside the zona pellucida, which is why the blastomeres get smaller instead of the whole embryo getting bigger, and why they compact rather than scatter.',
        B: 'The corona radiata is the outer layer of follicular cells, and it is dispersed in Phase I of fertilisation — it is gone before the first cleavage division.',
        C: 'A pronucleus is one of the two haploid nuclei that fuse to make the zygote nucleus. It is inside a single cell and bounds nothing.',
        D: 'The inner cell mass is a group of cells within the blastocyst, two stages later. It is bounded by the trophoblast rather than bounding anything itself.',
      },
    },
    {
      key: 'one-of-the-following-is-true-about-blastocyst-19c0027c',
      conceptKey: 'blastocyst-structure-poles-and-the-start-of-implantation',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Name the parts of the blastocyst and reject the morula\'s properties.',
      explanations: {
        A: 'The blastocyst is defined by its cavity, the blastocele. It is the morula that has none.',
        B: 'It implants by its embryonic pole, the trophoblast lying over the inner cell mass. The abembryonic pole is the far side and goes in last — this is the commonest error in the whole chapter, and the books ask it both ways round.',
        C: 'Three days after the zygote gives the morula, not the blastocyst; the blastocyst is complete at the end of the sixth day.',
        D: 'Correct. Embryoblast is the other name for the inner cell mass, as trophoblast is for the outer.',
      },
    },
    {
      key: 'concerning-the-blastocyst-select-the-false-answer-2023-em-em-16251f11',
      conceptKey: 'blastocyst-structure-poles-and-the-start-of-implantation',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Place the inner cell mass at the embryonic pole and nowhere else.',
      explanations: {
        A: 'True, so not the false one. Blastocele is the name of the blastocyst\'s cavity.',
        B: 'True, so not the false one. The wall is one cell thick and is the outer cell mass, the trophoblast.',
        C: 'The false statement, and the answer. The inner cell mass lies at the embryonic pole — the pole is named after it, so the two cannot be on opposite sides. A student picks this as true by remembering that one pole is called abembryonic and pairing it with the wrong structure.',
        D: 'True, so not the false one. Normal implantation is into the posterior wall of the fundus of the uterus.',
      },
    },
    {
      key: 'trophoblast-is-the-outer-wall-of-2016-dep-book-ac-ad-ac-ad-a-a6761d06',
      conceptKey: 'blastocyst-structure-poles-and-the-start-of-implantation',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Attach the trophoblast to the stage that actually has one.',
      explanations: {
        A: 'The morula is a solid ball of blastomeres with no wall and no cavity, so it has no trophoblast to be the outer layer of. The trophoblast appears only when the blastocele opens up inside it.',
        B: 'Correct. The trophoblast is the single-layered outer cell mass forming the wall of the blastocyst.',
        C: 'The chorionic vesicle is a later structure — the conceptus once the chorion has formed — and its wall is chorion, which is trophoblast plus extra-embryonic mesoderm, not trophoblast alone.',
        D: 'The placenta is later still, and it is built from chorionic villi and decidua basalis together. Trophoblast contributes to it, but the placenta is not a vesicle with a trophoblast wall.',
      },
    },
    {
      key: 'placenta-previa-cd7c31ec',
      conceptKey: 'implantation-abnormal-sites',
      difficulty: 'Easy', questionType: 'Clinical application',
      learningObjective: 'Separate the one abnormal intrauterine site from the ectopic ones.',
      explanations: {
        A: 'Correct. Placenta previa is implantation in the lower uterine segment, so that the placenta comes to lie over or near the internal os.',
        B: 'Implantation in the uterine tube is tubal ectopic pregnancy — the commonest ectopic site, and the one that ruptures. It is chosen by students who read "abnormal site" as meaning "outside the uterus".',
        C: 'Implantation on the surface of the ovary is ovarian ectopic pregnancy, another site outside the uterine cavity.',
        D: 'Implantation on the peritoneum is abdominal or omental ectopic pregnancy. Like B and C it is outside the uterus, whereas previa is inside it and merely too low.',
      },
    },
    {
      key: 'decidua-basalis-dep-book-em-em-em-em-em-be67d606',
      conceptKey: 'decidua-definition-parts-fates',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Define decidua basalis by what lies on either side of it.',
      explanations: {
        A: 'The lower uterine segment is where placenta previa implants. The decidua is named by its relation to the conceptus, not by which part of the uterus it is in.',
        B: 'The covering over the implanted conceptus is decidua capsularis. This is the classic swap, and it is the option that catches most students: basalis is beneath, capsularis is over.',
        C: 'Correct. Decidua basalis is the endometrium between the implanted blastocyst and the myometrium, and it becomes the maternal part of the placenta.',
        D: 'The endometrium lining the rest of the uterine cavity, away from the conceptus, is decidua parietalis. It fuses with the capsularis at about the fourth month.',
      },
    },
    {
      key: 'all-functions-of-peroxisome-except-60e99c30',
      conceptKey: 'peroxisome-oxidase-and-catalase',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Keep the lysosome\'s work out of the peroxisome.',
      explanations: {
        A: 'True, so not the exception. Beta-oxidation of long-chain fatty acids is what the peroxisomal oxidases do.',
        B: 'True, so not the exception. Peroxisomal beta-oxidation releases its energy as heat instead of trapping it as ATP, which is what distinguishes it from the mitochondrial version.',
        C: 'True, so not the exception. Catalase splits the hydrogen peroxide the oxidases generate into water and oxygen.',
        D: 'The exception, and the answer. Digesting nutrients is the lysosome\'s work, and the acrosome — a specialised lysosome — is what acts in fertilisation. Both belong to the hydrolase-carrying organelle, not to the one that carries oxidases and catalase.',
        E: 'True, so not the exception. Peroxisomes are abundant in liver cells, where their oxidases detoxify — about half the ethanol a person drinks is dealt with here.',
      },
    },
    {
      key: 'fertilization-occurs-in-the-dep-book-ac-em-aa024d11',
      conceptKey: 'fertilization-site-mechanism-results',
      difficulty: 'Easy', questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'An annotated duplicate — the stem carries "(DEP BOOK) Ac em" — and its key is wrong twice over: it is keyed to the surface of the ovary, which is a site of ectopic implantation and not of fertilisation, while the clean printing of the same four options at `fertilization-occurs-in-the-3c862eec` is keyed to the Fallopian tube and asked twice as often. Excluded rather than overridden because the clean copy is already live in this file.',
    },
    {
      key: 'one-of-the-following-is-a-result-of-fertilization-dep-book-a-2466247f',
      conceptKey: 'fertilization-site-mechanism-results',
      difficulty: 'Moderate', questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A corrupted printing of `one-of-the-following-is-a-result-of-fertilization-9602da04`: the stem is annotated, option C has been replaced by "It contains a cavity", which belongs to the morula question on the same page, and the key points at the option stating that the zygote nucleus is haploid — which is the opposite of the truth, since fertilisation restores the diploid number. Both the option set and the key are damaged; the clean printing is live in this file.',
    },
    {
      key: 'one-of-the-following-is-true-about-blastocyst-dep-book-8d32e819',
      conceptKey: 'blastocyst-structure-poles-and-the-start-of-implantation',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A "(DEP BOOK)"-annotated duplicate of `one-of-the-following-is-true-about-blastocyst-19c0027c`, with the same four options and no key of its own. Nothing is lost by excluding it; the clean printing carries the same teaching.',
    },
    {
      key: 'phase-111-of-fertilization-is-0-9e236105',
      conceptKey: 'fertilization-site-mechanism-results',
      difficulty: 'Hard', questionType: 'Developmental process',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The worse of two printings. The Roman numeral has been read as "Phase 111" and a stray "0" appended to the stem, and two options carry trailing scan debris. Its twin at `phase-iii-of-fertilization-is-dep-book-y-y-99a3f883` has the numeral intact, clean options and a key, and is live in this file. A rescan would recover this copy, but there is no need.',
    },
    {
      key: 'placenta-previa-dep-book-2024-ac-ad-ac-ad-ad-ad-57fa6cb2',
      conceptKey: 'implantation-abnormal-sites',
      difficulty: 'Easy', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The second of three printings of the placenta previa question, its stem carrying "(DEP BOOK - 2024) Ac ad Ac ad ad ad". Same options and same key as the clean printing at `placenta-previa-cd7c31ec`, which is live.',
    },
    {
      key: 'placenta-previa-i-90fb5023',
      conceptKey: 'implantation-abnormal-sites',
      difficulty: 'Easy', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The third printing of the placenta previa question, with scan debris in the stem and in three of the four options and no key. Live as `placenta-previa-cd7c31ec`.',
    },
    {
      key: 'decidua-basalis-a4f9cff3',
      conceptKey: 'decidua-definition-parts-fates',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The correct option is cut off mid-sentence: C reads "It is the part of endometrium between the implanted blastocyst and" and stops, so a student cannot tell whether it ends in myometrium or in something else. Option D has been replaced by "10\'\' day of pregnancy", debris from a neighbouring question. The complete printing is `decidua-basalis-dep-book-em-em-em-em-em-be67d606`, which is live in this file despite its own annotation, because it is the only copy with a whole option set.',
    },
    {
      key: 'morula-is-2022-vi-y-ad-ac-a-2-cell-s-stage-c7ed442b',
      conceptKey: 'cleavage-morula-and-migration-to-the-uterine-cavity',
      difficulty: 'Easy', questionType: 'Normal values',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option A has been copied into the stem by a reader — "Morula is: (2022) Vi y ad Ac a- 2 cell\'s stage" — and option B was lost, leaving three. The answer is the 16-cell stage, which survives as option D. Recoverable by rescanning: the intended set is 2, 4, 8 and 16 cells, and only the 16-cell option is the morula.',
    },
    {
      key: 'trophoblast-is-the-outer-wall-of-the-2017-ad-ac-a-morula-y-a-252a3cc2',
      conceptKey: 'blastocyst-structure-poles-and-the-start-of-implantation',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A duplicate whose stem has swallowed option A — "Trophoblast is the outer wall of the: (2017) ad Ac a- Morula y Ac" — so the question names one of its own answers before asking. The 2016 printing at `trophoblast-is-the-outer-wall-of-2016-dep-book-ac-ad-ac-ad-a-a6761d06` has an intact stem and a key, and is live.',
    },
    {
      key: 'concerning-the-implantation-process-5-23c3aee8',
      conceptKey: 'blastocyst-structure-poles-and-the-start-of-implantation',
      difficulty: 'Moderate', questionType: 'Developmental timing',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three options survived and one of them is not an answer to this stem: option E reads "Scaphoid", which has bled in from an upper-limb question on the facing page. Option A is mangled — "The blastocyst begins implantation at the boginning of 3° week" — and no correct option survives at all, since implantation begins at the end of the first week. A rescan is needed for the whole option block.',
    },
    {
      key: 'regarding-implantation-choose-the-correct-statement-ac7fb811',
      conceptKey: 'blastocyst-structure-poles-and-the-start-of-implantation',
      difficulty: 'Moderate', questionType: 'Developmental timing',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Only two options survived, A and D, and both are false — implantation begins at the end of the first week rather than the third, and it is the blastocyst rather than the morula that starts it. A two-option question with no correct answer among them cannot be sat. This is the same question as `concerning-the-implantation-process-5-23c3aee8` and the two damaged copies between them do not make one whole one; the page needs rescanning.',
    },
    {
      key: 'regarding-monozygotic-twin-a-is-the-commonest-type-94e46145',
      conceptKey: 'blastocyst-structure-poles-and-the-start-of-implantation',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option A has been copied into the stem, which then reads "Regarding monozygotic twin \'a- Is the commonest type" — and it points at a false statement, since dizygotic twinning is the commoner. The four options themselves are intact and the answer is B, that monozygotic twins are always of the same sex, since they come from one zygote. It is the only twinning question in this leaf, so excluding it leaves the topic untested here; a rescan of the stem alone recovers it, and the concept it needs would be a twinning concept this leaf has no other question for.',
    },
  ],
}
