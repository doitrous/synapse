/**
 * `102 INT > Physiology > Blood > Plasma proteins` — the question books' MCQs.
 *
 * Nine rows. Every live question tests the one concept already minted for
 * this leaf from the hand-authored physiology batch, which covers formation
 * site and all eight named functions. Three rows carry no printed answer key.
 */
import type { McqLeafSeed } from '../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Plasma proteins',
  modulePath: '102 INT > Physiology > Blood > Plasma proteins',
  articleId: 'ART-102-PHY-PLASMA-PROTEINS',

  concepts: [
    {
      key: 'plasma-proteins-formation-and-functions',
      label:
        'The liver makes albumin, fibrinogen, the clotting factors and half the globulins while plasma cells make the gamma globulins, and between them the plasma proteins hold water in the capillary, buffer the blood, defend it, clot it, thicken it, seal the capillary pores, carry small molecules and store amino acids',
      definition:
        'The liver is the main site of plasma protein synthesis — albumin, fibrinogen, coagulation factors and 50% of globulins. Gamma globulins are made by plasma cells in lymphoid tissue instead. Functions: (1) osmotic — albumin, with the greatest concentration, is mainly responsible for the effective colloidal osmotic pressure (25–28 mmHg) that draws tissue fluid back into the capillary; (2) buffer — at normal plasma pH (7.4) plasma proteins are negatively charged, acting as weak acids (anions) that combine with bases; (3) defensive — gamma globulins provide humoral immunity; (4) clotting — fibrinogen and the clotting factors; (5) viscosity — fibrinogen contributes most, because of its elongated shape; (6) capillary permeability — plasma proteins close the capillary pores, and their deficiency increases permeability; (7) transport — albumin and the globulins carry hormones, vitamins, lipids and minerals, protecting them from urinary loss; (8) amino-acid source — plasma proteins act as a rapid-replacement reservoir for tissue protein depletion. The albumin/globulin ratio is normally 1.2–1.6 and falls in liver disease, renal disease and infections.',
      objective: 'Name which cells make which plasma protein, and match each of the eight functions to the protein class most responsible for it.',
      pitfall: 'Assuming plasma proteins are positively charged because most body cations are — at normal plasma pH they are negatively charged and act as weak acids, which is exactly why they contribute to the buffer system.',
      subject: 'haem',
      primary: 'DIS-PHY-T02',
      secondary: [],
      modulePath: '102 INT > Physiology > Blood > Plasma proteins',
      type: 'structure_function_relationship',
      aliases: ['Albumin function', 'Globulin function', 'Colloidal osmotic pressure'],
    },
  ],

  questions: [
    {
      key: 'MCQ-102-2093c80b-p7-q3',
      conceptKey: 'plasma-proteins-formation-and-functions',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'Name albumin as chiefly responsible for the plasma colloidal osmotic pressure.',
      explanations: {
        a: 'Backwards. Osmotic pressure depends on the *number of particles* in solution, and albumin has the *smallest* molecular weight of the major plasma proteins — that smallness, combined with its greatest concentration, is exactly why it contributes the most particles and dominates the osmotic effect.',
        b: 'Correct. Albumin has the greatest concentration of the plasma proteins, and since osmotic pressure depends on particle number rather than mass, it is responsible for most of the plasma proteins\' colloidal osmotic pressure.',
        c: 'Backwards. The capillary membrane is normally *impermeable* to plasma proteins — that impermeability is exactly what keeps them in the plasma to exert an osmotic pull, not a permeability that lets them leak out.',
        d: 'Backwards. Albumin production is *decreased*, not increased, in liver disease, since the liver is albumin\'s main site of synthesis — a diseased liver makes less of it.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p7-q4',
      conceptKey: 'plasma-proteins-formation-and-functions',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'State that plasma proteins act as weak acids at normal plasma pH.',
      explanations: {
        a: 'Correct. At normal plasma pH (7.4), plasma proteins are negatively charged and act as weak acids (anions), combining with bases — this is the basis of their buffering function.',
        b: 'Backwards. Albumin, not fibrinogen, has the highest concentration among the three named plasma proteins (3.5–5.0 g/dl vs fibrinogen\'s 0.4 g/dl).',
        c: 'Backwards. At normal plasma pH, plasma proteins are *negatively* charged, not positively — that negative charge is what lets them act as weak acids in the buffer system.',
        d: 'Backwards. Albumin is mainly formed by the liver, not by plasma cells in lymphoid tissue — plasma cells make the gamma globulins instead.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p8-q8',
      conceptKey: 'plasma-proteins-formation-and-functions',
      difficulty: 'Hard',
      questionType: 'Mechanism',
      learningObjective: 'Name the alpha globulins\' transport role in preventing urinary loss of hormones and vitamins.',
      explanations: {
        a: 'Backwards on which type is the exception. All globulins are formed in the liver except the gamma type, which plasma cells in lymphoid tissue make — the option names beta as the exception instead of gamma.',
        b: 'Backwards. Albumin, not the gamma globulins, is chiefly responsible for the plasma\'s osmotic function — the gamma globulins\' role is defensive (humoral immunity), not osmotic.',
        c: 'Correct. Albumin and the alpha (and beta) globulins act as carriers for hormones, vitamins, lipids and minerals; binding these substances to plasma proteins prevents their rapid loss in the urine and provides a usable reservoir.',
        d: 'Backwards. At normal plasma pH, plasma proteins are negatively charged, which is exactly why they act as weak acids — being positively charged and acting as weak acids in the same breath is internally contradictory (a positive charge would make a base\'s conjugate, not an acid).',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p8-q9',
      conceptKey: 'plasma-proteins-formation-and-functions',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'Name albumin\'s importance for tissue fluid formation and blood volume regulation.',
      explanations: {
        a: 'Burns lose albumin directly from the circulation (through damaged capillaries) rather than reducing its production, and kidney disease loses albumin in the urine through a leaky glomerular filter — neither is described in the book as decreased *production*.',
        b: 'Transport by binding to substances (hormones, vitamins, lipids, minerals) is albumin\'s function, but the book attributes this to albumin\'s abundance and binding sites, not to an "elongated shape" — elongated shape is instead named for fibrinogen, explaining its outsized contribution to blood viscosity.',
        c: 'Backwards. Albumin is normally kept inside the plasma precisely because the capillary membrane is impermeable to it (its molecular size is too large to filter through) — it is not normally filtered by the kidney at all, unlike the renal-disease state where a damaged filter lets it leak into urine.',
        d: 'Correct. Albumin\'s colloidal osmotic pressure holds water in the capillaries and draws tissue fluid back in, making it central to both tissue fluid formation and the regulation of circulating blood volume.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p9-q15',
      conceptKey: 'plasma-proteins-formation-and-functions',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'No printed answer key was recovered by either OCR pass (`correctSource: "none"`).',
    },
    {
      key: 'MCQ-102-2093c80b-p9-q16',
      conceptKey: 'plasma-proteins-formation-and-functions',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Name the clotting factors as part of what plasma proteins include.',
      explanations: {
        a: 'Correct. Fibrinogen and the coagulation factors are plasma proteins in their own right, and plasma proteins as a class include them alongside albumin and the globulins.',
        b: 'Backwards. Globulins are formed partly in the liver (50%) but the gamma fraction is formed by plasma cells in lymphoid tissue — "mainly in the liver" overstates the liver\'s share for this specific class.',
        c: 'Backwards. Albumin, not fibrinogen, has the highest concentration among the named plasma proteins.',
        d: 'Backwards. Fibrinogen, not albumin, has the largest molecular weight of the three named proteins (340,000 vs albumin\'s 69,000) — albumin instead has the smallest.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p9-q17',
      conceptKey: 'plasma-proteins-formation-and-functions',
      difficulty: 'Moderate',
      questionType: 'Normal values',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'No printed answer key was recovered by either OCR pass (`correctSource: "none"`).',
    },
    {
      key: 'MCQ-102-2093c80b-p9-q18',
      conceptKey: 'plasma-proteins-formation-and-functions',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'No printed answer key was recovered by either OCR pass (`correctSource: "none"`).',
    },
    {
      key: 'MCQ-102-2093c80b-p16-q57',
      conceptKey: 'plasma-proteins-formation-and-functions',
      difficulty: 'Moderate',
      questionType: 'Clinical correlation',
      learningObjective: 'Attribute liver-failure oedema to decreased albumin formation.',
      explanations: {
        a: 'Increased coagulation factors would tend toward excess clotting, not oedema — and liver failure in fact decreases coagulation-factor formation (the liver is where most are made), the opposite of this option.',
        b: 'Backwards. Liver failure decreases plasma protein formation (the liver is the main synthesis site), not increases it.',
        c: 'The book does not describe liver failure as changing renal water reabsorption directly — the oedema mechanism it teaches runs through the plasma proteins\' osmotic function, not the kidney.',
        d: 'Correct. A failing liver forms less albumin; less albumin means less colloidal osmotic pressure to hold water in the capillaries and pull tissue fluid back in, so fluid accumulates in the tissues as oedema.',
      },
    },
  ],
}
