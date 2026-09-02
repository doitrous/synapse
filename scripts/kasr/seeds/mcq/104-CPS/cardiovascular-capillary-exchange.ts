import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: "Physiology Cardiovascular System — Capillary Exchange and Permeability",
  modulePath: "104 CPS > Physiology > Cardiovascular System > Vascular Function",
  articleId: "ART-104-PHY-CAPILLARY-EXCHANGE-AND-LYMPHATICS",

  concepts: [
    {
      // Sparse reuse, not a fresh mint: this exact canonical_key already has a
      // hand-authored, pinned record in 104-CPS-physiology-concepts.md
      // (CON-CVS-D3D1AF25EFA406, module_subject "Vascular Function"), found via
      // find-existing.mjs "capillary permeability" before any minting was
      // attempted. Declaring the same key here makes resolveConceptId resolve
      // to that pinned id and emit a sparse reuse row (article_ids/exam_signal
      // only) — every other field below is inert for the build, kept only to
      // satisfy the McqConcept type, and restated close to the pinned record's
      // own wording so a reader is not misled by a diverging copy.
      key: "capillary-exchange.diffusion-permeability-and-vesicular-transport",
      label: "Diffusion is the dominant mechanism of capillary exchange and depends on capillary permeability type and concentration gradient, while vesicular transport carries large lipid-insoluble molecules across the endothelium",
      definition: "Capillaries exchange materials with the interstitial fluid by three mechanisms. Diffusion is quantitatively the most important; its rate depends on capillary permeability, which increases across the sequence continuous (lowest permeability) to fenestrated to discontinuous/sinusoidal (highest permeability), and on the diffusing substance's own concentration gradient and molecular size. Continuous capillaries have a tightly joined, unbroken endothelium and do not let blood cells cross their wall at all; discontinuous (sinusoidal) capillaries have large gaps between endothelial cells and a discontinuous basement membrane, letting blood plasma — and, in organs such as the liver, spleen and bone marrow, even cells — pass freely. Vesicular transport is a separate mechanism carrying large lipid-insoluble molecules such as antibodies, cytokines and protein-bound hormones across endothelial cells.",
      objective: "Rank the three capillary types by permeability (continuous < fenestrated < discontinuous/sinusoidal), and state what continuous capillaries exclude and what sinusoidal capillaries admit.",
      pitfall: "Treating all capillaries as equally permeable, or assuming any capillary lets blood cells cross freely. Continuous capillaries are the least permeable type and block cells outright; only discontinuous (sinusoidal) capillaries, with their large endothelial gaps, let plasma and — in specific organs — cells pass.",
      subject: "cvs",
      primary: "DIS-PHY-T02",
      secondary: [],
      modulePath: "104 CPS > Physiology > Cardiovascular System > Vascular Function",
      type: "mechanism",
      aliases: ["Continuous, fenestrated and discontinuous capillaries", "Mechanisms of capillary exchange", "Capillary permeability"],
    },
    {
      // Sparse reuse, not a fresh mint: this exact canonical_key already has a
      // hand-authored, pinned record in 104-CPS-physiology-concepts.md
      // (CON-CVS-98657F1E7D300D, module_subject "Vascular Function", same
      // article as the concept above), found via find-existing.mjs "Starling
      // forces" / "capillary filtration" before any minting was attempted.
      // Declaring the same key here makes resolveConceptId resolve to the
      // pinned id and emit a sparse reuse row (article_ids/exam_signal only)
      // — every other field below is inert for the build, kept only to
      // satisfy the McqConcept type, and restated close to the pinned
      // record's own wording so a reader is not misled by a diverging copy.
      key: "capillary-exchange.starling-forces-and-trans-capillary-filtration",
      label: "Trans-capillary filtration is set by the Starling forces, and along a muscle capillary this produces net outward filtration at the arteriolar end and net absorption at the venular end",
      definition: "Fluid movement across the capillary wall is set by four opposing Starling forces: capillary hydrostatic pressure and interstitial fluid colloid osmotic pressure both favour filtration (fluid leaving the capillary), while plasma colloid osmotic pressure and interstitial hydrostatic pressure both favour absorption (fluid entering the capillary). Along a typical muscle capillary, capillary hydrostatic pressure is higher at the arteriolar end than at the venular end, so filtration dominates near the arteriolar end and absorption dominates near the venular end, with the two nearly balancing overall — the small excess of filtration over absorption normally drains away as lymph.",
      objective: "Name the four Starling forces and state which two favour filtration and which two favour absorption, write the fluid-movement equation, and state the net direction and magnitude of fluid movement at the arteriolar and venular ends of a muscle capillary.",
      pitfall: "Naming right atrial pressure, cardiac output, or another cardiovascular variable as one of the four Starling forces. The four forces are exactly capillary hydrostatic pressure, interstitial hydrostatic pressure, plasma colloid osmotic pressure and interstitial colloid osmotic pressure — nothing else belongs in the equation.",
      subject: "cvs",
      primary: "DIS-PHY-T02",
      secondary: [],
      modulePath: "104 CPS > Physiology > Cardiovascular System > Vascular Function",
      type: "mechanism",
      aliases: ["Starling forces", "Starling equation", "Trans-capillary filtration", "Net filtration pressure"],
    },
  ],

  questions: [
    {
      key: "regarding-the-blood-vessels-1-74c7dfb7",
      conceptKey: "capillary-exchange.diffusion-permeability-and-vesicular-transport",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "State that blood plasma, not blood cells, can freely cross a sinusoidal (discontinuous) capillary wall, unlike a continuous capillary.",
      explanations: {
        A: "Continuous capillaries are the least permeable type; their tightly joined, unbroken endothelium does not let blood cells cross freely.",
        B: "This reverses the actual boundary: it is the internal elastic lamina that separates the tunica intima from the tunica media, not the tunica adventitia from the media.",
        C: "This also reverses the actual boundary: it is the external elastic lamina that separates the tunica media from the tunica adventitia, not the tunica intima from the media.",
        D: "Discontinuous (sinusoidal) capillaries have large gaps between endothelial cells and a discontinuous basement membrane, letting blood plasma pass freely across the wall — the most permeable capillary type. A common trap: treating all capillaries as equally permeable, or assuming any capillary lets blood cells cross freely.",
      },
    },
    {
      key: "regarding-the-blood-vessels-6a4abd1f",
      conceptKey: "capillary-exchange.diffusion-permeability-and-vesicular-transport",
      difficulty: "Moderate",
      questionType: "Structure and function",
      learningObjective: "State that blood plasma, not blood cells, can freely cross a sinusoidal (discontinuous) capillary wall, unlike a continuous capillary.",
      explanations: {
        A: "Continuous capillaries are the least permeable type; their tightly joined, unbroken endothelium does not let blood cells cross freely.",
        B: "This reverses the actual boundary: it is the internal elastic lamina that separates the tunica intima from the tunica media, not the tunica adventitia from the media.",
        C: "This also reverses the actual boundary: it is the external elastic lamina that separates the tunica media from the tunica adventitia, not the tunica intima from the media.",
        D: "Discontinuous (sinusoidal) capillaries have large gaps between endothelial cells and a discontinuous basement membrane, letting blood plasma pass freely across the wall — the most permeable capillary type. A common trap: treating all capillaries as equally permeable, or assuming any capillary lets blood cells cross freely.",
      },
    },
    {
      key: "starling-forces-of-bulk-flow-include-all-of-the-following-ex-84983327",
      conceptKey: "capillary-exchange.starling-forces-and-trans-capillary-filtration",
      difficulty: "Moderate",
      questionType: "Recall of a false statement",
      learningObjective: "Name capillary hydrostatic pressure, interstitial hydrostatic pressure, plasma colloid osmotic pressure and interstitial colloid osmotic pressure as the four Starling forces, against right atrial pressure as the exception.",
      explanations: {
        A: "Capillary hydrostatic pressure is one of the four genuine Starling forces, driving fluid out of the capillary — true, so not the exception.",
        B: "Interstitial colloid osmotic pressure is one of the four genuine Starling forces, drawing fluid out of the capillary toward the interstitium — true, so not the exception.",
        C: "The exception, and the answer. Right atrial pressure is a distinct cardiovascular parameter, reflecting central venous pressure and cardiac filling — it plays no direct role in the local capillary filtration/absorption balance and is not one of the four Starling forces.",
        D: "Interstitial hydrostatic pressure is one of the four genuine Starling forces, opposing outward filtration — true, so not the exception.",
      },
    },
    {
      key: "an-increase-in-which-of-the-following-tends-to-decrease-capi-b67023fc",
      conceptKey: "capillary-exchange.starling-forces-and-trans-capillary-filtration",
      difficulty: "Moderate",
      questionType: "Mechanism",
      learningObjective: "State that a rise in plasma colloid osmotic pressure, by pulling fluid back into the capillary, is the Starling force that decreases net capillary filtration.",
      explanations: {
        A: "A rise in capillary hydrostatic pressure pushes more fluid out of the capillary, increasing, not decreasing, filtration.",
        B: "Plasma colloid osmotic pressure opposes filtration by drawing fluid back into the capillary; a rise in it therefore decreases net capillary filtration — the correct direction this question tests.",
        C: "A rise in interstitial colloid osmotic pressure draws more fluid out of the capillary toward the interstitium, increasing, not decreasing, filtration.",
        D: "A rise in venous hydrostatic pressure raises capillary hydrostatic pressure upstream, increasing, not decreasing, filtration — this is exactly the mechanism behind the oedema of venous congestion.",
      },
    },
    {
      key: "an-increase-in-which-of-the-following-tends-to-decrease-capi-27b7bb68",
      conceptKey: "capillary-exchange.starling-forces-and-trans-capillary-filtration",
      difficulty: "Moderate",
      questionType: "Mechanism",
      learningObjective: "State that a rise in plasma colloid osmotic pressure decreases net capillary filtration (duplicate occurrence from a different source book).",
      explanations: {
        A: "A rise in capillary hydrostatic pressure — named directly in the question stem as the reference variable this option is measured against — pushes more fluid out of the capillary and so increases, rather than decreases, filtration.",
        B: "Plasma colloid osmotic pressure opposes filtration by drawing fluid back into the capillary; a rise in it therefore decreases net capillary filtration — the correct direction this question tests.",
        C: "A rise in interstitial colloid osmotic pressure draws more fluid out of the capillary toward the interstitium, increasing, not decreasing, filtration.",
        D: "A rise in venous hydrostatic pressure raises capillary hydrostatic pressure upstream, increasing, not decreasing, filtration.",
        E: "Arteriolar dilation raises capillary hydrostatic pressure downstream, increasing, not decreasing, filtration — the same direction as a rise in venous hydrostatic pressure.",
      },
    },
    {
      // Leading-`+` hazard (00-START-HERE §2, confirmed in this module's
      // Organization-of-Respiratory-System cluster too): option D's
      // extracted text is literally "+2 mmHg", a leading "+" on a non-list
      // column that `medical:batch` refuses outright ("this column does not
      // take an append"). No seed-level field exists to rewrite option text
      // (only the answer letter can be overridden via `answerOverride`), so
      // the row cannot be repaired here.
      key: "based-on-the-following-values-the-flow-of-fluid-out-of-the-c-858e5d64",
      conceptKey: "capillary-exchange.starling-forces-and-trans-capillary-filtration",
      difficulty: "Hard",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Option D's extracted text is literally \"+2 mmHg\" — a leading \"+\" on a non-list column, which `medical:batch` refuses outright (\"answer_d starts with '+', but this column does not take an append\"). No seed-level field exists to rewrite option text, only the answer letter via `answerOverride`, so this cannot be repaired at the seed layer.",
    },
    {
      key: "a-patient-has-a-renal-disease-that-produced-albuminuria-whic-ab7780e3",
      conceptKey: "capillary-exchange.starling-forces-and-trans-capillary-filtration",
      difficulty: "Moderate",
      questionType: "Clinical application",
      learningObjective: "Apply the Starling forces to albuminuria: losing plasma protein lowers plasma colloid osmotic pressure, raises net capillary filtration, and so raises lymph flow.",
      explanations: {
        A: "A fall, not a rise, in plasma colloid osmotic pressure is what albuminuria produces directly; interstitial fluid hydrostatic pressure itself tends to rise, not fall, as more fluid is filtered into the interstitium.",
        B: "Capillary hydrostatic pressure is not directly altered by a plasma-protein-losing renal disease; the Starling force albuminuria disturbs is on the osmotic, not the hydrostatic, side of the equation.",
        C: "Losing plasma albumin lowers plasma colloid osmotic pressure, the force that normally opposes filtration — with less opposition, net capillary filtration rises, more fluid enters the interstitium, and lymph flow increases to carry the extra filtrate back to the blood.",
        D: "Albuminuria lowers, not raises, plasma oncotic pressure — protein is being lost from the plasma, not added to it.",
      },
    },
  ],
}
