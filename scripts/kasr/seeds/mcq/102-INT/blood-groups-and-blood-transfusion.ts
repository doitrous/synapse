/**
 * `102 INT > Physiology > Blood > Blood groups and blood transfusion` — the
 * question books' MCQs.
 *
 * One row, and it is excluded: the bank's page-proximity `modulePathGuess`
 * filed it here, but its content (RBC formation site, lifespan, shape) is
 * RBC/erythropoiesis material, not blood groups, and — independently of the
 * misfiling — the row carries no printed answer key at all
 * (`correctSource: "none"`). No live question survives, so this leaf
 * declares no concepts: `mcq()` in build-batches.ts drops a concept a leaf
 * declares but never tests (`untested`, build-batches.ts:780-791), and there
 * is nothing here for a declared concept to be tested by.
 */
import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Blood groups and blood transfusion',
  modulePath: '102 INT > Physiology > Blood > Blood groups and blood transfusion',
  articleId: 'ART-102-PHY-BLOOD-GROUPS-AND-BLOOD-TRANSFUSION',

  concepts: [],

  questions: [
    {
      key: 'MCQ-102-2093c80b-p8-q12',
      conceptKey: 'teaching.rbc.shape',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Two independent problems. First, the row has no printed answer key (`correctSource: "none"`) — no OCR pass recovered one. Second, its content is not blood groups at all: it asks about RBC formation site, lifespan and shape, which belongs to the RBCs-and-haemoglobin and Erythropoiesis leaves, and the bank\'s page-proximity `modulePathGuess` heuristic simply filed it under the nearest chapter heading in the combined question book. The module book also contradicts option C as printed ("have a life span of about 120 days after that they rupture in the bone marrow") — the book names the spleen, not the bone marrow, as where fragile senescent erythrocytes rupture (physical p125: "become fragile and rupture during their passage through some tight spots in the circulation (especially spleen)"), so even a repaired, correctly-filed version of this item would need the option text itself fixed before it could be sat. Excluded rather than moved or guessed at.',
    },
  ],
}
