#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../..')
const output = resolve(root, 'docs/Helwan-Source-Imports/question/HU-LCS-103-family99-q11-21-importer-valid-muscle-mcq.md')
const divider = '\n\n---\n\n'
const item = (fields) => `# Item\n\n${Object.entries(fields).map(([key, value]) => `## ${key}\n${value ?? ''}`).join('\n\n')}\n`

const source = {
  assessment: 'src_fad2f5ab18e1efa59eb1',
  helwan: 'src_262c1ba3765a9922e9d4',
  kasr: 'src_59643edb9d371bcefa2c',
}

const specs = {
  skeletalCalcium: {
    concept: 'CON-MSK-3013AA61E917B7',
    article: 'ART-HU-LCS103-PHY-F99-Q33-43-NMJ-COUPLING',
    objective: 'Sequence skeletal-muscle calcium release, troponin activation, cross-bridge formation and calcium-dependent relaxation.',
    teaching: 'In skeletal muscle, calcium released from the sarcoplasmic reticulum binds troponin C, which shifts tropomyosin away from myosin-binding sites on actin. That exposure permits actin–myosin cross-bridge formation and ATP-dependent cycling; the activating calcium does not initiate the cycle by binding directly to actin, myosin or tropomyosin. Sarcolemmal and T-tubule depolarisation precede sarcoplasmic-reticulum calcium release, while calcium dissociation from troponin follows reuptake and contributes to relaxation.',
  },
  nmj: {
    concept: 'CON-MSK-77D955AAB4D0FA',
    article: 'ART-HU-LCS103-PHY-F99-Q33-43-NMJ-COUPLING',
    objective: 'Order presynaptic calcium entry, acetylcholine release and motor-end-plate depolarisation at the neuromuscular junction.',
    teaching: 'Arrival of the motor-nerve action potential opens presynaptic voltage-gated calcium channels, so calcium enters the nerve terminal before transmitter is released. Calcium entry triggers acetylcholine exocytosis, and acetylcholine then activates nicotinic receptors to depolarise the muscle end plate. Sequences that place end-plate depolarisation before transmitter release, or that place the relevant calcium uptake in the motor end plate, reverse the physiological order.',
  },
  sharedCalcium: {
    concept: 'CON-MSK-CF9EFE4EA3C90B',
    article: 'ART-HU-LCS103-PHY-MUSCLE-TYPES-PROPERTIES',
    objective: 'Identify elevated intracellular calcium as a shared requirement for skeletal- and smooth-muscle excitation–contraction coupling.',
    teaching: 'Both skeletal and smooth muscle require an increase in intracellular calcium concentration to couple excitation to contraction. Skeletal muscle uses troponin on a sarcomeric thin filament, whereas smooth muscle lacks troponin and instead uses calcium–calmodulin to activate myosin light-chain kinase. Sarcomeres, spontaneous depolarisation and extensive electrical coupling are therefore not universal features shared by both muscle types.',
  },
  rigor: {
    concept: 'CON-MSK-6087C9C091ED85',
    article: 'ART-HU-LCS103-PHY-F99-RELAXATION-ATP-FUNCTION',
    objective: 'Relate ATP depletion to persistent actin–myosin attachment and rigor in skeletal muscle.',
    teaching: 'ATP binding to a myosin head is required for that head to detach from actin after a power stroke. When ATP becomes insufficient, cross-bridges remain attached and the muscle becomes rigid even though continued motoneuron action potentials are not required. Calcium changes regulate access to actin sites, but the defining failure behind rigor is the loss of ATP-dependent cross-bridge detachment.',
  },
  smoothCalmodulin: {
    concept: 'CON-MSK-CF9EFE4EA3C90B',
    article: 'ART-HU-LCS103-PHY-MUSCLE-TYPES-PROPERTIES',
    objective: 'Sequence calcium–calmodulin formation and myosin light-chain kinase activation in gastrointestinal smooth muscle.',
    teaching: 'In gastrointestinal smooth muscle, the rise in cytosolic calcium occurs before calcium binds calmodulin. The calcium–calmodulin complex then activates myosin light-chain kinase, increasing kinase activity so regulatory myosin light chains can be phosphorylated and cross-bridge cycling can proceed. Membrane depolarisation, calcium-channel opening and calcium release are upstream routes to the calcium rise rather than the event immediately downstream of calmodulin binding.',
  },
}

