/**
 * `102 INT > Biochemistry > Carbohydrates of Biological Importance` — the
 * question books' MCQs.
 *
 * 68 bank rows, triaged against the department book's own chapter text
 * (`scripts/kasr/extract/pagetext/src_a488633802ec053c6325.json`, physical
 * pages 17-27, printed pages 13-23). Nine new concepts were minted, following
 * the book's own section order: monosaccharide classification by carbonyl
 * group and carbon count; the four forms of monosaccharide isomerism;
 * biological occurrence of the named pentoses/hexoses; the five classes of
 * monosaccharide derivative; disaccharide composition/linkage/reducing
 * property; the hydrolysis-based unit-count classes of carbohydrate; starch
 * and glycogen as storage polysaccharides; heteropolysaccharide/GAG
 * classification; and named GAGs' specific biomedical functions. One
 * existing concept, `mannitol-clinical-applications`, is reused for the two
 * rows that ask which sugar alcohol belongs to mannose — its own definition
 * already states that fact. The other two concepts flagged as possibly
 * relevant, `cellulose-dietary-importance` and `gag-shock-absorption-
 * mechanism`, turned out not to match any of this chapter's 68 rows (no row's
 * correct answer tests cellulose's dietary role or the GAG compressibility
 * mechanism specifically), so neither is declared here.
 *
 * Three rows are excluded: one (`p8-q15`) because its option set is
 * corrupted — only three options survive where the stem implies four, and
 * one of the three is itself two merged, unreadable choices; one (`p10-q37`)
 * because its correct option's printed text is OCR-garbled beyond
 * reconstruction, even though the underlying fact is taught; one
 * (`p11-q39`) because the book never mentions amino sugars' role in
 * antibiotics at all. Three rows (`p6-q1`, `p6-q3`, `p7-q7`) carry an
 * `answerOverride` because the bank supplied no usable printed key for them,
 * but the book settles each one directly.
 */
