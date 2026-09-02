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
    // run44 — a leaf-mismatch reroute: bank-tagged "Basic Mechanisms of
    // Circulatory Control" (its ledger leaf tag is known unreliable, see
    // that module's own coverage/104-CPS-LEDGER.md note), but the fact it
    // tests — coronary vessels' dual α1/β1 innervation and net sympathetic
    // effect — belongs to this leaf's own pinned article, not the
    // chemoreceptor-control article the bank tag would imply. Grounded
    // directly against the department book p.94 (src_a11a7faed67c95e2d636).
    // find-existing.mjs "coronary sympathetic beta blocker" — 0 hits, fresh
    // mint.
    {
      key: "coronary-circulation.sympathetic-regulation-and-beta-blockade",
      label: "Coronary vessels carry both α1 (vasoconstrictor) and β1 (vasodilator) adrenergic receptors, and sympathetic stimulation's net effect is vasodilation because the rise in heart rate and contractility it also produces releases vasodilator metabolites that reinforce the direct β1 effect",
      definition: "Coronary vessels contain both α and β adrenergic receptors: α1 receptor stimulation causes vasoconstriction, while β1 receptor stimulation causes vasodilation. Sympathetic stimulation of the heart also raises heart rate and contractility, which raises myocardial metabolic rate and so releases vasodilator metabolites (adenosine, CO2, H+, prostaglandins) — the dominant, metabolic-autoregulation route to coronary vasodilation this leaf's own phasic-flow concept already establishes. Because that indirect metabolic vasodilator effect reinforces the direct β1 vasodilator effect, the overall, net effect of sympathetic stimulation on coronary vessels is vasodilation and increased coronary blood flow, even though a direct α1 vasoconstrictor pathway also exists. Parasympathetic stimulation, by contrast, produces only slight direct coronary vasodilation via cholinergic receptors, but net coronary vasoconstriction indirectly, because vagally-driven bradycardia lowers cardiac metabolism and so removes the metabolic vasodilator drive.",
      objective: "State that coronary vessels carry both α1 (constrictor) and β1 (dilator) receptors, and that the net effect of intact sympathetic stimulation is vasodilation because the β1-driven rise in myocardial metabolism reinforces direct β1 vasodilation through the dominant metabolic-autoregulation pathway.",
      pitfall: "Assuming sympathetic stimulation of the heart must net vasoconstrict the coronaries because α1 receptors are present. The book's own account is that the net effect is vasodilation, since the metabolic drive from increased heart rate/contractility (via β1) dominates; removing β1 (as with a β-blocker) removes both the direct β1 vasodilator effect and this metabolic reinforcement, leaving the direct α1 constrictor effect roughly balanced by an unchanged metabolic demand — a subtly different question from intact, unblocked sympathetic stimulation.",
      subject: "cvs",
      primary: "DIS-PHY-T02",
      secondary: [],
      modulePath: "104 CPS > Physiology > Cardiovascular System > Special Circulation",
      type: "mechanism",
      aliases: ["Coronary adrenergic receptors", "Sympathetic effect on coronary flow"],
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
    // run44 — leaf-mismatch reroute onto this leaf's own newly-mounted
    // sympathetic-regulation concept above (bank-tagged "Basic Mechanisms
    // of Circulatory Control", but the fact it tests belongs here — see
    // that concept's own comment). Excluded rather than authored: only 3
    // options survive extraction (A, B, C — no D), below the platform's
    // 4-to-5-option import contract; not padded with an invented fourth
    // option.
    {
      key: "it-the-noradrenergic-nerves-to-the-heart-are-stimulated-afte-65f9cb1e",
      conceptKey: "coronary-circulation.sympathetic-regulation-and-beta-blockade",
      difficulty: "Hard",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Only 3 options survive extraction (A, B, C — no D), below the platform's 4-to-5-option import contract. The examiner's answer (C, 'No change') is physiologically well-grounded — metabolic autoregulation dominates coronary flow, and blocking β1 removes both the direct β1 vasodilator effect and the indirect vasodilator-metabolite pathway, leaving flow essentially unchanged — but a genuine fourth distractor is not attested anywhere in the source and inventing one would be padding, which the platform's import contract and this lane's own rules forbid.",
    },
    // kasr-104-author-run46: this leaf's own remaining bank row (ledger's
    // second Special Circulation batch, leaf=null in the raw bank so
    // missed by a naive per-leaf scan). Sparse reuse of this file's own
    // phasic-flow-and-autoregulation concept — no printed key
    // (answerConfidence: external-solved-book-recovered), verified against
    // this leaf's own concept text before authoring.
    {
      key: "the-coronary-blood-flow-0e0b7a15",
      conceptKey: "coronary-circulation.phasic-flow-and-autoregulation",
      difficulty: "Moderate",
      questionType: "Single best answer",
      learningObjective: "State that coronary blood flow is autoregulated primarily by local metabolic factors, and that it falls (not rises) in the subendocardium during systole and is decreased, not increased, by adenosine.",
      explanations: {
        A: "Correct. This leaf's own concept states coronary flow is regulated primarily by metabolic autoregulation (vasodilator metabolites such as adenosine, CO2, H+ and prostaglandins), not primarily by neural control — the flow is autoregulated to match myocardial O2 demand.",
        B: "Reversed. Ventricular contraction compresses the intramural coronary vessels, driving flow to a MINIMUM during systole — hardest on the subendocardium specifically, which is exactly why it is most vulnerable to ischaemia — not an increase.",
        C: "Reversed. Adenosine is one of the vasodilator metabolites this leaf's own concept names as driving metabolic autoregulation — it INCREASES coronary flow by dilating coronary vessels as myocardial metabolism rises, not decreases it.",
        D: "Reversed, same error as B applied to the left ventricle specifically: coronary flow to the left ventricle falls, not rises, during systole, because ventricular contraction compresses the intramural vessels supplying it.",
      },
      answerOverride: "A",
      answerOverrideReason: "No printed key exists (answerConfidence: external-solved-book-recovered, sourced from a different solved question book rather than this bank's own printed answer). Re-verified directly against this leaf's own sourced concept (coronary-circulation.phasic-flow-and-autoregulation): flow is regulated primarily by metabolic autoregulation, falls to a minimum during systole (hardest on the subendocardium), and adenosine is a vasodilator metabolite that raises, not lowers, flow — confirming A and ruling out B, C and D independently.",
    },
  ],
}
