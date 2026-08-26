import type { McqLeafSeed } from '../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: "Lymphatic and Macrophage System — Lymph Node",
  modulePath: "104 CPS > Histology > Lymphatic and Macrophage System > Lymph node",
  articleId: "ART-104-HIS-LYMPHOID-ORGANS",

  concepts: [
    {
      key: "lymph-node.cortex-medulla-zones-and-cell-distribution",
      label: "The lymph node's cortex holds B-cell-dominant follicles and macrophage-lined sinuses around a T-cell-only paracortex, and its medulla holds B-lymphocyte cords and macrophage-lined medullary sinuses",
      definition: "The lymph node is organised into a cortex and a medulla. The cortex's outer part carries lymphatic nodules (follicles) — primary follicles of mainly B-lymphocytes with a few T-lymphocytes, and, once antigen has driven some B-lymphocytes to enlarge and aggregate, secondary follicles with a peripheral dark region of small lymphocytes around a pale germinal centre of large activated B-lymphocytes, plasma cells and a few macrophages and T-lymphocytes. Cortical (subcapsular and trabecular) lymph sinuses separate the follicles from the capsule and trabeculae and are lined by endothelial cells and macrophages, carrying B-lymphocytes, plasma cells, macrophages and a few T-cells. Between the cortex and the medulla lies the paracortex, the thymus-dependent zone: unlike the follicles and sinuses around it, it holds only T-lymphocytes, which have migrated in from the thymus through post-capillary venules. The medulla is medullary cords — irregular branching cords of B-lymphocytes, plasma cells and macrophages, sometimes continuous with the cortical follicles — separated by medullary sinuses, which are lined by endothelium and macrophages and filter the lymph arriving from the cortical sinuses before it leaves at the hilum.",
      objective: "Place B-lymphocytes, T-lymphocytes, plasma cells and macrophages correctly among the lymph node's cortical follicles, cortical sinuses, paracortex and medullary cords/sinuses, and identify the paracortex as the one zone that is T-lymphocytes only.",
      pitfall: "Assuming every named cortical or medullary compartment is B-lymphocyte territory. The paracortex is the one exception the book states explicitly — it is the thymus-dependent zone, populated only by T-lymphocytes that have migrated from the thymus, with no follicle and no germinal centre of its own.",
      subject: "haem",
      primary: "DIS-HIS-T02",
      secondary: [],
      modulePath: "104 CPS > Histology > Lymphatic and Macrophage System > Lymph node",
      type: "structural_description",
      aliases: ["Lymph node cortex and medulla", "Lymphoid follicle", "Paracortex", "Thymus-dependent zone"],
    },
  ],

  questions: [
    {
      key: "all-contain-b-lymph-except-with-t-lymphocyte-cafe31f9",
      conceptKey: "lymph-node.cortex-medulla-zones-and-cell-distribution",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "Identify the paracortex as the lymph node's one zone that carries only T-lymphocytes, against the B-lymphocyte-carrying follicles, sinuses and medullary cords around it.",
      explanations: {
        A: "Contains B-lymphocytes, so not the exception. A primary follicle is formed mainly of B-lymphocytes with a few T-lymphocytes.",
        B: "Contains B-lymphocytes, so not the exception. A secondary follicle's germinal centre carries large activated B-lymphocytes and plasma cells, alongside macrophages and a few T-lymphocytes.",
        C: "Contains B-lymphocytes, so not the exception. The medullary cords are B-lymphocytes, plasma cells and macrophages — no zone of the medulla is T-cell only.",
        D: "Correct — the exception, and the true answer. The paracortex is the thymus-dependent zone: unlike the follicles, sinuses and cords around it, it carries only T-lymphocytes, which have migrated in from the thymus through post-capillary venules. A common trap: assuming every named cortical or medullary compartment is B-lymphocyte territory.",
      },
      answerOverride: "D",
      answerOverrideReason: "The extracted key (C, medullary cords) contradicts the book. Histology department book p16-17: medullary cords are explicitly 'B-lymphocytes, plasma cells and macrophages' — a B-lymphocyte-carrying compartment, not the T-only exception the stem asks for. The paracortex (p16) is the book's own T-lymphocyte-only zone ('the thymus dependant zone... it contains T-lymphocytes which have migrated from thymus'), which is the structure the stem is actually describing.",
    },
    {
      key: "have-peripheral-dark-small-lymph-with-germinal-center-that-h-cd96123a",
      conceptKey: "lymph-node.cortex-medulla-zones-and-cell-distribution",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "Recognise the secondary follicle by its peripheral dark small-lymphocyte region around a germinal centre of large B-lymphocytes, with few T-lymphocytes.",
      explanations: {
        A: "A primary follicle has no germinal centre at all — it is formed of aggregated cells, mainly B-lymphocytes, before antigen exposure produces the germinal centre the stem describes.",
        B: "Correct. The book describes the secondary follicle exactly this way: peripheral dark regions of small lymphocytes around a pale germinal centre containing large activated B-lymphocytes and plasma cells, with macrophages and a few T-lymphocytes. A common trap: assuming every named cortical or medullary compartment is B-lymphocyte territory.",
        C: "A cortical sinus is a lymph-filled space lined by endothelium and macrophages, not a lymphocyte aggregation with a germinal centre.",
        D: "The paracortex has no germinal centre and no B-lymphocytes at all — it is the thymus-dependent zone of T-lymphocytes only, the opposite of the structure the stem describes.",
      },
      answerOverride: "B",
      answerOverrideReason: "The printed key (D, paracortex) contradicts the book. Histology department book p16 gives this exact description — peripheral dark small lymphocytes around a germinal centre of large activated B-lymphocytes, with few T-lymphocytes — as the secondary lymphatic nodule (follicle). The paracortex (also p16) is described as containing only T-lymphocytes with no germinal centre and no B-lymphocyte population at all, so it cannot be what the stem is describing.",
    },
    {
      key: "is-lined-by-endothelium-macrophage-d15029d8",
      conceptKey: "lymph-node.cortex-medulla-zones-and-cell-distribution",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "Recognise that both the lymph node's cortical (subcapsular and trabecular) sinuses and its medullary sinuses share an endothelium-and-macrophage lining.",
      explanations: {
        A: "True of the trabecular sinus, so not a wrong option on its own — but it is only one of the sinus types the book gives this lining, not the single correct answer to a question with 'all the above' available.",
        B: "True of the medullary sinus too, for the same reason — correct as far as it goes, but not the most complete answer available.",
        C: "True of the subcapsular sinus as well — again correct but partial, since the book gives this same lining to more than one sinus type.",
        D: "Correct. The book states the cortical lymph sinuses — both subcapsular and trabecular — are lined with endothelial cells and macrophages, and separately that the medullary sinuses are lined with endothelium and macrophages. All three named sinus types share this lining, so 'all the above' is the answer the book actually supports.",
      },
      answerOverride: "D",
      answerOverrideReason: "The printed key (C, subcapsular sinus alone) understates what the book says. Histology department book p16 states the cortical lymph sinuses (which it explicitly defines as both subcapsular and trabecular) are 'lined with endothelial cells and macrophages,' and p17 states the medullary sinuses are 'lined with endothelium and macrophages' in the same words. Since the book gives all three named sinuses (trabecular, medullary, subcapsular) the identical lining, without singling one out, 'all the above' is the answer consistent with the source, not one sinus alone.",
    },
  ],
}
