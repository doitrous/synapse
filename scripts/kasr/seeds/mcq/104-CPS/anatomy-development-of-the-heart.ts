import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: "Development of the Heart",
  modulePath: "104 CPS > Anatomy > Development of the Heart",
  articleId: "ART-104-ANA-DEV-HEART-SEPTATION",

  concepts: [
    {
      key: "interatrial-septum.formation-septum-primum-and-secundum",
      label: "Septum primum forms first and opens the ostium secundum in its own upper part before it fuses; septum secundum then grows to its right, overlapping that opening to leave the oblique foramen ovale",
      definition: "The interatrial septum is built from three parts. Ventral and dorsal atrioventricular cushions fuse across the atrioventricular canal to form the septum intermedium, dividing it into right and left canals. Septum primum, a sickle-shaped septum, grows down from the atrial roof towards the septum intermedium; the gap beneath it, the ostium primum, closes as the two fuse, but before it closes the septum's upper part breaks down to open a new gap, the ostium secundum, so a new shunt opens before the old one shuts. Septum secundum then grows down to the right of septum primum, overlapping the ostium secundum and leaving an oblique passage, the foramen ovale, between the free edge of septum primum and the lower margin of septum secundum — allowing right-to-left flow but not the reverse, and closing functionally only after birth.",
      objective: "Sequence septum primum and septum secundum's formation and the openings each one leaves.",
      pitfall: "Assuming the two septa fuse to seal the foramen ovale before birth — the foramen ovale is a deliberately imperfect, oblique overlap that keeps right-to-left flow open throughout fetal life and only closes functionally at birth, under a pressure reversal.",
      subject: "dev",
      primary: "DIS-EMB-T03",
      secondary: ["SYS-CVS-T01-S01-M01"],
      modulePath: "104 CPS > Anatomy > Development of the Heart",
      type: "mechanism",
      aliases: ["Septum primum and secundum", "Foramen ovale formation", "Ostium primum and ostium secundum"],
    },
    {
      key: "primitive-atrium.fate-of-right-and-left-halves",
      label: "The adult right atrium derives from the right half of the primitive atrium plus the absorbed sinus venosus and right atrioventricular canal; the adult left atrium derives from the left half of the primitive atrium plus the absorbed pulmonary veins",
      definition: "The right atrium's adult components are the right half of the primitive atrium (forming the anterior rough part and the auricle) plus the absorbed sinus venosus and the absorbed right atrioventricular canal. The left atrium's adult components are the left half of the primitive atrium (forming the auricle only) plus the absorbed pulmonary veins — a single pulmonary vein that divides into right and left branches, each further dividing, before the stem and its branches are absorbed into the left atrial wall so that four pulmonary veins come to open separately.",
      objective: "State which embryonic structure the anterior rough part of the adult right atrium derives from, and contrast it with the left atrium's derivation.",
      pitfall: "Assuming the whole adult right atrium is one embryonic derivative — the rough part (with the auricle) comes from the primitive atrium's right half, while the smooth sinus venarum is a separate later addition from the absorbed sinus venosus.",
      subject: "dev",
      primary: "DIS-EMB-T03",
      secondary: ["SYS-CVS-T01-S01-M01"],
      modulePath: "104 CPS > Anatomy > Development of the Heart",
      type: "structural_description",
      aliases: ["Right atrium embryological origin", "Fate of the primitive atrium"],
    },
  ],

  questions: [
    {
      key: "regarding-the-development-of-the-heart-select-the-false-stat-1cc2398a",
      conceptKey: "interatrial-septum.formation-septum-primum-and-secundum",
      difficulty: "Moderate",
      questionType: "Recall of a false statement",
      learningObjective: "Sequence septum primum and septum secundum's formation and identify which statement about interatrial septation is false.",
      explanations: {
        A: "True, and so not the answer sought. The common atrium is indeed divided into two atria by the sequential development of septum primum and then septum secundum, each leaving its own offset opening so a right-to-left shunt is never fully interrupted until birth.",
        B: "True, and so not the answer sought. The ostium primum is exactly the gap between septum primum's lower free margin and the endocardial cushions (the septum intermedium), and it closes as the two fuse.",
        C: "True, and so not the answer sought. Before the ostium primum closes, the upper part of septum primum breaks down to open the ostium secundum — a new shunt opening before the old one shuts.",
        D: "This is the false statement, and the correct answer. The two septa do not fuse to close the foramen ovale before birth — the foramen ovale is a deliberately oblique, imperfect overlap between septum primum's free edge and septum secundum's lower margin that lets right-to-left flow continue throughout fetal life. It only closes functionally at birth, when rising left atrial pressure and falling right atrial pressure press the two septa together, and anatomical fusion may remain incomplete (a probe-patent foramen ovale) in a substantial minority of adults.",
      },
    },
    {
      key: "the-anterior-rough-part-of-right-atrium-developmentally-aris-dc57d97a",
      conceptKey: "primitive-atrium.fate-of-right-and-left-halves",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "Trace the adult right atrium's anterior rough part back to its embryonic origin.",
      explanations: {
        A: "The sinus venosus is absorbed into the right atrium too, but it forms the smooth posterior sinus venarum, not the anterior rough part — a common point of confusion between the atrium's two embryological contributors.",
        B: "The anterior rough part (atrium proper) of the right atrium, roughened by the musculi pectinati and continuous with the auricle, arises from the right half of the primitive atrium. The smooth sinus venarum, by contrast, is a separate later contribution from the absorbed sinus venosus — the two parts of the adult right atrium have two different embryonic origins, which is exactly the distinction this question tests.",
        C: "The truncus arteriosus is the most distal part of the bulbus cordis and gives rise to the roots of the aorta and pulmonary trunk after septation — it has no part in forming the right atrium.",
        D: "The bulbus cordis is the most cranial chamber of the primitive heart tube and gives rise to the outflow tracts of both ventricles (via its proximal and middle parts) — it does not contribute to the right atrium, an inflow chamber.",
      },
    },
  ],
}
