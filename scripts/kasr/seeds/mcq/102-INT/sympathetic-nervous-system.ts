/**
 * `102 INT > Physiology > Autonomic nervous system > Sympathetic nervous
 * system` — the question books' MCQs.
 *
 * Eight rows. The existing concept from the hand-authored physiology batch
 * (`sympathetic-alarm-stress-response`) covers only the systemic "fight or
 * flight" bullet list, not the book's much longer region-by-region account
 * (eye, skin, glands, heart, lungs, abdominal viscera, pelvis, limbs), so two
 * new concepts are minted for that regional content. One OCR key conflict is
 * resolved by cross-referencing a near-identical sibling question in the
 * same book; two rows are excluded as structurally broken.
 */
import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Sympathetic nervous system',
  modulePath: '102 INT > Physiology > Autonomic nervous system > Sympathetic nervous system',
  articleId: 'ART-102-PHY-SYMPATHETIC-NERVOUS-SYSTEM',

  concepts: [
    {
      key: 'sympathetic-alarm-stress-response',
      label: 'The sympathetic system discharges as one unit in an emergency, and everything it does — dilating the pupil, accelerating the heart, constricting skin vessels, raising alertness, freeing glucose and fatty acids — is a preparation for flight, fear or fight',
      definition:
        'The sympathetic nervous system discharges as one unit in emergency situations, preparing the individual for flight, fear or fight: dilating the pupils to let in more light; accelerating the heartbeat and raising blood pressure for better perfusion of vital organs and muscles; constricting skin blood vessels to limit bleeding from wounds; lowering the threshold in the brain\'s reticular formation to reinforce alertness; and stimulating lipolysis and glycogenolysis to supply more energy.',
      objective: 'List the alarm response\'s effects as a single coordinated discharge, not five independent mechanisms.',
      pitfall: 'Treating skin vasoconstriction in the alarm response as a temperature-regulation effect — it is a wound-limiting, blood-conserving effect specific to the emergency response, distinct from thermoregulatory sweating/vasodilation.',
      subject: 'neuro',
      primary: 'DIS-PHY-T07',
      secondary: [],
      modulePath: '102 INT > Physiology > Autonomic nervous system > Sympathetic nervous system',
      type: 'mechanism',
      aliases: ['Fight or flight', 'Stress response'],
    },
    {
      key: 'sympathetic-regional-effects-head-neck-thorax',
      label: 'Sympathetic stimulation dilates the pupil, widens the eyelids, secretes thick viscid saliva, and speeds and strengthens the heart while dilating its own coronary vessels and dilating the bronchi',
      definition:
        'Sympathetic effects on the head and neck (preganglionic from T1–T2, relaying in the cervical ganglia): contraction of dilator pupillae (mydriasis), contraction of upper-eyelid smooth muscle (widens the palpebral fissure, increasing the field of vision), vasoconstriction of conjunctival vessels, sweat-gland secretion and cutaneous vasoconstriction, salivary secretion that is small in amount, concentrated and viscid (mainly from the submaxillary gland), increased cerebral blood flow (via raised systemic pressure, despite mild direct constriction of cerebral vessels), and increased mental alertness. Sympathetic effects on the thoracic viscera (preganglionic from the upper four thoracic segments): increased heart rate, contractile force, excitability and conduction velocity, with indirect coronary vasodilatation; bronchodilatation with mild pulmonary vasoconstriction. Horner\'s syndrome — miosis, ptosis, anhydrosis and warm red skin, all on the side of the lesion — follows a lesion of the cervical sympathetic chain, the reverse pattern of normal sympathetic head-and-neck effects.',
      objective: 'Name the sympathetic effect on each head/neck/thoracic organ, and recognise Horner\'s syndrome as the loss (reverse) of the normal sympathetic pattern.',
      pitfall: 'Assuming every sympathetic vascular effect is vasoconstriction — coronary vessels dilate (indirectly) under sympathetic stimulation, the opposite of the vasoconstriction seen in skin and conjunctival vessels from the same discharge.',
      subject: 'neuro',
      primary: 'DIS-PHY-T07',
      secondary: [],
      modulePath: '102 INT > Physiology > Autonomic nervous system > Sympathetic nervous system',
      type: 'structure_function_relationship',
      aliases: ['Horner\'s syndrome', 'Mydriasis', 'Cardiac sympathetic effects'],
    },
    {
      key: 'sympathetic-regional-effects-abdomen-pelvis-limbs',
      label: 'Sympathetic fibres to the abdomen leave the paravertebral chain as splanchnic nerves from T5–T12, relaxing gut muscle and contracting its sphincters, releasing adrenal catecholamines, and mediating pelvic ejaculation and limb glycogenolysis',
      definition:
        'Sympathetic effects on abdominal viscera (preganglionic from T5–T12, passing through the paravertebral chain without relay as greater [T5–T9, to coeliac and superior mesenteric ganglia], lesser [T10–T11, to aorticorenal and superior mesenteric ganglia] and least [T12, to aorticorenal ganglion] splanchnic nerves): relaxation of stomach/small-intestine/proximal-large-intestine smooth muscle with contraction of sphincters (e.g. pyloric); vasoconstriction of most abdominal arterioles; hepatic glycogenolysis (raising blood glucose); splenic-capsule contraction (releasing stored blood); and adrenal medulla secretion of adrenaline and noradrenaline. On pelvic viscera (preganglionic from T12–L2): contraction of the vas deferens, seminal vesicles and prostate (ejaculation), and vasoconstriction of pelvic/external-genital vessels (penile shrinkage during the sexual act). On limbs: piloerection and, in skeletal muscle, increased glycogenolysis, strength and delayed fatigue. On metabolism generally: basal metabolic rate can rise up to 100%, blood glucose and lipids rise, and clotting is enhanced.',
      objective: 'Trace the splanchnic-nerve route from thoracolumbar origin to abdominal collateral ganglia, and name the sympathetic effects on gut motility, the adrenal medulla, and pelvic ejaculation.',
      pitfall: 'Assuming sympathetic pelvic stimulation causes erection — it is the opposite: sympathetic stimulation causes ejaculation and, through vasoconstriction, shrinkage of the penis, while erection is a parasympathetic (vasodilator) effect.',
      subject: 'neuro',
      primary: 'DIS-PHY-T07',
      secondary: [],
      modulePath: '102 INT > Physiology > Autonomic nervous system > Sympathetic nervous system',
      type: 'structure_function_relationship',
      aliases: ['Splanchnic nerves', 'Sympathetic pelvic effects', 'Ejaculation mechanism'],
    },
  ],

  questions: [
    {
      key: 'MCQ-102-2093c80b-p22-q1',
      conceptKey: 'sympathetic-regional-effects-abdomen-pelvis-limbs',
      difficulty: 'Hard',
      questionType: 'Structure and function',
      learningObjective: 'Identify GI smooth-muscle relaxation with sphincter contraction as a true sympathetic effect.',
      answerOverride: 'd',
      answerOverrideReason:
        'The two OCR passes disagreed between A and D. The book contradicts A: sympathetic stimulation causes indirect *vasodilatation* of coronary vessels (not constriction, grouped with cutaneous and pulmonary constriction as this option does), so A is false. D matches the book directly ("Relaxation of the plain muscles of the wall of the stomach, small intestine... Contraction of the sphincters e.g. the pyloric sphincter", physical p157). A near-identical sibling question in the same book (`MCQ-102-2093c80b-p23-q10`, same stem, options b–d unchanged) carries an unambiguous printed key of D, confirming the reading.',
      explanations: {
        a: 'Sympathetic stimulation causes vasoconstriction of cutaneous and (mildly) pulmonary vessels, but the *opposite* — indirect vasodilatation — of the coronary vessels; grouping all three together as constriction is false for the coronary case.',
        b: 'Backwards. Sympathetic stimulation *contracts* the dilator pupillae to widen the pupil (mydriasis) — it does not relax the radial muscle, and the description of the mechanism is inverted.',
        c: 'Backwards. Sympathetic stimulation to the salivary glands gives a small amount of thick, concentrated, viscid saliva — large amounts of dilute watery saliva are the parasympathetic secretion pattern instead.',
        d: 'Sympathetic stimulation relaxes the smooth muscle of the stomach, small intestine and proximal large intestine while contracting the sphincters (e.g. pyloric) — confirmed unambiguously by a near-identical sibling question carrying an unambiguous printed key.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p23-q10',
      conceptKey: 'sympathetic-regional-effects-abdomen-pelvis-limbs',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'State that sympathetic stimulation relaxes GI smooth muscle while contracting its sphincters.',
      explanations: {
        a: 'Sympathetic stimulation dilates coronary vessels indirectly, the opposite of the constriction this option groups it with alongside the pulmonary vessels.',
        b: 'Backwards. Sympathetic stimulation contracts the dilator pupillae (mydriasis); it does not relax the radial muscle to dilate the pupil by relaxation.',
        c: 'Backwards. Sympathetic salivary secretion is small, thick and viscid, not large and watery — that pattern belongs to parasympathetic stimulation.',
        d: 'Sympathetic stimulation relaxes gastrointestinal smooth muscle while contracting its sphincters, the standard pattern for the abdominal viscera.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p24-q13',
      conceptKey: 'sympathetic-regional-effects-abdomen-pelvis-limbs',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'State that sympathetic stimulation to the pelvis produces ejaculation and penile shrinkage.',
      explanations: {
        a: 'Sympathetic fibres to the pelvic viscera contract the vas deferens, seminal vesicles and prostate (ejaculation) and vasoconstrict pelvic/genital vessels, causing shrinkage of the penis during the sexual act.',
        b: 'Backwards on the segments. Sympathetic pelvic fibres originate from the 12th thoracic and upper two lumbar segments, not "all lumbar and upper 2 sacral" — sacral segments belong to the parasympathetic outflow instead.',
        c: 'Backwards. Sympathetic stimulation *vasoconstricts* pelvic blood vessels (contributing to penile shrinkage), it does not vasodilate them — vasodilatation of penile vessels is the parasympathetic erection mechanism.',
        d: 'Backwards on both halves. Sympathetic stimulation *contracts* the internal anal sphincter (retention of faeces) and, for the bladder, contracts the internal urethral sphincter to mediate urinary retention — not micturition, which is a parasympathetic effect.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p24-q16',
      conceptKey: 'sympathetic-regional-effects-head-neck-thorax',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'State that sympathetic stimulation increases cerebral blood flow and mental alertness.',
      explanations: {
        a: 'Backwards. Sympathetic stimulation *contracts* the ciliary muscle\'s relaxation is a parasympathetic effect preparing the eye for *near*, not far, vision — sympathetic stimulation does not increase lens power for distance vision this way.',
        b: 'Backwards. Sympathetic stimulation causes cutaneous *vaso*constriction, not vasodilation, and its secretory effect on sweat glands is unrelated to the direction of skin vessel calibre here.',
        c: 'Sympathetic stimulation raises systemic arterial blood pressure, which increases cerebral blood flow despite mild direct constriction of cerebral vessels, and increases mental alertness by lowering the reticular formation\'s threshold.',
        d: 'Backwards. Sympathetic stimulation contracts the *upper* eyelid\'s smooth muscle to widen the palpebral fissure — this option names the lower eyelid, which is not the muscle involved.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p24-q17',
      conceptKey: 'sympathetic-regional-effects-abdomen-pelvis-limbs',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Place the greater splanchnic nerve\'s origin in the lower thoracic segments.',
      explanations: {
        a: 'Backwards. The greater splanchnic nerve carries *preganglionic*, not postganglionic, sympathetic fibres — it passes through the paravertebral chain without relaying, on its way to synapse in a collateral ganglion.',
        b: 'Backwards. The greater splanchnic nerve passes through the paravertebral chain *without* relaying there — it relays instead in the coeliac and superior mesenteric ganglia (collateral ganglia), further from the cord.',
        c: 'The greater splanchnic nerve\'s origin lies among the lower thoracic segments (T5–T9) that supply the abdominal viscera, in contrast to the upper four thoracic segments that supply the thoracic viscera.',
        d: 'The greater splanchnic nerve supplies abdominal, not pelvic, viscera — pelvic preganglionic sympathetic fibres instead leave as lumbar and sacral splanchnic nerves from lower segments (T12–L2).',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p26-q26',
      conceptKey: 'sympathetic-alarm-stress-response',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Only three option slots survived extraction (`suspect: "option count"`), and the third slot itself has run on into what reads like a fourth option\'s text merged in ("Accomodation of the eye to near vision. Evacuation of the urinary bladder under resting conditions.d") — a genuinely broken four-option contract. Recoverable only by rescanning the source page.',
    },
    {
      key: 'MCQ-102-2093c80b-p26-q27',
      conceptKey: 'sympathetic-alarm-stress-response',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Name skin-blood-vessel constriction as part of the sympathetic "fight or flight" response.',
      explanations: {
        a: 'Backwards. The sympathetic "fight or flight" response *raises* arterial blood pressure (for better perfusion of vital organs and muscles), it does not decrease it.',
        b: 'Backwards. The sympathetic response *dilates* the pupil (letting in more light), it does not decrease pupil diameter.',
        c: 'The alarm response constricts skin blood vessels, which limits bleeding from wounds — a decrease in the diameter of skin blood vessels.',
        d: 'Backwards. The sympathetic response *raises* blood glucose (via lipolysis and glycogenolysis, supplying more energy), it does not decrease it.',
        e: 'Backwards. The sympathetic response accelerates, not decreases, heart rate — part of preparing for better perfusion during the emergency.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p30-q50',
      conceptKey: 'sympathetic-alarm-stress-response',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'The extraction has folded the printed answer-key grid for the whole chapter directly into options D and E (`suspect: "option ran on"`), and no printed answer for this specific item survives separately from that key-grid text (`correctSource: "none"`). Recoverable only by rescanning the source page and reading the grid as a table rather than running text.',
    },
  ],
}
