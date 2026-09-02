import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Physiology Cardiovascular System — Afterload and the Ventricular Pressure-Volume Loop',
  modulePath: '104 CPS > Physiology > Cardiovascular System > Mechanical Properties of Cardiac Muscle',
  // ART-104-PHY-CARDIAC-MECHANICS is the same live article the sibling
  // Frank-Starling/preload and inotropic-mechanisms files in this leaf
  // already use — an exact module_subject match for "Mechanical Properties
  // of Cardiac Muscle".
  articleId: 'ART-104-PHY-CARDIAC-MECHANICS',

  concepts: [
    {
      // Fresh mint. find-existing.mjs "ventricular pressure volume loop
      // EDPVR ESPVR preload afterload landmarks" -> "Safe to create one."
      // Grepping 104-CPS-concepts.md / -physiology-concepts.md /
      // -mcq-concepts.md for "EDPVR", "ESPVR" and "pressure-volume" turned
      // up only a written-question concept about increased inotropy
      // shifting the ESPVR line (ventricular-pressure-volume-loop.effect-
      // of-increased-inotropy, 104-CPS-concepts.md) — a different fact
      // (what moves the loop) from this one (what each landmark of a single
      // loop IS), so not a duplicate.
      key: 'ventricular-pressure-volume-loop.landmarks.edpvr-espvr-preload-afterload',
      label: "The ventricular pressure-volume loop's EDPVR traces the ventricle's passive tension as it fills, its ESPVR traces the maximal active tension the contracting ventricle can generate, and end-diastolic volume and end-systolic pressure are the loop's standard practical measures of preload and afterload",
      definition: "On a ventricular pressure-volume loop, the end-diastolic pressure-volume relationship (EDPVR) is the curve traced by the passive, non-contracting ventricular wall as it is stretched during filling — analogous to the passive length-tension curve of a resting isolated muscle. The end-systolic pressure-volume relationship (ESPVR) is the line on which the upper-left corner of loops at varying preload or afterload lies; its slope is used as a load-independent index of the ventricle's contractility because it isolates the maximal ACTIVE tension-generating capacity of the ventricle at end-systole, not a 'total' tension that would misleadingly combine the active and passive components together. Two of the loop's corners double as standard clinical and experimental proxies for the heart's own loading conditions: end-diastolic volume (EDV), the right-hand edge of the loop, is the standard measure of preload, and end-systolic pressure (ESP), the loop's peak pressure at the point of aortic valve closure, is the standard measure of afterload.",
      objective: 'Distinguish the EDPVR (passive filling tension) from the ESPVR (maximal active tension / contractility) on a ventricular pressure-volume loop, and state that end-diastolic volume and end-systolic pressure are the loop\'s standard proxies for preload and afterload respectively.',
      pitfall: "Describing the ESPVR as representing the ventricle's \"total\" tension. That phrasing wrongly implies it combines both active and passive components, when the ESPVR's entire value as a load-independent index of contractility depends on isolating the active component alone.",
      subject: 'cvs',
      primary: 'DIS-PHY-T02',
      secondary: ['SYS-CVS-T01-S01'],
      modulePath: '104 CPS > Physiology > Cardiovascular System > Mechanical Properties of Cardiac Muscle',
      type: 'definition',
      aliases: ['EDPVR', 'ESPVR', 'Ventricular pressure-volume loop', 'End-systolic pressure-volume relationship'],
      conflicts: [
        "No conflicting record found; find-existing.mjs returned 'safe to create', and the only related pending concept found by grep (ventricular-pressure-volume-loop.effect-of-increased-inotropy, 104-CPS-concepts.md) teaches a different fact — what shifts the ESPVR line — not what each loop landmark itself is.",
      ],
    },
    {
      // Fresh mint. find-existing.mjs "increased afterload decreases
      // velocity of shortening force-velocity relationship" -> "Safe to
      // create one." Distinct from this leaf's own inotropic-mechanisms
      // concept (CON-CVS-BF82D6F52B72C9, reused in physiology-cardiac-
      // inotropy-mechanisms.ts): that concept covers what changes
      // contractility itself (a shift of the force-velocity curve); this
      // one covers afterload's own effect (movement along a fixed curve),
      // the contrast the bank's own rows explicitly test against Vmax.
      key: 'ventricular-afterload.effect-on-shortening.force-velocity-relationship',
      label: 'Increased afterload decreases the velocity and degree of ventricular myocardial shortening, raises end-systolic volume and lowers stroke volume — a movement along the heart\'s fixed force-velocity curve, unlike increased inotropy, which shifts the whole curve and genuinely raises Vmax',
      definition: "The force-velocity relationship of cardiac muscle is an inverse curve: as afterload (the load the muscle must shorten against) rises, the velocity of shortening falls, extrapolating toward zero velocity — a fully isometric contraction — at a maximal afterload the muscle cannot overcome at all. Because a higher afterload also reduces the degree of shortening reached from a given preload, the ventricle empties less completely, raising end-systolic volume; at an unchanged end-diastolic volume (preload), this lowers stroke volume. This is a movement ALONG a fixed force-velocity curve, in contrast to increased inotropy, which shifts the entire curve up and to the right and genuinely raises Vmax, the curve's maximal, load-independent, zero-load velocity intercept — afterload on its own does not change Vmax.",
      objective: 'State that increased afterload decreases the velocity of shortening, increases end-systolic volume and decreases stroke volume (a movement along the force-velocity curve), and contrast this against increased inotropy, which shifts the curve itself and raises Vmax.',
      pitfall: 'Confusing afterload\'s effect (moving along a fixed force-velocity curve; Vmax unchanged) with inotropy\'s effect (shifting the curve itself; Vmax genuinely increases), or assuming increased afterload decreases, rather than increases, end-systolic volume.',
      subject: 'cvs',
      primary: 'DIS-PHY-T02',
      secondary: ['SYS-CVS-T01-S01'],
      modulePath: '104 CPS > Physiology > Cardiovascular System > Mechanical Properties of Cardiac Muscle',
      type: 'mechanism',
      aliases: ['Afterload', 'Force-velocity relationship', 'End-systolic volume'],
      conflicts: [
        "No conflicting record found; find-existing.mjs returned 'safe to create', and grepping the pending concept files for 'force-velocity' and 'Vmax' returned no hit — a genuine gap, not a duplicate.",
      ],
    },
  ],

  questions: [
    {
      key: 'concerning-the-pressure-volume-loop-of-left-ventricle-all-ex-0eb3ce9e',
      conceptKey: 'ventricular-pressure-volume-loop.landmarks.edpvr-espvr-preload-afterload',
      difficulty: 'Hard',
      questionType: 'Recall of a false statement',
      learningObjective: "Identify that the ESPVR represents the ventricle's maximal ACTIVE tension, not a \"total\" tension, as the false statement among the pressure-volume loop's other true landmark definitions.",
      explanations: {
        A: 'True, not the exception. The EDPVR reflects the passive tension developed by the resting, non-contracting ventricular wall as it is stretched by filling, analogous to a passive length-tension curve of isolated muscle.',
        B: "Correct — this is the exception (the false statement). The ESPVR represents the ventricle's maximal ACTIVE tension-generating capacity at end-systole, a load-independent index of contractility, not a \"total\" tension that would misleadingly combine active and passive components together.",
        C: 'True, not the exception. End-diastolic volume is the standard clinical and experimental proxy for preload.',
        D: 'True, not the exception. End-systolic pressure is the standard clinical and experimental proxy for afterload.',
      },
    },
    {
      key: 'increased-afterload-on-the-ventricle-c44cd5fe',
      conceptKey: 'ventricular-afterload.effect-on-shortening.force-velocity-relationship',
      difficulty: 'Moderate',
      questionType: 'Discrimination among near-miss options',
      learningObjective: 'State that increased afterload decreases the velocity of shortening, as opposed to decreasing end-systolic volume, increasing stroke volume, or increasing Vmax.',
      explanations: {
        A: 'Increased afterload increases, not decreases, end-systolic volume — the ventricle empties less completely against the higher load, leaving more blood behind at end-systole.',
        B: "Correct. Increased afterload moves the ventricle further along its fixed force-velocity curve, decreasing the velocity (and degree) of myocardial shortening.",
        C: 'Increased afterload decreases, not increases, stroke volume at a given preload — a higher end-systolic volume with an unchanged end-diastolic volume means less blood is ejected per beat.',
        D: 'Vmax, the force-velocity curve\'s zero-load velocity intercept, changes only with inotropy, not afterload; afterload moves the operating point along the existing curve without changing the curve (or Vmax) itself.',
      },
    },
    {
      key: 'what-is-the-effect-of-increased-afterload-on-the-ventricle-9084d395',
      conceptKey: 'ventricular-afterload.effect-on-shortening.force-velocity-relationship',
      difficulty: 'Moderate',
      questionType: 'Discrimination among near-miss options',
      learningObjective: 'State that increased afterload decreases the velocity of shortening, as opposed to decreasing end-systolic volume, increasing stroke volume, or increasing Vmax.',
      explanations: {
        A: 'Increased afterload increases, not decreases, end-systolic volume, since the ventricle empties less completely against the higher load.',
        B: 'Correct. Increased afterload moves the ventricle further along its own fixed force-velocity curve, decreasing the velocity of myocardial shortening.',
        C: 'Increased afterload decreases, not increases, stroke volume at a given preload, because more blood is left behind at the higher end-systolic volume.',
        D: 'Vmax is a property of the force-velocity curve itself, changed by inotropy, not by afterload; afterload only moves the operating point along an unchanged curve.',
      },
    },
    {
      // Already unanswerable in the bank itself (answer: null,
      // editorialExcluded: true, editorialExcludeReason: depends on an
      // accompanying graph with points A/C/D/E on a ventricular function
      // curve, not available in the text extraction). Recorded here with
      // this leaf's own concept for a complete accounting rather than
      // silently dropped.
      key: 'an-increase-in-afterload-and-venous-compliance-can-cause-str-4dc76b7f',
      conceptKey: 'ventricular-afterload.effect-on-shortening.force-velocity-relationship',
      difficulty: 'Hard',
      questionType: 'Not sittable as extracted.',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: "Already excluded at the bank's own editorial stage (answerConfidence: none, editorialExcluded: true): the question asks which lettered point (A, C, D or E) a graph moves to, and that graph is not available in the text extraction — the answer cannot be determined from text alone.",
    },
    {
      // Bank-tagged "Mechanical Properties of Cardiac Muscle" (this
      // leaf's own bank tag). Routed onto this file's own
      // ventricular-afterload.effect-on-shortening.force-velocity-
      // relationship concept, not a fresh mint: that concept's own
      // definition already states, as its explicit contrast against
      // afterload's effect, that increased inotropy "shifts the entire
      // [force-velocity] curve up and to the right and genuinely raises
      // Vmax" — exactly what this question and its two siblings below
      // test. No new search needed; this is this branch's own
      // already-committed concept.
      //
      // Excluded rather than kept: option C, the credited answer, is
      // "Wmiax increases" — an OCR-garbled rendering of "Vmax increases"
      // that no seed-level field can repair (options are emitted
      // verbatim). Presenting a garbled term as the correct answer's own
      // option text is not fit to show a student. The identical
      // Vmax-increases fact is taught cleanly instead via the credited
      // answer's own explanation on the two sibling rows below, so no
      // teaching content is lost.
      key: 'increasing-the-inotropic-state-of-the-heart-will-968a1868',
      conceptKey: 'ventricular-afterload.effect-on-shortening.force-velocity-relationship',
      difficulty: 'Moderate',
      questionType: 'Not sittable as extracted.',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'Option C, the credited answer, is "Wmiax increases" — an OCR-garbled rendering of "Vmax increases" with no seed-level field able to correct option text. The same fact (increased inotropy genuinely raises Vmax) is taught cleanly via the credited answer of the sibling row increasing-the-inotropic-state-of-the-heart-will-ans-25958be0, so no teaching content is lost by excluding this corrupted row.',
    },
    {
      // Same routing as above (leaf-tagged "Mechanical Properties of
      // Cardiac Muscle", this file's own force-velocity/inotropy-contrast
      // concept). Option B tests the length-tension relationship, a
      // second curve from the same concept family; neither this concept
      // nor ART-104-PHY-CARDIAC-MECHANICS states its shift direction with
      // inotropy explicitly (both describe preload's effect on the
      // length-tension curve, not inotropy's) — standard, undisputed
      // cardiac physiology (raised Ca++ availability lets the same or a
      // shorter sarcomere length reach a given active tension), disclosed
      // here as a gap for the article-authoring lane rather than invented
      // without a source.
      key: 'increasing-the-inotropic-state-of-the-heart-will-ans-25958be0',
      conceptKey: 'ventricular-afterload.effect-on-shortening.force-velocity-relationship',
      difficulty: 'Moderate',
      questionType: 'Discrimination among near-miss options',
      learningObjective: 'State that increased inotropy shifts the force-velocity curve up and to the right (not down and right), shifts the length-tension curve up and to the left, genuinely raises Vmax, and increases (not decreases) the degree of myocyte shortening.',
      explanations: {
        A: 'Backwards. Increased inotropy shifts the force-velocity relationship UP and to the RIGHT, not down and to the right — the heart can now generate more force and a higher velocity of shortening at any given afterload.',
        B: 'Correct. Increased inotropy — more Ca++ available for cross-bridge cycling — lets the myocyte develop a given active tension at the same or an even shorter sarcomere length than before, shifting the length-tension relationship up and to the left.',
        C: 'Backwards. Vmax, the force-velocity curve\'s maximal, load-independent, zero-load velocity intercept, genuinely INCREASES with increased inotropy — it is a classic index of enhanced contractility, not an unchanged parameter.',
        D: 'Backwards. Increased inotropy INCREASES, not decreases, the degree of myocyte shortening at any given preload and afterload, which is exactly why it raises stroke volume.',
      },
    },
    {
      // Leaf-mismatch reroute: bank-tagged "The heart" rather than this
      // leaf, but genuinely the same inotropy/force-velocity/PV-loop
      // content this file's own concept already covers (confirmed by
      // reading the row directly, per the leaf-field-unreliable hazard
      // documented throughout this branch). Option B (PV-loop width) is a
      // natural, undisputed extension of the concept's own stated
      // afterload-ESV relationship — inotropy is not itself stated to
      // change ESV by this concept or its article, so this is disclosed
      // as a gap rather than assumed to be directly sourced.
      key: 'increasing-the-inotropic-state-of-the-myocardium-will-4a21ac61',
      conceptKey: 'ventricular-afterload.effect-on-shortening.force-velocity-relationship',
      difficulty: 'Moderate',
      questionType: 'Discrimination among near-miss options',
      learningObjective: 'State that increased inotropy widens the ventricular pressure-volume loop (by lowering end-systolic volume at an unchanged end-diastolic volume, so stroke volume rises), rather than raising end-systolic or end-diastolic volume or shifting the force-velocity curve leftward.',
      explanations: {
        A: 'Backwards. A more forcefully contracting ventricle ejects more completely, LOWERING, not raising, end-systolic volume — the blood left behind after ejection falls, it does not rise.',
        B: 'Correct. Increased inotropy lowers end-systolic volume without requiring any change in end-diastolic volume (preload); because the pressure-volume loop\'s width at any given pressure is the difference between these two volumes (i.e. stroke volume), a lower end-systolic volume at an unchanged end-diastolic volume widens the loop.',
        C: 'End-diastolic volume is a preload parameter, set by venous return and ventricular filling before contraction begins — inotropy (contractility) changes what the ventricle does with that volume once contraction starts, not the filling volume itself.',
        D: 'Backwards. Increased inotropy shifts the force-velocity relationship up and to the RIGHT, not to the left — more force and velocity of shortening are available at any given afterload.',
      },
    },
    {
      // Bank-tagged leaf: this leaf's own bank tag directly. A clean,
      // direct application of this file's own force-velocity concept —
      // increased afterload decreases the velocity of shortening.
      key: 'the-velocity-of-shortening-of-cardiac-muscle-is-decreased-by-68b1dda6',
      conceptKey: 'ventricular-afterload.effect-on-shortening.force-velocity-relationship',
      difficulty: 'Moderate',
      questionType: 'Discrimination among near-miss options',
      learningObjective: 'State that increased afterload — not increased preload, increased inotropy, or achieving Vmax at zero load — decreases the velocity of shortening of cardiac muscle.',
      explanations: {
        A: 'Increased preload, via the Frank-Starling mechanism, can modestly INCREASE, not decrease, the degree and velocity of shortening at a given afterload.',
        B: 'Increased positive inotropic state shifts the entire force-velocity curve up and to the right, INCREASING, not decreasing, the velocity of shortening at any given afterload.',
        C: 'Correct. As afterload rises, the muscle must generate more force before it can begin to shorten at all, directly reducing the velocity at which shortening occurs — velocity falls toward zero as afterload approaches the fully isometric (maximal) extreme.',
        D: 'Vmax is the MAXIMUM velocity of shortening, reached specifically at zero load — the opposite extreme from a decreased velocity, not a cause of one.',
      },
    },
    {
      // Bookkeeping exclude: already unanswerable at the bank's own
      // editorial stage (answer: null, editorialExcluded: true). A
      // duplicate-occurrence corrupted copy of the row kept above — the
      // credited answer (increased afterload) is embedded unlettered in
      // this copy's own stem, and neither surviving lettered option (B,
      // D) correctly describes a cause of decreased shortening velocity.
      // Recorded here for a complete accounting of this leaf.
      key: 'the-velocity-of-shortening-of-cardiac-muscle-is-decreased-by-f3398b36',
      conceptKey: 'ventricular-afterload.effect-on-shortening.force-velocity-relationship',
      difficulty: 'Moderate',
      questionType: 'Not sittable as extracted.',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: "Already unanswerable at the bank's own editorial stage (answerConfidence: none, editorialExcluded: true): the correct answer (increased afterload) is embedded unlettered in the stem itself, and neither of the two lettered options that survive extraction (B: increased positive inotropic state; D: achieving Vmax at zero load) correctly describes a cause of decreased shortening velocity — both instead describe conditions that increase or maximise it. The clean, complete sibling copy of this same question is already kept as the-velocity-of-shortening-of-cardiac-muscle-is-decreased-by-68b1dda6.",
    },
    {
      // Bookkeeping exclude: already unanswerable at the bank's own
      // editorial stage (answer: null, editorialExcluded: true). Routed
      // onto this file's own concept since the row's two surviving
      // options (Starling's mechanism raising EDV; a positive inotropic
      // effect lowering ESV) are both genuine mechanisms of the
      // pressure-volume loop this file's own concept already teaches, but
      // both are independently true and complementary — no single
      // defensible best answer, and the missing options (likely including
      // a combined "both" choice) make this unrecoverable.
      key: 'stroke-volume-reserve-sv-7-from-70-up-to-200-ml-during-max-e-64548dbe',
      conceptKey: 'ventricular-afterload.effect-on-shortening.force-velocity-relationship',
      difficulty: 'Moderate',
      questionType: 'Not sittable as extracted.',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: "Already unanswerable at the bank's own editorial stage (answerConfidence: none, editorialExcluded: true): both surviving options (increased end-diastolic volume via Starling's mechanism; decreased end-systolic volume via a positive inotropic effect) are independently genuine, complementary mechanisms contributing to the stroke volume reserve seen during maximal exercise, and the missing options (likely including a combined 'both' choice) make it impossible to confidently select a single intended answer.",
    },
  ],
}
