import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Physiology Cardiovascular System — Interstitial Fluid Volume and Oedema',
  modulePath: '104 CPS > Physiology > Cardiovascular System > Vascular Function',
  // ART-104-PHY-CAPILLARY-EXCHANGE-AND-LYMPHATICS is the same real, live,
  // evidenced Draft article the sibling A-V Connections/capillary-exchange
  // file already uses, and is this pinned concept's own article_ids.
  articleId: 'ART-104-PHY-CAPILLARY-EXCHANGE-AND-LYMPHATICS',

  concepts: [
    {
      // Sparse reuse, not a fresh mint: canonical_key already pinned in
      // 104-CPS-physiology-concepts.md as CON-CVS-6D8E2D62A9F51E, this
      // exact leaf's own module_subject and article_ids. Declaring the
      // same key here resolves to CON-CVS-6D8E2D62A9F51E and emits a
      // sparse update only; every other field below is inert for the
      // build, restated close to the pinned record's own wording.
      key: 'interstitial-fluid.volume-determinants-and-causes-of-oedema',
      label: 'Interstitial fluid volume depends on capillary hydrostatic and osmotic pressure, the filtration coefficient, the number of open capillaries, and lymph flow, and oedema follows when any of these shifts toward filtration',
      definition: 'Interstitial fluid (ISF) volume is set by five factors: capillary hydrostatic pressure, capillary osmotic pressure, the capillary filtration coefficient, the number of active capillaries, and the lymph flow. Oedema is an abnormally large accumulation of ISF, and because of gravity it tends to accumulate in dependent parts (lower limbs when standing, the back when recumbent). Causes of increased ISF volume and oedema group into four mechanisms: increased filtration pressure (arteriolar dilation or venous congestion raising capillary hydrostatic pressure — for example in heart failure or venous obstruction), decreased plasma colloid osmotic pressure (from low plasma protein — nephrotic syndrome/nephrosis losing protein in urine, liver cirrhosis failing to synthesise albumin, or nutritional deficiency failing to supply it), increased capillary permeability (inflammation or capillary damage), and lymphatic obstruction (blocking the drainage route that normally returns filtered fluid to the blood). Acute lymphatic obstruction gives pitting oedema like the other three mechanisms, because the extra fluid is still free, low-protein ISF; but LONGSTANDING lymphatic obstruction instead produces non-pitting oedema, because the chronically stagnant, protein-rich fluid stimulates progressive tissue fibrosis, giving the affected area a firm, non-compressible texture.',
      objective: 'Name the four mechanisms of oedema (raised filtration pressure, lowered plasma colloid osmotic pressure, increased capillary permeability, lymphatic obstruction), and state that chronic — but not acute — lymphatic obstruction gives non-pitting rather than pitting oedema.',
      pitfall: 'Assuming lymphatic obstruction always gives pitting oedema like the other three mechanisms. Acute lymphatic obstruction does, but LONGSTANDING obstruction produces non-pitting oedema instead, because the stagnant, protein-rich fluid drives tissue fibrosis over time.',
      subject: 'cvs',
      primary: 'DIS-PHY-T02',
      secondary: [],
      modulePath: '104 CPS > Physiology > Cardiovascular System > Vascular Function',
      type: 'mechanism',
      aliases: ['Causes of oedema', 'Pitting vs non-pitting oedema', 'Interstitial fluid volume'],
    },
  ],

  questions: [
    {
      key: 'all-of-the-followings-are-causes-of-pitting-edema-except-1f971191',
      conceptKey: 'interstitial-fluid.volume-determinants-and-causes-of-oedema',
      difficulty: 'Moderate',
      questionType: 'Recall of a false statement',
      learningObjective: 'Identify longstanding lymphatic obstruction, which produces non-pitting rather than pitting oedema, as the exception among genuine causes of pitting oedema.',
      explanations: {
        A: 'Liver cirrhosis genuinely causes pitting oedema, so not the exception: failed hepatic albumin synthesis lowers plasma colloid osmotic pressure, favouring filtration over absorption.',
        B: 'Nutritional (protein-deficiency) oedema genuinely causes pitting oedema, so not the exception: inadequate dietary protein lowers plasma colloid osmotic pressure by the same route as liver cirrhosis.',
        C: 'The exception, and the answer. LONGSTANDING lymphatic obstruction produces characteristically NON-pitting oedema — the chronically stagnant, protein-rich fluid stimulates progressive tissue fibrosis, giving a firm, non-compressible texture, unlike the other three mechanisms listed here.',
        D: 'Nephrosis (nephrotic syndrome) genuinely causes pitting oedema, so not the exception: heavy urinary protein loss lowers plasma colloid osmotic pressure, favouring filtration over absorption.',
      },
    },
    {
      key: 'edema-may-be-caused-by-all-of-the-following-except-a62779e9',
      conceptKey: 'interstitial-fluid.volume-determinants-and-causes-of-oedema',
      difficulty: 'Moderate',
      questionType: 'Recall of a false statement',
      learningObjective: 'Identify low arterial blood pressure, which does not raise capillary filtration pressure, as the exception among genuine causes of oedema.',
      explanations: {
        A: 'Decreased albumin content genuinely causes oedema, so not the exception: it lowers plasma colloid osmotic pressure, one of the two Starling forces normally holding fluid in the capillary.',
        B: 'The exception, and the answer. Low arterial blood pressure does not itself raise capillary filtration — if anything, a lower driving pressure through the arterial system tends to lower, not raise, capillary hydrostatic pressure; it is a rise in venous (not a fall in arterial) pressure that causes oedema by raising capillary hydrostatic pressure.',
        C: 'Increased venous pressure genuinely causes oedema, so not the exception: it raises capillary hydrostatic pressure by impeding venous drainage from the capillary bed, favouring filtration over absorption.',
        D: 'Lymphatic obstruction genuinely causes oedema, so not the exception: it blocks the drainage route that normally returns the fluid that capillary filtration always slightly exceeds.',
      },
    },

    // --- run44: A-V Connections' own bank rows (leaf tag known unreliable
    // — this content is genuinely about capillaries, this leaf's own
    // subject) excluded as ungrounded in this module's own department
    // book (src_a11a7faed67c95e2d636, checked directly across all 160
    // pages) rather than filled from model knowledge. The book's only
    // Law-of-Laplace statement (p.109) is for alveolar surface tension
    // (P = 2T/r), in the surfactant section — never applied to blood
    // vessel wall tension anywhere in this book, so the three "capillaries
    // withstand high pressure" rows below (all testing the same vascular-
    // wall-tension application of the law) are left unclaimed rather than
    // synthesised from outside knowledge. 0 hits for "poiseuille" (already
    // established in the Mechanical Properties cluster this same run),
    // "wall tension", or any capillary/vein/artery blood-volume-fraction
    // percentage. ---

    {
      key: 'that-capillaries-can-withstand-high-internal-pressures-witho-57d4fc14',
      conceptKey: 'interstitial-fluid.volume-determinants-and-causes-of-oedema',
      difficulty: 'Moderate',
      questionType: 'Not sittable as extracted.',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'No grounding in this module\'s own physiology department book (src_a11a7faed67c95e2d636) for applying the Law of Laplace to blood vessel wall tension — checked directly, the book\'s only Law-of-Laplace statement (p.109) is for alveolar surface tension in the surfactant section, never applied to capillary/vessel walls anywhere in the book. The book is the source; a definition not in the cached page text is left blank, never filled from model knowledge.',
    },
    {
      key: 'the-capillaries-can-withstand-high-internal-pressure-without-75f7a208',
      conceptKey: 'interstitial-fluid.volume-determinants-and-causes-of-oedema',
      difficulty: 'Moderate',
      questionType: 'Not sittable as extracted.',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'Same fact as that-capillaries-can-withstand-high-internal-pressures-witho-57d4fc14 (a different bank occurrence, different distractor set) — no grounding in this module\'s own physiology department book for the Law of Laplace applied to blood vessel wall tension (its only statement of the law, p.109, is for alveolar surface tension). Left unclaimed rather than filled from model knowledge.',
    },
    {
      key: 'thin-walled-capillaries-donot-burst-when-intracapillary-pres-286420f9',
      conceptKey: 'interstitial-fluid.volume-determinants-and-causes-of-oedema',
      difficulty: 'Moderate',
      questionType: 'Not sittable as extracted.',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'A third occurrence of the same underlying fact (small radius / Law of Laplace explaining why thin-walled capillaries withstand physiological pressure) as the two other excluded rows above — no grounding in this module\'s own physiology department book, whose only Law-of-Laplace statement (p.109) is for alveolar surface tension, never applied to blood vessels. Left unclaimed rather than filled from model knowledge.',
    },
    {
      key: 'the-highest-pressure-inside-a-blood-vessel-is-present-in-a-p-cd85f021',
      conceptKey: 'interstitial-fluid.volume-determinants-and-causes-of-oedema',
      difficulty: 'Moderate',
      questionType: 'Not sittable as extracted.',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'Extraction leaves only 3 lettered options (B, C, D — no A): the stem itself carries a stray fragment ("a Pulmonary vessels") that is almost certainly option A\'s own text, merged into the stem by an OCR/parsing failure rather than kept as a separate lettered option. The credited answer (B, Aorta) is well-grounded — this module\'s own ART-104-PHY-HEMODYNAMICS-AND-ARTERIAL-PRESSURE article states aortic mean pressure (~90 mmHg) far exceeds pulmonary artery (~10 mmHg) and systemic capillary (35 mmHg arteriolar to 15 mmHg venous) pressures — but the McqAuthored contract has no field to supply corrected option text, only to override the answer letter (answerOverride), and a genuine 4th option is not available to import cleanly. Not padded with an invented option; left unclaimed.',
    },
    {
      key: 'what-fraction-of-total-blood-volume-is-present-in-the-capill-f9b7cdfa',
      conceptKey: 'interstitial-fluid.volume-determinants-and-causes-of-oedema',
      difficulty: 'Moderate',
      questionType: 'Not sittable as extracted.',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'No grounding in this module\'s own physiology department book (src_a11a7faed67c95e2d636) — checked directly (blood-volume-distribution-by-vessel-type is a classic figure in general physiology texts, but this book\'s own venous-pressure/venous-return sections, pp.49-51, state pressures and flow velocities, never a percentage breakdown of total blood volume by vessel type). Left unclaimed rather than filled from model knowledge.',
    },
  ],
}
