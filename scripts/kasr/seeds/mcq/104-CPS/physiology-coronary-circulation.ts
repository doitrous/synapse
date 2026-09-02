import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: "Physiology Cardiovascular System — Special Circulation (Coronary)",
  modulePath: "104 CPS > Physiology > Cardiovascular System > Special Circulation",
  articleId: "ART-104-PHY-CORONARY-AND-PULMONARY-CIRCULATION",

  concepts: [
    // Sparse reuse, not a fresh mint: find-existing.mjs "coronary flow" /
    // "myocardium" surfaced a hand-authored, pinned record
    // (CON-CVS-B29600F656A34B, canonical_key coronary-circulation.phasic-
    // flow-and-autoregulation, module_subject "104 CPS > Physiology >
    // Cardiovascular System > Special Circulation" — this exact leaf)
    // already sitting in docs/Kasr-Source-Imports/concept/104-CPS-
    // physiology-concepts.md, pinned to this same live article. Declaring
    // the same canonical_key here resolves to that pinned id and emits a
    // sparse reuse row — every other field below is inert for the build,
    // kept only to satisfy the McqConcept type, and restated close to the
    // pinned record's own wording so a reader is not misled by a diverging
    // copy.
    {
      key: "coronary-circulation.phasic-flow-and-autoregulation",
      label: "Coronary blood flow falls to a minimum during systole because ventricular contraction compresses the vessels within the wall, and is matched to myocardial O2 demand mainly by metabolic autoregulation since the myocardium already extracts 70-80% of delivered oxygen at rest",
      definition: "Resting coronary flow (about 84 ml/100 g/min, 250 ml/min for the whole heart) can rise to about 400 ml/100 g/min. Because the myocardium already extracts 70-80% of the O2 delivered to it at rest, a rise in O2 demand cannot be met mostly by extracting more O2 and must instead be met by raising coronary flow. Flow is not constant through the cycle: ventricular contraction compresses the intramural coronary vessels, driving flow to a minimum during systole (hardest on the subendocardium, which is why it is most vulnerable to ischaemia) and letting it peak in early diastole before falling passively with aortic pressure. Flow is regulated primarily by metabolic autoregulation (vasodilator metabolites such as adenosine, CO2, H+ and prostaglandins, released as myocardial metabolism rises) — not primarily by neural control — alongside a myogenic autoregulatory component and endothelial substances.",
      objective: "Explain why coronary flow is lowest in systole and peaks in early diastole, why the subendocardium is especially vulnerable to ischaemia, and why local metabolic autoregulation, not neural control, is the dominant regulator of coronary flow.",
      pitfall: "Assuming coronary blood flow is highest during systole, as it is for most organs during their own most active phase. The opposite is true: ventricular contraction compresses the coronary vessels running through the wall, so flow is lowest during systole and peaks in early diastole.",
      subject: "cvs",
      primary: "DIS-PHY-T02",
      secondary: ["SYS-CVS-T01-S01"],
      modulePath: "104 CPS > Physiology > Cardiovascular System > Special Circulation",
      type: "mechanism",
      aliases: ["Phasic coronary flow", "Subendocardial vulnerability to ischaemia"],
    },
  ],

  questions: [
    // Bank-tagged "The heart" — a leaf-mismatch reroute onto this leaf's own
    // already-claimed coronary-circulation concept; same content, no new
    // search needed.
    {
      key: "the-left-coronary-flow-e45593b5",
      conceptKey: "coronary-circulation.phasic-flow-and-autoregulation",
      difficulty: "Moderate",
      questionType: "Mechanism",
      learningObjective: "State that left coronary flow peaks in early diastole because systolic ventricular contraction compresses the intramural coronary vessels.",
      explanations: {
        A: "Coronary blood flow is tightly coupled to myocardial oxygen demand via local metabolic regulation — the opposite of being independent of it.",
        B: "Left and right coronary flow differ in their pattern across the cardiac cycle: left flow is markedly diastole-dominant because of systolic compression, while right flow — facing much lower right-ventricular pressures — is more evenly distributed across the cycle, so the two are not simply 'the same.'",
        C: "Left coronary flow is actually lowest, not highest, during early systole: the powerful contraction of the left ventricular myocardium compresses the intramural coronary vessels running through it, squeezing the very vessels trying to supply it.",
        D: "Left coronary flow peaks in early diastole, when the myocardium relaxes and releases the compressive force systole placed on the intramural coronary vessels, letting blood flow freely into the coronary bed. This systolic-compression effect is much less pronounced on the right, since right ventricular pressures are far lower — a distinguishing feature to pair with 'left coronary flow.'",
      },
    },
    // Special Circulation's own bank-tagged row (this leaf's 1 remaining row
    // before this session) — same concept, a fuller comprehensive-answer
    // item combining the diastole-dominance fact above with subendocardial
    // vulnerability and metabolic-over-neural regulation.
    {
      key: "which-of-the-following-is-correct-0954638f",
      conceptKey: "coronary-circulation.phasic-flow-and-autoregulation",
      difficulty: "Hard",
      questionType: "Comprehensive true/false combination",
      learningObjective: "Identify that the heart receives most of its coronary supply during diastole AND that the subendocardium suffers a proportionally greater fall in flow during systole than the subepicardium, while rejecting neural control as coronary circulation's main regulator.",
      explanations: {
        A: "True on its own: the heart genuinely receives most of its coronary blood supply during diastole, since systolic ventricular contraction compresses the intramural coronary vessels (especially in the left ventricle) and impedes flow until the muscle relaxes. Combined with statement C, this makes E the correct comprehensive answer.",
        B: "False. Coronary circulation is regulated predominantly by local metabolic factors — adenosine, hypoxia, CO2 and other vasoactive metabolites released as myocardial metabolism rises — matching flow tightly to myocardial oxygen demand, not primarily by neural control.",
        C: "True on its own: during systole, the subendocardium — the innermost, most heavily compressed layer of myocardium — suffers a proportionally greater percentage fall in blood flow than the more protected subepicardium, which is exactly why the subendocardium is especially vulnerable to ischaemia under increased demand or reduced perfusion pressure.",
        D: "Since statement B is false, the combination 'B and C' cannot be the correct comprehensive answer.",
        E: "Both A and C are independently true — the heart is diastole-supplied overall, and the subendocardium is disproportionately compressed during systole specifically — making 'A and C' the correct, complete answer.",
      },
    },
  ],
}
