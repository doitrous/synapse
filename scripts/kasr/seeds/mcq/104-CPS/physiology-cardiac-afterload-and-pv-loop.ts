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
  ],
}
