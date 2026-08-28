import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: "Histology Cardiovascular System — A-V Connections",
  modulePath: "104 CPS > Histology > Cardiovascular System > A-V Connections",
  articleId: "ART-104-HIS-AV-CONNECTIONS-CAPILLARIES-SHUNTS",

  concepts: [
    {
      // Sparse reuse, not a fresh mint: this exact canonical_key already has a
      // hand-authored, pinned record in docs/Kasr-Source-Imports/concept/
      // 104-CPS-histology-concepts.md (CON-CVS-132A76916FEC05, module_subject
      // "A-V Connections" — this exact leaf), found via find-existing.mjs
      // "fenestrated capillary" before any minting was attempted. Declaring
      // the same key here makes resolveConceptId resolve to that pinned id
      // and emit a sparse reuse row (article_ids/exam_signal only) — every
      // other field below is inert for the build, kept only to satisfy the
      // McqConcept type, and restated close to the pinned record's own
      // wording so a reader is not misled by a diverging copy.
      key: "fenestrated-capillary.structure-junctions-and-sites",
      label: "A fenestrated (visceral) capillary has pores covered by diaphragms and a continuous basal lamina, sited wherever fluid crosses fast",
      definition: "The fenestrated, or visceral, capillary is the second of the three capillary types, between the continuous (somatic) capillary and the sinusoidal capillary. Like the continuous capillary it is small and regular in calibre, its endothelial cells joined by tight junctions and its basal lamina continuous, and pericytes are present while macrophages are absent. What distinguishes it is its endothelium: it carries pores, or fenestrae — an interrupted endothelial cell covered by a diaphragm, a non-membranous, cartwheel-like structure with a central thickening and fourteen wedge-shaped gaps, derived from the glycocalyx. Fenestrated capillaries are sited in the intestine, in endocrine glands (carrying hormones) and in the renal glomerulus, where the fenestrae characteristically carry no diaphragm at all.",
      objective: "State what distinguishes a fenestrated capillary from a continuous capillary, and name two sites where it is found.",
      pitfall: "Confusing a fenestrated capillary with a sinusoid. Both have pores, but the fenestrated capillary's pores are covered by diaphragms and its basal lamina stays continuous, where the sinusoid's pores are open and its basal lamina is discontinuous.",
      subject: "cvs",
      primary: "DIS-HIS-T03",
      secondary: ["SYS-CVS-T01-S01"],
      modulePath: "104 CPS > Histology > Cardiovascular System > A-V Connections",
      type: "structural_description",
      aliases: ["Visceral capillary", "Capillary fenestrae", "Diaphragmed pore"],
    },
    {
      // Fresh mint. find-existing.mjs "continuous capillary" and "sinusoidal
      // capillary" both return hits, none reusable: a live, thin, single-
      // sentence "teaching.*" concept pair (CON-CVS-2A37D5DDEB19DB,
      // CON-CVS-047FC0A529AFBA) from a different, cross-university Systems-
      // view catalogue (pinned to ART-CVS-CARDIAC-HISTOLOGY, no 104-CPS
      // module tag) — recorded in conflicts, not reused, per the same
      // "different pipeline, no safe sparse-update path" reasoning already
      // documented for the FRC/lung-volumes and Hypoxia catalogues. A second
      // hit, CON-CVS-9585A65D9EDA4D ("continuous versus sinusoidal blood
      // capillary"), sits in the *generated* docs/Kasr-Source-Imports/concept/
      // 104-CPS-concepts.md — GENERATED_BY-blind to this pipeline's own
      // existingConceptIds() — so declaring its exact canonical_key would not
      // produce a safe sparse update (mintConceptId would derive the same id
      // fresh but resolveConceptId cannot see it pinned, so a *full* record
      // would be emitted and silently overwrite that hand-authored record's
      // aliases/evidence on import). Minted fresh instead, deliberately
      // distinct key text, with the overlap recorded below.
      key: "capillary-types.continuous-and-sinusoidal-structure-and-sites",
      label: "A continuous (somatic) capillary is a sealed tube for small-solute exchange; a sinusoidal capillary is wide-open for whole-cell and plasma-protein traffic",
      definition: "Continuous (somatic) capillaries are the sealed type: a small, regular calibre, an unbroken endothelium with no pores, endothelial cells joined by tight junctions, and a continuous basal lamina, built for tissue where only small solutes and gases need to cross an intact barrier. Sinusoidal capillaries (blood sinusoids) sit at the opposite end of the same three-way classification: a wide, irregular lumen, endothelial pores without diaphragms, cells separated by wide intercellular gaps rather than sealed by tight junctions, and a discontinuous basal lamina, built wherever whole cells or plasma proteins — not just small solutes — need to cross, as in the liver, spleen and bone marrow.",
      objective: "Contrast continuous and sinusoidal capillaries by endothelium, intercellular junctions and basal lamina, and give one site for each.",
      pitfall: "Confusing a sinusoid with a fenestrated capillary. Both have pores, but the fenestrated capillary's pores are covered by diaphragms and its basal lamina stays continuous, where the sinusoid's pores are open and its basal lamina is discontinuous.",
      subject: "cvs",
      primary: "DIS-HIS-T03",
      secondary: ["SYS-CVS-T01-S01"],
      modulePath: "104 CPS > Histology > Cardiovascular System > A-V Connections",
      type: "classification",
      aliases: ["Somatic capillary", "Blood sinusoid", "Continuous capillary", "Sinusoidal capillary"],
      conflicts: [
        "CON-CVS-9585A65D9EDA4D (pending, docs/Kasr-Source-Imports/concept/104-CPS-concepts.md, GENERATED_BY-blind to this pipeline) teaches the same continuous-versus-sinusoidal comparison from the original hand-picked 40-question MCQ batch; not reused because that file is this pipeline's own generated-output skip-list, so a matching canonical_key would emit a full overwrite rather than a sparse update. CON-CVS-2A37D5DDEB19DB and CON-CVS-047FC0A529AFBA (live, cross-university Systems-view catalogue, pinned to ART-CVS-CARDIAC-HISTOLOGY, no 104-CPS module) are single-sentence site-only facts for the same two types, from a different pipeline this module's own existingConceptIds() cannot see at all.",
      ],
      gaps: [
        "The covering article's own Mechanism section states that a continuous capillary's sealed, tight-junctioned, unbroken-basal-lamina wall suits small-solute and gas exchange, and that a sinusoid's wide, irregular, discontinuous-basal-lamina wall suits whole-cell and plasma-protein traffic in the liver, spleen and bone marrow — but it does not itself state that continuous capillaries are the commonest capillary type, that endocrine glands also carry sinusoidal capillaries, that macrophages sit within or beside the sinusoidal wall, or that sinusoids carry markedly fewer pericytes than a continuous or fenestrated capillary. These four facts are standard histology and are tested directly by this leaf's own bank, but are not yet written into this article's prose. Flagging for the article-authoring lane.",
      ],
    },
    {
      // Fresh mint. find-existing.mjs "pericyte" returns many hits, all
      // either a different structure (postcapillary venule wall; red-marrow
      // fixed cells), a different module's own content (101 ISK's pericyte-
      // and-undifferentiated-mesenchymal-cell concept, connective tissue,
      // not this module), or two live thin "teaching.*" facts
      // (CON-CVS-CC810A201244F0 "pericyte regulation of capillary flow",
      // CON-CVS-5D4C49C48AA325 "pericytes around capillary endothelium")
      // from the same GENERATED_BY-blind Systems-view catalogue as the
      // capillary-types concept above — same reasoning, recorded below, not
      // reused.
      key: "capillary-pericyte.contractile-function-differentiation-and-position",
      label: "The pericyte is a contractile cell wrapped around the capillary endothelium that regulates local blood flow and can differentiate into a fibroblast",
      definition: "The pericyte is a contractile, mesenchymal-lineage cell that wraps around the capillary endothelium, sitting within a split of the endothelial cell's own basal lamina — occupying, structurally, the position a tunica media would occupy in a larger vessel, since the capillary wall itself has no true media of its own. Contraction of the pericyte narrows the capillary lumen and so regulates local capillary blood flow, a point of flow control distinct from the arteriole's and metarteriole's own upstream regulation. Being of mesenchymal rather than haematopoietic or mesothelial lineage, the pericyte retains the capacity to differentiate into other mesenchymal derivatives — chiefly fibroblasts, and smooth muscle cells — particularly during tissue repair and vascular remodelling. A capillary itself, at roughly the same calibre as an erythrocyte, is not larger in diameter than the red cells that must deform to pass through it in single file.",
      objective: "State where the pericyte sits on the capillary wall, what its contraction does to local blood flow, and what mesenchymal cell type it can differentiate into.",
      pitfall: "Assuming the pericyte is a fixed, purely structural cell. It is contractile (regulating capillary blood flow directly) and retains mesenchymal differentiation potential, most notably into a fibroblast, unlike a fully committed lineage such as a macrophage (haematopoietic) or a mesothelial cell (coelomic epithelium).",
      subject: "cvs",
      primary: "DIS-HIS-T03",
      secondary: ["SYS-CVS-T01-S01"],
      modulePath: "104 CPS > Histology > Cardiovascular System > A-V Connections",
      type: "structural_description",
      aliases: ["Pericyte", "Capillary tunica media equivalent", "Rouget cell"],
      conflicts: [
        "CON-CVS-CC810A201244F0 (\"Pericyte regulation of capillary flow\") and CON-CVS-5D4C49C48AA325 (\"Pericytes around capillary endothelium\") are live, single-sentence facts from the same cross-university Systems-view catalogue as the capillary-types concept above (pinned to ART-CVS-CARDIAC-HISTOLOGY, no 104-CPS module, GENERATED_BY-blind to this pipeline) — not reused for the same reason. CON-CVS-08AA7F26A9BD28 (postcapillary venule wall) and the 101-ISK pericyte-and-undifferentiated-mesenchymal-cell concept are different structures/modules entirely, not this one.",
      ],
      gaps: [
        "This leaf's own covering article names pericytes only in passing, as a feature the fenestrated capillary shares with the continuous type; it does not itself teach the pericyte's contractile flow-regulating function, its mesenchymal differentiation potential, or its structural position within the capillary's basal lamina — all standard histology, tested directly by this leaf's own bank, but not yet written into this article's own prose. Flagging for the article-authoring lane.",
      ],
    },
    {
      // Sparse reuse, not a fresh mint: this exact canonical_key already has a
      // hand-authored, pinned record in 104-CPS-histology-concepts.md
      // (CON-CVS-E8964EBC8F2357, module_subject "A-V Connections" — this
      // exact leaf), found via find-existing.mjs "lymphatic capillary"
      // before any minting was attempted (the only other hit was a live,
      // genuinely distinct structure — the central lacteal of the intestinal
      // villus, CON-GIT-E2FC9FD9AE2828 — a different, narrower objective).
      key: "blood-vs-lymphatic-capillary.structural-and-functional-comparison",
      label: "Lymphatic capillaries begin blind, are wider and more permeable than blood capillaries, and remove what blood capillaries cannot carry",
      definition: "Blood capillaries begin from small arterioles; lymphatic capillaries begin with a blind end. Blood capillaries have a smaller, less permeable lumen; lymphatic capillaries are larger and more permeable. Blood-capillary endothelium may or may not be fenestrated and is usually joined by tight junctions with a usually continuous basal lamina; lymphatic capillary endothelium is non-fenestrated but has wider gaps between its cells and an interrupted basal lamina, and it usually lacks the pericytes that usually surround a blood capillary. Functionally, blood capillaries exchange materials between blood and tissues; lymphatic capillaries remove lymph from the interstitial spaces and return it to the blood, and they remove large molecules that blood capillaries cannot carry, such as fat droplets and bacteria.",
      objective: "Contrast blood and lymphatic capillaries by their beginning, lumen and permeability, endothelium, basal lamina, pericytes and function.",
      pitfall: "Read only topic in the book: inflammation of lymphatic vessels is lymphangitis, seen in the skin as painful red lines — a clinical correlate of the same wide, permeable, valveless lymphatic capillary wall this comparison describes.",
      subject: "cvs",
      primary: "DIS-HIS-T03",
      secondary: ["SYS-CVS-T01-S01"],
      modulePath: "104 CPS > Histology > Cardiovascular System > A-V Connections",
      type: "comparison",
      aliases: ["Lymphatic capillary structure", "Lymphangitis"],
    },
    {
      // Fresh mint. find-existing.mjs "arteriovenous anastomosis" returns no
      // hits at all — "safe to create".
      key: "arteriovenous-anastomosis.direct-shunt-sites-and-innervation",
      label: "An arteriovenous anastomosis is a direct, sympathetically innervated, muscular-sphinctered shunt between an arteriole and a venule that bypasses the capillary bed",
      definition: "An arteriovenous anastomosis (shunt) is a direct connection between an arteriole and a venule that bypasses the capillary bed entirely. It sits in exposed body parts — the fingertips, toes, external ears, nose and lips — and in organs such as the gastrointestinal tract, placenta, penis and uterus. Its arterial and venous ends resemble an arteriole and a venule respectively, while the intermediate segment carries a relatively thick smooth-muscle sphincter, enclosed in a connective-tissue capsule and richly innervated by the sympathetic nervous system. When the sphincter is closed, blood passes through the capillary bed as usual; when it opens, a large volume of blood runs through the shunt in a short, rapid circuit instead, directly increasing venous return, and the same mechanism regulates flow to the genital organs and to the organs of digestion, absorption and secretion.",
      objective: "Name where arteriovenous anastomoses are sited, describe their sphincter and innervation, and state what opening one does to venous return.",
      pitfall: "Treating an arteriovenous shunt as a pathological structure. It is a normal, richly innervated, muscular-sphinctered structure present in named body sites for named physiological reasons — the pathology is in a shunt failing to close, not in the shunt's existence.",
      subject: "cvs",
      primary: "DIS-HIS-T03",
      secondary: ["SYS-CVS-T01-S01"],
      modulePath: "104 CPS > Histology > Cardiovascular System > A-V Connections",
      type: "structural_description",
      aliases: ["Arteriovenous shunt", "AV anastomosis", "Glomus body"],
    },
  ],

  questions: [
    {
      key: "blood-capillaries-in-exocrine-glands-are-d8a679f4",
      conceptKey: "fenestrated-capillary.structure-junctions-and-sites",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "Extend the fenestrated-capillary fast-exchange principle to exocrine gland secretion, alongside the article's own named sites.",
      explanations: {
        A: "Sinusoidal capillaries, with their wide-open, discontinuous-basal-lamina wall, are built for whole-cell and plasma-protein traffic in organs like the liver, spleen and bone marrow — a wall far more open than an exocrine gland's active secretion needs.",
        B: "\"Visceral capillary\" is an alternative name for the fenestrated type itself, not a separate, distinct category from it.",
        C: "An exocrine gland's active secretion needs fast bulk movement of fluid and small solutes across its capillary wall, exactly the fast-exchange role a fenestrated capillary's diaphragmed pores are built for — the same design already named for the intestine and endocrine glands, extended here to an exocrine one.",
        D: "\"Somatic capillary\" names the continuous, sealed type — built for slow, small-solute exchange only — the opposite of what an actively secreting gland needs.",
      },
    },
    {
      key: "one-of-the-following-is-a-type-of-blood-capillaries-25b77d04",
      conceptKey: "capillary-types.continuous-and-sinusoidal-structure-and-sites",
      difficulty: "Easy",
      questionType: "Classification",
      learningObjective: "Recognise blood sinusoids as one of the three structural capillary types, distinct from named individual vessels and from the lymphatic system.",
      explanations: {
        A: "Blood sinusoids are one of the three recognised structural types of blood capillary — alongside continuous and fenestrated — distinguished by their large, irregular lumen and open, discontinuous wall.",
        B: "Coronary vessels are specific, named arteries (and their branches) supplying the heart muscle, not a structural category of capillary.",
        C: "\"Basilar vessels\" refers to the specific basilar artery of the brainstem circulation, not a capillary type.",
        D: "Lymphatic capillaries belong to the separate lymphatic vascular system, carrying lymph rather than blood, so they are not a type of blood capillary.",
      },
    },
    {
      key: "capillary-is-called-visceral-capillary-d7aa139f",
      conceptKey: "fenestrated-capillary.structure-junctions-and-sites",
      difficulty: "Easy",
      questionType: "Classification",
      learningObjective: "Equate \"visceral capillary\" with the fenestrated capillary type.",
      explanations: {
        A: "\"Continuous\" names the sealed, somatic capillary type, built for slow small-solute exchange across an intact barrier — not the term this question tests.",
        B: "\"Visceral capillary\" is the alternative name for the fenestrated capillary, the type whose diaphragmed pores suit the fast fluid and solute exchange demanded by the viscera (intestine, endocrine glands, glomerulus).",
        C: "\"Sinusoidal\" names the wide-open, discontinuous-wall type built for whole-cell and plasma-protein traffic — a different, more open structure from the fenestrated (visceral) type.",
        D: "\"Lymphatic\" names a capillary of the separate lymphatic system, not a structural class of blood capillary at all.",
      },
    },
    {
      key: "capillary-is-covered-by-diaphragm-with-continuous-basal-lami-b02758b7",
      conceptKey: "fenestrated-capillary.structure-junctions-and-sites",
      difficulty: "Easy",
      questionType: "Structure and function",
      learningObjective: "Identify the fenestrated capillary by its diaphragmed pores sitting on a still-continuous basal lamina.",
      explanations: {
        A: "A continuous capillary has no pores at all — this description of a diaphragmed pore does not apply to it.",
        B: "This is exactly the fenestrated (visceral) capillary: a diaphragm covers its endothelial pores, and — unlike a sinusoid — its basal lamina stays continuous.",
        C: "A sinusoidal capillary's pores carry no diaphragm and sit on a discontinuous, not continuous, basal lamina — the opposite combination from the one this question describes.",
        D: "A lymphatic capillary is non-fenestrated altogether, so it carries no diaphragmed pore of this kind.",
      },
    },
    {
      key: "capillary-is-present-in-intestine-endocrine-renal-capillarie-722a2209",
      conceptKey: "fenestrated-capillary.structure-junctions-and-sites",
      difficulty: "Easy",
      questionType: "Structure and function",
      learningObjective: "Name the intestine, endocrine glands and renal glomerulus as the fenestrated capillary's three sites.",
      explanations: {
        A: "Continuous capillaries are sited in tissue needing only slow, small-solute exchange, not the fast fluid and hormone traffic of the intestine, endocrine glands and glomerulus.",
        B: "The fenestrated (visceral) capillary is sited exactly here — the intestine, endocrine glands (carrying hormones) and the renal glomerulus, where its fenestrae characteristically carry no diaphragm at all.",
        C: "Sinusoidal capillaries are sited in the liver, spleen and bone marrow, where whole cells and plasma proteins — not simply fast fluid exchange — must cross the wall.",
        D: "Lymphatic capillaries are widespread in the interstitial spaces generally, not specifically named for the intestine, endocrine glands or glomerulus as a defining site.",
      },
    },
    {
      key: "the-type-of-capillaries-that-show-pores-and-diaphragms-is-0586b4be",
      conceptKey: "fenestrated-capillary.structure-junctions-and-sites",
      difficulty: "Easy",
      questionType: "Structure and function",
      learningObjective: "State that pores covered by diaphragms identify the fenestrated (visceral), not the somatic or sinusoidal, capillary.",
      explanations: {
        A: "The somatic (continuous) capillary carries no pores of any kind in its endothelium.",
        B: "The fenestrated, or visceral, capillary is defined by pores (fenestrae) covered by diaphragms — a non-membranous, cartwheel-like structure with a central thickening and fourteen wedge-shaped gaps.",
        C: "A blood sinusoid does carry pores, but they are open, without a covering diaphragm — a further step beyond the fenestrated type's diaphragmed pattern.",
        D: "A continuous capillary, by definition, has no pores or fenestrations of any kind.",
      },
    },
    {
      key: "visceral-capillaries-are-characterized-by-the-following-0999435e",
      conceptKey: "fenestrated-capillary.structure-junctions-and-sites",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "Identify rapid fluid and solute exchange as the fenestrated (visceral) capillary's defining functional role, distinct from its structural details or any one named site.",
      explanations: {
        A: "Visceral (fenestrated) capillaries, by definition, do have pores in their wall — the opposite of having none.",
        B: "Visceral (fenestrated) capillaries have a continuous basal lamina, distinguishing them from sinusoids, whose basal lamina is discontinuous.",
        C: "Fenestrated capillaries exist specifically to support rapid exchange of fluid and small solutes between blood and tissue, which is why they are sited in the intestine, endocrine glands and renal glomerulus — organs with high filtration or secretory demand. This functional rationale is the defining, generalisable characteristic.",
        D: "Presence in the intestine is a true but narrower, example-level fact rather than the general defining characteristic this question asks for.",
      },
    },
    {
      key: "one-of-the-following-is-a-type-of-blood-capillaries-a-blood-68545fdd",
      conceptKey: "capillary-types.continuous-and-sinusoidal-structure-and-sites",
      difficulty: "Easy",
      questionType: "Classification",
      learningObjective: "Recognise blood sinusoids as one of the three structural capillary types (duplicate occurrence of the same fact from a different source book).",
      explanations: {
        A: "Blood sinusoids are one of the three recognised structural types of blood capillary — alongside continuous and fenestrated — distinguished by a large, irregular lumen and an open, discontinuous wall built for whole-cell and plasma-protein traffic.",
        B: "Coronary vessels are specific, named arteries (and their branches) supplying the heart muscle, not a structural category of capillary.",
        C: "\"Basilar vessels\" refers to the specific basilar artery of the brainstem circulation, not a capillary type.",
        D: "Lymphatic capillaries belong to the separate lymphatic vascular system, carrying lymph rather than blood, so they are not a type of blood capillary.",
      },
    },
    {
      key: "blood-sinusoids-are-common-in-the-following-sites-12ed7bcd",
      conceptKey: "capillary-types.continuous-and-sinusoidal-structure-and-sites",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "Name endocrine glands, alongside liver, spleen and bone marrow, as a blood-sinusoid site.",
      explanations: {
        A: "The brain's capillaries are continuous and sealed by tight junctions as part of the blood-brain barrier — the structural opposite of an open sinusoid.",
        B: "The stomach's mucosal capillaries are fenestrated, suited to rapid secretory exchange, not open sinusoids built for whole-cell traffic.",
        C: "Skin capillaries are continuous, sealed vessels suited to slow, small-solute exchange, not the open, whole-cell-permitting sinusoid.",
        D: "Endocrine glands carry sinusoidal capillaries alongside the liver, spleen and bone marrow — their wide, open, discontinuous-basal-lamina wall lets a hormone-rich, protein-rich blood pass freely into the circulation.",
      },
    },
    {
      key: "somatic-capillaries-are-characterized-by-the-following-99d17220",
      conceptKey: "capillary-types.continuous-and-sinusoidal-structure-and-sites",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "State that the continuous (somatic) capillary is the commonest capillary type.",
      explanations: {
        A: "A continuous (somatic) capillary's endothelium has no pores at all — the opposite of this option.",
        B: "The continuous (somatic) capillary, sealed and built for small-solute exchange in ordinary tissue such as muscle, skin and the CNS, is the most widespread and therefore commonest of the three capillary types.",
        C: "A continuous capillary's basal lamina is continuous, not discontinuous — a discontinuous basal lamina instead marks the sinusoid.",
        D: "A continuous capillary's endothelium forms an unbroken, continuous layer, not a discontinuous one — a discontinuous endothelial layer instead marks the sinusoid.",
      },
    },
    {
      key: "blood-sinusoids-are-characterized-by-all-the-following-excep-69a584ff",
      conceptKey: "capillary-types.continuous-and-sinusoidal-structure-and-sites",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "State that a discontinuous, not continuous, basement membrane is the true blood-sinusoid feature.",
      explanations: {
        A: "The exception, and the answer. A blood sinusoid has a discontinuous, not continuous, basement membrane — this open, gap-filled basal lamina is exactly what lets whole cells and plasma proteins cross its wall.",
        B: "True of a sinusoid, so not the exception — wide gaps between its endothelial cells are a defining feature.",
        C: "True of a sinusoid, so not the exception — its endothelium carries fenestrations without a covering diaphragm.",
        D: "True of a sinusoid, so not the exception — its lumen is wider and more irregular than an ordinary capillary's.",
      },
    },
    {
      key: "capillary-is-continuous-endothelium-basal-lamina-with-tight-abd1e98e",
      conceptKey: "capillary-types.continuous-and-sinusoidal-structure-and-sites",
      difficulty: "Easy",
      questionType: "Structure and function",
      learningObjective: "Identify the continuous capillary by its unbroken endothelium, continuous basal lamina, tight junctions and pericytes.",
      explanations: {
        A: "This describes the continuous (somatic) capillary exactly: an unbroken endothelium, a continuous basal lamina, endothelial cells joined by tight junctions, and pericytes present.",
        B: "A fenestrated capillary shares the tight junctions, continuous basal lamina and pericytes, but its endothelium carries diaphragmed pores rather than being unbroken.",
        C: "A sinusoidal capillary has wide intercellular gaps rather than tight junctions, and a discontinuous rather than continuous basal lamina — the opposite pattern.",
        D: "A lymphatic capillary is non-fenestrated but has wide intercellular gaps, an interrupted basal lamina, and usually lacks pericytes — a different combination again.",
      },
    },
    {
      key: "capillary-is-present-in-liver-spleen-b-m-145a5357",
      conceptKey: "capillary-types.continuous-and-sinusoidal-structure-and-sites",
      difficulty: "Easy",
      questionType: "Structure and function",
      learningObjective: "Name the liver, spleen and bone marrow as sinusoidal capillary sites.",
      explanations: {
        A: "Continuous capillaries are sited in tissue needing only slow, small-solute exchange, not the whole-cell and plasma-protein traffic of the liver, spleen and bone marrow.",
        B: "Fenestrated capillaries are sited in the intestine, endocrine glands and renal glomerulus, where fast fluid and hormone exchange — not whole-cell traffic — is the demand.",
        C: "Sinusoidal capillaries are sited exactly here: the liver (plasma proteins), spleen and bone marrow (stored and formed blood cells), where their wide-open, discontinuous-basal-lamina wall lets whole cells cross.",
        D: "Lymphatic capillaries drain the interstitial spaces generally, not specifically named for the liver, spleen or bone marrow as a defining site.",
      },
    },
    {
      key: "capillary-is-without-diaphragm-pericyte-but-contain-macropha-f24c09bf",
      conceptKey: "capillary-types.continuous-and-sinusoidal-structure-and-sites",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "Identify the sinusoidal capillary by its diaphragm-free pores, reduced pericyte coverage and macrophage association.",
      explanations: {
        A: "A continuous capillary carries neither pores nor a macrophage association — the opposite combination from the one this question describes.",
        B: "A fenestrated capillary's pores are covered by a diaphragm and it retains pericytes — the reverse of the diaphragm-free, pericyte-poor wall this question describes.",
        C: "The sinusoidal capillary matches all three features: its pores carry no diaphragm, it has few to no pericytes, and macrophages sit within or beside its wall — the classic example being Kupffer cells lodged in liver sinusoids.",
        D: "A lymphatic capillary usually lacks pericytes too, but it is not the type associated with macrophages sitting in or beside its own wall — that association is the sinusoid's own signature feature.",
      },
    },
    {
      key: "blood-sinusoids-are-characterized-by-the-following-91db52cc",
      conceptKey: "capillary-types.continuous-and-sinusoidal-structure-and-sites",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "Identify a sinusoid's association with macrophages sitting within or beside its own wall as its signature feature (duplicate occurrence from a different source book).",
      explanations: {
        A: "A blood sinusoid characteristically does have pores in its wall — often without even a covering diaphragm — the opposite of having none.",
        B: "Sinusoidal endothelial cells are separated by wide, not minimal, intercellular spaces, which is precisely what allows even large molecules and cells to pass through the wall.",
        C: "Sinusoids characteristically have a discontinuous or even absent basement membrane, not a continuous one — one of the key features distinguishing them from a fenestrated capillary.",
        D: "A defining feature of the blood sinusoid is that macrophages sit either within its wall or immediately outside it — the classic example being Kupffer cells lodged in liver sinusoids, and macrophages of the splenic cords positioned just outside splenic sinusoid walls.",
      },
    },
    {
      key: "sinusoidal-capillary-blood-sinusoid-is-characterized-by-e2000dcb",
      conceptKey: "capillary-types.continuous-and-sinusoidal-structure-and-sites",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "State that a blood sinusoid carries markedly fewer pericytes than a continuous or fenestrated capillary.",
      explanations: {
        A: "A blood sinusoid characteristically has few to no pericytes surrounding its endothelium, in contrast to the continuous and fenestrated types, which retain a fuller pericyte investment — this reduced coverage is part of what makes the sinusoidal wall unusually open.",
        B: "A sinusoid is large and irregular, not small and regular, in diameter — the opposite of a continuous capillary's own calibre.",
        C: "A sinusoid has a discontinuous, not continuous, basal lamina — a continuous basal lamina instead marks the continuous and fenestrated types.",
        D: "Sinusoidal endothelial cells are joined by wide gaps rather than tight junctions, allowing free passage of even large molecules and cells — the opposite of this option.",
      },
    },
    {
      key: "continuous-capillaries-are-characterized-by-all-the-followin-63f32cf5",
      conceptKey: "capillary-types.continuous-and-sinusoidal-structure-and-sites",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "State that the renal glomerulus is a fenestrated, not a continuous, capillary site.",
      explanations: {
        A: "True of a continuous capillary, so not the exception — its endothelial cells do contain pinocytic vesicles for vesicular transport.",
        B: "True, so not the exception — its endothelial cells are joined by tight junctions, sealing the wall.",
        C: "The exception, and the answer. The renal glomerulus is a fenestrated, not a continuous, capillary site — this leaf's own fenestrated-capillary concept names the glomerulus specifically, precisely because its fast, high-volume filtration needs pores, not a sealed continuous wall.",
        D: "True, so not the exception — a continuous capillary lacks fenestrae altogether, unlike the fenestrated and sinusoidal types.",
      },
    },
    {
      key: "characters-of-blood-capillaries-include-all-except-e58ab43e",
      conceptKey: "capillary-pericyte.contractile-function-differentiation-and-position",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "State that a capillary's diameter is not larger than an erythrocyte's, against three true pericyte and macrophage facts.",
      explanations: {
        A: "True of blood capillaries generally, so not the exception — the pericyte does surround the endothelium.",
        B: "True, so not the exception — the pericyte sits within a split of the endothelial cell's own basal lamina, so the two basal laminae fuse around it.",
        C: "The exception, and the answer. A capillary is roughly the same calibre as an erythrocyte, not larger — red cells must deform to pass through it in single file, the opposite of this statement.",
        D: "True of blood capillaries generally, so not the exception — macrophages do extend pseudopodia into the intercellular space around the capillary wall.",
      },
    },
    {
      key: "pericytes-of-blood-capillaries-perform-the-following-functio-913808b3",
      conceptKey: "capillary-pericyte.contractile-function-differentiation-and-position",
      difficulty: "Easy",
      questionType: "Structure and function",
      learningObjective: "State that pericyte contraction regulates local capillary blood flow.",
      explanations: {
        A: "A smooth luminal surface for blood flow is a property of the endothelial cells themselves, not a function performed by the pericyte wrapped around them.",
        B: "The pericyte is a contractile cell; its contraction narrows the capillary lumen and so regulates local capillary blood flow, a control point distinct from the arteriole's own upstream regulation.",
        C: "The pericyte can differentiate into a fibroblast (or a smooth muscle cell), but this differentiation potential is a separate fact from its everyday contractile function, which this question asks about.",
        D: "Nutrition of the capillary wall is not a recognised pericyte function; the pericyte's defining role is contractile flow regulation.",
      },
    },
    {
      key: "in-the-blood-capillaries-regulating-the-blood-flow-is-the-fu-2f8550df",
      conceptKey: "capillary-pericyte.contractile-function-differentiation-and-position",
      difficulty: "Easy",
      questionType: "Structure and function",
      learningObjective: "State that pericytes, not elastic fibres, smooth muscle fibres or fibroblasts, regulate capillary blood flow (duplicate occurrence, handwritten-recovered answer).",
      explanations: {
        A: "Elastic fibres provide passive recoil in larger vessel walls; a capillary wall carries none, and they play no role in local capillary flow regulation.",
        B: "Smooth muscle fibres regulate flow at the arteriole and metarteriole, upstream of the capillary itself, which has no true smooth-muscle media of its own.",
        C: "Fibroblasts are connective-tissue cells with no contractile role in the capillary wall.",
        D: "The pericyte is the capillary's own contractile cell; its contraction narrows the lumen and so regulates local capillary blood flow, the wall's only point of active flow control at this level.",
      },
    },
    {
      key: "pericyte-of-blood-capillary-can-differentiate-into-the-follo-5b3cb3c8",
      conceptKey: "capillary-pericyte.contractile-function-differentiation-and-position",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "State that a pericyte, being of mesenchymal lineage, can differentiate into a fibroblast.",
      explanations: {
        A: "Macrophages differentiate from monocytes of the haematopoietic lineage, an entirely different developmental origin from the mesenchymal pericyte.",
        B: "Skeletal muscle cells arise from myogenic precursor (satellite) cells of a distinct lineage, not from pericytes.",
        C: "Mesothelial cells arise embryologically from the coelomic mesothelium lining body cavities, an unrelated lineage to the perivascular pericyte.",
        D: "The pericyte is a multipotent, mesenchymal-lineage cell that retains the capacity to differentiate into other mesenchymal derivatives, most notably the fibroblast (and smooth muscle cells), particularly during tissue repair and vascular remodelling.",
      },
    },
    {
      key: "pericyte-of-blood-capillary-can-differentiate-into-the-follo-86de0d7b",
      conceptKey: "capillary-pericyte.contractile-function-differentiation-and-position",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "State that a pericyte, being of mesenchymal lineage, can differentiate into a fibroblast (duplicate occurrence from a different source book).",
      explanations: {
        A: "Macrophages differentiate from monocytes of the haematopoietic lineage, an entirely different developmental origin from the mesenchymal pericyte.",
        B: "Skeletal muscle cells arise from myogenic precursor (satellite) cells of a distinct lineage, not from pericytes.",
        C: "Mesothelial cells arise embryologically from the coelomic mesothelium lining body cavities, an unrelated lineage to the perivascular pericyte.",
        D: "The pericyte is a multipotent, mesenchymal-lineage cell that retains the capacity to differentiate into other mesenchymal derivatives, most notably the fibroblast (and smooth muscle cells), particularly during tissue repair and vascular remodelling.",
      },
    },
    {
      key: "tunica-media-of-blood-capillaries-is-formed-of-2adb99c6",
      conceptKey: "capillary-pericyte.contractile-function-differentiation-and-position",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "State that the pericyte occupies the position a tunica media would occupy in a capillary wall, since the capillary has no true media.",
      explanations: {
        A: "A capillary wall has no true tunica media of its own; the pericyte, wrapped around the endothelium within a split of its basal lamina, occupies that structural position instead.",
        B: "Smooth muscle fibres form the tunica media of an arteriole or larger vessel, but a capillary's wall carries no smooth muscle layer at all.",
        C: "Fibroblasts belong to the surrounding connective tissue, not to the capillary wall's own structure.",
        D: "Elastic fibres are a tunica media and adventitia component of larger vessels; a capillary wall carries none.",
      },
    },
    {
      key: "all-characters-of-lymphatic-capillary-except-0c07d833",
      conceptKey: "blood-vs-lymphatic-capillary.structural-and-functional-comparison",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "State that a lymphatic capillary lacks a continuous basal lamina and usually lacks pericytes, the opposite of a blood capillary's own usual pattern.",
      explanations: {
        A: "True of a lymphatic capillary, so not the exception — it begins with a blind end, unlike a blood capillary, which begins from a small arteriole.",
        B: "True, so not the exception — its endothelium is non-fenestrated but shows wide gaps between cells, wider than a blood capillary's.",
        C: "The exception, and the answer. A lymphatic capillary has an interrupted, not continuous, basal lamina, and it usually lacks the pericytes that usually surround a blood capillary — the reverse of what this option states.",
        D: "True, so not the exception — removing lymph from the interstitial space and returning it to the blood is the lymphatic capillary's defining function.",
      },
    },
    {
      key: "lymphatic-capillary-is-characterized-by-all-the-following-ex-a8c6856c",
      conceptKey: "blood-vs-lymphatic-capillary.structural-and-functional-comparison",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "State that a lymphatic capillary's endothelium is non-fenestrated, against three true features.",
      explanations: {
        A: "The exception, and the answer. Lymphatic capillary endothelium is non-fenestrated — it has no fenestrae at all; its wider permeability instead comes from wide gaps between its endothelial cells.",
        B: "True of a lymphatic capillary, so not the exception — no tight junctions join its endothelial cells, allowing easy entry of interstitial fluid and large molecules.",
        C: "True, so not the exception — a lymphatic capillary begins with a blind end, unlike a blood capillary.",
        D: "True, so not the exception — its lumen is wide and irregular, wider than an ordinary blood capillary's.",
      },
    },
    {
      key: "regarding-the-lymphatic-capillaries-choose-the-correct-state-6e9870ae",
      conceptKey: "blood-vs-lymphatic-capillary.structural-and-functional-comparison",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "State that a lymphatic capillary, like a blood capillary, is a single layer of endothelium, despite its other differences from a blood capillary.",
      explanations: {
        A: "A lymphatic capillary is made of a single, thin layer of endothelial cells, similar in this basic construction to a blood capillary, though adapted very differently to its own fluid- and macromolecule-collecting function.",
        B: "Lymphatic capillaries are larger in diameter and more, not less, permeable than blood capillaries — essential to their fluid- and macromolecule-collecting function.",
        C: "Lymphatic capillary endothelial cells are joined by loose, overlapping junctions rather than tight junctions, specifically to allow easy entry of interstitial fluid and proteins.",
        D: "Lymphatic capillaries characteristically lack a continuous basement membrane and usually lack pericytes altogether, rather than having a basement membrane that splits to enclose pericytes as some blood vessels do.",
      },
    },
    {
      key: "arterio-venous-anastomoses-are-characterized-by-0677dfc0",
      conceptKey: "arteriovenous-anastomosis.direct-shunt-sites-and-innervation",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "Combine an arteriovenous anastomosis's site, innervation and regulatory role into the single \"all of the above\" characterisation the question tests.",
      explanations: {
        A: "True of arteriovenous anastomoses, so on its own an incomplete answer — they are indeed concentrated in the tips of the fingers and toes, among other exposed sites.",
        B: "True, so on its own an incomplete answer — they are richly innervated by sympathetic fibres that open or close the shunt.",
        C: "True, so on its own an incomplete answer — opening or closing the shunt regulates blood flow and pressure distribution to these peripheral sites.",
        D: "Each of the three statements — characteristic distribution, sympathetic innervation, and a haemodynamic regulatory role — is independently a genuine feature of arteriovenous anastomoses, so the complete, correct choice combines all three.",
      },
    },
    {
      key: "regarding-arterio-venous-anastomosis-7a5dab36",
      conceptKey: "arteriovenous-anastomosis.direct-shunt-sites-and-innervation",
      difficulty: "Moderate",
      questionType: "Mechanism",
      learningObjective: "Identify increased venous return as the arteriovenous anastomosis's defining broader physiological role.",
      explanations: {
        A: "The reverse of what happens: opening (dilating) an anastomosis lets blood bypass the capillary bed through the shunt's direct arteriole-to-venule connection, not pass through the capillary bed — closing the sphincter is what sends blood through the capillary bed as usual.",
        B: "True of arteriovenous anastomoses in isolation — they do dilate in hot weather, redirecting blood toward the skin surface for heat loss — but this names only one half of their thermoregulatory behaviour, not the broader functional role tested here.",
        C: "True in isolation — anastomoses do constrict in cold weather to help conserve heat — but again this names only the opposite half of the same thermoregulatory behaviour, not the complete answer this question tests.",
        D: "A shunt's defining, broader physiological role: opening it lets a large volume of blood bypass the capillary bed and run through this short, low-resistance circuit into the venous side, directly increasing venous return.",
      },
    },
  ],
}
