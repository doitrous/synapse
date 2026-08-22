import type { McqLeafSeed } from '../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: "Histology Cardiovascular System — General Vessel Wall Plan",
  modulePath: "104 CPS > Histology > Cardiovascular System > Arteries",
  articleId: "ART-104-HIS-HEART-AND-VESSEL-WALL",

  concepts: [
    {
      key: "blood-vessel-wall.general-three-tunic-plan",
      label: "Most blood vessel walls are three tunics: intima, media and adventitia, each adapted to the vessel's function",
      definition: "Wall of most blood vessels is formed of three layers from inside outwards. Tunica intima is innermost and in direct contact with blood: an endothelium of simple squamous epithelium on its basal lamina, providing a smooth surface for flow and a thin barrier for exchange; a subendothelium of loose areolar connective tissue supporting it; and, in arteries only, an internal elastic lamina of condensed, fenestrated elastic fibres that prevents complete occlusion. Tunica media is the middle layer, variable amounts of circularly arranged smooth muscle (which regulates flow by contracting and also manufactures the media's own extracellular components), elastic fibres that allow distension, and reticular fibres and proteoglycans between the muscle cells. Tunica adventitia is the outermost loose connective tissue connecting the vessel to its surroundings: longitudinal collagen fibres that resist overdistension, a few circular elastic fibres, vasa vasorum (small vessels, chiefly in large veins, nourishing the vessel wall itself) and nervi vasorum (autonomic nerves controlling the smooth muscle). An external elastic lamina may lie between media and adventitia, fenestrated like the internal one, and the fenestrae in both allow nutrients to diffuse into the wall.",
      objective: "Name the three tunics of a blood vessel wall in order and state what each layer contributes to the vessel's function.",
      pitfall: "Damage to the endothelium exposes the subendothelial connective tissue, which induces platelet aggregation, thrombus formation and obstruction of flow — a mechanism the book states explicitly and that examiners like to test as a short reasoning chain, not a fact to recite in isolation.",
      subject: "cvs",
      primary: "DIS-HIS-T03",
      secondary: ["SYS-CVS-T01-S01"],
      modulePath: "104 CPS > Histology > Cardiovascular System > Arteries",
      type: "structural_description",
      aliases: ["Tunica intima, media and adventitia", "General plan of the blood vessel wall"],
    },
  ],

  questions: [
    {
      key: "allow-distension-of-arteries-540e87f4",
      conceptKey: "blood-vessel-wall.general-three-tunic-plan",
      difficulty: "Easy",
      questionType: "Structure and function",
      learningObjective: "Attribute the tunica media's elastic fibres to arterial distension, as distinct from the smooth muscle that regulates flow.",
      explanations: {
        A: "Correct. The book states plainly that the elastic fibres of the tunica media allow distension of the arteries.",
        B: "Smooth muscle regulates blood flow by contracting, and builds the media's own extracellular components — distension is the elastic fibre's job, not the muscle's.",
        C: "Reticular fibres lie between the smooth muscle cells as a supportive scaffold; the book credits them with support, not with allowing distension.",
        D: "Collagen fibres sit in the tunica adventitia and, being longitudinally arranged, resist overdistension rather than permit it — the opposite function.",
      },
    },
    {
      key: "is-innermost-layer-in-contact-with-blood-8f8e6d95",
      conceptKey: "blood-vessel-wall.general-three-tunic-plan",
      difficulty: "Easy",
      questionType: "Structure and function",
      learningObjective: "Name the tunica intima as the vessel wall's innermost layer, in direct contact with blood.",
      explanations: {
        A: "Tunica media is the middle layer, separated from the blood by the intima — it is not in direct contact with it.",
        B: "Correct. The book states plainly that the tunica intima is the innermost layer, in direct contact with the blood.",
        C: "Tunica adventitia is the outermost coat, connecting the vessel to the surrounding tissue, furthest from the blood.",
        D: "Not applicable — a correct answer is listed among the options.",
      },
    },
    {
      key: "prevent-vessel-over-distension-8f85ff7b",
      conceptKey: "blood-vessel-wall.general-three-tunic-plan",
      difficulty: "Easy",
      questionType: "Structure and function",
      learningObjective: "Attribute the tunica adventitia's longitudinal collagen fibres to preventing vessel overdistension.",
      explanations: {
        A: "Elastic fibres, in the tunica media, allow distension — the opposite function to the one the stem describes.",
        B: "Smooth muscle fibres regulate flow by contracting and build the media's own extracellular components; preventing overdistension is not their stated role.",
        C: "Reticular fibres support the smooth muscle cells structurally within the media; the book does not credit them with resisting overdistension.",
        D: "Correct. The book states that the longitudinally arranged collagen fibres of the tunica adventitia prevent vessel overdistension.",
      },
    },
    {
      key: "provide-smooth-surface-for-easily-blood-flow-e2ac2ee7",
      conceptKey: "blood-vessel-wall.general-three-tunic-plan",
      difficulty: "Easy",
      questionType: "Structure and function",
      learningObjective: "Attribute a smooth surface for blood flow to the tunica intima's endothelium.",
      explanations: {
        A: "Tunica media regulates flow by smooth-muscle contraction; the smooth surface for flow itself is the intima's endothelium, not the media.",
        B: "Correct. The book states that the tunica intima's endothelium provides a smooth surface for easy blood flow, and forms a thin layer letting fluids, gases and metabolites pass.",
        C: "Tunica adventitia is the outer connective-tissue coat, with no contact with the flowing blood at all.",
        D: "Not applicable — a correct answer is listed among the options.",
      },
    },
    {
      key: "regulate-blood-flow-produce-extracell-component-of-t-media-f26f7959",
      conceptKey: "blood-vessel-wall.general-three-tunic-plan",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "Attribute both flow regulation and the tunica media's own extracellular components to its smooth muscle fibres.",
      explanations: {
        A: "Elastic fibres allow distension of the media, but the book does not credit them with regulating flow or manufacturing the media's other extracellular components.",
        B: "Correct. The book states the tunica media's smooth muscle fibres regulate blood flow by their contraction, and also produce all the extracellular components of the tunica media.",
        C: "Reticular fibres lie between the smooth muscle cells as a structural scaffold — they are a product, not the producing cell, and play no role in flow regulation.",
        D: "Collagen fibres sit chiefly in the adventitia, resisting overdistension — they neither regulate flow nor manufacture the media's own components.",
      },
    },
    {
      key: "t-media-is-formed-of-all-the-following-except-0ad4222c",
      conceptKey: "blood-vessel-wall.general-three-tunic-plan",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "State that nervi vasorum belong to the tunica adventitia, not the tunica media's own composition.",
      explanations: {
        A: "True of the tunica media, so not the exception — circularly arranged smooth muscle fibres are its main component.",
        B: "True, so not the exception. Elastic fibres in the media allow distension of the vessel.",
        C: "The exception, and the answer. Nervi vasorum are the autonomic nerves of the tunica adventitia, controlling smooth-muscle contraction from outside the media — the book places them in the adventitia, not as a component of the media itself.",
        D: "True, so not the exception. Reticular fibres and proteoglycans lie between the smooth muscle cells of the media.",
      },
    },
  ],
}
