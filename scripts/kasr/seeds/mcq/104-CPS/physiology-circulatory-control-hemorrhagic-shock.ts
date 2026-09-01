import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: "Physiology Cardiovascular System — Hemorrhagic Shock Compensation",
  modulePath: "104 CPS > Physiology > Cardiovascular System > Basic Mechanisms of Circulatory Control",
  articleId: "ART-104-PHY-NERVOUS-AND-CHEMORECEPTOR-CONTROL",

  concepts: [
    {
      key: "hemorrhagic-shock.rapid-compensatory-hormone-response",
      label: "The rapid humoral response to hemorrhagic shock raises catecholamines, angiotensin II and vasopressin, not atrial natriuretic peptide, which needs the atrial stretch that hypovolaemia removes",
      definition: "Hemorrhage lowers arterial blood pressure and stimulates rapid neural and humoral compensatory mechanisms. The humoral arm raises three hormones: catecholamines (adrenal medulla and sympathetic terminals, stimulating the brain-stem reticular formation and driving respiration and restlessness), angiotensin II (from increased renin secretion, causing vasoconstriction, thirst and aldosterone secretion), and vasopressin (from decreased discharge of atrial low-pressure receptors, causing renal water retention). Atrial natriuretic peptide runs the other way: it is secreted when increased extracellular fluid volume stretches the atrial muscle, so it acts to lower blood pressure by increasing renal sodium excretion. Hemorrhage decreases venous return and atrial filling, which removes the stretch stimulus for ANP rather than providing one — its secretion does not rise as part of the rapid compensatory response.",
      objective: "Name the three hormones whose secretion rises as part of the rapid humoral compensation for hemorrhagic shock, and explain why atrial natriuretic peptide is not a fourth.",
      pitfall: "Assuming every hormone with a role in blood-pressure regulation rises together in hypovolaemia. ANP is stretch-triggered — it needs a full, distended atrium — so a state that shrinks venous return and atrial filling silences it rather than raising it, the opposite direction to catecholamines, angiotensin II and vasopressin.",
      subject: "cvs",
      primary: "DIS-PHY-T02",
      secondary: [],
      modulePath: "104 CPS > Physiology > Cardiovascular System > Basic Mechanisms of Circulatory Control",
      type: "mechanism",
      aliases: ["Compensatory response to hemorrhage", "Rapid reactions to hemorrhagic shock"],
    },
    {
      key: "atria.functions-beyond-pumping",
      label: "Beyond pumping blood into the ventricles, the atria act as venous reservoirs during ventricular systole, contribute roughly 30% of ventricular filling through atrial systole, and carry stretch receptors that trigger cardiac reflexes",
      definition: "The atria have three functions beyond acting as a simple entry chamber. First, while the AV valves are shut throughout ventricular systole, venous blood returning from the body has nowhere to go but the atria, which act as a reservoir that accumulates it until the AV valves reopen. Second, atrial systole is an active top-up of ventricular filling, normally contributing roughly the last 30% of end-diastolic volume on top of the passive filling that came before it. Third, the atria — especially the right atrium — carry stretch (low-pressure) receptors that trigger cardiac reflexes, including reflex tachycardia when atrial filling rises (the Bainbridge reflex) and secretion of atrial natriuretic peptide when atrial stretch is sustained.",
      objective: "State the three functions of the atria beyond receiving venous blood: acting as a reservoir during ventricular systole, contributing roughly 30% of ventricular filling via atrial systole, and carrying stretch receptors for cardiac reflexes.",
      pitfall: "Treating the atria as passive holding chambers with no active role. Atrial systole is an active contraction contributing a real fraction of ventricular filling, and atrial stretch receptors actively drive reflexes rather than merely sensing pressure for no functional purpose.",
      subject: "cvs",
      primary: "DIS-PHY-T02",
      secondary: [],
      modulePath: "104 CPS > Physiology > Cardiovascular System > Basic Mechanisms of Circulatory Control",
      type: "mechanism",
      aliases: ["Functions of the atria", "Atrial reservoir function", "Atrial stretch receptors"],
    },
    {
      key: "venous-return.determinants-and-equation",
      label: "Venous return is driven by the pressure gradient from mean systemic filling pressure to right atrial pressure and opposed by resistance to venous flow, so increased resistance to venous blood — not increased cardiac output, filling pressure or blood volume — is what lowers it",
      definition: "Venous return is governed by venous return = (mean systemic filling pressure - right atrial pressure) / resistance to venous return. Anything that raises mean systemic filling pressure (for example, an increase in blood volume, or increased venous tone) raises venous return by widening the driving pressure gradient. An increase in cardiac output likewise raises venous return, because a more effectively emptying heart keeps right atrial pressure low, widening the same gradient from the other end. An increase in resistance to venous blood flow works in the opposite direction: for the same pressure gradient, higher resistance in the venous pathway back to the heart reduces the flow that gradient can drive, so it is resistance — not the gradient's two pressures — whose increase lowers venous return.",
      objective: "State the venous return equation (driving pressure gradient over resistance) and identify increased resistance to venous flow, not increased cardiac output, filling pressure or blood volume, as what lowers venous return.",
      pitfall: "Assuming every listed cardiovascular variable moves venous return the same direction when increased. Cardiac output, mean systemic filling pressure and blood volume all raise venous return when increased — only a rise in resistance to venous flow lowers it, because resistance sits in the denominator of the venous return relationship rather than in the pressure gradient that drives it.",
      subject: "cvs",
      primary: "DIS-PHY-T02",
      secondary: [],
      modulePath: "104 CPS > Physiology > Cardiovascular System > Basic Mechanisms of Circulatory Control",
      type: "mechanism",
      aliases: ["Venous return equation", "Determinants of venous return"],
    },
    {
      key: "venous-return.exercise-enhancing-mechanisms",
      label: "Exercise enhances venous return through the skeletal-muscle pump, the respiratory pump from deeper breathing, and sympathetically driven venoconstriction — not through increased arteriolar resistance, which would oppose it",
      definition: "During dynamic exercise, venous return rises through three cooperating mechanisms. The skeletal-muscle pump: rhythmic contraction of exercising muscles squeezes the veins running through them, and one-way venous valves direct that squeezed blood back toward the heart. The respiratory pump: the deeper, faster breathing of exercise produces larger swings in intrathoracic pressure, drawing more venous blood into the chest with each inspiration. Sympathetically driven venoconstriction: increased sympathetic outflow during exercise constricts the veins, which are highly compliant capacitance vessels, mobilising blood that would otherwise pool there and redirecting it toward the heart. Arteriolar resistance moves in the opposite direction during exercise — it falls in active skeletal muscle to allow increased flow — and a rise in arteriolar resistance would if anything oppose, not enhance, venous return.",
      objective: "Name the skeletal-muscle pump, the respiratory pump and venoconstriction as the three mechanisms enhancing venous return during exercise, and state that increased arteriolar resistance is not one of them.",
      pitfall: "Assuming that anything mobilising the cardiovascular system harder during exercise must enhance venous return. Arteriolar resistance actually falls, not rises, in exercising muscle, since vasodilation there is what allows the required increase in local blood flow.",
      subject: "cvs",
      primary: "DIS-PHY-T02",
      secondary: [],
      modulePath: "104 CPS > Physiology > Cardiovascular System > Basic Mechanisms of Circulatory Control",
      type: "mechanism",
      aliases: ["Venous return during exercise", "Skeletal muscle pump", "Respiratory pump"],
    },
    {
      key: "athletic-heart.chronic-training-adaptations",
      label: "Chronic endurance training enlarges the heart and raises resting stroke volume while lowering resting heart rate (training bradycardia), leaving resting cardiac output essentially unchanged",
      definition: "Sustained endurance training produces a set of chronic cardiovascular adaptations known collectively as the athletic heart. The heart itself enlarges (physiological hypertrophy with chamber dilation), which lets it fill with and eject a larger volume each beat — a higher resting stroke volume than an untrained person's. At the same time, increased resting vagal tone lowers resting heart rate (training bradycardia). Because stroke volume rises while heart rate falls, resting cardiac output in a trained athlete is essentially the same as in an untrained person; what has changed is how that same output is achieved — with a slower, more powerful, more efficient heartbeat.",
      objective: "State that endurance training enlarges the heart and raises resting stroke volume while lowering resting heart rate, so that resting cardiac output is little changed.",
      pitfall: "Assuming a trained athlete's resting cardiac output must be higher because their heart clearly does more work overall. At rest, the higher stroke volume and lower heart rate largely offset each other, so it is the heart's efficiency and its capacity during exertion — not its resting output — that training chiefly changes.",
      subject: "cvs",
      primary: "DIS-PHY-T02",
      secondary: [],
      modulePath: "104 CPS > Physiology > Cardiovascular System > Basic Mechanisms of Circulatory Control",
      type: "mechanism",
      aliases: ["Athletic heart syndrome", "Training bradycardia", "Effects of endurance training on the heart"],
    },
    {
      // Sparse reuse, not a fresh mint: find-existing.mjs "carotid sinus
      // baroreceptor" / "baroreceptor reflex" surfaced a hand-authored,
      // pinned record (CON-CVS-C3E60AC7A9EDB1, canonical_key
      // "arterial-baroreceptor-reflex.response-to-a-rise-and-a-fall-in-
      // arterial-pressure") already sitting in 104-CPS-concepts.md (the
      // written-paper pipeline's own generated concept file, not
      // GENERATED_BY this MCQ pipeline, so existingConceptIds() for module
      // "104 CPS" does see it — the same reuse class documented repeatedly
      // elsewhere in this branch). Its own module_subject there is already
      // "104 CPS > Physiology > Cardiovascular System > Basic Mechanisms
      // of Circulatory Control" — this exact leaf — and its own
      // article_ids names ART-104-PHY-VENOUS-RETURN-AND-BAROREFLEX (a
      // different, real, live article from this file's own
      // ART-104-PHY-NERVOUS-AND-CHEMORECEPTOR-CONTROL; sparse reuse leaves
      // the pinned record's own article_ids untouched, so this is not a
      // mispin). Declaring the same key here resolves to
      // CON-CVS-C3E60AC7A9EDB1 and emits a sparse update only; every other
      // field below is inert for the build, restated close to the pinned
      // record's own wording so a reader here does not have to open the
      // concept file to know what is being reused.
      key: "arterial-baroreceptor-reflex.response-to-a-rise-and-a-fall-in-arterial-pressure",
      label: "Baroreceptor discharge rises and falls with arterial pressure and, through the nucleus of the tractus solitarius, opposes whichever change caused it",
      definition: "Arterial baroreceptors are stretch receptors in the carotid sinus and the aortic arch, reporting to the nucleus of the tractus solitarius through the carotid sinus (Hering's) nerve and the aortic nerve. When arterial pressure rises their discharge increases: the vasomotor area is inhibited more, so sympathetic drive to heart and vessels falls, giving a lower heart rate, stroke volume and cardiac output with vasodilatation; and the cardiac inhibitory area is excited more, so vagal tone rises and the rate falls further. When arterial pressure falls the discharge decreases and every one of those changes reverses, raising the pressure back towards normal.",
      objective: "State where the arterial baroreceptors sit, which nerves they use, and what each limb of the reflex does when arterial pressure rises and when it falls.",
      pitfall: "Answering with the atrial volume receptors. Those are low-pressure receptors whose reflex is about volume, not arterial pressure.",
      subject: "cvs",
      primary: "DIS-PHY-T02",
      secondary: ["SYS-CVS-T01-S02-M03"],
      modulePath: "104 CPS > Physiology > Cardiovascular System > Basic Mechanisms of Circulatory Control",
      type: "mechanism",
      aliases: ["Baroreceptor reflex", "Carotid sinus reflex", "Buffer reflex"],
      conflicts: [
        "No conflicting record found; find-existing.mjs returned this concept as the only hit for 'carotid sinus baroreceptor' and 'baroreceptor reflex', confirming reuse rather than a fresh mint.",
      ],
    },
  ],

  questions: [
    {
      key: "asa-rapid-compensatory-reaction-to-hemorrhagic-shock-the-sec-e85732b4",
      conceptKey: "hemorrhagic-shock.rapid-compensatory-hormone-response",
      difficulty: "Moderate",
      questionType: "Mechanism",
      learningObjective: "Name catecholamines, angiotensin II and vasopressin as the hormones the rapid compensatory response to hemorrhage raises, and explain why atrial natriuretic peptide is not a fourth.",
      explanations: {
        A: "True, so not the exception. Increased catecholamine secretion — from the adrenal medulla and sympathetic terminals — is among the rapid humoral compensatory reactions to hemorrhage.",
        B: "The exception, and the answer. Atrial natriuretic peptide is secreted when atrial stretch rises with an expanded extracellular fluid volume; hemorrhage decreases venous return and atrial filling, removing that stretch stimulus rather than providing it, so its secretion is not part of the listed rapid response. A common trap: assuming every hormone with a role in blood-pressure regulation rises together in hypovolaemia.",
        C: "True, so not the exception. Increased angiotensin II, from increased renin secretion, is among the rapid humoral compensatory reactions, helping correct shock by vasoconstriction, thirst and aldosterone secretion.",
        D: "True, so not the exception. Increased vasopressin secretion, driven by decreased discharge from atrial low-pressure receptors, is among the rapid humoral compensatory reactions, retaining water to restore extracellular fluid volume.",
      },
    },
    {
      key: "functions-of-atria-e364bc88",
      conceptKey: "atria.functions-beyond-pumping",
      difficulty: "Moderate",
      questionType: "Recall of a true statement",
      learningObjective: "State the three functions of the atria: reservoir during ventricular systole, roughly 30% top-up of ventricular filling via atrial systole, and cardiac-reflex stretch receptors.",
      explanations: {
        A: "True, so not the sole answer alone. While the AV valves are shut throughout ventricular systole, venous blood returning from the body accumulates in the atria, which act as a reservoir until the AV valves reopen.",
        B: "True, so not the sole answer alone. Atrial systole is an active contraction that tops up ventricular filling, normally contributing roughly the last 30% of end-diastolic volume.",
        C: "True, so not the sole answer alone. The atria, especially the right atrium, carry stretch (low-pressure) receptors that trigger cardiac reflexes such as reflex tachycardia with rising atrial filling.",
        D: "Correct: all three of the above are genuine functions of the atria beyond simply receiving venous blood, so 'all of the above' is the answer.",
      },
    },
    {
      key: "increases-in-which-of-the-following-variables-would-be-expec-6a43febb",
      conceptKey: "venous-return.determinants-and-equation",
      difficulty: "Moderate",
      questionType: "Mechanism",
      learningObjective: "Identify increased resistance to venous blood flow as the variable whose rise decreases venous return, unlike cardiac output, filling pressure or blood volume.",
      explanations: {
        A: "Correct: venous return equals the pressure gradient from mean systemic filling pressure to right atrial pressure divided by resistance to venous flow, so an increase in that resistance, for the same pressure gradient, decreases venous return.",
        B: "An increase in cardiac output keeps right atrial pressure low by emptying the heart more effectively, which widens the gradient driving venous return and so increases it, not decreases it.",
        C: "An increase in mean systemic filling pressure widens the pressure gradient driving venous return and so increases it, not decreases it.",
        D: "An increase in blood volume raises mean systemic filling pressure, widening the gradient driving venous return and so increasing it, not decreasing it.",
      },
    },
    {
      key: "venous-return-is-enhanced-during-exercise-by-all-of-the-foll-1f815e8f",
      conceptKey: "venous-return.exercise-enhancing-mechanisms",
      difficulty: "Moderate",
      questionType: "Recall of a false statement",
      learningObjective: "Identify increased arteriolar resistance as not a mechanism enhancing venous return during exercise, unlike the respiratory pump, the skeletal-muscle pump and venoconstriction.",
      explanations: {
        A: "Increased depth of respiration genuinely enhances venous return during exercise, so it is not the exception: larger swings in intrathoracic pressure draw more venous blood into the chest with each breath.",
        B: "The pumping action of skeletal muscles genuinely enhances venous return during exercise, so it is not the exception: rhythmic muscle contraction squeezes veins, and one-way valves direct the blood toward the heart.",
        C: "Venoconstriction genuinely enhances venous return during exercise, so it is not the exception: sympathetically driven constriction of the compliant venous capacitance vessels mobilises pooled blood toward the heart.",
        D: "The exception, and the answer: arteriolar resistance falls, not rises, in exercising muscle to allow the required increase in local blood flow, so an increase in arteriolar resistance is not a mechanism that enhances venous return during exercise.",
      },
    },
    {
      key: "when-compared-to-normal-subject-trained-athletes-have-a-a-sm-70c1bd30",
      conceptKey: "athletic-heart.chronic-training-adaptations",
      difficulty: "Moderate",
      questionType: "Recall of a true statement",
      learningObjective: "State that endurance-trained athletes develop a larger heart compared with untrained people, alongside a higher resting stroke volume and lower resting heart rate.",
      explanations: {
        A: "Trained athletes have a larger, not smaller, resting stroke volume — physiological cardiac hypertrophy lets the heart fill with and eject more blood per beat.",
        B: "Trained athletes have a slower, not faster, resting heart rate (training bradycardia), driven by increased resting vagal tone.",
        C: "Correct: chronic endurance training produces physiological cardiac hypertrophy, giving trained athletes a larger heart than untrained people, alongside the higher resting stroke volume and training bradycardia that go with it.",
        D: "Endurance training increases, not decreases, the number of mitochondria in skeletal muscle fibres, improving their capacity for aerobic metabolism.",
      },
    },
    {
      key: "during-dynamic-muscular-exercise-all-of-the-following-are-in-302ff150",
      conceptKey: "venous-return.exercise-enhancing-mechanisms",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Option B's text is an OCR merge of two distinct choices ('Venous return' and 'Cardiac output' run together with garbled characters between them), losing the boundary between what should be two separate options, and option C is missing entirely. A fifth 'option' is bleed-over text from an unrelated following question about non-pitting edema, not a real choice. Only 2 clean, distinct options (A and D) survive, well below the platform's 4-to-5-option import contract.",
    },
    {
      key: "function-of-av-shunt-170d9618",
      conceptKey: "venous-return.exercise-enhancing-mechanisms",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "The keyed answer is 'All of the above', which requires option A ('regulate body temperature by skin dilatation in Cold') to be true — but cutaneous arteriovenous anastomoses constrict, not dilate, in cold to conserve heat, and dilate in heat to dissipate it, the opposite of what option A as extracted states. Authoring this as a direct, correct statement would mean teaching a backwards mechanism to match the keyed answer; not sittable without a source resolving whether the option text itself is a transcription error (e.g. a dropped 'and Heat').",
    },
    {
      key: "inhibition-of-vasomotor-tone-72-stimulation-of-cardiac-inhib-11e2a5a5",
      conceptKey: "venous-return.determinants-and-equation",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "The stem is corrupted by multiple merged fragments: a stray leading clause ('Inhibition of vasomotor tone.'), a stray question-number artifact ('72,'), and option A's text ('Arteriolar constriction') bled into the stem rather than captured as a selectable option — leaving only options B-E selectable and the stem itself unclear about what is actually being asked.",
    },
    {
      key: "low-resistance-shock-is-characterized-by-which-of-the-follow-476fb9a1",
      conceptKey: "hemorrhagic-shock.rapid-compensatory-hormone-response",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "The keyed correct option (A) is truncated mid-sentence by OCR ('Occurs when the size of the vascular system is increased by' with no completion), so the credited answer's own claim cannot be read in full and cannot be taught as a direct, complete statement.",
    },
    {
      key: "mean-systemic-filling-pressure-is-the-pressure-present-all-o-779857ff",
      conceptKey: "venous-return.determinants-and-equation",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "The stem itself is an incomplete sentence ('...is the pressure present all over the systemic circulation when' with no completion), and two of the four options (C and D) carry trailing OCR debris that obscures their exact intended wording — together these leave neither the question being asked nor two of its answer choices reliably readable.",
    },
    {
      key: "venous-return-is-enhanced-during-exerciseby-eb2e3ff5",
      conceptKey: "venous-return.exercise-enhancing-mechanisms",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Only 3 options survived extraction (A, B, C) — the fourth choice is missing entirely, below the platform's 4-to-5-option import contract. The same fact, with all 4 options intact, is already established by this leaf's own venous-return-is-enhanced-during-exercise-by-all-of-the-foll-1f815e8f question.",
    },
    {
      key: "which-of-the-following-factors-helps-venous-return-2fb446fd",
      conceptKey: "venous-return.determinants-and-equation",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Option C is missing entirely, and the extracted 'option E' is bleed-over text from an unrelated following question about mean systemic filling pressure, not a genuine fifth choice — leaving only 3 real options (A, B, D) — and no answer was extracted or independently recoverable.",
    },
    {
      key: "under-resting-conditions-a-marathon-runner-compared-to-untra-bf0effd1",
      conceptKey: "athletic-heart.chronic-training-adaptations",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Only 3 options survived extraction (A, B, D) — the fourth (C) is missing entirely, below the platform's 4-to-5-option import contract. The same fact — that trained athletes have a higher resting stroke volume — is already established by this leaf's own when-compared-to-normal-subject-trained-athletes-have-a-a-sm-70c1bd30 question.",
    },
    {
      // Leaf-mismatch reroute: bank-tagged "Mechanical Properties of
      // Cardiac Muscle", genuinely this leaf's own baroreceptor-reflex
      // content — routed onto the sparse-reused concept above.
      key: "a-reduction-of-carotid-sinus-pressure-would-cause-a-decrease-8602bea7",
      conceptKey: "arterial-baroreceptor-reflex.response-to-a-rise-and-a-fall-in-arterial-pressure",
      difficulty: "Moderate",
      questionType: "Discrimination among near-miss options",
      learningObjective: "State that a fall in carotid sinus pressure lowers baroreceptor discharge, raising sympathetic outflow, so that heart rate, contractility and total peripheral resistance all RISE while venous capacitance is the one variable among these that FALLS, through sympathetically driven venoconstriction.",
      explanations: {
        A: "Backwards. A reduction in carotid sinus pressure lowers baroreceptor discharge, which raises sympathetic outflow to the heart — heart rate RISES, it does not fall.",
        B: "Backwards. The same rise in sympathetic outflow raises myocardial contractility (positive inotropy) — it does not fall.",
        C: "Backwards. Increased sympathetic outflow constricts arterioles throughout the body, RAISING total peripheral resistance, not lowering it.",
        D: "Correct. The same increased sympathetic outflow also constricts the veins — highly compliant capacitance vessels — which REDUCES venous capacitance (the volume the venous system can hold at a given pressure), mobilising blood toward the heart. Among the four listed variables, venous capacitance is the one that genuinely decreases; heart rate, contractility and total peripheral resistance all rise instead.",
      },
    },
    {
      // Leaf-mismatch reroute: bank-tagged "Mechanical Properties of
      // Cardiac Muscle", genuinely this leaf's own compensated-
      // hemorrhagic-shock content — routed onto the same baroreceptor-
      // reflex concept as the row above, since the fall in arterial
      // pressure that triggers hemorrhagic shock's compensatory response
      // is the identical reflex arc. Option D's own fact — that venous
      // pressure falls in hemorrhagic shock — reflects the primary volume
      // loss itself rather than a further consequence of the reflex the
      // pinned concept states; this is standard, undisputed hemodynamics
      // (a falling blood volume lowers venous pressure directly) rather
      // than a claim requiring its own separate source, and is disclosed
      // here rather than presented as though the reused concept states it
      // explicitly.
      key: "during-hemorrhagic-shock-the-patient-exhibits-a-decreased-he-5f1a1828",
      conceptKey: "arterial-baroreceptor-reflex.response-to-a-rise-and-a-fall-in-arterial-pressure",
      difficulty: "Moderate",
      questionType: "Discrimination among near-miss options",
      learningObjective: "State that in compensated hemorrhagic shock, the baroreceptor reflex to falling arterial pressure raises heart rate, contractility and total peripheral resistance, while venous pressure itself falls as a direct consequence of the underlying blood-volume loss.",
      explanations: {
        A: "Backwards. Hemorrhage lowers arterial pressure, which lowers baroreceptor discharge and raises sympathetic outflow to the heart — heart rate RISES (reflex tachycardia), it does not fall.",
        B: "Backwards. The same rise in sympathetic outflow raises total peripheral resistance, through arteriolar vasoconstriction — it does not fall.",
        C: "Backwards. The same rise in sympathetic outflow raises myocardial contractility (positive inotropy) — it does not fall.",
        D: "Correct. Venous pressure falls in hemorrhagic shock, reflecting the direct loss of circulating blood volume itself — distinct from the baroreceptor reflex's own compensatory changes (which raise heart rate, contractility and total peripheral resistance, all in the opposite direction from options A-C above).",
      },
    },
    {
      // Bookkeeping exclude: already unanswerable at the bank's own
      // editorial stage (answer: null, editorialExcluded: true). A
      // duplicate-occurrence, corrupted copy of the row kept above
      // (during-hemorrhagic-shock-the-patient-exhibits-a-decreased-he-
      // 5f1a1828): all four of its own surviving options are inconsistent
      // with the compensatory response the reused baroreceptor-reflex
      // concept states. Recorded here for a complete accounting of this
      // leaf.
      key: "during-hemorrhagic-shock-the-patient-exhibits-4d2e0a8d",
      conceptKey: "arterial-baroreceptor-reflex.response-to-a-rise-and-a-fall-in-arterial-pressure",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Already unanswerable at the bank's own editorial stage (answerConfidence: none, editorialExcluded: true): all four surviving options are inconsistent with the well-established compensatory response to hemorrhagic shock (heart rate, total peripheral resistance and myocardial contractility all INCREASE via sympathetic activation, none decrease), and the fourth option ('peaks in early diastole') is an unrelated fragment about coronary flow timing rather than a genuine systemic shock finding. The clean, complete sibling copy of this question is already kept as during-hemorrhagic-shock-the-patient-exhibits-a-decreased-he-5f1a1828.",
    },
  ],
}
