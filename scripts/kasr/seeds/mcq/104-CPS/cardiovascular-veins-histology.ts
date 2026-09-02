import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: "Histology Cardiovascular System — Veins",
  modulePath: "104 CPS > Histology > Cardiovascular System > Veins",
  articleId: "ART-104-HIS-ARTERIES-AND-VEINS",

  // A major dedup-research finding, same class as the A-V Connections
  // cluster's own: find-existing.mjs "medium vein" / "venule" run before
  // minting anything surfaced TWO hand-authored, pinned, unimported concepts
  // already sitting in docs/Kasr-Source-Imports/concept/
  // 104-CPS-histology-concepts.md — an earlier, separate authoring pass
  // covering this exact leaf (module_subject "104 CPS > Histology >
  // Cardiovascular System > Veins" on one of them) in full. Both concepts
  // below are sparse reuses, not fresh mints — every fact this leaf's own
  // bank tests is already taught there, in more depth than a fresh mint
  // would have added.

  concepts: [
    {
      // Sparse reuse, not a fresh mint: this exact canonical_key already has
      // a hand-authored, pinned record (CON-CVS-B29610035B568D,
      // module_subject "104 CPS > Histology > Cardiovascular System >
      // Veins" — this exact leaf) covering the venule, medium vein and
      // large vein (inferior vena cava) in one classification sweep — the
      // venule's thin subendothelium/absent IEL/pericyte-and-reticular-
      // fibre media/gradually-appearing smooth muscle, the medium vein's
      // thin wall/collapsing lumen/valves/adventitia-dominant wall, and
      // the large vein's thick wall/blurred intima-media boundary/
      // longitudinally-arranged adventitial smooth muscle enabling
      // respiration-linked length change. Declaring the same canonical_key
      // here resolves to that pinned id and emits a sparse reuse row
      // (article_ids/exam_signal only) — every other field below is inert
      // for the build, kept only to satisfy the McqConcept type, and
      // restated close to the pinned record's own wording so a reader is
      // not misled by a diverging copy.
      key: "vein-classification.venule-medium-and-large-vein-histology",
      label: "Veins are classed as small venules, medium-sized muscular veins or large veins, each thinner-walled than its arterial counterpart",
      definition: "Veins run from small (venules) through medium-sized (muscular) to large. Small veins (venules) have an intima of endothelium on a thin basal lamina with a thin subendothelium and no internal elastic lamina; their media, in the postcapillary venule, is only pericytes and reticular fibres, with a few smooth-muscle cells appearing gradually as calibre increases; there is no external elastic lamina, and the adventitia is relatively thick. Medium-sized veins have a thin wall and a wide lumen that collapses and holds blood after death (unlike the narrow, rounded, empty lumen of a medium artery); valves are present; the intima is thin and unfolded, poor in elastic fibres, with no internal elastic lamina; the media is thin, made of smooth muscle with few elastic fibres and usually no external elastic lamina; the adventitia is thick — the thickest of the vein's three coats. Large veins, such as the inferior vena cava, have a thick wall and wide lumen: an intima whose subendothelial connective tissue carries some smooth muscle, often blurring the boundary with the media; a relatively thin media of circularly arranged smooth muscle; and the thickest layer of all, an adventitia carrying longitudinal smooth-muscle fibres that let the vena cava elongate and shorten with respiration. Valves occur in medium and some large veins, particularly in the lower limb.",
      objective: "Name the three classes of vein in order of increasing size and state what distinguishes each class's intima, media and adventitia.",
      pitfall: "Assuming the adventitia is always the thickest coat in every vein for the same reason. In a medium vein it is simply the largest of three thin layers; in a large vein its longitudinal smooth muscle is doing active mechanical work, letting the vessel change length with respiration — the same label, two different jobs.",
      subject: "cvs",
      primary: "DIS-HIS-T03",
      secondary: ["SYS-CVS-T01-S01"],
      modulePath: "104 CPS > Histology > Cardiovascular System > Veins",
      type: "classification",
      aliases: ["Venule histology", "Medium-sized vein", "Large vein", "Venous valves"],
      conflicts: [
        "CON-CVS-08AA7F26A9BD28 ('Postcapillary venule wall', canonical_key teaching.postcapillary-venule.media) is a live, single-sentence fact from a different, cross-university Systems-view catalogue (pinned to ART-CVS-CARDIAC-HISTOLOGY, no 104-CPS module, GENERATED_BY-blind to this pipeline) naming the same pericyte-and-reticular-fibre venule media fact — same 'different pipeline, no safe sparse-update path' reasoning already documented in this branch for other leaves' overlaps, not reused for that reason.",
      ],
    },
    {
      // Sparse reuse, not a fresh mint: this exact canonical_key already has
      // a hand-authored, pinned record (CON-CVS-3C04F2DED454C9,
      // module_subject "Arteries", same article) setting a medium artery
      // against a medium vein across thickness, lumen, valves and all
      // three tunics — exactly the comparison-table content several of
      // this leaf's own bank rows test. Declaring the same canonical_key
      // resolves to that pinned id and emits a sparse reuse row.
      key: "artery-vs-vein.medium-sized-histological-comparison",
      label: "A medium artery and a medium vein differ across every coat: thickness, lumen, valves and the three tunics",
      definition: "The department book sets a medium-sized artery against a medium-sized vein across six features. Thickness: the artery has a thick wall, the vein a thin one. Lumen: the artery's is narrow and rounded, does not collapse after death and holds no blood after death; the vein's is wide, collapses after death and holds blood after death. Valves: absent in the artery, present in the vein. Tunica intima: thick and folded in the artery, rich in elastic fibres with a clear internal elastic lamina; thin and unfolded in the vein, poor in elastic fibres with no internal elastic lamina. Tunica media: thick in the artery, made of smooth muscle and elastic fibres, sometimes with an external elastic lamina; thin in the vein, made of smooth muscle with few elastic fibres and no external elastic lamina. Tunica adventitia: thin in the artery, thick in the vein.",
      objective: "Set a medium artery against a medium vein across thickness, lumen, valves and all three tunics.",
      pitfall: "Explaining the collapsed, blood-filled postmortem lumen of the vein as a structural coincidence rather than a direct consequence of its thin wall and low intraluminal pressure relative to the artery's thick, muscular one.",
      subject: "cvs",
      primary: "DIS-HIS-T03",
      secondary: ["SYS-CVS-T01-S01"],
      modulePath: "104 CPS > Histology > Cardiovascular System > Veins",
      type: "comparison",
      aliases: ["Medium artery versus medium vein", "Artery-vein comparison table"],
    },
  ],

  questions: [
    // --- vein-classification.venule-medium-and-large-vein-histology ---
    {
      key: "all-characters-of-venule-except-785c7756",
      conceptKey: "vein-classification.venule-medium-and-large-vein-histology",
      difficulty: "Moderate",
      questionType: "Recall of a false statement",
      learningObjective: "Identify the absence of a well-developed external elastic lamina in a venule, unlike the venule's genuine thin subendothelium, gradual smooth muscle and early pericytes.",
      explanations: {
        A: "True, so not the exception. A venule's subendothelium is thin connective tissue.",
        B: "True, so not the exception. A venule's media gains only a few smooth-muscle fibres gradually as its calibre widens toward the medium vein.",
        C: "The exception, and the answer. A venule carries no external elastic lamina at all — that structure belongs to a muscular artery's wall, not to a low-pressure venule.",
        D: "True, so not the exception. Pericytes and reticular fibres support the post-capillary venule's own media from its smallest calibre onward.",
      },
    },
    {
      key: "tunica-adventitia-with-longitudinal-smooth-muscle-fibers-is-26042411",
      conceptKey: "vein-classification.venule-medium-and-large-vein-histology",
      difficulty: "Easy",
      questionType: "Structure and function",
      learningObjective: "Name the inferior vena cava as the vessel identified by longitudinal smooth muscle in its tunica adventitia.",
      explanations: {
        A: "Longitudinal smooth muscle in the tunica adventitia is also described as a secondary feature of large elastic arteries, but among these four options the inferior vena cava is the vessel this specific identifying feature is most reliably tested on.",
        B: "A medium artery's wall is defined by its smooth-muscle-rich media and prominent internal elastic lamina, not by adventitial longitudinal muscle.",
        C: "A medium vein's adventitia, though the thickest of its own three coats, is not described as carrying this distinctive longitudinal muscle arrangement — that is a large-vein feature.",
        D: "The inferior vena cava's tunica adventitia carries longitudinal smooth-muscle fibres, the thickest layer of its wall, letting the vessel elongate and shorten with respiration.",
      },
    },
    {
      key: "longitudinal-smooth-muscle-fiber-in-large-vein-570e9e44",
      conceptKey: "vein-classification.venule-medium-and-large-vein-histology",
      difficulty: "Moderate",
      questionType: "Mechanism",
      learningObjective: "State that the inferior vena cava's adventitial longitudinal muscle lets it elongate and shorten with respiration, not support the endothelium, nourish the wall, or prevent backflow.",
      explanations: {
        A: "Supporting the endothelium is the job of the subendothelial connective tissue in the tunica intima, not the outer adventitia's longitudinal muscle.",
        B: "Nourishing a large vessel's outer wall by diffusion is the job of the vasa vasorum, small nutrient vessels within the adventitia — a separate structure from the longitudinal smooth muscle itself.",
        C: "The inferior vena cava's longitudinal adventitial muscle lets it elongate and shorten as respiration shifts intrathoracic and intra-abdominal pressure, changing the vessel's length rather than resisting the movement.",
        D: "Preventing retrograde movement of blood under gravity is a valve's job; this muscle's role is mechanical length change, not backflow prevention.",
      },
    },
    {
      key: "smooth-muscle-fibers-are-found-in-the-tunica-adventitia-of-006aa8a2",
      conceptKey: "vein-classification.venule-medium-and-large-vein-histology",
      difficulty: "Easy",
      questionType: "Structure and function",
      learningObjective: "Restate the inferior-vena-cava identification against a fresh set of distractors including the aorta.",
      explanations: {
        A: "The inferior vena cava's tunica adventitia carries longitudinally arranged smooth-muscle fibres, the thickest layer of its wall.",
        B: "A muscular artery's adventitia is a comparatively thin, unremarkable outer coat; its defining feature is instead its media's smooth muscle and prominent internal elastic lamina.",
        C: "A medium vein's adventitia, though the thickest of its own three coats, is not described as carrying this longitudinal muscle — that feature belongs specifically to the great veins.",
        D: "The aorta's defining wall feature is its media's 40 to 70 elastic membranes, not adventitial smooth muscle.",
      },
    },
    {
      key: "medium-sized-vein-is-characterized-by-eeba9e52",
      conceptKey: "vein-classification.venule-medium-and-large-vein-histology",
      difficulty: "Easy",
      questionType: "Structure and function",
      learningObjective: "State that a medium vein's tunica adventitia, not its media, is the thickest of its three coats.",
      explanations: {
        A: "In a medium-sized vein the tunica adventitia is the thickest of the three coats — the largest of three otherwise thin layers.",
        B: "Medium veins generally lack a well-developed internal and external elastic lamina; both are instead features of arteries.",
        C: "A medium vein's thin wall and low intraluminal pressure make its lumen collapse and hold blood after death, not stay uncollapsed — the reverse of what this option states.",
        D: "A subendothelium rich in elastic fibres is not a standout, defining feature specifically emphasised for medium veins in standard histology teaching.",
      },
    },
    {
      key: "medium-sized-arteries-d8faffa8",
      conceptKey: "vein-classification.venule-medium-and-large-vein-histology",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "The stem is a bare fragment ('Medium sized arteries') with no actual question attached, and only two option-like fragments survive ('Medium sized veins', 'Inferior vena cava') without any indication of what property or comparison is being asked about. Not answerable as extracted.",
    },
    {
      key: "concerning-large-veins-which-one-of-the-following-statements-1b1fd630",
      conceptKey: "vein-classification.venule-medium-and-large-vein-histology",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Option A has absorbed what should be a separate option B ('Its adventitia may contain smooth muscles. B- They have well defined internal elastic lamina') into one merged cell, leaving only 3 distinguishable choices (merged-A, C, D) for what should be a 4-option item — no distractor note exists for a standalone 'B' because no standalone B ever survived extraction. The same option-merge corruption class documented throughout this bank; unfixable at the seed layer since no stem/option-override field exists.",
    },
    {
      key: "the-medium-sized-vein-is-characterized-by-efb9e135",
      conceptKey: "vein-classification.venule-medium-and-large-vein-histology",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Only 2 options survived extraction (A, B) — well below the platform's 4-to-5-option import contract, and no third or fourth choice is recoverable from the source, so this cannot be authored as extracted despite the handwritten answer mark being legible.",
    },
    {
      key: "concerning-the-medium-sized-veins-all-of-the-following-are-t-7d6b234b",
      conceptKey: "vein-classification.venule-medium-and-large-vein-histology",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Options merge in pairs — A absorbs a separate B ('It has thin wall. B- It has wide lumen'), and C absorbs a separate D ('Tunica intima has internal elastic lamina. D- Tunica media is thin with fewer elastic fibers') — leaving only 2 distinguishable choices for a 4-option item, the same A+B/C+D merge-corruption class documented throughout this bank.",
    },
    {
      key: "the-wall-of-inferior-vena-cava-contains-5098daea",
      conceptKey: "vein-classification.venule-medium-and-large-vein-histology",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Options A and C have each absorbed two separate claims into a single unusable blob (A merges 'tunica media is thick' — false for a vein — with 'bundles of smooth muscle in tunica adventitia' — true for the IVC; C merges 'have internal elastic lamina' with 'have external elastic lamina', both generally false for veins). With each surviving option mixing a true and a false sub-claim, or two false sub-claims, no single option can be cleanly selected as the correct answer.",
    },
    {
      key: "tunica-media-of-vein-is-typically-wider-than-tunica-media-of-1c2af8e7",
      conceptKey: "vein-classification.venule-medium-and-large-vein-histology",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "The stem itself is an incomplete, unlabelled statement bled from what should have been option A ('Tunica media of vein is typically wider than tunica media of artery'), and of the two lettered options that survive, B (adventitia of vein wider than that of artery) and D (intima more folded in medium veins than same-sized arteries) are both independently true, standard histological facts — with two plausible true answers and no printed key or source resolving which single one this bank intends, this cannot be confidently keyed.",
    },
    {
      key: "post-capillary-venule-is-lined-by-epithelium-2ee47577",
      conceptKey: "vein-classification.venule-medium-and-large-vein-histology",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Option B has merged three separate choices into one run-on cell ('simple cubical c)simple squamous d)stratified cubical'), leaving only 2 distinguishable choices (A, merged-B) for what should be a 4-option item. Even setting the corruption aside, the printed answer (A, 'simple columnar') does not match the standard teaching that a post-capillary venule's endothelium is simple squamous — only a specialised high-endothelial venule of lymphoid tissue is cuboidal — and no source here resolves which the question actually intends, so the credited answer cannot be taught as a direct, confident statement.",
    },
    {
      key: "regarding-the-fetal-circulation-and-circulatory-changes-afte-6044f685",
      conceptKey: "vein-classification.venule-medium-and-large-vein-histology",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Both surviving substantive options are confidently false under standard fetal circulation physiology (oxygenated blood returns to the fetus via the umbilical vein, not the umbilical artery; the ductus arteriosus shunts blood from the pulmonary trunk to the aorta, not from the pulmonary veins), and the third surviving 'option' (a bare diagnosis name, 'Atrial septal defect') does not fit the sentence structure of a statement to evaluate as true or false. Content-wise this row is fetal-circulation anatomy, not vein histology — leaf-tagged Veins in the bank, bookkept here since it is unanswerable regardless of its true topic.",
    },
    {
      key: "regarding-the-heart-choose-the-correct-answer-it-lies-in-the-c3cd415b",
      conceptKey: "vein-classification.venule-medium-and-large-vein-histology",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "The likely-correct embedded statement (the heart lies in the middle mediastinum, which is true) has no surviving option letter; option A is a bare, incomplete fragment ('The right atrium'); and the three remaining lettered options are each confidently false under standard cardiac anatomy. Content-wise this row is heart-chamber anatomy, not vein histology — leaf-tagged Veins in the bank, bookkept here since it is unanswerable regardless of its true topic.",
    },

    // --- artery-vs-vein.medium-sized-histological-comparison ---
    {
      key: "prominent-internal-elastic-lamina-iel-is-seen-in-8c080de2",
      conceptKey: "artery-vs-vein.medium-sized-histological-comparison",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "Identify a prominent internal elastic lamina as the defining feature of a medium-sized (muscular) artery, present in no vein calibre.",
      explanations: {
        A: "In the aorta, the internal elastic lamina cannot be told apart as a separate structure — it blends among the many other elastic laminae that fill the media — so it is not 'prominent' the way a muscular artery's is.",
        B: "A prominent, clearly visible internal elastic lamina is the defining feature marking the boundary between a medium (muscular) artery's tunica intima and its smooth-muscle-dominated tunica media.",
        C: "A medium-sized vein's intima is thin and unfolded, without a well-developed internal elastic lamina at all.",
        D: "The inferior vena cava, like veins generally, has no well-developed internal elastic lamina; its own defining feature is the longitudinal smooth muscle of its adventitia, not an intimal elastic lamina.",
      },
    },
    {
      key: "the-internal-elastic-lamina-is-prominent-in-5830712a",
      conceptKey: "artery-vs-vein.medium-sized-histological-comparison",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "Restate the same internal-elastic-lamina rule against a different set of distractors, including the large elastic artery.",
      explanations: {
        A: "In a large elastic artery, the internal elastic lamina is present but not distinguishable as a separate structure from the many other elastic laminae filling the media, so it is not the 'prominent' feature this question tests.",
        B: "A medium-sized vein's thin, unfolded intima carries no well-developed internal elastic lamina.",
        C: "A prominent internal elastic lamina, clearly separating intima from media, is the signature histological feature of a medium-sized (muscular) artery.",
        D: "The inferior vena cava, like veins generally, has no well-developed internal elastic lamina; its own defining feature is its adventitia's longitudinal smooth muscle instead.",
      },
    },
    {
      key: "the-following-is-a-difference-between-medium-sized-artery-an-8769d21d",
      conceptKey: "artery-vs-vein.medium-sized-histological-comparison",
      difficulty: "Moderate",
      questionType: "Recall of a true statement",
      learningObjective: "Confirm the adventitia-dominant wall of a medium vein as a genuine artery-vein difference, ruling out three reversed or invented alternatives.",
      explanations: {
        A: "The reverse is true: a medium artery's thick, smooth-muscle-dominated media is far thicker than a medium vein's own thin media.",
        B: "The tunica adventitia is indeed relatively thick in a medium-sized vein — the thickest of its own three coats, unlike the media-dominated wall of a medium artery.",
        C: "The reverse is true: a prominent internal elastic lamina is the muscular artery's own defining feature; a medium vein lacks a well-developed one.",
        D: "The reverse is true: a medium vein's tunica intima is thin and unfolded; it is the medium artery whose intima is thick and folded.",
      },
    },
    {
      key: "the-following-is-a-difference-between-medium-sized-artery-an-e8d4f013",
      conceptKey: "artery-vs-vein.medium-sized-histological-comparison",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "Identify the collapsed, blood-filled postmortem lumen of a medium vein as the genuine artery-vein difference, ruling out reversed intima, media and lumen-content claims.",
      explanations: {
        A: "The reverse is true: the postmortem distinguishing feature of the intima is that it appears folded in a vein (from wall collapse), not a simple difference in intimal thickness.",
        B: "The reverse is true: a medium vein's media has relatively sparse elastic fibres compared with an artery's; arteries are the vessel type with the well-developed elastic component in the media.",
        C: "After death, a medium-sized vein's thin wall and low intraluminal pressure let its lumen collapse into a folded, blood-filled shape — a practical clue for distinguishing artery from vein in a fixed section.",
        D: "The reverse is true: arteries typically appear relatively empty of blood after death, since elastic recoil expels much of their luminal contents as the vessel constricts.",
      },
    },
    {
      // kasr-104-author-run45: Veins cluster, excluded. The printed key
      // (B, "Muscular arteries") contradicts this leaf's own already-
      // established fact — longitudinal smooth muscle in the tunica
      // adventitia is a LARGE VEIN feature (see this leaf's own
      // tunica-adventitia-with-longitudinal-smooth-muscle-fibers-is-
      // 26042411 and longitudinal-smooth-muscle-fiber-in-large-vein-
      // 570e9e44), not a muscular-artery one. Options C and D are also
      // visibly corrupted (C runs two unrelated fragments together; D,
      // "No hyaline cartilage", is an unrelated bled-in fragment from a
      // different question entirely, about bronchial cartilage).
      key: "longitudinal-smooth-muscle-fibers-are-present-in-adventitia-abc2ab0d",
      conceptKey: "vein-classification.venule-medium-and-large-vein-histology",
      difficulty: "Hard",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "The printed answer (B, 'Muscular arteries') contradicts this leaf's own already-established fact — longitudinal smooth muscle in the tunica adventitia is a LARGE VEIN feature (confirmed twice already on this exact leaf: tunica-adventitia-with-longitudinal-smooth-muscle-fibers-is-26042411, longitudinal-smooth-muscle-fiber-in-large-vein-570e9e44), not a muscular artery's. Options C and D are also visibly corrupted — C runs two unrelated fragments together ('Interior vena cava' plus a bled-in intrapulmonary-bronchus stem), and D ('No hyaline cartilage') is an unrelated fragment from a different question about bronchial cartilage entirely. Excluded rather than keyed against a source this leaf's own sibling questions already establish differently.",
    },
    {
      key: "the-internal-elastic-lamina-in-the-medium-sized-artery-is-an-b0c0cd7a",
      conceptKey: "artery-vs-vein.medium-sized-histological-comparison",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Options A and C each merge two of what were originally four matrix choices (artery/vein internal-elastic-lamina combinations: prominent/absent, prominent/prominent, absent/prominent, absent/absent) into one run-on cell, and option D is a stray fragment ('Internal elastic lamina.') repeating the stem's own subject rather than offering a genuine fourth choice — no single lettered option is a clean, standalone statement a student could select. The same underlying fact survives cleanly on this leaf's own prominent-internal-elastic-lamina-iel-is-seen-in and the-internal-elastic-lamina-is-prominent-in questions.",
    },
  ],
}