const rows = [
  [11, 2, 'skeletalCalcium', 'C', 'Calcium bind to …………… during the initial step of the cross-bridge cycle in skeletal muscle.', ['Actin.', 'Myosin.', 'Troponin.', 'Tropomyosin.']],
  [14, 3, 'nmj', 'B', 'The correct temporal sequence for events at the neuromuscular junction is .......................................', [
    'Action potential in the motor nerve; depolarization of the muscle end plate; uptake of Ca2+ into the presynaptic nerve terminal.',
    'Uptake of Ca2+ into the presynaptic terminal; release of acetylcholine (ACh); depolarization of the muscle end plate.',
    'Release of ACh; action potential in the motor nerve; action potential in the muscle.',
    'Uptake of Ca2+ into the motor end plate; action potential in the motor end plate; action potential in the muscle.',
    'Release of ACh; action potential in the muscle end plate; action potential in the muscle.',
  ]],
  [15, 3, 'sharedCalcium', 'C', 'Which characteristic or component is shared by skeletal muscle and smooth muscle?', [
    'Thick and thin filaments arranged in sarcomeres.',
    'Troponin.',
    'Elevation of intracellular [Ca2+] for excitation-contraction coupling.',
    'Spontaneous depolarization of the membrane potential.',
    'High degree of electrical coupling between cells.',
  ]],
  [17, 4, 'skeletalCalcium', 'B', 'Which of the following temporal sequences is correct for excitation-contraction coupling in skeletal muscle?', [
    'Increased intracellular [Ca2+]; action potential in the muscle membrane; cross-bridge formation.',
    'Action potential in the muscle membrane; depolarization of the T tubules; release of Ca2+ from the sarcoplasmic reticulum (SR).',
    'Action potential in the muscle membrane; splitting of adenosine triphosphate (ATP); binding of Ca2+ to troponin C.',
    'Release of Ca2+ from the SR; depolarization of the T tubules; binding of Ca2+ to troponin C.',
  ]],
  [18, 4, 'skeletalCalcium', 'A', 'In skeletal muscle, which of the following events occurs before depolarization of the T tubules in the mechanism of excitation-contraction coupling?', [
    'Depolarization of the sarcolemma membrane.',
    'Opening of Ca2+ release channels on the sarcoplasmic reticulum (SR).',
    'Uptake of Ca2+ into the SR by Ca2+ adenosine triphosphatase (ATPase).',
    'Binding of Ca2+ to troponin C.',
    'Binding of actin and myosin.',
  ]],
  [19, 4, 'rigor', 'D', 'Which of the following causes rigor in skeletal muscle?', ['Lack of action potentials in motoneurons', 'An increase in intracellular Ca2+ level', 'A decrease in intracellular Ca2+ level', 'A decrease in ATP']],
  [20, 4, 'smoothCalmodulin', 'C', 'In contraction of gastrointestinal smooth muscle, which of the following events occurs after binding of Ca2+ to calmodulin?', [
    'Depolarization of the sarcolemma membrane.',
    'Ca2+ induced Ca2+ release.',
    'Increased myosin light chain kinase.',
    'Increased intracellular Ca2+ concentration.',
    'Opening of ligand-gated Ca2+ channels.',
  ]],
  [21, 4, 'skeletalCalcium', 'A', 'Excitation contraction coupling involves all the following except:', ['Release of Ca+2 from troponin.', 'Formation of cross bridges between actin and myosin.', 'Spread of depolarization along the transverse tubules.', 'Hydrolysis of ATP to ADP.']],
]

