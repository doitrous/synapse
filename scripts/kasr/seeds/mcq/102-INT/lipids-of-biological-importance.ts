/**
 * `102 INT > Biochemistry > Lipids of Biological Importance` — the question
 * books' MCQs.
 *
 * Thirty-seven rows, all thirty-seven sittable. Six of them arrived with no
 * usable printed key (`correctSource: "none"` or the two OCR passes reading
 * the key differently) but the department book's own text on physical pages
 * 28-39 (`scripts/kasr/extract/pagetext/src_a488633802ec053c6325.json`)
 * settles every one of them without needing outside knowledge, so each
 * carries an `answerOverride` with the page citation rather than an
 * exclusion. One more (double bonds in arachidonic acid) has a corrupted
 * option `a` ("|") but the book's own structural formula for arachidonic
 * acid still settles the answer, so it stays in rather than being dropped.
 *
 * Fifteen concepts are minted fresh from this chapter's own text; three more
 * — `eicosanoid-synthesis-pathway-enzymes`, `cholesterol-importance-and-derivatives`
 * and `membrane-fluidity-determinants` — are reused verbatim from the
 * existing 102 INT biochemistry concept catalogue
 * (`docs/Kasr-Source-Imports/concept/102-INT-concepts.md`), because rows here
 * test exactly the facts those concepts already state.
 */
