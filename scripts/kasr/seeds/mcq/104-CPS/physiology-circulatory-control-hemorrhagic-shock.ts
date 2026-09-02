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
    {
      // Sparse reuse, not a fresh mint: canonical_key already pinned in
      // 104-CPS-physiology-concepts.md as CON-CVS-131F06D46D3B84, this
      // exact leaf's own module_subject, pinned to the real, live
      // ART-104-PHY-NERVOUS-AND-CHEMORECEPTOR-CONTROL article (which this
      // file does not itself use as its own articleId, but sparse reuse
      // leaves the pinned record's own article_ids untouched).
      key: "peripheral-chemoreceptor-reflex.carotid-and-aortic-bodies",
      label: "The peripheral chemoreceptor reflex, driven by low arterial PO2 in the carotid and aortic bodies, raises sympathetic discharge to correct a markedly low arterial pressure",
      definition: "Peripheral chemoreceptors sit in the carotid and aortic bodies, carried to the medulla by the carotid sinus (glossopharyngeal) nerve and the vagus respectively. They are stimulated primarily by low arterial PO2, and secondarily by a marked fall of arterial pressure to 40-60 mmHg, because such low pressure itself reduces blood flow through the bodies and produces local hypoxia. Their stimulation increases sympathetic discharge, producing tachycardia and vasoconstriction that tend to raise the low blood pressure back up.",
      objective: "State that the carotid and aortic body chemoreceptors are primarily O2 sensors, and that their stimulation raises sympathetic discharge and so arterial blood pressure.",
      pitfall: "Treating the peripheral chemoreceptor reflex as a direct pressure sensor. It is an O2 sensor first; it only engages with pressure once pressure has fallen low enough (40-60 mmHg) to make the receptors themselves hypoxic.",
      subject: "cvs",
      primary: "DIS-PHY-T02",
      secondary: [],
      modulePath: "104 CPS > Physiology > Cardiovascular System > Basic Mechanisms of Circulatory Control",
      type: "mechanism",
      aliases: ["Carotid body chemoreceptors", "Aortic body chemoreceptors", "Peripheral chemoreceptor reflex"],
    },
    {
      // Sparse reuse, not a fresh mint: canonical_key already pinned in
      // 104-CPS-physiology-concepts.md as CON-CVS-230096C97EAB11, this
      // exact leaf's own module_subject and article.
      key: "central-chemoreceptors.location-stimulus-and-blood-brain-barrier",
      label: "Central chemoreceptors near the medulla, protected by the blood-brain barrier and bathed by CSF, are driven mainly by rising PCO2 rather than by arterial hypoxia directly",
      definition: "Central chemoreceptors are located near the medulla and are stimulated chiefly by a rise in blood/CSF PCO2, because CO2 crosses the blood-brain barrier freely while H+ and O2 do not; they are protected by the blood-brain barrier from the ionised solutes of plasma. Their afferents feed into the medullary cardiovascular centres and, together with the direct stimulant effect of hypercapnia and hypoxia on the vasomotor area itself, raise arterial blood pressure.",
      objective: "State that central chemoreceptors, located near the medulla and protected by the blood-brain barrier, are stimulated primarily by a rise in blood/CSF PCO2, not directly by arterial O2 or H+.",
      pitfall: "Treating central chemoreceptors as directly sensitive to arterial hypoxia or plasma H+, the way the peripheral chemoreceptors and other tissues are — the blood-brain barrier specifically protects them from ionised plasma solutes, leaving CO2 (freely diffusible) as their real, dominant stimulus.",
      subject: "cvs",
      primary: "DIS-PHY-T02",
      secondary: [],
      modulePath: "104 CPS > Physiology > Cardiovascular System > Basic Mechanisms of Circulatory Control",
      type: "mechanism",
      aliases: ["Central chemoreceptors", "Blood-brain barrier and PCO2", "Medullary CO2 sensitivity"],
    },
    {
      // Sparse reuse, not a fresh mint: canonical_key already pinned in
      // 104-CPS-physiology-concepts.md as CON-CVS-8E2C7AEC68C4CB, this
      // exact leaf's own module_subject and article.
      key: "cns-ischemic-response.trigger-and-effect",
      label: "The CNS ischaemic response, triggered when arterial pressure falls below about 50 mmHg, is the most powerful activator of the sympathetic nervous system",
      definition: "The CNS ischaemic response is triggered when marked hypotension causes ischaemia of the medullary vasomotor area itself; the resulting local rise in PCO2 stimulates the vasomotor area directly, producing marked vasoconstriction and a rise in arterial pressure. It is activated once arterial pressure drops below about 50 mmHg and is described as the single most powerful stimulator of the sympathetic nervous system.",
      objective: "State that the CNS ischaemic response triggers below about 50 mmHg arterial pressure and is the single most powerful stimulator of the sympathetic nervous system.",
      pitfall: "Confusing the CNS ischaemic response's ~50 mmHg threshold with the baroreceptor reflex, which operates continuously across the whole physiological pressure range, not only at a severe-hypotension threshold.",
      subject: "cvs",
      primary: "DIS-PHY-T02",
      secondary: [],
      modulePath: "104 CPS > Physiology > Cardiovascular System > Basic Mechanisms of Circulatory Control",
      type: "mechanism",
      aliases: ["CNS ischaemic response", "Medullary vasomotor ischaemia"],
    },
    {
      // Sparse reuse, not a fresh mint: canonical_key already pinned in
      // 104-CPS-physiology-concepts.md as CON-CVS-BBAEB2E1A51102, this
      // exact leaf's own module_subject and article.
      key: "cushing-reflex.trigger-and-triad",
      label: "The Cushing reflex — raised arterial pressure with bradycardia — is triggered by raised intracranial pressure compressing the cerebral vessels and making the vasomotor area ischaemic",
      definition: "The Cushing reflex is seen when intracranial pressure is raised: the patient shows marked elevation of arterial blood pressure with bradycardia. High intracranial pressure compresses the cerebral vessels, causing brain ischaemia; the resulting local hypercapnia and hypoxia produce a pressor response that raises arterial pressure, and the bradycardia that accompanies it is due to baroreceptor stimulation by that raised pressure.",
      objective: "State that the Cushing reflex is triggered by raised intracranial pressure and produces hypertension with a secondary, baroreceptor-mediated bradycardia.",
      pitfall: "Assuming the Cushing reflex's bradycardia is a direct effect of raised intracranial pressure. It is secondary — a baroreceptor response to the hypertension the ischaemic vasomotor area itself produces.",
      subject: "cvs",
      primary: "DIS-PHY-T02",
      secondary: [],
      modulePath: "104 CPS > Physiology > Cardiovascular System > Basic Mechanisms of Circulatory Control",
      type: "mechanism",
      aliases: ["Cushing reflex", "Raised intracranial pressure and blood pressure"],
    },
    // Sparse reuse, not a fresh mint: this leaf's own bank row about
    // vasodilator metabolites is the exact fact this module's already-
    // pinned local-blood-flow-regulation concept teaches (CON-CVS-
    // 56A68328FD03C7, docs/Kasr-Source-Imports/concept/104-CPS-physiology-
    // concepts.md, pinned to ART-104-PHY-LOCAL-AND-HORMONAL-CONTROL, this
    // exact leaf's module_subject) — CO2, H+ and adenosine are its named
    // examples; p.57 of the department book separately names potassium
    // ions among the metabolites driving vasomotion, and endothelin-1 is
    // this leaf's own newly-mounted concept's named vasoconstrictor, never
    // a vasodilator metabolite. No new search needed — same concept.
    {
      key: "local-blood-flow-regulation.myogenic-and-metabolic-autoregulation",
      label: "Active hyperaemia is the rise in blood flow that accompanies a rise in tissue metabolic activity, produced by arteriolar and precapillary-sphincter dilation from local hypoxia, vasodilator metabolites (CO2, H+, adenosine) and local heat.",
      definition: "Restated here only to satisfy the seed type; the pinned record's own wording (CON-CVS-56A68328FD03C7) governs. Vasodilator metabolites (CO2, H+, adenosine, and — per the department book's vasomotion section — potassium ions) are what active hyperaemia and reactive hyperaemia both work through; endothelin-1 is a vasoconstrictor peptide, not a vasodilator metabolite.",
      objective: "Identify CO2, H+, adenosine and potassium ions as vasodilator metabolites, and endothelin-1 as a vasoconstrictor rather than a vasodilator metabolite.",
      pitfall: "Mistaking endothelin-1 for a vasodilator because it is secreted by the endothelium alongside NO and prostacyclin — endothelin-1 is described as the most potent vasoconstrictor known, the opposite direction from the true vasodilator metabolites.",
      subject: "cvs",
      primary: "DIS-PHY-T02",
      secondary: [],
      modulePath: "104 CPS > Physiology > Cardiovascular System > Basic Mechanisms of Circulatory Control",
      type: "mechanism",
      aliases: ["Vasodilator metabolites", "Active hyperaemia metabolites"],
    },
  ],

  questions: [
    // run44 — sparse reuse question, paired with the reuse concept above.
    {
      key: "which-of-the-following-is-not-a-vasodilator-metabolite-8da91769",
      conceptKey: "local-blood-flow-regulation.myogenic-and-metabolic-autoregulation",
      difficulty: "Moderate",
      questionType: "Recall",
      learningObjective: "Identify endothelin-1, not adenosine, potassium ions or hydrogen ions, as the option that is not a vasodilator metabolite.",
      explanations: {
        A: "Adenosine is a vasodilator metabolite — a breakdown product of ATP that is especially important in cardiac muscle, one of the department book's own named examples.",
        B: "Potassium ions are a vasodilator metabolite — the department book's vasomotion section names potassium ions, alongside O2 lack, CO2 excess and lactic acid, among the metabolites that relax metarterioles and precapillary sphincters.",
        C: "Hydrogen ions (low pH from acidic metabolites such as lactic acid) are a vasodilator metabolite, one of the department book's own named examples of active hyperaemia's vasodilator metabolites.",
        D: "This is the correct answer. Endothelin-1 is not a vasodilator metabolite — it is described as the most potent vasoconstrictor yet known, secreted by the endothelium itself, the opposite direction from adenosine, potassium ions and hydrogen ions.",
      },
    },
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
    {
      // Bank-tagged leaf: "Vascular Function" — genuinely this leaf's own
      // baroreceptor-reflex content (bank leaf tags are unreliable
      // throughout this branch), routed onto the concept above.
      // kasr-104-author-run45: Arteries cluster (bank-tagged "Arteries",
      // genuinely this leaf's own baroreceptor-reflex content). A rise in
      // arterial pressure raises baroreceptor discharge, which this leaf's
      // own sourced concept states inhibits the vasomotor area and excites
      // the cardiac inhibitory area — vasodilatation and bradycardia, not
      // vasoconstriction.
      key: "stimulation-of-arterial-baroreceptors-causes-all-except-aafa1ea1",
      conceptKey: "arterial-baroreceptor-reflex.response-to-a-rise-and-a-fall-in-arterial-pressure",
      difficulty: "Moderate",
      questionType: "Recall of a false statement",
      learningObjective: "State that a rise in baroreceptor discharge causes vasodilatation, not vasoconstriction of arterioles, against three genuine effects of the same reflex.",
      explanations: {
        A: "The exception, and the answer. A rise in arterial pressure raises baroreceptor discharge, which inhibits the vasomotor area, lowering sympathetic drive to the vessels and producing vasodilatation of arterioles — the opposite of constriction. A common trap: answering with the atrial volume receptors, whose reflex is about volume, not arterial pressure.",
        B: "True, so not the exception. Increased baroreceptor discharge excites the cardiac inhibitory area, raising vagal tone and producing bradycardia.",
        C: "True, so not the exception. The combined fall in heart rate, stroke volume, cardiac output and vascular resistance that increased baroreceptor discharge produces is what lowers arterial blood pressure back towards normal.",
        D: "True, so not the exception. Increased baroreceptor discharge inhibits the vasomotor area, lowering sympathetic (vasomotor) tone to the vessels.",
      },
    },
    {
      // kasr-104-author-run45: Arteries cluster (bank-tagged "Arteries",
      // genuinely this leaf's own atrial-receptor content). Options B, C
      // and D are each the direct logical reverse of a fact this leaf's own
      // sourced concepts already establish for atrial stretch: decreased
      // (not increased) atrial receptor discharge is what raises
      // vasopressin/ADH; sustained atrial stretch raises (not lowers) ANP;
      // and rising atrial filling produces the Bainbridge reflex's
      // tachycardia, not bradycardia. By elimination, A is the surviving,
      // uncontradicted option, consistent with the same reduction in
      // sympathetic outflow that reflex tachycardia and ADH suppression
      // both already imply.
      key: "stimulation-of-atrial-stretch-receptors-produce-ecf90d1b",
      conceptKey: "atria.functions-beyond-pumping",
      difficulty: "Hard",
      questionType: "Mechanism",
      learningObjective: "Eliminate three options that each reverse an established atrial-receptor fact (ADH, ANP, heart rate direction) to identify reflex vasodilatation and a fall in arterial pressure as the remaining, consistent answer.",
      explanations: {
        A: "By elimination, once B, C and D are each ruled out against this leaf's own sourced facts, vasodilatation of arterioles and a fall in arterial blood pressure is the surviving option — consistent with the same withdrawal of sympathetic outflow that this reflex's tachycardia and ADH suppression both already reflect.",
        B: "Reversed. This leaf's own hemorrhagic-shock concept states vasopressin (ADH) rises from DECREASED discharge of the atrial low-pressure receptors — so stimulating (increasing the discharge of) those same receptors would lower, not raise, ADH secretion.",
        C: "Reversed. Atrial natriuretic peptide is secreted when atrial stretch rises with an expanded extracellular fluid volume, per this leaf's own sourced concept — stimulating the atrial stretch receptors raises, not lowers, ANP secretion.",
        D: "Reversed. This leaf's own sourced concept credits the atria's stretch receptors with triggering the Bainbridge reflex — reflex tachycardia when atrial filling rises — the opposite direction to a decreased heart rate.",
      },
    },
    {
      // kasr-104-author-run46: revisited AND CORRECTED. Run 45 excluded
      // this for "no PDF or cached page-text access" — false. My own first
      // re-check this run used shell-escaped "\|" alternations in the grep
      // pattern, which this tool's regex does not parse as alternation —
      // that produced a false "0 hits" for "permeability" I initially
      // trusted. Re-checked properly: the book's own refractory-shock
      // section (p89) names granulocyte-mediated free-radical damage to
      // capillary walls as a mechanism, and its treatment section (p90)
      // credits glucocorticoids with protecting capillary endothelium
      // "thus maintaining normal capillary permeability" — implying
      // permeability rises abnormally without that protection, i.e. as
      // shock progresses. This is inference from the book's own language
      // rather than a verbatim statement, disclosed honestly below; what
      // makes this row safely authorable is that the other three options
      // are each DIRECTLY and explicitly contradicted by the book.
      key: "in-progressive-hemorrhagic-shock-which-of-the-following-occu-649d7c04",
      conceptKey: "hemorrhagic-shock.rapid-compensatory-hormone-response",
      difficulty: "Hard",
      questionType: "Single best answer",
      learningObjective: "State that progressive hemorrhagic shock is associated with increased capillary permeability, as opposed to the three directly book-contradicted alternatives (venous dilation, tissue alkalosis, increased urine output).",
      explanations: {
        A: "Correct by direct elimination against the book's own explicit statements on the other three options (below), and consistent with the book's own refractory-shock mechanisms (p89: granulocyte-mediated free-radical capillary-wall damage) and its own treatment rationale (p90: glucocorticoids protect capillary endothelium 'thus maintaining normal capillary permeability', implying permeability rises abnormally without that protection as shock continues).",
        B: "Reversed. The department book states the compensatory response to hemorrhage is VASOCONSTRICTION of veins (p87, p91) — 'limit pooling of blood in lower body veins and push blood upwards to the heart' — not dilation.",
        C: "Reversed. The department book lists 'Acidosis (due to tissue hypoxia that leads to anaerobic glycolysis and production of excess lactic acid)' (p86) among hemorrhagic shock's own manifestations — not alkalosis.",
        D: "Reversed. The department book lists 'Reduced urine formation (oliguria) (due to decreased renal blood flow)' (p86-87) among hemorrhagic shock's own manifestations — not increased urine output.",
      },
      answerOverride: "A",
      answerOverrideReason: "No printed key exists (answerConfidence: editorial-no-printed-key). Options B, C and D are each directly and explicitly contradicted by the department physiology book's own statements on hemorrhagic shock (venoconstriction not dilation, p87/p91; acidosis not alkalosis, p86; oliguria not increased urine output, p86-87), leaving A correct by elimination and consistent with the book's own refractory-shock/glucocorticoid-treatment language on capillary permeability (p89-90).",
    },
    {
      key: "baroreceptors-060d2015",
      conceptKey: "arterial-baroreceptor-reflex.response-to-a-rise-and-a-fall-in-arterial-pressure",
      difficulty: "Easy",
      questionType: "Discrimination among near-miss options",
      learningObjective: "State that arterial baroreceptors are stretch receptors, located in the carotid SINUS (not the carotid body, a chemoreceptor site) and aortic arch, that respond continuously across the physiological range rather than only over week-long timescales.",
      explanations: {
        A: "Correct. Arterial baroreceptors are a type of stretch (mechanoreceptor) receptor, responding to the degree of stretch of the vessel wall produced by arterial pressure.",
        B: "Backwards on location: arterial baroreceptors sit in the carotid SINUS and aortic arch, not the carotid BODY (the carotid body is instead the site of the peripheral chemoreceptors, which sense O2, not stretch).",
        C: "Backwards on timescale: the baroreceptor reflex is a rapid, moment-to-moment buffer against short-term pressure swings, not a week-to-week regulator — over days to weeks the baroreceptors themselves reset (adapt) to a new operating pressure, so they do not hold mean arterial pressure fixed on that timescale.",
        D: "Backwards on direction: baroreceptors are stimulated by a RISE, not a sudden fall, in blood pressure — their discharge increases as pressure rises and decreases as pressure falls.",
      },
    },
    {
      // Excluded rather than kept: the bank extraction recovered only 3
      // options (A, B, C) — no D — below the platform's 4-to-5-option
      // import contract (medical:batch's own gate flags it: "3 options —
      // the contract is 4 to 5", caught on this commit's own gate run).
      // The baroreceptor reflex is already fully tested by 8 other kept
      // questions in this file, so no teaching content is lost.
      key: "baroreceptors-of-carotid-sinus-and-aortic-arch-are-sensitive-5a5b4cb9",
      conceptKey: "arterial-baroreceptor-reflex.response-to-a-rise-and-a-fall-in-arterial-pressure",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "The bank extraction recovered only 3 options (A, B, C) — no D — below the platform's 4-to-5-option import contract (medical:batch rejects it outright: \"3 options — the contract is 4 to 5\"). The baroreceptor reflex is already fully tested by 8 other kept questions in this file, so no teaching content is lost by excluding this corrupted row.",
    },
    {
      key: "stimulation-of-carotid-bodies-causes-6c5117f9",
      conceptKey: "peripheral-chemoreceptor-reflex.carotid-and-aortic-bodies",
      difficulty: "Moderate",
      questionType: "Discrimination among near-miss options",
      learningObjective: "State that stimulation of the carotid body chemoreceptors raises blood pressure (via increased sympathetic discharge), as opposed to decreasing respiratory depth or discharge in cranial nerves IX or X.",
      explanations: {
        A: "Backwards. Stimulation of the carotid bodies (a hypoxia response) INCREASES, not decreases, the depth of respiration, as part of the same chemoreceptor reflex arc that also serves respiratory control.",
        B: "Backwards. The carotid body's afferent signal travels via the glossopharyngeal (IX) nerve, and its stimulation INCREASES, not decreases, discharge in this nerve.",
        C: "The vagus (X) nerve carries the aortic body's own chemoreceptor afferents (and other visceral afferents), not primarily the carotid body's; stimulation of the carotid bodies does not act through decreased vagal discharge.",
        D: "Correct. Stimulation of the carotid bodies (low arterial PO2) raises sympathetic discharge via the medullary vasomotor centre, producing vasoconstriction and tachycardia that raise blood pressure.",
      },
    },
    {
      key: "which-of-the-following-would-be-expected-during-brain-ischem-458ed3b2",
      conceptKey: "cns-ischemic-response.trigger-and-effect",
      difficulty: "Moderate",
      questionType: "Discrimination among near-miss options",
      learningObjective: "State that brain (cerebral) ischaemia triggers the CNS ischaemic response, a marked INCREASE in sympathetic activity, as opposed to increased parasympathetic activity or a decrease in heart rate or arterial pressure.",
      explanations: {
        A: "Backwards. The CNS ischaemic response is driven by a rise in SYMPATHETIC, not parasympathetic, activity.",
        B: "Backwards. The CNS ischaemic response raises heart rate (via the same sympathetic surge that raises contractility and vasoconstriction), it does not lower it.",
        C: "Backwards. The CNS ischaemic response's entire purpose is to RAISE, not lower, arterial pressure, restoring cerebral perfusion pressure to a starved medulla.",
        D: "Correct. Brain (medullary) ischaemia triggers the CNS ischaemic response — a marked rise in sympathetic outflow, described as the single most powerful stimulator of the sympathetic nervous system, producing severe vasoconstriction and a sharp rise in arterial pressure in an attempt to restore cerebral perfusion.",
      },
    },
    {
      key: "blood-pressure-increases-and-heart-rate-decreases-in-respons-c1d490d5",
      conceptKey: "cushing-reflex.trigger-and-triad",
      difficulty: "Moderate",
      questionType: "Discrimination among near-miss options",
      learningObjective: "Identify increased intracranial tension as the trigger of the Cushing reflex (hypertension with bradycardia), as opposed to increased body temperature, high altitude, or hemorrhage, none of which produce this specific triad.",
      explanations: {
        A: "Increased body temperature does not produce the Cushing reflex's hypertension-with-bradycardia pattern; if anything, fever tends to raise heart rate.",
        B: "Exposure to high altitude triggers the peripheral chemoreceptor (hypoxia) reflex — tachycardia and vasoconstriction — not the Cushing reflex's bradycardia-with-hypertension pattern.",
        C: "Correct. Increased intracranial tension (raised intracranial pressure) compresses the cerebral vessels, causing local brain ischaemia that drives the Cushing reflex: marked hypertension with a secondary, baroreceptor-mediated bradycardia.",
        D: "Hemorrhage triggers the baroreceptor reflex and, in severe cases, the CNS ischaemic response — both producing tachycardia, not the bradycardia the Cushing reflex specifically produces.",
      },
    },
    {
      key: "a-17-year-old-boy-is-brought-to-the-emergency-room-after-an-74c6b22e",
      conceptKey: "arterial-baroreceptor-reflex.response-to-a-rise-and-a-fall-in-arterial-pressure",
      difficulty: "Moderate",
      questionType: "Discrimination among near-miss options",
      learningObjective: "State that in significant blood loss, the fall in arterial pressure lowers baroreceptor discharge, disinhibiting the medullary vasomotor and cardiac centres and so raising sympathetic outflow to the heart and vessels together — not lowering total peripheral resistance or heart rate, nor raising carotid sinus nerve firing.",
      explanations: {
        A: "Backwards. Significant blood loss raises, not decreases, total peripheral resistance, via the same sympathetic-driven arteriolar vasoconstriction that helps compensate for the fall in pressure.",
        B: "Backwards. Reflex tachycardia (increased, not decreased, heart rate) is a hallmark early sign of compensated hemorrhagic shock, driven by increased sympathetic and decreased vagal outflow to the heart.",
        C: "Backwards. A fall in arterial pressure LOWERS, not raises, baroreceptor discharge (and so carotid sinus nerve firing) — it is this fall in discharge that disinhibits the medullary centres and drives the compensatory sympathetic surge.",
        D: "Correct. The fall in blood pressure from significant blood loss reduces baroreceptor stretch and firing, which disinhibits the medullary vasomotor and cardiac centres, resulting in a marked increase in sympathetic outflow to both the heart (raising heart rate and contractility) and the peripheral vasculature (raising vasoconstriction and total peripheral resistance).",
      },
    },
    {
      key: "a-blood-pressure-of-180-120-mmhg-was-found-in-a-patient-aged-ff99150a",
      conceptKey: "arterial-baroreceptor-reflex.response-to-a-rise-and-a-fall-in-arterial-pressure",
      difficulty: "Moderate",
      questionType: "Recall of a false statement",
      learningObjective: "State that an elevated arterial pressure triggers the baroreceptor reflex to LOWER, not raise, cardiac output, as the exception among otherwise correct statements about severe hypertension.",
      explanations: {
        A: "The exception, and the answer. An elevated blood pressure of 180/120 mmHg triggers the baroreceptor reflex to DECREASE, not increase, cardiac output and heart rate — the body's own negative-feedback mechanism working to bring the elevated pressure back down toward normal.",
        B: "True of this scenario, so not the exception: increased renin secretion (driving angiotensin II-mediated vasoconstriction) is a genuine cause of secondary hypertension, so it could produce this finding.",
        C: "True of this scenario, so not the exception: a catecholamine-secreting adrenal tumour (phaeochromocytoma) causes hypertension through excess circulating epinephrine/norepinephrine.",
        D: "True of this scenario, so not the exception: left ventricular work rises directly with the pressure (afterload) the ventricle must eject against, so this high pressure genuinely increases left ventricular work.",
      },
    },
    {
      key: "hypovolemic-shock-is-characterized-by-all-except-56cefa81",
      conceptKey: "arterial-baroreceptor-reflex.response-to-a-rise-and-a-fall-in-arterial-pressure",
      difficulty: "Moderate",
      questionType: "Recall of a false statement",
      learningObjective: "State that hypovolemic shock produces a FAST (reflex tachycardic), not slow, pulse rate as the exception among its otherwise correct clinical signs.",
      explanations: {
        A: "True of hypovolemic shock, so not the exception: low blood pressure is the defining haemodynamic disturbance, from reduced circulating blood volume.",
        B: "The exception, and the answer. Hypovolemic shock produces a FAST, not slow, pulse rate: the fall in arterial pressure lowers baroreceptor discharge, driving a compensatory sympathetic surge with reflex tachycardia — the opposite of the bradycardia this option describes.",
        C: "True of hypovolemic shock, so not the exception: cold, pale, sweaty skin reflects the same sympathetic-driven cutaneous vasoconstriction and sweating that helps redirect blood to vital organs.",
        D: "True of hypovolemic shock, so not the exception: rapid respiration is a genuine compensatory sign, partly reflecting sympathetic drive and the metabolic (lactic) acidosis of inadequate tissue perfusion.",
      },
    },
    {
      key: "hypovolemis-shock-is-characterized-by-all-the-following-exce-5491354e",
      conceptKey: "arterial-baroreceptor-reflex.response-to-a-rise-and-a-fall-in-arterial-pressure",
      difficulty: "Moderate",
      questionType: "Recall of a false statement",
      learningObjective: "State that hypovolemic shock produces a FAST (reflex tachycardic), not slow, pulse rate as the exception among its otherwise correct clinical signs.",
      explanations: {
        A: "True of hypovolemic shock, so not the exception: low blood pressure is the defining haemodynamic disturbance, from reduced circulating blood volume.",
        B: "The exception, and the answer. Hypovolemic shock produces a FAST, not slow, pulse rate: the fall in arterial pressure lowers baroreceptor discharge, driving a compensatory sympathetic surge with reflex tachycardia — the opposite of the bradycardia this option describes.",
        C: "True of hypovolemic shock, so not the exception: cold, pale, sweaty skin reflects the same sympathetic-driven cutaneous vasoconstriction and sweating that helps redirect blood to vital organs.",
        D: "True of hypovolemic shock, so not the exception: rapid respiration is a genuine compensatory sign, partly reflecting sympathetic drive and the metabolic (lactic) acidosis of inadequate tissue perfusion.",
      },
    },
    {
      // Bank-tagged leaf: this leaf's own bank tag directly ("Basic
      // Mechanisms of Circulatory Control"). Routed onto the already-
      // reused arterial-baroreceptor-reflex concept, no new search
      // needed.
      key: "in-hypovolemis-shock-which-of-the-following-receptors-are-st-b5143c11",
      conceptKey: "arterial-baroreceptor-reflex.response-to-a-rise-and-a-fall-in-arterial-pressure",
      difficulty: "Moderate",
      questionType: "Discrimination among near-miss options",
      learningObjective: "State that the primary receptors stimulated in hypovolemic shock are the arterial baroreceptors (carotid sinus and aortic arch), responding to the fall in arterial pressure and stretch, as opposed to peripheral chemoreceptors, atrial stretch receptors, or central chemoreceptors as the FIRST-engaged sensors.",
      explanations: {
        A: "Correct. In hypovolaemic shock, the arterial baroreceptors in the carotid sinus and aortic arch are the primary sensors engaged by the fall in arterial pressure and stretch, triggering the baroreceptor reflex arc (reduced discharge, disinhibited medullary centres, increased sympathetic outflow) that drives the compensatory tachycardia and vasoconstriction.",
        B: "Peripheral chemoreceptors only engage with pressure once it has fallen far enough (40-60 mmHg) to make the carotid/aortic bodies themselves hypoxic — a later, more severe stage than the arterial baroreceptors' own continuous, moment-to-moment engagement.",
        C: "Atrial stretch receptors respond to atrial filling (venous/volume status), a related but distinct low-pressure reflex from the arterial baroreceptors' own response to arterial pressure itself.",
        D: "Central chemoreceptors respond to blood/CSF PCO2, not to arterial pressure or blood volume directly, so they are not the primary sensors engaged by hypovolemic shock's own pressure fall.",
      },
    },
    {
      key: "peripheral-chemoreceptors-are-not-sensitive-to-all-of-the-fo-eb2cd041",
      conceptKey: "peripheral-chemoreceptor-reflex.carotid-and-aortic-bodies",
      difficulty: "Hard",
      questionType: "Discrimination among near-miss options",
      learningObjective: "State that peripheral chemoreceptors detect the partial pressure of O2 dissolved in plasma (PO2) specifically, so they respond to hypoxic hypoxia but are blind to anaemia, carbon monoxide poisoning and methaemoglobinaemia, all of which lower O2 CONTENT without lowering PO2.",
      explanations: {
        A: "Peripheral chemoreceptors are NOT sensitive to a fall in O2 content from anaemia (fewer red cells/haemoglobin) — dissolved PO2 stays normal even though total O2 content falls, and it is dissolved PO2, not content, that these receptors detect.",
        B: "Peripheral chemoreceptors are NOT sensitive to a fall in O2 content from carbon monoxide poisoning — CO occupies hemoglobin's binding sites without lowering the dissolved PO2 the receptors actually sense.",
        C: "Peripheral chemoreceptors are NOT sensitive to a fall in O2 content from methaemoglobinaemia (haemoglobin iron oxidised, unable to carry O2) — again, dissolved PO2 remains normal even as content falls.",
        D: "Correct — the exception. Peripheral chemoreceptors ARE sensitive to O2 dissolved in physical solution (i.e. PO2 itself); this is precisely the variable they detect, which is exactly why they respond powerfully to hypoxic hypoxia but fail to detect anaemia, CO poisoning or methaemoglobinaemia, none of which lower PO2 itself.",
      },
    },
    {
      key: "peripheral-chemoreceptors-are-stimulated-by-fc90086f",
      conceptKey: "peripheral-chemoreceptor-reflex.carotid-and-aortic-bodies",
      difficulty: "Easy",
      questionType: "Recall of a true statement",
      learningObjective: "State that peripheral chemoreceptors are stimulated primarily by hypoxia (low PO2), as opposed to anaemia, hypocapnia, or alkalosis.",
      explanations: {
        A: "Correct. Peripheral chemoreceptors (carotid and aortic bodies) are stimulated primarily by a fall in arterial PO2 — hypoxia.",
        B: "Anaemia lowers O2 content, not PO2 itself, so it does not stimulate the peripheral chemoreceptors, which detect dissolved PO2 specifically.",
        C: "Hypocapnia (low CO2) does not stimulate the peripheral chemoreceptors; if anything, low CO2 reduces central chemoreceptor drive, the opposite direction from stimulation.",
        D: "Alkalosis (raised pH) does not stimulate the peripheral chemoreceptors in the same way hypoxia does; the chemoreceptors' primary, dominant stimulus is PO2, not pH.",
      },
    },
    {
      key: "peripheral-chemoreceptors-are-stimulated-mainly-by-1b87510d",
      conceptKey: "peripheral-chemoreceptor-reflex.carotid-and-aortic-bodies",
      difficulty: "Easy",
      questionType: "Recall of a true statement",
      learningObjective: "State that peripheral chemoreceptors are stimulated mainly by low arterial PO2, as opposed to raised H+ ions or alkalosis.",
      explanations: {
        A: "Correct. Peripheral chemoreceptors are stimulated mainly by low arterial PO2 (hypoxia) — their dominant, primary stimulus.",
        B: "Not the mainstay stimulus for peripheral chemoreceptors specifically (this garbled option restates PO2, already credited as option A's own correct claim, so is not itself a distinct distractor).",
        C: "Increased H+ ions in arterial blood is more the central chemoreceptors' own domain (via CO2-derived H+ in the CSF); it is not the peripheral chemoreceptors' MAIN stimulus.",
        D: "Alkalosis (raised pH, i.e. LOWER H+) is the opposite direction from what would stimulate any chemoreceptor via the H+ route, and is not the peripheral chemoreceptors' main stimulus in any case, which is PO2.",
      },
    },
    {
      key: "respiratory-chemoreceptors-a4e29c8c",
      conceptKey: "central-chemoreceptors.location-stimulus-and-blood-brain-barrier",
      difficulty: "Moderate",
      questionType: "Discrimination among near-miss options",
      learningObjective: "State that the central chemoreceptors, in the medulla, respond to changes in arterial PCO2, as opposed to the carotid/aortic bodies being the dominant PCO2 sensor, being strongly driven by low O2 CONTENT in anaemia, or chemoreceptors transducing electrical signals into chemical ones (backwards).",
      explanations: {
        A: "Backwards on which receptor dominates the PCO2 response: the CENTRAL chemoreceptors in the medulla, not the carotid/aortic bodies, are the most important sensor for the ventilatory response to elevated PCO2.",
        B: "Backwards: the carotid/aortic bodies (peripheral chemoreceptors) detect dissolved PO2, not O2 CONTENT — they are essentially blind to anaemia, since dissolved PO2 stays normal even though O2 content falls.",
        C: "Correct. The central chemoreceptors, located in the medulla, are responsive to changes in arterial PCO2 (via CO2 crossing the blood-brain barrier and generating H+ in the CSF), their own primary, dominant stimulus.",
        D: "Backwards: chemoreceptors transduce CHEMICAL signals (PCO2, PO2, H+) into ELECTRICAL ones (afferent nerve discharge), not the reverse.",
      },
    },
    {
      key: "stimulation-of-arterial-baroreceptors-leads-to-all-of-these-037f9276",
      conceptKey: "arterial-baroreceptor-reflex.response-to-a-rise-and-a-fall-in-arterial-pressure",
      difficulty: "Moderate",
      questionType: "Recall of a false statement",
      learningObjective: "Identify stimulation of the respiratory centre as NOT a direct effect of arterial baroreceptor stimulation, as the exception among its otherwise correct effects (vasomotor inhibition, ADH-secretion inhibition, heart-rate slowing).",
      explanations: {
        A: "True of baroreceptor stimulation, so not the exception: a rise in arterial pressure raises baroreceptor discharge, which INHIBITS the vasomotor area, lowering sympathetic drive.",
        B: "The exception, and the answer. Arterial baroreceptor stimulation is not primarily a respiratory-centre effect; its own direct effects are on the vasomotor area, the cardiac inhibitory (vagal) area, and ADH secretion, not respiratory drive.",
        C: "True of baroreceptor stimulation, so not the exception: raised arterial pressure inhibits ADH (vasopressin) secretion, part of the same reflex reducing sympathetic and pressor drive.",
        D: "True of baroreceptor stimulation, so not the exception: increased baroreceptor discharge excites the cardiac inhibitory (vagal) area, slowing heart rate — the depressor limb of the reflex.",
      },
    },
    {
      key: "the-activity-of-the-central-chemoreceptors-is-stimulated-by-6197201c",
      conceptKey: "central-chemoreceptors.location-stimulus-and-blood-brain-barrier",
      difficulty: "Moderate",
      questionType: "Discrimination among near-miss options",
      learningObjective: "State that central chemoreceptor activity is stimulated by a rise in the PCO2 of blood perfusing the brain, as opposed to a fall in PO2, a fall in O2 content, or a fall in local metabolic rate.",
      explanations: {
        A: "Correct. Central chemoreceptors in the medulla respond primarily to a rise in the PCO2 of blood flowing through the brain, because CO2 (unlike H+ ions themselves) crosses the blood-brain barrier freely, hydrates within the CSF to form carbonic acid, and dissociates to release H+ that directly stimulates the chemoreceptors.",
        B: "A fall in PO2 is more the peripheral (carotid/aortic body) chemoreceptors' own primary stimulus; central chemoreceptors are relatively insensitive to hypoxia directly.",
        C: "A fall in O2 content (as in anaemia) does not directly stimulate the central chemoreceptors, whose stimulus is PCO2/H+ via the blood-brain barrier, not oxygen carriage.",
        D: "A fall (not rise) in local metabolic rate would, if anything, lower local CO2/H+ production and so lower, not raise, central chemoreceptor stimulation.",
      },
    },
    {
      key: "the-activity-of-the-central-chemoreceptors-is-stimulated-by-bd93fcab",
      conceptKey: "central-chemoreceptors.location-stimulus-and-blood-brain-barrier",
      difficulty: "Moderate",
      questionType: "Discrimination among near-miss options",
      learningObjective: "State that central chemoreceptor activity is stimulated by a rise in the PCO2 of blood perfusing the brain, as opposed to a fall in PO2, a fall in O2 content, or a fall in local metabolic rate.",
      explanations: {
        A: "Correct. This is a duplicate-occurrence sibling question: an increase in the PCO2 of blood flowing through the brain remains the central chemoreceptors' primary, dominant stimulus, acting via CO2 crossing the blood-brain barrier and generating H+ ions in the CSF that directly excite these medullary receptors.",
        B: "A fall in PO2 is more the peripheral (carotid/aortic body) chemoreceptors' own primary stimulus; central chemoreceptors are relatively insensitive to hypoxia directly.",
        C: "A fall in O2 content does not directly stimulate the central chemoreceptors, whose stimulus is PCO2/H+ via the blood-brain barrier, not oxygen carriage.",
        D: "A fall (not rise) in local metabolic rate would, if anything, lower local CO2/H+ production and so lower, not raise, central chemoreceptor stimulation.",
      },
    },
    {
      // Excluded rather than kept: the bank extraction recovered only 2
      // options (A, D) — no B or C — well below the platform's 4-to-5-
      // option import contract.
      key: "central-chemoreceptors-0a60cec1",
      conceptKey: "central-chemoreceptors.location-stimulus-and-blood-brain-barrier",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "The bank extraction recovered only 2 options (A, D) — B and C are both missing entirely — well below the platform's 4-to-5-option import contract. The genuine facts this row tests (central chemoreceptors are NOT primarily PO2-sensitive, and ARE protected by the blood-brain barrier) are already taught cleanly via the sibling questions the-activity-of-the-central-chemoreceptors-is-stimulated-by-6197201c and its own duplicate, and respiratory-chemoreceptors-a4e29c8c.",
    },
    {
      // Excluded: a genuine stem/option mismatch corruption, a new hazard
      // variant not previously catalogued in this branch — the stem
      // describes fetal haemoglobin (2-alpha/2-gamma chains, 2,3-DPG
      // binding), but the surviving options answer an entirely different
      // question about the peripheral chemoreceptors' own most potent
      // stimulus (oxygen tension). Two distinct source questions' text
      // has been merged across the stem/option boundary during
      // extraction, leaving neither question completable from what
      // survives.
      key: "fetal-hemoglobin-contains-2alpha-2-gamma-chains-cannot-combi-bd5548ea",
      conceptKey: "peripheral-chemoreceptor-reflex.carotid-and-aortic-bodies",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Stem/option mismatch corruption: the stem describes fetal haemoglobin (2-alpha/2-gamma chains, 2,3-DPG binding), an entirely different topic from the surviving lettered options, which instead answer a peripheral-chemoreceptor question (oxygen tension as the most potent stimulus). Two distinct source questions have been merged across the stem/option boundary during extraction; neither question is completable from what survives. The genuine peripheral-chemoreceptor/PO2 fact the options describe is already taught cleanly by this file's own peripheral-chemoreceptors-are-stimulated-by-fc90086f and peripheral-chemoreceptors-are-stimulated-mainly-by-1b87510d questions.",
    },
    {
      // Excluded rather than kept: already unanswerable at the bank's own
      // editorial stage (answer: null, editorialExcluded: true) — only 3
      // options survive (A, B, C, with A itself corrupted by a stray
      // "tral ehemoree pis" fragment), no D, below the platform's 4-to-5-
      // option import contract.
      key: "the-cause-of-compensatoryhyperventilation-in-metabolic-acido-d0688695",
      conceptKey: "central-chemoreceptors.location-stimulus-and-blood-brain-barrier",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Already unanswerable at the bank's own editorial stage (answerConfidence: none, editorialExcluded: true): only 3 options survive (A, B, C — no D), and option A itself carries a stray corrupted fragment ('tral ehemoree pis'), below the platform's 4-to-5-option import contract.",
    },
    {
      // Excluded rather than kept: option A's own text ("stimulation of
      // the vasomotor centers") directly contradicts both standard
      // baroreflex physiology and this file's own already-kept sibling
      // question (stimulation-of-arterial-baroreceptors-leads-to-all-of-
      // these-037f9276), whose own option A instead reads "INHIBITION of
      // the vasomotor centers" and is credited as a TRUE statement there.
      // Rising baroreceptor discharge inhibits, never stimulates, the
      // vasomotor area — this is a genuine word-level OCR corruption
      // ("stimulation" swapped for "inhibition"), the same class of
      // opposite-word hazard documented elsewhere in this branch (e.g.
      // "Wmiax" for "Vmax"), with no seed-level field able to repair
      // option text. Not authored to match a word that contradicts this
      // pipeline's own sourced, already-published concept.
      key: "stimulation-of-arterial-baroreceptors-leads-6b137511",
      conceptKey: "arterial-baroreceptor-reflex.response-to-a-rise-and-a-fall-in-arterial-pressure",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "The credited option A's own text ('stimulation of the vasomotor centers') contradicts standard baroreflex physiology and this file's own sibling question (037f9276), whose parallel option A instead reads 'inhibition of the vasomotor centers' and is credited TRUE there — rising baroreceptor discharge inhibits, never stimulates, the vasomotor area. A likely word-level OCR corruption ('stimulation' for 'inhibition'), with no seed-level field able to repair option text; not authored to match a claim contradicting this pipeline's own sourced, already-published concept.",
    },
    // run41 — Basic Mechanisms of Circulatory Control's own "what's left"
    // recompute (docs/Kasr-Source-Imports/coverage/104-CPS-LEDGER.md)
    // surfaced 18 more bank-tagged rows on top of the 18 run36 already
    // closed (8 kept, 4 excluded, 6 deliberately left unclaimed — see that
    // commit's own PROGRESS.md entry, respected unchanged here). Of the 18
    // new rows, 2 test the arterial-baroreceptor-reflex concept already
    // authored above directly — no new search needed, same concept, same
    // article.
    {
      key: "a-decrease-in-carotid-sinus-pressure-from-100-mmhg-to-70-mml-6e408561",
      conceptKey: "arterial-baroreceptor-reflex.response-to-a-rise-and-a-fall-in-arterial-pressure",
      difficulty: "Moderate",
      questionType: "Mechanism",
      learningObjective: "State that a fall in carotid sinus pressure lowers baroreceptor discharge and so reflexly raises cardiac sympathetic drive.",
      explanations: {
        A: "The opposite happens: a fall in carotid sinus pressure lowers the stretch on the baroreceptors, so glossopharyngeal (carotid sinus) nerve traffic to the nucleus of the tractus solitarius DECREASES, not increases.",
        B: "This is the correct answer. A fall in carotid sinus pressure from 100 to 70 mmHg lowers baroreceptor discharge; with less inhibitory input reaching the vasomotor and cardiac inhibitory areas, sympathetic drive to the heart rises reflexly, raising heart rate and contractility to help restore pressure.",
        C: "Cholinergic (parasympathetic) postganglionic activity to the heart falls, not rises, when baroreceptor discharge falls — vagal tone drops as part of the same reflex that raises sympathetic drive.",
        D: "An increase in venous capacitance would lower, not raise, venous return and arterial pressure further — the reflex triggered by a pressure fall instead produces venoCONSTRICTION, reducing capacitance to help restore venous return.",
      },
    },
    {
      key: "buffer-nerves-are-branches-of-6e5be01a",
      conceptKey: "arterial-baroreceptor-reflex.response-to-a-rise-and-a-fall-in-arterial-pressure",
      difficulty: "Easy",
      questionType: "Recall",
      learningObjective: "Name the carotid sinus (glossopharyngeal) nerve and the aortic (vagus) nerve as the two 'buffer nerves' carrying the arterial baroreceptor afferents.",
      explanations: {
        A: "This is the correct answer. The 'buffer nerves' are the afferent pathways of the arterial baroreceptor (buffer) reflex: the carotid sinus nerve, a branch of the glossopharyngeal nerve, from the carotid sinus, and the aortic nerve, a branch of the vagus, from the aortic arch — both carrying baroreceptor traffic to the nucleus of the tractus solitarius.",
        B: "The trigeminal nerve carries no baroreceptor afferents at all; it is not part of the arterial baroreceptor reflex's pathway.",
        C: "The facial nerve likewise carries no baroreceptor afferents — it is not one of the two nerves the buffer reflex depends on.",
        D: "Not correct: the buffer nerves are specifically named branches (the carotid sinus nerve of the glossopharyngeal, the aortic nerve of the vagus), not an unnamed 'none of the above.'",
      },
    },
    // Bank-tagged "Basic Mechanisms of Circulatory Control" but the exact
    // ANP-exception fact this file's own hemorrhagic-shock.rapid-
    // compensatory-hormone-response concept already teaches (see the
    // concept block above) — a duplicate-occurrence restating it with a
    // different distractor set (aldosterone, erythropoietin in place of
    // angiotensin II, vasopressin). No new search needed.
    {
      key: "secretion-of-the-following-hormones-is-increased-during-hemo-62b59647",
      conceptKey: "hemorrhagic-shock.rapid-compensatory-hormone-response",
      difficulty: "Moderate",
      questionType: "Recall of a true statement",
      learningObjective: "Restate that atrial natriuretic peptide, unlike catecholamines and aldosterone, is not part of the hormonal response hemorrhage raises.",
      explanations: {
        A: "True, so not the exception. Catecholamine secretion (adrenal medulla and sympathetic terminals) is part of the rapid humoral compensation for hemorrhage.",
        B: "The exception, and the answer. Atrial natriuretic peptide is stretch-triggered, needing a distended atrium; hemorrhage lowers venous return and atrial filling, removing that stimulus rather than providing it, so its secretion does not rise as part of the response to hemorrhage — the same point this file's own compensatory-hormone concept makes for vasopressin's atrial-stretch trigger running the opposite way.",
        C: "True, so not the exception. Increased renin secretion raises angiotensin II, which in turn raises aldosterone secretion as part of the same compensatory response.",
        D: "Erythropoietin secretion rises with the tissue hypoxia hemorrhage produces, so it is not the exception being tested here; it is ANP, whose own stimulus (atrial stretch) is removed rather than provided by hemorrhage, that stands apart from the other three.",
      },
    },
    // run41 — a genuine option-count/stem-corruption exclude, matching this
    // exact leaf's own venous-capacitance conflict (mean-systemic-filling-
    // pressure-is-decreased-by-d3f1a38e, escalated by run36, left
    // deliberately unclaimed above and still unclaimed here) but a
    // DIFFERENT bank row/key — this is a second, independently corrupted
    // occurrence of the same question, not a duplicate of that escalation.
    {
      key: "mean-systemic-filling-pressure-is-decreased-by-tepret-ef914ec2",
      conceptKey: "venous-return.determinants-and-equation",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Only 3 options survive extraction (A, B, D — no C), below the platform's 4-to-5-option import contract; the stem itself also carries a stray corrupted fragment ('tePret'). Independently of the missing option, this row's own content is the same mean-systemic-filling-pressure/venous-capacitance fact already flagged as a genuine conflict against this pipeline's own sourced veins.capacitance-compliance-and-blood-volume-reservoir concept (see mean-systemic-filling-pressure-is-decreased-by-d3f1a38e, left unclaimed above, run36) — not authored either way.",
    },
    // run44 — endothelium/RAS/NO content, the other 12 remaining rows this
    // leaf's own coverage/104-CPS-LEDGER.md recompute surfaced, is authored
    // in its own file (physiology-endothelium-and-vasoactive-hormones.ts)
    // against ART-104-PHY-LOCAL-AND-HORMONAL-CONTROL (extended with new
    // sections, not this file's own pinned articleId
    // ART-104-PHY-NERVOUS-AND-CHEMORECEPTOR-CONTROL, which does not teach
    // that content — a fresh-mint concept is tagged with its own leaf's
    // articleId by build-batches.ts, so routing it here would have wrongly
    // credited this file's chemoreceptor article with teaching endothelium/
    // RAS/NO). `mean-systemic-filling-pressure-is-decreased-by-d3f1a38e` is
    // left unclaimed unchanged (a genuine content conflict needing an Omar
    // ruling, run36/41's own escalation, not re-litigated here).
    {
      key: "it-is-correct-to-say-8f7e9d38",
      conceptKey: "arterial-baroreceptor-reflex.response-to-a-rise-and-a-fall-in-arterial-pressure",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Extraction yields only 4 lettered options — A, B, C, E, with no D — the same missing-option corruption pattern already excluded twice elsewhere in this file. The printed/external answer E ('B & C are correct') is also internally inconsistent with this pipeline's own already-authored, sourced concepts on this same leaf: option B ('stimulation of baroreceptors leads to a pressor response') directly contradicts the arterial-baroreceptor-reflex concept above, whose sourced mechanism is that a RISE in baroreceptor discharge inhibits the vasomotor area and produces a DEPRESSOR (pressure-lowering) response, not a pressor one — option A, not B, is what that concept supports. Crediting a combination that includes a statement contradicting this leaf's own sourced physiology, with a option letter missing from the extraction, is not authored either way.",
    },
  ],
}
