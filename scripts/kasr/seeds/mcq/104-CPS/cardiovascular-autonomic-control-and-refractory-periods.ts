import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: "Physiology Cardiovascular System — Autonomic Control, Conduction and Refractory Periods",
  modulePath: "104 CPS > Physiology > Cardiovascular System > Electrical Activity of the Heart",
  // ART-104-PHY-CARDIAC-CONDUCTION ("Autonomic control, conduction velocity
  // and refractoriness of the heart") is a Draft article already staged in
  // docs/Kasr-Source-Imports/article/104-CPS-physiology.md, same
  // module_subject as this leaf, evidenced from the same department book.
  articleId: "ART-104-PHY-CARDIAC-CONDUCTION",

  concepts: [
    {
      // Sparse reuse: CON-CVS-AAAD34C16F9880, canonical_key already pinned
      // in 104-CPS-physiology-concepts.md, article_ids ART-104-PHY-CARDIAC-
      // CONDUCTION — found by grepping that file for this leaf's article id
      // before minting anything.
      key: "autonomic-nervous-system.heart-rate-and-conduction-velocity.chronotropy-dromotropy",
      label: "Sympathetic activity speeds SA node discharge and conduction (positive chronotropy and dromotropy) while parasympathetic activity slows both, and resting vagal tone dominates so the resting heart rate is slower than the SA node's own intrinsic rate",
      definition: "Sympathetic and parasympathetic activity act on the same two cardiac electrical properties in opposite directions. On rate: sympathetic activity, through norepinephrine acting on beta1-adrenoreceptors and raising cAMP, increases the funny current and so speeds SA node discharge — positive chronotropy, causing tachycardia. Parasympathetic (vagal) activity has the opposite effect on the SA node — negative chronotropy, causing bradycardia. On conduction: sympathetic stimulation increases ionic conductance and so the upstroke velocity of action potentials, speeding conduction (positive dromotropy); parasympathetic stimulation, through muscarinic receptors, decreases conductance and slows conduction (negative dromotropy). Under normal resting conditions the parasympathetic effect on the SA node is the stronger of the two — the 'vagal tone' — which is why the normal resting heart rate is only about 72/min, slower than the SA node's own intrinsic discharge rate of 90-105/min.",
      objective: "State the opposite effects of sympathetic and parasympathetic activity on both heart rate (chronotropy) and conduction velocity (dromotropy), name the receptor and second messenger for the sympathetic pathway, and explain why the resting heart rate is slower than the SA node's intrinsic rate.",
      pitfall: "Assuming the resting heart rate equals the SA node's intrinsic discharge rate. It does not: a dominant resting vagal tone continuously brakes the SA node, so the measured resting rate (about 72/min) sits well below the node's own unopposed rate (90-105/min).",
      subject: "cvs",
      primary: "DIS-PHY-T02",
      secondary: ["SYS-CVS-T01-S01"],
      modulePath: "104 CPS > Physiology > Cardiovascular System > Electrical Activity of the Heart",
      type: "mechanism",
      aliases: ["Chronotropy and dromotropy", "Vagal tone", "Positive and negative chronotropic effects"],
    },
    {
      // Sparse reuse: CON-CVS-11E581298A0B95, canonical_key already pinned
      // in 104-CPS-physiology-concepts.md, same article as above.
      key: "cardiac-conduction-system.regional-velocity.av-nodal-delay",
      label: "Conduction velocity is slowest through the AV node and fastest through the Purkinje fibres, and the slow AV nodal delay gives the atria time to empty before ventricular contraction begins",
      definition: "Action potentials spread cell to cell through gap junctions at the intercalated discs. Conduction velocity is not uniform: about 1 m/sec along the internodal bundles from the SA node toward the AV node, but within the AV node itself it slows sharply to about 0.05 m/sec. From the AV node the impulse enters the bundle of His and bundle branches at a rapid 2 m/sec, and the Purkinje fibre network then conducts it throughout the ventricles at a high 4 m/sec. The AV node's slow conduction is not a flaw: it gives the atria enough time to finish emptying into the ventricles before ventricular contraction begins, and in disease it also limits how many rapid atrial impulses can reach the ventricles per minute.",
      objective: "Rank the conduction velocities through the internodal bundles, the AV node, the bundle of His/bundle branches and the Purkinje fibres, and give the two functional reasons slow AV nodal conduction matters.",
      pitfall: "Treating the AV nodal delay as simply 'conduction is slow there' without knowing why it matters. It lets the atria finish emptying into the ventricles before ventricular systole starts, and it protects the ventricles by capping how many atrial impulses per minute can reach them when the atrial rate is abnormally fast.",
      subject: "cvs",
      primary: "DIS-PHY-T02",
      secondary: ["SYS-CVS-T01-S01"],
      modulePath: "104 CPS > Physiology > Cardiovascular System > Electrical Activity of the Heart",
      type: "mechanism",
      aliases: ["AV nodal delay", "Conduction velocities of the conducting system"],
    },
    {
      // Sparse reuse: CON-CVS-5288011D93888B, canonical_key already pinned
      // in 104-CPS-physiology-concepts.md, same article as above.
      key: "cardiac-myocyte-action-potential.refractory-periods.arp-rrp-supernormal",
      label: "The absolute and relative refractory periods of the cardiac myocyte action potential span almost the whole of contraction, which prevents the sustained tetanic contractions seen in skeletal muscle",
      definition: "The cardiac myocyte passes through three excitability states after it fires. During the absolute refractory period (ARP) the myocyte cannot be re-excited by any stimulus, because the inactivation gates of the fast Na+ channels are still closed; the ARP spans phases 0, 1 and 2 and part of phase 3, down to about -50 mV. It is followed by the relative refractory period (RRP), lasting until about -75 mV, during which only a supra-threshold stimulus can elicit a new action potential. Late in phase 3, before the membrane is fully repolarized, there is a brief supernormal (vulnerable) period in which the myocyte can respond to a weaker-than-normal stimulus — many cardiac arrhythmias can be triggered during it. Because of the plateau, the cardiac myocyte's refractory period is much longer than a skeletal myocyte's and occupies almost the whole period of contraction, which prevents the heart from developing the sustained, tetanic contractions seen in skeletal muscle — unsuitable for a pump that must fill between beats.",
      objective: "Name the three excitability phases that follow a cardiac action potential (absolute refractory, relative refractory, supernormal/vulnerable period), state what defines each, and explain why a long refractory period is functionally necessary for a pump.",
      pitfall: "Treating the long cardiac refractory period as incidental rather than functional. It is what stops the heart from being tetanised the way skeletal muscle can be — a tetanised ventricle could not relax and fill between beats.",
      subject: "cvs",
      primary: "DIS-PHY-T02",
      secondary: ["SYS-CVS-T01-S01"],
      modulePath: "104 CPS > Physiology > Cardiovascular System > Electrical Activity of the Heart",
      type: "mechanism",
      aliases: ["Absolute refractory period", "Relative refractory period", "Supernormal period", "Vulnerable period"],
    },
  ],

  questions: [
    {
      key: "chronotropism-refers-to-which-of-the-following-50fd5563",
      conceptKey: "autonomic-nervous-system.heart-rate-and-conduction-velocity.chronotropy-dromotropy",
      difficulty: "Easy",
      questionType: "Recall of a definition",
      learningObjective: "Identify chronotropism as the term for an effect on heart rate/rhythm, distinct from dromotropy (conduction), bathmotropy (excitability) and inotropy (contractility).",
      explanations: {
        A: "Correct. Chronotropy is the effect on the SA node's own discharge rate — positive chronotropy speeds it (tachycardia), negative chronotropy slows it (bradycardia) — which is what changes how often, i.e. the rhythm/rate, the heart beats.",
        B: "Conductivity — the speed of impulse spread through the conducting system — is affected separately, by a distinct term: dromotropy. Sympathetic and parasympathetic activity change dromotropy and chronotropy together but they are not the same property.",
        C: "Excitability, the ease of triggering a new action potential, is named bathmotropy, a different property from the rate-setting effect chronotropism describes.",
        D: "Contractility, the force of contraction, is named inotropy — a mechanical property, not the electrical rate property chronotropism names.",
      },
    },
    {
      key: "what-is-the-effect-of-sympathetic-stimulation-on-the-membran-6c7c92a3",
      conceptKey: "autonomic-nervous-system.heart-rate-and-conduction-velocity.chronotropy-dromotropy",
      difficulty: "Moderate",
      questionType: "Recall of a mechanism",
      learningObjective: "State that sympathetic stimulation increases the slope of phase 4 (the pacemaker potential) via beta1-receptor/cAMP-driven increase in the funny current, speeding SA node discharge.",
      explanations: {
        A: "Backwards. Sympathetic activity, via norepinephrine on beta1-adrenoreceptors and a rise in cAMP, increases the funny current — it opposes the funny current only in the sense that parasympathetic activity does, not sympathetic.",
        B: "Correct. Raised cAMP from beta1-receptor activation increases the funny current, steepening the slope of phase 4 so the SA node reaches threshold sooner and fires faster — positive chronotropy.",
        C: "The opposite of the sympathetic effect. Activating a hyperpolarizing K+ current would slow the SA node, which is what parasympathetic (vagal) activity does, not sympathetic stimulation.",
        D: "Backwards. Sympathetic stimulation increases, not decreases, intracellular cAMP via beta1-adrenoreceptor signalling — that rise in cAMP is exactly what increases the funny current.",
      },
    },
    {
      key: "the-heart-continues-to-beat-regularly-this-property-is-calle-c007f068",
      conceptKey: "autonomic-nervous-system.heart-rate-and-conduction-velocity.chronotropy-dromotropy",
      difficulty: "Easy",
      questionType: "Recall of a definition",
      learningObjective: "Name rhythmicity as the property of beating regularly, distinct from excitability, conductivity and contractility.",
      explanations: {
        A: "Excitability is the capacity to respond to a stimulus with an action potential, not the property of maintaining a regular beat.",
        B: "Correct. Rhythmicity is the heart's ability to generate and maintain a regular beat, driven by the pacemaker tissues' own spontaneous, cyclically repeating phase 4 depolarization.",
        C: "Conductivity is the capacity to propagate an impulse from cell to cell, a separate property from generating the regular rhythm itself.",
        D: "Contractility is the force of contraction the myocardium generates, a mechanical property unrelated to the regularity of the underlying rhythm.",
      },
    },
    {
      key: "the-physiologic-function-of-the-relatively-slow-conduction-t-3b7c9a99",
      conceptKey: "cardiac-conduction-system.regional-velocity.av-nodal-delay",
      difficulty: "Moderate",
      questionType: "Recall of a mechanism",
      learningObjective: "State that the AV node's slow conduction exists to allow the ventricles time to fill from atrial contraction before ventricular systole begins.",
      explanations: {
        A: "Runoff of blood from the aorta into the arteries happens during ventricular ejection, downstream of the electrical events entirely — the AV nodal delay is upstream of this and does not serve it.",
        B: "Venous return to the heart is governed by peripheral venous pressure and the pressure gradient into the right atrium, not by how long the AV node takes to conduct an impulse to the ventricles.",
        C: "Correct. The AV node's slow (about 0.05 m/sec) conduction delays ventricular activation just long enough for the atria to finish contracting and empty their blood into the ventricles first, so ventricular filling is complete before ventricular systole begins.",
        D: "Ventricular repolarization is an electrical event that follows ventricular depolarization by an interval set by the plateau's own duration, not by the AV nodal delay that precedes ventricular depolarization.",
      },
    },
    {
      key: "the-absolute-refractory-period-in-the-ventricle-08470647",
      conceptKey: "cardiac-myocyte-action-potential.refractory-periods.arp-rrp-supernormal",
      difficulty: "Moderate",
      questionType: "Recall of a mechanism",
      learningObjective: "State that the ventricular absolute refractory period coincides with the phases of rapid depolarization and the plateau (phases 0 through 2), not the whole action potential or only part of phase 3.",
      explanations: {
        A: "Backwards. Sympathetic stimulation, by speeding conduction and repolarization, tends to shorten the cardiac action potential and therefore the ARP, not lengthen it.",
        B: "Correct. The absolute refractory period spans phase 0 (rapid depolarization), phase 1 and the phase 2 plateau, continuing into part of phase 3 — throughout this stretch the fast Na+ channels' inactivation gates remain closed, so no stimulus, however strong, can trigger a new action potential.",
        C: "Too broad: the ARP does not span the whole action potential — late phase 3 is instead the relative refractory period (a supra-threshold stimulus can excite the cell) and then the brief supernormal period, not further absolute refractoriness.",
        D: "Backwards. The ventricular myocyte's ARP is much longer than skeletal muscle's, not shorter — the plateau is exactly what stretches it out, which is why cardiac muscle cannot be tetanised the way skeletal muscle can.",
      },
    },
    {
      // Bank extraction genuinely recovered only 3 options (A/B/C), no D —
      // same 4-to-5-option contract failure as the two rows excluded in the
      // sibling pacemaker-electrophysiology.ts file. Its own teaching point
      // (ARP coincides with the period of ventricular contraction) is not
      // lost: the sibling row `...-08470647` above tests the closely related
      // fact (ARP coincides with rapid depolarization + plateau) with a
      // complete 4-option set.
      key: "the-absolute-refractory-period-in-the-ventricles-dcf3f403",
      conceptKey: "cardiac-myocyte-action-potential.refractory-periods.arp-rrp-supernormal",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Bank extraction recovered only 3 options (A/B/C), no D or E — below the platform's 4-to-5-option import contract (medical:batch rejects it outright: '3 options — the contract is 4 to 5'). The closely related fact (ARP spans depolarization and the plateau) is already tested by the 4-option sibling row `the-absolute-refractory-period-in-the-ventricle-08470647` above.",
    },
    {
      key: "the-absolute-refractory-period-of-cardiac-muscle-a-coincides-e08a585f",
      conceptKey: "cardiac-myocyte-action-potential.refractory-periods.arp-rrp-supernormal",
      difficulty: "Moderate",
      questionType: "Recall of a false statement",
      learningObjective: "State that the cardiac muscle absolute refractory period is much longer than the skeletal muscle absolute refractory period, and does not coincide with the whole action potential duration.",
      explanations: {
        A: "The ARP coincides with phases 0 through 2 and part of phase 3, not the total duration of the action potential — the relative refractory and supernormal periods make up the remainder of the action potential's own timeline.",
        B: "During the ARP the myocyte cannot respond to any stimulus, however maximal — that is the definition of 'absolute' — so this statement is false as worded, not a property of the ARP.",
        C: "Correct. The cardiac ARP is much longer than the skeletal muscle ARP, a direct consequence of the cardiac action potential's plateau, which skeletal muscle's brief action potential does not have.",
        D: "The ARP is defined by inactivation of the fast Na+ channels' own inactivation gates, not by delayed rectifier K+ channels being inactivated — those K+ channels are the ones that drive repolarization in phase 3, near the ARP's end.",
      },
    },
    {
      key: "the-supernormal-period-of-cardiomyocyte-action-potential-tha-8b25e4ca",
      conceptKey: "cardiac-myocyte-action-potential.refractory-periods.arp-rrp-supernormal",
      difficulty: "Hard",
      questionType: "Recall of a mechanism",
      learningObjective: "Locate the supernormal (vulnerable) period in the late part of phase 3, when many cardiac arrhythmias can be triggered by a weaker-than-normal stimulus.",
      explanations: {
        A: "Early phase 0 is deep within the absolute refractory period, when the cell cannot be excited by any stimulus at all — the opposite excitability state from the supernormal period.",
        B: "Late phase 2 (the plateau) is also within the absolute refractory period, well before the membrane approaches full repolarization where the supernormal period occurs.",
        C: "Early phase 3 is still within the relative refractory period, where only a supra-threshold stimulus succeeds — the membrane has not yet reached the near-fully-repolarized state the supernormal period requires.",
        D: "Correct. The supernormal (vulnerable) period occurs late in phase 3, just before full repolarization, when the membrane sits close enough to threshold that a weaker-than-normal stimulus can trigger a new action potential — which is why many arrhythmias are initiated here.",
      },
    },
    {
      key: "the-cardiac-muscle-is-characterized-by-having-all-the-follow-1894f2ea",
      conceptKey: "cardiac-myocyte-action-potential.refractory-periods.arp-rrp-supernormal",
      difficulty: "Moderate",
      questionType: "Recall of a false statement",
      learningObjective: "Identify that cardiac muscle's refractory period is much LONGER than skeletal muscle's, not the same, as the exception among true statements about cardiac muscle.",
      explanations: {
        A: "True of cardiac muscle, so not the exception: intercalated discs (with their gap junctions) electrically couple neighbouring cardiac myocytes, letting the tissue function as a syncytium.",
        B: "True of cardiac (and skeletal) muscle, so not the exception: the T-tubule system is positioned at the Z line, where it couples membrane depolarization to sarcoplasmic reticulum Ca++ release.",
        C: "The exception, and the answer. Cardiac muscle's refractory period is much LONGER than skeletal muscle's, a direct consequence of the plateau phase cardiac action potentials have and skeletal ones do not — the two tissues do not share refractory period characteristics.",
        D: "True of cardiac muscle, so not the exception: the electrical coupling at intercalated discs lets the myocardium behave as a functional syncytium despite being made of individual cells.",
      },
    },
    {
      // Leaf-mismatch reroute: bank-tagged "Mechanical Properties of
      // Cardiac Muscle", genuinely this leaf's own funny-current/
      // sympathetic-chronotropy content — routed onto this file's own
      // chronotropy-dromotropy concept, no new search needed.
      //
      // Excluded rather than kept: option B, a distractor, is "The orig
      // decreases the contractility" — an uninterpretable extraction
      // fragment (the bank's own `variants` field shows a cleaner copy of
      // this same paper reads "Due to activation of L-type Ca++ channels"
      // for option B, confirming this copy's B is corrupted, not merely
      // terse) with no seed-level field able to repair option text.
      // Showing an incoherent option to a student, even as a wrong
      // answer, fails the same "fit to sit" bar as a corrupted credited
      // answer. The identical funny-current/sympathetic-chronotropy fact
      // this row tests is already taught cleanly by this file's own
      // what-is-the-effect-of-sympathetic-stimulation-on-the-membran-
      // 6c7c92a3 question, so no teaching content is lost.
      key: "positive-chronotropic-effect-of-sympathetic-stimulation-is-8acc86aa",
      conceptKey: "autonomic-nervous-system.heart-rate-and-conduction-velocity.chronotropy-dromotropy",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Option B is an uninterpretable extraction fragment ('The orig decreases the contractility') with no seed-level field able to repair option text; the bank's own recorded variant of this same paper shows a coherent B ('Due to activation of L-type Ca++ channels'), confirming this copy is corrupted rather than merely terse. The credited fact (sympathetic stimulation speeds SA-node discharge via the funny current) is already taught cleanly by the sibling question what-is-the-effect-of-sympathetic-stimulation-on-the-membran-6c7c92a3, so no teaching content is lost.",
    },
    {
      // Bank-tagged leaf: "Vascular Function" — genuinely this file's own
      // chronotropy-dromotropy content (vagal-tone withdrawal raising
      // heart rate), routed here rather than onto the sibling baroreceptor
      // concept, since the credited fact is specifically about
      // parasympathetic tone's effect on the SA node, which this
      // concept's own definition already states directly ("resting vagal
      // tone dominates... resting heart rate is slower than the SA node's
      // own intrinsic rate").
      key: "concerning-the-effects-of-autonomic-nervous-activity-on-the-4c9f1f9f",
      conceptKey: "autonomic-nervous-system.heart-rate-and-conduction-velocity.chronotropy-dromotropy",
      difficulty: "Moderate",
      questionType: "Discrimination among near-miss options",
      learningObjective: "State that inhibiting parasympathetic (vagal) nerves raises heart rate — removing the vagal brake on the SA node — as opposed to raising or lowering total peripheral resistance directly, or that parasympathetic stimulation weakens ventricular contraction directly.",
      explanations: {
        A: "Correct. Parasympathetic (vagal) tone normally holds the SA node's own intrinsic discharge rate down; inhibiting it removes this brake, so heart rate rises toward the SA node's faster intrinsic rate.",
        B: "Total peripheral resistance is set chiefly by sympathetic, not parasympathetic, tone on the arterioles (parasympathetic innervation of peripheral vasculature is minimal); inhibiting parasympathetic nerves does not directly raise TPR.",
        C: "For the same reason as B, inhibiting parasympathetic nerves does not directly lower TPR either — TPR is a sympathetic, not a parasympathetic, story.",
        D: "Parasympathetic (vagal) innervation of the ventricular myocardium is sparse compared with the atria; stimulating it slows the SA node and AV conduction chiefly, with only a minor direct effect on ventricular contractile strength, so this overstates a direct parasympathetic weakening of ventricular contraction.",
      },
    },
    {
      // Bank-tagged leaf: "Vascular Function" — genuinely this file's own
      // chronotropy content (vagal-tone withdrawal raising HR, and via
      // increased CO, arterial blood pressure). **Gap disclosed**: this
      // concept's own definition states the vagal-tone/HR fact directly
      // but not the further HR-to-CO-to-ABP chain; that chain is basic,
      // undisputed physiology, already established elsewhere in this same
      // pipeline's own cardiac-output.determinants-and-directional-
      // effects concept (physiology-cardiac-output-formula.ts).
      key: "arterial-blood-pressure-may-be-increased-by-d7be95b1",
      conceptKey: "autonomic-nervous-system.heart-rate-and-conduction-velocity.chronotropy-dromotropy",
      difficulty: "Moderate",
      questionType: "Discrimination among near-miss options",
      learningObjective: "State that decreased parasympathetic tone raises heart rate and so cardiac output and arterial blood pressure, as opposed to decreased sympathetic tone, venodilation, or decreased ADH release, each of which lowers arterial blood pressure instead.",
      explanations: {
        A: "Backwards. Decreased sympathetic tone reduces vasoconstriction and cardiac stimulation, LOWERING arterial blood pressure, not raising it.",
        B: "Backwards. Venodilation pools more blood in the compliant venous capacitance vessels, reducing venous return and preload, which LOWERS, not raises, cardiac output and arterial blood pressure.",
        C: "Correct. A decrease in parasympathetic (vagal) tone removes an inhibitory brake on the SA node, allowing heart rate to rise; a higher heart rate raises cardiac output, and a higher cardiac output raises arterial blood pressure (MAP = CO x TPR).",
        D: "Backwards. Decreased antidiuretic hormone (vasopressin) release increases free-water excretion by the kidney, tending to LOWER, not raise, circulating blood volume and so arterial blood pressure.",
      },
    },
    {
      key: "arterial-blood-pressure-may-be-increased-by-which-of-the-fol-6c505d42",
      conceptKey: "autonomic-nervous-system.heart-rate-and-conduction-velocity.chronotropy-dromotropy",
      difficulty: "Moderate",
      questionType: "Discrimination among near-miss options",
      learningObjective: "State that decreased parasympathetic tone raises heart rate and so cardiac output and arterial blood pressure, as opposed to decreased sympathetic tone, venodilation, or decreased ADH release, each of which lowers arterial blood pressure instead.",
      explanations: {
        A: "Backwards. Decreased sympathetic tone reduces vasoconstriction and cardiac stimulation, LOWERING arterial blood pressure, not raising it.",
        B: "Backwards. Venodilation pools more blood in the compliant venous capacitance vessels, reducing venous return and preload, which LOWERS, not raises, cardiac output and arterial blood pressure.",
        C: "Correct. A decrease in parasympathetic (vagal) tone removes an inhibitory brake on the SA node, raising heart rate and so cardiac output, and thereby increasing arterial blood pressure.",
        D: "Backwards. Decreased antidiuretic hormone (vasopressin) release increases free-water excretion by the kidney, tending to LOWER, not raise, circulating blood volume and so arterial blood pressure.",
      },
    },
    {
      key: "arterial-blood-pressure-may-be-increased-by-which-of-the-fol-e73503b4",
      conceptKey: "autonomic-nervous-system.heart-rate-and-conduction-velocity.chronotropy-dromotropy",
      difficulty: "Moderate",
      questionType: "Discrimination among near-miss options",
      learningObjective: "State that decreased parasympathetic tone raises heart rate and so cardiac output and arterial blood pressure, as opposed to decreased sympathetic tone, venodilation, or decreased ADH release, each of which lowers arterial blood pressure instead.",
      explanations: {
        A: "Backwards. Decreased sympathetic tone reduces vasoconstriction and cardiac stimulation, LOWERING arterial blood pressure, not raising it.",
        B: "Backwards. Venodilation pools more blood in the compliant venous capacitance vessels, reducing venous return and preload, which LOWERS, not raises, cardiac output and arterial blood pressure.",
        C: "Correct. A decrease in parasympathetic (vagal) tone removes an inhibitory brake on the SA node, raising heart rate and so cardiac output, and thereby increasing arterial blood pressure.",
        D: "Backwards. Decreased antidiuretic hormone (vasopressin) release increases free-water excretion by the kidney, tending to LOWER, not raise, circulating blood volume and so arterial blood pressure.",
      },
    },
    // run40, second Electrical Activity of the Heart batch: 35 leaf-null bank
    // rows reclustered by the ledger's own keyword heuristic after run33's
    // 47/47 closure of the leaf-tagged rows. The largest single group below
    // (10 rows) restates this file's own already-pinned AV-nodal-delay/
    // conduction-velocity concept from many different angles across the
    // question books — no new search needed, every fact is already stated
    // in that concept's own definition.
    {
      key: "about-the-cardiac-conductivity-all-the-following-are-true-ex-6c3fa236",
      conceptKey: "cardiac-conduction-system.regional-velocity.av-nodal-delay",
      difficulty: "Moderate",
      questionType: "Recall of a false statement",
      learningObjective: "Identify that conduction is slowest in the AV node, not the ventricular muscle, as the exception among otherwise true statements about cardiac conductivity.",
      explanations: {
        A: "True, so not the exception. Conduction through the AV node is the slowest in the whole conducting system, about 0.05 m/sec, which is exactly what gives the atria time to finish emptying before the ventricles are activated.",
        B: "True, so not the exception. The Purkinje network conducts fastest of all, about 4 m/sec, letting the impulse spread through the ventricles almost simultaneously.",
        C: "The exception, and the answer. Conduction is slowest in the AV node, not the ventricular (working) muscle — ordinary ventricular myocardium conducts considerably faster than the AV node's own deliberately delayed transmission, even though it is itself slower than the specialised Purkinje network.",
        D: "True, so not the exception. Vagal (parasympathetic) stimulation slows AV nodal conduction further (negative dromotropy), which is why excessive vagal tone can produce AV block.",
      },
    },
    {
      key: "conduction-speed-is-highest-in-the-bc0dd1e9",
      conceptKey: "cardiac-conduction-system.regional-velocity.av-nodal-delay",
      difficulty: "Easy",
      questionType: "Recall of a definition",
      learningObjective: "State that conduction speed is highest in the Purkinje system among the SA node, internodal atrial bundles, AV node and Purkinje system.",
      explanations: {
        A: "The SA node conducts at a moderate rate relative to the rest of the system — well behind the internodal bundles it feeds into, and far behind the Purkinje network downstream.",
        B: "The internodal atrial bundles conduct faster than the AV node but slower than the ventricular conducting system's own Purkinje fibres.",
        C: "The AV node is the slowest-conducting tissue in the entire system, about 0.05 m/sec — the opposite extreme from 'highest'.",
        D: "Correct. Conduction speed is highest in the Purkinje system, about 4 m/sec, which lets the impulse spread through the ventricular myocardium almost simultaneously once it emerges from the AV nodal delay.",
      },
    },
    {
      key: "conduction-speed-is-slowest-in-the-99b22b7b",
      conceptKey: "cardiac-conduction-system.regional-velocity.av-nodal-delay",
      difficulty: "Easy",
      questionType: "Recall of a definition",
      learningObjective: "State that conduction speed is slowest in the AV node among the SA node, atrial pathways, AV node and Purkinje system.",
      explanations: {
        A: "The SA node conducts at a moderate rate relative to the rest of the system, well faster than the AV node's own deliberately delayed transmission.",
        B: "Atrial (internodal) pathways conduct impulses across the atria comparatively quickly, well ahead of the sharp slowdown that follows once the impulse reaches the AV node.",
        C: "Correct. Conduction speed is slowest in the AV node, about 0.05 m/sec — a deliberate delay that gives the atria time to finish emptying into the ventricles before ventricular contraction begins, and that also caps how many rapid atrial impulses per minute can reach the ventricles.",
        D: "The Purkinje system is the fastest-conducting tissue in the whole system, about 4 m/sec — the opposite extreme from 'slowest'.",
      },
    },
    {
      key: "propagation-of-the-action-potential-through-the-heart-isfast-b5f2c52d",
      conceptKey: "cardiac-conduction-system.regional-velocity.av-nodal-delay",
      difficulty: "Easy",
      questionType: "Recall of a definition",
      learningObjective: "State that propagation of the cardiac action potential is fastest through the Purkinje fibres among atrial muscle, the AV node, Purkinje fibres and ventricular muscle.",
      explanations: {
        A: "Atrial muscle conducts the impulse across the atria at a moderate speed, well below the Purkinje network's own high conduction velocity.",
        B: "The AV node conducts the slowest of any tissue in the system, about 0.05 m/sec — the opposite extreme from 'fastest'.",
        C: "Correct. Propagation is fastest through the Purkinje fibres, about 4 m/sec, letting the impulse activate the ventricular myocardium in near-unison rather than as a slow spreading wave.",
        D: "Ventricular (working) muscle conducts the impulse cell to cell at a moderate rate, faster than the AV node but well below the specialised Purkinje network that activates it.",
      },
    },
    {
      key: "the-function-of-the-av-node-is-to-a-excite-the-left-and-righ-00f4d17c",
      conceptKey: "cardiac-conduction-system.regional-velocity.av-nodal-delay",
      difficulty: "Moderate",
      questionType: "Discrimination among near-miss options",
      learningObjective: "State that the AV node's function is to delay conduction long enough to prevent the atria and ventricles from contracting simultaneously, not to excite the atria or repolarize the heart.",
      explanations: {
        A: "Exciting the left and right atria is the SA node's job, as the impulse's point of origin — the AV node instead RECEIVES that excitation and deliberately delays it before passing it on.",
        B: "Correct. The AV node's slow (about 0.05 m/sec) conduction delays ventricular activation just long enough for the atria to finish contracting and empty into the ventricles first, which is exactly what prevents the atria and ventricles from contracting at the same instant.",
        C: "Repolarization after systole is a property of individual myocardial cell membranes, driven by K+ efflux, not a function the AV node performs on the heart as a whole.",
        D: "Since option B correctly describes a genuine AV-node function, 'none of the above' does not apply.",
      },
    },
    {
      key: "the-main-function-of-the-cardiac-purkinje-system-is-to-a-pre-867155e1",
      conceptKey: "cardiac-conduction-system.regional-velocity.av-nodal-delay",
      difficulty: "Moderate",
      questionType: "Discrimination among near-miss options",
      learningObjective: "State that the Purkinje system's main function is to enable near-simultaneous ventricular activation, a direct consequence of its high conduction velocity, not to prevent premature beats, coordinate valve movement, or delay systole.",
      explanations: {
        A: "Preventing premature ventricular beats is a property of the myocardium's own refractory period, not a function the Purkinje system performs by conducting rapidly.",
        B: "The Purkinje system's role is purely electrical conduction; coordinating valve movement with contraction is achieved by the papillary muscles and chordae tendinae, an unrelated mechanical apparatus.",
        C: "Correct. Because the Purkinje network conducts at the highest velocity in the heart (about 4 m/sec), it delivers the impulse to widely separated regions of the ventricular myocardium in near-unison, letting all parts of the ventricle begin contracting together rather than as a slow, spreading, inefficient wave.",
        D: "Delaying systole until the ventricles fill is the AV node's own deliberately slow (about 0.05 m/sec) conduction, the opposite behaviour from the Purkinje system's high-velocity, near-simultaneous activation.",
      },
    },
    {
      key: "the-slowest-conducting-velocity-occurs-in-5a6c35c5",
      conceptKey: "cardiac-conduction-system.regional-velocity.av-nodal-delay",
      difficulty: "Easy",
      questionType: "Recall of a definition",
      learningObjective: "State that the slowest conducting velocity occurs in the AV node among atrial muscles, the AV node, Purkinje fibres and ventricular muscles.",
      explanations: {
        A: "Atrial muscle conducts the impulse across the atria at a moderate speed, well ahead of the sharp slowdown that follows once the impulse reaches the AV node.",
        B: "Correct. The slowest conducting velocity in the heart occurs in the AV node, about 0.05 m/sec — a deliberate delay that lets the atria finish emptying into the ventricles before ventricular contraction begins.",
        C: "Purkinje fibres are the fastest-conducting tissue in the system, about 4 m/sec — the opposite extreme from 'slowest'.",
        D: "Ventricular muscle conducts the impulse cell to cell at a moderate rate, faster than the AV node but slower than the specialised Purkinje network that first activates it.",
      },
    },
    {
      key: "the-slowest-conducting-velocity-occurs-in-which-of-the-follo-af891c81",
      conceptKey: "cardiac-conduction-system.regional-velocity.av-nodal-delay",
      difficulty: "Easy",
      questionType: "Recall of a definition",
      learningObjective: "State that the slowest conducting velocity occurs in the AV node among atrial muscles, the AV node, Purkinje fibres and ventricular muscles.",
      explanations: {
        A: "Atrial muscle conducts the impulse across the atria at a moderate speed, well ahead of the sharp slowdown that follows once the impulse reaches the AV node.",
        B: "Correct. The slowest conducting velocity in the heart occurs in the AV node, about 0.05 m/sec — a deliberate delay that lets the atria finish emptying into the ventricles before ventricular contraction begins, and that also caps how many rapid atrial impulses per minute can reach the ventricles.",
        C: "Purkinje fibres are the fastest-conducting tissue in the system, about 4 m/sec — the opposite extreme from 'slowest'.",
        D: "Ventricular muscle conducts the impulse cell to cell at a moderate rate, faster than the AV node but slower than the specialised Purkinje network that first activates it.",
      },
    },
    {
      key: "what-is-the-important-function-of-cardiac-purkinje-system-3132c9a7",
      conceptKey: "cardiac-conduction-system.regional-velocity.av-nodal-delay",
      difficulty: "Moderate",
      questionType: "Discrimination among near-miss options",
      learningObjective: "State that the Purkinje system's important function is to increase (speed up) conduction of the cardiac impulse, not to slow it, amplify it, or increase contractile force.",
      explanations: {
        A: "Slowing conduction is the AV node's own deliberate function, the opposite behaviour from the Purkinje system's high-velocity conduction.",
        B: "Correct. The Purkinje system's important function is to increase the conduction of impulses through the ventricles — at about 4 m/sec, the fastest of any cardiac tissue — so that widely separated regions of ventricular myocardium activate in near-unison rather than as a slow spreading wave.",
        C: "Purkinje fibres conduct the existing electrical impulse rapidly; they do not amplify its magnitude, which stays set by the depolarizing currents of the myocytes themselves.",
        D: "The force of ventricular contraction is set by the contractile myocardium and factors such as preload and contractility, not by how fast the Purkinje conduction system itself conducts.",
      },
    },
    {
      key: "which-of-the-following-is-a-function-of-the-av-node-16a480fe",
      conceptKey: "cardiac-conduction-system.regional-velocity.av-nodal-delay",
      difficulty: "Moderate",
      questionType: "Discrimination among near-miss options",
      learningObjective: "State that the AV node's function is to delay conduction long enough to prevent the atria and ventricles from contracting simultaneously, not to excite the atria or repolarize the heart.",
      explanations: {
        A: "Exciting the left and right atria is the SA node's job, as the impulse's point of origin — the AV node instead receives that excitation and deliberately delays it before passing it on.",
        B: "Correct. The AV node's slow (about 0.05 m/sec) conduction delays ventricular activation just long enough for the atria to finish contracting and empty into the ventricles first, which is exactly what prevents the atria and ventricles from contracting at the same instant.",
        C: "Repolarization after systole is a property of individual myocardial cell membranes, driven by K+ efflux, not a function the AV node performs on the heart as a whole.",
        D: "Since option B correctly describes a genuine AV-node function, 'none of the above' does not apply.",
      },
    },
    // A leaf-mismatch reroute onto this file's own already-claimed
    // chronotropy-dromotropy concept — genuinely this same fact (calcium
    // channel blockers slow the SA node), no new search needed.
    {
      key: "which-of-the-following-has-negative-chronotropic-effect-e351e202",
      conceptKey: "autonomic-nervous-system.heart-rate-and-conduction-velocity.chronotropy-dromotropy",
      difficulty: "Moderate",
      questionType: "Discrimination among near-miss options",
      learningObjective: "State that calcium channel blockers have a negative chronotropic effect by reducing SA-node discharge, as opposed to raised body temperature, beta1-receptor stimulation, or hypokalemia, each of which is not negatively chronotropic.",
      explanations: {
        A: "A rise in body temperature INCREASES the SA node's own discharge rate (a positive, not negative, chronotropic effect), via a faster metabolic rate and greater SA-node sensitivity.",
        B: "Beta1-receptor stimulation is the sympathetic pathway that raises intracellular cAMP and increases the funny current, speeding SA-node discharge — a positive, not negative, chronotropic effect.",
        C: "Correct. Calcium channel blockers reduce the L-type Ca++ current that drives phase 0 of the pacemaker action potential and slow the funny-current-dependent phase 4 as well, reducing SA-node discharge rate — a genuine negative chronotropic effect, and the mechanism used clinically to slow a fast heart rate.",
        D: "Hypokalemia is more classically associated with increased cardiac excitability and arrhythmogenic risk than with a straightforward negative chronotropic effect on the SA node.",
      },
    },
    {
      // Only 3 options survive (A, C, D — no B), below the platform's
      // 4-to-5-option import contract. Duplicate of the phase-4/phase-0-3
      // sibling rows already kept in cardiovascular-pacemaker-
      // electrophysiology.ts and this file's own av-nodal-delay questions,
      // so no unique teaching content is lost.
      key: "conduction-speed-is-slowest-in-the-tepret-abe02b6a",
      conceptKey: "cardiac-conduction-system.regional-velocity.av-nodal-delay",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "5 lettered options survive (A-E), but D and E are OCR-garbled fragments of two DIFFERENT, unrelated exam items ('P-R segment corresponds to the plateau of ventricular myocyte action potential' and 'In ECG, atrial fibrillation shows:') rather than genuine distractors for 'conduction speed is slowest in the:' — presenting them to a student as answer options would be incoherent. The identical, cleanly-extracted fact (AV node slowest) is already kept as the sibling row conduction-speed-is-slowest-in-the-99b22b7b, so no unique teaching content is lost.",
    },
    {
      // Only 3 options survive (A, C, D — no B), below the platform's
      // 4-to-5-option import contract.
      key: "the-fibers-of-the-a-v-bundle-its-branches-e7478cf8",
      conceptKey: "cardiac-conduction-system.regional-velocity.av-nodal-delay",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Bank extraction recovered only 3 options (A, C, D — no B), below the platform's 4-to-5-option import contract. The tested fact (AV bundle fibres are modified muscle fibres, not nerve fibres) is already taught by the sibling Purkinje-histology concept in cardiovascular-conducting-system-histology.ts ('specialised cardiac muscle fibres... not nerve tissue').",
    },
  ],
}
