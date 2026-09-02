import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: "Anatomy Cardiovascular System — Azygos System (course and relations)",
  modulePath: "104 CPS > Anatomy > Cardiovascular System > Azygos System",
  articleId: "ART-104-ANA-THORACIC-WALL-VEINS",

  concepts: [
    // Fresh mint after a real search: find-existing.mjs "azygos vein root of
    // right lung" / "azygos vein arch" / "hilum of right lung" / "azygos vein
    // posterior mediastinum" all returned "safe to create" — no pending or
    // live record states this vessel's relation to the right lung root.
    // The one existing pinned concept this article's own related_concepts
    // names, CON-CVS-19E63D8A8E7EDA (posterior-intercostal-vein termination
    // pattern, cross-university with Alexandria's AU-MED-106-anatomy.md),
    // is a genuinely distinct fact — which vein each side's posterior
    // intercostal veins drain into, not the azygos vein's own course past
    // the right lung root — so not reused for this leaf's own bank row.
    {
      key: "azygos-vein.arch-and-relation-to-right-lung-root",
      label: "The azygos vein runs directly behind the root of the right lung in the posterior mediastinum, then arches forward just above it to end in the superior vena cava",
      definition: "In the posterior mediastinum, the azygos vein has the oesophagus and the root of the right lung immediately in front of it, the lower eight thoracic vertebrae behind (separated from them by the right posterior intercostal arteries), the right pleura and lung and the greater splanchnic nerve on its right, and the thoracic duct and the descending aorta on its left. At the level of the T4/T5 disc it turns forward as the arch of the azygos vein, passing through the superior mediastinum with the root of the right lung below it, the right pleura and lung on its right, and the oesophagus, trachea and right vagus nerve on its left, to end in the middle of the back of the superior vena cava — opposite the second right costal cartilage, just before that vein pierces the pericardium.",
      objective: "State that the azygos vein lies directly behind the root of the right lung in the posterior mediastinum before its arch turns forward to pass above (not behind) that same root on its way to the superior vena cava, and name what lies on each side of both the vein and its arch.",
      pitfall: "Assuming the azygos vein's only relation to the right lung root is the arch passing above it. Before it arches forward, the vein itself runs immediately behind the lung root in the posterior mediastinum — the relation this leaf's own exam question tests — and only afterwards turns to pass above the root on its way to the superior vena cava.",
      subject: "cvs",
      primary: "DIS-ANA-T04",
      secondary: ["SYS-RES-T01-S01-M04"],
      modulePath: "104 CPS > Anatomy > Cardiovascular System > Azygos System",
      type: "structural_description",
      aliases: ["Arch of the azygos vein", "Root of the right lung"],
    },
  ],

  questions: [
    // Bank-tagged "Veins" (a down-payment row surfaced while closing that
    // leaf, genuinely Lungs/CVS-anatomy border content — see run30's own
    // PROGRESS.md note). answerConfidence was "external-solved-book-
    // recovered" (3 agreeing occurrences) in the bank, independently
    // confirmed here by ART-104-ANA-THORACIC-WALL-VEINS's own prose.
    {
      key: "which-vessel-passes-directly-behind-the-right-hilum-01be7ae1",
      conceptKey: "azygos-vein.arch-and-relation-to-right-lung-root",
      difficulty: "Moderate",
      questionType: "Recall of a single fact",
      learningObjective: "Identify the azygos vein as the vessel running directly behind the root of the right lung, before its arch turns forward above that same root to reach the superior vena cava.",
      explanations: {
        A: "Correct. In the posterior mediastinum, the azygos vein runs immediately behind the root of the right lung — before it turns forward as the arch of the azygos vein, which passes ABOVE (not behind) the same lung root on its way to the superior vena cava.",
        B: "The internal thoracic (internal mammary) artery runs down the anterior chest wall a fingerbreadth from the sternal margin — nowhere near the root of the lung on either side.",
        C: "The hemiazygos vein is a LEFT-sided structure, crossing the midline behind the aorta and oesophagus to drain into the azygos vein; it has no relation to the right hilum at all.",
        D: "The (descending thoracic) aorta lies against the pleura and lung on its LEFT side — related to the left lung, not the right; on its right it is related instead to the oesophagus above and the thoracic duct and azygos vein below, not to the right hilum directly.",
      },
    },
  ],
}
