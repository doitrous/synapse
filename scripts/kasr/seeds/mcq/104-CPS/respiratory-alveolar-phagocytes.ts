import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: "Respiratory System — Alveolar Phagocytes and Emphysema",
  modulePath: "104 CPS > Histology > Respiratory System > Alveolar Phagocytes",
  articleId: "ART-104-HIS-RESPIRATORY-PORTION",

  concepts: [
    {
      key: "emphysema.destruction-of-alveolar-septa-by-dust-cell-enzymes",
      label: "Emphysema is permanent alveolar enlargement from destruction of the inter-alveolar septa by protease and elastase that dust cells secrete, chiefly driven by cigarette smoking",
      definition: "Emphysema is an abnormal, permanent enlargement of the alveoli. It results from destruction of the inter-alveolar septa by proteases and elastases secreted by dust cells (alveolar phagocytes that engulf inhaled dust). It is mainly caused by cigarette smoking, which inhibits the protein that normally restrains this protease and elastase destruction, so the septa-destroying enzyme activity goes unchecked.",
      objective: "Name the two enzyme classes dust cells secrete that destroy the inter-alveolar septa in emphysema, and state cigarette smoking as the stated chief cause, acting by disabling the protein that would otherwise inhibit them.",
      pitfall: "Attributing emphysema's septal destruction to the dust particles themselves rather than to the phagocyte's own digestive enzymes. It is the dust cell's protease and elastase, released while it processes what it has engulfed, that breaks down the septa — the inhaled dust is the trigger for the cell's response, not the destructive agent itself.",
      subject: "resp",
      primary: "DIS-HIS-T03",
      secondary: [],
      modulePath: "104 CPS > Histology > Respiratory System > Alveolar Phagocytes",
      type: "mechanism",
      aliases: ["Emphysema mechanism", "Alveolar septal destruction"],
    },
    {
      // Sparse reuse, not a fresh mint: this exact canonical_key already has
      // a hand-authored, pinned record in 104-CPS-histology-concepts.md
      // (CON-RES-D8B1BE3C6CFABD, module_subject "Alveolar Phagocytes" —
      // this exact leaf, same article ART-104-HIS-RESPIRATORY-PORTION),
      // found via find-existing.mjs "alveolar macrophage" before any
      // minting was attempted. Declaring the same key here makes
      // resolveConceptId resolve to the pinned id and emit a sparse reuse
      // row (article_ids/exam_signal only) — every other field below is
      // inert for the build, kept only to satisfy the McqConcept type, and
      // restated close to the pinned record's own wording so a reader is
      // not misled by a diverging copy.
      key: "alveolar-phagocytes.dust-cells-and-heart-failure-cells",
      label: "Alveolar phagocytes are blood-monocyte-derived dust cells engulfing dust and heart-failure cells engulfing red cells, cleared by three routes",
      definition: "Alveolar phagocytes are of two functional kinds, both originating from blood monocytes and both bulging from the interalveolar wall or lying free inside the alveoli, and both stained by a vital stain such as trypan blue. Dust cells engulf inhaled dust particles, which are then visible in their cytoplasm. Heart-failure cells engulf red blood cells in states of pulmonary congestion, such as congestive heart failure, and their cytoplasm turns brick-red from haemosiderin granules. Once loaded, alveolar phagocytes are cleared by one of three routes: migration into the bronchioles to be coughed up in the sputum; exit from the lung through the lymphatic drainage; or remaining in the interalveolar septa.",
      objective: "Distinguish dust cells from heart-failure cells by what each engulfs and by cytoplasmic appearance, and name their three possible fates.",
      pitfall: "Reading the brick-red cytoplasm of a heart-failure cell as a stain artefact rather than haemosiderin from digested erythrocytes.",
      subject: "resp",
      primary: "DIS-HIS-T03",
      secondary: ["SYS-RES-T01-S01-M01"],
      modulePath: "104 CPS > Histology > Respiratory System > Alveolar Phagocytes",
      type: "comparison",
      aliases: ["Dust cells", "Heart-failure cells", "Alveolar macrophages"],
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
        A: "Sulfatase is not the pair of enzymes for septal destruction in emphysema; it appears in this bank in a different context (chromatin fragmentation by endonuclease, not sulfatase, in karyorrhexis).",
        B: "Histaminase is not one of the two enzymes credited with destroying alveolar septa — elastase is correct here, but it is paired with protease, not histaminase.",
        C: "Emphysema results from destruction of the inter-alveolar septa by proteases and elastases secreted by dust cells, chiefly driven by cigarette smoking. A common trap: attributing emphysema's septal destruction to the dust particles themselves rather than to the phagocyte's own digestive enzymes.",
        D: "Nuclease and lipase are not the enzyme pair for this mechanism.",
      },
    },
    {
      // Leaf-tag mismatch: bank-tagged "A-V Connections" but genuinely this
      // leaf's own dust-cell/heart-failure-cell content.
      key: "alveolar-phagocytes-e132d402",
      conceptKey: "alveolar-phagocytes.dust-cells-and-heart-failure-cells",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "State that alveolar phagocytes are macrophages that enter the connective tissue from blood monocytes.",
      explanations: {
        A: "Rich rER and mitochondria describes a metabolically active secretory cell such as the type II pneumocyte, not the alveolar phagocyte's own defining feature.",
        B: "Alveolar phagocytes arise from blood monocytes, not from neutrophils — monocytes and neutrophils are separate leucocyte lineages.",
        C: "Alveolar phagocytes are macrophages that enter the connective tissue (and alveolar spaces) from the blood, originating from circulating monocytes — dust cells and heart-failure cells are its two functional forms.",
        D: "Staining with silver is not a defining or standard identifying feature of the alveolar phagocyte; a vital stain such as trypan blue is used instead.",
      },
    },
  ],
}
