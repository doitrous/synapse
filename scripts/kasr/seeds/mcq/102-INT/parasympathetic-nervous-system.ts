/**
 * `102 INT > Physiology > Autonomic nervous system > Parasympathetic
 * nervous system` — the question books' MCQs.
 *
 * Sixteen rows. The existing concept from the hand-authored physiology batch
 * covers only the vagus's thoracic/abdominal effects, so two new concepts
 * are minted for the cranial-nerve-by-cranial-nerve head-and-neck outflow
 * (III, VII, IX) and for the pelvic outflow (shared with the Organisation-of-
 * ANS leaf, where it is also declared). One OCR key conflict is resolved
 * from the book; one row is excluded because both candidate readings of a
 * conflicting key are false per the book and the true answer was named by
 * neither OCR pass.
 */
import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Parasympathetic nervous system',
  modulePath: '102 INT > Physiology > Autonomic nervous system > Parasympathetic nervous system',
  articleId: 'ART-102-PHY-PARASYMPATHETIC-NERVOUS-SYSTEM',

  concepts: [
    {
      key: 'parasympathetic-function-thoracic-abdominal-viscera',
      label: 'The vagus carries the whole parasympathetic supply of the thoracic and abdominal viscera, slowing the atria, constricting bronchi, driving gut motility and secretion, and emptying the gall bladder',
      definition:
        'The vagus nerve (cranial nerve X) constitutes about 75% of all parasympathetic fibres. Its preganglionic fibres run to the entire thoracic and abdominal viscera, relaying in terminal ganglia inside or close to each organ. Heart: inhibits all properties of atrial cardiac muscle only (does not supply the ventricles); decreases coronary blood flow and O2 consumption. Lungs: bronchoconstriction, dilatation of pulmonary vessels, stimulation of bronchial glands. GI tract: contraction of oesophagus/stomach/small-intestine/proximal-large-intestine smooth muscle, relaxation of sphincters, secretomotor to GIT glands, liver and pancreas. Gall bladder: evacuation — contraction of the wall with relaxation of the sphincter of Oddi. Parasympathetic and sympathetic action on the same GI smooth muscle are opposite (parasympathetic contracts, sympathetic relaxes).',
      objective: 'State that the vagus supplies the atria but not the ventricles, and list its bronchial, gastrointestinal and biliary effects.',
      pitfall: 'Assuming vagal (parasympathetic) stimulation slows the whole heart — it acts only on atrial muscle; the book states explicitly that the vagus does not supply the ventricles at all.',
      subject: 'neuro',
      primary: 'DIS-PHY-T07',
      secondary: [],
      modulePath: '102 INT > Physiology > Autonomic nervous system > Parasympathetic nervous system',
      type: 'structure_function_relationship',
      aliases: ['Vagus nerve', 'Cranial nerve X', 'Vagal effects'],
    },
    {
      key: 'parasympathetic-cranial-nerve-relay-ganglia-head-neck',
      label: 'Cranial nerves III, VII and IX carry the parasympathetic supply to the head and neck, each relaying in its own ganglion to its own effector: pupil/lens (III), lacrimal/nasal/submandibular/sublingual glands (VII), and the parotid gland (IX)',
      definition:
        'The oculomotor nerve (III): preganglionic fibres from the Edinger-Westphal nucleus in the midbrain relay in the ciliary ganglion; postganglionic short ciliary nerves contract the constrictor pupillae (miosis) and the ciliary muscle (increasing lens power, preparing the eye for near vision). The facial nerve (VII): preganglionic fibres from the superior salivary nucleus in the lower pons relay partly in the sphenopalatine ganglion (postganglionic fibres supply the lacrimal and nasal glands) and partly, via the chorda tympani branch, in the submandibular ganglion (postganglionic fibres supply the submandibular and sublingual salivary glands); the function throughout is secretomotor and vasodilator, so salivary secretion here is accompanied by vasodilatation. The glossopharyngeal nerve (IX): preganglionic fibres from the inferior salivary nucleus (junction of pons and medulla) relay in the otic ganglion; postganglionic fibres supply the parotid gland, secretomotor and vasodilator.',
      objective: 'Match each of cranial nerves III, VII and IX to its preganglionic nucleus, relay ganglion and effector organ.',
      pitfall: 'Assuming any one cranial nerve carries the whole head-and-neck parasympathetic supply — three separate nerves (III, VII, IX) each serve a distinct effector (eye; lacrimal/nasal/submandibular/sublingual glands; parotid gland respectively), each through its own dedicated ganglion.',
      subject: 'neuro',
      primary: 'DIS-PHY-T07',
      secondary: [],
      modulePath: '102 INT > Physiology > Autonomic nervous system > Parasympathetic nervous system',
      type: 'structure_function_relationship',
      aliases: ['Edinger-Westphal nucleus', 'Ciliary ganglion', 'Sphenopalatine ganglion', 'Otic ganglion', 'Chorda tympani'],
    },
    {
      key: 'parasympathetic-function-pelvic-viscera',
      label:
        'Parasympathetic outflow to the pelvis leaves the cord as the pelvic splanchnic nerves from S2–S4, relays in terminal ganglia near the organs, and produces defecation, micturition, erection and female genital vasodilatation',
      definition:
        'The parasympathetic supply to pelvic viscera originates from preganglionic fibres in the second, third and fourth sacral segments, runs as the pelvic splanchnic nerve (nervi erigentes), and relays in terminal ganglia inside or close to the organ. Its effects: defecation (contraction of the rectal wall, relaxation of the internal anal sphincter), micturition (contraction of the bladder wall, relaxation of the internal urethral sphincter), erection (vasodilatation of the penile blood vessels), and variable vasodilator effects on the female genital organs.',
      objective: 'State the sacral origin and terminal-ganglion relay of pelvic parasympathetic outflow, and list its four named effects.',
      pitfall: 'Reversing the bladder/rectum pattern with the sympathetic one — parasympathetic stimulation relaxes the sphincter and contracts the organ wall (evacuation), the exact opposite of the sympathetic pattern (contracts the sphincter, relaxes the wall — retention).',
      subject: 'neuro',
      primary: 'DIS-PHY-T07',
      secondary: [],
      modulePath: '102 INT > Physiology > Autonomic nervous system > Parasympathetic nervous system',
      type: 'structure_function_relationship',
      aliases: ['Nervi erigentes', 'Sacral parasympathetic outflow'],
    },
    {
      key: 'sympathetic-regional-effects-abdomen-pelvis-limbs',
      label: 'Sympathetic fibres to the abdomen leave the paravertebral chain as splanchnic nerves from T5–T12, relaxing gut muscle and contracting its sphincters, releasing adrenal catecholamines, and mediating pelvic ejaculation and limb glycogenolysis',
      definition:
        'The sympathetic nervous system is thoracolumbar, originating from the lateral horn cells of all thoracic segments and the upper two lumbar segments — of the autonomic system\'s two divisions, only the sympathetic has this thoracolumbar cell-column origin, in contrast to the parasympathetic\'s cranio-sacral one (cranial nerves III/VII/IX/X plus sacral segments S2–S4). Preganglionic fibres to abdominal viscera specifically arise from T5–T12 and pass through the paravertebral chain as splanchnic nerves to relay in collateral ganglia, producing relaxation of gut smooth muscle with contraction of its sphincters, hepatic glycogenolysis, splenic-capsule contraction and adrenal medulla catecholamine release; fibres to pelvic viscera (T12–L2) produce ejaculation and genital vasoconstriction.',
      objective: 'Name the sympathetic system as thoracolumbar in origin (all thoracic segments plus upper two lumbar), distinct from the parasympathetic\'s cranio-sacral origin.',
      pitfall: 'Confusing the sympathetic\'s thoracolumbar origin with the parasympathetic\'s cranio-sacral one when only single-word options are offered — of a list like "cranial nerves / lumbar / sacral / cervical", only "lumbar" names any part of the true sympathetic origin, since the others belong to the parasympathetic outflow or to a relay station rather than a cell-body origin.',
      subject: 'neuro',
      primary: 'DIS-PHY-T07',
      secondary: [],
      modulePath: '102 INT > Physiology > Autonomic nervous system > Sympathetic nervous system',
      type: 'structure_function_relationship',
      aliases: ['Splanchnic nerves', 'Sympathetic pelvic effects', 'Thoracolumbar origin'],
    },
  ],

  questions: [
    {
      key: 'MCQ-102-2093c80b-p22-q5',
      conceptKey: 'parasympathetic-cranial-nerve-relay-ganglia-head-neck',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'State that oculomotor parasympathetic stimulation prepares the eye for near vision.',
      explanations: {
        a: 'Preganglionic sympathetic (not parasympathetic) fibres to the head and neck originate from the upper two thoracic lateral horn cells — this option describes sympathetic, not parasympathetic, origin.',
        b: 'Preganglionic parasympathetic fibres relay in dedicated cranial ganglia (ciliary, sphenopalatine, submandibular, otic) or terminal ganglia — not in the paravertebral chain, which relays sympathetic fibres only.',
        c: 'Correct. Oculomotor (III) parasympathetic stimulation contracts the ciliary muscle, increasing lens power and preparing the eye for near vision — alongside constricting the pupil.',
        d: 'Parasympathetic salivary secretion (via VII and IX) is large in amount, watery and dilute — the small, concentrated, viscid pattern belongs to sympathetic stimulation instead.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p23-q8',
      conceptKey: 'parasympathetic-function-thoracic-abdominal-viscera',
      difficulty: 'Hard',
      questionType: 'Mechanism',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The two OCR passes disagreed between options A and C, but the book contradicts both: increased vagal activity *decreases* coronary blood flow (not increases it, ruling out A), and the vagus\'s named salivary-adjacent effect is on the gastrointestinal glands, not the salivary glands specifically (which are supplied by the facial and glossopharyngeal nerves, ruling out C as the book states it). The option the book actually supports is D ("evacuation of the gall bladder": "contraction of the wall and relaxation of the sphincter of Oddi", physical p160), which neither OCR pass named — an apparent key-row misalignment rather than a genuine ambiguity between A and C. Excluded rather than overridden to an option neither pass proposed.',
    },
    {
      key: 'MCQ-102-2093c80b-p24-q12',
      conceptKey: 'parasympathetic-function-thoracic-abdominal-viscera',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'State that vagal stimulation decreases the heart\'s oxygen consumption.',
      explanations: {
        a: 'Backwards. Vagal (parasympathetic) stimulation causes bronchoconstriction, not dilation, of the bronchi and bronchioles.',
        b: 'Backwards. The vagus inhibits *atrial* cardiac muscle only, and explicitly does not supply the ventricles at all — there is no ventricular contraction for it to inhibit.',
        c: 'Correct. Vagal stimulation decreases coronary blood flow and the heart\'s oxygen consumption, alongside slowing the atria.',
        d: 'Backwards. Vagal stimulation is *secretory* to the pancreas (and GIT glands and liver), not inhibitory.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p24-q14',
      conceptKey: 'parasympathetic-cranial-nerve-relay-ganglia-head-neck',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'State that parasympathetic fibres contract the ciliary muscle for near vision.',
      explanations: {
        a: 'Backwards. Parasympathetic stimulation causes bronchoconstriction, not dilation, of the bronchi and bronchioles.',
        b: 'Backwards. Parasympathetic secretion to the salivary glands is large in amount and watery/dilute, not small and viscid — the small, concentrated pattern is the sympathetic one.',
        c: 'Correct. Parasympathetic (oculomotor) stimulation contracts the ciliary muscle, increasing the lens\'s power and helping the eye focus for near vision.',
        d: 'Backwards. The vagus (cranial nerve X), not the oculomotor nerve, carries about 75% of all parasympathetic fibres — the oculomotor nerve\'s parasympathetic component is a small fraction of the total by comparison.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p25-q22',
      conceptKey: 'parasympathetic-function-thoracic-abdominal-viscera',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Recognise that vagal stimulation decreases, not increases, heart rate.',
      explanations: {
        a: 'Correct — the exception. Vagal (parasympathetic) stimulation slows, not increases, atrial activity — accelerating the heart is a sympathetic effect, the opposite of what the vagus does.',
        b: 'Dilatation of pulmonary vessels is a genuine vagal effect (alongside bronchoconstriction and bronchial gland stimulation), so it is not the exception.',
        c: 'Increased gastric secretion is a genuine vagal effect (secretomotor to GIT glands), so it is not the exception.',
        d: 'Contraction of the gall bladder wall is a genuine vagal effect (evacuation of the gall bladder), so it is not the exception.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p26-q24',
      conceptKey: 'parasympathetic-function-thoracic-abdominal-viscera',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Recognise that parasympathetic stimulation causes bronchoconstriction, not bronchodilation.',
      explanations: {
        a: 'Decreased heart rate is a genuine parasympathetic (vagal) effect on the atria, so it is not the exception.',
        b: 'Correct — the exception. Parasympathetic stimulation causes bronchoconstriction, the opposite of bronchodilation, which is instead a sympathetic effect on the lungs.',
        c: 'Increased gastric secretion is a genuine parasympathetic (vagal) effect, so it is not the exception.',
        d: 'Urination (contraction of the bladder wall, relaxation of the internal urethral sphincter) is a genuine parasympathetic (sacral) effect, so it is not the exception.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p26-q25',
      conceptKey: 'parasympathetic-function-thoracic-abdominal-viscera',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'State that the vagus does not supply the cardiac ventricles.',
      explanations: {
        a: 'The atria genuinely are supplied by parasympathetic (vagal) fibres, which inhibit atrial cardiac muscle, so this is not the exception.',
        b: 'Correct — the exception. The book states explicitly that the vagus does not supply the ventricles — the one chamber of the heart parasympathetic fibres do not reach.',
        c: 'The gall bladder genuinely is supplied by parasympathetic (vagal) fibres, causing its evacuation, so it is not the exception.',
        d: 'The salivary glands genuinely are supplied by parasympathetic fibres (via the facial and glossopharyngeal nerves), so it is not the exception.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p26-q28',
      conceptKey: 'parasympathetic-function-thoracic-abdominal-viscera',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'State that parasympathetic and sympathetic effects on intestinal smooth muscle are opposite.',
      explanations: {
        a: 'Correct. Parasympathetic stimulation contracts intestinal smooth muscle and relaxes its sphincters, while sympathetic stimulation relaxes the muscle and contracts the sphincters — a directly opposite pairing on the same tissue.',
        b: 'Backwards. Preganglionic parasympathetic fibres are typically short (relaying close to or in the organ, e.g. terminal ganglia) while postganglionic fibres are correspondingly short too — the book\'s point about long/short fibre length is that parasympathetic postganglionic fibres are short (1 mm to several cm), not that they are longer than the preganglionic ones.',
        c: 'Vasodilatation in skeletal muscle during exercise is mediated by sympathetic cholinergic vasodilator fibres, not by parasympathetic fibres, which do not supply skeletal muscle blood vessels at all.',
        d: 'Sweat glands are supplied by sympathetic (cholinergic) fibres, not parasympathetic ones — sweating is not a parasympathetic effect in this book\'s account.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p26-q29',
      conceptKey: 'parasympathetic-function-thoracic-abdominal-viscera',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'State that vagal stimulation contracts the gall bladder.',
      explanations: {
        a: 'Backwards. Vagal stimulation *reduces* the force of ventricular contraction — but the book is explicit that the vagus does not supply the ventricles at all, so this specific claim about ventricular force is itself unsupported, not merely a wrong-direction error.',
        b: 'Vagal effects on the salivary glands are not part of the vagus\'s named remit — salivary secretion and vasodilatation come from the facial and glossopharyngeal nerves, not the vagus.',
        c: 'Backwards. Vagal stimulation causes bronchoconstriction, not bronchodilation.',
        d: 'Correct. Vagal stimulation evacuates the gall bladder — contraction of its wall together with relaxation of the sphincter of Oddi.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p27-q30',
      conceptKey: 'parasympathetic-cranial-nerve-relay-ganglia-head-neck',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Name cranial nerves III, VII, IX and X as the parasympathetic cranial outflow.',
      answerOverride: 'a',
      answerOverrideReason:
        'The two OCR passes disagreed between A (III, VII, IX, X) and B (VI, VII, VIII, IX). The book names exactly III (Edinger-Westphal nucleus, physical p159), VII (superior salivary nucleus, p159), IX (inferior salivary nucleus, p159) and X (vagal nucleus, p160) as the four cranial nerves carrying preganglionic parasympathetic fibres. Option B substitutes VI (abducens) and VIII (vestibulocochlear) — neither of which the book names as parasympathetic — for III and X, which makes B unsupportable.',
      explanations: {
        a: 'Correct. The book names cranial nerves III (oculomotor, Edinger-Westphal nucleus), VII (facial, superior salivary nucleus), IX (glossopharyngeal, inferior salivary nucleus) and X (vagus, vagal nucleus) as the four carrying preganglionic parasympathetic fibres.',
        b: 'Cranial nerves VI (abducens, a purely motor nerve to the lateral rectus) and VIII (vestibulocochlear, a purely sensory nerve) carry no parasympathetic fibres at all — this option substitutes them for the correct III and X.',
        c: 'This option keeps VII and IX correctly but drops III (oculomotor) in favour of VI, which the book never names as parasympathetic.',
        d: 'This option is missing X (vagus) entirely, which carries about 75% of all parasympathetic fibres — the single largest component of the cranial outflow cannot be left off the list.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p27-q33',
      conceptKey: 'parasympathetic-function-pelvic-viscera',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'State that pelvic parasympathetic stimulation contracts the bladder wall and relaxes the internal urethral sphincter.',
      explanations: {
        a: 'Backwards. Parasympathetic stimulation *contracts* the rectal wall while *relaxing* the internal anal sphincter (defecation) — this option gives the reverse pairing, closer to the sympathetic (retention) pattern.',
        b: 'Backwards. Vasodilatation of penile blood vessels *causes* erection, it does not cause vasoconstriction — this option states an effect (vasoconstriction) that contradicts erection\'s own mechanism.',
        c: 'Correct. Parasympathetic pelvic stimulation contracts the bladder wall and relaxes the internal urethral sphincter, producing micturition.',
        d: 'Ejaculation of semen is a sympathetic pelvic effect (contraction of the vas deferens, seminal vesicles and prostate), not a parasympathetic one.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p28-q36',
      conceptKey: 'parasympathetic-cranial-nerve-relay-ganglia-head-neck',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'State that parasympathetic action on the salivary glands is vasodilation with secretion.',
      explanations: {
        a: 'Backwards. Parasympathetic action on the salivary glands is secretomotor *and vasodilator*, not vasoconstrictor — vasoconstriction paired with secretion is closer to a mixed pattern the book does not describe for this division.',
        b: 'Correct. The facial and glossopharyngeal nerves\' parasympathetic function on the salivary glands is secretomotor and vasodilator — vasodilation accompanies the (large, watery) secretion they produce.',
        c: 'Backwards. Parasympathetic stimulation *causes* secretion, it does not inhibit it — inhibition of secretion is not a pattern this book describes for either division.',
        d: 'Backwards on both counts. Parasympathetic action is vasodilator, not vasoconstrictor, and it stimulates rather than inhibits secretion.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p29-q44',
      conceptKey: 'parasympathetic-cranial-nerve-relay-ganglia-head-neck',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'State that oculomotor (parasympathetic) stimulation prepares the eye for near vision.',
      explanations: {
        a: 'Bronchodilatation is a sympathetic effect on the lungs, unrelated to oculomotor nerve stimulation, which acts on the eye alone.',
        b: 'Backwards. Oculomotor parasympathetic stimulation *constricts* the pupil (miosis, via the constrictor pupillae) — dilatation of the pupil (mydriasis) is instead the sympathetic effect, via the dilator pupillae.',
        c: 'Retention of urine is a sympathetic pelvic effect (internal urethral sphincter contraction), unrelated to the oculomotor nerve.',
        d: 'Correct. Oculomotor parasympathetic stimulation contracts the ciliary muscle, increasing the lens\'s refractive power and preparing the eye for near vision, alongside constricting the pupil.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p29-q45',
      conceptKey: 'parasympathetic-cranial-nerve-relay-ganglia-head-neck',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Name the facial nerve as a carrier of parasympathetic fibres.',
      explanations: {
        a: 'Correct. The facial nerve (cranial nerve VII) carries preganglionic parasympathetic fibres from the superior salivary nucleus, relaying in the sphenopalatine and submandibular ganglia to the lacrimal, nasal, submandibular and sublingual glands.',
        b: 'The trigeminal nerve (V) is chiefly sensory to the face plus motor to the muscles of mastication — it carries no parasympathetic fibres of its own.',
        c: 'The hypoglossal nerve (XII) is a purely motor nerve to the tongue muscles — it carries no parasympathetic fibres.',
        d: 'The optic nerve (II) is a purely sensory nerve for vision — it carries no motor or parasympathetic fibres at all.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p30-q47',
      conceptKey: 'sympathetic-regional-effects-abdomen-pelvis-limbs',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Identify the lumbar segments as part of the sympathetic (thoracolumbar) origin.',
      explanations: {
        a: 'Cranial nerves carry the parasympathetic outflow (III, VII, IX, X), not the sympathetic system, which has no cranial-nerve component.',
        b: 'Correct, as the best available answer among these four. The sympathetic nervous system is described as thoracolumbar, originating from the lateral horn cells of all thoracic segments *and* the upper two lumbar segments — of the four options offered, only "lumbar segments" names any part of that true origin; the other three (cranial nerves, sacral segments, cervical segments) are parasympathetic or unrelated locations.',
        c: 'Sacral segments (S2–S4) are the origin of the *parasympathetic* pelvic outflow, not the sympathetic system, which the book describes as thoracolumbar.',
        d: 'Cervical segments contribute no preganglionic sympathetic cell bodies at all — sympathetic fibres to the head and neck originate from upper thoracic segments and only *relay* in the cervical ganglia, further up the paravertebral chain.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p30-q48',
      conceptKey: 'parasympathetic-cranial-nerve-relay-ganglia-head-neck',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Identify cranial nerve III (oculomotor) as a carrier of parasympathetic fibres.',
      explanations: {
        a: 'Cranial nerve IV (trochlear) is a purely motor nerve to the superior oblique eye muscle — it carries no parasympathetic fibres.',
        b: 'Correct. Cranial nerve III (oculomotor) carries preganglionic parasympathetic fibres from the Edinger-Westphal nucleus, relaying in the ciliary ganglion.',
        c: 'Cranial nerve XI (accessory) is a purely motor nerve to the sternocleidomastoid and trapezius — it carries no parasympathetic fibres.',
        d: 'Cranial nerve VIII (vestibulocochlear) is a purely sensory nerve for hearing and balance — it carries no parasympathetic fibres.',
      },
    },
    // Pass 1 (2026-08-27) note: neither MCQ-102-b21bbb80-p9-q48 ("The
    // following cranial nerve carries parasympathetic nerve fibers") nor
    // MCQ-102-b21bbb80-p7-q36 ("The action of parasympathetic in the
    // salivary glands") is authored here. Both are the same questions as
    // MCQ-102-2093c80b-p30-q48 above and MCQ-102-2093c80b-p28-q36 in this
    // same file respectively (same stems, same options, same printed keys),
    // sighted in a different source book the extractor's cross-book dedup
    // did not link via `duplicateOf`. Logged in PROGRESS-102-mcq.md rather
    // than authored twice.
  ],
}
