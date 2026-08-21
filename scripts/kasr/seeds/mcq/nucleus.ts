/**
 * `101 ISK > Histology > Cytology > Nucleus` — the question books' MCQs.
 *
 * Seventy-one rows carry this leaf. Seventy are authored here; one,
 * `cytoplasmic-basophilia-observed-in-lm-is-due-to`, is authored in
 * `cytoplasm.ts`, because its answer is the ribosome and its concept lives
 * there — the same duplicate-concept-id rule set out in `the-cell.ts` applies.
 *
 * A third of this leaf is not about the nucleus in any strict sense. The
 * extractor filed here every question whose option list mentions a nucleus, so
 * granulocytes, adipocytes, reticular cells, goblet cells, epithelia and the two
 * gametes all arrive with it. Most of them are genuinely answered from the
 * nucleus — the books really do ask you to name a cell from its nuclear shape,
 * and the department book's own chapter lists nuclear position, shape and
 * number for exactly that purpose — so `nucleus-shape-position-and-number-identify-the-cell`
 * is not a bin, it is the objective those questions test. Four adipocyte rows sit
 * least comfortably under it and are noted on the concept.
 *
 * Eighteen answers are overridden and every one is recorded: twelve where the
 * books printed no key, and six where they printed one I believe is wrong.
 * Three of the six matter more than the rest:
 *
 *   - `pars-amorpha-of-the-nucleus` and `pars-fibrosa-of-the-nucleus` are both
 *     keyed B in the same book, and B cannot be right for both. The same book
 *     keys the `-of-the-nucleolus` copies of the same two questions correctly,
 *     which is what makes the slip visible: one column of a key has shifted.
 *   - `concerning-heterochromatin-all-of-the-followings-are-true-except` is
 *     keyed B, "coiled filaments", which is heterochromatin's definition. The
 *     exception is C.
 *   - `regarding-the-ovum` is keyed C, but the department book states that
 *     female gametogenesis begins in intrauterine life, and states in its own
 *     words that the corona radiata is the outer cover — option D. *
 * `scripts/kasr/extract/mcq-bank.json` was regenerated part-way through this
 * pass: an option-repair run recovered 76 options across 69 rows that a
 * publisher watermark had split. Every row in this file was re-checked against
 * the rebuilt bank afterwards, and the exclusions that the repair made obsolete
 * were rewritten as live questions. If the bank is repaired again, the
 * exclusions are the part of this file to re-read.
 */
