import type { McqLeafSeed } from '../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: "Respiratory System — Alveolar Phagocytes and Emphysema",
  modulePath: "104 CPS > Histology > Respiratory System > Alveolar Phagocytes",
  articleId: "ART-104-HIS-RESPIRATORY-PORTION",

  concepts: [
    {
      key: "emphysema.destruction-of-alveolar-septa-by-dust-cell-enzymes",
      label: "Emphysema is permanent alveolar enlargement from destruction of the inter-alveolar septa by protease and elastase that dust cells secrete, chiefly driven by cigarette smoking",
      definition: "Emphysema is an abnormal, permanent enlargement of the alveoli. It results from destruction of the inter-alveolar septa by proteases and elastases secreted by dust cells (alveolar phagocytes that engulf inhaled dust). It is mainly caused by cigarette smoking, which inhibits the protein that normally restrains this protease and elastase destruction, so the septa-destroying enzyme activity goes unchecked.",
      objective: "Name the two enzyme classes dust cells secrete that destroy the inter-alveolar septa in emphysema, and state cigarette smoking as the book's stated chief cause, acting by disabling the protein that would otherwise inhibit them.",
      pitfall: "Attributing emphysema's septal destruction to the dust particles themselves rather than to the phagocyte's own digestive enzymes. It is the dust cell's protease and elastase, released while it processes what it has engulfed, that breaks down the septa — the inhaled dust is the trigger for the cell's response, not the destructive agent itself.",
      subject: "resp",
      primary: "DIS-HIS-T03",
      secondary: [],
      modulePath: "104 CPS > Histology > Respiratory System > Alveolar Phagocytes",
      type: "mechanism",
      aliases: ["Emphysema mechanism", "Alveolar septal destruction"],
    },
  ],

  questions: [
    {
      key: "emphysema-result-from-destruction-of-intra-alveolar-septa-by-edcfeae0",
      conceptKey: "emphysema.destruction-of-alveolar-septa-by-dust-cell-enzymes",
      difficulty: "Moderate",
      questionType: "Mechanism",
      learningObjective: "Name protease and elastase, secreted by dust cells, as the enzymes that destroy the inter-alveolar septa in emphysema.",
      explanations: {
        A: "Sulfatase is not the pair of enzymes the book names for septal destruction in emphysema; it appears in this bank in a different context (chromatin fragmentation by endonuclease, not sulfatase, in karyorrhexis).",
        B: "Histaminase is not one of the two enzymes the book credits with destroying alveolar septa — elastase is correct here, but the book pairs it with protease, not histaminase.",
        C: "Correct. The book states that emphysema results from destruction of the inter-alveolar septa by proteases and elastases secreted by dust cells, chiefly driven by cigarette smoking.",
        D: "Nuclease and lipase are not the enzyme pair the book names for this mechanism.",
      },
    },
  ],
}
