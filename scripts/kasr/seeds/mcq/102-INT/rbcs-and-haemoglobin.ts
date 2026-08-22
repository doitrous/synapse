/**
 * `102 INT > Physiology > Blood > RBCs and haemoglobin` — the question
 * books' MCQs.
 *
 * Three rows. Only one is sittable: the other two are excluded, one for a
 * genuine printed defect (the department's own book prints the same option
 * text twice) and one for having no answer key at all.
 */
import type { McqLeafSeed } from '../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'RBCs and haemoglobin',
  modulePath: '102 INT > Physiology > Blood > RBCs and haemoglobin',
  articleId: 'ART-102-PHY-RED-BLOOD-CELLS-AND-HAEMOGLOBIN',

  concepts: [
    {
      key: 'rbc-count-normal-values-and-variation',
      label: 'The normal RBC count is 5–5.5 million/mm3 in males and 4–4.5 million/mm3 in females, higher in newborns, high altitude and athletes, and lower in growing children and old age',
      definition:
        'The average number of red blood corpuscles ranges from 5–5.5 million/mm3 in males and 4–4.5 million/mm3 in females. The count is high in newly born infants, at high altitudes and in athletes (all situations of relatively increased oxygen demand or reduced oxygen availability, which raise erythropoietin drive), and is lower in growing children and in old age.',
      objective: 'State the normal RBC count range by sex, and name the physiological states in which it runs higher or lower than normal.',
      pitfall: 'Attributing the higher newborn/high-altitude/athlete counts to a different mechanism from each other, when the book files them together as one list of situations that raise the count — the underlying driver for altitude and athletic training is the same hypoxia-erythropoietin axis taught under Erythropoiesis, and the newborn count is explained the same way (relative intra-uterine hypoxia).',
      subject: 'haem',
      primary: 'DIS-PHY-T02',
      secondary: [],
      modulePath: '102 INT > Physiology > Blood > RBCs and haemoglobin',
      type: 'normal_values',
      aliases: ['Normal RBC count', 'Erythrocyte count'],
    },
  ],

  questions: [
    {
      key: 'MCQ-102-2093c80b-p7-q6',
      conceptKey: 'rbc-count-normal-values-and-variation',
      difficulty: 'Easy',
      questionType: 'Normal values',
      learningObjective: 'State that RBC count is higher than the adult range in newborn infants.',
      explanations: {
        a: 'Erythrocytes are biconcave discs, but they are not rigid — the book emphasises the opposite: their flexibility, which lets them be squeezed through capillaries narrower than their own diameter without rupturing.',
        b: 'Correct. Newborn infants normally have a higher RBC count than the adult range, alongside high altitude and athletic training, reflecting the relative hypoxia of intra-uterine life.',
        c: 'Carbonic anhydrase in the erythrocyte is needed for CO2 transport (converting CO2 to bicarbonate for the chloride shift), not for oxygen transport, which is haemoglobin\'s job.',
        d: 'Protective (immune) function belongs to the white blood cells, not the erythrocytes, whose main role is gas transport.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p15-q53',
      conceptKey: 'teaching.rbc-membrane.hb-retention',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The department\'s own printed page repeats the same option text at two letters: option A and option D both read "It has no mitochondria" (confirmed against the cached page text of the source book, physical page 15, question 53 — the duplication is in the print, not an OCR artefact). The printed key names D, but a student cannot distinguish D from A when they read identically, so the item cannot be sat as printed. The underlying fact is sound and taught by the book (erythrocytes lack mitochondria and so cannot themselves consume the oxygen they carry) but needs the source rescanned to recover whatever option D was actually meant to say.',
    },
    {
      key: 'MCQ-102-2093c80b-p17-q63',
      conceptKey: 'rbc-count-normal-values-and-variation',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'No printed answer key was recovered by either OCR pass (`correctSource: "none"`), and the module book does not teach erythrocyte sedimentation rate (ESR) at all — it is not mentioned anywhere in the physiology part\'s Blood chapter. Excluded both for the missing key and as material this module\'s book does not teach.',
    },
  ],
}
