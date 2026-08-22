import type { McqLeafSeed } from '../mcq.ts'

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
        A: "True of necrosis, so not the exception. Necrotic cells and their organelles swell and burst, releasing their contents into the extracellular space — the book's own light-microscope description.",
        B: "True, so not the exception. Both necrotic and apoptotic cells are ultimately cleared by phagocytosis by macrophages.",
        C: "The exception, and the answer. The book defines necrosis as a pathological condition only, resulting from anoxia, mechanical injury or toxins; being 'physiological' is what distinguishes apoptosis, an active programmed death that occurs normally at the end of a cell's life span.",
        D: "True, so not the exception. Anoxia, mechanical injury and toxin exposure are the book's own stated causes of necrosis.",
      },
    },
    {
      key: "nuclei-become-small-dark-9d3f1c39",
      conceptKey: "necrosis-vs-apoptosis.comparison",
      difficulty: "Easy",
      questionType: "Definition",
      learningObjective: "Name pyknosis as the nuclear change of becoming small and darkly stained with condensed chromatin.",
      explanations: {
        A: "Correct. The book defines pyknosis as the nucleus becoming small, darkly stained, with condensed chromatin.",
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
        A: "Sulfatase is not the enzyme the book credits with chromatin fragmentation.",
        B: "Recombinase acts on DNA during genetic recombination, not on the necrotic nucleus's chromatin.",
        C: "Correct. The book states that in karyorrhexis, the nucleus and its chromatin are fragmented into pieces by an endonuclease enzyme.",
        D: "Lipase acts on lipids, not on chromatin, and plays no part in the book's description of karyorrhexis.",
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
        B: "Correct. The book defines karyorrhexis as the nucleus and its chromatin fragmenting into pieces, by an endonuclease enzyme.",
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
        B: "The nuclei and chromatin swelling is not any of the three necrotic nuclear changes the book names; necrotic nuclei shrink and fragment or dissolve, they do not swell.",
        C: "Dissolution and disappearance of the nucleus is karyolysis, not karyorrhexis.",
        D: "Correct. The book defines karyorrhexis as the nucleus and its chromatin fragmenting into pieces, by an endonuclease enzyme.",
      },
    },
  ],
}
