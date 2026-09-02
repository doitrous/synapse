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
    // run40, "The heart" batch. Sparse reuse, not a fresh mint:
    // CON-CVS-42C907CE4749DC, canonical_key already pinned in 104-CPS-
    // anatomy-concepts.md, same article and module_subject as
    // heart.external-features above — found by grepping that file for
    // "right atrium" before minting anything.
    {
      key: "heart.right-chambers-interior",
      label: "The right atrium is split by the crista terminalis into a rough atrium proper and a smooth sinus venarum; the right ventricle has an inflow part with three papillary muscles and a smooth infundibulum",
      definition: "The right atrium's cavity is divided by the crista terminalis, a muscular ridge between the openings of the superior and inferior venae cavae, into an anterior rough atrium proper, roughened by the comb-like musculi pectinati, and a posterior smooth sinus venarum. The right ventricle's inflow part, entered through the tricuspid orifice, has coarse trabeculae carneae and three papillary muscles — anterior, posterior and septal — whose chordae tendinae anchor the three tricuspid cusps, and a septomarginal trabecula (moderator band) running from the septum to the anterior papillary muscle, carrying the right bundle branch. Its smooth outflow part, the infundibulum, leads to the pulmonary orifice.",
      objective: "Name the structure that separates the rough from the smooth part of the right atrium, and describe the three papillary muscles and the moderator band of the right ventricle.",
      pitfall: "Crediting the right ventricle with musculi pectinati. Those belong to the atrium's own rough part; the right ventricle's own ridged feature is trabeculae carneae, a different structure the department book's own comparison table lists as coarser and fewer than the left ventricle's.",
      subject: "cvs",
      primary: "DIS-ANA-T04",
      secondary: ["SYS-CVS-T01-S01-M01"],
      modulePath: "104 CPS > Anatomy > Cardiovascular System > The heart",
      type: "structural_description",
      aliases: ["Crista terminalis", "Sinus venarum", "Moderator band", "Septomarginal trabecula"],
    },
    // Sparse reuse: CON-CVS-ECDC97B24BB5DE, canonical_key already pinned in
    // 104-CPS-anatomy-concepts.md, same article as above.
    {
      key: "heart.left-chambers-interior",
      label: "The left atrium receives four pulmonary veins and is mostly smooth; the left ventricle's inflow part has two papillary muscles feeding the mitral valve and its outflow part is the fibrous aortic vestibule",
      definition: "The left atrium, smaller than the right, forms most of the base and upper border of the heart; it is smooth except for a few musculi pectinati in its auricle, and receives the four pulmonary veins on its posterior wall in addition to the left atrioventricular orifice. The left ventricle, with a wall three times thicker than the right ventricle's, has a rough inflow part with fine and numerous trabeculae carneae and two papillary muscles — anterior and posterior — whose chordae attach to the two cusps of the mitral valve, and a smooth outflow part, the aortic vestibule, formed of fibrous tissue and leading to the aortic orifice.",
      objective: "Name the two papillary muscles of the left ventricle and the valve their chordae serve, and state what opens into the left atrium besides the left atrioventricular orifice.",
      pitfall: "Giving the left ventricle three papillary muscles by analogy with the right. It has only two, anterior and posterior, matching its valve's two cusps — the right ventricle's third, septal, papillary muscle has no left-sided counterpart. A second trap: assuming the more forceful, thicker-walled left ventricle must be the LESS trabeculated one — the department book's own comparison states the opposite, fine and numerous trabeculae in the left ventricle against few and coarse ones in the right.",
      subject: "cvs",
      primary: "DIS-ANA-T04",
      secondary: ["SYS-CVS-T01-S01-M01"],
      modulePath: "104 CPS > Anatomy > Cardiovascular System > The heart",
      type: "structural_description",
      aliases: ["Aortic vestibule", "Mitral valve papillary muscles", "Four pulmonary veins"],
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
    // run40, "The heart" batch. Bank-tagged leaf null, chapter "Heart" —
    // genuinely this same heart.external-features concept, no new search
    // needed.
    {
      key: "in-the-anatomical-position-the-heart-has-a-7f24a6c3",
      conceptKey: "heart.external-features",
      difficulty: "Moderate",
      questionType: "Discrimination among near-miss options",
      learningObjective: "Identify the correct composition of the heart's sternocostal surface (right atrium, right ventricle, left auricle and a strip of left ventricle), as opposed to incorrect right-border, posterior-surface and diaphragmatic-surface statements.",
      explanations: {
        A: "The right border of the heart is formed by the right atrium alone, not by the right atrium and right ventricle together — the right ventricle lies more anteriorly, contributing to the sternocostal surface instead of the right border.",
        B: "Correct. The sternocostal (anterior) surface is formed mainly by the right atrium and right ventricle, with the left auricle contributing a small part at its upper left and a narrow strip of the left ventricle showing at its left edge, next to the anterior interventricular groove.",
        C: "The posterior surface (base) of the heart is formed mainly by the LEFT atrium, receiving the four pulmonary veins, together with a small part of the right atrium — not the right atrium and left ventricle as this option states.",
        D: "The diaphragmatic (inferior) surface is formed mainly by the LEFT ventricle, with a strip of the right ventricle, and does not include the left atrium or the inferior vena cava as named surface-forming structures here.",
      },
    },
    // Leaf-mismatch reroute onto heart.left-chambers-interior — bank-tagged
    // leaf null, chapter "Heart", genuinely this same concept's own fact
    // (left atrium receives the four pulmonary veins).
    {
      key: "which-of-the-following-structures-open-into-the-left-atrium-345fc7a5",
      conceptKey: "heart.left-chambers-interior",
      difficulty: "Easy",
      questionType: "Recall of a definition",
      learningObjective: "State that the pulmonary veins open into the left atrium, not the anterior cardiac vein, coronary sinus or superior vena cava, all of which open into the right atrium instead.",
      explanations: {
        A: "Correct. The four pulmonary veins open into the left atrium's posterior wall, the vessels that return oxygenated blood from the lungs to the heart — besides the left atrioventricular orifice, they are the only structures opening into this chamber.",
        B: "The anterior cardiac veins bypass the coronary sinus entirely and open directly into the RIGHT atrium, not the left.",
        C: "The coronary sinus, draining most of the heart's own venous blood, opens into the RIGHT atrium, between the IVC opening and the right atrioventricular orifice — not the left atrium.",
        D: "The superior vena cava opens into the upper part of the RIGHT atrium, not the left — one of the great veins that, together with the IVC and coronary sinus, defines the right atrium's own smooth sinus venarum.",
      },
    },
    // Leaf-mismatch reroute onto heart.left-chambers-interior — bank-tagged
    // leaf reclustered under "Electrical Activity of the Heart", genuinely
    // gross heart-chamber anatomy (the false statement is about pulmonary
    // veins opening into the LEFT, not right, atrium — this concept's own
    // fact exactly).
    {
      key: "all-the-following-are-correct-except-bbd77f2f",
      conceptKey: "heart.left-chambers-interior",
      difficulty: "Moderate",
      questionType: "Recall of a false statement",
      learningObjective: "Identify that the four pulmonary veins drain oxygenated blood into the LEFT, not the right, atrium as the exception among otherwise true statements.",
      explanations: {
        A: "True, so not the exception. The right atrial wall and the left atrial wall are comparably thin, both considerably thinner than either ventricle's own muscular wall.",
        B: "True, so not the exception. The left ventricle is separated from the left atrium by the bicuspid (mitral) valve, whose two cusps' chordae anchor to the ventricle's two papillary muscles.",
        C: "True, so not the exception. The Purkinje system's fast, near-simultaneous conduction lets all parts of the ventricular myocardium begin contracting together, rather than as a slow, spreading, uncoordinated wave.",
        D: "The exception, and the answer. The four pulmonary veins open into the LEFT atrium, not the right — they carry oxygenated blood returning from the lungs specifically to the chamber that then passes it, via the mitral valve, into the left ventricle for systemic distribution. The right heart instead receives deoxygenated blood from the systemic venous system (SVC, IVC, coronary sinus).",
      },
    },
    // Leaf-mismatch reroute onto heart.left-chambers-interior — bank-tagged
    // leaf null, chapter "Heart", genuinely this same concept's own
    // trabeculae-carneae comparison.
    {
      key: "the-internal-structure-of-left-ventricle-one-is-correct-f794c1b3",
      conceptKey: "heart.left-chambers-interior",
      difficulty: "Moderate",
      questionType: "Discrimination among near-miss options",
      learningObjective: "State that the left ventricle's trabeculae carneae are fine and numerous, as opposed to incorrect wall-thickness, moderator-band and papillary-muscle-count statements.",
      explanations: {
        A: "Backwards. The left ventricle's wall is roughly THREE TIMES THICKER than the right ventricle's, not thinner — it must generate systemic, not pulmonary, pressures.",
        B: "Correct. The department book's own comparison of the two ventricles states the left ventricle's trabeculae carneae as fine and numerous, against the right ventricle's few and coarse ones — the opposite pairing from what intuition (thicker wall, therefore coarser features) might suggest.",
        C: "The septomarginal trabecula (moderator band), carrying the right bundle branch to the anterior papillary muscle, is a RIGHT ventricular structure with no left-ventricular counterpart at all.",
        D: "The left ventricle has only TWO papillary muscles, anterior and posterior, matching its valve's two cusps — three papillary muscles (anterior, posterior and septal) is the right ventricle's own count, matching the tricuspid valve's three cusps.",
      },
    },
    // Leaf-mismatch reroute onto heart.right-chambers-interior — bank-tagged
    // leaf null, chapter "Heart", genuinely this same concept's own
    // moderator-band fact.
    {
      key: "the-following-structure-is-present-in-the-cavity-of-the-righ-0db915f2",
      conceptKey: "heart.right-chambers-interior",
      difficulty: "Moderate",
      questionType: "Discrimination among near-miss options",
      learningObjective: "Identify the septomarginal trabecula (moderator band) as present in the right ventricle's cavity, as opposed to the crista terminalis, musculi pectinati or fossa ovalis, all of which are atrial structures.",
      explanations: {
        A: "The crista terminalis is a right ATRIAL structure, the muscular ridge separating the atrium's rough and smooth parts — not a feature of the right ventricle's own cavity.",
        B: "Musculi pectinati are the comb-like ridges of the right atrium's rough anterior part and auricle, not a right ventricular feature; the right ventricle's own ridged feature is trabeculae carneae, a different structure.",
        C: "Correct. The septomarginal trabecula (moderator band) runs from the interventricular septum to the base of the anterior papillary muscle within the right ventricle's own cavity, bracing the ventricle and carrying the right bundle branch of the conducting system to the ventricular wall.",
        D: "The fossa ovalis is a right ATRIAL structure, on the interatrial septal wall — the remnant of the fetal foramen ovale — not a feature of the right ventricle's own cavity.",
      },
    },
    // Leaf-mismatch reroute onto heart.right-chambers-interior — bank-
    // tagged leaf null, chapter "Heart", genuinely this same concept's own
    // rough-vs-smooth chamber distinction.
    {
      key: "the-right-ventricle-contains-all-the-following-structures-ex-71e6d172",
      conceptKey: "heart.right-chambers-interior",
      difficulty: "Moderate",
      questionType: "Recall of a false statement",
      learningObjective: "Identify pectinate (musculi pectinati) muscles as an atrial, not ventricular, feature — the exception among genuine right ventricular structures.",
      explanations: {
        A: "True, so not the exception. The right ventricle's inflow part carries three papillary muscles — anterior, posterior and septal — whose chordae anchor the tricuspid valve's three cusps.",
        B: "True, so not the exception. Chordae tendinae connect the tricuspid valve's cusps to the papillary muscles within the right ventricle's own cavity.",
        C: "The exception, and the answer. Pectinate (musculi pectinati) muscles are an ATRIAL feature — the comb-like ridges of the right atrium's rough anterior part and auricle — not a right ventricular structure at all; the ventricle's own analogous ridged feature is instead trabeculae carneae.",
        D: "True, so not the exception. Trabeculae carneae are the right ventricle's own coarse muscular ridges, part of its rough inflow part.",
        E: "True, so not the exception. The moderator band (septomarginal trabecula) runs from the septum to the anterior papillary muscle within the right ventricle, bracing it and carrying the right bundle branch.",
      },
    },
    {
      // Only 3 options survive (A, B, D — no C), below the platform's
      // 4-to-5-option import contract.
      key: "at-which-of-the-following-levels-does-the-base-of-the-heart-3ba1e7d4",
      conceptKey: "heart.external-features",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Bank extraction recovered only 3 options (A, B, D — no C), below the platform's 4-to-5-option import contract. No other row in this run's own batch tests the vertebral-level range of the base of the heart specifically, so the fact itself is a genuine, not merely duplicate, loss.",
    },
    {
      // Only 3 options survive (A, B, D — no C), below the platform's
      // 4-to-5-option import contract.
      key: "concerning-the-left-ventricle-select-the-incorrect-statement-6dc70dc8",
      conceptKey: "heart.left-chambers-interior",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Bank extraction recovered only 3 options (A, B, D — no C), below the platform's 4-to-5-option import contract. The bank's own editorial key (B, false) also directly conflicts with the department book's own comparison table (p.76, 'trabeculae: few and coarse' in the right ventricle vs 'numerous and fine' in the left), under which B would in fact read TRUE, not false — a second, independent reason not to author this row as extracted. The genuine facts it touches (LV three times thicker, LV trabeculae fine and numerous) are already kept cleanly in this file's sibling row the-internal-structure-of-left-ventricle-one-is-correct-f794c1b3.",
    },
    {
      // Stem-absorbed-option-A corruption (a recurring hazard class in this
      // branch): the bank's own key text ('coronary sinus') is embedded
      // unlettered inside the stem itself, and only 3 real lettered options
      // (B, C, D) survive — below the platform's 4-to-5-option contract.
      key: "during-the-heart-development-the-left-horn-of-the-sinus-veno-a2954fc5",
      conceptKey: "heart.left-chambers-interior",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Stem-absorbed-option-A corruption: the stem itself ends '...becomes smaller and forms: @)coronary sinus' — the bank's own correct-answer text sits unlettered inside the stem, and only 3 real lettered options survive (B, C, D), below the platform's 4-to-5-option import contract. The underlying fact (left sinus-venosus horn becomes the coronary sinus) is well-sourced (department book, p.136) and worth a future clean-option row if one is found.",
    },
    {
      // Corrupted/mismatched-content row: option A's text ('1st right
      // costal cartilage') belongs to a different fact entirely (SVC
      // formation) and bears no relation to this stem ('the left horn of
      // the sinus venosus becomes... '), and only 3 lettered options
      // survive (A, C, D) — below the platform's 4-to-5-option contract.
      key: "during-the-heart-development-the-left-horn-of-the-sinus-veno-fb6e29c0",
      conceptKey: "heart.left-chambers-interior",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Only 3 lettered options survive (A, C, D — no B), below the platform's 4-to-5-option import contract, and the handwritten-recovered answer (A, 'the-1st-right-costal-cartilage') is itself a content mismatch — that fact belongs to the superior vena cava's own formation, not to the sinus venosus's left horn this stem asks about, indicating a merge with a different exam item. The underlying fact (left sinus-venosus horn becomes the coronary sinus) is well-sourced (department book, p.136) and worth a future clean-option row if one is found.",
    },
    {
      // Only 3 options survive (B, C, D — no A, with option A's text
      // absorbed unlettered into the stem itself), below the platform's
      // 4-to-5-option import contract.
      key: "one-of-the-following-does-not-open-into-the-right-atrium-2-a-3a31c50e",
      conceptKey: "heart.right-chambers-interior",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Stem-absorbed-option-A corruption: the stem itself ends '...into the right atrium: (2 azygos vein' — the intended option A text sits unlettered inside the stem, and only 3 real lettered options survive (B, C, D), below the platform's 4-to-5-option import contract.",
    },
    {
      // Only 3 options survive (A, B, D — no C), below the platform's
      // 4-to-5-option import contract.
      key: "one-of-the-following-does-not-open-into-the-right-atrium-679e33ac",
      conceptKey: "heart.right-chambers-interior",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Bank extraction recovered only 3 options (A, B, D — no C), below the platform's 4-to-5-option import contract. This is a clean duplicate of the sibling row one-of-the-following-does-not-open-into-the-right-atrium-2-a-3a31c50e, itself also excluded for the same 3-option shortfall — no complete-option copy of this question exists in the bank.",
    },
    {
      // Only 3 options survive (A, B, C — no D), below the platform's
      // 4-to-5-option import contract.
      key: "one-of-the-followings-is-not-true-concerning-the-left-atrium-cc2b5add",
      conceptKey: "heart.left-chambers-interior",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Bank extraction recovered only 3 options (A, B, C — no D), below the platform's 4-to-5-option import contract ('3 options — the contract is 4 to 5'). The credited fact (the left atrium does NOT form the main lower part of the left border — that is the left ventricle/auricle's own contribution) is not otherwise tested in this run's own batch, so it is a genuine, not merely duplicate, loss.",
    },
  ],
}
