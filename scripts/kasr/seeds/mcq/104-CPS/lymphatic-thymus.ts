import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: "Lymphatic and Macrophage System — Thymus",
  modulePath: "104 CPS > Histology > Lymphatic and Macrophage System > Thymus",
  articleId: "ART-104-HIS-LYMPHOID-ORGANS",

  concepts: [
    {
      key: "thymus.dual-origin-and-epithelial-reticular-cells",
      label: "The thymus has a double embryological origin — mesodermal T-lymphocytes and endodermal epithelial reticular cells — and the epithelial reticular cells, not fibroblasts, form its reticular background and blood-thymic barrier",
      definition: "The thymus is a primary lymphoid organ with an endocrine function, and unlike the lymph node and spleen it has a double origin: its lymphocytes (the thymocytes) are mesodermal, while its epithelial reticular cells are endodermal. This is the thymus's distinguishing structural feature — the reticular background that in a lymph node or spleen is made of ordinary connective-tissue reticular cells and fibres is, in the thymus, made of these epithelial reticular cells instead, and they produce no reticular fibre. The epithelial reticular cells surround the cortical thymocytes and macrophages, form a complete sheathing layer with tight junctions between them as part of the blood-thymic barrier (together with continuous capillary endothelium, its thick basal lamina, and a macrophage-bearing perivascular space), and secrete the thymic hormones that stimulate T-lymphocyte maturation and activity.",
      objective: "State the thymus's double embryological origin and identify the epithelial reticular cell, not the fibroblast, as the endodermal cell that forms its reticular stroma and blood-thymic barrier.",
      pitfall: "Assuming the thymus's reticular framework is built the same way as the lymph node's or spleen's, by mesenchymal reticular cells and reticular fibres. The thymus is the one lymphoid organ where that framework is epithelial and endodermal, produces no reticular fibre, and doubles as part of the blood-thymic barrier — a structural difference listed as one of the thymus's 'special features'.",
      subject: "haem",
      primary: "DIS-HIS-T02",
      secondary: [],
      modulePath: "104 CPS > Histology > Lymphatic and Macrophage System > Thymus",
      type: "structural_description",
      aliases: ["Epithelial reticular cells", "Blood-thymic barrier", "Thymus origin"],
    },
    {
      key: "thymus.hassalls-corpuscles-cortex-medulla-contrast-and-reticular-cell-functions",
      label: "The thymic cortex stains darker (dense small lymphocytes) than the medulla, which alone holds the acidophilic, age-increasing Hassall's corpuscles; the thymus has no plasma cells, no afferent lymphatics and no lymphoid nodules",
      definition: "Each thymic lobule has a cortex and a medulla, continuous with the adjacent lobule's medulla. The cortex is the outer zone and stains darker on histology because it is densely populated with lymphocytes — lymphoblasts in its outer part, thymocytes in its inner part — completely surrounded by epithelial reticular cells and macrophages; this is the same cortex the blood-thymic barrier protects. The medulla stains lighter, because lymphocytes are less abundant there and epithelial reticular cells more so, and it alone contains Hassall's corpuscles — small rounded structures whose number increases with age, formed of a central acidophilic (eosinophilic) mass of degenerating, keratinizing epithelial reticular cells surrounded by concentric layers of more epithelial reticular cells; they are not made of lymphocytes, which are merely interspersed around them, and they are not basophilic. The epithelial reticular cells themselves have three named functions: they secrete thymic hormones (thymosin, thymopoietin, thymic humoral factor, thymulin) that promote T-lymphocyte differentiation and proliferation; they form sheets deep to the capsule and around the septa and blood vessels, isolating cortical lymphocytes from blood-borne antigen; and they act as nursing cells for the developing lymphocytes. Four absences complete the thymus's picture: no lymphoid nodules, no B lymphocytes, no plasma cells, and no afferent lymphatic vessels — the last being the absence that protects developing thymocytes from circulating antigen (efferent lymphatics do exist, carrying mature cells onward).",
      objective: "Contrast the thymic cortex and medulla by staining intensity and lymphocyte density, place Hassall's corpuscles in the medulla and state their acidophilic, age-increasing, epithelial-cell composition, and list the epithelial reticular cell's three functions and the thymus's four defining absences.",
      pitfall: "Assuming Hassall's corpuscles are basophilic lymphocyte aggregates, or that their number falls with age. They are acidophilic (eosinophilic) whorls of degenerating epithelial reticular cells, sited only in the medulla, and they become more numerous as the thymus involutes with age, even as its overall lymphocyte content declines.",
      subject: "haem",
      primary: "DIS-HIS-T02",
      secondary: [],
      modulePath: "104 CPS > Histology > Lymphatic and Macrophage System > Thymus",
      type: "structural_description",
      aliases: ["Hassall's corpuscles", "Thymic cortex and medulla", "Thymus absences", "Epithelial reticular cell functions"],
    },
    // kasr-104-author-run45: sparse reuse, not a fresh mint — same
    // canonical_key already declared in lymphatic-lymph-node.ts
    // (CON-HEM pinned record; mintConceptId is module-salted, not file-
    // salted, so this file's own declaration resolves to the identical
    // concept id). Declared again here only because build-batches.ts
    // requires a question's conceptKey to resolve within its own leaf
    // file's concepts array; every other field below is inert for the
    // build and restated close to the original so a reader of this file
    // does not have to open the sibling file to know what is reused.
    {
      key: "lymphatic-organs.primary-vs-secondary-classification",
      label: "Thymus and bone marrow are the primary (central) lymphatic organs, where lymphocytes are produced — the thymus specifically producing CD4+ and CD8+ T-lymphocytes — while lymph nodes, spleen and tonsils are secondary (peripheral) organs, where mature lymphocytes mount immune responses",
      definition: "Restated here only to satisfy the seed type; the pinned record's own wording (declared in lymphatic-lymph-node.ts) governs. The primary organs are the thymus and bone marrow, the sites where lymphocytes are produced: the thymus's cortex and medulla complete T-lymphocyte production and maturation, including the CD4+ and CD8+ T-lymphocyte populations, before they seed the peripheral organs. The secondary organs are the lymph nodes, spleen and tonsils, where those already-produced lymphocytes encounter antigen and mount the immune response.",
      objective: "Classify thymus and bone marrow as primary (central) lymphatic organs and lymph node, spleen and tonsil as secondary (peripheral) ones.",
      pitfall: "Placing the spleen, lymph node or tonsil among the primary lymphatic organs, or attributing a primary-organ function (production of new lymphocytes) to a secondary organ.",
      subject: "haem",
      primary: "DIS-HIS-T02",
      secondary: [],
      modulePath: "104 CPS > Histology > Lymphatic and Macrophage System > Thymus",
      type: "classification",
      aliases: ["Primary lymphatic organs", "Secondary lymphatic organs", "Central vs peripheral lymphoid organs"],
    },
  ],

  questions: [
    {
      // kasr-104-author-run45: Thymus cluster. Matches this leaf's own
      // sourced concept directly — epithelial reticular cells nurse the
      // developing lymphocytes in both cortex and medulla.
      key: "concerning-thymus-gland-the-nursing-cells-are-3e67d3a8",
      conceptKey: "thymus.hassalls-corpuscles-cortex-medulla-contrast-and-reticular-cell-functions",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "Name the epithelial reticular cell, in both cortex and medulla, as the thymus's nursing cell for its developing lymphocytes.",
      explanations: {
        A: "T-lymphocytes are the developing cells being nursed, not the nursing cells themselves.",
        B: "Lymphoblasts in the outer cortex are, likewise, developing lymphocytes under the epithelial reticular cells' care, not the nursing cells doing the caring.",
        C: "Macrophages sit within the cortex, intercepting blood-borne antigen as part of the blood-thymic barrier, but nursing the developing lymphocytes is this leaf's own concept's named epithelial-reticular-cell function, not a macrophage one.",
        D: "Epithelial reticular cells, present in both cortex and medulla, act as nursing cells for the developing lymphocytes — one of the three functions this leaf's own concept credits them with, alongside secreting thymic hormones and sheathing the septa and blood vessels.",
      },
    },
    {
      // kasr-104-author-run45: Thymus cluster. Matches this leaf's own
      // sourced concept text almost verbatim: lymphoblasts in the outer
      // cortex, thymocytes (T-lineage cells) in the inner cortex.
      key: "outer-part-of-thymus-cortex-contain-while-inner-part-contain-e2cc156d",
      conceptKey: "thymus.hassalls-corpuscles-cortex-medulla-contrast-and-reticular-cell-functions",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "State that the thymic cortex holds lymphoblasts in its outer part and thymocytes (T-lineage cells) in its inner part.",
      explanations: {
        A: "This leaf's own concept states the cortex is densely populated with lymphocytes — lymphoblasts in its outer part, thymocytes in its inner part — exactly this progression from less to more mature T-lineage cells as they move inward toward the medulla.",
        B: "Reversed — this leaf's own concept places lymphoblasts outward and thymocytes inward, not the other way round.",
        C: "The thymus has no B-lymphocytes at all, in either cortex zone — its lymphocyte population is entirely T-lineage, so a B-lymphocyte-based pairing does not describe the cortex's own outer-to-inner progression.",
        D: "The thymus has no B-lymphocytes at all, so this pairing is doubly wrong — B-lymph does not belong in the inner cortex, and lymphoblast-to-B-lymph is not this leaf's own stated outer-to-inner progression.",
      },
    },
    {
      // kasr-104-author-run45: Thymus cluster. Blends this leaf's own
      // sourced concept (no plasma cells, no afferent lymphatics — only
      // efferent) with the sparse-reuse primary/secondary lymphatic-organ
      // classification concept already declared in lymphatic-lymph-node.ts
      // (thymus, a primary organ, completes T-lymphocyte production).
      key: "regarding-thymus-gland-it-is-i-16460019",
      conceptKey: "lymphatic-organs.primary-vs-secondary-classification",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "State that the thymus is the site of T-cell production, against antibody production (a secondary-organ function), a spleen function, and this leaf's own no-afferent-lymphatics fact.",
      explanations: {
        A: "Antibody production is a secondary (peripheral) lymphoid organ function, carried out by plasma cells — and this leaf's own concept states the thymus has no plasma cells at all.",
        B: "Red blood cell degradation and bilirubin recycling is a spleen function, not a function of the thymus, a primary lymphoid organ that produces and matures T-lymphocytes rather than processing blood cells.",
        C: "Reversed. This leaf's own concept states the thymus has no afferent lymphatic vessels at all — only efferent ones, carrying mature cells onward — the opposite of 'having both'.",
        D: "The thymus is a primary (central) lymphoid organ whose cortex and medulla complete T-lymphocyte production and maturation before these cells seed the secondary organs — exactly the classification concept's own stated thymic role.",
      },
    },
    {
      // kasr-104-author-run45: Thymus cluster. Directly established by
      // both this leaf's own concept and the sparse-reuse classification
      // concept: the thymus is where T-lymphocytes complete maturation
      // into immunocompetent cells.
      key: "where-do-t-lymphocytes-acquire-their-immunocompetence-7eafb30a",
      conceptKey: "thymus.dual-origin-and-epithelial-reticular-cells",
      difficulty: "Easy",
      questionType: "Recall",
      learningObjective: "Name the thymus as the site where T-lymphocytes complete their maturation into immunocompetent cells, against the thyroid, bone marrow and lymph node.",
      explanations: {
        A: "The thymus is where T-lymphocytes acquire their immunocompetence — its epithelial reticular cells secrete thymic hormones that promote T-lymphocyte differentiation and maturation before these cells seed the peripheral (secondary) lymphoid organs.",
        B: "The thyroid is an endocrine gland producing thyroid hormones; it plays no part in lymphocyte maturation.",
        C: "Bone marrow is the other primary lymphoid organ, and the source of T-lymphocyte precursors, but the classification concept's own thymus-specific role is what completes their maturation into immunocompetent T-cells — T-lymphocyte precursors still require the thymic environment to finish that process.",
        D: "The lymph node is a secondary (peripheral) lymphoid organ, where already-mature lymphocytes encounter antigen — not where T-lymphocytes acquire their immunocompetence in the first place.",
      },
    },
    {
      // kasr-104-author-run45: Thymus cluster. Directly established by the
      // sparse-reuse classification concept: thymus and bone marrow are
      // the primary (central) lymphatic organs.
      key: "which-of-the-following-is-considered-a-central-lymphatic-org-81ba1e71",
      conceptKey: "lymphatic-organs.primary-vs-secondary-classification",
      difficulty: "Easy",
      questionType: "Classification",
      learningObjective: "Name the thymus as a central (primary) lymphatic organ, against the peripheral (secondary) lymph node, spleen and tonsils.",
      explanations: {
        A: "The thymus is, with bone marrow, one of the two primary (central) lymphatic organs — the classification concept's own stated pairing.",
        B: "Lymph nodes are a secondary (peripheral) lymphatic organ, where already-produced lymphocytes mount immune responses, not a central one.",
        C: "The spleen is likewise a secondary (peripheral) lymphatic organ, filtering blood and mounting immune responses rather than producing lymphocytes.",
        D: "Tonsils are a secondary (peripheral) lymphatic organ too, protecting the digestive and respiratory systems' entry points rather than producing lymphocytes centrally.",
      },
    },
    {
      key: "origin-of-epithelial-reticular-cell-4455e8b2",
      conceptKey: "thymus.dual-origin-and-epithelial-reticular-cells",
      difficulty: "Moderate",
      questionType: "Definition",
      learningObjective: "State the endodermal origin of the thymus's epithelial reticular cells, against the mesodermal origin of its lymphocytes.",
      explanations: {
        A: "Mesodermal is the origin of the thymus's lymphocytes, not its epithelial reticular cells — the thymus a double origin, one for each component.",
        B: "Ectodermal is not either of the two origins for the thymus.",
        C: "The thymus has a double origin — mesodermal giving rise to lymphocytes, and endodermal giving rise to epithelial reticular cells. A common trap: assuming the thymus's reticular framework is built the same way as the lymph node's or spleen's, by mesenchymal reticular cells and reticular fibres.",
        D: "Not applicable — a correct answer is listed among the options.",
      },
    },
    {
      key: "all-characters-of-blood-thymic-barrier-except-99e2dd70",
      conceptKey: "thymus.dual-origin-and-epithelial-reticular-cells",
      difficulty: "Moderate",
      questionType: "Recall of a false statement",
      learningObjective: "State that the blood-thymic barrier protects thymocytes in the cortex, not the medulla, and identify that placement as the false statement among its other true characters.",
      explanations: {
        A: "True of the blood-thymic barrier, so not the exception. Its function is to let immature T lymphocytes multiply and differentiate in an environment free of foreign antigen before they migrate onward.",
        B: "True, so not the exception. Continuous capillary endothelium with a thick basement membrane is one of the barrier's four layers.",
        C: "True, so not the exception. The blood-thymic barrier protects the cortical thymocytes, which is exactly why it is a cortex, not a medulla, structure.",
        D: "The exception, and the answer. The blood-thymic barrier contains T-lymphocytes in the cortex, not the medulla — reversing this is the false statement among the five.",
        E: "True, so not the exception. A complete layer of epithelial reticular cells joined by tight junctions, forming a sheath, is the barrier's outermost of its four layers.",
      },
    },
    {
      key: "concerning-the-thymus-which-of-the-following-is-correct-1-84f21510",
      conceptKey: "thymus.hassalls-corpuscles-cortex-medulla-contrast-and-reticular-cell-functions",
      difficulty: "Moderate",
      questionType: "Recall",
      learningObjective: "State that the thymic cortex stains darker than the medulla, against three false statements about origin, barrier placement and cell content.",
      explanations: {
        A: "The thymus's epithelial reticular cells are endodermal, not mesodermal, and produce no reticular fibre at all — a lymph node's or spleen's mesenchymal reticular cells do that job, not the thymus's epithelial ones.",
        B: "The blood-thymic barrier is a cortical feature, protecting the developing thymocytes there; the medulla lacks this strict barrier.",
        C: "The thymus characteristically has no plasma cells and no afferent lymphatic vessels at all — both absences are part of what keeps developing thymocytes isolated from blood-borne and lymph-borne antigen.",
        D: "The cortex of each thymic lobule stains darker than the medulla, because it is densely packed with small, actively dividing lymphocytes, while the medulla is paler (fewer lymphocytes, more epithelial reticular cells) and holds the Hassall's corpuscles — one of the most basic ways to orient a thymus slide at low power.",
      },
    },
    {
      key: "concerning-the-thymus-which-of-the-following-is-correct-ada13e4e",
      conceptKey: "thymus.hassalls-corpuscles-cortex-medulla-contrast-and-reticular-cell-functions",
      difficulty: "Moderate",
      questionType: "Recall",
      learningObjective: "State that the thymic cortex stains darker than the medulla (duplicate stem of the same true/false set).",
      explanations: {
        A: "The thymus's epithelial reticular cells are endodermal, not mesodermal, and produce no reticular fibre.",
        B: "The blood-thymic barrier is a cortical feature, not a medullary one.",
        C: "The thymus has no plasma cells and no afferent lymphatic vessels.",
        D: "The cortex of each thymic lobule stains darker than the medulla, being densely populated with lymphocytes, while the paler medulla holds the Hassall's corpuscles — the same fact tested by this cluster's sibling stem.",
      },
    },
    {
      key: "function-of-epithelial-reticular-cell-29af7059",
      conceptKey: "thymus.hassalls-corpuscles-cortex-medulla-contrast-and-reticular-cell-functions",
      difficulty: "Easy",
      questionType: "Structure and function",
      learningObjective: "Name all three of the epithelial reticular cell's functions together — secreting thymic hormone, sheathing septa/vessels, and nursing lymphocytes.",
      explanations: {
        A: "True of the epithelial reticular cell, but only one of its three named functions, so not the complete answer the stem's 'all the above' option captures.",
        B: "True, but again only one of the three functions — forming a sheet around the septa and blood vessels that isolates cortical lymphocytes from blood-borne antigen.",
        C: "True, but the third function alone — acting as a nursing cell for the developing lymphocytes during their differentiation.",
        D: "The epithelial reticular cell does all three: it secretes thymic hormone promoting T-cell proliferation, forms a sheathing sheet around septa and blood vessels, and nurses the developing lymphocytes — three distinct, simultaneously true functions of the one cell type.",
      },
    },
    {
      key: "hassall-s-corpuscles-in-thymus-are-characterized-by-94e95c43",
      conceptKey: "thymus.hassalls-corpuscles-cortex-medulla-contrast-and-reticular-cell-functions",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "Place Hassall's corpuscles in the medulla, against three false statements about their staining, composition and age trend.",
      explanations: {
        A: "Hassall's corpuscles are acidophilic (eosinophilic), not basophilic — their central mass of degenerating, keratinizing epithelial reticular cells takes an acid stain, not a basic one.",
        B: "Hassall's corpuscles are found specifically in the thymic medulla, never the cortex — one of the pairing (dark cortex, pale medulla with Hassall's corpuscles) that is unique to the thymus among lymphoid organs.",
        C: "Hassall's corpuscles are formed of a central mass of degenerating, keratinizing epithelial reticular cells, not lymphocytes — lymphocytes are simply interspersed in the surrounding medullary tissue, not the corpuscle's own building material.",
        D: "Hassall's corpuscles increase, rather than decrease, in number as the thymus involutes with age — the opposite of this option's claim.",
      },
    },
    {
      key: "regarding-hassall-s-corpuscles-one-of-the-following-is-true-9c74adf8",
      conceptKey: "thymus.hassalls-corpuscles-cortex-medulla-contrast-and-reticular-cell-functions",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "State that Hassall's corpuscles increase in number with age, against three false statements about their surrounding cells, location and staining.",
      explanations: {
        A: "Hassall's corpuscles are surrounded by concentric layers of epithelial reticular cells, not lymphocytes — lymphocytes are simply nearby in the medullary tissue.",
        B: "Hassall's corpuscles are present in the medulla, not the cortex, of the thymus.",
        C: "Hassall's corpuscles' number increases with age, even as the thymus otherwise involutes and its overall lymphocyte content declines — the true statement among the four.",
        D: "Hassall's corpuscles are formed of a central ACIDOPHILIC, not basophilic, mass — a hyaline appearance from keratinizing epithelial cells, taking an acid rather than a basic stain.",
      },
    },
    {
      key: "the-thymus-is-characterized-by-4c441550",
      conceptKey: "thymus.hassalls-corpuscles-cortex-medulla-contrast-and-reticular-cell-functions",
      difficulty: "Moderate",
      questionType: "Recall of a true statement",
      learningObjective: "State that Hassall's corpuscles in the medulla is the true characteristic of the thymus, against three false statements about B lymphocytes, plasma cells and lymphatic nodules.",
      explanations: {
        A: "The thymus has no B lymphocytes at all, in either cortex or medulla — its lymphocyte population (thymocytes) is entirely T-lineage, developing under the epithelial reticular cells' supervision.",
        B: "Hassall's corpuscles, sited in the medulla, are a true and defining characteristic of the thymus — one of the two positive features (with post-pubertal involution) that complete its picture alongside its four defining absences.",
        C: "The thymus characteristically has no plasma cells at all, unlike the lymph node and spleen, which do.",
        D: "The thymus has no lymphatic (lymphoid) nodules anywhere, cortex included — a defining absence that distinguishes its cortex from a lymph node's follicle-bearing cortex.",
      },
    },
    {
      key: "epithelial-reticular-celts-thymic-epithelial-cells-are-tepro-b71350dd",
      conceptKey: "thymus.hassalls-corpuscles-cortex-medulla-contrast-and-reticular-cell-functions",
      difficulty: "Hard",
      questionType: "Structure and function",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Only 3 options survived extraction (A, B, D — option C is missing entirely), below the platform's 4-to-5-option import contract. Excluded as structurally unimportable rather than padded with an invented option, matching this bank's documented OCR/page-bleed pattern.",
    },
    {
      key: "thymic-epithelial-cells-epithelial-reticular-cells-are-e7482bae",
      conceptKey: "thymus.hassalls-corpuscles-cortex-medulla-contrast-and-reticular-cell-functions",
      difficulty: "Hard",
      questionType: "Structure and function",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Only 3 options survived extraction (A, B, C — option D is missing entirely), below the platform's 4-to-5-option import contract. Excluded as structurally unimportable rather than padded with an invented option.",
    },
    {
      key: "control-multiplication-of-helper-suppresser-t-cell-f9d598e8",
      conceptKey: "thymus.hassalls-corpuscles-cortex-medulla-contrast-and-reticular-cell-functions",
      difficulty: "Hard",
      questionType: "Structure and function",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Option extraction merged two choices into one field (options object is {A: \"thymopoietin b)thymic factor\", C: \"thymosin\", D: \"thymulin\"} — the true option B, 'thymic factor', has no distinct key of its own, its label instead concatenated onto option A's text by an OCR/page-bleed line-merge). Excluded as a corrupted option set rather than guessing where the true A/B split falls; a candidate for a future bank-level option-repair pass, not an authoring-layer fix.",
    },
    {
      key: "stimulate-production-of-cytotoxic-t-cell-b6085c29",
      conceptKey: "thymus.hassalls-corpuscles-cortex-medulla-contrast-and-reticular-cell-functions",
      difficulty: "Hard",
      questionType: "Structure and function",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Same corrupted option set as control-multiplication-of-helper-suppresser-t-cell-f9d598e8 (options {A: \"thymopoietin b)thymic factor\", C: \"thymosin\", D: \"thymulin\"}, option B's label merged into A's text by OCR/page-bleed) -- excluded for the same reason.",
    },
    {
      // Leaf-tag mismatch: bank-tagged "A-V Connections" but genuinely
      // blood-thymic-barrier content already tested by this concept's own
      // all-characters-of-blood-thymic-barrier-except question — this row
      // asks which structure achieves the barrier, not which statement about
      // it is false, so it is kept as a distinct, non-duplicate angle.
      key: "the-blood-thymic-barrier-is-achieved-by-the-following-b845a999",
      conceptKey: "thymus.dual-origin-and-epithelial-reticular-cells",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "Identify the perivascular space around cortical capillaries, containing macrophages, as one of the structures that achieves the blood-thymic barrier.",
      explanations: {
        A: "The blood-thymic barrier's cortical capillaries are continuous, not non-continuous (fenestrated), with endothelial cells joined by tight junctions — a discontinuous endothelium would defeat the barrier's isolating purpose.",
        B: "The basement membrane component of the blood-thymic barrier is continuous and relatively thick, not thin and discontinuous, again to reinforce rather than weaken the barrier.",
        C: "A perivascular connective-tissue space surrounding the cortical capillaries, containing macrophages that intercept and process blood-borne antigens, is one of the barrier's recognised structural components, alongside continuous endothelium, a continuous basement membrane and a sheath of epithelial reticular cells.",
        D: "Plasma cells (antibody-producing B-lymphocyte derivatives) are not a standard, recognised structural component of the blood-thymic barrier; macrophages, not plasma cells, occupy the perivascular space in this context.",
      },
    },
    {
      // Leaf-tag mismatch: bank-tagged "Spleen" but genuinely Hassall's-
      // corpuscle (thymus) content — this row asks the student to name the
      // structure from a bare description among unrelated sensory-corpuscle
      // and splenic distractors, a distinct angle from this concept's
      // existing "characterised by" and "one of the following is true"
      // questions, so kept as non-duplicate. Routed onto this file's own
      // already-existing concept rather than bringing in the OTHER pinned
      // Hassall's-corpuscle record (CON-HEM-10B2E783E164FD, in
      // 104-CPS-practical-concepts.md) into a different file — no new search
      // needed, and no new duplicate-overlap introduced.
      key: "small-round-shape-with-acidophilic-mass-surrounded-by-reticu-55b41e9f",
      conceptKey: "thymus.hassalls-corpuscles-cortex-medulla-contrast-and-reticular-cell-functions",
      difficulty: "Easy",
      questionType: "Identification from description",
      learningObjective: "Identify a Hassall's corpuscle from its description (small, round, acidophilic, surrounded by reticular-type cells), against unrelated cutaneous corpuscles and the spleen's white pulp.",
      explanations: {
        B: "Correct. A Hassall's corpuscle is a small, round, acidophilic structure found only in the medulla of the thymus, formed of a central acidophilic mass of degenerating, keratinizing epithelial reticular cells surrounded by concentric layers of more epithelial reticular cells.",
        A: "A Pacinian corpuscle is a pressure/vibration mechanoreceptor found in the dermis and deep tissues — concentric lamellae around a nerve ending, an entirely different structure with no acidophilic degenerating core.",
        C: "A Ruffini corpuscle is another cutaneous mechanoreceptor (detecting skin stretch), unrelated to the thymus or to any lymphoid organ.",
        D: "White pulp is the spleen's own lymphoid compartment, built around a central arteriole — a completely different organ and structure from the thymus's Hassall's corpuscle.",
      },
    },
  ],
}
