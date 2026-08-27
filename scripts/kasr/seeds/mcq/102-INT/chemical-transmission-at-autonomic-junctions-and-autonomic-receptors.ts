/**
 * `102 INT > Physiology > Autonomic nervous system > Chemical transmission
 * at autonomic junctions and autonomic receptors` — the question books'
 * MCQs.
 *
 * Seventeen rows, the largest ANS leaf. Most reuse concepts that already
 * exist (adrenergic receptor distribution, cholinergic/adrenergic fibre
 * identity, the ganglionic nicotinic/muscarinic split declared in the
 * Autonomic-ganglia leaf, the two-neuron pathway, and abdominal sympathetic
 * effects declared in the Sympathetic leaf), plus one new concept for
 * noradrenaline/epinephrine biosynthesis and removal, which nothing existing
 * covered. Two rows are excluded: one for a genuinely irresolvable OCR key
 * conflict, one for a structurally broken option set.
 */
import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Chemical transmission at autonomic junctions and autonomic receptors',
  modulePath: '102 INT > Physiology > Autonomic nervous system > Chemical transmission at autonomic junctions and autonomic receptors',
  articleId: 'ART-102-PHY-CHEMICAL-TRANSMISSION-AT-AUTONOMIC-JUNCTIONS-AND-AUTONOMIC-RECEPTORS',

  concepts: [
    {
      key: 'nicotinic-and-muscarinic-receptor-locations-and-effects',
      label: 'Nicotinic receptors sit in the autonomic ganglia and adrenal medulla, activated by nicotine; muscarinic receptors sit on the effector organs of parasympathetic and cholinergic-sympathetic postganglionic fibres, activated by muscarine, and their stimulation slows the heart',
      definition:
        'Nicotinic receptors, activated by nicotine, sit in the autonomic ganglia (on postganglionic-neuron membranes) and the adrenal medulla — the receptor at the preganglionic-to-postganglionic synapse itself, for both divisions. Muscarinic receptors, activated by muscarine, sit on effector cells reached by postganglionic parasympathetic fibres and by the few cholinergic postganglionic sympathetic fibres. Because the heart\'s parasympathetic (vagal) supply acts through muscarinic receptors, muscarinic stimulation produces bradycardia, one of the clearest bedside signs of parasympathetic (as opposed to nicotinic/ganglionic) cholinergic action.',
      objective: 'State which receptor subtype sits at the ganglionic synapse versus at the effector organ, name each agonist, and connect muscarinic stimulation to bradycardia.',
      pitfall: 'Assuming the ganglionic synapse\'s receptor identity depends on which division is being relayed — it does not. All preganglionic fibres of both divisions act on nicotinic receptors; only the postganglionic step differs by division and by receptor subtype at the effector.',
      subject: 'neuro',
      primary: 'DIS-PHY-T07',
      secondary: [],
      modulePath: '102 INT > Physiology > Autonomic nervous system > Chemical transmission at autonomic junctions and autonomic receptors',
      type: 'structure_function_relationship',
      aliases: ['Nicotinic receptors', 'Muscarinic receptors', 'Ganglionic transmission'],
    },
    {
      key: 'adrenergic-receptor-distribution-and-actions',
      label: 'Adrenergic receptors sit both on the effector organ and on the nerve ending that released the transmitter, and the two alpha and three beta subtypes are told apart by which second messenger they move and which plain muscle they act on',
      definition:
        'Adrenergic receptors are alpha (α1, α2) or beta (β1, β2, β3), present both postsynaptically on effector organs and presynaptically as auto-receptors regulating transmitter release (alpha presynaptic decreases noradrenaline release; beta presynaptic increases it). Mechanism: α1 increases intracellular Ca2+; α2 inhibits adenylate cyclase (decreasing cAMP); β1 and β2 stimulate adenylate cyclase (increasing cAMP). Distribution and action: α1 (mainly excitatory) — vasoconstriction of skin/viscera/male-genitalia vessels, mydriasis (dilator pupillae), splenic-capsule contraction, GIT and internal urethral sphincter contraction, ejaculation; α2 (mainly inhibitory) — relaxation of intestinal smooth muscle; β1 (mainly excitatory) — cardiac acceleration and increased contractile force; β2 (mainly inhibitory) — relaxation of coronary/skeletal blood vessels, bronchioles, GIT, bladder, uterus; β3 — lipolysis. Noradrenaline excites mainly alpha receptors (with slight beta effect); adrenaline excites alpha and beta approximately equally, giving it a greater cardiac and metabolic effect, while noradrenaline\'s greater alpha affinity raises blood pressure more (via stronger vasoconstriction and total peripheral resistance).',
      objective: 'Match each adrenergic receptor subtype to its second messenger and its named tissue action, and state why noradrenaline raises blood pressure more than adrenaline while adrenaline has the greater cardiac and metabolic effect.',
      pitfall: 'Assigning cardiac stimulation to alpha receptors — cardiac acceleration and increased force are β1 (beta) effects; alpha receptors\' cardiac-adjacent role is none, and confusing the two subtypes here is the standard trap.',
      subject: 'neuro',
      primary: 'DIS-PHY-T07',
      secondary: [],
      modulePath: '102 INT > Physiology > Autonomic nervous system > Chemical transmission at autonomic junctions and autonomic receptors',
      type: 'structure_function_relationship',
      aliases: ['Alpha receptors', 'Beta receptors', 'Adrenergic receptor subtypes'],
    },
    {
      key: 'cholinergic-and-adrenergic-fibre-transmitters',
      label: 'Autonomic fibres are named for the transmitter they release: cholinergic fibres are every preganglionic fibre, every postganglionic parasympathetic fibre and two sympathetic exceptions, and adrenergic fibres are all the remaining postganglionic sympathetic ones, which secrete noradrenaline',
      definition:
        'Cholinergic fibres release acetylcholine: all preganglionic autonomic fibres (sympathetic, parasympathetic, and to the adrenal medulla), all postganglionic parasympathetic fibres, and two postganglionic sympathetic exceptions — secretory fibres to sweat glands, and vasodilator fibres to skeletal-muscle blood vessels. Adrenergic fibres release noradrenaline: every other postganglionic sympathetic fibre, i.e. all postganglionic sympathetic fibres except the two cholinergic exceptions just named. Noradrenaline is also co-secreted from the adrenal medulla alongside adrenaline.',
      objective: 'Name the two named exceptions among postganglionic sympathetic fibres that are cholinergic rather than adrenergic, and explain why "postganglionic sympathetic" does not always mean "releases noradrenaline".',
      pitfall: 'Assuming "sympathetic" and "adrenergic" are synonyms — most postganglionic sympathetic fibres are adrenergic, but sweat-gland secretory fibres and skeletal-muscle vasodilator fibres are sympathetic yet cholinergic, the two named exceptions.',
      subject: 'neuro',
      primary: 'DIS-PHY-T07',
      secondary: [],
      modulePath: '102 INT > Physiology > Autonomic nervous system > Chemical transmission at autonomic junctions and autonomic receptors',
      type: 'classification',
      aliases: ['Cholinergic fibres', 'Adrenergic fibres', 'Sympathetic cholinergic exceptions'],
    },
    {
      key: 'sympathetic-regional-effects-abdomen-pelvis-limbs',
      label: 'Sympathetic fibres to the abdomen leave the paravertebral chain as splanchnic nerves from T5–T12, relaxing gut muscle and contracting its sphincters, releasing adrenal catecholamines, and mediating pelvic ejaculation and limb glycogenolysis',
      definition:
        'Sympathetic preganglionic fibres to abdominal viscera (T5–T12) pass through the paravertebral chain without relay, leaving as the greater (T5–T9, to coeliac and superior mesenteric ganglia), lesser (T10–T11) and least (T12) splanchnic nerves. Their effects include hepatic glycogenolysis (raising blood glucose) and, via preganglionic cholinergic fibres reaching the adrenal medulla directly, secretion of adrenaline and noradrenaline into the blood — stimulation of the greater splanchnic nerve is one of the book\'s named routes to adrenal catecholamine release.',
      objective: 'Connect splanchnic-nerve stimulation to two separate sympathetic abdominal effects: hepatic glycogenolysis and adrenal medulla catecholamine secretion.',
      pitfall: 'Assuming the adrenal medulla is reached only indirectly, through hepatic or splenic effects — it has its own direct preganglionic cholinergic sympathetic supply (via the splanchnic nerves), making catecholamine release a first-order effect of splanchnic stimulation, not a downstream consequence of the other abdominal effects.',
      subject: 'neuro',
      primary: 'DIS-PHY-T07',
      secondary: [],
      modulePath: '102 INT > Physiology > Autonomic nervous system > Sympathetic nervous system',
      type: 'structure_function_relationship',
      aliases: ['Splanchnic nerves', 'Adrenal medulla secretion', 'Hepatic glycogenolysis'],
    },
    {
      key: 'autonomic-two-neuron-pathway',
      label: 'The autonomic efferent pathway to the viscera is a two-neuron chain — preganglionic and postganglionic — unlike the single-neuron somatic pathway from cord to skeletal muscle',
      definition:
        'Each somatic motor pathway from the spinal cord to a skeletal muscle is a single fibre (one-neuron system). Each autonomic, involuntary pathway is composed of two fibres in series — the preganglionic neuron (cell body in the cord or brainstem, myelinated B fibre) and the postganglionic neuron (cell body in a ganglion outside the CNS, unmyelinated C fibre) — a two-neuron system, with the synapse between them at the ganglion.',
      objective: 'State that the autonomic efferent pathway is a two-neuron relay, in contrast with the somatic system\'s single motor neuron.',
      pitfall: 'Describing the autonomic system as "two efferent pathways" (meaning sympathetic and parasympathetic) rather than "a two-neuron efferent pathway" (meaning each individual autonomic route is relayed through two neurons in series) — the book\'s point is about the number of neurons in one route, not the number of divisions.',
      subject: 'neuro',
      primary: 'DIS-PHY-T07',
      secondary: [],
      modulePath: '102 INT > Physiology > Autonomic nervous system > Organisation of autonomic nervous system',
      type: 'structure_function_relationship',
      aliases: ['Preganglionic neuron', 'Postganglionic neuron', 'Two-neuron system'],
    },
    {
      key: 'noradrenaline-synthesis-release-and-removal',
      label: 'Noradrenaline is synthesised from tyrosine through DOPA and dopamine, released by calcium-triggered exocytosis, and removed mostly by reuptake into the nerve ending with the rest cleared by diffusion and by the enzymes MAO and COMT — epinephrine is then made by methylating noradrenaline in the adrenal medulla',
      definition:
        'Noradrenaline is synthesised in adrenergic nerve terminals by hydroxylation of tyrosine to DOPA, then decarboxylation of DOPA to dopamine; inside dark granulated vesicles, dopamine is converted to noradrenaline, stored bound to ATP and the protein chromogranin. Release, like acetylcholine\'s, is by calcium-triggered exocytosis when the nerve impulse reaches the terminal. Removal, within a few seconds, is by three routes: active re-uptake into the adrenergic nerve ending itself (50–80% of the secreted amount — the dominant route); diffusion away into surrounding fluid and blood; and enzymatic destruction, by MAO (monoamine oxidase, on the outer mitochondrial membrane, deaminating noradrenaline) and COMT (catechol-O-methyl transferase, present in all tissues but not in adrenergic nerve endings themselves, methylating noradrenaline). Epinephrine (adrenaline) is synthesised in the adrenal medulla by methylation of noradrenaline.',
      objective: 'Trace noradrenaline\'s synthesis (tyrosine → DOPA → dopamine → noradrenaline), name reuptake as its dominant removal route, and state that epinephrine is made from it by methylation in the adrenal medulla.',
      pitfall: 'Naming MAO or COMT as noradrenaline\'s synthesis enzymes — both are degrading enzymes, part of removal, not synthesis; synthesis instead runs through hydroxylation (tyrosine to DOPA) and decarboxylation (DOPA to dopamine).',
      subject: 'neuro',
      primary: 'DIS-PHY-T07',
      secondary: [],
      modulePath: '102 INT > Physiology > Autonomic nervous system > Chemical transmission at autonomic junctions and autonomic receptors',
      type: 'mechanism',
      aliases: ['MAO', 'COMT', 'Catecholamine reuptake', 'Epinephrine synthesis'],
    },
  ],

  questions: [
    {
      key: 'MCQ-102-2093c80b-p22-q2',
      conceptKey: 'cholinergic-and-adrenergic-fibre-transmitters',
      difficulty: 'Hard',
      questionType: 'Mechanism',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The two OCR passes disagreed between options C and D, but the book contradicts both: muscarine *activates* muscarinic receptors (an agonist), it does not block them, ruling out C; and acetylcholine\'s effect at receptors is brief, not long — most of it is hydrolysed within a fraction of a second by acetylcholinesterase, ruling out D. The option the book actually supports is B ("released by all preganglionic sympathetic fibers": true — all preganglionic autonomic fibres are cholinergic), which neither OCR pass named. Apparent key-row misalignment; excluded rather than overridden to an option neither pass proposed.',
    },
    {
      key: 'MCQ-102-2093c80b-p22-q3',
      conceptKey: 'nicotinic-and-muscarinic-receptor-locations-and-effects',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Name nicotinic as the receptor at the sympathetic ganglionic synapse.',
      explanations: {
        a: 'Muscarinic receptors sit on effector organs reached by postganglionic parasympathetic (or cholinergic-sympathetic) fibres, not at the ganglionic synapse between pre- and postganglionic neurons.',
        b: 'Correct. The synapse between preganglionic and postganglionic sympathetic neurons uses nicotinic receptors — the same receptor type used at every autonomic ganglion, regardless of division.',
        c: 'Beta adrenergic receptors sit on effector organs reached by postganglionic adrenergic fibres, not at the ganglionic synapse, which uses acetylcholine and nicotinic receptors rather than noradrenaline.',
        d: 'Alpha adrenergic receptors, like beta, sit on effector organs, not at the ganglionic synapse.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p22-q4',
      conceptKey: 'adrenergic-receptor-distribution-and-actions',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'State that noradrenaline excites mainly alpha receptors.',
      explanations: {
        a: 'Sweat-gland secretory fibres are one of the two named cholinergic exceptions among postganglionic sympathetic fibres — they release acetylcholine, not noradrenaline.',
        b: 'Backwards. Adrenaline, not noradrenaline, is the main catecholamine the adrenal medulla secretes (80% adrenaline to 20% noradrenaline).',
        c: 'Backwards. Noradrenaline is released from postganglionic, not preganglionic, sympathetic fibres — preganglionic fibres of both divisions are cholinergic.',
        d: 'Correct. Noradrenaline excites mainly alpha receptors, exciting beta receptors only to a slight extent — the reverse of adrenaline\'s roughly equal action on both.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p23-q6',
      conceptKey: 'adrenergic-receptor-distribution-and-actions',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'State that alpha-2 receptors relax intestinal smooth muscle.',
      explanations: {
        a: 'Vasodilation is a beta-2 receptor effect (on coronary and skeletal blood vessels); alpha receptors are instead associated with vasoconstriction (alpha-1, on skin/visceral/genital vessels).',
        b: 'Correct. Alpha-2 receptors are mainly inhibitory, producing relaxation of intestinal smooth muscle.',
        c: 'Increased cardiac activity is a beta-1 receptor effect, not an alpha effect.',
        d: 'Inhibition of urinary bladder plain muscle (relaxation, allowing filling) is a beta-2 receptor effect; the alpha-1 effect on the bladder is instead contraction of the internal urethral sphincter (retention), a different tissue within the same organ.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p23-q9',
      conceptKey: 'cholinergic-and-adrenergic-fibre-transmitters',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Name the two cholinergic exceptions among postganglionic sympathetic fibres.',
      explanations: {
        a: 'Correct. Some postganglionic sympathetic fibres — the two named exceptions, secretory fibres to sweat glands and vasodilator fibres to skeletal-muscle blood vessels — release acetylcholine rather than noradrenaline.',
        b: 'Postganglionic fibres to the heart are adrenergic (release noradrenaline), one of the majority, not one of the two cholinergic exceptions.',
        c: 'Postganglionic fibres to the skin arterioles are adrenergic (vasoconstrictor, releasing noradrenaline) — the skeletal-muscle vasodilator fibres are the cholinergic exception, not the skin ones.',
        d: 'Backwards. Postganglionic fibres to the sweat glands release acetylcholine (one of the two named cholinergic exceptions), not noradrenaline.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p23-q11',
      conceptKey: 'sympathetic-regional-effects-abdomen-pelvis-limbs',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'State that sympathetic stimulation raises blood glucose by hepatic glycogenolysis.',
      explanations: {
        a: 'Backwards on the segments. Sympathetic fibres to abdominal viscera originate from T5–T12 (lower thoracic segments), not the upper 6 — the upper four thoracic segments instead supply the thoracic viscera.',
        b: 'Backwards. Postganglionic cells of the adrenal medulla have lost their axons and secrete catecholamines directly; the fibres *supplying* the adrenal medulla are preganglionic and cholinergic, not adrenergic norepinephrine-secreting fibres from their own endings.',
        c: 'Correct. Sympathetic stimulation of the liver drives glycogenolysis, breaking down stored glycogen and so increasing blood glucose level.',
        d: 'Backwards. Sympathetic stimulation *relaxes* plain muscle of the stomach/small intestine/proximal large intestine while *contracting* their sphincters — inhibition of both muscle and sphincter is not the pattern the book describes.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p25-q19',
      conceptKey: 'autonomic-two-neuron-pathway',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'State that the autonomic system is a two-neuron efferent pathway, unlike the somatic system.',
      explanations: {
        a: 'Correct. The autonomic efferent pathway is a two-neuron system (preganglionic and postganglionic), while the somatic motor pathway from cord to skeletal muscle is a single-neuron system — this is the structural difference the book highlights.',
        b: 'Backwards. The autonomic system does not originate from all segments uniformly — sympathetic outflow is thoracolumbar and parasympathetic outflow is cranio-sacral, each restricted to specific segments, unlike this option\'s "all segments" claim.',
        c: 'Backwards. The autonomic system has extensive control over the heart (both sympathetic and parasympathetic divisions act on it) — "no control on the heart" is false and describes neither division.',
        d: 'Backwards. Autonomic *afferent* fibres relay at the lateral horn or cranial nuclei, and autonomic *efferent* fibres originate from cranial nuclei or lateral horn cells — not from the anterior horn cells, which is where somatic motor neurons originate instead.',
        e: 'Backwards. The autonomic system releases two types of chemical transmitter (acetylcholine and noradrenaline) across its various fibre types, not one — releasing only acetylcholine describes the somatic system\'s single transmitter, not the autonomic system\'s two.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p25-q23',
      conceptKey: 'cholinergic-and-adrenergic-fibre-transmitters',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Recognise that most (not all) postganglionic sympathetic fibres are adrenergic, not cholinergic.',
      explanations: {
        a: 'All parasympathetic preganglionic fibres genuinely release acetylcholine (as all preganglionic autonomic fibres do), so this is not the exception.',
        b: 'All parasympathetic postganglionic fibres genuinely release acetylcholine, so this is not the exception.',
        c: 'All sympathetic preganglionic fibres genuinely release acetylcholine (as all preganglionic autonomic fibres do), so this is not the exception.',
        d: 'Correct — the exception. Most postganglionic sympathetic fibres release noradrenaline (adrenergic), not acetylcholine — only the two named exceptions (sweat gland secretory fibres, skeletal-muscle vasodilator fibres) are cholinergic, so "all sympathetic postganglionic fibres" release acetylcholine is false.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p27-q31',
      conceptKey: 'noradrenaline-synthesis-release-and-removal',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'Name reuptake as the dominant route by which noradrenaline is removed from postganglionic sympathetic endings.',
      explanations: {
        a: 'Correct. Active re-uptake into the sympathetic nerve endings themselves accounts for the removal of 50–80% of secreted noradrenaline — the dominant of the three named removal routes.',
        b: 'COMT does inactivate noradrenaline, but it is present in all tissues *except* the adrenergic nerve endings themselves — this option misplaces where COMT acts.',
        c: 'Noradrenaline is not transformed into epinephrine at the postganglionic sympathetic ending — epinephrine synthesis (by methylation of noradrenaline) occurs specifically in the adrenal medulla, a different tissue with a different enzyme.',
        d: 'Diffusion away from the nerve ending into surrounding fluid and blood is one of the three removal routes, but it is not the dominant one — reuptake accounts for the larger share (50–80%).',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p27-q32',
      conceptKey: 'sympathetic-regional-effects-abdomen-pelvis-limbs',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'State that greater splanchnic nerve stimulation causes adrenal medulla catecholamine secretion.',
      explanations: {
        a: 'Backwards. Sympathetic stimulation *relaxes*, not increases the motility of, the plain muscle of the stomach.',
        b: 'Backwards. Sympathetic stimulation is not described as increasing gastric juice secretion — secretomotor stimulation of GIT glands is a parasympathetic (vagal) effect, the opposite division.',
        c: 'Backwards. Splanchnic-nerve-driven hepatic glycogenolysis *increases*, not decreases, blood glucose level.',
        d: 'Correct. The greater splanchnic nerve carries preganglionic cholinergic sympathetic fibres directly to the adrenal medulla, and its stimulation causes secretion of adrenaline and noradrenaline into the blood.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p27-q34',
      conceptKey: 'noradrenaline-synthesis-release-and-removal',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'State that epinephrine is synthesised in the adrenal medulla by methylation of noradrenaline.',
      explanations: {
        a: 'Correct. Epinephrine (adrenaline) is synthesised in the adrenal medulla by methylating noradrenaline — the final step distinguishing the two catecholamines.',
        b: 'Backwards. Noradrenaline, not epinephrine, is the transmitter of most sympathetic postganglionic nerve fibres — epinephrine is instead a circulating hormone from the adrenal medulla.',
        c: 'Sympathetic cholinergic postganglionic fibres (sweat glands, skeletal-muscle vasodilators) release acetylcholine, not epinephrine — the two are unrelated compounds released by entirely different fibre types.',
        d: 'Epinephrine is removed by re-uptake, diffusion and enzymatic breakdown by MAO/COMT, the same routes as noradrenaline — cholinesterase is the enzyme that hydrolyses acetylcholine, not catecholamines.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p28-q35',
      conceptKey: 'noradrenaline-synthesis-release-and-removal',
      difficulty: 'Hard',
      questionType: 'Mechanism',
      learningObjective: 'Recognise that noradrenaline synthesis proceeds through hydroxylation/decarboxylation from tyrosine, not through MAO.',
      explanations: {
        a: 'Correct — the exception. Noradrenaline is synthesised from tyrosine by hydroxylation (to DOPA) and decarboxylation (to dopamine), then conversion to noradrenaline — MAO (monoamine oxidase) is a *degrading*, not synthesising, enzyme, part of noradrenaline\'s removal rather than its manufacture.',
        b: 'True, so not the exception. COMT does inactivate noradrenaline and is present broadly in tissues, including on postsynaptic neuron membranes.',
        c: 'True, so not the exception. Noradrenaline, acting mainly on alpha-1 receptors, causes contraction of the dilator pupillae muscle (mydriasis).',
        d: 'True, so not the exception. Noradrenaline\'s (mild) beta-2 stimulation, alongside the sympathetic system\'s broader effect, contributes to bronchodilation.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p28-q37',
      conceptKey: 'adrenergic-receptor-distribution-and-actions',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Recognise that increased cardiac activity is a beta, not an alpha, adrenergic effect.',
      explanations: {
        a: 'Vasoconstriction (of skin, visceral and genital blood vessels) is a genuine alpha-1 receptor effect, so it is not the exception.',
        b: 'Pupil dilation (mydriasis, via the dilator pupillae) is a genuine alpha-1 receptor effect, so it is not the exception.',
        c: 'Relaxation of intestinal wall smooth muscle is a genuine alpha-2 receptor effect, so it is not the exception.',
        d: 'Correct — the exception. Increased cardiac activity is a beta-1, not an alpha, receptor effect — alpha receptors\' actions are elsewhere (vasoconstriction, mydriasis, sphincter contraction, intestinal relaxation), never on the heart.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p29-q41',
      conceptKey: 'noradrenaline-synthesis-release-and-removal',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Only three option slots survived extraction and the fourth has run on into a fifth, mislabelled option ("Inactivation of noradrenaline e- Inactivation of acetylcholine", `suspect: "option count"`) — a genuinely broken option contract. Recoverable only by rescanning the source page; the underlying fact (MAO inactivates noradrenaline, not acetylcholine — that is acetylcholinesterase\'s job) is sound and taught by the book.',
    },
    {
      key: 'MCQ-102-2093c80b-p29-q42',
      conceptKey: 'adrenergic-receptor-distribution-and-actions',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'State that epinephrine\'s alpha-1 action contracts arteriolar smooth muscle.',
      explanations: {
        a: 'Epinephrine\'s beta-2 action *relaxes* (dilates) bronchiole smooth muscle, the opposite of contraction — this option asks for a tissue where contraction occurs, and bronchioles are not it.',
        b: 'Epinephrine\'s alpha-1 action on the eye contracts the dilator pupillae (a specific named muscle), not "pupils" generically as smooth muscle in the way this option frames it, and the tachycardia/contraction pairing the stem asks about is better matched by the vascular effect.',
        c: 'Epinephrine\'s beta-2 action *relaxes* intestinal smooth muscle, the opposite of contraction.',
        d: 'Correct. Alongside beta-1-driven tachycardia, epinephrine\'s alpha-1 action contracts (vasoconstricts) arteriolar smooth muscle in skin, viscera and genitalia — matching both halves of the stem, tachycardia and smooth-muscle contraction, in one receptor-consistent picture.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p29-q43',
      conceptKey: 'nicotinic-and-muscarinic-receptor-locations-and-effects',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'State that muscarinic receptor stimulation produces bradycardia.',
      explanations: {
        a: 'Skeletal muscle contraction is mediated by nicotinic receptors at the neuromuscular junction (a different nicotinic receptor subtype from the autonomic-ganglion one), not by muscarinic receptors, which the autonomic system does not use on skeletal muscle at all.',
        b: 'Correct. Muscarinic receptors mediate the parasympathetic (vagal) effect on the heart, which slows atrial activity — bradycardia.',
        c: 'Backwards. Muscarinic (parasympathetic) stimulation *constricts* the pupil (miosis); dilation is the sympathetic, alpha-receptor-mediated effect instead.',
        d: 'Backwards. Muscarinic stimulation of the heart slows it and, through vasodilator effects elsewhere, tends toward lower rather than higher blood pressure — hypertension is not a muscarinic-stimulation sign.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p29-q46',
      conceptKey: 'cholinergic-and-adrenergic-fibre-transmitters',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'State that skeletal-muscle blood vessels are supplied by sympathetic cholinergic vasodilator fibres.',
      explanations: {
        a: 'Correct. Skeletal-muscle blood vessels are supplied by sympathetic cholinergic vasodilator fibres — one of the two named exceptions where a sympathetic fibre releases acetylcholine rather than noradrenaline, and it is this cholinergic action (muscarinic-receptor-mediated dilation) that dilates the vessels under sympathetic stimulation.',
        b: 'Sympathetic *adrenergic* fibres (releasing noradrenaline, acting on alpha-1 receptors) cause vasoconstriction, not the vasodilation this question asks about — the dilation instead comes from the cholinergic exception fibres.',
        c: 'Parasympathetic fibres do not supply skeletal-muscle blood vessels at all — this vasodilation is a sympathetic phenomenon, achieved by the cholinergic exception among sympathetic fibres, not by the parasympathetic division.',
        d: 'Parasympathetic fibres are cholinergic, not adrenergic, throughout — "parasympathetic adrenergic" describes no real fibre type in this system, and in any case parasympathetic fibres do not reach skeletal-muscle vessels.',
      },
    },
  ],
}
