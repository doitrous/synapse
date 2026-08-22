import type { McqLeafSeed } from '../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: "Cytogenetics — Mitosis and the Mitotic Spindle",
  modulePath: "104 CPS > Histology > Cytogenetics > Cell Division",
  articleId: "ART-104-HIS-MITOSIS-AND-MEIOSIS",

  concepts: [
    {
      key: "mitosis.four-stages-prophase-to-telophase",
      label: "Mitosis is prophase, metaphase, anaphase and telophase, producing two genetically identical daughter cells",
      definition: "Mitosis divides the nucleus to produce two daughter cells genetically identical to the parent, in four stages. Prophase: the 46 d-chromosomes shorten, thicken and stain more darkly, becoming visible as fine threads; the nucleoli and nuclear envelope disappear; centrioles move to opposite poles as cytoplasmic microtubules radiate from the microtubule-organising centre around them; and these microtubules organise into a spindle. Metaphase: chromosomes migrate to the equatorial metaphase plate, and a dense plaque, the kinetochore, develops at each chromosome's centromere as the attachment site for chromosomal microtubules. The mitotic spindle's microtubules are of three kinds: cytoplasmic microtubules, which elongate the cell; chromosomal microtubules, attached to kinetochores, which arrange the chromosomes at the equator; and astral microtubules, star-like around the centrioles, which establish the spindle's axis. Anaphase: each d-chromosome splits longitudinally at the centromere, its two sister chromatids pulled to opposite poles by the chromosomal microtubules as the cytoplasmic microtubules elongate. Telophase: a cleavage furrow forms at the equator by contraction of actin filaments, dividing the cytoplasm in two; the 46 chromatids (s-chromosomes) of each new cell lengthen, uncoil and lose visibility; nuclear envelopes re-form; and nucleoli reappear.",
      objective: "Name mitosis's four stages in order and state, for each, what happens to the chromosomes, the nuclear envelope/nucleoli and the spindle.",
      pitfall: "Describing the kinetochore as the centromere itself. The kinetochore is a protein plaque that develops at the centromere in metaphase specifically to serve as the microtubule attachment site — the centromere is the chromosomal constriction it sits on.",
      subject: "fnd",
      primary: "DIS-HIS-T01",
      secondary: [],
      modulePath: "104 CPS > Histology > Cytogenetics > Cell Division",
      type: "mechanism",
      aliases: ["Prophase, metaphase, anaphase, telophase", "Mitotic spindle", "Kinetochore"],
    },
  ],

  questions: [
    {
      key: "non-continuous-attached-to-kinetochore-46e04af6",
      conceptKey: "mitosis.four-stages-prophase-to-telophase",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "Name chromosomal microtubules as the discontinuous spindle fibres attached to each chromosome's kinetochore.",
      explanations: {
        A: "Cytoplasmic microtubules run the length of the cell to drive its elongation; they are not the microtubules that attach at the kinetochore.",
        B: "Astral microtubules radiate star-like around the centrioles to establish the spindle's axis — they do not attach to kinetochores either.",
        C: "Correct. The book describes chromosomal microtubules as attached to the kinetochores, arranging the chromosomes at the metaphase plate — a discontinuous set of fibres running only from pole to kinetochore.",
        D: "Not applicable — a correct answer is listed among the options.",
      },
    },
    {
      key: "star-like-fashion-around-centriole-1ecfb67e",
      conceptKey: "mitosis.four-stages-prophase-to-telophase",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "Name astral microtubules as the star-shaped fibres around the centrioles that set the mitotic spindle's axis.",
      explanations: {
        A: "Cytoplasmic microtubules elongate the cell; they do not form the star-shaped pattern around the centrioles.",
        B: "Correct. The book describes astral microtubules as arranged in a star-like fashion around the centrioles, establishing the axis of the spindle.",
        C: "Chromosomal microtubules attach to the kinetochores to arrange chromosomes at the metaphase plate — a different, non-astral pattern.",
        D: "Not applicable — a correct answer is listed among the options.",
      },
    },
  ],
}
