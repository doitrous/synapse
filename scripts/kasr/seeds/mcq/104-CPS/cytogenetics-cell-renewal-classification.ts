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
    {
      key: "one-of-the-following-has-a-pluripotential-stem-cell-aa190b7b",
      conceptKey: "specialized-cell-renewal.classification-by-ability-to-reproduce",
      difficulty: "Easy",
      questionType: "Classification",
      learningObjective: "Recognise blood cells as the continuously renewing line replaced from a pluripotential stem cell, the only option of the four that has one.",
      explanations: {
        A: "Blood cells are the department book's own example of a continuously renewing cell line, replaced throughout life from a pluripotential (multipotential) haematopoietic stem cell that can give rise to more than one specialised blood-cell type — the one option among the four that genuinely has a stem cell behind it.",
        B: "Hepatocytes are potentially renewable, not stem-cell-dependent: a mature liver cell that has left the cycle for G0 can itself re-enter the cycle and divide when replacement is needed, with no separate stem-cell population feeding it.",
        C: "Bone cells (osteocytes) are likewise potentially renewable working cells rather than end cells fed by a dedicated pluripotential stem-cell line; the actively dividing cells of bone are osteoprogenitor cells, not a pluripotential stem cell in this classification's sense.",
        D: "Nerve cells are the classic non-renewing cell — once a mature neuron is lost it is not replaced at all, which is the opposite of having a stem cell continuously producing new ones.",
      },
    },
    {
      key: "one-of-the-following-is-a-non-renewing-cell-bbe76c3a",
      conceptKey: "specialized-cell-renewal.classification-by-ability-to-reproduce",
      difficulty: "Easy",
      questionType: "Classification",
      learningObjective: "Recognise the nerve cell as the non-renewing example — never replaced once lost — against three cells with some renewal capacity.",
      explanations: {
        A: "Hepatocytes are potentially renewable: a liver cell leaves the cycle for G0 but can re-enter it and divide when the liver needs to replace lost tissue, which is why partial hepatectomy is followed by regeneration.",
        B: "Epidermal cells are continuously renewing, replaced throughout life from the stem cells of the epidermis's basal layer — the opposite of non-renewing.",
        C: "The nerve cell is the department book's example of a non-renewing cell: once a mature neuron leaves the cycle for G0 it never re-enters it, and a neuron lost to injury or disease is not replaced. A common trap: reading 'continuously renewing' as continuously dividing, when it is the stem cell behind an end cell that divides, not the end cell itself — but that mechanism does not even apply here, since no stem cell replaces a lost neuron at all.",
        D: "Cartilage cells (chondrocytes) retain some capacity to divide within the cartilage matrix and are treated as potentially renewable, not as the non-renewing example.",
      },
    },
  ],
}
