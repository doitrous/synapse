import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: "Cytogenetics — Cell Renewal Classification",
  modulePath: "104 CPS > Histology > Cytogenetics > The Cell Cycle",
  articleId: "ART-104-HIS-CELL-RENEWAL-AND-ANEUPLOIDY",

  concepts: [
    {
      key: "specialized-cell-renewal.classification-by-ability-to-reproduce",
      label: "Specialized cells are non-renewing, potentially renewable, or continuously renewing from stem cells",
      definition: "Most working specialized cells spend a prolonged G1 and are not in active cycle. Non-renewing cells leave the cycle in G1 for G0 permanently and never divide again, and are not replaced when lost — cardiac muscle and nerve cells. Potentially renewable cells enter G0 but can re-enter the cycle when replacement is needed, a transient exit — liver cells after destruction or partial removal. Continuously renewing cells are end cells that cannot themselves divide but are replaced from stem cells — blood cells and sperms.",
      objective: "Classify specialized cells by their ability to reproduce and give one example of each class.",
      pitfall: "Reading 'continuously renewing' as continuously dividing. The end cell does not divide at all; it is the stem cell behind it that does.",
      subject: "fnd",
      primary: "DIS-HIS-T01",
      secondary: [],
      modulePath: "104 CPS > Histology > Cytogenetics > The Cell Cycle",
      type: "classification",
      aliases: ["Cell renewal", "Non-renewing, potentially renewable and continuously renewing cells"],
    },
  ],

  questions: [
    {
      key: "sperms-are-example-for-dfd7e1d4",
      conceptKey: "specialized-cell-renewal.classification-by-ability-to-reproduce",
      difficulty: "Easy",
      questionType: "Classification",
      learningObjective: "Name sperms as the second example of a continuously renewing cell, alongside blood cells.",
      explanations: {
        A: "Non-renewing cells are never replaced once lost; sperms, by contrast, are continually produced from stem cells throughout reproductive life.",
        B: "A potentially renewable cell can itself return to the cycle to divide, unlike the end-stage, non-dividing sperm.",
        C: "Sperms, with blood cells, are the example of continuously renewing cells — end cells that cannot divide but are replaced from stem cells. A common trap: reading 'continuously renewing' as continuously dividing.",
        D: "Not applicable — a correct answer is listed among the options.",
      },
    },
  ],
}
