import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: "Physiology Cardiovascular System — Working Myocyte Action Potential",
  modulePath: "104 CPS > Physiology > Cardiovascular System > Electrical Activity of the Heart",
  // ART-104-PHY-CARDIAC-ACTION-POTENTIAL ("the fast-response, non-pacemaker
  // action potential") is named as a sibling article by both
  // ART-104-PHY-PACEMAKER-ELECTROPHYSIOLOGY and ART-104-PHY-CARDIAC-
  // CONDUCTION's own related_articles fields, and its module_subject is this
  // same leaf, but grepping 104-CPS-physiology-concepts.md for its id as a
  // concept's own article_ids returned no hit at all — no concept has been
  // pinned against it yet. Both concepts below are therefore fresh mints,
  // after find-existing.mjs returned "safe to create" for every search term
  // tried (plateau/L-type calcium, functional syncytium/intercalated discs,
  // excitation-contraction coupling/calcium-induced calcium release).
  articleId: "ART-104-PHY-CARDIAC-ACTION-POTENTIAL",

  concepts: [
    {
      // Fresh mint. find-existing.mjs "L-type calcium plateau cardiac
      // action potential" -> "Safe to create one." Distinct from this
      // module's own pacemaker-potential concepts (CON-CVS-34D3CB7F794801 /
      // CON-CVS-0AD04EE46FD2C5, reused in cardiovascular-pacemaker-
      // electrophysiology.ts): those describe the SLOW-response pacemaker
      // action potential's own phase 4/0/3; this concept describes the
      // FAST-response WORKING myocyte's plateau (phase 2), a different cell
      // type's different phase, which is exactly the contrast article
      // ART-104-PHY-PACEMAKER-ELECTROPHYSIOLOGY's own related_articles note
      // draws.
      key: "cardiac-action-potential.plateau-phase2.calcium-potassium-balance",
      label: "The working cardiac myocyte's action potential plateau (phase 2) is sustained by a balance between inward Ca++ current through L-type calcium channels and outward K+ current, prolonging depolarization well beyond a skeletal muscle fibre's brief spike",
      definition: "After the rapid fast-Na+-channel-driven upstroke (phase 0) of a working atrial or ventricular myocyte's action potential, the membrane does not repolarize immediately as skeletal muscle's does. Instead it plateaus (phase 2) for roughly 200-300 ms, held near 0 mV by a near-balance between a sustained inward Ca++ current — carried by L-type ('long-lasting') Ca++ channels that open during the upstroke and close slowly — and an outward K+ current leaving through the cell's potassium channels. This inward Ca++ current is also the trigger for excitation-contraction coupling: the Ca++ entering through L-type channels triggers a much larger calcium-induced release of Ca++ from the sarcoplasmic reticulum. Only once the L-type Ca++ channels inactivate does the outward K+ current dominate, producing phase 3 repolarization.",
      objective: "State that the plateau (phase 2) of the working myocyte's action potential is maintained by a balance between L-type Ca++ channel influx and K+ efflux, and that this plateau — largely absent from skeletal muscle's action potential — is what gives cardiac muscle both its long action potential duration and its long refractory period.",
      pitfall: "Assuming the cardiac plateau is simply 'a pause' with no ionic current flowing. Two opposing currents are active throughout it — inward Ca++ and outward K+ — and it is their near-balance, not their absence, that holds the membrane potential flat for hundreds of milliseconds.",
      subject: "cvs",
      primary: "DIS-PHY-T02",
      secondary: ["SYS-CVS-T01-S01"],
      modulePath: "104 CPS > Physiology > Cardiovascular System > Electrical Activity of the Heart",
      type: "mechanism",
      aliases: ["Cardiac action potential plateau", "Phase 2", "L-type calcium channels"],
      conflicts: [
        "No conflicting record found; this canonical_key returned 'safe to create' from find-existing.mjs and no concept in 104-CPS-physiology-concepts.md carries ART-104-PHY-CARDIAC-ACTION-POTENTIAL as its own article_ids, so this is a genuine gap in that pre-staged concept file rather than a duplicate.",
      ],
    },
    {
      // Fresh mint. find-existing.mjs "cardiac muscle functional syncytium
      // intercalated discs" -> "Safe to create one."
      key: "cardiac-muscle.functional-syncytium-and-intercalated-discs",
      label: "Cardiac muscle behaves as a functional, not a true, syncytium — individual myocytes stay anatomically separate but are electrically coupled through the low-resistance gap junctions of the intercalated discs",
      definition: "Cardiac muscle fibres are individual cells, each with its own nucleus and plasma membrane, separated from their neighbours by intercalated discs. This distinguishes cardiac muscle from a true syncytium (such as skeletal muscle, formed by fusion of many cells into one multinucleated fibre), even though the tissue behaves electrically as if it were one continuous sheet. The intercalated discs carry gap junctions, whose channels have a very low electrical resistance, letting an action potential spread rapidly from cell to cell almost as though no membrane separated them — this 'functional syncytium' behaviour is what lets the whole atrial mass, and separately the whole ventricular mass, contract together as a single unit following the all-or-none law. Cardiac muscle is also richly supplied with capillaries, with almost one capillary per fibre, matching its continuous, high metabolic demand.",
      objective: "Distinguish a functional syncytium (cardiac muscle: separate cells, low-resistance electrical coupling via intercalated disc gap junctions) from a true syncytium (skeletal muscle: fused into one multinucleated fibre), and state that cardiac muscle obeys the all-or-none law and is densely capillarised.",
      pitfall: "Calling cardiac muscle a 'true syncytium' because it behaves electrically as one unit. Anatomically its cells remain separate, joined only by the electrically-permissive intercalated discs — 'functional', not 'true', is the precise term this distinction turns on.",
      subject: "cvs",
      primary: "DIS-PHY-T02",
      secondary: ["SYS-CVS-T01-S01"],
      modulePath: "104 CPS > Physiology > Cardiovascular System > Electrical Activity of the Heart",
      type: "structural_description",
      aliases: ["Functional syncytium", "Intercalated discs", "All-or-none law (cardiac)"],
    },
  ],

  questions: [
    {
      key: "action-potential-of-the-cardiac-muscle-is-characterized-by-t-b86bd702",
      conceptKey: "cardiac-action-potential.plateau-phase2.calcium-potassium-balance",
      difficulty: "Moderate",
      questionType: "Recall of a mechanism",
      learningObjective: "State that the cardiac action potential's plateau results from a balance between Ca++ influx and K+ efflux, not a fixed duration figure or an inflow of Cl- and outflow of bicarbonate.",
      explanations: {
        A: "The plateau's duration is on the order of 200-300 ms in the ventricular muscle, not as long as 100 m sec would suggest if taken as a minimum — but more importantly, the option describes a duration figure, not the ionic mechanism the plateau itself depends on.",
        B: "Atrial muscle has a shorter action potential (and shorter plateau) than ventricular muscle, not a longer one reaching 300 m sec — this reverses the atrial-versus-ventricular comparison.",
        C: "Correct. The plateau is sustained by a near-balance between inward Ca++ current (through L-type Ca++ channels) and outward K+ current — neither current dominates until the Ca++ channels inactivate, at which point K+ efflux takes over and phase 3 repolarization begins.",
        D: "Cl- and bicarbonate movement are not part of the plateau's ionic basis in this scheme; the plateau is a Ca++-versus-K+ phenomenon, not an anion-exchange one.",
      },
    },
    {
      key: "which-of-the-ion-channels-is-responsible-for-the-inward-curr-7ef01555",
      conceptKey: "cardiac-action-potential.plateau-phase2.calcium-potassium-balance",
      difficulty: "Easy",
      questionType: "Recall of a mechanism",
      learningObjective: "Identify L-type Ca++ channels as the source of the inward current sustaining the cardiac action potential's plateau phase.",
      explanations: {
        A: "Cl- channels are not the plateau's inward current source in this scheme; anion movement is not the mechanism the plateau depends on.",
        B: "K+ channels carry the outward current that opposes and eventually ends the plateau, not the inward current that sustains it.",
        C: "Na+ channels drive the rapid upstroke (phase 0) of the working myocyte's action potential, but they inactivate quickly afterward and are not the plateau's own current source.",
        D: "Correct. L-type ('long-lasting') Ca++ channels open during the upstroke and inactivate slowly, carrying the sustained inward Ca++ current that holds the membrane near 0 mV through the plateau.",
      },
    },
    {
      key: "about-the-cardiac-muscle-all-the-following-are-true-except-a-3657b81f",
      conceptKey: "cardiac-muscle.functional-syncytium-and-intercalated-discs",
      difficulty: "Moderate",
      questionType: "Recall of a false statement",
      learningObjective: "Identify that cardiac muscle forms a FUNCTIONAL, not a true, syncytium as the exception among true statements about cardiac muscle.",
      explanations: {
        A: "True of cardiac muscle, so not the exception: the intercalated discs carry gap junctions with very low electrical resistance, letting an action potential spread almost as freely as if no membrane separated neighbouring cells.",
        B: "The exception, and the answer. Cardiac muscle forms a FUNCTIONAL syncytium, not a true one — its cells remain anatomically separate, each with its own membrane and nucleus, joined only by the electrically low-resistance intercalated discs; a true syncytium (like skeletal muscle) is formed by actual cell fusion into one multinucleated fibre.",
        C: "True of cardiac muscle, so not the exception: because the atrial mass and the ventricular mass each behave as one electrically continuous unit, each contracts as a whole once threshold is reached, following the all-or-none law.",
        D: "True of cardiac muscle, so not the exception: its high, continuous metabolic demand is matched by an especially rich capillary supply, with almost one capillary present for each muscle fibre.",
      },
    },
    {
      // Bank extraction genuinely recovered only 3 options (A/B/C), no D —
      // below the 4-to-5-option contract. This is the only bank row testing
      // calcium-induced calcium release directly, so the fact (L-type Ca++
      // influx triggers a larger SR Ca++ release via ryanodine receptors) is
      // not taught elsewhere in this cluster; recorded as a genuine loss
      // rather than silently dropped.
      key: "which-of-the-following-is-correct-as-regards-excitation-cont-75256009",
      conceptKey: "cardiac-action-potential.plateau-phase2.calcium-potassium-balance",
      difficulty: "Hard",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Bank extraction recovered only 3 options (A/B/C), no D or E — below the platform's 4-to-5-option import contract (medical:batch rejects it outright: '3 options — the contract is 4 to 5'). The tested fact (calcium-induced calcium release: L-type Ca++ influx through the sarcolemma/T-tubules triggers ryanodine-receptor-mediated Ca++ release from the sarcoplasmic reticulum) is correctly keyed (A) but is not taught elsewhere in this cluster, so this is a genuine, not merely duplicate, loss.",
    },
    {
      // OCR page-bleed: the extracted stem merges a graph description with
      // fragments of at least three other numbered exam items ('Idea 33',
      // 'Idea 34', 'Idea 35', 'Idea 36', 'Idea 37' all run together with
      // Arabic-language explanation text). The 4 surviving option letters
      // (A-D) read as belonging to a DIFFERENT question than the visible
      // stem fragment describes, so no single coherent stem-to-options
      // mapping can be recovered without inventing the missing question.
      key: "90-0-100-200-300-400-time-ms-e-correct-opened-e-explanation-cf0d9119",
      conceptKey: "cardiac-action-potential.plateau-phase2.calcium-potassium-balance",
      difficulty: "Hard",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "OCR page-bleed merged a graph description with fragments of at least 5 other numbered exam items (Idea 33-37) into one stem; the surviving 4 options do not correspond to any single legible question in the merged text. Per the ANSWER-KEY GAPS ruling, an unrecoverable stem is excluded rather than guessed at.",
    },
    {
      // Physiologically disputable as extracted: none of the three
      // comparative claims (propagation speed, duration, amplitude) is
      // unambiguously true of skeletal-versus-cardiac action potentials
      // without qualification the stem does not supply — see this leaf's
      // own PROGRESS.md note for the full reasoning. A wrong or
      // ambiguous key is worse than a missing one per the ANSWER-KEY GAPS
      // ruling.
      key: "action-potential-of-skeletal-muscles-differs-from-thatof-car-94c16ea4",
      conceptKey: "cardiac-action-potential.plateau-phase2.calcium-potassium-balance",
      difficulty: "Hard",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "The book's own answer ('E, all of the above') requires all three comparative claims to hold (skeletal AP propagated more slowly, shorter duration, higher amplitude than cardiac), but standard cardiac physiology does not clearly support the propagation-speed and amplitude claims without qualification the stem does not supply (ordinary working myocardium actually conducts more slowly than skeletal muscle, not faster). Excluded rather than taught with an unverifiable comparison.",
    },
    {
      // OCR page-bleed, worse than cf0d9119 above: merges 'Long activation
      // of fast voltage sodium channels' with fragments of two further
      // numbered items ('44', '45') and an unrelated ECG-atrial-fibrillation
      // sentence, all in one stem. The surviving options belong to the
      // 'which wave is absent in a normal ECG' question, a duplicate of
      // this leaf's own less-corrupted row below testing the same fact.
      key: "long-activation-of-fast-voltage-sodium-channels-44-which-of-f5860e77",
      conceptKey: "cardiac-action-potential.plateau-phase2.calcium-potassium-balance",
      difficulty: "Hard",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "OCR page-bleed merged three separate exam items (a phase-4/sodium-channel fragment, a numbered 'which wave is absent' question, and a numbered 'which is correct about ECG recording' question) into one stem. The recoverable fact (which ECG wave is absent in a normal tracing) is a corrupted duplicate of this same bank's own row `which-of-the-following-has-absent-wave-in-recorded-normal-ec-bfb3d84b`, itself excluded below for the same reason (see cardiovascular-ecg-basics.ts) — no teaching content is uniquely lost.",
    },
    {
      // Stem/option mismatch: the stem asks for the NAME of a property
      // ("this property is called: ___"), but the option set names a
      // structure (Purkinje fibers) and a channel-flux description
      // alongside two real property names (excitability, conductivity) —
      // none of which is the property actually being described
      // (myogenic rhythmicity/automaticity). Likely a further OCR bleed
      // with an adjacent Purkinje-fibre question's own option list.
      key: "the-heart-continues-to-beat-even-after-all-nerves-to-it-are-86de2bf4",
      conceptKey: "cardiac-muscle.functional-syncytium-and-intercalated-discs",
      difficulty: "Hard",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Stem asks for a property NAME ('this property is called: ___') but the surviving options are a mix of unrelated property names (excitability, conductivity), a structure name (Purkinje fibers) and a channel-flux description (potassium efflux) — none of which grammatically or substantively answers what the stem asks (the correct term, myogenic rhythmicity/automaticity, is not among the options at all). Consistent with this leaf's other OCR-bleed exclusions rather than a genuinely answerable row.",
    },
  ],
}
