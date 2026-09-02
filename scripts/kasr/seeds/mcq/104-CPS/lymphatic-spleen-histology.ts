import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: "Lymphatic and Macrophage System — Spleen",
  modulePath: "104 CPS > Histology > Lymphatic and Macrophage System > Spleen",
  articleId: "ART-104-HIS-LYMPHOID-ORGANS",

  concepts: [
    // Sparse reuse, not a fresh mint: find-existing.mjs "splenic sinusoid" and
    // direct id lookup surfaced this article's own related_concepts list — a
    // hand-authored, pinned record (CON-HEM-2F3CB0082551D1) already sitting in
    // 104-CPS-practical-concepts.md, sourced from the department histology
    // book p.17 and the practical atlas p.8.
    {
      key: "spleen.capsule-trabeculae-white-pulp-and-red-pulp",
      label: "The spleen is a thick muscular capsule with thick trabeculae radiating from the hilum, and white pulp scattered irregularly in red pulp",
      definition: "The spleen is the large single intra-abdominal haemolymphatic organ, situated along the course of the blood stream so that it filters blood. Its stroma is a capsule of dense connective tissue rich in smooth muscle and elastic fibres, thick especially at the hilum where the vessels enter and covered by peritoneum; trabeculae of connective tissue rich in elastic fibres and smooth muscle, long and thick and radiating mainly from the hilum with a few short irregular ones from the capsule, carrying blood vessels and nerves and dividing the organ into irregular compartments; and a reticular network of reticular cells and fibres that stains with silver and is more condensed at the white pulp. Its parenchyma, in a cut section of fresh spleen, is white rounded scattered spots — the white pulp — on a red background, the red pulp. There are no lymph sinuses anywhere in it.",
      objective: "Identify the spleen on a stained section from its capsule, its trabeculae and the pattern of its parenchyma, and name the white pulp and the red pulp.",
      pitfall: "Going to the parenchyma before the capsule. Thick, muscular and elastic with thick trabeculae radiating from a hilum is a spleen; thin with delicate septa from the deep surface of the capsule is a lymph node. Only then is the parenchyma worth reading.",
      subject: "haem",
      primary: "DIS-HIS-T03",
      secondary: ["SYS-HEM"],
      modulePath: "104 CPS > Histology > Lymphatic and Macrophage System > Spleen",
      type: "structural_description",
      aliases: ["Histological structure of the spleen", "Splenic capsule and trabeculae", "White pulp and red pulp"],
    },
    // Sparse reuse: CON-HEM-594B1725902DAD, same source (department book p.18).
    {
      key: "spleen.red-pulp-billroth-cords-and-stave-cell-sinusoids",
      label: "Red pulp is Billroth cords and stave-cell sinusoids whose intercellular gaps let blood cells pass back into the circulation",
      definition: "Red pulp appears red in fresh sections because of the number of red cells, and it is formed of two components. The splenic cords, the cords of Billroth, lie between the white pulps and the blood sinusoids and are infiltrated with red cells, granulocytes, lymphocytes, monocytes, platelets, plasma cells and macrophages. The blood sinusoids are barrel-shaped, irregular, wide blood channels lined with a fenestrated elongated endothelium of stave cells with large intercellular spaces and a non-continuous basal lamina, an arrangement that facilitates the passage of blood from the splenic cords into the blood stream; macrophages, the littoral cells, are present in and around their walls.",
      objective: "Name the two components of splenic red pulp, describe the stave-cell lining of a blood sinusoid, and say what its wide intercellular spaces and interrupted basal lamina allow.",
      pitfall: "Dismissing the discontinuity of the lining as a shrinkage artefact of fixation. The gaps are a real feature and they are the structural basis of splenic filtration: every circulating cell is squeezed past a macrophage on its way back into the blood.",
      subject: "haem",
      primary: "DIS-HIS-T03",
      secondary: ["SYS-HEM"],
      modulePath: "104 CPS > Histology > Lymphatic and Macrophage System > Spleen",
      type: "structural_description",
      aliases: ["Splenic red pulp", "Cords of Billroth", "Splenic blood sinusoids", "Stave cells", "Littoral cells"],
    },
    // Sparse reuse: CON-HEM-7B050DE7FE2B80, from 104-CPS-concepts.md (the
    // written-paper pipeline's own generated file, NOT GENERATED_BY this MCQ
    // pipeline, so existingConceptIds() for module 104 CPS does see it).
    {
      key: "splenic-white-pulp.zones-and-cellular-composition",
      label: "Splenic white pulp is four zones arranged concentrically around the central arteriole",
      definition: "Each Malpighian corpuscle of the white pulp is reticular connective tissue whose cells are arranged concentrically around an eccentrically placed central arteriole, in four zones from inside outwards. The thymus-dependent zone, the periarteriolar lymphatic sheath, holds T lymphocytes ensheathing the arteriole. The germinal centre is a pale central area of B lymphocytes, large activated lymphocytes, plasma cells and macrophages. The follicular zone is the darkly stained ring around the germinal centre, mainly B lymphocytes. The marginal zone forms the periphery and contains T and B lymphocytes, plasma cells and macrophages.",
      objective: "Name the four zones of splenic white pulp in order from the central arteriole outwards and give the cells of each.",
      pitfall: "Taking the central arteriole to be central. It is eccentric in the corpuscle; the name describes the sheath wrapped around it, not its position.",
      subject: "haem",
      primary: "DIS-HIS-T03",
      secondary: ["SYS-HEM"],
      modulePath: "104 CPS > Histology > Lymphatic and Macrophage System > Spleen",
      type: "definition",
      aliases: ["Malpighian corpuscle", "Periarteriolar lymphatic sheath", "PALS", "Germinal centre", "Follicular zone", "Marginal zone"],
    },
    // Sparse reuse: CON-HEM-4D47090A0B7561, from 104-CPS-practical-concepts.md.
    {
      key: "spleen.open-closed-and-open-and-closed-circulation-theories",
      label: "Open, closed and open-and-closed theories describe how blood crosses from the terminal capillaries into the splenic sinusoids",
      definition: "Blood enters at the hilum as the splenic artery, runs in the connective-tissue trabeculae as trabecular arteries, leaves them as the follicular or central arterioles that enter and supply the white pulps, branches at the boundary of the white pulp into penicillar arterioles, and ends in terminal arterial capillaries. How those capillaries reach the blood sinusoids of the red pulp is described three ways. The open theory: the capillaries deliver blood directly into the tissue of the red pulp, and it is collected by passing through openings in the wall of the blood sinusoids. The closed theory: the capillaries open directly into the blood sinusoids. The open and closed theory: the circulation is closed when the spleen contracts and open when it relaxes. Blood is then collected by the venous sinuses into red pulp veins, then trabecular veins, and leaves at the hilum as the splenic vein.",
      objective: "Trace blood from the splenic artery to the splenic vein, state the open and the closed theory, and say how the open-and-closed account reconciles them.",
      pitfall: "Attaching one theory to each compartment — open for the white pulp, closed for the red. Both describe the same red-pulp circulation; they differ only over whether the blood leaves the vascular channel at all before entering the sinusoid.",
      subject: "haem",
      primary: "DIS-HIS-T03",
      secondary: ["SYS-HEM"],
      modulePath: "104 CPS > Histology > Lymphatic and Macrophage System > Spleen",
      type: "mechanism",
      aliases: ["Theories of splenic circulation", "Open and closed theory", "Blood circulation in the spleen"],
    },
    // Fresh mint after a real search: find-existing.mjs "functions of the
    // spleen" and "destruction of old red cells spleen" both returned "safe to
    // create" — no pending or live record states the spleen's function list as
    // its own concept (the circulation-theories concept above covers the
    // vascular pathway, not the function list). Fully grounded in this same
    // article's own Mechanism section — no coverage gap.
    {
      key: "spleen.functions-filtration-storage-and-destruction-of-old-rbcs",
      label: "The spleen filters and stores blood, forms blood elements in fetal life, and destroys old red cells; it does not filter lymph — that is the lymph node's own job",
      definition: "The spleen's functions are filtration of blood by macrophages, storage of blood cells and platelets (releasable into the circulation when the organ contracts, as in an emergency such as bleeding), formation of blood elements in fetal life and of lymphocytes throughout life, immunological function through T and B lymphocytes with the reticular cells trapping and presenting antigen, and destruction of old red cells — the haem iron is stored in macrophages, the non-iron part becomes bile pigments, and the globin is broken down to amino acids returned to the blood. The spleen has no afferent lymphatic vessels at all and filters blood, not lymph; filtering lymph of micro-organisms and foreign bodies is the lymph node's own function instead.",
      objective: "List the spleen's functions — blood filtration, storage, fetal/lifelong haematopoiesis, immunological function and destruction of old red cells — and state that it does not filter lymph.",
      pitfall: "Assuming any lymphoid organ filters lymph. Only the lymph node does; the spleen has no afferent lymphatics to bring lymph to it in the first place, and filters blood instead.",
      subject: "haem",
      primary: "DIS-HIS-T03",
      secondary: ["SYS-HEM"],
      modulePath: "104 CPS > Histology > Lymphatic and Macrophage System > Spleen",
      type: "mechanism",
      aliases: ["Functions of the spleen", "Spleen as a blood reservoir", "Destruction of old red blood cells"],
    },
    // Fresh mint after a real search: find-existing.mjs "sheathed arteriole"
    // and "penicillar arteriole" both returned "safe to create". The pinned
    // circulation-theories concept above states the central arteriole
    // "branches at the boundary of the white pulp into penicillar arterioles,
    // and ends in terminal arterial capillaries", but does not itself name the
    // penicillar arteriole's own three internal segments this leaf's own bank
    // row tests — standard, undisputed histology (the sheathed/ellipsoid
    // segment's periarterial macrophage sheath), flagged below as a gap for
    // the article-authoring lane rather than silently assumed.
    {
      key: "penicillar-arteriole.three-segments-pulp-sheathed-and-terminal",
      label: "The penicillar arteriole runs pulp arteriole, then sheathed (ellipsoid) arteriole, then terminal arterial capillary, before opening into the red pulp",
      definition: "The penicillar arteriole is the continuation of the central (follicular) arteriole beyond the boundary of the white pulp, and it runs in three successive segments before ending in the red pulp: first the pulp arteriole, a short unsheathed segment; then the sheathed (ellipsoid) arteriole, surrounded by a periarterial macrophage sheath; and finally the terminal arterial capillary, which opens into the red pulp's blood sinusoids (the closed theory) or its cords (the open theory).",
      objective: "State the penicillar arteriole's three named segments in order — pulp arteriole, sheathed (ellipsoid) arteriole, terminal arterial capillary — from the white pulp boundary to the red pulp.",
      pitfall: "Placing the terminal arterial capillary first or in the middle of the sequence. It is the LAST of the three segments, the point where the penicillar arteriole's own named course ends and the open/closed-theory question of how it reaches the sinusoid begins.",
      subject: "haem",
      primary: "DIS-HIS-T03",
      secondary: ["SYS-HEM"],
      modulePath: "104 CPS > Histology > Lymphatic and Macrophage System > Spleen",
      type: "structural_description",
      aliases: ["Pulp arteriole", "Sheathed arteriole", "Ellipsoid", "Schweigger-Seidel sheath"],
      gaps: [
        "ART-104-HIS-LYMPHOID-ORGANS states the central arteriole 'branches into penicillar arterioles, ending in terminal arterial capillaries that open into the blood sinusoids of the red pulp', but does not itself name the intermediate pulp-arteriole and sheathed-arteriole segments this leaf's own bank tests — standard, undisputed histology, flagged for the article-authoring lane.",
      ],
    },
  ],

  questions: [
    {
      key: "choose-the-correct-statement-about-splenic-trabeculae-378c14c1",
      conceptKey: "spleen.capsule-trabeculae-white-pulp-and-red-pulp",
      difficulty: "Moderate",
      questionType: "Recall of the correct statement",
      learningObjective: "State that splenic trabeculae are connective tissue rich in elastic fibres and smooth muscle, radiating mainly from the hilum, and dividing the spleen into irregular compartments.",
      explanations: {
        A: "Correct. Splenic trabeculae are connective-tissue septa — cells and fibres, specifically rich in elastic fibres and smooth muscle — carrying the blood vessels and nerves that run from the capsule into the pulp.",
        B: "The opposite is true: splenic trabeculae are RICH in elastic fibres and smooth muscle, not lacking them — a feature (with the capsule's own smooth muscle and elastic content) that lets the contracted spleen expel stored blood into the circulation.",
        C: "The opposite is true on the part that matters: splenic trabeculae are LONG and THICK, not short and thin, even though most of them do radiate mainly from the hilum (with only a few short, irregular ones arising from the capsule).",
        D: "The opposite is true: splenic trabeculae divide the organ into IRREGULAR compartments, not regular ones — unlike a lymph node's own septa, which divide its cortex into regular compartments.",
      },
    },
    {
      key: "capsule-of-spleen-is-covered-by-376e37af",
      conceptKey: "spleen.capsule-trabeculae-white-pulp-and-red-pulp",
      difficulty: "Easy",
      questionType: "Recall",
      learningObjective: "State that the splenic capsule is covered by peritoneum, since the spleen is an intraperitoneal organ.",
      explanations: {
        B: "Correct. The spleen is an intraperitoneal organ, and its thick, smooth-muscle- and elastic-fibre-rich capsule is covered externally by peritoneum — unlike a lymph node's capsule, which is covered by fascia instead.",
        A: "Adipose tissue is not what covers the splenic capsule; neither lymphoid organ's capsule is defined by an overlying fat layer.",
        C: "Reticular fibres are an internal stromal component of the spleen's own parenchyma (its reticular network, more condensed at the white pulp), not the tissue covering the outer surface of the capsule.",
        D: "A pericyte is a single contractile cell type associated with small vessel walls, not a tissue layer, and plays no role in covering the splenic capsule.",
      },
    },
    {
      key: "regarding-the-red-pulp-of-the-spleen-c93e25bf",
      conceptKey: "spleen.red-pulp-billroth-cords-and-stave-cell-sinusoids",
      difficulty: "Easy",
      questionType: "Recall",
      learningObjective: "State that the red pulp contains blood sinusoids, distinguishing it from the white pulp's central arteriole and four-zone architecture.",
      explanations: {
        B: "Correct. The red pulp is formed of two components: the splenic (Billroth) cords and the blood sinusoids — barrel-shaped, fenestrated, stave-cell-lined channels through which filtered blood re-enters the circulation.",
        A: "A central (follicular) arteriole is the defining landmark of the WHITE pulp's Malpighian corpuscle, not a feature of the red pulp.",
        C: "The spleen is a haemolymphatic organ with no secretory or mucous glands anywhere in it — mucus glands are not a splenic structure at all.",
        D: "It is the WHITE pulp's Malpighian corpuscle, not the red pulp, that is organised into four concentric zones around a central arteriole.",
      },
    },
    {
      key: "which-of-the-following-statements-is-correct-about-splenic-s-f933552b",
      conceptKey: "spleen.red-pulp-billroth-cords-and-stave-cell-sinusoids",
      difficulty: "Moderate",
      questionType: "Recall of the correct statement",
      learningObjective: "State that splenic sinusoids are lined by elongated (stave) endothelial cells with large intercellular spaces, and distinguish stave cells (lining) from littoral cells (phagocytic).",
      explanations: {
        B: "Correct. Splenic blood sinusoids are barrel-shaped, irregular, wide channels lined by elongated ('stave') endothelial cells with large intercellular spaces and a non-continuous basal lamina, letting filtered blood cells pass back into the circulation.",
        A: "Kupffer cells are the resident macrophages of the LIVER's own sinusoids; the spleen's sinusoidal macrophages, sitting in and around the sinusoid walls, are called littoral cells instead.",
        C: "This reverses the two cell types: stave cells are the elongated ENDOTHELIAL lining cells of the sinusoid wall itself, not phagocytes; littoral cells are the phagocytic macrophages in and around that wall.",
        D: "The opposite is true: the sinusoid's basal lamina is deliberately NON-continuous, with large gaps between the stave cells — the structural basis that lets blood cross from the splenic cords back into the bloodstream.",
      },
    },
    {
      key: "choose-the-correct-statement-about-billroth-cords-a-they-are-5d292dfe",
      conceptKey: "spleen.red-pulp-billroth-cords-and-stave-cell-sinusoids",
      difficulty: "Moderate",
      questionType: "Recall of the correct statement",
      learningObjective: "State that Billroth cords are infiltrated with blood and lymphoid cells, and are found only in the spleen's red pulp.",
      explanations: {
        B: "Correct. Billroth (splenic) cords lie between the white pulps and the blood sinusoids and are richly infiltrated with red cells, granulocytes, lymphocytes, monocytes, platelets, plasma cells and macrophages, reflecting their role in filtering circulating blood.",
        A: "Billroth cords are found exclusively in the spleen's own red pulp, not in the stroma of a lymph node — a different organ with an entirely different architecture (lymph sinuses, not blood-filtering cords).",
        C: "This does not describe Billroth cords; no standard description places them 'between secondary lymphatic follicles' — that phrase does not correspond to any real splenic or nodal landmark.",
        D: "A central arteriole placed to one side is the defining landmark of the WHITE pulp's Malpighian corpuscle, not a feature of the red pulp's Billroth cords.",
        E: "This is an unrelated fragment bled in from other questions elsewhere in the source document (plasma cells and afferent lymphatic vessels; a separate statement about thymic cortex staining) — not a genuine option about Billroth cords.",
      },
    },
    {
      key: "red-pulp-of-the-spleen-shows-91bf4d2f",
      conceptKey: "spleen.red-pulp-billroth-cords-and-stave-cell-sinusoids",
      difficulty: "Easy",
      questionType: "Recall",
      learningObjective: "State that the red pulp shows Billroth cords, distinguishing them from white-pulp and lymph-node structures used as distractors.",
      explanations: {
        A: "Correct. The red pulp is composed of Billroth (splenic) cords together with blood sinusoids — the cords infiltrated with red cells, granulocytes, lymphocytes and macrophages, forming the architecture that screens aged or damaged red cells from circulation.",
        B: "Malpighian corpuscle is the alternative name for the spleen's WHITE pulp — the lymphoid nodule built around a central arteriole — not a red pulp feature.",
        C: "Medullary cords are a LYMPH NODE structure (irregular cords of B lymphocytes, plasma cells and macrophages in the node's medulla), unrelated to the spleen's red pulp.",
        D: "The central (follicular) arteriole is the defining landmark of the white pulp's Malpighian corpuscle, not of the red pulp.",
      },
    },
    {
      key: "contain-b-t-lymphocyte-e1384664",
      conceptKey: "splenic-white-pulp.zones-and-cellular-composition",
      difficulty: "Moderate",
      questionType: "Recall",
      learningObjective: "Identify the marginal zone as the one white-pulp zone containing a mixed population of both T and B lymphocytes.",
      explanations: {
        D: "Correct. The marginal zone, forming the periphery of the white pulp's Malpighian corpuscle, contains a mixed population of T and B lymphocytes together with plasma cells and macrophages — unlike the other three zones, each dominated by one lymphocyte lineage.",
        A: "The follicular zone, the darkly stained ring around the germinal centre, is mainly B lymphocytes, not a mixed T-and-B population.",
        B: "The germinal centre is a pale central area of B lymphocytes, large activated lymphocytes, plasma cells and macrophages — B-lineage-dominated, not mixed.",
        C: "The periarteriolar lymphatic sheath (PALS), the thymus-dependent zone immediately ensheathing the central arteriole, holds T lymphocytes specifically, not a mixed T-and-B population.",
      },
    },
    {
      key: "in-the-spleen-white-pulp-7d4646cc",
      conceptKey: "splenic-white-pulp.zones-and-cellular-composition",
      difficulty: "Easy",
      questionType: "Recall of the correct statement",
      learningObjective: "State that white pulp is a lymphatic nodule (Malpighian corpuscle) built around a central arteriole, in four zones, not two.",
      explanations: {
        C: "Correct. The white pulp is a Malpighian corpuscle — a rounded lymphatic nodule of reticular connective tissue whose cells are arranged concentrically around an eccentrically placed central (follicular) arteriole.",
        A: "Cords and sinusoids (Billroth cords and blood sinusoids) are the defining architecture of the RED pulp, not the white pulp.",
        B: "An abundance of red blood cells characterises the blood-filtering red pulp, not the lymphoid-tissue-dominated white pulp.",
        D: "White pulp is organised into FOUR zones from inside outwards — the periarteriolar lymphatic sheath, germinal centre, follicular zone and marginal zone — not only two.",
      },
    },
    {
      key: "the-thymus-dependent-zone-of-the-spleen-is-188-of-e073d50f",
      conceptKey: "splenic-white-pulp.zones-and-cellular-composition",
      difficulty: "Moderate",
      questionType: "Recall",
      learningObjective: "Identify the periarteriolar lymphatic sheath (PALS) as the spleen's own thymus-dependent zone.",
      explanations: {
        C: "Correct. The periarteriolar lymphatic sheath (PALS) — the innermost of the white pulp's four zones, ensheathing the central arteriole — is the spleen's thymus-dependent (T-lymphocyte) zone.",
        A: "The follicular zone, the darkly stained ring around the germinal centre, is mainly B lymphocytes, not the thymus-dependent zone.",
        B: "The marginal zone at the white pulp's periphery holds a mixed T-and-B population together with plasma cells and macrophages, not a T-cell-specific thymus-dependent zone.",
        D: "The germinal centre is a B-lymphocyte proliferation zone (large activated lymphocytes and plasma cells), the opposite lineage from the thymus-dependent zone.",
      },
    },
    {
      key: "thymus-dependent-zone-in-the-lymph-node-spleen-are-respectiv-63a1deb5",
      conceptKey: "splenic-white-pulp.zones-and-cellular-composition",
      difficulty: "Moderate",
      questionType: "Recall of a paired fact",
      learningObjective: "Pair the lymph node's paracortex with the spleen's periarteriolar lymphatic sheath as the two organs' respective thymus-dependent zones.",
      explanations: {
        D: "Correct. The thymus-dependent (T-lymphocyte) zone is the paracortex in a lymph node — between the cortical follicles and the medulla, reached by T cells through post-capillary venules — and the periarteriolar lymphatic sheath (PALS) in the spleen, the T-cell cuff ensheathing each white pulp's central arteriole.",
        A: "Cortical follicles are the lymph node's own B-cell zone, not its thymus-dependent zone, and red pulp is the spleen's blood-filtering compartment — neither half of this pairing is a thymus-dependent zone.",
        B: "The lymph node half is correct (paracortex), but red pulp is not the spleen's thymus-dependent zone; that is the periarteriolar lymphatic sheath within the white pulp.",
        C: "Medullary cords (lymph node) are rich in plasma cells, not specifically T lymphocytes, and splenic sinusoids are part of the blood-filtering red pulp — neither is a thymus-dependent zone.",
      },
    },
    {
      key: "thymus-dependent-zone-of-the-spleen-is-present-at-c0bc272b",
      conceptKey: "splenic-white-pulp.zones-and-cellular-composition",
      difficulty: "Moderate",
      questionType: "Recall",
      learningObjective: "Locate the spleen's thymus-dependent zone around the central arteriole of the white pulp.",
      explanations: {
        A: "Correct. The periarteriolar lymphatic sheath — the spleen's thymus-dependent zone — is the innermost of the white pulp's four zones, the cuff of T lymphocytes immediately ensheathing the central arteriole.",
        B: "The germinal centre is a B-lymphocyte proliferation zone (large activated lymphocytes and plasma cells), not the T-cell thymus-dependent zone.",
        C: "The follicular zone, the darkly stained ring around the germinal centre, is mainly B lymphocytes, not thymus-dependent tissue.",
        D: "The marginal zone at the white pulp's periphery holds a mixed T-and-B population, not a T-cell-specific thymus-dependent zone.",
      },
    },
    {
      key: "thymus-dependent-zone-of-the-spleen-is-present-at-i-8fce8aab",
      conceptKey: "splenic-white-pulp.zones-and-cellular-composition",
      difficulty: "Moderate",
      questionType: "Recall",
      learningObjective: "Locate the spleen's thymus-dependent zone around the central arteriole of the white pulp (duplicate occurrence from a different source book).",
      explanations: {
        A: "Correct. The periarteriolar lymphatic sheath, ensheathing the central arteriole, is the spleen's thymus-dependent zone — the same fact this cluster's sibling stem tests from a different question book.",
        B: "The germinal centre of white pulp is a B-lymphocyte proliferation zone, not the thymus-dependent T-cell zone.",
        C: "The follicular zone of white pulp is mainly B lymphocytes, not thymus-dependent tissue.",
        D: "The marginal zone of white pulp holds a mixed T-and-B population, not a T-cell-specific thymus-dependent zone.",
      },
    },
    {
      key: "thymus-dependent-zone-of-the-spleen-refers-to-d46d9b0a",
      conceptKey: "splenic-white-pulp.zones-and-cellular-composition",
      difficulty: "Moderate",
      questionType: "Recall",
      learningObjective: "Identify the periarteriolar lymphatic sheath (PALS) as the spleen's own thymus-dependent zone.",
      explanations: {
        C: "Correct. The periarteriolar lymphatic sheath (PALS), ensheathing the central arteriole, is the spleen's thymus-dependent zone.",
        A: "The marginal zone holds a mixed T-and-B population, not a T-cell-specific thymus-dependent zone.",
        B: "The follicular zone is mainly B lymphocytes, not thymus-dependent tissue.",
        D: "The germinal centre is a B-lymphocyte proliferation zone, the opposite lineage from the thymus-dependent zone.",
      },
    },
    {
      key: "thymus-dependent-zones-in-lymph-node-spleen-are-respectively-3b5cbb99",
      conceptKey: "splenic-white-pulp.zones-and-cellular-composition",
      difficulty: "Moderate",
      questionType: "Recall of a paired fact",
      learningObjective: "Pair the lymph node's paracortex with the spleen's periarteriolar lymphatic sheath (duplicate occurrence from a different source book).",
      explanations: {
        D: "Correct. The lymph node's thymus-dependent zone is the paracortex; the spleen's is the periarteriolar lymphatic sheath (PALS) ensheathing the central arteriole — the same pairing this cluster's sibling stem tests.",
        A: "Cortical follicles (lymph node) are B-cell territory, not thymus-dependent, and red pulp (spleen) is the blood-filtering compartment, not the thymus-dependent zone.",
        B: "Paracortex is correctly the lymph node's thymus-dependent zone, but red pulp is not the spleen's — that is the periarteriolar lymphatic sheath.",
        C: "Medullary cords and splenic sinusoids are, respectively, a plasma-cell-rich zone and part of the blood-filtering red pulp — neither is a thymus-dependent zone.",
      },
    },
    {
      key: "choose-the-correct-statement-concerning-the-malpighian-corpu-93145cc9",
      conceptKey: "splenic-white-pulp.zones-and-cellular-composition",
      difficulty: "Moderate",
      questionType: "Recall of the correct statement",
      learningObjective: "State that the Malpighian corpuscle's follicular zone is mainly B lymphocytes, and that its central arteriole is eccentric, not central.",
      explanations: {
        D: "Correct. The Malpighian corpuscle's follicular zone — the darkly stained ring surrounding the germinal centre — is composed mainly of B lymphocytes.",
        A: "'Basal and prickle cell layers' describes stratified squamous epithelium (as in skin), an entirely unrelated tissue — the Malpighian corpuscle is lymphoid tissue, not epithelium, and has no such layers.",
        B: "The opposite is true: the corpuscle's central (follicular) arteriole is ECCENTRIC, placed to one side, not central — the name describes the T-cell sheath wrapped around it, not the vessel's own position.",
        C: "Frequent mitotic figures are a feature specifically of the germinal centre, where activated B lymphocytes proliferate — not a feature of the Malpighian corpuscle as a whole, most of which (the PALS, follicular and marginal zones) is not an actively dividing compartment.",
      },
    },
    {
      key: "capillary-open-directly-into-splenic-sinusoid-08cba79a",
      conceptKey: "spleen.open-closed-and-open-and-closed-circulation-theories",
      difficulty: "Moderate",
      questionType: "Recall",
      learningObjective: "Identify the closed theory as the account stating that terminal capillaries open directly into splenic sinusoids.",
      explanations: {
        C: "Correct. The closed theory of splenic circulation states that the terminal arterial capillaries open directly into the blood sinusoids — a continuous, endothelium-lined channel throughout.",
        A: "The open theory instead states that the capillaries deliver blood into the tissue (cords) of the red pulp first, which then enters the sinusoids through openings in their walls — the reverse of a direct capillary-to-sinusoid connection.",
        B: "The open-and-closed theory reconciles the other two by proposing the circulation switches state with splenic tone (closed when the spleen contracts, open when it relaxes); it does not itself assert a single, fixed, direct capillary-to-sinusoid connection.",
        D: "The closed theory is a real, named account that matches the stem exactly, so 'none of the above' is incorrect.",
      },
    },
    {
      key: "trabecular-artery-in-spleen-circulation-divide-into-18dea92f",
      conceptKey: "spleen.open-closed-and-open-and-closed-circulation-theories",
      difficulty: "Moderate",
      questionType: "Recall of a sequence",
      learningObjective: "State that the trabecular artery's own branch, on entering the white pulp, is the follicular (central) arteriole.",
      explanations: {
        D: "Correct. The trabecular artery, running within the connective-tissue trabeculae, gives off the follicular (central) arterioles that enter and supply the white pulp.",
        A: "The penicillar arteriole is a later branch in the sequence — arising from the central/follicular arteriole at the boundary of the white pulp, not directly from the trabecular artery.",
        B: "'Red pulp vein' names a venous structure; the trabecular artery is arterial, and its own branches continue the arterial side of splenic circulation.",
        C: "The venous sinus (blood sinusoid) is where terminal arterial capillaries end, several branch-points downstream of the trabecular artery, not its immediate branch.",
      },
    },
    {
      key: "white-pulp-arteriole-give-branch-to-6082c7fa",
      conceptKey: "spleen.open-closed-and-open-and-closed-circulation-theories",
      difficulty: "Moderate",
      questionType: "Recall of a sequence",
      learningObjective: "State that the central (white pulp) arteriole branches into the penicillar arteriole at the boundary of the white pulp.",
      explanations: {
        A: "Correct. At the boundary of the white pulp, the central (follicular) arteriole branches into penicillar arterioles, which continue as terminal arterial capillaries.",
        B: "'Red pulp vein' is a venous structure that collects blood after it has already crossed the sinusoids — several steps downstream of the white pulp arteriole's own branching.",
        C: "The venous sinus (blood sinusoid) is the destination of the terminal arterial capillaries at the end of this pathway, not the white pulp arteriole's immediate branch.",
        D: "'Follicular arteriole' is another name for the white pulp (central) arteriole itself — the vessel doing the branching here, not what it branches into.",
      },
    },
    {
      key: "which-of-the-following-is-not-a-function-of-the-spleen-3c1753c5",
      conceptKey: "spleen.functions-filtration-storage-and-destruction-of-old-rbcs",
      difficulty: "Easy",
      questionType: "Recall of a false statement",
      learningObjective: "State that the spleen filters and stores BLOOD, not lymph — filtering lymph is the lymph node's own job.",
      explanations: {
        D: "Correct — this is the exception, and the answer. Filtering LYMPH is the lymph node's job; the spleen instead filters and stores BLOOD, and has no afferent lymphatics of its own at all.",
        A: "This is a genuine splenic function, so not the answer sought: the spleen destroys aged or damaged red blood cells, storing the released iron in macrophages, converting the non-iron haem to bile pigments, and returning the globin's amino acids to the blood.",
        B: "This is a genuine splenic function, so not the answer sought: the spleen acts as a reservoir, storing blood cells and platelets that can be released into the circulation when the organ contracts, as in an emergency such as bleeding.",
        C: "This is a genuine splenic function, so not the answer sought: the spleen forms blood elements in fetal life (haematopoiesis) and continues to form lymphocytes throughout life.",
      },
    },
    {
      key: "penicillar-arteriole-is-3-parts-0c160eb5",
      conceptKey: "penicillar-arteriole.three-segments-pulp-sheathed-and-terminal",
      difficulty: "Hard",
      questionType: "Recall of a sequence",
      learningObjective: "State the penicillar arteriole's three segments in order: pulp arteriole, sheathed (ellipsoid) arteriole, terminal arterial capillary.",
      explanations: {
        D: "Correct. The penicillar arteriole runs, in order, from the pulp arteriole (its first, unsheathed segment) through the sheathed (ellipsoid) arteriole — surrounded by a periarterial macrophage sheath — to the terminal arterial capillary, which then opens into the red pulp.",
        A: "This reverses the true order: the terminal arteriole (capillary) is the LAST segment, not the first — the sequence begins with the pulp arteriole and ends with the terminal arterial capillary opening into the red pulp.",
        B: "This places the sheathed arteriole first and the pulp arteriole last, the reverse of the true sequence: the unsheathed pulp arteriole comes first, and the sheathed arteriole is the middle, not the final, segment.",
        C: "This places the terminal segment in the middle: the terminal arterial capillary is the LAST of the three segments, ending in the red pulp, not an intermediate one between the pulp and sheathed arterioles.",
      },
    },

    // --- Excluded, bookkept rather than silently dropped ---
    {
      key: "regarding-the-white-pulp-of-the-spleen-a-contains-a-central-e5269929",
      conceptKey: "splenic-white-pulp.zones-and-cellular-composition",
      difficulty: "Moderate",
      questionType: "Recall of the correct statement",
      learningObjective: "N/A — excluded.",
      explanations: {},
      exclude: true,
      excludeReason: "The stem itself is corrupted — bled together with the opening of a second, unrelated question ('3- The paracortex of the lymph node is characterized by:'), and option D carries the same trailing fragment. No seed-level field can repair a corrupted stem (only the answer letter can be overridden). The same core fact (central arteriole = white pulp landmark) survives cleanly on this leaf's other, uncorrupted questions.",
    },
    {
      key: "billroth-cords-are-part-of-bca8155d",
      conceptKey: "spleen.red-pulp-billroth-cords-and-stave-cell-sinusoids",
      difficulty: "Easy",
      questionType: "Recall",
      learningObjective: "N/A — excluded.",
      explanations: {},
      exclude: true,
      excludeReason: "The bank extraction recovered only 3 options (A-C); the 4-to-5 option contract is not met, and no seed-level field exists to add a missing option. The same fact (Billroth cords = red pulp) survives cleanly on the sibling 'choose the correct statement about Billroth cords' question in this file.",
    },
    {
      key: "b-outline-the-zones-of-white-pulp-and-state-the-cellular-com-38817513",
      conceptKey: "splenic-white-pulp.zones-and-cellular-composition",
      difficulty: "Moderate",
      questionType: "Written prompt, not a single-best-answer item",
      learningObjective: "N/A — excluded.",
      explanations: {},
      exclude: true,
      excludeReason: "Already flagged editorialExcluded in the bank: this is a written-exam prompt asking the student to outline the four zones of white pulp from the inside out, and the four 'options' are fragments of the model-answer text for each zone rather than distractor choices to a single-best-answer question.",
    },
    {
      key: "the-thymus-dependent-zone-of-the-spleen-is-the-06-of-eb84e27a",
      conceptKey: "splenic-white-pulp.zones-and-cellular-composition",
      difficulty: "Moderate",
      questionType: "Recall",
      learningObjective: "N/A — excluded.",
      explanations: {},
      exclude: true,
      excludeReason: "Already flagged editorialExcluded in the bank: the correct answer (the periarteriolar lymphatic sheath) is missing from the surviving two options (follicular zone, marginal zone), both of which are wrong.",
    },
    {
      key: "thymus-dependent-zones-in-the-lymph-node-spleen-are-respecti-0c5ecaaa",
      conceptKey: "splenic-white-pulp.zones-and-cellular-composition",
      difficulty: "Moderate",
      questionType: "Recall of a paired fact",
      learningObjective: "N/A — excluded.",
      explanations: {},
      exclude: true,
      excludeReason: "Already flagged editorialExcluded in the bank: the correct pairing (paracortex / periarteriolar lymphatic sheath) is not available among the surviving options — option D is corrupted into an unrelated true statement, and option B pairs the correct lymph-node half with the wrong splenic half (red pulp instead of PALS).",
    },
  ],
}