const common = {
  subject: 'msk',
  status: 'Draft',
  owner: 'Helwan Year-1 authoring lane',
  vignette: '',
  format: 'single best answer',
  written_parts: '',
  matching_options: '',
  matching_prompts: '',
  correct_answers: '',
  labeling_image: '',
  labeling_alt: '',
  labeling_points: '',
  completion_text: '',
  derived_from: '',
  topic: 'Musculoskeletal system',
  subtopic: 'Muscle physiology',
  difficulty: 'Easy',
  question_type: 'Physiology',
  module: 'HU-LCS-103',
  module_subject: 'HU-LCS-103 > Physiology > Muscle Physiology',
  clinical_relevance: '0.55',
  academic_relevance: '0.95',
  cognitive_effort_score: '0.3',
  exam_weight_by_year: 'HU_Y1=0.8',
  question_only_for: 'HU_Y1',
  concept_ids: '',
  years: 'HU_Y1',
  universities: 'hu',
  cognitive_effort: 'Low',
  setting: 'Academic',
  reasoning_level: '1',
  inferred_difficulty: '74',
  exam_relevance: '8',
  contextual_concept_ids: '',
  media_recommendations: '',
  attachments: '',
  attached_image: '',
  estimated_seconds: '55',
  randomise_answers: 'yes',
}

const questions = rows.map(([number, page, code, key, stem, options]) => {
  const spec = specs[code]
  const fields = { id: `Q-HU-LCS103-PHY-F99-${number}`, title: stem, ...common, question: stem, correct_answer: key }
  options.forEach((text, index) => {
    const letter = String.fromCharCode(65 + index)
    fields[`answer_${letter.toLowerCase()}`] = text
    fields[`explanation_${letter.toLowerCase()}`] = letter === key
      ? `The direct Family-99 quiz bank prints ${key} as the answer, so this is the exact source-keyed response. ${spec.teaching} The record remains Draft because the local printed key is assessment evidence and has not received independent medical verification.`
      : `This option is retained exactly from the Family-99 quiz bank, but the printed right-column key selects ${key} instead. ${spec.teaching} The record remains Draft pending named Helwan Physiology faculty review and independent medical verification.`
  })
  for (const letter of ['a', 'b', 'c', 'd', 'e', 'f']) {
    if (!Object.hasOwn(fields, `answer_${letter}`)) {
      fields[`answer_${letter}`] = ''
      fields[`explanation_${letter}`] = ''
    }
  }
  return {
    ...fields,
    main_concept: spec.concept,
    library_ids: spec.article,
    resource_ids: `${source.assessment}\n${source.helwan}\n${source.kasr}`,
    learning_objective: spec.objective,
    source_citation: `${source.assessment}, physical PDF p${page}, printed Q${number}: exact source stem/options with right-column printed key ${key}. Draft explanation support: ${source.helwan} and ${source.kasr}.`,
    author_notes: `Transcribed as exact source wording from Family 99 physical p${page}; spelling, capitalisation, punctuation, option order and printed key are preserved. No exact wording/option-set repeat occurs inside this Q11–Q21 importer-valid slice; every target printed occurrence is retained. Q12 and Q13 each print only three options and Q16 prints eight options; all three are held unchanged under the current four-to-five-option importer contract. No option is invented, removed or rewritten, and no mark, media dependency or corrected answer is inferred.`,
  }
})

if (questions.length !== 8 || questions.map((row) => row.correct_answer).join('') !== 'CBCBADCA') throw new Error('Family-99 Q11–Q21 importer-valid count or key mismatch')
await mkdir(dirname(output), { recursive: true })
await writeFile(output, questions.map(item).join(divider), 'utf8')
console.log(JSON.stringify({ file: output, questions: questions.length, keys: questions.map((row) => row.correct_answer).join(''), optionCounts: rows.map((row) => row[5].length), reusedConcepts: new Set(rows.map((row) => specs[row[2]].concept)).size, reusedArticles: new Set(rows.map((row) => specs[row[2]].article)).size, heldOptionContractRecords: ['Q12', 'Q13', 'Q16'], practical: 0, written: 0, media: 0 }, null, 2))
