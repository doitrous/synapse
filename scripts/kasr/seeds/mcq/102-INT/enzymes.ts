/**
 * `102 INT > Biochemistry > Enzymes` — the question books' MCQs.
 *
 * Twenty-one rows, triaged against the department book's own chapter
 * (`scripts/kasr/extract/pagetext/src_a488633802ec053c6325.json`, physical
 * p54-p65). The chapter's own "International Classification of Enzymes"
 * table, on its last page (physical p65), is cancelled for the written exam
 * per BIO ORIENTATION 102 (2025/2026) — none of these 21 rows happen to ask
 * about that table, so no row is excluded for that reason. Nineteen rows keep
 * their printed answer key as-is; none needed an override. Two are excluded:
 * `p46-q8` has the induced-fit question's options (d) and (e) corrupted by a
 * different question's stem and options bleeding in via OCR, and `p48-q22`
 * asks about iodoacetate, which this chapter's twelve pages never mention —
 * the printed key happens to be right by outside biochemistry, but nothing
 * in this book supports it.
 *
 * Nine concepts cover the nineteen sittable rows. Two reuse existing 102 INT
 * concepts (`factors-affecting-enzyme-reaction-rate`,
 * `competitive-enzyme-inhibition-mechanism`); the rest are minted fresh for
 * facts those two don't cover — basic definition and terminology, active-site
 * mechanism, Km, allosteric regulation, irreversible inhibition, zymogen
 * activation, and covalent phosphorylation.
 */
