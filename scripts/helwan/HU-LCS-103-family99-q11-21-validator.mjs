#!/usr/bin/env node

import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../..')
const output = resolve(root, 'docs/Helwan-Source-Imports/question/HU-LCS-103-family99-q11-21-importer-valid-muscle-mcq.md')

const parseItems = (text) => text.split(/\n\n---\n\n/).filter(Boolean).map((block) => {
  const fields = {}
  for (const match of block.matchAll(/^## ([^\n]+)\n([\s\S]*?)(?=\n\n## |$)/gm)) fields[match[1]] = match[2].trim()
  return fields
})

const text = await readFile(output, 'utf8').catch(() => '')
assert.notEqual(text, '', 'question import must be generated before validation can pass')
const rows = parseItems(text)
const expectedNumbers = [11, 14, 15, 17, 18, 19, 20, 21]
const expectedIds = expectedNumbers.map((number) => `Q-HU-LCS103-PHY-F99-${number}`)
const expectedKeys = ['C', 'B', 'C', 'B', 'A', 'D', 'C', 'A']
const expectedOptionCounts = [4, 5, 5, 4, 5, 4, 5, 4]
const expectedStems = [
  'Calcium bind to …………… during the initial step of the cross-bridge cycle in skeletal muscle.',
  'The correct temporal sequence for events at the neuromuscular junction is .......................................',
  'Which characteristic or component is shared by skeletal muscle and smooth muscle?',
  'Which of the following temporal sequences is correct for excitation-contraction coupling in skeletal muscle?',
  'In skeletal muscle, which of the following events occurs before depolarization of the T tubules in the mechanism of excitation-contraction coupling?',
  'Which of the following causes rigor in skeletal muscle?',
  'In contraction of gastrointestinal smooth muscle, which of the following events occurs after binding of Ca2+ to calmodulin?',
  'Excitation contraction coupling involves all the following except:',
]
const expectedOptions = [
  ['Actin.', 'Myosin.', 'Troponin.', 'Tropomyosin.'],
  [
    'Action potential in the motor nerve; depolarization of the muscle end plate; uptake of Ca2+ into the presynaptic nerve terminal.',
    'Uptake of Ca2+ into the presynaptic terminal; release of acetylcholine (ACh); depolarization of the muscle end plate.',
    'Release of ACh; action potential in the motor nerve; action potential in the muscle.',
    'Uptake of Ca2+ into the motor end plate; action potential in the motor end plate; action potential in the muscle.',
    'Release of ACh; action potential in the muscle end plate; action potential in the muscle.',
  ],
  [
    'Thick and thin filaments arranged in sarcomeres.',
    'Troponin.',
    'Elevation of intracellular [Ca2+] for excitation-contraction coupling.',
    'Spontaneous depolarization of the membrane potential.',
    'High degree of electrical coupling between cells.',
  ],
  [
    'Increased intracellular [Ca2+]; action potential in the muscle membrane; cross-bridge formation.',
    'Action potential in the muscle membrane; depolarization of the T tubules; release of Ca2+ from the sarcoplasmic reticulum (SR).',
    'Action potential in the muscle membrane; splitting of adenosine triphosphate (ATP); binding of Ca2+ to troponin C.',
    'Release of Ca2+ from the SR; depolarization of the T tubules; binding of Ca2+ to troponin C.',
  ],
  [
    'Depolarization of the sarcolemma membrane.',
    'Opening of Ca2+ release channels on the sarcoplasmic reticulum (SR).',
    'Uptake of Ca2+ into the SR by Ca2+ adenosine triphosphatase (ATPase).',
    'Binding of Ca2+ to troponin C.',
    'Binding of actin and myosin.',
  ],
  ['Lack of action potentials in motoneurons', 'An increase in intracellular Ca2+ level', 'A decrease in intracellular Ca2+ level', 'A decrease in ATP'],
  [
    'Depolarization of the sarcolemma membrane.',
    'Ca2+ induced Ca2+ release.',
    'Increased myosin light chain kinase.',
    'Increased intracellular Ca2+ concentration.',
    'Opening of ligand-gated Ca2+ channels.',
  ],
  ['Release of Ca+2 from troponin.', 'Formation of cross bridges between actin and myosin.', 'Spread of depolarization along the transverse tubules.', 'Hydrolysis of ATP to ADP.'],
]
const expectedConcepts = [
  'CON-MSK-3013AA61E917B7',
  'CON-MSK-77D955AAB4D0FA',
  'CON-MSK-CF9EFE4EA3C90B',
  'CON-MSK-3013AA61E917B7',
  'CON-MSK-3013AA61E917B7',
  'CON-MSK-6087C9C091ED85',
  'CON-MSK-CF9EFE4EA3C90B',
  'CON-MSK-3013AA61E917B7',
]
const expectedArticles = [
  'ART-HU-LCS103-PHY-F99-Q33-43-NMJ-COUPLING',
  'ART-HU-LCS103-PHY-F99-Q33-43-NMJ-COUPLING',
  'ART-HU-LCS103-PHY-MUSCLE-TYPES-PROPERTIES',
  'ART-HU-LCS103-PHY-F99-Q33-43-NMJ-COUPLING',
  'ART-HU-LCS103-PHY-F99-Q33-43-NMJ-COUPLING',
  'ART-HU-LCS103-PHY-F99-RELAXATION-ATP-FUNCTION',
  'ART-HU-LCS103-PHY-MUSCLE-TYPES-PROPERTIES',
  'ART-HU-LCS103-PHY-F99-Q33-43-NMJ-COUPLING',
]

assert.equal(rows.length, 8, 'exact importer-valid question count')
assert.deepEqual(rows.map((row) => row.id), expectedIds, 'exact Family-99 occurrence IDs')
assert.deepEqual(rows.map((row) => row.correct_answer), expectedKeys, 'exact printed key sequence')
assert.deepEqual(rows.map((row) => row.question), expectedStems, 'exact printed stems')
assert.deepEqual(rows.map((row) => ['a', 'b', 'c', 'd', 'e', 'f'].filter((letter) => row[`answer_${letter}`]).length), expectedOptionCounts, 'exact printed option counts')
assert.deepEqual(rows.map((row) => ['a', 'b', 'c', 'd', 'e', 'f'].filter((letter) => row[`answer_${letter}`]).map((letter) => row[`answer_${letter}`])), expectedOptions, 'exact printed options and order')
assert.deepEqual(rows.map((row) => row.main_concept), expectedConcepts, 'governed concept IDs')
assert.deepEqual(rows.map((row) => row.library_ids), expectedArticles, 'substantive existing article dependencies')
assert.ok(rows.every((row) => row.status === 'Draft'), 'all questions remain Draft')
assert.equal(rows.filter((row) => Object.hasOwn(row, 'explanation')).length, 0, 'generic explanation field absent')
assert.equal(rows.reduce((sum, row) => sum + Object.keys(row).filter((key) => /^explanation_[a-f]$/.test(key)).length, 0), 48, 'six option-specific explanation headers per question')
const activeExplanations = rows.flatMap((row) => ['a', 'b', 'c', 'd', 'e', 'f'].filter((letter) => row[`answer_${letter}`]).map((letter) => row[`explanation_${letter}`]))
assert.equal(activeExplanations.length, 36, 'one substantive explanation per printed option')
assert.ok(activeExplanations.every((value) => value.length >= 200), 'every printed option explanation is at least 200 characters')
assert.ok(activeExplanations.every((value) => (value.match(/[.!?](?=\s|$)/g) ?? []).length >= 3), 'every printed option explanation has at least three sentences')
assert.ok(rows.every((row) => row.resource_ids.includes('src_fad2f5ab18e1efa59eb1')), 'every question cites the direct Family-99 assessment')
assert.ok(rows.every((row) => /Q12 and Q13 each print only three options and Q16 prints eight options/.test(row.author_notes)), 'option-contract source holds are explicit')
assert.ok(rows.every((row) => /No option is invented, removed or rewritten/.test(row.author_notes)), 'source option integrity is explicit')

console.log(JSON.stringify({ questions: rows.length, keys: expectedKeys.join(''), optionCounts: expectedOptionCounts, genericExplanationHeaders: 0, optionSpecificExplanationHeaders: 48, substantiveExplanations: activeExplanations.length, reusedConcepts: new Set(expectedConcepts).size, reusedArticles: new Set(expectedArticles).size, heldOptionContractRecords: ['Q12', 'Q13', 'Q16'], practical: 0, written: 0, media: 0 }, null, 2))
