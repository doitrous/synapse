import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: "Anatomy Cardiovascular System — The Heart (external features)",
  modulePath: "104 CPS > Anatomy > Cardiovascular System > The heart",
  articleId: "ART-104-ANA-HEART-CHAMBERS",

  concepts: [
    // Sparse reuse, not a fresh mint: find-existing.mjs "heart surfaces and
    // borders" was clean ("safe to create"), but a shorter, more distinctive
    // search — "sternocostal" — surfaced a hand-authored, pinned record
    // (CON-CVS-74C0F9BB0D3490, canonical_key heart.external-features)
    // already sitting in docs/Kasr-Source-Imports/concept/104-CPS-anatomy-
    // concepts.md, cross-linked as this same article's own related_concepts.
    // Declaring the same canonical_key here resolves to that pinned id and
    // emits a sparse reuse row — every other field below is inert for the
    // build, kept only to satisfy the McqConcept type, and restated close to
    // the pinned record's own wording so a reader is not misled by a
    // diverging copy.
    {
      key: "heart.external-features",
      label: "The heart lies obliquely in the middle mediastinum, one third to the right and two thirds to the left of the median plane, with a base, an apex, two surfaces and four borders",
      definition: "The heart is a hollow muscular pump lying inside the pericardium in the middle mediastinum, behind the sternum and adjoining costal cartilages, one third of its bulk to the right of the median plane and two thirds to the left. It is conical, with a base (posterior surface, formed mainly by the left atrium), an apex (formed wholly by the left ventricle, the lowest and leftmost point of the heart), a sternocostal (anterior) surface and a diaphragmatic (inferior) surface — on which the heart rests — and four borders, separated on the surface by the coronary sulcus into atrial and ventricular parts and, front and back, by the interventricular grooves between the two ventricles. The right ventricle, lying anteriorly, forms most of the sternocostal surface; the left ventricle lies posteriorly and to the left, contributing mainly to the apex and the diaphragmatic surface, and its wall is roughly three times thicker than the right ventricle's because it must generate systemic rather than pulmonary pressures. The left atrium receives the four pulmonary veins besides the left atrioventricular orifice.",
      objective: "State the heart's position relative to the median plane, and name its base, apex, two surfaces and four borders and which chamber forms each — including that the right, not the left, ventricle lies anteriorly and forms most of the sternocostal surface.",
      pitfall: "Forgetting that the apex is entirely left ventricle and assuming the left ventricle, because it is the thicker and more forceful chamber, must also be the more anterior one. It is the right ventricle that lies anteriorly, forming most of the sternocostal surface, while the left ventricle sits posteriorly and to the left, forming the apex and most of the diaphragmatic surface.",
      subject: "cvs",
      primary: "DIS-ANA-T04",
      secondary: ["SYS-CVS-T01-S01-M01"],
      modulePath: "104 CPS > Anatomy > Cardiovascular System > The heart",
      type: "structural_description",
      aliases: ["Base of the heart", "Apex of the heart", "Sternocostal surface", "Diaphragmatic surface"],
      gaps: [
        "ART-104-ANA-HEART-CHAMBERS states the sternocostal surface has 'an atrial part above-right and a ventricular part below-left' and separately states the diaphragmatic surface is 'formed mainly by the left ventricle', but does not itself spell out in one sentence that the RIGHT ventricle specifically predominates on the sternocostal surface or that it lies anterior to the left ventricle. This is standard, undisputed gross anatomy, defensible by elimination from what the article does state (apex and diaphragmatic surface are left-ventricular; the remaining anterior/sternocostal territory is right-ventricular) and from the sibling article ART-104-ANA-HEART-VESSELS-NERVES-FIXATION, which separately states the left coronary artery's anterior interventricular branch supplies only 'a strip of the right ventricle' on the sternocostal surface, implying the right ventricle otherwise dominates it. Flagged for the anatomy-article-authoring lane to state explicitly.",
      ],
    },
  ],

  questions: [
    // Bank-tagged "Veins" (a down-payment row surfaced while closing that
    // leaf, genuinely gross heart anatomy) — routed here as the CVS
    // anatomy leaf's own first claimed content.
    {
      key: "regarding-the-anatomy-of-the-heart-following-statements-are-62f7c901",
      conceptKey: "heart.external-features",
      difficulty: "Moderate",
      questionType: "Recall of a false statement",
      learningObjective: "Identify that the RIGHT, not the left, ventricle lies anterior and forms most of the heart's sternocostal surface.",
      explanations: {
        A: "True, so not the exception. The sternocostal (anterior) surface of the heart is formed mainly by the right ventricle, which lies anteriorly.",
        B: "True, so not the exception. The heart's diaphragmatic (inferior) surface, formed mainly by the left ventricle, rests upon the diaphragm.",
        C: "The exception, and the answer. This reverses the true spatial relationship: it is the RIGHT ventricle that lies anterior, forming most of the sternocostal surface, while the left ventricle sits more posteriorly and to the left, contributing mainly to the apex and the diaphragmatic surface — not anterior to the right ventricle at all.",
        D: "True, so not the exception. Because it must generate systemic, not pulmonary, pressures, the left ventricular wall is roughly three times thicker than the right ventricle's.",
        E: "True, so not the exception. The left atrium receives the four pulmonary veins returning oxygenated blood from the lungs.",
      },
    },
  ],
}
