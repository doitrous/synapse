import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: "Lymphatic and Macrophage System — Thymus",
  modulePath: "104 CPS > Histology > Lymphatic and Macrophage System > Thymus",
  articleId: "ART-104-HIS-LYMPHOID-ORGANS",

  concepts: [
    {
      key: "thymus.dual-origin-and-epithelial-reticular-cells",
      label: "The thymus has a double embryological origin — mesodermal T-lymphocytes and endodermal epithelial reticular cells — and the epithelial reticular cells, not fibroblasts, form its reticular background and blood-thymic barrier",
      definition: "The thymus is a primary lymphoid organ with an endocrine function, and unlike the lymph node and spleen it has a double origin: its lymphocytes (the thymocytes) are mesodermal, while its epithelial reticular cells are endodermal. This is the thymus's distinguishing structural feature — the reticular background that in a lymph node or spleen is made of ordinary connective-tissue reticular cells and fibres is, in the thymus, made of these epithelial reticular cells instead, and they produce no reticular fibre. The epithelial reticular cells surround the cortical thymocytes and macrophages, form a complete sheathing layer with tight junctions between them as part of the blood-thymic barrier (together with continuous capillary endothelium, its thick basal lamina, and a macrophage-bearing perivascular space), and secrete the thymic hormones that stimulate T-lymphocyte maturation and activity.",
      objective: "State the thymus's double embryological origin and identify the epithelial reticular cell, not the fibroblast, as the endodermal cell that forms its reticular stroma and blood-thymic barrier.",
      pitfall: "Assuming the thymus's reticular framework is built the same way as the lymph node's or spleen's, by mesenchymal reticular cells and reticular fibres. The thymus is the one lymphoid organ where that framework is epithelial and endodermal, produces no reticular fibre, and doubles as part of the blood-thymic barrier — a structural difference listed as one of the thymus's 'special features'.",
      subject: "haem",
      primary: "DIS-HIS-T02",
      secondary: [],
      modulePath: "104 CPS > Histology > Lymphatic and Macrophage System > Thymus",
      type: "structural_description",
      aliases: ["Epithelial reticular cells", "Blood-thymic barrier", "Thymus origin"],
    },
  ],

  questions: [
    {
      key: "origin-of-epithelial-reticular-cell-4455e8b2",
      conceptKey: "thymus.dual-origin-and-epithelial-reticular-cells",
      difficulty: "Moderate",
      questionType: "Definition",
      learningObjective: "State the endodermal origin of the thymus's epithelial reticular cells, against the mesodermal origin of its lymphocytes.",
      explanations: {
        A: "Mesodermal is the origin of the thymus's lymphocytes, not its epithelial reticular cells — the thymus a double origin, one for each component.",
        B: "Ectodermal is not either of the two origins for the thymus.",
        C: "The thymus has a double origin — mesodermal giving rise to lymphocytes, and endodermal giving rise to epithelial reticular cells. A common trap: assuming the thymus's reticular framework is built the same way as the lymph node's or spleen's, by mesenchymal reticular cells and reticular fibres.",
        D: "Not applicable — a correct answer is listed among the options.",
      },
    },
  ],
}
