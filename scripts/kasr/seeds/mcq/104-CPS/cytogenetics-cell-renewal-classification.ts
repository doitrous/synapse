import type { McqLeafSeed } from '../mcq.ts'

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
      key: "one-of-the-following-is-a-non-renewing-cell-bbe76c3a",
      conceptKey: "specialized-cell-renewal.classification-by-ability-to-reproduce",
      difficulty: "Easy",
      questionType: "Classification",
      learningObjective: "Name the nerve cell as the book's example of a non-renewing cell, alongside heart muscle.",
      explanations: {
        A: "Hepatocytes are potentially renewable — they leave the cycle for G0 but can return to it if the liver needs replacement.",
        B: "Epidermal cells are continuously renewing, replaced from a stem-cell population, not non-renewing themselves.",
        C: "Correct. The book names nerve cells, with heart muscle, as its example of a non-renewing cell — one that leaves the cycle in G1 permanently and, if lost, is never replaced.",
        D: "Cartilage cells are not the book's stated example for either category on this list.",
      },
    },
    {
      key: "cannot-divide-but-replaced-from-stem-cell-such-as-blood-cell-142667f7",
      conceptKey: "specialized-cell-renewal.classification-by-ability-to-reproduce",
      difficulty: "Easy",
      questionType: "Classification",
      learningObjective: "Identify continuously renewing cells as end cells that cannot divide but are replaced from a stem-cell population, using the book's blood-cell example.",
      explanations: {
        A: "A non-renewing cell is not replaced at all once lost — the stem says these cells are replaced, which rules this category out.",
        B: "A potentially renewable cell (like a hepatocyte) can itself return to the cycle to divide; the stem describes a cell that cannot divide and needs a stem-cell source instead.",
        C: "Correct. The book defines continuously renewing cells as end cells that cannot divide themselves but can be replaced from stem cells, naming blood cells (and sperms) as its example.",
        D: "Not applicable — a correct category is listed among the options.",
      },
    },
    {
      key: "liver-cells-is-example-for-18d16db7",
      conceptKey: "specialized-cell-renewal.classification-by-ability-to-reproduce",
      difficulty: "Easy",
      questionType: "Classification",
      learningObjective: "Name liver cells as the book's example of a potentially renewable cell.",
      explanations: {
        A: "Non-renewing cells never divide again once they leave the cycle — the book's example of that category is heart muscle and nerve cells, not liver cells.",
        B: "Correct. The book gives liver cells as its example of potentially renewable cells: they leave the cycle for G0 but can return to it and divide again if the liver is destroyed or partially removed.",
        C: "Continuously renewing cells cannot divide themselves and are replaced from a stem-cell source — the book's example is blood cells and sperms, a different mechanism from the liver's own capacity to re-enter the cycle.",
        D: "Not applicable — a correct answer is listed among the options.",
      },
    },
    {
      key: "non-renewing-cells-are-characterized-by-all-the-following-ex-5836a5c6",
      conceptKey: "specialized-cell-renewal.classification-by-ability-to-reproduce",
      difficulty: "Moderate",
      questionType: "Classification",
      learningObjective: "State that a non-renewing cell's exit from the cycle is permanent, never a return to divide again.",
      explanations: {
        A: "True of non-renewing cells, so not the exception. They leave the cycle while in G1 and go to G0.",
        B: "True, so not the exception. The book describes this exit as a permanent one — the cell never divides again.",
        C: "The exception, and the answer. A non-renewing cell's exit is permanent; returning to the cycle on need for replacement is exactly what defines a potentially renewable cell instead, such as the liver cell.",
        D: "True, so not the exception. Heart muscle and nerve cells are the book's own examples of non-renewing cells.",
      },
    },
    {
      key: "one-of-the-following-is-a-potentially-renewable-cell-04f21553",
      conceptKey: "specialized-cell-renewal.classification-by-ability-to-reproduce",
      difficulty: "Easy",
      questionType: "Classification",
      learningObjective: "Name the liver cell as the book's example of a potentially renewable cell.",
      explanations: {
        A: "Correct. The book gives the liver cell as its example of a potentially renewable cell — one that leaves the cycle for G0 but returns to it if the liver needs replacement.",
        B: "The skin epidermal cell is the book's example of a continuously renewing cell, not a potentially renewable one — it cannot divide itself and needs a stem-cell source.",
        C: "The plasma cell is a terminally differentiated cell, not the book's stated example for either renewal category.",
        D: "Macrophages are not the book's stated example of a potentially renewable cell.",
      },
    },
    {
      key: "sperms-are-example-for-dfd7e1d4",
      conceptKey: "specialized-cell-renewal.classification-by-ability-to-reproduce",
      difficulty: "Easy",
      questionType: "Classification",
      learningObjective: "Name sperms as the book's second example of a continuously renewing cell, alongside blood cells.",
      explanations: {
        A: "Non-renewing cells are never replaced once lost; sperms, by contrast, are continually produced from stem cells throughout reproductive life.",
        B: "A potentially renewable cell can itself return to the cycle to divide, unlike the end-stage, non-dividing sperm.",
        C: "Correct. The book names sperms, with blood cells, as its example of continuously renewing cells — end cells that cannot divide but are replaced from stem cells.",
        D: "Not applicable — a correct answer is listed among the options.",
      },
    },
  ],
}
