/**
 * `102 INT > Physiology > Autonomic nervous system > Organisation of
 * autonomic nervous system` — the question books' MCQs.
 *
 * Two rows. Neither actually tests this leaf's own book content (the
 * two-neuron efferent pathway and the somatic/autonomic reflex comparison
 * table, physical p151) — the bank's page-proximity `modulePathGuess`
 * dropped both here because they sit close to genuine "organisation" MCQs in
 * the combined question book. Their real content is the somatic/autonomic
 * split of what each system controls (`The nervous system` leaf) and the
 * pelvic parasympathetic outflow (`Parasympathetic nervous system` leaf), so
 * both reuse concepts declared fully in those leaves.
 */
import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Organisation of autonomic nervous system',
  modulePath: '102 INT > Physiology > Autonomic nervous system > Organisation of autonomic nervous system',
  articleId: 'ART-102-PHY-ORGANISATION-OF-THE-AUTONOMIC-NERVOUS-SYSTEM',

  concepts: [
    {
      key: 'nervous-system-anatomical-and-functional-divisions',
      label:
        'The nervous system divides anatomically into the CNS and PNS, and the PNS divides functionally into sensory and motor, with the motor half further split into the somatic system (skeletal muscle) and the autonomic system (smooth muscle, glands, cardiac muscle)',
      definition:
        'The motor half of the peripheral nervous system operates through two parallel systems: the somatic nervous system, which controls skeletal muscle throughout the body, and the autonomic nervous system, which controls smooth muscle, glands and cardiac muscle. Skeletal muscle is therefore somatic territory only — the autonomic system has no motor supply to it at all.',
      objective:
        'State which effector tissues the somatic system controls and which the autonomic system controls, and recognise skeletal muscle as the one tissue autonomic fibres do not reach.',
      pitfall:
        'Assuming "autonomic" means "everything involuntary" and forgetting that skeletal muscle reflexes (monosynaptic and polysynaptic) are somatic reflexes, not autonomic ones, even though they happen without conscious control.',
      subject: 'neuro',
      primary: 'DIS-PHY-T07',
      secondary: [],
      modulePath: '102 INT > Physiology > Autonomic nervous system > The nervous system',
      type: 'classification',
      aliases: ['Somatic vs autonomic motor divisions'],
    },
    {
      key: 'parasympathetic-function-pelvic-viscera',
      label:
        'Parasympathetic outflow to the pelvis leaves the cord as the pelvic splanchnic nerves from S2–S4, relays in terminal ganglia near the organs, and produces defecation, micturition, erection and female genital vasodilatation',
      definition:
        'The parasympathetic supply to pelvic viscera originates from preganglionic fibres in the second, third and fourth sacral segments, runs as the pelvic splanchnic nerve (nervi erigentes), and relays in terminal ganglia inside or close to the organ. Its effects: defecation (contraction of the rectal wall, relaxation of the internal anal sphincter), micturition (contraction of the bladder wall, relaxation of the internal urethral sphincter), erection (vasodilatation of the penile blood vessels), and variable vasodilator effects on the female genital organs.',
      objective:
        'State the sacral origin and terminal-ganglion relay of pelvic parasympathetic outflow, and list its four named effects.',
      pitfall:
        'Confusing the pelvic parasympathetic effect on the bladder and rectum (relaxes the sphincter, contracts the wall — evacuation) with the sympathetic effect on the same organs (contracts the sphincter, relaxes the wall — retention), which is the exact opposite pairing for both organs.',
      subject: 'neuro',
      primary: 'DIS-PHY-T07',
      secondary: [],
      modulePath: '102 INT > Physiology > Autonomic nervous system > Parasympathetic nervous system',
      type: 'structure_function_relationship',
      aliases: ['Nervi erigentes', 'Sacral parasympathetic outflow'],
    },
  ],

  questions: [
    {
      key: 'MCQ-102-2093c80b-p25-q18',
      conceptKey: 'nervous-system-anatomical-and-functional-divisions',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Identify skeletal muscle as somatic, not autonomic, territory.',
      explanations: {
        a: 'The heart is autonomic territory (cardiac muscle), reached by both sympathetic and vagal parasympathetic fibres, so it is supplied and not the exception.',
        b: 'The lungs are autonomic territory (bronchial smooth muscle and glands), reached by sympathetic bronchodilator and vagal bronchoconstrictor fibres, so they are supplied and not the exception.',
        c: 'The stomach is autonomic territory (gastrointestinal smooth muscle), reached by both divisions, so it is supplied and not the exception.',
        d: 'Correct — the exception. Skeletal muscle is controlled by the somatic motor system alone. The autonomic system\'s remit is smooth muscle, glands and cardiac muscle; it has no direct motor pathway to skeletal muscle fibres.',
        e: 'The iris (dilator and constrictor pupillae are smooth muscle) is autonomic territory, reached by sympathetic mydriatic and parasympathetic miotic fibres, so it is supplied and not the exception.',
      },
    },
    {
      key: 'MCQ-102-2093c80b-p28-q40',
      conceptKey: 'parasympathetic-function-pelvic-viscera',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Name erection as the parasympathetic effect of sacral autonomic stimulation.',
      explanations: {
        a: 'Backwards. Parasympathetic (sacral) stimulation *relaxes* the internal urethral sphincter to allow micturition; it does not inhibit the bladder wall muscle, which it instead contracts.',
        b: 'Correct. The sacral parasympathetic outflow (S2–S4, via the pelvic splanchnic nerves) produces vasodilatation of the penile blood vessels, which is erection.',
        c: 'Backwards on both halves. Parasympathetic stimulation causes defecation by *contracting* the rectal wall and *relaxing* the internal anal sphincter — the option states the opposite pairing, which is closer to the sympathetic pattern of retention.',
        d: 'Gastric acid and pepsin secretion are increased by the vagus (thoracic/abdominal parasympathetic outflow), not by the sacral supply, which serves the pelvic organs.',
      },
    },
  ],
}
