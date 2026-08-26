/**
 * `102 INT > Biochemistry > Chemistry of Hemoproteins` — the question books'
 * MCQs.
 *
 * Twenty rows, sixteen sittable. Every kept row carries a clean printed key
 * (`correctSource: "printed key (p43)"`), so none needed an override — the
 * work here was grounding each option's explanation in the department
 * book's own text on physical pages 40-47
 * (`scripts/kasr/extract/pagetext/src_a488633802ec053c6325.json`).
 *
 * Four rows are excluded because the book, in this page range, never
 * teaches the specific fact the option set turns on:
 *  - Haemoglobin C (Glu6→Lys) never appears; the book's only named
 *    haemoglobin variant in this chapter is HbS.
 *  - 2,3-bisphosphoglycerate is never mentioned anywhere in the chapter —
 *    the book's account of the T/R equilibrium describes only the ionic and
 *    hydrogen bonds between the two αβ dimers, not a BPG-binding pocket.
 *  - Both thalassaemia rows (α-thalassaemia "trait", β-thalassaemia
 *    "major") rely on a named-subtype taxonomy (trait/major/homozygous,
 *    specific gene counts, compensatory γ/δ-chain expression) the book
 *    never sets out; it states only that severity depends on how many
 *    genes are affected and ranges from very mild to fatal, without tying
 *    any of that to the clinical labels the options use.
 *
 * `globin-protein-part-functions` is reused verbatim from the existing
 * 102 INT biochemistry concept catalogue
 * (`docs/Kasr-Source-Imports/concept/102-INT-concepts.md`) for the one row
 * that tests exactly the fact it already states. The other six concepts are
 * minted fresh from this chapter's own text.
 */
