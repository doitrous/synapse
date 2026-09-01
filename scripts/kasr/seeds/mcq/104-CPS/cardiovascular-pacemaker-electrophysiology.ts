import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: "Physiology Cardiovascular System — Pacemaker Electrophysiology",
  modulePath: "104 CPS > Physiology > Cardiovascular System > Electrical Activity of the Heart",
  // ART-104-PHY-PACEMAKER-ELECTROPHYSIOLOGY ("Ionic pumps and pacemaker
  // electrophysiology of the heart") is a Draft article already staged in
  // docs/Kasr-Source-Imports/article/104-CPS-physiology.md whose own
  // module_subject is "104 CPS > Physiology > Cardiovascular System >
  // Electrical Activity of the Heart" — an exact match for this leaf, and it
  // already carries evidence (department book pp.2-8, src_a11a7faed67c95e2d636).
  articleId: "ART-104-PHY-PACEMAKER-ELECTROPHYSIOLOGY",

  concepts: [
    {
      // Sparse reuse, not a fresh mint: canonical_key already pinned in
      // 104-CPS-physiology-concepts.md (CON-CVS-34D3CB7F794801, module_subject
      // "Electrical Activity of the Heart", article_ids ART-104-PHY-PACEMAKER-
      // ELECTROPHYSIOLOGY) — found by grepping that concept file for this
      // leaf's article id before minting anything (existingConceptIds() for
      // module "104 CPS" scans docs/Kasr-Source-Imports/concept/104-CPS-*.md
      // directly, so this record IS visible to the build). Declaring the same
      // key here resolves to CON-CVS-34D3CB7F794801 and emits a sparse
      // update; every other field is inert for the build, restated close to
      // the pinned record's own wording.
      key: "sa-node-pacemaker-potential.phase-4.ionic-basis",
      label: "The pacemaker potential's phase 4 is a spontaneous depolarization carried by the funny current, T-type calcium channels and the sodium-calcium exchanger, unlike the stable phase 4 of working atrial and ventricular myocytes",
      definition: "Phase 4 of the pacemaker action potential, also called the pre-potential, is a spontaneous gradual depolarization that begins at about -60 mV and is unique to pacemaker cells (the SA node, AV node and Purkinje fibres). Two currents drive it in sequence. First, from about -60 mV to -40 mV, Na+ funny channels activate and carry an inward Na+ current called the funny current (If), while the Na+-Ca++ exchanger — activated by a spontaneous release of Ca++ from the sarcoplasmic reticulum early in phase 4 — carries a further inward Na+ current. Second, from about -50 mV to -40 mV, transient (T-type) Ca++ channels activate and add an inward Ca++ current; they are called transient because they inactivate rapidly after opening. This is the fundamental contrast with a working atrial or ventricular myocyte, whose own phase 4 is simply the stable resting membrane potential, held flat by a slow outward K+ leak, until current arrives from an adjacent active cell.",
      objective: "Describe the two sequential inward currents that produce phase 4 of the pacemaker action potential (the funny current plus the Na+-Ca++ exchanger, then the T-type calcium current), and state why the funny channel is called a hyperpolarization-activated, cyclic-nucleotide-regulated channel.",
      pitfall: "Assuming every cardiac cell has a spontaneously depolarizing phase 4. Only specialised pacemaker tissue (SA node, AV node, Purkinje fibres) does; ordinary atrial and ventricular myocytes have a flat, stable phase 4 and depolarize only when current arrives from a neighbouring cell.",
      subject: "cvs",
      primary: "DIS-PHY-T02",
      secondary: ["SYS-CVS-T01-S01"],
      modulePath: "104 CPS > Physiology > Cardiovascular System > Electrical Activity of the Heart",
      type: "mechanism",
      aliases: ["Funny current (If)", "Pre-potential", "Diastolic depolarization"],
    },
    {
      // Sparse reuse: CON-CVS-0AD04EE46FD2C5, canonical_key already pinned in
      // 104-CPS-physiology-concepts.md, same article/module_subject as above.
      key: "sa-node-pacemaker-potential.phase-0-and-3.ionic-basis",
      label: "Phase 0 of the pacemaker action potential is a slow upstroke through L-type calcium channels, which is why it is called the slow response action potential, and phase 3 is repolarization through delayed rectifier potassium channels",
      definition: "Phase 0 of the pacemaker action potential begins at the firing level, about -40 mV, once phase 4 has depolarized the cell that far. It is produced by activation of long-lasting (L-type) Ca++ channels, together with inactivation of the Na+ funny channels and T-type Ca++ channels that drove phase 4. Because Ca++ movement through channels is not rapid, the slope of phase 0 is slower in pacemaker cells than in working myocytes, which is why the pacemaker action potential is called the 'slow response action potential.' Phase 3 is the repolarization that follows, continuing until about -60 mV; it is produced by an outward K+ current through delayed rectifying K+ channels, together with inactivation of the L-type Ca++ channels. At -60 mV the outward K+ current itself inactivates and a new phase 4 begins, so the cycle repeats spontaneously.",
      objective: "State the ionic basis of phase 0 (L-type Ca++ channel activation) and phase 3 (delayed rectifier K+ efflux) of the pacemaker action potential, and explain why the pacemaker upstroke is called the slow response action potential.",
      pitfall: "Assuming the pacemaker action potential's upstroke uses the fast Na+ channels a working myocyte's does. The pacemaker upstroke is carried by L-type Ca++ channels, which open more slowly than fast Na+ channels — that is precisely why it is the 'slow response' action potential, and delayed rectifier K+ channels (not fast Na+ inactivation) are what end it in phase 3.",
      subject: "cvs",
      primary: "DIS-PHY-T02",
      secondary: ["SYS-CVS-T01-S01"],
      modulePath: "104 CPS > Physiology > Cardiovascular System > Electrical Activity of the Heart",
      type: "mechanism",
      aliases: ["Slow response action potential", "Pacemaker upstroke", "Delayed rectifier K+ channels"],
    },
    {
      // Sparse reuse: CON-CVS-802E52B82883CD, canonical_key already pinned in
      // 104-CPS-physiology-concepts.md, same article/module_subject as above.
      key: "cardiac-pacemaker-hierarchy.intrinsic-rates.sa-av-purkinje",
      label: "The SA node discharges faster than the AV node and Purkinje fibres, so it normally suppresses them, and a slower tissue only takes over as an escape pacemaker if the faster one above it fails",
      definition: "The three pacemaker tissues of the heart discharge at different intrinsic rates: the SA node at about 90-105/min, the AV node at about 60/min, and Purkinje cells at about 20-40/min. Because the SA node is faster than every other pacemaker tissue, it suppresses them and acts as the heart's normal pacemaker — the rate at which it fires, not any anatomical feature, is what makes it the pacemaker. Ordinary working ventricular muscle, unlike the SA node, AV node and Purkinje fibres, has essentially no spontaneous phase 4 automaticity of its own under normal conditions, so it is not part of this rate-ranked hierarchy at all. The hierarchy also functions as a safety net: if the SA node fails, the AV node takes over as an escape pacemaker; if the AV node also fails, the Purkinje cells take over, each tier slower than the one above it.",
      objective: "Give the approximate intrinsic discharge rates of the SA node, AV node and Purkinje fibres, explain why the SA node is normally the heart's pacemaker, and state what happens if it, or the AV node, fails.",
      pitfall: "Thinking the AV node or Purkinje fibres cannot initiate a heartbeat on their own, or ranking ordinary ventricular muscle inside the pacemaker-rate hierarchy. Both specialised tissues can pace the heart as escape pacemakers; ordinary ventricular muscle, lacking spontaneous automaticity of its own, is not a comparable rhythmic tissue at all.",
      subject: "cvs",
      primary: "DIS-PHY-T02",
      secondary: ["SYS-CVS-T01-S01"],
      modulePath: "104 CPS > Physiology > Cardiovascular System > Electrical Activity of the Heart",
      type: "mechanism",
      aliases: ["Escape pacemaker", "SA node dominance", "Pacemaker rate hierarchy", "Rhythmicity"],
    },
    {
      // Sparse reuse: CON-CVS-7A8A04F61D44D1, canonical_key already pinned in
      // 104-CPS-physiology-concepts.md, same article/module_subject as above.
      // Gap: the pinned record's own `evidence_gaps`/definition covers the
      // three SARCOLEMMAL transporters (Na-K ATPase, sarcolemmal Ca-ATPase,
      // Na-Ca exchanger) but not the sarco/endoplasmic reticulum Ca-ATPase
      // (SERCA) that this leaf's own relaxation question needs — SERCA is the
      // majority route (~70%) for removing cytosolic Ca++ at relaxation, and
      // is not named anywhere in this concept's original_wording. Recorded
      // as a gap rather than silently assumed; the question's own
      // explanations supply the SERCA-specific teaching this concept does not.
      key: "cardiac-sarcolemma.ionic-pumps-exchangers.resting-gradient-maintenance",
      label: "The Na+-K+ ATPase, the Ca++-ATPase and the Na+-Ca++ exchanger maintain cardiac myocyte ionic gradients, and the exchanger can reverse direction",
      definition: "Every action potential lets Na+ and Ca++ leak into the cardiac myocyte and K+ leak out; left uncorrected this would run down the gradients the resting membrane potential depends on. Three sarcolemmal transport proteins correct this. The Na+-K+ ATPase pumps 3 Na+ out for every 2 K+ it pumps in, an unequal, electrogenic exchange. A separate sarcolemmal Ca++-ATPase pumps Ca++ out of the myocyte. The Na+-Ca++ exchanger normally exchanges 3 Na+ in for 1 Ca++ out, but reverses — moving Na+ out and Ca++ in instead — whenever intracellular Na+ rises, as when digitalis inhibits the Na+-K+ ATPase.",
      objective: "Name the three sarcolemmal transporters that restore cardiac ionic gradients after each action potential, and state the condition under which the Na+-Ca++ exchanger reverses direction.",
      pitfall: "Treating the Na+-Ca++ exchanger as a one-way Ca++ exit pump. Its direction is set by the prevailing ionic gradients, not fixed — reversal is exactly the mechanism by which a rise in intracellular Na+, such as from digitalis, raises intracellular Ca++.",
      subject: "cvs",
      primary: "DIS-PHY-T02",
      secondary: ["SYS-CVS-T01-S01"],
      modulePath: "104 CPS > Physiology > Cardiovascular System > Electrical Activity of the Heart",
      type: "mechanism",
      aliases: ["Cardiac sarcolemmal ion pumps", "Na-Ca exchanger reversibility", "Electrogenic Na-K ATPase"],
      gaps: [
        "This record's own original_wording (department book pp.2-3) names only the sarcolemmal Na-K ATPase, sarcolemmal Ca-ATPase and Na-Ca exchanger. It does not name the sarco/endoplasmic reticulum Ca-ATPase (SERCA), which most physiology texts treat as the majority (about 70%) route for removing cytosolic Ca++ during relaxation, with the sarcolemmal Ca-ATPase and Na-Ca exchanger handling the remainder. This leaf's own relaxation question needs that fact; flagged here rather than silently assumed into this concept's own definition.",
      ],
    },
  ],

  questions: [
    {
      // The bank extraction genuinely never recovered a 4th option for this
      // row (only A/B/C survive) — medical:batch's own contract requires 4-5
      // options per question, and this branch's established practice (see
      // PROGRESS.md, run29's `in-the-whole-intact-heart-bef9de81`) is to
      // exclude rather than invent an option from nothing. Its own teaching
      // point is not lost: the sibling row `...-e735e414` below asks the
      // identical fact with a complete 4-option set.
      key: "in-the-sinoatrial-sa-node-phase-4-depolarization-pacemaker-p-51bb7e46",
      conceptKey: "sa-node-pacemaker-potential.phase-4.ionic-basis",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Bank extraction recovered only 3 options (A/B/C), no D or E — below the platform's 4-to-5-option import contract (medical:batch rejects it outright: '3 options — the contract is 4 to 5'). The identical fact is already fully tested by the 4-option sibling row `in-the-sinoatrial-sa-node-phase-4-depolarization-pacemaker-p-e735e414` above, so no teaching content is lost by excluding this corrupted duplicate.",
    },
    {
      key: "in-the-sinoatrial-sa-node-phase-4-depolarization-pacemaker-p-e735e414",
      conceptKey: "sa-node-pacemaker-potential.phase-4.ionic-basis",
      difficulty: "Moderate",
      questionType: "Recall of a mechanism",
      learningObjective: "State that phase 4 depolarization (the pacemaker potential) of the SA node is attributable to a rising Na+ conductance, not a change in K+, Cl- or Ca++ conductance.",
      explanations: {
        A: "The opposite of what drives phase 4. A rising K+ conductance would hold the membrane closer to the K+ equilibrium potential and oppose depolarization — that describes a working myocyte's flat resting phase 4, not the SA node's spontaneously depolarizing one.",
        B: "Correct. Phase 4 depolarization begins with an increase in Na+ conductance as the funny channels open (the funny current, If), joined shortly after by the Na+-Ca++ exchanger's own inward Na+ current, carrying the membrane from about -60 mV toward the firing level.",
        C: "Cl- conductance plays no role in this leaf's account of the pacemaker potential's ionic basis, and a decrease in it would not supply the steady inward current phase 4 needs.",
        D: "Backwards. Phase 4 needs an inward Ca++-related current late on (via the T-type channels and the Na+-Ca++ exchanger), not a decreased Ca++ conductance — a decrease would remove, not add, depolarizing current.",
      },
    },
    {
      key: "which-of-the-following-phases-shows-the-opening-of-na-funny-a75f2e1d",
      conceptKey: "sa-node-pacemaker-potential.phase-4.ionic-basis",
      difficulty: "Easy",
      questionType: "Recall of a phase-current pairing",
      learningObjective: "Identify phase 4 as the phase in which Na+ funny channels open, as opposed to phases 0, 2 or 3.",
      explanations: {
        A: "Phase 0 is the rapid (for a pacemaker cell) upstroke, carried by L-type Ca++ channels, not the funny channels — by phase 0 the funny channels have already inactivated.",
        B: "There is no plateau phase in the pacemaker action potential's three-phase scheme (4, 0, 3); phase 2 is a working-myocyte feature, unrelated to the funny channels.",
        C: "Phase 3 is repolarization, carried by delayed rectifier K+ channels — the funny channels are not open at this point in the cycle.",
        D: "Correct. Phase 4, the pacemaker's pre-potential, begins with the funny channels opening from about -60 mV to -40 mV, carrying the inward Na+ current (If) that starts the spontaneous depolarization.",
      },
    },
    {
      key: "why-the-na-funny-channels-are-called-hyperpolarization-activ-e6ee2d77",
      conceptKey: "sa-node-pacemaker-potential.phase-4.ionic-basis",
      difficulty: "Moderate",
      questionType: "Recall of a definition",
      learningObjective: "State both reasons the funny channel is named a 'hyperpolarization-activated, cyclic nucleotide-regulated' (HCN) channel: it opens on hyperpolarization and its gating is modulated by intracellular cAMP.",
      explanations: {
        A: "True, but only half the name's justification on its own — the funny channel does activate as the membrane hyperpolarizes toward phase 4's starting voltage, which is the 'hyperpolarization-activated' half of the name.",
        B: "Also true on its own, but only the other half: intracellular cAMP (raised by sympathetic β1-receptor activity, lowered by parasympathetic activity) tunes how quickly the funny current activates, which is the 'cyclic nucleotide-regulated' half of the name.",
        C: "Not what gives the channel its name, and not accurate as stated — the funny current does not itself depolarize the pacemaker cell all the way to +30 mV; that overshoot is produced later, by phase 0's L-type Ca++ current.",
        D: "Correct. The name captures both true properties at once: the channel activates on hyperpolarization (A) and its activity is regulated by cyclic nucleotides such as cAMP (B) — neither alone is the full definition, which is exactly why the name has both halves.",
      },
    },
    {
      key: "which-of-the-following-phases-shows-opening-of-delayed-recti-c2a9578e",
      conceptKey: "sa-node-pacemaker-potential.phase-0-and-3.ionic-basis",
      difficulty: "Easy",
      questionType: "Recall of a phase-current pairing",
      learningObjective: "Identify phase 3 as the phase in which delayed rectifying K+ channels open and K+ conductance increases, repolarizing the cell.",
      explanations: {
        A: "Phase 0 is the upstroke, carried by inward current through L-type Ca++ channels, not by K+ efflux.",
        B: "There is no phase 2 (plateau) in the three-phase pacemaker scheme; delayed rectifier K+ channels are not what defines this phase here.",
        C: "Correct. Phase 3 is repolarization: delayed rectifying K+ channels open, increasing K+ conductance and driving an outward K+ current that returns the membrane to about -60 mV, alongside inactivation of the L-type Ca++ channels.",
        D: "Phase 4 is the spontaneous depolarization that follows repolarization, driven by the funny current and T-type Ca++ channels, not by delayed rectifier K+ channels, which have themselves inactivated by this point.",
      },
    },
    {
      key: "the-sa-node-is-the-normal-pacemaker-because-of-its-91d75bcd",
      conceptKey: "cardiac-pacemaker-hierarchy.intrinsic-rates.sa-av-purkinje",
      difficulty: "Easy",
      questionType: "Recall of a mechanism",
      learningObjective: "State that the SA node is the normal pacemaker because its intrinsic rate of impulse discharge (about 90-105/min) is faster than every other pacemaker tissue, which lets it suppress them.",
      explanations: {
        A: "Correct. The SA node fires faster than the AV node (about 60/min) and the Purkinje fibres (about 20-40/min); because it reaches threshold and discharges first every cycle, it drives the whole heart and suppresses the slower tissues below it — sheer rate, not any other property, is what makes it the pacemaker.",
        B: "Location alone does not make a tissue the pacemaker — the AV node and Purkinje fibres are also anatomically fixed conduction-system structures, yet neither controls the normal rhythm; only the SA node's superior discharge rate does that.",
        C: "The SA node does receive autonomic innervation (which modulates its rate), but neural control is not what makes it the pacemaker in the first place — an artificial or denervated SA node with a faster intrinsic rate than the AV node and Purkinje fibres would still dominate them.",
        D: "All conduction-system tissue is specialised cardiac muscle; the SA node's muscular structure is not distinct in a way that explains its dominance — its faster discharge rate is the actual reason.",
      },
    },
    {
      key: "wnicn-character-of-the-san-makes-it-the-normal-heart-s-pacem-4a072f34",
      conceptKey: "cardiac-pacemaker-hierarchy.intrinsic-rates.sa-av-purkinje",
      difficulty: "Easy",
      questionType: "Recall of a mechanism",
      learningObjective: "Identify the SA node's fastest intrinsic auto-rhythmicity, not its innervation, location or K+-channel kinetics, as the reason it is the normal pacemaker.",
      explanations: {
        A: "Correct. The SA node discharges at about 90-105/min, faster than the AV node (about 60/min) or the Purkinje fibres (about 20-40/min); firing first every cycle is what lets it suppress the other pacemaker tissues and set the heart's rhythm.",
        B: "The AV node and Purkinje fibres also receive autonomic innervation, so dual innervation alone does not distinguish the SA node or explain its dominance — its faster intrinsic rate does.",
        C: "Location in the right atrium is a fixed anatomical fact about the SA node, but location by itself does not make a tissue the pacemaker — the AV node's location in the interatrial septum does not make it dominant either; discharge rate is what decides which tissue leads.",
        D: "Not the mechanism this leaf's evidence describes; the SA node's dominance is attributed to its faster overall discharge rate, not to a claimed difference in how quickly its K+ channels activate relative to other pacemaker tissue.",
      },
    },
    {
      key: "the-cardiac-tissue-with-the-slowest-rhythmicity-is-the-fd5ed32b",
      conceptKey: "cardiac-pacemaker-hierarchy.intrinsic-rates.sa-av-purkinje",
      difficulty: "Hard",
      questionType: "Discrimination among near-miss options",
      learningObjective: "Rank the pacemaker hierarchy's intrinsic rates (SA node fastest, then AV node, then Purkinje fibres slowest) and recognise that ordinary ventricular muscle — lacking spontaneous automaticity of its own — is not a comparable rhythmic tissue at all.",
      explanations: {
        A: "The SA node without vagal tone would fire even faster than its usual 90-105/min (since resting vagal tone normally slows it), making it the fastest tissue here, not the slowest.",
        B: "The SA node with vagal tone is slowed toward the resting heart rate of about 72/min, but it is still driven by the fastest pacemaker tissue in the hierarchy — well above the AV node's own intrinsic rate.",
        C: "A common trap: ordinary ventricular muscle has essentially no spontaneous phase 4 automaticity under normal conditions at all, so it is not a slow-rhythmicity tissue — it is not a rhythmic (self-exciting) tissue in the first place, and 'slowest rhythmicity' can only rank tissues that actually show rhythmicity.",
        D: "Correct. Among the tissues that do show spontaneous automaticity — SA node, AV node, Purkinje fibres — the AV node (about 60/min) is slower than the SA node but faster than the Purkinje fibres; the question's own option set contrasts it against non-rhythmic ventricular muscle rather than against Purkinje fibres, and the AV node is the slowest of the choices that genuinely paces.",
      },
    },
    {
      // Same 3-option contract failure as the row above (bank extraction
      // recovered only A/B/C, no D). Unlike that row, this fact (SERCA as
      // the majority relaxation pathway) has no complete-option sibling
      // elsewhere in this leaf, so excluding it does lose a teaching point —
      // recorded rather than silently dropped, per this branch's own
      // documented policy that a corrupted-option-count row is excluded, not
      // patched with an invented 4th distractor.
      key: "relaxation-asaction-potential-ends-j-ca-release-calcium-is-r-4f27e09d",
      conceptKey: "cardiac-sarcolemma.ionic-pumps-exchangers.resting-gradient-maintenance",
      difficulty: "Moderate",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Bank extraction recovered only 3 options (A/B/C), no D or E — below the platform's 4-to-5-option import contract (medical:batch rejects it outright: '3 options — the contract is 4 to 5'). The tested fact (SERCA as the majority route removing cytosolic Ca++ at relaxation) is real and correctly keyed (A) but has no complete-option sibling question in this leaf to fall back on, unlike the phase-4 row above.",
    },
    // run40, second Electrical Activity of the Heart batch: 35 bank rows
    // left un-keyed (leaf null, reclustered by the ledger's own keyword
    // heuristic) after run33's own 47/47 closure. Extends this leaf's
    // existing 4 concepts rather than minting new ones — every row below
    // restates a fact one of them already states.
    {
      key: "pacemaker-potentials-are-normally-absent-from-98015db5",
      conceptKey: "sa-node-pacemaker-potential.phase-4.ionic-basis",
      difficulty: "Moderate",
      questionType: "Recall of a mechanism",
      learningObjective: "State that pacemaker potentials (spontaneous phase 4 depolarization) are a property of the specialised conducting tissue and are normally absent from ordinary working myocardial cells.",
      explanations: {
        A: "Correct. Working (contractile) myocardial cells hold a stable, flat phase 4 resting potential rather than spontaneously drifting toward threshold; they depolarize only once an action potential arrives from an already-excited neighbouring cell. That passive dependence on an external stimulus is exactly what separates ordinary atrial and ventricular muscle from the heart's genuine pacemaker tissue.",
        B: "Cells in the SA node show the most prominent pacemaker potential of any cardiac tissue, produced by the funny current and, later in phase 4, the T-type calcium current — the opposite of 'absent', since the SA node is the tissue this property defines.",
        C: "AV nodal cells retain a real, if slower, pacemaker potential of their own, which is exactly why the AV node can take over as a backup (junctional) pacemaker if the SA node fails to fire.",
        D: "Purkinje fibres carry the slowest pacemaker potential of the three genuine pacemaker tissues, but it is still a real spontaneous phase 4 depolarization — which is what lets them serve as a last-resort ventricular escape pacemaker if both the SA and AV nodes fail.",
      },
    },
    {
      key: "the-sa-node-is-the-normal-pace-maker-because-a4457b2b",
      conceptKey: "cardiac-pacemaker-hierarchy.intrinsic-rates.sa-av-purkinje",
      difficulty: "Easy",
      questionType: "Recall of a mechanism",
      learningObjective: "State that the SA node is the normal pacemaker because it is the most rapidly discharging part of the conduction system, not because of its innervation or location.",
      explanations: {
        A: "Correct. The SA node fires faster than every other pacemaker tissue — about 90-105/min against the AV node's roughly 60/min and the Purkinje fibres' roughly 20-40/min — and because it reaches threshold and discharges first each cycle, it drives the whole heart and suppresses the slower tissues below it.",
        B: "The SA node does receive a rich autonomic supply, but the AV node and Purkinje fibres are innervated too; a richer nerve supply alone would not explain why the SA node, rather than either of them, sets the rhythm — its faster intrinsic discharge rate does that.",
        C: "Location in the atrium is a fixed anatomical fact about the SA node, but location by itself confers no dominance — the AV node's own fixed location in the interatrial septum does not make it the pacemaker either; only a faster discharge rate can.",
        D: "'All of the above' fails because B and C each describe a true anatomical fact about the SA node without explaining WHY it dominates the rhythm — only its faster intrinsic discharge rate (A) does that, so the option set is not jointly correct.",
      },
    },
    {
      key: "when-the-bundle-of-his-is-completely-interrupted-the-1245d791",
      conceptKey: "cardiac-pacemaker-hierarchy.intrinsic-rates.sa-av-purkinje",
      difficulty: "Hard",
      questionType: "Discrimination among near-miss options",
      learningObjective: "State that complete interruption of the bundle of His (complete heart block) leaves the ventricles beating at their own slow intrinsic escape rate, about 30-40/min, no longer driven by the atria.",
      explanations: {
        A: "Correct. Once the bundle of His — the sole muscular bridge carrying the impulse from atria to ventricles — is completely interrupted, the atria continue beating under SA node control while the ventricles, cut off from that drive, fall back on their own intrinsic Purkinje/ventricular escape rhythm, conventionally cited at about 30-40 beats/minute.",
        B: "The atria are unaffected by a block distal to the AV node/bundle of His; the SA node still drives them at its own regular rate, so atrial beating stays regular, not irregular.",
        C: "In complete heart block the QRS complexes stay uniform in shape beat to beat, since every ventricular beat now originates from the same escape focus below the block, rather than varying in origin.",
        D: "With the atria and ventricles beating independently (atrioventricular dissociation), there is no fixed timing relationship between a P wave and the following QRS at all, so a constant P-R interval — which presumes one impulse conducting through to produce both — cannot be measured; the two events drift in and out of phase with each other.",
      },
    },
    {
      key: "when-the-bundle-of-his-is-completely-interrupted-the-ae-7-ea-45a41f10",
      conceptKey: "cardiac-pacemaker-hierarchy.intrinsic-rates.sa-av-purkinje",
      difficulty: "Hard",
      questionType: "Discrimination among near-miss options",
      learningObjective: "State that complete interruption of the bundle of His (complete heart block) leaves the ventricles beating at their own slow intrinsic escape rate, about 30-40/min, no longer driven by the atria.",
      explanations: {
        A: "Correct. With the bundle of His — the only muscular pathway from atria to ventricles — completely interrupted, the atria go on beating under SA node control while the ventricles adopt their own intrinsic Purkinje/ventricular escape rhythm, conventionally about 30-40 beats/minute, well below the SA node's own rate.",
        B: "The SA node still drives the atria at its normal, regular rate regardless of what happens below the block, so the atria do not beat irregularly.",
        C: "Every ventricular beat in complete heart block arises from the same escape focus below the block, so the QRS complexes keep a consistent shape from beat to beat rather than varying.",
        D: "Because the atria and ventricles now beat independently of each other (atrioventricular dissociation), no single, repeatable interval between a P wave and the following QRS exists to measure — a constant P-R interval requires one impulse to drive both events, which a complete block prevents.",
      },
    },
    {
      key: "which-of-the-following-has-the-slowest-rhythmicity-in-the-au-e06c2b37",
      conceptKey: "cardiac-pacemaker-hierarchy.intrinsic-rates.sa-av-purkinje",
      difficulty: "Moderate",
      questionType: "Discrimination among near-miss options",
      learningObjective: "Rank the automatic cardiac tissues' intrinsic rhythmicity, identifying the Purkinje fibres as the slowest.",
      explanations: {
        A: "The SA node has the fastest intrinsic rhythmicity of the automatic cardiac tissues, about 90-105/min, which is exactly why it normally dominates the other two and sets the heart's rate — the opposite of slowest.",
        B: "The AV node's intrinsic rate, about 60/min, is slower than the SA node's but still faster than the Purkinje fibres', placing it in the middle of the hierarchy rather than at the bottom.",
        C: "The bundle of His is the conducting pathway continuous with, and functionally grouped alongside, the Purkinje network; it does not constitute a separately ranked tier with a faster rhythmicity than the Purkinje fibres it feeds into.",
        D: "Correct. The Purkinje fibres have the slowest intrinsic rhythmicity of the three automatic cardiac tissues, about 20-40/min, which is why they never normally set the heart's rate and only emerge as a last-resort escape rhythm when both the SA and AV nodes fail.",
      },
    },
    {
      key: "which-of-the-following-is-characteristic-about-the-conductin-c32dcb44",
      conceptKey: "cardiac-pacemaker-hierarchy.intrinsic-rates.sa-av-purkinje",
      difficulty: "Moderate",
      questionType: "Discrimination among near-miss options",
      learningObjective: "State that the Purkinje fibres' intrinsic rhythmic rate of about 15-40/min is a genuine characteristic of the conducting system, as opposed to a reversed interatrial-conduction direction, a swapped SA-node rate figure, or crediting the AV node as the natural pacemaker.",
      explanations: {
        A: "Impulses spread from the SA node, in the right atrium, across to the left atrium — left to right, not right to left as this option states — so this reverses the true direction of interatrial conduction.",
        B: "40-60/min is closer to the AV node's own approximate intrinsic rate; the SA node's intrinsic rate is faster, conventionally cited at about 90-105/min, so this figure is attached to the wrong tissue.",
        C: "The SA node, not the AV node, is the heart's natural (dominant) pacemaker under normal conditions, precisely because its own intrinsic rate outpaces the AV node's and suppresses it.",
        D: "Correct. The Purkinje fibres, the slowest tier of the pacemaker hierarchy, have an intrinsic rhythmic rate of roughly 15-40 per minute — a genuine characteristic of the conducting system, consistent with their role as a last-resort escape pacemaker rather than the normal rhythm-setter.",
      },
    },
  ],
}
