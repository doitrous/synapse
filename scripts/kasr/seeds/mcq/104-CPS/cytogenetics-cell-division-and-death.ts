import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: "Cytogenetics — Cell Death (Necrosis vs Apoptosis)",
  modulePath: "104 CPS > Histology > Cytogenetics > Cell Division",
  articleId: "ART-104-HIS-CELL-CYCLE-RENEWAL-DEATH",

  concepts: [
    {
      key: "necrosis-vs-apoptosis.comparison",
      label: "Necrosis is pathological cell swelling and rupture; apoptosis is a programmed, active shrinkage, both ending in phagocytosis by macrophages",
      definition: "Two forms of cell death are recognised. Necrosis is a pathological condition resulting from anoxia, mechanical injury or exposure to toxins: necrotic cells and their organelles swell and burst, releasing their contents into the extracellular space. Apoptosis is an active, programmed cell death, occurring normally at the end of a cell's lifespan, and may also be pathological or physiological; apoptotic cells do not swell but instead decrease in size. By light microscopy, necrotic nuclei show pyknosis (small, darkly stained, condensed chromatin), karyorrhexis (nuclear and chromatin fragmentation by endonuclease) and karyolysis (dissolution and disappearance of the nucleus). In fate, necrotic cells degenerate and are eventually phagocytosed by macrophages; apoptotic cells break into large vesicles that are themselves phagocytosed by macrophages.",
      objective: "Contrast necrosis and apoptosis by cause, cell-volume change, nuclear changes and fate.",
      pitfall: "Assuming both forms of death end differently. Both necrotic and apoptotic material is ultimately cleared by macrophage phagocytosis — what differs is the route (swelling and rupture versus programmed vesiculation), not whether a macrophage is involved at the end.",
      subject: "fnd",
      primary: "DIS-HIS-T01",
      secondary: [],
      modulePath: "104 CPS > Histology > Cytogenetics > Cell Division",
      type: "comparison",
      aliases: ["Pyknosis", "Karyorrhexis", "Karyolysis", "Programmed cell death"],
    },
  ],

  questions: [
    {
      key: "all-characters-of-necrosis-except-66559980",
      conceptKey: "necrosis-vs-apoptosis.comparison",
      difficulty: "Easy",
      questionType: "Comparison",
      learningObjective: "State that necrosis is always pathological, never physiological — the physiological option belongs to apoptosis.",
      explanations: {
        A: "True of necrosis, so not the exception. Necrotic cells and their organelles swell and burst, releasing their contents into the extracellular space — the light-microscope description.",
        B: "True, so not the exception. Both necrotic and apoptotic cells are ultimately cleared by phagocytosis by macrophages.",
        C: "The exception, and the answer. Necrosis is a pathological condition only, resulting from anoxia, mechanical injury or toxins; being 'physiological' is what distinguishes apoptosis, an active programmed death that occurs normally at the end of a cell's life span. A common trap: assuming both forms of death end differently.",
        D: "True, so not the exception. Anoxia, mechanical injury and toxin exposure are the stated causes of necrosis.",
      },
    },
    {
      // kasr-104-author-run45: Cell Division cluster. Matches this leaf's
      // own sourced concept directly, option for option.
      key: "apoptosis-is-characterized-by-the-following-d02e77f3",
      conceptKey: "necrosis-vs-apoptosis.comparison",
      difficulty: "Easy",
      questionType: "Comparison",
      learningObjective: "State that apoptosis is an active, programmed cell death, against three statements that instead describe necrosis.",
      explanations: {
        A: "Reversed. Apoptosis is not exclusively pathological — this leaf's own concept states it 'may also be pathological or physiological', occurring normally at the end of a cell's lifespan; being purely pathological is instead true of necrosis.",
        B: "Apoptosis is an active, programmed cell death, occurring normally at the end of a cell's lifespan and, unlike necrosis, may be entirely physiological rather than always pathological.",
        C: "Reversed. Cells and organelles swelling and bursting is this leaf's own description of necrosis; apoptotic cells instead decrease in size rather than swell.",
        D: "Reversed. Anoxia, mechanical injury and toxin exposure are this leaf's own stated causes of necrosis, not of apoptosis, which is an internally programmed process rather than one triggered by external injury.",
      },
    },
    {
      key: "nuclei-become-small-dark-9d3f1c39",
      conceptKey: "necrosis-vs-apoptosis.comparison",
      difficulty: "Easy",
      questionType: "Definition",
      learningObjective: "Name pyknosis as the nuclear change of becoming small and darkly stained with condensed chromatin.",
      explanations: {
        A: "Pyknosis is the nucleus becoming small, darkly stained, with condensed chromatin. A common trap: assuming both forms of death end differently.",
        B: "Karyorrhexis is the chromatin fragmenting into pieces, not the nucleus becoming small and dark.",
        C: "Karyolysis is the nucleus dissolving and disappearing, the opposite of becoming small and darkly stained.",
        D: "Eukaryotic is a description of cell type, not a nuclear change of necrosis.",
      },
    },
    {
      key: "nuclei-their-chromatin-fragmented-by-27c5c8c7",
      conceptKey: "necrosis-vs-apoptosis.comparison",
      difficulty: "Moderate",
      questionType: "Mechanism",
      learningObjective: "Name endonuclease as the enzyme that fragments the chromatin in karyorrhexis.",
      explanations: {
        A: "Sulfatase is not the enzyme credited with chromatin fragmentation.",
        B: "Recombinase acts on DNA during genetic recombination, not on the necrotic nucleus's chromatin.",
        C: "In karyorrhexis, the nucleus and its chromatin are fragmented into pieces by an endonuclease enzyme. A common trap: assuming both forms of death end differently.",
        D: "Lipase acts on lipids, not on chromatin, and plays no part in the description of karyorrhexis.",
      },
    },
    {
      key: "nuclei-their-chromatin-fragmented-into-pieces-f5524f2a",
      conceptKey: "necrosis-vs-apoptosis.comparison",
      difficulty: "Easy",
      questionType: "Definition",
      learningObjective: "Name karyorrhexis as the term for chromatin fragmenting into pieces.",
      explanations: {
        A: "Pyknosis is the nucleus becoming small and darkly stained, not fragmenting into pieces.",
        B: "Karyorrhexis is the nucleus and its chromatin fragmenting into pieces, by an endonuclease enzyme. A common trap: assuming both forms of death end differently.",
        C: "Karyolysis is the nucleus dissolving and disappearing entirely, not breaking into visible fragments.",
        D: "Eukaryotic describes a cell type, not a nuclear change.",
      },
    },
    {
      key: "which-description-is-correct-for-karyorrhexis-74b2f9be",
      conceptKey: "necrosis-vs-apoptosis.comparison",
      difficulty: "Easy",
      questionType: "Definition",
      learningObjective: "State that karyorrhexis is the nucleus and chromatin fragmenting into pieces, distinct from pyknosis and karyolysis.",
      explanations: {
        A: "That description — small and darkly stained — is pyknosis, not karyorrhexis.",
        B: "The nuclei and chromatin swelling is not any of the three named necrotic nuclear changes; necrotic nuclei shrink and fragment or dissolve, they do not swell.",
        C: "Dissolution and disappearance of the nucleus is karyolysis, not karyorrhexis.",
        D: "Karyorrhexis is the nucleus and its chromatin fragmenting into pieces, by an endonuclease enzyme. A common trap: assuming both forms of death end differently.",
      },
    },
    {
      // kasr-104-author-run45: Cell Division cluster, excluded. Only 3
      // options survive extraction (A, B, C — no D), below the platform's
      // 4-to-5-option import contract, and the same underlying fact
      // (apoptosis is programmed cell death, not swelling, not caused by
      // toxins/anoxia) is already taught cleanly this same run via the
      // sibling row apoptosis-is-characterized-by-the-following-d02e77f3,
      // with a clean 4-option set.
      key: "concerning-apoptosis-25140e67",
      conceptKey: "necrosis-vs-apoptosis.comparison",
      difficulty: "Hard",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Only 3 lettered options survived extraction (A, B, C — option D's text is missing entirely), below the platform's 4-to-5-option import contract. The same underlying fact (apoptosis is programmed cell death, distinct from necrosis's swelling and its anoxia/toxin causes) is already taught cleanly this same run via apoptosis-is-characterized-by-the-following-d02e77f3, whose full 4-option set survived intact — no unique teaching content is lost.",
    },
  ],
}
