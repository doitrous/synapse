import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: "Respiratory System — Respiratory Portion Pneumocytes",
  modulePath: "104 CPS > Histology > Respiratory System > Respiratory Portion",
  articleId: "ART-104-HIS-RESPIRATORY-PORTION",

  concepts: [
    {
      key: "pneumocyte-type-i-vs-type-ii.structure-and-function",
      label: "Type I pneumocytes are flat cells covering 97% of the alveolar surface for gas exchange; type II are cuboidal surfactant-secreting stem cells",
      definition: "Type I pneumocytes (squamous alveolar cells) cover about 97% of the alveolar surface. By light microscopy they are flat squamous cells with flat nuclei and little cytoplasm; by electron microscopy they show few organelles in the perinuclear region and small pinocytic vesicles that turn over pulmonary surfactant, and they hold tight junctions with both other type I and type II cells. Their function is to provide a very thin wall for gas exchange and, through those tight junctions, to prevent leakage of tissue fluid into the alveolar cavity. Type II pneumocytes (great alveolar cells) cover only about 3% of the surface. They are cuboidal cells bulging into the air space, with central rounded nuclei and foamy cytoplasm; by electron microscopy they are rich in mitochondria, ribosomes, rough endoplasmic reticulum and a well-developed Golgi body, with membrane-bound multilamellar bodies (cytosomes) and a free surface bearing short microvilli. Their function is to secrete pulmonary surfactant and to act as the stem cell for both pneumocyte types.",
      objective: "Contrast type I and type II pneumocytes by the fraction of alveolar surface each covers, their light- and electron-microscopic appearance, and their function.",
      pitfall: "Assuming the cell covering most of the alveolar surface must be the more metabolically active one. It is the reverse: the type I cell is a thin, organelle-poor wall built purely for diffusion, while the much rarer type II cell carries the secretory machinery and is also the stem cell for both types.",
      subject: "resp",
      primary: "DIS-HIS-T03",
      secondary: ["SYS-RES-T01-S01-M01"],
      modulePath: "104 CPS > Histology > Respiratory System > Respiratory Portion",
      type: "comparison",
      aliases: ["Type I pneumocyte", "Type II pneumocyte", "Squamous alveolar cell", "Great alveolar cell"],
    },
  ],

  questions: [
    {
      key: "type-of-junction-between-type-i-and-ii-pneumocyte-is-1d92c3a1",
      conceptKey: "pneumocyte-type-i-vs-type-ii.structure-and-function",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "Name the tight junction as the connection between type I and type II pneumocytes.",
      explanations: {
        A: "A junctional complex is a broader structure of several junction types together; the specific junction between the two pneumocyte types is a tight junction alone.",
        B: "A desmosome is an anchoring junction resisting mechanical stress, not the junction between the two pneumocyte types.",
        C: "Type I pneumocytes have tight junctions with both type I and type II pneumocytes. A common trap: assuming the cell covering most of the alveolar surface must be the more metabolically active one.",
        D: "An adherens junction is a different junction type from the tight junction here.",
      },
    },
  ],
}
