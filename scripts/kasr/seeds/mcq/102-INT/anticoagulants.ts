/**
 * `102 INT > Physiology > Blood > Anticoagulants` — the question books' MCQs.
 *
 * One row, and it does not actually test anything the book files under this
 * chapter's own heading (heparin and the coumarins, in vitro vs in vivo use).
 * It asks about protein C, which the book places under "Physiological
 * limitations of blood coagulation" (the fibrinolytic-system subsection,
 * physical p140). The bank's own `modulePathGuess` put it here anyway — the
 * heuristic runs on page proximity within the combined MCQ book, and this
 * question sits on the same printed page as several genuine anticoagulant
 * questions — so it is kept in this file rather than moved, but tests the
 * concept that already exists for that other leaf
 * (`physiological-limitation-of-coagulation`, `CON-HEM-87280E690F877F`,
 * from `../../../../../../docs/Kasr-Source-Imports/concept/102-INT-concepts.md`).
 * `mcq()` in build-batches.ts resolves the id by canonical_key alone, so
 * reusing it from a different leaf file is exactly what the pipeline's
 * cross-leaf concept merge is for.
 */
import type { McqLeafSeed } from '../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Anticoagulants',
  modulePath: '102 INT > Physiology > Blood > Anticoagulants',
  articleId: 'ART-102-PHY-ANTICOAGULANTS',

  concepts: [
    {
      key: 'physiological-limitation-of-coagulation',
      label:
        'Coagulation is held in check by general limiting reactions — smooth endothelium, hepatic clearance of activated factors and natural heparin — and by three specific ones: the thromboxane–prostacyclin balance, antithrombin III, and the fibrinolytic system',
      definition:
        'The fibrinolytic system is one of the physiological limits on coagulation: every endothelial cell outside the cerebral microcirculation expresses thrombomodulin, a thrombin-binding protein. Thrombin bound to thrombomodulin activates protein C, and activated protein C, working with its cofactor protein S, inactivates factors V and VIII and de-represses tissue plasminogen activator (TPA), which converts plasminogen to plasmin. Plasmin then lyses fibrin and fibrinogen into fibrinogen degradation products, which themselves inhibit thrombin.',
      objective:
        'Name protein C as a physiological anticoagulant activated by the thrombin-thrombomodulin complex, and state what it and its cofactor protein S do to the coagulation cascade.',
      pitfall:
        'Treating protein C as though it degraded a clotting factor directly, or as though it worked alone. It acts on factors V and VIII, and it needs protein S as a cofactor — a question naming protein C in activated-protein-C-with-protein-S terms and a question about protein C alone are testing the same physiology, not two different mechanisms.',
      subject: 'haem',
      primary: 'DIS-PHY-T02',
      secondary: [],
      modulePath: '102 INT > Physiology > Blood > Physiological limitations of blood coagulation',
      type: 'mechanism',
      aliases: ['Protein C pathway', 'Activated protein C'],
    },
  ],

  questions: [
    {
      key: 'MCQ-102-2093c80b-p14-q45',
      conceptKey: 'physiological-limitation-of-coagulation',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective:
        'Identify protein C as a physiological (naturally occurring) anticoagulant, distinct from the fibrinolytic and clotting-factor players it acts on.',
      explanations: {
        a: 'Correct. Protein C is one of the body\'s own limiting mechanisms on coagulation: thrombin bound to thrombomodulin on healthy endothelium activates it, and activated protein C, together with protein S, inactivates factors V and VIII and frees tissue plasminogen activator to start fibrinolysis. That whole downstream effect is why protein C counts as a major physiological anticoagulant.',
        b: 'Backwards. Activated protein C removes the inhibitor of tissue plasminogen activator, which raises TPA activity and so *increases* the formation of plasmin, not decreases it — plasmin is the point of the pathway, not something protein C suppresses.',
        c: 'Backwards. Protein C is activated by thrombin (bound to thrombomodulin), not by prothrombin, and prothrombin is upstream of thrombin in the cascade — it has not yet become the enzyme that could activate anything.',
        d: 'Wrong target. Activated protein C, with its cofactor protein S, inactivates factors V and VIII, not factor VII. Confusing the fibrinogen-group factors (V, VIII) that protein C disables with the prothrombin-group factor VII is the standard slip here.',
      },
    },
  ],
}
