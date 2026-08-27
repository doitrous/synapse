/**
 * `102 INT > Physiology > Autonomic nervous system > Autonomic ganglia` —
 * the question books' MCQs.
 *
 * Six rows. Four reuse the leaf's own existing concept; one needs a new
 * concept for nicotinic/muscarinic receptor distribution (declared in full
 * in the Chemical-transmission leaf, where most of its evidence sits); one
 * OCR key conflict is resolved from the book; one row is excluded as
 * structurally broken (the printed key grid and the next question's stem
 * bled into its own option text during extraction).
 */
import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Autonomic ganglia',
  modulePath: '102 INT > Physiology > Autonomic nervous system > Autonomic ganglia',
  articleId: 'ART-102-PHY-AUTONOMIC-GANGLIA',

  concepts: [
    {
      key: 'autonomic-ganglia-types',
      label: 'There are four types of autonomic ganglion — the paravertebral sympathetic chain, the collateral ganglia, the terminal ganglia, and the adrenal medulla as a modified sympathetic ganglion',
      definition:
        'A ganglion is a collection of neurons outside the CNS, containing the mother neurons of postganglionic nerve fibres. Each preganglionic axon synapses on 8–9 postganglionic cell bodies, diffusing autonomic output at a preganglionic-to-postganglionic ratio of about 1:8 or 1:9. Four types exist: (1) the paravertebral sympathetic chain, on both sides of the vertebral column, one ganglion per spinal segment (only 3 for the whole cervical region), relaying sympathetic fibres only; (2) collateral ganglia, midway between cord and viscera at the origin of major abdominal aortic branches, named after the vessel, relaying either sympathetic fibres (coeliac, superior mesenteric, aorticorenal, inferior mesenteric) or parasympathetic fibres (ciliary, sphenopalatine, submaxillary, otic); (3) terminal ganglia, near or in the visceral organ itself, relaying parasympathetic fibres with very short postganglionic fibres (1 mm to several cm); (4) the adrenal medulla, a modified sympathetic ganglion whose postganglionic cells have lost their axons and secrete catecholamines (80% adrenaline, 20% noradrenaline) directly into the blood, supplied by preganglionic cholinergic sympathetic fibres.',
      objective: 'Name all four types of autonomic ganglion, which division (sympathetic or parasympathetic) each relays, and where each sits anatomically.',
      pitfall: 'Confusing terminal ganglia (parasympathetic, near/in the organ) with the adrenal medulla (a *sympathetic* ganglion whose postganglionic cells have lost their axons) — both are described as unusual relay points, but they belong to opposite divisions.',
      subject: 'neuro',
      primary: 'DIS-PHY-T07',
      secondary: [],
      modulePath: '102 INT > Physiology > Autonomic nervous system > Autonomic ganglia',
      type: 'classification',
      aliases: ['Paravertebral chain', 'Collateral ganglia', 'Terminal ganglia', 'Adrenal medulla'],
    },
    {
      key: 'nicotinic-and-muscarinic-receptor-locations-and-effects',
      label: 'Nicotinic receptors sit in the autonomic ganglia and adrenal medulla, activated by nicotine; muscarinic receptors sit on the effector organs of parasympathetic and cholinergic-sympathetic postganglionic fibres, activated by muscarine',
      definition:
        'Acetylcholine receptors divide into two types. Nicotinic receptors, activated by nicotine, are found in the autonomic ganglia (on postganglionic-neuron membranes) and the adrenal medulla — this is the receptor that transmits the signal across the ganglionic synapse itself, regardless of whether the postganglionic fibre going on from there is sympathetic or parasympathetic. Muscarinic receptors, activated by muscarine, are found on effector cells stimulated by postganglionic parasympathetic neurons, and on the effector cells stimulated by the few postganglionic sympathetic fibres that remain cholinergic (sweat glands, and vasodilator fibres to skeletal muscle blood vessels).',
      objective: 'State which receptor subtype (nicotinic or muscarinic) sits at the ganglionic synapse versus at the effector organ, and which agonist activates each.',
      pitfall: 'Assuming the ganglionic synapse\'s transmitter and receptor identity depends on which division (sympathetic/parasympathetic) is being relayed — it does not. All preganglionic fibres of both divisions release acetylcholine onto nicotinic receptors; the sympathetic/parasympathetic distinction only shows up later, in what the postganglionic fibre releases at the effector organ.',
      subject: 'neuro',
      primary: 'DIS-PHY-T07',
      secondary: [],
      modulePath: '102 INT > Physiology > Autonomic nervous system > Chemical transmission at autonomic junctions and autonomic receptors',
      type: 'structure_function_relationship',
      aliases: ['Nicotinic receptors', 'Muscarinic receptors', 'Ganglionic transmission'],
    },
  ],

  questions: [
    {
      key: 'MCQ-102-2093c80b-p23-q7',
      conceptKey: 'autonomic-ganglia-types',
      difficulty: 'Hard',
      questionType: 'Classification',
      learningObjective: 'State that a ganglion relays between one preganglionic and 8–9 postganglionic fibres.',
      answerOverride: 'c',
      answerOverrideReason:
        'The two OCR passes disagreed between options C and D, but the book supports only C: each preganglionic axon synapses on 8–9 postganglionic cell bodies, giving a 1:8–1:9 ratio (physical p152). Option D ("terminal ganglia are modified sympathetic ganglia") is false per the book — the adrenal medulla, not terminal ganglia, is the modified sympathetic ganglion; terminal ganglia are parasympathetic relay points near the organ.',
      explanations: {
        a: 'Backwards. A ganglion contains the mother neurons of *postganglionic* fibres, not preganglionic ones — the preganglionic fibre is what travels in to synapse there, not what originates there.',
        b: 'Backwards. A ganglion is, by definition, a collection of neurons *outside* the CNS — that is exactly what distinguishes it from a nucleus, the CNS equivalent.',
        c: 'Correct. Each preganglionic axon synapses on 8–9 postganglionic cell bodies, so a ganglion is the site of relay between one preganglionic fibre and several (8–9) postganglionic fibres — the mechanism by which autonomic output is diffused.',
        d: 'It is the adrenal medulla, not terminal ganglia, that is the modified sympathetic ganglion (with postganglionic cells that have lost their axons). Terminal ganglia instead relay parasympathetic fibres, near or inside the organ itself.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p24-q15',
      conceptKey: 'autonomic-ganglia-types',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'State that the adrenal medulla is stimulated by acetylcholine via preganglionic cholinergic sympathetic fibres.',
      explanations: {
        a: 'Backwards. The adrenal medulla is a modified *sympathetic* ganglion, not a parasympathetic one.',
        b: 'The adrenal medulla is supplied by preganglionic *cholinergic* sympathetic fibres — "adrenergic" describes the transmitter of most postganglionic sympathetic fibres, not the preganglionic fibres supplying the medulla.',
        c: 'Backwards. The adrenal medulla secretes 80% adrenaline and 20% noradrenaline, not the reverse split this option gives.',
        d: 'Correct. The preganglionic fibres supplying the adrenal medulla are cholinergic (as all preganglionic autonomic fibres are), releasing acetylcholine to stimulate the medulla\'s catecholamine release — consistent with the medulla behaving as a modified sympathetic ganglion whose "postganglionic" cells have lost their axons.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p25-q20',
      conceptKey: 'autonomic-ganglia-types',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Structurally broken by the extraction, not merely OCR-noisy: option D\'s text runs on into what is actually a *different, later* printed question ("21- Regarding autonomic ganglia: a- Paravertebral chain has 5 ganglia..."), and option E similarly bleeds together the tail of that next question\'s options with more of its own. The four real options for this question cannot be reliably separated from the next question\'s stem and options in the extracted text, and the two OCR passes additionally disagree on the key (b/d). Recoverable only by rescanning the source page.',
    },
    {
      key: 'MCQ-102-2093c80b-p28-q38',
      conceptKey: 'autonomic-ganglia-types',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'State that preganglionic parasympathetic fibres relay in collateral and terminal ganglia.',
      explanations: {
        a: 'The paravertebral sympathetic chain relays sympathetic fibres only — parasympathetic fibres never relay there.',
        b: 'Correct. Preganglionic parasympathetic fibres relay in collateral ganglia (the parasympathetic-relaying subset: ciliary, sphenopalatine, submaxillary, otic) and in terminal ganglia (near or in the organ) — the book names both as parasympathetic relay points, not one exclusively.',
        c: 'Terminal ganglia alone is too narrow — collateral ganglia also relay some parasympathetic fibres (the four named cranial ones), so "terminal ganglia only" excludes a real relay site.',
        d: 'The adrenal medulla is a *sympathetic* structure, supplied by preganglionic sympathetic fibres, not a relay point for parasympathetic ones.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p28-q39',
      conceptKey: 'autonomic-ganglia-types',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'State that preganglionic sympathetic fibres to the head and neck relay in the cervical ganglia of the paravertebral chain.',
      explanations: {
        a: 'Backwards. Preganglionic sympathetic fibres to the head and neck arise from the lateral horn cells of the first and second *thoracic* segments, not the upper four — the upper-four-thoracic origin belongs to the thoracic-viscera supply instead.',
        b: 'Correct. Preganglionic sympathetic fibres to the head and neck ascend to relay with neurons in the cervical ganglia, which are part of the paravertebral sympathetic chain.',
        c: 'The ciliary ganglion is a collateral ganglion relaying *parasympathetic* fibres (from the oculomotor nerve), not the relay point for sympathetic fibres to the head and neck.',
        d: 'Terminal ganglia relay parasympathetic fibres near the organ — sympathetic fibres to the head and neck relay in the cervical paravertebral chain, not in terminal ganglia.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p30-q49',
      conceptKey: 'nicotinic-and-muscarinic-receptor-locations-and-effects',
      difficulty: 'Easy',
      questionType: 'Mechanism',
      learningObjective: 'State that acetylcholine is the neurotransmitter inside the autonomic ganglion.',
      explanations: {
        a: 'Noradrenaline is the transmitter at most postganglionic sympathetic endings (on the effector organ), not inside the ganglion at the preganglionic-to-postganglionic synapse.',
        b: 'Adrenaline is a hormone released by the adrenal medulla into the blood, not the transmitter used at the ganglionic synapse.',
        c: 'Dopamine is a synthetic intermediate on the way to noradrenaline inside adrenergic nerve terminals; it is not the ganglionic transmitter.',
        d: 'Correct. All preganglionic autonomic fibres — sympathetic and parasympathetic alike — are cholinergic, releasing acetylcholine onto nicotinic receptors on the postganglionic neuron inside the ganglion.',
      },
    },
  ],
}
