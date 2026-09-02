import type { McqLeafSeed } from '../../mcq.ts'

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
    // Sparse reuse, not a fresh mint: find-existing.mjs "epicardium" / "myocardium"
    // surfaced a hand-authored, pinned record (CON-CVS-CC8835108F512C,
    // canonical_key heart-wall.three-layers-epicardium-myocardium-endocardium)
    // already sitting in docs/Kasr-Source-Imports/concept/104-CPS-histology-
    // concepts.md, cross-linked as one of this same file's own article's
    // related_concepts (ART-104-HIS-HEART-AND-VESSEL-WALL). Declaring the
    // same canonical_key here resolves to that pinned id and emits a sparse
    // reuse row — every other field below is inert for the build, kept only
    // to satisfy the McqConcept type, and restated close to the pinned
    // record's own wording so a reader is not misled by a diverging copy.
    {
      key: "heart-wall.three-layers-epicardium-myocardium-endocardium",
      label: "The wall of the heart is three layers: epicardium, myocardium and endocardium",
      definition: "The heart's wall is three layers from outside to inside. The epicardium is the visceral layer of the serous pericardium, adherent to the heart's outer surface, formed of a single layer of mesothelial cells with underlying connective tissue carrying the heart's own blood vessels and nerves. The myocardium, cardiac muscle, is the thick middle bulk of the wall, thicker in the ventricles than in the atria; it is attached to the heart's fibrous skeleton, the dense fibrous connective tissue at the atrioventricular junctions, and is built of branched, interconnected muscle fibres each sheathed in a delicate endomysium rich in capillaries. The endocardium is innermost: an endothelium continuous with the vascular endothelium, resting on a subendocardial connective-tissue layer that is continuous with the myocardium's own connective tissue and that houses the conducting system of the heart.",
      objective: "Name the heart wall's three layers in order from outside to inside and state what each is made of and what it carries.",
      pitfall: "Placing the conducting system in the myocardium. It lies in the subendocardial connective tissue of the endocardium, not in the muscle it goes on to excite — and separately, conflating the pericardium generally with its own visceral layer (the epicardium) specifically.",
      subject: "cvs",
      primary: "DIS-HIS-T03",
      secondary: ["SYS-CVS-T01-S01"],
      modulePath: "104 CPS > Histology > Cardiovascular System > The heart",
      type: "structural_description",
      aliases: ["Layers of the heart wall", "Epicardium, myocardium and endocardium"],
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
        A: "Stratified squamous epithelium is not the lining of a cardiac valve — valves are folds of endocardium, whose surface is simple, not stratified.",
        B: "Transitional epithelium is a urinary-tract lining, not one found in the heart valves.",
        C: "Heart valves, folds of the endocardium, are covered by simple squamous epithelium continuous with the endothelium, over a dense fibrous core rich in collagen and elastic fibres. A common trap: treating a valve as a separate structure from the endocardium rather than a fold of it — the valve's surface epithelium is literally the same endothelium that lines the rest of the chamber.",
        D: "Simple cuboidal epithelium is not the lining of the valve surface.",
      },
    },
    {
      key: "all-characters-of-epicardium-except-xxx-c534ed5a",
      conceptKey: "heart-wall.three-layers-epicardium-myocardium-endocardium",
      difficulty: "Easy",
      questionType: "Recall of a false statement",
      learningObjective: "Identify that a middle layer of subendothelial connective tissue is not a feature of the epicardium.",
      explanations: {
        A: "True of the epicardium, so not the exception. The epicardium is the visceral layer of the serous pericardium, adherent to the heart's own outer surface.",
        B: "True, so not the exception. The epicardium's connective tissue carries the heart's own blood vessels and nerves as they run to and from the myocardium.",
        C: "True, so not the exception. The epicardium is a single layer of mesothelial cells resting on connective tissue — not a multi-layered structure.",
        D: "The exception, and the answer. A middle layer of subendothelial connective tissue belongs to the endocardium (and, more generally, to a blood vessel's own intima) — the epicardium is a single mesothelial sheet over connective tissue, with no such middle layer of its own. A common trap: assuming every named cardiac layer shares the same internal structure as the endocardium simply because both sit at a wall surface.",
      },
    },
    {
      key: "is-double-walled-and-has-serous-fibrous-layer-xxx-2360b412",
      conceptKey: "heart-wall.three-layers-epicardium-myocardium-endocardium",
      difficulty: "Easy",
      questionType: "Structure identification",
      learningObjective: "Name the pericardium as the double-walled sac with a fibrous outer layer and a serous inner layer.",
      explanations: {
        A: "The epicardium is a single mesothelial layer — it is the visceral layer of the serous pericardium, not a double-walled structure in its own right.",
        B: "The myocardium is cardiac muscle, the heart wall's own thick middle bulk — not a double-walled serous-and-fibrous sac.",
        C: "The pericardium is double-walled: an outer fibrous layer and an inner serous layer, the serous layer itself split into parietal and visceral (epicardial) sheets enclosing the pericardial cavity between them.",
        D: "The subendocardium is a single connective-tissue layer deep to the endocardial endothelium, not a double-walled structure.",
      },
    },
    {
      key: "is-formed-of-branched-interconnected-fibers-surrounded-by-sh-528ce17f",
      conceptKey: "heart-wall.three-layers-epicardium-myocardium-endocardium",
      difficulty: "Easy",
      questionType: "Structure identification",
      learningObjective: "Name the myocardium as branched, interconnected muscle fibres each sheathed in endomysium.",
      explanations: {
        A: "The epicardium is a mesothelial layer over connective tissue, not muscle fibres.",
        B: "The myocardium is built of branched, interconnected cardiac muscle fibres, each wrapped in a delicate, capillary-rich endomysium — the thick middle bulk of the heart wall, thicker in the ventricles than the atria.",
        C: "The pericardium is the fibrous-and-serous sac around the heart, not a layer of muscle fibres.",
        D: "The subendocardium is connective tissue continuous with the myocardium's own connective tissue, not muscle fibres itself.",
      },
    },
    {
      key: "main-bulk-of-heart-s-wall-xxx-82717cfa",
      conceptKey: "heart-wall.three-layers-epicardium-myocardium-endocardium",
      difficulty: "Easy",
      questionType: "Structure identification",
      learningObjective: "Name the myocardium as the thick middle bulk of the heart wall.",
      explanations: {
        A: "The epicardium is a thin outer mesothelial layer, not the wall's bulk.",
        B: "The myocardium, cardiac muscle, is the thick middle bulk of the heart's wall — thicker in the ventricles, which must generate the higher pressures, than in the atria.",
        C: "The pericardium is the external fibrous-and-serous sac enclosing the heart, not part of the wall's own thickness.",
        D: "The subendocardium is a thin connective-tissue layer just inside the endocardium's endothelium, not the wall's main bulk.",
      },
    },
    {
      key: "visceral-layer-called-xxx-8f5ab999",
      conceptKey: "heart-wall.three-layers-epicardium-myocardium-endocardium",
      difficulty: "Easy",
      questionType: "Definition",
      learningObjective: "Name the epicardium as the visceral layer of the serous pericardium.",
      explanations: {
        A: "The epicardium is exactly the visceral layer of the serous pericardium — the same mesothelium reflected onto the heart's own surface, adherent to it and carrying its vessels and nerves.",
        B: "The myocardium is the heart's own muscle, not a layer of the pericardium at all.",
        C: "The pericardium names the whole sac — fibrous layer plus parietal and visceral serous layers — not specifically its visceral layer alone. A common trap: using 'pericardium' and 'epicardium' interchangeably when the epicardium is specifically the visceral serous layer stuck to the heart.",
        D: "The subendocardium is the connective tissue deep to the endocardium's endothelium, unrelated to the pericardial layers.",
      },
    },
    {
      key: "conducting-system-of-heart-is-located-in-xxx-8525329a",
      conceptKey: "heart-wall.three-layers-epicardium-myocardium-endocardium",
      difficulty: "Moderate",
      questionType: "Structure identification",
      learningObjective: "Locate the heart's conducting system in the subendocardial connective tissue, not the myocardium itself.",
      explanations: {
        A: "The epicardium is the outer mesothelial layer, uninvolved in impulse conduction.",
        B: "A common trap: assuming the conducting system sits in the myocardium because it is 'electrical muscle.' It does not — the conducting fibres lie in the subendocardial connective tissue of the endocardium, the layer just inside the muscle mass they go on to excite.",
        C: "The subendocardial connective tissue, part of the endocardium, houses the heart's conducting system — continuous with the myocardium's own connective tissue but distinct from the contractile muscle itself.",
        D: "The pericardium is the external sac around the heart, unrelated to the conducting system's location within the wall.",
      },
    },
  ],
}
