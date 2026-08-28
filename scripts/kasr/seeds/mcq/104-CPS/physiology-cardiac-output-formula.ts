import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Physiology Cardiovascular System — Cardiac Output Formula',
  modulePath: '104 CPS > Physiology > Cardiovascular System > Cardiac Function',
  articleId: 'ART-104-PHY-CARDIAC-OUTPUT-AND-EXERCISE',

  concepts: [
    {
      key: 'cardiac-output.definition-formula-and-index',
      label: 'Cardiac output is the volume each ventricle pumps per minute, equals heart rate times stroke volume, and is corrected for body size as the cardiac index',
      definition: 'Cardiac output (CO) is the volume of blood pumped by each ventricle per minute, normally about 5 litres/minute in adults. Because CO depends on body size (it is higher in people with a larger body size), it is corrected for size as the cardiac index, calculated by dividing CO in L/min by body surface area in m2; the normal cardiac index is about 3.2 L/min/m2. CO is determined by heart rate (beats per minute) and stroke volume, the volume of blood ejected by each ventricle per beat, so that CO = stroke volume x heart rate.',
      objective: 'State the definition and normal value of cardiac output, write the formula CO = SV x HR, and define cardiac index and its normal value.',
      pitfall: 'Forgetting that cardiac index divides cardiac output by body surface area, not by body weight, and treating "5 L/min" as a fixed constant rather than a value that itself scales with body size.',
      subject: 'cvs',
      primary: 'DIS-PHY-T02',
      secondary: ['SYS-CVS-T01-S01'],
      modulePath: '104 CPS > Physiology > Cardiovascular System > Cardiac Function',
      type: 'definition',
      aliases: ['CO = SV x HR', 'Cardiac index'],
    },
  ],

  questions: [
    {
      key: 'cardiac-output-is-equal-to-4aebbffc',
      conceptKey: 'cardiac-output.definition-formula-and-index',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'State the formula CO = heart rate x stroke volume.',
      explanations: {
        A: 'This is the formula for mean arterial pressure, not cardiac output — MAP approximates diastolic pressure plus one-third of the pulse pressure.',
        B: 'Cardiac output equals heart rate multiplied by stroke volume, the volume of blood pumped by each ventricle per minute.',
        C: 'This difference is stroke volume itself (end diastolic volume minus end systolic volume), not cardiac output — stroke volume must still be multiplied by heart rate to reach output per minute.',
        D: 'This combination does not correspond to any standard cardiovascular quantity; end diastolic volume minus stroke volume gives end systolic volume, and multiplying that by heart rate is not cardiac output.',
      },
    },
    {
      key: 'cardiac-output-is-equal-to-which-of-the-following-31600b33',
      conceptKey: 'cardiac-output.definition-formula-and-index',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'State the formula CO = heart rate x stroke volume.',
      explanations: {
        A: 'This is the formula for mean arterial pressure, not cardiac output — MAP approximates diastolic pressure plus one-third of the pulse pressure.',
        B: 'Cardiac output equals heart rate multiplied by stroke volume, the volume of blood pumped by each ventricle per minute.',
        C: 'This difference is stroke volume itself (end diastolic volume minus end systolic volume), not cardiac output — stroke volume must still be multiplied by heart rate to reach output per minute.',
        D: 'This combination does not correspond to any standard cardiovascular quantity; end diastolic volume minus stroke volume gives end systolic volume, and multiplying that by heart rate is not cardiac output.',
      },
    },
    {
      key: 'cardiac-output-is-equal-to-which-of-the-following-diastolic-09022e39',
      conceptKey: 'cardiac-output.definition-formula-and-index',
      difficulty: 'Easy',
      questionType: 'Not sittable as extracted.',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: "Only 3 options survived extraction (B, C, D) — option A's text ('Diastolic BP + 1/3 (Systolic BP - diastolic BP)') was absorbed into the stem itself, mixed with unreadable OCR debris, below the platform's 4-to-5-option import contract. The same fact is already tested cleanly by this leaf's own cardiac-output-is-equal-to-4aebbffc and cardiac-output-is-equal-to-which-of-the-following-31600b33 questions, which preserve all 4 options.",
    },
  ],
}
