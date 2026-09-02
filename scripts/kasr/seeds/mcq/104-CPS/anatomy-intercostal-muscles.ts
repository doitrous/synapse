import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: "The Intercostal Muscles",
  modulePath: "104 CPS > Anatomy > Intercostal Spaces",
  articleId: "ART-104-ANA-INTERCOSTAL-MUSCLES-NERVES-VESSELS",

  concepts: [
    {
      // Reuse: canonical_key already pinned in
      // docs/Kasr-Source-Imports/concept/104-CPS-anatomy-concepts.md (line 629).
      key: "intercostal-muscles.layers-and-action",
      label: "Three intercostal muscle layers run superficial to deep — external, internal, innermost — each with its own fibre direction, extent and membranous continuation, and each supplied by the corresponding intercostal nerve",
      definition: "The three muscle layers of an intercostal space run superficial to deep: the external intercostal, fibres obliquely downwards and forwards from the tubercle of the rib above to the costochondral junction, continuing anteriorly (where the muscle itself stops) as the anterior intercostal membrane; the internal intercostal, fibres obliquely downwards and backwards from the sternum to the rib angle, continuing posteriorly as the posterior intercostal membrane; and the innermost intercostal, running in the same direction as the internal but separated from it by the neurovascular bundle. All three layers are supplied by the corresponding intercostal nerve; the external layer elevates the ribs for inspiration, increasing the thoracic cavity's antero-posterior and transverse diameters, while the ribs are lowered again in quiet expiration as the muscles relax.",
      objective: "State each intercostal muscle layer's fibre direction, its extent (where it starts and where it becomes membrane instead), and its nerve supply.",
      pitfall: "Confusing the external and internal intercostal muscles' fibre directions or membranous continuations. External: downwards and forwards, continuing anteriorly as the anterior intercostal membrane. Internal: downwards and backwards, continuing posteriorly as the posterior intercostal membrane — reversing either pairing is the single most common error in this chapter.",
      subject: "resp",
      primary: "DIS-ANA-T04",
      secondary: [],
      modulePath: "104 CPS > Anatomy > Intercostal Spaces",
      type: "structural_description",
      aliases: ["External intercostal muscle", "Internal intercostal muscle", "Innermost intercostal muscle", "Anterior intercostal membrane", "Posterior intercostal membrane"],
    },
  ],

  questions: [
    {
      key: "external-intercostal-muscle-select-the-correct-statement-501f3257",
      conceptKey: "intercostal-muscles.layers-and-action",
      difficulty: "Moderate",
      questionType: "Recall",
      learningObjective: "State that the external intercostal muscle itself extends only as far forwards as the costochondral junction, continuing onward as membrane rather than muscle.",
      explanations: {
        A: "The external intercostal muscle is innervated by the corresponding intercostal nerve — the ANTERIOR (ventral) primary ramus of the thoracic spinal nerve — not by any posterior ramus, which instead supplies the muscles and skin of the back.",
        B: "This is the correct answer. The external intercostal muscle's fleshy fibres run from the tubercle of the rib above only as far forwards as the costochondral junction; beyond that point it continues as the anterior intercostal membrane, no longer as muscle.",
        C: "The external intercostal muscle attaches to the TUBERCLE of the rib above, not the neck of the rib — the tubercle sits lateral to the neck, at the point where the rib's shaft begins.",
        D: "The external intercostal muscle's fibres run downwards and FORWARDS, not downwards and backwards — that fibre direction instead belongs to the internal intercostal muscle, one layer deeper.",
      },
    },
    {
      key: "regarding-intercostal-spaces-choose-the-correct-statement-5b563ce5",
      conceptKey: "intercostal-muscles.layers-and-action",
      difficulty: "Moderate",
      questionType: "Recall",
      learningObjective: "State the external intercostal muscle's fibre direction as downwards and forwards.",
      explanations: {
        A: "This is the correct answer. The external intercostal muscle's fibres run obliquely downwards and forwards, from the tubercle of the rib above to the costochondral junction of the rib below.",
        B: "Each intercostal space contains only a small number of anterior intercostal arteries (typically one main vessel per space, from the internal thoracic or musculophrenic artery), not five — five is a figure that belongs to no structure described in this chapter.",
        C: "The posterior intercostal arteries supplying the first two spaces arise from the superior intercostal artery (itself a costocervical-trunk branch of the subclavian artery), not from the descending aorta — only the third to eleventh spaces' posterior intercostal arteries come from the descending thoracic aorta.",
        D: "Not all anterior intercostal veins drain into the internal thoracic vein directly — only those of the upper three spaces do; the middle and lower spaces drain into it only indirectly, via the venae comitantes of the internal thoracic and musculophrenic arteries.",
      },
    },
    {
      key: "regarding-the-external-intercostal-muscle-the-following-stat-694db6e0",
      conceptKey: "intercostal-muscles.layers-and-action",
      difficulty: "Moderate",
      questionType: "Recall of a false statement",
      learningObjective: "State that the external intercostal muscle continues as the ANTERIOR, not the posterior, intercostal membrane.",
      explanations: {
        A: "True, so not the exception. The external intercostal muscle elevates the ribs and is a muscle of inspiration.",
        B: "True, so not the exception. The external intercostal muscle's fibres run obliquely downwards and forwards.",
        C: "This is the exception, and the answer. The external intercostal muscle continues anteriorly, beyond the costochondral junction, as the ANTERIOR intercostal membrane — it is the INTERNAL intercostal muscle that continues posteriorly as the posterior intercostal membrane, the opposite pairing.",
        D: "True, so not the exception. The external intercostal muscle extends from the tubercle of the rib above to the costochondral junction, where the anterior intercostal membrane takes over.",
        E: "True, so not the exception. Like all three intercostal layers, the external intercostal muscle is supplied by the corresponding intercostal nerve.",
      },
    },
    {
      key: "the-action-of-the-ribs-during-breathing-67046c81",
      conceptKey: "intercostal-muscles.layers-and-action",
      difficulty: "Easy",
      questionType: "Recall",
      learningObjective: "State that elevating the ribs during inspiration increases both the antero-posterior and the transverse diameters of the thoracic cavity.",
      explanations: {
        A: "The larynx is not carried by rib movement at all — laryngeal elevation and depression are actions of the extrinsic laryngeal muscles during swallowing and phonation, unrelated to the ribs' own respiratory action.",
        B: "The diaphragm contracts during INSPIRATION, not expiration, and diaphragmatic contraction is a separate action from the ribs' own movement, even though the two work together to expand the thoracic cavity.",
        C: "This is the correct answer. Elevating the ribs — the external intercostal muscles' own action during inspiration — increases both the antero-posterior diameter (the \"pump-handle\" movement of the upper ribs and sternum) and the transverse diameter (the \"bucket-handle\" movement of the lower ribs) of the thoracic cavity, enlarging it to draw air in.",
        D: "The ribs are ELEVATED, not lowered, during inhalation — it is during quiet expiration that they are lowered again, as the external intercostal muscles relax and elastic recoil takes over.",
      },
    },
  ],
}
