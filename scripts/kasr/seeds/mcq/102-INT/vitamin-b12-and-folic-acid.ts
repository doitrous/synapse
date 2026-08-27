/**
 * `102 INT > Physiology > Blood > Vitamin B12 and folic acid` — the question
 * books' MCQs.
 *
 * Seven rows, all reusing concepts that already exist — two from the vitamin
 * B12 chapter itself, and two more (vitamin K, iron-deficiency microcytosis)
 * whose questions the bank's page-proximity `modulePathGuess` filed here
 * even though their content belongs to other leaves.
 */
import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Vitamin B12 and folic acid',
  modulePath: '102 INT > Physiology > Blood > Vitamin B12 and folic acid',
  articleId: 'ART-102-PHY-VITAMIN-B12-AND-FOLIC-ACID',

  concepts: [
    {
      key: 'vitamin-b12-absorption-intrinsic-factor',
      label: 'Vitamin B12 is absorbed only after intrinsic factor from the gastric parietal cells binds it and carries it to a receptor in the lower ileum',
      definition:
        'The parietal cells of the stomach secrete intrinsic factor, a glycoprotein that binds vitamin B12 and protects it from digestion. Intrinsic factor also helps bind the vitamin to a specific receptor site on the brush border of the lower ileal mucosa. Pancreatic trypsin is required for the absorption step too, so pancreatic-deficiency disease can also impair vitamin B12 absorption even when intrinsic factor is normal.',
      objective: 'Trace vitamin B12 absorption from parietal-cell intrinsic factor secretion to its ileal receptor, and name pancreatic disease as a second route to defective absorption.',
      pitfall: 'Assuming intrinsic factor is the only requirement for B12 absorption and forgetting pancreatic trypsin — a pancreatic-deficiency disease can impair absorption with intrinsic factor and gastric HCl both intact.',
      subject: 'haem',
      primary: 'DIS-PHY-T05',
      secondary: [],
      modulePath: '102 INT > Physiology > Blood > Vitamin B12 and folic acid',
      type: 'mechanism',
      aliases: ['Intrinsic factor', 'B12 absorption'],
    },
    {
      key: 'vitamin-b12-importance-and-deficiency',
      label: 'Vitamin B12 is needed for DNA synthesis and for myelination, so its deficiency gives both a macrocytic anaemia and neurological signs',
      definition:
        'Vitamin B12 is essential for DNA synthesis, which the bone marrow\'s rapidly dividing cells need for nuclear maturation and division; its deficiency therefore gives macrocytic anaemia (RBCs bigger, irregular and fragile). Folic acid is essential for the same DNA-synthesis step, so its deficiency gives the same macrocytic picture. Vitamin B12 is separately needed for myelination of nerves, so its deficiency can additionally cause neurological manifestations — a job folic acid does not share.',
      objective: 'State that both vitamin B12 and folic acid deficiency cause macrocytic anaemia (via failed DNA synthesis), and that only B12 deficiency additionally causes neurological signs.',
      pitfall: 'Treating vitamin B12 deficiency as a cause of bleeding — it causes a macrocytic anaemia through failed nuclear maturation, not a coagulation-factor or platelet defect, so it does not belong on a list of bleeding-tendency causes.',
      subject: 'haem',
      primary: 'DIS-PHY-T02',
      secondary: [],
      modulePath: '102 INT > Physiology > Blood > Vitamin B12 and folic acid',
      type: 'mechanism',
      aliases: ['B12 deficiency', 'Macrocytic anaemia mechanism', 'Folic acid deficiency'],
    },
    {
      key: 'vitamin-k-deficiency-bleeding-disorder',
      label: 'Vitamin K deficiency lowers hepatic formation of factors II, VII, IX, X and proteins C and S, prolonging coagulation time',
      definition:
        'Vitamin K is a fat-soluble vitamin synthesised by the intestinal bacterial flora and needed by the liver for formation of factors II, VII, IX and X, and proteins C and S. Because it is fat-soluble, its absorption depends on bile; obstruction of the bile ducts removes that bile and so causes vitamin K deficiency and a prolonged coagulation time, alongside absence of intestinal bacterial flora (as in newborns) and prolonged antibiotic treatment.',
      objective: 'Name bile-duct obstruction as a cause of vitamin K deficiency, through loss of the bile needed to absorb it.',
      pitfall: 'Reading "bile duct obstruction causes a bleeding tendency" and reaching for a liver-synthesis explanation (as in liver failure) instead of the fat-soluble-vitamin-absorption explanation the book actually gives — the liver cells themselves are not diseased here, they simply lack the vitamin K substrate to make the clotting factors from.',
      subject: 'haem',
      primary: 'DIS-PHY-T02',
      secondary: [],
      modulePath: '102 INT > Physiology > Blood > Abnormalities of haemostasis',
      type: 'mechanism',
      aliases: ['Vitamin K malabsorption', 'Cholestatic coagulopathy'],
    },
    {
      key: 'teaching.iron-deficiency.microcytic',
      label: 'Iron-deficiency anemia is microcytic and hypochromic',
      definition: 'Iron-deficiency anaemia is classified as microcytic hypochromic anaemia: MCV < 80 μ3 and MCH < 25 pg, reflecting decreased RBC mass and haemoglobin content from too little iron to build haemoglobin.',
      objective: 'State that a low MCV in an anaemic patient points to iron deficiency, distinct from the high MCV of B12/folic-acid deficiency.',
      pitfall: 'Reversing which vitamin deficiency goes with which cell size — iron deficiency shrinks the cell (microcytic), while B12/folic-acid deficiency enlarges it (macrocytic), because the two mechanisms act at different stages (haemoglobin filling vs nuclear division) of red cell production.',
      subject: 'haem',
      primary: 'DIS-PHY-T02',
      secondary: [],
      modulePath: '102 INT > Physiology > Blood > Anaemia',
      type: 'classification',
      aliases: ['Microcytic hypochromic anaemia', 'Low MCV'],
    },
  ],

  questions: [
    {
      key: 'MCQ-102-2093c80b-p7-q2',
      conceptKey: 'vitamin-b12-absorption-intrinsic-factor',
      difficulty: 'Moderate',
      questionType: 'Clinical correlation',
      learningObjective: 'Identify absent intrinsic factor and gastric HCl as the mechanism of pernicious anaemia.',
      explanations: {
        a: 'Pernicious anaemia is an autoimmune disease against the gastric parietal cells (destroying the source of intrinsic factor), not against the red blood cells themselves.',
        b: 'Backwards. Vitamin B12 deficiency, which pernicious anaemia causes, gives macrocytic (large-cell) RBCs, not microcytic ones with low haemoglobin content — that picture belongs to iron deficiency instead.',
        c: 'Correct. Pernicious anaemia follows immune destruction of the parietal cells, which removes both their intrinsic-factor secretion (so vitamin B12 cannot be absorbed) and their gastric HCl secretion together, since the same cells make both.',
        d: 'Pernicious anaemia is a vitamin B12 deficiency disease, not a folic acid one — the two share the same macrocytic-anaemia mechanism (failed DNA synthesis) but different absorption pathways, and this option names the wrong vitamin.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p9-q14',
      conceptKey: 'vitamin-b12-absorption-intrinsic-factor',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'Name pancreatic disease as a cause of defective vitamin B12 absorption, alongside intrinsic-factor loss.',
      explanations: {
        a: 'Backwards. Vitamin B12 deficiency produces RBCs *larger* than normal (macrocytic), not smaller, because failed DNA synthesis leaves the nucleus unable to divide on schedule while the cytoplasm keeps growing.',
        b: 'Backwards. Vitamin B12 stimulates nuclear maturation by enabling DNA synthesis, not by inhibiting a nucleotide precursor — the book states the vitamin is needed *for* DNA synthesis, the opposite direction from "inhibition".',
        c: 'Backwards on location. Vitamin B12 (with intrinsic factor) is absorbed in the lower ileum, not the upper small intestine — the receptor for the bound complex sits in the terminal ileal brush border.',
        d: 'Correct. Pancreatic trypsin is required for vitamin B12 absorption, so pancreatic-deficiency disease can impair absorption independently of intrinsic factor and gastric HCl.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p11-q28',
      conceptKey: 'vitamin-b12-importance-and-deficiency',
      difficulty: 'Easy',
      questionType: 'Mechanism',
      learningObjective: 'Name vitamin B12 and folic acid as the nutrients DNA synthesis and cell division require.',
      explanations: {
        a: 'Iron is needed to build the haem part of haemoglobin, not for DNA synthesis — its deficiency shrinks the cell (microcytic) rather than blocking division.',
        b: 'Correct. Both vitamin B12 and folic acid are essential for DNA synthesis, which the marrow\'s dividing cells need for nuclear maturation and division.',
        c: 'Proteins of high biological value are needed to build the globin part of haemoglobin, a separate requirement from DNA synthesis.',
        d: 'Vitamin C assists iron absorption (reducing ferric to ferrous iron) — it is not what DNA synthesis for cell division depends on.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p12-q31',
      conceptKey: 'vitamin-b12-importance-and-deficiency',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Attribute macrocytic anaemia to vitamin B12 or folic acid deficiency.',
      explanations: {
        a: 'Chronic blood loss depletes iron stores over time and gives the microcytic, hypochromic picture, not macrocytic anaemia.',
        b: 'Bone marrow depression gives normocytic, normochromic anaemia — the marrow simply produces fewer normally-sized cells, rather than producing abnormally large ones.',
        c: 'Iron deficiency gives microcytic, hypochromic anaemia (small, pale cells) — the opposite cell-size direction from macrocytic anaemia.',
        d: 'Correct. Vitamin B12 or folic acid deficiency both block DNA synthesis, failing nuclear maturation and division and leaving bigger, irregular, fragile RBCs — the macrocytic (megaloblastic) picture.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p17-q61',
      conceptKey: 'vitamin-k-deficiency-bleeding-disorder',
      difficulty: 'Moderate',
      questionType: 'Clinical correlation',
      learningObjective: 'Attribute the bleeding tendency of bile-duct obstruction to vitamin K malabsorption.',
      explanations: {
        a: 'Vitamin C assists iron absorption; it plays no part in the coagulation factors and is not associated with a bile-dependent bleeding tendency.',
        b: 'There is no vitamin B2-dependent step in coagulation-factor synthesis in this book; this option names an unrelated vitamin.',
        c: 'Vitamin B12 malabsorption gives a macrocytic anaemia, not a bleeding tendency — it does not touch the coagulation factors at all.',
        d: 'Correct. Vitamin K is fat-soluble and needs bile for its absorption; common bile duct obstruction removes that bile, causing vitamin K deficiency, decreased hepatic synthesis of factors II, VII, IX, X (and proteins C, S), and a bleeding tendency.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p17-q65',
      conceptKey: 'teaching.iron-deficiency.microcytic',
      difficulty: 'Moderate',
      questionType: 'Clinical correlation',
      learningObjective: 'Attribute a low MCV in anaemia to iron deficiency, not to a vitamin B12/folic-acid or haemolytic cause.',
      explanations: {
        a: 'Correct. An MCV of 75 μ3 is below the normal range (< 80 μ3), which the book defines as microcytic — the classification the book gives specifically to iron-deficiency anaemia.',
        b: 'Vitamin B12 deficiency gives a raised MCV (> 95 μ3, macrocytic), the opposite direction from the low value in this case.',
        c: 'Folic acid deficiency, like B12 deficiency, gives a raised MCV (macrocytic), not a reduced one.',
        d: 'G-6PD deficiency causes a haemolytic anaemia, which the book classifies as normocytic normochromic — the cells are the normal size, just fewer of them, which does not match a low MCV.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p18-q68',
      conceptKey: 'vitamin-b12-importance-and-deficiency',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Recognise that vitamin B12 deficiency causes anaemia rather than a bleeding tendency.',
      explanations: {
        a: 'Haemophilia is a clotting-factor deficiency and genuinely causes a bleeding tendency, so it is not the exception.',
        b: 'Thrombocytopenia is a platelet-number deficiency and genuinely causes a bleeding tendency (prolonged bleeding time), so it is not the exception.',
        c: 'Liver failure removes the site where most clotting factors are made and genuinely causes a bleeding tendency, so it is not the exception.',
        d: 'Correct — the exception. Vitamin B12 deficiency blocks DNA synthesis and gives a macrocytic anaemia; it does not touch the coagulation factors or platelets, so it is not accompanied by a bleeding tendency the way the other three conditions are.',
      },
    },
  ],
}
