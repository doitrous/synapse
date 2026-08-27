/**
 * `102 INT > Physiology > Blood > Iron` — the question books' MCQs.
 *
 * Ten rows. Every live question reuses a concept that already exists —
 * mostly the iron-absorption mechanism, plus one haemoglobin-chemistry row
 * and one iron-deficiency row the bank's page-proximity `modulePathGuess`
 * filed here from neighbouring leaves. Two rows have no printed answer key.
 * One row (an OCR key conflict between two options) is resolved from the
 * module book rather than guessed.
 */
import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Iron',
  modulePath: '102 INT > Physiology > Blood > Iron',
  articleId: 'ART-102-PHY-IRON-METABOLISM',

  concepts: [
    {
      key: 'hemoglobin-chemical-reactions',
      label: 'Haemoglobin undergoes four named chemical reactions - with oxygen, carbon dioxide, carbon monoxide, and strong oxidizing agents',
      definition:
        'Haemoglobin reacts with oxygen to form oxyhaemoglobin — the iron stays ferrous (Fe2+), so this is oxygenation, not oxidation. It reacts with carbon dioxide, attached to the globin\'s polypeptide chains rather than the iron, to form carbaminohaemoglobin. It reacts with carbon monoxide to form carboxyhaemoglobin. On exposure to strong oxidizing agents, the ferrous iron is oxidised to ferric iron (Fe3+), forming dark-coloured methaemoglobin, which cannot carry oxygen; small amounts form normally and are reduced back by NADH-methaemoglobin reductase.',
      objective: 'Name each of haemoglobin\'s four chemical reactions by its ligand and resulting compound, and state which one changes the iron\'s oxidation state.',
      pitfall: 'Confusing carbon dioxide\'s reaction (carbaminohaemoglobin, at the globin chains) with carbon monoxide\'s reaction (carboxyhaemoglobin, at the iron) — the two gases share a name-sounding pair of products but bind at different sites for different reasons.',
      subject: 'haem',
      primary: 'DIS-PHY-T02',
      secondary: [],
      modulePath: '102 INT > Physiology > Blood > RBCs and haemoglobin',
      type: 'mechanism',
      aliases: ['Oxyhaemoglobin', 'Carboxyhaemoglobin', 'Methaemoglobin', 'Carbaminohaemoglobin'],
    },
    {
      key: 'iron-absorption-mechanism-dmt1-hcp1-ferroportin',
      label: 'Enterocytes absorb ferrous iron via DMT1 and haem iron via HCP1, then either store it as ferritin or export it through ferroportin to bind plasma transferrin',
      definition:
        'Iron is absorbed by duodenal enterocytes. At the apical membrane, ferrous iron (Fe2+) crosses via the divalent metal transporter 1 (DMT1); ferric iron (Fe3+) not already reduced in the stomach is reduced to ferrous by a duodenal reductase enzyme first. Gastric HCl and ascorbic acid (vitamin C) assist this ferric-to-ferrous reduction. Haem iron is transported separately, by the heme carrier protein (HCP1). Inside the enterocyte, iron is either stored as ferritin/haemosiderin and lost with sloughed enterocytes (when demand is low), or exported at the basolateral membrane through ferroportin, oxidised to Fe3+ by ferroxidase, and bound to plasma transferrin (normally 35% saturated) for delivery to cells with transferrin receptors — bone marrow, liver and muscle.',
      objective: 'Trace iron from the intestinal lumen through DMT1/HCP1 into the enterocyte, and from there through ferroportin to plasma transferrin.',
      pitfall: 'Reversing which form of iron is better absorbed — the book states ferrous iron (Fe2+) is the absorbable form, and that gastric HCl and vitamin C exist specifically to reduce ferric iron (Fe3+) down to it, not the other way round.',
      subject: 'haem',
      primary: 'DIS-PHY-T02',
      secondary: [],
      modulePath: '102 INT > Physiology > Blood > Iron',
      type: 'mechanism',
      aliases: ['DMT1', 'HCP1', 'Ferroportin', 'Iron absorption'],
    },
    {
      key: 'teaching.iron-deficiency.low-intake',
      label: 'Low dietary iron causes iron-deficiency anemia, especially in growth and pregnancy',
      definition: 'Deficiency of iron in the diet is one of the book\'s three named causes of iron-deficiency anaemia, due to a lower iron intake than the body needs; it is more common in growing children and during pregnancy, when demand for iron rises.',
      objective: 'Name low dietary intake as a cause of iron-deficiency anaemia, and the two life stages the book flags as most at risk.',
      pitfall: 'Treating "low intake" and "malabsorption" as one cause — the book separates them: low intake is simply not enough iron in the diet, while malabsorption is a normal-or-adequate diet the gut fails to take up (partial gastrectomy, vitamin C deficiency, phytate/oxalate/phosphate excess, small-bowel disease).',
      subject: 'haem',
      primary: 'DIS-PHY-T02',
      secondary: [],
      modulePath: '102 INT > Physiology > Blood > Anaemia',
      type: 'mechanism',
      aliases: ['Dietary iron deficiency'],
    },
  ],

  questions: [
    {
      key: 'MCQ-102-2093c80b-p8-q7',
      conceptKey: 'hemoglobin-chemical-reactions',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'Name carbaminohaemoglobin as the compound formed between the globin chains and carbon dioxide.',
      explanations: {
        a: 'Each haemoglobin molecule carries four oxygen molecules — one per haem group — not eight; eight is double the true figure and a common overreach from remembering "four haem groups" without the one-to-one ratio.',
        b: 'Haemoglobin contains four haem groups, each with one iron atom, so four atoms of iron in total, not two.',
        c: 'Haemoglobin forms oxyhaemoglobin with oxygen, not carbon monoxide — carbon monoxide instead forms carboxyhaemoglobin, a different reaction the book names separately.',
        d: 'Correct. The globin (polypeptide) part of haemoglobin forms carbamino compounds with carbon dioxide — carbaminohaemoglobin — distinct from the iron-based reactions with oxygen, carbon monoxide and oxidising agents.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p8-q11',
      conceptKey: 'hemoglobin-chemical-reactions',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'No printed answer key was recovered by either OCR pass (`correctSource: "none"`).',
    },
    {
      key: 'MCQ-102-2093c80b-p9-q13',
      conceptKey: 'iron-absorption-mechanism-dmt1-hcp1-ferroportin',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'No printed answer key was recovered by either OCR pass (`correctSource: "none"`).',
    },
    {
      key: 'MCQ-102-2093c80b-p10-q24',
      conceptKey: 'iron-absorption-mechanism-dmt1-hcp1-ferroportin',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'State that iron is transported in the blood bound to transferrin.',
      explanations: {
        a: 'Backwards. Ferric iron is the form that is *not* readily absorbed — it must first be reduced to the ferrous form, and absorption occurs mainly in the duodenum, not the upper small intestine generically.',
        b: 'Correct. Iron exported from enterocytes (or released from macrophage recycling of old RBCs) is oxidised to the ferric form and carried in the blood bound to the plasma transport protein transferrin.',
        c: 'Backwards. Iron deficiency produces microcytic, not macrocytic, anaemia — macrocytic anaemia is the vitamin B12/folic-acid picture.',
        d: 'Ferritin, the iron-storage protein, is concentrated mainly in the liver, spleen, intestinal enterocytes and bone marrow together — the book does not single out the bone marrow as holding the greatest percentage.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p11-q26',
      conceptKey: 'iron-absorption-mechanism-dmt1-hcp1-ferroportin',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'Name vitamin C as an aid to iron absorption via ferric-to-ferrous reduction.',
      explanations: {
        a: 'Backwards. Ferrous iron crosses the apical enterocyte membrane via the active transporter DMT1, not by passive diffusion.',
        b: 'Backwards. Iron absorption *increases* after acute blood loss, as the body tries to replenish lost iron — the book does not describe blood loss as decreasing absorption.',
        c: 'Backwards. Iron is stored in the liver mainly as ferritin (and its aggregate, haemosiderin), not as transferrin, which is the plasma transport protein rather than a storage form.',
        d: 'Correct. Ascorbic acid (vitamin C) and other reducing substances help reduce ferric iron (Fe3+) to the absorbable ferrous form (Fe2+), assisted by gastric HCl.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p11-q27',
      conceptKey: 'iron-absorption-mechanism-dmt1-hcp1-ferroportin',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'State that iron absorption requires gastric HCl.',
      explanations: {
        a: 'Backwards. Iron is better absorbed in the ferrous state (Fe2+) — ferric iron (Fe3+) must first be reduced before it can cross via DMT1.',
        b: 'Correct. Gastric HCl helps dissolve dietary iron and, with ascorbic acid, reduce ferric iron to the absorbable ferrous form.',
        c: 'Backwards. Iron absorption is an active, carrier-mediated process (DMT1 and HCP1), not passive diffusion, though how much of the absorbed iron is retained does depend on body requirements at the intracellular-fate step.',
        d: 'Backwards. Iron is absorbed mainly in the duodenum, the upper part of the small intestine, not the lower part — the lower ileum is instead where vitamin B12 is absorbed, and the two are a standard mix-up.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p11-q29',
      conceptKey: 'teaching.iron-deficiency.low-intake',
      difficulty: 'Easy',
      questionType: 'Mechanism',
      learningObjective: 'Name decreased dietary iron intake as a cause of microcytic hypochromic anaemia.',
      explanations: {
        a: 'Decreased vitamin B12 intake causes macrocytic anaemia (large cells), not microcytic hypochromic anaemia (small, pale cells) — the two deficiencies act at different stages of red cell production.',
        b: 'Correct. Iron-deficiency anaemia — microcytic and hypochromic because too little haemoglobin can be built — follows from decreased dietary iron intake, among the book\'s named causes.',
        c: 'Heart disease is not one of the book\'s causes of iron-deficiency anaemia; it does not appear in the diet/absorption/blood-loss list.',
        d: 'Acute massive bleeding gives a dilutional, normocytic normochromic anaemia in the short term (the liver replaces lost plasma faster than the marrow can replace lost cells) — not the microcytic hypochromic picture of chronic iron depletion.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p11-q30',
      conceptKey: 'iron-absorption-mechanism-dmt1-hcp1-ferroportin',
      difficulty: 'Hard',
      questionType: 'Mechanism',
      learningObjective: 'Identify the duodenum, not the terminal ileum, as the main site of iron absorption.',
      answerOverride: 'd',
      answerOverrideReason:
        'The two OCR passes disagreed between options C and D for this except-question, but both C and D read as true statements of the book\'s own text and neither can be the exception: (C) "ferrous iron is better absorbed than ferric iron" restates the book\'s DMT1/reduction mechanism directly (physical p129), and by elimination the false statement — the actual exception — is (D). The module book names the duodenum, not the terminal ileum, as where iron absorption mainly occurs ("Iron is absorbed by the ENTEROCYTES of the intestinal mucosa mainly in the DUODENUM", physical p129) — the terminal ileum is where vitamin B12 is absorbed instead, a standard confusion the book\'s own chapter ordering invites.',
      explanations: {
        a: 'True, so not the exception. Antacids raise gastric pH, which works against the acid-catalysed reduction of ferric to ferrous iron the book describes, so they do reduce absorption.',
        b: 'True, so not the exception. The book states plainly that heme iron (10% of dietary iron, from meat) is more absorbable than non-heme iron (90%, from plant sources).',
        c: 'True, so not the exception. Ferrous iron (Fe2+) is the form DMT1 transports; ferric iron (Fe3+) must first be reduced, which is why the book calls ferrous the better-absorbed form.',
        d: 'The exception, and the answer. The book names the duodenum as where most iron absorption happens, not the terminal ileum — which is instead the site of vitamin B12 absorption, a distinct chapter\'s mechanism entirely.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p15-q51',
      conceptKey: 'iron-absorption-mechanism-dmt1-hcp1-ferroportin',
      difficulty: 'Easy',
      questionType: 'Normal values',
      learningObjective: 'Name transferrin as the plasma iron transport protein.',
      explanations: {
        a: 'Haemosiderin is an aggregate storage form of iron, mainly in the liver, spleen and bone marrow — it is not what carries iron through the circulation.',
        b: 'Ferritin is the main intracellular storage form of iron, not the circulating transport protein.',
        c: 'Secretin is a gastrointestinal hormone that stimulates pancreatic bicarbonate secretion; it has no role in iron transport.',
        d: 'Correct. Transferrin is the plasma protein that binds ferric iron exported from enterocytes or macrophages and delivers it to cells with transferrin receptors — bone marrow, liver and muscle.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p16-q58',
      conceptKey: 'iron-absorption-mechanism-dmt1-hcp1-ferroportin',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'Name gastric HCl secretion as why a healthy stomach matters for iron absorption.',
      explanations: {
        a: 'Correct. A healthy stomach secretes HCl, which dissolves dietary iron and — with vitamin C — reduces ferric iron to the ferrous form that DMT1 can transport, so achlorhydria (decreased HCl secretion) is associated with iron deficiency.',
        b: 'Intrinsic factor secretion is what a healthy stomach contributes to vitamin B12 absorption, not iron absorption — the two nutrients depend on different gastric secretions.',
        c: 'Pepsin secretion digests dietary protein; the book does not connect it to iron absorption.',
        d: 'Transferrin is made by the liver and secreted into plasma, not by the stomach — it is not a gastric secretion at all.',
      },
    },
  ],
}
