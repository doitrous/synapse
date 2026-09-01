import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: "Histology Cardiovascular System — The Heart's Conducting System (Purkinje fibres)",
  modulePath: "104 CPS > Histology > Cardiovascular System > The heart",
  // No dedicated 104-CPS histology article states Purkinje fibres' own
  // cellular-level histological picture (diameter, nucleus, sarcoplasm,
  // striations, intercalated discs) — ART-104-HIS-HEART-AND-VESSEL-WALL only
  // locates the conducting system in the subendocardium, and 104-CPS-
  // histology-concepts.md goes no further either (grepped in full: no
  // "Purkinje" hit). ART-104-ANA-HEART-SKELETON-AND-CONDUCTION, the closest
  // real, live, evidenced article, does teach the conducting system's own
  // named components (SA node, AV node, AV bundle and its right/left
  // branches, the moderator band link, Purkinje fibres as the terminal
  // expression) and confirms it is specialised cardiac MUSCLE, not nerve
  // tissue — read in full before authoring against it. The concept's own
  // `gaps` field discloses what that article does not itself state.
  articleId: "ART-104-ANA-HEART-SKELETON-AND-CONDUCTION",

  concepts: [
    {
      // Fresh mint, after a real search: find-existing.mjs "purkinje" /
      // "subendocardial" / "conducting system" returned no 104-CPS-scoped
      // hit (existingConceptIds() for module "104 CPS" only scans
      // docs/Kasr-Source-Imports/concept/104-CPS-*.md, per build-batches.ts).
      //
      // Overlap found, not reused: docs/import-ready/concept/103-BMS-
      // histology-concepts.md (a DIFFERENT Kasr module's own pending batch,
      // in the cross-university Systems-view root, not this pipeline's
      // 104-CPS-scoped scan) already carries a fully evidenced, citation-
      // backed record for this exact idea — CON-MSK-5EA95D36121EF8,
      // canonical_key cardiac-muscle.purkinje-fibres.histological-
      // characteristics, label "Purkinje fibres are larger, pale and
      // vacuolated cardiac muscle fibres in the moderator band that conduct
      // via gap junctions without intercalated discs." That record's own
      // `rejectedMergeCandidateIds` field explicitly considered and rejected
      // merging with "the 104 CPS conduction-system concepts" on the
      // grounds that those state "the conduction pathway's function, not
      // this fibre's own histological picture" — but this leaf's own bank
      // row tests exactly that histological picture, which 103-BMS's record
      // already fully owns. Reusing its id is not available to this seed
      // pipeline (existingConceptIds() cannot see a different module's file
      // in docs/import-ready/, and mintConceptId under subject "cvs" would
      // derive a different id than CON-MSK-5EA95D36121EF8's own MSK-system
      // mint in any case — the same "different pipeline/root, no safe
      // sparse-update path" situation documented repeatedly elsewhere in
      // this branch for GENERATED_BY-blind and cross-catalogue overlaps).
      // Minted fresh under 104 CPS instead, with the overlap recorded below
      // rather than silently duplicated — needs a chief-of-staff ruling on
      // consolidation once 103-BMS's own batch is imported.
      key: "cardiac-conducting-system.purkinje-fibre-site-and-histological-characteristics",
      label: "Purkinje fibres are large, pale, vacuolated cardiac muscle fibres of the AV bundle's branches that conduct fast via gap junctions and carry no intercalated discs",
      definition: "Purkinje fibres are the terminal, specialised cardiac muscle fibres of the heart's conducting system — the right and left branches of the atrioventricular (AV) bundle, reaching the ventricular myocardium via the moderator band on the right, then running beneath the subendocardium to encircle the papillary-muscle bases before ascending towards the ventricular base. Because their job is rapid, uniform impulse spread rather than force generation, they are built differently from an ordinary cardiac myocyte: larger in diameter, with an eccentrically placed nucleus and a pale, vacuolated sarcoplasm (from abundant glycogen), few myofibrils lying peripherally so the fibre shows no clear striations, and gap junctions connecting fibre to fibre for fast conduction without any intercalated discs at all — the mechanical anchorage an intercalated disc gives ordinary contracting myocardium is not what a fibre built purely for signal speed needs. Bundles of Purkinje fibres are surrounded by a connective-tissue sheath.",
      objective: "State where Purkinje fibres sit in the conducting system (AV bundle branches, reached via the moderator band on the right) and list the histological features — diameter, nucleus position, sarcoplasm, striations, intercalated discs — that distinguish them from an ordinary cardiac myocyte.",
      pitfall: "Assuming a specialised conducting cardiac fibre must still carry intercalated discs because it is cardiac muscle. Purkinje fibres carry gap junctions, which give the speed, but no intercalated discs at all — the fastest-conducting cardiac fibre is the one built for signal speed rather than the mechanical anchorage ordinary myocardium needs to contract as one.",
      subject: "cvs",
      primary: "DIS-HIS-T03",
      secondary: ["SYS-CVS-T01-S01-M04"],
      modulePath: "104 CPS > Histology > Cardiovascular System > The heart",
      type: "structural_description",
      aliases: ["Purkinje fibre histology", "Conducting system muscle fibres", "Moderator band fibres"],
      conflicts: [
        "CON-MSK-5EA95D36121EF8 (docs/import-ready/concept/103-BMS-histology-concepts.md, canonical_key cardiac-muscle.purkinje-fibres.histological-characteristics, pending) states this same idea in full, with real evidence (department histology book, cited claims/citations). Outside this pipeline's 104-CPS-scoped existingConceptIds() scan (different module, different root) and mintConceptId would not reproduce its id (different subject/system prefix), so no safe sparse-update path exists from this seed file — recorded here for a future consolidation ruling rather than silently duplicated.",
      ],
      gaps: [
        "ART-104-ANA-HEART-SKELETON-AND-CONDUCTION states that the conducting system is specialised cardiac muscle (not nerve tissue), names the AV bundle's right and left branches, the moderator band link and Purkinje fibres as their terminal expression — but it does not itself state the cellular-level LM picture (larger diameter, eccentric nucleus, pale vacuolated sarcoplasm from glycogen, absent striations, absent intercalated discs, connective-tissue sheath around bundles) this leaf's own bank question tests. That histological detail is standard, undisputed cardiac histology, already fully evidenced in the sibling 103-BMS record noted above; flagged for the 104 CPS histology-article-authoring lane to add explicitly rather than leaving the citation to stand in for content the article does not yet carry.",
      ],
    },
  ],

  questions: [
    {
      key: "all-characters-of-purkinje-fibers-except-xxx-b4193a05",
      conceptKey: "cardiac-conducting-system.purkinje-fibre-site-and-histological-characteristics",
      difficulty: "Moderate",
      questionType: "Recall of a false statement",
      learningObjective: "Identify that Purkinje fibres have a LARGER diameter and an eccentric — not central and smaller — nucleus compared with an ordinary cardiac muscle fibre.",
      explanations: {
        A: "True of Purkinje fibres, so not the exception. Bundles of Purkinje fibres are surrounded by a connective-tissue sheath, part of what marks them out histologically as a specialised, separately-bundled fibre type.",
        B: "True, so not the exception. Purkinje fibres are the terminal branches of the atrioventricular bundle and its right and left divisions, reaching the ventricular myocardium via the moderator band on the right side.",
        C: "The exception, and the answer. Purkinje fibres have a LARGER diameter than an ordinary cardiac muscle fibre, not a smaller one, and their nucleus is typically eccentric in position, not central. A common trap: assuming a 'specialised' fibre must be smaller or more delicate than the ordinary tissue around it, when here the opposite is true on both counts.",
        D: "True, so not the exception. Purkinje fibres show no clear striations, because they carry few myofibrils lying peripherally in the fibre, and they carry no intercalated discs at all — their fibre-to-fibre conduction runs through gap junctions instead, built for speed rather than the mechanical anchorage an intercalated disc provides.",
        E: "True, so not the exception. The Purkinje fibre's sarcoplasm is pale and vacuolated, a direct result of the abundant glycogen it stores.",
      },
    },
    // run40, leaf-null bank row reclustered under "Electrical Activity of
    // the Heart" by the ledger's own keyword heuristic (leaf tag unreliable,
    // per this branch's standing hazard) — genuinely tests this same
    // concept's own "modified myocardial cells, not nerve tissue" fact.
    {
      key: "about-the-purkinje-tissue-all-the-following-are-true-except-a1365424",
      conceptKey: "cardiac-conducting-system.purkinje-fibre-site-and-histological-characteristics",
      difficulty: "Moderate",
      questionType: "Recall of a false statement",
      learningObjective: "Identify that Purkinje fibres are modified cardiac muscle fibres, not primitive nerve tissue, as the exception among otherwise true statements.",
      explanations: {
        A: "True, so not the exception. Purkinje fibres are modified cardiac muscle fibres — built from the same conducting-system lineage as the SA node, AV node and AV bundle, all of which the department book states explicitly are specialised cardiac muscle, not nerve tissue.",
        B: "True, so not the exception. Purkinje fibres are confined to the ventricles, reached via the moderator band on the right and running beneath the subendocardium of both ventricles, encircling the papillary-muscle bases before ascending toward the ventricular base.",
        C: "The exception, and the answer. Purkinje fibres are not primitive nerve tissue at all — they are modified cardiac MUSCLE fibres, built for rapid conduction rather than force generation. A common trap: assuming a tissue this specialised for signal transmission must be neural, when the heart's whole conducting system, Purkinje fibres included, is built from muscle cells modified for the job, not from nerve cells.",
        D: "True, so not the exception. Purkinje fibres conduct impulses through gap junctions at a speed comparable to nerve fibres — fast, uniform propagation — which is exactly the property that makes their true (muscular) tissue identity a common point of confusion.",
      },
    },
  ],
}