import type { McqLeafSeed } from '../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Nucleus',
  modulePath: '101 ISK > Histology > Cytology > Nucleus',
  articleId: 'ART-101-HIS-NUCLEUS',

  concepts: [
    {
      key: 'nuclear-envelope-and-nuclear-pore-complex',
      label: 'The nuclear envelope is two membranes with a perinuclear space, pierced by pore complexes of nucleoporin',
      definition:
        'The nuclear envelope is a double-walled membrane of two parallel unit membranes separated by a perinuclear space and interrupted at intervals by nuclear pores. The outer membrane is rough — granular, studded with polyribosomes — and is continuous with the cisternae of the rough endoplasmic reticulum. The inner membrane is fibrillar, with peripheral chromatin attached to it and the nuclear lamina, made mainly of lamins, lying against it. A nuclear pore is a circular opening where the inner and outer membranes become continuous with one another; the nuclear pore complex is the non-membranous cylindrical assembly of about thirty nucleoporin proteins that fills it as an octagonal ring, with filaments extending into cytoplasm and nucleus. It imports protein into the nucleus and exports RNA and ribosomal subunits out of it through a central transporter protein. The envelope is basophilic like the rest of the nucleus, and it is resolved only by electron microscopy.',
      objective:
        'Describe the two membranes of the nuclear envelope and what distinguishes them, and say what the nuclear pore complex is made of and what it moves in each direction.',
      pitfall:
        'Treating the nuclear pore and the nuclear pore complex as the same thing. The pore is the hole where the two membranes fuse; the complex is the protein machine sitting in it, and the questions in these books turn on that difference.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Cytology > Nucleus',
      type: 'structural_description',
      aliases: ['Nuclear membrane', 'Nucleoporin', 'Perinuclear space', 'Nuclear lamina'],
    },
    {
      key: 'euchromatin-versus-heterochromatin',
      label: 'Euchromatin is extended and active and makes a nucleus vesicular; heterochromatin is coiled and inactive and makes it condensed',
      definition:
        'Chromatin is chromosomal material in the uncoiled state in the non-dividing nucleus, formed of nucleoproteins — double-stranded DNA with histone and non-histone protein — and it is basophilic because of the phosphate groups of its nucleic acid. It takes two forms. Euchromatin is extended, uncoiled chromatin carrying active genes; it predominates in metabolically active, protein-forming cells such as the nerve cell and the liver cell, appears as fine threads giving a pale basophilic vesicular nucleus with a clear nucleolus, and is electron lucent. Heterochromatin is coiled, inactive chromatin carrying inactive genes; it predominates in metabolically inactive cells such as the small lymphocyte, appears as coarse dark basophilic clumps giving a condensed nucleus with an unclear nucleolus, and is electron dense. Heterochromatin lies in three places: peripheral chromatin attached to the inner surface of the nuclear membrane, chromatin islands scattered in the nuclear sap, and nucleolus-associated chromatin condensed around the nucleolus.',
      objective:
        'Contrast euchromatin and heterochromatin by coiling, gene activity, light- and electron-microscopic appearance and the kind of cell each predominates in, and name the three sites of heterochromatin.',
      pitfall:
        'Reading "hetero-" as "the varied one" and so as the active one. It is the opposite: heterochromatin is coiled, dense and silent, and euchromatin — the true or proper chromatin — is the working form.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Cytology > Nucleus',
      type: 'structure_function_relationship',
      aliases: ['Vesicular nucleus', 'Condensed nucleus', 'Peripheral chromatin', 'Chromatin islands'],
      uncertainty:
        'One book asks which granulocyte shows most euchromatin and which most heterochromatin, keying the eosinophil and basophil for the first and the neutrophil for the second. All three granulocyte nuclei are substantially condensed, and no statement in the department book ranks them. The pair is authored to the book\'s own keys and this note records that the ranking is the book\'s, not the chapter\'s.',
    },
    {
      key: 'nucleolus-parts-and-ribosome-formation',
      label: 'The nucleolus is an unbounded basophilic mass whose three dark parts are the rRNA gene, the new rRNA and the mature rRNA',
      definition:
        'The nucleolus is a rounded, deeply basophilic mass rich in nucleic acid, surrounded by chromatin, usually one or two per nucleus, and it is not limited by any membrane. By electron microscopy it is spongy, with dark areas and light areas. The dark areas are three: the pars amorpha, or nucleolar organiser, which is the part of the chromosomes carrying the DNA that encodes rRNA; the pars fibrosa, strands of newly synthesised rRNA; and the pars granulosa, granules of mature rRNA. Pars fibrosa and pars granulosa together are called the nucleolonema. The light areas are nucleolar sap. The nucleolus forms ribosomal RNA and assembles the ribosomal subunits, which then pass out through the nuclear pores to the cytoplasm; a large nucleolus therefore means a cell making a great deal of protein, and the department book notes that large nucleoli are found in rapidly growing malignant cells.',
      objective:
        'Name the three dark parts of the nucleolus and say what each represents, and explain what the nucleolus produces.',
      pitfall:
        'Confusing pars amorpha with pars fibrosa. Amorpha is DNA — the gene for rRNA — and fibrosa is the new RNA transcribed from it; the sequence runs amorpha to fibrosa to granulosa, gene to new transcript to finished product.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Cytology > Nucleus',
      type: 'structure_function_relationship',
      aliases: ['Pars amorpha', 'Pars fibrosa', 'Pars granulosa', 'Nucleolonema', 'Nucleolar organizer'],
    },
    {
      key: 'nucleus-parts-and-functions-including-nuclear-sap',
      label: 'The nucleus is envelope, chromatin, nucleolus and nuclear sap, and it is the largest component of every true cell',
      definition:
        'The nucleus is the largest component of the cell, and the department book states that the red blood corpuscle and the platelet, which lack one, are not true cells. It is made of four things: the nuclear membrane or envelope, the chromatin material, the nucleolus, and the nuclear sap — a colloidal solution filling the space between the chromatin and the nucleolus, formed of nucleoproteins, enzymes, sugars and calcium, potassium and phosphorus ions, which provides the medium through which RNA is carried to the nuclear pores. The nucleus carries all the genetic information and hereditary factors, controls every cell function including protein synthesis, is responsible for the formation of RNA, and directs cell division.',
      objective:
        'Name the four structural parts of the nucleus, say what the nuclear sap is and does, and list the functions of the nucleus.',
      pitfall:
        'Answering "nucleolus" when the question asks for the largest component of the cell. The nucleolus is a body inside the nucleus, and the nucleus is what a red cell is missing.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Cytology > Nucleus',
      type: 'structural_description',
      aliases: ['Nuclear sap', 'Karyoplasm'],
    },
    {
      key: 'nucleus-shape-position-and-number-identify-the-cell',
      label: 'A cell is named from the number, position, shape and staining of its nucleus',
      definition:
        'Most cells have one nucleus; the liver cell has two; the osteoclast and skeletal muscle have many. The nucleus may be central, basal, peripheral or eccentric in position, and flat, rounded, oval, bilobed, segmented or multilobed, or kidney-shaped in outline. The books use a fixed set of examples: the neutrophil has a multilobed segmented nucleus, the eosinophil a bilobed horse-shoe nucleus, the basophil an irregular S-shaped one, the monocyte a large kidney-shaped one, the large lymphocyte a large indented nucleus with a visible nucleolus and the small lymphocyte a dark round one, the megakaryocyte a single large multilobed dark nucleus, the plasma cell a cartwheel nucleus set eccentrically beside a pale Golgi area, and the unilocular fat cell a flattened nucleus pushed to the periphery by its single droplet. Nuclear level is used the same way: crowded columnar cells whose nuclei lie at more than one level are pseudostratified, not stratified.',
      objective:
        'Name a cell from the number, position and shape of its nucleus, and use nuclear level to tell pseudostratified from stratified epithelium.',
      pitfall:
        'Reading "segmented" and "lobed" as interchangeable across the granulocytes. Two to five joined segments is the neutrophil, two lobes in a horse-shoe is the eosinophil, and an irregular S obscured by granules is the basophil — the books ask all three from the same option list.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Cytology > Nucleus',
      type: 'classification',
      aliases: ['Nuclear shape', 'Nuclear position', 'Multinucleated cell'],
      gaps: [
        'Four adipocyte rows were filed under this leaf and are authored against this concept because the flattened peripheral nucleus of the unilocular cell is one of the options in each. Their fuller concept, `white-versus-brown-adipose-connective-tissue`, is already minted in `types-of-connective-tissue-proper.ts`; it could not be reused here without emitting a duplicate concept id, so the adipose facts are taught in the option explanations instead. The same applies to two granulocyte rows whose concepts live in `granular-leukocytes.ts`.',
      ],
    },
    {
      key: 'chromosomal-abnormalities-and-the-syndromes-they-cause',
      label: 'Named syndromes follow from a specific extra chromosome, missing sex chromosome or deleted arm',
      definition:
        'The department book teaches that chromosomal alterations are associated with tumours and with genetic diseases, and its question books examine four by name. Down syndrome is trisomy 21 — an extra chromosome 21. Turner syndrome affects females and has an XO sex chromosome constitution, so the somatic cells hold 45 chromosomes and the genital system is underdeveloped. Klinefelter syndrome affects males and is XXY, so the somatic cells hold 47 chromosomes. Cri-du-chat syndrome is a partial deletion of the short arm of chromosome 5.',
      objective:
        'Give the chromosomal fault behind Down, Turner, Klinefelter and cri-du-chat syndromes, and say which sex each affects.',
      pitfall:
        'Giving 47 chromosomes to Turner syndrome. An extra chromosome makes 47 and belongs to Down and Klinefelter; Turner is a chromosome short, at 45, and the books set the two side by side with the same four options to catch exactly this.',
      subject: 'fnd',
      primary: 'DIS-HIS-T01',
      secondary: [],
      modulePath: '101 ISK > Histology > Cytology > Nucleus',
      type: 'clinical_correlation',
      aliases: ['Down syndrome', 'Turner syndrome', 'Klinefelter syndrome', 'Cri-du-chat syndrome', 'Trisomy 21'],
    },
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
    },
  ],

  questions: [
    {
      key: 'concerning-euchromatin-81772576',
      conceptKey: 'euchromatin-versus-heterochromatin',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Connect euchromatin to the pale vesicular nucleus it produces.',
      explanations: {
        A: 'Coiled chromatin is heterochromatin. Euchromatin is the extended, uncoiled form — the whole distinction is in the coiling.',
        B: 'Condensed masses are heterochromatin: peripheral chromatin, chromatin islands and the ring around the nucleolus. Euchromatin is too dispersed to appear as a mass.',
        C: 'Half right and therefore dangerous. Euchromatin does direct protein synthesis, but by carrying *active* genes; inactive genes direct nothing, and the word "inactive" is what makes this option false.',
        D: 'Correct. Fine, dispersed euchromatin takes up little stain, so the nucleus reads pale and open — vesicular — with a clear nucleolus, and that appearance is the sign of an active cell.',
      },
    },
    {
      key: 'only-one-statement-is-correct-about-small-lymphocytes-d50594e3',
      conceptKey: 'euchromatin-versus-heterochromatin',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Recognise the small lymphocyte as the department book\'s type example of an inactive, heterochromatic cell.',
      explanations: {
        A: 'The small lymphocyte has a thin rim of cytoplasm, barely more than a blue line around the nucleus. Abundant cytoplasm belongs to the monocyte.',
        B: 'An indented nucleus with a visible nucleolus is the *large* lymphocyte. The small one has a round, dark, condensed nucleus and no nucleolus you can see — it is the book\'s own example of a heterochromatic nucleus.',
        C: 'Organelles are scanty in the small lymphocyte, which follows from the same fact: a cell whose chromatin is coiled and silent is not synthesising much and does not need the machinery.',
        D: 'Correct. Most lymphocytes in circulating blood are small lymphocytes, and it is the only statement in the set that is true of them.',
      },
    },
    {
      key: 'pars-fibrosa-of-the-nucleolus-fd5fcfbb',
      conceptKey: 'nucleolus-parts-and-ribosome-formation',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Place pars fibrosa at the new-transcript stage of the nucleolar sequence.',
      explanations: {
        A: 'Correct. Pars fibrosa is strands of newly synthesised rRNA — fibres because a new transcript is still a thread rather than a packed particle.',
        B: 'Mature rRNA is pars granulosa, granules. The names carry the difference: a fibre is being made, a granule is finished.',
        C: 'The DNA encoding rRNA is pars amorpha, the nucleolar organiser. It is the template, one step earlier than the fibres.',
        D: 'Light areas are nucleolar sap and are not one of the three dark parts at all. The option also says "nuclear sap" rather than nucleolar, which is a second reason it cannot be right.',
      },
    },
    {
      key: 'pars-granulosa-of-the-nucleolus-cd78b1de',
      conceptKey: 'nucleolus-parts-and-ribosome-formation',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Place pars granulosa at the finished-product stage of the nucleolar sequence.',
      explanations: {
        A: 'Newly formed rRNA is pars fibrosa. This is the option immediately before the answer in the sequence, which is where the mark is usually lost.',
        B: 'Correct. Pars granulosa is granules of mature rRNA, the last of the three dark parts and the material that leaves through the nuclear pores as ribosomal subunits.',
        C: 'The chromosomes encoding rRNA are pars amorpha, the nucleolar organiser.',
        D: 'Light areas of nucleolar sap are not part of the dark areas and represent no stage of rRNA at all.',
      },
    },
    {
      key: 'regarding-turner-syndrome-c6d49418',
      conceptKey: 'chromosomal-abnormalities-and-the-syndromes-they-cause',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Give the sex chromosome constitution of Turner syndrome.',
      explanations: {
        A: 'Turner syndrome occurs in females. It is Klinefelter syndrome that occurs only in males, and this book asks the two questions with the same four options.',
        B: '47 chromosomes means one too many, which is Down syndrome or Klinefelter. Turner is one short, at 45.',
        C: 'Correct. A single X and no second sex chromosome — XO — which is why the count is 45.',
        D: 'The genital system is underdeveloped in Turner syndrome; a normal genital system would leave nothing to diagnose.',
      },
    },
    {
      key: 'about-neutrophil-all-true-except-4b70ef71',
      conceptKey: 'nucleus-shape-position-and-number-identify-the-cell',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Recall that the neutrophil is the commonest leucocyte but not the largest.',
      explanations: {
        A: 'True, so not the exception. The neutrophil nucleus is segmented into lobes joined by thin chromatin threads — the reason the cell is also called polymorphonuclear.',
        B: 'True, so not the exception. 60–70% of the differential count makes it the commonest white cell.',
        C: 'The exception, and the answer. Commonest is not largest: the monocyte is the largest leucocyte, and this option is chosen by students who conflate the two superlatives.',
        D: 'True, so not the exception. The neutrophil is the first line of non-specific defence and is actively phagocytic.',
      },
    },
    {
      key: 'all-of-the-following-about-nuclear-envelope-are-true-except-5df6633b',
      conceptKey: 'nuclear-envelope-and-nuclear-pore-complex',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Recognise that everything nuclear is basophilic.',
      explanations: {
        A: 'The exception, and the answer. The nucleus and its envelope are basophilic, from the phosphate groups of the nucleic acid. Acidophilia belongs to cytoplasm rich in smooth endoplasmic reticulum or in mitochondria.',
        B: 'True, so not the exception. The envelope is interrupted at intervals by nuclear pores.',
        C: 'True, so not the exception. It is a double-walled membrane, two parallel unit membranes.',
        D: 'True, so not the exception. The perinuclear space separates the two, and it is continuous with the lumen of the rough endoplasmic reticulum.',
      },
    },
    {
      key: 'chromatin-a7a41633',
      conceptKey: 'euchromatin-versus-heterochromatin',
      difficulty: 'Moderate', questionType: 'Stains and techniques',
      learningObjective: 'Explain why chromatin stains with the basic dye.',
      explanations: {
        A: 'Correct. The phosphate groups of the nucleic acid are acidic, so they bind the basic dye — that is what basophilia means, and it is why the whole nucleus is blue in H&E.',
        B: 'Acidophilia would mean binding the acid dye, eosin. DNA is the reason chromatin is basophilic, so this option gets both halves the wrong way round.',
        C: 'Protein is present in chromatin, as histone and non-histone protein, but protein is not what makes it basophilic. The nucleic acid is.',
        D: 'Wrong on the staining and wrong on the reason, and in the set to catch a student who is guessing on the second half of the sentence.',
      },
    },
    {
      key: 'chromatin-islands-are-ed4bf13d',
      conceptKey: 'euchromatin-versus-heterochromatin',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Three lettered options survived and option C carries two of them — "Condensed around nucleolus" and a fourth option that begins "Fine granules scattered in cytoplasm" — run together behind an Arabic list marker the extractor could not read as a letter. A student cannot pick a letter that holds two answers. Splitting C at rescan restores a sound four-option question whose answer is the clumps scattered in the nuclear sap.',
    },
    {
      key: 'clumps-of-nucleoprotein-concentrated-near-the-periphery-of-t-699f135d',
      conceptKey: 'euchromatin-versus-heterochromatin',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the chromatin attached to the inner nuclear membrane.',
      answerOverride: 'C',
      answerOverrideReason:
        'The source printed no key. Peripheral chromatin is one of the three sites of heterochromatin the department book names, so C is the only option the description fits.',
      explanations: {
        A: 'The nuclear pore complex is protein — nucleoporin — not nucleoprotein clumps, and it fills the pores rather than lying against the membrane between them.',
        B: 'The nucleolus is a single rounded mass, usually one or two per nucleus, and it sits within the nucleus rather than around its rim.',
        C: 'Correct. Peripheral chromatin — heterochromatin attached to the inner surface of the nuclear membrane — is the first of the three sites of heterochromatin.',
        D: 'Euchromatin is dispersed and pale and forms no clumps anywhere. It is chosen by students who remember that something is attached at the periphery but not which form.',
      },
    },
    {
      key: 'colloid-solution-fills-space-between-chromatin-and-nucleolus-2307a8d4',
      conceptKey: 'nucleus-parts-and-functions-including-nuclear-sap',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option C reads "nuclear sap d.chromatin" — options C and D have run together on one line, so the correct answer and a distractor share a letter. Three lettered options remain and the contract is four to five. The question is sound and its answer is the nuclear sap; separating C from D at rescan is the whole repair.',
    },
    {
      key: 'concerning-heterochromatin-all-of-the-followings-are-true-ex-856fe4ab',
      conceptKey: 'euchromatin-versus-heterochromatin',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Recognise extended filaments as euchromatin, not heterochromatin.',
      answerOverride: 'C',
      answerOverrideReason:
        'The book keys B, "present in the form of coiled filaments", which is the definition of heterochromatin and cannot be the exception. C, "present in the form of extended filaments", describes euchromatin and is the only false statement in the set. B and C are the same sentence with the coiling reversed, which is the shape a one-letter key slip takes.',
      explanations: {
        A: 'True, so not the exception. Heterochromatin is the inactive form of chromatin.',
        B: 'True, so not the exception. Coiled is precisely what heterochromatin is, and it is the reason it is dense and silent. This is the option the book keys, and taking it would mean calling heterochromatin\'s own definition false.',
        C: 'The exception, and the answer. Extended, uncoiled filaments are euchromatin. B and C are the two halves of one contrast and only one of them can be true of this form.',
        D: 'True, so not the exception. Coiled chromatin scatters electrons, so it is electron dense.',
      },
    },
    {
      key: 'concerning-multilocular-adipocytes-they-have-f0c9ace9',
      conceptKey: 'nucleus-shape-position-and-number-identify-the-cell',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Separate the multilocular from the unilocular fat cell by nucleus, droplets and pigment.',
      answerOverride: 'A',
      answerOverrideReason:
        'The source printed no key. B, C and D are all features of the unilocular cell; the cytochrome pigment of the many mitochondria is what makes brown fat brown, and it is the only option that belongs to the multilocular cell. The paired question `concerning-unilocular-adipocytes-they-have-all-of-the-follow-88d2b6b6` keys the same option A as the exception for the unilocular cell, which confirms the reading.',
      explanations: {
        A: 'Correct. The multilocular — brown — fat cell is crowded with mitochondria, and their cytochrome pigment is what gives brown fat its colour and its heat-generating power.',
        B: 'The signet ring appearance is the unilocular cell: one huge droplet with the nucleus and a thin rim of cytoplasm squeezed to one edge, like the stone of a ring.',
        C: 'A single large droplet is again the unilocular cell. The multilocular cell holds many small ones, which is what "multilocular" means.',
        D: 'A flat peripheral nucleus is what a single large droplet does to a nucleus. The multilocular cell\'s nucleus stays central and rounded because no one droplet is big enough to displace it.',
      },
    },
    {
      key: 'concerning-reticular-cell-13e321a4',
      conceptKey: 'euchromatin-versus-heterochromatin',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The option letters have collapsed: option A carries both "Rounded cells with no processes" and "_b. Are antibody forming cells", and option C carries both "Has pale basophilic cytoplasm" and a fourth option behind an unreadable Arabic list marker. Two answers share each letter. The intact copy is `concerning-reticular-cells-a9f511f7`, which is the one to use; this row is kept so a rescan knows it is a duplicate.',
    },
    {
      key: 'concerning-reticular-cells-a9f511f7',
      conceptKey: 'euchromatin-versus-heterochromatin',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Read a pale nucleus and basophilic cytoplasm as an active cell.',
      answerOverride: 'C',
      answerOverrideReason:
        'The source printed no key. The reticular cell is a branched, stellate cell with a pale euchromatic nucleus and pale basophilic cytoplasm, and it is not a histiocyte. Only C stands.',
      explanations: {
        A: 'Reticular cells are stellate and branched — their processes are what form the reticular network the fibres run along. A rounded cell with no processes could not build a mesh.',
        B: 'The histiocyte is the macrophage of connective tissue, a different cell. Both live in reticular tissue, which is what makes the option tempting.',
        C: 'Correct. The cytoplasm is palely basophilic and the nucleus is pale and euchromatic, which together say this is an active, protein-forming cell rather than a resting one.',
        D: 'A dark heterochromatic nucleus would mean an inactive cell. It is the opposite of what a reticular cell shows, and this option is the direct contradiction of C — one of the two has to go.',
      },
    },
    {
      key: 'concerning-the-nuclear-pores-cc2fbc18',
      conceptKey: 'nuclear-envelope-and-nuclear-pore-complex',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Describe the nuclear pore and the direction each cargo travels.',
      answerOverride: 'D',
      answerOverrideReason:
        'The source printed no key. The pores are circular, not triangular; the two membranes do fuse at them; and RNA is exported from the nucleus rather than imported into it. Only D — the nucleoporins form an octagonal ring — is as the department book has it.',
      explanations: {
        A: 'The openings are circular. "Triangular" is invented, and it is the option a student takes who remembers only that the pore has a defined geometry.',
        B: 'The inner and outer membranes do become continuous with one another at the pore; that fusion is what makes a hole rather than two separate holes.',
        C: 'The direction is wrong. RNA and ribosomal subunits are exported out of the nucleus; what is imported is protein made in the cytoplasm.',
        D: 'Correct. About thirty nucleoporin proteins are arranged as an octagonal ring around the pore, with filaments trailing into the cytoplasm and into the nucleus.',
      },
    },
    {
      key: 'concerning-unilocular-adipocytes-they-have-all-of-the-follow-88d2b6b6',
      conceptKey: 'nucleus-shape-position-and-number-identify-the-cell',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Attribute cytochrome pigment to brown fat and not to white.',
      explanations: {
        A: 'The exception, and the answer. Cytochrome pigment sits in the many mitochondria of the multilocular — brown — fat cell and is what colours it. The unilocular cell has few mitochondria and no such pigment.',
        B: 'True, so not the exception. The signet ring appearance is the unilocular cell\'s hallmark.',
        C: 'True, so not the exception. One large droplet fills the cell.',
        D: 'True, so not the exception. That droplet flattens the nucleus and pushes it to the periphery, which is the other half of the signet ring picture.',
      },
    },
    {
      key: 'cri-du-chat-syndrome-is-due-to-cb35949c',
      conceptKey: 'chromosomal-abnormalities-and-the-syndromes-they-cause',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Give the chromosome and the arm deleted in cri-du-chat syndrome.',
      explanations: {
        A: 'Correct. Partial deletion of the short arm of chromosome 5.',
        B: 'The long arm of chromosome 5 is the same chromosome with the wrong arm. The option set varies chromosome and arm independently, so both have to be remembered.',
        C: 'Chromosome 15 is the wrong chromosome, with the right arm — the mirror of B.',
        D: 'Wrong on both counts, and in the set to complete the two-by-two.',
      },
    },
    {
      key: 'cri-du-chat-syndrome-is-due-to-dep-book-ac-ad-ac-ad-ad-ad-87094d66',
      conceptKey: 'chromosomal-abnormalities-and-the-syndromes-they-cause',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The same question as `cri-du-chat-syndrome-is-due-to-cb35949c`, with a marking annotation read into the stem ("Ac ad Ac ad ad ad") and no key extracted. The clean copy is the one to use. Kept here so whoever rescans the page knows this row is a duplicate rather than a second question.',
    },
    {
      key: 'dark-area-of-nucleolus-is-formed-of-938b6d67',
      conceptKey: 'nucleolus-parts-and-ribosome-formation',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name all three dark parts of the nucleolus.',
      explanations: {
        A: 'True, but not the whole answer. Pars amorpha is one of the three dark parts.',
        B: 'True, but not the whole answer. Pars fibrosa is the second.',
        C: 'True, but not the whole answer. Pars granulosa is the third.',
        D: 'Correct. All three are dark; what is light in the nucleolus is the nucleolar sap, and the question is testing whether the dark/light split is held separately from the three-part split.',
      },
    },
    {
      key: 'down-syndrome-occurs-due-to-dep-book-f00741e9',
      conceptKey: 'chromosomal-abnormalities-and-the-syndromes-they-cause',
      difficulty: 'Easy', questionType: 'Clinical application',
      learningObjective: 'Give the chromosomal fault behind Down syndrome.',
      answerOverride: 'D',
      answerOverrideReason:
        'The book keys B, a deletion on chromosome 15, which is not any recognised cause of Down syndrome and does not correspond to any of the four syndromes these books teach. Down syndrome is trisomy 21 — option D — and the key is a straightforward misprint.',
      explanations: {
        A: 'An extra chromosome 13 is Patau syndrome, not Down. It is the right kind of fault — a trisomy — on the wrong chromosome.',
        B: 'A deletion on chromosome 15 belongs to neither Down nor cri-du-chat, which is chromosome 5. This is the option the book keys, and it names a fault the syllabus does not teach at all.',
        C: 'Partial deletion of the short arm of chromosome 5 is cri-du-chat syndrome. The books ask that question separately with the same options, so mixing the two up costs both marks.',
        D: 'Correct. Down syndrome is trisomy 21 — an extra copy of chromosome 21, giving 47 chromosomes.',
      },
    },
    {
      key: 'esinophile-all-true-except-2ec6fd52',
      conceptKey: 'nucleus-shape-position-and-number-identify-the-cell',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Two of the four options are false, so the question has no single best answer. The book keys D, and the eosinophil is indeed not the largest leucocyte — that is the monocyte. But C, "specific granules contain histamine", is false as well by this faculty\'s own book: the eosinophil carries histamin*ase*, which destroys histamine, and histamine belongs to the basophil and the mast cell. The department book\'s granular leucocyte chapter states the contrast explicitly. A student who picks C has reasoned correctly and would be marked wrong. Excluded until a faculty reviewer decides which option the examiner meant.',
    },
    {
      key: 'euchromatin-466c9b50',
      conceptKey: 'euchromatin-versus-heterochromatin',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Only three options survived extraction and the contract is four to five. None of the three is true of euchromatin — it is visible by light microscopy as the pale ground of a vesicular nucleus, it is the active form, and nucleolus-associated chromatin is heterochromatin — so the correct answer is in the option that was lost. Only a rescan recovers it.',
    },
    {
      key: 'euchromatin-has-all-the-following-except-c58f4a79',
      conceptKey: 'euchromatin-versus-heterochromatin',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Attribute coarse dark clumps to heterochromatin.',
      explanations: {
        A: 'True, so not the exception. Extended and uncoiled is what euchromatin is.',
        B: 'True, so not the exception. Its genes are the active ones.',
        C: 'The exception, and the answer. Coarse, darkly basophilic clumps are heterochromatin. Every item in this option set is one half of the department book\'s comparative table, and this is the row that has been taken from the wrong column.',
        D: 'True, so not the exception. Electron lucent by EM, with a clear nucleolus — both follow from the chromatin being dispersed.',
      },
    },
    {
      key: 'euchromatin-is-b09847eb',
      conceptKey: 'euchromatin-versus-heterochromatin',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Pick the one true statement about euchromatin from four heterochromatin descriptions.',
      answerOverride: 'C',
      answerOverrideReason:
        'The book keys D, but nucleolus-associated chromatin is one of the three sites of heterochromatin the department book names, so D is false. Only C — directing protein synthesis — is true of euchromatin, which is the form carrying the active genes. This is the rare five-option row in the bank, and the extra option appears to have shifted the key by one letter.',
      explanations: {
        A: 'Highly coiled is heterochromatin. Euchromatin is the extended form.',
        B: 'Chromatin is DNA with histone and non-histone protein, not RNA with protein. RNA and protein together describe the ribosome.',
        C: 'Correct. Euchromatin carries the active genes, and it is through them that the nucleus directs and controls protein synthesis.',
        D: 'Chromatin condensed around the nucleolus is nucleolus-associated *hetero*chromatin — one of the three sites the book lists. This is the option the book keys, and it names the wrong form of chromatin.',
        E: 'Chromatin attached to the inner nuclear membrane is peripheral chromatin, also heterochromatin. D and E are two of the three heterochromatin sites offered side by side, which is what makes this the hardest row in the leaf.',
      },
    },
    {
      key: 'fibrillar-components-of-the-nuclear-membrane-includes-25926a07',
      conceptKey: 'nuclear-envelope-and-nuclear-pore-complex',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Name what lies against the fibrillar inner nuclear membrane.',
      answerOverride: 'C',
      answerOverrideReason:
        'The source printed no key. The department book describes the inner nuclear membrane as fibrillar, with peripheral chromatin attached to it and the nuclear lamina lying against it — which is heterochromatin plus nuclear lamina, option C. A names euchromatin, which is not attached to the envelope; B and D name the lamina and the lamins it is made of and leave the chromatin out, D saying the same thing twice. C is the reading the book supports, and the row is flagged here because no key was printed and the wording of the options is loose.',
      explanations: {
        A: 'Euchromatin is the dispersed form and is not attached to the nuclear envelope. What is attached there is the coiled, peripheral kind.',
        B: 'Lamins alone are incomplete. They are the protein the nuclear lamina is built from, and the chromatin attached to the same surface is left out.',
        C: 'Correct. The inner membrane is fibrillar because the nuclear lamina lies against it and peripheral heterochromatin is attached to it — those two together are what the fibrillar picture is made of.',
        D: 'Lamins and nuclear lamina are the same material named twice, since the lamina is made mainly of lamins. An option that repeats itself cannot add the second component the question is asking for.',
      },
    },
    {
      key: 'fibroblast-has-a89594b4',
      conceptKey: 'euchromatin-versus-heterochromatin',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Only three options survived extraction and the contract is four to five. The question is sound and its answer is the pale nucleus with a prominent nucleolus and basophilic cytoplasm — the active fibroblast, whose concept is already minted as `fibroblast-active-and-fibrocyte-inactive` in `haemopoiesis.ts`. Recoverable by rescanning the page.',
    },
    {
      key: 'following-statements-concerning-nuclear-envelope-are-true-ex-7cf79149',
      conceptKey: 'nuclear-envelope-and-nuclear-pore-complex',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Recognise that the nuclear envelope is an electron-microscopic structure.',
      answerOverride: 'C',
      answerOverrideReason:
        'The source printed no key. A, B and D are all stated by the department book. C says the envelope is not resolved by electron microscopy, which is exactly backwards — electron microscopy is the only way it is resolved.',
      explanations: {
        A: 'True, so not the exception. Two parallel unit membranes.',
        B: 'True, so not the exception. Perforated at intervals by nuclear pores.',
        C: 'The exception, and the answer. The envelope is not resolved by *light* microscopy; the electron microscope is where its two membranes, its perinuclear space and its pores are seen at all. A student reading quickly swaps the two instruments.',
        D: 'True, so not the exception. The perinuclear cisterna is the space between the two membranes.',
      },
    },
    {
      key: 'goblet-cell-fe8962d6',
      conceptKey: 'nucleus-shape-position-and-number-identify-the-cell',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Recall the goblet cell\'s product and the nuclear position that follows from it.',
      explanations: {
        A: 'A cell exporting a large glycoprotein needs abundant rough endoplasmic reticulum, not a little. Few rER would make secretion impossible.',
        B: 'Correct. The goblet cell is a unicellular gland that synthesises and secretes mucus.',
        C: 'The nucleus is basal, not central: the mucous droplets fill the apex and push it down, which is what gives the cell its goblet shape.',
        D: 'The cytoplasm is basophilic from its rER, and its mucous cap is pale. Deep acidophilia would say the cell was making something else entirely.',
      },
    },
    {
      key: 'heterochromatin-has-all-the-following-except-8fde0da6',
      conceptKey: 'euchromatin-versus-heterochromatin',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Recognise that a protein-forming cell is euchromatic.',
      explanations: {
        A: 'True, so not the exception. Coiled and inactive is the definition.',
        B: 'True, so not the exception. Inactive genes, and electron dense because the coiling is what scatters electrons.',
        C: 'True, so not the exception. The small lymphocyte is the department book\'s own example of a heterochromatic cell.',
        D: 'The exception, and the answer. A protein-forming cell is where euchromatin predominates, because protein synthesis needs genes that are readable. This is the row of the book\'s comparative table taken from the wrong column.',
      },
    },
    {
      key: 'heterochromatine-is-4c80efef',
      conceptKey: 'euchromatin-versus-heterochromatin',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Give both defining features of heterochromatin together.',
      explanations: {
        A: 'True, but not the whole answer. Highly coiled is the structural half.',
        B: 'True, but not the whole answer. Electron dense is what that coiling looks like under the beam.',
        C: 'Directing protein synthesis is euchromatin\'s work. Heterochromatin\'s genes are inactive, which is the point of it being coiled away.',
        D: 'Correct. A and B are the same fact seen twice — the coiling and its electron-microscopic consequence — and both belong to heterochromatin.',
      },
    },
    {
      key: 'intermediate-layer-of-transitional-is-de2ad02d',
      conceptKey: 'nucleus-shape-position-and-number-identify-the-cell',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Describe the cells of the intermediate layer of transitional epithelium.',
      explanations: {
        A: 'Correct. The intermediate layer of transitional epithelium is polyhedral or pear-shaped cells with a central rounded nucleus, between the basal cubical layer and the superficial dome cells.',
        B: 'A full bladder stretches the epithelium and makes it thinner, not thicker. The relationship runs the other way, and it is the fact this epithelium is named for.',
        C: 'Cuboidal cells with a central rounded nucleus are the basal layer. The nucleus is described identically, which is what makes this the closest distractor — the cell shape is the only thing separating the two options.',
        D: 'Flat cells with flat nuclei are the superficial layer of a stretched bladder, or a simple squamous epithelium elsewhere.',
      },
    },
    {
      key: 'largest-component-of-the-cell-not-present-in-rbcs-2d1c2a53',
      conceptKey: 'nucleus-parts-and-functions-including-nuclear-sap',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the largest cell component and the one the red cell lacks.',
      explanations: {
        A: 'The nucleolus is inside the nucleus, so it is smaller by definition — and a red cell has lost it only because it lost the nucleus around it.',
        B: 'Correct. The nucleus is the largest component of the cell, and the department book states that the red blood corpuscle and the platelet, having none, are not true cells.',
        C: 'A red cell is almost entirely cytoplasm — that is where its haemoglobin is. It cannot be what the cell is missing.',
        D: 'Chromatin is the material inside the nucleus. It is lost with the nucleus, but the question asks for the largest component, and chromatin is a part of it rather than the whole.',
      },
    },
    {
      key: 'light-area-of-nucleolus-formed-of-91fabcb6',
      conceptKey: 'nucleolus-parts-and-ribosome-formation',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name what the light areas of the nucleolus contain.',
      explanations: {
        A: 'RNA is in the dark areas — newly made in pars fibrosa and mature in pars granulosa. RNA is what makes them dark.',
        B: 'DNA is in the dark areas too, in the pars amorpha that encodes the rRNA.',
        C: 'Correct. The light areas are nucleolar sap, the fluid between the dark parts.',
        D: 'There is a correct option in the set, so "none of the above" cannot stand.',
      },
    },
    {
      key: 'more-euchromatin-is-prominent-in-6552c559',
      conceptKey: 'euchromatin-versus-heterochromatin',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Rank the granulocytes by how condensed their nuclei are, as the books ask it.',
      explanations: {
        A: 'The neutrophil nucleus is the darkest and most condensed of the three, which is why the paired question keys the neutrophil for heterochromatin.',
        B: 'True, but not the whole answer. The eosinophil\'s bilobed nucleus is paler than the neutrophil\'s.',
        C: 'True, but not the whole answer. The basophil\'s nucleus is pale as well, and its granules obscure it further.',
        D: 'Correct as the books have it: the eosinophil and the basophil both show more euchromatin than the neutrophil. This question and `more-heterochromatin-is-prominent-in` are a matched pair from one book and only make sense read together.',
      },
    },
    {
      key: 'more-heterochromatin-is-prominent-in-dccd3534',
      conceptKey: 'euchromatin-versus-heterochromatin',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Rank the granulocytes by how condensed their nuclei are, as the books ask it.',
      explanations: {
        A: 'Correct. The neutrophil\'s segmented nucleus is the darkest of the granulocytes, its lobes joined by threads of condensed chromatin.',
        B: 'The eosinophil is the paler of the pair the companion question keys for euchromatin.',
        C: 'The basophil likewise. It is dark on a film, but that is the granules, not the nucleus — and the granules are what make the S-shaped nucleus hard to see at all.',
        D: 'Both b and c is the answer to the companion question, `more-euchromatin-is-prominent-in`, not to this one. The two rows share an option set and have opposite answers, which is the whole trap.',
      },
    },
    {
      key: 'nuclear-pore-complex-a1032527',
      conceptKey: 'nuclear-envelope-and-nuclear-pore-complex',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Describe the nuclear pore complex completely.',
      explanations: {
        A: 'True, but not the whole answer. Circular openings at intervals along the envelope.',
        B: 'True, but not the whole answer. About thirty nucleoporin proteins build it.',
        C: 'True, but not the whole answer. Those proteins are arranged as an octagonal annulus.',
        D: 'Correct. Shape, protein and arrangement are three parts of one description, and the question is asking whether all three are held together.',
      },
    },
    {
      key: 'nuclear-pore-complex-refers-to-e9e0cd9c',
      conceptKey: 'nuclear-envelope-and-nuclear-pore-complex',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Distinguish the pore from the complex that fills it.',
      answerOverride: 'B',
      answerOverrideReason:
        'The source printed no key. The complex is the nucleoporin assembly occupying the pore, not the pore itself and not its rim, so B is the only option that names it.',
      explanations: {
        A: 'The nuclear pores are the openings. The complex is what sits in them — the two words are used loosely in conversation and precisely in this question.',
        B: 'Correct. A non-membranous cylindrical protein structure fitting the pore, built of nucleoporins in an octagonal ring with a central transporter.',
        C: 'The rim of the pore is where the inner and outer membranes fuse. It is membrane, and the complex is protein.',
        D: 'There is a correct option in the set, so "none of the above" cannot stand.',
      },
    },
    {
      key: 'nuclear-pores-ed52b0fe',
      conceptKey: 'nuclear-envelope-and-nuclear-pore-complex',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Give what a nuclear pore is and what it does.',
      answerOverride: 'D',
      answerOverrideReason:
        'The source printed no key. A, B and C are each stated by the department book — the pores perforate the envelope, the two membranes are continuous at them, and they regulate exchange between nucleus and cytoplasm — so only D covers the whole.',
      explanations: {
        A: 'True, but not the whole answer. The pores are where the envelope is perforated.',
        B: 'True, but not the whole answer. Inner and outer membranes fuse and become continuous at the rim of each pore.',
        C: 'True, but not the whole answer. Protein enters and RNA and ribosomal subunits leave through them, under control.',
        D: 'Correct. Site, structure and function together — a student stopping at the first true option has answered a third of it.',
      },
    },
    {
      key: 'nucleolus-associated-heterochromatin-2ae3d3eb',
      conceptKey: 'euchromatin-versus-heterochromatin',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Define nucleolus-associated chromatin as one of the three sites of heterochromatin.',
      answerOverride: 'B',
      answerOverrideReason:
        'The source printed no key. Nucleolus-associated chromatin is the third of the three heterochromatin sites the department book names — heterochromatin condensed around the nucleolus — which is option B.',
      explanations: {
        A: 'The nucleolus has no membrane of its own; the book is explicit that it is not limited by one. Chromatin around it is not a membrane and does not act as one.',
        B: 'Correct. It is heterochromatin condensed around the nucleolus, the third site alongside peripheral chromatin and chromatin islands.',
        C: 'The nucleolar organiser is the pars amorpha *inside* the nucleolus — the DNA encoding rRNA. It is chromosomal too, which is what makes this the closest distractor, but it is in the nucleolus rather than around it.',
        D: 'There is a correct option in the set, so "none of the above" cannot stand.',
      },
    },
    {
      key: 'nucleolus-formed-of-three-regions-16532246',
      conceptKey: 'nucleolus-parts-and-ribosome-formation',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Name the three regions of the nucleolus.',
      answerOverride: 'A',
      answerOverrideReason:
        'The source printed no key. The department book gives the nucleolus\'s dark areas as pars amorpha (the nucleolar organiser), pars fibrosa and pars granulosa — option A, with the organiser named in place of pars amorpha.',
      explanations: {
        A: 'Correct. Pars granulosa, pars fibrosa and the nucleolar organiser region — the nucleolar organiser being pars amorpha under its other name.',
        B: 'Peripheral chromatin, nucleolus-associated chromatin and chromatin islands are the three sites of *heterochromatin*, not the three regions of the nucleolus. Two lists of three, and this is the other one.',
        C: 'rRNA, ribosomal protein and DNA are the materials the nucleolus works with, not its named regions.',
        D: 'Heterochromatin and euchromatin are forms of chromatin in the nucleus at large, and "nucleolar matrix" is not a term the book uses.',
      },
    },
    {
      key: 'nucleolus-is-91375f38',
      conceptKey: 'nucleolus-parts-and-ribosome-formation',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Describe the nucleolus by light microscopy completely.',
      explanations: {
        A: 'True, but not the whole answer. Deeply basophilic, from the nucleic acid it is packed with.',
        B: 'True, but not the whole answer. Rich in nucleic acid is the reason for the basophilia.',
        C: 'True, but not the whole answer. Nucleolus-associated chromatin condenses around it.',
        D: 'Correct. All three, and they are one description rather than three: it is basophilic *because* it is rich in nucleic acid, and it is ringed by chromatin.',
      },
    },
    {
      key: 'nucleolus-is-composed-of-all-the-following-except-22ac36b1',
      conceptKey: 'nucleolus-parts-and-ribosome-formation',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Separate the nucleolus\'s own parts from the nuclear lamina.',
      explanations: {
        A: 'True, so not the exception. Pars granulosa is one of the three dark parts.',
        B: 'True, so not the exception. rRNA is the material of pars fibrosa and pars granulosa both.',
        C: 'The exception, and the answer. The fibrous lamina — the nuclear lamina — lies against the inner nuclear membrane, at the other side of the nucleus entirely. The word "fibrous" beside "pars fibrosa" is what makes this option work as a trap.',
        D: 'True, so not the exception. Pars fibrosa is the newly synthesised rRNA.',
      },
    },
    {
      key: 'nucleus-is-kidney-shaped-myeloblast-f-metamyelocytes-g-band-eb54ebd1',
      conceptKey: 'nucleus-shape-position-and-number-identify-the-cell',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Not a multiple-choice question. The stem is the tail of a matching exercise — nuclear descriptions against a lettered list of myeloid stages — with a page header read into it, and the two surviving "options" are the section headings of the answer key that followed it ("MCQ", "Problem Solving"). Rescanning will recover a matching exercise, which should be re-extracted as one rather than repaired here.',
    },
    {
      key: 'nucleus-of-basophils-is-ce1511fb',
      conceptKey: 'nucleus-shape-position-and-number-identify-the-cell',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Give the shape of the basophil nucleus.',
      explanations: {
        A: 'Multilobed and segmented is the neutrophil. The three granulocyte questions in this book share one option list, so each answer is a distractor in the other two.',
        B: 'Bilobed and horse-shoe shaped is the eosinophil, its two lobes joined by a thick chromatin thread.',
        C: 'Correct. The basophil nucleus is irregular and S-shaped, and it is largely hidden by the coarse granules lying over it.',
        D: 'Large and kidney-shaped is the monocyte, which is not a granulocyte at all.',
      },
    },
    {
      key: 'nucleus-of-monocyte-is-25a0a1a0',
      conceptKey: 'nucleus-shape-position-and-number-identify-the-cell',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Give the shape of the monocyte nucleus.',
      explanations: {
        A: 'Multilobed and segmented is the neutrophil.',
        B: 'Bilobed and horse-shoe shaped is the eosinophil.',
        C: 'S-shaped is the basophil.',
        D: 'Correct. The monocyte has a large kidney-shaped or indented nucleus, and it is the largest leucocyte.',
      },
    },
    {
      key: 'nucleus-of-neutrophils-is-7f94582e',
      conceptKey: 'nucleus-shape-position-and-number-identify-the-cell',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Give the shape of the neutrophil nucleus.',
      explanations: {
        A: 'Correct. Two to five lobes joined by thin threads of chromatin — the segmented nucleus that gives the cell its other name, polymorphonuclear leucocyte.',
        B: 'Bilobed and horse-shoe shaped is the eosinophil.',
        C: 'S-shaped is the basophil.',
        D: 'Large and kidney-shaped is the monocyte.',
      },
    },
    {
      key: 'nucleus-of-the-nerve-cells-667d5b32',
      conceptKey: 'euchromatin-versus-heterochromatin',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Read the nerve cell nucleus as the type example of an active nucleus.',
      explanations: {
        A: 'A condensed nucleus means an inactive cell. The nerve cell is one of the two the department book names as active, alongside the liver cell.',
        B: 'Correct. The nerve cell nucleus is euchromatic — pale, vesicular, with a prominent nucleolus — because it is synthesising protein continuously.',
        C: 'The nucleolus is not merely visible in a nerve cell but conspicuous; it is one of the features used to recognise the cell on a slide.',
        D: 'Inactive is the opposite of what the appearance says. A and D are the same answer twice, which usually means neither is the one.',
      },
    },
    {
      key: 'one-layer-of-columnar-crowded-cell-with-more-than-one-level-e57fb72c',
      conceptKey: 'nucleus-shape-position-and-number-identify-the-cell',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Use nuclear level to identify pseudostratified epithelium.',
      explanations: {
        A: 'Squamous cells are flat with flat nuclei, in one layer at one level.',
        B: 'Cubical cells are as tall as they are wide, with central rounded nuclei at a single level.',
        C: 'Simple columnar epithelium is a single layer of tall cells, but its nuclei sit at one level. The word the stem adds — crowded, at more than one level — is exactly what separates the two.',
        D: 'Correct. Pseudostratified epithelium is one layer of crowded cells of differing heights, so their nuclei lie at several levels and it looks stratified without being so. Every cell still reaches the basement membrane.',
      },
    },
    {
      key: 'pars-amorpha-of-the-nucleolus-dce300f0',
      conceptKey: 'nucleolus-parts-and-ribosome-formation',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Place pars amorpha at the gene stage of the nucleolar sequence.',
      explanations: {
        A: 'Newly formed strands of rRNA are pars fibrosa, one step downstream.',
        B: 'Granules of mature rRNA are pars granulosa, two steps downstream.',
        C: 'Correct. Pars amorpha is the nucleolar organiser: the parts of chromosomes carrying the genes that encode rRNA. It is DNA, and it is the only one of the three that is.',
        D: 'The light areas are nucleolar sap, and the option also says nuclear rather than nucleolar sap.',
      },
    },
    {
      key: 'pars-amorpha-of-the-nucleus-b92731c1',
      conceptKey: 'nucleolus-parts-and-ribosome-formation',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Place pars amorpha at the gene stage of the nucleolar sequence.',
      answerOverride: 'C',
      answerOverrideReason:
        'The book keys B, mature rRNA, which is pars granulosa. Pars amorpha is the DNA encoding rRNA — option C — and the same book keys the identical question printed as `pars-amorpha-of-the-nucleolus-dce300f0` correctly as C. Two rows on this page, this one and `pars-fibrosa-of-the-nucleus-5f1e3d3e`, are both keyed B, and B cannot be right for both: a column of the answer key has shifted.',
      explanations: {
        A: 'Newly synthesised rRNA is pars fibrosa.',
        B: 'Mature rRNA is pars granulosa. This is the option the book keys, and it names the last stage of the sequence for the part that is the first.',
        C: 'Correct. Pars amorpha, the nucleolar organiser, is the DNA of the chromosomes encoding rRNA.',
        D: 'The light areas are nucleolar sap, and are not one of the three dark parts.',
      },
    },
    {
      key: 'pars-fibrosa-of-the-nucleus-5f1e3d3e',
      conceptKey: 'nucleolus-parts-and-ribosome-formation',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Place pars fibrosa at the new-transcript stage of the nucleolar sequence.',
      answerOverride: 'A',
      answerOverrideReason:
        'The book keys B, mature rRNA, which is pars granulosa. Pars fibrosa is newly synthesised rRNA — option A — and the same book keys the identical question printed as `pars-fibrosa-of-the-nucleolus-fd5fcfbb` correctly as A. This row and `pars-amorpha-of-the-nucleus-b92731c1` are both keyed B on the same page, which is the signature of a shifted answer column rather than two independent judgements.',
      explanations: {
        A: 'Correct. Pars fibrosa is newly synthesised rRNA, still in strands rather than packed into granules.',
        B: 'Mature rRNA is pars granulosa. This is the option the book keys, and it is one step further along the sequence than the question asks.',
        C: 'The DNA encoding rRNA is pars amorpha, one step earlier.',
        D: 'The light areas are nucleolar sap and represent no stage of rRNA.',
      },
    },
    {
      key: 'part-of-chromosome-carry-genes-encoding-rrna-21f13d4c',
      conceptKey: 'nucleolus-parts-and-ribosome-formation',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Identify the nucleolar organiser as chromosomal DNA.',
      explanations: {
        A: 'Correct. Pars amorpha is the nucleolar organiser — the chromosomal region carrying the rRNA genes.',
        B: 'Pars fibrosa is the RNA transcribed from those genes, not the genes themselves.',
        C: 'Pars granulosa is the finished rRNA, further downstream still.',
        D: 'Only one of the three is chromosomal DNA, so "all the above" cannot stand. Two of the three are RNA at different stages.',
      },
    },
    {
      key: 'plasma-cells-is-characterized-by-3e2808e9',
      conceptKey: 'euchromatin-versus-heterochromatin',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Assemble the plasma cell\'s nuclear and cytoplasmic picture as one.',
      explanations: {
        A: 'True, but not the whole answer. The cartwheel nucleus is the alternating chromatin seen end-on, and the pale negative Golgi image sits beside it.',
        B: 'True, but not the whole answer. The spokes of the cartwheel *are* alternating euchromatin and heterochromatin — this option and A are the same fact described two ways.',
        C: 'True, but not the whole answer. Deep basophilia follows from the rough endoplasmic reticulum an antibody-exporting cell is packed with.',
        D: 'Correct. Nucleus, Golgi and cytoplasm are one coherent picture of a cell built to export protein, and the question rewards seeing them as one rather than three.',
      },
    },
    {
      key: 'provide-medium-for-transport-of-rna-through-pores-0f14855b',
      conceptKey: 'nucleus-parts-and-functions-including-nuclear-sap',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option C reads "nuclear sap d.chromatin" — C and D have run together on one line, so the correct answer shares a letter with a distractor and only three lettered options remain. This is the same page defect as `colloid-solution-fills-space-between-chromatin-and-nucleolus-2307a8d4`, and one rescan fixes both. The answer is the nuclear sap.',
    },
    {
      key: 'regarding-klinefelter-syndrome-dep-book-10c33b3f',
      conceptKey: 'chromosomal-abnormalities-and-the-syndromes-they-cause',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Give the chromosome count in Klinefelter syndrome.',
      explanations: {
        A: 'Klinefelter syndrome occurs in males. It is Turner syndrome that affects females, and this book asks both with the same four options.',
        B: 'Correct. XXY gives 47 chromosomes — one more than normal, because a sex chromosome has been gained rather than lost.',
        C: 'XO is Turner syndrome, and it gives 45. The two syndromes sit either side of the normal count, which is the distinction the paired questions are built on.',
        D: 'The genital system is abnormal in Klinefelter syndrome; a normal one would leave nothing to recognise.',
      },
    },
    {
      key: 'regarding-the-ovum-a-its-diameter-is-about-12-microns-3e48bb58',
      conceptKey: 'gamete-morphology-and-the-haploid-nucleus',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'A duplicate of `regarding-the-ovum-dep-book-7eea6085` whose option A had also been read into the stem, so that the stem ends "a, Its diameter is about 12 microns". The bank\'s option-repair pass has since recovered option A, so the row now carries four; it remains a duplicate of the keyed copy, which is the one authored, and is kept here so a rescan knows the two rows are one question.',
    },
    {
      key: 'regarding-the-ovum-dep-book-7eea6085',
      conceptKey: 'gamete-morphology-and-the-haploid-nucleus',
      difficulty: 'Hard', questionType: 'Structure and function',
      learningObjective: 'Give the ovum\'s size, chromosome content, timing and coverings.',
      answerOverride: 'D',
      answerOverrideReason:
        'The book keys C, that the ovum starts development at puberty, but the department book states that in the female gametogenesis starts in intrauterine life, is arrested, and only then continues from puberty — so C is false as this faculty teaches it. The same book states in its own words that the corona radiata is the outer cover of the ovum, which is option D. Overridden to D, and recorded because the override contradicts a printed key on the strength of the department book against it.',
      explanations: {
        A: 'The mature ovum is about 120 µm across — one of the largest cells in the body, and the reason it is visible to the naked eye. Twelve microns is a tenth of that and closer to a lymphocyte.',
        B: 'The oocyte nucleus carries 22 autosomes and an X chromosome only. "Either X or Y" is true of the sperm, and the same option appears in the sperm question where it is the answer — which is the trap this pair of questions is built on.',
        C: 'Oogenesis begins in intrauterine life and is then arrested; what happens at puberty is that it resumes. This is the option the book keys, and it describes spermatogenesis, which really does start at puberty.',
        D: 'Correct. The three coverings from within outwards are cell membrane, zona pellucida and corona radiata, so the corona radiata — follicular cells held together by hyaluronic acid — is the outer one.',
      },
    },
    {
      key: 'regarding-the-sperm-one-of-the-following-statements-is-corre-cbecba80',
      conceptKey: 'gamete-morphology-and-the-haploid-nucleus',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Give the sperm\'s length, nuclear content, timing and acrosome position.',
      answerOverride: 'B',
      answerOverrideReason:
        'The source printed no key. The department book gives the sperm as 55 µm long, its formation as beginning at puberty, and the acrosomal cap as covering most of the nucleus in the head — so A, C and D are all false and B is the only statement that stands.',
      explanations: {
        A: 'The whole sperm is about 55 µm long: head 4, middle piece 6 and tail 45. Six microns is the middle piece alone, which is where the figure in this option comes from.',
        B: 'Correct. The sperm nucleus carries 22 autosomes and either an X or a Y chromosome — which is why the father determines the sex of the child.',
        C: 'Spermatogenesis starts at puberty and continues into old age. Formation beginning before birth is the female pattern, and the two are being swapped here.',
        D: 'The acrosomal cap covers most of the *nucleus*, in the head. The middle piece carries the mitochondrial sheath instead, and putting the cap there confuses the two ends of the cell.',
      },
    },
    {
      key: 'regarding-turner-syndrome-dep-book-em-em-em-em-em-f9f698ec',
      conceptKey: 'chromosomal-abnormalities-and-the-syndromes-they-cause',
      difficulty: 'Moderate', questionType: 'Clinical application',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The same question as `regarding-turner-syndrome-c6d49418`, with a marking annotation read into the stem ("em em em em em") and keyed B — 47 chromosomes — which is wrong for Turner syndrome; the clean copy is keyed C, XO, correctly. The clean copy is the one to use. Kept here so a rescan knows this row is a duplicate carrying a bad key rather than a second question.',
    },
    {
      key: 'rrna-is-formed-in-while-protein-is-formed-in-aa647a25',
      conceptKey: 'nucleolus-parts-and-ribosome-formation',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Only three options survived extraction and the contract is four to five. The question is sound and its answer is nucleolus and cytoplasm — rRNA is made in the nucleolus and ribosomal protein in the cytoplasm, and the two unite in the nucleolus to form the subunits. Recoverable by rescanning the page.',
    },
    {
      key: 'site-of-heterochromatin-bc896bf5',
      conceptKey: 'euchromatin-versus-heterochromatin',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name all three sites of heterochromatin.',
      explanations: {
        A: 'True, but not the whole answer. Peripheral chromatin, attached to the inner nuclear membrane.',
        B: 'True, but not the whole answer. Chromatin islands, scattered in the nuclear sap.',
        C: 'True, but not the whole answer. Nucleolus-associated chromatin, condensed around the nucleolus.',
        D: 'Correct. Three sites, and the department book lists them as three; each is a separate option in other questions in these books, so knowing only one of them is not enough.',
      },
    },
    {
      key: 'the-euchromatin-b0f4d660',
      conceptKey: 'euchromatin-versus-heterochromatin',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Pick the one true statement about euchromatin.',
      answerOverride: 'C',
      answerOverrideReason:
        'The source printed no key. A, B and D each state a property of heterochromatin; only C — that euchromatin predominates in active cells — is true of it.',
      explanations: {
        A: 'Inactive genes are heterochromatin\'s. Euchromatin is the form whose genes are being read.',
        B: 'Electron dense is heterochromatin. Euchromatin is electron lucent, because it is dispersed.',
        C: 'Correct. Euchromatin predominates in metabolically active, protein-forming cells — the nerve cell and the liver cell are the book\'s examples.',
        D: 'Peripheral chromatin and chromatin islands are two of the three heterochromatin sites. Naming them for euchromatin puts it in the one place it never is.',
      },
    },
    {
      key: 'the-following-is-a-character-of-multilocular-adipocyte-4698d8e0',
      conceptKey: 'nucleus-shape-position-and-number-identify-the-cell',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Give what brown fat is for.',
      explanations: {
        A: 'A membrane-bound granule filling the cytoplasm is not what a fat droplet is — lipid inclusions have no membrane, which is part of what makes them inclusions rather than organelles.',
        B: 'A flattened peripheral nucleus is the unilocular cell, pushed aside by its single droplet. The multilocular cell keeps a central rounded nucleus.',
        C: 'Correct. Brown fat generates heat, which is why it is packed with mitochondria and why their cytochrome pigment colours it.',
        D: 'White adipose tissue is unilocular. Multilocular cells make up brown adipose tissue, which is the smaller depot and most prominent in the newborn.',
      },
    },
    {
      key: 'the-megakaryocyte-is-characterized-by-the-following-cd8d196f',
      conceptKey: 'nucleus-shape-position-and-number-identify-the-cell',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Identify the megakaryocyte from its nucleus.',
      explanations: {
        A: 'Correct. One very large multilobed dark nucleus in a giant marrow cell — the appearance that makes a megakaryocyte unmistakable on a marrow smear.',
        B: 'Acidophilic cytoplasm rich in lysosomes describes the osteoclast. The megakaryocyte cytoplasm is where the platelet granules are being packaged.',
        C: 'Sitting on a bony surface in Howship\'s lacunae is the osteoclast again — another giant multinucleated cell, and the reason this option is here.',
        D: 'Metamyelocytes come from the granulocyte line. What the megakaryocyte gives origin to is platelets, shed from its cytoplasm along demarcation channels.',
      },
    },
    {
      key: 'the-nucleus-of-large-lymphocytes-is-characterized-by-being-260f0864',
      conceptKey: 'nucleus-shape-position-and-number-identify-the-cell',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Distinguish the large lymphocyte nucleus from the small one and from the monocyte.',
      explanations: {
        A: 'Kidney-shaped is the monocyte. The two are the largest cells on a film and the option is here because they are confused on sight.',
        B: 'Correct. Large and indented, with a visible nucleolus — the appearance of a lymphocyte that is growing rather than resting.',
        C: 'No obvious nucleolus is the *small* lymphocyte, whose condensed chromatin hides it.',
        D: 'Heterochromatic is again the small lymphocyte. The large one is paler because it is the active form.',
      },
    },
    {
      key: 'the-nucleus-of-protein-forming-cell-shows-all-the-following-b616cabe',
      conceptKey: 'euchromatin-versus-heterochromatin',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Assemble the nuclear picture of an active cell and name the one feature that does not belong.',
      explanations: {
        A: 'True, so not the exception. More euchromatin by EM is exactly what an active nucleus shows.',
        B: 'The exception, and the answer. More heterochromatin means genes coiled away and unread, which is the nucleus of a resting cell.',
        C: 'True, so not the exception. A clear nucleolus goes with it, because a cell making protein is making ribosomes.',
        D: 'True, so not the exception. Pale by light microscopy is what dispersed chromatin looks like — the vesicular nucleus.',
      },
    },
    {
      key: 'the-outer-layer-of-the-nuclear-envelope-4f036831',
      conceptKey: 'nuclear-envelope-and-nuclear-pore-complex',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Distinguish the outer nuclear membrane from the inner one.',
      explanations: {
        A: 'Smooth is what the inner membrane would be called if the terms were reversed. The outer one carries ribosomes and so is granular — it is continuous with the rough endoplasmic reticulum, and that continuity is the reason.',
        B: 'Correct. The outer membrane is granular, studded with polyribosomes, and continuous with the cisternae of the rough endoplasmic reticulum.',
        C: 'Cristae are folds of the inner mitochondrial membrane. Nothing in the nuclear envelope is folded that way.',
        D: 'Fibrillar is the *inner* membrane, with the nuclear lamina against it and peripheral chromatin attached. Granular outside, fibrillar inside, and this question and its options exist to test which is which.',
      },
    },
    {
      key: 'the-process-of-erythropoeisis-involves-403f626d',
      conceptKey: 'nucleus-shape-position-and-number-identify-the-cell',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Not a nucleus question in any part, and its four options are now intact after the bank\'s option-repair pass, so nothing is wrong with the row itself. The extractor filed a haemopoiesis question under this leaf, and its concept — `bone-marrow-red-and-yellow`, which gives adult red marrow as filling the flat, short and irregular bones — is already minted in `haemopoiesis.ts`. Declaring that concept again here would emit a duplicate concept id and the validator would reject the batch. The row is sound and its answer is the flat bones such as the sternum; it should be moved into the haemopoiesis seed rather than repaired, and it is kept here so that whoever does the move can find it.',
    },
    {
      key: 'unilocular-fat-cells-92e7f734',
      conceptKey: 'nucleus-shape-position-and-number-identify-the-cell',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Assemble the signet ring appearance from its three parts.',
      explanations: {
        A: 'True, but not the whole answer. The nucleus is flattened and pushed eccentrically to the edge.',
        B: 'True, but not the whole answer. A single large droplet is what does the pushing.',
        C: 'True, but not the whole answer. What is left of the cytoplasm is a thin rim around that droplet.',
        D: 'Correct. All three together are the signet ring: one huge droplet, a rim of cytoplasm and a flattened nucleus at one edge — three descriptions of a single consequence.',
      },
    },
  ],
}
