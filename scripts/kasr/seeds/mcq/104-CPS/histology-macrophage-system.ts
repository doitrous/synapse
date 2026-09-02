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
    {
      key: "heart-failure-cells-are-b0fe1a8f",
      conceptKey: "mononuclear-phagocyte-system.definition-origin-and-distribution",
      difficulty: "Moderate",
      questionType: "Recall",
      learningObjective: "Identify vital-stain uptake as the property that lets heart failure cells be demonstrated as mononuclear-phagocyte-system macrophages.",
      explanations: {
        A: "Heart failure cells are haemosiderin-laden alveolar macrophages, not ciliated epithelial cells — cilia belong to the airway lining, not to a free phagocyte within the alveolar lumen.",
        B: "Heart failure cells are found as free cells within the alveolar lumen (having accumulated there from congested pulmonary capillaries in chronic left-sided heart failure), not as a lining component of the bronchi.",
        C: "Flat cells with flat nuclei describes the thin, squamous Type I pneumocyte lining the alveolus, not the round-to-oval macrophage that is a heart failure cell.",
        D: "Heart failure cells are mononuclear-phagocyte-system macrophages that have engulfed haemoglobin breakdown products (haemosiderin) leaked from congested pulmonary capillaries, and like every cell of that system they take up a vital stain such as trypan blue or Indian ink, accumulating the dye in their cytoplasm — the same identifying property this system's article establishes for the Kupffer cell, the dust cell and every other site-specific member.",
      },
    },
    {
      key: "origin-of-dust-cell-heart-failure-cell-f46a5e1f",
      conceptKey: "mononuclear-phagocyte-system.definition-origin-and-distribution",
      difficulty: "Easy",
      questionType: "Recall",
      learningObjective: "State that the dust cell and the heart failure cell, like every mononuclear-phagocyte-system cell, differentiate from the blood monocyte.",
      explanations: {
        A: "Neutrophils are short-lived granulocytes recruited acutely to sites of infection; they are not the precursor of any mononuclear-phagocyte-system cell, dust cell or heart failure cell included.",
        B: "Lymphocytes belong to the adaptive-immunity lineage (T and B cells), developmentally and functionally distinct from the monocyte-derived phagocyte lineage that includes the dust cell and heart failure cell.",
        C: "Every cell of the mononuclear phagocyte system — the dust cell and heart failure cell of the lung included, alongside the Kupffer cell of the liver, the microglial cell of the CNS and the osteoclast of bone — differentiates from a blood monocyte. A common trap: treating each site-specific name as its own separate cell line rather than one lineage read by address.",
        D: "Eosinophils are granulocytes specialised for parasite defence and allergic reactions, not the precursor of the monocyte-derived alveolar phagocytes.",
      },
    },
    {
      key: "special-stain-for-heart-failure-cell-aaa02b1b",
      conceptKey: "mononuclear-phagocyte-system.definition-origin-and-distribution",
      difficulty: "Easy",
      questionType: "Recall",
      learningObjective: "Name trypan blue as a vital stain that demonstrates the heart failure cell, sharing this identifying feature with every mononuclear-phagocyte-system cell.",
      explanations: {
        A: "Toluidine blue is used to demonstrate the metachromatic granules of mast cells, not to vitally stain a mononuclear-phagocyte-system cell such as the heart failure cell.",
        B: "Methyl blue is not the vital stain this system's cells are demonstrated with in the department book; trypan blue (or Indian ink) is the one named.",
        C: "Azure dyes are components of Romanowsky-type blood stains used for general blood-film morphology, not the specific vital stain used to demonstrate phagocytic uptake in a living or freshly injected system.",
        D: "Trypan blue, injected as a vital stain, is taken up and accumulated in the cytoplasm of every mononuclear-phagocyte-system cell — the heart failure cell (a haemosiderin-laden alveolar macrophage) included — which is exactly the property that lets the system's members be demonstrated and mapped across all of its named sites.",
      },
    },
    // kasr-104-author-run46: this leaf's own 2 remaining bank rows (ledger's
    // second Macrophage system batch, leaf=null in the raw bank so missed
    // by a naive per-leaf scan) — duplicate-occurrence pair of the same
    // fill-in-the-blank site/name pairing, sparse reuse of this file's own
    // concept, no new mint needed.
    {
      key: "monocyte-in-while-macrophage-in-ac70f5eb",
      conceptKey: "mononuclear-phagocyte-system.definition-origin-and-distribution",
      difficulty: "Easy",
      questionType: "Fill in the blank",
      learningObjective: "Name blood as the monocyte's own site and connective tissue as the macrophage's (histiocyte's) own site, the system's two most general named locations.",
      explanations: {
        A: "The liver houses the system's von Kupffer cell and the skin houses its Langerhans cell — a different pair of this system's site-specific names, not the monocyte/macrophage pair this row asks for.",
        B: "Correct. This leaf's own sourced concept names monocytes as the system's circulating form in blood, and macrophages (histiocytes) as its resident form in loose connective tissue — the two most general of the system's eight named site/name pairs.",
        C: "The CNS houses microglia and the lung alveoli house dust cells/heart-failure cells — a different pair of this system's site-specific names, not the monocyte/macrophage pair this row asks for.",
        D: "The spleen and bone marrow sinusoids house littoral cells, and bone's Howship's lacunae house osteoclasts — a different pair of this system's site-specific names, not the monocyte/macrophage pair this row asks for.",
      },
    },
    {
      key: "vonkupffer-cell-in-while-langerhan-s-cell-in-a4a2289a",
      conceptKey: "mononuclear-phagocyte-system.definition-origin-and-distribution",
      difficulty: "Easy",
      questionType: "Fill in the blank",
      learningObjective: "Name the liver's blood sinusoids as the von Kupffer cell's own site and the skin as the Langerhans cell's own site.",
      explanations: {
        A: "Correct. This leaf's own sourced concept names von Kupffer cells as the system's name for macrophages in the liver's blood sinusoids, and Langerhans cells as its name for macrophages in the skin.",
        B: "Blood houses the system's own circulating monocyte, and loose connective tissue houses the macrophage (histiocyte) — a different pair of this system's site-specific names, not the Kupffer/Langerhans pair this row asks for.",
        C: "The CNS houses microglia and the lung alveoli house dust cells/heart-failure cells — a different pair of this system's site-specific names, not the Kupffer/Langerhans pair this row asks for.",
        D: "The spleen and bone marrow sinusoids house littoral cells, and bone's Howship's lacunae house osteoclasts — a different pair of this system's site-specific names, not the Kupffer/Langerhans pair this row asks for.",
      },
    },
  ],
}
