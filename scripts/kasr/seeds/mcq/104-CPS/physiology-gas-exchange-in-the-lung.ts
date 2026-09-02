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
    // Sparse reuse, not a fresh mint: canonical_key already pinned in
    // 104-CPS-physiology-concepts.md as CON-RES-317D54C114B246, this exact
    // leaf's own module_subject — the same id this file's own header comment
    // (above) already named as a pinned sibling when the hypoxaemia concept
    // was minted. Not previously claimed by any 104-CPS MCQ seed (grepped
    // before use). Five bank rows below test this one fact from different
    // angles (V/Q value itself, capillary PCO2, alveolar radii, blood-flow
    // distribution) — kept as five separate questions on the same concept,
    // the same "one relation, several source occurrences" pattern this
    // branch's own PROGRESS.md documents repeatedly.
    {
      key: "ventilation-perfusion-ratio.regional-variation-in-the-lung",
      label: "The ventilation-perfusion ratio is about 3.0 at the lung apex and 0.6 at the base, because gravity drops perfusion faster than ventilation moving up the upright lung",
      definition: "The ventilation-perfusion ratio (VA/Q) — alveolar ventilation (about 4 L/min) divided by pulmonary perfusion (about 5 L/min, the right ventricular cardiac output) — averages 0.8-1.2 for the lung as a whole, but both ventilation and perfusion fall from base to apex in the upright lung, and perfusion falls faster than ventilation does. The lung's own weight makes the intrapleural space more negative at the apex (about -10 cmH2O) than the base (about -2.5 cmH2O), so apical alveoli sit more expanded at rest and change volume less on inspiration than the less-inflated basal alveoli do, making ventilation highest at the base. Gravity acts even more strongly on the low-pressure pulmonary circulation: apical capillaries, under low arterial pressure, nearly collapse (poor perfusion, 'zone 1'); mid-lung pressures are balanced (moderate perfusion, 'zone 2'); basal capillaries, under the highest hydrostatic pressure — the largest difference between arterial and venous pressure — stay fully open (highest perfusion, 'zone 3'). The net result is a high VA/Q of about 3.0 at the apex (poorly perfused relative to ventilated) and a low VA/Q of about 0.6 at the base (poorly ventilated relative to perfused), so basal capillary blood runs relatively richer in CO2 and poorer in O2 than apical blood.",
      objective: "State how alveolar ventilation and perfusion each vary from apex to base of the upright lung, explain the gravitational mechanism behind each, give the approximate VA/Q value at the apex and at the base, and state the consequence for capillary PCO2/PO2 and alveolar radii at each extreme.",
      pitfall: "Assuming ventilation and perfusion vary together, keeping VA/Q constant throughout the lung. Both fall from base to apex, but perfusion falls faster, so VA/Q rises going up the lung — it is not a uniform 0.8-1.2 everywhere, only on average for the whole lung.",
      subject: "resp",
      primary: "DIS-PHY-T03",
      secondary: [],
      modulePath: "104 CPS > Physiology > Respiratory System > Gas exchange in the lung",
      type: "mechanism",
      aliases: ["V/Q ratio apex versus base", "West zones of the lung", "Regional ventilation-perfusion gradient"],
    },
    // Fresh mint. find-existing.mjs "ventilation perfusion extremes" / "V/Q
    // shunt dead space" -> no pinned 104-CPS record distinct from the
    // regional-variation concept above (which covers the normal apex-to-
    // base gradient, not the V/Q=0 and V/Q=infinity extremes a vascular or
    // airway obstruction produces). Grounded in the bank's own editorial
    // explanation for the two rows below (standard, undisputed respiratory
    // physiology), disclosed as a gap since no 104-CPS article currently
    // names these two extremes explicitly.
    {
      key: "ventilation-perfusion-ratio.extremes-of-shunt-and-dead-space",
      label: "A V/Q of zero (shunt: perfused but unventilated alveoli) and an infinite V/Q (alveolar dead space: ventilated but unperfused alveoli, as after a pulmonary embolism) are the two extremes of ventilation-perfusion mismatch, pulling alveolar gas toward mixed venous and inspired-air composition respectively",
      definition: "The ventilation-perfusion ratio has two extremes. A V/Q of zero describes a shunt: alveoli that are perfused but not ventilated, so the blood leaving them is never oxygenated and (where alveolar gas exists at all in that unit) its composition is pulled toward mixed venous blood. A V/Q of infinity describes alveolar dead space: alveoli that are ventilated but not perfused — the classic case is a pulmonary embolism completely blocking blood flow to a lung or lobe — so with no blood exchanging gas with that fresh air, the alveolar gas composition in the affected region equilibrates toward that of inspired (tracheal) air instead, and the unaffected, now-receiving-the-whole-cardiac-output lung shifts its own V/Q toward the opposite, low extreme. Vascular obstruction (a pulmonary embolus blocking a pulmonary artery) raises V/Q toward the dead-space extreme in the affected region; airway obstruction (as in obstructive lung disease) instead lowers V/Q toward the shunt-like extreme, since ventilation to the affected alveoli falls while their perfusion continues.",
      objective: "State that V/Q = 0 is a shunt (alveolar gas approaches mixed venous composition) and V/Q = infinity is alveolar dead space (alveolar gas approaches inspired-air composition), and that blocking a pulmonary artery raises V/Q while obstructing an airway lowers it.",
      pitfall: "Assuming a V/Q of zero means alveolar gas composition simply matches inspired air. It is the opposite pole from dead space: with perfusion continuing but ventilation absent, gas composition is instead pulled toward mixed venous blood, not toward fresh inspired air.",
      subject: "resp",
      primary: "DIS-PHY-T03",
      secondary: [],
      modulePath: "104 CPS > Physiology > Respiratory System > Gas exchange in the lung",
      type: "mechanism",
      aliases: ["V/Q = 0 (shunt)", "V/Q = infinity (alveolar dead space)", "Pulmonary embolism and V/Q"],
      gaps: [
        "No 104-CPS article currently names the V/Q=0 (shunt) and V/Q=infinity (dead space) extremes explicitly, though the covering article's Clinical Significance section does discuss shunt as a hypoxaemia mechanism in general terms. Standard, undisputed respiratory physiology, grounded in the bank's own editorial explanation for the two rows this concept covers; flagged for the article-authoring lane.",
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
    {
      key: "which-of-the-following-causes-of-hypoxia-is-characterized-by-214aa73e",
      conceptKey: "hypoxemia.causes-and-distinction-from-non-hypoxemic-hypoxia",
      difficulty: "Hard",
      questionType: "Classification",
      learningObjective: "Identify a right-to-left cardiac shunt as the cause of hypoxia with a decreased arterial PO2 alongside a normal alveolar PO2.",
      explanations: {
        A: "Hypoventilation lowers alveolar PO2 first — less fresh air reaches the alveoli — and arterial PO2 falls with it, so both fall together rather than showing the normal-alveolar/low-arterial dissociation this question asks for.",
        B: "This is the correct answer. A right-to-left cardiac shunt sends venous blood directly into the systemic arterial circulation without it ever passing through ventilated alveoli, so arterial PO2 falls while the alveoli that ARE ventilated register an entirely normal alveolar PO2 — exactly the dissociation the stem describes, and the classic teaching point that separates a shunt from every other cause of hypoxia listed here.",
        C: "Anaemia lowers the total amount of haemoglobin available to carry oxygen, not the partial pressure of oxygen itself — arterial and alveolar PO2 both stay normal in anaemia, even though O2 content and delivery fall.",
        D: "Carbon monoxide poisoning displaces O2 from haemoglobin's own binding sites without changing dissolved O2 in the plasma — arterial and alveolar PO2 both stay normal, which is also why CO poisoning is not itself a form of hypoxic hypoxia.",
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
    {
      key: "a-49-year-old-man-has-a-pulmonary-embolism-that-completely-b-5ba07ffa",
      conceptKey: "ventilation-perfusion-ratio.extremes-of-shunt-and-dead-space",
      difficulty: "Hard",
      questionType: "Application",
      learningObjective: "Predict that a completely unperfused but still-ventilated left lung equilibrates its alveolar gas toward inspired-air composition (alveolar dead space), against three distractors misreading the same scenario.",
      explanations: {
        A: "A V/Q ratio of zero describes a shunt (perfusion without ventilation) — the opposite extreme from this scenario, where perfusion is absent but ventilation continues, which instead drives V/Q toward infinity.",
        B: "The left lung's V/Q ratio here is far HIGHER than the right lung's (approaching infinity, since ventilation continues with no perfusion at all), not lower.",
        C: "Correct. With perfusion to the left lung completely blocked, ventilation continues without any blood to exchange gas with, so the left lung's alveolar gas composition progressively equilibrates toward that of inspired (tracheal) air rather than being modified by gas exchange with blood — the classic alveolar dead space pattern.",
        D: "The right lung, now receiving the entire cardiac output with roughly unchanged total ventilation, develops a comparatively LOW V/Q ratio, and its alveolar PO2 shifts toward — but does not become fully equal to — mixed venous levels; 'approximately equal to venous blood' overstates this shift.",
      },
    },
    {
      key: "all-about-diffusion-of-o2-across-a-membrane-is-correct-excep-e804fcae",
      conceptKey: "alveolar-capillary-diffusion.factors-determining-rate",
      difficulty: "Moderate",
      questionType: "Recall of a false statement",
      learningObjective: "Identify that a lower, not higher, diffusion coefficient predicts a lower flow of a gas across the respiratory membrane, as the exception among true statements about O2 diffusion.",
      explanations: {
        A: "True of O2 diffusion across the membrane, so not the exception — increasing membrane thickness lengthens the diffusion path and decreases flow.",
        B: "True, so not the exception — increasing the membrane's surface area increases the total flow of O2 across it.",
        C: "True, so not the exception — raising alveolar O2 concentration raises the pressure gradient driving diffusion, increasing total O2 flow.",
        D: "The exception, and the answer. A gas's diffusion coefficient (set mainly by its solubility) is directly, not inversely, related to its diffusion rate — a LOWER diffusion coefficient means a LOWER, not higher, flow across the membrane.",
      },
    },
    {
      key: "compared-with-the-apex-of-the-lung-the-base-of-the-lung-has-bcf708af",
      conceptKey: "ventilation-perfusion-ratio.regional-variation-in-the-lung",
      difficulty: "Moderate",
      questionType: "Comparison",
      learningObjective: "State that the base of the lung has a higher pulmonary capillary PCO2 than the apex, as a direct consequence of its lower ventilation-perfusion ratio.",
      explanations: {
        A: "Not the credited comparison this row tests; extracted incompletely, and in any case a higher pulmonary capillary PO2 at the base (rather than PCO2) would be the wrong direction — the base's lower V/Q ratio means relatively less, not more, oxygenation of its capillary blood compared with the apex.",
        B: "Correct. The base has a lower ventilation-perfusion ratio than the apex (perfusion rises faster than ventilation moving down the upright lung), so basal capillary blood spends relatively more of its exchange 'diluted' toward mixed venous gas composition — a higher pulmonary capillary PCO2 (and lower PO2) than at the apex.",
        C: "The base has a LOWER, not higher, V/Q ratio than the apex, since perfusion rises faster than ventilation going down the lung.",
        D: "The V/Q ratio changes substantially from apex to base in the upright lung (about 3.0 to 0.6); it is not the same at both locations.",
      },
    },
    {
      key: "compared-with-the-base-of-the-lung-in-a-person-who-is-standi-ccaa8882",
      conceptKey: "ventilation-perfusion-ratio.regional-variation-in-the-lung",
      difficulty: "Moderate",
      questionType: "Comparison",
      learningObjective: "State that the apex has a higher ventilation-perfusion ratio than the base, against distractors that reverse the ventilation, perfusion and capillary-PO2 comparisons.",
      explanations: {
        A: "The apex has a LOWER ventilation rate than the base, not higher — basal alveoli, being less pre-expanded at rest, change volume more on each inspiration.",
        B: "The apex has a much LOWER perfusion rate than the base, not higher — gravity leaves apical capillaries under low arterial pressure and poorly perfused.",
        C: "Correct. The apex has a higher ventilation-perfusion ratio (about 3.0) than the base (about 0.6), because perfusion falls faster than ventilation moving up the upright lung.",
        D: "The apex has a HIGHER, not lower, pulmonary capillary PO2 than the base, precisely because its high V/Q ratio pulls its alveolar and capillary gas composition closer to that of inspired air.",
      },
    },
    {
      key: "concerning-distribution-of-ventilation-and-perfusion-cf1c1193",
      conceptKey: "ventilation-perfusion-ratio.regional-variation-in-the-lung",
      difficulty: "Moderate",
      questionType: "Recall",
      learningObjective: "State that the ventilation-perfusion ratio is greater at the apex than at the base of the upright lung, against three distractors that misstate the ventilation and perfusion gradients.",
      explanations: {
        A: "The gradient of change going up the lung is greater for perfusion than for ventilation, not the reverse — this is exactly why V/Q rises toward the apex.",
        B: "Ventilation decreases, not increases, as we go up the lung, since apical alveoli are already more expanded at rest and change volume less on inspiration.",
        C: "Perfusion decreases, not increases, as we go up the lung — gravity leaves apical capillaries poorly perfused under low arterial pressure.",
        D: "Correct. The ventilation-perfusion ratio is greater at the apex than at the base, because perfusion falls faster than ventilation moving up the upright lung.",
      },
    },
    {
      key: "lung-emphysema-decreases-the-pulmonary-diffusing-capacity-fo-ead15150",
      conceptKey: "alveolar-capillary-diffusion.factors-determining-rate",
      difficulty: "Moderate",
      questionType: "Mechanism",
      learningObjective: "Attribute emphysema's reduced pulmonary diffusing capacity to decreased respiratory membrane surface area, distinct from the membrane-thickening mechanism of interstitial lung disease.",
      explanations: {
        A: "Correct. Emphysema destroys alveolar walls and septa, merging many small alveoli into fewer, larger air spaces and directly reducing the total surface area of the respiratory membrane available for diffusion — and diffusing capacity is directly proportional to that surface area.",
        B: "Increased membrane thickness is the mechanism behind reduced diffusing capacity in interstitial lung diseases like pulmonary fibrosis or oedema, not emphysema, which instead destroys tissue and reduces surface area.",
        C: "Emphysema is characterised by decreased, not increased, elastic recoil of lung tissue, from elastase-mediated destruction of elastin fibres.",
        D: "Gas solubility is an intrinsic physicochemical property of the gas and the diffusion medium; it is not altered by emphysema.",
      },
    },
    {
      key: "the-alveoli-at-the-top-of-the-lungs-differ-from-those-at-the-1a0a9d30",
      conceptKey: "ventilation-perfusion-ratio.regional-variation-in-the-lung",
      difficulty: "Moderate",
      questionType: "Comparison",
      learningObjective: "State that alveoli at the top of the lungs have larger radii than those at the bottom, because apical alveoli sit more expanded at rest.",
      explanations: {
        A: "Apical alveoli, already more expanded at rest, sit on the flatter, less compliant part of the lung's pressure-volume curve and so show smaller, not greater, dynamic compliance (volume change per breath) than basal alveoli.",
        B: "Apical alveoli have a HIGHER, not lower, ventilation-perfusion ratio than basal alveoli, since perfusion falls faster than ventilation moving up the lung.",
        C: "Correct. The more negative intrapleural pressure at the apex (from the lung's own weight) leaves apical alveoli more expanded at rest, so they have larger resting radii than the less-inflated basal alveoli.",
        D: "Apical alveoli receive a much SMALLER, not greater, percentage of pulmonary blood flow, since gravity leaves apical capillaries poorly perfused under low arterial pressure.",
      },
    },
    {
      key: "ventilation-perfusion-v4-q-ratio-a45d5f6c",
      conceptKey: "ventilation-perfusion-ratio.extremes-of-shunt-and-dead-space",
      difficulty: "Hard",
      questionType: "Recall of a false statement",
      learningObjective: "State that the ventilation-perfusion ratio is expected to increase — toward the alveolar dead space extreme — following blockage of a major pulmonary artery.",
      explanations: {
        A: "The V/Q ratio is HIGHER, not lower, at the apex than at the base in the upright position, since perfusion falls faster than ventilation moving up the lung.",
        B: "Obstructive lung disease lowers, not raises, V/Q in the affected units: airway obstruction reduces ventilation to those alveoli while their perfusion continues, pulling V/Q toward the shunt-like extreme.",
        C: "V/Q genuinely may be determined from respiratory minute volume (ventilation) and pulmonary blood flow (perfusion) — it is, by definition, their ratio — so this statement is true, not the exception.",
        D: "Correct. Blocking a major pulmonary artery abolishes perfusion to the alveoli downstream while ventilation continues, driving V/Q toward its infinite, alveolar-dead-space extreme — exactly the pulmonary embolism scenario tested elsewhere in this same concept.",
      },
    },
    {
      key: "when-a-person-is-standing-blood-flow-in-the-lungs-is-d559a19e",
      conceptKey: "ventilation-perfusion-ratio.regional-variation-in-the-lung",
      difficulty: "Moderate",
      questionType: "Mechanism",
      learningObjective: "State that pulmonary blood flow is highest at the base of the upright lung, because that is where the arterial-venous pressure difference driving flow is greatest.",
      explanations: {
        A: "Blood flow is not equal at the apex and the base — gravity creates a substantial perfusion gradient between them in the upright lung.",
        B: "The apex is the poorest-, not the best-, perfused region: low pulmonary arterial pressure there lets apical capillaries nearly collapse under gravity's effect.",
        C: "Correct. At the base, the highest hydrostatic pressure gives the greatest difference between pulmonary arterial and venous pressure, keeping basal capillaries fully open and driving the greatest blood flow.",
        D: "The base is the BEST-, not the worst-, perfused region; alveolar pressure exceeding arterial pressure (the 'zone 1' pattern) instead characterises the poorly perfused apex, not the base.",
      },
    },
    {
      key: "which-of-following-conditions-would-limit-the-diffusion-of-o-63690754",
      conceptKey: "alveolar-capillary-diffusion.factors-determining-rate",
      difficulty: "Moderate",
      questionType: "Application",
      learningObjective: "Identify pulmonary oedema, rather than hyperbaric O2, increased ventilator rate, or COPD, as the condition that limits O2 diffusion from alveoli to pulmonary capillary blood by thickening the respiratory membrane.",
      explanations: {
        A: "Breathing a hyperbaric gas mixture raises, rather than limits, the alveolar-to-capillary O2 pressure gradient, increasing diffusion rather than limiting it.",
        B: "Chronic obstructive lung disease impairs gas exchange mainly through airway obstruction and ventilation-perfusion mismatch, not primarily by thickening the respiratory membrane itself.",
        C: "An increased ventilator (ventilation) rate would tend to raise, not limit, alveolar O2 delivery and the diffusion gradient.",
        D: "Correct. Pulmonary oedema fills the interstitium and alveoli with fluid, thickening the respiratory membrane and lengthening the path O2 must diffuse across — directly limiting O2 diffusion from alveoli to pulmonary capillary blood.",
      },
    },
    {
      key: "which-of-the-following-conditions-would-limit-the-diffusion-199d5c2b",
      conceptKey: "alveolar-capillary-diffusion.factors-determining-rate",
      difficulty: "Moderate",
      questionType: "Application",
      learningObjective: "Confirm, against a second, independently-extracted source occurrence, that pulmonary oedema limits O2 diffusion by thickening the respiratory membrane.",
      explanations: {
        A: "Breathing a hyperbaric gas mixture raises, rather than limits, the alveolar-to-capillary O2 pressure gradient, increasing rather than limiting diffusion.",
        B: "Chronic obstructive lung disease impairs gas exchange mainly through airway obstruction and ventilation-perfusion mismatch, not primarily by thickening the respiratory membrane.",
        C: "An increased ventilator (ventilation) rate would tend to raise, not limit, alveolar O2 delivery and the diffusion gradient.",
        D: "Correct. Pulmonary oedema fills the interstitium and alveoli with fluid, thickening the respiratory membrane and directly limiting O2 diffusion from alveoli to pulmonary capillary blood.",
      },
    },
    {
      key: "which-person-would-be-expected-to-have-the-largest-alveolar-7d341e19",
      conceptKey: "alveolar-capillary-diffusion.factors-determining-rate",
      difficulty: "Hard",
      questionType: "Comparison",
      learningObjective: "Identify pulmonary fibrosis, rather than altitude or a raised inspired O2 fraction, as producing the largest alveolar-arterial PO2 gradient, since only fibrosis represents a genuine diffusion abnormality.",
      explanations: {
        A: "Correct. Pulmonary fibrosis thickens the respiratory membrane, a genuine diffusion barrier that widens the alveolar-arterial PO2 gradient — unlike the other listed conditions, none of which impairs diffusion across an otherwise normal membrane.",
        C: "High altitude lowers both alveolar and arterial PO2 together (by lowering inspired PO2), without impairing diffusion across the membrane itself, so it does not widen the alveolar-arterial gradient the way a genuine diffusion abnormality does.",
        D: "Breathing 50% O2 with otherwise normal lungs raises both alveolar and arterial PO2 together without introducing a true diffusion barrier, so it does not produce the widened gradient a diffusion abnormality like fibrosis does.",
        E: "Breathing 100% O2 with otherwise normal lungs raises both alveolar and arterial PO2 together without introducing a true diffusion barrier, so it does not produce the widened gradient a diffusion abnormality like fibrosis does.",
      },
    },
    {
      key: "all-about-ventilation-and-perfusion-of-different-regions-of-be381b3b",
      conceptKey: "ventilation-perfusion-ratio.regional-variation-in-the-lung",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "The bank's own correct answer, option D — the exception among true statements this 'except' question tests — is truncated at the OCR/extraction stage: 'Regional variation in ventilation-perfusion is more efficient for oxygenating blood than is' breaks off mid-sentence with no object for the comparison. The likely completion (uniform ventilation and perfusion) would follow standard teaching, but per the law of priority a garbled key is rendered by eye or left unkeyed, never completed from what a textbook probably says — and because this is the marked CORRECT answer's own text rather than a distractor's, left unauthored rather than guessing, the same reasoning already applied to this leaf's sibling exclusion (with-respect-to-gas-exchange-across-the-alyeolar-membrane-ea528c00) above. The three true (non-exception) options are already covered cleanly by this leaf's own regional-variation and diffusion concepts.",
    },
  ],
}
