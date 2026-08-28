import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: "The Diaphragm",
  modulePath: "104 CPS > Anatomy > The Diaphragm",
  articleId: "ART-104-ANA-DIAPHRAGM",

  concepts: [
    {
      key: "diaphragm.nerve-supply-and-action",
      label: "The phrenic nerve is the diaphragm's sole motor supply, arising from C3, C4 and C5 in the neck and reaching the diaphragm's inferior surface because the embryo folds during development",
      definition: "The right and left phrenic nerves, arising in the neck from the third, fourth and fifth cervical spinal nerves (C3, C4, C5), are the sole motor supply of the diaphragm — a spinal, not a cranial, nerve, despite originating so high. They descend through the neck and thorax to ramify on the diaphragm's inferior (abdominal) surface; they reach this surface, rather than the superior one, because folding of the embryo during development turns what was originally the diaphragm's cranial-facing surface to face caudally instead. Sensory supply is split: the phrenic nerves carry sensation from the diaphragm's central part (its central pleura and peritoneum), while the lower six thoracic spinal nerves supply the peripheral parts, with only a few proprioceptive fibres arising from the muscle itself. As the chief muscle of quiet inspiration, the diaphragm's contraction (together with the abdominal muscles) also raises intra-abdominal pressure for parturition, defecation, micturition and coughing — activities under the same somatic motor control as breathing, not autonomic control.",
      objective: "State which nerve alone supplies the diaphragm's motor function, its spinal root value, and explain why it is a spinal rather than a cranial nerve.",
      pitfall: "Calling the phrenic nerve a cranial nerve because it arises so high, in the neck. It is a spinal nerve derivative, from cervical roots C3, C4 and C5 (chiefly C4) — respiration is a somatic motor function under brainstem rhythm control acting through spinal and peripheral nerves, not through any cranial nerve to the diaphragm.",
      subject: "resp",
      primary: "DIS-ANA-T04",
      secondary: ["SYS-RES-T01-S01-M04"],
      modulePath: "104 CPS > Anatomy > The Diaphragm",
      type: "mechanism",
      aliases: ["Motor supply of the diaphragm", "Phrenic nerve root value C3-C5"],
    },
    {
      key: "diaphragm.major-openings",
      label: "The diaphragm's three major openings are stacked at three vertebral levels — caval at T8, oesophageal at T10, aortic at T12 — each transmitting its own set of structures",
      definition: "The three major openings of the diaphragm sit at three different vertebral levels in the midline plane, each transmitting a distinct set of structures. The caval opening, the highest, lies in the central tendon at T8, one inch right of the midline, and transmits the inferior vena cava, the right phrenic nerve and lymphatics. The oesophageal opening lies in the right crus at T10, one inch left of the midline, and transmits the oesophagus, the two vagi and the oesophageal branches of the left gastric vessels. The aortic opening, the lowest, lies behind the median arcuate ligament at T12 and transmits the aorta, the azygos vein to its right and the thoracic duct between them.",
      objective: "State the vertebral level and the structures transmitted by each of the three major diaphragmatic openings, in order from T8 to T12.",
      pitfall: "Swapping the caval and aortic opening's levels. The inferior vena cava pierces the diaphragm at T8, in the central tendon; the aorta passes behind the diaphragm (not through muscle at all) at T12, behind the median arcuate ligament — reversing these two levels is a classic, confidently identifiable exam trap.",
      subject: "resp",
      primary: "DIS-ANA-T04",
      secondary: ["SYS-RES-T01-S01-M04"],
      modulePath: "104 CPS > Anatomy > The Diaphragm",
      type: "structural_description",
      aliases: ["Aortic opening", "Oesophageal opening", "Caval opening", "Vena caval opening"],
    },
  ],

  questions: [
    {
      key: "concerning-breathing-all-true-except-ecd77f19",
      conceptKey: "diaphragm.nerve-supply-and-action",
      difficulty: "Moderate",
      questionType: "Recall of a false statement",
      learningObjective: "Identify the phrenic nerve as a spinal, not a cranial, nerve.",
      explanations: {
        A: "True of the respiratory rhythm's origin, so not the exception. Breathing's basic rhythm is generated and modulated by brainstem centres acting through somatic motor pathways, commonly described together with the autonomic nervous system's other homeostatic roles in an introductory sense — a far less clear-cut error than mislabelling the phrenic nerve's own nerve class.",
        B: "The exception, and the answer. The phrenic nerve is a spinal nerve, formed mainly from the fourth cervical spinal nerve root with contributions from the third and fifth (C3, C4, C5) — it is not one of the twelve cranial nerves, despite arising so high in the neck. A common trap: confusing the phrenic nerve's cervical spinal origin with a cranial nerve.",
        C: "True, so not the exception. The diaphragm is the principal, most active muscle of quiet (resting) inspiration.",
        D: "True, so not the exception. The intercostal muscles are innervated by the intercostal nerves, which are themselves the anterior rami of the thoracic spinal nerves T1-T11.",
      },
    },
    {
      key: "concerning-the-diaphragm-all-true-except-1213ff45",
      conceptKey: "diaphragm.major-openings",
      difficulty: "Moderate",
      questionType: "Recall of a false statement",
      learningObjective: "State that the inferior vena cava pierces the diaphragm at T8, not T12.",
      explanations: {
        A: "True, so not the exception. The diaphragm develops embryologically from the septum transversum plus contributions including the cervical myotomes, which is why its motor nerve, the phrenic, originates from cervical spinal segments despite the diaphragm's thoracoabdominal position.",
        B: "True, so not the exception. The diaphragm's central part is supplied motorically by the phrenic nerves, while its peripheral costal part also receives sensory contributions from the lower intercostal nerves.",
        C: "True, so not the exception. The caval opening, in the diaphragm's central tendon at the T8 level, transmits the inferior vena cava.",
        D: "The exception, and the answer. The inferior vena cava passes through the diaphragm at the level of the eighth thoracic vertebra (T8), not T12 — T12 is instead the level of the aortic hiatus, which transmits the aorta and thoracic duct. Swapping these two diaphragmatic-opening levels is a classic, confidently identifiable error.",
        E: "True, so not the exception. The aortic hiatus lies behind (deep to) the median arcuate ligament, formed by the diaphragm's two crura, at the T12 level.",
      },
    },
  ],
}
