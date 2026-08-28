import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: "Anatomy Respiratory System — Lungs (mediastinal surface impressions)",
  modulePath: "104 CPS > Anatomy > Lungs",
  articleId: "ART-104-ANA-LUNG-SURFACE-FEATURES",

  concepts: [
    // Sparse reuse, not a fresh mint: find-existing.mjs "mediastinal surface"
    // surfaced a hand-authored, pinned record (CON-RES-DC1111DA6DD151,
    // canonical_key lung.mediastinal-surface-impressions) already sitting in
    // docs/Kasr-Source-Imports/concept/104-CPS-anatomy-concepts.md, already
    // cross-linked as this same article's own related_concepts and already
    // re-emitted once (as a sparse-update row) into the generated
    // 104-CPS-concepts.md by the separate written-paper pipeline. Declaring
    // the same canonical_key here resolves to that pinned id and emits this
    // MCQ pipeline's own first sparse-reuse row for it — every field below
    // restates the pinned record's own wording (label, definition,
    // explicit_objective, pitfalls) rather than diverging from it.
    {
      key: "lung.mediastinal-surface-impressions",
      label: "The mediastinal surfaces of the two lungs carry different impressions: the right is grooved by the SVC and azygos arch, the left by the aortic arch and its two great branches",
      definition: "On the right lung's mediastinal surface, in front of and above the hilum lie the cardiac impression (related to the right atrium and auricle), the superior vena caval groove, the impression for the ascending aorta, the inferior vena caval groove, the groove for the arch of the azygos vein and the tracheal and oesophageal grooves, the latter continuing behind the hilum. On the left lung's mediastinal surface, the cardiac impression is related mainly to the left ventricle and atrium; above the hilum lie the broad groove for the arch of the aorta — separated from the lung by the left phrenic and vagus nerves, the superficial cardiac plexus and the left superior intercostal vein — and the grooves for the left common carotid and left subclavian arteries, with the oesophageal groove behind the subclavian groove; behind the hilum lies the groove for the descending thoracic aorta.",
      objective: "Name the vascular impressions above and in front of the hilum on the right lung and the left, and state the five structures separating the aortic arch groove from the left lung.",
      pitfall: "Placing the ascending aorta's impression on the left lung. It is a right-lung impression, triangular and anterior to the hilum; the left lung's equivalent anterior impression is the pulmonary trunk, a different vessel entirely.",
      subject: "resp",
      primary: "DIS-ANA-T04",
      secondary: ["SYS-RES-T01-S01-M02"],
      modulePath: "104 CPS > Anatomy > Lungs",
      type: "structural_description",
      aliases: ["Cardiac impression", "Groove for the arch of the aorta", "Groove for the azygos vein"],
    },
  ],

  questions: [
    // Bank-tagged "Veins" (a down-payment row surfaced while closing that
    // leaf, genuinely Lungs anatomy — see run30's own PROGRESS.md note).
    // answerConfidence was "editorial-no-printed-key" in the bank, but the
    // editorial guess (D) is independently confirmed, not contradicted, by
    // this concept's own pinned definition ("behind the hilum lies the
    // groove for the descending thoracic aorta") and by the live article's
    // identical sentence — no source conflict, so authored directly.
    {
      key: "the-mediastinal-surface-of-the-left-lang-shows-an-impression-24a9bb35",
      conceptKey: "lung.mediastinal-surface-impressions",
      difficulty: "Moderate",
      questionType: "Recall of the correct statement",
      learningObjective: "State that, behind the hilum, the left lung's mediastinal surface is grooved by the descending thoracic aorta, not by structures that belong to the right lung's mediastinal surface.",
      explanations: {
        A: "The superior vena cava is a right-sided structure; it grooves the mediastinal surface of the RIGHT lung, in front of and above the hilum, not the left.",
        B: "The inferior vena cava is likewise a right-sided structure, grooving the mediastinal surface of the right lung, not the left.",
        C: "True on its own terms — the pulmonary ligament, a loose fold of mediastinal pleura below the lung root, does give the pulmonary veins room to distend — but this is an unrelated fact about the pleura, not one of the left lung's own mediastinal-surface impressions the stem is asking about.",
        D: "Correct. Behind the hilum, the mediastinal surface of the left lung carries the groove for the descending thoracic aorta, which lies against the lung on that side throughout its thoracic course.",
      },
    },
  ],
}
