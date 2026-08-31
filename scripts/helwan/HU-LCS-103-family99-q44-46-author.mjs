#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../..')
const output = resolve(root, 'docs/Helwan-Source-Imports/question/HU-LCS-103-family99-q44-46-muscle-mcq.md')
const divider = '\n\n---\n\n'
const item = (fields) => `# Item\n\n${Object.entries(fields).map(([key, value]) => `## ${key}\n${value ?? ''}`).join('\n\n')}\n`

const source = {
  assessment: 'src_fad2f5ab18e1efa59eb1',
  helwan: 'src_262c1ba3765a9922e9d4',
  kasr: 'src_59643edb9d371bcefa2c',
}

const specs = {
  sarcomere: {
    concept: 'CON-MSK-0824FE988ADA00',
    article: 'ART-HU-LCS103-PHY-F99-Q33-43-MYOFIBRIL-CONTRACTION',
    objective: 'Identify the filament composition of the H zone in a cross-section of skeletal muscle.',
    teaching: 'The H zone is the central A-band region where thick myosin filaments are present without overlapping thin actin filaments. Titin spans the sarcomere, but the printed keyed distinction in this item is the presence of myosin and absence of actin in the H zone. Any option that places actin in this non-overlap region is therefore incompatible with the defined band anatomy.',
  },
  calcium: {
    concept: 'CON-MSK-3013AA61E917B7',
    article: 'ART-HU-LCS103-PHY-F99-Q33-43-NMJ-COUPLING',
    objective: 'Explain how calcium exposes actin binding sites during skeletal-muscle excitation–contraction coupling.',
    teaching: 'Calcium binds troponin C in skeletal muscle and changes the troponin complex so tropomyosin moves away from the myosin-binding sites on actin. This exposes the actin sites required for cross-bridge formation and cycling. Calcium does not bind myosin heads to initiate cycling, and the sarcoplasmic reticulum rather than the T-tubule lumen is the immediate intracellular calcium source.',
  },
  muscleTypes: {
    concept: 'CON-MSK-B080975D6171CF',
    article: 'ART-HU-LCS103-PHY-MUSCLE-TYPES-PROPERTIES',
    objective: 'Distinguish striated skeletal and cardiac muscle from non-striated smooth muscle on microscopy.',
    teaching: 'Skeletal and cardiac muscle both contain regularly aligned sarcomeres, which produce transverse striations on microscopic examination. Smooth muscle lacks sarcomeres arranged in this repeating pattern and is therefore non-striated. Cardiac striation can be less visually prominent than skeletal striation, but cardiac muscle remains a striated muscle type.',
  },
}

const rows = [
  [44, 'sarcomere', 'E', 'A cross-sectional view of a skeletal muscle fiber through the H zone would reveal the presence of what?', ['actin and titin.', 'actin but no myosin.', 'actin, myosin, and titin.', 'myosin and actin.', 'myosin but no actin.']],
  [45, 'calcium', 'A', 'Role of Ca2+ ions in excitation-contraction coupling:', ['Binding of Ca2+ ions with troponin causes tropomyosin to move away, exposing the binding sites present on actin molecules.', 'Muscle relaxation occurs so long as Ca2+ ions combine with troponin.', 'Ca2+ ions make tropomyosin move and cover the binding sites on actin.', 'Binding of Ca2+ ions with myosin heads leads to cross-bridge cycling.', 'Propagation of action potential leads to release of Ca2+ ions from tubules.']],
  [46, 'muscleTypes', 'E', 'The striated muscles upon microscopic observation are:', ['Cardiac and smooth muscles.', 'Smooth muscle only.', 'Smooth and skeletal muscles.', 'Skeletal muscles only.', 'Skeletal and cardiac muscles.']],
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

const questions = rows.map(([number, code, key, stem, options]) => {
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
    source_citation: `${source.assessment}, physical PDF p9, printed Q${number}: exact source stem/options with right-column printed key ${key}. Draft explanation support: ${source.helwan} and ${source.kasr}.`,
    author_notes: `Transcribed as exact source wording from Family 99 physical p9; spelling, capitalisation, punctuation, option order and printed key are preserved. No exact wording/option-set repeat occurs inside Q44–Q46; every printed occurrence is retained. No mark, media dependency or corrected answer is inferred.`,
  }
})

if (questions.length !== 3 || questions.map((row) => row.correct_answer).join('') !== 'EAE') throw new Error('Family-99 Q44–Q46 governed count or key mismatch')
await mkdir(dirname(output), { recursive: true })
await writeFile(output, questions.map(item).join(divider), 'utf8')
console.log(JSON.stringify({ file: output, questions: questions.length, keys: questions.map((row) => row.correct_answer).join(''), practical: 0, written: 0, media: 0 }, null, 2))
