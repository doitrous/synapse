import { readFileSync } from 'node:fs'
import { IMPORT_SCHEMAS } from '../../src/data/bulkImport.ts'
const all = IMPORT_SCHEMAS.question.fields.map((f) => f.key)
const text = readFileSync('docs/Kasr-Source-Imports/written/102-INT-EOY-2025-written.md', 'utf8')
const emitted = new Set([...text.matchAll(/^## ([a-z_0-9]+)$/gm)].map((m) => m[1]))
const choiceOnly = ['correct_answer','answer_a','answer_b','answer_c','answer_d','answer_e','answer_f','explanation_a','explanation_b','explanation_c','explanation_d','explanation_e','explanation_f','randomise_answers','correct_answers','attached_image']
const otherFormat = ['labeling_image','labeling_alt','labeling_points','completion_text']
console.log('question schema columns:', all.length, '| emitted:', emitted.size)
const missing = all.filter((k) => !emitted.has(k))
console.log('\nchoice-only, cannot fill  :', missing.filter((k) => choiceOnly.includes(k)).join(' '))
console.log('other-format only         :', missing.filter((k) => otherFormat.includes(k)).join(' '))
console.log('AVAILABLE and unfilled    :', missing.filter((k) => !choiceOnly.includes(k) && !otherFormat.includes(k)).join(' '))
