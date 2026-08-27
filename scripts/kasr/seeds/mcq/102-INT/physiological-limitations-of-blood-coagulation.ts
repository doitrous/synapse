/**
 * `102 INT > Physiology > Blood > Physiological limitations of blood
 * coagulation` — the question books' MCQs.
 *
 * Two rows, both reusing concepts that already exist: the vitamin-K-dependent
 * factor list from the Abnormalities-of-haemostasis concept batch, and the
 * protein-C/protein-S pathway from `../concept/102-INT-concepts.md`.
 */
import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Physiological limitations of blood coagulation',
  modulePath: '102 INT > Physiology > Blood > Physiological limitations of blood coagulation',
  articleId: 'ART-102-PHY-PHYSIOLOGICAL-LIMITATIONS-OF-BLOOD-COAGULATION',

  concepts: [
    {
      key: 'vitamin-k-deficiency-bleeding-disorder',
      label: 'Vitamin K deficiency lowers hepatic formation of factors II, VII, IX, X and proteins C and S, prolonging coagulation time',
      definition:
        'Vitamin K is a fat-soluble vitamin synthesised by the intestinal bacterial flora and needed by the liver for formation of factors II (prothrombin), VII, IX and X, and proteins C and S. Its deficiency decreases formation of these factors and prolongs coagulation time. Causes include absence of intestinal bacterial flora (as in newborn infants), prolonged antibiotic treatment, and obstruction of the bile ducts (bile is needed to absorb this fat-soluble vitamin).',
      objective: 'Name the four clotting factors and two anticoagulant proteins whose hepatic synthesis depends on vitamin K.',
      pitfall: 'Listing only the "prothrombin group" (II, VII, IX, X) and forgetting that proteins C and S — the physiological anticoagulants, not procoagulants — are also vitamin-K-dependent, which is why severe vitamin K deficiency can occasionally show relatively less protection against clotting than the pure bleeding picture suggests.',
      subject: 'haem',
      primary: 'DIS-PHY-T02',
      secondary: [],
      modulePath: '102 INT > Physiology > Blood > Abnormalities of haemostasis',
      type: 'mechanism',
      aliases: ['Prothrombin group factors', 'Vitamin K dependent factors'],
    },
    {
      key: 'physiological-limitation-of-coagulation',
      label:
        'Coagulation is held in check by general limiting reactions — smooth endothelium, hepatic clearance of activated factors and natural heparin — and by three specific ones: the thromboxane–prostacyclin balance, antithrombin III, and the fibrinolytic system',
      definition:
        'The fibrinolytic system limits coagulation through thrombomodulin: every endothelial cell outside the cerebral microcirculation expresses it, thrombin bound to thrombomodulin activates protein C, and activated protein C, with its cofactor protein S, inactivates factors V and VIII and de-represses tissue plasminogen activator, which converts plasminogen to plasmin. Plasmin lyses fibrin and fibrinogen into fibrinogen degradation products, which themselves inhibit thrombin.',
      objective: 'State protein S\'s role as the cofactor that lets activated protein C inactivate factors V and VIII.',
      pitfall: 'Treating protein S as though it had catalytic activity of its own — it is a cofactor, not an enzyme; activated protein C is the enzyme, and protein S only enables it to act.',
      subject: 'haem',
      primary: 'DIS-PHY-T02',
      secondary: [],
      modulePath: '102 INT > Physiology > Blood > Physiological limitations of blood coagulation',
      type: 'mechanism',
      aliases: ['Protein C pathway', 'Activated protein C', 'Protein S cofactor'],
    },
  ],

  questions: [
    {
      key: 'MCQ-102-2093c80b-p12-q34',
      conceptKey: 'vitamin-k-deficiency-bleeding-disorder',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Name factor IX as one of the four vitamin-K-dependent clotting factors.',
      explanations: {
        a: 'Factor IX belongs to the prothrombin group (II, VII, IX, X), all of which need vitamin K for their hepatic synthesis.',
        b: 'Factor XI belongs to the contact group with factor XII, activated by contact with an electronegatively-charged surface — it is not one of the vitamin-K-dependent factors.',
        c: 'Fibrinogen (factor I) belongs to the fibrinogen group with V, VIII and XIII, activated by thrombin — its synthesis does not depend on vitamin K.',
        d: 'Plasminogen is the fibrinolytic system\'s substrate, converted to plasmin by tissue plasminogen activator — it plays no part in the vitamin-K-dependent synthesis list.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p14-q48',
      conceptKey: 'physiological-limitation-of-coagulation',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'State that protein S is the cofactor of activated protein C.',
      explanations: {
        a: 'Thrombomodulin, not protein S, is the endothelial surface protein that binds thrombin to start this pathway. Protein S is a circulating cofactor, not something the endothelium synthesises as its structural component.',
        b: 'Vitamin K, not vitamin C, is what protein S synthesis (like protein C, and factors II, VII, IX, X) depends on in the liver.',
        c: 'Protein S is the cofactor that activated protein C needs to inactivate factors V and VIII — protein C is the enzyme, protein S enables it.',
        d: 'That is what activated protein C itself does (with protein S as its cofactor) to factor V and VIII — inactivating factor IXa is not part of this pathway; factor IXa is instead removed by fibrinogen degradation products\' inhibition of thrombin further downstream, not by protein C/S directly.',
      },
    },
  ],
}
