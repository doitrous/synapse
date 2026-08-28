import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: "Lymphatics of the Thorax",
  modulePath: "104 CPS > Anatomy > Lymphatics of the Thorax",
  articleId: "ART-104-ANA-THORACIC-LYMPHATICS",

  concepts: [
    {
      key: "thoracic-duct.course-tributaries-and-termination",
      label: "The thoracic duct is a 45 cm valved vessel from T12 that enters the thorax through the diaphragm's aortic opening, crosses behind the oesophagus right-to-left at T5, and ends at the left internal jugular/subclavian junction",
      definition: "The thoracic duct, the largest lymphatic vessel in the body at about 45 cm, is a beaded, valved vessel beginning in the abdomen at the lower border of T12 as the continuation of the cisterna chyli. It enters the thorax through the aortic opening of the diaphragm between the aorta on its left and the azygos vein on its right, ascends in the posterior mediastinum behind the oesophagus's right border, crosses behind the oesophagus from right to left at T5, then ascends in the superior mediastinum behind the oesophagus's left border and the aortic arch, ending at the root of the neck by opening into the start of the left brachiocephalic vein at the junction of the left internal jugular and subclavian veins. In the thorax it receives the posterior intercostal and posterior mediastinal lymph nodes, and at its termination the left jugular, left subclavian and left bronchomediastinal lymph trunks — draining the two lower limbs, the abdomen (except the upper right lobe of liver), and the left side of the thorax, upper limb, head and neck.",
      objective: "State the vertebral level and direction of the thoracic duct's crossing behind the oesophagus, and name the field of lymph drainage it serves.",
      pitfall: "Assuming the thoracic duct enters the thorax through the oesophageal opening of the diaphragm because it runs so close behind the oesophagus for most of its course — it actually enters through the aortic opening, between the aorta and the azygos vein, and only comes to lie behind the oesophagus afterwards.",
      subject: "haem",
      primary: "DIS-ANA-T03",
      secondary: ["SYS-CVS-T01-S02"],
      modulePath: "104 CPS > Anatomy > Lymphatics of the Thorax",
      type: "structural_description",
      aliases: ["Thoracic duct course", "Thoracic duct termination"],
    },
  ],

  questions: [
    {
      key: "concerning-the-thoracic-duct-mark-the-wrong-statement-f413f7eb",
      conceptKey: "thoracic-duct.course-tributaries-and-termination",
      difficulty: "Moderate",
      questionType: "Recall of a false statement",
      learningObjective: "Identify the false statement about the thoracic duct's length, origin, course and termination.",
      explanations: {
        A: "True, and so not the answer sought. The thoracic duct is about 45 cm long, the largest lymphatic vessel in the body.",
        B: "True, and so not the answer sought. The thoracic duct begins in the abdomen, at the lower border of T12, as the direct continuation of the cisterna chyli.",
        C: "This is the wrong statement, and the correct answer. The thoracic duct enters the thorax through the aortic opening of the diaphragm, lying between the aorta on its left and the azygos vein on its right — not through the oesophageal opening. It only comes to lie immediately behind the oesophagus once it is already inside the posterior mediastinum, which is the source of confusion this distractor exploits.",
        D: "True, and so not the answer sought. The thoracic duct is a beaded, valved vessel along its length, the valves helping direct lymph flow towards its termination.",
        E: "True, and so not the answer sought. The thoracic duct ends at the root of the neck by opening into the start of the left brachiocephalic vein, at the junction of the left internal jugular and left subclavian veins.",
      },
    },
    {
      key: "regarding-the-esophagus-the-following-statements-are-correct-7bd0d4e2",
      conceptKey: "thoracic-duct.course-tributaries-and-termination",
      difficulty: "Hard",
      questionType: "Recall of a false statement",
      learningObjective: "State that the thoracic duct does not stay on one side of the oesophagus throughout its thoracic course.",
      explanations: {
        A: "True, and so not the answer sought. The oesophagus's relation to the heart's base is separated by the oblique sinus of the pericardium, the blind recess behind the left atrium that also lies close to the oesophagus's own path through the posterior mediastinum.",
        B: "True, and so not the answer sought. The oesophagus, as a whole structure, is conventionally described as beginning at the level of the lower border of the cricoid cartilage/C6, continuous above with the pharynx.",
        C: "True, and so not the answer sought. The oesophagus is crossed anteriorly by the left principal bronchus as the two structures pass through the superior/posterior mediastinum together.",
        D: "This is the false statement, and the correct answer. The thoracic duct does not lie on the oesophagus's left side along its whole course — it ascends behind the oesophagus's right border in the posterior mediastinum, then crosses behind the oesophagus from right to left at the level of T5, only lying on the left side for the remainder of its course up to the root of the neck.",
        E: "True, and so not the answer sought. The oesophagus, as a whole structure, is conventionally described as ending at the level of T11, where it pierces the diaphragm to become continuous with the stomach.",
      },
    },
    {
      key: "which-of-the-followings-regarding-the-thoracic-duct-is-true-4dd9e89a",
      conceptKey: "thoracic-duct.course-tributaries-and-termination",
      difficulty: "Moderate",
      questionType: "Recall of the true statement",
      learningObjective: "State that the thoracic duct receives the left jugular and left subclavian lymph trunks at its termination.",
      explanations: {
        A: "The thoracic duct begins at the lower border of T12, not the body of T10, as the continuation of the cisterna chyli.",
        B: "This is the correct answer. At its termination, the thoracic duct receives the left jugular, left subclavian and left bronchomediastinal lymph trunks, immediately before opening into the start of the left brachiocephalic vein.",
        C: "The thoracic duct passes BEHIND the oesophagus, not in front of it, ascending behind its right border below T5 and behind its left border above T5.",
        D: "The thoracic duct's field of drainage is the LEFT side of the thorax (plus the two lower limbs and most of the abdomen) — the right side of the thoracic cavity drains instead into the right lymphatic duct.",
      },
    },
    {
      key: "one-of-the-following-regarding-the-thoracic-duct-is-false-9749a40a",
      conceptKey: "thoracic-duct.course-tributaries-and-termination",
      difficulty: "Moderate",
      questionType: "Recall of a false statement",
      learningObjective: "State that the thoracic duct drains the left, not the right, upper limb.",
      explanations: {
        A: "True, and so not the answer sought. The thoracic duct begins at the lower border of T12, as the direct continuation of the cisterna chyli.",
        B: "True, and so not the answer sought. The thoracic duct enters the thorax through the aortic opening of the diaphragm, between the aorta and the azygos vein.",
        C: "True, and so not the answer sought. In the superior mediastinum the thoracic duct ascends behind the oesophagus's left margin, having already crossed over from the right at T5.",
        D: "This is the false statement, and the correct answer. The thoracic duct drains the LEFT upper limb, via the left subclavian lymph trunk at its termination — the right upper limb instead drains into the right lymphatic duct, together with the right side of the head, neck and thorax.",
      },
    },
  ],
}
