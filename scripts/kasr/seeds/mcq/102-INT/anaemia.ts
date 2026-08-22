/**
 * `102 INT > Physiology > Blood > Anaemia` — the question books' MCQs.
 *
 * Three rows: one needs a new micro-concept for chronic blood loss (the
 * third of the book's three iron-deficiency causes — malabsorption and low
 * intake already have concepts from the hand-authored physiology batch, but
 * chronic loss did not), and two reuse existing concepts.
 */
import type { McqLeafSeed } from '../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Anaemia',
  modulePath: '102 INT > Physiology > Blood > Anaemia',
  articleId: 'ART-102-PHY-ANAEMIA-AND-POLYCYTHEMIA',

  concepts: [
    {
      key: 'teaching.iron-deficiency.chronic-blood-loss',
      label: 'Chronic blood loss causes iron-deficiency anaemia',
      definition:
        'Chronic blood loss is one of the three causes of iron-deficiency anaemia the book names, alongside deficient dietary intake and deficient absorption. It occurs as in ankylostoma (hookworm) infestation, bleeding from a peptic ulcer or piles, and excessive menstrual bleeding in females — situations where iron is lost from the body faster than diet and absorption can replace it.',
      objective: 'Name chronic blood loss as a cause of iron-deficiency anaemia, distinct from low dietary intake or malabsorption.',
      pitfall: 'Treating "chronic blood loss" and "acute blood loss" as the same mechanism of anaemia — acute haemorrhage gives a normocytic, normochromic dilutional anaemia (the marrow has not yet responded), while chronic loss depletes iron stores over time and produces the microcytic, hypochromic picture instead.',
      subject: 'haem',
      primary: 'DIS-PHY-T02',
      secondary: [],
      modulePath: '102 INT > Physiology > Blood > Anaemia',
      type: 'mechanism',
      aliases: ['Chronic iron loss', 'Ankylostoma-related anaemia'],
    },
    {
      key: 'vitamin-b12-importance-and-deficiency',
      label: 'Vitamin B12 is needed for DNA synthesis and for myelination, so its deficiency gives both a macrocytic anaemia and neurological signs',
      definition:
        'The bone marrow\'s rapidly dividing cells need DNA synthesis for nuclear maturation and division; vitamin B12 is essential for that synthesis, so its deficiency gives macrocytic anaemia (diminished DNA synthesis fails nuclear maturation and division, leaving RBCs bigger, irregular and fragile). Vitamin B12 is also needed for myelination of nerves, so its deficiency can additionally cause neurological manifestations.',
      objective: 'State that vitamin B12 is needed for nuclear maturation/division (via DNA synthesis) and for myelination, and connect its deficiency to both macrocytic anaemia and neurological signs.',
      pitfall: 'Naming only the hematologic effect of B12 deficiency and missing the neurological one, or vice versa — the book states both come from the one vitamin\'s two separate jobs, not from one mechanism.',
      subject: 'haem',
      primary: 'DIS-PHY-T02',
      secondary: [],
      modulePath: '102 INT > Physiology > Blood > Vitamin B12 and folic acid',
      type: 'mechanism',
      aliases: ['B12 deficiency', 'Macrocytic anaemia mechanism'],
    },
    {
      key: 'polycythemia-primary-and-secondary',
      label: 'Polycythemia is an increased RBC count up to 6-8 million/mm3, either primary (a marrow disorder) or secondary (tissue hypoxia)',
      definition:
        'Polycythemia means an increased number of RBCs, which may reach 6–8 million/mm3. Primary polycythemia (polycythemia vera) is due to a condition in the RBC-forming organs themselves and is usually accompanied by increased WBC and platelet production too. Secondary polycythemia occurs when the tissues become hypoxic, as in obstructive lung disease and in people living at high altitude.',
      objective: 'Distinguish primary polycythemia (a marrow disorder, raises all three cell lines) from secondary polycythemia (a hypoxic drive, raises RBCs only), and name situations that cause each.',
      pitfall: 'Assuming any raised RBC count implies marrow disease — living at high altitude raises the count too, through the ordinary hypoxia–erythropoietin pathway, and is secondary rather than primary polycythemia; liver disease is not a recognised cause of either.',
      subject: 'haem',
      primary: 'DIS-PHY-T02',
      secondary: [],
      modulePath: '102 INT > Physiology > Blood > Anaemia',
      type: 'classification',
      aliases: ['Polycythemia vera', 'Secondary polycythemia'],
    },
  ],

  questions: [
    {
      key: 'MCQ-102-2093c80b-p10-q22',
      conceptKey: 'teaching.iron-deficiency.chronic-blood-loss',
      difficulty: 'Easy',
      questionType: 'Mechanism',
      learningObjective: 'Name chronic blood loss as a cause of iron deficiency.',
      explanations: {
        a: 'Backwards. The book names chronic blood loss as more common in females than males, largely through menstrual loss — not the other way round.',
        b: 'Iron deficiency limits haemoglobin synthesis in the RBCs the marrow already produces; it does not itself slow stem-cell multiplication, which is the mechanism taught for vitamin B12/folic-acid deficiency instead.',
        c: 'Correct. Chronic blood loss — from hookworm infestation, peptic ulcer or piles bleeding, or excessive menstrual loss — is one of the book\'s three named causes of iron-deficiency anaemia.',
        d: 'Backwards. Iron deficiency produces small, pale (microcytic, hypochromic) erythrocytes, not large pale ones — large pale cells are the macrocytic picture of vitamin B12 or folic acid deficiency instead.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p11-q25',
      conceptKey: 'vitamin-b12-importance-and-deficiency',
      difficulty: 'Easy',
      questionType: 'Mechanism',
      learningObjective: 'State that vitamin B12 is needed for nuclear maturation and cell division.',
      explanations: {
        a: 'Backwards. Vitamin B12 deficiency produces macrocytic (large-cell) anaemia, because diminished DNA synthesis fails nuclear maturation and division, leaving bigger, irregular, fragile RBCs — not normocytic anaemia.',
        b: 'Gastric HCl is what iron absorption needs (to reduce ferric to ferrous iron); vitamin B12 absorption instead needs intrinsic factor from the gastric parietal cells and pancreatic trypsin.',
        c: 'Backwards on location. Vitamin B12, bound to intrinsic factor, is absorbed in the lower ileum, not the upper small intestine — the receptor for the intrinsic-factor complex sits in the brush border of the terminal ileal mucosa.',
        d: 'Correct. The bone marrow\'s rapidly dividing cells need DNA synthesis for nuclear maturation and division, and vitamin B12 is essential for that synthesis.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p12-q32',
      conceptKey: 'polycythemia-primary-and-secondary',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Recognise that high altitude raises RBC count (polycythemia) rather than causing anaemia.',
      explanations: {
        a: 'Correct — the exception. Living at high altitude raises the RBC count through the hypoxia–erythropoietin pathway (secondary polycythemia); it does not cause anaemia, which is the opposite direction of change.',
        b: 'Bone marrow depression is a genuine cause of anaemia (normocytic, normochromic — the marrow simply cannot keep up production), so it is not the exception.',
        c: 'Atrophy of the gastric mucosa removes the parietal cells that secrete intrinsic factor, causing vitamin B12 malabsorption and macrocytic anaemia — a genuine cause, so not the exception.',
        d: 'Iron deficiency is the book\'s standard cause of microcytic hypochromic anaemia, so it is not the exception.',
      },
    },
  ],
}
