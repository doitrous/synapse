/**
 * `102 INT > Physiology > Blood > Erythropoiesis` — the question books' MCQs.
 *
 * Ten rows, all reusing concepts that already exist (erythropoietin,
 * erythropoiesis site, RBC count variation, polycythemia, and vitamin B12
 * absorption — the last two tested from this leaf because the correct
 * option in each row is really about a neighbouring leaf's fact). Two rows
 * carry no printed answer key.
 */
import type { McqLeafSeed } from '../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Erythropoiesis',
  modulePath: '102 INT > Physiology > Blood > Erythropoiesis',
  articleId: 'ART-102-PHY-ERYTHROPOIESIS',

  concepts: [
    {
      key: 'erythropoietin-source-and-regulation',
      label: 'Erythropoietin, mainly renal in the adult (85%, with 15% hepatic), is stimulated chiefly by hypoxia and speeds every step of erythropoiesis',
      definition:
        'Erythropoietin is a glycoprotein hormone present in plasma at low concentration. In fetal life it is almost completely formed by the liver; in adults, 85% is formed by the kidneys and 15% by the liver — which is why renal failure causes severe anaemia the liver cannot compensate for. It stimulates every step of erythropoiesis, binding erythropoietin-sensitive-cell receptors to stimulate mitosis and inhibit apoptosis. Its secretion is stimulated chiefly by hypoxia (the main stimulus, occurring at high altitude, with increased oxygen demand as in athletes, after haemorrhage, in lung disease and in heart failure), and also by the alkalosis of high altitude, cobalt salts, androgens, β-adrenergic stimulants and adenosine.',
      objective: 'State the renal/hepatic split of erythropoietin production in the adult, name hypoxia as its chief stimulus, and describe its mechanism (speeding every erythropoiesis step via mitosis-stimulating, apoptosis-inhibiting receptor binding).',
      pitfall: 'Reversing the adult renal/hepatic percentages, or forgetting that the split flips in fetal life (liver-dominant) — a question about renal failure and anaemia only makes sense once the 85%-renal figure is fixed for the adult case being asked about.',
      subject: 'haem',
      primary: 'DIS-PHY-T02',
      secondary: [],
      modulePath: '102 INT > Physiology > Blood > Erythropoiesis',
      type: 'mechanism',
      aliases: ['EPO', 'Renal erythropoietin'],
    },
    {
      key: 'rbc-count-normal-values-and-variation',
      label: 'The normal RBC count is 5–5.5 million/mm3 in males and 4–4.5 million/mm3 in females, higher in newborns, high altitude and athletes, and lower in growing children and old age',
      definition:
        'The average RBC count ranges from 5–5.5 million/mm3 in males and 4–4.5 million/mm3 in females. The count is high in newly born infants, at high altitudes and in athletes, and is lower in growing children and in old age.',
      objective: 'Name high altitude, alongside newborns and athletes, as a state of higher-than-normal RBC count.',
      pitfall: 'Treating the raised RBC count at high altitude as pathological — it is the ordinary, expected hypoxia-driven response the book lists alongside newborns and athletes, not a disease state.',
      subject: 'haem',
      primary: 'DIS-PHY-T02',
      secondary: [],
      modulePath: '102 INT > Physiology > Blood > RBCs and haemoglobin',
      type: 'normal_values',
      aliases: ['Normal RBC count', 'Erythrocyte count'],
    },
    {
      key: 'polycythemia-primary-and-secondary',
      label: 'Polycythemia is an increased RBC count up to 6-8 million/mm3, either primary (a marrow disorder) or secondary (tissue hypoxia)',
      definition:
        'Polycythemia means an increased number of RBCs, which may reach 6–8 million/mm3. Primary polycythemia (polycythemia vera) is due to a condition in the RBC-forming organs themselves. Secondary polycythemia occurs when the tissues become hypoxic, as in obstructive lung disease and in people living at high altitude — driven by the same erythropoietin pathway that raises the RBC count in these situations.',
      objective: 'Distinguish primary polycythemia from secondary (hypoxia-driven) polycythemia, and connect the latter to erythropoietin secretion.',
      pitfall: 'Treating liver disease as a cause of polycythemia — it is not one the book names for either type; liver disease instead reduces the liver\'s 15% contribution to erythropoietin, if anything working against polycythemia rather than causing it.',
      subject: 'haem',
      primary: 'DIS-PHY-T02',
      secondary: [],
      modulePath: '102 INT > Physiology > Blood > Anaemia',
      type: 'classification',
      aliases: ['Polycythemia vera', 'Secondary polycythemia'],
    },
    {
      key: 'vitamin-b12-absorption-intrinsic-factor',
      label: 'Vitamin B12 is absorbed only after intrinsic factor from the gastric parietal cells binds it and carries it to a receptor in the lower ileum',
      definition:
        'The parietal cells of the stomach secrete intrinsic factor, which binds vitamin B12, protects it from digestion, and helps bind it to a receptor in the lower ileal mucosa. Gastric HCl is secreted by the same cells alongside intrinsic factor, so a healthy stomach matters for vitamin B12 absorption specifically through parietal-cell function, just as it matters for iron absorption through the HCl it provides.',
      objective: 'Explain why a healthy stomach is needed for erythropoiesis: it provides intrinsic factor for vitamin B12 absorption and HCl for iron absorption, both from the same organ but through different mechanisms.',
      pitfall: 'Assuming the stomach\'s only erythropoiesis-relevant job is iron-related — gastric parietal cells separately secrete intrinsic factor, without which vitamin B12 cannot be absorbed at all, regardless of how much is eaten.',
      subject: 'haem',
      primary: 'DIS-PHY-T05',
      secondary: [],
      modulePath: '102 INT > Physiology > Blood > Vitamin B12 and folic acid',
      type: 'mechanism',
      aliases: ['Intrinsic factor', 'B12 absorption'],
    },
    {
      key: 'erythropoiesis-site-by-age',
      label: 'The site of erythropoiesis shifts with age - liver and spleen in the fetus, all bones after birth, then only membranous bones after age 20 - and needs healthy marrow',
      definition:
        'Erythropoiesis occurs in the liver and spleen during fetal life; after birth, in active red marrow throughout the cavities of all bones (long bones\' marrow becomes inactive yellow marrow by age 20, except the upper humerus and femur); after age 20, only membranous bones — vertebrae, skull, ribs and pelvis — continue producing erythrocytes. The bone marrow contains the haemopoietic stem cells from which erythrocytes develop, and healthy marrow is essential for the process; marrow destruction (by X-ray, atomic radiation, drugs such as chloramphenicol, or malignant tumours) causes aplastic anaemia.',
      objective: 'State where erythropoiesis occurs at each life stage, and name the haemopoietic stem cell population that makes active marrow the site of the process.',
      pitfall: 'Assuming any bone can make blood cells throughout adult life — after age 20 only the membranous bones (vertebrae, skull, ribs, pelvis) retain active marrow; the long bones\' shafts have converted to fatty yellow marrow by then.',
      subject: 'haem',
      primary: 'DIS-PHY-T02',
      secondary: [],
      modulePath: '102 INT > Physiology > Blood > Erythropoiesis',
      type: 'mechanism',
      aliases: ['Red marrow', 'Yellow marrow', 'Haemopoietic stem cells'],
    },
  ],

  questions: [
    {
      key: 'MCQ-102-2093c80b-p7-q1',
      conceptKey: 'rbc-count-normal-values-and-variation',
      difficulty: 'Easy',
      questionType: 'Normal values',
      learningObjective: 'State that RBC count is higher than normal in people living at high altitude.',
      explanations: {
        a: 'Correct. RBC count runs above the adult range at high altitude, alongside newborns and athletes — a physiological, hypoxia-driven response, not a disease.',
        b: 'Backwards. The biconcave shape enhances flexibility so erythrocytes can be squeezed through narrow capillaries *without* rupturing — it facilitates safe passage, not rupture.',
        c: 'Erythrocytes do not synthesize erythropoietin — the kidney (85%) and liver (15%) do, and erythrocytes are the *targets* of erythropoietin\'s action, not its source.',
        d: 'The erythrocyte membrane keeps haemoglobin inside to prevent the *hazards* of free plasma haemoglobin (renal tubule blockage, raised viscosity, raised colloidal osmotic pressure) — those hazards raise cardiac workload if the membrane fails, so the membrane\'s job is to prevent an *increased*, not decreased, heart load.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p7-q5',
      conceptKey: 'erythropoietin-source-and-regulation',
      difficulty: 'Hard',
      questionType: 'Mechanism',
      learningObjective: 'Recognise adenosine as a stimulator of erythropoietin secretion, so its antagonists inhibit secretion.',
      explanations: {
        a: 'Backwards. In adults, erythropoietin is secreted 85% by the kidney and 15% by the liver — the option gives the reversed split.',
        b: 'Backwards. Erythropoietin secretion is stimulated by the alkalosis that develops at high altitude, not by acidosis — the book names alkalosis specifically.',
        c: 'Backwards. Erythropoietin is synthesized and released by the kidneys and liver, not by red blood cells — RBCs are the downstream product of erythropoiesis, not a source of the hormone driving it.',
        d: 'Correct. Adenosine is one of the book\'s named stimulators of erythropoietin secretion, so an adenosine antagonist — blocking that stimulus — would inhibit secretion rather than promote it.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p8-q10',
      conceptKey: 'erythropoietin-source-and-regulation',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'State that erythropoietin speeds every step of erythropoiesis, from proerythroblast to mature RBC.',
      explanations: {
        a: 'Backwards. Erythropoietin is secreted 85% by the kidney and only 15% by the bone marrow-adjacent liver split described in the book — the option reverses the percentages and misnames the second source.',
        b: 'Cobalt salts and acidosis are not paired as stimulators in the book — cobalt salts are named as a stimulator, but the specific altitude-related stimulus named is alkalosis, not acidosis.',
        c: 'Backwards. Erythropoietin stimulates mitosis of erythropoietin-*sensitive* committed cells, which the book distinguishes from the uncommitted stem cell pool further upstream — "uncommitted" is the wrong target population.',
        d: 'Correct. Erythropoietin stimulates all steps of erythropoiesis — from the earliest proerythroblast through to the mature red cell — which is the mechanism the book states directly.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p10-q19',
      conceptKey: 'erythropoiesis-site-by-age',
      difficulty: 'Moderate',
      questionType: 'Normal values',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'No printed answer key was recovered by either OCR pass (`correctSource: "none"`).',
    },
    {
      key: 'MCQ-102-2093c80b-p10-q20',
      conceptKey: 'erythropoietin-source-and-regulation',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'No printed answer key was recovered by either OCR pass (`correctSource: "none"`).',
    },
    {
      key: 'MCQ-102-2093c80b-p10-q21',
      conceptKey: 'polycythemia-primary-and-secondary',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Recognise that liver disease is not a named cause of polycythemia.',
      explanations: {
        a: 'Correct — the exception. Liver disease is not among the book\'s causes of either primary or secondary polycythemia; if anything, since the liver makes 15% of erythropoietin, liver disease would work against a raised count, not toward one.',
        b: 'Increased RBC number genuinely increases blood viscosity (the book states viscosity rises in polycythemia and falls in anaemia), so this is a true statement and not the exception.',
        c: 'High altitude is the book\'s own named example of secondary polycythemia, through tissue hypoxia, so this is true and not the exception.',
        d: 'A high level of erythropoietin secretion is exactly the mechanism driving secondary polycythemia, so this is true and not the exception.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p10-q23',
      conceptKey: 'vitamin-b12-absorption-intrinsic-factor',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'State that the stomach\'s role in erythropoiesis includes absorption of both vitamin B12 and iron.',
      explanations: {
        a: 'Folic acid absorption is not described in the book as gastric-dependent the way vitamin B12 and iron are — it does not require intrinsic factor or gastric acid.',
        b: 'Correct. Gastric parietal cells provide intrinsic factor (needed for vitamin B12 absorption in the lower ileum) and gastric HCl (needed to reduce dietary iron to its absorbable ferrous form) — both nutrients the stomach makes possible, through different secretions from the same organ.',
        c: 'Erythropoietin is secreted by the kidney (85%) and liver (15%), not by the stomach.',
        d: 'The globin part of haemoglobin is formed by the liver, not the stomach.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p15-q54',
      conceptKey: 'erythropoietin-source-and-regulation',
      difficulty: 'Easy',
      questionType: 'Clinical correlation',
      learningObjective: 'Attribute renal-failure anaemia to loss of the kidney\'s 85% share of erythropoietin production.',
      explanations: {
        a: 'The stem cells are present in the marrow in renal failure — the marrow itself is not the diseased organ here, the kidney is, and the marrow simply lacks the hormonal drive to use those stem cells at full rate.',
        b: 'Correct. Since the kidney normally makes 85% of erythropoietin and the liver\'s 15% cannot compensate for its loss, renal failure causes severe anaemia through erythropoietin deficiency.',
        c: 'Renal failure does not stop a patient eating essential vitamins — the anaemia mechanism here is hormonal (lost erythropoietin), not nutritional.',
        d: 'The book attributes renal-failure anaemia to lost erythropoietin drive, not to a congenital marrow anomaly, which is an unrelated and unstated mechanism.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p16-q55',
      conceptKey: 'erythropoietin-source-and-regulation',
      difficulty: 'Moderate',
      questionType: 'Clinical correlation',
      learningObjective: 'Attribute heart-failure-stimulated erythropoiesis to tissue hypoxia driving erythropoietin secretion.',
      explanations: {
        a: 'Backwards. Heart failure is one of the book\'s named causes of hypoxia (reduced tissue perfusion), which *stimulates* erythropoietin secretion — the option claims the opposite, that secretion cannot occur.',
        b: 'The book does not connect heart failure to decreased iron absorption; the stimulus it names for heart-failure erythropoiesis is hypoxia, not an iron-supply change.',
        c: 'The book does not describe heart failure as raising blood vitamin B12 — this option names an unconnected mechanism.',
        d: 'Correct. Heart failure reduces tissue oxygen delivery — hypoxia — which is the main stimulus for erythropoietin secretion and so for erythropoiesis, exactly as at high altitude or after haemorrhage.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p16-q56',
      conceptKey: 'erythropoiesis-site-by-age',
      difficulty: 'Easy',
      questionType: 'Mechanism',
      learningObjective: 'State that bone marrow is the site of erythropoiesis because it contains haemopoietic stem cells.',
      explanations: {
        a: 'Intrinsic factor receptors are found in the lower ileal mucosa (for vitamin B12 absorption), not in the bone marrow.',
        b: 'Correct. Active bone marrow contains the haemopoietic stem cells from which erythrocytes (and the other blood cell lines) develop — their presence, in healthy marrow, is what makes the marrow the site of erythropoiesis after birth.',
        c: 'Megakaryocytes are present in bone marrow, but they are the platelet-producing cells, not what makes the marrow the site of erythropoiesis specifically.',
        d: 'Alkaline phosphatase is not named by the book as a reason marrow supports erythropoiesis; it is not part of this mechanism.',
      },
    },
  ],
}