import type { McqLeafSeed } from '../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Carbohydrates of Biological Importance',
  modulePath: '102 INT > Biochemistry > Carbohydrates of Biological Importance',
  articleId: 'ART-102-BIO-CARBOHYDRATES-OF-BIOLOGICAL-IMPORTANCE',

  concepts: [
    {
      key: 'monosaccharide-classification-by-carbonyl-group-and-carbon-count',
      label:
        'Monosaccharides are classed as aldoses or ketoses by their carbonyl group, and as trioses through hexoses by carbon count, with glyceraldehyde as the aldose precursor and dihydroxyacetone as the simplest ketose',
      definition:
        'Monosaccharides, the simplest carbohydrates, are classified two ways: by the position of the carbonyl group, into aldoses (aldehyde group at C1) and ketoses (ketone group at C2); and by the number of carbons in the molecule, into trioses (3 carbons), tetroses (4 carbons), pentoses (5 carbons), hexoses (6 carbons) and heptoses (7 carbons). The two classifications combine: aldotrioses (glyceraldehyde, the mother compound of all aldoses), aldotetroses (erythrose), aldopentoses (ribose and xylose), aldohexoses (glucose, mannose and galactose); ketotrioses (dihydroxyacetone, the simplest ketose), ketotetroses (erythrulose), ketopentoses (ribulose) and ketohexoses (fructose). Every ketose carries exactly two terminal primary alcohol groups (CH2OH) and one ketone group (C=O).',
      objective:
        'Classify a named monosaccharide by its carbonyl group (aldose vs ketose) and by its carbon count (triose to hexose), and name the book\'s example for each class.',
      pitfall:
        'Assuming dihydroxyacetone, the simplest ketose, is also the starting point of the whole monosaccharide family — the book names glyceraldehyde, an aldotriose, as the mother compound of all aldoses, a separate claim about the aldose series specifically. Also confusing which class a named sugar belongs to: fructose, ribulose, erythrulose and dihydroxyacetone are ketoses, while glucose, mannose, galactose, ribose, xylose, erythrose and glyceraldehyde are aldoses.',
      subject: 'fnd',
      primary: 'DIS-BIO-T01',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Carbohydrates of Biological Importance',
      type: 'classification',
    },
    {
      key: 'monosaccharide-isomer-types',
      label:
        'Monosaccharides related to each other show four distinct kinds of isomerism — enantiomers, anomers, epimers and functional-group (aldose-ketose) isomers',
      definition:
        'Isomers share a molecular formula but differ in structure. Monosaccharides show four forms of isomerism. Enantiomers are the D- and L- forms of the same compound, complete mirror images of one another (e.g. D- and L-glucose); most naturally occurring monosaccharides are of the D-type. Anomers arise on cyclization: the carbonyl carbon (C1 in aldoses, C2 in ketoses) becomes a new stereocentre with two possible orientations of its hydroxyl group, the alpha-form (OH to the right, below the ring plane) and the beta-form (OH to the left, above the ring plane). Epimers are compounds with the same molecular formula that differ in configuration around only one carbon — glucose and mannose are epimers at C2, glucose and galactose are epimers at C4. Aldose-ketose isomers (functional group isomers) share a molecular formula but differ in their functional group; fructose (a ketose) is the functional group isomer of glucose (an aldose).',
      objective:
        'Distinguish enantiomers, anomers, epimers and aldose-ketose (functional group) isomers, and name the classic example pair and its point of difference (which carbon, or which functional group) for each.',
      pitfall:
        'Treating "isomer" as one undifferentiated idea rather than four distinct relationships defined by exactly what differs — the whole molecule\'s mirror image (enantiomers), the new stereocentre made by ring closure (anomers), a single named carbon\'s configuration (epimers), or the functional group itself (aldose-ketose isomers). Mixing up which carbon glucose is epimeric with mannose (C2) versus galactose (C4) is a common slip.',
      subject: 'fnd',
      primary: 'DIS-BIO-T01',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Carbohydrates of Biological Importance',
      type: 'classification',
    },
    {
      key: 'important-monosaccharides-biological-occurrence',
      label:
        'Ribose and deoxyribose are the pentoses of RNA and DNA, and glucose, fructose and galactose are the hexoses distinguished by where each occurs in the body and diet',
      definition:
        'Among the pentoses, ribose is a component of ribonucleic acid (RNA) and 2-deoxyribose is a component of deoxyribonucleic acid (DNA). Among the hexoses, glucose (grape sugar) is the main sugar of blood, present in all animal and plant cells, honey and fruits, and enters the formation of many disaccharides and polysaccharides; fructose (fruit sugar) is present in honey, fruits, semen, sucrose and inulin; galactose is a component of lactose (milk sugar) and is also found in glycosaminoglycans, glycolipids and glycoproteins.',
      objective:
        'Name which pentose belongs to RNA and which to DNA, and match each of glucose, fructose and galactose to where the book says it is found.',
      pitfall:
        'Swapping ribose and deoxyribose between RNA and DNA, or forgetting that fructose, not glucose, is the sugar the book names as abundant in honey, since glucose is also present there and is the more familiar sugar.',
      subject: 'fnd',
      primary: 'DIS-BIO-T01',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Carbohydrates of Biological Importance',
      type: 'biological_significance',
    },
    {
      key: 'monosaccharide-derivative-types',
      label:
        'Monosaccharides form five kinds of derivative — sugar acids, sugar alcohols, deoxy sugars, amino sugars and glycosides — each made by a different modification of the parent sugar',
      definition:
        'Monosaccharides are chemically modified into five classes of derivative. Sugar acids: uronic acids form when the primary alcohol group of a monosaccharide is oxidised — glucose is oxidised to glucuronic acid, galactose to galacturonic acid. Sugar alcohols form when the carbonyl group is reduced to an alcohol group; named members include glycerol (the alcohol of glyceraldehyde or dihydroxyacetone, a component of triacylglycerol and most phospholipids), ribitol (ribose alcohol, a component of riboflavin/vitamin B2), sorbitol (glucose and fructose alcohol, linked to diabetic complications and used as a sweetener) and dulcitol (galactose alcohol). Deoxy sugars have the hydroxyl group at C2 replaced by a hydrogen atom; the chief example is 2-deoxyribose, found in DNA. Amino sugars have the hydroxyl group at C2 replaced by an amino group (NH2), e.g. glucosamine, galactosamine and mannosamine, and are important constituents of glycosaminoglycans and some glycolipids/glycoproteins. Glycosides form by condensation of a sugar\'s carbonyl carbon with another sugar (a glycon, as in disaccharides and polysaccharides) or with a non-carbohydrate compound (an aglycon, such as an alcohol, phenol or nitrogenous base); nucleosides — ribose or deoxyribose joined to a nitrogenous base — are the glycosides found in nucleic acids.',
      objective:
        'Name the five classes of monosaccharide derivative, the chemical modification that defines each, and the named example the book gives for each.',
      pitfall:
        'Confusing which modification defines which class — oxidation makes a sugar acid, reduction makes a sugar alcohol, replacing C2-OH with H makes a deoxy sugar, replacing C2-OH with NH2 makes an amino sugar — and forgetting that a glycoside is a condensation product rather than an oxidation or reduction product, so nucleosides belong with glycosides, not with any of the other four classes.',
      subject: 'fnd',
      primary: 'DIS-BIO-T01',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Carbohydrates of Biological Importance',
      type: 'classification',
    },
    {
      key: 'disaccharide-composition-linkage-and-reducing-property',
      label:
        'Maltose, lactose and sucrose are distinguished by their component monosaccharides, their glycosidic linkage, and whether a free carbonyl group survives to make them reducing sugars',
      definition:
        'A disaccharide is two monosaccharides joined by a glycosidic linkage, named for its anomeric form (alpha or beta) and its parent sugar (glucosidic, galactosidic or fructosidic). Maltose (malt sugar) is two glucose units joined by an alpha1,4-glucosidic linkage; it is the main product of starch digestion by amylase, and is hydrolysed by maltase or by acids into two D-glucose molecules. Lactose (milk sugar) is galactose and glucose joined by a beta1,4-galactosidic linkage, hydrolysed by lactase or by acids into glucose and galactose. Sucrose (cane or table sugar) is fructose and glucose joined by an alpha1,2-glucosidic (beta2,1-fructosidic) linkage; it is found in sugar cane and beets, and hydrolysis yields glucose and fructose. Maltose and lactose retain a free carbonyl group and are therefore reducing sugars; in sucrose both carbonyl carbons are tied up in the linkage, so it is non-reducing.',
      objective:
        'For each of maltose, lactose and sucrose, state its two component monosaccharides, its glycosidic linkage, and whether it is reducing or non-reducing, and explain why.',
      pitfall:
        'Assuming every disaccharide is reducing by default — the book\'s own explicit exception is sucrose, non-reducing because both of its carbonyl carbons, not just one, are consumed by the linkage. Also swapping which enzyme hydrolyses which sugar (maltase for maltose, lactase for lactose), and mixing up which pair of monosaccharides each disaccharide yields.',
      subject: 'fnd',
      primary: 'DIS-BIO-T01',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Carbohydrates of Biological Importance',
      type: 'structure_function_relationship',
    },
    {
      key: 'carbohydrate-classification-by-hydrolysis-unit-count',
      label:
        'Carbohydrates are classified by their hydrolysis products into monosaccharides, disaccharides, oligosaccharides (3-10 units) and polysaccharides (over 10 units), and homopolysaccharides are further named by their single building unit — glucans for glucose, fructans for fructose',
      definition:
        'Carbohydrates are poly-hydroxy-alcohols with an aldehyde or keto group (general formula Cn(H2O)n, hence "hydrates of carbon"), important as a source of dietary calories, a form of energy storage, and a structural component. They are classified by their hydrolysis products into four groups: monosaccharides (one unit), disaccharides (two units), oligosaccharides (3 to 10 units — found as constituents of glycolipids and glycoproteins, such as the ABO blood group substances and immunoglobulins), and polysaccharides (more than 10 units). Polysaccharides subdivide into homopolysaccharides (one monosaccharide type throughout) and heteropolysaccharides (more than one type). Homopolysaccharides are named for their building unit: glucans, built of glucose, include starch, glycogen and cellulose; fructans, built of fructose, include inulin, found in plants.',
      objective:
        'State the unit-count boundary that separates monosaccharides, disaccharides, oligosaccharides and polysaccharides, and name the homopolysaccharide family (glucan or fructan) a given polysaccharide belongs to.',
      pitfall:
        'Losing track of the oligosaccharide range specifically, 3 to 10 units, since it sits between the fixed disaccharide count (exactly 2) and the open-ended polysaccharide count (more than 10), and is the boundary most likely to be misremembered as "more than 10" like polysaccharides. Also assuming inulin is a glucan because most named polysaccharides in this chapter are — it is a fructan, built of fructose, not glucose.',
      subject: 'fnd',
      primary: 'DIS-BIO-T01',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Carbohydrates of Biological Importance',
      type: 'classification',
    },
    {
      key: 'starch-and-glycogen-as-storage-polysaccharides',
      label:
        'Starch is the storage polysaccharide of chlorophyll-containing plants and glycogen the storage polysaccharide of animals, both branched or unbranched polymers of D-glucose linked by alpha1,4 (and, where branched, alpha1,6) glucosidic bonds',
      definition:
        'Starch is the chief storage form of carbohydrate in chlorophyll-containing plants, present in large amounts in cereals (rice, wheat), tubers (potatoes, sweet potatoes) and legumes (beans). It is a homopolysaccharide (glucan) built of D-glucose, occurring in two forms: amylose, a linear unbranched chain with alpha1,4-glucosidic bonds, and amylopectin, a branched molecule with alpha1,4-glucosidic bonds within its branches and alpha1,6-glucosidic bonds at the branch points. Its main digestion product, by amylase, is maltose. Glycogen is the storage form of carbohydrate in animals ("animal starch"), present in most cells but especially skeletal muscle and liver, where it stores excess glucose. It is also a glucan, more highly branched than amylopectin, with alpha1,4-glucosidic bonds within its branches and alpha1,6-glucosidic bonds at the branch points.',
      objective:
        'State which organism class stores carbohydrate as starch versus glycogen, name their common building block and linkage pattern, and locate glycogen\'s main storage sites in the body.',
      pitfall:
        'Treating starch and glycogen as chemically unrelated because one is a plant molecule and the other animal — both are homopolysaccharides of D-glucose joined the same way (alpha1,4 with alpha1,6 branch points); what differs is the organism, the degree of branching (glycogen is more branched than amylopectin), and the nickname ("animal starch" for glycogen).',
      subject: 'fnd',
      primary: 'DIS-BIO-T01',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Carbohydrates of Biological Importance',
      type: 'structure_function_relationship',
    },
    {
      key: 'heteropolysaccharide-and-gag-classification',
      label:
        'Heteropolysaccharides contain more than one monosaccharide type, and their main biomedical example, the glycosaminoglycans (GAGs), split into one sulfate-free member (hyaluronic acid) and several sulfate-containing members',
      definition:
        'Heteropolysaccharides are polysaccharides formed of more than one type of monosaccharide unit; they include the glycosaminoglycans (GAGs), formerly called mucopolysaccharides. GAGs are unbranched, long chains (usually more than 50 sugar units) composed mostly of repeating disaccharide units, each made of an amino sugar and a uronic acid. They are classified into sulfate-free GAGs (hyaluronic acid) and sulfate-containing GAGs (chondroitin sulfate, keratan sulfate, dermatan sulfate, heparin and heparan sulfate). Most GAGs are covalently conjugated to a protein core to form proteoglycans (about 95% carbohydrate, 5% protein), found mainly in the extracellular matrix. This contrasts with homopolysaccharides such as starch, glycogen and cellulose (all glucans, built from one monosaccharide type only) and inulin (a fructan).',
      objective:
        'Classify a named polysaccharide as homo- or heteropolysaccharide, and sort a named GAG into the sulfate-free or sulfate-containing group.',
      pitfall:
        'Assuming every named polysaccharide is a homopolysaccharide by default — GAGs are built from repeating disaccharide units of an amino sugar plus a uronic acid, not a single sugar, which is exactly what makes them heteropolysaccharides. Hyaluronic acid is the one GAG the book lists with no sulfate group; every other named GAG in this list carries one.',
      subject: 'fnd',
      primary: 'DIS-BIO-T01',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Carbohydrates of Biological Importance',
      type: 'classification',
    },
    {
      key: 'specific-gag-biomedical-functions',
      label:
        'Each named GAG has its own biomedical role: hyaluronic acid cushions and lubricates, heparin and dermatan sulfate act as anticoagulants, heparan sulfate mediates cell-cell interaction, keratan sulfate maintains corneal transparency, and chondroitin sulfate is cartilage\'s most abundant GAG',
      definition:
        'The GAGs each carry a specific biomedical role. Hyaluronic acid is found in the extracellular matrix, skin, synovial fluid, umbilical cord, the vitreous body of the eye, and in high concentration in embryonic tissues; skin ageing reduces its production (contributing to wrinkles), osteoarthritis lowers its joint concentration, and in the eye it acts as a shock absorber and nutrient transporter. Hyaluronidase (the "spreading factor") hydrolyses hyaluronic acid, is used by some bacteria to spread through subcutaneous tissue, and is present in sperm heads to aid fertilization. Chondroitin sulfate is the most abundant GAG, prominent in cartilage, tendons, ligaments, bone and aorta, and is used orally to treat osteoarthritis. Dermatan sulfate, present in skin, blood vessels and heart valves, has anticoagulant activity (it binds heparin and augments its action) and is associated with increased resistance to infection. Keratan sulfate is a major corneal component, important for corneal development and the maintenance of corneal transparency. Heparin proteoglycan is an important anticoagulant: it inactivates clotting factors IX and XI, activates antithrombin III, and clears blood lipids by binding lipoprotein lipase and releasing it from the capillary wall into plasma. Heparan sulfate is associated with the plasma membrane, where it functions in cell membrane receptors and cell-cell interaction.',
      objective:
        'Match each named GAG — hyaluronic acid, chondroitin sulfate, dermatan sulfate, keratan sulfate, heparin and heparan sulfate — to the specific biomedical role the book assigns it.',
      pitfall:
        'Mixing up heparin (the anticoagulant that inactivates clotting factors and activates antithrombin III) with heparan sulfate (a membrane-associated GAG concerned with cell-cell interaction, not coagulation) — the names differ by only three letters but the book gives them entirely different jobs. Also swapping keratan sulfate\'s corneal role with hyaluronic acid\'s vitreous/embryonic roles.',
      subject: 'fnd',
      primary: 'DIS-BIO-T01',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Carbohydrates of Biological Importance',
      type: 'structure_function_relationship',
    },
    // Reused from docs/Kasr-Source-Imports/concept/102-INT-concepts.md — fields
    // copied verbatim so this leaf agrees with the pinned canonical record.
    {
      key: 'mannitol-clinical-applications',
      label:
        'Mannitol is the sugar alcohol of mannose, and because the body neither absorbs it well nor metabolises it, it stays osmotically active in the fluid it is given into and is excreted unchanged by the kidney',
      definition:
        'Sugar alcohols are sugars in which the carbonyl group has been reduced to an alcohol group; mannitol is the alcohol of mannose. It is poorly absorbed by the intestines, which is why it serves as a low-calorie sweetener. It is not metabolised in the body and is easily excreted by the kidney, so it remains osmotically active in the compartment it occupies. On that basis it is used as a diuretic, to reduce eye pressure in glaucoma and to reduce intracranial pressure in brain oedema, in each case by osmosis.',
      objective:
        'Explain, from the fact that mannitol is neither metabolised nor reabsorbed, why it lowers intraocular and intracranial pressure and acts as a diuretic.',
      pitfall:
        'Treating it as a drug with a receptor or a transporter to act on. Mannitol has no pharmacological target at all — the whole effect is the osmotic pull of a solute the body cannot dispose of.',
      subject: 'fnd',
      primary: 'DIS-BIO-T01',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Carbohydrates of Biological Importance',
      type: 'structure_function_relationship',
    },
  ],

  questions: [
    // --- monosaccharide-classification-by-carbonyl-group-and-carbon-count ---
    {
      key: 'MCQ-102-07f0a0ff-p6-q1',
      conceptKey: 'monosaccharide-classification-by-carbonyl-group-and-carbon-count',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'Name glyceraldehyde as the aldotriose the book calls the mother compound of all aldoses.',
      answerOverride: 'b',
      answerOverrideReason:
        'The bank flags OCR disagreement between b and e, but option e does not exist in this row (only a-d are present). The book states plainly, "The mother compound of all aldoses is the aldotriose glyceraldehyde" (physical p.17), which is option b.',
      explanations: {
        a: 'Dihydroxyacetone is the simplest ketose, not an aldose at all — it has no aldehyde group, so it cannot be the parent of the aldose series.',
        b: 'Correct. The book states directly that glyceraldehyde, the aldotriose, is the mother compound of all aldoses — every other aldose (erythrose, ribose, glucose, and so on) is structurally related to it.',
        c: 'Ribose is itself a member of the aldose series (an aldopentose) built on glyceraldehyde\'s pattern, not the compound the series is built from.',
        d: 'Erythrose is an aldotetrose, one step along the aldose series from glyceraldehyde, not its starting point.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p6-q2',
      conceptKey: 'monosaccharide-classification-by-carbonyl-group-and-carbon-count',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Match each aldose to its carbon-count class, starting with the aldotriose.',
      explanations: {
        a: 'Correct. Glyceraldehyde is the book\'s aldotriose — the 3-carbon aldose.',
        b: 'Erythrose is the aldotetrose (4 carbons), one carbon longer than an aldotriose.',
        c: 'Ribose is an aldopentose (5 carbons), not a triose.',
        d: 'Glucose is an aldohexose (6 carbons), the largest of the aldoses named in this list.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p6-q3',
      conceptKey: 'monosaccharide-classification-by-carbonyl-group-and-carbon-count',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Identify a pair of named aldohexoses from the book\'s example list (glucose, mannose, galactose).',
      answerOverride: 'c',
      answerOverrideReason:
        'The bank recorded no usable key (`correctSource: "none"`). The book\'s aldohexose examples — glucose, mannose and galactose (physical p.18) — settle it: option c pairs two of those three, while every other option pairs in a ketose (fructose) or a pentose (ribose).',
      explanations: {
        a: 'Fructose is a ketohexose, not an aldose, so this pair mixes classes even though both sugars are hexoses.',
        b: 'Fructose is a ketohexose and ribose is an aldopentose — neither is an aldohexose, so this pair fails on both counts.',
        c: 'Correct. The book names glucose, mannose and galactose as its aldohexose examples; glucose and galactose are two of the three.',
        d: 'Ribose is an aldopentose, not a hexose, so this pair fails the carbon-count test even though glucose alone qualifies.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p6-q4',
      conceptKey: 'monosaccharide-classification-by-carbonyl-group-and-carbon-count',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Distinguish an aldose from a ketose among named hexoses and their relatives.',
      explanations: {
        a: 'Ribulose is the book\'s ketopentose, carrying a ketone group, not an aldehyde.',
        b: 'Fructose is the book\'s ketohexose — the most commonly confused ketose with an aldose because it is also a hexose.',
        c: 'Erythrulose is the book\'s ketotetrose, a ketose despite the "-ulose" name pattern shared with other ketoses.',
        d: 'Correct. Glucose is the book\'s aldohexose example — an aldehyde group at C1, six carbons.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p6-q5',
      conceptKey: 'monosaccharide-classification-by-carbonyl-group-and-carbon-count',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Recognise glyceraldehyde as an aldose against three named ketoses.',
      explanations: {
        a: 'Correct. Glyceraldehyde is the aldotriose — the mother compound of all aldoses.',
        b: 'Ribulose is the book\'s ketopentose.',
        c: 'Erythrulose is the book\'s ketotetrose.',
        d: 'Dihydroxyacetone is the book\'s simplest ketose, the ketotriose.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p7-q7',
      conceptKey: 'monosaccharide-classification-by-carbonyl-group-and-carbon-count',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'Name dihydroxyacetone as the book\'s simplest ketose.',
      answerOverride: 'c',
      answerOverrideReason:
        'The bank recorded no usable key (`correctSource: "none"`). The book states directly, "the simplest ketose is dihydroxyacetone (C3)" (physical p.17), which is option c.',
      explanations: {
        a: 'Erythrulose is the ketotetrose (4 carbons) — one class larger than the simplest ketose.',
        b: 'Ribulose is the ketopentose (5 carbons), further still from the simplest ketose.',
        c: 'Correct. The book states directly: "the simplest ketose is dihydroxyacetone (C3)."',
        d: 'Fructose is the ketohexose (6 carbons), the largest ketose named in this list, not the simplest.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p7-q8',
      conceptKey: 'monosaccharide-classification-by-carbonyl-group-and-carbon-count',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Identify fructose as the book\'s ketohexose example.',
      explanations: {
        a: 'Dihydroxyacetone is the ketotriose (3 carbons), not a hexose.',
        b: 'Ribulose is the ketopentose (5 carbons), one carbon short of a hexose.',
        c: 'Correct. Fructose is the book\'s named example of a ketohexose.',
        d: 'Glucose is a hexose but an aldose, not a ketose — it carries its carbonyl group at C1, not C2.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p7-q9',
      conceptKey: 'monosaccharide-classification-by-carbonyl-group-and-carbon-count',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Pick out the one ketose among three named aldoses.',
      explanations: {
        a: 'Glyceraldehyde is the aldotriose, the mother compound of the aldose series, not a ketose.',
        b: 'Ribose is an aldopentose — the sugar of RNA — not a ketose.',
        c: 'Erythrose is an aldotetrose, one carbon shorter than ribose, still an aldose.',
        d: 'Correct. Dihydroxyacetone is the book\'s simplest ketose.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p7-q10',
      conceptKey: 'monosaccharide-classification-by-carbonyl-group-and-carbon-count',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'State the fixed structural pattern the book gives for every ketose: two terminal CH2OH groups and one C=O.',
      explanations: {
        a: 'Doubles the ketone group count. A ketose carries exactly one ketone group (C=O), not two, so this overstates the carbonyl content.',
        b: 'Halves the terminal alcohol group count. A ketose\'s chain is capped by a CH2OH group at both ends, not just one.',
        c: 'Correct. The book states this exactly: "All ketoses have two terminal primary alcohol groups (CH2OH) and have one ketone group (C=O)."',
        d: 'Combines both errors at once — understates the terminal alcohol groups (one instead of two) and overstates the ketone groups (two instead of one).',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p7-q11',
      conceptKey: 'monosaccharide-classification-by-carbonyl-group-and-carbon-count',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Identify erythrulose as the book\'s ketotetrose.',
      explanations: {
        a: 'Xylose is an aldopentose (5-carbon aldose), not a ketotetrose — wrong on both the carbonyl type and the carbon count.',
        b: 'Correct. The book names erythrulose as the ketotetrose.',
        c: 'Fructose is the ketohexose (6 carbons), two carbons longer than a tetrose.',
        d: 'The book classes heptoses as the 7-carbon group; a ketoheptose would have three more carbons than a ketotetrose, so this cannot be the tetrose.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p7-q12',
      conceptKey: 'monosaccharide-classification-by-carbonyl-group-and-carbon-count',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Identify ribulose as the book\'s ketopentose.',
      explanations: {
        a: 'Fructose is the ketohexose (6 carbons), one carbon longer than a pentose.',
        b: 'Erythrulose is the ketotetrose (4 carbons), one carbon short of a pentose.',
        c: 'Correct. The book names ribulose as the ketopentose.',
        d: 'Dihydroxyacetone is the ketotriose, the simplest ketose, two carbons short of a pentose.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p7-q13',
      conceptKey: 'monosaccharide-classification-by-carbonyl-group-and-carbon-count',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Recognise that glucose and fructose share a carbon-count class (hexose) despite differing carbonyl types.',
      explanations: {
        a: 'Both are monosaccharides, the simplest carbohydrate class — nowhere near the more-than-10-unit polysaccharide class.',
        b: 'Correct. Glucose is an aldohexose and fructose a ketohexose — both are six-carbon sugars, so hexose is the classification they share.',
        c: 'Only glucose is an aldose; fructose is a ketose, so this cannot describe both sugars.',
        d: 'Both are single monosaccharide units, not two-unit disaccharides.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p8-q17',
      conceptKey: 'monosaccharide-classification-by-carbonyl-group-and-carbon-count',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Identify fructose as the six-carbon ketose.',
      explanations: {
        a: 'Glyceraldehyde has three carbons and an aldehyde group — wrong on both counts.',
        b: 'Dihydroxyacetone has the right functional group (ketone) but only three carbons, not six.',
        c: 'Correct. Fructose is the book\'s ketohexose — six carbons, ketone group at C2.',
        d: 'Galactose has six carbons but an aldehyde group, not a ketone — it is the book\'s aldohexose partner to glucose, not a ketose.',
      },
    },

    // --- monosaccharide-isomer-types ---
    {
      key: 'MCQ-102-07f0a0ff-p7-q14',
      conceptKey: 'monosaccharide-isomer-types',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'State that most naturally occurring monosaccharides are D-sugars.',
      explanations: {
        a: 'Correct. The book states plainly: "Most of the naturally occurring monosaccharides are of the D- type."',
        b: '"C type" is not a naming convention the book uses for sugar stereochemistry at all.',
        c: 'L-sugars are the mirror-image minority, structurally related to L-glyceraldehyde — the book specifically contrasts them with the D-majority.',
        d: '"E type" is not a naming convention the book uses for sugar stereochemistry.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p8-q16',
      conceptKey: 'monosaccharide-isomer-types',
      difficulty: 'Moderate',
      questionType: 'Definition',
      learningObjective: 'Match the definition "same formula, different functional group" to functional group (aldose-ketose) isomers.',
      explanations: {
        a: 'Correct. This is the book\'s definition of aldose-ketose isomers, i.e. functional group isomerism — same molecular formula, different functional group.',
        b: 'Anomers differ at the new stereocentre created by cyclization (C1 in aldoses, C2 in ketoses), not in their functional group.',
        c: 'The book does not use "optical isomers" as one of its four named isomer types; it names enantiomers, anomers, epimers and functional group (aldose-ketose) isomers instead.',
        d: 'Epimers differ in configuration around a single carbon, not in their functional group — glucose and mannose, for instance, are both aldoses.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p8-q18',
      conceptKey: 'monosaccharide-isomer-types',
      difficulty: 'Moderate',
      questionType: 'Definition',
      learningObjective: 'Recall the book\'s definition of epimers.',
      explanations: {
        a: 'Correct. The book defines epimers exactly this way: compounds with the same molecular formula that differ only in the configuration around one carbon.',
        b: 'Anomers are specifically the alpha- and beta- forms created by cyclization at the new stereocentre, not a difference at any single carbon in general.',
        c: 'The book does not name "optical isomers" among its four isomer types.',
        d: '"Stereoisomers" is a broader term than the book\'s specific, single-carbon definition of epimers — it would also describe enantiomers and anomers, so it is less precise than the option the question is testing for.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p8-q19',
      conceptKey: 'monosaccharide-isomer-types',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Name galactose as one of glucose\'s two epimers, per the book\'s worked examples.',
      explanations: {
        a: 'Correct. The book states: "Glucose and galactose are epimers at C4."',
        b: 'Fructose differs from glucose in its functional group (ketone vs aldehyde), which makes it an aldose-ketose isomer, not an epimer.',
        c: 'Arabinose is not one of the book\'s two named epimer partners for glucose (mannose at C2, galactose at C4).',
        d: 'Xylose, like arabinose, is not named by the book as an epimer of glucose.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p8-q20',
      conceptKey: 'monosaccharide-isomer-types',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Recall that glucose and mannose are epimers at C2.',
      explanations: {
        a: 'The book names C2, not C1, as the point of difference between glucose and mannose.',
        b: 'C3 is not the carbon the book names for the glucose-mannose epimer pair; C4 is the carbon for the glucose-galactose pair instead.',
        c: 'Correct. The book states: "Glucose and mannose are epimers at C2."',
        d: 'C5 is not a configuration the book names for any epimer pair in this chapter.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p8-q21',
      conceptKey: 'monosaccharide-isomer-types',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Recall that glucose and galactose are epimers at C4.',
      explanations: {
        a: 'C1 is not the carbon named for either epimer pair in the book.',
        b: 'C2 is the carbon named for the glucose-mannose pair, not glucose-galactose.',
        c: 'C3 is not a configuration the book names for any epimer pair in this chapter.',
        d: 'Correct. The book states: "Glucose and galactose are epimers at C4."',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p9-q22',
      conceptKey: 'monosaccharide-isomer-types',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Identify D- and L-glucose as enantiomers — mirror images of one another.',
      explanations: {
        a: 'Epimers differ at only one carbon while remaining otherwise identical; D- and L-glucose are complete mirror images, differing at every stereocentre, which is a different relationship.',
        b: 'D- and L-glucose share the same functional group (both aldoses); aldose-ketose isomerism describes a difference in functional group, which is not what separates D- from L-glucose.',
        c: 'Anomers differ only at the new stereocentre made by ring closure (C1); D- and L-glucose differ across the whole molecule, not just that one carbon.',
        d: 'Correct. The book defines enantiomers as the D- and L- forms of the same compound, mirror images of one another, giving D- and L-glucose as its example.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p9-q23',
      conceptKey: 'monosaccharide-isomer-types',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Identify fructose and glucose as aldose-ketose (functional group) isomers.',
      explanations: {
        a: 'Anomers are the alpha/beta forms of the same cyclic compound; fructose and glucose are different compounds altogether, not two ring forms of one sugar.',
        b: 'Correct. The book states: "Fructose is the functional group isomer of glucose" — fructose is a ketose, glucose an aldose, same molecular formula, different functional group.',
        c: 'Epimers share the same functional group and differ at one carbon; fructose and glucose differ in functional group itself (ketone vs aldehyde), which rules out epimerism.',
        d: 'Enantiomers are mirror images with the same functional group, like D- and L-glucose; fructose and glucose are not mirror images of each other.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p9-q24',
      conceptKey: 'monosaccharide-isomer-types',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Recall the book\'s specific statement that fructose is the functional group isomer of glucose.',
      explanations: {
        a: 'Sucrose is a disaccharide built partly from fructose, not a monosaccharide fructose could be an isomer of.',
        b: 'Ribose is a pentose (5 carbons); fructose is a hexose (6 carbons), so they cannot share a molecular formula.',
        c: 'Correct. The book states this directly: "Fructose is a functional group isomer of glucose."',
        d: 'Erythrose is a tetrose (4 carbons); fructose\'s six carbons rule out a shared molecular formula with it.',
      },
    },

    // --- important-monosaccharides-biological-occurrence ---
    {
      key: 'MCQ-102-07f0a0ff-p9-q25',
      conceptKey: 'important-monosaccharides-biological-occurrence',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'Name fructose as the sugar the book places in honey.',
      explanations: {
        a: 'Maltose is not among the sugars the book lists as present in honey; it is the disaccharide product of starch digestion.',
        b: 'Correct. The book states fructose ("fruit sugar") is present in honey, fruits, semen, sucrose and inulin.',
        c: 'Ribulose is a ketopentose used as a structural example elsewhere in the chapter, not a sugar the book places in honey.',
        d: 'Lactose is milk sugar, formed of galactose and glucose — the book does not place it in honey.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p9-q26',
      conceptKey: 'important-monosaccharides-biological-occurrence',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'Name deoxyribose as the sugar of DNA.',
      explanations: {
        a: 'Xylose is an aldopentose example used earlier in the chapter\'s carbon-count classification, not a nucleic-acid sugar the book names.',
        b: 'Ribose is the book\'s RNA sugar, the other pentose in this pair — easy to swap with deoxyribose if the two nucleic acids aren\'t kept straight.',
        c: 'Correct. The book states: "2-deoxyribose is a component of deoxyribonucleic acid (DNA)."',
        d: 'Ribulose is a ketopentose from the carbonyl/carbon-count classification, not a nucleic-acid sugar.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p9-q27',
      conceptKey: 'important-monosaccharides-biological-occurrence',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'Name ribose as the sugar of RNA.',
      explanations: {
        a: 'Correct. The book states: "Ribose is a component of ribonucleic acids (RNA)."',
        b: 'Deoxyribose is the book\'s DNA sugar, the partner pentose in this pair.',
        c: 'Ribulose is a ketopentose from the carbonyl classification section, not the pentose the book assigns to RNA.',
        d: 'Erythrose is an aldotetrose (4 carbons), not the pentose the book names for RNA.',
      },
    },

    // --- monosaccharide-derivative-types ---
    {
      key: 'MCQ-102-07f0a0ff-p6-q6',
      conceptKey: 'monosaccharide-derivative-types',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'State that glucose is oxidised to glucuronic acid, the book\'s named sugar-acid derivative of glucose.',
      explanations: {
        a: 'Glucose is an aldohexose (6 carbons), not an aldopentose (5 carbons).',
        b: 'Glucose is a monosaccharide, a single unit — it cannot itself be a disaccharide, reducing or not.',
        c: 'Glucose is a monosaccharide, the smallest carbohydrate unit, far from the more-than-10-unit polysaccharide class.',
        d: 'Correct. The book states directly: "Glucose is oxidised to form glucuronic acid," its sugar-acid derivative.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p9-q28',
      conceptKey: 'monosaccharide-derivative-types',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Match glucose to its sugar alcohol, sorbitol.',
      explanations: {
        a: 'Correct. The book states sorbitol is "glucose and fructose alcohol."',
        b: 'Inositol is not named among the book\'s sugar alcohols at all.',
        c: 'Dulcitol is the book\'s galactose alcohol, not glucose\'s.',
        d: 'Mannitol is the book\'s mannose alcohol, not glucose\'s.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p9-q29',
      conceptKey: 'monosaccharide-derivative-types',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'State that reducing a monosaccharide\'s carbonyl group produces a sugar alcohol.',
      explanations: {
        a: 'Sugar acids form by oxidation of the primary alcohol group, the opposite chemistry to reduction.',
        b: 'Deoxy sugars form by replacing the C2 hydroxyl with hydrogen, not by reducing the carbonyl group.',
        c: 'Amino sugars form by replacing the C2 hydroxyl with an amino group, not by reduction.',
        d: 'Correct. The book states: "These are sugars in which the carbonyl group is reduced to alcohol group" — sugar alcohols.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p10-q31',
      conceptKey: 'monosaccharide-derivative-types',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Identify sorbitol as a monosaccharide derivative against a disaccharide, a homopolysaccharide, and a heteropolysaccharide.',
      explanations: {
        a: 'Correct. Sorbitol is the book\'s sugar-alcohol derivative of glucose and fructose, listed under Monosaccharide Derivatives.',
        b: 'Sucrose is a disaccharide (fructose + glucose), a step up from a single modified monosaccharide.',
        c: 'Cellulose is a homopolysaccharide (glucan), a long chain of glucose units, not a derivative of one monosaccharide.',
        d: 'Heparin is a heteropolysaccharide (a glycosaminoglycan), built of repeating disaccharide units, not a single modified monosaccharide.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p10-q32',
      conceptKey: 'monosaccharide-derivative-types',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Match glucose\'s reduction product to sorbitol.',
      explanations: {
        a: 'Correct. The book names sorbitol as the alcohol of glucose (and fructose).',
        b: 'Mannitol is the book\'s reduction product of mannose, not glucose.',
        c: 'Dulcitol is the book\'s reduction product of galactose, not glucose.',
        d: 'Ribitol is the book\'s reduction product of ribose, not glucose.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p10-q33',
      conceptKey: 'monosaccharide-derivative-types',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Classify glycerol as a sugar alcohol, per the book\'s Monosaccharide Derivatives section.',
      explanations: {
        a: 'Glycosides are condensation products of a sugar\'s carbonyl carbon with another sugar or a non-carbohydrate compound — glycerol is listed under sugar alcohols, not glycosides.',
        b: 'Glycosaminoglycans are heteropolysaccharides built of repeating amino-sugar/uronic-acid disaccharide units — glycerol is a single small molecule, nothing like that scale of structure.',
        c: 'Correct. The book lists glycerol first among its sugar alcohols, describing it as the alcohol of glyceraldehyde or dihydroxyacetone, and a component of triacylglycerol and most phospholipids.',
        d: 'Glycerol is a carbohydrate derivative, not an amino-acid polymer — it has no relation to protein structure.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p10-q34',
      conceptKey: 'monosaccharide-derivative-types',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Match dulcitol to galactose.',
      explanations: {
        a: 'Glucose\'s sugar alcohol is sorbitol, per the book.',
        b: 'Mannose\'s sugar alcohol is mannitol, per the book — not dulcitol.',
        c: 'Correct. The book states: "Dulcitol: It is galactose alcohol."',
        d: 'Fructose is not named with its own separate sugar alcohol in the book; sorbitol is described as the alcohol of both glucose and fructose.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p10-q36',
      conceptKey: 'monosaccharide-derivative-types',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Recognise sorbitol and dulcitol as members of the book\'s sugar-alcohol group.',
      explanations: {
        a: 'Glycosides are condensation products with another sugar or a non-carbohydrate aglycon, not reduction products — sorbitol and dulcitol are formed by reducing a carbonyl group, a different derivative class.',
        b: 'Correct. Both are named in the book\'s Sugar Alcohols section: sorbitol as the alcohol of glucose/fructose, dulcitol as the alcohol of galactose.',
        c: 'Sugar acids form by oxidation of the primary alcohol group, the opposite chemistry to the reduction that makes sorbitol and dulcitol.',
        d: 'Amino sugars form by replacing a hydroxyl with an amino group at C2, unrelated to the reduction chemistry that produces sorbitol and dulcitol.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p11-q38',
      conceptKey: 'monosaccharide-derivative-types',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'State that amino sugars are formed by replacing the C2 hydroxyl with an amino group.',
      explanations: {
        a: 'C1 carries the carbonyl group (the aldehyde) in an aldose, not the substitution site for amino sugars.',
        b: 'Correct. The book states: "These are sugars in which the hydroxyl group at C2 is replaced by an amino group (NH2)."',
        c: 'C3 is not the substitution site the book names for amino sugars — it is also not the site for deoxy sugars, which use C2 as well.',
        d: 'C4 is not a substitution site the book names for any of its monosaccharide derivative classes.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p11-q40',
      conceptKey: 'monosaccharide-derivative-types',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Classify nucleosides as glycosides, per the book\'s example.',
      explanations: {
        a: 'Amino sugars have an amino group replacing the C2 hydroxyl (e.g. glucosamine); a nucleoside is a sugar joined to a nitrogenous base, a different kind of derivative entirely.',
        b: 'Sugar acids form by oxidising a monosaccharide\'s primary alcohol group; nucleosides are not oxidation products.',
        c: 'Sugar alcohols form by reducing a monosaccharide\'s carbonyl group; nucleosides are not reduction products.',
        d: 'Correct. The book states: "Nucleosides are glycosides formed of ribose or deoxyribose connected to nitrogenous base (aglycon), they are found in nucleic acids."',
      },
    },

    // --- mannitol-clinical-applications (reused existing concept) ---
    {
      key: 'MCQ-102-07f0a0ff-p10-q30',
      conceptKey: 'mannitol-clinical-applications',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Identify mannitol as a sugar alcohol against three unmodified sugars.',
      explanations: {
        a: 'Correct. Mannitol is the sugar alcohol of mannose, formed by reducing mannose\'s carbonyl group to an alcohol group.',
        b: 'Fructose is an unmodified ketohexose, not a reduction product of any sugar.',
        c: 'Galactose is an unmodified aldohexose — its reduction product, dulcitol, would be the sugar alcohol, not galactose itself.',
        d: 'Ribose is an unmodified aldopentose — its reduction product, ribitol, would be the sugar alcohol, not ribose itself.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p10-q35',
      conceptKey: 'mannitol-clinical-applications',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Match mannose to its sugar alcohol, mannitol.',
      explanations: {
        a: 'Sorbitol is the sugar alcohol of glucose and fructose, not mannose.',
        b: 'Ribitol is the sugar alcohol of ribose, not mannose.',
        c: 'Correct. Mannitol is mannose\'s sugar alcohol — mannose reduced at its carbonyl carbon.',
        d: 'Dulcitol is the sugar alcohol of galactose, not mannose.',
      },
    },

    // --- disaccharide-composition-linkage-and-reducing-property ---
    {
      key: 'MCQ-102-07f0a0ff-p11-q41',
      conceptKey: 'disaccharide-composition-linkage-and-reducing-property',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'State that sucrose hydrolyses to glucose and fructose.',
      explanations: {
        a: 'Neither galactose nor mannose is a component of sucrose; the book builds sucrose from fructose and glucose.',
        b: 'Correct. The book states sucrose "is formed of Fructose and Glucose united by...linkage," so hydrolysis returns those two monosaccharides.',
        c: 'Glucose and galactose are the hydrolysis products of lactose, not sucrose.',
        d: 'Mannose is not a component of any disaccharide the book names in this chapter.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p11-q42',
      conceptKey: 'disaccharide-composition-linkage-and-reducing-property',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Match the alpha1,4-glucosidic linkage to maltose.',
      explanations: {
        a: 'Correct. The book states maltose is "formed of two molecules of glucose united by 1,4-glucosidic linkage."',
        b: 'Sucrose\'s linkage is described by the book as alpha1,2-glucosidic (beta2,1-fructosidic), not 1,4-glucosidic.',
        c: 'Isomaltose is named by the book only as a distractor sugar elsewhere; the 1,4-glucosidic linkage it describes belongs to maltose, its structural relative, not to isomaltose.',
        d: 'Lactose\'s linkage is described by the book as beta1,4-galactosidic — a galactosidic bond, not a glucosidic one.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p11-q43',
      conceptKey: 'disaccharide-composition-linkage-and-reducing-property',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Identify sucrose as the disaccharide that yields fructose on hydrolysis.',
      explanations: {
        a: 'Lactose hydrolyses to glucose and galactose, per the book — no fructose.',
        b: 'Cellulose is a homopolysaccharide of glucose units only; hydrolysis yields glucose, not fructose.',
        c: 'Correct. Sucrose is formed of fructose and glucose, so its hydrolysis yields fructose (along with glucose).',
        d: 'Starch is a homopolysaccharide of glucose units only (amylose/amylopectin); its hydrolysis yields glucose-based products such as maltose, not fructose.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p11-q44',
      conceptKey: 'disaccharide-composition-linkage-and-reducing-property',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Identify sucrose as the book\'s non-reducing disaccharide.',
      explanations: {
        a: 'Isomaltose is not discussed by the book as an exception to the reducing pattern; only sucrose is singled out as non-reducing.',
        b: 'The book explicitly groups lactose with maltose as having a free carbonyl group, making it a reducing sugar.',
        c: 'Correct. The book states: "in sucrose both carbonyl carbons are involved in the linkage, so it is non-reducing."',
        d: 'The book explicitly names maltose as reducing, alongside lactose, because it retains a free carbonyl group.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p12-q45',
      conceptKey: 'disaccharide-composition-linkage-and-reducing-property',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Restate that sucrose hydrolyses to glucose and fructose.',
      explanations: {
        a: 'Lactose hydrolyses to glucose and galactose, not fructose.',
        b: 'Isomaltose is not built from fructose in the book\'s account; its structural relative maltose is two glucose units.',
        c: 'Correct. Sucrose is fructose plus glucose, so hydrolysis returns both.',
        d: 'Maltose hydrolyses to two glucose units only, per the book — no fructose.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p12-q46',
      conceptKey: 'disaccharide-composition-linkage-and-reducing-property',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Identify lactose as the disaccharide that yields galactose.',
      explanations: {
        a: 'Maltose hydrolyses to two glucose units only, per the book — no galactose.',
        b: 'Isomaltose, like maltose, is a glucose-based sugar in the book\'s account, not a source of galactose.',
        c: 'Sucrose hydrolyses to glucose and fructose, per the book — no galactose.',
        d: 'Correct. The book states lactose "is hydrolyzed... into glucose and galactose."',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p12-q47',
      conceptKey: 'disaccharide-composition-linkage-and-reducing-property',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Identify maltose as the disaccharide of two glucose units.',
      explanations: {
        a: 'Sucrose hydrolyses to glucose and fructose, not glucose alone.',
        b: 'Correct. The book states maltose "is hydrolyzed... into two molecules of D-glucose" — glucose units only.',
        c: 'Lactose hydrolyses to glucose and galactose, not glucose alone.',
        d: 'Dextrin is not discussed in the book\'s disaccharide section at all; it is not one of the three named disaccharides.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p12-q48',
      conceptKey: 'disaccharide-composition-linkage-and-reducing-property',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'State that lactose hydrolyses into glucose and galactose.',
      explanations: {
        a: '"Malt sugar" is the book\'s nickname for maltose, not lactose — lactose is "milk sugar."',
        b: 'Correct. The book states lactose "is hydrolyzed by lactase enzyme or by acids into glucose and galactose."',
        c: 'The book names the chemical hydrolysing agent as acids, not alkali, alongside the enzyme lactase.',
        d: 'The book describes lactose\'s linkage as beta1,4-galactosidic, neither a 1,6 linkage nor a glucosidic one.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p12-q49',
      conceptKey: 'disaccharide-composition-linkage-and-reducing-property',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Match the beta1,4-galactosidic linkage to lactose.',
      explanations: {
        a: 'Maltose\'s linkage is alpha1,4-glucosidic, a glucosidic bond rather than a galactosidic one.',
        b: 'Cellulose\'s linkage is beta1,4-glucosidic — the same anomeric form and position as lactose\'s, but glucosidic rather than galactosidic, since cellulose is built of glucose units only.',
        c: 'Correct. The book states lactose is "galactose and glucose united by beta1,4-galactosidic linkage."',
        d: 'Sucrose\'s linkage is described by the book as alpha1,2-glucosidic (beta2,1-fructosidic), not a 1,4-galactosidic bond.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p13-q56',
      conceptKey: 'disaccharide-composition-linkage-and-reducing-property',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'State that amylase digestion of starch produces maltose.',
      explanations: {
        a: 'Correct. The book states: "Maltose is the main product of digestion of starch by amylase."',
        b: 'Sucrose is a plant sugar (cane/table sugar) formed of fructose and glucose — not a starch digestion product.',
        c: 'Fructose is a monosaccharide component of sucrose and inulin, not a product of starch\'s digestion by amylase, which acts on the alpha1,4 bonds of glucose polymers.',
        d: 'Lactose is milk sugar, formed of galactose and glucose — unrelated to starch digestion.',
      },
    },

    // --- carbohydrate-classification-by-hydrolysis-unit-count ---
    {
      key: 'MCQ-102-07f0a0ff-p12-q50',
      conceptKey: 'carbohydrate-classification-by-hydrolysis-unit-count',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'State the book\'s unit-count boundary for oligosaccharides: 3 to 10 units.',
      explanations: {
        a: 'Correct. The book states directly: "Oligosaccharides: consist of 3 to 10 monosaccharide units per molecule."',
        b: '"More than 10 units" is the book\'s definition of a polysaccharide, not an oligosaccharide.',
        c: 'Shifts the lower bound from 3 to 5, narrowing the range the book actually gives.',
        d: '"2 units" is the book\'s definition of a disaccharide, not an oligosaccharide.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p12-q51',
      conceptKey: 'carbohydrate-classification-by-hydrolysis-unit-count',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Identify inulin as the book\'s fructan (fructose polymer).',
      explanations: {
        a: 'Starch is a glucan — a polymer of glucose, per the book\'s Glucans list.',
        b: 'Dextrin is not discussed in the book\'s homopolysaccharide classification.',
        c: 'Correct. The book names inulin as a fructan, "formed of fructose units," present in plants.',
        d: 'Cellulose is a glucan — a polymer of glucose, per the book\'s Glucans list, alongside starch and glycogen.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p12-q52',
      conceptKey: 'carbohydrate-classification-by-hydrolysis-unit-count',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Restate fructose as inulin\'s building unit.',
      explanations: {
        a: 'Glucose is the building unit of the book\'s glucans (starch, glycogen, cellulose), not of inulin.',
        b: 'Correct. The book classes inulin as a fructan, "formed of fructose units."',
        c: 'Mannose is not named as a homopolysaccharide building unit anywhere in the book\'s classification.',
        d: 'Galactose is not named as a homopolysaccharide building unit anywhere in the book\'s classification.',
      },
    },

    // --- starch-and-glycogen-as-storage-polysaccharides ---
    {
      key: 'MCQ-102-07f0a0ff-p13-q53',
      conceptKey: 'starch-and-glycogen-as-storage-polysaccharides',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'State that starch is the storage carbohydrate of chlorophyll-containing plants.',
      explanations: {
        a: 'Correct. The book states: "Starch is the chief storage form of carbohydrates in chlorophyll-containing plants."',
        b: 'Glycogen is the book\'s storage form in animals, not plants.',
        c: 'Dextrin is not discussed in the book\'s storage-polysaccharide section.',
        d: 'Cellulose is the plant cell wall\'s structural polysaccharide, per the book — a building material, not the storage form.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p13-q54',
      conceptKey: 'starch-and-glycogen-as-storage-polysaccharides',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Classify starch as a homopolysaccharide (glucan).',
      explanations: {
        a: 'Correct. The book lists starch among the Glucans — homopolysaccharides built entirely of glucose units.',
        b: 'Starch is a large polymer of many glucose units, far from the single-unit monosaccharide class.',
        c: 'Starch contains far more than the two units that define a disaccharide.',
        d: 'Heteropolysaccharides contain more than one monosaccharide type; starch is built of glucose alone, which makes it a homopolysaccharide instead.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p13-q55',
      conceptKey: 'starch-and-glycogen-as-storage-polysaccharides',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'State that starch and glycogen are both glucose polymers.',
      explanations: {
        a: 'Fructose is the building unit of fructans (e.g. inulin), per the book — not of starch or glycogen.',
        b: 'Correct. The book lists both starch and glycogen among the Glucans, polymers of glucose.',
        c: 'Mannose is not named as the building unit of any polysaccharide in the book.',
        d: 'Galactose is not named as the building unit of any polysaccharide in the book; it appears instead as a monosaccharide component of lactose.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p13-q57',
      conceptKey: 'starch-and-glycogen-as-storage-polysaccharides',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'State that glycogen is the animal storage carbohydrate.',
      explanations: {
        a: 'Starch is the book\'s plant storage form, not the animal one.',
        b: 'Correct. The book states: "Glycogen is the storage form of carbohydrates in animals."',
        c: 'Glucose is the monosaccharide that glycogen is built from and stores, not the storage form itself.',
        d: 'Inulin is the book\'s plant fructan, unrelated to animal carbohydrate storage.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p13-q58',
      conceptKey: 'starch-and-glycogen-as-storage-polysaccharides',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'Recall "animal starch" as the book\'s alternate name for glycogen.',
      explanations: {
        a: 'Correct. The book states glycogen is "the storage form of carbohydrates in animals (animal starch)."',
        b: '"Starch" itself is the plant storage form the nickname is being compared against, not the answer to what animals use.',
        c: 'Inulin is the book\'s plant fructan, unrelated to the animal-starch nickname.',
        d: 'Dextrin is not discussed in the book\'s storage-polysaccharide section.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p13-q59',
      conceptKey: 'starch-and-glycogen-as-storage-polysaccharides',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Locate glycogen\'s main storage sites: skeletal muscle and liver.',
      explanations: {
        a: 'Correct. The book states glycogen is "present in most cells but especially in skeletal muscles and liver (as stores of excess glucose)."',
        b: 'The brain is not named by the book among glycogen\'s main storage sites.',
        c: 'The spleen is not named by the book among glycogen\'s main storage sites.',
        d: 'The kidney is not named by the book among glycogen\'s main storage sites.',
      },
    },

    // --- heteropolysaccharide-and-gag-classification ---
    {
      key: 'MCQ-102-07f0a0ff-p14-q61',
      conceptKey: 'heteropolysaccharide-and-gag-classification',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Identify heparin as a heteropolysaccharide (GAG) against named homopolysaccharides.',
      explanations: {
        a: 'Inulin is a fructan — a homopolysaccharide built of one monosaccharide type (fructose), per the book\'s Glucans/Fructans classification.',
        b: 'Cellulose is a glucan — a homopolysaccharide built of glucose units only.',
        c: 'Correct. Heparin is one of the book\'s sulfate-containing glycosaminoglycans — heteropolysaccharides built of repeating amino-sugar/uronic-acid disaccharide units.',
        d: 'The book does not classify dextrin anywhere in this chapter, so its status as homo- or heteropolysaccharide cannot be settled from this text; it is a distractor rather than a taught example.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p14-q62',
      conceptKey: 'heteropolysaccharide-and-gag-classification',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Identify hyaluronic acid as a heteropolysaccharide (GAG) against three named glucans.',
      explanations: {
        a: 'Starch is a glucan, a homopolysaccharide built of glucose units only.',
        b: 'Correct. Hyaluronic acid is the book\'s sulfate-free GAG — a heteropolysaccharide built of repeating amino-sugar/uronic-acid units.',
        c: 'Cellulose is a glucan, a homopolysaccharide, per the book\'s Glucans list.',
        d: 'Glycogen is a glucan, a homopolysaccharide, per the book\'s Glucans list.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p14-q63',
      conceptKey: 'heteropolysaccharide-and-gag-classification',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Identify keratan sulfate as a heteropolysaccharide (GAG).',
      explanations: {
        a: 'Inulin is a fructan, a homopolysaccharide built of fructose units only.',
        b: 'Cellulose is a glucan, a homopolysaccharide built of glucose units only.',
        c: 'Correct. Keratan sulfate is one of the book\'s sulfate-containing glycosaminoglycans, heteropolysaccharides built of repeating disaccharide units.',
        d: 'The book does not classify dextrin anywhere in this chapter; it is a distractor rather than a taught example.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p14-q64',
      conceptKey: 'heteropolysaccharide-and-gag-classification',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Identify hyaluronic acid as the book\'s one sulfate-free GAG.',
      explanations: {
        a: 'Heparin is listed by the book among the sulfate-containing GAGs, not the sulfate-free group.',
        b: 'Correct. The book classifies GAGs into "Sulfate free glycosaminoglycans: hyaluronic Acid" — the only member of that group.',
        c: 'Inulin is not a GAG at all — it is a fructan homopolysaccharide, built of one monosaccharide type.',
        d: 'The book does not classify dextrin as a GAG or discuss it in this chapter at all.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p14-q65',
      conceptKey: 'heteropolysaccharide-and-gag-classification',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Identify heparin as a GAG against a fructan and two amino sugars.',
      explanations: {
        a: 'Inulin is a fructan homopolysaccharide, not a GAG.',
        b: 'Correct. Heparin is one of the book\'s sulfate-containing glycosaminoglycans.',
        c: 'Glucosamine is an amino sugar — a monosaccharide derivative and a building block that GAGs are made from, not a GAG itself.',
        d: 'Galactosamine is likewise an amino sugar, a component monosaccharide of some GAGs rather than a GAG in its own right.',
      },
    },

    // --- specific-gag-biomedical-functions ---
    {
      key: 'MCQ-102-07f0a0ff-p14-q66',
      conceptKey: 'specific-gag-biomedical-functions',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'State heparan sulfate\'s role in cell membrane receptors and cell-cell interaction.',
      explanations: {
        a: 'Heparan sulfate is a GAG, a heteropolysaccharide built of repeating amino-sugar/uronic-acid units — the opposite of a homopolysaccharide.',
        b: 'Anticoagulant activity is the book\'s description of heparin (and, to a lesser extent, dermatan sulfate) — a different, easily confused GAG name.',
        c: 'Correct. The book states: "Heparan sulfate is associated mainly with plasma membrane of cells and plays an important role in cell membrane receptors and cell-cell interaction."',
        d: 'Corneal transparency is the book\'s description of keratan sulfate, not heparan sulfate.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p14-q67',
      conceptKey: 'specific-gag-biomedical-functions',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Name heparin as the book\'s anticoagulant GAG.',
      explanations: {
        a: 'Correct. The book states: "Heparin proteoglycan is an important anticoagulant (prevents thrombus formation)."',
        b: 'Keratan sulfate\'s role, per the book, is corneal transparency and development, not anticoagulation.',
        c: 'Cellulose is a structural plant homopolysaccharide, unrelated to blood clotting.',
        d: 'Heparan sulfate\'s role, per the book, is cell membrane receptors and cell-cell interaction — a name easily confused with heparin, but a different job.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p14-q68',
      conceptKey: 'specific-gag-biomedical-functions',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'State keratan sulfate\'s role in corneal transparency.',
      explanations: {
        a: 'Keratan sulfate is a GAG, a heteropolysaccharide, not a homopolysaccharide.',
        b: 'Anticoagulant activity is the book\'s description of heparin, not keratan sulfate.',
        c: 'Cell-cell interaction is the book\'s description of heparan sulfate, a different, easily confused GAG name.',
        d: 'Correct. The book states keratan sulfate "is one of the major components of the cornea and suggested to have important roles for corneal development and maintenance of its transparency."',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p15-q69',
      conceptKey: 'specific-gag-biomedical-functions',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Name hyaluronic acid as the GAG the book locates in embryonic tissues.',
      explanations: {
        a: 'Correct. The book states hyaluronic acid is "also found in skin, synovial fluid of joints, umbilical cord, vitreous body of the eye, and embryonic tissues."',
        b: 'Keratan sulfate\'s named location, per the book, is the cornea — not embryonic tissue.',
        c: 'Heparan sulfate\'s named location, per the book, is the plasma membrane of cells — not embryonic tissue.',
        d: 'Heparin\'s named role, per the book, is anticoagulation — its location is not described in terms of embryonic tissue.',
      },
    },

    // --- excluded rows ---
    {
      key: 'MCQ-102-07f0a0ff-p8-q15',
      conceptKey: 'monosaccharide-isomer-types',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The option set is corrupted: only three options survive (a-c) where the stem implies two named pairs (four terms), and option c reads as two merged, unreadable choices ("a andy forms b) y and B forms"). The underlying fact — cyclization creates alpha- and beta-forms at the new stereocentre — is taught on physical p.19, but the option list itself cannot be reconstructed into something a student could legibly choose between.',
    },
    {
      key: 'MCQ-102-07f0a0ff-p10-q37',
      conceptKey: 'monosaccharide-derivative-types',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option d\'s printed text is OCR-garbled beyond reconstruction ("Vitamin Bo [Pee (Poeaeece"). The underlying fact — ribitol is a component of riboflavin/vitamin B2 — is taught on physical p.19 ("It is a component of riboflavin (vitamin B2)"), but the correct option as extracted cannot be presented legibly to a student.',
    },
    {
      key: 'MCQ-102-07f0a0ff-p11-q39',
      conceptKey: 'monosaccharide-derivative-types',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Not taught in the module book. The book\'s amino sugars section (physical p.20) states only that amino sugars are important constituents of glycosaminoglycans and some glycolipids/glycoproteins; it never mentions antibiotics, so the fact this question needs to adjudicate the option set is outside the book\'s coverage.',
    },
  ],
}
