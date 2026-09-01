import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: "Subdivisions of the Mediastinum",
  modulePath: "104 CPS > Anatomy > Mediastinum",
  articleId: "ART-104-ANA-MEDIASTINUM-SUBDIVISIONS",

  concepts: [
    {
      // Reuse: already minted from the article-authoring pass as
      // CON-RES-F78FBA0BF1E673 (docs/Kasr-Source-Imports/concept/104-CPS-anatomy-concepts.md).
      // mintConceptId is a pure function of module+key, so declaring the same
      // key here resolves to the same id — build-batches.ts's existingConceptIds
      // treats this as a reuse and only appends evidence/article, never
      // redefining the hand-authored record.
      key: "mediastinum.subdivisions-and-boundaries",
      label: "An oblique plane from the sternal angle to the T4/T5 disc divides the mediastinum into superior and inferior parts, and the inferior part further splits into anterior, middle and posterior compartments around the pericardium",
      definition: "The mediastinum is the thick median partition of the thoracic cavity, extending from the sternum to the vertebral column and from the thoracic inlet to the diaphragm. An imaginary plane from the sternal angle in front to the lower border of T4, or the T4/T5 disc, behind divides it into a superior mediastinum above and an inferior mediastinum below. The inferior mediastinum is further subdivided into an anterior mediastinum, a narrow space in front of the pericardium; a middle mediastinum, occupied by the pericardium and its contents; and a posterior mediastinum, behind the pericardium and in front of the vertebral column.",
      objective: "Draw the plane that divides superior from inferior mediastinum and name the three subdivisions of the inferior mediastinum.",
      pitfall: "Placing the dividing plane at the sternal angle alone. It runs from the sternal angle in front to the T4/T5 disc behind — an oblique plane, not a horizontal line at one level.",
      subject: "resp",
      primary: "DIS-ANA-T04",
      secondary: [],
      modulePath: "104 CPS > Anatomy > Mediastinum",
      type: "structural_description",
      aliases: ["Superior mediastinum", "Inferior mediastinum", "Anterior mediastinum", "Middle mediastinum"],
    },
    {
      // Reuse: CON-RES-F360EFDEA84D58.
      key: "superior-mediastinum.contents",
      label: "The superior mediastinum's contents run front to back in three groups: veins and thymus retrosternally, the aortic arch with its branches and the phrenic/vagus/left recurrent laryngeal nerves centrally, and trachea-oesophagus-thoracic duct most posteriorly",
      definition: "The superior mediastinum lies between the manubrium in front, the upper four thoracic vertebrae behind, the thoracic inlet above and the sternal angle plane below. Retrosternally it holds the two brachiocephalic veins, the upper half of the superior vena cava, the left superior intercostal vein and the thymus gland; more centrally, the arch of the aorta and its three branches — brachiocephalic, left common carotid and left subclavian — occupying the concavity of which sits the bifurcation of the pulmonary trunk; the two vagi and phrenic nerves and the left recurrent laryngeal nerve; and, most posteriorly, the trachea, the oesophagus behind it, and the thoracic duct ascending behind the oesophagus's left border.",
      objective: "List the four groups of structures in the superior mediastinum from front to back and name one member of each group.",
      pitfall: "Placing the thoracic duct in front of the oesophagus. The book's front-to-back order for the superior mediastinum ends with trachea, then oesophagus, then thoracic duct — the duct is the most posterior of the three tubal structures, not the trachea.",
      subject: "resp",
      primary: "DIS-ANA-T04",
      secondary: [],
      modulePath: "104 CPS > Anatomy > Mediastinum",
      type: "structural_description",
      aliases: ["Contents of the superior mediastinum", "Ascending aorta not a superior mediastinum content"],
    },
    {
      // Reuse: CON-RES-03AB23DA654BAF.
      key: "posterior-mediastinum.boundaries-and-contents",
      label: "The posterior mediastinum lies between the pericardium/diaphragm in front and T5-T12 behind, and its contents fall into five groups: the descending aorta, the azygos/hemiazygos veins, the vagi with the sympathetic trunks, the oesophagus with the thoracic duct, and the posterior mediastinal lymph nodes",
      definition: "Its boundaries are the pericardium above and the diaphragm below in front, and the lower eight thoracic vertebrae, T5 to T12, behind. Its contents are five groups: the descending thoracic aorta and its branches; the azygos and hemiazygos venous system; the two vagi, which form the oesophageal plexuses, together with the sympathetic trunks and their splanchnic branches; the oesophagus and the thoracic duct, which runs along its right side; and the posterior mediastinal lymph nodes.",
      objective: "Give the boundaries of the posterior mediastinum and list its contents by group.",
      pitfall: "Stopping at four groups. The posterior mediastinal lymph nodes are the fifth, and they are the group the solved copy of this paper loses.",
      subject: "resp",
      primary: "DIS-ANA-T04",
      secondary: [],
      modulePath: "104 CPS > Anatomy > Mediastinum",
      type: "structural_description",
      aliases: ["Contents of the posterior mediastinum", "Internal thoracic artery not a posterior mediastinum content"],
    },
    {
      // New concept, synthesised from facts already sourced and minted
      // elsewhere in this module's corpus (the mediastinum-subdivisions
      // article's own dividing plane, plus the pulmonary-trunk/aorta,
      // trachea-bronchi and brachiocephalic-vein articles' own surface-level
      // statements) — no single fact here is invented, only collected.
      key: "sternal-angle.surface-and-vertebral-correlations",
      label: "The sternal angle marks the second costal cartilage, the plane dividing superior from inferior mediastinum, the tracheal bifurcation and the beginning/end of the aortic arch — but not the origin of the SVC or the articulation of the first rib",
      definition: "The sternal angle (the manubriosternal joint) is where the second costal cartilage articulates with the sternum — not the first rib, which articulates with the manubrium above the angle. Because the plane through the sternal angle continues backwards to the T4/T5 disc, everything the department book places at that oblique plane is read off the same landmark: it is the plane separating the superior from the inferior mediastinum; it is where the trachea bifurcates into the two principal bronchi; it is where the ascending aorta ends and the arch of the aorta begins, opposite the second right sternocostal junction, and where the arch itself ends on the left, opposite the same T4/T5 level; and it is where the azygos vein's arch turns forward to enter the superior vena cava, opposite the second right costal cartilage. The superior vena cava itself is not formed at this level — the two brachiocephalic veins unite behind the first right costal cartilage, one space higher, close to the manubrium rather than at the angle.",
      objective: "List every structure or event the department book places at the sternal-angle plane, and name the one large-vein event that instead happens one space higher, at the first costal cartilage.",
      pitfall: "Crediting the sternal angle with the formation of the superior vena cava, or with the first rib's articulation. Both belong one level higher, at the first costal cartilage/manubrium — the sternal angle itself is the SECOND costal cartilage's level.",
      subject: "resp",
      primary: "DIS-ANA-T04",
      secondary: [],
      modulePath: "104 CPS > Anatomy > Mediastinum",
      type: "structural_description",
      aliases: ["Manubriosternal joint", "Angle of Louis", "Landmarks at the sternal angle"],
    },
  ],

  questions: [
    {
      key: "anterior-media-stinum-space-mark-the-unacceptable-statement-78c36e40",
      conceptKey: "mediastinum.subdivisions-and-boundaries",
      difficulty: "Hard",
      questionType: "Not sittable as printed.",
      learningObjective: "Not sittable as printed.",
      explanations: {},
      exclude: true,
      excludeReason: "The department book (ART-104-ANA-MEDIASTINUM-SUBDIVISIONS) states the anterior mediastinum contains only \"the sternopericardial ligaments, the lower part of the thymus and a few lymph nodes\" — confirming options A (thymus) and E (pericardiosternal/sternopericardial ligament) as genuine contents, but neither confirming nor denying B (internal thoracic vessels) or C (sternocostalis muscle) as anterior-mediastinum contents. With the marked \"unacceptable\" answer (D, intercostal nerves' anterior cutaneous branches) resolvable only by assuming B and C are both true — which the source does not state — the single-answer determination cannot be made from the book alone.",
    },
    {
      key: "among-the-followings-the-most-superficial-structure-in-the-s-103cf442",
      conceptKey: "superior-mediastinum.contents",
      difficulty: "Moderate",
      questionType: "Recall",
      learningObjective: "Place the superior vena cava as the most anterior (retrosternal) of these four superior-mediastinum structures.",
      explanations: {
        A: "The vagus nerves run centrally in the superior mediastinum, alongside the aortic arch's branches — a deeper plane than the retrosternal veins, so not the most superficial choice here.",
        B: "This is the correct answer. The department book's own front-to-back reading of the superior mediastinum starts retrosternally with the brachiocephalic veins and the superior vena cava, before the aortic arch and its branches occupy the middle plane and the trachea, oesophagus and thoracic duct sit most posteriorly. Of the four structures offered, the SVC alone belongs to that first, most anterior (most superficial) group.",
        C: "The left subclavian artery is one of the aortic arch's three branches, part of the middle group in the superior mediastinum's front-to-back order — deeper than the retrosternal veins.",
        D: "The thoracic duct is the most posterior of the superior mediastinum's tubal structures, ascending behind the oesophagus's left border — the opposite extreme from \"most superficial\".",
      },
    },
    {
      key: "in-which-mediastinum-is-the-thoracic-part-of-the-trachea-loc-90a56cbb",
      conceptKey: "superior-mediastinum.contents",
      difficulty: "Easy",
      questionType: "Recall",
      learningObjective: "Place the trachea's thoracic part among the superior mediastinum's contents.",
      explanations: {
        A: "This is the correct answer. The trachea's thoracic part is the most posterior tubal structure of the three named in the superior mediastinum's front-to-back list — behind the aortic arch and its branches, and in front of the oesophagus — and the whole of that list, veins to tubes, belongs to the superior, not the inferior, mediastinum.",
        B: "The posterior mediastinum lies below the sternal-angle plane and holds the descending thoracic aorta, the azygos system, the oesophagus and the thoracic duct, but not the trachea — the trachea has already bifurcated into the two principal bronchi by the time that plane is reached.",
        C: "The middle mediastinum is occupied by the pericardium and its contents (heart, ascending aorta, pulmonary trunk, lower SVC) — the trachea plays no part in it.",
        D: "The anterior mediastinum is the narrow space in front of the pericardium, holding the sternopericardial ligaments, the lower thymus and a few lymph nodes — not the trachea.",
      },
    },
    {
      key: "in-which-mediastinum-is-the-thoracic-part-of-the-trachea-loc-a3662d0e",
      conceptKey: "superior-mediastinum.contents",
      difficulty: "Easy",
      questionType: "Recall",
      learningObjective: "Not sittable as printed.",
      explanations: {},
      exclude: true,
      excludeReason: "Same stem as in-which-mediastinum-is-the-thoracic-part-of-the-trachea-loc-90a56cbb, but this row's extracted key (B, \"Posterior\") contradicts the department book, which places the trachea's thoracic part among the superior mediastinum's contents (ART-104-ANA-MEDIASTINUM-SUBDIVISIONS: \"most posteriorly, the trachea, the oesophagus behind it\" — posterior WITHIN the superior mediastinum, not the posterior mediastinum as a compartment). The sibling row keys the same question A (\"Superior\") at the same answerConfidence tier; kept that one and excluded this duplicate rather than teach an inverted fact.",
    },
    {
      key: "regarding-the-superior-mediastinum-select-the-incorrect-answ-8ac910fc",
      conceptKey: "mediastinum.subdivisions-and-boundaries",
      difficulty: "Moderate",
      questionType: "Recall of a false statement",
      learningObjective: "Locate the superior/inferior mediastinum dividing plane at the sternal angle, not at the third costal cartilage.",
      explanations: {
        A: "True, so not the answer sought. The superior mediastinum's anterior boundary is the manubrium sterni.",
        B: "True, so not the answer sought. The arch of the aorta lies wholly within the superior mediastinum.",
        C: "This is the incorrect statement, and the answer. The superior mediastinum is separated from the inferior mediastinum by the oblique plane running from the sternal angle in front to the T4/T5 disc behind — not a plane through the third costal cartilage. The sternal angle itself marks the SECOND costal cartilage, one space above the distractor's claim.",
        D: "True, so not the answer sought. The thymus (or its lower part, once involuted) is a superior mediastinum content, listed retrosternally alongside the great veins.",
      },
    },
    {
      key: "the-following-are-the-contents-of-superior-mediastinum-excep-f5f71f58",
      conceptKey: "superior-mediastinum.contents",
      difficulty: "Moderate",
      questionType: "Recall of a false statement",
      learningObjective: "Exclude the inferior vena cava from the superior mediastinum's contents.",
      explanations: {
        A: "True, so not the exception. The left brachiocephalic vein is one of the retrosternal contents of the superior mediastinum.",
        B: "This is the exception, and the answer. The inferior vena cava plays no part in the superior mediastinum at all — its short intrathoracic course, after piercing the diaphragm, runs straight into the middle mediastinum's pericardial sac to reach the right atrium, well below the sternal-angle plane.",
        C: "True, so not the exception. The arch of the aorta is the central content of the superior mediastinum, occupying the plane between the retrosternal veins and the posterior trachea/oesophagus.",
        D: "True, so not the exception. The oesophagus is the second of the superior mediastinum's three posterior tubal structures.",
        E: "True, so not the exception. The thoracic duct is the most posterior of those three tubal structures, ascending behind the oesophagus's left border.",
      },
    },
    {
      key: "which-of-the-followings-is-not-a-content-in-the-superior-med-2c3e2242",
      conceptKey: "superior-mediastinum.contents",
      difficulty: "Moderate",
      questionType: "Recall of a false statement",
      learningObjective: "Distinguish the ascending aorta (middle mediastinum) from the arch of the aorta (superior mediastinum).",
      explanations: {
        A: "The trachea is a genuine superior mediastinum content, so not the answer sought.",
        B: "This is the correct answer. The ascending aorta lies wholly within the fibrous pericardium, in the middle mediastinum — it ends behind the second right sternocostal junction, at the sternal-angle plane, which is exactly where the ARCH of the aorta begins and the superior mediastinum starts. The ascending aorta itself never enters the superior mediastinum.",
        C: "The arch of the aorta is a genuine superior mediastinum content (unlike the ascending aorta), so not the answer sought.",
        D: "The left brachiocephalic vein is a genuine, retrosternal superior mediastinum content, so not the answer sought.",
      },
    },
    {
      key: "the-following-are-the-contents-of-the-posterior-mediastinum-2d0d25e8",
      conceptKey: "posterior-mediastinum.boundaries-and-contents",
      difficulty: "Moderate",
      questionType: "Recall of a false statement",
      learningObjective: "Exclude the internal thoracic artery from the posterior mediastinum's five content groups.",
      explanations: {
        A: "True, so not the exception. The descending (thoracic) aorta and its branches are the posterior mediastinum's arterial content.",
        B: "True, so not the exception. The oesophagus is one of the posterior mediastinum's two tubal contents.",
        C: "True, so not the exception. The thoracic duct, running along the oesophagus's right side, is the other.",
        D: "True, so not the exception. The azygos vein, with the hemiazygos system, is the posterior mediastinum's venous content.",
        E: "This is the exception, and the answer. The internal thoracic artery runs in the thoracic WALL, behind the costal cartilages close to the sternal margin — it never enters the posterior mediastinum, which the department book's own five-group list (arteries, veins, nerves, tubes, lymph nodes) does not include it under.",
      },
    },
    {
      key: "the-following-structure-lies-behind-the-oseophagus-0548e986",
      conceptKey: "posterior-mediastinum.boundaries-and-contents",
      difficulty: "Moderate",
      questionType: "Recall",
      learningObjective: "Place the thoracic duct behind the oesophagus as it ascends through the mediastinum.",
      explanations: {
        A: "This is the correct answer. The thoracic duct runs immediately behind the oesophagus along its course through the thorax — on its right side low in the posterior mediastinum, then crossing behind it to ascend on its left border once it reaches the superior mediastinum. \"Behind the oesophagus\" is exactly how the department book's own superior-mediastinum account places it: trachea, then oesophagus, then the thoracic duct most posteriorly.",
        B: "The inferior vena cava has no course through the mediastinum at all — its short intrathoracic segment runs straight from the diaphragm into the pericardium to reach the right atrium, nowhere near the oesophagus.",
        C: "The internal thoracic artery runs in the thoracic wall, well anterior to the oesophagus, not behind it.",
        D: "The right coronary artery lies in the coronary sulcus on the heart's own surface, inside the pericardium — an entirely different plane from the oesophagus's posterior-mediastinal course.",
      },
    },
    {
      key: "at-the-level-of-the-sternal-angle-the-following-features-are-835ef4ab",
      conceptKey: "sternal-angle.surface-and-vertebral-correlations",
      difficulty: "Hard",
      questionType: "Recall of a false statement",
      learningObjective: "Place the SVC's own formation one space above the sternal angle, at the first rather than the second costal cartilage.",
      explanations: {
        A: "True, so not the exception. The second costal cartilage articulates with the sternum exactly at the sternal angle — the landmark's own anatomical definition.",
        B: "True, so not the exception. The trachea bifurcates into the two principal bronchi at the sternal-angle level.",
        C: "True, so not the exception. The ascending aorta ends and the arch of the aorta begins at this level, opposite the second right sternocostal junction.",
        D: "This is the exception, and the answer. The superior vena cava is not begun at the sternal angle — the two brachiocephalic veins unite one space higher, behind the lower border of the FIRST right costal cartilage, close to the manubrium. The sternal angle instead marks where the azygos vein's arch joins the already-formed SVC, and where the SVC pierces the pericardium.",
        E: "True, so not the exception. The sternal-angle plane is exactly where the department book divides the superior from the inferior mediastinum.",
      },
    },
    {
      key: "the-most-superficial-structure-in-the-thoracic-inlet-is-the-4687669f",
      conceptKey: "superior-mediastinum.contents",
      difficulty: "Moderate",
      questionType: "Recall",
      learningObjective: "Place the superior vena cava as the most anterior of these four structures crossing the thoracic inlet into the superior mediastinum.",
      explanations: {
        A: "The vagus nerve descends centrally, alongside the aortic arch's branches, once past the inlet — a deeper plane than the retrosternal veins.",
        B: "This is the correct answer. Of the structures that cross the thoracic inlet to continue into the superior mediastinum, the great veins (brachiocephalic veins and the upper SVC) run in the most anterior, retrosternal plane — in front of the arch of the aorta and its branches centrally, and well in front of the trachea, oesophagus and thoracic duct posteriorly.",
        C: "The left subclavian artery is one of the aortic arch's three branches, occupying the middle plane once it enters the superior mediastinum — deeper than the retrosternal veins.",
        D: "The thoracic duct is the most posterior of the three tubal structures in the superior mediastinum, the opposite extreme from \"most superficial\".",
      },
    },
    {
      key: "at-the-sternal-angle-one-is-wrong-909d35f4",
      conceptKey: "sternal-angle.surface-and-vertebral-correlations",
      difficulty: "Hard",
      questionType: "Recall of a false statement",
      learningObjective: "Attribute the sternal angle to the second, not the first, costal cartilage.",
      explanations: {
        A: "True, so not the answer sought. The arch of the aorta ends at the T4/T5 disc level — the same oblique plane as the sternal angle, read from behind rather than in front.",
        B: "This is the wrong statement, and the answer. It is the SECOND rib's costal cartilage that articulates with the sternum at the sternal angle, not the first. The first rib articulates with the manubrium above the angle, one space higher — exactly where the two brachiocephalic veins unite to form the SVC.",
        C: "True, so not the answer sought. The trachea bifurcates into the two principal bronchi at the sternal angle.",
        D: "True, so not the answer sought. The azygos vein's arch enters the superior vena cava at the sternal-angle level, opposite the second right costal cartilage.",
      },
    },
  ],
}
