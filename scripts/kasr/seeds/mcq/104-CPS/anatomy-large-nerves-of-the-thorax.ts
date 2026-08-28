import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: "Large Nerves of the Thorax",
  modulePath: "104 CPS > Anatomy > Large Nerves of the Thorax",
  articleId: "ART-104-ANA-THORACIC-NERVES",

  concepts: [
    {
      key: "phrenic-nerve.course-and-distribution",
      label: "Each phrenic nerve descends in front of its lung's root on a different column of neighbours — right beside veins (brachiocephalic vein, SVC, IVC), left beside arteries (carotid, subclavian, aortic arch) — before piercing the diaphragm it alone supplies motor to",
      definition: "Each phrenic nerve enters the thorax through the thoracic inlet, in front of the subclavian artery and behind the start of the brachiocephalic vein, crosses the internal thoracic artery from lateral to medial, and descends in front of its own lung's root, separated from it by mediastinal pleura, accompanied throughout by the pericardiacophrenic vessels. The right phrenic nerve, shorter and more vertical because the right cupola of the diaphragm is higher, runs down the right side of the right brachiocephalic vein, the superior vena cava, the pericardium overlying the right atrium, and the inferior vena cava, leaving the thorax through the caval opening on the IVC's right side. The left phrenic nerve runs down the left side of the left common carotid and subclavian arteries, crosses in front of the left vagus nerve, then the aortic arch (crossed here by the left superior intercostal vein), then the pericardium overlying the left ventricle, and leaves by piercing the left cupola of the diaphragm directly. Along its whole course each phrenic nerve supplies sensory branches to the mediastinal pleura and to the fibrous and parietal pericardium, and is the sole motor supply of its own half of the diaphragm — a distribution the nerve reaches only because the diaphragm develops in the neck and is dragged down by its own descent during embryogenesis.",
      objective: "Contrast the right and left phrenic nerve's medial relations as each descends through the thorax, and state everything each nerve supplies along the way.",
      pitfall: "Assuming the two phrenic nerves are mirror images of each other. The right nerve runs down a column of veins (brachiocephalic vein, SVC, IVC); the left runs down a column of arteries (common carotid, subclavian, aortic arch) — genuinely different neighbours on the two sides, not a mirror image, and neither nerve runs behind the thoracic duct, which lies in the posterior mediastinum, well away from either phrenic nerve's course along the pericardium and lung root.",
      subject: "resp",
      primary: "DIS-ANA-T04",
      secondary: ["SYS-RES-T01-S01-M04"],
      modulePath: "104 CPS > Anatomy > Large Nerves of the Thorax",
      type: "mechanism",
      aliases: ["Right phrenic nerve course", "Left phrenic nerve course", "Accessory phrenic nerve"],
    },
  ],

  questions: [
    {
      key: "one-of-the-following-regarding-the-right-phrenic-nerve-is-no-7aa80779",
      conceptKey: "phrenic-nerve.course-and-distribution",
      difficulty: "Hard",
      questionType: "Recall of a false statement",
      learningObjective: "State that the right phrenic nerve runs nowhere near the thoracic duct, unlike its close relation to the superior vena cava.",
      explanations: {
        A: "True of the right phrenic nerve, so not the answer sought. It runs through the superior mediastinum, alongside the SVC, before crossing into the middle mediastinum with the pericardium.",
        B: "True of the right phrenic nerve, so not the answer sought. It descends immediately to the right of, and in contact with, the superior vena cava — one of the column of venous structures (brachiocephalic vein, SVC, IVC) that mark its whole course.",
        C: "This is the false statement, and the correct answer. The right phrenic nerve has no posterior relation to the thoracic duct at all — the thoracic duct lies in the posterior mediastinum, ascending behind the oesophagus, well away from the phrenic nerve's own course down the pericardium's right side alongside the SVC and IVC.",
        D: "True of the right phrenic nerve, so not the answer sought. It leaves the thorax by passing through the caval opening in the diaphragm, on the right side of the inferior vena cava, which it accompanies through this opening.",
      },
    },
    {
      key: "which-of-the-following-statements-regarding-phrenic-nerve-js-ab5defa2",
      conceptKey: "phrenic-nerve.course-and-distribution",
      difficulty: "Moderate",
      questionType: "Recall of the true statement",
      learningObjective: "State that the phrenic nerve supplies both the pericardium and the diaphragm along its course.",
      explanations: {
        A: "The phrenic nerve passes anterior to scalenus anterior in the neck (running down its surface from lateral to medial), not posterior to it — reversing this relation is the error here.",
        C: "The phrenic nerve plays no part in forming the oesophageal plexus, which is built from the vagi and the sympathetic trunks alongside the oesophagus in the posterior mediastinum — a different set of nerves entirely from the phrenic's own course along the pericardium and lung root.",
        D: "The phrenic nerve carries sensory fibres as well as somatic motor ones — sensory branches to the mediastinal pleura and to the fibrous and parietal pericardium along its whole thoracic course — so \"only\" motor fibres understates its composition.",
        E: "This is the correct answer. The phrenic nerve supplies sensory branches to the pericardium along its course and is the sole motor supply of the diaphragm — the two structures its whole thoracic course is built around.",
      },
    },
    {
      key: "which-of-the-followings-concerning-the-right-phrenic-nerve-i-f70c296c",
      conceptKey: "phrenic-nerve.course-and-distribution",
      difficulty: "Moderate",
      questionType: "Recall of the true statement",
      learningObjective: "State that the right phrenic nerve is the sole motor supply of the right side of the diaphragm.",
      explanations: {
        A: "The right recurrent laryngeal nerve is a branch of the right vagus, given off as the vagus crosses the right subclavian artery in the root of the neck — the phrenic nerve gives off no such branch at any point in its course.",
        B: "This is the correct answer. The right phrenic nerve is the sole motor supply of the right side of the diaphragm — no other nerve contributes any motor fibres to it, which is exactly why a transected phrenic nerve paralyses its own hemidiaphragm completely.",
        C: "The right phrenic nerve passes down anterior to its lung's root, separated from it by mediastinal pleura — not posterior to it; the structures posterior to the lung root are the vagus nerve and the sympathetic trunk, not the phrenic nerve.",
        D: "The phrenic nerve carries sensory as well as motor fibres — sensory branches to the mediastinal pleura and to the fibrous and parietal pericardium — so \"only\" motor fibres misstates its composition.",
      },
    },
  ],
}
