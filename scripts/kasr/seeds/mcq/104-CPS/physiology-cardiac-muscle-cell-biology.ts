import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Physiology Cardiovascular System — Cardiac Muscle Cell Biology and Contractility Mechanisms',
  modulePath: '104 CPS > Physiology > Cardiovascular System > Mechanical Properties of Cardiac Muscle',
  // ART-104-PHY-CARDIAC-MECHANICS is the same live article the other
  // sibling files in this leaf already use — an exact module_subject match
  // for "Mechanical Properties of Cardiac Muscle". 0 fresh mints in this
  // file: all 3 concepts below are reuses found by grepping every 104-CPS
  // concept file for their subject matter before minting anything, per the
  // heightened CVS dedup mitigation.
  articleId: 'ART-104-PHY-CARDIAC-MECHANICS',

  concepts: [
    {
      // Sparse reuse: CON-CVS-BF82D6F52B72C9, already reused twice in this
      // leaf's own physiology-cardiac-inotropy-mechanisms.ts. Its own
      // definition already names phospholamban's SERCA-inhibition role and
      // myocardial ischaemia's effect on relaxation by name, an exact
      // match for 3 of this file's questions.
      key: 'cardiac-contractility.inotropy-and-lusitropy.camp-pka-mechanisms',
      label: 'Beta-adrenergic stimulation raises cytoplasmic calcium through Protein Kinase A to increase contractile force (positive inotropy) and speed relaxation, phospholamban inhibits SERCA until phosphorylated, and myocardial ischaemia impairs both contraction and relaxation through ATP deficiency',
      definition: 'Stimulation of beta-adrenergic receptors raises cAMP and activates Protein Kinase A (PKA), which phosphorylates the L-type Ca++ channel and the ryanodine receptor to raise cytoplasmic Ca++ (positive inotropy). PKA also phosphorylates phospholamban, a protein that in its resting, dephosphorylated state inhibits SERCA (the sarco/endoplasmic reticulum Ca++-ATPase); relieving this inhibition speeds Ca++ reuptake and relaxation. Muscarinic (parasympathetic) stimulation runs this same cAMP-PKA axis in reverse, lowering contractility (negative inotropy). Myocardial ischaemia, through ATP deficiency, slows the pumps that remove cytoplasmic Ca++, so Ca++ accumulates and cannot detach from troponin, impairing both contraction and relaxation together.',
      objective: "State phospholamban's resting inhibitory effect on SERCA and how PKA phosphorylation relieves it, and explain why myocardial ischaemia impairs both contraction and relaxation through the same underlying ATP/Ca++-handling deficiency.",
      pitfall: 'Confusing phospholamban itself with the pump it regulates (SERCA) or with the other sarcolemmal/SR calcium-handling proteins (the Na-Ca exchanger, the ryanodine receptor) — phospholamban is a regulator, not a pump or a channel.',
      subject: 'cvs',
      primary: 'DIS-PHY-T02',
      secondary: ['SYS-CVS-T01-S01'],
      modulePath: '104 CPS > Physiology > Cardiovascular System > Mechanical Properties of Cardiac Muscle',
      type: 'mechanism',
      aliases: ['Phospholamban', 'SERCA regulation', 'Ischaemia and relaxation'],
    },
    {
      // Sparse reuse, genuine cross-leaf borrow: CON-CVS-D0CD4A234205EF,
      // pinned under "Electrical Activity of the Heart"'s own module_subject
      // (104-CPS-mcq-concepts.md) with article ART-104-PHY-CARDIAC-ACTION-
      // POTENTIAL. Its own definition already states L-type Ca++ channels
      // are voltage-gated, open during the plateau and inactivate slowly —
      // an exact match for this leaf's own L-type-channel-properties row.
      key: 'cardiac-action-potential.plateau-phase2.calcium-potassium-balance',
      label: "The working cardiac myocyte's action potential plateau (phase 2) is sustained by a balance between inward Ca++ current through L-type calcium channels and outward K+ current",
      definition: "The plateau (phase 2) of a working myocyte's action potential is held near 0 mV by a near-balance between a sustained inward Ca++ current, carried by voltage-gated L-type ('long-lasting') Ca++ channels that open during the upstroke and inactivate slowly (over roughly 200-300 ms), and an outward K+ current. Because the L-type channels conduct an inward, not outward, current, and inactivate slowly rather than rapidly, they can sustain the plateau for its full duration rather than closing immediately the way a fast Na+ channel does.",
      objective: 'State that L-type Ca++ channels are voltage-gated, open during the plateau, conduct an inward (not outward) current, and inactivate slowly.',
      pitfall: 'Assuming the sustained inward current of the plateau must be carried by an outward-conducting channel because the membrane potential itself is not changing much; the plateau is a near-balance of two currents, not the absence of current, and the L-type channel\'s own current is inward.',
      subject: 'cvs',
      primary: 'DIS-PHY-T02',
      secondary: ['SYS-CVS-T01-S01'],
      modulePath: '104 CPS > Physiology > Cardiovascular System > Mechanical Properties of Cardiac Muscle',
      type: 'mechanism',
      aliases: ['L-type calcium channels', 'Cardiac action potential plateau', 'Phase 2'],
    },
    {
      // Sparse reuse, genuine cross-leaf borrow: CON-CVS-7FC4E8F3FBEFFE,
      // pinned under "Electrical Activity of the Heart"'s own module_subject
      // (104-CPS-mcq-concepts.md) with article ART-104-PHY-CARDIAC-ACTION-
      // POTENTIAL. Found by grepping "functional syncytium" / "true
      // syncytium" across every 104-CPS concept file before minting
      // anything — an exact match for this leaf's own cardiac-muscle-
      // structure row.
      key: 'cardiac-muscle.functional-syncytium-and-intercalated-discs',
      label: 'Cardiac muscle behaves as a functional, not a true, syncytium — individual myocytes stay anatomically separate but are electrically coupled through the low-resistance gap junctions of the intercalated discs',
      definition: "Cardiac muscle fibres are individual, striated cells, each with its own nucleus, separated from their neighbours by intercalated discs — unlike skeletal muscle's true syncytium of fused, multinucleated fibres. The intercalated discs carry gap junctions whose channels have very low electrical resistance, letting an action potential spread rapidly from cell to cell almost as though no membrane separated them — this 'functional syncytium' behaviour lets the atrial and ventricular masses each contract as a single unit. Cardiac muscle is also richly, not poorly, supplied with capillaries, at almost one per fibre, matching its continuous high metabolic demand.",
      objective: 'Distinguish a functional syncytium (cardiac muscle) from a true syncytium (skeletal muscle), and state that cardiac muscle is striated and densely capillarised, not unstriated or poorly vascularised.',
      pitfall: "Calling cardiac muscle a 'true syncytium' or an unstriated tissue. Its cells remain anatomically separate and striated; only its electrical behaviour, via low-resistance intercalated-disc gap junctions, resembles a single continuous unit.",
      subject: 'cvs',
      primary: 'DIS-PHY-T02',
      secondary: ['SYS-CVS-T01-S01'],
      modulePath: '104 CPS > Physiology > Cardiovascular System > Mechanical Properties of Cardiac Muscle',
      type: 'structural_description',
      aliases: ['Functional syncytium', 'Intercalated discs', 'Gap junctions'],
    },
    // run44 — sparse reuse, genuine cross-leaf borrow: CON-CVS-7A8A04F61D44D1,
    // canonical_key 'cardiac-sarcolemma.ionic-pumps-exchangers.resting-
    // gradient-maintenance', already pinned in docs/Kasr-Source-Imports/
    // concept/104-CPS-mcq-concepts.md, already article-linked to THIS
    // leaf's own ART-104-PHY-CARDIAC-MECHANICS (and to ART-104-PHY-
    // PACEMAKER-ELECTROPHYSIOLOGY). Its own label already states the exact
    // fact this leaf's own two remaining bank rows test: the three ionic
    // pumps/exchangers (Na-K ATPase, Ca-ATPase, Na-Ca exchanger) maintain
    // ionic gradients, and the exchanger reverses direction. find-
    // existing.mjs "cardiac sarcolemma ionic pumps exchangers" returned no
    // hit (its live snapshot is 10 days stale per LANE-CARD, and this
    // record lives in the pending-import mcq-concepts.md batch, not yet
    // live) — found instead by grepping 104-CPS-mcq-concepts.md directly
    // for 'canonical_key' near 'ionic'/'pump'/'exchanger', per this lane's
    // own heightened-dedup convention.
    {
      key: 'cardiac-sarcolemma.ionic-pumps-exchangers.resting-gradient-maintenance',
      label: 'The Na+-K+ ATPase, the Ca++-ATPase and the Na+-Ca++ exchanger maintain cardiac myocyte ionic gradients, and the exchanger can reverse direction',
      definition: "Cardiac myocyte sarcolemma carries three ionic pumps/exchangers that counteract the continuous ion leaks (K+ out, Na+ in at rest, plus Na+ in/K+ out/Ca++ in with every action potential) that would otherwise disturb the resting membrane potential over time: the electrogenic Na+-K+ ATPase (pumps 3 Na+ out for every 2 K+ in), the ATP-dependent Ca++-ATPase (pumps Ca++ out), and the Na+-Ca++ exchanger (exchanges 3 Na+ for 1 Ca++). The Na+-Ca++ exchanger is bidirectional, operating in whichever direction the membrane potential and the ionic concentration gradients favour at that moment: when intracellular Ca++ is high it moves Ca++ out and brings Na+ in (its usual, forward direction); when intracellular Na+ is high instead — as with digitalis inhibiting the Na+-K+ ATPase — it reverses, moving Na+ out and bringing Ca++ in.",
      objective: 'Name the three ionic pumps/exchangers (Na-K ATPase, Ca-ATPase, Na-Ca exchanger) that maintain cardiac myocyte ionic gradients, and state that the Na-Ca exchanger is bidirectional, reversing direction depending on membrane potential and ionic gradients.',
      pitfall: 'Assuming the Na+-Ca++ exchanger only ever extrudes calcium. It is bidirectional — raised intracellular Na+ (e.g. from digitalis-inhibited Na+-K+ ATPase) reverses it to bring Ca++ INTO the myocyte instead, which is exactly how digitalis raises contractility.',
      subject: 'cvs',
      primary: 'DIS-PHY-T02',
      secondary: ['SYS-CVS-T01-S01'],
      modulePath: '104 CPS > Physiology > Cardiovascular System > Mechanical Properties of Cardiac Muscle',
      type: 'mechanism',
      aliases: ['Na-Ca exchanger', 'Cardiac ionic pumps', 'Na-K ATPase (cardiac)', 'Ca-ATPase (cardiac)'],
    },
  ],

  questions: [
    {
      key: 'concerning-l-type-ca-channels-in-cardiac-muscle-fibers-allth-1c6534dc',
      conceptKey: 'cardiac-action-potential.plateau-phase2.calcium-potassium-balance',
      difficulty: 'Moderate',
      questionType: 'Recall of a false statement',
      learningObjective: 'Identify that L-type Ca++ channels conduct an inward, not outward, current as the false statement among their other true properties (voltage-gated, open during the plateau, inactivate slowly).',
      explanations: {
        A: 'True, not the exception. L-type Ca++ channels are voltage-gated, opening in response to the membrane depolarization produced by phase 0.',
        B: 'True, not the exception. L-type Ca++ channels open during the upstroke and remain open through the plateau (phase 2), carrying the sustained inward current that holds the membrane near 0 mV.',
        C: 'Correct — this is the exception (the false statement). L-type Ca++ channels conduct an inward, not outward, Ca++ current; it is this inward current, balanced against an outward K+ current, that sustains the plateau.',
        D: 'True, not the exception. L-type Ca++ channels inactivate slowly (over roughly 200-300 ms), which is exactly why they can sustain a current throughout the whole plateau rather than closing immediately as a fast Na+ channel does.',
      },
    },
    {
      key: 'during-excitation-contraction-coupling-of-carciac-myocyte-wh-8f883a4d',
      conceptKey: 'cardiac-contractility.inotropy-and-lusitropy.camp-pka-mechanisms',
      difficulty: 'Moderate',
      questionType: 'Discrimination among near-miss options',
      learningObjective: 'State that myocardial ischaemia inhibits relaxation through calcium accumulation, as opposed to misdescribing the roles of the Na-Ca exchanger, the ryanodine receptor, or sarcoplasmic calcium uptake during excitation-contraction coupling.',
      explanations: {
        A: 'Calcium entering during depolarization first triggers a much larger calcium-induced release of Ca++ from the sarcoplasmic reticulum, driving contraction; the Na+-Ca++ exchanger\'s role in extruding calcium is more prominent during relaxation, not immediately upon entry.',
        B: 'Ryanodine receptors are activated (opened), not inhibited, during excitation-contraction coupling, releasing stored sarcoplasmic-reticulum calcium in response to the trigger signal.',
        C: 'Sarcoplasmic calcium uptake (via SERCA) is primarily associated with relaxation and replenishing sarcoplasmic-reticulum stores for the next beat, not with triggering the current contraction, which depends on calcium release, not uptake.',
        D: 'Correct. Myocardial ischaemia, through ATP deficiency, slows the pumps that remove cytoplasmic Ca++; the resulting accumulation of Ca++ cannot detach from troponin, inhibiting relaxation.',
      },
    },
    {
      key: 'regarding-phospholamban-pln-protein-b5c226f7',
      conceptKey: 'cardiac-contractility.inotropy-and-lusitropy.camp-pka-mechanisms',
      difficulty: 'Moderate',
      questionType: 'Recall of a definition',
      learningObjective: 'State that phospholamban, in its resting state, inhibits SERCA, as opposed to itself being the calcium pump, the sodium-calcium exchanger, or the ryanodine receptor.',
      explanations: {
        A: "Correct. In its resting (dephosphorylated) state, phospholamban inhibits the sarco/endoplasmic reticulum calcium ATPase (SERCA); Protein Kinase A phosphorylation of phospholamban relieves this inhibition, speeding calcium reuptake and relaxation.",
        B: 'The ATP-dependent calcium pump that reuptakes calcium into the sarcoplasmic reticulum is SERCA itself — the protein phospholamban regulates, not phospholamban.',
        C: 'The sodium-calcium exchanger that extrudes calcium out of the myocyte is a distinct sarcolemmal transporter, not phospholamban.',
        D: 'The ryanodine-sensitive calcium release channel is a distinct sarcoplasmic-reticulum protein responsible for calcium release, not phospholamban, which instead regulates calcium reuptake.',
      },
    },
    {
      key: 'the-cardiac-muscle-fibers-507b79f8',
      conceptKey: 'cardiac-muscle.functional-syncytium-and-intercalated-discs',
      difficulty: 'Easy',
      questionType: 'Recall of a definition',
      learningObjective: 'State that cardiac muscle fibres are joined by low-resistance gap junctions at tight intercalated discs, as opposed to being unstriated, forming a true syncytium, or being poor in mitochondria.',
      explanations: {
        A: 'Cardiac muscle fibres are striated, just like skeletal muscle — the same actin-myosin sarcomere organisation produces the characteristic banding pattern.',
        B: 'Cardiac muscle forms a functional, not a true, syncytium: its cells stay anatomically separate, each with its own nucleus, unlike skeletal muscle\'s true syncytium of fused, multinucleated fibres.',
        C: 'Cardiac muscle is richly, not poorly, supplied with mitochondria and capillaries (almost one capillary per fibre), matching its continuous, high metabolic demand.',
        D: 'Correct. Intercalated discs carry low-resistance gap junctions that let an action potential spread rapidly from cell to cell, producing the tissue\'s functional-syncytium behaviour.',
      },
    },
    {
      key: 'which-of-the-following-decreases-the-myocardial-contractilit-5280d5ef',
      conceptKey: 'cardiac-contractility.inotropy-and-lusitropy.camp-pka-mechanisms',
      difficulty: 'Moderate',
      questionType: 'Discrimination among near-miss options',
      learningObjective: 'Identify increased parasympathetic activity as a cause of decreased myocardial contractility, as opposed to catecholamines, increased heart rate, or increased end-diastolic volume.',
      explanations: {
        A: 'Catecholamines increase, not decrease, myocardial contractility via beta-adrenergic-cAMP-PKA stimulation.',
        B: 'An increase in heart rate, via the force-frequency (staircase/treppe) relationship, tends to modestly increase, not decrease, contractility across most physiological rate ranges.',
        C: 'An increase in end-diastolic volume affects stroke volume through the separate, preload-dependent Frank-Starling mechanism, not through a direct change in intrinsic contractility.',
        D: 'Correct. Increased parasympathetic (vagal) activity, acting through muscarinic receptors, inhibits adenylyl cyclase and reduces cAMP/PKA activity, producing a genuine negative inotropic effect.',
      },
    },
    {
      key: 'which-of-the-following-is-considered-a-positive-inotropic-me-b253c08c',
      conceptKey: 'cardiac-contractility.inotropy-and-lusitropy.camp-pka-mechanisms',
      difficulty: 'Hard',
      questionType: 'Discrimination among near-miss options',
      learningObjective: 'Identify Protein Kinase A activation raising cytoplasmic calcium as a positive inotropic mechanism, as opposed to ischaemia, Na-K ATPase activation, or muscarinic receptor activation with decreased cAMP.',
      explanations: {
        A: 'Cardiac ischaemia impairs, rather than enhances, contractility — a negative, not positive, inotropic influence, through ATP deficiency and impaired calcium handling.',
        B: "Activating the Na+-K+ ATPase lowers intracellular Na+, which favours the Na+-Ca++ exchanger extruding more calcium from the cell in its normal, forward direction — the opposite of the reversed, calcium-importing direction that raises cytoplasmic calcium (which digitalis instead produces by inhibiting, not activating, this same pump).",
        C: 'Muscarinic (M2) receptor activation with decreased cAMP is the classic negative (parasympathetic) inotropic pathway, the functional opposite of a positive inotropic mechanism.',
        D: 'Correct. Protein Kinase A activation, downstream of beta-adrenergic stimulation and raised cAMP, phosphorylates the L-type Ca++ channel and ryanodine receptor to increase cytoplasmic Ca++ available during systole — the classic positive inotropic pathway.',
      },
    },

    // --- run44: this leaf's own 8-row "what's left" recompute ---

    {
      key: 'the-low-resistance-pathways-between-myocardial-cells-that-al-a0d4998c',
      conceptKey: 'cardiac-muscle.functional-syncytium-and-intercalated-discs',
      difficulty: 'Easy',
      questionType: 'Recall',
      learningObjective: 'Identify gap junctions, not T tubules, sarcoplasmic reticulum, or intercalated discs generally, as the specific low-resistance pathway that lets an action potential spread between myocardial cells.',
      explanations: {
        A: 'This is the correct answer. Gap junctions are the specific low-resistance channels, clustered within the intercalated discs, whose very low electrical resistance lets an action potential spread rapidly from cell to cell — the structural basis of cardiac muscle\'s functional-syncytium behaviour.',
        B: 'T tubules are invaginations of the sarcolemma that carry the action potential into the cell\'s interior to trigger calcium release; they are not the low-resistance pathway between separate myocardial cells.',
        C: 'The sarcoplasmic reticulum is an intracellular calcium store within a single myocyte; it plays no part in conducting current between separate cells.',
        D: 'The intercalated disc is the structure that houses the gap junctions (along with desmosomes and fascia adherens for mechanical attachment), but it is the gap junctions specifically, not the disc as a whole, that form the actual low-resistance electrical pathway.',
      },
    },
    {
      key: 'which-of-the-following-events-of-cardiac-myocyte-action-pote-3a3be2b8',
      conceptKey: 'cardiac-action-potential.plateau-phase2.calcium-potassium-balance',
      difficulty: 'Hard',
      questionType: 'Discrimination among near-miss options',
      learningObjective: 'Identify that delayed rectifier K+ channels become maximally activated during phase 3 (repolarization) of the working cardiac myocyte action potential, as opposed to misdescribing phases 0, 1 or 2.',
      explanations: {
        A: 'Phase 0 shows a DECREASE, not an increase, in K+ conductance through inwardly rectifying K+ channels — their inactivation, alongside fast Na+ channel activation, is what permits the rapid upstroke.',
        B: 'The sustained inward Ca++ current of phase 2 (the plateau) flows through L-type ("long-lasting"), not T-type, Ca++ channels — this leaf\'s own plateau concept names the L-type channel specifically.',
        C: 'Fast Na+ channels are ACTIVATED, not inactivated, during phase 0 — they drive the rapid upstroke itself; they inactivate afterward, during phase 1, not during phase 0.',
        D: 'This is the correct answer. During phase 3 (repolarization), the outward K+ current continues and delayed rectifier K+ channels become maximally activated, while the L-type Ca++ channels that sustained the plateau close — once that inward current stops, the now-dominant outward K+ current repolarizes the membrane back toward its resting value, exactly the mechanism this leaf\'s own plateau concept describes for the phase 2-to-3 transition.',
      },
    },
    {
      key: 'which-of-the-following-is-correct-as-regards-na-ca-exchanger-e0bfc7af',
      conceptKey: 'cardiac-sarcolemma.ionic-pumps-exchangers.resting-gradient-maintenance',
      difficulty: 'Moderate',
      questionType: 'Recall',
      learningObjective: 'State that the Na+-Ca++ exchanger can operate in both directions, not that it sits in the sarcoplasm, consumes large amounts of ATP, or is the funny current.',
      explanations: {
        A: 'The Na+-Ca++ exchanger is a sarcolemmal (membrane) transporter, not a sarcoplasmic (cytoplasmic) one — it sits in the cell membrane, exchanging ions across it.',
        B: 'The Na+-Ca++ exchanger is not itself ATP-dependent; it is a secondary active transporter that uses the Na+ electrochemical gradient (built up by the separate, ATP-dependent Na+-K+ ATPase) rather than consuming ATP directly.',
        C: 'This is the correct answer. The Na+-Ca++ exchanger can operate in both directions depending on the membrane potential and the ionic concentration gradients: normally it moves Ca++ out and Na+ in, but when intracellular Na+ rises (e.g. Na+-K+ ATPase inhibition by digitalis) it reverses, moving Na+ out and Ca++ in.',
        D: 'The "funny current" (If) is carried by HCN (funny) channels in pacemaker cells, a completely separate current from the Na+-Ca++ exchanger.',
      },
    },
    {
      key: 'which-of-the-following-maintain-the-ionic-concentrations-acr-20b74fb5',
      conceptKey: 'cardiac-sarcolemma.ionic-pumps-exchangers.resting-gradient-maintenance',
      difficulty: 'Easy',
      questionType: 'Recall',
      learningObjective: 'State that the Na-Ca exchanger, the Na-K pump and the Ca ATPase pump together maintain the ionic concentrations across the cardiac sarcolemma.',
      explanations: {
        A: 'True, but incomplete on its own — the Na+-Ca++ exchanger is one of three transporters that together maintain ionic concentrations across the sarcolemma, alongside the Na+-K+ pump and the Ca++ ATPase pump.',
        B: 'True, but incomplete on its own — the Na+-K+ pump (Na+-K+ ATPase) is one of three transporters, alongside the Na+-Ca++ exchanger and the Ca++ ATPase pump.',
        C: 'True, but incomplete on its own — the Ca++ ATPase pump is one of three transporters, alongside the Na+-K+ pump and the Na+-Ca++ exchanger.',
        D: 'This is the correct answer. All three — the Na+-Ca++ exchanger, the Na+-K+ pump, and the Ca++ ATPase pump — sit in the cardiac sarcolemma and together maintain the myocyte\'s resting ionic concentration gradients against the continuous ion leaks that would otherwise disturb them.',
      },
    },

    // --- run44: excluded — not grounded in this module's own department
    // books. The physiology department book (src_a11a7faed67c95e2d636) has
    // no Poiseuille's-law formula or bladder/smooth-muscle-plasticity
    // section (checked directly: 0 hits for "poiseuille", "plasticity",
    // "bladder" across its full 160 pages), and the histology department
    // book (src_18d3a953df4ca83c4e74) has no cardiac-sarcoplasm-characters
    // or lipofuscin/brown-atrophy content (checked directly: its only
    // cardiac-muscle mention, p.5, is a two-sentence structural overview;
    // 0 hits for "lipofuscin", "diad", "atrial natriuretic", "myofibril",
    // "mitochondri" restricted to cardiac muscle). Both facts read as
    // general-histology/general-physiology curriculum content likely
    // taught from a different module's own book (e.g. 103 BMS's general
    // histology text) — out of this lane's own module-book scope to
    // ground, and the rule is a definition not in the cached page text is
    // left blank/excluded, never filled from model knowledge. ---

    {
      key: 'all-characters-of-cardiac-sarcoplasm-except-xxx-73ce223b',
      conceptKey: 'cardiac-muscle.functional-syncytium-and-intercalated-discs',
      difficulty: 'Moderate',
      questionType: 'Not sittable as extracted.',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'No grounding in this module\'s own histology department book (src_18d3a953df4ca83c4e74) — checked directly, its only cardiac-muscle content is a two-sentence structural overview (p.5), with 0 hits for the specific terms this question turns on ("diad", "atrial natriuretic" granules, "myofibril" density versus skeletal muscle, "mitochondri[a]" count). This detailed cardiac-sarcoplasm-ultrastructure content reads as general-histology curriculum material likely taught from a different module\'s own book. The book is the source; a definition not in the cached page text is left blank, never filled from model knowledge.',
    },
    {
      key: 'increase-with-age-forming-brown-atrophy-of-heart-xxx-dc8cd7ee',
      conceptKey: 'cardiac-muscle.functional-syncytium-and-intercalated-discs',
      difficulty: 'Moderate',
      questionType: 'Not sittable as extracted.',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'No grounding in this module\'s own histology department book (src_18d3a953df4ca83c4e74) — checked directly for "lipofuscin" and "brown atrophy", 0 hits (the one "lipofuscin" hit in the whole book is about olfactory mucosa, an unrelated system). Cardiac lipofuscin/brown atrophy is classic general-histology aging content, likely taught from a different module\'s own book, not this one. Left unclaimed rather than filled from model knowledge.',
    },
    {
      key: 'the-plasticity-of-the-urinary-bladder-is-explained-by-8bf89a19',
      conceptKey: 'cardiac-contractility.inotropy-and-lusitropy.camp-pka-mechanisms',
      difficulty: 'Moderate',
      questionType: 'Not sittable as extracted.',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'No grounding in this module\'s own physiology department book (src_a11a7faed67c95e2d636) — checked directly for "plasticity" and "bladder", 0 hits across all 160 pages. Smooth-muscle plasticity (stress-relaxation of hollow organs such as the bladder, explained by the Starling/length-tension relationship in smooth muscle) reads as general-physiology curriculum content taught from a different module\'s own book, not this cardiopulmonary one, and it is also off-topic for this leaf (cardiac, not smooth, muscle mechanics) despite the bank\'s own leaf tag. Left unclaimed rather than filled from model knowledge.',
    },
    {
      key: 'the-poiseuille-law-is-concerned-with-which-of-the-following-501dd5db',
      conceptKey: 'cardiac-contractility.inotropy-and-lusitropy.camp-pka-mechanisms',
      difficulty: 'Moderate',
      questionType: 'Not sittable as extracted.',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'No grounding in this module\'s own physiology department book (src_a11a7faed67c95e2d636) — checked directly for "poiseuille", "viscosity" and "radius" in a resistance-formula context, 0 hits for Poiseuille\'s law by name or formula across all 160 pages (the book states vascular-resistance VALUES and the general flow=pressure/resistance relationship, but never derives resistance from radius/viscosity/length). Left unclaimed rather than filled from model knowledge.',
    },
  ],
}
