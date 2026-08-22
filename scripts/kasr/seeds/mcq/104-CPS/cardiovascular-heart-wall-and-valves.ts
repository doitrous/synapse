import type { McqLeafSeed } from '../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: "Histology Cardiovascular System — Heart Valves",
  modulePath: "104 CPS > Histology > Cardiovascular System > The heart",
  articleId: "ART-104-HIS-HEART-AND-VESSEL-WALL",

  concepts: [
    {
      key: "cardiac-valve.histological-structure",
      label: "A cardiac valve is a fold of endocardium: simple squamous epithelium over a dense fibrous core rich in collagen and elastic fibres",
      definition: "The valves of the heart are folds of the endocardium. Their surface, on both sides, is simple squamous epithelium continuous with the endothelium lining the chambers; their substance is a middle layer of dense fibrous connective tissue, rich in collagen and elastic fibres, that gives the valve cusp the strength to resist the pressure closing it and the flexibility to open with each cycle.",
      objective: "Describe a heart valve as a fold of endocardium and name its two histological components.",
      pitfall: "Treating a valve as a separate structure from the endocardium rather than a fold of it — the valve's surface epithelium is literally the same endothelium that lines the rest of the chamber.",
      subject: "cvs",
      primary: "DIS-HIS-T03",
      secondary: ["SYS-CVS-T01-S01"],
      modulePath: "104 CPS > Histology > Cardiovascular System > The heart",
      type: "structural_description",
      aliases: ["Heart valve histology", "Endocardial valve folds"],
    },
  ],

  questions: [
    {
      key: "valve-of-heart-is-lined-by-epithelium-xxx-f8033a90",
      conceptKey: "cardiac-valve.histological-structure",
      difficulty: "Easy",
      questionType: "Structure and function",
      learningObjective: "Name simple squamous epithelium, continuous with the endocardium, as the lining of a cardiac valve.",
      explanations: {
        A: "Stratified squamous epithelium is not the lining the book gives for a cardiac valve — valves are folds of endocardium, whose surface is simple, not stratified.",
        B: "Transitional epithelium is a urinary-tract lining, not one the book applies to the heart valves.",
        C: "Correct. The book states that heart valves, folds of the endocardium, are covered by simple squamous epithelium continuous with the endothelium, over a dense fibrous core rich in collagen and elastic fibres.",
        D: "Simple cuboidal epithelium is not the lining the book describes for the valve surface.",
      },
    },
  ],
}
