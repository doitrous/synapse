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
  ],
}