import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Lipids of Biological Importance',
  modulePath: '102 INT > Biochemistry > Lipids of Biological Importance',
  articleId: 'ART-102-BIO-LIPIDS-OF-BIOLOGICAL-IMPORTANCE',

  concepts: [
    {
      key: 'fatty-acid-saturation-classification-sources-and-biomedical-effects',
      label:
        'Fatty acids are saturated (no double bonds, e.g. palmitic and stearic acid) or unsaturated; trans fatty acids come mainly from partially hydrogenated vegetable oils like margarine and worsen hypercholesterolemia the way saturated fat does',
      definition:
        'Fatty acids are classified by the existence of double bonds into saturated fatty acids (SFA), which contain none — acetic, butyric, palmitic and stearic acid are examples, with palmitic and stearic the most important, widely distributed in animal fats from whole milk, milk products, fatty meats, coconut oil and palm oil — and unsaturated fatty acids, which contain one or more. Increased intake of saturated fatty acids may raise plasma cholesterol and predispose to atherosclerosis and coronary heart disease. Unsaturated fatty acids are further split by the orientation of their hydrogens into trans fatty acids, solid at room temperature, whose main dietary source is partially hydrogenated vegetable oils such as margarine (present in many baked foods, frozen pizza and fried foods), and cis fatty acids, liquid at room temperature and found in natural foods. Trans fatty acids compete with essential fatty acids, may worsen essential fatty acid deficiency, and — because they are structurally similar to saturated fatty acids — can worsen hypercholesterolemia and atherosclerosis.',
      objective:
        'Classify a named fatty acid as saturated or unsaturated, name margarine as the main dietary source of trans fat, and state the shared cardiovascular risk of saturated and trans fatty acids.',
      pitfall:
        "Assuming trans fat is simply a kind of unsaturated (and therefore 'healthy') fat because it has a double bond. The book groups it with saturated fat by its biomedical effect: both are structurally straight enough to worsen hypercholesterolemia and atherosclerosis.",
      subject: 'fnd',
      primary: 'DIS-BIO-T04',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Lipids of Biological Importance',
      type: 'classification',
    },
    {
      key: 'fatty-acid-omega-family-classification-and-arachidonic-acid-structure',
      label:
        'Cis fatty acids split into monoenoic (one double bond, e.g. oleic acid) and polyenoic/PUFA (more than one, the ω3 family such as α-linolenic acid and the ω6 family such as linoleic and arachidonic acid, the last of which carries four double bonds)',
      definition:
        'Cis fatty acids are classified by their number of double bonds into monoenoic acids, with one double bond (e.g. palmitoleic acid ω7, oleic acid ω9), and polyenoic acids, with more than one — the polyunsaturated fatty acids (PUFA) — which include two important families: ω3 PUFA, such as linolenic (α-linolenic) acid, and ω6 PUFA, such as linoleic acid and arachidonic acid. Arachidonic acid\'s structure, CH3.(CH2)4.(CH=CH.CH2)4.(CH2)2.COOH, carries four cis double bonds. Cis fatty acids are found in nuts, plant oils (olive, sunflower, cottonseed, corn, flaxseed) and fish oil, and their intake may reduce atherosclerosis and cardiovascular disease by lowering plasma cholesterol and triacylglycerol, lowering blood pressure and decreasing the tendency to intravascular thrombosis.',
      objective:
        "Assign a named fatty acid to its omega family (ω3, ω6) and to monoenoic or polyenoic status, and count arachidonic acid's double bonds from its structure.",
      pitfall:
        "Treating 'polyunsaturated' as a single family. The book splits PUFA into two distinct families, ω3 and ω6, by where the first double bond sits counting from the terminal methyl carbon, and a fatty acid belongs to only one of them.",
      subject: 'fnd',
      primary: 'DIS-BIO-T04',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Lipids of Biological Importance',
      type: 'classification',
    },
    {
      key: 'eicosanoid-synthesis-pathway-enzymes',
      label:
        'Eicosanoid synthesis runs from membrane phospholipid through phospholipase A2 to arachidonic acid, which prostaglandin H synthase turns into the cyclic products and lipoxygenase into the acyclic ones',
      definition:
        'Eicosanoids are C20 polyunsaturated fatty acid derivatives. Phospholipase A2 liberates arachidonic acid from membrane phospholipids. Prostaglandin H synthase, which carries both cyclooxygenase and peroxidase activity, converts arachidonic acid into the cyclic compounds — prostaglandins, prostacyclins and thromboxanes. Lipoxygenase converts it into the acyclic compounds, the leukotrienes and lipoxins.',
      objective:
        'Name the three enzymes of the eicosanoid pathway and say which class of eicosanoid each one produces.',
      pitfall:
        'Treating cyclooxygenase and prostaglandin H synthase as two different enzymes at two points of the pathway. Cyclooxygenase is one of the two catalytic activities of prostaglandin H synthase; peroxidase is the other.',
      subject: 'fnd',
      primary: 'DIS-BIO-T04',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Lipids of Biological Importance',
      type: 'mechanism',
    },
    {
      key: 'essential-fatty-acid-definition-sources-and-deficiency',
      label:
        'Essential fatty acids — α-linolenic and linoleic acid, plus arachidonic acid when linoleic is absent — cannot be made by the body and must come from the diet; their deficiency is rare but causes dermatitis, fatty liver and growth retardation',
      definition:
        "Essential fatty acids are not synthesised in the body, so they must be taken in the diet; they include α-linolenic acid and linoleic acid. Arachidonic acid is normally synthesised in the body from linoleic acid, but in linoleic acid's absence it too is considered essential. Essential fatty acids form healthy cell membranes, provide arachidonic acid for eicosanoid synthesis, and are components of lipotropic factors. Non-essential fatty acids include all other fatty acids, formed in the body in good amounts mainly from carbohydrates, so stearic acid — a saturated fatty acid — is both saturated and non-essential. Deficiency of essential fatty acids is rare and causes dermatitis, fatty liver, and growth retardation, especially in children.",
      objective:
        'Name the essential fatty acids, explain why arachidonic acid is only conditionally essential, and list the effects of essential fatty acid deficiency.',
      pitfall:
        "Assuming every polyunsaturated fatty acid is essential. Arachidonic acid is a PUFA the body normally makes for itself from linoleic acid, so it only counts as essential when its precursor is missing from the diet.",
      subject: 'fnd',
      primary: 'DIS-BIO-T04',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Lipids of Biological Importance',
      type: 'classification',
    },
    {
      key: 'lipid-three-way-classification-simple-compound-derived',
      label:
        'Lipids are classified by composition into simple lipids (fatty acid + alcohol only, e.g. triacylglycerol), compound lipids (fatty acid + alcohol + another group), and derived lipids (hydrolysis products such as free fatty acids and steroids, or substances associated with lipids in nature)',
      definition:
        'Lipids are classified into three main groups by composition. Simple lipids are esters of fatty acids with various alcohols. Compound lipids contain fatty acids and alcohol plus another group besides. Derived lipids are fat-soluble products of hydrolysis of the first two groups, or substances present in association with them in nature; the book lists fatty acids, alcohols, steroids, the fat-soluble vitamins (A, D, E, K) and carotenoids under this heading. Triacylglycerol (TAG) — three fatty acids esterified to glycerol — is the book\'s example of a simple lipid, and steroids are its example of a derived lipid.',
      objective:
        'Sort a named lipid into simple, compound or derived by what its composition adds beyond fatty acid and alcohol.',
      pitfall:
        "Assuming 'derived' means chemically complex. It instead means a hydrolysis product of the other two classes — free fatty acids and steroids are both derived lipids precisely because they are simpler pieces left over once a simple or compound lipid is broken down.",
      subject: 'fnd',
      primary: 'DIS-BIO-T04',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Lipids of Biological Importance',
      type: 'classification',
    },
    {
      key: 'simple-lipid-subtypes-neutral-fats-and-waxes',
      label:
        'Simple lipids split into neutral fats (triacylglycerol, three fatty acids on glycerol) and waxes (one fatty acid on a long-chain monohydroxy alcohol higher than glycerol, such as ceramide, cholesteryl esters, and vitamin A or D esters)',
      definition:
        "Simple lipids, esters of fatty acids with alcohol, split into two subgroups by which alcohol they use. Neutral fats (triacylglycerol, TAG) are esters of three fatty acids with glycerol; triglyceride is the book's other name for it. Waxes are esters of one fatty acid with a long-chain monohydroxy alcohol higher than glycerol, and the book's examples are ceramide (sphingosine alcohol conjugated with fatty acid), cholesteryl esters, vitamin A (retinol) esters and vitamin D (calciferol) esters.",
      objective:
        'Distinguish neutral fats from waxes by their alcohol (glycerol versus a longer-chain monohydroxy alcohol) and recognise the book\'s named wax examples.',
      pitfall:
        'Assuming cholesteryl esters must be a derived lipid because cholesterol itself is one. The book classes the ester specifically — fatty acid joined to a monohydroxy alcohol higher than glycerol — as a wax, a simple lipid, even though the alcohol it is built from (cholesterol) is separately a derived lipid on its own.',
      subject: 'fnd',
      primary: 'DIS-BIO-T04',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Lipids of Biological Importance',
      type: 'classification',
    },
    {
      key: 'phosphatidic-acid-structure-hydrolysis-and-derivatives',
      label:
        'Phosphatidic acid (diacylglycerol phosphate) carries a saturated fatty acid at position 1, an unsaturated fatty acid at position 2 and phosphoric acid at position 3 of glycerol, and hydrolysis at position 3 releases 1,2-diacylglycerol and phosphoric acid; lecithin and cephalin are both built on it',
      definition:
        'Phosphatidic acid, also called diacylglycerol phosphate, is a glycerophospholipid: on hydrolysis it yields one glycerol, one saturated fatty acid at position 1, one unsaturated fatty acid at position 2, and phosphoric acid at position 3. Because the phosphate sits at position 3, hydrolysing it away leaves 1,2-diacylglycerol and phosphoric acid. Glycerophospholipids include phosphatidic acid and its derivatives, among them lecithin (phosphatidic acid plus choline) and cephalin (phosphatidic acid plus ethanolamine) — so phosphatidic acid is present in both.',
      objective:
        "Reconstruct phosphatidic acid's substituent positions on glycerol and name the two hydrolysis products of removing its phosphate, and identify lecithin and cephalin as its derivatives.",
      pitfall:
        "Losing track of which position the phosphate occupies. Glycerol has only three carbons, so a diacylglycerol numbered anywhere but 1,2 (leaving position 3 for phosphate) contradicts the book's own numbering of phosphatidic acid's substituents.",
      subject: 'fnd',
      primary: 'DIS-BIO-T04',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Lipids of Biological Importance',
      type: 'structure_function_relationship',
    },
    {
      key: 'lecithin-structure-and-lung-surfactant-role',
      label:
        'Lecithin (phosphatidylcholine) provides choline for acetylcholine synthesis and, as dipalmitoyl-lecithin, is the main constituent of lung surfactant; the lecithin/sphingomyelin ratio of amniotic fluid marks fetal lung maturity',
      definition:
        'Lecithin, also called phosphatidylcholine, is formed of phosphatidic acid and choline. It provides choline for synthesis of the neurotransmitter acetylcholine. It is important as lung surfactant: surfactant, a material secreted naturally by pneumocytes, is formed mainly of dipalmitoyl-lecithin, and it reduces the tension between alveolar air and the alveolar membrane to allow O2/CO2 to cross; without it the alveolar membrane collapses, causing respiratory distress syndrome, particularly in premature infants. The lecithin/sphingomyelin ratio (L/S ratio) of amniotic fluid is a marker of fetal lung maturity.',
      objective:
        "Name lecithin as phosphatidylcholine, state dipalmitoyl-lecithin's role as the main constituent of lung surfactant, and identify the L/S ratio as a fetal lung maturity marker.",
      pitfall:
        "Confusing the L/S ratio's target organ. It reads fetal lung maturity, not kidney, brain or liver maturity — the ratio tracks lecithin, the surfactant lipid, against sphingomyelin as amniotic fluid's own internal reference.",
      subject: 'fnd',
      primary: 'DIS-BIO-T04',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Lipids of Biological Importance',
      type: 'structure_function_relationship',
    },
    {
      key: 'cardiolipin-mitochondrial-membrane-localization',
      label:
        'Cardiolipin (diphosphatidylglycerol) is two phosphatidic acid molecules joined by glycerol, found almost exclusively in the inner mitochondrial membrane, where it takes part in mitochondrial energy metabolism',
      definition:
        'Cardiolipins, also called diphosphatidylglycerol, are formed of two molecules of phosphatidic acid connected by a molecule of glycerol, so they contain four fatty acids, three glycerol units and two phosphates. They are found almost exclusively in the inner mitochondrial membrane and are involved in mitochondrial energy metabolism.',
      objective:
        "State cardiolipin's composition (two phosphatidic acids plus a connecting glycerol) and its near-exclusive location in the inner mitochondrial membrane.",
      pitfall:
        'Placing cardiolipin in the plasma membrane with the other phospholipids. The book restricts it almost exclusively to the inner mitochondrial membrane, tying it to mitochondrial energy metabolism rather than to general membrane structure.',
      subject: 'fnd',
      primary: 'DIS-BIO-T04',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Lipids of Biological Importance',
      type: 'structure_function_relationship',
    },
    {
      key: 'plasmalogen-ether-linkage-and-clinical-associations',
      label:
        'Plasmalogens resemble lecithin and cephalin but carry a fatty alcohol instead of a fatty acid at position 1 of the phosphatidic acid backbone; choline plasmalogen supplies platelet-activating factor, and reduced plasmalogen levels are associated with Alzheimer disease',
      definition:
        "Plasmalogens resemble lecithin and cephalin but contain a fatty alcohol instead of a fatty acid at position 1 of their phosphatidic acid — an ether-type linkage in place of the usual ester. Choline plasmalogen provides platelet-activating factor (PAF), making it essential for blood clotting. Plasmalogens are present in the nervous and cardiovascular systems, and their reduced levels have been associated with Alzheimer disease.",
      objective:
        'Identify plasmalogens by their fatty-alcohol-for-fatty-acid substitution at position 1, and state their association with platelet-activating factor and with Alzheimer disease.',
      pitfall:
        "Filing plasmalogens as glycolipids because 'ether phospholipid' sounds like a separate category. The book keeps them among the glycerophospholipids — built on phosphatidic acid, like lecithin and cephalin — distinguished only by that one substituent.",
      subject: 'fnd',
      primary: 'DIS-BIO-T04',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Lipids of Biological Importance',
      type: 'structure_function_relationship',
    },
    {
      key: 'sphingolipid-ceramide-and-sphingomyelin-formation',
      label:
        'Fatty acid joins sphingosine by an amide bond to form ceramide, and ceramide joined to phosphocholine forms sphingomyelin — a phospholipid found in the cell membranes of lung and brain, mainly the myelin sheath',
      definition:
        'Sphingomyelin is formed from sphingosine, an 18-carbon amino alcohol. Fatty acids link to sphingosine by an amide bond to form ceramide, which is then connected to phosphocholine to form sphingomyelin. Sphingomyelin sits in the cell membranes of the lungs and brain, mainly in the myelin sheath. Because it is classified, with the glycerophospholipids, under phospholipids (sphingomyelin is the phospholipid subgroup whose alcohol is sphingosine rather than glycerol), sphingomyelin itself is a phospholipid, not a glycolipid or simple lipid.',
      objective:
        'Trace the two-step assembly of sphingomyelin — fatty acid plus sphingosine to ceramide, ceramide plus phosphocholine to sphingomyelin — and classify sphingomyelin as a phospholipid.',
      pitfall:
        'Classing sphingomyelin as a glycolipid because it shares the ceramide backbone with cerebrosides and gangliosides. The book\'s classification turns on what is attached to ceramide: phosphocholine makes a phospholipid (sphingomyelin), a carbohydrate makes a glycolipid.',
      subject: 'fnd',
      primary: 'DIS-BIO-T04',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Lipids of Biological Importance',
      type: 'structure_function_relationship',
    },
    {
      key: 'membrane-fluidity-determinants',
      label:
        'Membrane fluidity is set by how closely the phospholipid tails can pack: a cis-double bond kinks the chain and keeps them apart, a saturated chain is straight and lets them pack, and cholesterol sits between them controlling the result',
      definition:
        'Phospholipids are amphipathic, with non-polar fatty acid side chains and polar head groups, and they are the important constituents of the lipid bilayer of the cell membrane. Increasing the unsaturated fatty acid content at carbon 2 of the phospholipids increases membrane fluidity, because the kinks produced by the cis-double bonds prevent the phospholipids from packing closely together. Saturated fatty acid chains carry no such kink, so they lie straight and pack closely, and closer packing means lower fluidity. Cholesterol is an important constituent of cell membranes that controls their fluidity, and it sits among the phospholipids of the bilayer.',
      objective:
        'Identify cholesterol and the saturated and unsaturated fatty acid chains on a bilayer diagram and explain, from chain shape and packing, why each raises or lowers fluidity.',
      pitfall:
        'Treating the double bond itself as what loosens the membrane. It is the geometry it imposes — a cis-double bond bends the chain, and a bent chain cannot lie flat against its neighbours; a trans-double bond leaves the chain straight and does not have the same effect.',
      subject: 'fnd',
      primary: 'DIS-BIO-T04',
      secondary: ['SYS-FND-T01-S01-M01'],
      modulePath: '102 INT > Biochemistry > Lipids of Biological Importance',
      type: 'structure_function_relationship',
    },
    {
      key: 'phosphatidylinositol-second-messenger-role',
      label:
        'Phosphatidylinositol acts as a second messenger to many chemical transmitters, hormones and growth factors',
      definition:
        'Phosphatidylinositol, formed of phosphatidic acid and inositol, acts as a second messenger to many chemical transmitters, hormones and growth factors.',
      objective: "State phosphatidylinositol's role as a second messenger.",
      pitfall:
        'Expecting the book to name inositol triphosphate and diacylglycerol as the specific messenger molecules. The book credits the second-messenger role to phosphatidylinositol itself, without separately naming the cleavage products a fuller biochemistry text would.',
      subject: 'fnd',
      primary: 'DIS-BIO-T04',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Lipids of Biological Importance',
      type: 'mechanism',
      gaps: [
        'The book does not break the second-messenger mechanism down into the inositol-triphosphate/diacylglycerol cleavage products a more detailed source would name; only phosphatidylinositol\'s overall role is stated.',
      ],
    },
    {
      key: 'glycolipid-classification-and-tissue-distribution',
      label:
        'Glycolipids — ceramide joined to a carbohydrate, including cerebrosides, sulfolipids and gangliosides — sit mainly in brain tissue, the myelin sheath and red cell membranes, where they form recognition receptors for hormones and other ligands',
      definition:
        'Glycolipids are formed of ceramide (sphingosine-fatty acid) and a carbohydrate radical; they include cerebrosides, sulfolipids (sulfatides) and gangliosides. They are found mainly in brain tissue, the myelin sheath and the cell membrane of red blood cells. They are components of cell membrane receptors for hormones and other ligands, providing recognition properties that let a cell communicate with its extracellular environment.',
      objective:
        'Name the three glycolipid types the book lists and state their shared ceramide-plus-carbohydrate composition and receptor role.',
      pitfall:
        'Assuming any lipid found in brain tissue is automatically a glycolipid. Sphingomyelin and plasmalogens are also concentrated in nervous tissue; what makes a glycolipid distinct is the carbohydrate radical joined to its ceramide.',
      subject: 'fnd',
      primary: 'DIS-BIO-T04',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Lipids of Biological Importance',
      type: 'classification',
    },
    {
      key: 'cholesterol-importance-and-derivatives',
      label:
        'Cholesterol matters because almost nothing else can be made without it — the bile acids, every steroid hormone and vitamin D3 all come from it, and it is the constituent that controls the fluidity of the cell membrane',
      definition:
        'Cholesterol is the most important animal sterol; free cholesterol contains 27 carbon atoms and it circulates either free or esterified with a fatty acid. It is converted into bile acids and bile salts in the liver. It is the precursor of all the steroid hormones — the sex hormones and the corticoids. It is oxidised in the liver into 7-dehydrocholesterol, which ultraviolet light converts into vitamin D3 in the skin. And it is an important constituent of cell membranes, controlling their fluidity. It is excreted mainly in the bile as bile salts.',
      objective:
        "Name the derivatives cholesterol gives rise to and state its structural role in the cell membrane.",
      pitfall:
        'Filing cholesterol only as the substance that causes atherosclerosis. Every steroid hormone, both bile acid classes and vitamin D3 are built from it, and a cell that could not make it would have no membrane worth the name.',
      subject: 'fnd',
      primary: 'DIS-BIO-T04',
      secondary: ['SYS-END-T01-S01'],
      modulePath: '102 INT > Biochemistry > Lipids of Biological Importance',
      type: 'classification',
    },
  ],

  questions: [
    {
      key: 'MCQ-102-07f0a0ff-p17-q1',
      conceptKey: 'fatty-acid-saturation-classification-sources-and-biomedical-effects',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Identify stearic acid as a saturated fatty acid, distinguishing it from the book\'s unsaturated examples.',
      answerOverride: 'b',
      answerOverrideReason:
        "The two OCR passes disagree on whether the printed key names (a) or (b); the department book resolves it directly — stearic acid is listed among the saturated fatty acids (p29: 'Stearic acid (C18) CH3-(CH2)16-COOH'), while oleic acid is listed among the monoenoic (unsaturated) acids (p30), so (b) is correct.",
      explanations: {
        a: "Oleic acid is the book's own example of a monoenoic (unsaturated) fatty acid, not a saturated one — it carries one cis double bond.",
        b: 'Correct. The book lists stearic acid among the saturated fatty acids, alongside acetic, butyric and palmitic acid — all with no double bonds.',
        c: "Linoleic acid is the book's ω6 polyunsaturated example, not a saturated fatty acid.",
        d: "Arachidonic acid is the book's ω6 polyunsaturated example with four double bonds, the opposite of saturated.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p17-q2',
      conceptKey: 'fatty-acid-saturation-classification-sources-and-biomedical-effects',
      difficulty: 'Moderate',
      questionType: 'Definition',
      learningObjective: 'Name palmitic acid as the most important/common saturated fatty acid in human tissue, alongside stearic acid.',
      explanations: {
        a: 'Correct. The book names palmitic acid, alongside stearic acid, as the most important saturated fatty acids, widely distributed in animal fats — the printed key identifies palmitic as the more common of the two in human tissue.',
        b: "Timnodonic acid (EPA) does not appear among the book's saturated fatty acid examples at all.",
        c: "Arachidonic acid is the book's polyunsaturated ω6 example, not a saturated fatty acid.",
        d: "Linoleic acid is the book's polyunsaturated ω6 example, not a saturated fatty acid.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p17-q3',
      conceptKey: 'fatty-acid-omega-family-classification-and-arachidonic-acid-structure',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: "Identify oleic acid as the book's monounsaturated (monoenoic) fatty acid example.",
      answerOverride: 'c',
      answerOverrideReason:
        "No OCR pass recovered a printed key; the book itself supplies the answer — oleic acid is listed as the book's monoenoic (one double bond) fatty acid example (p30), which is what 'monounsaturated' means, while palmitic and stearic are saturated and arachidonic is polyunsaturated.",
      explanations: {
        a: "Palmitic acid is one of the book's saturated fatty acid examples, with no double bond at all.",
        b: "Arachidonic acid is the book's polyunsaturated (four double bonds) example, not monounsaturated.",
        c: 'Correct. Oleic acid (ω9) is the book\'s monoenoic — one double bond — fatty acid example, which is what monounsaturated means.',
        d: "Stearic acid is one of the book's saturated fatty acid examples, with no double bond.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p17-q4',
      conceptKey: 'fatty-acid-saturation-classification-sources-and-biomedical-effects',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'Name margarine (partially hydrogenated vegetable oil) as the main dietary source of trans fatty acids.',
      explanations: {
        a: "Vegetables themselves are not named as a trans fat source; only small amounts of trans fat occur naturally (in butter), and the main dietary source the book names is processed — partially hydrogenated vegetable oil.",
        b: 'Correct. The book states the main source of trans fatty acids in the human diet is partially hydrogenated vegetable oils, giving margarine as its example.',
        c: "Ground nuts are a source of cis unsaturated fatty acids in the book's account, not the main dietary source of trans fat.",
        d: 'Fruits are not named as a source of trans fatty acids anywhere in the book.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p17-q5',
      conceptKey: 'fatty-acid-omega-family-classification-and-arachidonic-acid-structure',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: "Name α-linolenic acid as the book's ω3 PUFA example.",
      explanations: {
        a: "Linoleic acid is the book's ω6, not ω3, PUFA example.",
        b: 'Correct. The book lists linolenic (α-linolenic) acid under the ω3 PUFA family.',
        c: "Nervonic acid does not appear anywhere among the book's named fatty acids.",
        d: "Palmitic acid is a saturated fatty acid in the book's classification, with no double bonds to place it in any omega family.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p17-q6',
      conceptKey: 'fatty-acid-omega-family-classification-and-arachidonic-acid-structure',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: "Name linoleic acid as the book's ω6 PUFA example.",
      explanations: {
        a: 'Omega-3 is the family the book assigns to linolenic acid, not linoleic acid.',
        b: 'Correct. The book lists linoleic acid under the ω6 PUFA family, alongside arachidonic acid.',
        c: 'Monoenoic means one double bond; linoleic acid, a PUFA, carries more than one, so it is polyenoic, not monoenoic.',
        d: 'Linoleic acid is unsaturated (polyunsaturated, specifically), not saturated — the book lists it among the cis/PUFA fatty acids, not the saturated ones.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p18-q7',
      conceptKey: 'essential-fatty-acid-definition-sources-and-deficiency',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Identify α-linolenic acid as an essential fatty acid.',
      explanations: {
        a: 'Correct. The book names α-linolenic acid, alongside linoleic acid, as one of the fatty acids the body cannot synthesise and must obtain from the diet.',
        b: "Arachidonic acid is only conditionally essential in the book's account — the body normally makes it from linoleic acid, and it only becomes essential when linoleic acid is absent.",
        c: "Oleic acid is a monounsaturated fatty acid the body makes for itself; it is not one of the book's named essential fatty acids.",
        d: "Palmitic acid is a saturated, non-essential fatty acid in the book's account, made in the body mainly from carbohydrates.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p18-q8',
      conceptKey: 'essential-fatty-acid-definition-sources-and-deficiency',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Classify stearic acid as both saturated and non-essential.',
      explanations: {
        a: 'Correct. The book lists stearic acid among the saturated fatty acids, and non-essential fatty acids are defined as all fatty acids other than α-linolenic, linoleic (and conditionally arachidonic) acid — stearic acid is one of these, made in the body mainly from carbohydrates.',
        b: 'Stearic acid has no double bonds in the book\'s account, so "monounsaturated" is wrong regardless of the essential/non-essential half of the option.',
        c: "The book's named essential fatty acids are α-linolenic and linoleic acid (and conditionally arachidonic); stearic acid is not among them.",
        d: 'Stearic acid has no double bonds in the book\'s account, so "polyunsaturated" is wrong regardless of the essential/non-essential half of the option.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p18-q9',
      conceptKey: 'essential-fatty-acid-definition-sources-and-deficiency',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'List fatty liver as a stated consequence of essential fatty acid deficiency.',
      explanations: {
        a: 'Opacity of the cornea is not among the effects of essential fatty acid deficiency the book names — it lists dermatitis, fatty liver and growth retardation.',
        b: 'Correct. The book states deficiency of essential fatty acids causes dermatitis, fatty liver, and growth retardation, especially in children.',
        c: 'Spleen enlargement is not among the effects of essential fatty acid deficiency the book names.',
        d: 'Renal failure is not among the effects of essential fatty acid deficiency the book names.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p18-q11',
      conceptKey: 'fatty-acid-omega-family-classification-and-arachidonic-acid-structure',
      difficulty: 'Hard',
      questionType: 'Structure and function',
      learningObjective: "Count arachidonic acid's double bonds (four) from its structural formula.",
      answerOverride: 'd',
      answerOverrideReason:
        "No usable printed key survives ('none', and option (a)'s text is OCR-corrupted). The book's own structural formula for arachidonic acid, CH3.(CH2)4.(CH=CH.CH2)4.(CH2)2.COOH (p30), shows four (CH=CH) units, i.e. four double bonds.",
      explanations: {
        a: "This option's text did not survive the scan intact ('|'); read as a plausible original value it most likely intended '1', which is far below the four double bonds the book's own structural formula for arachidonic acid shows.",
        b: "Two double bonds undercounts the four (CH=CH.CH2) repeats the book's formula for arachidonic acid shows.",
        c: "Three double bonds undercounts the four (CH=CH.CH2) repeats the book's formula for arachidonic acid shows.",
        d: "Correct. The book's structural formula for arachidonic acid, CH3.(CH2)4.(CH=CH.CH2)4.(CH2)2.COOH, contains four (CH=CH.CH2) repeats — four double bonds — consistent with its ω6 polyunsaturated classification.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p18-q12',
      conceptKey: 'eicosanoid-synthesis-pathway-enzymes',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: "State that eicosanoids are C20 compounds, matching their arachidonic acid precursor.",
      explanations: {
        a: "18 carbons describes fatty acids like stearic, oleic or linoleic acid, not the C20 backbone the book gives eicosanoids.",
        b: 'Correct. The book defines eicosanoids as physiologically active compounds formed from C20 polyunsaturated fatty acids such as arachidonic acid.',
        c: "22 carbons is not the carbon count the book gives eicosanoids; it names C20 specifically, matching arachidonic acid.",
        d: "24 carbons describes a very-long-chain fatty acid in the book's chain-length classification, not the C20 eicosanoids.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p18-q14',
      conceptKey: 'lipid-three-way-classification-simple-compound-derived',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: "Identify triacylglycerol as the book's simple lipid example.",
      explanations: {
        a: "Lecithin is a compound lipid in the book's classification — a phospholipid, since it contains fatty acid, alcohol and a phosphate group.",
        b: "Fatty acid on its own is a derived lipid in the book's classification, a hydrolysis product, not a simple lipid (an ester).",
        c: 'Correct. The book gives triacylglycerol (neutral fat) as its example of a simple lipid — an ester of fatty acids with the alcohol glycerol, nothing more added.',
        d: "Steroids are derived lipids in the book's classification, not esters of fatty acid with alcohol at all.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p19-q15',
      conceptKey: 'simple-lipid-subtypes-neutral-fats-and-waxes',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: "Name 'neutral fats' as the book's other term for triacylglycerol/triglycerides.",
      explanations: {
        a: 'Sphingolipid is a different lipid family entirely, built on sphingosine rather than glycerol; it is not another name for triglyceride.',
        b: 'Lecithin is a specific phospholipid (phosphatidylcholine), a compound lipid, not another name for triglyceride.',
        c: "Correct. The book gives 'neutral fats' as the other name for triacylglycerol (TAG), the simple-lipid subtype built from three fatty acids on glycerol.",
        d: "Waxes are the simple lipid's other subtype — one fatty acid on a monohydroxy alcohol higher than glycerol — not another name for the three-fatty-acid triglyceride.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p19-q16',
      conceptKey: 'simple-lipid-subtypes-neutral-fats-and-waxes',
      difficulty: 'Moderate',
      questionType: 'Definition',
      learningObjective: 'Define waxes as esters of one fatty acid with a long-chain monohydroxy alcohol higher than glycerol.',
      explanations: {
        a: 'Neutral fats (TAG) use glycerol, not a longer-chain monohydroxy alcohol, and use three fatty acids, not one.',
        b: 'Correct. The book defines waxes exactly this way: esters of one fatty acid with a long chain monohydroxy alcohol higher than glycerol.',
        c: 'Sphingolipids are built on sphingosine joined to fatty acid by an amide bond, not an ester of fatty acid with a higher monohydroxy alcohol.',
        d: "Phospholipids add a phosphate group to a fatty-acid/alcohol ester; they are not defined by the alcohol being 'higher than glycerol'.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p19-q17',
      conceptKey: 'simple-lipid-subtypes-neutral-fats-and-waxes',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: "Recognise vitamin A esters as one of the book's named wax examples.",
      answerOverride: 'c',
      answerOverrideReason:
        "No printed key survives; the book's own list of wax examples names Vitamin A (retinol) esters directly (p32: 'b) Cholesteryl esters. c) Vitamin A (retinol) esters. d) Vitamin D (calciferol) esters'), unlike the other three options.",
      explanations: {
        a: "Triacylglycerol is the book's neutral-fat subtype of simple lipid, not its wax subtype.",
        b: "Cholesterol itself is a derived lipid (a sterol) in the book's classification; it is cholesteryl esters, not free cholesterol, that the book lists as a wax.",
        c: "Correct. The book's own list of wax examples names vitamin A (retinol) esters directly, alongside ceramide, cholesteryl esters and vitamin D esters.",
        d: "Lecithin is a compound lipid (phospholipid) in the book's classification, not a wax.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p19-q18',
      conceptKey: 'simple-lipid-subtypes-neutral-fats-and-waxes',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: "Identify cholesteryl esters as one of the book's wax examples.",
      explanations: {
        a: 'Correct. The book lists cholesteryl esters directly among its wax examples, alongside ceramide and the vitamin A/D esters.',
        b: 'Neutral fats are the triacylglycerol subtype of simple lipid — three fatty acids on glycerol — not cholesteryl esters.',
        c: "Compound lipids add a phosphate or carbohydrate group beyond fatty acid and alcohol; cholesteryl esters, a wax, are a simple lipid in the book's classification.",
        d: "Derived lipids are hydrolysis products such as free fatty acids and steroids; the book specifically files the ester form, cholesteryl esters, under waxes rather than derived lipids.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p19-q19',
      conceptKey: 'phosphatidic-acid-structure-hydrolysis-and-derivatives',
      difficulty: 'Moderate',
      questionType: 'Definition',
      learningObjective: "Name diacylglycerol phosphate as the book's synonym for phosphatidic acid.",
      explanations: {
        a: "Correct. The book names phosphatidic acid's parenthetical synonym directly: 'Phosphatidic acid (Diacylglycerol phosphate)'.",
        b: "Diphosphatidylglycerol is the book's name for cardiolipin, a different, larger molecule built from two phosphatidic acid units, not a synonym for phosphatidic acid itself.",
        c: 'Lipositol is not a term the book uses; phosphatidylinositol (phosphatidic acid plus inositol) is the closest related compound, but it is not called phosphatidic acid.',
        d: 'Cephalin is phosphatidic acid plus ethanolamine — a derivative of phosphatidic acid, not another name for it.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p19-q20',
      conceptKey: 'phosphatidic-acid-structure-hydrolysis-and-derivatives',
      difficulty: 'Hard',
      questionType: 'Structure and function',
      learningObjective: "Derive phosphatidic acid's hydrolysis products (1,2-diacylglycerol and phosphoric acid) from its stated substituent positions on glycerol.",
      explanations: {
        a: "Correct. The book places phosphoric acid at position 3 of phosphatidic acid's glycerol backbone, with the two fatty acids at positions 1 and 2; hydrolysing off that phosphate leaves 1,2-diacylglycerol and phosphoric acid.",
        b: "A 1,3-diacylglycerol would require the phosphate to sit at position 2, contradicting the book's own numbering, which places phosphoric acid at position 3 and the two fatty acids at positions 1 and 2.",
        c: "Glycerol has only three carbons, so a '4' position does not exist on it — this option is not consistent with the book's own glycerol-based structure for phosphatidic acid.",
        d: "Glycerol has only three carbons, so a '5' position does not exist on it — this option is not consistent with the book's own glycerol-based structure for phosphatidic acid.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p19-q21',
      conceptKey: 'phosphatidic-acid-structure-hydrolysis-and-derivatives',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Identify lecithin and cephalin as phosphatidic acid derivatives, distinct from the ceramide-based glycolipids.',
      explanations: {
        a: 'Correct. The book builds both lecithin (phosphatidic acid plus choline) and cephalin (phosphatidic acid plus ethanolamine) directly on phosphatidic acid, so it is present in both.',
        b: 'Cerebrosides are glycolipids, built from ceramide and a carbohydrate — the book does not build them from phosphatidic acid at all.',
        c: 'Gangliosides are glycolipids, built from ceramide and a carbohydrate radical, not from phosphatidic acid.',
        d: 'Gangliosides are glycolipids built from ceramide, not phosphatidic acid, so this pairing is wrong on the gangliosides half even though lecithin is correctly a phosphatidic acid derivative.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p19-q22',
      conceptKey: 'lecithin-structure-and-lung-surfactant-role',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: "Name phosphatidylcholine as lecithin's other name.",
      explanations: {
        a: "Correct. The book gives phosphatidylcholine directly as lecithin's other name.",
        b: 'Phosphatidylserine is phosphatidic acid plus serine, a separate glycerophospholipid from lecithin.',
        c: "Cardiolipin is the book's name for diphosphatidylglycerol, an unrelated, larger molecule built from two phosphatidic acid units.",
        d: 'Sphingomyelins are built on sphingosine, not glycerol, and are a separate phospholipid subgroup from lecithin.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p20-q24',
      conceptKey: 'lecithin-structure-and-lung-surfactant-role',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Name dipalmitoyl-lecithin as the main constituent of lung surfactant.',
      explanations: {
        a: 'Correct. The book states lung surfactant is formed mainly of dipalmitoyl-lecithin, secreted naturally by pneumocytes.',
        b: "Phosphatidylethanolamine (cephalin) is not the surfactant lipid the book names; its own stated role is increasing thrombin formation for blood clotting.",
        c: 'Ceramide is a sphingolipid building block, not the lipid the book credits with forming lung surfactant.',
        d: "Phosphatidylinositol's stated role in the book is as a second messenger, not as the main constituent of lung surfactant.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p20-q25',
      conceptKey: 'lecithin-structure-and-lung-surfactant-role',
      difficulty: 'Easy',
      questionType: 'Investigation',
      learningObjective: 'Identify the L/S ratio of amniotic fluid as a marker of fetal lung maturity.',
      explanations: {
        a: 'The book does not connect the L/S ratio to kidney maturity; it names fetal lung maturity specifically.',
        b: 'Correct. The book states the lecithin/sphingomyelin (L/S) ratio of amniotic fluid is a marker of fetal lung maturity.',
        c: 'The book does not connect the L/S ratio to brain maturity; it names fetal lung maturity specifically.',
        d: 'The book does not connect the L/S ratio to liver maturity; it names fetal lung maturity specifically.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p20-q26',
      conceptKey: 'cardiolipin-mitochondrial-membrane-localization',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Name cardiolipin as the phospholipid the book locates almost exclusively in the inner mitochondrial membrane.',
      explanations: {
        a: "Lecithin is a widely distributed membrane phospholipid in the book's account, not one singled out for the inner mitochondrial membrane specifically.",
        b: 'Cephalin is described by its role in blood clotting (increasing thrombin formation), not by a special inner-mitochondrial-membrane location.',
        c: 'Correct. The book places cardiolipins almost exclusively in the inner mitochondrial membrane, involved in mitochondrial energy metabolism.',
        d: "Ceramide is the sphingolipid backbone molecule, not a phospholipid the book places in the inner mitochondrial membrane.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p20-q27',
      conceptKey: 'plasmalogen-ether-linkage-and-clinical-associations',
      difficulty: 'Hard',
      questionType: 'Structure and function',
      learningObjective: "Identify plasmalogens as the phospholipid the book describes with a fatty-alcohol (ether-type) substitution.",
      answerOverride: 'c',
      answerOverrideReason:
        "No printed key survives ('none'). The book's own description of plasmalogens — a fatty alcohol in place of the usual fatty acid at position 1 of the phosphatidic acid backbone (p33) — is the ether-type linkage the question's 'ether phospholipid' names; the other three options are all glycolipids in the book's classification, built from ceramide and a carbohydrate, with no ether linkage described.",
      explanations: {
        a: "Gangliosides are glycolipids in the book's classification (ceramide plus carbohydrate), with no ether linkage described anywhere in the book.",
        b: "Sulfolipids are glycolipids in the book's classification (ceramide plus carbohydrate), with no ether linkage described anywhere in the book.",
        c: 'Correct. The book describes plasmalogens as carrying a fatty alcohol, rather than the usual fatty acid, at position 1 of the phosphatidic acid backbone — an ether-type substitution in place of the normal ester.',
        d: "Cerebrosides are glycolipids in the book's classification (ceramide plus carbohydrate), with no ether linkage described anywhere in the book.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p20-q28',
      conceptKey: 'plasmalogen-ether-linkage-and-clinical-associations',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: "Name plasmalogens as the phospholipid whose reduced levels the book associates with Alzheimer disease.",
      explanations: {
        a: "Cardiolipins' book-stated location is the inner mitochondrial membrane; the book does not associate them with Alzheimer disease.",
        b: "Lecithin's book-stated roles are as an acetylcholine precursor and lung surfactant component; the book does not associate it with Alzheimer disease.",
        c: 'Correct. The book states plasmalogens\' reduced levels have been associated with Alzheimer disease.',
        d: "Cephalin's book-stated role is increasing thrombin formation for blood clotting; the book does not associate it with Alzheimer disease.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p20-q29',
      conceptKey: 'sphingolipid-ceramide-and-sphingomyelin-formation',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: "Name fatty acid and sphingosine as ceramide's two building blocks.",
      explanations: {
        a: "Glycerol and glucose are not ceramide's building blocks in the book's account; ceramide comes from sphingosine and fatty acid.",
        b: "Fatty acid and choline combine (via phosphatidic acid) to make lecithin in the book's account, not ceramide, which needs sphingosine.",
        c: "Fatty acid and serine combine (via phosphatidic acid) to make phosphatidylserine in the book's account, not ceramide, which needs sphingosine.",
        d: "Correct (the trailing '17 (om' in this option's text is scanner noise, not part of the answer). The book states fatty acids link to sphingosine by an amide bond to form ceramide.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p21-q30',
      conceptKey: 'sphingolipid-ceramide-and-sphingomyelin-formation',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Name ceramide as the molecule that combines with phosphocholine to form sphingomyelin.',
      explanations: {
        a: "Pyruvate plays no role in the book's account of sphingomyelin formation.",
        b: "Serine is not what connects to phosphocholine in the book's account; serine instead combines with phosphatidic acid to form phosphatidylserine, an unrelated glycerophospholipid.",
        c: 'Correct. The book states ceramide is connected to phosphocholine to form sphingomyelin.',
        d: "Glucose is not what connects to phosphocholine in the book's account of sphingomyelin formation; it is ceramide that does.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p21-q31',
      conceptKey: 'sphingolipid-ceramide-and-sphingomyelin-formation',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Classify sphingomyelin as a phospholipid rather than a glycolipid, despite sharing the ceramide backbone with the glycolipids.',
      explanations: {
        a: 'Simple lipids are esters of fatty acid with alcohol alone; sphingomyelin adds a phosphocholine group, which makes it a phospholipid, not a simple lipid.',
        b: "Correct. The book classes sphingomyelin, alongside the glycerophospholipids, under phospholipids — its subgroup whose alcohol is sphingosine rather than glycerol.",
        c: 'Glycolipids are ceramide joined to a carbohydrate; sphingomyelin is ceramide joined to phosphocholine, which the book classes as a phospholipid instead.',
        d: "Derived lipids are hydrolysis products such as free fatty acids and steroids; sphingomyelin is a compound lipid (a phospholipid) in the book's classification, not a derived one.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p21-q32',
      conceptKey: 'membrane-fluidity-determinants',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: "State that phospholipids' membrane role rests on their amphipathic structure — hydrophobic tails, hydrophilic heads.",
      explanations: {
        a: "This reverses the book's own labelling of the bilayer diagram, which marks the tails hydrophobic (nonpolar) and the heads hydrophilic (polar), not the other way for both ends.",
        b: 'Correct. The book describes phospholipids as amphipathic — nonpolar fatty acid tails and polar (glycerol/phosphate/head-group) regions — and its own membrane diagram labels the tails hydrophobic and the heads hydrophilic.',
        c: "A large cyclic structure is not how the book describes phospholipids; it describes them as amphipathic molecules with fatty-acid tails and polar head groups, not as a ring system.",
        d: "This exactly reverses the book's own bilayer diagram, which marks the tails hydrophobic and the heads hydrophilic — not heads hydrophobic and tails hydrophilic.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p21-q33',
      conceptKey: 'phosphatidylinositol-second-messenger-role',
      difficulty: 'Hard',
      questionType: 'Mechanism',
      learningObjective: 'Identify phosphatidylinositol as the phospholipid the book credits with a second-messenger role.',
      explanations: {
        a: "Phosphatidylcholine (lecithin) is described by the book as an acetylcholine precursor and lung-surfactant component, not as a second messenger.",
        b: "Phosphatidylserine has no stated second-messenger role in the book; it is only named as a phosphatidic acid derivative (with serine).",
        c: "Correct, in the book's own (less detailed) terms: the book credits phosphatidylinositol itself with acting as a second messenger to many chemical transmitters, hormones and growth factors; this option names that role using its more familiar textbook form (its cleavage products, inositol triphosphate and diacylglycerol), a level of detail the department book itself does not spell out.",
        d: "Plasmalogens are described by the book through their platelet-activating-factor and Alzheimer's associations, not as second messengers.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p21-q34',
      conceptKey: 'glycolipid-classification-and-tissue-distribution',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: "Name cerebrosides as one of the book's glycolipid examples.",
      explanations: {
        a: "Sphingomyelin is classed by the book as a phospholipid (ceramide plus phosphocholine), not a glycolipid.",
        b: "Lecithin is a glycerophospholipid (phosphatidic acid plus choline) in the book's classification, not a glycolipid.",
        c: "Plasmalogens are glycerophospholipids with a fatty-alcohol substitution in the book's classification, not glycolipids.",
        d: "Correct. The book lists cerebrosides directly among its glycolipid examples, alongside sulfolipids and gangliosides.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p21-q35',
      conceptKey: 'lipid-three-way-classification-simple-compound-derived',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: "Identify fatty acids as one of the book's derived lipid examples.",
      explanations: {
        a: "TAG (triacylglycerol) is the book's simple-lipid example, not a derived lipid.",
        b: 'Correct. The book lists fatty acids first among its examples of derived lipids.',
        c: "Lecithin is a compound lipid (phospholipid) in the book's classification, not a derived lipid.",
        d: "Cardiolipin is a compound lipid (phospholipid) in the book's classification, not a derived lipid.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p21-q36',
      conceptKey: 'lipid-three-way-classification-simple-compound-derived',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Classify steroids as derived lipids.',
      explanations: {
        a: "Neutral fats are the book's simple-lipid (triacylglycerol) subtype, not where it places steroids.",
        b: "Waxes are the book's other simple-lipid subtype, not where it places steroids.",
        c: 'Correct. The book lists steroids as one of the derived lipid types, alongside fatty acids, alcohols, fat-soluble vitamins and carotenoids.',
        d: "Compound lipids add a phosphate or carbohydrate group to fatty acid and alcohol; the book instead files steroids under derived lipids.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p22-q37',
      conceptKey: 'membrane-fluidity-determinants',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Name cholesterol as the steroid that moderates membrane fluidity, distinct from the steroid hormones built from it.',
      answerOverride: 'b',
      answerOverrideReason:
        "No printed key survives ('none'). The book states directly that cholesterol is an important constituent of cell membranes that controls their fluidity (p37), which none of the three sex-hormone options is credited with anywhere in the book.",
      explanations: {
        a: "Estradiol is a steroid hormone (an estrogen) in the book's classification; membrane fluidity control is the role the book gives to cholesterol, not to the sex hormones built from it.",
        b: 'Correct. The book states cholesterol is an important constituent of cell membranes that controls their fluidity.',
        c: "Testosterone is a steroid hormone (a male sex hormone) in the book's classification, not the membrane-fluidity-controlling sterol.",
        d: "Progesterone is a steroid hormone (a female sex hormone) in the book's classification, not the membrane-fluidity-controlling sterol.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p22-q38',
      conceptKey: 'cholesterol-importance-and-derivatives',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'State that free cholesterol contains 27 carbon atoms.',
      explanations: {
        a: "24 carbon atoms is the book's threshold for a 'very long chain' fatty acid, not cholesterol's own carbon count.",
        b: "25 carbon atoms is not the figure the book gives for cholesterol; it states 27.",
        c: "26 carbon atoms is not the figure the book gives for cholesterol; it states 27.",
        d: 'Correct. The book states free cholesterol contains 27 carbon atoms.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p22-q39',
      conceptKey: 'cholesterol-importance-and-derivatives',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: "Name vitamin D as one of cholesterol's derivatives, via 7-dehydrocholesterol.",
      explanations: {
        a: "Vitamin E is a fat-soluble vitamin the book lists separately among the derived lipids; it does not describe cholesterol as its precursor.",
        b: "Vitamin C is not a lipid-derived vitamin at all in the book's account, and is not listed among cholesterol's derivatives.",
        c: 'Correct. The book states cholesterol can be oxidised in the liver into 7-dehydrocholesterol, converted into vitamin D3 in the skin by ultraviolet rays.',
        d: "Vitamin B12 is not a lipid-derived vitamin in the book's account, and is not listed among cholesterol's derivatives.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p22-q40',
      conceptKey: 'cholesterol-importance-and-derivatives',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Name cholesterol as the precursor of bile acids.',
      explanations: {
        a: 'Correct. The book states cholesterol is converted into bile acids and bile salts in the liver.',
        b: "Amino acids are not what the book derives bile acids from; it names cholesterol specifically.",
        c: "Fatty acids are not what the book derives bile acids from; it names cholesterol specifically.",
        d: "Bilirubin is a heme breakdown product in the body, not the precursor the book gives for bile acids, which is cholesterol.",
      },
    },

    // --- pass 1 additions (2026-08-27) ---
    // MCQ-102-07f0a0ff-p20-q23 ("Snake venom causes hemolysis of RBCs due to
    // activation of the following enzyme: Lecithinase") is NOT authored here.
    // None of this leaf's fifteen concepts state the lecithinase/snake-venom
    // hemolysis fact, and 102's concept space is closed (164/164 two-sided) —
    // minting a new one is out of scope for this pass. Left unauthored and
    // logged in PROGRESS-102-mcq.md rather than forced onto a concept that
    // does not actually teach it.
    {
      key: 'MCQ-102-07f0a0ff-p18-q10',
      conceptKey: 'eicosanoid-synthesis-pathway-enzymes',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Name arachidonic acid as the fatty-acid precursor of the eicosanoids.',
      explanations: {
        a: 'Stearic acid is a saturated fatty acid with no double bonds — eicosanoid synthesis needs a polyunsaturated precursor, which stearic acid is not.',
        b: 'Palmitic acid is likewise saturated, with no double bonds to supply the eicosanoid pathway\'s downstream chemistry.',
        c: 'Correct. Phospholipase A2 liberates arachidonic acid from membrane phospholipids, and it is arachidonic acid that prostaglandin H synthase and lipoxygenase convert into the various eicosanoids.',
        d: 'Lignoceric acid is a very-long-chain saturated fatty acid, not the eicosanoid pathway\'s substrate.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p18-q13',
      conceptKey: 'eicosanoid-synthesis-pathway-enzymes',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Identify leukotrienes as the acyclic eicosanoids, made by lipoxygenase.',
      explanations: {
        a: 'Prostaglandins are cyclic eicosanoids, made from arachidonic acid by prostaglandin H synthase\'s cyclooxygenase activity — the opposite branch from the acyclic products.',
        b: 'Thromboxane is likewise a cyclic eicosanoid product of prostaglandin H synthase, not an acyclic one.',
        c: 'Correct. Lipoxygenase converts arachidonic acid into the acyclic eicosanoids — the leukotrienes and lipoxins — as opposed to the cyclic products prostaglandin H synthase makes.',
        d: 'Prostacyclins are also cyclic eicosanoid products of prostaglandin H synthase, made in the vascular endothelium — not an acyclic product.',
      },
    },
  ],
}
