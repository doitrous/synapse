import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: "Macrophage system",
  modulePath: "104 CPS > Histology > Lymphatic and Macrophage System > Macrophage System",
  articleId: "ART-104-HIS-MACROPHAGE-SYSTEM",

  concepts: [
    {
      key: "mononuclear-phagocyte-system.definition-origin-and-distribution",
      label: "Every cell of the mononuclear phagocyte system differentiates from a blood monocyte, takes up a vital stain, and shares a histological signature of irregular pseudopodial surfaces, prominent Golgi/rER and an eccentric kidney-shaped nucleus",
      definition: "The macrophage system, or mononuclear phagocytic system, is a group of highly phagocytic cells widely distributed in the body, constituting an important defence mechanism. All of its cells differentiate from blood monocytes. They take up a vital stain, such as trypan blue or Indian ink, injected into an animal, accumulating the dye in their cytoplasm. Histologically they have irregular surfaces with many pseudopodia, a well-developed Golgi complex, many lysosomes and residual bodies, prominent rough endoplasmic reticulum, and an eccentric oval or kidney-shaped nucleus. Their functions are phagocytosis and destruction of cell debris, dead cells and bacteria; antigen processing and presentation; destruction of aged erythrocytes with bile production and iron metabolism; and, after injury or inflammation, helping tissue healing by removing debris. The system is distributed by site under separate names: monocytes in blood; macrophages (histiocytes) in loose connective tissue and in the reticular stroma of bone marrow, spleen and lymph node; littoral cells in the walls of blood sinusoids of spleen and bone marrow; von Kupffer cells in the blood sinusoids of the liver; Langerhans cells in the skin; microglia in the central nervous system; dust cells and heart-failure cells in the lung alveoli; and osteoclasts in the Howship's lacunae of bone.",
      objective: "Define the mononuclear phagocyte system by its origin, its histological features and its vital-stain behaviour, and name its cell type at each of the eight listed sites.",
      pitfall: "Treating the eight named cell types (Kupffer cell, dust cell, microglia, osteoclast, and so on) as eight separate cell lines rather than one monocyte-derived lineage under site-specific names.",
      subject: "haem",
      primary: "DIS-HIS-T03",
      secondary: ["SYS-HEM"],
      modulePath: "104 CPS > Histology > Lymphatic and Macrophage System > Macrophage System",
      type: "structural_description",
      aliases: ["Mononuclear phagocyte system", "Macrophage system"],
    },
  ],

  questions: [
    {
      key: "histological-characteristics-of-the-mononuclear-phagocytic-c-6ebb7e08",
      conceptKey: "mononuclear-phagocyte-system.definition-origin-and-distribution",
      difficulty: "Moderate",
      questionType: "Recall",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Only 3 options survived extraction (A, C, D — option B is missing entirely, a recurring OCR/page-bleed pattern in this bank), below the platform's 4-to-5-option contract for an importable MCQ. Excluded as structurally unimportable rather than padded with an invented fourth option.",
    },
    {
      key: "regarding-the-mononuclear-phagocytic-system-0c3848e5",
      conceptKey: "mononuclear-phagocyte-system.definition-origin-and-distribution",
      difficulty: "Easy",
      questionType: "Recall",
      learningObjective: "State that vital-stain uptake (e.g. trypan blue) is a defining feature of the mononuclear phagocyte system.",
      explanations: {
        A: "Every cell of the mononuclear phagocyte system differentiates from a blood monocyte, not from a B lymphocyte — B lymphocytes belong to a separate, antibody-producing lineage entirely.",
        B: "This is the correct answer. Cells of the mononuclear phagocyte system take up a vital stain, such as trypan blue or Indian ink injected into an animal, accumulating the dye in their cytoplasm — this vital-stain behaviour is how the system was first mapped histologically across its many named sites.",
        C: "The mononuclear phagocyte system's cells have an eccentric oval or kidney-shaped nucleus, not eccentric kidney-shaped alone without qualification of position — but more importantly, this feature describes their nuclear morphology, not the vital-stain uptake this question's stem specifically distinguishes as the answer.",
        D: "Plasma cells are terminally differentiated B lymphocytes that secrete antibody — they are not part of the monocyte-derived mononuclear phagocyte system, which is a functionally and developmentally distinct lineage.",
      },
    },
  ],
}
