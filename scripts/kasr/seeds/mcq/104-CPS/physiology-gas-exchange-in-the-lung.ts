import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: "Physiology Respiratory System — Gas Exchange in the Lung",
  modulePath: "104 CPS > Physiology > Respiratory System > Gas exchange in the lung",
  // Already live in 104-CPS-physiology.md, module_subject matches this leaf
  // exactly. Checked BEFORE minting anything, per the dispatch brief — no
  // phantom article id needed, and no new article scaffold either.
  articleId: "ART-104-PHY-GAS-EXCHANGE-AND-VQ-MATCHING",

  concepts: [
    // Already exists as a hand-authored, pinned record in
    // `docs/Kasr-Source-Imports/concept/104-CPS-physiology-concepts.md`
    // (CON-RES-C323EEF5DA30FF, not GENERATED_BY, so `existingConceptIds()`
    // does see it). Declaring the identical canonical_key here resolves to
    // the pinned id via `resolveConceptId` and emits a sparse reuse row —
    // never a duplicate mint. Content below matches the pinned record for a
    // seed reader's sake; the emitted label/definition always come from the
    // pinned file.
    {
      key: "alveolar-capillary-diffusion.factors-determining-rate",
      label: "Gas diffuses through the respiratory membrane fastest with a large pressure gradient, large surface area, high temperature and solubility, and slowest with a thick membrane or a large molecular weight — and CO2 diffuses about 20 times faster than O2 despite O2's larger pressure gradient, because CO2 is so much more soluble",
      definition: "The rate of gas diffusion through the respiratory membrane is directly proportional to the pressure gradient across it, the membrane's surface area (70-80 m2) and temperature, and to the gas's solubility, and inversely proportional to the membrane's thickness (about 0.5 micrometre) and to the square root of the gas's molecular weight. O2's pressure gradient across the membrane (about 60 mmHg, alveolar 105 minus capillary 40) is roughly ten times CO2's (about 6 mmHg), yet because CO2 is about 24 times more soluble in water than O2 despite its 1.4-times larger molecule, its relative diffusion coefficient is about 20.3 times that of O2 — so diffusion problems affect O2 exchange far more readily than they affect CO2 elimination.",
      objective: "List the factors that determine the rate of gas diffusion through the respiratory membrane (pressure gradient, surface area, thickness, temperature, solubility, molecular weight) and state which way each acts, and explain why a diffusion-limiting disease affects O2 exchange much more than CO2 elimination.",
      pitfall: "Assuming a larger pressure gradient always means faster net diffusion between two gases. O2 has the larger pressure gradient across the membrane, but CO2 still diffuses faster overall because its far higher solubility more than compensates — solubility, not just the pressure gradient, decides the winner.",
      subject: "resp",
      primary: "DIS-PHY-T03",
      secondary: [],
      modulePath: "104 CPS > Physiology > Respiratory System > Gas exchange in the lung",
      type: "mechanism",
      aliases: ["Relative diffusion coefficient of CO2 versus O2", "Fick's law of diffusion (respiratory membrane)"],
    },
    // NEW mint. Searched first (find-existing.mjs "hypoxemia" / "hypoxaemia"
    // / "right-to-left shunt" / "alveolar PO2") and against the other two
    // gas-exchange concepts already pinned in this same hand-authored file
    // (CON-RES-317D54C114B246 V/Q regional variation; CON-RES-4A773ABA9943BE
    // pulmonary physiologic shunt) — none of the three covers hypoxaemia's
    // causes/classification. The one live hit worth recording is a
    // DIFFERENT-textbook, Year-3, no-104-CPS-module topic catalogue —
    // ART-RES-TOP-265990F7BD ("Hypoxia", In review) and its 12 linked
        // concepts (anaemic/stagnant/histotoxic hypoxia, CO poisoning detail,
    // cyanotic-shunt) — which classifies hypoxia BY TYPE for a topic
    // overview, not BY PaO2/PAO2 MECHANISM for this module's own gas-
    // exchange chapter. Genuinely distinct objectives, recorded below in
    // `conflicts` rather than force-merged; not the GENERATED_BY-blind case
    // either, since `existingConceptIds()` cannot see live production
    // concepts outside `docs/Kasr-Source-Imports/concept/104-CPS-*.md` at
    // all, so no sparse-update path exists here regardless of canonical_key.
    {
      key: "hypoxemia.causes-and-distinction-from-non-hypoxemic-hypoxia",
      label: "Hypoxaemia (a low arterial PO2) has four classic causes — hypoventilation, diffusion impairment, ventilation-perfusion mismatch and right-to-left shunt — and is distinct from anaemic, stagnant and histotoxic hypoxia, which reduce tissue oxygen delivery or use without lowering arterial PO2 itself",
      definition: "Hypoxaemia is a fall in arterial PO2, and it has four classic mechanisms: hypoventilation lowers alveolar PO2 (and so arterial PO2) while raising PCO2; a diffusion defect (a thickened or reduced-area respiratory membrane) slows O2 transfer more than CO2 elimination, so PaO2 falls while PaCO2 may stay normal; ventilation-perfusion mismatch lets poorly ventilated but well-perfused lung units contribute desaturated blood to the pulmonary veins; and a right-to-left shunt (an anatomical bypass of ventilated alveoli) mixes fully deoxygenated blood directly into the arterial circulation, so PaO2 falls despite an entirely normal alveolar PO2. High altitude reduces the inspired and so alveolar partial pressure of oxygen, acting through the same route as hypoventilation. None of these four mechanisms is shared by anaemic hypoxia (reduced haemoglobin available to carry oxygen), stagnant/circulatory hypoxia (reduced blood flow) or histotoxic hypoxia (tissue cells unable to use delivered oxygen) — arterial and alveolar PO2 are both normal in all three, since the defect lies downstream of gas exchange in the lung. A left-to-right shunt, unlike a right-to-left one, recirculates already-oxygenated blood and causes no hypoxaemia at all.",
      objective: "List the four mechanisms of hypoxaemia (hypoventilation, diffusion impairment, V/Q mismatch, right-to-left shunt) and state which of arterial and alveolar PO2 each one changes; distinguish a right-to-left shunt (causes hypoxaemia) from a left-to-right shunt (does not); and explain why anaemic, stagnant and histotoxic hypoxia do not lower arterial PO2.",
      pitfall: "Confusing a left-to-right shunt (recirculates oxygenated blood, no hypoxaemia) with a right-to-left shunt (bypasses the lungs entirely, genuine hypoxaemia) — the direction of shunting, not the mere presence of one, decides the outcome. A second common trap is treating anaemia or carbon monoxide poisoning as causes of a decreased arterial PO2: both reduce the oxygen actually delivered to or usable by tissue, but arterial and alveolar PO2 are both unaffected because the defect lies entirely downstream of the lung's own gas exchange.",
      subject: "resp",
      primary: "DIS-PHY-T03",
      secondary: [],
      modulePath: "104 CPS > Physiology > Respiratory System > Gas exchange in the lung",
      type: "classification",
      aliases: ["Causes of hypoxaemia", "Mechanisms of hypoxaemia", "Hypoxic vs anaemic vs stagnant vs histotoxic hypoxia", "Right-to-left vs left-to-right shunt"],
      conflicts: [
        "Related-but-distinct live topic catalogue: ART-RES-TOP-265990F7BD (\"Hypoxia\", In review, Year 3, no 104 CPS module tag) and its 12 linked concepts (CON-RES-22FEB4F22E7D79 anaemic hypoxia, CON-RES-654A12F4B21CC0 stagnant hypoxia, CON-RES-A0F793A4A37DC0 histotoxic mechanism, CON-RES-723332CA1E127F cyanotic shunt, several carbon-monoxide-poisoning concepts) classify hypoxia BY TYPE for a topic overview from a different textbook. This concept classifies hypoxaemia BY MECHANISM (arterial-vs-alveolar PO2 pattern) for the 104 CPS Year-1 gas-exchange chapter. Genuinely distinct teaching objectives — kept separate rather than force-merged, and not reachable by resolveConceptId's sparse-update path regardless, since existingConceptIds() only scans docs/Kasr-Source-Imports/concept/104-CPS-*.md, never live production state.",
      ],
      gaps: [
        "The covering article (ART-104-PHY-GAS-EXCHANGE-AND-VQ-MATCHING) already teaches diffusion impairment and V/Q-mismatch/shunt as hypoxaemia mechanisms in its Clinical Significance section, but its prose does not yet explicitly enumerate hypoventilation or altitude as causes, contrast right-to-left against left-to-right shunt, or state that anaemia/CO poisoning/histotoxic hypoxia leave PaO2 unchanged. Disclosed two-sided coverage gap, not silently assumed taught — see PROGRESS.md.",
      ],
    },
  ],

  questions: [
    {
      key: "the-following-factors-affect-the-rate-of-gas-diffusion-throu-7ed5e46f",
      conceptKey: "alveolar-capillary-diffusion.factors-determining-rate",
      difficulty: "Easy",
      questionType: "Mechanism",
      learningObjective: "State that gas diffusion rate through the respiratory membrane depends on membrane thickness, surface area and the gas's diffusion coefficient together, not any one alone.",
      explanations: {
        A: "Thickness is only one of the three listed factors — on its own it omits surface area and the gas's diffusion coefficient, both of which genuinely affect the rate too.",
        B: "Surface area is only one of the three listed factors — on its own it omits membrane thickness and the gas's diffusion coefficient, both of which genuinely affect the rate too.",
        C: "The gas's diffusion coefficient is only one of the three listed factors — on its own it omits membrane thickness and surface area, both of which genuinely affect the rate too.",
        D: "Correct. The rate of gas diffusion across the respiratory membrane depends on all three: it rises with the membrane's surface area (about 70-80 m2) and with the gas's own diffusion coefficient (set mainly by its solubility), and it falls as the membrane's thickness increases, since a thicker barrier lengthens the path each gas molecule must cross. These are three of several factors — alongside the pressure gradient, temperature and the gas's molecular weight — that together determine how quickly O2 and CO2 cross from alveolus to capillary blood and back. A disease that thickens the membrane (fibrosis, oedema) or reduces its surface area (emphysema, pneumonectomy) slows diffusion by exactly this mechanism, and because O2 exchange is far more diffusion-limited than CO2 elimination, such disease produces hypoxaemia well before it produces hypercapnia.",
      },
    },
    {
      key: "hypoxemia-is-caused-by-all-of-the-following-except-e0059e10",
      conceptKey: "hypoxemia.causes-and-distinction-from-non-hypoxemic-hypoxia",
      difficulty: "Moderate",
      questionType: "Classification",
      learningObjective: "Identify a left-to-right shunt as the one listed option that does not cause hypoxaemia, and distinguish it from a right-to-left shunt, pulmonary fibrosis, altitude and hypoventilation, which all do.",
      explanations: {
        A: "Pulmonary fibrosis genuinely causes hypoxaemia: thickening the respiratory membrane slows O2 diffusion far more than it slows CO2 elimination, since O2 exchange is much more diffusion-limited.",
        B: "Correct. A left-to-right shunt is the one option that does not cause hypoxaemia. It recirculates already-oxygenated blood from the systemic side back into the pulmonary circulation without ever introducing deoxygenated blood into the systemic arterial supply, so arterial PO2 is unaffected. Hypoxaemia specifically requires a right-to-left shunt, which bypasses ventilated alveoli altogether and lets fully deoxygenated blood mix directly into the systemic arterial circulation. The other three options are all genuine mechanisms of hypoxaemia: pulmonary fibrosis thickens the diffusion barrier, high altitude lowers the inspired (and so alveolar) PO2, and hypoventilation lowers alveolar PO2 directly while raising alveolar and arterial PCO2.",
        C: "High altitude genuinely causes hypoxaemia by lowering the inspired partial pressure of oxygen, which lowers alveolar and so arterial PO2 even with entirely normal lungs.",
        D: "Hypoventilation genuinely causes hypoxaemia: reducing alveolar ventilation lowers alveolar PO2 directly while raising alveolar (and arterial) PCO2.",
      },
    },
    {
      key: "which-cause-of-hypoxia-is-characterized-by-a-decreased-arter-2f528031",
      conceptKey: "hypoxemia.causes-and-distinction-from-non-hypoxemic-hypoxia",
      difficulty: "Hard",
      questionType: "Classification",
      learningObjective: "Identify a right-to-left shunt as the cause of hypoxia that produces a low arterial PO2 with a normal alveolar PO2, and distinguish this pattern from hypoventilation (both fall) and from anaemia/CO poisoning (neither falls).",
      explanations: {
        A: "Hypoventilation lowers both alveolar and arterial PO2 together, since less fresh air reaches the alveoli in the first place — it does not produce the normal-alveolar/low-arterial pattern this question asks for.",
        B: "Correct. A right-to-left cardiac shunt bypasses ventilated alveoli entirely, mixing fully deoxygenated blood directly into the systemic arterial circulation — arterial PO2 falls while alveolar PO2, measured in the normally ventilated alveoli that never see the shunted blood, stays normal. This dissociation between a normal alveolar PO2 and a low arterial PO2 is the diagnostic signature of a shunt, and it is what separates a shunt from hypoventilation, where alveolar and arterial PO2 fall together. Anaemia and carbon monoxide poisoning reduce the oxygen actually carried by the blood, not its partial pressure, so neither lowers arterial or alveolar PO2 at all despite causing genuine tissue hypoxia.",
        C: "Anaemia reduces the amount of haemoglobin available to carry oxygen, so it lowers blood oxygen content, not oxygen partial pressure — arterial and alveolar PO2 remain normal in anaemia.",
        D: "Carbon monoxide occupies haemoglobin's oxygen-binding sites without changing how much dissolved O2 the plasma carries, so it lowers oxygen content, not PO2 — arterial and alveolar PO2 remain normal in CO poisoning.",
      },
    },

    // --- Excluded: corrupted or unrecoverable beyond what this pipeline can fix ---

    {
      key: "respiratory-portions-for-aeb43c04",
      conceptKey: "alveolar-capillary-diffusion.factors-determining-rate",
      difficulty: "Easy",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Already flagged unkeyed/uncorrectable by the bank's own extraction (editorialExcluded): option B has absorbed a second option's text ('conditioning of air' merged with 'gas exchange'), making it impossible to cleanly assign the correct answer (gas exchange, the defining function of the respiratory portion) to a distinct letter, and the surviving 'all of the above' option (D) would incorrectly include conduction of air, a conducting-portion function.",
    },
    {
      key: "with-respect-to-gas-exchange-across-the-alyeolar-membrane-ea528c00",
      conceptKey: "alveolar-capillary-diffusion.factors-determining-rate",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "The bank's own correct answer, option C, is corrupted at the OCR/extraction stage in a way that makes it genuinely ambiguous, not merely cosmetic: 'The partial pressure of ‏و00‎ in tissue fluid is 4S5mmHg i' substitutes an Arabic letter for part of the gas name and 'S' for a digit in the number. Standard values (tissue-fluid PCO2 ~45 mmHg, PO2 ~40 mmHg) make either O2-at-40 or CO2-at-45 plausible reconstructions, and sibling options B and D use clean 'CO,'/'CO' text while this one alone is corrupted, so which gas and which exact number the option originally named cannot be confidently rendered by eye. Per the law of priority (a garbled key is rendered by eye or left unkeyed, never guessed from context), and because this is the marked CORRECT answer's own text rather than a distractor's, left unauthored rather than guessing.",
    },
  ],
}
