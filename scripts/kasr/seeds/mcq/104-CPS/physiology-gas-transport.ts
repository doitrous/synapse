import type { McqLeafSeed } from '../../mcq.ts'

// Scope note (kasr-104-author-run38): the bank's "Gas Transport by the Blood"
// leaf tag also caught rows whose content is Chapter 5 ("Respiratory
// Adjustments in Health and Disease", physio dept book p153-159) rather than
// Chapter 4 ("Gas Transport by the Blood", p124-134) — hypoxia classification,
// cyanosis and carboxyhaemoglobin. ART-104-PHY-OXYGEN-CONTENT-AND-CO2-TRANSPORT
// (evidence_gaps) already records a deliberate decision not to cover cyanosis/
// carboxyhaemoglobin here because a live Year-3 pulmonology catalogue owns
// that ground, and no article in this module covers the hypoxia-type table
// (hypoxic/anaemic/stagnant/histotoxic) at all. Left unclaimed rather than
// authored without a teaching article or against a catalogue this session
// cannot see: all-of-the-followings-are-correct-as-regards-cyanosis-except-1cb68242
// (whose options B/C — "Only T lymphocytes", "No Plasma cells" — are also
// corrupted/unrelated to cyanosis, a separate reason it would need excluding
// even in scope), cyanosis-1-60b08503, cyanosis-3ce6dbd2,
// with-respect-to-the-binding-of-carbon-monoxide-to-haemoglobi-5467d1ba,
// hypoxic-hypoxia-3-7fa250af, hypoxic-hypoxia-b97facbb,
// oxygen-therapy-is-of-limited-value-4b8eb82e,
// which-of-the-following-causes-of-hypoxia-is-characterized-by-214aa73e.
export const LEAF: McqLeafSeed = {
  leaf: "Physiology Respiratory System — Gas Transport by the Blood",
  modulePath: "104 CPS > Physiology > Respiratory System > Gas Transport by the Blood",
  articleId: "ART-104-PHY-OXYGEN-CONTENT-AND-CO2-TRANSPORT",

  concepts: [
    {
      key: "gas-transport.hb-o2-dissociation-curve-shifts",
      label: "The Hb-O2 dissociation curve shifts right (easier O2 unloading) with raised temperature, PCO2/acidosis or 2,3-DPG, and left (harder unloading) with the opposite of each plus CO poisoning and fetal haemoglobin",
      definition: "P50, the PO2 at 50% Hb saturation, is normally 27 mmHg and marks where the sigmoid Hb-O2 dissociation curve sits. A rightward shift (higher P50, lower affinity) makes Hb give up O2 more readily at a given PO2, and is produced by a rise in temperature, PCO2 or 2,3-DPG, or a fall in pH (the Bohr effect: CO2 and H+ bind sites on Hb that change its configuration and favour O2 release) — this is exactly the pattern of active tissue, so more O2 is delivered where it is needed most. 2,3-DPG is a red-cell metabolic end product that binds deoxygenated Hb (HbO2 + 2,3-DPG → Hb-2,3-DPG + O2) and rises in hypoxia or exercise. A leftward shift (lower P50, higher affinity) makes Hb hold O2 more tightly and is produced by the opposite changes — falling temperature, PCO2 or 2,3-DPG, or rising pH — plus two named exceptions: carbon monoxide, which binds Hb at the same site as O2 with roughly 200-210 times O2's affinity and, once bound, keeps the other O2 molecules already attached from releasing easily; and fetal haemoglobin, whose gamma chains (unlike adult beta chains) cannot bind 2,3-DPG, giving it a higher O2 affinity suited to extracting O2 across the placenta.",
      objective: "State which four physiological changes shift the Hb-O2 dissociation curve right versus left, name the Bohr effect and the mechanism of 2,3-DPG, and explain why CO poisoning and fetal haemoglobin both shift the curve left despite acting by different mechanisms.",
      pitfall: "Assuming every leftward-curve influence works by the same Bohr/DPG mechanism. CO shifts the curve left by occupying Hb's O2-binding site directly and interfering with the release of the O2 that is still bound, not by changing temperature, pH or 2,3-DPG — a genuinely separate mechanism from the four paired factors.",
      subject: "resp",
      primary: "DIS-PHY-T03",
      secondary: [],
      modulePath: "104 CPS > Physiology > Respiratory System > Gas Transport by the Blood",
      type: "mechanism",
      aliases: ["Bohr effect", "P50", "2,3-DPG", "Oxygen unloading", "Hb-O2 dissociation curve shifts"],
    },
    {
      key: "gas-transport.co2-forms-and-chloride-shift",
      label: "CO2 travels mostly as bicarbonate (42 of 48 ml/100 ml arterial blood), made in RBCs by carbonic anhydrase and exported by the chloride shift, with the Haldane effect linking CO2 carriage to Hb's own O2 saturation",
      definition: "CO2 is carried in blood in three forms: dissolved in physical solution (about 3 ml/100 ml, setting blood PCO2), as carbamino compounds formed on terminal amine groups of haemoglobin and, secondarily, plasma proteins (Hb-NH2 + CO2 → Hb-NHCOOH; about 3 ml/100 ml, more on reduced than oxygenated Hb), and as bicarbonate (about 42 ml/100 ml, the majority) via CO2 + H2O → H2CO3 → H+ + HCO3-, a reaction that is slow in plasma but several thousand times faster inside red blood cells because of the enzyme carbonic anhydrase. As HCO3- accumulates in the RBC it diffuses out to plasma down its gradient; because the RBC membrane favours anion over cation movement, chloride moves from plasma into the RBC to preserve electrical neutrality — the chloride shift. This raises RBC chloride and osmotic pressure (drawing water in, so RBCs swell and venous haematocrit rises) while lowering plasma chloride, and it very slightly acidifies blood (pH about 7.4 to 7.37) because some of the H+ from carbonic acid dissociation is buffered by deoxyhaemoglobin rather than removed. At the lungs the whole sequence reverses: O2 binding releases H+ from oxyhaemoglobin (a poorer buffer than reduced Hb), H+ combines with HCO3- to regenerate CO2 for exhalation, HCO3- re-enters the RBC from plasma, and Cl- returns to plasma. The Haldane effect is the rule that ties CO2 carriage to O2 saturation: at any given PCO2, reduced (deoxygenated) Hb carries more CO2 than oxygenated Hb, because O2 binding lowers Hb's affinity for CO2 — the mirror image of the Bohr effect, in which CO2/H+ lowers Hb's affinity for O2.",
      objective: "State the three forms of CO2 transport and their approximate proportions, explain why carbonic anhydrase makes bicarbonate formation an RBC event rather than a plasma one, describe the direction and purpose of the chloride shift at the tissues and its reversal at the lungs, and state the Haldane effect and how it differs from the Bohr effect.",
      pitfall: "Confusing carbamino-haemoglobin (CO2 bound to Hb's amine groups, the true CO2-carrying compound) with carboxyhaemoglobin (CO bound to Hb's haem O2 site) — they sound alike but are chemically unrelated complexes of two different gases. Also confusing the Haldane effect (O2 saturation changes Hb's CO2 affinity) with the Bohr effect (CO2/H+ changes Hb's O2 affinity): they are reciprocal but distinct statements.",
      subject: "resp",
      primary: "DIS-PHY-T03",
      secondary: [],
      modulePath: "104 CPS > Physiology > Respiratory System > Gas Transport by the Blood",
      type: "mechanism",
      aliases: ["CO2 transport", "Chloride shift", "Carbonic anhydrase", "Haldane effect", "Carbamino compounds"],
    },
    // Pinned in a written-paper batch (docs/Kasr-Source-Imports/concept/104-CPS-physiology-concepts.md,
    // CON-CVS-76412894FAD01C) — declared here with the identical canonical_key
    // so resolveConceptId reuses that id and emits a sparse update row rather
    // than a duplicate mint. Content below matches the pinned record for a
    // seed reader's sake; the emitted label/definition come from that record.
    {
      key: "pulmonary-circulation.low-pressure-circuit-and-regulation-of-pvr",
      label: "Pulmonary vascular resistance, lowest at functional residual capacity, rises toward both total lung capacity and residual volume, and pulmonary arterioles uniquely constrict (rather than dilate) in response to local hypoxia",
      definition: "The pulmonary circulation runs at far lower pressure than the systemic circulation (pulmonary artery about 25/10 mmHg, mean 15, against systemic 120/80, mean 90). Uniquely among the vascular beds, pulmonary arterioles constrict rather than dilate in response to local alveolar hypoxia and to high alveolar PCO2 (hypoxic pulmonary vasoconstriction) — a physiologically useful mechanism that diverts blood away from poorly ventilated lung regions to redirect flow toward better-ventilated alveoli, matching perfusion to ventilation.",
      objective: "State that pulmonary arterioles constrict, not dilate, in local hypoxia, and explain why that response usefully redirects blood flow within the lung.",
      pitfall: "Assuming pulmonary vessels respond to hypoxia the way systemic vessels do, by dilating. Pulmonary arterioles constrict — the opposite response of every other vascular bed — which is what protects gas exchange by redirecting blood to better-ventilated alveoli.",
      subject: "cvs",
      primary: "DIS-PHY-T03",
      secondary: [],
      modulePath: "104 CPS > Physiology > Respiratory System > Gas Transport by the Blood",
      type: "mechanism",
      aliases: ["Hypoxic pulmonary vasoconstriction", "Pulmonary vascular resistance"],
    },
    // Pinned in scripts/kasr/seeds/mcq/104-CPS/physiology-control-of-respiration.ts
    // — declared here with the identical canonical_key for the same reuse reason.
    {
      key: "non-chemical-nervous-regulation-of-respiration.afferent-sources",
      label: "Non-chemical (nervous) regulation of respiration works through reflex afferents from higher centres, the upper airway, the lungs, the chest wall, proprioceptors and the cardiovascular system, distinct from the chemical (PCO2/pH/PO2) drive",
      definition: "Alongside the chemical control of breathing by PCO2, pH and PO2, the respiratory centre is regulated by nervous reflexes that are independent of blood gases. Afferents from higher centres carry voluntary control from the cerebral cortex, pain and emotion from the limbic system, and temperature from the hypothalamus. Afferents from upper airway receptors give the coughing and sneezing reflexes. Afferents from lung receptors give the Hering-Breuer stretch reflex; afferents from chest wall muscle spindles set tidal volume; afferents from proprioceptors in muscles, joints and tendons drive the ventilation rise of exercise. Afferents from the cardiovascular system carry the arterial baroreceptor reflex and the atrial stretch-receptor reflex. Visceral reflexes give swallowing apnoea and hiccup.",
      objective: "List the non-chemical (nervous) sources of respiratory drive by their afferent pathway and distinguish each from the chemical (PCO2/pH/PO2) control of breathing.",
      pitfall: "Treating a rise in arterial PCO2 as one item on the non-chemical list. PCO2 is the major controller of respiration through central and peripheral chemoreceptors — the chemical route — a separate heading from 'Non-Chemical (Nervous) Regulation of Respiratory Activity'.",
      subject: "resp",
      primary: "DIS-PHY-T03",
      secondary: [],
      modulePath: "104 CPS > Physiology > Respiratory System > Control of Respiration",
      type: "mechanism",
      aliases: ["Nervous regulation of respiration", "Non-chemical control of breathing"],
    },
    // Sparse reuse, not a fresh mint: canonical_key already pinned in
    // 104-CPS-physiology-concepts.md as CON-RES-228D7C6B6FDE80, this exact
    // leaf's own module_subject. Not previously claimed by any 104-CPS MCQ
    // seed (grepped before use).
    {
      key: "oxygen-transport.content-capacity-and-p50",
      label: "About 98% of blood oxygen is carried bound to haemoglobin rather than dissolved, and P50 — the PO2 at which haemoglobin is 50% saturated, normally 27 mmHg — is the single number that marks where the dissociation curve sits",
      definition: "Oxygen is carried in blood in two forms: physically dissolved (about 0.3 ml O2/100 ml arterial blood, which sets the blood PO2 and so the direction of diffusion) and bound to haemoglobin (about 19.5 ml O2/100 ml arterial blood, about 98% of the total, the main supply for tissue needs). O2 content is the volume of O2 actually combined with haemoglobin per 100 ml blood, and varies with the amount of haemoglobin present; O2 capacity is the maximum volume haemoglobin could carry if fully saturated (1.34 ml O2 per gram of Hb, giving about 20.1 ml O2/100 ml at a normal 15 g Hb/100 ml) — percentage saturation itself does not fall in anaemia, because content and capacity fall together. P50 is the PO2 at which haemoglobin is 50% saturated, normally 27 mmHg, and is the single value used to describe where the dissociation curve sits: a lower P50 means higher O2 affinity (curve shifted left), a higher P50 means lower affinity (curve shifted right).",
      objective: "Distinguish O2 content from O2 capacity, calculate O2 capacity from haemoglobin concentration (about 20 ml O2/100 ml blood at a normal 15 g Hb/100 ml), and define P50.",
      pitfall: "Assuming percentage O2 saturation falls in anaemia the way O2 content does. Saturation is a ratio of content to capacity, and anaemia lowers both together, leaving percentage saturation normal even though the blood carries less O2 in absolute terms.",
      subject: "resp",
      primary: "DIS-PHY-T03",
      secondary: [],
      modulePath: "104 CPS > Physiology > Respiratory System > Gas Transport by the Blood",
      type: "definition",
      aliases: ["O2 content versus O2 capacity", "O2 capacity of haemoglobin", "P50"],
    },
  ],

  questions: [
    // --- Hb-O2 dissociation curve shifts ---
    {
      key: "factors-that-cause-shift-of-oxygen-dissociation-curve-to-the-b126141d",
      conceptKey: "gas-transport.hb-o2-dissociation-curve-shifts",
      difficulty: "Easy",
      questionType: "Recall",
      learningObjective: "List the factors that shift the Hb-O2 dissociation curve to the right.",
      explanations: {
        A: "True, and one of three right-shift factors named together. A rise in 2,3-DPG binds deoxygenated Hb and lowers its O2 affinity, so more O2 is unloaded to tissues at a given PO2.",
        B: "True, and one of three right-shift factors named together. A fall in pH (acidosis) is the H+ half of the Bohr effect, changing Hb's configuration to favour O2 release.",
        C: "True, and one of three right-shift factors named together. A rise in temperature — as in active, heat-producing tissue — likewise favours O2 release.",
        D: "Correct. Increased 2,3-DPG, acidosis and increased temperature are all named right-shift factors, and each independently lowers Hb's O2 affinity, so 'all of the above' is the answer that credits every one of them rather than singling one out. This is exactly the combination present in active, metabolising tissue, so the right shift lets more O2 unload precisely where demand is highest.",
      },
    },
    {
      key: "factors-that-shift-oxygen-dissociation-curve-to-the-left-inc-3448eb05",
      conceptKey: "gas-transport.hb-o2-dissociation-curve-shifts",
      difficulty: "Moderate",
      questionType: "Recall",
      learningObjective: "Identify carbon monoxide poisoning as a left-shift factor and distinguish it from the three right-shift factors it is grouped against.",
      explanations: {
        A: "Acidosis (a fall in pH) is the H+ half of the Bohr effect and shifts the curve right, not left — the opposite of what this option claims.",
        B: "A rise in temperature shifts the curve right, not left — the same direction as acidosis and raised 2,3-DPG, and the opposite of what this option claims.",
        C: "Correct. Carbon monoxide binds Hb at the same site as O2 with roughly 200-210 times O2's affinity, and once bound, keeps the O2 molecules still attached to that Hb molecule from releasing easily — a genuinely left-shifting effect, but by a different mechanism than the Bohr/2,3-DPG factors. This is also why CO poisoning is dangerous beyond simply displacing O2: the O2 that does remain bound is held too tightly to unload to tissue.",
        D: "A rise in 2,3-DPG shifts the curve right, not left — it lowers, not raises, Hb's O2 affinity, the opposite of what this option claims.",
      },
    },
    {
      key: "oxygen-unloading-3-26f77f75",
      conceptKey: "gas-transport.hb-o2-dissociation-curve-shifts",
      difficulty: "Moderate",
      questionType: "Mechanism",
      learningObjective: "Predict how O2 unloading from Hb changes with PCO2, temperature, 2,3-DPG and carbon monoxide.",
      explanations: {
        A: "Correct. A rise in PCO2 is part of the Bohr effect (alongside falling pH): it shifts the dissociation curve right, lowering Hb's O2 affinity and increasing how readily O2 is unloaded at a given PO2 — exactly the response active, CO2-producing tissue needs. The same tissue that produces the extra CO2 is thereby rewarded with easier O2 delivery, a self-reinforcing loop.",
        B: "The reverse is true: a rise in temperature shifts the curve right and increases unloading, it does not decrease it.",
        C: "The reverse is true: a rise in 2,3-DPG shifts the curve right (Hb-2,3-DPG formation lowers O2 affinity) and increases unloading, it does not decrease it.",
        D: "The reverse is true: CO exposure shifts the curve left, meaning O2 is held more tightly and unloading decreases, not increases — CO's high-affinity occupation of the binding site is what impairs release of the O2 still attached.",
      },
      answerOverride: "A",
      answerOverrideReason: "The bank row supplies only three of the usual four options, printing D twice in one variant of the row; A is the option consistent with the department book's own statement that increased PCO2, like acidosis and raised temperature, shifts the curve right and increases O2 unloading.",
    },
    {
      key: "oxygen-unloading-91021a0b",
      conceptKey: "gas-transport.hb-o2-dissociation-curve-shifts",
      difficulty: "Moderate",
      questionType: "Mechanism",
      learningObjective: "Predict how O2 unloading from Hb changes with PCO2, temperature, 2,3-DPG and carbon monoxide.",
      explanations: {
        A: "Correct. A rise in PCO2 is part of the Bohr effect: it shifts the dissociation curve right, lowering Hb's O2 affinity and increasing how readily O2 is unloaded at a given PO2. Acidosis and raised temperature act the same way, so all three track together in metabolically active tissue.",
        B: "The reverse is true: a rise in temperature shifts the curve right and increases unloading, it does not decrease it.",
        C: "The reverse is true: a rise in 2,3-DPG shifts the curve right and increases unloading, it does not decrease it.",
        D: "The reverse is true: CO exposure shifts the curve left, so unloading of the O2 still bound decreases, not increases.",
      },
    },
    {
      key: "the-hemoglobin-oxygen-dissociation-curve-moves-up-and-to-the-58fa0d96",
      conceptKey: "gas-transport.hb-o2-dissociation-curve-shifts",
      difficulty: "Moderate",
      questionType: "Recall",
      learningObjective: "Identify hypothermia as a factor that shifts the Hb-O2 dissociation curve to the left, against hydrogen ion and CO2 as right-shift factors.",
      explanations: {
        A: "Increased hydrogen ion concentration is the H+ half of the Bohr effect, and it shifts the curve right, not left.",
        B: "Correct. A fall in temperature (hypothermia) is one of the paired right/left-shift factors alongside PCO2, pH and 2,3-DPG: a decrease in temperature increases Hb's O2 affinity and moves the curve left, meaning more O2 stays bound at a given PO2. This is part of why a hypothermic patient's tissues can struggle to extract the O2 their blood is actually carrying.",
        C: "Hypercarbia (raised PCO2) is part of the Bohr effect, and it shifts the curve right, not left — the same direction as increased hydrogen ion.",
        D: "Not every listed option shifts the curve the same way: A and C are right-shift factors, and only B is a left-shift factor, so 'all of the above' cannot be correct.",
      },
    },

    // --- CO2 transport, chloride shift, Haldane effect ---
    {
      key: "carbon-dioxide-is-transported-in-blood-in-the-following-form-5c2f6551",
      conceptKey: "gas-transport.co2-forms-and-chloride-shift",
      difficulty: "Moderate",
      questionType: "Recall",
      learningObjective: "Name the three true forms of CO2 transport and distinguish carbamino-haemoglobin from carboxyhaemoglobin.",
      explanations: {
        A: "True, so not the exception. CO2 in physical solution is one of the three forms (about 3 ml/100 ml of arterial blood) and is what sets blood PCO2.",
        B: "True, so not the exception. Bicarbonate, formed via carbonic anhydrase inside red blood cells, carries the majority of blood CO2 (about 42 of 48 ml/100 ml arterial blood).",
        C: "The exception, and the answer. CO2 combines with haemoglobin's terminal amine groups to form carbamino-haemoglobin (Hb-NHCOOH), not 'carboxy-haemoglobin' — that name belongs to CO bound at Hb's O2 site, a different gas binding a different site on the molecule. The two names sound alike but describe chemically unrelated complexes, which is exactly what makes this option a well-aimed distractor.",
        D: "True, so not the exception. Carbamino compounds form secondarily on plasma proteins as well as on haemoglobin, so 'bound to plasma proteins' is a genuine, if minor, form of CO2 transport.",
      },
    },
    {
      key: "carbonic-anhydrase-cb975a18",
      conceptKey: "gas-transport.co2-forms-and-chloride-shift",
      difficulty: "Easy",
      questionType: "Recall",
      learningObjective: "State where carbonic anhydrase is located and what reaction it catalyses.",
      explanations: {
        A: "Carbonic anhydrase is not in plasma — the hydration of CO2 to carbonic acid is slow specifically because plasma lacks this enzyme, which is why the reaction runs almost entirely inside red blood cells instead.",
        B: "Correct. Carbonic anhydrase is present inside erythrocytes, where it accelerates the hydration of CO2 several thousand-fold compared with plasma, making red blood cells the site of nearly all bicarbonate formation. Without this enzyme, bicarbonate formation would be far too slow to keep pace with the CO2 tissues actually produce.",
        C: "Carbonic anhydrase catalyses the reaction between CO2 and water (CO2 + H2O → H2CO3), not a reaction between CO2 and haemoglobin — CO2 binds haemoglobin directly, without this enzyme, to form carbamino compounds.",
        D: "The dissociation of carbonic acid into bicarbonate and H+ is a fast, spontaneous ionisation once carbonic acid has formed; carbonic anhydrase's role is upstream of that step, catalysing CO2's hydration to carbonic acid in the first place.",
      },
    },
    {
      key: "during-chloride-shift-1-eefc11e6",
      conceptKey: "gas-transport.co2-forms-and-chloride-shift",
      difficulty: "Hard",
      questionType: "Mechanism",
      learningObjective: "State the direction of ion movement in the chloride shift and its effect on blood pH.",
      explanations: {
        A: "The reverse is true: bicarbonate leaves the red blood cell for plasma as it accumulates from CO2 hydration, and chloride enters the cell to replace the charge bicarbonate takes with it — not HCO3- entering in exchange for Cl-.",
        B: "The chloride shift happens at the tissues, producing venous, not arterial, blood characteristics; and the red cell swells rather than shrinks, as the extra intracellular HCO3- and Cl- draw water in by osmosis.",
        C: "Correct. As CO2 is hydrated to carbonic acid inside the red cell, H+ is released; most of it is buffered by deoxyhaemoglobin, but enough escapes buffering that blood pH falls slightly in venous blood (from about 7.4 to 7.37) — blood becomes marginally more acidic during the chloride shift. Deoxyhaemoglobin's buffering is what keeps this fall small rather than sizeable, since it is a better buffer than oxyhaemoglobin.",
        D: "Red cell size increases in venous, not arterial, blood — the chloride shift is a tissue-level, venous-blood event, and it is the venous red cell that swells as HCO3- and Cl- accumulate inside it.",
      },
    },
    {
      key: "during-chloride-shift-1441cfda",
      conceptKey: "gas-transport.co2-forms-and-chloride-shift",
      difficulty: "Hard",
      questionType: "Mechanism",
      learningObjective: "State the direction of ion movement in the chloride shift and its effect on blood pH.",
      explanations: {
        A: "The reverse is true: bicarbonate leaves the red blood cell for plasma, and chloride enters the cell to replace the lost negative charge — not HCO3- entering in exchange for Cl-.",
        B: "The red cell swells, not shrinks, in venous blood as HCO3- and Cl- accumulate inside it and draw water in osmotically.",
        C: "Correct. H+ released as CO2 is hydrated to carbonic acid is mostly, but not completely, buffered by deoxyhaemoglobin, so venous blood pH falls slightly (about 7.4 to 7.37) — blood becomes marginally more acidic during the chloride shift. The shift reverses at the lungs, where oxyhaemoglobin releases the buffered H+ again to regenerate CO2 for exhalation.",
        D: "Red cell size increases, not stays fixed or decreases, in venous blood specifically — this is a tissue-level, venous-blood event, not an arterial one.",
      },
    },
    {
      key: "regarding-chloride-shift-phenomenon-at-the-tissue-level-d2124bd0",
      conceptKey: "gas-transport.co2-forms-and-chloride-shift",
      difficulty: "Moderate",
      questionType: "Mechanism",
      learningObjective: "State the chloride shift's effect on red cell chloride, osmotic pressure and haematocrit at the tissue level.",
      explanations: {
        A: "Correct. Chloride moves from plasma into red blood cells to replace the negative charge that bicarbonate takes with it as HCO3- diffuses out — so Cl- rises inside RBCs (and falls in plasma) during the chloride shift. This anion exchange is exactly what keeps the red cell electrically neutral while it exports the bicarbonate it has just manufactured.",
        B: "The reverse is true: osmotic pressure of the RBCs increases, not decreases, because both HCO3- and Cl- accumulate inside the cell, drawing water in by osmosis.",
        C: "The reverse is true: the resulting water influx swells red blood cells, raising, not decreasing, the haematocrit value of venous blood compared with arterial blood.",
      },
    },
    {
      key: "the-haldane-effect-refers-to-460f3b00",
      conceptKey: "gas-transport.co2-forms-and-chloride-shift",
      difficulty: "Moderate",
      questionType: "Recall",
      learningObjective: "Define the Haldane effect and distinguish it from the chloride shift and the CO2 dissociation curve.",
      explanations: {
        A: "Correct. The Haldane effect is the statement that, at any given CO2 tension, reduced (deoxygenated) haemoglobin carries more CO2 than oxygenated haemoglobin does — O2 binding lowers Hb's affinity for CO2, the mirror image of the Bohr effect. This is what makes O2 loading at the lungs and CO2 unloading there self-reinforcing, and the reverse at the tissues equally so.",
        B: "This describes the chloride shift, the anion exchange that keeps the red cell electrically neutral while bicarbonate is exported — a related but separate phenomenon from the Haldane effect.",
        C: "Dissolved CO2 is only one of the three transport forms and is not what the Haldane effect describes; the Haldane effect concerns Hb-bound CO2 carriage, not physical solution.",
        D: "The Haldane effect is a statement about how much CO2 a given blood sample carries depending on Hb's O2 saturation, not a description of the CO2 dissociation curve's shape as such.",
      },
    },
    {
      key: "most-co-is-transported-in-the-blood-in-the-form-of-9dc7cf8c",
      conceptKey: "gas-transport.co2-forms-and-chloride-shift",
      difficulty: "Easy",
      questionType: "Recall",
      learningObjective: "State that bicarbonate carries the majority of blood CO2, against the smaller dissolved and carbamino fractions.",
      explanations: {
        A: "CO2 in physical solution is only about 3 of the 48 ml/100 ml of arterial blood's total CO2 — a small minority, not the majority form.",
        B: "Carbaminohaemoglobin carries only about 3 of the 48 ml/100 ml of arterial blood's total CO2 — a small minority, not the majority form.",
        C: "Correct. Bicarbonate carries about 42 of the 48 ml/100 ml of arterial blood's total CO2 — the clear majority, formed inside red blood cells via carbonic anhydrase and exported to plasma by the chloride shift. Dissolved CO2 and carbamino compounds make up only about 3 ml each, the two minor forms by comparison.",
        D: "Carboxyhaemoglobin is the complex formed by carbon monoxide, not carbon dioxide, binding haemoglobin — it is not a CO2 transport form at all.",
      },
    },

    // --- Pulmonary hypoxic vasoconstriction ---
    {
      key: "in-which-vascular-bed-does-hypoxia-cause-vasoconstriction-bce0e518",
      conceptKey: "pulmonary-circulation.low-pressure-circuit-and-regulation-of-pvr",
      difficulty: "Moderate",
      questionType: "Mechanism",
      learningObjective: "Identify the pulmonary vascular bed as the one exception where local hypoxia causes vasoconstriction rather than vasodilation.",
      explanations: {
        A: "The coronary circulation, like most vascular beds, vasodilates in local hypoxia as part of active/metabolic hyperaemia — the opposite of the pulmonary response.",
        B: "Correct. Pulmonary arterioles are the one vascular bed that constricts, not dilates, in response to local alveolar hypoxia (hypoxic pulmonary vasoconstriction) — a mechanism that usefully diverts blood away from poorly ventilated lung regions toward better-ventilated alveoli, matching perfusion to ventilation. When this response becomes global, as at high altitude or in chronic lung disease, the same mechanism instead raises pulmonary vascular resistance throughout the lung.",
        D: "Skeletal muscle vasculature, like most systemic vascular beds, vasodilates in local hypoxia as part of active hyperaemia driven by falling ATP/O2 and rising vasodilator metabolites — the opposite of the pulmonary response.",
      },
    },

    // --- Non-chemical (nervous) respiratory drive: shared with Control of Respiration ---
    {
      key: "non-chemical-influence-on-respiration-inclucle-all-of-the-fo-491c9bf5",
      conceptKey: "non-chemical-nervous-regulation-of-respiration.afferent-sources",
      difficulty: "Moderate",
      questionType: "Classification",
      learningObjective: "Separate the chemical (PCO2) drive to breathe from the nervous, non-chemical afferents that also regulate the respiratory centre.",
      explanations: {
        A: "A genuine non-chemical influence, not the exception. Pain and emotional stimuli reach the respiratory centre through the limbic system, and temperature through the hypothalamus — both nervous routes; whichever brain region a given source is filed under, the pathway itself is nervous, not chemical.",
        B: "A genuine non-chemical influence, not the exception. Swallowing is one of the visceral reflexes: pharyngeal mechanoreceptors send a glossopharyngeal afferent that inhibits respiration (swallowing apnoea) to keep food out of the airway.",
        C: "A genuine non-chemical influence, not the exception. Coughing is a protective reflex from irritant receptors in the trachea, larynx and bronchi, carried by the vagus, producing deep inspiration then forced expiration against a suddenly-opening glottis.",
        D: "The exception, and the answer. Hypoxia (a fall in arterial PO2) drives ventilation through the peripheral chemoreceptors — the chemical route — not through a nervous reflex, so it is the one option that does not belong under 'Non-Chemical (Nervous) Regulation'. Pain, swallowing and coughing, by contrast, all act through dedicated nervous afferent pathways with no blood-gas sensor involved.",
      },
      answerOverride: "D",
      answerOverrideReason: "The chapter structure contradicts the printed key. 'Non-Chemical (Nervous) Regulation of Respiratory Activity' (physiology department book p149-153) lists pain/limbic afferents, coughing and swallowing as nervous reflex sources of respiratory drive. Hypoxia (low PO2) sits in the separate chemical-regulation section, sensed by the peripheral chemoreceptors — the chemical route the non-chemical section is contrasted against — so it is the one option that is not a non-chemical influence.",
    },
    {
      key: "non-chemical-influence-on-respiration-include-all-of-the-fol-a0b06c7d",
      conceptKey: "non-chemical-nervous-regulation-of-respiration.afferent-sources",
      difficulty: "Moderate",
      questionType: "Classification",
      learningObjective: "Separate the chemical (PO2) drive to breathe from the nervous, non-chemical afferents that also regulate the respiratory centre.",
      explanations: {
        A: "A genuine non-chemical influence, not the exception. Pain and emotional afferents reach the respiratory centre through nervous routes (limbic system, hypothalamus), not through blood-gas chemoreceptors.",
        B: "A genuine non-chemical influence, not the exception. Swallowing apnoea is a visceral reflex carried by a glossopharyngeal afferent from pharyngeal mechanoreceptors.",
        C: "A genuine non-chemical influence, not the exception. Coughing is a vagally-mediated reflex from irritant receptors in the upper airway.",
        D: "The exception, and the answer. Hypoxia drives ventilation through the peripheral chemoreceptors — the chemical route — not through a nervous reflex, so it does not belong on a list of non-chemical influences. Pain and coughing, by contrast, act through dedicated nervous afferent pathways with no blood-gas sensor involved.",
      },
      answerOverride: "D",
      answerOverrideReason: "Same reasoning as the sibling row non-chemical-influence-on-respiration-inclucle-all-of-the-fo-491c9bf5: the department book files hypoxia under chemical (peripheral chemoreceptor) regulation, a separate heading from 'Non-Chemical (Nervous) Regulation of Respiratory Activity' (p149-153), so it is the exception rather than option A, B or C.",
    },
    {
      key: "the-respiratory-center-da0305c6",
      conceptKey: "non-chemical-nervous-regulation-of-respiration.afferent-sources",
      difficulty: "Moderate",
      questionType: "Recall",
      learningObjective: "State that the respiratory centre is bilateral in both pons and medulla, that the DRG alone drives quiet inspiration, and that proprioceptor afferents reach it.",
      explanations: {
        A: "The respiratory centre is bilateral in both the pons and the medulla, not the pons only — the medulla holds the dorsal and ventral respiratory groups, and the pons holds the apneustic and pneumotaxic centres.",
        B: "During quiet breathing the dorsal respiratory group sends rhythmic signals to the inspiratory muscles, and the ventral respiratory group — which carries the expiratory neurons — is inactive; the centre does not send regular signals to expiratory muscles during quiet breathing.",
        C: "The respiratory centre is not stimulated directly by low PO2. Peripheral chemoreceptors sense arterial PO2 and relay that afferent signal to the centre; the centre's own central chemoreceptors respond to CSF H+/CO2, not to O2 tension.",
        D: "Correct. Afferents from proprioceptors in skeletal muscle, tendons and joints, carried by somatic nerves, reach and stimulate the respiratory centre — part of the drive behind the rise in ventilation seen at the very onset of muscular exercise. This proprioceptive input is fast enough to raise ventilation before exercising muscle's own metabolic byproducts have had time to build up and act through the chemical route.",
      },
    },
    {
      key: "with-respect-to-the-binding-of-carbon-monoxide-to-haemoglobi-5467d1ba",
      conceptKey: "gas-transport.hb-o2-dissociation-curve-shifts",
      difficulty: "Hard",
      questionType: "Recall",
      learningObjective: "State that carbon monoxide's roughly 200-fold higher affinity for haemoglobin shifts the CO-Hb dissociation curve far to the left of the O2-Hb curve.",
      explanations: {
        A: "Carbon monoxide binds the SAME site on haemoglobin as oxygen — the heme iron — which is exactly why the two gases compete directly for the same binding sites rather than acting independently.",
        B: "The opposite is true: haemoglobin's affinity for carbon monoxide is roughly 200 times GREATER than its affinity for oxygen, not lower — this single fact is why even a small inspired CO concentration can tie up a large fraction of the body's haemoglobin.",
        C: "Almost all carbon monoxide in the blood is carried bound to haemoglobin, not dissolved in plasma water — a 97%-dissolved figure instead describes roughly the physically-dissolved fraction of a gas like O2, not CO's own overwhelmingly Hb-bound transport.",
        D: "This is the correct answer. Because haemoglobin's affinity for carbon monoxide is about 200 times greater than for oxygen, a given percentage saturation with CO is reached at a far lower partial pressure than the same saturation with O2 — so the CO-Hb dissociation curve sits well to the left of the O2-Hb curve. This is the same superaffinity that lets bound CO also resist the release of any oxygen molecules still attached to the same haemoglobin tetramer, shifting the O2 curve itself to the left as well.",
      },
    },
    // Leaf-mismatch routing (bank-tagged "Gas exchange in the lung" — the
    // stem's own "gas exchange across the alveolar membrane" wording pulled
    // it into that leaf tag, but the credited option is an O2-carrying-
    // capacity fact and the distractors are Bohr-effect facts, both this
    // leaf's own concepts, not diffusion mechanics).
    {
      key: "with-respect-to-gas-exchange-across-the-alveolar-membrane-e168f662",
      conceptKey: "oxygen-transport.content-capacity-and-p50",
      difficulty: "Moderate",
      questionType: "Recall",
      learningObjective: "State that 100 ml of blood's haemoglobin can combine with about 20 ml of oxygen (O2 capacity), against three false statements about venous saturation and the Bohr effect.",
      explanations: {
        A: "Mixed venous blood's oxygen SATURATION is about 75%, not 40% — 40 mmHg is instead the approximate mixed venous PO2 (partial pressure), a different quantity from percentage saturation that this option conflates with it.",
        B: "Correct. Haemoglobin's O2 capacity — the maximum volume of oxygen 100 ml of blood can carry when fully saturated — works out to about 20 ml O2/100 ml blood, from 1.34 ml O2 per gram of a normal 15 g Hb/100 ml.",
        C: "The reverse is true: acidosis (a fall in pH) shifts the oxygen-haemoglobin dissociation curve to the RIGHT, not the left — part of the Bohr effect, which favours O2 release into acidic, actively metabolising tissue.",
        D: "The reverse is true: a decreased CO2 concentration shifts the oxygen-haemoglobin dissociation curve to the LEFT, not the right — falling CO2 (like falling H+) raises, rather than lowers, haemoglobin's affinity for O2.",
      },
    },
  ],
}
