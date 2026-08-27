import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: "Physiology Cardiovascular System — Hemorrhagic Shock Compensation",
  modulePath: "104 CPS > Physiology > Cardiovascular System > Basic Mechanisms of Circulatory Control",
  articleId: "ART-104-PHY-NERVOUS-AND-CHEMORECEPTOR-CONTROL",

  concepts: [
    {
      key: "hemorrhagic-shock.rapid-compensatory-hormone-response",
      label: "The rapid humoral response to hemorrhagic shock raises catecholamines, angiotensin II and vasopressin, not atrial natriuretic peptide, which needs the atrial stretch that hypovolaemia removes",
      definition: "Hemorrhage lowers arterial blood pressure and stimulates rapid neural and humoral compensatory mechanisms. The humoral arm raises three hormones: catecholamines (adrenal medulla and sympathetic terminals, stimulating the brain-stem reticular formation and driving respiration and restlessness), angiotensin II (from increased renin secretion, causing vasoconstriction, thirst and aldosterone secretion), and vasopressin (from decreased discharge of atrial low-pressure receptors, causing renal water retention). Atrial natriuretic peptide runs the other way: it is secreted when increased extracellular fluid volume stretches the atrial muscle, so it acts to lower blood pressure by increasing renal sodium excretion. Hemorrhage decreases venous return and atrial filling, which removes the stretch stimulus for ANP rather than providing one — its secretion does not rise as part of the rapid compensatory response.",
      objective: "Name the three hormones whose secretion rises as part of the rapid humoral compensation for hemorrhagic shock, and explain why atrial natriuretic peptide is not a fourth.",
      pitfall: "Assuming every hormone with a role in blood-pressure regulation rises together in hypovolaemia. ANP is stretch-triggered — it needs a full, distended atrium — so a state that shrinks venous return and atrial filling silences it rather than raising it, the opposite direction to catecholamines, angiotensin II and vasopressin.",
      subject: "cvs",
      primary: "DIS-PHY-T02",
      secondary: [],
      modulePath: "104 CPS > Physiology > Cardiovascular System > Basic Mechanisms of Circulatory Control",
      type: "mechanism",
      aliases: ["Compensatory response to hemorrhage", "Rapid reactions to hemorrhagic shock"],
    },
  ],

  questions: [
    {
      key: "asa-rapid-compensatory-reaction-to-hemorrhagic-shock-the-sec-e85732b4",
      conceptKey: "hemorrhagic-shock.rapid-compensatory-hormone-response",
      difficulty: "Moderate",
      questionType: "Mechanism",
      learningObjective: "Name catecholamines, angiotensin II and vasopressin as the hormones the rapid compensatory response to hemorrhage raises, and explain why atrial natriuretic peptide is not a fourth.",
      explanations: {
        A: "True, so not the exception. The book lists increased catecholamine secretion — from the adrenal medulla and sympathetic terminals — among the rapid humoral compensatory reactions to hemorrhage.",
        B: "The exception, and the answer. Atrial natriuretic peptide is secreted when atrial stretch rises with an expanded extracellular fluid volume; hemorrhage decreases venous return and atrial filling, removing that stretch stimulus rather than providing it, so its secretion is not part of the rapid response the book lists. A common trap: assuming every hormone with a role in blood-pressure regulation rises together in hypovolaemia.",
        C: "True, so not the exception. The book lists increased angiotensin II, from increased renin secretion, among the rapid humoral compensatory reactions, helping correct shock by vasoconstriction, thirst and aldosterone secretion.",
        D: "True, so not the exception. The book lists increased vasopressin secretion, driven by decreased discharge from atrial low-pressure receptors, among the rapid humoral compensatory reactions, retaining water to restore extracellular fluid volume.",
      },
    },
  ],
}
