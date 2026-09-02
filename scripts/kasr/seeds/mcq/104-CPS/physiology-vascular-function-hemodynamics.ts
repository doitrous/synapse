import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Physiology Cardiovascular System — Hemodynamics, Arterial Pressure and Local Flow Regulation',
  modulePath: '104 CPS > Physiology > Cardiovascular System > Vascular Function',
  // ART-104-PHY-HEMODYNAMICS-AND-ARTERIAL-PRESSURE is a real, live, evidenced
  // Draft article, module_subject "104 CPS > Physiology > Cardiovascular
  // System > Vascular Function" — this exact leaf. Read in full before
  // authoring against it.
  articleId: 'ART-104-PHY-HEMODYNAMICS-AND-ARTERIAL-PRESSURE',

  concepts: [
    {
      // Sparse reuse, not a fresh mint: canonical_key already pinned in
      // 104-CPS-physiology-concepts.md as CON-CVS-FA5FB57963DDF7, this
      // exact leaf's own module_subject and this file's own article_ids.
      // Declaring the same key here resolves to CON-CVS-FA5FB57963DDF7 and
      // emits a sparse update only; every other field below is inert for
      // the build, restated close to the pinned record's own wording.
      key: 'hemodynamics.flow-pressure-resistance-relationship',
      label: 'Blood flow equals the pressure gradient divided by resistance, and applied to the whole circulation this gives a systemic resistance of about 18 mmHg/L/min against a pulmonary resistance of only about 1.4 mmHg/L/min',
      definition: 'Flow is the volume of fluid crossing a point per unit time; the overall blood flow in the circulation is the amount pumped into the aorta each minute, i.e. the cardiac output. Flow (F), pressure (P) and resistance (R) in blood vessels are related by F = deltaP / R. Applying this to the whole systemic circulation, total peripheral resistance TPR = (MAP - CVP) / CO = (90 - 0) / 5 = 18, so TPR is about 18 mmHg/L/min. Applying the same relationship to the pulmonary circulation, PulR = (MPP - LAP) / COP = (15 - 8) / 5 = 1.4, so pulmonary vascular resistance is only about 1.4 mmHg/L/min even though it carries the same cardiac output.',
      objective: 'State the flow-pressure-resistance relationship F = deltaP / R, and use the book\'s own worked values to give the approximate resistance of the systemic circulation (about 18 mmHg/L/min) and of the pulmonary circulation (about 1.4 mmHg/L/min).',
      pitfall: 'Forgetting that the pulmonary circulation carries the same cardiac output as the systemic circulation despite having roughly one-thirteenth of its resistance — the low pulmonary resistance, not a lower flow, is why pulmonary pressures are so much lower than systemic pressures.',
      subject: 'cvs',
      primary: 'DIS-PHY-T02',
      secondary: [],
      modulePath: '104 CPS > Physiology > Cardiovascular System > Vascular Function',
      type: 'mechanism',
      aliases: ['F = deltaP/R', 'Total peripheral resistance', 'Ohm\'s law of the circulation'],
      gaps: [
        'This concept and its article state F = deltaP/R at the whole-circulation level but do not themselves expand resistance into Poiseuille\'s law (R proportional to viscosity x length / radius^4) — standard, undisputed physics, disclosed per-question below where a row tests viscosity or vessel radius specifically rather than the whole-circulation relationship.',
      ],
    },
    {
      // Sparse reuse, not a fresh mint: canonical_key already pinned in
      // 104-CPS-physiology-concepts.md as CON-CVS-A0579343614BCD, this
      // exact leaf and article.
      key: 'arterial-blood-pressure.systolic-diastolic-map-and-pulse-pressure',
      label: 'Systolic, diastolic and mean arterial pressure are distinct quantities, mean arterial pressure sits nearer diastolic because diastole outlasts systole, and pulse pressure widens when arterial compliance falls',
      definition: 'Systolic blood pressure is the peak pressure reached during systole in the aorta and large arteries, about 120 mmHg (normal range 90-140 mmHg). Diastolic blood pressure is the lowest pressure during diastole, about 80 mmHg (normal range 60-90 mmHg). Mean arterial pressure (MAP) is the average pressure throughout the cardiac cycle, approximately equal to diastolic pressure plus one-third of the pulse pressure (about 90 mmHg normally); it is not the arithmetic mean of systolic and diastolic pressure, because diastole outlasts systole. Pulse pressure is simply the difference between systolic and diastolic pressure, normally about 30-50 mmHg, and it widens when arterial compliance falls (the book\'s example is atherosclerosis): systolic pressure rises because the stiffer artery cannot distend enough to take up the stroke volume, and diastolic pressure falls because it has less elastic recoil left to sustain pressure through diastole.',
      objective: 'State the definitions of systolic, diastolic, mean and pulse pressure, the MAP = diastolic + 1/3 pulse-pressure formula, and that pulse pressure widens when arterial compliance falls.',
      pitfall: 'Computing MAP as the plain arithmetic mean of systolic and diastolic pressure instead of diastolic + one-third pulse pressure — diastole is the longer part of the cycle, which is exactly why MAP sits closer to diastolic than to the midpoint.',
      subject: 'cvs',
      primary: 'DIS-PHY-T02',
      secondary: [],
      modulePath: '104 CPS > Physiology > Cardiovascular System > Vascular Function',
      type: 'definition',
      aliases: ['MAP', 'Pulse pressure', 'Systolic and diastolic pressure'],
    },
    {
      // Sparse reuse, not a fresh mint: canonical_key already pinned in
      // 104-CPS-physiology-concepts.md as CON-CVS-56A68328FD03C7, module
      // subject "Basic Mechanisms of Circulatory Control" (a genuine
      // cross-leaf reuse — its own article ART-104-PHY-LOCAL-AND-HORMONAL-
      // CONTROL differs from this file's articleId; sparse reuse leaves
      // the pinned record's own article_ids untouched, so this is not a
      // mispin, the same reuse pattern already documented for the
      // baroreceptor-reflex concept in the sibling hemorrhagic-shock
      // file).
      key: 'local-blood-flow-regulation.myogenic-and-metabolic-autoregulation',
      label: 'Local blood flow is matched to tissue metabolism by two mechanisms — active hyperaemia driven by vasodilator metabolites and hypoxia, and myogenic/metabolic autoregulation that returns flow toward normal after a change in perfusion pressure',
      definition: 'Active hyperaemia is the rise in blood flow that accompanies a rise in tissue metabolic activity, produced by arteriolar and precapillary-sphincter dilation from local hypoxia, vasodilator metabolites (CO2, H+, adenosine) and local heat. Autoregulation is the tendency of blood flow in a tissue to return toward normal within under a minute after a change in perfusion pressure, even though the pressure change persists, by two mechanisms: the myogenic mechanism, in which arteriolar stretch from a pressure rise increases calcium entry into vascular smooth muscle and so vasoconstricts (and the converse for a pressure fall), and the metabolic mechanism, in which a fall in flow itself causes hypoxia and metabolite accumulation that dilates the arterioles (and the converse for a flow rise). Reactive hyperaemia — the marked overshoot of blood flow seen after a period of temporary occlusion is released — is an extreme example of the metabolic mechanism.',
      objective: 'State that active hyperaemia (local metabolic vasodilation) is quantitatively the dominant mechanism matching flow to a tissue\'s own metabolic demand, and distinguish it from pressure-driven autoregulation.',
      pitfall: 'Treating active hyperaemia and autoregulation as one mechanism. Active hyperaemia responds to a rise in tissue metabolism; autoregulation responds to a change in perfusion pressure — they share the same metabolic logic but different triggers.',
      subject: 'cvs',
      primary: 'DIS-PHY-T02',
      secondary: [],
      modulePath: '104 CPS > Physiology > Cardiovascular System > Vascular Function',
      type: 'mechanism',
      aliases: ['Active hyperaemia', 'Autoregulation of blood flow', 'Reactive hyperaemia'],
    },
    {
      // Fresh mint. find-existing.mjs "Reynolds number turbulent blood
      // flow" -> "Safe to create one." No 104-CPS article states Reynolds-
      // number determinants explicitly; the facts tested (velocity up,
      // vessel diameter up, viscosity DOWN and blood density up all raise
      // turbulence tendency; partial occlusion raises LOCAL velocity and
      // so promotes turbulence there) are standard, undisputed
      // haemodynamics, disclosed as a gap against this file's own article
      // rather than invented from an unstated source.
      key: 'turbulent-blood-flow.reynolds-number-determinants',
      label: 'Blood flow becomes turbulent, rather than laminar, when its Reynolds number rises — driven up by higher velocity or vessel diameter and DOWN by higher viscosity — and partial vessel occlusion promotes turbulence locally by raising velocity through the narrowed segment',
      definition: 'Whether blood flow is smooth (laminar) or turbulent is predicted by the Reynolds number, which rises with blood velocity, vessel diameter and blood density, and falls as blood viscosity rises. A higher Reynolds number means a greater tendency toward turbulence; a decrease in blood viscosity therefore increases the tendency toward turbulence, the opposite of what raising viscosity does. Partial occlusion (stenosis or narrowing) of a blood vessel forces the same volume of blood through a smaller cross-sectional area, sharply increasing local flow velocity at and just beyond the narrowed segment, which promotes turbulence there even if flow elsewhere in the vessel remains laminar — the physical basis of vascular murmurs and bruits.',
      objective: 'State that the tendency of blood flow to become turbulent rises with velocity, vessel diameter and blood density, falls with blood viscosity, and that partial vessel occlusion promotes local turbulence by raising local velocity.',
      pitfall: 'Assuming turbulence tendency rises with viscosity, by analogy with resistance (which does rise with viscosity). The Reynolds number places viscosity in its denominator, so turbulence tendency runs the OPPOSITE direction from resistance as viscosity changes.',
      subject: 'cvs',
      primary: 'DIS-PHY-T02',
      secondary: [],
      modulePath: '104 CPS > Physiology > Cardiovascular System > Vascular Function',
      type: 'mechanism',
      aliases: ['Reynolds number', 'Turbulent vs laminar flow', 'Vascular murmurs and bruits'],
      gaps: [
        'No 104-CPS article states the Reynolds-number relationship explicitly; this is standard, undisputed haemodynamics (the same physics underlying auscultatory blood-pressure measurement and vascular bruits), flagged for the article-authoring lane rather than invented without any source at all.',
      ],
    },
    {
      // Fresh mint. find-existing.mjs "critical closing pressure" ->
      // "Safe to create one." No 104-CPS article names this term; standard,
      // undisputed vascular physiology, disclosed as a gap.
      key: 'critical-closing-pressure.definition-and-mechanism',
      label: 'Critical closing pressure is the transmural pressure below which a blood vessel with active smooth-muscle tone collapses completely and flow abruptly ceases, rather than simply falling in proportion to the declining pressure',
      definition: 'In a vessel with active vascular smooth-muscle tone, flow does not fall smoothly to zero as distending (transmural) pressure is lowered. Below a specific pressure — the critical closing pressure — the vessel wall\'s own tension exceeds the distending pressure trying to keep it open, and the vessel collapses completely, so flow ceases abruptly rather than tapering off gradually. This is distinct from mean arterial pressure (the average pressure across the cardiac cycle), pulse pressure (the systolic-diastolic difference) and perfusion pressure (the pressure gradient actually driving flow through an organ) — critical closing pressure is specifically the threshold transmural pressure at which a vessel with tone snaps shut.',
      objective: 'Define critical closing pressure as the transmural pressure at which a toned blood vessel collapses and flow abruptly ceases, and distinguish it from mean arterial, pulse and perfusion pressure.',
      pitfall: 'Assuming blood flow simply approaches zero smoothly as vessel pressure falls, the way it would in a rigid tube. A vessel with active smooth-muscle tone instead collapses abruptly at its own critical closing pressure, a genuinely different behaviour from a passive conduit.',
      subject: 'cvs',
      primary: 'DIS-PHY-T02',
      secondary: [],
      modulePath: '104 CPS > Physiology > Cardiovascular System > Vascular Function',
      type: 'definition',
      aliases: ['Critical closing pressure', 'Vessel collapse pressure'],
      gaps: [
        'No 104-CPS article names critical closing pressure; standard, undisputed vascular physiology (the behaviour of a collapsible tube with active wall tension), flagged for the article-authoring lane rather than invented without any source at all.',
      ],
    },
    {
      // Sparse reuse, not a fresh mint: canonical_key already pinned in
      // 104-CPS-physiology-concepts.md as CON-CVS-78E74CAC3AE5E5, this
      // exact leaf's own module_subject. Not previously claimed by any
      // 104-CPS MCQ seed (grepped before use). Two leaf-mismatch rows below
      // (bank-tagged "Pulmonary Compliance", genuinely about arterial and
      // venous vessel compliance, not lung compliance) are routed here
      // rather than authored under the pulmonary-compliance leaf, the same
      // "route to the seed that owns the concept" pattern used elsewhere in
      // this branch (e.g. the arteriovenous-anastomosis concept in
      // cardiovascular-av-connections-histology.ts).
      key: 'vascular-tree.pressure-and-compliance-distribution',
      label: 'Vascular compliance is higher at lower distending volumes and falls as the vessel stiffens at higher volumes, and venous compliance is about 24 times arterial compliance, making veins the circulation\'s blood reservoir',
      definition: 'Vascular compliance is the ratio of change in blood volume to change in pressure in a vessel, and it is not fixed: compliance is higher at lower volumes and falls (the vessel stiffens) at higher volumes, because the vessel wall\'s more easily stretched elastic (elastin) component dominates the initial, more compliant part of its pressure-volume behaviour, while its stiffer, less distensible collagen component is progressively recruited and dominates at higher distension. Arterial compliance converts the intermittent flow from the aorta into continuous flow in peripheral vessels, minimises the rise of systolic and the fall of diastolic pressure, and reduces the work the heart must do for a given cardiac output. Venous compliance is about 24 times arterial compliance, so veins can accommodate far more blood than arteries for the same change in pressure, which is why veins are described as reservoir vessels; venous compliance is itself set mainly by venous tone, higher tone giving lower compliance.',
      objective: 'Define vascular compliance as delta volume / delta pressure, state that it falls as a vessel is stretched toward higher volumes because collagen recruitment progressively stiffens the wall, and explain why the much higher compliance of veins relative to arteries makes them the circulation\'s blood reservoir.',
      pitfall: 'Assuming a vessel\'s compliance is a single fixed number. It is a slope that itself changes with distension — high (elastin-dominated) at low volumes, low (collagen-dominated) at high volumes — which is exactly what produces the initial, more linear part and the later, steeper part of a vessel\'s own pressure-volume curve.',
      subject: 'cvs',
      primary: 'DIS-PHY-T02',
      secondary: [],
      modulePath: '104 CPS > Physiology > Cardiovascular System > Vascular Function',
      type: 'mechanism',
      aliases: ['Vascular compliance', 'Arterial versus venous compliance', 'Vessel wall elastin and collagen recruitment', 'Veins as capacitance vessels'],
      gaps: [
        'The pinned record states that compliance is higher at lower volumes and falls (stiffens) at higher volumes, and separately (in this module\'s own histology concept, arteriovenous-anastomosis\'s sibling capillary-type concepts) that elastin and collagen are the vessel wall\'s two distensible components — but no single 104-CPS record explicitly names elastin-then-collagen sequential recruitment as the mechanism behind the shape of the pressure-volume curve, or the specific factors (sympathetic tone, oestrogen, ageing, atherosclerosis) that raise or lower vascular compliance. Both are standard, undisputed vascular physiology consistent with the pinned record\'s own compliance-falls-at-higher-volume fact, not contradicted by it; disclosed rather than silently assumed taught.',
      ],
    },
    {
      // Fresh mint, run43. find-existing.mjs "renin angiotensin aldosterone
      // ACE atrial natriuretic peptide" -> no matching record. Grepped
      // 104-CPS-physiology-concepts.md and every seed file for "renin",
      // "aldosterone" and "natriuretic": only passing mentions turned up (a
      // postural-hypotension concept naming "renin-angiotensin-aldosterone
      // secretion" as one item in a reflex list, and physiology-circulatory-
      // control-hemorrhagic-shock.ts's own hemorrhagic-shock.rapid-
      // compensatory-hormone-response concept, which states ANP does NOT
      // rise during hemorrhage specifically because hypovolaemia removes
      // its atrial-stretch trigger) — neither states the RAAS mechanism
      // itself or ANP's own stimulus/action as a standalone fact the way
      // this concept does, so minted fresh rather than reused.
      key: 'raas-vs-anp.opposing-blood-pressure-and-sodium-hormones',
      label: 'The renin-angiotensin-aldosterone system raises blood pressure and retains sodium (triggered by low renal perfusion), while atrial natriuretic peptide lowers blood pressure and excretes sodium (triggered by atrial stretch from a rising central blood volume) — physiological opposites',
      definition: "The renin-angiotensin-aldosterone system (RAAS) and atrial natriuretic peptide (ANP) are a matched pair of opposing hormonal systems for blood pressure and sodium balance. RAAS begins when reduced renal perfusion pressure (or reduced NaCl delivery to the macula densa, or increased renal sympathetic activity) raises renin secretion; renin cleaves angiotensinogen to angiotensin I, angiotensin-converting enzyme (ACE, secreted by pulmonary vascular endothelium among other sites) converts this to angiotensin II, which directly vasoconstricts (raising total peripheral resistance and arterial pressure) and stimulates adrenal cortex aldosterone secretion, which in turn raises renal sodium (and secondarily water) reabsorption. Inhibiting ACE therefore lowers angiotensin II and aldosterone, lowering peripheral resistance and sodium reabsorption — but because angiotensin II normally suppresses renin secretion by negative feedback, removing angiotensin II removes that brake, so renin secretion itself RISES with ACE inhibition, not falls. Atrial natriuretic peptide runs in the opposite direction on both fronts: it is secreted by atrial myocytes when a rising central (extracellular fluid) blood volume stretches the atrial wall — as in water immersion up to the neck, which shifts peripheral venous blood centrally — and it lowers blood pressure by promoting vasodilation and increasing renal sodium excretion (natriuresis), the physiological opposite of what RAAS does on both the vascular and renal fronts.",
      objective: "Contrast RAAS (low renal perfusion -> renin -> angiotensin II -> vasoconstriction + aldosterone -> sodium retention -> raised blood pressure) with ANP (atrial stretch from rising central blood volume, e.g. water immersion -> vasodilation + natriuresis -> lowered blood pressure), and state that ACE inhibition raises, not lowers, renin secretion by removing angiotensin II's negative feedback on it.",
      pitfall: "Assuming every step of the renin-angiotensin-aldosterone cascade moves in the same direction when the cascade is blocked. ACE inhibition lowers angiotensin II and aldosterone, but renin secretion itself RISES, because angiotensin II's own negative feedback on renin release is what falls away — the one step in the cascade that reverses direction rather than following the others down.",
      subject: 'cvs',
      primary: 'DIS-PHY-T02',
      secondary: [],
      modulePath: '104 CPS > Physiology > Cardiovascular System > Vascular Function',
      type: 'mechanism',
      aliases: ['RAAS', 'Renin-angiotensin-aldosterone system', 'ACE inhibition', 'Atrial natriuretic peptide', 'ANP stimulus and action'],
      conflicts: [
        "No conflicting record found; find-existing.mjs returned no match, and the only related pinned content (a postural-hypotension concept naming RAAS as one item in a reflex list, and the hemorrhagic-shock concept covering why ANP does NOT rise in hemorrhage) states neither this concept's RAAS cascade mechanism nor ANP's own stimulus/action as a standalone fact.",
      ],
    },
  ],

  questions: [
    {
      key: 'all-about-arterial-blood-pressure-is-true-except-6f0eaf1d',
      conceptKey: 'arterial-blood-pressure.systolic-diastolic-map-and-pulse-pressure',
      difficulty: 'Moderate',
      questionType: 'Recall of a false statement',
      learningObjective: 'Identify that arterial blood pressure is regulated by more than peripheral resistance alone (also cardiac output, blood volume and vessel compliance among others) as the exception among true statements about it.',
      explanations: {
        A: 'True of arterial blood pressure, so not the exception: arterial wall elastin content sets vessel compliance, and compliance shapes pulse pressure and the overall pressure profile.',
        B: 'The exception, and the answer. Arterial blood pressure is set by more than peripheral resistance alone — mean arterial pressure equals cardiac output times total peripheral resistance, so cardiac output (itself set by heart rate and stroke volume/venous return) is just as much a determinant as resistance is.',
        C: 'True of arterial blood pressure, so not the exception: increased venous return raises end-diastolic volume and, by the Frank-Starling mechanism, stroke volume and cardiac output, which raises arterial blood pressure.',
        D: 'True of arterial blood pressure, so not the exception: the auscultatory (Korotkoff-sound) method, using a sphygmomanometer and stethoscope, is the standard clinical way of measuring it.',
      },
    },
    {
      key: 'mean-arterial-pressure-4cc2c6ef',
      conceptKey: 'arterial-blood-pressure.systolic-diastolic-map-and-pulse-pressure',
      difficulty: 'Moderate',
      questionType: 'Recall of a comprehensive true statement',
      learningObjective: 'State that mean arterial pressure is both the average pressure over the cardiac cycle and can be calculated as diastolic pressure plus one-third of the pulse pressure, so the comprehensive option is correct.',
      explanations: {
        A: 'True, but incomplete alone. Mean arterial pressure is indeed the average arterial pressure over a cardiac cycle — but option C is also true, so the comprehensive option combining both is the better answer.',
        B: 'Not a valid formula for MAP: the garbled option text aside, systolic minus diastolic pressure is the definition of PULSE pressure, not mean arterial pressure.',
        C: 'True, but incomplete alone. MAP can indeed be approximated as diastolic pressure plus one-third of the pulse pressure — but option A is also true, so the comprehensive option combining both is the better answer.',
        D: 'Cardiac output times total peripheral resistance does give mean arterial pressure numerically (MAP = CO x TPR, since TPR = MAP/CO by definition), but this option is not selected as part of the credited "both A and C" answer, which names the cycle-average definition and the diastolic + 1/3 pulse-pressure formula specifically.',
        E: 'Correct. Both A (MAP is the average arterial pressure over a cardiac cycle) and C (MAP can be calculated from diastolic pressure + one-third of the pulse pressure) state genuine, complementary facts about mean arterial pressure — a definition and a calculation formula for it — so "both A and C" is the comprehensive correct answer.',
      },
    },
    {
      key: 'the-pulse-pressure-is-increased-in-the-following-conditions-4dfdaf6e',
      conceptKey: 'arterial-blood-pressure.systolic-diastolic-map-and-pulse-pressure',
      difficulty: 'Moderate',
      questionType: 'Recall of a false statement',
      learningObjective: 'Identify hemorrhage, which lowers stroke volume and so narrows (not widens) pulse pressure, as the exception among conditions that widen pulse pressure.',
      explanations: {
        A: 'Severe anaemia genuinely widens pulse pressure (via a hyperdynamic circulation with raised stroke volume from reduced blood viscosity), so not the exception.',
        B: 'Aortic regurgitation genuinely widens pulse pressure — diastolic pressure falls sharply as blood regurgitates back into the ventricle, while systolic pressure rises from the larger effective stroke volume — so not the exception.',
        C: 'The exception, and the answer. Hemorrhage lowers stroke volume (via reduced venous return and preload), and a lower stroke volume narrows, not widens, pulse pressure — the opposite direction from the other three listed conditions.',
        D: 'Atherosclerosis genuinely widens pulse pressure by lowering arterial compliance — the stiffer artery lets systolic pressure rise and diastolic pressure fall for the same stroke volume — so not the exception.',
      },
    },
    {
      key: 'which-of-the-given-terms-is-defined-as-the-difference-betwee-e481ba38',
      conceptKey: 'arterial-blood-pressure.systolic-diastolic-map-and-pulse-pressure',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'Define pulse pressure as the difference between systolic and diastolic arterial pressure.',
      explanations: {
        A: '"Blood pressure" is the broader general term, not specifically defined as this particular difference.',
        B: 'Correct. Pulse pressure is defined precisely as the difference between systolic and diastolic arterial pressure, normally about 30-50 mmHg, reflecting the pressure swing produced by each heartbeat\'s stroke volume.',
        C: 'Mean arterial pressure is the average pressure over the cardiac cycle (approximately diastolic + one-third of the pulse pressure), not the systolic-diastolic difference itself.',
        D: '"End-ventricular pressure" is not a standard defined term for the systolic-diastolic difference in the arterial system.',
      },
    },
    {
      key: 'the-following-data-are-obtained-from-a-patient-connected-to-4207d8b0',
      conceptKey: 'arterial-blood-pressure.systolic-diastolic-map-and-pulse-pressure',
      difficulty: 'Moderate',
      questionType: 'Calculation',
      learningObjective: 'Calculate pulse pressure as systolic minus diastolic pressure from a clinical data panel, as opposed to miscalculated stroke volume, mean arterial pressure or total peripheral resistance values.',
      explanations: {
        A: 'Correct. Pulse pressure equals systolic minus diastolic blood pressure: 120 - 70 = 50 mmHg, exactly matching this option.',
        B: 'The standard MAP approximation (diastolic + one-third pulse pressure) gives 70 + (1/3)(50) = roughly 87 mmHg from this data, not 94 mmHg as this option states.',
        C: 'The standard TPR calculation ((MAP - CVP) / CO) does not yield approximately 40 resistance units from this data using the standard MAP approximation and the given cardiac output.',
        D: 'Stroke volume from this data is cardiac output divided by heart rate: 6000 mL/min / 100 beats/min = 60 mL, not the 50 mL this option states.',
      },
    },
    {
      key: 'an-increase-in-which-of-the-following-would-be-expected-to-d-d1e81b27',
      conceptKey: 'hemodynamics.flow-pressure-resistance-relationship',
      difficulty: 'Moderate',
      questionType: 'Discrimination among near-miss options',
      learningObjective: 'State that increased blood viscosity decreases blood flow (by raising resistance), as opposed to increased pressure gradient or vessel radius, which increase flow, or plasma colloid osmotic pressure, which does not directly determine vascular flow.',
      explanations: {
        A: 'A larger pressure gradient (deltaP) across a vessel INCREASES flow (F = deltaP/R), it does not decrease it.',
        B: 'A larger vessel radius sharply LOWERS resistance (inversely proportional to radius to the fourth power via Poiseuille\'s law) and so INCREASES flow, it does not decrease it.',
        C: 'Plasma colloid osmotic pressure governs trans-capillary fluid exchange (the Starling forces), not the pressure-gradient/resistance relationship that determines a vessel\'s own blood flow.',
        D: 'Correct. Increased blood viscosity raises resistance to flow (viscosity sits in the numerator of Poiseuille\'s law, which underlies the resistance term in F = deltaP/R), and for an unchanged pressure gradient, higher resistance means lower flow.',
      },
    },
    {
      key: 'if-a-patient-at-rest-has-a-systolic-diastolic-blood-pressure-2d576eb0',
      conceptKey: 'hemodynamics.flow-pressure-resistance-relationship',
      difficulty: 'Moderate',
      questionType: 'Calculation',
      learningObjective: 'Calculate total peripheral resistance as mean arterial pressure divided by cardiac output, using the diastolic + one-third pulse-pressure approximation for MAP.',
      explanations: {
        A: '18 mmHg x min/L does not match this patient\'s own calculated value; it is the book\'s own separate worked example at different numbers (MAP 90, CO 5).',
        B: 'Correct. Mean arterial pressure is approximated as diastolic pressure plus one-third of the pulse pressure: 80 + (1/3)(140-80) = 80 + 20 = 100 mmHg. Total peripheral resistance equals mean arterial pressure divided by cardiac output: 100 mmHg / 5 L/min = 20 mmHg x min/L.',
        C: '22 mmHg x min/L does not match the calculated value of 20 mmHg x min/L from this patient\'s own data.',
        D: '25 mmHg x min/L does not match the calculated value of 20 mmHg x min/L from this patient\'s own data.',
      },
    },
    {
      key: 'if-a-patient-at-rest-has-a-systolic-diastolic-blood-pressure-44891a85',
      conceptKey: 'hemodynamics.flow-pressure-resistance-relationship',
      difficulty: 'Moderate',
      questionType: 'Not sittable as extracted.',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: "Option A's text is an OCR merge of two distinct choices ('18 mmHg x min/L' and 'b- 20 mmHg x min/L' run together), and option C is likewise a merge of a third and fourth choice ('22 mmHg x min/L' and 'd- 20 L/min x mmHg') — only 2 distinguishable letters survive for what was originally a 4-option item, below the platform's 4-to-5-option import contract. The identical TPR-calculation skill, with a clean 4-option set, is already kept as the sibling if-a-patient-at-rest-has-a-systolic-diastolic-blood-pressure-2d576eb0.",
    },
    {
      key: 'if-the-systolic-blood-pressure-is-120-mmhg-and-the-pulse-pre-be7f9f01',
      conceptKey: 'arterial-blood-pressure.systolic-diastolic-map-and-pulse-pressure',
      difficulty: 'Moderate',
      questionType: 'Not sittable as extracted.',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: "Already unanswerable at the bank's own editorial stage (answerConfidence: none, editorialExcluded: true): all 4 options are OCR-merged into 2 surviving letters ('A: 100 mmHgb- 90 mmHg', 'C: 80 mmHgd- 70 mmHg'), below the platform's 4-to-5-option import contract. The identical MAP-calculation skill is already kept via other questions in this leaf.",
    },
    {
      key: 'when-the-radius-of-the-resistance-vessels-is-increased-which-ec5ad2d0',
      conceptKey: 'hemodynamics.flow-pressure-resistance-relationship',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'State that increasing arteriolar (resistance vessel) radius raises capillary blood flow, via Poiseuille\'s law lowering resistance, as opposed to raising systolic or diastolic pressure, or blood viscosity, which it does not directly change.',
      explanations: {
        A: 'Increasing arteriolar radius, by lowering downstream resistance, tends to lower rather than raise systolic pressure at a fixed cardiac output.',
        B: 'Increasing arteriolar radius lowers, rather than raises, diastolic pressure at a fixed cardiac output, since it lowers total peripheral resistance.',
        C: 'Vessel radius does not determine blood viscosity, an independent physical property of the blood itself (set by haematocrit, plasma protein content and temperature).',
        D: 'Correct. Increasing the radius of the resistance vessels (arterioles) sharply lowers vascular resistance (inversely proportional to radius to the fourth power via Poiseuille\'s law), and since flow equals the pressure gradient divided by resistance, this directly raises blood flow to the downstream capillary bed for a given driving pressure.',
      },
    },
    {
      key: 'when-the-viscosity-of-blood-increases-which-of-the-following-98996fc6',
      conceptKey: 'hemodynamics.flow-pressure-resistance-relationship',
      difficulty: 'Moderate',
      questionType: 'Discrimination among near-miss options',
      learningObjective: 'State that increased blood viscosity raises resistance and so, at an unchanged cardiac output, raises mean arterial pressure, as opposed to changing resistance-vessel radius, capacitance-vessel radius or central venous pressure directly.',
      explanations: {
        A: 'Correct. Increased blood viscosity raises vascular resistance; since mean arterial pressure equals cardiac output times total peripheral resistance, a rise in resistance at an unchanged cardiac output raises mean arterial pressure.',
        B: 'Blood viscosity is a property of the blood itself, not of the vessel wall; it does not directly change the radius of the resistance vessels (arterioles), which is instead set by vasomotor tone.',
        C: 'Blood viscosity does not directly change the radius of the capacitance vessels (veins), which is set by venous tone, not by the physical properties of the blood flowing through them.',
        D: 'Central venous pressure is set by venous return and right heart function, not directly by blood viscosity.',
      },
    },
    {
      key: 'quantitatively-the-most-important-means-for-increasing-blood-ee55525a',
      conceptKey: 'local-blood-flow-regulation.myogenic-and-metabolic-autoregulation',
      difficulty: 'Moderate',
      questionType: 'Discrimination among near-miss options',
      learningObjective: 'State that a fall in local vascular resistance, driven by local metabolic vasodilator factors (active hyperaemia), is quantitatively the dominant mechanism increasing blood flow to an actively metabolizing tissue.',
      explanations: {
        A: 'A rise in overall arterial blood pressure is not the quantitatively dominant mechanism matching flow to one tissue\'s own rising metabolic demand — it would raise flow everywhere non-selectively, not target the active tissue specifically.',
        B: 'An increase in total peripheral resistance would, if anything, tend to LOWER flow overall (F = deltaP/R) — the opposite of what is needed to increase flow to a metabolically active tissue.',
        C: 'A decrease in stroke volume would lower cardiac output and, if anything, tend to lower flow generally, not selectively raise it to an actively metabolizing tissue.',
        D: 'Correct. Local metabolic vasodilation — a fall in local vascular resistance driven by tissue metabolites (CO2, H+, adenosine) and hypoxia accumulating during increased metabolic activity — is quantitatively the dominant mechanism matching blood flow to an actively metabolizing tissue\'s own needs, since flow is inversely proportional to resistance for any given driving pressure.',
      },
    },
    // run41 — bank-tagged "Basic Mechanisms of Circulatory Control", a
    // leaf-mismatch reroute onto this file's own already-claimed
    // local-blood-flow-regulation concept: both rows restate the same
    // vasodilator-metabolite list (CO2, H+/acidosis, adenosine) this
    // concept already teaches, no new search needed.
    {
      key: "increased-arteriolar-resistance-15i-metabolic-changes-that-p-a0ebb63c",
      conceptKey: 'local-blood-flow-regulation.myogenic-and-metabolic-autoregulation',
      difficulty: "Moderate",
      questionType: "Discrimination among near-miss options",
      learningObjective: "Identify decreased CO2 tension, not accumulation of lactate, acidosis or adenosine, as the one listed change that does NOT produce local vasodilation.",
      explanations: {
        A: "The exception, and the answer. A DECREASE in CO2 tension is not a vasodilator stimulus — it is a RISE in local CO2 that acts as one of the vasodilator metabolites of active hyperaemia; a fall moves in the opposite, vasoconstrictor-favouring direction.",
        B: "True, so not the exception. Lactate accumulation is one of the vasodilator metabolites released as local tissue metabolism rises, contributing to active hyperaemia.",
        C: "True, so not the exception. Acidosis (a local rise in H+) is one of the vasodilator metabolites of active hyperaemia, alongside CO2 and adenosine.",
        D: "True, so not the exception. Adenosine released from actively metabolizing (cardiac) muscle is one of the vasodilator metabolites driving local active hyperaemia.",
      },
    },
    {
      key: "metabolic-changes-that-produce-vasodilation-of-resistance-ve-d5fa92c6",
      conceptKey: 'local-blood-flow-regulation.myogenic-and-metabolic-autoregulation',
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Two independently defensible 'exception' answers survive in this option set: option A (decreased CO2 tension) and option C (alkalosis) are BOTH non-vasodilators by this pipeline's own local-blood-flow-regulation concept (vasodilator metabolites are CO2, H+/acidosis and adenosine — a fall in CO2 and a fall in H+/alkalosis both move away from, not toward, the vasodilator direction). The bank credits only option A, but nothing in the sourced concept singles out A over C as the one true exception; the row's sibling occurrence with the same stem (increased-arteriolar-resistance-15i...-a0ebb63c, kept above) pairs 'decreased CO2 tension' against ACIDOSIS specifically, which is unambiguously a genuine vasodilator and leaves A as the sole exception — the clean version of this same fact. Not authored here to avoid asserting a single correct 'except' answer where two are equally defensible.",
    },
    {
      // Excluded rather than kept: the bank extraction recovered only 3
      // distinguishable option letters (A, B, C) — option C's own text is
      // itself a merge of two original choices ("partial occlusion of a
      // blood vessel" and "decreased velocity of blood flow" run
      // together), below the platform's 4-to-5-option import contract
      // (medical:batch's own gate flags it: "3 options — the contract is
      // 4 to 5", caught on this commit's own gate run — an earlier draft
      // of this row wrongly split the merged C into separate C/D options
      // that do not exist in the bank's own data). The genuine turbulence-
      // determinants fact (partial occlusion promotes local turbulence by
      // raising local velocity) is taught cleanly instead via the sibling
      // question below.
      key: 'the-tendency-for-blood-flow-to-be-turbulent-is-increased-by-19fbd049',
      conceptKey: 'turbulent-blood-flow.reynolds-number-determinants',
      difficulty: 'Moderate',
      questionType: 'Not sittable as extracted.',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'The bank extraction recovered only 3 distinguishable options (A, B, C) — option C\'s own text is a merge of two original choices ("partial occlusion of a blood vessel" and "decreased velocity of blood flow" run together with corrupted characters between them) — below the platform\'s 4-to-5-option import contract. The genuine fact this row tests (partial vessel occlusion promotes local turbulence by raising local velocity) is already stated in this concept\'s own definition and taught via the sibling question the-tendency-of-blood-flow-to-be-turbulent-increases-when-th-3d56636e, so no unique teaching content is lost.',
    },
    {
      key: 'the-tendency-of-blood-flow-to-be-turbulent-increases-when-th-3d56636e',
      conceptKey: 'turbulent-blood-flow.reynolds-number-determinants',
      difficulty: 'Moderate',
      questionType: 'Discrimination among near-miss options',
      learningObjective: 'State that decreased blood viscosity increases the Reynolds number and so the tendency toward turbulent flow, as opposed to decreased velocity, which lowers it.',
      explanations: {
        A: 'A decrease in blood flow velocity LOWERS, not raises, the Reynolds number and so lowers the tendency toward turbulence.',
        B: 'Correct. The Reynolds number places viscosity in its denominator, so a decrease in blood viscosity RAISES the Reynolds number and so raises the tendency toward turbulent flow — the opposite direction from resistance, which rises (not falls) with viscosity.',
        C: 'Incorrect as a standalone option: option B genuinely raises turbulence tendency, so "none of the above" cannot be correct.',
        D: 'Incorrect: only option B (decreased viscosity) genuinely raises turbulence tendency among the listed options; option A (decreased velocity) lowers it, so "all of the above" cannot be correct.',
      },
    },
    {
      key: 'turbulent-blood-flow-has-the-following-criteria-it-is-silent-3f05fdaa',
      conceptKey: 'turbulent-blood-flow.reynolds-number-determinants',
      difficulty: 'Moderate',
      questionType: 'Not sittable as extracted.',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: "Already unanswerable at the bank's own editorial stage (answerConfidence: none, editorialExcluded: true): option A is missing (the row's own credited option, described only by the fragment 'It is silent flow' bled into the stem, which is itself backwards — turbulent flow is characteristically NOISY, not silent, the basis of vascular bruits), and no answer letter was recoverable. The genuine turbulence-determinants fact this leaf tests is already kept cleanly via the two sibling questions above.",
    },
    {
      key: 'the-pressure-in-a-blood-vessel-at-which-flow-ceases-is-calle-debc097f',
      conceptKey: 'critical-closing-pressure.definition-and-mechanism',
      difficulty: 'Moderate',
      questionType: 'Definition',
      learningObjective: 'Define critical closing pressure as the pressure at which a blood vessel collapses and flow ceases, as opposed to mean arterial, pulse or perfusion pressure.',
      explanations: {
        A: 'Mean arterial pressure is the average pressure across the cardiac cycle, not specifically the threshold pressure at which a vessel collapses and flow ceases.',
        B: 'Pulse pressure is the difference between systolic and diastolic pressure, an unrelated quantity to the pressure at which a vessel collapses.',
        C: 'Correct. Critical closing pressure is the specific transmural pressure below which a blood vessel with active vascular smooth-muscle tone collapses completely, so that flow abruptly ceases rather than tapering off gradually.',
        D: 'Perfusion pressure is the pressure gradient actually driving flow through an organ, not the specific threshold pressure at which a vessel collapses.',
      },
    },

    // --- Leaf-mismatch routing (bank-tagged "Pulmonary Compliance", genuinely
    // about vessel-wall compliance, not lung compliance) ---
    {
      key: 'concerning-compliance-of-large-arterial-blood-vessels-one-is-9eea479c',
      conceptKey: 'vascular-tree.pressure-and-compliance-distribution',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'Attribute the initial, more linear (compliant) part of a large artery\'s pressure-volume curve to stretching of its elastic (elastin) fibres, as opposed to its collagen fibres.',
      explanations: {
        A: 'Correct. At lower distending pressures, an artery\'s more easily stretched elastin fibres dominate its wall behaviour, producing the initial, more linear (compliant) portion of the pressure-volume curve.',
        B: 'The steeper, less compliant part of the curve, reached at higher pressures, is due to recruitment of the stiffer collagen fibres, not the elastic fibres, which already dominate the earlier, more compliant portion.',
        D: 'Stretching the collagen fibres makes the vessel wall progressively stiffer, lowering (not raising) compliance, since collagen is far less distensible than elastin — the opposite of what this option claims.',
        C: 'Not a true/false statement about the mechanism this question tests; the credited answer names elastin fibre stretching as the basis of the artery\'s initial compliant behaviour.',
      },
    },
    {
      key: 'which-one-can-increase-the-compliance-of-blood-vessels-3a01102d',
      conceptKey: 'vascular-tree.pressure-and-compliance-distribution',
      difficulty: 'Moderate',
      questionType: 'Recall',
      learningObjective: 'Identify oestrogen, among sympathetic activation, ageing and atherosclerosis, as the one factor that raises rather than lowers vascular compliance.',
      explanations: {
        A: 'Sympathetic activation contracts vascular smooth muscle (vasoconstriction), which stiffens the vessel wall and lowers, not raises, its compliance.',
        B: 'Correct. Oestrogen relaxes and dilates the vascular wall, and is associated with genuinely higher vascular compliance — part of why pre-menopausal women typically have more compliant vessels and lower cardiovascular risk than men or post-menopausal women.',
        C: 'Ageing is classically associated with progressive arterial stiffening (falling elastin, rising collagen content), lowering, not raising, compliance.',
        D: 'Atherosclerosis stiffens the vessel wall with plaque deposition, lowering, not raising, compliance.',
      },
    },

    // --- run43: 7 kept + 1 excluded of the Vascular Function cluster's 12 remaining ---
    {
      key: 'concerning-laminar-blood-flow-one-is-incorrect-eb00a7cf',
      conceptKey: 'turbulent-blood-flow.reynolds-number-determinants',
      difficulty: 'Moderate',
      questionType: 'Recall of a false statement',
      learningObjective: 'State that laminar flow is maintained up to a Reynolds number of roughly 2000, not as low as 400, identifying the understated threshold as the false statement.',
      explanations: {
        A: 'True of laminar flow, so not the exception. Laminar flow genuinely occurs as concentric, parallel layers (laminae) of fluid moving smoothly together.',
        B: 'True of laminar flow, so not the exception. Laminar flow is characteristically silent, unlike the audible turbulent flow that produces murmurs and bruits.',
        C: 'The exception, and the answer. Laminar flow is maintained up to a Reynolds number of roughly 2000, not as low as 400 — stating 400 as the threshold badly understates how far the Reynolds number must rise before flow tips into turbulence.',
        D: 'True, so not the exception. A Reynolds number above roughly 2000 does mark the standard threshold for the transition toward turbulent flow.',
      },
    },
    {
      key: 'turbulence-is-almost-always-present-when-reynolds-number-is-afc8cefe',
      conceptKey: 'turbulent-blood-flow.reynolds-number-determinants',
      difficulty: 'Moderate',
      questionType: 'Recall',
      learningObjective: 'State that turbulent flow is almost always present once the Reynolds number rises above approximately 2000.',
      explanations: {
        A: 'Correct. Standard cardiovascular physiology teaching states that once the Reynolds number rises above approximately 2000, turbulent flow will usually (almost always) occur, even in an otherwise straight, smooth vessel — the standard, most commonly cited figure for this threshold.',
        B: '2500 is not the standard, most commonly cited threshold figure for this specific teaching point.',
        C: '3000 is not the standard, most commonly cited threshold figure for this specific teaching point.',
        D: '3500 is not the standard, most commonly cited threshold figure for this specific teaching point.',
      },
    },
    {
      key: 'which-of-the-following-describes-the-pulse-pressure-212b2ae7',
      conceptKey: 'arterial-blood-pressure.systolic-diastolic-map-and-pulse-pressure',
      difficulty: 'Moderate',
      questionType: 'Recall',
      learningObjective: 'State that pulse pressure is determined by stroke volume (for a given arterial compliance), not by arterial resistance or by naming the highest or lowest arterial pressure directly.',
      explanations: {
        A: "Correct. Pulse pressure -- the difference between systolic and diastolic arterial pressure -- is directly determined by stroke volume for a given arterial compliance: a larger stroke volume ejects more blood into the arterial tree per beat, producing a larger swing in pressure between systole and diastole.",
        B: 'Pulse pressure is most directly governed by stroke volume and arterial compliance; peripheral arterial resistance primarily determines mean arterial pressure rather than being the main driver of pulse pressure changes.',
        C: 'The highest pressure measured in the arteries is the systolic pressure itself, not the pulse pressure, which is instead the difference between systolic and diastolic pressure.',
        D: 'The lowest pressure measured in the arteries is the diastolic pressure itself, not the pulse pressure.',
      },
    },
    {
      key: 'atrial-natriuretic-peptide-6fd6b3d3',
      conceptKey: 'raas-vs-anp.opposing-blood-pressure-and-sodium-hormones',
      difficulty: 'Moderate',
      questionType: 'Recall',
      learningObjective: "State that ANP secretion is increased by atrial stretch from a rising central blood volume, such as during water immersion up to the neck.",
      explanations: {
        A: 'A decreased, not increased, ECF volume removes the atrial-stretch stimulus for ANP secretion — the opposite of the direction that triggers its release.',
        B: 'Correct. Immersion in water up to the neck shifts peripheral venous blood centrally, raising central blood volume and stretching the atrial wall — exactly the stimulus that raises ANP secretion.',
        C: 'ANP promotes vasodilation, not contraction, of vascular smooth muscle — part of how it lowers, rather than raises, blood pressure.',
        D: 'ANP lowers, not raises, arterial blood pressure, via vasodilation and increased renal sodium excretion — the physiological opposite of what this option states.',
      },
    },
    {
      key: 'which-of-the-following-changes-would-not-occur-following-inh-ff65be24',
      conceptKey: 'raas-vs-anp.opposing-blood-pressure-and-sodium-hormones',
      difficulty: 'Hard',
      questionType: 'Discrimination among near-miss options',
      learningObjective: "State that ACE inhibition raises, rather than lowers, renin secretion, by removing angiotensin II's own negative feedback on renin release.",
      explanations: {
        A: "Correct, and the exception the question asks for: renin secretion would NOT fall following ACE inhibition -- it would RISE, because angiotensin II normally suppresses renin secretion by negative feedback, and removing angiotensin II (by blocking the enzyme that makes it) removes that brake.",
        B: 'Aldosterone level genuinely would fall following ACE inhibition, since aldosterone secretion depends on angiotensin II, which ACE inhibition lowers — this change would occur, so it is not the exception.',
        C: 'Proximal tubular sodium reabsorption genuinely would decrease following ACE inhibition, since it is partly driven by angiotensin II and the aldosterone it stimulates, both of which fall — this change would occur, so it is not the exception.',
        D: 'Peripheral resistance genuinely would decrease following ACE inhibition, since angiotensin II is a direct vasoconstrictor and ACE inhibition lowers angiotensin II — this change would occur, so it is not the exception.',
      },
    },
    {
      // kasr-104-author-run46: revisited. Run 45 excluded this for "no PDF
      // or cached page-text access" — false; the department physiology book
      // is cached (src_a11a7faed67c95e2d636, 160 pages) and was grepped
      // directly this run for "cross-sectional"/"cross sectional": 0 hits
      // across all 160 pages. The claim stays genuinely unsupported.
      key: 'greatest-total-cross-sectional-area-a-aorta-1242be79',
      conceptKey: 'vascular-tree.pressure-and-compliance-distribution',
      difficulty: 'Hard',
      questionType: 'Not sittable as extracted.',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: "Total vascular cross-sectional area by vessel type (greatest at the capillary level despite each capillary's own tiny bore) is a standard hemodynamics fact but is not stated by this leaf's own sourced concepts, which cover the flow/pressure/resistance relationship and the vascular tree's pressure/compliance distribution without this specific cross-sectional-area claim. Re-checked directly against the department physiology book (src_a11a7faed67c95e2d636, all 160 cached pages): 0 hits for \"cross-sectional\" or \"cross sectional\" anywhere in the book — the claim is absent from the module's own source, not merely unretrieved. The row's own recovery method (fuzzy-token-overlap against a different exam book, options repaired from a 2-option extraction) is also this bank's lowest-confidence recovery tier.",
    },
    {
      // Bank-tagged leaf: "Vascular Function"; genuinely this file's own
      // local-blood-flow-regulation content, but excluded rather than kept
      // — see excludeReason.
      key: 'which-combination-of-the-following-local-factors-leads-to-ar-c8779f94',
      conceptKey: 'local-blood-flow-regulation.myogenic-and-metabolic-autoregulation',
      difficulty: 'Moderate',
      questionType: 'Not sittable as extracted.',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: "The extracted option set is internally inconsistent and shows clear OCR corruption (option A reads 'increase in Oz' — a garbled '2' — and the credited option C reads 'Decrease in CO', almost certainly a mis-scan of 'O2' given the question's own topic), and the credited answer's third clause, 'decrease in K+', contradicts standard local-vasodilator-factor teaching (active tissue accumulates, not loses, extracellular K+, and a local RISE in K+ is the textbook vasodilator factor, not a fall). This source (DPT BOOK Physio MCQ [104][2022].pdf) is not in the pagetext cache to render by eye and check which word the corruption altered. Rather than teach a physiologically backwards claim on the strength of a low meanOptionRatio (0.827) fuzzy-OCR match, this row is left unauthored per the law of priority; the correct, uncorrupted version of this fact (decreased O2, increased CO2/H+/lactate/K+/adenosine/osmolarity all cause local vasodilation) is not otherwise untaught in this leaf.",
    },
  ],
}