import type { McqLeafSeed } from '../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Enzymes',
  modulePath: '102 INT > Biochemistry > Enzymes',
  articleId: 'ART-102-BIO-ENZYMES',

  concepts: [
    {
      key: 'factors-affecting-enzyme-reaction-rate',
      label: 'The rate of an enzyme-catalysed reaction is set by substrate concentration, enzyme concentration, cofactor concentration, temperature and pH',
      definition:
        'Five factors govern the velocity of an enzyme-catalysed reaction: substrate concentration, which raises velocity to Vmax as the enzyme saturates; enzyme concentration, to which velocity is directly proportional until substrate becomes limiting; cofactor concentration, on the same terms; temperature, rising to an optimum near 37 °C and stopping near 70 °C as the enzyme denatures; and pH, most enzymes having an optimum between 5 and 9.',
      objective: 'Name the five factors that affect the rate of an enzyme-catalysed reaction and say what limits the reaction once each is in excess.',
      pitfall:
        'Treating higher temperature as simply faster. Above the optimum the enzyme protein denatures and the catalytic site is disorganised, so velocity falls rather than rises.',
      subject: 'fnd',
      primary: 'DIS-BIO-T02',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Enzymes',
      type: 'classification',
    },
    {
      key: 'competitive-enzyme-inhibition-mechanism',
      label:
        'A competitive inhibitor resembles the substrate closely enough to occupy the active site, so it raises the apparent Km without touching Vmax and is defeated by adding more substrate',
      definition:
        'A competitive inhibitor is structurally similar to the substrate, so it competes with the substrate to bind reversibly at the active or catalytic site. The degree of inhibition depends on the ratio of inhibitor concentration to substrate concentration rather than on the absolute concentration of either, and on their relative affinities for the enzyme. Vmax is unaffected, because the inhibition is reversed by raising substrate concentration and at a high enough substrate concentration the reaction reaches the same Vmax as in the absence of inhibitor. The apparent Km rises, because more substrate is needed to reach half of Vmax. The department book\'s examples are allopurinol, a structural analogue of hypoxanthine that inhibits xanthine oxidase and is used in gout; sulfonamides, structural analogues of para-aminobenzoic acid that block bacterial folate synthesis; and dicumarol and warfarin, structurally similar to a vitamin K derivative and used as anticoagulants.',
      objective: 'Explain how structural similarity to the substrate produces reversible inhibition, state what it does to Km and Vmax, and give two worked examples.',
      pitfall:
        "Confusing it with allosteric inhibition because both are reversible. An allosteric inhibitor binds away from the catalytic site, changes the protein's conformation, and cannot be outcompeted by more substrate; a competitive inhibitor can.",
      subject: 'fnd',
      primary: 'DIS-BIO-T02',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Enzymes',
      type: 'mechanism',
    },
    {
      key: 'enzyme-definition-common-features-and-terminology',
      label:
        'Enzymes are protein biocatalysts, produced by living cells, needed in tiny amounts, unchanged by the reaction, and highly specific for the substrate they act on',
      definition:
        'Enzymes are biocatalysts that regulate the rate of biochemical reactions. All are produced by living cells and can act outside these cells; they are needed in very small amounts; they accelerate the reaction without affecting its equilibrium point; they are mainly protein in nature, though some RNAs have catalytic activity (ribozymes); they are not changed chemically by the end of the reaction; and they are highly specific, acting on a specific substrate or inter-related substrates. The substance an enzyme recognises and reacts with is called its substrate.',
      objective:
        "List the common features that define an enzyme (produced by living cells, needed in small amounts, does not shift equilibrium, mainly protein, chemically unchanged at the end, highly specific), and name 'substrate' as the term for the molecule an enzyme acts on.",
      pitfall:
        'Assuming an enzyme is consumed or altered by the reaction it catalyses, or that it is needed in large amounts like a typical reactant. The book is explicit on both: enzymes are needed in very small amounts and are not changed chemically by the end of the reaction — an enzyme molecule can be used again.',
      subject: 'fnd',
      primary: 'DIS-BIO-T02',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Enzymes',
      type: 'definition',
      aliases: ['Biocatalyst', 'Substrate', 'Enzyme specificity'],
    },
    {
      key: 'enzyme-active-site-lowers-activation-energy',
      label: "The enzyme's active site catalyses the reaction by lowering the activation energy, without changing the reaction's equilibrium or free energy change",
      definition:
        "The active site is a special pocket or cleft on the enzyme molecule, containing amino acid chains that create a three-dimensional surface complementary to the substrate; it is where the substrate binds and the reaction is catalysed. For reactants to convert to products a minimum amount of energy, the activation energy, is required. The enzyme accelerates the reaction by lowering this activation energy, without affecting the equilibrium of the reaction — it does not affect the free energy change (ΔG) of the reaction, and so does not change the reaction's equilibrium.",
      objective: "State that the active site catalyses the reaction by lowering activation energy, and that this leaves the reaction's equilibrium and free energy change unaffected.",
      pitfall:
        "Describing the general mechanism of enzyme action in terms of pH rather than activation energy. The book's account of the thermodynamic basis of catalysis is specifically about lowering activation energy; pH is instead one of the separate factors that affects the rate of an already-catalysed reaction.",
      subject: 'fnd',
      primary: 'DIS-BIO-T02',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Enzymes',
      type: 'mechanism',
      aliases: ['Active site', 'Activation energy', 'Enzyme mechanism'],
    },
    {
      key: 'michaelis-constant-km-definition-and-affinity-meaning',
      label: 'Km is the substrate concentration that gives half the maximal velocity, and a smaller Km means higher enzyme-substrate affinity',
      definition:
        'As substrate concentration [S] increases, reaction velocity rises toward a maximum value, Vmax, at which point the enzyme is saturated and enzyme concentration becomes the limiting factor. The substrate concentration that produces half the maximal velocity is termed the Michaelis constant, or Km. A smaller Km reflects a higher affinity of the enzyme for its substrate, and vice versa; because Km summarises this affinity in a single number, it is used to compare the catalytic efficiency of different enzymes for their substrates.',
      objective:
        "Define Km as the substrate concentration giving half of Vmax, and explain why a smaller Km value means higher enzyme-substrate affinity and is used to compare enzymes' catalytic efficiency.",
      pitfall:
        "Reading Km as half of the substrate concentration needed to reach Vmax, rather than as the substrate concentration that itself produces half of Vmax. The two phrasings sound similar but describe different quantities; the book's own definition is the latter.",
      subject: 'fnd',
      primary: 'DIS-BIO-T02',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Enzymes',
      type: 'mechanism',
      aliases: ['Km', 'Michaelis constant', 'Vmax', 'Enzyme-substrate affinity'],
    },
    {
      key: 'allosteric-enzyme-regulation-mechanism',
      label: "Allosteric effectors bind a site distinct from the catalytic site and change enzyme activity by producing a conformational change in the protein",
      definition:
        "Allosteric inhibitors and activators are usually small organic molecules that bind to a specific allosteric site away from the catalytic site, producing conformational changes in protein structure. Allosteric inhibitors decrease the enzyme's affinity for its substrate (increasing Km) or decrease its maximal catalytic activity (decreasing Vmax), or both; allosteric activators do the reverse, increasing affinity (decreasing Km) or increasing maximal activity (increasing Vmax), or both. A worked example the book gives is ATP acting as an allosteric inhibitor of phosphofructokinase-1, and AMP acting as its allosteric activator.",
      objective: "Explain that allosteric effectors act by binding a site distinct from the catalytic site and altering enzyme conformation, and give the book's ATP/AMP-on-PFK-1 example.",
      pitfall:
        'Confusing allosteric with competitive regulation because both can be reversible. A competitive inhibitor occupies the catalytic site itself and is defeated by more substrate; an allosteric effector binds an entirely separate site and works by reshaping the protein, which more substrate cannot reverse.',
      subject: 'fnd',
      primary: 'DIS-BIO-T02',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Enzymes',
      type: 'mechanism',
      aliases: ['Allosteric site', 'Allosteric inhibitor', 'Allosteric activator', 'Feedback inhibition'],
    },
    {
      key: 'irreversible-enzyme-inhibition-mechanisms',
      label:
        "Irreversible inhibitors permanently disable an enzyme, either by blocking its cofactor or by denaturing or chemically blocking groups on the apoenzyme — heavy-metal salts such as mercury inhibit by combining with the free sulfhydryl group",
      definition:
        'Irreversible enzyme inhibition, unlike competitive or allosteric inhibition, permanently disables the enzyme. It splits into inhibitors of cofactors (the non-protein part) — for example fluoride chelating the Ca2+/Mg2+ some enzymes require, or cyanide and carbon monoxide blocking the iron of haem in cytochrome oxidase — and inhibitors of the apoenzyme (the protein part), which include antienzymes, inhibitors that denature the protein outright (strong acids, alkalis, alcohols, and salts of heavy metals), and inhibitors that block a chemical group needed for activity. Among the chemical-group blockers, the positively charged heavy metal ions, such as Hg2+, combine irreversibly with the negatively charged sulfur of a free sulfhydryl (SH) group that is important for many enzymes\' catalytic activity.',
      objective: 'Classify irreversible enzyme inhibition into cofactor-inhibitors and apoenzyme-inhibitors, and name heavy-metal ions such as mercury as inhibitors that irreversibly block a catalytically important sulfhydryl group.',
      pitfall:
        "Assuming any drug or agent named alongside enzyme inhibition must be irreversible. The book's own worked examples of allopurinol and sulfonamides are explicitly reversible, competitive inhibitors — irreversible inhibition is reserved for agents that permanently chelate a cofactor, denature the protein outright, or block an essential chemical group, as mercury does to the SH group.",
      subject: 'fnd',
      primary: 'DIS-BIO-T02',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Enzymes',
      type: 'mechanism',
      aliases: ['Irreversible inhibition', 'Sulfhydryl group inhibitors', 'Heavy metal enzyme poisons'],
    },
    {
      key: 'zymogen-activation-and-autocatalysis',
      label:
        'A zymogen (proenzyme) is an inactive enzyme precursor, activated by proteolysis that removes the part of the chain masking the active site — pepsinogen becoming pepsin is the book\'s autocatalytic example',
      definition:
        "Many enzymes are first formed as inactive proenzymes or zymogens. Activation requires proteolysis — removal of a part of the polypeptide chain that masks the active or substrate site. A good example is the digestive proteolytic enzymes, formed as zymogens inside the cells that produce them (to prevent digestion of the cells' own proteins) and activated once released into the gut; many of these activated enzymes can then activate their own zymogens further, a process termed autocatalytic activation. The book's worked example is pepsinogen, converted by HCl into pepsin plus a polypeptide fragment, in an autocatalytic reaction. Blood clotting factors are the book's other example, formed as zymogens and activated by specific proteases.",
      objective: "Define a zymogen/proenzyme as an inactive enzyme precursor activated by proteolysis, and give pepsinogen-to-pepsin as the book's autocatalytic worked example.",
      pitfall:
        'Naming the active enzyme itself, such as pepsin or trypsin, as the proenzyme. The proenzyme is specifically the inactive precursor form — pepsinogen, not pepsin — before proteolysis removes the part of the chain that masks the active site.',
      subject: 'fnd',
      primary: 'DIS-BIO-T02',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Enzymes',
      type: 'mechanism',
      aliases: ['Zymogen', 'Proenzyme', 'Pepsinogen', 'Autocatalytic activation'],
    },
    {
      key: 'covalent-phosphorylation-modification-of-enzymes',
      label:
        'Reversible phosphorylation/dephosphorylation is a covalent modification, catalysed by protein kinase and protein phosphatase, that can activate or inactivate an enzyme depending on which enzyme it is',
      definition:
        'Many enzymes are activated by phosphorylation and inactivated by dephosphorylation, or vice versa, existing in two interconvertible forms. This is a covalent modification: protein kinase transfers a phosphate group from ATP (with Mg2+) onto the hydroxyl group of an amino acid residue — mainly serine or tyrosine — of the polypeptide chain, producing the phosphorylated enzyme and ADP; protein phosphatase reverses this, releasing inorganic phosphate (Pi) and water to regenerate the dephosphorylated enzyme. Whether phosphorylation switches a given enzyme on or off depends on the enzyme — the book\'s examples are glycogen phosphorylase kinase, which phosphorylation activates, and glycogen synthase, which phosphorylation inactivates.',
      objective:
        'Describe phosphorylation/dephosphorylation as a reversible covalent modification carried out by protein kinase and protein phosphatase on the hydroxyl group of a serine or tyrosine residue, noting it can activate or inactivate different enzymes.',
      pitfall:
        "Assuming phosphorylation always has the same effect on every enzyme, or that it is a non-covalent, one-way change. The book's own examples show it can activate one enzyme (glycogen phosphorylase kinase) and inactivate another (glycogen synthase), and it is explicitly reversible and covalent, catalysed by dedicated kinase and phosphatase enzymes on opposite sides of the same reaction.",
      subject: 'fnd',
      primary: 'DIS-BIO-T02',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Enzymes',
      type: 'mechanism',
      aliases: ['Phosphorylation', 'Dephosphorylation', 'Protein kinase', 'Protein phosphatase', 'Covalent modification'],
      gaps: [
        "The book names serine or tyrosine as the residues that carry the phosphate group; it never mentions threonine. The bank's option wording (\"serine and threonine residues\") does not exactly match the book's own naming, though it remains the only option among the four describing a real, book-taught mechanism.",
      ],
    },
  ],

  questions: [
    {
      key: 'MCQ-102-07f0a0ff-p45-q1',
      conceptKey: 'enzyme-definition-common-features-and-terminology',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'Name substrate as the substance an enzyme recognises and reacts with.',
      explanations: {
        a: 'A cofactor is the non-protein part some enzymes need to be active (forming a holoenzyme with the apoenzyme) — it is not the substance the enzyme acts on.',
        b: "An activator increases enzyme activity, but it is not the book's term for the substance an enzyme recognises and reacts with.",
        c: 'Correct. The book states enzymes interact with a specific substrate or inter-related substrates — this recognised substance is the substrate.',
        d: 'A product is what the substrate becomes after the reaction, not what the enzyme originally recognises and reacts with.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p45-q2',
      conceptKey: 'enzyme-definition-common-features-and-terminology',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'State that enzymes are mainly protein in nature.',
      explanations: {
        a: 'Enzymes are not lipids; the book places them among the proteins, structurally built like any other protein.',
        b: "Carbohydrates play no catalytic role in the book's account of enzymes; enzymes are proteins.",
        c: "Phospholipids are membrane-building molecules, unrelated to the book's classification of enzymes as protein in nature.",
        d: 'Correct. The book states enzymes are mainly protein in nature (though it notes some RNAs, ribozymes, also have catalytic activity).',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p45-q3',
      conceptKey: 'enzyme-definition-common-features-and-terminology',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: "Identify 'produced by living cells' as one of the book's common features of enzymes.",
      explanations: {
        a: "Correct. The book's list of common features opens with: all enzymes are produced by living cells and can act outside these cells.",
        b: 'Reverses a listed feature. The book says enzymes accelerate the reaction without affecting its equilibrium point — they do not affect the equilibrium at all.',
        c: 'Reverses a listed feature. The book says enzymes are not changed chemically by the end of the reaction.',
        d: 'Reverses a listed feature. The book says enzymes are needed in very small amounts, not large ones.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p45-q4',
      conceptKey: 'enzyme-definition-common-features-and-terminology',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'State that enzymes, as proteins, are polymers of amino acids.',
      explanations: {
        a: 'Fatty acids are the building blocks of lipids, not of enzymes, which the book classes as protein in nature.',
        b: 'Correct. Since the book classes enzymes as mainly protein in nature, they are, like any protein, built as polymers of amino acids.',
        c: 'Hexose sugars are the building blocks of polysaccharides, not proteins — enzymes are not carbohydrate polymers.',
        d: 'Inorganic phosphate can be a cofactor component for some enzymes, but it is not what the enzyme protein itself is built from.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p45-q5',
      conceptKey: 'enzyme-active-site-lowers-activation-energy',
      difficulty: 'Easy',
      questionType: 'Mechanism',
      learningObjective: 'State that the active site is where the enzyme catalyses the reaction.',
      explanations: {
        a: 'The active site is where the substrate binds, not somewhere remote from it — the book describes it as the pocket where the enzyme-substrate complex forms.',
        b: 'It is the substrate, not the active site, that is converted to product; the active site itself is unchanged and available for a new substrate afterward.',
        c: "Correct. The book's own diagram of enzyme mechanism states the active site lowers the activation energy and speeds up the reaction — it is where catalysis happens.",
        d: "Reverses the book's mechanism. The enzyme lowers, not increases, the activation energy of the reaction.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p45-q6',
      conceptKey: 'enzyme-definition-common-features-and-terminology',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: "Distinguish 'substrate' (the reacting molecule) from cofactor, coenzyme and isozyme.",
      explanations: {
        a: "Correct. The book's terminology names the molecule an enzyme recognises and reacts with the substrate.",
        b: 'A cofactor is the non-protein part of a holoenzyme (metal ion or coenzyme) required for activity — not the reacting molecule the enzyme acts upon.',
        c: 'A coenzyme is one type of cofactor, a small organic co-substrate or prosthetic group — still part of the enzyme system, not the substrate being acted on.',
        d: 'An isozyme is one of multiple structural forms of the same enzyme; the term has nothing to do with the reacting molecule.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p45-q7',
      conceptKey: 'enzyme-active-site-lowers-activation-energy',
      difficulty: 'Easy',
      questionType: 'Mechanism',
      learningObjective: 'State that the general mechanism of enzyme action is lowering the activation energy of the reaction.',
      explanations: {
        a: 'Correct. The book states the enzyme accelerates the reaction by lowering the energy of activation, without affecting the equilibrium of the reaction.',
        b: "Reverses the book's mechanism — the enzyme lowers, not raises, the activation energy.",
        c: 'pH is one of the separate factors that affects the rate of an already-catalysed reaction; it is not itself the general mechanism by which an enzyme achieves catalysis.',
        d: 'As with decreasing pH, changing pH is a factor that modulates reaction rate, not the book\'s account of how catalysis itself works.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p46-q8',
      conceptKey: 'excluded.enzymes.option-set-corrupted-by-ocr',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option set corrupted by OCR (bank itself flags "option ran on"). Option (d)\'s legitimate content, "The active site is flexible and adjusts to substrate," runs directly into an unrelated question\'s stem and options about holoenzyme formation ("...a, xnae is produced by combination of apoenzyme and cofactor. a) Enzyme product complex b) Enzyme substrate complex"), and option (e), "Holoenzyme d) Prosthetic group," is nothing but that other question\'s remaining two choices. There is no genuine, readable fourth or fifth option left for this stem to be sat against.',
    },
    {
      key: 'MCQ-102-07f0a0ff-p46-q10',
      conceptKey: 'factors-affecting-enzyme-reaction-rate',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: "Name temperature, substrate concentration and pH together as factors affecting enzyme activity, among the book's full five-factor list.",
      explanations: {
        a: 'True but incomplete — temperature is only one of the several factors the book names; the question asks for the set of factors affecting enzyme activity.',
        b: 'True but incomplete on its own — substrate concentration is one factor among several (also enzyme concentration, cofactor concentration, temperature and pH) that the book discusses together.',
        c: 'True but incomplete — pH is one factor among several the book discusses together, not the sole one.',
        d: "Correct. The book discusses substrate concentration, enzyme concentration, cofactor concentration, temperature and pH together as the factors affecting the rate of an enzyme-catalysed reaction; this option is the only one that groups more than one of them together, matching the book's own multi-factor treatment.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p46-q13',
      conceptKey: 'michaelis-constant-km-definition-and-affinity-meaning',
      difficulty: 'Moderate',
      questionType: 'Definition',
      learningObjective: 'Define Km precisely as the substrate concentration producing half of Vmax, distinguishing it from the similar-sounding but different half-of-[S]-at-Vmax phrasing.',
      explanations: {
        a: 'Correct. The book defines Km as the substrate concentration that produces half the maximal velocity (Vmax).',
        b: "The book never defines Km as a dissociation constant for the enzyme-substrate complex; its own definition is purely in terms of the substrate concentration at half-maximal velocity.",
        c: 'Km describes a substrate concentration, not an enzyme concentration — the two are separate axes in the book\'s velocity curves.',
        d: "Sounds like the correct definition but inverts it: this describes half of the substrate concentration needed to reach Vmax, not the substrate concentration that itself produces half of Vmax — the book's definition is the latter.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p46-q14',
      conceptKey: 'michaelis-constant-km-definition-and-affinity-meaning',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'State that Km value is used to compare the catalytic efficiency of different enzymes.',
      explanations: {
        a: 'Product formation alone does not standardise for substrate concentration or enzyme concentration, so it cannot compare catalytic efficiency the way a single Km value can.',
        b: "Correct. The book states that a smaller Km reflects higher affinity of the enzyme for its substrate, and vice versa — this makes Km a direct way to compare different enzymes' catalytic efficiency.",
        c: 'The book never links molecular size to catalytic efficiency; efficiency is discussed purely in terms of Km (affinity) and Vmax.',
        d: "Optimum pH is a separate factor affecting reaction rate, not the book's measure for comparing catalytic efficiency between enzymes.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p47-q15',
      conceptKey: 'factors-affecting-enzyme-reaction-rate',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'Explain the plateau of a velocity-vs-substrate-concentration curve as enzyme saturation, past which enzyme concentration is the limiting factor.',
      explanations: {
        a: "Correct. The book states that as [S] increases, velocity rises up to the point where the enzyme is saturated — beyond that point (here, substrate concentrations greater than X) enzyme concentration, held constant in this experiment, becomes the limiting factor.",
        b: "Velocity plateaus near Vmax past saturation; it does not fall toward zero — the book's substrate-concentration curve rises to a maximum and levels off, it does not descend.",
        c: "The book's account of this curve is saturation of the enzyme, not an inhibitory effect of the substrate itself — inhibition is a separate topic from ordinary substrate saturation.",
        d: 'The book does not describe product inhibition as part of the substrate-concentration-versus-velocity relationship; the plateau here is explained by enzyme saturation, not by products building up and acting back on the enzyme.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p47-q17',
      conceptKey: 'competitive-enzyme-inhibition-mechanism',
      difficulty: 'Easy',
      questionType: 'Mechanism',
      learningObjective: "Identify competitive inhibition as the type that works by blocking the enzyme's active site.",
      explanations: {
        a: "'Non-competitive inhibition' is not a category this chapter names; the book's two reversible categories are competitive and allosteric.",
        b: 'Allosteric inhibitors bind a site away from, not at, the catalytic (active) site — the opposite of what this question describes.',
        c: 'Correct. The book defines a competitive inhibitor as one that competes with the substrate to bind reversibly at the active (catalytic) site — directly blocking it.',
        d: "Feedback inhibition works through binding of a pathway's end product to an allosteric site on a regulatory enzyme, not by blocking the active site directly.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p47-q18',
      conceptKey: 'competitive-enzyme-inhibition-mechanism',
      difficulty: 'Easy',
      questionType: 'Mechanism',
      learningObjective: 'Identify structural resemblance to the substrate as the defining feature of a competitive inhibitor.',
      explanations: {
        a: "An allosteric inhibitor need not resemble the substrate at all — it acts by binding a separate site and reshaping the enzyme, not by mimicking the substrate's shape.",
        b: 'Correct. The book defines a competitive inhibitor as structurally similar to the substrate, competing with it for the active site.',
        c: 'Feedback inhibition is defined by an end product of a pathway acting back on an earlier enzyme in that same pathway, not by structural resemblance to any one substrate.',
        d: "'Non-competitive inhibition' is not one of the book's named categories.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p47-q19',
      conceptKey: 'competitive-enzyme-inhibition-mechanism',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'State that a competitive inhibitor increases the apparent Km while leaving Vmax unaffected.',
      explanations: {
        a: 'Correct. The book states a competitive inhibitor increases the apparent Km for a given substrate, since more substrate is then needed to reach half of Vmax.',
        b: "The book is explicit that Vmax is unaffected by a competitive inhibitor — raising [S] enough always lets the reaction reach the same Vmax as without inhibitor.",
        c: 'The book states Vmax is unchanged by a competitive inhibitor, neither raised nor lowered — only the apparent Km changes.',
        d: "Reverses the book's rule. A competitive inhibitor increases, not decreases, the apparent Km.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p48-q20',
      conceptKey: 'allosteric-enzyme-regulation-mechanism',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'State that an allosteric effector binds a site on the enzyme distinct from the catalytic site.',
      explanations: {
        a: 'Covalent modification (phosphorylation/dephosphorylation) is a separate regulatory mechanism the book describes; allosteric regulation instead works through binding at a distinct site.',
        b: "The allosteric effector binds the enzyme, not the substrate — it is the enzyme's, not the substrate's, conformation that changes.",
        c: 'Competing for the catalytic site is exactly what a competitive inhibitor does; the book defines allosteric effectors as binding a site away from the catalytic site instead.',
        d: 'Correct. The book states allosteric inhibitors and activators bind to a specific site away from the catalytic site, producing conformational changes in the protein structure.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p48-q21',
      conceptKey: 'irreversible-enzyme-inhibition-mechanisms',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: "Identify a heavy-metal ion such as mercury as an irreversible enzyme inhibitor, as against the book's reversible, competitive examples.",
      explanations: {
        a: 'The book does not discuss statins anywhere in this chapter; among the options, only mercury matches a mechanism the book actually classes as irreversible.',
        b: "Allopurinol is the book's own worked example of a competitive (reversible) inhibitor — a structural analogue of hypoxanthine that competes for the active site of xanthine oxidase.",
        c: 'Correct. The book classes salts of heavy metals, such as Hg2+, as irreversible inhibitors: the positively charged metal ion combines with the negatively charged sulfur of a free SH group needed for catalytic activity.',
        d: "Sulfonamides are the book's other worked example of a competitive (reversible) inhibitor — structural analogues of PABA that block bacterial folate synthesis.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p48-q22',
      conceptKey: 'excluded.enzymes.iodoacetate-not-in-book',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        "Not taught in the module book. Iodoacetate is never mentioned anywhere in this chapter's physical p54-p65 text — the book names oxidizing agents and salts of heavy metals as SH-group-blocking irreversible inhibitors, but never iodoacetate specifically. The printed key is correct by outside biochemistry (iodoacetate does alkylate free SH groups), but nothing in this book supports writing that mechanism for a student, so it cannot be adjudicated from the source this lane is restricted to.",
    },
    {
      key: 'MCQ-102-07f0a0ff-p48-q23',
      conceptKey: 'zymogen-activation-and-autocatalysis',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'Define a zymogen (proenzyme) as an inactive enzyme precursor.',
      explanations: {
        a: 'A zymogen is not a signalling molecule secreted by a gland; the book defines it strictly as an inactive form of an enzyme.',
        b: "Vitamins are unrelated to the book's account of zymogens; a zymogen is a form of the enzyme protein itself, not a dietary cofactor.",
        c: 'Correct. The book states that many enzymes are formed in the form of proenzymes or zymogens, which are inactive — a zymogen is an enzyme precursor.',
        d: "'Modulator' suggests something that adjusts an already-active enzyme's rate; a zymogen instead is not active at all until proteolysis switches it on.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p48-q24',
      conceptKey: 'zymogen-activation-and-autocatalysis',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: "Identify pepsinogen as the book's example of a proenzyme (zymogen).",
      explanations: {
        a: "Correct. The book's own worked example of a zymogen is pepsinogen, which HCl converts to pepsin plus a polypeptide fragment in an autocatalytic reaction.",
        b: 'Trypsin is the active, already-proteolysed enzyme — not the inactive precursor form the question asks for.',
        c: "Chymotrypsin, like trypsin, is an active digestive enzyme; its inactive zymogen form (chymotrypsinogen) is not named in this chapter's text.",
        d: 'Lysine is an amino acid, not an enzyme or a zymogen at all — unrelated to this fact.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p48-q25',
      conceptKey: 'covalent-phosphorylation-modification-of-enzymes',
      difficulty: 'Hard',
      questionType: 'Mechanism',
      learningObjective: "State that phosphorylation/dephosphorylation is a reversible covalent modification on a hydroxyl-bearing residue that can alter an enzyme's catalytic activity.",
      explanations: {
        a: "Best supported by the book, though the book's own wording names serine or tyrosine as the residues carrying the phosphate group (not threonine, as this option states) — of the four options, only this one describes a real, hydroxyl-residue-based covalent modification, and it is the only option not directly contradicted elsewhere in the text.",
        b: "Reverses the book's own section heading. Phosphorylation/dephosphorylation is presented under 'Covalent Modifications' — it is specifically a covalent, not non-covalent, change.",
        c: "Reverses the book's account. The enzyme exists in two interconvertible forms — phosphorylated and dephosphorylated — precisely because the modification is reversible, undone by protein phosphatase.",
        d: "Reverses the book's account directly. Phosphorylation activates some enzymes (e.g. glycogen phosphorylase kinase) and inactivates others (e.g. glycogen synthase) — it very much affects catalytic activity.",
      },
    },
  ],
}
