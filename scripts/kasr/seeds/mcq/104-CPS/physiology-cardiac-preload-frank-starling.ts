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
  ],
}