import type { McqLeafSeed } from '../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Chemistry of Hemoproteins',
  modulePath: '102 INT > Biochemistry > Chemistry of Hemoproteins',
  articleId: 'ART-102-BIO-CHEMISTRY-OF-HEMOPROTEINS',

  concepts: [
    {
      key: 'hemoprotein-classification-conjugated-with-heme-and-examples',
      label:
        "Hemoproteins are conjugated proteins built around a heme prosthetic group, and each hemoprotein's job differs — hemoglobin transports oxygen in blood, myoglobin stores it in muscle, cytochromes move electrons, and catalase/peroxidases break down hydrogen peroxide",
      definition:
        "Hemoproteins are conjugated proteins containing heme as a tightly bound prosthetic group. The book's own table of examples assigns each a distinct job: haemoglobin transports oxygen in the blood; myoglobin stores oxygen in muscle; cytochromes transport electrons in the respiratory chain; and catalase and peroxidases degrade hydrogen peroxide.",
      objective:
        "Classify hemoproteins as conjugated proteins and match each named example to its main function from the book's table.",
      pitfall:
        'Assuming every hemoprotein transports or stores oxygen. Cytochromes and catalase/peroxidases are hemoproteins too, but their jobs are electron transport and peroxide breakdown, not oxygen handling.',
      subject: 'haem',
      primary: 'DIS-BIO-T05',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Chemistry of Hemoproteins',
      type: 'classification',
    },
    {
      key: 'myoglobin-site-function-and-oxygen-affinity',
      label:
        "Myoglobin sits in cardiac and skeletal muscle as an oxygen reservoir, and its higher affinity for oxygen than hemoglobin's lets it stay 90% saturated even at the low pO2 (20 mmHg) found in exercising muscle",
      definition:
        'Myoglobin is present in cardiac and skeletal muscles, where it functions as a reservoir for oxygen and as an oxygen carrier that increases the rate of oxygen release within the muscle cell during severe muscular exercise, when the partial pressure of oxygen (pO2) falls to 5 mmHg. Myoglobin has a greater affinity for oxygen than hemoglobin: it is still 90% saturated at a pO2 of 20 mmHg.',
      objective:
        "State where myoglobin is found, what it does there, and how its oxygen affinity compares with hemoglobin's at low pO2.",
      pitfall:
        "Crediting myoglobin with blood oxygen transport or the buffering role. Both of those belong to hemoglobin; myoglobin's job is local storage and release inside the muscle cell.",
      subject: 'haem',
      primary: 'DIS-BIO-T05',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Chemistry of Hemoproteins',
      type: 'structure_function_relationship',
    },
    {
      key: 'myoglobin-and-hemoglobin-structural-organization',
      label:
        'Myoglobin is one heme on one 153-residue chain while hemoglobin is four hemes on four chains (two 141-residue alpha, two 146-residue beta), so the two proteins share the same globular tertiary fold but never the same primary structure',
      definition:
        'Myoglobin is formed of one heme group attached to one polypeptide chain (apomyoglobin, 153 amino acids, 8 α-helices), while hemoglobin is formed of four heme groups attached to four polypeptide chains. Each α chain of hemoglobin has 141 amino acids and 7 helices; each β chain has 146 amino acids and 8 helices. Despite these different chain lengths — and so different primary structures — both apomyoglobin and each hemoglobin chain fold the same way at the tertiary level: a globular structure with polar amino acids toward the surface and nonpolar amino acids on the inside. Only hemoglobin has a quaternary structure, its four chains arranged as two αβ dimers; a single myoglobin chain has none.',
      objective:
        'Compare myoglobin and hemoglobin at each level of protein structure — how many hemes and chains, how many residues, and which structural level differs between them and which does not.',
      pitfall:
        'Assuming that because myoglobin and hemoglobin subunits differ in primary structure they must also differ in tertiary structure. The book describes both foldings in the same terms — globular, polar surface, nonpolar core — so the tertiary fold is shared even though the sequence is not.',
      subject: 'haem',
      primary: 'DIS-BIO-T05',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Chemistry of Hemoproteins',
      type: 'structure_function_relationship',
    },
    {
      key: 'heme-porphyrin-structure-and-iron-coordination',
      label:
        'Heme is a ferrous (Fe2+), not ferric, protoporphyrin IX ring that sits in a hydrophobic pocket between the E and F helices, with its iron making six coordination bonds — four to the ring\'s nitrogens, a fifth to the proximal histidine F8, and a sixth open for oxygen or the distal histidine E7',
      definition:
        "Heme is a ferrous (Fe2+) protoporphyrin IX: a porphin ring of four pyrrole rings linked through methenyl bridges, carrying four nonpolar methyl groups, two nonpolar vinyl groups and two polar propionate groups. The ring sits inside the hydrophobic core of the globin chain, in a pocket between the E and F helices, held by hydrophobic bonds between its nonpolar side chains and the chain's nonpolar amino acids, plus a bond from its iron to the proximal histidine (His F8). Iron in the ferrous state forms six coordination bonds: four to the four nitrogen atoms of the porphyrin ring (in the ring's own plane), a fifth to the proximal histidine, and a sixth — perpendicular to the ring, on the opposite face — for oxygen, unoccupied when no O2 is bound and adjacent to the distal histidine (His E7).",
      objective:
        "State heme's oxidation state and ring composition, where it sits in the globin chain, and what iron's six coordination bonds connect to.",
      pitfall:
        "Writing heme's iron as ferric (Fe3+). The book is explicit that heme is a ferrous, Fe2+, protoporphyrin; iron only becomes ferric when heme is oxidised to hematin, which is a different molecule the globin chain normally prevents.",
      subject: 'haem',
      primary: 'DIS-BIO-T05',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Chemistry of Hemoproteins',
      type: 'structure_function_relationship',
    },
    {
      key: 'globin-protein-part-functions',
      label:
        'The globin chain is what makes haem usable: it dissolves it, keeps its iron from being oxidised, keeps it inside the red cell, and tilts carbon monoxide away from the orientation it would otherwise prefer',
      definition:
        'The globin part of haemoglobin has four functions. It makes haem soluble, because the polar amino acids of the folded chain lie on the surface. It prevents oxidation of haem into haematin, because the haem pocket is lined by nonpolar amino acids, and it also prevents formation of the haem-oxygen-haem complex. It prevents haem diffusing into the plasma, because of its large size. And it reduces the affinity of haem for carbon monoxide: isolated haem binds carbon monoxide with the iron, carbon and oxygen atoms perpendicular to the plane of the ring, but in haemoglobin the distal histidine sterically hinders that orientation, and binding at the less favoured angle weakens the haem-carbon monoxide bond.',
      objective:
        'Give the four functions the globin chain performs for the haem group it carries, and the structural feature responsible for each.',
      pitfall:
        'Thinking the globin merely carries the haem while the haem does all the work. Free haem is insoluble, oxidises to haematin, leaks out of the cell and binds carbon monoxide far more avidly — every one of those problems is solved by the protein around it.',
      subject: 'haem',
      primary: 'DIS-BIO-T05',
      secondary: ['SYS-HEM-T01'],
      modulePath: '102 INT > Biochemistry > Chemistry of Hemoproteins',
      type: 'structure_function_relationship',
    },
    {
      key: 'sickle-cell-hbs-point-mutation-basis',
      label:
        'Sickle cell hemoglobin (HbS) is caused by a single point mutation in the beta-globin gene that replaces glutamate with valine at position 6 of the beta chain',
      definition:
        'Sickle cell anaemia is caused by a single nucleotide alteration — a point mutation — in the β-globin gene, which replaces the polar glutamate normally at position six of the β chain with a nonpolar valine. This single amino-acid substitution is the entire molecular basis of the malfunction: the resulting nonpolar patch on the surface of the β subunit lets deoxygenated HbS molecules polymerise into rigid fibres that distort and rigidify red cells.',
      objective:
        'Identify the molecular basis of sickle cell haemoglobin as a point mutation causing a single amino-acid substitution (Glu6→Val) in the β chain, not a broader structural or synthetic defect.',
      pitfall:
        'Confusing the specific single-residue substitution with a general structural or secondary-structure defect, or with an iron/heme-binding fault. The book locates the whole problem at one point mutation and one substituted residue in the β chain; nothing about the heme groups or their binding is altered.',
      subject: 'haem',
      primary: 'DIS-BIO-T05',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Chemistry of Hemoproteins',
      type: 'mechanism',
    },
    {
      key: 'hemoglobin-types-by-developmental-stage-and-chain-composition',
      label:
        'Hemoglobin\'s chain composition changes across development — embryonic Gower-1 (ζ2ε2) and Gower-2 (α2ε2), fetal HbF (α2γ2, higher O2 affinity than adult Hb), and adult HbA1 (α2β2, 98%) and HbA2 (α2δ2, 2%)',
      definition:
        'Hemoglobin structure differs across embryonic, fetal and adult life; all are tetramers of different polypeptide chains encoded by different genes. Embryonic haemoglobin (Hb Gower) forms in the first few weeks after conception: Hb Gower-1 is ζ2ε2 and Hb Gower-2 is α2ε2. Fetal haemoglobin (HbF) forms from the third month of pregnancy and remains up to six months after birth; it is α2γ2 and has a higher affinity for oxygen than adult haemoglobin, allowing more efficient transplacental transfer of oxygen from mother to fetus. Adult HbA1 is α2β2 and forms about 98% of total adult haemoglobin; adult HbA2 is α2δ2 and forms only about 2%.',
      objective:
        "Name each haemoglobin type's chain composition by developmental stage, and state why fetal haemoglobin's oxygen affinity differs from the adult form's.",
      pitfall:
        "Mixing up HbA2's δ chains with HbF's γ chains. Both are minor chain types paired with α, but HbA2 (α2δ2) is an adult haemoglobin at 2%, while HbF (α2γ2) is the fetal form that disappears after early infancy.",
      subject: 'haem',
      primary: 'DIS-BIO-T05',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Chemistry of Hemoproteins',
      type: 'classification',
    },
  ],

  questions: [
    {
      key: 'MCQ-102-07f0a0ff-p41-q1',
      conceptKey: 'hemoprotein-classification-conjugated-with-heme-and-examples',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'Define hemoproteins as conjugated proteins whose non-protein component is heme.',
      explanations: {
        a: 'Wrong direction — a simple protein is one built only of amino acids; hemoproteins carry a heme prosthetic group in addition, which is what makes them conjugated rather than simple.',
        b: 'Correct. The book defines hemoproteins as conjugated proteins containing heme as a tightly bound prosthetic group — the non-amino-acid heme component is exactly what conjugation means.',
        c: "A glycoprotein's added group is carbohydrate, not heme; picking this confuses one class of conjugated protein for another.",
        d: "A lipoprotein's added group is lipid, not heme; hemoproteins are named for their prosthetic group, and that group is heme, not a generic lipid.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p41-q2',
      conceptKey: 'hemoprotein-classification-conjugated-with-heme-and-examples',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: "Match hemoglobin to its stated function, oxygen transport in blood, and distinguish it from myoglobin's storage role.",
      explanations: {
        a: "Correct. The book's hemoprotein table assigns hemoglobin exactly this job: transportation of oxygen in blood.",
        b: "That is myoglobin's job in the same table, not hemoglobin's — oxygen storage happens in muscle, oxygen transport happens in blood.",
        c: "Hydroxylation reactions belong to a different class of enzyme entirely; the book's table does not credit any hemoprotein it lists with hydroxylation.",
        d: "Oxidation of tryptophan is not among the functions the book assigns to any hemoprotein in its table.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p41-q3',
      conceptKey: 'myoglobin-and-hemoglobin-structural-organization',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: "State myoglobin's heme-to-chain ratio (1:1) and contrast it with hemoglobin's (4:4).",
      explanations: {
        a: "This is hemoglobin's composition, not myoglobin's — the book contrasts the two explicitly: hemoglobin has four heme groups on four chains, myoglobin has one on one.",
        b: 'Neither protein has this composition; myoglobin has one heme on one chain, and no hemoprotein in the book is described as two hemes on a single chain.',
        c: 'No hemoprotein in the book is described this way; three hemes on three chains matches neither myoglobin (1:1) nor hemoglobin (4:4).',
        d: 'Correct. The book states myoglobin is formed of one heme attached to one polypeptide chain, while hemoglobin is the one with four hemes on four chains.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p41-q4',
      conceptKey: 'heme-porphyrin-structure-and-iron-coordination',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Locate the heme-binding pocket between the E and F helices of the globin fold.',
      explanations: {
        a: 'Correct. The book places the heme ring inside the hydrophobic core of the chain, in a pocket between the E and F helices, where it is held by hydrophobic bonds to nonpolar side chains and by iron\'s bond to the proximal histidine F8.',
        b: "The book's helix labelling runs A through H starting from the N-terminal end; A and B are near the start of the chain, not where the book locates the heme pocket.",
        c: "C and D helices are not where the book places the heme pocket; the proximal and distal histidines that interact with the heme iron are named for the E and F helices, not C/D.",
        d: "G and H are the last two helices in the book's A-to-H labelling, not the E/F pocket where the heme ring sits.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p41-q5',
      conceptKey: 'globin-protein-part-functions',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'State the four protective functions the globin chain performs for its heme group, and recognise that this question asks for the true one among three reversed statements.',
      explanations: {
        a: 'The opposite is true. Globin\'s nonpolar heme pocket prevents the heme-O2-heme complex from forming, it does not facilitate it.',
        b: "Correct — this is one of the four jobs the globin chain does for heme: because of its large size, the globin chain prevents heme from diffusing out of the cell into the plasma.",
        c: 'The opposite is true. Globin makes heme more soluble, not less — its surface polar amino acids are what let the heme-globin complex dissolve.',
        d: "The opposite is true. Globin reduces heme's affinity for carbon monoxide — the distal histidine sterically hinders CO's preferred binding angle — rather than increasing it.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p41-q6',
      conceptKey: 'myoglobin-site-function-and-oxygen-affinity',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'State myoglobin\'s main function as an oxygen reservoir in cardiac and skeletal muscle.',
      explanations: {
        a: 'Correct. The book states myoglobin functions in cardiac and skeletal muscle as a reservoir for oxygen and as a carrier that speeds oxygen release during severe muscular exercise.',
        b: 'The oxy-Hb/Hb buffer role belongs to hemoglobin in red blood cells, not to myoglobin in muscle.',
        c: "Oxygen transport in blood is hemoglobin's job in the book's table; myoglobin's job is oxygen storage/release inside muscle, not transport in blood.",
        d: "Degradation of hydrogen peroxide is the job the book assigns to catalase and peroxidases, not to myoglobin.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p41-q7',
      conceptKey: 'myoglobin-site-function-and-oxygen-affinity',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Recall the book\'s specific saturation figure for myoglobin (90%) at a pO2 of 20 mmHg.',
      explanations: {
        a: 'Fifty percent saturation is not the figure the book gives for myoglobin at pO2 20 mmHg; myoglobin\'s high oxygen affinity keeps it far more saturated than that at this pO2.',
        b: 'Twenty percent saturation would suggest myoglobin releases oxygen about as readily as it is presented, which understates the affinity the book describes — myoglobin stays 90% saturated at this pO2.',
        c: 'Thirty percent saturation is too low for the affinity the book attributes to myoglobin at pO2 20 mmHg, which it states as 90%.',
        d: 'Correct. The book states myoglobin is 90% saturated at a pO2 of 20 mmHg, reflecting its greater affinity for oxygen than hemoglobin.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p42-q8',
      conceptKey: 'hemoprotein-classification-conjugated-with-heme-and-examples',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: "Identify cytochromes as a hemoprotein from the book's example table, and non-heme proteins as not.",
      explanations: {
        a: 'Collagen is a structural protein of the extracellular matrix, not a hemoprotein — it carries no heme prosthetic group in the book\'s classification.',
        b: 'Transferrin is an iron-transport protein, but it binds iron directly rather than via a heme prosthetic group, so the book does not list it as a hemoprotein.',
        c: "Correct. The book's table of hemoproteins lists cytochromes, with the function of electron transportation in the respiratory chain.",
        d: "Elastin, like collagen, is a structural extracellular-matrix protein; it does not appear in the book's table of hemoproteins.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p42-q9',
      conceptKey: 'sickle-cell-hbs-point-mutation-basis',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'Attribute sickle cell anaemia\'s malfunction to a single amino-acid substitution rather than a structural, dietary, or heme-binding defect.',
      explanations: {
        a: 'The book does not describe a secondary-structure fault; the defect is a single substituted residue, and the α-helical secondary structure itself is not what changes.',
        b: 'Correct. The book traces the whole malfunction to one point mutation in the β-globin gene, replacing glutamate with valine at position six of the β chain — a single amino-acid substitution.',
        c: "Sickle cell anaemia is not a dietary iron deficiency; the book's account is genetic, a point mutation in the β-globin gene, with no mention of iron intake.",
        d: 'The book does not implicate heme binding; the substituted valine creates a sticky surface patch on the β subunit itself, away from where heme sits.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p42-q10',
      conceptKey: 'heme-porphyrin-structure-and-iron-coordination',
      difficulty: 'Hard',
      questionType: 'Structure and function',
      learningObjective: "Spot that heme's iron is ferrous (Fe2+), not ferric (Fe3+), among otherwise true statements about heme structure.",
      explanations: {
        a: 'True, so not the answer. The book describes heme as built on protoporphyrin, a complex ring structure — the porphin ring of four pyrrole rings linked by methenyl bridges.',
        b: 'This is the false statement, and so the answer. The book is explicit that heme is a ferrous, Fe2+, protoporphyrin IX — not ferric, Fe3+. Iron only becomes ferric when heme is oxidised into hematin, which the globin chain normally prevents.',
        c: 'True, so not the answer. The book states iron in the ferrous state forms six coordination bonds: four to the ring\'s nitrogens, a fifth to the proximal histidine, a sixth for oxygen.',
        d: "True, so not the answer. The book's own table lists several oxygen-transporting/handling hemoproteins — haemoglobin and myoglobin among them — so heme is indeed found in more than one such protein.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p42-q11',
      conceptKey: 'myoglobin-site-function-and-oxygen-affinity',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Locate myoglobin in cardiac and skeletal muscle.',
      explanations: {
        a: 'Nerves are not where the book locates myoglobin; its stated site is cardiac and skeletal muscle.',
        b: 'Blood cells are where hemoglobin works, not myoglobin — the book keeps the two proteins and their sites distinct.',
        c: 'Correct. The book places myoglobin specifically in cardiac and skeletal muscles.',
        d: 'Skin is not a site the book gives for myoglobin; it names only cardiac and skeletal muscle.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p42-q12',
      conceptKey: 'myoglobin-and-hemoglobin-structural-organization',
      difficulty: 'Hard',
      questionType: 'Structure and function',
      learningObjective: 'Recognise that myoglobin and hemoglobin subunits share the same tertiary fold but differ in primary structure, and that myoglobin has no quaternary structure to compare.',
      explanations: {
        a: 'Correct. The book gives apomyoglobin 153 amino acids and 8 helices, the α chain 141 amino acids and 7 helices, and the β chain 146 amino acids and 8 helices — different chain lengths mean different amino-acid sequences, i.e. different primary structures.',
        b: "The book describes myoglobin's and hemoglobin's tertiary folding in the same words — a globular structure with polar amino acids at the surface and nonpolar amino acids inside — so their tertiary structure is shared, not different.",
        c: 'The different residue counts (153 vs 141 vs 146) rule this out; a different number and sequence of amino acids is a different primary structure by definition.',
        d: "Myoglobin, a single chain, has no quaternary structure at all in the book's account; only hemoglobin's four chains are organised into the two-dimer quaternary structure, so there is nothing for it to be 'similar' to.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p42-q13',
      conceptKey: 'sickle-cell-hbs-point-mutation-basis',
      difficulty: 'Challenging',
      questionType: 'Mechanism',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        "Haemoglobin C is never mentioned anywhere in the department book's Chemistry of Hemoproteins pages (physical p40-47). The book names exactly one haemoglobin variant with a stated point mutation, HbS (Glu6→Val, p47), and does not describe HbC, its Glu6→Lys substitution, or any other named haemoglobinopathy besides HbS and the thalassaemias. The printed key (option c, Lys at position six) cannot be verified against the department book, so this row tests a fact the book never teaches rather than one it states incorrectly.",
    },
    {
      key: 'MCQ-102-07f0a0ff-p42-q14',
      conceptKey: 'sickle-cell-hbs-point-mutation-basis',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'Identify HbS\'s origin as a point mutation rather than an insertion, and be cautious about claims (lethality, electrophoretic mobility) the book does not make.',
      explanations: {
        a: 'The book specifically calls this a point mutation (a nucleotide alteration/substitution), not an insertion of a nucleotide, which would be a different kind of mutation altogether.',
        b: 'Correct. The book describes HbS as caused by a single nucleotide alteration — a point mutation — in the β-globin gene, not an insertion.',
        c: 'The book describes sickle cell disease as a chronic condition producing pain and localised infarction from vaso-occlusion, not as incompatible with life; it does not state a lethality claim.',
        d: "The book does not describe HbS's electrophoretic mobility relative to HbA, so this claim is not something the department book supports either way.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p42-q15',
      conceptKey: 'hemoglobin-types-by-developmental-stage-and-chain-composition',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: "State that fetal haemoglobin's higher oxygen affinity aids transplacental oxygen transfer, and give its correct chain composition (α2γ2).",
      explanations: {
        a: 'α2δ2 is HbA2, not HbF — the book gives HbF the composition α2γ2, two alpha and two gamma chains, not delta.',
        b: "The book does not describe HbF's electrophoretic mobility relative to adult haemoglobin, so this is not a claim the department book supports.",
        c: 'Correct. The book states HbF has a higher affinity for oxygen than adult haemoglobin, which allows more efficient transplacental transfer of oxygen from mother to fetus.',
        d: 'The book gives HbA1 as the major adult haemoglobin, 98% of the total; HbF is instead described as present only up to six months after birth, not as the major form found in adults.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p43-q16',
      conceptKey: 'sickle-cell-hbs-point-mutation-basis',
      difficulty: 'Easy',
      questionType: 'Mechanism',
      learningObjective: 'Name valine as the amino acid substituted for glutamate at position six of the β chain in HbS.',
      explanations: {
        a: 'Tyrosine is not the residue the book names; the substituting amino acid is valine.',
        b: 'Correct. The book states the point mutation replaces the polar glutamate at position six of the β chain with a nonpolar valine.',
        c: 'Glycine is not the residue the book names for this substitution; the book specifies valine replacing glutamate.',
        d: 'Serine is not the residue the book names here; serine is instead the amino acid that combines with phosphatidic acid to form phosphatidylserine in an unrelated lipid concept, not the HbS substitution.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p43-q17',
      conceptKey: 'heme-porphyrin-structure-and-iron-coordination',
      difficulty: 'Challenging',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        "2,3-bisphosphoglycerate is never mentioned anywhere in the department book's Chemistry of Hemoproteins pages (physical p40-47). The book's account of the T ('tense', low-affinity) and R ('relaxed', high-affinity) forms of haemoglobin describes only the ionic and hydrogen bonds between the two αβ dimers (p45); it never introduces a BPG-binding pocket, so no option in this set — whether about BPG's charge, which form it binds, where its pocket sits, or its location in deoxyhaemoglobin — can be adjudicated from the department book.",
    },
    {
      key: 'MCQ-102-07f0a0ff-p43-q18',
      conceptKey: 'hemoglobin-types-by-developmental-stage-and-chain-composition',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'State HbA2\'s chain composition (α2δ2) and distinguish it from HbA1 (α2β2) and HbF (α2γ2).',
      explanations: {
        a: 'α2β2 is adult HbA1, the major adult haemoglobin (98%), not HbA2.',
        b: 'Correct. The book states adult HbA2 consists of two alpha and two delta chains (α2δ2) and forms about 2% of total adult haemoglobin.',
        c: 'α2γ2 is fetal haemoglobin, HbF, not HbA2 — the book distinguishes the fetal γ chain from the adult δ chain.',
        d: "The book pairs every haemoglobin's chains with alpha; β2δ2, with no alpha chain at all, does not match any haemoglobin type it describes.",
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p43-q19',
      conceptKey: 'sickle-cell-hbs-point-mutation-basis',
      difficulty: 'Challenging',
      questionType: 'Classification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        "The department book's account of thalassaemia (physical p47) states only that it is hereditary defective production of the α- or β-globin chain, that severity depends on the number of genes affected, and that symptoms range from very mild to severe anaemia and even fetal death. It never defines or names the clinical subtypes ('trait', 'homozygous', a specific gene count for a labelled severity) that every option in this set turns on, so none of the four claims — increased α-globin synthesis, a symptom-free homozygous form, mild anaemia specifically in 'the trait', or a '2 defective genes' definition of 'major' — can be adjudicated from the book's text.",
    },
    {
      key: 'MCQ-102-07f0a0ff-p43-q20',
      conceptKey: 'sickle-cell-hbs-point-mutation-basis',
      difficulty: 'Challenging',
      questionType: 'Classification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        "The department book's account of thalassaemia (physical p47) never mentions compensatory increases in γ- or δ-chain expression, never uses the clinical label 'major', and never ties clinical onset to intrauterine life versus after birth. The printed key (option b, increased γ/δ expression) is a fact the book simply does not state anywhere in this chapter — its own text stops at 'defective production' and a general severity spectrum — so this row tests content the department book never teaches.",
    },
  ],
}
