import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Physiology Cardiovascular System — Inotropic Mechanisms of Cardiac Muscle',
  modulePath: '104 CPS > Physiology > Cardiovascular System > Mechanical Properties of Cardiac Muscle',
  // ART-104-PHY-CARDIAC-MECHANICS is the same live article the sibling
  // Frank-Starling/preload file in this leaf already uses — an exact
  // module_subject match for "Mechanical Properties of Cardiac Muscle".
  articleId: 'ART-104-PHY-CARDIAC-MECHANICS',

  concepts: [
    {
      // Sparse reuse, not a fresh mint: canonical_key already pinned in
      // 104-CPS-physiology-concepts.md as CON-CVS-BF82D6F52B72C9, found by
      // grepping that concept file for "inotrop" before minting anything
      // (per the heightened CVS dedup mitigation). Its own module_subject
      // there is already this exact leaf ("Mechanical Properties of Cardiac
      // Muscle") and its own article_ids already names
      // ART-104-PHY-CARDIAC-MECHANICS — an exact match, not a cross-leaf
      // borrow. Declaring the same key here resolves to
      // CON-CVS-BF82D6F52B72C9 and emits a sparse update only; every other
      // field below is inert for the build (see reuseNote in
      // build-batches.ts), restated close to the pinned record's own
      // wording so a reader here does not have to open the concept file to
      // know what is being reused.
      key: 'cardiac-contractility.inotropy-and-lusitropy.camp-pka-mechanisms',
      label: 'Beta-adrenergic stimulation raises cytoplasmic calcium through Protein Kinase A to increase contractile force (positive inotropy), and the pathway runs in reverse — lower cAMP/PKA activity, as with muscarinic (ACh) stimulation — to produce a negative inotropic effect',
      definition: 'Stimulation of beta-adrenergic receptors, by sympathetic nerves or circulating catecholamines, raises cAMP inside the myocyte and activates Protein Kinase A (PKA), which phosphorylates the L-type Ca++ channel (keeping it open longer) and the ryanodine receptor (releasing more sarcoplasmic-reticulum Ca++) — together a positive inotropic effect. The same axis runs in reverse for negative inotropy: muscarinic (parasympathetic, ACh-mediated) receptor activation inhibits adenylyl cyclase, lowering cAMP and PKA activity and blunting these same Ca-handling steps, so contractile force falls. Hypoxia and myocardial ischaemia impair contractility by a separate route, ATP deficiency, rather than through this cAMP-PKA axis.',
      objective: 'Trace the beta-adrenergic-cAMP-PKA pathway as the shared axis for both positive inotropy (sympathetic/beta-adrenergic drive) and negative inotropy (muscarinic/ACh-mediated suppression of the same axis), and state what "positive inotropism" means in terms of contractile force.',
      pitfall: 'Treating every negative-inotropic agent as acting through a wholly different mechanism from the positive one. Acetylcholine and other agents that inhibit cAMP production act on the very same cAMP-PKA-Ca-handling axis that beta-adrenergic stimulation drives forward — they run it in reverse, they do not bypass it.',
      subject: 'cvs',
      primary: 'DIS-PHY-T02',
      secondary: ['SYS-CVS-T01-S01'],
      modulePath: '104 CPS > Physiology > Cardiovascular System > Mechanical Properties of Cardiac Muscle',
      type: 'mechanism',
      aliases: ['Positive and negative inotropic mechanisms', 'cAMP-PKA contractility pathway', 'Inotropism'],
    },
    {
      // Sparse reuse, not a fresh mint: canonical_key already pinned in
      // 104-CPS-physiology-concepts.md as CON-CVS-7A8A04F61D44D1, found by
      // the same grep pass (searching for "digitalis" / "Na-K pump" before
      // minting). Its own module_subject there is "Electrical Activity of
      // the Heart" and its own article_ids names
      // ART-104-PHY-PACEMAKER-ELECTROPHYSIOLOGY — a genuine cross-leaf
      // reuse (same class as the goldmine reuses documented for the
      // Electrical Activity cluster in PROGRESS.md), not a same-leaf match.
      // Declaring the same key here resolves to CON-CVS-7A8A04F61D44D1 and
      // emits a sparse update (evidence + this leaf's teaching article)
      // only; every other field below is inert for the build.
      key: 'cardiac-sarcolemma.ionic-pumps-exchangers.resting-gradient-maintenance',
      label: 'The Na+-K+ ATPase, the Ca++-ATPase and the Na+-Ca++ exchanger maintain cardiac myocyte ionic gradients, and the exchanger reverses direction — moving Na+ out and Ca++ in — whenever intracellular Na+ rises, as when digitalis inhibits the Na+-K+ ATPase',
      definition: 'The sarcolemmal Na+-K+ ATPase pumps 3 Na+ out of the myocyte for every 2 K+ it pumps in, and a separate Ca++-ATPase pumps Ca++ out. The Na+-Ca++ exchanger normally exchanges 3 Na+ in for 1 Ca++ out, but its direction is set by the prevailing ionic gradients rather than fixed: when intracellular Na+ rises, it reverses, moving Na+ out and Ca++ in instead. Digitalis produces its positive inotropic effect by exploiting exactly this reversal — it inhibits the Na+-K+ ATPase, so intracellular Na+ rises, the Na+-Ca++ exchanger reverses, and the resulting rise in intracellular Ca++ increases contractile force, without acting on beta-adrenergic receptors, cAMP or voltage-gated Ca++ channels at all.',
      objective: 'State the Na+-K+ ATPase / Na+-Ca++ exchanger reversal mechanism by which digitalis produces a positive inotropic effect, and distinguish it from the beta-adrenergic-cAMP-PKA route to increased contractility.',
      pitfall: "Assuming digitalis raises intracellular Ca++ by the same route as sympathetic stimulation (more cAMP, more PKA, direct Ca-channel activation). Digitalis's route is indirect and pump-based: Na-K ATPase inhibition raises intracellular Na+, which then drives the Na-Ca exchanger to reverse and import Ca++ instead of exporting it.",
      subject: 'cvs',
      primary: 'DIS-PHY-T02',
      secondary: ['SYS-CVS-T01-S01'],
      modulePath: '104 CPS > Physiology > Cardiovascular System > Mechanical Properties of Cardiac Muscle',
      type: 'mechanism',
      aliases: ['Digitalis mechanism', 'Na-Ca exchanger reversibility', 'Na-K ATPase inhibition'],
    },
  ],

  questions: [
    {
      key: 'digitalis-has-positive-inotropic-effect-through-the-followin-bcd6fae1',
      conceptKey: 'cardiac-sarcolemma.ionic-pumps-exchangers.resting-gradient-maintenance',
      difficulty: 'Moderate',
      questionType: 'Recall of a mechanism',
      learningObjective: 'State that digitalis produces its positive inotropic effect by inhibiting the sarcolemmal Na+-K+ ATPase, not by raising cAMP, activating voltage-gated Ca++ channels, or inhibiting SERCA.',
      explanations: {
        A: "Digitalis does not act by raising intracellular cAMP — that is the beta-adrenergic/Protein Kinase A pathway, a separate (sympathetic) route to increased contractility that digitalis does not use.",
        B: "Digitalis does not directly activate voltage-gated (L-type) Ca++ channels; the extra intracellular Ca++ it produces arrives indirectly, through the Na+-Ca++ exchanger's reversal after Na-K pump inhibition, not by opening Ca++ channels itself.",
        C: "Correct. Digitalis inhibits the sarcolemmal Na+-K+ ATPase, so intracellular Na+ rises; this smaller Na+ gradient drives the Na+-Ca++ exchanger to reverse — moving Na+ out and Ca++ in instead of its usual net Ca++-extruding direction — and the resulting rise in intracellular Ca++ increases contractile force.",
        D: "Digitalis targets the sarcolemmal Na+-K+ ATPase, not the ATP-dependent Ca++ pump of the sarcoplasmic reticulum (SERCA); inhibiting SERCA would impair Ca++ reuptake and relaxation rather than describe digitalis's actual mechanism.",
      },
    },
    {
      key: 'digitalis-has-positive-inotropic-effect-through-which-mechan-64931a14',
      conceptKey: 'cardiac-sarcolemma.ionic-pumps-exchangers.resting-gradient-maintenance',
      difficulty: 'Moderate',
      questionType: 'Recall of a mechanism',
      learningObjective: 'State that digitalis produces its positive inotropic effect by inhibiting the sarcolemmal Na+-K+ ATPase, not by raising cAMP, activating voltage-gated Ca++ channels, or inhibiting SERCA.',
      explanations: {
        A: "Raising intracellular cAMP describes the beta-adrenergic/Protein Kinase A pathway, a separate route to increased contractility that sympathetic stimulation uses, not digitalis.",
        B: "The extra intracellular Ca++ digitalis produces does not come from directly activating voltage-gated Ca++ channels; it arrives indirectly, via the Na+-Ca++ exchanger reversing after Na-K pump inhibition.",
        C: "Correct. Digitalis inhibits the sarcolemmal Na+-K+ ATPase in cardiac muscle; the resulting rise in intracellular Na+ makes the Na+-Ca++ exchanger reverse direction (Na+ out, Ca++ in), raising intracellular Ca++ and increasing contractile force.",
        D: "SERCA (the sarcoplasmic reticulum's ATP-dependent Ca++ pump) is not digitalis's target; digitalis acts on the sarcolemmal Na+-K+ ATPase instead, and inhibiting SERCA would impair relaxation rather than explain a positive inotropic effect.",
      },
    },
    {
      key: 'digitalis-is-a-positive-inotropic-agent-positive-inotropism-8666b433',
      conceptKey: 'cardiac-contractility.inotropy-and-lusitropy.camp-pka-mechanisms',
      difficulty: 'Easy',
      questionType: 'Recall of a definition',
      learningObjective: 'Define positive inotropism as an increase in the heart\'s intrinsic contractility, independent of preload (EDV) or the SA node\'s electrical cycle.',
      explanations: {
        A: "The opposite of what positive inotropism does. A stronger contraction empties the ventricle to a lower end-systolic volume at a given preload, which raises, not lowers, stroke volume.",
        B: "Inotropism is independent of end-diastolic volume — EDV is a preload/Frank-Starling variable. Positive inotropism raises the force developed at whatever EDV is already present; it does not itself lower EDV.",
        C: "Correct. Positive inotropism means an increase in the heart muscle's intrinsic contractility — the force of contraction generated independently of preload or afterload — as produced by digitalis or by increased sympathetic (beta-adrenergic-cAMP-PKA) drive.",
        D: "Describes a generic ion-movement phenomenon (comparable to how the Na-Ca exchanger itself moves ions down or against a gradient), not the definition of inotropism, which concerns contractile force.",
        E: "SA-node repolarization is an electrical event of pacemaker tissue, unrelated to the mechanical/contractile meaning of inotropism.",
      },
    },
    {
      key: 'negative-inotropic-mechanisms-include-which-of-the-following-10f92c99',
      conceptKey: 'cardiac-contractility.inotropy-and-lusitropy.camp-pka-mechanisms',
      difficulty: 'Moderate',
      questionType: 'Discrimination among near-miss options',
      learningObjective: 'Identify inhibition of cAMP production as a negative inotropic mechanism, as opposed to Protein Kinase A activation, beta-adrenergic stimulation, or raised extracellular Ca++, which are all positive inotropic mechanisms.',
      explanations: {
        A: "Protein Kinase A activation, downstream of beta-adrenergic stimulation, phosphorylates the L-type Ca++ channel and the ryanodine receptor to raise contractile force — a POSITIVE, not negative, inotropic mechanism.",
        B: "Beta-adrenergic receptor stimulation raises cAMP and PKA activity, the classic POSITIVE inotropic pathway, not a negative one.",
        C: "Correct. Inhibiting cAMP production — as occurs when muscarinic (parasympathetic) receptor activation suppresses adenylyl cyclase — removes the substrate for PKA activation, blunting the Ca-handling steps that raise contractile force, a genuine negative inotropic effect.",
        D: "Increased extracellular Ca++ concentration raises Ca++ influx during the action potential, a POSITIVE, not negative, inotropic influence.",
      },
    },
    {
      key: 'which-of-the-following-agents-or-changes-has-a-negative-inot-692531bc',
      conceptKey: 'cardiac-contractility.inotropy-and-lusitropy.camp-pka-mechanisms',
      difficulty: 'Moderate',
      questionType: 'Discrimination among near-miss options',
      learningObjective: 'Identify acetylcholine, acting on cardiac muscarinic receptors, as a negative inotropic agent, as opposed to increased heart rate, sympathetic stimulation, or norepinephrine.',
      explanations: {
        A: "Increased heart rate (a positive chronotropic effect) is not itself a negative inotropic mechanism; faster stimulation can even secondarily raise contractile force (the staircase/treppe phenomenon, from accumulating cytoplasmic Ca++), the opposite direction from a negative inotropic effect.",
        B: "Sympathetic stimulation raises cAMP and PKA activity via beta-adrenergic receptors — a POSITIVE inotropic effect, not a negative one.",
        C: "Norepinephrine is the sympathetic neurotransmitter that drives the same beta-adrenergic-cAMP-PKA pathway as sympathetic stimulation generally, a POSITIVE inotropic effect.",
        D: "Correct. Acetylcholine, acting mainly on cardiac muscarinic receptors (a parasympathetic/vagal effect), inhibits adenylyl cyclase and lowers cAMP, blunting the PKA-dependent Ca-handling steps that raise contractile force — a genuine negative inotropic effect, the functional opposite of the beta-adrenergic pathway.",
      },
    },
    {
      // Bank extraction genuinely never recovered a 4th option for this row
      // (only A, B, D survive; no C) — medical:batch's own contract requires
      // 4-5 options, and this branch's established practice (PROGRESS.md,
      // run29/run33 precedent) is to exclude rather than invent a missing
      // option. The tested contrast (which agents/changes are NOT negative
      // inotropic) is already covered from the positive side by the sibling
      // rows above (PKA activation, beta-adrenergic stimulation, raised
      // extracellular Ca++ are all named there as POSITIVE inotropic
      // mechanisms), so no distinct teaching point is lost.
      key: 'negative-inotropic-mechanisms-include-all-except-c65c04da',
      conceptKey: 'cardiac-contractility.inotropy-and-lusitropy.camp-pka-mechanisms',
      difficulty: 'Moderate',
      questionType: 'Not sittable as extracted.',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'Bank extraction recovered only 3 options (A, B, D), no C — below the platform\'s 4-to-5-option import contract (medical:batch rejects it outright: "N options — the contract is 4 to 5"). The same positive/negative-inotropic-mechanism contrast is already fully tested by the complete-option sibling rows in this file, so no teaching content is lost by excluding this corrupted row.',
    },
  ],
}
