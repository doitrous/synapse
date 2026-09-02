import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: "The Brachiocephalic Veins, SVC and Azygos System",
  modulePath: "104 CPS > Anatomy > Large Veins of the Thorax",
  articleId: "ART-104-ANA-THORACIC-WALL-VEINS",

  concepts: [
    {
      // Reuse: CON-CVS-9CDFD3C60A2550 (docs/Kasr-Source-Imports/concept/104-CPS-anatomy-concepts.md).
      key: "brachiocephalic-veins.formation-and-course",
      label: "The right brachiocephalic vein runs almost vertically; the left runs obliquely across the aortic arch's own branches, receiving the thoracic duct — the two unite behind the first right costal cartilage to form the SVC",
      definition: "The right brachiocephalic vein descends almost vertically in the superior mediastinum from the medial end of the right clavicle to the lower border of the first right costal cartilage, receiving the right internal thoracic vein, the right first posterior intercostal vein and the right lymphatic duct. The left brachiocephalic vein runs obliquely down and to the right behind the upper half of the manubrium, along the upper aspect of the aortic arch and in front of the origins of its three branches, receiving the left internal thoracic vein, the left first posterior intercostal vein, the left superior intercostal vein and the thoracic duct. The two unite behind the lower border of the first right costal cartilage, close to the sternum, to form the superior vena cava.",
      objective: "Contrast the two brachiocephalic veins' courses, and name the one vein — the thoracic duct — that only the left brachiocephalic vein receives.",
      pitfall: "Giving both brachiocephalic veins the same course by analogy. The right is nearly vertical; the left is markedly oblique, crossing the aortic arch's own branches — a genuine asymmetry, not a mirror image.",
      subject: "cvs",
      primary: "DIS-ANA-T04",
      secondary: [],
      modulePath: "104 CPS > Anatomy > Large Veins of the Thorax",
      type: "structural_description",
      aliases: ["Innominate vein", "Formation of the SVC"],
    },
    {
      // Reuse: CON-CVS-D2307B39C55336.
      key: "superior-vena-cava.formation-course-and-tributaries",
      label: "The SVC forms behind the first right costal cartilage, pierces the pericardium at the second, and has exactly one named tributary — the azygos vein",
      definition: "The two brachiocephalic veins unite behind the lower border of the first right costal cartilage, close to the sternum, to form the superior vena cava, about 5 cm long, its upper half in the superior mediastinum and its lower half in the middle mediastinum inside the fibrous pericardium, which it pierces at the second right costal cartilage. It ends by opening into the right atrium behind the third right costal cartilage. The superior vena cava's only named tributary is the azygos vein, entering from behind at the second right costal cartilage, just before the cava pierces the pericardium — everything else that drains the upper body reaches the SVC indirectly, through the brachiocephalic veins upstream of this point.",
      objective: "State the level at which the SVC forms, the level at which it opens into the right atrium, and name its one tributary.",
      pitfall: "Giving the SVC several tributaries by analogy with other great veins. The book is explicit: it has only one, the azygos vein — everything else reaches it indirectly via the brachiocephalic veins.",
      subject: "cvs",
      primary: "DIS-ANA-T04",
      secondary: [],
      modulePath: "104 CPS > Anatomy > Large Veins of the Thorax",
      type: "structural_description",
      aliases: ["SVC", "SVC obstruction", "Hemiazygos not a direct SVC tributary"],
    },
    {
      // Reuse: CON-CVS-09E48983DF8E7C (docs/Kasr-Source-Imports/concept/104-CPS-mcq-concepts.md — already
      // minted by an earlier MCQ run in this same generator pipeline, so existingConceptIds sees it directly).
      key: "azygos-vein.arch-and-relation-to-right-lung-root",
      label: "The azygos vein links the IVC to the SVC, running up the posterior mediastinum behind the right lung root before its arch turns forward above that same root to end in the SVC — never directly in the right atrium",
      definition: "The azygos vein — the unpaired vein — connects the back of the inferior vena cava in the abdomen with the back of the superior vena cava in the thorax. It most commonly arises from the back of the inferior vena cava opposite L2 and enters the thorax through the aortic opening of the diaphragm, ascending in the posterior mediastinum immediately behind the root of the right lung, with the oesophagus in front, the lower eight thoracic vertebrae behind, the right pleura and lung and the greater splanchnic nerve on its right, and the thoracic duct and descending aorta on its left. At the T4/T5 disc it turns forward as the arch of the azygos vein, passing above (not behind) the root of the right lung, to end in the middle of the back of the superior vena cava, opposite the second right costal cartilage, just before that vein pierces the pericardium — it never opens into the right atrium directly. Along the way it receives the right superior intercostal vein (itself formed by the second, third and fourth right posterior intercostal veins) into its arch, and the fifth to eleventh right posterior intercostal veins and the right subcostal vein directly, as well as both hemiazygos veins crossing from the left.",
      objective: "Trace the azygos vein from its origin near the IVC to its termination in the SVC, and state that it drains into the SVC, never directly into the right atrium.",
      pitfall: "Assuming the azygos vein's only relation to the right lung root is the arch passing above it. Before it arches forward, the vein itself runs immediately behind the lung root in the posterior mediastinum, and it ends in the superior vena cava, never directly in the right atrium.",
      subject: "cvs",
      primary: "DIS-ANA-T04",
      secondary: [],
      modulePath: "104 CPS > Anatomy > Large Veins of the Thorax",
      type: "structural_description",
      aliases: ["Arch of the azygos vein", "Azygos vein termination"],
    },
    {
      // Reuse: CON-CVS-19E63D8A8E7EDA (docs/Kasr-Source-Imports/concept/104-CPS-concepts.md).
      key: "posterior-intercostal-and-subcostal-veins.termination",
      label: "The right superior intercostal vein (2nd-4th spaces) ends in the azygos arch; the left superior intercostal vein (2nd-4th spaces) instead ends in the left brachiocephalic vein — the two sides do not mirror each other",
      definition: "There are eleven posterior intercostal veins and a subcostal vein on each side. On the right the first ends in the right brachiocephalic vein; the second, third and fourth unite as the right superior intercostal vein, which ends in the arch of the azygos vein; and the fifth to eleventh, with the subcostal vein, open separately into the azygos vein. On the left the first ends in the left brachiocephalic vein; the second, third and fourth unite as the left superior intercostal vein, which also ends in the left brachiocephalic vein — not in an azygos arch, since the left side has none; the fifth to eighth open into the superior hemiazygos vein, which begins as the continuation of the fifth; and the ninth, tenth and eleventh, with the subcostal vein, open into the inferior hemiazygos vein. Both hemiazygos veins cross the midline to end in the azygos vein.",
      objective: "Give the termination of the right and the left superior intercostal vein, and explain why the two sides do not mirror each other.",
      pitfall: "Mirroring the right-sided pattern onto the left. The left superior intercostal vein ends in the left brachiocephalic vein, not in an azygos arch — there is no left-sided azygos vein to receive it.",
      subject: "cvs",
      primary: "DIS-ANA-T04",
      secondary: [],
      modulePath: "104 CPS > Anatomy > Large Veins of the Thorax",
      type: "definition",
      aliases: ["Right superior intercostal vein", "Left superior intercostal vein"],
    },
    {
      // New concept: the anterior intercostal veins' own drainage pattern —
      // a different part of the same source article's "Overview and
      // position" section from the posterior-vein concept above, which does
      // not cover it.
      key: "anterior-intercostal-veins.drainage-pattern",
      label: "The anterior intercostal veins drain forwards into the internal thoracic vein or its tributaries, with the pattern changing by space: upper three direct, middle three via the internal thoracic artery's venae comitantes, lower three via the musculophrenic vein",
      definition: "The anterior intercostal veins accompany the anterior intercostal arteries — nine pairs, two in each of the upper nine spaces — and drain into the internal thoracic vein or its tributaries. The first, second and third spaces drain directly into the internal thoracic vein itself; the fourth, fifth and sixth into the venae comitantes of the internal thoracic artery; and the seventh, eighth and ninth into the venae comitantes of the musculophrenic artery, the internal thoracic artery's own terminal branch. Every group ultimately reaches the internal thoracic vein, but only the upper three spaces do so directly.",
      objective: "State which anterior intercostal veins drain directly into the internal thoracic vein and which reach it only indirectly.",
      pitfall: "Treating all nine pairs of anterior intercostal veins as draining directly into the internal thoracic vein. Only the upper three (first to third space) do; the middle three and lower three reach it only indirectly, via the venae comitantes of the internal thoracic and musculophrenic arteries respectively.",
      subject: "cvs",
      primary: "DIS-ANA-T04",
      secondary: [],
      modulePath: "104 CPS > Anatomy > Large Veins of the Thorax",
      type: "definition",
      aliases: ["Anterior intercostal vein drainage", "Internal mammary vein"],
    },
  ],

  questions: [
    {
      key: "concerning-the-azygos-vein-choose-the-false-answer-8fa1ebff",
      conceptKey: "azygos-vein.arch-and-relation-to-right-lung-root",
      difficulty: "Moderate",
      questionType: "Recall of a false statement",
      learningObjective: "State that the azygos vein ends in the superior vena cava, never directly in the right atrium.",
      explanations: {
        A: "True, so not the answer sought. The azygos vein is exactly the link the department book describes between the back of the inferior vena cava and the back of the superior vena cava.",
        B: "True, so not the answer sought. The azygos vein's arch passes above (arches over) the root of the right lung on its way to the SVC.",
        C: "True, so not the answer sought. The right superior intercostal vein (formed by the second, third and fourth right posterior intercostal veins) ends in the arch of the azygos vein.",
        D: "This is the false statement, and the answer. The azygos vein does not drain directly into the right atrium — its arch turns forward at the T4/T5 level to end in the back of the superior vena cava, opposite the second right costal cartilage, just before that vein itself opens into the right atrium. The azygos vein's own blood reaches the atrium only indirectly, via the SVC.",
      },
    },
    {
      key: "regarding-the-azygos-vein-the-following-statements-are-corre-75a55e25",
      conceptKey: "azygos-vein.arch-and-relation-to-right-lung-root",
      difficulty: "Moderate",
      questionType: "Recall of a false statement",
      learningObjective: "State that the azygos arch passes above the root of the RIGHT lung, not the left.",
      explanations: {
        A: "True, so not the exception. The azygos vein is the important link between the superior and inferior vena cavae.",
        B: "True, so not the exception. The azygos vein ascends through the posterior mediastinum before its arch turns forward in the superior mediastinum.",
        C: "This is the exception, and the answer. The azygos vein's arch passes above the root of the RIGHT lung, not the left — the azygos system belongs entirely to the right side of the thorax (with the two hemiazygos veins compensating for the absence of a left-sided equivalent).",
        D: "True of general azygos anatomy, so not the exception the question targets here.",
        E: "True, so not the exception. The right vagus nerve descends beside the trachea and is crossed on its right by the azygos arch as the arch turns forward to the SVC.",
      },
    },
    {
      key: "one-of-the-following-veinsdrain-into-the-right-brachiocephal-5f88d0f2",
      conceptKey: "brachiocephalic-veins.formation-and-course",
      difficulty: "Moderate",
      questionType: "Recall",
      learningObjective: "Name the right lymphatic duct as a tributary of the right brachiocephalic vein.",
      explanations: {
        A: "The azygos vein drains into the superior vena cava, not into the right brachiocephalic vein — the two are different large veins at different levels of the superior mediastinum.",
        B: "The thoracic duct drains into the LEFT brachiocephalic vein, not the right — it is one of that vein's four named tributaries.",
        C: "This is the correct answer. The right brachiocephalic vein receives the right internal thoracic vein, the right first posterior intercostal vein and the right lymphatic duct, which is the mirror-image drainage of the thoracic duct into the left brachiocephalic vein on the opposite side.",
        D: "The superior hemiazygos vein drains into the azygos vein, not into the right brachiocephalic vein — it belongs to the left-sided intercostal venous pattern entirely.",
      },
    },
    {
      key: "the-superior-vena-cava-choose-the-true-answer-27315868",
      conceptKey: "superior-vena-cava.formation-course-and-tributaries",
      difficulty: "Hard",
      questionType: "Recall",
      learningObjective: "State that the SVC forms behind the manubrium, close to the sternum.",
      explanations: {
        A: "The SVC's one tributary, the azygos vein, terminates on its posterior surface at the level of the SECOND right costal cartilage, not the first left — this option reverses both the side and the exact level.",
        B: "This is the correct answer. The two brachiocephalic veins unite behind the lower border of the first right costal cartilage, close to the sternum and behind the manubrium's own lower part, to form the superior vena cava.",
        D: "The SVC's upper half lies in the superior mediastinum and its lower half in the middle mediastinum (inside the fibrous pericardium) — it never lies in the posterior mediastinum, which holds the descending aorta, azygos system, oesophagus and thoracic duct instead.",
      },
    },
    {
      key: "which-one-of-the-followings-regarding-the-superior-vena-cava-c979512d",
      conceptKey: "superior-vena-cava.formation-course-and-tributaries",
      difficulty: "Moderate",
      questionType: "Recall of a false statement",
      learningObjective: "State that the azygos vein, not the hemiazygos vein, is the SVC's only direct tributary.",
      explanations: {
        A: "True, so not the exception. The SVC is formed behind the lower border of the first right costal cartilage, close to the manubrium sterni.",
        B: "True, so not the exception. The SVC opens into the right atrium behind the third right costal cartilage.",
        C: "This is the exception, and the answer. The SVC's only named tributary is the azygos vein, not the hemiazygos vein — the two hemiazygos veins reach the SVC only indirectly, by first draining into the azygos vein, which is itself the single structure that joins the SVC directly.",
        D: "True, so not the exception. The SVC's upper half lies within the superior mediastinum.",
      },
    },
    {
      key: "regarding-the-vessels-of-the-thoracic-wall-the-following-sta-738e0dae",
      conceptKey: "azygos-vein.arch-and-relation-to-right-lung-root",
      difficulty: "Hard",
      questionType: "Recall of a false statement",
      learningObjective: "State that the inferior hemiazygos vein's origin is described as variable, not as a fixed origin from the right renal vein.",
      explanations: {
        A: "True, so not the exception. The first and second posterior intercostal arteries are branches of the superior intercostal artery, itself a costocervical-trunk branch of the subclavian artery, rather than of the descending thoracic aorta.",
        B: "True, so not the exception. The first posterior intercostal vein on each side ends in the corresponding brachiocephalic vein, bypassing the azygos/hemiazygos system entirely.",
        C: "This is the exception, and the answer. The department book describes the inferior hemiazygos vein's origin as variable, rather than fixing it to any single named vessel — crediting it with a usual origin from the right renal vein overstates a genuinely unfixed anatomical detail (and confuses it with the left renal vein's own tributaries in the abdomen, a different system altogether).",
        D: "True of the thoracic wall's general lymphatic pattern, so not the exception sought here.",
        E: "True, so not the exception. The two hemiazygos veins cross the midline behind the descending thoracic aorta on their way to join the azygos vein, at the levels of T8 and T9.",
      },
    },
    {
      key: "the-left-superior-intercostal-vein-drains-usually-into-the-f54a19d6",
      conceptKey: "posterior-intercostal-and-subcostal-veins.termination",
      difficulty: "Moderate",
      questionType: "Recall",
      learningObjective: "State that the left superior intercostal vein ends in the left brachiocephalic vein, not in an azygos arch.",
      explanations: {
        A: "The azygos vein receives the RIGHT superior intercostal vein, not the left — the two sides genuinely do not mirror each other here.",
        B: "The left superior intercostal vein ends in the left brachiocephalic vein, not the left subclavian vein — the subclavian vein is one segment further out, before it even joins the internal jugular to form the brachiocephalic vein.",
        C: "This is the correct answer. The left superior intercostal vein, formed by the second, third and fourth left posterior intercostal veins, drains into the left brachiocephalic vein — unlike its right-sided counterpart, which ends in the arch of the azygos vein instead, because the left side has no azygos arch of its own to receive it.",
        D: "The superior hemiazygos vein receives the fifth to eighth left posterior intercostal veins, a lower group than the second to fourth veins that form the left superior intercostal vein.",
      },
    },
    {
      key: "the-right-superior-intercostal-veins-drains-into-tepe-gd-8dd78bd6",
      conceptKey: "posterior-intercostal-and-subcostal-veins.termination",
      difficulty: "Moderate",
      questionType: "Recall",
      learningObjective: "State that the right superior intercostal vein ends in the arch of the azygos vein.",
      explanations: {
        A: "The right brachiocephalic vein receives only the FIRST right posterior intercostal vein directly — the second, third and fourth unite instead as the right superior intercostal vein, which bypasses the brachiocephalic vein and ends in the azygos arch.",
        B: "The left brachiocephalic vein receives the LEFT superior intercostal vein, not the right — the two sides drain into entirely different vessels.",
        D: "This is the correct answer. The right superior intercostal vein, formed by the second, third and fourth right posterior intercostal veins, ends in the arch of the azygos vein — the asymmetric counterpart to the left superior intercostal vein, which ends in the left brachiocephalic vein instead because the left side has no azygos arch.",
      },
    },
    {
      key: "regarding-intercostal-blood-vessels-one-is-true-3464230a",
      conceptKey: "anterior-intercostal-veins.drainage-pattern",
      difficulty: "Hard",
      questionType: "Recall",
      learningObjective: "State that the upper anterior intercostal veins (first to third space) drain directly into the internal thoracic vein.",
      explanations: {
        A: "The right superior intercostal vein ends in the arch of the azygos vein, not directly in the brachiocephalic vein — only the first right posterior intercostal vein (a separate vessel) drains straight into the right brachiocephalic vein.",
        B: "Every intercostal space, including the second, contains a posterior intercostal artery — the first and second simply arise from the superior intercostal artery rather than the descending thoracic aorta, but they are still present.",
        C: "Not all posterior intercostal arteries arise from the descending thoracic aorta — only the third to eleventh spaces do; the first two instead arise from the superior intercostal artery, a costocervical-trunk branch of the subclavian artery.",
        D: "This is the correct answer. The anterior intercostal veins of the upper spaces — the first, second and third — drain directly into the internal thoracic vein (the vessel older texts call the internal mammary vein), before the pattern changes for the middle and lower spaces, which reach it only indirectly through the venae comitantes of the internal thoracic and musculophrenic arteries.",
      },
    },
  ],
}
