import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Physiology Cardiovascular System — Cardiac Preload and Frank-Starling Law',
  modulePath: '104 CPS > Physiology > Cardiovascular System > Mechanical Properties of Cardiac Muscle',
  articleId: 'ART-104-PHY-CARDIAC-MECHANICS',

  concepts: [
    {
      key: 'cardiac-muscle-length-tension.frank-starling-law.preload-effect-on-shortening',
      label: "Frank-Starling's law states that isometric tension rises in direct proportion to the muscle's stretch (its preload), and preload — set mainly by venous return, not by any single determinant of cardiac output alone — never itself weakens contraction as it rises",
      definition: "Frank-Starling's law states that, within limits, the tension developed during isometric contraction of cardiac muscle is directly proportional to the degree of stretching of the muscle, i.e. to its preload; a higher preload also increases the velocity of shortening at any given afterload. Preload rises with venous return, since a greater volume returning to the heart stretches the ventricular wall further before contraction begins, and preload rises physiologically during exercise as venous return increases. It is one of several variables that together set cardiac output (alongside heart rate, contractility and afterload), not the sole determinant of it. Because the law is a direct, not an inverse, relationship, a rising preload never itself reduces the force of contraction — it is precisely the mechanism by which the heart matches its output to venous return, up to the point of overstretch.",
      objective: "State Frank-Starling's law in terms of preload and isometric tension, name venous return as preload's main determinant, and reject the claim that preload is cardiac output's only determinant or that raising it weakens contraction.",
      pitfall: 'Treating "preload increases the force of contraction" as if it must eventually reverse into a weakening effect within the range the question is testing, or treating preload as if it alone fixed cardiac output rather than acting together with heart rate, contractility and afterload.',
      subject: 'cvs',
      primary: 'DIS-PHY-T02',
      secondary: ['SYS-CVS-T01-S01'],
      modulePath: '104 CPS > Physiology > Cardiovascular System > Mechanical Properties of Cardiac Muscle',
      type: 'mechanism',
      aliases: ['Frank-Starling law', 'Cardiac preload', 'Preload and venous return'],
    },
  ],

  questions: [
    {
      key: 'all-about-cardiac-preload-is-true-except-015bb4d1',
      conceptKey: 'cardiac-muscle-length-tension.frank-starling-law.preload-effect-on-shortening',
      difficulty: 'Moderate',
      questionType: 'Recall of a false statement',
      learningObjective: "Identify that Frank-Starling's law makes preload increase, not reduce, the force of cardiac contraction as the false statement among preload's other true characters.",
      explanations: {
        A: 'True of preload, so not the exception. Exercise raises venous return, and a greater venous return stretches the ventricle further, raising preload.',
        B: 'True, so not the exception. Preload is set mainly by venous return — the volume of blood returning to the heart stretches the ventricular wall before contraction begins.',
        C: "The exception, and the answer. Frank-Starling's law states the opposite direct relationship: within limits, the force (tension) developed during isometric contraction of cardiac muscle rises in direct proportion to preload, not falls. A common trap: assuming any physiological variable's effect must eventually reverse, when the law describes a direct proportionality throughout its physiological range.",
        D: "True, so not the exception — cardiac output depends on several variables together (heart rate, contractility, afterload as well as preload), so preload alone does not determine it; this statement is therefore also true and not the sought exception. Note: with two arguably-true statements among the distractors, this item is retained because C is the one Frank-Starling's law contradicts outright, the sharpest and most decisively false option.",
      },
    },
    {
      key: 'starling-s-law-of-the-heari-states-that-the-strength-of-cont-e7fa67a6',
      conceptKey: 'cardiac-muscle-length-tension.frank-starling-law.preload-effect-on-shortening',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: "State Frank-Starling's law: contraction strength is proportional to end-diastolic volume (preload).",
      explanations: {
        A: "Myocardial oxygen supply affects how long strong contraction can be sustained, but Frank-Starling's law itself is stated in terms of muscle stretch, not oxygen delivery.",
        B: "Stroke volume is an output of the heart's pumping, affected by preload among other things — the law states what determines contraction strength, not this consequence of it.",
        C: "Frank-Starling's law states that the strength (tension) of cardiac contraction is directly proportional to the degree of stretching of the muscle, i.e. to its preload — clinically indexed by the end-diastolic volume, the ventricle's filled length just before contraction begins.",
        D: "Arterial blood pressure is closer to a component of afterload, which the law does not describe — the law's variable is the muscle's own resting stretch (preload), not the pressure it must contract against.",
      },
    },
    {
      key: 'if-the-end-diastolic-volume-is-increased-92889299',
      conceptKey: 'cardiac-muscle-length-tension.frank-starling-law.preload-effect-on-shortening',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'State that a higher end-diastolic volume (preload) raises stroke volume, by Frank-Starling\'s law.',
      explanations: {
        A: 'By Frank-Starling\'s law, a higher end-diastolic volume stretches the ventricle further before contraction, raising the degree of shortening and so the stroke volume it ejects.',
        B: 'Cardiac output would rise, not fall, if stroke volume rises with an unchanged heart rate — the direct opposite of this option.',
        C: 'Frank-Starling\'s law states the opposite: a greater stretch (higher preload) increases, not decreases, the force of contraction.',
        D: 'End-diastolic volume is a ventricular filling variable and does not itself set heart rate, which is governed separately by autonomic and pacemaker mechanisms.',
      },
    },
    {
      key: 'in-healthy-ventricles-the-force-of-contraction-a-decreases-w-fd934514',
      conceptKey: 'cardiac-muscle-length-tension.frank-starling-law.preload-effect-on-shortening',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'State that the force of ventricular contraction increases with end-diastolic volume within physiological limits (Frank-Starling\'s law).',
      explanations: {
        A: 'Sympathetic stimulation increases, not decreases, the force of cardiac contraction (positive inotropy) — the opposite of this option.',
        B: 'By Frank-Starling\'s law, within physiological limits, the force of ventricular contraction rises directly with increasing end-diastolic volume (preload) — this is exactly how the heart matches its output to a rising venous return.',
        C: 'The force of contraction, set partly by preload through Frank-Starling\'s law, is a major determinant of stroke volume and so of cardiac output — it does influence cardiac output.',
        D: 'Contractile force varies with preload, afterload, sympathetic tone and other inotropic influences — it is not fixed or invariant.',
      },
    },
    // Leaf-mismatch reroute: bank-tagged "The heart" (a Cardiovascular-System
    // histology/anatomy leaf), but both rows below restate this same,
    // already-claimed Frank-Starling/preload concept in a different
    // phrasing — the leaf-field-unreliable hazard confirmed yet again. No
    // new search needed; this file's own concept already covers them.
    {
      key: 'according-to-starling-law-the-strength-of-cardiac-muscle-con-4e1e6c59',
      conceptKey: 'cardiac-muscle-length-tension.frank-starling-law.preload-effect-on-shortening',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: "State Frank-Starling's law: contraction strength is directly proportionate to the degree of stretching of the muscle fibres (preload).",
      explanations: {
        A: 'Arterial blood pressure relates to afterload, a separate determinant of cardiac performance from the length-dependent (preload-based) relationship Frank-Starling\'s law describes.',
        B: 'Decreased oxygen supply to the myocardium would impair contractile strength through an entirely different, ischaemic mechanism, unrelated to fibre stretch.',
        C: 'End-systolic volume is a consequence of the heart\'s own pumping performance, not the variable Frank-Starling\'s law identifies as directly determining contraction strength.',
        D: 'Frank-Starling\'s law states that, within physiological limits, the strength of cardiac muscle contraction is directly proportional to the degree of stretching of the muscle fibres just before contraction begins — that is, to preload, set mainly by venous return. Greater diastolic stretch increases the overlap and calcium sensitivity of the contractile apparatus up to an optimal length, producing a more forceful subsequent contraction — the mechanism by which the heart automatically matches its output to venous return without an external neural signal.',
      },
    },
    {
      // Only 3 options survived extraction (A, B, D — no C at all), below
      // the platform's 4-to-5-option import contract; medical:batch confirms
      // ("3 options — the contract is 4 to 5"). No seed-level field exists
      // to fabricate a plausible 4th option, so this is excluded, not
      // repaired — same class of unfixable defect documented throughout
      // this bank. The fact itself (preload = degree of myocardial stretch
      // before contraction) is not lost: it is already stated directly in
      // this concept's own definition and covered by the kept question above.
      key: 'in-the-whole-intact-heart-bef9de81',
      conceptKey: 'cardiac-muscle-length-tension.frank-starling-law.preload-effect-on-shortening',
      difficulty: 'Moderate',
      questionType: 'Definition',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'Only 3 options survived extraction (A, B, D — no C), below the platform\'s 4-to-5-option import contract. No seed-level field exists to add a plausible 4th option, so this cannot be authored as extracted.',
    },
    {
      // Already unanswerable in the bank itself (answer: null,
      // editorialExcluded: true) — no printed key, and none of the five
      // options restates the core Starling relationship (isometric tension
      // depends on preload/fibre stretch); the options instead mix in
      // force-velocity-relationship facts (Vmax at zero load) and unrelated
      // cardiovascular facts. Recorded here, not silently dropped, so the
      // exclusion and its reason stay visible.
      key: 'according-to-starling-law-the-tension-of-isometric-cardiac-m-0dfbb05b',
      conceptKey: 'cardiac-muscle-length-tension.frank-starling-law.preload-effect-on-shortening',
      difficulty: 'Moderate',
      questionType: 'Definition',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'No printed key exists (answerConfidence: none in the bank), and none of the five options restates Frank-Starling\'s law\'s own core relationship — isometric tension rising with the muscle\'s initial stretch (preload). The options instead mix in force-velocity-relationship concepts (achieving Vmax at zero load) and unrelated cardiovascular facts (arterial pressure, oxygen supply, ejection phase), none of which can be confidently matched to what the stem actually asks.',
    },
  ],
}
